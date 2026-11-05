/* alcohol-use-disorder: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='aud:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What alcohol use disorder is',g:1,n:'1.1',d:'How common it is, who it affects, and the words we use'},
 {id:'drinks',t:'Standard drinks, blood alcohol & metabolism',g:1,n:'1.2',d:'Grams per drink, the blood alcohol curve and how the liver clears alcohol'},
 {id:'brain',t:'Alcohol and the brain: reward, adaptation, craving',g:1,n:'1.3',d:'GABA and glutamate, tolerance, and the addiction cycle'},
 {id:'genes',t:'Genes, family & risk',g:1,n:'1.4',d:'Heritability, ADH1B and ALDH2, GWAS, and risk not destiny'},
 {id:'screening',t:'Screening: AUDIT, AUDIT-C & brief intervention',g:2,n:'2.1',d:'Asking about drinking, the AUDIT zones and SBIRT'},
 {id:'criteria',t:'Diagnosis: DSM-5-TR criteria & severity',g:2,n:'2.2',d:'The 11 criteria, mild to severe, and remission: a teaching counter'},
 {id:'biomarkers',t:'Blood and urine markers of drinking',g:2,n:'2.3',d:'PEth, EtG, CDT, GGT and MCV: what each can and cannot show'},
 {id:'withdrawal',t:'Alcohol withdrawal: the timeline',g:3,n:'3.1',d:'From tremor to delirium tremens, and why to get medical help'},
 {id:'ciwa',t:'CIWA-Ar: scoring withdrawal',g:3,n:'3.2',d:'The 10 items and how symptom-triggered care uses them'},
 {id:'detox',t:'Managing withdrawal safely',g:3,n:'3.3',d:'Where, with which medicines, and what comes next, as published'},
 {id:'wernicke',t:'Thiamine, Wernicke and Korsakoff',g:3,n:'3.4',d:'Why thiamine comes first, the triad and the Caine criteria'},
 {id:'medicines',t:'Approved medicines: naltrexone, acamprosate, disulfiram',g:4,n:'4.1',d:'How each works, the trials and the label points'},
 {id:'offlabel',t:'Other medicines: topiramate, gabapentin, baclofen and more',g:4,n:'4.2',d:'The evidence for medicines not approved for AUD in the US'},
 {id:'therapy',t:'Talking therapies and mutual help',g:4,n:'4.3',d:'Brief intervention, MI, CBT, contingency management, AA and SMART'},
 {id:'recovery',t:'Course, relapse and recovery',g:4,n:'4.4',d:'How drinking changes over the years, lapses, and levels of care'},
 {id:'liver',t:'The liver: fatty liver to cirrhosis',g:5,n:'5.1',d:'Steatosis, hepatitis, fibrosis and cirrhosis, and what stopping does'},
 {id:'body',t:'Alcohol and the whole body: cancer, heart, brain',g:5,n:'5.2',d:'Risks by amount, and the J-curve debate'},
 {id:'families',t:'Families, friends and everyday life',g:5,n:'5.3',d:'CRAFT, Al-Anon, language, work and support for families'},
 {id:'pregnancy',t:'Pregnancy and fetal alcohol spectrum disorders',g:5,n:'5.4',d:'Alcohol and the developing baby, FASD, and support in pregnancy'},
 {id:'nursing',t:'Nursing care in hospital',g:5,n:'5.5',d:'Screening, CIWA-Ar checks, thiamine, safety and linking to treatment'},
 {id:'frontier',t:'Research frontier: GLP-1, psilocybin and beyond',g:5,n:'5.6',d:'Treatments under study, each with an evidence label'},
 {id:'history',t:'A history of alcohol use disorder',g:6,n:'6.1',d:'From Rush and Huss to AA, DSM-5 and today’s medicines'},
 {id:'review',t:'Flashcards & memory aids',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 5 and 6 use the olive brand; 2 plum (--dx), 3 ember (--accent), 4 teal (--rx) */
const GROUPS={1:['Understanding AUD','g-und','c-und'],2:['Screening & diagnosis','g-dx','c-dx'],3:['Withdrawal & acute care','g-acute','c-acute'],4:['Treatment & recovery','g-rx','c-rx'],5:['Body, family & care','g-body','c-body'],6:['Context & review','g-ix','c-ix']};
