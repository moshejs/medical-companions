/* =============== 1.2 The CFTR gene & inheritance =============== */
/* Main scrubber: a five-stage zoom (cell, chromosome 7, the CFTR gene, the F508del deletion, the protein). Each stage
   is drawn by its own scene function in a box B={x,y,w,h}; in the last fifth of a stage the scene is magnified about
   its target point and fades while the next scene grows out of that point, so the zoom is continuous.
   Then: a Punnett calculator with an icon array, a pregnancy roller, measured carrier frequencies and a pedigree. */
const GN_STEPS=[
 {from:0,at:.08,k:'Zoom 1 · the cell',t:'Inside the nucleus',
  txt:'Chromosomes come in pairs, one copy of each from each parent. The gene behind CF was found in 1989 by positional cloning: Rommens and colleagues cloned more than 500,000 base pairs from the long arm of chromosome 7, Riordan and colleagues isolated its cDNA, and Kerem and colleagues showed which change was most common [[Rommens1989,Riordan1989,Kerem1989]].',
  pt:'Genes are instructions. CF comes from changes in one gene, CFTR, and you need two changed copies, one from each parent, to have CF [[Deignan2020ACMG]].',
  hook:'The CF gene was identified in 1989 by positional cloning, in three <i>Science</i> papers by Rommens, Riordan and Kerem [[Rommens1989,Riordan1989,Kerem1989]].'},
 {from:.2,at:.3,k:'Zoom 2 · chromosome 7',t:'7q31.2, on the long arm',
  txt:'Current references place CFTR at chromosome 7q31.2; the 1991 genomic sequence had placed it at 7q31–q32 [[Deignan2020ACMG,Zielenski1991]]. Its reference mRNA is NM_000492, its protein NP_000483, and its OMIM entries are 602421 for the gene and 219700 for CF [[Deignan2020ACMG]].',
  pt:'Everyone has two chromosome 7s, so everyone has two copies of CFTR. A carrier has one changed copy and one working copy, and is usually healthy [[Deignan2020ACMG]].',
  hook:'CFTR sits on the long arm of chromosome 7, at 7q31.2 [[Deignan2020ACMG]].'},
 {from:.4,at:.556,k:'Zoom 3 · the CFTR gene',t:'27 exons, 1,480 amino acids',
  txt:'The 1991 sequence found 27 exons, each flanked by consensus splice signals [[Zielenski1991]]. One review gives the gene as about 190 kb of genomic DNA, copied into a 6.2 kb mRNA and translated into a protein of 1,480 amino acids; the 1989 chromosome walk had estimated about 250 kb [[LopesPacheco2019,Rommens1989]]. The predicted protein had two repeated halves, each with a membrane-spanning domain and an ATP-binding domain [[Riordan1989]], joined by a regulatory (R) domain [[Liu2017Cryo]].',
  pt:'Most of the gene is spacer between 27 coding pieces called exons. The cell joins the exons into a short message and reads it to build the protein.',
  hook:'CFTR belongs to the ATP-binding cassette (ABC) transporter family but works as an ion channel [[Liu2017Cryo]].'},
 {from:.6,at:.752,k:'Zoom 4 · exon 11',t:'F508del: three letters gone',
  txt:'Riordan\'s cDNA paper found a three-base-pair deletion that removes a phenylalanine at the centre of the first nucleotide-binding domain (NBD1) [[Riordan1989]]. Its HGVS name is c.1521_1523delCTT, p.Phe508del [[Farrell2018Age,Deignan2020ACMG]]. Kerem and colleagues reported that about 70% of CF mutations were this deletion [[Kerem1989]].',
  pt:'Three DNA letters are missing. Three letters spell one building block, so the rest of the message still reads in step, but one building block, phenylalanine number 508, is gone.',
  hook:'F508del is a 3-bp deletion (c.1521_1523delCTT) that removes phenylalanine 508 in NBD1. About 70% of CF alleles worldwide carry it [[Kerem1989,Morral1994,Farrell2018Age]].'},
 {from:.8,at:.9,k:'Zoom 5 · the protein',t:'A channel that never arrives',
  txt:'CFTR is a cyclic-AMP-regulated chloride channel found almost only in secretory epithelial cells, and it carries bicarbonate too [[Zielenski1995,Shteinberg2021]]. F508del CFTR misfolds, is held by quality control in the endoplasmic reticulum and is destroyed by proteasomes; the little that reaches the surface is unstable and gates poorly [[LopesPacheco2019,Cutting2015]].',
  pt:'"Nearly 90%" of people with CF have at least one F508del copy [[Middleton2019ETI]]. Without working CFTR, the mucus is poorly hydrated and poorly cleared [[Shteinberg2021]].',
  hook:'F508del is the classic class II (misfolding) variant, yet it "could be assigned to at least three classes" [[Cutting2015]]. Module 1.3 walks through the classes.'}];
const GN_HEAD=[['A cell','the nucleus keeps the chromosomes in pairs'],['Chromosome 7','two copies, one from each parent'],['The CFTR gene','27 exons joined into a message, read into a protein'],['F508del','three DNA letters deleted, one amino acid lost'],['The CFTR protein','working channel beside the F508del protein']];
const GN_READ=['Scale <b>one cell</b><span>Chromosomes <b>in pairs</b></span>',
  '<span>Locus <b>7q31.2</b> [[Deignan2020ACMG]]</span><span>Arm <b>long (q)</b> [[Rommens1989]]</span>',
  '<span>Gene <b>about 190 kb</b></span><span>Exons <b>27</b></span><span>mRNA <b>6.2 kb</b></span><span>Protein <b>1,480 amino acids</b> [[LopesPacheco2019,Zielenski1991]]</span>',
  '<span>DNA <b>c.1521_1523delCTT</b></span><span>Protein <b>p.Phe508del</b> [[Farrell2018Age,Deignan2020ACMG]]</span>',
  '<span>F508del share <b>about 70% of CF chromosomes worldwide</b> [[Morral1994,Kerem1989]]</span>'];
