# B · Diagnosis, classification & imaging

Pass date: 2026-10-20. Modules served: dx, ddx, flare (time-course features).

Units: serum urate in mg/dL with µmol/L in brackets (1 mg/dL ≈ 59.48 µmol/L). Category cut-offs of the 2015 criteria are given exactly as the criteria state them (0.24 / 0.36 / 0.48 / 0.60 mmol/L, i.e. 240 / 360 / 480 / 600 µmol/L).

## Findings

### dx · The 2015 ACR/EULAR gout classification criteria (structure)
- Published simultaneously in Arthritis & Rheumatology and Annals of the Rheumatic Diseases (October 2015); approved by the ACR Board and the EULAR Executive Committee (Established) [[Neogi2015,Neogi2015ARD]].
- Step 1, entry criterion: at least 1 episode of swelling, pain or tenderness in a peripheral joint or bursa; the criteria are applied only to people who meet it [[Neogi2015]].
- Step 2, sufficient criterion: MSU crystals in a symptomatic joint or bursa (synovial fluid) or in a tophus, seen by a trained examiner, classifies as gout with no scoring [[Neogi2015]].
- There are no exclusion criteria, because gout can coexist with other diseases and because microscopy can miss crystals for technical, sampling or treatment reasons [[Neogi2015]].
- Step 3 (if no crystals): 8 domains, clinical (1–4), laboratory (5–6), imaging (7–8); within each domain categories are hierarchical and the highest category ever fulfilled is scored [[Neogi2015]].
- Maximum score 23; a score ≥8 classifies as gout. Two categories subtract points: serum urate <4 mg/dL (<240 µmol/L) −4, and MSU-negative synovial fluid −2 [[Neogi2015]].
- Serum urate is mandatory: the score cannot be computed without a value [[Neogi2015]].
- Serum urate rule: measured by the uricase method; ideally scored off urate-lowering therapy and >4 weeks from the start of an episode (intercritical); if practicable, retest under those conditions; the highest value irrespective of timing is scored; if ≥10 mg/dL (≥600 µmol/L), no need to retest [[Neogi2015]].
- Imaging not done scores 0, the same as a negative result (this matched the weighting the experts gave in discrete-choice exercises) [[Neogi2015]].
- Double-contour sign definition: hyperechoic irregular enhancement over the surface of hyaline cartilage that is independent of the insonation angle; a false-positive (artefactual) double contour disappears when the probe angle changes [[Neogi2015]].
- DECT definition: colour-coded urate at articular or periarticular sites, acquired at 80 kV and 140 kV and analysed with a 2-material decomposition algorithm; nail-bed, submillimetre, skin, motion, beam-hardening and vascular artefacts do not count [[Neogi2015]].
- Gout-related erosion on hand or foot radiograph: cortical break with sclerotic margin and overhanging edge; distal interphalangeal joints and the "gull wing" appearance are excluded because they occur in osteoarthritis [[Neogi2015]].
- Clinical tophus definition: draining or chalk-like subcutaneous nodule under transparent skin, often with overlying vascularity, in typical places (joints, ears, olecranon bursae, finger pads, tendons such as the Achilles) [[Neogi2015]].
- First MTP, ankle or midfoot involvement scores only as part of a mono- or oligoarticular episode; as part of a polyarticular presentation it is not specific, as it also occurs in rheumatoid arthritis [[Neogi2015]].
- Time course and characteristics are scored irrespective of anti-inflammatory treatment; erythema may be patient-reported or physician-observed, the other two characteristics are patient-reported [[Neogi2015]].
- A web calculator was published with the criteria (goutclassificationcalculator.auckland.ac.nz) [[Neogi2015]].

### dx · Machine-readable table of the 2015 ACR/EULAR items
All rows verified against Table 2 (and the definitions in Table 1) of the open full text [[Neogi2015]]. Unlisted lowest categories score 0.

| id | step | domain | item | option | points |
|---|---|---|---|---|---|
| entry | 1 | gate | ≥1 episode of swelling, pain or tenderness in a peripheral joint or bursa | required | gate |
| sufficient | 2 | gate | MSU crystals in a symptomatic joint/bursa (synovial fluid) or tophus | present → gout | sufficient |
| joint | 3 | clinical | Joint/bursa involved in symptomatic episode(s) ever | other joints, or only polyarticular | 0 |
| joint | 3 | clinical | | ankle or midfoot, mono/oligoarticular, without first MTP | 1 |
| joint | 3 | clinical | | first MTP, mono/oligoarticular | 2 |
| traits | 3 | clinical | Episode characteristics ever: erythema; can't bear touch or pressure; great difficulty walking or inability to use joint | none | 0 |
| traits | 3 | clinical | | one | 1 |
| traits | 3 | clinical | | two | 2 |
| traits | 3 | clinical | | three | 3 |
| course | 3 | clinical | Typical episode = ≥2 of: time to maximal pain <24 h; resolution ≤14 days; complete resolution between episodes | no typical episode | 0 |
| course | 3 | clinical | | one typical episode | 1 |
| course | 3 | clinical | | recurrent typical episodes | 2 |
| tophus | 3 | clinical | Clinical evidence of tophus | present | 4 |
| urate | 3 | laboratory | Serum urate, uricase method, highest value | <4 mg/dL (<0.24 mmol/L) | −4 |
| urate | 3 | laboratory | | 4–<6 mg/dL (0.24–<0.36 mmol/L) | 0 |
| urate | 3 | laboratory | | 6–<8 mg/dL (0.36–<0.48 mmol/L) | 2 |
| urate | 3 | laboratory | | 8–<10 mg/dL (0.48–<0.60 mmol/L) | 3 |
| urate | 3 | laboratory | | ≥10 mg/dL (≥0.60 mmol/L) | 4 |
| fluid | 3 | laboratory | Synovial fluid of a symptomatic (ever) joint/bursa, trained observer | not done | 0 |
| fluid | 3 | laboratory | | MSU negative | −2 |
| urate_img | 3 | imaging | Urate deposition in symptomatic (ever) joint/bursa: US double-contour sign or DECT urate | absent / not done | 0 |
| urate_img | 3 | imaging | | present (either modality) | 4 |
| erosion | 3 | imaging | Gout-related erosion on hand/foot radiograph (excl. DIP, gull wing) | absent / not done | 0 |
| erosion | 3 | imaging | | present | 4 |
| threshold | — | — | Classified as gout | total ≥8 | of 23 |

```json
{"criteria":"ACR/EULAR 2015 gout","cite":"Neogi2015","max":23,"min":-6,"threshold":8,
 "entry":"≥1 episode of swelling, pain or tenderness in a peripheral joint or bursa",
 "sufficient":"MSU crystals in symptomatic joint/bursa or tophus",
 "domains":[
  {"id":"joint","options":[["other/polyarticular",0],["ankle or midfoot, mono/oligo, no MTP1",1],["MTP1, mono/oligo",2]]},
  {"id":"traits","options":[["none",0],["one",1],["two",2],["three",3]]},
  {"id":"course","options":[["no typical episode",0],["one typical episode",1],["recurrent typical episodes",2]]},
  {"id":"tophus","options":[["absent",0],["present",4]]},
  {"id":"urate","mandatory":true,"options":[["<4 mg/dL",-4],["4-<6",0],["6-<8",2],["8-<10",3],[">=10",4]]},
  {"id":"fluid","options":[["not done",0],["MSU negative",-2]]},
  {"id":"urate_img","options":[["absent/not done",0],["DCS or DECT urate",4]]},
  {"id":"erosion","options":[["absent/not done",0],["present",4]]}],
 "clinical_only_max":15,
 "performance":{"full":{"sens":0.92,"spec":0.89,"auc":0.95},"clinical_only":{"sens":0.85,"spec":0.78,"auc":0.89},"validation_n":330}}
```

- Clinical-only maximum (no fluid, no imaging) is 2+3+2+4+4 = 15; minimum possible total is −6 (calculated from the table) [[Neogi2015]].
- Worked examples for the calculator toggles, computed from the weights above (illustrative, not patients from a study) [[Neogi2015]]:
  - Classic podagra, recurrent typical flares, all 3 characteristics, urate 8.5 mg/dL (506 µmol/L), no imaging: 2+3+2+3 = 10 → classified.
  - First flare at the first MTP, all 3 characteristics, one typical episode, urate 5.5 mg/dL (327 µmol/L) during the flare: 2+3+1+0 = 6 → not classified; retested 6 weeks later at 7.2 mg/dL (428 µmol/L): 2+3+1+2 = 8 → classified (the "normal urate during a flare" toggle).
  - Knee in an older woman, 2 characteristics, one typical episode, urate 5.0 mg/dL (297 µmol/L), fluid MSU-negative: 0+2+1+0−2 = 1 → not classified (CPPD-like toggle).
  - Tophaceous: first MTP, 3 characteristics, recurrent, tophus, urate 9 mg/dL (535 µmol/L), double-contour sign: 2+3+2+4+3+4 = 18 → classified.

