/* =============== 2.3 Asthma, look-alikes & imaging =============== */
/* Main scrubber: a spirometry map (FEV1/FVC across, FEV1 % predicted up) split at the published cut-offs
   into obstruction, normal and PRISm, with illustrative dots for PRISm transitions, pre-COPD and two
   asthma responses; then scenes for bronchiectasis (kit airway), heart failure (kit lungs + heart) and
   dot grids for under- and overdiagnosis. A side panel carries the published numbers. Interactives: a
   feature-by-feature comparison explorer, a schematic CT slice with the Fleischner patterns, and a
   lifetime FEV1 trajectory chart with PRISm transitions by cohort. */
const LK_STEPS=[
 {from:0,at:.1,k:'Ratio ≥ 0.70',t:'Not obstructed, not necessarily well',sub:'PRISm: a normal ratio with a low FEV1',
  txt:`GOLD 2023 defines PRISm as a post-bronchodilator FEV1/FVC ≥ 0.7 with FEV1 below 80% of reference. Reported prevalence is 7.1–20.3%, and it is associated with more all-cause mortality [[Agusti2023]]. In COPDGene, 22.2% of people with PRISm moved to normal spirometry and 25.1% progressed to GOLD 1–4 within 5 years [[Wan2018]].`,
  pt:`Some people blow a normal ratio but a small total. This is called PRISm. It is not COPD, but it needs watching.`,
  hook:`PRISm = ratio ≥ 0.7 with FEV1 < 80% predicted: not COPD, but excess mortality [[Agusti2023,Wan2021]].`},
 {from:.17,at:.27,k:'Symptoms, normal test',t:'Pre-COPD',sub:'symptoms or CT changes before the ratio falls',
  txt:`GOLD 2023 calls people with respiratory symptoms and/or structural or functional changes (emphysema, hyperinflation, reduced diffusing capacity, rapid FEV1 decline) but a ratio ≥ 0.7 "pre-COPD", and says there is no evidence yet on the best treatment [[Agusti2023]]. In SPIROMICS, 50% of smokers with preserved spirometry had a CAT of 10 or more [[Woodruff2016]].`,
  pt:`A normal breathing test does not always mean healthy lungs. Doctors call symptoms or scan changes with a normal ratio "pre-COPD".`,
  hook:`Pre-COPD: symptoms, structural or functional changes with FEV1/FVC ≥ 0.7; treatment evidence lacking [[Agusti2023]].`},
 {from:.34,at:.45,k:'Reversible?',t:'Asthma',sub:'one result clears after the inhaler; one does not',
  txt:`If airflow limitation disappears after bronchodilator, that is incompatible with COPD; otherwise reversibility does not separate asthma from COPD [[Agusti2023,Albert2012]]. Of 235 primary-care patients who met the spirometric definition of COPD, 51.5% had been labelled asthma only [[Tinkelman2006]].`,
  pt:`If the narrowing goes away completely after the reliever, it is not COPD. A partial improvement does not tell the two apart.`,
  hook:`Obstruction that disappears after bronchodilator is incompatible with COPD [[Agusti2023]].`},
 {from:.5,at:.6,k:'Dilated airways',t:'Bronchiectasis',sub:'widened, thick-walled airways seen on CT',
  txt:`About 30% of COPD patients have bronchiectasis on CT [[Agusti2023]]; among 201 with moderate-to-severe COPD who had high-resolution CT, 57.2% did, and it was independently associated with all-cause mortality (adjusted HR 2.54) [[MartinezGarcia2013]]. The ROSE definition (radiology, obstruction, symptoms, exposure) sets when the two coexist [[Traversi2021]].`,
  pt:`Bronchiectasis means some airways are permanently widened and fill with mucus. It often sits alongside COPD and needs a CT scan to see.`,
  hook:`ROSE: Radiology, Obstruction (ratio < 0.7), Symptoms, Exposure (≥ 10 pack-years or biomass) [[Traversi2021]].`},
 {from:.67,at:.77,k:'Wet lungs',t:'Heart failure',sub:'a heart cause hiding behind a lung label',
  txt:`Of 405 people aged 65 or over with a GP diagnosis of COPD, 20.5% had unrecognised heart failure, and only 60.2% met GOLD COPD criteria [[Rutten2005]]. A 2009 review advises echocardiography and lung function tests in people with both, with obstruction shown when euvolaemic [[Hawkins2009]]. A chest X-ray helps exclude an enlarged heart [[Agusti2023]].`,
  pt:`Heart failure can cause breathlessness too. A heart scan and a breathing test done when you are not holding extra fluid help tell them apart.`,
  hook:`20.5% of older people labelled COPD had unrecognised heart failure [[Rutten2005]].`},
 {from:.83,at:.95,k:'Wrong label',t:'Over- and underdiagnosis',sub:'labels that miss, and labels that do not fit',
  txt:`In BOLD and other surveys, 81.4% of spirometrically defined COPD was undiagnosed [[Lamprecht2015]], while 61.9% of people reporting a doctor's diagnosis of COPD had unobstructed spirometry [[Sator2019]]. A 2018 review estimates that about 70% of COPD worldwide is undiagnosed [[Diab2018]].`,
  pt:`Many people with COPD have never been told, and some people told they have COPD have normal breathing tests.`,
  hook:`BOLD: 81.4% of spirometric COPD undiagnosed; 61.9% of reported diagnoses unobstructed [[Lamprecht2015,Sator2019]].`}
];
const LK_TXT={
  xl:'FEV1/FVC after inhaler',yl:'FEV1 % predicted',obs:'Obstruction',norm:'Normal',prism:'PRISm',
  toN:'to normal: 22.2%',toC:'to GOLD 1–4: 25.1%',ring:'ringed: symptoms or CT',
  gone:'gone after inhaler',still:'still below 0.70',
  awT:'Airways cut across (schematic)',rose:['Radiology','Obstruction','Symptoms','Exposure'],awN:'normal airway',awB:['widened airway: thick','wall and mucus'],
  hfT:'Chest X-ray (schematic)',hfBig:'large heart',hfC:['heart scan (echo)','natriuretic peptides'],
  gL:'Spirometric COPD',gR:'Doctor-diagnosed COPD',gLv:'81.4% undiagnosed',gRv:'61.9% unobstructed',
  gLk:'ring: not diagnosed',gRk:'ring: normal spirometry',
  /* side panel per step: kicker, short text and big numbers */
  side:[
    {k:'PRISM',txt:'Post-bronchodilator ratio ≥ 0.70 with FEV1 below 80% predicted (GOLD 2023).',
     b:[['7.1–20.3%','reported prevalence (GOLD 2023)'],['29.6 vs 18.0','deaths per 1,000 person-years, PRISm vs normal, in 53,701 US adults: adjusted HR 1.50']]},
    {k:'PRE-COPD',txt:'Symptoms, emphysema, hyperinflation, low diffusing capacity or rapid FEV1 decline, with a ratio ≥ 0.70.',
     b:[['50%','of smokers with preserved spirometry had CAT ≥ 10 (SPIROMICS)'],['42.3%','of 300 smokers with normal spirometry who had CT showed emphysema or airway thickening (COPDGene)']]},
    {k:'ASTHMA',txt:'Obstruction that disappears after bronchodilator is incompatible with COPD (GOLD 2023).',
     b:[['51.5%','of spirometric COPD in primary care had been labelled asthma only'],['27% · 28%','asthma–COPD overlap among people with COPD: population and hospital studies']]},
    {k:'BRONCHIECTASIS',txt:'ROSE: radiology, obstruction, symptoms and exposure must all be present.',
     b:[['~30%','of COPD patients have bronchiectasis on CT (GOLD 2023)'],['HR 2.54','all-cause mortality with bronchiectasis in moderate-to-severe COPD']]},
    {k:'HEART FAILURE',txt:'Test lung function when euvolaemic; very high or very low natriuretic peptides are informative, intermediate values are not.',
     b:[['20.5%','of 405 people aged 65 or over with a GP label of COPD had unrecognised heart failure'],['60.2%','of the same people actually met GOLD COPD criteria']]},
    {k:'WRONG LABEL',txt:'Both errors are common, in opposite directions.',
     b:[['81.4%','of spirometric COPD undiagnosed (BOLD, 27 countries)'],['61.9%','of reported COPD diagnoses had unobstructed spirometry (BOLD)']]}],
  /* explorer */
  none:'Not covered by the sources behind this module.',
  conds:['COPD','Asthma','Bronchiectasis','Heart failure'],
  /* CT */
  sev:['trace','mild','moderate','confluent','advanced destructive'],
  ao:'aorta',pa:'pulmonary artery',paa:'PA:A > 1',
  ct:{normal:{k:'Reference',t:'A schematic slice',txt:'Two lungs with vessels branching out from the middle and a few airways, the aorta and pulmonary artery between them and the spine below. The Fleischner Society statement classifies what CT can show in COPD: emphysema patterns, airway wall thickening, small airways disease, tracheal changes, interstitial abnormalities, pulmonary artery enlargement and bronchiectasis [[Lynch2015]].'},
    centri:{k:'Emphysema',t:'Centrilobular',txt:'Graded trace, mild, moderate, confluent or advanced destructive [[Lynch2015]]. It is the pattern most closely linked to smoking: lesions start around the respiratory bronchioles and merge to destroy large volumes of lung [[Hogg2004Lancet,Hogg2009]]. In MESA, centrilobular emphysema was linked to 21 more pack-years [[Smith2014]].'},
    pan:{k:'Emphysema',t:'Panlobular',txt:'Panlobular (panacinar) emphysema involves the acinus more evenly and is associated with alpha-1 antitrypsin deficiency [[Hogg2004Lancet,Hogg2009]]. In MESA it was linked to a body-mass index 5 kg/m² lower [[Smith2014]]. More on the inherited form in <a href="#aatd" data-go="aatd">Alpha-1 antitrypsin deficiency</a>.'},
    para:{k:'Emphysema',t:'Paraseptal',txt:'Graded mild or substantial [[Lynch2015]]. In MESA, people with paraseptal emphysema looked like controls apart from a male predominance, while centrilobular and panlobular emphysema came with more breathlessness, shorter walks and lower diffusing capacity [[Smith2014]].'},
    wall:{k:'Airways',t:'Airway wall thickening',txt:'One of the Fleischner visual features [[Lynch2015]]. Thicker airway walls were seen in COPDGene smokers with PRISm [[Wan2011]], and 42.3% of 300 smokers with normal spirometry who had CT showed emphysema or airway thickening [[Regan2015]].'},
    bronch:{k:'Airways',t:'Bronchiectasis',txt:'About 30% of COPD patients have bronchiectasis on CT [[Agusti2023]]. The ROSE radiology criterion is bronchial dilatation in at least one segment and more than one lobe [[Traversi2021]], and clinically significant bronchiectasis needs both clinical and radiological criteria [[Aliberti2022]].'},
    pa:{k:'Vessels',t:'Pulmonary artery wider than the aorta',txt:'A pulmonary artery to aorta diameter ratio above 1 was associated with future severe exacerbations: OR 3.44 in the trial cohort and 2.80 in an external validation cohort [[Wells2012]]. CT also shows coronary calcification, bone density and muscle mass [[Agusti2023]].'}},
  /* trajectory */
  ageV:a=>`${a} years`,ageAx:'age (years)',fev:'FEV1, litres (schematic level)',
  nStart:'normal start',lStart:'low start',nRate:'−53 mL/yr',lRate:'−27 mL/yr',pre:'pre-COPD (schematic)',endC:'COPD by the end of follow-up',
  prismBox:'People with PRISm',normBox:'Normal',copdBox:{cg:'GOLD 1–4',rt:'COPD'},
  coh:{cg:{n:'COPDGene, 5 years',a:22.2,b:25.1,note:['Persistent PRISm: −27.3 mL/yr','Stable normal smokers: −33.0 mL/yr']},
       rt:{n:'Rotterdam, 4.5 years',a:15.7,b:49.4,note:['Mortality HR 1.6 all-cause','and 2.8 cardiovascular']}},
  pct:v=>`${v}%`
};
/* the explorer: each feature, then what the sources say for COPD, asthma, bronchiectasis, heart failure (null = not covered) */
const LK_FEAT=[
 {n:'Spirometry after the inhaler',c:[
  'A post-bronchodilator FEV1/FVC below 0.7 is needed to establish the diagnosis [[Agusti2023]].',
  'Asthma can also show obstruction that is not fully reversible. If airflow limitation disappears after bronchodilator, that is incompatible with COPD [[Agusti2023]].',
  'In the European registry, 22.2% of people with bronchiectasis and a COPD co-diagnosis had no airflow obstruction [[Polverino2024]]. ROSE requires FEV1/FVC below 0.7 for the COPD–bronchiectasis association [[Traversi2021]].',
  'Airflow obstruction should be shown when the person is euvolaemic, not carrying extra fluid [[Hawkins2009]].']},
 {n:'Reversibility',c:[
  'Varies over time in the same person and does not predict long-term response to treatment [[Agusti2023]]. In ECLIPSE, reversibility status changed between four tests in a year [[Albert2012]].',
  'Reversibility does not by itself separate asthma from COPD [[Agusti2023,Albert2012]].',null,null]},
 {n:'Exposure and early life',c:[
  'Case-finding targets people with symptoms and/or risk factors, for example more than 20 pack-years, recurrent chest infections, prematurity or other early-life events [[Agusti2023]].',
  'Abnormal lung development in childhood can cause asthma-like symptoms, so some children labelled "asthma" may have been on a low lung-function trajectory [[Agusti2023]].',
  'ROSE exposure criterion: at least 10 pack-years or other toxic agents such as biomass [[Traversi2021]]. In the registry, 31.9% of those with a COPD co-diagnosis lacked 10 pack-years [[Polverino2024]].',null]},
 {n:'Symptoms',c:[
  'Chronic breathlessness, cough, sputum and/or exacerbations [[Agusti2023]].',null,
  'ROSE: at least two of cough, expectoration, breathlessness, fatigue and frequent infections [[Traversi2021]].',null]},
 {n:'Imaging',c:[
  'A chest X-ray cannot confirm COPD but may show hyperinflation, hyperlucency and rapidly tapering vessels [[Agusti2023]]. CT shows emphysema patterns and airway changes [[Lynch2015]].',null,
  'ROSE radiology criterion: bronchial dilatation in at least one segment and more than one lobe [[Traversi2021]]. Clinically significant bronchiectasis needs both clinical and radiological criteria [[Aliberti2022]].',
  'A chest X-ray helps exclude alternatives to COPD, including an enlarged heart [[Agusti2023]].']},
 {n:'When both are present',c:[
  'GOLD 2023 lists the presence and type of other conditions as one of four assessment goals [[Agusti2023]].',
  'GOLD 2023: people with COPD and asthma together should be treated as if they have asthma [[Agusti2023]].',
  'ROSE needs all four criteria. Only 55.4% of registry patients with a COPD co-diagnosis met it [[Traversi2021,Polverino2024]].',
  'Echocardiography and lung function tests are advised in people with both; very high or very low natriuretic peptides are informative, intermediate values are not [[Hawkins2009]].']},
 {n:'Hidden behind a COPD label',c:[
  'In BOLD, 61.9% of people reporting a doctor’s diagnosis of COPD had unobstructed spirometry [[Sator2019]]. A review estimates 30–60% of physician-diagnosed COPD is not COPD [[Diab2018]].',
  'Of 235 primary-care patients meeting the spirometric definition of COPD, 51.5% had been labelled asthma only [[Tinkelman2006]]. Overlap: 27% (population) and 28% (hospital) of people with COPD [[Alshabanat2015]].',
  'About 30% of people with COPD have bronchiectasis on CT [[Agusti2023]]; 57.2% of 201 with moderate-to-severe COPD on high-resolution CT [[MartinezGarcia2013]].',
  '20.5% of 405 people aged 65 or over with a GP diagnosis of COPD had unrecognised heart failure (42 systolic, 41 isolated diastolic) [[Rutten2005]].']},
 {n:'Outlook when combined with COPD',c:[null,
  'Compared with COPD alone, overlap patients were younger, had higher BMI and more healthcare use, and worse quality of life [[Alshabanat2015]].',
  'Independently associated with all-cause mortality: adjusted HR 2.54 over a median 48 months [[MartinezGarcia2013]].',null]}
];
const LK_CCOL=['var(--dx)','var(--rx)','var(--mucus)','var(--heart)'];
/* a point uniformly inside an ellipse, from a seeded generator */
function lkInEll(R,cx,cy,rx,ry,k=1){for(let i=0;i<40;i++){const u=R()*2-1,v=R()*2-1;if(u*u+v*v<=1)return [cx+u*rx*k,cy+v*ry*k]}return [cx,cy]}
inits.lookalikes=()=>{
  const svg=$('#lkSvg'),rg=$('#lkT'),note=$('#lkNote');let setSt=()=>{};
  /* illustrative dots, fixed once */
  const R0=rng(23),prismDots=[...Array(12)].map((_,i)=>({r:lerp(.73,.96,R0()),v:lerp(36,74,R0()),go:i<3?'n':i<6?'c':'', tv:lerp(86,102,R0()),tr:lerp(.48,.58,R0())}));
  const normDots=[...Array(10)].map((_,i)=>({r:lerp(.74,.96,R0()),v:lerp(91,111,R0()),ring:i%2===0}));
  function draw(t){
    const N=vb(svg,'720 400','400 720'),p=phaseOf(LK_STEPS,t),S=LK_STEPS[p];
    const L=N?{sub:52,P:{x:58,y:86,w:322,h:216},D:{x:16,y:356,w:368,h:350},dc:50,bc:58}
             :{sub:100,P:{x:72,y:66,w:328,h:244},D:{x:424,y:56,w:280,h:336},dc:38,bc:44};
    const P=L.P,X=r=>P.x+P.w*(r-.4)/.6,Y=v=>P.y+P.h*(120-v)/100;
    let s=`<text x="16" y="26" class="t-big" style="fill:var(--dx)">${S.t}</text>`+wrapT(16,42,S.sub,L.sub,{cls:'t-sm'}).svg;
    const pOp=1-ramp(t,.48,.51);
    if(pOp>0){let g=`<g style="opacity:${f1(pOp)}">`;
      const hl=p===0?'prism':p===1?'norm':p===2?'obs':'';
      g+=`<rect x="${f1(X(.4))}" y="${f1(Y(120))}" width="${f1(X(.7)-X(.4))}" height="${f1(P.h)}" style="fill:var(--bad-soft);stroke:${hl==='obs'?'var(--bad)':'none'};stroke-width:2"/>`;
      g+=`<rect x="${f1(X(.7))}" y="${f1(Y(120))}" width="${f1(X(1)-X(.7))}" height="${f1(Y(80)-Y(120))}" style="fill:var(--good-soft);stroke:${hl==='norm'?'var(--good)':'none'};stroke-width:2"/>`;
      g+=`<rect x="${f1(X(.7))}" y="${f1(Y(80))}" width="${f1(X(1)-X(.7))}" height="${f1(Y(20)-Y(80))}" style="fill:var(--warn-soft);stroke:${hl==='prism'?'var(--warn)':'none'};stroke-width:2"/>`;
      [80,50,30].forEach(v=>g+=`<line x1="${f1(X(.4))}" x2="${f1(X(.7))}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--bad);stroke-width:1;stroke-dasharray:3 4;opacity:.6"/>`);
      [[100,'GOLD 1'],[65,'GOLD 2'],[40,'GOLD 3'],[25,'GOLD 4']].forEach(q=>g+=`<text x="${f1(X(.7)-6)}" y="${f1(Y(q[0])+4)}" class="t-xs t-end">${q[1]}</text>`);
      g+=axes(P.x,P.y,P.w,P.h,{xt:[.4,.5,.6,.7,.8,.9,1].map(r=>[(r-.4)/.6,r.toFixed(1)]),yt:[20,40,60,80,100,120].map(v=>[(v-20)/100,v+'%']),xl:LK_TXT.xl,yl:LK_TXT.yl,grid:false});
      g+=`<line x1="${f1(X(.7))}" x2="${f1(X(.7))}" y1="${f1(Y(120))}" y2="${f1(Y(20))}" style="stroke:var(--ink);stroke-width:2"/>`;
      g+=`<text x="${f1(X(.4)+8)}" y="${f1(Y(120)+16)}" class="t-xs" style="fill:var(--bad);font-weight:700">${LK_TXT.obs}</text><text x="${f1(X(.7)+8)}" y="${f1(Y(120)+16)}" class="t-xs" style="fill:var(--good);font-weight:700">${LK_TXT.norm}</text><text x="${f1(X(.7)+8)}" y="${f1(Y(80)+16)}" class="t-xs" style="fill:var(--warn);font-weight:700">${LK_TXT.prism}</text>`;
      const dot=(r,v,c,ring=0)=>`<circle cx="${f1(X(r))}" cy="${f1(Y(v))}" r="5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/>`+(ring>0?`<circle cx="${f1(X(r))}" cy="${f1(Y(v))}" r="9" style="fill:none;stroke:var(--warn);stroke-width:2;opacity:${f1(ring)}"/>`:'');
      if(p===0){const k=ease(ramp(t,.06,.13));
        prismDots.forEach(d=>{const r=d.go==='c'?lerp(d.r,d.tr,k):d.r,v=d.go==='n'?lerp(d.v,d.tv,k):d.v,c=k>.5&&d.go==='n'?'var(--good)':k>.5&&d.go==='c'?'var(--bad)':'var(--warn)';g+=dot(r,v,c)});
        const lo=ramp(t,.12,.15);g+=`<text x="${f1(X(1)-8)}" y="${f1(Y(120)+16)}" class="t-xs t-end" style="fill:var(--good);font-weight:600;opacity:${f1(lo)}">${LK_TXT.toN}</text><text x="${f1(X(.41))}" y="${f1(Y(26))}" class="t-xs" style="fill:var(--bad);font-weight:600;opacity:${f1(lo)}">${LK_TXT.toC}</text>`}
      if(p===1){const k=ramp(t,.2,.26);normDots.forEach(d=>g+=dot(d.r,d.v,'var(--good)',d.ring?k:0));
        g+=`<text x="${f1(X(1)-8)}" y="${f1(Y(80)-6)}" class="t-xs t-end" style="fill:var(--warn);font-weight:600;opacity:${f1(k)}">${LK_TXT.ring}</text>`}
      if(p===2){const k=ease(ramp(t,.37,.44)),A={r0:.62,v0:70,r1:.76,v1:88},B={r0:.52,v0:46,r1:.58,v1:54};
        [A,B].forEach(q=>{g+=`<circle cx="${f1(X(q.r0))}" cy="${f1(Y(q.v0))}" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:2 2"/><path d="M${f1(X(q.r0))} ${f1(Y(q.v0))}L${f1(X(lerp(q.r0,q.r1,k)))} ${f1(Y(lerp(q.v0,q.v1,k)))}" style="stroke:var(--rx);stroke-width:1.6;stroke-dasharray:4 3"/>`});
        g+=dot(lerp(A.r0,A.r1,k),lerp(A.v0,A.v1,k),k>.75?'var(--good)':'var(--rx)')+dot(lerp(B.r0,B.r1,k),lerp(B.v0,B.v1,k),'var(--rx)');
        const lo=ramp(t,.43,.45);g+=`<text x="${f1(X(A.r1)+10)}" y="${f1(Y(A.v1)+4)}" class="t-xs" style="fill:var(--good);font-weight:600;opacity:${f1(lo)}">${LK_TXT.gone}</text><text x="${f1(X(B.r1))}" y="${f1(Y(B.v1)-12)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:600;opacity:${f1(lo)}">${LK_TXT.still}</text>`}
      s+=g+'</g>'}
    /* scenes */
    if(p===3){const o=ramp(t,.5,.53),k=ease(ramp(t,.53,.6)),cy=N?P.y+96:P.y+104,ax=N?[130,280]:[150,300],r0=N?30:34,r1=N?48:56;
      s+=`<g style="opacity:${f1(o)}"><text x="${P.x}" y="${P.y+4}" class="t-xs" style="fill:var(--ink);font-weight:600">${LK_TXT.awT}</text>`;
      s+=airway(ax[0],cy,r0,{tether:0,ph:t*8,seed:3}).svg+airway(ax[1],cy,lerp(r0,r1,k),{tether:0,wall:.7*k,mucus:.45*k,inflam:.5*k,ph:t*8,seed:5}).svg;
      s+=`<text x="${ax[0]}" y="${f1(cy+r1+26)}" class="t-xs t-mid" style="fill:var(--ink)">${LK_TXT.awN}</text>`;
      LK_TXT.awB.forEach((l,i)=>s+=`<text x="${ax[1]}" y="${f1(cy+r1+26+i*13)}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(ramp(t,.58,.6))}">${l}</text>`);
      let rx=P.x+2;LK_TXT.rose.forEach((c,i)=>{const on=ramp(t,.58+i*.005,.59+i*.005),w=Math.max(30,c.length*11*.58+16);s+=chip(rx,P.y+P.h-14,c,{w,size:11,col:on?'var(--dx)':'var(--line)',fill:on?'var(--dx-soft)':'var(--panel)'});rx+=w+(N?4:6)});
      s+='</g>'}
    if(p===4){const o=ramp(t,.67,.7),k=ease(ramp(t,.7,.76)),cx=P.x+P.w/2,ls=N?168:190,hy=P.y+(N?150:170),hs=lerp(N?52:58,N?80:90,k);
      s+=`<g style="opacity:${f1(o)}"><text x="${P.x}" y="${P.y+4}" class="t-xs" style="fill:var(--ink);font-weight:600">${LK_TXT.hfT}</text>`;
      s+=lungs(cx,P.y+16,ls,{tree:true})+heart(cx+10,hy,hs);
      const lo=ramp(t,.74,.76),lx=cx+ls*.52;s+=`<path d="M${f1(cx+10+hs*.45)} ${f1(hy)}L${f1(lx-4)} ${f1(hy)}" style="stroke:var(--heart);stroke-width:1.2;opacity:${f1(lo)}"/><text x="${f1(lx)}" y="${f1(hy+4)}" class="t-xs" style="fill:var(--heart);font-weight:700;opacity:${f1(lo)}">${LK_TXT.hfBig}</text>`;
      LK_TXT.hfC.forEach((c,i)=>s+=chip(P.x+(N?80:80)+i*(N?162:170),P.y+P.h-6,c,{anchor:'middle',col:'var(--heart)',size:12}));
      s+='</g>'}
    if(p===5){const o=ramp(t,.83,.86),k=ramp(t,.86,.95),sp=13,gx=N?[72,238]:[96,262],gy=P.y+(N?40:44),n=Math.round(100*k);
      s+=`<g style="opacity:${f1(o)}">`;
      [[LK_TXT.gL,LK_TXT.gLv,LK_TXT.gLk,81,'var(--bad)'],[LK_TXT.gR,LK_TXT.gRv,LK_TXT.gRk,62,'var(--warn)']].forEach((G,j)=>{const x0=gx[j];
        s+=`<text x="${f1(x0+sp*4.5)}" y="${f1(gy-14)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${G[0]}</text>`;
        for(let i=0;i<n;i++){const cx=x0+(i%10)*sp,cy=gy+Math.floor(i/10)*sp,ring=i>=100-G[3];
          s+=ring?`<circle cx="${cx}" cy="${cy}" r="4.2" style="fill:none;stroke:${G[4]};stroke-width:1.6"/>`:`<circle cx="${cx}" cy="${cy}" r="4.5" style="fill:var(--dx)"/>`}
        s+=`<text x="${f1(x0+sp*4.5)}" y="${f1(gy+10*sp+14)}" class="t-lbl t-mid" style="fill:${G[4]};opacity:${f1(ramp(t,.93,.95))}">${G[1]}</text><text x="${x0-4}" y="${f1(gy+10*sp+40)}" class="t-xs">${G[2]}</text>`});
      s+='</g>'}
    /* side panel */
    const D=L.D,SD=LK_TXT.side[p];let y=D.y+22;
    s+=`<rect x="${D.x}" y="${D.y}" width="${D.w}" height="${D.h}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<text x="${D.x+14}" y="${y}" class="t-xs" style="fill:var(--dx);font-weight:700">${SD.k}</text>`;y+=22;
    const W=wrapT(D.x+14,y,SD.txt,L.dc,{cls:'t-sm',lh:15});s+=W.svg;y+=W.h+16;
    SD.b.forEach(b=>{y+=14;s+=`<text x="${D.x+14}" y="${y}" style="font:700 24px var(--display);fill:var(--ink)">${b[0]}</text>`;y+=18;
      const C=wrapT(D.x+14,y,b[1],L.bc,{cls:'t-xs',lh:13});s+=C.svg;y+=C.h+10});
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#lkPlay'),draw,16000,'%t:player.replay%','lookalikes');
  setSt=stepWire($('#lkSteps'),LK_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- comparison explorer ---- */
  const fEl=$('#lkFeats'),cEl=$('#lkCmp');let feat=0;
  fEl.innerHTML=LK_FEAT.map((f,i)=>`<button class="btn" data-lkf="${i}" aria-pressed="${i===0}">${f.n}</button>`).join('');
  function cmp(){$$('[data-lkf]',fEl).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.lkf===feat?'true':'false'));
    const F=LK_FEAT[feat];cEl.innerHTML=F.c.map((c,i)=>`<div class="card"><span class="kicker">${F.n}</span><h4><i style="background:${LK_CCOL[i]}"></i>${LK_TXT.conds[i]}</h4>${c?`<p>${c}</p>`:`<p class="none">${LK_TXT.none}</p>`}</div>`).join('')}
  fEl.addEventListener('click',e=>{const b=e.target.closest('[data-lkf]');if(!b)return;feat=+b.dataset.lkf;cmp()});
  cmp();

  /* ---- CT slice ---- */
  const ctSvg=$('#lkCtSvg'),ctBtns=$('#lkCtBtns'),sev=$('#lkCtSev'),sevV=$('#lkCtSevV'),ctNote=$('#lkCtNote');let pat='normal';
  const LUNG=[{cx:145,cy:175,rx:92,ry:130,hx:215,side:-1},{cx:378,cy:175,rx:86,ry:126,hx:310,side:1}];
  function ctDraw(){const N=vb(ctSvg,'520 360','400 290'),k=N?400/520:1,sv=+sev.value,R=rng(41);let g='';
    g+=`<ellipse cx="260" cy="180" rx="248" ry="168" style="fill:var(--tissue);stroke:var(--line);stroke-width:1.5"/>`;
    LUNG.forEach(l=>g+=`<ellipse cx="${l.cx}" cy="${l.cy}" rx="${l.rx}" ry="${l.ry}" style="fill:var(--lung);stroke:var(--bronchi);stroke-width:1.2"/>`);
    if(pat==='pan')LUNG.forEach(l=>g+=`<ellipse cx="${l.cx}" cy="${l.cy}" rx="${l.rx-4}" ry="${l.ry-4}" style="fill:var(--panel);opacity:.62"/>`);
    /* vessels: denser and larger near the hilum; fewer where lung is destroyed */
    const vk=pat==='pan'?.45:pat==='centri'&&sv>=3?(sv===4?.4:.7):1;
    LUNG.forEach(l=>{for(let i=0;i<70;i++){const q=lkInEll(R,l.cx,l.cy,l.rx,l.ry,.92),d=Math.hypot((q[0]-l.hx)/l.rx,(q[1]-l.cy)/l.ry);if(R()>vk)continue;
      g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(clamp(3.6-2.4*d,1.1,3.6)*(pat==='pan'?.75:1))}" style="fill:var(--blood);opacity:.8"/>`}});
    /* emphysema air spaces */
    const hole=(x,y,r)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--alv-edge);stroke-width:.9;opacity:.95"/>`;
    if(pat==='centri'){const n=[4,10,20,14,9][sv],rr=[3,4.5,6,0,0][sv];
      LUNG.forEach(l=>{for(let i=0;i<n;i++){const q=lkInEll(R,l.cx,l.cy,l.rx,l.ry,.78);
        if(sv<3)g+=hole(q[0],q[1],rr);
        else{const m=sv===3?3:5,base=sv===3?6:11;for(let j=0;j<m;j++)g+=hole(q[0]+(R()-.5)*base*2.2,q[1]+(R()-.5)*base*2.2,base*lerp(.8,1.3,R()))}}})}
    if(pat==='para')LUNG.forEach(l=>{for(let a=-1.5;a<=1.5;a+=.17){const ang=l.side>0?a:Math.PI-a,x=l.cx+Math.cos(ang)*(l.rx-8),y=l.cy+Math.sin(ang)*(l.ry-8);g+=hole(x,y,lerp(4.5,7,R()))}});
    /* airways */
    LUNG.forEach(l=>{const n=pat==='wall'?10:pat==='bronch'?6:6;for(let i=0;i<n;i++){const q=lkInEll(R,(l.cx+l.hx)/2,l.cy,l.rx*.55,l.ry*.6);
      if(pat==='bronch'){const r=lerp(10,14,R());g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(r)}" style="fill:var(--air-soft);stroke:var(--airway);stroke-width:3.2"/>`+(i%2?`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(r*.55)}" style="fill:var(--mucus);opacity:.85"/>`:'')}
      else g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${pat==='wall'?6.5:4.5}" style="fill:var(--air-soft);stroke:var(--airway);stroke-width:${pat==='wall'?3.8:1.4}"/>`}});
    /* mediastinum and spine */
    const paR=pat==='pa'?27:18;
    g+=`<circle cx="250" cy="122" r="20" style="fill:var(--blood);stroke:var(--panel);stroke-width:1.5;opacity:.9"/><circle cx="292" cy="86" r="${paR}" style="fill:var(--capillary);stroke:${pat==='pa'?'var(--bad)':'var(--panel)'};stroke-width:${pat==='pa'?2.4:1.5};opacity:.9"/>`;
    g+=`<circle cx="260" cy="314" r="26" style="fill:var(--bone);stroke:var(--line)"/><rect x="248" y="18" width="24" height="14" rx="4" style="fill:var(--bone);stroke:var(--line)"/>`;
    let s=k===1?g:`<g transform="scale(${k.toFixed(4)})">${g}</g>`;
    /* labels at full size */
    const T=(x,y)=>[f1(x*k),f1(y*k)];
    const a=T(250,160),b=T(292+paR,62);
    s+=`<text x="${a[0]}" y="${a[1]}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600;paint-order:stroke;stroke:var(--tissue);stroke-width:3px">${LK_TXT.ao}</text>`;
    s+=`<text x="${f1(+b[0]+4)}" y="${b[1]}" class="t-xs" style="fill:var(--ink);font-weight:600;paint-order:stroke;stroke:var(--tissue);stroke-width:3px">${pat==='pa'?LK_TXT.paa:LK_TXT.pa}</text>`;
    ctSvg.innerHTML=s;
    $$('[data-lkct]',ctBtns).forEach(x=>x.setAttribute('aria-pressed',x.dataset.lkct===pat?'true':'false'));
    sevV.textContent=LK_TXT.sev[sv];
    const C=LK_TXT.ct[pat];ctNote.innerHTML=`<div class="kicker">${C.k}</div><h4>${C.t}${pat==='centri'?' · '+LK_TXT.sev[sv]:''}</h4><p>${C.txt}</p>`}
  ctBtns.addEventListener('click',e=>{const b=e.target.closest('[data-lkct]');if(!b)return;pat=b.dataset.lkct;ctDraw()});
  sev.addEventListener('input',()=>{pat='centri';ctDraw()});
  ctDraw();

  /* ---- trajectory and PRISm transitions ---- */
  const tSvg=$('#lkTrajSvg'),age=$('#lkAge'),ageV=$('#lkAgeV'),cohEl=$('#lkCoh');let coh='cg';
  const lkN=a=>a<40?4.0:4.0-.053*(a-40),lkL=a=>a<40?3.0:3.0-.027*(a-40);
  function trDraw(){const N=vb(tSvg,'720 320','400 580'),a=+age.value;
    const L=N?{C:{x:50,y:40,w:334,h:216},Q:{cx:200,y:330,bw:120,by:460,lx:120,rx:280},nt:{x:16,y:520}}
             :{C:{x:64,y:40,w:356,h:216},Q:{cx:582,y:44,bw:110,by:188,lx:515,rx:650},nt:{x:470,y:252}};
    const C=L.C,X=g=>C.x+C.w*(g-25)/45,Y=v=>C.y+C.h*(4.5-v)/3;let s='';
    s+=axes(C.x,C.y,C.w,C.h,{xt:[25,30,40,50,60,70].map(g=>[(g-25)/45,String(g)]),yt:[2,3,4].map(v=>[(v-1.5)/3,v+' L']),xl:LK_TXT.ageAx,yl:LK_TXT.fev});
    const line=(f,col,dash)=>`<path d="${pathFn(u=>(f(25+u*(a-25))-1.5)/3,X(25),X(a),Y(1.5),Y(4.5),80)}" style="fill:none;stroke:${col};stroke-width:2.6;${dash?'stroke-dasharray:6 4':''}"/>`;
    s+=`<path d="${pathFn(u=>(lkN(25+u*45)-1.5)/3,X(25),X(70),Y(1.5),Y(4.5),60)}" style="fill:none;stroke:var(--line);stroke-width:1.4"/><path d="${pathFn(u=>(lkL(25+u*45)-1.5)/3,X(25),X(70),Y(1.5),Y(4.5),60)}" style="fill:none;stroke:var(--line);stroke-width:1.4"/>`;
    s+=line(lkN,'var(--dx)')+line(lkL,'var(--rx)',1);
    s+=`<text x="${f1(X(26))}" y="${f1(Y(4)-7)}" class="t-xs" style="fill:var(--dx);font-weight:600">${LK_TXT.nStart}</text><text x="${f1(X(26))}" y="${f1(Y(3)-7)}" class="t-xs" style="fill:var(--rx);font-weight:600">${LK_TXT.lStart}</text>`;
    if(a>=58){s+=`<text x="${f1(X(58))}" y="${f1(Y(lkN(58))-9)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">${LK_TXT.nRate}</text><text x="${f1(X(58))}" y="${f1(Y(lkL(58))+17)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">${LK_TXT.lRate}</text>`}
    if(a>=42){const b0=X(42),b1=X(Math.min(52,a)),by0=Y(lkN(42))-12,by1=Y(lkN(Math.min(52,a)))-12;
      s+=`<path d="M${f1(b0)} ${f1(by0+6)}L${f1(b0)} ${f1(by0)}L${f1(b1)} ${f1(by1)}L${f1(b1)} ${f1(by1+6)}" style="fill:none;stroke:var(--warn);stroke-width:1.8"/>`;
      if(a>=52)s+=`<text x="${f1(X(47))}" y="${f1(Y(lkN(47))-26)}" class="t-xs t-mid" style="fill:var(--warn);font-weight:600">${LK_TXT.pre}</text>`}
    if(a>=70)s+=`<text x="${f1(X(70))}" y="${f1(Y(lkL(70))+18)}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${LK_TXT.endC}</text>`;
    s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${C.y}" y2="${C.y+C.h}" style="stroke:var(--brand);stroke-width:1.4;stroke-dasharray:3 3"/><circle cx="${f1(X(a))}" cy="${f1(Y(lkN(a)))}" r="4.5" style="fill:var(--dx)"/><circle cx="${f1(X(a))}" cy="${f1(Y(lkL(a)))}" r="4.5" style="fill:var(--rx)"/>`;
    /* PRISm transitions */
    const Q=L.Q,H=LK_TXT.coh[coh],box=(cx,y,w,t,col)=>`<rect x="${f1(cx-w/2)}" y="${y}" width="${w}" height="32" rx="8" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><text x="${f1(cx)}" y="${y+20}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${t}</text>`;
    const arr=(x0,y0,x1,y1,v,col,side)=>{const w=2+v*.5,mx=(x0+x1)/2,my=(y0+y1)/2;return `<path d="M${f1(x0)} ${f1(y0)}L${f1(x1)} ${f1(y1)}" style="stroke:${col};stroke-width:${f1(w)};stroke-linecap:round;opacity:.75"/><text x="${f1(mx+side*(w/2+10))}" y="${f1(my+5)}" class="t-lbl ${side<0?'t-end':''}" style="fill:${col}">${LK_TXT.pct(v)}</text>`};
    s+=arr(Q.cx-16,Q.y+32,Q.lx,Q.by,H.a,'var(--good)',-1)+arr(Q.cx+16,Q.y+32,Q.rx,Q.by,H.b,'var(--bad)',1);
    s+=box(Q.cx,Q.y,140,LK_TXT.prismBox,'var(--warn)')+box(Q.lx,Q.by,Q.bw,LK_TXT.normBox,'var(--good)')+box(Q.rx,Q.by,Q.bw,LK_TXT.copdBox[coh],'var(--bad)');
    s+=`<text x="${L.nt.x}" y="${L.nt.y}" class="t-lbl">${H.n}</text>`;
    H.note.forEach((l,i)=>s+=`<text x="${L.nt.x}" y="${L.nt.y+18+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    tSvg.innerHTML=s;ageV.textContent=LK_TXT.ageV(a);
    $$('[data-lkcoh]',cohEl).forEach(b=>b.setAttribute('aria-pressed',b.dataset.lkcoh===coh?'true':'false'))}
  age.addEventListener('input',trDraw);
  cohEl.addEventListener('click',e=>{const b=e.target.closest('[data-lkcoh]');if(!b)return;coh=b.dataset.lkcoh;trDraw()});
  trDraw();
  const prev=redraws.lookalikes;redraws.lookalikes=()=>{prev&&prev();ctDraw();trDraw()};
};
