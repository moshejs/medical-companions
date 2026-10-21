/* =============== 1.3 synuclein =============== */
const SN_STEPS=[
 {from:0,at:.06,k:'Step 1 · The gene and the protein',t:'A small protein at the synapse',
  txt:'SNCA, on the long arm of chromosome 4, encodes a 140-amino-acid protein found at presynaptic nerve endings. [[Polymeropoulos1997,Ueda1993]] It has three regions: an N-terminal stretch (residues 1–60) that tends to form a helix, a central NAC region (61–95) that is prone to aggregate, and a negatively charged C-terminal tail (96–140) that protects against aggregation. [[Thrush2022]] At the synapse it binds the vesicle SNARE protein synaptobrevin-2 (VAMP2) and promotes SNARE-complex assembly. Mice lacking all three synucleins develop age-dependent neurological impairment and die early. [[Burre2010]]',
  pt:'A small protein sits at nerve endings, resting on the tiny bubbles that carry chemical messages, and helps them work.',
  hook:'SNCA is on chromosome 4. Its A53T mutation, found in 1997 in an Italian family and three Greek families, was the first gene change shown to cause Parkinson\'s. [[Polymeropoulos1997]]'},
 {from:.18,at:.25,k:'Step 2 · Misfolding',t:'It misfolds',
  txt:'The NAC region holds a 35-amino-acid stretch with a strong predicted tendency to form beta-structure. [[Ueda1993]] In the drawing, misfolded molecules leave the vesicles and flatten into sheets. Phosphorylation at serine 129 marks the disease form: it is selective and extensive in synucleinopathy lesions, and it promoted fibril formation in the test tube. [[Fujiwara2002]] Under 4% of alpha-synuclein is phosphorylated at S129 in healthy brain, against over 90% inside Lewy bodies. [[Oueslati2016]]',
  pt:'Some of the protein folds into the wrong shape. A chemical tag, a phosphate on one spot, marks the faulty form.',
  hook:'pSer129: under 4% in healthy brain, over 90% in Lewy bodies. Most other modification sites are also in the C-terminal tail. [[Oueslati2016]]'},
 {from:.36,at:.44,k:'Step 3 · Aggregation',t:'Clumps grow',
  txt:'Misfolded molecules gather into small soluble oligomers, then into fibrils. Glucosylceramide, the fat that the lysosomal enzyme GCase normally breaks down, stabilises soluble oligomers. [[Mazzulli2011]] Assemblies of different shapes, oligomers, ribbons and fibrils, behaved as distinct strains when injected into rat brain, and fibrils were the most toxic. [[Peelaerts2015]]',
  pt:'The misshapen molecules stick to each other, first in small clusters, then in long threads.',
  hook:'Gene dose matters: three copies of SNCA cause disease close to typical Parkinson\'s, four copies cause earlier disease. [[ChartierHarlin2004,Book2018]]'},
 {from:.54,at:.62,k:'Step 4 · Lewy pathology',t:'A Lewy body forms',
  txt:'Lewy bodies in the cell body and Lewy neurites in its fibres contain alpha-synuclein, and both are essential for the neuropathological diagnosis of sporadic Parkinson\'s. [[Spillantini1997,Braak2003]] Their main modification is phosphorylation at Ser129, with lesser ubiquitination and truncation. The pattern is the same in familial and sporadic disease and in multiple system atrophy. [[Anderson2006]] Under the electron microscope, Lewy pathology is a crowded mix of membranes, vesicles and misshapen organelles, rich in lipid; filaments were seen in many but not all inclusions. [[Shahmoradian2019]]',
  pt:'The clumps collect into a round ball inside the nerve cell, a Lewy body, and into threads along its fibres, Lewy neurites.',
  hook:'Lewy bodies stain for alpha-synuclein (Spillantini 1997). Lewy bodies plus Lewy neurites are needed for the neuropathological diagnosis. [[Spillantini1997,Braak2003]]'},
 {from:.72,at:.8,k:'Step 5 · Prion-like spread',t:'Seeds pass to the next cell',
  txt:'The prion-like idea is that misfolded synuclein acts as a seed that makes normal synuclein in a connected cell misfold too. One injection of synthetic fibrils into the striatum of normal mice spread pathology through connected regions, killed SNc (but not VTA) dopamine neurons, lowered dopamine and caused motor deficits. [[Luk2012]] In two people, fetal dopamine neurons transplanted 11 to 16 years earlier contained Lewy bodies: the first evidence of host-to-graft spread. Most grafted cells still looked functional. [[Li2008]] Another person\'s graft had Lewy body-like inclusions after 14 years. [[Kordower2008]]',
  pt:'Small pieces of the clump can leave the cell and get into a neighbour, where they make its healthy protein fold the wrong way too.',
  hook:'Host-to-graft spread: Lewy bodies appeared in fetal grafts after 11–16 years (Li 2008) and after 14 years (Kordower 2008). [[Li2008,Kordower2008]]'},
 {from:.88,at:.95,k:'Step 6 · Clearance',t:'Clearance fails: lysosomes and GCase',
  txt:'Loss of glucocerebrosidase (GCase) function impairs protein breakdown in lysosomes and lets alpha-synuclein build up. GCase\'s substrate, glucosylceramide, stabilises soluble oligomers, and alpha-synuclein in turn inhibits lysosomal GCase: a two-way loop that feeds itself. [[Mazzulli2011]] GBA1 encodes GCase. Two disease-causing variants cause Gaucher disease; one variant raises the risk of Parkinson\'s, with reduced penetrance. [[Sidransky2009,Rossi2025]]',
  pt:'Cells have recycling compartments, lysosomes, that break down old protein. One of their enzymes, GCase, is weaker with some GBA1 gene changes, so the faulty protein piles up, and the pile weakens the enzyme further.',
  hook:'GBA1 risk variants were the largest share of positive results in a 12,580-patient testing study: 10.4%, against 2.9% for LRRK2. [[Westenberger2024]]'}
];
const SN_CP={
 3:'With three copies: an SNCA duplication causes disease close to typical Parkinson\'s, with later onset, slow progression and no prominent dementia. [[ChartierHarlin2004]] Across 59 families, mean onset was 46.9 years with three copies. [[Book2018]]',
 4:'With four copies: triplication of the SNCA locus was shown to cause Parkinson\'s in 2003. [[Singleton2003]] Across 59 families, mean onset was 34.5 years with four copies against 46.9 with three, which suggests that the dose of synuclein tracks severity. [[Book2018,ChartierHarlin2004]]'};
