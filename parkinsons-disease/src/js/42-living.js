/* =============== 4.2 living =============== */
const LV_DOM=[
 {id:'ex',b:'Exercise and physiotherapy',t:'Exercise and physiotherapy',
  fig:{type:'div',h:['CHANGE IN MOTOR SCORE IN TWO TRIALS · LEFT IS BETTER, RIGHT IS WORSE','MOTOR SCORE CHANGE · LEFT IS BETTER'],min:-6,max:4,
   rows:[['High-intensity treadmill','SPARX, 6 months',.3,'var(--sky)'],['Wait-list control','SPARX, 6 months',3.2,'var(--muted)'],['LSVT BIG training','Berlin study',-5.05,'var(--sky)'],['Nordic walking','Berlin study',.58,'var(--muted)'],['Unsupervised home exercise','Berlin study',1.68,'var(--muted)']]},
  cap:'UPDRS motor score change; the two trials used different durations and groups, so compare within each trial only.',
  txt:`In SPARX, high-intensity treadmill exercise in 128 people with untreated early Parkinson's held the motor score nearly steady over 6 months (+0.3) while wait-list controls worsened (+3.2). [[Schenkman2018]] Sixteen hours of one-to-one LSVT BIG training improved the motor score by 5.05 points, against worsening with Nordic walking or home exercise, though quality of life did not differ. [[Ebersbach2010]]`,
  pt:'Regular, demanding exercise and specialist physiotherapy improved movement in trials.',
  hook:'SPARX: high-intensity (80–85% max HR) treadmill passed non-futility. Park-in-Shape: home aerobic cycling beat stretching by 4.2 points.',
  g:[`NICE: consider early referral to a physiotherapist experienced in Parkinson's, and offer Parkinson's-specific physiotherapy for balance or motor problems. [[NICE2017]]`,
     `A meta-analysis of 191 trials (7,998 people) for the European Physiotherapy Guideline update found conventional physiotherapy improved motor symptoms, gait and quality of life; treadmill and resistance training improved gait; dance, Nordic walking, balance and gait training and martial arts improved motor symptoms, balance and gait; dual-task training improved no outcome. [[Radder2020]]`],
  r:[`Park-in-Shape: 130 sedentary people cycling at home with exergaming 3 times a week for 6 months scored 4.2 points better off-medication than a stretching group, above the 3.5-point clinically relevant threshold. [[vanderKolk2019]]`,
     `Tai chi twice weekly for 24 weeks (195 people) beat resistance training and stretching on balance limits, reduced falls compared with stretching, and the effects lasted 3 months. [[Li2012]]`,
     `Whether exercise slows the disease is a separate question being tested in SPARX3. [[SPARX3]] See <a href="#cure" data-go="cure">Toward a cure</a>.`]},
 {id:'sp',b:'Speech and swallowing',t:'Speech, swallowing and saliva',
  fig:{type:'bars',h:['SWALLOWING PROBLEMS (DYSPHAGIA), POOLED STUDIES','SWALLOWING PROBLEMS, POOLED'],max:100,
   rows:[['Reported when asked','people with PD',35,'var(--warn)','35%'],['Found on objective testing','people with PD',82,'var(--bad)','82%'],['Found on objective testing','controls',23,'var(--muted)','23%']]},
  cap:'Pooled prevalences from a meta-analysis; objective tests find far more swallowing problems than people report.',
  txt:`When asked, 35% of people with Parkinson's reported swallowing problems; on objective testing the pooled prevalence was 82%, against 23% in controls, so problems go unreported unless looked for. [[Kalf2012]] In PD COMM (388 people with dysarthria), LSVT LOUD improved the Voice Handicap Index by 8.0 points against no therapy at 3 months, while usual NHS speech therapy did not differ from no therapy. [[Sackley2024]]`,
  pt:'Swallowing difficulties are far more common than people notice. Intensive voice therapy improved how people rated their voice.',
  hook:'Dysphagia: 35% self-reported vs 82% on objective testing. LSVT LOUD beat usual speech therapy in PD COMM (2024).',
  g:[`NICE: offer speech and language therapy for communication, swallowing or saliva problems, including expiratory muscle strength training and effort-focused therapies such as LSVT LOUD. [[NICE2017]]`,
     `For drooling, NICE suggests speech and language therapy first, then glycopyrronium bromide, then referral for botulinum toxin A. [[NICE2017]] The MDS review rates botulinum toxin A and B efficacious and clinically useful, with specialised monitoring. [[Seppi2019]]`],
  r:[`PD COMM: LSVT LOUD (four 50-minute sessions a week for 4 weeks) had 93 adverse events, mostly vocal strain, against 46 with NHS therapy; no serious adverse events. [[Sackley2024]]`,
     `In the Sydney cohort, 81% of 20-year survivors had moderate dysarthria and 48% had choking. [[Hely2008]]`]},
 {id:'fa',b:'Falls and freezing',t:'Falls and freezing of gait',
  fig:{type:'bars',h:['FALLS AND FREEZING','FALLS AND FREEZING'],max:100,
   rows:[['Regular freezing','survey of 6,620 patients',47,'var(--warn)','47%'],['Fell at least once','22 prospective studies',60.5,'var(--bad)','60.5%'],['Fell repeatedly','22 prospective studies',39,'var(--bad)','39%'],['Falls, 20-year survivors','Sydney cohort',87,'var(--bad)','87%'],['Freezing, 20-year survivors','Sydney cohort',81,'var(--warn)','81%']]},
  cap:'Different studies and time points; each bar is a share of people with Parkinson\'s in that study.',
  txt:`In a survey of 6,620 patients, 47% reported regular freezing, linked to longer disease, more advanced stage and male sex. [[Macht2007]] Across 22 prospective studies, 60.5% fell at least once and 39% fell repeatedly, recurrent fallers averaging 20.8 falls a year. [[Allen2013]] Among 20-year survivors in Sydney, 87% had falls and 35% fractures. [[Hely2008]]`,
  pt:'Falls and freezing are common and become more so with time. Physiotherapy, tai chi and cueing training have trial evidence.',
  hook:'Recurrent falls: prior falls, disease severity, dopamine agonists, higher levodopa dose, cognitive impairment, fear of falling and freezing of gait. [[Allen2013]]',
  g:[`NICE: offer Parkinson's-specific physiotherapy for balance or motor function problems. [[NICE2017]]`,
     `Factors associated with recurrent falls include prior falls, disease severity and duration, dopamine agonists, higher levodopa dose, cognitive impairment, fear of falling and freezing of gait. [[Allen2013]]`],
  r:[`Freezing severity correlated with every PDQ-39 quality-of-life dimension except stigma and social support, independent of disease severity. [[Moore2007]]`,
     `Tai chi reduced falls compared with stretching. [[Li2012]] Home rhythmic-cueing training improved gait and freezing a little, effects that largely faded within 6 weeks (see the cueing demo below). [[Nieuwboer2007]]`]},
 {id:'wk',b:'Work',t:'Work and employment',
  fig:{type:'bars',h:['STOPPED WORKING, BY YEARS WITH PARKINSON\'S (UK)','STOPPED WORKING (UK)'],max:100,
   rows:[['After 5 years','people with onset before 65',46,'var(--warn)','46%'],['After 10 years','people with onset before 65',82,'var(--bad)','82%'],['Retired early because of PD','sample 1, n = 151',52,'var(--violet)','52%'],['Retired early because of PD','sample 2, n = 308',57,'var(--violet)','57%']]},
  cap:'Two UK samples of people whose Parkinson\'s began before 65.',
  txt:`In two UK samples with onset before 65, 52% and 57% had retired early because of Parkinson's, at a mean age of 55.8 against 62 in the UK population. After 5 years with Parkinson's 46% had stopped working, and after 10 years 82%. The median time to losing employment was 6.0 years, from 6.7 years for onset before 45 to 1.7 years for onset after 56. [[Schrag2006emp]]`,
  pt:'Many people stop working within a few years of diagnosis, especially when Parkinson\'s starts later in working life.',
  hook:'Median time to loss of employment 6.0 years; earlier for older onset. [[Schrag2006emp]]',
  g:[`No guideline statement specific to work was found in the sources used here. NICE recommends Parkinson's-specific occupational therapy for difficulties with activities of daily living. [[NICE2017]]`],
  r:[`In the OTiP trial (191 people, 94% with a caregiver taking part), home-based occupational therapy improved self-rated performance of daily activities by an adjusted 1.2 points at 3 months. [[Sturkenboom2014]]`]},
 {id:'dr',b:'Driving',t:'Driving',
  fig:{type:'list',h:['DRIVING: WHAT THE SOURCES SAY','DRIVING'],
   rows:[['Evidence','var(--sky)',['Driving is impaired in Parkinson\'s compared','with healthy drivers (evidence-based review).']],['Predictors','var(--warn)',['Cognitive, visual and motor tests predict','driving only at evidence level B or C.']],['Level A','var(--bad)',['No definitive (level A) predictor of','driving safety exists.']],['UK rule','var(--violet)',['Tell the DVLA and the insurer at diagnosis;','no driving with sudden-onset sleep.']]]},
  cap:'Driving rules differ by country; the UK statement is from NICE.',
  txt:`An evidence-based review found that driving is impaired in Parkinson's compared with healthy drivers, but cognitive, visual and motor measures predicted driving performance only at level B or C, so no definitive predictors exist. [[Crizzle2012]]`,
  pt:'Parkinson\'s can affect driving, and no single test predicts who is safe. Rules on telling the licensing authority depend on the country.',
  hook:'NICE (UK): inform the DVLA and insurer at diagnosis; people with excessive daytime sleepiness or sudden onset of sleep should not drive. [[NICE2017]]',
  g:[`NICE: people who drive should inform the DVLA and their insurer at diagnosis; people with excessive daytime sleepiness or sudden onset of sleep should not drive. [[NICE2017]]`],
  r:[`No level A predictors of driving performance; cognitive, visual and motor measures reached level B or C. [[Crizzle2012]]`,
     `Rules in other countries, including Israel, could not be cited for this guide.`]},
 {id:'pr',b:'Pregnancy',t:'Pregnancy',
  fig:{type:'list',h:['PREGNANCY: WHAT THE EVIDENCE IS BASED ON','PREGNANCY'],
   rows:[['Evidence base','var(--sky)',['Mainly case reports and drug registries;','no trials.']],['Levodopa','var(--good)',['Has the best safety data of the','Parkinson\'s medicines.']],['Amantadine','var(--bad)',['Should be avoided in pregnancy and','when trying to conceive.']],['Complications','var(--violet)',['No evidence of higher rates of birth','or fetal complications.']]]},
  cap:'From an updated review of Parkinson\'s disease and pregnancy.',
  txt:`Evidence on pregnancy in Parkinson's comes mainly from case reports and drug registries. Levodopa has the best safety data, amantadine should be avoided in pregnancy or when trying to conceive, and there is no evidence of higher rates of birth or fetal complications. [[Seier2017]]`,
  pt:'Pregnancy with Parkinson\'s has been studied mostly through individual reports and registries. Parkinson\'s medicines should never be changed or stopped suddenly without a clinician.',
  hook:'Pregnancy: levodopa has the best safety data; avoid amantadine. [[Seier2017]]',
  g:[`No pregnancy-specific guideline was found in the sources used here; the review above summarises the evidence. [[Seier2017]]`],
  r:[`Case reports and registries only: levodopa best studied; amantadine to be avoided; no excess of birth or fetal complications found. [[Seier2017]]`]},
 {id:'ho',b:'Hospital stays',t:'Hospital stays',
  fig:{type:'list',h:['IN HOSPITAL: WHAT NICE SAYS','IN HOSPITAL'],
   rows:[['Never stop','var(--bad)',['Do not withdraw Parkinson\'s medicines','abruptly: risk of acute akinesia or NMS.']],['On time','var(--warn)',['Give them at the appropriate times in','hospital or a care home.']],['Self-medication','var(--good)',['Appropriate timing may mean letting','the person take their own medicines.']]]},
  cap:'NMS: neuroleptic malignant syndrome. See also Nursing care.',
  txt:`NICE says Parkinson's medicines should not be withdrawn abruptly, because of the risk of acute akinesia or neuroleptic malignant syndrome. In hospitals and care homes they should be given at the appropriate times, which may mean allowing self-medication. [[NICE2017]]`,
  pt:'In hospital, Parkinson\'s medicines need to be given on time and never simply stopped.',
  hook:'Never stop Parkinson\'s medicines abruptly: acute akinesia, neuroleptic malignant syndrome. Give on time; consider self-medication. [[NICE2017]]',
  g:[`NICE: do not withdraw Parkinson's medicines abruptly; give them at the appropriate times in hospital or care homes, which may mean allowing self-medication. [[NICE2017]]`,
     `NICE: do not offer olanzapine; phenothiazines and butyrophenones (the class that includes haloperidol) can worsen motor features. [[NICE2017]]`],
  r:[`Pneumonia was the commonest cause of death in an incident cohort. [[Williams-Gray2013]] Detail on timing, drugs to avoid and swallowing is in <a href="#nursing" data-go="nursing">Nursing care</a>.`]},
 {id:'cg',b:'Caregiving',t:'Caregiving',
  fig:{type:'bars',h:['CAREGIVERS AND CARE SETTINGS','CAREGIVING'],max:100,
   rows:[['Carers who were spouses','Spain, 289 pairs',75,'var(--sage)','75%'],['Carers whose social life suffered','UK, 123 carers',66.7,'var(--warn)','two-thirds'],['Carers whose health suffered','UK, 123 carers',40,'var(--warn)','over 40%'],['Moved to a nursing home in 4 years','Norway, 178 patients',26.4,'var(--violet)','26.4%'],['20-year survivors in nursing homes','Sydney cohort',48,'var(--violet)','48%']]},
  cap:'"Two-thirds" and "over 40%" are the survey\'s own wording, drawn at 66.7% and 40%.',
  txt:`In a UK survey of 123 caregivers, over 40% said their health had suffered, almost half had raised depression scores and two-thirds said their social life had suffered. [[Schrag2006CG]] In 289 Spanish patient-caregiver pairs, 75% of caregivers were spouses, mostly women around 60, caring for an average 6 years, with more mood disorders and worse quality of life than the general population. [[Martinez-Martin2008]]`,
  pt:'Caring for someone with Parkinson\'s often affects the carer\'s own health, mood and social life.',
  hook:'Caregiver burden rose with patient disability, depression, hallucinations, confusion and falls. Hallucinations were the strongest predictor of nursing-home admission. [[Schrag2006CG,Aarsland2000]]',
  g:[`The European consensus on palliative care in neurology recommends carer support and training (level C). [[Oliver2016]]`],
  r:[`Caregivers' own affective state was the strongest factor in their burden and perceived health, and burden rose with Parkinson's severity. [[Martinez-Martin2008]]`,
     `In a 4-year population study, 26.4% moved into a nursing home; old age, functional impairment, dementia and hallucinations predicted it, hallucinations most strongly. [[Aarsland2000]]`]},
 {id:'pc',b:'Palliative care and end of life',t:'Palliative care and the end of life',
  fig:{type:'bars',h:['SURVIVAL AND CAUSE OF DEATH IN TWO COHORTS','SURVIVAL, TWO COHORTS'],max:100,
   rows:[['Had died by 10 years','incident cohort (CamPaIGN)',55,'var(--muted)','55%'],['Parkinson\'s on the death certificate','as a substantial contributor',20,'var(--violet)','20%'],['Had died by 20 years','Sydney cohort',74,'var(--muted)','74%'],['Dementia among 20-year survivors','Sydney cohort',83,'var(--violet)','83%']]},
  cap:'Two cohorts with different designs and follow-up.',
  txt:`In an incident population cohort, 55% had died by 10 years; Parkinson's appeared on death certificates as a substantial contributor in only 20%, and pneumonia was the commonest cause of death. [[Williams-Gray2013]] In the Sydney cohort, 74% had died by 20 years and 83% of survivors had dementia. [[Hely2008]] The palliative-care trial is shown below. [[Kluger2020]]`,
  pt:'Guidelines recommend offering conversations about the future, and about palliative care, at any stage of Parkinson\'s.',
  hook:'Outpatient palliative care (2020 RCT): better patient quality of life at 6 months; co-primary caregiver burden not met. [[Kluger2020]]',
  g:[`NICE: offer discussions about prognosis and advance care planning, and consider referral to palliative care at any stage. [[NICE2017]]`,
     `European consensus: early integration of palliative care, a multidisciplinary team, symptom management (level B), end-of-life care, carer support. [[Oliver2016]]`],
  r:[`Outpatient palliative care improved patients' quality of life at 6 months; caregiver burden did not differ at 6 months but improved by 12. [[Kluger2020]]`]}];
