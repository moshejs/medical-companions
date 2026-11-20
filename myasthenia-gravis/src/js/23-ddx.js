/* =============== 2.3 the differential =============== */
/* Columns of the matrix. Cell flags: 0 like MG, 1 points away from MG, 2 overlaps / sometimes, -1 not described in the sources used here. */
const DDX_COLS=[
 {h:['Ptosis'],f:'Ptosis',s:'ptosis'},
 {h:['Eye','movements'],f:'Eye movements',s:'eyes'},
 {h:['Pupils'],f:'Pupils',s:'pupils'},
 {h:['Reflexes'],f:'Reflexes',s:'reflexes'},
 {h:['Auto-','nomic'],f:'Autonomic signs',s:'autonomic'},
 {h:['Exercise','/ RNS'],f:'Facilitation after exercise / RNS',s:'RNS'},
 {h:['Sensory'],f:'Sensation',s:'sensation'},
 {h:['Course'],f:'Course',s:'course'},
 {h:['Key','test'],f:'Key test',s:'test'}
];
const DDX_NA=(w)=>['—',-1,w||'Not described in the sources used here.'];
const DDX_ROWS=[
 {id:'mg',n:'MG (AChR)',sub:'eyes first · fluctuates',full:'Myasthenia gravis (AChR antibody)',
  P:{lid:'fat',pup:'normal',refl:'normal',auto:'none',sens:'normal',course:'fluct',base:1,lr:[1,.86,.8,.77,.76,.77,.78,.79,.8,.8],post:1.12,postCited:0,
     rnsNote:'normal first CMAP; U-shaped decrement',exNote:'no MG test reached +60% after exercise',key:['AChR antibodies','about 85% of generalized and 50% of ocular MG are positive']},
  c:[['fatigable',0,`Asymmetric ptosis that fluctuates and worsens on sustained upgaze. It was the first symptom in 74.9% of AChR-positive patients without thymoma in a Japanese cohort. [[Juel2007,Yoshikawa2022]]`],
     ['diplopia',0,`Binocular double vision from fluctuating eye-muscle weakness; the first symptom in 47.4% of the same cohort. [[Juel2007,Yoshikawa2022]]`],
     ['normal',0,`The pupils are normal in MG. [[Juel2007]]`],
     ['normal',0,`Deep tendon reflexes and sensation are normal. [[MSDManual2026]]`],
     ['none',0,`Autonomic dysfunction belongs to the Lambert-Eaton triad; the MG sources used here do not list it. [[Kesner2018]]`],
     ['decrement|<60% rise',0,`Low-rate decrement of 10% or more, with a U shape. After exercise the response barely rises: an increment of 60% or more occurred in only 4 of 538 MG high-rate tests and in none after exercise. [[AAEM2001,Rousseff2021,Oh2005]]`],
     ['normal',0,`Painless; sensory nerves are not involved. [[Juel2007,Estephan2022]]`],
     ['fluctuates',0,`Day to day and hour to hour, generally worse later in the day, easing with rest and in the cold. [[Juel2007,MSDManual2026]]`],
     ['AChR Ab',0,`AChR binding antibodies in about 85% of generalized and 50% of ocular MG; MuSK, then LRP4, if negative. [[Rousseff2021,Yoganathan2022]]`]]},
 {id:'lems',n:'Lambert-Eaton',sub:'legs first · dry mouth',full:'Lambert-Eaton myasthenic syndrome (LEMS)',
  P:{lid:null,pup:null,refl:'low',auto:'dry',sens:null,course:null,base:.3,lr:[1,.9,.85,.82,.81,.81,.82,.82,.83,.83],post:3.44,postCited:1,
     rnsNote:'low first CMAP, then decrement',exNote:'about +244% after 5–10 s (Hatanaka 2008)',key:['VGCC antibodies','P/Q-type, in 91 to 100%; about half have lung cancer']},
  c:[DDX_NA(`The LEMS sources used here name proximal leg weakness and dry mouth as the early symptoms and give no ptosis figure. [[Titulaer2008]]`),
     DDX_NA(),DDX_NA(),
     ['reduced',1,`Areflexia is part of the classic triad, with proximal weakness and autonomic dysfunction. [[Kesner2018]]`],
     ['dry mouth',1,`Autonomic dysfunction is in the triad. Dry mouth was an early symptom in 97 patients, with and without cancer; erectile dysfunction is one of the DELTA-P items. [[Kesner2018,Titulaer2008,Titulaer2011b]]`],
     ['increment|≥60%',1,`A low first CMAP that rises after 10 s of exercise or 50 Hz stimulation. A 60% limit gave 97% sensitivity and 99% specificity versus MG; the old 100% limit confirmed 85% of 34. [[Oh2005,Oh2017]]`],
     DDX_NA(),
     ['SCLC in|~half',1,`About half have small-cell lung cancer, and up to 60% of LEMS is paraneoplastic. Cerebellar symptoms (9%) were almost only in the cancer group. [[Titulaer2011,Schoser2017,Titulaer2008]]`],
     ['VGCC Ab',1,`P/Q-type VGCC antibodies in 100% of LEMS with cancer and 91% without. [[Lennon1995]]`]]},
 {id:'bot',n:'Botulism',sub:'acute · descending',full:'Botulism',
  P:{lid:'fixed',pup:'dilated',refl:null,auto:'dry',sens:'some',course:'acute',base:.4,lr:null,post:null,exAfter:'increment; size not given',
     rnsNote:'low CMAPs; low-rate train not described',exNote:'classic increment at 30–50 Hz stimulation',key:['CDC triad','afebrile, acute bulbar or visual symptom, and a sign such as fixed pupils']},
  c:[['81%',0,`Ptosis was charted in 81% of confirmed botulism. [[Rao2021]]`],
     ['diplopia|75%',0,`Diplopia in 75% and extraocular palsy in 60%. [[Rao2021]]`],
     ['dilated|37%',1,`Dilated pupils in 37% and abnormally reactive pupils in 24%; fixed pupils are one of the signs in the CDC tool. [[Rao2021]]`],
     DDX_NA(),
     ['dry mouth|63%',1,`Dry mouth in 63%. [[Rao2021]]`],
     ['increment|30–50 Hz',1,`RNS at 30–50 Hz classically shows an increment, with low CMAPs and otherwise normal nerve conduction; early studies may be normal. [[Rao2021]]`],
     ['17%',2,`Sensory deficits in 17%; afebrile in 99%, altered mental status in 8%. [[Rao2021]]`],
     ['acute,|descending',1,`Cranial palsies, then a symmetric descending paralysis. Median incubation 1 day; 42% had respiratory involvement at admission. Asymmetry in 6–15%. [[Rao2021,ChathamStephens2017]]`],
     ['CDC triad',1,`CDC early-recognition tool: afebrile, plus an acute bulbar or visual symptom, plus a sign such as ptosis, fixed pupils or descending paralysis. Edrophonium usually negative; CSF normal. [[Rao2021]]`]]},
 {id:'als',n:'Bulbar ALS',sub:'bulbar · UMN signs',full:'Amyotrophic lateral sclerosis, bulbar onset',
  P:{lid:null,pup:null,refl:'umn',auto:null,sens:null,course:null,base:1,lr:[1,.92,.86,.82,.79,.77,.75,.74,.73,.72],post:null,
     rnsNote:'decrement keeps falling: no U',exNote:'',key:['EMG pattern','no facial decrement, no U shape; antibodies can mislead']},
  c:[DDX_NA(),DDX_NA(),DDX_NA(),
     ['UMN|signs',1,`Upper motor neuron signs accompany the bulbar weakness. [[Rousseff2021]]`],
     DDX_NA(),
     ['decrement|no U',1,`Decrement can occur in ALS, but none of 85 patients had significant facial decrement and ALS lacked the U-shaped recovery at the 5th–6th responses. Area decrement was abnormal more often than amplitude in 421 patients. [[Rousseff2021,Zhang2024]]`],
     DDX_NA(),DDX_NA(),
     ['EMG; Abs|mislead',1,`Jitter is abnormal in motor neuron disease too. False-positive AChR binding in 2 of 22 ALS, LRP4 antibodies in up to 23%, low-titre VGCC antibodies in 23%. [[Sanders2022,Howard1987,Rousseff2021,Lennon1995]]`]]},
 {id:'cpeo',n:'CPEO / mito',sub:'slow · symmetric · fixed',full:'Chronic progressive external ophthalmoplegia (mitochondrial myopathy)',
  P:{lid:null,pup:null,refl:null,auto:null,sens:null,course:'slow',base:null,lr:null,post:null,
     rnsNote:'',exNote:'',key:['Orbital imaging','fat replacement of the eye muscles']},
  c:[DDX_NA(),
     ['no|diplopia',1,`Ophthalmoparesis without diplopia as a leading feature, often affecting the superior rectus. [[Keene2022]]`],
     DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),
     ['no fluct-|uation',1,`Slowly progressive and symmetric. Fluctuation is the hallmark of acquired synaptic disease such as MG. [[Keene2022]]`],
     ['orbit MRI',1,`Orbital imaging commonly shows fat replacement of the extraocular muscles. CPEO and a possible mitochondrial cytopathy were among 8 mimics treated for years as refractory MG. [[Keene2022,Harrison2023]]`]]},
 {id:'opmd',n:'OPMD',sub:'6th decade · ptosis',full:'Oculopharyngeal muscular dystrophy (OPMD)',
  P:{lid:'fixed',pup:null,refl:null,auto:null,sens:null,course:'slow',base:null,lr:null,post:null,
     rnsNote:'',exNote:'',key:['PABPN1 gene','a short GCG repeat expansion']},
  c:[['yes, slow',2,`Progressive ptosis with dysphagia and proximal limb weakness, usually presenting in the sixth decade. [[Brais1998,Reintjes2026]]`],
     ['no|diplopia',1,`Like CPEO, usually ophthalmoparesis without diplopia as a leading feature. [[Keene2022]]`],
     DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),
     ['progress-|ive',1,`Autosomal dominant and progressive, usually from the sixth decade. [[Brais1998]]`],
     ['PABPN1',1,`A short GCG repeat expansion in PABPN1 (formerly PABP2), from (GCG)6 to (GCG)8–13. OPMD was the second commonest alternative diagnosis in people first labelled double-seronegative MG. [[Brais1998,Maccora2025]]`]]},
 {id:'ted',n:'Thyroid eye',sub:'proptosis · pain',full:'Thyroid eye disease (Graves orbitopathy), alone or with MG',
  P:{lid:null,lidMsg:'ptosis was a clue to coexisting MG',pup:null,refl:null,auto:null,sens:null,course:null,base:null,lr:null,post:null,
     rnsNote:'',exNote:'',key:['Orbital imaging','enlarged, inflamed eye muscles; thyroid tests']},
  c:[['clue to|MG',2,`In TED patients who also had MG, ptosis (60%) and exotropia (40%, unusual for TED) were the clues. [[Abumanhal2026]]`],
     ['restrict-|ive',1,`Often asymmetric, with proptosis and pain; imaging shows enlarged, inflamed eye muscles. [[Keene2022]]`],
     DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),
     ['coexists|0.2%',2,`Of 6,576 TED patients, 15 (0.23%) had MG as well; when both were present, diplopia was hard to treat. [[Abumanhal2026,Chen2024]]`],
     ['imaging,|thyroid',1,`Imaging of enlarged, inflamed muscles. When both coexist one positive test may not be enough; thyroid function tests are advised in all definite or probable MG. [[Keene2022,Claytor2021,Rousseff2021]]`]]},
 {id:'brain',n:'Brainstem / CN',sub:'nystagmus · central',full:'Brainstem lesion or cranial nerve palsy',
  P:{lid:null,pup:'unequal',refl:null,auto:null,sens:null,course:null,base:1,lr:[1,.91,.87,.85,.85,.85,.86,.86,.86,.87],post:null,
     rnsNote:'decrement reported in one case',exNote:'',key:['Brain MRI','to exclude a structural lesion or stroke']},
  c:[DDX_NA(),
     ['nystagmus',1,`Nystagmus points to a central nervous system lesion rather than MG. [[Keene2022]]`],
     ['Horner,|CN III',1,`Cranial nerve disorders such as Horner syndrome and third nerve palsy are listed MG differentials; both can involve the pupil, which MG spares. [[Habib2025,Juel2007]]`],
     DDX_NA(),DDX_NA(),
     ['decrement|possible',2,`A brainstem mass mimicked MG and gave a decremental RNS; both resolved after surgery. [[Akkaya2005]]`],
     DDX_NA(),DDX_NA(),
     ['MRI brain',1,`Brain imaging helps exclude structural mimics and brainstem stroke. [[Rousseff2021,Rao2021]]`]]},
 {id:'mfs',n:'Miller Fisher/GBS',sub:'ataxia · areflexia',full:'Miller Fisher syndrome and Guillain-Barré syndrome',
  P:{lid:null,pup:null,refl:'absent',auto:null,sens:null,course:'acute',base:null,lr:null,post:null,
     rnsNote:'',exNote:'',key:['Anti-GQ1b','positive in 83%; raised CSF protein']},
  c:[DDX_NA(),
     ['ophthalmo-|plegia',2,`Ophthalmoplegia, with ataxia and areflexia, in clear consciousness (466 patients). [[Ito2008]]`],
     DDX_NA(),
     ['absent',1,`Areflexia is one of the three defining features. [[Ito2008]]`],
     DDX_NA(),
     ['like|botulism',2,`Miller Fisher electrodiagnostic findings can look like those of botulism. [[Rao2021]]`],
     DDX_NA(),
     ['acute,|C. jejuni',1,`Acute onset; antecedent C. jejuni infection in 21%. GBS raises CSF protein, especially by the second week. [[Ito2008,Rao2021]]`],
     ['GQ1b, CSF',1,`Anti-GQ1b IgG in 83%; CSF albuminocytological dissociation in 76%. [[Ito2008]]`]]},
 {id:'cms',n:'Congenital MS',sub:'from birth · Ab-negative',full:'Congenital myasthenic syndromes (CMS)',
  P:{lid:'fat',pup:null,refl:null,auto:null,sens:null,course:'birth',base:1,lr:[1,.87,.81,.78,.77,.78,.79,.8,.8,.81],post:null,
     rnsNote:'decrement over 10%, as in MG',exNote:'',key:['Genetic testing','32 genes; AChR, MuSK, LRP4 antibodies negative']},
  c:[['MG-like',0,`Fatigable or permanent weakness with a picture that suggests MG. [[Finsterer2019]]`],
     DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),
     ['>10%|decrement',0,`RNS decrement over 10% or raised jitter, as in MG. A double CMAP after a single stimulus is a clue in COLQ, slow-channel and AChE-deficiency CMS. [[Finsterer2019]]`],
     DDX_NA(),
     ['from|birth',1,`Onset congenital, infantile or in childhood (slow-channel usually after adolescence, DOK7 from birth into adulthood); family history; no response to immunosuppression. [[Finsterer2019]]`],
     ['gene|panel',1,`32 genes; the commonest are CHAT, COLQ, RAPSN, CHRNE, DOK7 and GFPT1, and CHRNE may account for up to half. AChR, MuSK and LRP4 antibodies are negative. [[Finsterer2019]]`]]},
 {id:'ici',n:'Drug / ICI MG',sub:'after a drug · myositis',full:'Drug-induced and checkpoint-inhibitor MG',
  P:{lid:'fat',pup:null,refl:null,auto:null,sens:null,course:'drug',base:null,lr:null,post:null,
     rnsNote:'',exNote:'',key:['CK + cardiac tests','myositis and myocarditis can overlap']},
  c:[['often|ocular',0,`D-penicillamine MG is a true AChR-antibody MG, mostly mild and ocular. [[Krenn2020]]`],
     DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),
     ['wks after|a drug',1,`Checkpoint-inhibitor MG began a median 4 weeks (range 1–16) after the first dose; D-penicillamine MG 2–12 months after starting, often remitting within a year of stopping. [[Safa2019,Krenn2020]]`],
     ['CK, heart',1,`AChR antibodies in 66%, CK raised in 84%, myositis 37%, myocarditis 8%, respiratory failure 45%; 38% died. [[Safa2019]]`]]},
 {id:'fnd',n:'Functional',sub:'flares · normal tests',full:'Functional neurological disorder',
  P:{lid:null,pup:null,refl:null,auto:null,sens:null,course:'flares',base:1,lr:[1,1,1,1,1,1,1,1,1,1],post:1,postCited:0,
     rnsNote:'normal train',exNote:'normal',key:['Normal SFEMG','objective tests normal despite flares']},
  c:[DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),DDX_NA(),
     ['normal',1,`Objective tests, including RNS and single-fibre EMG, are normal. [[Harrison2023,Maccora2025]]`],
     DDX_NA(),
     ['frequent|flares',1,`Functional mimics are suspected when flares are frequent. In one series of 8 chronic mimics, 4 of them functional, misdiagnosis lasted a mean of 9 years. [[Harrison2023]]`],
     ['normal|SFEMG',1,`The commonest alternative diagnosis (45%) in people first labelled double-seronegative MG, with longer delays and more psychiatric comorbidity. [[Maccora2025]]`]]}
];
const DDX_STEPS=[
 {from:0,at:.04,cols:[0,1],k:'Pattern',t:'Where the weakness is',
  txt:`In MG the eyes usually come first: asymmetric, fluctuating ptosis and binocular double vision, the lid drooping further on sustained upgaze. Ptosis was the first symptom in 74.9% and double vision in 47.4% of a Japanese AChR cohort. Eye-muscle weakness that is symmetric, slowly progressive and without much double vision points instead to CPEO or OPMD; proptosis and pain to thyroid eye disease; nystagmus to a central lesion. [[Juel2007,Yoshikawa2022,Keene2022]]`,
  pt:'In MG a drooping lid gets worse the longer the person looks up, and better after rest. A lid that droops the same all day, or eyes that barely move without causing double vision, suggest another cause.',
  hook:`Fluctuation is the hallmark of acquired synaptic disease such as MG; fixed, symmetric eye-muscle weakness without diplopia suggests a muscle disease. [[Keene2022]]`},
 {from:.16,at:.2,cols:[2],k:'Pupils',t:'MG spares the pupils',
  txt:`MG does not affect the pupils. [[Juel2007]] In confirmed botulism the pupils were dilated in 37% and abnormally reactive in 24%, and fixed pupils are one of the signs in the CDC early-recognition tool. [[Rao2021]] Horner syndrome and third nerve palsy, both listed MG differentials, can also involve the pupil. [[Habib2025]]`,
  pt:'MG weakens muscles that are moved on purpose. The pupil is run by a different system, so a large or sluggish pupil points away from MG.',
  hook:`Ptosis and diplopia with <b>dilated pupils</b>, a dry mouth and descending weakness in an alert, afebrile person: think botulism. [[Rao2021]]`},
 {from:.3,at:.34,cols:[3,4],k:'Reflexes and autonomic signs',t:'Clues that point elsewhere',
  txt:`Reflexes and sensation stay normal in MG. [[MSDManual2026]] Lambert-Eaton has a classic triad of proximal weakness, autonomic dysfunction and areflexia, and dry mouth was an early symptom in 97 patients. [[Kesner2018,Titulaer2008]] Miller Fisher syndrome combines ophthalmoplegia, ataxia and areflexia. [[Ito2008]] Dry mouth also occurred in 63% of botulism. [[Rao2021]]`,
  pt:'A tap below the knee normally makes the leg kick. In MG it still does. If the kick is weak or missing and the mouth is dry, the problem may be Lambert-Eaton or a nerve disorder.',
  hook:`LEMS triad: <b>proximal (leg) weakness, autonomic dysfunction, areflexia</b>. [[Kesner2018]]`},
 {from:.46,at:.5,cols:[6,7],k:'Sensation and course',t:'How it started, how it moves',
  txt:`MG is painless and spares sensory nerves. [[Juel2007,Estephan2022]] Botulism runs over days: median incubation 1 day, and 42% had respiratory involvement at admission. [[ChathamStephens2017]] CMS starts from birth to childhood. [[Finsterer2019]] Checkpoint-inhibitor MG begins a median 4 weeks after the first dose. [[Safa2019]] Frequent flares with normal tests suggest a functional disorder; static, treatment-refractory disease suggests another mimic. [[Harrison2023]]`,
  pt:'The story over time matters: weakness that comes and goes over the day, a paralysis spreading downward over a day or two, weakness since birth, or weakness that began soon after a new cancer drug each point somewhere different.',
  hook:`Botulism: afebrile, alert, acute, symmetric and <b>descending</b>, cranial nerves first. [[Rao2021]]`},
 {from:.6,at:.63,cols:[5],k:'Low-rate RNS, 2–5 Hz',t:'Decrement: a U-shaped fall',
  txt:`At 2–5 Hz a fall of 10% or more from the 1st to the 4th or 5th response supports MG. [[AAEM2001]] The drop is largest between the 1st and 2nd responses, bottoms out at the 4th–5th and then partly recovers: the U shape. [[Rousseff2021]] LEMS also shows low-rate decrement, but from a <b>low</b> first CMAP; in MG the first CMAP is normal. [[Oh2017]] ALS can show decrement too, without the U-shaped recovery, and none of 85 patients had facial decrement. [[Rousseff2021]]`,
  pt:'The nerve is stimulated a few times a second. In MG each muscle response is a bit smaller than the one before, then it levels off. In Lambert-Eaton the very first response is already small.',
  hook:`MG: normal CMAP + low-rate decrement. LEMS: <b>low</b> CMAP + low-rate decrement + high-rate or post-exercise <b>increment</b>. [[Oh2017]]`},
 {from:.76,at:.8,cols:[5],k:'After 10 s of exercise',t:'Increment: the Lambert-Eaton signature',
  txt:`After 10 s of maximal exercise (or 50 Hz stimulation) the LEMS response jumps. With a 60% increment limit, sensitivity was 97% and specificity versus MG 99%: an increment of 60% or more occurred in only 4 of 538 MG high-rate tests and in none after exercise. The older 100% limit confirmed 85% of 34 LEMS. [[Oh2005]] Short effort works best: increments were about 243–244% after 5–10 s and 84% after 30 s. [[Hatanaka2008]] In MG, brief exercise can transiently repair a decrement, followed by post-exercise exhaustion for 2–5 min. [[Rousseff2021]]`,
  pt:'In Lambert-Eaton the nerve releases too little acetylcholine at rest. A short burst of effort lets calcium build up inside the nerve ending, so more is released and the muscle response suddenly grows. In MG it barely changes.',
  hook:`Oh's criterion: an increment of <b>60% or more</b> (old limit 100%) after <b>10 seconds</b> of exercise. [[Oh2005,Hatanaka2008]]`},
 {from:.92,at:.95,cols:[8],k:'The key test',t:'One test for each look-alike',
  txt:`AChR antibodies for MG (about 85% of generalized, 50% of ocular). [[Rousseff2021]] P/Q-type VGCC antibodies for LEMS (91–100%). [[Lennon1995]] Anti-GQ1b for Miller Fisher (83%). [[Ito2008]] Orbital imaging for CPEO and thyroid eye disease. [[Keene2022]] Genetics for OPMD and CMS. [[Brais1998,Finsterer2019]] CK and heart tests in checkpoint-inhibitor MG. [[Safa2019]] Antibodies can mislead: low-titre VGCC antibodies occur in 23% of sporadic ALS, and AChR binding was falsely positive in 2 of 22. [[Lennon1995,Howard1987]]`,
  pt:'No single feature settles it. Clinicians put the pattern, a blood test and a nerve test together.',
  hook:`About half of people with LEMS have small-cell lung cancer, which the DELTA-P score was built to predict. [[Titulaer2011,Titulaer2011b]]`}
];
const DDX_FLAGS=[
 {l:'Dilated or sluggish pupils',ids:['bot','brain'],say:`Pupils are normal in MG. Dilated pupils occurred in 37% of botulism; Horner syndrome and third nerve palsy are listed differentials. [[Juel2007,Rao2021,Habib2025]]`},
 {l:'Ptosis that gets worse after a minute of looking up',fits:1,say:`Ptosis that increases on sustained upgaze shows levator fatigability, a sign of MG. [[Yoganathan2022,Juel2007]]`},
 {l:'Reflexes reduced or absent',ids:['lems','mfs'],say:`Reflexes are normal in MG; areflexia is part of the LEMS triad and of Miller Fisher syndrome. [[MSDManual2026,Kesner2018,Ito2008]]`},
 {l:'Weaker by evening, better after rest',fits:1,say:`MG weakness is generally worse later in the day and eases with rest. [[Juel2007,MSDManual2026]]`},
 {l:'Dry mouth or erectile dysfunction',ids:['lems','bot'],say:`Dry mouth was an early LEMS symptom and erectile dysfunction is a DELTA-P item; dry mouth also occurred in 63% of botulism. [[Titulaer2008,Titulaer2011b,Rao2021]]`},
 {l:'Muscle response jumps 60% or more after 10 s of exercise',ids:['lems'],say:`An increment of 60% or more occurred in no MG test after exercise, and a 60% limit had 97% sensitivity for LEMS. [[Oh2005]]`},
 {l:'An ice pack lifts the lid by 2 mm or more',fits:1,say:`Ptosis improving by about 2 mm or more with ice strongly suggests myasthenic lid weakness. [[Estephan2022]]`},
 {l:'Weakness spreading downward over a day or two, no fever',ids:['bot'],say:`Acute, symmetric, descending paralysis in an afebrile, alert person fits botulism. [[Rao2021,ChathamStephens2017]]`},
 {l:'Unsteady walking with eye paralysis after a gut infection',ids:['mfs'],say:`Ophthalmoplegia, ataxia and areflexia; antecedent C. jejuni in 21% of Miller Fisher syndrome. [[Ito2008]]`},
 {l:'Nystagmus',ids:['brain'],say:`Nystagmus points to a central nervous system lesion rather than MG. [[Keene2022]]`},
 {l:'Normal pupils, reflexes and sensation',fits:1,say:`This is the expected MG picture. [[Juel2007,MSDManual2026]]`},
 {l:'Eyes barely move, yet no double vision; never fluctuates',ids:['cpeo','opmd'],say:`Ophthalmoparesis without diplopia and without fluctuation suggests a hereditary muscle disease such as CPEO or OPMD. [[Keene2022]]`},
 {l:'Bulging, painful eyes',ids:['ted'],say:`Proptosis and pain with restricted eye movements suggest thyroid eye disease, which can also coexist with MG. [[Keene2022,Abumanhal2026]]`},
 {l:'Weak since infancy, family history, antibodies negative',ids:['cms'],say:`These are the published clues to a congenital myasthenic syndrome. [[Finsterer2019]]`},
 {l:'Started weeks after a checkpoint inhibitor, CK high',ids:['ici'],say:`Checkpoint-inhibitor MG began a median 4 weeks after the first dose, with CK raised in 84% and myositis or myocarditis often overlapping. [[Safa2019]]`},
 {l:'Upper motor neuron signs with bulbar weakness',ids:['als'],say:`Upper motor neuron signs point to ALS, which can also show decrement and abnormal jitter. [[Rousseff2021,Sanders2022]]`},
 {l:'Frequent flares but normal RNS and single-fibre EMG',ids:['fnd'],say:`Frequent flares with normal objective tests suggest a functional disorder. [[Harrison2023,Maccora2025]]`},
 {l:'Smoker over 50 with weight loss',ids:['lems'],say:`Age 50 or over, smoking and weight loss of 5% or more are DELTA-P items that predict small-cell lung cancer in LEMS. [[Titulaer2011b]]`}
];
const DDX_DELTA=['Age 50 or over','Smoking','Weight loss 5% or more','Bulbar involvement','Erectile dysfunction','Karnofsky score under 70'];
inits.ddx=()=>{
  const svg=$('#ddxSvg'),rg=$('#ddxT');
  let sel='lems',flags=new Set();
  const ROW=id=>DDX_ROWS.find(r=>r.id===id);
  const strip=s=>s.replace(/\s*\[\[[^\]]*\]\]/g,'');
  const FILL=['var(--nerve-soft)','var(--warn-soft)','var(--panel-2)'],INK=['var(--nerve)','var(--warn)','var(--ink)'];
  const T=(x,y,c,v,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  function wrap(str,n){const w=str.split(' ');const out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){if(l)out.push(l);l=x}else l=(l+' '+x).trim()});if(l)out.push(l);return out}
  const vtxt=c=>c[0].split('|').join(' ').replace('- ','');
  const hits=()=>{const h={};flags.forEach(i=>{const F=DDX_FLAGS[i];(F.ids||[]).forEach(id=>h[id]=(h[id]||0)+1)});return h};

  /* ---------- the bedside / nerve-test panel: one drawing per step, for MG and the chosen condition ---------- */
  const NOD=(B,y,msg)=>T(B.x+B.w/2,y,'t-xs t-mid',msg||'not described in the sources used here','fill:var(--muted)');
  function eyeDraw(cx,cy,w,pr,o){const h=w*.42;return `<g style="opacity:${o}"><path d="M${f1(cx-w/2)} ${f1(cy)}Q${f1(cx)} ${f1(cy-h)} ${f1(cx+w/2)} ${f1(cy)}Q${f1(cx)} ${f1(cy+h)} ${f1(cx-w/2)} ${f1(cy)}Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.5"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(h*.62)}" style="fill:var(--nerve)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(pr)}" style="fill:var(--ink)"/></g>`}
  function bed(B,R,st,u){const P=R.P,c=R.c;let s=RC(B.x,B.y,B.w,B.h,`fill:var(--panel);stroke:${R.id==='mg'?'var(--nerve)':'var(--line)'};stroke-width:${R.id==='mg'?1.6:1}`,10);
    s+=T(B.x+12,B.y+19,'t-lbl',R.n,R.id==='mg'?'fill:var(--nerve)':'');
    const cx=B.x+B.w/2,bot=B.y+B.h;
    if(st===0){/* sustained upgaze for 60 s */
      const sec=Math.round(u*60),dr=P.lid==='fat'?lerp(.12,.72,ease(clamp(u*1.05))):P.lid==='fixed'?.55:.08;
      s+=T(B.x+B.w-12,B.y+19,'t-xs t-end',`sustained upgaze · ${sec} s`);
      s+=eyelid(cx,B.y+B.h*.5,Math.min(124,B.w*.38),dr,P.lid?1:.3);
      if(!P.lid)s+=NOD(B,B.y+B.h*.5+52,P.lidMsg||'no cited ptosis data');
      else s+=T(cx,B.y+B.h*.5+52,'t-xs t-mid',P.lid==='fat'?(u<.15?'lid open at the start':'droops further as the levator tires'):P.lid==='fixed'?'droop does not depend on effort':'no ptosis drawn','fill:var(--ink)');
      s+=T(B.x+12,bot-28,'t-xs',`ptosis: ${c[0][1]<0?'—':vtxt(c[0])}`)+T(B.x+12,bot-13,'t-xs',`eye movements: ${c[1][1]<0?'—':vtxt(c[1])}`)}
    if(st===1){/* pupils and a pen-light */
      const on=u>.3&&u<.78,k=on?ease(ramp(u,.3,.42)):0,ey=B.y+B.h*.46,ew=Math.min(96,B.w*.27),lx=B.x+30;
      s+=T(B.x+B.w-12,B.y+19,'t-xs t-end',on?'light on':'light off');
      s+=`<circle cx="${lx}" cy="${f1(ey)}" r="8" style="fill:${on?'var(--ach)':'var(--panel-2)'};stroke:var(--muted)"/>`;
      if(on)for(let i=0;i<6;i++){const a=i/6*6.283;s+=LN(lx+Math.cos(a)*11,ey+Math.sin(a)*11,lx+Math.cos(a)*16,ey+Math.sin(a)*16,'stroke:var(--ach);stroke-width:1.6')}
      const pr=(kind,side)=>{const r0=ew*.42*.62;if(kind==='dilated')return lerp(r0*.82,r0*.74,k);if(kind==='unequal'&&side)return r0*.8;return lerp(r0*.5,r0*.22,k)};
      const kind=P.pup,o=kind?1:.3;
      s+=eyeDraw(cx-ew*.62,ey,ew,pr(kind||'normal',0),o)+eyeDraw(cx+ew*.62,ey,ew,pr(kind||'normal',1),o);
      s+=kind?T(cx,ey+ew*.42+20,'t-xs t-mid',kind==='normal'?'both pupils constrict to light':kind==='dilated'?'wide, slow to constrict':'one pupil differs from the other','fill:var(--ink)'):NOD(B,ey+ew*.42+20,'no cited pupil data');
      s+=T(B.x+12,bot-13,'t-xs',`pupils: ${c[2][1]<0?'—':vtxt(c[2])}`)}
    if(st===2){/* knee jerk and a dry-mouth sign */
      const kx=B.x+Math.min(118,B.w*.34),ky=B.y+66,L=58,amp={normal:1,low:.3,absent:0,umn:1.4}[P.refl],a0=(amp==null?0:amp)*bump(u,.32,.7)*38*Math.PI/180;
      const fx=kx+Math.sin(a0)*L,fy=ky+Math.cos(a0)*L;
      s+=T(B.x+B.w-12,B.y+19,'t-xs t-end','tendon tap');
      s+=`<g style="opacity:${P.refl?1:.3}">`+LN(B.x+22,ky-6,kx,ky,'stroke:var(--memb);stroke-width:12;stroke-linecap:round')+LN(kx,ky,fx,fy,'stroke:var(--memb);stroke-width:10;stroke-linecap:round')+LN(fx,fy,fx+16,fy-2,'stroke:var(--memb);stroke-width:8;stroke-linecap:round');
      const hp=u<.32?ease(ramp(u,0,.32)):1-ease(ramp(u,.32,.6)),hx=lerp(kx+44,kx+12,hp),hy=lerp(ky-6,ky+14,hp);
      s+=LN(hx,hy,hx+26,hy-24,'stroke:var(--muted);stroke-width:3;stroke-linecap:round')+RC(hx-6,hy-5,14,10,'fill:var(--drug)',3)+'</g>';
      s+=P.refl?T(kx-10,ky+L+26,'t-xs t-mid',{normal:'normal kick',low:'weak kick (reduced)',absent:'no kick (areflexia)',umn:'upper motor neuron signs'}[P.refl],'fill:var(--ink)'):T(kx-10,ky+L+26,'t-xs t-mid','no cited reflex data','fill:var(--muted)');
      const mx=B.x+B.w-Math.min(84,B.w*.24),my=B.y+86;
      s+=`<path d="M${mx} ${my-24} q14 18 14 28 a14 14 0 0 1 -28 0 q0 -10 14 -28z" style="fill:${P.auto==='dry'?'var(--panel)':'var(--nerve-soft)'};stroke:${P.auto==='dry'?'var(--warn)':'var(--nerve)'};stroke-width:1.6;opacity:${P.auto?1:.3}"/>`;
      if(P.auto==='dry')s+=LN(mx-18,my+18,mx+18,my-26,'stroke:var(--warn);stroke-width:2.2');
      s+=T(mx,my+38,'t-xs t-mid',P.auto==='dry'?'dry mouth':P.auto==='none'?'saliva normal':'no cited data',P.auto==='dry'?'fill:var(--warn);font-weight:700':'');
      s+=T(B.x+12,bot-28,'t-xs',`reflexes: ${c[3][1]<0?'—':vtxt(c[3])}`)+T(B.x+12,bot-13,'t-xs',`autonomic: ${c[4][1]<0?'—':vtxt(c[4])}`)}
    if(st===3){/* course over time, drawn as it unfolds */
      const X0=B.x+18,X1=B.x+B.w-18,Y0=B.y+40,Y1=B.y+B.h-58,k=P.course;
      const F={fluct:x=>{const d=(x*3)%1;return .2+.5*Math.pow(Math.sin(Math.PI*clamp((d-.05)/.8)),1.6)},
        acute:x=>x<.2?.04:.04+.86*ease(ramp(x,.2,.55)),slow:x=>.1+.62*x,birth:x=>.58+.08*Math.sin(x*18),
        drug:x=>x<.42?.05:.05+.8*ease(ramp(x,.42,.62)),flares:x=>.12+.68*Math.pow(Math.max(0,Math.sin(x*Math.PI*7)),10)}[k];
      const XL={fluct:'3 days: worse each evening',acute:'days',slow:'years',birth:'from birth',drug:'weeks',flares:'months'}[k];
      s+=T(B.x+B.w-12,B.y+19,'t-xs t-end','weakness over time · schematic');
      s+=LN(X0,Y1,X1,Y1,'stroke:var(--muted)')+LN(X0,Y0,X0,Y1,'stroke:var(--muted)');
      if(F){let d='';const n=90;for(let i=0;i<=n;i++){const x=i/n;if(x>u+.001)break;d+=(i?'L':'M')+f1(lerp(X0,X1,x))+' '+f1(lerp(Y1,Y0,F(x)))}
        if(d)s+=`<path d="${d}" style="fill:none;stroke:${R.id==='mg'?'var(--nerve)':'var(--ab)'};stroke-width:2.4;stroke-linejoin:round"/>`;
        if(k==='drug'){const xd=lerp(X0,X1,.42);s+=LN(xd,Y0,xd,Y1,'stroke:var(--drug);stroke-dasharray:3 3')+T(xd+4,Y0+10,'t-xs','drug started','fill:var(--drug)')}
        s+=T(X1,Y1+13,'t-xs t-end',XL)}
      else s+=NOD(B,(Y0+Y1)/2,'no cited time course');
      s+=T(X0,Y0-6,'t-xs','weakness ↑');
      s+=T(B.x+12,bot-28,'t-xs',`sensation: ${c[6][1]<0?'—':vtxt(c[6])}`)+T(B.x+12,bot-13,'t-xs',`course: ${c[7][1]<0?'—':vtxt(c[7])}`)}
    if(st===4||st===5){/* nerve test: one shared amplitude scale in both boxes */
      const Hs=Math.min(60,(B.h-100)/2),base=bot-48,spike=(x,h,o=1,col='var(--nerve)')=>`<path d="M${f1(x-2)} ${f1(base)}L${f1(x+3)} ${f1(base-h)}L${f1(x+8)} ${f1(base+Math.min(10,h*.25))}L${f1(x+13)} ${f1(base)}" style="fill:none;stroke:${col};stroke-width:2;stroke-linejoin:round;opacity:${o}"/>`;
      s+=LN(B.x+14,base,B.x+B.w-14,base,'stroke:var(--line)');
      if(P.base==null){s+=NOD(B,base-30,'no cited nerve-test pattern');s+=T(B.x+12,bot-10,'t-xs',`RNS: ${c[5][1]<0?'—':vtxt(c[5])}`);return s}
      if(st===4){s+=T(B.x+B.w-12,B.y+19,'t-xs t-end','3 Hz train · schematic');
        const X0=B.x+26,X1=B.x+B.w-50,n=10,h1=P.base*Hs;
        if(!P.lr){s+=spike(X0,h1,1,'var(--ab)')+T(X0+20,base-h1-4,'t-xs','first CMAP low')+T(cx,base-Hs-6,'t-xs t-mid','train not described in the sources used here');}
        else{let env='';for(let i=0;i<n;i++){const x=lerp(X0,X1,i/(n-1)),h=h1*P.lr[i],vis=u>=i/n*.9;if(vis){s+=spike(x,h,1,R.id==='mg'?'var(--nerve)':'var(--ab)');env+=(env?'L':'M')+f1(x+3)+' '+f1(base-h)}}
          if(env)s+=`<path d="${env}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/>`;
          const y90=base-h1*.9;s+=LN(X0-6,y90,X1+16,y90,'stroke:var(--warn);stroke-width:1;stroke-dasharray:4 3')+T(X1+18,y90+3,'t-xs','−10%','fill:var(--warn)');
          const shown=Math.min(n,Math.floor(u/.09)+1);
          if(shown>=4){const dec=Math.round((1-P.lr[3])*100);s+=T(B.x+12,B.y+38,'t-xs',`1st → 4th response: ${dec?'−'+dec+'% (drawn)':'no change'}`,'fill:var(--ink);font-weight:700')}
          if(P.base<.6)s+=T(X0+18,base-h1-6,'t-xs','low first CMAP','fill:var(--ab)')}
        s+=T(B.x+12,bot-10,'t-xs',P.rnsNote)}
      else{s+=T(B.x+B.w-12,B.y+19,'t-xs t-end','rest → 10 s effort → rest');
        const xa=B.x+34,xb=B.x+B.w-70,pre=P.base*Hs,ex=ramp(u,.08,.5),gr=ease(ramp(u,.5,.75));
        s+=spike(xa,pre,1,R.id==='mg'?'var(--nerve)':'var(--ab)')+T(xa+5,base+26,'t-xs t-mid','before');
        const bx=xa+28,bw=xb-xa-58;s+=RC(bx,base+6,bw,8,'fill:var(--panel-2)',4)+RC(bx,base+6,bw*ex,8,'fill:var(--drug)',4)+T(bx+bw/2,base+26,'t-xs t-mid',`${Math.round(ex*10)} s maximal exercise`);
        const tight=pre*.4<13;[[1.6,'+60%'],[2,'+100%']].forEach(([m,l],k)=>{const y=base-pre*m;s+=LN(xa-10,y,B.x+B.w-14,y,'stroke:var(--warn);stroke-width:1;stroke-dasharray:4 3')+T(B.x+B.w-16,tight?(k?y-4:y+11):y-3,'t-xs t-end',l,'fill:var(--warn)')});
        if(P.post!=null){const post=pre*lerp(1,P.post,gr);if(u>.5){s+=spike(xb,post,1,R.id==='mg'?'var(--nerve)':'var(--ab)');
            const dy=base-post-8;s+=`<circle cx="${f1(xb+3)}" cy="${f1(dy)}" r="4" style="fill:${P.postCited?'var(--ab)':'var(--panel)'};stroke:${R.id==='mg'?'var(--nerve)':'var(--ab)'};stroke-width:1.6"/>`;
            if(gr>.98){const inc=Math.round((P.post-1)*100);s+=T(xb-8,Math.max(B.y+34,dy-8),'t-xs t-end',`${inc>0?'+':''}${inc}%${P.postCited?'':' (drawn)'}`,'fill:var(--ink);font-weight:700')}}
          s+=T(xb+5,base+26,'t-xs t-mid','after')}
        else s+=T(B.x+B.w-14,base-12,'t-xs t-end',P.exAfter||'not described',P.exAfter?'fill:var(--ab)':'fill:var(--muted)');
        s+=T(B.x+12,bot-10,'t-xs',P.exNote||'exercise test not described in the sources used here')}}
    if(st===6){const o=ease(ramp(u,0,.4));s+=T(B.x+B.w-12,B.y+19,'t-xs t-end','the test that separates it');
      s+=`<g style="opacity:${f1(o)}">`+RC(B.x+16,B.y+40,B.w-32,B.h-70,'fill:var(--panel-2)',8)+T(cx,B.y+80,'t-big t-mid',P.key[0]);
      wrap(P.key[1],Math.floor((B.w-50)/6.6)).forEach((l,i)=>{s+=T(cx,B.y+104+i*16,'t-sm t-mid',l)});s+='</g>';
      s+=T(B.x+12,bot-13,'t-xs',`key test: ${vtxt(c[8])}`)}
    return s}

  function draw(t){
    const N=vb(svg,'720 644','400 866');
    const L=N?{X0:140,dx:11,Y0:64,RH:30,vx:236,bedY:446,A:{x:8,y:456,w:384,h:196},B:{x:8,y:662,w:384,h:196}}
             :{X0:152,X1:712,Y0:50,RH:28,bedY:404,A:{x:8,y:414,w:348,h:222},B:{x:364,y:414,w:348,h:222}};
    const ph=phaseOf(DDX_STEPS,t),S=DDX_STEPS[ph],nx=ph<DDX_STEPS.length-1?DDX_STEPS[ph+1].from:1,u=ramp(t,S.from,nx);
    const H=hits(),anyHit=Object.keys(H).length>0;let s='';
    const R=DDX_ROWS;
    if(!N){const CW=(L.X1-L.X0)/9,cxOf=j=>L.X0+CW*j;
      s+=T(8,14,'t-xs','CONDITIONS × FEATURES · THE HIGHLIGHTED COLUMN FOLLOWS THE TIMELINE');
      S.cols.forEach(j=>{s+=RC(cxOf(j)+1,20,CW-2,L.Y0-20+R.length*L.RH+4,'fill:var(--nerve-soft);opacity:.55',6)});
      DDX_COLS.forEach((C,j)=>{const on=S.cols.includes(j);C.h.forEach((h,k)=>{s+=T(cxOf(j)+CW/2,(C.h.length>1?30:36)+k*11,'t-xs t-mid',h,on?'fill:var(--ink);font-weight:700':'')})});
      R.forEach((r,i)=>{const y=L.Y0+i*L.RH,dim=anyHit&&!H[r.id]&&r.id!=='mg';let g='';
        if(r.id==='mg')g+=RC(2,y+1,716,L.RH-2,'fill:var(--nerve-soft);opacity:.45',6);
        if(anyHit&&H[r.id])g+=RC(2,y+1,716,L.RH-2,'fill:var(--warn-soft)',6);
        g+=T(8,y+12,'t-lbl',r.n,'font-size:12.5px')+T(8,y+23,'t-xs',r.sub);
        r.c.forEach((c,j)=>{const x=cxOf(j),f=c[1],lines=c[0].split('|');
          let cg=f>=0?RC(x+2,y+2,CW-4,L.RH-4,`fill:${FILL[f]};${f===1?'stroke:var(--warn);stroke-width:.8':''}`,5):'';
          lines.forEach((l,k)=>{cg+=T(x+CW/2,y+(lines.length>1?12+k*10:17),'t-xs t-mid',l.replace(/</g,'&lt;'),f>=0?`fill:${INK[f]};${f===1?'font-weight:700':''}`:'')});
          g+=`<g class="clk" data-dxr="${r.id}" data-dxc="${j}">${cg}<rect x="${f1(x)}" y="${y}" width="${f1(CW)}" height="${L.RH}" style="fill:transparent"/></g>`});
        if(r.id===sel)g+=RC(2,y+1,716,L.RH-2,'fill:none;stroke:var(--ink);stroke-width:1.8',6);
        s+=`<g style="opacity:${dim?.3:1}"><g class="clk" data-dxr="${r.id}"><rect x="0" y="${y}" width="${L.X0}" height="${L.RH}" style="fill:transparent"/></g>${g}</g>`});
      S.cols.forEach(j=>{s+=RC(cxOf(j)+1,20,CW-2,L.Y0-20+R.length*L.RH+4,'fill:none;stroke:var(--ink);stroke-width:1.4',6)})}
    else{const dxOf=j=>L.X0+j*L.dx;
      s+=T(6,14,'t-xs','CONDITIONS × 9 FEATURES · DOTS = THE WHOLE ROW');
      s+=T(6,34,'t-lbl',`Column: ${S.cols.map(j=>DDX_COLS[j].f).join(' + ')}`);
      DDX_COLS.forEach((C,j)=>{const on=S.cols.includes(j);if(on)s+=RC(dxOf(j)-5,44,10,L.Y0-44+R.length*L.RH,'fill:var(--nerve-soft)',4);s+=T(dxOf(j),54,'t-xs t-mid',j+1,on?'fill:var(--ink);font-weight:700':'')});
      R.forEach((r,i)=>{const y=L.Y0+i*L.RH,dim=anyHit&&!H[r.id]&&r.id!=='mg';let g='';
        if(r.id==='mg')g+=RC(2,y+1,396,L.RH-2,'fill:var(--nerve-soft);opacity:.45',6);
        if(anyHit&&H[r.id])g+=RC(2,y+1,396,L.RH-2,'fill:var(--warn-soft)',6);
        g+=T(6,y+19,'t-lbl',r.n,'font-size:12px');
        r.c.forEach((c,j)=>{const f=c[1];g+=`<circle cx="${dxOf(j)}" cy="${y+15}" r="4" style="fill:${f>=0?(f===1?'var(--warn)':f===0?'var(--nerve)':'var(--muted)'):'var(--panel)'};stroke:${f>=0?'none':'var(--line)'}"/>`});
        S.cols.forEach((j,k)=>{const c=r.c[j],f=c[1],txt=c[1]<0?'—':vtxt(c);g+=T(L.vx,y+(S.cols.length>1?12+k*11:19),'t-xs',(S.cols.length>1?DDX_COLS[j].s+': ':'')+txt.replace(/</g,'&lt;'),f>=0?`fill:${INK[f]};${f===1?'font-weight:700':''}`:'')});
        if(r.id===sel)g+=RC(2,y+1,396,L.RH-2,'fill:none;stroke:var(--ink);stroke-width:1.8',6);
        s+=`<g class="clk" data-dxr="${r.id}" style="opacity:${dim?.3:1}"><rect x="0" y="${y}" width="400" height="${L.RH}" style="fill:transparent"/>${g}</g>`})}
    /* the comparison panel */
    const ttl=['BEDSIDE · SUSTAINED UPGAZE','BEDSIDE · PUPILS AND LIGHT','BEDSIDE · KNEE JERK, DRY MOUTH','THE STORY · COURSE OVER TIME','NERVE TEST · 3 Hz RNS · SAME SCALE','NERVE TEST · 10 s EXERCISE · SAME SCALE','KEY TEST'][ph];
    s+=T(8,L.bedY,'t-xs',`${ttl} · MG vs ${ROW(sel).n.toUpperCase()}`,'fill:var(--ink);font-weight:700');
    s+=bed(L.A,ROW('mg'),ph,u)+bed(L.B,ROW(sel),ph,u);
    svg.innerHTML=s;
    setSt(ph);
    $('#ddxNote').innerHTML=noteHTML(S);
    $('#ddxRead').innerHTML=`<span>step <b>${ph+1} of ${DDX_STEPS.length}</b></span><span>column <b>${S.cols.map(j=>DDX_COLS[j].f).join(' + ')}</b></span><span>comparing <b>MG vs ${ROW(sel).n}</b></span>`;
    cell(S.cols);
  }
  function cell(cols){const r=ROW(sel),m=ROW('mg');
    $('#ddxCell').innerHTML=`<span class="kicker">In the highlighted column · cited</span>`+cols.map(j=>`<p><b>${DDX_COLS[j].f}.</b> <b>MG:</b> ${m.c[j][2]} <b>${r.n}:</b> ${r.c[j][2]}</p>`).join('')}
  function prof(focus){const r=ROW(sel);
    $('#ddxProf').innerHTML=`<div class="kicker">Profile · compared with MG</div><h4>${r.full}</h4><dl class="kv">${r.c.map((c,j)=>`<div class="f${c[1]<0?'n':c[1]}${focus===j?' on':''}"><dt>${DDX_COLS[j].f}${c[1]===1?' · points away':c[1]===0?' · like MG':c[1]===2?' · overlaps':''}</dt><dd>${c[1]<0?'<span style="color:var(--muted)">— </span>':''}${c[2]}</dd></div>`).join('')}</dl>`;
    $$('[data-dxp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dxp===sel));
    $$('#ddxTbl tr').forEach(tr=>tr.style.outline=tr.dataset.dxr===sel?'2px solid var(--ink)':'')}
  function pick(id,col){sel=id;prof(col);
    if(col!=null){const k=DDX_STEPS.findIndex(S=>S.cols.includes(+col));if(k>=0){stop();rg.value=DDX_STEPS[k].at;}}
    draw(+rg.value)}
  /* condition picker: every row except the MG reference */
  $('#ddxPick').innerHTML=DDX_ROWS.filter(r=>r.id!=='mg').map(r=>`<button class="btn" data-dxp="${r.id}" aria-pressed="${r.id===sel}">${r.n}</button>`).join('');
  $('#ddxPick').addEventListener('click',e=>{const b=e.target.closest('[data-dxp]');if(b)pick(b.dataset.dxp)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dxr]');if(!g)return;const id=g.dataset.dxr;if(id==='mg'&&g.dataset.dxc==null)return;pick(id==='mg'?sel:id,g.dataset.dxc)});
  /* the table */
  $('#ddxTbl').innerHTML=DDX_ROWS.filter(r=>r.id!=='mg').map(r=>{const away=r.c.map((c,j)=>c[1]===1?`<b>${DDX_COLS[j].f}:</b> ${vtxt(c)}`:'').filter(Boolean).join('; ');
    return `<tr data-dxr="${r.id}"><th>${r.full}</th><td>${r.sub}</td><td>${away}</td><td>${r.c[8][2]}</td></tr>`}).join('');
  $('#ddxTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const tr=e.target.closest('tr[data-dxr]');if(tr){pick(tr.dataset.dxr);svg.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  /* red-flag checklist */
  function flagOut(){const o=$('#ddxFlagOut');
    if(!flags.size){o.innerHTML=`<span class="kicker">Nothing selected</span><span>Choose findings above. Each one says whether it fits MG or points elsewhere, with its source.</span>`;return}
    const H=hits(),ranked=Object.keys(H).sort((a,b)=>H[b]-H[a]),fits=[...flags].filter(i=>DDX_FLAGS[i].fits).length,away=flags.size-fits;
    const last=DDX_FLAGS[[...flags].pop()];
    o.innerHTML=`<span class="kicker">${fits} fit${fits===1?'s':''} MG · ${away} point${away===1?'s':''} away</span>`+
      (ranked.length?`<b class="big">Points toward: ${ranked.map(id=>ROW(id).n+(H[id]>1?` (${H[id]})`:'')).join(' · ')}</b>`:`<b class="big">Everything chosen fits MG</b>`)+
      `<span><b>Last finding:</b> ${last.say}</span>`+(ranked.length?'':`<span>Fitting the picture does not prove MG: antibodies and nerve tests still decide. [[Rousseff2021]]</span>`)}
  $('#ddxFlags').innerHTML=DDX_FLAGS.map((F,i)=>`<button class="btn ${F.fits?'fits':'away'}" data-dxf="${i}" aria-pressed="false">${F.l}<small hidden>${F.fits?'fits MG':'points away: '+F.ids.map(id=>ROW(id).n).join(', ')}</small></button>`).join('');
  $('#ddxFlags').addEventListener('click',e=>{const b=e.target.closest('[data-dxf]');if(!b)return;const i=+b.dataset.dxf;if(flags.has(i))flags.delete(i);else flags.add(i);
    const on=flags.has(i);b.setAttribute('aria-pressed',on);b.querySelector('small').hidden=!on;flagOut();draw(+rg.value)});
  /* DELTA-P */
  const dsel=new Set();
  function deltaOut(){const n=dsel.size,o=$('#ddxDeltaOut');
    const risk=n<=1?'0–2.6%':n===4?'93.5%':n===5?'96.6%':n===6?'100%':null;
    o.innerHTML=`<span class="kicker">DELTA-P score</span><b class="big">${n} of 6 · ${risk?'small-cell lung cancer in '+risk+' of people with this score in the study':'the abstract used here gives no figure for scores of 2 or 3'}</b><span>Published scores: 0–1 points, 0–2.6%; 4 points, 93.5%; 5 points, 96.6%; 6 points, 100%. Area under the curve 94.4–94.6%. [[Titulaer2011b]]</span>`}
  $('#ddxDelta').innerHTML=DDX_DELTA.map((l,i)=>`<button class="btn" data-dxd="${i}" aria-pressed="false">${l}</button>`).join('');
  $('#ddxDelta').addEventListener('click',e=>{const b=e.target.closest('[data-dxd]');if(!b)return;const i=+b.dataset.dxd;dsel.has(i)?dsel.delete(i):dsel.add(i);b.setAttribute('aria-pressed',dsel.has(i));deltaOut()});
  const stop=playWire(rg,$('#ddxPlay'),draw,24000,'Replay','ddx');
  const setSt=stepWire($('#ddxSteps'),DDX_STEPS,rg,draw,stop);
  prof();flagOut();deltaOut();draw(+rg.value);
};
