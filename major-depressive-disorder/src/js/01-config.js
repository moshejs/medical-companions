/* major depressive disorder: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='mddc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What depression is',g:1,n:'1.1',d:'More than sadness: what major depressive disorder is, how common it is and what it costs'},
 {id:'symptoms',t:'Symptoms & subtypes',g:1,n:'1.2',d:'The nine symptoms, how they cluster, and melancholic, atypical, anxious, psychotic and seasonal forms'},
 {id:'causes',t:'Causes & risk factors',g:1,n:'1.3',d:'Genes, early adversity, life events and illness: how risks add up'},
 {id:'brain',t:'Brain circuits & chemistry',g:1,n:'1.4',d:'Mood circuits, serotonin and the monoamine debate, and how neurons regrow connections'},
 {id:'stress',t:'Stress hormones, inflammation & sleep',g:1,n:'1.5',d:'The HPA axis, cortisol, inflammation and the body clock in depression'},
 {id:'diagnosis',t:'Diagnosis & look-alikes',g:2,n:'2.1',d:'The DSM-5-TR and ICD-11 criteria as a teaching counter, and conditions that can look like depression'},
 {id:'screening',t:'PHQ-9 & rating scales',g:2,n:'2.2',d:'How the PHQ-9, PHQ-2, HAM-D and MADRS are scored, and what a positive screen means'},
 {id:'course',t:'Course, relapse & recovery',g:2,n:'2.3',d:'How long episodes last, the five R\'s, STAR*D step by step and what lowers relapse'},
 {id:'comorbidity',t:'Depression & the body',g:2,n:'2.4',d:'Anxiety, pain, heart disease, diabetes and dementia: links that run both ways'},
 {id:'suicide',t:'Suicide prevention & safety',g:2,n:'2.5',d:'Warning signs, what protects, safety planning and how to ask and get help'},
 {id:'psychotherapy',t:'Talking therapies',g:3,n:'3.1',d:'CBT, behavioural activation, interpersonal therapy and mindfulness-based therapy, and how well they work'},
 {id:'antidepressants',t:'How antidepressants work',g:3,n:'3.2',d:'SSRIs, SNRIs, bupropion, mirtazapine, tricyclics and MAOIs at the synapse, and why they take weeks'},
 {id:'trials',t:'Antidepressant trials: what the evidence shows',g:3,n:'3.3',d:'Cipriani\'s 21 drugs, placebo response, severity and STAR*D, read as group averages'},
 {id:'sideeffects',t:'Side effects, safety & stopping',g:3,n:'3.4',d:'Common effects, label warnings, serotonin syndrome and discontinuation symptoms'},
 {id:'trd',t:'When treatment does not work',g:3,n:'3.5',d:'Treatment-resistant depression: checking the basics, switching, combining and augmenting'},
 {id:'neuromodulation',t:'ECT, TMS & brain stimulation',g:3,n:'3.6',d:'What happens in ECT and TMS, who they are for, how well they work and their side effects'},
 {id:'ketamine',t:'Ketamine & esketamine',g:3,n:'3.7',d:'Rapid-acting treatments: how they act on glutamate, how fast they work and how they are supervised'},
 {id:'lifestyle',t:'Exercise, light, sleep & daily life',g:3,n:'3.8',d:'What trials show for exercise, bright light, sleep, diet and seasonal depression'},
 {id:'perinatal',t:'Pregnancy & postpartum depression',g:4,n:'4.1',d:'Baby blues, postpartum depression, the EPDS, and treatments including zuranolone'},
 {id:'young',t:'Children & adolescents',g:4,n:'4.2',d:'How depression looks in young people, TADS, fluoxetine and the boxed warning in context'},
 {id:'living',t:'Living with depression & supporting someone',g:4,n:'4.3',d:'Work, relationships, relapse-prevention plans, stigma, and how family and friends can help'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.4',d:'Assessment, therapeutic communication, safety, medicine teaching and care around ECT'},
 {id:'frontier',t:'Research frontier',g:4,n:'4.5',d:'Psilocybin, neurosteroids, new mechanisms and precision psychiatry, each with an evidence label'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'From melancholia and black bile to imipramine, Prozac, STAR*D and ketamine'},
 {id:'review',t:'Flashcards & memory aids',g:5,n:'5.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['Understanding depression','g-und','c-und'],2:['Diagnosis & course','g-hl','c-hl'],3:['Treatment','g-tx','c-tx'],4:['Across life & care','g-life','c-life'],5:['Context & review','g-ix','c-ix']};