const LV_CS=[
 {from:0,at:.12,k:'Step 1 · Walking',t:'Normal steps',
  txt:`Freezing of gait is common: in a survey of 6,620 people, 47% reported regular freezing, more often with longer disease, more advanced stage and in men. [[Macht2007]]`,
  pt:'At first the person walks with steady, even steps.'},
 {from:.25,at:.38,k:'Step 2 · Shortening',t:'Steps get shorter and faster',
  txt:`In this schematic the steps shorten and speed up before the freeze. Freezing of gait is one of the factors associated with recurrent falls. [[Allen2013]]`,
  pt:'The steps get smaller and quicker, as if the feet are hurrying to catch up.'},
 {from:.45,at:.53,k:'Step 3 · Freeze',t:'The feet stop',
  txt:`During a freeze the feet seem stuck and may tremble in place. Freezing severity correlated with almost every dimension of quality of life, independent of disease severity. [[Moore2007]]`,
  pt:'The feet seem glued to the floor for a moment, although the person is trying to walk.',
  hook:'Freezing of gait affects quality of life beyond its effect on mobility. [[Moore2007]]'},
 {from:.6,at:.86,k:'Step 4 · Cue',t:'A cue restores the stride',txt:'',pt:''}];
const LV_CUE={
 n:{t:'Without a cue',txt:`In this schematic, without a cue the steps stay short and shuffling. In the RESCUE trial, home-based training with rhythmic cues improved posture and gait scores by 4.2% and reduced freezing severity by 5.5% in people who froze, but the effects had largely faded 6 weeks later. [[Nieuwboer2007]]`,pt:'Without an outside rhythm or target, the short shuffling steps continue.'},
 v:{t:'Visual stripes',txt:`Lines across the floor give a target for each step. This schematic shows the idea; the trial evidence summarised here is for training with rhythmic cues: RESCUE (153 people, Hoehn and Yahr II–IV, 3 weeks at home) improved posture and gait by 4.2% and freezing severity by 5.5% in freezers, largely fading within 6 weeks. [[Nieuwboer2007]]`,pt:'Stepping over lines on the floor can help the feet find their stride again.'},
 m:{t:'A metronome beat',txt:`A steady beat gives a rhythm to step to. In the RESCUE trial, 153 people trained at home with rhythmic cues for 3 weeks: posture and gait scores improved by 4.2% (p=0.005) and freezing severity fell by 5.5% in freezers (p=0.007), but the effects had largely faded 6 weeks later. [[Nieuwboer2007]]`,pt:'Walking to a steady beat helps some people keep their steps long and even.'}};
