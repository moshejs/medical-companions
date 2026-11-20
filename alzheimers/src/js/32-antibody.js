
/* =============== 3.2 anti-amyloid antibodies over time =============== */
/* monotone cubic (Fritsch-Carlson) through published points: never overshoots, so
   an interpolated curve can only move between the values it connects */
function abMono(P){const n=P.length,x=P.map(p=>p[0]),y=P.map(p=>p[1]),d=[],t=[];
  for(let i=0;i<n-1;i++)d.push((y[i+1]-y[i])/(x[i+1]-x[i]));
  t[0]=d[0];t[n-1]=d[n-2];
  for(let i=1;i<n-1;i++)t[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){t[i]=t[i+1]=0;continue}const a=t[i]/d[i],b=t[i+1]/d[i],h=a*a+b*b;if(h>9){const k=3/Math.sqrt(h);t[i]=k*a*d[i];t[i+1]=k*b*d[i]}}
  return v=>{if(v<=x[0])return y[0];if(v>=x[n-1])return y[n-1];let i=0;while(v>x[i+1])i++;
    const h=x[i+1]-x[i],s=(v-x[i])/h,s2=s*s,s3=s2*s;
    return (2*s3-3*s2+1)*y[i]+(s3-2*s2+s)*h*t[i]+(-2*s3+3*s2)*y[i+1]+(s3-s2)*h*t[i+1]}}
const AB_WK=4.345;                         // weeks per month
const AB_G=['no APOE4 copy','one APOE4 copy','two APOE4 copies'];
const AB_D={
 lec:{nm:'Lecanemab',trial:'CLARITY AD',end:18,ole:48,endLab:'18 mo',
  cl0:77.92,clEnd:22.99,pb0:75.03,pbEnd:78.63,pbEndK:'d',thr:30,thrLab:'green = 30 CL, positive',
  clPts:[ {m:0,v:77.92,k:'m'},{m:18,v:22.99,k:'s'} ],
  cdrP:1.66,cdrD:1.21,gap:abMono([ [0,0],[6,.17],[18,.45] ]),gapPts:[6],
  sec:{lab:'Daily-living gap (ADCS-MCI-ADL)',v:2.0,max:3.5,fmt:'+2.0'},
  e:[5.4,10.9,32.6],pe:[0.3,1.9,3.8],timing:abMono([ [0,0],[3,.71],[6,.92],[18,1] ]),tPts:[ [3,.71],[6,.92] ],   // timing shares are for all ARIA-E cases; applied per genotype they are calculated, drawn as open dots
  vig:14/AB_WK,vigLab:'14',
  mriL:[0,1,2,3,6],mriA:[0,8/AB_WK,12/AB_WK,26/AB_WK],mriX:[50/AB_WK],aLab:'MRI AUR/EU'},
 don:{nm:'Donanemab',trial:'TRAILBLAZER-ALZ 2',end:76/AB_WK,ole:36,endLab:'76 wk',
  cl0:104,clEnd:17,pb0:104,pbEnd:103.3,pbEndK:'d',thr:24.1,thrLab:'green = 24.1 CL, cleared',
  clPts:[ {m:0,v:104,k:'m'},{m:6,v:40.56,k:'s'},{m:12,v:20.8,k:'s'},{m:76/AB_WK,v:17,k:'d'} ],   // 17 = baseline 104.0 minus the published change of 87.0
  cdrP:2.42,cdrD:1.72,gap:abMono([ [0,0],[76/AB_WK,.70] ]),gapPts:[],
  sec:{lab:'iADRS gap (higher is better)',v:2.92,max:4,fmt:'+2.92'},
  e:[15.7,22.8,40.6],pe:[0.8,1.9,3.4],timing:abMono([ [0,0],[3,.58],[76/AB_WK,1] ]),tPts:[ [3,.58] ],
  vig:24/AB_WK,vigLab:'24',
  mriL:[0,4/AB_WK,8/AB_WK,12/AB_WK,24/AB_WK],mriA:[0,4/AB_WK,8/AB_WK,12/AB_WK,24/AB_WK],mriX:[44/AB_WK],aLab:'MRI AUR',
  scans:[ [24/AB_WK,29.7,17],[52/AB_WK,66.1,47],[76/AB_WK,76.4,69] ]}
};
AB_D.don.clFn=abMono(AB_D.don.clPts.map(p=>[p.m,p.v]));
/* amyloid PET (centiloids) on drug: null where nothing is published */
function abCL(k,m){const d=AB_D[k];
  if(k==='lec'){if(m<=18)return d.cl0+(d.clEnd-d.cl0)*(1-Math.exp(-m/9))/(1-Math.exp(-2));return m<=30?d.clEnd:null}
  if(m<=d.end)return d.clFn(m);return d.clEnd+2.6*(m-d.end)/12}   // after stopping: published re-accumulation rate
function abCLp(k,m){const d=AB_D[k];return m<=d.end?d.pb0+(d.pbEnd-d.pb0)*m/d.end:null}
/* share of the group still receiving antibody */
function abDose(k,m){if(m<.1)return 0;if(k==='lec')return 1;
  if(m<24/AB_WK)return 1;if(m<52/AB_WK)return .83;if(m<72/AB_WK)return .53;return 0}

