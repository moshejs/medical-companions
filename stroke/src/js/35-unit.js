/* =============== 3.5 The stroke unit =============== */
/* Five widgets: why units work (100-person icons, then forest plots); the first week (lanes over days 0 to 7, which
   mark plainly where the sources give no timing); FeSS (three lanes over 72 h, with invented example traces, labelled);
   malignant MCA infarct (brainAxial o.shift, then a craniectomy drawn over it, then the pooled numbers);
   early mobilisation (AVERT, negative and positive). */
const UNT_STEPS=[
 {from:0,at:.06,k:'Cochrane 2020',t:'A hundred people',
  txt:`The 2020 Cochrane review pooled 29 trials and 5902 participants comparing organised inpatient stroke unit care with an alternative service. In 20 of them (4127 participants) the alternative was a general ward [[Langhorne2020]].`,
  pt:`A stroke unit is a ward where a whole team looks after people with stroke. People treated there are more likely to live, and to get home [[Langhorne2020]].`},
 {from:.16,at:.27,k:'Outcome 1',t:'2 extra alive',
  txt:`For every 100 people receiving stroke unit care there were two extra survivors [[Langhorne2020]]. Follow-up ended at a median of one year. Death: OR 0.76, 95% CI 0.66 to 0.88, moderate-quality evidence [[Langhorne2020]].`},
 {from:.34,at:.45,k:'Outcome 2',t:'6 more at home',
  txt:`Six more per 100 were living at home [[Langhorne2020]]. Death or institutional care: OR 0.76, 95% CI 0.67 to 0.85 [[Langhorne2020]]. There was no sign of a longer hospital stay, though stay was measured inconsistently (I² = 85%) [[Langhorne2020]].`},
 {from:.5,at:.61,k:'Outcome 3',t:'6 more independent',
  txt:`Six more per 100 were living independently [[Langhorne2020]]. Death or dependency: OR 0.75, 95% CI 0.66 to 0.85 [[Langhorne2020]]. These are three separate outcomes in the same people, so they are not added together.`,
  hook:`For every 100 people treated: 2 more survive, 6 more live at home, 6 more live independently. The benefit is independent of age, sex and severity [[Langhorne2020]].`},
 {from:.66,at:.75,k:'The odds ratios',t:'All four point the same way',
  txt:`Poor outcome in the review means death, dependency (Rankin 3 to 5) or requiring institutional care [[Langhorne2020]]. Outcomes appeared independent of age, sex, initial severity, stroke type and duration of follow-up [[Langhorne2020]].`},
 {from:.84,at:.94,k:'Network meta-analysis',t:'The model matters',
  txt:`Against a general ward, odds of poor outcome were: stroke ward OR 0.74 (moderate quality), mixed rehabilitation ward OR 0.70 (low quality), mobile stroke team OR 0.88 (low quality, interval crossing 1). Benefits were most obvious in a discrete stroke ward [[Langhorne2020]].`}];
const UNT_BLOCKS=[{t:'Alive',k:2,b:'+2',c:'extra survivors per 100'},{t:'Living at home',k:6,b:'+6',c:'more per 100'},{t:'Living independently',k:6,b:'+6',c:'more per 100'}];
const UNT_F1=[{l:'Poor outcome',or:.77,lo:.69,hi:.87},{l:'Death',or:.76,lo:.66,hi:.88},{l:'Death or institutional care',or:.76,lo:.67,hi:.85},{l:'Death or dependency',or:.75,lo:.66,hi:.85}];
const UNT_F2=[{l:'Stroke ward',or:.74,lo:.62,hi:.89},{l:'Mixed rehabilitation ward',or:.70,lo:.52,hi:.95},{l:'Mobile stroke team',or:.88,lo:.58,hi:1.34}];
const UNT_F3=[{l:'Very early, higher dose (trial)',or:.73,lo:.59,hi:.90},{l:'Per extra session a day',or:1.13,lo:1.09,hi:1.18},{l:'Per extra minutes a day',or:.94,lo:.91,hi:.97},{l:'Longer time to first session',or:.99,lo:.98,hi:1}];
/* one forest plot on a log axis. Rows sit in a label column (wide) or on a line of their own (narrow). */
function untForest(x,y,w,rows,o){const N=o.N,mn=o.min||.5,mx=o.max||1.5,lab=N?0:(o.lab||200),valw=N?0:122,p0=x+lab+6,pw=w-lab-valw-12,
  X=v=>p0+pw*(Math.log(v)-Math.log(mn))/(Math.log(mx)-Math.log(mn)),rh=N?(o.rhN||54):(o.rh||40),top=y+(N?4:0),bot=top+rows.length*rh+(N?0:2);let s='';
  if(!N)s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${f1(top)}" y2="${f1(bot)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
  s+=`<line x1="${f1(p0)}" x2="${f1(p0+pw)}" y1="${f1(bot)}" y2="${f1(bot)}" class="axis"/>`;
  (o.ticks||[.5,.75,1,1.25,1.5]).forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(bot)}" y2="${f1(bot+4)}" class="axis"/><text x="${f1(X(v))}" y="${f1(bot+16)}" class="t-sm t-mid">${v}</text>`});
  if(o.lLeft)s+=`<text x="${f1(p0)}" y="${f1(bot+32)}" class="t-sm">${o.lLeft}</text>`;
  if(o.lRight)s+=`<text x="${f1(p0+pw)}" y="${f1(bot+32)}" class="t-sm t-end">${o.lRight}</text>`;
  rows.forEach((r,i)=>{const u=ease(clamp((o.u==null?1:o.u)*rows.length-i)),cy=top+rh*i+(N?36:rh/2),tx=N?cy-16:cy+4;
    if(N)s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${f1(cy-9)}" y2="${f1(Math.min(bot,cy+rh-27))}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;if(u<=0)return;const a=X(lerp(r.or,r.lo,u)),b=X(lerp(r.or,r.hi,u)),op=f1(clamp(u*2));
    s+=`<g style="opacity:${op}"><text x="${f1(x)}" y="${f1(tx)}" class="t-lbl">${r.l}</text>`;
    s+=`<text x="${f1(x+w)}" y="${f1(tx)}" class="t-sm t-end" style="fill:var(--ink)">${r.or.toFixed(2)} (${r.lo.toFixed(2)} to ${r.hi.toFixed(2)})</text>`;
    s+=`<line x1="${f1(a)}" x2="${f1(b)}" y1="${f1(cy)}" y2="${f1(cy)}" style="stroke:var(--brand);stroke-width:2.4"/><rect x="${f1(X(r.or)-5.5)}" y="${f1(cy-5.5)}" width="11" height="11" style="fill:var(--brand)"/></g>`});
  return {svg:s,bot:bot+(o.lLeft||o.lRight?36:20)}}