### dx · Performance of the 2015 criteria and the SUGAR study behind them
- SUGAR enrolled 983 consecutive rheumatology-clinic patients with ≥1 swollen joint or subcutaneous tophus; all had synovial fluid or tophus microscopy by certified examiners; gout (MSU-positive) was present in 509 (52%) [[Taylor2015]].
- In the SUGAR development sample (n = 653) the features kept in the model were: joint erythema (OR 2.13), difficulty walking (7.34), time to maximal pain <24 h (1.32), resolution by 2 weeks (3.58), tophus (7.29), first MTP ever involved (2.30), currently tender joints elsewhere in foot/ankle (2.28) or first MTP (2.82), serum urate >6 mg/dL (>360 µmol/L; 3.35), ultrasound double-contour sign (7.23) and radiographic erosion or cyst (2.49) [[Taylor2015]].
- First MTP involvement was the most common joint pattern in gout cases (39.4%) [[Taylor2015]].
- In the independent SUGAR validation set (n = 330) the full criteria had sensitivity 0.92, specificity 0.89, AUC 0.95; the clinical-only version (no fluid, no imaging) had sensitivity 0.85, specificity 0.78, AUC 0.89 [[Neogi2015]].
- Comparators in the same validation set: ACR 1977 (full) sensitivity 1.00, specificity 0.51; Rome 0.97/0.78; New York 1.00/0.78; Mexico 1.00/0.44; Netherlands 0.95/0.59 [[Neogi2015]].
- At the cut-off that maximised sensitivity + specificity in SUGAR data, false negatives were 13.9% and false positives 10.5%; an expert paper-case "would you enrol this person in a trial" exercise landed on the same threshold [[Neogi2015]].
- Older criteria sets (before 2015), tested against crystals, had sensitivity 57.6–100% and specificity 34.3–86.4% [[Neogi2015]].
- Early vs established disease (early = symptoms ≤2 years): across older criteria, sensitivity was better in established disease (95.3% vs 84.1%) and specificity better in early disease (79.9% vs 52.5%); the Rome criteria were the best clinical set at 60.3%/84.4% (early) and 86.4%/63.6% (established) [[Taylor2016]].
- The authors state that classification criteria are not meant for making a diagnosis in clinic, and that joint or tophus aspiration remains essential to establish a diagnosis [[Neogi2015]].

### dx · Clinical diagnostic rule for primary care (Janssens / Nijmegen rule)
- Derived in 328 Dutch primary-care patients with monoarthritis; synovial MSU crystals were the reference; family-physician diagnosis of gout had PPV 0.64 and NPV 0.87 [[Janssens2010]].
- Seven predefined items: male sex, previous patient-reported arthritis attack, onset within 1 day, joint redness, first MTP involvement, hypertension or ≥1 cardiovascular disease, serum uric acid >5.88 mg/dL (>350 µmol/L); AUC 0.85 (95% CI 0.81–0.90), almost equal to the statistically optimal model (0.87) [[Janssens2010]].
- Item weights: male sex 2; previous attack 2; onset within 1 day 0.5; joint redness 1; first MTP 2.5; hypertension or ≥1 CVD 1.5; serum uric acid >5.88 mg/dL 3.5 (maximum 13); bands: ≤4 low, >4 to <8 intermediate, ≥8 high probability [[Lee2015,Janssens2010]].
- Gout prevalence by band in the derivation study, as reported by a later validation: 82.5% (≥8), 31.2% (>4–<8), 2.2% (≤4) [[Lee2015]].
- Secondary-care validation (390 patients with monoarthritis, MSU found in 219, 56%): PPV of a score ≥8 was 0.87, NPV of a score ≤4 was 0.95, AUC 0.86 (0.82–0.89) [[Kienhorst2015]].
- Gout vs septic arthritis (136 patients, 82 gout, 54 septic): mean score 8.6 vs 3.6; gout prevalence 95.3% (61/64) in the high band, 57.5% (19/33) intermediate, 5.1% (2/39) low; AUC 0.933; 3 of 54 septic joints still scored "high" [[Lee2015]].
- An evidence review for the ACP found that recent multidimensional algorithms reach sensitivity up to 88% and specificity up to 96% (moderate strength of evidence), with scant evidence from primary and urgent care [[Newberry2017]].

### dx · EULAR diagnosis recommendations (2006 and 2018 update)
- 2018 EULAR update: 8 key recommendations; a search for crystals in synovial fluid or tophus aspirates is recommended in every person with suspected gout, because MSU crystals give a definite diagnosis (Established) [[Richette2020]].
- Suggestive clinical features for a clinical diagnosis: monoarticular foot or ankle involvement (especially the first MTP), previous similar episodes, rapid onset of severe pain and swelling, erythema, male sex, associated cardiovascular disease and hyperuricaemia [[Richette2020]].
- When crystals cannot be sought, atypical presentations should be imaged, in particular with ultrasound looking for the double-contour sign and tophi [[Richette2020]].
- Gout should not be diagnosed on hyperuricaemia alone [[Richette2020]].
- Every person with gout should be assessed for associated comorbidities, cardiovascular risk factors and risk factors for chronic hyperuricaemia (strong recommendation) [[Richette2020]].
- 2006 EULAR likelihood ratios: crystal identification in symptomatic gout LR 567 (95% CI 35.5–9053); classic podagra LR 30.64; tophi LR 39.95; hyperuricaemia (local normal range) LR 9.74; radiographic asymmetrical swelling LR 4.13 and subcortical cysts without erosion LR 6.39 (late or severe gout only) [[Zhang2006Dx]].
- ACP 2017 (primary-care guideline): clinicians should use synovial fluid analysis when clinical judgement indicates that diagnostic testing is necessary in possible acute gout (weak recommendation, low-quality evidence) [[Qaseem2017Dx]].

