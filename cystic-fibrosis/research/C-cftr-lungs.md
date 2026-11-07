# C · CFTR physiology & lung disease

Pass date: 2026-11-04. Modules served: cftr, lungs.

This pass covers how the CFTR protein is built and gated, what it conducts (chloride and bicarbonate), the sodium channel (ENaC) debate, airway surface liquid and mucociliary clearance, the bicarbonate/pH and mucus hypotheses, why sweat is salty, and the lung disease that follows: mucus obstruction, the infection–inflammation cycle, early bronchiectasis, FEV1 decline before modulators, microbiology by age, pulmonary exacerbations, haemoptysis, pneumothorax, sinus disease, and what has changed in the airways since elexacaftor–tezacaftor–ivacaftor (ETI). Gene and variant classes (pass B), diagnosis and sweat-test bands (E), modulator trials and eligibility (F), and treatment of infection, airway clearance and transplant (G) are left to those passes. Trial results appear here only where they show a lung mechanism.

Access notes:
- Every source was found through Europe PMC or PubMed search and confirmed with PubMed esummary (authors, title, journal, year, volume, pages, PMID, PMCID, DOI). Abstracts were read through PubMed efetch or Europe PMC (resultType=core).
- Numbers are taken only from abstracts. Where a well-known figure appears only in the full text (for example the 1,480-amino-acid length of CFTR, or the list of 12 Fuchs signs and symptoms), I either left it out or cited a later abstract that states it.
- The US CF Foundation Patient Registry report (shared key CFF2023Registry) could not be fetched (cff.org returned HTTP 403), so I do not cite it. Registry-based microbiology trends come from peer-reviewed registry analyses instead (Razvi 2009, Salsgiver 2016, Adjemian 2014, Bower 2023).
- The brief lists "Stoltz 2015 Sci Transl Med". The 2015 Stoltz/Meyerholz/Welsh paper is actually a review in N Engl J Med ("Origins of cystic fibrosis lung disease", PMID 25607428), and it has no abstract in PubMed, so I do not cite it. The same pig-model findings are cited from the primary papers (Stoltz 2010 Sci Transl Med; Pezzulo 2012 Nature; Hoegger 2014 Science; Chen 2010 Cell).
- Marcos 2010 (Nat Med, neutrophil extracellular traps in CF) was retracted in 2011 and is not used.

## Findings

### cftr · Structure: an ABC transporter that became a channel
- When the gene was cloned in 1989, its transcript was about 6,500 nucleotides long and was found in the tissues affected in CF. The predicted protein has two similar halves, each made of a membrane-spanning domain and an ATP-binding domain [[Riordan1989]].
- The commonest CF variant, a three-base-pair deletion that removes phenylalanine 508, lies at the centre of the first nucleotide-binding domain (NBD1). In 1989 it accounted for about 70% of CF mutations in the population studied [[Riordan1989,Kerem1989]].
- CFTR has five domains: two membrane-spanning domains that form the pore, two nucleotide-binding domains (NBD1, NBD2) whose ATP binding and hydrolysis control gating, and a regulatory (R) domain whose phosphorylation decides whether the channel can open [[Sheppard1999,Csanady2019]].
- CFTR belongs to the ATP-binding cassette (ABC) transporter superfamily but works as an anion channel. Channel activation needs PKA (cAMP-dependent protein kinase) to phosphorylate the R domain. Once that has happened, ATP binding and hydrolysis at the NBDs drive the pore to open and close (gating) [[Csanady2019]].
- Cryo-EM of zebrafish CFTR without ATP (3.7 Å) showed a large anion pathway lined with positively charged residues and a single gate near the outer surface. The dephosphorylated R domain sits between the two NBDs and stops them from dimerising (Established) [[Zhang2016Cell]].
- Human and zebrafish CFTR share 55% sequence identity, and 42 of 46 CF-causing missense sites are identical, so the zebrafish structure is a fair stand-in [[Zhang2016Cell]].
- The first human CFTR structure (dephosphorylated, no nucleotide, 3.9 Å; Liu, Zhang, Csanády, Gadsby, Chen 2017) shows an R-domain helix docked inside the intracellular vestibule, which blocks opening. It also shows a helix-loop transition in transmembrane helix 8, a feature that sets CFTR apart from other ABC transporters and probably underlies its channel function [[Liu2017Cell]].
- In the phosphorylated, ATP-bound zebrafish structure (3.4 Å), the phosphorylated R domain has moved out of its inhibitory position and the NBDs form a "head-to-tail" dimer around ATP. The extracellular mouth of the pore still looked closed, so local movements of the transmembrane helices can still gate ion access [[Zhang2017Cell]].
- The phosphorylated, ATP-bound human CFTR structure (3.2 Å) located the R domain after phosphorylation. It also explained why the G178R, R352Q, L927P and G970R/D variants would block the conformational changes needed for gating [[Zhang2018PNAS]].
- Single-channel recordings showed that two residues on opposite sides of the NBD1–NBD2 interface become energetically coupled only when the channel opens. This directly links ATP-driven tight NBD dimerisation to pore opening (Established) [[Vergani2005]].
- PKA phosphorylates serines 660, 737, 795 and 813 in the R domain. Mutating any one site leaves the cAMP response intact, but mutating all four abolishes it, so the sites are redundant ("degenerate") [[Cheng1991]].

### cftr · What CFTR conducts: chloride and bicarbonate
- Expressing CFTR produces cAMP-regulated chloride channels with anion selectivity bromide > chloride > iodide > fluoride. Changing lysine 95 or 335 to an acidic residue changed the selectivity sequence, which proved that CFTR is itself the chloride channel and not only a regulator of one [[Anderson1991]].
- Wild-type CFTR has a single-channel conductance of 10.4 ± 0.5 pS in symmetrical 150 mM chloride. Its Cl⁻/HCO₃⁻ permeability ratio is 3.8 ± 1.0, so it carries bicarbonate about one-quarter as well as chloride. ΔF508-CFTR showed no such bicarbonate-dependent pH recovery [[Poulsen1994]].
- CFTR variants linked to CF with pancreatic insufficiency did not support Cl⁻-coupled HCO₃⁻ transport, and variants linked to pancreatic sufficiency showed reduced transport, even where chloride channel activity was largely kept [[Choi2001Nature]].
- Reviews now describe CFTR as a cAMP-dependent anion channel for both Cl⁻ and HCO₃⁻, whose loss impairs mucus hydration and clearance [[Mall2020,Shteinberg2021]].

### cftr · Where CFTR is made in the airway
- In the human bronchus, CFTR is expressed mainly in the submucosal glands (especially the serous cells of the secretory tubules), with a subpopulation of duct cells. ΔF508 homozygotes had no detectable CFTR protein in these cells [[Engelhardt1992]].
- Single-cell RNA sequencing found a rare cell type, the FOXI1-positive pulmonary ionocyte, which is the main source of CFTR transcripts in mouse and human airway epithelium. Knocking out Foxi1 in mice removed Cftr expression and disturbed airway fluid and mucus physiology (Early evidence for the human airway role) [[Montoro2018,Plasschaert2018]].
- Pulmonary ionocytes co-express FOXI1, several V-ATPase subunits and CFTR. Notch signalling is needed to make them and FOXI1 is enough to drive them, and they account for a major share of CFTR activity in the conducting airway [[Plasschaert2018]].

### cftr · Salty sweat: the sweat duct defect
- Microperfusion of isolated sweat ducts (Quinton 1983) showed abnormally low chloride permeability in CF. As a result, NaCl is poorly reabsorbed as primary sweat passes along the duct, and the final sweat stays salty (Established) [[Quinton1983]].
- In freshly isolated normal sweat ducts, ENaC activity depends on CFTR activity and rises with it. In CF ducts, the sodium conductance could not be activated, so salt reabsorption fails through both poor chloride and poor sodium conductance [[Reddy1999]].
- In the sweat duct, losing CFTR lowers sodium absorption. This is the opposite of what was long assumed for CF airways, where sodium absorption was said to be raised. The contrast is at the centre of the ENaC debate below [[Reddy1999]].
- Sweat-gland dysfunction can cause "heat shock" (salt depletion) in people with CF [[Elborn2016]].

### cftr · The ENaC debate: is airway sodium absorption raised?
- Nasal epithelia from people with CF absorbed Na⁺ at a raised basal rate in Ussing chambers. β-agonists increased Na⁺ absorption further instead of causing Cl⁻ secretion, which led to the "sodium hyperabsorption" model [[Boucher1986]].
- Co-expressing CFTR with ENaC turned cAMP-stimulated sodium currents into cAMP-inhibited ones, which suggested that CFTR normally restrains ENaC and that the restraint is lost in CF [[Stutts1995]].
- Mice that over-express ENaC in the airway (βENaC mice) developed airway surface liquid depletion, concentrated mucus, slow mucus transport, mucus plugging, goblet-cell metaplasia, neutrophilic inflammation and poor bacterial clearance. Raised Na⁺ absorption alone is therefore enough to cause CF-like lung disease in mice (Established in the model) [[Mall2004]].
- In newborn CFTR⁻/⁻ pigs, Cl⁻ and HCO₃⁻ transport were markedly reduced, but Na⁺ and liquid absorption were not increased and periciliary liquid depth was not reduced. The raised amiloride-sensitive voltage reflected the missing chloride conductance, not extra sodium transport [[Chen2010Cell]].
- In differentiated primary human CF tracheal/bronchial cultures, amiloride reduced conductance and Na⁺ absorption by similar amounts in CF and non-CF epithelia, meaning sodium conductance was not increased. The bigger amiloride effect on voltage in CF was put down to the lost chloride conductance [[Itani2011]].
- Status: the two models (volume depletion through sodium hyperabsorption, and primary loss of anion secretion) are both still cited. They are set out under "Open questions" [[Mall2004,Chen2010Cell,Itani2011]].

