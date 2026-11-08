/* stroke: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='strkc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What a stroke is',g:1,n:'1.1',d:'Blocked or burst, how common stroke is, and what it leaves behind'},
 {id:'vessels',t:'The brain\'s blood supply',g:1,n:'1.2',d:'The circle of Willis, arterial territories and which deficit goes with which artery'},
 {id:'cascade',t:'Core, penumbra & time',g:1,n:'1.3',d:'Blood-flow thresholds, the ischaemic cascade and how fast tissue is lost'},
 {id:'causes',t:'Causes of ischaemic stroke',g:1,n:'1.4',d:'Heart, large arteries, small vessels, TOAST subtypes and stroke in the young'},
 {id:'bleeds',t:'Bleeding strokes',g:1,n:'1.5',d:'Intracerebral and subarachnoid haemorrhage: causes, growth, thunderclap headache'},
 {id:'tia',t:'TIA: the warning stroke',g:1,n:'1.6',d:'The tissue definition, the ABCD2 score and early risk'},
 {id:'signs',t:'Recognising stroke',g:2,n:'2.1',d:'FAST and BE-FAST, prehospital scales, mimics, chameleons and missed strokes'},
 {id:'imaging',t:'Imaging & the first hour',g:2,n:'2.2',d:'CT, ASPECTS, CTA, perfusion, MRI mismatch and door-to-needle time'},
 {id:'nihss',t:'The NIH Stroke Scale',g:2,n:'2.3',d:'All the items and scores, severity bands, limits, and the modified Rankin Scale'},
 {id:'lysis',t:'Clot-dissolving treatment',g:3,n:'3.1',d:'Alteplase and tenecteplase: benefit by time, bleeding risk and eligibility'},
 {id:'evt',t:'Thrombectomy',g:3,n:'3.2',d:'Pulling the clot out: HERMES, late windows, large core and basilar trials'},
 {id:'ich',t:'Treating intracerebral haemorrhage',g:3,n:'3.3',d:'The ICH score, blood pressure, reversal, surgery and care bundles'},
 {id:'sah',t:'Treating subarachnoid haemorrhage',g:3,n:'3.4',d:'Securing the aneurysm, nimodipine, and the danger days from rebleeding to DCI'},
 {id:'unit',t:'The stroke unit',g:3,n:'3.5',d:'Why stroke units work, FeSS care, complications and decompressive craniectomy'},
 {id:'prevent',t:'Risk factors & prevention',g:4,n:'4.1',d:'INTERSTROKE, blood pressure, lipids, diabetes and lifestyle'},
 {id:'af',t:'AF & antithrombotics',g:4,n:'4.2',d:'CHA2DS2-VASc, anticoagulants and their timing, dual antiplatelets after minor stroke'},
 {id:'carotid',t:'Carotid disease & PFO',g:4,n:'4.3',d:'Measuring stenosis, surgery or stenting, and when closing a PFO helps'},
 {id:'rehab',t:'Rehabilitation & recovery',g:5,n:'5.1',d:'How the brain recovers, the recovery curve, the arm, walking, speech and swallowing'},
 {id:'after',t:'Life after stroke',g:5,n:'5.2',d:'Mood, fatigue, cognition, work, driving, relationships and carers'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Neuro observations, swallow screening, monitoring after lysis, and teaching'},
 {id:'frontier',t:'Research frontier',g:5,n:'5.4',d:'Factor XI inhibitors, neuroprotection and recovery devices, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From apoplexy to the 2015 thrombectomy trials'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1 and 6 use the navy brand; 2 violet-blue (--dx), 3 ember (--rx), 4 ochre (--prev), 5 green (--rec) */
const GROUPS={1:['Understanding stroke','g-und','c-und'],2:['Recognition & assessment','g-dx','c-dx'],3:['Acute treatment','g-rx','c-rx'],4:['Preventing another stroke','g-prev','c-prev'],5:['Recovery & care','g-rec','c-rec'],6:['Context & review','g-ix','c-ix']};
