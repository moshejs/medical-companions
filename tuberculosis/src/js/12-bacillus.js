/* =============== 1.2 the TB bacterium =============== */
const BA_LAYERS=[
 {n:'Cytoplasm',c:'var(--cell)',s:'var(--mac-line)',
  d:`The genome — 4,411,529 base pairs, about 4,000 genes — and the RNA polymerase that reads it. An unusually large part of that coding capacity builds and breaks down lipids. [[Cole1998]]`},
 {n:'Plasma membrane',c:'var(--nuc)',s:'var(--nuc)',
  d:`The living boundary of the cell, where the ATP synthase sits. Everything outside it is wall that the cell builds around itself. [[Brennan2003,Andries2005]]`},
 {n:'Peptidoglycan',c:'var(--fibro)',s:'var(--fibro)',
  d:`The inner mesh, joined through an L-Rha-D-GlcNAc-P linker unit to the sugar layer above it. Ligating the whole core to peptidoglycan is predicted to be an excellent drug target. [[Brennan2003]]`},
 {n:'Arabinogalactan',c:'var(--mac)',s:'var(--mac-line)',
  d:`A linear galactofuran carrying several strands of highly branched arabinofuran. Both chains are extended while the intermediate is carried out through the membrane. [[Brennan2003]]`},
 {n:'Mycolic acids',c:'var(--tb)',s:'var(--tb)',
  d:`Very long fatty acids standing perpendicular to the membrane plane: the major, species-specific lipids of the envelope, essential for survival of the whole genus, and recognised by CD1-restricted T cells. [[Brennan2003,Marrakchi2014]]`},
 {n:'Outer lipids',c:'var(--gold)',s:'var(--gold)',
  d:`Phthiocerol dimycocerosate, cord factor (dimycolyltrehalose), sulfolipids and phosphatidylinositol mannosides are intercalated in the lipid layer. Lipoarabinomannan from here blocks phagosome maturation inside macrophages. [[Brennan2003,Briken2004]]`}];
const BA_R=[40,58,76,96,120,150];
const BA_DRUGS=[
 {n:'Isoniazid',l:'H',li:4,c:'var(--dH)',t:'stops mycolic acids being made',
  d:`Isoniazid is a prodrug activated by the catalase-peroxidase KatG, then inhibits InhA, the enoyl reductase of mycolic acid synthesis. A single <i>katG</i> gene restored isoniazid sensitivity to a resistant mutant, and a missense mutation in <i>inhA</i> confers resistance to isoniazid and ethionamide. [[Zhang1992,Banerjee1994]]`},
 {n:'Ethambutol',l:'E',li:3,c:'var(--dE)',t:'stops arabinan being polymerised',
  d:`Ethambutol inhibits polymerisation of cell-wall arabinan, so decaprenol phosphoarabinose accumulates. Resistance comes from overexpression of Emb protein(s), structural mutation in EmbB, or both, in the <i>embCAB</i> cluster of arabinosyl transferases. [[Telenti1997]]`},
 {n:'Rifampicin',l:'R',li:0,c:'var(--dR)',t:'blocks RNA polymerase, deep inside',
  d:`Rifampicin binds the β subunit of RNA polymerase. In 122 isolates, mutations at 8 conserved amino acids were found in 64 of 66 rifampicin-resistant isolates and in none of 56 susceptible ones, all inside a 23-amino-acid stretch of <i>rpoB</i> — the basis of rapid molecular resistance testing. [[Telenti1993]]`},
 {n:'Bedaquiline',l:'B',li:1,c:'var(--dNew)',t:'jams the ATP synthase',
  d:`Bedaquiline inhibits mycobacterial ATP synthase in the plasma membrane, with an MIC of 0.06 µg/mL against drug-susceptible and drug-resistant strains, and bactericidal activity in mice exceeding isoniazid and rifampicin by at least 1 log. [[Andries2005]]`}];
