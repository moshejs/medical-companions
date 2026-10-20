/* =============== 3.2 the differential =============== */
const DD_STEPS=[
 {from:0,at:.1,k:'Pattern 1',t:'Typical MS',
  txt:`Periventricular MS lesions follow the deep medullary veins, so their long axis runs perpendicular to the lateral ventricles and they look ovoid ("Dawson's fingers"). Cord lesions are short: under two vertebral segments, under half the cross-section, mostly peripheral in the lateral and dorsal columns, cigar-like on sagittal and wedge-shaped on axial images. Multiple short cord lesions are highly specific for MS [[Filippi2019]].`,
  pt:`In MS the spots in the brain are small ovals that point away from the fluid spaces in the middle, like fingers. In the spinal cord they are short and sit near the edge.`,
  hook:`MS cord lesion: under 2 segments, under half the cross-section, peripheral. Cord lesions are not seen with normal ageing, migraine or most cerebrovascular disease [[Filippi2019]].`},
 {from:.27,at:.42,k:'Pattern 2',t:'NMOSD (AQP4-IgG)',
  txt:`Longitudinally extensive transverse myelitis (LETM) is a T2 cord lesion over ≥3 contiguous vertebral segments, often central and with cord swelling: the most specific imaging feature of NMOSD and very uncommon in adult MS [[Wingerchuk2015,Cacciaguerra2022]]. Area postrema syndrome (intractable hiccups or nausea and vomiting) occurs in 16%–43%. Severe or bilateral optic neuritis, CSF cells above 50/μL and absent OCB also favour NMOSD [[Wingerchuk2015]].`,
  pt:`In NMOSD a single swelling can run down the spinal cord over three or more vertebrae. A blood test for the AQP4 antibody usually settles it.`,
  hook:`2015 criteria: AQP4-IgG positive + ≥1 of 6 core characteristics. Without AQP4-IgG: ≥2 core characteristics, one of them optic neuritis, LETM myelitis or area postrema syndrome, plus MRI requirements [[Wingerchuk2015]].`},
 {from:.57,at:.7,k:'Pattern 3',t:'MOGAD (MOG-IgG)',
  txt:`Compared with MS, MOGAD lesions are poorly defined and involve long segments of cord and optic nerve. Optic nerve involvement is often bilateral, with disc swelling and enhancement of the nerve sheath [[Solomon2026]]. The 2023 criteria make MOG-IgG by cell-based assay a core criterion; typical phenotypes are ADEM, optic neuritis and transverse myelitis [[Banwell2023]]. OCB are found in about 10% [[Deisenhammer2025]].`,
  pt:`In MOGAD the spots are fuzzy and larger, and both optic nerves can be inflamed at once, with swelling at the back of the eye.`,
  hook:`MOGAD is more than half of demyelinating presentations in children under 12, and MOG-IgG testing is strongly recommended there. Low-titre MOG-IgG occurs in 1%–2% of people with MS, so not everyone needs screening [[Solomon2026,IACCTMS2025Slides,Banwell2023]].`},
 {from:.8,at:.95,k:'Months later',t:'MOGAD lesions often resolve',
  txt:`MOGAD lesions often resolve and rarely show subclinical activity [[Solomon2026]]. In MS, by contrast, new lesions on a later scan are one of the ways dissemination in time is shown [[Thompson2018]].`,
  pt:`On a scan months later, MOGAD spots have often faded. In MS new spots tend to keep appearing, which is one of the things the diagnostic criteria look for.`,
  hook:`Repeat imaging helps: fading lesions point toward MOGAD; new silent lesions favour MS [[Solomon2026,Thompson2018]].`}
];
const DD_LINES=[
 ['Typical MS',['Ovoid, perpendicular to the ventricles','Short cord lesions: under 2 segments','Cord axial: peripheral, under half','Optic nerve: short lesion']],
 ['NMOSD',['Cord: ≥3 contiguous segments (LETM)','Central cord lesion, often swollen','Area postrema: hiccups, vomiting','Optic neuritis: severe or bilateral']],
 ['MOGAD',['Poorly defined, fluffy lesions','Long cord and optic nerve segments','Bilateral optic neuritis, disc swelling','Nerve-sheath enhancement']],
 ['MOGAD, months later',['Lesions often resolve','Subclinical activity is rare','In MS, new lesions over time count as DIT','Repeat imaging is informative']]
];
const DD_CATS=[['all','All'],['ab','Antibody-mediated'],['vasc','Vascular & headache'],['sys','Systemic inflammatory'],['met','Nutritional'],['inf','Infections'],['gen','Genetic'],['fn','Functional & non-specific']];
const DD_COLS=[['brain','Brain MRI'],['cord','Spinal cord'],['eye','Optic nerve & eye'],['csf','CSF'],['test','Key test or criteria'],['clue','Clinical clues']];
const DD_ROWS=[
 {id:'ms',n:'MS (typical)',sub:'the reference row',cat:'ref',go:.1,
  brain:`Ovoid periventricular lesions perpendicular to the ventricles; juxtacortical and infratentorial lesions; central vein sign in about 80% of lesions [[Filippi2019]]`,
  cord:`Short lesions: under 2 segments, under half the cross-section, mostly peripheral; cervical more than thoracic [[Filippi2019]]`,
  eye:`Optic neuritis; OCT inter-eye asymmetry or delayed VEP can show optic nerve involvement [[Saidha2025]]`,
  csf:`CSF-restricted OCB in 87.7% [[Dobson2013]]; κ-FLC index ≥6.1 [[Deisenhammer2025]]`,
  test:`McDonald 2017 or 2024, once better explanations are excluded [[Thompson2018,Montalban2025]]`,
  clue:`Attacks lasting ≥24 h with objective findings, without fever or infection [[Solomon2026]]`},
 {id:'nmo',n:'NMOSD',sub:'neuromyelitis optica spectrum disorder',cat:'ab',go:.42,
  brain:`Core syndromes include area postrema, other brainstem, diencephalic and cerebral syndromes [[Wingerchuk2015]]`,
  cord:`LETM: ≥3 contiguous vertebral segments, often central with swelling; very uncommon in adult MS [[Wingerchuk2015,Cacciaguerra2022]]`,
  eye:`Severe or bilateral optic neuritis favours NMOSD [[Wingerchuk2015]]`,
  csf:`Cells >50/μL in about 35%; OCB often absent (present in ≤25%) [[Wingerchuk2015,Deisenhammer2025]]`,
  test:`AQP4-IgG by live or fixed cell-based assay: pooled sensitivity 76.7%, 0.1% false positives in an MS clinic cohort; 2015 international criteria [[Wingerchuk2015]]`,
  clue:`Intractable hiccups or vomiting (16%–43%). A gradually progressive course is very uncommon (1%–2%). Some MS drugs may worsen it [[Wingerchuk2015]]`},
 {id:'mog',n:'MOGAD',sub:'MOG antibody-associated disease',cat:'ab',go:.7,
  brain:`Poorly defined lesions that often resolve; ADEM is a typical phenotype [[Solomon2026,Banwell2023]]`,
  cord:`Transverse myelitis involving long cord segments [[Solomon2026,Banwell2023]]`,
  eye:`Often bilateral optic neuritis, disc swelling, nerve-sheath enhancement [[Solomon2026]]`,
  csf:`OCB in about 10% [[Deisenhammer2025]]`,
  test:`2023 criteria: MOG-IgG by cell-based assay is a core criterion; not everyone with MS needs screening [[Banwell2023]]`,
  clue:`More than half of demyelinating presentations under age 12; low-titre MOG-IgG in 1%–2% of MS [[Solomon2026]]`},
 {id:'svd',n:'Small-vessel disease',sub:'cerebral small-vessel disease',cat:'vasc',
  brain:`Deep white-matter lesions separated from the cortex by a rim of white matter, not abutting or perpendicular to the ventricles; lacunes, microbleeds, symmetric central pontine lesions [[Filippi2019]]`,
  cord:`Cord lesions are not seen with normal ageing or most cerebrovascular disease [[Filippi2019]]`,
  test:`At ≥50 years or with vascular risk, 2024 strongly recommends extra confirmation: a cord lesion, positive CSF or CVS positivity [[IACCTMS2025Slides,Solomon2026]]`,
  clue:`Hypertension, smoking, diabetes, hyperlipidaemia, known vascular disease [[Solomon2026]]`},
 {id:'mig',n:'Migraine',sub:'and other headache disorders',cat:'vasc',
  brain:`Deep white-matter spots that spare the cortex and ventricles, as in small-vessel disease [[Filippi2019]]`,
  cord:`Cord lesions are not seen with migraine [[Filippi2019]]`,
  test:`Headache disorders are in the group where 2024 strongly recommends extra confirmation [[IACCTMS2025Slides]]`,
  clue:`The commonest true diagnosis in people misdiagnosed with MS: 22% in one series, 16% in another [[Solomon2016,Kaisey2019]]`},
 {id:'cad',n:'CADASIL',sub:'inherited small-vessel disease',cat:'gen',
  brain:`Lesions in the anterior temporal pole, external capsule and inferior frontal lobe, with lacunes and microbleeds [[Filippi2019,Miller2008]]`},
 {id:'sus',n:'Susac syndrome',sub:'',cat:'vasc',
  brain:`Round "snowball" lesions in the centre of the corpus callosum [[Filippi2019]]`,
  eye:`Branch retinal artery occlusion (retinopathy) [[Miller2008]]`,
  clue:`Hearing loss with the retinal and callosal findings [[Filippi2019,Miller2008]]`},
 {id:'b12',n:'B12 or copper deficiency',sub:'',cat:'met',
  cord:`Long, selective dorsal-column involvement that rarely enhances [[Filippi2019,Cacciaguerra2022]]`,
  clue:`Peripheral neuropathy or haematological abnormalities [[Miller2008]]`},
 {id:'sar',n:'Neurosarcoidosis',sub:'',cat:'sys',
  brain:`Meningeal enhancement [[Miller2008]]`,
  cord:`Dorsal subpial enhancement over ≥2 segments with an axial "trident sign"; enhancement persists at 2 months in >90%, vs 12% of AQP4-positive NMOSD [[Cacciaguerra2022]]`,
  clue:`Lung involvement, diabetes insipidus or hypothalamic disturbance, multiple cranial neuropathies [[Miller2008]]`},
 {id:'sle',n:'Lupus (SLE)',sub:'systemic lupus erythematosus',cat:'sys',
  brain:`Lesions crossing grey–white boundaries [[Miller2008]]`,
  clue:`Rash, renal involvement, livedo reticularis, arthritis [[Miller2008]]`},
 {id:'sjo',n:'Sjögren syndrome',sub:'',cat:'sys',
  clue:`Sicca symptoms (dry eyes and mouth) and myopathy [[Miller2008]]`},
 {id:'beh',n:'Behçet disease',sub:'',cat:'sys',
  brain:`Large diencephalic or brainstem lesions [[Miller2008,Filippi2019]]`,
  clue:`Mucosal ulcers, cerebral venous sinus thrombosis [[Miller2008]]`},
 {id:'inf',n:'Infections',sub:'Lyme, HTLV-1, PML',cat:'inf',
  brain:`PML: large lesions without mass effect [[Miller2008]]`,
  cord:`HTLV-1 myelopathy: gradually progressive [[Miller2008]]`,
  test:`No source read here gives consensus wording on routine syphilis or HIV testing; one German centre included syphilis and Borrelia serology in its standard workup [[Konen2026]]`,
  clue:`Lyme disease: multiple cranial neuropathies or polyradiculopathy, rash, arthritis [[Miller2008]]`},
 {id:'leu',n:'Adult leukodystrophies',sub:'e.g. AMN, MLD',cat:'gen',
  brain:`Confluent, symmetric white-matter abnormalities [[Filippi2019,Miller2008]]`,
  clue:`Adrenomyeloneuropathy and metachromatic leukodystrophy can be progressive from onset [[Filippi2019,Miller2008]]`},
 {id:'fnd',n:'Functional or non-specific',sub:'FND, fibromyalgia, non-specific symptoms',cat:'fn',
  brain:`Non-specific or vascular-type white-matter spots in some [[Brownlee2026]]`,
  test:`The usual errors: atypical symptoms treated as attacks, attacks accepted without objective evidence, over-reliance on MRI [[Solomon2016]]`,
  clue:`Among people misdiagnosed with MS: fibromyalgia 15%, non-specific symptoms with abnormal MRI 12%, conversion or psychogenic disorders 11% [[Solomon2016]]`}
];
const DD_FLAGS=[
 {l:'Cord lesion over ≥3 vertebral segments',ids:['nmo','mog','b12'],say:`LETM is the most specific imaging feature of NMOSD and very uncommon in adult MS; MOGAD also involves long cord segments. B12 deficiency gives long dorsal-column lesions that rarely enhance. The published criteria use AQP4-IgG and MOG-IgG by cell-based assay. [[Wingerchuk2015,Cacciaguerra2022,Solomon2026,Filippi2019]]`},
 {l:'Intractable hiccups, nausea or vomiting',ids:['nmo'],say:`Area postrema syndrome is one of the six NMOSD core characteristics, seen in 16%–43%. [[Wingerchuk2015]]`},
 {l:'Severe or bilateral optic neuritis',ids:['nmo','mog'],say:`Severe or bilateral optic neuritis favours NMOSD; in MOGAD, optic nerve involvement is often bilateral, with disc swelling and nerve-sheath enhancement. [[Wingerchuk2015,Solomon2026]]`},
 {l:'CSF cells >50/μL, protein >100 mg/dL',ids:['nmo'],say:`CSF red flags against MS: white cells above 50/μL, protein above 100 mg/dL, or glucose below 60% of serum [[Solomon2026]]. Pleocytosis above 50 cells/μL occurs in about 35% of NMOSD [[Wingerchuk2015]].`},
 {l:'No oligoclonal bands',ids:['nmo','mog'],say:`Absent OCB favours NMOSD (OCB in ≤25%) and fits MOGAD (about 10%) [[Wingerchuk2015,Deisenhammer2025]]. It does not exclude MS: OCB are positive in 87.7% of people with MS, not all [[Dobson2013]].`},
 {l:'Child under 12, or encephalopathy (ADEM)',ids:['mog'],say:`MOGAD accounts for more than half of demyelinating presentations under 12, and ADEM is a typical phenotype [[Solomon2026,Banwell2023]]. After ADEM in a child, the MS criteria apply only after a second typical attack or new T2 lesions more than 90 days after onset [[IACCTMS2025Slides]].`},
 {l:'Spots spare cortex and ventricles; lacunes, microbleeds',ids:['svd','mig','cad'],say:`Small-vessel and migraine lesions sit in deep white matter, separated from the cortex, not touching or perpendicular to the ventricles. Lacunes, microbleeds and symmetric central pontine lesions point to small-vessel disease; temporal-pole and external-capsule lesions to CADASIL. [[Filippi2019,Miller2008]]`},
 {l:'Age ≥50, vascular risk or a headache disorder',ids:['svd','mig'],say:`2024 strongly recommends extra confirmation in this group: a spinal cord lesion, positive CSF or CVS positivity, features not expected in healthy ageing, headache disorders or vascular disease. [[IACCTMS2025Slides,Solomon2026]]`},
 {l:'Snowball callosal lesions with hearing loss',ids:['sus'],say:`Susac syndrome: rounded lesions in the centre of the corpus callosum, branch retinal artery occlusion and hearing loss. [[Filippi2019,Miller2008]]`},
 {l:'Long dorsal-column lesion with neuropathy',ids:['b12'],say:`Vitamin B12 or copper deficiency: long, selective dorsal-column involvement that rarely enhances, with peripheral neuropathy or blood-count abnormalities. [[Filippi2019,Cacciaguerra2022,Miller2008]]`},
 {l:'Lung disease, diabetes insipidus, meningeal enhancement',ids:['sar'],say:`Neurosarcoidosis red flags, along with multiple cranial neuropathies. [[Miller2008]]`},
 {l:'Cord enhancement still present after 2 months',ids:['sar'],say:`In neurosarcoidosis, cord enhancement persists at 2 months in more than 90% (12% of AQP4-positive NMOSD) [[Cacciaguerra2022]]. A new MS lesion usually enhances for 2–8 weeks (usually under 4); enhancement beyond 3 months suggests malignancy [[Filippi2019]].`},
 {l:'Rash, kidney disease, arthritis, dry eyes, mouth ulcers',ids:['sle','sjo','beh'],say:`Systemic clues: rash, renal involvement, livedo reticularis and arthritis (lupus); sicca and myopathy (Sjögren); mucosal ulcers and venous sinus thrombosis (Behçet). [[Miller2008]]`},
 {l:'Cranial neuropathies or radiculopathy with rash',ids:['inf'],say:`Lyme disease is a listed red-flag alternative (multiple cranial neuropathies or polyradiculopathy, rash, arthritis), as are HTLV-1 myelopathy and PML. [[Miller2008]]`},
 {l:'Symmetric, confluent white matter; progressive from onset',ids:['leu'],say:`Adult leukodystrophies give confluent, symmetric white-matter change; adrenomyeloneuropathy and metachromatic leukodystrophy can progress from onset. [[Filippi2019,Miller2008]]`},
 {l:'Hyperacute onset, severe or symmetric deficits',ids:[],say:`Clinical red flags against MS in general: onset over minutes to hours, severe deficits (complete blindness, paraplegia), symmetric CNS involvement and encephalopathy [[Solomon2026]]. They point away from MS rather than to one condition in this table.`},
 {l:'Non-specific symptoms, normal exam, a few white spots',ids:['fnd','mig'],say:`The commonest route to misdiagnosis: treating atypical symptoms as attacks, accepting attacks without objective evidence, and over-relying on MRI in people with non-specific symptoms. [[Solomon2016]]`}
];
inits.ddx=()=>{
  const svg=$('#ddSvg'),rg=$('#ddT');
  const segY=s=>70+s*28;
  const W=t=>{const a=ramp(t,.25,.35),b=ramp(t,.55,.65);return[1-a,a-b,b,ramp(t,.82,.94)]};
  const mix=(w,a,b,c)=>a*w[0]+b*w[1]+c*w[2];
  const bez=(P0,C,P2,u)=>[(1-u)*(1-u)*P0[0]+2*(1-u)*u*C[0]+u*u*P2[0],(1-u)*(1-u)*P0[1]+2*(1-u)*u*C[1]+u*u*P2[1]];
  const NV=[ [ [44,53],[52,92],[75,104] ],[ [106,53],[98,92],[75,104] ] ];
  const sub=(nv,u0,u1)=>{let d='';for(let i=0;i<=16;i++){const [x,y]=bez(...nv,lerp(u0,u1,i/16));d+=(i?'L':'M')+f1(x)+' '+f1(y)}return d};
  const tf=P=>`translate(${P.x} ${P.y}) scale(${P.k})`;
  const LAY={
   w:{vb:'720 400',ax:{x:8,y:8,k:.9},sg:{x:232,y:8,k:1},cx:{x:400,y:8,k:1},or:{x:562,y:8,k:1},gauge:{x:8,y:292,w:216,more:1},blk:{x:400,y:166}},
   n:{vb:'400 902',ax:{x:56,y:8,k:1.2},sg:{x:8,y:510,k:1},cx:{x:194,y:510,k:1.2},or:{x:194,y:674,k:1.2},gauge:{x:176,y:840,w:216},blk:{x:8,y:390}}
  };
  function draw(t){
    const N=vb(svg,LAY.w.vb,LAY.n.vb),Y=N?LAY.n:LAY.w,w=W(t),late=w[3];let s='';
    s+=`<defs><filter id="ddBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5"/></filter><clipPath id="ddClipS"><rect width="160" height="384" rx="10"/></clipPath></defs>`;
    const mog=w[2]*(1-.75*late);
    /* --- brain --- */
    const A=Y.ax;s+=`<g transform="${tf(A)}">${dxAxial()}`;
    if(w[0]>.01){DX_POS.pv.slice(0,6).forEach(([x,y,r],i)=>{s+=lesion(x,y,r*1.05,i+3,w[0])});DX_POS.jc.slice(0,2).forEach(([x,y,r,rot],i)=>{s+=`<g transform="rotate(${rot} ${x} ${y})">${lesion(x,y,r,i+11,w[0])}</g>`})}
    if(w[1]>.01)s+=lesion(120,214,7,5,w[1]);
    if(mog>.01){const k=1-.35*late;[[70,132,16],[172,190,14],[112,246,11]].forEach(([x,y,r],i)=>{s+=`<g filter="url(#ddBlur)">${lesion(x,y,r*k,i+21,mog*.95)}</g>`})}
    s+=`</g>`;
    {const P=(x,y)=>[A.x+x*A.k,A.y+y*A.k],[x0,y0]=P(0,0),[x1,y1]=P(240,300);
      s+=`<text x="${f1(x0+8)}" y="${f1(y0+15)}" class="t-mri">BRAIN · AXIAL</text>`;
      if(w[0]>.5)s+=`<text x="${f1(x1-8)}" y="${f1(y0+15)}" class="t-mri t-end" style="opacity:${f1(w[0])}">Dawson's fingers</text>`;
      else if(w[1]>.5){const [lx,ly]=P(120,234);s+=`<text x="${f1(lx)}" y="${f1(ly+10)}" class="t-mri t-mid" style="opacity:${f1(w[1])}">diencephalic</text>`}
      else if(w[2]>.5)s+=`<text x="${f1(x1-8)}" y="${f1(y0+15)}" class="t-mri t-end">${late>.5?'faded':'poorly defined'}</text>`}
    /* --- sagittal cord --- */
    const G=Y.sg;const l1=[mix(w,1.3,1.2,4.4),mix(w,2.1,5.8,8.0)],l2=[mix(w,4.1,4.1,4.4),mix(w,4.8,4.8,4.6)];
    const frac=mix(w,.45,.85,.75),off=mix(w,4,0,0),swell=w[1]*.35;
    const prof=y=>{const a=segY(l1[0]),b=segY(l1[1]);return y<a-14||y>b+14?0:(y<a?ease((y-a+14)/14):y>b?ease((b+14-y)/14):1)};
    s+=`<g transform="${tf(G)}"><g clip-path="url(#ddClipS)"><rect width="160" height="384" class="mri"/>`;
    s+=`<ellipse cx="136" cy="24" rx="36" ry="30" style="fill:var(--mri-gm)"/><path d="M56 0 L104 0 L104 34 C104 48 96 56 92 62 L68 62 C64 56 56 48 56 34 Z" style="fill:var(--mri-wm)"/><path d="M100 16 L114 30 L100 44 Z" style="fill:var(--mri-csf)"/>`;
    s+=`<rect x="60" y="58" width="40" height="330" style="fill:var(--mri-csf)"/>`;
    for(let i=0;i<11;i++)s+=`<rect x="26" y="${segY(i)+3}" width="28" height="22" rx="4" style="fill:var(--mri-gm);opacity:.65"/>`;
    {let L='',R='';for(let y=56;y<=388;y+=4){const hw=10*(1+swell*prof(y));L+=(L?'L':'M')+f1(80-hw)+' '+y;R=`L${f1(80+hw)} ${y}`+R}s+=`<path d="${L}${R}Z" style="fill:var(--mri-wm)"/>`}
    const cap=(a,b,fr,ox,o,blur)=>{const y0=segY(a),y1=segY(b),hw=10*(1+swell)*fr;return `<g ${blur?'filter="url(#ddBlur)"':''}><rect x="${f1(80+ox-hw)}" y="${f1(y0)}" width="${f1(hw*2)}" height="${f1(Math.max(2,y1-y0))}" rx="${f1(hw)}" style="fill:var(--mri-lesion);opacity:${f1(o)}"/></g>`};
    const lo=1-.75*w[2]*late,blur=w[2]>.5;
    s+=cap(l1[0],l1[1],frac*(1-.3*w[2]*late),off,lo*.95,blur);
    s+=cap(l2[0],l2[1],frac,off,(w[0]+w[1])*.95,false);
    if(w[1]>.01)s+=lesion(96,50,5,9,w[1]);
    s+=`</g><rect width="160" height="384" rx="10" style="fill:none;stroke:var(--line)"/></g>`;
    {const Q=(x,y)=>[G.x+x*G.k,G.y+y*G.k],[x0,y0]=Q(0,0);
      s+=`<text x="${f1(x0+8)}" y="${f1(y0+80)}" class="t-mri">CORD</text>`;
      ['C1','C2','C3','C4','C5','C6','C7','T1','T2','T3','T4'].forEach((l,i)=>{const [lx,ly]=Q(6,segY(i)+18);if(i)s+=`<text x="${f1(lx)}" y="${f1(ly)}" class="t-mri">${l}</text>`});
      if(w[1]>.5){const [ax,ay]=Q(112,54);s+=`<text x="${f1(ax)}" y="${f1(ay)}" class="t-mri" style="opacity:${f1(w[1])}">area</text><text x="${f1(ax)}" y="${f1(ay+12)}" class="t-mri" style="opacity:${f1(w[1])}">postrema</text>`}
      /* bracket showing the length of the longest lesion */
      const a=segY(l1[0]),b=segY(l1[1]),[bx,by0]=Q(106,a),[,by1]=Q(106,b);
      s+=`<path d="M${f1(bx)} ${f1(by0)} h5 V${f1(by1)} h-5" style="fill:none;stroke:var(--gd);stroke-width:1.4;opacity:${f1(lo)}"/>`;
      const len=l1[1]-l1[0],[tx,ty]=Q(114,(a+b)/2+4);s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-mri" style="opacity:${f1(lo)}">${f1(len)} seg</text>`}
    /* --- cord cross-section --- */
    const X=Y.cx,sw=1+swell*.6;s+=`<g transform="${tf(X)}"><rect width="150" height="130" rx="10" class="mri"/>`;
    s+=`<ellipse cx="75" cy="72" rx="${f1(44*sw)}" ry="${f1(36*sw)}" style="fill:var(--mri-csf)"/><ellipse cx="75" cy="72" rx="${f1(36*sw)}" ry="${f1(27*sw)}" style="fill:var(--mri-wm)"/>`;
    s+=`<path d="M${f1(75-22*sw)} ${f1(72-17*sw)} Q75 ${f1(72-2*sw)} ${f1(75+22*sw)} ${f1(72-17*sw)} M${f1(75-22*sw)} ${f1(72+17*sw)} Q75 ${f1(72+2*sw)} ${f1(75+22*sw)} ${f1(72+17*sw)} M75 ${f1(72-6*sw)} V${f1(72+6*sw)}" style="fill:none;stroke:var(--mri-gm);stroke-width:${f1(6*sw)};stroke-linecap:round"/>`;
    if(w[0]>.01){const pt=a=>[75+36*Math.cos(a),72+27*Math.sin(a)];const [ax,ay]=pt(.55),[bx,by]=pt(1.25);s+=`<path d="M${f1(ax)} ${f1(ay)} Q${f1(75+40*Math.cos(.9))} ${f1(72+31*Math.sin(.9))} ${f1(bx)} ${f1(by)} L${f1(75+12)} ${f1(72+10)} Z" style="fill:var(--mri-lesion);opacity:${f1(w[0]*.95)}"/>`}
    if(w[1]>.01)s+=`<ellipse cx="75" cy="72" rx="${f1(25*sw)}" ry="${f1(19*sw)}" style="fill:var(--mri-lesion);opacity:${f1(w[1]*.9)}"/>`;
    s+=`</g>`;
    {const P=(x,y)=>[X.x+x*X.k,X.y+y*X.k],[x0,y0]=P(0,0),[x1,y1]=P(150,130);
      s+=`<text x="${f1(x0+7)}" y="${f1(y0+14)}" class="t-mri">CORD · AXIAL</text><text x="${f1((x0+x1)/2)}" y="${f1(y1-6)}" class="t-mri t-mid">${w[2]>.5?'':'back'}</text>`;
      if(w[0]>.5)s+=`<text x="${f1(x1-7)}" y="${f1(y0+14)}" class="t-mri t-end">wedge</text>`;
      if(w[1]>.5)s+=`<text x="${f1(x1-7)}" y="${f1(y0+14)}" class="t-mri t-end">central</text>`;
      if(w[2]>.5){const [mx,my]=P(75,58);s+=`<rect x="${f1(x0+6)}" y="${f1(my-12)}" width="${f1(x1-x0-12)}" height="34" rx="6" style="fill:var(--mri-bg);opacity:.85"/><text x="${f1(mx)}" y="${f1(my)}" class="t-mri t-mid">no axial pattern</text><text x="${f1(mx)}" y="${f1(my+14)}" class="t-mri t-mid">in our sources</text>`}}
    /* --- optic nerves --- */
    const O=Y.or;s+=`<g transform="${tf(O)}"><rect width="150" height="130" rx="10" class="mri"/>`;
    [40,110].forEach(x=>{s+=`<circle cx="${x}" cy="36" r="17" style="fill:var(--mri-csf);stroke:var(--mri-gm);stroke-width:2"/><ellipse cx="${x}" cy="21" rx="7" ry="3" style="fill:var(--mri-gm)"/>`});
    NV.forEach(nv=>{s+=`<path d="${sub(nv,0,1)}" style="fill:none;stroke:var(--mri-wm);stroke-width:7;stroke-linecap:round"/>`});
    s+=`<path d="M75 104 L62 124 M75 104 L88 124" style="stroke:var(--mri-wm);stroke-width:6"/>`;
    const nerveL=(nv,u0,u1,o,gd)=>(gd?`<path d="${sub(nv,u0,u1)}" style="fill:none;stroke:var(--gd);stroke-width:10;stroke-linecap:round;opacity:${f1(o*.8)}"/><path d="${sub(nv,u0,u1)}" style="fill:none;stroke:var(--mri-bg);stroke-width:7;stroke-linecap:round;opacity:${f1(o)}"/>`:'')+`<path d="${sub(nv,u0,u1)}" style="fill:none;stroke:var(--mri-lesion);stroke-width:5;stroke-linecap:round;opacity:${f1(o)}"/>`;
    if(w[0]>.01)s+=nerveL(NV[0],.35,.55,w[0]);
    if(w[1]>.01)s+=nerveL(NV[0],.25,1,w[1])+`<ellipse cx="75" cy="104" rx="7" ry="5" style="fill:var(--mri-lesion);opacity:${f1(w[1])}"/>`;
    if(mog>.01){s+=nerveL(NV[0],.02,.7,mog,1)+nerveL(NV[1],.02,.7,mog,1);[42,108].forEach(x=>{s+=`<ellipse cx="${x}" cy="52" rx="6" ry="4" style="fill:var(--mri-lesion);opacity:${f1(mog)}"/>`})}
    s+=`</g>`;
    {const P=(x,y)=>[O.x+x*O.k,O.y+y*O.k],[x0,y0]=P(0,0),[x1]=P(150,0);s+=`<text x="${f1(x0+7)}" y="${f1(y0+12)}" class="t-mri">OPTIC NERVES</text>`;
      const tag=w[0]>.5?'short':w[1]>.5?'long, to chiasm':late>.5?'faded':'both, sheath';const [,ty]=P(0,126);s+=`<text x="${f1(x1-7)}" y="${f1(ty)}" class="t-mri t-end">${tag}</text>`}
    /* --- gauge --- */
    const len=Math.max(l1[1]-l1[0],(w[0]+w[1])>.5?l2[1]-l2[0]:0),Gg=Y.gauge,long=len>=3,MX=7,gx=v=>Gg.x+v/MX*Gg.w;
    s+=`<text x="${Gg.x}" y="${Gg.y+12}" class="t-sm">Cord lesion</text><text x="${Gg.x+Gg.w}" y="${Gg.y+12}" class="t-lbl t-end" style="fill:${long?'var(--attack)':'var(--ink)'}">${f1(len)} seg · ${long?'LETM':'short'}</text>`;
    s+=`<rect x="${Gg.x}" y="${Gg.y+22}" width="${Gg.w}" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${Gg.x}" y="${Gg.y+22}" width="${f1(Math.max(3,gx(len)-Gg.x))}" height="14" rx="7" style="fill:${long?'var(--attack)':'var(--brand)'}"/>`;
    s+=`<line x1="${f1(gx(3))}" x2="${f1(gx(3))}" y1="${Gg.y+18}" y2="${Gg.y+40}" style="stroke:var(--ink);stroke-width:2"/><line x1="${f1(gx(2))}" x2="${f1(gx(2))}" y1="${Gg.y+20}" y2="${Gg.y+38}" style="stroke:var(--muted);stroke-width:1.4;stroke-dasharray:2 2"/>`;
    s+=`<text x="${Gg.x}" y="${Gg.y+52}" class="t-xs">0</text><text x="${f1(gx(2))}" y="${Gg.y+52}" class="t-xs t-end">MS &lt;2</text><text x="${f1(gx(3)+3)}" y="${Gg.y+52}" class="t-xs" style="fill:var(--ink)">≥3 = LETM</text><text x="${Gg.x+Gg.w}" y="${Gg.y+52}" class="t-xs t-end">7</text>`;
    if(Gg.more){const ap=w[1]>.5,on=w[0]>.5?'one, short':w[1]>.5?'one, long':late>.5?'both, faded':'both, long';
      s+=`<text x="${Gg.x}" y="${Gg.y+74}" class="t-sm">Optic nerve: <tspan style="fill:var(--ink)">${on}</tspan></text><text x="${Gg.x}" y="${Gg.y+92}" class="t-sm">Area postrema lesion: <tspan style="fill:var(--ink)">${ap?'yes':'no'}</tspan></text>`}
    /* --- pattern block --- */
    const p=phaseOf(DD_STEPS,t),[ttl,lines]=DD_LINES[p],B=Y.blk;
    s+=`<text x="${B.x}" y="${B.y+4}" class="t-xs">PATTERN ${p+1} OF 4</text><text x="${B.x}" y="${B.y+26}" class="t-big">${ttl}</text>`;
    lines.forEach((l,i)=>{s+=`<text x="${B.x}" y="${B.y+48+i*19}" class="t-sm"><tspan style="fill:var(--attack)">▸ </tspan>${l}</text>`});
    svg.innerHTML=s;setSt(p);
    $('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
    $('#ddRead').innerHTML=`<span>pattern <b>${ttl}</b></span><span>longest cord lesion <b>${f1(len)} vertebral segments${long?' (LETM)':''}</b></span><span>area postrema <b>${w[1]>.5?'yes':'no'}</b></span>`;
  }
  const stop=playWire(rg,$('#ddPlay'),draw,16000,'Replay','ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  /* ---- matrix ---- */
  let cat='all',flag=-1;const cols=new Set(DD_COLS.map(c=>c[0]));
  $('#ddCats').innerHTML=`<span class="kicker">Show</span>`+DD_CATS.map(([k,l])=>`<button class="btn" data-ddcat="${k}" aria-pressed="${k===cat}">${l}</button>`).join('');
  $('#ddCols').innerHTML=`<span class="kicker">Columns</span>`+DD_COLS.map(([k,l])=>`<label><input type="checkbox" data-ddcol="${k}" checked>${l}</label>`).join('');
  $('#ddFlags').innerHTML=DD_FLAGS.map((f,i)=>`<button class="btn" data-ddf="${i}" aria-pressed="false">⚑ ${f.l}</button>`).join('');
  function table(){const C=DD_COLS.filter(c=>cols.has(c[0])),hl=flag>=0?DD_FLAGS[flag].ids:null;
    $('#ddHead').innerHTML=`<tr><th>Condition</th>${C.map(c=>`<th>${c[1]}</th>`).join('')}</tr>`;
    $('#ddTbl').innerHTML=DD_ROWS.filter(R=>cat==='all'||R.cat===cat||R.cat==='ref').map(R=>{const cls=[R.cat==='ref'?'ref':'',hl&&hl.includes(R.id)?'hl':'',hl&&hl.length&&!hl.includes(R.id)&&R.cat!=='ref'?'dim':'',R.go!=null?'go':''].filter(Boolean).join(' ');
      return `<tr data-dd="${R.id}" class="${cls}"${R.go!=null?' tabindex="0" aria-label="'+R.n+': show its MRI pattern in the animation"':''}><th>${R.go!=null?'<u>'+R.n+'</u>':R.n}${R.sub?`<small>${R.sub}</small>`:''}</th>${C.map(c=>R[c[0]]?`<td>${R[c[0]]}</td>`:`<td class="na">—</td>`).join('')}</tr>`}).join('')}
  function flagOut(){const o=$('#ddFlagOut');
    if(flag<0){o.innerHTML=`<span class="kicker">No red flag selected</span><span>Choose one above. MS is the shaded reference row in the table.</span>`;return}
    const F=DD_FLAGS[flag];o.innerHTML=`<span class="kicker">⚑ ${F.l} · points toward</span><b class="big">${F.ids.length?F.ids.map(i=>DD_ROWS.find(r=>r.id===i).n).join(' · '):'Away from MS in general'}</b><span>${F.say}</span>`}
  $('#ddCats').addEventListener('click',e=>{const b=e.target.closest('[data-ddcat]');if(!b)return;cat=b.dataset.ddcat;$$('[data-ddcat]').forEach(x=>x.setAttribute('aria-pressed',x===b));table()});
  $('#ddCols').addEventListener('change',e=>{const c=e.target.closest('[data-ddcol]');if(!c)return;c.checked?cols.add(c.dataset.ddcol):cols.delete(c.dataset.ddcol);if(!cols.size){cols.add(c.dataset.ddcol);c.checked=true}table()});
  $('#ddFlags').addEventListener('click',e=>{const b=e.target.closest('[data-ddf]');if(!b)return;const i=+b.dataset.ddf;flag=flag===i?-1:i;
    $$('[data-ddf]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.ddf===flag));
    if(flag>=0&&cat!=='all'&&!DD_FLAGS[flag].ids.every(id=>DD_ROWS.find(r=>r.id===id).cat===cat)){cat='all';$$('[data-ddcat]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.ddcat==='all'))}
    table();flagOut()});
  const jump=r=>{const R=DD_ROWS.find(x=>x.id===r.dataset.dd);if(!R||R.go==null)return;stop();rg.value=R.go;draw(R.go);svg.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'})};
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r)jump(r)});
  $('#ddTbl').addEventListener('keydown',e=>{const r=e.target.closest('tr[data-dd]');if(r&&(e.key==='Enter'||e.key===' ')){e.preventDefault();jump(r)}});
  /* misdiagnosis bars */
  $('#ddMis').innerHTML=[['Migraine',22],['Fibromyalgia',15],['Non-specific symptoms + abnormal MRI',12],['Conversion / psychogenic',11],['NMOSD',6]].map(([l,v])=>`<span>${l}</span><i><b style="width:${v/25*100}%"></b></i><span class="v">${v}%</span>`).join('');
  table();flagOut();draw(+rg.value);
};
