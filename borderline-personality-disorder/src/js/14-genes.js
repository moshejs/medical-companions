/* =============== 1.4 Genes & families =============== */
/* ---- twin view: three estimates of the variance split ---- */
const GE_EST=[
 {n:'Torgersen 2000',m:'92 MZ + 129 DZ pairs · interview (SCID-II)',A:69,C:0,E:31},
 {n:'Distel 2008',m:'5,496 twins · 3 countries · self-report',A:42,C:0,E:58},
 {n:'Skoglund 2021',m:'1,851,755 Swedes · diagnosed BPD · register',A:46,C:0,E:54}];
const GE_DOTS=[['Torgersen 2008',35],['Distel 2008',42],['Skoglund 2021',46],['Distel 2010',51],['Kendler 2011',60],['Torgersen 2000',69]];
const GE_TW=[
 {from:0,at:.07,k:'Twin designs',t:'Two kinds of twins',
  txt:`Identical (monozygotic, MZ) twins share all their genes; non-identical (dizygotic, DZ) twins share about half, like other full siblings. Both kinds usually grow up together. If identical twins are more alike for a trait than non-identical twins, genes are part of the reason. In the drawings, a bar joins each identical pair. [[Skoglund2021]]`,
  pt:`Twins let researchers compare people who share all their genes with people who share half, while their homes are similar.`,
  hook:`MZ twins share 100% of their genes, DZ twins about 50%: the gap in their similarity is what twin models use.`},
 {from:.15,at:.27,k:'E-Risk · age 12',t:'Concordance',
  txt:`In the E-Risk birth cohort (1,116 same-sex twin pairs), the chance that a co-twin also had an extreme borderline-related score at 12, when one twin did, was 52% in identical and 7% in non-identical pairs. The twin correlations for the score were 0.66 and 0.29. The drawing shows 14 pairs of each kind with the first twin affected; watch the co-twins fill in. [[Belsky2012]]`,
  pt:`When one identical twin had many borderline traits, the other often did too. With non-identical twins this was rare.`,
  hook:`E-Risk probandwise concordance for extreme borderline scores at 12: MZ 52% vs DZ 7%; correlations 0.66 vs 0.29. [[Belsky2012]]`},
 {from:.32,at:.42,k:'Norway · 2000',t:'Torgersen 2000: 69%',
  txt:`The first interview-based twin study of all personality disorders (92 MZ and 129 DZ pairs, SCID-II) gave borderline PD a heritability of .69 in the best-fitting model. Shared family environment never entered the best models, although the authors could not rule out shared familial effects. The sample was moderate, so the estimate is uncertain. <span class="ev early">Early evidence</span> [[Torgersen2000]]`,
  pt:`In this small, careful study, about two-thirds of the differences between people in BPD traits were linked to genes.`,
  hook:`Torgersen 2000: h² = .69 for BPD (personality disorders overall .60). [[Torgersen2000]]`},
 {from:.5,at:.58,k:'3 countries · 2008',t:'Distel 2008: 42%',
  txt:`In 5,496 twins from the Netherlands, Belgium and Australia who filled in a mailed questionnaire, additive genes explained 42% of the variation in BPD features, similarly in men and women and in all three countries. Unique environment explained the other 58%. Women scored higher than men, and younger adults higher than older adults. <span class="ev est">Established</span> [[Distel2008]]`,
  pt:`A much bigger study using questionnaires found genes explain a bit under half. The rest came from experiences that differ even between siblings.`,
  hook:`Distel 2008: A = 42%, E = 58%, no shared-environment component. [[Distel2008]]`},
 {from:.66,at:.74,k:'Sweden · 2021',t:'Skoglund 2021: 46%',
  txt:`A total-population register study followed 1,851,755 people born 1973–1993; 11,665 (0.6%) received a clinical BPD diagnosis. Heritability of diagnosed BPD was 46% (95% CI 39–53), with no shared-environment component; the rest was individually unique environment. Identical co-twins of a person with BPD had a hazard ratio of 11.5, non-identical co-twins 7.4. Switch to <b>Family &amp; register study</b> for the other relatives. <span class="ev est">Established</span> [[Skoglund2021]]`,
  pt:`Using real diagnoses in a whole country, genes explained a little under half, the same range as the twin questionnaires.`,
  hook:`Swedish register: h² of diagnosed BPD = 46%; full-sibling hazard ratio 4.7. [[Skoglund2021]]`},
 {from:.82,at:.92,k:'Reading the numbers',t:'What heritability is not',
  txt:`Heritability describes a population, not a person. Common variants measured by genome-wide studies explain about 17% (SNP heritability), roughly a third of the twin and family figure, a ratio typical of psychiatric disorders. In adult Norwegian twins, genes explained 72% of the 10-year stability of BPD traits, while unique environmental effects were mostly transient and the main source of change. And "unique environment" includes experiences such as abuse that siblings do not share. [[Streit2026,Streit2025medRxiv,ReichbornKjennerud2015]]`,
  pt:`“46% heritable” does not mean 46% of your BPD came from genes, or that your child has a 46% chance. It describes how much of the variation between people in a group lines up with genes.`,
  hook:`Most non-genetic variance in BPD is unique (non-shared) environment, not shared family environment. [[Distel2008,Skoglund2021]]`}];
