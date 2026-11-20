/* =============== 1.3 Variant classes & genotype =============== */
/* Main scrubber: one airway cell as a production line (gene in the nucleus, mRNA, the ER, vesicles, three channel
   slots in the apical membrane) drawn in eight states: normal, classes I to VI and the proposed class VII, with a
   seven-step checklist marking where each class fails. Then a variant explorer, variant counts, pancreatic status by
   genotype and twin studies of modifiers. Stage states: 1 works, .5 reduced, 0 fails, -1 never reached. */
const VR_STAGES=['mRNA made','full-length protein','folds, leaves the ER','reaches the surface','gate opens','ions flow freely','stays at the surface'];
const VR_SHORT=[['mRNA',''],['full','protein'],['folds',''],['reaches','surface'],['opens',''],['ions','flow'],['stays','']];
const VR_CL=[
 {n:'',name:'Working CFTR',sub:'made, folded, delivered, opened and kept',st:[1,1,1,1,1,1,1],flow:1,grp:'normal function',ex:'',
  k:'The production line',t:'Healthy CFTR, start to finish',
  txt:'A working CFTR protein has to be made from its mRNA, fold correctly, travel to the cell surface, open when it is switched on, let chloride and bicarbonate through and stay there. The class system groups variants by which of these steps fails [[Welsh1993,LopesPacheco2019]]. By 1995 many of the more than 550 known mutations could already be grouped into five classes by their molecular consequences [[Zielenski1995]].',
  pt:'Different gene changes break the CFTR protein in different ways. Some make no protein, some make a misfolded protein and some make a protein that does not open well [[LopesPacheco2019]].',
  hook:'Class I = no protein, II = misfolding, III = gating, IV = conductance, V = reduced amount, VI = unstable at the membrane [[Bell2020Commission,LopesPacheco2019]].'},
 {n:'I',name:'No protein',sub:'an early stop: the message decays, no full protein',st:[.5,0,-1,-1,-1,-1,-1],flow:0,grp:'minimal function',ex:'G542X, W1282X',
  k:'Class I · production',t:'No protein, or a truncated one',
  txt:'Nonsense variants (premature stop codons), frameshifts and canonical splice-site changes stop production, and transcripts with a premature stop are also destroyed by nonsense-mediated mRNA decay. Examples: G542X and W1282X [[LopesPacheco2019]]. About 10% of people with CF worldwide carry a premature-stop variant [[LopesPacheco2019,Kerem2014Ataluren]].',
  pt:'The instructions contain a "stop" too early, so the cell never finishes the protein.',
  hook:'The read-through drug ataluren missed its primary endpoint in nonsense-variant CF: a relative FEV1 difference of 3.0% at 48 weeks (p = 0.12) [[Kerem2014Ataluren]].'},
 {n:'II',name:'Misfolding',sub:'made, but misfolded and destroyed in the ER',st:[1,1,0,-1,-1,-1,-1],flow:.03,grp:'minimal function',ex:'F508del, N1303K, G85E',
  k:'Class II · processing',t:'Misfolded and destroyed',
  txt:'The protein misfolds, is held by endoplasmic-reticulum quality control and is degraded by proteasomes. F508del is the main example; others are G85E, I507del, R560T and N1303K (0.4%, 0.5%, 0.2% and 1.6% of CF alleles) [[LopesPacheco2019,Bell2020Commission]].',
  pt:'The protein is made but folds into the wrong shape, so the cell\'s quality control throws it away before it reaches the surface.',
  hook:'Many variants cause more than one defect. F508del also gates poorly and is unstable at the surface, so it "could be assigned to at least three classes" [[Cutting2015]].'},
 {n:'III',name:'Gating',sub:'at the surface, but the gate stays shut',st:[1,1,1,1,0,-1,-1],flow:.05,grp:'little or no function',ex:'G551D',
  k:'Class III · gating',t:'At the surface, but shut',
  txt:'The protein reaches the membrane but does not open properly. Example: G551D (Gly551Asp) [[Bell2020Commission,LopesPacheco2019]]. Bell and colleagues group class I to III variants as causing little or no CFTR function and a more severe phenotype [[Bell2020Commission]].',
  pt:'The channel reaches the surface but its gate stays shut, so ions cannot pass.',
  hook:'G551D is the classic theratype. In people aged 12 and older with at least one G551D allele, the potentiator ivacaftor raised percent-predicted FEV1 by 10.6 points over placebo through week 24 and lowered sweat chloride by 48.1 mmol/L through week 48 [[Ramsey2011STRIVE]].'},
 {n:'IV',name:'Conductance',sub:'open, but too few ions pass',st:[1,1,1,1,1,.5,1],flow:.3,grp:'residual function',ex:'R117H',
  k:'Class IV · conductance',t:'Open, but a narrow pore',
  txt:'Ion flow through an open channel is reduced. Example: R117H (Arg117His) [[Bell2020Commission]]. Class IV and V variants keep residual function, often with preserved pancreatic function early in life [[Bell2020Commission]].',
  pt:'The gate opens, but the passage is narrow, so fewer ions get through.',
  hook:'R117H\'s effect depends on the polyT tract on the same chromosome: with 5T in cis and a CF-causing variant on the other copy it generally gives nonclassic CF [[Deignan2020ACMG,Kiesewetter1993]].'},
 {n:'V',name:'Too little',sub:'normal channels, but fewer of them',st:[.5,1,1,1,1,1,1],flow:.3,grp:'residual function',ex:'splicing changes',
  k:'Class V · quantity',t:'Normal protein, too little of it',
  txt:'Less normal CFTR is made, from alternative splicing, promoter or missense changes [[LopesPacheco2019,Bell2020Commission]]. Splice changes can work this way: 3849+10kbC→T creates an extra 84-base pseudo-exon with a stop codon, yet about 8% of transcripts are still spliced normally [[Highsmith1994,Deignan2020ACMG]].',
  pt:'Each channel works, but the cell makes too few of them.',
  hook:'3849+10kbC→T was first found in people with CF-like lung disease but normal sweat chloride [[Highsmith1994]].'},
 {n:'VI',name:'Unstable',sub:'delivered and working, but pulled back in',st:[1,1,1,1,1,1,0],flow:.35,grp:'residual function',ex:'rescued F508del',
  k:'Class VI · stability',t:'Pulled back in too fast',
  txt:'The protein is unstable at the plasma membrane, with faster endocytosis and less recycling. Corrector-rescued F508del behaves like a class VI protein [[Bell2020Commission,LopesPacheco2019]].',
  pt:'The channel arrives and works, but the cell takes it back in too quickly.',
  hook:'Lopes-Pacheco groups classes I and II as minimal function and classes IV, V and VI as residual function [[LopesPacheco2019]].'},
 {n:'VII',name:'No mRNA',sub:'part of the gene deleted: nothing to read',st:[0,-1,-1,-1,-1,-1,-1],flow:0,grp:'none made (proposed)',ex:'large deletions',
  k:'Class VII · proposed',t:'No mRNA at all',
  txt:'A seventh class has been proposed for large deletions that abolish CFTR mRNA production, where no protein-targeted drug can act <span class="ev hyp">Proposed</span> [[LopesPacheco2019,DeBoeck2016]]. Deletions and duplications make up an estimated under 5% of detected CFTR variants, which the ACMG says may be an underestimate [[Deignan2020ACMG]].',
  pt:'Part of the gene is missing, so there is nothing to read and nothing for a protein-targeted drug to fix.',
  hook:'Veit and colleagues proposed a "combinatorial" classification that records every defect a variant causes, to guide combination drug therapy [[Veit2016]].'}];