const AB_STEPS=[
 {from:0,at:0,
  lec:{k:'Baseline',t:'Baseline',txt:'CLARITY AD randomized 1,795 people aged 50 to 90 with early Alzheimer\'s disease (MCI or mild dementia) and amyloid confirmed by PET or spinal fluid: 898 to lecanemab 10 mg/kg IV every 2 weeks and 897 to placebo. Amyloid PET averaged 77.9 centiloids (CL) on lecanemab and 75.0 on placebo. About 69% carried APOE4. [[vanDyck2023,LeqembiLabel2026,Perry2026]]',
   pt:'Everyone in the trial had early memory symptoms and confirmed amyloid. Half received the drug and half a dummy infusion, and nobody knew which.',
   hook:'CLARITY AD: lecanemab, 18 months, primary endpoint CDR-SB (a 0 to 18 scale; higher is worse).'},
  don:{k:'Baseline',t:'Baseline',txt:'TRAILBLAZER-ALZ 2 randomized 1,736 people with early symptomatic Alzheimer\'s disease, amyloid on PET and tau on PET: 860 to donanemab and 876 to placebo, IV every 4 weeks for 72 weeks. Amyloid averaged about 104 CL. Of 8,240 people screened, 6,504 were excluded, mostly for too little amyloid or tau. [[Sims2023,KisunlaLabel2025]]',
   pt:'This trial needed both amyloid and tau on scans, so most people who were screened could not join.',
   hook:'TRAILBLAZER-ALZ 2: donanemab, 76 weeks, primary endpoint iADRS; CDR-SB was a key secondary.'}},
 {from:.3,at:2,
  lec:{k:'Months 0 to 3',t:'Months 0 to 3: the ARIA window',txt:'Lecanemab binds soluble amyloid protofibrils with high affinity, and microglia clear what it marks. ARIA-E, swelling seen on MRI, clusters early: 71% of cases began within 3 months and 92% within 6. Infusion reactions affected 26.4% versus 7% on placebo, three-quarters of them at the first infusion. [[vanDyck2023,Honig2024,LeqembiLabel2026]]',
   pt:'The first months are when the brain-swelling side effect usually appears. That is why the MRI checks are bunched at the start.',
   hook:'ARIA-E is an early event: the label says most occurred within the first 7 doses.'},
  don:{k:'Months 0 to 3',t:'Months 0 to 3: the ARIA window',txt:'Donanemab binds N3pG, a modified (pyroglutamate) amyloid beta found only in deposited plaque. Of first ARIA-E events, 58% happened by the third infusion, and most within the first 24 weeks. Infusion reactions affected 8.7% versus 0.5%. [[KisunlaLabel2025,Rabinovici2025,Zimmer2025,Sims2023]]',
   pt:'This antibody grabs a form of amyloid that only exists inside plaques. Swelling on MRI, when it happens, usually comes early.',
   hook:'Donanemab binds N3pG pyroglutamate amyloid beta, present only in plaque.'}},
 {from:3,at:4.5,
  lec:{k:'Months 3 to 6',t:'Plaque falls first',txt:'Plaque reduction versus placebo was statistically significant from week 13 and continued to week 79. The centiloid values at 3, 6 and 12 months are published only in a figure our sources could not read, so this curve is interpolated between baseline and 18 months. [[LeqembiLabel2026,Eisai2022CTAD]]',
   pt:'Scans show plaque shrinking within about three months. Exactly how fast between visits is drawn here as a smooth estimate.'},
  don:{k:'Months 3 to 6',t:'Plaque falls fast',txt:'In the sponsor\'s description, plaque fell 61% by 6 months, 80% by 12 months and 84% by 18 months (secondary report, shown as open dots). The 76-week change was measured at -87.0 CL. [[MHE2024,KisunlaLabel2025]]',
   pt:'Donanemab removes plaque quickly: most of it is gone within a year.'}},
 {from:5.5,at:6,
  lec:{k:'Month 6',t:'Month 6: the lines separate',txt:'CDR-SB first separated significantly from placebo at 6 months: a difference of 0.17 points (95% CI 0.05 to 0.29). Both groups were still getting worse. [[Eisai2022CTAD,LeqembiLabel2026]]',
   pt:'At six months the treated group is declining slightly more slowly. Both groups are still declining.',
   hook:'Clinical benefit lags plaque removal: amyloid falls from month 3, CDR-SB separates from month 6.'},
  don:{k:'Week 24',t:'Week 24: the first clearance scan',txt:'At the week-24 PET scan, 29.7% had cleared amyloid (below 24.1 CL), and 17% met the rule to switch to blinded placebo: below 11 CL on one scan, or 11 to below 25 CL on two in a row. [[Sims2023,KisunlaLabel2025]]',
   pt:'Once a scan showed the plaque was gone, the person stopped getting the drug without knowing it. That stop-on-clearance design is particular to donanemab.',
   hook:'Stop-on-clearance: 17%, 47% and 69% eligible to stop at weeks 24, 52 and 76.'}},
 {from:10.5,at:12,
  lec:{k:'Month 12',t:'Month 12: the gap widens',txt:'The CDR-SB gap widened at each 3-monthly visit, and plaque kept falling. Only the 6-month and 18-month gaps are published as numbers in our sources, so the lines between are interpolated. [[Eisai2022CTAD,LeqembiLabel2026]]',
   pt:'Month by month the treated group falls a little further behind the placebo group in how much it has declined.'},
  don:{k:'Week 52',t:'Week 52: two-thirds cleared',txt:'At week 52, 66.1% had cleared amyloid and 47% were eligible to switch to placebo. No intermediate CDR-SB values are in our sources, so the clinical lines are interpolated from baseline to week 76. [[Sims2023,KisunlaLabel2025]]',
   pt:'By one year, about two in three people had no meaningful plaque left on their scan.'}},
 {from:15,at:18,
  lec:{k:'Month 18',t:'Month 18: the result',txt:'CDR-SB worsened by 1.21 on lecanemab and 1.66 on placebo: a difference of 0.45 (95% CI 0.23 to 0.67), described as 27% slowing. Amyloid fell 55.5 CL versus a 3.6 CL rise on placebo, ending around 21 to 23 CL; 67% were below 30 CL. ADCS-MCI-ADL, a daily-living scale, differed by 2.0 (37% slowing). ARIA-E: 12.6% versus 1.7%. In the roughly 15% with two APOE4 copies, an exploratory analysis found no CDR-SB effect. [[vanDyck2023,Eisai2022CTAD,LeqembiLabel2026,Perry2026]]',
   pt:'After 18 months the treated group had declined about a quarter less than the placebo group. Both groups declined.',
   hook:'Lecanemab: CDR-SB -0.45 at 18 months (27% slowing), amyloid -55.5 CL, ARIA-E 12.6%.'},
  don:{k:'Week 76',t:'Week 76: the result',txt:'CDR-SB worsened by 1.72 on donanemab and 2.42 on placebo: a difference of 0.70 (95% CI 0.45 to 0.95), 29% slowing; in low/medium tau it was 0.67 (about 36 to 37%). iADRS differed by 2.92 (22% slowing; 3.25 and 35% in low/medium tau). Amyloid fell 87.0 CL; 76.4% cleared and 69% were eligible to stop. ARIA-E 24.0% versus 2.1%; three deaths after serious ARIA were considered treatment-related. [[Sims2023,KisunlaLabel2025]]',
   pt:'After about 18 months the treated group had declined roughly 30% less than the placebo group. Both groups declined.',
   hook:'Donanemab: CDR-SB -0.70 (combined), iADRS +2.92, amyloid -87 CL, ARIA-E 24.0%.'}},
 {from:18.3,at:'max',ole:true,
  lec:{k:'Open-label extension',t:'After 18 months: open-label',txt:'In the extension everyone could receive lecanemab. About 70% were amyloid-negative at its start, and people treated from the start kept amyloid low through 30 months. Against a matched observational cohort (ADNI), the CDR-SB gap was 0.52 at 18 months, 1.01 at 36 and 1.75 at 48 (conference abstract). Critics note that randomization and blinding were lost: at 36 months CDR-SB had worsened 3.06 with continuous treatment, 3.55 with delayed start and 3.92 in ADNI, and they argue the 0.49-point gap does not robustly show disease modification. [[vanDyck2025OLE,vanDyck2025AAIC,Hazan2026a]]',
   pt:'Longer follow-up looks encouraging to the company, but with no placebo group it is much harder to interpret.',
   hook:'Open-label extensions lose randomization and blinding; comparisons with external cohorts are weaker evidence.'},
  don:{k:'Long-term extension',t:'After 76 weeks: the extension',txt:'Over 3 years, early start versus a weighted ADNI comparison was -1.2 CDR-SB (95% CI -1.7 to -0.7). Estimated time saved was 6.9 months with early start and 5.6 with delayed start. Once dosing stops, amyloid re-accumulates at a median 2.4 to 2.8 CL per year (dashed line, a projection from that rate). Critics note both groups worsened by about 4 CDR-SB points by 36 months and the time-saved difference was only 1.3 months, which they read as catch-up rather than disease modification. [[Zimmer2026,Hazan2026b,KisunlaLabel2025]]',
   pt:'Plaque comes back only slowly after the drug stops. Whether the early-start group keeps a lasting lead is disputed.',
   hook:'After stopping donanemab, amyloid returns slowly: about 2.4 to 2.8 centiloids a year.'}}
];

