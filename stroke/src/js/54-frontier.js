/* =============== 5.4 Research frontier =============== */
/* Route map (filter + select), route explorer (phase lanes against years), factor XI vs X cascade, paired VNS,
   arm comparator. All numbers come from research pass I (and H for the VNS guideline line). Registry rows are shown as
   the registry lists them: r:'none' never means a result. */
const FX_TODAY=2026.85;
const FX_EV={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
const FX_STAGES=[
 {id:'prev',t:'Prevention',col:'var(--prev)'},
 {id:'acute',t:'Acute treatment',col:'var(--rx)'},
 {id:'rec',t:'Recovery',col:'var(--rec)'},
 {id:'bleed',t:'Bleeding strokes',col:'var(--dx)'},
 {id:'sys',t:'Systems of care',col:'var(--brand)'}];
const FX_LANES=[
 {id:'idea',t:'Idea or mechanism'},
 {id:'small',t:'Smaller, early or uncontrolled'},
 {id:'large',t:'Large, pivotal or phase 3'},
 {id:'pool',t:'Post hoc, subgroup or pooled'},
 {id:'reg',t:'Regulator or guideline'},
 {id:'wait',t:'Registry: no results shown'}];
const FX_RES={
 fav:{t:'Favoured the treatment on the stated outcome',g:'+',col:'var(--good)'},
 neu:{t:'No clear difference',g:'=',col:'var(--muted)'},
 bad:{t:'Worse than the comparator',g:'-',col:'var(--bad)'},
 mix:{t:'Mixed, post hoc, pooled, uncontrolled or not a stroke result',g:'~',col:'var(--warn)'},
 none:{t:'Registry entry: no results shown, not a result',g:'?',col:'var(--muted)'}};
/* claim: n name, y year (or nd:true, no date in the record), l lane, r result kind, e evidence label, x text */
const FX_ROUTES=[
 {id:'fxi',st:'prev',sh:'Factor XI inhibitors',t:'Factor XI and XIa inhibitors',
  s:'A new target for blood thinners, tested after non-cardioembolic stroke and in AF.',
  pt:'A newer type of blood thinner, asundexian, lowered the chance of another clot-related stroke in one very large study, without more serious bleeding. It is one study, and a similar medicine is still being tested. The same medicine did worse than a standard blood thinner for people with AF, so a medicine that helps one group may not help another [[Sharma2026,NCT05702034,Piccini2025]].',
  hook:'Asundexian failed against apixaban in AF but reduced ischaemic stroke against placebo after non-cardioembolic stroke: mechanism of stroke and comparator matter [[Piccini2025,Sharma2026]].',
  c:[
  {n:'Stated hypothesis',y:2024,l:'idea',r:'mix',e:'hyp',x:'Can anticoagulant effect be separated from bleeding? The LIBREXIA-AF design paper states that milvexian "may offer similar anticoagulant efficacy with less bleeding risk" [[Jain2024]].'},
  {n:'PACIFIC-Stroke',y:2022,l:'small',r:'neu',e:'early',x:'Phase 2b, 1808 people, asundexian 10, 20 or 50 mg vs placebo. Covert infarct or ischaemic stroke at 26 weeks in 19%, 22% and 20% vs 19%. Bleeding pooled HR 1.57 (90% CI 0.91-2.71) [[Shoamanesh2022]].'},
  {n:'AXIOMATIC-SSP',y:2024,l:'small',r:'neu',e:'early',x:'Phase 2, 2366 people, milvexian on dual antiplatelet therapy. Composite at 90 days 16.8% with placebo vs 15.3-16.7% across doses, no dose-response [[Sharma2024]].'},
  {n:'OCEANIC-AF',y:2025,l:'large',r:'bad',e:'est',x:'14,810 people with AF, asundexian 50 mg vs apixaban, stopped early. Stroke or systemic embolism 1.3% vs 0.4% (HR 3.79, 95% CI 2.46-5.83). Major bleeding 0.2% vs 0.7% (HR 0.32, 95% CI 0.18-0.55) [[Piccini2025]].'},
  {n:'AZALEA-TIMI 71',y:2025,l:'large',r:'mix',e:'est',x:'Established for bleeding only. 1287 people with AF, abelacimab vs rivaroxaban. Bleeding 3.2 and 2.6 vs 8.4 events per 100 person-years. Stroke efficacy is not reported as a result in the abstract [[Ruff2025]].'},
  {n:'OCEANIC-STROKE',y:2026,l:'large',r:'fav',e:'est',x:'A single positive phase 3 trial. 12,327 people after non-cardioembolic stroke or high-risk TIA, asundexian 50 mg vs placebo. Ischaemic stroke 6.2% vs 8.4% (cause-specific HR 0.74, 95% CI 0.65-0.84). Major bleeding 1.9% vs 1.7% (HR 1.10, 95% CI 0.85-1.44) [[Sharma2026]].'},
  {n:'LIBREXIA-STROKE',y:2026.79,l:'wait',r:'none',e:'hyp',x:'Milvexian vs placebo after stroke or high-risk TIA. Active, not recruiting, 12,523 enrolled, primary completion listed 2026-10-15, no results posted [[NCT05702034]].'},
  {n:'LIBREXIA-AF',y:2026.93,l:'wait',r:'none',e:'hyp',x:'Milvexian vs apixaban. Active, not recruiting, 20,284 enrolled (the design paper planned 15,500), primary completion listed 2026-12-08, no results posted [[NCT05757869,Jain2024]].'},
  {n:'LILAC-TIMI 76',y:2027.99,l:'wait',r:'none',e:'hyp',x:'Abelacimab vs placebo in AF unsuitable for oral anticoagulation. Recruiting, 2500 estimated, primary completion listed 2027-12-30 [[NCT05712200]].'},
  {n:'LILAC (Novartis)',y:2030.99,l:'wait',r:'none',e:'hyp',x:'A second record under the same name. Not yet recruiting, completion listed 2030-12-30 [[NCT07739888]].'}]},
 {id:'col',st:'prev',sh:'Colchicine',t:'Colchicine and inflammation',
  s:'Can calming inflammation prevent another stroke? The trials and the pooled result point different ways.',
  c:[
  {n:'CONVINCE',y:2024,l:'large',r:'neu',e:'early',x:'Underpowered. 3144 people, open-label add-on. Primary end point 9.8% vs 11.7% (HR 0.84, 95% CI 0.68-1.05; p=0.12). CRP was lower. Ended before the planned 367 events because of budget constraints [[Kelly2024]].'},
  {n:'CHANCE-3',y:2024,l:'large',r:'neu',e:'est',x:'8343 people, minor-to-moderate stroke or TIA with hs-CRP at least 2 mg/L. Stroke within 90 days 6.3% vs 6.5% (HR 0.98, 95% CI 0.83-1.16) [[Li2024CHANCE3]].'},
  {n:'Meta-analysis',y:2024,l:'pool',r:'mix',e:'early',x:'Mixed population: 6 trials, 14,934 people with prior stroke or coronary disease. Ischaemic stroke 1.8% vs 2.5% (RR 0.73, 95% CI 0.58-0.90), with no difference in death [[Fiolet2024]].'},
  {n:'CoVasc-ICH2',y:2028.58,l:'wait',r:'none',e:'hyp',x:'Colchicine after intracerebral haemorrhage. Not yet recruiting, 1125 planned, no result [[NCT06587737]].'}]},
 {id:'lpa',st:'prev',sh:'Lipoprotein(a)',t:'Lipoprotein(a) lowering',
  s:'Lower Lp(a) a lot, and ask whether cardiovascular events, including stroke, fall too.',
  c:[
  {n:'ALPACA',y:2025,l:'small',r:'mix',e:'early',x:'Lepodisiran 400 mg lowered Lp(a) by 93.9 percentage points over days 60-180 in 320 people. A biomarker result, not an outcome result [[Nissen2025]].'},
  {n:'Lp(a)HORIZON topline',y:2026.54,l:'large',r:'neu',e:'early',x:'Second-hand: a 2026 review reports September 2026 topline results with lower Lp(a) but no reduction in the primary composite. Full data are awaited, and the registry lists the trial as completed with no results posted. No numbers are available [[Cho2025,Sabouret2026,NCT04023552]].'},
  {n:'OCEAN(a)-Outcomes',y:2028.25,l:'wait',r:'none',e:'hyp',x:'Olpasiran, 7297 people, primary completion 2028-03-31. No result [[NCT05581303]].'},
  {n:'ACCLAIM-Lp(a)',y:2029.2,l:'wait',r:'none',e:'hyp',x:'Lepodisiran, 17,300 people, primary completion 2029-03. No result [[NCT06292013]].'}]},
 {id:'glp',st:'prev',sh:'GLP-1 drugs',t:'GLP-1 receptor agonists',
  s:'Clear falls in composite outcomes. Whether stroke itself falls is disputed.',
  c:[
  {n:'7-trial synthesis',y:2019,l:'pool',r:'mix',e:'early',x:'Seven trials in type 2 diabetes, 56,004 people: fatal or non-fatal stroke HR 0.84 (95% CI 0.76-0.93) [[Kristensen2019]].'},
  {n:'SELECT',y:2023,l:'large',r:'mix',e:'est',x:'Established for the composite. 17,604 people with cardiovascular disease and overweight or obesity, no diabetes: 6.5% vs 8.0% (HR 0.80, 95% CI 0.72-0.90). The abstract does not give stroke separately [[Lincoff2023SELECT]].'},
  {n:'SOUL',y:2025,l:'large',r:'mix',e:'est',x:'Established for the composite. 9650 people, type 2 diabetes, oral semaglutide: 12.0% vs 13.8% (HR 0.86, 95% CI 0.77-0.96). The abstract does not give stroke separately [[McGuire2025]].'},
  {n:'21-trial synthesis',y:2025,l:'pool',r:'neu',e:'early',x:'Twenty-one trials across wider populations, 99,599 people: MACE IRR 0.87 and no difference in stroke [[Galli2025]].'}]},
 {id:'pol',st:'prev',sh:'Polypills',t:'Polypills',
  s:'Several medicines in one tablet. Tested before any heart event and after a heart attack, not after stroke.',
  c:[
  {n:'TIPS-3',y:2021,l:'large',r:'fav',e:'est',x:'5713 people without cardiovascular disease at intermediate risk, 4.6 years. Polypill plus aspirin 4.1% vs double placebo 5.8% (HR 0.69, 95% CI 0.50-0.97) [[Yusuf2021]].'},
  {n:'SECURE',y:2022,l:'large',r:'fav',e:'est',x:'2499 people within 6 months after myocardial infarction. Major cardiovascular events 9.5% vs 12.7% (HR 0.76, 95% CI 0.60-0.96), with better reported adherence [[Castellano2022SECURE]].'},
  {n:'After stroke?',y:2022,l:'idea',r:'mix',e:'hyp',x:'SECURE enrolled people after a heart attack, not after stroke. Extending it to people who have had a stroke is an inference [[Castellano2022SECURE]].'}]},
 {id:'afs',st:'prev',sh:'AF screening',t:'Finding atrial fibrillation early',
  s:'Finding more AF does not automatically mean fewer strokes.',
  hook:'Three times more AF found and twice as much anticoagulation did not significantly reduce stroke in LOOP [[Svendsen2021]].',
  c:[
  {n:'LOOP',y:2021,l:'large',r:'neu',e:'est',x:'6004 people aged about 75 with stroke risk factors, implanted recorder vs usual care. AF found 31.8% vs 12.2%, anticoagulation 29.7% vs 13.1%, stroke or systemic embolism 4.5% vs 5.6% (HR 0.80, 95% CI 0.61-1.05; p=0.11) [[Svendsen2021]].'},
  {n:'STROKESTOP',y:2021,l:'large',r:'fav',e:'est',x:'A small net benefit. 28,768 randomised in Sweden, 51.3% of those invited attended, 6.9 years. Primary events 31.9% vs 33.0% (HR 0.96, 95% CI 0.92-1.00; p=0.045) [[Svennberg2021]].'}]},
 {id:'ner',st:'acute',sh:'Nerinetide',t:'Neuroprotection: nerinetide',
  s:'A peptide that interferes with PSD-95, given as a single 2.6 mg/kg dose up to 270 mg in the thrombectomy trials [[Hill2020,Hill2025]]. Three neutral primary results.',
  pt:'Scientists are trying to protect brain cells during a stroke. Many drugs looked good in animals but have not clearly helped people yet [[Hill2025,Christenson2025]].',
  hook:'The nerinetide subgroup signal in ESCAPE-NA1 did not replicate in ESCAPE-NEXT: treat subgroups as hypotheses [[Hill2020,Hill2025]].',
  c:[
  {n:'ESCAPE-NA1',y:2020,l:'large',r:'neu',e:'est',x:'1105 people, thrombectomy within 12 h. mRS 0-2 at 90 days 61.4% vs 59.2% (adjusted RR 1.04, 95% CI 0.96-1.14; p=0.35) [[Hill2020]].'},
  {n:'NA1 alteplase subgroup',y:2020,l:'pool',r:'mix',e:'early',x:'Effect modification was reported, with the treatment effect inhibited in people receiving alteplase [[Hill2020]].'},
  {n:'ESCAPE-NEXT',y:2025,l:'large',r:'neu',e:'est',x:'850 people not given a plasminogen activator, testing that idea. mRS 0-2 in 45% vs 46% (OR 0.97, 95% CI 0.72-1.30; p=0.82). The confirmation failed [[Hill2025]].'},
  {n:'FRONTIER',y:2025,l:'small',r:'neu',e:'early',x:'Phase 2, paramedics, 532 treated, median 64 min from onset. Favourable outcome 57% vs 58% (adjusted OR 1.05, 95% CI 0.73-1.51). Only 63% had ischaemic stroke: 18% had intracranial haemorrhage, 9% TIA and 10% a mimic [[Christenson2025]].'},
  {n:'Early-window pool',y:2025,l:'pool',r:'mix',e:'early',x:'Post hoc, 690 of 2487 people within 3 h and selected for reperfusion. Responders 56% vs 48% (adjusted OR 1.48, 95% CI 1.07-2.06). The authors say the criteria should be tested in a future trial [[Tymianski2025]].'},
  {n:'NEXT at 1 year',y:2026,l:'pool',r:'mix',e:'early',x:'Functional independence 48.0% vs 47.9% overall (adjusted OR 1.12, 95% CI 0.74-1.71). Early-window post hoc group (n=163) 52.6% vs 45.5% (adjusted OR 2.80, 95% CI 1.18-6.66) [[Adams2026]].'}]},
 {id:'gli',st:'acute',sh:'Glibenclamide',t:'Glibenclamide (glyburide) for swelling',
  s:'An attempt to limit brain swelling after large hemispheric infarction.',
  c:[
  {n:'CHARM',y:2024,l:'large',r:'neu',e:'early',x:'Stopped early by the sponsor for strategic and operational reasons, and underpowered. 431 in the efficacy population. No favourable mRS shift (common OR 1.17, 95% CI 0.80-1.71; p=0.42). Death 32% vs 29%, serious hypoglycaemia 6% vs 2% [[Sheth2024,NCT02864953]].'},
  {n:'Core under 125 mL',y:2025,l:'pool',r:'mix',e:'hyp',x:'Post hoc, 147 people: adjusted common OR 2.11 (95% CI 1.10-4.01). The authors call it hypothesis-generating [[Kimberly2025]].'},
  {n:'Cochrane 2025',y:2025,l:'pool',r:'neu',e:'early',x:'621 people: little to no difference in function (RR 1.08, 95% CI 0.89-1.32, low certainty) and more hypoglycaemia (RR 4.66, 95% CI 1.59-13.67, moderate certainty) [[Fan2025]].'}]},
 {id:'mul',st:'acute',sh:'Multi-target agents',t:'Edaravone dexborneol and butylphthalide',
  s:'Multi-target agents tested mostly in China, with positive or borderline results not yet replicated elsewhere.',
  c:[
  {n:'TASTE',y:2021,l:'large',r:'fav',e:'early',x:'1165 people within 48 h, edaravone dexborneol vs edaravone alone. mRS 0-1 at 90 days 67.18% vs 58.97% (OR 1.42, 95% CI 1.12-1.81) [[Xu2021]].'},
  {n:'BAST',y:2023,l:'large',r:'fav',e:'early',x:'Single-country, not yet replicated. 1216 people in 59 Chinese centres, butylphthalide within 6 h. Favourable outcome 56.7% vs 44.0% (OR 1.70, 95% CI 1.35-2.14) [[Wang2023]].'},
  {n:'TASTE-2',y:2026,l:'large',r:'mix',e:'early',x:'Borderline. 1362 people, thrombectomy within 24 h. mRS 0-2 in 55.0% vs 49.6% (RR 1.11, 95% CI 1.00-1.23; P=0.05) [[Wang2026TASTE2]].'},
  {n:'TASTE-2 mismatch',y:2026,l:'pool',r:'mix',e:'hyp',x:'The effect seemed driven by people with clinical-imaging mismatch, 55.5% vs 42.9% (RR 1.29, 95% CI 1.10-1.52). The authors suggest a dedicated trial [[Wang2026TASTE2]].'}]},
 {id:'tir',st:'acute',sh:'Tirofiban',t:'Tirofiban around reperfusion',
  s:'The same antiplatelet drug did nothing in one setting and looked helpful in others.',
  c:[
  {n:'RESCUE BT',y:2022,l:'large',r:'neu',e:'est',x:'948 people, before thrombectomy. Median mRS 3 in both (adjusted common OR 1.08, 95% CI 0.86-1.36). Symptomatic ICH 9.7% vs 6.4% [[Qiu2022]].'},
  {n:'RESCUE BT2',y:2023,l:'large',r:'fav',e:'early',x:'1177 people without large or medium vessel occlusion, vs aspirin. mRS 0-1 in 29.1% vs 22.2% (adjusted RR 1.26, 95% CI 1.04-1.53). Secondary end points were generally not consistent [[Zi2023]].'},
  {n:'ASSET-IT',y:2025,l:'large',r:'fav',e:'early',x:'Single-country phase 3, 832 people, within 60 min after thrombolysis. mRS 0-1 in 65.9% vs 54.9% (RR 1.20, 95% CI 1.07-1.34). Symptomatic ICH 1.7% vs none [[Tao2025]].'}]},
 {id:'ste',st:'acute',sh:'Methylprednisolone',t:'Steroid with thrombectomy',
  s:'Intravenous methylprednisolone, 2 mg/kg/day for 3 days, in MARVEL.',
  hook:'MARVEL was intravenous methylprednisolone, with a neutral primary [[Yang2024MARVEL]].',
  c:[
  {n:'MARVEL',y:2024,l:'large',r:'neu',e:'est',x:'1680 people. No significant shift in disability (generalised OR 1.10, 95% CI 0.96-1.25; P=.17) [[Yang2024MARVEL]].'},
  {n:'MARVEL safety',y:2024,l:'pool',r:'mix',e:'early',x:'Secondary safety outcomes favoured the drug: death 23.2% vs 28.5%, symptomatic ICH 8.6% vs 11.7% [[Yang2024MARVEL]].'}]},
 {id:'ial',st:'acute',sh:'Intra-arterial lysis',t:'Intra-arterial lysis after thrombectomy',
  s:'Clot-busting drug given into the artery after a successful thrombectomy. Results are mixed.',
  c:[
  {n:'CHOICE',y:2022,l:'small',r:'fav',e:'early',x:'113 treated, alteplase. mRS 0-1 in 59.0% vs 40.4% (adjusted difference 18.4%, 95% CI 0.3-36.4) [[Renu2022]].'},
  {n:'POST-TNK',y:2025,l:'large',r:'neu',e:'early',x:'540 people. 49.1% vs 44.1% (adjusted RR 1.15, 95% CI 0.97-1.36; not significant) [[Huang2025]].'},
  {n:'POST-UK',y:2025,l:'large',r:'neu',e:'early',x:'535 people, urokinase. 45.1% vs 40.2% (adjusted RR 1.13, 95% CI 0.94-1.36; not significant) [[Liu2025]].'},
  {n:'ANGEL-TNK',y:2025,l:'small',r:'fav',e:'early',x:'256 people, 4.5-24 h. mRS 0-1 in 40.5% vs 26.4% (RR 1.44, 95% CI 1.06-1.95). None of 7 secondary efficacy end points supported this [[Miao2025]].'}]},
 {id:'coo',st:'acute',sh:'Cooling',t:'Cooling the body',
  s:'A trial that shows how hard the idea is to deliver.',
  c:[
  {n:'EuroHYP-1',y:2019,l:'small',r:'neu',e:'early',x:'Cooling to 34.0-35.0 C within 6 h. Stopped at 98 of 1500 planned people. Only 31% reached the target. OR 1.01 (95% CI 0.48-2.13). The authors judged the regimen not feasible for most and the trial underpowered [[vanderWorp2019]].'}]},
 {id:'ric',st:'acute',sh:'Remote conditioning',t:'Remote ischaemic conditioning',
  s:'Repeated cuff inflation on a limb, for example 5 cycles of 5 min on and 5 min off at about 200 mm Hg [[Chen2022,Blauenfeldt2023]]. Unresolved.',
  c:[
  {n:'RICAMIS',y:2022,l:'large',r:'fav',e:'early',x:'1893 people in China, open label, within 48 h. mRS 0-1 in 67.4% vs 62.0% (risk difference 5.4%, 95% CI 1.0-9.9). The authors say this needs replication [[Chen2022]].'},
  {n:'RESIST',y:2023,l:'large',r:'neu',e:'est',x:'1500 people in Denmark, started in the ambulance, sham controlled, 902 with confirmed stroke. No improvement (OR 0.95, 95% CI 0.75-1.20; P=.67). Arm pain or petechiae 7.2% vs 1.5% [[Blauenfeldt2023]].'},
  {n:'SERIC-IVT',y:2025,l:'small',r:'neu',e:'early',x:'547 analysed, after thrombolysis. Excellent outcome 62.7% vs 56.8% (RR 1.10, 95% CI 0.96-1.27; P=0.169) [[Guo2025]].'},
  {n:'SERIC-EVT',y:2026,l:'small',r:'fav',e:'early',x:'488 analysed in China, after thrombectomy, sham at 60 mm Hg. mRS 0-2 in 61.1% vs 48.9% (RR 1.25, 95% CI 1.06-1.47) [[Guo2026]].'},
  {n:'Meta-analysis',y:2026,l:'pool',r:'mix',e:'early',x:'35 studies, 6304 people: OR 1.28 (95% CI 1.05-1.57), with limited quality: mostly Chinese studies, small samples and heterogeneity. It found better favourable outcomes only without reperfusion, which conflicts with SERIC-EVT [[Lam2026,Guo2026]].'}]},
 {id:'vns',st:'rec',sh:'Paired VNS',t:'Paired vagus nerve stimulation',
  s:'The one recovery device here with a blinded pivotal trial and a regulator decision. The average gain was modest.',
  pt:'A small implant that stimulates a nerve in the neck during arm therapy is approved in the US for some people with long-term arm weakness. The average gain in the trial was modest [[Dawson2021,FDA-Vivistim]].',
  hook:'Vivistim is FDA-approved for chronic ischaemic stroke with moderate to severe arm impairment [[FDA-Vivistim]]; the VNS-REHAB between-group difference was 2.6 FMA-UE points [[Dawson2021]].',
  c:[
  {n:'VNS-REHAB',y:2021,l:'large',r:'fav',e:'est',x:'108 people, randomised and blinded. FMA-UE rose 5.0 vs 2.4 points (difference 2.6, 95% CI 1.0-4.2; p=0.0014). Response at 90 days 47% vs 24% [[Dawson2021]].'},
  {n:'FDA approval',y:2021.65,l:'reg',r:'fav',e:'est',x:'Vivistim System, PMA P210007, 27 August 2021, for chronic ischaemic stroke with moderate to severe arm impairment [[FDA-Vivistim]].'},
  {n:'Subgroups',y:2023,l:'pool',r:'mix',e:'early',x:'The VNS effect was similar across the subgroups examined [[Dawson2023]].'},
  {n:'1-year follow-up',y:2025,l:'small',r:'mix',e:'early',x:'74 people, 69% of those enrolled, pooled with no control comparison. FMA-UE up 5.23 points from baseline (95% CI 4.08-6.39) [[Kimberley2025]].'},
  {n:'Real-world programme',y:2026,l:'small',r:'mix',e:'early',x:'Uncontrolled. Mean gain 10.8 points, 28 of 35 responders. Well above the randomised trial and should not be read as an effect size [[Saylor2026]].'},
  {n:'2026 AHA/ASA guideline',y:2026,l:'reg',r:'mix',e:'est',x:'Lists VNS paired with high-dose task training as class 2b, level B-R [[Richards2026]].'},
  {n:'GRASP registry',y:2028.99,l:'wait',r:'none',e:'hyp',x:'Post-market registry, up to 3 years of follow-up. Recruiting, 1000 estimated, no result [[Doherty2026,NCT05301140]].'}]},
 {id:'bci',st:'rec',sh:'Brain-computer',t:'Brain-computer interfaces',
  s:'Brain signals drive the training. Better than conventional therapy in pooled data, but not clearly better than sham BCI.',
  c:[
  {n:'BCI with FES',y:2018,l:'small',r:'fav',e:'early',x:'BCI coupled to functional electrical stimulation gave more recovery than sham stimulation in chronic stroke, lasting 6-12 months. No numeric effect is quoted here [[Biasiucci2018]].'},
  {n:'Feasibility study',y:2020,l:'small',r:'mix',e:'early',x:'Uncontrolled. FMA-UE gain 4.68 points. People with motor imagery accuracy above 80% gained 3.16 points more [[SebastianRomagosa2020]].'},
  {n:'Cochrane 2026',y:2026,l:'pool',r:'mix',e:'early',x:'Vs conventional therapy, may slightly improve arm function (MD 4.67, 95% CI 2.25-7.09; 10 studies, 611 people; low certainty). Vs sham BCI, may make little to no difference [[Qin2026]].'}]},
 {id:'dbs',st:'rec',sh:'Cerebellar, spinal',t:'Cerebellar DBS and spinal cord stimulation',
  s:'Implants tested in very small groups. Hopeful and unproven.',
  pt:'Early results from brain and spinal cord implants are hopeful. They come from very small groups of people and need bigger studies [[Baker2023,deFreitas2026]].',
  c:[
  {n:'Dentate DBS',y:2023,l:'small',r:'mix',e:'early',x:'Open-label phase 1, 12 people, 1-3 years after stroke, with rehabilitation. Median FMA-UE gain 7 points, 15 in those with some preserved distal function. No serious perioperative or stimulation-related events [[Baker2023]].'},
  {n:'Cervical stimulation',y:2023,l:'small',r:'mix',e:'early',x:'First report in 2 people, grip force up 40% and 108% [[Powell2023]].'},
  {n:'Spinal feasibility',y:2026,l:'small',r:'mix',e:'early',x:'7 people, 4 weeks of implantation. No serious adverse events. Average FMA gain 5.6 points with stimulation on and 6.6 at study end [[deFreitas2026]].'}]},
 {id:'nim',st:'rec',sh:'rTMS and robots',t:'Brain stimulation, robots and practice',
  s:'Large sham or usual-care comparisons have often been neutral.',
  c:[
  {n:'GRASP (2009)',y:2009,l:'small',r:'fav',e:'early',x:'A self-directed arm programme, not the Vivistim registry of the same name. CAHAI mean difference 6.2 at 4 weeks (95% CI 3.4-9.0), held at 5 months [[Harris2009]].'},
  {n:'NICHE',y:2018,l:'large',r:'neu',e:'est',x:'199 people, navigated 1 Hz rTMS. At least a 5-point FMA gain in 67% vs 65% with sham (P=0.76). Rehabilitation helped both groups [[Harvey2018]].'},
  {n:'RATULS',y:2019,l:'large',r:'neu',e:'est',x:'770 people. ARAT success 44% robot, 50% enhanced therapy, 42% usual care. Neither beat usual care [[Rodgers2019]].'},
  {n:'E-FIT',y:2023,l:'small',r:'neu',e:'est',x:'60 people, with NICHE in Bayesian analysis. Active not superior to sham (posterior mean OR 1.94, 96% credible interval 0.61-4.80) [[Edwards2023]].'}]},
 {id:'cel',st:'rec',sh:'Cell therapy',t:'Stem and other cell therapy',
  s:'Safe so far, with no clear benefit in controlled studies.',
  pt:'Stem cell treatments have been safe in trials so far, but they have not clearly improved recovery in controlled studies [[Hess2017,Houkin2024,NCT02448641]].',
  hook:'Open-label gains can vanish with sham control: SB623 open-label versus ACTIsSIMA [[Steinberg2019,NCT02448641]].',
  c:[
  {n:'SB623 open label',y:2016,l:'small',r:'mix',e:'early',x:'Phase 1/2a, 18 people, cells implanted into the brain. FMA motor score up 11.40 at 12 months [[Steinberg2016]].'},
  {n:'MASTERS',y:2017,l:'small',r:'neu',e:'early',x:'Phase 2, 126 in the ITT population. No difference in global recovery at day 90 (OR 1.08, 95% CI 0.55-2.09). Safe [[Hess2017]].'},
  {n:'ACTIsSIMA',y:2018.93,l:'small',r:'neu',e:'early',x:'Sham-controlled phase 2, registry-posted results, no peer-reviewed report found. At least a 10-point gain in 7 of 55, 9 of 56 and 7 of 52 (sham), p=0.6743 [[NCT02448641]].'},
  {n:'SB623 at 2 years',y:2019,l:'small',r:'mix',e:'early',x:'Open label. Up 10.4 at 24 months, with no change in mRS [[Steinberg2019]].'},
  {n:'TREASURE',y:2024,l:'small',r:'neu',e:'early',x:'Phase 2/3 in Japan, 206 people. Excellent outcome 11.5% vs 9.8% (adjusted risk difference 0.5%, 95% CI -7.3 to 8.3). Safe, no short-term benefit [[Houkin2024]].'},
  {n:'MASTERS-2',nd:1,l:'wait',r:'none',e:'hyp',x:'Phase 3. Terminated by sponsor\'s decision at 206 people, no results posted [[NCT03545607]].'}]},
 {id:'drg',st:'rec',sh:'Maraviroc, fluoxetine',t:'Recovery drugs: maraviroc and fluoxetine',
  s:'One idea still being tested, and one that shows how promising recovery drugs can fail.',
  hook:'Fluoxetine reduces depression but does not improve disability after stroke, and raises fracture risk [[Lundstrom2020,Legg2021]].',
  c:[
  {n:'CCR5 rationale',y:2019,l:'idea',r:'mix',e:'hyp',x:'CCR5 is expressed in cortical neurons after stroke, blocking it improved motor recovery in animals, and human carriers of CCR5-delta32 recovered better [[Joy2019]].'},
  {n:'Preclinical review',y:2025,l:'idea',r:'mix',e:'hyp',x:'5 studies found smaller infarcts with CCR5 antagonists, with high risk of bias in every study [[Sharif2025]].'},
  {n:'Maraviroc pilot',y:2024,l:'small',r:'mix',e:'early',x:'Post-stroke depression, not placebo controlled. Mean MADRS fall 16.4 points on 300 mg daily, returning partly after stopping [[Tene2024]].'},
  {n:'EFFECTS',y:2020,l:'large',r:'neu',e:'est',x:'1500 people, fluoxetine. No effect on mRS (common OR 0.94, 95% CI 0.78-1.13), fewer new depression diagnoses but more fractures and hyponatraemia [[Lundstrom2020]].'},
  {n:'Cochrane 2021',y:2021,l:'pool',r:'neu',e:'est',x:'Low risk of bias studies: little to no difference in disability (SMD 0.0, 95% CI -0.05 to 0.05; 5436 people), high-quality evidence [[Legg2021]].'},
  {n:'CAMAROS',nd:1,l:'wait',r:'none',e:'hyp',x:'Maraviroc, phase 2, 120 estimated. Unknown status, last verified 2024-07, no results [[NCT04789616]].'},
  {n:'MASTER',y:2027.92,l:'wait',r:'none',e:'hyp',x:'Maraviroc 300 mg twice daily for 90 days, 80 people, recruiting, no result [[Broc2026,NCT07080567]].'}]},
 {id:'hae',st:'bleed',sh:'ICH haemostasis',t:'Drugs to stop an intracerebral bleed growing',
  s:'Smaller bleeds have not reliably meant better recovery, and clotting drugs can cost thrombosis.',
  hook:'A drug that reduces a marker may still not improve function: FASTEST slowed haematoma growth without functional benefit [[Broderick2026]].',
  c:[
  {n:'TICH-2',y:2018,l:'large',r:'neu',e:'est',x:'2325 people, tranexamic acid. Day 90 function aOR 0.88 (95% CI 0.76-1.03; p=0.11). Deaths by day 7 were 9% vs 11% (aOR 0.73), with no difference at 90 days [[Sprigg2018]].'},
  {n:'STOP-AUST',y:2020,l:'small',r:'neu',e:'early',x:'100 people, spot sign. ICH growth 44% vs 52% (OR 0.72, 95% CI 0.32-1.59) [[Meretoja2020]].'},
  {n:'ANNEXA-I',y:2024,l:'large',r:'mix',e:'est',x:'530 people on factor Xa inhibitors. Haemostatic efficacy 67.0% vs 53.1%. Thrombotic events 10.3% vs 5.6%, ischaemic stroke 6.5% vs 1.5%, no appreciable difference in mRS or 30-day death [[Connolly2024]].'},
  {n:'FASTEST',y:2026,l:'large',r:'neu',e:'est',x:'626 people, recombinant factor VIIa within 2 h, stopped for futility. mRS common OR 1.09 (95% CI 0.79-1.51). Haematoma growth 3.7 mL smaller, life-threatening thromboembolic events RR 3.41 [[Broderick2026]].'},
  {n:'Tranexamic acid IPD',y:2026,l:'pool',r:'neu',e:'est',x:'5 trials, 2860 people. Worse outcome 53.2% vs 53.6% (aOR 0.93, 95% CI 0.81-1.07). Day 7 mortality aOR 0.70, expansion OR 0.81. Established for no 90-day functional benefit [[Menon2026]].'}]},
 {id:'sur',st:'bleed',sh:'ICH surgery',t:'Surgery for intracerebral haemorrhage',
  s:'Which bleeds, and which operation, is the live question.',
  hook:'ENRICH\'s benefit appeared in lobar bleeds [[Pradilla2024]].',
  c:[
  {n:'MISTIE III',y:2019,l:'large',r:'neu',e:'est',x:'506 people, minimally invasive surgery with thrombolysis. mRS 0-3 at 365 days 45% vs 41% (adjusted risk difference 4%, 95% CI -4 to 12; p=0.33) [[Hanley2019]].'},
  {n:'ENRICH',y:2024,l:'large',r:'fav',e:'est',x:'A single trial. 300 people, surgery within 24 h. Utility-weighted mRS 0.458 vs 0.374 (posterior probability of superiority 0.981). The effect appeared in lobar bleeds (0.127), not anterior basal ganglia bleeds (-0.013) [[Pradilla2024]].'},
  {n:'SWITCH',y:2024,l:'small',r:'neu',e:'early',x:'201 people, deep ICH, decompressive craniectomy, stopped early. mRS 5-6 at 180 days 44% vs 58% (aRR 0.77, 95% CI 0.59-1.01). The authors call this weak evidence and note severe disability in survivors of both groups [[Beck2024]].'}]},
 {id:'bun',st:'bleed',sh:'ICH care bundle',t:'A care bundle for ICH',
  s:'Doing several ordinary things together, early.',
  pt:'For a bleed in the brain, keeping several things under control at once in the first hours, such as blood pressure, improved recovery in one large study [[Ma2023]].',
  c:[
  {n:'INTERACT3',y:2023,l:'large',r:'fav',e:'est',x:'7036 people, 121 hospitals. Lower odds of poor outcome (common OR 0.86, 95% CI 0.76-0.97), fewer serious adverse events (16.0% vs 20.1%) [[Ma2023]].'}]},
 {id:'cla',st:'bleed',sh:'Clazosentan (SAH)',t:'Clazosentan in subarachnoid haemorrhage',
  s:'Less vasospasm on imaging has not meant better function.',
  c:[
  {n:'REACT',y:2025,l:'large',r:'neu',e:'est',x:'Phase 3, 409 randomised. Clinical deterioration from delayed cerebral ischaemia 15.8% vs 17.2% (p=0.734). Poor outcome numerically higher, 24.8% vs 20.1% (not significant). Rescue therapy 10.4% vs 18.1% [[Mayer2025]].'},
  {n:'Meta-analysis',y:2026,l:'pool',r:'mix',e:'est',x:'Less angiographic vasospasm and rescue therapy, no significant difference in function or death. More hypotension, anaemia, pleural effusion, pulmonary oedema and pneumonia. Established for the vasospasm-function gap [[Alsakti2026]].'}]},
 {id:'mma',st:'bleed',sh:'MMA embolisation',t:'Middle meningeal artery embolisation',
  s:'For subdural haematoma, not ICH, but part of the same neurovascular frontier.',
  c:[
  {n:'EMBOLISE',y:2024,l:'large',r:'fav',e:'est',x:'400 people. Repeat surgery for recurrence or progression 4.1% vs 11.3% (RR 0.36) [[Davies2024]].'},
  {n:'MAGIC-MT',y:2024,l:'large',r:'neu',e:'est',x:'722 people. Recurrence or progression 6.7% vs 9.9% (P=0.10, not significant), with fewer serious adverse events (6.7% vs 11.6%) [[Liu2024I]].'},
  {n:'STEM',y:2025,l:'large',r:'fav',e:'est',x:'310 people. Treatment failure 16% vs 36% (OR 0.36, 95% CI 0.20-0.66) [[Fiorella2025]].'}]},
 {id:'ai',st:'sys',sh:'AI imaging',t:'AI reading of stroke imaging',
  s:'The two AI papers measure different things: one improved workflow times, the other found modest accuracy. Neither shows better function [[MartinezGutierrez2023,Mair2023]].',
  c:[
  {n:'Review',y:2020,l:'idea',r:'mix',e:'hyp',x:'AI could reduce variation between readers and help non-expert centres, but any system should let experts catch errors [[Bivard2020]].'},
  {n:'LVO software',y:2023,l:'small',r:'mix',e:'early',x:'Stepped-wedge cluster trial, 243 people. Door-to-groin time fell by 11.2 min (95% CI 4.2-18.22), with no clear difference in functional independence (OR 1.3, 95% CI 0.42-4.0) [[MartinezGutierrez2023]].'},
  {n:'CTA tool test',y:2023,l:'small',r:'mix',e:'early',x:'668 people, one tool against experts. Software processed 82% of scans, with sensitivity, specificity and accuracy each 72%. Users need to remain competent to read CT angiography [[Mair2023]].'}]},
 {id:'msu',st:'sys',sh:'Mobile stroke units',t:'Mobile stroke units',
  s:'An ambulance with a CT scanner brings treatment to the person.',
  pt:'An ambulance with a CT scanner can start clot-busting treatment sooner, and people treated this way tended to recover better [[Grotta2021,Turc2022]].',
  c:[
  {n:'BEST-MSU',y:2021,l:'large',r:'fav',e:'est',x:'1047 eligible for t-PA. Onset to t-PA 72 vs 108 min, mRS 0-1 at 90 days 55.0% vs 44.4% (adjusted OR on utility-weighted mRS 2.43, 95% CI 1.75-3.36) [[Grotta2021]].'},
  {n:'B_PROUD',y:2021,l:'small',r:'fav',e:'early',x:'Berlin, non-randomised, 1543 people. Lower mRS with dispatch (common OR for worse outcome 0.71, 95% CI 0.58-0.86) [[Ebinger2021]].'},
  {n:'Meta-analysis',y:2022,l:'pool',r:'fav',e:'est',x:'Excellent outcome adjusted OR 1.64 (95% CI 1.27-2.13), thrombolysis 31 min sooner, no increase in mortality or symptomatic ICH [[Turc2022]].'}]},
 {id:'bpa',st:'sys',sh:'Ambulance BP',t:'Lowering blood pressure in the ambulance',
  s:'Lowering pressure before imaging, when the type of stroke is not yet known.',
  hook:'Prehospital blood pressure lowering helped haemorrhagic stroke and harmed cerebral ischaemia in INTERACT4, which shows why stroke type matters before lowering pressure [[Li2024INTERACT4]].',
  c:[
  {n:'INTERACT4',y:2024,l:'large',r:'neu',e:'est',x:'2404 people. No overall benefit (common OR 1.00, 95% CI 0.87-1.15) [[Li2024INTERACT4]].'},
  {n:'INTERACT4 by type',y:2024,l:'pool',r:'mix',e:'early',x:'Subgroups: benefit in haemorrhagic stroke (0.75, 95% CI 0.60-0.92), harm in cerebral ischaemia (1.30, 95% CI 1.06-1.60) [[Li2024INTERACT4]].'}]}
];
const FX_MAPTXT={none:'No route matches these filters. Clear a filter to see more.',count:(a,b)=>`Showing ${a} of ${b} routes`};
const FX_READ={year:'Year shown',today:'Today: November 2026',past:'Everything drawn up to this line is a published record or a registry listing.',future:'After today, markers are registry dates, not results.'};

/* cascade steps */
const FXC_STEPS=[
 {from:0,at:.08,k:'Outline · no drug',t:'A chain that ends in fibrin',
  txt:'The drawing is a simplified teaching outline: a contact route through XII, XI and IX, and an injury route from tissue factor with VII, both reaching X, then thrombin, then fibrin. It is here to place the two drug targets. It is not a trial finding. [[Gailani2015]]',
  pt:'Blood clots through a chain of steps. Each step switches on the next. Drugs can block the chain at different points.',
  tag:'TEACHING OUTLINE',tc:'brand',w:['Both routes reach X. X makes thrombin, thrombin makes fibrin.'],n:['Both routes reach X. X makes thrombin,','and thrombin makes fibrin.'],
  a:'Thrombin output can feed clot growth.',b:'The same output helps seal a tear.'},
 {from:.16,at:.26,k:'Block at X',t:'Blocking at factor X',
  txt:'The comparators in the factor XI trials, apixaban and rivaroxaban, act at factor X. Both routes pass through X, so in this outline both lose output. In OCEANIC-AF, major bleeding with apixaban was 0.7% [[Piccini2025]]. ANNEXA-I enrolled 530 people with ICH while on factor Xa inhibitors [[Connolly2024]].',
  tag:'TEACHING OUTLINE',tc:'brand',w:['Block at X: both routes lose output. Examples: apixaban, rivaroxaban.'],n:['Block at X: both routes lose output.','Examples: apixaban, rivaroxaban.'],
  a:'Less thrombin: less clot growth.',b:'Less thrombin: weaker sealing, more bleeding.'},
 {from:.36,at:.46,k:'Block at XI · the idea',t:'Blocking at factor XI',
  txt:'<span class="ev hyp">Hypothesis</span> The idea under test is that anticoagulant effect can be separated from bleeding. The LIBREXIA-AF design paper states that milvexian "may offer similar anticoagulant efficacy with less bleeding risk" [[Jain2024]]. In the drawing, the injury route stays open at X. Asundexian and milvexian target factor XIa, and abelacimab binds factor XI [[Sharma2026,Sharma2024,Ruff2025]]. Abelacimab lowered free factor XI by a median 99% at 150 mg and 97% at 90 mg [[Ruff2025]].',
  pt:'The hope is a blood thinner that stops harmful clots but leaves more of the body\'s ability to stop a bleed. This is what the trials set out to test.',
  hook:'The stated rationale is a trial hypothesis, not a result [[Jain2024]]. Judge it by the trials that follow.',
  tag:'HYPOTHESIS',tc:'hyp',w:['Block at XI: the injury route stays open. Asundexian, milvexian, abelacimab.'],n:['Block at XI: the injury route stays open.','Asundexian, milvexian, abelacimab.'],
  a:'Hypothesis: clot growth still falls.',b:'Hypothesis: sealing mostly kept.'},
 {from:.56,at:.64,k:'Trial data · bleeding',t:'What trials found on bleeding',
  txt:'<span class="ev est">Established</span> OCEANIC-AF: major bleeding 0.2% with asundexian vs 0.7% with apixaban (HR 0.32, 95% CI 0.18-0.55) [[Piccini2025]]. AZALEA-TIMI 71: 3.2 and 2.6 vs 8.4 events per 100 person-years with abelacimab vs rivaroxaban, stopped early for the bleeding reduction [[Ruff2025]]. OCEANIC-STROKE: major bleeding 1.9% vs 1.7% with placebo (cause-specific HR 1.10, 95% CI 0.85-1.44). That comparison is against placebo, on top of antiplatelet therapy [[Sharma2026]].',
  tag:'TRIAL DATA',tc:'est',w:['Measured major bleeding, as published. Bars below are data.'],n:['Measured major bleeding, as published.','Bars below are data.']},
 {from:.72,at:.8,k:'Trial data · stroke',t:'And on stroke: the comparator matters',
  txt:'<span class="ev est">Established</span> Against apixaban in AF, asundexian was clearly worse at preventing stroke: 1.3% vs 0.4% (HR 3.79, 95% CI 2.46-5.83) [[Piccini2025]]. Against placebo after non-cardioembolic stroke or high-risk TIA, it lowered ischaemic stroke: 6.2% vs 8.4% (cause-specific HR 0.74, 95% CI 0.65-0.84; P&lt;0.001), a difference of 2.2 percentage points. OCEANIC-STROKE is a single positive phase 3 trial [[Sharma2026]]. Both phase 2 trials had missed their composite outcome [[Shoamanesh2022,Sharma2024]].',
  pt:'In one very large study, asundexian lowered the chance of another clot-related stroke without more serious bleeding. For people with AF it did worse than a standard blood thinner. A medicine that helps one group may not help another [[Sharma2026,Piccini2025]].',
  hook:'Asundexian failed against apixaban in AF but reduced ischaemic stroke against placebo after non-cardioembolic stroke: mechanism of stroke and comparator matter [[Piccini2025,Sharma2026]].',
  tag:'TRIAL DATA',tc:'est',w:['Same drug and dose, two populations, two comparators. Do not compare across panels.'],n:['Same drug, two populations, two comparators.','Do not compare across panels.']},
 {from:.88,at:.95,k:'Registry · no results',t:'What has not reported',
  txt:'<span class="ev hyp">Hypothesis</span> until they report. LIBREXIA-STROKE and LIBREXIA-AF are active, not recruiting, with no results posted [[NCT05702034,NCT05757869]]. LILAC-TIMI 76 is recruiting [[NCT05712200]], and a second record under the same name is not yet recruiting [[NCT07739888]]. The US FDA approved asundexian on 9 November 2026, with antiplatelet therapy, after a recent mild-to-moderate non-cardioembolic ischaemic stroke or high-risk TIA, and not for AF [[FDA-Sunharbo2026]]. Guideline status of factor XI drugs was not established when this research was done.',
  tag:'REGISTRY',tc:'hyp',w:['Registry entries only. No result is implied.'],n:['Registry entries only. No result is implied.']}
];
const FXC_REG=[
 {n:'LIBREXIA-STROKE',q:'Milvexian vs placebo after stroke or TIA',s:'Active, not recruiting · no results posted · listed 2026-10-15'},
 {n:'LIBREXIA-AF',q:'Milvexian vs apixaban in AF',s:'Active, not recruiting · no results posted · listed 2026-12-08'},
 {n:'LILAC-TIMI 76',q:'Abelacimab vs placebo in AF',s:'Recruiting · no results · listed 2027-12-30'},
 {n:'LILAC-TIMI 76 (second record)',q:'Abelacimab, Novartis',s:'Not yet recruiting · no results · listed 2030-12-30'}];
const FXC_BARS=[
 {t:'OCEANIC-STROKE',sub:'after non-cardioembolic stroke or TIA, vs placebo',
  g:[{m:'Major bleeding',a:['asundexian',1.9],b:['placebo',1.7]},{m:'Ischaemic stroke',a:['asundexian',6.2],b:['placebo',8.4]}]},
 {t:'OCEANIC-AF',sub:'atrial fibrillation, vs apixaban',
  g:[{m:'Major bleeding',a:['asundexian',.2],b:['apixaban',.7]},{m:'Stroke or systemic embolism',a:['asundexian',1.3],b:['apixaban',.4]}]}];

/* VNS steps */
const FXV_STEPS=[
 {from:0,at:.08,k:'The device',t:'A small implant and a lead',
  txt:'<span class="ev est">Established</span> The FDA approved the Vivistim System (PMA P210007) on 27 August 2021, to stimulate the vagus nerve during rehabilitation to reduce arm motor deficits and improve motor function in chronic ischaemic stroke with moderate to severe arm impairment [[FDA-Vivistim]].',
  pt:'A small implant stimulates a nerve in the neck during arm therapy. It is approved in the US for some people with long-term arm weakness [[Dawson2021,FDA-Vivistim]].'},
 {from:.2,at:.3,k:'Therapy',t:'The arm practises a task',
  txt:'In VNS-REHAB, all 108 people had rehabilitation, and they were randomised to active or control stimulation, blinded [[Dawson2021]]. All were at least 9 months after ischaemic stroke, with moderate to severe arm weakness, and all were implanted [[Dawson2021]]. So everyone did the therapy. Only the stimulation differed.'},
 {from:.4,at:.5,k:'Pairing',t:'A burst with each movement',
  txt:'Paired means the nerve burst is delivered during the movement. Press Control stimulation to see the comparison arm. The 2026 AHA/ASA rehabilitation guideline lists VNS paired with high-dose task training as class 2b, level B-R [[Richards2026]].',
  hook:'Vivistim is FDA-approved for chronic ischaemic stroke with moderate to severe arm impairment [[FDA-Vivistim]].'},
 {from:.6,at:.72,k:'Repeats',t:'Why pairing might matter',
  txt:'<span class="ev hyp">Hypothesis</span> The drawing shows the idea that pairing a burst with practice strengthens the connections in use. Neuroplasticity is defined as the nervous system\'s ability to reorganise structure, function and connections, with experience dependence as a common theme [[Cramer2011]]. The trials measured arm function, not synapses. The thickening line is an illustration.'},
 {from:.8,at:.92,k:'Trial data',t:'What VNS-REHAB measured',
  txt:'<span class="ev est">Established</span> FMA-UE rose 5.0 vs 2.4 points (difference 2.6, 95% CI 1.0-4.2; p=0.0014). A clinically meaningful response at 90 days occurred in 47% vs 24% (difference 24%, 95% CI 6-41) [[Dawson2021]]. <span class="ev early">Early evidence</span> At 1 year, pooled in 74 people with no control comparison, the gain was 5.23 points from baseline (95% CI 4.08-6.39) [[Kimberley2025]]. An uncontrolled programme reported 10.8 points. That should not be read as an effect size [[Saylor2026]]. Funded by MicroTransponder [[Dawson2021]].',
  pt:'People who had the real stimulation gained more arm movement on average, but the average gain in the trial was modest [[Dawson2021]].',
  hook:'The VNS-REHAB between-group difference was 2.6 FMA-UE points [[Dawson2021]].'}
];

/* arm comparator. p:true prints the count, as a share of its axis */
const FX_CMP=[
 {id:'ner',b:'Nerinetide',max:100,unit:'%',ax:'0 to 100%',arm:['nerinetide','placebo'],
  note:'<span class="ev est">Established</span> neutral in ESCAPE-NA1 and ESCAPE-NEXT. <span class="ev early">Early evidence</span> FRONTIER is phase 2, and the pooled gap comes from a post hoc group of 690 of 2487. A subgroup needs its own trial [[Hill2020,Hill2025,Christenson2025,Tymianski2025]].',
  r:[{t:'ESCAPE-NA1, mRS 0-2',v:[61.4,59.2]},{t:'ESCAPE-NEXT, mRS 0-2',v:[45,46]},{t:'FRONTIER, favourable outcome',v:[57,58]},{t:'Post hoc pool, under 3 h, responders',v:[56,48]}]},
 {id:'ric',b:'Remote conditioning',max:100,unit:'%',ax:'0 to 100%',arm:['conditioning','control or sham'],
  note:'<span class="ev early">Early evidence</span> RICAMIS was open label and SERIC-EVT used sham. SERIC-IVT did not reach significance, and the sham-controlled RESIST found no improvement (OR 0.95, 95% CI 0.75-1.20), so it has no bar here [[Chen2022,Guo2026,Guo2025,Blauenfeldt2023]].',
  r:[{t:'RICAMIS, mRS 0-1',v:[67.4,62.0]},{t:'SERIC-EVT, mRS 0-2',v:[61.1,48.9]},{t:'SERIC-IVT, excellent outcome',v:[62.7,56.8]}]},
 {id:'ial',b:'Intra-arterial lysis',max:100,unit:'%',ax:'0 to 100%',arm:['drug','control'],
  note:'<span class="ev early">Early evidence</span> CHOICE and ANGEL-TNK were positive with small samples, while POST-TNK and POST-UK were not significant [[Renu2022,Miao2025,Huang2025,Liu2025]].',
  r:[{t:'CHOICE, mRS 0-1',v:[59.0,40.4]},{t:'POST-TNK, primary',v:[49.1,44.1]},{t:'POST-UK, primary',v:[45.1,40.2]},{t:'ANGEL-TNK, mRS 0-1',v:[40.5,26.4]}]},
 {id:'col',b:'Colchicine',max:20,unit:'%',ax:'0 to 20%. Lower is better',arm:['colchicine','control'],
  note:'<span class="ev early">Early evidence</span> CONVINCE missed significance (p=0.12) and CHANCE-3 was neutral. The pooled figure mixes prior stroke with coronary disease. CHANCE-3 measured 90 days, CONVINCE long-term follow-up [[Kelly2024,Li2024CHANCE3,Fiolet2024]].',
  r:[{t:'CONVINCE, primary end point',v:[9.8,11.7]},{t:'CHANCE-3, stroke at 90 days',v:[6.3,6.5]},{t:'Meta-analysis, ischaemic stroke',v:[1.8,2.5]}]},
 {id:'afs',b:'AF screening',max:40,unit:'%',ax:'0 to 40%',arm:['implanted recorder','usual care'],
  note:'<span class="ev est">Established</span> LOOP found three times more AF and gave twice as much anticoagulation, yet the fall in stroke or systemic embolism did not reach significance (HR 0.80, 95% CI 0.61-1.05; p=0.11) [[Svendsen2021]].',
  r:[{t:'LOOP, AF found',v:[31.8,12.2]},{t:'LOOP, anticoagulation started',v:[29.7,13.1]},{t:'LOOP, stroke or systemic embolism',v:[4.5,5.6]}]},
 {id:'cel',b:'SB623 cells',max:30,unit:'',ax:'0 to 30% of the arm',arm:['cells','sham'],count:1,
  note:'<span class="ev early">Early evidence</span> Open-label SB623 reported FMA motor gains of 11.40 at 12 months and 10.4 at 24 months [[Steinberg2016,Steinberg2019]]. Against sham, ACTIsSIMA showed no difference, p=0.6743 for combined versus sham. The counts are from results posted on the registry, with no peer-reviewed report found [[NCT02448641]].',
  r:[{t:'ACTIsSIMA, 2.5 million cells vs sham: at least a 10-point gain',c:[ [7,55], [7,52] ]},{t:'ACTIsSIMA, 5.0 million cells vs sham: at least a 10-point gain',c:[ [9,56], [7,52] ]}]}
];

const fxTx=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
function fxGlyph(x,y,k,o=1,r=8){const R=FX_RES[k];
  if(k==='none')return `<g style="opacity:${f1(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 2"/><text x="${f1(x)}" y="${f1(y+3.4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">?</text></g>`;
  const sh=k==='fav'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${R.col}"/>`:
    k==='neu'?`<rect x="${f1(x-r+1)}" y="${f1(y-r+1)}" width="${2*r-2}" height="${2*r-2}" rx="2" style="fill:${R.col}"/>`:
    k==='bad'?`<path d="M${f1(x)} ${f1(y-r-1)}L${f1(x+r+1)} ${f1(y+r-1)}L${f1(x-r-1)} ${f1(y+r-1)}Z" style="fill:${R.col}"/>`:
    `<path d="M${f1(x)} ${f1(y-r-1)}L${f1(x+r+1)} ${f1(y)}L${f1(x)} ${f1(y+r+1)}L${f1(x-r-1)} ${f1(y)}Z" style="fill:${R.col}"/>`;
  return `<g style="opacity:${f1(o)}">${sh}<text x="${f1(x)}" y="${f1(y+3.4)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${R.g}</text></g>`}
function fxAlong(P,u){let L=0;const d=[];for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);d.push(l);L+=l}
  let a=clamp(u)*L;for(let i=0;i<d.length;i++){if(a<=d[i]||i===d.length-1){const v=d[i]?a/d[i]:0;return [lerp(P[i][0],P[i+1][0],v),lerp(P[i][1],P[i+1][1],v)]}a-=d[i]}return P[0]}