const LV_CG=[
 {id:'uk',c:'Caregiver burden',n:'UK survey, 123 carers',on:['dis','dep','hal','con','fal'],
  txt:`In a UK postal survey of 123 caregivers (66% women), burden rose with the patient's disability, depression, hallucinations, confusion and falls, and was linked to the patient's quality of life. Over 40% said their own health had suffered and almost half had raised depression scores. [[Schrag2006CG]]`,
  pt:'Carers found it hardest when the person they cared for was more disabled, low in mood, confused, hallucinating or falling.'},
 {id:'es',c:'Caregiver burden',n:'Spain, 289 patient-carer pairs',on:['own','sev'],
  txt:`In a Spanish nationwide study of 289 pairs, the caregivers' own affective state was the strongest factor in their burden and perceived health, and Zarit burden scores rose with Parkinson's severity. Caregivers had more mood disorders and worse quality of life than the general population. [[Martinez-Martin2008]]`,
  pt:'The carer\'s own mood mattered most, along with how advanced the Parkinson\'s was.'},
 {id:'no',c:'Nursing-home admission',n:'Norway, 178 patients over 4 years',on:['age','fun','dem','hal'],strong:'hal',
  txt:`In a 4-year population-based study, 26.4% (47 of 178) were admitted to a nursing home. Old age, functional impairment, dementia and hallucinations were independent predictors, and hallucinations were the strongest. [[Aarsland2000]]`,
  pt:'Hallucinations were the strongest single warning sign that care at home might become hard to sustain.'}];
