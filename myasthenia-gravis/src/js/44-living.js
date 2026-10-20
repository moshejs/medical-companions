/* =============== 4.4 Living with MG =============== */
/* the pregnancy timeline is drawn in segments: planning, three trimesters, birth, newborn weeks 0-4, months 1-6.
   LI_U holds each segment's start as a fraction of the timeline (and so of t). */
const LI_U=[0,.136,.318,.485,.636,.712,.864,1];
const LI_SEG=[['Planning','Before'],['Trimester 1','T1'],['Trimester 2','T2'],['Trimester 3','T3'],['Birth','Birth'],['Newborn wk 0-4','Wk 0-4'],['Months 1-6','Mo 1-6']];
const LI_STEPS=[
 {from:0,at:.05,k:'Months before',t:'Planning, and the drugs that stop',
  txt:'The 2016 international consensus asks for planning well in advance, with multidisciplinary communication through pregnancy, delivery and after birth. It lists mycophenolate mofetil and methotrexate as contraindicated because they are teratogenic; Gilhus adds cyclophosphamide, and says all three should be avoided by any woman who may become pregnant. Rituximab crosses the placenta and Gilhus advises avoiding it in the last months before conception. Thymectomy is postponed until after pregnancy. [[Sanders2016,Norwood2014,Gilhus2020]]',
  pt:'Some MG medicines can harm a developing baby, so they are changed months before trying to get pregnant. Others are safe to keep taking.',
  hook:'<b>Mycophenolate and methotrexate</b> are stopped before conception (teratogenic). Pyridostigmine and prednisone continue. [[Sanders2016]]'},
 {from:.136,at:.2,k:'Weeks 0 to 13',t:'Most worsening comes early',
  txt:'In the 2026 meta-analysis MG worsened in about 30% of pregnancies, most often in the first trimester. If MG is well controlled before pregnancy, the guidance says most women remain stable. Gilhus suggests some exacerbations in pregnancy reflect doses being cut or stopped for fear of harming the baby. A previous pregnancy did not predict the course of the next, and neither did thymectomy, antibody level or disease duration. [[Miegel2026,Sanders2016,Norwood2014,Gilhus2020,Batocchi1999]]',
  pt:'Some women get weaker early in pregnancy, many stay the same and some get better. Stopping medicines out of worry can itself cause a flare.',
  hook:'Maternal IgG does not start crossing the placenta until about <b>week 13</b>, after the organs have formed. [[Gilhus2020]]'},
 {from:.318,at:.4,k:'Weeks 13 to 40',t:'Antibodies cross; azathioprine divides opinion',
  txt:'At weeks 17 to 22 the baby\'s IgG is still only 5 to 10% of the mother\'s, but by delivery the two levels are similar, so the mother\'s receptor antibodies reach the baby too. Oral pyridostigmine is first-line and does not cross the placenta in significant amounts; IV cholinesterase inhibitors may provoke uterine contractions and are not used. Prednisone is the immunosuppressant of choice. IVIG and plasma exchange are used when a prompt response is needed, IVIG often for convenience. [[Gilhus2020,Sanders2016]]',
  pt:'Over the second half of pregnancy the mother\'s antibodies, including the ones that cause MG, pass to the baby. That is why the baby is checked after birth.',
  hook:'Azathioprine: the nonsteroidal immunosuppressant of choice in pregnancy in Europe, but considered high risk in the US, a split resting on few animal studies and case reports. [[Sanders2016]]'},
 {from:.636,at:.67,k:'Labour',t:'The uterus is smooth muscle',
  txt:'MG does not usually affect the uterus, which is smooth muscle, so early labour should not be hindered. The second stage needs striated-muscle effort to push, and fatigability may then worsen. An assisted second stage has been proposed for women symptomatic at delivery, but guidelines aim for spontaneous vaginal delivery, with caesarean section for obstetric reasons. Epidural analgesia is preferred to general anaesthesia when possible, standard MG drugs continue, and birth is planned where neonatal intensive care is available. [[Miegel2026,Banner2022,Sanders2016,Gilhus2020,Norwood2014]]',
  pt:'The womb itself is not weakened by MG. Pushing at the end of labour uses ordinary muscles, which can tire, so the team plans for that.',
  hook:'<b>Magnesium sulfate is not recommended</b> for eclampsia in MG because it blocks neuromuscular transmission; barbiturates or phenytoin usually suffice. [[Sanders2016,MyawareDrugs]]'},
 {from:.712,at:.75,k:'The first weeks',t:'Transient neonatal MG',
  txt:'Maternal antibodies against AChR, MuSK or LRP4 that crossed the placenta can weaken the newborn. Weakness nearly always appears within 24 hours of birth, is most pronounced in the first week, and usually lasts up to 4 weeks as the mother\'s IgG is cleared. Signs are floppiness, poor sucking, swallowing trouble and a weak cry; breathing failure and aspiration are rare but are why the baby is observed on a neonatal ward. Most babies need no treatment; very low-dose pyridostigmine or neostigmine and feeding support help, and IVIG or plasma exchange are very rarely needed. [[Gilhus2018,Gilhus2020]]',
  pt:'Some babies are floppy and feed poorly for a few weeks because they borrowed the mother\'s antibodies. It wears off as those antibodies leave the baby\'s body.',
  hook:'All babies of mothers with MG are examined for transient weakness, even when the mother\'s MG is well controlled. Incidence: about 9 to 13% in most series, 30% in one centre. [[Sanders2016,Norwood2014,Miegel2026,Banner2022,Djelmis2002]]'},
 {from:.864,at:.92,k:'Months 1 to 6',t:'After birth is the riskier time',
  txt:'Worsening after delivery was reported in 27 to 28% of pregnancies, and the guidance says worsening is more likely in the first few months after birth than in pregnancy. The relative risk of MG starting at all was not raised in pregnancy but rose about fivefold in the first 6 months after birth, highest after a first birth. In one series every woman with a puerperal infection had an exacerbation. Breastfeeding is encouraged, including when the baby has neonatal MG: IgG in milk is about 2% of serum levels. [[Miegel2026,Batocchi1999,Sanders2016,Gilhus2020,Djelmis2002]]',
  pt:'The months after the baby arrives are when MG is most likely to flare, so follow-up continues. Breastfeeding is usually fine with the common MG medicines.',
  hook:'Myasthenic crisis: <b>6.4% in pregnancy, 8.2% after birth</b> in a systematic review of 824 pregnancies. [[Banner2022]]'}
];
const LI_DS={
 miegel:{n:'Miegel 2026',d:'meta-analysis of 34 studies, 3,720 pregnancies',c:'[[Miegel2026]]',preg:[30,'30% worsen, most often in T1','30% worsen, mostly T1'],t1:1,post:[27,'27% worsen after birth','27% worsen'],tn:9,
  x:'Preterm birth 9%, vaginal delivery 68% and caesarean 32%, neonatal MG in 9% of 1,530 infants. The authors note definitions and scores varied widely between studies.'},
 banner:{n:'Banner 2022',d:'systematic review of 824 pregnancies',c:'[[Banner2022]]',all:[33.8,'33.8% exacerbation, pregnancy and after birth together','33.8% exacerbation overall'],tn:13,
  x:'Exacerbation 33.8%, crisis 6.4% in pregnancy and 8.2% after birth, spontaneous vaginal delivery 56.3%, transient neonatal MG 13.0%.'},
 batocchi:{n:'Batocchi 1999',d:'47 women, 64 pregnancies',c:'[[Batocchi1999]]',preg:[19,'on therapy: 19% worse · 42% same · 39% better','19% worse, 39% better'],post:[28,'28% worse after delivery','28% worse'],tn:9,
  x:'Of women off therapy and symptom-free, 17% relapsed. Pregnancy did not worsen long-term outcome. Neonatal MG in 5 of 55 babies.'},
 djelmis:{n:'Djelmis 2002',d:'69 pregnancies, one centre',c:'[[Djelmis2002,Gilhus2020]]',preg:[15,'15% worse in pregnancy','15% worse'],post:[16,'a further 16% in the puerperium','16% more'],tn:30,
  x:'Neonatal MG in 30%, the highest figure of any series here. Every woman with a puerperal infection had an exacerbation. Variation between series probably reflects how hard the babies were looked at.'}
};
const LI_DRUGS=[
 ['Pyridostigmine (oral)','<span class="ok">First-line.</span> Does not cross the placenta in significant amounts. IV cholinesterase inhibitors are not used in pregnancy (uterine contractions).','<span class="ok">Not a contraindication.</span>','[[Sanders2016,Gilhus2020]]'],
 ['Prednisone / prednisolone','<span class="ok">Immunosuppressant of choice</span> in pregnancy. The Nordic guidance advises keeping prednisolone under 20 mg a day in pregnancy.','<span class="ok">Not a contraindication.</span>','[[Sanders2016,Gilhus2024,Gilhus2020]]'],
 ['Azathioprine','<span class="mid">Disputed.</span> Considered relatively safe by the consensus, the nonsteroidal choice in Europe, but high risk in the US; a strong minority opposed it.','<span class="ok">Not a contraindication.</span>','[[Sanders2016,Gilhus2018,Gilhus2020]]'],
 ['Ciclosporin','<span class="ok">Relatively safe</span> in the consensus.','Probably safe.','[[Sanders2016,Gilhus2020]]'],
 ['Tacrolimus','Not addressed for pregnancy in the sources read.','Probably safe.','[[Gilhus2020]]'],
 ['Mycophenolate mofetil','<span class="no">Contraindicated, teratogenic.</span> Avoided by any woman who may become pregnant.','<span class="no">Advised against.</span>','[[Sanders2016,Gilhus2020]]'],
 ['Methotrexate','<span class="no">Contraindicated, teratogenic.</span>','<span class="no">Advised against.</span>','[[Sanders2016,Gilhus2020]]'],
 ['Cyclophosphamide','<span class="no">Teratogenic</span>, to be avoided.','<span class="no">Advised against.</span>','[[Gilhus2018,Gilhus2020]]'],
 ['Rituximab','<span class="no">Avoided</span> in the last months before conception and in pregnancy: it crosses the placenta and depletes the baby\'s B cells until about 6 months.','Probably safe; milk levels about 200 times lower than serum.','[[Gilhus2020]]'],
 ['IVIG, plasma exchange','<span class="ok">Useful</span> when a prompt response is needed; IVIG often preferred for convenience.','Not addressed in the sources read.','[[Sanders2016,Gilhus2020]]'],
 ['Eculizumab','Limited human data have not identified a specific developmental concern; a mouse anti-C5 analogue caused abnormalities at 2 to 8 times the human dose.','Not addressed in the sources read.','[[FDASoliris2026]]'],
 ['Ravulizumab','Not summarised in the sources read.','<span class="no">Label advises against</span> breastfeeding during treatment and for 8 months after the last dose.','[[FDAUltomiris2025]]'],
 ['Zilucoplan','No human data; embryofetal death in monkeys at exposures similar to human levels. A pregnancy registry exists.','Not addressed in the sources read.','[[FDAZilbrysq2026]]'],
 ['Efgartigimod','No adverse embryofetal findings in rats or rabbits at 3 to 10 times the human dose. It lowers maternal IgG, so less passive immunity in the newborn is expected and live vaccines for exposed infants need weighing. Registry exists.','No human milk information.','[[FDAVyvgart2026]]'],
 ['Rozanolixizumab','Limited human data; embryonic death and impaired immune function in monkeys above clinical doses. Registry exists.','Not addressed in the sources read.','[[FDARystiggo2026]]']
];
const LI_DOM={
 surg:{n:'Surgery & anaesthesia',t:'Anaesthesia can usually be managed',ev:['est','Established'],
  rows:[{k:'h',l:'Vecuronium dose for a 95% block (ED95)'},{k:'bar',l:'With MG',v:20,max:40,txt:'20 µg/kg',c:'var(--ab)'},{k:'bar',l:'Without MG',v:36,max:40,txt:'36 µg/kg',c:'var(--muted)'},
   {k:'h',l:'Succinylcholine dose needed, times normal'},{k:'bar',l:'With MG (up to)',v:2.6,max:3,txt:'2.6×',c:'var(--ab)'},{k:'bar',l:'Without MG',v:1,max:3,txt:'1×',c:'var(--muted)'},
   {k:'h',l:'Crisis after thymectomy: relative risk (15 studies, 2,626 people)'},{k:'ratio',l:'Bulbar symptoms',v:3.59},{k:'ratio',l:'Previous crisis',v:3.36},{k:'ratio',l:'Postoperative complications',v:2.59},{k:'ratio',l:'Thymoma',v:2.10},{k:'ratio',l:'High-dose steroids',v:.41}],
  cap:'Vecuronium: Eisenkraft 1990. Succinylcholine: cited through Bhat 2024 (original paper not accessible). Relative risks: Geng 2020, point estimates. [[Eisenkraft1990,Bhat2024,Geng2020]]',
  body:[['Before the operation','The consensus calls preoperative plasma exchange or IVIG appropriate for people with significant bulbar dysfunction. A review says that with thorough evaluation, continued daily pyridostigmine and careful monitoring, people with MG can usually be anaesthetised, general or nerve block, without postoperative ventilation. [[Sanders2016,BlichfeldtLauridsen2012]]'],
   ['Muscle relaxants','People with MG needed about half the usual vecuronium: ED50, ED90 and ED95 were 50%, 55% and 56% of normal, unaffected by preoperative pyridostigmine or steroids. Fewer receptors make them resistant to succinylcholine instead, up to 2.6 times the usual dose. Volatile agents or epidurals can avoid relaxants altogether; when used, smaller doses with monitoring. [[Eisenkraft1990,Bhat2024,BlichfeldtLauridsen2012]]'],
   ['Sugammadex','A systematic review of 24 studies found train-of-four recovery from 79.7 seconds to 10 minutes, short extubation times, low postoperative crisis rates and no deaths, from limited evidence. Reversal failure has been reported. [[Kaye2025,Bhat2024]]'],
   ['Leventhal factors','In 24 thymectomy patients, four preoperative factors classified 91% correctly for postoperative ventilation: MG for 6 years or more, chronic respiratory disease, pyridostigmine 750 mg a day or more, and vital capacity 2.9 L or less. It had no value in 41 other operations, and in 36 later thymectomies sensitivity was 22.2%; there, ventilation went with balanced anaesthesia (OR 4.2) and especially muscle relaxants (OR 13.9). [[Leventhal1980,Grant1982,Chevalley2001]]']],
  hook:'MG is <b>sensitive to non-depolarising</b> relaxants (about half the vecuronium dose) and <b>resistant to succinylcholine</b> (up to 2.6 times). [[Eisenkraft1990,Bhat2024]]',
  pt:'Anaesthetists plan around MG. With preparation, most people with MG have operations without needing a ventilator afterwards; the muscle-relaxing drugs are the part that needs care.'},
 exer:{n:'Exercise',t:'Small trials, and a guideline gap',ev:['early','Early evidence'],
  rows:[{k:'h',l:'8 weeks of training, generalised MG (n = 15)'},{k:'bar',l:'Adherence',v:95,txt:'95%',c:'var(--achr)'},{k:'bar',l:'More fatigue during training',v:20,txt:'3 of 15',c:'var(--ab)'},{k:'bar',l:'Bulbar symptoms during training',v:13.3,txt:'2 of 15',c:'var(--ab)'},
   {k:'h',l:'Fatigue in a Dutch registry (n = 420)'},{k:'bar',l:'Severe fatigue',v:62,txt:'62%',c:'var(--ab)'},
   {k:'txt',l:'Severe fatigue was linked to disease severity, female sex, BMI and depressive symptoms, and inversely to strenuous physical activity.'}],
  cap:'Rahbek 2017; Ruiter 2021. [[Rahbek2017,Ruiter2021]]',
  body:[['The trials','Fifteen people with generalised MG were randomised to 8 weeks of progressive resistance or aerobic training: adherence 95%, QMG unchanged, and the resistance group gained strength and function. Ten people with mild MG trained twice a week for 12 weeks with no change in the MG Composite, better performance and normal muscle enzymes. Inspiratory muscle training in a randomised trial of 27 raised inspiratory and expiratory pressures but not lung function. [[Rahbek2017,Westerberg2017,Fregonezi2005]]'],
   ['Where guidance disagrees','A 2019 review says active physical training should be encouraged, and a 2020 review says people with mild MG can follow general exercise recommendations. The 2020 international consensus update left exercise out because the evidence was low quality. [[Gilhus2019,OConnor2020,Narayanaswami2021]]']],
  hook:'Exercise in MG has <b>small pilot trials only</b>, and the 2020 consensus update made no exercise recommendation for that reason. [[Narayanaswami2021]]',
  pt:'Small studies suggest supervised exercise is possible and can build strength, but there is not yet enough research for firm guidance.'},
 heat:{n:'Heat & cold',t:'Temperature changes transmission',ev:['early','Early evidence'],
  rows:[{k:'h',l:'Muscle cooling and transmission (28 patients)'},{k:'band',l:'Severe cooling: transmission failed',lo:18,hi:22,min:10,max:40,u:'°C',c:'var(--nerve)'},
   {k:'txt',l:'Slight local cooling reduced the electrical decrement, but the force decrement also increased, so cooling was not practical as a therapy.'},
   {k:'txt',l:'No controlled study measuring heat-induced worsening of MG was found.'}],
  cap:'Ricker 1977. [[Ricker1977]]',
  body:[['Cooling','In 28 patients, slight local cooling reduced the electrophysiological decrement while the force decrement increased, so cooling was not useful as treatment. Severe cooling to 18 to 22 °C caused transmission failure. [[Ricker1977]]'],
   ['The ice-pack test','Ice over the drooping eyelid for up to 5 minutes is a bedside sign used in children. [[OConnell2020]]'],
   ['Heat','No controlled study quantifying heat-induced worsening of MG was found for this page.']],
  hook:'In one 1977 study slight cooling reduced the electrical decrement; separately, the <b>ice-pack test</b> over a drooping eyelid is a bedside sign used in children. [[Ricker1977,OConnell2020]]',
  pt:'Cooling changes how the nerve signal crosses to the muscle. Whether heat makes MG worse has not been measured in a controlled study found for this page.'},
 sleep:{n:'Sleep',t:'Sleep apnoea is common',ev:['early','Early evidence'],
  rows:[{k:'h',l:'Obstructive sleep apnoea'},{k:'bar',l:'In MG',v:36,txt:'36%',c:'var(--ab)'},{k:'bar',l:'Expected, general population',rng:[15,20],v:20,txt:'15–20%',c:'var(--muted)'},
   {k:'h',l:'Sleep apnoea syndrome (with symptoms)'},{k:'bar',l:'In MG',v:11,txt:'11%',c:'var(--ab)'},{k:'bar',l:'Expected',v:3,txt:'3%',c:'var(--muted)'}],
  cap:'Nicolle 2006. [[Nicolle2006]]',
  body:[['The numbers','Obstructive sleep apnoea was found in 36% of people with MG against an expected 15 to 20%, and the symptomatic syndrome in 11% against 3%. [[Nicolle2006]]'],
   ['Why it matters here','Fatigue in MG has several sources. A Dutch registry linked severe fatigue to depressive symptoms and BMI as well as disease severity, so sleep and mood are part of the picture. [[Ruiter2021]]']],
  hook:'Sleep apnoea in about <b>one in three</b> people with MG in the one study found. [[Nicolle2006]]',
  pt:'Sleep apnoea, where breathing stops and starts during sleep, was about twice as common in MG as expected in the one study found.'},
 mood:{n:'Mood',t:'Depression and anxiety are common',ev:['est','Meta-analysis'],
  rows:[{k:'h',l:'Pooled prevalence (38 studies)'},{k:'bar',l:'Depression',v:36,ci:[28,45],txt:'36%',c:'var(--ab)'},{k:'bar',l:'Anxiety',v:33,ci:[25,42],txt:'33%',c:'var(--ab)'},
   {k:'h',l:'Depression by severity'},{k:'bar',l:'Mild',v:27,txt:'27%',c:'var(--warn)'},{k:'bar',l:'Moderate',v:14,txt:'14%',c:'var(--warn)'},{k:'bar',l:'Severe',v:9,txt:'9%',c:'var(--bad)'},
   {k:'h',l:'SF-36, 1,660 people with MG vs 2,556 controls (0 to 100)'},{k:'bar',l:'Physical functioning, MG',v:56,txt:'56.0',c:'var(--ab)'},{k:'bar',l:'Physical functioning, controls',v:81.8,txt:'81.8',c:'var(--muted)'},{k:'bar',l:'Mental health, MG',v:67.3,txt:'67.3',c:'var(--ab)'},{k:'bar',l:'Mental health, controls',v:74.1,txt:'74.1',c:'var(--muted)'}],
  cap:'Nadali 2023 (lines are 95% CIs); Lehnerer 2022. [[Nadali2023,Lehnerer2022]]',
  body:[['How common','A meta-analysis of 38 studies put depression at 36% (95% CI 28 to 45%) and anxiety at 33% (25 to 42%). [[Nadali2023]]'],
   ['Quality of life','In a German survey of 1,660 people with MG, SF-36 physical functioning was 56.0 against 81.8 in controls, and mental health 67.3 against 74.1. Lower quality of life went with depression, anxiety, fatigue, low income and low social support. [[Lehnerer2022]]'],
   ['A trap','Low mood and depression-related fatigue can be mistaken for myasthenic weakness and lead to overtreatment. [[OConnell2020]]']],
  hook:'About <b>a third</b> of people with MG have depression and about a third anxiety; low mood can masquerade as weakness. [[Nadali2023,OConnell2020]]',
  pt:'Feeling low or anxious is common with MG, and low mood can be mistaken for muscle weakness.'},
 work:{n:'Work',t:'About half are employed',ev:['est','Meta-analysis'],
  rows:[{k:'h',l:'Employment (19 studies, 3,600 people, mean age 47.5)'},{k:'bar',l:'Employed, pooled',v:50,ci:[41,60],txt:'50%',c:'var(--nerve)'},{k:'bar',l:'Range between studies',rng:[28,82],v:82,txt:'28–82%',c:'var(--muted)'},
   {k:'txt',l:'Lower employment went with generalised, bulbar and respiratory symptoms.'}],
  cap:'Guastafierro 2020 (line is the 95% CI). [[Guastafierro2020]]',
  body:[['The numbers','A meta-analysis of 19 studies and 3,600 people found 50% employed (95% CI 41 to 60%), ranging from 28% to 82% between studies. Employment was lower with generalised, bulbar and respiratory symptoms. [[Guastafierro2020]]'],
   ['Fatigability at work','Myaware reminds nurses that a task possible earlier in the day may not be possible later; the same applies to a working day. [[MyawareNurses]]']],
  hook:'Pooled employment in MG: <b>50%</b>, lower with bulbar and respiratory involvement. [[Guastafierro2020]]',
  pt:'Many people with MG keep working. Symptoms that affect speech, swallowing or breathing make it harder.'},
 drive:{n:'Driving',t:'Double vision and the licence (UK)',ev:['est','UK rules'],
  rows:[{k:'flow',cols:[{h:'Car or motorcycle (Group 1)',s:['MG: tell the DVLA on form CN1. Not disclosing can bring a fine of up to £1,000.','Double vision: stop driving and notify the DVLA.','Driving may resume once it is controlled, for example by glasses, or with a patch worn while driving (monocular rules then apply).','Stable uncorrected double vision for 6 months or more may be licensable with a specialist report of good adaptation.']},
   {h:'Bus or lorry (Group 2)',s:['MG: tell the DVLA on form CN1V.','Double vision: stop driving.','Patching is not acceptable.','Insuperable double vision means the licence is refused or revoked.']}]}],
  cap:'GOV.UK / DVLA. No US national rule specific to MG was found. [[DVLAMG,DVLAVision]]',
  body:[['Group 1','People with MG must tell the DVLA (form CN1), and failure to disclose can bring a fine of up to £1,000. With double vision, driving stops and the DVLA is told; it may resume once the double vision is controlled by glasses or by a patch worn while driving, under the monocular rules. Stable uncorrected double vision of 6 months or more may be licensable with a specialist report. [[DVLAMG,DVLAVision]]'],
   ['Group 2','Bus and lorry drivers use form CN1V. Patching is not acceptable, and insuperable double vision means refusal or revocation. [[DVLAMG,DVLAVision]]'],
   ['Elsewhere','No US national driving rule specific to MG was found; rules differ by country and state.']],
  hook:'UK car drivers with double vision may drive again with a <b>patch</b>; bus and lorry drivers may not. [[DVLAVision]]',
  pt:'If MG causes double vision, there are rules about driving. In the UK the licensing agency must be told.'},
 vacc:{n:'Vaccines & infections',t:'Infection is a bigger trigger than vaccines',ev:['est','Trials and cohorts'],
  rows:[{k:'h',l:'Flu vaccine trial: protected (seroprotection)'},{k:'bar',l:'H3N2, MG',v:89.4,txt:'89.4%',c:'var(--achr)'},{k:'bar',l:'H3N2, healthy controls',v:93.6,txt:'93.6%',c:'var(--muted)'},{k:'bar',l:'H1N1, MG',v:95.7,txt:'95.7%',c:'var(--achr)'},{k:'bar',l:'H1N1, healthy controls',v:97.9,txt:'97.9%',c:'var(--muted)'},
   {k:'h',l:'MG admissions in the 6 weeks after flu vaccine'},{k:'ratio',l:'Relative incidence',v:.84,ci:[.65,1.09]},
   {k:'h',l:'MG worsened after… (survey of 258)'},{k:'bar',l:'Influenza-like illness',v:40,txt:'40%',c:'var(--ab)'},{k:'bar',l:'Common cold',v:15.6,txt:'15.6%',c:'var(--ab)'},{k:'bar',l:'Flu vaccination',v:1.5,txt:'1.5%',c:'var(--achr)'},
   {k:'h',l:'COVID-19: MG vs matched controls (Ontario)'},{k:'bar',l:'Admitted to hospital, MG',v:30.5,txt:'30.5%',c:'var(--ab)'},{k:'bar',l:'Admitted, controls',v:15.1,txt:'15.1%',c:'var(--muted)'},{k:'bar',l:'Died within 30 days, MG',v:14.6,txt:'14.6%',c:'var(--ab)'},{k:'bar',l:'Died, controls',v:8.5,txt:'8.5%',c:'var(--muted)'}],
  cap:'Strijbos 2019; Zinman 2009 (line is the 95% CI); Seok 2017; Alcantara 2023. [[Strijbos2019,Zinman2009,Seok2017,Alcantara2023]]',
  body:[['Flu vaccine','In a randomised trial of 47 people with AChR MG, protection matched healthy controls, antibody titres did not change, MG did not flare, and immunosuppression did not significantly blunt the response. A population study found MG admissions in the 6 weeks after vaccination were not raised (relative incidence 0.84, 95% CI 0.65 to 1.09). [[Strijbos2019,Zinman2009]]'],
   ['Infection itself','MG worsened in 40% after an influenza-like illness against 1.5% after flu vaccination. In Ontario, people with MG who caught COVID-19 were admitted twice as often as controls and died more often; vaccination lowered infection risk (HR 0.43), and fewer than 6 of 3,461 first doses were followed by MG admission. Serious infections overall were more common in MG (adjusted HR 1.39), most often bacterial pneumonia. [[Seok2017,Alcantara2023,Kassardjian2020]]'],
   ['Live vaccines','Inactivated and subunit vaccines are considered safe and effective. Live vaccines are avoided if possible in people on immunosuppression, and the efgartigimod and rozanolixizumab labels advise against them during treatment. A few antibiotics are avoided because they affect transmission. [[Sansone2022,Gilhus2018b,FDAVyvgart2026,FDARystiggo2026]]']],
  hook:'MG worsened after <b>40%</b> of flu-like illnesses but <b>1.5%</b> of flu vaccinations. [[Seok2017]]',
  pt:'Infections are much more likely to set off MG than vaccines are. Live vaccines are the exception to discuss if someone is on immune-lowering medicine.'},
 kids:{n:'Children',t:'Juvenile MG',ev:['est','Reviews'],
  rows:[{k:'h',l:'Antibody-positive juvenile MG, UK'},{k:'bar',l:'AChR antibodies',v:95,txt:'95%',c:'var(--ab)'},{k:'bar',l:'MuSK antibodies',v:5,txt:'5%',c:'var(--musk)'},{k:'bar',l:'Diagnosed under age 10',v:20,txt:'20%',c:'var(--nerve)'},
   {k:'h',l:'Spontaneous remission (Norway)'},{k:'bar',l:'Pre-pubertal',v:14,txt:'14%',c:'var(--achr)'},{k:'bar',l:'Post-pubertal',v:5,txt:'5%',c:'var(--muted)'}],
  cap:'O\'Connell 2020. [[OConnell2020]]',
  body:[['Who','Juvenile MG is MG before 18. UK incidence of antibody-positive disease is about 1.5 per million person-years, 95% AChR and 5% MuSK, with only 20% diagnosed under 10. Ocular disease is more frequent before puberty, and spontaneous remission is more frequent than in adults. [[OConnell2020]]'],
   ['Treatment differences','Young children with only ocular MG can start with pyridostigmine alone. Steroids bring growth failure, poor bone mineralisation and infection risk, so the lowest effective dose is used, with maintenance IVIG or plasma exchange as alternatives. Ophthalmology input helps prevent amblyopia, and in crisis plasma exchange is preferred for speed where feasible in very young children. [[Sanders2016,OConnell2020]]'],
   ['Vaccines','In children on steroids, delayed live vaccination contributes to infection susceptibility. [[Sanders2016]]']],
  hook:'Ophthalmology input is needed in juvenile MG to prevent <b>amblyopia</b>. [[OConnell2020]]',
  pt:'Children can get MG too. Their care watches growth and eyesight as well as strength.'},
 older:{n:'Older adults',t:'Late-onset MG',ev:['est','Cohorts'],
  rows:[{k:'h',l:'Osteoporosis in MG (Taiwan): hazard ratio'},{k:'ratio',l:'All MG',v:1.96},{k:'ratio',l:'With corticosteroids',v:2.37},{k:'ratio',l:'Without corticosteroids',v:1.52},
   {k:'h',l:'Fracture in MG (Ontario): hazard ratio'},{k:'ratio',l:'All MG',v:.74},
   {k:'h',l:'Sera from people 75 or older'},{k:'bar',l:'AChR-antibody positive (scale to 5%)',v:.7,max:5,txt:'0.7%',c:'var(--ab)'}],
  cap:'Yeh 2014; Kassardjian 2021; Vincent 2003. Point estimates. [[Yeh2014,Kassardjian2021,Vincent2003]]',
  body:[['Who','Late-onset MG starts at 65 or older. Its incidence is rising, it is more common in men, it often presents with eye or bulbar weakness, and death is often from other illness. UK incidence rose steeply from 45 to 74, reaching 9.9 per 100,000 in men. 0.7% of sera from people 75 or older had AChR antibodies, mostly undiagnosed. [[Alkhawajah2013,Vincent2003]]'],
   ['Bones, and a disagreement','In Taiwan, MG carried a hazard ratio of 1.96 for osteoporosis (2.37 with steroids, 1.52 without). In Ontario, people with MG had fewer fractures than comparators (HR 0.74), which the authors suggest may reflect osteoporosis prevention. [[Yeh2014,Kassardjian2021]]'],
   ['Medicines','Comorbidity is frequent in older people with MG. Pyridostigmine needs caution in the elderly, the frail and in heart disease (an ECG is suggested), and lower doses may be needed in renal impairment. [[Gilhus2019,RightDecisionsPyrido2025]]']],
  hook:'MG is <b>probably underdiagnosed</b> in older people: 0.7% of sera from people 75 or older carried AChR antibodies, mostly without a diagnosis. [[Vincent2003]]',
  pt:'MG can start late in life, and it is probably underdiagnosed in older people.'}
};
inits.living=()=>{
  /* ======== pregnancy to newborn ======== */
  let ds='miegel',farad=false;
  const svg=$('#liSvg'),rg=$('#liT');
  $('#liSet').innerHTML='<span class="kicker">Numbers from</span>'+Object.entries(LI_DS).map(([k,v])=>`<button class="btn" data-lids="${k}" aria-pressed="${k===ds}">${v.n}</button>`).join('');
  const segOf=u=>{let i=0;for(let k=0;k<7;k++)if(u>=LI_U[k])i=k;return i};
  const fr=(u,i)=>clamp((u-LI_U[i])/(LI_U[i+1]-LI_U[i]));
  const wU=w=>w<=13?lerp(LI_U[1],LI_U[2],w/13):w<=27?lerp(LI_U[2],LI_U[3],(w-13)/14):lerp(LI_U[3],LI_U[4],(w-27)/13);
  const gw=u=>{const i=segOf(u);return i===1?13*fr(u,1):i===2?13+14*fr(u,2):i===3?27+13*fr(u,3):null};
  /* fetal IgG as a fraction of maternal: 0 until week 13, 5-10% at weeks 17-22, similar at delivery; schematic fall after birth */
  const iggW=w=>w<13?0:w<17?lerp(0,.05,(w-13)/4):w<22?lerp(.05,.1,(w-17)/5):Math.min(1,.1+.9*Math.pow((w-22)/18,1.6));
  const iggU=u=>{const i=segOf(u);if(i===0)return 0;if(i<=3)return iggW(gw(u));if(i===4)return 1;if(i===5)return Math.exp(-1.05*fr(u,5));return .35*Math.exp(-3.2*fr(u,6))};
  const when=u=>{const i=segOf(u),f=fr(u,i);return i===0?`${Math.max(1,Math.round(6-6*f))} months before conception`:i<=3?`Pregnancy week ${Math.max(1,Math.round(gw(u)))}`:i===4?'Labour and birth':i===5?`Newborn day ${Math.round(28*f)}`:`Month ${Math.min(6,1+Math.floor(5*f))} after birth`};
  function person(x,y,on,c){return `<circle cx="${f1(x)}" cy="${f1(y-15)}" r="5" style="fill:${on?c:'var(--panel-2)'}"/><path d="M${f1(x-7)} ${f1(y+6)}v-8a7 7 0 0 1 14 0v8z" style="fill:${on?c:'var(--panel-2)'}"/>`}
  function fetus(x,y,sc,o){return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${sc})" style="opacity:${f1(o)}"><ellipse cx="4" cy="8" rx="20" ry="15" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.5"/><circle cx="-12" cy="-12" r="12" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.5"/><path d="M14 18q8 6 2 12" style="fill:none;stroke:var(--memb);stroke-width:2;stroke-linecap:round"/></g>`}
  function draw(t){
    const N=vb(svg,'720 580','400 760'),u=t,si=segOf(u),Dd=LI_DS[ds];
    const L=N?{X0:20,X1:380,seg:[34,56],l1:76,b1:136,cr:146,crT:158,l2:182,r:[196,220,244],l3:278,cT:290,cB:338,l4:360,bb:378,bT:396,cur:[30,402],
                px:20,py:418,pw:360,ph:160,ix:20,iy:594,iw:360,ih:150}
             :{X0:30,X1:690,seg:[34,56],l1:76,b1:136,cr:146,crT:158,l2:182,r:[196,220,244],l3:278,cT:290,cB:338,l4:360,bb:378,bT:396,cur:[30,402],
                px:30,py:418,pw:330,ph:152,ix:376,iy:418,iw:314,ih:152};
    const X=v=>L.X0+v*(L.X1-L.X0),XS=i=>X(LI_U[i]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${L.X0}" y="20" class="t-lbl">${when(u)}</text><text x="${L.X1}" y="20" class="t-xs t-end">numbers: ${Dd.n}</text>`;
    /* segment header */
    LI_SEG.forEach(([w,n],i)=>{const a=XS(i),b=XS(i+1),on=i===si;
      s+=`<rect x="${f1(a+1)}" y="${L.seg[0]}" width="${f1(b-a-2)}" height="${L.seg[1]-L.seg[0]}" rx="5" style="fill:${on?'var(--ab-soft)':'var(--panel-2)'};stroke:${on?'var(--ab)':'none'}"/>`;
      s+=`<text x="${f1((a+b)/2)}" y="${L.seg[1]-7}" class="t-xs t-mid" style="fill:${on?'var(--ab)':'var(--muted)'};font-weight:${on?700:500}">${N?n:w}</text>`});
    /* lane 1: worsening */
    s+=`<text x="${L.X0}" y="${L.l1}" class="t-sm">MOTHER · SHARE OF PREGNANCIES IN WHICH MG WORSENED</text>`;
    const bh=v=>v/40*(L.b1-L.l1-14);
    const bar=(a,b,v,lab,lbn,emph)=>{const h=bh(v),top=L.b1-h;let r='';
      if(emph){r+=`<rect x="${f1(a)}" y="${f1(top)}" width="${f1(XS(2)-a)}" height="${f1(h)}" style="fill:var(--ab);opacity:.8"/><rect x="${f1(XS(2))}" y="${f1(top)}" width="${f1(b-XS(2))}" height="${f1(h)}" style="fill:var(--ab);opacity:.35"/>`}
      else r+=`<rect x="${f1(a)}" y="${f1(top)}" width="${f1(b-a)}" height="${f1(h)}" style="fill:var(--ab);opacity:.6"/>`;
      r+=`<circle cx="${f1(a+7)}" cy="${f1(top)}" r="4" style="fill:var(--ab);stroke:var(--field);stroke-width:1.5"/>`;
      r+=`<text x="${f1(a+15)}" y="${f1(top-4)}" class="t-xs" style="fill:var(--ink)">${N?lbn:lab}</text>`;return r};
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.b1}" y2="${L.b1}" class="axis"/>`;
    if(Dd.all)s+=bar(XS(1),XS(7),Dd.all[0],Dd.all[1],Dd.all[2]);
    else{s+=bar(XS(1),XS(4),Dd.preg[0],Dd.preg[1],Dd.preg[2],Dd.t1);s+=bar(XS(5),XS(7),Dd.post[0],Dd.post[1],Dd.post[2])}
    s+=`<rect x="${f1(XS(1))}" y="${L.cr}" width="${f1(XS(4)-XS(1))}" height="5" rx="2" style="fill:var(--bad)"/><rect x="${f1(XS(5))}" y="${L.cr}" width="${f1(XS(7)-XS(5))}" height="5" rx="2" style="fill:var(--bad)"/>`;
    s+=`<text x="${f1(XS(1))}" y="${L.crT}" class="t-xs" style="fill:var(--bad)">${N?'crisis 6.4%':'myasthenic crisis 6.4% in pregnancy (Banner 2022)'}</text><text x="${f1(XS(5))}" y="${L.crT}" class="t-xs" style="fill:var(--bad)">${N?'crisis 8.2%':'crisis 8.2% after birth'}</text>`;
    /* lane 2: medicines */
    s+=`<text x="${L.X0}" y="${L.l2}" class="t-sm">MEDICINES · as published guidance</text>`;
    const mb=(a,b,y,c,lab,dash)=>`<rect x="${f1(a)}" y="${y+4}" width="${f1(b-a)}" height="6" rx="3" style="fill:${dash?'none':c};stroke:${c};stroke-width:${dash?1.4:0};${dash?'stroke-dasharray:4 3':''}"/><text x="${f1(a)}" y="${y}" class="t-xs" style="fill:${c}">${lab}</text>`;
    s+=mb(XS(0),XS(7),L.r[0],'var(--achr)',N?'pyridostigmine, prednisone: continued':'pyridostigmine and prednisone: continued throughout');
    s+=mb(XS(0),XS(1)-4,L.r[1],'var(--bad)',N?'mycophenolate, methotrexate: stop':'mycophenolate, methotrexate (teratogenic): stopped before conception');
    s+=`<path d="M${f1(XS(1)-8)} ${L.r[1]+1}l8 12m0 -12l-8 12" style="stroke:var(--bad);stroke-width:2"/>`;
    s+=mb(XS(1),XS(4),L.r[2],'var(--warn)',N?'azathioprine: EU yes, US wary':'azathioprine: Europe yes, US high risk',true);
    s+=mb(XS(5),XS(7),L.r[2],'var(--achr)',N?'breastfeeding':'breastfeeding encouraged');
    const xm=(XS(4)+XS(5))/2;
    s+=`<path d="M${f1(xm-6)} ${L.r[1]-2}l12 12m0 -12l-12 12" style="stroke:var(--bad);stroke-width:2.2"/>`;
    s+=`<text x="${f1(xm)}" y="${L.r[2]+22}" class="t-xs t-mid" style="fill:var(--bad)">${N?'no Mg':'no MgSO4'}</text>`;
    /* lane 3: maternal IgG reaching the baby */
    s+=`<text x="${L.X0}" y="${L.l3}" class="t-sm">${N?'MATERNAL IgG IN BABY · % of mother · schematic':'MATERNAL IgG IN THE BABY · share of the mother\'s level · schematic curve'}</text>`;
    const CY=v=>L.cB-v*(L.cB-L.cT);
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.cB}" y2="${L.cB}" class="axis"/><line x1="${L.X0}" x2="${L.X1}" y1="${L.cT}" y2="${L.cT}" class="grid"/>`;
    let pa='',pb='';for(let i=0;i<=300;i++){const v=i/300,pt=`${f1(X(v))} ${f1(CY(iggU(v)))}`;if(v<=LI_U[5])pa+=(pa?'L':'M')+pt;else pb+=(pb?'L':'M')+pt}
    s+=`<path d="${pa}" style="fill:none;stroke:var(--ab);stroke-width:2.2"/><path d="M${f1(X(LI_U[5]))} ${f1(CY(1))}${pb.replace(/^M/,'L')}" style="fill:none;stroke:var(--ab);stroke-width:2;stroke-dasharray:4 3"/>`;
    s+=`<rect x="${f1(X(wU(17)))}" y="${f1(CY(.1))}" width="${f1(X(wU(22))-X(wU(17)))}" height="${f1(CY(.05)-CY(.1))}" style="fill:var(--ab)"/>`;
    s+=`<circle cx="${f1(X(wU(13)))}" cy="${L.cB}" r="4" style="fill:var(--ab)"/><circle cx="${f1(XS(4))}" cy="${f1(CY(1))}" r="4" style="fill:var(--ab)"/>`;
    s+=`<text x="${f1(X(wU(13)))}" y="${L.cB+12}" class="t-xs t-mid">wk 13</text><text x="${f1(X(wU(19.5)))}" y="${f1(CY(.1)-5)}" class="t-xs t-mid">5–10%</text>`;
    if(!N)s+=`<text x="${f1(XS(4)+6)}" y="${f1(CY(1)+14)}" class="t-xs">≈ mother</text>`;
    s+=`<text x="${L.X1}" y="${f1(CY(.62))}" class="t-xs t-end">${N?'schematic':'schematic fall'}</text>`;
    s+=`<circle cx="${f1(X(u))}" cy="${f1(CY(iggU(u)))}" r="5" style="fill:var(--field);stroke:var(--ab);stroke-width:2.2"/>`;
    /* lane 4: the baby */
    s+=`<text x="${L.X0}" y="${L.l4}" class="t-sm">BABY · ${N?'movement, then neonatal MG':'fetal movement, then the newborn weeks'}</text>`;
    let wp='';for(let i=0;i<=240;i++){const v=lerp(LI_U[1],LI_U[4],i/240),w=gw(v)||0,amp=ramp(w,6,18)*(farad?1-.85*ramp(w,13,26):1)*6;wp+=(i?'L':'M')+f1(X(v))+' '+f1(L.bb+Math.sin(i*1.3)*amp)}
    s+=`<path d="${wp}" style="fill:none;stroke:${farad?'var(--comp)':'var(--nerve)'};stroke-width:1.4"/>`;
    if(farad)s+=`<text x="${f1(XS(2))}" y="${L.bT}" class="t-xs" style="fill:var(--comp)">${N?'less movement':'movement fades: fetal AChR blocked'}</text>`;
    else s+=`<text x="${f1(XS(1))}" y="${L.bT}" class="t-xs">fetal movement</text>`;
    const a5=XS(5),a6=XS(6);
    for(let i=0;i<28;i++){const d=i+.5,op=d<1?.6:d<7?1:1-(d-7)/21*.85;s+=`<rect x="${f1(lerp(a5,a6,i/28))}" y="${L.bb-6}" width="${f1((a6-a5)/28+.4)}" height="12" style="fill:var(--ab);opacity:${f1(op)}"/>`}
    s+=`<text x="${L.X1}" y="${L.bT}" class="t-xs t-end" style="fill:var(--ab)">${N?`TNMG ${Dd.tn}% of babies`:`neonatal MG: ${Dd.tn}% of babies`}</text>`;
    /* cursor */
    const xc=X(u);s+=`<line x1="${f1(xc)}" x2="${f1(xc)}" y1="${L.cur[0]}" y2="${L.cur[1]}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/>`;
    /* placenta scene */
    const {px,py,pw,ph}=L,lv=iggU(u),born=si>=5,preg=si>=1&&si<=4;
    s+=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${px+12}" y="${py+18}" class="t-sm">${born?'THE BABY, AFTER BIRTH':preg?'ACROSS THE PLACENTA':'BEFORE PREGNANCY'}</text>`;
    const mx0=px+12,mx1=px+pw*.3,bx=px+pw*.36,fx=px+pw*.6,fy=py+ph*.5;
    s+=`<rect x="${mx0}" y="${py+28}" width="${f1(mx1-mx0)}" height="${ph-58}" rx="8" style="fill:var(--ab-soft);opacity:${born?.35:1}"/>`;
    s+=`<text x="${f1((mx0+mx1)/2)}" y="${py+ph-14}" class="t-xs t-mid">mother</text>`;
    for(let i=0;i<6;i++){const cI=i%2,rI=Math.floor(i/2);s+=igg(lerp(mx0,mx1,cI?.68:.32),py+46+rI*(ph-100)/2+(cI?10:0),7,(cI?.35:-.35),born?.35:1)}
    if(preg){s+=`<path d="M${f1(bx)} ${py+28}q8 14 0 28t0 28t0 28" style="fill:none;stroke:var(--memb);stroke-width:12;opacity:.45;stroke-linecap:round"/>`;
      s+=`<text x="${f1(bx)}" y="${py+ph-14}" class="t-xs t-mid">placenta</text>`;
      const n=Math.round(lv*7);for(let i=0;i<n;i++){const ph2=((u*40+i/n)%1);s+=igg(lerp(bx+12,fx-26,ph2),py+40+((i*37)%(ph-80)),6,Math.PI/2,clamp(ph2*3)*.9)}}
    if(si>=1)s+=fetus(fx,fy-6,born?1.15:si===4?1:lerp(.45,1,(gw(u)||0)/40),1);
    if(si>=1){const nb=Math.round(lv*5);for(let i=0;i<nb;i++){const a=i/5*Math.PI*2+.3;s+=igg(fx+Math.cos(a)*38,fy-6+Math.sin(a)*30,6,a+Math.PI/2,.9)}}
    s+=`<text x="${f1(fx)}" y="${py+ph-14}" class="t-xs t-mid">${born?'newborn':si>=1?'baby':''}</text>`;
    if(si===0)s+=`<text x="${f1(fx)}" y="${f1(fy)}" class="t-xs t-mid">no transfer yet</text>`;
    /* the baby's receptors with maternal antibodies on them */
    if(si>=2){const ry=py+ph-30,rx0=px+pw-80;s+=`<line x1="${rx0-8}" x2="${rx0+66}" y1="${ry}" y2="${ry}" style="stroke:var(--memb);stroke-width:2"/>`;
      for(let k=0;k<3;k++){const x=rx0+k*24+8,on=lv>(k+1)/4;s+=achr(x,ry,10,on?0:.6,1,farad&&!born?'var(--comp)':'var(--achr)');if(on)s+=igg(x,ry-20,6,Math.PI,1)}
      s+=`<text x="${rx0+32}" y="${ry+12}" class="t-xs t-mid">${farad&&!born?'fetal AChR':"baby's AChR"}</text>`}
    /* icon array */
    const {ix,iy,iw,ih}=L;let ttl,val,c='var(--ab)',cap;
    if(si===0){ttl='Planning: no number to show';val=0;cap='Well controlled before: most stay stable (Sanders 2016)'}
    else if(si<=3){val=Dd.all?Dd.all[0]:Dd.preg[0];ttl=`Of 20 pregnancies, about ${Math.round(val/5)} with worsening`;cap=`${Dd.n}: ${Dd.d}`}
    else if(si===4){val=32;c='var(--drug)';ttl='Of 20 births, about 6 by caesarean';cap='Miegel 2026: 32% caesarean, 68% vaginal'}
    else if(si===5){val=Dd.tn;ttl=`Of 20 babies, about ${Math.round(val/5)} with neonatal MG`;cap=`${Dd.n}: ${Dd.d}`}
    else{val=Dd.all?Dd.all[0]:Dd.post[0];ttl=`Of 20 mothers, about ${Math.round(val/5)} worsen after birth`;cap=`${Dd.n}: ${Dd.d}`}
    const nOn=Math.round(val/5);
    s+=`<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${ix+12}" y="${iy+20}" class="t-lbl" style="font-size:12.5px">${ttl}</text>`;
    const gx=(iw-24)/10;for(let k=0;k<20;k++){const r=Math.floor(k/10),cI=k%10;s+=person(ix+12+gx*(cI+.5),iy+58+r*40,k<nOn,c)}
    s+=`<text x="${ix+12}" y="${iy+ih-28}" class="t-xs">${val?`${val}% · 1 figure = 5%`:''}</text>`;
    s+=`<text x="${ix+12}" y="${iy+ih-12}" class="t-xs">${cap.length>(N?60:54)?cap.slice(0,N?58:52)+'…':cap}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LI_STEPS,t);setSt(p);
    let note=noteHTML(LI_STEPS[p])+`<div class="kv"><div><dt>Numbers from ${Dd.n} · ${Dd.d}</dt><dd>${Dd.x} ${Dd.c}</dd></div></div>`;
    if(farad&&si>=1&&si<=5)note+=`<div class="kv"><div><dt>Fetal AChR antibody syndrome (FARAD)</dt><dd>Maternal antibodies against the fetal form of the receptor (the gamma subunit) restrict fetal movement and can cause arthrogryposis multiplex congenita, or a milder persistent myopathy. In a multicentre cohort of 46, half the mothers had no prior MG diagnosis; 23.9% of offspring died, mainly termination for severe arthrogryposis or early respiratory failure; survivors often had facial weakness (73.5%) and velopharyngeal insufficiency (75%). Maternal IVIG or plasma exchange early in pregnancy went with fewer deaths, and Gilhus says women with a previously affected child should receive IVIG or exchange in later pregnancies. Maternal MG is not a major cause of arthrogryposis overall. [[Allen2023,Hacohen2015,Gilhus2020]]</dd></div></div>`;
    $('#liNote').innerHTML=note;
    $('#liRead').innerHTML=`<span>now <b>${when(u)}</b></span><span>maternal IgG in baby <b>${born||preg?'≈ '+Math.round(lv*100)+'% (schematic)':'none'}</b></span><span>numbers <b>${Dd.n}</b></span>`;
  }
  const stop=playWire(rg,$('#liPlay'),draw,22000,'Replay','living');
  const setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  $('#liSet').addEventListener('click',e=>{const b=e.target.closest('[data-lids]');if(!b)return;ds=b.dataset.lids;$$('[data-lids]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#liFarad').onclick=()=>{farad=!farad;$('#liFarad').setAttribute('aria-pressed',farad);draw(+rg.value)};
  $('#liDrugTbl').innerHTML=LI_DRUGS.map(r=>`<tr><th>${r[0]}</th><td>${r[1]} ${r[3]}</td><td>${r[2]}</td></tr>`).join('');
  $('#liPregCards').innerHTML=`
   <div class="card"><h4>Who is more likely to have an affected baby</h4><ul><li>A previously affected child raises the risk.</li><li>Maternal thymectomy roughly halved it in one registry (P = 0.03), and a lower rate was also reported elsewhere.</li><li>In one series incidence fell with longer maternal disease duration; neonatal MG also went with signs of fetal distress in delivery.</li><li>Antibody level is disputed: two series found no link with maternal severity or titre, another found neonatal MG tracked a high level and a high ratio of anti-fetal to anti-adult receptor antibodies.</li></ul><p class="stage-cap">[[Gilhus2020,Hoff2007,Djelmis2002,Batocchi1999,VernetderGarabedian1994]]</p></div>
   <div class="card"><h4>Delivery, in two registries</h4><ul><li>Norway, 127 births: more delivery complications (40.9% vs 32.9%), interventions (33.9% vs 20.0%) and caesarean section (17.3% vs 8.6%); 3.9% of children had severe anomalies.</li><li>Sweden, 443 women: no increase in pregnancy complications, less spontaneous labour (69.8% vs 79.5%), more induction and elective caesarean, babies born about 2 days earlier, and no increase in malformation.</li><li>The two disagree on malformations.</li></ul><p class="stage-cap">[[Hoff2003,OConnor2024]]</p></div>
   <div class="card"><h4>Anaesthesia for birth</h4><ul><li>Epidural analgesia is preferred to general anaesthesia when possible, and standard MG drugs continue through labour.</li><li>In a Portuguese series of 17 deliveries, epidurals were used in 75% without anaesthetic complications; one woman with undiagnosed MG given a general anaesthetic had delayed emergence and respiratory failure.</li><li>Vacuum or forceps were used in 9% of MG births vs 6% in the Norwegian population.</li></ul><p class="stage-cap">[[Gilhus2020,Norwood2014,Almeida2010]]</p></div>
   <div class="card"><h4>The longer view for the child</h4><ul><li>Children of mothers with MG have at least a 10-fold higher risk of MG and other autoimmune disease.</li><li>Rituximab exposure in pregnancy depletes the newborn's B cells, which normalise by about 6 months.</li><li>Oral salbutamol improved symptoms in 13 of 16 children with fetal AChR antibody disorders.</li></ul><p class="stage-cap">[[Gilhus2018,Gilhus2020,Allen2023]]</p></div>`;

  /* ======== domain picker ======== */
  let dom='surg';
  const dsv=$('#liDomSvg'),dr=$('#liDomT');
  $('#liDom').innerHTML='<span class="kicker">Topic</span>'+Object.entries(LI_DOM).map(([k,v])=>`<button class="btn" data-lidm="${k}" aria-pressed="${k===dom}">${v.n}</button>`).join('');
  const wrap=(str,n)=>{const w=str.split(' '),o=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){o.push(l.trim());l=x}else l+=' '+x});if(l.trim())o.push(l.trim());return o};
  const RX=[.25,4];
  function drawDom(t){
    const D=LI_DOM[dom],N=NARROW(),W=N?400:720;
    const B0=N?20:310,B1=N?320:620,VX=W-16,LX=20;
    const SX=(v,mx)=>B0+clamp(v/mx)*(B1-B0),RXs=v=>B0+clamp(Math.log(v/RX[0])/Math.log(RX[1]/RX[0]))*(B1-B0);
    /* heights */
    const HW=N?46:90,rows=D.rows,hs=rows.map((r,i)=>{if(r.k==='h')return wrap(r.l,HW).length*16+12;if(r.k==='txt')return wrap(r.l,N?62:110).length*14+6;
      if(r.k==='flow')return 0;const last=r.k==='ratio'&&(!rows[i+1]||rows[i+1].k!=='ratio');return (N?36:24)+(last||r.k==='band'?16:0)});
    let flowH=0;if(rows[0].k==='flow'){const C=rows[0].cols,cw=N?360:330;const bh=C.map(c=>c.s.map(x=>wrap(x,Math.floor((cw-24)/5.8)).length*13+14));
      flowH=N?bh.reduce((a,b)=>a+28+b.reduce((p,q)=>p+q+14,0),0):28+Math.max(...bh.map(b=>b.reduce((p,q)=>p+q+14,0)));hs[0]=flowH}
    const H=20+hs.reduce((a,b)=>a+b,0)+8;
    vb(dsv,W+' '+H,W+' '+H);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`,y=20,ri=0;
    rows.forEach((r,i)=>{const p=ease(clamp(t*1.6-ri/Math.max(1,rows.length)*.6));
      if(r.k==='h'){wrap(r.l,HW).forEach((ln,j)=>s+=`<text x="${LX}" y="${y+16+j*16}" class="t-lbl">${ln}</text>`);y+=hs[i];return}
      ri++;
      if(r.k==='txt'){wrap(r.l,N?62:110).forEach((ln,j)=>s+=`<text x="${LX}" y="${y+12+j*14}" class="t-xs" style="fill:var(--ink);opacity:${f1(.3+.7*p)}">${ln}</text>`);y+=hs[i];return}
      if(r.k==='flow'){const C=r.cols,cw=N?360:330,nc=Math.floor((cw-24)/5.8);let yy=y;
        C.forEach((c,ci)=>{let cx=N?20:20+ci*(cw+20),cy=N?yy:y;s+=`<text x="${cx}" y="${cy+14}" class="t-lbl">${c.h}</text>`;cy+=28;
          c.s.forEach((st,k)=>{const L2=wrap(st,nc),bh=L2.length*13+14,on=p>(k+.5)/c.s.length*.95;
            s+=`<rect x="${cx}" y="${cy}" width="${cw}" height="${bh}" rx="8" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${k===0?'var(--nerve)':'var(--line)'};opacity:${on?1:.5}"/>`;
            L2.forEach((ln,j)=>s+=`<text x="${cx+12}" y="${cy+17+j*13}" class="t-xs" style="fill:var(--ink)">${ln}</text>`);
            cy+=bh;if(k<c.s.length-1)s+=`<path d="M${cx+cw/2} ${cy+2}v9" style="stroke:var(--muted);stroke-width:1.5"/><path d="M${cx+cw/2-4} ${cy+8}l4 5 4-5" style="fill:none;stroke:var(--muted);stroke-width:1.5"/>`;cy+=14});
          if(N)yy=cy});
        y+=hs[i];return}
      const ly=N?y+12:y+15,by=N?y+18:y+6,bh2=N?11:12;
      s+=`<text x="${LX}" y="${ly}" class="t-sm" style="fill:var(--ink)">${r.l}</text>`;
      if(r.k==='bar'){const mx=r.max||100;s+=`<rect x="${B0}" y="${by}" width="${B1-B0}" height="${bh2}" rx="3" style="fill:var(--panel-2)"/>`;
        if(r.rng)s+=`<rect x="${f1(SX(r.rng[0],mx))}" y="${by}" width="${f1((SX(r.rng[1],mx)-SX(r.rng[0],mx))*p)}" height="${bh2}" rx="3" style="fill:${r.c};opacity:.75"/>`;
        else s+=`<rect x="${B0}" y="${by}" width="${f1(SX(r.v*p,mx)-B0)}" height="${bh2}" rx="3" style="fill:${r.c}"/>`;
        if(r.ci&&p>.95)s+=`<path d="M${f1(SX(r.ci[0],mx))} ${by+bh2/2}H${f1(SX(r.ci[1],mx))}M${f1(SX(r.ci[0],mx))} ${by}v${bh2}M${f1(SX(r.ci[1],mx))} ${by}v${bh2}" style="stroke:var(--ink);stroke-width:1.4"/>`;
        s+=`<text x="${VX}" y="${ly}" class="t-lbl t-end" style="font-size:12.5px;opacity:${f1(p)}">${r.txt}</text>`}
      if(r.k==='ratio'){const x1=RXs(1),cyy=by+bh2/2,v=Math.exp(lerp(0,Math.log(r.v),p));
        s+=`<line x1="${B0}" x2="${B1}" y1="${cyy}" y2="${cyy}" style="stroke:var(--line);stroke-width:1"/><line x1="${f1(x1)}" x2="${f1(x1)}" y1="${by-3}" y2="${by+bh2+3}" style="stroke:var(--ink);stroke-width:1.2"/>`;
        if(r.ci&&p>.95)s+=`<path d="M${f1(RXs(r.ci[0]))} ${cyy}H${f1(RXs(r.ci[1]))}" style="stroke:var(--ab);stroke-width:2"/>`;
        s+=`<line x1="${f1(x1)}" x2="${f1(RXs(v))}" y1="${cyy}" y2="${cyy}" style="stroke:${r.v>1?'var(--ab)':'var(--achr)'};stroke-width:3;opacity:.5"/><circle cx="${f1(RXs(v))}" cy="${cyy}" r="5.5" style="fill:${r.v>1?'var(--ab)':'var(--achr)'}"/>`;
        s+=`<text x="${VX}" y="${ly}" class="t-lbl t-end" style="font-size:12.5px;opacity:${f1(p)}">${r.v.toFixed(2)}${r.ci?` (${r.ci[0]}–${r.ci[1]})`:''}</text>`;
        if(!rows[i+1]||rows[i+1].k!=='ratio'){[.25,.5,1,2,4].forEach(v=>s+=`<text x="${f1(RXs(v))}" y="${by+bh2+14}" class="t-xs t-mid">${v}</text>`)}}
      if(r.k==='band'){const SB=v=>B0+(v-r.min)/(r.max-r.min)*(B1-B0);s+=`<rect x="${B0}" y="${by}" width="${B1-B0}" height="${bh2}" rx="3" style="fill:var(--panel-2)"/>`;
        const a=SB(r.lo),b=SB(r.hi);s+=`<rect x="${f1(a)}" y="${by}" width="${f1((b-a)*p)}" height="${bh2}" rx="3" style="fill:${r.c}"/>`;
        for(let v=r.min;v<=r.max;v+=10)s+=`<text x="${f1(SB(v))}" y="${by+bh2+14}" class="t-xs t-mid">${v}${r.u}</text>`;
        s+=`<text x="${VX}" y="${ly}" class="t-lbl t-end" style="font-size:12.5px;opacity:${f1(p)}">${r.lo}–${r.hi}${r.u}</text>`}
      y+=hs[i]});
    dsv.innerHTML=s;
  }
  function domNote(){const D=LI_DOM[dom];
    $('#liDomNote').innerHTML=`<div class="kicker"><span class="ev ${D.ev[0]}">${D.ev[1]}</span> ${D.n}</div><h4>${D.t}</h4><div class="kv">${D.body.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</div><div class="hook"><b>Exam hook</b>${D.hook}</div><div class="pt"><b>In plain words</b>${D.pt}</div>`;
    $('#liDomCap').innerHTML=D.cap}
  const dstop=playWire(dr,$('#liDomPlay'),drawDom,5000,'Replay','living');
  $('#liDom').addEventListener('click',e=>{const b=e.target.closest('[data-lidm]');if(!b)return;dom=b.dataset.lidm;$$('[data-lidm]').forEach(x=>x.setAttribute('aria-pressed',x===b));domNote();
    dstop();if(RM){dr.value=1;drawDom(1)}else{dr.value=0;$('#liDomPlay').click()}});
  draw(+rg.value);drawDom(+dr.value);domNote();
};
