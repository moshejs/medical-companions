/* =============== 4.1 Flare-ups (exacerbations) =============== */
/* Main scrubber: one flare-up followed through the days. A small airway (kit airway()) takes in viruses
   and bacteria, swells, fills with mucus and narrows; the lungs (kit lungs()) over-inflate; four meters
   track infection, swelling, breathlessness and trapped air; a chart draws schematic symptom and
   peak-flow curves against days from onset, with the published marker days (treatment start 3.69,
   median recovery 6 and 7, day 35 and day 91) and a full or incomplete recovery toggle.
   Second: the Rome severity grades as a teaching classifier. Third: ECLIPSE bars. Fourth: published
   mortality points after a hospitalised flare-up, by cohort. */
const FU_STEPS=[
 {from:0,at:.06,k:'Trigger',t:'A virus or new bacteria reaches the airways',sh:'Trigger',
  txt:`Most hospital-treated flare-ups carry an infection: in 64 people admitted with a flare-up, a virus and/or bacteria was found in 78% (viruses 48.4%, bacteria 54.7%). [[Papi2006]] In a London cohort, 64% of flare-ups followed a cold in the 18 days before, and most of the viruses found were rhinoviruses. [[Seemungal2001]] Catching a new strain of bacteria more than doubled the risk (relative risk 2.15). [[Sethi2002]]`,
  pt:`Most flare-ups start with a cold or a chest infection. [[Papi2006,Seemungal2001]]`,
  hook:`Viruses (often rhinovirus) and bacteria trigger most exacerbations: 78% had one or both in Papi 2006. [[Papi2006]]`},
 {from:.17,at:.24,k:'Inflammation',t:'The airways swell and fill with mucus',sh:'Swelling',
  txt:`Flare-ups are linked to more inflammation in the airways and the whole body, and to hyperinflation. [[WedzichaSeemungal2007]] Here the airway wall swells and reddens, mucus builds up in the opening, and air trapped behind the narrowed airways over-inflates the lungs, so each breath takes more work. Before the flare-up begins, breathlessness, sore throat, cough and cold symptoms already worsen, but lung function does not. [[Seemungal2000]]`,
  pt:`The airways swell and fill with phlegm. Air gets stuck in the lungs, so breathing is harder work. [[WedzichaSeemungal2007]]`,
  hook:`Exacerbation means more airway and systemic inflammation plus hyperinflation; symptoms worsen before lung function does. [[WedzichaSeemungal2007,Seemungal2000]]`},
 {from:.33,at:.4,k:'Symptoms',t:'Breathlessness, cough and sputum worsen over ≤14 days',sh:'Symptoms',
  txt:`GOLD 2023 adopted the Rome definition: an event of breathlessness and/or cough and sputum "that worsen over ≤14 days, which may be accompanied by tachypnea and/or tachycardia". [[Agusti2023,Celli2022]] Rome grades severity at the time, from a 0–10 breathlessness score, breathing rate, heart rate, oxygen saturation and CRP, adding a blood gas in hospital. [[Agusti2023,Jacobson2023]] Try the grades below.`,
  pt:`A flare-up means breathing, cough or phlegm gets clearly worse over a few days, up to two weeks. [[Agusti2023]]`,
  hook:`Rome: worsening over ≤14 days, graded at the point of care rather than afterwards by healthcare use. [[Agusti2023]]`},
 {from:.48,at:.54,k:'Act early',t:'Each day of delay slows recovery',sh:'Act early',
  txt:`In a London cohort, treatment started a median of 3.69 days after onset (the Rx line), and each day of delay lengthened recovery by 0.42 days. Not reporting flare-ups was associated with emergency admission. [[Wilkinson2004]] In an earlier study only 51% of 190 flare-ups were reported to clinicians. [[Seemungal1998]]`,
  pt:`Getting treatment early helps people get better faster. [[Wilkinson2004]]`,
  hook:`Each day of delay before treatment added about 0.42 days to recovery. [[Wilkinson2004]]`},
 {from:.62,at:.74,k:'Recovery',t:'Most recover in about a week, some never fully',sh:'Recovery',
  txt:`In 504 flare-ups, median recovery took 6 days for peak flow and 7 days for symptoms. Peak flow was fully back in only 75.2% at 35 days, and had not recovered by 91 days in 7.1%. [[Seemungal2000]] Switch to incomplete recovery to see peak flow settle below its old level. Over 4 years, people with frequent flare-ups lost FEV1 faster (−40.1 against −32.1 mL a year). [[Donaldson2002]]`,
  pt:`Many flare-ups settle in about a week, but some take more than a month, and a few never fully settle. [[Seemungal2000]]`,
  hook:`Median recovery 6 days (peak flow) and 7 days (symptoms); 7.1% not recovered at 91 days. [[Seemungal2000]]`},
 {from:.86,at:.94,k:'Pattern',t:'One flare-up predicts the next',sh:'Pattern',
  txt:`In ECLIPSE (2138 people over 3 years), "the single best predictor of exacerbations, across all GOLD stages, was a history of exacerbations", and the frequent-flare-up pattern stayed stable. [[Hurst2010]] In 99,574 UK primary-care patients, the number of flare-ups in year 1 predicted the long-term rate in a graded way (HR 1.71 for one, up to 3.41 for five or more). [[Rothnie2018]]`,
  pt:`If you have had one flare-up, you are more likely to have another. That is why prevention matters. [[Hurst2010]]`,
  hook:`The best predictor of a future exacerbation is a past exacerbation. [[Hurst2010]]`}
];
const FU_TXT={
  airway:'small airway, cut across',airwayN:'small airway',lungs:'both lungs',lungsHyper:'air trapped: lungs over-inflate',lungsHyperN:'lungs over-inflate',
  meters:['infection','airway swelling','breathlessness','air trapping'],
  chart:'Days from onset (schematic)',xl:'days',yl:'worse ↑',
  legSym:'symptoms: breathlessness, cough, sputum',legPf:'peak flow (lung function)',
  win:'≤14 days',rx:'Rx',
  ann:{pre:'symptoms worsen before onset; peak flow does not',a14:'bracket: worsening over ≤14 days (Rome)',aRx:'Rx: treatment started at a median of day 3.69',
    a67:'6 and 7: median recovery of peak flow and symptoms',a35:'day 35: peak flow fully back in 75.2%',a91:'day 91: 7.1% still not recovered',
    aPart:'incomplete: peak flow settles below its old level',aNext:'a past flare-up is the strongest predictor of the next'},
  symW:['usual','rising','at their worst','easing','back to usual','rising again'],
  pfW:['usual','falling','recovering','back to usual','below its old level'],
  read:(d,s,p)=>`<span>Day <b>${d}</b></span><span>Symptoms <b>${s}</b></span><span>Peak flow <b>${p}</b></span>`,
  /* Rome classifier */
  romeHead:'Five bedside measures; highlighted bars meet a moderate criterion',romeHeadN:'Highlighted: moderate criterion met',
  st:{met:'criterion met',no:'mild range',na:'not measured'},stN:{met:'met',no:'mild',na:'n/a'},
  count:(n,of)=>`${n} of ${of} moderate criteria met (3 needed)`,
  lee:'Korean validation, 740 flare-ups:',leeParts:['mild 30.9%','moderate 58.6%','severe 10.4%'],
  vSev:`Severe by the Rome definition: PaCO2 above 6 kPa with pH below 7.35. GOLD 2023 adds that this must be new or worsening, because a few people have long-standing high carbon dioxide. [[Agusti2023,Jacobson2023]]`,
  vMod:(n,of)=>`Moderate by the Rome thresholds: ${n} of ${of} criteria are at or past the moderate line, and at least 3 are needed. [[Jacobson2023]]`,
  vModGas:` The blood gas shows no acidosis, which fits moderate: Rome allows low oxygen (PaO2 ≤8 kPa) or high carbon dioxide (PaCO2 >6 kPa) without acidosis. [[Jacobson2023]]`,
  vMild:`Every entered measure is in the published mild range. [[Jacobson2023]]`,
  vMix:(n,of)=>`${n} of ${of} criteria are past the moderate line, but at least 3 are needed for moderate, and the mild row lists every measure below its threshold. The sources summarised here do not say how Rome labels this mix. [[Jacobson2023]]`,
  vNoGas:` Severe can only be judged from an arterial blood gas.`,
  /* ECLIPSE */
  ec1:'flare-ups per person, year 1',ec2:'% with two or more, year 1',ecG:g=>`GOLD ${g}`,
  /* outcomes after hospital */
  outY:'% who had died',outX:'time since admission (stretched near the start)',outXN:'time since admission',hosp:'in hospital',hospN:'in hosp.',
  ticks:[[60/365,'60 d'],[.5,'6 mo'],[1,'1 y'],[2,'2 y'],[4,'4 y'],[8,'8 y']]
};
const FU_OUT=[
  {id:'suissa',col:'var(--fl)',lab:'Quebec, from the first COPD admission',
    pts:[[0,0],[3.6,50],[7.7,75]],li:`Quebec, 73,106 people from their first COPD hospitalisation: 50% had died by 3.6 years and 75% by 7.7 years. [[Suissa2012]]`},
  {id:'support',col:'var(--co2)',lab:'SUPPORT, admitted with high CO2',
    pts:[['h',11],[60/365,20],[180/365,33],[1,43],[2,49]],li:`SUPPORT, 1016 people admitted with PaCO2 ≥50 mmHg: 11% died in hospital, 20% by 60 days, 33% by 180 days, 43% by 1 year and 49% by 2 years. Only 26% were alive with good-to-excellent quality of life at 6 months. [[Connors1996]]`},
  {id:'groen',col:'var(--o2)',lab:'Dutch cohort, 171 admissions',
    pts:[['h',8],[1,23]],li:`Dutch cohort of 171 admissions: 8% died in hospital and 23% by 1 year; 35% by 1 year for those admitted to ICU for respiratory failure. [[Groenewegen2003]]`},
  {id:'medicare',col:'var(--rx)',lab:'US Medicare, at 1 year, by ventilation',sep:true,
    pts:[[1,24.4],[1,26.2],[1,41.8],[1,45.7]],li:`US Medicare, 2.3 million COPD hospitalisations, deaths within 1 year: 26.2% overall, 24.4% with no ventilation, 41.8% after non-invasive ventilation and 45.7% after invasive ventilation; 64.2% were readmitted within the year. [[Lindenauer2018]]`}
];
const FU_KN=[[0,-6],[.17,-2],[.33,0],[.48,3],[.62,5],[.86,35],[1,40]];
function fuDay(t){for(let i=1;i<FU_KN.length;i++){const a=FU_KN[i-1],b=FU_KN[i];if(t<=b[0])return lerp(a[1],b[1],clamp((t-a[0])/(b[0]-a[0])))}return 40}
function fuSym(d){let v;if(d<-3)v=.18;else if(d<0)v=.18+.32*ease(ramp(d,-3,0));else if(d<1.5)v=.5+.5*ease(ramp(d,0,1.5));else v=.18+.82*Math.exp(-(d-1.5)/2.4);
  if(d>33)v=Math.max(v,.18+.5*ease(ramp(d,33,40)));return v}
