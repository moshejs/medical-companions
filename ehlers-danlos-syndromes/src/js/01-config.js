/* ehlers-danlos-syndromes: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='eds:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What EDS is',g:1,n:'1.1',d:'Thirteen types, how common they are, and the zebra'},
 {id:'collagen',t:'Collagen, gene to fibril',g:1,n:'1.2',d:'How a collagen chain becomes a fibre, and where each type breaks it'},
 {id:'types',t:'The 13 types (2017)',g:1,n:'1.3',d:'The 2017 classification: genes, inheritance and hallmark features'},
 {id:'genes',t:'Inheritance & genetic testing',g:1,n:'1.4',d:'Dominant and recessive types, family trees, and when a test helps'},
 {id:'beighton',t:'Beighton score',g:2,n:'2.1',d:'The nine-point hypermobility score, step by step'},
 {id:'criteria',t:'The 2017 hEDS criteria',g:2,n:'2.2',d:'Criteria 1, 2 and 3 as a teaching checklist'},
 {id:'hsd',t:'hEDS or HSD?',g:2,n:'2.3',d:'Hypermobility spectrum disorders and how they differ from hEDS'},
 {id:'differential',t:'Look-alikes & red flags',g:2,n:'2.4',d:'Marfan, Loeys-Dietz and other conditions to tell apart'},
 {id:'joints',t:'Joints & dislocations',g:3,n:'3.1',d:'Lax ligaments, unstable joints, subluxations and proprioception'},
 {id:'pain',t:'Pain & fatigue',g:3,n:'3.2',d:'Why pain is so common, how it changes, and fatigue'},
 {id:'skin',t:'Skin, scars & bruising',g:3,n:'3.3',d:'Stretchy, fragile skin and classical EDS'},
 {id:'autonomic',t:'POTS & the autonomic link',g:3,n:'3.4',d:'Dizziness on standing, heart rate and what the evidence shows'},
 {id:'gut',t:'Gut, bladder & MCAS',g:3,n:'3.5',d:'Gastrointestinal, pelvic and mast-cell associations, evidence-labelled'},
 {id:'vascular',t:'Vascular EDS',g:3,n:'3.6',d:'Arteries, bowel and uterus: the risks, the signs and the plan'},
 {id:'physio',t:'Exercise & physiotherapy',g:4,n:'4.1',d:'Strength, control and pacing: what the evidence supports'},
 {id:'meds',t:'Medicines',g:4,n:'4.2',d:'Pain, POTS and vascular EDS: what is used and how strong the evidence is'},
 {id:'surgery',t:'Surgery & anaesthesia',g:4,n:'4.3',d:'Fragile tissue, local anaesthetics and safer procedures'},
 {id:'frontier',t:'Toward better treatment',g:4,n:'4.4',d:'The hEDS gene search, criteria revision and vEDS trials'},
 {id:'living',t:'Living with EDS',g:5,n:'5.1',d:'School, work, sport, mental health and support'},
 {id:'pregnancy',t:'Pregnancy & parenthood',g:5,n:'5.2',d:'Planning, pregnancy and birth by type, and passing EDS on'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Handling, skin, BP cuffs, dislocations and vEDS emergencies'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Ehlers and Danlos to the 2017 classification'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The syndromes','g-bio','c-bio'],2:['Diagnosis','g-dx','c-dx'],3:['Body systems','g-sys','c-sys'],4:['Treatment','g-rx','c-rx'],5:['Living with EDS','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