/* ---- family view: relatives in a three-generation pedigree ---- */
const GE_REL=[
 {id:'mz',n:'identical co-twin',g:'100%',hr:11.5,lo:1.6,hi:83.8},
 {id:'dz',n:'non-identical co-twin',g:'50%',hr:7.4,lo:1,hi:55.3},
 {id:'sib',n:'full sibling',g:'50%',hr:4.7,lo:3.9,hi:5.6},
 {id:'mh',n:'maternal half-sibling',g:'25%',hr:2.1,lo:1.5,hi:3},
 {id:'cou',n:'cousin',g:'12.5%',hr:1.7,lo:1.4,hi:2},
 {id:'ph',n:'paternal half-sibling',g:'25%',hr:1.3,lo:.9,hi:2.1}];
const GE_FM=[
 {from:0,at:.07,k:'Swedish register',t:'One person with BPD',
  txt:`The proband (arrow) is a person with a clinical BPD diagnosis. In the Swedish total-population register of 1,851,755 people born 1973–1993, 11,665 (0.6%) received one between 1997 and 2013, and 85.4% of them were female. The question is how much more often their relatives are diagnosed than people in general. [[Skoglund2021]]`,
  pt:`Researchers start from one person with BPD and ask: how often do their relatives also have it?`,
  hook:`Familial risk is reported as a hazard ratio: how many times more often relatives are diagnosed than the general population.`},
 {from:.15,at:.24,k:'Co-twins',t:'Twins: 11.5 and 7.4',
  txt:`Adjusted hazard ratios: identical co-twin 11.5 (95% CI 1.6–83.8), non-identical co-twin 7.4 (1.0–55.3). Twins with a diagnosis are rare even in a whole country, so the intervals are very wide; the bars on the right are clipped. [[Skoglund2021]]`,
  pt:`The closer the genetic match, the higher the risk, but even an identical twin’s risk is far from certain.`,
  hook:`Wide CIs for twins (MZ 1.6–83.8): few twin pairs, so treat these as rough. [[Skoglund2021]]`},
 {from:.32,at:.41,k:'Siblings',t:'Full siblings: 4.7',
  txt:`Full siblings had a hazard ratio of 4.7 (3.9–5.6), a much more precise estimate. In the McLean family study, where 885 siblings and parents were all interviewed directly, BPD was found in 14.1% of relatives of people with BPD versus 4.9% of relatives of people without it (risk ratio 2.9, 95% CI 1.5–5.5). All four sectors of BPD (affective, interpersonal, behavioural, cognitive) ran in families, the affective and interpersonal ones most strongly. [[Skoglund2021,Gunderson2011Family]]`,
  pt:`A brother or sister of someone with BPD is more likely to have it too, but most do not: about 86 in 100 relatives in the McLean study did not.`,
  hook:`McLean family study: BPD in 14.1% vs 4.9% of relatives; risk ratio 2.9. [[Gunderson2011Family]]`},
 {from:.5,at:.59,k:'Half-siblings',t:'Half-siblings: 2.1 and 1.3',
  txt:`Half-siblings share about a quarter of their genes. The hazard ratio was 2.1 (1.5–3.0) for maternal half-siblings and 1.3 (0.9–2.1) for paternal half-siblings; the paternal interval crosses 1, so it is compatible with no raised risk. [[Skoglund2021]]`,
  pt:`Half-brothers and half-sisters have a smaller raise in risk than full siblings.`,
  hook:`Familial risk falls with genetic relatedness: MZ 11.5 → full sib 4.7 → maternal half-sib 2.1. [[Skoglund2021]]`},
 {from:.66,at:.75,k:'Cousins',t:'Cousins: 1.7',
  txt:`Cousins whose parents were full siblings had a hazard ratio of 1.7 (1.4–2.0). The study reported no parent–offspring pairs, because it followed people born 1973–1993, so the pedigree leaves the parents without a number. [[Skoglund2021]]`,
  pt:`Cousins share about an eighth of their genes, and their risk is only a little higher than average.`,
  hook:`No parent risk in Skoglund 2021: the cohort design had no parent–child pairs. [[Skoglund2021]]`},
 {from:.82,at:.92,k:'Putting it together',t:'Genes, not destiny',
  txt:`The gradient from twins to cousins, together with twin models, gives heritability of 46% for diagnosed BPD, with no shared-environment component. Both numbers describe groups. Most relatives, even siblings, do not develop BPD, and a family history is not a forecast. BPD also aggregates with ADHD in families (full sibling with ADHD: adjusted OR 2.8 for BPD). [[Skoglund2021,Gunderson2011Family,KujaHalkola2021]]`,
  pt:`BPD runs in families partly through genes, but most relatives never develop it. Knowing the family history can help people notice early signs and get support.`,
  hook:`First-degree relatives: higher risk, still a minority affected (14.1%). [[Gunderson2011Family]]`}];

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT'),stEl=$('#geSteps');let mode='twin';
  const STEPS=()=>mode==='twin'?GE_TW:GE_FM;
  /* own stepper so the labels can change with the design */
  function wireSteps(){const S=STEPS();stEl.innerHTML=S.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('')}
  stEl.setAttribute('role','group');stEl.setAttribute('aria-label','%t:player.steps%');
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=STEPS()[+b.dataset.st];rg.value=s.at;draw(s.at)});
  function setSt(i){$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const s=STEPS()[i];if(s)rg.setAttribute('aria-valuetext',`Step ${i+1} of ${STEPS().length}: ${s.t}`)}

  /* variance split at time t */
  function split(t){const k=[[.32,0],[.5,1],[.66,2]];let i=-1;k.forEach(([a,j])=>{if(t>=a)i=j});
    if(i<0)return null;const cur=GE_EST[i],prev=GE_EST[Math.max(0,i-1)],m=i===0?1:ease(ramp(t,k[i][0],k[i][0]+.06));
    return {A:lerp(prev.A,cur.A,m),C:0,E:lerp(prev.E,cur.E,m),est:cur}}
  function twinPairs(x0,y0,cols,n,kind,conc,show,pw,ph){let s='';
    for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols),cx=x0+c*pw+pw/2,y=y0+r*ph,sex=i%3===2?'m':'f';
      const op=clamp(show*n-i,0,1);if(op<=0)continue;
      const a=cx-11,b=cx+11;s+=`<g style="opacity:${f1(op)}">`;
      s+=`<path d="M${f1(cx)} ${y-20}L${f1(a)} ${y-9}M${f1(cx)} ${y-20}L${f1(b)} ${y-9}" style="stroke:var(--ink);stroke-width:1.2;fill:none"/>`;
      if(kind==='mz')s+=`<line x1="${f1(cx-5.5)}" x2="${f1(cx+5.5)}" y1="${y-14.5}" y2="${y-14.5}" style="stroke:var(--ink);stroke-width:1.2"/>`;
      const cc=clamp(conc-i,0,1);
      s+=ped(a,y,sex,1,{r:8});s+=ped(b,y,sex,0,{r:8});
      if(cc>0)s+=(sex==='m'?`<rect x="${f1(b-8)}" y="${f1(y-8)}" width="16" height="16" rx="1.5"`:`<circle cx="${f1(b)}" cy="${y}" r="8"`)+` style="fill:var(--storm);opacity:${f1(cc)};stroke:var(--ink);stroke-width:1.5"/>`;
      s+='</g>'}
    return s}
  function drawTwin(t,N){let s='';const p=phaseOf(GE_TW,t);
    /* twin pairs */
    const L=N?{x0:12,y0:66,cols:7,pw:53,ph:44,gap:136,bx:20,by:340,bw:360,dy:500,cy:600}:{x0:16,y0:70,cols:7,pw:52,ph:46,gap:146,bx:410,by:70,bw:290,dy:216,cy:340};
    const show=ramp(t,0,.1),fill=ramp(t,.16,.28);
    const mzc=7*fill,dzc=1*ramp(fill,.5,1);
    s+=`<text x="${L.x0+4}" y="${L.y0-44}" class="t-sm" style="fill:var(--ink);font-weight:600">Identical (MZ) pairs</text><text x="${L.x0+4}" y="${L.y0-30}" class="t-xs">${fill>0?`co-twin affected: <tspan style="fill:var(--storm);font-weight:700">${Math.round(mzc)} of 14</tspan> (study: 52%)`:'share ~100% of genes'}</text>`;
    s+=twinPairs(L.x0,L.y0,L.cols,14,'mz',mzc,show,L.pw,L.ph);
    const y2=L.y0+L.gap;
    s+=`<text x="${L.x0+4}" y="${y2-44}" class="t-sm" style="fill:var(--ink);font-weight:600">Non-identical (DZ) pairs</text><text x="${L.x0+4}" y="${y2-30}" class="t-xs">${fill>0?`co-twin affected: <tspan style="fill:var(--storm);font-weight:700">${Math.round(dzc)} of 14</tspan> (study: 7%)`:'share ~50% of genes'}</text>`;
    s+=twinPairs(L.x0,y2,L.cols,14,'dz',dzc,show,L.pw,L.ph);
    if(!N)s+=`<text x="${L.x0+4}" y="${y2+L.ph+30}" class="t-xs">Filled = extreme borderline-related score at 12 (E-Risk). Left twin of each pair affected.</text>`;
    /* variance bar */
    const sp=split(t),bx=L.bx,by=L.by,bw=L.bw;
    s+=`<text x="${bx}" y="${by-30}" class="t-sm" style="fill:var(--ink);font-weight:600">WHERE THE VARIATION COMES FROM</text>`;
    if(!sp){s+=`<rect x="${bx}" y="${by-16}" width="${bw}" height="34" rx="6" style="fill:var(--panel-2);stroke:var(--line);stroke-dasharray:4 3"/><text x="${bx+bw/2}" y="${by+5}" class="t-xs t-mid">estimates appear from step 3</text>`}
    else{const segs=[['A','additive genes',sp.A,'var(--mood)'],['C','shared environment',sp.C,'var(--gold)'],['E','unique environment',sp.E,'var(--calm)']];let x=bx;
      segs.forEach(([k,n,v,c])=>{const w=bw*v/100;if(w>0.5){s+=`<rect x="${f1(x)}" y="${by-16}" width="${f1(w)}" height="34" style="fill:${c};opacity:.85"/>`;
        if(w>34)s+=`<text x="${f1(x+w/2)}" y="${by+5}" class="t-lbl t-mid" style="fill:var(--bg)">${k} ${Math.round(v)}%</text>`}x+=w});
      s+=`<rect x="${bx}" y="${by-16}" width="${bw}" height="34" rx="2" style="fill:none;stroke:var(--line)"/>`;
      if(p===5){const w=bw*17.3/100;s+=`<rect x="${bx}" y="${by+20}" width="${f1(w)}" height="8" style="fill:var(--mood)"/><text x="${f1(bx+w+6)}" y="${by+28}" class="t-xs" style="fill:var(--mood)">common variants (GWAS): 17.3%</text>`}
      let lx=bx;segs.forEach(([k,n,v,c])=>{const nn={A:'genes',C:'shared env.',E:'unique env.'}[k];s+=`<rect x="${f1(lx)}" y="${by+(p===5?38:28)}" width="10" height="10" rx="2" style="fill:${c}"/><text x="${f1(lx+14)}" y="${by+(p===5?47:37)}" class="t-xs">${k} ${nn}</text>`;lx+=N?(k==='A'?88:k==='C'?126:0):(k==='A'?72:k==='C'?102:0)});
      s+=`<text x="${bx}" y="${by+(p===5?72:62)}" class="t-lbl" style="fill:var(--mood)">${sp.est.n}</text><text x="${bx}" y="${by+(p===5?88:78)}" class="t-xs">${sp.est.m}</text>`}
    /* heritability dot strip */
    const dy=L.dy,X=v=>bx+bw*v/80;
    s+=`<text x="${bx}" y="${dy-26}" class="t-sm" style="fill:var(--ink);font-weight:600">HERITABILITY BY STUDY</text>`;
    s+=`<line x1="${bx}" x2="${bx+bw}" y1="${dy}" y2="${dy}" class="axis"/>`;
    [0,20,40,60,80].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${dy-3}" y2="${dy+3}" class="axis"/><text x="${f1(X(v))}" y="${dy+16}" class="t-xs t-mid">${v}%</text>`);
    const shown=ramp(t,.32,.9)*GE_DOTS.length;
    GE_DOTS.forEach(([n,v],i)=>{const op=clamp(shown-i,0,1);if(op<=0)return;const on=sp&&sp.est.n===n,y=dy-10-(i%2)*0;
      s+=`<circle cx="${f1(X(v))}" cy="${dy}" r="${on?7:5}" style="fill:var(--mood);opacity:${f1(op*(on?1:.55))};stroke:var(--panel);stroke-width:1.5"/>`;
      if(on)s+=`<text x="${f1(X(v))}" y="${dy-12}" class="t-xs t-mid" style="fill:var(--mood);font-weight:700">${v}%</text>`});
    if(p===5){s+=`<path d="M${f1(X(17.3))} ${dy-7}l5 7l-5 7l-5 -7z" style="fill:var(--gold)"/><text x="${f1(X(17.3))}" y="${dy-12}" class="t-xs t-mid" style="fill:var(--gold)">SNP 17.3%</text>`}
    s+=`<text x="${bx}" y="${dy+34}" class="t-xs">${p===5?'dots: 6 twin/register studies · diamond: GWAS':'dots: six twin and register studies, 35–69%'}</text>`;
    /* concordance mini bars */
    if(fill>0){const cy=L.cy,cx=bx,cw=bw*.8;
      s+=`<text x="${cx}" y="${cy-18}" class="t-sm" style="fill:var(--ink);font-weight:600">PROBANDWISE CONCORDANCE, AGE 12</text>`;
      [['MZ',52,'var(--storm)'],['DZ',7,'var(--other)']].forEach(([k,v,c],i)=>{const y=cy+i*20,w=cw*v/100*fill;
        s+=`<text x="${cx}" y="${y+9}" class="t-xs">${k}</text><rect x="${cx+26}" y="${y}" width="${f1(cw)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${cx+26}" y="${y}" width="${f1(w)}" height="11" rx="3" style="fill:${c}"/><text x="${f1(cx+32+cw)}" y="${y+9}" class="t-xs">${Math.round(v*fill)}%</text>`})}
    return s}
  function drawFam(t,N){let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;const p=phaseOf(GE_FM,t);
    const sc=N?.84:1,ox=N?6:12,oy=N?16:10,P=(x,y)=>[ox+x*sc,oy+y*sc];
    const vis={mz:ramp(t,.15,.2),dz:ramp(t,.15,.2),sib:ramp(t,.32,.37),mh:ramp(t,.5,.55),ph:ramp(t,.5,.55),cou:ramp(t,.66,.71)};
    const ln=(a,b,c,d,o=1)=>{const A=P(a,b),B=P(c,d);return `<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(B[0])}" y2="${f1(B[1])}" style="stroke:var(--ink);stroke-width:1.3;opacity:${f1(o)}"/>`};
    const pd=(x,y,sex,aff,o={})=>{const q=P(x,y);return `<g style="opacity:${f1(o.op==null?1:o.op)}">`+ped(q[0],q[1],sex,aff,{r:11*sc,proband:o.proband})+'</g>'};
    const lab=(x,y,txt,col,o=1,bold)=>{const q=P(x,y);return `<text x="${f1(q[0])}" y="${f1(q[1])}" class="t-xs t-mid" style="fill:${col||'var(--muted)'};opacity:${f1(o)}${bold?';font-weight:700':''}">${txt}</text>`};
    /* generation labels */
    if(!N)[['I',60],['II',170],['III',290]].forEach(([g,y])=>{const q=P(0,y+4);s+=`<text x="${f1(q[0])}" y="${f1(q[1])}" class="t-xs">${g}</text>`});
    /* gen I: grandparents */
    s+=ln(277,60,313,60)+pd(265,60,'m',0)+pd(325,60,'f',0)+ln(295,60,295,120)+ln(210,120,380,120)+ln(210,120,210,159)+ln(380,120,380,159);
    s+=lab(200,64,'grandparents');
    /* gen II */
    s+=ln(20,170,90,170,vis.ph)+pd(20,170,'f',0,{op:vis.ph})+ln(90,170,210,170)+pd(90,170,'m',0)+pd(210,170,'f',0)+ln(210,170,300,170,vis.mh)+pd(300,170,'m',0,{op:vis.mh})+ln(380,170,440,170,vis.cou)+pd(380,170,'f',0)+pd(440,170,'m',0,{op:vis.cou});
    s+=lab(90,198,'father')+lab(210,198,'mother')+lab(380,198,'aunt');
    if(p>=4){const q=P(150,213);s+=`<rect x="${f1(q[0]-82*sc)}" y="${f1(q[1]-10*sc)}" width="${f1(164*sc)}" height="${f1(14*sc)}" rx="3" style="fill:var(--panel);opacity:${f1(ramp(t,.68,.74))}"/>`+lab(150,213,'parents: no register estimate','var(--gold)',ramp(t,.68,.74))}
    /* gen III sibships */
    s+=ln(55,170,55,240,vis.ph)+ln(55,240,40,279,vis.ph);
    s+=ln(150,170,150,240)+ln(132,240,215,240)+ln(215,240,215,279,vis.sib)+ln(132,240,132,250)+ln(132,250,105,279)+ln(132,250,160,279,vis.mz);
    s+=ln(255,170,255,240,vis.mh)+ln(255,240,285,279,vis.mh)+ln(410,170,410,279,vis.cou);
    if(vis.mz>0){const a=P(118,265),b=P(146,265);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--ink);stroke-width:1.3;opacity:${f1(vis.mz)}"/>`}
    s+=pd(105,290,'f',1,{proband:true});
    s+=pd(160,290,'f',0,{op:vis.mz})+pd(215,290,'m',0,{op:vis.sib})+pd(40,290,'m',0,{op:vis.ph})+pd(285,290,'f',0,{op:vis.mh})+pd(410,290,'f',0,{op:vis.cou});
    if(N){s+=lab(105,326,'BPD','var(--storm)',1,true);
      const hn=(x,id,l,v)=>{const o=vis[id];return lab(x,326,l,'var(--ink)',o)+lab(x,344,v,'var(--storm)',o,true)};
      s+=hn(40,'ph','pat.½','1.3')+hn(160,'mz','twin','11.5/7.4')+hn(215,'sib','sib','4.7')+hn(285,'mh','mat.½','2.1')+hn(410,'cou','cousin','1.7')}
    else{s+=lab(105,322,'person','var(--storm)',1,true)+lab(105,335,'with BPD','var(--storm)',1,true);
    const hr=(x,id,l1,l2)=>{const r=GE_REL.find(q=>q.id===id),o=vis[id];return lab(x,322,l1,'var(--ink)',o)+lab(x,335,l2,'var(--muted)',o)+lab(x,350,'HR '+r.hr,'var(--storm)',o,true)};
    s+=hr(160,'mz','co-twin','MZ / DZ').replace('HR 11.5','11.5 / 7.4')+hr(215,'sib','full','sibling')+hr(40,'ph','paternal','half-sib')+hr(285,'mh','maternal','half-sib')+hr(410,'cou','cousin','')}
    /* bar chart */
    const C=N?{x:110,y:420,w:250,h:30}:{x:572,y:60,w:130,h:40};
    const Xb=v=>C.x+C.w*clamp(v,0,13)/13;
    s+=`<text x="${N?20:C.x-96}" y="${C.y-24}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'HAZARD RATIO BY RELATEDNESS':'HAZARD RATIO'}</text>`;
    [0,1,5,10].forEach(v=>{s+=`<line x1="${f1(Xb(v))}" x2="${f1(Xb(v))}" y1="${C.y-8}" y2="${C.y+GE_REL.length*C.h}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--muted);stroke-dasharray:4 3':''}"/><text x="${f1(Xb(v))}" y="${f1(C.y+GE_REL.length*C.h+14)}" class="t-xs t-mid">${v}</text>`});
    GE_REL.forEach((r,i)=>{const o=vis[r.id],y=C.y+i*C.h+C.h/2;if(o<=0)return;
      s+=`<g style="opacity:${f1(o)}"><text x="${C.x-6}" y="${f1(y-(N?0:4))}" class="t-xs t-end" style="fill:var(--ink)">${N?r.n.replace('non-identical','DZ').replace('identical','MZ').replace('maternal half-sibling','mat. half-sib').replace('paternal half-sibling','pat. half-sib'):r.n.split(' ').slice(-1)[0].replace('co-twin',r.id==='mz'?'MZ twin':'DZ twin').replace('half-sibling',r.id==='mh'?'mat. half-sib':'pat. half-sib')}</text>`;
      if(!N)s+=`<text x="${C.x-6}" y="${f1(y+8)}" class="t-xs t-end">${r.g} genes</text>`;
      const w=Xb(r.hr*o)-C.x;s+=`<rect x="${C.x}" y="${f1(y-6)}" width="${f1(Math.max(0,w))}" height="12" rx="3" style="fill:var(--storm);opacity:.8"/>`;
      s+=`<line x1="${f1(Xb(r.lo))}" x2="${f1(Xb(r.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:1.3"/>`;
      if(r.hi>13)s+=`<path d="M${f1(Xb(13)-2)} ${f1(y-4)}l5 4l-5 4" style="fill:none;stroke:var(--ink);stroke-width:1.3"/>`;
      s+=`<text x="${f1(Math.min(Xb(r.hr)+6,C.x+C.w-2))}" y="${f1(y-8)}" class="t-xs" style="fill:var(--storm);font-weight:700">${r.hr}</text>`;
      s+='</g>'});
    s+=`<text x="${N?20:C.x-96}" y="${f1(C.y+GE_REL.length*C.h+32)}" class="t-xs">bar = adjusted HR, line = 95% CI</text>`;
    if(p>=2){const q=N?[20,C.y+GE_REL.length*C.h+56]:[24,392];
      s+=N?`<text x="${q[0]}" y="${q[1]}" class="t-xs" style="fill:var(--ink)">McLean family study: BPD in <tspan style="fill:var(--storm);font-weight:700">14.1%</tspan> of</text><text x="${q[0]}" y="${q[1]+16}" class="t-xs" style="fill:var(--ink)">relatives of people with BPD vs <tspan style="font-weight:700">4.9%</tspan> of others</text>`
        :`<text x="${q[0]}" y="${q[1]}" class="t-xs" style="fill:var(--ink)">McLean family study: BPD in <tspan style="fill:var(--storm);font-weight:700">14.1%</tspan> of relatives of people with BPD vs <tspan style="font-weight:700">4.9%</tspan> of other relatives</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 420',mode==='twin'?'400 660':'400 700');
    svg.innerHTML=mode==='twin'?drawTwin(t,N):drawFam(t,N);
    const S=STEPS(),p=phaseOf(S,t);setSt(p);
    $('#geNote').innerHTML=noteHTML(S[p]);
    const sp=split(t);
    $('#geRead').innerHTML=mode==='twin'?(sp?`<span>study <b>${sp.est.n}</b></span><span>genes <b>${Math.round(sp.A)}%</b></span><span>shared env. <b>0%</b></span><span>unique env. <b>${Math.round(sp.E)}%</b></span>`:`<span>E-Risk concordance <b>MZ 52% · DZ 7%</b></span><span>twin correlations <b>0.66 · 0.29</b></span>`)
      :`<span>relatives shown <b>${GE_REL.filter(r=>t>=({mz:.15,dz:.15,sib:.32,mh:.5,ph:.5,cou:.66})[r.id]).length} of 6</b></span><span>heritability of diagnosed BPD <b>46%</b></span>`;
  }
  $('#geCap').innerHTML=`<b>Schematic pairs and pedigree.</b> Figures are drawn to show published proportions and hazard ratios; they are not real families. Heritability and hazard ratios are population statistics. [[Belsky2012,Skoglund2021]]`;
  const stop=playWire(rg,$('#gePlay'),draw,20000,'%t:player.replay%','genes');
  $$('[data-gemode]').forEach(b=>b.addEventListener('click',()=>{if(mode===b.dataset.gemode)return;mode=b.dataset.gemode;stop();
    $$('[data-gemode]').forEach(x=>x.setAttribute('aria-pressed',x===b));wireSteps();
    const s0=STEPS()[mode==='twin'?1:1];rg.value=s0.at;draw(s0.at)}));
  wireSteps();draw(+rg.value);

  /* ---------- polygenic liability ---------- */
  const ps=$('#gePgs'),pr=$('#geR'),RMAX=.46,PREV=.017;
  const erf=x=>{const s=Math.sign(x);x=Math.abs(x);const t=1/(1+.3275911*x);return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x))};
  const Phi=z=>.5*(1+erf(z/Math.SQRT2));
  const zT=(()=>{let lo=0,hi=5;for(let i=0;i<60;i++){const m=(lo+hi)/2;if(1-Phi(m)>PREV)lo=m;else hi=m}return(lo+hi)/2})();
  const phi=(z,m=0,sd=1)=>Math.exp(-.5*((z-m)/sd)**2)/(sd*Math.sqrt(2*Math.PI));
  function drawP(){const N=vb(ps,'720 396','400 425'),u=+pr.value,R2=u*RMAX,mu=1.755*Math.sqrt(R2),sd=Math.sqrt(1-R2);
    const top=1-Phi((zT-mu)/sd),bot=1-Phi((zT+mu)/sd),ratio=bot>0?top/bot:1;
    const G=N?{x:20,y:120,w:360,h:200}:{x:30,y:96,w:660,h:200};
    const X=z=>G.x+G.w*(z+4)/8,Y=v=>G.y+G.h-G.h*v/.5;
    let s='';
    /* variant ticks strip */
    const nt=Math.round(u*(N?150:280)),rr=rng(7);s+=`<text x="${G.x}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">COMMON VARIANTS IN THE SCORE</text>`;
    for(let i=0;i<nt;i++){const x=G.x+rr()*G.w,y=(N?50:34)+rr()*28;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+6)}" style="stroke:var(--mood);stroke-width:1;opacity:.6"/>`}
    s+=N?`<text x="${G.x}" y="38" class="t-xs">each tick = many tiny-effect variants</text>`:`<text x="${G.x+G.w}" y="22" class="t-xs t-end">each tick stands for many tiny-effect variants</text>`;
    /* curves */
    const path=(m,sd2,k)=>{let d='';for(let i=0;i<=160;i++){const z=-4+8*i/160;d+=(i?'L':'M')+f1(X(z))+' '+f1(Y(phi(z,m,sd2)*k))}return d};
    s+=`<rect x="${f1(X(zT))}" y="${G.y}" width="${f1(G.x+G.w-X(zT))}" height="${G.h}" style="fill:var(--storm-soft);opacity:.6"/>`;
    s+=`<path d="${path(0,1,1)}L${f1(X(4))} ${f1(Y(0))}L${f1(X(-4))} ${f1(Y(0))}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`;
    s+=`<path d="${path(-mu,sd,.55)}" style="fill:none;stroke:var(--calm);stroke-width:2.4"/>`;
    s+=`<path d="${path(mu,sd,.55)}" style="fill:none;stroke:var(--storm);stroke-width:2.4"/>`;
    s+=`<line x1="${f1(X(zT))}" x2="${f1(X(zT))}" y1="${G.y-6}" y2="${G.y+G.h}" style="stroke:var(--storm);stroke-width:1.5;stroke-dasharray:5 4"/>`;
    s+=`<text x="${f1(X(zT)+4)}" y="${G.y+12}" class="t-xs" style="fill:var(--storm)">threshold</text><text x="${f1(X(zT)+4)}" y="${G.y+25}" class="t-xs" style="fill:var(--storm)">(≈1.7% above)</text>`;
    s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h}" y2="${G.y+G.h}" class="axis"/><text x="${G.x}" y="${G.y+G.h+16}" class="t-xs">lower liability</text><text x="${G.x+G.w}" y="${G.y+G.h+16}" class="t-xs t-end">higher liability</text>`;
    const lgY=G.y+G.h+(N?40:36);let lx=G.x;[['var(--muted)','everyone'],['var(--calm)',N?'bottom 10%':'bottom 10% of scores'],['var(--storm)',N?'top 10%':'top 10% of scores']].forEach(([c,n])=>{s+=`<rect x="${lx}" y="${lgY-8}" width="14" height="4" rx="2" style="fill:${c}"/><text x="${lx+18}" y="${lgY}" class="t-xs">${n}</text>`;lx+=n.length*(N?6.9:5.8)+(N?30:34)});
    /* scale of the slider */
    const sy=N?lgY+34:lgY+34,sx0=N?G.x+10:G.x+10,sw=N?G.w-20:G.w-20;
    {s+=`<line x1="${sx0}" x2="${sx0+sw}" y1="${sy}" y2="${sy}" class="axis"/>`;
      [['today 4.6%',.046,'var(--ink)'],['SNP h² 17.3%',.173,'var(--mood)'],['twin/register ~46%',.46,'var(--muted)']].forEach(([n,v,c],i)=>{const x=sx0+sw*v/RMAX;s+=`<circle cx="${f1(x)}" cy="${sy}" r="4" style="fill:${c}"/><text x="${f1(i===2?sx0+sw:i===0?Math.max(x-6,sx0-10):x)}" y="${sy+(i===1?-8:18)}" class="t-xs ${i===2?'t-end':i===0?'':'t-mid'}" style="fill:${c}">${n}</text>`});
      s+=`<circle cx="${f1(sx0+sw*u)}" cy="${sy}" r="6" style="fill:none;stroke:var(--storm);stroke-width:2"/>`}
    ps.innerHTML=s;
    const snp=R2>.173+1e-6;
    $('#gePgsRead').innerHTML=`<span>score explains <b>${(R2*100).toFixed(1)}%</b>${snp?' (beyond what common variants can reach)':''}</span><span>top 10% risk <b>${(top*100).toFixed(1)}%</b></span><span>bottom 10% <b>${(bot*100).toFixed(1)}%</b></span><span>ratio <b>×${ratio.toFixed(1)}</b></span><span>top 10% without BPD <b>${Math.round((1-top)*100)} in 100</b></span>`;
    pr.setAttribute('aria-valuetext',`${(R2*100).toFixed(1)}% of liability explained; top tenth risk ${(top*100).toFixed(1)}%`)}
  pr.addEventListener('input',drawP);drawP();

  /* ---------- genetic correlations ---------- */
  const gs=$('#geRg');let ver='2025',cur=null,stopA=null;
  const RG={'2017':[['Major depression',.57],['Schizophrenia',.34],['Bipolar disorder',.28]],
            '2025':[['PTSD',.77],['Depression',.74],['ADHD',.67],['Schizophrenia',.36],['Bipolar disorder',.35]]};
  const CAP={'2017':`First BPD GWAS (Witt 2017): 998 patients and 1,545 controls, no single genome-wide significant marker, but the first molecular evidence that BPD shares genetic risk with these disorders. [[Witt2017]]`,
             '2025':`Preprint of the 2026 GWAS: 12,339 cases. The published paper names PTSD, depression, ADHD, antisocial behaviour and suicide and self-harm measures as the strongest correlations. Separately, BPD correlated with neuroticism at r<sub>g</sub> = 0.34 (2022). [[Streit2025medRxiv,Streit2026,Streit2022]]`};
  function drawG(k){const N=vb(gs,'420 300','400 300'),L=RG[ver],x0=N?128:140,w=N?240:240;let s='';
    s+=`<text x="${x0}" y="22" class="t-xs">genetic correlation (r<tspan dy="3" style="font-size:7px">g</tspan><tspan dy="-3">)</tspan></text>`;
    [0,.25,.5,.75,1].forEach(v=>{const x=x0+w*v;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="34" y2="${36+5*44}" class="grid"/><text x="${f1(x)}" y="${36+5*44+14}" class="t-xs t-mid">${v}</text>`});
    L.forEach(([n,v],i)=>{const y=44+i*44,vv=v*k;s+=`<text x="${x0-8}" y="${y+16}" class="t-xs t-end" style="fill:var(--ink);font-size:11px">${n}</text><rect x="${x0}" y="${y+2}" width="${f1(w*vv)}" height="20" rx="4" style="fill:var(--mood);opacity:${f1(.45+v*.55)}"/><text x="${f1(x0+w*vv+6)}" y="${y+16}" class="t-xs" style="fill:var(--ink);font-weight:700">${vv.toFixed(2)}</text>`});
    gs.innerHTML=s;$('#geRgCap').innerHTML=CAP[ver]}
  $$('[data-gerg]').forEach(b=>b.addEventListener('click',()=>{ver=b.dataset.gerg;$$('[data-gerg]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopA&&stopA();stopA=animate(700,p=>drawG(ease(p)))}));
  drawG(1);
  const ph=onHide.genes;onHide.genes=()=>{ph&&ph();stopA&&stopA()};
  const pr2=redraws.genes;redraws.genes=()=>{pr2&&pr2();drawP();drawG(1)};
};