/* the size-of-benefit chart */
const AB_MAG={
 pts:{max:2,ticks:[0,.5,1,1.5,2],unit:'Drug-versus-placebo difference in CDR-SB (points)',
  refs:[ {id:'mcid',v:.98,lab:'MCI threshold 0.98'},{id:'mcid',v:1.63,lab:'Mild-dementia threshold 1.63'} ],
  rows:[ {id:'pool',lab:'Pooled, 8 antibodies',v:.18,txt:'0.18'},
   {id:'lec',lab:'Lecanemab, 18 months',v:.45,lo:.23,hi:.67,txt:'0.45'},
   {id:'lec01',lab:'Lecanemab, ≤1 APOE4 copy (post hoc)',v:.58,lo:.35,hi:.81,txt:'0.58'},
   {id:'don',lab:'Donanemab, combined, 76 wk',v:.70,lo:.45,hi:.95,txt:'0.70'},
   {id:'donlm',lab:'Donanemab, low/medium tau',v:.67,lo:.40,hi:.95,txt:'0.67'} ]},
 mo:{max:24,ticks:[0,6,12,18,24],unit:'Months of progression delayed or saved (estimates)',
  refs:[ {id:'need',v:11,lab:'≈11 months: needed for a 0.98 gap'} ],
  rows:[ {id:'nice',lab:'NICE committee: delay',lo:4,hi:6,txt:'4–6'},
   {id:'tsI',lab:'Donanemab 76 wk, by iADRS',v:4.36,txt:'4.4'},
   {id:'tsC',lab:'Donanemab 76 wk, by CDR-SB',v:7.53,txt:'7.5'},
   {id:'rng',lab:'Range across methods',lo:4,hi:13,txt:'4–13'},
   {id:'hl',lab:'Lecanemab: independence (model)',v:10,lo:4,hi:18,txt:'10'},
   {id:'hd',lab:'Donanemab: independence (model)',v:13,lo:6,hi:24,txt:'13'},
   {id:'lte',lab:'Donanemab 3 yr: early/delayed',v:6.9,v2:5.6,txt:'6.9 vs 5.6'} ]}
};
const AB_EX={
 pool:{k:'Meta-analysis',t:'Pooled across 8 antibodies: 0.18',txt:'A 2024 meta-analysis of 8 anti-amyloid antibodies (23,202 participants) found a pooled CDR-SB difference of 0.18 and MMSE +0.32. It concluded none of them, including lecanemab and donanemab, exceeded the minimal clinically important difference; ARIA-E risk ratio 10.29 (number needed to harm 9). The pool includes antibodies that failed, so the pooled figure sits below the separate lecanemab and donanemab results (0.45 and 0.70). [[Ebell2024,vanDyck2023,Sims2023]]'},
 lec:{k:'CLARITY AD',t:'Lecanemab: 0.45 points',txt:'The 18-month difference was 0.45 (95% CI 0.23 to 0.67) on a 0 to 18 scale, 27% slowing, with all key secondary endpoints also favouring lecanemab. Supporters stress the consistency across scales; critics stress that the absolute gap is under half a point. [[vanDyck2023,LeqembiLabel2026]]'},
 lec01:{k:'Post hoc subgroup',t:'Lecanemab, no or one APOE4 copy: 0.58',txt:'In the 85% of CLARITY AD who were APOE4 non-carriers or heterozygotes (the population later licensed in the EU and UK), the difference was 0.58 (0.35 to 0.81), 33% slowing. This was a post hoc analysis requested by the EMA and MHRA, which makes it weaker evidence than the prespecified primary result. [[Perry2026]]'},
 don:{k:'TRAILBLAZER-ALZ 2',t:'Donanemab, combined population: 0.70',txt:'At 76 weeks the CDR-SB difference was 0.70 (0.45 to 0.95), 29% slowing, and 23 of 24 gated outcomes were significant. Risk of moving to the next global CDR stage fell by 37.4%. [[Sims2023]]'},
 donlm:{k:'TRAILBLAZER-ALZ 2',t:'Donanemab, low/medium tau: 0.67',txt:'In the prespecified low/medium tau group the difference was 0.67 (0.40 to 0.95), about 36 to 37% slowing, and risk of advancing a CDR stage fell 38.6%. People with high tau gained less. [[Sims2023,KisunlaLabel2025]]'},
 mcid:{k:'Thresholds',t:'Minimal clinically important differences',txt:'Anchor-based studies put the smallest change a clinician or family would notice at about 0.98 CDR-SB points in MCI and 1.63 in mild dementia. Those are within-person thresholds. Critics of comparing them with trial results argue that a between-group average difference is a different quantity; in one simulation a 0.98 gap over 18 months would need about 60% slowing. [[Andrews2019,Lanctot2025,Petersen2023]]'},
 need:{k:'Simulation',t:'What a 0.98-point gap would take',txt:'A 2025 modelling paper estimated that reaching a 0.98 CDR-SB difference in 18 months would need about 60% slowing, roughly 11 months saved. Its authors argue this shows within-person thresholds are the wrong yardstick for group results. [[Lanctot2025]]'},
 nice:{k:'NICE, England',t:'NICE: about 4 to 6 months\' delay',txt:'NICE\'s committee judged the benefit modest, delaying progression by about 4 to 6 months, and the cost too high, so it did not recommend either drug in its June 2025 final draft. Appeals were partly upheld in January 2026 and the drugs are being reconsidered. [[PJ2025,AlzEurope2026]]'},
 tsI:{k:'Trial authors',t:'Time saved by iADRS: 4.36 months',txt:'The TRAILBLAZER-ALZ 2 authors estimated time saved at 76 weeks in the low/medium tau group as 4.36 months on iADRS. [[Sims2023]]'},
 tsC:{k:'Trial authors',t:'Time saved by CDR-SB: 7.53 months',txt:'On CDR-SB the same group\'s estimate was 7.53 months. The spread between the two scales is one reason time-saved figures are argued over. [[Sims2023]]'},
 rng:{k:'Methods review',t:'Estimates range from 4 to 13 months',txt:'A 2025 review found time-saved estimates vary by method from about 4 to 13 months. Liu and colleagues propose judging benefit by whether it is noticeable, valuable and worthwhile given costs and risks, and warn that responder-style analyses can mislead. [[Araujo2025,Liu2023,Liu2025]]'},
 hl:{k:'Model',t:'Lecanemab: 10 more months of independence',txt:'For someone starting at CDR-SB 2, modelling estimated lecanemab would extend independence in instrumental daily activities by 10 months (95% CI 4 to 18). This is a model projected from trial averages, not an observed outcome. [[Hartz2025]]'},
 hd:{k:'Model',t:'Donanemab: 13 more months of independence',txt:'The same model estimated 13 months (6 to 24) for donanemab in the low/medium tau group. [[Hartz2025]]'},
 lte:{k:'3-year extension',t:'Early versus delayed start: 6.9 vs 5.6 months',txt:'The sponsor\'s 3-year extension estimated 6.9 months saved with early start and 5.6 with delayed start. Critics point out the difference is only 1.3 months and both groups worsened about 4 points, which they read as the delayed group catching up. [[Zimmer2026,Hazan2026b]]'}
};

