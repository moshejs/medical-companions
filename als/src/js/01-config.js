/* als: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='alsc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What ALS is',g:1,n:'1.1',d:'Who gets it, the numbers, the ways it starts'},
 {id:'neurons',t:'Upper and lower motor neurons',g:1,n:'1.2',d:'Two neurons, two sets of signs, animated'},
 {id:'tdp43',t:'TDP-43 and what goes wrong',g:1,n:'1.3',d:'A protein leaves the nucleus and clumps'},
 {id:'genes',t:'Genes: C9orf72, SOD1 and more',g:1,n:'1.4',d:'Familial ALS, repeat expansions, testing'},
 {id:'dx',t:'Diagnosis & criteria',g:2,n:'2.1',d:'Gold Coast, revised El Escorial and Awaji, as a calculator'},
 {id:'ddx',t:'The differential: ALS mimics',g:2,n:'2.2',d:'Conditions that can look like ALS, and how they differ'},
 {id:'course',t:'ALSFRS-R and the course',g:2,n:'2.3',d:'Scoring the 12 items, the progression rate, the stages'},
 {id:'drugs',t:'Riluzole, edaravone and others',g:3,n:'3.1',d:'What each drug targets and what the trials found'},
 {id:'tofersen',t:'Tofersen, gene-targeted',g:3,n:'3.2',d:'An antisense drug for SOD1-ALS, molecule to months'},
 {id:'breathing',t:'Breathing and NIV',g:3,n:'3.3',d:'Weak breathing muscles, the tests, when ventilation is offered'},
 {id:'nutrition',t:'Swallowing and feeding tubes',g:3,n:'3.4',d:'Why weight matters and when a gastrostomy is discussed'},
 {id:'living',t:'Living with ALS',g:4,n:'4.1',d:'Communication, cognition, symptoms, planning, end of life'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.2',d:'Assessment, giving the medicines, teaching, documentation'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.3',d:'Every route, with the evidence for each'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'From Charcot to tofersen'},
 {id:'review',t:'Flashcards & mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Diagnosis & course','g-st','c-st'],3:['Treatment & care','g-tx','c-tx'],4:['Living & the future','g-st','c-st'],5:['Context & review','g-st','c-st']};
