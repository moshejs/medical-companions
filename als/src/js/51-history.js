/* =============== 5.1 history & people =============== */
const HI_LANES=[['Clinic & places','var(--umn)'],['People & public','var(--lmn)'],['Genes & proteins','var(--tdp)'],['Criteria & scales','var(--steel)'],['Drugs & regulators','var(--treat)']];
const HI_EV=[
 {y:1850,l:0,c:'Aran: progressive muscular atrophy',h:'Aran describes progressive muscular atrophy',t:'1850 · Progressive muscular atrophy',
  txt:`François-Amilcar Aran published a memoir describing and naming "progressive muscular atrophy". Duchenne de Boulogne later claimed priority, but a historian credits Aran with both the clinical description and the name, hence "Aran-Duchenne" disease [[Bonduelle1990]].`,
  pt:'Before ALS had its name, doctors in Paris described people whose muscles slowly wasted away.'},
 {y:1869,l:0,c:'Charcot & Joffroy: two lesions',h:'Charcot and Joffroy link two lesions to the signs',t:'1865–1869 · Two lesions, two sets of signs',
  txt:`Jean-Martin Charcot and Alix Joffroy linked lesions of the lateral columns of the spinal cord to progressive paralysis with contractures, and lesions of the anterior horns to paralysis with wasting [[Kumar2011]]. Charcot's anatomo-clinical method used ALS to bring together primary amyotrophy and primary lateral sclerosis, which had been seen as separate disorders [[Goetz2000]].`,
  hook:'Lateral columns: the <b>upper</b> motor neuron pathway (stiffness). Anterior horns: the <b>lower</b> motor neurons (wasting). [[Kumar2011]]'},
 {y:1874,l:0,c:'the name "ALS"',h:'Charcot names amyotrophic lateral sclerosis',t:'1874 · A name',
  txt:`When his lectures were compiled in 1874, Charcot offered the term "amyotrophic lateral sclerosis". ALS is still called Charcot's disease in many countries [[Kumar2011]]. The name holds both halves of the disease: <i>amyotrophic</i>, muscle wasting, and <i>lateral sclerosis</i>, hardening of the lateral columns of the spinal cord.`,
  pt:'The name means, roughly, "muscles wasting, and hardening at the sides of the spinal cord".',
  hook:'Charcot named ALS: <i>amyotrophic</i> = muscle wasting (LMN), <i>lateral sclerosis</i> = hardened lateral columns (UMN). [[Kumar2011]]'},
 {y:1939.33,l:1,c:'Lou Gehrig leaves baseball',h:'Lou Gehrig ends his streak',t:'1939 · Lou Gehrig',
  txt:`The New York Yankees player Lou Gehrig ended his streak of 2130 consecutive games on 2 May 1939 and died on 2 June 1941 [[BaseballHallGehrig]]. In the United States ALS is often called Lou Gehrig's disease. Film analysis found he moved normally in January 1938, with visible signs only after May 1938, and a photograph from October 1939 shows wasting of his hands [[Lewis2007]].`,
  pt:'A famous baseball player made the disease widely known in America.'},
 {y:1958,l:0,c:'Guam registry begins',h:'Guam: a high-incidence focus',t:'1958 · Guam',
  txt:`From the mid-1950s, ALS and parkinsonism-dementia complex were far more common on Guam than anywhere else, and a registry began in 1958 [[Plato2002]]. Incidence then fell steadily over the next 40 years, which the authors put down to westernisation rather than genetics [[Plato2003]]. See the card on Guam below for the cycad hypothesis.`},
 {y:1963,l:1,c:'Stephen Hawking diagnosed',h:'Stephen Hawking is diagnosed',t:'1963 · Stephen Hawking',
  txt:`Tests soon after Stephen Hawking's 21st birthday in 1963 showed motor neurone disease, and he was given about two years to live. He had a tracheostomy in 1985 after pneumonia and died at home in Cambridge on 14 March 2018 [[HawkingBiography]]. His roughly 55-year course lies far out in the long-survivor tail: a review puts survival beyond 10 years at 10-20%, a later register analysis at 7% [[Chio2009,Pupillo2025]].`,
  pt:'Some people live with ALS for many years. Stephen Hawking lived with it for about 55 years.'},
 {y:1993,l:2,c:'SOD1, the first ALS gene',h:'SOD1, the first ALS gene',t:'1993 · SOD1',
  txt:`Tight linkage to chromosome 21q led to 11 different SOD1 missense mutations in 13 families with familial ALS. SOD1 encodes a copper-zinc enzyme that converts superoxide. The paper said about 10% of ALS is inherited [[Rosen1993]]; population registers later put it nearer 5% [[Byrne2011]]. <a href="#genes" data-go="genes">Genes</a>`,
  hook:'<b>1993</b>: SOD1, the first ALS gene, on chromosome 21. Thirty years later it became the target of tofersen. [[Rosen1993,DrugsFDA]]'},
 {y:1994,l:3,c:'El Escorial criteria',h:'The El Escorial criteria',t:'1994 · El Escorial',
  txt:`The World Federation of Neurology published the El Escorial criteria for diagnosing ALS [[Brooks1994]]. A revision from a meeting at Airlie House followed in 2000 [[Brooks2000]]. <a href="#dx" data-go="dx">Diagnosis &amp; criteria</a>`},
 {y:1994.25,l:4,c:'riluzole trial: 74% vs 58%',h:'A riluzole trial reports longer survival',t:'1994 · The riluzole trial',
  txt:`In a controlled trial, 1-year survival was 74% with riluzole against 58% with placebo [[Bensimon1994]]. <a href="#drugs" data-go="drugs">Riluzole, edaravone and others</a>`},
 {y:1995.95,l:4,c:'FDA approves riluzole',h:'FDA approves riluzole (Rilutek)',t:'1995 · Riluzole approved',
  txt:`The FDA approved riluzole tablets (Rilutek) on 12 December 1995 [[DrugsFDA]]. An oral suspension followed in 2018 [[DrugsFDA]].`},
 {y:1999,l:3,c:'ALSFRS-R published',h:'The ALSFRS-R rating scale',t:'1999 · ALSFRS-R',
  txt:`The revised ALS Functional Rating Scale added breathing items (breathlessness, breathlessness lying flat, need for ventilatory support) to the original scale [[Cedarbaum1999]]. It has 12 items scored 0-4, a total of 0 to 48 [[Boddy2025]]. <a href="#course" data-go="course">ALSFRS-R and the course</a>`},
 {y:2006.75,l:2,c:'TDP-43 found in the clumps',h:'TDP-43, the main protein in the clumps',t:'2006 · TDP-43',
  txt:`TDP-43 was identified as the major disease protein in the ubiquitinated inclusions of both ALS and frontotemporal lobar degeneration (FTLD-U) [[Neumann2006]]. One protein now tied the two diseases together. <a href="#tdp43" data-go="tdp43">TDP-43 and what goes wrong</a>`,
  pt:'Scientists found which protein builds up in clumps inside the affected nerve cells.',
  hook:'<b>2006</b>: TDP-43 inclusions in both ALS and FTD. [[Neumann2006]]'},
 {y:2008.2,l:2,c:'TARDBP variants',h:'Mutations in TARDBP, the TDP-43 gene',t:'2008 · TARDBP',
  txt:`Mutations in TARDBP, the gene for TDP-43, were found in sporadic and familial ALS, and the M337V variant segregated with disease in one family [[Sreedharan2008]]. A change in the clumping protein could itself cause ALS.`},
 {y:2009.2,l:2,c:'FUS variants',h:'FUS mutations in familial ALS',t:'2009 · FUS',
  txt:`13 mutations in FUS on chromosome 16 were found specifically in familial ALS, and mutant FUS built up in the cytoplasm of neurons [[Kwiatkowski2009]].`},
 {y:2011.7,l:2,c:'C9orf72 repeat expansion',h:'C9orf72, a repeat expansion',t:'2011 · C9orf72',
  txt:`Two teams found an expanded GGGGCC repeat in the C9orf72 gene. It explained 23.5% of familial ALS in one series [[DeJesusHernandez2011]], and 46.0% of familial and 21.1% of sporadic ALS in Finland [[Renton2011]]. Controls carried 2-23 repeats, against an estimated 700-1600 in people with FTD/ALS [[DeJesusHernandez2011]]. In Europe it is the most common genetic finding in familial ALS (33.7%) [[Zou2017]].`,
  hook:'<b>2011</b>: C9orf72 GGGGCC expansion, the main genetic link between ALS and FTD. [[DeJesusHernandez2011,Renton2011]]'},
 {y:2012.15,l:3,c:'King\'s staging',h:'King\'s clinical staging proposed',t:'2012 · King\'s staging',
  txt:`A London clinic database of 1471 people was used to define King's stages: 1 onset, 2A diagnosis, 2B a second region, 3 a third region, 4A gastrostomy and 4B non-invasive ventilation [[Roche2012]]. MiToS staging followed in 2015 [[Chio2015MiToS]].`},
 {y:2014.6,l:1,c:'Ice Bucket Challenge',h:'The Ice Bucket Challenge',t:'2014 · Ice buckets',
  txt:`In 2014 people filmed themselves pouring ice water over their heads and challenged others to do the same or donate. Reporting in July 2016 put the ALS Association's receipts at more than $100 million, part of which funded the Project MinE genome study [[CBS2016IceBucket]].`,
  pt:'A viral online challenge raised a lot of money for ALS research.'},
 {y:2016.5,l:2,c:'NEK1 found via Project MinE',h:'NEK1, a risk gene from Project MinE',t:'2016 · NEK1',
  txt:`Project MinE investigators analysed the exomes of 1022 familial index cases with replication in sporadic cases, and found NEK1 risk variants in nearly 3% of ALS [[Kenna2016]]. NEK1 is classed as a susceptibility gene: it raises risk rather than causing disease on its own [[ClinGen2026]].`},
 {y:2017.34,l:4,c:'FDA approves edaravone',h:'FDA approves edaravone (Radicava)',t:'2017 · Edaravone',
  txt:`The FDA approved intravenous edaravone (Radicava) on 5 May 2017, and an oral suspension on 12 May 2022 [[DrugsFDA]]. In Europe the marketing application was withdrawn in May 2019 [[EMA2019Radicava]].`},
 {y:2017.5,l:3,c:'ALS-FTSD criteria',h:'ALS-frontotemporal spectrum criteria',t:'2017 · ALS-FTSD',
  txt:`Revised criteria defined the ALS-frontotemporal spectrum disorder. The consensus describes neuropsychological deficits in over 50% of people with ALS [[Strong2017]].`},
 {y:2020.5,l:3,c:'Gold Coast criteria',h:'Gold Coast criteria proposed',t:'2020 · Gold Coast',
  txt:`New diagnostic criteria for ALS were proposed at a meeting on the Gold Coast in Australia [[Shefner2020]]. <a href="#dx" data-go="dx">Try them in Diagnosis &amp; criteria</a>`},
 {y:2022.74,l:4,c:'FDA approves Relyvrio',h:'FDA approves AMX0035 (Relyvrio)',t:'2022 · AMX0035',
  txt:`The FDA approved sodium phenylbutyrate-taurursodiol (AMX0035, Relyvrio) on 29 September 2022 [[DrugsFDA]], supported by the phase 2 CENTAUR trial [[Paganoni2020,Paganoni2021]].`},
 {y:2023.31,l:4,c:'tofersen: accelerated approval',h:'Tofersen for SOD1-ALS',t:'2023 · Tofersen',
  txt:`On 25 April 2023 the FDA gave tofersen (Qalsody), an antisense drug for ALS with SOD1 variants, accelerated approval based on a fall in plasma neurofilament light [[DrugsFDA,FDA2023Qalsody]]. Its phase 3 trial was reported in 2022 [[Miller2022]], and the presymptomatic ATLAS trial is the confirmatory study [[Biogen2023]]. The EU authorised it on 29 May 2024 under exceptional circumstances [[EMA2024Qalsody]]. <a href="#tofersen" data-go="tofersen">Tofersen</a>`,
  hook:'Tofersen (2023): accelerated approval on a <b>biomarker</b>, neurofilament light, for <b>SOD1</b>-ALS only. [[DrugsFDA,FDA2023Qalsody]]'},
 {y:2024.26,l:4,c:'Relyvrio withdrawal begins',h:'PHOENIX fails and withdrawal begins',t:'2024 · PHOENIX',
  txt:`The phase 3 PHOENIX trial in 664 people missed its primary endpoint and all secondary endpoints (announced 8 March 2024). On 4 April 2024 Amylyx began withdrawing the drug in the US and Canada and stopped new starts [[Amylyx2024]]. Canada's exit was set for 31 December 2024 [[HC_Albrioza]].`},
 {y:2025.66,l:4,c:'FDA withdraws the approval',h:'FDA formally withdraws Relyvrio\'s approval',t:'2025 · Approval withdrawn',
  txt:`An FDA Federal Register notice published on 29 August 2025 (FR Doc. 2025-16646) formally withdrew the approval of NDA 216660; the notice records that marketing had stopped on 31 October 2024 [[FDA2025RelyvrioFR]]. Drugs@FDA now lists the product as discontinued [[DrugsFDA]].`,
  pt:'A medicine can be approved early and later withdrawn if a larger trial does not confirm the benefit.',
  hook:'A phase 2 result is not phase 3 proof: AMX0035 was withdrawn about 19 months after US approval. [[Paganoni2020,Amylyx2024]] Formal FDA withdrawal followed in 2025 [[FDA2025RelyvrioFR]].'}
];
const HI_ERA=[{f:1845,a:1850,t:'Paris: first descriptions'},{f:1939,a:1939.4,t:'A public face'},{f:1993,a:1993.05,t:'A gene and a drug'},{f:2006,a:2006.8,t:'TDP-43 and C9orf72'},{f:2014,a:2014.65,t:'Ice buckets and big data'},{f:2022,a:2022.8,t:'Approvals and withdrawals'}];
const HI_TXT={
 start:'Press Play: the first milestone is 1850',
 notYet:'the playhead has not reached this era yet',
 read:(y,n,m,e)=>`<span>year <b>${y}</b></span><span>milestones passed <b>${n} of ${m}</b></span><span>era <b>${e}</b></span>`,
 intro:{k:'1845',t:'Before the first descriptions',txt:'Press Play, drag the timeline, or choose a milestone below.',pt:'The story starts in Paris in 1850.'},
 /* scene labels */
 s1:{pma:'progressive muscular atrophy',two:'two lesions, two sets of signs',als:'amyotrophic lateral sclerosis',lat:'lateral columns',ant:'anterior horns',e1:'amyotrophic: muscle wasting',e2:'lateral sclerosis: hard sides',wall:'PARIS'},
 s2:{games:'2130',gamesL:'games in a row',guam:'Guam, registry from 1958',hawk:'Hawking, diagnosed 1963'},
 s3:{sod:'SOD1',chr:'chromosome 21',crit:'El Escorial criteria',rev:'revised 2000',surv:'1-year survival',ril:'riluzole',pla:'placebo',bottle:'riluzole, FDA 1995',frs:'ALSFRS-R',frs2:'12 items · 0 to 48'},
 s4:{nuc:'nucleus',clump:'TDP-43 clumps',tardbp:'TARDBP',fus:'FUS',c9:'C9orf72 GGGGCC repeat',usual:'usual: 2-23 copies',exp:'expanded: about 700-1600',kings:'King\'s stages',st:['1','2A','2B','3','4']},
 s5:{ice:'Ice Bucket Challenge',money:'more than $100 million',mine:'Project MinE exomes',nek:'NEK1 variants: nearly 3%',eda:'edaravone, FDA 2017',ftsd:['ALS-FTSD','2017'],gold:['Gold Coast','2020']},
 s6:{amx:'AMX0035 (Relyvrio)',amx1:'FDA approved 2022',amx2:'withdrawal began 2024',amx3:'APPROVAL WITHDRAWN',amx3b:'Federal Register, 2025',tof:'tofersen (Qalsody)',tof0:'phase 3 reported 2022',tof1:'accelerated approval 2023',tof2:'EU authorised 2024',mrna:'SOD1 mRNA',aso:'antisense strand',binds:'binds the message, less SOD1 made'},
 cards:[
  {t:'Aran or Duchenne?',txt:`Two Paris physicians described progressive muscular atrophy around 1850, and both claimed it. A historian credits Aran with the clinical description and the name, which is why the condition was long called "Aran-Duchenne" disease [[Bonduelle1990]].`},
  {t:'One disease, several names',txt:`Amyotrophic lateral sclerosis, Charcot's disease in many countries [[Kumar2011]], Lou Gehrig's disease in the United States, and motor neuron disease (MND), the umbrella term used in the UK. Studies of "motor neuron disease" may also count PLS and PMA [[GBD2016MND2018]].`,names:['ALS','Charcot\'s disease','Lou Gehrig\'s disease','motor neuron disease (MND)']},
  {t:'Guam: a cluster that faded',ev:'hyp',evl:'Hypothesis, contested',txt:`ALS was far more common on Guam from the mid-1950s, then declined over 40 years [[Plato2002,Plato2003]]. Macaques fed the cycad amino acid BMAA developed motor and parkinsonian features [[Spencer1987]], and eating flying foxes that feed on cycad seeds was proposed as a route [[CoxSacks2002]]. One laboratory found no free BMAA in brains of Chamorros with the disease [[Montine2005]].`},
  {t:'Approval is not the last word',txt:`AMX0035 went from approval in 2022 to withdrawal after its phase 3 trial failed [[Amylyx2024]]. Edaravone was approved in the US, while its EU application was withdrawn [[DrugsFDA,EMA2019Radicava]] and the 2024 EAN guideline does not recommend it [[VanDamme2024EAN]]. Tofersen's approval is conditional on the confirmatory ATLAS trial [[Biogen2023]].`},
  {t:'The long tail',txt:`Median survival is 2-4 years [[Feldman2022]], yet some people live far longer. In the Lombardy register 7% were alive at 10 years and 3% at 15 [[Pupillo2025]]. Stephen Hawking lived about 55 years after his diagnosis [[HawkingBiography]].`}
 ]
};
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* compressed axis: 1845-1935 gets 16%, 1935-1990 20%, 1990-2026 64% */
  const fx=y=>y<=1935?lerp(0,.16,(y-1845)/90):y<=1990?lerp(.16,.36,(y-1935)/55):lerp(.36,1,(y-1990)/36);
  const fy=u=>u<=.16?1845+u/.16*90:u<=.36?1935+(u-.16)/.2*55:1990+(u-.36)/.64*36;
  const tOfY=y=>clamp(fx(y));
  let XA=170,XB=704;
  const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map((E,i)=>({from:i?tOfY(E.f):0,at:Math.min(1,tOfY(E.a)+.003),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const CI=(x,y,r,st)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';
  const doc=(x,y,w,l1,l2,col)=>RC(x,y,w,56,PANEL,6)+LN(x+10,y+12,x+w-10,y+12,`stroke:${col};stroke-width:2`)+LN(x+10,y+20,x+w-24,y+20,'stroke:var(--line);stroke-width:2')+LN(x+10,y+28,x+w-16,y+28,'stroke:var(--line);stroke-width:2')+T(x+w/2,y+42,'t-xs t-mid',`fill:${col};font-weight:600`,l1)+T(x+w/2,y+52,'t-xs t-mid','',l2);

  /* ---------- one scene per era. Each is drawn in a 372 x 232 box at (o.x, o.y) ---------- */
  function hall(o,yr){const S=HI_TXT.s1;let s='';               // 1850-1938: a Paris lecture hall
    for(let i=0;i<3;i++){const x=o.x+14+i*50,y=o.y+18;
      s+=`<path d="M${x} ${y+62} v-44 a17 17 0 0 1 34 0 v44 z" style="fill:var(--air-soft);stroke:var(--line);stroke-width:1.4"/>`+LN(x+17,y+1,x+17,y+62,'stroke:var(--line)')+LN(x,y+34,x+34,y+34,'stroke:var(--line)')}
    s+=T(o.x+14,o.y+14,'t-xs','letter-spacing:.2em',S.wall);
    const B={x:o.x+176,y:o.y+8,w:192,h:128};
    s+=RC(B.x,B.y,B.w,B.h,'fill:var(--panel-2);stroke:var(--muted);stroke-width:2',4);
    s+=T(B.x+10,B.y+18,'t-xs','fill:var(--ink);font-weight:700',yr<1869?S.pma:yr<1874?S.two:S.als);
    if(yr<1869){s+=fibre(B.x+16,B.y+52,160,24,1,{atrophy:0})+fibre(B.x+16,B.y+86,160,24,1,{atrophy:.65})}
    else{const cx=B.x+50,cy=B.y+66;
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="42" ry="31" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
      s+=`<path transform="translate(${cx} ${cy})" d="M-6 -4 C-14 -22 -26 -24 -24 -14 C-22 -6 -14 -2 -10 2 C-18 10 -24 20 -16 22 C-8 22 -4 10 0 6 C4 10 8 22 16 22 C24 20 18 10 10 2 C14 -2 22 -6 24 -14 C26 -24 14 -22 6 -4 Z" style="fill:var(--panel);stroke:var(--cell-line)"/>`;
      s+=`<ellipse cx="${cx-31}" cy="${cy-4}" rx="7" ry="11" style="fill:var(--umn-soft);stroke:var(--umn);stroke-width:1.8"/><ellipse cx="${cx+31}" cy="${cy-4}" rx="7" ry="11" style="fill:var(--umn-soft);stroke:var(--umn);stroke-width:1.8"/>`;
      s+=CI(cx-14,cy+15,5,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.8')+CI(cx+14,cy+15,5,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.8');
      s+=LN(cx+38,cy-8,B.x+94,B.y+42,'stroke:var(--umn)')+T(B.x+96,B.y+45,'t-xs','fill:var(--umn);font-weight:600',S.lat);
      s+=LN(cx+19,cy+17,B.x+94,B.y+90,'stroke:var(--lmn)')+T(B.x+96,B.y+93,'t-xs','fill:var(--lmn);font-weight:600',S.ant);
      if(yr>=1874)s+=T(B.x+10,B.y+112,'t-xs','fill:var(--ink)',S.e1)+T(B.x+10,B.y+123,'t-xs','fill:var(--ink)',S.e2)}
    /* lecturer with a pointer */
    const lx=o.x+152,ly=o.y+112;
    s+=CI(lx,ly,8,'fill:var(--panel);stroke:var(--ink);stroke-width:1.6')+`<path d="M${lx-11} ${ly+48} l4 -36 h14 l4 36 z" style="fill:var(--ink);opacity:.8"/>`+LN(lx+6,ly+16,B.x+20,B.y+B.h-30,'stroke:var(--ink);stroke-width:1.6');
    /* audience in two tiers */
    for(let r=0;r<2;r++)for(let i=0;i<8;i++){const x=o.x+22+i*44+r*18,y=o.y+186+r*26;if(x>o.x+360)continue;
      s+=`<path d="M${x-13} ${y+14} q13 -16 26 0" style="fill:var(--panel-2);stroke:var(--muted)"/>`+CI(x,y-2,7,'fill:var(--panel-2);stroke:var(--muted)')}
    s+=LN(o.x+4,o.y+202,o.x+368,o.y+202,'stroke:var(--line);stroke-width:2')+LN(o.x+4,o.y+228,o.x+368,o.y+228,'stroke:var(--line);stroke-width:2');
    return s}

  function stadium(o,yr){const S=HI_TXT.s2;let s='';             // 1939-1992: a ballpark, then Guam and a wheelchair
    s+=`<path d="M${o.x+8} ${o.y+128} Q${o.x+104} ${o.y+20} ${o.x+200} ${o.y+128}" style="fill:none;stroke:var(--panel-2);stroke-width:22"/>`;
    const r=rng(7);for(let i=0;i<34;i++){const u=i/33,x=lerp(o.x+16,o.y*0+o.x+192,u),y=o.y+128-4*u*(1-u)*96+(r()-.5)*10;s+=CI(x,y,2.2,`fill:var(--muted);opacity:${f1(.4+.4*r())}`)}
    const dx=o.x+104,dy=o.y+164;
    s+=`<path d="M${dx} ${dy-48} L${dx+48} ${dy} L${dx} ${dy+48} L${dx-48} ${dy} Z" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.6"/>`;
    [[0,-48],[48,0],[-48,0]].forEach(([a,b])=>s+=RC(dx+a-4,dy+b-4,8,8,'fill:var(--panel);stroke:var(--ink)',1));
    s+=`<path d="M${dx-5} ${dy+44} h10 l-5 6z" style="fill:var(--panel);stroke:var(--ink)"/>`+CI(dx,dy,5,'fill:var(--food-soft);stroke:var(--food)');
    s+=CI(dx+10,dy+34,5,'fill:var(--lmn);opacity:.9')+LN(dx+10,dy+39,dx+10,dy+50,'stroke:var(--lmn);stroke-width:3;stroke-linecap:round');
    s+=RC(o.x+56,o.y+6,96,40,PANEL,5)+T(o.x+104,o.y+28,'t-big t-mid','',S.games)+T(o.x+104,o.y+41,'t-xs t-mid','',S.gamesL);
    if(yr>=1958){const gx=o.x+290,gy=o.y+58;
      s+=`<ellipse cx="${gx}" cy="${gy}" rx="52" ry="11" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.4"/>`;
      s+=`<path d="M${gx+4} ${gy-4} q-4 -22 4 -40" style="fill:none;stroke:var(--food);stroke-width:3;stroke-linecap:round"/>`;
      [-1,-.4,.4,1].forEach(k=>s+=`<path d="M${gx+8} ${gy-44} q${f1(12*k)} -6 ${f1(22*k)} 8" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round"/>`);
      for(let k=0;k<3;k++)s+=`<path d="M${gx-66+k*44} ${gy+20} q10 -6 20 0 q10 6 20 0" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:.7"/>`;
      s+=T(o.x+226,o.y+96,'t-xs','fill:var(--ink)',S.guam)}
    if(yr>=1963){const wx=o.x+292,wy=o.y+176;
      s+=CI(wx-6,wy+14,24,'fill:none;stroke:var(--ink);stroke-width:2.4')+CI(wx+34,wy+32,7,'fill:none;stroke:var(--ink);stroke-width:2');
      s+=`<path d="M${wx-22} ${wy-34} L${wx-14} ${wy+4} H${wx+28} L${wx+34} ${wy+24}" style="fill:none;stroke:var(--ink);stroke-width:2.4;stroke-linejoin:round"/>`;
      s+=CI(wx-6,wy-30,8,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.6')+`<path d="M${wx-12} ${wy-20} q8 18 18 22 h14" style="fill:none;stroke:var(--lmn);stroke-width:5;stroke-linecap:round"/>`;
      s+=RC(wx+30,wy-22,24,16,'fill:var(--steel-soft);stroke:var(--steel)',3);
      s+=T(o.x+218,o.y+228,'t-xs','fill:var(--ink)',S.hawk)}
    return s}

  function genes(o,yr){const S=HI_TXT.s3;let s='';               // 1993-2005: a helix, a checklist, a pill bottle
    const hx=o.x+40,top=o.y+12,bot=o.y+200;
    let a='',b='';for(let i=0;i<=40;i++){const y=lerp(top,bot,i/40),ph=i/40*Math.PI*4;a+=(i?'L':'M')+f1(hx+16*Math.sin(ph))+' '+f1(y);b+=(i?'L':'M')+f1(hx-16*Math.sin(ph))+' '+f1(y);
      if(i%2===0&&i<40)s+=LN(hx+16*Math.sin(ph),y,hx-16*Math.sin(ph),y,`stroke:${y>o.y+88&&y<o.y+114?'var(--tdp)':'var(--line)'};stroke-width:2`)}
    s+=`<path d="${a}" style="fill:none;stroke:var(--steel);stroke-width:2.4"/><path d="${b}" style="fill:none;stroke:var(--umn);stroke-width:2.4"/>`;
    s+=RC(hx-22,o.y+86,44,30,'fill:none;stroke:var(--tdp);stroke-width:2;stroke-dasharray:3 2',6);
    s+=T(hx+30,o.y+100,'t-lbl','fill:var(--tdp)',S.sod)+T(hx+30,o.y+113,'t-xs','',S.chr);
    if(yr>=1994){const cx=o.x+180,cy=o.y+8;
      s+=RC(cx,cy,186,78,PANEL,6)+T(cx+10,cy+16,'t-xs','fill:var(--ink);font-weight:600',S.crit);
      for(let k=0;k<3;k++)s+=`<path d="M${cx+12} ${cy+30+k*15} l4 5 l9 -10" style="fill:none;stroke:var(--steel);stroke-width:2"/>`+LN(cx+32,cy+29+k*15,cx+150-k*24,cy+29+k*15,'stroke:var(--line);stroke-width:2');
      if(yr>=2000)s+=T(cx+178,cy+72,'t-xs t-end','fill:var(--steel)',S.rev)}
    if(yr>=1994.25){const vx=o.x+180,vy=o.y+104;
      s+=T(vx,vy,'t-xs','fill:var(--ink);font-weight:600',S.surv);
      [[S.ril,74,'var(--treat)'],[S.pla,58,'var(--muted)']].forEach(([l,v,c],k)=>{const y=vy+12+k*20;
        s+=T(vx,y+8,'t-xs','',l)+RC(vx+56,y,110,10,'fill:var(--panel-2)',5)+RC(vx+56,y,110*v/100,10,`fill:${c}`,5)+T(vx+56+110*v/100+5,y+9,'t-xs','fill:var(--ink)',v+'%')})}
    if(yr>=1995.95){const bx=o.x+96,by=o.y+146;
      s+=RC(bx+6,by,32,12,'fill:var(--treat);opacity:.85',3)+RC(bx,by+12,44,48,'fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.6',6)+RC(bx+6,by+26,32,16,PANEL,3);
      s+=T(o.x+76,o.y+222,'t-xs','fill:var(--treat)',S.bottle)}
    if(yr>=1999){const fx2=o.x+180,fy2=o.y+160;
      s+=RC(fx2,fy2,186,62,PANEL,6)+T(fx2+10,fy2+18,'t-lbl','',S.frs)+T(fx2+80,fy2+18,'t-xs','',S.frs2);
      for(let k=0;k<12;k++){const v=[4,4,3,4,3,3,2,3,2,4,4,3][k];s+=RC(fx2+10+k*14,fy2+30+(4-v)*5,10,v*5+2,'fill:var(--steel);opacity:.7',2)}}
    return s}

  function protein(o,yr){const S=HI_TXT.s4;let s='';             // 2006-2013: a neuron with TDP-43 clumps, then the genes
    const cx=o.x+84,cy=o.y+104;
    [[-1.9,70],[-1.2,64],[-.5,58],[2.5,62],[1.9,56]].forEach(([a,L])=>s+=`<path d="M${f1(cx+Math.cos(a)*54)} ${f1(cy+Math.sin(a)*54)} L${f1(cx+Math.cos(a)*(54+L*.6))} ${f1(cy+Math.sin(a)*(54+L*.6))}" style="stroke:var(--cell-line);stroke-width:5;stroke-linecap:round"/>`);
    s+=`<path d="M${cx+40} ${cy+40} q30 30 40 84" style="fill:none;stroke:var(--axon);stroke-width:6;stroke-linecap:round"/>`;
    s+=CI(cx,cy,58,'fill:var(--cell);stroke:var(--cell-line);stroke-width:2')+CI(cx-6,cy-6,24,'fill:var(--panel);stroke:var(--nuc);stroke-width:2');
    s+=tdp(cx-16,cy-15,1,.55,0)+tdp(cx-4,cy-4,1,.4,0);
    const r=rng(11);for(let k=0;k<6;k++){const a=k/6*6.283+.4,d=40+r()*8;s+=tdp(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.9,1.15,1,1)}
    s+=T(cx-6,cy+12,'t-xs t-mid','fill:var(--nuc)',S.nuc)+T(o.x+8,o.y+222,'t-xs','fill:var(--tdp);font-weight:600',S.clump);
    const gx=o.x+192;
    if(yr>=2008.2)s+=RC(gx,o.y+8,76,24,'fill:var(--tdp-soft);stroke:var(--tdp)',12)+T(gx+38,o.y+24,'t-xs t-mid','fill:var(--tdp);font-weight:700',S.tardbp);
    if(yr>=2009.2)s+=RC(gx+86,o.y+8,62,24,'fill:var(--tdp-soft);stroke:var(--tdp)',12)+T(gx+117,o.y+24,'t-xs t-mid','fill:var(--tdp);font-weight:700',S.fus);
    if(yr>=2011.7){const y0=o.y+58;
      s+=T(gx,y0,'t-xs','fill:var(--ink);font-weight:600',S.c9);
      s+=T(gx,y0+18,'t-xs','',S.usual);for(let k=0;k<3;k++)s+=RC(gx+k*11,y0+24,9,9,'fill:var(--steel);opacity:.8',2);
      s+=T(gx,y0+50,'t-xs','fill:var(--tdp)',S.exp);const n=Math.round(lerp(4,15,ramp(yr,2011.7,2012.3)));
      for(let k=0;k<n;k++)s+=RC(gx+k*11,y0+56,9,9,'fill:var(--tdp)',2);
      if(n>=15)s+=T(gx+168,y0+64,'t-xs','fill:var(--tdp)','…')}
    if(yr>=2012.15){const kx=gx,ky=o.y+226;
      s+=T(kx,o.y+150,'t-xs','fill:var(--ink);font-weight:600',S.kings);
      S.st.forEach((l,k)=>{const h=12+k*11;s+=RC(kx+k*34,ky-h,30,h,`fill:var(--steel);opacity:${f1(.3+k*.14)}`,2)+T(kx+k*34+15,ky-h-4,'t-xs t-mid','fill:var(--ink)',l)})}
    return s}

  function bucket(o,yr){const S=HI_TXT.s5;let s='';              // 2014-2021: an ice bucket, then big data and new criteria
    const bx=o.x+62,by=o.y+34;
    s+=`<g transform="translate(${bx} ${by}) rotate(-28)"><path d="M-26 -18 L26 -18 L20 22 L-20 22 Z" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:2"/><path d="M-26 -18 q26 -26 52 0" style="fill:none;stroke:var(--steel);stroke-width:1.6"/></g>`;
    const ph=(yr*3)%1;
    for(let k=0;k<9;k++){const u=(ph+k/9)%1,x=bx+30+((k*37)%28)-6,y=by+16+u*104;s+=`<path d="M${f1(x)} ${f1(y)} q3 6 0 8 q-3 -2 0 -8z" style="fill:var(--air);opacity:${f1(.9-.6*u)}"/>`}
    [[bx+14,by+20],[bx+40,by+8]].forEach(([x,y])=>s+=RC(x,y,9,9,'fill:var(--panel);stroke:var(--air)',2));
    const px=o.x+96,py=o.y+156;
    s+=CI(px,py,13,'fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.6')+`<path d="M${px-30} ${py+50} q30 -46 60 0" style="fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.6"/>`;
    s+=T(o.x+8,o.y+218,'t-sm','fill:var(--ink);font-weight:600',S.ice)+T(o.x+8,o.y+231,'t-xs','',S.money);
    const gx=o.x+192;
    if(yr>=2016.5){s+=T(gx,o.y+14,'t-xs','fill:var(--ink);font-weight:600',S.mine);
      for(let i=0;i<24;i++){const x=gx+(i%8)*22,y=o.y+22+Math.floor(i/8)*18,hit=i===13;s+=RC(x,y,18,14,hit?'fill:var(--tdp);stroke:var(--tdp)':'fill:var(--panel-2);stroke:var(--line)',3)}
      s+=T(gx,o.y+92,'t-xs','fill:var(--tdp)',S.nek)}
    if(yr>=2017.34){const ix=gx+4,iy=o.y+104;
      s+=RC(ix,iy,30,40,'fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.6',8)+LN(ix+15,iy+40,ix+15,iy+58,'stroke:var(--treat);stroke-width:2')+CI(ix+15,iy+60,3,'fill:var(--treat)');
      s+=T(ix+40,iy+26,'t-xs','fill:var(--treat)',S.eda)}
    if(yr>=2017.5)s+=doc(gx,o.y+170,84,S.ftsd[0],S.ftsd[1],'var(--steel)');
    if(yr>=2020.5)s+=doc(gx+94,o.y+170,84,S.gold[0],S.gold[1],'var(--steel)');
    return s}

  function approvals(o,yr){const S=HI_TXT.s6;let s='';           // 2022-2026: two drugs, two fates
    const card=(x,ttl,lines)=>{let c=RC(x,o.y+6,176,122,PANEL,8)+T(x+10,o.y+26,'t-lbl','',ttl);
      lines.forEach(([txt,col,on],k)=>{const y=o.y+50+k*22;c+=CI(x+15,y-4,4,`fill:${on?col:'var(--line)'}`)+T(x+26,y,'t-xs',on?`fill:${col}`:'',txt)});return c};
    s+=card(o.x,S.amx,[[S.amx1,'var(--treat)',1],[S.amx2,'var(--warn)',yr>=2024.26]]);
    s+=`<g transform="translate(${o.x+132} ${o.y+82})">`+[0,1,2].map(k=>`<rect x="${k*12-18}" y="-6" width="20" height="10" rx="5" style="fill:var(--treat-soft);stroke:var(--treat)"/>`).join('')+'</g>';
    if(yr>=2025.66){const k=ramp(yr,2025.66,2025.8);
      s+=`<g transform="translate(${o.x+88} ${o.y+107}) rotate(-6) scale(${f1(lerp(1.4,1,k))})" style="opacity:${f1(.3+.7*k)}"><rect x="-80" y="-16" width="160" height="34" rx="4" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4"/>${T(0,-1,'t-xs t-mid','fill:var(--bad);font-weight:700',S.amx3)}${T(0,12,'t-xs t-mid','fill:var(--bad)',S.amx3b)}</g>`}
    const tx=o.x+196;
    s+=card(tx,S.tof,[[S.tof0,'var(--muted)',1],[S.tof1,'var(--treat)',yr>=2023.31],[S.tof2,'var(--treat)',yr>=2024.41]]);
    /* antisense strand docking onto the message */
    const my=o.y+176,mx0=o.x+20,mx1=o.x+352,dock=ease(ramp(yr,2023.31,2023.9));
    s+=LN(mx0,my,mx1,my,'stroke:var(--tdp);stroke-width:3;stroke-linecap:round');
    for(let x=mx0+8;x<mx1;x+=12)s+=LN(x,my,x,my-7,'stroke:var(--tdp);stroke-width:1.6;opacity:.7');
    s+=T(mx0,my+18,'t-xs','fill:var(--tdp)',S.mrna);
    const ay=lerp(my-58,my-14,dock),ax=o.x+170;
    s+=LN(ax,ay,ax+90,ay,'stroke:var(--treat);stroke-width:3.4;stroke-linecap:round');
    for(let x=ax+6;x<ax+90;x+=12)s+=LN(x,ay,x,ay+7,'stroke:var(--treat);stroke-width:1.6');
    s+=T(ax+96,ay+4,'t-xs','fill:var(--treat);font-weight:600',S.aso);
    if(dock>.98)s+=T(o.x+20,o.y+226,'t-xs','fill:var(--ink)',S.binds);
    return s}
  const SCENE=[hall,stadium,genes,protein,bucket,approvals];

  function draw(t){
    const N=vb(svg,'720 584','400 744');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,sc:[6,54,388,398],A:{x:14,y:62,w:372},C:{x:14,y:306},
         LY:i=>486+i*42,bandH:22,labUp:1,axY:692,tkY:710,brY:698,ticks:[1850,1900,1960,1990,2000,2010,2020],phTop:470,phBot:700,yY:732}
      : {XA:170,XB:704,yrX:10,yrY:24,hX:70,hY:23,sc:[6,34,708,250],A:{x:16,y:42,w:416},C:{x:446,y:42},
         LY:i=>318+i*44,bandH:38,labUp:0,axY:528,tkY:546,brY:534,ticks:[1850,1900,1935,1960,1990,2000,2010,2020,2026],phTop:296,phBot:536,yY:570};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    let s='';
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:22px;fill:${HI_LANES[cur.l][1]}`,Math.floor(cur.y))+T(L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)',HI_TXT.start);
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph]({x:L.A.x+(L.A.w-372)/2,y:L.A.y},yr);
    s+=N?LN(L.C.x,L.C.y-8,L.C.x+372,L.C.y-8,'stroke:var(--line)'):LN(L.C.x-12,L.A.y,L.C.x-12,L.A.y+236,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink);font-weight:600',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+34+k*20;
      s+=CI(L.C.x+5,y-4,4,`fill:${HI_LANES[e.l][1]}`);
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${Math.floor(e.y)}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+34,'t-xs','',HI_TXT.notYet);
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-5:y+4,'t-sm',`fill:${c};font-weight:600`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y)});
    [1935,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-6)} ${L.brY} l4 -12 M${f1(x-1)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    /* dots: alternate up and down where two in a lane sit too close */
    const gapMin=12,dyO=N?6:9,last={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy,e};if(e.dy&&p&&p.e)p.e.dy=p.dy});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HI_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=CI(x,y,4.5,'fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.7');
      else if(e===cur){const k=ramp(xp-x,0,26);s+=CI(x,y,7+(N?6:11)*k,`fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}`)+CI(x,y,7,`fill:${c};stroke:var(--ink);stroke-width:2`)}
      else s+=CI(x,y,5,`fill:${c}`);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(clamp(xp,XA+14,XB-14),L.yY,'t-xs t-mid','fill:var(--ink);font-weight:700',Math.floor(yr));
    svg.innerHTML=s;
    setSt(ph);
    $$('#hiYears [data-hy2]').forEach(b=>b.setAttribute('aria-pressed',cur&&+b.dataset.hy2===cur.y?'true':'false'));
    $('#hiRead').innerHTML=HI_TXT.read(Math.floor(yr),done.length,HI_EV.length,HI_ERA[ph].t);
    $('#hiNote').innerHTML=cur?noteHTML({k:HI_LANES[cur.l][0],t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}):noteHTML(HI_TXT.intro);
  }
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag steel" data-hy2="${e.y}" aria-pressed="false"><b style="font-weight:700">${Math.floor(e.y)}</b>&nbsp;${amp(e.h)}</button>`).join('');
  const stop=playWire(rg,$('#hiPlay'),draw,30000,UI.replay,'history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.0015);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=HI_TXT.cards.map(c=>`<div class="card"><h4>${c.t}${c.ev?` <span class="ev ${c.ev}">${c.evl}</span>`:''}</h4>${c.names?`<div class="hi-names">${c.names.map(n=>`<span class="tag">${n}</span>`).join('')}</div>`:''}<p>${c.txt}</p></div>`).join('');
  draw(+rg.value);
};
