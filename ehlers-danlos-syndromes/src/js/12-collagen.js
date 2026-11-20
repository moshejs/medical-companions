/* =============== 1.2 Collagen, gene to fibril =============== */
/* six steps of one collagen molecule's life; each step's local time u runs 0..1 between its from and the next from */
const CO_STEPS=[
 {from:0,at:.12,k:'Step 1 · nucleus',t:'Gene to mRNA',
  txt:`Collagen makes up about one-third of the body's protein and about three-quarters of the dry weight of skin; 28 collagen types are built from at least 46 different chains. [[Shoulders2009]] Each collagen gene has two copies, one from each parent. Both are read into messenger RNA (mRNA), which leaves the nucleus for ribosomes on the rough endoplasmic reticulum (ER). Type I collagen is two α1(I) chains and one α2(I) chain; type III is three α1(III) chains; type V comes in several chain combinations. [[Yamauchi2012,Shoulders2009]] Use the <b>Gene</b> buttons to switch.`,
  pt:`A gene is a recipe. The cell copies the recipe into a messenger, and the messenger carries it to the cell's protein factories.`,
  hook:`Most EDS genes encode collagen I, III or V, enzymes that modify or process them, or enzymes that build proteoglycan sugar chains. [[Malfait2020]]`},
 {from:.17,at:.29,k:'Step 2 · rough ER',t:'A Gly-X-Y chain',
  txt:`Each pro-α chain is built bead by bead from its N-end to its C-end, with a globular propeptide at each end. In the helical part every third amino acid must be glycine, the smallest one, because only glycine fits in the crowded centre of the triple helix. The repeat is written Gly-X-Y: proline fills X about 28% of the time and 4-hydroxyproline fills Y about 38%; Pro-Hyp-Gly is the commonest triplet, at 10.5%. [[Shoulders2009]]`,
  pt:`Think of a bead necklace where every third bead must be the smallest bead. A bigger bead in that spot stops the three strands lying close.`,
  hook:`Gly-X-Y: glycine at every third position. A glycine substitution in COL3A1 is the commonest vEDS variant. [[Shoulders2009,Frank2015]]`},
 {from:.34,at:.47,k:'Step 3 · rough ER',t:'Hydroxylate, then wind',
  txt:`Prolyl 4-hydroxylase turns proline in the Y position into 4-hydroxyproline, and lysyl hydroxylases make hydroxylysine, some of which then carries sugars. [[Shoulders2009,Yamauchi2012]] The C-propeptides pick and align the three chains [[Hulmes2002]], and the triple helix folds from the C-end toward the N-end: three left-handed chains coil into a right-handed helix with a one-residue stagger and a 28.6 Å axial repeat. [[Shoulders2009]] FKBP14 catalyses folding of type III collagen. [[Giunta2018]]`,
  pt:`Small chemical tags are added, then the three strands twist together like a rope, starting from one end.`,
  hook:`The triple helix zips from C to N. A glycine substitution stalls it there, and the delay leaves the chains over-modified. [[Shoulders2009]]`},
 {from:.5,at:.64,k:'Step 4 · leaving the cell',t:'Secrete and trim the ends',
  txt:`Outside the cell, the C-propeptides keep procollagen soluble. [[Hulmes2002]] Fibrils can form only after both ends are cut off. [[Shoulders2009]] The C-propeptides of procollagens I, II and III are removed by procollagen C-proteinase, which is the same protein as BMP-1. [[Kessler1996]] The N-propeptides of types I and II are removed by procollagen I N-proteinase, encoded by ADAMTS2, which also trims type III. [[Colige1999,VanDamme2016]]`,
  pt:`The finished rope still has two bulky end caps. Two enzymes snip them off so the ropes can line up.`,
  hook:`BMP-1 is the C-proteinase; ADAMTS-2 is the N-proteinase. dEDS loses the enzyme, aEDS loses the cut site (exon 6). [[Kessler1996,Colige1999,Byers1997]]`},
 {from:.67,at:.8,k:'Step 5 · outside the cell',t:'A quarter-staggered fibril',
  txt:`One type I triple helix is under 2 nm wide and about 300 nm long. Molecules pack side by side, each shifted by D = 67 nm from its neighbour. A molecule is 4.46 D long, so the stagger leaves gap zones (0.54 D) and overlap zones (0.46 D): the banding seen on electron microscopy (the Hodge-Petruska model). Tendon fibrils reach up to 1 cm long and about 500 nm wide. [[Shoulders2009]] Purified collagen can assemble on its own, but in tissue, cells steer where fibrils start, which way they point and how thick they grow. [[Holmes2018Fibril]]`,
  pt:`The ropes pack together in a staggered pattern, like bricks in a wall. That pattern gives fibrils their striped look under the microscope.`,
  hook:`D-period 67 nm; molecule 4.46 D; gap zone 0.54 D, overlap zone 0.46 D. [[Shoulders2009]]`},
 {from:.84,at:.96,k:'Step 6 · outside the cell',t:'Cross-link and size control',
  txt:`Lysyl oxidase (LOX) leaves the cell as proLOX, is activated by cutting, and oxidises specific lysines to an aldehyde so that covalent cross-links can form. [[Lucero2006]] Cross-links give strength and stability but are not needed to build the fibril. [[Shoulders2009]] Type V collagen co-assembles with type I and controls when fibrils start: mouse embryos with no α1(V) chain make virtually no fibrils and die at about embryonic day 10. [[Wenstrup2004]] Tenascin-X regulates how collagen is deposited [[Mao2002]], and decorin's dermatan sulfate helps organise fibrils into bundles. [[Miyake2010]]`,
  pt:`Chemical bridges lock the ropes together, and helper proteins decide how many fibres form and how thick they grow.`,
  hook:`Haploinsufficiency (a null allele: less normal protein) versus dominant negative (a faulty chain spoils molecules that also hold normal chains). In vEDS, null variants delayed the first complication by almost 15 years. [[Leistritz2011,Schwarze2001]]`}
];
/* what the selected EDS type changes at each step */
const CO_VN={
 c:[`Copy 2 here is a null allele: it makes no usable product, so the cell has about half the type V collagen. About one-third of people with cEDS have COL5A1 haploinsufficiency, and most COL5A1 variants in a 126-person series created a null allele. [[Wenstrup2000,Symoens2012]]`,
  `About one-third of COL5A1 variants, and all COL5A2 variants, in that series were structural: they change the chain itself. COL5A2 exon skipping gave a sparse fibril network of very variable size and shape. [[Symoens2012,Michalickova1998]]`,
  `Folding of the main collagen, type I, is not the problem. Type V is a minor partner that matters later, when fibrils start. [[Wenstrup2004]]`,
  `Trimming is not the step that fails in cEDS: watch steps 5 and 6.`,
  `Type V co-assembles with type I and controls fibril initiation. In col5a1+/− mice, half-normal collagen V gave 50% fewer dermal fibrils, plus a second population of large, abnormal fibrils that formed without control. [[Wenstrup2004,Wenstrup2006]]`,
  `Electron microscopy of cEDS skin shows composite fibrils with flower-like cross-sections, the "collagen flowers", although no biopsy finding is specific to one type. The mouse model had lower skin tensile strength. [[Hausser1994,Angwin2020C,Wenstrup2006]]`],
 v:[`COL3A1 makes type III procollagen, a major protein of vessel walls and hollow organs. Copy 2 here carries a missense change at a glycine codon; its message is made as usual. Some vEDS variants are null alleles instead, which lower the amount. [[Byers2017,Schwarze2001]]`,
  `The orange bead is a glycine substitution, the commonest class: 71 of 126 variants in a French cohort. The replacing amino acids were biased toward those that most destabilise assembly. [[Frank2015]]`,
  `Folding stalls at the substitution, and the delay leaves the chains over-modified. [[Shoulders2009]] Type III has three identical chains, so changed and normal chains end up in the same molecules: a dominant-negative effect, predicted for 43 of 56 variants (76.8%) in a Dutch cohort. [[Demirdas2024]]`,
  `With a null allele, by contrast, fewer molecules are made but none carries a faulty chain into the fibril. [[Schwarze2001]]`,
  `In a 1994 electron-microscopy series, skin from people with clinically vascular EDS showed a dermis thinned to a third of normal, with small-diameter fibrils. [[Hausser1994]]`,
  `In 142 Dutch people with vEDS, median age at first major event was 30.0 years for splice and in-frame variants, 40.5 for glycine substitutions and 53.0 for haploinsufficient variants. These are group statistics, not predictions for one person. See <a href="#vascular" data-go="vascular">Vascular EDS</a>. [[Demirdas2024]]`],
 a:[`Copy 2 of COL1A1 or COL1A2 loses all or part of exon 6, which is then skipped in the message. [[Byers1997,Klaassens2012]]`,
  `The chain from the changed copy lacks the stretch encoded by exon 6, which holds the N-proteinase cleavage site. [[Byers1997]]`,
  `Nothing shows yet: the missing piece is the cleavage site, which matters at the next step. [[Byers1997]]`,
  `The enzyme is present, but the substrate has lost its cleavage site, so the N-propeptide stays on. Dermatosparaxis blocks the same step from the enzyme side. COL1A1 variants produced the most severe effects. [[Byers1997]]`,
  `If N-propeptides persist, they change fibril shape. [[Hulmes2002]] The skipped exon leads to defective collagen synthesis. [[Klaassens2012]]`,
  `The hallmark is congenital bilateral hip dislocation with severe generalised joint hypermobility and recurrent subluxations. [[VanDijk2024,Ayoub2020]]`],
 d:[`The collagen genes are normal. Both copies of ADAMTS2, the procollagen N-proteinase gene, carry variants: recessive inheritance. [[Colige1999]]`,
  `Chains are made as usual in dEDS; the fault comes after secretion. [[Colige1999]]`,
  `Folding is not affected: watch step 4.`,
  `ADAMTS2 variants abolish N-proteinase activity, so the N-propeptide stays on. ADAMTS-2 also trims type III procollagen. [[Colige1999,VanDamme2016]]`,
  `If N-propeptides persist, they change fibril shape. [[Hulmes2002]]`,
  `Clinically, extreme skin fragility with redundant, almost lax skin. A series of 5 adults aged 22 to 42 described redundant skin folds and fractures. [[VanDijk2024,Angwin2025]]`],
 k:[`The collagen genes are normal. Both copies of PLOD1, the gene for lysyl hydroxylase 1, carry variants: recessive inheritance. [[Yeowell2000,VanDijk2024]]`,
  `The chains themselves are normal; the missing step is a modification that comes next. [[Yeowell2000]]`,
  `Without lysyl hydroxylase 1, lysines stay unhydroxylated (orange crosses). Hydroxylysines carry the sugars and are precursors of the cross-links that give collagen its tensile strength. [[Yeowell2000]]`,
  `Trimming is not the step that fails in kEDS: watch step 6.`,
  `Fibrils still assemble: telopeptide cross-links form after assembly and are not needed to build the fibril. [[Shoulders2009]]`,
  `Cross-links now form from unhydroxylated lysines (dashed orange). The urinary LP/HP cross-link ratio is about 6 in PLOD1-kEDS against about 0.2 in controls, and a markedly raised ratio can confirm the diagnosis when genetic testing finds only one variant or a VUS. [[Giunta2008,RohrbachGR-kEDS]]`]
};
/* "which step breaks": cells c = {column: 2 main, 1 also}; columns 0..5 are the animation steps, 6 lies outside collagen itself */
const CO_MX=[
 {ab:'cEDS',name:'Classical EDS',gene:'COL5A1, COL5A2 (rarely COL1A1)',inh:'AD',v:'c',c:{0:2,1:1,4:2,5:1},
  txt:`Mostly too little type V collagen. In 126 people with diagnosed or suspected cEDS, 93 had a type V defect; over 90% of those meeting all major criteria had one. [[Symoens2012]] Type V controls when fibrils start; mice with half-normal collagen V had 50% fewer dermal fibrils. [[Wenstrup2004,Wenstrup2006]]`},
 {ab:'vEDS',name:'Vascular EDS',gene:'COL3A1',inh:'AD',v:'v',c:{0:1,1:2,2:2},
  txt:`Type III procollagen is a major protein of vessel walls and hollow organs. [[Byers2017]] Glycine substitutions are the commonest variant class, and a substitution stalls folding where it sits. Null alleles (step 1) lower the amount instead. [[Frank2015,Shoulders2009,Schwarze2001]]`},
 {ab:'aEDS',name:'Arthrochalasia EDS',gene:'COL1A1, COL1A2 (exon 6)',inh:'AD',v:'a',c:{0:1,3:2},
  txt:`Variants delete all or part of exon 6, which holds the N-proteinase cleavage site: the same step as dEDS, blocked at the substrate instead of the enzyme. The hallmark is congenital bilateral hip dislocation. [[Byers1997,Klaassens2012,VanDijk2024]]`},
 {ab:'dEDS',name:'Dermatosparaxis EDS',gene:'ADAMTS2',inh:'AR',v:'d',c:{3:2,4:1},
  txt:`Biallelic ADAMTS2 variants abolish procollagen N-proteinase activity. Fifteen people had been reported by 2025. Extreme skin fragility with redundant, almost lax skin. [[Colige1999,Angwin2025,VanDijk2024]]`},
 {ab:'kEDS',name:'Kyphoscoliotic EDS, PLOD1',gene:'PLOD1',inh:'AR',v:'k',c:{2:2,5:1},
  txt:`Lysyl hydroxylase 1 deficiency. Without hydroxylysine the cross-link pattern shifts: the urinary LP/HP ratio is about 6, against about 0.2 in controls, and a markedly raised ratio can confirm the diagnosis when testing finds only one variant or a VUS. [[Yeowell2000,Giunta2008,RohrbachGR-kEDS]]`},
 {ab:'kEDS',name:'Kyphoscoliotic EDS, FKBP14',gene:'FKBP14',inh:'AR',v:null,c:{2:2},
  txt:`An ER folding catalyst for type III collagen. It looks almost the same as PLOD1-kEDS, but urinary pyridinolines are normal and hearing loss is common; patients' fibroblasts have enlarged ER cisterns. [[Giunta2018,Baumann2012]] The animation shows the normal folding step.`},
 {ab:'spEDS',name:'Spondylodysplastic EDS, SLC39A13',gene:'SLC39A13',inh:'AR',v:null,c:{2:2},
  txt:`An ER zinc transporter. Without it, lysine and proline are under-hydroxylated, and the urinary LP/HP ratio is about 1. [[Giunta2008]] The animation shows the normal step.`},
 {ab:'cvEDS',name:'Cardiac-valvular EDS',gene:'COL1A2 (both copies)',inh:'AR',v:null,c:{0:2},
  txt:`Biallelic COL1A2 variants trigger nonsense-mediated mRNA decay, so no proα2(I) chains are made. Surprisingly, this causes heart-valve disease without bone involvement. [[Schwarze2004]]`},
 {ab:'mEDS',name:'Myopathic EDS',gene:'COL12A1',inh:'AD/AR',v:null,c:{1:2},
  txt:`Collagen XII. Both a recessive loss-of-function variant and a de novo dominant variant were found in the first families; 25 people from 16 families had been reported by 2024. [[Zou2014COL12A1,VanDijk2024]]`},
 {ab:'clEDS1',name:'Classical-like EDS type 1',gene:'TNXB',inh:'AR',v:null,c:{4:2,5:1},
  txt:`Tenascin-X regulates collagen deposition: knockout mice had fibrils of normal size and shape but less densely packed, and their fibroblasts made collagen I yet failed to deposit it. Skin is hyperextensible without atrophic scars. [[Mao2002,Schalkwijk2001]]`},
 {ab:'clEDS2',name:'Classical-like EDS type 2',gene:'AEBP1',inh:'AR',v:null,c:{4:2},
  txt:`ACLP binds fibrillar collagens and enhances their polymerisation; patient skin shows less dermal collagen and ragged fibrils. Described in 2018, after the 2017 classification. [[Blackburn2018]]`},
 {ab:'spEDS',name:'Spondylodysplastic EDS, linker enzymes',gene:'B4GALT7, B3GALT6',inh:'AR',v:null,c:{6:2},
  txt:`Enzymes that build the sugar linker attaching glycosaminoglycan chains to proteoglycan core proteins. [[Malfait2013B3GALT6,FaiyazUlHaque2004]]`},
 {ab:'mcEDS',name:'Musculocontractural EDS',gene:'CHST14, DSE',inh:'AR',v:null,c:{5:1,6:2},
  txt:`Dermatan sulfate is lost and replaced by chondroitin sulfate. Decorin normally carries dermatan sulfate to help organise collagen: fibrils keep their size and shape, but bundles form poorly. [[Dundar2009,Muller2013,Miyake2010]]`},
 {ab:'BCS',name:'Brittle cornea syndrome',gene:'ZNF469, PRDM5',inh:'AR',v:null,c:{0:1,6:2},
  txt:`These genes probably encode transcription factors for matrix components; PRDM5 regulates the expression of fibrillar collagens. [[Dhooge2021,BurkittWright2011]]`},
 {ab:'pEDS',name:'Periodontal EDS',gene:'C1R, C1S',inh:'AD',v:null,c:{6:2},
  txt:`Gain-of-function variants in subunits of the first complement component: the one type outside the collagen and proteoglycan pathways. The changed proteins are retained inside the cell. [[KapfererSeebacher2016,VanDijk2024]]`},
 {ab:'hEDS',name:'Hypermobile EDS',gene:'no gene known',inh:'?',v:null,c:null,
  none:'No gene known, so it cannot be placed on the pathway. The diagnosis is clinical.',
  txt:`No genetic, epigenetic or metabolomic cause has been found, and the diagnosis rests on the 2017 clinical criteria. [[Hakim2024GeneReviews]] <span class="ev hyp">Hypothesis</span> Van Dijk and colleagues expect most people with hEDS not to have a single-gene cause. [[VanDijk2024]]`}
];

