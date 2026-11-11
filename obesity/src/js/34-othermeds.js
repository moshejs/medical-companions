/* =============== 3.4 other weight-loss medicines =============== */
/* Main player: a mechanism map. The brain (side view plus hypothalamus inset), a close-up panel and the gut sit side
   by side; each step is one medicine, and its fifth of the timeline animates that medicine's site of action. The band
   at the bottom builds the pivotal trial's published result. All drawings schematic; numbers from the research pass. */
const OM_STEPS=[
 {from:0,at:.17,k:'Gut lumen · capsule',t:'Orlistat',
  txt:'Orlistat reversibly blocks gastric and pancreatic lipases inside the gut, so undigested dietary fat (triglyceride) is not absorbed. [[FDA-Xenical]] It is the one medicine here that does not act on the brain. In XENDOS, 4 years of orlistat with lifestyle change gave 5.8 kg loss vs 3.0 kg on placebo, and diabetes incidence of 6.2% vs 9.0%, a 37.3% risk reduction confined to people with impaired glucose tolerance. Only 52% on orlistat and 34% on placebo completed treatment. [[Torgerson2004XENDOS]]',
  pt:'Orlistat stops some of the fat in food from being digested, so it passes out of the body in the stool instead of being absorbed. It works in the gut, not the brain.',
  hook:'Orlistat = gastric and pancreatic lipase inhibitor. XENDOS: diabetes risk down 37.3% over 4 years, only in impaired glucose tolerance. [[FDA-Xenical,Torgerson2004XENDOS]]'},
 {from:.2,at:.37,k:'Hypothalamus · capsule',t:'Phentermine–topiramate',
  txt:'Phentermine is a sympathomimetic amine. Its weight effect is likely mediated by catecholamine release in the hypothalamus, which reduces appetite. The label says the mechanism of topiramate\'s weight effect is not known. [[FDA-Qsymia]] In CONQUER (2487 adults, 56 weeks), weight changed −9.8% on 15/92 mg and −7.8% on 7.5/46 mg vs −1.2% on placebo, as trial averages. [[Gadde2011CONQUER]]',
  pt:'Phentermine turns down appetite signals in the brain. Topiramate adds to the effect, though nobody is yet sure exactly how.',
  hook:'Qsymia is contraindicated in pregnancy (first-trimester topiramate raises the risk of oral clefts) and is dispensed only through a REMS programme. [[FDA-Qsymia]]'},
 {from:.4,at:.57,k:'Hypothalamus and reward circuit · tablet',t:'Naltrexone–bupropion',
  txt:'Naltrexone is an opioid antagonist; bupropion is a weak dopamine and noradrenaline reuptake inhibitor. Nonclinical studies suggest effects on the hypothalamus (appetite) and on the mesolimbic dopamine reward circuit. [[FDA-Contrave]] In COR-I (1742 adults, 56 weeks), weight changed −6.1% vs −1.3%, and 48% vs 16% lost at least 5%; only half completed the trial. Nausea affected 29.8% vs 5.3%. [[Greenway2010CORI]]',
  pt:'This tablet pairs two older medicines. Together they seem to act on both hunger and the brain\'s reward system around food.',
  hook:'Contrave carries a boxed warning on suicidal thoughts and behaviours because it contains bupropion; it is contraindicated with seizure disorder, uncontrolled hypertension, bulimia or anorexia nervosa and chronic opioid use. [[FDA-Contrave]]'},
 {from:.6,at:.77,k:'The MC4 receptor · injection',t:'Setmelanotide',
  txt:'Normally POMC neurons release alpha-MSH, which activates melanocortin-4 receptors (MC4R). [[Huszar1997]] Setmelanotide is an MC4 receptor agonist with 20-fold less activity at MC3 and MC1 receptors; it may restore signalling in the leptin–melanocortin pathway when that pathway is under-activated. [[FDA-Imcivree]] In open-label phase 3 trials, 8 of 10 people with POMC deficiency and 5 of 11 with LEPR deficiency lost at least 10% at about 1 year. [[Clement2020]]',
  pt:'A few people have a rare gene change that breaks the brain\'s "I have had enough" signal, so they feel hungry all the time. Setmelanotide switches on the receptor at the end of that broken chain. It is not a treatment for common obesity.',
  hook:'Imcivree (as published): age 2 and over with Bardet-Biedl syndrome or genetically confirmed POMC, PCSK1 or LEPR deficiency; age 4 and over with acquired hypothalamic obesity. [[FDA-Imcivree]]'},
 {from:.8,at:.97,k:'Hypothalamus · daily injection',t:'Liraglutide',
  txt:'Liraglutide is a GLP-1 receptor agonist that resists breakdown by peptidases: its plasma half-life is 13 hours after injection, so it is given once daily, while native GLP-1 lasts only minutes. [[FDA-Saxenda]] Native GLP-1 is made by intestinal L cells after meals. [[Holst2007]] In rodents, liraglutide entered the arcuate nucleus; GLP-1 excited POMC/CART neurons and indirectly inhibited NPY/AgRP neurons. [[Secher2014]] The Saxenda label reports SCALE as −7.4% vs −3.0% at 56 weeks. [[FDA-Saxenda]]',
  pt:'Liraglutide copies a gut hormone that tells the brain food has arrived. It is a daily injection, the older relative of weekly semaglutide.',
  hook:'Head to head in STEP 8: semaglutide 2.4 mg weekly −15.8% vs liraglutide 3.0 mg daily −6.4% at 68 weeks. [[Rubino2022STEP8]]'}
];
/* what the SVG writes for each medicine (no citations inside the SVG: they are in the caption and the note) */
const OM_SVGTXT=[
 {name:'Orlistat',cls:'lipase inhibitor · capsule with meals',site:'gut',close:'In the gut lumen',
  band:{lab:'XENDOS · 4 years · mean weight lost',a:5.8,b:3.0,max:10,fmt:v=>f1(v)+' kg',an:'orlistat',bn:'placebo'}},
 {name:'Phentermine–topiramate',cls:'sympathomimetic + anticonvulsant · capsule',site:'brain',close:'At a hypothalamic synapse',
  band:{lab:'CONQUER · 56 weeks · mean weight change',a:9.8,b:1.2,max:12,fmt:v=>'−'+f1(v)+'%',an:'15/92 mg',bn:'placebo'}},
 {name:'Naltrexone–bupropion',cls:'opioid antagonist + reuptake inhibitor · tablet',site:'brain',close:'At a synapse',
  band:{lab:'COR-I · 56 weeks · mean weight change',a:6.1,b:1.3,max:12,fmt:v=>'−'+f1(v)+'%',an:'32/360 mg',bn:'placebo'}},
 {name:'Setmelanotide',cls:'MC4R agonist · injection · rare genetic obesity',site:'brain',close:'On a PVN neuron',
  band:{lab:'Open-label trials · about 1 year · reached ≥10% loss',a:80,b:45,max:100,fmt:v=>Math.round(v)+'%',an:'POMC (8/10)',bn:'LEPR (5/11)',both:1}},
 {name:'Liraglutide 3.0 mg',cls:'GLP-1 receptor agonist · daily injection',site:'brain',close:'Level in the blood',
  band:{lab:'SCALE (label) · 56 weeks · mean weight change',a:7.4,b:3.0,max:12,fmt:v=>'−'+f1(v)+'%',an:'liraglutide',bn:'placebo'}}
];
const OM_LBL={closeup:'close-up',wall:'gut wall absorbs',splits:'lipase splits fat: absorbed',blocked:'lipase blocked: fat passes',
  colon:'unabsorbed fat → stool',lipase:'lipase',released:'catecholamines released',appetite:'appetite ↓',topi:'topiramate: weight',topi2:'mechanism not known',
  dat:'reuptake',bup:'bupropion: less reuptake',nal:'naltrexone: opioid block',opioid:'opioid receptor',reward:'reward circuit',
  nomsh:'POMC deficiency',msh:'α-MSH',mc4r:'MC4R',signal:'fullness signal',hours:'hours after a dose',level:'level',
  native:'native GLP-1: minutes',lira:'liraglutide',half:'half-life 13 h',lcells:'L cells make GLP-1',trial:'trial average'};