### cftr · Airway surface liquid, the periciliary layer and mucociliary clearance
- Airway surface liquid (ASL) has a mucus layer on top of a periciliary liquid layer (PCL). In human tracheobronchial cultures, active ion transport kept PCL height at about 7 µm, and the mucus layer acted as a reservoir that gave or took liquid to hold the PCL at the best height for mucus transport [[Tarran2001JGP]].
- Normal superficial airway epithelium keeps a periciliary layer of 7 µm or more, which cilia need to beat and move mucus. It does this by "blending" Cl⁻ secretion with Na⁺ absorption, controlled by soluble signals in the ASL (ATP, adenosine, channel-activating proteases) rather than by the cilia themselves [[Tarran2006JGP]].
- In CF cultures, adenosine stimulated absorption instead of secretion, the opposite of normal epithelia [[Tarran2006JGP]].
- Matsui 1998 (Cell) found no evidence that ASL is hypotonic or that its salt concentration differs between CF and normal cultures. CF epithelia instead absorbed ASL abnormally fast, which depleted the PCL and stopped mucus transport. The paper supports the "isotonic volume / mucus clearance" hypothesis over the "low-salt / defensin" hypothesis (Established) [[Matsui1998]].
- Phasic motion that mimics breathing increased ATP release into the PCL, rebalanced CF ion transport and restored PCL volume in culture. Respiratory syncytial virus infection abolished this motion-dependent rescue in CF cultures, which is one proposed reason viral infections tip CF airways into bacterial infection (Early evidence) [[Tarran2005JBC]].
- The "gel-on-brush" model holds that the periciliary layer is a brush of tethered membrane mucins and mucopolysaccharides that keeps mucus out of the cilia. When the mucus layer becomes more concentrated (its osmotic modulus exceeds the brush's), it compresses the brush and clearance fails [[Button2012]].
- When measured by physical methods rather than antibodies, mucins in CF sputum were hyperconcentrated, and the osmotic pressure of CF sputum and of mucus retained in explanted CF lungs was substantially higher than normal. That pressure predicts compression of the periciliary layer and mucus stasis [[Henderson2014]].
- Antibody-based assays underestimate mucin in CF sputum because proteases in the sputum cleave mucins at the antibody binding sites [[Henderson2014]].
- In newborn CF piglets, mucociliary transport failed after cholinergic stimulation. The cause was not PCL depletion: mucus strands secreted by submucosal glands stayed tethered to the gland ducts. Blocking anion secretion in non-CF airways reproduced this, so impaired transport is a primary defect present from birth (Early evidence) [[Hoegger2014]].
- Inhaled 7% hypertonic saline (5 mL four times daily) in 24 people with CF sped up 1-hour mucus clearance compared with amiloride pretreatment (14.0 ± 2.0% vs 7.0 ± 1.5%) and improved FEV1 by a mean 6.62% (95% CI 1.6–11.7) over baseline. This fits the theory that rehydrating the ASL restores clearance [[Donaldson2006]].
- After starting ivacaftor, people with G551D-CFTR showed marked acceleration of whole-lung, central and peripheral mucociliary clearance at 1 month, sustained at 3 months. The gain correlated with FEV1 change but not with sweat chloride change [[Donaldson2018]].

### cftr · Bicarbonate, pH and mucus: the "mucin unfolding" hypothesis
- The hypothesis: condensed mucins must shed Ca²⁺ and H⁺ to expand as much as 1,000-fold after release from granules, and HCO₃⁻ binds these cations. When CFTR-dependent HCO₃⁻ secretion fails, mucins stay aggregated, poorly solubilised and hard to transport (Hypothesis) [[Quinton2008]].
- In mouse small intestine, removing HCO₃⁻ roughly halved stimulated mucus release. CF mice released almost no mucus on stimulation whether HCO₃⁻ was present or not (Early evidence) [[Garcia2009]].
- Ileal mucus of CF mice was denser, stuck to the epithelium and was less penetrable. Secretion into about 100 mM sodium bicarbonate normalised it, and adding bicarbonate to mucus already formed almost fully restored its properties (Early evidence) [[Gustafsson2012]].
- In newborn CF pigs, ASL pH was more acidic and ASL killed bacteria less well. Lowering pH reduced killing in wild-type pigs, and raising pH rescued killing in CF pigs. This links loss of CFTR-mediated HCO₃⁻ secretion to the first host-defence defect (Early evidence in pigs) [[Pezzulo2012]].
- In humans and pigs without CFTR, unchecked proton secretion by the non-gastric H⁺/K⁺-ATPase ATP12A acidifies ASL. Mouse airways express little ATP12A, which helps explain why CF mice are spared lung disease. Blocking ATP12A reversed host-defence defects in human and pig airways (Early evidence) [[Shah2016]].
- CF ASL from newborn piglets and cultures was more viscous, and reduced pH was necessary and sufficient for the difference. Hypertonic saline or heparin largely reversed the viscosity, which points to electrostatic interactions between mucins [[Tang2016]].
- Counter-evidence: fibre-optic luminescent probes measured ASL pH in living children with CF and without CF and found it similar. Highly controlled cultures suggested that paracellular acid/base shunting balances the ion-transport defect. On that view, low baseline ASL pH is unlikely to drive early human CF lung disease [[Schultz2017]].

### cftr · Lessons from the CF pig
- CFTR-null newborn pigs showed defective chloride transport, meconium ileus, exocrine pancreatic destruction and focal biliary cirrhosis, as newborn humans with CF do. CF mice do not develop the human pattern [[Rogers2008]].
- Within months of birth, CF pigs spontaneously developed airway inflammation, remodelling, mucus accumulation and infection with multiple bacterial species [[Stoltz2010]].
- At birth, CF pig lungs showed no inflammation but were less often sterile, and they cleared instilled bacteria less well than wild-type lungs. Impaired bacterial elimination therefore seems to come first and to start the cascade of inflammation and damage (Early evidence) [[Stoltz2010]].

### lungs · From mucus to infection to inflammation
- Lung disease causes most of the illness and deaths in CF, through bronchiectasis, small-airway obstruction and progressive respiratory impairment [[Elborn2016,Ratjen2015]].
- Failure of CFTR causes mucus retention and chronic infection, which then drive airway inflammation that harms the lungs [[Elborn2016]].
- In 46 preschool children with CF in AREST CF, total airway mucins and mucus "flakes" containing MUC5B and MUC5AC were higher than in 16 disease controls, whether or not infection was present. Children with no structural lung disease on CT already had raised mucus flakes and neutrophils with little or no infection. Mucus burden appears to come before infection and structural damage (Early evidence) [[Esther2019]].
- CF mucus flakes did not dissolve with N-acetylcysteine or deoxyribonuclease, but did dissolve with an experimental reducing agent (P2062) [[Esther2019]].
- Airway inflammation (neutrophils, free neutrophil elastase, IL-8) was already raised in infants with CF diagnosed by newborn screening, some as young as 4 weeks, including those whose cultures were negative for bacteria, viruses and fungi [[Khan1995]].
- In people with established CF lung disease, Pseudomonas aeruginosa lived inside hypoxic mucopurulent masses in the airway lumen. Thickened mucus on CF epithelium developed steep oxygen gradients even before infection, and P. aeruginosa responded by making more alginate [[Worlitzsch2002]].
- Quorum-sensing signal profiles in CF sputum matched those of P. aeruginosa grown as biofilms rather than in broth, which supports biofilm growth in the CF lung and helps explain why infection persists despite antibiotics (Established) [[Singh2000]].
- Free DNA from dying neutrophils makes purulent CF sputum viscous. Catalytic amounts of recombinant human DNase I turned it from a non-flowing gel into a flowing liquid within minutes by breaking up the DNA [[Shak1990]].

### lungs · Neutrophil elastase as a marker and driver
- Across 269 people with CF aged 9–54 years, sputum free neutrophil elastase was negatively correlated with FEV1 (r = −0.35; 95% CI −0.46 to −0.22). A 0.5-log difference in elastase went with a −7.3% FEV1 difference, and each 1-log rise was linked to a further −2.9% FEV1 decline (95% CI −5.0 to −0.9) over time [[MayerHamblett2007]].
- In 35 children followed with annual sputum induction for 3 years, a higher baseline neutrophil elastase predicted faster lung function decline. Elastase was the most informative single biomarker, and its predictive value was confirmed in a validation cohort [[Sagel2012]].
- In AREST CF, free neutrophil elastase activity in BAL fluid was a risk factor for bronchiectasis (OR 3.02; 95% CI 1.70–5.35). Elastase detected at 3 months was linked to persistent bronchiectasis, with odds about 7 times higher at 12 months and 4 times higher at 3 years [[Sly2013]].

### lungs · Bronchiectasis begins in infancy (AREST CF)
- In 127 infants diagnosed by newborn screening and followed with CT and BAL at 3 months and 1, 2 and 3 years, bronchiectasis point prevalence rose from 29.3% at 3 months to 61.5% at 3 years. It was detectable in infants as young as 10 weeks [[Sly2013]].
- Independent risk factors for bronchiectasis were meconium ileus at presentation (OR 3.17; 95% CI 1.51–6.66), respiratory symptoms at the time of testing (OR 2.27; 1.24–4.14), free neutrophil elastase in BAL fluid (OR 3.02; 1.70–5.35) and gas trapping on expiratory CT (OR 2.05; 1.17–3.59) [[Sly2013]].
- In an earlier AREST CF cohort (n = 96), bronchiectasis prevalence was 22% and rose with age. It was associated with neutrophil count, neutrophil elastase concentration and P. aeruginosa infection [[Stick2009]].
- Across 143 children aged 0.2–6.5 years (444 annual CTs), bronchiectasis persisted once detected in 74% of paired scans and grew in extent in 63%. Air trapping persisted in 81%. Progression was linked to severe CFTR genotype, worsening neutrophilic inflammation and infection [[Mott2012]].
- Children with CF (n = 56) had an 8.3% lower FEV0.75 than healthy children. Detecting pro-inflammatory pathogens in BAL in the first 2 years (P. aeruginosa, S. aureus, H. influenzae, Aspergillus, S. pneumoniae) was linked to FEV0.75 reductions of 11.3% to 15.6% at early school age [[Ramsey2014AREST]].
- In the Wisconsin newborn screening cohort, 83% of children aged 6.6–17.6 years (68 of 82) had bronchiectasis on thin-section CT. Of 12 risk factors tested, only mucoid P. aeruginosa infection correlated with its severity [[Farrell2009Radiology]].

### lungs · FEV1 decline in the pre-modulator era
- In the Epidemiologic Study of CF, mean FEV1 % predicted fell by 1.12 points a year at ages 6–8 (baseline 88.4%; n = 1,811), 2.39 points a year at ages 9–12 (baseline 85.3%; n = 1,696) and 2.34 points a year at ages 13–17 (baseline 78.4%; n = 1,359) [[Konstan2007]].
- A high baseline FEV1 and persistent crackles were independent risk factors for faster decline in every age group. Female sex, P. aeruginosa, low weight-for-age, sinusitis, IV-treated exacerbations and pancreatic insufficiency mattered in some age groups [[Konstan2007]].
- In 318 young adults (ages 18–22) at one London clinic, annual FEV1 decline shrank across five successive birth cohorts: −2.49%, −1.99%, −2.20%, −1.65% and −0.65% of predicted, from earliest to latest. The overall mean slope was −1.53% a year [[Que2006]].
- In the same cohort, people with Pseudomonas declined faster (−1.6% vs −1.1% a year) [[Que2006]].
- A systematic review of 39 studies found variable linear rates of decline and a non-linear, time-varying pooled trajectory. P. aeruginosa was most often linked to a lower baseline and pancreatic insufficiency to faster decline [[Harun2016]].
- In the Danish CF register (70,448 FEV1 measures in 479 people, 1969–2010), short-term FEV1 variability had an SD of 6.3%. A baseline %FEV1 explained 63% of the variability at 1 year, 40% at 3 years and about 30% at 5 years [[TaylorRobinson2012]].
- In a Toronto cohort of 673 people (1977–1989), an FEV1 below 30% predicted, PaO₂ below 55 mm Hg or PaCO₂ above 50 mm Hg each went with 2-year mortality above 50%. Each 10% fall in FEV1 % predicted doubled the risk of death within 2 years (RR 2.0; 95% CI 1.9–2.2). These are historical population figures, not predictions for any person [[Kerem1992]].
- A US registry 5-year survival model (n = 11,630 in 1993) included age, FEV1 % predicted, sex, weight-for-age z score, pancreatic sufficiency, diabetes, S. aureus, B. cepacia and the annual number of acute pulmonary exacerbations [[Liou2001]].

### lungs · Microbiology across the lifespan
- In the CF lung, community diversity and lung function were highest in people under 10 years and lower in older age groups, plateauing at about age 25. Classic CF pathogens (Pseudomonas, Burkholderia, Stenotrophomonas, Achromobacter) were less common than the core genera (Streptococcus, Prevotella, Rothia, Veillonella, Actinomyces) but tended to dominate when present [[Coburn2015]].
- In BAL samples, non-traditional taxa (Streptococcus, Prevotella, Veillonella) made up about 50% of the microbiota in children with CF under 2 years. Traditional CF taxa (Pseudomonas, Staphylococcus, Stenotrophomonas) dominated from age 6 years [[Zemanick2017]].
- In the US registry, P. aeruginosa prevalence fell from 60.4% in 1995 to 56.1% in 2005. The fall was largest at ages 6–10 (48.2% to 36.1%) and 11–17 (68.9% to 55.5%) [[Razvi2009]].
- Methicillin-susceptible S. aureus prevalence rose from 37.0% to 52.4% (1995–2005) and was highest at ages 6–17. MRSA rose from 0.1% to 17.2% and was highest in adolescents aged 11–17 from 2002 to 2005 [[Razvi2009]].
- From 1995 to 2005, H. influenzae, Stenotrophomonas maltophilia and Achromobacter (Alcaligenes) xylosoxidans became more prevalent, while B. cepacia complex declined [[Razvi2009]].
- In 2012, MSSA and P. aeruginosa were the most prevalent and incident CF pathogens, followed by MRSA. Achromobacter xylosoxidans and B. cepacia complex had relatively low prevalence. From 2006 to 2012, P. aeruginosa and B. cepacia complex declined significantly while MRSA rose, and NTM prevalence rose from 2010 to 2012 [[Salsgiver2016]].
- The range of organisms infecting CF airways is widening and infection rates are changing, which makes trends hard to interpret [[LiPuma2010,Gibson2003]].

### lungs · Pseudomonas aeruginosa
- In 56 Wisconsin children diagnosed by newborn screening, 29% acquired non-mucoid P. aeruginosa in the first 6 months of life. Non-mucoid and mucoid forms were first acquired at median ages of 1.0 and 13.0 years, with a median 10.9-year transition from non-mucoid to mucoid [[Li2005]].
- Worsening cough, chest radiograph and lung function scores tracked best with the switch from non-mucoid to mucoid P. aeruginosa [[Li2005]].
- In 40 young children, 72.5% had P. aeruginosa on culture during the first 3 years. Combining culture with serology, 97.5% had evidence of infection by age 3. Early isolates were generally non-mucoid and antibiotic-susceptible, and each child had unique genotypes [[Burns2001]].
- After P. aeruginosa acquisition, the decline in FEV1/FVC sped up from 1.29% to 1.81% a year, and the chest radiograph score worsened from 0.45 to 1.40 points a year. The effect looked gradual rather than sudden [[Kosorok2001]].
- In a Toronto clinic population (n = 895; 1975–1988), 82% had P. aeruginosa. By age 7, mean FEV1 % predicted was 10% lower in those already colonised, but there was no sudden fall after acquisition [[Kerem1990]].
- In US children aged 1–5 years (1990 registry, n = 3,323), a positive P. aeruginosa culture went with 2.6 times the 8-year risk of death (95% CI 1.6–4.1), as well as lower later FEV1 and weight [[Emerson2002]].
- The Leeds criteria define chronic P. aeruginosa infection as more than 50% of the preceding 12 months' cultures being positive, and intermittent infection as 50% or fewer [[Lee2003]].

### lungs · Staphylococcus aureus and MRSA
- Among 19,833 people with CF aged 6–45 in US centres (1996–2008), mortality was 18.3 per 1,000 patient-years without MRSA and 27.7 with MRSA. The adjusted hazard ratio was 1.27 (95% CI 1.11–1.45), and the attributable risk of death among those with MRSA was 34.0% [[Dasenbrook2010]].

### lungs · Burkholderia cepacia complex
- At a UK adult centre, 31 of 33 people with initial B. cenocepacia infection progressed to chronic infection, compared with 8 of 16 with B. multivorans. Survival was shorter with B. cenocepacia than in FEV1-matched controls with P. aeruginosa, and deaths from "cepacia syndrome" occurred with both species [[Jones2004]].
- Among UK people with CF who had Burkholderia isolated over 2 years (n = 361), B. multivorans was the commonest species (56%), followed by B. cenocepacia IIIA (15%) [[Kenna2017]].

### lungs · Nontuberculous mycobacteria (NTM) and Mycobacterium abscessus
- In a 21-centre US study of 986 people with CF aged 10 years or older, NTM prevalence in sputum was 13.0% (range by centre 7–24%). Species were Mycobacterium avium complex in 72% and M. abscessus in 16%. Older age was the strongest predictor [[Olivier2003]].
- In US registry data for 2010–2011 (age 12 years or older), 58% had mycobacterial cultures and 14% of those were positive. Most states had a prevalence of 10–20%, seven had 20% or more, and higher saturated vapour pressure (humidity) raised risk (OR 1.06 per unit) [[Adjemian2014]].
- Whole-genome sequencing of a global collection found that most M. abscessus infections in CF come from recently emerged, globally spread clones that pass between people, possibly through fomites and aerosols. These clones were linked to worse outcomes (Early evidence) [[Bryant2016]].
- A US CF Foundation and European CF Society panel of 19 experts published consensus recommendations on screening, investigation, diagnosis and management of NTM pulmonary disease in CF [[Floto2016]].

### lungs · Aspergillus and allergic bronchopulmonary aspergillosis (ABPA)
- In the European Epidemiologic Registry (12,447 people, 224 centres, 9 countries), ABPA prevalence was 7.8% overall (2.1% in Sweden to 13.6% in Belgium). It was low under 6 years and about 10% from then on [[Mastella2000]].
- ABPA prevalence rose with worse lung function (6.6% to 12.9% across FEV1 bands) and was linked to pneumothorax and massive haemoptysis. ABPA did not clearly speed up short-term FEV1 decline [[Mastella2000]].
- In the US Epidemiologic Study of CF (14,210 people aged 5 or older, 1993–1996), reported ABPA prevalence was only 2% (regional range 0.9–4.0%), which the authors took as a sign of under-diagnosis [[Geller1999]].
- A meta-analysis of 64 studies estimated pooled ABPA prevalence at 8.9% (95% CI 7.4–10.7) and Aspergillus sensitisation at 39.1% (95% CI 33.3–45.1). ABPA was more common in adults (10.1% vs 8.9%), and diagnostic criteria varied widely [[Maturu2015]].
- A CF Foundation consensus conference set out ABPA diagnostic criteria and management approaches for CF, because its features overlap so much with CF lung disease itself [[Stevens2003]].

### lungs · Pulmonary exacerbations
- In the 1994 dornase alfa trial (968 people, 24 weeks), at least one exacerbation needing parenteral antibiotics occurred in 27% on placebo, 22% on once-daily rhDNase and 19% on twice-daily rhDNase. Risk fell by 28% and 37%, and FEV1 improved by 5.8 and 5.6 percentage points [[Fuchs1994Dornase]].
- The "Fuchs criteria" from that trial define an exacerbation as antibiotic treatment plus at least 4 of 12 respiratory signs and symptoms. A later analysis found that more than a third of respiratory events met 4 or more criteria without investigators calling them exacerbations, and that data were often missing [[VanDevanter2021]].
- A prospective exacerbation score built from symptoms and chest findings (with or without recent FEV1 change) predicted exacerbations with 86% sensitivity and 86% specificity in 246 people on placebo in an inhaled tobramycin trial [[Rosenfeld2001]].
- Of 8,479 IV-antibiotic-treated exacerbations in the US registry (2003–2006), 25% did not recover to baseline FEV1, defined as reaching at least 90% of the pre-exacerbation best within 3 months [[Sanders2010]].
- Failure to recover was more likely with female sex, pancreatic insufficiency, undernutrition, Medicaid insurance, persistent P. aeruginosa, B. cepacia complex or MRSA, ABPA, and a larger FEV1 drop at treatment start [[Sanders2010]].
- In 446 Ontario adults followed for 3 years, those with more than 2 exacerbations a year (vs fewer than 1) had a higher risk of a 5% FEV1 decline (adjusted HR 1.55; 95% CI 1.10–2.18) and of death or lung transplant (adjusted HR 4.05; 95% CI 1.15–14.28) [[deBoer2011]].
- Exacerbations are among the most important events in the course of CF, and their epidemiology and microbiology inform prognosis [[Goss2007]].

### lungs · Haemoptysis and pneumothorax
- In US registry data for 1990–1999 (28,858 people), massive haemoptysis had an average annual incidence of 0.87% (nearly 1 in 100 people a year) and occurred in 4.1% overall. Mean age was 24.2 years, and nearly 60% of those affected had FEV1 below 40% predicted [[Flume2005Hemoptysis]].
- Massive haemoptysis was associated with S. aureus in sputum (OR 1.3) and diabetes (OR 1.1), and was followed by higher 2-year mortality [[Flume2005Hemoptysis]].
- Spontaneous pneumothorax in the same registry had an average annual incidence of 0.64% (nearly 1 in 167 people a year) and occurred in 3.4% overall. Mean age was 21.9 years, and nearly 75% of those affected had FEV1 below 40% [[Flume2005Pneumothorax]].
- Pneumothorax risk was higher with P. aeruginosa (OR 2.3), B. cepacia (OR 1.8), Aspergillus (OR 1.3), FEV1 below 30% (OR 1.5), ABPA (OR 1.5) and prior massive haemoptysis (OR 1.4), and 2-year mortality was higher afterwards [[Flume2005Pneumothorax]].
- CF Foundation recommendations on managing haemoptysis and pneumothorax were reached by Delphi expert consensus, because the data were too thin for evidence-based recommendations [[Flume2010]].

### lungs · Upper airway: chronic rhinosinusitis and nasal polyps
- Chronic rhinosinusitis is highly prevalent in CF and adds to lung disease. Nasal polyps are more common at all ages and look more neutrophilic, with fewer eosinophils and more submucosal glands, than polyps in people without CF [[Hamilos2016]].
- On endoscopy of 211 adults with CF, nasal polyp prevalence was 37%. The commonest nasal symptoms were discharge, headache and obstruction [[Hadfield2000]].
- In 64 people with CF, one year of ETI cut the median Lund-Mackay sinus CT score from 5.8 to 3.3 (and the Sheikh-Lind score from 3.8 to 2.2), with fewer oropharyngeal cultures positive for P. aeruginosa and S. aureus [[Sheikh2023]].

### lungs · The airway after highly effective CFTR modulation
- In STRIVE (G551D, age 12 or older), ivacaftor raised FEV1 % predicted by 10.6 points over placebo through week 24, made exacerbations 55% less likely through week 48 and lowered sweat chloride by 48.1 mmol/L [[Ramsey2011STRIVE]].
- In GOAL (151 people with G551D starting ivacaftor), FEV1 rose 6.7 points and sweat chloride fell 53.8 mmol/L at 6 months, with improvements in mucociliary clearance, hospitalisation rate and P. aeruginosa burden [[Rowe2014GOAL]].
- In GOAL, 29% (26 of 89) of those culture-positive for P. aeruginosa in the year before ivacaftor were culture-negative in the year after, and 88% (52 of 59) of those free of P. aeruginosa stayed free. The odds of P. aeruginosa positivity fell by 35% (OR 0.65) [[Heltshe2015]].
- In a phase 3 trial in people with one F508del and one minimal-function allele (age 12 or older), ETI gave 14.3 points higher FEV1 % predicted through 24 weeks and a 63% lower exacerbation rate than placebo [[Middleton2019ETI]].
- In PROMISE (Nichols 2022; 487 people aged 12 or older starting ETI), FEV1 % predicted rose by 9.76 points (95% CI 8.76–10.76), the CFQ-R respiratory score by 20.4 points, and sweat chloride fell by 41.7 mmol/L at 6 months. Gains were seen even in people switching from ivacaftor [[Nichols2022PROMISE]].
- In 236 PROMISE participants, mean sputum densities of S. aureus, P. aeruginosa, S. maltophilia, Achromobacter and Burkholderia fell by 2–3 log₁₀ CFU/mL after 1 month of ETI. Most people stayed culture-positive for the pathogens they had before, and in those who turned culture-negative, PCR often still detected them months later [[Nichols2023]].
- Among 16,116 US registry patients starting ETI (2019–2020), mean exacerbations fell from 0.86 to 0.18 per patient a year (a 79% reduction) and hospitalisations fell by 74%. FEV1 % predicted rose by 8.2 points in year 1 and 8.9 in year 2, and positive cultures fell for every pathogen evaluated [[Bower2023]].
- In that cohort, annual rates of death (0.47%) and lung transplantation (0.16%) were well below the 2019 registry rates (1.65% and 1.08%). These are population statistics from an observational registry study, not predictions for any person [[Bower2023]].
- In 91 adolescents and adults, ETI improved lung clearance index (median −2.4 in F508del/minimal function; −1.4 in F508del homozygous) and the MRI global score (median −6.0 and −6.5), including mucus plugging and wall thickening. The authors' earlier work had shown ETI restoring CFTR function to 40–50% of normal [[Graeber2022]].

### Exam hooks
- CFTR is an ABC transporter that works as an anion channel. It opens only after PKA phosphorylates its R domain and ATP binds and dimerises its two NBDs [[Csanady2019,Vergani2005]].
- In the dephosphorylated state, the R domain sits between the NBDs (zebrafish) or inside the intracellular vestibule (human) and blocks opening [[Zhang2016Cell,Liu2017Cell]].
- F508 is located in NBD1 [[Riordan1989]].
- CFTR conducts Cl⁻ and HCO₃⁻, and HCO₃⁻ about one-quarter as well as Cl⁻ [[Poulsen1994]].
- Salty sweat comes from failed NaCl reabsorption in the sweat duct, so in the duct CF lowers Na⁺ absorption [[Quinton1983,Reddy1999]].
- The classic airway model: CF airways absorb too much Na⁺ and liquid, deplete the ~7 µm periciliary layer and stop mucus transport [[Boucher1986,Matsui1998,Tarran2001JGP]].
- βENaC-overexpressing mice develop CF-like muco-obstructive lung disease without any CFTR defect [[Mall2004]].
- In newborn CF pigs, bacterial killing is impaired before any inflammation appears [[Stoltz2010,Pezzulo2012]].
- The pulmonary ionocyte is a rare FOXI1-positive airway cell with high CFTR expression [[Montoro2018,Plasschaert2018]].
- Neutrophil elastase in BAL fluid in infancy predicts bronchiectasis (OR 3.02) [[Sly2013]].
- Bronchiectasis is present in about 29% of screened infants with CF at 3 months and 61.5% at 3 years (AREST CF) [[Sly2013]].
- Before modulators, FEV1 typically fell by about 1–2.4 percentage points a year in children and adolescents [[Konstan2007]].
- An FEV1 below 30% predicted went with 2-year mortality above 50% in the historical Toronto cohort [[Kerem1992]].
- Typical order of pathogens: S. aureus and H. influenzae in childhood, then P. aeruginosa, which turns mucoid over years (median age 13 for mucoid) [[Razvi2009,Li2005]].
- MRSA in the respiratory tract is associated with higher mortality (adjusted HR 1.27) [[Dasenbrook2010]].
- B. cenocepacia is more likely than B. multivorans to become chronic and is linked to "cepacia syndrome" [[Jones2004]].
- NTM prevalence in CF is about 13–14%. M. avium complex predominates, but M. abscessus can pass between people [[Olivier2003,Adjemian2014,Bryant2016]].
- About 1 in 4 IV-treated exacerbations ends without recovery to baseline FEV1 [[Sanders2010]].
- Massive haemoptysis affects about 0.87% and pneumothorax about 0.64% of people with CF each year (1990s US registry) [[Flume2005Hemoptysis,Flume2005Pneumothorax]].

### In plain words
- CFTR is a tiny gate in the surface of cells lining the lungs, gut, pancreas and sweat glands. It lets chloride and bicarbonate out, and water follows [[Csanady2019,Mall2020]].
- The gate opens only when the cell sends a "go" signal (phosphorylation) and the gate uses energy from ATP [[Csanady2019]].
- In sweat glands, the gate normally pulls salt back in. When it does not work, sweat stays very salty, which is why a sweat test can point to CF [[Quinton1983]].
- In the lungs, a thin layer of liquid lets tiny hairs called cilia sweep mucus up and out. Without working CFTR, that layer gets too thin and the mucus gets thick and sticky [[Matsui1998,Henderson2014]].
- Thick mucus traps germs, and the body's defence cells rush in. Over time the fight itself damages the airways [[Elborn2016,Sly2013]].
- Airway changes can start in the first months of life, even before a child has symptoms [[Sly2013,Khan1995]].
- Different germs tend to appear at different ages. Staph is common in childhood, and Pseudomonas becomes more common in teens and adults [[Razvi2009]].
- A "flare-up" (pulmonary exacerbation) means breathing symptoms get worse for a while, and it is often treated with antibiotics [[VanDevanter2021]].
- After a flare-up, most people get their lung function back, but about 1 in 4 do not get all of it back [[Sanders2010]].
- Many people with CF also have blocked sinuses or nasal polyps [[Hamilos2016,Hadfield2000]].
- Newer CFTR medicines help the gate work better. In studies, people had fewer flare-ups, clearer lung scans and fewer germs in their sputum [[Bower2023,Graeber2022,Nichols2023]].
- Even on these medicines, germs that were already in the lungs often stay, so regular check-ups still matter [[Nichols2023]].
- Numbers in this guide describe large groups of people. They cannot tell what will happen to any one person [[Bower2023,Kerem1992]].

## Numbers for the animations
- bronchiectasis_prevalence_AREST | 3 mo | 29.3 | % of infants with CF | [[Sly2013]]
- bronchiectasis_prevalence_AREST | 3 y | 61.5 | % of children with CF | [[Sly2013]]
- bronchiectasis_persist_once_seen | 1-y paired scans | 74 | % of paired scans | [[Mott2012]]
- bronchiectasis_extent_increase | 1-y paired scans | 63 | % of paired scans | [[Mott2012]]
- bronchiectasis_school_age_Wisconsin | 6.6–17.6 y | 83 | % of children with CF | [[Farrell2009Radiology]]
- fev1_decline_by_age | 6–8 y | -1.12 | % predicted per year | [[Konstan2007]]
- fev1_decline_by_age | 9–12 y | -2.39 | % predicted per year | [[Konstan2007]]
- fev1_decline_by_age | 13–17 y | -2.34 | % predicted per year | [[Konstan2007]]
- fev1_baseline_by_age | 6–8 y | 88.4 | % predicted | [[Konstan2007]]
- fev1_baseline_by_age | 9–12 y | 85.3 | % predicted | [[Konstan2007]]
- fev1_baseline_by_age | 13–17 y | 78.4 | % predicted | [[Konstan2007]]
- fev1_decline_young_adults_by_birth_cohort | cohort 1 (earliest) | -2.49 | % predicted per year | [[Que2006]]
- fev1_decline_young_adults_by_birth_cohort | cohort 2 | -1.99 | % predicted per year | [[Que2006]]
- fev1_decline_young_adults_by_birth_cohort | cohort 3 | -2.20 | % predicted per year | [[Que2006]]
- fev1_decline_young_adults_by_birth_cohort | cohort 4 | -1.65 | % predicted per year | [[Que2006]]
- fev1_decline_young_adults_by_birth_cohort | cohort 5 (latest) | -0.65 | % predicted per year | [[Que2006]]
- fev1_fvc_decline_before_after_Pa | before P. aeruginosa | -1.29 | % per year | [[Kosorok2001]]
- fev1_fvc_decline_before_after_Pa | after P. aeruginosa | -1.81 | % per year | [[Kosorok2001]]
- pa_acquisition_median_age | non-mucoid | 1.0 | years | [[Li2005]]
- pa_acquisition_median_age | mucoid | 13.0 | years | [[Li2005]]
- pa_by_age3 | culture only | 72.5 | % of children | [[Burns2001]]
- pa_by_age3 | culture + serology | 97.5 | % of children | [[Burns2001]]
- pa_prevalence_US_registry | 1995 | 60.4 | % | [[Razvi2009]]
- pa_prevalence_US_registry | 2005 | 56.1 | % | [[Razvi2009]]
- pa_prevalence_age6to10 | 1995 | 48.2 | % | [[Razvi2009]]
- pa_prevalence_age6to10 | 2005 | 36.1 | % | [[Razvi2009]]
- pa_prevalence_age11to17 | 1995 | 68.9 | % | [[Razvi2009]]
- pa_prevalence_age11to17 | 2005 | 55.5 | % | [[Razvi2009]]
- mssa_prevalence_US_registry | 1995 | 37.0 | % | [[Razvi2009]]
- mssa_prevalence_US_registry | 2005 | 52.4 | % | [[Razvi2009]]
- mrsa_prevalence_US_registry | 1995 | 0.1 | % | [[Razvi2009]]
- mrsa_prevalence_US_registry | 2005 | 17.2 | % | [[Razvi2009]]
- mortality_per_1000py_MRSA | without MRSA | 18.3 | deaths per 1,000 patient-years | [[Dasenbrook2010]]
- mortality_per_1000py_MRSA | with MRSA | 27.7 | deaths per 1,000 patient-years | [[Dasenbrook2010]]
- ntm_prevalence | 2003 multicentre (≥10 y) | 13.0 | % | [[Olivier2003]]
- ntm_prevalence | 2010–2011 registry (≥12 y, cultured) | 14 | % | [[Adjemian2014]]
- ntm_species_share | M. avium complex | 72 | % of NTM-positive | [[Olivier2003]]
- ntm_species_share | M. abscessus | 16 | % of NTM-positive | [[Olivier2003]]
- abpa_prevalence | European registry | 7.8 | % | [[Mastella2000]]
- abpa_prevalence | US ESCF reported | 2 | % | [[Geller1999]]
- abpa_prevalence | meta-analysis pooled | 8.9 | % | [[Maturu2015]]
- aspergillus_sensitisation | meta-analysis pooled | 39.1 | % | [[Maturu2015]]
- exacerbation_any_24wk_dornase_trial | placebo | 27 | % with ≥1 exacerbation | [[Fuchs1994Dornase]]
- exacerbation_any_24wk_dornase_trial | rhDNase once daily | 22 | % with ≥1 exacerbation | [[Fuchs1994Dornase]]
- exacerbation_any_24wk_dornase_trial | rhDNase twice daily | 19 | % with ≥1 exacerbation | [[Fuchs1994Dornase]]
- exacerbation_no_recovery | IV-treated exacerbations 2003–2006 | 25 | % not back to ≥90% of baseline FEV1 | [[Sanders2010]]
- exacerbations_per_patient_year_ETI | baseline year | 0.86 | per patient per year | [[Bower2023]]
- exacerbations_per_patient_year_ETI | years 1–2 on ETI | 0.18 | per patient per year | [[Bower2023]]
- fev1_change_on_ETI_registry | year 1 | 8.2 | percentage points | [[Bower2023]]
- fev1_change_on_ETI_registry | year 2 | 8.9 | percentage points | [[Bower2023]]
- fev1_change_on_ETI_PROMISE | 6 mo | 9.76 | percentage points | [[Nichols2022PROMISE]]
- sweat_chloride_change_on_ETI_PROMISE | 6 mo | -41.7 | mmol/L | [[Nichols2022PROMISE]]
- sputum_pathogen_density_drop_ETI | 1 mo | 2–3 | log10 CFU/mL fall | [[Nichols2023]]
- annual_death_rate_registry | 2019 overall | 1.65 | % per year | [[Bower2023]]
- annual_death_rate_registry | on ETI, years 1–2 | 0.47 | % per year | [[Bower2023]]
- annual_transplant_rate_registry | 2019 overall | 1.08 | % per year | [[Bower2023]]
- annual_transplant_rate_registry | on ETI, years 1–2 | 0.16 | % per year | [[Bower2023]]
- pa_culture_positive_to_negative_ivacaftor | year after | 29 | % of previously positive | [[Heltshe2015]]
- massive_haemoptysis | annual incidence | 0.87 | % per year | [[Flume2005Hemoptysis]]
- massive_haemoptysis | ever (10-y registry) | 4.1 | % of people | [[Flume2005Hemoptysis]]
- pneumothorax | annual incidence | 0.64 | % per year | [[Flume2005Pneumothorax]]
- pneumothorax | ever (10-y registry) | 3.4 | % of people | [[Flume2005Pneumothorax]]
- nasal_polyps_adults | endoscopy | 37 | % | [[Hadfield2000]]
- sinus_CT_LundMackay_ETI | baseline | 5.8 | median score | [[Sheikh2023]]
- sinus_CT_LundMackay_ETI | 1 y on ETI | 3.3 | median score | [[Sheikh2023]]
- periciliary_layer_height | normal | 7 | µm | [[Tarran2001JGP,Tarran2006JGP]]
- cftr_cl_hco3_permeability_ratio | wild-type | 3.8 | Cl⁻:HCO₃⁻ | [[Poulsen1994]]
- cftr_single_channel_conductance | 150 mM Cl⁻ | 10.4 | pS | [[Poulsen1994]]
- cryoEM_resolution | zebrafish, no ATP (2016) | 3.7 | Å | [[Zhang2016Cell]]
- cryoEM_resolution | human, dephosphorylated (2017) | 3.9 | Å | [[Liu2017Cell]]
- cryoEM_resolution | zebrafish, phosphorylated + ATP (2017) | 3.4 | Å | [[Zhang2017Cell]]
- cryoEM_resolution | human, phosphorylated + ATP (2018) | 3.2 | Å | [[Zhang2018PNAS]]
- hypertonic_saline_mucus_clearance_1h | HS + amiloride pretreatment | 7.0 | % cleared | [[Donaldson2006]]
- hypertonic_saline_mucus_clearance_1h | HS + placebo pretreatment | 14.0 | % cleared | [[Donaldson2006]]
- mortality_risk_per_10pct_fev1_drop | historical | 2.0 | relative risk of death within 2 y | [[Kerem1992]]
- elastase_vs_fev1_longitudinal | per 1-log rise | -2.9 | % FEV1 | [[MayerHamblett2007]]

## Open questions and controversies
- Is airway Na⁺ hyperabsorption a primary feature of CF? Yes: raised basal Na⁺ absorption in CF nasal tissue, CFTR inhibition of ENaC, and CF-like disease in βENaC mice [[Boucher1986,Stutts1995,Mall2004]]. No: newborn CF pigs and primary human CF cultures lose anion conductance without increased Na⁺ conductance or PCL depletion [[Chen2010Cell,Itani2011]]. In the sweat duct, ENaC activity actually falls without CFTR [[Reddy1999]]. Status: unresolved. Many reviews now present loss of anion (Cl⁻ and HCO₃⁻) secretion as the primary defect and volume depletion as a consequence.
- Is the airway surface acidic in CF, and does it matter? Yes in pigs and cultures: reduced ASL pH impairs bacterial killing and raises viscosity, and ATP12A drives acidification [[Pezzulo2012,Tang2016,Shah2016]]. No in children: in vivo fibre-optic measurement found similar ASL pH in children with and without CF [[Schultz2017]]. Status: contested. The pH hypothesis is Early evidence in animal models and is not confirmed in living humans.
- What comes first: dehydration, abnormal gland mucus, or failed bacterial killing? Several primary events have each been shown in models: PCL depletion in cultures [[Matsui1998]], tethered gland mucus in piglets [[Hoegger2014]], impaired bacterial eradication at birth in pigs [[Stoltz2010]], and mucus accumulation before infection in young children [[Esther2019]]. Status: probably several mechanisms acting together. No single initiating event is established in humans.
- Does inflammation need infection? Inflammation was found in culture-negative infants [[Khan1995]] and mucus with neutrophils without infection in preschool children [[Esther2019]]. In newborn pigs, defective bacterial clearance came before inflammation [[Stoltz2010]]. Status: open. Human and pig data point in different directions.
- How common is ABPA? Reported prevalence ranges from 2% (US ESCF, probably under-diagnosed) [[Geller1999]] through 7.8% (European registry) [[Mastella2000]] to 8.9% pooled [[Maturu2015]]. Status: the spread reflects differing diagnostic criteria.
- How common is B. cepacia complex? US registry analyses describe its prevalence as relatively low and falling [[Razvi2009,Salsgiver2016]], but the abstracts read give no percentage. The brief's "~2–3%" could not be confirmed from a validated abstract and is not stated in the findings.
- Do modulators clear chronic infection? Ivacaftor turned some P. aeruginosa-positive people culture-negative (29%) [[Heltshe2015]]. ETI cut pathogen density by 2–3 log₁₀, but most people stayed infected, often detectable by PCR [[Nichols2023]]. Status: Early evidence. Longer follow-up is pending, and the long-term effect on established bronchiectasis is unknown.
- Does a pre-modulator FEV1 decline rate still apply? Rates of 1–2.4 points a year come from pre-modulator cohorts [[Konstan2007,Que2006]]. On ETI, registry FEV1 rose and was sustained over 2 years [[Bower2023]]. Status: long-term trajectories on modulators are still being measured, and historical decline rates should not be applied to people on these medicines.

## Sources
- [Riordan1989] Riordan JR, Rommens JM, Kerem B, Alon N, Rozmahel R, Grzelczak Z, et al. Identification of the cystic fibrosis gene: cloning and characterization of complementary DNA. Science. 1989;245(4922):1066-73. PMID 2475911; doi:10.1126/science.2475911. (validated: PubMed)
- [Kerem1989] Kerem B, Rommens JM, Buchanan JA, Markiewicz D, Cox TK, Chakravarti A, et al. Identification of the cystic fibrosis gene: genetic analysis. Science. 1989;245(4922):1073-80. PMID 2570460; doi:10.1126/science.2570460. (validated: PubMed)
- [Liu2017Cell] Liu F, Zhang Z, Csanády L, Gadsby DC, Chen J. Molecular Structure of the Human CFTR Ion Channel. Cell. 2017;169(1):85-95.e8. PMID 28340353; doi:10.1016/j.cell.2017.02.024. (validated: PubMed)
- [Zhang2017Cell] Zhang Z, Liu F, Chen J. Conformational Changes of CFTR upon Phosphorylation and ATP Binding. Cell. 2017;170(3):483-491.e8. PMID 28735752; doi:10.1016/j.cell.2017.06.041. (validated: PubMed)
- [Zhang2016Cell] Zhang Z, Chen J. Atomic Structure of the Cystic Fibrosis Transmembrane Conductance Regulator. Cell. 2016;167(6):1586-1597.e9. PMID 27912062; doi:10.1016/j.cell.2016.11.014. (validated: PubMed)
- [Zhang2018PNAS] Zhang Z, Liu F, Chen J. Molecular structure of the ATP-bound, phosphorylated human CFTR. Proc Natl Acad Sci U S A. 2018;115(50):12757-12762. PMID 30459277; PMCID PMC6294961; doi:10.1073/pnas.1815287115. (validated: PubMed)
- [Csanady2019] Csanády L, Vergani P, Gadsby DC. Structure, gating, and regulation of the CFTR anion channel. Physiol Rev. 2019;99(1):707-738. PMID 30516439; doi:10.1152/physrev.00007.2018. (validated: PubMed)
- [Anderson1991] Anderson MP, Gregory RJ, Thompson S, Souza DW, Paul S, Mulligan RC, et al. Demonstration that CFTR is a chloride channel by alteration of its anion selectivity. Science. 1991;253(5016):202-5. PMID 1712984; doi:10.1126/science.1712984. (validated: PubMed)
- [Cheng1991] Cheng SH, Rich DP, Marshall J, Gregory RJ, Welsh MJ, Smith AE. Phosphorylation of the R domain by cAMP-dependent protein kinase regulates the CFTR chloride channel. Cell. 1991;66(5):1027-36. PMID 1716180; doi:10.1016/0092-8674(91)90446-6. (validated: PubMed)
- [Vergani2005] Vergani P, Lockless SW, Nairn AC, Gadsby DC. CFTR channel opening by ATP-driven tight dimerization of its nucleotide-binding domains. Nature. 2005;433(7028):876-80. PMID 15729345; PMCID PMC2756053; doi:10.1038/nature03313. (validated: PubMed)
- [Sheppard1999] Sheppard DN, Welsh MJ. Structure and function of the CFTR chloride channel. Physiol Rev. 1999;79(1 Suppl):S23-45. PMID 9922375; doi:10.1152/physrev.1999.79.1.S23. (validated: PubMed)
- [Poulsen1994] Poulsen JH, Fischer H, Illek B, Machen TE. Bicarbonate conductance and pH regulatory capability of cystic fibrosis transmembrane conductance regulator. Proc Natl Acad Sci U S A. 1994;91(12):5340-4. PMID 7515498; PMCID PMC43990; doi:10.1073/pnas.91.12.5340. (validated: PubMed)
- [Choi2001Nature] Choi JY, Muallem D, Kiselyov K, Lee MG, Thomas PJ, Muallem S. Aberrant CFTR-dependent HCO3- transport in mutations associated with cystic fibrosis. Nature. 2001;410(6824):94-7. PMID 11242048; PMCID PMC3943212; doi:10.1038/35065099. (validated: PubMed)
- [Quinton1983] Quinton PM. Chloride impermeability in cystic fibrosis. Nature. 1983;301(5899):421-2. PMID 6823316; doi:10.1038/301421a0. (validated: PubMed)
- [Quinton2008] Quinton PM. Cystic fibrosis: impaired bicarbonate secretion and mucoviscidosis. Lancet. 2008;372(9636):415-7. PMID 18675692; doi:10.1016/S0140-6736(08)61162-9. (validated: PubMed)
- [Reddy1999] Reddy MM, Light MJ, Quinton PM. Activation of the epithelial Na+ channel (ENaC) requires CFTR Cl- channel function. Nature. 1999;402(6759):301-4. PMID 10580502; doi:10.1038/46297. (validated: PubMed)
- [Stutts1995] Stutts MJ, Canessa CM, Olsen JC, Hamrick M, Cohn JA, Rossier BC, et al. CFTR as a cAMP-dependent regulator of sodium channels. Science. 1995;269(5225):847-50. PMID 7543698; doi:10.1126/science.7543698. (validated: PubMed)
- [Boucher1986] Boucher RC, Stutts MJ, Knowles MR, Cantley L, Gatzy JT. Na+ transport in cystic fibrosis respiratory epithelia. Abnormal basal rate and response to adenylate cyclase activation. J Clin Invest. 1986;78(5):1245-52. PMID 3771796; PMCID PMC423810; doi:10.1172/JCI112708. (validated: PubMed)
- [Matsui1998] Matsui H, Grubb BR, Tarran R, Randell SH, Gatzy JT, Davis CW, et al. Evidence for periciliary liquid layer depletion, not abnormal ion composition, in the pathogenesis of cystic fibrosis airways disease. Cell. 1998;95(7):1005-15. PMID 9875854; doi:10.1016/s0092-8674(00)81724-9. (validated: PubMed)
- [Tarran2001JGP] Tarran R, Grubb BR, Gatzy JT, Davis CW, Boucher RC. The relative roles of passive surface forces and active ion transport in the modulation of airway surface liquid volume and composition. J Gen Physiol. 2001;118(2):223-36. PMID 11479349; PMCID PMC2233832; doi:10.1085/jgp.118.2.223. (validated: PubMed)
- [Tarran2005JBC] Tarran R, Button B, Picher M, Paradiso AM, Ribeiro CM, Lazarowski ER, et al. Normal and cystic fibrosis airway surface liquid homeostasis. The effects of phasic shear stress and viral infections. J Biol Chem. 2005;280(42):35751-9. PMID 16087672; PMCID PMC2924153; doi:10.1074/jbc.M505832200. (validated: PubMed)
- [Tarran2006JGP] Tarran R, Trout L, Donaldson SH, Boucher RC. Soluble mediators, not cilia, determine airway surface liquid volume in normal and cystic fibrosis superficial airway epithelia. J Gen Physiol. 2006;127(5):591-604. PMID 16636206; PMCID PMC2151517; doi:10.1085/jgp.200509468. (validated: PubMed)
- [Mall2004] Mall M, Grubb BR, Harkema JR, O'Neal WK, Boucher RC. Increased airway epithelial Na+ absorption produces cystic fibrosis-like lung disease in mice. Nat Med. 2004;10(5):487-93. PMID 15077107; doi:10.1038/nm1028. (validated: PubMed)
- [Button2012] Button B, Cai LH, Ehre C, Kesimer M, Hill DB, Sheehan JK, et al. A periciliary brush promotes the lung health by separating the mucus layer from airway epithelia. Science. 2012;337(6097):937-41. PMID 22923574; PMCID PMC3633213; doi:10.1126/science.1223012. (validated: PubMed)
- [Henderson2014] Henderson AG, Ehre C, Button B, Abdullah LH, Cai LH, Leigh MW, et al. Cystic fibrosis airway secretions exhibit mucin hyperconcentration and increased osmotic pressure. J Clin Invest. 2014;124(7):3047-60. PMID 24892808; PMCID PMC4072023; doi:10.1172/JCI73469. (validated: PubMed)
- [Chen2010Cell] Chen JH, Stoltz DA, Karp PH, Ernst SE, Pezzulo AA, Moninger TO, et al. Loss of anion transport without increased sodium absorption characterizes newborn porcine cystic fibrosis airway epithelia. Cell. 2010;143(6):911-23. PMID 21145458; PMCID PMC3057187; doi:10.1016/j.cell.2010.11.029. (validated: PubMed)
- [Itani2011] Itani OA, Chen JH, Karp PH, Ernst S, Keshavjee S, Parekh K, et al. Human cystic fibrosis airway epithelia have reduced Cl- conductance but not increased Na+ conductance. Proc Natl Acad Sci U S A. 2011;108(25):10260-5. PMID 21646513; PMCID PMC3121869; doi:10.1073/pnas.1106695108. (validated: PubMed)
- [Rogers2008] Rogers CS, Stoltz DA, Meyerholz DK, Ostedgaard LS, Rokhlina T, Taft PJ, et al. Disruption of the CFTR gene produces a model of cystic fibrosis in newborn pigs. Science. 2008;321(5897):1837-41. PMID 18818360; PMCID PMC2570747; doi:10.1126/science.1163600. (validated: PubMed)
- [Stoltz2010] Stoltz DA, Meyerholz DK, Pezzulo AA, Ramachandran S, Rogan MP, Davis GJ, et al. Cystic fibrosis pigs develop lung disease and exhibit defective bacterial eradication at birth. Sci Transl Med. 2010;2(29):29ra31. PMID 20427821; PMCID PMC2889616; doi:10.1126/scitranslmed.3000928. (validated: PubMed)
- [Pezzulo2012] Pezzulo AA, Tang XX, Hoegger MJ, Abou Alaiwa MH, Ramachandran S, Moninger TO, et al. Reduced airway surface pH impairs bacterial killing in the porcine cystic fibrosis lung. Nature. 2012;487(7405):109-13. PMID 22763554; PMCID PMC3390761; doi:10.1038/nature11130. (validated: PubMed)
- [Shah2016] Shah VS, Meyerholz DK, Tang XX, Reznikov L, Abou Alaiwa M, Ernst SE, et al. Airway acidification initiates host defense abnormalities in cystic fibrosis mice. Science. 2016;351(6272):503-7. PMID 26823428; PMCID PMC4852973; doi:10.1126/science.aad5589. (validated: PubMed)
- [Hoegger2014] Hoegger MJ, Fischer AJ, McMenimen JD, Ostedgaard LS, Tucker AJ, Awadalla MA, et al. Impaired mucus detachment disrupts mucociliary transport in a piglet model of cystic fibrosis. Science. 2014;345(6198):818-22. PMID 25124441; PMCID PMC4346163; doi:10.1126/science.1255825. (validated: PubMed)
- [Tang2016] Tang XX, Ostedgaard LS, Hoegger MJ, Moninger TO, Karp PH, McMenimen JD, et al. Acidic pH increases airway surface liquid viscosity in cystic fibrosis. J Clin Invest. 2016;126(3):879-91. PMID 26808501; PMCID PMC4767348; doi:10.1172/JCI83922. (validated: PubMed)
- [Schultz2017] Schultz A, Puvvadi R, Borisov SM, Shaw NC, Klimant I, Berry LJ, et al. Airway surface liquid pH is not acidic in children with cystic fibrosis. Nat Commun. 2017;8(1):1409. PMID 29123085; PMCID PMC5680186; doi:10.1038/s41467-017-00532-5. (validated: PubMed)
- [Gustafsson2012] Gustafsson JK, Ermund A, Ambort D, Johansson ME, Nilsson HE, Thorell K, et al. Bicarbonate and functional CFTR channel are required for proper mucin secretion and link cystic fibrosis with its mucus phenotype. J Exp Med. 2012;209(7):1263-72. PMID 22711878; PMCID PMC3405509; doi:10.1084/jem.20120562. (validated: PubMed)
- [Garcia2009] Garcia MA, Yang N, Quinton PM. Normal mouse intestinal mucus release requires cystic fibrosis transmembrane regulator-dependent bicarbonate secretion. J Clin Invest. 2009;119(9):2613-22. PMID 19726884; PMCID PMC2735925; doi:10.1172/JCI38662. (validated: PubMed)
- [Engelhardt1992] Engelhardt JF, Yankaskas JR, Ernst SA, Yang Y, Marino CR, Boucher RC, et al. Submucosal glands are the predominant site of CFTR expression in the human bronchus. Nat Genet. 1992;2(3):240-8. PMID 1285365; doi:10.1038/ng1192-240. (validated: PubMed)
- [Montoro2018] Montoro DT, Haber AL, Biton M, Vinarsky V, Lin B, Birket SE, et al. A revised airway epithelial hierarchy includes CFTR-expressing ionocytes. Nature. 2018;560(7718):319-324. PMID 30069044; PMCID PMC6295155; doi:10.1038/s41586-018-0393-7. (validated: PubMed)
- [Plasschaert2018] Plasschaert LW, Žilionis R, Choo-Wing R, Savova V, Knehr J, Roma G, et al. A single-cell atlas of the airway epithelium reveals the CFTR-rich pulmonary ionocyte. Nature. 2018;560(7718):377-381. PMID 30069046; PMCID PMC6108322; doi:10.1038/s41586-018-0394-6. (validated: PubMed)
- [Worlitzsch2002] Worlitzsch D, Tarran R, Ulrich M, Schwab U, Cekici A, Meyer KC, et al. Effects of reduced mucus oxygen concentration in airway Pseudomonas infections of cystic fibrosis patients. J Clin Invest. 2002;109(3):317-25. PMID 11827991; PMCID PMC150856; doi:10.1172/JCI13870. (validated: PubMed)
- [Esther2019] Esther CR Jr, Muhlebach MS, Ehre C, Hill DB, Wolfgang MC, Kesimer M, et al. Mucus accumulation in the lungs precedes structural changes and infection in children with cystic fibrosis. Sci Transl Med. 2019;11(486):eaav3488. PMID 30944166; PMCID PMC6566903; doi:10.1126/scitranslmed.aav3488. (validated: PubMed)
- [Singh2000] Singh PK, Schaefer AL, Parsek MR, Moninger TO, Welsh MJ, Greenberg EP. Quorum-sensing signals indicate that cystic fibrosis lungs are infected with bacterial biofilms. Nature. 2000;407(6805):762-4. PMID 11048725; doi:10.1038/35037627. (validated: PubMed)
- [Elborn2016] Elborn JS. Cystic fibrosis. Lancet. 2016;388(10059):2519-2531. PMID 27140670; doi:10.1016/S0140-6736(16)00576-6. (validated: PubMed)
- [Shteinberg2021] Shteinberg M, Haq IJ, Polineni D, Davies JC. Cystic fibrosis. Lancet. 2021;397(10290):2195-2211. PMID 34090606; doi:10.1016/S0140-6736(20)32542-3. (validated: PubMed)
- [Ratjen2015] Ratjen F, Bell SC, Rowe SM, Goss CH, Quittner AL, Bush A. Cystic fibrosis. Nat Rev Dis Primers. 2015;1:15010. PMID 27189798; PMCID PMC7041544; doi:10.1038/nrdp.2015.10. (validated: PubMed)
- [Mall2020] Mall MA, Mayer-Hamblett N, Rowe SM. Cystic Fibrosis: Emergence of Highly Effective Targeted Therapeutics and Potential Clinical Implications. Am J Respir Crit Care Med. 2020;201(10):1193-1208. PMID 31860331; PMCID PMC7233349; doi:10.1164/rccm.201910-1943SO. (validated: PubMed)
- [Sly2013] Sly PD, Gangell CL, Chen L, Ware RS, Ranganathan S, Mott LS, et al. Risk factors for bronchiectasis in children with cystic fibrosis. N Engl J Med. 2013;368(21):1963-70. PMID 23692169; doi:10.1056/NEJMoa1301725. (validated: PubMed)
- [Stick2009] Stick SM, Brennan S, Murray C, Douglas T, von Ungern-Sternberg BS, Garratt LW, et al. Bronchiectasis in infants and preschool children diagnosed with cystic fibrosis after newborn screening. J Pediatr. 2009;155(5):623-8.e1. PMID 19616787; doi:10.1016/j.jpeds.2009.05.005. (validated: PubMed)
- [Mott2012] Mott LS, Park J, Murray CP, Gangell CL, de Klerk NH, Robinson PJ, et al. Progression of early structural lung disease in young children with cystic fibrosis assessed using CT. Thorax. 2012;67(6):509-16. PMID 22201161; doi:10.1136/thoraxjnl-2011-200912. (validated: PubMed)
- [Khan1995] Khan TZ, Wagener JS, Bost T, Martinez J, Accurso FJ, Riches DW. Early pulmonary inflammation in infants with cystic fibrosis. Am J Respir Crit Care Med. 1995;151(4):1075-82. PMID 7697234; doi:10.1164/ajrccm/151.4.1075. (validated: PubMed)
- [Ramsey2014AREST] Ramsey KA, Ranganathan S, Park J, Skoric B, Adams AM, Simpson SJ, et al. Early respiratory infection is associated with reduced spirometry in children with cystic fibrosis. Am J Respir Crit Care Med. 2014;190(10):1111-6. PMID 25321321; doi:10.1164/rccm.201407-1277OC. (validated: PubMed)
- [Farrell2009Radiology] Farrell PM, Collins J, Broderick LS, Rock MJ, Li Z, Kosorok MR, et al. Association between mucoid Pseudomonas infection and bronchiectasis in children with cystic fibrosis. Radiology. 2009;252(2):534-43. PMID 19703887; PMCID PMC2753783; doi:10.1148/radiol.2522081882. (validated: PubMed)
- [Konstan2007] Konstan MW, Morgan WJ, Butler SM, Pasta DJ, Craib ML, Silva SJ, et al. Risk factors for rate of decline in forced expiratory volume in one second in children and adolescents with cystic fibrosis. J Pediatr. 2007;151(2):134-9, 139.e1. PMID 17643762; doi:10.1016/j.jpeds.2007.03.006. (validated: PubMed)
- [Que2006] Que C, Cullinan P, Geddes D. Improving rate of decline of FEV1 in young adults with cystic fibrosis. Thorax. 2006;61(2):155-7. PMID 16384880; PMCID PMC2104571; doi:10.1136/thx.2005.043372. (validated: PubMed)
- [TaylorRobinson2012] Taylor-Robinson D, Whitehead M, Diderichsen F, Olesen HV, Pressler T, Smyth RL, et al. Understanding the natural progression in %FEV1 decline in patients with cystic fibrosis: a longitudinal study. Thorax. 2012;67(10):860-6. PMID 22555277; PMCID PMC3446776; doi:10.1136/thoraxjnl-2011-200953. (validated: PubMed)
- [Harun2016] Harun SN, Wainwright C, Klein K, Hennig S. A systematic review of studies examining the rate of lung function decline in patients with cystic fibrosis. Paediatr Respir Rev. 2016;20:55-66. PMID 27259460; doi:10.1016/j.prrv.2016.03.002. (validated: PubMed)
- [Kerem1992] Kerem E, Reisman J, Corey M, Canny GJ, Levison H. Prediction of mortality in patients with cystic fibrosis. N Engl J Med. 1992;326(18):1187-91. PMID 1285737; doi:10.1056/NEJM199204303261804. (validated: PubMed)
- [Liou2001] Liou TG, Adler FR, Fitzsimmons SC, Cahill BC, Hibbs JR, Marshall BC. Predictive 5-year survivorship model of cystic fibrosis. Am J Epidemiol. 2001;153(4):345-52. PMID 11207152; PMCID PMC2198936; doi:10.1093/aje/153.4.345. (validated: PubMed)
- [Emerson2002] Emerson J, Rosenfeld M, McNamara S, Ramsey B, Gibson RL. Pseudomonas aeruginosa and other predictors of mortality and morbidity in young children with cystic fibrosis. Pediatr Pulmonol. 2002;34(2):91-100. PMID 12112774; doi:10.1002/ppul.10127. (validated: PubMed)
- [Kosorok2001] Kosorok MR, Zeng L, West SE, Rock MJ, Splaingard ML, Laxova A, et al. Acceleration of lung disease in children with cystic fibrosis after Pseudomonas aeruginosa acquisition. Pediatr Pulmonol. 2001;32(4):277-87. PMID 11568988; doi:10.1002/ppul.2009.abs. (validated: PubMed)
- [Li2005] Li Z, Kosorok MR, Farrell PM, Laxova A, West SE, Green CG, et al. Longitudinal development of mucoid Pseudomonas aeruginosa infection and lung disease progression in children with cystic fibrosis. JAMA. 2005;293(5):581-8. PMID 15687313; doi:10.1001/jama.293.5.581. (validated: PubMed)
- [Burns2001] Burns JL, Gibson RL, McNamara S, Yim D, Emerson J, Rosenfeld M, et al. Longitudinal assessment of Pseudomonas aeruginosa in young children with cystic fibrosis. J Infect Dis. 2001;183(3):444-52. PMID 11133376; doi:10.1086/318075. (validated: PubMed)
- [Kerem1990] Kerem E, Corey M, Gold R, Levison H. Pulmonary function and clinical course in patients with cystic fibrosis after pulmonary colonization with Pseudomonas aeruginosa. J Pediatr. 1990;116(5):714-9. PMID 2109790; doi:10.1016/s0022-3476(05)82653-8. (validated: PubMed)
- [Lee2003] Lee TW, Brownlee KG, Conway SP, Denton M, Littlewood JM. Evaluation of a new definition for chronic Pseudomonas aeruginosa infection in cystic fibrosis patients. J Cyst Fibros. 2003;2(1):29-34. PMID 15463843; doi:10.1016/S1569-1993(02)00141-8. (validated: PubMed)
- [Gibson2003] Gibson RL, Burns JL, Ramsey BW. Pathophysiology and management of pulmonary infections in cystic fibrosis. Am J Respir Crit Care Med. 2003;168(8):918-51. PMID 14555458; doi:10.1164/rccm.200304-505SO. (validated: PubMed)
- [LiPuma2010] Lipuma JJ. The changing microbial epidemiology in cystic fibrosis. Clin Microbiol Rev. 2010;23(2):299-323. PMID 20375354; PMCID PMC2863368; doi:10.1128/CMR.00068-09. (validated: PubMed)
- [Razvi2009] Razvi S, Quittell L, Sewall A, Quinton H, Marshall B, Saiman L. Respiratory microbiology of patients with cystic fibrosis in the United States, 1995 to 2005. Chest. 2009;136(6):1554-1560. PMID 19505987; doi:10.1378/chest.09-0132. (validated: PubMed)
- [Salsgiver2016] Salsgiver EL, Fink AK, Knapp EA, LiPuma JJ, Olivier KN, Marshall BC, et al. Changing Epidemiology of the Respiratory Bacteriology of Patients With Cystic Fibrosis. Chest. 2016;149(2):390-400. PMID 26203598; PMCID PMC5831653; doi:10.1378/chest.15-0676. (validated: PubMed)
- [Dasenbrook2010] Dasenbrook EC, Checkley W, Merlo CA, Konstan MW, Lechtzin N, Boyle MP. Association between respiratory tract methicillin-resistant Staphylococcus aureus and survival in cystic fibrosis. JAMA. 2010;303(23):2386-92. PMID 20551409; doi:10.1001/jama.2010.791. (validated: PubMed)
- [Jones2004] Jones AM, Dodd ME, Govan JR, Barcus V, Doherty CJ, Morris J, et al. Burkholderia cenocepacia and Burkholderia multivorans: influence on survival in cystic fibrosis. Thorax. 2004;59(11):948-51. PMID 15516469; PMCID PMC1746874; doi:10.1136/thx.2003.017210. (validated: PubMed)
- [Kenna2017] Kenna DTD, Lilley D, Coward A, Martin K, Perry C, Pike R, et al. Prevalence of Burkholderia species, including members of Burkholderia cepacia complex, among UK cystic and non-cystic fibrosis patients. J Med Microbiol. 2017;66(4):490-501. PMID 28463663; doi:10.1099/jmm.0.000458. (validated: PubMed)
- [Olivier2003] Olivier KN, Weber DJ, Wallace RJ Jr, Faiz AR, Lee JH, Zhang Y, et al. Nontuberculous mycobacteria. I: multicenter prevalence study in cystic fibrosis. Am J Respir Crit Care Med. 2003;167(6):828-34. PMID 12433668; doi:10.1164/rccm.200207-678OC. (validated: PubMed)
- [Adjemian2014] Adjemian J, Olivier KN, Prevots DR. Nontuberculous mycobacteria among patients with cystic fibrosis in the United States: screening practices and environmental risk. Am J Respir Crit Care Med. 2014;190(5):581-6. PMID 25068291; PMCID PMC4214089; doi:10.1164/rccm.201405-0884OC. (validated: PubMed)
- [Floto2016] Floto RA, Olivier KN, Saiman L, Daley CL, Herrmann JL, Nick JA, et al. US Cystic Fibrosis Foundation and European Cystic Fibrosis Society consensus recommendations for the management of non-tuberculous mycobacteria in individuals with cystic fibrosis: executive summary. Thorax. 2016;71(1):88-90. PMID 26678435; PMCID PMC4717423; doi:10.1136/thoraxjnl-2015-207983. (validated: PubMed)
- [Bryant2016] Bryant JM, Grogono DM, Rodriguez-Rincon D, Everall I, Brown KP, Moreno P, et al. Emergence and spread of a human-transmissible multidrug-resistant nontuberculous mycobacterium. Science. 2016;354(6313):751-757. PMID 27846606; PMCID PMC5142603; doi:10.1126/science.aaf8156. (validated: PubMed)
- [Stevens2003] Stevens DA, Moss RB, Kurup VP, Knutsen AP, Greenberger P, Judson MA, et al. Allergic bronchopulmonary aspergillosis in cystic fibrosis--state of the art: Cystic Fibrosis Foundation Consensus Conference. Clin Infect Dis. 2003;37 Suppl 3:S225-64. PMID 12975753; doi:10.1086/376525. (validated: PubMed)
- [Mastella2000] Mastella G, Rainisio M, Harms HK, Hodson ME, Koch C, Navarro J, et al. Allergic bronchopulmonary aspergillosis in cystic fibrosis. A European epidemiological study. Epidemiologic Registry of Cystic Fibrosis. Eur Respir J. 2000;16(3):464-71. PMID 11028661; doi:10.1034/j.1399-3003.2000.016003464.x. (validated: PubMed)
- [Geller1999] Geller DE, Kaplowitz H, Light MJ, Colin AA. Allergic bronchopulmonary aspergillosis in cystic fibrosis: reported prevalence, regional distribution, and patient characteristics. Scientific Advisory Group, Investigators, and Coordinators of the Epidemiologic Study of Cystic Fibrosis. Chest. 1999;116(3):639-46. PMID 10492265; doi:10.1378/chest.116.3.639. (validated: PubMed)
- [Maturu2015] Maturu VN, Agarwal R. Prevalence of Aspergillus sensitization and allergic bronchopulmonary aspergillosis in cystic fibrosis: systematic review and meta-analysis. Clin Exp Allergy. 2015;45(12):1765-78. PMID 26177981; doi:10.1111/cea.12595. (validated: PubMed)
- [Coburn2015] Coburn B, Wang PW, Diaz Caballero J, Clark ST, Brahma V, Donaldson S, et al. Lung microbiota across age and disease stage in cystic fibrosis. Sci Rep. 2015;5:10241. PMID 25974282; PMCID PMC4431465; doi:10.1038/srep10241. (validated: PubMed)
- [Zemanick2017] Zemanick ET, Wagner BD, Robertson CE, Ahrens RC, Chmiel JF, Clancy JP, et al. Airway microbiota across age and disease spectrum in cystic fibrosis. Eur Respir J. 2017;50(5):1700832. PMID 29146601; PMCID PMC5935257; doi:10.1183/13993003.00832-2017. (validated: PubMed)
- [Fuchs1994Dornase] Fuchs HJ, Borowitz DS, Christiansen DH, Morris EM, Nash ML, Ramsey BW, et al. Effect of aerosolized recombinant human DNase on exacerbations of respiratory symptoms and on pulmonary function in patients with cystic fibrosis. The Pulmozyme Study Group. N Engl J Med. 1994;331(10):637-42. PMID 7503821; doi:10.1056/NEJM199409083311003. (validated: PubMed)
- [VanDevanter2021] VanDevanter DR, Hamblett NM, Simon N, McIntosh J, Konstan MW. Evaluating assumptions of definition-based pulmonary exacerbation endpoints in cystic fibrosis clinical trials. J Cyst Fibros. 2021;20(1):39-45. PMID 32682670; PMCID PMC7362840; doi:10.1016/j.jcf.2020.07.008. (validated: PubMed)
- [Rosenfeld2001] Rosenfeld M, Emerson J, Williams-Warren J, Pepe M, Smith A, Montgomery AB, et al. Defining a pulmonary exacerbation in cystic fibrosis. J Pediatr. 2001;139(3):359-65. PMID 11562614; doi:10.1067/mpd.2001.117288. (validated: PubMed)
- [Goss2007] Goss CH, Burns JL. Exacerbations in cystic fibrosis. 1: Epidemiology and pathogenesis. Thorax. 2007;62(4):360-7. PMID 17387214; PMCID PMC2092469; doi:10.1136/thx.2006.060889. (validated: PubMed)
- [deBoer2011] de Boer K, Vandemheen KL, Tullis E, Doucette S, Fergusson D, Freitag A, et al. Exacerbation frequency and clinical outcomes in adult patients with cystic fibrosis. Thorax. 2011;66(8):680-5. PMID 21680566; doi:10.1136/thx.2011.161117. (validated: PubMed)
- [Sanders2010] Sanders DB, Bittner RC, Rosenfeld M, Hoffman LR, Redding GJ, Goss CH. Failure to recover to baseline pulmonary function after cystic fibrosis pulmonary exacerbation. Am J Respir Crit Care Med. 2010;182(5):627-32. PMID 20463179; PMCID PMC5450763; doi:10.1164/rccm.200909-1421OC. (validated: PubMed)
- [Shak1990] Shak S, Capon DJ, Hellmiss R, Marsters SA, Baker CL. Recombinant human DNase I reduces the viscosity of cystic fibrosis sputum. Proc Natl Acad Sci U S A. 1990;87(23):9188-92. PMID 2251263; PMCID PMC55129; doi:10.1073/pnas.87.23.9188. (validated: PubMed)
- [MayerHamblett2007] Mayer-Hamblett N, Aitken ML, Accurso FJ, Kronmal RA, Konstan MW, Burns JL, et al. Association between pulmonary function and sputum biomarkers in cystic fibrosis. Am J Respir Crit Care Med. 2007;175(8):822-8. PMID 17234902; PMCID PMC2720115; doi:10.1164/rccm.200609-1354OC. (validated: PubMed)
- [Sagel2012] Sagel SD, Wagner BD, Anthony MM, Emmett P, Zemanick ET. Sputum biomarkers of inflammation and lung function decline in children with cystic fibrosis. Am J Respir Crit Care Med. 2012;186(9):857-65. PMID 22904182; PMCID PMC3530222; doi:10.1164/rccm.201203-0507OC. (validated: PubMed)
- [Flume2005Hemoptysis] Flume PA, Yankaskas JR, Ebeling M, Hulsey T, Clark LL. Massive hemoptysis in cystic fibrosis. Chest. 2005;128(2):729-38. PMID 16100161; doi:10.1378/chest.128.2.729. (validated: PubMed)
- [Flume2005Pneumothorax] Flume PA, Strange C, Ye X, Ebeling M, Hulsey T, Clark LL. Pneumothorax in cystic fibrosis. Chest. 2005;128(2):720-8. PMID 16100160; doi:10.1378/chest.128.2.720. (validated: PubMed)
- [Flume2010] Flume PA, Mogayzel PJ Jr, Robinson KA, Rosenblatt RL, Quittell L, Marshall BC. Cystic fibrosis pulmonary guidelines: pulmonary complications: hemoptysis and pneumothorax. Am J Respir Crit Care Med. 2010;182(3):298-306. PMID 20675678; doi:10.1164/rccm.201002-0157OC. (validated: PubMed)
- [Hamilos2016] Hamilos DL. Chronic Rhinosinusitis in Patients with Cystic Fibrosis. J Allergy Clin Immunol Pract. 2016;4(4):605-12. PMID 27393775; doi:10.1016/j.jaip.2016.04.013. (validated: PubMed)
- [Hadfield2000] Hadfield PJ, Rowe-Jones JM, Mackay IS. The prevalence of nasal polyps in adults with cystic fibrosis. Clin Otolaryngol Allied Sci. 2000;25(1):19-22. PMID 10764232; doi:10.1046/j.1365-2273.2000.00241.x. (validated: PubMed)
- [Sheikh2023] Sheikh S, Ho ML, Eisner M, Gushue C, Paul G, Holtzlander M, et al. Elexacaftor-Tezacaftor-Ivacaftor Therapy for Chronic Sinus Disease in Cystic Fibrosis. JAMA Otolaryngol Head Neck Surg. 2023;149(12):1075-1082. PMID 37676668; PMCID PMC10485743; doi:10.1001/jamaoto.2023.2701. (validated: PubMed)
- [Donaldson2006] Donaldson SH, Bennett WD, Zeman KL, Knowles MR, Tarran R, Boucher RC. Mucus clearance and lung function in cystic fibrosis with hypertonic saline. N Engl J Med. 2006;354(3):241-50. PMID 16421365; doi:10.1056/NEJMoa043891. (validated: PubMed)
- [Ramsey2011STRIVE] Ramsey BW, Davies J, McElvaney NG, Tullis E, Bell SC, Dřevínek P, et al. A CFTR potentiator in patients with cystic fibrosis and the G551D mutation. N Engl J Med. 2011;365(18):1663-72. PMID 22047557; PMCID PMC3230303; doi:10.1056/NEJMoa1105185. (validated: PubMed)
- [Rowe2014GOAL] Rowe SM, Heltshe SL, Gonska T, Donaldson SH, Borowitz D, Gelfond D, et al. Clinical mechanism of the cystic fibrosis transmembrane conductance regulator potentiator ivacaftor in G551D-mediated cystic fibrosis. Am J Respir Crit Care Med. 2014;190(2):175-84. PMID 24927234; PMCID PMC4226057; doi:10.1164/rccm.201404-0703OC. (validated: PubMed)
- [Heltshe2015] Heltshe SL, Mayer-Hamblett N, Burns JL, Khan U, Baines A, Ramsey BW, et al. Pseudomonas aeruginosa in cystic fibrosis patients with G551D-CFTR treated with ivacaftor. Clin Infect Dis. 2015;60(5):703-12. PMID 25425629; PMCID PMC4342673; doi:10.1093/cid/ciu944. (validated: PubMed)
- [Donaldson2018] Donaldson SH, Laube BL, Corcoran TE, Bhambhvani P, Zeman K, Ceppe A, et al. Effect of ivacaftor on mucociliary clearance and clinical outcomes in cystic fibrosis patients with G551D-CFTR. JCI Insight. 2018;3(24):e122695. PMID 30568035; PMCID PMC6338313; doi:10.1172/jci.insight.122695. (validated: PubMed)
- [Middleton2019ETI] Middleton PG, Mall MA, Dřevínek P, Lands LC, McKone EF, Polineni D, et al. Elexacaftor-Tezacaftor-Ivacaftor for Cystic Fibrosis with a Single Phe508del Allele. N Engl J Med. 2019;381(19):1809-1819. PMID 31697873; PMCID PMC7282384; doi:10.1056/NEJMoa1908639. (validated: PubMed)
- [Nichols2022PROMISE] Nichols DP, Paynter AC, Heltshe SL, Donaldson SH, Frederick CA, Freedman SD, et al. Clinical Effectiveness of Elexacaftor/Tezacaftor/Ivacaftor in People with Cystic Fibrosis: A Clinical Trial. Am J Respir Crit Care Med. 2022;205(5):529-539. PMID 34784492; PMCID PMC8906485; doi:10.1164/rccm.202108-1986OC. (validated: PubMed)
- [Nichols2023] Nichols DP, Morgan SJ, Skalland M, Vo AT, Van Dalfsen JM, Singh SB, et al. Pharmacologic improvement of CFTR function rapidly decreases sputum pathogen density, but lung infections generally persist. J Clin Invest. 2023;133(10):e167957. PMID 36976651; PMCID PMC10178839; doi:10.1172/JCI167957. (validated: PubMed)
- [Bower2023] Bower JK, Volkova N, Ahluwalia N, Sahota G, Xuan F, Chin A, et al. Real-world safety and effectiveness of elexacaftor/tezacaftor/ivacaftor in people with cystic fibrosis: Interim results of a long-term registry-based study. J Cyst Fibros. 2023;22(4):730-737. PMID 36963986; doi:10.1016/j.jcf.2023.03.002. (validated: PubMed)
- [Graeber2022] Graeber SY, Renz DM, Stahl M, Pallenberg ST, Sommerburg O, Naehrlich L, et al. Effects of Elexacaftor/Tezacaftor/Ivacaftor Therapy on Lung Clearance Index and Magnetic Resonance Imaging in Patients with Cystic Fibrosis and One or Two F508del Alleles. Am J Respir Crit Care Med. 2022;206(3):311-320. PMID 35536314; doi:10.1164/rccm.202201-0219OC. (validated: PubMed)

## Provenance
- Search: Europe PMC REST search (author plus title terms) and PubMed esearch. Every PMID was then confirmed in one batched PubMed esummary call. Authors (first six), title, journal, year, volume, issue, pages, PMCID and DOI in the Sources lines were generated from the esummary record. Article numbers for Esther 2019, Zemanick 2017, Donaldson 2018 and Nichols 2023 (online-only journals with no page range in PubMed) were added from the DOI suffix or the journal's article-number convention.
- Abstracts were read for every source through PubMed efetch (batched) or Europe PMC (resultType=core), for Salsgiver 2016, Bryant 2016, Tarran 2001 and Tarran 2006. All numbers come from those abstracts. Elborn 2016, Shteinberg 2021, Ratjen 2015, Mall 2020, Gibson 2003, LiPuma 2010, Goss 2007, Floto 2016, Stevens 2003 and Flume 2010 are cited only for qualitative statements their abstracts make.
- Dropped: Marcos 2010 Nat Med (neutrophil extracellular traps in CF), retracted in 2011. Stoltz 2015 N Engl J Med review and Boucher 2019 N Engl J Med review (no PubMed abstract to check against). Saiman 2014 infection-control guideline (no abstract; belongs to pass G). The CF Foundation Patient Registry Annual Data Report (cff.org returned HTTP 403; not in any validation service).
- Not stated because no validated abstract gave it: the ~2–3% prevalence of B. cepacia complex, the exact list of the 12 Fuchs criteria (only "≥4 of 12" is quoted, from VanDevanter 2021), CFTR's 1,480-amino-acid length, and age-specific H. influenzae prevalence figures.
- Shared canonical keys used and checked: Riordan1989 (PMID 2475911), Kerem1989 (2570460), Ramsey2011STRIVE (22047557), Middleton2019ETI (31697873), Fuchs1994Dornase (7503821). None of this pass's works was already in another companion's sources.json (searched for cystic fibrosis, CFTR, bronchiectasis, abscessus and mucociliary).
- No item is marked (unverified).
