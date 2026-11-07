/* =============== 5.3 Heart, mood, bones & other conditions =============== */
/* (1) The main scrubber: a beating heart beside a log-scale chart of cardiovascular risk against days after an
   exacerbation starts, built up step by step from SUMMIT, IMPACT and a UK case series (each mark is that
   study's own estimate, never a single curve). (2) A clickable body map of comorbidities with the reported
   prevalence drawn on a 0-100% bar. (3) An NLST screening grid of 100 squares (rounded from the trial). */
const CM_STEPS=[
 {from:0,at:.05,k:'Stable',t:'Baseline risk',d0:0,d1:0,
  txt:'Even when stable, people with COPD are more likely to have cardiovascular disease: a meta-analysis of 29 datasets found an odds ratio of 2.46 (95% CI 2.02 to 3.00), with a two- to five-fold higher risk of ischaemic heart disease, arrhythmia and heart failure [[Chen2015]]. GOLD 2023 puts the prevalence of cardiovascular disease in COPD at 20–70% [[Agusti2023]].',
  pt:'Many people with COPD also have heart problems, even on a good day [[Chen2015]].',
  hook:'COPD: odds of cardiovascular disease 2.46-fold higher [[Chen2015]].'},
 {from:.15,at:.22,k:'Flare-up',t:'Exacerbation begins',d0:0,d1:0,
  txt:'In a post hoc analysis of the IMPACT trial (10,355 people), the risk of a cardiovascular adverse event rose during a moderate exacerbation (HR 2.63) and far more during a severe one (HR 21.84) [[Dransfield2022]].',
  pt:'During a bad flare-up the heart is under the most strain [[Dransfield2022]].',
  hook:'IMPACT: cardiovascular event HR 21.84 during a severe exacerbation, 2.63 during a moderate one [[Dransfield2022]].'},
 {from:.31,at:.38,k:'Days 1–5',t:'Heart attack window',d0:1,d1:5,
  txt:'In a UK primary-care database of 25,857 people with COPD (self-controlled case series), the risk of myocardial infarction was 2.27-fold higher (95% CI 1.1 to 4.7) in the 1–5 days after an exacerbation treated with both steroids and antibiotics. One in 2,513 exacerbations was followed by an MI within 1–5 days [[Donaldson2010]].',
  pt:'Heart attacks are more likely in the first few days after a flare-up, although they are still uncommon [[Donaldson2010]].',
  hook:'MI risk 2.27-fold in days 1–5 after a treated exacerbation [[Donaldson2010]].'},
 {from:.47,at:.54,k:'First 30 days',t:'Peak cardiovascular risk',d0:1,d1:30,
  txt:'In SUMMIT (16,485 people with moderate COPD and cardiovascular disease or risk), the hazard of a cardiovascular event was highest in the first 30 days after an exacerbation (HR 3.8, 95% CI 2.7 to 5.5) and stayed raised up to a year; after a hospitalised exacerbation the 30-day HR was 9.9 (95% CI 6.6 to 14.9) [[Kunisaki2018]]. In IMPACT, risk stayed raised for 30 days after a moderate exacerbation (HR 1.63); after a severe one the 30-day estimate was 1.75 and not statistically significant [[Dransfield2022]].',
  pt:'The month after a flare-up, especially one that needed hospital, is a time of higher heart risk [[Kunisaki2018]].',
  hook:'SUMMIT: 30-day cardiovascular HR 3.8, and 9.9 after a hospitalised exacerbation [[Kunisaki2018]].'},
 {from:.64,at:.71,k:'Up to 49 days',t:'Stroke risk lingers',d0:1,d1:49,
  txt:'In the same UK case series, stroke risk was 1.26-fold higher (95% CI 1.0 to 1.6) in the 1–49 days after an exacerbation [[Donaldson2010]].',
  pt:'Stroke risk is a little higher for about seven weeks after a flare-up [[Donaldson2010]].',
  hook:'Stroke risk 1.26-fold in days 1–49 after an exacerbation [[Donaldson2010]].'},
 {from:.8,at:.88,k:'By 90 days',t:'Back toward baseline',d0:49,d1:90,
  txt:'In IMPACT, cardiovascular risk had returned to baseline by 90 days, even in people at low cardiovascular risk [[Dransfield2022]]; in SUMMIT it stayed raised up to a year [[Kunisaki2018]]. Because the excess risk clusters after exacerbations, preventing exacerbations is also discussed as a way to protect the heart [[Dransfield2022]].',
  pt:'The extra heart risk fades over the following weeks to months, so avoiding flare-ups also helps the heart [[Dransfield2022]].',
  hook:'IMPACT: cardiovascular risk back to baseline by day 90 [[Dransfield2022]].'}
];
/* chart marks: step index, kind ('bar' in the during column, 'seg' over days d0..d1, 'pt' at d0), value, colour,
   the value label, and which side of the line it sits; legend lines name each study */
