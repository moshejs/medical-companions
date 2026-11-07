/* =============== 6.1 History & people =============== */
/* A timeline scrubber from Bonet's "voluminous lungs" (1679) to GOLD 2023, on a compressed axis (1670–1850 in the
   first 18%, 1850–1940 squeezed). The card shows the last milestone the cursor has passed among the themes switched
   on, with a small moving picture; a chip row lights up the tools and ideas available by then. Theme toggles filter the
   dots, the jump chips and the table together. A second widget reads one breath as Hutchinson (1846) and as
   Tiffeneau (1947) would have. Every milestone is from research pass A; citations sit in note text, never in SVG text. */
const HI_TH={path:['Describing the lungs','var(--brand)'],meas:['Measuring breath','var(--dx)'],cause:['Causes','var(--fl)'],rx:['Treatment trials','var(--rx)'],def:['Names & guidelines','var(--rec)']};
/* y: year for placing; yl: label; th: theme; g: picture; e: short event for the SVG card; p: people; txt: note text */
const HI_MS=[
 {y:1679,yl:'1679',th:'path',g:'lung',e:'Bonet describes "voluminous lungs"',p:'Bonet',
  txt:'Early descriptions of emphysema include Bonet\'s "voluminous lungs" (1679) [[Petty2006]].'},
 {y:1769,yl:'1769',th:'path',g:'lung',e:'Morgagni reports 19 cases of "turgid" lungs',p:'Morgagni',
  txt:'Morgagni described 19 cases of "turgid" lungs in 1769 [[Petty2006]].'},
 {y:1789,yl:'1789',th:'path',g:'lung',e:'Baillie illustrates an emphysematous lung, thought to be Samuel Johnson\'s',p:'Baillie',
  txt:'Baillie illustrated an emphysematous lung in 1789; it is thought to have been Samuel Johnson\'s [[Petty2006]].'},
 {y:1814,yl:'1814',th:'path',g:'mucus',e:'Badham calls the chronic cough and mucus "catarrh"',p:'Badham',
  txt:'Badham used the word "catarrh" for the chronic cough and mucus hypersecretion of chronic bronchitis, and described bronchiolitis and chronic bronchitis as disabling disorders [[Petty2006]].'},
 {y:1819,yl:'1819',th:'path',g:'lung',e:'Laënnec describes over-inflated lungs that fail to empty',p:'Laënnec, inventor of the stethoscope',
  txt:'In his treatise on diseases of the chest, Laënnec described emphysematous lungs as hyperinflated, failing to collapse and not emptying well, often with mucus-filled bronchi: an early account of emphysema and chronic bronchitis together [[Petty2006]].'},
 {y:1846,yl:'1846',th:'meas',g:'vc',e:'Hutchinson\'s spirometer measures the "vital capacity"',p:'John Hutchinson, surgeon',
  txt:'John Hutchinson invented the spirometer and published his method in 1846, naming the volume exhaled from fully inflated lungs the "vital capacity", the capacity to live [[Hutchinson1846,Petty2002]]. It measured only that volume; adding airflow over time took about 100 more years [[Petty2006]].'},
 {y:1947,yl:'1947',th:'meas',g:'spiro',e:'Tiffeneau and Pinelli time the forced breath out: the first second',p:'Tiffeneau and Pinelli, Paris',
  txt:'In December 1947 Tiffeneau and Pinelli described the forced expiratory manoeuvre: the maximal volume exhaled in one second after a deep breath, which they called the CPUE [[Yernault1997]].'},
 {y:1950,yl:'1950–51',th:'meas',g:'spiro',e:'Gaensler\'s "air velocity index" and "timed vital capacity"',p:'Gaensler',
  txt:'In the US, Gaensler introduced the "air velocity index" (1950) and the "timed vital capacity" (1951), foundations of today\'s FEV1 and FEV1/FVC [[Gaensler1950,Yernault1997,Petty2006]].'},
 {y:1952,yl:'1952',th:'cause',g:'smog',e:'The London smog: weekly excess deaths peak at about 4,500',p:'',
  txt:'During the London smog of December 1952, weekly excess deaths in Greater London peaked at about 4,500. If later excess deaths were also due to pollution, the total would be about 12,000 rather than the 3,000–4,000 usually reported [[Bell2004]]. It became one of history\'s most important pollution episodes for science, public perception and regulation [[Bell2004]].'},
 {y:1954.1,yl:'1954',th:'meas',g:'spiro',e:'European experts rename the one-second volume "VEMS"',p:'',
  txt:'A group of European experts renamed the CPUE "VEMS" on 13 February 1954. The English term "forced expiratory volume" was adopted in 1957 [[Yernault1997]].'},
 {y:1954.6,yl:'1954',th:'cause',g:'cig',e:'Doll and Hill link doctors\' smoking to their deaths',p:'Doll and Hill',
  txt:'Doll and Hill\'s 1954 preliminary report linked doctors\' smoking habits to their mortality [[Doll1954]]. The British Doctors Study then ran from 1951 to 2001 in 34,439 men [[Doll2004]].'},
 {y:1957,yl:'1957',th:'rx',g:'surg',e:'Brantigan and Mueller introduce lung volume reduction surgery',p:'Brantigan and Mueller',
  txt:'Lung volume reduction surgery was introduced by Brantigan and Mueller in 1957 and revived in the 1990s [[Petty2006]].'},
 {y:1958,yl:'1958',th:'def',g:'doc',e:'The Aspen Emphysema Conferences begin',p:'',
  txt:'The Aspen Emphysema Conferences began in 1958 [[Petty2006]].'},
 {y:1959,yl:'1959',th:'def',g:'doc',e:'The Ciba Guest Symposium sets out terms and definitions',p:'Ciba Guest Symposium',
  txt:'The 1959 Ciba Guest Symposium report set out terminology, definitions and classification for chronic pulmonary emphysema and related conditions [[Ciba1959,Petty2006]].'},
 {y:1960,yl:'1960',th:'path',g:'mucus',e:'Reid proposes measuring the bronchial mucous gland layer',p:'Reid',
  txt:'Reid proposed measuring the bronchial mucous gland layer, later called the Reid index, as a diagnostic yardstick in chronic bronchitis [[Reid1960,Petty2006]].'},
 {y:1960.6,yl:'1960',th:'cause',g:'dna',e:'The "Dutch hypothesis": inherited bronchial hyperreactivity',p:'Orie',
  txt:'The "Dutch hypothesis" (Orie, 1960) emphasised inherited bronchial hyperreactivity; the "British hypothesis" emphasised repeated chest infections and air pollution [[Petty2006]].'},
 {y:1961.3,yl:'Early 1960s',th:'rx',g:'o2',e:'Oxygen thought harmful in COPD; inhaled isoproterenol arrives',p:'',
  txt:'In the early 1960s, oxygen was considered contraindicated in COPD and exercise was discouraged for fear of straining the right heart. Inhaled isoproterenol came into use [[Petty2006]].'},
 {y:1962,yl:'1962',th:'def',g:'doc',e:'The ATS defines chronic bronchitis clinically and emphysema anatomically',p:'ATS Committee on Diagnostic Standards',
  txt:'The ATS Committee on Diagnostic Standards defined chronic bronchitis clinically (chronic cough for at least three months in at least two years) and emphysema anatomically (enlarged airspaces with loss of alveolar walls), with no physiological criteria [[Petty2006]].'},
 {y:1963,yl:'1963',th:'cause',g:'dna',e:'Laurell and Eriksson describe alpha-1 antitrypsin deficiency',p:'Laurell and Eriksson, Sweden',
  txt:'Laurell and Eriksson described alpha-1 antitrypsin deficiency from the missing α1-globulin band on serum electrophoresis and linked it to emphysema [[Laurell1963,Perciaccante2018]].'},
 {y:1964,yl:'1964',th:'cause',g:'lung',e:'Gross makes emphysema in animals with papain',p:'Gross',
  txt:'Gross produced emphysema in animals by instilling papain, an accidental finding that, together with alpha-1 antitrypsin deficiency, founded the protease–antiprotease theory [[Petty2006]].'},
 {y:1965,yl:'1965',th:'def',g:'doc',e:'The MRC defines and classifies chronic bronchitis',p:'Medical Research Council',
  txt:'The UK Medical Research Council published a definition and classification of chronic bronchitis for clinical and epidemiological purposes [[MRC1965]].'},
 {y:1966,yl:'1966',th:'def',g:'doc',e:'Two types of airways obstruction, and the name "COPD"',p:'Burrows, Fletcher; Briscoe',
  txt:'At the 9th Aspen Emphysema Conference, Burrows and Fletcher presented the emphysematous and bronchial types of chronic airways obstruction seen in London and Chicago, published in 1966 [[Petty2006,Burrows1966]]. William Briscoe is believed to have first used the term COPD at that conference [[Petty2006]].'},
 {y:1977,yl:'1977',th:'cause',g:'fp',e:'Fletcher and Peto chart the natural history of airflow obstruction',p:'Fletcher and Peto',
  txt:'In London working men, FEV1 fell gradually over life, but most non-smokers and many smokers never developed significant obstruction. In susceptible smokers, stopping did not restore lost function but returned further loss to the normal rate [[Fletcher1977]].'},
 {y:1980,yl:'1980',th:'rx',g:'o2',e:'NOTT: continuous oxygen beats 12-hour nocturnal oxygen',p:'Nocturnal Oxygen Therapy Trial Group',
  txt:'In 203 people with low blood oxygen, mortality was 1.94 times higher with 12-hour nocturnal oxygen than with continuous oxygen (P = 0.01) [[NOTT1980]].'},
 {y:1981,yl:'1981',th:'rx',g:'o2',e:'MRC trial: oxygen for at least 15 hours a day',p:'MRC Working Party',
  txt:'In 87 people, 19 of 42 given oxygen for at least 15 hours a day died over 5 years, against 30 of 45 controls [[MRC1981]].'},
 {y:1983,yl:'1983',th:'cause',g:'mucus',e:'Obstruction, not mucus, predicts death from chronic lung disease',p:'Peto and colleagues',
  txt:'In 2,718 British men followed for 20–25 years, COPD death risk was strongly tied to initial airflow obstruction but not to mucus hypersecretion at similar obstruction [[Peto1983]].'},
 {y:2000,yl:'2000',th:'rx',g:'quit',e:'Lung Health Study: the decline halves after quitting',p:'Lung Health Study',
  txt:'In 3,926 smokers with mild to moderate obstruction, quitting improved FEV1 by an average of 47 mL in the first year; later decline in sustained quitters was half that of continuing smokers (31 vs 62 mL a year) [[Scanlon2000]].'},
 {y:2001,yl:'2001',th:'def',g:'gold',e:'The first GOLD global strategy',p:'NHLBI and WHO',
  txt:'The 2001 NHLBI/WHO GOLD workshop summary was the first GOLD global strategy for diagnosis, management and prevention of COPD, and offered a new severity classification [[Pauwels2001,Petty2006]].'},
 {y:2003,yl:'2003',th:'rx',g:'surg',e:'NETT: surgery helps a subgroup with upper-lobe emphysema',p:'',
  txt:'NETT (1,218 patients) found no overall survival benefit from lung volume reduction surgery, but lower mortality in upper-lobe emphysema with low exercise capacity (risk ratio 0.47) [[Fishman2003]].'},
 {y:2004,yl:'2004',th:'cause',g:'cig',e:'British doctors, 50 years on: stopping earlier gains more years',p:'Doll, Peto and colleagues',
  txt:'Men born 1900–1930 who kept smoking died about 10 years earlier than lifelong non-smokers; stopping at age 60, 50, 40 or 30 gained about 3, 6, 9 or 10 years [[Doll2004]].'},
 {y:2005,yl:'2005',th:'rx',g:'quit',e:'A quit-smoking programme lowers deaths over 14.5 years',p:'',
  txt:'All-cause mortality was lower in the smoking-cessation group than with usual care (8.83 vs 10.38 per 1,000 person-years) [[Anthonisen2005]].'},
 {y:2006,yl:'2006',th:'cause',g:'cig',e:'Copenhagen: at least 25% of continuous smokers develop COPD',p:'',
  txt:'Over 25 years, the absolute risk of COPD among continuous smokers was at least 25%, and 92% of COPD deaths occurred in people smoking at baseline [[Lokke2006]].'},
 {y:2015,yl:'2015',th:'cause',g:'fp',e:'Lange: two trajectories lead to COPD',p:'Lange and colleagues',
  txt:'About half of people with COPD started with normal FEV1 and declined fast; the other half started low and declined normally [[Lange2015]].'},
 {y:2016,yl:'2016',th:'rx',g:'o2',e:'LOTT: no benefit from oxygen in moderate desaturation',p:'',
  txt:'In 738 people with moderate desaturation, long-term oxygen made no difference to time to death or first hospitalisation (hazard ratio 0.94, 95% CI 0.79–1.12) [[Albert2016]].'},
 {y:2017,yl:'2017',th:'def',g:'gold',e:'GOLD separates spirometric grades from the ABCD groups',p:'',
  txt:'GOLD 2017 separated spirometric grading from the ABCD groups, now derived only from symptoms and exacerbation history [[Vogelmeier2017]].'},
 {y:2022,yl:'2022',th:'def',g:'doc',e:'The Lancet Commission proposes five types of COPD by cause',p:'',
  txt:'The Lancet Commission proposed five types: genetic, early-life, infection-related, smoking or vaping, and environmental (early evidence) [[Stolz2022]].'},
 {y:2023,yl:'2023',th:'def',g:'gold',e:'GOLD 2023: a new definition, etiotypes and the ABE tool',p:'',
  txt:'GOLD 2023 introduced a new definition and taxonomy, and merged the former C and D groups into a single E group, creating the ABE tool [[Agusti2023]].'}
];
const HI_POS=y=>y<1850?.004+(y-1670)/180*.176:y<1940?.18+(y-1850)/90*.06:y<1990?.24+(y-1940)/50*.54:.78+(y-1990)/35*.218;
const HI_YEAR=u=>u<.18?1670+(u-.004)/.176*180:u<.24?1850+(u-.18)/.06*90:u<.78?1940+(u-.24)/.54*50:1990+(u-.78)/.218*35;
const HI_ERAS=[
 {from:0,at:HI_POS(1679)+.001,k:'1679–1821',t:'Voluminous lungs',
  pt:'Doctors first saw COPD by looking at lungs after death: they were too big and full of air.',
  hook:'Laënnec described hyperinflated lungs that failed to collapse, often with mucus-filled bronchi [[Petty2006]].'},
 {from:HI_POS(1840),at:HI_POS(1846)+.001,k:'1846',t:'The spirometer',
  pt:'Hutchinson built a machine to measure how much air a person can breathe out.',
  hook:'Hutchinson (1846) named the "vital capacity", the capacity to live [[Hutchinson1846,Petty2002]].'},
 {from:HI_POS(1940),at:HI_POS(1947)+.001,k:'1947–1957',t:'One second',
  pt:'Timing the first second of a hard breath out showed how blocked the airways were.',
  hook:'Tiffeneau and Pinelli (1947) introduced the forced expiratory volume in one second [[Yernault1997]].'},
 {from:HI_POS(1957.6),at:HI_POS(1959)+.001,k:'1958–1962',t:'Naming the disease',
  pt:'Experts met to agree names and definitions for emphysema and chronic bronchitis.',
  hook:'ATS 1962: chronic bronchitis defined clinically, emphysema anatomically [[Petty2006]].'},
 {from:HI_POS(1962.5),at:HI_POS(1963)+.001,k:'1963–1983',t:'Causes and a first life-saving treatment',
  pt:'Scientists found an inherited cause, showed how smoking harms the lungs over time, and proved that home oxygen helps some people live longer.',
  hook:'NOTT 1980: mortality 1.94 times higher with nocturnal-only than continuous oxygen [[NOTT1980]].'},
 {from:HI_POS(1990),at:HI_POS(2001)+.001,k:'2000–2023',t:'GOLD',
  pt:'Since 2001 a global strategy, GOLD, has guided diagnosis and care, and it is updated as evidence grows.',
  hook:'GOLD 2023 merged groups C and D into E, creating the ABE tool [[Agusti2023]].'}
];
/* tools and ideas lit up by year: [label, year] (years from the milestones above) */
const HI_TOOLS=[['stethoscope',1819],['spirometer',1846],['one-second volume',1947],['smoking link',1954],['alpha-1',1963],['oxygen trials',1980],['GOLD',2001]];
const HI_TXT={people:'People: ',tools:'By then:',theme:k=>HI_TH[k][0].toUpperCase(),gold:'GOLD',vt:(yl,e)=>`${yl}: ${e}`};
const HI_VC={
 x:'seconds',y:'volume breathed out',vc:'vital capacity',vcOnly:'only the total is recorded',one:'1 s',fev:'in the first second',
 healthy:'healthy',obs:'obstructed',sec:v=>`${v.toFixed(1)} s`,
 note1846:{k:'1846 · Hutchinson',t:'One number: how much',txt:'Hutchinson\'s spirometer recorded the volume exhaled from fully inflated lungs, the vital capacity [[Hutchinson1846,Petty2002]]. It measured only that volume, not how fast the air came out [[Petty2006]].',pt:'The first breathing machine measured how much air came out, but not how quickly.',hook:'Vital capacity = the volume exhaled from fully inflated lungs [[Hutchinson1846]].'},
 note1947:{k:'1947 · Tiffeneau and Pinelli',t:'Adding time: the first second',txt:'Tiffeneau and Pinelli timed the forced breath and took the maximal volume exhaled in one second (the CPUE, later VEMS, then FEV) [[Yernault1997]]. Gaensler\'s timed vital capacity followed in 1951 [[Gaensler1950,Yernault1997]]. Today GOLD confirms COPD with a post-bronchodilator FEV1/FVC below 0.7 [[Agusti2023]].',pt:'Timing the first second shows narrowed airways: the air comes out more slowly.',hook:'FEV1/FVC below 0.7 after a bronchodilator confirms persistent airflow obstruction [[Agusti2023]].'}
};
/* small pictures for the card */
function hiGlyph(g,x,y,ph,sc){let s='';
  if(g==='lung'||g==='surg'){s+=lungs(x,y-34*sc,68*sc,{hyper:g==='lung'?.8:.5,bullae:g==='lung'?.7:.4,breathe:(Math.sin(ph*4)+1)/2});
    if(g==='surg')s+=`<path d="M${f1(x-30*sc)} ${f1(y-14*sc)}q${f1(15*sc)} ${f1(-8*sc)} ${f1(30*sc)} 0M${f1(x)} ${f1(y-14*sc)}q${f1(15*sc)} ${f1(-8*sc)} ${f1(30*sc)} 0" style="fill:none;stroke:var(--rx);stroke-width:2.4;stroke-dasharray:4 3"/>`}
  else if(g==='mucus'){s+=airway(x,y,26*sc,{wall:.7,mucus:.4+.2*Math.sin(ph*3),inflam:.6,ph,seed:9}).svg}
  else if(g==='vc'||g==='spiro'||g==='fp'){const w=74*sc,h=56*sc,x0=x-w/2,y0=y-h/2,u=(ph*.25)%1;
    s+=`<path d="M${f1(x0)} ${f1(y0)}V${f1(y0+h)}H${f1(x0+w)}" class="axis" style="fill:none"/>`;
    if(g==='fp'){s+=`<path d="${pathFn(v=>1-.25*v,x0,x0+w,y0+h,y0,30)}" style="fill:none;stroke:var(--good);stroke-width:2;stroke-dasharray:4 3"/><path d="${pathFn(v=>1-.75*v*Math.min(1,u*1.6),x0,x0+w,y0+h,y0,30)}" style="fill:none;stroke:var(--fl);stroke-width:2.4"/>`}
    else{const f=spiroVT(.8,1);s+=`<path d="${pathFn(v=>f(v*u),x0,x0+w*u+.01,y0+h,y0,40)}" style="fill:none;stroke:var(--dx);stroke-width:2.4"/>`;
      if(g==='spiro'){const x1=x0+w/6;s+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${f1(y0)}" y2="${f1(y0+h)}" style="stroke:var(--ink);stroke-dasharray:2 2"/>`}
      else s+=`<rect x="${f1(x0+w+4)}" y="${f1(y0+h*(1-f(u)))}" width="${f1(8*sc)}" height="${f1(h*f(u))}" style="fill:var(--dx);opacity:.6"/>`}}
  else if(g==='smog'){s+=smoke(x-36*sc,y-40*sc,72*sc,60*sc,{amt:1,col:'var(--tar)',ph,seed:14})+dots(x-36*sc,y-30*sc,72*sc,50*sc,18,{col:'var(--smoke)',r:2,ph:ph*2,seed:3})}
  else if(g==='cig'){s+=cig(x-36*sc,y+10*sc,72*sc,{burn:(ph*.1)%.8,smoke:1,ph})}
  else if(g==='quit'){s+=cig(x-36*sc,y+10*sc,72*sc,{burn:.2})+`<line x1="${f1(x-40*sc)}" y1="${f1(y-14*sc)}" x2="${f1(x+40*sc)}" y2="${f1(y+30*sc)}" style="stroke:var(--rec);stroke-width:4;stroke-linecap:round"/>`}
  else if(g==='dna'){const w=70*sc;for(let i=0;i<=8;i++){const u=i/8,xx=x-w/2+w*u,a=Math.sin(u*Math.PI*2+ph)*14*sc;s+=`<line x1="${f1(xx)}" y1="${f1(y+a)}" x2="${f1(xx)}" y2="${f1(y-a)}" style="stroke:var(--line);stroke-width:2"/>`}
    s+=`<path d="${pathFn(u=>.5+Math.sin(u*Math.PI*2+ph)*.5,x-w/2,x+w/2,y-14*sc,y+14*sc,30)}" style="fill:none;stroke:var(--fl);stroke-width:3"/><path d="${pathFn(u=>.5-Math.sin(u*Math.PI*2+ph)*.5,x-w/2,x+w/2,y-14*sc,y+14*sc,30)}" style="fill:none;stroke:var(--rx);stroke-width:3"/>`}
  else if(g==='o2'){s+=person(x-8*sc,y+34*sc,70*sc,{cannula:true,breath:(Math.sin(ph*3)+1)/2})+`<rect x="${f1(x+18*sc)}" y="${f1(y-6*sc)}" width="${f1(16*sc)}" height="${f1(40*sc)}" rx="${f1(6*sc)}" style="fill:var(--o2-soft);stroke:var(--o2);stroke-width:1.4"/>`}
  else{/* doc or gold: a page */const w=46*sc,h=60*sc;s+=`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="4" style="fill:var(--panel);stroke:var(--rec);stroke-width:1.6"/>`;
    for(let i=0;i<5;i++)s+=`<line x1="${f1(x-w/2+7)}" x2="${f1(x+w/2-7-(i%2)*8)}" y1="${f1(y-h/2+12+i*9*sc)}" y2="${f1(y-h/2+12+i*9*sc)}" style="stroke:var(--line);stroke-width:2"/>`;
    if(g==='gold')s+=chip(x,y+h/2+4,HI_TXT.gold,{anchor:'middle',col:'var(--gold)',fill:'var(--gold-soft)',size:11})}
  return s}
inits.history=()=>{
  HI_MS.forEach((m,i)=>{m.i=i;m.u=HI_POS(m.y)});
  const on={path:true,meas:true,cause:true,rx:true,def:true};
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),chips=$('#hiYears'),tb=$('#hiTbl');
  const vis=()=>HI_MS.filter(m=>on[m.th]);
  const curOf=t=>{const V=vis();let c=V[0];V.forEach(m=>{if(m.u<=t+.0006)c=m});return c};
  let setA=()=>{},lastId=-1;
  function draw(t){
    const N=vb(svg,'720 420','400 470'),p=phaseOf(HI_ERAS,t),E=HI_ERAS[p],M=curOf(t),yr=HI_YEAR(t),col=HI_TH[M.th][1];
    const ax=N?16:34,aw=N?368:652,ay=N?96:104,X=u=>ax+aw*u;
    let s=`<text x="${ax}" y="${N?26:30}" class="t-big">${E.t}</text><text x="${ax}" y="${N?44:48}" class="t-sm">${E.k}</text>`;
    HI_ERAS.forEach((e,i)=>{const a=X(i?e.from:0),b=X(i<HI_ERAS.length-1?HI_ERAS[i+1].from:1);s+=`<rect x="${f1(a+1)}" y="${ay-22}" width="${f1(Math.max(1,b-a-2))}" height="5" rx="2.5" style="fill:${i===p?'var(--brand)':'var(--panel-2)'}"/>`});
    s+=`<line x1="${ax}" x2="${ax+aw}" y1="${ay}" y2="${ay}" class="axis" style="stroke-width:2"/>`;
    [HI_POS(1850),HI_POS(1940)].forEach(u=>{const bx=X(u);s+=`<path d="M${f1(bx-5)} ${ay+6}l5 -12M${f1(bx+1)} ${ay+6}l5 -12" style="stroke:var(--muted);stroke-width:1.4"/>`});
    (N?[1700,1800,1950,1970,1990,2020]:[1700,1750,1800,1950,1960,1970,1980,1990,2000,2010,2020]).forEach(y=>{const xx=X(HI_POS(y));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ay}" y2="${ay+5}" class="axis"/><text x="${f1(xx)}" y="${ay+18}" class="t-xs t-mid">${y}</text>`});
    HI_MS.forEach(m=>{const vv=on[m.th],cur=m===M,xx=X(m.u),r=cur?7:vv?4.2:2.4;
      s+=`<circle cx="${f1(xx)}" cy="${ay}" r="${r}" style="fill:${vv?HI_TH[m.th][1]:'var(--line)'};stroke:var(--panel);stroke-width:1.5;opacity:${vv?(m.u<=t+.0006?1:.55):.6}"/>`;
      if(cur)s+=`<circle cx="${f1(xx)}" cy="${ay}" r="11" style="fill:none;stroke:${col};stroke-width:1.6"/>`});
    const cx=X(t);s+=`<path d="M${f1(cx)} ${ay-30}L${f1(cx-5)} ${ay-38}L${f1(cx+5)} ${ay-38}Z" style="fill:var(--ink)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="${ay-30}" y2="${ay+26}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 2"/>`;
    /* the card */
    const age=clamp((t-M.u)/.012),slide=M.u<=t+.0006?ease(Math.min(1,.35+age)):1;
    const cy0=N?ay+44:ay+50,ch=N?236:176,mcx=clamp(X(M.u),ax+20,ax+aw-20);
    s+=`<path d="M${f1(mcx-8)} ${cy0}L${f1(mcx)} ${cy0-12}L${f1(mcx+8)} ${cy0}Z" style="fill:var(--panel-2)"/><rect x="${ax}" y="${cy0}" width="${aw}" height="${ch}" rx="12" style="fill:var(--panel-2)"/><rect x="${ax}" y="${cy0}" width="6" height="${ch}" rx="3" style="fill:${col}"/>`;
    s+=`<g style="opacity:${f1(slide)}" transform="translate(${f1((1-slide)*14)} 0)">`;
    s+=`<text x="${ax+22}" y="${cy0+42}" class="t-big" style="font-size:34px;fill:${col}">${M.yl}</text>`;
    s+=`<text x="${ax+22}" y="${cy0+62}" class="t-xs" style="letter-spacing:.1em">${HI_TXT.theme(M.th)}</text>`;
    const ev=wrapT(ax+22,cy0+(N?132:88),M.e,N?34:50,{cls:'t-lbl',lh:19,style:'font-size:15px'});s+=ev.svg;
    if(M.p){const pw=wrapT(ax+22,cy0+(N?132:88)+ev.h+6,HI_TXT.people+M.p,N?46:70,{cls:'t-sm',lh:14,style:'fill:var(--ink)'});s+=pw.svg}
    s+=`</g>`;
    {const gx=N?ax+aw-66:ax+aw-90,gy=N?cy0+62:cy0+86;s+=hiGlyph(M.g,gx,gy,t*40,N?1:1.3)}
    /* tools and ideas available by this year */
    const ty=cy0+ch+(N?30:32);let tx=ax+(N?0:70),row=0;
    s+=`<text x="${ax}" y="${N?ty-14:ty+4}" class="t-xs" style="fill:var(--ink);font-weight:600">${HI_TXT.tools}</text>`;
    HI_TOOLS.forEach(([lb,y])=>{const w=lb.length*11*.58+16,lit=yr>=y-.01;if(tx+w>ax+aw){tx=ax+(N?0:70);row++}
      s+=`<g style="opacity:${lit?1:.35}">${chip(tx,ty+row*28,lb,{size:11,col:lit?'var(--brand)':'var(--line)',fill:lit?'var(--brand-soft)':'var(--panel)'})}</g>`;tx+=w+6});
    svg.innerHTML=s;
    note.innerHTML=noteHTML({k:E.k+' · '+M.yl,t:M.e,txt:M.txt+(M.p?` <b>${HI_TXT.people}</b>${M.p}.`:''),pt:E.pt,hook:E.hook});
    setA(p);
    if(M.i!==lastId){lastId=M.i;$$('[data-hi]',chips).forEach(b=>b.setAttribute('aria-current',+b.dataset.hi===M.i?'true':'false'))}
    rg.setAttribute('aria-valuetext',HI_TXT.vt(M.yl,M.e));
  }
  function lists(){
    chips.innerHTML=vis().map(m=>`<button class="tag" data-hi="${m.i}" aria-current="false">${m.yl} · ${m.e}</button>`).join('');
    tb.innerHTML=HI_MS.map(m=>`<tr${on[m.th]?'':' hidden'}><td class="hiy">${m.yl}</td><td>${m.txt}</td><td>${m.p||'–'}</td><td><span class="hith" style="color:${HI_TH[m.th][1]}">${HI_TH[m.th][0]}</span></td></tr>`).join('');
    lastId=-1}
  const stop=playWire(rg,$('#hiPlay'),draw,45000,'%t:player.replay%','history');
  setA=stepWire($('#hiSteps'),HI_ERAS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hi]');if(!b)return;stop();const m=HI_MS[+b.dataset.hi];rg.value=Math.min(1,m.u+.0008);draw(+rg.value)});
  $('#hiFilt').addEventListener('click',e=>{const b=e.target.closest('[data-th]');if(!b)return;on[b.dataset.th]=!on[b.dataset.th];
    if(!Object.values(on).some(Boolean))Object.keys(on).forEach(k=>on[k]=true);
    $$('#hiFilt [data-th]').forEach(x=>x.setAttribute('aria-pressed',on[x.dataset.th]));lists();draw(+rg.value)});
  lists();draw(+rg.value);

  /* ---- 1846 vs 1947: reading one breath ---- */
  const vs=$('#hiVc'),vr=$('#hiVcT');let vm='1846',obs=false;
  function drawVc(){
    const sec=+vr.value,u=sec/6,N=vb(vs,'720 320','400 380');
    const L=N?{gx:40,gy:40,gw:300,gh:260,bx:356}:{gx:70,gy:34,gw:520,gh:230,bx:620};
    const fh=spiroVT(.8,1),fo=spiroVT(.5,1),ho=.85,X=v=>L.gx+L.gw*v,Y=v=>L.gy+L.gh*(1-v);
    let s=axes(L.gx,L.gy,L.gw,L.gh,{xt:[[0,'0'],[1/6,'1'],[2/6,'2'],[3/6,'3'],[4/6,'4'],[5/6,'5'],[1,'6']],yt:[],grid:false,xl:HI_VC.x});
    s+=`<text x="${L.gx}" y="${L.gy-12}" class="t-xs">${HI_VC.y}</text>`;
    const curves=[ [fh,1,'var(--dx)',HI_VC.healthy]];if(obs)curves.push([fo,ho,'var(--fl)',HI_VC.obs]);
    curves.forEach(([f,k,c,lb],j)=>{const vEnd=f(u)*k;
      if(vm==='1846'){
        s+=`<path d="${pathFn(v=>f(v*u)*k,L.gx,L.gx+L.gw*u+.01,L.gy+L.gh,L.gy,80)}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:4 4"/>`;
        const bw=N?16:24,bx=L.bx+j*(bw+10);
        s+=`<rect x="${bx}" y="${f1(Y(vEnd))}" width="${bw}" height="${f1(L.gh*vEnd)}" rx="3" style="fill:${c}"/>`;
        if(u>=.99)s+=`<line x1="${L.gx}" x2="${bx}" y1="${f1(Y(vEnd))}" y2="${f1(Y(vEnd))}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 3"/>`;
      }else{
        s+=`<path d="${pathFn(v=>f(v*u)*k,L.gx,L.gx+L.gw*u+.01,L.gy+L.gh,L.gy,80)}" style="fill:none;stroke:${c};stroke-width:3"/>`;
        if(u>=1/6){const v1=f(1/6)*k;s+=`<circle cx="${f1(X(1/6))}" cy="${f1(Y(v1))}" r="5" style="fill:${c}"/><line x1="${L.gx}" x2="${f1(X(1/6))}" y1="${f1(Y(v1))}" y2="${f1(Y(v1))}" style="stroke:${c};stroke-width:1;stroke-dasharray:2 3"/>`}
      }});
    if(vm==='1947'){const x1=X(1/6);s+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${L.gy}" y2="${L.gy+L.gh}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/><text x="${f1(x1+6)}" y="${L.gy+L.gh-8}" class="t-xs" style="fill:var(--ink)">${HI_VC.fev}</text>`}
    else s+=(N?`<text x="398" y="${L.gy-12}" class="t-xs t-end">${HI_VC.vc}</text>`:`<text x="${L.bx}" y="${L.gy+L.gh+30}" class="t-xs">${HI_VC.vc}</text>`)+`<text x="${L.gx+L.gw*.5}" y="${L.gy+20}" class="t-xs t-mid">${HI_VC.vcOnly}</text>`;
    /* legend */
    let lx=N?L.gx:L.gx+L.gw*.55;const ly=N?L.gy+L.gh+50:L.gy+L.gh+48;
    curves.forEach(([,,c,lb],j)=>{s+=`<rect x="${f1(lx)}" y="${ly-8}" width="14" height="8" rx="2" style="fill:${c}"/><text x="${f1(lx+20)}" y="${ly}" class="t-xs">${lb}</text>`;lx+=100});
    vs.innerHTML=s;$('#hiVcV').textContent=HI_VC.sec(sec);vr.setAttribute('aria-valuetext',HI_VC.sec(sec));
    $('#hiVcNote').innerHTML=noteHTML(vm==='1846'?HI_VC.note1846:HI_VC.note1947);
  }
  vr.addEventListener('input',drawVc);
  $('#hiVcMode').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.vc){vm=b.dataset.vc;$$('#hiVcMode [data-vc]').forEach(x=>x.setAttribute('aria-pressed',x===b))}
    else{obs=!obs;b.setAttribute('aria-pressed',obs)}
    drawVc()});
  drawVc();
  const prev=redraws.history;redraws.history=()=>{prev&&prev();drawVc()};
};
