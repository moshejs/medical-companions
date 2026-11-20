/* guillain-barre-syndrome: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='gbsc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What GBS is',g:1,n:'1.1',d:'Weakness that climbs, how common it is, and why most people recover'},
 {id:'triggers',t:'Triggers',g:1,n:'1.2',d:'Campylobacter, CMV, EBV, Zika, SARS-CoV-2 and the infection a few weeks before'},
 {id:'mimicry',t:'Molecular mimicry',g:1,n:'1.3',d:'How a gut bacterium\'s sugar coat turns antibodies against nerve gangliosides'},
 {id:'subtypes',t:'Subtypes: AIDP & AMAN',g:1,n:'1.4',d:'Myelin or axon: the variants, how they damage nerve and where each is common'},
 {id:'mfs',t:'Miller Fisher & other variants',g:1,n:'1.5',d:'Eyes, balance and reflexes: anti-GQ1b, Bickerstaff and the regional variants'},
 {id:'course',t:'The course over time',g:1,n:'1.6',d:'Onset, nadir within four weeks, plateau and the long recovery'},
 {id:'signs',t:'Signs & red flags',g:2,n:'2.1',d:'The usual picture, pain and sensory symptoms, and what suggests another diagnosis'},
 {id:'criteria',t:'Diagnostic criteria',g:2,n:'2.2',d:'Brighton levels of certainty and the NINDS criteria, as a teaching tool'},
 {id:'csf',t:'Lumbar puncture & CSF',g:2,n:'2.3',d:'Albuminocytologic dissociation, why it can be normal early, and antibodies'},
 {id:'ncs',t:'Nerve conduction studies',g:2,n:'2.4',d:'Slowing, block and small responses: what the tests show and when'},
 {id:'ddx',t:'Look-alikes',g:2,n:'2.5',d:'Spinal cord disease, myasthenia, botulism, CIDP and other mimics compared'},
 {id:'breathing',t:'Breathing & the 20/30/40 rule',g:3,n:'3.1',d:'Why breathing fails, vital capacity, EGRIS and when ventilation is considered'},
 {id:'ivig',t:'IVIg',g:3,n:'3.2',d:'How immunoglobulin may work, the trials, the published regimen and its risks'},
 {id:'plex',t:'Plasma exchange',g:3,n:'3.3',d:'Removing antibodies from blood: trials, sessions, timing and comparing with IVIg'},
 {id:'whatnot',t:'Steroids, repeats & relapses',g:3,n:'3.4',d:'What failed, the second IVIg dose, treatment-related fluctuations and A-CIDP'},
 {id:'autonomic',t:'Autonomic storms',g:3,n:'3.5',d:'Swinging blood pressure, heart rhythm, bowel and bladder problems'},
 {id:'icu',t:'Intensive care & pain',g:3,n:'3.6',d:'Ventilation, tracheostomy, clots, pressure areas, communication and pain'},
 {id:'prognosis',t:'Prognosis: EGOS & mEGOS',g:4,n:'4.1',d:'Who walks again and when: the published scores as teaching calculators'},
 {id:'rehab',t:'Rehabilitation & recovery',g:4,n:'4.2',d:'Regrowing nerve, exercise, equipment and the recovery curve over years'},
 {id:'after',t:'Life after GBS',g:4,n:'4.3',d:'Fatigue, pain, mood, work, family and recurrence'},
 {id:'children',t:'Children & pregnancy',g:5,n:'5.1',d:'How GBS differs in children and what is reported in pregnancy'},
 {id:'vaccines',t:'Vaccines & GBS',g:5,n:'5.2',d:'1976 swine flu, COVID-19 and RSV vaccines: absolute risks and revaccination'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Neuro and respiratory observations, swallow, skin, bowels, teaching and hope'},
 {id:'frontier',t:'Research frontier',g:5,n:'5.4',d:'Complement inhibitors, IgG-cleaving enzymes and trials, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Guillain, Barré and Strohl in 1916 to the IGOS cohort'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['Understanding GBS','g-und','c-und'],2:['Diagnosis','g-dx','c-dx'],3:['Acute care','g-rx','c-rx'],4:['Recovery','g-rec','c-rec'],5:['Special situations & care','g-care','c-care'],6:['Context & review','g-ix','c-ix']};
