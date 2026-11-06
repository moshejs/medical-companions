# C · Haemodynamics and shock types

Pass date: 2026-11-04. Modules served: shock, othershock.

This pass covers the physiology behind an animated circulation (cardiac output, blood pressure, resistance, oxygen delivery), the four shock classes and their haemodynamic signatures, how often each is seen in the ICU, the shock index, bedside ultrasound (RUSH), and the shock states that are not septic: cardiogenic (SCAI stages, IABP-SHOCK II, CULPRIT-SHOCK, ECLS-SHOCK, DanGer Shock), hypovolaemic and haemorrhagic (ATLS classes and their critics, CRASH-2, PROPPR), obstructive (tension pneumothorax, tamponade, massive pulmonary embolism), anaphylaxis, toxic shock syndrome, necrotising soft-tissue infection, neurogenic shock, adrenal crisis, mixed shock and septic cardiomyopathy. Fluids, vasopressor choice, steroids and MAP targets in sepsis belong to pass F; lactate and the first hour to pass E.

Access notes:
- Trial and cohort numbers come from PubMed abstracts (E-utilities efetch). Guideline wording comes from full text where it was open: Cecconi 2014 ESICM consensus, Sepsis-3, WAO 2020, RCUK 2021 (Dodd 2021) and Koch 2019 were read in Europe PMC full text. Standl 2018, ESC 2015 pericardial and ESC 2019 PE wording was read from the publisher or PMC web pages.
- In the ESC 2019 PE guideline, the class and level of each recommendation are printed in image tables that I could not read. I quote the narrative statements and Table 10 doses without class labels.
- Several key reviews have no abstract and were paywalled: Vincent & De Backer 2013 NEJM "Circulatory shock", Cannon 2018 NEJM "Hemorrhagic shock", Spodick 2003 NEJM "Acute cardiac tamponade", Rushworth 2019 NEJM "Adrenal crisis", Stevens 2017 NEJM on necrotising soft-tissue infection, and the 2022 SCAI update (Naidu 2022). I did not cite them because I could not read their content. Where possible, the same facts are cited from open sources. For example, the SOAP II shock-type split is cited from Cecconi 2014 and De Backer 2010.
- Corrections to the brief:
  - Weil & Shubin's reclassification of shock is dated 1971 (Adv Exp Med Biol 23:13-23), not 1972.
  - Cecconi 2014 reports the SOAP II split as septic 62%, cardiogenic 17% and hypovolaemic 16%, not cardiogenic 16%. The De Backer 2010 abstract gives the counts behind these percentages: 1044, 280 and 263 of 1679.
- I could not validate a source for "normal" cardiac output of 4–8 L/min, SVR of 800–1200 dyn·s·cm⁻⁵ or DO2 of about 1000 mL/min. The StatPearls chapters that give these values are in PubMed with abstracts only, and the NCBI Bookshelf pages returned a CAPTCHA. Those ranges are therefore NOT given here as cited facts. Builders should label any such values as illustrative textbook values or leave them out.
- Builders: every page that discusses symptoms, recognition or treatment carries the call-now box. The shock-index widget is a teaching tool, not a self-triage tool. Doses below (adrenaline, tranexamic acid, thrombolytics) are quoted as published, never as instructions.

## Findings

### shock · Physiology for the animated circuit
- Cardiac output (the amount of blood the heart pumps in one minute, in L/min) equals stroke volume times heart rate. It depends on four things: heart rate, contractility, preload and afterload [[Vincent2008CO]].
- Preload is "the degree of myocardial distension prior to shortening". Within limits, the more heart muscle is stretched, the harder it contracts (the Frank–Starling relationship). Venous return equals cardiac output, and preload is only one component of it [[Vincent2008CO]].
- Afterload is "the force against which the ventricles must act in order to eject blood" and depends largely on arterial pressure and vascular tone. Lowering afterload can raise cardiac output, especially when contractility is impaired [[Vincent2008CO]].
- In sepsis, cardiac output is usually normal or high even though the heart muscle may be depressed. Tachycardia and low vascular tone reduce afterload, and fluid therapy usually comes first. The review compares this to a tired cyclist keeping up speed on a smooth downhill road [[Vincent2008CO]].
- Fluids raise stroke volume through the Frank–Starling mechanism ("like adding a tailwind to the cyclist"). Excessive inotropic stimulation can raise myocardial oxygen demand [[Vincent2008CO]].
- The traditional estimate of mean arterial pressure is diastolic pressure plus one third of pulse pressure (factor 0.33). In 1878 people, a factor of 0.412 (MAP = DBP + 0.412 × PP) correlated better with target-organ damage than the traditional formula [[Papaioannou2016]].
- The ESICM task force defines circulatory shock as "a life-threatening, generalized form of acute circulatory failure associated with inadequate oxygen utilization by the cells". The result is cellular dysoxia with raised blood lactate [[Cecconi2014ESICM]].
- Shock does not require hypotension. Hypotension (SBP <90 mmHg, MAP <65 mmHg, or a fall of ≥40 mmHg from baseline) is commonly present but "should not be required to define shock" (Level 1, QoE B) [[Cecconi2014ESICM]].
- Lactate is "typically >2 mEq/L (or mmol/L) in shock states". Lactate levels above 1.5 mmol/L in septic shock are associated with increased mortality [[Cecconi2014ESICM]].
- The ESICM consensus names three "windows" for checking tissue perfusion at the bedside: the skin (cutaneous perfusion), the kidneys (urine output) and the brain (mental status) [[Cecconi2014ESICM]].
- Signs that suggest impaired microcirculation include mottled skin, acrocyanosis, slow capillary refill and an increased central-to-toe temperature gradient [[Cecconi2014ESICM]].
- A low ScvO2 (central venous oxygen saturation) suggests that oxygen transport is inadequate. Normal or high ScvO2 values cannot rule out local hypoperfusion. A venous-to-arterial CO2 gap >6 mmHg suggests insufficient tissue blood flow even when ScvO2 is >70% [[Cecconi2014ESICM]].
- In Rivers 2001 (263 adults with severe sepsis or septic shock), early goal-directed therapy adjusted preload, afterload and contractility "to balance oxygen delivery with oxygen demand". Mean ScvO2 at 7–72 h was 70.4% vs 65.3%. In-hospital mortality was 30.5% vs 46.5% with standard therapy (P=0.009) [[Rivers2001EGDT]].
- ESICM states that a cardiac output rise of at least 10–15% defines a positive response to fluids. It recommends a fluid challenge when fluids are given, unless hypovolaemia is obvious (Level 1, QoE C), and prefers dynamic over static predictors of fluid responsiveness (Level 1, QoE B) [[Cecconi2014ESICM]].
- ESICM recommends initially targeting a MAP of ≥65 mmHg (Level 1, QoE C) and individualising the target (Level 1, QoE B). It suggests tolerating lower pressure in uncontrolled bleeding without severe head injury (Level 2, QoE C). (Quoted as published, not as instructions.) [[Cecconi2014ESICM]]
- ESICM does not recommend routine cardiac output measurement when shock responds to initial therapy. It recommends cardiac output and stroke volume measurement when shock does not respond (both Level 1, QoE C). It recommends against routine use of the pulmonary artery catheter (Level 1, QoE A) [[Cecconi2014ESICM]].
- ESICM calls echocardiography the best bedside method for repeatedly assessing cardiac function. In septic shock, some patients have an LVEF close to 40% despite a cardiac index >3 L/min/m² [[Cecconi2014ESICM]].

### shock · The four shock classes and their signatures
- Weil and Shubin proposed a reclassification of shock states with "special reference to distributive defects" in 1971. This is the origin of the four-class scheme taught today (Established) [[Weil1971]].
- ESICM consensus: shock shows four underlying patterns. Three are low-flow states (hypovolaemic, cardiogenic, obstructive) and one is a hyperkinetic state (distributive). Shock can also be a combination of processes [[Cecconi2014ESICM]].
- Standl 2018 links each class to one organ system: hypovolaemic shock to the blood and fluid compartment, distributive shock to the vascular system, cardiogenic shock to the heart and obstructive shock to a blockage of the circulation [[Standl2018]].
- Hypovolaemic shock is intravascular volume loss. Standl 2018 says it is treated by fluid replacement with balanced crystalloids [[Standl2018]].
- Distributive shock is "relative hypovolemia" caused by pathological redistribution of the absolute intravascular volume. Standl 2018 says it is treated with vasoconstrictors plus fluid [[Standl2018]].
- In obstructive shock, hypoperfusion comes from raised resistance or blockage of flow. Standl 2018 says it "shall be treated with an immediate life-saving intervention" [[Standl2018]].
- Standl 2018 subdivides hypovolaemic shock into four types:
  - haemorrhagic shock (acute bleeding without major soft-tissue injury)
  - traumatic haemorrhagic shock (bleeding plus soft-tissue injury)
  - hypovolaemic shock in the narrow sense (plasma volume loss without bleeding, for example persistent vomiting and diarrhoea such as cholera, or hyperthermia)
  - traumatic hypovolaemic shock (for example large-surface burns) [[Standl2018]]
