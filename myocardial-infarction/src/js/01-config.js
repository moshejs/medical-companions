/* myocardial-infarction: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='mi:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What a heart attack is',g:1,n:'1.1',d:'How common heart attacks are, STEMI and NSTEMI, and the five types'},
 {id:'plaque',t:'Plaque, rupture & clot',g:1,n:'1.2',d:'From fatty streak to ruptured plaque and the clot that blocks an artery'},
 {id:'ischaemia',t:'Ischaemia: time is muscle',g:1,n:'1.3',d:'How heart muscle dies hour by hour, and what reopening the artery saves'},
 {id:'risk',t:'Risk factors & prevention',g:1,n:'1.4',d:'INTERHEART, LDL, smoking, blood pressure, diabetes and family history'},
 {id:'symptoms',t:'Symptoms & who presents differently',g:2,n:'2.1',d:'Chest pain and other symptoms in women, men, older people and diabetes'},
 {id:'ecg',t:'The ECG: STEMI, NSTEMI & territories',g:2,n:'2.2',d:'ST elevation, Q waves and which artery each lead watches'},
 {id:'troponin',t:'Troponin & rapid rule-out',g:2,n:'2.3',d:'How troponin rises and falls, and the 0/1-hour algorithm'},
 {id:'scores',t:'Risk scores: HEART, TIMI & GRACE',g:2,n:'2.4',d:'What each score adds up and what it predicts: teaching calculators'},
 {id:'differential',t:'Chest pain: heart attack or something else?',g:2,n:'2.5',d:'Aortic dissection, pulmonary embolism, pericarditis, Takotsubo and SCAD'},
 {id:'call',t:'The first minutes: calling for help, CPR & defibrillators',g:3,n:'3.1',d:'Why to call at once, the chain of survival, CPR and AEDs'},
 {id:'reperfusion',t:'Reperfusion: PCI & clot-busting drugs',g:3,n:'3.2',d:'Primary PCI and fibrinolysis, and the clock targets'},
 {id:'antithrombotic',t:'Antiplatelets & anticoagulants',g:3,n:'3.3',d:'Aspirin, P2Y12 inhibitors, heparin, and the bleeding balance'},
 {id:'complications',t:'Complications & cardiogenic shock',g:3,n:'3.4',d:'Arrhythmias, heart failure, ruptures and shock, and the trials'},
 {id:'secondary',t:'Medicines after a heart attack',g:4,n:'4.1',d:'Antiplatelets, statins, beta-blockers, ACE inhibitors and more'},
 {id:'lipids',t:'Lowering LDL cholesterol',g:4,n:'4.2',d:'Statins, ezetimibe, PCSK9 inhibitors and LDL targets'},
 {id:'cabg',t:'Stents or bypass? Revascularisation choices',g:4,n:'4.3',d:'PCI or CABG for multivessel and left main disease'},
 {id:'rehab',t:'Cardiac rehabilitation',g:5,n:'5.1',d:'Exercise, education and support, and who misses out'},
 {id:'living',t:'Living after a heart attack',g:5,n:'5.2',d:'Going home, driving, work, sex, travel and emotions'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'From the ECG in 10 minutes to discharge teaching'},
 {id:'frontier',t:'Research toward better treatment',g:5,n:'5.4',d:'Inflammation, Lp(a), cardioprotection and more, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Heberden and Herrick to stents and troponin'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 3 and 6 use the red brand; 2 ink navy (--dx), 4 teal (--rx), 5 green (--rec) */
const GROUPS={1:['Understanding heart attack','g-und','c-und'],2:['Diagnosis','g-dx','c-dx'],3:['Emergency treatment','g-er','c-er'],4:['Medicines & revascularisation','g-rx','c-rx'],5:['Recovery & living','g-rec','c-rec'],6:['Context & review','g-ix','c-ix']};
