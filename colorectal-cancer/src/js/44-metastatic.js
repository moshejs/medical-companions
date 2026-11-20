/* =============== 4.4 Metastatic disease =============== */
const MT_STEPS=[
 {from:0,at:.17,k:'Step 1 · Breaking away',t:'Cells leave the primary tumour',
  txt:`A cancer that has invaded the bowel wall can shed cells into its veins. Sequencing of paired lesions suggests that cells within a cancer gain the ability to metastasise in under 2 years, with few if any extra selective events [[Jones2008]]. Modelling of biopsies suggested that seeding often happened while the primary was still clinically undetectable, typically under 0.01 cm³ <span class="ev early">Early evidence</span> [[Hu2019]]. In the Burgundy registry, 14.5% of people already had liver metastases at diagnosis, and the 5-year cumulative rate of later liver metastases was also 14.5% [[Manfredi2006]].`,
  pt:`Spread happens when a few cancer cells get into the bloodstream and settle in another organ, sometimes before the bowel tumour is even found.`,
  hook:`Synchronous metastases are present at diagnosis; metachronous ones appear later. For the liver, both were 14.5% in Burgundy.`},
 {from:.2,at:.36,k:'Step 2 · The liver',t:'Up the portal vein to the liver',
  txt:`Veins from the colon and upper rectum drain into the portal vein, which runs to the liver first (textbook anatomy, not stated in the cited abstracts). The liver is the commonest site: in a German registry 24.7% developed liver metastases, 71% of them synchronous [[Hackl2014]]; in Stockholm, 26.5% within 5 years, more often after left-sided than right-sided colon cancer (28.4% vs 22.1%) [[Engstrand2018]]. The 5-year risk of later liver metastases rises with stage: 3.7% after stage I, 13.3% after stage II and 30.4% after stage III [[Manfredi2006]].`,
  pt:`Blood from the bowel passes through the liver before it goes anywhere else, so the liver is the most common place for colorectal cancer to spread.`,
  hook:`Later liver metastases within 5 years: stage I 3.7%, stage II 13.3%, stage III 30.4%.`},
 {from:.4,at:.56,k:'Step 3 · Lungs and peritoneum',t:'The lungs and the abdominal lining',
  txt:`Veins of the low rectum drain into the systemic circulation (textbook anatomy), and rectal cancer spreads to the chest more often than colon cancer (OR 2.4) and to the peritoneum less often (OR 0.3) [[Riihimaki2016]]. Synchronous lung metastases were found in 11.0% in Burgundy [[Mitry2010]], and peritoneal spread in 8.3% in Stockholm, the only metastatic site in 4.8% [[Segelman2012]]. Mucinous and signet-ring tumours favour the peritoneum (OR 3.8 in colon cancer) and the liver less (OR 0.5) [[Riihimaki2016]].`,
  pt:`Cancer low in the rectum can bypass the liver and reach the lungs. Cells can also drop into the lining of the belly, called the peritoneum.`,
  hook:`Rectal cancer → lungs more often than colon cancer (OR 2.4). Mucinous or signet-ring → peritoneum.`},
 {from:.6,at:.76,k:'Path A · Resectable liver metastases',t:'Removing the liver metastases',
  txt:`If every liver metastasis can be removed, hepatectomy offers a chance of cure: in 612 consecutive patients, about one in six were actual 10-year survivors, and 97% of those were disease-free [[Tomlinson2007]]. EORTC 40983 gave 6 cycles of FOLFOX4 before and 6 after surgery to people with up to 4 resectable metastases. Three-year PFS rose from 28.1% to 35.4% (HR 0.79; p=0.058) [[Nordlinger2008]], but 5-year OS did not differ: 51.2% vs 47.8% (HR 0.88; p=0.34) [[Nordlinger2013]]. ASCO 2023: perioperative chemotherapy or surgery alone "should be offered" [[Morris2023]].`,
  pt:`Spread to the liver is not always incurable. When surgeons can remove every spot, some people stay free of cancer for good.`,
  hook:`EORTC 40983: perioperative FOLFOX4 improved PFS, not OS. About 1 in 6 people having hepatectomy are cured (actual 10-year survivors).`},
 {from:.8,at:.97,k:'Path B · Systemic therapy',t:'Treating the whole body',
  txt:`When the spots cannot all be removed, systemic therapy reaches every site, chosen by the tumour's biomarkers (see the ladder below). In one US centre, median OS rose from 22.6 months (2004–2012) to 28.8 (2013–2015) and 32.4 months (2016–2019). Longer survival was linked to liver resection (HR 0.26), immunotherapy (HR 0.44) and third-line drugs (HR 0.74), not to calendar year itself [[Zeineddine2023]]. Population medians are lower: 12 months for all stage IV patients in the Netherlands in 2008–2011 [[vanderGeest2015]].`,
  pt:`Medicines that travel in the blood reach every spot. On average people now live longer than 20 years ago, but these are group figures and each person's course differs.`,
  hook:`Median OS by era (one US centre): 22.6 → 28.8 → 32.4 months. Liver resection carried the largest survival association (HR 0.26).`}
];
const MT_PROF={
 msi:{n:'MSI-H / dMMR',d:`Mismatch-repair-deficient tumours carry many mutations and respond to checkpoint inhibitors, which often work better than chemotherapy with fewer serious side effects. [[Andre2020,Andre2024]]`},
 ras:{n:'RAS wild-type, left-sided (MSS)',d:`For MSS/pMMR, left-sided, RAS wild-type disease, ASCO 2023 recommends chemotherapy plus anti-EGFR first-line. RAS testing must cover KRAS and NRAS exons 2–4: other RAS mutations were found in 14.7% of KRAS exon 2 wild-type tumours in CRYSTAL, and those did not benefit from cetuximab. [[Morris2023,VanCutsem2015]]`},
 braf:{n:'BRAF V600E',d:`BRAF V600E is linked to right-sided primaries and shorter survival (median 10.4 vs 34.7 months in one metastatic cohort). Encorafenib is given with cetuximab because EGFR feedback undoes BRAF inhibition alone. [[Tran2011,Kopetz2019]]`},
 her2:{n:'HER2-amplified',d:`About 5% (48 of 914) of KRAS exon 2 wild-type tumours were HER2-positive in HERACLES. First-line choice still follows RAS, side and MMR status; HER2 guides later lines. [[SartoreBianchi2016,Morris2023]]`},
 g12c:{n:'KRAS G12C',d:`KRAS G12C was found in 3.2% of colorectal carcinomas in a US cohort and was linked to higher CRC-specific mortality (HR 1.82). A G12C inhibitor works best paired with an anti-EGFR antibody, in later lines. [[Ugai2024,Fakih2023,Yaeger2023]]`},
 oth:{n:'None of these: MSS, RAS-mutant or right-sided',d:`For RAS-mutant or right-sided disease, ASCO 2023 recommends chemotherapy plus anti-VEGF. Doublet chemotherapy "should be offered", or triplet "may be offered". [[Morris2023]]`}
};
const MT_ALL=['msi','ras','braf','her2','g12c','oth'];
const MT_RX=[
 {l:1,p:['msi'],n:'Pembrolizumab',tr:'KEYNOTE-177',k:'PFS 16.5 vs 8.2 months',
  r:`First-line, 307 people: median PFS 16.5 vs 8.2 months with chemotherapy (HR 0.60); grade ≥3 treatment-related events 22% vs 66%. Final OS: not reached vs 36.7 months (HR 0.74, 0.53–1.03), missing significance with 60% crossover. [[Andre2020,Diaz2022]]`,
  lab:`Keytruda label: for unresectable or metastatic MSI-H or dMMR CRC "as determined by an FDA-authorized test". [[FDA-Keytruda]]`},
 {l:1,p:['msi'],n:'Nivolumab + ipilimumab',tr:'CheckMate 8HW (final OS 2026)',k:'24-month PFS 72% vs 14%',
  r:`First-line: 24-month PFS 72% vs 14% with chemotherapy; grade 3–4 treatment-related events 23% vs 48%. Across all lines it beat nivolumab alone on PFS (HR 0.62). Final analysis at 68 months: OS HR 0.37 vs chemotherapy and 0.61 vs nivolumab. [[Andre2024,Andre2025,Lonardi2026]]`,
  lab:`Opdivo and Yervoy labels: for adults and children 12 years and older with unresectable or metastatic MSI-H or dMMR CRC. [[FDA-Opdivo,FDA-Yervoy]]`},
 {l:1,p:['ras'],n:'Chemotherapy + anti-EGFR (panitumumab or cetuximab)',tr:'PARADIGM · CRYSTAL',k:'OS 37.9 vs 34.3 months (PARADIGM)',
  r:`PARADIGM, left-sided RAS wild-type: panitumumab plus mFOLFOX6 gave OS 37.9 vs 34.3 months with bevacizumab (HR 0.82), response 80.2% vs 68.6%, acneiform rash 74.8%. CRYSTAL, KRAS wild-type: FOLFIRI plus cetuximab OS 23.5 vs 20.0 months. [[Watanabe2023,VanCutsem2011]]`,
  lab:`Erbitux label: "not indicated for treatment of Ras-mutant colorectal cancer or when the results of the Ras mutation tests are unknown." Vectibix: RAS status confirmed across KRAS and NRAS exons 2, 3 and 4. [[FDA-Erbitux,FDA-Vectibix]]`},
 {l:1,p:['oth','her2','g12c'],n:'Doublet chemotherapy + bevacizumab',tr:'Hurwitz 2004',k:'OS 20.3 vs 15.6 months',
  r:`Adding bevacizumab to IFL: OS 20.3 vs 15.6 months (HR 0.66), PFS 10.6 vs 6.2 months; grade 3 hypertension 11.0% vs 2.3%. [[Hurwitz2004]]`,
  lab:`Avastin label: with IV fluorouracil-based chemotherapy, first- or second-line; it "is not indicated for adjuvant treatment of colon cancer". [[FDA-Avastin]]`},
 {l:1,p:['oth','her2','g12c'],n:'FOLFOXIRI + bevacizumab (triplet)',tr:'TRIBE',k:'OS 29.8 vs 25.8 months',
  r:`Against FOLFIRI-bevacizumab: PFS 12.1 vs 9.7 months, response 65% vs 53%, OS 29.8 vs 25.8 months (HR 0.80), with more neutropenia, diarrhoea, stomatitis and neurotoxicity. For fit, selected patients. [[Loupakis2014,Cremolini2015]]`,lab:''},
 {l:1,p:['braf'],n:'Encorafenib + cetuximab + mFOLFOX6',tr:'BREAKWATER',k:'OS 30.3 vs 15.1 months',
  r:`First-line BRAF V600E: PFS 12.8 vs 7.1 months (HR 0.53); interim OS 30.3 vs 15.1 months (HR 0.49); response 60.9% vs 40.0%. With FOLFIRI (cohort 3): PFS 15.2 vs 8.3 months. [[Elez2025,Kopetz2025,Kopetz2026]]`,
  lab:`Braftovi label: with cetuximab and fluorouracil-based chemotherapy for BRAF V600E mCRC "as detected by an FDA-authorized test". [[FDA-Braftovi]]`},
 {l:2,p:['oth','ras','her2','g12c','msi'],n:'Switch the chemotherapy backbone, keep a biologic',tr:'Avastin label · TRIBE2',k:'FOLFOX ↔ FOLFIRI',
  r:`TRIBE2 compared mFOLFOX6-bevacizumab followed by FOLFIRI-bevacizumab with upfront FOLFOXIRI-bevacizumab and reintroduction (PFS2 16.4 vs 19.2 months). After first-line immunotherapy, the chemotherapy-based options follow. [[Cremolini2020,Morris2023]]`,
  lab:`Avastin label: second-line with fluoropyrimidine-irinotecan or -oxaliplatin chemotherapy after progression on a first-line bevacizumab regimen. [[FDA-Avastin]]`},
 {l:2,p:['braf'],n:'Encorafenib + cetuximab',tr:'BEACON',k:'OS 8.4 vs 5.4 months',
  r:`After 1–2 prior regimens: OS 9.0 months with binimetinib added and 8.4 months with the doublet vs 5.4 with control; confirmed response 26% vs 2%. [[Kopetz2019]]`,
  lab:`Erbitux label: with encorafenib for BRAF V600E mCRC "after prior therapy". [[FDA-Erbitux]]`},
 {l:2,p:['msi'],n:'Nivolumab + ipilimumab (if not used first)',tr:'CheckMate 8HW, all lines',k:'PFS HR 0.62 vs nivolumab',
  r:`Across lines, the combination beat nivolumab alone: PFS HR 0.62 (median not reached vs 39.3 months) and final OS HR 0.61. [[Andre2025,Lonardi2026]]`,lab:''},
 {l:3,p:['her2'],n:'Tucatinib + trastuzumab',tr:'MOUNTAINEER',k:'Response 38.1%',
  r:`Chemotherapy-refractory, RAS wild-type: response 38.1%; final analysis response 39.3%, duration 15.2 months, PFS 8.1 and OS 23.9 months (single arm). Diarrhoea 64%. MOUNTAINEER-03 is testing it first-line. [[Strickler2023,Strickler2026,NCT05253651]]`,
  lab:`Tukysa label: accelerated approval "based on tumor response rate and durability of response", after fluoropyrimidine, oxaliplatin and irinotecan. [[FDA-Tukysa]]`},
 {l:3,p:['her2'],n:'Trastuzumab deruxtecan',tr:'DESTINY-CRC02',k:'Response 37.8%',
  r:`At 5.4 mg/kg: response 37.8%; drug-related ILD or pneumonitis 8%, all grade 1–2. In DESTINY-CRC01, two of five ILD cases were fatal. [[Raghav2024,Siena2021]]`,
  lab:`Enhertu label: tumour-agnostic accelerated approval for HER2-positive (IHC 3+) solid tumours; boxed warning for interstitial lung disease. [[FDA-Enhertu]]`},
 {l:3,p:['g12c'],n:'Sotorasib + panitumumab',tr:'CodeBreaK 300',k:'PFS 5.6 vs 2.2 months',
  r:`Chemorefractory KRAS G12C: PFS 5.6 vs 2.2 months with trifluridine/tipiracil or regorafenib (HR 0.49); response 26.4% vs 0%. OS HR 0.70 (0.41–1.18), not adequately powered. [[Fakih2023,Pietrantonio2025]]`,
  lab:`Lumakras label: 960 mg once daily with panitumumab after fluoropyrimidine, oxaliplatin and irinotecan (label wording). [[FDA-Lumakras]]`},
 {l:3,p:['g12c'],n:'Adagrasib + cetuximab',tr:'KRYSTAL-1',k:'Response 34.0%',
  r:`Response 46% in the first 28 patients and 34.0% in 94; PFS 6.9 and OS 15.9 months (single arm). Adagrasib alone: 19%. [[Yaeger2023,Yaeger2024]]`,
  lab:`Krazati label: the colorectal accelerated-approval indication was removed in August 2026; the US label now covers lung cancer only. [[FDA-Krazati]]`},
 {l:3,p:['msi'],n:'Nivolumab alone (if no checkpoint inhibitor yet)',tr:'Opdivo label',k:'labelled after 3 chemotherapy drugs',
  r:`The label covers nivolumab alone after progression on a fluoropyrimidine, oxaliplatin and irinotecan; in CheckMate 8HW the combination beat nivolumab alone. [[FDA-Opdivo,Andre2025]]`,lab:''},
 {l:3,p:MT_ALL,n:'Regorafenib',tr:'CORRECT',k:'OS 6.4 vs 5.0 months',
  r:`OS 6.4 vs 5.0 months with placebo (HR 0.77); grade ≥3 hand-foot skin reaction 17%. [[Grothey2013]]`,
  lab:`Stivarga boxed warning: "Severe and sometimes fatal hepatotoxicity has occurred in clinical trials". [[FDA-Stivarga]]`},
 {l:3,p:MT_ALL,n:'Trifluridine/tipiracil ± bevacizumab',tr:'RECOURSE · SUNLIGHT · PRABITAS',k:'OS 10.8 vs 7.5 months (SUNLIGHT)',
  r:`RECOURSE: OS 7.1 vs 5.3 months with placebo (HR 0.68). SUNLIGHT: adding bevacizumab, OS 10.8 vs 7.5 months (HR 0.61). PRABITAS: a 14-day schedule was non-inferior to 28-day (OS 11.3 vs 10.3 months) and cut grade ≥3 neutropenia from 39% to 13%. [[Mayer2015,Prager2023,Sakakida2026]]`,
  lab:`Lonsurf label: alone or with bevacizumab after fluoropyrimidine, oxaliplatin and irinotecan chemotherapy, an anti-VEGF agent and (if RAS wild-type) an anti-EGFR agent. [[FDA-Lonsurf]]`},
 {l:3,p:MT_ALL,n:'Fruquintinib',tr:'FRESCO-2',k:'OS 7.4 vs 4.8 months',
  r:`After a median of 4 prior lines: OS 7.4 vs 4.8 months with placebo (HR 0.66); grade ≥3 hypertension 14%. [[Dasari2023]]`,
  lab:`Fruzaqla label: for previously treated mCRC, with anti-EGFR "if RAS wild-type and medically appropriate"; first FDA approval 2023-11-08. [[FDA-Fruzaqla,FDA-DrugsAtFDA]]`}
];
const MT_KM=[
 {id:'era',b:'Eras',t:'Median OS by era of diagnosis (one US centre)',m:'alive',x:72,arms:[['2004–2012',22.6,50],['2013–2015',28.8,50],['2016–2019',32.4,50]],
  txt:`1420 people with de novo metastatic CRC at one US centre. Five-year survival rose from 15.7% (2004–2006) to 26% (2013–2015). The gains track liver resection, immunotherapy and third-line drugs. [[Zeineddine2023]]`},
 {id:'hur',b:'Hurwitz',t:'Bevacizumab added to IFL (2004)',m:'alive',x:48,arms:[['IFL + placebo',15.6,50],['IFL + bevacizumab',20.3,50]],
  txt:`813 people, first-line. OS HR 0.66 (P<0.001); response 44.8% vs 34.8%; grade 3 hypertension 11.0% vs 2.3%. [[Hurwitz2004]]`},
 {id:'tribe',b:'TRIBE',t:'Triplet vs doublet with bevacizumab',m:'alive',x:66,arms:[['FOLFIRI + bevacizumab',25.8,50],['FOLFOXIRI + bevacizumab',29.8,50]],
  txt:`508 people. OS HR 0.80 (0.65–0.98). By subgroup, median OS was 37.1 months for RAS/BRAF wild-type, 25.6 for RAS-mutant and 13.4 for BRAF-mutant tumours. [[Cremolini2015,Loupakis2014]]`},
 {id:'para',b:'PARADIGM',t:'Anti-EGFR vs anti-VEGF, left-sided RAS wild-type',m:'alive',x:72,arms:[['mFOLFOX6 + bevacizumab',34.3,50],['mFOLFOX6 + panitumumab',37.9,50]],
  txt:`823 people with RAS wild-type disease. Left-sided OS HR 0.82 (P=0.03) while PFS was similar (13.1 vs 11.9 months). CRYSTAL showed the earlier cetuximab gain (OS 23.5 vs 20.0 months, KRAS wild-type). [[Watanabe2023,VanCutsem2011]]`},
 {id:'k177',b:'KEYNOTE-177',t:'Pembrolizumab vs chemotherapy, MSI-H/dMMR (PFS)',m:'progression-free',x:36,arms:[['Chemotherapy',8.2,50],['Pembrolizumab',16.5,50]],
  txt:`307 people, first-line MSI-H/dMMR. PFS HR 0.60 (0.45–0.80). Among responders, 83% vs 35% had ongoing responses at 24 months. [[Andre2020]]`},
 {id:'hw',b:'CheckMate 8HW',t:'Nivolumab + ipilimumab vs chemotherapy (PFS)',m:'progression-free',x:36,arms:[['Chemotherapy',24,14],['Nivolumab + ipilimumab',24,72]],
  txt:`Curves drawn through the 24-month PFS rates (72% vs 14%), as medians were not the headline. The 2026 final analysis (68 months' follow-up) gave first-line PFS HR 0.21 and OS HR 0.37 vs chemotherapy. [[Andre2024,Lonardi2026]]`},
 {id:'bw',b:'BREAKWATER',t:'Encorafenib + cetuximab + mFOLFOX6, BRAF V600E first-line',m:'alive',x:54,arms:[['Standard care',15.1,50],['Encorafenib + cetuximab + mFOLFOX6',30.3,50]],
  txt:`Interim OS HR 0.49 (0.38–0.63); PFS 12.8 vs 7.1 months. Historically, OS after failure of initial therapy was 4–6 months. [[Elez2025,Kopetz2019]]`},
 {id:'beacon',b:'BEACON',t:'BRAF V600E after 1–2 prior regimens',m:'alive',x:24,arms:[['Control',5.4,50],['Encorafenib + cetuximab',8.4,50],['Encorafenib + binimetinib + cetuximab',9.0,50]],
  txt:`665 people. OS HR 0.52 (triplet) and 0.60 (doublet); confirmed response 26% vs 2%. [[Kopetz2019]]`},
 {id:'cb',b:'CodeBreaK 300',t:'Sotorasib + panitumumab, KRAS G12C (PFS)',m:'progression-free',x:12,arms:[[`Investigator's choice`,2.2,50],['Sotorasib 960 mg + panitumumab',5.6,50]],
  txt:`160 people, chemorefractory. PFS HR 0.49 (0.30–0.80); updated response 30.2% vs 1.9%. [[Fakih2023,Pietrantonio2025]]`},
 {id:'correct',b:'CORRECT',t:'Regorafenib vs placebo',m:'alive',x:18,arms:[['Placebo',5.0,50],['Regorafenib',6.4,50]],
  txt:`760 people. OS HR 0.77 (0.64–0.94): a median gain of 1.4 months. [[Grothey2013]]`},
 {id:'recourse',b:'RECOURSE',t:'Trifluridine/tipiracil vs placebo',m:'alive',x:18,arms:[['Placebo',5.3,50],['Trifluridine/tipiracil',7.1,50]],
  txt:`OS HR 0.68 (0.58–0.81); neutropenia 38%. [[Mayer2015]]`},
 {id:'sun',b:'SUNLIGHT',t:'Trifluridine/tipiracil ± bevacizumab',m:'alive',x:30,arms:[['Trifluridine/tipiracil',7.5,50],['+ bevacizumab',10.8,50]],
  txt:`492 people. OS HR 0.61 (0.49–0.77); PFS 5.6 vs 2.4 months. The largest refractory-line gain: +3.3 months. [[Prager2023]]`},
 {id:'fresco',b:'FRESCO-2',t:'Fruquintinib vs placebo',m:'alive',x:18,arms:[['Placebo',4.8,50],['Fruquintinib',7.4,50]],
  txt:`691 people after a median of 4 prior lines. OS HR 0.66 (0.55–0.80). [[Dasari2023]]`},
 {id:'prab',b:'PRABITAS',t:'14-day vs 28-day trifluridine/tipiracil + bevacizumab',m:'alive',x:30,arms:[['28-day schedule',10.3,50],['14-day schedule',11.3,50]],
  txt:`970 people in Japan. Non-inferior (OS HR 0.93), with grade ≥3 neutropenia falling from 39% to 13%. A trial of gentler scheduling, not a new drug. [[Sakakida2026]]`}
];
function mtAlong(P,u){u=clamp(u);const seg=[];let L=0;for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(l);L+=l}
  let d=u*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const k=seg[i]?Math.min(1,d/seg[i]):0;return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}d-=seg[i]}}