- Standl 2018 subdivides distributive shock into septic, anaphylactic/anaphylactoid and neurogenic shock [[Standl2018]].
- Standl 2018 lists the obstructive causes as vena cava compression, tension pneumothorax and pericardial tamponade (which reduce preload), and pulmonary embolism or a mediastinal mass (which raise right-ventricular afterload) [[Standl2018]].
- Standl 2018 gives cardiogenic shock criteria of a cardiac index <1.8 L/min/m² without support (<2.0 L/min/m² with pharmacological or mechanical support) together with SBP <90 mmHg [[Standl2018]].
- Haemodynamic signature, septic (distributive): Sepsis-3 identifies septic shock by "a vasopressor requirement to maintain a mean arterial pressure of 65 mm Hg or greater and serum lactate level greater than 2 mmol/L (>18 mg/dL) in the absence of hypovolemia", with hospital mortality greater than 40% [[Singer2016Sepsis3]].
- In the Sepsis-3 derivation (Surviving Sepsis Campaign database), patients needing vasopressors for MAP ≥65 mmHg with lactate >2 mmol/L after fluids had mortality of 42.3% (95% CI 41.2–43.3%). Crude septic-shock mortality across 44 studies (166,479 patients) was 46.5% (95% CI 42.7–50.3%) [[ShankarHari2016Shock]].
- In septic shock, cardiac output is typically normal or high because afterload falls. In cardiogenic shock, primary pump failure lowers cardiac output (the low-flow pattern) [[Vincent2008CO,Cecconi2014ESICM]].

### shock · How often each type occurs
- SOAP II (1679 ICU patients with shock, 2003–2007 in Europe) is the usual source for shock-type frequencies:
  - septic shock 62%
  - cardiogenic shock 17%
  - hypovolaemia 16% [[Cecconi2014ESICM]]
