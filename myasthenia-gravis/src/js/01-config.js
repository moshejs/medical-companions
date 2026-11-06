/* myasthenia-gravis: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='mgc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What myasthenia gravis is',g:1,n:'1.1',d:'Who gets it, the numbers, the muscles it reaches'},
 {id:'nmj',t:'The neuromuscular junction',g:1,n:'1.2',d:'One nerve impulse in slow motion, and the safety factor'},
 {id:'antibodies',t:'Antibodies at the junction',g:1,n:'1.3',d:'AChR, complement, MuSK and LRP4, animated'},
 {id:'fatigue',t:'Weakness over a day',g:1,n:'1.4',d:'Why muscles tire with use and recover with rest'},
 {id:'dx',t:'Diagnosis',g:2,n:'2.1',d:'Antibodies, nerve tests, single-fibre EMG, a calculator'},
 {id:'classes',t:'MGFA class & scores',g:2,n:'2.2',d:'MGFA classes I to V, MG-ADL and QMG, scored live'},
 {id:'ddx',t:'The differential',g:2,n:'2.3',d:'Lambert-Eaton, botulism, ALS, eye and muscle disease'},
 {id:'pyrido',t:'Pyridostigmine, animated',g:3,n:'3.1',d:'Buying time at the receptor, dose by dose'},
 {id:'ladder',t:'The treatment ladder',g:3,n:'3.2',d:'From symptom relief to immunotherapy and biologics'},
 {id:'thymectomy',t:'Thymectomy over the years',g:3,n:'3.3',d:'The thymus, thymoma and the MGTX trial'},
 {id:'biologics',t:'Complement & FcRn inhibitors',g:3,n:'3.4',d:'The newer biologics, trial week by trial week'},
 {id:'crisis',t:'Myasthenic crisis',g:4,n:'4.1',d:'Triggers, the breathing numbers, ICU care'},
 {id:'drugs',t:'Drugs that can worsen MG',g:4,n:'4.2',d:'A cited checker: antibiotics, magnesium and more'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.3',d:'Assessment, timing the doses, teaching, documentation'},
 {id:'living',t:'Living with MG',g:4,n:'4.4',d:'Pregnancy, surgery, exercise, vaccines, work'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.5',d:'CAR-T, B-cell targets and the evidence for each route'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'From Willis in 1672 to the biologics'},
 {id:'review',t:'Flashcards & mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Diagnosis','g-nv','c-nv'],3:['Treatment','g-tx','c-tx'],4:['Crisis, care & the future','g-dz','c-dz'],5:['Context & review','g-nv','c-nv']};