/* a callout: a leader line from a point to a label */
function gnCall(px,py,tx,ty,txt,o={}){const an=o.end?'t-end':'',op=o.op==null?1:o.op;
  return `<g style="opacity:${f1(op)}"><path d="M${f1(px)} ${f1(py)}L${f1(tx+(o.end?4:-4))} ${f1(ty-4)}" style="fill:none;stroke:var(--muted);stroke-width:1"/><circle cx="${f1(px)}" cy="${f1(py)}" r="2.2" style="fill:var(--muted)"/><text x="${f1(tx)}" y="${f1(ty)}" class="t-sm ${an}" style="fill:var(--ink)">${txt}</text>${o.sub?`<text x="${f1(tx)}" y="${f1(ty+13)}" class="t-xs ${an}">${o.sub}</text>`:''}</g>`}
/* scene 1: a cell with its nucleus and pairs of chromosomes; pair "7" highlighted */
function gnCell(B,u,N){const cx=B.x+B.w*(N?.5:.38),cy=B.y+B.h*(N?.42:.5),rx=N?B.w*.46:B.w*.3,ry=N?B.h*.38:B.h*.47,rr=rng(4);
  let s=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cell);stroke:var(--airway);stroke-width:3"/>`;
  for(let i=0;i<9;i++){const a=i/9*6.283+.3,k=.78+rr()*.12;s+=`<ellipse cx="${f1(cx+Math.cos(a)*rx*k)}" cy="${f1(cy+Math.sin(a)*ry*k)}" rx="${f1(rx*.07)}" ry="${f1(ry*.035)}" transform="rotate(${f1(a*57.3+90)} ${f1(cx+Math.cos(a)*rx*k)} ${f1(cy+Math.sin(a)*ry*k)})" style="fill:var(--tissue);stroke:var(--airway);stroke-width:1"/>`}
  const nrx=rx*.6,nry=ry*.62;
  s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(nrx)}" ry="${f1(nry)}" style="fill:var(--nucleus);fill-opacity:.32;stroke:var(--nucleus);stroke-width:2.4"/>`;
  let tgt=[cx,cy];const hl=ramp(u,.12,.34);
  for(let r=0;r<2;r++)for(let c=0;c<5;c++){const idx=r*5+c,h=nry*(.62-c*.05-r*.06),w=h*.17,px=cx-nrx*.6+c*nrx*.3,py=cy-nry*.72+r*nry*.78;
    const rot=Math.sin(u*7+idx*1.7)*7,pc=[px,py+h/2];
    let g=chrom(px-w*.72,py,h,{w})+chrom(px+w*.72,py,h,{w});
    if(idx===2){g+=`<g style="opacity:${f1(hl)}">${chrom(px-w*.72,py,h,{w,band:.66})}${chrom(px+w*.72,py,h,{w,band:.66})}</g>`;
      g+=`<rect x="${f1(px-w*1.8)}" y="${f1(py-5)}" width="${f1(w*3.6)}" height="${f1(h+10)}" rx="6" style="fill:none;stroke:var(--variant);stroke-width:1.6;stroke-dasharray:4 3;opacity:${f1(hl)}"/>`;
      tgt=[px-w*.72,py+h*.66]}
    s+=`<g transform="rotate(${f1(idx===2?0:rot)} ${f1(pc[0])} ${f1(pc[1])})">${g}</g>`;
    s+=`<text x="${f1(px)}" y="${f1(py+h+11)}" class="t-xs t-mid" style="${idx===2?'fill:var(--ink);font-weight:700':''}">${idx===2?'7':''}</text>`}
  if(N){s+=`<text x="${f1(cx)}" y="${f1(cy-ry-8)}" class="t-sm t-mid" style="fill:var(--ink)">a cell</text>`;
    s+=gnCall(cx+nrx*.85,cy+nry*.5,B.x+B.w-6,cy+ry+22,'nucleus',{end:1,sub:'holds the chromosomes'});
    s+=gnCall(tgt[0],tgt[1]+8,B.x+8,cy+ry+22,'pair 7',{sub:'one copy from each parent',op:hl})}
  else{const lx=cx+rx+28;
    s+=gnCall(cx+rx*.7,cy-ry*.7,lx,B.y+30,'a cell');
    s+=gnCall(cx+nrx*.95,cy+nry*.2,lx,cy-10,'the nucleus',{sub:'holds the chromosomes, in pairs'});
    s+=gnCall(tgt[0]+12,tgt[1]-14,lx,cy+48,'pair 7',{sub:'one copy from each parent',op:hl})}
  return {svg:s,tgt}}