### dx · Synovial fluid polarised microscopy
- MSU crystals are needle-like and strongly negatively birefringent (fast axis along the crystal's long axis); under a compensated polarised microscope they appear yellow when aligned parallel to the slow axis of the full-wave (red) retardation plate and blue when perpendicular, on a red/magenta background (Established) [[Zhang2016SciRep,Ragab2017]].
- CPP crystals are positively birefringent and appear blue under the same alignment; they are rod-like, rhomboid or square with weak birefringence (Established) [[Jokic2020,Ragab2017,Rosenthal2016]].
- MSU crystals may be extra- or intracellular (inside leukocytes); a laboratory report should state birefringence (strong/weak), shape, intra- vs extracellular location and number per high-power field [[Jokic2020]].
- A lens-free polarised imaging study modelled MSU crystals with a minimum diameter of 0.5 µm; typical MSU needle lengths of roughly 1–20 µm are often quoted but were not found stated in a checked source (unverified) [[Zhang2016SciRep]].
- Trained observers are consistent: in 64 samples (194 observations), MSU identification sensitivity 95.3%, specificity 97.2%, kappa 0.93; CPP identification sensitivity 92.7%, specificity 92.1%, kappa 0.79 [[Lumbreras2005]].
- Untrained or mixed readers are less reliable: in an online test of 110 participants, 81% identified all MSU images, 68% all CPP images and 23% called all 22 non-MSU images non-MSU; only 39% met the primary outcome [[Berendsen2017]].
- Older literature found low inter-observer agreement and particularly high false-negative rates for CPP crystals [[Segal1999]]; quality control of synovial fluid tests showed "worrying variations" [[Swan2002]].
- Sample handling: MSU crystal concentration falls over time at room temperature but not when refrigerated; dried cytospin preparations allowed delayed analysis for at least 12 months [[Graf2013]].
- Intercritical joints: in 101 previously inflamed but now quiet knees or first MTPs, fluid was obtained from 91; MSU crystals were found in all 43 patients not on urate-lowering drugs and in 34 of 48 who were; in 90% of positive samples crystals appeared in the first 5 microscope fields [[Pascual1999]].
- In 74 asymptomatic knees of never-treated people with gout, MSU crystals were present in 36 of 37 (97%) previously inflamed knees vs 8 of 37 never-inflamed knees; crystal-containing fluid had mean 449 cells/mm³ vs 64 cells/mm³ without crystals (low-grade inflammation) [[Pascual1991]].
- Synovial fluid categories (leukocytes ×10⁶/L = cells/µL): normal <200; non-inflammatory 20–2000; inflammatory 2000–50,000 (gout, CPPD, RA); septic >50,000 with neutrophils >75% (>90%) [[Jokic2020]].
- In acute gout, synovial leukocyte counts may exceed 50,000/µL, mostly polymorphs, overlapping with septic arthritis [[Ragab2017]]; in 265 crystal-positive aspirates the mean count was 23,200/µL [[Shah2007]].

### dx · Imaging: ultrasound
- Original description: double-contour sign in 92% of 37 crystal-proven gouty joints and in none of 33 control joints; tophaceous material in all gouty MTP and MCP joints imaged; erosions next to tophaceous material in 65% of MTP joints [[Thiele2007]].
- OMERACT agreed definitions for 4 elementary lesions: tophus, aggregates, erosion and double contour [[Terslev2015]]; reading reliability (inter-reader kappa) was 0.90 (experts) and 0.79 (web exercise) for double contour, but only 0.45 and 0.42 for aggregates [[Cazenave2019]].
- SUGAR ultrasound study (824 subjects: 416 MSU-proven cases, 408 controls): any of double contour, tophus or snowstorm had sensitivity 76.9%, specificity 84.3%, PPV 83.3%, NPV 78.2%; sensitivity was higher with disease ≥2 years and with suspected clinical tophi; specificity stayed high in early disease [[Ogdie2017]].
- Pooled for classification (11 studies, all secondary care, mean disease duration ≥7 years): double contour sensitivity 0.83 (0.72–0.91), specificity 0.76 (0.68–0.83); ultrasound tophus 0.65/0.80 [[Ogdie2015]].
- Later meta-analyses: double contour 66%/92%, tophus 56%/94%, snowstorm 31%/91%, any feature 80%/83% (person level) [[Zhang2018US]]; overall ultrasound 65.1%/89.0%, with tophus 54.3%/93.2%, snowstorm 30.8%/90.6% and erosion 51.6%/93.3% [[Lee2018]]; double contour 0.70/0.95, tophus 0.57/0.99, overall 0.84/0.84 [[Shang2022]]; the ACP evidence review pooled double contour at 74%/88% [[Newberry2017]].
- The double-contour sign can disappear: in 5 people followed 7–18 months, it vanished in every joint where serum urate stayed <6 mg/dL (<360 µmol/L), but not where it stayed ≥7 mg/dL (≥416 µmol/L) [[Thiele2010]].
- Deposition without disease: in people with asymptomatic hyperuricaemia, pooled prevalence of first-MTP double contour was 0.31 and femoral-condyle double contour 0.16 (OR vs normouricaemia 6.98 and 13.67) [[Stewart2019]].

### dx · Imaging: dual-energy CT (DECT)
- First prospective validation (40 gout, 40 controls; mean gout duration 13 years; 87% had used ULT): specificity 0.93, sensitivity 0.78 (0.84 excluding 3 unreadable scans); urate-volume reproducibility ICC 1.00 [[Choi2012]].
- Accuracy and diagnostic-yield study (40 active gout, 41 controls): sensitivity 0.90, specificity 0.83; all 4 false negatives were first flares with symptoms <6 weeks; all 7 false positives had advanced knee osteoarthritis (Kellgren–Lawrence 3–4); DECT showed urate in 14 of 30 (46.7%) fluid-negative patients with suspected gout [[Bongartz2015]].
- Non-tophaceous gout: DECT found urate in 7 of 11 (64%) patients but in only 3 of 12 (25%) aspirate-proven joints; all 10 tophaceous patients were positive [[Baer2016]].
- Pooled estimates: 0.87/0.84 (classification meta-analysis) [[Ogdie2015]]; 84.7%/93.7%, AUC 0.956 (8 studies) [[Lee2017]]; person level 0.81/0.91, joint level 0.83/0.88, but joint-level sensitivity only 0.55 (0.46–0.64) with disease ≤6 weeks [[Gamala2019]]; 0.89/0.91 overall and 0.75/0.85 with disease ≤2 years, when overall ultrasound was 0.93/0.80 [[Shang2022]]; ACP review range 85–100% / 83–92% [[Newberry2017]].
- Artefacts are common: some artefact appeared in 90% of 50 four-limb gout protocols, nail-bed and skin artefacts most often [[Mallinson2014]].

### dx · Imaging: plain radiography
- Radiographs have little role early; in late or severe gout, asymmetrical swelling and subcortical cysts without erosion help (LR 4.13 and 6.39) [[Zhang2006Dx]].
- The criteria erosion is a cortical break with sclerotic margin and overhanging edge [[Neogi2015]]; erosion is driven by tophus: 98% (96/98) of joints with radiographic erosion score 4–5 had intraosseous tophus on CT, and all 56 CT erosions >7.5 mm contained tophus (CT erosion vs tophus diameter r = 0.93) [[Dalbeth2009]].

### dx · Serum urate during and after a flare
- In 339 people in two flare trials, 14% had serum urate ≤6 mg/dL (≤357 µmol/L) and 32% ≤8 mg/dL (≤476 µmol/L) at the flare; mean 7.1 vs 8.5 mg/dL (422 vs 506 µmol/L) in allopurinol users vs non-users; flares occurred below the 6.8 mg/dL (405 µmol/L) saturation level [[Schlesinger2009]].
- In 41 patients, serum urate was normal during the flare in 20 (49%); mean 7.5 ± 1.4 mg/dL (446 µmol/L) during flares vs 8.5 ± 0.9 mg/dL (506 µmol/L) between flares; the fall correlated with CRP and IL-6 and with higher fractional urate excretion [[Urano2002]].
- Practical rule: score the highest value, ideally >4 weeks after the start of a flare and off ULT; retest if practicable [[Neogi2015]]; a normal urate at presentation does not exclude a flare [[Schlesinger2009]].

### dx · Screening after diagnosis
- EULAR: assess every person with gout for comorbidities, cardiovascular risk factors and causes of chronic hyperuricaemia [[Richette2020]]; the 2006 EULAR set listed cardiovascular disease, hypertension, diabetes, obesity and chronic renal failure as associated comorbidities, and sex, diuretics, purine-rich food, alcohol and lead as risk factors [[Zhang2006Dx]].
- How common (US NHANES 2007–2008, people with gout): hypertension 74%, CKD stage ≥2 71%, obesity 53%, diabetes 26%, nephrolithiasis 24%, myocardial infarction 14%, heart failure 11%, stroke 10% [[Zhu2012]].
- Check urate-lowering indications at diagnosis: the ACR strongly recommends ULT for tophaceous gout, radiographic damage due to gout or frequent flares, with a serum urate target <6 mg/dL (<360 µmol/L) [[FitzGerald2020]]; EULAR says ULT should be considered from the first presentation [[Richette2017]].
- Before allopurinol, ACR 2020 advises HLA-B*5801 testing in people of Southeast Asian descent (for example Han Chinese, Korean, Thai) and African American people [[FitzGerald2020]].

### flare · Definitions, nomenclature and time course
- G-CAN agreed 11 labels: monosodium urate crystals, urate, hyperuricaemia, tophus, subcutaneous tophus, gout flare, intercritical gout, chronic gouty arthritis, imaging evidence of MSU crystal deposition, gouty bone erosion and podagra; "chronic gout" should not be used [[Bursill2019]].
- Gout flare = a clinically evident episode of acute inflammation induced by monosodium urate crystals; intercritical gout = the asymptomatic period after or between gout flares; chronic gouty arthritis = persistent joint inflammation caused by MSU crystals; podagra = a flare at the first MTP joint [[Bursill2019]].
- G-CAN disease states: asymptomatic hyperuricaemia; asymptomatic MSU crystal deposition; asymptomatic hyperuricaemia with MSU deposition; gout; tophaceous gout; erosive gout; first gout flare; recurrent gout flares. "Gout" is restricted to current or prior clinically evident disease (flare, chronic gouty arthritis or subcutaneous tophus) [[Bursill2019ARD]].
- Validated flare definition for people already diagnosed: ≥3 of 4 patient-reported items: patient says it is a flare, pain at rest >3 on 0–10, ≥1 swollen joint, ≥1 warm joint; sensitivity 85%, specificity 95%, accuracy 92%, AUC 0.97 in 509 patients at 17 sites [[Gaffo2018]]; in the provisional derivation (210 patients) the same rule gave 91%/82% [[Gaffo2012]].
- Typical-episode features used by the criteria: time to maximal pain <24 h, resolution ≤14 days, complete resolution between episodes [[Neogi2015]]; each discriminated MSU-proven gout in SUGAR (time to maximal pain <24 h OR 1.32; resolution by 2 weeks OR 3.58) [[Taylor2015]].
- Night onset: in 724 people with 1,433 flares, 733 began 00:00–07:59, 310 at 08:00–15:59 and 390 at 16:00–23:59; overnight risk OR 2.36 (2.05–2.73) vs daytime, evening OR 1.26 [[Choi2015]].
- Untreated course: in 11 volunteers with podagra observed without effective NSAID treatment, 2 withdrew on day 4 with severe pain; all remaining showed some pain improvement by day 5 and swelling improvement by day 7, but only 3 had pain resolution within the 7-day study [[Bellamy1987]].
- Fever is not rare in crystal arthritis: among 67 hospitalised people with gout or pseudogout, fever attributable to synovitis occurred in 34% (50% polyarticular vs 20% monoarticular); polyarticular gout was present in 49% [[Ho1993]].
- Resolution biology: aggregated neutrophil extracellular traps are important in the resolution phase; gout is a chronic disease even though it presents as flares (Established) [[Dalbeth2021]].

### ddx · Differential matrix (condition × feature)
Columns: typical joint · crystals · fever/inflammation · onset · imaging hallmark · who.
- **Gout** · first MTP (39.4% of SUGAR gout cases), ankle/midfoot, mono/oligoarticular [[Taylor2015,Neogi2015]] · needles, strong negative birefringence, yellow parallel to slow axis [[Zhang2016SciRep]] · fever possible (34% in hospitalised crystal arthritis) [[Ho1993]] · maximal pain <24 h, often overnight, resolves ≤14 days [[Neogi2015,Choi2015]] · double contour, tophus, DECT urate, overhanging-edge erosion [[Neogi2015,Thiele2007]] · men, hypertension/CVD, raised urate [[Janssens2010,Richette2020]].
- **Acute CPP crystal arthritis (CPPD)** · knee and wrist; crowned dens syndrome is a sufficient criterion [[Abhishek2023,Rosenthal2016]] · rhomboid-shaped, weak positive birefringence, blue parallel [[Rosenthal2016,Jokic2020]] · fever reported [[Rosenthal2016,Ho1993]] · rapid-onset inflammation suggestive but not definitive [[Zhang2011CPPD]] · chondrocalcinosis; ultrasound LR 24.2 for peripheral joints [[Zhang2011CPPD]] · age at onset >60 is a criteria item, OA, hyperparathyroidism, haemochromatosis, hypomagnesaemia, Gitelman syndrome [[Abhishek2023,Zhang2011CPPD]]. 2023 ACR/EULAR CPPD criteria: entry joint pain/swelling/tenderness, exclusion if fully explained by another disease, classify if score >56; sensitivity/specificity 92.2%/87.9% (derivation) and 99.2%/92.5% (validation) [[Abhishek2023,Abhishek2023ARD]].
- **Septic arthritis** · knee most common when coexisting with gout; shoulder sepsis bacteraemic in 90% [[Yu2003,Papanicolas2012]] · crystals do not exclude it: infection in 1.5% of 265 crystal aspirates and 5% of crystal-positive joints [[Shah2007,Papanicolas2012]] · fever sensitivity only 57%, rigors 19%; one-third of septic gout cases afebrile [[Margaretten2007,Yu2003]] · acute; synovial WBC and % neutrophils are needed before Gram stain and culture results return [[Margaretten2007,Mathews2010]] · no imaging hallmark; aspiration is the key test [[Mathews2010]] · older age, diabetes, RA, joint surgery, hip/knee prosthesis, skin infection, HIV [[Margaretten2007]].
- **Cellulitis** · skin, not joint: deep dermis and subcutaneous tissue with expanding erythema, warmth, tenderness, swelling [[Raff2016]] · none · culture rarely positive (organism identified in 15%) [[Raff2016]] · no effective diagnostic test, diagnosis clinical [[Raff2016]] · — · 30.5% of 259 admitted "lower-limb cellulitis" cases had another diagnosis (pseudocellulitis) [[Weng2017]].
- **Reactive arthritis** · acute oligoarthritis of larger joints [[Hannu2011]] · none · sterile inflammation [[Hannu2011]] · 2–4 weeks after a gut or urogenital infection [[Hannu2011]] · — · incidence 0.6–27/100,000 per year; HLA-B27 not a diagnostic test [[Hannu2011]].
- **Psoriatic arthritis** · inflammatory articular disease plus CASPAR points: current psoriasis 2; history or family history of psoriasis, dactylitis, juxta-articular new bone, RF negativity, nail dystrophy 1 each; ≥3 classifies (specificity 0.987, sensitivity 0.914) [[Taylor2006CASPAR]] · none · — · — · juxta-articular new bone formation [[Taylor2006CASPAR]] · psoriasis.
- **Rheumatoid arthritis** · polyarticular small joints; first MTP/midfoot as part of a polyarticular pattern is not specific for gout [[Neogi2015]] · none · acute-phase response is one criteria domain [[Aletaha2010]] · symptom duration is a domain (2 levels, 0–1) [[Aletaha2010]] · — · 2010 criteria: synovitis in ≥1 joint, score ≥6 of 10 from joint count (0–5), serology (0–3), acute-phase (0–1), duration (0–1) [[Aletaha2010]].
- **Osteoarthritis (incl. erosive/nodal)** · knee, hand DIPs [[Zhang2010OA,Neogi2015]] · occasional CPP (non-inflammatory fluid 20–2000 cells/µL) [[Jokic2020]] · limited morning stiffness [[Zhang2010OA]] · persistent usage pain [[Zhang2010OA]] · gull-wing erosions; DECT can falsely show "urate" in advanced knee OA [[Neogi2015,Bongartz2015]] · crepitus, restricted movement, bony enlargement [[Zhang2010OA]].
- **Trauma or fracture** · any joint · none · — · follows injury · fracture on radiograph · history of injury (unverified: general clinical knowledge, no source checked).

### ddx · Septic arthritis: numbers and red flags
- Across 14 studies (6242 patients, 653 with septic arthritis) synovial WBC likelihood ratios were: <25,000/µL LR 0.32; ≥25,000 LR 2.9; >50,000 LR 7.7; >100,000 LR 28.0; neutrophils ≥90% LR 3.4 [[Margaretten2007]].
- A 50,000/µL cut-off missed 39% of 49 culture-proven septic joints (sensitivity 61%); 55% had a negative Gram stain [[McGillicuddy2007]].
- The 4 coexisting crystal + infection aspirates had mean WBC 113,000/µL vs 23,200 for all crystal aspirates; all 4 patients had major comorbidities and counts >50,000 [[Shah2007]].
- Coexistence is very unlikely only when the Gram stain is negative, CRP <100 mg/L and joint WBC <10,000/µL [[Papanicolas2012]]; in 30 people with septic gout, 30% had a normal blood count and 10% a synovial count <6000/mm³; ruptured, infected tophi were the commonest route; S. aureus caused 16 cases [[Yu2003]].
- Red flags for the ddx strip: fever, sweats or rigors (but absence does not exclude) [[Margaretten2007]]; prosthetic joint, diabetes, RA, skin infection, HIV [[Margaretten2007]]; shoulder involvement [[Papanicolas2012]]; atypical presentation, which EULAR says should be investigated further [[Richette2020]]; "no improvement in 48–72 h" (unverified: no checked source).

### Exam hooks
- Entry: ≥1 episode of peripheral joint/bursa swelling, pain or tenderness; sufficient: MSU crystals; otherwise ≥8 of 23 points [[Neogi2015]].
- Two negative scores: urate <4 mg/dL (−4) and MSU-negative fluid (−2) [[Neogi2015]].
- "Typical episode" = ≥2 of: maximal pain <24 h, resolution ≤14 days, complete resolution between episodes [[Neogi2015]].
- Full criteria 92%/89% (AUC 0.95); clinical-only 85%/78% [[Neogi2015]].
- MSU: needle, strongly negative, yellow when parallel to the compensator's slow axis; CPP: rhomboid, weakly positive, blue when parallel [[Zhang2016SciRep,Jokic2020,Rosenthal2016]].
- Up to half of people have a normal serum urate during a flare (49% in one series) [[Urano2002]].
- Crystals do not exclude infection: 1.5–5% of crystal-positive joints are also septic [[Shah2007,Papanicolas2012]].
- DECT misses early gout: joint-level sensitivity 0.55 in disease ≤6 weeks [[Gamala2019]].
- Janssens rule: ≥8 points PPV 0.87, ≤4 points NPV 0.95 [[Kienhorst2015]].
- Classification criteria are not diagnostic criteria [[Neogi2015]].
- MSU crystals persist in previously inflamed, untreated joints between flares (97% of knees) [[Pascual1991]].

### In plain words
- Gout is confirmed when a doctor sees urate crystals in fluid taken from a swollen joint or lump [[Richette2020]].
- Under a special microscope, gout crystals look like thin yellow needles; the crystals of a similar disease, CPPD, look like small blue blocks [[Zhang2016SciRep,Jokic2020]].
- If no fluid can be taken, doctors add up points for where the pain is, how fast it came, the blood urate level and scan results; 8 points or more points to gout [[Neogi2015]].
- Your urate level can look normal during a flare, so it is worth checking again about a month later [[Urano2002,Neogi2015]].
- A gout flare usually peaks within a day and settles within two weeks, and often starts at night [[Neogi2015,Choi2015]].
- A hot, swollen joint with fever or chills needs a doctor the same day, because a joint infection can look like gout and both can happen together [[Margaretten2007,Shah2007]].
- An ultrasound or a special CT scan can show urate crystals, but it can miss them early in the disease [[Ogdie2017,Gamala2019]].
- After diagnosis, ask to have your blood pressure, kidneys, blood sugar and heart risk checked [[Richette2020,Zhu2012]].

## Numbers for the animations
- acr_eular_threshold | total | 8 | points (max 23, min −6) | [[Neogi2015]]
- acr_eular_performance | full | 0.92 / 0.89 / 0.95 | sensitivity / specificity / AUC | [[Neogi2015]]
- acr_eular_performance | clinical_only | 0.85 / 0.78 / 0.89 | sensitivity / specificity / AUC | [[Neogi2015]]
- janssens_band_gout_prevalence | ≤4 | 2.2 | % | [[Lee2015]]
- janssens_band_gout_prevalence | >4–<8 | 31.2 | % | [[Lee2015]]
- janssens_band_gout_prevalence | ≥8 | 82.5 | % | [[Lee2015]]
- untreated_flare_pain (schematic, label as such) | 0 h | 1 | NRS 0–10 | [[Neogi2015]]
- untreated_flare_pain (schematic) | 12 h | 7 | NRS | [[Neogi2015]]
- untreated_flare_pain (schematic) | 24 h | 9 | NRS (maximal pain <24 h) | [[Neogi2015,Taylor2015]]
- untreated_flare_pain (schematic) | 5 d | 6 | NRS (all completers improving by day 5) | [[Bellamy1987]]
- untreated_flare_pain (schematic) | 7 d | 3 | NRS (only 3 of 9 pain-free by day 7) | [[Bellamy1987]]
- untreated_flare_pain (schematic) | 14 d | 0 | NRS (resolution ≤14 days) | [[Neogi2015]]
- flare_onset_by_clock | 00:00–07:59 | 2.36 | odds ratio vs daytime (733 of 1,433 flares) | [[Choi2015]]
- flare_onset_by_clock | 08:00–15:59 | 1.00 | reference (310 flares) | [[Choi2015]]
- flare_onset_by_clock | 16:00–23:59 | 1.26 | odds ratio (390 flares) | [[Choi2015]]
- serum_urate_flare_vs_intercritical | flare | 7.5 | mg/dL (446 µmol/L) | [[Urano2002]]
- serum_urate_flare_vs_intercritical | intercritical | 8.5 | mg/dL (506 µmol/L) | [[Urano2002]]
- normal_urate_during_flare | ≤6 mg/dL | 14 | % of 339 | [[Schlesinger2009]]
- normal_urate_during_flare | ≤8 mg/dL | 32 | % of 339 | [[Schlesinger2009]]
- dect_sensitivity_by_duration | ≤6 weeks (joint level) | 0.55 | sensitivity | [[Gamala2019]]
- dect_sensitivity_by_duration | all (joint level) | 0.83 | sensitivity | [[Gamala2019]]
- dect_sensitivity_by_duration | ≤2 years | 0.75 | sensitivity | [[Shang2022]]
- dect_sensitivity_by_duration | all | 0.89 | sensitivity | [[Shang2022]]
- us_any_feature | SUGAR | 0.769 / 0.843 | sensitivity / specificity | [[Ogdie2017]]
- us_dcs_disappears | ≥7 months at SU <6 mg/dL | gone | double-contour sign | [[Thiele2010]]
- synovial_wbc_LR | <25,000/µL | 0.32 | likelihood ratio for sepsis | [[Margaretten2007]]
- synovial_wbc_LR | ≥25,000 | 2.9 | LR | [[Margaretten2007]]
- synovial_wbc_LR | >50,000 | 7.7 | LR | [[Margaretten2007]]
- synovial_wbc_LR | >100,000 | 28.0 | LR | [[Margaretten2007]]
- microscopy_reliability | MSU (trained) | 0.93 | kappa | [[Lumbreras2005]]
- microscopy_reliability | CPP (trained) | 0.79 | kappa | [[Lumbreras2005]]

## Open questions and controversies
- Classification vs diagnosis: the 2015 criteria were built to enrol homogeneous study groups, and their authors say they are not for diagnosis, which still needs aspiration [[Neogi2015]]; in practice the clinical-only score and the Janssens rule are used as diagnostic aids where aspiration is not done, with PPV 0.87 at ≥8 in secondary care [[Kienhorst2015]] and moderate evidence for algorithms overall [[Newberry2017]]. Status: unresolved; the calculator module must keep the "classification is not diagnosis" callout.
- Aspirate everyone, or diagnose clinically in primary care? EULAR 2018 recommends a crystal search in every person with suspected gout [[Richette2020]]; ACP 2017 recommends fluid analysis only when clinical judgement says testing is needed (weak, low-quality evidence) [[Qaseem2017Dx]]. Status: setting-dependent; both agree a hot joint with any suspicion of infection is aspirated [[Margaretten2007,Richette2020]].
- DECT in early gout: high pooled accuracy in established disease (AUC 0.956) [[Lee2017]] vs low sensitivity in first flares and disease ≤6 weeks (0.55) [[Gamala2019,Bongartz2015]] and in non-tophaceous joints (25%) [[Baer2016]]; artefacts in 90% of scans [[Mallinson2014]] and false positives in advanced knee OA [[Bongartz2015]]. Status: (Established) that a negative DECT does not exclude early gout.
- Ultrasound vs DECT first: one meta-analysis finds DECT more accurate overall but ultrasound more sensitive in disease ≤2 years (0.93 vs 0.75) [[Shang2022]]; EULAR names ultrasound as the first imaging choice [[Richette2020]]. Status: (Early evidence) for the early-disease advantage.
- Does imaging deposition equal gout? Double contour appears in 31% of first MTPs in asymptomatic hyperuricaemia [[Stewart2019]]; G-CAN reserves "gout" for clinically evident disease and calls the rest "asymptomatic MSU crystal deposition" [[Bursill2019ARD]]. Status: open; the criteria score imaging only in a symptomatic (ever) joint [[Neogi2015]].
- When to measure urate: ideally >4 weeks after flare onset, but the highest value irrespective of timing is scored [[Neogi2015]]; flare-time values are lower by about 1 mg/dL on average [[Urano2002]]. Status: settled for classification; a normal flare value should be repeated.

## Sources
- [Neogi2015] Neogi T, Jansen TL, Dalbeth N, Fransen J, Schumacher HR, Berendsen D, et al. 2015 Gout Classification Criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Arthritis Rheumatol. 2015;67(10):2557-2568. PMID 26352873; PMCID PMC4566153; doi:10.1002/art.39254. Validated: PubMed, Europe PMC (full text, Tables 1–3), 2026-10-20.
- [Neogi2015ARD] Neogi T, Jansen TL, Dalbeth N, Fransen J, Schumacher HR, Berendsen D, et al. 2015 Gout classification criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Ann Rheum Dis. 2015;74(10):1789-1798. PMID 26359487; PMCID PMC4602275; doi:10.1136/annrheumdis-2015-208237. Validated: PubMed, Europe PMC, 2026-10-20.
- [Taylor2015] Taylor WJ, Fransen J, Jansen TL, Dalbeth N, Schumacher HR, Brown M, et al. Study for Updated Gout Classification Criteria: identification of features to classify gout. Arthritis Care Res (Hoboken). 2015;67(9):1304-1315. PMID 25777045; PMCID PMC4573373; doi:10.1002/acr.22585. Validated: PubMed, Europe PMC, 2026-10-20.
- [Taylor2016] Taylor WJ, Fransen J, Dalbeth N, Neogi T, Schumacher HR, Brown M, et al. Performance of classification criteria for gout in early and established disease. Ann Rheum Dis. 2016;75(1):178-182. PMID 25351521; doi:10.1136/annrheumdis-2014-206364. Validated: PubMed, Europe PMC, 2026-10-20.
- [Janssens2010] Janssens HJ, Fransen J, van de Lisdonk EH, van Riel PL, van Weel C, Janssen M. A diagnostic rule for acute gouty arthritis in primary care without joint fluid analysis. Arch Intern Med. 2010;170(13):1120-1126. PMID 20625017; doi:10.1001/archinternmed.2010.196. Validated: PubMed, Europe PMC (abstract; item weights confirmed via Lee2015 full text), 2026-10-20.
- [Kienhorst2015] Kienhorst LB, Janssens HJ, Fransen J, Janssen M. The validation of a diagnostic rule for gout without joint fluid analysis: a prospective study. Rheumatology (Oxford). 2015;54(4):609-614. PMID 25231179; doi:10.1093/rheumatology/keu378. Validated: PubMed, Europe PMC, 2026-10-20.
- [Lee2015] Lee KH, Choi ST, Lee SK, Lee JH, Yoon BY. Application of a novel diagnostic rule in the differential diagnosis between acute gouty arthritis and septic arthritis. J Korean Med Sci. 2015;30(6):700-704. PMID 26028920; PMCID PMC4444468; doi:10.3346/jkms.2015.30.6.700. Validated: PubMed, Europe PMC (full text), 2026-10-20.
- [Richette2020] Richette P, Doherty M, Pascual E, Barskova V, Becce F, Castaneda J, et al. 2018 updated European League Against Rheumatism evidence-based recommendations for the diagnosis of gout. Ann Rheum Dis. 2020;79(1):31-38. PMID 31167758; doi:10.1136/annrheumdis-2019-215315. Validated: PubMed, Europe PMC (abstract), 2026-10-20.
- [Zhang2006Dx] Zhang W, Doherty M, Pascual E, Bardin T, Barskova V, Conaghan P, et al. EULAR evidence based recommendations for gout. Part I: Diagnosis. Report of a task force of the Standing Committee for International Clinical Studies Including Therapeutics (ESCISIT). Ann Rheum Dis. 2006;65(10):1301-1311. PMID 16707533; PMCID PMC1798330; doi:10.1136/ard.2006.055251. Validated: PubMed, Europe PMC, 2026-10-20.
- [Ogdie2015] Ogdie A, Taylor WJ, Weatherall M, Fransen J, Jansen TL, Neogi T, et al. Imaging modalities for the classification of gout: systematic literature review and meta-analysis. Ann Rheum Dis. 2015;74(10):1868-1874. PMID 24915980; PMCID PMC4869978; doi:10.1136/annrheumdis-2014-205431. Validated: PubMed, Europe PMC, 2026-10-20.
- [Ogdie2017] Ogdie A, Taylor WJ, Neogi T, Fransen J, Jansen TL, Schumacher HR, et al. Performance of ultrasound in the diagnosis of gout in a multicenter study: comparison with monosodium urate monohydrate crystal analysis as the gold standard. Arthritis Rheumatol. 2017;69(2):429-438. PMID 27748084; PMCID PMC5278908; doi:10.1002/art.39959. Validated: PubMed, Europe PMC, 2026-10-20.
- [Bongartz2015] Bongartz T, Glazebrook KN, Kavros SJ, Murthy NS, Merry SP, Franz WB 3rd, et al. Dual-energy CT for the diagnosis of gout: an accuracy and diagnostic yield study. Ann Rheum Dis. 2015;74(6):1072-1077. PMID 24671771; PMCID PMC4431329; doi:10.1136/annrheumdis-2013-205095. Validated: PubMed, Europe PMC (full text), 2026-10-20.
- [Choi2012] Choi HK, Burns LC, Shojania K, Koenig N, Reid G, Abufayyah M, et al. Dual energy CT in gout: a prospective validation study. Ann Rheum Dis. 2012;71(9):1466-1471. PMID 22387729; doi:10.1136/annrheumdis-2011-200976. Validated: PubMed, Europe PMC, 2026-10-20.
- [Gamala2019] Gamala M, Jacobs JWG, van Laar JM. The diagnostic performance of dual energy CT for diagnosing gout: a systematic literature review and meta-analysis. Rheumatology (Oxford). 2019;58(12):2117-2121. PMID 31089688; doi:10.1093/rheumatology/kez180. Validated: PubMed, Europe PMC, 2026-10-20.
- [Lee2017] Lee YH, Song GG. Diagnostic accuracy of dual-energy computed tomography in patients with gout: a meta-analysis. Semin Arthritis Rheum. 2017;47(1):95-101. PMID 28372824; doi:10.1016/j.semarthrit.2017.03.002. Validated: PubMed, Europe PMC, 2026-10-20.
- [Lee2018] Lee YH, Song GG. Diagnostic accuracy of ultrasound in patients with gout: a meta-analysis. Semin Arthritis Rheum. 2018;47(5):703-709. PMID 29054295; doi:10.1016/j.semarthrit.2017.09.012. Validated: PubMed, Europe PMC, 2026-10-20.
- [Zhang2018US] Zhang Q, Gao F, Sun W, Ma J, Cheng L, Li Z. The diagnostic performance of musculoskeletal ultrasound in gout: a systematic review and meta-analysis. PLoS One. 2018;13(7):e0199672. PMID 29979706; PMCID PMC6034830; doi:10.1371/journal.pone.0199672. Validated: PubMed, Europe PMC, 2026-10-20.
- [Shang2022] Shang J, Zhou LP, Wang H, Liu B. Diagnostic performance of dual-energy CT versus ultrasonography in gout: a meta-analysis. Acad Radiol. 2022;29(1):56-68. PMID 32980243; doi:10.1016/j.acra.2020.08.030. Validated: PubMed, Europe PMC, 2026-10-20.
- [Newberry2017] Newberry SJ, FitzGerald JD, Motala A, Booth M, Maglione MA, Han D, et al. Diagnosis of gout: a systematic review in support of an American College of Physicians clinical practice guideline. Ann Intern Med. 2017;166(1):27-36. PMID 27802505; doi:10.7326/M16-0462. Validated: PubMed, Europe PMC, 2026-10-20.
- [Baer2016] Baer AN, Kurano T, Thakur UJ, Thawait GK, Fuld MK, Maynard JW, et al. Dual-energy computed tomography has limited sensitivity for non-tophaceous gout: a comparison study with tophaceous gout. BMC Musculoskelet Disord. 2016;17:91. PMID 26891750; PMCID PMC4758140; doi:10.1186/s12891-016-0943-9. Validated: PubMed, Europe PMC, 2026-10-20.
- [Mallinson2014] Mallinson PI, Coupal T, Reisinger C, Chou H, Munk PL, Nicolaou S, et al. Artifacts in dual-energy CT gout protocol: a review of 50 suspected cases with an artifact identification guide. AJR Am J Roentgenol. 2014;203(1):W103-W109. PMID 24951221; doi:10.2214/AJR.13.11396. Validated: PubMed, Europe PMC, 2026-10-20.
- [Thiele2007] Thiele RG, Schlesinger N. Diagnosis of gout by ultrasound. Rheumatology (Oxford). 2007;46(7):1116-1121. PMID 17468505; doi:10.1093/rheumatology/kem058. Validated: PubMed, Europe PMC, 2026-10-20.
- [Thiele2010] Thiele RG, Schlesinger N. Ultrasonography shows disappearance of monosodium urate crystal deposition on hyaline cartilage after sustained normouricemia is achieved. Rheumatol Int. 2010;30(4):495-503. PMID 19543895; doi:10.1007/s00296-009-1002-8. Validated: PubMed, Europe PMC, 2026-10-20.
- [Terslev2015] Terslev L, Gutierrez M, Schmidt WA, Keen HI, Filippucci E, Kane D, et al. Ultrasound as an outcome measure in gout. A validation process by the OMERACT Ultrasound Working Group. J Rheumatol. 2015;42(11):2177-2181. PMID 26329333; doi:10.3899/jrheum.141294. Validated: PubMed, Europe PMC, 2026-10-20.
- [Cazenave2019] Cazenave T, Martire V, Reginato AM, Gutierrez M, Waimann CA, Pineda C, et al. Reliability of OMERACT ultrasound elementary lesions in gout: results from a multicenter exercise. Rheumatol Int. 2019;39(4):707-713. PMID 30539275; doi:10.1007/s00296-018-4220-0. Validated: PubMed, Europe PMC, 2026-10-20.
- [Stewart2019] Stewart S, Maxwell H, Dalbeth N. Prevalence and discrimination of OMERACT-defined elementary ultrasound lesions of gout in people with asymptomatic hyperuricaemia: a systematic review and meta-analysis. Semin Arthritis Rheum. 2019;49(1):62-73. PMID 30709689; doi:10.1016/j.semarthrit.2019.01.004. Validated: PubMed, Europe PMC, 2026-10-20.
- [Dalbeth2009] Dalbeth N, Clark B, Gregory K, Gamble G, Sheehan T, Doyle A, et al. Mechanisms of bone erosion in gout: a quantitative analysis using plain radiography and computed tomography. Ann Rheum Dis. 2009;68(8):1290-1295. PMID 18708415; doi:10.1136/ard.2008.094201. Validated: PubMed, Europe PMC, 2026-10-20.
- [Schlesinger2009] Schlesinger N, Norquist JM, Watson DJ. Serum urate during acute gout. J Rheumatol. 2009;36(6):1287-1289. PMID 19369457; doi:10.3899/jrheum.080938. Validated: PubMed, Europe PMC, 2026-10-20.
- [Urano2002] Urano W, Yamanaka H, Tsutani H, Nakajima H, Matsuda Y, Taniguchi A, et al. The inflammatory process in the mechanism of decreased serum uric acid concentrations during acute gouty arthritis. J Rheumatol. 2002;29(9):1950-1953. PMID 12233891 (no DOI registered). Validated: PubMed, Europe PMC, 2026-10-20.
- [Bursill2019] Bursill D, Taylor WJ, Terkeltaub R, Kuwabara M, Merriman TR, Grainger R, et al. Gout, Hyperuricemia, and Crystal-Associated Disease Network consensus statement regarding labels and definitions for disease elements in gout. Arthritis Care Res (Hoboken). 2019;71(3):427-434. PMID 29799677; PMCID PMC6252290; doi:10.1002/acr.23607. Validated: PubMed, Europe PMC (abstract; definition wording confirmed by Europe PMC full-text phrase search), 2026-10-20.
- [Bursill2019ARD] Bursill D, Taylor WJ, Terkeltaub R, Abhishek A, So AK, Vargas-Santos AB, et al. Gout, Hyperuricaemia and Crystal-Associated Disease Network (G-CAN) consensus statement regarding labels and definitions of disease states of gout. Ann Rheum Dis. 2019;78(11):1592-1600. PMID 31501138; PMCID PMC7288724; doi:10.1136/annrheumdis-2019-215933. Validated: PubMed, Europe PMC, 2026-10-20.
- [Gaffo2018] Gaffo AL, Dalbeth N, Saag KG, Singh JA, Rahn EJ, Mudano AS, et al. Brief report: validation of a definition of flare in patients with established gout. Arthritis Rheumatol. 2018;70(3):462-467. PMID 29161469; doi:10.1002/art.40381. Validated: PubMed, Europe PMC, 2026-10-20.
- [Gaffo2012] Gaffo AL, Schumacher HR, Saag KG, Taylor WJ, Dinnella J, Outman R, et al. Developing a provisional definition of flare in patients with established gout. Arthritis Rheum. 2012;64(5):1508-1517. PMID 22083456; doi:10.1002/art.33483. Validated: PubMed, Europe PMC, 2026-10-20.
- [Bellamy1987] Bellamy N, Downie WW, Buchanan WW. Observations on spontaneous improvement in patients with podagra: implications for therapeutic trials of non-steroidal anti-inflammatory drugs. Br J Clin Pharmacol. 1987;24(1):33-36. PMID 3304384; PMCID PMC1386276; doi:10.1111/j.1365-2125.1987.tb03132.x. Validated: PubMed, Europe PMC, 2026-10-20.
- [Choi2015] Choi HK, Niu J, Neogi T, Chen CA, Chaisson C, Hunter D, et al. Nocturnal risk of gout attacks. Arthritis Rheumatol. 2015;67(2):555-562. PMID 25504842; PMCID PMC4360969; doi:10.1002/art.38917. Validated: PubMed, Europe PMC, 2026-10-20.
- [Ho1993] Ho G Jr, DeNuccio M. Gout and pseudogout in hospitalized patients. Arch Intern Med. 1993;153(24):2787-2790. PMID 8257255; doi:10.1001/archinte.1993.00410240099012. Validated: PubMed, Europe PMC, Crossref (DOI), 2026-10-20.
- [Abhishek2023] Abhishek A, Tedeschi SK, Pascart T, Latourte A, Dalbeth N, Neogi T, et al. The 2023 ACR/EULAR classification criteria for calcium pyrophosphate deposition disease. Arthritis Rheumatol. 2023;75(10):1703-1713. PMID 37494275; PMCID PMC10543651; doi:10.1002/art.42619. Validated: PubMed, Europe PMC, 2026-10-20.
- [Abhishek2023ARD] Abhishek A, Tedeschi SK, Pascart T, Latourte A, Dalbeth N, Neogi T, et al. The 2023 ACR/EULAR classification criteria for calcium pyrophosphate deposition disease. Ann Rheum Dis. 2023;82(10):1248-1257. PMID 37495237; PMCID PMC10529191; doi:10.1136/ard-2023-224575. Validated: PubMed, Europe PMC (abstract; item names confirmed by full-text phrase search), 2026-10-20.
- [Zhang2011CPPD] Zhang W, Doherty M, Bardin T, Barskova V, Guerne PA, Jansen TL, et al. European League Against Rheumatism recommendations for calcium pyrophosphate deposition. Part I: terminology and diagnosis. Ann Rheum Dis. 2011;70(4):563-570. PMID 21216817; doi:10.1136/ard.2010.139105. Validated: PubMed, Europe PMC, 2026-10-20.
- [Rosenthal2016] Rosenthal AK, Ryan LM. Calcium pyrophosphate deposition disease. N Engl J Med. 2016;374(26):2575-2584. PMID 27355536; PMCID PMC6240444; doi:10.1056/NEJMra1511117. Validated: PubMed, Europe PMC (no abstract; wording confirmed by full-text phrase search), 2026-10-20.
- [Margaretten2007] Margaretten ME, Kohlwes J, Moore D, Bent S. Does this adult patient have septic arthritis? JAMA. 2007;297(13):1478-1488. PMID 17405973; doi:10.1001/jama.297.13.1478. Validated: PubMed, Europe PMC, 2026-10-20.
- [Shah2007] Shah K, Spear J, Nathanson LA, McCauley J, Edlow JA. Does the presence of crystal arthritis rule out septic arthritis? J Emerg Med. 2007;32(1):23-26. PMID 17239729; doi:10.1016/j.jemermed.2006.07.019. Validated: PubMed, Europe PMC, 2026-10-20.
- [Yu2003] Yu KH, Luo SF, Liou LB, Wu YJ, Tsai WP, Chen JY, et al. Concomitant septic and gouty arthritis: an analysis of 30 cases. Rheumatology (Oxford). 2003;42(9):1062-1066. PMID 12730521; doi:10.1093/rheumatology/keg297. Validated: PubMed, Europe PMC, 2026-10-20.
- [Papanicolas2012] Papanicolas LE, Hakendorf P, Gordon DL. Concomitant septic arthritis in crystal monoarthritis. J Rheumatol. 2012;39(1):157-160. PMID 22133623; doi:10.3899/jrheum.110368. Validated: PubMed, Europe PMC, 2026-10-20.
- [McGillicuddy2007] McGillicuddy DC, Shah KH, Friedberg RP, Nathanson LA, Edlow JA. How sensitive is the synovial fluid white blood cell count in diagnosing septic arthritis? Am J Emerg Med. 2007;25(7):749-752. PMID 17870475; doi:10.1016/j.ajem.2006.12.001. Validated: PubMed, Europe PMC, 2026-10-20.
- [Mathews2010] Mathews CJ, Weston VC, Jones A, Field M, Coakley G. Bacterial septic arthritis in adults. Lancet. 2010;375(9717):846-855. PMID 20206778; doi:10.1016/S0140-6736(09)61595-6. Validated: PubMed, Europe PMC, 2026-10-20.
- [Lumbreras2005] Lumbreras B, Pascual E, Frasquet J, González-Salinas J, Rodríguez E, Hernández-Aguado I. Analysis for crystals in synovial fluid: training of the analysts results in high consistency. Ann Rheum Dis. 2005;64(4):612-615. PMID 15769916; PMCID PMC1755440; doi:10.1136/ard.2004.027268. Validated: PubMed, Europe PMC, 2026-10-20.
- [Berendsen2017] Berendsen D, Neogi T, Taylor WJ, Dalbeth N, Jansen TL. Crystal identification of synovial fluid aspiration by polarized light microscopy. An online test suggesting that our traditional rheumatologic competence needs renewed attention and training. Clin Rheumatol. 2017;36(3):641-647. PMID 27837341; doi:10.1007/s10067-016-3461-0. Validated: PubMed, Europe PMC, 2026-10-20.
- [Segal1999] Segal JB, Albert D. Diagnosis of crystal-induced arthritis by synovial fluid examination for crystals: lessons from an imperfect test. Arthritis Care Res. 1999;12(6):376-380. PMID 11081008; doi:10.1002/1529-0131(199912)12:6<376::aid-art5>3.0.co;2-5. Validated: PubMed, Europe PMC, 2026-10-20.
- [Swan2002] Swan A, Amer H, Dieppe P. The value of synovial fluid assays in the diagnosis of joint disease: a literature survey. Ann Rheum Dis. 2002;61(6):493-498. PMID 12006320; PMCID PMC1754135; doi:10.1136/ard.61.6.493. Validated: PubMed, Europe PMC, 2026-10-20.
- [Graf2013] Graf SW, Buchbinder R, Zochling J, Whittle SL. The accuracy of methods for urate crystal detection in synovial fluid and the effect of sample handling: a systematic review. Clin Rheumatol. 2013;32(2):225-232. PMID 23138881; doi:10.1007/s10067-012-2107-0. Validated: PubMed, Europe PMC, 2026-10-20.
- [Pascual1999] Pascual E, Batlle-Gualda E, Martínez A, Rosas J, Vela P. Synovial fluid analysis for diagnosis of intercritical gout. Ann Intern Med. 1999;131(10):756-759. PMID 10577299; doi:10.7326/0003-4819-131-10-199911160-00007. Validated: PubMed, Europe PMC, 2026-10-20.
- [Pascual1991] Pascual E. Persistence of monosodium urate crystals and low-grade inflammation in the synovial fluid of patients with untreated gout. Arthritis Rheum. 1991;34(2):141-145. PMID 1994910; doi:10.1002/art.1780340203. Validated: PubMed, Europe PMC, 2026-10-20.
- [Zhang2016SciRep] Zhang Y, Lee SY, Zhang Y, Furst D, Fitzgerald J, Ozcan A. Wide-field imaging of birefringent synovial fluid crystals using lens-free polarized microscopy for gout diagnosis. Sci Rep. 2016;6:28793. PMID 27356625; PMCID PMC4928089; doi:10.1038/srep28793. Validated: PubMed, Europe PMC (full text), 2026-10-20.
- [Jokic2020] Jokic A, Milevoj Kopcinovic L, Culej J, Kocijan I, Bozovic M. Laboratory testing of extravascular body fluids: national recommendations on behalf of the Croatian Society of Medical Biochemistry and Laboratory Medicine. Part II - Synovial fluid. Biochem Med (Zagreb). 2020;30(3):030501. PMID 32774119; PMCID PMC7394252; doi:10.11613/BM.2020.030501. Validated: PubMed, Europe PMC (full text, Table 1), 2026-10-20.
- [Ragab2017] Ragab G, Elshahaly M, Bardin T. Gout: an old disease in new perspective - a review. J Adv Res. 2017;8(5):495-511. PMID 28748116; PMCID PMC5512152; doi:10.1016/j.jare.2017.04.008. Validated: PubMed, Europe PMC (full text), 2026-10-20.
- [Qaseem2017Dx] Qaseem A, McLean RM, Starkey M, Forciea MA, Clinical Guidelines Committee of the American College of Physicians. Diagnosis of acute gout: a clinical practice guideline from the American College of Physicians. Ann Intern Med. 2017;166(1):52-57. PMID 27802479; doi:10.7326/M16-0569. Validated: PubMed, Europe PMC, 2026-10-20.
- [Aletaha2010] Aletaha D, Neogi T, Silman AJ, Funovits J, Felson DT, Bingham CO 3rd, et al. 2010 Rheumatoid arthritis classification criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Arthritis Rheum. 2010;62(9):2569-2581. PMID 20872595; doi:10.1002/art.27584. Validated: PubMed, Europe PMC, 2026-10-20.
- [Taylor2006CASPAR] Taylor W, Gladman D, Helliwell P, Marchesoni A, Mease P, Mielants H; CASPAR Study Group. Classification criteria for psoriatic arthritis: development of new criteria from a large international study. Arthritis Rheum. 2006;54(8):2665-2673. PMID 16871531; doi:10.1002/art.21972. Validated: PubMed, Europe PMC, 2026-10-20.
- [Hannu2011] Hannu T. Reactive arthritis. Best Pract Res Clin Rheumatol. 2011;25(3):347-357. PMID 22100285; doi:10.1016/j.berh.2011.01.018. Validated: PubMed, Europe PMC, 2026-10-20.
- [Raff2016] Raff AB, Kroshinsky D. Cellulitis: a review. JAMA. 2016;316(3):325-337. PMID 27434444; doi:10.1001/jama.2016.8825. Validated: PubMed, Europe PMC, 2026-10-20.
- [Weng2017] Weng QY, Raff AB, Cohen JM, Gunasekera N, Okhovat JP, Vedak P, et al. Costs and consequences associated with misdiagnosed lower extremity cellulitis. JAMA Dermatol. 2017;153(2):141-146. PMID 27806170; doi:10.1001/jamadermatol.2016.3816. Validated: PubMed, Europe PMC, 2026-10-20.
- [Zhang2010OA] Zhang W, Doherty M, Peat G, Bierma-Zeinstra MA, Arden NK, Bresnihan B, et al. EULAR evidence-based recommendations for the diagnosis of knee osteoarthritis. Ann Rheum Dis. 2010;69(3):483-489. PMID 19762361; doi:10.1136/ard.2009.113100. Validated: PubMed, Europe PMC, 2026-10-20.
- [Zhu2012] Zhu Y, Pandya BJ, Choi HK. Comorbidities of gout and hyperuricemia in the US general population: NHANES 2007-2008. Am J Med. 2012;125(7):679-687.e1. PMID 22626509; doi:10.1016/j.amjmed.2011.09.033. Validated: PubMed, Europe PMC, 2026-10-20.
- [FitzGerald2020] FitzGerald JD, Dalbeth N, Mikuls T, Brignardello-Petersen R, Guyatt G, Abeles AM, et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res (Hoboken). 2020;72(6):744-760. PMID 32391934; PMCID PMC10563586; doi:10.1002/acr.24180. Validated: PubMed, Europe PMC, 2026-10-20.
- [Richette2017] Richette P, Doherty M, Pascual E, Barskova V, Becce F, Castañeda-Sanabria J, et al. 2016 updated EULAR evidence-based recommendations for the management of gout. Ann Rheum Dis. 2017;76(1):29-42. PMID 27457514; doi:10.1136/annrheumdis-2016-209707. Validated: PubMed, Europe PMC, 2026-10-20.
- [Dalbeth2021] Dalbeth N, Gosling AL, Gaffo A, Abhishek A. Gout. Lancet. 2021;397(10287):1843-1855. PMID 33798500; doi:10.1016/S0140-6736(21)00569-9. Validated: PubMed, Europe PMC, 2026-10-20.

## Provenance
- Validation route: every entry was checked against Europe PMC (search by EXT_ID/PMCID, `resultType=core`, abstract read) and against a single batched PubMed `esummary` call (authors, title, journal, year, volume, issue, pages, PMID, PMCID, DOI all matched). PubMed E-utilities returned HTTP 429 (rate limit shared with the parallel passes) for most of the session, so abstracts were read through Europe PMC rather than `efetch`.
- Full texts read (Europe PMC `fullTextXML`): Neogi2015 (Tables 1–3, used for every weight in the machine-readable table), Bongartz2015, Lee2015, Zhang2016SciRep, Jokic2020, Ragab2017. Full text was not served (HTTP 500/404) for Bursill2019, Bursill2019ARD, Abhishek2023/ARD, Rosenthal2016, FitzGerald2020, Zhang2006Dx, Richette2020, Ogdie2015/2017, Taylor2015, Bellamy1987; for these only abstract figures are quoted. Where wording beyond the abstract is used (G-CAN definitions of gout flare, intercritical gout, chronic gouty arthritis; CPPD criteria items "age at onset", "60 years", "wrist", "knee", "typical acute arthritis", "Gitelman", "hyperparathyroidism", "chondrocalcinosis"; Rosenthal2016 "rhomboid-shaped", "weak birefringence", "positively birefringent", "younger than 60", "fever"; FitzGerald2020 HLA-B*5801 testing "prior to starting allopurinol", "Southeast Asian", "Han Chinese", "Korean", "Thai", "African American"), the exact phrase was confirmed with a Europe PMC full-text phrase search restricted to that article (hit = 1; a nonsense control phrase returned 0). CPPD point weights were not quoted because the table could not be read.
- PMC HTML pages returned a reCAPTCHA challenge; it was not bypassed.
- Janssens2010 (Arch Intern Med) is paywalled: the abstract confirms the 7 items, the 5.88 mg/dL threshold and AUC 0.85; the item weights and score bands were confirmed from the open full text of Lee2015, which reproduces them. Lee2015 reports the derivation-study band prevalences as 82.5% / 31.2% / 2.2%. Lee2015's own abstract says 95.5% (61/64) for the high band, but 61/64 is 95.3%, which its full text also states; 95.3% is used here. Lee2015's methods paragraph says "low if below 4" while its abstract says "≤4"; ≤4 matches Kienhorst2015.
- Neogi2015 Table 1 in the PMC XML reads "presence (ever) of >2 of the following" for a typical episode, while Table 2 reads "≥2"; the article notes the original table contained a typographical error that was corrected online. ≥2 is used.
- Corrections to the dossier hand-offs: (1) diagnosis.criteria[0].population: the 0.92/0.89 and 0.85/0.78 figures come from the independent SUGAR validation set (n = 330), not the whole SUGAR cohort; SUGAR itself had 983 patients with ≥1 swollen joint or subcutaneous tophus (509 MSU-positive). AUCs are 0.95 (full) and 0.89 (clinical-only). (2) Serum urate timing: the criteria say ">4 weeks from the start of an episode", score the highest value irrespective of timing, and no retest is needed if ≥10 mg/dL; the dossier's "repeat ≥2–4 weeks after" has no checked source for 2 weeks, so it is corrected to ">4 weeks from flare onset". (3) The ultrasound meta-analysis is Ogdie 2015 (Ann Rheum Dis), not "Ogdie2017"; Ogdie 2017 (Arthritis Rheumatol) is the SUGAR ultrasound accuracy study, and both are cited. (4) The joint-pattern items apply only to mono- or oligoarticular episodes. (5) All other weights in diagnosis.criteria[0] (−4/0/2/3/4 urate; −2 fluid; 4 tophus; 4 imaging; 4 erosion; 1/2 joint; 1/2/3 characteristics; 1/2 time course; threshold ≥8 of 23) and the Janssens weights and bands were confirmed as handed off. (6) The untreated-flare pain curve stays schematic: Bellamy1987 is the only untreated series found (n = 11, 7 days) and gives only qualitative day-5/day-7 anchors.
- Marked (unverified) in Findings: the 1–20 µm MSU crystal length range (no checked source states it); the trauma row of the ddx matrix (general knowledge, no source); the "no improvement in 48–72 h" red flag from the dossier (no source found). Logan 1997 (Ann Rheum Dis letter on serum urate in flares) was located (PMID 9462177) but has no abstract and its full text was not served, so it was not cited. The BSR hot-joint guideline (Coakley 2006, PMID 16829534) has no abstract, so it was not cited either.
- Canonical keys used with the dossier's identifiers unchanged: Neogi2015, FitzGerald2020, Richette2017, Dalbeth2021. Other canonical keys (Dalbeth2019NRDP, GBD2024Gout, Martinon2006, Terkeltaub2010, White2018, Mackenzie2020, Doherty2018) are not cited in this pass. No FMF source applied to diagnosis, so none were reused. Keys with suffixes (Zhang2006Dx, Zhang2011CPPD, Zhang2010OA, Zhang2016SciRep, Zhang2018US, Taylor2006CASPAR, Neogi2015ARD, Bursill2019ARD, Abhishek2023ARD) keep distinct works apart in the merged sources.json.
