/* =============== 1.1 What a stroke is =============== */
/* Main scrubber: healthy, clot, tissue, intracerebral bleed, subarachnoid bleed, the three-way split, with the GBD 2021 share
   bar filling beneath. Then: shares by population, the burden explorer, the lifetime-risk grid, clock against tissue definitions,
   and outcomes over time. Every figure is from research pass A; drawings are schematic. */
const WH_STEPS=[
 {from:0,at:.06,k:'Step 1 · healthy',t:'Blood reaches the brain',sv:'Blood flows through the artery',br:'The brain, fed by its arteries',
  txt:`Arteries carry blood to the brain. In 1971 the WHO described stroke as "A sudden onset of disturbance of focal brain function due to the blockage or rupture of blood vessels" [[Engelhardt2017]]. Blockage or rupture: that is the first split to learn. Stroke broadly includes ischaemic stroke, intracerebral haemorrhage and subarachnoid haemorrhage [[Sacco2013]].`,
  pt:`A stroke happens when part of the brain loses its blood supply, or when a blood vessel in or around the brain bleeds. Brain cells then get hurt or die [[Sacco2013]].`},
 {from:.14,at:.24,k:'Step 2 · blocked',t:'A clot blocks an artery',sv:'A clot closes the artery',br:'Flow stops beyond the clot',
  txt:`Ischaemic stroke is the commonest type: 65.3% of incident strokes worldwide in 2021 (95% UI 62.4-67.7), or 7,804,000 strokes [[Feigin2024,Feigin2025]]. Its share is higher in high-income countries, at 74.9% [[Feigin2024,Feigin2025]].`,
  pt:`Most strokes, about 2 in 3, come from a blocked artery [[Feigin2024]].`},
 {from:.3,at:.38,k:'Step 3 · tissue',t:'Tissue dies from the core outward',sv:'No blood passes the clot',br:'Core and tissue still at risk',
  txt:`CNS infarction is brain, spinal cord or retinal cell death attributable to ischaemia. Ischaemic stroke is CNS infarction with overt symptoms; silent infarction causes no known symptoms [[Sacco2013]]. The lower the flow, the shorter the time for useful reperfusion, so infarction spreads from the core outward [[Heiss2011]]. A typical large vessel stroke loses 1.9 million neurons each minute [[Saver2006]]. Module 1.3 shows this in detail.`,
  pt:`The centre of the injured area dies first. The area around it can still be saved if blood comes back in time [[Heiss2011]].`,
  hook:`AHA/ASA 2013: imaging or pathology evidence of infarction counts, even if symptoms are brief [[Sacco2013]].`},
 {from:.46,at:.55,k:'Step 4 · burst',t:'A vessel bursts inside the brain',sv:'The artery wall tears',br:'Blood collects in brain tissue',
  txt:`Intracerebral haemorrhage (ICH) is "a focal collection of blood within the brain parenchyma or ventricular system that is not caused by trauma" [[Engelhardt2017]]. It makes up 28.8% of incident strokes worldwide (28.3-28.8), or 3,444,000 strokes [[Feigin2024,Feigin2025]]. Its share is highest in low-income countries, at 36.9% [[Feigin2024]].`,
  pt:`Roughly 1 in 3 strokes are bleeds, and most of those are bleeds inside the brain [[Feigin2024]].`,
  hook:`ICH survival: 46% at 1 year, 29% at 5 years [[Poon2014]].`},
 {from:.63,at:.72,k:'Step 5 · burst',t:'An aneurysm bursts beside the brain',sv:'A bulge on an artery bursts',br:'Blood spreads over the surface',
  txt:`Subarachnoid haemorrhage (SAH) is bleeding into the subarachnoid space, not caused by trauma, with neurological dysfunction and/or headache [[Engelhardt2017]]. It makes up 5.8% of incident strokes worldwide (5.7-6.0), or 697,000 strokes [[Feigin2024,Feigin2025]]. People aged 15-49 account for over 34% of SAH [[Feigin2025]].`,
  pt:`This bleed is on the surface of the brain. It is the least common type, and it often affects younger people than other strokes do [[Feigin2025]].`,
  hook:`SAH is the type where women are not in the minority: about 51% of incident SAH [[Feigin2025,Etminan2019]].`},
 {from:.8,at:.92,k:'Step 6 · the split',t:'Three kinds, one word',sv:'',br:'',
  txt:`GBD 2021 gives 11.9 million incident strokes in 2021: about 65% ischaemic, 29% ICH and 6% SAH [[Feigin2024]]. The rates per 100,000 show why the split matters: age-standardised ICH incidence is 40.8 and its death rate 39.1, while ischaemic stroke has 92.4 and 44.2 [[Feigin2024]]. Fewer than half as many bleeds, nearly as many deaths.`,
  pt:`Most strokes, about 2 in 3, come from a blocked artery. Roughly 1 in 3 are bleeds [[Feigin2024]].`,
  hook:`Global shares: about 65% ischaemic, 29% ICH, 6% SAH [[Feigin2024]].`}];
const WH_TYPES=[{k:'Ischaemic',sh:65.3,n:'7,804,000',col:'var(--brand)',lbl:'Ischaemic'},{k:'Intracerebral haemorrhage',sh:28.8,n:'3,444,000',col:'var(--accent)',lbl:'ICH'},{k:'Subarachnoid haemorrhage',sh:5.8,n:'697,000',col:'var(--dx)',lbl:'SAH'}];
/* population shares: ischaemic, ICH, SAH */
const WH_SHARES=[
 {id:'g',b:'World, GBD 2021',v:[65.3,28.8,5.8],cap:`<b>World, GBD 2021.</b> Ischaemic 65.3% (62.4-67.7), ICH 28.8% (28.3-28.8), SAH 5.8% (5.7-6.0) [[Feigin2024]].`},
 {id:'h',b:'High-income',v:[74.9,17.8,7.3],cap:`<b>High-income countries.</b> Ischaemic 74.9% (72.3-84.1), ICH 17.8% (17.3-17.9), SAH 7.3% (7.2-8.3) [[Feigin2024,Feigin2025]].`},
 {id:'l',b:'Low- and middle-income',v:[63.4,31.1,5.5],cap:`<b>All low-income and middle-income countries.</b> Ischaemic 63.4% (53.6-73.7), ICH 31.1% (30.2-31.3), SAH 5.5% (5.4-5.7) [[Feigin2024,Feigin2025]]. In low-income countries alone the ICH share reaches 36.9% [[Feigin2024]].`},
 {id:'o',b:'World, GBD 2019',v:[62.4,27.9,9.7],cap:`<b>The earlier round, GBD 2019.</b> Ischaemic 62.4%, ICH 27.9%, SAH 9.7% [[Feigin2021]]. The SAH share fell by about 40% between two modelling rounds, so these look like model revisions rather than a real change. This pass calculated the 40%.`},
 {id:'u',b:'US, AHA',v:[87,10,3],cap:`<b>United States, as reported by the AHA.</b> 87% ischaemic, 10% ICH, 3% SAH. These rest on Greater Cincinnati 1999 data in an unpublished NHLBI tabulation, so they are old and from one region [[Martin2025HDSS]].`}];