const LV_CGN={dis:'Patient disability',dep:'Patient depression',hal:'Hallucinations',con:'Confusion',fal:'Falls',own:'Carer\'s own mood',sev:'Parkinson\'s severity',age:'Older age',fun:'Functional impairment',dem:'Dementia'};
const lvBg=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
inits.living=()=>{
  /* ---------------- 1. domain tabs ---------------- */
  const dv=$('#lvDom');let di=0,da=1,stopA=null,lastD='';
  $('#lvTabs').innerHTML='<span class="kicker">Domain</span>'+LV_DOM.map((d,i)=>`<button class="btn" data-dm="${i}" aria-pressed="${i===0}">${d.b}</button>`).join('');
  function drawDom(){
    const N=vb(dv,'720 300','400 460'),D=LV_DOM[di],F=D.fig,e=ease(da);
    let s=lvBg+`<text x="${N?16:20}" y="26" class="t-xs">${F.h[N?1:0]}</text>`;
    if(F.type==='bars'){const L=N?{x0:16,x1:320,y0:62,dy:76}:{x0:320,x1:640,y0:66,dy:46};const X=v=>L.x0+v/F.max*(L.x1-L.x0);
      [0,25,50,75,100].forEach(v=>{s+=`<path d="M${f1(X(v))} ${L.y0-14}V${L.y0+F.rows.length*L.dy-(N?6:20)}" class="grid"/><text x="${f1(X(v))}" y="${L.y0-18}" class="t-xs t-mid">${v}%</text>`});
      F.rows.forEach(([l,sub,v,c,lab],i)=>{const y=L.y0+i*L.dy,k=ease(ramp(e,i*.08,.5+i*.08)),by=N?y+30:y;
        s+=N?`<text x="16" y="${y+8}" class="t-sm" style="fill:var(--ink)">${l}</text><text x="16" y="${y+22}" class="t-xs">${sub}</text>`:`<text x="20" y="${y+6}" class="t-sm" style="fill:var(--ink)">${l}</text><text x="20" y="${y+20}" class="t-xs">${sub}</text>`;
        s+=`<rect x="${L.x0}" y="${by-6}" width="${f1(L.x1-L.x0)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${L.x0}" y="${by-6}" width="${f1((X(v)-L.x0)*k)}" height="16" rx="4" style="fill:${c}"/>`;
        s+=`<text x="${f1(L.x0+(X(v)-L.x0)*k+6)}" y="${by+6}" class="t-lbl" style="opacity:${f1(k)}">${lab}</text>`})}
    else if(F.type==='div'){const L=N?{x0:16,x1:384,y0:90,dy:72}:{x0:300,x1:690,y0:74,dy:42};const X=v=>L.x0+(v-F.min)/(F.max-F.min)*(L.x1-L.x0),z=X(0);
      for(let v=F.min;v<=F.max;v+=2)s+=`<path d="M${f1(X(v))} ${L.y0-14}V${L.y0+F.rows.length*L.dy-(N?0:22)}" class="${v?'grid':'axis'}" style="${v?'':'stroke:var(--ink);stroke-width:1.5'}"/><text x="${f1(X(v))}" y="${L.y0-18}" class="t-xs t-mid">${v>0?'+'+v:v}</text>`;
      if(N)s+=`<text x="${f1(z-6)}" y="50" class="t-xs t-end">← better</text><text x="${f1(z+6)}" y="50" class="t-xs">worse →</text>`;
      else s+=`<text x="${f1(z-6)}" y="44" class="t-xs t-end">← better</text><text x="${f1(z+6)}" y="44" class="t-xs">worse →</text>`;
      F.rows.forEach(([l,sub,v,c],i)=>{const y=L.y0+i*L.dy,k=ease(ramp(e,i*.08,.5+i*.08)),by=N?y+30:y,xv=lerp(z,X(v),k);
        s+=N?`<text x="16" y="${y+8}" class="t-sm" style="fill:var(--ink)">${l}</text><text x="16" y="${y+22}" class="t-xs">${sub}</text>`:`<text x="20" y="${y+6}" class="t-sm" style="fill:var(--ink)">${l}</text><text x="20" y="${y+20}" class="t-xs">${sub}</text>`;
        s+=`<rect x="${f1(Math.min(z,xv))}" y="${by-6}" width="${f1(Math.max(1.5,Math.abs(xv-z)))}" height="16" rx="4" style="fill:${c}"/>`;
        const lab=(v>0?'+':'')+v;s+=v<0?`<text x="${f1(xv-6)}" y="${by+6}" class="t-lbl t-end" style="opacity:${f1(k)}">${lab}</text>`:`<text x="${f1(xv+6)}" y="${by+6}" class="t-lbl" style="opacity:${f1(k)}">${lab}</text>`})}
    else{F.rows.forEach(([tag,c,ls],i)=>{const k=ease(ramp(e,i*.1,.5+i*.1)),y=N?66+i*96:66+i*(F.rows.length>3?56:70),tw=tag.length*7+20;
        s+=`<g style="opacity:${f1(.15+.85*k)}"><rect x="${N?16:20}" y="${y-14}" width="${tw}" height="22" rx="6" style="fill:var(--panel);stroke:${c};stroke-width:1.5"/><text x="${(N?16:20)+10}" y="${y+1}" class="t-xs" style="fill:${c};font-weight:700">${tag.toUpperCase()}</text>`;
        ls.forEach((l,j)=>{s+=`<text x="${N?16:190}" y="${N?y+30+j*18:y+j*18}" class="t-sm" style="fill:var(--ink)">${l}</text>`});s+='</g>'})}
    dv.innerHTML=s;
    const h=noteHTML({k:'Domain · '+D.b,t:D.t,txt:D.txt,pt:D.pt,hook:D.hook});
    if(h!==lastD){$('#lvDomNote').innerHTML=h;lastD=h;$('#lvDomCap').textContent=D.cap;
      $('#lvGuide').innerHTML=D.g.map(x=>`<p>${x}</p>`).join('');$('#lvTrial').innerHTML=D.r.map(x=>`<p>${x}</p>`).join('')}
  }
  $('#lvTabs').addEventListener('click',ev=>{const b=ev.target.closest('[data-dm]');if(!b)return;di=+b.dataset.dm;
    $$('[data-dm]',$('#lvTabs')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopA)stopA();stopA=animate(900,p=>{da=p;drawDom()},()=>{stopA=null;da=1;drawDom()})});

  /* ---------------- 2. cueing demo ---------------- */
  const cv=$('#lvCue'),cr=$('#lvCueT');let cue='m',lastC='';
  /* schematic stride (relative, 1 = normal) over time for each cue */
  const sFn=(t,c)=>t<.25?1:t<.45?lerp(1,.28,ramp(t,.25,.45)):t<.6?.02:c==='n'?.22+.06*Math.sin(t*90):lerp(.25,1,ease(ramp(t,.6,.72)));
  const iFn=(t,c)=>t<.25?.03:t<.45?lerp(.03,.016,ramp(t,.25,.45)):t<.6?.012:c==='n'?.018:.03;
  function steps(c){const out=[];let t=0,x=0,k=0;while(t<=1.0001){const s=sFn(t,c);x+=s;out.push({t,x,s,side:k%2});t+=iFn(t,c);k++}return out}
  let ST={n:steps('n'),v:steps('v'),m:steps('m')};
  function drawCue(t){
    const N=vb(cv,'720 240','400 330');
    const L=N?{py:96,cx:200,u:34,x0:0,x1:400,ch:{x0:30,x1:384,y0:300,y1:212},bt:[350,40]}:{py:96,cx:300,u:46,x0:0,x1:720,ch:{x0:60,x1:600,y0:224,y1:160},bt:[660,48]};
    const all=ST[cue],done=all.filter(p=>p.t<=t),cur=done[done.length-1]||all[0];
    const wx=cur.x*L.u,off=wx-L.cx;
    let s=lvBg+`<rect x="0" y="${L.py-34}" width="${N?400:720}" height="68" style="fill:var(--panel-2)"/>`;
    s+=`<text x="${N?16:20}" y="22" class="t-xs">SEEN FROM ABOVE · ${t<.25?'WALKING':t<.45?'STEPS SHORTEN':t<.6?'FREEZE':cue==='n'?'NO CUE':cue==='v'?'VISUAL STRIPES':'METRONOME BEAT'}</text>`;
    // stripes
    if(cue==='v'&&t>=.58){const cs=all.find(p=>p.t>=.6),k=ramp(t,.58,.64);if(cs){for(let j=0;j<40;j++){const x=(cs.x+j*1)*L.u-off;if(x<6||x>L.x1-6)continue;s+=`<rect x="${f1(x-4)}" y="${L.py-32}" width="8" height="64" rx="2" style="fill:var(--sky);opacity:${f1(.75*k)}"/>`}}}
    // footprints: the last 14 steps
    done.slice(-14).forEach((p,i,a)=>{const x=p.x*L.u-off,y=L.py+(p.side?11:-11),o=.25+.75*(i+1)/a.length,last=i===a.length-1;if(x<12||x>L.x1-12)return;
      s+=`<rect x="${f1(x-9)}" y="${f1(y-5)}" width="18" height="10" rx="5" style="fill:${last?'var(--sage)':'var(--ink)'};opacity:${f1(o*(last?1:.55))}"/>`});
    // the walker
    const fr=t>=.45&&t<.6,tr=fr?Math.sin(t*700)*2:0;
    s+=`<circle cx="${f1(L.cx+tr)}" cy="${L.py}" r="15" style="fill:var(--panel);stroke:var(--sage);stroke-width:2.5"/><path d="M${f1(L.cx+tr+6)} ${L.py-6}l8 6l-8 6" style="fill:none;stroke:var(--sage);stroke-width:2"/>`;
    if(fr)s+=`<text x="${L.cx}" y="${L.py-42}" class="t-lbl t-mid" style="fill:var(--bad)">FREEZE</text><path d="M${L.cx-26} ${L.py+20}q4 -6 8 0q4 6 8 0M${L.cx+10} ${L.py+20}q4 -6 8 0q4 6 8 0" style="fill:none;stroke:var(--bad);stroke-width:1.5"/>`;
    // metronome
    if(cue==='m'){const [bx,by]=L.bt,act=t>=.6,ph=(t/.03)%1,pulse=act?1-ph:0;
      s+=`<circle cx="${bx}" cy="${by}" r="${f1(10+10*pulse)}" style="fill:none;stroke:var(--sky);stroke-width:2;opacity:${f1(act?pulse:.25)}"/><circle cx="${bx}" cy="${by}" r="8" style="fill:${act?'var(--sky)':'var(--panel-2)'}"/><text x="${bx}" y="${by+30}" class="t-xs t-mid" style="fill:${act?'var(--sky)':'var(--muted)'}">${act?'beat on':'beat off'}</text>`}
    // stride chart
    const C=L.ch,X=u=>C.x0+u*(C.x1-C.x0),Y=v=>C.y0-v*(C.y0-C.y1);
    s+=`<text x="${N?16:20}" y="${C.y1-8}" class="t-xs">STRIDE LENGTH, SCHEMATIC</text><path d="M${C.x0} ${C.y0}H${C.x1}" class="axis"/>`;
    if(cue!=='n')s+=`<rect x="${f1(X(.6))}" y="${C.y1}" width="${f1(X(1)-X(.6))}" height="${C.y0-C.y1}" style="fill:var(--sky-soft);opacity:.6"/><text x="${f1(X(.6)+4)}" y="${C.y1+12}" class="t-xs" style="fill:var(--sky)">cue on</text>`;
    s+=`<path d="${pathFn(u=>1-sFn(u,cue),C.x0,C.x1,C.y1,C.y0,160)}" style="fill:none;stroke:var(--line);stroke-width:2"/>`;
    if(t>0)s+=`<path d="${pathFn(u=>1-sFn(u*t,cue),C.x0,X(t),C.y1,C.y0,120)}" style="fill:none;stroke:var(--sage);stroke-width:2.6"/>`;
    s+=`<circle cx="${f1(X(t))}" cy="${f1(Y(sFn(t,cue)))}" r="4.5" style="fill:var(--sage)"/><text x="${C.x0-6}" y="${C.y1+4}" class="t-xs t-end">long</text><text x="${C.x0-6}" y="${C.y0}" class="t-xs t-end">0</text>`;
    if(!N)s+=`<text x="${C.x1+12}" y="${f1(Y(sFn(t,cue))+4)}" class="t-sm" style="fill:var(--ink)">${t<.45?'even steps':t<.6?'frozen':cue==='n'?'shuffling':'stride back'}</text>`;
    cv.innerHTML=s;
    const p=phaseOf(LV_CS,t);setCs(p);const P={...LV_CS[p]};
    if(p===3){const Q=LV_CUE[cue];P.t=Q.t;P.txt=Q.txt;P.pt=Q.pt;P.hook='External cues, a rhythm to step to or lines to step over, are used for freezing of gait; in RESCUE the benefit of home cueing training was small and faded within weeks. [[Nieuwboer2007]]'}
    const h=noteHTML(P);if(h!==lastC){$('#lvCueNote').innerHTML=h;lastC=h}
  }
  const stopC=playWire(cr,$('#lvCuePlay'),drawCue,14000,'Replay','living');
  const setCs=stepWire($('#lvCSteps'),LV_CS,cr,drawCue,stopC);
  const setCue=c=>{cue=c;[['n','#lvCueN'],['v','#lvCueV'],['m','#lvCueM']].forEach(([k,id])=>$(id).setAttribute('aria-pressed',k===c));drawCue(+cr.value)};
  $('#lvCueN').onclick=()=>setCue('n');$('#lvCueV').onclick=()=>setCue('v');$('#lvCueM').onclick=()=>setCue('m');

  /* ---------------- 3. caregiver drivers ---------------- */
  const gv=$('#lvCg');let gi=0,ga=1,stopG=null;
  const KEYS=Object.keys(LV_CGN);
  function drawCg(){
    const N=vb(gv,'720 320','400 520'),G=LV_CG[gi],e=ease(ga);
    const C=N?{x:200,y:70,rx:104,ry:28}:{x:360,y:166,r:132,rx:98,ry:34};
    let s=lvBg+`<text x="${N?16:20}" y="24" class="t-xs">${G.n.toUpperCase()}</text>`,pills='';
    KEYS.forEach((k,i)=>{const a=-Math.PI/2+i/KEYS.length*Math.PI*2,x=N?(i%2?296:104):C.x+Math.cos(a)*C.r*1.95,y=N?160+Math.floor(i/2)*76:C.y+Math.sin(a)*C.r*.98,on=G.on.includes(k),str=G.strong===k;
      const k2=on?ease(ramp(e,i*.04,.5+i*.04)):0;
      if(on){const ex=lerp(C.x,x,k2),ey=lerp(C.y,y,k2);s+=`<path d="M${C.x} ${C.y}L${f1(ex)} ${f1(ey)}" style="stroke:${str?'var(--bad)':'var(--warn)'};stroke-width:${str?4:2.5};stroke-linecap:round"/>`}
      const w=LV_CGN[k].length*6.6+20;
      pills+=`<rect x="${f1(x-w/2)}" y="${f1(y-14)}" width="${f1(w)}" height="28" rx="14" style="fill:${on?(str?'var(--bad-soft)':'var(--warn-soft)'):'var(--panel)'};stroke:${on?(str?'var(--bad)':'var(--warn)'):'var(--line)'};stroke-width:${on?2:1}"/><text x="${f1(x)}" y="${f1(y+4)}" class="t-sm t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?600:500};opacity:${on?1:.7}">${LV_CGN[k]}</text>`;
      if(str&&k2>.9)pills+=`<text x="${f1(x)}" y="${f1(y+28)}" class="t-xs t-mid" style="fill:var(--bad)">strongest</text>`});
    s+=pills+`<ellipse cx="${C.x}" cy="${C.y}" rx="${C.rx}" ry="${C.ry}" style="fill:var(--panel);stroke:var(--sage);stroke-width:2.5"/><text x="${C.x}" y="${C.y+5}" class="t-lbl t-mid">${G.c}</text>`;
    gv.innerHTML=s;
    $('#lvCgNote').innerHTML=noteHTML({k:'Study · '+G.n,t:G.id==='no'?'What predicted a move to a nursing home':'What went with heavier caregiver burden',txt:G.txt,pt:G.pt,hook:'Caregiver burden: patient disability, depression, hallucinations, confusion and falls; carers\' own mood strongest in the Spanish study. Hallucinations: strongest predictor of nursing-home admission. [[Schrag2006CG,Martinez-Martin2008,Aarsland2000]]'});
  }
  const setCg=i=>{gi=i;[['#lvCgA',0],['#lvCgB',1],['#lvCgC',2]].forEach(([id,k])=>$(id).setAttribute('aria-pressed',k===i));if(stopG)stopG();stopG=animate(900,p=>{ga=p;drawCg()},()=>{stopG=null;ga=1;drawCg()})};
  $('#lvCgA').onclick=()=>setCg(0);$('#lvCgB').onclick=()=>setCg(1);$('#lvCgC').onclick=()=>setCg(2);

  /* ---------------- 4. palliative-care trial ---------------- */
  const pv=$('#lvPc');let m12=false,pa=1,stopP=null;
  function drawPc(){
    const N=vb(pv,'720 270','400 380'),e=ease(pa);
    let s=lvBg+`<text x="${N?16:20}" y="24" class="t-xs">${N?'210 PATIENTS, 175 CAREGIVERS':'OUTPATIENT PALLIATIVE CARE VS STANDARD CARE · 210 PATIENTS, 175 CAREGIVERS'}</text>`;
    if(!m12){const L=N?{x0:30,x1:370,g0:84,ay:170,py:124,la:56,lb:250,bx:16,bw:368,by:280}:{x0:330,x1:690,g0:50,ay:140,py:92,la:80,lb:216,bx:330,bw:360,by:198};
      const X=v=>L.x0+(v+1)/5*(L.x1-L.x0),lx=N?16:20,k=ramp(e,0,.6),k2=ramp(e,.4,1);
      for(let v=-1;v<=4;v++)s+=`<path d="M${f1(X(v))} ${L.g0}V${L.ay}" class="${v?'grid':'axis'}" style="${v?'':'stroke:var(--ink);stroke-width:1.5'}"/><text x="${f1(X(v))}" y="${L.ay+16}" class="t-xs t-mid">${v}</text>`;
      s+=`<text x="${f1(X(0)+6)}" y="${L.ay+32}" class="t-xs">favours palliative care →</text>`;
      s+=`<text x="${lx}" y="${L.la}" class="t-sm" style="fill:var(--ink)">Patient quality of life</text><text x="${lx}" y="${L.la+14}" class="t-xs">primary · 6 months</text>`;
      const a=X(.47),b=X(3.27),m=X(1.87);
      if(k>0)s+=`<path d="M${f1(lerp(m,a,k))} ${L.py}H${f1(lerp(m,b,k))}M${f1(lerp(m,a,k))} ${L.py-6}v12M${f1(lerp(m,b,k))} ${L.py-6}v12" style="stroke:var(--good);stroke-width:2"/><rect x="${f1(m-7)}" y="${L.py-7}" width="14" height="14" style="fill:var(--good)"/>`;
      if(k>.9)s+=`<text x="${f1(m)}" y="${L.py-14}" class="t-lbl t-mid">1.87 (0.47 to 3.27)</text><text x="${N?384:lx}" y="${N?L.la:L.la+32}" class="t-xs${N?' t-end':''}" style="fill:var(--good);font-weight:600">MET · P = .009</text>`;
      s+=`<g style="opacity:${f1(.2+.8*k2)}"><path d="M16 ${L.lb-(N?24:30)}H${N?384:704}" class="axis"/><text x="${lx}" y="${L.lb}" class="t-sm" style="fill:var(--ink)">Caregiver burden</text><text x="${lx}" y="${L.lb+14}" class="t-xs">co-primary · 6 months</text>`;
      s+=`<text x="${N?384:lx}" y="${N?L.lb:L.lb+32}" class="t-xs${N?' t-end':''}" style="fill:var(--bad);font-weight:600">NOT MET · P = .06</text>`;
      s+=`<rect x="${L.bx}" y="${L.by}" width="${L.bw}" height="50" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-dasharray:4 3"/><text x="${L.bx+14}" y="${L.by+21}" class="t-sm" style="fill:var(--ink)">Did not differ significantly</text><text x="${L.bx+14}" y="${L.by+38}" class="t-xs">no effect size drawn: none reported here</text></g>`}
    else{const R=[['Non-motor symptom burden','patients'],['Motor severity','patients'],['Advance directives completed','patients'],['Caregiver anxiety','caregivers'],['Caregiver burden','caregivers, now improved']];
      s+=`<text x="${N?16:20}" y="${N?52:50}" class="t-sm" style="fill:var(--ink)">Improved with palliative care by 12 months${N?'':' (secondary outcomes)'}</text>`;
      R.forEach(([l,sub],i)=>{const y=N?84+i*54:84+i*34,k=ease(ramp(e,i*.1,.4+i*.1)),x=N?16:20;
        s+=`<g style="opacity:${f1(.1+.9*k)}"><circle cx="${x+10}" cy="${y-4}" r="10" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.5"/><path d="M${x+5} ${y-4}l4 4l7 -8" style="fill:none;stroke:var(--good);stroke-width:2"/><text x="${x+28}" y="${y}" class="t-lbl">${l}</text><text x="${N?x+28:x+300}" y="${N?y+16:y}" class="t-xs">${sub}</text></g>`});
      s+=`<text x="${N?16:20}" y="${N?366:256}" class="t-xs" style="fill:var(--ink)">Benefits were larger in people with higher palliative-care needs.</text>`}
    pv.innerHTML=s;
    $('#lvPcCap').textContent=m12?'Secondary outcomes at 12 months, listed without effect sizes.':'Effect drawn with its 95% confidence interval; the trial reported no effect size for caregiver burden here, only that it did not differ (P = .06).';
    $('#lvPcNote').innerHTML=noteHTML({k:'Randomised trial · '+(m12?'12 months':'6 months'),t:m12?'Later, more outcomes improved':'One primary outcome met, one not',
      txt:m12?`By 12 months palliative care had improved non-motor symptom burden, motor severity, completion of advance directives, caregiver anxiety and caregiver burden, with larger benefits in people with higher palliative needs. These were secondary outcomes. [[Kluger2020]]`
             :`210 patients and 175 caregivers were randomised to standard care or care that added a neurologist, social worker, chaplain and nurse with palliative-specialist input. At 6 months patients' quality of life was better with palliative care (treatment effect 1.87, 95% CI 0.47 to 3.27, P=.009). Caregiver burden, the co-primary outcome, did not differ (P=.06). [[Kluger2020]]`,
      pt:m12?'Given more time, the team approach also helped symptoms, planning ahead and the carers\' anxiety and burden.':'Patients felt their quality of life was better with the palliative-care team. The trial did not show less carer burden at 6 months.',
      hook:'Kluger 2020: integrated outpatient palliative care improved patient QoL at 6 months; caregiver burden (co-primary) not met at 6 months, improved at 12. [[Kluger2020]]'});
  }
  const setPc=v=>{m12=v;$('#lvPc6').setAttribute('aria-pressed',!v);$('#lvPc12').setAttribute('aria-pressed',v);if(stopP)stopP();stopP=animate(900,p=>{pa=p;drawPc()},()=>{stopP=null;pa=1;drawPc()})};
  $('#lvPc6').onclick=()=>setPc(false);$('#lvPc12').onclick=()=>setPc(true);

  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawDom();drawCg();drawPc()};
  drawDom();drawCue(+cr.value);drawCg();drawPc();
};