/* scene 2: the two chromosome 7s with the CFTR band */
function gnChr(B,u,N){const h=B.h*(N?.7:.82),y0=B.y+B.h*(N?.07:.06),w=h*.16,x1=B.x+B.w*(N?.34:.36),x2=B.x+B.w*(N?.55:.48),cyc=y0+h*.38,hl=ramp(u,.08,.3),by=y0+h*.66;
  let s=chrom(x1,y0,h,{w,label:'copy 1'})+chrom(x2,y0,h,{w,label:'copy 2'});
  s+=`<g style="opacity:${f1(hl)}">${chrom(x1,y0,h,{w,band:.66})}${chrom(x2,y0,h,{w,band:.66})}</g>`;
  const lx=x1-w/2-10;
  s+=`<text x="${f1(lx)}" y="${f1(y0+h*.2)}" class="t-xs t-end">p (short arm)</text><text x="${f1(lx)}" y="${f1(cyc+3)}" class="t-xs t-end">centromere</text><text x="${f1(lx)}" y="${f1(y0+h*.86)}" class="t-xs t-end">q (long arm)</text>`;
  s+=`<path d="M${f1(lx+3)} ${f1(cyc)}h6" style="stroke:var(--muted)"/>`;
  const op=ramp(u,.2,.42),tx=x2+w/2+(N?18:34);
  s+=`<g style="opacity:${f1(op)}"><path d="M${f1(x2+w/2+4)} ${f1(by)}H${f1(tx-6)}" style="stroke:var(--variant);stroke-width:1.4"/><text x="${f1(tx)}" y="${f1(by-4)}" class="t-big" style="fill:var(--ink)">7q31.2</text><text x="${f1(tx)}" y="${f1(by+12)}" class="t-sm">the CFTR gene</text>`;
  if(!N)s+=`<text x="${f1(tx)}" y="${f1(by+28)}" class="t-xs">1991 sequence: 7q31–q32</text>`;
  s+='</g>';
  const op2=ramp(u,.45,.65);
  s+=`<text x="${f1(N?B.x+B.w/2:tx)}" y="${f1(N?y0+h+34:y0+h*.2)}" class="t-xs ${N?'t-mid':''}" style="opacity:${f1(op2)};fill:var(--ink)">a carrier: a variant on one copy only</text>`;
  return {svg:s,tgt:[x1,by]}}
/* scene 3: the gene as exons, joined into mRNA, read into the protein */
function gnGene(B,u,N){const gx=B.x+(N?8:30),gw=B.w-(N?16:60),gy=B.y+B.h*(N?.22:.24);
  const G=geneStrip(gx,gy,gw,{n:27,mark:10,label:'exon 11',zoom:ramp(u,.86,1)*.6});
  let s=`<text x="${f1(gx)}" y="${f1(gy-(N?36:30))}" class="t-sm" style="fill:var(--ink)">genomic DNA, about 190 kb</text>`+G.svg;
  s+=`<text x="${f1(G.X(0))}" y="${f1(gy+22)}" class="t-xs t-mid">1</text><text x="${f1(G.X(26))}" y="${f1(gy+22)}" class="t-xs t-mid">27</text><text x="${f1(gx+gw*.5)}" y="${f1(gy+22)}" class="t-xs t-mid">exons (boxes) and introns (line)</text>`;
  const my=B.y+B.h*(N?.5:.54),mw=gw*(N?.92:.62),mx=gx+(gw-mw)/2,ew=mw/27;
  if(u>.12){const lop=ramp(u,.45,.55);
    s+=`<line x1="${f1(mx)}" x2="${f1(mx+mw)}" y1="${f1(my)}" y2="${f1(my)}" style="stroke:var(--dna);stroke-width:1;opacity:${f1(lop)}"/>`;
    for(let i=0;i<27;i++){const p=ease(ramp(u,.12+i*.009,.4+i*.009)),x=lerp(G.X(i),mx+ew*(i+.5),p),y=lerp(gy,my,p),ww=lerp(5,ew-.8,p),hh=lerp(14,11,p);
      s+=`<rect x="${f1(x-ww/2)}" y="${f1(y-hh/2)}" width="${f1(ww)}" height="${f1(hh)}" rx="1.5" style="fill:${i===10?'var(--dna)':'var(--panel-2)'};stroke:var(--dna);stroke-width:.8;opacity:${f1(Math.min(1,p*3))}"/>`}
    s+=`<text x="${f1(N?mx:mx+mw+10)}" y="${f1(N?my+22:my+4)}" class="t-sm" style="fill:var(--ink);opacity:${f1(lop)}">mRNA, about 6.2 kb</text>`}
  const py=B.y+B.h*(N?.8:.84),pp=ramp(u,.52,.78);
  if(pp>0){s+=`<path d="M${f1(gx+gw/2)} ${f1(my+(N?30:12))}V${f1(py-20)}" style="stroke:var(--muted);stroke-width:1.3;opacity:${f1(pp)}" marker-end="url(#gnAr)"/>`;
    const D=[['MSD1',0,.2],['NBD1',.24,.37],['R',.4,.5],['MSD2',.54,.74],['NBD2',.78,.92]];
    s+=`<line x1="${f1(mx)}" x2="${f1(mx+mw*pp)}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--cftr);stroke-width:2"/>`;
    D.forEach(([n,a,b],j)=>{const vis=clamp((pp-a)/(b-a));if(vis<=0)return;const x0=mx+mw*a,x1=mx+mw*lerp(a,b,vis);
      s+=`<rect x="${f1(x0)}" y="${f1(py-7)}" width="${f1(x1-x0)}" height="14" rx="7" style="fill:var(--cftr);opacity:${j===1?1:.55}"/>`;
      if(vis>.6)s+=`<text x="${f1((x0+mx+mw*b)/2)}" y="${f1(py-12)}" class="t-xs t-mid" style="${j===1?'fill:var(--ink);font-weight:700':''}">${n}</text>`});
    s+=`<text x="${f1(N?mx:mx+mw+10)}" y="${f1(N?py+24:py+4)}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(pp,.8,1))}">protein, 1,480 amino acids</text>`}
  return {svg:s,tgt:[G.X(10),gy]}}
