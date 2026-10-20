
/* =============== 3.4 complement & FcRn inhibitors over trial weeks =============== */
/* monotone cubic (Fritsch-Carlson) through published points: it never overshoots, so an
   interpolated line can only move between the values it connects */
function biMono(P){const n=P.length,x=P.map(p=>p[0]),y=P.map(p=>p[1]),d=[],t=[];
  for(let i=0;i<n-1;i++)d.push((y[i+1]-y[i])/(x[i+1]-x[i]));
  t[0]=d[0];t[n-1]=d[n-2];
  for(let i=1;i<n-1;i++)t[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){t[i]=t[i+1]=0;continue}const a=t[i]/d[i],b=t[i+1]/d[i],h=a*a+b*b;if(h>9){const k=3/Math.sqrt(h);t[i]=k*a*d[i];t[i+1]=k*b*d[i]}}
  return v=>{if(v<=x[0])return y[0];if(v>=x[n-1])return y[n-1];let i=0;while(v>x[i+1])i++;
    const h=x[i+1]-x[i],s=(v-x[i])/h,s2=s*s,s3=s2*s;
    return (2*s3-3*s2+1)*y[i]+(s3-2*s2+s)*h*t[i]+(-2*s3+3*s2)*y[i+1]+(s3-s2)*h*t[i+1]}}
/* a curve through knots, each [week, value, kind]. tau>0 interpolates in warped time 1-exp(-w/tau),
   a schematic "fast early, then levelling" shape; ext continues it through extension knots */
function biCurve(pts,tau,ext){const W=v=>tau?1-Math.exp(-v/tau):v;
  const f=biMono(pts.map(p=>[W(p[0]),p[1]])),last=pts[pts.length-1],wEnd=last[0];
  let g=null,wMax=wEnd;if(ext&&ext.length){const E=[[wEnd,last[1]],...ext.map(p=>[p[0],p[1]])];g=biMono(E);wMax=E[E.length-1][0]}
  const fn=w=>w<0?null:w<=wEnd+1e-9?f(W(Math.min(w,wEnd))):(g&&w<=wMax+1e-9?g(w):null);fn.wMax=wMax;return fn}
const biH=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const biRng=(a,b,s)=>{const r=[];for(let v=a;v<=b+1e-9;v+=s)r.push(+v.toFixed(2));return r};

/* drug data. Kinds: 'f' = value printed in a trial paper (filled dot); 'o' = label, press,
   congress, sponsor-model or calculated value (open dot). */
const BI_D={
 ecu:{cls:'c5',nm:'Eculizumab',br:'Soliris',trial:'REGAIN',end:26,span:26,oleSpan:160,glyph:'mab',
  gapPub:[-1.9,'label, repeated measures'],dr:[[0,0,'f'],[26,-4.2,'o']],drTau:5,pb:[[0,0,'f'],[26,-2.3,'o']],pbTau:5,
  sw:[[27,-3.9,'o'],[156,-6.1,'o']],
  doses:[[0,'f'],[1,'f'],[2,'f'],[3,'f'],...biRng(4,26,2).map(v=>[v,'f'])],oleDoses:biRng(28,160,2),
  pd:{sch:true},vacc:true,
  r2:'Week-26 means: the label\'s repeated-measures analysis (open dots)',
  r3:'Paper\'s worst-rank primary: p=0.0698; the label lists p=0.014',
  oleR2:'Extension: switched from placebo, −1.6 at week 1 and −3.8 at',oleR3:'month 30 from open-label baseline (n=15); dots are calculated',
  ep:['PRIMARY ENDPOINT · REGAIN · WEEK 26','Prespecified: worst-rank ANCOVA, MG-ADL','Paper: rank difference −11.7, p=0.0698','  → not statistically significant','Label, repeated measures: −4.2 vs −2.3','  difference −1.9 (−3.3 to −0.6), p=0.006','Label also lists worst-rank p=0.014;','  it does not explain the difference'],
  sf:['Boxed warning: serious meningococcal infections; REMS','REGAIN: no meningococcal infections; extension: 1, resolved','MG exacerbations 10% vs 24%; rescue therapy 10% vs 19%','Safety card carried until 3 months after the last dose'],
  lab:'US label: AChR+ gMG in adults and children 6 and older; boxed warning for meningococcal infections; REMS. EU: refractory AChR+ adults (2017). Japan: December 2017. [[FDASoliris2026,FDADrugsFDA2026,AlexionEU2017,AlexionJapan2017]]'},
 rav:{cls:'c5',nm:'Ravulizumab',br:'Ultomiris',trial:'CHAMPION-MG',end:26,span:26,oleSpan:166,glyph:'mab',
  gapPub:[-1.6,'published'],dr:[[0,0,'f'],[26,-3.1,'f']],drTau:2,pb:[[0,0,'f'],[26,-1.4,'f']],pbTau:3,
  oleDr:[[60,-4.0,'f'],[164,-4.0,'f']],sw:[[60,-3.1,'o'],[164,-3.5,'o']],
  ann:[{w:1,txt:'improves within 1 week'}],
  doses:[[0,'f'],[2,'f'],[10,'f'],[18,'f'],[26,'f']],oleDoses:biRng(34,162,8),
  pd:{pts:[[0,0,'x'],[0.1,100,'f'],[26,100,'f']],tau:0,lab:'complete: free C5 below 0.5 µg/mL'},vacc:true,
  r2:'Week-26 means from the paper and the label (filled dots)',r3:'Median time to a 2-point MG-ADL gain: 2.1 weeks (post hoc)',
  oleR2:'From start: −4.0 at weeks 60 and 164 (same baseline)',oleR3:'Placebo → drug: −1.7 and −2.1 from open-label baseline (calculated)',
  ep:['PRIMARY ENDPOINT · CHAMPION-MG · WEEK 26','MG-ADL −3.1 vs −1.4 (paper and label)','  difference −1.6 (−2.6 to −0.7), p<0.001','QMG −2.8 vs −0.8; difference −2.0','MG-ADL ≥3 points: 56.7% vs 34.1%','QMG ≥5 points: 30.0% vs 11.3%'],
  sf:['Boxed warning: serious meningococcal infections; REMS','No meningococcal infections reported through the final extension','Serious infections ≥9% vs 4%; 1 fatal COVID-19 pneumonia','Safety card carried until 8 months after the last dose'],
  lab:'US label: AChR+ adults (27 April 2022). EU: add-on therapy for AChR+ adults (September 2022). Japan: 2022, AChR+ adults with an inadequate response to, or who cannot have, IVIg or plasma exchange. Boxed warning; REMS. [[FDAUltomiris2025,FDADrugsFDA2026,MGNewsUltomirisEU2022,MGNewsUltomirisJapan2022]]'},
 zil:{cls:'c5',nm:'Zilucoplan',br:'Zilbrysq',trial:'RAISE',end:12,span:12,oleSpan:60,glyph:'pep',
  gapPub:[-2.09,'published'],dr:[[0,0,'f'],[12,-4.39,'f']],drTau:2,pb:[[0,0,'f'],[12,-2.30,'f']],pbTau:2.5,
  oleDr:[[24,-6.06,'f'],[60,-6.04,'f']],sw:[[24,-6.46,'f'],[60,-6.51,'f']],model:{w:24,c:-2.00,d:-4.55},
  ann:[{w:1,txt:'beats placebo at week 1 (network analysis)'}],
  daily:true,doses:[],oleDoses:[],
  pd:{pts:[[0,0,'x'],[1,97.5,'o'],[12,97.5,'o']],tau:.35,lab:'97.5% inhibited by end of week 1 (label)'},vacc:true,
  sfx:[{w:56,lab:'morphea: mostly after 1 year',ole:true}],
  r2:'Responders without rescue (label): MG-ADL ≥3, 73.1% vs 46.1%',r3:'No placebo data exist beyond week 12',
  oleR2:'RAISE-XT, from double-blind baseline: −6.04 at week 60;',oleR3:'open diamonds: sponsor model of a week-24 control, not observed',
  ep:['PRIMARY ENDPOINT · RAISE · WEEK 12','MG-ADL −4.39 vs −2.30','  difference −2.09 (−3.24 to −0.95)','  p=0.0004; QMG difference −2.94','Responders without rescue (label):','  MG-ADL ≥3 points: 73.1% vs 46.1%','  QMG ≥5 points: 58% vs 33%'],
  sf:['Boxed warning: serious meningococcal infections; REMS','Label: injection-site reactions 29% vs 16%; lipase up 7% vs 0%','Warnings: pancreatitis and pancreatic cysts; morphea (extension)','Safety card carried until 2 months after the last dose'],
  lab:'Approved first in Japan (25 September 2023), then the US (17 October 2023) and the EU (1 December 2023, add-on therapy for AChR+ adults). Boxed warning; ZILBRYSQ REMS. [[UCBJapan2023,FDADrugsFDA2026,EMAZilbrysq2026,FDAZilbrysq2026]]'},
 gef:{cls:'c5',nm:'Gefurulimab',br:'Klygefa (EU)',trial:'PREVAIL',end:26,span:26,oleSpan:0,glyph:'nb',
  gapPub:[-1.6,'published'],dr:[[0,0,'f'],[26,-4.2,'f']],drTau:3,pb:[[0,0,'f'],[26,-2.6,'f']],pbTau:3,
  ann:[{w:1,txt:'week 1: difference −1.3 (published)'}],
  doses:biRng(0,25,1).map(v=>[v,'f']),oleDoses:[],
  pd:{sch:true},vacc:false,
  r2:'Week-26 means from the paper (filled dots)',r3:'Week 1 difference −1.3 (−1.9 to −0.8): arm means not given',
  ep:['PRIMARY ENDPOINT · PREVAIL · WEEK 26','MG-ADL −4.2 vs −2.6','  difference −1.6 (−2.4 to −0.8)','Week 1: difference −1.3 (−1.9 to −0.8)','MG-ADL ≥3 points: 65.6% vs 52.1%','QMG ≥5 points: 46.8% vs 28.0%'],
  sf:['No FDA decision found; EU committee positive opinion, Sep 2026','PREVAIL: no meningococcal infections reported','Injection-site reactions 9.9% vs 3.1%','A published label was not available in our sources'],
  lab:'EU: positive CHMP opinion on 17 September 2026 (Klygefa), as add-on therapy for AChR+ adults. No FDA decision was found in our sources. [[EMAKlygefa2026]]'},
 efg:{cls:'fcrn',nm:'Efgartigimod IV',br:'Vyvgart',trial:'ADAPT',end:26,span:26,oleSpan:78,glyph:'mab',
  dr:[[0,0,'f'],[4,-4.6,'o']],drTau:1.2,pb:null,resp:{d:68,p:30},
  cyc:{starts:[26,37.1,48.1,59.2,70.2],at:3,first:-5.0,rng:[-5.3,-7.5]},
  doses:[[0,'f'],[1,'f'],[2,'f'],[3,'f'],[10.1,'o'],[11.1,'o'],[12.1,'o'],[13.1,'o']],
  igg:{pts:[[0,0,'x'],[3,-55.9,'f'],[4,-61.3,'o'],[9,0,'o']],tau:0,cyc:[10.1],len:9,band:[7,11]},
  r2:'Primary endpoint: responders, not a mean difference',r3:'Week-4 mean −4.6: manufacturer congress data (open dot)',
  oleR2:'ADAPT+: −5.0 at week 3 of cycle 1; −5.3 to −7.5 in cycles 2 to 10',oleR3:'each from its own cycle baseline; spacing = mean 4.7 cycles a year',
  ep:['PRIMARY ENDPOINT · ADAPT · CYCLE 1','Responders: ≥2 MG-ADL points for ≥4 wk','AChR+: 68% (44/65) vs 30% (19/64)','  odds ratio 4.95 (2.21 to 11.53)','QMG responders 63.1% vs 14.1% (label)','Week-4 mean −4.6 from cycle baseline','  (press release; placebo mean not found)'],
  sf:['No boxed warning in our sources; no meningococcal vaccine needed','◆ immunisation review before each cycle; no live vaccines','Respiratory infection 33% vs 29%; UTI 10% vs 5% (label)'],
  lab:'US label since 8 May 2026: adults with gMG, with no antibody restriction (AChR+ only from December 2021). EU: add-on therapy for AChR+ adults (August 2022). Japan: January 2022. [[FDAVyvgart2026,FDADrugsFDA2026,EMAVyvgart2026,argenxJapan2022]]'},
 efs:{cls:'fcrn',nm:'Efgartigimod SC',br:'Vyvgart Hytrulo',trial:'ADAPT-SC',end:10,span:10,oleSpan:0,glyph:'mab',
  dr:[[0,0,'f'],[4,-5.1,'f']],drTau:1.2,pb:null,cmp:[[0,0,'f'],[4,-4.7,'f']],cmpTau:1.2,
  doses:[[0,'f'],[1,'f'],[2,'f'],[3,'f']],
  igg:{pts:[[0,0,'x'],[1,-40.1,'f'],[4,-66.4,'f'],[10,0,'o']],tau:0,cmp:[[0,0,'x'],[1,-39.6,'f'],[4,-62.2,'f'],[10,0,'o']]},
  r2:'Grey line: the IV comparator arm (−4.7 at week 4)',r3:'The bridge was judged on IgG, the primary endpoint',
  ep:['PRIMARY ENDPOINT · ADAPT-SC · WEEK 4','Total IgG fall, SC vs IV','  −66.4% vs −62.2%; difference −4.2%','  (95% CI −7.73 to −0.66)','  non-inferior within a 10% margin','No placebo arm: a bridging study','MG-ADL −5.1 (SC) vs −4.7 (IV)'],
  sf:['No boxed warning in our sources; live vaccines not advised','Injection-site reactions 38% (label); 46.1% over 2.6 years','Extension: all injection-site reactions mild or moderate'],
  lab:'US: Vyvgart Hytrulo approved 20 June 2023; the 1,000 mg prefilled syringe can be self-injected. Called Vyvdura in Japan. [[FDADrugsFDA2026,FDAVyvgartHytrulo2026]]'},
 roz:{cls:'fcrn',nm:'Rozanolixizumab',br:'Rystiggo',trial:'MycarinG',end:6.14,span:6.2,oleSpan:52,glyph:'mab',
  gapPub:[-2.59,'published, 7 mg/kg'],dr:[[0,0,'f'],[6.14,-3.37,'f']],drTau:1.5,pb:[[0,0,'f'],[6.14,-0.78,'f']],pbTau:1.5,
  cyc:{starts:[14,28,42],at:6.14,rng:[-3.2,-6.0]},
  doses:biRng(0,5,1).map(v=>[v,'f']),
  igg:{pts:[[0,0,'x'],[6.14,-71.45,'f']],tau:.8,max:-79,cycR:[-59.29,-71.45]},
  r2:'7 mg/kg arm shown; 10 mg/kg: −3.40 (difference −2.62)',r3:'Placebo −0.78: the smallest placebo change of the pivotal trials',
  oleR2:'Extensions: day-43 MG-ADL −3.2 to −6.0 across cycles 1 to 13',oleR3:'cycle spacing = median 98 days between starts',
  ep:['PRIMARY ENDPOINT · MycarinG · DAY 43','MG-ADL −3.37 (7 mg/kg), −3.40 (10 mg/kg)','  vs −0.78 placebo','  differences −2.59 and −2.62, p<0.0001','QMG −5.4 and −6.7 vs −1.9 (label)','Responder rates: not found in text'],
  sf:['Warning and precaution: aseptic meningitis','Headache 45% vs 19%; diarrhoea 25% vs 13%; fever 13% vs 1%','◆ immunisation review; live vaccines not advised'],
  lab:'US: AChR+ or MuSK+ adults (26 June 2023). Japan: 25 September 2023. EU: 5 January 2024. Warning: aseptic meningitis. [[FDARystiggo2026,FDADrugsFDA2026,UCBJapan2023,EMARystiggo2026]]'},
 nip:{cls:'fcrn',nm:'Nipocalimab',br:'Imaavy',trial:'Vivacity-MG3',end:23,span:24,oleSpan:0,glyph:'mab',
  gapPub:[-1.45,'published, weeks 22 to 24'],dr:[[0,0,'f'],[23,-4.70,'f']],drTau:3,pb:[[0,0,'f'],[23,-3.25,'f']],pbTau:4,avg:[22,24],
  doses:biRng(0,22,2).map(v=>[v,'f']),
  igg:{sch:-75,tau:.8},sfx:[{w:4,lab:'lipids peak (label)'}],
  r2:'Primary: MG-ADL averaged over weeks 22 to 24 (antibody+)',r3:'Placebo −3.25: the largest placebo response of the FcRn trials',
  ep:['PRIMARY ENDPOINT · VIVACITY-MG3','MG-ADL averaged over weeks 22 to 24','  −4.70 vs −3.25 (antibody-positive)','  difference −1.45 (−2.38 to −0.52)','  p=0.0024; QMG difference −2.8 (label)','Placebo improved by 3.25 points'],
  sf:['No boxed warning in our sources; live vaccines not advised','Label: peripheral oedema 12% vs 2%; muscle spasm 12% vs 3%','Cholesterol ≥240 mg/dL in 24%, peaking at week 4 (label)'],
  lab:'US: AChR+ or MuSK+ people aged 12 and older (29 April 2025), the first FcRn blocker labelled for adolescents. EU: 28 November 2025, add-on therapy. Japan: a filing was reported, no approval found. [[FDAImaavy2026,FDADrugsFDA2026,EMAImaavy2026]]'}
};