/* the burden explorer's measures */
const WH_ME={
 inc:{b:'New strokes',big:'11.9 million',ui:'95% UI 10.7-13.2, new strokes in 2021',r:'142',ru:'128-156',c:70.2,rt:-21.8,
  ctry:[['Luxembourg',57.7],['Solomon Islands',355.0]],reg:[['East Asia',4220],['South Asia',1697],['Sub-Saharan Africa',867],['Western Europe',717],['High-income North America',466]],
  y:[1762,'about 15%'],u:[6307,'about 53%'],all:11900,sex:[52.6,47.4],eu:'+3%',fc:null},
 pre:{b:'Living after stroke',big:'93.8 million',ui:'95% UI 89.0-99.3, people living after stroke in 2021',r:'1099',ru:'1044-1162',c:86.1,rt:-8.5,
  ctry:[['Cyprus',521.5],['Ghana',2045.8]],reg:null,
  y:[20319,'22%'],u:[61049,'65%'],all:93800,sex:[51.0,49.0],eu:'+27%',fc:null},
 dth:{b:'Deaths',big:'7.3 million',ui:'95% UI 6.6-7.8, deaths in 2021',r:'87',ru:'79-94',c:44.1,rt:-39.4,
  ctry:[['Singapore',14.2],['North Macedonia',277.4]],reg:[['East Asia',2664],['South Asia',1067],['Sub-Saharan Africa',484],['Western Europe',326],['High-income North America',209]],
  y:[373,'about 5%'],u:[2409,'33%'],all:7300,sex:[52.1,47.9],eu:'-17%',fc:['6.6 million','9.7 million']},
 day:{b:'DALYs',big:'160.5 million',ui:'95% UI 147.8-171.6, DALYs in 2021',r:'1886',ru:'1739-2018',c:32.2,rt:-38.7,
  ctry:[['Switzerland',333.3],['Nauru',6100.0]],reg:null,
  y:[21367,'13%'],u:[88143,'55%'],all:160500,sex:[55.0,45.0],eu:'-33%',fc:['144.8 million','189.3 million']}};
const WH_VIEWS=[['time','Over time'],['reg','By region'],['age','By age'],['sex','By sex']];
const WH_BCAP={
 time:`Age-standardised rates remove the effect of a larger, older population; counts do not. The change figures are from GBD 2021 [[Feigin2024]]; 2021 totals [[Feigin2024]] and rates [[Feigin2025]]. Forecasts: WSO-Lancet Neurology Commission, which starts from its own 2020 estimate [[Feigin2023]]. EU projection for 2017 to 2047 [[Wafa2020Stroke]]. Only 1990 and 2021 are data on these lines: the straight join between them is not.`,
 reg:`Highest burden across age-standardised measures in 2021 was in east Asia, central Asia and sub-Saharan regions; lowest in high-income North America, Australasia and Latin America. Country ranges and regional counts are from GBD 2021 [[Feigin2024]]. These sources list regional counts only for new strokes and deaths. Lower-income and lower-middle-income countries carried 87.2% of stroke deaths and 89.4% of stroke DALYs [[Feigin2025]].`,
 age:`Counts and shares are from the WSO fact sheet, GBD 2021 [[Feigin2025]]. All-age totals are from GBD 2021 [[Feigin2024]]. People under 70 account for more than half of new strokes, so stroke is not only a disease of old age.`,
 sex:`Global shares by sex in 2021, GBD 2021 [[Feigin2024]]. Age-adjusted rates per 100,000, where given, are from the WSO fact sheet [[Feigin2025]]. The section on sex and gender below explains crude and adjusted differences.`};
const WH_LIFE=[
 {b:'World',v:24.9,sub:'Everyone, worldwide, 2016',cap:`<b>World, 2016:</b> 24.9% (23.5-26.2). This is the "1 in 4" figure [[Feigin2018]]. In 1990 it was 22.8%, a relative rise of 8.9% [[Feigin2018]].`},
 {b:'Women',v:25.1,sub:'Women, worldwide, 2016',cap:`<b>Women:</b> 25.1% (23.7-26.5) [[Feigin2018]]. GBD 2016 reports almost no sex difference. Framingham reports a clear female excess, attributed to longer life expectancy. Starting age and population differ [[Seshadri2006,Feigin2018]].`},
 {b:'Men',v:24.7,sub:'Men, worldwide, 2016',cap:`<b>Men:</b> 24.7% (23.3-26.0) [[Feigin2018]].`},
 {b:'Ischaemic',v:18.3,sub:'Ischaemic stroke, worldwide',cap:`<b>Ischaemic stroke:</b> 18.3% from age 25 [[Feigin2018]]. Type-specific risks are reported separately, so they do not add up to the total.`},
 {b:'Haemorrhagic',v:8.2,sub:'Haemorrhagic stroke, worldwide',cap:`<b>Haemorrhagic stroke:</b> 8.2% from age 25 [[Feigin2018]]. Type-specific risks are reported separately, so they do not add up to the total.`},
 {b:'High SDI',v:23.5,sub:'High sociodemographic index',cap:`<b>High sociodemographic index:</b> 23.5% [[Feigin2018]].`},
 {b:'High-middle SDI',v:31.1,sub:'High-middle sociodemographic index',cap:`<b>High-middle sociodemographic index:</b> 31.1%, the highest of the SDI groups [[Feigin2018]].`},
 {b:'Low SDI',v:13.2,sub:'Low sociodemographic index',cap:`<b>Low sociodemographic index:</b> 13.2%, the lowest of the SDI groups. Low lifetime risk is not low danger: competing deaths shorten exposure [[Feigin2018]].`},
 {b:'East Asia',v:38.8,sub:'East Asia',cap:`<b>East Asia:</b> 38.8%, against 31.7% in Central Europe and 31.6% in Eastern Europe [[Feigin2018]].`},
 {b:'E. sub-Saharan Africa',v:11.8,sub:'Eastern sub-Saharan Africa',cap:`<b>Eastern sub-Saharan Africa:</b> 11.8% [[Feigin2018]]. Competing deaths shorten exposure, which is why the method matters [[Feigin2018]].`},
 {b:'Framingham, women',v:20,sub:'Framingham women, from age 55',cap:`<b>Framingham, women:</b> about 1 in 5 from age 55. A different start age and one US cohort of 4897 people, up to 51 years of follow-up. Normal blood pressure carried about half the lifetime risk of high blood pressure [[Seshadri2006]].`,tx:'About 1 in 5'},
 {b:'Framingham, men',v:100/6,sub:'Framingham men, from age 55',cap:`<b>Framingham, men:</b> about 1 in 6 from age 55. Similar at ages 55, 65 and 75 [[Seshadri2006]].`,tx:'About 1 in 6'}];
