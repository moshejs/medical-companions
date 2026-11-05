/* sepsis-and-shock: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='sep:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What sepsis is',g:1,n:'1.1',d:'What sepsis and septic shock are, and how common they are worldwide'},
 {id:'immune',t:'Infection to dysregulated host response',g:1,n:'1.2',d:'PAMPs, cytokines, neutrophils, and why the response turns harmful'},
 {id:'endothelium',t:'Vessels, clotting & failing organs',g:1,n:'1.3',d:'Leaky vessels, microclots, DIC and organ dysfunction'},
 {id:'shock',t:'Shock and haemodynamics',g:1,n:'1.4',d:'Blood pressure, cardiac output, MAP and the four shock types'},
 {id:'risk',t:'Who is at risk',g:2,n:'2.1',d:'Babies, older people, chronic illness, weakened immunity'},
 {id:'recognise',t:'Recognising sepsis',g:2,n:'2.2',d:'Warning signs, NEWS2 and escalation: teaching tools'},
 {id:'definitions',t:'Definitions & scores: SIRS to Sepsis-3',g:3,n:'3.1',d:'SIRS, Sepsis-3, qSOFA and SOFA: teaching calculators'},
 {id:'tests',t:'Lactate, cultures, procalcitonin & tests',g:3,n:'3.2',d:'Lactate, blood cultures, procalcitonin and other tests'},
 {id:'firsthour',t:'The first hour: bundle & antibiotics',g:4,n:'4.1',d:'The hour-1 bundle, time to antibiotics and the trials'},
 {id:'fluids',t:'Fluids',g:4,n:'4.2',d:'Crystalloids, albumin, fluid responsiveness and the trials'},
 {id:'pressors',t:'Vasopressors & steroids',g:4,n:'4.3',d:'Noradrenaline, vasopressin, MAP targets and steroids'},
 {id:'source',t:'Source control & antimicrobial stewardship',g:4,n:'4.4',d:'Draining the source, the right antibiotic, shorter courses'},
 {id:'icu',t:'Organ support in intensive care',g:4,n:'4.5',d:'Ventilation, kidney support, sedation and other ICU care'},
 {id:'othershock',t:'Cardiogenic, hypovolaemic, obstructive & anaphylactic shock',g:5,n:'5.1',d:'Cardiogenic, hypovolaemic, obstructive and anaphylactic shock'},
 {id:'children',t:'Sepsis in babies and children',g:5,n:'5.2',d:'Newborns and children: signs, Phoenix criteria, fluids'},
 {id:'maternal',t:'Sepsis in pregnancy and after birth',g:5,n:'5.3',d:'Pregnancy and after birth: sources, warning signs, burden'},
 {id:'after',t:'After sepsis: recovery & families',g:5,n:'5.4',d:'Post-sepsis syndrome, recovery and support for families'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.5',d:'Spotting deterioration, escalation, bundles and monitoring'},
 {id:'prevention',t:'Preventing sepsis',g:5,n:'5.6',d:'Hand hygiene, vaccines, infection control, knowing the signs'},
 {id:'frontier',t:'Research frontier',g:5,n:'5.7',d:'Endotypes, precision immunotherapy and new trials, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Semmelweis and penicillin to Sepsis-3'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1 and 6 use the chocolate brand; 2 ember (--accent), 3 slate blue (--dx), 4 deep teal (--rx), 5 moss (--rec) */
const GROUPS={1:['Understanding sepsis & shock','g-und','c-und'],2:['Who is at risk & recognising it','g-acc','c-acc'],3:['Definitions & tests','g-dx','c-dx'],4:['Treatment','g-rx','c-rx'],5:['Special situations & recovery','g-rec','c-rec'],6:['Context & review','g-ix','c-ix']};