const VR_STEPS=VR_CL.map((c,i)=>({from:i/8,at:i/8+.07,k:c.k,t:c.t,txt:c.txt,pt:c.pt,hook:c.hook,short:c.n||'normal'}));
VR_STEPS.forEach((s,i)=>{s.t=i?'Class '+VR_CL[i].n+' · '+VR_CL[i].name:'Normal CFTR';s.title=VR_CL[i].t});
/* point at fraction u along a polyline */
function vrAlong(P,u){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
  const d=clamp(u)*L[L.length-1];for(let i=1;i<P.length;i++)if(d<=L[i]){const k=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}
  return P[P.length-1]}
/* a short wavy mRNA strand centred at (x,y) */
function vrRNA(x,y,o={}){const w=o.w||22,op=o.op==null?1:o.op;let d=`M${f1(x-w/2)} ${f1(y)}`;for(let i=1;i<=8;i++){const u=i/8;d+=`L${f1(x-w/2+w*u)} ${f1(y+Math.sin(u*Math.PI*3)*2.6)}`}
  let s=`<path d="${d}" style="fill:none;stroke:var(--dna);stroke-width:2;stroke-linecap:round;opacity:${f1(op)}"/>`;
  if(o.stop)s+=`<rect x="${f1(x+w*.12)}" y="${f1(y-5)}" width="6" height="10" rx="1.5" style="fill:var(--bad);opacity:${f1(op)}"/>`;
  return s}