function fuPF(d,part){const r=part?.08:0;if(d<0)return 1;if(d<1.5)return 1-.25*ease(ramp(d,0,1.5));return 1-r*ramp(d,1.5,4)-(.25-r*ramp(d,1.5,4))*Math.exp(-(d-1.5)/1.8)}
function fuState(d,part){const nf=ramp(d,33,40);
  const inf=Math.max(ramp(d,-6,-3.5)*(1-ramp(d,3.7,9)),nf*.7);
  const infl=Math.max(ramp(d,-3,1)*(1-ramp(d,4,14)*(part?.7:.92)),nf*.5);
  const trap=Math.max(ramp(d,-1,1.5)*(1-ramp(d,3,10)*(part?.75:1)),nf*.3);
  return {inf,infl,mucus:infl*.75,sq:infl*.5,trap,sym:fuSym(d)}}
/* a virus (round, spiked) or a bacterium (capsule) */
function fuBug(x,y,kind,s,op,rot){
  if(kind==='v'){let g=`<g style="opacity:${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s)}" style="fill:var(--virus);stroke:var(--panel);stroke-width:1"/>`;
    for(let k=0;k<8;k++){const a=k/8*Math.PI*2+rot;g+=`<line x1="${f1(x+Math.cos(a)*s)}" y1="${f1(y+Math.sin(a)*s)}" x2="${f1(x+Math.cos(a)*s*1.6)}" y2="${f1(y+Math.sin(a)*s*1.6)}" style="stroke:var(--virus);stroke-width:1.4"/>`}
    return g+'</g>'}
  return `<rect x="${f1(x-s*1.4)}" y="${f1(y-s*.65)}" width="${f1(s*2.8)}" height="${f1(s*1.3)}" rx="${f1(s*.65)}" transform="rotate(${f1(rot*57.3)} ${f1(x)} ${f1(y)})" style="fill:var(--bact);stroke:var(--panel);stroke-width:1;opacity:${f1(op)}"/>`}