const BA_STEPS=[
 {from:0,at:.1,k:'Scene 1 · the smear',t:'Acid-fast rods on a blue field',
  txt:`In a Ziehl–Neelsen sputum smear the bacillus keeps the red carbol-fuchsin stain through an acid-alcohol wash — it is <b>acid-fast</b> — while everything else loses it and takes the methylene-blue counterstain. Rods often lie end to end in serpentine <b>cords</b>, an effect of the trehalose dimycolate (cord factor) in the outer envelope. Bacillary length differs with where the specimen came from: 1.9 ± 0.1 µm inside cavities, 2.9 ± 0.1 µm in sputum and 3.6 ± 0.2 µm in lavage fluid. [[Brennan2003,Eum2010]]`,
  pt:`The red stain is the oldest TB test there is: a sample of spit, a slide and a microscope can show the germ the same day.`,
  hook:`Counting bacilli under the microscope agreed well with culturable counts before or very early in treatment in 27 of 28 people — a same-day measure of how many bacilli are left. [[Hobby1973]]`},
 {from:.26,at:.4,k:'Scene 2 · the envelope',t:'A waxy wall, built in layers',
  txt:`Cut the bacillus across and the wall is one massive covalent core: peptidoglycan, linked through a short linker unit to a linear galactofuran, attached to branched arabinofuran, attached in turn to mycolic acids standing perpendicular to the membrane — "a truly special lipid barrier", with further lipids intercalated in it. That wall is impermeable to many compounds, which is part of the organism's inherent resistance to numerous drugs, and it is complex enough that the cell needs specialised machinery to divide at all. [[Brennan2003,Hett2008]]`,
  pt:`The germ wears a thick, waxy coat. It keeps medicines out, holds the red stain in, and has to be rebuilt every time the cell divides.`,
  hook:`Order from the inside out: plasma membrane → peptidoglycan → linker unit → galactofuran → arabinofuran → mycolic acids → outer lipids. [[Brennan2003]]`},
 {from:.54,at:.66,k:'Scene 3 · drug targets',t:'Four drugs, four targets',
  txt:`Each of these drugs attacks a different part of the structure. Isoniazid stops mycolic acids being made; ethambutol stops arabinan being polymerised; rifampicin reaches past the wall to RNA polymerase; bedaquiline jams the ATP synthase in the membrane. Mycolic acid biosynthesis, and the attachment of mycolic acids to the core, are long-established routes to new antimycobacterial agents. [[Banerjee1994,Telenti1997,Telenti1993,Andries2005,Marrakchi2014]]`,
  pt:`Different TB medicines break different parts of the coat, or the machinery inside it. That is one reason several are always given together.`,
  hook:`Resistance arises by chromosomal mutation, at very different rates: 2.25 × 10⁻¹⁰ per bacterium per generation for rifampicin, 2.56 × 10⁻⁸ for isoniazid, 2.95 × 10⁻⁸ for streptomycin and 10⁻⁷ for ethambutol. One drug alone would select the mutants that are already there. [[David1970]]`},
 {from:.76,at:.92,k:'Scene 4 · slow growth',t:'A day to double, weeks to report',
  txt:`In carbon-limited chemostat culture a "fast-growing" <i>M. tuberculosis</i> population was held at a mean generation time of 23.1 hours and a slow-growing population at 69.3 hours, and the two differed in how they responded to isoniazid. Slow growth is not an artefact of the flask: in a chemostat model it switched on genes of the dormancy survival regulon, and the transcriptome overlapped strikingly with that of bacteria living inside macrophages. In the laboratory that slowness sets the clock — liquid culture reports growth in 10–14 days, solid culture in 3–4 weeks. [[Jeeves2015,Beste2007,Lewinsohn2017]]`,
  pt:`TB germs take about a day to double, while many common bacteria double in under an hour. That is why a TB culture takes weeks, and part of why treatment takes months rather than days.`,
  hook:`Slow growth, a near-impermeable wall and subpopulations that barely metabolise are the standing explanation for multi-drug, multi-month treatment. [[Jeeves2015,Hett2008]]`}];