const mtPathD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
inits.metastatic=()=>{
  /* ---------- main animation ---------- */
  const svg=$('#mtSvg'),rg=$('#mtT');
  const LIV=[150,128,1.2],Lm=(x,y)=>[LIV[0]+x*LIV[2],LIV[1]+y*LIV[2]];
  const MA=[[28,-20],[42,-8],[22,-2],[46,-24]],MB=[[-40,-12],[-20,8],[-30,-26],[-4,-26]];
  const LUNG=[[100,42],[134,62],[264,40],[238,62]],PER=[[46,262],[326,240],[150,370],[262,370]];
  function body(t){
    const C=colon(72,186,.7,{hl:'sigmoid'}),T=C.at(.81),R=C.at(.95);
    const portal=[T,[T[0]-22,T[1]-34],[200,252],[178,198],[160,150]];
    const sysBase=[R,[250,360],[318,334],[318,100],[196,78]];
    const sys=k=>sysBase.concat([k%2?[248,52]:[122,52]]);
    const vis=t<.6?1:t<.8?1-ramp(t,.6,.63):ramp(t,.8,.83);
    const pathB=t>=.8,shrink=pathB?1-.5*ease(ramp(t,.86,.99)):1;
    let s=`<rect x="28" y="4" width="316" height="372" rx="46" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    /* lungs and heart */
    s+=`<ellipse cx="120" cy="48" rx="54" ry="36" style="fill:var(--mucosa);opacity:.55;stroke:var(--mucosa-line)"/><ellipse cx="252" cy="48" rx="50" ry="36" style="fill:var(--mucosa);opacity:.55;stroke:var(--mucosa-line)"/>`;
    s+=`<circle cx="190" cy="78" r="13" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.2"/>`;
    s+=`<text x="186" y="24" class="t-xs t-mid">lungs</text>`;
    /* peritoneum */
    s+=`<rect x="46" y="182" width="280" height="188" rx="34" style="fill:none;stroke:var(--brand);stroke-width:1.2;stroke-dasharray:5 4;opacity:.6"/><text x="100" y="364" class="t-xs">peritoneum</text>`;
    /* veins */
    s+=`<path d="${mtPathD(portal)}" style="fill:none;stroke:var(--vessel);stroke-width:4;opacity:.5;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<path d="${mtPathD(sysBase)}M196 78L122 52M196 78L248 52" style="fill:none;stroke:var(--vessel);stroke-width:3;opacity:.35;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<text x="206" y="232" class="t-xs" style="fill:var(--vessel)">portal vein</text>`;
    s+=`<text x="332" y="220" class="t-xs t-mid" transform="rotate(-90 332 220)" style="fill:var(--vessel)">systemic veins → heart → lungs</text>`;
    s+=C.svg;
    /* liver: whole, or cut into the kept part and the removed part */
    const cut=t>=.6&&t<.8,mv=cut?ease(ramp(t,.66,.74)):0,fade=cut?1-.75*ramp(t,.7,.77):1;
    const metsA=(dx,dy)=>MA.map((m,i)=>{const arr=.1+i*.05+.12,g=ramp(t,arr,arr+.04);if(g<=0)return'';const [x,y]=Lm(m[0],m[1]);return `<circle cx="${f1(x+dx)}" cy="${f1(y+dy)}" r="${f1((4+i%2*1.5)*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.8"/>`}).join('');
    const xc=Lm(12,0)[0];
    s+=`<clipPath id="mtClipL"><rect x="60" y="60" width="${f1(xc-60)}" height="130"/></clipPath><clipPath id="mtClipR"><rect x="${f1(xc)}" y="60" width="100" height="130"/></clipPath>`;
    if(cut){
      s+=`<g clip-path="url(#mtClipL)">${liver(LIV[0],LIV[1],LIV[2],0)}</g>`;
      s+=`<g transform="translate(${f1(mv*30)} ${f1(-mv*16)})" style="opacity:${f1(fade)}"><g clip-path="url(#mtClipR)">${liver(LIV[0],LIV[1],LIV[2],0)}</g>${metsA(0,0)}</g>`;
      const cl=ramp(t,.63,.66);if(cl>0&&mv<1)s+=`<line x1="${f1(xc)}" y1="80" x2="${f1(xc)}" y2="${f1(80+96*cl)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      if(mv>.3)s+=`<text x="286" y="150" class="t-xs t-mid" style="fill:var(--good)">segment removed</text>`;
    }else{
      s+=liver(LIV[0],LIV[1],LIV[2],0)+metsA(0,0);
      if(pathB)MB.forEach((m,i)=>{const g=ramp(t,.8+i*.01,.84+i*.01);const [x,y]=Lm(m[0],m[1]);if(g>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4.5*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.8"/>`});
    }
    s+=`<text x="236" y="122" class="t-lbl">liver</text>`;
    /* primary tumour */
    const pr=4+8*ramp(t,0,.1);
    s+=`<circle cx="${f1(T[0])}" cy="${f1(T[1])}" r="${f1(pr)}" style="fill:var(--tumour);opacity:.9"/><text x="${f1(T[0]+14)}" y="${f1(T[1]+22)}" class="t-xs">primary (sigmoid)</text>`;
    /* travelling cells: portal */
    MA.forEach((m,i)=>{const a=.1+i*.05,u=ramp(t,a,a+.12);if(u<=0||u>=1)return;const P=portal.concat([Lm(m[0],m[1])]),[x,y]=mtAlong(P,u);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1"/>`});
    /* systemic to lungs */
    LUNG.forEach((m,i)=>{const a=.4+i*.025,u=ramp(t,a,a+.09);if(u>0&&u<1){const [x,y]=mtAlong(sys(i).concat([m]),u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1"/>`}
      const g=ramp(t,a+.09,a+.12)*vis;if(g>0)s+=`<circle cx="${m[0]}" cy="${m[1]}" r="${f1(5*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.8;opacity:${f1(Math.max(vis,.0))}"/>`});
    /* peritoneal seeding */
    PER.forEach((m,i)=>{const a=.46+i*.025,u=ramp(t,a,a+.07);if(u>0&&u<1){const x=lerp(T[0],m[0],u),y=lerp(T[1],m[1],u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--tumour);opacity:.8"/>`}
      const g=ramp(t,a+.07,a+.1)*vis;if(g>0)s+=`<ellipse cx="${m[0]}" cy="${m[1]}" rx="${f1(6*g*shrink)}" ry="${f1(4*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.6"/>`});
    /* drugs: perioperative (path A) and systemic (path B) */
    const dA=t>=.6&&t<.8?Math.max(bump(t,.6,.67),bump(t,.74,.8)):0,dB=pathB?ramp(t,.81,.85):0,dr=Math.max(dA,dB);
    if(dr>0){for(let k=0;k<14;k++){const P=k%2?portal.slice().reverse():sys(k),u=(t*9+k/14)%1,[x,y]=mtAlong(P,u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--rx);opacity:${f1(dr*.9)}"/>`}}
    if(t>=.6&&t<.8){const lab=t<.66?'FOLFOX4 ×6 before surgery':t<.74?'hepatectomy':'FOLFOX4 ×6 after surgery';s+=`<text x="186" y="164" class="t-sm t-mid" style="fill:var(--rx)">${lab}</text>`;
      if(vis<.5)s+=`<text x="186" y="290" class="t-xs t-mid">liver-only disease</text>`}
    if(pathB)s+=`<text x="186" y="164" class="t-sm t-mid" style="fill:var(--rx)">${t<.86?'spread too wide to remove':'drugs reach every site'}</text>`;
    const nL=MA.filter((m,i)=>t>=.1+i*.05+.12).length*(t>=.6&&t<.8&&mv>.5?0:1)+(pathB?MB.filter((m,i)=>t>=.8+i*.01).length:0);
    const nLu=t<.6||pathB?LUNG.filter((m,i)=>t>=.4+i*.025+.09).length:0,nP=t<.6||pathB?PER.filter((m,i)=>t>=.46+i*.025+.07).length:0;
    return {s,nL,nLu,nP}}
  function bar(x,y,w,frac,col,lab,val){return `<text x="${f1(x)}" y="${f1(y)}" class="t-sm" style="fill:var(--ink)">${lab}</text><rect x="${f1(x)}" y="${f1(y+4)}" width="${f1(w)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+4)}" width="${f1(Math.max(0,w*frac))}" height="11" rx="3" style="fill:${col}"/><text x="${f1(x+w*frac+6)}" y="${f1(y+13)}" class="t-sm" style="fill:var(--ink);font-weight:700">${val}</text>`}
  function panel(px,py,pw,ph,t,p,N){const st=MT_STEPS[p],g=ease(ramp(t,st.from+.01,st.from+.12)),x=px+14,w=pw-28-58,rh=N?27:46;let y=py+62;
    const H=[['AT DIAGNOSIS · BURGUNDY','Spread at diagnosis'],['LATER SPREAD · BY STAGE','Liver metastases within 5 years'],['WHERE ELSE · REGISTRIES','Lungs and peritoneum'],['PATH A · EORTC 40983','Perioperative FOLFOX4 + surgery'],['PATH B · ONE US CENTRE','Median overall survival by era']][p];
    let s=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/><text x="${x}" y="${py+24}" class="t-sm">${H[0]}</text><text x="${x}" y="${py+44}" class="t-big">${H[1]}</text>`;
    if(p===0){const big=(v,xx,l1,l2)=>`<text x="${xx}" y="${y+26}" style="font:800 30px var(--display);fill:var(--tumour)">${f1(v)}%</text><text x="${xx}" y="${y+45}" class="t-sm">${l1}</text><text x="${xx}" y="${y+60}" class="t-sm">${l2}</text>`;
      s+=big(14.5*g,x,'liver metastases','already at diagnosis');s+=big(14.5*ease(ramp(t,.08,.18)),x+pw/2-6,'more appeared','within 5 years');
      y+=N?86:90;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--brand)">&lt; 2 years</text><text x="${x}" y="${y+17}" class="t-sm">for cells in a cancer to gain the ability</text><text x="${x}" y="${y+32}" class="t-sm">to metastasise (sequencing estimate)</text>`;
      if(!N){y+=62;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--polyp-line)">≈ 17 years</text><text x="${x}" y="${y+17}" class="t-sm">for a large benign tumour to evolve</text><text x="${x}" y="${y+32}" class="t-sm">into an advanced cancer</text>`;
        s+=`<text x="${x}" y="${py+ph-14}" class="t-sm">Population registry figures, earlier era.</text>`}}
    else if(p===1){[['Stage I',3.7],['Stage II',13.3],['Stage III',30.4]].forEach(([l,v],i)=>{s+=bar(x,y+i*rh,w,v/35*g,'var(--liver)',`after ${l}`,f1(v*g)+'%')});
      y+=3*rh+12;s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">About 1 in 4 developed liver metastases</text><text x="${x}" y="${y+15}" class="t-sm">overall (24.7%, German registry)</text>`;
      if(!N)s+=`<text x="${x}" y="${y+36}" class="t-sm" style="fill:var(--ink)">26.5% within 5 years in Stockholm;</text><text x="${x}" y="${y+53}" class="t-sm">more often from left-sided colon cancer</text>`}
    else if(p===2){[['Liver, at diagnosis (Burgundy)',14.5,'var(--liver)'],['Lungs, at diagnosis (Burgundy)',11.0,'var(--vessel)'],['Peritoneum, any time (Stockholm)',8.3,'var(--brand)']].forEach(([l,v,c],i)=>{s+=bar(x,y+i*rh,w,v/20*g,c,l,f1(v*g)+'%')});
      y+=3*rh+12;s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">Rectal vs colon cancer: lungs OR 2.4,</text><text x="${x}" y="${y+15}" class="t-sm" style="fill:var(--ink)">peritoneum OR 0.3 (Sweden)</text>`;
      if(!N)s+=`<text x="${x}" y="${y+36}" class="t-sm" style="fill:var(--ink)">Mucinous or signet-ring tumours:</text><text x="${x}" y="${y+53}" class="t-sm">peritoneum OR 3.8, liver OR 0.5 (colon)</text>`}
    else if(p===3){[['3-yr PFS · surgery alone',28.1,'var(--muted)'],['3-yr PFS · + FOLFOX4',35.4,'var(--rx)'],['5-yr OS · surgery alone',47.8,'var(--muted)'],['5-yr OS · + FOLFOX4',51.2,'var(--rx)']].forEach(([l,v,c],i)=>{s+=bar(x,y+i*rh,w,v/60*g,c,l,f1(v*g)+'%')});
      y+=4*rh+4;const k=ramp(t,.72,.78);
      for(let i=0;i<6;i++)s+=person(x+8+i*22,y,20,i===0&&k>0?'var(--good)':'var(--muted)',{op:i===0?1:.45});
      s+=`<text x="${x+140}" y="${y+10}" class="t-sm" style="fill:var(--ink)">≈ 1 in 6 cured after</text><text x="${x+140}" y="${y+22}" class="t-sm" style="fill:var(--ink)">hepatectomy (10-yr survivors)</text>`}
    else{[['2004–2012',22.6,'var(--muted)'],['2013–2015',28.8,'var(--accent)'],['2016–2019',32.4,'var(--rx)']].forEach(([l,v,c],i)=>{s+=bar(x,y+i*rh,w,v/40*g,c,'diagnosed '+l,f1(v*g)+' mo')});
      y+=3*rh;s+=bar(x,y,w,12/40*g,'var(--warn)','Netherlands, all stage IV, 2008–2011',f1(12*g)+' mo');
      y+=rh+10;s+=`<text x="${x}" y="${y}" class="t-sm">Cohort and population medians, not predictions.</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 640');const p=phaseOf(MT_STEPS,t),B=body(t);
    let s=`<defs>${marker('mtArr','var(--muted)')}</defs>`;
    s+=N?`<g transform="translate(14 0)">${B.s}</g>`+panel(12,394,376,236,t,p,true):B.s+panel(372,14,336,352,t,p,false);
    svg.innerHTML=s;setSt(p);
    $('#mtNote').innerHTML=noteHTML(MT_STEPS[p]);
    $('#mtRead').innerHTML=`<span>liver spots <b>${B.nL}</b></span><span>lung spots <b>${B.nLu}</b></span><span>peritoneal <b>${B.nP}</b></span><span>stage <b>${MT_STEPS[p].k}</b></span>`}
  const stop=playWire(rg,$('#mtPlay'),draw,26000,'Replay','metastatic');
  const setSt=stepWire($('#mtSteps'),MT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- biomarker ladder ---------- */
  let prof='ras',line=0;
  function ladder(){
    const cols=[1,2,3],nm=['','1st line','2nd line','Later lines'];
    $('#mtLad').innerHTML=cols.map(c=>`<div class="mt-col${line&&line!==c?' off':''}"><h4>${nm[c]}</h4>`+MT_RX.filter(r=>r.l===c).map(r=>{const on=r.p.includes(prof);
      return `<div class="mt-rx ${on?'lit':'dim'}"><b>${r.n}</b><small>${r.tr}</small>${on?`<span class="mt-k">${r.k}</span>`:''}</div>`}).join('')+'</div>').join('');
    const lit=MT_RX.filter(r=>r.p.includes(prof)&&(!line||r.l===line));
    $('#mtLadNote').innerHTML=`<div class="kicker">${MT_PROF[prof].n} · ${line?nm[line]:'all lines'}</div><h4>${lit.length} matching regimen${lit.length===1?'':'s'}</h4><p>${MT_PROF[prof].d}</p>`+
      `<div class="mt-det">${lit.map(r=>`<p><b>${r.n}</b> (${nm[r.l]}, ${r.tr}). ${r.r}</p>${r.lab?`<p class="lbl">${r.lab}</p>`:''}`).join('')}</div>`+
      `<div class="hook"><b>Exam hook</b>Test RAS (KRAS and NRAS exons 2–4) before any anti-EGFR antibody. MSI-H → checkpoint inhibitor; BRAF V600E → encorafenib + cetuximab; HER2 and KRAS G12C guide later lines.</div>`;
    $$('[data-mtp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mtp===prof));
    $$('[data-mtl]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.mtl===line))}
  $$('[data-mtp]').forEach(b=>b.addEventListener('click',()=>{prof=b.dataset.mtp;ladder()}));
  $$('[data-mtl]').forEach(b=>b.addEventListener('click',()=>{line=+b.dataset.mtl;ladder()}));
  ladder();

  /* ---------- schematic survival curves ---------- */
  const ks=$('#mtKm'),kr=$('#mtKmT');let km=MT_KM[0];
  $('#mtKmBtns').innerHTML=`<span class="kicker">Compare</span>`+MT_KM.map((k,i)=>`<button class="btn" data-mtk="${i}" aria-pressed="${i===0}">${k.b}</button>`).join('');
  const S=(a,m)=>Math.pow(a[2]/100,m/a[1]);
  function drawK(u){const N=vb(ks,'720 320','400 '+(344+32*km.arms.length));const X0=N?46:56,X1=N?384:470,Y0=N?40:34,Y1=N?250:270,xm=km.x,M=u*xm;
    const X=m=>lerp(X0,X1,m/xm),Y=v=>lerp(Y1,Y0,v);
    const cols=km.arms.length===3?['var(--muted)','var(--accent)','var(--rx)']:['var(--muted)','var(--rx)'];
    let s=`<text x="${X0}" y="${N?20:20}" class="t-sm">${km.m==='alive'?'% ALIVE':'% PROGRESSION-FREE'} · SCHEMATIC</text>`;
    [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${X0}" x2="${X1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${X0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    const step=xm<=18?3:xm<=36?6:12;for(let m=0;m<=xm;m+=step)s+=`<text x="${f1(X(m))}" y="${Y1+16}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${X1}" y="${Y1+30}" class="t-xs t-end">months</text><line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"/>`;
    km.arms.forEach((a,i)=>{const c=cols[i];
      s+=`<path d="${pathFn(v=>1-S(a,v*xm),X0,X1,Y0,Y1)}" style="fill:none;stroke:${c};stroke-width:1.5;opacity:.22"/>`;
      if(M>0)s+=`<path d="${pathFn(v=>1-S(a,v*M),X0,X(M),Y0,Y1,80)}" style="fill:none;stroke:${c};stroke-width:2.6"/>`;
      if(M>=a[1]){const yy=Y(a[2]/100);s+=`<line x1="${f1(X(a[1]))}" x2="${f1(X(a[1]))}" y1="${f1(yy)}" y2="${Y1}" style="stroke:${c};stroke-width:1.2;stroke-dasharray:3 3"/><circle cx="${f1(X(a[1]))}" cy="${f1(yy)}" r="4" style="fill:${c}"/>`}});
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${Y0-6}" y2="${Y1}" style="stroke:var(--ink);opacity:.35"/><text x="${f1(clamp(X(M),X0+20,X1-20))}" y="${Y0-10}" class="t-xs t-mid" style="fill:var(--ink)">${f1(M)} mo</text>`;
    km.arms.forEach((a,i)=>{const v=S(a,M);s+=`<circle cx="${f1(X(M))}" cy="${f1(Y(v))}" r="3.5" style="fill:var(--panel);stroke:${cols[i]};stroke-width:2"/>`});
    /* legend + readout */
    const lx=N?X0-30:490;let ly=N?Y1+50:44;
    s+=`<text x="${lx}" y="${ly}" class="t-sm" style="fill:var(--ink)">${km.b}</text>`;ly+=18;
    km.arms.forEach((a,i)=>{const v=S(a,M),mark=a[2]===50?`median ${f1(a[1])} mo`:`${a[2]}% at ${a[1]} mo`;
      s+=`<rect x="${lx}" y="${ly-8}" width="14" height="5" rx="2" style="fill:${cols[i]}"/><text x="${lx+20}" y="${ly-2}" class="t-xs" style="fill:var(--ink);font-weight:700">${a[0]}</text>`;
      s+=`<text x="${lx+20}" y="${ly+11}" class="t-xs">${mark} · at cursor ≈ ${Math.round(v*100)}%</text>`;ly+=N?32:36});
    if(!N)s+=`<text x="${lx}" y="${Y1}" class="t-xs">Dots mark the published anchor.</text>`;
    ks.innerHTML=s;
    kr.setAttribute('aria-valuetext',`${f1(M)} months: `+km.arms.map(a=>`${a[0]} about ${Math.round(S(a,M)*100)}%`).join(', '));
    $('#mtKmNote').innerHTML=`<div class="kicker">${km.b} · schematic curves</div><h4>${km.t}</h4><p>${km.txt}</p><div class="pt"><b>In plain words</b>The further right a curve stays high, the longer that group did on average. A median is the point where half the group has had the event.</div>`}
  playWire(kr,$('#mtKmPlay'),drawK,9000,'Replay','metastatic');
  $$('[data-mtk]').forEach(b=>b.addEventListener('click',()=>{km=MT_KM[+b.dataset.mtk];$$('[data-mtk]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawK(+kr.value)}));
  drawK(+kr.value);
};
