/* autism: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='aut:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What autism is',g:1,n:'1.1',d:'Who is autistic, how many, and why the numbers rose'},
 {id:'words',t:'Words, identity & neurodiversity',g:1,n:'1.2',d:'Identity-first or person-first, double empathy, masking'},
 {id:'senses',t:'The sensory world',g:1,n:'1.3',d:'Hyper- and hypo-reactivity, overload, meltdown and shutdown'},
 {id:'genes',t:'Genes & heritability',g:2,n:'2.1',d:'Twins, common and rare variants, syndromes and a pedigree'},
 {id:'risk',t:'Risk factors & myths',g:2,n:'2.2',d:'Prenatal factors, absolute risk, and why vaccines are not a cause'},
 {id:'brain',t:'The developing brain',g:2,n:'2.3',d:'Growth, synapses, connectivity and the main hypotheses'},
 {id:'milestones',t:'Early signs & development',g:3,n:'3.1',d:'Social-communication milestones and red flags, 0–36 months'},
 {id:'screening',t:'Screening tools',g:3,n:'3.2',d:'M-CHAT-R/F logic, predictive value, and why a screen is not a diagnosis'},
 {id:'criteria',t:'DSM-5-TR & ICD-11 criteria',g:3,n:'3.3',d:'A criteria walk-through, specifiers and the three support levels'},
 {id:'assessment',t:'The diagnostic assessment',g:3,n:'3.4',d:'Who assesses, which tools, waiting times, adults and differentials'},
 {id:'cooccur',t:'Co-occurring conditions',g:3,n:'3.5',d:'ADHD, anxiety, depression, intellectual disability and more'},
 {id:'supports',t:'Supports & the evidence',g:4,n:'4.1',d:'Early intervention, what helps, and how sure we are'},
 {id:'aba',t:'ABA and the debate',g:4,n:'4.2',d:'Behavioural approaches, NDBIs and what autistic people say'},
 {id:'therapies',t:'Communication, AAC & therapies',g:4,n:'4.3',d:'Speech therapy, AAC, OT, social skills and adapted CBT'},
 {id:'meds',t:'Medication',g:4,n:'4.4',d:'What medicines can and cannot do: irritability, ADHD, sleep'},
 {id:'unproven',t:'Unproven & harmful treatments',g:4,n:'4.5',d:'Secretin, chelation, bleach, diets and how to judge a claim'},
 {id:'frontier',t:'Research toward better support',g:4,n:'4.6',d:'Trials, new diagnostics and what autistic people want studied'},
 {id:'school',t:'Family, school & play',g:5,n:'5.1',d:'A week with supports, education rights and caregiver wellbeing'},
 {id:'adult',t:'Autistic adults',g:5,n:'5.2',d:'Late diagnosis, work, relationships, burnout and ageing'},
 {id:'health',t:'Physical health, sleep & safety',g:5,n:'5.3',d:'Epilepsy, sleep, gut, feeding, mortality and safety'},
 {id:'nursing',t:'Nursing & healthcare visits',g:5,n:'5.4',d:'An autism-adapted visit, communication, pain and restraint'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Bleuler and Sukhareva to DSM-5 and neurodiversity'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 5 and 6 use the ochre brand; 2 violet (--neuro), 3 charcoal-blue (--accent), 4 green (--rx) */
const GROUPS={1:['Understanding autism','g-und','c-und'],2:['Causes & the brain','g-cause','c-cause'],3:['Signs & diagnosis','g-dx','c-dx'],4:['Supports & interventions','g-rx','c-rx'],5:['Living & lifespan','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