- The SOAP II trial report gives the counts: 1044 septic, 280 cardiogenic and 263 hypovolaemic of 1679 patients randomised [[DeBacker2010SOAPII]].
- Cecconi 2014 reports septic shock case-fatality "in the range of 40–50 %, reaching as high as 80 %" [[Cecconi2014ESICM]].
- Standl 2018 tabulates shares of shock as follows:
  - distributive: 66% (published figures) or 59% (authors' calculation)
  - hypovolaemic: 16% or 27%
  - cardiogenic: 16% or 13%
  - obstructive: 2% or 1%
  Obstructive shock is likely the rarest type [[Standl2018]].
- In SOAP II overall, 28-day mortality was 52.5% with dopamine vs 48.5% with norepinephrine (OR 1.17, 95% CI 0.97–1.42; P=0.10). Arrhythmias were more frequent with dopamine (24.1% vs 12.4%). In the 280 patients with cardiogenic shock, dopamine was associated with higher 28-day mortality (P=0.03) [[DeBacker2010SOAPII]].

### shock · Shock index (heart rate ÷ systolic blood pressure)
- Allgöwer and Burri introduced the shock index ("Schockindex") in 1967 [[Allgower1967]].
- The usual normal range is 0.5–0.7. Some evidence accepts up to 0.9, and values approaching 1.0 indicate worsening haemodynamic status and shock [[Koch2019SI,Rady1994]].
- Rady 1994 (275 ED adults whose vital signs looked stable): an SI >0.9 (41 patients) was associated with more immediate-priority triage, hospital admission and ICU care than SI <0.9 [[Rady1994]].
- Koch 2019 review: SI >1.0 "has been widely found to predict increased risk of mortality" and markers of morbidity such as massive transfusion protocol activation and ICU admission [[Koch2019SI]].
- Berger 2013 (2524 ED patients screened for sepsis) compared two SI cut-offs:
  - SI ≥0.7: most sensitive screen for lactate ≥4 mmol/L (sensitivity 0.83, NPV 0.95, the same NPV as SIRS)
  - SI ≥1.0: most specific (specificity 0.81) [[Berger2013SI,Koch2019SI]]
- Al Jalbout 2019 (about 526 million weighted US ED visits, 2005–2010) found the traditional cut-offs weak:
  - SI >0.7: positive LR 1.13 for admission and 1.54 for inpatient mortality
  - SI >0.9: positive LR 1.95 for admission and 2.59 for inpatient mortality
  - SI >1.3: positive LR 6.64 for admission and 5.67 for inpatient mortality [[AlJalbout2019]]
- Mutschler 2013 (21,853 trauma patients, TraumaRegister DGU) grouped patients by SI at ED arrival: <0.6, 0.6–<1.0, 1.0–<1.4 and ≥1.4. From the lowest to the highest group:
  - mortality rose from 10.9% to 39.8%
  - mean blood units transfused rose from 1.0 to 21.4
  - 31% of group III and 57% of group IV needed ≥10 units [[Mutschler2013SI]]
- Koch 2019 cautions that heart rate and SBP often appear normal in compensated shock and can be confounded by medicines such as antihypertensives and beta-agonists [[Koch2019SI]].

### shock · Bedside ultrasound (RUSH)
- The RUSH exam (Rapid Ultrasound in SHock) is a stepwise bedside ultrasound algorithm. It assesses the "Pump" (heart), the "Tank" (volume status) and the "Pipes" (large vessels) to identify the type of shock [[Perera2010RUSH]].
- ESICM: echocardiography can help characterise the haemodynamic disorder, select treatment, and evaluate the response to it [[Cecconi2014ESICM]].
- ESC 2019 PE guideline: in an unstable patient with suspected PE, "echocardiographic evidence of RV dysfunction is sufficient to prompt immediate reperfusion without further testing" [[Konstantinides2020ESC]].

### othershock · Cardiogenic shock
- Cardiogenic shock affects 40,000–50,000 people in the US each year and is the leading cause of in-hospital death after acute MI. Thirty-day mortality is about 40% and 1-year mortality approaches 50% [[Samsky2021]].
- Cardiogenic shock occurs in up to 10% of patients immediately after acute MI. Immediate revascularisation of the infarct-related artery is the only treatment supported by randomised trials [[Samsky2021]].
- SCAI stages A–E (2019):
  - A: "at risk"
  - B: "beginning" shock
  - C: "classic"
  - D: "deteriorating"
  - E: "extremis"
  Hypoperfusion separates B from C. D means initial interventions have not restored stability despite at least 30 minutes of observation [[Baran2019SCAI]].
- Jentzer 2019 (10,004 Mayo Clinic cardiac ICU patients) validated the stages. The proportions in stages A–E were 46.0%, 30.0%, 15.7%, 7.3% and 1.0%. Unadjusted hospital mortality was 3.0%, 7.1%, 12.4%, 40.4% and 67.0% [[Jentzer2019SCAI]].
- SHOCK trial (1999; 302 patients with LV-failure shock after MI): 30-day mortality was 46.7% with emergency revascularisation vs 56.0% with initial medical stabilisation (P=0.11). Six-month mortality was 50.3% vs 63.1% (P=0.027) [[Hochman1999SHOCK]].
- IABP-SHOCK II (2012; 600 patients): 30-day mortality was 39.7% with intra-aortic balloon pump vs 41.3% without (RR 0.96, 95% CI 0.79–1.17; P=0.69) [[Thiele2012IABP]].
- IABP-SHOCK II at 6.2 years: mortality was 66.3% vs 67.0% (RR 0.99, 95% CI 0.88–1.11). "Two thirds of patients with cardiogenic shock dying despite contemporary treatment" [[Thiele2019IABP6y]].
- CULPRIT-SHOCK (2017; 706 patients with multivessel disease): death or renal-replacement therapy at 30 days was 45.9% with culprit-lesion-only PCI vs 55.4% with immediate multivessel PCI (RR 0.83, 95% CI 0.71–0.96). The RR of death was 0.84 (95% CI 0.72–0.98) [[Thiele2017CULPRIT]].
- ECLS-SHOCK (2023; 417 analysed): 30-day death was 47.8% with early extracorporeal life support vs 49.0% with usual care (RR 0.98, 95% CI 0.80–1.19). Moderate or severe bleeding was 23.4% vs 9.6% [[Thiele2023ECLS]].
- DanGer Shock (2024; 355 analysed, STEMI with cardiogenic shock): death at 180 days was 45.8% with a microaxial flow pump (Impella CP) plus standard care vs 58.5% with standard care alone (HR 0.74, 95% CI 0.55–0.99; P=0.04). [[Moller2024DanGer]].
- DanGer Shock harms: the composite safety end point occurred in 24.0% vs 6.2% (RR 4.74), and renal-replacement therapy in 41.9% vs 26.7% [[Moller2024DanGer]].
- The AHA scientific statement on contemporary management of cardiogenic shock (2017) is the main US consensus document [[vanDiepen2017]].

### othershock · Hypovolaemic and haemorrhagic shock
- ATLS sets out four classes of hypovolaemic shock based on estimated percentage blood loss, with matching heart rate, systolic blood pressure and mental status [[Mutschler2014ATLS,Mutschler2013SI]]. The numeric thresholds are printed in the ATLS manual, which I could not read, so they are not given here. (unverified)
- Mutschler 2013 (36,504 trauma patients): only 9.3% could be placed in an ATLS class using the combination of heart rate, SBP and GCS. When patients were grouped by SBP, no relevant tachycardia was seen in any group [[Mutschler2013ATLS]].
- In a survey of 383 European ATLS instructors, only 48% assessed circulation with the ATLS shock classification. Only 10.9% considered it a "good guide" for fluids and blood products [[Mutschler2014ATLS]].
- Mutschler 2013 proposed an alternative classification by base deficit (16,305 patients): class I ≤2, II >2–6, III >6–10 and IV >10 mmol/L. From class I to IV:
  - mortality rose from 7.4% to 51.5%
  - massive transfusion rose from 5% to 52% [[Mutschler2013BD]]
- CRASH-2 (2010; 20,211 adult trauma patients with or at risk of significant bleeding): tranexamic acid was given as 1 g over 10 min, then 1 g over 8 h, within 8 h of injury. Results with tranexamic acid vs placebo:
  - all-cause death: 14.5% vs 16.0% (RR 0.91, 95% CI 0.85–0.97)
  - death from bleeding: 4.9% vs 5.7% (RR 0.85) [[CRASH2-2010]]
- CRASH-2 timing analysis, death from bleeding by time from injury to treatment:
  - ≤1 h: 5.3% vs 7.7% (RR 0.68)
  - 1–3 h: 4.8% vs 6.1% (RR 0.79)
  - >3 h: 4.4% vs 3.1% (RR 1.44, possible harm) [[CRASH2-2011]]
- Gayet-Ageron 2018 (individual data on 40,138 patients from CRASH-2 and WOMAN):
  - immediate treatment improved survival from bleeding by more than 70% (OR 1.72)
  - the benefit fell by 10% for every 15 min of delay until 3 h, after which there was no benefit
  - 63% of bleeding deaths occurred within 12 h of onset [[GayetAgeron2018]]
- PROPPR (2015; 680 severely injured patients predicted to need massive transfusion) compared plasma:platelets:red cells in 1:1:1 vs 1:1:2 ratios:
  - 24-hour mortality: 12.7% vs 17.0% (P=0.12)
  - 30-day mortality: 22.4% vs 26.1% (P=0.26)
  - death from exsanguination by 24 h: 9.2% vs 14.6%
  - haemostasis achieved: 86% vs 78% [[Holcomb2015PROPPR]]
- Severe burns bring an immune and inflammatory response, metabolic changes and distributive shock that can lead to multiple organ failure [[Jeschke2020Burns]].

### othershock · Obstructive shock
- Tension pneumothorax (systematic review; 183 case reports and 5 cohorts):
  - hypoxia was reported in 50.0% of people breathing unassisted vs 91.8% of ventilated people
  - compared with unassisted breathing, the adjusted odds of hypotension were 12.6 times higher with assisted ventilation, and of cardiac arrest 17.7 times higher
  - 70.4% of ventilated patients who became hypotensive or arrested did so within minutes [[Roberts2015TPTX]]
- ESC 2015 defines cardiac tamponade as "a life-threatening, slow or rapid compression of the heart due to the pericardial accumulation of fluid". Listed signs include tachycardia, hypotension, pulsus paradoxus, raised jugular venous pressure and muffled heart sounds [[Adler2015ESC]].
- ESC 2015 defines pulsus paradoxus as "an inspiratory decrease in systolic arterial pressure of >10 mmHg during normal breathing" [[Adler2015ESC]].
- ESC 2015 calls echocardiography "the single most useful diagnostic tool". Treatment is drainage, "preferably by needle pericardiocentesis", without delay in unstable patients. Surgical drainage is preferred in some situations such as purulent pericarditis or urgent bleeding [[Adler2015ESC]].
- The classically taught Beck's triad (hypotension, raised neck veins, muffled heart sounds) "does not appear commonly", and dyspnoea is the most frequently reported symptom [[Alerhand2022]].
- Echo findings in tamponade include diastolic right-ventricular collapse (specific), systolic right-atrial collapse (sensitive) and a plethoric, non-collapsing IVC (sensitive). Positive-pressure ventilation and sedation can lower cardiac output in tamponade [[Alerhand2022]].
- ESC 2019 defines haemodynamic instability (high-risk PE) as any of the following:
  - cardiac arrest
  - obstructive shock (SBP <90 mmHg, or vasopressors needed to reach ≥90 mmHg despite adequate filling, together with end-organ hypoperfusion)
  - persistent hypotension (SBP <90 mmHg or a drop of ≥40 mmHg for >15 min, not caused by arrhythmia, hypovolaemia or sepsis) [[Konstantinides2020ESC]]
- ESC 2019: "Primary reperfusion treatment, in most cases systemic thrombolysis, is the treatment of choice for patients with high-risk PE". Surgical embolectomy or catheter-directed treatment are alternatives. Routine full-dose thrombolysis "is not recommended" in intermediate-risk PE [[Konstantinides2020ESC]].
- ESC 2019 Table 10 lists the published rtPA regimen as 100 mg over 2 h, with an accelerated regimen of 0.6 mg/kg over 15 min (maximum 50 mg) that is not officially approved. It describes cautious volume loading as ≤500 mL over 15–30 min. (Quoted as published, not as instructions.) [[Konstantinides2020ESC]]
- ICOPER (2392 patients with acute PE): 4.5% had massive PE (SBP <90 mmHg). Their 90-day mortality was 52.4% vs 14.7% for non-massive PE [[Kucher2006ICOPER]].
- Meta-analysis of 16 trials (2115 patients), thrombolysis vs anticoagulation:
  - all-cause mortality: 2.17% vs 3.89% (OR 0.53; NNT 59)
  - major bleeding: 9.24% vs 3.42% (NNH 18)
  - intracranial haemorrhage: 1.46% vs 0.19% [[Chatterjee2014]]
- PEITHO (1005 normotensive intermediate-risk PE patients), tenecteplase vs placebo:
  - death or haemodynamic decompensation within 7 days: 2.6% vs 5.6% (OR 0.44)
  - stroke: 2.4% vs 0.2%
  - extracranial bleeding: 6.3% vs 1.2% [[Meyer2014PEITHO]]

### othershock · Anaphylaxis (distributive)
- NIAID/FAAN (2006) proposed clinical criteria for diagnosing anaphylaxis [[Sampson2006]]. They were designed to identify at least 95% of episodes and are "an aid to diagnosis", not a definition [[Cardona2020WAO]].
- WAO 2020 amended criteria. Anaphylaxis is highly likely if either applies:
  - (1) acute skin or mucosal involvement plus respiratory compromise, reduced blood pressure or end-organ dysfunction, or severe gastrointestinal symptoms
  - (2) acute hypotension, bronchospasm or laryngeal involvement after exposure to a known or probable allergen, even without skin features [[Cardona2020WAO]]
- Standl 2018 describes anaphylactic shock as massive histamine-mediated vasodilation and maldistribution [[Standl2018]].
- WAO 2020 quotes an intramuscular adrenaline (epinephrine) dose of 0.01 mg/kg, to a maximum of 0.5 mg, repeated every 5–15 min if symptoms are refractory. By age: 0.15 mg for 1–5 years, 0.3 mg for 6–12 years, and 0.5 mg for teenagers and adults, all as 1 mg/mL (1:1000). (Quoted as published.) [[Cardona2020WAO]]
- Resuscitation Council UK 2021 quotes IM adrenaline as 500 micrograms (0.5 mg) for adults and children >12 years (300 micrograms if small or prepubertal), 300 micrograms at 6–12 years, 150 micrograms at 6 months–6 years and 100–150 micrograms under 6 months. It recommends repeat doses about every 5 min if there is no improvement. (Quoted as published.) [[Dodd2021RCUK]]
- RCUK 2021 no longer routinely recommends corticosteroids for emergency treatment and recommends against antihistamines for acute management. If respiratory or cardiovascular features persist after 2 doses of adrenaline, it advises expert help for a low-dose IV adrenaline infusion [[Dodd2021RCUK]].
- The US EpiPen label gives 0.3 mg IM or SC into the anterolateral thigh for patients ≥30 kg. More than two sequential doses should only be given under direct medical supervision, and the label states the auto-injector is "not a substitute for immediate medical care" [[FDA-EpiPen]].
- Biphasic reactions return after the first reaction has resolved, without re-exposure to the trigger. A meta-analysis (27 studies; 4114 patients with anaphylaxis, 192 with biphasic reactions) found a median onset of 11 h (range 0.2–72 h) [[Lee2015Biphasic]].
- Biphasic reactions were more likely with hypotension at presentation (OR 2.18) or an unknown trigger (OR 1.72), and less likely with food triggers (OR 0.62) [[Lee2015Biphasic]].
- Severe anaphylaxis and needing repeated adrenaline doses are risk factors for biphasic anaphylaxis. Antihistamines and glucocorticoids do not reliably prevent it [[Shaker2020]].
- RCUK 2021 reports that biphasic reactions occur in about 5% of cases. In a prospective cohort, giving adrenaline more than 30 min after symptom onset was associated with more biphasic reactions (OR 3.39). One third of biphasic reactions in the European registry occurred more than 12 h after the first symptoms [[Dodd2021RCUK]].
- RCUK 2021 suggests risk-stratified observation: fast-track discharge after 2 h from resolution in selected low-risk patients, a minimum of 6 h for others, and at least 12 h for higher-risk reactions [[Dodd2021RCUK]].
- UK fatal reactions (Pumphrey 2000), median time to respiratory or cardiac arrest:
  - iatrogenic (medicines): 5 min
  - venom: 15 min
  - food: 30 min
  Adrenaline was used before arrest in only 14% of fatal cases [[Pumphrey2000]].
- In England and Wales (1992–2012), hospital admissions for anaphylaxis rose 615%. The fatality rate stayed stable at 0.047 per 100,000 population per year [[Turner2015Anaph]].

### othershock · Toxic shock syndrome and necrotising soft-tissue infection
- Toxic shock syndrome (TSS) is an acute, toxin-mediated, multi-system illness caused by toxin-producing Staphylococcus aureus or group A streptococcus. The toxins act as superantigens and trigger a "cytokine avalanche" [[Lappin2009]].
- Specific treatment for TSS includes source control and antibiotics that suppress toxin production (for example clindamycin or linezolid). IVIG has the potential to neutralise superantigen [[Lappin2009]].
- Standl 2018 quotes a TSS incidence of about 0.5 per 100,000 and mortality of 2–11% [[Standl2018]].
- Babiker 2021 (1079 invasive group A streptococcal infections treated with β-lactams, US hospitals): in-hospital mortality was 6.5% with adjunctive clindamycin vs 11.0% without (aOR 0.44, 95% CI 0.23–0.81) (Early evidence; observational) [[Babiker2021]].
- Babiker 2025 (target-trial emulation, 1095 patients): adjunctive linezolid appeared non-inferior to clindamycin for invasive group A streptococcal infection (in-hospital mortality 9.8% vs 7.0%; aRR 0.92) (Early evidence) [[Babiker2025]].
- IVIG meta-analysis (clindamycin-treated streptococcal TSS; 1 RCT plus 4 non-randomised studies): mortality fell from 33.7% to 15.7% with IVIG (Early evidence) [[Parks2018IVIG]].
- The LRINEC score combines white cell count, haemoglobin, sodium, glucose, creatinine and CRP. In derivation, a cut-off of 6 gave a PPV of 92.0% and an NPV of 96.0% [[Wong2004LRINEC]].
- In a meta-analysis (23 studies, 5982 patients), LRINEC performed less well:
  - LRINEC ≥6: sensitivity 68.2%, specificity 84.8%
  - LRINEC ≥8: sensitivity 40.8%, specificity 94.9%
  The authors conclude that LRINEC "should not be used to rule-out" necrotising soft-tissue infection [[Fernando2019NSTI]].
- In the same meta-analysis, examination signs were insensitive: fever had sensitivity 46.0%, hypotension 21.0% and haemorrhagic bullae 25.2%. CT had sensitivity 88.5% and specificity 93.3% [[Fernando2019NSTI]].

### othershock · Neurogenic shock and adrenal crisis
- Neurogenic shock is a distributive shock after spinal cord injury, caused by an imbalance of sympathetic and parasympathetic control [[Ruiz2018,Standl2018]]. Its classic picture is hypotension with a slow heart rate. In TARN data, SBP <100 mmHg with heart rate <80/min at ED arrival was seen in:
  - cervical cord injuries: 19.3%
  - thoracic injuries: 7%
  - lumbar injuries: 3% [[Guly2008]]
- Ruiz 2018 (84 adults) calculated an incidence of 29% after cervical spinal cord injury using combined haemodynamic and laboratory criteria. Reported incidence varies widely with the definition used [[Ruiz2018]].
- Adrenal crisis in educated patients with chronic adrenal insufficiency (423 patients followed prospectively for 2 years):
  - 8.3 crises per 100 patient-years
  - 0.5 crisis-related deaths per 100 patient-years
  - main triggers: gastrointestinal infection, fever and emotional stress (20% each) [[Hahner2015]]

### othershock · Mixed shock and septic cardiomyopathy
- ESICM: "Shock can be due to a combination of processes" [[Cecconi2014ESICM]]. Standl 2018 calls septic shock "a mixed form of a variety of pathologies" and notes combined forms after trauma, such as tension pneumothorax plus haemorrhage [[Standl2018]].
- Parker 1984 (20 patients with septic shock): all had a normal or high cardiac index, yet 10 had an ejection fraction below 0.40. Paradoxically, 10 of 13 survivors but none of 7 non-survivors had an initial EF <0.40. In survivors, the EF returned to normal within about 10 days [[Parker1984]].
- Vieillard-Baron 2008 (67 ventilated patients with septic shock, transoesophageal echo) found global LV hypokinesia (LVEF <45%) in 60%:
  - 26 at admission
  - 14 unmasked after 24–48 h of norepinephrine
  It was usually reversible and was not associated with worse prognosis [[VieillardBaron2008]].
- Septic cardiomyopathy has multiple competing definitions, and its impact on prognosis and therapy "remains to be demonstrated". Treatment is aimed at the underlying sepsis, plus support for cardiogenic shock when present [[Beesley2018]].
- Sepsis-induced cardiomyopathy is common. Whether its mechanisms are adaptive responses has not been definitively answered (Hypothesis) [[Hollenberg2021]].

### Exam hooks
- Cardiac output = heart rate × stroke volume. Its four determinants are heart rate, contractility, preload and afterload [[Vincent2008CO]].
- Traditional MAP estimate = DBP + ⅓ pulse pressure [[Papaioannou2016]].
- Shock is defined by inadequate cellular oxygen use, not by hypotension. Lactate is typically >2 mmol/L [[Cecconi2014ESICM]].
- Three low-flow shock types (hypovolaemic, cardiogenic, obstructive) and one hyperkinetic type (distributive) [[Cecconi2014ESICM]].
- The three bedside perfusion "windows" are the skin, the kidneys (urine output) and the brain (mental status) [[Cecconi2014ESICM]].
- Most common shock in the ICU (SOAP II): septic, 62% [[Cecconi2014ESICM]].
- Sepsis-3 septic shock = vasopressors to keep MAP ≥65 mmHg plus lactate >2 mmol/L despite adequate fluids; mortality >40% [[Singer2016Sepsis3]].
- Shock index = HR/SBP. Normal is 0.5–0.7; values approaching 1.0 suggest shock [[Koch2019SI]].
- SCAI stage C ("classic") differs from stage B by the presence of hypoperfusion [[Baran2019SCAI]].
- IABP did not reduce 30-day mortality in infarct-related cardiogenic shock (39.7% vs 41.3%) [[Thiele2012IABP]].
- In multivessel disease with cardiogenic shock, PCI of the culprit lesion only beat immediate multivessel PCI [[Thiele2017CULPRIT]].
- Tranexamic acid works best early. Given after 3 h, it was associated with more deaths from bleeding [[CRASH2-2011]].
- Pulsus paradoxus = inspiratory fall in SBP >10 mmHg [[Adler2015ESC]].
- Ventilated patients with tension pneumothorax are far more likely to become hypotensive or arrest than those breathing on their own [[Roberts2015TPTX]].
- IM adrenaline into the anterolateral thigh is first-line for anaphylaxis. The adult dose is quoted as 0.5 mg (RCUK/WAO) [[Dodd2021RCUK,Cardona2020WAO]].
- Median time to arrest in fatal anaphylaxis is 5 min for medicines, 15 min for venom and 30 min for food [[Pumphrey2000]].
- LRINEC is not sensitive enough to rule out necrotising fasciitis [[Fernando2019NSTI]].
- Septic myocardial depression with a low EF can occur despite a high cardiac output, and it is often reversible [[Parker1984]].

### In plain words
- Shock means the body's organs are not getting enough oxygen from the blood. Blood pressure can still look normal at first [[Cecconi2014ESICM]].
- The heart is a pump, the blood is the fluid in the "tank", and the blood vessels are the "pipes". Shock happens when one or more of these fails [[Perera2010RUSH]].
- In septic shock (shock caused by the body's harmful response to an infection), the blood vessels relax and leak. The heart often pumps hard, but the pressure still falls [[Vincent2008CO,Singer2016Sepsis3]].
- Warning signs that organs are short of blood include cold or blotchy (mottled) skin, passing little urine, and confusion or unusual sleepiness [[Cecconi2014ESICM]].
- Sepsis is a medical emergency. If someone with an infection becomes very unwell (confused or very drowsy, breathing very fast, cold, mottled or bluish skin, passing little or no urine), call your local emergency number or go to an emergency department now and ask: could this be sepsis?
- The shock index (heart rate divided by blood pressure) is a teaching tool for students. It is not a way to decide at home whether to get help [[Koch2019SI]].
- A severe allergic reaction (anaphylaxis) can become life-threatening within minutes. An adrenaline auto-injector is used straight away, and then you still call for emergency help [[Pumphrey2000,FDA-EpiPen]].
- Symptoms of anaphylaxis can come back hours later, so people are usually watched in hospital for a while after treatment [[Lee2015Biphasic,Dodd2021RCUK]].
- Shock after a heart attack (cardiogenic shock) is serious. About 4 in 10 people with it die within a month. This is a population figure and does not predict what will happen to any one person [[Samsky2021]].
- In heavy bleeding after injury, the drug tranexamic acid helps most when given early [[GayetAgeron2018]].
- After septic shock, the heart muscle can be weak for a while. In many people it recovers over days [[Parker1984]].

## Numbers for the animations
- soap2_share | septic | 62 | % of ICU shock | [[Cecconi2014ESICM]]
- soap2_share | cardiogenic | 17 | % of ICU shock | [[Cecconi2014ESICM]]
- soap2_share | hypovolaemic | 16 | % of ICU shock | [[Cecconi2014ESICM]]
- soap2_count | septic | 1044 | patients of 1679 | [[DeBacker2010SOAPII]]
- soap2_count | cardiogenic | 280 | patients of 1679 | [[DeBacker2010SOAPII]]
- soap2_count | hypovolaemic | 263 | patients of 1679 | [[DeBacker2010SOAPII]]
- scai_stage_mortality | A | 3.0 | % hospital mortality | [[Jentzer2019SCAI]]
- scai_stage_mortality | B | 7.1 | % hospital mortality | [[Jentzer2019SCAI]]
- scai_stage_mortality | C | 12.4 | % hospital mortality | [[Jentzer2019SCAI]]
- scai_stage_mortality | D | 40.4 | % hospital mortality | [[Jentzer2019SCAI]]
- scai_stage_mortality | E | 67.0 | % hospital mortality | [[Jentzer2019SCAI]]
- scai_stage_share | A | 46.0 | % of CICU patients | [[Jentzer2019SCAI]]
- scai_stage_share | B | 30.0 | % of CICU patients | [[Jentzer2019SCAI]]
- scai_stage_share | C | 15.7 | % of CICU patients | [[Jentzer2019SCAI]]
- scai_stage_share | D | 7.3 | % of CICU patients | [[Jentzer2019SCAI]]
- scai_stage_share | E | 1.0 | % of CICU patients | [[Jentzer2019SCAI]]
- danger_death_microaxial | 180 d | 45.8 | % died | [[Moller2024DanGer]]
- danger_death_standard | 180 d | 58.5 | % died | [[Moller2024DanGer]]
- iabp_death_iabp | 30 d | 39.7 | % died | [[Thiele2012IABP]]
- iabp_death_control | 30 d | 41.3 | % died | [[Thiele2012IABP]]
- iabp_death_iabp | 6.2 y | 66.3 | % died | [[Thiele2019IABP6y]]
- iabp_death_control | 6.2 y | 67.0 | % died | [[Thiele2019IABP6y]]
- shock_trial_death_revasc | 30 d | 46.7 | % died | [[Hochman1999SHOCK]]
- shock_trial_death_medical | 30 d | 56.0 | % died | [[Hochman1999SHOCK]]
- shock_trial_death_revasc | 6 mo | 50.3 | % died | [[Hochman1999SHOCK]]
- shock_trial_death_medical | 6 mo | 63.1 | % died | [[Hochman1999SHOCK]]
- culprit_death_or_rrt | culprit-only 30 d | 45.9 | % | [[Thiele2017CULPRIT]]
- culprit_death_or_rrt | multivessel 30 d | 55.4 | % | [[Thiele2017CULPRIT]]
- ecls_death | ECLS 30 d | 47.8 | % died | [[Thiele2023ECLS]]
- ecls_death | control 30 d | 49.0 | % died | [[Thiele2023ECLS]]
- txa_bleed_death_rr | ≤1 h | 0.68 | relative risk | [[CRASH2-2011]]
- txa_bleed_death_rr | 1–3 h | 0.79 | relative risk | [[CRASH2-2011]]
- txa_bleed_death_rr | >3 h | 1.44 | relative risk | [[CRASH2-2011]]
- txa_survival_or | 0 min | 1.72 | odds ratio for surviving bleeding | [[GayetAgeron2018]]
- txa_benefit_decay | per 15 min | 10 | % loss of benefit until 3 h | [[GayetAgeron2018]]
- crash2_all_cause_death | TXA 28 d | 14.5 | % | [[CRASH2-2010]]
- crash2_all_cause_death | placebo 28 d | 16.0 | % | [[CRASH2-2010]]
- proppr_death | 1:1:1 24 h | 12.7 | % | [[Holcomb2015PROPPR]]
- proppr_death | 1:1:2 24 h | 17.0 | % | [[Holcomb2015PROPPR]]
- proppr_death | 1:1:1 30 d | 22.4 | % | [[Holcomb2015PROPPR]]
- proppr_death | 1:1:2 30 d | 26.1 | % | [[Holcomb2015PROPPR]]
- si_trauma_mortality | SI <0.6 | 10.9 | % mortality | [[Mutschler2013SI]]
- si_trauma_mortality | SI ≥1.4 | 39.8 | % mortality | [[Mutschler2013SI]]
- si_trauma_units | SI <0.6 | 1.0 | mean RBC units | [[Mutschler2013SI]]
- si_trauma_units | SI ≥1.4 | 21.4 | mean RBC units | [[Mutschler2013SI]]
- bd_class_mortality | I | 7.4 | % | [[Mutschler2013BD]]
- bd_class_mortality | IV | 51.5 | % | [[Mutschler2013BD]]
- bd_class_massive_transfusion | I | 5 | % | [[Mutschler2013BD]]
- bd_class_massive_transfusion | IV | 52 | % | [[Mutschler2013BD]]
- si_ed_plr_mortality | >0.7 | 1.54 | positive LR | [[AlJalbout2019]]
- si_ed_plr_mortality | >0.9 | 2.59 | positive LR | [[AlJalbout2019]]
- si_ed_plr_mortality | >1.3 | 5.67 | positive LR | [[AlJalbout2019]]
- pe_90d_mortality | massive | 52.4 | % | [[Kucher2006ICOPER]]
- pe_90d_mortality | non-massive | 14.7 | % | [[Kucher2006ICOPER]]
- anaphylaxis_time_to_arrest | iatrogenic | 5 | min (median) | [[Pumphrey2000]]
- anaphylaxis_time_to_arrest | venom | 15 | min (median) | [[Pumphrey2000]]
- anaphylaxis_time_to_arrest | food | 30 | min (median) | [[Pumphrey2000]]
- biphasic_onset | median | 11 | h after first reaction | [[Lee2015Biphasic]]
- adrenaline_repeat_interval | RCUK | 5 | min | [[Dodd2021RCUK]]
- septic_ef_survivors | day 0 | 0.32 | mean LVEF | [[Parker1984]]
- septic_ef_survivors | ~day 10 | normal | LVEF returned to normal | [[Parker1984]]
- lv_hypokinesia_septic_shock | days 1–3 | 60 | % of patients | [[VieillardBaron2008]]
- stss_ivig_mortality | no IVIG | 33.7 | % | [[Parks2018IVIG]]
- stss_ivig_mortality | IVIG | 15.7 | % | [[Parks2018IVIG]]
- septic_shock_mortality | Sepsis-3 criteria | 42.3 | % hospital mortality | [[ShankarHari2016Shock]]
- neurogenic_shock_incidence | cervical SCI | 19.3 | % at ED arrival | [[Guly2008]]
- adrenal_crisis_rate | per 100 patient-years | 8.3 | crises | [[Hahner2015]]

## Open questions and controversies
- Shock index cut-off: traditional thresholds of 0.7–0.9 flag illness [[Rady1994,Koch2019SI]]; in a national US ED dataset only SI >1.3 gave a clinically useful positive LR [[AlJalbout2019]]. Status: no single threshold. Treat SI as a trend and teaching tool.
- ATLS classes of blood loss: widely taught [[Mutschler2014ATLS]]; registry data show that fewer than 1 in 10 trauma patients fit a class, and base deficit or SI groupings discriminate better [[Mutschler2013ATLS,Mutschler2013BD,Mutschler2013SI]]. Status: still in teaching, with debate.
- Mechanical circulatory support in infarct-related cardiogenic shock: IABP showed no benefit at 30 days or 6 years [[Thiele2012IABP,Thiele2019IABP6y]] and ECLS no 30-day benefit [[Thiele2023ECLS]]; a microaxial flow pump lowered 180-day mortality in selected STEMI shock but with more complications [[Moller2024DanGer]]. Status: device selection remains contested.
- Adjunctive anti-toxin therapy in group A streptococcal TSS: clindamycin is supported by observational data [[Babiker2021]], linezolid is an emerging alternative [[Babiker2025]], and IVIG data are small and mostly non-randomised [[Parks2018IVIG]]. Status: Early evidence.
- Observation after anaphylaxis: 6–12 h fixed observation misses many biphasic reactions, so RCUK moved to risk-stratified discharge [[Dodd2021RCUK]]; biphasic onset ranges up to 72 h [[Lee2015Biphasic]]. Status: optimal duration unknown.
- Septic cardiomyopathy: common and often reversible [[Parker1984,VieillardBaron2008]], but definitions compete and its effect on prognosis is unproven [[Beesley2018]]. Whether it is adaptive (for example hibernation-like) is a Hypothesis [[Hollenberg2021]].
- Thrombolysis in intermediate-risk PE: it prevents decompensation but raises stroke and bleeding [[Meyer2014PEITHO]]; meta-analysis shows lower mortality with more bleeding [[Chatterjee2014]]; ESC 2019 does not recommend routine full-dose thrombolysis here [[Konstantinides2020ESC]].
- MAP formula: the ⅓ factor is traditional, and 0.412 correlated better with organ damage in one cohort [[Papaioannou2016]]. Status: intra-arterial validation needed.

## Sources
- [Weil1971] Weil MH, Shubin H. Proposed reclassification of shock states with special reference to distributive defects. Adv Exp Med Biol. 1971;23(0):13-23. PMID 5164840; doi:10.1007/978-1-4615-9014-9_3. No abstract; cited for the title-level claim only. (validated: PubMed)
- [DeBacker2010SOAPII] De Backer D, Biston P, Devriendt J, Madl C, Chochrad D, Aldecoa C, et al. Comparison of dopamine and norepinephrine in the treatment of shock. N Engl J Med. 2010;362(9):779-89. PMID 20200382; doi:10.1056/NEJMoa0907118. (validated: PubMed)
- [Baran2019SCAI] Baran DA, Grines CL, Bailey S, Burkhoff D, Hall SA, Henry TD, et al. SCAI clinical expert consensus statement on the classification of cardiogenic shock: This document was endorsed by the American College of Cardiology (ACC), the American Heart Association (AHA), the Society of Critical Care Medicine (SCCM), and the Society of Thoracic Surgeons (STS) in April 2019. Catheter Cardiovasc Interv. 2019;94(1):29-37. PMID 31104355; doi:10.1002/ccd.28329. (validated: PubMed)
- [Thiele2012IABP] Thiele H, Zeymer U, Neumann FJ, Ferenc M, Olbrich HG, Hausleiter J, et al. Intraaortic balloon support for myocardial infarction with cardiogenic shock. N Engl J Med. 2012;367(14):1287-96. PMID 22920912; doi:10.1056/NEJMoa1208410. (validated: PubMed)
- [Thiele2019IABP6y] Thiele H, Zeymer U, Thelemann N, Neumann FJ, Hausleiter J, Abdel-Wahab M, et al. Intraaortic Balloon Pump in Cardiogenic Shock Complicating Acute Myocardial Infarction: Long-Term 6-Year Outcome of the Randomized IABP-SHOCK II Trial. Circulation. 2019;139(3):395-403. PMID 30586721; doi:10.1161/CIRCULATIONAHA.118.038201. (validated: PubMed)
- [Moller2024DanGer] Møller JE, Engstrøm T, Jensen LO, Eiskjær H, Mangner N, Polzin A, et al. Microaxial Flow Pump or Standard Care in Infarct-Related Cardiogenic Shock. N Engl J Med. 2024;390(15):1382-1393. PMID 38587239; doi:10.1056/NEJMoa2312572. (validated: PubMed)
- [Thiele2017CULPRIT] Thiele H, Akin I, Sandri M, Fuernau G, de Waha S, Meyer-Saraei R, et al. PCI Strategies in Patients with Acute Myocardial Infarction and Cardiogenic Shock. N Engl J Med. 2017;377(25):2419-2432. PMID 29083953; doi:10.1056/NEJMoa1710261. (validated: PubMed)
- [Thiele2023ECLS] Thiele H, Zeymer U, Akin I, Behnes M, Rassaf T, Mahabadi AA, et al. Extracorporeal Life Support in Infarct-Related Cardiogenic Shock. N Engl J Med. 2023;389(14):1286-1297. PMID 37634145; doi:10.1056/NEJMoa2307227. (validated: PubMed)
- [Hochman1999SHOCK] Hochman JS, Sleeper LA, Webb JG, Sanborn TA, White HD, Talley JD, et al. Early revascularization in acute myocardial infarction complicated by cardiogenic shock. SHOCK Investigators. N Engl J Med. 1999;341(9):625-34. PMID 10460813; doi:10.1056/NEJM199908263410901. (validated: PubMed)
- [Jentzer2019SCAI] Jentzer JC, van Diepen S, Barsness GW, Henry TD, Menon V, Rihal CS, et al. Cardiogenic Shock Classification to Predict Mortality in the Cardiac Intensive Care Unit. J Am Coll Cardiol. 2019;74(17):2117-2128. PMID 31548097; doi:10.1016/j.jacc.2019.07.077. (validated: PubMed)
- [vanDiepen2017] van Diepen S, Katz JN, Albert NM, Henry TD, Jacobs AK, Kapur NK, et al. Contemporary Management of Cardiogenic Shock: A Scientific Statement From the American Heart Association. Circulation. 2017;136(16):e232-e268. PMID 28923988; doi:10.1161/CIR.0000000000000525. (validated: PubMed)
- [Samsky2021] Samsky MD, Morrow DA, Proudfoot AG, Hochman JS, Thiele H, Rao SV. Cardiogenic Shock After Acute Myocardial Infarction: A Review. JAMA. 2021;326(18):1840-1850. PMID 34751704; PMCID PMC9661446; doi:10.1001/jama.2021.18323. (validated: PubMed)
- [CRASH2-2010] Shakur H, Roberts I, Bautista R, Caballero J, Coats T, Dewan Y, et al. Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients with significant haemorrhage (CRASH-2): a randomised, placebo-controlled trial. Lancet. 2010;376(9734):23-32. PMID 20554319; doi:10.1016/S0140-6736(10)60835-5. (validated: PubMed)
- [CRASH2-2011] Roberts I, Shakur H, Afolabi A, Brohi K, Coats T, Dewan Y, et al. The importance of early treatment with tranexamic acid in bleeding trauma patients: an exploratory analysis of the CRASH-2 randomised controlled trial. Lancet. 2011;377(9771):1096-101, 1101.e1-2. PMID 21439633; doi:10.1016/S0140-6736(11)60278-X. (validated: PubMed)
- [GayetAgeron2018] Gayet-Ageron A, Prieto-Merino D, Ker K, Shakur H, Ageron FX, Roberts I. Effect of treatment delay on the effectiveness and safety of antifibrinolytics in acute severe haemorrhage: a meta-analysis of individual patient-level data from 40 138 bleeding patients. Lancet. 2018;391(10116):125-132. PMID 29126600; PMCID PMC5773762; doi:10.1016/S0140-6736(17)32455-8. (validated: PubMed)
- [Holcomb2015PROPPR] Holcomb JB, Tilley BC, Baraniuk S, Fox EE, Wade CE, Podbielski JM, et al. Transfusion of plasma, platelets, and red blood cells in a 1:1:1 vs a 1:1:2 ratio and mortality in patients with severe trauma: the PROPPR randomized clinical trial. JAMA. 2015;313(5):471-82. PMID 25647203; PMCID PMC4374744; doi:10.1001/jama.2015.12. (validated: PubMed)
- [Mutschler2013ATLS] Mutschler M, Nienaber U, Brockamp T, Wafaisade A, Wyen H, Peiniger S, et al. A critical reappraisal of the ATLS classification of hypovolaemic shock: does it really reflect clinical reality? Resuscitation. 2013;84(3):309-13. PMID 22835498; doi:10.1016/j.resuscitation.2012.07.012. (validated: PubMed)
- [Mutschler2013SI] Mutschler M, Nienaber U, Münzberg M, Wölfl C, Schoechl H, Paffrath T, et al. The Shock Index revisited - a fast guide to transfusion requirement? A retrospective analysis on 21,853 patients derived from the TraumaRegister DGU. Crit Care. 2013;17(4):R172. PMID 23938104; PMCID PMC4057268; doi:10.1186/cc12851. (validated: PubMed)
- [Mutschler2013BD] Mutschler M, Nienaber U, Brockamp T, Wafaisade A, Fabian T, Paffrath T, et al. Renaissance of base deficit for the initial assessment of trauma patients: a base deficit-based classification for hypovolemic shock developed on data from 16,305 patients derived from the TraumaRegister DGU®. Crit Care. 2013;17(2):R42. PMID 23497602; PMCID PMC3672480; doi:10.1186/cc12555. (validated: PubMed)
- [Mutschler2014ATLS] Mutschler M, Paffrath T, Wölfl C, Probst C, Nienaber U, Schipper IB, et al. The ATLS(®) classification of hypovolaemic shock: a well established teaching tool on the edge? Injury. 2014;45 Suppl 3:S35-8. PMID 25284231; doi:10.1016/j.injury.2014.08.015. (validated: PubMed)
- [Standl2018] Standl T, Annecke T, Cascorbi I, Heller AR, Sabashnikov A, Teske W. The Nomenclature, Definition and Distinction of Types of Shock. Dtsch Arztebl Int. 2018;115(45):757-768. PMID 30573009; PMCID PMC6323133; doi:10.3238/arztebl.2018.0757. Subtypes, cardiogenic CI threshold and Table 1 shares read from the PMC article page. (validated: PubMed)
- [Jeschke2020Burns] Jeschke MG, van Baar ME, Choudhry MA, Chung KK, Gibran NS, Logsetty S. Burn injury. Nat Rev Dis Primers. 2020;6(1):11. PMID 32054846; PMCID PMC7224101; doi:10.1038/s41572-020-0145-5. (validated: PubMed)
- [Konstantinides2020ESC] Konstantinides SV, Meyer G, Becattini C, Bueno H, Geersing GJ, Harjola VP, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the European Respiratory Society (ERS). Eur Heart J. 2020;41(4):543-603. PMID 31504429; doi:10.1093/eurheartj/ehz405. Table 4, Table 10 and narrative statements read on the publisher page; class/level tables were images. (validated: PubMed)
- [Meyer2014PEITHO] Meyer G, Vicaut E, Danays T, Agnelli G, Becattini C, Beyer-Westendorf J, et al. Fibrinolysis for patients with intermediate-risk pulmonary embolism. N Engl J Med. 2014;370(15):1402-11. PMID 24716681; doi:10.1056/NEJMoa1302097. (validated: PubMed)
- [Chatterjee2014] Chatterjee S, Chakraborty A, Weinberg I, Kadakia M, Wilensky RL, Sardar P, et al. Thrombolysis for pulmonary embolism and risk of all-cause mortality, major bleeding, and intracranial hemorrhage: a meta-analysis. JAMA. 2014;311(23):2414-21. PMID 24938564; doi:10.1001/jama.2014.5990. (validated: PubMed)
- [Kucher2006ICOPER] Kucher N, Rossi E, De Rosa M, Goldhaber SZ. Massive pulmonary embolism. Circulation. 2006;113(4):577-82. PMID 16432055; doi:10.1161/CIRCULATIONAHA.105.592592. (validated: PubMed)
- [Roberts2015TPTX] Roberts DJ, Leigh-Smith S, Faris PD, Blackmore C, Ball CG, Robertson HL, et al. Clinical Presentation of Patients With Tension Pneumothorax: A Systematic Review. Ann Surg. 2015;261(6):1068-78. PMID 25563887; doi:10.1097/SLA.0000000000001073. (validated: PubMed)
- [Adler2015ESC] Adler Y, Charron P, Imazio M, Badano L, Barón-Esquivias G, Bogaert J, et al. 2015 ESC Guidelines for the diagnosis and management of pericardial diseases: The Task Force for the Diagnosis and Management of Pericardial Diseases of the European Society of Cardiology (ESC)Endorsed by: The European Association for Cardio-Thoracic Surgery (EACTS). Eur Heart J. 2015;36(42):2921-2964. PMID 26320112; PMCID PMC7539677; doi:10.1093/eurheartj/ehv318. Tamponade definition and pulsus paradoxus read from the PMC article page; recommendation table was an image. (validated: PubMed)
- [Alerhand2022] Alerhand S, Adrian RJ, Long B, Avila J. Pericardial tamponade: A comprehensive emergency medicine and echocardiography review. Am J Emerg Med. 2022;58:159-174. PMID 35696801; doi:10.1016/j.ajem.2022.05.001. (validated: PubMed)
- [Allgower1967] Allgöwer M, Burri C. ["Shock index"]. Dtsch Med Wochenschr. 1967;92(43):1947-50. PMID 5299769; doi:10.1055/s-0028-1106070. No abstract; origin date confirmed by Koch 2019 reference 1. (validated: PubMed)
- [Rady1994] Rady MY, Smithline HA, Blake H, Nowak R, Rivers E. A comparison of the shock index and conventional vital signs to identify acute, critical illness in the emergency department. Ann Emerg Med. 1994;24(4):685-90. PMID 8092595; doi:10.1016/s0196-0644(94)70279-9. (validated: PubMed)
- [Berger2013SI] Berger T, Green J, Horeczko T, Hagar Y, Garg N, Suarez A, et al. Shock index and early recognition of sepsis in the emergency department: pilot study. West J Emerg Med. 2013;14(2):168-74. PMID 23599863; PMCID PMC3628475; doi:10.5811/westjem.2012.8.11546. (validated: PubMed)
- [Koch2019SI] Koch E, Lovett S, Nghiem T, Riggs RA, Rech MA. Shock index in the emergency department: utility and limitations. Open Access Emerg Med. 2019;11:179-199. PMID 31616192; PMCID PMC6698590; doi:10.2147/OAEM.S178358. Normal range and summary tables read in Europe PMC full text. (validated: PubMed)
- [AlJalbout2019] Al Jalbout N, Balhara KS, Hamade B, Hsieh YH, Kelen GD, Bayram JD. Shock index as a predictor of hospital admission and inpatient mortality in a US national database of emergency departments. Emerg Med J. 2019;36(5):293-297. PMID 30910912; doi:10.1136/emermed-2018-208002. (validated: PubMed)
- [Perera2010RUSH] Perera P, Mailhot T, Riley D, Mandavia D. The RUSH exam: Rapid Ultrasound in SHock in the evaluation of the critically lll. Emerg Med Clin North Am. 2010;28(1):29-56, vii. PMID 19945597; doi:10.1016/j.emc.2009.09.010. (validated: PubMed)
- [Sampson2006] Sampson HA, Muñoz-Furlong A, Campbell RL, Adkinson NF Jr, Bock SA, Branum A, et al. Second symposium on the definition and management of anaphylaxis: summary report--Second National Institute of Allergy and Infectious Disease/Food Allergy and Anaphylaxis Network symposium. J Allergy Clin Immunol. 2006;117(2):391-7. PMID 16461139; doi:10.1016/j.jaci.2005.12.1303. (validated: PubMed)
- [Cardona2020WAO] Cardona V, Ansotegui IJ, Ebisawa M, El-Gamal Y, Fernandez Rivas M, Fineman S, et al. World allergy organization anaphylaxis guidance 2020. World Allergy Organ J. 2020;13(10):100472. PMID 33204386; PMCID PMC7607509; doi:10.1016/j.waojou.2020.100472. Criteria and Table 6 doses read in Europe PMC full text. (validated: PubMed)
- [Dodd2021RCUK] Dodd A, Hughes A, Sargant N, Whyte AF, Soar J, Turner PJ. Evidence update for the treatment of anaphylaxis. Resuscitation. 2021;163:86-96. PMID 33895231; PMCID PMC8139870; doi:10.1016/j.resuscitation.2021.04.010. Doses, observation table and biphasic data read in Europe PMC full text. (validated: PubMed)
- [Shaker2020] Shaker MS, Wallace DV, Golden DBK, Oppenheimer J, Bernstein JA, Campbell RL, et al. Anaphylaxis-a 2020 practice parameter update, systematic review, and Grading of Recommendations, Assessment, Development and Evaluation (GRADE) analysis. J Allergy Clin Immunol. 2020;145(4):1082-1123. PMID 32001253; doi:10.1016/j.jaci.2020.01.017. (validated: PubMed)
- [Lee2015Biphasic] Lee S, Bellolio MF, Hess EP, Erwin P, Murad MH, Campbell RL. Time of Onset and Predictors of Biphasic Anaphylactic Reactions: A Systematic Review and Meta-analysis. J Allergy Clin Immunol Pract. 2015;3(3):408-16.e1-2. PMID 25680923; doi:10.1016/j.jaip.2014.12.010. (validated: PubMed)
- [Pumphrey2000] Pumphrey RS. Lessons for management of anaphylaxis from a study of fatal reactions. Clin Exp Allergy. 2000;30(8):1144-50. PMID 10931122; doi:10.1046/j.1365-2222.2000.00864.x. (validated: PubMed)
- [Turner2015Anaph] Turner PJ, Gowland MH, Sharma V, Ierodiakonou D, Harper N, Garcez T, et al. Increase in anaphylaxis-related hospitalizations but no increase in fatalities: an analysis of United Kingdom national anaphylaxis data, 1992-2012. J Allergy Clin Immunol. 2015;135(4):956-963.e1. PMID 25468198; PMCID PMC4382330; doi:10.1016/j.jaci.2014.10.021. (validated: PubMed)
- [Babiker2021] Babiker A, Li X, Lai YL, Strich JR, Warner S, Sarzynski S, et al. Effectiveness of adjunctive clindamycin in β-lactam antibiotic-treated patients with invasive β-haemolytic streptococcal infections in US hospitals: a retrospective multicentre cohort study. Lancet Infect Dis. 2021;21(5):697-710. PMID 33333013; PMCID PMC8084921; doi:10.1016/S1473-3099(20)30523-5. (validated: PubMed)
- [Babiker2025] Babiker A, Warner S, Li X, Chishti EA, Saad E, Swihart BJ, et al. Adjunctive linezolid versus clindamycin for toxin inhibition in β-lactam-treated patients with invasive group A streptococcal infections in 195 US hospitals from 2016 to 2021: a retrospective cohort study with target trial emulation. Lancet Infect Dis. 2025;25(3):265-275. PMID 39396526; PMCID PMC11871996; doi:10.1016/S1473-3099(24)00507-3. (validated: PubMed)
- [Parks2018IVIG] Parks T, Wilson C, Curtis N, Norrby-Teglund A, Sriskandan S. Polyspecific Intravenous Immunoglobulin in Clindamycin-treated Patients With Streptococcal Toxic Shock Syndrome: A Systematic Review and Meta-analysis. Clin Infect Dis. 2018;67(9):1434-1436. PMID 29788397; PMCID PMC6186853; doi:10.1093/cid/ciy401. (validated: PubMed)
- [Lappin2009] Lappin E, Ferguson AJ. Gram-positive toxic shock syndromes. Lancet Infect Dis. 2009;9(5):281-90. PMID 19393958; doi:10.1016/S1473-3099(09)70066-0. (validated: PubMed)
- [Wong2004LRINEC] Wong CH, Khin LW, Heng KS, Tan KC, Low CO. The LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) score: a tool for distinguishing necrotizing fasciitis from other soft tissue infections. Crit Care Med. 2004;32(7):1535-41. PMID 15241098; doi:10.1097/01.ccm.0000129486.35458.7d. (validated: PubMed)
- [Fernando2019NSTI] Fernando SM, Tran A, Cheng W, Rochwerg B, Kyeremanteng K, Seely AJE, et al. Necrotizing Soft Tissue Infection: Diagnostic Accuracy of Physical Examination, Imaging, and LRINEC Score: A Systematic Review and Meta-Analysis. Ann Surg. 2019;269(1):58-65. PMID 29672405; doi:10.1097/SLA.0000000000002774. (validated: PubMed)
- [Parker1984] Parker MM, Shelhamer JH, Bacharach SL, Green MV, Natanson C, Frederick TM, et al. Profound but reversible myocardial depression in patients with septic shock. Ann Intern Med. 1984;100(4):483-90. PMID 6703540; doi:10.7326/0003-4819-100-4-483. (validated: PubMed)
- [Hollenberg2021] Hollenberg SM, Singer M. Pathophysiology of sepsis-induced cardiomyopathy. Nat Rev Cardiol. 2021;18(6):424-434. PMID 33473203; doi:10.1038/s41569-020-00492-2. (validated: PubMed)
- [VieillardBaron2008] Vieillard-Baron A, Caille V, Charron C, Belliard G, Page B, Jardin F. Actual incidence of global left ventricular hypokinesia in adult septic shock. Crit Care Med. 2008;36(6):1701-6. PMID 18496368; doi:10.1097/CCM.0b013e318174db05. (validated: PubMed)
- [Beesley2018] Beesley SJ, Weber G, Sarge T, Nikravan S, Grissom CK, Lanspa MJ, et al. Septic Cardiomyopathy. Crit Care Med. 2018;46(4):625-634. PMID 29227368; doi:10.1097/CCM.0000000000002851. (validated: PubMed)
- [Hahner2015] Hahner S, Spinnler C, Fassnacht M, Burger-Stritt S, Lang K, Milovanovic D, et al. High incidence of adrenal crisis in educated patients with chronic adrenal insufficiency: a prospective study. J Clin Endocrinol Metab. 2015;100(2):407-16. PMID 25419882; doi:10.1210/jc.2014-3191. (validated: PubMed)
- [Ruiz2018] Ruiz IA, Squair JW, Phillips AA, Lukac CD, Huang D, Oxciano P, et al. Incidence and Natural Progression of Neurogenic Shock after Traumatic Spinal Cord Injury. J Neurotrauma. 2018;35(3):461-466. PMID 29141498; doi:10.1089/neu.2016.4947. (validated: PubMed)
- [Guly2008] Guly HR, Bouamra O, Lecky FE. The incidence of neurogenic shock in patients with isolated spinal cord injury in the emergency department. Resuscitation. 2008;76(1):57-62. PMID 17688997; doi:10.1016/j.resuscitation.2007.06.008. (validated: PubMed)
- [Cecconi2014ESICM] Cecconi M, De Backer D, Antonelli M, Beale R, Bakker J, Hofer C, et al. Consensus on circulatory shock and hemodynamic monitoring. Task force of the European Society of Intensive Care Medicine. Intensive Care Med. 2014;40(12):1795-815. PMID 25392034; PMCID PMC4239778; doi:10.1007/s00134-014-3525-z. Statements and SOAP II split read in Europe PMC full text. (validated: PubMed)
- [Vincent2008CO] Vincent JL. Understanding cardiac output. Crit Care. 2008;12(4):174. PMID 18771592; PMCID PMC2575587; doi:10.1186/cc6975. Read in Europe PMC full text. (validated: PubMed)
- [Papaioannou2016] Papaioannou TG, Protogerou AD, Vrachatis D, Konstantonis G, Aissopou E, Argyris A, et al. Mean arterial pressure values calculated using seven different methods and their associations with target organ deterioration in a single-center study of 1878 individuals. Hypertens Res. 2016;39(9):640-7. PMID 27194570; doi:10.1038/hr.2016.41. (validated: PubMed)
- [Singer2016Sepsis3] Singer M, Deutschman CS, Seymour CW, Shankar-Hari M, Annane D, Bauer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-10. PMID 26903338; PMCID PMC4968574; doi:10.1001/jama.2016.0287. Wording read in Europe PMC full text. (validated: PubMed)
- [ShankarHari2016Shock] Shankar-Hari M, Phillips GS, Levy ML, Seymour CW, Liu VX, Deutschman CS, et al. Developing a New Definition and Assessing New Clinical Criteria for Septic Shock: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):775-87. PMID 26903336; PMCID PMC4910392; doi:10.1001/jama.2016.0289. (validated: PubMed)
- [Rivers2001EGDT] Rivers E, Nguyen B, Havstad S, Ressler J, Muzzin A, Knoblich B, et al. Early goal-directed therapy in the treatment of severe sepsis and septic shock. N Engl J Med. 2001;345(19):1368-77. PMID 11794169; doi:10.1056/NEJMoa010307. (validated: PubMed)
- [FDA-EpiPen] EpiPen and EpiPen Jr (epinephrine injection) auto-injector. US prescribing information (repackager label: Asclemed USA, Inc.), label effective 2023-08-29; openFDA set ID 311af6d9-20c0-4b87-b236-4185bfa49988. (validated: openFDA)

