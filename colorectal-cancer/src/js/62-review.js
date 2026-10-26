/* =============== 6.2 flashcards & mnemonics =============== */
const CR_PARTN={1:"Part 1 · The disease",2:"Part 2 · Screening",3:"Part 3 · Diagnosis & staging",4:"Part 4 · Treatment",5:"Part 5 · Living with CRC",6:"Part 6 · History"};
const CR_FC=[
 /* ---- Part 1: the disease ---- */
 [1,`Where does colorectal cancer rank worldwide?`,`Third most diagnosed cancer (9.6% of new cancers) and second leading cause of cancer death (9.3%) in GLOBOCAN 2022 [[Bray2024]]. GLOBOCAN 2024 counted 2,041,007 new cases and 917,895 deaths [[Sung2026]].`],
 [1,`What is the US lifetime risk of colorectal cancer?`,`4.1% (about 1 in 24) for males and 3.8% (about 1 in 26) for females, for 2018–2021 [[Siegel2025]].`],
 [1,`Where does colorectal cancer rank as a cause of cancer death in US adults under 50?`,`First. Across all ages it is the second most common cause of cancer death in the United States [[Siegel2026CRC]].`],
 [1,`What is the birth-cohort effect in early-onset colorectal cancer?`,`Risk tracks when you were born. Compared with people born around 1950, those born around 1990 have about double the colon cancer risk (IRR 2.40) and about four times the rectal cancer risk (IRR 4.32) [[Siegel2017]].`],
 [1,`Which part of the bowel drives the rise in early-onset cancer?`,`The left side. From 1998 to 2022, at ages 20–49, sigmoid cancer rose from 2.1 to 3.7 and rectal cancer from 3.6 to 6.6 per 100,000, compared with a 26% rise in proximal tumours [[Siegel2026CRC]].`],
 [1,`How often does the colonic lining renew itself?`,`Every 4–5 days [[VanDerFlier2009]]. The intestinal epithelium is the most rapidly self-renewing tissue in adult mammals [[Barker2007]].`],
 [1,`Which marker identifies the crypt-base stem cell?`,`Lgr5, a Wnt target gene. In adult mice a single Lgr5+ cell generated all epithelial lineages over 60 days [[Barker2007]].`],
 [1,`What does the APC destruction complex do to β-catenin?`,`APC and Axin scaffold GSK-3 and CK1, which phosphorylate β-catenin; β-TrCP then ubiquitinates it and the proteasome degrades it [[Stamos2013]].`],
 [1,`What happens to β-catenin when APC is lost?`,`It accumulates and binds Tcf-4, forming a constitutively active transcription complex in the nucleus [[Korinek1997]]. Tumours with intact APC can carry activating β-catenin mutations instead [[Morin1997]].`],
 [1,`In the Fearon–Vogelstein model, which matters more: the order of mutations or their accumulation?`,`Their accumulation. Cancer results from activated oncogenes plus inactivated tumour-suppressor genes [[Fearon1990]].`],
 [1,`How common are ras mutations in small vs large adenomas?`,`9% of adenomas under 1 cm, 58% of adenomas over 1 cm and 47% of carcinomas; chromosome 18q loss reached 73% of carcinomas [[Vogelstein1988]].`],
 [1,`How long does a large adenoma take to become an advanced cancer?`,`About 17 years, by comparative lesion sequencing; cells within that cancer then need under 2 years to gain the ability to metastasise [[Jones2008]].`],
 [1,`Which serrated polyps are cancer precursors?`,`Sessile serrated lesions and traditional serrated adenomas; hyperplastic polyps are the third, mostly harmless, group in WHO 2019 [[Crockett2019]].`],
 [1,`What are the three pathways of genomic instability in colorectal cancer?`,`Chromosomal instability (CIN), microsatellite instability (MSI) and the CpG island methylator phenotype (CIMP). Most colorectal cancers arise through CIN [[Pino2010]].`],
 [1,`How much does one affected first-degree relative raise risk?`,`Roughly doubles it: pooled RR 2.24 with one or more affected first-degree relatives and 3.97 with two or more [[Butterworth2006]].`],
 [1,`How does IARC classify processed and red meat?`,`Processed meat is carcinogenic to humans (Group 1); red meat is probably carcinogenic (Group 2A) [[Bouvard2015]].`],
 [1,`What did ASPREE show about aspirin in people aged 70 and older?`,`100 mg a day did not reduce cancer and was linked to more cancer deaths (HR 1.31) [[McNeil2018]], and to more metastatic or stage 4 cancer at diagnosis [[McNeil2021]].`],
 [1,`Which genes cause Lynch syndrome?`,`Germline variants in MLH1, MSH2, MSH6 or PMS2, or deletions in EPCAM [[Syngal2015]]. EPCAM deletions silence the neighbouring MSH2 by methylation [[Ligtenberg2009]].`],
 [1,`How common is Lynch syndrome?`,`About 1 in 279 people carry a mismatch-repair gene variant [[Win2017]], and about 2.8% (1 in 35) of people with colorectal cancer have Lynch syndrome [[Hampel2008]].`],
 [1,`Which Lynch genes carry the highest colorectal cancer risk to age 75?`,`MLH1 (48.3% women, 57.1% men) and MSH2 (46.6%, 51.4%). MSH6 is moderate (20.3%, 18.2%) and PMS2 low (10.4%) [[DominguezValentin2020]].`],
 [1,`What causes FAP, and what is the cancer risk without treatment?`,`Germline APC variants on chromosome 5q21, inherited autosomal dominantly; hundreds of adenomas develop [[Galiatsatos2006]]. Without prophylactic treatment colorectal cancer risk reaches "virtually 100% by 60 years" [[Zaffaroni2024]].`],
 [1,`What is colibactin, and why is it linked to early-onset cancer?`,`A genotoxin made by pks+ E. coli that leaves a mutational signature in colorectal genomes [[PleguezuelosManzano2020]]. Its signatures were 3.3 times more common in people diagnosed before 40 than after 70 <span class="ev early">Early evidence</span> [[DiazGay2025]].`],
 /* ---- Part 2: screening ---- */
 [2,`What are the USPSTF 2021 screening grades by age?`,`45–49: B. 50–75: A. 76–85: C, offered selectively [[USPSTF2021]].`],
 [2,`Which guideline is the outlier on starting age?`,`ACP 2023 starts screening at 50, uses FIT every 2 years and advises against stool DNA, CT colonography and blood tests [[Qaseem2023]].`],
 [2,`How accurate is a single FIT for colorectal cancer?`,`Pooled sensitivity 0.79 and specificity 0.94; one sample performed as well as several [[Lee2014]].`],
 [2,`Why must FIT be repeated?`,`Its one-time sensitivity for advanced adenomas is only about 0.40, even at 10 µg/g [[Imperiale2019]].`],
 [2,`What does England's 120 µg/g FIT threshold trade away?`,`The pilot estimated it finds 47.8% of cancers and refers 2.1% of participants; at 20 µg/g it would find 82.2% but refer 7.8% [[Li2021]].`],
 [2,`Multitarget stool DNA vs FIT: sensitivity and specificity?`,`Cancer sensitivity 92.3% vs 73.8%; specificity 86.6% vs 94.9% [[Imperiale2014]].`],
 [2,`What did the Shield cfDNA blood test detect in ECLIPSE?`,`83.1% of colorectal cancers but only 13.2% of advanced precancerous lesions, with 89.6% specificity for advanced neoplasia [[Chung2024]].`],
 [2,`What did NordICC show?`,`An invitation to one colonoscopy (42% attended) lowered 10-year colorectal cancer risk (RR 0.82) but not significantly the risk of death (RR 0.90) [[Bretthauer2022]].`],
 [2,`What is the adenoma detection rate, and why does it matter?`,`The share of screening colonoscopies finding at least one adenoma. Each 1% rise is linked to a 3% lower interval-cancer risk [[Corley2014]].`],
 [2,`What are the 2024 ACG/ASGE colonoscopy quality targets?`,`Screening ADR ≥35% (≥40% men, ≥30% women), caecal intubation ≥95%, adequate prep ≥90% and average withdrawal time ≥8 minutes [[Rex2024]].`],
 [2,`How often does screening colonoscopy cause serious harm?`,`Perforation about 3.1 and major bleeding about 14.6 per 10,000 procedures [[Lin2021]].`],
 [2,`How long can colonoscopy wait after a positive FIT?`,`2–9 months carried no excess risk compared with 8–30 days; at 10–12 months cancer was more likely (OR 1.48) and beyond 12 months more so (OR 2.25) [[Corley2017]].`],
 [2,`When is the next colonoscopy after 1–2 tubular adenomas under 10 mm?`,`7–10 years. An adenoma ≥10 mm means 3 years; piecemeal resection of a lesion ≥20 mm means 6 months [[Gupta2020]].`],
 [2,`When should someone whose parent had colorectal cancer at 52 start screening?`,`USMSTF 2017: colonoscopy every 5 years from 40, or 10 years before the relative's diagnosis, whichever is earlier (first-degree relative diagnosed before 60) [[Rex2017]].`],
 /* ---- Part 3: diagnosis & staging ---- */
 [3,`What are the commonest presenting features of colorectal cancer under 50?`,`Haematochezia (45%), abdominal pain (40%) and altered bowel habit (27%); haematochezia carries at least a 5-fold risk [[Demb2024]].`],
 [3,`What FIT threshold does UK guidance use for symptomatic patients?`,`fHb ≥10 µg Hb/g selects patients for urgent referral, but no one should be excluded from referral on FIT alone [[Monahan2022]].`],
 [3,`How often is colorectal cancer diagnosed as an emergency in England, and with what outcome?`,`26% of cases (2006–2008), with 1-year relative survival of 50% vs 98% for screen-detected cancer [[EllissBrookes2012]].`],
 [3,`How common is a synchronous second colorectal cancer?`,`3.9% (about 1 in 25); in a third the tumours were in different surgical segments, so the whole colon should be examined [[Mulder2011]].`],
 [3,`What does an MRI-involved circumferential margin mean in MERCURY?`,`Tumour ≤1 mm from the mesorectal fascia. It predicted worse 5-year survival (HR 1.97) and more local recurrence (HR 3.50) [[Taylor2014]].`],
 [3,`Is CEA a screening test?`,`No. It is "of little use in detecting early colorectal cancer" [[Duffy2001]], but is used before surgery for prognosis and planning and serially for surveillance [[Locker2006]].`],
 [3,`Define T1, T2, T3, T4a and T4b.`,`T1 submucosa; T2 muscularis propria; T3 through the muscularis propria into pericolorectal tissue; T4a visceral peritoneum; T4b other organs or structures [[Amin2017AJCC,Tong2018]].`],
 [3,`Define N1a, N1b, N1c, N2a and N2b.`,`N1a 1 node; N1b 2–3 nodes; N1c tumour deposits with no positive nodes; N2a 4–6 nodes; N2b 7 or more [[Amin2017AJCC,Tong2018]].`],
 [3,`What was new in AJCC 8th edition M staging?`,`M1c for peritoneal metastasis, giving stage IVC; in the 7th edition peritoneal disease was part of M1b [[Tong2018]].`],
 [3,`What is the stage III "survival paradox"?`,`Stage IIIA did better than stage IIB in SEER (83.4% vs 72.2% 5-year survival), partly because stage III patients got chemotherapy [[OConnell2004]].`],
 [3,`How many lymph nodes should be examined?`,`At least 12. Fewer than 12 counts as a high-risk feature in stage II colon cancer [[Baxter2022,Chang2007]].`],
 [3,`What is US 5-year relative survival by stage?`,`Localized 91%, regional 74%, distant 15% (diagnosed 2015–2021). These are population statistics, not individual predictions [[Siegel2026]].`],
 [3,`An MLH1-deficient tumour carries BRAF V600E. What does it suggest?`,`Sporadic disease from MLH1 promoter methylation, not Lynch syndrome; but a BRAF-wild-type result does not exclude Lynch [[Sepulveda2017]].`],
 [3,`What is extended RAS testing?`,`KRAS and NRAS codons 12 and 13 (exon 2), 59 and 61 (exon 3), and 117 and 146 (exon 4), required before anti-EGFR therapy [[Sepulveda2017]].`],
 [3,`Which tumours benefit from anti-EGFR antibodies by side?`,`Left-sided RAS wild-type tumours (OS HR 0.75); right-sided tumours did not benefit (HR 1.12) [[Arnold2017]].`],
 /* ---- Part 4: treatment ---- */
 [4,`What is total mesorectal excision (TME)?`,`Removing the rectum with its intact mesorectal envelope. Heald's 1986 series reported corrected 5-year survival of 87% and no staple-line recurrences after curative surgery [[Heald1986]].`],
 [4,`Is laparoscopic colectomy as good as open surgery for colon cancer?`,`In COST, 3-year recurrence was 16% vs 18% and survival 86% vs 85%, with a shorter stay [[COST2004]].`],
 [4,`What does a defunctioning stoma do after low anterior resection?`,`It cut symptomatic anastomotic leak from 28.0% to 10.3% in a Swedish randomised trial [[Matthiessen2007]].`],
 [4,`What did MOSAIC add to adjuvant 5-FU/leucovorin?`,`Oxaliplatin (FOLFOX4): 3-year DFS 78.2% vs 72.9% [[Andre2004]], with an overall survival benefit in stage III only [[Andre2009]].`],
 [4,`What did IDEA conclude about 3 vs 6 months of adjuvant therapy?`,`Overall non-inferiority was not met (HR 1.07); 3 months was non-inferior for CAPOX and enough for low-risk T1–3 N1 disease [[Grothey2018]].`],
 [4,`Why does stage II dMMR colon cancer not get fluorouracil alone?`,`FU gave no DFS benefit in dMMR tumours (HR 1.10), and in pooled stage II dMMR data it was linked to worse survival (HR 2.95) [[Sargent2010]].`],
 [4,`What did the Dutch TME trial show for 5×5 Gy before TME?`,`10-year local recurrence 5% vs 11%, without an overall survival gain [[vanGijn2011]].`],
 [4,`Preoperative or postoperative chemoradiotherapy for rectal cancer?`,`Preoperative: 5-year local relapse 6% vs 13% with less toxicity and equal survival in CAO/ARO/AIO-94 [[Sauer2004]].`],
 [4,`How often does a tumour regrow under watch-and-wait?`,`2-year local regrowth was 25.2% in the International Watch & Wait Database; 97% of regrowths were in the bowel wall [[vanderValk2018]].`],
 [4,`What happened with dostarlimab in dMMR rectal cancer?`,`12 of 12, then all 49 rectal patients who completed treatment, had a clinical complete response <span class="ev early">Early evidence</span> [[Cercek2022,Cercek2025]].`],
 [4,`What boxed warning do the capecitabine and fluorouracil labels carry?`,`Serious or fatal reactions with DPD deficiency: "Test patients for genetic variants of DPYD prior to initiating" unless immediate treatment is necessary [[FDA-Xeloda,FDA-Fluorouracil]].`],
 [4,`What did KEYNOTE-177 show?`,`First-line pembrolizumab in MSI-H/dMMR metastatic CRC: median PFS 16.5 vs 8.2 months, grade ≥3 treatment-related events 22% vs 66% [[Andre2020]].`],
 [4,`Can liver metastases be cured?`,`Sometimes: in one series of 612 hepatectomies, actual 10-year survivors were almost all disease-free, "at least a one in six chance of cure" [[Tomlinson2007]].`],
 [4,`Which combination treats BRAF V600E metastatic CRC?`,`Encorafenib plus cetuximab, now with chemotherapy first-line: BREAKWATER interim median OS 30.3 vs 15.1 months [[Elez2025]].`],
 [4,`What did DYNAMIC show for ctDNA in stage II colon cancer?`,`ctDNA-guided care cut adjuvant chemotherapy from 28% to 15% with non-inferior 2-year RFS (93.5% vs 92.4%) [[Tie2022]].`],
 /* ---- Part 5: living with CRC ---- */
 [5,`What does the LARS score measure, and what are its cut-offs?`,`Five items (flatus incontinence, liquid-stool incontinence, frequency, clustering, urgency), total 0–42: 0–20 no LARS, 21–29 minor, 30–42 major [[Emmertsen2012]].`],
 [5,`How common is major LARS after rectal cancer resection?`,`About 41%; radiotherapy and a low anastomosis are the most consistent risk factors [[Croese2018]].`],
 [5,`What does the European Hernia Society recommend when an end colostomy is made?`,`A prophylactic synthetic non-absorbable mesh (strong recommendation); end colostomy has the highest parastomal hernia incidence [[Antoniou2018]].`],
 [5,`Why are people with a new ileostomy readmitted?`,`20% are readmitted within 30 days, and dehydration accounts for 6% [[Vogel2022]].`],
 [5,`What is a high-output stoma?`,`Small-bowel output above about 1.5–2.0 L in 24 h, causing water, sodium and often magnesium depletion [[Nightingale2022]].`],
 [5,`How does acute oxaliplatin neuropathy behave?`,`It starts within hours to 2 days of a dose, is triggered or worsened by cold, and resolves within 14 days [[FDA-OxaliplatinGland]].`],
 [5,`Which drug has evidence for painful chemotherapy-induced neuropathy?`,`Duloxetine, with limited benefit; no agent is recommended to prevent it [[Loprinzi2020]].`],
 [5,`What is capecitabine's hallmark toxicity?`,`Hand-foot syndrome: 60% any grade and 17% grade 3–4 in the X-ACT label table [[FDA-Xeloda]].`],
 [5,`What does CPIC say for a DPYD activity score of 1?`,`Intermediate metabolizer: reduce the starting dose by 50%, as published; poor metabolizers avoid 5-FU and its prodrugs [[Amstutz2018]].`],
 [5,`What follow-up does ASCO endorse after curative treatment?`,`History, examination and CEA every 3–6 months for 5 years; CT chest/abdomen yearly for 3 years; colonoscopy at 1 year [[Meyerhardt2013]].`],
 [5,`When do most recurrences happen?`,`80% within 3 years of surgery, in 18 pooled adjuvant colon trials [[Sargent2005]].`],
 [5,`What did the CHALLENGE trial show?`,`A 3-year structured exercise programme after adjuvant chemotherapy improved disease-free survival (HR 0.72; 5-year DFS 80.3% vs 73.9%) [[Courneya2025]].`],
 [5,`Does more intensive follow-up lengthen life?`,`No: FACS, COLOFOL and GILDA found recurrence earlier but no overall survival gain [[Primrose2014,WilleJorgensen2018,Rosati2016]].`],
 [5,`Why mark the stoma site before surgery?`,`It makes independent stoma care and predictable pouch wear more likely [[Salvadalena2015]]; in emergency surgery complications fell from 36% to 24% <span class="ev early">Early evidence</span> [[Nozawa2024]].`],
 [5,`Split-dose or day-before bowel prep?`,`Split-dose: better cleansing (OR 2.51) and more willingness to repeat [[Martel2015]].`],
 /* ---- Part 6: history ---- */
 [6,`Who described abdominoperineal excision, and when?`,`W. Ernest Miles, in The Lancet in 1908 [[Miles1908]].`],
 [6,`What did Cuthbert Dukes publish in 1932?`,`A classification of rectal cancer: A within the wall, B through the wall without nodes, C regional nodes [[Dukes1932]].`],
 [6,`What was Warthin's Family G?`,`A family described from 1895 and published in 1913, now recognised as the first reported Lynch syndrome family; an MSH2 splice-site mutation was later confirmed [[Warthin1913,Douglas2005,Campos2024]].`],
 [6,`What did Muto, Bussey and Morson establish in 1975?`,`That most colorectal cancers evolve through a polyp-to-cancer sequence, although most adenomas never become cancer [[Muto1975]].`],
 [6,`When was colonoscopic polypectomy first reported?`,`1973, by Wolff and Shinya, through the fibreoptic colonoscope [[Wolff1973NEJM]].`],
 [6,`What did the Minnesota trial show in 1993?`,`Annual guaiac FOBT cut 13-year colorectal cancer mortality by 33% [[Mandel1993]].`],
 [6,`When were APC and MSH2 identified?`,`APC on 5q21 in 1991 [[Kinzler1991,Groden1991]]; MSH2, the first Lynch mismatch-repair gene, in 1993 [[Fishel1993,Leach1993]].`],
 [6,`What did Heald propose in 1982?`,`Total excision of the mesorectum, after finding tumour foci several centimetres beyond the visible tumour edge [[Heald1982]].`],
 [6,`What was the first evidence that dMMR colorectal cancer responds to PD-1 blockade?`,`Le 2015: pembrolizumab gave a 40% immune-related response in dMMR vs 0% in pMMR colorectal cancer [[Le2015]].`]
];
const CR_MN=[
 ["3-2-1-0","well known",`Amsterdam II: 3 relatives with a Lynch-associated cancer (one a first-degree relative of the other two), 2 successive generations, 1 diagnosed before 50, 0 FAP [[Vasen1999,Syngal2015]].`],
 ["APC opens, KRAS grows, 18q and 17p invade","memory aid",`The classic order: APC early (63% of adenomas, even 0.5 cm) [[Powell1992]], ras as adenomas grow (9% under 1 cm, 58% over), 18q loss in advanced adenomas and 17p/TP53 loss at carcinoma [[Vogelstein1988]]. The accumulation matters more than the exact order [[Fearon1990]].`],
 ["15 = 3 + 12","memory aid",`MSI is about 15% of colorectal cancer: about 3% Lynch syndrome and about 12% sporadic MLH1 promoter methylation [[Boland2010]].`],
 ["S spots, L links","memory aid",`MutS (MSH2 with MSH6) spots the mismatch; MutL (MLH1 with PMS2) links it to the excision machinery [[Vilar2010,Boland2010]].`],
 ["One, two-three, four-six, seven","memory aid",`N1a 1 node, N1b 2–3, N2a 4–6, N2b 7 or more; N1c is tumour deposits with no positive nodes [[Amin2017AJCC,Tong2018]].`],
 ["12, 8, 35","memory aid",`Quality numbers: at least 12 nodes examined [[Baxter2022]]; withdrawal ≥8 minutes and screening ADR ≥35% [[Rex2024]].`],
 ["Left loves EGFR","memory aid",`Anti-EGFR antibodies help left-sided RAS wild-type tumours, not right-sided ones (OS HR 0.75 vs 1.12) [[Arnold2017]]. Check RAS first: RAS-mutant tumours do not benefit [[Sepulveda2017]].`],
 ["BRAF before Lynch","memory aid",`MLH1 lost and BRAF V600E present? Think sporadic methylation before Lynch syndrome; a wild-type BRAF does not exclude Lynch [[Sepulveda2017]].`],
 ["Cold bites oxaliplatin","memory aid",`Acute oxaliplatin neuropathy is triggered by cold, starts within hours to 2 days and resolves within 14 days; the label advises avoiding cold drinks and ice [[FDA-OxaliplatinGland]].`],
 ["Urgency 16, clustering 11","memory aid",`The two heaviest LARS items: urgency scores up to 16 and clustering up to 11 [[Christensen2021]]; 30 or more is major LARS [[Emmertsen2012]].`]
];
const CR_RV_STEPS=[
 {from:0,at:.19,k:'3 · relatives',t:'Three relatives',txt:`Amsterdam II needs at least three relatives with a Lynch-associated cancer: colorectal, endometrial, small bowel, ureter or renal pelvis. One must be a first-degree relative of the other two [[Vasen1999,Syngal2015]]. Here a grandfather and two of his children qualify.`,pt:'Three people in the family have had a cancer that Lynch syndrome can cause.',hook:'Lynch-associated cancers for Amsterdam II: colorectum, endometrium, small bowel, ureter, renal pelvis.'},
 {from:.25,at:.4,k:'2 · generations',t:'Two generations',txt:`At least two successive generations must be affected [[Vasen1999,Syngal2015]]. The grandfather (generation I) and his son and daughter (generation II) make two. Lynch syndrome is autosomal dominant, so it passes vertically from parent to child [[Syngal2015]].`,pt:'The cancers show up in parents and their children, not only among brothers and sisters.',hook:'Autosomal dominant: vertical transmission, men and women affected alike.'},
 {from:.48,at:.6,k:'1 · before 50',t:'One before 50',txt:`At least one cancer must be diagnosed before age 50 [[Vasen1999,Syngal2015]]. The daughter's endometrial cancer at 46 meets it. Endometrial cancer is common in Lynch syndrome: to age 75, 37.0% for MLH1, 48.9% for MSH2 and 41.1% for MSH6 carriers [[DominguezValentin2020]].`,pt:'Cancer at a young age is a warning sign of an inherited cause.',hook:'Endometrial cancer counts toward Amsterdam II, not only colorectal cancer.'},
 {from:.68,at:.79,k:'0 · FAP',t:'Zero FAP',txt:`Familial adenomatous polyposis must be excluded and the tumours verified where possible [[Vasen1999,Syngal2015]]. FAP brings hundreds of adenomas [[Galiatsatos2006]]; Lynch syndrome was first described as familial colonic cancer without antecedent polyposis [[Boland1984]].`,pt:'The family does not have the polyp condition (FAP), which needs a different plan.',hook:'3-2-1-0: 3 relatives, 2 generations, 1 before 50, 0 FAP.'},
 {from:.84,at:.97,k:'Next step',t:'Test the tumour, then the family',txt:`Each child of a carrier has a 50% chance of inheriting the variant [[Syngal2015]]. Family criteria miss many carriers: 28% of Lynch cases in one cohort did not meet the revised Bethesda guidelines [[Hampel2008]], so all new colorectal cancers are tested for mismatch-repair deficiency [[Syngal2015]].`,pt:'A test on the tumour, then a blood test, shows who in the family carries the gene change and needs early colonoscopy.',hook:'Universal tumour MMR testing: sensitivity 100% vs 87.8% for the Bethesda guidelines [[Moreira2012]].'}
];
const CR_RV_PED=[
 /* key, x, y, sex, generation, label, cancer, age, affected order */
 ['gf',110,62,'m',1,'Grandfather','Colorectal','61',0],['gm',190,62,'f',1,'Grandmother','','',-1],
 ['un',70,164,'m',2,'Uncle','Colorectal','53',1],['au',150,164,'f',2,'Aunt','','',-1],['mo',230,164,'f',2,'Mother','Endometrial','46',2],['fa',310,164,'m',2,'Father','','',-1],
 ['pb',230,266,'m',3,'Proband','','',-1],['si',310,266,'f',3,'Sister','','',-1]
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(CR_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=CR_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=CR_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=CR_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=CR_MN.map(m=>`<div class="card"><span class="tag ${m[1]==='well known'?'good':'accent'}">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: Amsterdam II, 3-2-1-0 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  /* a pedigree symbol with a fill that can fade in; half=true shades the left half (carrier chance) */
  const sym=(x,y,sex,fill,op,half)=>{const r=12;
    if(half){const w=r;return sex==='m'?`<rect x="${x-r}" y="${y-r}" width="${w}" height="${2*r}" style="fill:${fill};opacity:${f1(op)}"/>`:`<path d="M${x} ${y-r}A${r} ${r} 0 0 0 ${x} ${y+r}Z" style="fill:${fill};opacity:${f1(op)}"/>`}
    return sex==='m'?`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="1.5" style="fill:${fill};opacity:${f1(op)}"/>`:`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${fill};opacity:${f1(op)}"/>`};
  const outl=(x,y,sex)=>{const r=12;return sex==='m'?`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="1.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`:`<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`};
  const ln=(x1,y1,x2,y2,st='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--ink);stroke-width:1.4;${st}"/>`;
  function draw(t){
    const N=vb(svg,'720 380','400 700');
    const P=N?{x:24,y:6}:{x:14,y:18},C=N?{x:24,y:352}:{x:404,y:22};
    const aff=[ramp(t,.03,.08),ramp(t,.08,.13),ramp(t,.13,.18)];
    const fdr=ramp(t,.15,.19)*(1-ramp(t,.27,.31));
    const g2=ramp(t,.27,.38),u50=ramp(t,.5,.6),fap=ramp(t,.69,.78),nx=ramp(t,.85,.95);
    let s=`<g transform="translate(${P.x} ${P.y})">`;
    /* generation bands */
    [[1,62],[2,164],[3,266]].forEach(([g,y],k)=>{const on=g<3?g2:0;
      s+=`<rect x="0" y="${y-30}" width="352" height="${g<3?60:60}" rx="8" style="fill:var(--brand-soft);opacity:${f1(on*.85)}"/>`;
      s+=`<text class="t-lbl" x="8" y="${y+5}" style="fill:var(${on>.5?'--brand':'--muted'})">${['I','II','III'][k]}</text>`});
    /* lines: marriages, descent, sibships */
    s+=ln(122,62,178,62)+ln(150,62,150,116)+ln(70,116,230,116)+ln(70,116,70,152)+ln(150,116,150,152)+ln(230,116,230,152);
    s+=ln(242,164,298,164)+ln(270,164,270,218)+ln(230,218,310,218)+ln(230,218,230,254)+ln(310,218,310,254);
    /* first-degree links from the grandfather to his two affected children */
    if(fdr>0)s+=`<g style="opacity:${f1(fdr)}"><path d="M98 70 Q60 100 64 150" style="fill:none;stroke:var(--gold);stroke-width:2.2;stroke-dasharray:4 3"/><path d="M122 70 Q210 92 226 150" style="fill:none;stroke:var(--gold);stroke-width:2.2;stroke-dasharray:4 3"/><text class="t-xs" x="200" y="96">first-degree relative of both</text></g>`;
    CR_RV_PED.forEach(([key,x,y,sex,g,nm,ca,age,ord])=>{
      s+=`<g>${sym(x,y,sex,'var(--panel)',1)}`;
      if(ord>=0&&aff[ord]>0)s+=sym(x,y,sex,'var(--tumour)',aff[ord]);
      if((key==='pb'||key==='si')&&nx>0)s+=sym(x,y,sex,'var(--polyp)',nx,true);
      s+=outl(x,y,sex)+'</g>';
      s+=`<text class="t-xs t-mid" x="${x}" y="${y+24}">${nm}</text>`;
      if(ord>=0&&aff[ord]>0){const hot=key==='mo'&&u50>0;
        s+=`<text class="t-xs t-mid" x="${x}" y="${y+35}" style="opacity:${f1(aff[ord])};fill:var(${hot?'--ink':'--muted'});${hot?'font-weight:700':''}">${ca} · ${age}</text>`}
    });
    /* the under-50 ring */
    if(u50>0)s+=`<circle cx="230" cy="164" r="${f1(16+4*(1-u50))}" style="fill:none;stroke:var(--gold);stroke-width:3;opacity:${f1(u50)}"/><text class="t-sm" x="252" y="146" style="fill:var(--ink);opacity:${f1(u50)}">46 &lt; 50</text>`;
    /* proband arrow and the 50% labels */
    if(nx>0){s+=`<g style="opacity:${f1(nx)}"><path d="M196 300 L214 282" style="stroke:var(--ink);stroke-width:1.8"/><path d="M219 277 L208 281 L215 288 Z" style="fill:var(--ink)"/>`;
      s+=`<text class="t-sm t-mid" x="230" y="242" style="fill:var(--ink)">50%</text><text class="t-sm t-mid" x="310" y="242" style="fill:var(--ink)">50%</text></g>`}
    s+='</g>';
    /* the checklist */
    const n3=aff.filter(v=>v>.5).length;
    const met=[n3>=3,g2>.5,u50>.5,fap>.5],cnt=met.filter(Boolean).length;
    const rows=[['3','relatives with a Lynch cancer',`counted: ${n3} of 3`],['2','successive generations',g2>.5?'generations I and II':'not yet shown'],['1','diagnosed before age 50',u50>.5?'endometrial cancer at 46':'not yet shown'],['0','FAP',fap>.5?'excluded; tumours verified':'not yet checked']];
    s+=`<g transform="translate(${C.x} ${C.y})"><text class="t-lbl" x="0" y="12">Amsterdam II checklist</text>`;
    rows.forEach(([d,a,b],k)=>{const y=48+k*50,h=met[k];
      s+=`<circle cx="17" cy="${y}" r="16" style="fill:var(${h?'--good-soft':'--field'});stroke:var(${h?'--good':'--line'});stroke-width:1.8"/><text class="t-big t-mid" x="17" y="${y+6}" style="fill:var(${h?'--good':'--muted'})">${d}</text>`;
      s+=`<text class="t-lbl" x="44" y="${y-2}" style="${h?'':'fill:var(--muted)'}">${a}</text><text class="t-xs" x="44" y="${y+13}">${b}</text>`;
      if(h)s+=`<path d="M290 ${y-4} L296 ${y+3} L308 ${y-10}" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round"/>`});
    /* FAP comparison: a few polyps here vs hundreds in FAP */
    if(fap>0){const rr=rng(11);let fp='';for(let k=0;k<70;k++)fp+=`<circle cx="${f1(176+rr()*128)}" cy="${f1(252+rr()*16)}" r="1.9" style="fill:var(--polyp)"/>`;
      s+=`<g style="opacity:${f1(fap)}"><rect x="0" y="246" width="136" height="28" rx="14" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/><circle cx="48" cy="260" r="3" style="fill:var(--polyp)"/><circle cx="96" cy="258" r="2.5" style="fill:var(--polyp)"/>`;
      s+=`<rect x="172" y="246" width="136" height="28" rx="14" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/>${fp}<text class="t-xs" x="0" y="288">this family: few polyps</text><text class="t-xs" x="172" y="288">FAP: hundreds of adenomas</text></g>`}
    const v=nx>.5?'Next: test the tumour, then the family':cnt<4?`Criteria met: ${cnt} of 4`:'Amsterdam II met: 3-2-1-0';
    s+=`<text class="t-big" x="0" y="${fap>0?318:300}" style="fill:var(${cnt===4?'--good':'--ink'})">${v}</text>`;
    if(nx>0)s+=`<text class="t-sm" x="0" y="338" style="opacity:${f1(nx)}">Each child of a carrier: a 50% chance</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(CR_RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(CR_RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,15000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),CR_RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const CR_QZ=[
 /* ---- Part 1 ---- */
 [1,`As a cause of cancer death worldwide, colorectal cancer ranks:`,[`Second`,`First`,`Third`,`Fifth`],0,`Second (9.3% of cancer deaths), and third for new cases (9.6%) in GLOBOCAN 2022 [[Bray2024]].`],
 [1,`The US lifetime risk of developing colorectal cancer is closest to:`,[`1 in 8`,`1 in 24 for men`,`1 in 100`,`1 in 500`],1,`4.1% (1 in 24) for males and 3.8% (1 in 26) for females [[Siegel2025]].`],
 [1,`Compared with people born around 1950, those born around 1990 have a rectal cancer risk about:`,[`Half as high`,`The same`,`Twice as high`,`Four times as high`],3,`IRR 4.32 for rectal cancer and 2.40 for colon cancer in SEER 1974–2013 [[Siegel2017]].`],
 [1,`The rise in early-onset colorectal cancer is driven mainly by tumours in the:`,[`Caecum and ascending colon`,`Appendix only`,`Distal colon and rectum`,`Transverse colon`],2,`Sigmoid and rectal cancers nearly doubled at ages 20–49 from 1998 to 2022, against a 26% rise in proximal tumours [[Siegel2026CRC]].`],
 [1,`Which marker identifies the cycling stem cells at the base of colonic crypts?`,[`Lgr5`,`CDX2`,`CEA`,`Ki-67 only`],0,`Lgr5, a Wnt target gene; one Lgr5+ cell generated all epithelial lineages in mice [[Barker2007]].`],
 [1,`Loss of APC leads to:`,[`Degradation of β-catenin`,`Loss of KRAS activity`,`Mismatch-repair deficiency`,`Stabilised β-catenin binding Tcf-4`],3,`Without APC, β-catenin escapes the destruction complex and binds Tcf-4, switching on Wnt targets constitutively [[Korinek1997,Stamos2013]].`],
 [1,`In Vogelstein's 1988 data, ras mutations were found in what share of adenomas over 1 cm?`,[`9%`,`25%`,`58%`,`95%`],2,`58% of adenomas over 1 cm vs 9% under 1 cm, and 47% of carcinomas [[Vogelstein1988]].`],
 [1,`Which gene is called the "gatekeeper" because it is mutated early and its frequency does not rise from adenoma to carcinoma?`,[`TP53`,`SMAD4`,`APC`,`PIK3CA`],2,`APC mutations were found in 63% of adenomas, even 0.5 cm ones, and 60% of carcinomas [[Powell1992]].`],
 [1,`About how long does it take a large benign tumour to evolve into an advanced cancer?`,[`About 6 months`,`About 2 years`,`About 17 years`,`About 50 years`],2,`About 17 years by comparative lesion sequencing, but under 2 years to gain metastatic ability [[Jones2008]].`],
 [1,`What share of colorectal cancers show microsatellite instability?`,[`About 15%`,`About 1%`,`About 40%`,`About 75%`],0,`About 15%: about 3% from Lynch syndrome and about 12% from sporadic MLH1 promoter methylation [[Boland2010]].`],
 [1,`dMMR tumours carry about how many more somatic mutations than pMMR tumours?`,[`About the same`,`About 2 times`,`About 25 times`,`About 1,000 times`],2,`Mean 1,782 vs 73 somatic mutations per tumour [[Le2015]].`],
 [1,`One affected first-degree relative raises colorectal cancer risk roughly:`,[`10%`,`2-fold`,`5-fold`,`10-fold`],1,`Pooled RR 2.24, and 3.97 with two or more affected relatives [[Butterworth2006]].`],
 [1,`IARC classifies processed meat as:`,[`Group 1, carcinogenic to humans`,`Group 2A`,`Group 2B`,`Group 3, not classifiable`],0,`Processed meat is Group 1; red meat is Group 2A, probably carcinogenic [[Bouvard2015]].`],
 [1,`In ASPREE (people aged 70 and older), daily low-dose aspirin:`,[`Halved colorectal cancer`,`Cut all-cause death`,`Was linked to higher cancer mortality`,`Had no measurable effects of any kind`],2,`Cancer death 3.1% vs 2.3% (HR 1.31) [[McNeil2018]]; aspirin was also linked to more stage 4 cancer at diagnosis [[McNeil2021]].`],
 [1,`Which is NOT a Lynch syndrome gene?`,[`MLH1`,`MSH6`,`EPCAM`,`APC`],3,`Lynch syndrome is caused by MLH1, MSH2, MSH6, PMS2 or EPCAM [[Syngal2015]]. APC causes FAP [[Galiatsatos2006]].`],
 [1,`The Amsterdam II criteria require all of the following EXCEPT:`,[`Three relatives with a Lynch-associated cancer`,`Two successive generations`,`One diagnosis before 50`,`A proven germline variant`],3,`Amsterdam II is a family-history rule: 3 relatives, 2 generations, 1 before 50, FAP excluded [[Vasen1999,Syngal2015]].`],
 [1,`Universal MMR testing of tumours compared with the Bethesda guidelines for finding Lynch syndrome:`,[`Sensitivity 100% vs 87.8%`,`Sensitivity 50% vs 90%`,`Identical`,`Universal testing misses most cases`],0,`In 10,206 probands, universal tumour testing had 100% sensitivity vs 87.8% for Bethesda [[Moreira2012]].`],
 [1,`FAP is caused by germline variants in:`,[`MUTYH, recessive`,`STK11, dominant`,`APC, dominant`,`SMAD4, recessive`],2,`APC on 5q21, autosomal dominant [[Galiatsatos2006]]. MUTYH causes recessive MAP; STK11 causes Peutz–Jeghers [[Zaffaroni2024,Beggs2010]].`],
 /* ---- Part 2 ---- */
 [2,`The USPSTF 2021 grade for screening adults aged 45–49 is:`,[`A`,`B`,`C`,`D`],1,`B for 45–49, A for 50–75 and C for 76–85 [[USPSTF2021]].`],
 [2,`Which guideline still starts average-risk screening at 50?`,[`USPSTF 2021`,`ACS 2026`,`USMSTF 2022`,`ACP 2023`],3,`ACP 2023 starts at 50 and suggests considering not screening at 45–49 [[Qaseem2023]].`],
 [2,`According to ACS 2026, blood-based screening tests are recommended:`,[`As first choice for everyone`,`Every year from 40`,`Never`,`Only for people who decline or do not complete preferred tests`],3,`Blood tests are reserved for people who decline or do not complete the preferred tests [[Wolf2026]].`],
 [2,`The pooled sensitivity and specificity of FIT for colorectal cancer are about:`,[`0.40 and 0.60`,`0.79 and 0.94`,`0.99 and 0.50`,`0.95 and 0.99`],1,`0.79 and 0.94 in a 19-study meta-analysis; one sample performed as well as several [[Lee2014]].`],
 [2,`A single FIT's sensitivity for advanced adenomas at 10 µg/g is about:`,[`0.10`,`0.40`,`0.75`,`0.95`],1,`0.40 (0.33–0.47), which is why FIT has to be repeated [[Imperiale2019]].`],
 [2,`Lowering England's FIT threshold from 120 to 20 µg/g would (pilot estimates):`,[`Find more cancers but refer more people`,`Find fewer cancers`,`Refer fewer people`,`Change nothing`],0,`Cancer sensitivity rises from 47.8% to 82.2% but referrals rise from 2.1% to 7.8% of participants [[Li2021]].`],
 [2,`Compared with FIT, multitarget stool DNA has:`,[`Higher sensitivity and higher specificity`,`Lower sensitivity and higher specificity`,`Higher sensitivity and lower specificity`,`Identical accuracy`],2,`Cancer sensitivity 92.3% vs 73.8%; specificity 86.6% vs 94.9% [[Imperiale2014]].`],
 [2,`In ECLIPSE, the Shield blood test detected what share of advanced precancerous lesions?`,[`13.2%`,`43.4%`,`83.1%`,`94%`],0,`13.2%, against 83.1% of cancers [[Chung2024]].`],
 [2,`In NordICC, an invitation to colonoscopy:`,[`Halved colorectal cancer deaths`,`Had no effect on incidence`,`Raised all-cause mortality`,`Lowered 10-year incidence (RR 0.82) without a significant drop in death`],3,`Only 42% attended. Incidence RR 0.82; colorectal cancer death RR 0.90, not significant [[Bretthauer2022]].`],
 [2,`Each 1% rise in a colonoscopist's adenoma detection rate is linked to about how much lower interval-cancer risk?`,[`0.1%`,`3%`,`30%`,`50%`],1,`HR 0.97 per 1% ADR in 314,872 colonoscopies [[Corley2014]].`],
 [2,`The 2024 ACG/ASGE minimum screening ADR overall is:`,[`15%`,`25%`,`35%`,`50%`],2,`≥35% overall (≥40% in men, ≥30% in women); ≥50% after a positive stool test [[Rex2024]].`],
 [2,`A withdrawal time under 6 minutes is linked to an interval-cancer rate about:`,[`Halved`,`Unchanged`,`2.3 times higher`,`10 times higher`],2,`IRR 2.3 (1.5–3.4) [[Shaukat2015]]. The 2024 target is an average of at least 8 minutes [[Rex2024]].`],
 [2,`Serious harms of screening colonoscopy in the USPSTF review were about:`,[`3 perforations and 15 major bleeds per 10,000`,`1 perforation per 100`,`5 deaths per 1,000`,`No measurable harms`],0,`Perforation 3.1 and major bleeding 14.6 per 10,000 procedures [[Lin2021]].`],
 [2,`After a positive FIT, colonoscopy delayed beyond 12 months was associated with:`,[`More cancer (OR 2.25) and more advanced-stage disease`,`No change in risk`,`Fewer cancers`,`Only more polyps`],0,`OR 2.25 for cancer and 3.22 for advanced stage; 2–9 months carried no excess risk [[Corley2017]].`],
 [2,`USMSTF 2020 interval after removal of 1–2 tubular adenomas under 10 mm:`,[`1 year`,`3 years`,`7–10 years`,`Never again`],2,`7–10 years [[Gupta2020]].`],
 [2,`USMSTF 2020 interval after piecemeal resection of an adenoma ≥20 mm:`,[`6 months`,`3 years`,`5 years`,`10 years`],0,`6 months, to check for residual polyp [[Gupta2020]].`],
 [2,`A person whose sister had colorectal cancer at 48 should, per USMSTF 2017, start colonoscopy at:`,[`45`,`50`,`38`,`40, every 10 years`],2,`Age 40 or 10 years before the youngest relative's diagnosis, whichever is earlier: 48 − 10 = 38, then every 5 years [[Rex2017]].`],
 [2,`Flexible sigmoidoscopy in PLCO reduced mortality from:`,[`Proximal cancer only`,`Both equally`,`Distal cancer, not proximal`,`Neither`],2,`Distal colorectal cancer mortality fell 50%; proximal mortality RR 0.97 [[Schoen2012]].`],
 [2,`The National Polyp Study found that removing adenomas reduced colorectal cancer mortality by about:`,[`10%`,`25%`,`53%`,`90%`],2,`12 deaths vs 25.4 expected, a standardised ratio of 0.47 [[Zauber2012]].`],
 [2,`Compared with a day-before regimen, split-dose bowel preparation:`,[`Gave worse cleansing`,`Made no difference`,`Was too poorly tolerated to repeat`,`Gave better cleansing (OR 2.51)`],3,`Split dosing gave better cleansing and more willingness to repeat (OR 1.90) [[Martel2015]].`],
 /* ---- Part 3 ---- */
 [3,`The commonest presenting feature of colorectal cancer in people under 50 is:`,[`Haematochezia`,`Weight loss`,`Jaundice`,`Bowel obstruction`],0,`Haematochezia (45%), then abdominal pain (40%) and altered bowel habit (27%) [[Demb2024]].`],
 [3,`UK guidance uses which FIT result to select symptomatic patients for urgent referral?`,[`fHb ≥10 µg Hb/g`,`fHb ≥120 µg Hb/g`,`Any detectable blood`,`FIT is not used in symptomatic patients`],0,`fHb ≥10 µg Hb/g, and patients should not be excluded from referral on FIT alone [[Monahan2022]].`],
 [3,`In England 2006–2008, about what share of colorectal cancers were diagnosed as emergencies?`,[`2%`,`10%`,`26%`,`60%`],2,`26%, with 1-year relative survival of 50% vs 98% for screen-detected cancer [[EllissBrookes2012]].`],
 [3,`About how many people with colorectal cancer have a synchronous second colorectal cancer?`,[`1 in 4`,`1 in 1,000`,`1 in 25`,`None`],2,`3.9% in a Dutch registry, so the whole colon should be examined, preferably before surgery [[Mulder2011]].`],
 [3,`In MERCURY, an MRI-involved circumferential margin was defined as tumour within:`,[`1 mm of the mesorectal fascia`,`5 cm of the anal verge`,`2 cm of the distal margin`,`10 mm of a lymph node`],0,`≤1 mm; it predicted worse 5-year survival (HR 1.97) and local recurrence (HR 3.50) [[Taylor2014]].`],
 [3,`Which statement about CEA is correct?`,[`It is a good screening test`,`It is only used in Lynch syndrome`,`It replaces CT in follow-up`,`It is of little use for early detection but used for prognosis and surveillance`],3,`CEA is "of little use in detecting early colorectal cancer" [[Duffy2001]]; ASCO uses it preoperatively and for surveillance [[Locker2006]].`],
 [3,`A tumour that invades through the muscularis propria into pericolorectal tissue is:`,[`T1`,`T2`,`T3`,`T4b`],2,`T3. T2 invades the muscularis propria; T4a reaches the visceral peritoneum [[Amin2017AJCC,Tong2018]].`],
 [3,`Metastasis in 4–6 regional lymph nodes is:`,[`N1b`,`N1c`,`N2a`,`N2b`],2,`N2a is 4–6 nodes; N2b is 7 or more [[Amin2017AJCC,Tong2018]].`],
 [3,`N1c means:`,[`Tumour deposits with no positive lymph nodes`,`One positive node`,`Seven or more nodes`,`Peritoneal metastasis`],0,`Tumour deposits in subserosa, mesentery or pericolic/perirectal tissue with no positive nodes [[Amin2017AJCC,Tong2018]].`],
 [3,`Peritoneal metastasis in the AJCC 8th edition is:`,[`M1a, stage IVA`,`M1b, stage IVB`,`M1c, stage IVC`,`T4a`],2,`M1c and stage IVC were the main new categories in the 8th edition [[Tong2018]].`],
 [3,`T3 N0 M0 is stage:`,[`I`,`IIA`,`IIIA`,`IVA`],1,`IIA. T4a N0 is IIB and T4b N0 is IIC [[Amin2017AJCC,Tong2018]].`],
 [3,`The "survival paradox" refers to:`,[`Stage I doing worse than stage II`,`Rectal cancer always doing worse`,`Stage IIIA doing better than stage IIB`,`Women doing worse than men`],2,`IIIA 83.4% vs IIB 72.2% 5-year survival in SEER [[OConnell2004]]; it persists under the 8th edition [[Yu2024]].`],
 [3,`The minimum number of lymph nodes that should be examined is:`,[`4`,`8`,`12`,`20`],2,`At least 12; fewer than 12 is a high-risk feature in stage II [[Baxter2022,Chang2007]].`],
 [3,`Which is NOT an ASCO 2022 high-risk feature in stage II colon cancer?`,[`T4 tumour`,`Fewer than 12 nodes`,`Perforation`,`Left-sided location`],3,`High-risk features include T4, fewer than 12 nodes, perineural or lymphovascular invasion, poor grade, obstruction, perforation and BD3 budding [[Baxter2022]].`],
 [3,`US 5-year relative survival for distant-stage colorectal cancer (2015–2021) is about:`,[`5%`,`15%`,`50%`,`74%`],1,`Distant 15%, regional 74%, localized 91%; population statistics, not individual predictions [[Siegel2026]].`],
 [3,`An MLH1-deficient tumour with BRAF V600E most likely reflects:`,[`Lynch syndrome`,`FAP`,`MUTYH polyposis`,`Sporadic MLH1 promoter methylation`],3,`A BRAF mutation strongly favours sporadic disease, though its absence does not exclude Lynch [[Sepulveda2017]].`],
 [3,`Before cetuximab or panitumumab, which testing is required?`,[`Extended RAS: KRAS and NRAS exons 2, 3 and 4`,`KRAS exon 2 only`,`BRAF only`,`CEA level`],0,`Extended RAS testing; RAS-mutant tumours do not benefit [[Sepulveda2017,Douillard2013]].`],
 [3,`In stage II–III colon cancer, dMMR tumours are about what share?`,[`1%`,`15%`,`50%`,`80%`],1,`About 15% in adjuvant-trial cohorts, falling to 3.5–5% in metastatic disease [[Sargent2010,Koopman2009,Venderbosch2014]].`],
 [3,`In pooled first-line trials of RAS wild-type metastatic CRC, anti-EGFR therapy helped:`,[`Right-sided tumours only`,`Both sides equally`,`Left-sided tumours only`,`Neither side`],2,`OS HR 0.75 for left-sided vs 1.12 for right-sided tumours [[Arnold2017]].`],
 /* ---- Part 4 ---- */
 [4,`Total mesorectal excision removes:`,[`Only the tumour with a 5 cm margin`,`The whole colon`,`The anal sphincters routinely`,`The rectum with its intact mesorectal envelope`],3,`Heald found tumour foci in the mesorectum beyond the visible edge and proposed removing it intact [[Heald1982,Heald1986]].`],
 [4,`COST compared laparoscopic and open colectomy and found 3-year recurrence of:`,[`16% vs 18%`,`5% vs 30%`,`30% vs 5%`,`50% vs 50%`],0,`16% vs 18% (HR 0.86) with similar survival [[COST2004]].`],
 [4,`A defunctioning stoma after low anterior resection reduced symptomatic leak from:`,[`28.0% to 10.3%`,`10% to 5%`,`50% to 40%`,`It made no difference`],0,`28.0% to 10.3% in a Swedish RCT [[Matthiessen2007]].`],
 [4,`MOSAIC showed that adding oxaliplatin to 5-FU/leucovorin:`,[`Improved overall survival in stage II and III`,`Had no effect`,`Improved DFS, with an overall survival benefit in stage III`,`Worsened DFS`],2,`3-year DFS 78.2% vs 72.9% [[Andre2004]]; 6-year OS benefit in stage III only [[Andre2009]].`],
 [4,`In IDEA, 3 months of adjuvant therapy was non-inferior to 6 months for:`,[`FOLFOX overall`,`All high-risk patients`,`No regimen`,`CAPOX`],3,`CAPOX HR 0.95 met non-inferiority; FOLFOX HR 1.16 did not [[Grothey2018]].`],
 [4,`In IDEA, grade ≥2 neurotoxicity with FOLFOX was 16.6% at 3 months vs what at 6 months?`,[`17.0%`,`25.0%`,`47.7%`,`90%`],2,`47.7%; CAPOX was 14.2% vs 44.9% [[Grothey2018]].`],
 [4,`For stage II dMMR colon cancer, fluorouracil alone:`,[`Gives no benefit and may harm`,`Doubles survival`,`Is the standard of care`,`Prevents Lynch cancers`],0,`DFS HR 1.10 in dMMR; pooled stage II dMMR OS HR 2.95 with FU [[Sargent2010]].`],
 [4,`Short-course radiotherapy for rectal cancer is:`,[`5 × 5 Gy`,`25 × 2 Gy`,`1 × 20 Gy`,`50.4 Gy with oxaliplatin`],0,`5 × 5 Gy; in the Dutch TME trial it cut 10-year local recurrence from 11% to 5% [[vanGijn2011]].`],
 [4,`In CAO/ARO/AIO-94, preoperative vs postoperative chemoradiotherapy gave:`,[`Better survival`,`Worse local control`,`Better local control and less toxicity, same survival`,`More long-term toxicity`],2,`5-year local relapse 6% vs 13%, survival 76% vs 74% [[Sauer2004]].`],
 [4,`RAPIDO's total neoadjuvant therapy lowered disease-related treatment failure but at 5 years showed:`,[`More locoregional recurrence after resection (10% vs 6%)`,`Better overall survival in every subgroup`,`No difference in anything`,`Fewer distant metastases only in stage I`],0,`Locoregional recurrence after resection was 10% vs 6% [[Dijkstra2023]]; disease-related treatment failure 23.7% vs 30.4% [[Bahadoer2021]].`],
 [4,`With watch-and-wait after a clinical complete response, 2-year local regrowth is about:`,[`2%`,`25%`,`60%`,`90%`],1,`25.2% in the International Watch & Wait Database, 97% in the bowel wall [[vanderValk2018]].`],
 [4,`Which drug gave a 100% clinical complete response in the first 12 patients with dMMR rectal cancer?`,[`Bevacizumab`,`Cetuximab`,`Regorafenib`,`Dostarlimab`],3,`Dostarlimab, a PD-1 inhibitor; this is early evidence and not a labelled indication for localised rectal cancer [[Cercek2022,FDA-Jemperli]].`],
 [4,`The capecitabine label's boxed warning asks prescribers to:`,[`Test for DPYD variants before starting, unless treatment is urgent`,`Check CEA weekly`,`Avoid in left-sided tumours`,`Give with ice chips`],0,`Serious adverse reactions or death can occur with complete DPD deficiency [[FDA-Xeloda]].`],
 [4,`In KEYNOTE-177, first-line pembrolizumab in MSI-H/dMMR metastatic CRC gave median PFS of:`,[`16.5 vs 8.2 months`,`5.6 vs 2.2 months`,`30.3 vs 15.1 months`,`It was inferior to chemotherapy`],0,`16.5 vs 8.2 months, with fewer grade ≥3 treatment-related events (22% vs 66%) [[Andre2020]].`],
 [4,`For left-sided, RAS wild-type, MSS metastatic CRC, ASCO 2023 recommends first-line chemotherapy plus:`,[`Anti-EGFR therapy`,`Anti-VEGF only`,`Pembrolizumab`,`Encorafenib`],0,`Chemotherapy plus anti-EGFR; right-sided RAS wild-type disease gets anti-VEGF [[Morris2023]].`],
 [4,`BRAF V600E metastatic CRC is treated with encorafenib combined with:`,[`Cetuximab`,`Bevacizumab alone`,`Tamoxifen`,`Nothing else`],0,`An anti-EGFR antibody is needed; BEACON OS 9.0 vs 5.4 months with the triplet [[Kopetz2019]].`],
 [4,`After liver resection for colorectal metastases, actual 10-year survival suggested a cure rate of about:`,[`1 in 100`,`1 in 6`,`1 in 2`,`9 in 10`],1,`"At least a one in six chance of cure" in well-selected patients [[Tomlinson2007]].`],
 [4,`Which drug is NOT a later-line option for refractory metastatic CRC?`,[`Regorafenib`,`Trifluridine/tipiracil`,`Fruquintinib`,`Levamisole`],3,`Regorafenib, trifluridine/tipiracil and fruquintinib all extended survival in refractory disease [[Grothey2013,Mayer2015,Dasari2023]]. Levamisole belongs to the 1990 adjuvant era [[Moertel1990]].`],
 [4,`In DYNAMIC, ctDNA-guided management of stage II colon cancer:`,[`Doubled chemotherapy use`,`Worsened recurrence-free survival`,`Cut chemotherapy use (15% vs 28%) with non-inferior RFS`,`Was only tested in rectal cancer`],2,`2-year RFS 93.5% vs 92.4% [[Tie2022]].`],
 /* ---- Part 5 ---- */
 [5,`A LARS score of 32 means:`,[`No LARS`,`Minor LARS`,`Major LARS`,`The score only runs to 20`],2,`0–20 no LARS, 21–29 minor, 30–42 major [[Emmertsen2012]].`],
 [5,`The single heaviest-weighted item on the LARS score is:`,[`Frequency`,`Flatus incontinence`,`Urgency`,`Liquid-stool leakage`],2,`Urgency scores up to 16 points; clustering up to 11 [[Christensen2021]].`],
 [5,`Prophylactic mesh is strongly recommended by the European Hernia Society when creating:`,[`A loop ileostomy`,`Any anastomosis`,`No stoma`,`An end colostomy`],3,`End colostomy has the highest parastomal hernia incidence [[Antoniou2018]].`],
 [5,`Within 30 days of ileostomy creation, about what share of patients are readmitted?`,[`1%`,`20%`,`50%`,`80%`],1,`20% for any cause; 6% for dehydration [[Vogel2022]].`],
 [5,`High-output stoma is usually taken as output above about:`,[`200 mL a day`,`500 mL a day`,`1.5–2.0 L a day`,`5 L a day`],2,`Above about 1.5–2.0 L in 24 h, depleting water, sodium and magnesium [[Nightingale2022]].`],
 [5,`Acute oxaliplatin neuropathy is typically triggered by:`,[`Cold`,`Heat`,`Bright light`,`Fasting`],0,`Cold temperature or cold objects can trigger or worsen it; it resolves within 14 days [[FDA-OxaliplatinGland]].`],
 [5,`Which statement on chemotherapy-induced neuropathy is correct per ASCO 2020?`,[`Calcium-magnesium infusions prevent it`,`Acetyl-L-carnitine is recommended`,`No agent is recommended for prevention; duloxetine has evidence for painful CIPN`,`Nothing can be done`],2,`No preventive agent is recommended [[Loprinzi2020]]; IV calcium/magnesium did not prevent oxaliplatin neurotoxicity [[Loprinzi2014]].`],
 [5,`In the X-ACT label table, capecitabine caused hand-foot syndrome of any grade in about:`,[`9%`,`22%`,`60%`,`95%`],2,`60% any grade and 17% grade 3–4, vs 9% with FU/LV [[FDA-Xeloda]].`],
 [5,`CPIC 2017 guidance for a DPYD poor metabolizer (activity score 0) is to:`,[`Give the full dose`,`Reduce by 25%`,`Avoid 5-FU and its prodrugs`,`Double the dose`],2,`Avoid fluoropyrimidines; activity score 1 means a 50% starting-dose reduction, as published [[Amstutz2018]].`],
 [5,`After curative treatment, ASCO-endorsed follow-up includes colonoscopy at:`,[`1 month`,`5 years only`,`Never`,`1 year`],3,`Colonoscopy at 1 year, CEA every 3–6 months for 5 years and CT yearly for 3 years [[Meyerhardt2013]].`],
 [5,`What share of colon cancer recurrences occur within 3 years of surgery?`,[`20%`,`50%`,`80%`,`100%`],2,`80% in pooled adjuvant trials [[Sargent2005]].`],
 [5,`More intensive CEA and CT follow-up (FACS, COLOFOL, GILDA):`,[`Finds recurrence earlier but has not lengthened life`,`Doubles survival`,`Misses most recurrences`,`Was never tested`],0,`Earlier detection without an overall survival gain [[Primrose2014,WilleJorgensen2018,Rosati2016]].`],
 [5,`The CHALLENGE trial tested:`,[`A 3-year structured exercise programme after adjuvant chemotherapy`,`Aspirin after surgery`,`Vitamin D`,`A low-fat diet`],0,`Exercise improved DFS (HR 0.72) and overall survival (HR 0.63) [[Courneya2025]].`],
 [5,`Preoperative stoma education reduced peristomal skin complications from 19.4% to:`,[`9.5%`,`15%`,`19%`,`30%`],0,`RR 0.45, very low-certainty evidence [[Shi2025]].`],
 [5,`In a single US centre, what share of patients with early-onset colorectal cancer received fertility counselling?`,[`15.5%`,`50%`,`85%`,`100%`],0,`Only 15.5% of 194 [[Peng2025]].`],
 /* ---- Part 6 ---- */
 [6,`Abdominoperineal excision of the rectum was described in 1908 by:`,[`Cuthbert Dukes`,`Bill Heald`,`W. Ernest Miles`,`Henry Lynch`],2,`Miles, in The Lancet [[Miles1908]].`],
 [6,`Dukes C in the 1932 classification means:`,[`Growth limited to the wall`,`Spread through the wall without nodes`,`Regional lymph-node metastasis`,`Liver metastasis`],2,`A within the wall, B through it without nodes, C regional node metastasis [[Dukes1932]].`],
 [6,`Warthin's "Family G" is recognised as the first reported family with:`,[`FAP`,`Peutz–Jeghers syndrome`,`Juvenile polyposis`,`Lynch syndrome`],3,`An MSH2 splice-site mutation was later confirmed in the family [[Douglas2005,Campos2024]].`],
 [6,`The polyp-to-cancer sequence was set out in 1975 by:`,[`Muto, Bussey and Morson`,`Fearon and Vogelstein`,`Wolff and Shinya`,`Heald and Ryall`],0,`Muto, Bussey and Morson [[Muto1975]]; Fearon and Vogelstein added the genetic model in 1990 [[Fearon1990]].`],
 [6,`The Minnesota trial (1993) showed that annual guaiac FOBT cut colorectal cancer mortality by:`,[`5%`,`15%`,`33%`,`75%`],2,`33% at 13 years [[Mandel1993]].`],
 [6,`The first mismatch-repair gene linked to Lynch syndrome (HNPCC), identified in 1993, was:`,[`MLH1`,`PMS2`,`MSH2`,`APC`],2,`MSH2 [[Fishel1993,Leach1993]]; MLH1 followed in 1994 [[Bronner1994]].`],
 [6,`In 1990 Moertel showed that adjuvant fluorouracil plus levamisole for stage C colon cancer cut overall death rate by:`,[`5%`,`60%`,`It had no effect`,`33%`],3,`Recurrence fell 41% and deaths 33% [[Moertel1990]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(CR_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=CR_QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${CR_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      const ansL='%t:quiz.letters%'[Q[3]];
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'%t:quiz.correct%':'%t:quiz.wrong%'}</b> %t:quiz.answer_is{l:ansL}% ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'%t:quiz.next%':'%t:quiz.results%'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
const CR_GL=[
 ["Abdominoperineal resection (APR)",`Removal of the rectum and anus through the abdomen and perineum, leaving a permanent colostomy; first described by Miles in 1908 [[Miles1908]].`,"surgery"],
 ["Ablation (thermal)",`Destroying a tumour with heat. For liver metastases up to 3 cm it was non-inferior to resection for survival in COLLISION, with fewer adverse events [[vanderLei2025]].`,"metastatic"],
 ["Adenoma",`A benign glandular polyp, the usual precursor of colorectal cancer; most adenomas never become cancer [[Muto1975]].`,"sequence"],
 ["Adenoma–carcinoma sequence",`The stepwise progression from normal mucosa to adenoma to carcinoma as mutations accumulate [[Fearon1990,Muto1975]].`,"sequence"],
 ["Adenoma detection rate (ADR)",`The share of screening colonoscopies in which at least one adenoma is found; the 2024 minimum is 35% [[Rex2024]].`,"colonoscopy"],
 ["Adjuvant therapy",`Treatment given after surgery to lower the risk of recurrence, such as FOLFOX or CAPOX in stage III colon cancer [[Andre2004]].`,"chemo"],
 ["Advanced adenoma",`An adenoma with higher-risk features (in surveillance guidance: ≥10 mm, villous histology or high-grade dysplasia [[Gupta2020]]); it turns into cancer at about 2.6–5.6% a year [[Brenner2007]].`,"sequence"],
 ["Amsterdam II criteria",`A family-history rule for suspected Lynch syndrome: 3 relatives with a Lynch-associated cancer, 2 generations, 1 diagnosed before 50, FAP excluded [[Vasen1999,Syngal2015]].`,"genes"],
 ["Anastomotic leak",`Leakage from the join between two bowel ends; after low anterior resection a defunctioning stoma lowered symptomatic leak from 28.0% to 10.3% [[Matthiessen2007]].`,"surgery"],
 ["Anterior resection",`Removal of the upper (high) or whole (low) rectum with a join to the colon, preserving the anus [[Jayne2017]].`,"surgery"],
 ["Anti-EGFR antibody",`Cetuximab or panitumumab; effective only in RAS wild-type tumours, mainly left-sided ones [[Sepulveda2017,Arnold2017]].`,"metastatic"],
 ["APC",`The gatekeeper tumour-suppressor gene on 5q21, mutated early in most colorectal tumours and in the germline in FAP [[Powell1992,Galiatsatos2006]].`,"sequence"],
 ["Aspirin (chemoprevention)",`Long-term aspirin lowered colon cancer incidence after years of use [[Rothwell2010]] and colorectal cancer in Lynch carriers [[Burn2020]], but not in people over 70 [[McNeil2018]].`,"risk"],
 ["Attenuated FAP",`A milder form of FAP with usually 10–100 adenomas, later onset and lower cancer risk [[Half2009]].`,"genes"],
 ["Autosomal dominant",`Inheritance in which one variant copy is enough; each child of a carrier has a 50% chance of inheriting it (Lynch, FAP) [[Syngal2015]].`,"genes"],
 ["Autosomal recessive",`Inheritance needing two variant copies; MUTYH-associated polyposis follows this pattern [[Zaffaroni2024]].`,"genes"],
 ["Bethesda guidelines (revised)",`Criteria for testing tumours for MSI, such as colorectal cancer before 50; they missed 28% of Lynch cases in one cohort [[Umar2004,Hampel2008]].`,"genes"],
 ["Bevacizumab",`An anti-VEGF antibody; added to IFL it raised median survival from 15.6 to 20.3 months [[Hurwitz2004]]. Not indicated for adjuvant treatment [[FDA-Avastin]].`,"metastatic"],
 ["Big Bang model",`The proposal that a colorectal tumour grows mainly as one expansion, with most subclonal changes arising early <span class="ev early">Early evidence</span> [[Sottoriva2015]].`,"sequence"],
 ["Boston Bowel Preparation Scale",`A 0–9 score (0–3 for each of 3 colon segments); adequate prep is ≥2 in each segment [[Lai2009,Rex2024]].`,"colonoscopy"],
 ["BRAF V600E",`An activating BRAF mutation in about 8% of advanced CRC, linked to right-sided, MSI tumours and poor prognosis; targeted with encorafenib plus cetuximab [[Sepulveda2017,Kopetz2019]].`,"biomarkers"],
 ["β-catenin",`The Wnt-pathway protein that, when APC is lost, accumulates and binds Tcf-4 to switch on growth genes [[Korinek1997]].`,"sequence"],
 ["CADe (computer-aided detection)",`Software that flags polyps during colonoscopy; it raised ADR from 36.7% to 44.7%, but a mortality benefit is not shown <span class="ev early">Early evidence</span> [[Soleymanjahi2024]].`,"cure"],
 ["Caecal intubation",`Reaching the caecum, the start of the colon, documented by photo; the 2024 target is ≥95% [[Rex2024]].`,"colonoscopy"],
 ["Caecum",`The first part of the large intestine, where the terminal ileum enters [[Omole2025]].`,"colon"],
 ["Capecitabine",`An oral fluoropyrimidine; at least equivalent to bolus FU/LV as adjuvant therapy, with hand-foot syndrome as its hallmark toxicity [[Twelves2005,FDA-Xeloda]].`,"chemo"],
 ["CAPOX",`Capecitabine plus oxaliplatin; in IDEA, 3 months was non-inferior to 6 months [[Grothey2018]].`,"chemo"],
 ["CEA (carcinoembryonic antigen)",`A blood tumour marker used before surgery and for surveillance, not for early detection [[Duffy2001,Locker2006]].`,"symptoms"],
 ["Cetuximab",`An anti-EGFR antibody, "not indicated" for Ras-mutant colorectal cancer or when Ras results are unknown [[FDA-Erbitux]].`,"metastatic"],
 ["Chromosomal instability (CIN)",`Widespread gain and loss of chromosomes; the commonest route to colorectal cancer [[Pino2010]].`,"genes"],
 ["CIMP",`CpG island methylator phenotype: widespread promoter methylation, including nearly all BRAF-mutant tumours [[Weisenberger2006,Toyota1999]].`,"genes"],
 ["Circulating tumour DNA (ctDNA)",`Tumour DNA in the blood. After surgery a positive result signals a high relapse risk [[Reinert2019,Nakamura2024]].`,"cure"],
 ["Circumferential resection margin (CRM)",`The cut outer surface of a rectal cancer specimen; an involved margin predicts local recurrence [[Quirke1986,Nagtegaal2008]].`,"staging"],
 ["Clinical complete response (cCR)",`No detectable tumour on examination, endoscopy and imaging after treatment; the gateway to watch-and-wait [[HabrGama2004]].`,"rectal"],
 ["Colibactin",`A genotoxin made by pks+ E. coli that leaves a mutational signature (SBS88/ID18) in colorectal genomes [[PleguezuelosManzano2020]].`,"sequence"],
 ["Colonoscopy",`Endoscopic examination of the whole colon that can remove polyps in the same visit [[Zauber2012]].`,"colonoscopy"],
 ["Colostomy",`A stoma made from the colon; end colostomy carries the highest parastomal hernia risk [[Antoniou2018]].`,"living"],
 ["Complete mesocolic excision (CME)",`Colon cancer surgery in the mesocolic plane with central vascular ligation, the colon's analogue of TME [[Hohenberger2009]].`,"surgery"],
 ["Consensus molecular subtypes (CMS)",`Four expression-based subtypes: CMS1 MSI immune, CMS2 canonical, CMS3 metabolic, CMS4 mesenchymal [[Guinney2015]].`,"biomarkers"],
 ["Crohn's disease",`Inflammatory bowel disease; colorectal cancer HR 1.40, with excess risk confined to early-onset, colonic or PSC-associated disease [[Olen2020CD]].`,"risk"],
 ["Crypt",`A tube-shaped pit of the colonic lining with stem cells at its base; each holds 5–10 active stem cells [[Nicholson2018]].`,"colon"],
 ["Crypt fission",`Division of one crypt into two; normal crypts divide about every 30–40 years, adenomas far faster [[Baker2014]].`,"colon"],
 ["CT colonography",`CT imaging of the air-distended colon; sensitivity 0.90 for lesions ≥10 mm in ACRIN [[Johnson2008]]. Screening interval 5 years [[USPSTF2021]].`,"screening"],
 ["Cytoreductive surgery",`Removing all visible peritoneal tumour; adding HIPEC gave no survival benefit in PRODIGE 7 [[Quenet2021]].`,"metastatic"],
 ["Deep crypt secretory cell",`Reg4+ cells that replace Paneth cells as the colonic stem-cell niche [[Sasaki2016]].`,"colon"],
 ["Defunctioning stoma",`A temporary stoma that diverts stool from a new low join; 19% were never reversed in the Dutch TME trial [[denDulk2007]].`,"living"],
 ["Desmoid tumour",`A locally aggressive fibrous tumour; with duodenal cancer, a leading cause of death in FAP after colectomy [[Half2009]].`,"genes"],
 ["Disease-free survival (DFS)",`Time alive without recurrence; the main end point of adjuvant trials such as MOSAIC [[Andre2004]].`,"chemo"],
 ["dMMR / pMMR",`Mismatch-repair deficient or proficient, usually judged by immunohistochemistry for MLH1, MSH2, MSH6 and PMS2 [[Luchini2019]].`,"biomarkers"],
 ["Dostarlimab",`A PD-1 inhibitor that produced clinical complete responses in all early dMMR rectal cancer patients who completed treatment <span class="ev early">Early evidence</span> [[Cercek2022,Cercek2025]].`,"rectal"],
 ["DPD / DPYD",`Dihydropyrimidine dehydrogenase, which breaks down about 80% of a 5-FU dose, and its gene; variants raise toxicity [[Amstutz2018]].`,"chemo"],
 ["Dukes classification",`Cuthbert Dukes's 1932 rectal cancer staging: A within the wall, B through the wall, C lymph nodes [[Dukes1932]].`,"history"],
 ["Duloxetine",`An SNRI, the only agent with appropriate evidence for painful chemotherapy-induced neuropathy [[Loprinzi2020,Smith2013]].`,"nursing"],
 ["Early-onset colorectal cancer",`Colorectal cancer diagnosed before 50; incidence has risen 1–2% a year since the mid-1990s in the US [[Siegel2026CRC]].`,"what"],
 ["Emergency presentation",`Diagnosis after an emergency admission; 26% of English cases, with 1-year survival of 50% [[EllissBrookes2012]].`,"symptoms"],
 ["Encorafenib",`A BRAF inhibitor used with cetuximab, and first-line with chemotherapy, for BRAF V600E metastatic CRC [[Kopetz2019,Elez2025]].`,"metastatic"],
 ["EPCAM",`A gene next to MSH2; deletions of its 3′ end silence MSH2 and cause Lynch syndrome [[Ligtenberg2009]].`,"genes"],
 ["ERAS",`Enhanced recovery after surgery: a bundle including carbohydrate drinks, early feeding and mobilisation; it cut morbidity (RR 0.60) and stay by 2.28 days [[Greco2014]].`,"nursing"],
 ["Extended RAS testing",`Testing KRAS and NRAS exons 2, 3 and 4 before anti-EGFR therapy [[Sepulveda2017]].`,"biomarkers"],
 ["Extramural vascular invasion (EMVI)",`Tumour in veins beyond the bowel wall; MRI-EMVI predicted poorer 3-year relapse-free survival (35% vs 74%) [[Smith2008]].`,"staging"],
 ["Faecal immunochemical test (FIT)",`A stool test using antibodies to human haemoglobin; pooled sensitivity 0.79 and specificity 0.94 for cancer [[Lee2014]].`,"screening"],
 ["Familial adenomatous polyposis (FAP)",`Autosomal dominant APC syndrome with hundreds of adenomas and near-certain cancer without colectomy [[Galiatsatos2006,Zaffaroni2024]].`,"genes"],
 ["Family G",`Warthin's family, followed from 1895, now recognised as the first reported Lynch syndrome family [[Warthin1913,Campos2024]].`,"history"],
 ["Fear of recurrence",`Worry that cancer will return; the most prominent support need at every stage [[Kotronoulas2017]].`,"living"],
 ["fHb threshold",`The faecal haemoglobin cut-off above which FIT is called positive, in µg Hb/g; England's screening programme uses 120 [[Li2022]].`,"screening"],
 ["Field effect",`A field of cellular and molecular change that predisposes a whole territory of tissue to neoplasia [[Lochhead2015]].`,"sequence"],
 ["Financial toxicity",`Financial harm from cancer care; common in colorectal cancer across 65 studies [[Shao2026]].`,"living"],
 ["First-degree relative (FDR)",`A parent, sibling or child; one affected FDR roughly doubles colorectal cancer risk [[Butterworth2006]].`,"risk"],
 ["Flexible sigmoidoscopy",`Endoscopy of the distal colon; it prevents distal but not proximal cancer deaths [[Schoen2012]].`,"screening"],
 ["Fluorouracil (5-FU)",`The fluoropyrimidine backbone of colorectal chemotherapy, reported in 1957 [[Heidelberger1957]]; its label carries a DPYD boxed warning [[FDA-Fluorouracil]].`,"chemo"],
 ["FOLFOX",`Infusional fluorouracil, leucovorin and oxaliplatin; FOLFOX4 improved DFS in MOSAIC [[Andre2004]].`,"chemo"],
 ["FOLFOXIRI",`A triplet of fluorouracil, leucovorin, oxaliplatin and irinotecan; with bevacizumab it raised PFS in TRIBE at the cost of more toxicity [[Loupakis2014]].`,"metastatic"],
 ["Fruquintinib",`A VEGFR inhibitor for refractory metastatic CRC; FRESCO-2 OS 7.4 vs 4.8 months [[Dasari2023]].`,"metastatic"],
 ["Fusobacterium nucleatum",`An oral bacterium enriched in colorectal tumours; high load linked to worse survival <span class="ev early">Early evidence</span> [[Kostic2012,Castellarin2012,Mima2016]].`,"sequence"],
 ["Gatekeeper gene",`A gene whose mutation starts the clonal expansion; APC in colorectal cancer [[Vogelstein2013]].`,"sequence"],
 ["gFOBT",`Guaiac faecal occult blood test; annual testing cut colorectal cancer mortality by 33% in the Minnesota trial [[Mandel1993]].`,"screening"],
 ["Goblet cell",`A mucin-producing cell of the colonic crypt [[Baidoo2024]].`,"colon"],
 ["Haematochezia",`Visible red blood from the rectum; the commonest presenting feature under 50 (45%) [[Demb2024]].`,"symptoms"],
 ["Haggitt levels",`Levels of invasion in a pedunculated malignant polyp, from 0 (mucosa) to 4 (submucosa below the stalk) [[Haggitt1985]].`,"surgery"],
 ["Hallmarks of cancer",`The capabilities cancers acquire, such as sustained proliferative signalling, invasion and immune evasion [[Hanahan2011,Hanahan2022]].`,"sequence"],
 ["Hand-foot syndrome",`Palmar-plantar erythrodysesthesia: red, painful palms and soles, in 60% on adjuvant capecitabine [[FDA-Xeloda]].`,"chemo"],
 ["HER2 amplification",`Found in about 5% of KRAS exon 2 wild-type metastatic CRC; targeted with trastuzumab-based combinations [[SartoreBianchi2016,Strickler2023]].`,"biomarkers"],
 ["High-output stoma",`Small-bowel stoma output above about 1.5–2.0 L a day, causing water, sodium and magnesium loss [[Nightingale2022]].`,"living"],
 ["HIPEC",`Hyperthermic intraperitoneal chemotherapy; adding it to cytoreductive surgery did not improve survival [[Quenet2021]].`,"metastatic"],
 ["Hyperplastic polyp",`The commonest serrated polyp, mostly harmless when small and distal [[Crockett2019,Gupta2020]].`,"sequence"],
 ["Ileostomy",`A stoma made from the small bowel; dehydration is the leading reason for readmission [[Vogel2022,Messaris2012]].`,"living"],
 ["Interval cancer",`A cancer found between scheduled screens or after a negative colonoscopy; lower ADR means more interval cancers [[Kaminski2010]].`,"colonoscopy"],
 ["Iron-deficiency anaemia",`Low haemoglobin from iron loss; Hb under 9.0 g/dL had a likelihood ratio for colorectal cancer of 27 in men [[Hamilton2008]].`,"symptoms"],
 ["Juvenile polyposis",`An autosomal dominant syndrome with five or more juvenile polyps; lifetime colorectal cancer risk about 38.7% [[Syngal2015,Brosens2007]].`,"genes"],
 ["KRAS",`An oncogene mutated as adenomas grow; RAS-mutant tumours do not respond to anti-EGFR therapy [[Vogelstein1988,Sepulveda2017]].`,"sequence"],
 ["KRAS G12C",`A KRAS mutation in about 3–4% of metastatic CRC, targeted by sotorasib or adagrasib with an anti-EGFR antibody [[Fakih2023,Yaeger2023]].`,"biomarkers"],
 ["Laparoscopic surgery",`Keyhole surgery; oncologically equivalent to open colectomy in COST [[COST2004]].`,"surgery"],
 ["LARS (low anterior resection syndrome)",`Urgency, frequency, clustering and incontinence after rectal resection; major LARS affects about 41% [[Croese2018]].`,"living"],
 ["LARS score",`A 5-item score from 0 to 42: 0–20 no LARS, 21–29 minor, 30–42 major [[Emmertsen2012]].`,"living"],
 ["Lgr5",`A Wnt target gene marking the stem cells at the crypt base [[Barker2007]].`,"colon"],
 ["Lymph-node yield",`The number of nodes the pathologist examines; at least 12 is the standard [[Baxter2022,Chang2007]].`,"staging"],
 ["Lynch syndrome",`Autosomal dominant mismatch-repair deficiency (MLH1, MSH2, MSH6, PMS2, EPCAM) causing colorectal, endometrial and other cancers [[Syngal2015]].`,"genes"],
 ["M1c",`AJCC 8th-edition category for peritoneal metastasis, giving stage IVC [[Tong2018]].`,"staging"],
 ["Malignant polyp",`A polyp containing invasive cancer; Haggitt level 4 invasion is an adverse factor [[Haggitt1985]].`,"surgery"],
 ["MERCURY",`A study of high-resolution pelvic MRI before TME that predicted a clear circumferential margin with 92% specificity [[MERCURY2006]].`,"staging"],
 ["Mesorectum",`The fatty envelope around the rectum holding its lymph nodes, removed intact in TME [[Heald1982]].`,"surgery"],
 ["Metachronous metastasis",`Spread found after the primary diagnosis; 5-year metachronous liver metastasis risk was 30.4% after stage III [[Manfredi2006]].`,"metastatic"],
 ["Microsatellite",`A short repeated DNA sequence, such as (A)n or (CA)n, prone to polymerase slippage [[Vilar2010]].`,"genes"],
 ["Microsatellite instability (MSI)",`Length changes in microsatellites caused by mismatch-repair loss; about 15% of colorectal cancers [[Boland2010]].`,"genes"],
 ["Mismatch repair (MMR)",`The DNA repair system correcting base mismatches and insertion-deletion loops after replication [[Jiricny2006,Li2008]].`,"genes"],
 ["MLH1",`Mismatch-repair gene; silenced by promoter methylation in most sporadic MSI cancers [[Herman1998]], and a high-risk Lynch gene [[DominguezValentin2020]].`,"genes"],
 ["Molecular residual disease (MRD)",`Cancer detectable only by ctDNA after curative treatment; not yet routine in early cancer per ESMO [[Pascual2022]].`,"cure"],
 ["MSH2",`Mismatch-repair gene, the first Lynch gene identified, in 1993 [[Fishel1993,Leach1993]].`,"genes"],
 ["MSH6",`Lynch gene with moderate colorectal but high endometrial cancer risk [[DominguezValentin2020]].`,"genes"],
 ["Mucinous adenocarcinoma",`A cancer with abundant extracellular mucin, 11% of colorectal cancers; not independently prognostic after stage adjustment [[Nitsche2013]].`,"staging"],
 ["Multitarget stool DNA (mt-sDNA)",`A stool test combining DNA markers with FIT; cancer sensitivity 92.3% vs 73.8% for FIT [[Imperiale2014]].`,"screening"],
 ["MutLα",`The MLH1–PMS2 heterodimer that recruits excision machinery in mismatch repair [[Vilar2010]].`,"genes"],
 ["MutSα",`The MSH2–MSH6 heterodimer that recognises single-base mismatches [[Vilar2010]].`,"genes"],
 ["MUTYH-associated polyposis (MAP)",`Autosomal recessive polyposis from biallelic MUTYH variants, often with fewer than 100 adenomas [[Zaffaroni2024]].`,"genes"],
 ["N1c",`Tumour deposits with no positive regional lymph nodes [[Amin2017AJCC,Tong2018]].`,"staging"],
 ["Neoadjuvant therapy",`Treatment given before surgery, such as chemoradiotherapy for rectal cancer [[Sauer2004]] or chemotherapy for colon cancer in FOxTROT [[Morton2023]].`,"rectal"],
 ["Neoantigen",`A mutant peptide the immune system can recognise; dMMR tumours carry many, making them sensitive to PD-1 blockade [[Le2017]].`,"genes"],
 ["Nivolumab plus ipilimumab",`PD-1 plus CTLA-4 blockade for MSI-H/dMMR metastatic CRC; 24-month PFS 72% vs 14% with chemotherapy first-line [[Andre2024]].`,"metastatic"],
 ["NordICC",`A randomised trial of an invitation to one screening colonoscopy; incidence RR 0.82 at 10 years [[Bretthauer2022]].`,"screening"],
 ["NTRK fusion",`A rare gene fusion (0.2–2.4% with ALK and ROS1) targeted by tumour-agnostic TRK inhibitors [[Pietrantonio2017,Drilon2018]].`,"biomarkers"],
 ["Number needed to screen",`How many people must be screened to prevent one outcome; 489 to prevent one death with once-only sigmoidoscopy [[Atkin2010]].`,"screening"],
 ["Oligometastases",`A limited number of metastases that may be treated locally, for example with stereotactic radiotherapy [[Morris2023]].`,"metastatic"],
 ["Organ preservation",`Avoiding TME after a complete response; 3-year TME-free survival 53% with consolidation chemotherapy in OPRA [[GarciaAguilar2022]].`,"rectal"],
 ["Oxaliplatin",`A platinum drug whose dose-limiting toxicity is cumulative sensory neuropathy; acute symptoms are triggered by cold [[FDA-OxaliplatinGland]].`,"chemo"],
 ["Panitumumab",`An anti-EGFR antibody indicated for RAS wild-type metastatic CRC; boxed warning for skin toxicity [[FDA-Vectibix]].`,"metastatic"],
 ["Parastomal hernia",`A hernia next to a stoma, commonest after end colostomy [[Antoniou2018,Carne2003]].`,"living"],
 ["Pembrolizumab",`A PD-1 inhibitor; first-line in MSI-H/dMMR metastatic CRC after KEYNOTE-177 [[Andre2020]].`,"metastatic"],
 ["Perineural invasion",`Tumour growing along nerves; 5-year DFS 16% vs 65% without it in one series [[Liebig2009]].`,"staging"],
 ["Peutz–Jeghers syndrome",`Autosomal dominant STK11 syndrome with hamartomatous polyps and mucocutaneous pigmentation [[Beggs2010]].`,"genes"],
 ["PMS2",`The Lynch gene with the lowest colorectal cancer risk (10.4% to 75) [[DominguezValentin2020]].`,"genes"],
 ["Polypectomy",`Removal of a polyp at colonoscopy, first reported in 1973 [[Wolff1973NEJM]].`,"colonoscopy"],
 ["Positive predictive value (PPV)",`The share of positive results that are true positives; rectal bleeding in primary care has a PPV of about 2.4% [[Hamilton2005]].`,"symptoms"],
 ["Post-colonoscopy colorectal cancer (PCCRC)",`A cancer diagnosed after a colonoscopy that found none, standardised by the WEO [[Rutter2018]].`,"colonoscopy"],
 ["Primary sclerosing cholangitis (PSC)",`A bile-duct disease; in Crohn's disease, PSC is one of the settings where colorectal cancer risk is raised [[Olen2020CD]].`,"risk"],
 ["Processed meat",`Meat preserved by curing or smoking; IARC Group 1 [[Bouvard2015]]; risk rises about 18% per 50 g/day [[Chan2011]].`,"risk"],
 ["Proximal (right-sided) colon",`Caecum, ascending colon, hepatic flexure and transverse colon; tumours here are more often MSI and BRAF-mutant [[Tejpar2017,Missiaglia2014]].`,"what"],
 ["R0 resection",`Complete removal with no tumour at the margins; 94% vs 89% with neoadjuvant chemotherapy in FOxTROT [[Morton2023]].`,"surgery"],
 ["Rectum",`The most distal part of the large intestine, between the sigmoid colon and the anal canal [[Wang2023]].`,"colon"],
 ["Regorafenib",`A multikinase inhibitor for refractory CRC; boxed warning for severe hepatotoxicity [[Grothey2013,FDA-Stivarga]].`,"metastatic"],
 ["Relative survival",`Survival of people with cancer compared with similar people without it; 5-year relative survival is 65% overall in the US [[Siegel2026CRC]].`,"what"],
 ["Robotic surgery",`Robot-assisted rectal surgery; ROLARR found no significant fall in conversion [[Jayne2017]].`,"surgery"],
 ["Sensitivity / specificity",`The share of people with disease who test positive, and without disease who test negative; FIT is about 0.79 and 0.94 for cancer [[Lee2014]].`,"screening"],
 ["Serrated pathway",`A route to cancer through sessile serrated lesions, with BRAF mutation and CIMP; at least 15% of colorectal cancers [[IJspeert2015,Crockett2019]].`,"sequence"],
 ["Serrated polyposis syndrome",`Many serrated polyps (WHO 2019 criteria); the commonest polyposis syndrome, often unrecognised [[Monahan2020,Rex2026SPS]].`,"genes"],
 ["Sessile serrated lesion (SSL)",`A flat, mostly proximal serrated precursor, typically BRAF-mutant and CIMP-positive [[Crockett2019,Bettington2017]].`,"sequence"],
 ["Short-course radiotherapy",`5 × 5 Gy before rectal surgery [[vanGijn2011]].`,"rectal"],
 ["Shield (cfDNA test)",`A blood test for cell-free DNA; 83.1% sensitivity for cancer, 13.2% for advanced precancerous lesions [[Chung2024,FDA-Shield]].`,"screening"],
 ["Sidedness",`Whether the primary is right- or left-sided; left-sided tumours have lower risk of death (HR 0.82) [[Petrelli2017]].`,"biomarkers"],
 ["Sigmoid colon",`The S-shaped hindgut segment before the rectum [[Harkins2023]].`,"colon"],
 ["Signet-ring cell carcinoma",`A rare (under 1%) subtype with intracellular mucin; independently worse prognosis (HR 2.5) [[Nitsche2013]].`,"staging"],
 ["Split-dose preparation",`Bowel prep divided between the evening before and the morning of colonoscopy; better cleansing (OR 2.51) [[Martel2015]].`,"colonoscopy"],
 ["Stoma",`An opening of the bowel on the abdomen, into which stool drains into a pouch [[denDulk2007]].`,"living"],
 ["Stoma site marking",`Choosing the best stoma position before surgery, ideally by a colorectal surgeon or certified ostomy nurse [[Salvadalena2015]].`,"nursing"],
 ["Surveillance colonoscopy",`Repeat colonoscopy after polyp removal at intervals set by the findings [[Gupta2020]].`,"schedule"],
 ["Survival paradox",`Stage IIIA doing better than stage IIB [[OConnell2004,Yu2024]].`,"staging"],
 ["Synchronous cancer",`A second primary colorectal cancer present at diagnosis, in 3.9% [[Mulder2011]].`,"symptoms"],
 ["T4a / T4b",`T4a penetrates the visceral peritoneum; T4b invades or adheres to other organs [[Amin2017AJCC]].`,"staging"],
 ["Tis",`Carcinoma in situ or intramucosal carcinoma, limited to the epithelium or lamina propria [[Amin2017AJCC,Tong2018]].`,"staging"],
 ["TNM",`The staging system for depth (T), nodes (N) and metastasis (M); the AJCC 8th edition covers colon and rectum together [[Amin2017AJCC]].`,"staging"],
 ["Total mesorectal excision (TME)",`Sharp dissection removing the rectum with its intact mesorectum; proposed by Heald in 1982 [[Heald1982]].`,"surgery"],
 ["Total neoadjuvant therapy (TNT)",`Giving radiotherapy and all systemic chemotherapy before rectal surgery, as in RAPIDO and PRODIGE 23 [[Bahadoer2021,Conroy2021]].`,"rectal"],
 ["TP53",`A tumour-suppressor gene on 17p whose loss marks the step from adenoma to carcinoma [[Vogelstein1988]].`,"sequence"],
 ["Traditional serrated adenoma (TSA)",`A serrated cancer precursor; surveillance at 3 years after removal [[Crockett2019,Gupta2020]].`,"sequence"],
 ["Trifluridine/tipiracil",`An oral drug for refractory CRC; with bevacizumab, median OS 10.8 vs 7.5 months [[Prager2023]].`,"metastatic"],
 ["Tumour budding",`Single cells or clusters of up to 4 at the invasive front, graded BD1–BD3 [[Lugli2017]].`,"staging"],
 ["Tumour deposit",`A discrete tumour nodule in pericolic fat without node structure; found in 22% of patients and linked to poor outcome [[Nagtegaal2017]].`,"staging"],
 ["Ulcerative colitis",`Inflammatory bowel disease with raised colorectal cancer risk (HR 1.66), falling over time [[Olen2020UC]].`,"risk"],
 ["Universal tumour testing",`MMR or MSI testing of every new colorectal cancer to find Lynch syndrome [[Syngal2015,Seppala2021]].`,"genes"],
 ["USPSTF",`US Preventive Services Task Force; its 2021 recommendation grades screening A at 50–75 and B at 45–49 [[USPSTF2021]].`,"screening"],
 ["Watch-and-wait",`Close surveillance instead of surgery after a clinical complete response of rectal cancer [[HabrGama2004,vanderValk2018]].`,"rectal"],
 ["Withdrawal time",`Time spent inspecting while withdrawing the colonoscope; the target average is ≥8 minutes [[Rex2024]].`,"colonoscopy"],
 ["Wnt signalling",`A pathway driving adult stem cells; deregulated in 93% of colorectal cancers [[Nusse2017,TCGA2012]].`,"sequence"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold β to b and hyphens away, so 'b-catenin' and 'ctdna' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/β/g,'b').replace(/[-–]/g,'');
  function render(){const q=norm(inp.value.trim());const L=CR_GL.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:CR_GL.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const CR_AREAN={A:'Epidemiology, symptoms & history',B:'Risk, prevention & hereditary syndromes',C:'Biology & the adenoma–carcinoma sequence',D:'Screening & colonoscopy',E:'Diagnosis, staging & biomarkers',F:'Treatment of localised disease',G:'Metastatic disease & research',H:'Living, survivorship & nursing'};
const CR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const CR_svc=s=>s.unverified?[]:CR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const CR_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(CR_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>CR_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=CR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=CR_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${CR_link(s)?`<a href="${esc(CR_link(s))}" target="_blank" rel="noopener">${esc(CR_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${CR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
