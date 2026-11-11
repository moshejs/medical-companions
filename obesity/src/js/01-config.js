/* obesity: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='obc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What obesity is',g:1,n:'1.1',d:'A chronic disease of excess adiposity: definitions, clinical vs preclinical obesity, and how common it is'},
 {id:'measuring',t:'BMI, waist & body fat',g:1,n:'1.2',d:'BMI classes, Asian cut-offs, waist-to-height and why BMI alone misclassifies'},
 {id:'causes',t:'Causes: genes & environment',g:1,n:'1.3',d:'Heritability, FTO and MC4R, polygenic scores, ultra-processed food, sleep and medicines'},
 {id:'appetite',t:'Appetite: the gut-brain loop',g:1,n:'1.4',d:'Ghrelin, leptin, GLP-1 and PYY, and the brain circuits that set hunger and fullness'},
 {id:'adipose',t:'Fat tissue as an organ',g:1,n:'1.5',d:'Fat cells that grow and multiply, inflammation, visceral fat and brown fat'},
 {id:'adaptation',t:'Why lost weight comes back',g:1,n:'1.6',d:'Metabolic adaptation, hunger hormones that persist, and the biology of regain'},
 {id:'complications',t:'Complications across the body',g:2,n:'2.1',d:'Heart, liver, joints, sleep apnoea, cancers and more, organ by organ'},
 {id:'diabetes',t:'Obesity & type 2 diabetes',g:2,n:'2.2',d:'Insulin resistance, prevention in the DPP and remission in DiRECT'},
 {id:'assessment',t:'Assessment & staging',g:2,n:'2.3',d:'A respectful clinical assessment and the Edmonton Obesity Staging System, as a teaching tool'},
 {id:'stigma',t:'Weight stigma & bias',g:2,n:'2.4',d:'How weight bias harms health and care, and the language that helps'},
 {id:'lifestyle',t:'Diet, activity & behaviour',g:3,n:'3.1',d:'What trials of diet, activity and behavioural programmes show, from the DPP to Look AHEAD'},
 {id:'glp',t:'How GLP-1 medicines work',g:3,n:'3.2',d:'Incretin hormones, receptors in gut, pancreas and brain, and the published dose steps'},
 {id:'medtrials',t:'Semaglutide & tirzepatide trials',g:3,n:'3.3',d:'STEP, SURMOUNT and SELECT: weight change and heart outcomes as trial averages'},
 {id:'othermeds',t:'Other weight-loss medicines',g:3,n:'3.4',d:'Orlistat, phentermine-topiramate, naltrexone-bupropion, setmelanotide and the withdrawn drugs'},
 {id:'sideeffects',t:'Side effects, safety & stopping',g:3,n:'3.5',d:'Stomach and gut effects, label warnings, lean mass, and what happens on stopping'},
 {id:'surgery',t:'Metabolic & bariatric surgery',g:3,n:'3.6',d:'Sleeve gastrectomy, gastric bypass and other operations, who they are for and what they achieve'},
 {id:'aftersurgery',t:'Life after surgery',g:3,n:'3.7',d:'Eating stages, vitamins and minerals, dumping, reflux and lifelong follow-up'},
 {id:'children',t:'Children & adolescents',g:4,n:'4.1',d:'Health and behaviours first: the AAP guideline and treatment options as published'},
 {id:'pregnancy',t:'Pregnancy & fertility',g:4,n:'4.2',d:'Fertility and PCOS, pregnancy risks, and planning around medicines and surgery'},
 {id:'living',t:'Living with obesity',g:4,n:'4.3',d:'Daily life, mental health, eating-disorder caution and long-term support'},
 {id:'nursing',t:'Nursing care',g:4,n:'4.4',d:'Respectful care, the right equipment, skin, medicines, surgery and teaching'},
 {id:'frontier',t:'Research frontier',g:4,n:'4.5',d:'Triple agonists, amylin analogues, oral pills and muscle-sparing drugs, with evidence labels'},
 {id:'history',t:'History & people',g:5,n:'5.1',d:'From Quetelet\'s index and the discovery of leptin to GLP-1 medicines'},
 {id:'review',t:'Flashcards & memory aids',g:5,n:'5.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:5,n:'5.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:5,n:'5.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:5,n:'5.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['Understanding obesity','g-und','c-und'],2:['Health & assessment','g-hl','c-hl'],3:['Treatment','g-tx','c-tx'],4:['Across life & care','g-life','c-life'],5:['Context & review','g-ix','c-ix']};