const BA_REGS=['Americas','Europe','Africa','Asia','Oceania'];
const BA_MTBC=[
 {id:'mtb',n:'M. tuberculosis',it:1,sub:'the human lineages',regs:['Americas','Europe','Africa','Asia','Oceania'],br:'mtb',
  t:'Human-adapted, and clonal',
  txt:`The complex has a clonal population structure, with such low DNA sequence diversity that standard bacterial typing methods are uninformative; whole-genome sequencing of large clinical collections is what opened up its ecology and evolution. Presence or absence of the TbD1 deletion divides <i>M. tuberculosis</i> into "ancestral" and "modern" strains, the latter including the Beijing, Haarlem and African clusters. [[Gagneux2018,Brosch2002]]`,
  pt:`All the TB germs that infect people are close relatives — close enough that the usual ways of telling bacteria apart do not work on them.`,
  hook:`TbD1 separates ancestral from modern <i>M. tuberculosis</i>; the modern group includes the Beijing, Haarlem and African clusters. [[Brosch2002]]`},
 {id:'l4',n:'Lineage 4',it:0,sub:'the most widespread',regs:['Americas','Europe','Africa'],br:'mtb',
  t:'Generalists and specialists',
  txt:`Lineage 4 is the most geographically widespread cause of human TB. It contains both globally distributed "generalist" and geographically restricted "specialist" sublineages. Most human T-cell epitopes were conserved across sublineages, but the proportion of variable epitopes was higher in the generalists, and the data support a European origin for the commonest generalist sublineage. [[Stucki2016]]`,
  pt:`Some TB strains have travelled the world; others have stayed in one region. The travellers carry slightly more variable targets for the immune system.`,
  hook:`Lineage 4 generalist sublineages are globally distributed and carry more variable T-cell epitopes; a European origin is supported for the commonest one. [[Stucki2016]]`},
 {id:'l8',n:'Lineage 8',it:0,sub:'described in 2020',regs:['Africa'],br:'root',
  t:'A sister clade to everything else',
  txt:`Lineage 8 was described in 2020 from two strains isolated in the African Great Lakes region, and is a sister clade to all previously known lineages of the complex. Its divergence preceded the loss of the <i>cobF</i> region — cobalamin, or vitamin B12, synthesis — in the common ancestor of the other lineages, which further supports an East African origin for the whole complex. [[Ngabonziza2020]]`,
  pt:`The family tree of TB is still gaining branches: a new one was added in 2020 from two samples in central Africa.`,
  hook:`Lineage 8 branches off before the <i>cobF</i> deletion shared by all other lineages — evidence for an East African origin of the complex. [[Ngabonziza2020]]`},
 {id:'afr',n:'M. africanum',it:1,sub:'lineages 5, 6 and 9',regs:['Africa'],br:'anim',
  t:'West Africa has its own lineages',
  txt:`<i>M. africanum</i> causes human TB and sits on the branch that leads on to <i>M. microti</i> and <i>M. bovis</i>. Phylogenomic analysis revealed a further new lineage, L9, and a complex evolutionary history inside the human-adapted complex. [[Coscolla2021,Brosch2002]]`,
  pt:`In parts of West Africa a sizeable share of human TB is caused by a different member of the same family.`,
  hook:`The <i>africanum</i> → <i>microti</i> → <i>bovis</i> branch split from the ancestor of present-day <i>M. tuberculosis</i> before TbD1 arose. [[Brosch2002]]`},
 {id:'bovis',n:'M. bovis',it:1,sub:'zoonotic TB',regs:[],br:'anim',
  t:'TB that comes from animals',
  txt:`<i>M. bovis</i> causes zoonotic TB in people. The burden is likely underestimated, especially where bovine TB is endemic and people have direct contact with infected animals or animal products, and that review calls for accurate diagnosis and treatment of <i>M. bovis</i> disease in people. It is naturally resistant to pyrazinamide: mutations in <i>pncA</i> account for the natural resistance of <i>M. bovis</i>, which cannot activate the prodrug. [[OleaPopelka2017,Scorpio1996]]`,
  pt:`People can catch TB from infected cattle or unpasteurised milk. It is treated much like other TB, but one of the four standard drugs does not work against it.`,
  hook:`<i>M. bovis</i> is intrinsically pyrazinamide-resistant through <i>pncA</i> — and <i>M. tuberculosis</i> did <b>not</b> evolve from <i>M. bovis</i>. [[Scorpio1996,Brosch2002]]`},
 {id:'bcg',n:'M. bovis BCG',it:1,sub:'the vaccine strain',regs:[],br:'bcg',
  t:'The strain that became a vaccine',
  txt:`BCG is a live <i>M. bovis</i> strain attenuated by repeated subculture, and it lacks RD1 — the region of difference that encodes ESAT-6 and CFP-10. Its genome is 4,374,522 base pairs with 3,954 protein-coding genes, 58 of them duplicated in two independent tandem duplications; amplification is ongoing even within vaccine preparations, which affects gene expression, immunogenicity and possibly protection. Whole-genome comparison showed that the daughter strains have lost further regions since 1921, so BCG substrains differ from one another as well as from virulent <i>M. bovis</i>. [[Mahairas1996,Brosch2007,Behr1999]]`,
  pt:`The BCG vaccine is a weakened cattle strain. The piece of genome it lost is exactly the piece that modern TB blood tests look for.`,
  hook:`RD1 is deleted from every BCG substrain — hence BCG's attenuation and the specificity of RD1-based IGRAs after vaccination. [[Mahairas1996,Pai2008]]`},
 {id:'orygis',n:'M. orygis',it:1,sub:'a proposed subspecies',regs:['Africa','Asia'],br:'anim',
  t:'Animals and people, Africa and South Asia',
  txt:`<i>M. orygis</i> was characterised from 22 isolates and proposed as a subspecies of the complex. It causes TB in animals and in people in Africa and South Asia. [[vanIngen2012]]`,
  pt:`Another animal-adapted member of the family that also infects people, recognised only recently.`,
  hook:`<i>M. orygis</i>: a complex subspecies causing disease in animals and in people in Africa and South Asia. [[vanIngen2012]]`},
 {id:'microti',n:'M. microti',it:1,sub:'the other live vaccine',regs:[],br:'anim',
  t:'A vaccine before BCG took over',
  txt:`<i>M. microti</i> was used historically as a live TB vaccine. Loss of RD1 contributed to its attenuation as well, and reintroducing RD1 into BCG restored part of the virulent phenotype — evidence that this one region carries much of the difference between a pathogen and a vaccine. [[Pym2002]]`,
  pt:`A second weakened member of the family was once used as a vaccine, and it had lost the same piece of genome as BCG.`,
  hook:`RD1 loss attenuated <i>M. microti</i> too; putting RD1 back into BCG restored part of its virulence. [[Pym2002]]`}];