const BI_STEPS={
 ecu:[
  {from:0,at:0,k:'Trial entry',t:'REGAIN: who took part',txt:'REGAIN enrolled 125 adults with AChR-antibody-positive refractory generalised MG (MGFA class II to IV, MG-ADL 6 or more): 62 on eculizumab and 63 on placebo for 26 weeks, at 76 sites in 17 countries. Refractory meant failure of at least 2 immunosuppressants, or 1 plus chronic IVIg or plasma exchange, for 12 months. Meningococcal vaccination was required before the first dose. [[Howard2017]]',
   pt:'Everyone in this trial had MG that had not settled on several older treatments. Half received the drug and half a dummy infusion.',
   hook:'Eculizumab binds C5, the last common step before the membrane attack complex, so the complex cannot assemble at the junction. [[Howard2018]]'},
  {from:.4,at:2,k:'Induction',t:'Weekly infusions, then every 2 weeks',txt:'Eculizumab was given IV: 900 mg on day 1 and at weeks 1, 2 and 3, 1,200 mg at week 4, then 1,200 mg every 2 weeks (the dose ticks). The label says clinical response is usually achieved by 12 weeks. Week-by-week means are not published in our sources, so the lines between baseline and week 26 are interpolated shapes. [[Howard2017,FDASoliris2026]]',
   pt:'The first month has more infusions to build up the drug. After that it is one infusion every two weeks.'},
  {from:8,at:12,k:'Week 12',t:'Who had responded by week 12',txt:'In a responder analysis of REGAIN and its extension (98 people), 67.3% had improved by 3 or more MG-ADL points by week 12, rising to 84.7% by the end of the extension; for QMG (5 or more points) the figures were 56.1% and 71.4%. Some first responses came after week 12. [[Howard2021b]]',
   pt:'Most people who responded did so within about three months, but some took longer.'},
  {from:20,at:26,k:'Primary endpoint',t:'Week 26: a missed primary endpoint',txt:'The prespecified primary analysis, a worst-rank ANCOVA of MG-ADL change at week 26, was not significant: rank difference −11.7 (95% CI −24.3 to 0.96), p=0.0698. The authors called the worst-rank method an important limitation, because secondary and sensitivity analyses disagreed with it. The US label reports a repeated-measures analysis: MG-ADL −4.2 vs −2.3, a difference of −1.9 (95% CI −3.3 to −0.6), p=0.006, and QMG −4.6 vs −1.6. The label also lists p=0.014 for a worst-rank analysis and does not explain why this differs from the paper. [[Howard2017,FDASoliris2026]]',
   pt:'The trial missed the test it had set itself in advance. Other ways of analysing the same data favoured the drug, and regulators approved it.',
   hook:'REGAIN: the prespecified worst-rank primary analysis gave p=0.0698, while the label shows a repeated-measures MG-ADL difference of −1.9 (p=0.006). The choice of analysis changed the reading.'},
  {from:26.3,at:'max',ole:true,k:'Open-label extension',t:'After week 26: everyone on eculizumab',txt:'In the extension (117 people, median exposure 22.7 months), people switched from placebo improved by 1.6 MG-ADL points in the first week and by 3.8 points from their open-label baseline at month 30, when only 15 remained in that count; the indigo dashed line adds these changes to the week-26 placebo mean, so its dots are calculated. Exacerbations fell 75.2% against the year before REGAIN (102.4 to 25.4 per 100 patient-years), and 56% reached minimal manifestations or pharmacological remission. One meningococcal infection occurred and resolved with antibiotics. [[Muppidi2019]]',
   pt:'Once everyone could have the drug, people who had been on placebo improved quickly and flare-ups became much rarer.',
   hook:'An open-label extension has no placebo group, so its gains cannot be separated from expectation or natural fluctuation.'}],
 rav:[
  {from:0,at:0,k:'Trial entry',t:'CHAMPION-MG: who took part',txt:'CHAMPION-MG randomised 175 adults with AChR-antibody-positive gMG (MGFA II to IV, MG-ADL 6 or more), not limited to refractory disease: 86 on ravulizumab and 89 on placebo, for 26 weeks. [[Vu2022,FDAUltomiris2025]]',
   pt:'Unlike REGAIN, this trial also included people whose MG had not resisted other treatments.',
   hook:'Ravulizumab is a longer-acting C5 antibody: after loading, one infusion every 8 weeks.'},
  {from:.4,at:1,k:'Week 1',t:'Fast and complete',txt:'Free C5 fell below 0.5 µg/mL, defined as complete inhibition, immediately after the first infusion and stayed there through week 26 in every patient. MG-ADL and QMG improved within 1 week. In a post hoc analysis the median time to a 2-point MG-ADL improvement was 2.1 weeks. [[Vu2023,Vu2022,Habib2024]]',
   pt:'The drug switches the complement step off from the first infusion, and scores start to improve within days to weeks.'},
  {from:3,at:10,k:'Maintenance',t:'One infusion every 8 weeks',txt:'Dosing is by weight: a loading dose of 2,400, 2,700 or 3,000 mg on day 1, then 3,000, 3,300 or 3,600 mg on day 15 and every 8 weeks. The label requires a supplemental dose after plasma exchange, plasmapheresis or IVIg. Median time to a 3-point MG-ADL improvement was 4.1 weeks, and to a 5-point QMG improvement 18.3 weeks. [[Vu2023,FDAUltomiris2025,Habib2024]]',
   pt:'Plasma exchange removes the drug from the blood, so an extra dose follows it. The schedule for any one person is set by the treating clinician.'},
  {from:20,at:26,k:'Primary endpoint',t:'Week 26: the result',txt:'MG-ADL −3.1 vs −1.4: a difference of −1.6 (95% CI −2.6 to −0.7), p<0.001. QMG −2.8 vs −0.8 (difference −2.0). 56.7% vs 34.1% improved by 3 or more MG-ADL points, and 30.0% vs 11.3% by 5 or more QMG points (p=0.005). Serious adverse reactions 23% vs 16%; one fatal COVID-19 pneumonia on ravulizumab. [[Vu2022,FDAUltomiris2025]]',
   pt:'The treated group improved about 1.6 points more than the placebo group, on a 24-point daily-living scale.',
   hook:'CHAMPION-MG: MG-ADL difference −1.6 at week 26, with complete C5 inhibition from the first infusion.'},
  {from:26.3,at:'max',ole:true,k:'Open-label extension',t:'After week 26: up to 164 weeks',txt:'People on ravulizumab from the start held an MG-ADL change of −4.0 from the original baseline at week 60 and at week 164 (95% CI −5.3 to −2.8). People switched from placebo improved by 1.7 points by week 60 and 2.1 points after 138 weeks, measured from their open-label baseline (calculated dots). 88.1% reached a 2-point improvement, 41.8% of them reaching MG-ADL 0 to 1, and no meningococcal infections were reported. [[Meisel2023,Vu2025]]',
   pt:'Over three years the improvement held, without a placebo group to compare against.'}],
 zil:[
  {from:0,at:0,k:'Trial entry',t:'RAISE: who took part',txt:'RAISE randomised 174 adults aged 18 to 74 with AChR-antibody-positive gMG (MGFA II to IV, MG-ADL 6 or more, QMG 12 or more): 86 on zilucoplan and 88 on placebo, for 12 weeks. Mean baseline MG-ADL was 10.6. [[Howard2023,FDAZilbrysq2026]]',
   pt:'Zilucoplan is not an antibody. It is a small ring-shaped peptide that people inject under the skin themselves, once a day.',
   hook:'Zilucoplan: a macrocyclic peptide C5 inhibitor, 0.3 mg/kg under the skin once daily, self-injected.'},
  {from:.4,at:1,k:'Week 1',t:'Complement switched off in a week',txt:'By the end of week 1 complement activity was 97.5% inhibited in a sheep red-cell lysis assay, and it stayed there through week 12 (label). In a network meta-analysis at week 1, zilucoplan was one of only three biologics already better than placebo, with efgartigimod and rozanolixizumab. [[FDAZilbrysq2026,Zhong2024]]',
   pt:'Within a week the drug has almost fully blocked the complement step.'},
  {from:3,at:6,k:'Daily injections',t:'Daily dosing and the label warnings',txt:'Label doses by weight are 16.6 mg (under 56 kg), 23 mg (56 to under 77 kg) and 32.4 mg (77 kg or more), shown as a continuous bar. The label lists injection-site reactions in 29% vs 16%, upper respiratory infection 14% vs 7%, diarrhoea 11% vs 2%, and raised lipase (7% vs 0%) and amylase (5% vs 1%). It warns of pancreatitis and pancreatic cysts and calls for baseline amylase and lipase. [[FDAZilbrysq2026]]',
   pt:'A daily injection at home replaces infusions. The label asks for pancreas blood tests before starting.'},
  {from:10,at:12,k:'Primary endpoint',t:'Week 12: the result',txt:'MG-ADL −4.39 (95% CI −5.28 to −3.50) vs −2.30 (−3.17 to −1.43): a difference of −2.09 (−3.24 to −0.95), p=0.0004. QMG difference −2.94. Without rescue therapy, 73.1% vs 46.1% improved by 3 or more MG-ADL points and 58% vs 33% by 5 or more QMG points (label). One death occurred in each arm, neither judged drug-related. [[Howard2023,FDAZilbrysq2026]]',
   pt:'After 12 weeks the treated group had improved about 2 points more than the placebo group.',
   hook:'RAISE: MG-ADL difference −2.09 at week 12; complement 97.5% inhibited by the end of week 1 (label).'},
  {from:12.3,at:'max',ole:true,k:'Open-label extension',t:'RAISE-XT, and a modelled control',txt:'In RAISE-XT (200 people, median exposure 1.2 years), the zilucoplan-from-start group reached −6.06 at week 24 and −6.04 at week 60 from the double-blind baseline; those switched from placebo reached −6.46 and −6.51. No placebo data exist beyond week 12. A sponsor-authored, model-informed analysis predicted week-24 MG-ADL of −4.55 on zilucoplan vs −2.00 for control (open diamonds), with an 82.8% probability that the difference exceeds 2 points: modelled values, not observations. Morphea occurred in 10 of 213 extension patients (5%), mostly after more than a year. [[Howard2024a,delaBorderie2024,FDAZilbrysq2026]]',
   pt:'With no placebo group after week 12, the long-term comparison here rests on a statistical model, not on people given placebo.',
   hook:'Modelled controls can shorten time on placebo, but they are predictions, so they are drawn as open markers.'}],
 gef:[
  {from:0,at:0,k:'Trial entry',t:'PREVAIL: who took part',txt:'PREVAIL randomised 260 people with AChR-antibody-positive gMG (MGFA II to IV, MG-ADL 5 or more): 131 on gefurulimab and 129 on placebo, for 26 weeks. Baseline MG-ADL was 9.0 and QMG 14.8. Gefurulimab is a dual-binding nanobody that binds both C5 and albumin. [[Gwathmey2026]]',
   pt:'A nanobody is a very small antibody-like protein. This one grips both C5 and albumin, a common blood protein.',
   hook:'Gefurulimab: a C5 and albumin binding nanobody, self-injected under the skin weekly.'},
  {from:.4,at:1,k:'Week 1',t:'A difference at the first visit',txt:'At the first assessment, week 1, the MG-ADL difference from placebo was already −1.3 (95% CI −1.9 to −0.8). Only the difference is published in our sources, not each arm\'s mean, so it appears as a label, not as dots. [[Gwathmey2026]]',
   pt:'The two groups had already started to separate one week in.'},
  {from:4,at:12,k:'Weekly self-injection',t:'Weekly injections',txt:'After a loading dose of 600 or 900 mg, participants injected 300 or 600 mg under the skin weekly, by weight. Injection-site reactions occurred in 9.9% vs 3.1%, and no meningococcal infections were reported. Pharmacodynamic values are not in our sources, so the complement lane is schematic. [[Gwathmey2026]]'},
  {from:20,at:26,k:'Primary endpoint',t:'Week 26: the result',txt:'MG-ADL −4.2 vs −2.6: a difference of −1.6 (95% CI −2.4 to −0.8). QMG −4.5 vs −2.4 (difference −2.1). 65.6% vs 52.1% improved by 3 or more MG-ADL points (p=0.04) and 46.8% vs 28.0% by 5 or more QMG points (p=0.002). The EU committee (CHMP) gave a positive opinion on 17 September 2026, as add-on therapy for AChR-positive adults; no FDA decision was found. [[Gwathmey2026,EMAKlygefa2026]]',
   pt:'The treated group improved by 4.2 points, but the placebo group improved by 2.6, so the extra benefit was 1.6 points.',
   hook:'PREVAIL: placebo improved 2.6 points, so a −4.2 drug change became a −1.6 difference.'}],
 efg:[
  {from:0,at:0,k:'Trial entry',t:'ADAPT: who took part',txt:'ADAPT randomised 167 adults with gMG of any antibody status (MG-ADL 5 or more, stable on at least one MG treatment, IgG 6 g/L or more): 84 on efgartigimod and 83 on placebo, over 26 weeks. 129 (77%) were AChR-antibody-positive; median baseline MG-ADL was 9 (label). [[Howard2021,FDAVyvgart2026]]',
   pt:'Efgartigimod is an FcRn antagonist: it blocks FcRn, the receptor that normally rescues IgG antibodies from being broken down.',
   hook:'FcRn blockers lower all IgG, the harmful antibodies included, by stopping its recycling. They do not lower IgM, IgA or IgE. [[Ulrichts2018,Howard2024b]]'},
  {from:.4,at:3,k:'Cycle 1',t:'Four weekly infusions',txt:'One cycle is 10 mg/kg IV once a week for 4 infusions (1,200 mg cap at 120 kg or more). In ADAPT+ cycle 1, total IgG fell by a mean maximum of 55.9% in AChR-positive participants, measured at week 3. ADAPT itself reported a 61.3% maximum fall at week 4, and 57.6% for AChR antibody (press release, open dot). 84.1% of responders had their onset within 2 weeks (press release). [[Howard2021,Howard2023b,argenxADAPT2020]]',
   pt:'Each weekly infusion pushes IgG lower. With fewer antibodies, fewer reach the receptors.'},
  {from:3.5,at:4,k:'Primary endpoint',t:'Week 4: counting responders',txt:'The primary endpoint counted responders in cycle 1: a 2-point MG-ADL improvement kept for at least 4 weeks. In AChR-positive participants it was 68% (44 of 65) vs 30% (19 of 64), odds ratio 4.95 (95% CI 2.21 to 11.53), p<0.0001; QMG responders were 63.1% vs 14.1% (label). The mean MG-ADL change at week 4 was −4.6 from the cycle baseline (manufacturer congress data). The placebo mean was not found in our sources, so no placebo line is drawn. [[Howard2021,FDAVyvgart2026,argenxADAPT2020]]',
   pt:'About two in three treated people improved by at least 2 points and kept it for a month, against about one in three on placebo.',
   hook:'ADAPT\'s primary endpoint was a responder rate (68% vs 30%), not a mean difference.'},
  {from:6,at:9,k:'IgG recovers',t:'Between cycles',txt:'IgG returned to baseline between weeks 7 and 11 (shaded band). The clinical effect fades as well: in a network meta-analysis, 4 weeks after the last dose no biologic differed significantly from placebo on QMG. [[Howard2023b,Zhong2024]]',
   pt:'As the IgG level climbs back, the benefit tends to fade, which is why further cycles are given.'},
  {from:9.6,at:10.1,k:'Cycle 2',t:'Retreatment by response',txt:'Further cycles depended on clinical response, no sooner than 8 weeks after the previous cycle began. The median time to a second cycle was 50 days after the last infusion of cycle 1 (label), about week 10, drawn with open ticks because individual timing varied. The repeat IgG curve is schematic, and weekly MG-ADL means for later cycles are not in our sources. [[Howard2021,FDAVyvgart2026]]',
   pt:'The next cycle starts when symptoms return, so each person ends up with their own rhythm.'},
  {from:26.3,at:'max',ole:true,k:'Open-label extension',t:'ADAPT+: cycle after cycle',txt:'In ADAPT+ (145 treated, up to 17 cycles, 217.6 participant-years), MG-ADL improved by 5.0 at week 3 of cycle 1 and by 5.3 to 7.5 in cycles 2 to 10 (AChR-positive, each from its own cycle baseline, shown as a range bar). People averaged 4.7 cycles a year (median 5.0, range 0.5 to 7.6); the spacing drawn is that mean, not a schedule. Headache 24.8%, COVID-19 15.2%. [[Howard2023b]]',
   pt:'Repeated cycles kept giving similar improvements, without a placebo group to compare.'}],
 efs:[
  {from:0,at:0,k:'Trial entry',t:'ADAPT-SC: a bridging study',txt:'ADAPT-SC was not a placebo trial. 110 people received 1,000 mg efgartigimod with hyaluronidase under the skin weekly for 4 weeks (55), or 10 mg/kg IV weekly for 4 weeks (55). The primary endpoint was the percentage fall in total IgG at week 4. [[Howard2024b,FDAVyvgartHytrulo2026]]',
   pt:'Instead of a dummy treatment, this trial checked that an injection under the skin lowers IgG as much as the drip.',
   hook:'ADAPT-SC: the subcutaneous form was bridged to IV on IgG lowering (a pharmacodynamic non-inferiority design), not on a new placebo trial.'},
  {from:.4,at:1,k:'Week 1',t:'IgG down by 40%',txt:'After the first week total IgG had fallen 40.1% with SC and 39.6% with IV. The 1,000 mg prefilled syringe is given over about 20 to 30 seconds and can be self-administered; the 1,008 mg vial is given by a healthcare professional. [[Howard2024b,FDAVyvgartHytrulo2026]]',
   pt:'One week in, both forms had cut IgG by about four tenths.'},
  {from:3.5,at:4,k:'Primary endpoint',t:'Week 4: non-inferior',txt:'IgG fell 66.4% with SC vs 62.2% with IV: a difference of −4.2 percentage points (95% CI −7.73 to −0.66), meeting non-inferiority within a 10% margin. MG-ADL improved by 5.1 (SC) and 4.7 (IV), QMG by 6.1 and 5.2, and minimal symptom expression at any time (AChR-positive) was 45.5% vs 41.3%. [[Howard2024b]]',
   pt:'The injection lowered IgG at least as much as the drip, and symptom scores moved similarly.',
   hook:'Without a placebo arm, ADAPT-SC\'s MG-ADL changes (−5.1 and −4.7) cannot be read as drug-minus-placebo differences.'},
  {from:7,at:10,k:'Week 10',t:'Back toward baseline',txt:'IgG was near baseline by week 10 in both groups (open dots: described, not given as numbers). Injection-site reactions occurred in 38% (label). In the final ADAPT-SC+ extension (180 people, mean follow-up 2.6 years, up to 33 cycles) they reached 46.1%, all mild or moderate, and 59.2% of AChR-positive and 34.2% of AChR-negative participants reached minimal symptom expression. [[Howard2024b,FDAVyvgartHytrulo2026,Meisel2026F]]'}],
 roz:[
  {from:0,at:0,k:'Trial entry',t:'MycarinG: who took part',txt:'MycarinG randomised 200 adults with AChR- or MuSK-antibody-positive gMG (MGFA II to IVa, QMG 11 or more, IgG 5.5 g/L or more): 66 at 7 mg/kg, 67 at 10 mg/kg and 67 on placebo; 89.5% were AChR-positive and 10.5% MuSK-positive. The chart shows the 7 mg/kg arm. [[Bril2023,FDARystiggo2026]]',
   pt:'This trial included people with MuSK antibodies, a group the complement drugs are not labelled for.',
   hook:'Rozanolixizumab is labelled for AChR+ or MuSK+ gMG; the C5 inhibitor trials and labels in our sources cover AChR+ disease.'},
  {from:.2,at:.45,k:'Day 3',t:'IgG starts falling within days',txt:'Total IgG reductions were seen as early as day 3. One cycle is 6 weekly infusions under the skin by pump; label doses are 420, 560 or 840 mg by weight, and the safety of starting a new cycle sooner than 63 days after the last one began is not established. [[Bril2026,FDARystiggo2026]]',
   pt:'The antibody level begins to drop within the first few days.'},
  {from:1.5,at:3,k:'Weeks 1 to 6',t:'Side effects during the cycle',txt:'Headache affected 45% (7 mg/kg) and 38% (10 mg/kg) vs 19% on placebo; diarrhoea 25% and 16% vs 13%; fever 13% and 20% vs 1%. Serious adverse events were 8% and 10% vs 9%, with no deaths. The label lists aseptic meningitis as a warning and precaution, and hypersensitivity in 11% vs 5%. [[Bril2023,FDARystiggo2026]]',
   pt:'Headache was the commonest side effect, more often than with the other FcRn drugs.'},
  {from:5.5,at:6.14,k:'Primary endpoint',t:'Day 43: the result',txt:'MG-ADL −3.37 (7 mg/kg) and −3.40 (10 mg/kg) vs −0.78 on placebo: differences −2.59 (95% CI −4.09 to −1.25) and −2.62 (−3.99 to −1.16), both p<0.0001. QMG −5.4 and −6.7 vs −1.9 (label). Median total IgG at day 43 was −71.45% in cycle 1, and falls of up to 79% were reported. The placebo change was the smallest of the pivotal trials, which widens the gap. [[Bril2023,FDARystiggo2026,Bril2026]]',
   pt:'The treated groups improved about 3.4 points; the placebo group hardly moved.',
   hook:'MycarinG: day-43 MG-ADL difference about −2.6, against a placebo change of only −0.78.'},
  {from:6.17,at:'max',ole:true,k:'Extensions',t:'Cycles through a year',txt:'In the extensions people had about 4 cycles a year, with a median of 98 days between cycle starts (drawn as fixed spacing). Day-43 MG-ADL change ranged from −3.2 to −6.0 across cycles 1 to 13, and day-43 IgG from −71.45% (cycle 1) to −59.29% (cycle 10). Headache occurred in 50.0% of 188 people. Across the trial and extensions, 48% had infections, 4% serious, with 3 fatal pneumonias (2 COVID-19). The IgG return between cycles is schematic. [[FDARystiggo2026,Bril2026,Bril2025b]]',
   pt:'Each new cycle brought a similar fall in IgG and a similar improvement.'}],
 nip:[
  {from:0,at:0,k:'Trial entry',t:'Vivacity-MG3: who took part',txt:'Vivacity-MG3 treated 196 adults with gMG inadequately controlled on standard care (MGFA II to IV, MG-ADL 6 or more): 98 on nipocalimab and 98 on placebo, both on top of standard care, for 24 weeks. The primary population was the 153 antibody-positive people (88% AChR, 10% MuSK). [[Antozzi2025,FDAImaavy2026]]',
   pt:'Unlike the cycle-based FcRn drugs, nipocalimab is given continuously, every two weeks.',
   hook:'Nipocalimab: continuous FcRn blockade, 30 mg/kg IV loading dose, then 15 mg/kg every 2 weeks.'},
  {from:.4,at:1,k:'Week 1',t:'Early response',txt:'In a post hoc analysis, response categories were reached as early as week 1. A sustained composite response for 8 weeks or more had an odds ratio of 6.3, and sustained minimal symptom expression was 4 times as likely as on placebo. [[Vu2026a]]',
   pt:'Some people responded within the first week.'},
  {from:2.5,at:4,k:'Week 4',t:'IgG and lipids',txt:'Median total IgG fell by up to about 75% (company release; the exact value was not verified), drawn as a schematic dashed curve. The label reports fasting total cholesterol of 240 mg/dL or more in 24% and LDL of 160 mg/dL or more in 11%, peaking at week 4 and then levelling off, plus peripheral oedema 12% vs 2% and muscle spasm 12% vs 3%. [[PharmacyTimesNipocalimab2025,FDAImaavy2026]]',
   pt:'Cholesterol rose in some people, mostly in the first month.'},
  {from:20,at:23,k:'Primary endpoint',t:'Weeks 22 to 24: the result',txt:'MG-ADL averaged over weeks 22 to 24: −4.70 vs −3.25, a difference of −1.45 (95% CI −2.38 to −0.52), p=0.0024; QMG difference −2.8 (label). The placebo arm improved by 3.25 points, the largest placebo response of the FcRn trials. Infections were 43% in both arms, and one death from myasthenic crisis occurred on nipocalimab. In the earlier phase 2 study (68 people) no single dose significantly improved MG-ADL at day 57. [[Antozzi2025,FDAImaavy2026,Antozzi2024]]',
   pt:'Both groups improved a lot, because both stayed on their usual treatment. The drug added about 1.5 points.',
   hook:'Vivacity-MG3: drug −4.70, placebo −3.25. A large placebo response shrinks the difference to −1.45.'}]
};