function fuNum(n){return String(n).replace('-','−')}
inits.flareups=()=>{
  const svg=$('#fuSvg'),rg=$('#fuT'),rd=$('#fuRead');let part=false;
  function draw(t){
    const N=vb(svg,'720 400','400 690'),p=phaseOf(FU_STEPS,t),S=FU_STEPS[p],d=fuDay(t),st=fuState(d,part);
    const L=N?{ty:24,ax:100,ay:152,ar:50,lx:295,ly:84,ls:116,alY:242,llY:236,mY:266,mB:168,mW:216,cx:44,cy:362,cw:340,ch:150,ctY:348,lgY:566,anY:604,sy:668}
             :{ty:30,ax:110,ay:168,ar:58,lx:282,ly:96,ls:128,alY:278,llY:252,mY:300,mB:160,mW:190,cx:404,cy:78,cw:296,ch:170,ctY:64,lgY:290,anY:330,sy:384};
    let s='';
    s+=N?wrapT(16,L.ty,S.t,34,{cls:'t-big',lh:19,style:'fill:var(--fl)'}).svg:`<text x="16" y="${L.ty}" class="t-big" style="fill:var(--fl)">${S.t}</text>`;
    /* airway with arriving germs */
    const A=airway(L.ax,L.ay,L.ar,{wall:st.infl*.8,squeeze:st.sq,mucus:st.mucus,inflam:st.infl,tether:.75,ph:t*12,seed:8});
    s+=A.svg;
    const nB=8;for(let i=0;i<nB;i++){const vis=clamp(st.inf*nB*1.2-i);if(vis<=0)continue;
      const pr=clamp(ramp(d,-6+i*.25,-3.6+i*.25)+(d>33?ramp(d,33+i*.3,37+i*.3):0));
      const aS=(-150+i*15)*Math.PI/180,aE=(i/nB)*Math.PI*2+.3,dist=lerp(L.ar*1.85,L.ar*lerp(.25,.7,(i*.37)%1),ease(clamp(pr*1.6)));
      const a=lerp(aS,aE,ease(pr))+Math.sin(t*30+i)*.04;
      s+=fuBug(L.ax+Math.cos(a)*dist,L.ay+Math.sin(a)*dist,i%2?'b':'v',N?4:4.5,vis,t*8+i)}
    s+=`<text x="${L.ax}" y="${L.alY}" class="t-xs t-mid">${N?FU_TXT.airwayN:FU_TXT.airway}</text>`;
    /* lungs */
    const br=(Math.sin(t*Math.PI*40)+1)/2;
    s+=lungs(L.lx,L.ly,L.ls,{hyper:st.trap,mucus:st.mucus,inflam:st.infl,breathe:br});
    s+=`<text x="${L.lx}" y="${L.llY}" class="t-xs t-mid" style="${st.trap>.3?'fill:var(--co2-ink);font-weight:600':''}">${st.trap>.3?(N?FU_TXT.lungsHyperN:FU_TXT.lungsHyper):FU_TXT.lungs}</text>`;
    /* meters */
    [st.inf,st.infl,st.sym,st.trap].forEach((v,i)=>{const y=L.mY+i*16,col=['var(--virus)','var(--inflamed)','var(--fl)','var(--co2)'][i];
      s+=`<text x="16" y="${y+8}" class="t-xs">${FU_TXT.meters[i]}</text><rect x="${L.mB}" y="${y}" width="${L.mW}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${L.mB}" y="${y}" width="${f1(L.mW*clamp(v))}" height="9" rx="4.5" style="fill:${col}"/>`});
    /* chart */
    const X=dd=>L.cx+L.cw*(dd+6)/46,yS=v=>L.cy+L.ch-L.ch*v*.92,yP=v=>L.cy+L.ch-L.ch*clamp((v-.6)/.44);
    s+=`<text x="${L.cx}" y="${L.ctY}" class="t-sm" style="fill:var(--ink);font-weight:600">${FU_TXT.chart}</text>`;
    s+=axes(L.cx,L.cy,L.cw,L.ch,{xt:[[1/46,'−5'],[6/46,'0'],[13/46,'7'],[20/46,'14'],[27/46,'21'],[34/46,'28'],[41/46,'35']],yt:[],grid:false,xl:FU_TXT.xl});
    s+=`<text x="${L.cx-4}" y="${L.cy+10}" class="t-xs t-end">${N?'':FU_TXT.yl}</text>`;
    if(p>=2){const y=L.cy+L.ch-6;s+=`<path d="M${f1(X(-3))} ${y-4}V${y}H${f1(X(11))}V${y-4}" style="fill:none;stroke:var(--fl);stroke-width:1.4"/><text x="${f1((X(-3)+X(11))/2)}" y="${y-8}" class="t-xs t-mid" style="fill:var(--fl)">${FU_TXT.win}</text>`}
    const fS=u=>-6+u*46,dd=Math.max(d,-5.99),uc=(dd+6)/46;
    s+=`<path d="${pathFn(u=>1-(yS(fuSym(fS(u)))-L.cy)/L.ch,L.cx,L.cx+L.cw,L.cy+L.ch,L.cy,140)}" style="fill:none;stroke:var(--fl);stroke-width:1.2;opacity:.22"/>`;
    s+=`<path d="${pathFn(u=>1-(yP(fuPF(fS(u),part))-L.cy)/L.ch,L.cx,L.cx+L.cw,L.cy+L.ch,L.cy,140)}" style="fill:none;stroke:var(--air);stroke-width:1.2;opacity:.22"/>`;
    s+=`<path d="${pathFn(u=>1-(yS(fuSym(fS(u*uc)))-L.cy)/L.ch,L.cx,X(dd),L.cy+L.ch,L.cy,120)}" style="fill:none;stroke:var(--fl);stroke-width:2.8;stroke-linejoin:round"/>`;
    s+=`<path d="${pathFn(u=>1-(yP(fuPF(fS(u*uc),part))-L.cy)/L.ch,L.cx,X(dd),L.cy+L.ch,L.cy,120)}" style="fill:none;stroke:var(--air);stroke-width:2.8;stroke-linejoin:round"/>`;
    if(p>=3){const x=X(3.69);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.cy+16}" y2="${L.cy+L.ch}" style="stroke:var(--rec);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(x)}" y="${L.cy+12}" class="t-xs t-mid" style="fill:var(--rec);font-weight:600">${FU_TXT.rx}</text>`}
    if(p>=4){[[6,12],[7,26]].forEach(([k,o])=>{const x=X(k);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.cy+o+3}" y2="${L.cy+L.ch-20}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(x+3)}" y="${L.cy+o}" class="t-xs">${k}</text>`});
      const x=X(35);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/>`}
    s+=`<circle cx="${f1(X(dd))}" cy="${f1(yS(fuSym(dd)))}" r="4.5" style="fill:var(--fl);stroke:var(--panel);stroke-width:2"/><circle cx="${f1(X(dd))}" cy="${f1(yP(fuPF(dd,part)))}" r="4.5" style="fill:var(--air);stroke:var(--panel);stroke-width:2"/>`;
    /* legend and notes */
    [[FU_TXT.legSym,'var(--fl)'],[FU_TXT.legPf,'var(--air)']].forEach((g,i)=>{const y=L.lgY+i*15;s+=`<line x1="${L.cx}" x2="${L.cx+18}" y1="${y-3}" y2="${y-3}" style="stroke:${g[1]};stroke-width:3"/><text x="${L.cx+24}" y="${y}" class="t-xs">${g[0]}</text>`});
    const AN=FU_TXT.ann,an=[[AN.pre],[AN.pre],[AN.a14],[AN.a14,AN.aRx],[AN.a67,AN.a35,part?AN.aPart:AN.a91],[AN.aNext,part?AN.aPart:AN.a35]][p];
    an.forEach((x,i)=>{s+=`<text x="${L.cx}" y="${L.anY+i*16}" class="t-xs" style="fill:var(--ink)">${x}</text>`});
    /* strip */
    const SW=N?368:688,sw=SW/6;FU_STEPS.forEach((q,j)=>{const on=j===p,xx=16+j*sw;
      s+=`<rect x="${f1(xx+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--fl)':'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.sy-6}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.sh}</text>`});
    s+=`<circle cx="${f1(16+SW*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const si=d<-3?0:d<.2?1:d<2.5?2:d<33?(st.sym>.24?3:4):5;
    const pv=fuPF(d,part),pi=d<0?0:d<1.5?1:pv<.985?(part&&d>6?4:2):3;
    rd.innerHTML=FU_TXT.read(fuNum(Math.round(d)),FU_TXT.symW[si],FU_TXT.pfW[pi]);
    $('#fuNote').innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#fuPlay'),draw,22000,'%t:player.replay%','flareups');
  const setSt=stepWire($('#fuSteps'),FU_STEPS,rg,draw,stop);
  $$('#m-flareups [data-fur]').forEach(b=>b.addEventListener('click',()=>{part=b.dataset.fur==='part';
    $$('#m-flareups [data-fur]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- Rome classifier ---------- */
  const rs=$('#fuRomeSvg'),rv=$('#fuRomeV'),I=id=>$('#'+id);
  const FU_RM=[{lab:'Breathlessness (VAS 0–10)',min:0,max:10,thr:5,low:false},{lab:'Breathing rate, /min',min:0,max:40,thr:24,low:false},
    {lab:'Heart rate, bpm',min:40,max:140,thr:95,low:false},{lab:'Resting SpO2, %',min:80,max:100,thr:92,low:true},{lab:'CRP, mg/L',min:0,max:60,thr:10,low:false}];
  const FU_PRE={mild:{vas:3,rr:20,hr:88,sat:94,drop:'le3',crpOn:'yes',crp:6,gas:'no',co2:5.4,ph:7.41,po2:9.2},
    mod:{vas:7,rr:26,hr:102,sat:90,drop:'gt3',crpOn:'yes',crp:24,gas:'yes',co2:6.3,ph:7.37,po2:7.8},
    sev:{vas:8,rr:28,hr:108,sat:87,drop:'gt3',crpOn:'yes',crp:40,gas:'yes',co2:8.1,ph:7.28,po2:7.2}};
  function rome(){const vas=+I('fuVas').value,rr=+I('fuRr').value,hr=+I('fuHr').value,sat=+I('fuSat').value,drop=I('fuDrop').value,
      crpOn=I('fuCrpOn').value==='yes',crp=+I('fuCrp').value,gas=I('fuGas').value==='yes',co2=+I('fuCo2').value,ph=+I('fuPh').value;
    I('fuVasV').textContent=vas;I('fuCrp').disabled=!crpOn;['fuCo2','fuPh','fuPo2'].forEach(k=>I(k).disabled=!gas);
    const vals=[vas,rr,hr,sat,crp],met=[vas>=5,rr>=24,hr>=95,sat<92||drop==='gt3',crpOn&&crp>=10],na=[false,false,false,false,!crpOn];
    const of=crpOn?5:4,n=met.filter(Boolean).length,sev=gas&&co2>6&&ph<7.35;
    const cls=sev?2:n>=3?1:n===0?0:-1;
    const N=vb(rs,'720 270','400 360'),rh=N?50:36,y0=34;let s=`<text x="16" y="20" class="t-sm" style="fill:var(--ink);font-weight:600">${N?FU_TXT.romeHeadN:FU_TXT.romeHead}</text>`;
    const tx0=N?16:232,tx1=N?384:560;
    FU_RM.forEach((r,i)=>{const y=y0+i*rh,ty=N?y+22:y+6,X=v=>tx0+(tx1-tx0)*clamp((v-r.min)/(r.max-r.min)),xt=X(r.thr),stt=na[i]?'na':met[i]?'met':'no';
      s+=`<text x="16" y="${N?y+12:y+17}" class="t-lbl"${na[i]?' style="fill:var(--muted)"':''}>${r.lab}</text>`;
      const mildL=r.low?xt:tx0,mildR=r.low?tx1:xt;
      s+=`<rect x="${f1(tx0)}" y="${ty}" width="${f1(tx1-tx0)}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${f1(mildL)}" y="${ty}" width="${f1(mildR-mildL)}" height="14" style="fill:var(--good-soft)"/>`;
      s+=`<rect x="${f1(r.low?tx0:xt)}" y="${ty}" width="${f1(r.low?xt-tx0:tx1-xt)}" height="14" style="fill:${met[i]?'var(--fl)':'var(--fl-soft)'};opacity:${met[i]?.75:1}"/>`;
      s+=`<line x1="${f1(xt)}" x2="${f1(xt)}" y1="${ty-3}" y2="${ty+17}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${f1(xt)}" y="${ty+27}" class="t-xs t-mid">${r.thr}</text>`;
      if(!na[i])s+=`<circle cx="${f1(X(vals[i]))}" cy="${ty+7}" r="6.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
      s+=`<text x="${N?384:576}" y="${N?y+12:y+17}" class="t-sm${N?' t-end':''}" style="fill:${met[i]?'var(--fl)':'var(--muted)'};font-weight:${met[i]?700:500}">${(N?FU_TXT.stN:FU_TXT.st)[stt]}</text>`});
    const yc=y0+5*rh+(N?6:4);
    s+=`<text x="16" y="${yc+8}" class="t-lbl" style="fill:var(--fl)">${FU_TXT.count(n,of)}</text>`;
    const yb=yc+(N?30:24),bw=N?368:400,bx=16,cuts=[30.9,58.6,10.4],cols=['var(--good)','var(--fl)','var(--bad)'];let acc=0;
    s+=`<text x="${N?16:440}" y="${N?yb-6:yc+8}" class="t-xs">${FU_TXT.lee}</text>`;
    const bxx=N?bx:440,bww=N?bw:264,byy=N?yb:yc+16;
    cuts.forEach((c,i)=>{const w=bww*c/100;s+=`<rect x="${f1(bxx+acc)}" y="${byy}" width="${f1(w)}" height="12" style="fill:${cols[i]};opacity:${cls===i?.95:.28}"/>`;acc+=w});
    s+=`<text x="${bxx}" y="${byy+26}" class="t-xs">`+FU_TXT.leeParts.map((x,i)=>`<tspan${cls===i?' style="fill:var(--ink);font-weight:700"':''}>${x}</tspan>`).join('<tspan> · </tspan>')+'</text>';
    rs.innerHTML=s;
    rv.className='verdict '+(cls===2?'no':cls===0?'yes':'maybe');
    rv.innerHTML=cls===2?FU_TXT.vSev:cls===1?FU_TXT.vMod(n,of)+(gas?FU_TXT.vModGas:FU_TXT.vNoGas):cls===0?FU_TXT.vMild+(gas?'':FU_TXT.vNoGas):FU_TXT.vMix(n,of)+(gas?'':FU_TXT.vNoGas)}
  $$('#fuRome input,#fuRome select').forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',rome));
  $$('#m-flareups [data-fup]').forEach(b=>b.addEventListener('click',()=>{const P=FU_PRE[b.dataset.fup];
    I('fuVas').value=P.vas;I('fuRr').value=P.rr;I('fuHr').value=P.hr;I('fuSat').value=P.sat;I('fuDrop').value=P.drop;I('fuCrpOn').value=P.crpOn;
    I('fuCrp').value=P.crp;I('fuGas').value=P.gas;I('fuCo2').value=P.co2;I('fuPh').value=P.ph.toFixed(2);I('fuPo2').value=P.po2;rome()}));
  rome();

  /* ---------- ECLIPSE bars ---------- */
  const es=$('#fuEcSvg');
  function ecl(){const N=vb(es,'720 210','400 380');let s='';
    const P=N?[{x:56,y:34,w:310,h:120},{x:56,y:224,w:310,h:120}]:[{x:56,y:34,w:290,h:130},{x:416,y:34,w:290,h:130}];
    const D=[{t:FU_TXT.ec1,v:[.85,1.34,2.00],mx:2.4,f:v=>v.toFixed(2)},{t:FU_TXT.ec2,v:[22,33,47],mx:60,f:v=>v+'%'}];
    D.forEach((g,k)=>{const Q=P[k];s+=`<text x="${Q.x}" y="${Q.y-14}" class="t-sm" style="fill:var(--ink);font-weight:600">${g.t}</text>`;
      s+=`<path d="M${Q.x} ${Q.y}V${Q.y+Q.h}H${Q.x+Q.w}" class="axis" style="fill:none"/>`;
      g.v.forEach((v,i)=>{const bw=Q.w/3*.56,bx=Q.x+Q.w/3*(i+.22),bh=Q.h*v/g.mx;
        s+=`<rect x="${f1(bx)}" y="${f1(Q.y+Q.h-bh)}" width="${f1(bw)}" height="${f1(bh)}" rx="4" style="fill:var(--fl);opacity:${f1(.45+.25*i)}"/><text x="${f1(bx+bw/2)}" y="${f1(Q.y+Q.h-bh-6)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${g.f(v)}</text><text x="${f1(bx+bw/2)}" y="${Q.y+Q.h+15}" class="t-xs t-mid">${FU_TXT.ecG(i+2)}</text>`})});
    es.innerHTML=s}
  ecl();

  /* ---------- outcomes after a hospitalised flare-up ---------- */
  const os=$('#fuOutSvg'),ol=$('#fuOutList'),ob=$('#fuOutBtns'),on={suissa:true,support:true,groen:false,medicare:false};let stopO=null;
  ob.innerHTML=FU_OUT.map(c=>`<button class="btn" data-fuo="${c.id}" aria-pressed="${on[c.id]}"><span aria-hidden="true" style="display:inline-block;width:10px;height:10px;border-radius:5px;margin-right:6px;background:${c.col}"></span>${c.lab}</button>`).join('');
  function out(g){const N=vb(os,'720 280','400 300');let s='';
    const x0=N?46:60,x1=N?370:690,y0=20,y1=N?240:220,hx=x0+14,tx0=x0+(N?48:66),Y=v=>y1-(y1-y0)*v/80,TX=yr=>tx0+(x1-tx0)*Math.sqrt(yr/8);
    [0,20,40,60,80].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<path d="M${x0} ${y0}V${y1}H${x1}" class="axis" style="fill:none"/><text x="${x0}" y="${y0-8}" class="t-xs">${FU_TXT.outY}</text>`;
    s+=`<text x="${hx}" y="${y1+15}" class="t-xs t-mid">${N?FU_TXT.hospN:FU_TXT.hosp}</text><text x="${f1(tx0)}" y="${y1+15}" class="t-xs t-mid">0</text>`;
    FU_TXT.ticks.forEach(([v,l])=>{s+=`<text x="${f1(TX(v))}" y="${y1+15}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">${N?FU_TXT.outXN:FU_TXT.outX}</text>`;
    FU_OUT.forEach(c=>{if(!on[c.id])return;const P=c.pts.map(([a,v],i)=>[(a==='h'?hx:TX(a))+(c.sep?(i-1.5)*9:0),Y(v*g)]);
      if(!c.sep)s+=`<path d="${P.map((q,i)=>(i?'L':'M')+f1(q[0])+' '+f1(q[1])).join('')}" style="fill:none;stroke:${c.col};stroke-width:2.4"/>`;
      P.forEach((q,i)=>{s+=c.sep?`<rect x="${f1(q[0]-5)}" y="${f1(q[1]-5)}" width="10" height="10" transform="rotate(45 ${f1(q[0])} ${f1(q[1])})" style="fill:${c.col};stroke:var(--panel);stroke-width:1.5"/>`:`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="4.5" style="fill:${c.col};stroke:var(--panel);stroke-width:1.5"/>`})});
    os.innerHTML=s;
    ol.innerHTML=FU_OUT.filter(c=>on[c.id]).map(c=>`<li><span aria-hidden="true" style="display:inline-block;width:10px;height:10px;border-radius:5px;margin-right:6px;background:${c.col}"></span>${c.li}</li>`).join('')}
  ob.addEventListener('click',e=>{const b=e.target.closest('[data-fuo]');if(!b)return;on[b.dataset.fuo]=!on[b.dataset.fuo];b.setAttribute('aria-pressed',on[b.dataset.fuo]);
    if(stopO)stopO();stopO=animate(700,q=>out(ease(q)))});
  out(1);
  const prev=redraws.flareups;redraws.flareups=()=>{prev&&prev();rome();ecl();out(1)};
};
