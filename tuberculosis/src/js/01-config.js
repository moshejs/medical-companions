/* tuberculosis: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='tbc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What TB is',g:1,n:'1.1',d:'Infection vs disease, the global numbers, who is affected'},
 {id:'bacillus',t:'The TB bacterium',g:1,n:'1.2',d:'A slow-growing, acid-fast rod with a waxy wall'},
 {id:'spread',t:'How TB spreads',g:1,n:'1.3',d:'Droplet nuclei, shared air, ventilation and who is infectious'},
 {id:'granuloma',t:'Infection to granuloma',g:1,n:'1.4',d:'Macrophages, T cells and the granuloma, step by step'},
 {id:'spectrum',t:'TB infection vs TB disease',g:1,n:'1.5',d:'From cleared to contained to disease, and how often'},
 {id:'risk',t:'Who is at risk',g:1,n:'1.6',d:'HIV, diabetes, undernutrition, smoking, age and more'},
 {id:'symptoms',t:'Symptoms & where TB strikes',g:2,n:'2.1',d:'Cough, fever, night sweats, weight loss, and TB outside the lungs'},
 {id:'tests',t:'TB infection tests: TST & IGRA',g:2,n:'2.2',d:'Skin test, blood test, the 5-10-15 mm rule and BCG'},
 {id:'diagnose',t:'Diagnosing TB disease',g:2,n:'2.3',d:'Smear, Xpert, culture, chest X-ray and urine LAM'},
 {id:'resistance',t:'Drug resistance',g:2,n:'2.4',d:'How resistance arises, MDR to XDR, and how it is detected'},
 {id:'drugs',t:'How TB drugs work',g:3,n:'3.1',d:'Why four drugs, which bacteria each kills, and their targets'},
 {id:'regimen',t:'Treating TB disease',g:3,n:'3.2',d:'The 6-month regimen, 4-month options and what cure looks like'},
 {id:'tpt',t:'Treating TB infection',g:3,n:'3.3',d:'3HP, 1HP, 3HR, 4R and isoniazid: preventive treatment compared'},
 {id:'drtb',t:'Treating drug-resistant TB',g:3,n:'3.4',d:'BPaLM, BPaL and the end of 2-year injectable regimens'},
 {id:'safety',t:'Side effects & monitoring',g:3,n:'3.5',d:'Liver, nerves, eyes, orange fluids and drug interactions'},
 {id:'special',t:'TB with HIV, in children & pregnancy',g:3,n:'3.6',d:'ART timing, IRIS, young children and pregnancy'},
 {id:'bcg',t:'BCG & new vaccines',g:4,n:'4.1',d:'What BCG protects against, and the M72 vaccine trial'},
 {id:'control',t:'Infection control & contacts',g:4,n:'4.2',d:'Isolation, masks, ventilation and contact tracing'},
 {id:'frontier',t:'Ending TB: targets & research',g:4,n:'4.3',d:'End TB targets, new drugs, tests and vaccines, with evidence labels'},
 {id:'living',t:'Living with TB',g:5,n:'5.1',d:'Treatment support, stigma, costs, work, family and life after TB'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.2',d:'Isolation, sputum collection, DOT, monitoring and teaching'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From consumption and Koch to streptomycin, BCG and BPaLM'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The infection','g-dz','c-dz'],2:['Diagnosis','g-dx','c-dx'],3:['Treatment','g-rx','c-rx'],4:['Prevention & control','g-pv','c-pv'],5:['Living with TB','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
