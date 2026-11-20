/* =============== 5.1 history =============== */
const HI_ERAS=[
 {y:'1817',yl:'1817',t:'An Essay on the Shaking Palsy',
  cap:['James Parkinson, "Member of the Royal','College of Surgeons", prints his essay','in London.','Six cases; several were people seen','in the street, one "only seen at a','distance".'],
  txt:'James Parkinson\'s "An Essay on the Shaking Palsy" was printed in London in 1817. It presents six cases: several were people seen casually in the street, Case II a 62-year-old man met in the street, and Case V a gentleman "only seen at a distance". [[Parkinson1817,Goetz2011]] His definition: "Involuntary tremulous motion, with lessened muscular power, in parts not in action and even when supported; with a propensity to bend the trunk forwards, and to pass from a walking to a running pace: the senses and intellects being uninjured." [[Parkinson1817]]',
  pt:'A London doctor described the shaking, the bent posture and the hurried walk so clearly that the disease now carries his name.',
  hook:'Parkinson 1817: rest tremor, flexed trunk and festination (a walk that breaks into a run).'},
 {y:'1817',yl:'1817',t:'Already more than movement',
  cap:['He also noted broken sleep, sluggish','bowels, drooling, trouble chewing and','swallowing, and late loss of speech.','He did not describe rigidity or','slowness as cardinal features, and he','placed the cause in the spinal cord.'],
  txt:'Parkinson also described disturbed sleep, with tremor waking the patient; "torpid" bowels needing strong purgatives; drooling; difficulty chewing and swallowing; and, late on, loss of speech and incontinence: non-motor features now recognised in Parkinson\'s. [[Parkinson1817]] He did not describe rigidity or bradykinesia as cardinal features, and he placed the cause in the upper cervical spinal cord, extending to the medulla oblongata. [[Parkinson1817,Goetz2011]] His claim that the intellect is spared is contradicted by later cohorts: 83% of 20-year survivors in the Sydney study had dementia. [[Hely2008]]',
  pt:'The first description already included sleep, bowel and swallowing problems that today are called non-motor symptoms.',
  hook:'Parkinson missed rigidity and bradykinesia; Charcot added them.'},
 {y:'1870s',yl:'1870s',t:'Charcot names it',
  cap:['At the Salpêtrière in Paris, Charcot','adds slowness and rigidity, separates','the disease from multiple sclerosis','and other tremors, and names it after','Parkinson: patients are not truly','weak, so "palsy" is the wrong word.'],
  txt:'Jean-Martin Charcot, lecturing at the Salpêtrière from the 1870s, added bradykinesia and rigidity, separated Parkinson\'s from multiple sclerosis and other tremor disorders, and rejected "paralysis agitans" and "shaking palsy" in favour of naming the disease after Parkinson, noting that patients are not markedly weak. He used hyoscyamine and other belladonna alkaloids, an early anticholinergic treatment. [[Goetz2011]]',
  pt:'A famous Paris neurologist completed the description, gave the disease Parkinson\'s name and tried one of the first medicines for it.',
  hook:'Charcot: added bradykinesia and rigidity; named the disease after Parkinson; belladonna alkaloids.'},
 {y:'1912–1919',yl:'1912',t:'Lewy bodies and the nigra',flag:'Tretiakoff\'s thesis is dated 1919 in a centenary history and 1921 in an earlier review.',
  cap:['1912: Fritz Heinrich Lewy describes','inclusions in paralysis agitans.','1919: Tretiakoff\'s Paris thesis finds','loss of pigmented nigral neurons and','names the inclusions "corps de Lewy".','1938–39: Hassler confirms the nigra.'],
  txt:'Fritz Heinrich Lewy first described the eosinophilic neuronal inclusions in paralysis agitans in 1912. Konstantin Tretiakoff\'s Paris thesis (1919) described loss of pigmented neurons in the substantia nigra and named the inclusions "corps de Lewy", Lewy bodies. Rolf Hassler later confirmed the nigral findings (1938 to 1939). [[Holdorff2019]] Goetz 2011 dates Tretiakoff\'s work to 1921. [[Goetz2011]] What Lewy bodies are made of is in <a href="#synuclein" data-go="synuclein">Alpha-synuclein and Lewy bodies</a>.',
  pt:'Under the microscope, the dark-pigmented cells in a small part of the brainstem were found to be lost, and the survivors held round clumps now called Lewy bodies.',
  hook:'Lewy 1912 (inclusions); Tretiakoff 1919 (substantia nigra, named "corps de Lewy").'},
 {y:'1957–58',yl:'1957',t:'Carlsson and dopamine',
  cap:['Arvid Carlsson gives animals reserpine:','brain monoamines drain away and they','stop moving.','L-dopa restores brain dopamine and','movement; a serotonin precursor does not.','Nobel Prize, 2000.'],
  txt:'Arvid Carlsson (1957 to 1958) gave reserpine to animals, which depleted brain monoamines and stopped spontaneous movement. L-dopa reversed this and restored brain dopamine, while a serotonin precursor did not. He recognised the similarity to Parkinson\'s, and the work led to L-dopa treatment. He shared the 2000 Nobel Prize in Physiology or Medicine with Paul Greengard and Eric Kandel "for their discoveries concerning signal transduction in the nervous system". [[Nobel2000]]',
  pt:'Animal experiments showed that dopamine is needed for movement, and that its building block, L-dopa, can put it back.',
  hook:'Carlsson: reserpine akinesia reversed by L-dopa; Nobel 2000.'},
 {y:'1960–61',yl:'1960',t:'Dopamine is missing',
  cap:['Ehringer and Hornykiewicz find the','striatum depleted of dopamine in brains','of people with Parkinson\'s and with','postencephalitic parkinsonism.','1961: Birkmayer and Hornykiewicz give','levodopa into a vein for the first time.'],
  txt:'Ehringer and Hornykiewicz (1960) found striatal dopamine depletion in brains from people with Parkinson\'s and postencephalitic parkinsonism. In 1961 Birkmayer and Hornykiewicz gave intravenous levodopa to patients for the first time. [[Goetz2011]] The circuit this loss disturbs is in <a href="#circuit" data-go="circuit">The dopamine pathway</a>.',
  pt:'In human brains, the movement centre called the striatum had lost its dopamine, which pointed straight at a treatment.',
  hook:'Ehringer and Hornykiewicz 1960: striatal dopamine depletion in Parkinson\'s.'},
 {y:'1967–1975',yl:'1967',t:'Levodopa arrives',
  cap:['16 Feb 1967: Cotzias and colleagues','report high-dose oral treatment (NEJM).','1967: Hoehn and Yahr publish stages.','4 June 1970: FDA approves levodopa','(Larodopa). 2 May 1975: carbidopa-','levodopa (Sinemet).'],
  txt:'Cotzias, Van Woert and Schiffer published "Aromatic amino acids and modification of parkinsonism" in NEJM on 16 February 1967, the report that launched high-dose oral treatment; their 1969 report described chronic L-dopa treatment. Their doses could not be verified. [[Cotzias1967,Goetz2011]] Hoehn and Yahr published their staging paper the same year. [[Hoehn1967]] The FDA approved levodopa as Larodopa on 4 June 1970 and carbidopa-levodopa as Sinemet on 2 May 1975; carbidopa blocks the conversion of levodopa outside the brain. [[FDA-DrugsFDA,Goetz2011]] See <a href="#levodopa" data-go="levodopa">Levodopa and carbidopa</a>.',
  pt:'Levodopa tablets in large doses turned the discovery into a treatment, and adding carbidopa let more of each dose reach the brain.',
  hook:'Cotzias 1967: high-dose oral levodopa. Sinemet (carbidopa-levodopa): FDA 1975.'},
 {y:'1983',yl:'1983',t:'MPTP',
  cap:['Langston and colleagues describe four','people with marked parkinsonism after','injecting an illicit drug sold as a','pethidine (meperidine) analogue.','It contained MPTP, which they proposed','damages the substantia nigra.'],
  txt:'Langston and colleagues (1983) described four people who developed marked parkinsonism after injecting an illicit meperidine (pethidine) analogue product found to contain MPTP. They proposed that it selectively damages substantia nigra cells. [[Langston1983]]',
  pt:'A contaminated street drug caused sudden, severe Parkinson-like illness, showing that a chemical can destroy the same brain cells.',
  hook:'MPTP (1983): a toxin that selectively damages the substantia nigra.'},
 {y:'1987–2002',yl:'1987',t:'Deep brain stimulation',
  cap:['1987: Benabid finds that 100 Hz','stimulation of the thalamic VIM nucleus','stops parkinsonian tremor.','31 July 1997: FDA approves one-sided','thalamic stimulation for tremor.','14 Jan 2002: both sides, STN or GPi.'],
  txt:'Benabid and colleagues (1987) reported that high-frequency (100 Hz) stimulation of the thalamic VIM nucleus stopped parkinsonian tremor; they combined thalamotomy on one side with chronic stimulation on the other. This was the origin of modern deep brain stimulation. [[Benabid1987]] The FDA approved unilateral thalamic stimulation for essential or parkinsonian tremor on 31 July 1997, and bilateral GPi or STN stimulation for advanced, levodopa-responsive Parkinson\'s on 14 January 2002. [[FDAPMA2026]] See <a href="#dbs" data-go="dbs">Deep-brain stimulation</a>.',
  pt:'A thin wire in the brain, sending fast electrical pulses, could switch off a tremor, and it later became a treatment for Parkinson\'s itself.',
  hook:'Benabid 1987: high-frequency VIM stimulation. FDA: 1997 tremor, 2002 STN/GPi for Parkinson\'s.'},
 {y:'1997–2009',yl:'1997',t:'The genes',
  cap:['1997: SNCA A53T, the first gene.','1998: parkin (recessive, juvenile).','2003: a tripled SNCA region.','2004: LRRK2 and PINK1.','2009: GBA1 variants in a 16-centre','study.'],
  txt:'The first Parkinson\'s gene mutation, SNCA A53T, was found in 1997 in an Italian kindred and three Greek families. [[Polymeropoulos1997]] Parkin mutations were found in 1998 in autosomal recessive juvenile parkinsonism. [[Kitada1998]] A triplicated SNCA locus was shown to cause Parkinson\'s in 2003. [[Singleton2003]] LRRK2 was identified in 2004 by two groups. [[PaisanRuiz2004,Zimprich2004]] PINK1 mutations were reported the same year, the first direct genetic link between mitochondria and Parkinson\'s. [[Valente2004]] A 16-centre study in 2009 found the GBA1 variants L444P or N370S in 15% of Ashkenazi Jewish patients against 3% of controls. [[Sidransky2009]] See <a href="#genes" data-go="genes">Genes and inheritance</a>.',
  pt:'Families in which Parkinson\'s ran through generations led researchers to genes, starting with the gene for alpha-synuclein.',
  hook:'1997 SNCA (A53T) was the first Parkinson\'s gene; LRRK2 and PINK1 followed in 2004.'},
 {y:'2005',yl:'2005',t:'The red tulip',flag:'Some secondary pages date the tulip to 1981, not 1980.',
  cap:['World Parkinson\'s Day: 11 April,','James Parkinson\'s birthday.','The "Dr James Parkinson" tulip was','bred in 1980 by a Dutch grower who had','Parkinson\'s. It became the symbol in','Luxembourg on 11 April 2005.'],
  txt:'World Parkinson\'s Day is held on 11 April, James Parkinson\'s birthday. The red-and-white "Dr James Parkinson" tulip was bred in 1980 by J.W.S. Van der Wereld, a Dutch horticulturist who had Parkinson\'s. The red tulip was adopted as the symbol of Parkinson\'s at the 9th World Parkinson\'s Disease Day Conference in Luxembourg on 11 April 2005. Some secondary pages give 1981 for the tulip. [[ParkinsonsNSW2026]]',
  pt:'A grower with Parkinson\'s bred a red and white tulip, and it became the worldwide symbol of the disease.',
  hook:'World Parkinson\'s Day: 11 April. Symbol: the red tulip (2005).'},
 {y:'2006',yl:'2006',t:'Rasagiline',
  cap:['According to the Technion, Moussa','Youdim and John Finberg developed','rasagiline there in the 1970s.','Teva developed it as Azilect.','16 May 2006: FDA approval.'],
  txt:'According to the Technion, professors Moussa Youdim and John Finberg developed rasagiline in the 1970s, and Teva Pharmaceuticals then developed it as Azilect. [[Technion2016]] The FDA approved Azilect on 16 May 2006. [[FDA-DrugsFDA]] A European approval in 2005 is reported only in secondary sources (unverified). How MAO-B inhibitors are used is in <a href="#drugs" data-go="drugs">The other medicines</a>.',
  pt:'A medicine that slows the breakdown of dopamine was developed at an Israeli university and an Israeli drug company.',
  hook:'Rasagiline (Azilect): an MAO-B inhibitor from the Technion and Teva; FDA approval 2006.'},
 {y:'2015–2016',yl:'2015',t:'Criteria and directional leads',
  cap:['2015: the MDS clinical diagnostic','criteria, built in steps.','17 Nov 2015: FDA allows DBS from 4','years of levodopa-responsive disease.','2016: the first FDA-approved DBS','system with a directional lead.'],
  txt:'The 2015 MDS criteria define parkinsonism first, then check absolute exclusions, then weigh red flags against supportive criteria. [[Postuma2015]] On 17 November 2015 the FDA changed the Medtronic indication to levodopa-responsive Parkinson\'s of at least 4 years\' duration not adequately controlled with medication. In 2016 Abbott\'s Infinity became the first FDA-approved system with a directional lead. [[FDAPMA2026,Paff2020]] See <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>.',
  pt:'Doctors got a stepwise checklist for diagnosis, and stimulation leads that can aim the current in one direction.',
  hook:'MDS 2015: parkinsonism → exclusions → red flags versus supportive criteria.'},
 {y:'2023',yl:'2023',t:'The seed amplification assay',
  cap:['In spinal fluid from 1,123 PPMI','participants, an assay that amplifies','misfolded alpha-synuclein was positive','in 87.7% of people with Parkinson\'s and','negative in 96.3% of healthy controls.','It is not an approved diagnostic test.'],
  txt:'The CSF alpha-synuclein seed amplification assay, tested in 1,123 PPMI participants, had 87.7% sensitivity for Parkinson\'s (95% CI 84.9 to 90.5) and 96.3% specificity in healthy controls; it was positive in 86% of people with REM sleep behaviour disorder or loss of smell. [[Siderowf2023]] The FDA has issued a letter of support for it as a risk biomarker in clinical trials, which is not a diagnostic approval. [[Stephenson2026]] An MDS statement cautions that the assay is binary, cannot predict "if, when, and which clinical syndrome" will follow, and is often negative in LRRK2 Parkinson\'s. [[Cardoso2024]] See <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>.',
  pt:'A laboratory test can now detect the misfolded protein of Parkinson\'s in spinal fluid in most people with the disease. It is a research tool for now.',
  hook:'CSF alpha-synuclein SAA (PPMI 2023): sensitivity 87.7%, specificity 96.3%; about a third of LRRK2 Parkinson\'s is negative. [[Siderowf2023]]'}
];
HI_ERAS.forEach((e,i,a)=>{e.from=i/a.length;e.at=(i+.55)/a.length});
const HI_PEOPLE=[
 ['1817 · London','James Parkinson','A surgeon, styled "Member of the Royal College of Surgeons", whose essay described six cases of the "shaking palsy". World Parkinson\'s Day falls on his birthday, 11 April. [[Parkinson1817,ParkinsonsNSW2026]]'],
 ['1870s · Salpêtrière, Paris','Jean-Martin Charcot','Added bradykinesia and rigidity, separated the disease from multiple sclerosis and other tremors, named it after Parkinson, and treated it with belladonna alkaloids. [[Goetz2011]]'],
 ['1912','Fritz Heinrich Lewy','First described the eosinophilic inclusions inside neurons in paralysis agitans. [[Holdorff2019]]'],
 ['1919 · Paris thesis','Konstantin Tretiakoff','Linked the disease to loss of pigmented neurons in the substantia nigra and named the inclusions "corps de Lewy" (dated 1921 in one review). [[Holdorff2019,Goetz2011]]'],
 ['1957–58 · Nobel 2000','Arvid Carlsson','Showed that L-dopa reverses reserpine\'s loss of brain dopamine and movement, and saw the parallel with Parkinson\'s. [[Nobel2000]]'],
 ['1960–61','Oleh Hornykiewicz','With Ehringer, found striatal dopamine depletion in Parkinson\'s brains; with Birkmayer, first gave levodopa intravenously. [[Goetz2011]]'],
 ['1967','George Cotzias','First author of the 1967 NEJM report that launched high-dose oral levodopa, and of a 1969 report on chronic treatment. [[Cotzias1967,Goetz2011]]'],
 ['1983','J.W. Langston','Described parkinsonism in four people exposed to MPTP and proposed that it damages the substantia nigra. [[Langston1983]]'],
 ['1987','A.L. Benabid','Showed that high-frequency thalamic stimulation stops parkinsonian tremor, the origin of modern deep brain stimulation. [[Benabid1987]]']
];
function hiWalk(x,g,lean,ph,col,soft){/* stooped walker facing right */
  const hipY=g-62,up=h=>[x+Math.sin(lean)*h,hipY-Math.cos(lean)*h],[nx,ny]=up(48),[sx,sy]=up(42),[hx,hy]=up(60),sw=Math.sin(ph);
  const leg=(sg,o)=>{const fx=x+sg*12*sw+4;return `<path d="M${f1(x)} ${f1(hipY)}L${f1((x+fx)/2+6)} ${f1((hipY+g)/2)}L${f1(fx)} ${g}" style="fill:none;stroke:${col};stroke-width:6;stroke-linecap:round;stroke-linejoin:round;opacity:${o}"/>`};
  return leg(-1,.5)+`<path d="M${f1(x)} ${f1(hipY)}L${f1(nx)} ${f1(ny)}M${f1(sx)} ${f1(sy)}L${f1(sx+6)} ${f1(sy+22)}L${f1(sx+16)} ${f1(sy+34)}" style="fill:none;stroke:${col};stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="10" style="fill:${soft};stroke:${col};stroke-width:2.5"/>`+leg(1,1)}
