/* multiple-sclerosis: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='msc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What MS is',g:1,n:'1.1',d:'Who gets it, the numbers, where in the nervous system it strikes'},
 {id:'myelin',t:'Myelin & demyelination',g:1,n:'1.2',d:'Saltatory conduction, a lesion forming, repair and axon loss'},
 {id:'immune',t:'The immune attack',g:1,n:'1.3',d:'T cells, B cells and the blood-brain barrier, step by step'},
 {id:'risk',t:'Genes & risk factors',g:1,n:'1.4',d:'HLA-DRB1*15:01, Epstein-Barr virus, vitamin D, smoking'},
 {id:'course',t:'Relapse & remission over time',g:2,n:'2.1',d:'RRMS, SPMS and PPMS on one timeline; PIRA and smouldering MS'},
 {id:'relapse',t:'A relapse, week by week',g:2,n:'2.2',d:'Onset, steroids, recovery; relapse versus pseudo-relapse'},
 {id:'edss',t:'Measuring disability: EDSS',g:2,n:'2.3',d:'The 0–10 scale and what confirmed worsening means'},
 {id:'dx',t:'McDonald criteria calculator',g:3,n:'3.1',d:'Place lesions, add CSF, see the 2017 and 2024 verdicts'},
 {id:'ddx',t:'The differential',g:3,n:'3.2',d:'NMOSD, MOGAD, small-vessel disease and other mimics'},
 {id:'dmt',t:'How the drugs work',g:4,n:'4.1',d:'Where each disease-modifying therapy hits the attack'},
 {id:'ladder',t:'The DMT ladder',g:4,n:'4.2',d:'Escalation or early high-efficacy, stepping up, stopping later'},
 {id:'safety',t:'Safety & monitoring',g:4,n:'4.3',d:'PML and the JCV index, infections, vaccines, rebound'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.4',d:'Remyelination, BTK inhibitors, stem cells, EBV, with evidence labels'},
 {id:'symptoms',t:'Symptoms & rehabilitation',g:5,n:'5.1',d:'Fatigue, spasticity, bladder, walking, mood, cognition'},
 {id:'living',t:'Living with MS',g:5,n:'5.2',d:'Pregnancy, work, heat, exercise, vaccines, planning'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Assessment, giving the medicines, monitoring, teaching'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'Carswell and Charcot to EBV and the 2024 criteria'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['The course','g-course','c-course'],3:['Diagnosis','g-dx','c-dx'],4:['Treatment','g-rx','c-rx'],5:['Living with MS','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