const CM_MARKS=[
 {p:1,k:'bar',slot:0,v:2.63,col:'var(--warn)',lab:'2.63'},
 {p:1,k:'bar',slot:1,v:21.84,col:'var(--bad)',lab:'21.84'},
 {p:2,k:'seg',d0:1,d1:5,v:2.27,col:'var(--heart)',lab:'2.27',up:1},
 {p:3,k:'seg',d0:1,d1:30,v:9.9,col:'var(--bad)',lab:'9.9',up:1},
 {p:3,k:'seg',d0:1,d1:30,v:3.8,col:'var(--fl)',lab:'3.8',up:1},
 {p:3,k:'seg',d0:1,d1:30,v:1.75,col:'var(--muted)',lab:'1.75',up:1,dash:1},
 {p:3,k:'seg',d0:1,d1:30,v:1.63,col:'var(--warn)',lab:'1.63',up:0},
 {p:4,k:'seg',d0:1,d1:49,v:1.26,col:'var(--rx)',lab:'1.26',up:1},
 {p:5,k:'pt',d0:90,v:1,col:'var(--rec)',lab:'1.0',up:1}
];
const CM_TXT={
  yl:'risk vs baseline (log scale)',xl:'days after the exacerbation starts',during:'during',mod:'moderate',sev:'severe',base:'baseline',
  day:d=>'day '+d,
  big:['2.46','21.84','2.27','9.9','1.26','1.0'],
  bigL:['odds of cardiovascular disease with COPD (meta-analysis)','IMPACT: hazard ratio during a severe exacerbation','relative risk of a heart attack, days 1–5',
    'SUMMIT: 30-day hazard ratio after a hospitalised exacerbation','relative risk of stroke, days 1–49','IMPACT: risk back to baseline by day 90'],
  legend:[
    [],
    [['var(--warn)','IMPACT, during a moderate exacerbation: HR 2.63'],['var(--bad)','IMPACT, during a severe exacerbation: HR 21.84']],
    [['var(--heart)','UK case series, heart attack: RR 2.27']],
    [['var(--bad)','SUMMIT, after a hospitalised exacerbation: HR 9.9'],['var(--fl)','SUMMIT, after any exacerbation: HR 3.8'],['var(--muted)','IMPACT, severe: HR 1.75 (not significant)'],['var(--warn)','IMPACT, moderate: HR 1.63']],
    [['var(--rx)','UK case series, stroke: RR 1.26']],
    [['var(--rec)','IMPACT: back to baseline (HR 1.0) by day 90']]],
  /* body map */
  axis:'% of people with COPD',
  items:[
   {id:'heart',b:'Heart disease',tag:'bad',
    bars:[{lo:20,hi:70,lab:'cardiovascular disease (GOLD 2023): 20–70%'},{v:20.5,lab:'unrecognised heart failure, age 65 or over: 20.5%'}],
    txt:'GOLD 2023 puts cardiovascular disease in COPD at 20–70% [[Agusti2023]]. The odds of cardiovascular disease are 2.46-fold higher than without COPD, and hypertension (OR 1.33) and diabetes (OR 1.36) are more common [[Chen2015]]. One in five older people with a GP diagnosis of COPD had unrecognised heart failure (20.5%) [[Rutten2005]].',
    pt:'Heart problems are the commonest companions of COPD, and some go unnoticed because both cause breathlessness [[Rutten2005,Agusti2023]].'},
   {id:'lungcancer',b:'Lung cancer',tag:'bad',
    bars:[{v:50,lab:'COPD present in people with lung cancer: 50%'},{v:8,lab:'COPD present in matched controls: 8%'}],axisAlt:'% of each group with COPD',
    txt:'COPD was present in 50% of people with lung cancer vs 8% of controls matched for age, sex and pack-years [[Young2009]]. In a COPD cohort, lung cancer developed at 16.7 per 1,000 person-years, most often squamous cell carcinoma (44%) [[deTorres2011]]. GOLD 2023 recommends annual low-dose CT screening in COPD due to smoking [[Agusti2023]].',
    pt:'COPD raises the chance of lung cancer. If you smoked, a yearly low-dose CT scan may be offered [[Young2009,Krist2021]].'},
   {id:'pe',b:'Blood clots in the lungs',tag:'warn',
    bars:[{v:16.1,lo:8.3,hi:25.8,lab:'pulmonary embolism in unexplained exacerbations: 16.1%'}],axisAlt:'% of unexplained exacerbations',
    txt:'A meta-analysis of 7 CT-angiography studies (880 people) found pulmonary embolism in 16.1% (95% CI 8.3 to 25.8) of exacerbations with no clear cause; two-thirds of emboli were in main, lobar or interlobar arteries [[Aleva2017]]. The BTS air-travel statement notes COPD raises the risk of venous thromboembolism, especially after an exacerbation [[Coker2022]].',
    pt:'Sometimes a flare-up with no obvious cause turns out to be a blood clot in the lungs [[Aleva2017]].'},
   {id:'bones',b:'Osteoporosis',tag:'',
    bars:[{lo:9,hi:69,lab:'osteoporosis across studies: 9–69%'},{v:50,lab:'bone scan plus spine X-ray, 255 outpatients: 50%'}],
    txt:'A systematic review found osteoporosis in 9–69% and osteopenia in 27–67% of people with COPD, with body composition, disease severity and steroid use as correlates [[GraatVerboom2009]]. Combining bone scans with spine X-rays found osteoporosis in half of 255 outpatients, at every GOLD stage, mostly untreated [[GraatVerboom2011]]. GOLD 2023 says it is often underdiagnosed and that recurrent systemic corticosteroids raise its risk [[Agusti2023]].',
    pt:'COPD can thin the bones, especially after many courses of steroid tablets [[GraatVerboom2009,Agusti2023]].'},
   {id:'muscle',b:'Frailty and muscle',tag:'rec',
    bars:[{v:19,lo:14,hi:24,lab:'frail: 19%'},{v:56,lab:'pre-frail: 56%'}],
    txt:'Frailty affected 19% (95% CI 14 to 24) and pre-frailty 56% of people with COPD, and COPD roughly doubled the odds of frailty (OR 1.97) [[Marengoni2018]]. After rehabilitation, 61.3% of frail completers no longer met frailty criteria [[Maddocks2016]]. Limb muscle dysfunction is a key systemic consequence of COPD; exercise training is the most potent treatment [[Maltais2014]].',
    pt:'Weak muscles and frailty are common, and many people get stronger with rehabilitation [[Marengoni2018,Maddocks2016]].'},
   {id:'weight',b:'Weight and nutrition',tag:'warn',bars:[],
    txt:'In 400 patients, low BMI, age and low PaO2 independently predicted death, with mortality rising below a BMI of 25 kg/m²; weight gain of more than 2 kg in 8 weeks predicted survival [[Schols1998]]. Supplements added 1.65 kg in undernourished patients [[Ferreira2012]].',
    pt:'Losing weight without trying is a warning sign in COPD; extra food and supplements can help people who are too thin [[Schols1998,Ferreira2012]].'},
   {id:'mind',b:'Depression and anxiety',tag:'rx',
    bars:[{v:24.6,lab:'depressive symptoms with COPD: 24.6%'},{v:11.7,lab:'depressive symptoms in controls: 11.7%'}],axisAlt:'% of each group',
    txt:'A meta-analysis of 8 studies found depressive symptoms in 24.6% of people with COPD vs 11.7% of controls (OR 2.81) [[Zhang2011]]. COPD was linked to anxiety (OR 1.85), which predicted more exacerbations (HR 1.39) [[Eisner2010G]]. GOLD 2023 calls anxiety and depression important, underdiagnosed comorbidities associated with poor prognosis [[Agusti2023]]. Cognition is only mildly impaired without hypoxaemia [[Dodd2010]].',
    pt:'Feeling anxious or low is common with COPD. It is part of the illness, and help is available [[Zhang2011,Usmani2017]].'},
   {id:'sleep',b:'Sleep apnoea',tag:'dx',
    bars:[{v:14,lab:'sleep apnoea (GOLD 2023): about 14%'}],
    txt:'GOLD 2023 puts sleep apnoea at about 14% of people with COPD and notes the combination brings more night-time desaturation and longer time with hypoxaemia and hypercapnia [[Agusti2023]]. Untreated with CPAP, overlap syndrome carried higher mortality (RR 1.79) in an observational cohort [[Marin2010]].',
    pt:'Some people have both COPD and sleep apnoea, which lowers oxygen at night [[Agusti2023]].'},
   {id:'gut',b:'Reflux',tag:'dx',bars:[],
    txt:'Reflux or heartburn was independently associated with the frequent-exacerbator phenotype in ECLIPSE [[Hurst2010]], and with higher odds of exacerbation (OR 5.37) in a meta-analysis of 10 observational studies [[Huang2020]]. The only RCT of a proton pump inhibitor was small and of low to very low certainty [[Kikuchi2020]].',
    pt:'Acid reflux is linked to more flare-ups, but whether treating it prevents them is not yet clear [[Huang2020,Kikuchi2020]].'}],
  noBar:'No prevalence figure in this research: see the text.'
};
function cmTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
/* a front-view body; hl = id of the lit part. Returns svg plus the anchor point of each part for leader lines */
function cmBody(cx,top,hl,ph){const on=k=>hl===k,lit=k=>on(k)?'var(--bad)':'var(--line)';const A={};let s='';
  const outline=on('weight')?'var(--warn)':'var(--line)';
  /* silhouette */
  s+=`<path d="M${cx-24} ${top+66}Q${cx-30} ${top+80} ${cx-18} ${top+84}L${cx-72} ${top+96}Q${cx-84} ${top+100} ${cx-86} ${top+120}L${cx-96} ${top+250}Q${cx-98} ${top+262} ${cx-88} ${top+262}L${cx-74} ${top+140}L${cx-70} ${top+250}L${cx-60} ${top+400}H${cx-14}L${cx} ${top+270}L${cx+14} ${top+400}H${cx+60}L${cx+70} ${top+250}L${cx+74} ${top+140}L${cx+88} ${top+262}Q${cx+98} ${top+262} ${cx+96} ${top+250}L${cx+86} ${top+120}Q${cx+84} ${top+100} ${cx+72} ${top+96}L${cx+18} ${top+84}Q${cx+30} ${top+80} ${cx+24} ${top+66}Z" style="fill:var(--skin);stroke:${outline};stroke-width:${on('weight')?3:1.4};opacity:.9"/>`;
  s+=`<circle cx="${cx}" cy="${top+38}" r="30" style="fill:var(--skin);stroke:${outline};stroke-width:${on('weight')?3:1.4}"/>`;
  A.weight=[cx+70,top+200];
  /* brain */
  s+=`<path d="M${cx-20} ${top+40}q-2 -24 20 -26q22 2 20 26q-4 10 -20 8q-16 2 -20 -8z" style="fill:${on('mind')?'var(--rx-soft)':'var(--panel-2)'};stroke:${on('mind')?'var(--rx)':'var(--line)'};stroke-width:${on('mind')?2.2:1}"/>`;
  s+=`<path d="M${cx} ${top+16}v28M${cx-12} ${top+28}q6 4 12 0q6 4 12 0" style="fill:none;stroke:${on('mind')?'var(--rx)':'var(--line)'};stroke-width:1"/>`;A.mind=[cx-20,top+32];
  /* upper airway */
  s+=`<path d="M${cx-5} ${top+60}V${top+96}M${cx+5} ${top+60}V${top+96}" style="stroke:${on('sleep')?'var(--dx)':'var(--line)'};stroke-width:${on('sleep')?3:1.4}"/>`;
  if(on('sleep'))for(let i=0;i<3;i++){const k=(ph+i/3)%1;s+=cmTx(cx+18+k*16,top+60-k*20,'z','t-sm',`fill:var(--dx);opacity:${f1(1-k)}`)}
  A.sleep=[cx-6,top+76];
  /* lungs (kit) */
  s+=`<g style="opacity:${on('lungcancer')||on('pe')?1:.75}">`+lungs(cx,top+92,128,{tree:true,breathe:(Math.sin(ph*6.28)+1)/2})+'</g>';
  if(on('lungcancer'))s+=`<circle cx="${cx-36}" cy="${top+140}" r="${f1(8+Math.sin(ph*6.28)*1.5)}" style="fill:var(--tar);stroke:var(--bad);stroke-width:2"/>`;
  A.lungcancer=[cx-44,top+140];
  if(on('pe'))[[cx+30,top+196],[cx-40,top+200]].forEach(q=>s+=`<path d="M${q[0]-10} ${q[1]-8}q10 6 20 0" style="fill:none;stroke:var(--blood);stroke-width:3"/><ellipse cx="${q[0]}" cy="${q[1]-5}" rx="5" ry="3.4" style="fill:var(--blood-dark)"/>`);
  A.pe=[cx-40,top+196];
  /* heart (kit) */
  const hb=on('heart')?1+Math.max(0,Math.sin(ph*12.56))*.12:1;
  s+=`<g transform="translate(${cx+14} ${top+176}) scale(${f1(hb)}) translate(${-cx-14} ${-top-176})">`+heart(cx+14,top+176,38,{col:on('heart')?'var(--bad)':'var(--heart)'})+'</g>';A.heart=[cx+28,top+172];
  /* gullet and stomach */
  s+=`<path d="M${cx+2} ${top+96}C${cx+4} ${top+180} ${cx+6} ${top+220} ${cx+22} ${top+236}" style="fill:none;stroke:${on('gut')?'var(--dx)':'var(--line)'};stroke-width:${on('gut')?3:1.4}"/>`;
  s+=`<path d="M${cx+14} ${top+232}q18 -10 34 4q8 18 -10 26q-22 6 -28 -12z" style="fill:${on('gut')?'var(--dx-soft)':'var(--panel-2)'};stroke:${on('gut')?'var(--dx)':'var(--line)'};stroke-width:${on('gut')?2.2:1}"/>`;
  if(on('gut'))for(let i=0;i<3;i++){const k=(ph*1.5+i/3)%1;s+=`<circle cx="${cx+3}" cy="${f1(top+226-k*120)}" r="2.6" style="fill:var(--dx);opacity:${f1(1-k)}"/>`}
  A.gut=[cx+44,top+244];
  /* spine and thigh bones */
  const bc=on('bones')?'var(--gold)':'var(--line)';
  for(let i=0;i<5;i++)s+=`<rect x="${cx-5}" y="${top+250+i*9}" width="10" height="7" rx="2" style="fill:var(--bone);stroke:${bc};stroke-width:${on('bones')?1.8:1}"/>`;
  [[-1],[1]].forEach(([g])=>{s+=`<path d="M${cx+g*30} ${top+290}L${cx+g*36} ${top+372}" style="stroke:var(--bone);stroke-width:7;stroke-linecap:round"/><path d="M${cx+g*30} ${top+290}L${cx+g*36} ${top+372}" style="stroke:${bc};stroke-width:${on('bones')?2:1};stroke-linecap:round;fill:none"/>`});
  A.bones=[cx-5,top+266];
  /* thigh muscles */
  [[-1],[1]].forEach(([g])=>s+=`<ellipse cx="${cx+g*38}" cy="${top+318}" rx="13" ry="28" style="fill:${on('muscle')?'var(--muscle)':'var(--muscle)'};opacity:${on('muscle')?.9:.35};stroke:${on('muscle')?'var(--rec)':'none'};stroke-width:2"/>`);
  A.muscle=[cx+50,top+318];
  return {svg:s,A}}