/* bars: the placebo-subtracted comparison. d,p = mean % change (drug, placebo); diff = the difference as published,
   otherwise d-p; r5 = % reaching ≥5% loss (drug, placebo). */
const OM_BARS=[
 {n:'Orlistat 120 mg',tr:'XENDOS · 4 years',kg:[5.8,3.0]},
 {n:'Phentermine–topiramate 7.5/46 mg',tr:'CONQUER · 56 weeks',d:7.8,p:1.2,r5:[62,21]},
 {n:'Phentermine–topiramate 15/92 mg',tr:'CONQUER · 56 weeks',d:9.8,p:1.2,r5:[70,21]},
 {n:'Naltrexone–bupropion 32/360 mg',tr:'COR-I · 56 weeks',d:6.1,p:1.3,r5:[48,16]},
 {n:'Liraglutide 3.0 mg',tr:'SCALE, label figures · 56 weeks',d:7.4,p:3.0,diff:4.5,r5:[62.3,34.4]},
 {n:'Semaglutide 2.4 mg (for reference)',tr:'STEP 1 · 68 weeks',d:14.9,p:2.4,diff:12.4,r5:[86.4,31.5],ref:1},
 {n:'Tirzepatide 15 mg (for reference)',tr:'SURMOUNT-1 · 72 weeks',d:20.9,p:3.1,r5:[91,35],ref:1}
];
const OM_VIEWS=[
 {id:'diff',n:'Placebo-subtracted',max:20,ticks:[0,5,10,15,20],unit:'percentage points more than placebo',
  note:'Each bar is the drug group\'s mean % weight loss minus the placebo group\'s, in the same trial. Where the trial or label states the difference, that figure is used (liraglutide 4.5, semaglutide 12.4); the others are subtracted here.'},
 {id:'raw',n:'Drug and placebo',max:22,ticks:[0,5,10,15,20],unit:'mean % weight lost',
  note:'Placebo groups also lost weight, because everyone in these trials had lifestyle support. That is why the placebo-subtracted view is the fairer measure of what the medicine adds.'},
 {id:'r5',n:'Reached ≥5% loss',max:100,ticks:[0,25,50,75,100],unit:'% of people reaching at least 5% loss',
  note:'The share of each group that lost at least 5% of body weight. A mean hides a wide spread: some people lose much more, some little.'}
];
const OM_BLBL={kg:'reported in kg only: 5.8 vs 3.0 kg',nr:'not reported in this source',drug:'drug',plc:'placebo',pts:' pts'};

