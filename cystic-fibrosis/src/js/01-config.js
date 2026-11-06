/* cystic fibrosis: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='cfc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What cystic fibrosis is',g:1,n:'1.1',d:'The salty-sweat clue, the organs involved, how common CF is and how survival has changed'},
 {id:'gene',t:'The CFTR gene & inheritance',g:1,n:'1.2',d:'Chromosome 7, F508del, carriers and the 1-in-4 chance in each pregnancy'},
 {id:'variants',t:'Variant classes & genotype',g:1,n:'1.3',d:'Classes I to VI, from no protein to an unstable channel, and genotype'},
 {id:'cftr',t:'How CFTR works',g:1,n:'1.4',d:'Chloride, bicarbonate and water, the airway surface liquid and the sweat duct'},
 {id:'lungs',t:'Lungs: mucus, infection & bronchiectasis',g:2,n:'2.1',d:'Thick mucus, infection over a lifetime, exacerbations and bronchiectasis'},
 {id:'digestive',t:'Pancreas, gut & liver',g:2,n:'2.2',d:'Blocked pancreatic ducts, enzymes, meconium ileus, DIOS and the liver'},
 {id:'organs',t:'Sweat, diabetes, bones & fertility',g:2,n:'2.3',d:'Salt loss, CF-related diabetes, bones, sinuses, kidneys and fertility'},
 {id:'screening',t:'Newborn screening & diagnosis',g:3,n:'3.1',d:'The heel-prick test, IRT and DNA, CRMS/CFSPID and the diagnostic criteria'},
 {id:'sweattest',t:'The sweat test & genetic testing',g:3,n:'3.2',d:'How a sweat test is done, the chloride bands and genetic testing'},
 {id:'monitoring',t:'Lung function & monitoring',g:3,n:'3.3',d:'Spirometry, FEV1 percent predicted, LCI, cultures and the annual review'},
 {id:'modulators',t:'CFTR modulators: how they work',g:4,n:'4.1',d:'Correctors and potentiators, which defect each targets, and label safety'},
 {id:'trials',t:'Modulator trials & eligibility',g:4,n:'4.2',d:'STRIVE to SKYLINE, FEV1 and sweat chloride results, and eligibility as labelled'},
 {id:'clearance',t:'Airway clearance & inhaled therapies',g:4,n:'4.3',d:'Hypertonic saline, dornase alfa, airway clearance techniques and exercise'},
 {id:'infection',t:'Infection, antibiotics & cross-infection',g:4,n:'4.4',d:'Pseudomonas eradication, inhaled antibiotics, exacerbations and cross-infection'},
 {id:'nutrition',t:'Nutrition & enzymes',g:4,n:'4.5',d:'Enzymes with meals, fat-soluble vitamins, salt and growth targets'},
 {id:'transplant',t:'Advanced lung disease & transplant',g:5,n:'5.1',d:'Referral thresholds, lung transplant, survival and palliative care'},
 {id:'living',t:'Living with CF',g:5,n:'5.2',d:'Treatment burden, school, work, transition, mental health and carers'},
 {id:'pregnancy',t:'Fertility, pregnancy & parenthood',g:5,n:'5.3',d:'Male and female fertility, pregnancy on modulators and partner testing'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.4',d:'Admission for an exacerbation, infection control, IV antibiotics and teaching'},
 {id:'frontier',t:'Research frontier',g:5,n:'5.5',d:'Gene and mRNA therapy, read-through, editing and other routes, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From the salty kiss to Andersen, the sweat test, CFTR and modulators'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 2 and 6 use the aubergine brand; 3 bicarbonate blue (--dx), 4 modulator teal (--rx), 5 sea-salt green (--rec) */
const GROUPS={1:['Understanding CF','g-und','c-und'],2:['How CF affects the body','g-body','c-body'],3:['Screening, diagnosis & monitoring','g-dx','c-dx'],4:['Treatment','g-rx','c-rx'],5:['Living & care','g-rec','c-rec'],6:['Context & review','g-ix','c-ix']};
