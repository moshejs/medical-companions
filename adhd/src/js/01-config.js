/* adhd: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='adhd:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What ADHD is',g:1,n:'1.1',d:'How common it is, in whom, and how often it lasts into adulthood'},
 {id:'brain',t:'The ADHD brain',g:1,n:'1.2',d:'Networks, cortical maturation and what brain scans can and cannot show'},
 {id:'dopamine',t:'Dopamine & noradrenaline',g:1,n:'1.3',d:'Catecholamine signalling, reward timing and the inverted-U'},
 {id:'genes',t:'Genes & heritability',g:1,n:'1.4',d:'Twin studies, many small genetic effects, and what family history means'},
 {id:'risk',t:'Environment, risk & myths',g:1,n:'1.5',d:'Prematurity, prenatal exposures, relative age, and what does not cause ADHD'},
 {id:'signs',t:'Signs across the lifespan',g:2,n:'2.1',d:'Preschool to adulthood: how ADHD looks at each age'},
 {id:'criteria',t:'DSM-5-TR criteria calculator',g:2,n:'2.2',d:'Count the symptoms, then check age, settings and impairment'},
 {id:'scales',t:'Rating scales & assessment',g:2,n:'2.3',d:'ASRS, Vanderbilt, SNAP-IV and Conners, and why a screener is not a diagnosis'},
 {id:'differential',t:'Look-alikes & co-occurring conditions',g:2,n:'2.4',d:'Anxiety, autism, sleep, learning, mood and trauma: telling apart and spotting together'},
 {id:'women',t:'Girls, women & late diagnosis',g:2,n:'2.5',d:'Why ADHD is missed in girls and adults, and what changes with diagnosis'},
 {id:'stimulants',t:'How stimulants work',g:3,n:'3.1',d:'Methylphenidate and amphetamines at the synapse'},
 {id:'release',t:'Formulations & the daily curve',g:3,n:'3.2',d:'Immediate- and extended-release, prodrugs, onset and duration'},
 {id:'nonstim',t:'Non-stimulant medicines',g:3,n:'3.3',d:'Atomoxetine, viloxazine, guanfacine and clonidine'},
 {id:'compare',t:'How well treatments work',g:3,n:'3.4',d:'Effect sizes from trials, children versus adults'},
 {id:'safety',t:'Side effects, safety & misuse',g:3,n:'3.5',d:'Appetite, sleep, growth, heart, mood, misuse and diversion'},
 {id:'parenting',t:'Parent training & classroom support',g:4,n:'4.1',d:'Behavioural parent training, school strategies and preschoolers'},
 {id:'therapy',t:'CBT, coaching & adult support',g:4,n:'4.2',d:'Psychological treatment for teens and adults, and what has evidence'},
 {id:'mta',t:'The MTA study & long-term treatment',g:4,n:'4.3',d:'Medication, behaviour therapy or both: 14 months to 16 years'},
 {id:'outcomes',t:'Course & outcomes',g:5,n:'5.1',d:'Persistence, injuries, mortality and what treatment changes'},
 {id:'living',t:'Living with ADHD',g:5,n:'5.2',d:'School, university, work, driving, money, relationships and family'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Assessment, medication safety, monitoring and teaching'},
 {id:'frontiers',t:'Research frontiers',g:5,n:'5.4',d:'New medicines, devices and digital tools, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Crichton and Still to DSM-5-TR'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The condition','g-dz','c-dz'],2:['Recognising & diagnosing','g-dx','c-dx'],3:['Medication','g-rx','c-rx'],4:['Behavioural & psychological care','g-beh','c-beh'],5:['Living with ADHD','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
