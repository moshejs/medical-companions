/* colorectal-cancer: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='crc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What colorectal cancer is',g:1,n:'1.1',d:'Who gets it, the numbers, the rise under 50, where in the bowel'},
 {id:'colon',t:'The colon & its lining',g:1,n:'1.2',d:'Crypts, stem cells and a lining that renews itself every few days'},
 {id:'sequence',t:'From polyp to cancer',g:1,n:'1.3',d:'The adenoma–carcinoma sequence, the serrated pathway, CIN and MSI'},
 {id:'risk',t:'Risk factors & prevention',g:1,n:'1.4',d:'Age, family, IBD, meat, alcohol, weight, activity and aspirin'},
 {id:'genes',t:'Lynch syndrome & FAP',g:1,n:'1.5',d:'Inherited colorectal cancer, mismatch repair and a pedigree'},
 {id:'screening',t:'Screening tests compared',g:2,n:'2.1',d:'FIT, stool DNA, colonoscopy, CT colonography and blood tests'},
 {id:'colonoscopy',t:'Colonoscopy, animated',g:2,n:'2.2',d:'Prep, the scope’s path, removing a polyp, quality measures'},
 {id:'schedule',t:'When to start, how often',g:2,n:'2.3',d:'Start age, intervals and surveillance after polyps: a calculator'},
 {id:'symptoms',t:'Symptoms & red flags',g:3,n:'3.1',d:'Bleeding, anaemia, bowel changes and the path to diagnosis'},
 {id:'staging',t:'Staging: TNM calculator',g:3,n:'3.2',d:'How deep, how many nodes, how far: stage and survival'},
 {id:'biomarkers',t:'Tumour biomarkers',g:3,n:'3.3',d:'MMR/MSI, RAS, BRAF, HER2 and sidedness, and what each changes'},
 {id:'surgery',t:'Surgery',g:4,n:'4.1',d:'Colectomy, total mesorectal excision, lymph nodes and stomas'},
 {id:'chemo',t:'Chemotherapy after surgery',g:4,n:'4.2',d:'FOLFOX and CAPOX, 3 or 6 months, and who benefits'},
 {id:'rectal',t:'Rectal cancer pathway',g:4,n:'4.3',d:'Total neoadjuvant therapy, watch-and-wait, dMMR rectal cancer'},
 {id:'metastatic',t:'Metastatic disease',g:4,n:'4.4',d:'Liver and lung spread, targeted drugs, immunotherapy, surgery'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.5',d:'ctDNA, blood tests, vaccines, new drugs, with evidence labels'},
 {id:'living',t:'Living with colorectal cancer',g:5,n:'5.1',d:'Stoma, bowel function, neuropathy, exercise and follow-up'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.2',d:'Prep teaching, stoma care, chemotherapy safety and monitoring'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Dukes to Vogelstein, FIT and immunotherapy'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Screening','g-screen','c-screen'],3:['Diagnosis & staging','g-dx','c-dx'],4:['Treatment','g-rx','c-rx'],5:['Living with CRC','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
