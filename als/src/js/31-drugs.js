/* =============== 3.1 riluzole, edaravone and others =============== */
const DR_STEPS=[
 {from:0,at:.06,k:'Step 1 · A normal signal',t:'Glutamate carries the signal',
  txt:'A glutamate-releasing nerve terminal excites the motor neuron. Glutamate opens AMPA and NMDA receptors on the motor neuron, and the astrocyte next to the synapse clears it from the cleft through its transporter EAAT2 (called GLT-1 in rodents). [[Taylor2016,Rothstein1995]]',
  pt:'Nerve cells pass a signal with a chemical called glutamate. A helper cell, the astrocyte, mops it up after each signal.'},
 {from:.16,at:.24,k:'Step 2 · Excitotoxicity',t:'Too much glutamate',
  txt:'<span class="ev hyp">Hypothesis, causal role unproven</span> In tissue from people with ALS, high-affinity glutamate transport was reduced by 59% in spinal cord and 70% in motor cortex, but not in brain areas that ALS spares. [[Rothstein1992]] EAAT2 itself was reduced by 71% in ALS motor cortex; the authors could not tell whether the loss is a cause or a consequence. [[Rothstein1995]] In the drawing, three of four transporters fade, so glutamate lingers and keeps the receptors open. Ceftriaxone, given to raise EAAT2 uptake, did not slow ALS in a phase 3 trial of 513 people. [[Cudkowicz2014]]',
  pt:'The mopping-up works less well, so glutamate builds up and keeps over-exciting the motor neuron.'},
 {from:.32,at:.4,k:'Step 3 · Calcium',t:'Calcium floods in',
  txt:'When glutamate is not cleared the neuron fires repeatedly and calcium flows in. [[Taylor2016]] Spinal motor neurons are thought to be vulnerable because they have calcium-permeable AMPA receptors, little calcium buffering and a heavy reliance on mitochondria to soak calcium up. [[Nijssen2017]] Astrocytes normally make motor neurons produce GluR2, which lowers AMPA-receptor calcium permeability; astrocytes carrying mutant SOD1 fail to. [[Taylor2016]]',
  pt:'Too much calcium gets into the motor neuron, and motor neurons are poor at handling it.'},
 {from:.48,at:.56,k:'Step 4 · Oxidative stress',t:'Free radicals',
  txt:'Calcium overload stresses the endoplasmic reticulum and the mitochondria. [[Taylor2016]] Markers of oxidative damage are raised in ALS spinal cord and CSF, but antioxidant trials in people have so far been disappointing. [[Barber2010]]',
  pt:'The cell\'s power stations, the mitochondria, come under strain and leak damaging molecules called free radicals.'},
 {from:.68,at:.8,k:'Step 5 · The drugs',t:'Where the drugs are thought to act',
  txt:'Riluzole was developed as an anti-glutamate agent and edaravone as a free-radical scavenger. [[Doble1996,Watanabe2018]] Both US labels say the mechanism by which the drug works in ALS is unknown. [[FDA_RiluzoleLabel,FDA_RadicavaLabel]] Riluzole adds about 2 to 3 months of median survival in the trials. [[Miller2012Cochrane]] Use the overlay buttons to see each drug\'s proposed site.',
  pt:'The approved drugs slow ALS a little; none stops it.',
  hook:'Riluzole: anti-glutamate (sodium channels, glutamate release, NMDA block). Edaravone: free-radical scavenger. For both, the US label says the mechanism in ALS is unknown.'}
];
const DR_DRUG={
 none:'',
 rilu:'<b>Riluzole overlay.</b> In laboratory studies riluzole inhibits glutamate release, partly by inactivating voltage-dependent sodium channels on glutamate-releasing terminals, and it blocks NMDA receptors noncompetitively. [[Doble1996]] At therapeutic concentrations it blocks the persistent sodium current in rat cortical neurons. [[Urbani2000]] The EU label describes it as "inhibiting glutamate processes"; the US label says its mechanism in ALS is unknown. [[EMA_Rilutek,FDA_RiluzoleLabel]]',
 eda:'<b>Edaravone overlay.</b> Edaravone is a free-radical scavenger, approved in Japan for acute ischaemic stroke since 2001. [[PMDA2015Radicut]] It scavenges peroxyl radicals by donating an electron. [[Watanabe2018]] The US label says the mechanism by which it works in ALS is unknown. [[FDA_RadicavaLabel]]'
};
const DR_TXT={
 drugs:[ ['none','No drug'],['rilu','Riluzole'],['eda','Edaravone'] ],
 pre:'glutamate terminal',post:'motor neuron',astro:'astrocyte',eaat:'EAAT2',ampa:'AMPA',nmda:'NMDA',
 mito:'mitochondrion',na:'Na⁺ channel',cleft:'cleft',ca:'Ca²⁺',ros:'free radicals',
 rilu:'riluzole',eda:'edaravone',
 gauges:['Glutamate in the cleft','Calcium in the neuron','Free radicals'],low:'low',high:'high',
 schem:'Direction only, no units',
 ovTitle:{none:'No drug shown',rilu:'Riluzole overlay',eda:'Edaravone overlay'},
 ovLines:{none:['Choose riluzole or edaravone','to see the proposed site.'],
  rilu:['Proposed: blocks Na⁺ channels,','less glutamate released,','NMDA receptor block.'],
  eda:['Proposed: scavenges','free radicals.']},
 unknown:['US label: mechanism','in ALS is unknown.'],
 cap:{none:'No drug overlay.',rilu:'Riluzole overlay: fewer glutamate packets per signal.',eda:'Edaravone overlay: free radicals neutralised.'},
 capTail:'Schematic, not to scale. The gauges show direction only, not measured amounts.',
 /* timeline */
 lanes:{fda:'FDA (US)',ema:'EMA (EU)',hc:'Health Canada',jp:'Japan',tr:'Trial results'},
 st:{ok:'Approved',cond:'Conditional, accelerated or exceptional approval',no:'Refused, or application withdrawn',out:'Withdrawn from the market',pos:'Trial: positive primary result',neg:'Trial: primary endpoint not met',none:'Where things stand'},
 codes:[ ['R','riluzole'],['E','edaravone'],['A','AMX0035'],['T','tofersen'],['M','masitinib'],['B','methylcobalamin'],['N','dextromethorphan-quinidine'] ],
 scale:'axis stretched after 2015',
 before:'Before the first approval',
 head:(date,lane)=>lane?`${date} · ${lane}`:date
};
const DR_EV=[
 {d:[1995,12,12],l:'fda',c:'R',s:'ok',date:'12 December 1995',h:'Rilutek (riluzole) tablets approved',
  txt:'The FDA approved riluzole tablets for ALS, the first drug for the disease. The US indication reads "treatment of amyotrophic lateral sclerosis (ALS)". [[DrugsFDA,FDA_RiluzoleLabel]]'},
 {d:[1996,6,10],l:'ema',c:'R',s:'ok',date:'10 June 1996',h:'Rilutek authorised in the EU',
  txt:'The EU indication is "to extend life or the time to mechanical ventilation". The CHMP opinion was dated 14 February 1996. [[EMA_Rilutek]]'},
 {d:[2010,10,29],l:'fda',c:'N',s:'ok',date:'29 October 2010',h:'Nuedexta approved for pseudobulbar affect',
  txt:'Dextromethorphan-quinidine treats pseudobulbar affect (uncontrollable laughing or crying); it does not slow ALS. [[DrugsFDA,Brooks2004]]'},
 {d:[2015,6,5],l:'jp',c:'E',s:'ok',date:'June 2015',h:'Edaravone (Radicut) for ALS in Japan',
  txt:'The PMDA First Committee on New Drugs backed the ALS indication on 5 June 2015, and edaravone was approved for ALS in Japan that year. [[PMDA2015Radicut,Watanabe2018]] The exact approval date is not given here because it could not be checked at the regulator.'},
 {d:[2017,5,5],l:'fda',c:'E',s:'ok',date:'5 May 2017',h:'Radicava (edaravone) IV approved',
  txt:'Approved on one positive 137-person trial in a selected early-stage group (MCI186-19). The US indication is not restricted to that group. [[DrugsFDA,MCI186Group2017,FDA_RadicavaLabel]]'},
 {d:[2017,7,1],l:'tr',c:'E',s:'pos',date:'Published 2017',h:'MCI186-19: edaravone positive in a selected group',
  txt:'ALSFRS-R change at 24 weeks −5.01 vs −7.50, difference 2.49 (95% CI 0.99 to 3.98), in people chosen by criteria from a post hoc analysis of the earlier negative trial. [[MCI186Group2017,EdaravoneALS16Group2017]]'},
 {d:[2018,7,26],l:'ema',c:'M',s:'no',date:'26 July 2018',h:'Alsitek (masitinib) refused in the EU',
  txt:'Negative opinion on 18 April 2018, refusal on 26 July 2018, citing inspection findings at two sites and an "arbitrary" patient grouping. [[EMA_Masitinib]]'},
 {d:[2018,9,5],l:'fda',c:'R',s:'ok',date:'5 September 2018',h:'Tiglutik (riluzole oral suspension) approved',
  txt:'A liquid form, 5 mg/mL (50 mg = 10 mL twice daily), which can be given by mouth or through a PEG tube. [[DrugsFDA,FDA_TiglutikLabel]]'},
 {d:[2018,10,3],l:'hc',c:'E',s:'ok',date:'3 October 2018',h:'Radicava authorised in Canada',
  txt:'Health Canada issued a Notice of Compliance for Radicava. That date comes from Health Canada summaries that were not read in full; Health Canada\'s drug database lists it on the market from 29 October 2019. [[HC2018Radicava,HCDPD_Radicava]]'},
 {d:[2019,5,24],l:'ema',c:'E',s:'no',date:'24 May 2019',h:'Radicava EU application withdrawn',
  txt:'The company withdrew its application. The CHMP\'s provisional view was that it "could not have been approved": one small main study, an imbalance favouring milder disease in the edaravone arm, 24 weeks too short to show lasting benefit, and an uninterpretable registry comparison. [[EMA2019Radicava]]'},
 {d:[2019,11,22],l:'fda',c:'R',s:'ok',date:'22 November 2019',h:'Exservan (riluzole oral film) approved',
  txt:'An oral film form of riluzole. Drugs@FDA now lists it as discontinued. [[DrugsFDA]]'},
 {d:[2020,9,1],l:'tr',c:'A',s:'pos',date:'Published 2020',h:'CENTAUR: AMX0035 positive in phase 2',
  txt:'137 people: ALSFRS-R slope −1.24 vs −1.66 points/month, difference 0.42 (95% CI 0.03 to 0.81; P = 0.03). Secondary outcomes did not differ. [[Paganoni2020]]'},
 {d:[2022,5,12],l:'fda',c:'E',s:'ok',date:'12 May 2022',h:'Radicava ORS (oral edaravone) approved',
  txt:'Approved on a bioavailability bridge: 105 mg by mouth, fasting, gave the same exposure as 60 mg IV. [[DrugsFDA,FDA_RadicavaLabel]]'},
 {d:[2022,6,1],l:'hc',c:'A',s:'cond',date:'1 June 2022',h:'Albrioza (AMX0035) authorised with conditions in Canada',
  txt:'A Notice of Compliance with conditions, depending on a phase 3 confirmatory trial. [[HC_Albrioza]]'},
 {d:[2022,9,22],l:'tr',c:'T',s:'neg',date:'Published 2022',h:'VALOR: tofersen misses its clinical endpoint',
  txt:'ALSFRS-R difference 1.2 points (95% CI −3.2 to 5.5; P = 0.97) at 28 weeks, while CSF SOD1 and plasma NfL fell. [[Miller2022]] See <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>.'},
 {d:[2022,9,29],l:'fda',c:'A',s:'ok',date:'29 September 2022',h:'Relyvrio (AMX0035) approved',
  txt:'Approved on the phase 2 CENTAUR data, before the phase 3 result. [[DrugsFDA,Paganoni2020]]'},
 {d:[2023,4,25],l:'fda',c:'T',s:'cond',date:'25 April 2023',h:'Qalsody (tofersen): accelerated approval',
  txt:'For adults with SOD1-ALS, based on reduction in plasma neurofilament light chain; the presymptomatic ATLAS trial is the confirmatory study. [[DrugsFDA,FDA2023Qalsody,Biogen2023]]'},
 {d:[2024,1,5],l:'ema',c:'A',s:'no',date:'5 January 2024',h:'Albrioza (AMX0035) refused in the EU',
  txt:'Negative opinion 22 June 2023, confirmed on re-examination 12 October 2023, refusal 5 January 2024. The main study did not convincingly show slowing, and the survival data were judged unreliable. [[EMA2023Albrioza]]'},
 {d:[2024,3,8],l:'tr',c:'A',s:'neg',date:'8 March 2024',h:'PHOENIX: AMX0035 negative in phase 3',
  txt:'664 adults, 48 weeks: the primary endpoint (ALSFRS-R change, p = 0.667) and all secondary endpoints were missed. [[Amylyx2024,CTgov_PHOENIX]]'},
 {d:[2024,4,4],l:'fda',c:'A',s:'out',date:'4 April 2024',h:'Relyvrio withdrawal begins in the US',
  txt:'Amylyx began voluntary withdrawal, stopped new starts that day and moved existing users to a free-drug programme. [[Amylyx2024]]'},
 {d:[2024,4,7],l:'hc',c:'A',s:'out',date:'4 April 2024',h:'Albrioza withdrawal begins in Canada',
  txt:'Withdrawal began on the same day. Health Canada confirmed it would leave the Canadian market by 31 December 2024. [[Amylyx2024,HC_Albrioza]]'},
 {d:[2024,5,29],l:'ema',c:'T',s:'cond',date:'29 May 2024',h:'Qalsody authorised in the EU, exceptional circumstances',
  txt:'Positive CHMP opinion 22 February 2024. Obligations include long-term data, a study in presymptomatic carriers and a registry with yearly reports. [[EMA2024Qalsody]]'},
 {d:[2024,8,26],l:'jp',c:'B',s:'ok',date:'26 August 2024',h:'Ultra-high-dose methylcobalamin backed in Japan',
  txt:'The Japanese committee backed Rozebalamin for Injection 25 mg for slowing functional impairment in ALS (50 mg intramuscular twice weekly). [[PMDA2024Rozebalamin]] The approval that followed is not dated here because its date could not be checked at the regulator. No FDA or EMA approval was found.'},
 {d:[2024,12,19],l:'ema',c:'M',s:'no',date:'19 December 2024',h:'Masitinib refused in the EU a second time',
  txt:'A new application got a negative opinion on 27 June 2024, confirmed on 17 October 2024, and was refused on 19 December 2024. [[EMA_Masitinib]]'},
 {d:[2025,2,28],l:'hc',c:'T',s:'cond',date:'28 February 2025',h:'Qalsody authorised with conditions in Canada',
  txt:'Health Canada issued a Notice of Compliance with conditions. That date comes from Health Canada summaries that were not read in full; Health Canada\'s drug database lists it on the market from 14 May 2025. [[HC2025Qalsody,HCDPD_Qalsody]]'},
 {d:[2026,10,1],l:null,c:'',s:'none',date:'October 2026',h:'No new FDA or EMA approval found',
  txt:'Through October 2026 no new disease-modifying ALS approval by the FDA or the EMA was found. The ATLAS trial of tofersen in presymptomatic SOD1 carriers has an estimated primary completion in August 2027. [[CTgov_ATLAS]]'}
];
const DR_NEG=[
  ['Ceftriaxone (raises EAAT2 glutamate uptake)','NCT00349622','3-stage RCT; 513 in stage 3; 4 g/day IV','ALSFRS-R slope difference 0.09/month (−0.06 to 0.24); survival HR 0.90 (0.71 to 1.15); hepatobiliary adverse events 62% vs 11%','Cudkowicz2014'],
 ['Dexpramipexole (mitochondrial)','EMPOWER','943; 150 mg twice daily; 12 to 18 months','CAFS 441.76 vs 438.84 (p = 0.86); ALSFRS-R −13.34 vs −13.42; neutropenia 8% vs 2%','Cudkowicz2013'],
 ['Lithium (autophagy)','LiCALS (UK)','214 on riluzole; 18 months','18-month survival 50% vs 59%; odds ratio 0.71 (0.40 to 1.24)','Morrison2013'],
 ['Lithium, pooled by genotype','Individual-patient meta-analysis of 3 RCTs','518','Overall HR 1.0 (0.7 to 1.4); a post hoc signal in UNC13A carriers','vanEijk2017'],
 ['Edaravone IV, more advanced disease','MCI186-18','25; Japan ALS severity grade 3','−6.52 vs −6.00 (p = 0.835)','EdaravoneALS18Group2017'],
 ['Edaravone oral (FAB122)','ADORE','313; 48 weeks','ALSFRS-R −11.2 vs −10.8; primary not met','CTgov_ADORE'],
 ['Edaravone, daily vs on/off oral','MT-1186-A02','384; 48 weeks','CAFS p = 0.777; stopped for futility','CTgov_MT1186A02'],
 ['AMX0035','PHOENIX','664; 48 weeks','Primary p = 0.667; secondaries not met','Amylyx2024'],
 ['Reldesemtiv (troponin activator)','COURAGE-ALS','486 randomised; stopped for futility','ALSFRS-R −1.1 (favoured placebo); win ratio 0.91','Shefner2025']
];
/* the citation markers for the table, written out so the build can number them */
const DR_NEGC={Cudkowicz2014:'[[Cudkowicz2014]]',Cudkowicz2013:'[[Cudkowicz2013]]',Morrison2013:'[[Morrison2013]]',vanEijk2017:'[[vanEijk2017]]',EdaravoneALS18Group2017:'[[EdaravoneALS18Group2017]]',CTgov_ADORE:'[[CTgov_ADORE]]',CTgov_MT1186A02:'[[CTgov_MT1186A02]]',Amylyx2024:'[[Amylyx2024]]',Shefner2025:'[[Shefner2025]]'};
const DR_ALT={
 rows:[ {n:'US label',m:[0,1,2,3],per:3},{n:'EU SmPC',m:[0,1,2,3,6,9,12],per:12}],
 ticks:[ [0,'start'],[1,'1'],[2,'2'],[3,'3'],[6,'6'],[9,'9'],[12,'12'] ],
 months:'months of treatment',later:'later',per:'periodically'
};
inits.drugs=()=>{
  /* ---------- player 1: the synapse ---------- */
  const svg=$('#drSvg'),rg=$('#drT');let drug='none';
  const R=rng(31);const JIT=Array.from({length:40},()=>[R()*2-1,R()*2-1,R()]);
  function gauge(x,y,w,lbl,v,col){
    let g=`<text x="${x}" y="${y}" class="t-sm">${lbl}</text>`;
    g+=`<rect x="${x}" y="${y+6}" width="${w}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    g+=`<rect x="${x}" y="${y+6}" width="${f1(Math.max(6,w*clamp(v)))}" height="12" rx="6" style="fill:${col}"/>`;
    g+=`<text x="${x}" y="${y+31}" class="t-xs">${DR_TXT.low}</text><text x="${x+w}" y="${y+31}" class="t-xs t-end">${DR_TXT.high}</text>`;
    return g}
  function draw(t){
    const N=vb(svg,'720 420','400 708');
    const L=N?{sx:10,sy:6,gx:20,gy:430,gw:360,gs:50,bx:20,by:590,bw:360}
             :{sx:40,sy:8,gx:470,gy:34,gw:240,gs:56,bx:470,by:226,bw:240};
    const rilu=drug==='rilu',eda=drug==='eda';
    const loss=ease(ramp(t,.16,.3)), caOn=ease(ramp(t,.3,.45)), rosOn=ease(ramp(t,.46,.6)), sum=ramp(t,.68,.76);
    const glut=(.18+.62*loss)*(rilu?.6:1);
    const ca=(.12+.75*caOn*(.3+.7*loss))*(rilu?.6:1);
    const rosRaw=(.08+.82*rosOn*(.3+.7*ca));const ros=rosRaw*(eda?.4:1);
    let s=`<defs>${marker('drA')}</defs>`;
    s+=`<g transform="translate(${L.sx} ${L.sy})">`;
    /* astrocyte (right, wrapping the cleft) */
    s+=`<path d="M262 18 C300 6 360 20 372 60 C384 110 376 200 356 250 C340 290 300 300 286 270 C276 246 290 214 280 186 C272 168 258 166 256 150 L256 124 C258 108 272 104 270 84 C268 60 246 36 262 18Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<text x="318" y="60" class="t-lbl t-mid">${DR_TXT.astro}</text>`;
    /* EAAT2 transporters on the astrocyte membrane facing the cleft */
    const TR=[124,134,144,154];
    TR.forEach((y,i)=>{const lost=i>0?loss:0;
      s+=`<rect x="251" y="${y-4}" width="12" height="8" rx="3" style="fill:var(--steel);opacity:${f1(1-.8*lost)};${lost>.5?'stroke:var(--steel);stroke-dasharray:2 2;fill-opacity:.2':''}"/>`});
    s+=`<text x="276" y="140" class="t-xs">${DR_TXT.eaat}</text>`;
    /* presynaptic terminal */
    s+=`<rect x="60" y="10" width="180" height="108" rx="40" style="fill:var(--umn-soft);stroke:var(--umn);stroke-width:1.8"/>`;
    s+=`<text x="150" y="34" class="t-lbl t-mid">${DR_TXT.pre}</text>`;
    /* Na+ channel on the left wall */
    s+=`<rect x="54" y="62" width="12" height="22" rx="3" style="fill:var(--panel);stroke:var(--umn);stroke-width:1.6"/><text x="72" y="70" class="t-xs">${DR_TXT.na}</text>`;
    const pulse=(t*30)%1;
    if(!rilu)s+=`<circle cx="${f1(lerp(36,62,pulse))}" cy="73" r="3" style="fill:var(--umn);opacity:${f1(1-pulse)}"/>`;
    if(rilu||(drug==='none'&&sum>0)){const o=rilu?1:.6*sum;
      s+=`<g style="opacity:${f1(o)}"><rect x="50" y="66" width="20" height="14" rx="4" style="fill:var(--treat);${rilu?'':'fill-opacity:.15;stroke:var(--treat);stroke-dasharray:3 2'}"/><text x="72" y="92" class="t-xs" style="fill:var(--treat)">${DR_TXT.rilu}</text></g>`}
    /* vesicles */
    [ [160,64],[188,58],[214,70],[172,90],[202,94] ].forEach(([x,y],i)=>{s+=`<circle cx="${x}" cy="${y}" r="9" style="fill:var(--panel);stroke:var(--umn);stroke-width:1.2"/>`;
      for(let k=0;k<3;k++)s+=`<circle cx="${f1(x-3+k*3)}" cy="${f1(y+(k%2?2:-2))}" r="1.6" style="fill:var(--steel)"/>`});
    /* motor neuron (postsynaptic) */
    s+=`<path d="M40 160 L250 160 L250 300 C250 360 200 392 140 392 C80 392 40 360 40 300Z" style="fill:var(--lmn-soft);stroke:var(--lmn);stroke-width:1.8"/>`;
    s+=`<text x="150" y="374" class="t-lbl t-mid">${DR_TXT.post}</text>`;
    s+=`<text x="54" y="143" class="t-xs t-end">${DR_TXT.cleft}</text>`;
    /* receptors */
    const AM={x:100,y:160},NM={x:190,y:160};
    [ [AM,DR_TXT.ampa],[NM,DR_TXT.nmda] ].forEach(([p,l])=>{const open=.4+.6*Math.min(1,glut*1.4);
      s+=`<rect x="${p.x-12}" y="${p.y-6}" width="9" height="16" rx="3" style="fill:var(--lmn)"/><rect x="${p.x+3}" y="${p.y-6}" width="9" height="16" rx="3" style="fill:var(--lmn)"/>`;
      s+=`<rect x="${f1(p.x-3)}" y="${p.y-5}" width="6" height="14" style="fill:var(--panel);opacity:${f1(open)}"/>`;
      s+=`<text x="${p.x}" y="${p.y+24}" class="t-xs t-mid">${l}</text>`});
    if(rilu)s+=`<rect x="${NM.x-14}" y="${NM.y-10}" width="28" height="5" rx="2" style="fill:var(--treat)"/>`;
    /* glutamate quanta */
    const clock=t*30,pn=Math.floor(clock),nq=rilu?3:5,clearT=lerp(.35,2.8,loss);
    for(let k=0;k<5;k++){const age=clock-(pn-k);if(pn-k<0)continue;
      for(let q=0;q<nq;q++){const j=JIT[(q*7+((pn-k)%5)*3)%40];
        const sx=120+q*22,sy=116,rec=q%2?NM:AM,rx=rec.x+j[0]*10,ry=150;
        let x,y,o=1;
        if(age<.3){const u=ease(age/.3);x=lerp(sx,rx,u);y=lerp(sy,ry,u)}
        else if(age<.3+clearT){const w=age*6+j[2]*6;x=clamp(rx+Math.sin(w)*8+(age-.3)*14*j[1],66,244);y=144+Math.cos(w*1.3)*5}
        else if(age<.6+clearT){const u=(age-.3-clearT)/.3;x=lerp(clamp(rx+(clearT)*14*j[1],66,244),252,u);y=lerp(144,TR[q%4],u);o=1-u}
        else continue;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.2" style="fill:var(--steel);opacity:${f1(o)}"/>`}}
    /* mitochondrion */
    const MX=150,MY=292;
    s+=`<ellipse cx="${MX}" cy="${MY}" rx="54" ry="22" style="fill:var(--panel);stroke:var(--lmn);stroke-width:1.6"/>`;
    s+=`<path d="M${MX-38} ${MY} q8 -14 16 0 t16 0 16 0 16 0 16 0" style="fill:none;stroke:var(--lmn);stroke-width:1.2;opacity:.7"/>`;
    s+=`<text x="${MX}" y="${MY+46}" class="t-xs t-mid">${DR_TXT.mito}</text>`;
    /* calcium ions: receptors -> mitochondrion */
    const nCa=Math.round(lerp(1,9,ca));
    for(let i=0;i<nCa;i++){const u=((t*9)+i/nCa)%1,src=i%2?NM:AM,j=JIT[i];
      const x=lerp(src.x,MX+j[0]*36,u),y=lerp(src.y+12,MY-16,u);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--warn);opacity:${f1(bump(u,0,1)*.9+.1)}"/>`}
    if(ca>.3)s+=`<text x="232" y="210" class="t-xs t-end" style="fill:var(--warn)">${DR_TXT.ca}</text>`;
    /* free radicals */
    const nR=Math.round(lerp(0,9,rosRaw));
    for(let i=0;i<nR;i++){const a=i/9*Math.PI*2+t*2,rr=62+8*Math.sin(t*20+i),x=MX+Math.cos(a)*rr,y=MY+Math.sin(a)*rr*.45;
      const caught=eda&&i%5!==0;
      if(caught){s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--muted);opacity:.6"/><circle cx="${f1(x+6)}" cy="${f1(y-4)}" r="4.2" style="fill:var(--treat)"/>`}
      else s+=`<path d="M${f1(x)} ${f1(y-6)} L${f1(x+2)} ${f1(y-2)} L${f1(x+6)} ${f1(y)} L${f1(x+2)} ${f1(y+2)} L${f1(x)} ${f1(y+6)} L${f1(x-2)} ${f1(y+2)} L${f1(x-6)} ${f1(y)} L${f1(x-2)} ${f1(y-2)}Z" style="fill:var(--tdp)"/>`}
    if(rosRaw>.25)s+=`<text x="${MX}" y="${MY-46}" class="t-xs t-mid" style="fill:var(--tdp)">${DR_TXT.ros}</text>`;
    if(eda||(drug==='none'&&sum>0)){const o=eda?1:.6*sum;
      s+=`<g style="opacity:${f1(o)}">${eda?'':`<ellipse cx="${MX}" cy="${MY}" rx="76" ry="40" style="fill:none;stroke:var(--treat);stroke-dasharray:4 3"/>`}<text x="${MX}" y="${MY+60}" class="t-xs t-mid" style="fill:var(--treat)">${DR_TXT.eda}</text></g>`}
    s+='</g>';
    /* gauges */
    [ [glut,'var(--steel)'],[ca,'var(--warn)'],[ros,'var(--tdp)'] ].forEach(([v,c],i)=>{s+=gauge(L.gx,L.gy+i*L.gs,L.gw,DR_TXT.gauges[i],v,c)});
    s+=`<text x="${L.gx}" y="${L.gy+3*L.gs-6}" class="t-xs">${DR_TXT.schem}</text>`;
    /* drug box */
    const lines=DR_TXT.ovLines[drug],hasU=drug!=='none',bh=30+lines.length*15+(hasU?36:0);
    s+=`<rect x="${L.bx}" y="${L.by}" width="${L.bw}" height="${bh}" rx="10" style="fill:${drug==='none'?'var(--panel-2)':'var(--treat-soft)'};stroke:${drug==='none'?'var(--line)':'var(--treat)'}"/>`;
    s+=`<text x="${L.bx+12}" y="${L.by+20}" class="t-lbl" style="${drug==='none'?'':'fill:var(--treat)'}">${DR_TXT.ovTitle[drug]}</text>`;
    lines.forEach((l,i)=>{s+=`<text x="${L.bx+12}" y="${L.by+38+i*15}" class="t-sm">${l}</text>`});
    if(hasU)DR_TXT.unknown.forEach((l,i)=>{s+=`<text x="${L.bx+12}" y="${L.by+46+lines.length*15+i*15}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(DR_STEPS,t);setSt(p);
    $('#drNote').innerHTML=noteHTML(DR_STEPS[p])+(DR_DRUG[drug]?`<p class="callout">${DR_DRUG[drug]}</p>`:'');
    $('#drCap').textContent=DR_TXT.cap[drug]+' '+DR_TXT.capTail;
  }
  const stop=playWire(rg,$('#drPlay'),draw,15000,UI.replay,'drugs');
  const setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);
  toggleRow($('#drDrug'),DR_TXT.drugs,'none',v=>{drug=v;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- player 2: approvals timeline ---------- */
  const tsv=$('#drTlSvg'),trg=$('#drTlT');
  const Y0=1995.6,Y1=2026.9,yr=d=>d[0]+(d[1]-1)/12+(d[2]-1)/365;
  const EV=DR_EV.map((e,i)=>Object.assign({},e,{y:yr(e.d),i}));
  const LANES=['fda','ema','hc','jp','tr'];
  const tY=v=>lerp(Y0,Y1,v),tV=y=>clamp((y-Y0)/(Y1-Y0));
  const curOf=y=>{let c=-1;EV.forEach((e,i)=>{if(e.y<=y+1e-6)c=i});return c};
  const glyph=(x,y,e,o,sel)=>{const r=8;let g=`<g style="opacity:${f1(o)}">`;
    if(sel)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="13" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    const col=e.s==='ok'||e.s==='cond'||e.s==='pos'?'var(--good)':'var(--bad)';
    if(e.s==='ok')g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${col}"/>`;
    else if(e.s==='cond')g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${col};stroke-width:2.6"/>`;
    else if(e.s==='no')g+=`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="2" style="fill:var(--panel);stroke:${col};stroke-width:2.4"/>`;
    else if(e.s==='out')g+=`<path d="M${f1(x-r-1)} ${f1(y-r+1)} H${f1(x+r+1)} L${f1(x)} ${f1(y+r+2)}Z" style="fill:${col}"/>`;
    else g+=`<path d="M${f1(x)} ${f1(y-r-2)} L${f1(x+r+2)} ${f1(y)} L${f1(x)} ${f1(y+r+2)} L${f1(x-r-2)} ${f1(y)}Z" style="fill:${e.s==='pos'?'var(--good-soft)':'var(--bad-soft)'};stroke:${col};stroke-width:2"/>`;
    const filled=e.s==='ok'||e.s==='out';
    g+=`<text x="${f1(x)}" y="${f1(y+(e.s==='out'?1:3.5))}" class="t-xs t-mid" style="font-weight:700;fill:${filled?'var(--panel)':'var(--ink)'}">${e.c}</text>`;
    return g+'</g>'};
  const wrap=(txt,n)=>{const w=txt.split(' ');const out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n&&l){out.push(l);l=x}else l=(l+' '+x).trim()});if(l)out.push(l);return out};
  function drawTl(v){
    const N=vb(tsv,'720 352','400 494');
    const L=N?{x0:22,x1:378,F:.22,lane0:96,lh:66,lab:4,rows:[18,34,50],sep:62,lx:22,ax:446,wrapN:44,band:[16,36]}
             :{x0:120,x1:704,F:.28,lane0:74,lh:44,lab:26,rows:[15,30,30],sep:42,lx:8,ax:306,wrapN:80,band:[16,36]};
    const X=y=>y<2015?L.x0+(y-Y0)/(2015-Y0)*L.F*(L.x1-L.x0):L.x0+L.F*(L.x1-L.x0)+(y-2015)/(Y1-2015)*(1-L.F)*(L.x1-L.x0);
    const y=tY(v),cur=curOf(y);
    /* row assignment inside each lane */
    const pos={};LANES.forEach(ln=>{const last=N?[-99,-99,-99]:[-99,-99];EV.filter(e=>e.l===ln).forEach(e=>{const x=X(e.y);let r=last.findIndex(lx=>x-lx>=18);if(r<0)r=last.indexOf(Math.min(...last));last[r]=x;pos[e.i]=[x,r]})});
    let s='';
    /* band: the selected event */
    const E=cur>=0?EV[cur]:null;
    if(E){s+=`<text x="${L.lx}" y="${L.band[0]}" class="t-sm">${DR_TXT.head(E.date,E.l?DR_TXT.lanes[E.l]:'')}</text>`;
      const tl=wrap(E.h,L.wrapN);tl.forEach((l,i)=>{s+=`<text x="${L.lx}" y="${L.band[1]+i*17}" class="t-lbl">${l}</text>`});
      s+=`<text x="${L.lx}" y="${L.band[1]+tl.length*17+2}" class="t-xs" style="fill:${E.s==='ok'||E.s==='cond'||E.s==='pos'?'var(--good)':E.s==='none'?'var(--muted)':'var(--bad)'}">${DR_TXT.st[E.s]}</text>`}
    else s+=`<text x="${L.lx}" y="${L.band[1]}" class="t-lbl">${DR_TXT.before}</text>`;
    /* lanes */
    LANES.forEach((ln,k)=>{const ly=L.lane0+k*L.lh;
      if(k<LANES.length-1)s+=`<line x1="${N?L.x0:L.lx}" x2="${L.x1}" y1="${ly+L.sep}" y2="${ly+L.sep}" class="grid"/>`;
      s+=`<text x="${N?L.x0:L.lx}" y="${ly+L.lab}" class="t-sm" style="fill:var(--ink)">${DR_TXT.lanes[ln]}</text>`;
      EV.filter(e=>e.l===ln).forEach(e=>{const [x,r]=pos[e.i];
        s+=glyph(x,ly+L.rows[r],e,e.y<=y+1e-6?1:.16,e.i===cur)})});
    /* axis */
    const ay=L.ax;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${ay}" y2="${ay}" class="axis"/>`;
    (N?[1995,2005,2015,2018,2021,2024]:[1995,2000,2005,2010,2015,2017,2019,2021,2023,2025]).forEach(Y=>{const x=X(Math.max(Y,Y0));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay}" y2="${ay+5}" class="axis"/><text x="${f1(x)}" y="${ay+17}" class="t-xs t-mid">${Y}</text>`});
    const xb=X(2015);s+=`<text x="${f1(xb+4)}" y="${ay-5}" class="t-xs" style="opacity:.8">${DR_TXT.scale}</text>`;
    /* cursor */
    const cx=X(y);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.lane0-6}" y2="${ay}" style="stroke:var(--treat);stroke-width:2"/>`;
    const bxx=clamp(cx-22,L.x0-6,L.x1-38);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${ay}" y2="${ay+24}" style="stroke:var(--treat);stroke-width:2"/><rect x="${f1(bxx)}" y="${ay+24}" width="44" height="18" rx="9" style="fill:var(--treat)"/><text x="${f1(bxx+22)}" y="${ay+37}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${Math.floor(y)}</text>`;
    tsv.innerHTML=s;
    const n=E?noteHTML({k:DR_TXT.head(E.date,E.l?DR_TXT.lanes[E.l]:''),t:E.h,txt:`<span class="tag ${E.s==='ok'||E.s==='cond'||E.s==='pos'?'good':E.s==='none'?'':'bad'}">${DR_TXT.st[E.s]}</span> ${E.txt}`}):noteHTML({k:'1995',t:DR_TXT.before,txt:''});
    $('#drTlNote').innerHTML=n;
    $$('#drTlChips [data-ev]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ev===cur));
    trg.setAttribute('aria-valuetext',E?DR_TXT.head(E.date,E.h):DR_TXT.before);
  }
  const stopTl=playWire(trg,$('#drTlPlay'),drawTl,22000,UI.replay,'drugs');
  const jump=i=>{stopTl();const e=EV[clamp(i,0,EV.length-1)];trg.value=tV(e.y+.002);drawTl(+trg.value)};
  $('#drTlPrev').onclick=()=>{const c=curOf(tY(+trg.value));jump(c<=0?0:c-1)};
  $('#drTlNext').onclick=()=>{const c=curOf(tY(+trg.value));jump(c+1)};
  $('#drTlChips').innerHTML=EV.map(e=>`<button class="tag" data-ev="${e.i}" aria-pressed="false"><b>${e.d[0]}</b>${e.h}</button>`).join('');
  $('#drTlChips').addEventListener('click',ev=>{const b=ev.target.closest('[data-ev]');if(b)jump(+b.dataset.ev)});
  const sw=(sh)=>`<svg class="glyph" width="18" height="18" viewBox="-10 -10 20 20" aria-hidden="true">${sh}</svg>`;
  $('#drTlLegend').innerHTML=[
    [sw('<circle r="7" style="fill:var(--good)"/>'),DR_TXT.st.ok],
    [sw('<circle r="7" style="fill:var(--panel);stroke:var(--good);stroke-width:2.4"/>'),DR_TXT.st.cond],
    [sw('<rect x="-7" y="-7" width="14" height="14" rx="2" style="fill:var(--panel);stroke:var(--bad);stroke-width:2.2"/>'),DR_TXT.st.no],
    [sw('<path d="M-8 -6 H8 L0 8Z" style="fill:var(--bad)"/>'),DR_TXT.st.out],
    [sw('<path d="M0 -9 L9 0 L0 9 L-9 0Z" style="fill:var(--good-soft);stroke:var(--good);stroke-width:2"/>'),DR_TXT.st.pos],
    [sw('<path d="M0 -9 L9 0 L0 9 L-9 0Z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/>'),DR_TXT.st.neg]
  ].map(([g,l])=>`<span>${g}${l}</span>`).join('')+DR_TXT.codes.map(([c,n])=>`<span><b>${c}</b>${n}</span>`).join('');
  drawTl(+trg.value);

  /* ---------- liver-test schedule chart ---------- */
  const asv=$('#drAltSvg');
  function drawAlt(){
    const N=vb(asv,'720 160','400 200');
    const L=N?{x0:24,x1:310,xe:380,rows:[52,118],lab:(r)=>[24,r-24],ax:174}
             :{x0:170,x1:600,xe:700,rows:[46,96],lab:(r)=>[10,r+4],ax:140};
    const X=m=>L.x0+m/12*(L.x1-L.x0);
    let s='';
    DR_ALT.rows.forEach((row,k)=>{const y=L.rows[k],[lx,ly]=L.lab(y);
      s+=`<text x="${lx}" y="${ly}" class="t-lbl">${row.n}</text>`;
      s+=`<line x1="${X(0)}" x2="${X(row.per)}" y1="${y}" y2="${y}" style="stroke:var(--treat);stroke-width:2"/>`;
      s+=`<line x1="${X(row.per)}" x2="${L.xe}" y1="${y}" y2="${y}" style="stroke:var(--treat);stroke-width:2;stroke-dasharray:5 5"/>`;
      s+=`<text x="${f1((X(row.per)+L.xe)/2)}" y="${y-11}" class="t-xs t-mid" style="fill:var(--treat)">${DR_ALT.per}</text>`;
      row.m.forEach(m=>{s+=`<circle cx="${f1(X(m))}" cy="${y}" r="7" style="fill:var(--treat)"/>`})});
    s+=`<line x1="${L.x0}" x2="${L.xe}" y1="${L.ax-14}" y2="${L.ax-14}" class="axis"/>`;
    DR_ALT.ticks.forEach(([m,l])=>{s+=`<text x="${f1(X(m))}" y="${L.ax}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${f1((X(12)+L.xe)/2)}" y="${L.ax}" class="t-xs t-mid">${DR_ALT.later}</text>`;
    s+=`<text x="${L.x0}" y="${L.ax+16}" class="t-xs">${DR_ALT.months}</text>`;
    asv.innerHTML=s}
  drawAlt();
  const prev=redraws.drugs;redraws.drugs=()=>{prev&&prev();drawAlt()};

  /* ---------- negative trials table ---------- */
  $('#drNeg').innerHTML=DR_NEG.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]} ${DR_NEGC[r[4]]}</td></tr>`).join('');
};