function fxDots(P,n,ph,col,o=1,r=3){let s='';if(o<=0.01||n<=0)return s;for(let i=0;i<n;i++){const u=(i/n+ph)%1,p=fxAlong(P,u);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r}" style="fill:${col};opacity:${f1(o)}"/>`}return s}
function fxWrap(s,mx){const w=s.split(' '),o=[];let l='';w.forEach(k=>{if((l+' '+k).trim().length>mx){o.push(l.trim());l=k}else l+=' '+k});if(l.trim())o.push(l.trim());return o}

inits.frontier=()=>{
  /* ---------- state shared by map and explorer ---------- */
  const F={stage:'all',ev:'all',wait:false},byId=id=>FX_ROUTES.find(r=>r.id===id);
  let sel='fxi';
  const mapSvg=$('#fxMap'),svg=$('#fxSvg'),rg=$('#fxT'),note=$('#fxNote');
  const match=r=>(F.stage==='all'||r.st===F.stage)&&(F.ev==='all'||r.c.some(c=>c.e===F.ev))&&(!F.wait||r.c.some(c=>c.r==='none'));
  function counts(r){const n={est:0,early:0,hyp:0};r.c.forEach(c=>n[c.e]++);const a=[];
    if(n.est)a.push(n.est+' est');if(n.early)a.push(n.early+' early');if(n.hyp)a.push(n.hyp+' hyp');return a.join(', ')}
  function drawMap(refocus){
    const N=NARROW(),vis=FX_ROUTES.filter(match),sts=FX_STAGES.filter(s=>vis.some(r=>r.st===s.id));
    const PH=50,GAP=6;let g='',H=0;
    const pill=(r,x,y,w,col)=>{const on=r.id===sel,wc=r.c.filter(c=>c.r==='none').length;
      return `<g class="clk" tabindex="0" role="button" aria-pressed="${on}" aria-label="${r.t}" data-fxr="${r.id}"><rect class="fxpb" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${PH}" rx="8" style="fill:${on?'var(--brand-soft)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?2.2:1}"/><rect x="${f1(x)}" y="${f1(y+6)}" width="4" height="${PH-12}" rx="2" style="fill:${col}"/>`+
        fxTx(x+11,y+15,r.sh,'fxpn')+fxTx(x+11,y+29,counts(r))+(wc?fxTx(x+11,y+42,wc+' with no results yet','t-xs','fill:var(--ink)'):'')+'</g>'};
    if(!sts.length){H=70;g=fxTx(N?200:360,38,FX_MAPTXT.none,'t-sm t-mid','fill:var(--ink)')}
    else if(N){let y=4;sts.forEach(s=>{const rs=vis.filter(r=>r.st===s.id);
        g+=fxTx(10,y+13,s.t,'t-lbl',`fill:${s.col}`);y+=22;
        rs.forEach((r,i)=>{g+=pill(r,10+(i%2)*194,y+Math.floor(i/2)*(PH+GAP),186,s.col)});
        y+=Math.ceil(rs.length/2)*(PH+GAP)+8});H=y}
    else{const k=sts.length,W=(704-(k-1)*10)/k,sub=Math.max(1,Math.floor((W+6)/136)),pw=(W-(sub-1)*6)/sub;
      sts.forEach((s,i)=>{const x0=8+i*(W+10),rs=vis.filter(r=>r.st===s.id);
        g+=fxTx(x0,18,s.t,'t-lbl',`fill:${s.col}`);
        rs.forEach((r,j)=>{g+=pill(r,x0+(j%sub)*(pw+6),28+Math.floor(j/sub)*(PH+GAP),pw,s.col)});
        H=Math.max(H,28+Math.ceil(rs.length/sub)*(PH+GAP)+4)})}
    vb(mapSvg,`720 ${Math.round(H)}`,`400 ${Math.round(H)}`);mapSvg.innerHTML=g;
    $('#fxCount').innerHTML=FX_MAPTXT.count(vis.length,FX_ROUTES.length);
    if(refocus){const el=mapSvg.querySelector(`[data-fxr="${refocus}"]`);if(el)el.focus()}
  }
  /* ---------- explorer ---------- */
  const range=r=>{const ys=r.c.filter(c=>!c.nd).map(c=>c.y);let a=Math.floor(Math.min(...ys))-1,b=Math.ceil(Math.max(...ys,FX_TODAY))+1;if(b-a<6){a=b-6}return [a,b]};
  function layout(r,N,X,xL,xR){
    const out=[];let y=0;
    FX_LANES.forEach(l=>{const cs=r.c.filter(c=>c.l===l.id).map(c=>({...c,yy:c.nd?FX_TODAY:c.y})).sort((p,q)=>p.yy-q.yy);if(!cs.length)return;
      const rows=[];cs.forEach(c=>{const mx=X(c.yy),lbl=c.n+(c.r==='none'?(c.nd?' · status only':' · no results'):''),w=lbl.length*6+6,right=mx+13+w<=xR,a=right?mx-11:mx-13-w,b=right?mx+13+w:mx+11;
        let k=0;while(rows[k]&&rows[k].some(iv=>a<iv[1]+4&&b>iv[0]-4))k++;(rows[k]=rows[k]||[]).push([a,b]);c.k=k;c.mx=mx;c.right=right;c.lbl=lbl});
      out.push({l,cs,rows:Math.max(1,rows.length)})});
    return out}
  function draw(t){
    const r=byId(sel),N=NARROW(),[y0,y1]=range(r),Y=lerp(y0+1,y1,t);
    const xL=N?16:170,xR=N?386:706,X=v=>xL+(xR-xL)*(v-y0)/(y1-y0),RH=24;
    const L=layout(r,N,X,xL,xR),top=N?50:38;
    let h=top;L.forEach(b=>{b.y=h;b.h=(N?20:6)+b.rows*RH+6;h+=b.h+4});
    const axY=h+4,H=axY+32;
    vb(svg,`720 ${Math.round(H)}`,`400 ${Math.round(H)}`);
    let g=fxTx(N?16:12,20,r.t.length>(N?44:90)?r.sh:r.t,'t-lbl');
    /* lanes */
    L.forEach(b=>{g+=`<rect x="${N?8:6}" y="${f1(b.y)}" width="${N?384:708}" height="${f1(b.h)}" rx="6" style="fill:${b.l.id==='wait'?'var(--panel-2)':'var(--field)'}"/>`;
      if(N)g+=fxTx(16,b.y+13,b.l.t,'t-xs','fill:var(--ink);font-weight:600');
      else fxWrap(b.l.t,24).forEach((ln,i)=>{g+=fxTx(12,b.y+16+i*12,ln,'t-xs','fill:var(--ink);font-weight:600')})});
    /* grid and axis */
    const span=y1-y0,step=span>16?4:span>9?2:1,yr0=Math.ceil(y0/step)*step;
    for(let v=yr0;v<=y1;v+=step){const x=X(v);g+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top}" y2="${f1(axY)}" class="grid"/>`+fxTx(x,axY+14,v,'t-xs t-mid')}
    g+=`<line x1="${f1(xL)}" x2="${f1(xR)}" y1="${f1(axY)}" y2="${f1(axY)}" class="axis"/>`;
    /* today */
    const tx=X(FX_TODAY),px=X(Y),near=Math.abs(tx-px)<54;
    g+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${top-4}" y2="${f1(axY)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    if(!near)g+=fxTx(tx,top-8,'today','t-xs t-mid','fill:var(--ink);font-weight:700');
    /* playhead under the markers, so labels stay readable */
    g+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${top-4}" y2="${f1(axY)}" style="stroke:var(--accent);stroke-width:2"/>`;
    /* markers */
    L.forEach(b=>{b.cs.forEach(c=>{const my=b.y+(N?20:6)+c.k*RH+RH/2,wait=c.r==='none',u=wait?1:ramp(Y,c.yy-.05,c.yy+Math.max(.25,span*.02));
      if(u<=0)return;
      g+=fxGlyph(c.mx,my,c.r,wait?.95:u);
      g+=fxTx(c.right?c.mx+13:c.mx-13,my+3.5,c.lbl,c.right?'t-xs':'t-xs t-end',`fill:var(--ink);paint-order:stroke;stroke:${b.l.id==='wait'?'var(--panel-2)':'var(--field)'};stroke-width:3;opacity:${f1(wait?1:u)}`)})});
    /* year label */
    const lx=clamp(px,xL+16,xR-16);g+=fxTx(lx,top-8,Math.floor(Y),'t-xs t-mid','fill:var(--accent);font-weight:700');
    svg.innerHTML=g;
    $('#fxRead').innerHTML=`<span>${FX_READ.year}: <b>${Math.floor(Y)}</b></span><span>${FX_READ.today}</span><span>${Y>FX_TODAY?FX_READ.future:FX_READ.past}</span>`;
    /* note: claims up to the year shown, then registry entries */
    const st=FX_STAGES.find(s=>s.id===r.st),shown=r.c.filter(c=>c.r==='none'||c.y<=Y).sort((p,q)=>(p.r==='none')-(q.r==='none')||(p.y||0)-(q.y||0)),later=r.c.length-shown.length;
    let n=`<div class="kicker">${st.t}</div><h4>${r.t}</h4><p>${r.s}</p><ul class="fxcl">`;
    shown.forEach(c=>{n+=`<li><b>${c.n}</b><span class="fxmeta"><span class="ev ${c.e}">${FX_EV[c.e]}</span>${c.r==='none'?'<span class="tag warn">No results shown</span>':''}</span><br>${c.x}</li>`});
    n+='</ul>';
    if(later)n+=`<p class="stage-cap">${later===1?'One more entry appears':later+' more entries appear'} later on the timeline.</p>`;
    if(r.pt)n+=`<div class="pt"><b>In plain words</b>${r.pt}</div>`;
    if(r.hook)n+=`<div class="hook"><b>Exam hook</b>${r.hook}</div>`;
    note.innerHTML=n;
  }
  /* opens on today; Play from there replays the route from its first year */
  const tNow=()=>{const [a,b]=range(byId(sel));return clamp((FX_TODAY-(a+1))/(b-a-1))};
  $('#fxPlay').addEventListener('click',()=>{if(Math.abs(+rg.value-tNow())<.002)rg.value=0});
  const stop=playWire(rg,$('#fxPlay'),draw,16000,'Replay','frontier');
  function pick(id,focus){sel=id;stop();rg.value=tNow();drawMap(focus?id:null);draw(+rg.value)}
  mapSvg.addEventListener('click',e=>{const g=e.target.closest('[data-fxr]');if(g)pick(g.dataset.fxr,true)});
  mapSvg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-fxr]');if(g){e.preventDefault();pick(g.dataset.fxr,true)}});
  function filt(sel_,attr,set){$$(sel_,$('#m-frontier')).forEach(b=>b.addEventListener('click',()=>{set(b.getAttribute(attr));
    $$(sel_,$('#m-frontier')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    drawMap();const vis=FX_ROUTES.filter(match);if(vis.length&&!vis.some(r=>r.id===sel))pick(vis[0].id)}))}
  filt('[data-fxs]','data-fxs',v=>F.stage=v);filt('[data-fxe]','data-fxe',v=>F.ev=v);filt('[data-fxw]','data-fxw',v=>F.wait=v==='1');
  $('#fxLegend').innerHTML=Object.keys(FX_RES).map(k=>`<span><svg viewBox="0 0 20 20" aria-hidden="true">${fxGlyph(10,10,k,1,7)}</svg>${FX_RES[k].t}</span>`).join('');
  rg.value=tNow();drawMap();draw(+rg.value);

  /* ---------- factor XI vs factor X ---------- */
  const cs=$('#fxcSvg'),cr=$('#fxcT');
  function cDraw(t){
    const N=vb(cs,'720 448','400 696'),p=phaseOf(FXC_STEPS,t),P=FXC_STEPS[p];
    const xs=N?[30,88,146,204,280,360]:[60,170,280,396,516,646],nw=N?[44,44,44,44,64,52]:[64,64,64,64,84,76],cy=76,nh=30,nm=['XII','XI','IX','X','Thrombin','Fibrin'];
    const tf=N?{x:142,y:132,w:116}:{x:280,y:132,w:130};
    const bX=ramp(t,.16,.2)*(1-ramp(t,.32,.36)),bXI=ramp(t,.36,.4);
    const showA=p<=2,sA=showA?1-ramp(t,.52,.56):0;
    let g=`<defs>${marker('fxcA','var(--muted)',6)}</defs>`;
    /* arrows */
    const ar=(a,b,o=1)=>`<path d="${ptsD([ [a[0],a[1]], [b[0],b[1]] ])}" class="arrow" marker-end="url(#fxcA)" style="opacity:${f1(o)}"/>`;
    for(let i=0;i<5;i++)g+=ar([xs[i]+nw[i]/2+1,cy],[xs[i+1]-nw[i+1]/2-1,cy],(i<3&&i>0)?1-.7*bXI:1);
    /* amplifying loop, thrombin back to XI */
    const lp=`M${xs[4]} ${cy-nh/2}C${xs[4]} ${cy-62} ${xs[1]} ${cy-62} ${xs[1]} ${cy-nh/2-2}`;
    g+=`<path d="${lp}" class="arrow" marker-end="url(#fxcA)" style="stroke-dasharray:4 4;opacity:${f1(1-.75*bXI)}"/>`;
    g+=fxTx((xs[1]+xs[4])/2,cy-56,'amplifying loop','t-xs t-mid');
    /* injury route */
    const tr=tf.x+tf.w/2,inj=[ [tr,tf.y], [xs[3],tf.y], [xs[3],cy+nh/2+2] ];
    g+=`<path d="${ptsD(inj)}" class="arrow" marker-end="url(#fxcA)"/>`;
    g+=fxTx(xs[0]-nw[0]/2,cy-nh/2-7,N?'Contact':'Contact route','t-xs','fill:var(--ink);font-weight:600');
    g+=`<rect x="${f1(tf.x-tf.w/2)}" y="${f1(tf.y-14)}" width="${tf.w}" height="28" rx="7" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.4"/>`+fxTx(tf.x,tf.y+3.5,'Tissue factor + VII','t-xs t-mid','fill:var(--ink);font-weight:600');
    g+=fxTx(tf.x-tf.w/2-6,tf.y+3.5,'Injury route','t-xs t-end','fill:var(--ink);font-weight:600');
    /* moving particles */
    const ph=t*9;
    const P1=[ [xs[0],cy], [xs[1],cy] ],P2=[ [xs[1],cy], [xs[2],cy], [xs[3],cy] ],P3=inj,P4=[ [xs[3],cy], [xs[4],cy], [xs[5],cy] ];
    g+=fxDots(P1,2,ph,'var(--brand)',.9);
    g+=fxDots(P2,4,ph,'var(--brand)',.9*(1-bXI));
    g+=fxDots(P3,3,ph,'var(--tpa)',.95);
    g+=fxDots(P4,bX>.5?2:bXI>.5?4:6,ph,'var(--artery)',.95);
    /* nodes */
    nm.forEach((n,i)=>{const hX=i===3&&bX>0,hXI=i===1&&bXI>0,on=hX||hXI;
      g+=`<rect x="${f1(xs[i]-nw[i]/2)}" y="${cy-nh/2}" width="${nw[i]}" height="${nh}" rx="8" style="fill:var(--panel);stroke:${on?'var(--accent)':'var(--brand)'};stroke-width:${on?3:1.4}"/>`+fxTx(xs[i],cy+4,n,i>3?'t-xs t-mid':'t-lbl t-mid',i>3?'fill:var(--ink);font-weight:700':'')});
    /* block bar on the arrow out of the blocked node */
    const blk=(i,o)=>{if(o<=0)return '';const mx=(xs[i]+nw[i]/2+xs[i+1]-nw[i+1]/2)/2;return `<g style="opacity:${f1(o)}"><line x1="${f1(mx)}" x2="${f1(mx)}" y1="${cy-14}" y2="${cy+14}" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"/></g>`};
    g+=blk(3,bX)+blk(1,bXI);
    /* strip */
    const sy=N?164:164,lines=N?P.n:P.w,tagc={brand:['var(--brand-soft)','var(--brand)'],hyp:['var(--rx-soft)','var(--rx)'],est:['var(--good-soft)','var(--good)']}[P.tc],tw=P.tag.length*6.2+14;
    g+=`<rect x="${N?8:14}" y="${sy}" width="${f1(tw)}" height="18" rx="4" style="fill:${tagc[0]}"/>`+fxTx((N?8:14)+7,sy+13,P.tag,'t-xs',`fill:${tagc[1]};font-weight:700`);
    lines.forEach((ln,i)=>{g+=N?fxTx(8,sy+34+i*14,ln,'t-sm','fill:var(--ink)'):fxTx(14+tw+10,sy+13+i*14,ln,'t-sm','fill:var(--ink)')});
    /* bottom scene */
    const by=N?222:200;
    if(showA&&sA>0){
      const tiles=N?[ [8,by,384,226], [8,by+234,384,226] ]:[ [14,by,340,234], [366,by,340,234] ],cl=[.72,.34,.34][p],rp=[.28,.8,.34][p],plug=[30,12,27][p];
      const T=(ti,ttl,txt,draw)=>{const [x,y,w,h]=ti;let s=`<g style="opacity:${f1(sA)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`+fxTx(x+12,y+20,ttl,'t-lbl')+draw(x,y,w,h);
        fxWrap(txt,w>360?60:50).forEach((ln,i)=>{s+=fxTx(x+12,y+h-28+i*14,ln,'t-sm','fill:var(--ink)')});return s+'</g>'};
      g+=T(tiles[0],'A clot growing inside an artery',P.a,(x,y,w)=>{const A=artery(x+14,y+92,w-28,{h:40,clot:cl,flow:clamp(1.25-cl),ph:t*6,at:.62});return A.svg});
      g+=T(tiles[1],'A torn vessel being sealed',P.b,(x,y,w)=>{const A=artery(x+14,y+112,w-28,{h:34,rupture:rp,ruptureAt:.5,flow:1,ph:t*6});return A.svg+clot(x+w/2,y+112,plug,{seed:5})});
    }else if(p===3||p===4){
      const w=N?384:340,yBase=by,mx=10,scale=(w-120)/mx,fade=p===3?ramp(t,.56,.6):1;
      FXC_BARS.forEach((pn,i)=>{const x=N?8:14+i*(w+12),y=N?yBase+i*232:yBase;
        g+=`<g style="opacity:${f1(fade)}"><rect x="${x}" y="${y}" width="${w}" height="${N?224:234}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`+fxTx(x+12,y+20,pn.t,'t-lbl')+fxTx(x+12,y+35,pn.sub);
        pn.g.forEach((m,j)=>{const vis=j===0?ramp(t,.58,.64):ramp(t,.72,.78),gy=y+50+j*(N?84:90);if(vis<=0)return;
          g+=`<g style="opacity:${f1(vis)}">`+fxTx(x+12,gy+8,m.m,'t-xs','fill:var(--ink);font-weight:700');
          [m.a,m.b].forEach((arm,k)=>{const ay=gy+14+k*30;
            g+=fxTx(x+12,ay+9,arm[0],'t-xs')+`<rect x="${x+12}" y="${ay+12}" width="${f1(Math.max(1.5,arm[1]*scale*vis))}" height="12" rx="3" style="fill:${k?'var(--muted)':'var(--tpa)'}"/>`+fxTx(x+18+arm[1]*scale*vis,ay+22,arm[1].toFixed(1)+'%','t-xs','fill:var(--ink);font-weight:700')});
          g+='</g>'});
        g+='</g>'});
    }else if(p===5){
      FXC_REG.forEach((R,i)=>{const h=N?100:52,y=by+i*(h+6),x=N?8:14,w=N?384:692;
        g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2;stroke-dasharray:5 4"/>`+fxGlyph(x+18,y+(N?20:26),'none',1,8)+fxTx(x+36,y+(N?24:22),R.n,'t-lbl');
        if(N){fxWrap(R.q,58).forEach((ln,k)=>{g+=fxTx(x+12,y+44+k*13,ln,'t-xs','fill:var(--ink)')});fxWrap(R.s,58).forEach((ln,k)=>{g+=fxTx(x+12,y+62+k*13,ln)})}
        else{g+=fxTx(x+36,y+38,R.q,'t-xs','fill:var(--ink)')+fxTx(x+w-10,y+22,R.s,'t-xs t-end')}});
    }
    cs.innerHTML=g;setC(p);$('#fxcNote').innerHTML=noteHTML(P);
  }
  let setC=()=>{};
  const stopC=playWire(cr,$('#fxcPlay'),cDraw,20000,'Replay','frontier');
  setC=stepWire($('#fxcSteps'),FXC_STEPS,cr,cDraw,stopC);
  cDraw(+cr.value);

  /* ---------- paired VNS ---------- */
  const vs=$('#fxvSvg'),vr=$('#fxvT');let mode='paired';const REPS=7,T0=.2,T1=.8;
  function reach(t){if(t<T0||t>T1)return 0;const u=(t-T0)/(T1-T0)*REPS,fr=u-Math.floor(u);return Math.sin(Math.PI*clamp(fr/.62))*(fr<.62?1:0)}
  function vDraw(t){
    const N=vb(vs,'720 410','400 744'),p=phaseOf(FXV_STEPS,t),P=FXV_STEPS[p],paired=mode==='paired';
    const rc=reach(t),bursting=paired&&t>=.4&&t<=T1&&rc>.15&&rc<.98;
    let g=`<defs>${marker('fxvA','var(--muted)',6)}</defs>`;
    /* figure: same coordinates in both layouts */
    const bx=64,by=8,B=brainSide(bx,by,.62,{dim:.35,id:'fxv'});
    const bs=B.at.brainstem,neck=[bs[0]+2,bs[1]+18],sh=[bs[0]-6,bs[1]+64];
    const tx=sh[0]-30,ty=bs[1]+44;
    g+=`<path d="M${f1(neck[0]-13)} ${f1(bs[1])}L${f1(neck[0]-15)} ${f1(ty+2)}L${f1(tx)} ${f1(ty+6)}Q${f1(tx-14)} ${f1(ty+10)} ${f1(tx-12)} ${f1(ty+36)}L${f1(tx-4)} ${f1(ty+172)}L${f1(tx+116)} ${f1(ty+172)}L${f1(tx+112)} ${f1(ty+30)}Q${f1(tx+108)} ${f1(ty+8)} ${f1(tx+88)} ${f1(ty+6)}L${f1(neck[0]+15)} ${f1(ty+2)}L${f1(neck[0]+13)} ${f1(bs[1])}Z" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.2"/>`;
    g+=B.svg;
    /* task target */
    const tgx=30,tgy=sh[1]+6;
    g+=`<rect x="${tgx-16}" y="${f1(tgy-12)}" width="24" height="24" rx="5" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.5"/>`+fxTx(tgx-4,tgy+27,'task','t-xs t-mid','fill:var(--ink);font-weight:600');
    /* arm: rest hangs down, reach goes to the target */
    const a1=lerp(82,172,ease(rc))*Math.PI/180,a2=lerp(96,180,ease(rc))*Math.PI/180,L1=64,L2=58;
    const el=[sh[0]+Math.cos(a1)*L1,sh[1]+Math.sin(a1)*L1],ha=[el[0]+Math.cos(a2)*L2,el[1]+Math.sin(a2)*L2];
    g+=`<path d="M${f1(sh[0])} ${f1(sh[1])}L${f1(el[0])} ${f1(el[1])}L${f1(ha[0])} ${f1(ha[1])}" style="fill:none;stroke:var(--brain-line);stroke-width:16;stroke-linecap:round;stroke-linejoin:round"/><path d="M${f1(sh[0])} ${f1(sh[1])}L${f1(el[0])} ${f1(el[1])}L${f1(ha[0])} ${f1(ha[1])}" style="fill:none;stroke:var(--skin);stroke-width:13;stroke-linecap:round;stroke-linejoin:round"/>`;
    /* device and lead */
    const gen=[tx+78,ty+40],lead=[ [gen[0]+6,gen[1]], [neck[0]+8,neck[1]+16], [neck[0]+6,bs[1]+2] ];
    g+=`<path d="M${f1(lead[0][0])} ${f1(lead[0][1])}Q${f1(lead[1][0]+22)} ${f1(lead[1][1]+6)} ${f1(lead[1][0])} ${f1(lead[1][1])}L${f1(lead[2][0])} ${f1(lead[2][1])}" style="fill:none;stroke:var(--device);stroke-width:2.2"/>`;
    g+=`<rect x="${f1(gen[0]-9)}" y="${f1(gen[1]-8)}" width="28" height="18" rx="5" style="fill:var(--device);stroke:var(--ink);stroke-width:1"/>`;
    g+=kitLabel(gen[0]+26,gen[1]+4,'pulse generator')+kitLabel(neck[0]+24,neck[1]+8,'lead to vagus nerve');
    /* the signals */
    const motor=[lerp(B.at.frontal[0],B.at.parietal[0],.55),lerp(B.at.frontal[1],B.at.parietal[1],.35)];
    if(rc>.05){g+=`<path d="M${f1(motor[0])} ${f1(motor[1])}L${f1(bs[0])} ${f1(bs[1])}L${f1(sh[0])} ${f1(sh[1])}L${f1(el[0])} ${f1(el[1])}" style="fill:none;stroke:var(--brand);stroke-width:2.4;stroke-dasharray:5 4;opacity:${f1(rc)}"/>`}
    if(bursting){const u=(t*180)%1,path=[ gen, lead[1], [bs[0],bs[1]], motor ];g+=fxDots(path,4,u,'var(--accent)',1,3.6);g+=`<circle cx="${f1(motor[0])}" cy="${f1(motor[1])}" r="${f1(10+rc*5)}" style="fill:var(--accent);opacity:.25"/>`}
    g+=kitLabel(motor[0],B.at.frontal[1]-Math.max(10,0)-26,'arm movement areas',{a:'m'});
    /* right side */
    const R=N?{x:14,w:372,tY:352,sY:512,bY:352}:{x:352,w:356,tY:18,sY:192,bY:18};
    if(p<4){
      const X=v=>R.x+R.w*(v-T0)/(T1-T0),rowM=R.tY+46,rowB=R.tY+100;
      g+=`<rect x="${R.x-6}" y="${R.tY}" width="${R.w+12}" height="148" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
      g+=fxTx(R.x+2,R.tY+18,'Arm movement','t-xs','fill:var(--brand);font-weight:700')+fxTx(R.x+2,R.tY+72,paired?'Vagal burst, paired from step 3':'Control stimulation: settings not shown','t-xs','fill:var(--accent);font-weight:700');
      g+=`<line x1="${R.x}" x2="${R.x+R.w}" y1="${rowM}" y2="${rowM}" class="axis"/><line x1="${R.x}" x2="${R.x+R.w}" y1="${rowB}" y2="${rowB}" class="axis"/>`;
      for(let i=0;i<REPS;i++){const a=T0+(T1-T0)*i/REPS,b=a+(T1-T0)/REPS*.62;if(a>t)break;
        const e=Math.min(t,b),n=14;let d='';for(let k=0;k<=n;k++){const v=lerp(a,e,k/n);d+=(k?'L':'M')+f1(X(v))+' '+f1(rowM-reach(v)*20)}g+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.2"/>`;
        if(paired&&a>=.4-1e-6){const bs0=a+(b-a)*.2,bs1=a+(b-a)*.8;if(t>=bs0)g+=`<rect x="${f1(X(bs0))}" y="${rowB-20}" width="${f1(X(Math.min(t,bs1))-X(bs0))}" height="20" rx="2" style="fill:var(--accent)"/>`}}
      if(t>=T0&&t<=T1)g+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${R.tY+24}" y2="${rowM+4}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${rowB-22}" y2="${rowB+4}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      g+=fxTx(R.x+R.w,R.tY+122,t<T0?'Therapy has not started':'Repeat '+Math.min(REPS,Math.floor((clamp(t,T0,T1-.001)-T0)/(T1-T0)*REPS)+1)+' of '+REPS+' shown','t-xs t-end');
      g+=fxTx(R.x+2,R.tY+138,'Schematic: real sessions have far more repeats');
      /* connection */
      const u=ramp(t,.4,T1),wd=lerp(1.6,paired?9:4,u),sx=R.x+24,ex=R.x+R.w-24,cy2=R.sY+72;
      g+=`<rect x="${R.x-6}" y="${R.sY}" width="${R.w+12}" height="${N?196:198}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
      g+=`<rect x="${R.x+2}" y="${R.sY+10}" width="82" height="17" rx="4" style="fill:var(--rx-soft)"/>`+fxTx(R.x+9,R.sY+22,'HYPOTHESIS','t-xs','fill:var(--rx);font-weight:700')+fxTx(R.x+92,R.sY+22,'connection in use','t-xs','fill:var(--ink);font-weight:600');
      g+=neuron(sx+14,cy2,14,{axon:0,seed:3})+neuron(ex-14,cy2,14,{axon:0,seed:7});
      g+=`<line x1="${f1(sx+30)}" x2="${f1(ex-30)}" y1="${cy2}" y2="${cy2}" style="stroke:var(--neuron);stroke-width:${f1(wd)};stroke-linecap:round"/>`;
      if(rc>.1)g+=fxDots([ [sx+30,cy2], [ex-30,cy2] ],3,t*30,'var(--brand)',rc,3);
      fxWrap(paired?'Idea: a burst during practice strengthens the connection in use. Not measured in the trial.':'Rehabilitation also helped: the control group gained too. Thickening here is an illustration.',N?64:62).forEach((ln,i)=>{g+=fxTx(R.x+2,R.sY+136+i*14,ln,'t-xs','fill:var(--ink)')});
      g+=fxTx(R.x+2,R.sY+182,'Line width is schematic.');
    }else{
      const vis=ramp(t,.8,.86),bw=R.w-90,rows=[{m:'FMA-UE gain, points',mx:10,a:['VNS',5.0,'5.0'],b:['control',2.4,'2.4'],foot:'Difference 2.6, 95% CI 1.0-4.2'},{m:'Response at 90 days',mx:100,a:['VNS',47,'47%'],b:['control',24,'24%'],foot:'Difference 24%, 95% CI 6-41'}];
      g+=`<rect x="${R.x-6}" y="${R.bY}" width="${R.w+12}" height="${N?380:372}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`+`<rect x="${R.x+2}" y="${R.bY+10}" width="82" height="17" rx="4" style="fill:var(--good-soft)"/>`+fxTx(R.x+9,R.bY+22,'TRIAL DATA','t-xs','fill:var(--good);font-weight:700')+fxTx(R.x+92,R.bY+22,'VNS-REHAB, 108 people','t-xs','fill:var(--ink);font-weight:600');
      rows.forEach((q,i)=>{const y=R.bY+44+i*128;g+=fxTx(R.x+2,y,q.m,'t-lbl');
        [q.a,q.b].forEach((a,k)=>{const yy=y+12+k*36,ww=a[1]/q.mx*bw*vis;g+=fxTx(R.x+2,yy+8,a[0],'t-xs')+`<rect x="${R.x+2}" y="${yy+12}" width="${f1(Math.max(1,ww))}" height="14" rx="3" style="fill:${k?'var(--muted)':'var(--accent)'}"/>`+fxTx(R.x+8+ww,yy+24,a[2],'t-xs','fill:var(--ink);font-weight:700')});
        g+=fxTx(R.x+2,y+96,q.foot)});
      g+=fxTx(R.x+2,R.bY+316,'Pooled at 1 year, no control: 5.23 points','t-xs','fill:var(--ink)')+fxTx(R.x+2,R.bY+332,'Uncontrolled programme: 10.8 points.','t-xs','fill:var(--ink)')+fxTx(R.x+2,R.bY+348,'Not an effect size.','t-xs','fill:var(--ink)');
    }
    vs.innerHTML=g;setV(p);$('#fxvNote').innerHTML=noteHTML(P);
  }
  let setV=()=>{};
  const stopV=playWire(vr,$('#fxvPlay'),vDraw,22000,'Replay','frontier');
  setV=stepWire($('#fxvSteps'),FXV_STEPS,vr,vDraw,stopV);
  $$('[data-fxv]',$('#m-frontier')).forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.fxv;$$('[data-fxv]',$('#m-frontier')).forEach(x=>x.setAttribute('aria-pressed',x===b));vDraw(+vr.value)}));
  vDraw(+vr.value);

  /* ---------- arm comparator ---------- */
  const as=$('#fxaSvg');let cmp=FX_CMP[0];
  $('#fxaBtns').innerHTML=FX_CMP.map((c,i)=>`<button class="btn" data-fxa="${c.id}" aria-pressed="${i===0}">${c.b}</button>`).join('');
  function aDraw(){
    const N=NARROW(),C=cmp,lx=N?12:262,bw=N?300:370,lw=lx;let y=26,g='';
    const arm=(lbl,val,txt,k)=>{const ww=Math.max(1.5,val/C.max*bw);let s='';
      s+=fxTx(N?lx:lx-8,N?y+8:y+11,lbl,N?'t-xs':'t-xs t-end');const by=N?y+11:y;
      s+=`<rect x="${lx}" y="${by}" width="${f1(ww)}" height="14" rx="3" style="fill:${k?'var(--muted)':'var(--tpa)'}"/>`+fxTx(lx+ww+6,by+11,txt,'t-xs','fill:var(--ink);font-weight:700');
      y=by+(N?20:18);return s};
    g+=fxTx(N?12:lx,14,'Axis: '+C.ax);
    C.r.forEach(r=>{y+=6;
      if(N){fxWrap(r.t,58).forEach(ln=>{g+=fxTx(12,y+10,ln,'t-xs','fill:var(--ink);font-weight:700');y+=14});y+=2}
      else{fxWrap(r.t,27).forEach((ln,i)=>{g+=fxTx(4,y+11+i*13,ln,'t-xs','fill:var(--ink);font-weight:700')})}
      const base=y;if(!N){}
      if(r.c){r.c.forEach((c,k)=>{g+=N?arm(C.arm[k],c[0]/c[1]*100,c[0]+' of '+c[1],k):arm(C.arm[k],c[0]/c[1]*100,c[0]+' of '+c[1],k)})}
      else r.v.forEach((v,k)=>{g+=arm(C.arm[k],v,v.toFixed(1).replace(/\.0$/,'')+C.unit,k)});
      y=Math.max(y,base)+(N?8:12)});
    vb(as,`720 ${Math.round(y+4)}`,`400 ${Math.round(y+4)}`);as.innerHTML=g;$('#fxaNote').innerHTML=C.note;
  }
  $('#fxaBtns').addEventListener('click',e=>{const b=e.target.closest('[data-fxa]');if(!b)return;cmp=FX_CMP.find(c=>c.id===b.dataset.fxa);$$('[data-fxa]',$('#fxaBtns')).forEach(x=>x.setAttribute('aria-pressed',x===b));aDraw()});
  aDraw();

  const prev=redraws.frontier;redraws.frontier=()=>{prev&&prev();drawMap();aDraw()};
};
