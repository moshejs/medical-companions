/* =============== 2.1 relapse & remission over time =============== */
const CO_Y0=-3,CO_Y1=30;
const coT=y=>(y-CO_Y0)/(CO_Y1-CO_Y0);
/* piecewise-linear interpolation through knots [ [year,value], ... ] */
function coPL(k,y){if(y<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(y<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return k[k.length-1][1]}
/* one illustrative person per course.
   rel: attacks {y: year, s: EDSS jump at the peak, r: residual left after recovery}
   pk:  knots of the relapse-independent (PIRA) component of EDSS
   anch: published medians the line passes through (circled) */
const CO_SC={
 rs:{n:'Relapsing → secondary progressive',
  rel:[{y:0,s:1.5,r:0},{y:1.7,s:2,r:.5},{y:3,s:1.5,r:0},{y:4.6,s:2.5,r:1},{y:6.3,s:1.5,r:0},{y:8,s:1.5,r:0},{y:9.6,s:2,r:1},{y:13.2,s:1.5,r:0}],
  pk:[ [-3,0],[5,0],[11.4,1.5],[16,2.3],[23.1,3.5],[30,4.2] ],
  anch:[{y:11.4,e:4,l:'DSS 4 · 11.4 y',side:'r'},{y:23.1,e:6,l:'DSS 6 · 23.1 y',side:'l'}],
  ph:[{y:-3,n:'RIS',c:'var(--panel-2)'},{y:0,n:'CIS',c:'var(--gold-soft)'},{y:1.7,n:'RRMS',c:'var(--orange-soft)'},{y:16,n:'SPMS',c:'var(--attack-soft)'}],
  prog:16,trans:[13,18],les:y=>y<0?1.2:y<14?2.4:Math.max(.3,1-(y-14)*.04)},
 pp:{n:'Primary progressive',
  rel:[{y:9,s:1,r:0}],
  pk:[ [-3,0],[0,0],[1,2.5],[2.5,4],[7.1,6],[13.4,7],[30,7.5] ],
  anch:[{y:7.1,e:6,l:'DSS 6 · 7.1 y',side:'l'},{y:13.4,e:7,l:'DSS 7 · 13.4 y',side:'r'}],
  ph:[{y:-3,n:'RIS',c:'var(--panel-2)'},{y:0,n:'PPMS',c:'var(--attack-soft)'}],
  prog:0,les:y=>y<0?1:.7},
 tx:{n:'Relapsing, effective early treatment',
  rel:[{y:0,s:1.5,r:0},{y:.9,s:1.5,r:.5},{y:7.5,s:1,r:0}],
  pk:[ [-3,0],[3,0],[10,.5],[20,1.2],[30,2] ],
  anch:[],dmt:1,ghost:'rs',
  ph:[{y:-3,n:'RIS',c:'var(--panel-2)'},{y:0,n:'CIS',c:'var(--gold-soft)'},{y:.9,n:'RRMS',c:'var(--orange-soft)'}],
  prog:null,les:y=>y<0?1.2:y<1.1?3:.12},
 mild:{n:'A mild course',
  rel:[{y:0,s:1.2,r:0},{y:2.5,s:1,r:0},{y:6,s:1,r:.5},{y:14,s:1,r:0}],
  pk:[ [-3,0],[1,0],[4,1],[10,1.5],[20,2],[30,2.5] ],
  anch:[],fork:true,
  ph:[{y:-3,n:'RIS',c:'var(--panel-2)'},{y:0,n:'CIS',c:'var(--gold-soft)'},{y:2.5,n:'RRMS',c:'var(--orange-soft)'}],
  prog:null,les:y=>y<0?.8:.6}
};
function coEv(S,y){let tot=0,raw=0;
  for(const r of S.rel){if(y<r.y)continue;const dt=y-r.y;
    if(dt<.04)tot+=r.s*dt/.04;else{const d=Math.exp(-(dt-.04)/.12);tot+=r.r+(r.s-r.r)*d;raw+=r.r*(1-d)}}
  const p=coPL(S.pk,y);return{e:clamp(p+tot,0,10),raw,pira:p,base:p+raw}}
function coBuild(S){const ys=[];for(let y=CO_Y0;y<=CO_Y1+1e-9;y+=.04)ys.push(y);
  S.rel.forEach(r=>[0,.01,.02,.03,.04,.06,.09,.13,.18,.25,.35,.5,.7].forEach(d=>ys.push(r.y+d)));
  return ys.filter(y=>y>=CO_Y0&&y<=CO_Y1).sort((a,b)=>a-b).map(y=>Object.assign({y},coEv(S,y)))}
const coEd=e=>{let v=Math.round(e*2)/2;if(v===.5)v=1;return v.toFixed(1)};

const CO_RIS={k:'Years −3 to 0 · before symptoms',t:'RIS: lesions without symptoms',
  txt:`Some people have MS-like lesions on an MRI done for another reason and no symptoms at all: radiologically isolated syndrome. In a multinational cohort of 451 people with RIS, 34% had a first clinical event within 5 years; in a later 10-year follow-up study the cumulative probability was 51.2%. Younger age, spinal cord lesions and, at 10 years, CSF oligoclonal bands predicted conversion. The 2013 course definitions did not count RIS as MS; the 2024 McDonald criteria allow some people with RIS to meet a diagnosis of MS. Press <b>Show the iceberg</b> to see the lesions. [[Okuda2014,LebrunFrenay2020,Lublin2014,Montalban2025]]`,
  pt:`The scan shows spots of damage before the person has noticed anything.`,
  hook:`RIS: about 1 in 3 have a first clinical event by 5 years (34%), about half by 10 years (51.2%).`};
const CO_CIS={k:'Year 0 · first attack',t:'Clinically isolated syndrome',
  txt:`The first attack usually affects one place: in the Barcelona first-attack cohort, the optic nerve in 34.1%, the spinal cord in 29.5% and the brainstem in 25.1%. The 2013 revision added CIS as the first presentation of possible MS that does not yet meet dissemination in time. Only 30–70% of people with CIS go on to develop MS. After optic neuritis the 15-year risk was 25% with a normal brain MRI and 72% with at least one lesion. [[Tur2023,Lublin2014,Miller2005,ONSG2008]]`,
  pt:`The first episode is often blurred vision in one eye, numbness or weakness. Some people never have a second one.`,
  hook:`CIS = a first attack that does not yet show dissemination in time. In Barcelona, 10 or more baseline brain lesions carried an adjusted HR of 11.3 for clinically definite MS. [[Tintore2015]]`};
const CO_STEPS={
 rs:[
  Object.assign({from:0,at:coT(-1.5)},CO_RIS),
  Object.assign({from:coT(0),at:coT(.5)},CO_CIS),
  {from:coT(1.7),at:coT(5),k:'Years 2–15',t:'Relapsing-remitting',
   txt:`Attacks come, then improve partly or fully. The 2013 descriptors add a modifier: <b>active</b> means a relapse or new MRI activity (a gadolinium-enhancing lesion, or a new or enlarging T2 lesion), judged at least once a year. MRI can show new lesions that cause no symptoms, as RIS shows, which is why MRI activity counts too. Placebo-arm relapse rates were 1.27 a year in the 1993 interferon beta-1b trial and 0.84 in the 1995 glatiramer trial. Early relapses matter most: in London, Ontario, 1 versus 3 or more attacks in the first 2 years separated time to DSS 6 by 7.6 years. [[Lublin2014,Okuda2009,IFNB1993,Johnson1995,Scalfari2010]]`,
   pt:`Flare-ups come and settle. Between them, the scan can still show new spots that cause no symptoms.`,
   hook:`Lublin 2013 = phenotype + modifiers. "RRMS, active" means a relapse or a new MRI lesion in the past year.`},
  {from:coT(9.2),at:coT(10.4),k:'Year 9.6 · a relapse leaves a mark',t:'Relapse-associated worsening',
   txt:`Not every relapse recovers fully. In pooled placebo arms, 42% of patients had a residual deficit of at least 0.5 EDSS point and 28% of at least 1.0 point, an average of 64 days after a relapse. Trials call a confirmed increase within 90 days of a relapse relapse-associated worsening (RAW). In NO.MS (more than 27,000 patients) the hazard of worsening was 31–48% higher after a year with relapses; older age and existing disability predicted incomplete recovery. In this illustration 3 of 8 attacks leave something behind (filled triangles). [[Lublin2003,Kappos2020,Lublin2022]]`,
   pt:`This flare-up settled, but not all the way. A little of it stayed, and the line steps up.`,
   hook:`Lublin 2003: 42% of patients were left with ≥0.5 EDSS point after a relapse, 28% with ≥1.0.`},
  {from:coT(11),at:coT(12.2),k:'Years 10–15 · no relapse needed',t:'Progression independent of relapse activity',
   txt:`<span class="ev est">Established</span> Between relapses the line keeps creeping up: the orange area. In pooled OPERA I and II data, PIRA made up 78.0% (interferon beta-1a arm) and 88.0% (ocrelizumab arm) of 12-week confirmed disability accumulation, and relapse-associated worsening 17.7%. A review of 48 studies estimated PIRA in about 5% of people with RRMS a year, causing at least 50% of disability accrual. In Barcelona, PIRA within 5 years of a first attack carried a 26-fold higher risk of reaching EDSS 6.0. The UCSF group calls it "silent progression". [[Kappos2020,Muller2023,Tur2023,Cree2019]]`,
   pt:`Disability can grow slowly even when there are no flare-ups. The orange area is this quiet worsening.`,
   hook:`Most confirmed disability accumulation in relapsing MS is PIRA, not RAW (OPERA: 78–88%).`},
  {from:coT(15),at:coT(23.6),k:'Years 16–30',t:'Secondary progressive',
   txt:`Relapses fade and steady worsening takes over. No test marks the switch, so SPMS is usually diagnosed in hindsight, here somewhere in the shaded transition. The circles are medians from the Lyon natural-history cohort for relapsing onset: irreversible DSS 4 at 11.4 years and DSS 6 at 23.1 years (DSS 7 at 33.1 years, off this chart). How often the switch happens in treated people today is disputed: see the cards below. <span class="ev hyp">Hypothesis</span> Some authors argue that a diffuse "smouldering" process, present from the start, is the real driver. [[Lublin2014,Confavreux2000,Giovannoni2022,Calabrese2024]]`,
   pt:`Later, flare-ups become rare and disability grows slowly. Doctors usually recognise this phase only looking back.`,
   hook:`SPMS is a diagnosis made in hindsight. Describe it with the modifiers, for example "SPMS, not active, with progression".`}],
 pp:[
  Object.assign({},CO_RIS,{from:0,at:coT(-1.5),txt:CO_RIS.txt+' Of people with RIS who went on to have symptoms, 9.6% met criteria for PPMS. [[Okuda2014]]'}),
  {from:coT(0),at:coT(1.5),k:'Year 0 · onset',t:'Progressive from onset',
   txt:`In primary progressive MS, disability builds from the start without relapses first. Its share differs by cohort: 9% PPMS (15% progressive from onset) in Lyon, about 16% of adult-onset cases in French data, and 28–33% in London, Ontario. The 2013 revision kept PPMS separate because there are no exacerbations before progression. The progressive phase began at a similar median age in SPMS and in progressive-onset MS: 39.1 and 40.1 years. [[Confavreux2006,Renoux2007,Weinshenker1989,Lublin2014]]`,
   pt:`Here there are no flare-ups at the start. Walking slowly gets harder over months and years.`,
   hook:`PPMS = progression from onset with no prior relapses. The progressive phase starts around age 40 whether or not relapses came first.`},
  {from:coT(5),at:coT(7.6),k:'Years 2–8',t:'Milestones come sooner',
   txt:`For progressive onset in the Lyon cohort, median times from onset to irreversible DSS 4, 6 and 7 were 0.0, 7.1 and 13.4 years, against 11.4, 23.1 and 33.1 years for relapsing onset. Once DSS 4 was reached, the time to DSS 6 was similar in both groups (5.7 vs 5.4 years). Medians from onset and medians from DSS 4 describe different groups of patients at different times, so they do not add up along one drawn line. The circles mark DSS 6 and DSS 7; the line before them is drawn. [[Confavreux2000]]`,
   pt:`Disability milestones arrive earlier than with relapsing onset, but once walking is limited the pace is similar.`,
   hook:`Similar pace after DSS 4 whatever the onset: one argument for MS as one disease. [[Confavreux2006]]`},
  {from:coT(8.8),at:coT(9.15),k:'Year 9 · an attack',t:'"PP, active"',
   txt:`People with PPMS can still have an occasional attack or new MRI lesion. Since the 2013 revision, the category "progressive relapsing" no longer exists: a person with PPMS who has an acute attack is described as "PP, active". [[Lublin2014]]`,
   pt:`Even in this form, an occasional flare-up can happen. It changes the description, not the type.`,
   hook:`PRMS was eliminated in 2013. PPMS plus a relapse = "PPMS, active".`},
  {from:coT(12),at:coT(14),k:'Years 12–20',t:'PIRA drives disability',
   txt:`In NO.MS, PIRA began early, occurred in every phenotype and became the main driver of disability in the progressive phase. In progressive MS, inflammation persists but sits partly behind a closed blood-brain barrier; cortical demyelination and diffuse injury of normal-appearing white matter are hallmarks of progressive disease at autopsy. [[Lublin2022,Lassmann2012,Kutzelnigg2005]]`,
   pt:`The damage continues inside the brain and spinal cord, where it is harder to reach with drugs.`,
   hook:`Progressive MS: compartmentalised inflammation behind a closed blood-brain barrier, cortical lesions, diffuse white-matter injury.`},
  {from:coT(20),at:coT(28),k:'Years 20–30',t:'The long view',
   txt:`<span class="ev hyp">Hypothesis</span> "Smouldering MS" describes a diffuse, compartmentalised process present from early disease; a 2024 consensus proposed "smouldering-associated worsening" for physical and cognitive decline beyond PIRA. At autopsy, smouldering plaques were found almost only in progressive MS. The line beyond the last circle is a schematic extension. [[Giovannoni2022,Scalfari2024,Frischer2015]]`,
   pt:`Scientists think a slow, low-level process inside the brain keeps going in the background.`,
   hook:`Smouldering (slowly expanding) plaques are typical of progressive MS; iron-rim lesions grow over time. [[DalBianco2017]]`}],
 tx:[
  Object.assign({},CO_RIS,{from:0,at:coT(-1.5),txt:CO_RIS.txt+' In the ARISE trial in RIS (87 people), dimethyl fumarate reduced the risk of a first clinical event over 96 weeks (HR 0.18). [[Okuda2023]]'}),
  Object.assign({},CO_CIS,{from:coT(0),at:coT(.4),txt:CO_CIS.txt+' In the Barcelona CIS cohort, treatment before a second attack was associated with a lower risk of reaching EDSS 3.0 (adjusted HR 0.5). [[Tintore2015]]'}),
  {from:coT(1),at:coT(2.5),k:'Year 1',t:'Effective treatment starts early',
   txt:`In this schematic scenario an effective disease-modifying therapy starts after the second attack (teal band). New MRI lesions and relapses become rare. In one large study, serum neurofilament light, a marker of nerve-fibre damage, fell to control levels on monoclonal antibodies, fell less on oral drugs and stayed raised on interferons and glatiramer acetate. Which drug, and when, is covered in <a href="#dmt" data-go="dmt">How the drugs work</a> and <a href="#ladder" data-go="ladder">The DMT ladder</a>. [[Benkert2022]]`,
   pt:`Treatment calms the inflammation: far fewer flare-ups and new spots on the scan.`,
   hook:`In NO.MS, DMT delayed EDSS 4 by 3.51 years and EDSS 6 by 3.09 years. [[Lublin2022]]`},
  {from:coT(4),at:coT(6),k:'Years 3–8',t:'Quiet scans, but not zero risk',
   txt:`With relapses and new lesions suppressed, other signals matter. An age- and BMI-adjusted serum NfL Z score above 1.5 (against 10,133 reference samples) predicted future clinical or MRI activity (OR 3.15), including in people with no evidence of disease activity (OR 2.66). [[Benkert2022]]`,
   pt:`The scans may look quiet. Blood tests for nerve damage are being studied to spot trouble earlier.`,
   hook:`NfL is neuron-specific and rises with gadolinium-enhancing lesions (median 29.6 pg/ml without, 62.5 with brain and spinal enhancement). [[Disanto2017]]`},
  {from:coT(9),at:coT(14),k:'Years 8–20',t:'PIRA can continue',
   txt:`<span class="ev est">Established</span> Suppressing relapses does not stop all worsening. On ocrelizumab in OPERA I and II, 88.0% of confirmed disability accumulation was PIRA. Its share rises with age, disease duration and potent relapse suppression. In the UCSF cohort, people free of relapses could still worsen ("silent progression"). Treatments aimed at this are in <a href="#cure" data-go="cure">Toward a cure</a>. [[Kappos2020,Muller2023,Cree2019]]`,
   pt:`Even when flare-ups stop, some slow worsening can still happen. That is the main target of current research.`,
   hook:`With highly effective therapy, most of the disability that still accrues is PIRA.`},
  {from:coT(18),at:coT(25),k:'Years 20–30',t:'The treatment era, in numbers',
   txt:`In the treated UCSF EPIC cohort (517 patients), 18.1% had SPMS and 10.7% had reached EDSS 6 or more at a median 16.8 years after onset; EDSS was stable or improved in 41%. In MSBase, initial interferon beta or glatiramer acetate was associated with lower SPMS conversion (5-year risk 12% vs 27%; HR 0.71). These are observational data, with no randomised long-term proof, and this curve is schematic. The dashed line is the untreated scenario for comparison. [[Cree2016,Brown2019]]`,
   pt:`Today, with treatment, many people do much better than in the older natural-history studies.`,
   hook:`SPMS conversion: about 80% within two decades in older untreated data vs 18.1% at about 17 years in a treated cohort. [[Brown2019,Cree2016]]`}],
 mild:[
  Object.assign({from:0,at:coT(-1.5)},CO_RIS),
  Object.assign({from:coT(0),at:coT(.5)},CO_CIS),
  {from:coT(1.5),at:coT(6.6),k:'Years 1–9',t:'Few relapses, good recovery',
   txt:`Some people have few relapses that recover well, and little disability for many years. In the London, Ontario cohort, disability had a bimodal distribution, with peaks at DSS 1 and DSS 6. [[Weinshenker1989]]`,
   pt:`A few flare-ups, each settling well. Daily life carries on much as before.`,
   hook:`"Benign" and "malignant" are severity labels, not phenotypes (Lublin 2013).`},
  {from:coT(9),at:coT(10.5),k:'Year 10',t:'"Benign" at 10 years?',
   txt:`A common research definition of "benign" MS is EDSS 3 or less 10 years after onset (dashed line). The 2013 revision says "benign" should only ever be applied in hindsight, and with caution. [[Sayao2007,Lublin2014]]`,
   pt:`At 10 years this person would be called "benign". The label only looks backwards.`,
   hook:`Benign MS (research definition): EDSS ≤3 at 10 years.`},
  {from:coT(15),at:coT(20.5),k:'Year 20',t:'Twenty years on',
   txt:`In British Columbia, 169 people who were "benign" at 10 years were assessed again at 20 years: 52.1% were still benign, 21.3% had reached EDSS 6 or more, and 23% of those with relapsing onset had converted to SPMS. In a UK CIS cohort followed for 20 years, 39% of those with MS had EDSS 3 or less and 42% were secondary progressive. The dashed branch shows the other path. [[Sayao2007,Fisniku2008]]`,
   pt:`About half of people called "benign" at 10 years still were at 20. The rest had worsened.`,
   hook:`Sayao 2007: of "benign" at 10 years, 52.1% still benign at 20, 21.3% EDSS ≥6.`},
  {from:coT(24),at:coT(29),k:'Beyond EDSS',t:'What "benign" can hide',
   txt:`A low EDSS mostly reflects the neurological exam and walking. A 2012 review describes cognitive decline, fatigue, pain and depression in people labelled benign, and concludes that EDSS-based definitions overestimate truly benign MS. See <a href="#edss" data-go="edss">Measuring disability</a>. [[Correale2012,MeyerMoock2014]]`,
   pt:`Someone can walk well and still struggle with tiredness, thinking or mood. EDSS does not see much of that.`,
   hook:`EDSS 4–6 depends heavily on walking; cognition and fatigue are largely missed. [[MeyerMoock2014]]`}]
};

inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT');let sc='rs',ice=false,setSt=()=>{};
  const DATA={};
  Object.keys(CO_SC).forEach((k,i)=>{const S=CO_SC[k],r=rng(211+i*53),L=[];
    for(let y=CO_Y0;y<CO_Y1;y+=.05)if(r()<S.les(y)*.05)L.push({y:y+r()*.05,d:r()});
    S.rel.forEach(R=>{const n=1+Math.floor(r()*2.2);for(let j=0;j<n;j++)L.push({y:R.y-.04+r()*.06,d:r()})});
    L.sort((a,b)=>a.y-b.y);DATA[k]={pts:coBuild(S),les:L}});
  function label(S,D,y){if(y<0)return 'RIS · no symptoms yet';let ph=S.ph[0];S.ph.forEach(p=>{if(y>=p.y)ph=p});
    const y0=Math.max(0,y-1),act=S.rel.some(r=>r.y>y0&&r.y<=y)||D.les.some(l=>l.y>y0&&l.y<=y);
    let s=ph.n+', '+(act?'active':'not active');
    if(S.prog!=null&&y>=S.prog){const d=coEv(S,y).base-coEv(S,y0).base;s+=', '+(d>=.1?'with':'without')+' progression'}
    if(S.fork&&y>=10)s+=' ("benign" only in hindsight)';
    return s}
  function draw(t){
    const N=vb(svg,'720 520','400 566');
    const S=CO_SC[sc],D=DATA[sc],yN=lerp(CO_Y0,CO_Y1,t),ev=coEv(S,yN);
    const L=N?{x0:46,x1:390,eT:16,eL:30,e0:40,e1:196,iT:218,i0:224,w:262,i1:348,bT:368,b0:376,b1:440,sT:460,s0:466,s1:482,a0:488,p0:502,tk:526,ax:544,ft:560}
             :{x0:70,x1:704,eT:20,eL:20,e0:30,e1:170,iT:190,i0:196,w:236,i1:312,bT:330,b0:336,b1:410,sT:428,s0:434,s1:450,a0:456,p0:470,tk:498,ax:516,ft:516};
    const X=y=>lerp(L.x0,L.x1,(y-CO_Y0)/(CO_Y1-CO_Y0)),E=e=>lerp(L.e1,L.e0,e/10),xN=X(yN);
    const top=L.e0-4,bot=L.p0+8;let s='';
    /* bands behind everything */
    if(S.trans&&yN>=S.trans[0]){const b=Math.min(yN,S.trans[1]);s+=`<rect x="${f1(X(S.trans[0]))}" y="${top}" width="${f1(X(b)-X(S.trans[0]))}" height="${L.e1-top}" style="fill:var(--attack);opacity:.07"/>`;
      if(yN>=S.trans[1]-1)s+=`<text x="${f1(X((S.trans[0]+S.trans[1])/2))}" y="${L.e0+10}" class="t-xs t-mid" style="fill:var(--attack)">${N?'transition':'transition, seen in hindsight'}</text>`}
    if(S.dmt!=null&&yN>=S.dmt){s+=`<rect x="${f1(X(S.dmt))}" y="${top}" width="${f1(xN-X(S.dmt))}" height="${bot-top}" style="fill:var(--rx-soft);opacity:.6"/>`;
      if(yN>=S.dmt+(N?9:6))s+=`<text x="${f1(X(S.dmt)+5)}" y="${L.e0+10}" class="t-xs" style="fill:var(--rx)">effective DMT from year 1 (schematic)</text>`}
    /* year grid */
    (N?[-3,0,10,20,30]:[-3,0,5,10,15,20,25,30]).forEach(y=>{s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${top}" y2="${L.s1}" class="grid"/><text x="${f1(X(y))}" y="${L.tk}" class="t-xs t-mid">${y<0?'−'+(-y):y}</text>`});
    /* ---- panel 1: EDSS ---- */
    s+=`<text x="${L.x0}" y="${L.eT}" class="t-sm" style="fill:var(--orange)">DISABILITY · EDSS 0–10</text>`;
    s+=N?`<text x="${L.x0}" y="${L.eL}" class="t-xs"><tspan style="fill:var(--attack)">■ RAW: left by relapses</tspan>   <tspan style="fill:var(--orange)">■ PIRA: without relapses</tspan></text>`
        :`<text x="${L.x1}" y="${L.eL}" class="t-xs t-end"><tspan style="fill:var(--attack)">■ left behind by relapses (RAW)</tspan>   <tspan style="fill:var(--orange)">■ worsening without relapses (PIRA)</tspan></text>`;
    [0,2,4,6,8,10].forEach(e=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(E(e))}" y2="${f1(E(e))}" class="${e?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(E(e)+3)}" class="t-xs t-end">${e}</text>`});
    if(S.ghost){const G=DATA[S.ghost].pts;let g='';G.forEach((p,i)=>{if(i%2&&i<G.length-1)return;g+=(g?'L':'M')+f1(X(p.y))+' '+f1(E(p.e))});
      s+=`<path d="${g}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4;opacity:.75"/><text x="${f1(X(29.6))}" y="${f1(E(6.7)-7)}" class="t-xs t-end">untreated scenario (dashed)</text>`}
    const boxes=[];/* label boxes [x0,x1,y0,y1] the moving in-area labels must avoid */
    S.anch.forEach(A=>{if(yN<A.y-.02)return;const cx=X(A.y),cy=E(A.e),w=A.l.length*5.8;boxes.push(A.side==='l'?[cx-9-w,cx-9,cy-17,cy-6]:[cx+9,cx+9+w,cy+7,cy+18],[cx-7,cx+7,cy-7,cy+7])});
    if(S.fork){s+=`<line x1="${f1(X(0))}" x2="${f1(X(10))}" y1="${f1(E(3))}" y2="${f1(E(3))}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${f1(X(0)+4)}" y="${f1(E(3)-6)}" class="t-xs" style="fill:var(--good)">${N?'"benign": EDSS ≤3 at year 10':'"benign" cut-off: EDSS ≤3 at year 10'}</text>`;
      if(yN>10){const y2=Math.min(yN,20),e0=coEv(S,10).e;s+=`<line x1="${f1(X(10))}" y1="${f1(E(e0))}" x2="${f1(X(y2))}" y2="${f1(E(lerp(e0,6,(y2-10)/10)))}" style="stroke:var(--attack);stroke-width:1.6;stroke-dasharray:4 3"/>`;
        if(yN>=20){const e20=E(coEv(S,20).e),x20=X(20),l1='21.3% reached EDSS ≥6',l2='52.1% still EDSS ≤3';
          const L1=N?[x20-9-l1.length*5.8,x20-9,E(6)-17,E(6)-6]:[x20+9,x20+9+l1.length*5.8,E(6)-5,E(6)+6],L2=N?[x20-9-l2.length*5.8,x20-9,e20+7,e20+18]:[x20+9,x20+9+l2.length*5.8,e20+5,e20+16];
          boxes.push(L1,L2,[x20-7,x20+7,e20-7,e20+7]);
          s+=`<circle cx="${f1(x20)}" cy="${f1(E(6))}" r="5.5" style="fill:none;stroke:var(--attack);stroke-width:1.8"/><text x="${f1(N?L1[1]:L1[0])}" y="${f1(L1[3]-2)}" class="t-xs${N?' t-end':''}" style="fill:var(--attack)">${l1}</text>`;
          s+=`<circle cx="${f1(x20)}" cy="${f1(e20)}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(N?L2[1]:L2[0])}" y="${f1(L2[3]-2)}" class="t-xs${N?' t-end':''}">${l2}</text>`}}}
    const P=D.pts.filter(p=>p.y<=yN);
    if(P.length>1){const l0=P[P.length-1];
      let a='';P.forEach((p,i)=>{a+=(i?'L':'M')+f1(X(p.y))+' '+f1(E(p.raw))});
      s+=`<path d="${a}L${f1(X(l0.y))} ${f1(E(0))}L${f1(X(P[0].y))} ${f1(E(0))}Z" style="fill:var(--attack);opacity:.22"/>`;
      let up='',dn='';P.forEach((p,i)=>{up+=(i?'L':'M')+f1(X(p.y))+' '+f1(E(p.base))});for(let i=P.length-1;i>=0;i--)dn+='L'+f1(X(P[i].y))+' '+f1(E(P[i].raw));
      s+=`<path d="${up}${dn}Z" style="fill:var(--orange);opacity:.22"/>`;
      let ln='';P.forEach((p,i)=>{ln+=(i?'L':'M')+f1(X(p.y))+' '+f1(E(p.e))});
      s+=`<path d="${ln}" style="fill:none;stroke:var(--orange);stroke-width:2.4;stroke-linejoin:round"/>`;
      /* in-area labels where there is room, never on top of a circled point's label */
      const lx=xN-(N?26:40),hit=yy=>boxes.some(b=>lx>b[0]-16&&lx<b[1]+16&&yy>b[2]-2&&yy<b[3]+10);
      if(lx>X(0)+10){const q=coEv(S,lerp(CO_Y0,CO_Y1,(lx-L.x0)/(L.x1-L.x0)));
        const yP=(E(q.raw)+E(q.base))/2+3,yR=(E(0)+E(q.raw))/2+3;
        if(E(q.raw)-E(q.base)>15&&q.raw<q.base&&!hit(yP))s+=`<text x="${f1(lx)}" y="${f1((E(q.raw)+E(q.base))/2+3)}" class="t-xs t-mid" style="fill:var(--orange)">PIRA</text>`;
        if(E(0)-E(q.raw)>15&&!hit(yR))s+=`<text x="${f1(lx)}" y="${f1((E(0)+E(q.raw))/2+3)}" class="t-xs t-mid" style="fill:var(--attack)">RAW</text>`}}
    const ph=phaseOf(CO_STEPS[sc],t);
    if(sc==='rs'&&ph===3&&yN>10){const q=coEv(S,10.3);s+=`<text x="${f1(X(10.3)+6)}" y="${f1(E(q.e)+16)}" class="t-xs" style="fill:var(--attack)">+1.0 stays</text>`}
    S.anch.forEach(A=>{if(yN<A.y-.02)return;const cx=X(A.y),cy=E(A.e);s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`;
      s+=A.side==='l'?`<text x="${f1(cx-9)}" y="${f1(cy-8)}" class="t-xs t-end" style="fill:var(--ink)">${A.l}</text>`:`<text x="${f1(cx+9)}" y="${f1(cy+16)}" class="t-xs" style="fill:var(--ink)">${A.l}</text>`});
    s+=`<circle cx="${f1(xN)}" cy="${f1(E(ev.e))}" r="4.5" style="fill:var(--orange);stroke:var(--panel);stroke-width:1.5"/>`;
    /* ---- panel 2: the iceberg ---- */
    s+=`<text x="${L.x0}" y="${L.iT}" class="t-sm" style="fill:var(--attack)">${N?'RELAPSES':'ABOVE THE WATERLINE: RELAPSES'}</text><text x="${L.x1}" y="${L.iT}" class="t-xs t-end">▲ left a deficit   △ full recovery</text>`;
    S.rel.forEach(r=>{if(r.y>yN)return;const x=X(r.y),h=10+r.s*9,bw=N?3.2:4.2;
      s+=`<path d="M${f1(x-bw)} ${L.w} L${f1(x)} ${f1(L.w-h)} L${f1(x+bw)} ${L.w}Z" style="fill:${r.r>0?'var(--attack)':'var(--panel)'};stroke:var(--attack);stroke-width:1.4;stroke-linejoin:round"/>`;
      if(r.r>0&&!N)s+=`<text x="${f1(x)}" y="${f1(L.w-h-4)}" class="t-xs t-mid" style="fill:var(--attack)">+${r.r.toFixed(1)}</text>`});
    s+=`<rect x="${L.x0}" y="${L.w}" width="${L.x1-L.x0}" height="${L.i1-L.w}" rx="4" class="mri"/><line x1="${L.x0}" x2="${L.x1}" y1="${L.w}" y2="${L.w}" style="stroke:var(--pulse);stroke-width:2"/>`;
    const mT=L.w+18,mB=L.i1-18;
    if(ice){const nGd=D.les.filter(l=>yN-l.y>=0&&yN-l.y<3.07/52).length;
      s+=`<text x="${L.x0+6}" y="${L.w+12}" class="t-mri">${N?'BELOW: NEW MRI LESIONS':'BELOW THE WATERLINE: NEW MRI LESIONS (not to scale)'}</text><text x="${L.x1-6}" y="${L.w+12}" class="t-mri t-end">${nGd?'gadolinium-enhancing now: '+nGd:'none enhancing now'}</text>`;
      /* smouldering layer: opacity follows the slope of the relapse-independent component */
      for(let y=0;y<Math.min(yN,CO_Y1);y+=.5){const sl=(coPL(S.pk,y+.5)-coPL(S.pk,y))/.5;if(sl<=0)continue;s+=`<rect x="${f1(X(y))}" y="${L.i1-14}" width="${f1(X(Math.min(y+.5,yN))-X(y)+.3)}" height="12" style="fill:var(--orange);opacity:${f1(clamp(sl/.45)*.75)}"/>`}
      s+=`<text x="${L.x0+6}" y="${L.i1-4}" class="t-mri">smouldering? (hypothesis)</text>`;
      D.les.forEach(l=>{if(l.y>yN)return;const age=yN-l.y,x=X(l.y),y=lerp(mT,mB,l.d),r0=N?2:2.4,r=r0*(1+1.3*Math.max(0,1-age/.35)),gd=age<3.07/52;
        if(gd)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r+3)}" style="fill:none;stroke:var(--gd);stroke-width:1.5"/>`;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${gd?'var(--gd)':'var(--mri-lesion)'};opacity:.92"/>`})}
    else s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${f1((L.w+L.i1)/2+4)}" class="t-mri t-mid">MRI hidden: press "Show the iceberg"</text>`;
    /* ---- panel 3: brain volume ---- */
    const Vb=v=>lerp(L.b0,L.b1,-v/16);
    s+=`<text x="${L.x0}" y="${L.bT}" class="t-sm" style="fill:var(--brand)">${N?'BRAIN VOLUME · cohort means':'BRAIN VOLUME CHANGE · published cohort means, all scenarios'}</text>`;
    [0,-8,-16].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Vb(v))}" y2="${f1(Vb(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(Vb(v)+3)}" class="t-xs t-end">${v?'−'+(-v):0}%</text>`);
    if(yN>0){const seg=(rate,c,w)=>{const a=Math.min(yN,7.5);let o=`<line x1="${f1(X(0))}" y1="${f1(Vb(0))}" x2="${f1(X(a))}" y2="${f1(Vb(-rate*a))}" style="stroke:${c};stroke-width:${w};stroke-linecap:round"/>`;
        if(yN>7.5)o+=`<line x1="${f1(X(7.5))}" y1="${f1(Vb(-rate*7.5))}" x2="${f1(xN)}" y2="${f1(Vb(-rate*yN))}" style="stroke:${c};stroke-width:${w};opacity:.45;stroke-dasharray:5 4"/>`;return o};
      s+=seg(.27,'var(--muted)',1.8)+seg(.51,'var(--brand)',2.4);
      if(yN>=7.5)s+=`<circle cx="${f1(X(7.5))}" cy="${f1(Vb(-.51*7.5))}" r="4" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><circle cx="${f1(X(7.5))}" cy="${f1(Vb(-.27*7.5))}" r="4" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
    s+=`<text x="${f1(X(0)+4)}" y="${L.b1-4}" class="t-xs"><tspan style="fill:var(--brand)">— MS −0.51%/yr</tspan>  <tspan>— healthy −0.27%/yr</tspan>${N?'':'  · solid to 7.5 y (measured), dashed beyond'}</text>`;
    /* ---- panel 4: course strip ---- */
    s+=`<text x="${L.x0}" y="${L.sT}" class="t-sm">${N?'COURSE (LUBLIN 2013)':'COURSE DESCRIPTOR (LUBLIN 2013) · one square = one year'}</text><text x="${L.x1}" y="${L.sT}" class="t-xs t-end">■ yes  □ no</text>`;
    S.ph.forEach((p,i)=>{const y1=i<S.ph.length-1?S.ph[i+1].y:CO_Y1;if(p.y>yN)return;const xa=X(p.y),xb=X(Math.min(y1,yN));
      s+=`<rect x="${f1(xa)}" y="${L.s0}" width="${f1(Math.max(0,xb-xa))}" height="${L.s1-L.s0}" style="fill:${p.c};stroke:var(--line);stroke-width:.8"/>`;
      if(xb-xa>p.n.length*6.4+6)s+=`<text x="${f1((xa+xb)/2)}" y="${L.s1-4}" class="t-xs t-mid" style="fill:var(--ink)">${p.n}</text>`});
    s+=`<text x="${L.x0-6}" y="${L.a0+8}" class="t-xs t-end">active</text><text x="${L.x0-6}" y="${L.p0+8}" class="t-xs t-end">${N?'prog.':'progressing'}</text>`;
    const q=N?7:9;
    for(let k=0;k<30;k++){if(yN<k+1)break;const cx=X(k+.5);
      const act=S.rel.some(r=>r.y>=k&&r.y<k+1)||D.les.some(l=>l.y>=k&&l.y<k+1);
      s+=`<rect x="${f1(cx-q/2)}" y="${L.a0}" width="${q}" height="${q}" rx="1.5" style="fill:${act?'var(--orange)':'none'};stroke:var(--orange);stroke-width:1.2"/>`;
      if(S.prog!=null&&k>=S.prog){const pr=coEv(S,k+1).base-coEv(S,k).base>=.1;s+=`<rect x="${f1(cx-q/2)}" y="${L.p0}" width="${q}" height="${q}" rx="1.5" style="fill:${pr?'var(--attack)':'none'};stroke:var(--attack);stroke-width:1.2"/>`}}
    /* playhead and footer */
    s+=`<line x1="${f1(xN)}" x2="${f1(xN)}" y1="${top}" y2="${bot}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    s+=`<text x="${L.x1}" y="${L.ax}" class="t-xs t-end">years since first symptoms</text><text x="${L.x0}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative person</text>`;
    svg.innerHTML=s;
    setSt(ph);
    const nRel=S.rel.filter(r=>r.y<=yN).length,nLes=D.les.filter(l=>l.y<=yN).length;
    $('#coRead').innerHTML=`<span>year <b>${yN<0?f1(yN)+' (before symptoms)':f1(yN)}</b></span><span>EDSS <b>${coEd(ev.e)}</b></span><span>attacks so far <b>${nRel}</b></span><span>new MRI lesions <b>${nLes}</b> (schematic${ice?'':', hidden'})</span><span>course <b>${label(S,D,yN)}</b></span><span>RAW <b>+${f1(ev.raw)}</b> · PIRA <b>+${f1(ev.pira)}</b></span>`;
    $('#coNote').innerHTML=noteHTML(CO_STEPS[sc][ph]);
  }
  const stop=playWire(rg,$('#coPlay'),draw,26000,'Replay','course');
  function wire(){const old=$('#coSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,CO_STEPS[sc],rg,draw,stop)}
  const CAP={rs:'',pp:'In the Lyon cohort the median time to DSS 4 for progressive onset was 0.0 years; the drawn rise to DSS 4 is not a measured shape. [[Confavreux2000]]',
    tx:'No published curve exists for this scenario: the whole line is drawn to show the idea, not data.',mild:'The circled points at year 20 are the shares reported for people "benign" at 10 years. [[Sayao2007]]'};
  $$('[data-co]').forEach(b=>b.addEventListener('click',()=>{stop();sc=b.dataset.co;$$('[data-co]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#coCapExtra').innerHTML=CAP[sc];wire();draw(+rg.value)}));
  $('#coIce').addEventListener('click',()=>{ice=!ice;$('#coIce').setAttribute('aria-pressed',ice);draw(+rg.value)});
  wire();draw(+rg.value);

  /* ---- before and after the first attack ---- */
  const rs2=$('#coRis'),rr=$('#coRisT');
  const weib=(p1,t1,p2,t2)=>{const a=-Math.log(1-p1),b=-Math.log(1-p2),k=Math.log(b/a)/Math.log(t2/t1),lam=t1/Math.pow(a,1/k);return y=>1-Math.exp(-Math.pow(Math.max(0,y)/lam,k))};
  const expo=(p,ty)=>{const k=-Math.log(1-p)/ty;return y=>1-Math.exp(-k*y)};
  const risF=weib(.34,5,.512,10),onL=expo(.72,15),onA=expo(.5,15),onN=expo(.25,15);
  function drawR(t){const NR=vb(rs2,'720 270','400 480');const Y=t*15;let s='';
    const C=NR?[{x0:46,x1:388,y0:36,y1:186},{x0:46,x1:388,y0:276,y1:426}]:[{x0:56,x1:330,y0:36,y1:206},{x0:416,x1:690,y0:36,y1:206}];
    C.forEach((c,ci)=>{const X=y=>lerp(c.x0,c.x1,y/15),V=v=>lerp(c.y1,c.y0,v);
      s+=`<text x="${c.x0}" y="${c.y0-14}" class="t-sm" style="fill:${ci?'var(--brand)':'var(--orange)'}">${ci?(NR?'AFTER OPTIC NEURITIS → MS (ONTT)':'AFTER OPTIC NEURITIS: RISK OF MS (ONTT)'):(NR?'RIS → FIRST CLINICAL EVENT':'RIS: FIRST CLINICAL EVENT')}</text>`;
      [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${c.x0}" x2="${c.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${c.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
      [0,5,10,15].forEach(y=>s+=`<text x="${f1(X(y))}" y="${c.y1+14}" class="t-xs t-mid">${y}</text>`);
      s+=`<text x="${c.x1}" y="${c.y1+28}" class="t-xs t-end">years</text>`;
      const line=(f,ymax,col,w)=>{const e=Math.min(Y,ymax);if(e<=0)return '';return `<path d="${pathFn(u=>f(u*e),c.x0,X(e),c.y1,c.y0,60)}" style="fill:none;stroke:${col};stroke-width:${w}"/>`};
      if(!ci){s+=line(risF,10,'var(--orange)',2.6);
        [ [5,.34,'34% at 5 y'],[10,.512,'51.2% at 10 y'] ].forEach(([y,v,l])=>{if(Y>=y)s+=`<circle cx="${f1(X(y))}" cy="${f1(V(v))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(X(y)-9)}" y="${f1(V(v)-8)}" class="t-xs t-end" style="fill:var(--ink)">${l}</text>`});
        if(Y>10)s+=`<text x="${f1(X(10)+8)}" y="${f1(V(.512)+4)}" class="t-xs">follow-up ends</text>`}
      else{s+=line(onL,15,'var(--attack)',2.6)+line(onA,15,'var(--brand)',2)+line(onN,15,'var(--good)',2.6);
        if(Y>=15)[ [.72,'≥1 brain lesion: 72%','var(--attack)'],[.5,'overall: 50%','var(--brand)'],[.25,'normal MRI: 25%','var(--good)'] ].forEach(([v,l,col])=>{s+=`<circle cx="${f1(X(15))}" cy="${f1(V(v))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(X(15)-10)}" y="${f1(V(v)-8)}" class="t-xs t-end" style="fill:${col}">${l}</text>`})}
      s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${c.y0}" y2="${c.y1}" style="stroke:var(--ink);opacity:.3"/>`});
    rs2.innerHTML=s;
    $('#coRisCap').innerHTML=`Year ${Y.toFixed(1)}: RIS ${Y<=10?Math.round(risF(Y)*100)+'%':'(follow-up ended at 10 years)'} · after optic neuritis ${Math.round(onL(Y)*100)}% with a brain lesion, ${Math.round(onN(Y)*100)}% with a normal MRI. Smooth curves drawn through the circled published points; the 5- and 10-year RIS points come from two different reports, and the two charts from different cohorts. [[Okuda2014,LebrunFrenay2020,ONSG2008]]`;
    $('#coRisNote').innerHTML=noteHTML({k:'Risk before and after a first attack',t:Y<5?'Not everyone goes on':'Baseline MRI matters',
      txt:`In 451 people with RIS, 34% had a first clinical event within 5 years; in a 10-year follow-up study the cumulative probability was 51.2%. Spinal cord lesions (HR 3.08), male sex (HR 1.93) and age under 37 predicted conversion. After optic neuritis in the Optic Neuritis Treatment Trial (389 people followed for 15 years), MS developed in 50% overall: 25% with no brain lesions on the first MRI, 72% with at least one. In a 20-year CIS cohort the split was 82% vs 21% by baseline MRI. [[Okuda2014,LebrunFrenay2020,ONSG2008,Fisniku2008]]`,
      pt:`Many people with a first episode, or with spots found by chance, never get MS. A normal scan at the start lowers the odds a lot.`,
      hook:`ONTT 15 years: MS risk 25% with a normal baseline MRI vs 72% with ≥1 lesion.`});
  }
  playWire(rr,$('#coRisPlay'),drawR,8000,'Replay','course');drawR(+rr.value);
};