/* definitions: sym 0 none, 1 under 24 h, 2 over 24 h; scan none|inf|bleed|unk */
const WH_DEF=[
 {b:'Brief symptoms, clear scan',sym:1,scan:'none',s:'No infarct on the scan',w:['Not a stroke','under 24 hours','no'],n:['TIA','no acute infarction','warn'],
  cap:`Symptoms pass and no infarct is found. By the tissue definition this is a transient ischaemic attack, defined by absence of acute infarction, not by a 24-hour clock [[Easton2009]]. In plain words: a short spell of symptoms that goes away can still be a warning sign [[Easton2009]].`},
 {b:'Brief symptoms, infarct',sym:1,scan:'inf',s:'Infarct on the scan',w:['Not a stroke','under 24 hours','no'],n:['Ischaemic stroke','infarction with symptoms','bad'],
  cap:`This is where the two rules disagree. The clock calls it short. The tissue definition counts infarction accompanied by overt symptoms as ischaemic stroke, even if symptoms are brief [[Sacco2013]].`},
 {b:'Lasting symptoms, infarct',sym:2,scan:'inf',s:'Infarct on the scan',w:['Stroke','over 24 hours','bad'],n:['Ischaemic stroke','infarction with symptoms','bad'],
  cap:`Both rules agree. The WHO 1980 wording requires signs lasting more than 24 hours or leading to death [[Engelhardt2017]]; the tissue definition needs infarction with overt symptoms [[Sacco2013]].`},
 {b:'No symptoms, infarct',sym:0,scan:'inf',s:'Infarct on the scan',w:['Not a stroke','no clinical signs','no'],n:['Silent infarction','no known symptoms','warn'],
  cap:`A scan shows an infarct, but the person never had symptoms known to go with it. Silent infarction by definition causes no known symptoms, so it is not called an ischaemic stroke [[Sacco2013]].`},
 {b:'Lasting symptoms, no evidence',sym:2,scan:'unk',s:'No scan or pathology evidence',w:['Stroke','over 24 hours','bad'],n:['Stroke not otherwise specified','the 24-hour rule survives here','warn'],
  cap:`Without enough evidence to classify the event, the newer scheme keeps the time rule: "persisting ≥ 24 hours or until death" [[Engelhardt2017]]. Many epidemiological sources also predate imaging, so counts are not fully comparable across eras [[Aho1980]].`},
 {b:'Lasting symptoms, bleed',sym:2,scan:'bleed',s:'Blood on the scan',w:['Stroke','over 24 hours','bad'],n:['Intracerebral haemorrhage','blood in brain tissue','bad'],
  cap:`The tissue-based scheme names bleeds by where the blood is: a focal collection within the brain parenchyma or ventricular system, not caused by trauma, is an intracerebral haemorrhage [[Engelhardt2017]].`}];
/* outcomes: x in days; series with marker shape */
const WH_OUT={
 dth:{b:'Deaths',ymax:100,yl:'% who had died',ticks:[0,25,50,75,100],series:[
   {n:'ARIC, US, 1987-2011',col:'var(--brand)',m:'c',dash:'',p:[ [30,10.5],[365,21.2],[1825,39.8],[8760,58.4] ],a:'s'},
   {n:'Perth, Australia, 1989-90',col:'var(--accent)',m:'s',dash:'6 4',p:[ [365,36.5],[1825,58],[3650,79] ],a:'n'},
   {n:'ICH, pooled (survival 46%, 29%)',col:'var(--dx)',m:'d',dash:'2 4',p:[ [365,54],[1825,71] ],a:'n'}],
  cap:`<b>Cumulative deaths.</b> ARIC: 10.5% at 30 days, 21.2% at 1 year, 39.8% at 5 years, 58.4% at 24 years [[Martin2025HDSS,Koton2014]]. Perth: 36.5% in the first year, 58% by 5 years, 79% at 10 years [[Hankey2000,Hardie2003]]. The older Perth cohort sits far above ARIC, whose participants were recruited as middle-aged adults. ICH is shown as 100 minus the published pooled survival of 46% and 29% [[Poon2014]].`},
 dis:{b:'Disability',ymax:100,yl:'% of the group',ticks:[0,25,50,75,100],pre:true,series:[
   {n:'Oxford, survivors disabled (mRS above 2)',col:'var(--brand)',m:'c',dash:'',p:[ [10,21],[30,43],[1825,39] ],a:'s'},
   {n:'Oxford, dead or disabled',col:'var(--accent)',m:'s',dash:'',p:[ [1825,70] ],a:'w',solo:1},
   {n:'Sweden, ischaemic, death or mRS 3+',col:'var(--dx)',m:'d',dash:'',p:[ [1825,70.6] ],a:'e',solo:1},
   {n:'Sweden, ICH, death or mRS 3+',col:'var(--rec)',m:'t',dash:'',p:[ [1825,79] ],a:'e',solo:1},
   {n:'Perth, death or new disability',col:'var(--prev)',m:'s',dash:'',p:[ [3650,87] ],a:'e',solo:1}],
  cap:`<b>Disability.</b> In Oxford, disabled (mRS above 2) rose from 21% before stroke to 43% of survivors at 1 month, and 39% of survivors at 5 years. At 5 years, 70% were dead or disabled, and care home placement reached 19% (11% after TIA) [[LuengoFernandez2013]]. Sweden at 5 years: death or dependency in 70.6% after ischaemic stroke and 79% after ICH [[Sennfalt2019]]. Perth at 10 years in 30-day survivors: death or new disability 87% [[Hardie2004]]. Module 2.3 explains the modified Rankin Scale (mRS).`},
 rec:{b:'A second stroke',ymax:50,yl:'% with a recurrent stroke',ticks:[0,10,20,30,40,50],series:[
   {n:'Pooled, 13 studies',col:'var(--brand)',m:'c',dash:'',p:[ [30,3.1],[365,11.1],[1825,26.4],[3650,39.2] ],a:'n'},
   {n:'South London',col:'var(--accent)',m:'s',dash:'6 4',p:[ [365,7.1],[1825,16.2],[3650,24.5] ],a:'s'},
   {n:'Perth, 10 years',col:'var(--dx)',m:'d',dash:'',p:[ [3650,43] ],a:'n',solo:1},
   {n:'Rotterdam, 10 years',col:'var(--rec)',m:'t',dash:'',p:[ [3650,18] ],a:'s',solo:1}],
  cap:`<b>Recurrence.</b> Pooled (13 studies, 9115 survivors): 3.1% at 30 days, 11.1% at 1 year, 26.4% at 5 years, 39.2% at 10 years, with substantial heterogeneity [[Mohan2011]]. South London: 7.1%, 16.2%, 24.5% [[Mohan2009]]. Perth: 43% at 10 years [[Hardie2004]]. Rotterdam: 18.0% at 10 years overall, falling from 21.4% (1990-2000) to 11.0% (2010-2020) [[Martin2025HDSS]]. Era, definitions and competing deaths explain part of the spread.`}};
