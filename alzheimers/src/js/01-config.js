/* alzheimers: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='adc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What Alzheimer\'s is',g:1,n:'1.1',d:'Dementia versus Alzheimer\'s, who it affects, the numbers'},
 {id:'brain',t:'The brain that forgets',g:1,n:'1.2',d:'Where it starts and how it spreads, stage by stage'},
 {id:'amyloid',t:'Amyloid, animated',g:1,n:'1.3',d:'From one protein cut to a plaque, and the debate about it'},
 {id:'tau',t:'Tau and the tangle',g:1,n:'1.4',d:'How a scaffold protein turns into a tangle and spreads'},
 {id:'glia',t:'Microglia and the lost synapse',g:1,n:'1.5',d:'Inflammation, pruning, and the strongest link to memory loss'},
 {id:'genes',t:'Genes and inheritance',g:1,n:'1.6',d:'APOE, the dominant families, Down syndrome, and what a test means'},
 {id:'cascade',t:'Twenty years before symptoms',g:2,n:'2.1',d:'The biomarker cascade, in order'},
 {id:'stages',t:'Stages and symptoms',g:2,n:'2.2',d:'From no symptoms to severe dementia, function by function'},
 {id:'dx',t:'Diagnosis and biomarkers',g:2,n:'2.3',d:'Criteria, scans, spinal fluid, blood tests and screening tools'},
 {id:'ddx',t:'The differential',g:2,n:'2.4',d:'Delirium, vascular, Lewy body, frontotemporal and reversible causes'},
 {id:'synapse',t:'Cholinesterase inhibitors and memantine',g:3,n:'3.1',d:'Inside the synapse, and what the benefit really is'},
 {id:'antibody',t:'Anti-amyloid antibodies over time',g:3,n:'3.2',d:'Lecanemab and donanemab over 18 months, ARIA and the debate'},
 {id:'bpsd',t:'Beyond memory',g:3,n:'3.3',d:'Agitation, mood, psychosis and sleep, and the drug cautions'},
 {id:'prevent',t:'Lowering the risk',g:4,n:'4.1',d:'The 14 modifiable risk factors and what trials show'},
 {id:'living',t:'Living with dementia and caregiving',g:4,n:'4.2',d:'Planning, safety, caregivers and the end of life'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.3',d:'Assessment, giving the medicines, communication, documentation'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.4',d:'The pipeline, prevention trials, and the evidence for each route'},
 {id:'history',t:'History and people',g:5,n:'5.1',d:'From Auguste Deter in 1901 to the antibodies'},
 {id:'review',t:'Flashcards and mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Course and diagnosis','g-dz','c-dz'],3:['Treatment','g-tx','c-tx'],4:['Living, caring, preventing','g-sage','c-sage'],5:['Context and review','g-sage','c-sage']};
