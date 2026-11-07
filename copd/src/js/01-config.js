/* COPD: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='copdc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What COPD is',g:1,n:'1.1',d:'Emphysema and chronic bronchitis, how common COPD is and why so much of it goes undiagnosed'},
 {id:'causes',t:'Causes & risk factors',g:1,n:'1.2',d:'Tobacco smoke, wood and coal smoke, work dusts, air pollution, genes and how the lungs grew'},
 {id:'lungs',t:'Inside the lungs',g:1,n:'1.3',d:'Small airways, mucus, inflammation and the alveolar walls that emphysema destroys'},
 {id:'breathless',t:'Air trapping & breathlessness',g:1,n:'1.4',d:'Why air gets stuck, hyperinflation, low oxygen and the strain on the heart'},
 {id:'aatd',t:'Alpha-1 antitrypsin deficiency',g:1,n:'1.5',d:'The inherited form: SERPINA1, the Z allele, testing and augmentation therapy'},
 {id:'spirometry',t:'Spirometry & the FEV1/FVC ratio',g:2,n:'2.1',d:'How the blow test works, the 0.7 ratio, the lower limit of normal and GOLD grades 1 to 4'},
 {id:'assessment',t:'Symptoms, exacerbations & GOLD groups',g:2,n:'2.2',d:'The mMRC and CAT scores, exacerbation history, groups A, B and E, and blood eosinophils'},
 {id:'lookalikes',t:'Asthma, look-alikes & imaging',g:2,n:'2.3',d:'COPD versus asthma, bronchiectasis and heart failure, CT scans, PRISm and pre-COPD'},
 {id:'inhalers',t:'Bronchodilators',g:3,n:'3.1',d:'SABA, LAMA and LABA: how each opens the airways and what the trials found'},
 {id:'escalation',t:'Inhaled steroids, triple therapy & beyond',g:3,n:'3.2',d:'Eosinophils, ICS and pneumonia, IMPACT and ETHOS, roflumilast, azithromycin and biologics'},
 {id:'technique',t:'Inhaler devices & technique',g:3,n:'3.3',d:'Pressurised, dry-powder and soft-mist inhalers, spacers, inspiratory flow and common errors'},
 {id:'quitting',t:'Stopping smoking & vaccines',g:3,n:'3.4',d:'What quitting does to lung-function decline, the medicines that help, and the vaccines in guidance'},
 {id:'rehab',t:'Pulmonary rehabilitation',g:3,n:'3.5',d:'Exercise training and education: what it changes, who it is for and after a flare-up'},
 {id:'oxygen',t:'Long-term oxygen & home ventilation',g:3,n:'3.6',d:'NOTT, MRC and LOTT, who oxygen helps, and non-invasive ventilation at home'},
 {id:'flareups',t:'Flare-ups (exacerbations)',g:4,n:'4.1',d:'What an exacerbation is, its triggers, the Rome severity scale and why each one matters'},
 {id:'hospital',t:'Hospital treatment',g:4,n:'4.2',d:'Steroids, antibiotics, controlled oxygen, non-invasive ventilation and going home'},
 {id:'bloodgas',t:'Oxygen targets & blood gases',g:4,n:'4.3',d:'Hypercapnia, why 88 to 92% matters, and reading an arterial blood gas'},
 {id:'advanced',t:'Lung volume reduction, transplant & palliative care',g:5,n:'5.1',d:'Surgery and valves for emphysema, transplant, and care for breathlessness'},
 {id:'living',t:'Living with COPD',g:5,n:'5.2',d:'Action plans, breathing techniques, activity, travel and flying, work, sex and carers'},
 {id:'comorbid',t:'Heart, mood, bones & other conditions',g:5,n:'5.3',d:'Heart disease, anxiety and depression, osteoporosis, lung cancer, muscles and sleep'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.4',d:'Assessment, oxygen and NEWS2 scale 2, inhaler teaching, NIV care and discharge'},
 {id:'frontier',t:'Research frontier',g:5,n:'5.5',d:'New biologics, early COPD, lung repair and alpha-1 therapies, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Laennec and the spirometer to Fletcher and Peto, alpha-1, oxygen trials and GOLD'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1 and 6 use the slate brand; 2 oxygen teal (--dx), 3 inhaler violet (--rx), 4 ember red (--fl), 5 moss green (--rec) */
const GROUPS={1:['Understanding COPD','g-und','c-und'],2:['Diagnosis & assessment','g-dx','c-dx'],3:['Treatment','g-rx','c-rx'],4:['Flare-ups & hospital','g-fl','c-fl'],5:['Living & care','g-rec','c-rec'],6:['Context & review','g-ix','c-ix']};
