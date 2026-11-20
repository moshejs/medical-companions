/* =============== 1.1 what ALS is =============== */
/* The timeline runs over 36 schematic months: t = month / 36. The month marks are the
   mean times from onset in people who had died at one London clinic (Roche 2012). */
const WH_M=36;
const WH_STEPS=[
 {from:0,at:.04,k:'King\'s stage 1',t:'Onset in one region'},
 {from:10/36,at:13.5/36,k:'King\'s stage 2A',t:'Diagnosis'},
 {from:16.5/36,at:18.6/36,k:'King\'s stage 2B',t:'A second region'},
 {from:22.4/36,at:24.4/36,k:'King\'s stage 3',t:'A third region'},
 {from:29.4/36,at:33/36,k:'King\'s stage 4',t:'Late stage'}
];
/* onset-specific notes, one per step; the order says which region follows which */
const WH_ONSET={
 limb:{order:['cervical','lumbosacral','bulbar','thoracic'],steps:[
  {txt:`Weakness starts in one limb, often a hand, with wasting, twitching (fasciculations) or stiffness. Limb onset made up 74.6% of people at one London clinic [[Roche2012]], and spinal onset is more common in men [[Logroscino2010]]. Degeneration starts focally and spreads contiguously through the motor system, usually to the other side first [[Ravits2009,Feldman2022]].`,
   pt:'It usually starts in one hand, arm, foot or leg. Here it starts in one hand and then the other arm.',
   hook:'ALS = <b>upper plus lower</b> motor neuron signs. UMN: brisk reflexes, spasticity. LMN: weakness, wasting, fasciculations. [[Feldman2022]]'},
  {txt:`At a US centre the median time from first symptom to confirmed diagnosis was 11.5 months. People saw an average of three physicians, and 52% were first given another diagnosis. The delay was longer with limb onset, age over 60 and sporadic disease [[Paganoni2014]]. In London the mean time to diagnosis was 13.5 months in people who had died [[Roche2012]].`,
   pt:'Getting the diagnosis often takes about a year, because early ALS can look like commoner problems.',
   hook:'Diagnostic delay is about <b>1 year</b>. A longer delay goes with slower disease (ENCALS HR 0.52). [[Paganoni2014,Westeneng2018]]'},
  {txt:`Here the legs follow the arms. In the London cohort a second region was reached at a mean of 17.7 months from onset [[Roche2012]]. King's staging counts regions: bulbar, upper limb, lower limb and diaphragm [[Roche2012]].`,
   pt:'The weakness spreads to another part of the body, here the legs.'},
  {txt:`The bulbar muscles, for speech and swallowing, become involved. A third region was reached at a mean of 23.3 months, and median survival from that point was 13 months in both limb and bulbar onset [[Roche2012]].`,
   pt:'Speech and swallowing start to change.'},
  {txt:`The breathing muscles weaken. With limb onset, non-invasive ventilation was usually needed before a feeding tube (standardised 0.73 against 0.81 of the course) [[Roche2012]]. Respiratory failure, including pneumonia, caused 81.3% of deaths at one Italian centre [[Spataro2010]]. Median survival from onset is 2 to 4 years, and 10-20% of people live more than 10 years [[Feldman2022,Chio2009]].`,
   pt:'Later the muscles for breathing weaken. Breathing support is one of the main parts of care.',
   hook:'Motor neurons for eye movement and the sphincters are relatively spared until late. [[Kanning2010,Mannen1977]] <a href="#breathing" data-go="breathing">Breathing and NIV</a>'}]},
 bulbar:{order:['bulbar','cervical','lumbosacral','thoracic'],steps:[
  {txt:`The first symptoms are slurred speech or trouble swallowing. Bulbar onset made up 25.4% of people at a London clinic and 33.0% of a French incident cohort [[Roche2012,Hamidou2017]]. The male-to-female ratio was 0.9 in bulbar onset against 1.9 in limb onset [[Roche2012]].`,
   pt:'Here it starts with the voice or swallowing.',
   hook:'Bulbar onset: about <b>a quarter to a third</b> of people, and men and women about equally. [[Feldman2022,Roche2012]]'},
  {txt:`Bulbar-onset ALS was diagnosed about 4.4 months faster than limb-onset ALS in a meta-analysis of 13 studies [[Saeed2026]].`,
   pt:'Speech changes tend to be noticed and checked sooner than a weak hand.'},
  {txt:`The arms are involved next in this example. A second region was reached at a mean of 17.7 months from onset in the London cohort, all onset types together [[Roche2012]].`,
   pt:'The weakness spreads to the arms.'},
  {txt:`With bulbar onset the third region was reached earlier in the course (standardised 0.45 against 0.63 for limb onset) [[Roche2012]].`,
   pt:'Now the legs are weaker too.'},
  {txt:`With bulbar onset a feeding tube (gastrostomy) was usually needed before non-invasive ventilation (0.71 against 0.81 of the course) [[Roche2012]]. Median survival from onset was 30.8 months for bulbar and 48.3 for limb onset in London [[Roche2012]], and older age and bulbar onset consistently predict a worse outcome [[Chio2009]].`,
   pt:'Later the breathing muscles weaken. Feeding support often comes first with this kind of onset.',
   hook:'Bulbar onset: <b>gastrostomy before NIV</b>. Limb onset: <b>NIV before gastrostomy</b>. [[Roche2012]] <a href="#nutrition" data-go="nutrition">Swallowing and feeding tubes</a>'}]},
 resp:{order:['thoracic','cervical','bulbar','lumbosacral'],steps:[
  {txt:`Weak breathing muscles are the first problem. Respiratory onset was 2.7% of people at a Canadian clinic and 2.1% of a French incident cohort [[Shoesmith2007,Hamidou2017]]. No one in a London clinic cohort of 1459 people had diaphragmatic onset [[Roche2012]].`,
   pt:'Rarely, it starts with the muscles for breathing.',
   hook:'Respiratory onset is <b>rare</b>: about 2-3% of people. [[Shoesmith2007,Hamidou2017]]'},
  {txt:`In the Canadian series only 14% presented acutely, needing emergency intubation [[Shoesmith2007]].`,
   pt:'Most people with this kind of onset are not diagnosed in an emergency.'},
  {txt:`The arms follow in this example. Spread is usually contiguous, to neighbouring parts of the motor system [[Ravits2009]].`,
   pt:'The weakness spreads to the arms.'},
  {txt:`Speech and swallowing become involved. The month marks here are the London means for all onset types [[Roche2012]].`,
   pt:'Speech and swallowing start to change.'},
  {txt:`Mean survival from onset to death or permanent ventilation was 27.0 months, not significantly different from bulbar onset [[Shoesmith2007]]. In the Piedmont register, outcomes were worst in the respiratory and bulbar phenotypes [[Chio2011]].`,
   pt:'This kind of onset tends to progress about as fast as bulbar onset.'}]}
};
const WH_TXT={
 onsets:[['limb','Limb onset'],['bulbar','Bulbar onset'],['resp','Respiratory onset']],
 onsetName:{limb:'limb',bulbar:'bulbar',resp:'respiratory'},
 reg:{bulbar:['Bulbar','speech, swallowing'],cervical:['Cervical','arms and hands'],thoracic:['Thoracic','trunk, breathing'],lumbosacral:['Lumbosacral','legs and feet']},
 state:{no:'not yet',start:'starting',yes:'involved'},
 order:['ORDER OF SPREAD','illustrative, one common pattern'],
 axis:['MONTHS FROM ONSET','schematic: London means, people who had died'],
 ms:[[13.5,'diagnosis',0],[17.7,'2nd region',1],[23.3,'3rd region',0],[27.7,'gastrostomy',1],[30.3,'NIV',0]],
 ticks:[0,12,24,36],
 month:m=>`month ${m}`,
 read:(o,m,n,k)=>`<span>onset <b>${o}</b></span><span>month <b>${m}</b> (schematic)</span><span><b>${n} of ${k}</b> regions involved</span>`,
 /* key numbers */
 cards:[
  {k:'New cases each year',num:'1.6–2.2',u:'per 100,000',txt:`European registers give about 2.1-2.2 new cases per 100,000 person-years; worldwide meta-analyses 1.59-1.75 [[Logroscino2010,Chio2013,Marin2017,Xu2020]]. Incidence rises with age up to 70-79 years [[Xu2020]] and falls quickly after 80 [[Logroscino2010]].`},
  {k:'Living with ALS at one time',num:'4.4–5.4',u:'per 100,000',txt:`Prevalence was 5.2 in the US in 2016, a median 5.40 in Europe and 4.42 worldwide [[Mehta2022,Chio2013,Xu2020]]. It is low compared with the lifetime risk because survival is short [[Fang2017]].`},
  {k:'Lifetime risk',num:'1 in 350',u:'men',txt:`In UK primary care data the lifetime risk of motor neuron disease was 1 in 350 men and 1 in 472 women [[Alonso2009]]. An Irish register gives 1 in 347 men and 1 in 436 women [[Ryan2019]].`},
  {k:'Men to women',num:'1.35',u:'to 1',txt:`The overall standardised male-to-female ratio is 1.35 [[Feldman2022]]. It depends on age: in south-east England the adjusted ratio fell from 2.5 under age 51 to 1.4 at older ages [[Manjaly2010]]. It was 1.9 in limb onset and 0.9 in bulbar onset at a London clinic [[Roche2012]].`},
  {k:'Age at onset',num:'57–64',u:'years, mean',txt:`Mean onset was 57.4 years at a London tertiary clinic, 58.7 in Uruguay and 63.9 in the Irish population register [[Roche2012,Vazquez2008,Ryan2019]]. Clinics tend to see younger people than registers do [[Manjaly2010]].`},
  {k:'Median survival',num:'2–4',u:'years from onset',txt:`Median survival is 2-4 years [[Feldman2022]]. Across studies, medians from onset to death range from 20 to 48 months [[Chio2009]]. Older age and bulbar onset consistently predict a shorter course [[Chio2009]].`},
  {k:'Alive at 5 and 10 years',num:'23% · 12%',u:'from diagnosis',txt:`In the Lombardy register, 76.2% were alive 1 year after diagnosis, 23.4% at 5 years and 11.8% at 10 years [[Pupillo2014]]. A later analysis of the same register found 7% at 10 years and 3% at 15 years [[Pupillo2025]].`},
  {k:'Time to diagnosis',num:'11.5',u:'months, median',txt:`Median time from first symptom to diagnosis was 11.5 months at a US centre [[Paganoni2014]], and 11-16 months at a London clinic depending on the group [[Roche2012]]. Bulbar onset was diagnosed about 4.4 months faster [[Saeed2026]].`}
 ],
 dis:[
  {t:'How many new cases a year?',txt:`European registers give about 2.1-2.2 per 100,000 person-years [[Logroscino2010,Chio2013]]. Worldwide meta-analyses give 1.6-1.75 [[Marin2017,Xu2020]], the US Registry about 1.5-1.7 [[Mehta2022inc]], and the GBD model 0.78 [[GBD2016MND2018]]. The US Registry calls its count conservative [[Mehta2022]], and GBD is a model that pools all motor neuron diseases.`},
  {t:'Familial: 5% or 10%?',txt:`A meta-analysis found familial ALS in 5.1% of people in prospective population registers and 4.6% across all studies, "not 10% as is often stated" [[Byrne2011]]. The 1993 SOD1 paper said about 10% [[Rosen1993]], and a 2022 seminar says 10-15% [[Feldman2022]]. Part of the gap is the definition: whether relatives with frontotemporal dementia count, and how many generations are asked about [[Feldman2022,Byrne2011]]. <a href="#genes" data-go="genes">Genes</a>`},
  {t:'Ancestry or ascertainment?',txt:`Standardised incidence was 1.89 in North Europe against 0.83 in East Asia and 0.73 in South Asia [[Marin2017]]. People in Germany had older onset (66.6 against 53.2 years) and more bulbar onset (35.9% against 22.8%) than people in China [[Feldman2022]]. These gaps are put down variously to ancestry, environment or study design, and the authors of the meta-analysis call for an international consortium to test ancestry [[Marin2017]].`},
  {t:'How many live past 10 years?',txt:`A review says 10-20% survive more than 10 years [[Chio2009]]. Population data from Lombardy give 11.8% at 10 years from diagnosis [[Pupillo2014]] and, in a later analysis, 7% [[Pupillo2025]]. The figures come from different settings and starting points.`}
 ],
 /* incidence and prevalence by source */
 meas:[['inc','New cases a year'],['prev','Living with ALS']],
 unit:{inc:'per 100,000 person-years (or population)',prev:'per 100,000 people'},
 model:'model',
 bars:{
  inc:[
   {n:'Europe, EURALS registers',s:'Ireland, UK, Italy · 1998-99',v:2.16,txt:`Crude incidence 2.16 per 100,000 person-years (95% CI 2.0-2.3) in adults, from 1028 new cases in a population of almost 24 million. It was 3.0 in men and 2.4 in women [[Logroscino2010]].`},
   {n:'Europe, systematic review',s:'1995-2011 · median',v:2.08,txt:`Median incidence 2.08 per 100,000 (IQR 1.47-2.43), about 15,355 new cases a year at 2010 populations [[Chio2013]].`},
   {n:'North Europe',s:'world meta-analysis · standardised',v:1.89,txt:`Standardised incidence 1.89 (1.46-2.32). Europe, North America and New Zealand together were homogeneous at 1.81 [[Marin2017]].`},
   {n:'World, 44 studies',s:'to 2015 · crude',v:1.75,txt:`Pooled crude incidence 1.75 per 100,000 person-years (1.55-1.96) from 13,146 cases, or 1.68 standardised to the 2010 US population [[Marin2017]].`},
   {n:'United States registry',s:'2014 · age-adjusted',v:1.7,txt:`1.7 in 2014, then 1.5 in 2015 and 2016. The Registry combines administrative data with voluntary self-enrolment [[Mehta2022inc]] and calls its count conservative [[Mehta2022]].`},
   {n:'World, 110 studies',s:'to 2018 · crude',v:1.59,txt:`Overall crude incidence 1.59 per 100,000 person-years (1.39-1.81) [[Xu2020]].`},
   {n:'Uruguay, whole country',s:'2002-03',v:1.37,txt:`Mean annual incidence 1.37 per 100,000: 1.95 in men and 0.84 in women [[Vazquez2008]].`},
   {n:'East Asia',s:'China, Japan · standardised',v:.83,txt:`Standardised incidence 0.83 (0.42-1.24) [[Marin2017]].`},
   {n:'South Asia',s:'Iran · standardised',v:.73,txt:`Standardised incidence 0.73 (0.58-0.89) [[Marin2017]].`},
   {n:'World, GBD 2016',s:'all motor neuron diseases',v:.78,m:1,txt:`All-age incidence 0.78 per 100,000 person-years (0.71-0.86), about 57,452 new cases in 2016. This is a model that pools ALS with spinal muscular atrophy, hereditary spastic paraplegia and other motor neuron diseases [[GBD2016MND2018]].`}],
  prev:[
   {n:'Europe, systematic review',s:'1995-2011 · median',v:5.4,txt:`Median prevalence 5.40 per 100,000 (IQR 4.06-7.89), about 39,863 people [[Chio2013]].`},
   {n:'United States registry',s:'2016 · age-adjusted',v:5.2,txt:`16,424 adults met the Registry definition, an age-adjusted prevalence of 5.2 per 100,000. Men had higher prevalence than women in every data source [[Mehta2022]].`},
   {n:'World, 58 studies',s:'crude',v:4.42,txt:`Crude prevalence 4.42 per 100,000 (3.92-4.96) [[Xu2020]].`},
   {n:'Uruguay',s:'31 Dec 2002 · crude',v:1.9,txt:`Crude prevalence 1.9 per 100,000 [[Vazquez2008]].`},
   {n:'World, GBD 2016',s:'all-age, all MND',v:4.5,m:1,txt:`330,918 people had a motor neuron disease in 2016, an all-age prevalence of 4.5 per 100,000 [[GBD2016MND2018]].`},
   {n:'High-income North America',s:'GBD · age-standardised',v:16.8,m:1,txt:`GBD's age-standardised prevalence was 16.8 per 100,000 here, 14.7 in Australasia and 12.9 in western Europe. GBD pools all motor neuron diseases and uses a different method, so this is not directly comparable with the US Registry figure of 5.2 [[GBD2016MND2018,Mehta2022]].`}]},
 barsMax:{inc:2.4,prev:18},
 barIntro:{inc:'Tap a bar. Grey bars are model estimates.',prev:'Tap a bar. Grey bars are model estimates that pool all motor neuron diseases.'},
 /* phenotypes */
 sig:{yes:'present',no:'absent',later:'absent at first',few:'mild or absent'},
 umnL:'Upper motor neuron signs',lmnL:'Lower motor neuron signs',ftdL:'Frontotemporal dementia',ftdV:'yes',
 survT:['MEDIAN SURVIVAL FROM ONSET','London cohort, months'],
 survRow:{bulbar:'Bulbar onset',limb:'Limb onset',flailArm:'Flail arm',flailLeg:'Flail leg'},
 survV:(m,p)=>`${m} mo · ${p}% at 5 y`,
 survNone:'No median in this cohort for this pattern',
 frontal:'frontal lobes'
};
const WH_SURV=[['bulbar',27,8.8],['limb',35,20],['flailArm',61,52],['flailLeg',69,64]];
const WH_PH=[
 {id:'classic',n:'Classic limb onset',f:{cervical:1,lumbosacral:.55,bulbar:.25,thoracic:.25},u:'yes',l:'yes',sv:'limb',
  txt:`Weakness starts in an arm or a leg, with both upper and lower motor neuron signs. Limb onset was 74.6% of people at a London clinic [[Roche2012]]; in a French incident cohort, lumbar onset was 28.2% and cervical onset 23.1% [[Hamidou2017]]. In another London cohort, median survival from onset was 35 months and 20% were alive at 5 years (31 months in Melbourne) [[Wijesekera2009]].`},
 {id:'bulbar',n:'Bulbar onset',f:{bulbar:1,cervical:.25,thoracic:.15,lumbosacral:.1},u:'yes',l:'yes',sv:'bulbar',
  txt:`Slurred speech or trouble swallowing comes first. Bulbar onset was 25.4% at a London clinic, 33.0% in France, 31% and 35.3% in Irish cohorts and 22.7% in an African hospital cohort [[Roche2012,Hamidou2017,Rooney2017,Elamin2011,Luna2019]]. Median survival from onset was 27 months, with 8.8% alive at 5 years [[Wijesekera2009]]. A less common form, pseudobulbar palsy, has mostly upper motor neuron bulbar features that spread slowly to the limbs [[Feldman2022]].`},
 {id:'pls',n:'Primary lateral sclerosis (PLS)',f:{lumbosacral:.85,cervical:.4,bulbar:.3,thoracic:.1},u:'yes',l:'later',sv:null,
  txt:`Only upper motor neuron signs at first: spasticity and brisk reflexes [[Feldman2022]]. Of 29 people with only UMN signs at their first assessment, 13 later developed LMN signs, at about 3.2 to 3.7 years. Clinically pure PLS can be defined by isolated UMN signs 4 years after onset, and survival is longer than in ALS [[Gordon2006]]. Pseudobulbar affect (uncontrolled laughing or crying) was recorded in 31 of 50 people with PLS at one clinic [[Floeter2014]].`},
 {id:'pma',n:'Progressive muscular atrophy (PMA)',f:{cervical:.8,lumbosacral:.6,bulbar:.15,thoracic:.15},u:'later',l:'yes',sv:null,
  txt:`Only lower motor neuron signs at first: weakness, wasting and fasciculations. In London, PMA not classed as flail arm or flail leg was 4% and had a prognosis similar to typical limb-onset ALS [[Wijesekera2009]]. In a New York centre, people with PMA were more often male and older and lived longer; 22% developed UMN signs within 61 months, and the authors conclude that PMA should be considered a form of ALS [[Kim2009]].`},
 {id:'flailArm',n:'Flail arm',f:{cervical:1},u:'few',l:'yes',sv:'flailArm',
  txt:`Weakness and wasting stay mostly in both arms for a long time. Flail arm was 11% of a London cohort, with median survival of 61 months from onset (66 in Melbourne) and 52% alive at 5 years. Men outnumbered women 4 to 1 [[Wijesekera2009]]. Possible flail arm was 4.0% of a French incident cohort [[Hamidou2017]].`},
 {id:'flailLeg',n:'Flail leg',f:{lumbosacral:1},u:'few',l:'yes',sv:'flailLeg',
  txt:`Weakness and wasting stay mostly in the legs for a long time. Flail leg was 6% of a London cohort, with median survival of 69 months from onset (71 in Melbourne) and 64% alive at 5 years [[Wijesekera2009]]. It was 4.4% of a French incident cohort [[Hamidou2017]].`},
 {id:'resp',n:'Respiratory onset',f:{thoracic:1,cervical:.2},u:'yes',l:'yes',sv:null,
  txt:`The breathing muscles weaken first. Respiratory onset was 2.7% at a Canadian clinic and 2.1% in France. Only 14% presented acutely needing emergency intubation, and mean survival from onset to death or permanent ventilation was 27.0 months, close to bulbar onset [[Shoesmith2007,Hamidou2017]]. Outcomes were worst in respiratory and bulbar phenotypes in the Piedmont register [[Chio2011]].`},
 {id:'ftd',n:'ALS with frontotemporal dementia',f:{cervical:.6,bulbar:.5,lumbosacral:.3,thoracic:.2},u:'yes',l:'yes',d:1,sv:null,
  txt:`About 15% of people with ALS meet criteria for frontotemporal dementia (FTD), and changes in thinking or behaviour occur in 35-50% [[Feldman2022]]. FTD was found in about 14% of Irish incident cases [[Byrne2012]]. Comorbid FTD went with shorter survival (HR 2.67) [[Elamin2011]]. Half of C9orf72 expansion carriers had FTD, against 12% of non-carriers [[Byrne2012]]. <a href="#genes" data-go="genes">Genes</a> · <a href="#living" data-go="living">Living with ALS</a>`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');
  let onset='limb';
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  /* anchor points of each region in bodyMap's own coordinates */
  const ANC={bulbar:[12,-126],cervical:[50,-10],thoracic:[16,-42],lumbosacral:[16,50]};
  const ARM='M34 -58 l8 4 14 64 -10 3 -16 -52z';
  const START=[0,17.7,23.3,30.3];
  /* how much of each region is affected at month m */
  function fills(m){const O=WH_ONSET[onset].order,F={};
    O.forEach((r,k)=>{F[r]=k===0&&onset==='limb'?ramp(m,3,11):ramp(m,START[k],START[k]+7)});
    return F}
  function draw(t){
    const N=vb(svg,'720 400','400 650');
    const L=N?{fig:[92,162,1.0],lx:186,ly:{bulbar:30,thoracic:104,cervical:150,lumbosacral:222},
        oT:[16,298],oR:k=>336+k*42,oC:28,oN:48,oB:[226,384],
        aT:[16,520],aY:584,aX:[30,380],aL:[562,628],aTk:602}
      :{fig:[100,205,1.3],lx:205,ly:{bulbar:68,thoracic:126,cervical:172,lumbosacral:270},
        oT:[364,40],oR:k=>79+k*42,oC:376,oN:396,oB:[522,700],
        aT:[364,252],aY:330,aX:[372,700],aL:[308,368],aTk:348};
    const m=t*WH_M,O=WH_ONSET[onset].order,F=fills(m),[fx,fy,fs]=L.fig;
    const P=r=>[fx+ANC[r][0]*fs,fy+ANC[r][1]*fs];
    let s=`<defs>${marker('whArr','var(--tdp)')}</defs>`;
    /* right-hand (or lower) panel backdrop */
    s+=N?`<rect x="6" y="276" width="388" height="200" rx="12" style="fill:var(--field);stroke:var(--line)"/><rect x="6" y="494" width="388" height="150" rx="12" style="fill:var(--field);stroke:var(--line)"/>`
        :`<rect x="350" y="16" width="364" height="210" rx="12" style="fill:var(--field);stroke:var(--line)"/><rect x="350" y="232" width="364" height="156" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    /* the body */
    s+=bodyMap(fx,fy,fs,F,{hide:true});
    if(onset==='limb'){const a=ramp(m,0,3.5)*(1-.6*ramp(m,8,11));
      s+=`<path d="${ARM}" transform="translate(${f1(fx)} ${f1(fy)}) scale(${f1(fs)})" style="fill:var(--tdp);opacity:${f1(.7*a)}"/>`}
    /* labels with leaders */
    ['bulbar','thoracic','cervical','lumbosacral'].forEach(r=>{const [ax,ay]=P(r),y=L.ly[r];
      s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="2.6" style="fill:var(--ink)"/>`+LN(ax,ay,L.lx-6,y-4,'stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3');
      s+=T(L.lx,y,'t-lbl','',WH_TXT.reg[r][0])+T(L.lx,y+14,'t-xs','',WH_TXT.reg[r][1])});
    /* the newest region pulses; an arrow shows each step of spread */
    let cur=0;O.forEach((r,k)=>{if(m>=START[k])cur=k});
    const fr=F[O[cur]];
    if(fr<1){const ph=(m*0.9)%1,[ax,ay]=onset==='limb'&&cur===0?[fx+46*fs,fy-12*fs]:P(O[cur]);
      s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(6+16*ph)}" style="fill:none;stroke:var(--tdp);stroke-width:2;opacity:${f1(.85*(1-ph))}"/>`}
    for(let k=1;k<4;k++){const o=bump(m,START[k]-2,START[k]+6);if(o<.02)continue;
      const Q=r=>[fx-ANC[r][0]*fs,fy+ANC[r][1]*fs],[x1,y1]=Q(O[k-1]),[x2,y2]=Q(O[k]),cx=fx-(Math.abs(y2-y1)>60?95:60)*fs,cy=(y1+y2)/2;
      s+=`<path d="M${f1(x1)} ${f1(y1)} Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:var(--tdp);stroke-width:2.2;opacity:${f1(o)}" marker-end="url(#whArr)"/>`}
    /* order of spread */
    s+=T(L.oT[0],L.oT[1],'t-sm','fill:var(--ink);font-weight:600',WH_TXT.order[0])+T(L.oT[0],L.oT[1]+14,'t-xs','',WH_TXT.order[1]);
    let inv=0;
    O.forEach((r,k)=>{const y=L.oR(k),v=F[r],st=v<=0?'no':v<1?'start':'yes';if(v>0)inv++;
      s+=`<circle cx="${L.oC}" cy="${y-4}" r="11" style="fill:${v>0?'var(--tdp-soft)':'var(--panel)'};stroke:${v>0?'var(--tdp)':'var(--line)'};stroke-width:1.6"/>`+T(L.oC,y,'t-sm t-mid','fill:var(--ink);font-weight:600',k+1);
      s+=T(L.oN,y-2,'t-lbl','',WH_TXT.reg[r][0])+T(L.oN,y+12,'t-xs',v>0?'fill:var(--tdp)':'',WH_TXT.state[st]);
      const bw=L.oB[1]-L.oB[0];
      s+=`<rect x="${L.oB[0]}" y="${y-9}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.oB[0]}" y="${y-9}" width="${f1(bw*v)}" height="10" rx="5" style="fill:var(--tdp)"/>`});
    /* month axis */
    const X=mm=>lerp(L.aX[0],L.aX[1],mm/WH_M);
    s+=T(L.aT[0],L.aT[1],'t-sm','fill:var(--ink);font-weight:600',WH_TXT.axis[0])+T(L.aT[0],L.aT[1]+14,'t-xs','',WH_TXT.axis[1]);
    s+=LN(L.aX[0],L.aY,L.aX[1],L.aY,'stroke:var(--muted);stroke-width:1.4');
    WH_TXT.ticks.forEach(k=>{const x=X(k);s+=LN(x,L.aY,x,L.aY+5,'stroke:var(--muted)')+T(x,L.aTk,'t-xs t-mid','',k)});
    WH_TXT.ms.forEach(([mm,lb,row])=>{const x=X(mm),pass=m>=mm-.05;
      s+=row?LN(x,L.aY,x,L.aL[1]-11,`stroke:${pass?'var(--ink)':'var(--line)'};stroke-width:1.4`):LN(x,L.aL[0]+4,x,L.aY,`stroke:${pass?'var(--ink)':'var(--line)'};stroke-width:1.4`);
      s+=T(x,L.aL[row],'t-xs t-mid',pass?'fill:var(--ink);font-weight:600':'',lb)});
    const xp=X(m);
    s+=`<rect x="${f1(L.aX[0])}" y="${L.aY-3}" width="${f1(Math.max(0,xp-L.aX[0]))}" height="6" rx="3" style="fill:var(--tdp);opacity:.55"/>`;
    s+=`<path d="M${f1(xp-6)} ${L.aY-15} L${f1(xp+6)} ${L.aY-15} L${f1(xp)} ${L.aY-5}Z" style="fill:var(--ink)"/>`;
    s+=T(L.aX[1],L.aT[1],'t-sm t-end','fill:var(--tdp);font-weight:600',WH_TXT.month(Math.round(m)));
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);
    $('#whNote').innerHTML=noteHTML(Object.assign({},WH_STEPS[p],WH_ONSET[onset].steps[p]));
    $('#whRead').innerHTML=WH_TXT.read(WH_TXT.onsetName[onset],Math.round(m),inv,4);
  }
  const stop=playWire(rg,$('#whPlay'),draw,16000,UI.replay,'what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  toggleRow($('#whOnset'),WH_TXT.onsets,onset,v=>{onset=v;stop();draw(+rg.value)});
  draw(+rg.value);

  /* ---- key numbers and disagreements ---- */
  $('#whCards').innerHTML=WH_TXT.cards.map(c=>`<div class="card"><div class="kicker">${c.k}</div><div class="wh-num">${c.num}<small>${c.u}</small></div><p>${c.txt}</p></div>`).join('');
  $('#whDis').innerHTML=WH_TXT.dis.map(c=>`<div class="card wh-dis"><h4>${c.t}</h4><p>${c.txt}</p></div>`).join('');

  /* ---- incidence and prevalence by source ---- */
  let meas='inc';
  function bars(sel){const B=WH_TXT.bars[meas],mx=WH_TXT.barsMax[meas];
    $('#whBars').innerHTML=B.map((b,i)=>`<button class="wh-bar${b.m?' model':''}" data-b="${i}" aria-pressed="${i===sel}"><span>${b.n}<small>${b.s}${b.m?' · '+WH_TXT.model:''}</small></span><span class="tr"><i data-w="${f1(100*b.v/mx)}"></i></span><span class="v">${b.v}</span></button>`).join('');
    requestAnimationFrame(()=>$$('#whBars .tr i').forEach(i=>i.style.width=i.dataset.w+'%'));
    barNote(sel)}
  function barNote(i){const b=WH_TXT.bars[meas][i];
    $('#whBarNote').innerHTML=`<div class="kicker">${WH_TXT.unit[meas]}</div><h4>${b.n}: ${b.v}</h4><p>${b.txt}</p><p class="stage-cap">${WH_TXT.barIntro[meas]}</p>`}
  $('#whBars').addEventListener('click',e=>{const b=e.target.closest('[data-b]');if(!b)return;$$('#whBars [data-b]').forEach(x=>x.setAttribute('aria-pressed',x===b));barNote(+b.dataset.b)});
  toggleRow($('#whMeas'),WH_TXT.meas,meas,v=>{meas=v;bars(0)});
  bars(0);

  /* ---- phenotype explorer ---- */
  const ps=$('#whPhSvg');let ph=WH_PH[0],grow=1,stopG=null;
  function drawPh(){
    const N=vb(ps,'720 300','400 530');
    const L=N?{fig:[78,178,.95],pX:170,pW:222,pY:56,sT:[16,316],sR:k=>352+k*40,sB:[16,384],nY:512}
      :{fig:[100,170,.95],pX:210,pW:230,pY:40,sT:[470,40],sR:k=>78+k*46,sB:[470,710],nY:270};
    const F={};Object.keys(ph.f).forEach(k=>F[k]=ph.f[k]*grow);
    let s=bodyMap(L.fig[0],L.fig[1],L.fig[2],F,{hide:true});
    if(ph.d){const hx=L.fig[0],hy=L.fig[1]-138*L.fig[2];
      s+=`<ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="${f1(13*L.fig[2])}" ry="${f1(7*L.fig[2])}" style="fill:var(--umn);opacity:${f1(.75*grow)}"/>`;
      s+=T(hx+20,hy-6,'t-xs','fill:var(--umn)',WH_TXT.frontal)}
    const pill=(y,lb,val,col,on)=>`<rect x="${L.pX}" y="${y}" width="${L.pW}" height="34" rx="9" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:${on?2:1}"/>`
      +`<rect x="${L.pX}" y="${y}" width="6" height="34" rx="3" style="fill:${on?col:'var(--line)'}"/>`
      +T(L.pX+14,y+13,'t-xs','',lb)+T(L.pX+14,y+28,'t-lbl',on?'':'fill:var(--muted)',val);
    s+=pill(L.pY,WH_TXT.umnL,WH_TXT.sig[ph.u],'var(--umn)',ph.u==='yes');
    s+=pill(L.pY+42,WH_TXT.lmnL,WH_TXT.sig[ph.l],'var(--lmn)',ph.l==='yes');
    if(ph.d)s+=pill(L.pY+84,WH_TXT.ftdL,WH_TXT.ftdV,'var(--umn)',true);
    /* survival bars: label left, value right, bar underneath */
    s+=T(L.sT[0],L.sT[1],'t-sm','fill:var(--ink);font-weight:600',WH_TXT.survT[0])+T(L.sT[0],L.sT[1]+13,'t-xs','',WH_TXT.survT[1]);
    const bw=L.sB[1]-L.sB[0];
    WH_SURV.forEach(([id,mo,p5],k)=>{const y=L.sR(k),on=ph.sv===id,hi=on?'fill:var(--ink);font-weight:700':'';
      s+=T(L.sB[0],y,'t-xs',hi,WH_TXT.survRow[id])+T(L.sB[1],y,'t-xs t-end',hi,WH_TXT.survV(mo,p5));
      s+=`<rect x="${L.sB[0]}" y="${y+6}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.sB[0]}" y="${y+6}" width="${f1(bw*mo/72*(on?grow:1))}" height="10" rx="5" style="fill:${on?'var(--tdp)':'var(--muted)'};opacity:${on?1:.45}"/>`});
    if(!ph.sv)s+=T(L.sB[0],L.nY,'t-xs','fill:var(--ink)',WH_TXT.survNone);
    ps.innerHTML=s;
  }
  function pickPh(id){ph=WH_PH.find(p=>p.id===id);if(stopG)stopG();grow=.3;
    stopG=animate(650,q=>{grow=.3+.7*ease(q);drawPh()},()=>{stopG=null});
    $('#whPhNote').innerHTML=`<div class="kicker">${WH_TXT.umnL}: ${WH_TXT.sig[ph.u]} · ${WH_TXT.lmnL}: ${WH_TXT.sig[ph.l]}</div><h4>${ph.n}</h4><p>${ph.txt}</p>`}
  toggleRow($('#whPh'),WH_PH.map(p=>[p.id,p.n]),ph.id,pickPh);
  pickPh(ph.id);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawPh()};
};
