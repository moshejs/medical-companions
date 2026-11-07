/* =============== 5.1 symptoms & rehabilitation =============== */
/* Twelve symptoms, in tour order. side/ly place the map label (body coordinates); ax/ay is the anchor on the body.
   v = bar value (% of people), v2 = darker inner value, rg = a published range, v:null = no pooled figure. */
const SY_S=[
 {n:'Fatigue',k:'Whole nervous system',side:'R',ly:6,ax:18,ay:22,v:59.1,val:'59.1% pooled (69 studies)',
  prev:`About 59% in a 69-study meta-analysis (59.1%), and 95% in a 16-country European survey of 16,808 people. Estimates vary most with the questionnaire used, and have fallen each decade since 2000. [[Yi2024,Kobelt2017]]`,
  nd:[['est',`Exercise (aerobic, resistance, balance, including yoga and pilates): in 26 trials with a non-exercise control, exercise reduced fatigue (SMD −0.53), with no excess of relapses. [[Heine2015,NICE2022]]`],
      ['early',`Self-management using mindfulness and cognitive behavioural techniques; CBT had a short-term benefit (SMD −0.47) that waned after treatment ended. [[vandenAkker2016,NICE2022]]`],
      ['g',`For people with EDSS 4 or more, NICE suggests supervised aerobic and progressive resistance activity combined with cognitive behavioural techniques. [[NICE2022]]`]],
  dr:[['g',`NICE NG220 lists amantadine, modafinil or an SSRI as off-label options after specialist discussion, and advises against vitamin B12 injections for fatigue. [[NICE2022]]`],
      ['neg',`TRIUMPHANT-MS: amantadine, modafinil and methylphenidate were no better than placebo and caused more adverse events (39–40% vs 31%). [[Nourbakhsh2021]]`]],
  pt:'MS fatigue is not ordinary tiredness. The options with the most consistent trial support are exercise and talking-therapy techniques, not tablets.',
  hook:'Fatigue drugs are a live controversy: TRIUMPHANT-MS (2021) found all three no better than placebo, yet NICE NG220 (2022) still lists off-label options.'},
 {n:'Walking',k:'Legs, spinal cord, balance',side:'R',ly:404,ax:31,ay:410,v:56,v2:37,val:'56% fell in 3 months · 37% repeatedly',
  prev:`No single prevalence figure for walking difficulty in these sources. Falls are a marker: of 537 people followed for 3 months, 56% fell at least once and 37% repeatedly, 65% of falls were indoors, and the odds peaked around EDSS 4.0 and 6.0. [[Nilsagard2015]]`,
  nd:[['g',`Supervised resistance plus aerobic programmes for mobility problems, and vestibular rehabilitation when standing balance is limited. [[NICE2022]]`],
      ['est',`Multidisciplinary inpatient rehabilitation improves activity and participation in the short term (Cochrane, 8 trials). [[Khan2007]]`]],
  dr:[['est',`Fampridine (dalfampridine): 35% and 42.9% were timed-walk responders vs 8% and 9.3% on placebo; responders walked about 25% faster. [[Goodman2009,Goodman2010]]`],
      ['lbl',`US label: contraindicated with a history of seizure, moderate or severe kidney impairment (CrCl ≤50 mL/min) or hypersensitivity to 4-aminopyridine; seizure risk rises with dose. [[FDAdalfampridine]]`],
      ['g',`In England, NICE withdrew its fampridine recommendation; access follows an NHS England commissioning policy. [[NICE2022]]`]],
  pt:'For the minority who respond, one medicine makes walking measurably faster. Most of the help with walking comes from exercise, balance work and the right aids.',
  hook:'Fampridine is a potassium-channel blocker. Only responders benefit, so trials report a responder rate first and a speed gain second. [[AmpyraLabel2026,Goodman2009]]'},
 {n:'Spasticity',k:'Corticospinal tracts',side:'L',ly:350,ax:-27,ay:336,v:84,v2:34,val:'84% any · 34% moderate or worse',
  prev:`In the NARCOMS registry, 16% reported no spasticity, 31% minimal, 19% mild, 17% moderate, 13% severe and 4% total. About a third changed or gave up daily activities because of it. [[Rizzo2004]]`,
  nd:[['g',`First look for things that aggravate it: pressure ulcers, bladder and bowel problems, infection, posture and pain. Refractory cases go to a specialist multidisciplinary team. [[NICE2022]]`]],
  dr:[['g',`NICE NG220: oral baclofen first line when there are specific treatment goals; gabapentin (off-label) second line or combined with baclofen, with caution about respiratory depression. [[NICE2022]]`],
      ['est',`Nabiximols (THC:CBD mouth spray): in an enriched-design trial of 241 people whose spasticity had already responded in a 4-week run-in, it beat placebo over 12 weeks. [[Novotna2011]]`],
      ['early',`Registry users of intrathecal baclofen reported less spasticity, pain and spasms than users of oral drugs (a survey, not a trial). [[Rizzo2004]]`]],
  pt:'Spasticity is stiffness and spasm in the muscles. Treating a hidden trigger, such as a bladder infection or a pressure sore, can ease it before any new medicine is added.',
  hook:'NICE NG220 order for spasticity: aggravating factors first, then oral baclofen, then gabapentin. [[NICE2022]]'},
 {n:'Bladder',k:'Sacral spinal cord',side:'L',ly:214,ax:-10,ay:240,v:68.4,val:'68.4% urinary symptoms (self-report)',
  prev:`Pooled prevalence of lower urinary tract symptoms was 68.4% by self-report and 64.0% on urodynamics. Frequency (73.5%) and urgency (63.9%) were commonest; detrusor overactivity was found in 42.9% and detrusor-sphincter dyssynergia in 35.4%. [[AlDandan2020]]`,
  nd:[['g',`UK consensus: a urine dipstick for infection and a measurement of the residual volume after voiding, rather than routine cystometry. [[Fowler2009]]`],
      ['g',`Clean intermittent self-catheterisation when the bladder does not empty. [[Fowler2009]]`]],
  dr:[['g',`Antimuscarinic medicines are the mainstay in the UK consensus. [[Fowler2009]]`],
      ['est',`Botulinum toxin A into the bladder wall (416 people, 227 with MS): incontinence fell by 21–23 episodes a week vs 9 on placebo; 35–42% of those not catheterising then needed to, vs 10%. [[Ginsberg2012]]`]],
  pt:'Needing to go often and urgently are the commonest bladder problems. A simple measurement of what is left after passing urine guides what comes next.',
  hook:'Bladder: dipstick for infection and measure the post-void residual before an antimuscarinic; self-catheterisation handles incomplete emptying. [[Fowler2009]]'},
 {n:'Bowel',k:'Sacral cord, autonomic',side:'R',ly:196,ax:16,ay:196,v:14,val:'14% moderate–severe · 26–32% at high EDSS',
  prev:`Of 1100 Italian outpatients, 14% had moderate or severe bowel dysfunction, rising to 26–32% at high disability. It was more frequent with progressive MS, older age and longer disease. [[Bisecco2022]]`,
  nd:[['early',`A stepwise approach in a published review: lifestyle and a bowel routine first, then biofeedback and transanal irrigation; a stoma or antegrade enemas in selected cases. Constipation and faecal incontinence can coexist. [[Preziosi2018]]`]],
  dr:[['none','These sources give no trial data for specific bowel medicines in MS.']],
  pt:'Constipation and leakage can happen in the same person. A regular routine is the usual first step.'},
 {n:'Sexual function',lbl:'Sexual',k:'Sacral cord, autonomic',side:'L',ly:300,ax:-8,ay:264,v:62.5,val:'62.5% women · 62.9% men',
  prev:`Meta-analyses put sexual dysfunction at 62.5% (95% CI 53.9–70.5) in women with MS and 62.9% (53–72.7) in men. [[Salari2023,Dastoorpoor2021]]`,
  nd:[['none','These sources report how common it is, not treatment trials. It often overlaps with other points on this map, such as bladder, fatigue, spasticity and mood.']],
  dr:[['none','No drug trials for MS-related sexual dysfunction are summarised in these sources.']],
  pt:'About six in ten people with MS have sexual difficulties. It is common, it is part of MS, and it can be raised with the care team like any other symptom.'},
 {n:'Pain and trigeminal neuralgia',lbl:'Pain · TN',k:'Brainstem, cord, muscles',side:'R',ly:82,ax:19,ay:66,v:63,v2:3.8,val:'63% any pain · TN 3.4–3.8%',
  prev:`Overall pain prevalence 63% (17 studies, 5319 people): headache 43%, neuropathic limb pain 26%, back pain 20%, Lhermitte sign 16%, painful spasms 15%, trigeminal neuralgia 3.8%. A larger meta-analysis put trigeminal neuralgia at 3.4%. [[Foley2013,Houshi2022]]`,
  nd:[['g',`NICE asks for the cause of pain to be identified and treated. Musculoskeletal pain is usually secondary to immobility, spasticity and posture. [[NICE2022]]`]],
  dr:[['g',`Neuropathic pain follows NICE's separate neuropathic pain guideline. [[NICE2022]]`]],
  pt:'Some MS pain comes from the nerve damage itself, and some from stiff muscles and posture. The two kinds are treated differently.',
  hook:'Pain in MS is common (about 63%), and trigeminal neuralgia affects about 3.4–3.8% of people with MS. [[Foley2013,Houshi2022]]'},
 {n:'Tremor',k:'Cerebellum and its pathways',side:'L',ly:262,ax:-80,ay:254,v:33.3,val:'33.3% pooled · 22.5% in studies >200',
  prev:`Pooled tremor frequency was 33.3% (14 studies, 17,458 people), but 22.5% in studies of more than 200 people. [[Vaheb2025]]`,
  nd:[['g',`NICE refers to separate guidance on deep brain stimulation. [[NICE2022]]`]],
  dr:[['none',`NICE reviewed drug treatment of ataxia and tremor in MS and could make only a research recommendation. [[NICE2022]]`]],
  pt:'Tremor affects roughly a quarter to a third of people with MS. No medicine has strong trial evidence for it yet.'},
 {n:'Vision',k:'Optic nerves',side:'L',ly:58,ax:-12,ay:56,v:null,val:'no pooled prevalence in these sources',
  prev:`These sources give no pooled prevalence. Optic neuritis is inflammation of the optic nerve; at 15 years in the Optic Neuritis Treatment Trial, 72% of affected eyes saw 20/20 or better. [[ONSG2008Vision]]`,
  nd:[['est',`Heat and exercise can blur vision briefly in a previously damaged optic nerve (Uhthoff\'s phenomenon); the episodes are brief and reversible. [[Frohman2013]]`]],
  dr:[['est',`ONTT: IV methylprednisolone sped recovery but did not improve final visual acuity; oral prednisone 1 mg/kg alone did no better than placebo and raised the risk of new optic neuritis (RR 1.79). [[Beck1992]]`],
      ['g',`Relapse steroids are covered in <a href="#relapse" data-go="relapse">A relapse, week by week</a>.`]],
  pt:'Blurred or painful vision from optic neuritis usually improves a great deal over time.',
  hook:'ONTT: IV steroids speed visual recovery but not final visual acuity; low-dose oral prednisone alone raised recurrence. The issue is dose, not route. [[Beck1992,LePage2015]]'},
 {n:'Cognition',k:'Cerebral hemispheres',side:'L',ly:18,ax:-16,ay:26,v:32.5,val:'32.5% in RRMS (50 studies)',
  prev:`Pooled prevalence of cognitive impairment was 32.5% in RRMS (50 studies), higher with longer disease, older age and longer test batteries. The often-quoted 40–70% could not be verified. In the European survey, 71% reported cognitive difficulties. [[Wu2025,Kobelt2017]]`,
  nd:[['early',`Neuropsychological rehabilitation (Cochrane, 20 studies): low-level evidence; memory span SMD 0.54 and working memory SMD 0.33. [[RostiOtajarvi2014]]`],
      ['g',`Assess cognition at review; check anxiety, depression, sleep, fatigue and medicines that affect thinking; refer to occupational therapy or neuropsychology if problems persist. [[NICE2022]]`],
      ['est',`The Symbol Digit Modalities Test (SDMT) is brief, reliable and sensitive enough for monitoring. [[Benedict2020]]`]],
  dr:[['none','These sources report no medicine proven to improve MS-related cognitive problems.']],
  pt:'Thinking can slow down and memory can slip. Tiredness, low mood and some medicines make it worse, so those are checked first.',
  hook:'Processing speed and episodic memory are the domains most often affected; the SDMT is the quick test. [[Benedict2020,Chiaravalloti2008]]'},
 {n:'Depression and anxiety',lbl:'Mood',k:'Mood and wellbeing',side:'R',ly:44,ax:21,ay:36,v:30.5,v2:22.1,val:'depression 30.5% · anxiety 22.1%',
  prev:`Pooled prevalence 30.5% for depression and 22.1% for anxiety (58 studies); 23.7% and 21.9% in population-based studies. Lifetime risk of depression was 50.3% in one interview study. The suicide rate ratio is 1.72, and 2.12 around the time of diagnosis. [[Boeschoten2017,Marrie2015Psych,Sadovnick1996,Shen2019]]`,
  nd:[['g',`NICE asks for anxiety and depression to be checked as part of reviewing cognition and fatigue. [[NICE2022]]`]],
  dr:[['none','These sources report how common mood problems are, not trials of their treatment in MS.']],
  help:true,
  pt:'Low mood and anxiety are common in MS. They are part of the illness, not a weakness, and they are worth raising with the care team.',
  hook:'The suicide rate ratio in MS is about 1.7 (1.72), and higher around the time of diagnosis (2.12). [[Shen2019]]'},
 {n:'Heat sensitivity',lbl:'Heat',k:'Demyelinated fibres',side:'R',ly:140,ax:30,ay:140,v:null,rg:[29,80],val:'29–80% (exercise-induced)',
  prev:`Features of exercise-induced heat sensitivity are reported in 29–80% of people with MS, and an estimated 60–80% have temporary worsening with heat exposure. [[Silarova2024,Davis2010]]`,
  nd:[['early',`Cooling before or during exercise can reduce it. [[Silarova2024]]`],
      ['est',`Cooling-garment trial (84 heat-sensitive people): a small objective improvement after an hour, and less reported fatigue during a month of daily use. [[Schwid2003]]`]],
  dr:[['none','No medicine for heat sensitivity appears in these sources.']],
  pt:'A hot bath or a hard workout can bring old symptoms back for a while. They fade on cooling, and on their own they do not mean new damage.',
  hook:'Uhthoff\'s phenomenon is brief, stereotyped and reversible, from ion-channel and temperature effects on demyelinated axons; a relapse is immune-driven. [[Frohman2013]]'}
];
const SY_STEPS=SY_S.map((s,i)=>({from:i/SY_S.length,at:(i+.45)/SY_S.length,t:s.lbl||s.n}));
const SY_EV={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',g:'<span class="tag brand">Guideline</span>',
  neg:'<span class="tag bad">Trial negative</span>',lbl:'<span class="tag rx">Label</span>',none:'<span class="tag">No trial data</span>'};