/* a paired-percent row: two bars with values */
function untPair(x,y,w,label,a,b,u,la,lb){const lw=Math.min(84,w*.25),bw=w-lw-48,g=(v,yy,c,l)=>`<text x="${f1(x)}" y="${f1(yy+11)}" class="t-sm">${l}</text><rect x="${f1(x+lw)}" y="${f1(yy)}" width="${f1(bw)}" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x+lw)}" y="${f1(yy)}" width="${f1(bw*v/100*u)}" height="14" rx="3" style="fill:${c}"/><text x="${f1(x+w)}" y="${f1(yy+12)}" class="t-lbl t-end">${Math.round(v*clamp(u*1.02))}%</text>`;
  return `<text x="${f1(x)}" y="${f1(y)}" class="t-lbl">${label}</text>`+g(a,y+7,'var(--rx)',la||'Surgery')+g(b,y+25,'var(--muted)',lb||'No surgery')}

/* ---- the first week ---- */
const UNT_TL_STEPS=[
 {from:0,at:.03,k:'First hours',t:'Swallow first',lane:1,
  txt:`FeSS wording: a swallow screen or assessment within 4 h of admission and before oral food, drink or medications [[Fasugba2023]]. Reported dysphagia depends on the method: 37% to 45% with cursory screening, 51% to 55% with clinical testing, 64% to 78% with instrumental testing [[Martino2005]].`,
  pt:`You may not be allowed to eat, drink or take tablets until a nurse has checked your swallow. Food or drink going down the wrong way can cause a chest infection [[Martino2005,Fasugba2023]].`},
 {from:.1,at:.17,k:'About day 1',t:'Bleeding into the infarct',lane:4,
  txt:`ECASS I read CT at 24 to 36 h, sorting transformation into HI1, HI2, PH1 and PH2 [[Fiorelli1999]]. Only PH2 changed the course: OR 32.3 (13.4 to 77.7) for early deterioration and OR 18.0 (8.05 to 40.1) for 3-month death, in both placebo and alteplase groups [[Fiorelli1999]].`,
  hook:`Only PH2 clearly changes the clinical course [[Fiorelli1999]].`},
 {from:.24,at:.27,k:'First 48 h',t:'Swelling and the surgery window',lane:3,
  txt:`Warning signs in swollen hemispheric infarction: new or further impaired consciousness, cerebral ptosis and changes in pupil size [[Wijdicks2014]]. The pooled surgery trials operated within 48 h; HAMLET allowed up to 96 h and found no evidence of functional benefit when surgery was delayed that long [[Vahedi2007,Hofmeijer2009]]. These bands are trial windows, not a curve of when swelling peaks.`},
 {from:.4,at:.49,k:'To about day 4',t:'Most complications',lane:0,
  txt:`In one comprehensive stroke unit, 312 of 489 people (63.8%) had one or more complications in the first week. Most occurred in the first 4 days, and stroke severity was the most important risk factor [[Indredavik2008]].`},
 {from:.58,at:.65,k:'While immobile',t:'Leg clots',lane:2,
  txt:`CLOTS 3 enrolled people unable to walk to the toilet without another person's help. Proximal DVT was 8.5% with intermittent pneumatic compression and 12.1% without [[Dennis2013]]. These sources give rates, not a day-by-day curve, so the band is hatched.`,
  pt:`Machines that gently squeeze your legs can lower the risk of clots in people who cannot walk alone [[Dennis2013]].`},
 {from:.72,at:.79,k:'Any day',t:'Seizures',lane:5,
  txt:`In a prospective cohort of 1897 people, seizures occurred in 8.9% (10.6% haemorrhagic, 8.6% ischaemic), and recurrent seizures (epilepsy) in 2.5% [[Bladin2000]]. ESO 2017 grades the evidence for all its recommendations very low, and "in most instances" suggests not giving antiseizure drugs [[Holtkamp2017]]. Timing inside the first week was not in the sources read, so the band is hatched.`},
 {from:.86,at:.97,k:'End of the week',t:'Pneumonia counted',lane:1,
  txt:`A consensus group defined stroke-associated pneumonia as lower respiratory infection in the first 7 days [[Smith2015]]. Where timing was reported, 78% of pneumonia occurred within 1 week [[Kishore2018]]. Dysphagia raises the risk (RR 3.17), and confirmed aspiration raises it further (RR 11.56) [[Martino2005]].`,
  hook:`Dysphagia RR 3.17 for pneumonia; aspiration RR 11.56 [[Martino2005]].`}];
const UNT_LANES=[
 {t:'All complications',bands:[{a:0,b:4,k:'pub',l:'most fall in the first 4 days',s:'most: first 4 days'}]},
 {t:'Swallow, pneumonia',mark:{d:4/24,l:'4 h'},bands:[{a:0,b:7,k:'pub',l:'screen by 4 h; pneumonia is defined over the first 7 days',s:'screen by 4 h; first 7 days',off:22}]},
 {t:'Leg clots (DVT)',bands:[{a:0,b:7,k:'nt',l:'while immobile: rates known, timing not in these sources',s:'while immobile: timing not stated'}]},
 {t:'Brain swelling',bands:[{a:0,b:2,k:'pub',l:'trials: within 48 h',s:'within 48 h'},{a:2,b:4,k:'nt',l:'HAMLET: up to 96 h',s:'up to 96 h'}]},
 {t:'Bleeding into infarct',bands:[{a:1,b:1.5,k:'pub',l:'',s:''},{a:1.5,b:7,k:'lite',l:'CT at 24 to 36 h (ECASS I); some counts run to day 7',s:'CT at 24 to 36 h'}]},
 {t:'Seizures',bands:[{a:0,b:7,k:'nt',l:'8.9% overall: timing not in these sources',s:'8.9% overall: timing not stated'}]}];
const UNT_WK=[{l:'Pain',v:23.9},{l:'Temperature 38 °C or more',v:23.7},{l:'Progressing stroke',v:18.4},{l:'Urinary tract infection',v:16},{l:'Chest infection',v:11.2},{l:'Nonserious falls',v:7.4}];

