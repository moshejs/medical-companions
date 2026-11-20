/* fmf: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='fmfc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What FMF is',g:1,n:'1.1',d:'Who gets it, the numbers, what an attack looks like'},
 {id:'gene',t:'The gene & inheritance',g:1,n:'1.2',d:'MEFV, pyrin, variants, an animated Punnett square'},
 {id:'mech',t:'Pyrin, animated',g:1,n:'1.3',d:'The RhoA guard, the inflammasome, normal vs M694V'},
 {id:'attack',t:'An attack, hour by hour',g:1,n:'1.4',d:'72 hours of fever, CRP and SAA, site by site'},
 {id:'colin',t:'Colchicine inside the cell',g:2,n:'2.1',d:'From pill to neutrophil to microtubule to pyrin'},
 {id:'colmonths',t:'Colchicine over months',g:2,n:'2.2',d:'Why the benefit builds slowly, and what it prevents'},
 {id:'coldose',t:'Dosing, safety, interactions',g:2,n:'2.3',d:'What the guidelines say, toxicity and monitoring'},
 {id:'amyloid',t:'AA amyloidosis',g:3,n:'3.1',d:'SAA to fibril to kidney, over years'},
 {id:'dx',t:'Diagnosis & criteria',g:3,n:'3.2',d:'Tel Hashomer, Livneh, Eurofever/PRINTO calculator'},
 {id:'ddx',t:'The differential',g:3,n:'3.3',d:'TRAPS, MKD, CAPS, PFAPA, Behçet and the surgical abdomen'},
 {id:'ladder',t:'The treatment ladder',g:4,n:'4.1',d:'Colchicine first, then IL-1 blockade (CLUSTER)'},
 {id:'living',t:'Living with FMF',g:4,n:'4.2',d:'Pregnancy, surgery, school, triggers, monitoring'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.3',d:'Assessment, giving the medicines, teaching, documentation'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.4',d:'What would have to happen, and the evidence for each route'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'1908 to the pyrin–RhoA discovery'},
 {id:'review',t:'Flashcards & mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Colchicine','g-colch','c-colch'],3:['Complications & diagnosis','g-dz','c-dz'],4:['Treatment & the future','g-sea','c-sea'],5:['Context & review','g-sea','c-sea']};