/* the cautionary timeline: approvals, harms and safety trials */
const OM_HIST=[
 {y:1950,d:'1940s–50s',k:'appr',l:'Amphetamine-like appetite suppressants',
  txt:'After amphetamine and amphetamine-like anorectics were approved in the 1940s and 1950s, the FDA struggled to define their efficacy and safety. Limits on how long they could be used, and warnings about abuse and addiction, followed. [[Colman2005]]'},
 {y:1959.34,d:'May 1959',k:'appr',l:'Phentermine (Ionamin) approved',
  txt:'Phentermine resin complex (Ionamin) received its original US approval on 4 May 1959. [[FDA-DrugsAtFDA-AOM]] Phentermine is still used today, and is one half of Qsymia. [[FDA-Qsymia]]'},
 {y:1996,d:'1996',k:'harm',l:'"Fen-phen": over 18 million prescriptions',
  txt:'In the mid-1990s, off-label "fen-phen" (fenfluramine plus phentermine) and the approval of dexfenfluramine led to widespread long-term use of appetite suppressants. [[Colman2005]] US prescriptions for fenfluramine and phentermine exceeded 18 million in 1996. [[Connolly1997]]'},
 {y:1997.5,d:'1997',k:'harm',l:'Heart-valve disease; fenfluramines withdrawn',
  txt:'A 1997 report described valvular heart disease in 24 women (mean age 44) about 12 months after starting fenfluramine–phentermine: 8 had pulmonary hypertension and 5 needed heart surgery. [[Connolly1997]] On 8 July 1997 the FDA issued a public health advisory, wrote to 700,000 practitioners and requested voluntary withdrawal of fenfluramine and dexfenfluramine. [[CDC1997Fenfluramine]]'},
 {y:1997.9,d:'Nov 1997',k:'appr',l:'Sibutramine (Meridia) approved',
  txt:'Sibutramine (Meridia) received its original US approval on 22 November 1997. The product is now listed as "Discontinued". [[FDA-DrugsAtFDA-AOM]]'},
 {y:1999.3,d:'Apr 1999',k:'appr',l:'Orlistat (Xenical) approved',
  txt:'Orlistat (Xenical) received its original US approval on 23 April 1999. [[FDA-DrugsAtFDA-AOM]] A 60 mg version (Alli) is sold over the counter for overweight adults. [[FDA-Alli]]'},
 {y:2007,d:'2007',k:'harm',l:'Rimonabant: depression and anxiety',
  txt:'Rimonabant, a CB1 receptor blocker, was marketed in Europe but never approved in the USA. A 2007 meta-analysis of four trials (4105 people) found 4.7 kg more loss than placebo at 1 year, but people were 2.5 times more likely to stop because of depressive mood disorders and 3.0 times because of anxiety. The European Medicines Agency later withdrew it. [[Christensen2007,Sam2011]]'},
 {y:2010,d:'2010',k:'harm',l:'SCOUT; sibutramine withdrawn in Europe',
  txt:'In SCOUT (9804 adults at high cardiovascular risk, mean 3.4 years), sibutramine raised the primary cardiovascular outcome to 11.4% vs 10.0% (HR 1.16), driven by non-fatal heart attack (HR 1.28) and stroke (HR 1.36), for only 1.7 kg extra weight loss after randomisation. [[James2010SCOUT]] The European Medicines Agency withdrew sibutramine in 2010. [[Galhardo2010]]'},
 {y:2012.54,d:'Jul 2012',k:'appr',l:'Phentermine–topiramate (Qsymia) approved',
  txt:'Qsymia received its original US approval on 17 July 2012. [[FDA-DrugsAtFDA-AOM]] Its label carries a pregnancy contraindication and a REMS programme because topiramate can cause oral clefts. [[FDA-Qsymia]]'},
 {y:2014.8,d:'2014',k:'appr',l:'Contrave and Saxenda approved',
  txt:'Naltrexone–bupropion (Contrave) was approved on 10 September 2014 and liraglutide 3.0 mg (Saxenda) on 23 December 2014. [[FDA-DrugsAtFDA-AOM]]'},
 {y:2016,d:'2016',k:'trial',l:'LIGHT: heart safety left uncertain',
  txt:'The naltrexone–bupropion cardiovascular outcome trial (8910 people) was stopped early after confidential interim data were released publicly. At 50% of events, major cardiovascular events were 2.0% vs 2.3% (HR 0.88), and cardiovascular safety "remains uncertain". [[Nissen2016LIGHT]]'},
 {y:2018,d:'2018',k:'trial',l:'CAMELLIA-TIMI 61: lorcaserin',
  txt:'Lorcaserin, a serotonin 2C agonist, was non-inferior to placebo on cardiovascular safety in about 12,000 people (major events 2.0% vs 2.1% per year, HR 0.99); 38.7% vs 17.4% lost at least 5% at 1 year. [[Bohula2018CAMELLIA]] The FDA later reviewed cancer risk in the same trial. [[Sharretts2020]]'},
 {y:2021.42,d:'Jun 2021',k:'appr',l:'Semaglutide 2.4 mg (Wegovy) approved',
  txt:'Wegovy injection received its original US approval on 4 June 2021, [[FDA-DrugsAtFDA-AOM]] and its label now also covers cardiovascular risk reduction in adults with established cardiovascular disease. [[FDA-Wegovy]]'},
 {y:2023.85,d:'Nov 2023',k:'appr',l:'Tirzepatide (Zepbound) approved',
  txt:'Zepbound received its original US approval on 8 November 2023. [[FDA-DrugsAtFDA-AOM]] It is also indicated for moderate-to-severe obstructive sleep apnoea in adults with obesity. [[FDA-Zepbound]]'},
 {y:2025.97,d:'Dec 2025',k:'appr',l:'Semaglutide tablets (Wegovy) approved',
  txt:'Wegovy tablets received their original US approval on 22 December 2025. [[FDA-DrugsAtFDA-AOM]] They are indicated for adults, not children. [[FDA-Wegovy]]'},
 {y:2026.57,d:'Jul 2026',k:'appr',l:'Orforglipron (Foundayo) label',
  txt:'Orforglipron, a small-molecule, non-peptide oral GLP-1 receptor agonist, is FDA-approved as Foundayo; it carries the same class boxed warning as the injectable incretin medicines. [[FDA-Foundayo]]'}
];
const OM_HKIND={appr:'approved',harm:'harm found',trial:'safety trial'};