inits.bacillus=()=>{
  const svg=$('#baSvg'),rg=$('#baT'),read=$('#baRead');let baLog=true;
  const baF=(d,T)=>Math.pow(2,d*24/T);                    /* bacilli from one, after d days at generation time T hours */
  const baFmt=v=>v>=1e9?(v/1e9).toFixed(1)+' billion':v>=1e6?(v/1e6).toFixed(1)+' million':v>=1000?Math.round(v/1000)+' thousand':Math.round(v).toString();
  const baWrap=(t,n)=>{const out=[];let cur='';t.split(' ').forEach(w=>{if((cur+' '+w).length>n){out.push(cur);cur=w}else cur=cur?cur+' '+w:w});out.push(cur);return out};
  /* ---- scene 1: the smear ---- */
  function baSmear(L,a){
    const cx=L.fx,cy=L.fy,r=L.fr,id='baFld'+(L.wide?'w':'n'),z=lerp(1,3.1,ease(a));
    let s=`<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--accent-soft)"/><g clip-path="url(#${id})">`;
    for(let i=0;i<5;i++){const q=rng(i*17+3);s+=`<circle cx="${f1(cx+(q()-.5)*r*1.6)}" cy="${f1(cy+(q()-.5)*r*1.6)}" r="${f1(9*z*(.7+q()*.7))}" style="fill:var(--accent);opacity:.12"/>`}
    for(let i=0;i<9;i++){const q=rng(i*31+5),px=cx+(q()-.5)*r*1.45,py=cy+(q()-.5)*r*1.45;
      if(i%3===0)s+=clump(px,py,5,6.5*z,{len:5.2*z,seed:i+2,cord:true});
      else s+=clump(px,py,2+(i%3),8*z,{len:5.2*z,seed:i+7})}
    s+='</g>';
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--line);stroke-width:7"/>`;
    s+=`<text x="${cx}" y="${f1(cy+r+24)}" class="t-sm t-mid">ZIEHL–NEELSEN SMEAR · ×${Math.round(lerp(100,1000,ease(a))/10)*10}</text>`;
    [['Carbol fuchsin','keeps its red stain through the acid-alcohol wash: acid-fast'],
     ['Methylene blue','the counterstain: everything that is not acid-fast'],
     ['Cords','rods end to end, an effect of cord factor in the envelope'],
     ['Size','1.9 µm in cavities, 2.9 µm in sputum, 3.6 µm in lavage fluid']].forEach(([h,d],i)=>{
      const y=L.tx1+i*L.txd,op=f1(ramp(a,i*.18,i*.18+.1));
      s+=`<rect x="${f1(L.tx0-10)}" y="${f1(y-17)}" width="${f1(L.tw)}" height="${f1(L.txd-8)}" rx="9" style="fill:var(--panel-2);opacity:${op}"/>`;
      s+=`<text x="${L.tx0}" y="${y}" class="t-lbl" style="opacity:${op}">${h}</text>`;
      baWrap(d,L.tc).slice(0,2).forEach((t2,k)=>s+=`<text x="${L.tx0}" y="${f1(y+16+k*13)}" class="t-xs" style="opacity:${op}">${t2}</text>`)});
    return s}
  /* ---- scenes 2 and 3: the envelope, then the drug targets ---- */
  function baCell(L,a,drugs){
    const cx=L.cx,cy=L.cy,sc=L.sc;let s='';
    for(let i=BA_LAYERS.length-1;i>=0;i--){const Ly=BA_LAYERS[i],r=BA_R[i]*sc,on=drugs?1:ramp(a,i*.13,i*.13+.3);
      if(on<=0)continue;
      s+=`<path d="M${f1(cx)} ${f1(cy-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(cx)} ${f1(cy+r)}Z" style="fill:${Ly.c};fill-opacity:${i===4?.7:.92};stroke:${Ly.s};stroke-width:1.3;opacity:${f1(on)}"/>`;
      if(i===4)for(let k=0;k<22;k++){const an=Math.PI/2+Math.PI*(k+.5)/22;
        s+=`<line x1="${f1(cx+Math.cos(an)*BA_R[3]*sc)}" y1="${f1(cy+Math.sin(an)*BA_R[3]*sc)}" x2="${f1(cx+Math.cos(an)*r)}" y2="${f1(cy+Math.sin(an)*r)}" style="stroke:var(--tb);stroke-width:1.1;opacity:${f1(.6*on)}"/>`}
      if(i===5)for(let k=0;k<13;k++){const an=Math.PI/2+Math.PI*(k+.5)/13,rr=(BA_R[4]+BA_R[5])/2*sc;
        s+=`<circle cx="${f1(cx+Math.cos(an)*rr)}" cy="${f1(cy+Math.sin(an)*rr)}" r="2.6" style="fill:var(--gold);opacity:${f1(.9*on)}"/>`}}
    const r0=BA_R[0]*sc,op0=drugs?1:ramp(a,0,.3);
    s+=`<path d="M${f1(cx-r0*.8)} ${f1(cy-r0*.34)}q${f1(r0*.52)} ${f1(-r0*.42)} ${f1(r0*.28)} ${f1(r0*.3)}q${f1(-r0*.44)} ${f1(r0*.58)} ${f1(r0*.1)} ${f1(r0*.52)}" style="fill:none;stroke:var(--nuc);stroke-width:2;opacity:${f1(.8*op0)}"/>`;
    s+=`<text x="${f1(cx-r0*.72)}" y="${f1(cy+r0*.86)}" class="t-xs" style="opacity:${f1(op0)}">rpoB</text>`;
    s+=`<line x1="${f1(cx)}" y1="${f1(cy-BA_R[5]*sc)}" x2="${f1(cx)}" y2="${f1(cy+BA_R[5]*sc)}" style="stroke:var(--line);stroke-width:1.4"/>`;
    s+=`<text x="${f1(cx-BA_R[5]*sc*.52)}" y="${f1(cy+BA_R[5]*sc+22)}" class="t-sm t-mid">HALF CROSS-SECTION</text>`;
    if(!drugs){
      if(L.wide)BA_LAYERS.forEach((Ly,i)=>{const r=BA_R[i]*sc,y=cy-r,on=ramp(a,i*.13,i*.13+.3);if(on<=0)return;
        s+=`<line x1="${f1(cx+2)}" y1="${f1(y)}" x2="${f1(L.lx-10)}" y2="${f1(y)}" style="stroke:${Ly.s};stroke-width:1;stroke-dasharray:3 3;opacity:${f1(on)}"/>`;
        s+=`<rect x="${f1(L.lx-8)}" y="${f1(y-7)}" width="12" height="12" rx="3" style="fill:${Ly.c};stroke:${Ly.s};opacity:${f1(on)}"/>`;
        s+=`<text x="${f1(L.lx+11)}" y="${f1(y+4)}" class="t-lbl" style="opacity:${f1(on)}">${i+1}. ${Ly.n}</text>`});
      if(L.wide){const W=[['Keeps compounds out','part of the organism\u2019s inherent resistance to numerous drugs'],
          ['Holds the red stain','through the acid-alcohol wash: acid-fast'],
          ['Hard to build','so complex that the cell needs specialised machinery to divide']];
        W.forEach(([h,d],i)=>{const y=L.wy+i*72,op=f1(ramp(a,.45+i*.14,.6+i*.14));
          s+=`<rect x="${L.wx-10}" y="${f1(y-18)}" width="214" height="62" rx="9" style="fill:var(--panel-2);opacity:${op}"/>`;
          s+=`<text x="${L.wx}" y="${y}" class="t-lbl" style="opacity:${op}">${h}</text>`;
          baWrap(d,34).slice(0,3).forEach((t2,k)=>s+=`<text x="${L.wx}" y="${f1(y+16+k*13)}" class="t-xs" style="opacity:${op}">${t2}</text>`)})}
      else BA_LAYERS.forEach((Ly,i)=>{const y=L.lgy+i*L.lgd,on=ramp(a,i*.13,i*.13+.3);if(on<=0)return;
        s+=`<rect x="${L.lgx}" y="${f1(y-10)}" width="13" height="13" rx="3" style="fill:${Ly.c};stroke:${Ly.s};opacity:${f1(on)}"/>`;
        s+=`<text x="${f1(L.lgx+20)}" y="${f1(y)}" class="t-lbl" style="opacity:${f1(on)}">${i+1}. ${Ly.n}</text>`});
    }else{
      BA_DRUGS.forEach((D,i)=>{const on=ramp(drugs,i*.17,i*.17+.33);if(on<=0)return;
        const r=BA_R[D.li]*sc,an=Math.PI/2+Math.PI*(.82-i*.21),k=D.li===0?.55:.94;
        const px=cx+Math.cos(an)*r*k,py=cy+Math.sin(an)*r*k,tx=L.dx,ty=L.dy+i*L.dd;
        s+=`<path d="M${f1(tx+4)} ${f1(ty)}Q${f1((tx+px)/2)} ${f1((ty+py)/2)} ${f1(px)} ${f1(py)}" style="fill:none;stroke:${D.c};stroke-width:1.4;opacity:${f1(.7*on)}"/>`;
        s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4.5" style="fill:${D.c};opacity:${f1(on)}"/>`;
        s+=`<g style="opacity:${f1(on)}">${pill(tx+14,ty,22,D.c,{label:D.l,ang:-18})}`;
        s+=`<text x="${f1(tx+32)}" y="${f1(ty-3)}" class="t-lbl" style="fill:${D.c}">${D.n}</text>`;
        s+=`<text x="${f1(tx+32)}" y="${f1(ty+11)}" class="t-xs">${D.t}</text></g>`})}
    return s}
  /* ---- scene 4: the growth race ---- */
  function baRace(L,a){
    const days=lerp(0,30,a),x0=L.gx0,x1=L.gx1,y0=L.gy0,y1=L.gy1,X=d=>lerp(x0,x1,d/30);
    const LT=12,LIN=2.5e9,Y=v=>baLog?lerp(y1,y0,clamp(Math.log10(Math.max(v,1))/LT)):lerp(y1,y0,clamp(v/LIN));
    let s='';
    [[10,14,'liquid culture reports','var(--accent)'],[21,28,'solid culture reports','var(--fibro)']].forEach(([d0,d1,lab,c],i)=>{
      s+=`<rect x="${f1(X(d0))}" y="${y0}" width="${f1(X(d1)-X(d0))}" height="${f1(y1-y0)}" style="fill:${c};opacity:.14"/>`;
      s+=`<text x="${f1(X(d0)+3)}" y="${f1(y0+12+i*(L.wide?0:14))}" class="t-xs" style="fill:${c}">${lab}</text>`});
    for(let d=0;d<=30;d+=5)s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${y0}" y2="${y1}" class="grid"/><text x="${f1(X(d))}" y="${f1(y1+17)}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${f1(x1)}" y="${f1(y1+33)}" class="t-xs t-end">days in culture</text>`;
    const SUP=['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','¹⁰','¹¹','¹²'];
    if(baLog)for(let e=0;e<=LT;e+=3){const y=lerp(y1,y0,e/LT);
      s+=`<line x1="${x0}" x2="${x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${f1(x0-7)}" y="${f1(y+3)}" class="t-xs t-end">10${SUP[e]}</text>`}
    else [0,.5,1,1.5,2,2.5].forEach(b=>{const y=lerp(y1,y0,b/2.5);
      s+=`<line x1="${x0}" x2="${x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${f1(x0-7)}" y="${f1(y+3)}" class="t-xs t-end">${b?b+' bn':'0'}</text>`});
    s+=`<line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    s+=`<text x="${x0}" y="${f1(y0-14)}" class="t-sm">ONE BACILLUS BECOMES… · ${baLog?'log scale':'linear scale'}</text>`;
    const CU=[{T:1,c:'var(--muted)',dash:'5 4',n:'a fast-growing bacterium, doubling in under an hour'},
              {T:23.1,c:'var(--tb)',dash:'',n:'M. tuberculosis, fast population: 23.1 h'},
              {T:69.3,c:'var(--accent)',dash:'',n:'M. tuberculosis, slow population: 69.3 h'}];
    CU.forEach(C=>{let d='',last=null,off=false;
      for(let i=0;i<=120;i++){const dd=days*i/120,v=baF(dd,C.T),y=Y(v);
        if((baLog&&Math.log10(Math.max(v,1))>LT)||(!baLog&&v>LIN)){d+=`L${f1(X(dd))} ${f1(y0)}`;off=true;break}
        d+=(i?'L':'M')+f1(X(dd))+' '+f1(y);last=[X(dd),y]}
      s+=`<path d="${d}" style="fill:none;stroke:${C.c};stroke-width:${C.dash?1.6:2.6};stroke-dasharray:${C.dash};stroke-linejoin:round"/>`;
      if(last&&!off&&last[1]>y0+6)s+=`<circle cx="${f1(last[0])}" cy="${f1(last[1])}" r="4" style="fill:${C.c}"/>`});
    CU.forEach((C,i)=>{const y=L.lgy2+i*15;
      s+=`<line x1="${L.lgx2}" x2="${f1(L.lgx2+16)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${C.c};stroke-width:2.4;stroke-dasharray:${C.dash}"/>`;
      s+=`<text x="${f1(L.lgx2+23)}" y="${f1(y+4)}" class="t-xs">${C.n}</text>`});
    s+=`<text x="${f1(clamp(X(days),x0+26,x1-26))}" y="${f1(y1-6)}" class="t-sm t-mid" style="fill:var(--ink)">day ${Math.round(days)}</text>`;
    if(!baLog&&days<23)s+=`<text x="${f1((x0+x1)/2)}" y="${f1(lerp(y1,y0,.42))}" class="t-lbl t-mid" style="fill:var(--muted)">on a linear scale, nothing seems to happen…</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const L=N?{wide:false,fx:200,fy:160,fr:126,tx0:26,tx1:330,txd:56,tw:348,tc:46,
               cx:188,cy:168,sc:.78,lgx:26,lgy:336,lgd:30,dx:22,dy:338,dd:52,
               wx:0,wy:0,gx0:60,gx1:384,gy0:90,gy1:420,lgy2:468,lgx2:22}
            :{wide:true,fx:208,fy:184,fr:142,tx0:420,tx1:76,txd:84,tw:288,tc:40,
               cx:206,cy:190,sc:1,lx:286,dx:462,dy:116,dd:62,
               wx:470,wy:96,gx0:86,gx1:688,gy0:64,gy1:292,lgy2:320,lgx2:86};
    let s='';
    if(t<.26)s=baSmear(L,ramp(t,0,.24));
    else if(t<.54)s=baCell(L,ramp(t,.27,.53),0);
    else if(t<.76)s=baCell(L,1,ramp(t,.55,.75));
    else s=baRace(L,ramp(t,.77,1));
    svg.innerHTML=s;
    const p=phaseOf(BA_STEPS,t);setSt(p);
    $('#baNote').innerHTML=noteHTML(BA_STEPS[p])
      +(p===2?`<div class="kv"><div><dt>Each target in full</dt><dd>${BA_DRUGS.map(D=>`<b>${D.n}:</b> ${D.d}`).join('<br>')} <button class="btn ghost" data-go="drugs">How TB drugs work</button></dd></div></div>`:'')
      +(p===3?`<div class="kv"><div><dt>Why the laboratory is slow</dt><dd>Liquid culture detects growth in an average of 10–14 days and solid culture in 3–4 weeks; liquid culture sensitivity is 88–90% against 76% for solid. <button class="btn ghost" data-go="diagnose">Diagnosing TB disease</button> [[Lewinsohn2017]]</dd></div></div>`:'');
    if(t<.76){
      read.innerHTML=`<span>scene <b>${['the smear','the envelope','drug targets','growth'][p]}</b></span>`
        +(p===0?`<span>magnification <b>×${Math.round(lerp(100,1000,ease(ramp(t,0,.24)))/10)*10}</b></span>`:'')
        +(p===1?`<span>layers drawn <b>${clamp(1+Math.floor(ramp(t,.27,.53)*6.6),1,6)} of 6</b></span>`:'')
        +(p===2?`<span>targets shown <b>${clamp(Math.ceil(ramp(t,.55,.75)*5.2),1,4)} of 4</b></span>`:'');
    }else{const d=lerp(0,30,ramp(t,.77,1));
      read.innerHTML=`<span>day <b>${Math.round(d)}</b></span><span>doublings <b>${(d*24/23.1).toFixed(1)}</b></span><span>fast population <b>${baFmt(baF(d,23.1))}</b></span><span>slow population <b>${baFmt(baF(d,69.3))}</b></span>`}
  }
  const stop=playWire(rg,$('#baPlay'),draw,26000,'%t:player.replay%','bacillus');
  const setSt=stepWire($('#baSteps'),BA_STEPS,rg,draw,stop);
  $('#baLog').addEventListener('click',()=>{baLog=!baLog;
    $('#baLog').setAttribute('aria-pressed',baLog);
    $('#baLog').textContent=(baLog?'Log scale':'Linear scale')+' (growth scene)';
    if(+rg.value<.78){stop();rg.value=.95}
    draw(+rg.value)});
  draw(+rg.value);

  /* ---- the envelope, layer by layer ---- */
  $('#baLayers').innerHTML=BA_LAYERS.map((L,i)=>`<div><b><i style="background:${L.c};border:1px solid ${L.s}"></i>${i+1}. ${L.n}</b>${L.d}</div>`).join('');

  /* ---- the complex: chips, a schematic region strip and a branch diagram ---- */
  const ws=$('#baWorld');let baSel=0;
  $('#baMtbc').innerHTML=BA_MTBC.map((M,i)=>`<button data-mt="${i}" aria-pressed="${i===0}">${M.it?`<i>${M.n}</i>`:M.n}<i class="s">${M.sub}</i></button>`).join('');
  function drawW(){
    const N=vb(ws,'720 300','400 330'),M=BA_MTBC[baSel];
    const x0=N?16:22,w=N?368:676,by=N?42:46,bh=N?70:84,bw=w/5;let s='';
    s+=`<text x="${x0}" y="${N?24:26}" class="t-sm">WHERE THE CITED DESCRIPTION PLACES IT</text>`;
    BA_REGS.forEach((rn,i)=>{const on=M.regs.includes(rn),bx=x0+i*bw+bw/2;
      s+=`<path d="${blob(bx,by+bh/2,Math.min(bw,bh)*.44,11+i*5,1.3,.95,12,.3)}" style="fill:${on?'var(--tb)':'var(--panel-2)'};fill-opacity:${on?.3:1};stroke:${on?'var(--tb)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(bx)}" y="${f1(by+bh+17)}" class="t-xs t-mid" style="${on?'fill:var(--tb);font-weight:700':''}">${rn}</text>`});
    if(!M.regs.length)s+=`<text x="${f1(x0+w/2)}" y="${f1(by+bh/2+4)}" class="t-lbl t-mid">no single region named in the cited source</text>`;
    const T=N?188:196,ind=N?16:28;
    s+=`<text x="${x0}" y="${f1(T-26)}" class="t-sm">AND WHERE IT SITS ON THE TREE</text>`;
    s+=`<path d="M${f1(x0+6)} ${f1(T+4)}V${f1(T+52)}M${f1(x0+6)} ${f1(T+28)}H${f1(x0+ind-6)}M${f1(x0+6)} ${f1(T+52)}H${f1(x0+ind-6)}M${f1(x0+ind)} ${f1(T+56)}V${f1(T+76)}H${f1(x0+ind*2-6)}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    const put=(x,y,id,label)=>{const on=M.br===id;
      return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?6:4}" style="fill:${on?'var(--tb)':'var(--muted)'}"/><text x="${f1(x+11)}" y="${f1(y+4)}" class="${on?'t-lbl':'t-xs'}" style="${on?'fill:var(--tb)':''}">${label}</text>`};
    s+=put(x0+6,T,'root','common ancestor · lineage 8 branches first');
    s+=put(x0+ind,T+28,'mtb','M. tuberculosis (TbD1: ancestral / modern)');
    s+=put(x0+ind,T+52,'anim','M. africanum → M. microti → M. bovis');
    s+=put(x0+ind*2,T+76,'bcg','BCG (RD1 deleted)');
    ws.innerHTML=s;
    $('#baMtbcNote').innerHTML=noteHTML({k:M.n+' · '+M.sub,t:M.t,txt:M.txt,pt:M.pt,hook:M.hook});
  }
  $('#baMtbc').addEventListener('click',e=>{const b=e.target.closest('[data-mt]');if(!b)return;
    baSel=+b.dataset.mt;$$('[data-mt]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawW()});
  drawW();
  const prevR=redraws.bacillus;redraws.bacillus=()=>{prevR&&prevR();drawW()};
};