/* the checklist icon: 1 tick, .5 reduced, 0 cross, -1 never reached */
function vrMark(x,y,v,r=7){const col=v===1?'var(--good)':v===.5?'var(--warn)':v===0?'var(--bad)':'var(--line)';
  let s=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${v<0?'var(--panel)':col};stroke:${col};stroke-width:1.4"/>`;
  if(v===1)s+=`<path d="M${f1(x-r*.45)} ${f1(y)}l${f1(r*.32)} ${f1(r*.34)}l${f1(r*.6)} ${f1(-r*.7)}" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round"/>`;
  else if(v===0)s+=`<path d="M${f1(x-r*.4)} ${f1(y-r*.4)}l${f1(r*.8)} ${f1(r*.8)}M${f1(x+r*.4)} ${f1(y-r*.4)}l${f1(-r*.8)} ${f1(r*.8)}" style="stroke:var(--panel);stroke-width:1.8;stroke-linecap:round"/>`;
  else if(v===.5)s+=`<path d="M${f1(x-r*.45)} ${f1(y)}h${f1(r*.9)}" style="stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
  return s}
/* the cell scene for class index c, local progress u, phase ph, in box B */
function vrCell(c,u,ph,B,N){const C=VR_CL[c],M=B.y+(N?26:30),sx=N?[B.x+80,B.x+190,B.x+300]:[B.x+110,B.x+225,B.x+340],cs=N?46:50;
  const nuc={x:B.x+(N?62:84),y:B.y+B.h*(N?.7:.7),rx:N?50:66,ry:N?36:46},er={x:B.x+(N?150:200),y:B.y+B.h*(N?.62:.62),w:N?96:120};
  let s=`<text x="${f1(N?(sx[1]+sx[2])/2:B.x+B.w-6)}" y="${f1(B.y+8)}" class="t-xs ${N?'t-mid':'t-end'}">airway (outside)</text>`;
  s+=`<rect x="${f1(B.x)}" y="${f1(M)}" width="${f1(B.w)}" height="${f1(B.y+B.h-M)}" rx="12" style="fill:var(--cell);stroke:var(--airway);stroke-width:1.6"/>`;
  /* which slots hold a channel at the membrane, and in which state */
  const slots=sx.map((x,j)=>{if(c===1||c===2||c===7)return {x,st:'absent'};if(c===5&&j!==1)return {x,st:'absent'};
    if(c===3)return {x,st:'closed'};if(c===4)return {x,st:'open',open:.35,flow:.3};if(c===6&&j===2){const e=ease(ramp(u,.15,.7));return {x,st:e>.02?'endo':'open',e,open:1,flow:1-e}}
    return {x,st:'open',open:1,flow:1}});
  const gaps=slots.filter(q=>q.st==='open'||q.st==='closed').map(q=>[q.x-cs*.3,q.x+cs*.3]);
  s+=membrane(B.x+4,M,B.w-8,{h:cs*.26,gap:gaps.length?gaps:null});
  slots.forEach((q,j)=>{
    if(q.st==='absent'){s+=cftr(q.x,M,cs,{state:'absent',membrane:false}).svg;return}
    if(q.st==='endo'){s+=cftr(q.x,M,cs,{state:'absent',membrane:false}).svg;const yy=M+q.e*B.h*.34;
      s+=`<g transform="translate(0 ${f1(yy-M)})">${cftr(q.x,M,cs*.8,{state:'open',open:.6,membrane:false}).svg}</g><circle cx="${f1(q.x)}" cy="${f1(yy+cs*.08)}" r="${f1(cs*.62)}" style="fill:none;stroke:var(--membrane);stroke-width:3;opacity:${f1(ramp(q.e,.1,.4))}"/>`;
      if(q.e>.3)s+=`<text x="${f1(N?q.x-cs*.7:q.x+cs*.7)}" y="${f1(yy+cs*.1)}" class="t-xs ${N?'t-end':''}" style="fill:var(--ink)">pulled back in</text>`;return}
    s+=cftr(q.x,M,cs,{state:q.st,open:q.st==='closed'?0:q.open,flow:q.st==='closed'?0:q.flow,ph:ph*.6+j*.31,hco3:true,p:1,atp:q.st==='closed'?1:0,membrane:false}).svg});
  if(c===3)s+=`<text x="${f1(sx[0]+cs*.4)}" y="${f1(M+cs*.62)}" class="t-xs" style="fill:var(--ink)">gate shut</text>`;
  if(c===4)s+=`<text x="${f1(sx[0]+cs*.4)}" y="${f1(M-cs*.5)}" class="t-xs" style="fill:var(--ink)">narrow pore: little flow</text>`;
  if(c===5)s+=`<text x="${f1(sx[2])}" y="${f1(M+cs*.62)}" class="t-xs t-mid" style="fill:var(--ink)">too few channels</text>`;
  /* the nucleus with the gene */
  s+=`<ellipse cx="${f1(nuc.x)}" cy="${f1(nuc.y)}" rx="${nuc.rx}" ry="${nuc.ry}" style="fill:var(--nucleus);fill-opacity:.35;stroke:var(--nucleus);stroke-width:2"/>`;
  const hx0=nuc.x-nuc.rx*.7,hx1=nuc.x+nuc.rx*.7,gap=c===7?[nuc.x-nuc.rx*.22,nuc.x+nuc.rx*.22]:null;
  [0,Math.PI].forEach(ph0=>{let d='',pen=false;for(let i=0;i<=40;i++){const x=lerp(hx0,hx1,i/40),y=nuc.y+Math.sin(i/40*Math.PI*4+ph0)*5;if(gap&&x>gap[0]&&x<gap[1]){pen=false;continue}d+=(pen?'L':'M')+f1(x)+' '+f1(y);pen=true}
    s+=`<path d="${d}" style="fill:none;stroke:var(--dna);stroke-width:2"/>`});
  if(gap)s+=`<rect x="${f1(gap[0])}" y="${f1(nuc.y-10)}" width="${f1(gap[1]-gap[0])}" height="20" rx="4" style="fill:none;stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(nuc.x)}" y="${f1(nuc.y-14)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">deleted</text>`;
  s+=`<text x="${f1(nuc.x)}" y="${f1(nuc.y+nuc.ry-8)}" class="t-xs t-mid" style="fill:var(--ink)">CFTR gene</text>`;
  /* the ER */
  for(let k=0;k<3;k++){const yy=er.y+k*11;let d='';for(let i=0;i<=20;i++){const x=er.x+er.w*i/20;d+=(i?'L':'M')+f1(x)+' '+f1(yy+Math.sin(i/20*Math.PI*3)*3)}
    s+=`<path d="${d}" style="fill:none;stroke:var(--membrane);stroke-width:5;stroke-linecap:round;opacity:.8"/>`}
  s+=`<text x="${f1(er.x+er.w/2)}" y="${f1(er.y+44)}" class="t-xs t-mid">ER: protein made, folded</text>`;
  /* mRNA from the nucleus to the ER */
  const rp=[[nuc.x+nuc.rx*.8,nuc.y-nuc.ry*.4],[er.x-10,er.y-2]];
  const nR=c===7?0:c===5?1:3;
  for(let i=0;i<nR;i++){const v=((ph*.18+i/3)%1+1)%1,p=vrAlong(rp,v);let op=Math.min(1,v*5,(1-v)*5);
    if(c===1){op*=1-ramp(v,.45,.8);if(v>.5){for(let k=0;k<3;k++)s+=`<circle cx="${f1(p[0]+k*6-6)}" cy="${f1(p[1]+(k%2)*4)}" r="1.8" style="fill:var(--dna);opacity:${f1(ramp(v,.5,.7)*(1-ramp(v,.8,1)))}"/>`}}
    s+=vrRNA(p[0],p[1],{op,stop:c===1})}
  if(c===1)s+=`<text x="${f1(N?rp[0][0]:(rp[0][0]+rp[1][0])/2)}" y="${f1(rp[0][1]-24)}" class="t-xs t-mid" style="fill:var(--bad)">early stop: mRNA decays</text>`;
  if(c===7)s+=`<text x="${f1((rp[0][0]+rp[1][0])/2+8)}" y="${f1(rp[0][1]-6)}" class="t-xs t-mid" style="fill:var(--bad)">no mRNA</text>`;
  /* the protein at the ER */
  const pX=er.x+er.w*.55,pY=er.y-20;
  if(c===1){s+=`<path d="M${f1(pX-16)} ${f1(pY)}l9 -5l9 5" style="fill:none;stroke:var(--cftr);stroke-width:2"/>`;[0,1,2].forEach(k=>{s+=`<circle cx="${f1(pX-16+k*9)}" cy="${f1(pY-(k%2)*5)}" r="3.4" style="fill:var(--cftr)"/>`});
    s+=`<text x="${f1(pX+8)}" y="${f1(pY-2)}" class="t-xs" style="fill:var(--ink)">stops short</text>`}
  else if(c===2){const f=ramp(u,.05,.35),dg=ramp(u,.4,.9),pr={x:er.x+er.w+(N?34:60),y:er.y+6};
    s+=`<g style="opacity:${f1(1-dg)}">${folding(pX,pY,40,{fold:f,mis:1,seed:4})}</g>`;
    s+=`<rect x="${f1(pr.x-9)}" y="${f1(pr.y-14)}" width="18" height="28" rx="6" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><path d="M${f1(pr.x-9)} ${f1(pr.y-5)}h18M${f1(pr.x-9)} ${f1(pr.y+5)}h18" style="stroke:var(--muted)"/><text x="${f1(pr.x)}" y="${f1(pr.y+26)}" class="t-xs t-mid">proteasome</text>`;
    for(let k=0;k<6;k++){const p=[lerp(pX,pr.x,dg)+Math.sin(k*2.1)*8*(1-dg),lerp(pY,pr.y,dg)+Math.cos(k*1.7)*8*(1-dg)];s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.4" style="fill:var(--misfold);opacity:${f1(dg>0?Math.min(1,dg*3)*(1-ramp(dg,.85,1)):0)}"/>`}
    s+=`<text x="${f1(pX)}" y="${f1(pY-16)}" class="t-xs t-mid" style="fill:var(--misfold);font-weight:700">misfolded</text>`}
  else if(c!==7)s+=folding(pX,pY,36,{fold:1,mis:0,seed:4});
  /* vesicles from the ER to the channel slots */
  const vs=c===0||c===3||c===4||c===6?[0,1,2]:c===5?[1]:[];
  vs.forEach((j,k)=>{const P=[[pX+6,pY-6],[lerp(pX,sx[j],.5),lerp(pY,M+cs*.6,.55)],[sx[j],M+cs*.7]],v=((ph*.22+k*.33)%1+1)%1,p=vrAlong(P,v),op=Math.min(1,v*6,(1-v)*6);
    if(c===6&&j===2&&u>.15)return;
    s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="7" style="fill:var(--panel);stroke:var(--membrane);stroke-width:2.4;opacity:${f1(op)}"/><circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3" style="fill:var(--cftr);opacity:${f1(op)}"/>`});
  return s}
/* explorer variants: cls = index into VR_CL used for the picture */
const VR_VARS=[
 {id:'F508del',cls:2,ct:'Class II (processing); also gating and stability defects',hgvs:'c.1521_1523delCTT · p.Phe508del [[Farrell2018Age]]',type:'Three-base in-frame deletion',grp:'Minimal function (class II) [[LopesPacheco2019]]',
  what:'The protein misfolds and is destroyed; the little that reaches the surface is unstable and gates poorly, so it "could be assigned to at least three classes" [[Cutting2015]].',
  where:'About 70% of CF chromosomes worldwide [[Morral1994,Kerem1989]]: 66.8% across Europe, from 87.2% in Denmark to 26.3% in Algeria [[Estivill1997]]; 12–31% of CF alleles in Asia, and not seen on CF alleles of East Asian ancestry [[Bell2020Commission]].',
  means:'In a 1990 cohort, 99% of F508del homozygotes were pancreatic insufficient [[Kerem1990NEJM]]. The phase 3 elexacaftor–tezacaftor–ivacaftor trial enrolled people with F508del and a minimal-function variant, a group earlier modulators had not helped [[Middleton2019ETI]].'},
 {id:'G542X',cls:1,ct:'Class I (production)',hgvs:'Legacy name; a nonsense variant',type:'Nonsense: a premature stop codon',grp:'Minimal function (class I) [[LopesPacheco2019]]',
  what:'No full-length protein, and the mRNA is cleared by nonsense-mediated decay [[LopesPacheco2019]].',
  where:'2.6% of European CF chromosomes, with a mean of 6.1% in Mediterranean countries [[Estivill1997]]; worldwide the most common premature-stop variant, 2.5% of CF alleles [[LopesPacheco2019,Kerem2014Ataluren]].',
  means:'The read-through drug ataluren, tested for nonsense variants, missed its phase 3 primary endpoint [[Kerem2014Ataluren]].'},
 {id:'W1282X',cls:1,ct:'Class I (production)',hgvs:'Legacy name; a nonsense variant',type:'Nonsense: a premature stop codon',grp:'Minimal function (class I) [[LopesPacheco2019]]',
  what:'No full-length protein, as for other premature-stop variants [[LopesPacheco2019]].',
  where:'The most common CF variant in Ashkenazi Jewish people: 60% of Ashkenazi CF chromosomes in Israel [[Shoshani1992]] and 45.92% in the US [[Watson2004ACMG]]. 1.0% of European CF chromosomes overall, peaking in Israel at 36.2% [[Estivill1997]].',
  means:'A founder effect: the cluster traces to a common ancestral haplotype [[Shoshani1992]].'},
 {id:'3120+1G>T',cls:1,ct:'Class I mechanism (canonical splice site)',hgvs:'Legacy name; intron change at the first base of a splice site',type:'Canonical splice-site change',grp:'Minimal function (class I) [[LopesPacheco2019]]',
  what:'Canonical splice-site changes are among the causes of class I: no normal protein is made [[LopesPacheco2019]].',
  where:'9.57% of CF chromosomes in African American people with CF, but 0.16% or less in other US groups [[Watson2004ACMG]].',
  means:'A reminder that the common variants differ by population, and that panels built from one population miss others [[Watson2004ACMG,Schrijver2016]].'},
 {id:'CFTRdele2,3(21kb)',cls:1,ct:'Class I mechanism (a premature stop)',hgvs:'A 21,080-bp deletion removing exons 2 and 3',type:'Large deletion that creates a premature stop in exon 4',grp:'Severe [[Dork2000]]',
  what:'The deletion removes exons 2 and 3 and creates a premature stop in exon 4 [[Dork2000]].',
  where:'A variant of Slavic origin: 6.4% of Czech, 5.2% of Russian and 1.5% of German and Polish CF chromosomes [[Dork2000]].',
  means:'A founder effect traced to a common haplotype [[Dork2000]]. Deletions like this are missed by tests that look only for small changes; the ACMG estimates deletions and duplications at under 5% of detected variants [[Deignan2020ACMG]].'},
 {id:'N1303K',cls:2,ct:'Class II (processing)',hgvs:'Legacy name; a missense variant',type:'Missense (one amino acid changed)',grp:'Minimal function (class II) [[LopesPacheco2019]]',
  what:'Misfolding and degradation, like F508del [[LopesPacheco2019,Bell2020Commission]].',
  where:'1.6% of CF alleles [[LopesPacheco2019,Bell2020Commission]], peaking in Tunisia at 17.2% [[Estivill1997]].',
  means:'The Trikafta label notes N1303K is predicted responsive by HBE (human bronchial epithelial cell) assay; the Alyftrek label lists it as responsive "only by HBE assay" [[FDA-Trikafta,FDA-Alyftrek]].'},
 {id:'G85E',cls:2,ct:'Class II (processing)',hgvs:'Legacy name; a missense variant',type:'Missense (one amino acid changed)',grp:'Minimal function (class II) [[LopesPacheco2019]]',
  what:'Listed with F508del, I507del, R560T and N1303K among misfolding variants [[LopesPacheco2019,Bell2020Commission]].',
  where:'0.4% of CF alleles [[LopesPacheco2019,Bell2020Commission]].',
  means:'Rare variants like this are where laboratory theratyping matters most [[Clancy2019]].'},
 {id:'G551D',cls:3,ct:'Class III (gating)',hgvs:'p.Gly551Asp',type:'Missense (one amino acid changed)',grp:'Little or no function (classes I–III) [[Bell2020Commission]]',
  what:'The protein reaches the membrane but does not open properly [[Bell2020Commission,LopesPacheco2019]].',
  where:'2.25% of non-Hispanic Caucasian CF chromosomes in the US and 1.93% across US ancestries [[Watson2004ACMG]]; 1.5% in Europe [[Estivill1997]].',
  means:'The variant behind the first potentiator trial: ivacaftor raised percent-predicted FEV1 by 10.6 points over placebo and lowered sweat chloride by 48.1 mmol/L [[Ramsey2011STRIVE]].'},
 {id:'R117H',cls:4,ct:'Class IV (conductance)',hgvs:'c.350G>A · p.Arg117His [[Deignan2020ACMG]]',type:'Missense (one amino acid changed)',grp:'Residual function (class IV) [[LopesPacheco2019]]',
  what:'Reduced flow through an open channel [[Bell2020Commission]]. Its effect depends on the polyT tract in cis: with 5T it generally gives nonclassic CF alongside a CF-causing variant; with 7T it ranges from no symptoms to absence of the vas deferens [[Deignan2020ACMG,Kiesewetter1993]].',
  where:'1.3–3.0% of CF chromosomes in northwestern Europe [[Estivill1997]].',
  means:'R117H/F508del compound heterozygotes were pancreatic sufficient in 87% against 4% of F508del homozygotes [[CFGPC1993]]. In France the penetrance of classical CF for [R117H;T7] with F508del was estimated at 0.03% [[ThauvinRobinet2009]].'},
 {id:'3849+10kbC>T',cls:5,ct:'Splicing: less normal CFTR (the class V mechanism)',hgvs:'c.3718–2477C>T [[Deignan2020ACMG]]',type:'Deep-intron change creating a pseudo-exon',grp:'About 8% of transcripts normally spliced [[Highsmith1994,Deignan2020ACMG]]',
  what:'It creates an 84-base pseudo-exon with an in-frame stop codon, but about 8% of transcripts are spliced normally [[Highsmith1994,Deignan2020ACMG]].',
  where:'5.31% of CF chromosomes in Asian American people and 4.77% in US Ashkenazi Jewish people (2004 CFF data) [[Watson2004ACMG]].',
  means:'First found in people with CF-like lung disease but normal sweat chloride [[Highsmith1994]]. The ACMG recommends that laboratories always report it [[Deignan2020ACMG]].'}];
inits.variants=()=>{
  /* ---------- main: the production line ---------- */
  const svg=$('#vrSvg'),rg=$('#vrT'),note=$('#vrNote'),rd=$('#vrRead');let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 380','400 600'),i=Math.min(7,Math.floor(t*8)),u=clamp(t*8-i),C=VR_CL[i],ph=t*40,W=N?400:720,H=N?600:380;
    const B=N?{x:10,y:66,w:380,h:262}:{x:14,y:70,w:456,h:260};
    let s=`<text x="16" y="24" class="t-big" style="fill:${i?'var(--brand)':'var(--ink)'}">${i?'Class '+C.n+' · '+C.name:C.name}</text><text x="16" y="40" class="t-sm">${C.sub}</text>`;
    s+=vrCell(i,u,ph,B,N);
    /* the panel: numeral, checklist, function group, flow */
    const P=N?{x:14,y:350}:{x:494,y:78};
    if(!N)s+=`<rect x="${P.x-8}" y="${P.y-8}" width="${W-P.x-6}" height="${B.h-2}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${P.x}" y="${P.y+30}" style="font:700 34px var(--display);fill:${i?'var(--brand)':'var(--good)'}">${C.n||'OK'}</text><text x="${P.x+(C.n.length>2?78:C.n?60:56)}" y="${P.y+16}" class="t-sm" style="fill:var(--ink);font-weight:600">${i?'class':'normal'}</text><text x="${P.x+(C.n.length>2?78:C.n?60:56)}" y="${P.y+30}" class="t-xs">${C.ex?'e.g. '+C.ex:''}</text>`;
    const cy0=P.y+(N?52:52),rh=N?20:19,cx=P.x+8;
    VR_STAGES.forEach((q,j)=>{const v=C.st[j],y=cy0+j*rh;s+=vrMark(cx,y,v)+`<text x="${cx+14}" y="${y+3.5}" class="t-xs" style="${v<0?'':'fill:var(--ink)'};${v===0?'font-weight:700;fill:var(--bad)':''}">${q}${v===.5?' (reduced)':''}</text>`});
    const gx=N?P.x+214:P.x,gy=N?P.y+60:cy0+7*rh+6;
    s+=`<text x="${gx}" y="${gy}" class="t-xs">function group</text><text x="${gx}" y="${gy+15}" class="t-sm" style="fill:var(--ink);font-weight:700">${C.grp}</text>`;
    const fw=N?160:190,fv=C.flow*(i===6?1-.6*ease(ramp(u,.15,.7)):1);
    s+=`<text x="${gx}" y="${gy+36}" class="t-xs">chloride flow (schematic)</text><rect x="${gx}" y="${gy+42}" width="${fw}" height="10" rx="4" style="fill:var(--panel-2)"/><rect x="${gx}" y="${gy+42}" width="${f1(fw*fv)}" height="10" rx="4" style="fill:${fv>.6?'var(--good)':fv>.1?'var(--warn)':'var(--bad)'}"/>`;
    /* class strip */
    const sy=H-(N?24:20),sw=W-32,seg=sw/8;
    VR_CL.forEach((q,j)=>{const on=j===i,x=16+j*seg;s+=`<rect x="${f1(x+1)}" y="${sy-14}" width="${f1(seg-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+seg/2)}" y="${sy+4}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.n||'normal'}</text>`});
    s+=`<circle cx="${f1(16+sw*t)}" cy="${sy-11}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=i?`<span>Class <b>${C.n}</b></span><span>Fails at <b>${VR_STAGES[C.st.indexOf(0)>=0?C.st.indexOf(0):C.st.indexOf(.5)]}</b></span><span>Group <b>${C.grp}</b> [[LopesPacheco2019,Bell2020Commission]]</span>`:`<span>Every step <b>works</b></span><span>Ions <b>Cl⁻ and HCO₃⁻</b> [[Shteinberg2021]]</span>`;
    const S=VR_STEPS[i];note.innerHTML=noteHTML({k:S.k,t:S.title,txt:S.txt,pt:S.pt,hook:S.hook});setSt(i)}
  const stop=playWire(rg,$('#vrPlay'),draw,40000,'Replay','variants');
  setSt=stepWire($('#vrSteps'),VR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- pick a variant ---------- */
  const sel=$('#vrPick'),psvg=$('#vrPickSvg'),pout=$('#vrPickOut');let cur=VR_VARS[0],pStop=null;
  sel.innerHTML=VR_VARS.map((v,i)=>`<option value="${i}">${v.id.replace(/>/g,'&gt;')}</option>`).join('');
  function drawPick(ph){const N=vb(psvg,'560 250','400 320'),C=VR_CL[cur.cls];
    const cx=N?200:92,cy=N?80:116,s0=N?62:64;
    const st=cur.cls===1||cur.cls===2||cur.cls===7?(cur.cls===2?'misfold':'absent'):cur.cls===3?'closed':'open';
    let s=cftr(cx,cy,s0,{state:st,open:st==='open'?(cur.cls===4?.35:1):0,flow:st==='open'?(cur.cls===4?.3:cur.cls===5?.6:1):0,ph,hco3:true,p:1,atp:st==='closed'?1:0,fold:0,mw:N?220:170,labels:false}).svg;
    s+=`<text x="${cx}" y="${cy+s0*(st==='misfold'?1.1:.9)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${cur.id.replace(/>/g,'&gt;')}</text>`;
    const x0=N?30:214,x1=N?370:534,ly=N?266:130,gp=(x1-x0)/6;
    cur.ct.split('; ').forEach((ln,k,a)=>{s+=`<text x="${x0-10}" y="${ly-62-(a.length-1-k)*14}" class="t-sm" style="fill:var(--ink);font-weight:${k?500:700}">${ln.replace(/>/g,'&gt;')}</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${ly}" y2="${ly}" style="stroke:var(--line);stroke-width:3"/>`;
    const fail=C.st.indexOf(0)>=0?C.st.indexOf(0):C.st.indexOf(.5);
    C.st.forEach((v,j)=>{const x=x0+gp*j;s+=vrMark(x,ly,v,N?10:11);
      VR_SHORT[j].forEach((w,k)=>{if(w)s+=`<text x="${f1(x)}" y="${ly+(N?26:28)+k*12}" class="t-xs t-mid" style="${j===fail?'fill:var(--bad);font-weight:700':'fill:var(--ink)'}">${w}</text>`})});
    if(fail>=0)s+=`<path d="M${f1(x0+gp*fail)} ${ly-(N?16:18)}v-12" style="stroke:var(--bad);stroke-width:1.6" marker-end="url(#vrAr)"/><text x="${f1(x0+gp*fail)}" y="${ly-(N?32:34)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">${C.st[fail]===0?'fails here':'reduced here'}</text>`;
    s=`<defs>${marker('vrAr','var(--bad)')}</defs>`+s.replace('marker-end="url(#vrAr)"','marker-start="url(#vrAr)"');
    psvg.innerHTML=s}
  function writePick(){const v=cur;pout.innerHTML=`<div class="kicker">Variant</div><h4>${v.id.replace(/>/g,'&gt;')}</h4><div class="chips"><span class="tag brand">${v.ct.replace(/>/g,'&gt;')}</span></div><dl class="kv"><div><dt>Name</dt><dd>${v.hgvs}</dd></div><div><dt>Type of change</dt><dd>${v.type}</dd></div><div><dt>Function group</dt><dd>${v.grp}</dd></div><div><dt>What goes wrong</dt><dd>${v.what}</dd></div><div><dt>Where it is common</dt><dd>${v.where}</dd></div><div><dt>What it means</dt><dd>${v.means}</dd></div></dl>`}
  sel.addEventListener('change',()=>{cur=VR_VARS[+sel.value]||VR_VARS[0];writePick();if(pStop)pStop();pStop=animate(2400,p=>drawPick(p*3),()=>{pStop=null})});
  writePick();drawPick(.2);

  /* ---------- variant counts ---------- */
  const cs=$('#vrCount'),cleg=$('#vrCountLeg'),ccap=$('#vrCountCap');let ck='types',cStop=null;
  const TYPES=[['Missense',38.9],['Frameshift',16.1],['Possibly non-pathogenic',13.0],['Splicing',11.1],['Nonsense',8.4],['Large deletion or insertion',2.8],['In-frame deletion or insertion',2.1],['Promoter',.9]];
  function drawCount(p){const N=vb(cs,ck==='types'?'720 300':'720 230',ck==='types'?'400 440':'400 330');let s='';
    if(ck==='types'){const L=N?{bx:12,bw:330,y0:30,rh:50}:{bx:250,bw:380,y0:30,rh:32},mx=40;
      [0,10,20,30,40].forEach(v=>{const x=L.bx+L.bw*v/mx;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-6}" y2="${L.y0+TYPES.length*L.rh-6}" class="grid"/><text x="${f1(x)}" y="${L.y0+TYPES.length*L.rh+8}" class="t-xs t-mid">${v}%</text>`});
      TYPES.forEach(([n,v],j)=>{const y=L.y0+j*L.rh,w=L.bw*v/mx*ease(clamp(p*1.3-j*.04)),yb=N?y+12:y;
        s+=N?`<text x="12" y="${y+6}" class="t-sm" style="fill:var(--ink)">${n}</text>`:`<text x="${L.bx-10}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink)">${n}</text>`;
        s+=`<rect x="${L.bx}" y="${yb}" width="${f1(w)}" height="16" rx="4" style="fill:${n.startsWith('Possibly')?'var(--good)':'var(--brand)'};opacity:.85"/><text x="${f1(L.bx+w+6)}" y="${yb+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${p>.7?v+'%':''}</text>`});
      s+=`<text x="${N?12:L.bx}" y="14" class="t-xs">share of 2,075 reported CFTR variants</text>`}
    else{const cols=N?16:27,sz=N?20:22,x0=N?(400-cols*sz)/2:(720-cols*sz)/2,y0=36,n=Math.round(159*p);
      for(let i=0;i<159;i++){const x=x0+(i%cols)*sz+sz/2,y=y0+Math.floor(i/cols)*sz+sz/2,col=i>=n?'var(--line)':i<127?'var(--variant)':i<139?'var(--good)':'var(--warn)';
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(sz*.38)}" style="fill:${col}"/>`}
      const yb=y0+Math.ceil(159/cols)*sz+22;
      s+=`<text x="${x0}" y="20" class="t-xs">159 variants, each at least 0.01% of CF alleles: together 96% of CF alleles</text>`;
      s+=`<text x="${x0}" y="${yb}" class="t-sm" style="fill:var(--ink)"><tspan style="fill:var(--variant);font-weight:700">127</tspan> CF-causing · <tspan style="fill:var(--good);font-weight:700">12</tspan> neutral · <tspan style="fill:var(--warn);font-weight:700">20</tspan> indeterminate</text>`}
    cs.innerHTML=s}
  const CAP={types:['A 2019 count of 2,075 reported variants by type [[LopesPacheco2019]]. An earlier classification of the CF Mutation Database found 40% single amino-acid substitutions and 36% RNA-processing changes (nonsense, frameshift and splicing) [[Cutting2015]].','<span><i style="background:var(--brand)"></i>a change in the DNA</span><span><i style="background:var(--good)"></i>possibly harmless</span>'],
    cftr2:['CFTR2, 2013: of 159 variants, 127 (80%) met both clinical and functional criteria for causing CF. Penetrance analysis in 2,188 fathers of people with CF classed 12 of the other 32 as neutral, while 20 stayed indeterminate [[Sosnay2013CFTR2]].','<span><i class="cf"></i>CF-causing</span><span><i class="ne"></i>neutral</span><span><i class="in"></i>indeterminate</span>']};
  function setCount(k){ck=k;$$('[data-vrc]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.vrc===k));ccap.innerHTML=CAP[k][0];cleg.innerHTML=CAP[k][1];if(cStop)cStop();cStop=animate(1000,drawCount,()=>{cStop=null})}
  $$('[data-vrc]').forEach(b=>b.addEventListener('click',()=>setCount(b.dataset.vrc)));
  ccap.innerHTML=CAP.types[0];cleg.innerHTML=CAP.types[1];drawCount(1);

  /* ---------- pancreatic status by genotype ---------- */
  const pi=$('#vrPI'),pcap=$('#vrPICap');let pk='k90',piStop=null;
  const PI={k90:{lab:'pancreatic insufficient, %',col:'var(--enzyme)',rows:[['F508del / F508del',99],['F508del / other',72],['Other genotypes',36]],cap:'Toronto cohort of 293 people with CF, 1990: pancreatic insufficiency by number of F508del copies [[Kerem1990NEJM]]. In that cohort 52% were homozygous, 40% heterozygous and 8% had other genotypes [[Kerem1990NEJM]].'},
    gpc:{lab:'pancreatic sufficient, %',col:'var(--good)',rows:[['R117H / F508del',87],['F508del / F508del (matched)',4]],cap:'A 14-country matched study by the Cystic Fibrosis Genotype–Phenotype Consortium, 1993 [[CFGPC1993]]. One residual-function variant opposite F508del kept the pancreas working in most people.'}};
  function drawPI(p){const N=vb(pi,'720 210','400 300'),D=PI[pk],L=N?{bx:12,bw:320,y0:44,rh:66}:{bx:250,bw:400,y0:44,rh:48};
    let s=`<text x="${N?12:L.bx}" y="22" class="t-xs">${D.lab}</text>`;
    [0,25,50,75,100].forEach(v=>{const x=L.bx+L.bw*v/100;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-8}" y2="${L.y0+D.rows.length*L.rh-10}" class="grid"/><text x="${f1(x)}" y="${L.y0+D.rows.length*L.rh+4}" class="t-xs t-mid">${v}%</text>`});
    D.rows.forEach(([n,v],j)=>{const y=L.y0+j*L.rh,w=L.bw*v/100*ease(clamp(p*1.2-j*.08)),yb=N?y+12:y;
      s+=N?`<text x="12" y="${y+4}" class="t-sm" style="fill:var(--ink)">${n}</text>`:`<text x="${L.bx-10}" y="${y+16}" class="t-sm t-end" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${L.bx}" y="${yb}" width="${f1(w)}" height="22" rx="5" style="fill:${D.col};opacity:.85"/><text x="${f1(L.bx+w+8)}" y="${yb+16}" class="t-lbl">${p>.7?v+'%':''}</text>`});
    pi.innerHTML=s}
  function setPI(k){pk=k;$$('[data-vrpi]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.vrpi===k));pcap.innerHTML=PI[k].cap;if(piStop)piStop();piStop=animate(900,drawPI,()=>{piStop=null})}
  $$('[data-vrpi]').forEach(b=>b.addEventListener('click',()=>setPI(b.dataset.vrpi)));
  pcap.innerHTML=PI.k90.cap;drawPI(1);

  /* ---------- modifiers: twins ---------- */
  const md=$('#vrMod'),mcap=$('#vrModCap');let mk='var',mStop=null;
  const MC={var:'Variation in lung function, from 134 identical twins and 272 non-identical twins and siblings: genetic factors 50%, unique environmental or chance factors 36%, shared environment 14% [[Collaco2010Env]].',
    lung:'Lung-function correlation within pairs: identical (monozygotic) twins 0.82–0.91, non-identical twins and siblings 0.50–0.64; heritability estimates ranged from 0.54 to 1.0 [[Vanscoy2007]]. Identical twins share their CFTR genotype and all their other genes.',
    cfrd:'Concordance for CF-related diabetes: 0.73 in identical twin pairs against 0.18 in non-identical twins and siblings, with heritability "near one" [[Blackman2009CFRD]].'};
  function drawMod(p){const N=vb(md,mk==='var'?'720 150':'720 210',mk==='var'?'400 190':'400 240');let s='';const e=ease(clamp(p));
    if(mk==='var'){const x0=N?12:40,w=N?376:640,y=N?70:66,P=[['genetic',50,'var(--brand)'],['unique environment and chance',36,'var(--dx)'],['shared environment',14,'var(--rec)']];
      s+=`<text x="${x0}" y="${y-22}" class="t-sm" style="fill:var(--ink);font-weight:600">what explains the differences in lung function</text>`;let x=x0;
      P.forEach(([n,v,c],j)=>{const ww=w*v/100*e;s+=`<rect x="${f1(x)}" y="${y}" width="${f1(Math.max(0,ww-2))}" height="34" rx="5" style="fill:${c};opacity:.85"/>`;
        if(p>.8)s+=`<text x="${f1(x+ww/2)}" y="${y+22}" class="t-lbl t-mid" style="fill:var(--panel)">${v}%</text>`;
        const ly=N?y+60+j*20:y+56;if(p>.8)s+=N?`<rect x="${x0}" y="${ly-9}" width="10" height="10" rx="2" style="fill:${c}"/><text x="${x0+16}" y="${ly}" class="t-sm" style="fill:var(--ink)">${n}</text>`:`<text x="${f1(x+4)}" y="${ly}" class="t-sm" style="fill:var(--ink)">${n}</text>`;x+=ww})}
    else{const R=mk==='lung'?[['identical twins',.82,.91],['non-identical twins and siblings',.5,.64]]:[['identical twins',.73,.73],['non-identical twins and siblings',.18,.18]];
      const L=N?{bx:12,bw:330,y0:56,rh:76}:{bx:270,bw:400,y0:50,rh:56};
      s+=`<text x="${N?12:L.bx}" y="22" class="t-xs">${mk==='lung'?'lung-function correlation within pairs (0 to 1)':'concordance for CF-related diabetes (0 to 1)'}</text>`;
      [0,.25,.5,.75,1].forEach(v=>{const x=L.bx+L.bw*v;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-10}" y2="${L.y0+2*L.rh-14}" class="grid"/><text x="${f1(x)}" y="${L.y0+2*L.rh}" class="t-xs t-mid">${v}</text>`});
      R.forEach(([n,a,b],j)=>{const y=L.y0+j*L.rh,yb=N?y+12:y,xa=L.bx+L.bw*a*e,xb=L.bx+L.bw*b*e,c=j?'var(--dx)':'var(--brand)';
        s+=N?`<text x="12" y="${y+4}" class="t-sm" style="fill:var(--ink)">${n}</text>`:`<text x="${L.bx-10}" y="${y+16}" class="t-sm t-end" style="fill:var(--ink)">${n}</text>`;
        s+=`<rect x="${L.bx}" y="${yb+6}" width="${f1(xa-L.bx)}" height="10" rx="4" style="fill:${c};opacity:.35"/>`;
        s+=a===b?`<circle cx="${f1(xa)}" cy="${yb+11}" r="8" style="fill:${c}"/>`:`<rect x="${f1(xa)}" y="${yb+2}" width="${f1(Math.max(4,xb-xa))}" height="18" rx="6" style="fill:${c}"/>`;
        if(p>.8)s+=`<text x="${f1(xb+12)}" y="${yb+15}" class="t-lbl">${a===b?a.toFixed(2):a.toFixed(2)+'–'+b.toFixed(2)}</text>`})}
    md.innerHTML=s}
  function setMod(k){mk=k;$$('[data-vrm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.vrm===k));mcap.innerHTML=MC[k];if(mStop)mStop();mStop=animate(900,drawMod,()=>{mStop=null})}
  $$('[data-vrm]').forEach(b=>b.addEventListener('click',()=>setMod(b.dataset.vrm)));
  mcap.innerHTML=MC.var;drawMod(1);
  redraws.variants=(f=>()=>{f&&f();drawPick(.2);drawCount(1);drawPI(1);drawMod(1)})(redraws.variants);
};