## Provenance
- Every PubMed source was checked with E-utilities esummary (authors, title, journal, year, volume, pages, PMID, PMCID, DOI copied from the record), and every number was read from the efetch abstract or, where noted on the source line, from the full text. The EpiPen label was checked in openFDA (drug/label endpoint, effective date 2023-08-29). Source lines for Baran2019SCAI, Thiele2012IABP, Thiele2017CULPRIT, Thiele2023ECLS, Moller2024DanGer, Hochman1999SHOCK, vanDiepen2017 and Samsky2021 reuse the key and text already in the myocardial-infarction companion's sources.json. Cecconi2014ESICM and DeBacker2010SOAPII match the keys used by pass F.
- Not accessible (paywalled, no abstract): Vincent & De Backer 2013 NEJM; Cannon 2018 NEJM; Spodick 2003 NEJM; Rushworth 2019 NEJM; Stevens 2017 NEJM; Naidu 2022 SCAI update; the Working Group on Severe Streptococcal Infections 1993 JAMA definition; the IDSA 2014 SSTI guideline full text. None of these is cited.
- NCBI Bookshelf (StatPearls) pages returned a CAPTCHA, so I give no cited normal ranges for cardiac output, SVR or DO2. CDC case definitions for staphylococcal and streptococcal TSS were not used, because the CDC site is not one of the allowed validation services and the consensus paper had no readable text.
- Marked (unverified): the numeric ATLS class thresholds (not given).
- The ESC 2019 PE and ESC 2015 pericardial recommendation classes were printed as images and are not quoted. Narrative statements were read on the publisher or PMC pages via a web fetch, with the text summarised by a fetch tool. These quotations should be spot-checked against the PDFs before use as exact quotes.
- Weil1971 and Allgower1967 have no abstracts. They are cited only for their titles and dates.