function hiTulip(x,g,h,o){/* red tulip with white-edged petals */
  const top=g-h;return `<g style="opacity:${f1(o)}"><path d="M${x} ${g}V${f1(top+10)}" style="stroke:var(--good);stroke-width:4;stroke-linecap:round"/><path d="M${x} ${f1(g-h*.25)}q-26 -10 -30 -46q22 12 30 40z" style="fill:var(--good);opacity:.8"/><path d="M${x} ${f1(g-h*.4)}q22 -12 24 -44q-18 14 -24 40z" style="fill:var(--good);opacity:.65"/>`+
  `<path d="M${x-18} ${f1(top+10)}q-4 -30 8 -42q10 18 10 38z" style="fill:var(--bad);stroke:var(--panel);stroke-width:2.5"/><path d="M${x+18} ${f1(top+10)}q4 -30 -8 -42q-10 18 -10 38z" style="fill:var(--bad);stroke:var(--panel);stroke-width:2.5"/><path d="M${x-12} ${f1(top+14)}q12 -52 24 0q-12 6 -24 0z" style="fill:var(--bad);stroke:var(--panel);stroke-width:2.5"/></g>`}
function hiScene(i,u,cx,cy){let s='';const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}" style="${st}">${txt}</text>`;
  const O=(a,b)=>f1(ramp(u,a,b));
  if(i===0){ /* the essay and the hurrying walk */
    s+=`<rect x="${cx-150}" y="${cy-104}" width="104" height="146" rx="4" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/><path d="M${cx-142} ${cy-104}V${cy+42}" style="stroke:var(--muted);stroke-width:1.5"/>`;
    ['AN','ESSAY','ON THE','SHAKING','PALSY'].forEach((w,k)=>{s+=T(cx-94,cy-74+k*16,w,'t-xs t-mid','fill:var(--ink);font-weight:700')});
    s+=T(cx-94,cy+8,'J. PARKINSON','t-xs t-mid')+T(cx-94,cy+26,'LONDON 1817','t-xs t-mid');
    const g=cy+100;s+=`<path d="M${cx-150} ${g}H${cx+150}" class="axis" style="stroke:var(--muted)"/>`;
    const p=Math.pow(ramp(u,.08,.95),1.8),x=cx-20+p*150,ph=p*34;
    for(let k=0;k<7;k++){const q=Math.pow(k/7,1.8);if(q<=p)s+=`<ellipse cx="${f1(cx-16+q*150)}" cy="${g+5}" rx="5" ry="2.2" style="fill:var(--rose);opacity:${f1(.25+.5*k/7)}"/>`}
    s+=hiWalk(x,g,.3,ph,'var(--rose)','var(--rose-soft)');
    s+=T(cx-20,g+22,'"to pass from a walking to a running pace"','t-xs','fill:var(--rose)');
  }else if(i===1){ /* what he noted */
    const L=[ 'rest tremor','bent trunk','hurrying gait','broken sleep','"torpid" bowels','drooling','chewing, swallowing','late loss of speech'];
    s+=T(cx-150,cy-100,'NOTED IN 1817','t-xs','fill:var(--sage);font-weight:700');
    L.forEach((l,k)=>{const o=ramp(u,.04+k*.07,.1+k*.07),y=cy-80+k*22,nm=k>=3;
      s+=`<g style="opacity:${f1(o)}"><circle cx="${cx-142}" cy="${y-4}" r="7" style="fill:${nm?'var(--violet-soft)':'var(--sage-soft)'};stroke:${nm?'var(--violet)':'var(--sage)'}"/><path d="M${cx-146} ${y-4}l3 3l5 -6" style="fill:none;stroke:${nm?'var(--violet)':'var(--sage)'};stroke-width:1.8"/>`+T(cx-128,y,l,'t-sm','fill:var(--ink)')+'</g>'});
    s+=T(cx-128,cy+100,'violet: non-motor','t-xs','fill:var(--violet);opacity:'+O(.3,.4));
    s+=T(cx+40,cy-100,'NOT CARDINAL IN 1817','t-xs','fill:var(--muted);font-weight:700;opacity:'+O(.62,.68));
    ['rigidity','bradykinesia'].forEach((l,k)=>{const o=ramp(u,.66+k*.06,.72+k*.06),y=cy-76+k*24;s+=`<g style="opacity:${f1(o)}"><rect x="${cx+40}" y="${y-14}" width="108" height="20" rx="5" style="fill:none;stroke:var(--muted);stroke-dasharray:4 3"/>`+T(cx+50,y,l,'t-sm','fill:var(--muted)')+'</g>'});
    const o2=ramp(u,.82,.9);s+=`<g style="opacity:${f1(o2)}"><rect x="${cx+40}" y="${cy-8}" width="110" height="52" rx="8" style="fill:var(--warn-soft);stroke:var(--warn)"/>`+T(cx+50,cy+10,'"intellects','t-sm','fill:var(--warn);font-weight:700')+T(cx+50,cy+26,'uninjured"?','t-sm','fill:var(--warn);font-weight:700')+T(cx+40,cy+62,'Sydney, 20 years:','t-xs')+T(cx+40,cy+76,'83% of survivors','t-xs','fill:var(--ink)')+T(cx+40,cy+90,'had dementia','t-xs','fill:var(--ink)')+'</g>';
  }else if(i===2){ /* Charcot */
    s+=T(cx,cy-104,'THE SALPÊTRIÈRE, PARIS','t-xs t-mid','fill:var(--ink);font-weight:700');
    const card=(y,l,a,strike)=>{const o=ramp(u,a,a+.06);let g=`<g style="opacity:${f1(o)}"><rect x="${cx-110}" y="${y-18}" width="220" height="28" rx="6" style="fill:var(--panel);stroke:var(--muted)"/>`+T(cx,y,l,'t-sm t-mid','fill:var(--ink);font-weight:600');
      if(strike){const k=ease(ramp(u,strike,strike+.08));if(k>0)g+=`<path d="M${cx-96} ${y-5}H${f1(cx-96+192*k)}" style="stroke:var(--bad);stroke-width:2.4"/>`}return g+'</g>'};
    s+=card(cy-72,'"paralysis agitans"',.04,.3)+card(cy-36,'"shaking palsy"',.08,.36);
    const o3=ease(ramp(u,.42,.5));s+=`<g style="opacity:${f1(o3)}"><rect x="${cx-110}" y="${cy-14}" width="220" height="32" rx="8" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`+T(cx,cy+7,'Parkinson\'s disease','t-lbl t-mid','fill:var(--sage)')+'</g>';
    [['+ bradykinesia',-60,.56],['+ rigidity',60,.62]].forEach(([l,dx,a])=>{const o=ramp(u,a,a+.06);s+=`<g style="opacity:${f1(o)}"><rect x="${cx+dx-56}" y="${cy+34}" width="112" height="24" rx="12" style="fill:var(--rose-soft);stroke:var(--rose)"/>`+T(cx+dx,cy+50,l,'t-xs t-mid','fill:var(--rose);font-weight:700')+'</g>'});
    const o4=ramp(u,.74,.82);s+=`<g style="opacity:${f1(o4)}"><path d="M${cx-14} ${cy+72}h28v8l6 10v26h-40v-26l6 -10z" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.6"/>`+T(cx+30,cy+100,'belladonna alkaloids','t-xs','fill:var(--sky)')+'</g>';
  }else if(i===3){ /* microscope field */
    const fx=cx-50,fy=cy;s+=`<circle cx="${fx}" cy="${fy}" r="96" style="fill:var(--cell);stroke:var(--muted);stroke-width:3"/>`;
    const NP=[[-50,-40,1],[10,-58,2],[44,-6,3],[-26,24,4],[22,46,5],[-62,40,6]];
    NP.forEach(([dx,dy,sd],k)=>{const loss=(k===1||k===4||k===5)?ramp(u,.6+k*.03,.8+k*.02):0;s+=neuron(fx+dx,fy+dy,11,1-.8*loss,{pig:1,seed:sd,axon:k*.9,dead:loss})});
    const lb=ramp(u,.22,.32);if(lb>0){s+=lewyBody(fx+44+2,fy-6+1,6.5*lb,1)+lewyBody(fx-26,fy+24,5*lb,1)}
    s+=T(fx+110,cy-70,'1912 · Lewy','t-sm','fill:var(--ink);font-weight:700;opacity:'+O(.2,.28))+T(fx+110,cy-56,'inclusions','t-xs','fill:var(--rose);opacity:'+O(.2,.28));
    s+=T(fx+110,cy-20,'1919 · Tretiakoff','t-sm','fill:var(--ink);font-weight:700;opacity:'+O(.5,.58))+T(fx+110,cy-6,'pigmented cells lost;','t-xs','opacity:'+O(.5,.58))+T(fx+110,cy+8,'"corps de Lewy"','t-xs','fill:var(--rose);opacity:'+O(.5,.58));
    s+=T(fx+110,cy+46,'1938–39 · Hassler','t-sm','fill:var(--ink);font-weight:700;opacity:'+O(.84,.9))+T(fx+110,cy+60,'confirms the nigra','t-xs','opacity:'+O(.84,.9));
  }else if(i===4){ /* Carlsson */
    const col=[ ['normal',1,'moves'],['reserpine',0,'no movement'],['+ L-dopa',2,'moves again'] ];
    col.forEach(([l,st,mv],k)=>{const x=cx-100+k*100,o=ramp(u,.05+k*.25,.12+k*.25);
      s+=`<g style="opacity:${f1(.2+.8*o)}"><path d="M${x-34} ${cy-70}q0 -24 34 -24q34 0 34 24v70q0 18 -34 18q-34 0 -34 -18z" style="fill:var(--panel);stroke:var(--axon);stroke-width:2"/>`;
      const fill=st===1?1:st===0?0:ramp(u,.6,.8);
      for(let v=0;v<6;v++)s+=vesicle(x-16+(v%2)*32,cy-66+Math.floor(v/2)*30,10,1,fill>v/6+.01?1:0);
      s+=T(x,cy+46,l,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x,cy+62,mv,'t-xs t-mid',`fill:${st===0?'var(--bad)':'var(--good)'}`)+'</g>'});
    s+=T(cx-150,cy+92,'gold: vesicles holding dopamine (schematic)','t-xs','fill:var(--amber)');
    const nb=ramp(u,.86,.94);s+=`<g style="opacity:${f1(nb)}"><circle cx="${cx+130}" cy="${cy-100}" r="18" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:2"/>`+T(cx+130,cy-96,'2000','t-xs t-mid','fill:var(--amber);font-weight:700')+T(cx+104,cy-100,'Nobel','t-xs t-end','fill:var(--amber)')+'</g>';
  }else if(i===5){ /* dopamine loss in the striatum */
    const R=rng(5);const pts=[...Array(40)].map(()=>[R()*2-1,R()*2-1]);
    [['control',-80,40],['Parkinson\'s',70,7]].forEach(([l,dx,n],k)=>{const x=cx+dx,o=ramp(u,.04+k*.18,.12+k*.18);
      s+=`<g style="opacity:${f1(.2+.8*o)}"><ellipse cx="${x}" cy="${cy-30}" rx="56" ry="48" style="fill:var(--panel);stroke:var(--sage);stroke-width:2"/>`;
      pts.slice(0,n).forEach(([a,b])=>{s+=`<circle cx="${f1(x+a*42)}" cy="${f1(cy-30+b*34)}" r="3.6" style="fill:var(--amber)"/>`});
      s+=T(x,cy+36,l,'t-sm t-mid','fill:var(--ink);font-weight:700')+'</g>'});
    s+=T(cx,cy-96,'STRIATAL DOPAMINE (SCHEMATIC)','t-xs t-mid','fill:var(--amber);font-weight:700');
    const iv=ramp(u,.55,.65);if(iv>0){s+=`<g style="opacity:${f1(iv)}"><rect x="${cx-24}" y="${cy+54}" width="34" height="44" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.6"/><path d="M${cx-7} ${cy+98}v18" style="stroke:var(--sky);stroke-width:2"/>`;
      for(let d=0;d<3;d++){const k=(u*6+d/3)%1;s+=`<circle cx="${cx-7}" cy="${f1(cy+100+k*16)}" r="2" style="fill:var(--sky)"/>`}
      s+=T(cx+20,cy+72,'1961: levodopa','t-xs','fill:var(--sky);font-weight:700')+T(cx+20,cy+86,'into a vein','t-xs','fill:var(--sky)')+'</g>'}
  }else if(i===6){ /* levodopa arrives */
    s+=`<path d="M${cx-150} ${cy+40}H${cx+150}" style="stroke:var(--muted);stroke-width:3"/>`;
    [['1967','high-dose oral','Cotzias'],['1970','Larodopa','FDA, 4 June'],['1975','Sinemet','FDA, 2 May']].forEach(([y,n,d],k)=>{const x=cx-100+k*100,dr=ease(ramp(u,.06+k*.22,.22+k*.22));if(dr<=0)return;const yy=cy-30-50*(1-dr);
      s+=`<g style="opacity:${f1(dr)}"><rect x="${x-24}" y="${f1(yy-12)}" width="48" height="70" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.8"/><rect x="${x-18}" y="${f1(yy-26)}" width="36" height="16" rx="3" style="fill:var(--sky)"/><rect x="${x-16}" y="${f1(yy+8)}" width="32" height="26" rx="2" style="fill:var(--panel)"/>`+T(x,yy+25,y,'t-xs t-mid','fill:var(--ink);font-weight:700')+'</g>';
      s+=T(x,cy+60,n,'t-xs t-mid','fill:var(--ink);opacity:'+f1(dr))+T(x,cy+74,d,'t-xs t-mid','opacity:'+f1(dr))});
    const hy=ramp(u,.78,.88);if(hy>0){s+=T(cx-150,cy+98,'1967 · Hoehn and Yahr stages','t-xs','fill:var(--rose);opacity:'+f1(hy));for(let k=0;k<5;k++)s+=`<rect x="${cx+40+k*22}" y="${cy+86}" width="18" height="16" rx="3" style="fill:var(--rose-soft);stroke:var(--rose);opacity:${f1(hy)}"/>`+T(cx+49+k*22,cy+98,k+1,'t-xs t-mid','fill:var(--rose);opacity:'+f1(hy))}
  }else if(i===7){ /* MPTP */
    const sx=cx-140,sy=cy-10;s+=`<rect x="${sx}" y="${sy-9}" width="62" height="18" rx="3" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.8"/><path d="M${sx+62} ${sy}h26M${sx-10} ${sy}h10M${sx-10} ${sy-10}v20" style="stroke:var(--muted);stroke-width:2"/><rect x="${sx+4}" y="${sy-6}" width="${f1(50*(1-ramp(u,.1,.4)))}" height="12" style="fill:var(--bad);opacity:.6"/>`;
    s+=T(sx,sy-20,'street drug','t-xs','fill:var(--ink)')+T(sx,sy+26,'contained MPTP','t-xs','fill:var(--bad);font-weight:700;opacity:'+O(.2,.3));
    const ar=ramp(u,.3,.45);s+=`<path d="M${sx+94} ${sy}H${f1(sx+94+60*ar)}" style="stroke:var(--bad);stroke-width:2;stroke-dasharray:5 4"/>`;
    const nx=cx+70,ny=cy;s+=`<ellipse cx="${nx}" cy="${ny}" rx="78" ry="62" style="fill:var(--cell);stroke:var(--muted);stroke-dasharray:4 3"/>`+T(nx,ny-70,'substantia nigra','t-xs t-mid','fill:var(--ink)');
    [[-40,-20],[0,-30],[38,-12],[-24,22],[24,26]].forEach(([dx,dy],k)=>{const d=ramp(u,.45+k*.06,.7+k*.05);s+=neuron(nx+dx,ny+dy,10,1-.75*d,{pig:1,seed:k+3,axon:k,dead:d})});
    s+=T(nx,ny+82,'four people: marked parkinsonism','t-xs t-mid','fill:var(--bad);font-weight:700;opacity:'+O(.8,.9));
  }else if(i===8){ /* DBS */
    const hx=cx-70,hy=cy-34;
    s+=`<path d="M${hx-62} ${hy+40}q-10 -96 66 -100q76 0 72 78q0 26 -18 34l2 22h-38l-4 22h-50z" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    s+=`<circle cx="${hx+4}" cy="${hy-6}" r="9" style="fill:var(--violet-soft);stroke:var(--violet)"/>`+T(hx+16,hy-16,'VIM','t-xs','fill:var(--violet);font-weight:700');
    const on=u>.45,pulse=on?.5+.5*Math.sin(u*120):0;
    s+=`<path d="M${hx+10} ${hy-58}L${hx+4} ${hy-6}" style="stroke:var(--sky);stroke-width:3"/><circle cx="${hx+4}" cy="${hy-6}" r="${f1(5+pulse*7)}" style="fill:var(--sky);opacity:${f1(on?.35:0)}"/>`;
    s+=`<path d="M${hx+10} ${hy-58}q60 -10 64 60q0 40 -20 70" style="fill:none;stroke:var(--sky);stroke-width:1.6;stroke-dasharray:3 3"/><rect x="${hx+40}" y="${hy+70}" width="36" height="26" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.8"/>`+T(hx+58,hy+112,'pulse generator','t-xs t-mid','fill:var(--sky)');
    const gx0=cx+40,gx1=cx+150,gy=cy-40;
    s+=T(gx0,gy-40,'TREMOR','t-xs','fill:var(--rose);font-weight:700')+`<path d="${pathFn(v=>{const a=v<.45?1:Math.max(0,1-(v-.45)*12);return .5+.4*a*Math.sin(v*60)},gx0,gx0+(gx1-gx0)*Math.min(1,u*1.05+.02),gy+24,gy-24,160)}" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`;
    s+=`<rect x="${gx0}" y="${gy+34}" width="110" height="22" rx="11" style="fill:${on?'var(--sky)':'var(--panel-2)'}"/>`+T(gx0+55,gy+49,on?'100 Hz: ON':'stimulator OFF','t-xs t-mid',`fill:${on?'var(--panel)':'var(--muted)'};font-weight:700`);
    s+=T(gx0,cy+44,'1997 FDA: tremor','t-xs','fill:var(--ink);opacity:'+O(.66,.74))+T(gx0,cy+60,'2002 FDA: STN or GPi','t-xs','fill:var(--ink);opacity:'+O(.8,.88))+T(gx0,cy+74,'for Parkinson\'s','t-xs','fill:var(--ink);opacity:'+O(.8,.88));
  }else if(i===9){ /* genes */
    const x0=cx-150,x1=cx+150;s+=`<path d="${pathFn(v=>.5+.35*Math.sin(v*Math.PI*6),x0,x1,cy+10,cy-30,160)}" style="fill:none;stroke:var(--sage);stroke-width:2.4"/><path d="${pathFn(v=>.5-.35*Math.sin(v*Math.PI*6),x0,x1,cy+10,cy-30,160)}" style="fill:none;stroke:var(--violet);stroke-width:2.4"/>`;
    for(let k=0;k<=24;k++){const x=lerp(x0,x1,k/24);s+=`<path d="M${f1(x)} ${f1(cy-10+14*Math.sin(k/24*Math.PI*6))}V${f1(cy-10-14*Math.sin(k/24*Math.PI*6))}" style="stroke:var(--line);stroke-width:1.5"/>`}
    const G=[['1997','SNCA A53T',-1],['1998','parkin',1],['2003','SNCA ×3',-1],['2004','LRRK2',1],['2004','PINK1',-1],['2009','GBA1',1]];
    G.forEach(([y,g,sd],k)=>{const x=x0+20+k*52,o=ease(ramp(u,.05+k*.13,.13+k*.13));if(o<=0)return;const yy=sd<0?cy-70:cy+44;
      s+=`<g style="opacity:${f1(o)}"><path d="M${x} ${cy-10}V${sd<0?yy+14:yy-14}" style="stroke:var(--rose);stroke-width:1.2;stroke-dasharray:2 2"/><rect x="${x-36}" y="${yy-14}" width="72" height="34" rx="7" style="fill:var(--rose-soft);stroke:var(--rose)"/>`+T(x,yy,y,'t-xs t-mid','fill:var(--ink);font-weight:700')+T(x,yy+13,g,'t-xs t-mid','fill:var(--rose);font-weight:700')+'</g>'});
  }else if(i===10){ /* tulip */
    const h=lerp(30,150,ease(ramp(u,.05,.45)));s+=`<path d="M${cx-150} ${cy+100}H${cx+150}" class="axis" style="stroke:var(--muted)"/>`+hiTulip(cx-60,cy+100,h,1);
    s+=T(cx+10,cy-70,'1980','t-big','fill:var(--bad);opacity:'+O(.3,.4))+T(cx+10,cy-54,'bred by a Dutch grower','t-xs','opacity:'+O(.3,.4))+T(cx+10,cy-40,'who had Parkinson\'s','t-xs','opacity:'+O(.3,.4));
    s+=T(cx+10,cy+0,'11 April 2005','t-big','fill:var(--bad);opacity:'+O(.55,.65))+T(cx+10,cy+16,'adopted as the symbol,','t-xs','opacity:'+O(.55,.65))+T(cx+10,cy+30,'Luxembourg','t-xs','opacity:'+O(.55,.65));
    s+=T(cx+10,cy+64,'11 April:','t-sm','fill:var(--ink);font-weight:700;opacity:'+O(.8,.9))+T(cx+10,cy+80,'Parkinson\'s birthday','t-xs','opacity:'+O(.8,.9));
  }else if(i===11){ /* rasagiline */
    const B=[ ['Technion','1970s, per the Technion',-90],['Teva','developed as Azilect',-10],['FDA','16 May 2006',70] ];
    B.forEach(([n,d,dy],k)=>{const o=ease(ramp(u,.05+k*.25,.15+k*.25)),y=cy+dy;
      s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="${cx-130}" y="${y-22}" width="150" height="44" rx="10" style="fill:${k===2?'var(--good-soft)':'var(--panel)'};stroke:${k===2?'var(--good)':'var(--sky)'};stroke-width:1.8"/>`+T(cx-118,y-2,n,'t-lbl','')+T(cx-118,y+13,d,'t-xs','')+'</g>';
      if(k<2){const a=ramp(u,.15+k*.25,.28+k*.25);s+=`<path d="M${cx-55} ${y+22}V${f1(y+22+36*a)}" style="stroke:var(--sky);stroke-width:2"/>`}});
    const pl=ramp(u,.5,.6);s+=`<g style="opacity:${f1(pl)}"><ellipse cx="${cx+90}" cy="${cy-10}" rx="34" ry="20" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/><path d="M${cx+90} ${cy-30}v40" style="stroke:var(--sky);stroke-width:1.5"/>`+T(cx+90,cy+30,'rasagiline','t-xs t-mid','fill:var(--sky);font-weight:700')+T(cx+90,cy+44,'MAO-B inhibitor','t-xs t-mid')+'</g>';
  }else if(i===12){ /* criteria and directional lead */
    const st=[ ['1','Parkinsonism?'],['2','No absolute exclusions?'],['3','Red flags vs supportive'] ];
    s+=T(cx-150,cy-100,'MDS 2015','t-xs','fill:var(--rose);font-weight:700');
    st.forEach(([n,l],k)=>{const o=ramp(u,.05+k*.12,.12+k*.12),y=cy-74+k*40;s+=`<g style="opacity:${f1(.2+.8*o)}"><rect x="${cx-150}" y="${y-16}" width="168" height="30" rx="8" style="fill:var(--panel);stroke:var(--rose)"/><circle cx="${cx-134}" cy="${y-1}" r="9" style="fill:var(--rose)"/>`+T(cx-134,y+3,n,'t-xs t-mid','fill:var(--panel);font-weight:700')+T(cx-118,y+3,l,'t-xs','fill:var(--ink);font-weight:600')+'</g>';
      if(k<2)s+=`<path d="M${cx-66} ${y+14}v10" style="stroke:var(--rose);stroke-width:1.6;opacity:${f1(o)}"/>`});
    const lx=cx+90,ly0=cy-100,ly1=cy+40,lo=ramp(u,.5,.6);
    s+=`<g style="opacity:${f1(.2+.8*lo)}"><path d="M${lx} ${ly0}V${ly1}" style="stroke:var(--muted);stroke-width:8;stroke-linecap:round"/>`;
    [0,1,2,3].forEach(k=>{const y=ly1-12-k*18,seg=k===1||k===2;s+=seg?`<path d="M${lx-5} ${y-5}h4v10h-4zM${lx+1} ${y-5}h4v10h-4z" style="fill:var(--sky)"/>`:`<rect x="${lx-5}" y="${y-5}" width="10" height="10" style="fill:var(--sky)"/>`});
    const fld=ramp(u,.66,.8);if(fld>0)s+=`<ellipse cx="${lx+22}" cy="${ly1-39}" rx="${f1(26*fld)}" ry="${f1(16*fld)}" style="fill:var(--sky);opacity:.25"/>`;
    s+=T(lx,ly1+22,'directional lead,','t-xs t-mid','fill:var(--sky)')+T(lx,ly1+36,'2016','t-xs t-mid','fill:var(--sky);font-weight:700')+'</g>';
    s+=T(cx-150,cy+70,'17 Nov 2015 · FDA: DBS from 4 years','t-xs','fill:var(--ink);opacity:'+O(.8,.9))+T(cx-150,cy+84,'of levodopa-responsive disease','t-xs','fill:var(--ink);opacity:'+O(.8,.9));
  }else{ /* seed amplification */
    const tx=cx-130,ty=cy-90;s+=`<path d="M${tx} ${ty}v120q0 18 18 18t18 -18v-120" style="fill:var(--csf);stroke:var(--muted);stroke-width:2"/>`+T(tx+18,ty-8,'CSF','t-xs t-mid','fill:var(--ink);font-weight:700');
    const cyc=ramp(u,.15,.85),fl=1/(1+Math.exp(-(cyc-.5)*12));
    s+=syn(tx+18,ty+90,6,1,1);
    for(let k=0;k<6;k++){const on=fl>k/6+.05,x=tx+18+(k%2?-6:6),y=ty+80-k*10;s+=syn(x,y,6,on?1:.5,on?1:0)}
    const gx0=cx-60,gx1=cx+140,gy0=cy-90,gy1=cy+30;
    s+=`<path d="M${gx0} ${gy0}V${gy1}H${gx1}" class="axis" style="stroke:var(--muted)"/>`+T(gx0,gy0-8,'fluorescence','t-xs')+T(gx1,gy1+16,'cycles of amplification →','t-xs t-end');
    s+=`<path d="${pathFn(v=>.06+.86/(1+Math.exp(-(v-.5)*12)),gx0,gx0+(gx1-gx0)*Math.max(.01,cyc),gy1,gy0,120)}" style="fill:none;stroke:var(--rose);stroke-width:2.4"/><path d="${pathFn(v=>.06,gx0,gx0+(gx1-gx0)*Math.max(.01,cyc),gy1,gy0,10)}" style="fill:none;stroke:var(--sage);stroke-width:2;stroke-dasharray:4 3"/>`;
    s+=T(gx1,gy0+10,'seed present: positive','t-xs t-end','fill:var(--rose);font-weight:700;opacity:'+f1(ramp(cyc,.5,.7)))+T(gx1,gy1-18,'no seed: negative','t-xs t-end','fill:var(--sage);font-weight:700;opacity:'+f1(ramp(cyc,.3,.5)));
    const o=ramp(u,.86,.94);s+=T(cx-60,cy+62,'PPMI: sensitivity 87.7%','t-sm','fill:var(--ink);font-weight:700;opacity:'+f1(o))+T(cx-60,cy+78,'specificity 96.3%','t-sm','fill:var(--ink);font-weight:700;opacity:'+f1(o))+T(cx-60,cy+94,'research use; not an approved diagnostic','t-xs','fill:var(--warn);opacity:'+f1(o));
  }
  return s}
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),n=HI_ERAS.length;
  function draw(t){
    const N=vb(svg,'720 420','400 600');
    const L=N?{r0:24,r1:376,ry:26,cx:200,cy:256,yx:20,yy:70,ty:92,lx:20,ly:414}:{r0:30,r1:690,ry:26,cx:208,cy:250,yx:424,yy:104,ty:130,lx:424,ly:160};
    const i=Math.min(n-1,Math.floor(t*n)),u=ramp(t,i/n,(i+1)/n),E=HI_ERAS[i],gap=(L.r1-L.r0)/(n-1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<path d="M${L.r0} ${L.ry}H${L.r1}" style="stroke:var(--line);stroke-width:3"/><path d="M${L.r0} ${L.ry}H${f1(L.r0+gap*i)}" style="stroke:var(--sage);stroke-width:3"/>`;
    HI_ERAS.forEach((e,k)=>{const x=L.r0+k*gap,on=k===i;
      s+=`<circle cx="${f1(x)}" cy="${L.ry}" r="${on?7:4.5}" style="fill:${k<=i?'var(--sage)':'var(--panel)'};stroke:${k<=i?'var(--sage)':'var(--line)'};stroke-width:1.5"/>`;
      if(!N&&(k%2===0||on))s+=`<text x="${f1(x)}" y="${L.ry+(k%2?-12:22)}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${e.yl}</text>`});
    s+=`<g style="opacity:${f1(ramp(u,0,.08))}">${hiScene(i,u,L.cx,L.cy)}</g>`;
    s+=`<text x="${L.yx}" y="${L.yy}" class="t-big" style="font-size:26px;fill:var(--sage)">${E.y}</text><text x="${L.yx}" y="${L.ty}" class="t-lbl">${E.t}</text>`;
    E.cap.forEach((c,k)=>{s+=`<text x="${L.lx}" y="${L.ly+k*18}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(u,.04+k*.06,.14+k*.06))}">${c}</text>`});
    if(E.flag){const y=L.ly+E.cap.length*18;s+=`<rect x="${L.lx}" y="${y-4}" width="122" height="19" rx="5" style="fill:var(--warn-soft)"/><text x="${L.lx+8}" y="${y+9.5}" class="t-xs" style="fill:var(--warn);font-weight:600">CHECK THE DATE</text>`}
    svg.innerHTML=s;
    setSt(i);
    $('#hiNote').innerHTML=noteHTML({k:E.y+' · '+(i+1)+' of '+n,t:E.t,txt:E.txt+(E.flag?` <span class="tag warn">Check the date</span> ${E.flag}`:''),pt:E.pt,hook:E.hook});
    rg.setAttribute('aria-valuetext',`${E.y}: ${E.t}, era ${i+1} of ${n}`);
  }
  const stop=playWire(rg,$('#hiPlay'),draw,56000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),HI_ERAS.map(e=>({...e,t:e.yl+' · '+e.t})),rg,draw,stop);
  $('#hiPeople').innerHTML=HI_PEOPLE.map(([w,nm,tx])=>`<div class="card"><span class="hi-who">${w}</span><h4>${nm}</h4><p>${tx}</p></div>`).join('');
  $('#hiTulip').innerHTML=`<rect width="220" height="200" rx="10" style="fill:var(--field)"/><path d="M20 170H200" class="axis" style="stroke:var(--muted)"/>`+hiTulip(110,170,130,1)+`<text x="110" y="190" class="t-sm t-mid" style="fill:var(--bad);font-weight:700">11 April</text>`;
  draw(+rg.value);
};