const SN_AGG=[
 {from:0,at:.06,k:'Monomer',t:'A helix on a membrane',txt:'The N-terminal region (residues 1–60) has an alpha-helical tendency, and the protein binds vesicles and their SNARE protein VAMP2. [[Thrush2022,Burre2010]]',pt:'On its own the protein is a short coil resting on the surface of a vesicle.'},
 {from:.15,at:.22,k:'Misfolded',t:'A beta-sheet',txt:'The central NAC region (61–95) is aggregation-prone, and its core has a strong predicted tendency to form beta-structure. [[Thrush2022,Ueda1993]] Phosphorylation at Ser129 promoted fibril formation in vitro. [[Fujiwara2002]]',pt:'The coil flattens into a sticky sheet and picks up a phosphate tag.'},
 {from:.32,at:.39,k:'Oligomers',t:'Small soluble clusters',txt:'A few misfolded molecules cluster. Glucosylceramide, which builds up when GCase is low, stabilises these soluble oligomers. [[Mazzulli2011]] Injected oligomers were one of the assemblies that amplified in rat brain. [[Peelaerts2015]]',pt:'A few sheets stick together in small clusters that still float free.'},
 {from:.49,at:.56,k:'Fibrils',t:'Long stacked fibres',txt:'Sheets stack into fibrils. Synthetic fibrils injected into mouse striatum spread pathology and killed dopamine neurons, and in rats fibrils were the most toxic assembly. [[Luk2012,Peelaerts2015]]',pt:'The clusters grow into long fibres.',hook:'Strains: oligomers, ribbons and fibrils of the same protein caused different disease in rats; ribbons gave combined Parkinson\'s and MSA features. [[Peelaerts2015]]'},
 {from:.66,at:.73,k:'Lewy body',t:'A round inclusion in the cell body',txt:'A Lewy body sits in the cell body. It contains alpha-synuclein, mostly phosphorylated at Ser129 and partly ubiquitinated, crowded among membranes, vesicles and misshapen organelles. [[Spillantini1997,Anderson2006,Shahmoradian2019]]',pt:'The fibres and other cell debris collect into a ball inside the nerve cell.'},
 {from:.83,at:.92,k:'Lewy neurite',t:'Threads along the fibres',txt:'The same material forms threads in axons and dendrites, called Lewy neurites. Lewy bodies and Lewy neurites together are essential for the neuropathological diagnosis of sporadic Parkinson\'s. [[Braak2003]] Skin biopsy finds phosphorylated synuclein in 92.7% of people with Parkinson\'s and 3.3% of controls. [[Gibbons2024]]',pt:'The same clumps also form thin threads along the cell\'s fibres.',hook:'Lewy body = in the cell body. Lewy neurite = in an axon or dendrite.'}
];
const SN_STR={f:['Fibrils','the most toxic assembly in rats'],r:['Ribbons','combined Parkinson\'s and MSA features in rats'],o:['Oligomers','amplified in rat brain, with their own pathology']};
const SN_GU=[
 {g:'v',l:'Denmark · truncal vagotomy',e:.85,lo:.63,hi:1.14,s:'Svensson 2015'},
 {g:'v',l:'Denmark · truncal, over 20 years',e:.53,lo:.28,hi:.99,s:'Svensson 2015'},
 {g:'v',l:'Denmark · superselective vagotomy',e:1.09,lo:.84,hi:1.43,s:'Svensson 2015'},
 {g:'v',l:'Denmark to 2011 · truncal',e:.88,lo:.55,hi:1.21,s:'Tysnes 2015, via Liu 2017'},
 {g:'v',l:'Denmark to 2011 · truncal, over 20 years',e:1.14,lo:.23,hi:2.05,s:'Tysnes 2015, via Liu 2017'},
 {g:'v',l:'Sweden · any vagotomy',e:.96,lo:.78,hi:1.17,s:'Liu 2017'},
 {g:'v',l:'Sweden · truncal vagotomy',e:.78,lo:.55,hi:1.09,s:'Liu 2017'},
 {g:'v',l:'Sweden · truncal, 5+ years before diagnosis',e:.59,lo:.37,hi:.93,s:'Liu 2017'},
 {g:'a',l:'Sweden · appendectomy, registry',e:.807,lo:.728,hi:.896,s:'Killinger 2018'},
 {g:'a',l:'Meta-analysis, 6 studies · appendectomy',e:1.02,lo:.87,hi:1.2,s:'Lu 2020'}
];
inits.synuclein=()=>{
  /* ---- shared glyphs ---- */
  const fib=(x,y,len,ang,o,w=6)=>{const c=Math.cos(ang),s=Math.sin(ang),hx=c*len/2,hy=s*len/2,px=-s*w/2,py=c*w/2;
    let d=`M${f1(x-hx+px)} ${f1(y-hy+py)}L${f1(x+hx+px)} ${f1(y+hy+py)}M${f1(x-hx-px)} ${f1(y-hy-py)}L${f1(x+hx-px)} ${f1(y+hy-py)}`;
    const n=Math.max(1,Math.round(len/4));for(let i=0;i<=n;i++){const u=i/n-.5,cx=x+c*len*u,cy=y+s*len*u;d+=`M${f1(cx+px)} ${f1(cy+py)}L${f1(cx-px)} ${f1(cy-py)}`}
    return `<path d="${d}" style="fill:none;stroke:var(--rose);stroke-width:1.6;stroke-linecap:round;opacity:${f1(o)}"/>`};
  const qb=(A,B,C,u)=>[(1-u)*(1-u)*A[0]+2*(1-u)*u*B[0]+u*u*C[0],(1-u)*(1-u)*A[1]+2*(1-u)*u*B[1]+u*u*C[1]];
  const along=(pts,u)=>{const n=pts.length-1,s=clamp(u)*n,i=Math.min(n-1,Math.floor(s)),f=s-i;return [lerp(pts[i][0],pts[i+1][0],f),lerp(pts[i][1],pts[i+1][1],f)]};
  const hex=(x,y,r,o)=>{let d='';for(let i=0;i<6;i++){const a=i*Math.PI/3;d+=(i?'L':'M')+f1(x+Math.cos(a)*r)+' '+f1(y+Math.sin(a)*r)}return `<path d="${d}Z" style="fill:var(--ink);opacity:${f1(o)}"/>`};
  const pac=(x,y,r,a,on)=>{const a0=a+.5,a1=a-.5+Math.PI*2;
    return on?`<path d="M${f1(x)} ${f1(y)} L${f1(x+Math.cos(a0)*r)} ${f1(y+Math.sin(a0)*r)} A${r} ${r} 0 1 1 ${f1(x+Math.cos(a1)*r)} ${f1(y+Math.sin(a1)*r)} Z" style="fill:var(--sage);opacity:.9"/>`
      :`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:2 2;opacity:.8"/>`};

  /* ---- 1. from gene to Lewy body ---- */
  const svg=$('#snSvg'),rg=$('#snT');let cp=2,gba=false;
  const VES=[ [.18,-.52],[.46,-.3],[.16,-.1],[.5,.08],[.22,.32],[.5,.42],[-.08,-.36],[-.06,.14] ];
  const FREE=[ [-.48,-.18],[-.28,-.56],[-.62,.1],[-.34,.06],[-.1,-.66],[-.22,.44],[-.5,.38],[.02,-.14],[-.56,-.4],[.04,.6],[-.68,-.14],[-.34,.64],[.3,.64],[.68,-.22] ];
  const OL=[-.36,.3];
  const LR=rng(13),LYS=Array.from({length:14},()=>{const a=LR()*Math.PI*2,d=Math.sqrt(LR())*.42;return [Math.cos(a)*d,Math.sin(a)*d,LR()*Math.PI]});
  function strip(L,t){
    let s='';const C=L.chr,P=L.pb,G=L.ps;
    // chromosome 4 pair with SNCA copies
    s+=`<text x="${C.x}" y="${C.ty}" class="t-xs">CHROMOSOME 4 PAIR · SNCA</text>`;
    [cp-1,1].forEach((n,j)=>{const y=C.y+j*18,pw=C.w*.26;
      s+=`<rect x="${C.x}" y="${y}" width="${f1(pw-3)}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1"/><rect x="${f1(C.x+pw+3)}" y="${y}" width="${f1(C.w-pw-3)}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1"/>`;
      [.38,.47,.72,.84,.92].forEach(b=>s+=`<rect x="${f1(C.x+C.w*b)}" y="${y+1}" width="5" height="8" style="fill:var(--line)"/>`);
      for(let i=0;i<n;i++)s+=`<rect x="${f1(C.x+C.w*.55+i*9)}" y="${y-3}" width="7" height="16" rx="2" style="fill:var(--rose);opacity:.9"/>`});
    const ct={2:['2 copies: the usual dose','one on each chromosome'],3:['3 copies: duplication','mean onset 46.9 years'],4:['4 copies: triplication','mean onset 34.5 years']}[cp];
    s+=`<text x="${C.x}" y="${C.y+42}" class="t-xs" style="fill:${cp>2?'var(--rose)':'var(--ink)'}">${ct[0]}</text><text x="${C.x}" y="${C.y+54}" class="t-xs">${ct[1]}</text>`;
    // protein bar
    const k=P.w/140,X=r=>P.x+r*k,ph=ramp(t,.2,.28);
    s+=`<text x="${P.x}" y="${P.ty}" class="t-xs">ALPHA-SYNUCLEIN · 140 RESIDUES</text>`;
    [[1,60,'var(--sage)','var(--sage-soft)','1–60','binds membranes'],[61,95,'var(--rose)','var(--rose-soft)','61–95 NAC','sticky core'],[96,140,'var(--muted)','var(--panel-2)','96–140','protective tail']].forEach(([a,b,c,cs,l1,l2])=>{
      s+=`<rect x="${f1(X(a-1))}" y="${P.y}" width="${f1((b-a+1)*k)}" height="16" rx="3" style="fill:${cs};stroke:${c};stroke-width:1.4"/>`;
      s+=`<text x="${f1(X((a+b)/2))}" y="${P.y+28}" class="t-xs t-mid" style="fill:var(--ink)">${l1}</text><text x="${f1(X((a+b)/2))}" y="${P.y+40}" class="t-xs t-mid">${l2}</text>`});
    [[30,'A30P',0],[46,'E46K',1],[53,'A53T',0]].forEach(([r,l,u])=>{s+=`<path d="M${f1(X(r))} ${P.y-6-u*10}V${P.y}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(X(r))}" y="${P.y-9-u*10}" class="t-xs t-mid">${l}</text>`});
    s+=`<path d="M${f1(X(129))} ${P.y-6}V${P.y}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(X(129))}" y="${P.y-9}" class="t-xs t-mid" style="fill:${ph>.5?'var(--rose)':'var(--muted)'}">S129</text>`;
    if(ph>0)s+=`<g style="opacity:${f1(ph)}"><circle cx="${f1(X(129))}" cy="${P.y+8}" r="6" style="fill:var(--rose)"/><text x="${f1(X(129))}" y="${P.y+11}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text></g>`;
    // pSer129 gauge
    const g1=ramp(t,.2,.28),g2=ease(ramp(t,.56,.66));
    s+=`<text x="${G.x}" y="${G.ty}" class="t-xs">pSer129 SHARE</text>`;
    [['healthy brain','under 4%',.04,g1],['in Lewy bodies','over 90%',.9*g2/(g2||1),g2]].forEach(([l,v,f,o],i)=>{const y=G.y+i*26;
      s+=`<text x="${G.x}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><text x="${G.x+G.w}" y="${y}" class="t-xs t-end" style="opacity:${f1(Math.max(.3,o))}">${o>0?v:'…'}</text>`;
      s+=`<rect x="${G.x}" y="${y+4}" width="${G.w}" height="8" rx="4" style="fill:var(--panel-2)"/>`;
      if(o>0)s+=`<rect x="${G.x}" y="${y+4}" width="${f1(Math.max(4,G.w*(i?.9*g2:.04)))}" height="8" rx="4" style="fill:var(--rose);opacity:${f1(o)}"/>`});
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 400','400 600');
    const L=N?{chr:{x:12,y:24,w:180,ty:14},pb:{x:20,y:130,w:360,ty:98},ps:{x:214,y:30,w:172,ty:14},soma:[46,228,22],term:[176,302,62],B:[338,302,22],bax:36,lys:{x:12,y:400,w:376,h:190,lx:76,ly:500,lr:50,tx:146}}
             :{chr:{x:16,y:24,w:180,ty:14},pb:{x:236,y:46,w:300,ty:12},ps:{x:568,y:30,w:140,ty:14},soma:[70,196,30],term:[292,252,76],B:[566,252,30],bax:100,lys:{x:12,y:286,w:194,h:110,lx:50,ly:344,lr:32,tx:106}};
    const [sx,sy,sr]=L.soma,[tx,ty,tr]=L.term,[bx,by,br]=L.B,Y=L.lys;
    const P=n=>[tx+n[0]*tr,ty+n[1]*tr];
    const nf=Math.min(14,[6,9,12][cp-2]+(gba?2:0)),nm=Math.min(nf,[3,5,7][cp-2]+(gba?2:0));
    const mis=ramp(t,.18,.3),cl=ease(ramp(t,.36,.45)),fb=ease(ramp(t,.45,.54)),lb=ease(ramp(t,.54,.64)),ln=ramp(t,.58,.7),hl=ramp(t,.86,.92);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=strip(L,t);
    // neighbouring neuron: dendrite to a spine across the cleft
    const spX=tx+tr+18,dEnd=bx-br*.9;
    s+=`<path d="M${f1(spX)} ${ty} L${f1(dEnd)} ${by}" style="fill:none;stroke:var(--cell-line);stroke-width:${N?10:13};stroke-linecap:round"/><path d="M${f1(spX)} ${ty} L${f1(dEnd)} ${by}" style="fill:none;stroke:var(--cell);stroke-width:${N?7:10};stroke-linecap:round"/>`;
    s+=`<ellipse cx="${f1(spX+2)}" cy="${ty}" rx="${N?7:9}" ry="${f1(tr*.42)}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=neuron(bx,by,br,1,{axon:0,axonLen:L.bax,dendrites:4});
    // axon from the cell body to the terminal
    const A0=[sx+sr*.9,sy],A1=[sx+(tx-sx)*.55,sy],A2=[tx-tr*.9,ty-tr*.42];
    s+=`<path d="M${f1(A0[0])} ${f1(A0[1])} Q${f1(A1[0])} ${f1(A1[1])} ${f1(A2[0])} ${f1(A2[1])}" style="fill:none;stroke:var(--cell-line);stroke-width:${N?4:5};stroke-linecap:round"/>`;
    s+=neuron(sx,sy,sr,1,{axon:0,axonLen:0,dendrites:5});
    // terminal
    s+=`<circle cx="${tx}" cy="${ty}" r="${tr}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    const vr=tr*.12;
    VES.forEach((v,i)=>{const [x,y]=P(v);s+=vesicle(x,y,vr,1,1)+syn(x,y-vr-2.5,vr*.7,1,0)});
    // docked vesicle with SNARE contacts, dopamine release into the cleft
    const [dx,dy]=P([.84,0]);s+=vesicle(dx,dy,vr,1,1)+`<path d="M${f1(dx+vr*.7)} ${f1(dy-4)}h${f1(vr*.6)}M${f1(dx+vr*.7)} ${f1(dy+4)}h${f1(vr*.6)}" style="stroke:var(--sage);stroke-width:2;stroke-linecap:round"/>`+syn(dx-vr*.2,dy-vr-2.5,vr*.7,1,0);
    for(let k=0;k<4;k++){const ph=((t*30+k/4)%1+1)%1;s+=`<circle cx="${f1(tx+tr+2+ph*12)}" cy="${f1(ty+(k-1.5)*tr*.12)}" r="2" style="fill:var(--amber);opacity:${f1(bump(ph,0,1)*.9)}"/>`}
    // free molecules: misfold, clump, fibril
    const [ox,oy]=P(OL),fl=fb*tr*.6,fa=-.35;
    for(let i=0;i<nf;i++){const [x0,y0]=P(FREE[i]),isM=i<nm,st=isM?clamp(mis*nm-i):0;
      let x=x0+Math.sin(t*40+i*1.7)*1.5,y=y0+Math.cos(t*36+i)*1.5;
      if(isM&&cl>0){const a=i/nm*Math.PI*2,rr=tr*.13;x=lerp(x,ox+Math.cos(a)*rr,cl);y=lerp(y,oy+Math.sin(a)*rr,cl)}
      const o=isM?1-fb*.85:1;s+=syn(x,y,tr*.085,o,st)}
    if(fb>0)s+=fib(ox,oy,Math.max(4,fl),fa,fb,tr*.08);
    if(cl>.3&&fb<.9)s+=`<text x="${f1(ox)}" y="${f1(oy+tr*.3)}" class="t-xs t-mid" style="fill:var(--rose);opacity:${f1(ramp(cl,.3,.6))}">${fb>.4?'fibril':'oligomer'}</text>`;
    else if(fb>=.9&&t<.72)s+=`<text x="${f1(ox)}" y="${f1(oy+tr*.3)}" class="t-xs t-mid" style="fill:var(--rose)">fibril</text>`;
    // Lewy body and Lewy neurites
    if(lb>0){s+=lewyBody(sx+sr*.45,sy-sr*.45,sr*.36*Math.max(.25,lb),lb);
      if(lb>.3){const lx=sx+sr+(N?4:8),ly=sy-sr-(N?16:22);s+=`<path d="M${f1(sx+sr*.6)} ${f1(sy-sr*.6)} L${f1(lx)} ${f1(ly+3)}" style="stroke:var(--rose);stroke-width:1"/><text x="${f1(lx+2)}" y="${f1(ly)}" class="t-xs" style="fill:var(--rose)">Lewy body</text>`}}
    if(ln>0){[[.14,.4],[.52,.82]].forEach(([u0,u1])=>{const a=qb(A0,A1,A2,u0),b=qb(A0,A1,A2,u1);s+=lewyNeurite(a[0],a[1],b[0],b[1],ln)});
      const m=qb(A0,A1,A2,.5);s+=`<text x="${f1(N?m[0]+4:m[0])}" y="${f1(N?m[1]-12:m[1]+22)}" class="t-xs${N?'':' t-mid'}" style="fill:var(--rose);opacity:${f1(ln)}">Lewy neurites</text>`}
    // seeds pass to the neighbour, which then misfolds its own synuclein
    const fe=[ox+Math.cos(fa)*fl/2,oy+Math.sin(fa)*fl/2],path=[fe,P([.86,.3]),[tx+tr+8,ty+tr*.22],[spX,ty+tr*.1],[lerp(spX,dEnd,.45),lerp(ty,by,.45)]];
    const BM=[.18,.32,.46,.6,.74,.88].map((u,j)=>[lerp(spX+10,dEnd,u),lerp(ty,by,u)+(j%2?-1:1)*(N?3:4)]);
    const cv=ramp(t,.8,.9)*BM.length,blb=ease(ramp(t,.86,.93));
    BM.forEach(([x,y],j)=>s+=syn(x,y-(N?9:11),N?5:6,1,clamp(cv-j)));
    for(let i=0;i<3;i++){const p=ease(ramp(t,.72+.035*i,.82+.035*i));if(p<=0)continue;const [x,y]=along(path,p);s+=fib(x+(p>=1?i*8-8:0),y+(p>=1?(i%2?5:-5):0),N?9:11,-.2,1,5)}
    if(blb>0)s+=lewyBody(bx+br*.45,by-br*.45,br*.34*Math.max(.25,blb),blb);
    if(t>.72){const o=f1(ramp(t,.72,.76));s+=`<text x="${f1(tx+tr+(N?-6:8))}" y="${f1(N?ty+tr+2:ty+tr*.62)}" class="t-xs" style="fill:var(--rose);opacity:${o}">seeds released</text>`;
      if(t>.8)s+=`<text x="${N?392:bx+br+4}" y="${f1(N?ty-tr-10:by-br-26)}" class="t-xs t-end" style="fill:var(--rose);opacity:${f1(ramp(t,.8,.84))}">taken up: its synuclein misfolds</text>`}
    s+=`<text x="${sx}" y="${sy+sr+(N?30:38)}" class="t-xs t-mid">nerve cell</text><text x="${tx}" y="${ty+tr+14}" class="t-xs t-mid">presynaptic terminal</text><text x="${bx}" y="${by+br+(N?30:20)}" class="t-xs t-mid">neighbouring neuron</text>`;
    if(t<.2)s+=`<text x="${f1(tx+tr*.25)}" y="${ty-tr-8}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(1-ramp(t,.14,.2))}">${N?'vesicles carrying synuclein':'vesicles with synuclein (helices) on them'}</text><text x="${f1(tx+tr+4)}" y="${f1(ty-tr*.55)}" class="t-xs" style="fill:var(--amber);opacity:${f1(1-ramp(t,.14,.2))}">dopamine</text>`;
    // lysosome and GCase
    const act=gba?3:6,nW=gba?4:1,nFr=gba?1:5,nG=gba?7:2,{lx,ly,lr}=Y;
    s+=`<rect x="${Y.x}" y="${Y.y}" width="${Y.w}" height="${Y.h}" rx="10" style="fill:var(--panel);stroke:${hl>.5?'var(--rose)':'var(--line)'};stroke-width:${hl>.5?2:1}"/><text x="${Y.x+10}" y="${Y.y+15}" class="t-xs">CLEARANCE · A LYSOSOME</text>`;
    s+=`<circle cx="${lx}" cy="${ly}" r="${lr}" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:2"/>`;
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2+.3;s+=pac(lx+Math.cos(a)*lr*.68,ly+Math.sin(a)*lr*.68,lr*.15,a+Math.PI,i<act)}
    LYS.forEach(([x,y,a],i)=>{const X=lx+x*lr,Yy=ly+y*lr;
      if(i<nW)s+=syn(X,Yy,lr*.13,1,i%2);
      else if(i<nW+nFr)s+=`<path d="M${f1(X-3)} ${f1(Yy)}h6" transform="rotate(${f1(a*57)} ${f1(X)} ${f1(Yy)})" style="stroke:var(--sage);stroke-width:2;stroke-linecap:round;opacity:.7"/>`;
      else if(i<nW+nFr+nG)s+=hex(X,Yy,lr*.07,.45)});
    const cin=((t*8)%1+1)%1,[ix,iy]=[lerp(lx-lr*.95,lx-lr*.3,cin),lerp(ly-lr*.95,ly-lr*.3,cin)];
    if(cin<.9)s+=syn(ix,iy,lr*.13,1-ramp(cin,.75,.9),0);
    if(hl>0){const o=f1(hl);s+=`<path d="M${f1(lx+lr*1.15)} ${f1(ly-lr*.6)} A${f1(lr*1.25)} ${f1(lr*1.25)} 0 0 1 ${f1(lx+lr*1.15)} ${f1(ly+lr*.6)}" style="fill:none;stroke:var(--rose);stroke-width:1.6;opacity:${o}" marker-end="url(#snLp)" marker-start="url(#snLp)"/>`}
    const TX=Y.tx,ln0=Y.y+(N?40:34),dy0=N?15:13;
    const lines=hl>0?(N?['A two-way loop:','less GCase lets synuclein build up,','glucosylceramide steadies oligomers,','and synuclein blocks GCase further.',gba?'GBA1 variant: fewer working enzymes':'usual GCase: a full set of enzymes']
                         :['two-way loop:','less GCase →','more synuclein →','less GCase',gba?'(GBA1 variant)':''])
                     :(N?[gba?'GCase: reduced (GBA1 variant)':'GCase: working normally',gba?'glucosylceramide builds up':'synuclein is cut up and cleared',gba?'whole synuclein piles up':'little glucosylceramide left']
                         :[gba?'GCase: reduced':'GCase: normal',gba?'glucosylceramide':'synuclein cut up',gba?'builds up;':'and cleared',gba?'synuclein piles up':'']);
    lines.forEach((l,i)=>{if(l)s+=`<text x="${TX}" y="${ln0+i*dy0}" class="t-xs" style="fill:${i===0?(gba||hl>0?'var(--rose)':'var(--sage)'):'var(--ink)'}">${l}</text>`});
    s+=`<text x="${Y.x+10}" y="${ly+lr+(N?16:12)}" class="t-xs">${N?'GCase enzymes: the notched discs':'notched discs: GCase'}</text>`;
    svg.innerHTML=`<defs>${marker('snLp','var(--rose)')}</defs>`+s;
    const p=phaseOf(SN_STEPS,t);setSt(p);
    const Pn={...SN_STEPS[p]};
    if(cp>2&&p<=2)Pn.txt+=' '+SN_CP[cp];
    if(gba&&p>=4)Pn.txt+=(p===5?' With the GBA1 toggle on: across 16 centres, carrying a GBA mutation raised the odds of Parkinson\'s 5.43-fold, and carriers presented earlier. [[Sidransky2009]] Drugs aimed at this pathway have not shown benefit in randomised trials so far. [[Giladi2023,MJFF2026]] See <a href="#cure" data-go="cure">Toward a cure</a>.':' With less GCase, more alpha-synuclein builds up. [[Mazzulli2011]]');
    $('#snNote').innerHTML=noteHTML(Pn);
    $('#snCap').innerHTML=`${{2:'Two SNCA copies',3:'SNCA duplication, three copies',4:'SNCA triplication, four copies'}[cp]}${gba?' · GBA1 variant: fewer working GCase enzymes':''}. More copies and less GCase are drawn as more free synuclein and more misfolding, schematically. Onset ages from 59 families [[Book2018]]; pSer129 shares [[Oueslati2016]]. Not to scale.`;
  }
  const stop=playWire(rg,$('#snPlay'),draw,18000,'Replay','synuclein');
  const setSt=stepWire($('#snSteps'),SN_STEPS,rg,draw,stop);
  const setCp=v=>{cp=v;[2,3,4].forEach(n=>$('#snCp'+n).setAttribute('aria-pressed',n===v));draw(+rg.value)};
  [2,3,4].forEach(n=>$('#snCp'+n).onclick=()=>setCp(n));
  $('#snGba').onclick=()=>{gba=!gba;$('#snGba').setAttribute('aria-pressed',gba);draw(+rg.value)};

  /* ---- 2. the aggregation ladder ---- */
  $('#snAggLede').innerHTML='Each step from a single molecule to a Lewy body has its own shape. A laboratory test copies the seeding step: a seed amplification assay multiplies abnormal synuclein from spinal fluid. In PPMI it was positive in 87.7% of people with Parkinson\'s and in 6 of 163 controls. [[Siderowf2023]] An MDS statement cautions that a positive result does not necessarily reflect seeding or aggregation in the brain. [[Cardoso2024]] More in <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>.';
  const ag=$('#snAgg'),ar=$('#snAggT');let strain='f';
  const NAMES=['monomer','misfolded','oligomers','fibrils','Lewy body','Lewy neurite'],SUBS=['helix on a membrane','beta-sheet, pSer129','small, soluble','stacked sheets','in the cell body','in a nerve fibre'];
  function glyph(i,x,y,r,o){let s='';
    if(i===0){s+=`<path d="M${f1(x-r*.75)} ${f1(y+r*.35)} Q${f1(x)} ${f1(y-r*.05)} ${f1(x+r*.75)} ${f1(y+r*.35)}" style="fill:none;stroke:var(--cell-line);stroke-width:4;opacity:${f1(o)}"/>`;s+=syn(x-r*.32,y+r*.02,r*.2,o,0)+syn(x+r*.32,y+r*.02,r*.2,o,0)+syn(x,y-r*.4,r*.2,o,0)}
    if(i===1){s+=syn(x-r*.3,y-r*.25,r*.2,o,1)+syn(x+r*.3,y+r*.05,r*.2,o,1)+syn(x-r*.15,y+r*.38,r*.2,o,1);s+=`<circle cx="${f1(x+r*.52)}" cy="${f1(y-r*.12)}" r="${f1(r*.11)}" style="fill:var(--rose);opacity:${f1(o)}"/>`}
    if(i===2)for(let k=0;k<4;k++){const a=k/4*Math.PI*2+.6,cx=x+Math.cos(a)*r*.4,cy=y+Math.sin(a)*r*.4;for(let j=0;j<3;j++)s+=syn(cx+(j-1)*r*.07,cy+(j-1)*r*.1,r*.12,o,1)}
    if(i===3){if(strain==='r'){for(let k=0;k<2;k++){const yy=y-r*.22+k*r*.44;s+=`<path d="M${f1(x-r*.7)} ${f1(yy)} C${f1(x-r*.35)} ${f1(yy-r*.22)} ${f1(x-r*.1)} ${f1(yy+r*.22)} ${f1(x+r*.2)} ${f1(yy)} S${f1(x+r*.55)} ${f1(yy-r*.2)} ${f1(x+r*.7)} ${f1(yy)}" style="fill:none;stroke:var(--rose);stroke-width:${f1(r*.2)};stroke-linecap:round;opacity:${f1(o*.75)}"/>`}}
      else for(let k=0;k<3;k++)s+=fib(x,y-r*.36+k*r*.36,r*1.3,-.08,o,r*.14)}
    if(i===4){s+=lewyBody(x,y,r*.62,o);const R=rng(5);for(let k=0;k<7;k++){const a=R()*Math.PI*2,d=r*(.42+R()*.12);s+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(r*.07)}" style="fill:none;stroke:var(--ink);stroke-width:1;opacity:${f1(o*.5)}"/>`}}
    if(i===5){s+=`<path d="M${f1(x-r*.8)} ${f1(y+r*.3)} Q${f1(x)} ${f1(y-r*.4)} ${f1(x+r*.8)} ${f1(y+r*.2)}" style="fill:none;stroke:var(--cell-line);stroke-width:${f1(r*.2)};stroke-linecap:round;opacity:${f1(o)}"/>`+lewyNeurite(x-r*.55,y+r*.08,x+r*.5,y-r*.02,o)}
    return s}
  function drawAgg(t){
    const N=vb(ag,'720 320','400 720');
    const pos=i=>N?[76,64+i*104]:[64+i*118,128],R=N?40:46;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const prog=t*6,hiSt=strain==='o'?2:3;
    for(let i=0;i<6;i++){const [x,y]=pos(i),on=clamp(prog-i+.7),cur=Math.floor(clamp(prog,0,5.999))===i;
      const nmI=i===3&&strain==='r'?'ribbons':NAMES[i],sbI=i===3&&strain==='r'?'another shape':SUBS[i];
      s+=`<circle cx="${x}" cy="${y}" r="${R}" style="fill:${cur?'var(--rose-soft)':'var(--panel)'};stroke:${cur?'var(--rose)':'var(--line)'};stroke-width:${cur?2:1}"/>`;
      if(i===hiSt)s+=`<circle cx="${x}" cy="${y}" r="${R+6}" style="fill:none;stroke:var(--rose);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      if(N){s+=`<text x="${x+R+18}" y="${y-2}" class="t-lbl" style="fill:${cur?'var(--ink)':'var(--muted)'}">${nmI}</text><text x="${x+R+18}" y="${y+14}" class="t-xs">${sbI}</text>`}
      else{s+=`<text x="${x}" y="${y+R+20}" class="t-lbl t-mid" style="fill:${cur?'var(--ink)':'var(--muted)'}">${nmI}</text><text x="${x}" y="${y+R+34}" class="t-xs t-mid">${sbI}</text>`}
      if(i<5){const [nx,ny]=pos(i+1);s+=N?`<path d="M${x} ${y+R+4} V${ny-R-6}" class="arrow" marker-end="url(#snAgA)" style="opacity:.5"/>`:`<path d="M${x+R+3} ${y} H${nx-R-5}" class="arrow" marker-end="url(#snAgA)" style="opacity:.5"/>`}
      if(on>0)s+=glyph(i,x,y,R,on)}
    const [nm,eff]=SN_STR[strain],by=N?pos(5)[1]+66:268;
    const sl=N?[eff+';','all three crossed the blood-brain barrier','after intravenous injection (Peelaerts 2015)']:[eff+'; all three crossed the blood-brain barrier','after intravenous injection (Peelaerts 2015)'];
    s+=`<text x="${N?20:24}" y="${by}" class="t-sm" style="fill:var(--ink)">STRAIN · ${nm.toUpperCase()} INJECTED INTO RAT BRAIN</text>`+sl.map((l,i)=>`<text x="${N?20:24}" y="${by+16+i*14}" class="t-xs">${l}</text>`).join('');
    ag.innerHTML=`<defs>${marker('snAgA')}</defs>`+s;
    const p=phaseOf(SN_AGG,t);$('#snAggNote').innerHTML=noteHTML(SN_AGG[p]);
    ar.setAttribute('aria-valuetext',`Stage ${p+1} of ${SN_AGG.length}: ${SN_AGG[p].t}`);
  }
  playWire(ar,$('#snAggPlay'),drawAgg,14000,'Replay','synuclein');
  const setStr=v=>{strain=v;[['f','#snStF'],['r','#snStR'],['o','#snStO']].forEach(([k,id])=>$(id).setAttribute('aria-pressed',k===v));
    $('#snAggCap').innerHTML=`Schematic. In people this takes years and happens in three dimensions. The dashed ring marks the assembly injected: ${SN_STR[v][0].toLowerCase()}, ${SN_STR[v][1]}. [[Peelaerts2015]]`;drawAgg(+ar.value)};
  $('#snStF').onclick=()=>setStr('f');$('#snStR').onclick=()=>setStr('r');$('#snStO').onclick=()=>setStr('o');

  /* ---- 3. gut and vagus: the surgical studies ---- */
  const gu=$('#snGut');let gsel='all';
  function drawGut(){
    const rows=SN_GU.filter(r=>gsel==='all'||r.g===gsel),N=NARROW(),rh=N?46:28,top=N?40:52,H=top+rows.length*rh+(N?62:52);
    vb(gu,'720 '+H,'400 '+H);
    const x0=N?20:318,x1=N?380:598,lmin=Math.log(.2),lmax=Math.log(2.2),X=v=>x0+(Math.log(v)-lmin)/(lmax-lmin)*(x1-x0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${N?12:16}" y="22" class="t-xs">${N?'STUDY · RATIO (95% CI)':'STUDY'}</text>`;if(!N)s+=`<text x="${x0}" y="22" class="t-xs">HAZARD OR RISK RATIO, LOG SCALE</text><text x="704" y="22" class="t-xs t-end">RATIO (95% CI)</text>`;
    const yb=top+rows.length*rh-(N?4:6);
    [.25,.5,1,2].forEach(v=>{s+=`<path d="M${f1(X(v))} ${top-10} V${yb}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--muted);stroke-dasharray:4 3':''}"/><text x="${f1(X(v))}" y="${yb+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-6)}" y="${yb+30}" class="t-xs t-end">← lower risk after surgery</text><text x="${f1(X(1)+6)}" y="${yb+30}" class="t-xs">higher risk →</text>`;
    rows.forEach((r,i)=>{const y=top+i*rh+(N?18:0),c=r.g==='v'?'var(--sage)':'var(--sky)',sig=r.hi<1||r.lo>1,val=`${r.e.toFixed(2)} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`;
      s+=`<g><title>${r.l}: ${val}, ${r.s}</title><rect x="0" y="${f1(y-(N?30:14))}" width="100%" height="${rh}" style="fill:transparent"/>`;
      if(N){s+=`<text x="12" y="${y-12}" class="t-xs" style="fill:var(--ink)">${r.l}</text><text x="388" y="${y-12}" class="t-xs t-end">${val}</text>`}
      else{s+=`<text x="16" y="${y+4}" class="t-xs" style="fill:var(--ink)">${r.l}</text><text x="704" y="${y+4}" class="t-xs t-end" style="fill:var(--ink)">${val}</text>`}
      s+=`<path d="M${f1(X(r.lo))} ${y} H${f1(X(r.hi))}" style="stroke:${c};stroke-width:2;stroke-linecap:round"/><circle cx="${f1(X(r.e))}" cy="${y}" r="5" style="fill:${sig?c:'var(--field)'};stroke:${c};stroke-width:2"/></g>`});
    gu.innerHTML=s;
  }
  const setG=v=>{gsel=v;[['all','#snGuAll'],['v','#snGuVag'],['a','#snGuApp']].forEach(([k,id])=>$(id).setAttribute('aria-pressed',k===v));drawGut()};
  $('#snGuAll').onclick=()=>setG('all');$('#snGuVag').onclick=()=>setG('v');$('#snGuApp').onclick=()=>setG('a');
  $('#snGutCap').innerHTML='Sources: [[Svensson2015,Liu2017,Killinger2018,Lu2020]]. The Swedish appendectomy result was reported as a 19.3% lower risk (95% CI 10.4–27.2%) and is plotted as a ratio of 0.81. The 2011 reanalysis is reported through Liu 2017, as the letter itself was not read. Intervals are as published.';
  $('#snGutNote').innerHTML=`<span class="ev hyp">Hypothesis</span><div class="kicker">Reading the plot</div><h4>Weak and mixed support</h4>
    <p>A ratio below 1 means fewer cases of Parkinson\'s after surgery. In Denmark, truncal vagotomy was linked to lower risk only with more than 20 years of follow-up, and the authors noted limited precision. [[Svensson2015]] A reanalysis of the same population, followed to 2011, found no such effect. [[Liu2017]] In Sweden, any vagotomy showed no association, but truncal vagotomy at least 5 years before diagnosis did. [[Liu2017]]</p>
    <p>One Swedish registry linked appendectomy to a 19.3% lower risk, seen in rural but not urban residents. A meta-analysis of six studies found no effect, with large differences between studies. [[Killinger2018,Lu2020]]</p>
    <div class="pt"><b>In plain words</b>Some studies suggest that cutting the nerve from the gut lowers the risk; others find nothing. The question is open.</div>
    <div class="hook"><b>Exam hook</b>Dual-hit hypothesis (Hawkes, Del Tredici and Braak 2007): a pathogen enters through the nose and through the gut, then climbs the vagus nerve to the medulla. [[Hawkes2007]] The staging that follows from it is in <a href="#braak" data-go="braak">How it spreads</a>.</div>`;

  /* ---- 4. cards ---- */
  $('#snCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Lewy bodies are made of synuclein</h4><p>Lewy bodies are immunoreactive for alpha-synuclein, and most of it is phosphorylated at Ser129, in familial and sporadic disease alike. [[Spillantini1997,Anderson2006]] Skin biopsy finds phosphorylated synuclein in 92.7% of people with Parkinson's, 96.0% with dementia with Lewy bodies, 98.2% with MSA and 3.3% of controls. [[Gibbons2024]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Changing the gene can cause Parkinson's</h4><p>Point mutations in SNCA cause dominant disease: A53T in 1997, A30P in 1998, and E46K in a Spanish family with parkinsonism, dementia and hallucinations. [[Polymeropoulos1997,Kruger1998,Zarranz2004]] Extra copies cause it too. Across 59 families, onset averaged 46.9 years with three copies and 34.5 with four, and dementia was noted in 50.9% of probands. [[Singleton2003,Book2018]] Common variation counts: the 263-bp REP1 promoter allele had an odds ratio of 1.43. [[Maraganore2006]] More in <a href="#genes" data-go="genes">Genes and inheritance</a>.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>It can spread like a seed</h4><p>Injected fibrils spread pathology through connected regions in normal mice and killed dopamine neurons. [[Luk2012]] Lewy bodies appeared in fetal grafts placed in people with Parkinson's, after 11 to 16 years and after 14 years. [[Li2008,Kordower2008]] Most grafted cells still looked functional after a decade. [[Li2008]] Whether ordinary Parkinson's spreads this way is the question in <a href="#braak" data-go="braak">How it spreads: Braak stages</a>.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Strains: one protein, different diseases?</h4><p>Oligomers, ribbons and fibrils of alpha-synuclein injected into rat brain amplified there and produced different pathology and behaviour. Fibrils were the most toxic. Ribbons produced combined Parkinson's and MSA features. The assemblies crossed the blood-brain barrier after intravenous injection. [[Peelaerts2015]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Cause or marker? A real disagreement</h4><p><b>For a causal role:</b> SNCA mutations and extra copies cause disease, and injected fibrils cause neurodegeneration in mice. [[Polymeropoulos1997,Singleton2003,Luk2012]]</p><p><b>Against a simple story:</b> of 37 autopsied LRRK2 cases, 20 had no Lewy bodies, and Lewy bodies may be absent in typical LRRK2 and parkin disease. [[Kalia2015,Schneider2017]] In one series about 55% of people at Braak stages 5–6 had no dementia or parkinsonism. [[Parkkinen2008]] In PPMI, people with a negative spinal-fluid seed test progressed no differently, and critics argue seeding "does not appear necessary" for the syndrome. [[Espay2026]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Gut first?</h4><p>Lewy bodies were found in the gut wall plexuses of all 7 people with Parkinson's examined, and in 8 of 24 people without it. [[Wakabayashi1988]] Healthy appendix tissue contained synuclein aggregates. [[Killinger2018]] Braak's group proposes the earliest lesions in the olfactory bulb, the vagal nucleus and possibly the gut. [[Braak2017]] The surgical studies are in the plot above.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Antibodies against synuclein</h4><p>Prasinezumab missed its primary endpoint in PASADENA and in PADOVA (hazard ratio 0.84, 95% CI 0.69–1.01), and a phase 3 trial is recruiting. Cinpanemab showed no effect and was stopped. [[Pagano2022,Nikolcheva2026,CTgov2026I,Lang2022]] The details are in <a href="#cure" data-go="cure">Toward a cure</a>.</p></div>`;
  $('#snMech').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>MPTP: a toxin that causes parkinsonism</h4><p>Four people who injected an illicit pethidine (meperidine) analogue containing MPTP developed marked, lasting parkinsonism. The authors proposed that MPTP selectively damages substantia nigra cells. [[Langston1983]] The basal ganglia rate model was later built largely from MPTP-treated monkeys. [[Galvan2008]] See <a href="#circuit" data-go="circuit">The dopamine pathway</a>.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Mitochondria and rotenone</h4><p>Rats given rotenone, a pesticide that blocks mitochondrial complex I, developed selective nigrostriatal degeneration, slowness and rigidity. Their nigral neurons formed fibrillar inclusions containing ubiquitin and alpha-synuclein. [[Betarbet2000]] Human pesticide data are in <a href="#risk" data-go="risk">Risk and protection</a>.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>PINK1 and parkin: removing damaged mitochondria</h4><p>PINK1 is kept low on healthy mitochondria and builds up on damaged ones, which recruits parkin. Parkin then triggers removal of the mitochondrion by autophagy. Disease mutations block this at distinct steps. [[Narendra2010]] Mutations in parkin and PINK1 cause recessive early-onset parkinsonism, and parkin disease may lack Lewy bodies. [[Kitada1998,Valente2004,Schneider2017]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Iron</h4><p>Total iron in the substantia nigra was 31–35% higher in Parkinson's than in controls, while globus pallidus iron was 29% lower. The authors suggested that excess nigral iron may promote toxic oxygen radicals. [[Dexter1989]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>GBA1 and the lysosome as a drug target</h4><p>The GCase loop is the rationale for GBA1-targeted drugs. Venglustat did not help GBA1 carriers (motor scores worsened 7.29 points against 4.71 on placebo, p=0.17), and a GCase activator progressed like placebo in sponsor-reported results. An ambroxol phase 3 trial is recruiting. [[Giladi2023,MJFF2026,CTgov2026I]]</p></div>`;

  const prevR=redraws.synuclein;redraws.synuclein=()=>{prevR&&prevR();drawAgg(+ar.value);drawGut()};
  setStr('f');draw(+rg.value);drawGut();
};
