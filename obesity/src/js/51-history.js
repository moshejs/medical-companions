/* =============== 5.1 History & people =============== */
/* Time axis: piecewise linear, so the slider spends little time on the sparse 19th and mid-20th centuries.
   Knots are [t, year] pairs. */
const HI_KN=[[0,1830],[.12,1950],[.27,1990],[1,2026.6]];
function hiYear(t){t=clamp(t);for(let i=1;i<HI_KN.length;i++)if(t<=HI_KN[i][0]){const a=HI_KN[i-1],b=HI_KN[i];return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return HI_KN[HI_KN.length-1][1]}
function hiTOf(y){for(let i=1;i<HI_KN.length;i++)if(y<=HI_KN[i][1]){const a=HI_KN[i-1],b=HI_KN[i];return lerp(a[0],b[0],(y-a[1])/(b[1]-a[1]))}return 1}
/* lanes: 0 measuring and naming, 1 biology, surgery and trials, 2 medicines.
   k: 'm' milestone, 'a' US approval (n = how many), 'w' withdrawal (n = how many drugs), 'r' safety review */
const HI_LANES=['Measuring & naming','Biology & surgery','Medicines'];
const HI_LANES_N=['Measuring','Biology & surgery','Medicines'];
const HI_EV=[
 {y:1832,l:0,k:'m',s:'Quetelet index',ti:'Quetelet\'s index',sh:'Weight rises with the square of height, outside growth spurts.',
  tx:'In 1832 the Belgian statistician Adolphe Quetelet concluded from growth studies that, outside the growth spurts of infancy and puberty, "the weight increases as the square of the height". [[Eknoyan2008]]'},
 {y:1853,l:0,k:'m',s:'Statistical Congress',ti:'First International Statistical Congress',sh:'Quetelet\'s congress starts a uniform naming of causes of death.',
  tx:'Quetelet organised the first International Statistical Congress in 1853. It launched work on a uniform nomenclature of causes of death, a forerunner of the International Classification of Diseases. [[Eknoyan2008]]'},
 {y:1950,l:2,k:'m',s:'1940s–50s anorectics',ti:'Amphetamine-type appetite suppressants',sh:'Approved in the 1940s and 1950s; efficacy and safety hard to define.',
  tx:'After amphetamine and amphetamine-like anorectics were approved in the 1940s and 1950s, the FDA struggled to define their efficacy and safety; limits on duration of use and warnings about abuse and addiction followed. [[Colman2005]]'},
 {y:1959,l:2,k:'a',n:1,s:'Phentermine',ti:'Ionamin (phentermine) approved',sh:'Original US approval on 4 May 1959.',
  tx:'Ionamin (phentermine resin complex) received its original US approval on 4 May 1959. [[FDA-DrugsAtFDA-AOM]]'},
 {y:1967,l:1,k:'m',s:'Gastric bypass',ti:'Gastric bypass described',sh:'Mason and Ito describe gastric bypass for obesity.',
  tx:'Mason and Ito described gastric bypass for obesity in 1967. [[Mason1967]]'},
 {y:1972,l:0,k:'m',s:'"Body mass index"',ti:'Keys names the body mass index',sh:'7,424 men in 12 cohorts: weight/height² works best.',
  tx:'In 1972 Ancel Keys and colleagues compared indices of relative weight in 7,424 healthy men in 12 cohorts in five countries, and named weight/height² the "body mass index". [[Keys1972,Eknoyan2008]]'},
 {y:1991,l:1,k:'m',s:'NIH consensus',ti:'NIH consensus on surgery',sh:'Nonsurgical care first; surgery for informed people, team-selected.',
  tx:'A 1991 NIH Consensus Development Conference recommended a nonsurgical programme first for people seeking treatment for severe obesity, with gastric restrictive or bypass operations for well-informed, motivated people with acceptable operative risk, selected by a multidisciplinary team, with lifelong surveillance. [[NIH1991Consensus]]'},
 {y:1994,l:1,k:'m',s:'Leptin',ti:'The ob gene and leptin',sh:'A hormone from fat tissue that signals the size of fat stores.',
  tx:'In 1994 Friedman\'s group (Zhang et al.) cloned the mouse obese (ob) gene and its human homologue; its product, leptin, was proposed as a signal from adipose tissue that helps regulate the size of the body\'s fat depot. [[Zhang1994]]'},
 {y:1997,l:2,k:'w',n:2,s:'Fen-phen withdrawn',ti:'Fenfluramine withdrawn',sh:'Heart valve disease; FDA advisory, then withdrawal requested.',
  tx:'US prescriptions for fenfluramine and phentermine exceeded 18 million in 1996, and valve disease was reported in 24 women about 12 months after starting fen-phen. [[Connolly1997]] The FDA issued a public health advisory on 8 July 1997 and requested voluntary withdrawal of fenfluramine and dexfenfluramine. [[CDC1997Fenfluramine]]'},
 {y:1997.3,l:0,k:'m',s:'WHO consultation',ti:'First WHO obesity consultation',sh:'WHO\'s first special consultation on obesity.',
  tx:'WHO held its first special consultation on obesity in 1997, after finding in 1995 more overweight than underweight in many developing countries. [[James2008WHO]]'},
 {y:1997.9,l:2,k:'a',n:1,s:'Sibutramine',ti:'Meridia (sibutramine) approved',sh:'Original US approval on 22 November 1997.',
  tx:'Meridia (sibutramine) received its original US approval on 22 November 1997; it is now listed as "Discontinued". [[FDA-DrugsAtFDA-AOM]]'},
 {y:1999.3,l:2,k:'a',n:1,s:'Orlistat',ti:'Xenical (orlistat) approved',sh:'Original US approval on 23 April 1999.',
  tx:'Xenical (orlistat) received its original US approval on 23 April 1999. [[FDA-DrugsAtFDA-AOM]] See Other weight-loss medicines for how it works.'},
 {y:2000,l:0,k:'m',s:'WHO BMI classes',ti:'WHO BMI classification',sh:'Technical Report Series 894 sets the classes still used.',
  tx:'The report of the 1997 WHO consultation, Technical Report Series 894 (2000), set the BMI classification still used for international comparisons. [[James2008WHO,WHO2000TRS894]]'},
 {y:2010,l:2,k:'w',n:1,s:'Sibutramine withdrawn',ti:'Sibutramine withdrawn in Europe',sh:'SCOUT: more non-fatal heart attacks and strokes.',
  tx:'In SCOUT (9,804 adults at high cardiovascular risk), sibutramine raised the primary cardiovascular outcome to 11.4% versus 10.0% (HR 1.16). [[James2010SCOUT]] The European Medicines Agency withdrew it in 2010. [[Galhardo2010]]'},
 {y:2012.5,l:2,k:'a',n:1,s:'Phentermine–topiramate',ti:'Qsymia approved',sh:'Phentermine–topiramate, original US approval 17 July 2012.',
  tx:'Qsymia (phentermine–topiramate) received its original US approval on 17 July 2012. [[FDA-DrugsAtFDA-AOM]]'},
 {y:2013,l:0,k:'m',s:'AMA: a disease',ti:'The AMA calls obesity a disease',sh:'"A complex, chronic disease requiring medical attention."',
  tx:'In 2013 the American Medical Association recognised obesity as "a complex, chronic disease requiring medical attention"; a later review argues this has helped bring more access to care and less blame. [[Kyle2016AMA]]'},
 {y:2014.8,l:2,k:'a',n:2,s:'Liraglutide 3.0 mg',ti:'Contrave and Saxenda approved',sh:'Naltrexone–bupropion (Sept) and liraglutide 3.0 mg (Dec) 2014.',
  tx:'Contrave (naltrexone–bupropion) was approved on 10 September 2014 and Saxenda (liraglutide) on 23 December 2014. [[FDA-DrugsAtFDA-AOM]] In SCALE, liraglutide 3.0 mg gave 8.4 kg versus 2.8 kg mean loss at 56 weeks. [[PiSunyer2015SCALE]]'},
 {y:2017,l:0,k:'m',s:'"Chronic relapsing"',ti:'World Obesity Federation statement',sh:'"A chronic relapsing progressive disease process."',
  tx:'The World Obesity Federation\'s 2017 position statement describes obesity as "a chronic relapsing progressive disease process". [[Bray2017WOF]]'},
 {y:2020,l:2,k:'r',s:'Lorcaserin review',ti:'FDA reviews lorcaserin cancer risk',sh:'A heart-safety trial raises a different question.',
  tx:'CAMELLIA-TIMI 61 found lorcaserin non-inferior for cardiovascular safety (HR 0.99), [[Bohula2018CAMELLIA]] and the FDA then reviewed cancer risk in the same trial. [[Sharretts2020]]'},
 {y:2020.9,l:2,k:'a',n:1,s:'Setmelanotide',ti:'Setmelanotide approved',sh:'An MC4R agonist for rare genetic obesity.',
  tx:'Setmelanotide (Imcivree) was first approved on 25 November 2020; it treats obesity caused by breaks in the leptin–melanocortin pathway, not common obesity. [[FDA-Imcivree]]'},
 {y:2021.4,l:2,k:'a',n:1,s:'Semaglutide 2.4 mg',ti:'Wegovy (semaglutide 2.4 mg) approved',sh:'Weekly injection; STEP 1: −14.9% vs −2.4% at 68 weeks.',
  tx:'Wegovy (semaglutide) injection was approved on 4 June 2021. [[FDA-DrugsAtFDA-AOM]] In STEP 1, semaglutide 2.4 mg gave −14.9% versus −2.4% with placebo at 68 weeks (trial averages). [[Wilding2021STEP1]]'},
 {y:2022,l:1,k:'m',s:'Surgery update',ti:'ASMBS/IFSO indications',sh:'Major updates to the 1991 NIH surgery guidance.',
  tx:'In 2022, ASMBS and IFSO published major updates to the 1991 NIH guidelines on indications for metabolic and bariatric surgery. [[Eisenberg2022ASMBS]]'},
 {y:2023.6,l:1,k:'m',s:'SELECT',ti:'SELECT: fewer heart events',sh:'6.5% vs 8.0% had a major cardiovascular event.',
  tx:'In SELECT (17,604 people with cardiovascular disease and no diabetes), cardiovascular death, heart attack or stroke occurred in 6.5% on semaglutide 2.4 mg versus 8.0% on placebo (HR 0.80). [[Lincoff2023SELECT]]'},
 {y:2023.85,l:2,k:'a',n:1,s:'Tirzepatide',ti:'Zepbound (tirzepatide) approved',sh:'GIP/GLP-1 dual agonist; approved 8 November 2023.',
  tx:'Zepbound (tirzepatide) was approved on 8 November 2023. [[FDA-DrugsAtFDA-AOM]] In SURMOUNT-1, weight changed −15.0% to −20.9% versus −3.1% at 72 weeks (trial averages). [[Jastreboff2022SURMOUNT1]]'},
 {y:2025.1,l:0,k:'m',s:'Clinical obesity',ti:'Lancet Commission: clinical obesity',sh:'Clinical vs preclinical obesity; BMI for screening only.',
  tx:'The 2025 Lancet Diabetes & Endocrinology Commission defined clinical obesity as a chronic, systemic illness from excess adiposity, separated it from preclinical obesity, and said BMI should be used only as a population or screening measure. [[Rubino2025Commission]]'},
 {y:2025.95,l:2,k:'a',n:1,s:'Semaglutide tablets',ti:'Wegovy tablets approved',sh:'Oral semaglutide 25 mg; approved 22 December 2025.',
  tx:'Wegovy (semaglutide) tablets were approved on 22 December 2025. [[FDA-DrugsAtFDA-AOM]] In OASIS 4, oral semaglutide 25 mg gave −13.6% versus −2.2% at 64 weeks. [[Wharton2025OASIS4]]'},
 {y:2026.25,l:2,k:'a',n:1,s:'Orforglipron',ti:'Foundayo (orforglipron) approved',sh:'A non-peptide GLP-1 tablet; approved 1 April 2026.',
  tx:'The FDA approved orforglipron as FOUNDAYO on 1 April 2026. [[FDA-Foundayo]] See Research frontier for what is still in trials.'}
];
const HI_STEPS=[
 {from:0,at:hiTOf(1853),k:'1832–1949',t:'Counting and measuring',
  txt:'The index that became BMI began as statistics about populations. Quetelet described it in 1832. [[Eknoyan2008]] The search for a practical index of relative weight began after life-insurance actuaries reported higher mortality in their overweight policyholders. [[Eknoyan2008]]',
  pt:'BMI started as a way to describe large groups of people, not to judge one person.',
  hook:'Quetelet index = weight/height²: described 1832. [[Eknoyan2008]]'},
 {from:hiTOf(1949),at:hiTOf(1972.3),k:'1950–1989',t:'First drugs, first surgery, a name',
  txt:'Amphetamine-type appetite suppressants arrived in the 1940s and 1950s, followed by limits on use and warnings about abuse and addiction. [[Colman2005]] Mason and Ito described gastric bypass in 1967. [[Mason1967]] After World War II the search for a weight index centred on studies of weight and heart disease, and in 1972 Keys named the body mass index. [[Eknoyan2008,Keys1972]]',
  pt:'The first weight-loss pills were stimulants that brought problems of their own. Surgery and the name "BMI" arrived in the same decade.',
  hook:'Keys (1972) judged BMI best by low correlation with height and high correlation with body fat. [[Keys1972]]'},
 {from:hiTOf(1989),at:hiTOf(1997.1),k:'1990–1999',t:'Biology, and a hard lesson',
  txt:'Leptin, discovered in 1994, showed that fat tissue sends signals to the body. [[Zhang1994]] In 1997 heart valve disease in women taking fen-phen led to an FDA advisory and withdrawal of fenfluramine and dexfenfluramine. [[Connolly1997,CDC1997Fenfluramine]] Orlistat was approved in 1999. [[FDA-DrugsAtFDA-AOM]]',
  pt:'Scientists found that fat tissue makes hormones. In the same decade a popular pill pairing caused heart valve damage and was withdrawn.',
  hook:'Fenfluramine and dexfenfluramine were withdrawn in 1997 for valvulopathy. [[CDC1997Fenfluramine]]'},
 {from:hiTOf(1999.7),at:hiTOf(2010.1),k:'2000–2012',t:'Classes, and more withdrawals',
  txt:'The WHO set the BMI classes still used internationally. [[WHO2000TRS894]] Sibutramine was withdrawn in Europe in 2010 after SCOUT showed more non-fatal heart attacks and strokes. [[James2010SCOUT,Galhardo2010]] Rimonabant, never approved in the US, was withdrawn in Europe for depression risk. [[Christensen2007,Sam2011]]',
  pt:'Two more medicines were taken off the market in Europe because of harm to the heart or to mood.',
  hook:'Sibutramine: SCOUT HR 1.16, non-fatal MI HR 1.28, non-fatal stroke HR 1.36. [[James2010SCOUT]]'},
 {from:hiTOf(2012.8),at:hiTOf(2014.9),k:'2013–2019',t:'Called a disease',
  txt:'From 2013, medical bodies increasingly described obesity as a chronic disease: the AMA in 2013, [[Kyle2016AMA]] AACE/ACE with "adiposity-based chronic disease", [[Mechanick2017ABCD]] and the World Obesity Federation in 2017. [[Bray2017WOF]] Liraglutide (Saxenda), the first GLP-1 medicine approved for weight, arrived in December 2014. [[FDA-DrugsAtFDA-AOM]]',
  pt:'Doctors began to describe obesity as a long-term disease with biological causes, not a failure of willpower.',
  hook:'AMA 2013: obesity is "a complex, chronic disease requiring medical attention". [[Kyle2016AMA]]'},
 {from:hiTOf(2019.6),at:hiTOf(2026.3),k:'2020–2026',t:'The incretin era',
  txt:'Semaglutide 2.4 mg (2021) and tirzepatide (2023) brought larger average weight loss in trials, [[Wilding2021STEP1,Jastreboff2022SURMOUNT1]] and SELECT showed fewer cardiovascular events. [[Lincoff2023SELECT]] In 2025 the Lancet Commission separated clinical from preclinical obesity. [[Rubino2025Commission]] Tablets followed: Wegovy tablets in December 2025 and orforglipron in April 2026. [[FDA-DrugsAtFDA-AOM,FDA-Foundayo]]',
  pt:'New medicines based on gut hormones changed treatment, and experts redefined obesity around how it affects the body, not body size alone.',
  hook:'SELECT: semaglutide cut major cardiovascular events by 20% in people with cardiovascular disease and no diabetes. [[Lincoff2023SELECT]]'}
];
/* withdrawn and troubled medicines: use, signal, evidence, action */
const HI_WD=[
 {id:'fen',n:'Fen-phen',st:['Off-label fenfluramine plus phentermine: over 18 million US prescriptions in 1996','Valve disease in 24 women about 12 months after starting','Valve tissue like carcinoid disease; 8 with pulmonary hypertension, 5 needed heart surgery','FDA advisory, 8 July 1997; withdrawal of fenfluramine and dexfenfluramine requested'],
  ti:'Fenfluramine and dexfenfluramine (1997)',
  tx:'Off-label "fen-phen" and the approval of dexfenfluramine led to widespread long-term use. [[Colman2005]] Connolly and colleagues described valvular heart disease in 24 women (mean age 44); valve histology matched carcinoid- or ergotamine-induced disease, 8 had pulmonary hypertension and 5 needed cardiac surgery. [[Connolly1997]] The FDA wrote to 700,000 practitioners and requested voluntary withdrawal. [[CDC1997Fenfluramine]]',
  les:'A combination never tested as a pair was used by millions; harm surfaced only after wide use.'},
 {id:'sib',n:'Sibutramine',st:['Meridia approved in the US on 22 November 1997','SCOUT: 9,804 people aged 55+ with heart disease, type 2 diabetes or both','Primary cardiovascular outcome 11.4% vs 10.0% (HR 1.16)','Withdrawn by the European Medicines Agency in 2010; US product "Discontinued"'],
  ti:'Sibutramine (2010)',
  tx:'In SCOUT, sibutramine raised the primary cardiovascular outcome (HR 1.16; 95% CI 1.03–1.31), driven by non-fatal myocardial infarction (HR 1.28) and non-fatal stroke (HR 1.36); cardiovascular and all-cause death were not increased. [[James2010SCOUT]] The European Medicines Agency withdrew it in 2010, [[Galhardo2010]] and Meridia is listed as "Discontinued" in Drugs@FDA. [[FDA-DrugsAtFDA-AOM]]',
  les:'A dedicated cardiovascular outcome trial found harm in the people at highest risk.'},
 {id:'rim',n:'Rimonabant',st:['A CB1 receptor blocker, marketed in Europe, never approved in the US','4 RCTs (4,105 people): 4.7 kg more weight loss than placebo at 1 year','2.5× more stopping for depressive mood disorders, 3.0× for anxiety','Withdrawn in Europe after postmarketing data confirmed depression risk'],
  ti:'Rimonabant (Europe)',
  tx:'Rimonabant gave 4.7 kg (95% CI 4.1–5.3) more weight loss than placebo at 1 year, but participants were 2.5 times more likely to stop for depressive mood disorders and 3.0 times more likely for anxiety. [[Christensen2007]] The European Medicines Agency withdrew it after postmarketing data confirmed the higher risk of depressive disorders. [[Christensen2007,Sam2011]]',
  les:'Weight loss does not outweigh harm to mental health; mood is now watched closely in trials.'},
 {id:'amp',n:'Early anorectics',st:['Amphetamine and amphetamine-like appetite suppressants, 1940s–50s','The FDA struggled to define their efficacy and safety','Concerns about abuse and addiction','Limits on duration of use and warnings about abuse and addiction'],
  ti:'Amphetamine-type anorectics',
  tx:'After amphetamine and amphetamine-like anorectics were approved in the 1940s and 1950s, the FDA struggled to define their efficacy and safety; limits on duration of use and warnings about abuse and addiction followed. [[Colman2005]]',
  les:'Short trials of stimulants could not answer long-term questions about a chronic disease.'},
 {id:'lor',n:'Lorcaserin',st:['A serotonin 2C agonist','CAMELLIA-TIMI 61 (12,000 people) tested heart safety','Cardiovascular events 2.0% vs 2.1% a year (HR 0.99): non-inferior','FDA review of cancer risk in the same trial, published 2020'],
  ti:'Lorcaserin (2020)',
  tx:'CAMELLIA-TIMI 61 found major cardiovascular events in 2.0% versus 2.1% per year (HR 0.99), so lorcaserin was non-inferior on cardiovascular safety; 38.7% versus 17.4% lost at least 5% at 1 year. [[Bohula2018CAMELLIA]] The FDA then reviewed the cancer risk seen in that trial. [[Sharretts2020]]',
  les:'A trial built to answer one safety question can raise another; large, long trials catch what small ones miss.'}
];
function hiWrap(s,n){const w=s.split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n&&l){out.push(l);l=x}else l=(l+' '+x).trim()});if(l)out.push(l);return out}
function hiEsc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}

