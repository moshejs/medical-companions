/* =============== 2.2 the differential =============== */
const DD_TXT={
 n0:['Progressive weakness','over weeks to months'],
 q1:['Sensory signs, or abnormal','sensory nerve tests?'],
 q2:['Conduction block or','demyelination on NCS?'],
 q3:['Which pattern of signs?','myopathy, cord, junction, LMN, UMN'],
 yes:'yes',no:'no',flag:'RED FLAG',
 sens:['Look beyond ALS','copper deficiency, motor CIDP,','Kennedy disease (low SNAPs)'],
 block:['Motor neuropathy','MMN, motor CIDP,','radiation plexopathy'],
 leaf:{myo:['Myopathy','IBM','muscle biopsy'],mye:['Myelopathy','neck spondylosis','cervical MRI'],nmj:['NMJ','bulbar myasthenia','RNS, antibodies'],
       ken:['LMN only','Kennedy disease','AR CAG repeats'],umn:['UMN only','PLS, HSP','time, family'],als:['UMN + LMN','spreading, no','red flags: ALS']},
 side:['Alongside every step','History: polio,','radiation, HIV risk','Bloods: thyroid,','calcium, copper','Normal EMG: benign','fasciculations','Rare: hexosaminidase A'],
 sideN:['Alongside every step','History: polio, radiation, HIV risk','Bloods: thyroid, calcium, copper','Normal EMG: benign fasciculations','Rare: hexosaminidase A deficiency'],
 strip:'Registers: 7.3% (Ireland) and 8% (Scotland) of people first diagnosed with ALS or MND later had another condition',
 stripN:['Registers: 7.3% (Ireland) and 8% (Scotland)','later had another condition'],
 selTag:n=>`Selected: ${n}`,
 cardNone:['No condition selected','Pick a condition above, or click a row in the table, to see where it branches off in the tree.'],
 dt:{feat:'What sets it apart',test:'Key test',where:'Where it branches off'},
 where:{sens:'Question 1: sensory signs',block:'Question 2: conduction block',myo:'Question 3: myopathy pattern',mye:'Question 3: myelopathy pattern',nmj:'Question 3: junction pattern',
        ken:'Question 3: LMN-only pattern',umn:'Question 3: UMN-only pattern',side:'History and blood tests, alongside every step',als:'Reference'},
 none:'None'
};
const DD_STEPS=[
 {from:0,at:.05,k:'Start',t:'Progressive weakness',
  txt:`ALS usually begins as steadily progressive, often asymmetric weakness without significant sensory symptoms. Population studies suggest that nearly 10% of people diagnosed with ALS turn out to have another condition, and a few conditions account for most of them, several of them treatable. [[TurnerTalbot2013,Ghasemi2016]]`,
  pt:'Several other conditions can look like ALS early on, some of them treatable, so doctors check for them first.'},
 {from:.2,at:.28,k:'Question 1',t:'Sensory signs point elsewhere',
  txt:`Prominent sensory features are a red flag. Copper deficiency myelopathy brings sensory ataxia and dorsal-column signs, motor-predominant CIDP has mild sensory features, and Kennedy disease has low or absent sensory nerve action potentials. Since the 2000 revision, a mild sensory neuropathy on its own no longer excludes ALS. [[Ghasemi2016,Garnier2024,Kumar2004,TurnerTalbot2013,deCarvalhoSwash2024]]`},
 {from:.4,at:.48,k:'Question 2',t:'Conduction block: think MMN',
  txt:`Conduction block or demyelination on nerve conduction studies argues against ALS. Multifocal motor neuropathy is pure motor, asymmetric and arm-predominant, with weakness greater than wasting, and it responds to IVIG; it was the commonest mimic (22%) in the Irish register. Motor CIDP shows slowed conduction, and radiation plexopathy shows myokymic discharges with a block that does not resolve. Denervation in one nerve's territory rather than a myotome also favours a neuropathy. [[TurnerTalbot2013,Lawson2014,Traynor2000mimic,deCarvalhoSwash2024]]`,
  hook:`MMN: <b>conduction block</b> (diagnostic but not always found), anti-GM1 IgM in about half, response to <b>IVIG</b> but not to steroids or plasma exchange, no bulbar signs, normal life expectancy. [[TurnerTalbot2013,Lawson2014]]`},
 {from:.6,at:.68,k:'Question 3',t:'Which pattern fits?',
  txt:`Myopathy: inclusion body myositis weakens quadriceps and finger flexors without fasciculations or UMN signs, and its EMG can look neurogenic. Myelopathy: cervical spondylosis can give UMN and LMN signs, but neck pain, sphincter change and no signs above the neck point to it. Junction: bulbar myasthenia fluctuates and often brings ptosis or double vision. LMN only and very slow, with gynaecomastia: Kennedy disease. UMN only: PLS and HSP, separated by time, family history and genes. [[TurnerTalbot2013,deCarvalhoSwash2024,Garnier2024,Turner2020PLS]]`,
  hook:`Treatable mimics to exclude: MMN with conduction block (IVIG), cervical spondylotic myelopathy, bulbar myasthenia gravis, and Kennedy disease (low SNAPs, gynaecomastia, CAG expansion in <i>AR</i>). [[TurnerTalbot2013,Lawson2014,Garnier2024,LaSpada_GeneReviews]]`},
 {from:.8,at:.88,k:'No red flags',t:'An ALS pattern, still reviewed',
  txt:`When UMN and LMN signs spread with no red flags, the criteria apply, and the diagnosis is still reviewed. In the Irish register 7.3% of referrals were later rediagnosed, and 84% of those mimics had met only the "suspected" or "possible" levels. In the Scottish register 8% had another diagnosis, half of them with a potentially helpful treatment; failure to progress, atypical features or test results prompted the change. [[Traynor2000mimic,Davenport1996]]`,
  pt:'If the picture stops fitting, for example because it does not get worse, doctors think again.'}
];
/* cells: UMN, LMN, sensory, sphincters, eye movements, pace, key test. '–' = not described in the sources read */
const DD_MIM=[
 {id:'als',n:'ALS (reference)',full:'ALS, for reference',node:'als',
  c:['Yes','Yes','No significant sensory symptoms','Disturbance argues against ALS','Palsy argues against ALS','Steadily progressive, often asymmetric at first',`Criteria plus exclusion; EMG of all four regions [[TurnerTalbot2013,Garnier2024]]`],
  feat:'Upper and lower motor neuron signs together, spreading between regions over time.'},
 {id:'mmn',n:'MMN',full:'Multifocal motor neuropathy (MMN)',node:'block',
  c:['No (a nerve disease)','Yes: distal, arm-predominant, weakness greater than wasting','No: normal sensory conduction across the blocked segments','–','–','Life expectancy normal; no bulbar involvement',`Conduction block on NCS (diagnostic, not always found); anti-GM1 IgM about 50%; responds to IVIG [[TurnerTalbot2013,Lawson2014]]`],
  feat:`Pure motor and asymmetric, often finger or wrist extensors. Men outnumber women 3 to 1, mean onset is about 40, and no cases are reported over 70. It does not respond to steroids or plasma exchange. [[TurnerTalbot2013,Lawson2014]]`},
 {id:'csm',n:'Cervical myelopathy',full:'Cervical spondylotic myelo-radiculopathy',node:'mye',
  c:['Yes','Yes','Can be absent: the picture can be pure motor','Involvement is a clue against ALS','–','–',`Cervical MRI read alongside EMG [[TurnerTalbot2013,Ghasemi2016,Garnier2024]]`],
  feat:`Prominent neck pain and sphincter involvement point to it. Signs above the neck, fasciculations in bulbar or leg territory, and LMN signs wider than the lesion favour ALS. Incidental spondylosis is common at ALS ages, and avoiding unnecessary surgery is a stated concern. [[TurnerTalbot2013,Ghasemi2016]]`},
 {id:'sbma',n:'Kennedy disease',full:'Kennedy disease (spinal and bulbar muscular atrophy, SBMA)',node:'ken',
  c:['No','Yes: bulbar and limb, chin or perioral fasciculation','Low or absent SNAPs (sensory ganglionopathy)','–','–','Very slow: median age 44 at weakness, 61 at wheelchair use',`CAG expansion in the androgen receptor gene <i>AR</i> (more than 35 repeats) [[LaSpada_GeneReviews,deCarvalhoSwash2024,Atsuta2006]]`],
  feat:`X-linked, so it affects men. Postural tremor, gynaecomastia, testicular atrophy and a mildly raised CK. In 223 Japanese men, hand tremor began at a median 33 years, and onset age tracked CAG length while the rate of progression did not. [[deCarvalhoSwash2024,TurnerTalbot2013,Atsuta2006]]`},
 {id:'ibm',n:'IBM',full:'Inclusion body myositis (IBM)',node:'myo',
  c:['No','Weakness and wasting from muscle disease; no fasciculations','–','–','–','Slow and painless; usually over 50',`Muscle biopsy (rimmed vacuoles) and muscle MRI; CK often over 1000 IU/L but can be normal [[TurnerTalbot2013,deCarvalhoSwash2024]]`],
  feat:`Quadriceps and finger flexors, often asymmetric, with medial forearm wasting and swallowing problems in about a third; men outnumber women 3 to 1. EMG can look neurogenic, a known pitfall. Anti-cN1A antibodies were found in 33% of 311 European patients, so a negative test does not exclude IBM. [[TurnerTalbot2013,deCarvalhoSwash2024,Lilleker2017]]`},
 {id:'mg',n:'Bulbar myasthenia',full:'Bulbar myasthenia gravis',node:'nmj',
  c:['No','Fatigable bulbar weakness; no fasciculation','–','–','Often ptosis or double vision','Fluctuating',`Repetitive nerve stimulation; AChR and MuSK antibodies [[Garnier2024,TurnerTalbot2013]]`],
  feat:`Decrement on repetitive stimulation can also occur in ALS, and rare false-positive AChR antibodies are reported in MND, so neither test alone excludes ALS. Cholinesterase inhibitors can give brief relief in MND too. [[Garnier2024,TurnerTalbot2013,Ghasemi2016]]`},
 {id:'pls',n:'PLS',full:'Primary lateral sclerosis (PLS)',node:'umn',
  c:['Yes, in at least 2 of 3 regions','No active LMN degeneration (minor EMG changes allowed)','No unexplained sensory symptoms','–','–','Slow: progressive UMN symptoms for at least 2 years',`Time and serial EMG: probable PLS at 2–4 years without active LMN degeneration, definite at 4 years or more [[Turner2020PLS]]`],
  feat:`Rare (under 2–3% of MND) and part of the MND spectrum. It does not meet Gold Coast, but under revised El Escorial UMN signs alone in 2 regions are "possible ALS". In one series, 13 of 29 people with pure UMN onset later developed LMN signs, at an average of 3–4 years. [[Turner2020PLS,Turner2022,CENTAURprotocol2019]]`},
 {id:'hsp',n:'HSP',full:'Hereditary spastic paraplegia (HSP)',node:'umn',
  c:['Yes: spastic paraparesis','–','Sometimes dorsal-column signs','Sometimes','–','Very slow, younger onset',`Family history and a genetic panel; <i>SPAST</i> variants in about 40% of familial cases [[TurnerTalbot2013,Ghasemi2016]]`],
  feat:`Minimal arm and no severe bulbar involvement. The family history, often autosomal dominant, is the main clue. [[TurnerTalbot2013,Ghasemi2016]]`},
 {id:'bfs',n:'Benign fasciculations',full:'Benign fasciculation syndrome',node:'side',
  c:['No','Fasciculations without weakness or EMG denervation','–','–','–','No progression: none of 121 people developed MND over 2–32 years',`Normal strength and normal EMG [[Blexrud1993,TurnerTalbot2013]]`],
  feat:`In a 2021 series, minor chronic neurogenic EMG changes in some older men stayed stable. One tertiary clinic reassures people under 40 with fasciculations, no weakness and normal thyroid tests and electrolytes without EMG. [[Montalvo2021,TurnerTalbot2013]]`},
 {id:'hexa',n:'Hexosaminidase A deficiency',full:'Adult hexosaminidase A deficiency (late-onset GM2 gangliosidosis)',node:'side',
  c:['Yes','Yes','SNAPs may be abnormal','–','–','–',`Hexosaminidase A enzyme assay or <i>HEXA</i> genotyping [[Ghasemi2016]]`],
  feat:`Combined UMN and LMN involvement with cerebellar and extrapyramidal signs, psychosis or dementia; EMG may show complex repetitive discharges. Screening 115 Israeli people with sporadic ALS found only 2 carriers, so it is a very unlikely cause. [[Ghasemi2016,Drory2003]]`},
 {id:'pps',n:'Post-polio syndrome',full:'Post-polio syndrome',node:'side',
  c:['Few or none','Yes: new weakness, wasting and fatigue','–','–','–','Slow, after usually 15 or more stable years; symptoms for at least 1 year',`History of paralytic polio (March of Dimes criteria) and exclusion of other causes [[LiHiShing2019,Ghasemi2016]]`],
  feat:`MND arising in someone who had polio shows no more than a coincidental link. [[TurnerTalbot2013]]`},
 {id:'cidp',n:'Motor CIDP',full:'Motor-predominant chronic inflammatory demyelinating polyneuropathy (CIDP)',node:'block',
  c:['No (a nerve disease)','Yes: symmetric weakness','Mild','–','–','Fluctuating or relapsing',`Demyelinating nerve conduction (slowed velocities) [[TurnerTalbot2013]]`],
  feat:`Up to a third of CIDP is motor-predominant. It responds poorly to corticosteroids, which favours IVIG first. [[TurnerTalbot2013]]`},
 {id:'rad',n:'Radiation plexopathy',full:'Radiation-induced plexopathy or radiculopathy',node:'block',
  c:['No (a nerve disease)','Yes, after pelvic or para-aortic radiotherapy','Often none','–','–','Very slow; latency can be decades (33 years in one case)',`Exposure history; myokymic discharges and non-resolving conduction block on EMG and NCS [[TurnerTalbot2013,Ghasemi2016]]`],
  feat:`The brachial plexus form after breast cancer treatment usually has a shorter latency and pain. [[TurnerTalbot2013,Ghasemi2016]]`},
 {id:'thy',n:'Thyroid and parathyroid',full:'Hyperthyroidism and hyperparathyroidism',node:'side',
  c:['Hyperreflexia','Fasciculations (florid in about 10% of thyrotoxic people), weakness, weight loss','–','–','–','Usually with heat intolerance, tremor, fast heart rate',`Thyroid function; serum calcium for hyperparathyroidism (both in the EFNS panel) [[Ghasemi2016,TurnerTalbot2013,Garnier2024]]`],
  feat:`Hyperparathyroidism can mimic LMN-onset ALS. [[Ghasemi2016]]`},
 {id:'cu',n:'Copper deficiency',full:'Copper deficiency myelopathy',node:'sens',
  c:['Yes: spastic gait','–','Prominent sensory ataxia, dorsal-column signs','–','–','–',`Serum copper and ceruloplasmin, with zinc [[Kumar2004,Kumar2006]]`],
  feat:`Resembles B12 subacute combined degeneration. Causes include earlier gastric surgery, excess zinc and malabsorption. The sensory features usually separate it from ALS. [[Kumar2004,Kumar2006,TurnerTalbot2013]]`},
 {id:'hiv',n:'HIV and HTLV-1',full:'HIV and HTLV-1-associated syndromes',node:'side',
  c:['HTLV-1 myelopathy can look like ALS','HIV: ALS-like, often one limb first','–','–','–','HIV: spread over weeks; stabilised or improved on antiretrovirals',`HIV or HTLV serology when there is a risk [[Ghasemi2016,Garnier2024,Kuroda1991]]`],
  feat:`In a review of 1700 HIV-positive people with neurological symptoms, 6 had an ALS-like syndrome; they were younger. An autopsy report describes HTLV-1 myelopathy with ALS-like features. [[Ghasemi2016,Kuroda1991,deCarvalhoSwash2024]]`}
];
inits.ddx=()=>{
  const T=DD_TXT,svg=$('#ddSvg'),rg=$('#ddT');let sel=null;
  const LEAVES=['myo','mye','nmj','ken','umn','als'];
  function box(x,y,w,h,lit,cur,hl,o=1,col='var(--steel)',soft='var(--steel-soft)'){
    return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${lit?soft:'var(--panel)'};stroke:${hl?'var(--ink)':lit?col:'var(--line)'};stroke-width:${hl?3:cur?2.4:1.2};opacity:${f1(o)}"/>`}
  function lines(x,y,arr,first,mid){let s='';arr.forEach((ln,i)=>{s+=`<text x="${f1(x)}" y="${f1(y+(i?14+(i-1)*12:0))}" class="${i===0&&first?first:'t-xs'}${mid?' t-mid':''}">${ln}</text>`});return s}
  function draw(t){
    const N=vb(svg,'720 440','400 824');
    const L=N?{n0:[10,10,380,44],q1:[10,74,380,44],q2:[10,204,380,44],q3:[10,334,380,44],sens:[50,128,340,62],block:[50,258,340,62],
               leaf:i=>[10+(i%2)*195,402+Math.floor(i/2)*76,185,56],grp:[4,392,392,224],side:[10,630,380,112],strip:[10,762,380,50],spineX:24,yesX:120}
             :{n0:[214,10,236,44],q1:[214,80,236,44],q2:[214,150,236,44],q3:[214,220,236,44],sens:[474,74,238,62],block:[474,144,238,62],
               leaf:i=>[8+i*119,300,111,64],side:[8,74,186,196],strip:[8,388,704,40]};
    const lit={q1:ramp(t,.2,.28),sens:ramp(t,.24,.3),q2:ramp(t,.4,.48),block:ramp(t,.44,.5),q3:ramp(t,.6,.68),als:ramp(t,.8,.88),strip:ramp(t,.84,.9)};
    LEAVES.slice(0,5).forEach((k,i)=>lit[k]=ramp(t,.64+.03*i,.68+.03*i));
    const p=phaseOf(DD_STEPS,t),M=sel?DD_MIM.find(m=>m.id===sel):null,hn=M?M.node:null;
    /* the path to the selected condition: which spine steps it passes */
    const depth={sens:1,block:2,myo:3,mye:3,nmj:3,ken:3,umn:3,als:3,side:0}[hn]??-1;
    let s=`<defs>${marker('ddA')}${marker('ddB','var(--steel)')}${marker('ddC','var(--ink)')}</defs>`;
    const arrow=(d,on,hl)=>`<path d="${d}" class="arrow" style="${hl?'stroke:var(--ink);stroke-width:3':on?'stroke:var(--steel);stroke-width:2.2':''}" marker-end="url(#${hl?'ddC':on?'ddB':'ddA'})"/>`;
    const lbl=(x,y,txt,on,mid)=>`<text x="${f1(x)}" y="${f1(y)}" class="t-xs${mid?' t-mid':''}" style="fill:${on?'var(--steel)':'var(--muted)'};font-weight:700">${txt}</text>`;
    /* ---- connectors ---- */
    if(N){const X=L.spineX;
      s+=arrow(`M${X} 54 L${X} 72`,lit.q1>.5,depth>=1);
      s+=arrow(`M${X} 118 L${X} 202`,lit.q2>.5,depth>=2)+lbl(X+5,166,T.no,lit.q2>.5);
      s+=arrow(`M${X} 248 L${X} 332`,lit.q3>.5,depth>=3)+lbl(X+5,296,T.no,lit.q3>.5);
      s+=arrow(`M${L.yesX} 118 L${L.yesX} 126`,lit.sens>.5,hn==='sens')+lbl(L.yesX+8,125,T.yes,lit.sens>.5);
      s+=arrow(`M${L.yesX} 248 L${L.yesX} 256`,lit.block>.5,hn==='block')+lbl(L.yesX+8,255,T.yes,lit.block>.5);
      s+=arrow(`M200 378 L200 390`,lit.q3>.5,depth>=3);
      const G=L.grp;s+=`<rect x="${G[0]}" y="${G[1]}" width="${G[2]}" height="${G[3]}" rx="12" style="fill:none;stroke:var(--line);stroke-dasharray:4 3"/>`;
    }else{
      s+=arrow('M332 54 L332 78',lit.q1>.5,depth>=1);
      s+=arrow('M332 124 L332 148',lit.q2>.5,depth>=2)+lbl(340,140,T.no,lit.q2>.5);
      s+=arrow('M332 194 L332 218',lit.q3>.5,depth>=3)+lbl(340,210,T.no,lit.q3>.5);
      s+=arrow('M450 102 L472 102',lit.sens>.5,hn==='sens')+lbl(461,95,T.yes,lit.sens>.5,1);
      s+=arrow('M450 172 L472 172',lit.block>.5,hn==='block')+lbl(461,165,T.yes,lit.block>.5,1);
      LEAVES.forEach((k,i)=>{const B=L.leaf(i),x2=B[0]+B[2]/2;s+=arrow(`M332 264 C332 282 ${f1(x2)} 280 ${f1(x2)} 298`,lit[k]>.5,hn===k)});
      s+=`<path d="M194 172 L212 172" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    }
    /* ---- the travelling pulse ---- */
    if(!RM){const segs=N?[ [.05,.2,26,54,26,74],[.3,.4,26,118,26,204],[.5,.6,26,248,26,334],[.7,.8,200,378,300,400] ]
                       :[ [.05,.2,332,54,332,80],[.3,.4,332,124,332,150],[.5,.6,332,194,332,220],[.7,.8,332,264,f1(L.leaf(5)[0]+55),300] ];
      segs.forEach(([a,b,x1,y1,x2,y2])=>{if(t>a&&t<b){const u=ease(ramp(t,a,b));s+=`<circle cx="${f1(lerp(x1,+x2,u))}" cy="${f1(lerp(y1,+y2,u))}" r="6" style="fill:var(--steel)"/>`}})}
    /* ---- spine nodes ---- */
    const node=(B,txt,on,cur,hl)=>{let q=box(B[0],B[1],B[2],B[3],on,cur,hl);q+=`<text x="${f1(B[0]+B[2]/2)}" y="${B[1]+19}" class="t-lbl t-mid">${txt[0]}</text><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+35}" class="t-xs t-mid">${txt[1]}</text>`;return q};
    s+=node(L.n0,T.n0,true,p===0,depth>=0&&hn!=='side');
    s+=node(L.q1,T.q1,lit.q1>.5,p===1,depth>=1);
    s+=node(L.q2,T.q2,lit.q2>.5,p===2,depth>=2);
    s+=node(L.q3,T.q3,lit.q3>.5,p===3,depth>=3);
    /* ---- exits with red-flag badges ---- */
    [['sens',T.sens],['block',T.block]].forEach(([k,txt])=>{const B=L[k],o=.25+.75*lit[k],on=lit[k]>.5;
      s+=box(B[0],B[1],B[2],B[3],on,false,hn===k,o,'var(--tdp)','var(--tdp-soft)');
      s+=`<g style="opacity:${f1(o)}">`+lines(B[0]+10,B[1]+18,txt,'t-lbl')+'</g>';
      if(lit[k]>0)s+=`<g style="opacity:${f1(lit[k])}"><rect x="${f1(B[0]+B[2]-66)}" y="${f1(B[1]-8)}" width="60" height="16" rx="8" style="fill:var(--tdp)"/><text x="${f1(B[0]+B[2]-36)}" y="${f1(B[1]+3.5)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${T.flag}</text></g>`});
    /* ---- pattern leaves ---- */
    LEAVES.forEach((k,i)=>{const B=L.leaf(i),o=.25+.75*lit[k],on=lit[k]>.5,isA=k==='als';
      s+=box(B[0],B[1],B[2],B[3],on,false,hn===k,o,isA?'var(--good)':'var(--tdp)',isA?'var(--good-soft)':'var(--tdp-soft)');
      const tx=T.leaf[k];s+=`<g style="opacity:${f1(o)}"><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+20}" class="t-lbl t-mid">${tx[0]}</text><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+36}" class="t-xs t-mid">${tx[1]}</text><text x="${f1(B[0]+B[2]/2)}" y="${B[1]+49}" class="t-xs t-mid">${tx[2]}</text></g>`});
    /* ---- the side box and the register strip ---- */
    {const B=L.side,ar=N?T.sideN:T.side;s+=box(B[0],B[1],B[2],B[3],true,false,hn==='side',1,'var(--line)','var(--panel-2)');
     ar.forEach((ln,i)=>{s+=`<text x="${B[0]+12}" y="${B[1]+22+i*(N?20:22)}" class="${i?'t-xs':'t-lbl'}" style="${i?'fill:var(--ink)':''}">${ln}</text>`})}
    {const B=L.strip,o=lit.strip;if(o>0){s+=`<g style="opacity:${f1(o)}"><rect x="${B[0]}" y="${B[1]}" width="${B[2]}" height="${B[3]}" rx="10" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      if(N)T.stripN.forEach((ln,i)=>{s+=`<text x="${B[0]+12}" y="${B[1]+20+i*16}" class="t-xs" style="fill:var(--ink);font-weight:${i?500:700}">${ln}</text>`});
      else s+=`<text x="${B[0]+B[2]/2}" y="${B[1]+25}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${T.strip}</text>`;
      s+='</g>'}}
    /* ---- selected-condition tag on its node ---- */
    if(M&&M.id!=='als'){const B=hn==='side'?L.side:hn==='sens'||hn==='block'?L[hn]:L.leaf(LEAVES.indexOf(hn));
      const tag=T.selTag(M.n),w=Math.min(N?370:300,tag.length*6.2+18);let x=B[0]+B[2]/2-w/2;x=clamp(x,4,(N?400:720)-w-4);const y=N&&LEAVES.includes(hn)?B[1]-19:B[1]+B[3]+4;
      s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="17" rx="8" style="fill:var(--ink)"/><text x="${f1(x+w/2)}" y="${y+12.5}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${tag}</text>`}
    svg.innerHTML=s;setSt(p);$('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
  }
  const stop=playWire(rg,$('#ddPlay'),draw,16000,UI.replay,'ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  function card(){const c=$('#ddCard');
    if(!sel){c.innerHTML=`<span class="kicker">${T.cardNone[0]}</span><span>${T.cardNone[1]}</span>`;return}
    const M=DD_MIM.find(m=>m.id===sel);
    c.innerHTML=`<span class="kicker">${T.where[M.node]}</span><h4>${M.full}</h4><dl class="kv"><div><dt>${T.dt.feat}</dt><dd>${M.feat}</dd></div><div><dt>${T.dt.test}</dt><dd>${M.c[6]}</dd></div></dl>`}
  function pick(id){sel=sel===id||id==='none'?null:id;
    $$('#ddPick [data-ddp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddp===(sel||'none')));
    $$('#ddTbl tr[data-dd]').forEach(r=>r.classList.toggle('hl',r.dataset.dd===sel));
    card();draw(+rg.value)}
  $('#ddPick').innerHTML=[['none',T.none],...DD_MIM.filter(m=>m.id!=='als').map(m=>[m.id,m.n])].map(([id,n])=>`<button class="btn" data-ddp="${id}" aria-pressed="${id==='none'}">${n}</button>`).join('');
  $('#ddPick').addEventListener('click',e=>{const b=e.target.closest('[data-ddp]');if(b)pick(b.dataset.ddp==='none'?'none':b.dataset.ddp===sel?'none':b.dataset.ddp)});
  $('#ddTbl').innerHTML=DD_MIM.map(M=>`<tr${M.id==='als'?' class="ref"':` data-dd="${M.id}"`}><th>${M.full}</th>${M.c.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('');
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r){if(r.dataset.dd!==sel)pick(r.dataset.dd);$('#ddSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  card();draw(+rg.value);
};
