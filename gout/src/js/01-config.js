/* gout: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='goutc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What gout is',g:1,n:'1.1',d:'Who gets it, the numbers, the four stages'},
 {id:'urate',t:'Where urate comes from',g:1,n:'1.2',d:'Purines, xanthine oxidase, the kidney and the gut'},
 {id:'crystals',t:'Crystals vs serum urate',g:1,n:'1.3',d:'Saturation, temperature and years of deposition'},
 {id:'flare',t:'A flare, hour by hour',g:1,n:'1.4',d:'Crystal → NLRP3 → IL-1β → neutrophils, then resolution'},
 {id:'colin',t:'Colchicine inside the cell',g:2,n:'2.1',d:'From pill to neutrophil to microtubule to NLRP3'},
 {id:'flarerx',t:'Treating a flare',g:2,n:'2.2',d:'Colchicine, NSAIDs, steroids, IL-1 blockers, ice'},
 {id:'coldose',t:'Colchicine dosing & safety',g:2,n:'2.3',d:'Published doses, the kidneys, interactions, toxicity'},
 {id:'ult',t:'How urate-lowering drugs work',g:3,n:'3.1',d:'Make less, excrete more, or break it down'},
 {id:'t2t',t:'Treat to target',g:3,n:'3.2',d:'Start low, go slow, reach < 6 mg/dL, cover the first months'},
 {id:'ultsafety',t:'Safety of urate-lowering drugs',g:3,n:'3.3',d:'HLA-B*58:01, CARES vs FAST, interactions'},
 {id:'dx',t:'Diagnosis & the ACR/EULAR score',g:4,n:'4.1',d:'Crystals under polarised light, imaging, the 2015 calculator'},
 {id:'ddx',t:'The differential',g:4,n:'4.2',d:'CPPD, septic arthritis, cellulitis and other hot joints'},
 {id:'links',t:'Gout, kidneys & heart',g:4,n:'4.3',d:'CKD, stones, blood pressure and cardiovascular risk'},
 {id:'living',t:'Living with gout',g:5,n:'5.1',d:'Diet, alcohol, weight, other medicines, a flare plan'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.2',d:'Assessment, giving the medicines, teaching, documentation'},
 {id:'cure',t:'Toward a cure',g:5,n:'5.3',d:'Dissolving crystals for good, and the pipeline'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'Podagra to polarised light to allopurinol'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Treating a flare','g-colch','c-colch'],3:['Lowering urate','g-sea','c-sea'],4:['Diagnosis & complications','g-dz','c-dz'],5:['Living, care & the future','g-sea','c-sea'],6:['Context & review','g-sea','c-sea']};
