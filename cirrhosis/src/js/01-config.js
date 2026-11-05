/* cirrhosis: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='cir:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What cirrhosis is',g:1,n:'1.1',d:'How common it is, who it affects, and the words we use'},
 {id:'liver',t:'The liver and what it does',g:1,n:'1.2',d:'The lobule, its blood supply, and the liver\'s many jobs'},
 {id:'fibrosis',t:'From injury to scar',g:1,n:'1.3',d:'Stellate cells, collagen, nodules, and whether scar can regress'},
 {id:'alcohol',t:'Alcohol-related liver disease',g:2,n:'2.1',d:'From fatty liver to hepatitis and cirrhosis, and what stopping does'},
 {id:'masld',t:'Fatty liver disease (MASLD & MASH)',g:2,n:'2.2',d:'MASLD, MASH and MetALD: fat, metabolism and fibrosis'},
 {id:'hepatitis',t:'Viral hepatitis B & C',g:2,n:'2.3',d:'Hepatitis B and C: progression, antivirals and cure'},
 {id:'othercauses',t:'Other causes: genes, immunity & bile ducts',g:2,n:'2.4',d:'Haemochromatosis, Wilson, alpha-1, autoimmune and bile-duct diseases'},
 {id:'tests',t:'Blood tests, scans & biopsy',g:3,n:'3.1',d:'Liver blood tests, ultrasound and biopsy, read as patterns'},
 {id:'noninvasive',t:'Measuring scarring without a biopsy',g:3,n:'3.2',d:'FIB-4 and elastography: a teaching calculator'},
 {id:'scores',t:'Child–Pugh & MELD scores',g:3,n:'3.3',d:'Child–Pugh, MELD, MELD-Na and MELD 3.0: teaching calculators'},
 {id:'portal',t:'Portal hypertension & varices',g:4,n:'4.1',d:'Portal pressure, varices, bleeding and their treatment'},
 {id:'ascites',t:'Ascites, infection & kidney injury',g:4,n:'4.2',d:'Fluid in the belly, SBP, hyponatraemia and hepatorenal syndrome'},
 {id:'encephalopathy',t:'Hepatic encephalopathy',g:4,n:'4.3',d:'Ammonia, confusion, West Haven grades, lactulose and rifaximin'},
 {id:'hcc',t:'Liver cancer surveillance',g:4,n:'4.4',d:'Liver cancer risk and six-monthly surveillance'},
 {id:'course',t:'Compensated to decompensated: the course',g:4,n:'4.5',d:'Compensated, decompensated, ACLF and recompensation'},
 {id:'transplant',t:'Liver transplant',g:5,n:'5.1',d:'Referral, MELD and the waiting list, surgery and life after'},
 {id:'nutrition',t:'Nutrition, muscle & medicine safety',g:5,n:'5.2',d:'Protein, the late evening snack, sarcopenia and safer medicines'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Assessments, paracentesis care, bleeding and confusion watch'},
 {id:'living',t:'Living with cirrhosis',g:5,n:'5.4',d:'Daily life, red flags, work, family and palliative care'},
 {id:'frontier',t:'Research toward better treatment',g:5,n:'5.5',d:'Antifibrotics, MASH drugs, statins, machine perfusion: evidence-labelled'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Laennec to MELD, transplant and hepatitis C cure'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards and memory aids by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1 and 6 use the petrol brand; 2 causes liver red-brown (--liver), 3 plum (--dx), 4 bile gold (--accent), 5 green (--rx) */
const GROUPS={1:['Understanding cirrhosis','g-und','c-und'],2:['Causes','g-cause','c-cause'],3:['Diagnosis & staging','g-dx','c-dx'],4:['Complications','g-comp','c-comp'],5:['Treatment & living','g-rx','c-rx'],6:['Context & review','g-ix','c-ix']};