inits.othermeds=()=>{
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const frac=v=>v-Math.floor(v);
  /* ---- small glyphs ---- */
  const tg=(x,y,a=1)=>`<g style="opacity:${f1(a)}"><rect x="${f1(x-2)}" y="${f1(y-8)}" width="4" height="16" rx="1.5" style="fill:var(--fat-line)"/>`+
    [-6,0,6].map(d=>`<path d="M${f1(x+2)} ${f1(y+d)}q4 -3 8 0t8 0" style="fill:none;stroke:var(--fat);stroke-width:3;stroke-linecap:round"/>`).join('')+'</g>';
  const lipase=(x,y,r,blocked)=>{const a=.5;const m=`M${f1(x)} ${f1(y)}L${f1(x+r*Math.cos(-a))} ${f1(y+r*Math.sin(-a))}A${r} ${r} 0 1 0 ${f1(x+r*Math.cos(a))} ${f1(y+r*Math.sin(a))}Z`;
    return `<path d="${m}" style="fill:${blocked?'var(--device)':'var(--brand)'};opacity:${blocked?.55:.85};stroke:var(--panel);stroke-width:1.2"/>`};
  const ring=(x,y,u,col='var(--rx-drug)')=>{const q=frac(u*3);return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(7+q*12)}" style="fill:none;stroke:${col};stroke-width:2;opacity:${f1(1-q)}"/>`};
  const frame=(x,y,w,h,title)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--field);stroke:var(--line);stroke-width:1.2"/>`+
    T(x+10,y+16,OM_LBL.closeup.toUpperCase(),'t-xs','letter-spacing:.08em')+T(x+10,y+30,title,'t-xs','fill:var(--ink);font-weight:700');
  /* ---- close-ups: each takes the panel box and the step's local progress u ---- */
  function cOrl(x,y,w,h,u){
    const wy=y+40,inh=ramp(u,.3,.5);let s='';
    s+=`<rect x="${f1(x+4)}" y="${f1(wy)}" width="${f1(w-8)}" height="16" style="fill:var(--gut);stroke:var(--gut-line);stroke-width:1"/>`;
    let v='';for(let i=0;i<=Math.floor((w-8)/12);i++){const vx=x+4+i*12;v+=`<path d="M${f1(vx)} ${f1(wy+16)}q6 9 12 0" style="fill:var(--gut);stroke:var(--gut-line);stroke-width:1"/>`}s+=v;
    s+=T(x+w/2,wy+34,OM_LBL.wall,'t-xs t-mid');
    const L=[[x+w*.32,y+h*.6],[x+w*.68,y+h*.74]];
    L.forEach((p,i)=>{s+=lipase(p[0],p[1],10,inh>.98)});
    s+=T(L[0][0],L[0][1]+22,OM_LBL.lipase,'t-xs t-mid');
    /* the drug docks on each lipase */
    L.forEach((p,i)=>{const q=ramp(u,.28+i*.06,.48+i*.04);if(q<=0)return;const sx=x+16+i*30,sy=wy+24;
      s+=hormoneDot(lerp(sx,p[0]+9,ease(q)),lerp(sy,p[1],ease(q)),'drug',{r:4})});
    /* triglycerides drift left to right */
    for(let k=0;k<5;k++){const p=frac(u*1.5+k/5),mx=x+12+p*(w-24),my=y+h*.5+(k%3)*14+4;
      const lx=L[k%2][0];
      if(inh<.5&&mx>lx){const q=clamp((mx-lx)/50);
        [-1,0,1].forEach(j=>{s+=`<circle cx="${f1(mx+j*7)}" cy="${f1(lerp(my,wy+20,q))}" r="2.6" style="fill:var(--fat-line);opacity:${f1(1-q*.85)}"/>`})}
      else s+=tg(mx,my,mx>x+w-26?.4:1)}
    s+=T(x+w/2,y+h-12,inh<.5?OM_LBL.splits:OM_LBL.blocked,'t-xs t-mid','fill:var(--ink);font-weight:700');
    return s}
  function synapse(x,y,w,h){const cx=x+w/2;
    return `<path d="M${f1(cx-58)} ${f1(y+44)}Q${f1(cx-62)} ${f1(y+104)} ${f1(cx)} ${f1(y+106)}Q${f1(cx+62)} ${f1(y+104)} ${f1(cx+58)} ${f1(y+44)}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.4"/>`+
      `<path d="M${f1(cx-62)} ${f1(y+150)}Q${f1(cx)} ${f1(y+136)} ${f1(cx+62)} ${f1(y+150)}L${f1(cx+62)} ${f1(y+162)}L${f1(cx-62)} ${f1(y+162)}Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.4"/>`+
      [-30,-10,10,30].map(d=>`<path d="M${f1(cx+d-5)} ${f1(y+143+Math.abs(d)*.06)}q5 6 10 0" style="fill:none;stroke:var(--brain-line);stroke-width:2"/>`).join('')}
  function cPhen(x,y,w,h,u){const cx=x+w/2,rel=ramp(u,.15,.75);let s=synapse(x,y,w,h);
    s+=hormoneDot(cx-30,y+62,'drug',{r:4,op:ramp(u,0,.12)});
    const rr=rng(9);
    for(let i=0;i<4;i++){const vx=cx-24+i*16,vy=lerp(y+70,y+96,ramp(rel,i*.12,i*.12+.4));s+=`<circle cx="${f1(vx)}" cy="${f1(vy)}" r="6" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1"/><circle cx="${f1(vx)}" cy="${f1(vy)}" r="2" style="fill:var(--ink);opacity:.6"/>`}
    const n=Math.round(rel*22);for(let i=0;i<n;i++){const dx=(rr()-.5)*96,dy=rr()*26;s+=`<circle cx="${f1(cx+dx)}" cy="${f1(y+112+dy)}" r="2.2" style="fill:var(--ink);opacity:.7"/>`}
    s+=T(cx,y+180,OM_LBL.released,'t-xs t-mid','fill:var(--ink);font-weight:700');
    s+=`<rect x="${f1(x+10)}" y="${f1(y+h-34)}" width="${f1(w-20)}" height="26" rx="6" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(ramp(u,.5,.7))}"/>`;
    s+=`<g style="opacity:${f1(ramp(u,.5,.7))}">`+T(cx,y+h-23,OM_LBL.topi,'t-xs t-mid')+T(cx,y+h-12,OM_LBL.topi2,'t-xs t-mid')+'</g>';
    return s}
  function cNB(x,y,w,h,u){const cx=x+w/2,b=ramp(u,.2,.45),nb=ramp(u,.5,.7);let s=synapse(x,y,w,h);
    /* dopamine transporter on the left of the terminal */
    const tx=cx-50,ty=y+92;
    s+=`<rect x="${f1(tx-6)}" y="${f1(ty-10)}" width="12" height="20" rx="4" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1.4"/>`;
    if(b<1)s+=`<path d="M${f1(tx+2)} ${f1(ty+28)}L${f1(tx+2)} ${f1(ty+12)}" class="arrow" style="opacity:${f1(1-b)}" marker-end="url(#omAr)"/>`;
    if(b>0)s+=hormoneDot(lerp(tx-26,tx,ease(b)),ty,'drug',{r:4});
    const rr=rng(4),n=Math.round(8+b*14);for(let i=0;i<n;i++){const dx=(rr()-.5)*96,dy=rr()*24;s+=`<circle cx="${f1(cx+dx)}" cy="${f1(y+113+dy)}" r="2.2" style="fill:var(--ink);opacity:.7"/>`}
    s+=T(x+8,y+62,OM_LBL.dat,'t-xs');
    /* opioid receptor on the right, capped by naltrexone */
    const ox=cx+46,oy=y+146;
    s+=`<path d="M${f1(ox)} ${f1(oy)}L${f1(ox)} ${f1(oy-10)}M${f1(ox)} ${f1(oy-10)}L${f1(ox-6)} ${f1(oy-17)}M${f1(ox)} ${f1(oy-10)}L${f1(ox+6)} ${f1(oy-17)}" style="stroke:var(--brain-line);stroke-width:2.4;stroke-linecap:round"/>`;
    if(nb>0)s+=`<g style="opacity:${f1(nb)}">`+hormoneDot(ox,lerp(oy-40,oy-21,ease(nb)),'drug',{r:4})+'</g>';
    s+=T(cx,y+182,OM_LBL.bup,'t-xs t-mid','fill:var(--ink);font-weight:700;opacity:'+f1(.3+.7*b));
    s+=T(cx,y+198,OM_LBL.nal,'t-xs t-mid','fill:var(--ink);font-weight:700;opacity:'+f1(.3+.7*nb));
    return s}
  function cSet(x,y,w,h,u){const cx=x+w/2,my=y+h*.56,dk=ramp(u,.25,.55),act=ramp(u,.5,.8);let s='';
    s+=`<rect x="${f1(x+4)}" y="${f1(my-6)}" width="${f1(w-8)}" height="12" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1"/>`;
    for(let i=0;i<7;i++){const hx=cx-21+i*7;s+=`<rect x="${f1(hx-2.6)}" y="${f1(my-14)}" width="5.2" height="28" rx="2.6" style="fill:${act>0?'var(--pomc)':'var(--panel)'};fill-opacity:${f1(.25+.75*act)};stroke:var(--brain-line);stroke-width:1"/>`}
    s+=T(cx+30,my-18,OM_LBL.mc4r,'t-xs','fill:var(--ink);font-weight:700');
    /* the missing natural ligand */
    s+=`<circle cx="${f1(x+30)}" cy="${f1(y+58)}" r="8" style="fill:none;stroke:var(--muted);stroke-dasharray:3 2"/><path d="M${f1(x+25)} ${f1(y+53)}l10 10m0 -10l-10 10" style="stroke:var(--bad);stroke-width:1.6"/>`;
    s+=T(x+42,y+56,'no '+OM_LBL.msh,'t-xs')+T(x+42,y+70,OM_LBL.nomsh,'t-xs');
    s+=hormoneDot(lerp(x+w-30,cx,ease(dk)),lerp(y+52,my-22,ease(dk)),'drug',{r:5});
    if(act>0){for(let i=0;i<3;i++){const q=frac(u*2+i/3);s+=`<circle cx="${f1(cx)}" cy="${f1(lerp(my+16,y+h-34,q))}" r="3" style="fill:var(--pomc);opacity:${f1(act*(1-q))}"/>`}
      s+=`<path d="M${f1(cx)} ${f1(my+16)}L${f1(cx)} ${f1(y+h-30)}" class="arrow" style="stroke:var(--pomc);opacity:${f1(act)}" marker-end="url(#omArP)"/>`}
    s+=T(cx,y+h-12,OM_LBL.signal+(act>.5?' ↑':''),'t-xs t-mid','fill:var(--ink);font-weight:700;opacity:'+f1(.35+.65*act));
    return s}
  function cLir(x,y,w,h,u){const px=x+30,py=y+50,pw=w-44,ph=h-112,X=hh=>px+pw*hh/24,Y=v=>py+ph-ph*v,up=u*24;let s='';
    s+=`<rect x="${f1(px)}" y="${f1(py)}" width="${f1(pw)}" height="${f1(ph)}" style="fill:var(--panel)"/>`;
    [0,12,24].forEach(hh=>{s+=T(X(hh),py+ph+12,hh,'t-xs t-mid')});
    s+=T(px+pw,py+ph+24,OM_LBL.hours,'t-xs t-end')+T(px-4,py-6,OM_LBL.level,'t-xs');
    s+=`<line x1="${f1(px)}" y1="${f1(py+ph)}" x2="${f1(px+pw)}" y2="${f1(py+ph)}" class="axis"/><line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px)}" y2="${f1(py+ph)}" class="axis"/>`;
    /* native GLP-1: gone within minutes */
    const nat=clamp(1-up*8);s+=`<path d="M${f1(X(0))} ${f1(Y(1))}L${f1(X(Math.min(up,.15)))} ${f1(Y(nat))}" style="fill:none;stroke:var(--glp1);stroke-width:2.4"/>`;
    /* liraglutide: schematic decay from a peak with a 13 h half-life */
    const P=[];for(let i=0;i<=48;i++){const hh=i/2;if(hh>up)break;P.push([X(hh),Y(Math.pow(.5,hh/13))])}
    if(P.length>1)s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--rx-drug);stroke-width:2.6"/>`;
    if(up>=13)s+=`<path d="M${f1(X(13))} ${f1(py+ph)}L${f1(X(13))} ${f1(Y(.5))}L${f1(px)} ${f1(Y(.5))}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/>`+T(X(13)+3,Y(.5)-5,OM_LBL.half,'t-xs','fill:var(--ink);font-weight:700');
    s+=T(px+4,py+ph+38,OM_LBL.native,'t-xs','fill:var(--ink)');
    s+=`<rect x="${f1(px-10)}" y="${f1(py+ph+32)}" width="10" height="3" style="fill:var(--glp1)"/><rect x="${f1(px-10)}" y="${f1(py+ph+46)}" width="10" height="3" style="fill:var(--rx-drug)"/>`+T(px+4,py+ph+51,OM_LBL.lira,'t-xs','fill:var(--ink)');
    return s}
  const CLOSE=[cOrl,cPhen,cNB,cSet,cLir];

  /* ---- the mechanism player ---- */
  const svg=$('#omSvg'),rg=$('#omT'),pb=$('#omPlay'),noteEl=$('#omNote'),stepsEl=$('#omSteps');
  let setActive=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const i=Math.min(4,Math.floor(t/.2)),u=clamp((t-i*.2)/.2),D=OM_SVGTXT[i];
    const L=N?{hx:14,bx:6,by:72,bs:1,cx:8,cy:236,cw:190,ch:226,gx:212,gy:234,gs:.86,band:488,bw:376}
             :{hx:16,bx:6,by:70,bs:1.08,cx:300,cy:62,cw:180,ch:228,gx:500,gy:50,gs:.86,band:306,bw:688};
    let s=`<defs>${marker('omAr','var(--muted)',6)}${marker('omArP','var(--pomc)',6)}</defs>`;
    s+=T(L.hx,28,D.name,'t-big','font-size:20px')+T(L.hx,46,D.cls,'t-sm');
    /* brain */
    let pomc=.25,agrp=.25,mc4r=.25;
    if(i===3){pomc=0;agrp=.3;mc4r=.1+.9*ramp(u,.5,.8)}
    if(i===4){const q=ramp(u,.3,.7);pomc=.2+.8*q;agrp=.7-.55*q;mc4r=.2+.6*q}
    const br=brainHypothalamus(L.bx,L.by,L.bs,{pomc,agrp,mc4r,labels:true});
    s+=`<g style="opacity:${i===0?.35:1}">`+br.svg;
    const BT=p=>[L.bx+p[0]*L.bs,L.by+p[1]*L.bs];
    if(i===2){const a=BT([80,94]),c=BT([58,58]),b=BT([40,66]),g=ramp(u,.3,.8);
      s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--rx-drug);stroke-width:${f1(2+3*g)};stroke-linecap:round;opacity:${f1(.35+.65*g)}"/>`;
      s+=`<circle cx="${f1(a[0])}" cy="${f1(a[1])}" r="4" style="fill:var(--rx-drug)"/><circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="4" style="fill:var(--rx-drug)"/>`+kitLabel(b[0]+2,b[1]-30*L.bs,OM_LBL.reward,{})}
    if(i>0&&i<3)s+=ring(br.at.hypo[0],br.at.hypo[1],u);
    if(i===1&&u>.5)s+=kitLabel(br.at.hypo[0],br.at.hypo[1]+30*L.bs,OM_LBL.appetite,{a:'m'});
    if(i===3)s+=ring(br.at.pvn[0],br.at.pvn[1],u,'var(--pomc)');
    if(i===4)s+=ring(br.at.pomc[0],br.at.pomc[1],u,'var(--pomc)');
    s+='</g>';
    /* gut */
    const gt=gutTract(L.gx,L.gy,L.gs,{labels:true,dim:i===0?0:.75,fill:0,glow:{ileum:i===4?.4+.6*Math.abs(Math.sin(u*Math.PI*2)):0},food:i===0?frac(u*1.15):null});
    s+=gt.svg;
    if(i===0){const fp=gt.route(frac(u*1.15));if(u>.5)s+=`<circle cx="${f1(fp[0])}" cy="${f1(fp[1])}" r="7" style="fill:var(--fat);stroke:var(--fat-line);stroke-width:1.4;opacity:.9"/>`;
      s+=ring(gt.at.jejunum[0],gt.at.jejunum[1],u,'var(--brand)');
      if(u>.55)s+=kitLabel(L.gx+100*L.gs,L.gy+270*L.gs+(N?14:10),OM_LBL.colon,{a:'m'})}
    if(i===4)s+=kitLabel(gt.at.ileum[0],gt.at.ileum[1]+22,OM_LBL.lcells,{a:'m'});
    /* close-up panel and its leader line */
    s+=frame(L.cx,L.cy,L.cw,L.ch,D.close)+CLOSE[i](L.cx,L.cy,L.cw,L.ch,u);
    const tgt=i===0?gt.at.jejunum:(i===3?br.at.pvn:i===4?br.at.pomc:br.at.hypo);
    const from=N?(i===0?[L.cx+L.cw,L.cy+60]:[L.cx+40,L.cy]):(i===0?[L.cx+L.cw,L.cy+50]:[L.cx,L.cy+50]);
    s+=`<path d="M${f1(from[0])} ${f1(from[1])}L${f1(tgt[0])} ${f1(tgt[1])}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4;opacity:.8"/>`;
    /* the band: the trial result builds */
    const B=D.band,g=ease(ramp(u,.4,.8)),y0=L.band,bx=N?118:200,bw=L.bw-(N?110:200);
    s+=`<line x1="${L.hx}" x2="${f1(L.hx+L.bw-6)}" y1="${y0}" y2="${y0}" class="axis"/>`;
    s+=T(L.hx,y0+18,B.lab,'t-xs','fill:var(--ink);font-weight:700');
    [[B.a,B.an,'var(--rx-drug)'],[B.b,B.bn,B.both?'var(--rx-drug)':'var(--figure)']].forEach((r,k)=>{const yy=y0+28+k*22,v=r[0]*g,ww=bw*v/B.max;
      s+=T(bx-8,yy+10,r[1],'t-xs t-end')+`<rect x="${bx}" y="${yy}" width="${f1(bw)}" height="13" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${yy}" width="${f1(Math.max(0,ww))}" height="13" rx="3" style="fill:${r[2]};opacity:${B.both&&k?.6:1}"/>`;
      if(g>.05)s+=T(bx+ww+6,yy+10,B.fmt(v),'t-xs','fill:var(--ink);font-weight:700')});
    if(!N)s+=T(L.hx+L.bw-6,y0+18,OM_LBL.trial,'t-xs t-end');
    svg.innerHTML=s;
    const p=phaseOf(OM_STEPS,t);noteEl.innerHTML=noteHTML(OM_STEPS[p]);setActive(p);
  }
  const stop=playWire(rg,pb,draw,16000,'%t:player.replay%','othermeds');
  setActive=stepWire(stepsEl,OM_STEPS,rg,draw,stop);
  /* a medicine's step button plays its own fifth of the timeline, so the site of action animates */
  let seg=null;const segStop=()=>{if(seg){seg();seg=null}};
  stepsEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;segStop();const k=+b.dataset.st,a=OM_STEPS[k].from+.005,z=OM_STEPS[k].at;
    if(RM){rg.value=z;draw(z);return}seg=animate(2200,q=>{const v=lerp(a,z,q);rg.value=v;draw(v)},()=>{seg=null})});
  rg.addEventListener('input',segStop);pb.addEventListener('click',segStop);
  {const prev=onHide.othermeds;onHide.othermeds=()=>{prev&&prev();segStop()}}
  draw(+rg.value);

  /* ---- the weight comparison ---- */
  const bsvg=$('#omBars'),bbtn=$('#omBarBtns'),bnote=$('#omBarNote');
  let view=0,shown=OM_BARS.map(()=>[0,0]),stopB=null;
  const target=v=>OM_BARS.map(r=>{const V=OM_VIEWS[v].id;if(V==='diff')return r.d==null?[0,0]:[r.diff!=null?r.diff:+(r.d-r.p).toFixed(1),0];
    if(V==='raw')return r.d==null?[0,0]:[r.d,r.p];return r.r5?[r.r5[0],r.r5[1]]:[0,0]});
  function drawBars(vals){
    const N=vb(bsvg,'720 360','400 520'),V=OM_VIEWS[view];
    const L=N?{lx:12,bx:12,bw:330,top:34,rh:68,lab:0}:{lx:12,bx:262,bw:400,top:34,rh:44,lab:1};
    const X=v=>L.bx+L.bw*v/V.max;let s='';
    s+=T(L.bx,20,V.unit,'t-xs','fill:var(--ink);font-weight:700');
    const gy0=L.top,gy1=L.top+OM_BARS.length*L.rh;
    V.ticks.forEach(k=>{s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${gy0}" y2="${gy1}" class="grid"/>`+T(X(k),gy1+14,k,'t-xs t-mid')});
    OM_BARS.forEach((r,i)=>{const y=L.top+i*L.rh,two=V.id==='raw',by=L.lab?y+8:y+30,bh=two?11:16;
      if(r.ref)s+=`<rect x="0" y="${f1(y+1)}" width="${N?400:720}" height="${f1(L.rh-2)}" style="fill:var(--panel-2);opacity:.6"/>`;
      s+=T(L.lx,L.lab?y+18:y+14,r.n,'t-xs','fill:var(--ink);font-weight:700')+T(L.lx,L.lab?y+31:y+26,r.tr,'t-xs');
      const miss=r.d==null&&V.id!=='r5'?OM_BLBL.kg:(V.id==='r5'&&!r.r5?OM_BLBL.nr:'');
      if(miss){s+=T(L.bx,by+12,miss,'t-xs','font-style:italic');return}
      const v=vals[i];
      s+=`<rect x="${L.bx}" y="${f1(by)}" width="${f1(Math.max(0,X(v[0])-L.bx))}" height="${bh}" rx="3" style="fill:var(--rx-drug);opacity:${r.ref?.55:1}"/>`;
      s+=T(X(v[0])+5,by+bh-2,V.id==='diff'?f1(v[0])+OM_BLBL.pts:f1(v[0])+'%','t-xs','fill:var(--ink);font-weight:700');
      if(two||V.id==='r5'){const y2=by+bh+3;s+=`<rect x="${L.bx}" y="${f1(y2)}" width="${f1(Math.max(0,X(v[1])-L.bx))}" height="${two?11:9}" rx="3" style="fill:var(--figure)"/>`+T(X(v[1])+5,y2+(two?9:8),f1(v[1])+'%','t-xs')}
    });
    bsvg.innerHTML=s;
  }
  function setView(v){view=v;$$('button',bbtn).forEach((b,k)=>b.setAttribute('aria-pressed',k===v));
    bnote.innerHTML=`<div class="kicker">${OM_VIEWS[v].n}</div><p>${OM_VIEWS[v].note}</p>`;
    const from=shown.map(a=>a.slice()),to=target(v);if(stopB)stopB();
    stopB=animate(650,p=>{const e=ease(p);shown=from.map((a,i)=>[lerp(a[0],to[i][0],e),lerp(a[1],to[i][1],e)]);drawBars(shown)},()=>{stopB=null})}
  bbtn.innerHTML=OM_VIEWS.map((v,i)=>`<button class="btn" aria-pressed="false" data-v="${i}">${v.n}</button>`).join('');
  bbtn.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(b)setView(+b.dataset.v)});
  shown=target(0);setView(0);drawBars(shown);
  {const prev=redraws.othermeds;redraws.othermeds=()=>{prev&&prev();drawBars(shown)}}

  /* ---- the cautionary timeline ---- */
  const hsvg=$('#omHist'),hr=$('#omHistT'),hp=$('#omHistPlay'),hnote=$('#omHistNote');
  const Y0=1945,Y1=2027,yOf=t=>t<=.2?lerp(Y0,1995,t/.2):lerp(1995,Y1,(t-.2)/.8);
  function drawHist(t){
    const N=vb(hsvg,'720 470','400 500'),yr=yOf(t),n=OM_HIST.length;
    const L=N?{dx:58,lx:76,tx:94,top:58,rh:27.5,dt:'t-xs'}:{dx:96,lx:116,tx:138,top:52,rh:25.5,dt:'t-sm'},fs=N?'10.5px':'13.5px';
    let s='',last=-1;OM_HIST.forEach((e,i)=>{if(yr>=e.y)last=i});
    s+=T(N?388:704,30,Math.min(2026,Math.floor(yr)),'t-big t-end','font-size:26px');
    const rowY=i=>L.top+i*L.rh;
    /* the line fills down to "now", between the last event and the next */
    const nxt=OM_HIST[last+1],cur=OM_HIST[last];let fy=rowY(0)-14;
    if(last>=0){fy=rowY(last);if(nxt)fy+=L.rh*clamp((yr-cur.y)/(nxt.y-cur.y))}
    s+=`<line x1="${L.lx}" x2="${L.lx}" y1="${f1(rowY(0)-14)}" y2="${f1(rowY(n-1))}" style="stroke:var(--line);stroke-width:3"/>`;
    s+=`<line x1="${L.lx}" x2="${L.lx}" y1="${f1(rowY(0)-14)}" y2="${f1(fy)}" style="stroke:var(--tx);stroke-width:3"/>`;
    s+=`<circle cx="${L.lx}" cy="${f1(fy)}" r="4" style="fill:var(--tx)"/>`;
    OM_HIST.forEach((e,i)=>{const y=rowY(i),on=i<=last,op=on?1:.28,col=e.k==='appr'?'var(--good)':e.k==='harm'?'var(--bad)':'var(--warn)';
      s+=`<g style="opacity:${op}">`+T(L.dx,y+4,e.d,L.dt+' t-end');
      if(e.k==='appr')s+=`<circle cx="${L.lx}" cy="${y}" r="6" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
      else if(e.k==='harm')s+=`<circle cx="${L.lx}" cy="${y}" r="7" style="fill:var(--panel);stroke:${col};stroke-width:2"/><path d="M${L.lx-3.5} ${y-3.5}l7 7m0 -7l-7 7" style="stroke:${col};stroke-width:2"/>`;
      else s+=`<path d="M${L.lx} ${y-7}l7 7l-7 7l-7 -7z" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
      s+=T(L.tx,y+4,e.l,i===last?'t-lbl':'t-sm','font-size:'+fs+(i===last?'':';fill:var(--ink)'));
      if(!N)s+=T(704,y+4,OM_HKIND[e.k],'t-xs t-end');
      s+='</g>'});
    hsvg.innerHTML=s;
    const e=OM_HIST[Math.max(0,last)];
    hnote.innerHTML=`<div class="kicker">${e.d} · ${OM_HKIND[e.k]}</div><h4>${e.l}</h4><p>${e.txt}</p>`;
  }
  playWire(hr,hp,drawHist,14000,'%t:player.replay%','othermeds');
  drawHist(+hr.value);
};
