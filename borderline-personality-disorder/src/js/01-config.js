/* borderline-personality-disorder: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='bpd:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What BPD is',g:1,n:'1.1',d:'Who it affects, how common it is, and the language we use'},
 {id:'emotion',t:'The emotion wave',g:1,n:'1.2',d:'Sensitivity, intensity and a slow return to baseline'},
 {id:'causes',t:'Causes & the biosocial model',g:1,n:'1.3',d:'Temperament, adversity, invalidation and how they interact'},
 {id:'genes',t:'Genes & families',g:1,n:'1.4',d:'Twin studies, heritability and what runs in families'},
 {id:'brain',t:'Brain & stress systems',g:1,n:'1.5',d:'Amygdala, prefrontal control, stress hormones, mentalizing'},
 {id:'criteria',t:'DSM-5-TR criteria',g:2,n:'2.1',d:'The nine criteria, five needed: a teaching counter'},
 {id:'icd',t:'ICD-11 & dimensional models',g:2,n:'2.2',d:'Severity first, the borderline pattern, and the AMPD'},
 {id:'assess',t:'Assessment & interviews',g:2,n:'2.3',d:'Screening questionnaires, structured interviews, disclosure'},
 {id:'differential',t:'BPD or something else?',g:2,n:'2.4',d:'Bipolar disorder, complex PTSD, ADHD, depression'},
 {id:'dbt',t:'Dialectical behaviour therapy',g:3,n:'3.1',d:'The four skills modules, the hierarchy and the trials'},
 {id:'mbt',t:'Mentalization-based treatment',g:3,n:'3.2',d:'Thinking about minds under stress, and the evidence'},
 {id:'schema',t:'Schema therapy & TFP',g:3,n:'3.3',d:'Modes, schemas and transference-focused psychotherapy'},
 {id:'gpm',t:'Good psychiatric management',g:3,n:'3.4',d:'A generalist approach and stepped care'},
 {id:'compare',t:'Therapies compared',g:3,n:'3.5',d:'What the meta-analyses show, side by side'},
 {id:'meds',t:'Medication: the evidence',g:4,n:'4.1',d:'No approved drug for BPD itself; what trials show'},
 {id:'crisis',t:'Suicide & self-harm safety',g:4,n:'4.2',d:'Risk, safety planning, crisis care and help-seeking'},
 {id:'frontier',t:'Research toward better care',g:4,n:'4.3',d:'New targets and trials, with evidence labels'},
 {id:'course',t:'Course & recovery',g:5,n:'5.1',d:'Remission is common; recovery takes longer'},
 {id:'families',t:'Families & carers',g:5,n:'5.2',d:'Validation, family programmes and carer wellbeing'},
 {id:'living',t:'Living with BPD',g:5,n:'5.3',d:'Relationships, work, study, parenting and stigma'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.4',d:'Therapeutic relationship, crisis care and boundaries'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Stern’s “border line” to DBT and recovery research'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['Understanding BPD','g-mind','c-mind'],2:['Diagnosis','g-dx','c-dx'],3:['Psychotherapies','g-rx','c-rx'],4:['Medication, safety & research','g-safe','c-safe'],5:['Course & living','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
