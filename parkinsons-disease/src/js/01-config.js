/* parkinsons-disease: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='pdc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What Parkinson\'s is',g:1,n:'1.1',d:'Parkinsonism versus Parkinson\'s disease, who it affects, the numbers'},
 {id:'circuit',t:'The dopamine pathway',g:1,n:'1.2',d:'Substantia nigra to striatum, the go and brake loops, and what losing dopamine does'},
 {id:'synuclein',t:'Alpha-synuclein and Lewy bodies',g:1,n:'1.3',d:'From a small synaptic protein to a Lewy body, and how it may spread'},
 {id:'braak',t:'How it spreads: Braak stages',g:1,n:'1.4',d:'Six stages from the brainstem to the cortex, and the body-first debate'},
 {id:'genes',t:'Genes and inheritance',g:1,n:'1.5',d:'LRRK2, GBA1, SNCA and parkin, founder populations, and what a test means'},
 {id:'prodrome',t:'Before the tremor',g:2,n:'2.1',d:'Dream enactment, smell, constipation and the prodromal criteria'},
 {id:'stages',t:'Stages and symptoms',g:2,n:'2.2',d:'Hoehn and Yahr, motor and non-motor symptoms, and how fast it moves'},
 {id:'dx',t:'Diagnosis and the MDS criteria',g:2,n:'2.3',d:'The clinical criteria as a calculator, DaT scans and synuclein tests'},
 {id:'ddx',t:'The differential',g:2,n:'2.4',d:'Essential tremor, drug-induced parkinsonism, MSA, PSP and Lewy body dementia'},
 {id:'levodopa',t:'Levodopa and carbidopa',g:3,n:'3.1',d:'From the pill to the striatum, step by step'},
 {id:'wearing',t:'Levodopa over time',g:3,n:'3.2',d:'Wearing-off, dyskinesia, the narrowing window and what smooths it'},
 {id:'drugs',t:'The other medicines',g:3,n:'3.3',d:'Agonists, MAO-B and COMT inhibitors, amantadine and the order of use'},
 {id:'dbs',t:'Deep-brain stimulation',g:3,n:'3.4',d:'Targets, the stimulation field, the beta rhythm and what the trials found'},
 {id:'nonmotor',t:'Beyond movement',g:3,n:'3.5',d:'Mood, hallucinations, dementia, sleep and blood pressure'},
 {id:'risk',t:'Risk and protection',g:4,n:'4.1',d:'Pesticides, solvents, head injury, smoking, coffee and exercise'},
 {id:'living',t:'Living with Parkinson\'s',g:4,n:'4.2',d:'Exercise, therapy, falls, speech, work, caregiving and the end of life'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.3',d:'Medicines on time, drugs to avoid, swallowing, assessment, documentation'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.4',d:'Synuclein antibodies, GLP-1 drugs, LRRK2 and GBA1, cells and genes'},
 {id:'history',t:'History and people',g:5,n:'5.1',d:'From James Parkinson\'s 1817 essay to the synuclein test'},
 {id:'review',t:'Flashcards and mnemonics',g:5,n:'5.2',d:'Flip cards by topic'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Course and diagnosis','g-dz','c-dz'],3:['Treatment','g-tx','c-tx'],4:['Living, caring, preventing','g-sage','c-sage'],5:['Context and review','g-sage','c-sage']};