/* ---- FeSS ---- */
const UNT_FESS={
 fever:{t:'Fever',k:'F is for fever',
  txt:`As listed for a later QASC translation trial: temperature monitored and recorded at least four times per day for the first 72 h, and "If temperature => 37.5°C treat with paracetamol or other anti-pyretic" [[Fasugba2023]]. A meta-analysis of 14,431 people with stroke and other brain injury tied fever to worse outcome: relative risk 1.5 for mortality, 2.2 for modified Rankin [[Greer2008]].`,
  gap:`Practice gap: 50% of people with fever of 37.5°C or more had paracetamol within an hour in a 2021 Australian audit [[Fasugba2023]].`},
 sugar:{t:'Sugar',k:'S is for sugar',
  txt:`As listed: formal venous glucose on admission; readings at least four times per day for the first 48 h, continuing for 72 h if unstable; "If blood glucose level >10 mmol/L (180mg/dl) treat with insulin" [[Fasugba2023]]. Admission glucose above 6.1 to 7.0 mmol/L carried a relative risk of in-hospital or 30-day death of 3.28 in people without diabetes [[Capes2001]].`,
  gap:`Practice gap: 29% had insulin within 1 h of a first raised finger-prick glucose of 10 mmol/L or more in the same audit [[Fasugba2023]].`},
 swallow:{t:'Swallow',k:'S is for swallow',
  txt:`As listed: "Swallow screen or swallow assessment within 4 h of admission and prior to being given oral food, drink, or medications", with referral to a speech pathologist for those who fail [[Fasugba2023]]. ESO/ESSD 2021 finds moderate-quality evidence to recommend screening in all people with stroke to prevent pneumonia and early mortality [[Dziewas2021]].`,
  gap:`Practice gap: 60% had a swallow screen or assessment before oral intake in the same audit [[Fasugba2023]].`}};
const UNT_TEMP=monoFn([ [0,36.8],[8,37],[14,37.3],[19,37.9],[24,38.1],[29,37.4],[36,37.1],[48,37],[60,36.9],[72,36.9] ]);
const UNT_GLU=monoFn([ [0,8],[6,9],[11,10.9],[15,11.8],[20,9.6],[28,8.3],[40,8.1],[48,7.8],[60,7.6],[72,7.5] ]);

/* ---- malignant infarct ---- */
const UNT_MCA_STEPS=[
 {from:0,at:.12,k:'Large territory',t:'A large MCA infarct',
  txt:`A proximal middle cerebral artery blockage can leave most of a hemisphere infarcted. Dead and dying tissue swells inside a closed skull. In this drawing the person's left is on the viewer's right, as a scan is read.`},
 {from:.2,at:.33,k:'Mass effect',t:'The midline moves',
  txt:`Warning signs in swollen hemispheric infarction: new or further impaired consciousness, cerebral ptosis and changes in pupil size [[Wijdicks2014]]. In swollen cerebellar infarction: falling consciousness from brainstem compression, possibly with early loss of corneal reflexes and miosis [[Wijdicks2014]].`,
  pt:`A very large stroke can make the brain swell. Getting drowsier is a warning sign, and the team watches for it.`},
 {from:.4,at:.46,k:'Timing',t:'Within 48 h',
  txt:`The pooled analysis took people aged 18 to 60 operated within 48 h [[Vahedi2007]]. HAMLET allowed up to 96 h: no effect on poor outcome (absolute risk reduction 0%, -21 to 21), but fewer deaths (38%, 15 to 60), with no evidence of functional benefit when surgery is delayed that long [[Hofmeijer2009]]. ESO 2021 grades the evidence as high quality up to and including age 60 within 48 h, low quality in older people, and uncertain after 48 h [[vanderWorp2021]].`},
 {from:.5,at:.66,k:'Decompressive craniectomy',t:'Giving the brain room',
  txt:`Surgery removes a large piece of skull so the swollen brain can expand outward rather than down. The drawing is schematic: it shows the idea, not a surgical plan or a measured shift.`},
 {from:.72,at:.82,k:'Pooled trials',t:'Age 60 or under',
  txt:`DECIMAL, DESTINY and HAMLET pooled (93 people) at 1 year: survival 78% vs 29%, mRS 4 or less 75% vs 24%, mRS 3 or less 43% vs 21%. Numbers needed to treat: two for survival, two for survival with mRS 4 or less, four for survival with mRS 3 or less [[Vahedi2007]].`,
  hook:`Craniectomy within 48 h, age 60 or under: number needed to treat 2 for survival [[Vahedi2007]].`},
 {from:.87,at:.96,k:'DESTINY II',t:'Over 60: the honest trade',
  txt:`DESTINY II (112 people aged 61 or older, median 70, within 48 h): survival without severe disability 38% vs 18%, mortality 33% vs 70%. No one reached mRS 0 to 2, and most survivors needed help with most bodily needs [[Juttler2014]]. The AHA statement advises expecting that one third of people will be severely disabled and fully dependent on care even after craniectomy [[Wijdicks2014]].`,
  hook:`Over 60: 38% vs 18% survival without severe disability, and most survivors need help with bodily needs [[Juttler2014]].`,
  pt:`Surgery can save a life, but many people still live with severe disability. The team should talk with the person and family about what matters most [[Holloway2014,Creutzfeldt2025]].`}];
/* ---- AVERT ---- */
const UNT_AV_STEPS=[
 {from:0,at:.1,k:'The question',t:'Earlier and more?',
  txt:`AVERT (2104 people, 56 units, 5 countries) tested very early, higher-dose mobilisation against usual care. In the early group 92% vs 59% were mobilised within 24 h [[Bernhardt2015]].`},
 {from:.25,at:.37,k:'The negative result',t:'More, earlier, was worse',
  txt:`Favourable outcome (mRS 0 to 2) was lower with very early mobilisation: 46% vs 50% (adjusted OR 0.73, 0.59 to 0.90; p=0.004). Deaths were 8% vs 7% (OR 1.34, 0.93 to 1.93), with no reduction in immobility-related complications [[Bernhardt2015]].`,
  hook:`AVERT: higher dose earlier was worse (46% vs 50%), while shorter, more frequent sessions were associated with better outcome [[Bernhardt2015,Bernhardt2016]].`},
 {from:.5,at:.64,k:'The positive signal',t:'Short and often',
  txt:`In the prespecified dose analysis, each extra out-of-bed session per day improved the odds of favourable outcome by 13% (OR 1.13, 1.09 to 1.18), keeping timing and amount constant. More minutes per day reduced the odds (OR 0.94, 0.91 to 0.97) [[Bernhardt2016]]. <span class="ev early">Early evidence</span> The authors class this as observational and it cannot prove that short frequent sessions cause better recovery [[Bernhardt2016]].`,
  pt:`Getting up matters, but more is not always better in the first day. Short and frequent sessions looked better than long ones [[Bernhardt2016]].`},
 {from:.78,at:.9,k:'Where it leaves practice',t:'Around 24 h',
  txt:`Cochrane 2018 (9 trials, 2958 people): early mobilisation did not increase good recovery (poor outcome 51% vs 49%; OR 1.08, 0.92 to 1.26), may shorten stay by about a day (low quality), and within 24 h may carry increased risk in some people. Exploratory network analysis suggested first mobilisation at around 24 h had the lowest odds of death or poor outcome [[Langhorne2018]].`}];