const WH_OT=[ [30,'30 days'],[365,'1 year'],[1825,'5 years'],[3650,'10 years'],[8760,'24 years'] ];
/* small helpers */
function whTx(x,y,s,cls='t-xs',st=''){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`}
const WH_INK='fill:var(--ink);font-weight:600';
function whMark(x,y,m,c,r=5){const st=`fill:${c};stroke:var(--panel);stroke-width:1.5`;
  if(m==='s')return `<rect x="${f1(x-r+.5)}" y="${f1(y-r+.5)}" width="${f1(2*r-1)}" height="${f1(2*r-1)}" style="${st}"/>`;
  if(m==='d')return `<path d="M${f1(x)} ${f1(y-r-1)}L${f1(x+r+1)} ${f1(y)}L${f1(x)} ${f1(y+r+1)}L${f1(x-r-1)} ${f1(y)}Z" style="${st}"/>`;
  if(m==='t')return `<path d="M${f1(x)} ${f1(y-r-1)}L${f1(x+r+1)} ${f1(y+r)}L${f1(x-r-1)} ${f1(y+r)}Z" style="${st}"/>`;
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="${st}"/>`}
/* the three-way share bar; fill[i] 0..1 shows how much of each segment has appeared */
function whShareBar(x,y,w,h,vals,fill,labs){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="6" style="fill:var(--panel-2)"/>`,cx=x;const tot=vals[0]+vals[1]+vals[2];
  vals.forEach((v,i)=>{const sw=w*v/tot,f=fill?fill[i]:1,ww=sw*f,T=WH_TYPES[i];
    if(ww>.5)s+=`<rect x="${f1(cx)}" y="${f1(y)}" width="${f1(ww)}" height="${h}" style="fill:${T.col}"/>`;
    if(f>.85&&labs){const full=(labs[i]||T.lbl)+' '+v+'%';
      if(sw>full.length*7.2+6)s+=whTx(cx+sw/2,y+h/2+4,full,'t-sm t-mid','fill:var(--on-brand);font-weight:700');
      else if(sw>32)s+=whTx(cx+sw/2,y+h/2+4,v+'%','t-sm t-mid','fill:var(--on-brand);font-weight:700')}
    cx+=sw});
  return s}
inits.what=()=>{
  /* ---------- main: blocked or burst ---------- */
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote');let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 450','400 590'),p=phaseOf(WH_STEPS,t),P=WH_STEPS[p];
    const L=N?{ax:14,ay:62,ay3:112,aw:372,brS:.98,brX:53,brY:190,axS:.8,axX:104,axY:196,anX:138,anY:54,anS:.62,bx:14,by:488,bw:372,bh:30}
             :{ax:18,ay:158,ay3:158,aw:310,brS:1.14,brX:358,brY:50,axS:1,axX:420,axY:40,anX:58,anY:92,anS:1.15,bx:16,by:388,bw:688,bh:30};
    const ph=t*22,fade=ramp(t,P.from,P.from+.025);
    /* share bar */
    const fills=[ramp(t,.14,.24),ramp(t,.46,.55),ramp(t,.63,.72)];
    let s=whTx(L.bx,L.by-8,'Share of new strokes worldwide, GBD 2021','t-sm','fill:var(--ink)');
    s+=whShareBar(L.bx,L.by,L.bw,L.bh,WH_TYPES.map(k=>k.sh),fills,N?['Ischaemic','ICH','']:['Ischaemic','ICH','']);
    /* direct label for the narrow SAH sliver, under the bar */
    if(fills[2]>.85)s+=whTx(L.bx+L.bw,L.by+L.bh+15,'thin end segment: SAH 5.8%','t-xs t-end',WH_INK);
    if(p===5){/* the split: three types side by side, or stacked in narrow */
      const rows=WH_TYPES.map((T,i)=>{const c=N?{x:14,y:30+i*150,w:372,h:142}:{x:14+i*234,y:18,w:224,h:346};
        return {T,i,c}});
      let g='';rows.forEach(({T,i,c})=>{const a=clamp((t-.8-i*.018)*22);
        g+=`<g style="opacity:${f1(a)}"><rect x="${f1(c.x)}" y="${f1(c.y)}" width="${f1(c.w)}" height="${f1(c.h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
        const gx=N?c.x+(i===0?4:22):c.x+(i===0?19:52),gy=N?c.y+(i===0?10:6):c.y+(i===0?44:24),gS=N?(i===0?.46:.43):(i===0?.62:.5);
        if(i===0)g+=brainSide(gx,gy,gS,{lesion:{core:26,penumbra:48},vessels:{occl:'m1',flow:.8,ph}}).svg;
        else if(i===1)g+=brainAxial(gx,gy,gS,{side:'L',bleed:{r:30,oedema:.5},shift:6}).svg;
        else g+=brainAxial(gx,gy,gS,{sah:1}).svg;
        const tx=N?c.x+152:c.x+c.w/2,ta=N?'':' t-mid',ty=N?c.y+34:c.y+(i===0?222:204);
        g+=whTx(tx,ty,N?['Ischaemic','Intracerebral','Subarachnoid'][i]:T.k,'t-lbl'+ta);
        if(N&&i>0)g+=whTx(tx,ty+15,'haemorrhage','t-lbl');
        g+=whTx(tx,ty+(N?(i>0?48:34):36),T.sh+'%',ta?'t-mid':'',`font:700 34px var(--display);fill:${T.col}`);
        g+=whTx(tx,ty+(N?(i>0?68:54):58),T.n+' strokes','t-sm'+ta,'fill:var(--ink)');
        g+=whTx(tx,ty+(N?(i>0?82:68):74),['a clot blocks an artery','a vessel bleeds in the brain','an aneurysm bleeds beside it'][i],'t-xs'+ta);
        g+='</g>'});
      s+=g}
    else{let g='';
      g+=whTx(N?14:18,N?20:26,P.sv,'t-big');
      if(!N)g+=whTx(L.brX+(p<3?L.brS*150:L.axS*120),24,P.br,'t-big t-mid');
      if(p<=2){const cl=p===0?0:ease(ramp(t,.14,.22));
        g+=artery(L.ax,L.ay,L.aw,{h:N?44:54,flow:p===0?1:1-cl,ph,clot:cl,at:.56,labels:false}).svg;
        g+=whTx(L.ax,L.ay+(N?60:74),cl>.5?'blood stops at the clot':'blood moves freely','t-sm','fill:var(--ink)');
        if(!N)g+=whTx(L.ax,L.ay+90,'A longitudinal cut, flow runs left to right','t-xs');
        const les=ramp(t,.3,.44);
        const B=brainSide(L.brX,L.brY,L.brS,{vessels:p===0?{flow:1,ph}:{occl:'m1',flow:1-cl*.2,ph},lobes:p===0,lesion:p===2?{core:lerp(6,26,les),penumbra:lerp(24,52,les)}:undefined});
        g+=B.svg;
        if(N)g+=whTx(200,L.brY-6,P.br,'t-sm t-mid','fill:var(--ink)');
        if(p===2&&B.at.lesion){const a=B.at.lesion;g+=kitLabel(a[0],a[1]+4,'core',{a:'m'});
          g+=kitLabel(a[0],a[1]-lerp(26,52,les)*L.brS-6,'at risk (penumbra)',{a:'m'})}}
      else if(p===3){const u=ease(ramp(t,.46,.56));
        g+=artery(L.ax,L.ay3,L.aw,{h:N?40:54,flow:1,ph,rupture:u,ruptureAt:.5}).svg;
        g+=whTx(L.ax,L.ay3+(N?56:74),'blood leaves through the tear','t-sm','fill:var(--ink)');
        const A=brainAxial(L.axX,L.axY,L.axS,{side:'L',bleed:{r:lerp(8,26,u),oedema:u*.8},shift:lerp(0,6,u),orient:true});
        g+=A.svg;if(N)g+=whTx(200,L.axY-4,P.br,'t-sm t-mid','fill:var(--ink)');
        const b=A.at.bleed;if(b)g+=kitLabel(b[0],b[1]+4,'blood',{a:'m'})}
      else{const u=ease(ramp(t,.63,.74));
        g+=aneurysm(L.anX,L.anY,L.anS,{rupture:u,ph,flow:1,labels:!N}).svg;
        g+=brainAxial(L.axX,L.axY,L.axS,{sah:u,orient:true}).svg;
        if(N)g+=whTx(200,L.axY-4,P.br,'t-sm t-mid','fill:var(--ink)')}
      s+=`<g style="opacity:${f1(fade)}">${g}</g>`}
    svg.innerHTML=s;note.innerHTML=noteHTML(P);setSt(p)}
  const stop=playWire(rg,$('#whPlay'),draw,28000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- shares by population ---------- */
  const shS=$('#whShare'),shC=$('#whShareCap'),shB=$('#whShareBtns');let shCur=[...WH_SHARES[0].v],shI=0,shStop=null;
  shB.innerHTML=WH_SHARES.map((d,i)=>`<button class="btn" data-whs="${i}" aria-pressed="${i===0}">${d.b}</button>`).join('');
  function drawShare(){const N=vb(shS,'720 230','400 360'),D=WH_SHARES[shI];
    const L=N?{bx:14,bw:372,gx:14,gy:92,c:17,rx:204,ry:110}:{bx:16,bw:688,gx:16,gy:84,c:13.4,rx:190,ry:108};
    let s=whTx(L.bx,18,D.b,'t-big')+whTx(L.bx+L.bw,18,'share of new strokes','t-xs t-end');
    s+=whShareBar(L.bx,28,L.bw,28,shCur.map(v=>Math.round(v*10)/10),null,['Ischaemic','ICH','SAH']);
    /* a grid of 100 marks: each type has its own shape, not only its own colour */
    let k=0;const r=shCur.map(v=>Math.round(v));r[0]=100-r[1]-r[2];
    r.forEach((n,ti)=>{for(let i=0;i<n;i++,k++){const x=L.gx+(k%10)*L.c+L.c/2,y=L.gy+Math.floor(k/10)*L.c+L.c/2;s+=whMark(x,y,['c','s','d'][ti],WH_TYPES[ti].col,N?6:4.6)}});
    WH_TYPES.forEach((T,i)=>{const y=L.ry+i*(N?44:38);
      s+=whMark(L.rx+6,y-4,['c','s','d'][i],T.col,5)+whTx(L.rx+20,y,N?['Ischaemic','Intracerebral (ICH)','Subarachnoid (SAH)'][i]:T.k,'t-sm','fill:var(--ink)');
      s+=whTx(L.rx+20,y+(N?18:16),(Math.round(shCur[i]*10)/10)+'% of new strokes','t-lbl')});
    if(N)s+=whTx(14,L.gy+10*L.c+18,'Each mark is 1 in 100 strokes, rounded.','t-xs');
    else s+=whTx(L.rx,222,'Each mark is 1 in 100 strokes, rounded.','t-xs');
    shS.innerHTML=s;shC.innerHTML=D.cap}
  shB.addEventListener('click',e=>{const b=e.target.closest('[data-whs]');if(!b)return;shI=+b.dataset.whs;$$('[data-whs]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const s0=[...shCur],to=WH_SHARES[shI].v;if(shStop)shStop();drawShare();shStop=animate(RM?1:700,q=>{shCur=s0.map((v,i)=>lerp(v,to[i],ease(q)));drawShare()},()=>{shStop=null;shCur=[...to];drawShare()})});
  drawShare();

  /* ---------- burden explorer ---------- */
  const bS=$('#whBur'),bC=$('#whBurCap'),bCt=$('#whBurCtl'),bR=$('#whBurT');let me='inc',vw='time';
  $('#whBurM').innerHTML=Object.keys(WH_ME).map(k=>`<button class="btn" data-whm="${k}" aria-pressed="${k===me}">${WH_ME[k].b}</button>`).join('');
  $('#whBurV').innerHTML=WH_VIEWS.map(v=>`<button class="btn" data-whv="${v[0]}" aria-pressed="${v[0]===vw}">${v[1]}</button>`).join('');
  function bHead(M,W){return whTx(W===400?14:16,30,M.big,'','font:700 26px var(--display);fill:var(--brand)')+whTx(W===400?14:16,47,M.ui,'t-xs')}
  function bTime(t,N,M){const L=N?{x:44,y:82,w:330,h:190,px:14,py:330,pw:372}:{x:52,y:82,w:380,h:262,px:470,py:82,pw:234};
    const lo=50,hi=200,X=u=>L.x+u*L.w,Y=v=>L.y+L.h-(v-lo)/(hi-lo)*L.h;
    let s='';[50,75,100,125,150,175,200].forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+whTx(L.x-6,Y(v)+3,v,'t-xs t-end')});
    s+=whTx(L.x-30,L.y-10,'index, 1990 = 100','t-xs');
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(100))}" y2="${f1(Y(100))}" style="stroke:var(--muted);stroke-width:1"/>`;
    s+=whTx(L.x,L.y+L.h+16,'1990','t-xs')+whTx(L.x+L.w,L.y+L.h+16,'2021','t-xs t-end');
    const c=100+M.c,r=100+M.rt,uu=clamp(t);
    s+=`<path d="M${X(0)} ${f1(Y(100))}L${f1(X(uu))} ${f1(Y(lerp(100,c,uu)))}" style="fill:none;stroke:var(--accent);stroke-width:3"/>`;
    s+=`<path d="M${X(0)} ${f1(Y(100))}L${f1(X(uu))} ${f1(Y(lerp(100,r,uu)))}" style="fill:none;stroke:var(--brand);stroke-width:3;stroke-dasharray:7 4"/>`;
    s+=whMark(X(0),Y(100),'c','var(--ink)',4);
    if(uu>.995){s+=whMark(X(1),Y(c),'s','var(--accent)')+whMark(X(1),Y(r),'c','var(--brand)');
      s+=whTx(X(1)-10,Y(c)-10,'Count +'+M.c+'%','t-lbl t-end','fill:var(--accent)')+whTx(X(1)-10,Y(r)+20,'Rate '+M.rt+'%','t-lbl t-end','fill:var(--brand)')}
    else s+=`<line x1="${f1(X(uu))}" x2="${f1(X(uu))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    /* looking ahead */
    const a=[ ['Age-standardised rate, 2021',M.r+' per 100,000',M.ru] ];
    if(M.fc)a.push(['Commission forecast, world',M.fc[0]+' in 2020','to '+M.fc[1]+' in 2050']);
    else a.push(['Commission forecast, world','not given for this measure','in these sources']);
    a.push(['EU projection, 2017 to 2047',M.eu+' in counts','separate model']);
    const rh=N?48:80;
    a.forEach((r0,i)=>{const yy=L.py+i*rh;s+=`<rect x="${L.px}" y="${f1(yy)}" width="${L.pw}" height="${rh-8}" rx="8" style="fill:var(--panel-2)"/>`;
      s+=whTx(L.px+10,yy+(N?13:20),r0[0],'t-xs');s+=whTx(L.px+10,yy+(N?28:40),r0[1],'t-lbl');s+=whTx(N?L.px+L.pw-10:L.px+10,yy+(N?28:58),r0[2],'t-xs'+(N?' t-end':''))});
    return s}
  function bReg(N,M){const X0=N?14:16,Wd=N?372:688;let s='',y=78;
    /* country range */
    const [a,b]=M.ctry,mx=b[1]*1.02,bx=X0+6,bw=Wd-12,xx=v=>bx+bw*v/mx;
    s+=whTx(X0,y,N?'Age-standardised rate per 100,000, by country':'Age-standardised rate per 100,000: lowest and highest country','t-sm','fill:var(--ink)');y+=34;
    s+=`<line x1="${bx}" x2="${bx+bw}" y1="${y}" y2="${y}" class="axis"/><line x1="${f1(xx(a[1]))}" x2="${f1(xx(b[1]))}" y1="${y}" y2="${y}" style="stroke:var(--accent);stroke-width:5;stroke-linecap:round"/>`;
    s+=whMark(xx(a[1]),y,'c','var(--brand)',7)+whMark(xx(b[1]),y,'s','var(--accent)',7);
    s+=whTx(xx(a[1])-4,y-13,a[0]+' '+a[1],'t-sm','fill:var(--ink)')+whTx(xx(b[1])+4,y+24,b[0]+' '+b[1],'t-sm t-end','fill:var(--ink)');
    y+=52;
    if(M.reg){const mxr=M.reg[0][1],lw=N?0:190,rh=N?42:32,bx2=X0+lw,bw2=Wd-lw-(N?70:90);
      s+=whTx(X0,y,'Count in 2021, thousands','t-sm','fill:var(--ink)');y+=12;
      M.reg.forEach((r,i)=>{const yy=y+i*rh;
        if(N)s+=whTx(X0,yy+11,r[0],'t-xs','fill:var(--ink)');else s+=whTx(X0,yy+15,r[0],'t-sm','fill:var(--ink)');
        const by=N?yy+15:yy+3;
        s+=`<rect x="${f1(bx2)}" y="${f1(by)}" width="${f1(bw2*r[1]/mxr)}" height="16" rx="3" style="fill:var(--brand)"/>`+whTx(bx2+bw2*r[1]/mxr+6,by+12,r[1].toLocaleString('en-US')+',000','t-sm','fill:var(--ink)')})}
    else{const ty=y+6;s+=`<rect x="${X0}" y="${ty}" width="${Wd}" height="${N?92:76}" rx="10" style="fill:var(--panel-2)"/>`;
      s+=whTx(X0+12,ty+24,N?'No regional counts for this measure here.':'Regional counts for this measure are not in these sources.','t-sm','fill:var(--ink)');
      s+=whTx(X0+12,ty+44,N?'By income: lower-income and lower-middle-':'By income: lower-income and lower-middle-income countries carried','t-sm');
      s+=whTx(X0+12,ty+60,N?'income countries carried 87.2% of deaths':'87.2% of stroke deaths and 89.4% of stroke DALYs.','t-sm');
      if(N)s+=whTx(X0+12,ty+76,'and 89.4% of DALYs.','t-sm')}
    return s}
  function bAge(N,M){const X0=N?14:16,Wd=N?372:688;let s='';const lw=N?0:120,bx=X0+lw,bw=Wd-lw,rh=N?86:70,y0=86;
    const rows=[['All ages',1,M.big,'','var(--panel-2)','var(--ink)'],['Under 70',M.u[0]/M.all,M.u[0].toLocaleString('en-US')+',000',M.u[1],'var(--accent)'],['Age 15-49',M.y[0]/M.all,M.y[0].toLocaleString('en-US')+',000',M.y[1],'var(--brand)']];
    rows.forEach((r,i)=>{const y=y0+i*rh;
      if(N)s+=whTx(X0,y,r[0],'t-lbl');else s+=whTx(X0,y+22,r[0],'t-lbl');
      const by=N?y+8:y;
      s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw*r[1])}" height="32" rx="5" style="fill:${r[4]};${i?'':'stroke:var(--line)'}"/>`;
      const lab=r[2]+(r[3]?' · '+r[3]:'');
      s+=whTx(bx+(i?0:8),by+(i?50:21),lab,'t-sm','fill:var(--ink);font-weight:600')});
    const ny=y0+3*rh+(N?8:6);
    if(me==='inc'){s+=whTx(X0,ny,'Younger people: a larger share of the bleeds.','t-sm','fill:var(--ink)');s+=whTx(X0,ny+17,'Age 15-49: over 12% of ischaemic strokes,','t-sm');s+=whTx(X0,ny+33,'about 18% of ICH, over 34% of SAH.','t-sm')}
    else s+=whTx(X0,ny,N?'"Under 70" includes those aged 15-49.':'"Under 70" includes those aged 15-49, so the bars nest.','t-sm');
    return s}
  function bSex(N,M){const X0=N?14:16,Wd=N?372:688,y=92,h=44;const [ma,fe]=M.sex,mw=Wd*ma/100;let s='';
    s+=whTx(X0,y-8,'Share of the global total, 2021','t-sm','fill:var(--ink)');
    s+=`<rect x="${X0}" y="${y}" width="${f1(mw-1)}" height="${h}" style="fill:var(--brand)"/><rect x="${f1(X0+mw+1)}" y="${y}" width="${f1(Wd-mw-1)}" height="${h}" style="fill:var(--accent)"/>`;
    s+=whTx(X0+mw/2,y+27,'Male '+ma+'%','t-lbl t-mid','fill:var(--on-brand)')+whTx(X0+mw+(Wd-mw)/2,y+27,'Female '+fe+'%','t-lbl t-mid','fill:var(--on-brand)');
    s+=`<line x1="${X0+Wd/2}" x2="${X0+Wd/2}" y1="${y-4}" y2="${y+h+4}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`+whTx(X0+Wd/2,y+h+16,'half','t-xs t-mid');
    const R={inc:['Age-adjusted incidence per 100,000','men 160 (144-178), women 125 (113-137)'],dth:['Age-adjusted death rate per 100,000','men 103 (93-113), women 75 (66-82)']}[me];
    let yy=y+h+46;
    if(R){s+=whTx(X0,yy,R[0],'t-sm','fill:var(--ink)')+whTx(X0,yy+18,R[1],'t-lbl');yy+=46}
    s+=whTx(X0,yy,'SAH is the exception:','t-sm','fill:var(--ink)')+whTx(X0,yy+17,'about 51% of incident SAH occur in women.','t-sm','fill:var(--ink)');
    return s}
  function drawB(){const N=vb(bS,vw==='time'?'720 400':'720 400',vw==='time'?'400 490':vw==='reg'?'400 440':vw==='age'?'400 430':'400 330'),M=WH_ME[me],W=N?400:720;
    let s=bHead(M,W);
    if(vw==='time')s+=bTime(+bR.value,N,M);else if(vw==='reg')s+=bReg(N,M);else if(vw==='age')s+=bAge(N,M);else s+=bSex(N,M);
    bS.innerHTML=s;bC.innerHTML=WH_BCAP[vw];bCt.hidden=vw!=='time'}
  const bStop=playWire(bR,$('#whBurPlay'),()=>drawB(),5000,'%t:player.replay%','what');
  $('#m-what').addEventListener('click',e=>{const a=e.target.closest('[data-whm]'),c=e.target.closest('[data-whv]');if(!a&&!c)return;bStop();
    if(a){me=a.dataset.whm;$$('[data-whm]').forEach(x=>x.setAttribute('aria-pressed',x===a))}
    if(c){vw=c.dataset.whv;$$('[data-whv]').forEach(x=>x.setAttribute('aria-pressed',x===c))}
    drawB()});
  drawB();

  /* ---------- lifetime risk ---------- */
  const lS=$('#whLife'),lC=$('#whLifeCap'),lB=$('#whLifeBtns');let lI=0,lK=0,lStop=null;
  lB.innerHTML=WH_LIFE.map((d,i)=>`<button class="btn" data-whl="${i}" aria-pressed="${i===0}">${d.b}</button>`).join('');
  function drawLife(){const N=vb(lS,'720 300','400 510'),D=WH_LIFE[lI];
    const L=N?{gx:40,gy:10,sz:24,col:33,row:34,tx:14,ty:400}:{gx:18,gy:6,sz:21,col:28,row:29,tx:320,ty:96};
    let s='';for(let i=0;i<100;i++){const x=L.gx+(i%10)*L.col+L.sz/2,y=L.gy+Math.floor(i/10)*L.row;
      const on=i<lK;s+=person(x,y,L.sz,on?'var(--accent)':'var(--line)')}
    s+=whTx(L.tx,L.ty,D.tx||(D.v+'%'),'','font:700 50px var(--display);fill:var(--accent)');
    s+=whTx(L.tx,L.ty+28,D.sub,'t-lbl');
    s+=whTx(L.tx,L.ty+48,'Filled figures: about '+Math.round(lK)+' of 100 people','t-sm','fill:var(--ink)');
    s+=whTx(L.tx,L.ty+66,N?'lifetime risk of a first stroke':'lifetime risk of a first stroke, as published','t-xs');
    lS.innerHTML=s;lC.innerHTML=D.cap}
  function setLife(i){lI=i;const to=Math.round(WH_LIFE[i].v),k0=lK;if(lStop)lStop();drawLife();lStop=animate(RM?1:800,q=>{lK=Math.round(lerp(k0,to,ease(q)));drawLife()},()=>{lStop=null;lK=to;drawLife()})}
  lB.addEventListener('click',e=>{const b=e.target.closest('[data-whl]');if(!b)return;$$('[data-whl]').forEach(x=>x.setAttribute('aria-pressed',x===b));setLife(+b.dataset.whl)});
  lK=25;drawLife();

  /* ---------- clock and tissue ---------- */
  const dS=$('#whDef'),dC=$('#whDefCap'),dB=$('#whDefBtns');let dI=1,dP=1,dStop=null;
  dB.innerHTML=WH_DEF.map((d,i)=>`<button class="btn" data-whd="${i}" aria-pressed="${i===dI}">${d.b}</button>`).join('');
  function verdict(x,y,w,h,head,V){const c=V[2]==='no'?'muted':V[2],bg=V[2]==='no'?'panel-2':V[2]+'-soft';
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--${bg})"/>`+whTx(x+12,y+18,head,'t-xs')+whTx(x+12,y+40,V[0],V[0].length>24?'t-sm':'t-lbl',`fill:var(--${c==='muted'?'ink':c});font-weight:700`)+whTx(x+12,y+58,V[1],'t-xs','fill:var(--ink)')}
  function drawDef(){const N=vb(dS,'720 300','400 560'),D=WH_DEF[dI],p=dP;
    const L=N?{bx:14,by:40,bw:372,sx:88,sy:104,sS:.75,v1:[14,350,372,76],v2:[14,436,372,76]}:{bx:16,by:40,bw:300,sx:60,sy:96,sS:.62,v1:[350,84,354,84],v2:[350,180,354,84]};
    let s=whTx(L.bx,18,'How long the symptoms lasted','t-sm','fill:var(--ink)');
    const X24=L.bx+L.bw*.5,sv=[0,.3,.82][D.sym]*ease(p);
    s+=`<rect x="${L.bx}" y="${L.by-14}" width="${L.bw}" height="18" rx="5" style="fill:var(--panel-2)"/>`;
    if(sv>0)s+=`<rect x="${L.bx}" y="${L.by-14}" width="${f1(L.bw*sv)}" height="18" rx="5" style="fill:var(--brand)"/>`;
    s+=`<line x1="${f1(X24)}" x2="${f1(X24)}" y1="${L.by-20}" y2="${L.by+9}" style="stroke:var(--ink);stroke-width:2"/>`+whTx(X24,L.by+22,'24 hours','t-xs t-mid','fill:var(--ink);font-weight:700');
    s+=whTx(L.bx,L.by+22,D.sym?'':'no symptoms','t-xs');
    /* the scan */
    if(D.scan==='unk'){s+=brainAxial(L.sx,L.sy,L.sS,{mode:'plain',}).svg;
      const cx=L.sx+120*L.sS,cy=L.sy+150*L.sS;s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="26" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/>`+whTx(cx,cy+11,'?','t-mid','font:700 30px var(--display);fill:var(--ink)')}
    else if(D.scan==='bleed')s+=brainAxial(L.sx,L.sy,L.sS,{mode:'ct',bleed:{r:28*p,oedema:.4*p},orient:false}).svg;
    else s+=brainAxial(L.sx,L.sy,L.sS,{mode:'dwi',core:D.scan==='inf'?.42*p:0}).svg;
    s+=whTx(L.sx+120*L.sS,L.sy+300*L.sS+13,D.s+' (drawn)','t-xs t-mid');
    s+=verdict(...L.v1,'WHO 1980: THE CLOCK',D.w)+verdict(...L.v2,'AHA/ASA 2013: THE TISSUE',D.n);
    dS.innerHTML=s;dC.innerHTML=D.cap}
  dB.addEventListener('click',e=>{const b=e.target.closest('[data-whd]');if(!b)return;dI=+b.dataset.whd;$$('[data-whd]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(dStop)dStop();dP=.15;drawDef();dStop=animate(RM?1:800,q=>{dP=q;drawDef()},()=>{dStop=null;dP=1;drawDef()})});
  drawDef();

  /* ---------- outcomes ---------- */
  const oS=$('#whOut'),oC=$('#whOutCap'),oR=$('#whOutT'),oB=$('#whOutBtns');let oK='dth';
  oB.innerHTML=Object.keys(WH_OUT).map(k=>`<button class="btn" data-who="${k}" aria-pressed="${k===oK}">${WH_OUT[k].b}</button>`).join('');
  function drawOut(t){const N=vb(oS,'720 390','400 620'),D=WH_OUT[oK];
    const L=N?{x:40,y:30,w:340,h:300,lx:14,ly:392,lh:44,lw:372}:{x:46,y:30,w:430,h:310,lx:498,ly:44,lh:60,lw:210};
    const lg=d=>Math.log10(d),a0=1,a1=lg(10000),X=d=>L.x+(lg(d)-a0)/(a1-a0)*L.w,Y=v=>L.y+L.h-v/D.ymax*L.h,cur=lerp(a0,a1,clamp(t)),seen=d=>lg(d)<=cur+.0005;
    let s=whTx(L.x-30,18,D.yl,'t-xs');
    D.ticks.forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+whTx(L.x-6,Y(v)+3,v,'t-xs t-end')});
    WH_OT.forEach(([d,l],i)=>{const x=X(d);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y+L.h}" y2="${L.y+L.h+5}" class="axis"/>`+whTx(x,L.y+L.h+(N&&i%2?30:17),N?l.replace(' days',' d').replace(' years',' y').replace(' year',' y'):l,'t-xs t-mid','fill:var(--ink)')});
    if(D.pre)s+=whTx(X(10)+2,L.y+L.h+17,'before','t-xs t-mid','fill:var(--ink)');
    s+=whTx(L.x+L.w,L.y+L.h+(N?46:34),'time since stroke, log scale','t-xs t-end');
    const cx=L.x+(cur-a0)/(a1-a0)*L.w;s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    D.series.forEach((S,si)=>{const P=S.p;
      /* the straight join grows to the cursor, in log time */
      let d='';P.forEach((q,i)=>{if(i===0){if(seen(q[0]))d=`M${f1(X(q[0]))} ${f1(Y(q[1]))}`;return}
        const a=P[i-1];if(!seen(a[0]))return;const la=lg(a[0]),lb=lg(q[0]),u=clamp((cur-la)/(lb-la));if(u<=0)return;d+=`L${f1(lerp(X(a[0]),X(q[0]),u))} ${f1(lerp(Y(a[1]),Y(q[1]),u))}`});
      if(d&&!S.solo)s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.4${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      P.forEach(q=>{if(!seen(q[0]))return;const x=X(q[0]),y=Y(q[1]);s+=whMark(x,y,S.m,S.col);
        const lab=q[1]+'%',o=S.a==='n'?[0,-11,'t-mid']:S.a==='s'?[0,19,'t-mid']:S.a==='w'?[-10,4,'t-end']:[10,4,''];
        s+=`<text x="${f1(x+o[0])}" y="${f1(y+o[1])}" class="t-sm ${o[2]}" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round">${lab}</text>`});
      /* the key row, naming the latest published figure */
      const last=[...P].reverse().find(q=>seen(q[0])),ky=L.ly+si*L.lh;
      s+=whMark(L.lx+6,ky+4,S.m,S.col)+(N?whTx(L.lx+18,ky+8,S.n,'t-xs','fill:var(--ink);font-weight:600'):whKeyName(L.lx+18,ky+8,S.n));
      s+=whTx(N?L.lx+18:L.lx+18,ky+(N?26:38),last?last[1]+'% by '+whDay(last[0]):'no figure yet at this time','t-sm')});
    oS.innerHTML=s;oC.innerHTML=D.cap}
  const oStop=playWire(oR,$('#whOutPlay'),drawOut,9000,'%t:player.replay%','what');
  oB.addEventListener('click',e=>{const b=e.target.closest('[data-who]');if(!b)return;oStop();oK=b.dataset.who;$$('[data-who]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawOut(+oR.value)});
  drawOut(+oR.value);

  /* layout redraws on crossing the narrow threshold */
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawShare();drawB();drawLife();drawDef();drawOut(+oR.value)};
};
function whDay(d){return d===10?'before stroke':({30:'30 days',365:'1 year',1825:'5 years',3650:'10 years',8760:'24 years'})[d]}
/* a series name in the wide key, wrapped at a word boundary to two lines */
function whKeyName(x,y,n){if(n.length<=30)return whTx(x,y,n,'t-xs','fill:var(--ink);font-weight:600');const c=n.lastIndexOf(' ',30);
  return whTx(x,y,n.slice(0,c),'t-xs','fill:var(--ink);font-weight:600')+whTx(x,y+13,n.slice(c+1),'t-xs','fill:var(--ink);font-weight:600')}