inits.comorbid=()=>{
  /* ---------- 1. cardiovascular risk after an exacerbation ---------- */
  const svg=$('#cmSvg'),rg=$('#cmT'),note=$('#cmNote');
  const lg=Math.log;
  function draw(t){
    const N=vb(svg,'720 440','400 600'),p=phaseOf(CM_STEPS,t),S=CM_STEPS[p],nx=CM_STEPS[p+1]?CM_STEPS[p+1].from:1.0001,u=clamp((t-S.from)/(nx-S.from));
    const L=N?{tx:16,hx:62,hy:112,hs:70,bx:122,by:96,bw:44,gx:50,gy:206,gw:334,gh:236,col:84,ly:500,sx:16,sw:368,sy:582}
             :{tx:20,hx:105,hy:142,hs:100,bx:24,by:262,bw:30,gx:262,gy:64,gw:430,gh:236,col:100,ly:356,sx:20,sw:680,sy:424};
    const Yv=v=>L.gy+L.gh-(lg(v)-lg(.8))/(lg(25)-lg(.8))*L.gh,dx0=L.gx+L.col+8,dw=L.gw-L.col-14,X=d=>dx0+Math.sqrt(d/365)*dw;
    const day=Math.round(lerp(S.d0,S.d1,ease(ramp(u,.05,.85))));
    let s=cmTx(L.tx,26,S.t,'t-big','fill:var(--rec)')+cmTx(L.tx,42,S.k,'t-sm');
    /* the heart beats faster as the step's headline risk rises */
    const hv=+CM_TXT.big[p],rate=1+lg(Math.max(1,hv))/lg(25)*2.2,beat=1+Math.max(0,Math.sin(t*120*rate))*.1;
    s+=`<circle cx="${L.hx}" cy="${L.hy}" r="${f1(L.hs*.62)}" style="fill:var(--bad-soft);opacity:${f1(clamp((lg(Math.max(1,hv)))/lg(25)))}"/>`;
    s+=`<g transform="translate(${L.hx} ${L.hy}) scale(${f1(beat)}) translate(${-L.hx} ${-L.hy})">`+heart(L.hx,L.hy,L.hs,{col:'var(--heart)'})+'</g>';
    s+=cmTx(L.bx,L.by,CM_TXT.big[p],'t-big','font-size:30px;fill:var(--bad)')+wrapT(L.bx,L.by+20,CM_TXT.bigL[p],L.bw,{cls:'t-xs',lh:13,style:'fill:var(--ink)'}).svg;
    /* chart frame and log ticks */
    s+=axes(L.gx,L.gy,L.gw,L.gh,{grid:false});
    [1,2,5,10,20].forEach(v=>{const y=Yv(v);s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/>`+cmTx(L.gx-6,y+3,v,'t-xs','','end')});
    s+=cmTx(L.gx,L.gy-10,CM_TXT.yl,'t-xs');
    s+=`<rect x="${L.gx+1}" y="${L.gy}" width="${L.col}" height="${L.gh}" style="fill:var(--fl-soft);opacity:.55"/>`+cmTx(L.gx+L.col/2,L.gy+L.gh+15,CM_TXT.during,'t-xs','','middle');
    [1,5,30,49,90,365].forEach(d=>s+=cmTx(X(d),L.gy+L.gh+15,d,'t-xs','','middle'));
    s+=cmTx(L.gx+L.gw,L.gy+L.gh+30,CM_TXT.xl,'t-xs','','end');
    s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(Yv(1))}" y2="${f1(Yv(1))}" style="stroke:var(--ink);stroke-width:1.4"/>`+cmTx(L.gx+L.gw-4,Yv(1)-5,CM_TXT.base,'t-xs','','end');
    /* marks: earlier steps faint, the current step bold and labelled */
    CM_MARKS.forEach(m=>{if(m.p>p)return;const cur=m.p===p,a=cur?ease(ramp(u,.05,.6)):1,op=cur?1:.28,y=Yv(lerp(1,m.v,a));
      if(m.k==='bar'){const bw=N?22:26,x=L.gx+L.col*(m.slot?.78:.25)-bw/2;s+=`<rect x="${f1(x)}" y="${f1(Math.min(y,Yv(1)))}" width="${bw}" height="${f1(Math.abs(Yv(1)-y))}" rx="3" style="fill:${m.col};opacity:${op}"/>`;
        if(cur){s+=cmTx(x+bw/2,y-5,m.lab,'t-sm','fill:var(--ink);font-weight:700','middle');if(!N)s+=cmTx(x+bw/2,Yv(1)+13,m.slot?CM_TXT.sev:CM_TXT.mod,'t-xs','fill:var(--ink)','middle')}}
      if(m.k==='seg'){const x0=X(m.d0),x1=X(cur?lerp(m.d0,m.d1,ease(ramp(u,.05,.85))):m.d1);s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${m.col};stroke-width:4;stroke-linecap:round;opacity:${op}${m.dash?';stroke-dasharray:6 4':''}"/>`;
        if(cur)s+=cmTx(X(m.d1)+6,y+(m.up?-3:11),m.lab,'t-sm',`fill:var(--ink);font-weight:700;opacity:${f1(ramp(u,.5,.8))}`)}
      if(m.k==='pt'){const x=X(m.d0);s+=`<circle cx="${f1(x)}" cy="${f1(Yv(1))}" r="7" style="fill:${m.col};stroke:var(--panel);stroke-width:2;opacity:${f1(cur?a:op)}"/>`;if(cur)s+=cmTx(x,Yv(1)-12,m.lab,'t-sm','fill:var(--ink);font-weight:700','middle')}});
    /* day cursor */
    if(S.d1>0){const x=X(Math.max(1,day));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gy}" y2="${L.gy+L.gh}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`+cmTx(x,L.gy+12,CM_TXT.day(Math.max(1,day)),'t-xs','fill:var(--ink);font-weight:700',x>L.gx+L.gw-40?'end':'middle')}
    /* legend for the current step */
    CM_TXT.legend[p].forEach((q,i)=>{const y=L.ly+i*17;s+=`<rect x="${N?16:L.gx}" y="${y-8}" width="14" height="5" rx="2" style="fill:${q[0]}"/>`+cmTx((N?16:L.gx)+20,y-2,q[1],'t-xs','fill:var(--ink)')});
    const sw=L.sw/6;CM_STEPS.forEach((q,j)=>{s+=`<rect x="${f1(L.sx+j*sw+1)}" y="${L.sy}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${j===p?'var(--rec)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#cmPlay'),draw,28000,'%t:player.replay%','comorbid');
  setSt=stepWire($('#cmSteps'),CM_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. body map ---------- */
  const bsvg=$('#cmBodySvg'),bnote=$('#cmBodyNote'),btns=$('#cmBodyBtns');let sel=0,ph=0,stopB=null;
  btns.innerHTML=CM_TXT.items.map((it,i)=>`<button class="btn" data-cmb="${i}" aria-pressed="${i===0}">${it.b}</button>`).join('');
  const CMPOS={mind:[1,0],sleep:[1,1],lungcancer:[1,2],pe:[1,3],bones:[1,4],heart:[0,0],weight:[0,1],gut:[0,2],muscle:[0,3]};
  function bdraw(){
    const N=vb(bsvg,'520 540','400 556'),it=CM_TXT.items[sel],cx=N?200:260,top=N?30:8;
    const B=cmBody(cx,top,it.id,ph);let s=B.svg;
    /* leader labels in the wide layout; a title in the narrow one */
    if(!N){CM_TXT.items.forEach((q,i)=>{const P=CMPOS[q.id],left=P[0]===1,yy=left?40+P[1]*72:110+P[1]*72,x=left?18:378,a=B.A[q.id],on=i===sel;
        s+=`<g class="clk" data-cmb="${i}" style="opacity:${on?1:.6}"><path d="M${left?x+140:x-4} ${yy-4}L${a[0]} ${a[1]}" style="fill:none;stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?1.6:1}"/>`+
          wrapT(x,yy,q.b,18,{cls:on?'t-lbl':'t-sm',lh:14,style:on?'':'fill:var(--ink)'}).svg+'</g>'})}
    else s+=cmTx(16,24,it.b,'t-big','fill:var(--bad)');
    /* prevalence bar */
    const bx=N?20:40,bw=N?360:440,by=N?520:500;
    if(it.bars.length){s+=cmTx(bx,by-12+(it.bars.length>1?-28:0)-14,it.axisAlt||CM_TXT.axis,'t-xs','fill:var(--ink);font-weight:600');
      it.bars.forEach((b,i)=>{const y=by+(i-it.bars.length+1)*28,X=v=>bx+v/100*bw;
        s+=`<rect x="${bx}" y="${y-5}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
        if(b.lo!=null)s+=`<rect x="${f1(X(b.lo))}" y="${y-5}" width="${f1(X(b.hi)-X(b.lo))}" height="10" rx="5" style="fill:var(--bad-soft);stroke:var(--bad)"/>`;
        if(b.v!=null)s+=`<circle cx="${f1(X(b.v))}" cy="${y}" r="6" style="fill:var(--bad);stroke:var(--panel);stroke-width:2"/>`;
        s+=cmTx(bx,y-9,b.lab,'t-xs','fill:var(--ink)')});
      [0,25,50,75,100].forEach(v=>s+=cmTx(bx+v/100*bw,by+22,v+'%','t-xs','','middle'))}
    else s+=wrapT(bx,by-8,CM_TXT.noBar,N?60:76,{cls:'t-sm'}).svg;
    bsvg.innerHTML=s}
  function pick(i){sel=i;$$('[data-cmb]',btns).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cmb===i?'true':'false'));
    const it=CM_TXT.items[sel];bnote.innerHTML=noteHTML({t:it.b,txt:it.txt,pt:it.pt});bdraw()}
  btns.addEventListener('click',e=>{const b=e.target.closest('[data-cmb]');if(b)pick(+b.dataset.cmb)});
  bsvg.addEventListener('click',e=>{const g=e.target.closest('[data-cmb]');if(g)pick(+g.dataset.cmb)});
  /* a gentle idle loop for the lit part; stopped when the module hides */
  function loop(){if(RM){bdraw();return}stopB=animate(4000,q=>{ph=q;bdraw()},()=>{if(stopB)loop()})}
  pick(0);
  onShow.comorbid=(prev=>()=>{prev&&prev();if(!stopB)loop()})(onShow.comorbid);
  onHide.comorbid=(prev=>()=>{prev&&prev();if(stopB){const f=stopB;stopB=null;f()}})(onHide.comorbid);
  loop();
  const prevR=redraws.comorbid;redraws.comorbid=()=>{prevR&&prevR();bdraw()};

  /* ---------- 3. NLST grid: 100 screens, rounded from 24.2% positive and 96.4% of positives false ---------- */
  $('#cmNlst').innerHTML=Array.from({length:100},(_,i)=>`<i class="${i<1?'tp':i<24?'fp':''}"></i>`).join('');
};