inits.symptoms=()=>{
  const svg=$('#sySvg'),rg=$('#syT');let filt='all',hotMode=null;
  svg.innerHTML='<g id="syDyn"></g><g id="syHot"></g>';
  const dyn=$('#syDyn'),hot=$('#syHot');
  const LW={cx:180,oy:12,k:.98,xL:88,xR:272,bT:24,bY:i=>62+i*31.5,bL:452,bx:460,bw:240},
        LN={cx:200,oy:10,k:.84,xL:112,xR:288,bT:398,bY:i=>440+i*33,bL:96,bx:104,bw:286};
  const lay=()=>NARROW()?LN:LW;
  const labXY=(L,s)=>({x:s.side==='L'?L.xL:L.xR,y:L.oy+s.ly*L.k});
  function buildHot(L){
    hot.innerHTML=SY_S.map((s,i)=>{const p=labXY(L,s),ax=L.cx+s.ax*L.k,ay=L.oy+s.ay*L.k,w=(s.lbl||s.n).length*7.6+10;
      const rx=s.side==='L'?p.x-w+4:p.x-6;
      return `<g class="syhot" tabindex="0" role="button" data-sy="${i}" aria-label="${s.n}: show how common it is and the published options"><rect x="${f1(rx)}" y="${f1(p.y-15)}" width="${f1(w)}" height="21" rx="5"/><circle cx="${f1(ax)}" cy="${f1(ay)}" r="10"/></g>`}).join('');
  }
  function body(L,act,t){
    const {cx,oy,k}=L,X=x=>f1(cx+x*k),Y=y=>f1(oy+y*k),S=v=>f1(v*k);
    const limbs=[`M${X(-24)} ${Y(256)} L${X(-28)} ${Y(340)} L${X(-31)} ${Y(410)}`,`M${X(24)} ${Y(256)} L${X(28)} ${Y(340)} L${X(31)} ${Y(410)}`],
          arms=[`M${X(-44)} ${Y(112)} Q${X(-70)} ${Y(150)} ${X(-75)} ${Y(196)} L${X(-80)} ${Y(250)}`,`M${X(44)} ${Y(112)} Q${X(70)} ${Y(150)} ${X(75)} ${Y(196)} L${X(80)} ${Y(250)}`];
    const heat=act===11,skin=heat?'var(--orange-soft)':'var(--panel-2)';
    let s='';
    // silhouette: outlines first, fills on top
    limbs.forEach(d=>s+=`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:${S(27)};stroke-linecap:round"/>`);
    arms.forEach(d=>s+=`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:${S(20)};stroke-linecap:round"/>`);
    s+=`<rect x="${X(-52)}" y="${Y(96)}" width="${S(104)}" height="${S(172)}" rx="${S(30)}" style="fill:var(--line)"/><rect x="${X(-12)}" y="${Y(72)}" width="${S(24)}" height="${S(32)}" style="fill:var(--line)"/><circle cx="${X(0)}" cy="${Y(44)}" r="${S(35.5)}" style="fill:var(--line)"/>`;
    limbs.forEach(d=>s+=`<path d="${d}" style="fill:none;stroke:${skin};stroke-width:${S(24)};stroke-linecap:round"/>`);
    arms.forEach(d=>s+=`<path d="${d}" style="fill:none;stroke:${skin};stroke-width:${S(17)};stroke-linecap:round"/>`);
    s+=`<rect x="${X(-50)}" y="${Y(98)}" width="${S(100)}" height="${S(168)}" rx="${S(28)}" style="fill:${skin}"/><rect x="${X(-10.5)}" y="${Y(72)}" width="${S(21)}" height="${S(34)}" style="fill:${skin}"/><circle cx="${X(0)}" cy="${Y(44)}" r="${S(34)}" style="fill:${skin}"/>`;
    // highlight layers under the CNS
    const glow='fill:var(--attack-soft);stroke:var(--attack);stroke-width:2';
    const legGlow=()=>limbs.map(d=>`<path d="${d}" style="fill:none;stroke:var(--attack);stroke-width:${S(22)};stroke-linecap:round;opacity:.28"/>`).join('');
    if(act===1||act===2)s+=legGlow();
    if(act===5)s+=`<ellipse cx="${X(0)}" cy="${Y(258)}" rx="${S(26)}" ry="${S(12)}" style="${glow};opacity:.85"/>`;
    // CNS
    const brainSt=(act===0||act===9||act===10)?glow:'fill:var(--axon-soft);stroke:var(--axon);stroke-width:1.4';
    s+=`<ellipse cx="${X(0)}" cy="${Y(30)}" rx="${S(25)}" ry="${S(17)}" style="${brainSt}"/>`;
    if(act===10)s+=`<ellipse cx="${X(0)}" cy="${Y(22)}" rx="${S(19)}" ry="${S(8)}" style="fill:var(--attack);opacity:.3"/>`;
    s+=`<path d="M${X(0)} ${Y(14)} V${Y(46)} M${X(-19)} ${Y(26)} q${S(6)} ${S(-7)} ${S(12)} 0 M${X(-17)} ${Y(36)} q${S(6)} ${S(-6)} ${S(11)} 0 M${X(7)} ${Y(26)} q${S(6)} ${S(-7)} ${S(12)} 0 M${X(6)} ${Y(36)} q${S(6)} ${S(-6)} ${S(11)} 0" style="fill:none;stroke:var(--axon);stroke-width:1;opacity:.6"/>`;
    s+=`<ellipse cx="${X(0)}" cy="${Y(47)}" rx="${S(9)}" ry="${S(4)}" style="${act===7?glow:'fill:var(--axon-soft);stroke:var(--axon);stroke-width:1.2'}"/>`;
    const lower=act>=3&&act<=5,cordHot=act===0||act===2||act===6;
    s+=`<line x1="${X(0)}" y1="${Y(46)}" x2="${X(0)}" y2="${Y(88)}" style="stroke:var(--axon);stroke-width:${S(6)};stroke-linecap:round"/>`;
    s+=`<line x1="${X(0)}" y1="${Y(88)}" x2="${X(0)}" y2="${Y(232)}" style="stroke:${cordHot?'var(--attack)':'var(--axon)'};stroke-width:${S(4.5)};stroke-linecap:round"/>`;
    if(lower)s+=`<line x1="${X(0)}" y1="${Y(196)}" x2="${X(0)}" y2="${Y(232)}" style="stroke:var(--attack);stroke-width:${S(6)};stroke-linecap:round"/>`;
    for(let y=100;y<=226;y+=14)s+=`<path d="M${X(-9)} ${Y(y+4)} L${X(0)} ${Y(y)} L${X(9)} ${Y(y+4)}" style="fill:none;stroke:var(--axon);stroke-width:1;opacity:.55"/>`;
    // eyes and optic nerves
    const vis=act===8;
    [-12,12].forEach(x=>{s+=`<line x1="${X(x)}" y1="${Y(52)}" x2="${X(0)}" y2="${Y(42)}" style="stroke:${vis?'var(--attack)':'var(--axon)'};stroke-width:${vis?2.6:1.4}"/>`;
      s+=`<circle cx="${X(x)}" cy="${Y(56)}" r="${S(5.5)}" style="fill:var(--panel);stroke:${vis?'var(--attack)':'var(--muted)'};stroke-width:${vis?2:1.2}"/><circle cx="${X(x)}" cy="${Y(56)}" r="${S(2.2)}" style="fill:var(--ink)"/>`});
    s+=`<path d="M${X(-8)} ${Y(71)} q${S(8)} ${S(5)} ${S(16)} 0" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-linecap:round"/>`;
    // organs
    s+=`<path d="M${X(-24)} ${Y(178)} q${S(12)} ${S(-10)} ${S(24)} 0 q${S(12)} ${S(10)} ${S(24)} 0 M${X(-24)} ${Y(192)} q${S(12)} ${S(10)} ${S(24)} 0 q${S(12)} ${S(-10)} ${S(24)} 0 M${X(-24)} ${Y(206)} q${S(12)} ${S(-10)} ${S(24)} 0 q${S(12)} ${S(10)} ${S(24)} 0" style="fill:none;stroke:${act===4?'var(--attack)':'var(--mac)'};stroke-width:${act===4?3:2};opacity:${act===4?1:.55};stroke-linecap:round"/>`;
    s+=`<ellipse cx="${X(0)}" cy="${Y(240)}" rx="${S(12)}" ry="${S(9)}" style="${act===3?glow:'fill:var(--csf);stroke:var(--axon);stroke-width:1.2'}"/>`;
    // symptom-specific motion
    const w=Math.sin(t*900);
    if(act===6)s+=`<path d="M${X(15)} ${Y(60)} l${S(8)} ${S(4)} l${S(-5)} ${S(4)} l${S(9)} ${S(5)}" style="fill:none;stroke:var(--attack);stroke-width:2.2;stroke-linejoin:round"/>`;
    if(act===7)[-1,1].forEach(sg=>{for(let j=0;j<3;j++)s+=`<path d="M${X(sg*(86+j*5))} ${Y(242+j*3)} q${S(sg*3)} ${S(6+w*2)} 0 ${S(12)}" style="fill:none;stroke:var(--attack);stroke-width:1.6;opacity:${f1(.9-j*.25)}"/>`});
    if(act===2)[-1,1].forEach(sg=>{s+=`<path d="M${X(sg*14)} ${Y(290)} l${S(sg*5)} ${S(8)} l${S(-sg*5)} ${S(8)} l${S(sg*5)} ${S(8)} l${S(-sg*5)} ${S(8)}" style="fill:none;stroke:var(--attack);stroke-width:1.8"/>`});
    if(act===1)[-1,1].forEach(sg=>{const o=sg*w*3;s+=`<path d="M${X(sg*31-14)} ${Y(424)} h${S(28)}" style="stroke:var(--attack);stroke-width:2;opacity:.7"/><path d="M${X(sg*31-12+o)} ${Y(430)} h${S(18)}" style="stroke:var(--attack);stroke-width:1.4;opacity:.45"/>`});
    // thermometer (heat)
    const tx=+X(30),ty0=oy+122*k,th=26*k,lvl=heat?.25+.6*(.5+.5*Math.sin(t*300)):.25;
    s+=`<rect x="${f1(+tx-3*k)}" y="${f1(ty0)}" width="${S(6)}" height="${f1(th)}" rx="${S(3)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1"/><rect x="${f1(+tx-1.6*k)}" y="${f1(ty0+(1-lvl)*th)}" width="${S(3.2)}" height="${f1(lvl*th)}" style="fill:${heat?'var(--bad)':'var(--muted)'}"/><circle cx="${tx}" cy="${f1(ty0+th+3*k)}" r="${S(5)}" style="fill:${heat?'var(--bad)':'var(--muted)'}"/>`;
    if(heat)for(let j=0;j<3;j++)s+=`<path d="M${X(-20+j*20)} ${Y(-2)} q${S(4)} ${S(-5)} 0 ${S(-10)} q${S(-4)} ${S(-5)} 0 ${S(-10)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.7"/>`;
    // labels, leaders and anchors
    SY_S.forEach((sy,i)=>{const p=labXY(L,sy),ax=cx+sy.ax*k,ay=oy+sy.ay*k,on=i===act,lx=sy.side==='L'?p.x+4:p.x-4;
      s+=`<line x1="${f1(lx)}" y1="${f1(p.y-4)}" x2="${f1(ax)}" y2="${f1(ay)}" style="stroke:${on?'var(--attack)':'var(--muted)'};stroke-width:${on?1.6:1};opacity:${on?1:.5}"/>`;
      if(on){const r=7+9*((t*SY_S.length*3)%1);s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(r)}" style="fill:none;stroke:var(--attack);stroke-width:1.6;opacity:${f1(clamp(1-(r-7)/9))}"/>`}
      s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${on?6:4.5}" style="fill:${on?'var(--attack)':'var(--panel)'};stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:1.4"/>`;
      s+=`<text x="${f1(p.x)}" y="${f1(p.y)}" class="t-lbl${sy.side==='L'?' t-end':''}" style="fill:${on?'var(--attack)':'var(--ink)'}">${sy.lbl||sy.n}</text>`});
    return s}
  function bars(L,act,u){
    let s=`<text x="${L.bx}" y="${L.bT}" class="t-sm" style="fill:var(--ink);font-weight:600">HOW COMMON · PUBLISHED ESTIMATES</text>`;
    [0,50,100].forEach(v=>{const x=L.bx+L.bw*v/100;s+=`<text x="${f1(x)}" y="${L.bT+16}" class="t-xs${v===100?' t-end':v?' t-mid':''}">${v}%</text><line x1="${f1(x)}" x2="${f1(x)}" y1="${L.bT+20}" y2="${f1(L.bY(SY_S.length-1)+2)}" class="grid"/>`});
    SY_S.forEach((sy,i)=>{const y=L.bY(i),on=i===act,g=i<act?1:on?ease(ramp(u,0,.4)):0,c=on?'var(--attack)':'var(--brand)';
      s+=`<text x="${L.bL}" y="${f1(y)}" class="t-sm t-end" style="fill:${on?'var(--attack)':'var(--ink)'};${on?'font-weight:700':''}">${sy.lbl||sy.n}</text>`;
      s+=`<rect x="${L.bx}" y="${f1(y-9)}" width="${L.bw}" height="10" rx="3" style="fill:var(--panel-2)"/>`;
      if(sy.v!=null){s+=`<rect x="${L.bx}" y="${f1(y-9)}" width="${f1(L.bw*sy.v/100*g)}" height="10" rx="3" style="fill:${c};opacity:${on?1:.55}"/>`;
        if(sy.v2!=null)s+=`<rect x="${L.bx}" y="${f1(y-9)}" width="${f1(L.bw*sy.v2/100*g)}" height="10" rx="3" style="fill:${c};opacity:${on?1:.9};filter:brightness(.7)"/>`}
      else if(sy.rg){const a=L.bx+L.bw*sy.rg[0]/100,b=L.bx+L.bw*sy.rg[1]/100;
        s+=`<rect x="${f1(a)}" y="${f1(y-9)}" width="${f1((b-a)*g)}" height="10" rx="3" style="fill:${c};opacity:${on?.75:.45}"/><line x1="${f1(a)}" x2="${f1(a)}" y1="${f1(y-12)}" y2="${f1(y+3)}" style="stroke:${c};stroke-width:${g?1.5:0}"/>`}
      else s+=`<rect x="${L.bx}" y="${f1(y-9)}" width="${L.bw}" height="10" rx="3" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/>`;
      if(g>0||sy.v==null&&!sy.rg)s+=`<text x="${L.bx}" y="${f1(y+11)}" class="t-xs" style="${on?'fill:var(--ink)':''}">${sy.val}</text>`});
    return s}
  function note(i){const S=SY_S[i];
    const li=A=>A.map(([e,x])=>`<li>${SY_EV[e]} ${x}</li>`).join('');
    let h=`<div class="kicker">Symptom ${i+1} of ${SY_S.length} · ${S.k}</div><h4>${S.n}</h4><p><b>How common.</b> ${S.prev}</p>`;
    if(filt!=='dr')h+=`<div class="sy-g"><div class="kicker">Non-drug approaches in the published sources</div><ul>${li(S.nd)}</ul></div>`;
    if(filt!=='nd')h+=`<div class="sy-g"><div class="kicker">Medicines in the published sources</div><ul>${li(S.dr)}</ul></div>`;
    if(S.help)h+=`<div class="sy-help"><b>If you are thinking about suicide or self-harm,</b> contact your local emergency number or a crisis line now, or tell a doctor or someone you trust today. This guide deliberately has no screening score: talking to a professional is the right step.</div>`;
    h+=`<div class="pt"><b>In plain words</b>${S.pt}</div>`;
    if(S.hook)h+=`<div class="hook"><b>Exam hook</b>${S.hook}</div>`;
    h+=`<p class="stage-cap">Listing what guidelines and trials report is not a recommendation for any one person.</p>`;
    return h}
  function draw(t){
    const N=vb(svg,'720 450','400 842'),L=N?LN:LW,mode=N?'n':'w';
    if(hotMode!==mode){buildHot(L);hotMode=mode}
    const n=SY_S.length,act=Math.min(n-1,Math.floor(t*n)),u=t*n-act;
    dyn.innerHTML=body(L,act,t)+bars(L,act,u);
    $$('.syhot',hot).forEach((g,i)=>g.setAttribute('aria-pressed',i===act));
    setSt(act);$('#syNote').innerHTML=note(act);
  }
  const stop=playWire(rg,$('#syPlay'),draw,36000,'Replay','symptoms');
  const setSt=stepWire($('#sySteps'),SY_STEPS,rg,draw,stop);
  const pick=i=>{stop();rg.value=SY_STEPS[i].at;draw(SY_STEPS[i].at)};
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-sy]');if(g)pick(+g.dataset.sy)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-sy]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(+g.dataset.sy)}});
  $$('[data-syf]').forEach(b=>b.addEventListener('click',()=>{filt=b.dataset.syf;$$('[data-syf]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- fatigue: a day (schematic), TRIUMPHANT-MS, exercise and CBT ---------- */
  const SYF_STEPS=[
   {from:0,at:.3,k:'Schematic',t:'A day, two ways',
    txt:`The two curves are a drawing of an idea, not data. One day puts activity in one long burst; the other splits the same activity with rests. NICE NG220 suggests self-management that uses mindfulness and cognitive behavioural techniques, and notes that heat and biological, physical and emotional stress can bring MS fatigue on. [[NICE2022]]`,
    pt:'Spreading tasks out and resting before running empty is a common self-management idea. It is not a tested dose of anything.'},
   {from:.4,at:.6,k:'TRIUMPHANT-MS, 2021',t:'Three drugs vs placebo',
    txt:`A crossover trial: 141 people enrolled and 136 analysed, each taking amantadine, modafinil, methylphenidate and placebo in turn. The MFIS fatigue score was 51.3 at baseline, 40.6 on placebo, 41.3 on amantadine, 39.0 on modafinil and 38.6 on methylphenidate (overall P = 0.20). Adverse events: 39–40% on the drugs vs 31% on placebo. [[Nourbakhsh2021]]`,
    hook:'Every arm fell from baseline, placebo included, so the drop is not a drug effect. The comparison that matters is drug vs placebo, and none was superior.'},
   {from:.64,at:.84,k:'Non-drug trials',t:'Exercise and CBT',
    txt:`Cochrane review (45 trials, 2250 people): in 26 trials with a non-exercise control, exercise reduced fatigue (SMD −0.53, 95% CI −0.73 to −0.33), and relapses were similar with and without exercise (25 vs 26). CBT (4 RCTs, 403 people): SMD −0.47 in the short term and −0.30 in the longer term, waning after treatment stopped. [[Heine2015,vandenAkker2016]]`,
    pt:'Exercise and structured talking therapy both lower fatigue scores in trials, and exercise did not trigger relapses.'},
   {from:.9,at:.97,k:'Controversy',t:'Guideline vs trial',
    txt:`NICE NG220 (2022) still lists amantadine, modafinil or an SSRI as off-label options after specialist shared decision-making, and advises against vitamin B12 injections for fatigue. TRIUMPHANT-MS (2021) found amantadine, modafinil and methylphenidate no better than placebo. Current status: non-drug approaches have the more consistent evidence. [[NICE2022,Nourbakhsh2021,Heine2015,vandenAkker2016]]`,
    hook:'Fatigue drugs: negative trial (TRIUMPHANT-MS) vs a guideline that still allows off-label use. Expect the question "which fatigue treatment has the best evidence?": exercise.'}];
  const fsvg=$('#syFat'),frg=$('#syFT');
  const bust=h=>h<9?.86:h<13.5?lerp(.86,.18,(h-9)/4.5):h<17?lerp(.18,.32,(h-13.5)/3.5):h<19?lerp(.32,.12,(h-17)/2):lerp(.12,.28,(h-19)/4);
  const paced=h=>.86-.3*(h-7)/16-.07*Math.abs(Math.sin(Math.PI*(h-7)/1.6))+(h>20?.05*(h-20)/3:0);
  const BLK={b:[ [9,13.5],[17,19] ],p:[ [9,10],[10.5,11.5],[12,12.8],[14,15],[15.5,16.4],[17.5,18.5] ]};
  const MF=[['baseline',51.3,'var(--muted)'],['placebo',40.6,'var(--muted)'],['amantadine',41.3,'var(--rx)'],['modafinil',39.0,'var(--rx)'],['methylphenidate',38.6,'var(--rx)']];
  const FO=[['exercise (26 trials)',-.53,-.73,-.33],['CBT, short term',-.47,-.88,-.06],['CBT, longer term',-.30,-.51,-.08]];
  function fdraw(t){
    const N=vb(fsvg,'720 470','400 668');
    const L=N?{dx0:44,dx1:368,dy0:44,dy1:150,B:{x:14,y:236,lx:118,bx:126,u:3.6},F:{x0:22,x1:378,y:458}}
             :{dx0:70,dx1:690,dy0:44,dy1:150,B:{x:20,y:236,lx:128,bx:136,u:3},F:{x0:400,x1:690,y:236}};
    let s='';const hr=lerp(7,23,ramp(t,0,.38)),X=h=>lerp(L.dx0,L.dx1,(h-7)/16),Y=v=>lerp(L.dy1,L.dy0,v);
    s+=`<text x="${N?14:20}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">ONE DAY · ENERGY (SCHEMATIC, NO DATA)</text>`;
    s+=`<rect x="${L.dx0}" y="${f1(Y(.3))}" width="${L.dx1-L.dx0}" height="${f1(L.dy1-Y(.3))}" style="fill:var(--bad-soft);opacity:.7"/><text x="${L.dx0+4}" y="${f1(L.dy1-4)}" class="t-xs">running on empty</text>`;
    s+=`<line x1="${L.dx0}" x2="${L.dx0}" y1="${L.dy0}" y2="${L.dy1}" class="axis" style="stroke:var(--muted)"/><line x1="${L.dx0}" x2="${L.dx1}" y1="${L.dy1}" y2="${L.dy1}" class="axis" style="stroke:var(--muted)"/>`;
    s+=`<text x="${L.dx0-6}" y="${L.dy0+8}" class="t-xs t-end">high</text><text x="${L.dx0-6}" y="${L.dy1}" class="t-xs t-end">low</text>`;
    [7,11,15,19,23].forEach(h=>{s+=`<text x="${f1(X(h))}" y="${L.dy1+12}" class="t-xs t-mid">${h}:00</text>`});
    const curve=(fn,c,dash)=>{let d='';for(let h=7;h<=hr+1e-6;h+=.1)d+=(d?'L':'M')+f1(X(h))+' '+f1(Y(fn(h)));return d?`<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.4;${dash?'stroke-dasharray:6 4;':''}stroke-linejoin:round"/>`:''};
    s+=curve(bust,'var(--attack)')+curve(paced,'var(--rx)',1);
    if(hr>7.2){s+=`<circle cx="${f1(X(hr))}" cy="${f1(Y(bust(hr)))}" r="4" style="fill:var(--attack)"/><circle cx="${f1(X(hr))}" cy="${f1(Y(paced(hr)))}" r="4" style="fill:var(--rx)"/>`}
    if(hr>22){s+=`<text x="${f1(X(23)-4)}" y="${f1(Y(bust(23))+14)}" class="t-xs t-end" style="fill:var(--attack)">one long burst</text><text x="${f1(X(23)-4)}" y="${f1(Y(paced(23))-8)}" class="t-xs t-end" style="fill:var(--rx)">split with rests</text>`}
    // activity strips
    [['b','burst','var(--attack)'],['p','paced','var(--rx)']].forEach(([key,lab,c],j)=>{const y=L.dy1+18+j*14;
      s+=`<text x="${L.dx0-6}" y="${y+7}" class="t-xs t-end">${lab}</text>`;
      BLK[key].forEach(([a,b])=>{if(hr>a)s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(Math.min(b,hr))-X(a))}" height="8" rx="2" style="fill:${c};opacity:.7"/>`})});
    // TRIUMPHANT-MS bars
    const B=L.B,gb=ease(ramp(t,.4,.62));
    s+=`<text x="${B.x}" y="${B.y}" class="t-sm" style="fill:var(--ink);font-weight:600">TRIUMPHANT-MS · MFIS</text><text x="${B.x}" y="${B.y+14}" class="t-xs">lower score = less fatigue</text>`;
    MF.forEach(([n,v,c],i)=>{const y=B.y+40+i*28;
      s+=`<text x="${B.lx}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${n}</text><rect x="${B.bx}" y="${y-7}" width="${f1(60*B.u)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${B.bx}" y="${y-7}" width="${f1(v*B.u*gb)}" height="12" rx="3" style="fill:${c};opacity:${i?.85:.45}"/>`;
      if(gb>.05)s+=`<text x="${f1(B.bx+v*B.u*gb+5)}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${f1(v)}</text>`});
    if(gb>.95){const y=B.y+40+5*28;s+=`<text x="${B.x}" y="${y}" class="t-xs" style="fill:var(--bad)">no drug beat placebo (overall P = 0.20)</text><text x="${B.x}" y="${y+14}" class="t-xs">adverse events 39–40% vs 31% on placebo</text>`}
    // forest plot
    const F=L.F,gf=ease(ramp(t,.64,.84)),fx=v=>lerp(F.x0,F.x1,(v+1)/1.5),zx=fx(0);
    s+=`<text x="${N?14:F.x0-20}" y="${F.y}" class="t-sm" style="fill:var(--ink);font-weight:600">NON-DRUG · EFFECT ON FATIGUE (SMD)</text>`;
    const fy0=F.y+34,axY=fy0+FO.length*44-14;
    s+=`<line x1="${f1(zx)}" x2="${f1(zx)}" y1="${fy0-22}" y2="${axY}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
    FO.forEach(([n,m,a,b],i)=>{const y=fy0+i*44,o=clamp(gf*3-i);
      s+=`<g style="opacity:${f1(o)}"><text x="${F.x0}" y="${y-10}" class="t-xs" style="fill:var(--ink)">${n} · ${m.toFixed(2).replace('-','−')} (${a.toFixed(2).replace('-','−')} to ${b.toFixed(2).replace('-','−')})</text>`;
      s+=`<line x1="${f1(fx(a))}" x2="${f1(fx(b))}" y1="${y}" y2="${y}" style="stroke:var(--rx);stroke-width:2.4"/><rect x="${f1(fx(m)-5)}" y="${y-5}" width="10" height="10" style="fill:var(--rx)"/></g>`});
    s+=`<line x1="${F.x0}" x2="${F.x1}" y1="${axY}" y2="${axY}" class="axis" style="stroke:var(--muted)"/>`;
    [-1,-.5,0,.5].forEach(v=>{s+=`<text x="${f1(fx(v))}" y="${axY+13}" class="t-xs t-mid">${String(v).replace('-','−')}</text>`});
    s+=`<text x="${f1(zx-6)}" y="${axY+28}" class="t-xs t-end" style="fill:var(--rx)">← less fatigue than control</text>`;
    fsvg.innerHTML=s;
    const p=phaseOf(SYF_STEPS,t);fset(p);$('#syFNote').innerHTML=noteHTML(SYF_STEPS[p]);
  }
  const fstop=playWire(frg,$('#syFPlay'),fdraw,16000,'Replay','symptoms');
  const fset=stepWire($('#syFSteps'),SYF_STEPS,frg,fdraw,fstop);
  fdraw(+frg.value);

  /* ---------- fampridine: responders, then the race ---------- */
  const SYR_T=[{n:'MS-F203',d:35,p:8,dT:'35% (78/224)',pT:'8% (6/72)',sp:25.2,ci:'21.5–28.8',pl:4.7,c:'[[Goodman2009]]'},
               {n:'MS-F204',d:42.9,p:9.3,dT:'42.9% (51/119)',pT:'9.3% (11/118)',sp:24.7,ci:'21.0–28.4',pl:null,c:'[[Goodman2010]]'}];
  let tri=0;
  const SYR_STEPS=[{from:0,at:.25,t:'Who responds'},{from:.38,at:.7,t:'The race'},{from:.9,at:.97,t:'How much faster'}];
  const rsvg=$('#syRace'),rrg=$('#syRT');
  function walker(x,y,ph,c,done){const a=done?4:Math.sin(ph)*7,b=done?3:Math.cos(ph)*4;
    return `<g style="stroke:${c};stroke-width:2.4;stroke-linecap:round;fill:none"><circle cx="${f1(x)}" cy="${f1(y-30)}" r="5" style="fill:${c};stroke:none"/><line x1="${f1(x)}" y1="${f1(y-24)}" x2="${f1(x)}" y2="${f1(y-11)}"/><line x1="${f1(x)}" y1="${f1(y-11)}" x2="${f1(x+a)}" y2="${f1(y)}"/><line x1="${f1(x)}" y1="${f1(y-11)}" x2="${f1(x-a)}" y2="${f1(y)}"/><line x1="${f1(x)}" y1="${f1(y-20)}" x2="${f1(x-a*.7+b)}" y2="${f1(y-13)}"/><line x1="${f1(x)}" y1="${f1(y-20)}" x2="${f1(x+a*.7)}" y2="${f1(y-13)}"/></g>`}
  function rdraw(t){
    const N=vb(rsvg,'720 400','400 584'),T=SYR_T[tri];
    const L=N?{g:[ [30,64],[218,64] ],sp:13,gy:44,R:{x0:40,x1:378,y:[330,414,498],ty:262,sx:14,sum:550}}
             :{g:[ [30,70],[200,70] ],sp:13,gy:48,R:{x0:420,x1:690,y:[110,200,290],ty:40,sx:30,sum:262}};
    let s=`<text x="${L.g[0][0]}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">${T.n} · TIMED-WALK RESPONDERS PER 100</text>`;
    const gr=ramp(t,0,.3);
    [ [T.d,'fampridine','var(--rx)',T.dT],[T.p,'placebo','var(--muted)',T.pT]].forEach(([v,lab,c,txt],j)=>{const [gx,gy]=L.g[j],nOn=Math.round(v),k=Math.floor(nOn*gr+1e-6);
      s+=`<text x="${gx}" y="${gy-12}" class="t-lbl" style="fill:${c}">${lab}</text>`;
      for(let i=0;i<100;i++){const x=gx+(i%10)*L.sp+5,y=gy+Math.floor(i/10)*L.sp+5,on=i<k;
        s+=`<circle cx="${x}" cy="${y}" r="${on?4.6:3.6}" style="fill:${on?c:'var(--panel-2)'};stroke:${on?'none':'var(--line)'}"/>`}
      s+=`<text x="${gx}" y="${gy+10*L.sp+18}" class="t-big" style="fill:${c}">${gr>.99?txt:Math.round(v*gr)+' in 100'}</text>`});
    // race
    const R=L.R,c=ramp(t,.42,.88),lanes=[['responder, before',1,'var(--muted)'],['responder on fampridine',1+T.sp/100,'var(--rx)']];
    if(T.pl!=null)lanes.push(['placebo group, average',1+T.pl/100,'var(--brand)']);
    s+=`<text x="${N?R.x0-26:R.x0-20}" y="${R.ty}" class="t-sm" style="fill:var(--ink);font-weight:600">THE 25-FOOT WALK (SCHEMATIC)</text>`;
    s+=`<text x="${R.x0}" y="${R.ty+16}" class="t-xs">start</text><text x="${R.x1}" y="${R.ty+16}" class="t-xs t-end">finish</text>`;
    lanes.forEach(([lab,sp,col],j)=>{const y=R.y[j],pos=Math.min(1,c*sp),x=lerp(R.x0+6,R.x1-10,pos),fin=pos>=1;
      s+=`<line x1="${R.x0}" x2="${R.x1}" y1="${y+2}" y2="${y+2}" style="stroke:var(--line);stroke-width:3"/><line x1="${R.x1}" x2="${R.x1}" y1="${y-40}" y2="${y+6}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 2"/>`;
      s+=`<text x="${R.x0}" y="${y+20}" class="t-xs" style="fill:${col}">${lab}${j?` · +${f1(sp*100-100)}% speed`:''}</text>`;
      s+=walker(x,y,pos*42,col,fin);
      if(fin&&c<1.001){const tm=Math.round(100/sp);s+=`<text x="${R.x1-8}" y="${y-38}" class="t-xs t-end" style="fill:${col}">${j?`done in ~${tm}% of the time`:'done: 100% of the time'}</text>`}});
    if(T.pl==null)s+=`<text x="${R.x0}" y="${R.y[2]}" class="t-xs">MS-F204 placebo speed change: not in these sources</text>`;
    const sm=ramp(t,.9,.95);
    if(sm>0)s+=`<g style="opacity:${f1(sm)}"><text x="${R.sx}" y="${R.sum}" class="t-lbl" style="fill:var(--rx)">Responders: +${f1(T.sp)}% walking speed</text><text x="${R.sx}" y="${R.sum+16}" class="t-xs">95% CI ${T.ci} · ${T.n}</text></g>`;
    rsvg.innerHTML=s;
    const p=phaseOf(SYR_STEPS,t);rset(p);
    const NT=[
     {k:T.n,t:'Who responds',txt:`A "timed-walk responder" walked faster on most on-treatment visits than on any off-treatment visit. In ${T.n}, ${T.dT} on fampridine 10 mg twice daily were responders, vs ${T.pT} on placebo. ${T.c}`,
      pt:'Roughly one person in three or four had a consistent improvement, against about one in ten or twelve on a dummy pill.'},
     {k:'Schematic race',t:'The race',txt:`The same responder walks the 25-foot test before and on treatment. At +${f1(T.sp)}% speed the walk takes about ${Math.round(100/(1+T.sp/100))}% of the original time (arithmetic from the published speed gain).${T.pl!=null?' In MS-F203 the placebo group as a whole improved 4.7%. [[Goodman2009]]':''} ${T.c}`,
      hook:'Fampridine trials report two numbers: the responder rate (35% and 42.9%) and the speed gain among responders (about 25%).'},
     {k:'Label and access',t:'How much faster',txt:`Responders\' walking speed rose ${f1(T.sp)}% (95% CI ${T.ci}). ${T.c} The US label says it improves walking, shown by walking speed; it is contraindicated with a history of seizure or moderate to severe kidney impairment, and seizure risk rises with dose. In England, NICE withdrew its recommendation and access follows an NHS England policy. [[FDAdalfampridine,NICE2022]]`,
      pt:'The tablet does not repair nerves. In animal studies it improved conduction in demyelinated fibres; the label says its mechanism is not fully understood, and only some people respond. [[AmpyraLabel2026]]'}];
    $('#syRNote').innerHTML=noteHTML(NT[p]);
  }
  const rstop=playWire(rrg,$('#syRPlay'),rdraw,15000,'Replay','symptoms');
  const rset=stepWire($('#syRSteps'),SYR_STEPS,rrg,rdraw,rstop);
  $$('[data-syr]').forEach(b=>b.addEventListener('click',()=>{tri=+b.dataset.syr;$$('[data-syr]').forEach(x=>x.setAttribute('aria-pressed',x===b));rdraw(+rrg.value)}));
  rdraw(+rrg.value);
  const prevR=redraws.symptoms;redraws.symptoms=()=>{prevR&&prevR();hotMode=null;draw(+rg.value)};

  $('#syCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Rehabilitation programmes</h4><p>Cochrane (8 trials, 747 people): strong evidence that inpatient multidisciplinary rehabilitation improves activity and participation in the short term, without changing impairment. Low-intensity programmes over longer periods brought longer-term quality-of-life gains. [[Khan2007]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Exercise did not raise relapses</h4><p>In the Cochrane exercise review, relapses were similar with and without exercise (25 vs 26), and the authors concluded exercise can be prescribed without harm. NICE NG220 tells clinicians to encourage exercise and to say it has no harmful effects on MS. [[Heine2015,NICE2022]]</p></div>
   <div class="card"><h4>People with MS move less</h4><p>Exercise can help manage symptoms, restore function and improve quality of life, yet people with MS remain much less active than the general population, unchanged over 25 years. [[Motl2017]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Exercise as medicine?</h4><p>A 2019 review proposes prescribing exercise early, alongside drugs. Its symptomatic benefits are established; possible disease-modifying and preventive effects are still being tested. [[Dalgas2019]]</p></div>
   <div class="card"><h4>Falls and balance</h4><p>Over 3 months, 56% fell and 37% fell repeatedly; 65% of falls were indoors. Odds peaked around EDSS 4.0 and 6.0, and primary progressive MS doubled them (OR 2.02). NICE suggests vestibular rehabilitation for limited standing balance. [[Nilsagard2015,NICE2022]]</p></div>
   <div class="card"><h4>Heat and cooling</h4><p>Heat slows or blocks conduction in demyelinated axons, so symptoms can return briefly in warm weather, a hot bath or exercise. Cooling before or during exercise can reduce this. <a href="#myelin" data-go="myelin">See why heat blocks a damaged fibre</a>. [[Davis2010,Silarova2024]]</p></div>
   <div class="card"><h4>A wider programme</h4><p>A <i>Lancet</i> seminar recommends a comprehensive management programme that promotes wellness, deals with aggravating factors and manages other conditions alongside MS. [[Thompson2018Lancet]]</p></div>
   <div class="card"><h4>Mood: getting help</h4><p>Depression is common (about 24–31% in pooled studies) and suicide risk is higher, especially around diagnosis. [[Marrie2015Psych,Boeschoten2017,Shen2019]]</p><div class="sy-help"><b>If you are struggling,</b> contact your local emergency number or a crisis line now, or tell a doctor or someone you trust today.</div></div>`;
};