/* the size-of-benefit chart */
const BI_MAG={
 d:{max:4.5,ticks:[0,1,2,3,4],unit:'MG-ADL points better than placebo (drug minus placebo, sign dropped)',
  rows:[
   {id:'roz',lab:'Rozanolixizumab 7 mg/kg · day 43',v:2.59,lo:1.25,hi:4.09,txt:'−2.59'},
   {id:'cem',lab:'Cemdisiran · NIMBLE · wk 24',v:2.3,lo:1.0,hi:3.6,txt:'−2.3'},
   {id:'pool23',lab:'Pooled 2023 · meta-analysis',v:2.17,lo:1.67,hi:2.67,txt:'−2.17'},
   {id:'zil',lab:'Zilucoplan · RAISE · wk 12',v:2.09,lo:.95,hi:3.24,txt:'−2.09'},
   {id:'ecu',lab:'Eculizumab · REGAIN · wk 26 (label)',v:1.9,lo:.6,hi:3.3,txt:'−1.9',open:1},
   {id:'ine',lab:'Inebilizumab · MINT · wk 26',v:1.9,lo:1.0,hi:2.9,txt:'−1.9'},
   {id:'bat',lab:'Batoclimab · China · day 43',v:1.9,lo:1.0,hi:2.8,txt:'−1.9'},
   {id:'pool',lab:'Pooled 2026 · 6 RCTs, AChR+',v:1.7,lo:1.1,hi:2.3,txt:'−1.7'},
   {id:'rav',lab:'Ravulizumab · CHAMPION-MG · wk 26',v:1.6,lo:.7,hi:2.6,txt:'−1.6'},
   {id:'gef',lab:'Gefurulimab · PREVAIL · wk 26',v:1.6,lo:.8,hi:2.4,txt:'−1.6'},
   {id:'ser',lab:'Efgartigimod · seronegative · wk 4',v:1.46,lo:.41,hi:2.50,txt:'−1.46',open:1},
   {id:'nip',lab:'Nipocalimab · Vivacity-MG3 · wk 22–24',v:1.45,lo:.52,hi:2.38,txt:'−1.45'},
   {id:'sat',lab:'Satralizumab · LUMINESCE · wk 24',v:1.02,lo:.16,hi:1.88,txt:'−1.02'},
   {id:'adapt',lab:'Efgartigimod · ADAPT',na:'no mean difference: responders 68% vs 30%',txt:'n/a'}]},
 p:{max:5,ticks:[0,1,2,3,4,5],unit:'MG-ADL improvement from baseline (points): bar = placebo arm, dot = drug arm',
  rows:[
   {id:'p_roz',lab:'MycarinG · rozanolixizumab',p:.78,v:3.37,txt:'−0.78'},
   {id:'p_rav',lab:'CHAMPION-MG · ravulizumab',p:1.4,v:3.1,txt:'−1.4'},
   {id:'p_ine',lab:'MINT · inebilizumab',p:2.2,v:4.2,txt:'−2.2'},
   {id:'p_cem',lab:'NIMBLE · cemdisiran',p:2.2,v:4.5,txt:'−2.2'},
   {id:'p_ecu',lab:'REGAIN · eculizumab (label)',p:2.3,v:4.2,txt:'−2.3',open:1},
   {id:'p_zil',lab:'RAISE · zilucoplan',p:2.3,v:4.39,txt:'−2.3'},
   {id:'p_sat',lab:'LUMINESCE · satralizumab',p:2.57,v:3.59,txt:'−2.57'},
   {id:'p_gef',lab:'PREVAIL · gefurulimab',p:2.6,v:4.2,txt:'−2.6'},
   {id:'p_nip',lab:'Vivacity-MG3 · nipocalimab',p:3.25,v:4.70,txt:'−3.25'}]}
};
const BI_EX={
 roz:{k:'MycarinG',t:'Rozanolixizumab: −2.59 at day 43',txt:'At 7 mg/kg the difference was −2.59 (95% CI −4.09 to −1.25), and −2.62 at 10 mg/kg. It is the largest point estimate here, partly because the placebo arm barely moved (−0.78), and it is measured at the peak of a 6-week cycle, not at a fixed late timepoint. [[Bril2023]]'},
 cem:{k:'NIMBLE',t:'Cemdisiran: −2.3 at week 24',txt:'Cemdisiran, an siRNA that silences C5 production, given under the skin every 12 weeks: MG-ADL −4.5 vs −2.2, difference −2.3 (95% CI −3.6 to −1.0). The combination with pozelimab gave −1.7 (−3.0 to −0.4). An FDA decision was targeted for November 2026 (press). [[Vu2026b,NeurologyLiveCemdisiran2026]]'},
 zil:{k:'RAISE',t:'Zilucoplan: −2.09 at week 12',txt:'MG-ADL −4.39 vs −2.30, difference −2.09 (−3.24 to −0.95). A model-based meta-analysis of 9 phase 3 trials gave zilucoplan the highest MG-ADL maximum effect (net 2.5). [[Howard2023,Roy2026]]'},
 ecu:{k:'REGAIN (label)',t:'Eculizumab: −1.9 at week 26',txt:'This is the label\'s repeated-measures result (95% CI −3.3 to −0.6), drawn as an outlined bar because it is not the paper\'s prespecified primary analysis, which was a worst-rank test with p=0.0698. [[FDASoliris2026,Howard2017]]'},
 ine:{k:'MINT',t:'Inebilizumab: −1.9 at week 26',txt:'An anti-CD19 B-cell-depleting antibody with a mandatory steroid taper: MG-ADL −4.2 vs −2.2, difference −1.9 (−2.9 to −1.0). In AChR-positive people an exploratory week-52 difference was −2.8 (press release). [[Nowak2025,AmgenUplizna2025]]'},
 bat:{k:'China phase 3',t:'Batoclimab: −1.9 at day 43',txt:'An FcRn blocker given under the skin, 680 mg weekly for 6 weeks: −3.6 vs −1.7, difference −1.9 (−2.8 to −1.0). Not approved for MG in our sources. [[Yan2024]]'},
 pool23:{k:'Meta-analysis, 2023',t:'Pooled: −2.17 points',txt:'A 2023 pairwise and network meta-analysis of innovative MG therapies pooled an MG-ADL effect of −2.17 (95% CI −2.67 to −1.67) against placebo. It found no complement-versus-FcRn difference on MG-ADL (p=0.16), a larger QMG effect with FcRn agents (−4.78 against −2.60), and ranked efgartigimod most likely to be best. In the same network, rituximab did not significantly improve MG-ADL (−0.92, 95% CI −2.24 to 0.39). A 2026 meta-analysis restricted to AChR-positive trials pooled a smaller 1.7 points, so the pooled size depends on which trials are included. [[Sacca2023,Filippakopoulou2026]]'},
 pool:{k:'Meta-analysis, 2026',t:'Pooled: about 1.7 points',txt:'Across 6 randomised trials in AChR-positive gMG (739 people), complement inhibitors and FcRn blockers each improved MG-ADL by about 1.7 points (95% CI 1.1 to 2.3) over placebo, and QMG by 2.7. The authors concluded that only complement-inhibitor extensions had shown durable benefit to 156 weeks with steroid sparing. An earlier 2023 meta-analysis pooled −2.17. [[Filippakopoulou2026,Sacca2023]]'},
 rav:{k:'CHAMPION-MG',t:'Ravulizumab: −1.6 at week 26',txt:'MG-ADL −3.1 vs −1.4, difference −1.6 (−2.6 to −0.7), p<0.001; the responder split (56.7% vs 34.1% with a 3-point gain) looks clearer than the mean. [[Vu2022,FDAUltomiris2025]]'},
 gef:{k:'PREVAIL',t:'Gefurulimab: −1.6 at week 26',txt:'MG-ADL −4.2 vs −2.6, difference −1.6 (−2.4 to −0.8); the placebo arm improved by 2.6. [[Gwathmey2026]]'},
 ser:{k:'ADAPT SERON',t:'Efgartigimod in AChR-negative gMG: −1.46',txt:'In 119 AChR-antibody-negative people (61% triple-seronegative, 34% MuSK+, 5% LRP4+), the week-4 MG-ADL difference was −1.46 (95% CI −2.50 to −0.41), p=0.0068, from the label and a congress abstract with no peer-reviewed paper yet (outlined bar). These results appear in the May 2026 US label, which no longer restricts efgartigimod by antibody status. [[FDAVyvgart2026,Howard2026SERON]]'},
 nip:{k:'Vivacity-MG3',t:'Nipocalimab: −1.45 over weeks 22 to 24',txt:'MG-ADL −4.70 vs −3.25, difference −1.45 (−2.38 to −0.52). The placebo arm, on standard care for 24 weeks, improved by 3.25 points. [[Antozzi2025]]'},
 sat:{k:'LUMINESCE',t:'Satralizumab: −1.02 at week 24',txt:'An anti-IL-6-receptor antibody: −3.59 vs −2.57, difference −1.02 (−1.88 to −0.16), p=0.012. The authors called the effect small, and the sponsor stopped development. [[Habib2025F]]'},
 adapt:{k:'ADAPT',t:'Efgartigimod: a responder endpoint',txt:'ADAPT\'s primary endpoint was the share of responders in cycle 1 (68% vs 30% in AChR-positive people), so no drug-minus-placebo mean is available in our sources for this row. A model-based meta-analysis nonetheless gave efgartigimod the fastest onset (1.6 weeks or less), a 2023 network meta-analysis ranked it most likely to be best, and a sponsor-funded indirect comparison found it better than ravulizumab at week 4 but not over 26 weeks. [[Howard2021,Roy2026,Sacca2023,vanSteen2024]]'},
 mcid:{k:'Threshold',t:'The 2-point line',txt:'In the MG-ADL validation study, a 2-point improvement best predicted that a person felt clinically better, which is why ADAPT and later trials used 2 points as the minimal clinically important difference. It is a threshold for one person\'s change, not for the gap between two group averages. Ravulizumab, gefurulimab, nipocalimab, satralizumab, seronegative efgartigimod and inebilizumab all have group differences below it. [[Muppidi2011]]'},
 p_roz:{k:'MycarinG',t:'Placebo −0.78',txt:'The smallest placebo change of the pivotal trials, over only 6 weeks. The drug arm improved by 3.37. [[Bril2023]]'},
 p_rav:{k:'CHAMPION-MG',t:'Placebo −1.4',txt:'Over 26 weeks the placebo arm improved by 1.4 and the ravulizumab arm by 3.1. [[Vu2022]]'},
 p_ine:{k:'MINT',t:'Placebo −2.2',txt:'Both arms had a mandatory glucocorticoid taper; placebo improved by 2.2, inebilizumab by 4.2. [[Nowak2025]]'},
 p_cem:{k:'NIMBLE',t:'Placebo −2.2',txt:'Placebo −2.2 vs cemdisiran −4.5 at week 24. [[Vu2026b]]'},
 p_ecu:{k:'REGAIN (label)',t:'Placebo −2.3',txt:'In the label\'s repeated-measures analysis placebo improved by 2.3 and eculizumab by 4.2, in people with refractory disease. [[FDASoliris2026]]'},
 p_zil:{k:'RAISE',t:'Placebo −2.30',txt:'In 12 weeks the placebo arm improved by 2.30 and zilucoplan by 4.39. [[Howard2023]]'},
 p_sat:{k:'LUMINESCE',t:'Placebo −2.57',txt:'Placebo −2.57 vs satralizumab −3.59: the drug added about 1 point. [[Habib2025F]]'},
 p_gef:{k:'PREVAIL',t:'Placebo −2.6',txt:'Placebo −2.6 vs gefurulimab −4.2. [[Gwathmey2026]]'},
 p_nip:{k:'Vivacity-MG3',t:'Placebo −3.25',txt:'The largest placebo response among the FcRn trials, in a 24-week trial with standard care continued in both arms. Placebo arms improving by 1 to 3 points is the heart of the meaningfulness debate. [[Antozzi2025]]'}
};