inits.antibody=()=>{
  const svg=$('#abSvg'),rg=$('#abT'),stEl=$('#abSteps');
  let drug='lec',g=1,ole=false,lastNote='',stepIdx=-1,stepKey='';
  const D=()=>AB_D[drug],MX=()=>ole?D().ole:18;
  const steps=()=>AB_STEPS.filter(s=>ole||!s.ole);
  const atOf=s=>s.at==='max'?MX():s.at;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const ln=(x1,y1,x2,y2,st)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="${st}"/>`;
  const dot=(x,y,col,kind)=>kind==='s'||kind==='d'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`
                                     :`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.8" style="fill:${col};stroke:var(--panel);stroke-width:1.2"/>`;
  const poly=(fn,m0,m1,X,Y)=>{if(m1<=m0)return '';let d='';const n=Math.max(2,Math.ceil((m1-m0)*6));for(let i=0;i<=n;i++){const u=m0+(m1-m0)*i/n,v=fn(u);if(v==null)break;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(v))}return d};
  /* two labels at the end of two lines must not collide: push apart to at least gap */
  const sep=(a,b,gap=12)=>{if(b-a>=gap)return[a,b];const c=(a+b)/2;return[c-gap/2,c+gap/2]};
  const abY=(x,y,ang,o)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang*180/Math.PI)})" style="opacity:${f1(o)}"><path d="M0 0H7M0 0L-4.6 -4.2M0 0L-4.6 4.2" style="fill:none;stroke:var(--sky);stroke-width:2.2;stroke-linecap:round"/></g>`;
  const R=rng(53);
  const PL=[{u:.15,v:.62,r:1,th:0,sd:3},{u:.42,v:.80,r:.8,th:.1,sd:8},{u:.56,v:.45,r:1.1,th:.04,sd:12},{u:.85,v:.66,r:.95,th:.18,sd:5},{u:.3,v:.37,r:.7,th:.14,sd:21}];
  const AB=Array.from({length:18},(_,k)=>({p:k%5,u:.05+R()*.9,ph:R(),a:R()*Math.PI*2}));
  const MG=[{p:0,a:2.3},{p:2,a:-.6},{p:3,a:2.6}];

  /* ---------- panel 1: tissue + amyloid PET ---------- */
  function tissue(P,m){
    const d=D(),{x,y,w}=P,Mx=MX();let s='';
    s+=T(x,y,'1 · TISSUE AND AMYLOID PET','t-sm','fill:var(--ink)');
    const fy=y+10,fh=160;
    s+=`<rect x="${x}" y="${fy}" width="${w}" height="${fh}" rx="10" style="fill:var(--cell);stroke:var(--line)"/>`;
    s+=`<rect x="${x+1}" y="${fy+8}" width="${w-2}" height="14" style="fill:var(--vessel);opacity:.16"/>`+ln(x+1,fy+8,x+w-1,fy+8,'stroke:var(--vessel);opacity:.55')+ln(x+1,fy+22,x+w-1,fy+22,'stroke:var(--vessel);opacity:.55');
    s+=T(x+6,fy+34,'blood vessel');
    s+=neuron(x+w*.7,fy+fh*.9,7,.55,{axon:-.3,axonLen:20})+neuron(x+w*.95,fy+fh*.34,6,.5,{axon:2.6,axonLen:16,dendrites:4});
    const mc=ole?m:Math.min(m,d.end);
    const clNow=abCL(drug,mc)??abCL(drug,30)??d.clEnd,f=clamp(clNow/d.cl0),base=Math.sqrt(d.cl0/104);
    const pls=PL.map(p=>{const k=clamp((f-p.th)/(1-p.th));return{cx:x+p.u*w,cy:fy+p.v*fh,R:20*p.r*base,r:20*p.r*base*Math.sqrt(k),sd:p.sd}});
    pls.forEach(p=>{if(p.r<p.R*.92)s+=`<circle cx="${f1(p.cx)}" cy="${f1(p.cy)}" r="${f1(p.R*.9)}" style="fill:none;stroke:var(--amber);stroke-width:1;opacity:.3;stroke-dasharray:1.5 3"/>`;
      if(p.r>1.5)s+=plaque(p.cx,p.cy,p.r,p.sd,clamp(p.r/5))});
    const dz=abDose(drug,m),nA=Math.round(AB.length*dz);
    for(let k=0;k<nA;k++){const a=AB[k],p=pls[a.p];if(p.r<3)continue;
      const q=((m/1.1)+a.ph)%1,rx=p.cx+Math.cos(a.a)*(p.r+4),ry=p.cy+Math.sin(a.a)*(p.r+4),vx=x+a.u*w,vy=fy+15;
      let px,py,o=1;if(q<.5){const e=ease(q/.5);px=lerp(vx,rx,e);py=lerp(vy,ry,e)}else{px=rx;py=ry;o=1-ramp(q,.8,1)}
      s+=abY(px,py,a.a,o*ramp(m,.1,.4))}
    MG.forEach(g0=>{const p=pls[g0.p];const act=(dz>0&&p.r>3)?ramp(m,.3,2):0;const dist=lerp(p.R+18,p.r+12,act);
      s+=microglia(p.cx+Math.cos(g0.a)*dist,p.cy+Math.sin(g0.a)*dist,5.5,1,act)});
    // readout
    const meas=d.clPts.find(p=>Math.abs(p.m-mc)<.26),proj=drug==='don'&&ole&&m>d.end+.05,none=abCL(drug,mc)==null;
    const tag=none?'last published':proj?'projection':meas?(meas.k==='s'?'sponsor figure':meas.k==='d'?'calculated':'trial value'):'interpolated';
    s+=T(x,y+192,`Amyloid PET ≈ ${Math.round(clNow)} CL`,'t-big')+T(x+w,y+192,tag,'t-xs t-end');
    // centiloid chart
    const cx0=x+30,cx1=x+w-64,cy0=y+222,cy1=y+312,X=v=>cx0+v/Mx*(cx1-cx0),Y=v=>cy1-v/115*(cy1-cy0);
    s+=T(x,y+212,`Amyloid PET (CL) · ${d.thrLab}`);
    [0,50,100].forEach(v=>{s+=ln(cx0,Y(v),cx1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(cx0-5,Y(v)+3,v,'t-xs t-end')});
    s+=ln(cx0,Y(d.thr),cx1,Y(d.thr),'stroke:var(--good);stroke-dasharray:4 3;opacity:.8')+T(cx0-5,Y(d.thr)+3,d.thr,'t-xs t-end','fill:var(--good)');
    const tks=ole?[0,12,24,36,48].filter(v=>v<=Mx):[0,6,12,18];tks.forEach(v=>{s+=T(X(v),cy1+12,v,'t-xs t-mid')});
    s+=T(cx1+6,cy1+12,'mo');
    if(ole)s+=`<rect x="${f1(X(d.end))}" y="${cy0}" width="${f1(cx1-X(d.end))}" height="${cy1-cy0}" style="fill:var(--panel-2);opacity:.55"/>`;
    const mp=Math.min(m,d.end),mdEnd=drug==='lec'?Math.min(m,30):Math.min(m,d.end);
    s+=`<path d="${poly(u=>abCLp(drug,u),0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="${poly(u=>abCL(drug,u),0,mdEnd,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2.6"/>`;
    if(drug==='don'&&ole&&m>d.end)s+=`<path d="${poly(u=>abCL(drug,u),d.end,m,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2;stroke-dasharray:4 3"/>`;
    s+=dot(X(0),Y(d.pb0),'var(--muted)','m');if(m>=d.end-.01)s+=dot(X(d.end),Y(d.pbEnd),'var(--muted)',d.pbEndK);
    d.clPts.forEach(p=>{if(m>=p.m-.01)s+=dot(X(p.m),Y(p.v),'var(--sky)',p.k)});
    s+=ln(X(m),cy0,X(m),cy1,'stroke:var(--ink);opacity:.3');
    const pv=abCLp(drug,Math.min(m,d.end)),dv=abCL(drug,drug==='lec'?Math.min(m,30):mc);
    let [ly1,ly2]=sep(Y(pv),Y(dv),11);
    s+=T(X(mp)+7,ly1+3,`placebo ${Math.round(pv)}`)+T(X(drug==='lec'?Math.min(m,30):mc)+7,ly2+3,`drug ${Math.round(dv)}`,'t-xs','fill:var(--sky)');
    // clearance waffle
    const wy=y+338,cs=9;let pct=0,stp=0,l1,l2,l3;
    if(drug==='don'){const sc=d.scans.filter(v=>m>=v[0]-.01).pop();
      if(sc){pct=sc[1];stp=sc[2];l1=`Scan at week ${Math.round(sc[0]*AB_WK)}`;l2=`${sc[1]}% cleared (&lt;24.1 CL)`;l3=`${sc[2]}% switch to placebo`}
      else{l1='No PET scan yet';l2='first one at week 24';l3=''}}
    else{if(m>=17.99){pct=ole&&m>18.3?70:67;l1=ole&&m>18.3?'At extension start':'After 79 weeks';l2=ole&&m>18.3?'≈70% amyloid-negative':'67% below 30 CL';l3=ole&&m>18.3?'(below 30 CL)':'(only value published)'}
      else{l1='Share below 30 CL';l2='published at 79 weeks only';l3='dots fill at month 18'}}
    const nC=Math.round(pct),nS=Math.round(stp);
    for(let i=0;i<100;i++){const cx=x+4+(i%10)*cs,cy=wy+4+Math.floor(i/10)*cs;
      const st=i<nS?'fill:var(--sky)':i<nC?'fill:var(--sky-soft);stroke:var(--sky);stroke-width:1':'fill:var(--amber-soft);stroke:var(--amber);stroke-width:.8';
      s+=`<circle cx="${cx}" cy="${cy}" r="3.3" style="${st}"/>`}
    const tx=x+104;s+=T(tx,wy+6,l1,'t-sm','fill:var(--ink)')+T(tx,wy+21,l2)+T(tx,wy+35,l3);
    const lg=drug==='don'?[ ['fill:var(--sky)','switched to placebo'],['fill:var(--sky-soft);stroke:var(--sky)','cleared, still dosing'],['fill:var(--amber-soft);stroke:var(--amber)','not cleared'] ]
                         :[ ['fill:var(--sky-soft);stroke:var(--sky)','below 30 CL'],['fill:var(--amber-soft);stroke:var(--amber)','above 30 CL'] ];
    lg.forEach((l,i)=>{s+=`<circle cx="${tx+4}" cy="${wy+51+i*14}" r="3.3" style="${l[0]}"/>`+T(tx+12,wy+54+i*14,l[1])});
    s+=T(x,wy+104,'Each dot = 1% of the group, by scan result');
    return s}

  /* ---------- panel 2: clinical course ---------- */
  function clinical(P,m){
    const d=D(),{x,y,w}=P,Mx=MX();let s='';
    const px0=x+66,px1=x+w-92,py0=y+34,py1=y+164,ymax=ole?4.4:2.6,X=v=>px0+v/Mx*(px1-px0),Y=v=>py0+v/ymax*(py1-py0);
    s+=T(x,y,'2 · CLINICAL COURSE: CDR-SB','t-sm','fill:var(--ink)')+T(x,y+15,'Change from baseline. Lower on the chart = worse.');
    for(let v=0;v<=ymax;v++){s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,v?'+'+v:'0','t-xs t-end')}
    const tks=ole?[0,12,24,36,48].filter(v=>v<=Mx):[0,3,6,9,12,15,18];tks.forEach(v=>{s+=T(X(v),py1+13,v,'t-xs t-mid')});
    s+=T(x,py1+13,'month');
    if(ole){s+=`<rect x="${f1(X(d.end))}" y="${py0}" width="${f1(px1-X(d.end))}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`+T(px1-4,py0+11,'OPEN-LABEL, NO PLACEBO','t-xs t-end')}
    const mp=Math.min(m,d.end),pbo=u=>d.cdrP*u/d.end,drg=u=>pbo(u)-d.gap(u);
    if(m>=9)s+=T(px0+6,py1-36,'Both groups decline.','t-xs','fill:var(--ink)')+T(px0+6,py1-23,'Treatment slows it;','t-xs','fill:var(--ink)')+T(px0+6,py1-10,'it does not stop it.','t-xs','fill:var(--ink)');
    s+=`<path d="${poly(pbo,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.4"/>`;
    s+=`<path d="${poly(drg,0,mp,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2.8"/>`;
    s+=dot(X(0),Y(0),'var(--sky)','m');
    if(m>.4)s+=ln(X(mp),Y(drg(mp))+3,X(mp),Y(pbo(mp))-3,'stroke:var(--sky);stroke-width:1.5;opacity:.7');
    d.gapPts.forEach(gm=>{if(m>=gm-.01){s+=dot(X(gm),Y(pbo(gm)),'var(--muted)','s')+dot(X(gm),Y(drg(gm)),'var(--sky)','s')+(ole?'':T(X(gm)-5,Y(pbo(gm))+13,`${d.gap(gm).toFixed(2)} at ${gm} mo`,'t-xs t-end','fill:var(--sky)'))}});
    if(m>=d.end-.01)s+=dot(X(d.end),Y(d.cdrP),'var(--muted)','m')+dot(X(d.end),Y(d.cdrD),'var(--sky)','m');
    if(m>=1.5){const yd=Y(drg(mp)),yp=Y(pbo(mp));const [a,b]=sep(yd,yp,12);
      s+=T(X(mp)+6,a+3,`${d.nm} +${drg(mp).toFixed(2)}`,'t-xs','fill:var(--sky)')+T(X(mp)+6,b+3,`Placebo +${pbo(mp).toFixed(2)}`)}
    if(ole&&m>=d.end+.3){
      if(drug==='lec'){const o=ramp(m,30,36);if(o>0){const xp=X(36);
        [ [3.06,'continuous 3.06','var(--sky)'],[3.55,'delayed start 3.55','var(--muted)'],[3.92,'ADNI 3.92','var(--violet)']].forEach(([v,l,c],i)=>{const yy=Y(v)+[-3,0,4][i];s+=`<g style="opacity:${f1(o)}">`+dot(xp,Y(v),c,'s')+T(xp+7,yy+3,l,'t-xs','fill:'+c)+'</g>'});
        s+=T(xp-6,Y(3.06)-10,'36 mo, 0–1 APOE4 copies','t-xs t-end','opacity:'+f1(o))}}
      else{const o=ramp(m,30,35.5);if(o>0)s+=`<g style="opacity:${f1(o)}">`+dot(X(36),Y(4),'var(--ink)','s')+T(X(36)+7,Y(4)+3,'both groups ≈ +4','t-xs','fill:var(--ink)')+'</g>'}}
    // readout lines
    const near=d.gapPts.find(v=>Math.abs(v-m)<.26)!=null||Math.abs(m-d.end)<.26;
    const gNow=d.gap(mp);let r1,r2,r3='';
    if(m>d.end+.26){r1=`Gap at end of blinded trial: ${d.gap(d.end).toFixed(2)} points (published)`}
    else r1=`Gap now: ${gNow.toFixed(2)} points (${near?'published':'interpolated'})`;
    if(ole&&m>d.end+.26){if(drug==='lec'){r2='Open-label vs ADNI: gap 0.52, 1.01, 1.75 at 18, 36, 48 mo';r3='36-month points as quoted in a critique letter'}
      else{r2='3-year extension vs ADNI: -1.2; time saved 6.9 vs 5.6 mo';r3='Both early and delayed start ≈ +4 by 36 mo (letter)'}}
    else{r2=drug==='lec'?'Slowing at 18 mo: 27%. Both groups still declined.':'Slowing at 76 wk: 29% combined, 36–37% low/medium tau';
      if(g===2)r3=drug==='lec'?'Two APOE4 copies: no CDR-SB effect (exploratory subgroup)':'Genotype panel: see ARIA risk below'}
    s+=T(x,y+192,r1,'t-xs','fill:var(--ink)')+T(x,y+206,r2)+(r3?T(x,y+220,r3):'');
    // secondary scale meter
    const sv=d.sec.v*clamp(d.gap(mp)/d.gap(d.end)),bw=w-2,bx=x,by=y+240,sx=v=>bx+v/d.sec.max*bw;
    s+=T(x,y+234,`${d.sec.lab}: +${sv.toFixed(2)}${m>=d.end-.26?' (published)':' (interpolated)'}`);
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(sx(sv)-bx)}" height="7" rx="3.5" style="fill:var(--sky)"/>`;
    s+=ln(sx(d.sec.v),by-3,sx(d.sec.v),by+10,'stroke:var(--ink);stroke-width:1.5');
    return s}

  /* ---------- panel 3: ARIA ---------- */
  function aria(P,m){
    const d=D(),{x,y,w}=P,Mx=MX();let s='';
    const px0=x+66,px1=x+w-92,py0=y+30,py1=y+120,ymax=45,X=v=>px0+v/Mx*(px1-px0),Y=v=>py1-v/ymax*(py1-py0);
    s+=T(x,y,'3 · ARIA-E: SWELLING ON MRI','t-sm','fill:var(--ink)')+T(x,y+15,`Cumulative % with ARIA-E · ${AB_G[g]}`);
    s+=`<rect x="${f1(X(0))}" y="${py0}" width="${f1(X(d.vig)-X(0))}" height="${y+186-py0}" style="fill:var(--warn-soft);opacity:.8"/>`;
    if(ole)s+=`<rect x="${f1(X(d.end))}" y="${py0}" width="${f1(px1-X(d.end))}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`+T(x+w,y+15,'grey: open-label','t-xs t-end');
    [0,20,40].forEach(v=>{s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,v+'%','t-xs t-end')});
    const tks=ole?[0,12,24,36,48].filter(v=>v<=Mx):[0,3,6,9,12,15,18];tks.forEach(v=>{s+=T(X(v),py1+13,v,'t-xs t-mid')});
    s+=T(x,py1+13,'month');
    const mp=Math.min(m,d.end),E=d.e[g],PE=d.pe[g],dr=u=>E*d.timing(u),pb=u=>PE*u/d.end;
    s+=`<path d="${poly(pb,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.2"/>`;
    s+=`<path d="${poly(dr,0,mp,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2.8"/>`;
    s+=dot(X(0),Y(0),'var(--sky)','m');
    d.tPts.forEach(([tm,fr])=>{if(m>=tm-.01)s+=dot(X(tm),Y(E*fr),'var(--sky)','d')});
    if(m>=d.end-.01)s+=dot(X(d.end),Y(E),'var(--sky)','m')+dot(X(d.end),Y(PE),'var(--muted)','m');
    if(m>=1.5){const [a,b]=sep(Y(dr(mp)),Y(pb(mp)),12);s+=T(X(mp)+6,a+3,`${d.nm} ${dr(mp).toFixed(1)}%`,'t-xs','fill:var(--sky)')+T(X(mp)+6,b+3,`Placebo ${pb(mp).toFixed(1)}%`)}
    s+=ln(X(m),py0,X(m),y+186,'stroke:var(--ink);opacity:.3');
    // dosing and MRI rows
    const rows=[y+142,y+160,y+178];
    s+=T(x,rows[0]+3,'doses')+T(x,rows[1]+3,'MRI label')+T(x,rows[2]+3,d.aLab);
    const dz=[];if(drug==='lec'){for(let wk=0;wk<=78;wk+=2)dz.push(wk/AB_WK);if(ole)for(let wk=82;wk/AB_WK<=Mx;wk+=4)dz.push(wk/AB_WK)}else{for(let wk=0;wk<=72;wk+=4)dz.push(wk/AB_WK)}
    dz.forEach(v=>{if(v<=Mx)s+=ln(X(v),rows[0]-4,X(v),rows[0]+4,`stroke:${v<=m?'var(--sky)':'var(--muted)'};stroke-width:1.4;opacity:${v<=m?1:.45}`)});
    const sq=(v,row,past)=>`<rect x="${f1(X(v)-3.5)}" y="${row-3.5}" width="7" height="7" rx="1.5" style="fill:${past?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:1.4"/>`;
    const dia=(v,row,past)=>`<rect x="${f1(X(v)-3.2)}" y="${row-3.2}" width="6.4" height="6.4" transform="rotate(45 ${f1(X(v))} ${row})" style="fill:${past?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:1.4"/>`;
    d.mriL.forEach(v=>{s+=sq(v,rows[1],m>=v)});d.mriA.forEach(v=>{s+=sq(v,rows[2],m>=v)});d.mriX.forEach(v=>{s+=dia(v,rows[2],m>=v)});
    // readouts
    const sym=[1.4,1.7,9.2],H=[11.5,13.8,38.3],anyA=[25,36,55],anyP=[12,13,22];
    let r1,r2;
    if(drug==='lec'){r1=`By 18 mo: ARIA-E ${E}% vs ${PE}% placebo; symptomatic ${sym[g]}%`;
      r2=g===2?'Severe radiographic ARIA-E: 5% (7 of 141); ARIA-H 38.3%':`ARIA-H ${H[g]}%. Timing: 71% of cases by month 3, 92% by 6`;
      if(ole&&m>d.end+.26)r2='Extension: new ARIA-E after month 6 in 1.7% (MRI)'}
    else{r1=`By 76 wk: ARIA-E ${E}% vs ${PE}% placebo; any ARIA ${anyA[g]}% vs ${anyP[g]}%`;
      r2=g===2?'Modified titration, 52 wk: 24.4% vs 57.1% standard dosing':'58% of first ARIA-E by dose 3; 98% resolved on MRI';
      if(ole&&m>d.end+.26)r2='Extension deaths: one ARIA-E, one bleed after thrombolysis'}
    s+=T(x,y+202,r1,'t-xs','fill:var(--ink)')+T(x,y+216,r2)+T(x,y+230,`Shaded band: label's extra-vigilance window (first ${d.vigLab} wk)`);
    return s}

  function legend(x,y,N){const sw=(cx,cy,k)=>dot(cx,cy,'var(--muted)',k);let s='';
    const dash=(x0,y0)=>ln(x0,y0-3,x0+18,y0-3,'stroke:var(--sky);stroke-width:2;stroke-dasharray:4 3');
    const dm=(cx,cy)=>`<rect x="${cx-3.2}" y="${cy-3.2}" width="6.4" height="6.4" transform="rotate(45 ${cx} ${cy})" style="fill:var(--panel);stroke:var(--sky);stroke-width:1.4"/>`;
    if(!N){s+=sw(x+4,y-3,'m')+T(x+12,y,'trial measurement')+sw(x+132,y-3,'s')+T(x+140,y,'sponsor or approximate')+dash(x+282,y)+T(x+306,y,'projection from a published rate')+dm(x+510,y-3)+T(x+520,y,'extra MRI if higher risk (AUR)');
      s+=T(x,y+15,'Lines between points are interpolated shapes, not measurements. Tissue is a schematic of one person, not to scale.')}
    else{s+=sw(x+4,y-3,'m')+T(x+12,y,'trial measurement')+sw(x+138,y-3,'s')+T(x+146,y,'sponsor or approximate');
      s+=dash(x,y+14)+T(x+24,y+14,'projection from a published rate');
      s+=dm(x+4,y+25)+T(x+14,y+28,'extra MRI for higher-risk patients (AUR)');
      s+=T(x,y+42,'Lines between points are interpolated, not data.')}
    return s}

  function draw(m){
    m=+m;const N=vb(svg,'720 556','400 1070');
    const L=N?{T:{x:12,y:16,w:376},C:{x:12,y:486,w:376},A:{x:12,y:766,w:376},lg:[12,1018]}
             :{T:{x:12,y:16,w:264},C:{x:296,y:16,w:412},A:{x:296,y:282,w:412},lg:[12,532]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=tissue(L.T,m)+clinical(L.C,m)+aria(L.A,m)+legend(L.lg[0],L.lg[1],N);
    svg.innerHTML=s;
    $('#abMo').textContent=m<.05?'baseline':`month ${f1(m)}`;
    const S=steps(),p=phaseOf(S,m);setSt(p,m);
    const d=D(),mp=Math.min(m,d.end),cl=abCL(drug,ole?m:mp)??abCL(drug,30);
    const read=`<p class="readout"><span>Month <b>${Math.round(m)}</b></span><span>Amyloid <b>≈${Math.round(cl)} CL</b></span><span>CDR-SB gap <b>${d.gap(mp).toFixed(2)}</b></span><span>ARIA-E so far <b>${(d.e[g]*d.timing(mp)).toFixed(1)}%</b> (${AB_G[g]})</span></p><p class="stage-cap">Values between published visits are interpolated.</p>`;
    const html=noteHTML(S[p][drug])+read;
    if(html!==lastNote){$('#abNote').innerHTML=html;lastNote=html}
  }
  function buildSteps(){const S=steps(),key=drug+ole;if(key===stepKey)return;stepKey=key;
    stEl.innerHTML=S.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s[drug].t}</span></button>`).join('');stepIdx=-1}
  function setSt(i,m){const S=steps();if(i!==stepIdx){$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));stepIdx=i}
    rg.setAttribute('aria-valuetext',`Month ${f1(m)}. Step ${i+1} of ${S.length}: ${S[i][drug].t}`)}
  stEl.setAttribute('role','group');stEl.setAttribute('aria-label','Steps');
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=steps()[+b.dataset.st];rg.value=atOf(s);draw(+rg.value)});
  const stop=playWire(rg,$('#abPlay'),draw,16000,'Replay','antibody');
  const press=(ids,on)=>ids.forEach(id=>$(id).setAttribute('aria-pressed',id===on));
  function setMax(){const mx=MX();rg.max=mx;if(+rg.value>mx)rg.value=mx;buildSteps();draw(+rg.value)}
  $('#abLec').onclick=()=>{drug='lec';press(['#abLec','#abDon'],'#abLec');setMax()};
  $('#abDon').onclick=()=>{drug='don';press(['#abLec','#abDon'],'#abDon');setMax()};
  [0,1,2].forEach(i=>{$('#abG'+i).onclick=()=>{g=i;press(['#abG0','#abG1','#abG2'],'#abG'+i);draw(+rg.value)}});
  $('#abOle').onclick=()=>{ole=!ole;$('#abOle').setAttribute('aria-pressed',ole);stop();setMax()};
  buildSteps();draw(+rg.value);

  /* ---------- how big is the benefit ---------- */
  const mg=$('#abMag');let mode='pts',sel='lec',grow=1,stopG=null;
  function drawMag(){
    const N=vb(mg,'720 10','400 10'),C=AB_MAG[mode],rows=C.rows,rh=N?46:34,top=58;
    const H=top+rows.length*rh+40;mg.setAttribute('viewBox',`0 0 ${N?400:720} ${H}`);
    const ax0=N?12:300,ax1=N?384:700,Xs=v=>ax0+v/C.max*(ax1-ax0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    rows.forEach((r,i)=>{const ry=top+i*rh;if(r.id===sel)s+=`<rect x="4" y="${ry-2}" width="${(N?400:720)-8}" height="${rh-4}" rx="8" style="fill:var(--sky-soft)"/>`});
    const axY=top+rows.length*rh+4;
    C.ticks.forEach(v=>{s+=ln(Xs(v),top-6,Xs(v),axY,'stroke:var(--line);stroke-dasharray:2 4')+T(Xs(v),axY+14,v,'t-xs t-mid')});
    s+=T(N?12:ax0,axY+30,C.unit);
    C.refs.forEach((r,i)=>{const on=sel===r.id,st=`stroke:var(--rose);stroke-width:${on?2.4:1.6};stroke-dasharray:5 3`;
      if(N){s+=ln(Xs(r.v),top-8-(C.refs.length-1-i)*14,Xs(r.v),top-4,st);rows.forEach((_,j)=>{const ry=top+j*rh;s+=ln(Xs(r.v),ry+18,Xs(r.v),ry+38,st)});s+=ln(Xs(r.v),axY-6,Xs(r.v),axY,st)}
      else s+=ln(Xs(r.v),top-8-(C.refs.length-1-i)*14,Xs(r.v),axY,st);
      s+=N?T(12,18+i*14,r.lab,'t-xs',`fill:var(--rose);font-weight:${on?700:500}`):T(Xs(r.v)+3,18+i*14,r.lab,'t-xs t-end',`fill:var(--rose);font-weight:${on?700:500}`)});
    rows.forEach((r,i)=>{const ry=top+i*rh,by=N?ry+22:ry+10,on=r.id===sel,k=grow;
      s+=T(N?12:16,N?ry+12:ry+18,r.lab,'t-sm',`fill:var(--ink);font-weight:${on?700:500}`);
      if(r.v!=null&&r.v2==null)s+=`<rect x="${ax0}" y="${by}" width="${f1((Xs(r.v)-ax0)*k)}" height="11" rx="3" style="fill:var(--sky);opacity:${on?1:.75}"/>`;
      if(r.lo!=null){const a=Xs(r.v==null?r.lo:r.lo),b=Xs(r.hi);
        if(r.v==null)s+=`<rect x="${f1(a)}" y="${by}" width="${f1((b-a)*k)}" height="11" rx="3" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.2"/>`;
        else if(k>.98)s+=ln(a,by+5.5,b,by+5.5,'stroke:var(--ink);stroke-width:1.4')+ln(a,by+1,a,by+10,'stroke:var(--ink);stroke-width:1.4')+ln(b,by+1,b,by+10,'stroke:var(--ink);stroke-width:1.4')}
      if(r.v2!=null&&k>.5){s+=ln(Xs(r.v2),by+5.5,Xs(r.v),by+5.5,'stroke:var(--muted);stroke-width:1.4');s+=`<circle cx="${f1(Xs(r.v))}" cy="${by+5.5}" r="5" style="fill:var(--sky)"/><circle cx="${f1(Xs(r.v2))}" cy="${by+5.5}" r="5" style="fill:var(--panel);stroke:var(--sky);stroke-width:2"/>`}
      s+=T(N?388:ax0-10,N?ry+12:ry+18,r.txt,'t-sm t-end',`fill:var(--sky);font-weight:700;opacity:${f1(ramp(k,.5,1))}`)});
    mg.innerHTML=s;
    const ex=AB_EX[sel];$('#abMagNote').innerHTML=noteHTML({k:ex.k,t:ex.t,txt:ex.txt,
      pt:mode==='pts'?'The bars show how much less the treated group declined than the placebo group, on an 18-point scale. The dashed lines are the smallest changes people are thought to notice in one person.':'These are estimates of how many months of decline the drug might postpone. They depend heavily on the method used.',
      hook:'Within-person MCID (about 1 to 2 CDR-SB points) versus between-group difference (0.45 to 0.70): the debate is partly about whether these can be compared.'});
  }
  function magBtns(){const C=AB_MAG[mode],ids=[...C.rows.map(r=>[r.id,r.lab]),[C.refs[0].id,mode==='pts'?'Thresholds (MCID)':'What 0.98 would need']];
    $('#abMagBtns').innerHTML=ids.map(([id,l])=>`<button class="btn" data-mg="${id}" aria-pressed="${id===sel}">${l}</button>`).join('')}
  $('#abMagBtns').addEventListener('click',e=>{const b=e.target.closest('[data-mg]');if(!b)return;sel=b.dataset.mg;$$('[data-mg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMag()});
  function setMode(md){mode=md;$('#abMagPts').setAttribute('aria-pressed',md==='pts');$('#abMagMo').setAttribute('aria-pressed',md==='mo');
    sel=AB_MAG[md].rows[md==='pts'?1:0].id;magBtns();stopG&&stopG();grow=0;stopG=animate(700,p=>{grow=ease(p);drawMag()},()=>{grow=1;drawMag()})}
  $('#abMagPts').onclick=()=>setMode('pts');$('#abMagMo').onclick=()=>setMode('mo');
  magBtns();drawMag();
  const prevR=redraws.antibody;redraws.antibody=()=>{prevR&&prevR();drawMag()};

  $('#abDebate').innerHTML=`
   <div class="card"><h4><span class="tag">One reading</span>A real, growing benefit</h4><ul>
    <li>Both trials met their primary endpoints, with consistent results across secondary scales: all of lecanemab's key secondaries, and 23 of 24 gated donanemab outcomes. [[vanDyck2023,Sims2023]]</li>
    <li>Within-person thresholds (MCIDs) were not designed to judge a between-group average; a 0.98-point group gap would need about 60% slowing. [[Petersen2023,Lanctot2025]]</li>
    <li>Translated into time, estimates run from about 4 to 13 months, and modelled independence gains of 10 to 13 months. [[Araujo2025,Hartz2025]]</li>
    <li>Lower post-treatment amyloid tracked slower decline (CDR-SB R² 0.87), supporting plaque removal as the mechanism. [[Lu2025]]</li>
    <li>Sponsor extensions report gaps that keep widening against external cohorts. [[vanDyck2025AAIC,Zimmer2026]]</li></ul></div>
   <div class="card"><h4><span class="tag">Another reading</span>A small benefit at real cost</h4><ul>
    <li>Differences of 0.45 to 0.70 sit below anchor-based MCIDs of about 1 to 2 points; a meta-analysis found no antibody exceeded the MCID. [[Andrews2019,Ebell2024]]</li>
    <li>Benefit should be judged on whether it is noticeable, valuable and worthwhile given cost and risk; responder-style analyses can mislead. [[Liu2023,Liu2025]]</li>
    <li>Extensions lost randomization and blinding; delayed-start groups appear to catch up, which argues against lasting disease modification. [[Hazan2026a,Hazan2026b]]</li>
    <li>NICE judged a 4 to 6 month delay too costly; Leqembi's US list price was $26,500 a year. [[PJ2025,KFF2023]]</li>
    <li>ARIA, frequent MRI and infusions are a burden, and extra brain volume loss is unexplained. [[Sims2023,LeqembiLabel2026,Alves2023]]</li></ul></div>`;

  /* ---------- targets table ---------- */
  $('#abTargets').innerHTML=`<table><thead><tr><th>Antibody</th><th>What it binds</th><th>Plaque removal</th><th>Clinical result</th></tr></thead><tbody>
   <tr><th>Lecanemab</th><td>Soluble protofibrils, about 10 times more strongly than fibrils in a lab comparison; the label says aggregated soluble and insoluble forms. [[vanDyck2023,Soderberg2023,LeqembiLabel2026]]</td><td>-55.5 CL at 18 months [[vanDyck2023]]</td><td>Slowed CDR-SB by 0.45 [[vanDyck2023]]</td></tr>
   <tr><th>Donanemab</th><td>N3pG pyroglutamate amyloid beta, found only in deposited plaque. [[KisunlaLabel2025,Mintun2021]]</td><td>-87.0 CL at 76 weeks; 76.4% cleared [[Sims2023]]</td><td>Slowed CDR-SB by 0.70 [[Sims2023]]</td></tr>
   <tr><th>Aducanumab</th><td>Aggregated soluble and insoluble forms; prefers fibrils over protofibrils. [[BuddHaeberlein2022,Soderberg2023]]</td><td>Reduced amyloid (the basis of its accelerated approval) [[BioSpace2021]]</td><td>EMERGE high dose -0.39; ENGAGE +0.03 [[BuddHaeberlein2022]]</td></tr>
   <tr><th>Gantenerumab</th><td>Aggregated amyloid beta, given under the skin; prefers fibrils. [[Bateman2023,Soderberg2023]]</td><td>56 to 66 CL below placebo, but only 27 to 28% amyloid-negative [[Bateman2023]]</td><td>Not significant (-0.31 and -0.19) [[Bateman2023]]</td></tr>
   <tr><th>Solanezumab</th><td>Monomers: single, unaggregated molecules. [[Sperling2023]]</td><td>None: amyloid still rose (11.6 vs 19.3 CL on placebo) [[Sperling2023]]</td><td>No slowing in people without symptoms (A4) [[Sperling2023]]</td></tr>
   </tbody></table>`;

  /* ---------- cards ---------- */
  $('#abCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Few people are eligible</h4>
    <ul class="ab-bars">
     <li><span>Population study, amyloid-positive MCI or mild dementia: <b>8%</b> met CLARITY AD criteria [[Pittock2023]]</span><span class="tr"><i style="width:8%"></i></span></li>
     <li><span>Swedish memory clinic, AUR criteria: <b>6%</b>, or <b>3%</b> excluding two APOE4 copies [[Rosenberg2026]]</span><span class="tr"><i style="width:6%"></i></span></li>
     <li><span>Paris memory clinic: <b>28.6%</b> of biomarker-confirmed patients, <b>2.9%</b> of all patients [[Vrillon2026]]</span><span class="tr"><i class="lt" style="width:28.6%"></i></span></li>
     <li><span>Korea, amyloid-positive patients: <b>24.6%</b> lecanemab, <b>28.0%</b> donanemab [[Jeon2025]]</span><span class="tr"><i class="lt" style="width:24.6%"></i></span></li>
    </ul><p class="cardnote">The denominators differ (everyone in a population, everyone in a clinic, or only those with confirmed amyloid), so the numbers are not directly comparable.</p></div>
   <div class="card"><span class="ev est">Label information</span><h4>ARIA: what it is and who is at risk</h4>
    <p>ARIA-E is vasogenic oedema or sulcal effusion on FLAIR MRI; ARIA-H is microhaemorrhage or superficial siderosis. Reported symptoms include headache, confusion, visual change, dizziness and gait trouble; seizures occur and ARIA can be fatal. Risk rises with two APOE4 copies (about 15% of people with Alzheimer's) and with signs of cerebral amyloid angiopathy. [[Cogswell2022,LeqembiLabel2026,KisunlaLabel2025]]</p>
    <p>ARIA-E can mimic stroke; fatal bleeds have followed clot-busting drugs, and both labels advise considering ARIA first. The AURs exclude people on anticoagulants and the EU makes it a contraindication. [[LeqembiLabel2026,KisunlaLabel2025,Cummings2023,Rabinovici2025,EMA2025Leqembi]]</p>
    <div class="hook"><b>Exam hook</b>ARIA-E = oedema (FLAIR). ARIA-H = haemorrhage (T2*/SWI). Highest risk: APOE4 homozygotes, early in treatment.</div></div>
   <div class="card"><span class="ev est">Label information</span><h4>How the drugs are given</h4>
    <ul><li>Lecanemab: 10 mg/kg IV every 2 weeks; after 18 months, IV every 4 weeks or a 360 mg weekly autoinjector (Leqembi Iqlik). Since July 2026 treatment can also start under the skin at 500 mg weekly, as two 250 mg injections. The injectable approvals rest on matched drug exposure and modelling, not a separate efficacy trial. [[LeqembiLabel2026,Eisai2025Iqlik,Eisai2026IqlikInit]]</li>
     <li>Donanemab: IV every 4 weeks. The label's modified titration (350, 700, 1,050, then 1,400 mg) cut ARIA-E at 24 weeks from 23.7% to 13.7% with similar amyloid lowering. [[KisunlaLabel2025,Wang2025]]</li>
     <li>MRI schedules differ: the 2026 Leqembi label checks at 1, 2, 3 and 6 months; the 2023 AUR and EU label before the 5th, 7th and 14th infusions. [[LeqembiLabel2026,Cummings2023,EMA2025Leqembi]]</li></ul>
    <p class="cardnote">Published label dosing, quoted for education. It is not a guide for any individual.</p></div>
   <div class="card"><span class="ev early">Contested</span><h4>Aducanumab: the approval that split the field</h4>
    <p>EMERGE and ENGAGE were stopped for futility in 2019. In a larger dataset EMERGE's high dose met its endpoint (CDR-SB -0.39) and ENGAGE did not (+0.03). At high dose 35.2% had ARIA-E. An FDA advisory committee voted 0 yes, 10 no, 1 uncertain, yet the FDA granted accelerated approval on 7 June 2021, and three committee members resigned. Biogen stopped selling it in January 2024, saying safety and efficacy were not the reason. [[BuddHaeberlein2022,Salloway2022,BioSpace2021,PracticalNeurology2024]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Gantenerumab and solanezumab failed</h4>
    <p>Gantenerumab lowered amyloid but only about 27 to 28% became amyloid-negative, and CDR-SB differences (-0.31, -0.19) were not significant. Solanezumab, which binds monomers, did not slow decline in amyloid-positive people without symptoms, and their amyloid kept rising. The lesson drawn: only deep, fast plaque clearance has gone with clinical benefit. [[Bateman2023,Sperling2023,Lu2025]]</p>
    <div class="pt"><b>In plain words</b>Grabbing loose amyloid did not help. Clearing plaques only partly did not help either. The two drugs that cleared plaque deeply and quickly slowed decline a little.</div></div>
   <div class="card"><span class="ev early">Contested</span><h4>The brain-volume paradox</h4>
    <p>On MRI, amyloid-lowering antibodies are followed by extra brain volume loss, not less. One group calls this amyloid-removal-related pseudo-atrophy: limited to amyloid-lowering drugs, compatible with plaque removal and not so far linked to harm. A meta-analysis found ventricles enlarged 2.1 mL more than placebo, tracking ARIA frequency (r = 0.86), and read it as possible harm. Both sides call for more patient-level and post-mortem data. [[Belder2024,Alves2023]]</p></div>
   <div class="card"><span class="ev est">Published figures</span><h4>Cost and coverage</h4>
    <p>Leqembi's US list price was $26,500 a year; with 20% coinsurance, people on traditional Medicare would pay over $5,000 a year. Kisunla was about $32,000 for 12 months (trade press). Since 6 July 2023 Medicare covers traditionally approved antibodies when the clinician joins a registry. [[KFF2023,MHE2024,CMS2023]]</p>
    <p>Real-world US clinic (234 people): ARIA in 22% over about 6.5 months, symptomatic in 5.7%, and far more often in mild dementia (27%) than in MCI or very mild dementia (1.8%). [[Paczynski2025]]</p></div>`;

  /* ---------- regulatory timeline ---------- */
  const REG=[
   ['Jun 2021','US','FDA grants aducanumab accelerated approval on amyloid reduction, after its advisory committee voted 0 yes, 10 no, 1 uncertain. Three members resign. [[BioSpace2021]]'],
   ['Apr 2022','US','Medicare decision (7 April): anti-amyloid antibodies covered only within trials or CMS-approved studies (coverage with evidence development). [[CMS2022NCD]]'],
   ['Jan 2023','US','Lecanemab accelerated approval. [[Jin2024]]'],
   ['Jul 2023','US','6 July: lecanemab converted to traditional approval with a boxed ARIA warning and APOE4 testing recommended. The same day Medicare begins covering it when the clinician joins a registry. [[FDA2023Leqembi,CMS2023]]'],
   ['Jan 2024','US','31 January: Biogen stops developing and selling aducanumab. [[PracticalNeurology2024]]'],
   ['Jul 2024','US','2 July: FDA approves donanemab (Kisunla); its advisory committee had voted 11 to 0 that benefits outweigh risks (trade press). [[FDA2024Kisunla,MHE2024]]'],
   ['Jul 2024','EU','25 July: the EMA committee (CHMP) refuses lecanemab, judging that benefits did not outweigh ARIA risks. [[EMA2024LeqembiReexam,EMA2025Leqembi]]'],
   ['Aug 2024','UK','NICE draft guidance does not recommend lecanemab. [[PJ2025]]'],
   ['Oct 2024','UK','NICE draft guidance does not recommend donanemab. [[PJ2025]]'],
   ['Nov 2024','EU','14 November: on re-examination, a positive opinion for lecanemab restricted to APOE4 non-carriers and heterozygotes. [[EMA2024LeqembiReexam]]'],
   ['Jan 2025','US','26 January: IV maintenance dosing of lecanemab every 4 weeks after 18 months approved. [[Eisai2025IVmaint,LeqembiLabel2026]]'],
   ['Mar 2025','EU','CHMP refuses donanemab. [[EMA2025Kisunla]]'],
   ['Apr 2025','EU','15 April: lecanemab authorised for APOE4 non-carriers and heterozygotes, with controlled access, no anticoagulants and MRI before the 5th, 7th and 14th doses. [[EMA2025Leqembi]]'],
   ['Jun 2025','UK','NICE final draft guidance recommends neither drug: benefit judged modest (about 4 to 6 months\' delay) and costs too high. [[PJ2025]]'],
   ['Jul 2025','US','Kisunla label adopts the modified titration as the recommended dose and updates the boxed warning. [[KisunlaLabel2025]]'],
   ['Jul 2025','EU','24 July: on re-examination, a positive opinion for donanemab. [[EMA2025Kisunla]]'],
   ['Aug 2025','US','29 August: Leqembi Iqlik autoinjector approved for maintenance (360 mg weekly); US launch 6 October 2025. [[Eisai2025Iqlik]]'],
   ['Sep 2025','EU','24 September: donanemab authorised for APOE4 non-carriers and heterozygotes, with controlled access, no anticoagulants and treatment up to 18 months. [[EMA2025Kisunla]]'],
   ['Jan 2026','UK','Appeal panels uphold grounds on infusion costs and carer utility values; NICE to reconsider both drugs. [[AlzEurope2026]]'],
   ['Apr 2026','UK','28 April: NICE consultation closes; the committee was due to meet on 10 June 2026. The outcome is not confirmed in our sources. [[PJ2026,AlzEurope2026]]'],
   ['Jul 2026','US','13 July: subcutaneous initiation of lecanemab approved, 500 mg weekly as two 250 mg injections. [[Eisai2026IqlikInit]]']
  ];
  let reg='all';
  function drawReg(){$('#abReg').innerHTML=`<table><thead><tr><th>Date</th><th>Where</th><th>What happened</th></tr></thead><tbody>${REG.filter(r=>reg==='all'||r[1]===reg).map(r=>`<tr><td>${r[0]}</td><td><span class="tag ${r[1]==='US'?'sky':r[1]==='EU'?'sage':'rose'} reg-tag">${r[1]==='UK'?'England':r[1]}</span></td><td>${r[2]}</td></tr>`).join('')}</tbody></table>`}
  $$('[data-reg]').forEach(b=>b.onclick=()=>{reg=b.dataset.reg;$$('[data-reg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawReg()});
  drawReg();
};
