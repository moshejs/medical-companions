/* bipolar-disorder: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='bip:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What bipolar disorder is',g:1,n:'1.1',d:'Who it affects, how common it is, and the words we use'},
 {id:'episodes',t:'Mania, hypomania & depression',g:1,n:'1.2',d:'The mood episodes on a life chart, and mixed states'},
 {id:'genes',t:'Genes & family risk',g:1,n:'1.3',d:'Twin and family studies, GWAS, and risk not destiny'},
 {id:'brain',t:'Brain, sleep & the body clock',g:1,n:'1.4',d:'Circadian rhythm, sleep loss and brain networks'},
 {id:'criteria',t:'DSM-5-TR criteria',g:2,n:'2.1',d:'Manic, hypomanic and depressive episodes: a teaching counter'},
 {id:'types',t:'Bipolar I, II, cyclothymia & specifiers',g:2,n:'2.2',d:'Which episodes make which diagnosis, and rapid cycling'},
 {id:'screening',t:'Screening & rating scales',g:2,n:'2.3',d:'MDQ, HCL-32 and YMRS, and what a screen can and cannot do'},
 {id:'differential',t:'Bipolar or something else?',g:2,n:'2.4',d:'Unipolar depression, BPD, ADHD, substances, medical causes'},
 {id:'lithium',t:'Lithium: how it works and the evidence',g:3,n:'3.1',d:'Proposed mechanisms, relapse prevention and suicide data'},
 {id:'levels',t:'Lithium levels, toxicity & interactions',g:3,n:'3.2',d:'Serum levels, the kidney, interactions and monitoring'},
 {id:'stabilisers',t:'Valproate, lamotrigine & carbamazepine',g:3,n:'3.3',d:'What each is used for, warnings, and pregnancy'},
 {id:'antipsychotics',t:'Antipsychotics in bipolar disorder',g:3,n:'3.4',d:'Mania, bipolar depression, side effects and monitoring'},
 {id:'depression',t:'Treating bipolar depression',g:3,n:'3.5',d:'Antidepressants and switching, guideline ladders, ECT'},
 {id:'therapy',t:'Psychoeducation & talking therapies',g:4,n:'4.1',d:'Psychoeducation, family therapy, IPSRT and CBT'},
 {id:'crisis',t:'Suicide risk & crisis safety',g:4,n:'4.2',d:'When risk is higher, safety plans and getting help'},
 {id:'pregnancy',t:'Pregnancy & the postpartum period',g:4,n:'4.3',d:'Relapse risk, medicines and planning with the care team'},
 {id:'course',t:'Course, relapse & comorbidity',g:5,n:'5.1',d:'Recurrence, recovery and the conditions that come along'},
 {id:'living',t:'Living well: sleep, routine & mood charting',g:5,n:'5.2',d:'Early warning signs, routines and your own mood chart'},
 {id:'families',t:'Families, work & school',g:5,n:'5.3',d:'Family-focused therapy, carers, school and work'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.4',d:'Acute mania care, lithium teaching and monitoring'},
 {id:'frontier',t:'Research toward better treatment',g:5,n:'5.5',d:'New targets and trials, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From folie circulaire and Kraepelin to Cade’s lithium and GWAS'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 5 and 6 use the pine brand; 2 plum-indigo (--dx), 3 teal (--rx), 4 warm clay (--accent) */
const GROUPS={1:['Understanding bipolar disorder','g-und','c-und'],2:['Diagnosis','g-dx','c-dx'],3:['Medicines','g-rx','c-rx'],4:['Therapy, safety & pregnancy','g-care','c-care'],5:['Course & living','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