inits.history=()=>{
  const sec=$('#m-history');
  /* ---------- the timeline ---------- */
  const svg=$('#hiSvg'),rg=$('#hiT'),read=$('#hiRead');
  /* nudge events that share a lane and nearly the same year */
  const off=HI_EV.map((e,i)=>{let j=0;for(let q=0;q<i;q++)if(HI_EV[q].l===e.l&&Math.abs(HI_EV[q].y-e.y)<1.2)j++;return j});
  const kcol=k=>k==='a'?'var(--rx-drug)':k==='w'?'var(--risk)':k==='r'?'var(--warn)':'var(--brand)';
  function mark(e,x,y,on,cur){const c=kcol(e.k),r=cur?8:6,f=on?c:'var(--panel)',st=`fill:${f};stroke:${c};stroke-width:2`;
    let g='';
    if(e.k==='a')g=`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="3" style="${st}"/>`;
    else if(e.k==='w')g=`<path d="M${f1(x)} ${f1(y-r-1)}L${f1(x+r+1)} ${f1(y+r)}L${f1(x-r-1)} ${f1(y+r)}Z" style="${st}"/>`;
    else if(e.k==='r')g=`<path d="M${f1(x)} ${f1(y-r-1)}L${f1(x+r+1)} ${f1(y)}L${f1(x)} ${f1(y+r+1)}L${f1(x-r-1)} ${f1(y)}Z" style="${st}"/>`;
    else g=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="${st}"/>`;
    if(cur)g=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r+6}" style="fill:${c};opacity:.18"/>`+g;
    return g}
  function draw(t){
    const N=vb(svg,'720 400','400 650');
    const Y=hiYear(t),p=phaseOf(HI_STEPS,t),P=HI_STEPS[p];
    let ci=-1;HI_EV.forEach((e,i)=>{if(e.y<=Y+.05)ci=i});
    const E=ci>=0?HI_EV[ci]:null;
    let appr=0,wd=0;HI_EV.forEach(e=>{if(e.y<=Y+.05){if(e.k==='a')appr+=e.n;if(e.k==='w')wd+=e.n}});
    let s='';
    if(!N){
      const X=y=>150+555*hiTOf(y),LY=[66,112,158],AY=188;
      HI_LANES.forEach((n,i)=>{s+=`<text x="10" y="${LY[i]+4}" class="t-lbl" style="font-size:12px">${n}</text><line x1="146" x2="708" y1="${LY[i]}" y2="${LY[i]}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:2 4"/>`});
      /* compressed stretches */
      s+=`<rect x="${f1(X(1830))}" y="40" width="${f1(X(1990)-X(1830))}" height="${AY-34}" style="fill:var(--field)"/>`;
      HI_LANES.forEach((n,i)=>{s+=`<line x1="146" x2="708" y1="${LY[i]}" y2="${LY[i]}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:2 4"/>`});
      s+=`<text x="${f1((X(1830)+X(1990))/2)}" y="${AY-6}" class="t-xs t-mid">compressed</text>`;
      s+=`<line x1="146" x2="708" y1="${AY}" y2="${AY}" class="axis" style="stroke:var(--muted)"/>`;
      [1832,1900,1950,1970,1990,2000,2010,2020].forEach(y=>{s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${AY}" y2="${AY+5}" class="axis" style="stroke:var(--muted)"/><text x="${f1(X(y))}" y="${AY+17}" class="t-xs t-mid" style="font-size:10.5px">${y}</text>`});
      /* events */
      HI_EV.forEach((e,i)=>{const x=X(e.y),y=LY[e.l]+(off[i]%2?-1:1)*(off[i]?9:0);s+=mark(e,x,y,e.y<=Y+.05,i===ci)});
      /* marker */
      const mx=X(Y);
      s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="30" y2="${AY+3}" style="stroke:var(--ink);stroke-width:1.5"/>`;
      s+=`<rect x="${f1(clamp(mx-24,146,662))}" y="14" width="48" height="18" rx="9" style="fill:var(--ink)"/><text x="${f1(clamp(mx-24,146,662)+24)}" y="27" class="t-xs t-mid" style="fill:var(--bg);font-weight:700;font-size:11px">${Math.floor(Y)}</text>`;
      if(E){const x=X(E.y),y=LY[E.l]-15;s+=kitLabel(clamp(x,190,670),y,hiEsc(E.s),{a:'m'})}
      /* card */
      s+=`<rect x="8" y="214" width="704" height="178" rx="14" style="fill:var(--panel-2)"/>`;
      if(E){
        s+=`<text x="28" y="262" style="font:700 36px var(--display);fill:${kcol(E.k)==='var(--brand)'?'var(--brand)':'var(--ink)'}">${Math.floor(E.y)}</text>`;
        s+=`<text x="28" y="284" class="t-xs" style="font-size:10.5px;letter-spacing:.08em">${HI_LANES_N[E.l].toUpperCase()}</text>`;
        s+=`<text x="150" y="250" class="t-big" style="font-size:19px">${hiEsc(E.ti)}</text>`;
        hiWrap(E.sh,58).forEach((l,j)=>{s+=`<text x="150" y="${276+j*19}" class="t-lbl" style="font-weight:500;font-size:14px">${hiEsc(l)}</text>`});
      }
      /* counters */
      const cx=548;
      s+=`<line x1="${cx-14}" x2="${cx-14}" y1="232" y2="374" style="stroke:var(--line)"/>`;
      s+=`<text x="${cx}" y="262" style="font:700 34px var(--display);fill:var(--tx)">${appr}</text><text x="${cx+44}" y="248" class="t-xs" style="font-size:10.5px">US approvals</text><text x="${cx+44}" y="261" class="t-xs" style="font-size:10.5px">named here</text>`;
      s+=`<text x="${cx}" y="318" style="font:700 34px var(--display);fill:var(--bad)">${wd}</text><text x="${cx+44}" y="304" class="t-xs" style="font-size:10.5px">withdrawn</text><text x="${cx+44}" y="317" class="t-xs" style="font-size:10.5px">(US or Europe)</text>`;
      /* key */
      [['m','milestone'],['a','approval'],['w','withdrawal'],['r','safety review']].forEach((q,j)=>{const x=28+j*120;s+=mark({k:q[0]},x,366,true,false)+`<text x="${x+12}" y="370" class="t-xs" style="font-size:10.5px">${q[1]}</text>`});
    }else{
      const YY=y=>64+330*hiTOf(y),LX=[138,238,338],AX=78;
      s+=`<rect x="${AX}" y="${YY(1830)}" width="318" height="${f1(YY(1990)-YY(1830))}" style="fill:var(--field)"/><text x="392" y="${f1(YY(1990)-6)}" class="t-xs t-end">compressed</text>`;
      HI_LANES_N.forEach((n,i)=>{s+=`<text x="${LX[i]}" y="44" class="t-lbl t-mid" style="font-size:12px">${n}</text><line x1="${LX[i]}" x2="${LX[i]}" y1="54" y2="398" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:2 4"/>`});
      s+=`<line x1="${AX}" x2="${AX}" y1="56" y2="398" class="axis" style="stroke:var(--muted)"/>`;
      [1832,1950,1970,1990,2000,2010,2020].forEach(y=>{s+=`<line x1="${AX-5}" x2="${AX}" y1="${f1(YY(y))}" y2="${f1(YY(y))}" class="axis" style="stroke:var(--muted)"/><text x="${AX-8}" y="${f1(YY(y)+4)}" class="t-xs t-end" style="font-size:11px">${y}</text>`});
      HI_EV.forEach((e,i)=>{const y=YY(e.y),x=LX[e.l]+(off[i]%2?-1:1)*(off[i]?11:0);s+=mark(e,x,y,e.y<=Y+.05,i===ci)});
      const my=YY(Y);
      s+=`<line x1="${AX-4}" x2="396" y1="${f1(my)}" y2="${f1(my)}" style="stroke:var(--ink);stroke-width:1.5"/>`;
      s+=`<rect x="352" y="${f1(my-10)}" width="44" height="20" rx="10" style="fill:var(--ink)"/><text x="374" y="${f1(my+4)}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700;font-size:11px">${Math.floor(Y)}</text>`;
      /* card */
      s+=`<rect x="6" y="412" width="388" height="230" rx="14" style="fill:var(--panel-2)"/>`;
      if(E){
        s+=`<text x="22" y="452" style="font:700 32px var(--display);fill:var(--ink)">${Math.floor(E.y)}</text><text x="110" y="448" class="t-xs" style="font-size:11px;letter-spacing:.08em">${HI_LANES[E.l].toUpperCase()}</text>`;
        const tl=hiWrap(E.ti,32);tl.forEach((l,j)=>{s+=`<text x="22" y="${482+j*22}" class="t-big" style="font-size:18px">${hiEsc(l)}</text>`});
        hiWrap(E.sh,44).forEach((l,j)=>{s+=`<text x="22" y="${490+tl.length*22+j*19}" class="t-lbl" style="font-weight:500;font-size:14px">${hiEsc(l)}</text>`});
      }
      s+=`<text x="22" y="622" style="font:700 26px var(--display);fill:var(--tx)">${appr}</text><text x="${appr>9?58:46}" y="621" class="t-xs" style="font-size:11px">US approvals</text>`;
      s+=`<text x="210" y="622" style="font:700 26px var(--display);fill:var(--bad)">${wd}</text><text x="234" y="621" class="t-xs" style="font-size:11px">withdrawn (US/EU)</text>`;
    }
    svg.innerHTML=s;
    setSt(p);$('#hiNote').innerHTML=noteHTML(P);
    read.innerHTML=E?`<b>${Math.floor(E.y)} · ${E.ti}.</b> ${E.tx}`:'';
  }
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'%t:player.replay%','history');
  const setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the withdrawn-drugs strip ---------- */
  const wsv=$('#hiWdSvg'),wb=$('#hiWdBtns'),wn=$('#hiWdNote');let wi=0,stopW=null;
  const STG=['Used','Signal','Evidence','Action'];
  wb.innerHTML=HI_WD.map((d,i)=>`<button class="btn" data-wd="${i}" aria-pressed="${i===0}">${d.n}</button>`).join('');
  function drawW(pr){
    const N=vb(wsv,'720 230','400 470'),D=HI_WD[wi];
    let s='';
    const box=N?(i=>({x:14,y:10+i*114,w:372,h:96})):(i=>({x:8+i*178,y:24,w:164,h:190}));
    STG.forEach((g,i)=>{const B=box(i),a=ease(clamp(pr*4.4-i*1.05)),last=i===3;
      const col=last?(D.id==='lor'||D.id==='amp'?'var(--warn)':'var(--risk)'):i===0?'var(--rx-drug)':'var(--muted)';
      s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:${a>0?col:'var(--line)'};stroke-width:${a>.98?2:1.2}"/>`;
      s+=`<text x="${B.x+14}" y="${B.y+22}" class="t-xs" style="font-size:11px;letter-spacing:.1em;font-weight:700;fill:${a>0?col:'var(--muted)'}">${String(i+1).padStart(2,'0')} ${g.toUpperCase()}</text>`;
      const lines=hiWrap(D.st[i],N?48:22);
      lines.forEach((l,j)=>{s+=`<text x="${B.x+14}" y="${B.y+(N?44:46)+j*(N?18:19)}" class="t-lbl" style="font-weight:500;font-size:13px;opacity:${f1(a)}">${hiEsc(l)}</text>`});
      if(i<3){
        if(N){const y=B.y+B.h+2;s+=`<path d="M200 ${y}v12" style="stroke:var(--muted);stroke-width:2" marker-end="url(#hiWdArr)"/>`}
        else{const x=B.x+B.w+1;s+=`<path d="M${x} ${B.y+B.h/2}h12" style="stroke:var(--muted);stroke-width:2" marker-end="url(#hiWdArr)"/>`}
      }
    });
    /* the travelling token */
    const q=clamp(pr*1.05),pos=N?[200,lerp(box(0).y+8,box(3).y+8,q)]:[lerp(box(0).x+150,box(3).x+150,q),box(0).y+12];
    if(pr<1)s+=`<circle cx="${f1(pos[0])}" cy="${f1(pos[1])}" r="5" style="fill:var(--ink)"/>`;
    wsv.innerHTML=`<defs>${marker('hiWdArr','var(--muted)')}</defs>`+s;
  }
  function noteW(){const D=HI_WD[wi];wn.innerHTML=`<div class="kicker">Withdrawn and troubled medicines</div><h4>${D.ti}</h4><p>${D.tx}</p><div class="hook"><b>The lesson</b>${D.les}</div>`}
  function selW(i){wi=i;$$('[data-wd]',wb).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));noteW();if(stopW)stopW();stopW=animate(1800,drawW,()=>{stopW=null})}
  wb.addEventListener('click',e=>{const b=e.target.closest('[data-wd]');if(b)selW(+b.dataset.wd)});
  const prevH=redraws.history;redraws.history=()=>{prevH&&prevH();drawW(1)};
  onHide.history=(f=>()=>{f&&f();if(stopW)stopW()})(onHide.history);
  noteW();drawW(1);
};