inits.collagen=()=>{
  const svg=$('#coSvg'),rg=$('#coT');
  let V='n',G='1',hl=null,setSt=()=>{};
  const VN={n:'Typical',c:'cEDS',v:'vEDS',a:'aEDS',d:'dEDS',k:'kEDS (PLOD1)'};
  const GN={'1':'COL1A1','3':'COL3A1','5':'COL5A1'};
  const FAULT={n:[],c:[0,4,5],v:[1,2],a:[3],d:[3],k:[2,5]};
  const REG=[0,1,1,2,3,3];
  const OR='fill:var(--variant)',INK='fill:var(--ink)';
  const T=(x,y,s,c='t-xs',st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const COLS=()=>G==='3'?['var(--chain-a)','var(--chain-a)','var(--chain-a)']:['var(--chain-a)','var(--chain-a)','var(--chain-c)'];
  const LBL=()=>G==='1'?['pro-α1(I)','pro-α1(I)','pro-α2(I)']:G==='3'?['pro-α1(III)','pro-α1(III)','pro-α1(III)']:['pro-α(V)','pro-α(V)','pro-α(V)'];
  const cross=(x,y,r=4,w=2)=>`<path d="M${f1(x-r)} ${f1(y-r)}L${f1(x+r)} ${f1(y+r)}M${f1(x+r)} ${f1(y-r)}L${f1(x-r)} ${f1(y+r)}" style="stroke:var(--variant);stroke-width:${w};stroke-linecap:round"/>`;
  const ribo=(x,y)=>`<ellipse cx="${f1(x)}" cy="${f1(y-5)}" rx="10" ry="7" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.1;opacity:.95"/><ellipse cx="${f1(x)}" cy="${f1(y+6)}" rx="7.5" ry="4.5" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.1;opacity:.95"/>`;
  const blob=(x,y,r,col,op=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel-2);stroke:${col};stroke-width:1.3;opacity:${f1(op)}"/>`;

  /* ---- the strip at the top: nucleus → ER → secretion → matrix ---- */
  function ov(W,y0,ph,N){
    const x0=12,w=W-24,X=v=>x0+w*v;let s='';
    const R=[{a:0,b:.18,n:'1 nucleus'},{a:.19,b:.47,n:N?'2–3 ER':'2–3 rough ER'},{a:.48,b:.655,n:N?'4 exit':'4 secretion'},{a:.67,b:1,n:N?'5–6 matrix':'5–6 outside the cell'}];
    s+=`<rect x="${f1(X(0))}" y="${y0}" width="${f1(w*.655)}" height="46" rx="18" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<ellipse cx="${f1(X(.09))}" cy="${y0+23}" rx="${f1(w*.07)}" ry="15" style="fill:var(--panel-2);stroke:var(--nuc);stroke-width:1.3"/>`;
    for(let i=0;i<3;i++){let d='';for(let j=0;j<=24;j++){const xx=X(.205)+j*w*.25/24;d+=(j?'L':'M')+f1(xx)+' '+f1(y0+12+i*11+Math.sin(j*.9+i)*3)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--cell-line);stroke-width:1.3"/>`;
      for(let j=1;j<24;j+=3)s+=`<circle cx="${f1(X(.205)+j*w*.25/24)}" cy="${f1(y0+12+i*11+Math.sin(j*.9+i)*3-2.5)}" r="1.4" style="fill:var(--muted)"/>`}
    for(let i=0;i<3;i++)s+=`<path d="M${f1(X(.5))} ${y0+13+i*9}q${f1(w*.05)} 7 ${f1(w*.1)} 0" style="fill:none;stroke:var(--cell-line);stroke-width:2.2;stroke-linecap:round"/>`;
    s+=`<circle cx="${f1(X(.632))}" cy="${y0+23}" r="5" style="fill:none;stroke:var(--cell-line);stroke-width:1.2"/>`;
    for(let i=0;i<4;i++)s+=`<rect x="${f1(X(.68+i*.012))}" y="${y0+5+i*10}" width="${f1(w*(.3-i*.016))}" height="6" rx="3" style="fill:var(--fibril);stroke:var(--fibril-line);stroke-width:.7"/>`;
    /* rings: the current step (jade), the faulty steps of the chosen type and the matrix pick (orange, dashed) */
    const bad=new Set(FAULT[V].map(i=>REG[i]));if(hl&&hl.c!=null&&hl.c<6)bad.add(REG[hl.c]);
    R.forEach((r,i)=>{if(bad.has(i))s+=`<rect x="${f1(X(r.a)-1)}" y="${y0-5}" width="${f1(w*(r.b-r.a)+2)}" height="56" rx="11" style="fill:none;stroke:var(--variant);stroke-width:1.8;stroke-dasharray:5 3"/>`;
      if(REG[ph]===i)s+=`<rect x="${f1(X(r.a)+2)}" y="${y0-2}" width="${f1(w*(r.b-r.a)-4)}" height="50" rx="9" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>`;
      s+=T(X((r.a+r.b)/2),y0+64,r.n,'t-xs t-mid',REG[ph]===i?'fill:var(--ink);font-weight:700':'')});
    return s}

  /* ---- step 1: two gene copies are read into mRNA ---- */
  function s1(B,u,t,N){let s='';const nw=N?B.w:B.w*.58,nh=N?214:B.h,g=GN[G],prod=[0,0];
    s+=`<rect x="${B.x}" y="${B.y}" width="${f1(nw)}" height="${nh}" rx="22" style="fill:var(--cell);stroke:var(--nuc);stroke-width:1.4;stroke-dasharray:6 4"/>`;
    s+=T(B.x+16,B.y+22,`NUCLEUS · ${g}, two copies`,'t-sm',INK);
    for(let c=0;c<2;c++){
      const y=B.y+(N?70:78)+c*(N?74:82),x0=B.x+20,len=nw-40,gs=x0+len*.1,ge=x0+len*.94;
      const p=ramp(u-c*.06,.02,.6),px=gs+(ge-gs)*p,mx=gs+(ge-gs)*.5,e0=gs+(ge-gs)*.12,e1=gs+(ge-gs)*.21;
      s+=`<rect x="${f1(gs)}" y="${y-10}" width="${f1(ge-gs)}" height="20" rx="4" style="fill:var(--panel-2)"/>`;
      for(let xx=x0;xx<=x0+len;xx+=8)s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-5}" y2="${y+5}" style="stroke:var(--line);stroke-width:1.2"/>`;
      s+=`<line x1="${f1(x0)}" x2="${f1(x0+len)}" y1="${y-5}" y2="${y-5}" style="stroke:var(--muted);stroke-width:1.6"/><line x1="${f1(x0)}" x2="${f1(x0+len)}" y1="${y+5}" y2="${y+5}" style="stroke:var(--muted);stroke-width:1.6"/>`;
      const wav=(xa,xb)=>{if(xb-xa<2)return '';let d='';for(let xx=xa;xx<=xb;xx+=3)d+=(d?'L':'M')+f1(xx)+' '+f1(y-17+Math.sin((xx-gs)*.25)*2.2);return `<path d="${d}" style="fill:none;stroke:var(--chain-a);stroke-width:2.4;stroke-linecap:round"/>`};
      let lab=`copy ${c+1}`,st='';
      if(c===1&&V==='c'){lab='copy 2 · null allele: no usable product';st=OR;
        if(p>.1)s+=cross(Math.min(px,ge)-14,y-18,5,2.4)}
      else if(c===1&&V==='a'){s+=`<rect x="${f1(e0)}" y="${y-9}" width="${f1(e1-e0)}" height="18" style="fill:var(--variant);opacity:.7"/>`;
        s+=wav(gs,Math.min(px,e0));if(px>e1){s+=wav(e1,px);s+=cross((e0+e1)/2,y-17,3.5,1.8)}
        lab='copy 2 · exon 6 (the cut site) is skipped';st=OR}
      else{s+=wav(gs,px);
        if(c===1&&V==='v'){s+=`<circle cx="${f1(mx)}" cy="${y}" r="5" style="fill:var(--variant);stroke:var(--ink);stroke-width:.8"/>`;
          if(px>mx)s+=`<circle cx="${f1(mx)}" cy="${y-17}" r="3.6" style="fill:var(--variant)"/>`;lab='copy 2 · missense change at a glycine codon';st=OR}}
      if(p>0&&p<1)s+=`<ellipse cx="${f1(px)}" cy="${y}" rx="11" ry="9" style="fill:var(--brand);opacity:.85"/>`;
      s+=T(x0,y+24,lab,'t-xs',st);
      prod[c]=c===1&&V==='c'?0:Math.floor(ramp(u-c*.06,.25,.95)*4);
    }
    const fy=B.y+nh-14;
    if(V==='d'||V==='k'){s+=T(B.x+16,fy-15,`Collagen genes are normal in ${V==='d'?'dEDS':'kEDS'}.`,'t-xs',OR);
      s+=T(B.x+16,fy,`${V==='d'?'ADAMTS2':'PLOD1'}: both copies changed (recessive). See step ${V==='d'?4:3}.`,'t-xs',OR)}
    else s+=T(B.x+16,fy,N?'dark oval = RNA polymerase · jade = mRNA':'dark oval = RNA polymerase reading · jade = mRNA','t-xs');
    /* cytoplasm: finished messages with ribosomes on them */
    const rx=N?B.x:B.x+nw+22,ry=N?B.y+nh+18:B.y,rw=N?B.w:B.w-nw-22;
    s+=T(rx,ry+16,'CYTOPLASM · mRNA meets ribosomes','t-sm',INK);
    let i=0;for(let c=0;c<2;c++)for(let j=0;j<prod[c];j++){const col=i%2,row=Math.floor(i/2),xx=rx+col*(rw/2)+4,yy=ry+44+row*25,L=rw/2-22;
      let d='';for(let q=0;q<=L;q+=3)d+=(q?'L':'M')+f1(xx+q)+' '+f1(yy+Math.sin(q*.25)*2);
      s+=`<path d="${d}" style="fill:none;stroke:var(--chain-a);stroke-width:2.2;stroke-linecap:round"/>`+ribo(xx+L*.38,yy-1);
      if(c===1&&V==='v')s+=`<circle cx="${f1(xx+L*.7)}" cy="${f1(yy)}" r="3.4" style="fill:var(--variant)"/>`;
      if(c===1&&V==='a')s+=cross(xx+L*.12,yy,3,1.6);
      i++}
    s+=T(rx,ry+(N?150:152),`mRNA so far: copy 1 → ${prod[0]} · copy 2 → ${prod[1]}`,'t-sm');
    const CMP={'1':['type I = 2 × α1(I) + 1 × α2(I)','found in dermis, bone, tendon, ligament'],'3':['type III = 3 × α1(III)','found in skin, blood vessels, intestine'],'5':['type V = several chain combinations','found in bone, dermis, cornea, placenta']};
    s+=T(rx,ry+(N?176:182),CMP[G][0],'t-sm',INK)+T(rx,ry+(N?193:199),CMP[G][1],'t-xs')+T(rx,ry+(N?210:216),`${GN[G]} encodes one of these chains`,'t-xs');
    return {svg:s,read:`<span>mRNA copies <b>${prod[0]+prod[1]}</b></span>`}}

  /* ---- step 2: three pro-α chains grow on ribosomes ---- */
  function s2(B,u,t,N){let s='';const x0=B.x+(N?24:44),len=B.w-(N?62:110),n=N?25:40,cols=COLS(),lb=LBL(),subI=Math.round(n/6)*3,gap=N?38:36;
    for(let i=0;i<3;i++){const y=B.y+30+i*gap,sh=ramp(u,i*.07,.62+i*.07),o={n,col:cols[i],show:sh,pro:true,wave:1.4},vv=V==='v'&&i===2;if(vv)o.sub=subI;
      s+=T(x0+8,y-11,lb[i]+(vv?' · from the changed copy':''),'t-xs',vv?OR:'');
      s+=chain(x0,y,len,o);
      if(sh>0&&sh<1){const k=Math.round(n*sh);s+=ribo(x0+Math.max(0,k-1)*len/(n-1),y)}}
    const y3=B.y+30+2*gap+24;
    s+=T(x0-6,y3,'N-end','t-xs')+T(x0+len+8,y3,'C-end','t-xs t-end')+T(x0+len/2,y3,N?'built N → C on the rough ER':'built from N to C on ribosomes of the rough ER','t-xs t-mid');
    const zy=N?B.y+196:B.y+178,nt=N?3:4,sp=N?38:40,zx=x0+12;
    s+=T(x0,zy-30,'ZOOM · THE REPEAT: Gly-X-Y','t-sm',INK);
    for(let j=0;j<nt*3;j++){const ty=j%3,ap=ramp(u,.12+j*.035,.17+j*.035);if(ap<=0)continue;const cx=zx+j*sp,bad=V==='v'&&ty===0&&j===(nt-1)*3;
      const r=(bad?13:ty===0?8:12)*(.4+.6*ap),fill=bad?'var(--variant)':ty===0?'var(--chain-b)':'var(--chain-a)';
      s+=`<circle cx="${f1(cx)}" cy="${zy}" r="${f1(r)}" style="fill:${fill};opacity:${f1(ap)}"/>`;
      if(ap>.6)s+=T(cx,zy+3.5,bad?'!':['G','X','Y'][ty],'t-xs t-mid','fill:var(--panel);font-weight:700');
      if(j<3)s+=T(cx,zy+28,['Gly','X','Y'][ty],'t-xs t-mid',INK)}
    const c1=N?['X: proline about 28% of the time','Y: hydroxyproline about 38%','Pro-Hyp-Gly is the commonest triplet: 10.5%']:['X is proline about 28% of the time · Y is 4-hydroxyproline about 38%','Pro-Hyp-Gly is the commonest triplet: 10.5% of all triplets'];
    c1.forEach((l,i)=>s+=T(x0,zy+50+i*16,l,'t-xs'));
    if(V==='v'){const ly=zy+50+c1.length*16;
      (N?['vEDS: a bulkier amino acid replaces glycine;','it does not fit the centre of the helix']:['vEDS: a bulkier amino acid replaces glycine and does not fit the centre of the helix']).forEach((l,i)=>s+=T(x0,ly+i*16,l,'t-xs',OR))}
    return {svg:s,read:`<span>triplets per chain <b>${Math.floor(Math.round(n*ramp(u,0,.62))/3)}</b></span>`}}

  /* ---- step 3: hydroxylation, then three chains zip into a helix from the C-end ---- */
  function s3(B,u,t,N){let s='';const x0=B.x+(N?26:52),len=B.w-(N?70:124),n=N?25:40,cols=COLS(),yc=B.y+(N?84:82),
      aa=ramp(u,0,.4),bb=ramp(u,.38,1),fa=1-ramp(u,.38,.46),fb=ramp(u,.38,.46),sp=26,amp=N?9:11,subI=Math.round(n/6)*3;
    const zb=V==='v'?(bb<.45?bb/.45*.55:bb<.72?.55:.55+(bb-.72)/.28*.45):bb;
    if(fa>0){s+=`<g style="opacity:${f1(fa)}">`;
      for(let i=0;i<3;i++){const y=yc+(i-1)*sp,o={n,col:cols[i],pro:true,hyd:aa,wave:1.2};if(V==='v'&&i===2)o.sub=subI;s+=chain(x0,y,len,o);
        [5,14,23,32].forEach(j=>{if(j>=n||j/n>=aa)return;const bx=x0+j*len/(n-1),by=y+Math.sin(j*.7)*1.2;
          s+=V==='k'?cross(bx,by+9,2.6,1.6):`<rect x="${f1(bx-3)}" y="${f1(by+5)}" width="6" height="6" rx="1" style="fill:var(--gold)"/>`})}
      const pill=(x,y,txt,bad)=>`<rect x="${f1(x-26)}" y="${f1(y-9)}" width="52" height="17" rx="8.5" style="fill:${bad?'var(--bad-soft)':'var(--panel)'};stroke:${bad?'var(--variant)':'var(--muted)'};stroke-width:1.2"/>`+T(x,y+3.5,txt,'t-xs t-mid',bad?OR:INK);
      const px=x0+clamp(len*aa,26,len-26);
      s+=pill(px,yc-sp-20,'P4H',false)+pill(px,yc+sp+22,'LH1',V==='k');
      if(V==='k')s+=`<line x1="${f1(px-24)}" y1="${f1(yc+sp+22)}" x2="${f1(px+24)}" y2="${f1(yc+sp+22)}" style="stroke:var(--variant);stroke-width:1.6"/>`;
      s+='</g>'}
    if(fb>0){s+=`<g style="opacity:${f1(fb)}">`;
      s+=helix(x0,yc,len,{amp,zip:zb,phase:t*3,w:3,cols,kink:V==='v'?.45:undefined});
      const cm=ramp(bb,0,.15),nm=ramp(zb,.92,1);
      for(let k=0;k<3;k++){s+=blob(x0+len+15,yc+(k-1)*amp*2.1*(1-cm),cm>=1?12:7,cols[k]);s+=blob(x0-11,yc+(k-1)*amp*2.1*(1-nm),4.5,cols[k])}
      if(bb<.35)s+=T(x0+len+28,yc-amp*2.1-14,'C-propeptides line the chains up','t-xs t-end',INK);
      if(zb<1){const fx=x0+len*(1-zb);s+=`<path d="M${f1(Math.min(fx+44,x0+len))} ${f1(yc+amp*2.1+14)}H${f1(fx+4)}" class="arrow" marker-end="url(#coArr)"/>`}
      if(V==='v'&&bb>=.45&&bb<.72)s+=T(x0+len*.45,yc+amp*2.1+32,'folding stalls at the substitution · chains over-modified','t-xs t-mid',OR);
      s+='</g>'}
    const iy=yc+(N?78:76);
    s+=T(x0,iy,`hydroxylated ${Math.round(aa*100)}% · helix wound ${Math.round(zb*100)}% (from the C-end)`,'t-sm',INK);
    const L=N?['small dot above a bead = hydroxyproline','gold square = hydroxylysine (sugar and cross-link site)','left-handed chains → right-handed triple helix','one-residue stagger · 28.6 Å axial repeat']
             :['small dot above a bead = hydroxyproline · gold square below = hydroxylysine (sugar and cross-link site)','three left-handed chains coil into one right-handed triple helix · one-residue stagger · 28.6 Å repeat'];
    L.forEach((l,i)=>s+=T(x0,iy+18+i*15,l,'t-xs'));
    const vy=iy+18+L.length*15+4;
    if(V==='k')s+=T(x0,vy,N?'kEDS: LH1 (PLOD1) missing: no hydroxylysine':'kEDS: lysyl hydroxylase 1 (PLOD1) missing, so no hydroxylysine forms','t-xs',OR);
    else if(V==='v')s+=T(x0,vy,N?'vEDS: the orange kink is the glycine substitution':'vEDS: the orange kink marks the glycine substitution; changed and normal chains mix','t-xs',OR);
    else if(G==='3'&&V==='n')s+=T(x0,vy,'FKBP14 speeds the folding of type III collagen','t-xs');
    return {svg:s,read:`<span>hydroxylated <b>${Math.round(aa*100)}%</b></span><span>wound <b>${Math.round(zb*100)}%</b></span>`}}

  /* ---- step 4: secretion, then the two propeptides are cut off ---- */
  function s4(B,u,t,N){let s='';const L=N?190:300,amp=N?7:8,mx=B.x+(N?44:140),my=B.y+(N?84:88),cols=COLS(),
      pos=ease(ramp(u,0,.36)),xm=lerp(mx-L-40,mx+(N?70:60),pos),blk=V==='d'||V==='a',cutN=blk?0:ramp(u,.42,.6),cutC=ramp(u,.6,.78),mh=N?110:116;
    s+=`<rect x="${mx-5}" y="${B.y}" width="10" height="${mh}" style="fill:var(--panel-2)"/>`;
    for(let yy=B.y+3;yy<B.y+mh;yy+=7)s+=`<circle cx="${mx-4}" cy="${yy}" r="2" style="fill:var(--cell-line)"/><circle cx="${mx+4}" cy="${yy}" r="2" style="fill:var(--cell-line)"/>`;
    s+=T(mx-12,B.y+12,'inside','t-xs t-end')+T(mx+12,B.y+12,N?'outside':'outside the cell','t-xs');
    const ve=1-ramp(u,.22,.36);if(ve>0)s+=`<rect x="${f1(xm-24)}" y="${my-24}" width="${L+56}" height="48" rx="24" style="fill:none;stroke:var(--cell-line);stroke-width:1.3;stroke-dasharray:4 3;opacity:${f1(ve)}"/>`;
    s+=helix(xm,my,L,{amp,zip:1,phase:t*2,w:2.6,cols,kink:V==='v'?.45:undefined});
    s+=blob(xm-10-cutN*26,my-cutN*14,7,cols[0],1-cutN*.9)+blob(xm+L+14+cutC*26,my+cutC*12,12,cols[2],1-cutC*.9);
    const scis=(x,y,l1,l2,bad)=>{let g=`<path d="M${f1(x-7)} ${f1(y-9)}L${f1(x+7)} ${f1(y+7)}M${f1(x+7)} ${f1(y-9)}L${f1(x-7)} ${f1(y+7)}" style="stroke:var(--ink);stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(x-8)}" cy="${f1(y-11)}" r="3" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(x+8)}" cy="${f1(y-11)}" r="3" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
      if(bad)g+=`<circle cx="${f1(x)}" cy="${f1(y-2)}" r="12" style="fill:none;stroke:var(--variant);stroke-width:2"/><line x1="${f1(x-8)}" y1="${f1(y+6)}" x2="${f1(x+8)}" y2="${f1(y-10)}" style="stroke:var(--variant);stroke-width:2"/>`;
      return g+T(x,y-34,l1,'t-xs t-mid',bad?OR:INK)+T(x,y-22,l2,'t-xs t-mid',bad?OR:'')};
    if(u>.36&&u<.9){const sy=my-amp-16;
      s+=scis(xm-4,sy,V==='d'?'ADAMTS2 missing':V==='a'?'no cut site':'ADAMTS2',V==='a'?'(exon 6 skipped)':'N-proteinase',blk);
      s+=scis(xm+L+4,sy,'BMP-1','C-proteinase',false)}
    const st=(c,b)=>b?'stays on':c>=1?'cut off':c>0?'being cut':'on';
    const yS=my+(N?44:48);
    s+=T(B.x+(N?6:10),yS,`N-propeptide: ${st(cutN,blk)} · C-propeptide: ${st(cutC,false)}`,'t-sm',blk?OR:INK);
    const y2=yS+40,x1=B.x+30;
    if(!blk){s+=T(x1-10,y2-16,'one chain alone, before and after trimming','t-xs');
      s+=chain(x1,y2,N?280:400,{n:N?21:30,pro:true,cut:Math.min(cutN,cutC),col:cols[0],wave:1.2})}
    else (N?['Same step, blocked from two sides:','dEDS lacks the enzyme (ADAMTS2);','aEDS lacks the cut site (exon 6).']:['Same step, blocked from two sides: dEDS lacks the enzyme (ADAMTS2),','aEDS lacks the cut site in the substrate (exon 6 of COL1A1 or COL1A2).']).forEach((l,i)=>s+=T(x1-10,y2-12+i*16,l,'t-xs',OR));
    const fy=B.y+(N?250:222);
    (N?['Before trimming, C-propeptides keep','procollagen soluble. Fibrils form only','after both ends are cut off.']:['Before trimming, C-propeptides keep procollagen soluble;','fibrils can form only after both ends are cut off.']).forEach((l,i)=>s+=T(B.x+(N?6:20),fy+i*15,l,'t-xs'));
    return {svg:s,read:`<span>N-propeptide <b>${st(cutN,blk)}</b></span><span>C-propeptide <b>${st(cutC,false)}</b></span>`}}

  /* ---- step 5: molecules join a quarter-staggered fibril ---- */
  function s5(B,u,t,N){let s='';const x=B.x+8,len=B.w-16,rows=N?10:8,rh=N?10:11,fy=B.y+(N?70:62),irr=V==='c'||V==='d'||V==='a',
      gr=ramp(u,.06,.9)*(V==='v'?.72:1),mol=len*.34,gp=mol*.12,D=(mol+gp)/5;
    s+=T(x+len,B.y+10,'gold = type V collagen','t-xs t-end');
    for(let j=0;j<2;j++){const p=ramp(u,.1+j*.32,.42+j*.32);if(p<=0||p>=1)continue;const hx=x+len*(.16+.42*j),hy=lerp(B.y+24,fy-6,ease(p));
      s+=`<g style="opacity:${f1(1-ramp(p,.8,1))}">`+helix(hx,hy,mol*.8,{amp:3.5,zip:1,phase:t*4,w:1.8,cols:COLS(),kink:V==='v'&&j===1?.5:undefined})+'</g>'}
    s+=fibril(x,fy,len,{rows,rh,grow:gr,irregular:irr,seed:V==='c'?23:irr?31:11}).svg;
    const rr=rng(77),nV=V==='c'?3:7;
    for(let i=0;i<nV;i++){const xx=x+len*(.04+rr()*.86),r=Math.floor(rr()*rows);if((xx-x)/len*.7+r/rows*.3>gr)continue;
      s+=`<rect x="${f1(xx)}" y="${f1(fy+r*rh+rh*.12)}" width="12" height="${f1(rh*.5)}" rx="2" style="fill:var(--gold)"/>`}
    const r2=rng(5);
    if(V==='v')for(let i=0;i<8;i++){const xx=x+len*(.04+r2()*.9),r=Math.floor(r2()*rows);if((xx-x)/len*.7+r/rows*.3>gr)continue;s+=`<circle cx="${f1(xx)}" cy="${f1(fy+r*rh+rh*.36)}" r="3.2" style="fill:var(--variant)"/>`}
    if(V==='d'||V==='a')for(let i=0;i<10;i++){const xx=x+len*(.04+r2()*.9),r=Math.floor(r2()*rows);if((xx-x)/len*.7+r/rows*.3>gr)continue;s+=blob(xx,fy+r*rh+rh*.4,3.6,'var(--muted)')}
    const ay=fy+rows*rh+18,op=ramp(gr,.5,.8);
    if(!irr&&op>0){const xa=x+D/2,xb=xa+D;s+=`<g style="opacity:${f1(op)}">`;
      s+=`<path d="M${f1(xa)} ${ay-7}V${ay}H${f1(xb)}V${ay-7}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`+T((xa+xb)/2,ay+14,'D = 67 nm','t-sm t-mid',INK);
      s+=T(N?x:xb+40,N?ay+32:ay+4,'each D = gap zone 0.54 D + overlap zone 0.46 D','t-xs');
      const ma=x+len*(N?.3:.28),my2=N?ay+52:ay+30;
      s+=`<path d="M${f1(ma)} ${my2-6}V${my2}H${f1(ma+mol)}V${my2-6}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
      s+=T(N?x:ma+mol+10,N?my2+16:my2+4,N?'one molecule ≈ 300 nm = 4.46 D, under 2 nm wide':'one molecule ≈ 300 nm = 4.46 D','t-xs');
      if(!N)s+=T(ma+mol+10,my2+18,'and under 2 nm wide','t-xs');
      s+='</g>'}
    else if(irr)(V==='c'?(N?['cEDS: too little type V, so fewer fibrils start,','and some grow large and irregular (schematic)']:['cEDS: too little type V, so fewer fibrils start, and some grow large and irregular (schematic)'])
      :(N?['N-propeptides that stay on change','fibril shape (schematic)']:['N-propeptides that stay on (grey) change fibril shape (schematic)'])).forEach((l,i)=>s+=T(x,ay+4+i*16,l,'t-xs',OR));
    if(V==='v')s+=T(x,N?ay+86:ay+62,N?'vEDS: fewer molecules; orange = faulty chain':'vEDS: fewer molecules join, and some carry a faulty chain (orange)','t-xs',OR);
    const fy2=B.y+(N?300:226);
    (N?['Purified collagen can assemble on its own;','in tissue, cells steer where fibrils start,','which way they point and how thick they grow.']:['Purified collagen can assemble on its own; in tissue, cells steer where fibrils start,','which way they point and how thick they grow.']).forEach((l,i)=>s+=T(x,fy2+i*15,l,'t-xs'));
    return {svg:s,read:`<span>molecules joined <b>${Math.round(gr*100)}%</b></span><span>D-period <b>67 nm</b></span>`}}

  /* ---- step 6: cross-links, and a cross-section showing fibril number and width ---- */
  function s6(B,u,t,N){let s='';const fx=B.x+8,fl=N?B.w-16:340,fy=B.y+(N?34:36),rows=N?7:8,rh=10,irr=V==='c'||V==='d'||V==='a';
    s+=T(fx,fy-14,N?'LOX: lysine → aldehyde → cross-link':'LOX: lysine → aldehyde → covalent cross-link','t-xs',INK);
    s+=fibril(fx,fy,fl,{rows,rh,grow:1,irregular:irr,seed:V==='c'?23:irr?31:11}).svg;
    const rr=rng(19),nx=Math.floor(fl/18),cnt=Math.floor(ramp(u,.08,.55)*nx);
    for(let i=0;i<cnt;i++){const xx=fx+9+i*18,r=Math.floor(rr()*(rows-1)),y1=fy+r*rh+rh*.6,y2=fy+(r+1)*rh+rh*.2;
      s+=`<line x1="${f1(xx)}" x2="${f1(xx+2)}" y1="${f1(y1)}" y2="${f1(y2)}" style="stroke:${V==='k'?'var(--variant)':'var(--accent)'};stroke-width:1.9;stroke-linecap:round${V==='k'?';stroke-dasharray:2 1.6':''}"/>`}
    /* cross-section */
    const cx0=N?B.x:B.x+372,cy0=N?fy+rows*rh+34:B.y+26,cw=N?B.w:B.w-372,ch=N?168:150,gw=ease(ramp(u,.15,.75));
    s+=T(cx0+4,cy0-8,'CROSS-SECTION OF A BUNDLE (schematic)','t-xs',INK);
    s+=`<rect x="${f1(cx0)}" y="${f1(cy0)}" width="${f1(cw)}" height="${ch}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const g=rng(41),spx=27,spy=24,nc=Math.floor((cw-30)/spx),nr=Math.floor((ch-24)/spy);
    for(let r=0;r<nr;r++)for(let c=0;c<nc;c++){const px=cx0+22+c*spx+(r%2)*spx/2,py=cy0+22+r*spy,j1=g(),j2=g(),j3=g();if(px>cx0+cw-16)continue;
      let R=10+(j2-.5),shape='c';
      if(V==='c'){if(j1<.5)continue;R=8+j2*13;shape='f'}else if(V==='v'){if(j1<.3)continue;R=5+j2*1.5}else if(V==='d'||V==='a'){R=9+j2*2;shape='p'}
      R*=gw;if(R<.6)continue;
      if(shape==='c')s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(R)}" style="fill:var(--fibril);stroke:var(--fibril-line);stroke-width:1"/>`;
      else{const lob=5+Math.floor(j3*3),m=shape==='f'?.2:0;let d='';
        for(let q=0;q<=36;q++){const a=q/36*Math.PI*2,rr2=shape==='f'?R*(1+m*Math.sin(lob*a)):R*(.72+.5*Math.abs(Math.sin(a*2.5+j3*6))*(.6+j1*.4));d+=(q?'L':'M')+f1(px+Math.cos(a)*rr2)+' '+f1(py+Math.sin(a)*rr2)}
        s+=`<path d="${d}Z" style="fill:var(--fibril);stroke:${shape==='f'?'var(--variant)':'var(--fibril-line)'};stroke-width:1"/>`}}
    if(gw>.5)for(let i=0;i<5;i++){const px=cx0+22+spx*(1+i*1.6)+spx/4,py=cy0+22+spy*((i%3)+.5);if(px>cx0+cw-12||py>cy0+ch-10)continue;
      let d='';for(let k=0;k<3;k++){const a=k*Math.PI/3;d+=`M${f1(px-Math.cos(a)*5)} ${f1(py-Math.sin(a)*5)}L${f1(px+Math.cos(a)*5)} ${f1(py+Math.sin(a)*5)}`}
      s+=`<path d="${d}" style="stroke:var(--nerve);stroke-width:1.4;stroke-linecap:round;opacity:${f1(ramp(gw,.5,1))}"/>`}
    const LG={n:'even, round fibrils of similar width',c:'fewer fibrils, some large with flower-like outlines',v:'small-diameter fibrils, as reported in vEDS skin',
      a:'irregular outlines where N-propeptides stay on',d:'irregular outlines where N-propeptides stay on',k:'normal size and shape; the cross-link chemistry differs'};
    s+=T(cx0+4,cy0+ch+16,LG[V],'t-xs',V==='n'||V==='k'?INK:OR)+T(cx0+4,cy0+ch+31,'violet asterisks = tenascin-X (regulates deposition)','t-xs');
    /* urinary cross-link ratio, from a published comparison */
    const by=N?cy0+ch+62:fy+rows*rh+30,bx=fx+(N?118:132),bw=N?150:150,gb=ramp(u,.25,.85);
    s+=T(fx,by,'URINE LP/HP CROSS-LINK RATIO','t-xs',INK);
    [{l:'controls',v:.2,k:0},{l:'SLC39A13 spEDS',v:1,k:0},{l:'PLOD1-kEDS',v:6,k:1}].forEach((b,i)=>{const yy=by+18+i*18,hot=b.k&&V==='k';
      s+=T(fx,yy+4,b.l,'t-xs',hot?'fill:var(--variant);font-weight:700':'');
      s+=`<rect x="${f1(bx)}" y="${yy-5}" width="${f1(Math.max(1.5,bw*b.v/6*gb))}" height="10" rx="2" style="fill:${b.k?'var(--variant)':'var(--muted)'};opacity:${hot||!b.k?1:.55}"/>`;
      if(gb>.3)s+=T(bx+bw*b.v/6+6,yy+4,'≈ '+b.v,'t-xs',INK)});
    s+=T(fx,by+(N?78:76),'Cross-links add strength; fibrils form without them.','t-xs');
    return {svg:s,read:`<span>cross-links <b>${cnt} of ${nx}</b></span>`}}

  const SC=[s1,s2,s3,s4,s5,s6];
  function draw(t){
    const N=vb(svg,'720 380','400 600'),W=N?400:720;
    const B=N?{x:14,y:92,w:372,h:470}:{x:20,y:88,w:680,h:250};
    const ph=phaseOf(CO_STEPS,t),a=CO_STEPS[ph].from,b=ph<5?CO_STEPS[ph+1].from:1,u=clamp((t-a)/(b-a));
    let s=`<defs>${marker('coArr','var(--muted)')}<clipPath id="coClip"><rect x="${B.x-6}" y="${B.y-8}" width="${B.w+12}" height="${B.h+14}"/></clipPath></defs>`;
    s+=ov(W,10,ph,N);
    const r=SC[ph](B,u,t,N);
    s+=`<g clip-path="url(#coClip)">${r.svg}</g>`;
    const hr=hl&&hl.c!=null?CO_MX[hl.i]:null;
    let cap=`${VN[V]} · step ${ph+1} of 6: ${CO_STEPS[ph].t}`;
    if(hr)cap+=N?` · ring: ${hr.ab}`:` · orange ring: where ${hr.ab} (${hr.gene.split(' (')[0]}) acts`;
    else if(FAULT[V].includes(ph))cap+=' · the faulty step';
    s+=T(N?14:20,N?590:368,cap,'t-sm',FAULT[V].includes(ph)||hr?OR:INK);
    svg.innerHTML=s;
    setSt(ph);
    const P=CO_STEPS[ph],vt=V!=='n'?`</p><p class="covar"><b class="vl">${VN[V]}</b>${CO_VN[V][ph]}`:'';
    $('#coNote').innerHTML=noteHTML(Object.assign({},P,{txt:P.txt+vt}));
    $('#coRead').innerHTML=`<span>gene <b>${GN[G]}</b></span><span>showing <b>${VN[V]}</b></span><span>step <b>${ph+1} of 6</b></span>${r.read}`;
  }
  const stop=playWire(rg,$('#coPlay'),draw,26000,'Replay','collagen');
  setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);

  function setGene(g){G=g;$$('[data-cog]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.cog===G))}
  function setVar(v,keepHl){V=v;$$('[data-cov]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.cov===V));
    const lock={c:'5',v:'3',a:'1'}[V];if(lock)setGene(lock);
    if(!keepHl){hl=null;$$('#coMx [aria-pressed]').forEach(b=>b.setAttribute('aria-pressed','false'));$$('#coMx tr.hl').forEach(tr=>tr.classList.remove('hl'))}}
  $$('[data-cov]').forEach(b=>b.addEventListener('click',()=>{setVar(b.dataset.cov,false);draw(+rg.value)}));
  $$('[data-cog]').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.cog;if({c:'5',v:'3',a:'1'}[V]&&{c:'5',v:'3',a:'1'}[V]!==g)setVar('n',false);setGene(g);draw(+rg.value)}));

  /* ---- "which step breaks" matrix ---- */
  const HD=['1 Gene → mRNA','2 Gly-X-Y chain','3 Modify &amp; fold','4 Cut the ends','5 Assemble fibril','6 Cross-link &amp; size','Outside collagen'];
  let h='<table><thead><tr><th scope="col">Type · gene</th>'+HD.map(x=>`<th scope="col">${x}</th>`).join('')+'</tr></thead><tbody>';
  CO_MX.forEach((r,i)=>{h+=`<tr data-cmrow="${i}"><th scope="row"><button data-cmr="${i}" aria-pressed="false"><b>${r.ab}<span class="inh">${r.inh}</span></b><small>${r.gene}</small></button></th>`;
    if(!r.c)h+=`<td colspan="7" class="none">${r.none}</td>`;
    else for(let c=0;c<7;c++){const l=r.c[c];h+=l?`<td><button class="${l===2?'p':''}" data-cmc="${i}:${c}" aria-pressed="false" aria-label="${r.name}, ${HD[c].replace('&amp;','and')}: ${l===2?'main step':'also involved'}">${l===2?'●':'○'}</button></td>`:'<td></td>'}
    h+='</tr>'});
  $('#coMx').innerHTML=h+'</tbody></table>';
  const INH={AD:'Autosomal dominant',AR:'Autosomal recessive','AD/AR':'Dominant or recessive','?':'No gene known'};
  function pick(i,c){const r=CO_MX[i];
    if(c==null&&r.c)c=+Object.keys(r.c).find(k=>r.c[k]===2);
    if(c===undefined)c=null;
    setVar(r.v||'n',true);hl={i,c};
    $$('#coMx [data-cmr]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cmr===i));
    $$('#coMx [data-cmc]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cmc===i+':'+c));
    $$('#coMx tr[data-cmrow]').forEach(tr=>tr.classList.toggle('hl',+tr.dataset.cmrow===i));
    if(c!=null&&c<6){stop();rg.value=CO_STEPS[c].at}
    draw(+rg.value);
    const where=c==null?'':c<6?` <b>Shown:</b> step ${c+1}, ${HD[c].replace(/^\d /,'').replace('&amp;','and').toLowerCase()}${r.v?', with this type switched on':', drawn as the typical step'}.`:' <b>Outside the six steps:</b> the animation stays where it is.';
    $('#coMxOut').innerHTML=noteHTML({k:`${INH[r.inh]} · ${r.gene}`,t:r.name,txt:r.txt+where,
      pt:r.c?null:`Doctors diagnose hypermobile EDS from a careful examination; a gene test cannot confirm it yet.`});
  }
  $('#coMx').addEventListener('click',e=>{const a=e.target.closest('[data-cmr]'),b=e.target.closest('[data-cmc]');
    if(a)pick(+a.dataset.cmr,null);else if(b){const p=b.dataset.cmc.split(':');pick(+p[0],+p[1])}});
  $('#coMxOut').innerHTML=noteHTML({k:'Which step breaks',t:'Pick a type or a dot',
    txt:`Each row is one type in the 2017 classification, plus classical-like EDS type 2. A filled dot is the step its gene mainly affects. Picking one switches the animation to that step, and for cEDS, vEDS, aEDS, dEDS and PLOD1-kEDS also switches the type on. [[Malfait2017,Malfait2020]]`,
    hook:`Same step, two sides: dEDS lacks the N-proteinase (ADAMTS2); aEDS lacks its cut site (exon 6). [[Colige1999,Byers1997]]`});

  draw(+rg.value);
};