/* scene 4: a close-up of exon 11: C T T lift out, the chain loses phenylalanine 508 */
function gnDel(B,u,N){const fx=B.x+(N?4:40),fw=B.w-(N?8:80),fy=B.y+B.h*(N?.1:.06),fh=B.h*(N?.4:.44),bw=fw/17,sy=fy+fh*.56,bh=Math.min(26,bw*1.05);
  const lift=ease(ramp(u,.08,.28)),gone=ramp(u,.26,.36),close=ease(ramp(u,.32,.46)),regroup=ramp(u,.42,.5);
  let s=`<rect x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}" rx="10" style="fill:var(--field);stroke:var(--dna);stroke-width:1.2;stroke-dasharray:5 4"/>`;
  s+=`<text x="${f1(fx+10)}" y="${f1(fy+16)}" class="t-sm" style="fill:var(--ink)">exon 11, close up</text><text x="${f1(fx+fw-10)}" y="${f1(fy+16)}" class="t-xs t-end">DNA letters (schematic)</text>`;
  const L={8:'C',9:'T',10:'T'};
  for(let i=0;i<15;i++){const del=i>=8&&i<=10,pos=i>10?i-3*close:i,x=fx+bw*(1+pos),y=del?sy-lift*fh*.42:sy,op=del?1-gone:1;
    if(op<=0)continue;
    s+=`<rect x="${f1(x+1)}" y="${f1(y-bh/2)}" width="${f1(bw-2)}" height="${f1(bh)}" rx="3" style="fill:${del?'var(--variant)':'var(--panel-2)'};stroke:var(--dna);stroke-width:1;opacity:${f1(op)}"/>`;
    if(del)s+=`<text x="${f1(x+bw/2)}" y="${f1(y+4.5)}" class="t-mid" style="font:700 13px var(--mono);fill:var(--panel);opacity:${f1(op)}">${L[i]}</text>`}
  /* codon brackets: five codons before, four after */
  const br=(p0,lab,op,hl)=>{const x0=fx+bw*(1+p0)+2,x1=x0+bw*3-4,y=sy+bh/2+5;return `<g style="opacity:${f1(op)}"><path d="M${f1(x0)} ${f1(y)}v4H${f1(x1)}v-4" style="fill:none;stroke:${hl?'var(--variant)':'var(--muted)'};stroke-width:1.2"/><text x="${f1((x0+x1)/2)}" y="${f1(y+15)}" class="t-xs t-mid" style="${hl?'fill:var(--ink);font-weight:700':''}">${lab}</text></g>`};
  [505,506,507,508,509].forEach((a,j)=>{s+=br(j*3,a===508?'508 Phe':a,1-regroup,a===508)});
  [505,506,507,509].forEach((a,j)=>{s+=br(j*3,a,regroup,false)});
  s+=`<text x="${f1(fx+bw*9.5)}" y="${f1(sy-fh*.42-bh/2-6)}" class="t-sm t-mid" style="fill:var(--ink);opacity:${f1(ramp(u,.12,.2)*(1-gone))}">c.1521_1523delCTT</text>`;
  if(regroup>.5)s+=`<text x="${f1(fx+bw*1)}" y="${f1(fy+fh-8)}" class="t-xs" style="fill:var(--ink)">the reading frame stays in step: three letters are one codon</text>`;
  /* the amino-acid chain */
  const cy=B.y+B.h*(N?.74:.8),sp=fw/(N?8:9),c0=fx+fw/2-sp*2,drop=ease(ramp(u,.48,.62)),shift=ease(ramp(u,.58,.72)),r=N?13:15;
  s+=`<text x="${f1(fx)}" y="${f1(cy-r-14)}" class="t-xs">amino-acid chain (part of NBD1)</text>`;
  const xs=[-1,0,1,2,3,4,5].map(k=>c0+sp*k);
  let d='';[-1,0,1,2,4,5].forEach((k,j)=>{const x=k>3?xs[k+1]-sp*shift:xs[k+1];d+=(j?'L':'M')+f1(x)+' '+f1(cy)});
  s+=`<path d="${d}" style="fill:none;stroke:var(--cftr);stroke-width:2.2"/>`;
  if(drop<1)s+=`<path d="M${f1(xs[3])} ${f1(cy)}L${f1(xs[4])} ${f1(cy+drop*30)}L${f1(xs[5])} ${f1(cy)}" style="fill:none;stroke:var(--cftr);stroke-width:2.2;opacity:${f1(1-drop)}"/>`;
  const AA=[504,505,506,507,508,509,510];
  AA.forEach((a,k)=>{const isF=a===508,x=k>4?xs[k]-sp*shift:xs[k],y=isF?cy+drop*34:cy,op=isF?1-drop*.85:(k===0||k===6?.45:1);
    s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${isF?'var(--variant)':'var(--cftr)'};stroke:var(--panel);stroke-width:2;opacity:${f1(op)}"/><text x="${f1(x)}" y="${f1(y+4)}" class="t-mid" style="font:700 ${N?10:11}px var(--mono);fill:var(--panel);opacity:${f1(op)}">${isF?'F':a}</text>`});
  s+=`<text x="${f1(xs[4])}" y="${f1(cy+r+(N?48:52))}" class="t-sm t-mid" style="fill:var(--ink);opacity:${f1(ramp(u,.66,.74))}">p.Phe508del: phenylalanine 508 missing</text>`;
  return {svg:s,tgt:[xs[4],cy]}}
/* scene 5: a working channel beside the misfolded F508del protein */
function gnProt(B,u,N,ph){const s0=N?74:96,A=N?[B.x+B.w*.5,B.y+B.h*.24]:[B.x+B.w*.26,B.y+B.h*.44],Q=N?[B.x+B.w*.5,B.y+B.h*.68]:[B.x+B.w*.74,B.y+B.h*.44],mw=N?300:250;
  const C1=cftr(A[0],A[1],s0,{state:'open',flow:1,ph,hco3:true,water:.8,p:1,atp:1,labels:true,mw});
  const C2=cftr(Q[0],Q[1],s0,{state:'misfold',fold:0,mw,labels:!N});
  let s=C1.svg+C2.svg;
  /* fragments: the misfolded protein is broken down */
  const bl=C2.at.blob,dg=ramp(u,.25,.95);
  for(let i=0;i<10;i++){const a=i/10*6.283+.4,d=s0*(.28+.5*dg);s+=`<circle cx="${f1(bl[0]+Math.cos(a)*d)}" cy="${f1(bl[1]+Math.sin(a)*d*.55)}" r="${f1(2.2+(i%3))}" style="fill:var(--misfold);opacity:${f1(dg*(1-dg*.6))}"/>`}
  const cy1=A[1]+s0*(N?.95:1.05),cy2=Q[1]+s0*(N?1.12:1.08);
  s+=`<text x="${f1(A[0])}" y="${f1(cy1)}" class="t-lbl t-mid">usual CFTR</text><text x="${f1(A[0])}" y="${f1(cy1+14)}" class="t-xs t-mid">at the surface: Cl⁻ and HCO₃⁻ out, water follows</text>`;
  s+=`<text x="${f1(Q[0])}" y="${f1(cy2)}" class="t-lbl t-mid" style="fill:var(--misfold)">F508del CFTR</text><text x="${f1(Q[0])}" y="${f1(cy2+14)}" class="t-xs t-mid">misfolds, is held in the ER and destroyed</text>`;
  s+=`<text x="${f1(Q[0]+s0*.62)}" y="${f1(bl[1]+4)}" class="t-xs" style="fill:var(--ink);opacity:${f1(1-dg)}">misfolded</text>`;
  return {svg:s,tgt:A}}
const GN_SC=[gnCell,gnChr,gnGene,gnDel,gnProt];
/* the Punnett calculator */
const GN_AL={none:['N','N'],car:['N','v'],cf:['v','v']};
const GN_FR=p=>p===0?'none':p===.25?'1 in 4':p===.5?'1 in 2':p===.75?'3 in 4':'every one';
/* measured carrier frequencies: [label, percent, shown as, source] */
const GN_FREQ={lab:{rows:[['White (self-identified)',100/29,'1 in 29','Strom 2011'],['Ashkenazi Jewish',100/27,'1 in 27','Strom 2011'],['All ancestries, 23-variant panel',100/37.6,'1 in 37.6','Strom 2011'],
    ['Caucasian, 69-variant panel',100/27,'1 in 27','Zvereff 2014'],['Hispanic American, 69-variant',100/48,'1 in 48','Zvereff 2014'],['African American, 69-variant',100/79,'1 in 79','Zvereff 2014'],['Asian, 32-variant panel',100/261,'1 in 261','ACMG 2021']],
    cap:'Measured in US carrier screening: about 3 million screens with the 23-variant panel [[Strom2011]], 109,830 people with a 69-variant panel [[Zvereff2014]] and the 32-variant figure for Asian ancestry quoted by the ACMG [[Gregg2021ACMG]]. A larger panel finds more carriers in groups whose variants the small panel misses (Hispanic American: 1 in 69 with 32 variants, 1 in 48 with 69) [[Zvereff2014]]. Dashed line: the highest carrier frequency in any US subpopulation in gnomAD, 0.040972, about 1 in 24 [[Gregg2021ACMG]].'},
  wgs:{rows:[['Most similar to a European reference',3.62,'3.62%','All of Us'],['Most similar to an Admixed American reference',1.86,'1.86%','All of Us'],['Most similar to an African reference',1.35,'1.35%','All of Us']],
    cap:'Whole-genome sequencing of 317,964 US adults in the All of Us cohort, counting 363 pathogenic variants: no panel limits what is found [[Zeng2025Hetero]]. Groups are genetic similarity to reference populations, not self-identified ancestry. Dashed line: the highest US subpopulation figure in gnomAD, about 1 in 24 [[Gregg2021ACMG]].'}};
inits.gene=()=>{
  /* ---------- main: the zoom ---------- */
  const svg=$('#gnSvg'),rg=$('#gnT'),note=$('#gnNote'),rd=$('#gnRead');let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,H=N?560:380;
    const B=N?{x:10,y:52,w:380,h:420}:{x:10,y:48,w:700,h:270};
    const i=Math.min(4,Math.floor(t*5)),u=clamp(t*5-i),v=i<4?ease(ramp(u,.8,1)):0,ph=t*12;
    const S=GN_SC[i](B,u,N,ph),cx=B.x+B.w/2,cy=B.y+B.h/2,[tx,ty]=S.tgt;
    let s=`<defs>${marker('gnAr','var(--muted)')}<clipPath id="gnClip"><rect x="${B.x}" y="${B.y-8}" width="${B.w}" height="${B.h+16}"/></clipPath></defs>`;
    const hd=GN_HEAD[v>.5?i+1:i];
    s+=`<text x="16" y="24" class="t-big">${hd[0]}</text><text x="16" y="40" class="t-sm">${hd[1]}</text>`;
    s+=`<g clip-path="url(#gnClip)">`;
    if(v>0){const k=1+5*v,px=lerp(tx,cx,v),py=lerp(ty,cy,v),S2=GN_SC[i+1](B,0,N,ph),sc=lerp(.16,1,v);
      s+=`<g style="opacity:${f1(1-v)}" transform="translate(${f1(px)} ${f1(py)}) scale(${k.toFixed(3)}) translate(${f1(-tx)} ${f1(-ty)})">${S.svg}</g>`;
      s+=`<g style="opacity:${f1(v)}" transform="translate(${f1(px)} ${f1(py)}) scale(${sc.toFixed(3)}) translate(${f1(-cx)} ${f1(-cy)})">${S2.svg}</g>`}
    else s+=S.svg;
    s+='</g>';
    /* zoom strip */
    const sy=H-(N?44:36),sx=16,sw=W-32,seg=sw/5,lab=N?['cell','chr 7','gene','F508del','protein']:['cell','chromosome 7','CFTR gene','F508del','protein'];
    lab.forEach((q,j)=>{const on=j===i,x=sx+j*seg;s+=`<rect x="${f1(x+1)}" y="${sy}" width="${f1(seg-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+seg/2)}" y="${sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q}</text>`});
    s+=`<circle cx="${f1(sx+sw*t)}" cy="${sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=GN_READ[i];note.innerHTML=noteHTML(GN_STEPS[i]);setSt(i)}
  const stop=playWire(rg,$('#gnPlay'),draw,30000,'Replay','gene');
  setSt=stepWire($('#gnSteps'),GN_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the Punnett calculator ---------- */
  const pun=$('#gnPun'),out=$('#gnPunOut'),st={a:'car',b:'car'};let pStop=null;
  const odds=()=>{const fa=GN_AL[st.a].filter(x=>x==='v').length/2,fb=GN_AL[st.b].filter(x=>x==='v').length/2;return {cf:fa*fb,car:fa*(1-fb)+fb*(1-fa),none:(1-fa)*(1-fb)}};
  function drawPun(p){const N=vb(pun,'500 290','400 650'),O=odds();
    const L=N?{px:70,py:34,s:96,ix:70,iy:354,isz:20,ig:6}:{px:30,py:44,s:68,ix:250,iy:46,isz:17,ig:4};
    const P=punnett(L.px,L.py,L.s,{a:GN_AL[st.a],b:GN_AL[st.b],show:p});
    const hs=L.s*.55;
    let s=`<text x="${f1(L.px+hs+L.s)}" y="${f1(L.py-10)}" class="t-sm t-mid" style="fill:var(--ink)">parent 2 passes on</text>`;
    s+=`<text transform="translate(${f1(L.px-10)} ${f1(L.py+hs+L.s)}) rotate(-90)" class="t-sm t-mid" style="fill:var(--ink)">parent 1 passes on</text>`;
    s+=P.svg;
    const nCF=Math.round(O.cf*100),nCar=Math.round(O.car*100),vis=Math.round(p*100);
    s+=`<text x="${L.ix}" y="${L.iy-12}" class="t-sm" style="fill:var(--ink)">100 pregnancies, on average</text>`;
    for(let i=0;i<100;i++){const x=L.ix+(i%10)*(L.isz+L.ig),y=L.iy+Math.floor(i/10)*(L.isz+L.ig*1.4);
      const col=i>=vis?'var(--line)':i<nCF?'var(--variant)':i<nCF+nCar?'var(--variant)':'var(--line)',op=i<vis&&i>=nCF&&i<nCF+nCar?.4:1;
      s+=person(x+L.isz/2,y,L.isz,col,{op})}
    if(N)s+=`<text x="${f1(L.px+hs+L.s)}" y="${f1(L.py+hs+L.s*2+26)}" class="t-sm t-mid" style="fill:var(--ink)">CF ${nCF}% · carrier ${nCar}% · neither ${100-nCF-nCar}%</text>`;
    pun.innerHTML=s}
  function writeOut(){const O=odds(),k=[st.a,st.b].sort().join('+');
    const H={'car+car':['Two carriers: 1 in 4, every pregnancy','When both parents are carriers, each pregnancy has a 1 in 4 (25%) chance of a child with two variants, a 2 in 4 (50%) chance of a carrier child and a 1 in 4 (25%) chance of a child with neither variant [[Deignan2020ACMG,Shteinberg2021]]. If both partners are carriers, ACOG advises that genetic counselling be offered [[ACOG2017CO691]].'],
      'car+none':['One carrier: no child with two variants from these copies','A child can receive at most one variant, so on average half the children are carriers and none inherits two known variants. Carrier screening looks for many variants but not all, and cannot detect a new variant in the child [[Gregg2021ACMG]].'],
      'cf+none':['Every child is a carrier','Every child receives one variant from the parent with CF and a working copy from the other parent, so every child is a carrier, and carriers are expected to be asymptomatic [[Deignan2020ACMG]].'],
      'car+cf':['1 in 2, every pregnancy','Each child receives a variant from the parent with CF; whether the second copy carries a variant depends on which copy the carrier parent passes on, so half the pregnancies on average give a child with two variants.'],
      'cf+cf':['Every child would have two variants','Both parents can pass on only variant copies, so every child would inherit two. What that means clinically depends on which variants they are (module 1.3).'],
      'none+none':['No known variant in either parent','A negative screen lowers the chance of being a carrier but does not make it zero, because panels and even sequencing do not find every variant [[Gregg2021ACMG,Palomaki2004]].']}[k];
    out.innerHTML=`<div class="kicker">Each pregnancy</div><h4>${H[0]}</h4><div class="gn-odds"><div class="cf"><small>CF</small><b>${Math.round(O.cf*100)}%</b><span>${GN_FR(O.cf)}</span></div><div><small>Carrier</small><b>${Math.round(O.car*100)}%</b><span>${GN_FR(O.car)}</span></div><div><small>Neither</small><b>${Math.round(O.none*100)}%</b><span>${GN_FR(O.none)}</span></div></div><p>${H[1]}</p><div class="pt"><b>In plain words</b>The same odds in every pregnancy: chance has no memory, so each pregnancy starts fresh [[Deignan2020ACMG]]. Carrier status is common and it is nobody's fault [[Zeng2025Hetero]].</div>`}
  function setPun(){$$('[data-gnp]').forEach(b=>{const[w,v]=b.dataset.gnp.split(':');b.setAttribute('aria-pressed',st[w]===v)});writeOut();
    if(pStop)pStop();pStop=animate(900,p=>drawPun(p),()=>{pStop=null});resetFam()}
  $('#m-gene').addEventListener('click',e=>{const b=e.target.closest('[data-gnp]');if(!b)return;const[w,v]=b.dataset.gnp.split(':');st[w]=v;setPun()});

  /* ---------- rolling pregnancies ---------- */
  const fam=$('#gnFam'),tal=$('#gnTally');let kids=[],T={cf:0,car:0,none:0,n:0},fStop=null;
  const roll=()=>{const a=GN_AL[st.a][Math.random()<.5?0:1],b=GN_AL[st.b][Math.random()<.5?0:1];const v=(a==='v')+(b==='v');return v===2?'cf':v===1?'car':'none'};
  function drawFam(p){const N=vb(fam,'720 150','400 200'),O=odds();let s='';
    const kx=N?[60,150,240,330]:[50,130,210,290],ky=N?48:58;
    kx.forEach((x,j)=>{const k=kids[j],vis=k&&p*4>j;
      if(!vis){s+=`<circle cx="${x}" cy="${ky}" r="16" style="fill:none;stroke:var(--line);stroke-width:1.5;stroke-dasharray:4 3"/><text x="${x}" y="${ky+5}" class="t-sm t-mid">?</text>`}
      else s+=ped(x,ky,k.sex,k.o==='cf'?1:k.o==='car'?.5:0,{r:16});
      s+=`<text x="${x}" y="${ky+34}" class="t-xs t-mid" style="fill:var(--ink)">${vis?{cf:'CF',car:'carrier',none:'neither'}[k.o]:'pregnancy '+(j+1)}</text>`});
    /* the running tally against the expected odds */
    const bx=N?20:390,by=N?120:40,bw=N?360:310;
    s+=`<text x="${bx}" y="${by-8}" class="t-sm" style="fill:var(--ink)">${T.n?'all rolls so far: '+T.n+' pregnancies':'roll to start a tally'}</text>`;
    const parts=[['cf','var(--variant)',1],['car','var(--variant)',.4],['none','var(--line)',1]];
    let x=bx;[0,1].forEach(r=>{const yy=by+r*36,src=r===0?(T.n?{cf:T.cf/T.n,car:T.car/T.n,none:T.none/T.n}:null):O;x=bx;
      s+=`<text x="${bx}" y="${yy+30}" class="t-xs">${r===0?'observed':'expected odds'}</text>`;
      if(!src){s+=`<rect x="${bx}" y="${yy+4}" width="${bw}" height="14" rx="4" style="fill:var(--panel-2)"/>`;return}
      parts.forEach(([k,c,op])=>{const w=bw*src[k];if(w>0)s+=`<rect x="${f1(x)}" y="${yy+4}" width="${f1(w)}" height="14" style="fill:${c};opacity:${op}"/>`;if(w>26)s+=`<text x="${f1(x+w/2)}" y="${yy+15}" class="t-xs t-mid" style="fill:${k==='cf'?'var(--panel)':'var(--ink)'}">${Math.round(src[k]*100)}%</text>`;x+=w})});
    fam.innerHTML=s;
    tal.innerHTML=T.n?`Rolled <b>${T.n}</b>: CF <b>${T.cf}</b> · carrier <b>${T.car}</b> · neither <b>${T.none}</b>`:''}
  function add(n){const r=[];for(let i=0;i<n;i++){const o=roll();T[o]++;T.n++;r.push({o,sex:Math.random()<.5?'m':'f'})}return r}
  function resetFam(){if(fStop)fStop();fStop=null;kids=[];T={cf:0,car:0,none:0,n:0};drawFam(1)}
  $('#gnRoll').addEventListener('click',()=>{kids=add(4);if(fStop)fStop();fStop=animate(1400,p=>drawFam(p),()=>{fStop=null})});
  $('#gnRoll100').addEventListener('click',()=>{const r=add(100);kids=r.slice(-4);drawFam(1)});
  $('#gnRollReset').addEventListener('click',resetFam);
  writeOut();drawPun(1);drawFam(1);

  /* ---------- measured carrier frequencies ---------- */
  const fq=$('#gnFreq'),fcap=$('#gnFreqCap');let fk='lab',fqStop=null;
  function drawFq(p){const N=vb(fq,'720 330','400 520'),D=GN_FREQ[fk],R=D.rows,mx=4.5;
    const L=N?{bx:12,bw:300,y0:44,rh:64}:{bx:290,bw:330,y0:40,rh:38};
    const X=v=>L.bx+L.bw*v/mx;
    let s=`<text x="${N?12:L.bx}" y="16" class="t-xs">people carrying one CFTR variant, %</text>`;
    [0,1,2,3,4].forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-6}" y2="${L.y0+R.length*L.rh-8}" class="grid"/><text x="${f1(x)}" y="${L.y0+R.length*L.rh+6}" class="t-xs t-mid">${v}%</text>`});
    const rx=X(4.0972);s+=`<line x1="${f1(rx)}" x2="${f1(rx)}" y1="${L.y0-10}" y2="${L.y0+R.length*L.rh+8}" style="stroke:var(--variant);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${f1(rx-4)}" y="${L.y0+R.length*L.rh+20}" class="t-xs t-end" style="fill:var(--ink)">dashed: highest US subgroup in gnomAD, ≈1 in 24</text>`;
    R.forEach((r,j)=>{const y=L.y0+j*L.rh,v=r[1]*ease(clamp(p*1.25-j*.05)),w=X(v)-L.bx;
      if(N)s+=`<text x="12" y="${y+8}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><text x="388" y="${y+8}" class="t-xs t-end">${r[3]}</text>`;
      else s+=`<text x="${L.bx-10}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink)">${r[0]}</text><text x="${L.bx-10}" y="${y+24}" class="t-xs t-end">${r[3]}</text>`;
      const yb=N?y+16:y+2;
      s+=`<rect x="${L.bx}" y="${yb}" width="${f1(Math.max(0,w))}" height="16" rx="4" style="fill:${fk==='wgs'?'var(--dx)':'var(--brand)'};opacity:.85"/><text x="${f1(L.bx+w+6)}" y="${yb+12}" class="t-sm" style="fill:var(--ink);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px">${p>.6?r[2]:''}</text>`});
    fq.innerHTML=s}
  function setFq(k){fk=k;$$('[data-gnf]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gnf===k));fcap.innerHTML=GN_FREQ[k].cap;if(fqStop)fqStop();fqStop=animate(900,drawFq,()=>{fqStop=null})}
  $$('[data-gnf]').forEach(b=>b.addEventListener('click',()=>setFq(b.dataset.gnf)));
  fcap.innerHTML=GN_FREQ.lab.cap;drawFq(1);

  /* ---------- pedigree ---------- */
  const pd=$('#gnPed'),cb=$('#gnCascade');let casc=false;
  function drawPed(){const N=vb(pd,'720 320','400 430');
    const P=N?{y:[56,176,296],gp:[66,126,274,334],aunt:46,fa:156,mo:244,unc:354,kids:[140,180,220,260],r:12,gx:14}
             :{y:[50,150,250],gp:[190,270,450,530],aunt:150,fa:310,mo:410,unc:570,kids:[255,325,395,465],r:13,gx:30};
    const r=P.r,[y1,y2,y3]=P.y;let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    const ln=d=>`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    ['I','II','III'].forEach((g,j)=>{s+=`<text x="${P.gx}" y="${P.y[j]+4}" class="t-sm" style="fill:var(--ink);font-weight:700">${g}</text>`});
    /* generation I couples and their children */
    const pm=(P.gp[0]+P.gp[1])/2,mm=(P.gp[2]+P.gp[3])/2;
    s+=ln(`M${P.gp[0]+r} ${y1}H${P.gp[1]-r}M${P.gp[2]+r} ${y1}H${P.gp[3]-r}`);
    s+=ln(`M${pm} ${y1}V${y2-34}M${P.aunt} ${y2-34}H${P.fa}M${P.aunt} ${y2-34}V${y2-r}M${P.fa} ${y2-34}V${y2-r}`);
    s+=ln(`M${mm} ${y1}V${y2-34}M${P.mo} ${y2-34}H${P.unc}M${P.mo} ${y2-34}V${y2-r}M${P.unc} ${y2-34}V${y2-r}`);
    /* the parents and their children */
    const cm=(P.fa+P.mo)/2;
    s+=ln(`M${P.fa+r} ${y2}H${P.mo-r}M${cm} ${y2}V${y3-34}M${P.kids[0]} ${y3-34}H${P.kids[3]}`);
    P.kids.forEach(x=>{s+=ln(`M${x} ${y3-34}V${y3-r}`)});
    s+=ped(P.gp[0],y1,'m',.5,{r})+ped(P.gp[1],y1,'f',0,{r})+ped(P.gp[2],y1,'m',0,{r})+ped(P.gp[3],y1,'f',0,{r});
    s+=`<text x="${mm}" y="${y1+r+13}" class="t-xs t-mid">neither tested</text>`;
    s+=ped(P.aunt,y2,'f',0,{r})+ped(P.fa,y2,'m',.5,{r})+ped(P.mo,y2,'f',.5,{r})+ped(P.unc,y2,'m',0,{r});
    s+=`<text x="${P.aunt}" y="${y2+r+13}" class="t-xs t-mid">not tested</text><text x="${P.unc}" y="${y2+r+13}" class="t-xs t-mid">not tested</text>`;
    s+=`<text x="${P.fa}" y="${y2+r+13}" class="t-xs t-mid" style="fill:var(--ink)">carrier</text><text x="${P.mo}" y="${y2+r+13}" class="t-xs t-mid" style="fill:var(--ink)">carrier</text>`;
    const K=[['m',1,'CF'],['f',.5,'carrier'],['m',0,'neither'],['f',.5,'carrier']];
    P.kids.forEach((x,j)=>{s+=ped(x,y3,K[j][0],K[j][1],{r,proband:j===0});s+=`<text x="${x}" y="${y3+r+(N?(j%2?24:13):13)}" class="t-xs t-mid" style="fill:var(--ink)">${K[j][2]}</text>`});
    s+=`<text x="${P.gp[0]}" y="${y1+r+13}" class="t-xs t-mid" style="fill:var(--ink)">carrier</text>`;
    if(casc){[[P.aunt,y2],[P.unc,y2],[P.gp[2],y1],[P.gp[3],y1]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="${r+8}" style="fill:none;stroke:var(--dx);stroke-width:2;stroke-dasharray:4 3"/>`});
      s+=`<text x="${N?200:640}" y="${N?y3+60:y2-30}" class="t-sm ${N?'t-mid':'t-mid'}" style="fill:var(--dx);font-weight:700">ringed: may be offered</text><text x="${N?200:640}" y="${N?y3+74:y2-16}" class="t-sm t-mid" style="fill:var(--dx);font-weight:700">carrier testing</text>`}
    const ly=N?400:312,lx=N?14:30;
    s+=`<g transform="translate(${lx} ${ly-8})">${ped(6,0,'m',0,{r:6})}<text x="16" y="4" class="t-xs">male</text>${ped(62,0,'f',0,{r:6})}<text x="72" y="4" class="t-xs">female</text>${ped(124,0,'m',.5,{r:6})}<text x="134" y="4" class="t-xs">carrier</text>${ped(192,0,'m',1,{r:6})}<text x="202" y="4" class="t-xs">has CF</text>${N?'':'<text x="262" y="4" class="t-xs">arrow: the first person diagnosed (proband)</text>'}</g>`;
    pd.innerHTML=s}
  cb.addEventListener('click',()=>{casc=!casc;cb.setAttribute('aria-pressed',casc);drawPed()});
  drawPed();
  redraws.gene=(f=>()=>{f&&f();drawPun(1);drawFam(1);drawFq(1);drawPed()})(redraws.gene);
};