/* a person in a bed who sits and stands as u goes 0..1 */
function untBed(x,y,u){const lie=clamp(1-u*2),st=clamp(u*2-1);const hx=lerp(x+16,lerp(x+52,x+88,st),1-lie),hy=lerp(y-14,lerp(y-44,y-72,st),1-lie),hipx=lerp(x+52,lerp(x+56,x+88,st),1-lie),hipy=lerp(y-10,lerp(y-16,y-38,st),1-lie),ftx=lerp(x+92,x+88,1-lie),fty=lerp(y-10,lerp(y+18,y+18,st),1-lie);
  return `<rect x="${f1(x)}" y="${f1(y-4)}" width="72" height="8" rx="3" style="fill:var(--device)"/><path d="M${f1(x+6)} ${f1(y+4)}V${f1(y+18)}M${f1(x+66)} ${f1(y+4)}V${f1(y+18)}" style="stroke:var(--device);stroke-width:3"/>`
   +`<path d="M${f1(hx)} ${f1(hy+5)}L${f1(hipx)} ${f1(hipy)}L${f1(ftx)} ${f1(fty)}" style="fill:none;stroke:var(--brand);stroke-width:5;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="7" style="fill:var(--brand)"/>`}

inits.unit=()=>{
  /* ---- 1. why units work ---- */
  (function(){const svg=$('#untSvg'),rg=$('#untT');
    function draw(t){const N=vb(svg,'720 400','400 560');let s='';const W=N?372:680,x0=N?14:20;
      if(t<.66){
        s+=`<text x="${x0}" y="24" class="t-big">For every 100 people given stroke unit care</text>`;
        s+=`<text x="${x0}" y="42" class="t-sm">Three separate outcomes. They are not added together.</text>`;
        const us=[ramp(t,.16,.25),ramp(t,.34,.43),ramp(t,.5,.59)];
        UNT_BLOCKS.forEach((b,i)=>{const u=us[i],k=Math.round(b.k*u);
          const X=N?14:24+i*232,Y=N?62+i*164:66,sz=N?14:15,gp=N?4.3:4;
          const ic=icons(X,Y+18,{n:100,cols:N?20:10,k,size:sz,gap:gp,col:'var(--rec)',base:'var(--line)'});
          s+=`<text x="${X}" y="${Y+8}" class="t-lbl">${b.t}</text>`+ic.svg;
          const yb=Y+18+ic.h+(N?14:22);
          s+=`<g style="opacity:${f1(clamp(u*3))}"><text x="${X}" y="${yb}" class="t-big" style="font-size:22px;fill:var(--rec)">${b.b}</text><text x="${X+(N?36:38)}" y="${yb}" class="t-sm" style="fill:var(--ink)">${b.c}</text></g>`});
        if(!N)s+=`<text x="${x0}" y="392" class="t-sm">Each figure is one person of 100; green marks the difference. Baseline counts are not shown.</text>`;
        else s+=`<text x="${x0}" y="550" class="t-sm">Green marks the difference, not a baseline.</text>`;
      }else{const two=t>=.84,rows=two?UNT_F2:UNT_F1,u=two?ramp(t,.84,.93):ramp(t,.66,.76);
        s+=`<text x="${x0}" y="24" class="t-big">${two?'Poor outcome, by model of care':'Stroke unit care: odds ratios'}</text>`;
        s+=`<text x="${x0}" y="42" class="t-sm">${two?'Each against a general ward. Square: OR. Line: 95% CI.':'End of follow-up, median one year. Square: OR. Line: 95% CI.'}</text>`;
        s+=untForest(x0,62,W,rows,{N,u,lab:204,rh:two?78:60,rhN:two?120:96,lLeft:'lower odds: favours unit',lRight:'higher odds'}).svg}
      svg.innerHTML=s;const p=phaseOf(UNT_STEPS,t);setSt(p);$('#untNote').innerHTML=noteHTML(UNT_STEPS[p])}
    const stop=playWire(rg,$('#untPlay'),draw,16000,'%t:player.replay%','unit');
    const setSt=stepWire($('#untSteps'),UNT_STEPS,rg,draw,stop);draw(+rg.value)})();

  /* ---- 2. first-week timeline ---- */
  (function(){const svg=$('#untTlSvg'),rg=$('#untTlT');
    function draw(t){const N=vb(svg,'720 420','400 560'),d=t*7,p=phaseOf(UNT_TL_STEPS,t),act=UNT_TL_STEPS[p].lane;
      const px=N?14:172,pw=N?372:532,X=v=>px+pw*v/7,top=N?62:58,lh=N?72:52,bh=N?28:26;let s='',lab='';
      s+=`<defs><pattern id="untHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" style="fill:var(--panel-2)"/><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--line);stroke-width:3"/></pattern></defs>`;
      for(let i=0;i<=7;i++)s+=`<line x1="${f1(X(i))}" x2="${f1(X(i))}" y1="${top-6}" y2="${top+lh*UNT_LANES.length-6}" class="grid"/><text x="${f1(X(i))}" y="${top-12}" class="t-sm t-mid">${i===0?'0':i}</text>`;
      s+=`<text x="${px}" y="${top-30}" class="t-sm" style="fill:var(--ink);font-weight:700">Days after stroke</text>`;
      UNT_LANES.forEach((L,i)=>{const y=top+i*lh,on=i===act,by=N?y+20:y+6;
        if(on)s+=`<rect x="${N?4:6}" y="${y-4}" width="${N?392:708}" height="${lh-4}" rx="8" style="fill:var(--brand-soft)"/>`;
        s+=N?`<text x="14" y="${y+13}" class="t-lbl">${L.t}</text>`:`<text x="14" y="${by+bh/2+4}" class="t-lbl">${L.t}</text>`;
        L.bands.forEach(b=>{const xa=X(b.a),xb=X(b.b),wd=xb-xa,past=clamp((d-b.a)/(b.b-b.a));
          if(b.k==='lite'){s+=`<rect x="${f1(xa)}" y="${by+3}" width="${f1(wd)}" height="${bh-6}" rx="4" style="fill:var(--panel-2)"/>`}
          else if(b.k==='nt'){s+=`<rect x="${f1(xa)}" y="${by}" width="${f1(wd)}" height="${bh}" rx="5" style="fill:url(#untHatch);stroke:var(--muted);stroke-width:1;stroke-dasharray:4 3"/>`}
          else{s+=`<rect x="${f1(xa)}" y="${by}" width="${f1(wd)}" height="${bh}" rx="5" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.4"/>`;
            if(past>0)s+=`<rect x="${f1(xa)}" y="${by}" width="${f1(wd*past)}" height="${bh}" rx="5" style="fill:var(--brand);opacity:.22"/>`}
          const tx=N?b.s:b.l;if(tx){const lx=xa+6+(b.off||0);lab+=`<text x="${f1(lx)}" y="${by+bh/2+4}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${tx}</text>`}});
        if(L.mark){const mx=X(L.mark.d);s+=`<path d="M${f1(mx)} ${by-1}V${by+bh+1}" style="stroke:var(--accent);stroke-width:3"/><circle cx="${f1(mx)}" cy="${by-1}" r="3.5" style="fill:var(--accent)"/>`}});
      const cx=X(d),b=top+lh*UNT_LANES.length-6,pillW=62,plx=clamp(cx-pillW/2,N?2:px-pillW/2,(N?398:718)-pillW);
      s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${top-6}" y2="${b}" style="stroke:var(--accent);stroke-width:2"/>`;
      s+=`<rect x="${f1(plx)}" y="${b}" width="${pillW}" height="20" rx="10" style="fill:var(--accent)"/><text x="${f1(plx+pillW/2)}" y="${b+14}" class="t-sm t-mid" style="fill:var(--bg);font-weight:700">day ${d.toFixed(1)}</text>`+lab;
      const lg=b+38;
      s+=`<rect x="14" y="${lg-10}" width="22" height="12" rx="3" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.4"/><text x="42" y="${lg}" class="t-sm">timing published</text><rect x="${N?168:172}" y="${lg-10}" width="22" height="12" rx="3" style="fill:url(#untHatch);stroke:var(--muted);stroke-dasharray:4 3"/><text x="${N?196:200}" y="${lg}" class="t-sm">timing not in the sources read</text>`;
      svg.innerHTML=s;setSt(p);$('#untTlNote').innerHTML=noteHTML(UNT_TL_STEPS[p])}
    const stop=playWire(rg,$('#untTlPlay'),draw,18000,'%t:player.replay%','unit');
    const setSt=stepWire($('#untTlSteps'),UNT_TL_STEPS,rg,draw,stop);draw(+rg.value);
    $('#untWk').innerHTML=UNT_WK.map(r=>`<div class="unt-bar"><span>${r.l}</span><i><b style="width:${f1(r.v/30*100)}%"></b></i><em>${r.v.toFixed(1)}%</em></div>`).join('')})();

  /* ---- 3. FeSS explorer ---- */
  (function(){const svg=$('#untFsSvg'),rg=$('#untFsT'),bs=$$('[data-fess]');let mode='fever';
    function draw(t){const N=vb(svg,'720 410','400 620'),h=t*72,px=N?14:128,pw=N?372:576,X=v=>px+pw*v/72,lh=N?178:112,top=N?48:50,ph=N?104:76;let s='';
      s+=`<text x="${N?14:14}" y="20" class="t-sm" style="fill:var(--ink);font-weight:700">${N?'Hours from admission. Traces invented, not data.':'Hours from admission. Example traces are invented for teaching, not data.'}</text>`;
      const lanes=[{id:'fever',t:'Fever'},{id:'sugar',t:'Sugar'},{id:'swallow',t:'Swallow'}];
      lanes.forEach((L,i)=>{const y=top+i*lh,py=N?y+22:y,on=mode===L.id;
        if(on)s+=`<rect x="${N?4:6}" y="${y-(N?4:8)}" width="${N?392:708}" height="${lh-4}" rx="8" style="fill:var(--brand-soft)"/>`;
        s+=N?`<text x="14" y="${y+12}" class="t-lbl">${L.t}</text>`:`<text x="14" y="${y+ph/2}" class="t-lbl">${L.t}</text>`;
        s+=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" style="fill:var(--field);stroke:var(--line)"/>`;
        [0,24,48,72].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${py}" y2="${py+ph}" class="grid"/><text x="${f1(clamp(X(v),px+8,px+pw-8))}" y="${py+ph+13}" class="t-xs t-mid">${v}</text>`});
        if(L.id==='swallow'){const gx=X(Math.min(h,3));
          s+=`<rect x="${f1(X(0))}" y="${py+ph*.2}" width="${f1(X(3)-X(0))}" height="${ph*.26}" style="fill:var(--accent)"/>`;
          s+=`<line x1="${f1(X(4))}" x2="${f1(X(4))}" y1="${py}" y2="${py+ph}" style="stroke:var(--accent);stroke-width:1.5;stroke-dasharray:4 3"/>`;
          s+=`<text x="${f1(X(4)+7)}" y="${py+ph*.2+11}" class="t-sm" style="fill:var(--ink)">by 4 h: screen, before anything by mouth</text>`;
          const done=h>=3;
          s+=`<text x="${f1(X(4)+7)}" y="${py+ph*.2+ (N?30:28)}" class="t-sm" style="fill:var(--ink);font-weight:${done?700:500}">${done?'Screened at 3 h in this example':'Nothing by mouth yet'}</text>`;
          s+=`<circle cx="${f1(gx)}" cy="${py+ph*.33}" r="5" style="fill:var(--ink)"/>`;
          if(done)s+=`<rect x="${f1(X(4))}" y="${py+ph*.68}" width="${f1(Math.max(0,X(h)-X(4)))}" height="${ph*.16}" rx="3" style="fill:var(--rec);opacity:.75"/>`;
          s+=`<rect x="${f1(X(4))}" y="${py+ph*.68}" width="${f1(pw-(X(4)-px))}" height="${ph*.16}" rx="3" style="fill:none;stroke:var(--line)"/>`;
        }else{const fev=L.id==='fever',f=fev?UNT_TEMP:UNT_GLU,y0=fev?36.4:6,y1=fev?38.9:15,thr=fev?37.5:10,Y=v=>py+ph-ph*(v-y0)/(y1-y0),end=fev?72:48;
          s+=`<line x1="${px}" x2="${px+pw}" y1="${f1(Y(thr))}" y2="${f1(Y(thr))}" style="stroke:var(--accent);stroke-width:1.5;stroke-dasharray:5 3"/>`;
          s+=`<text x="${px+pw-6}" y="${f1(Y(thr)-5)}" class="t-sm t-end" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:3px">${fev?'37.5 °C: treat':'above 10 mmol/L: treat'}</text>`;
          let d='';const hh=Math.max(.5,h);for(let v=0;v<=hh;v+=.5)d+=(v?'L':'M')+f1(X(v))+' '+f1(Y(f(v)));
          s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.4"/>`;
          for(let v=0;v<=72;v+=6){const dashed=v>end,seen=v<=h;
            s+=`<circle cx="${f1(clamp(X(v),px,px+pw))}" cy="${py+ph-7}" r="3.5" style="fill:${seen&&!dashed?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1${dashed?';stroke-dasharray:2 2':''}"/>`}
          if(!fev&&h>48)s+=`<text x="${px+pw-6}" y="${py+15}" class="t-sm t-end" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:3px">${N?'after 48 h: if unstable':'after 48 h: only if unstable'}</text>`;
          const cross=fev?17:9.8;if(h>=cross){const fx=X(cross),fy=Y(f(cross));s+=`<circle cx="${f1(fx)}" cy="${f1(fy)}" r="6" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>`;
            const lx=fx+12;s+=`<text x="${f1(lx)}" y="${py+15}" class="t-sm" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--field);stroke-width:3px">${fev?'paracetamol or other antipyretic':'insulin'}</text>`}}});
      const cx=X(h),txts=s.match(/<text[\s\S]*?<\/text>/g)||[];s=s.replace(/<text[\s\S]*?<\/text>/g,'')+`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${N?top+22:top}" y2="${top+lh*2+(N?22:0)+ph}" style="stroke:var(--accent);stroke-width:1.6;opacity:.8"/>`+txts.join('');
      svg.innerHTML=s;
      $('#untFsRead').innerHTML=`<span>Hour <b>${Math.round(h)}</b></span><span>Dots <b>at least four readings a day, spaced evenly for the drawing</b></span>`}
    function note(){const F=UNT_FESS[mode];$('#untFsNote').innerHTML=`<div class="kicker">${F.k}</div><h4>${F.t}</h4><p>${F.txt}</p><p>${F.gap}</p><div class="hook"><b>%t:note.hook%</b>QASC tested nurse-initiated protocols for Fever, Sugar and Swallow, with number needed to treat 6.4 for death or dependency at 90 days [[Middleton2011]].</div>`}
    bs.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.fess;bs.forEach(o=>o.setAttribute('aria-pressed',o===b));note();draw(+rg.value)}));
    playWire(rg,$('#untFsPlay'),draw,14000,'%t:player.replay%','unit');note();draw(+rg.value);
    /* QASC result: two icon blocks */
    const out=$('#untQasc');
    function drawOut(){const N=vb(out,'720 214','400 410');let s='';
      [{t:'Intervention units',k:42,n:'236 of 558',c:'var(--rx)'},{t:'Control units',k:58,n:'259 of 449',c:'var(--muted)'}].forEach((b,i)=>{const X=N?14:30+i*345,Y=N?14+i*196:14;
        const ic=icons(X,Y+24,{n:100,cols:N?20:20,k:b.k,size:N?14:13,gap:N?4.3:3.2,col:b.c,base:'var(--line)'});
        s+=`<text x="${X}" y="${Y+10}" class="t-lbl">${b.t}</text>`+ic.svg;
        const yy=Y+24+ic.h+22;s+=`<text x="${X}" y="${yy}" class="t-big" style="font-size:24px">${b.k}%</text><text x="${X+56}" y="${yy}" class="t-sm" style="fill:var(--ink)">dead or dependent at 90 days</text><text x="${X+56}" y="${yy+15}" class="t-sm">${b.n}</text>`});
      out.innerHTML=s}
    drawOut();const pr=redraws.unit;redraws.unit=()=>{pr&&pr();drawOut()}})();

  /* ---- 4. malignant MCA ---- */
  (function(){const svg=$('#untMcSvg'),rg=$('#untMcT'),bs=$$('[data-mcmode]');let mode='plain';
    function draw(t){const N=vb(svg,'720 380','400 640'),s0=N?1:1.08,bx=N?56:14,by=N?30:42,ct=mode==='ct';
      const core=lerp(.22,.92,ease(ramp(t,.02,.22))),op=ease(ramp(t,.52,.62)),bul=ease(ramp(t,.56,.7));
      const shift=lerp(0,22,ease(ramp(t,.2,.38)))*(1-.72*bul);let s='';
      s+=`<text x="${N?14:14}" y="20" class="t-sm" style="fill:var(--ink);font-weight:700">Axial slice, front up, person's left on viewer's right</text>`;
      if(ct)s+=`<rect x="${bx}" y="${by}" width="${f1(268*s0)}" height="${f1(300*s0)}" rx="10" style="fill:var(--scan-bg)"/>`;
      const g=brainAxial(bx,by,s0,{mode,side:'L',core,shift,orient:true,id:'untMc'});s+=g.svg;
      /* true midline and the shift arrow */
      const mx=bx+120*s0,my=by+30*s0;
      if(shift>2){s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${f1(by+8*s0)}" y2="${f1(by+292*s0)}" style="stroke:var(--salvage);stroke-width:1.2;stroke-dasharray:3 4"/>`;
        const ya=by+150*s0;s+=`<path d="M${f1(mx)} ${f1(ya)}H${f1(mx-shift*s0)}" style="stroke:var(--salvage);stroke-width:3"/><circle cx="${f1(mx-shift*s0)}" cy="${f1(ya)}" r="3.5" style="fill:var(--salvage)"/>`}
      /* the flap and the bulge, in the glyph's local coordinates */
      if(op>0){const E=(ph,rx,ry)=>{const a=ph*Math.PI/180;return [120+Math.sin(a)*rx,150-Math.cos(a)*ry]},arc=(a,b,rx,ry,n=24)=>{const P=[];for(let i=0;i<=n;i++)P.push(E(lerp(a,b,i/n),rx,ry));return P};
        const a=34,b=132,bg=ct?'var(--scan-bg)':'var(--panel)',bone=ct?'var(--scan-bone)':'var(--skull)',sector=ptsD(arc(a,b,112,142).concat(arc(b,a,102,132)))+'Z';
        let o=`<g transform="translate(${f1(bx)} ${f1(by)}) scale(${s0})"><path d="${sector}" style="fill:${bg};opacity:${f1(clamp(op*3))}"/>`;
        if(bul>0){const amp=30*bul,P=[];for(let i=0;i<=30;i++){const u=i/30,ph=lerp(a+3,b-3,u),w=Math.sin(Math.PI*u),rx=100+amp*Math.pow(w,.7)+2*w,ry=130+amp*Math.pow(w,.7)*.5;P.push(E(ph,rx,ry))}
          const Q=P.concat(arc(b-3,a+3,82,112,16));
          o+=`<path d="${smoothPath(Q,true)}" style="fill:${ct?'var(--scan-hypo)':'var(--core)'};opacity:${ct?1:.92}"/>`;
          o+=`<path d="${ptsD(P)}" style="fill:none;stroke:${ct?'var(--scan-gm)':'var(--brain-line)'};stroke-width:1.6"/>`}
        const dx=46*ease(ramp(t,.52,.6));o+=`<g transform="translate(${f1(dx)} ${f1(-dx*.2)})" style="opacity:${f1(1-ramp(t,.56,.62))}"><path d="${ptsD(arc(a,b,110,140).concat(arc(b,a,103,133)))}Z" style="fill:${bone};stroke:var(--bone)"/></g></g>`;s+=o}
      /* right-hand or lower panel */
      const P=phaseOf(UNT_MCA_STEPS,t),X=N?14:318,Y=N?362:44,W=N?372:388;
      const big=(tx,yy)=>`<text x="${X}" y="${yy}" class="t-big">${tx}</text>`;
      if(P===0){const b=brainSide(N?X+56:X+44,Y+24,N?.84:1,{shade:{mca:.75*ease(ramp(t,.02,.14))},vessels:{occl:'m1',ph:t*30,flow:.8},id:'untMs'});
        s+=big('Left hemisphere, blocked at the first MCA segment',Y)+b.svg;
        s+=`<text x="${X}" y="${Y+(N?262:306)}" class="t-sm">Schematic. The wash marks the MCA territory.</text>`}
      else if(P===1){s+=big('What the nurse sees first',Y);
        ['New or further impaired consciousness','Cerebral ptosis (drooping lids)','Changes in pupil size'].forEach((tx,i)=>{const u=ramp(t,.21+i*.03,.25+i*.03),yy=Y+40+i*62;
          s+=`<g style="opacity:${f1(u)}"><rect x="${X}" y="${yy-24}" width="${W}" height="46" rx="10" style="fill:var(--panel-2)"/><text x="${X+14}" y="${yy+4}" class="t-lbl">${tx}</text></g>`});
        s+=`<text x="${X}" y="${Y+226}" class="t-sm" style="fill:var(--ink)">Green dashes: true midline. Bar: the shift, schematic.</text>`;
        s+=`<text x="${X}" y="${Y+246}" class="t-sm">Signs as listed by the AHA statement.</text>`}
      else if(P===2){s+=big('The operating window in the trials',Y);
        const ax=X+6,aw=W-16,XH=v=>ax+aw*v/96,yy=Y+66,u=ramp(t,.4,.48);
        s+=`<rect x="${f1(XH(0))}" y="${yy}" width="${f1(XH(48)-XH(0))}" height="34" rx="5" style="fill:var(--rx);opacity:.85"/><text x="${f1(XH(24))}" y="${yy+22}" class="t-lbl t-mid" style="fill:var(--bg)">within 48 h</text>`;
        s+=`<rect x="${f1(XH(48))}" y="${yy}" width="${f1(XH(96)-XH(48))}" height="34" rx="5" style="fill:var(--panel-2);stroke:var(--muted);stroke-dasharray:4 3"/><text x="${f1(XH(72))}" y="${yy+22}" class="t-lbl t-mid">HAMLET: to 96 h</text>`;
        [0,24,48,72,96].forEach(v=>{s+=`<line x1="${f1(XH(v))}" x2="${f1(XH(v))}" y1="${yy+36}" y2="${yy+42}" class="axis"/><text x="${f1(XH(v))}" y="${yy+56}" class="t-sm t-mid">${v} h</text>`});
        s+=`<circle cx="${f1(XH(u*96))}" cy="${yy-8}" r="5" style="fill:var(--accent)"/>`;
        s+=`<text x="${X}" y="${yy+90}" class="t-lbl">Within 48 h, age 60 or under: high-quality evidence.</text>`;
        s+=`<text x="${X}" y="${yy+112}" class="t-lbl">Older people: low quality.</text><text x="${X}" y="${yy+134}" class="t-lbl">After 48 h: uncertain.</text>`;
        s+=`<text x="${X}" y="${yy+156}" class="t-sm">Grades from ESO 2021.</text>`}
      else if(P===3){s+=big('What the operation changes',Y);
        ['The bone flap comes off','The swollen brain bulges outward','The midline can drift back'].forEach((tx,i)=>{const u=ramp(t,.52+i*.05,.57+i*.05),yy=Y+40+i*62;
          s+=`<g style="opacity:${f1(Math.max(.6,u))}"><rect x="${X}" y="${yy-24}" width="${W}" height="46" rx="10" style="fill:var(--panel-2)"/><text x="${X+14}" y="${yy+4}" class="t-lbl">${i+1}. ${tx}</text></g>`});
        s+=`<text x="${X}" y="${Y+226}" class="t-sm">Schematic, not a measured shift or a surgical plan.</text>`}
      else if(P===4){const u=ease(ramp(t,.72,.82));s+=big('Pooled trials at 1 year (93 people)',Y);
        s+=untPair(X,Y+30,W,'Survival',78,29,u)+untPair(X,Y+90,W,'mRS 4 or less',75,24,u)+untPair(X,Y+150,W,'mRS 3 or less',43,21,u);
        s+=`<text x="${X}" y="${Y+220}" class="t-lbl">Number needed to treat: 2, 2 and 4</text><text x="${X}" y="${Y+238}" class="t-sm">survival; survival with mRS 4 or less; with mRS 3 or less</text>`;
        s+=`<text x="${X}" y="${Y+256}" class="t-sm">Age 18 to 60, surgery within 48 h.</text>`}
      else{s+=big('DESTINY II, age 61 or older',Y);const u=ease(ramp(t,.87,.95)),hw=W-6;
        const A=mrsStack(X,Y+44,hw*(.5+.5*u),34,[0,0,0,7,32,28,33],{label:'Surgery'}),B=mrsStack(X,Y+122,hw*(.5+.5*u),34,[0,0,0,3,15,13,70],{label:'No surgery'});
        s+=A.svg+B.svg;
        s+=`<text x="${X}" y="${Y+182}" class="t-sm" style="fill:var(--ink)">Percent at mRS 3, 4, 5 and 6. No one reached mRS 0 to 2.</text>`;
        s+=`<text x="${X}" y="${Y+200}" class="t-sm">3 moderate, 4 moderately severe, 5 severe disability, 6 dead.</text>`;
        s+=`<text x="${X}" y="${Y+226}" class="t-lbl">Survival without severe disability: 38% vs 18%</text><text x="${X}" y="${Y+246}" class="t-lbl">Mortality: 33% vs 70%</text>`}
      svg.innerHTML=s;setSt(P);$('#untMcNote').innerHTML=noteHTML(UNT_MCA_STEPS[P])}
    const stop=playWire(rg,$('#untMcPlay'),draw,20000,'%t:player.replay%','unit');
    const setSt=stepWire($('#untMcSteps'),UNT_MCA_STEPS,rg,draw,stop);
    bs.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mcmode;bs.forEach(o=>o.setAttribute('aria-pressed',o===b));draw(+rg.value)}));
    draw(+rg.value)})();

  /* ---- 5. AVERT ---- */
  (function(){const svg=$('#untAvSvg'),rg=$('#untAvT');
    function draw(t){const N=vb(svg,'720 380','400 640');const P=phaseOf(UNT_AV_STEPS,t),x0=N?14:20,W=N?372:680;let s='';
      if(P===0){const u=ease(ramp(t,.01,.09));s+=`<text x="${x0}" y="24" class="t-big">Out of bed within 24 h</text>`;
        const R=[{l:'Very early, higher dose',v:92,c:'var(--rx)'},{l:'Usual care',v:59,c:'var(--muted)'}];
        R.forEach((r,i)=>{const y=N?70+i*230:62+i*150,bx=N?x0:x0+170,bw=N?W-44:W-214,pose=ramp(t,.01+i*.02,.09);
          s+=untBed(x0+(N?100:0),y+(N?70:66),pose*(r.v/92));
          const by=N?y+108:y+22;
          s+=`<text x="${bx}" y="${by-8}" class="t-lbl">${r.l}</text><rect x="${bx}" y="${by}" width="${f1(bw)}" height="26" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*r.v/100*u)}" height="26" rx="5" style="fill:${r.c}"/><text x="${bx+bw+6}" y="${by+18}" class="t-lbl">${Math.round(r.v*u)}%</text>`});
        s+=`<text x="${x0}" y="${N?622:368}" class="t-sm">The figure is schematic. Bars: share mobilised within 24 h.</text>`}
      else if(P===1){const u=ramp(t,.25,.34);s+=`<text x="${x0}" y="24" class="t-big">Favourable outcome (mRS 0 to 2)</text>`;
        [{l:'Very early, higher dose',k:46,d:'Deaths 8%',c:'var(--rx)'},{l:'Usual care',k:50,d:'Deaths 7%',c:'var(--muted)'}].forEach((b,i)=>{const X=N?x0:40+i*340,Y=N?52+i*280:52,sz=N?15:16,gp=N?4:4;
          const ic=icons(X,Y+22,{n:100,cols:10,k:Math.round(b.k*u),size:sz,gap:gp,col:b.c,base:'var(--line)'});
          s+=`<text x="${X}" y="${Y+10}" class="t-lbl">${b.l}</text>`+ic.svg;
          const tx=X+(N?210:216);s+=`<text x="${tx}" y="${Y+70}" class="t-big" style="font-size:30px">${Math.round(b.k*u)}%</text><text x="${tx}" y="${Y+92}" class="t-sm" style="fill:var(--ink)">favourable</text><text x="${tx}" y="${Y+124}" class="t-lbl">${b.d}</text>`});
        s+=`<text x="${x0}" y="${N?630:340}" class="t-sm" style="fill:var(--ink)">Adjusted OR 0.73 (0.59 to 0.90), p=0.004.</text>`}
      else if(P===2){const u=ramp(t,.5,.62);s+=`<text x="${x0}" y="24" class="t-big">The same time out of bed, split differently</text><text x="${x0}" y="42" class="t-sm">Schematic day: the blocks show the pattern, not trial doses.</text>`;
        const sx=x0,sw=W,row=(y,lb,blocks)=>{let o=`<text x="${sx}" y="${y}" class="t-lbl">${lb}</text><rect x="${sx}" y="${y+6}" width="${sw}" height="18" rx="4" style="fill:var(--panel-2)"/>`;blocks.forEach(b=>{const a=sx+sw*b[0],w=sw*b[1]*clamp(u*1.4);o+=`<rect x="${f1(a)}" y="${y+6}" width="${f1(w)}" height="18" rx="3" style="fill:var(--brand)"/>`});return o};
        s+=row(66,'Fewer, longer sessions',[ [.12,.2],[.58,.2] ]);
        s+=row(112,'More, shorter sessions',[ [.08,.08],[.24,.08],[.4,.08],[.56,.08],[.72,.08] ]);
        s+=untForest(x0,N?150:150,W,UNT_F3.slice(1),{N,u:ramp(t,.53,.66),lab:204,min:.85,max:1.25,ticks:[.9,1,1.1,1.2],lLeft:'lower odds of favourable outcome',lRight:'higher'}).svg}
      else{const u=ramp(t,.78,.88),ax=x0+6,aw=W-18,XH=v=>ax+aw*v/48,y=70;s+=`<text x="${x0}" y="24" class="t-big">First time out of bed</text><text x="${x0}" y="42" class="t-sm">${N?'Hours after stroke. Exploratory analysis.':'Hours after stroke. Exploratory, from the network analysis in Cochrane 2018.'}</text>`;
        s+=`<rect x="${f1(XH(0))}" y="${y}" width="${f1(XH(24)-XH(0))}" height="30" rx="5" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="${f1(XH(12))}" y="${y+20}" class="t-sm t-mid" style="fill:var(--ink)">may raise risk in some</text>`;
        s+=`<circle cx="${f1(XH(24))}" cy="${y+15}" r="${f1(8*u)}" style="fill:var(--rec)"/><text x="${f1(XH(24)+14)}" y="${y+20}" class="t-sm" style="fill:var(--ink);font-weight:700">around 24 h: lowest odds</text>`;
        [0,12,24,36,48].forEach(v=>{s+=`<line x1="${f1(XH(v))}" x2="${f1(XH(v))}" y1="${y+32}" y2="${y+38}" class="axis"/><text x="${f1(XH(v))}" y="${y+52}" class="t-sm t-mid">${v}</text>`});
        const ys=y+84;s+=`<text x="${x0}" y="${ys}" class="t-lbl">How AVERT counted a session</text>`;
        (N?['Low-arousal dependent people: active sitting','with assistance, sessions of 10 to 30 minutes.','Passive sitting in a chair did not count.','Sitting more than 50 minutes at one time','was discouraged.','These describe the trial protocol.']:['Low-arousal dependent people: active sitting with assistance, sessions of 10 to 30 minutes.','Passive sitting in a chair did not count.','Sitting more than 50 minutes at one time was discouraged.','These describe the trial protocol.']).forEach((l,i)=>{s+=`<text x="${x0}" y="${ys+24+i*22}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(t,.8+i*.02,.84+i*.02))}">${l}</text>`})}
      svg.innerHTML=s;setSt(P);$('#untAvNote').innerHTML=noteHTML(UNT_AV_STEPS[P])}
    const stop=playWire(rg,$('#untAvPlay'),draw,16000,'%t:player.replay%','unit');
    const setSt=stepWire($('#untAvSteps'),UNT_AV_STEPS,rg,draw,stop);draw(+rg.value)})();
};