inits.biologics=()=>{
  const svg=$('#biSvg'),rg=$('#biT'),stEl=$('#biSteps');
  let drug='ecu',pbo=true,ole=false,stepIdx=-1,stepKey='';
  const D=()=>BI_D[drug],OLE=()=>ole&&D().oleSpan>0,SP=()=>OLE()?D().oleSpan:D().span;
  const steps=()=>BI_STEPS[drug].filter(s=>OLE()||!s.ole);
  const atOf=s=>s.at==='max'?SP():s.at;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const ln=(x1,y1,x2,y2,st)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="${st}"/>`;
  const dot=(x,y,col,k)=>k==='o'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`
                                 :`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.8" style="fill:${col};stroke:var(--panel);stroke-width:1.2"/>`;
  const dia=(x,y,col,fill)=>`<rect x="${f1(x-3.2)}" y="${f1(y-3.2)}" width="6.4" height="6.4" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:${fill?col:'var(--panel)'};stroke:${col};stroke-width:1.4"/>`;
  const poly=(fn,w0,w1,X,Y)=>{if(w1<=w0)return '';let d='',on=false;const n=Math.max(8,Math.ceil((X(w1)-X(w0))/2));for(let i=0;i<=n;i++){const u=w0+(w1-w0)*i/n,v=fn(u);if(v==null){on=false;continue}d+=(on?'L':'M')+f1(X(u))+' '+f1(Y(v));on=true}return d};
  const sep=(a,b,gap=12)=>{const lo=Math.min(a,b),hi=Math.max(a,b);if(hi-lo>=gap)return[a,b];const c=(lo+hi)/2;return a<=b?[c-gap/2,c+gap/2]:[c+gap/2,c-gap/2]};
  const fmt=v=>(v<0?'−':'')+Math.abs(v).toFixed(2);
  /* curves for the current drug, rebuilt when the drug or the extension view changes */
  let C={},cKey='';
  function curves(){const key=drug+OLE();if(key===cKey)return C;cKey=key;const d=D();
    C={dr:biCurve(d.dr,d.drTau,OLE()?d.oleDr:null),pb:d.pb?biCurve(d.pb,d.pbTau):null,cmp:d.cmp?biCurve(d.cmp,d.cmpTau):null,
       sw:OLE()&&d.sw?biCurve([[d.end,d.pb[d.pb.length-1][1]],...d.sw],0):null};
    if(d.cls==='c5'&&d.pd.pts)C.pd=biCurve(d.pd.pts,d.pd.tau);
    if(d.igg){const g=d.igg;
      if(g.pts){C.igg=biCurve(g.pts,g.tau);if(g.cmp)C.iggC=biCurve(g.cmp,0)}
      if(g.sch)C.igg=w=>w<0?null:g.sch*(1-Math.exp(-w/g.tau));
      /* the schematic repeat of a cycle: same shape again, or a straight return after the last value */
      const base=C.igg,len=g.len||null;
      C.iggShape=u=>{if(u<0)return null;if(len){return u<=len?base(u):0}const e=g.pts?g.pts[g.pts.length-1][0]:0;if(u<=e)return base(u);const ve=base(e);return u<=e+6?ve*(1-(u-e)/6):0}}
    return C}
  /* where is the drug (FcRn occupancy, schematic) */
  function dosesOf(){const d=D();let a=d.doses.map(x=>x[0]);
    if(OLE()&&d.oleDoses)a=a.concat(d.oleDoses);
    if(OLE()&&d.cyc){const per=d.cls==='fcrn'&&drug==='roz'?6:4;d.cyc.starts.forEach(s=>{for(let k=0;k<per;k++)a.push(s+k)})}
    return a}
  function occ(m){let o=0;dosesOf().forEach(w=>{if(w<=m+1e-6)o=Math.max(o,1-(m-w)/2.5)});return clamp(o)}
  /* total IgG % change now: published curve, or the schematic repeat */
  function iggNow(m){const d=D(),c=curves();if(!d.igg)return{v:0,k:'none'};const g=d.igg;
    if(g.sch)return{v:c.igg(m),k:'sch'};
    let starts=[0];if(g.cyc)starts=starts.concat(g.cyc);if(OLE()&&d.cyc)starts=starts.concat(d.cyc.starts);
    const s=starts.filter(x=>x<=m+1e-6).pop()||0,v=c.iggShape(m-s),real=s===0&&c.igg(m)!=null;
    const near=real&&g.pts.find(p=>p[2]!=='x'&&Math.abs(p[0]-m)<.15);
    return{v:v==null?0:v,k:!real?'sch':near?near[2]:'int'}}
  function inhNow(m){const d=D(),c=curves();if(d.pd.pts){const v=c.pd(m),P=d.pd.pts;return (v==null?P[P.length-1][1]:v)/100}return ramp(m,0,.3)*.98}

  /* ---------- panel 1: the junction ---------- */
  const drugG=(x,y,kind,o=1,ang=0)=>kind==='pep'?`<path d="M${f1(x-4)} ${f1(y)}L${f1(x-2)} ${f1(y-3.5)}L${f1(x+2)} ${f1(y-3.5)}L${f1(x+4)} ${f1(y)}L${f1(x+2)} ${f1(y+3.5)}L${f1(x-2)} ${f1(y+3.5)}Z" style="fill:var(--drug);opacity:${(+o).toFixed(2)}"/>`
    :kind==='nb'?`<rect x="${f1(x-4.5)}" y="${f1(y-3)}" width="9" height="6" rx="3" style="fill:var(--drug);opacity:${(+o).toFixed(2)}"/>`
    :igg(x,y,5.5,ang,o,'var(--drug)');
  const c5G=(x,y,o=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.2" style="fill:var(--comp);opacity:${(+o).toFixed(2)}"/>`;
  const macG=(x,y,r,o=1)=>`<g style="opacity:${(+o).toFixed(2)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:none;stroke:var(--comp);stroke-width:2.6"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.38)}" style="fill:var(--panel)"/></g>`;
  const cupG=(x,y,ang,full,o=1)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" style="opacity:${(+o).toFixed(2)}"><path d="M-3.4 -3.6V1.8H3.4V-3.6" style="fill:none;stroke:var(--nerve);stroke-width:1.9;stroke-linejoin:round"/>${full?'<rect x="-2.2" y="-3" width="4.4" height="3.8" rx="1" style="fill:var(--drug)"/>':''}</g>`;
  function c5Scene(bx,by,bw,inh,clk,kind){
    let s=`<rect x="${bx}" y="${by}" width="${bw}" height="250" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<rect x="${bx+14}" y="${by+10}" width="${bw-28}" height="46" rx="20" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.4"/>`;
    s+=T(bx+28,by+28,'nerve terminal','t-xs','fill:var(--nerve)');
    s+=vesicle(bx+bw*.64,by+34,8,1,5)+vesicle(bx+bw*.8,by+31,7,1,4)+vesicle(bx+bw*.5,by+40,6.5,1,4);
    s+=T(bx+10,by+73,'cleft');
    s+=T(bx+bw-10,by+73,inh>.5?'drug holds C5: no attack complex':'C5 cleaved: the MAC punches holes','t-xs t-end',`fill:${inh>.5?'var(--drug)':'var(--comp)'}`);
    const y0=by+150,cr=j=>bx+bw*(.1+.2*j);
    let p=`M${bx+6} ${y0}`;for(let j=0;j<4;j++){const tc=bx+bw*(.2+.2*j),hw=bw*.028;p+=`L${f1(tc-hw)} ${y0}L${f1(tc-hw)} ${y0+58}Q${f1(tc)} ${y0+70} ${f1(tc+hw)} ${y0+58}L${f1(tc+hw)} ${y0}`}
    p+=`L${bx+bw-6} ${y0}L${bx+bw-6} ${by+242}L${bx+6} ${by+242}Z`;
    s+=`<path d="${p}" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6;stroke-linejoin:round"/>`;
    s+=T(bx+12,by+236,'muscle endplate and its folds','t-xs');
    // free drug molecules drifting in the cleft
    const nF=Math.round(4*inh);for(let k=0;k<nF;k++){const fx=bx+bw*(.18+.21*k)+Math.sin(clk*2.1+k)*6,fy=by+108+Math.cos(clk*1.7+k*2)*7;s+=drugG(fx,fy,kind,.85,.5+k)}
    for(let j=0;j<5;j++){const cx=cr(j),q=(clk+j*.37)%1,n=Math.floor(clk+j*.37),blocked=biH(j*31+n*7)<inh;
      const dmg=blocked?0:bump(q,.6,1.02);
      s+=achr(cx-8,y0,8,.15,1-.55*dmg)+achr(cx+8,y0,8,.15,1-.55*dmg);
      if(dmg>.05)s+=`<path d="M${f1(cx-13)} ${y0+1}l3 3 3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3" style="fill:none;stroke:var(--comp);stroke-width:1.5;opacity:${f1(dmg)}"/>`;
      // the antibody on the left receptor, with C1q on its tail
      s+=igg(cx-8,y0-16.6,7.5,Math.PI,1);
      s+=`<g style="opacity:.9">${[-3,0,3].map((dx,i)=>`<circle cx="${f1(cx-8+dx)}" cy="${f1(y0-27-(i===1?2:0))}" r="1.8" style="fill:var(--comp)"/>`).join('')}</g>`;
      // one C5 molecule per site and cycle
      const sx=cx+14,sy=by+88,tx=cx-1,ty=y0-36;
      if(blocked){const dx0=cx+30,dy0=by+104;let c5x,c5y,o=1;
        if(q<.4){const e=ease(q/.4);c5x=lerp(sx,tx,e);c5y=lerp(sy,ty,e)}else{const e=ease(clamp((q-.45)/.4));c5x=lerp(tx,sx+6,e);c5y=lerp(ty,sy+6,e);o=1-ramp(q,.75,.95)}
        s+=c5G(c5x,c5y,o);
        if(q<.25){const e=ease(q/.25);s+=drugG(lerp(dx0,c5x+5,e),lerp(dy0,c5y-4,e),kind,o,.6)}else s+=drugG(c5x+5,c5y-4,kind,o,.6)}
      else{if(q<.4){const e=ease(q/.4);s+=c5G(lerp(sx,tx,e),lerp(sy,ty,e))}
        else if(q<.6){const e=ease((q-.4)/.2);s+=`<circle cx="${f1(tx+e*14)}" cy="${f1(ty-e*16)}" r="2.2" style="fill:var(--comp);opacity:${f1(1-e)}"/>`+c5G(lerp(tx,cx+1,e),lerp(ty,y0-5,e),1)}
        if(q>=.56)s+=macG(cx+1,y0-2,6*ease(ramp(q,.56,.7)),1-ramp(q,.92,1))}}
    return s}
  function fcrnScene(bx,by,bw,lvl,oc,clk){
    let s=`<rect x="${bx}" y="${by}" width="${bw}" height="250" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<rect x="${bx+8}" y="${by+8}" width="${bw-16}" height="48" rx="8" style="fill:var(--ab-soft)"/>`+T(bx+14,by+20,'blood: IgG antibodies','t-xs','fill:var(--ab)');
    const nS=12,slots=Array.from({length:nS},(_,k)=>({u:.07+.86*((k*7)%12)/11,v:31+((k*5)%4)*5.5,a:(k*2.3)%6}));
    const keep=lvl*nS;slots.forEach((sl,k)=>{const o=clamp(keep-k);if(o<=.02)return;const xx=bx+8+(bw-16)*sl.u+Math.sin(clk*1.3+sl.a)*5;s+=igg(xx,by+sl.v,6.5,sl.a*.3-.9,o)});
    s+=`<rect x="${bx+8}" y="${by+64}" width="${bw-16}" height="104" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`+T(bx+bw-14,by+78,'endothelial cell','t-xs t-end');
    const ex=bx+bw*.38,ey=by+122,er=28,lx=bx+bw*.8,ly=by+122,lr=17;
    s+=`<circle cx="${f1(ex)}" cy="${ey}" r="${er}" style="fill:var(--field);stroke:var(--nerve);stroke-width:1.2;stroke-dasharray:3 2"/>`+T(ex,by+164,'endosome, acidic','t-xs t-mid');
    s+=`<circle cx="${f1(lx)}" cy="${ly}" r="${lr}" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.2"/>`+T(lx,by+150,'lysosome','t-xs t-mid','fill:var(--bad)');
    s+=`<path d="M${f1(ex-er*.7)} ${f1(ey-er*.7)}Q${f1(ex-er-14)} ${f1(ey-er-14)} ${f1(ex-er-10)} ${by+58}" style="fill:none;stroke:var(--good);stroke-width:1.4" marker-end="url(#biArG)"/>`;
    s+=T(bx+14,by+96,'recycled','t-xs','fill:var(--good)');
    s+=`<path d="M${f1(ex+er+2)} ${ey}L${f1(lx-lr-3)} ${ly}" style="fill:none;stroke:var(--bad);stroke-width:1.4" marker-end="url(#biArB)"/>`+T((ex+er+lx-lr)/2,ey-6,'degraded','t-xs t-mid','fill:var(--bad)');
    const nCup=5,full=Math.round(nCup*oc),cups=[];
    for(let k=0;k<nCup;k++){const a=-Math.PI*(.86-.18*k),cx=ex+Math.cos(a)*(er-5),cy=ey+Math.sin(a)*(er-5);cups.push([cx,cy]);s+=cupG(cx,cy,a*180/Math.PI-90,k<full)}
    s+=T(ex,ey+19,'FcRn','t-xs t-mid','fill:var(--nerve)');
    for(let i=0;i<3;i++){const q=(clk*.9+i/3)%1,n=Math.floor(clk*.9+i/3),saved=biH(i*13+n*5)>=oc;
      const s0=[ex+(i-1)*14,by+42],inE=[ex+(i-1)*9,ey-8],cup=cups[[1,2,3][i]];
      let px,py,o=1,frag=0;
      if(q<.3){const e=ease(q/.3);px=lerp(s0[0],inE[0],e);py=lerp(s0[1],inE[1],e);o=ramp(q,0,.06)}
      else if(saved){if(q<.45){const e=ease((q-.3)/.15);px=lerp(inE[0],cup[0],e);py=lerp(inE[1],cup[1]+7,e)}
        else{const e=ease(clamp((q-.45)/.4));px=lerp(cup[0],ex-er-10,e);py=lerp(cup[1]+7,by+44,e);o=1-ramp(q,.9,1)}}
      else{if(q<.6){const e=ease((q-.3)/.3);px=lerp(inE[0],lx,e);py=lerp(inE[1],ly,e)}else{px=lx;py=ly;frag=ramp(q,.62,.95);o=1-frag}}
      if(frag>0){[0,2.1,4.2].forEach(a=>{const r=frag*9;s+=`<path d="M${f1(px+Math.cos(a)*r)} ${f1(py+Math.sin(a)*r)}l${f1(Math.cos(a)*3)} ${f1(Math.sin(a)*3)}" style="stroke:var(--ab);stroke-width:2;stroke-linecap:round;opacity:${f1(o)}"/>`})}
      else s+=igg(px,py,6.5,0,o)}
    // junction strip
    s+=T(bx+14,by+190,'endplate: fewer IgG reach the AChRs');
    s+=`<rect x="${bx+8}" y="${by+214}" width="${bw-16}" height="28" rx="4" style="fill:var(--muscle);stroke:var(--memb)"/>`;
    const nR=8,bound=Math.round(nR*.75*lvl),ord=[3,6,0,5,1,7,2,4];
    for(let k=0;k<nR;k++){const xk=bx+18+(bw-36)*k/(nR-1);s+=achr(xk,by+214,7,.2,1);if(ord.indexOf(k)<bound)s+=igg(xk,by+214-9.5-4.9,6.5,Math.PI,1)}
    return s}
  function junction(P,m){const d=D(),{x,y,w}=P,N=NARROW();let s='';
    s+=T(x,y,'1 · AT THE JUNCTION','t-sm','fill:var(--ink)')+T(x,y+13,d.cls==='c5'?'C5 blocked: the attack complex cannot form':'FcRn blocked: IgG is broken down faster');
    const clk=m/SP()*14;
    let rd,tag;
    if(d.cls==='c5'){const inh=m<.02?0:inhNow(m);s+=c5Scene(x,y+20,w,inh,clk,d.glyph);
      if(m<.02){rd='Before the first dose';tag='C5 active'}
      else if(d.pd.pts){const near=d.pd.pts.find(p=>p[2]!=='x'&&Math.abs(p[0]-m)<.2&&m<=d.end+.01);
        rd=drug==='rav'?'C5 inhibition complete':`Complement ≈${+(inh*100).toFixed(1)}% inhibited`;tag=m>d.end+.01?'extension: not reported, assumed held':near?(near[2]==='f'?'trial paper value':'label value'):'interpolated between published values'}
      else{rd='C5 inhibitor on board';tag='schematic: no PD values in our sources'}}
    else{const g=iggNow(m),lvl=clamp(1+g.v/100);s+=fcrnScene(x,y+20,w,lvl,occ(m),clk);
      rd=`Total IgG ${g.v<-.5?'−'+Math.round(-g.v):'≈ 0'}%`;tag=g.k==='sch'?'schematic shape, not a measurement':g.k==='f'?'trial paper value':g.k==='o'?'label, press or approximate value':'interpolated between published values'}
    // key row
    const ky=y+284;
    s+=igg(x+6,ky-3,6,0,1)+T(x+14,ky,'IgG');
    if(d.cls==='c5'){s+=c5G(x+48,ky-3)+T(x+56,ky,'C5')+macG(x+84,ky-3,4.5)+T(x+92,ky,'MAC (C5b-9)')+drugG(x+168,ky-3,d.glyph,1,0)+T(x+177,ky,'drug')}
    else{s+=cupG(x+48,ky-2,0,false)+T(x+56,ky,'FcRn')+cupG(x+94,ky-2,0,true)+T(x+102,ky,'FcRn + drug')}
    s+=T(x,y+306,rd,'t-big')+T(x,y+320,tag,'t-xs');
    // primary endpoint box
    const by=y+332,L=d.ep,bh=18+L.length*13,on=m>=d.end-.3;
    s+=`<rect x="${x}" y="${by}" width="${w}" height="${bh}" rx="8" style="fill:${on?'var(--drug-soft)':'var(--panel)'};stroke:${on?'var(--drug)':'var(--line)'}"/>`;
    L.forEach((l,i)=>{s+=T(x+10,by+15+i*13,l.replace(/^ {2}/,''),i?'t-xs':'t-xs',i?`fill:var(--ink)${/^ {2}/.test(l)?';opacity:.85':''}`:`fill:var(--drug);font-weight:700`)});
    return s}

  /* ---------- panel 2: MG-ADL ---------- */
  function yMax(){const d=D();let a=[...d.dr,...(d.pb||[]),...(d.cmp||[])].map(p=>-p[1]);
    if(OLE()){(d.oleDr||[]).forEach(p=>a.push(-p[1]));(d.sw||[]).forEach(p=>a.push(-p[1]));if(d.cyc)a.push(-Math.min(...d.cyc.rng))}
    return Math.max(4,Math.ceil(Math.max(...a)+.7))}
  function ticks(sp,end){const st=sp<=7?1:sp<=13?2:sp<=27?4:sp<=62?12:sp<=90?13:26,a=[];for(let v=0;v<=sp+1e-6;v+=st)a.push(+v.toFixed(2));
    if(sp<=27&&sp-a[a.length-1]>=st*.45)a.push(+sp.toFixed(2));return a}
  function adl(P,m){const d=D(),c=curves(),{x,y,w}=P,N=NARROW(),sp=SP();let s='';
    const px0=x+(N?56:64),px1=x+w-(N?80:92),py0=y+34,py1=y+(N?184:200),ym=yMax(),X=v=>px0+v/sp*(px1-px0),Y=v=>py0+(-v)/ym*(py1-py0);
    s+=T(x,y,'2 · MG-ADL: CHANGE FROM BASELINE','t-sm','fill:var(--ink)')+T(x,y+15,'0 to 24 scale, higher = worse. Lower on the chart = better.');
    for(let v=0;v<=ym;v++)s+=ln(px0,Y(-v),px1,Y(-v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(-v)+3,v?'−'+v:'0','t-xs t-end');
    ticks(sp).forEach(v=>{s+=T(X(v),py1+13,String(v),'t-xs t-mid')});s+=T(x,py1+13,drug==='roz'&&!OLE()?'week (day 43 = 6.1)':'week');
    if(OLE()&&sp>d.end){s+=`<rect x="${f1(X(d.end))}" y="${py0}" width="${f1(px1-X(d.end))}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`+T(px1-4,py0+11,'OPEN-LABEL, NO PLACEBO','t-xs t-end')}
    // annotations near the bottom
    (d.ann||[]).forEach((a,i)=>{if(m>=a.w-.01)s+=ln(X(a.w),py1-14-i*12,X(a.w),py1,'stroke:var(--ink);opacity:.35;stroke-dasharray:1 2')+T(X(a.w)+4,py1-6-i*12,a.txt,'t-xs','fill:var(--ink)')});
    if(d.avg&&m>=d.avg[0]){const a=X(d.avg[0]),b=X(Math.min(d.avg[1],sp)),yy=py0+8;s+=ln(a,yy,b,yy,'stroke:var(--drug);stroke-width:1.4')+ln(a,yy-3,a,yy+3,'stroke:var(--drug)')+ln(b,yy-3,b,yy+3,'stroke:var(--drug)')+T(a-4,yy+3,'averaged wk 22–24','t-xs t-end','fill:var(--drug)')}
    const dEnd=c.dr.wMax,mpD=Math.min(m,dEnd),labs=[];
    // placebo or comparator
    let pv=null,pEnd=null;
    if(pbo&&c.pb){pEnd=d.pb[d.pb.length-1][0];const mp=Math.min(m,pEnd);s+=`<path d="${poly(c.pb,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.4"/>`;
      d.pb.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--muted)',p[2])});pv=c.pb(mp);if(!(OLE()&&m>pEnd+.5))labs.push({y:Y(pv),x:X(mp),t:`placebo ${fmt(pv)}`,c:'var(--muted)'})}
    if(pbo&&c.cmp){const ce=d.cmp[d.cmp.length-1][0],mp=Math.min(m,ce);s+=`<path d="${poly(c.cmp,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.2;stroke-dasharray:5 3"/>`;
      d.cmp.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--muted)',p[2])});labs.push({y:Y(c.cmp(mp)),x:X(mp),t:`IV ${fmt(c.cmp(mp))}`,c:'var(--muted)'})}
    // modelled control (zilucoplan, extension)
    if(OLE()&&d.model&&pbo&&m>=d.end){const o=ramp(m,d.end,d.model.w);const wx=lerp(d.end,d.model.w,o);
      s+=ln(X(d.end),Y(d.pb[d.pb.length-1][1]),X(wx),Y(lerp(d.pb[d.pb.length-1][1],d.model.c,o)),'stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 3');
      if(m>=d.model.w)s+=dia(X(d.model.w),Y(d.model.c),'var(--muted)',false)+dia(X(d.model.w),Y(d.model.d),'var(--drug)',false)}
    // switch arm (placebo, then drug in the extension)
    if(c.sw&&m>d.end){const se=c.sw.wMax,mp=Math.min(m,se);s+=`<path d="${poly(c.sw,d.end,mp,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:1.8;stroke-dasharray:5 3"/>`;
      d.sw.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--drug)',p[2])});
      labs.push({y:Y(c.sw(mp)),x:X(mp),t:`switched ${fmt(c.sw(mp))}`,c:'var(--drug)'})}
    // drug arm
    s+=`<path d="${poly(c.dr,0,mpD,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2.8"/>`;
    [...d.dr,...(OLE()&&d.oleDr?d.oleDr:[])].forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--drug)',p[2])});
    const dv=c.dr(mpD),dTxt=`${drug==='efs'?'SC':'drug'} ${fmt(dv)}`;if(c.sw&&m>dEnd+.5)s+=T(X(dEnd)-5,Y(dv)-6,fmt(dv),'t-xs t-end','fill:var(--drug);font-weight:700');else labs.push({y:Y(dv),x:X(mpD),t:dTxt,c:'var(--drug)',main:1});
    // cyclic extension: range bars
    if(OLE()&&d.cyc){d.cyc.starts.forEach((st,i)=>{const wv=st+d.cyc.at;if(m<wv-.01||wv>sp)return;
      const a=Y(d.cyc.rng[0]),b=Y(d.cyc.rng[1]),xx=X(wv);s+=ln(xx,a,xx,b,'stroke:var(--drug);stroke-width:2.4')+ln(xx-3,a,xx+3,a,'stroke:var(--drug);stroke-width:1.6')+ln(xx-3,b,xx+3,b,'stroke:var(--drug);stroke-width:1.6');
      if(i===0&&d.cyc.first!=null)s+=dot(xx,Y(d.cyc.first),'var(--drug)','f');
      s+=ln(X(st),py1-4,X(st),py1,'stroke:var(--drug);stroke-width:1.4')});
      s+=T(X(d.cyc.starts[0])+6,py1-8,'cycles: range, from each cycle baseline','t-xs','fill:var(--drug)')}
    // efgartigimod: responders instead of a placebo mean
    if(d.resp&&!OLE()&&m>=4){const bx0=X(sp*.4),bw=px1-bx0-34,o=ramp(m,4,5);
      s+=`<g style="opacity:${f1(o)}">`+T(bx0,py0+10,'cycle 1 responders, AChR+','t-xs','fill:var(--ink)');
      [[d.resp.d,'drug','var(--drug)'],[d.resp.p,'placebo','var(--muted)']].forEach(([v,l,col],i)=>{const yy=py0+16+i*16;
        s+=`<rect x="${f1(bx0)}" y="${yy}" width="${f1(bw)}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(bx0)}" y="${yy}" width="${f1(bw*v/100)}" height="10" rx="3" style="fill:${col}"/>`+T(bx0+bw+4,yy+8,v+'%','t-xs','fill:'+col)+T(bx0+3,yy+8,l,'t-xs',`fill:${i?'var(--ink)':'var(--panel)'}`)});
      s+='</g>'}
    s+=ln(X(m),py0,X(m),py1,'stroke:var(--ink);opacity:.3');
    s+=dot(X(0),Y(0),'var(--drug)','f');
    // end labels, pushed apart
    if(m>=.3){labs.sort((a,b)=>a.y-b.y);for(let i=1;i<labs.length;i++)if(labs[i].y-labs[i-1].y<12)labs[i].y=labs[i-1].y+12;
      const over=labs.length?labs[labs.length-1].y-(py1-2):0;if(over>0)labs.forEach(l=>l.y-=over);
      labs.forEach(l=>{s+=T(l.x+6,l.y+3,l.t,'t-xs',`fill:${l.c}${l.main?';font-weight:700':''}`)})}
    // readout lines
    let r1;
    if(!pbo&&(d.pb||d.cmp))r1='Placebo arm hidden: press "Placebo arm" to compare';
    else if(d.pb){const pe=d.pb[d.pb.length-1][0];
      if(m<.2)r1='Baseline: both arms start at 0';
      else if(m<pe-.2){const g=c.dr(m)-c.pb(m);r1=`Gap now: ${fmt(g)} points (interpolated)`}
      else r1=`Gap at the trial endpoint: ${d.gapPub[0]<0?'−':''}${Math.abs(d.gapPub[0])} points (${d.gapPub[1]})`}
    else if(d.cmp)r1='No placebo arm: the SC form was compared with IV';
    else r1='Placebo weekly means: not published in our sources';
    const late=OLE()&&m>d.end+.2&&d.oleR2;
    s+=T(x,py1+30,r1,'t-xs','fill:var(--ink)')+T(x,py1+44,late?d.oleR2:d.r2)+T(x,py1+58,late?d.oleR3:d.r3);
    if(ole&&!d.oleSpan)s+=T(px1,py0+11,'no extension values in our sources','t-xs t-end');
    return s}

  /* ---------- panel 3: drug effect, doses, safety ---------- */
  function lane(P,m){const d=D(),c=curves(),{x,y,w}=P,N=NARROW(),sp=SP();let s='';
    const px0=x+(N?56:64),px1=x+w-(N?80:92),py0=y+30,py1=y+110,X=v=>px0+v/sp*(px1-px0),c5=d.cls==='c5';
    const Y=c5?(v=>py1-v/100*(py1-py0)):(v=>py0+(-v)/80*(py1-py0));
    s+=T(x,y,c5?'3 · COMPLEMENT, DOSES AND SAFETY':'3 · TOTAL IgG, DOSES AND SAFETY','t-sm','fill:var(--ink)');
    s+=T(x,y+15,c5?'% of complement activity blocked, where published':drug==='efs'?'Total IgG, % change: SC (indigo) vs IV (grey)':drug==='roz'?'Total IgG, % change; dotted line: falls of up to 79%':drug==='nip'?'Total IgG, % change: schematic, up to ≈75% (press)':'Total IgG, % change from baseline');
    (c5?[0,50,100]:[0,-40,-80]).forEach(v=>{s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,(v<0?'−'+(-v):v)+'%','t-xs t-end')});
    ticks(sp).forEach(v=>{s+=T(X(v),py1+13,String(v),'t-xs t-mid')});s+=T(x,py1+13,'week');
    if(OLE()&&sp>d.end)s+=`<rect x="${f1(X(d.end))}" y="${py0}" width="${f1(px1-X(d.end))}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`;
    if(c5){
      if(d.pd.pts){const pe=d.pd.pts[d.pd.pts.length-1][0],mp=Math.min(m,pe);
        s+=`<path d="${poly(c.pd,0,mp,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2.6"/>`;
        d.pd.pts.forEach(p=>{if(p[2]!=='x'&&m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--drug)',p[2])});
        if(m>=.1)s+=T(px0+8,Y(100)+19,d.pd.lab,'t-xs','fill:var(--drug)')}
      else if(m>=.02){const a=X(0),b=X(Math.min(m,sp));s+=`<rect x="${f1(a)}" y="${f1(Y(100))}" width="${f1(b-a)}" height="${f1(Y(80)-Y(100))}" style="fill:var(--drug-soft);stroke:var(--drug);stroke-dasharray:3 3"/>`;
        s+=T(px0+4,Y(60),'schematic: C5 inhibitor present','t-xs','fill:var(--drug)')+T(px0+4,Y(60)+12,'no pharmacodynamic values in our sources','t-xs')}}
    else{const g=d.igg;
      if(g.band){const a=X(g.band[0]),b=X(g.band[1]);s+=`<rect x="${f1(a)}" y="${f1(Y(0))}" width="${f1(b-a)}" height="${f1(Y(-12)-Y(0))}" style="fill:var(--good-soft);stroke:var(--good);stroke-width:.8"/>`+T(a,py1-4,'IgG back to baseline, weeks 7 to 11','t-xs','fill:var(--good)')}
      if(g.max){s+=ln(px0,Y(g.max),px1,Y(g.max),'stroke:var(--drug);stroke-dasharray:2 3;opacity:.7')}
      if(g.sch){s+=`<path d="${poly(c.igg,0,Math.min(m,sp),X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2.2;stroke-dasharray:5 3"/>`;
        s+=ln(px0,Y(g.sch),px1,Y(g.sch),'stroke:var(--drug);stroke-dasharray:1 3;opacity:.6');
}
      else{const pe=g.pts[g.pts.length-1][0],mp=Math.min(m,pe);
        if(g.cmp&&pbo){s+=`<path d="${poly(c.iggC,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:5 3"/>`;g.cmp.forEach(p=>{if(p[2]!=='x'&&m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--muted)',p[2])})}
        s+=`<path d="${poly(c.igg,0,mp,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2.6"/>`;
        g.pts.forEach(p=>{if(p[2]!=='x'&&m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--drug)',p[2])});
        // schematic repeats: a later trial cycle, then extension cycles
        let st=(g.cyc||[]).slice();if(OLE()&&d.cyc)st=st.concat(d.cyc.starts);st.sort((a,b)=>a-b);
        const nx=v=>{const q=st.find(z=>z>v+1e-6);return q==null?sp:q};
        if(!g.len&&m>pe)s+=`<path d="${poly(u=>c.iggShape(u),pe,Math.min(m,nx(0),sp),X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2;stroke-dasharray:5 3"/>`;
        st.forEach(s0=>{if(m>s0&&s0<sp){const e=Math.min(m,sp,nx(s0));s+=`<path d="${poly(u=>c.iggShape(u-s0),s0,e,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2;stroke-dasharray:5 3"/>`}});
        if(OLE()&&d.cyc&&g.cycR)d.cyc.starts.forEach(s0=>{const wv=s0+d.cyc.at;if(m>=wv-.01&&wv<=sp){const xx=X(wv),a=Y(g.cycR[0]),b=Y(g.cycR[1]);s+=ln(xx,a,xx,b,'stroke:var(--drug);stroke-width:2.4')+ln(xx-3,a,xx+3,a,'stroke:var(--drug)')+ln(xx-3,b,xx+3,b,'stroke:var(--drug)')}})}}
    // timed safety markers
    (d.sfx||[]).forEach(f=>{if(f.ole&&!OLE())return;if(f.w>sp||m<f.w-.01)return;const yy=c5?py1-5:py0+10;s+=ln(X(f.w),py0,X(f.w),py1,'stroke:var(--warn);stroke-dasharray:2 2')+T(X(f.w)+(c5?-4:4),yy,f.lab,c5?'t-xs t-end':'t-xs','fill:var(--warn)')});
    s+=ln(X(m),py0,X(m),y+160,'stroke:var(--ink);opacity:.3');
    // dose ticks
    const rd=y+136,rv=y+154;s+=T(x,rd+3,'doses')+T(x,rv+3,'vaccines');
    if(d.daily){const e=OLE()?sp:d.end;s+=`<rect x="${f1(X(0))}" y="${rd-3}" width="${f1(X(e)-X(0))}" height="6" rx="3" style="fill:var(--drug-soft);stroke:var(--drug);stroke-width:.8"/>`;
      s+=`<rect x="${f1(X(0))}" y="${rd-3}" width="${f1(X(Math.min(m,e))-X(0))}" height="6" rx="3" style="fill:var(--drug)"/>`;
      s+=T(X(e)+4,rd+3,'daily','t-xs','fill:var(--drug)')}
    let all=d.doses.slice();if(OLE()&&d.oleDoses)all=all.concat(d.oleDoses.map(v=>[v,'f']));
    if(OLE()&&d.cyc){const per=drug==='roz'?6:4;d.cyc.starts.forEach(s0=>{for(let k=0;k<per;k++)all.push([s0+k,'o'])})}
    all.forEach(([v,k])=>{if(v>sp+1e-6)return;const past=v<=m+1e-6,xx=X(v);
      s+=k==='o'?`<circle cx="${f1(xx)}" cy="${rd}" r="2.4" style="fill:${past?'var(--drug)':'var(--panel)'};stroke:var(--drug);stroke-width:1.1;opacity:${past?1:.6}"/>`
               :ln(xx,rd-4,xx,rd+4,`stroke:${past?'var(--drug)':'var(--muted)'};stroke-width:1.4;opacity:${past?1:.45}`)});
    // vaccination lane
    if(c5){if(d.vacc){s+=dia(px0+3,rv,'var(--comp)',true)+T(px0+11,rv+3,'MenACWY + MenB ≥2 wk before dose 1, or antibiotics','t-xs','fill:var(--comp)')}
      else s+=T(px0,rv+3,'label not yet available in our sources','t-xs')}
    else{let st=[0].concat(d.igg.cyc||[]);if(OLE()&&d.cyc)st=st.concat(d.cyc.starts);st.forEach(v=>{if(v<=sp)s+=dia(X(v)+3,rv,'var(--nerve)',v<=m)})}
    // safety text
    const sy=y+176;d.sf.forEach((l,i)=>{const box=i===0&&/^Boxed/.test(l);s+=T(x,sy+i*14,l,'t-xs',box?'fill:var(--bad);font-weight:700':i===0?'fill:var(--ink)':'')});
    return s}

  function legend(x,y,N){let s='';const sw=(cx,cy,k)=>dot(cx,cy,'var(--muted)',k);
    const dash=(x0,y0)=>ln(x0,y0-3,x0+18,y0-3,'stroke:var(--drug);stroke-width:2;stroke-dasharray:4 3');
    const bar=(x0,y0)=>ln(x0+4,y0-8,x0+4,y0+2,'stroke:var(--drug);stroke-width:2.4')+ln(x0+1,y0-8,x0+7,y0-8,'stroke:var(--drug)')+ln(x0+1,y0+2,x0+7,y0+2,'stroke:var(--drug)');
    if(!N){s+=sw(x+4,y-3,'f')+T(x+12,y,'trial paper value')+sw(x+124,y-3,'o')+T(x+132,y,'label, press or calculated')+dash(x+292,y)+T(x+315,y,'schematic')+bar(x+384,y)+T(x+396,y,'range across cycles')+dia(x+524,y-3,'var(--comp)',true)+T(x+533,y,'vaccination step');
      s+=T(x,y+15,'Lines between dots are interpolated shapes, not measurements. The junction is a schematic of one site, not to scale.')}
    else{s+=sw(x+4,y-3,'f')+T(x+12,y,'trial paper value')+sw(x+132,y-3,'o')+T(x+140,y,'label, press or calculated');
      s+=dash(x,y+14)+T(x+24,y+14,'schematic')+bar(x+100,y+14)+T(x+112,y+14,'range')+dia(x+168,y+11,'var(--comp)',true)+T(x+177,y+14,'vaccination step');
      s+=T(x,y+29,'Lines between dots are interpolated, not data.')+T(x,y+42,'The junction is a schematic, not to scale.')}
    return s}

  function draw(m){m=+m;const N=vb(svg,'720 596','400 1066');
    const L=N?{J:{x:12,y:16,w:376},A:{x:12,y:500,w:376},S:{x:12,y:770,w:376},lg:[12,1010]}
             :{J:{x:12,y:16,w:264},A:{x:296,y:16,w:412},S:{x:296,y:300,w:412},lg:[12,566]};
    let s=`<defs>${marker('biArG','var(--good)')}${marker('biArB','var(--bad)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=junction(L.J,m)+adl(L.A,m)+lane(L.S,m)+legend(L.lg[0],L.lg[1],N);
    svg.innerHTML=s;
    const d=D(),c=curves();
    $('#biWk').textContent=m<.05?'baseline':`week ${f1(m)}`;
    const S=steps(),p=phaseOf(S,m);setSt(p,m);
    const mpD=Math.min(m,c.dr.wMax),dv=c.dr(mpD);
    let pbTxt='';if(d.pb){const pe=d.pb[d.pb.length-1][0];pbTxt=`<span>Placebo <b>${fmt(c.pb(Math.min(m,pe)))}</b></span>`}
    let pdTxt='';if(d.cls==='c5')pdTxt=`<span>C5 <b>${m<.02?'active':d.pd.pts?+(inhNow(m)*100).toFixed(1)+'% blocked':'blocked (schematic)'}</b></span>`;
    else{const g=iggNow(m);pdTxt=`<span>Total IgG <b>${g.v<-.5?'−'+Math.round(-g.v):'≈0'}%</b></span>`}
    const read=`<p class="readout"><span>Week <b>${f1(m)}</b></span><span>${d.nm} MG-ADL <b>${fmt(dv)}</b></span>${pbTxt}${pdTxt}</p><p class="bi-lab"><b>Label and approvals.</b> ${d.lab}</p>`;
    $('#biNote').innerHTML=noteHTML(S[p])+read}
  function buildSteps(){const S=steps(),key=drug+OLE();if(key===stepKey)return;stepKey=key;
    stEl.innerHTML=S.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');stepIdx=-1}
  function setSt(i,m){const S=steps();if(i!==stepIdx){$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));stepIdx=i}
    rg.setAttribute('aria-valuetext',`Week ${f1(m)}. Step ${i+1} of ${S.length}: ${S[i].t}`)}
  stEl.setAttribute('role','group');stEl.setAttribute('aria-label','Steps');
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=steps()[+b.dataset.st];rg.value=atOf(s);draw(+rg.value)});
  const stop=playWire(rg,$('#biPlay'),draw,16000,'Replay','biologics');
  function setMax(){const mx=SP();rg.max=mx;if(+rg.value>mx)rg.value=mx;buildSteps();draw(+rg.value)}
  $$('[data-bid]').forEach(b=>b.onclick=()=>{drug=b.dataset.bid;$$('[data-bid]').forEach(x=>x.setAttribute('aria-pressed',x===b));stop();setMax()});
  $('#biPbo').onclick=()=>{pbo=!pbo;$('#biPbo').setAttribute('aria-pressed',pbo);draw(+rg.value)};
  $('#biOle').onclick=()=>{ole=!ole;$('#biOle').setAttribute('aria-pressed',ole);stop();setMax()};
  buildSteps();draw(+rg.value);

  /* ---------- how big is the benefit ---------- */
  const mg=$('#biMag');let mode='d',sel='zil',grow=1,stopG=null;
  function drawMag(){
    const N=vb(mg,'720 10','400 10'),C=BI_MAG[mode],rows=C.rows,rh=N?44:28,top=40,W=N?400:720;
    const H=top+rows.length*rh+42;mg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const ax0=N?12:330,ax1=N?384:700,Xs=v=>ax0+v/C.max*(ax1-ax0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    rows.forEach((r,i)=>{const ry=top+i*rh;if(r.id===sel)s+=`<rect x="4" y="${ry-2}" width="${W-8}" height="${rh-2}" rx="8" style="fill:var(--drug-soft)"/>`});
    const axY=top+rows.length*rh+2;
    C.ticks.forEach(v=>{s+=ln(Xs(v),top-6,Xs(v),axY,'stroke:var(--line);stroke-dasharray:2 4')+T(Xs(v),axY+14,v,'t-xs t-mid')});
    s+=T(N?12:ax0,axY+30,C.unit);
    const on=sel==='mcid',rst=`stroke:var(--warn);stroke-width:${on?2.4:1.6};stroke-dasharray:5 3`;
    if(N)rows.forEach((_,j)=>{const ry=top+j*rh;s+=ln(Xs(2),ry+17,Xs(2),ry+36,rst)});else s+=ln(Xs(2),top-8,Xs(2),axY,rst);
    s+=T(N?Xs(2)+4:Xs(2)+4,top-14,'2-point MCID (one person)','t-xs',`fill:var(--warn);font-weight:${on?700:500}`);
    rows.forEach((r,i)=>{const ry=top+i*rh,by=N?ry+22:ry+7,isOn=r.id===sel,k=grow;
      s+=T(N?12:16,N?ry+12:ry+15,r.lab,'t-sm',`fill:var(--ink);font-weight:${isOn?700:500}`);
      if(r.na){s+=T(N?12:ax0+4,N?by+9:by+9,r.na,'t-xs','font-style:italic');return}
      if(mode==='d'){s+=`<rect x="${ax0}" y="${by}" width="${f1(Math.max(0,(Xs(r.v)-ax0)*k))}" height="11" rx="3" style="${r.open?'fill:var(--drug-soft);stroke:var(--drug);stroke-width:1.4':'fill:var(--drug)'};opacity:${isOn?1:.8}"/>`;
        if(r.lo!=null&&k>.98){const a=Xs(r.lo),b=Xs(r.hi);s+=ln(a,by+5.5,b,by+5.5,'stroke:var(--ink);stroke-width:1.3')+ln(a,by+1,a,by+10,'stroke:var(--ink);stroke-width:1.3')+ln(b,by+1,b,by+10,'stroke:var(--ink);stroke-width:1.3')}}
      else{s+=`<rect x="${ax0}" y="${by}" width="${f1(Math.max(0,(Xs(r.p)-ax0)*k))}" height="11" rx="3" style="${r.open?'fill:var(--panel);stroke:var(--muted);stroke-width:1.4':'fill:var(--muted)'};opacity:${isOn?1:.75}"/>`;
        if(k>.5){s+=ln(Xs(r.p),by+5.5,Xs(r.v),by+5.5,'stroke:var(--drug);stroke-width:1.4')+`<circle cx="${f1(Xs(r.v))}" cy="${by+5.5}" r="4.5" style="fill:var(--drug)"/>`}}
      s+=T(N?388:ax0-10,N?ry+12:ry+15,r.txt,'t-sm t-end',`fill:${mode==='d'?'var(--drug)':'var(--muted)'};font-weight:700;opacity:${f1(ramp(k,.5,1))}`)});
    mg.innerHTML=s;
    const ex=BI_EX[sel];$('#biMagNote').innerHTML=noteHTML({k:ex.k,t:ex.t,txt:ex.txt,
      pt:mode==='d'?'Each bar is how many more MG-ADL points the drug group improved than the placebo group, on a 24-point scale. The dashed line is the 2-point change that best matched a person feeling better.':'The grey bar is how much the placebo group improved; the dot is the drug group. The drug\'s extra benefit is the gap between them.',
      hook:'Placebo arms in MG trials improve by about 1 to 3 MG-ADL points, so a drug-minus-placebo difference is usually smaller than the drug arm\'s own change.'})}
  function magBtns(){const C=BI_MAG[mode],ids=[...C.rows.map(r=>[r.id,r.lab.split(' · ')[0]+(r.lab.includes('seronegative')?' (seroneg.)':r.lab.includes('ADAPT')&&mode==='d'?' (ADAPT)':'')]),['mcid','2-point threshold']];
    $('#biMagBtns').innerHTML=ids.map(([id,l])=>`<button class="btn" data-mg="${id}" aria-pressed="${id===sel}">${l}</button>`).join('')}
  $('#biMagBtns').addEventListener('click',e=>{const b=e.target.closest('[data-mg]');if(!b)return;sel=b.dataset.mg;$$('[data-mg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMag()});
  function setMode(md){mode=md;$('#biMagD').setAttribute('aria-pressed',md==='d');$('#biMagP').setAttribute('aria-pressed',md==='p');
    sel=md==='d'?'zil':'p_nip';magBtns();stopG&&stopG();grow=0;stopG=animate(700,p=>{grow=ease(p);drawMag()},()=>{grow=1;drawMag()})}
  $('#biMagD').onclick=()=>setMode('d');$('#biMagP').onclick=()=>setMode('p');
  magBtns();drawMag();
  const prevR=redraws.biologics;redraws.biologics=()=>{prevR&&prevR();drawMag()};

  $('#biDebate').innerHTML=`
   <div class="card"><h4><span class="tag good">One reading</span>Real, fast and lasting benefit</h4><ul>
    <li>Every placebo-controlled pivotal C5 and FcRn trial beat placebo on MG-ADL. Pooled estimates over placebo are −2.17 points (95% CI −2.67 to −1.67) in a 2023 meta-analysis and about 1.7 points across 6 AChR-positive trials in a 2026 one. [[Sacca2023,Filippakopoulou2026]]</li>
    <li>The 2-point MCID describes one person\'s change; responder analyses, which count individuals, separate more clearly (zilucoplan 73.1% vs 46.1%; ADAPT 68% vs 30%). [[Muppidi2011,FDAZilbrysq2026,Howard2021]]</li>
    <li>Onset is fast: complete C5 inhibition after the first ravulizumab infusion, and, in one network meta-analysis, efgartigimod, zilucoplan and rozanolixizumab already ahead of placebo at week 1. [[Vu2023,Zhong2024]]</li>
    <li>Extensions show durable control: eculizumab exacerbations fell 75.2%, ravulizumab held −4.0 to week 164, and complement-inhibitor extensions showed steroid sparing to 156 weeks. [[Muppidi2019,Vu2025,Filippakopoulou2026]]</li></ul></div>
   <div class="card"><h4><span class="tag warn">Another reading</span>Modest gains over a strong placebo</h4><ul>
    <li>Placebo arms improve by about 1 to 3 points, and several group differences (ravulizumab −1.6, gefurulimab −1.6, nipocalimab −1.45, satralizumab −1.02) sit below 2 points. [[Muppidi2011,Gwathmey2026,Antozzi2025,Habib2025F]]</li>
    <li>REGAIN missed its prespecified primary analysis (p=0.0698); its approval is cited as an example of how the choice of analysis shapes a trial\'s reading. [[Howard2017,FDASoliris2026]]</li>
    <li>Benefit wanes once IgG recovers: 4 weeks after the last dose no biologic beat placebo on QMG in one network meta-analysis. [[Zhong2024]]</li>
    <li>Extensions have no placebo, a key comparison is sponsor-funded and depends on timepoint, and zilucoplan\'s only week-24 comparison is a sponsor model, because RAISE had no placebo data after week 12. [[vanSteen2024,delaBorderie2024]]</li>
    <li>A published model put eculizumab at $3,338,000 and efgartigimod at $1,987,000 per QALY, far above usual thresholds. [[Lien2024]]</li></ul></div>`;

  /* ---------- targets table ---------- */
  $('#biTargets').innerHTML=`<table><thead><tr><th>Drug</th><th>Target and molecule</th><th>Route and schedule (label)</th><th>Antibody status on label</th><th>Approvals for gMG</th><th>Boxed warning and key warnings</th></tr></thead><tbody>
   <tr><th>Eculizumab<small>Soliris</small><span class="tag ab cls">C5</span></th><td>Antibody to C5; stops C5 cleavage, so no membrane attack complex forms [[Howard2018]]</td><td>IV: 900 mg weekly ×4, 1,200 mg at week 4, then every 2 weeks [[FDASoliris2026]]</td><td>AChR+; adults and children 6 and older (US) [[FDASoliris2026]]</td><td>EC 21 Aug 2017; FDA 23 Oct 2017; Japan 26 Dec 2017 [[AlexionEU2017,FDADrugsFDA2026,AlexionJapan2017]]</td><td><b>Boxed:</b> serious meningococcal infections; REMS; vaccination ≥2 weeks before the first dose [[FDASoliris2026]]</td></tr>
   <tr><th>Ravulizumab<small>Ultomiris</small><span class="tag ab cls">C5</span></th><td>Long-acting monoclonal antibody to C5 [[Vu2022]]</td><td>IV, weight-based: loading dose, then day 15 and every 8 weeks; extra dose after PLEX or IVIg [[FDAUltomiris2025]]</td><td>AChR+ adults [[FDAUltomiris2025]]</td><td>FDA 27 Apr 2022; Japan Aug 2022; EC Sep 2022 (add-on) [[FDADrugsFDA2026,MGNewsUltomirisJapan2022,MGNewsUltomirisEU2022]]</td><td><b>Boxed:</b> serious meningococcal infections; REMS [[FDAUltomiris2025]]</td></tr>
   <tr><th>Zilucoplan<small>Zilbrysq</small><span class="tag ab cls">C5</span></th><td>Macrocyclic peptide that inhibits C5 [[Howard2023]]</td><td>SC, self-injected once daily: 16.6, 23 or 32.4 mg by weight [[FDAZilbrysq2026]]</td><td>AChR+ (trial population; EU label: AChR+ adults, add-on) [[Howard2023,EMAZilbrysq2026]]</td><td>Japan 25 Sep 2023 (first); FDA 17 Oct 2023; EU 1 Dec 2023 [[UCBJapan2023,FDADrugsFDA2026,EMAZilbrysq2026]]</td><td><b>Boxed:</b> serious meningococcal infections; REMS. Also pancreatitis, pancreatic cysts, morphea [[FDAZilbrysq2026]]</td></tr>
   <tr><th>Efgartigimod IV<small>Vyvgart</small><span class="tag drug cls">FcRn</span></th><td>FcRn antagonist: blocks FcRn so IgG is not recycled [[Ulrichts2018]]</td><td>IV 10 mg/kg weekly ×4 per cycle; further cycles by clinical evaluation [[FDAVyvgart2026]]</td><td>Since 8 May 2026 (US): adults with gMG, any antibody status [[FDAVyvgart2026]]</td><td>FDA 17 Dec 2021; Japan Jan 2022; EU 10 Aug 2022 (add-on, AChR+) [[FDADrugsFDA2026,argenxJapan2022,EMAVyvgart2026]]</td><td>No boxed warning in our sources; live vaccines not advised [[FDAVyvgart2026]]</td></tr>
   <tr><th>Efgartigimod SC<small>Vyvgart Hytrulo</small><span class="tag drug cls">FcRn</span></th><td>Efgartigimod with hyaluronidase [[Howard2024b]]</td><td>SC 1,000 mg weekly ×4 per cycle; prefilled syringe can be self-injected [[FDAVyvgartHytrulo2026]]</td><td>Not detailed in our sources</td><td>FDA 20 Jun 2023 [[FDADrugsFDA2026]]</td><td>Injection-site reactions 38% [[FDAVyvgartHytrulo2026]]</td></tr>
   <tr><th>Rozanolixizumab<small>Rystiggo</small><span class="tag drug cls">FcRn</span></th><td>FcRn blocker; binds away from the albumin site, with no meaningful albumin or lipid change in pooled data [[Bril2026]]</td><td>SC infusion by pump, weekly ×6 per cycle: 420, 560 or 840 mg by weight [[FDARystiggo2026]]</td><td>AChR+ or MuSK+ adults [[FDARystiggo2026]]</td><td>FDA 26 Jun 2023; Japan 25 Sep 2023; EU 5 Jan 2024 [[FDADrugsFDA2026,UCBJapan2023,EMARystiggo2026]]</td><td>Warning: aseptic meningitis; live vaccines not advised [[FDARystiggo2026]]</td></tr>
   <tr><th>Nipocalimab<small>Imaavy</small><span class="tag drug cls">FcRn</span></th><td>FcRn blocker, given continuously [[Antozzi2025]]</td><td>IV 30 mg/kg once, then 15 mg/kg every 2 weeks, continuously [[FDAImaavy2026]]</td><td>AChR+ or MuSK+, age 12 and older [[FDAImaavy2026]]</td><td>FDA 29 Apr 2025; EU 28 Nov 2025 (add-on); Japan: none found [[FDADrugsFDA2026,EMAImaavy2026]]</td><td>Label: lipid rises; serious EBV-related events in the extension; live vaccines not advised [[FDAImaavy2026]]</td></tr>
   <tr><th>Gefurulimab<small>Klygefa (EU)</small><span class="tag ab cls">C5</span></th><td>Nanobody binding C5 and albumin [[Gwathmey2026]]</td><td>SC weekly after a loading dose (trial) [[Gwathmey2026]]</td><td>AChR+ adults, add-on (CHMP opinion) [[EMAKlygefa2026]]</td><td>CHMP positive opinion 17 Sep 2026; no FDA decision found [[EMAKlygefa2026]]</td><td>No label in our sources</td></tr>
   </tbody></table>`;

  /* ---------- newer agents ---------- */
  $('#biNew').innerHTML=`
   <div class="card"><span class="ev est">Phase 3 · approved in the US</span><h4>Inebilizumab (MINT)</h4><p>An anti-CD19 antibody that depletes B cells. In 238 people (190 AChR+, 48 MuSK+), with a mandatory steroid taper, MG-ADL improved by <span class="num">−1.9</span> versus placebo at week 26. The FDA approved it for AChR+ or MuSK+ adults in December 2025. [[Nowak2025,AmgenUplizna2025]]</p></div>
   <div class="card"><span class="ev early">Phase 3 · development stopped</span><h4>Satralizumab (LUMINESCE)</h4><p>An anti-IL-6-receptor antibody. The week-24 MG-ADL difference was <span class="num">−1.02</span>, which the authors called small; the sponsor stopped development and ended the extension. [[Habib2025F]]</p></div>
   <div class="card"><span class="ev early">Phase 3 · under FDA review</span><h4>Cemdisiran ± pozelimab (NIMBLE)</h4><p>Cemdisiran is an siRNA that silences C5 production, injected every 12 weeks; pozelimab is a C5 antibody. Week-24 differences: <span class="num">−2.3</span> alone, <span class="num">−1.7</span> combined. FDA and EMA accepted applications in June 2026 (press). [[Vu2026b,NeurologyLiveCemdisiran2026]]</p></div>
   <div class="card"><span class="ev early">Phase 3 (China) · not approved</span><h4>Batoclimab</h4><p>An FcRn blocker: day-43 difference <span class="num">−1.9</span> and sustained responders 58.2% vs 31.3%. In phase 2a, albumin fell by about 12 g/L and cholesterol rose, reversing after stopping. [[Yan2024,Nowak2024]]</p></div>
   <div class="card"><span class="ev early">Phase 3 · EU opinion</span><h4>Gefurulimab (PREVAIL)</h4><p>A C5 and albumin binding nanobody given weekly under the skin: week-26 difference <span class="num">−1.6</span>, with a CHMP positive opinion in September 2026. [[Gwathmey2026,EMAKlygefa2026]]</p></div>
   <div class="card"><span class="ev early">Mixed evidence</span><h4>Rituximab and tocilizumab</h4><p>In BeatMG (mild to moderate AChR+ gMG), rituximab missed its steroid-sparing goal: 60% vs 56%, a futility result. In a network meta-analysis it did not significantly improve MG-ADL: <span class="num">−0.92</span> (95% CI −2.24 to 0.39). In new-onset generalized MG, RINOMAX found the opposite: minimal manifestations at 16 weeks in 71% vs 29%. [[Nowak2022,Sacca2023,Piehl2022]]</p><p>Tocilizumab has case reports and one non-randomised prospective cohort in refractory AChR+ gMG (20 treated), with no randomised MG trial. [[Jonsson2017,Ruan2024]]</p></div>`;

  /* ---------- cards ---------- */
  $('#biCards').innerHTML=`
   <div class="card"><span class="ev est">Established mechanism</span><h4>Why block C5</h4>
    <p>In AChR-antibody MG, IgG1 and IgG3 bound to receptors recruit C1q and start the classical complement pathway, ending in C5b-9, the membrane attack complex, which destroys the junctional folds. MAC was found at every endplate in all 30 patients of one biopsy study. C5 is the last common step before that complex, and blocking it leaves upstream C3 coating intact. [[Albazli2020,Nakano1993,Howard2018]]</p>
    <p>MuSK antibodies are mainly IgG4, which cannot activate complement; the C5 inhibitor trials and labels in our sources cover AChR-positive disease. [[Huijbers2018,Howard2017,Vu2022,Howard2023]]</p>
    <div class="pt"><b>In plain words</b>One group of drugs stops the damaging protein cascade at its last step, so it cannot punch holes in the muscle side of the junction.</div></div>
   <div class="card"><span class="ev est">Established mechanism</span><h4>Why block FcRn</h4>
    <p>FcRn rescues IgG from breakdown: in the acidic endosome it binds IgG and returns it to the blood, while unbound IgG goes to the lysosome. That is why IgG and albumin last about 19 to 21 days in the blood, against at most 5 to 7 days for IgA. Block FcRn and IgG is degraded faster. In healthy volunteers, repeated efgartigimod lowered IgG by an average of 75% without changing albumin or other immunoglobulins, and IgG recovered about 8 weeks after the last dose. [[Pyzik2019,Roopenian2007,Ulrichts2018]]</p>
    <div class="pt"><b>In plain words</b>The other group makes the body clear its antibodies faster, the harmful ones included. When the drug stops, antibody levels climb back.</div>
    <div class="hook"><b>Exam hook</b>C5 inhibitors stop the membrane attack complex (AChR+ disease) and carry a boxed warning for meningococcal infection, so vaccination comes first. FcRn blockers lower all IgG by stopping its recycling, and need no meningococcal vaccine.</div></div>
   <div class="card"><span class="ev est">Label information</span><h4>Meningococcal risk, vaccination and REMS</h4>
    <ul><li>Soliris, Ultomiris and Zilbrysq carry a boxed warning for serious meningococcal infection. The labels call for vaccination against serogroups A, C, W, Y and B at least 2 weeks before the first dose, antibacterial prophylaxis if treatment cannot wait, and access only through a REMS. [[FDASoliris2026,FDAUltomiris2025,FDAZilbrysq2026]]</li>
     <li>Vaccination does not eliminate the risk: fatal infections have occurred in vaccinated patients. CDC surveillance linked eculizumab with a 1,000- to 2,000-fold higher incidence; 14 of 16 US cases had at least 1 vaccine dose, and 11 were non-groupable strains. [[FDASoliris2026,McNamara2017]]</li>
     <li>The patient safety card is carried until 3 months after the last eculizumab dose, 8 months after ravulizumab and 2 months after zilucoplan; it lists fever, headache with stiff neck, rash, light sensitivity and confusion as reasons for immediate evaluation. [[FDASoliris2026,FDAUltomiris2025,FDAZilbrysq2026]]</li>
     <li>For prophylaxis in penicillin allergy, the guidance notes that macrolides and fluoroquinolones can worsen MG. [[Narayanaswami2021]]</li></ul>
    <p class="cardnote">In US claims data only 28% of eculizumab recipients had a serogroup B dose. [[Bozio2020]]</p>
    <p class="cardnote">Separately from infection, new trouble breathing or swallowing in a person with MG can signal a crisis and is treated as an emergency: see <a href="#crisis" data-go="crisis">Myasthenic crisis</a>. [[MGFACard]]</p></div>
   <div class="card"><span class="ev est">Label information</span><h4>How they are given</h4>
    <ul><li>Eculizumab: IV over 35 minutes in adults, with at least 1 hour of monitoring afterwards. [[FDASoliris2026]]</li>
     <li>Efgartigimod IV: 10 mg/kg over 1 hour weekly for 4 weeks. The SC syringe takes 20 to 30 seconds and can be self-injected. [[FDAVyvgart2026,FDAVyvgartHytrulo2026]]</li>
     <li>Rozanolixizumab: SC by infusion pump at up to 20 mL/h, weekly for 6 weeks. [[FDARystiggo2026]]</li>
     <li>FcRn labels advise against live vaccines during treatment and an immunisation review before each cycle. [[FDAVyvgart2026,FDARystiggo2026,FDAImaavy2026]]</li></ul>
    <p class="cardnote">Published label dosing, quoted for education. Doses and schedules for any one person are set by the treating clinician.</p></div>
   <div class="card"><span class="ev early">Mixed evidence</span><h4>Comparing drugs across trials</h4>
    <p>No head-to-head trials exist, and indirect comparisons disagree. One model-based meta-analysis found FcRn agents ahead of C5 agents on QMG (posterior probability 99.7%) but not on MG-ADL (52.5%); another network analysis ranked batoclimab first on QMG with very wide intervals; a third found only efgartigimod, zilucoplan and rozanolixizumab ahead of placebo at week 1. A 2023 network meta-analysis found no complement-versus-FcRn difference on MG-ADL (p=0.16) but a larger QMG effect with FcRn agents. Designs differ: cyclic trials peak at weeks 4 to 6, continuous ones report weeks 12 to 26. [[Roy2026,Ma2024,Zhong2024,Sacca2023]]</p></div>
   <div class="card"><span class="ev early">Guidelines disagree</span><h4>Cost and where guidelines place them</h4>
    <p>An ICER review judged that eculizumab and efgartigimod both give a net health benefit over conventional therapy, but a published model put them at $3,338,000 and $1,987,000 per QALY. [[Tice2022,Lien2024]]</p>
    <p>Guidelines place these drugs at different steps. The 2020 international consensus update says eculizumab can be considered in severe, refractory AChR+ gMG, generally after other immunotherapies fail; it predates the FcRn approvals. The German guideline (2023) recommends C5 or FcRn inhibitors in highly active AChR+ disease, defined by activity criteria rather than by treatment failure. The Nordic guidance (2024) lists both classes as second-line options for severe, difficult-to-treat MG, depending on approval and cost, and the 2025 ABN update describes their role as still being established. [[Narayanaswami2021,Wiendl2023,Gilhus2024,Jacob2025]]</p></div>`;
};
