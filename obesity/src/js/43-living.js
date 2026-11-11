/* =============== 4.3 Living with obesity =============== */
inits.living=()=>{
  /* ---------- the years after weight loss ----------
     x = months after the end of active weight loss (0..60), y = share of the lost weight regained (%), calculated here
     from published group means. Each series runs as a straight (schematic) line from 0 to its published end point. */
  const svg=$('#lvSvg'),rg=$('#lvT'),note=$('#lvNote'),rd=$('#lvRead'),lb=$('#lvLayers');
  const MX=60;
  const SER=[
   {ly:'contact',lab:'WLM: monthly contact',sh:'Monthly contact 47%',m:30,v:47,col:'var(--life)'},
   {ly:'contact',lab:'WLM: self-directed',sh:'Self-directed 65%',m:30,v:65,col:'var(--life)',dash:'6 4'},
   {ly:'contact',lab:'STOP Regain: face to face',sh:'Face to face 13%',m:18,v:13,col:'var(--tx)'},
   {ly:'contact',lab:'STOP Regain: newsletter only',sh:'Newsletter 25%',m:18,v:25,col:'var(--tx)',dash:'6 4'},
   {ly:'med',lab:'SURMOUNT-4: tirzepatide continued',sh:'Continued −21%',m:12,v:-21,col:'var(--rx-drug)'},
   {ly:'med',lab:'SURMOUNT-4: switched to placebo',sh:'Placebo 53%',m:12,v:53,col:'var(--rx-drug)',dash:'6 4'},
   {ly:'med',lab:'STEP 1 extension: all treatment stopped',sh:'All stopped 67%',m:12,v:67,col:'var(--hl)',dash:'2 3'},
   {ly:'reg',lab:'NWCR registry members (self-selected)',sh:'NWCR 24% at 5 y',m:60,v:24,col:'var(--gold)'}
  ];
  const LAYERS=[
   {id:'contact',b:'Follow-up contact',ev:'Randomised trials',from:.28,col:'var(--life)',
    say:'Regular contact slowed regain: WLM 4.0 vs 5.5 kg at 30 months; STOP Regain 2.5 vs 4.9 kg at 18 months. [[Svetkey2008WLM,Wing2006STOPRegain]]'},
   {id:'med',b:'Medicine continued',ev:'Randomised trials',from:.08,col:'var(--rx-drug)',
    say:'Stopping a GLP-1-based medicine was followed by regain; continuing it held or added to the loss. [[Aronne2024SURMOUNT4,Wilding2022STEP1ext]]'},
   {id:'act',b:'Activity',ev:'Observational',from:.55,col:'var(--accent)',
    say:'More than 250 min/week goes with better maintenance in observational studies; no well-designed trial tests it for preventing regain. [[Donnelly2009ACSM]]'},
   {id:'sleep',b:'Sleep',ev:'Early evidence',from:.55,col:'var(--pyy)',
    say:'In one trial, sleep counselling added about 1.2 hours a night and people ate 270 kcal a day less than controls. [[Tasali2022]]'},
   {id:'mind',b:'Mental-health care',ev:'Established for BED',from:.55,col:'var(--hl)',
    say:'Low mood and obesity feed each other; CBT treats binge-eating disorder. [[Luppino2010,Hilbert2019]]'}
  ];
  const on={contact:true,med:true,act:true,sleep:true,mind:true};
  lb.innerHTML=LAYERS.map(L=>`<button class="btn" data-ly="${L.id}" aria-pressed="true">${L.b}</button>`).join('');
  const STEPS=[
   {from:0,at:.03,k:'Month 0',t:'The body pushes back',
    txt:'One year after an average 13.5 kg loss on a very-low-energy diet, leptin, peptide YY, cholecystokinin and insulin were still lower and ghrelin still higher than at baseline, and hunger was still higher. [[Sumithran2011]] In a model built on trial data, appetite rose by about 100 kcal/day for every kilogram lost, more than three times the fall in energy use. [[Polidori2016]] Reviews describe the usual course as early loss, a plateau at about 6 months, then gradual regain, and say long-term clinical care is needed. [[Hall2018Maintenance,Franz2007]]',
    pt:'After weight loss, the body turns hunger up and keeps it up. That is why keeping weight off is hard, for everyone.',
    hook:'Hormonal changes that favour regain (leptin down, ghrelin up) persist 1 year after weight loss. [[Sumithran2011]]'},
   {from:.08,at:.2,k:'Month 12',t:'When treatment stops',
    txt:'In the STEP 1 extension, all treatment, including lifestyle support, stopped at week 68. People on semaglutide had lost 17.3%; by week 120 they had regained 11.6 percentage points, "two-thirds of their prior weight loss", and most cardiometabolic gains moved back towards baseline. The authors say this confirms the chronicity of obesity. [[Wilding2022STEP1ext]] In SURMOUNT-4, people switched to placebo after a 20.9% lead-in loss gained 14.0% from week 36 to 88. [[Aronne2024SURMOUNT4]]',
    pt:'When a weight medicine stops, much of the weight usually comes back within a year. That is the disease returning, like blood pressure rising when a blood-pressure tablet stops.',
    hook:'STEP 1 extension: two-thirds of the weight lost came back within 1 year of stopping. [[Wilding2022STEP1ext]]'},
   {from:.21,at:.23,k:'Month 12',t:'When medicine continues',
    txt:'In SURMOUNT-4, people who continued tirzepatide lost a further 5.5% from week 36 to 88, vs +14.0% on placebo; 89.5% vs 16.6% kept at least 80% of their lead-in loss. [[Aronne2024SURMOUNT4]] In STEP 4, weight changed −7.9% with continued semaglutide vs +6.9% after switching to placebo, from week 20 to 68. [[Rubino2021STEP4]] Long-term use is a decision made with a clinician; see <a href="#sideeffects" data-go="sideeffects">Side effects, safety &amp; stopping</a>. Do not start, stop or change a medicine without a clinician.',
    pt:'For many people, these medicines work while they are taken, like other medicines for long-term conditions.',
    hook:'SURMOUNT-4: −5.5% further with tirzepatide vs +14.0% regain on placebo. [[Aronne2024SURMOUNT4]]'},
   {from:.28,at:.5,k:'Months 18–30',t:'Follow-up contact',
    txt:'In STOP Regain (people who had lost a mean 19.3 kg), 18-month regain was 2.5 kg face to face, 4.7 kg online and 4.9 kg with newsletters only. [[Wing2006STOPRegain]] In the Weight Loss Maintenance trial, regain at 30 months was 4.0 kg with monthly personal contact vs 5.5 kg self-directed. [[Svetkey2008WLM]] Across 45 trials, diet-plus-activity programmes reduced regain by 1.56 kg at 12 months. [[Dombrowski2014]] The 2013 guideline notes that even with contact every two months after year 1, regain averages 1–2 kg a year, but losses stay larger than with usual care. [[Jensen2014Guideline]]',
    pt:'Keeping in touch with a coach, nurse or group, in person or remotely, slows regain. It does not have to stop completely to be worth it.',
    hook:'Maintenance meta-analysis: −1.56 kg regain at 12 months with diet-plus-activity programmes. [[Dombrowski2014]]'},
   {from:.55,at:.66,k:'Ongoing',t:'Activity, sleep and mood',
    txt:'ACSM: after weight loss, maintenance is better with more than 250 min/week of activity in cross-sectional and prospective studies, but no well-designed trial shows it prevents regain. [[Donnelly2009ACSM]] In a 24-month trial in women, those who kept off 10% or more reported about 275 min/week. [[Jakicic2008]] Sleep extension helped people eat less in one trial. <span class="ev early">Early evidence</span> [[Tasali2022]] Obesity raised the odds of later depression (OR 1.55), and depression the odds of later obesity (OR 1.58). [[Luppino2010]] Addressing weight stigma and internalised bias is part of mental-health care. <span class="ev est">Established</span> [[Wu2018,Pearl2018WBI]]',
    pt:'Moving more, sleeping enough and getting help for low mood all support health, whatever happens to weight.',
    hook:'Activity matters more for maintenance and health than for initial loss. [[Thorogood2011,Donnelly2009ACSM]]'},
   {from:.8,at:1,k:'Year 5 and beyond',t:'Years on',
    txt:'In the National Weight Control Registry (2886 adults who had lost at least 13.6 kg and kept it off for a year), mean loss was 31.3 kg at entry, 23.8 kg at 5 years and 23.1 kg at 10 years; more than 87% were still at least 10% below their maximum. It is a self-selected group of successful maintainers, not a typical population. [[Thomas2014NWCR]] About 20% succeed at long-term maintenance defined as 10% kept off for a year. [[Wing2005AJCN]] Behavioural programmes still lowered cardiometabolic risk factors 5 years on despite regain. [[HartmannBoyce2023]]',
    pt:'Some weight often returns, yet health gains can last for years. Long-term care is normal for a long-term condition.',
    hook:'Registry: 31.3 kg lost at entry, 23.1 kg still off at 10 years (self-selected). [[Thomas2014NWCR]]'}
  ];
  const stopP=playWire(rg,$('#lvPlay'),draw,20000,'%t:player.replay%','living');
  const setStep=stepWire($('#lvSteps'),STEPS,rg,draw,stopP);
  lb.addEventListener('click',e=>{const b=e.target.closest('[data-ly]');if(!b)return;on[b.dataset.ly]=!on[b.dataset.ly];b.setAttribute('aria-pressed',on[b.dataset.ly]);draw(+rg.value)});
  function draw(t){
    vb(svg,'720 380','400 580');const N=NARROW(),p=phaseOf(STEPS,t),S=STEPS[p];setStep(p);
    const mo=MX*t;
    const L=N?{x:48,y:34,w:330,h:250}:{x:58,y:34,w:410,h:290};
    const ax=curveAxes(L.x,L.y,L.w,L.h,{x0:0,x1:MX,y0:-30,y1:100,xt:[0,12,24,36,48,60],yt:[-25,0,25,50,75,100],yfmt:v=>v+'%',xlabel:'months after weight loss',ylabel:'share of the lost weight regained'});
    let s=ax.svg;
    const X=ax.X,Y=ax.Y;
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${L.x+L.w-4}" y="${f1(Y(0)-5)}" class="t-xs t-end">no regain</text><text x="${L.x+L.w-4}" y="${f1(Y(100)+12)}" class="t-xs t-end">all regained</text>`;
    /* biology pushes back: an upward arrow, strongest at the start */
    const bio=1-ramp(t,.06,.16);
    if(bio>0){const bx=X(5),by0=Y(-5),by1=Y(40);
      s+=`<g style="opacity:${f1(bio)}"><path d="M${f1(bx)} ${f1(by0)}V${f1(by1)}" style="stroke:var(--agrp);stroke-width:4;fill:none" marker-end="url(#lvArr)"/>`+kitLabel(bx+8,by1+14,'hunger signals stay up')+kitLabel(bx+8,by1+27,'for a year or more')+`</g>`}
    const lbls=[];
    SER.forEach(Sr=>{
      const vis=Sr.ly==='reg'||on[Sr.ly];if(!vis)return;
      const P=[[0,0],[Sr.m,Sr.v]];
      const ln=plotLine(P,X,Y,{col:Sr.col,lw:2.6,dash:Sr.dash,upto:Math.min(mo,Sr.m)});s+=ln.svg;
      if(ln.end&&mo<Sr.m)s+=`<circle cx="${f1(ln.end[0])}" cy="${f1(ln.end[1])}" r="3.5" style="fill:${Sr.col}"/>`;
      if(mo>=Sr.m){const e=[X(Sr.m),Y(Sr.v)];s+=`<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="5" style="fill:${Sr.dash?'var(--panel)':Sr.col};stroke:${Sr.col};stroke-width:2.4"/>`;lbls.push([e[0]+8,e[1]+3.5,Sr.sh])}
    });
    lbls.forEach(l=>{s+=kitLabel(l[0],l[1],l[2])});
    /* the time cursor */
    const cx=X(mo);
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3;opacity:.5"/>`;
    s+=`<text x="${f1(Math.min(cx+4,L.x+L.w-50))}" y="${L.y+L.h-6}" class="t-xs" style="fill:var(--ink);font-weight:700">${mo<24?Math.round(mo)+' mo':f1(mo/12)+' y'}</text>`;
    /* supports stack */
    const K=N?{x:16,y:350,w:368,bh:34,g:6}:{x:500,y:56,w:206,bh:46,g:10};
    s+=`<text x="${K.x}" y="${K.y-12}" class="t-sm" style="fill:var(--ink);font-weight:700">Supports layered</text>`;
    LAYERS.forEach((Ly,i)=>{
      const reached=t>=Ly.from,act=reached&&on[Ly.id],yy=K.y+(LAYERS.length-1-i)*(K.bh+K.g);
      const grow=ramp(t,Ly.from,Ly.from+.05);
      s+=`<g style="opacity:${act?f1(.45+.55*grow):.3}"><rect x="${K.x}" y="${yy}" width="${K.w}" height="${K.bh}" rx="9" style="fill:var(--panel-2);stroke:${act?Ly.col:'var(--line)'};stroke-width:${act?2:1}"/>`;
      s+=`<rect x="${K.x}" y="${yy}" width="${f1(6+(K.w-6)*(act?grow:0)*.04)}" height="${K.bh}" rx="3" style="fill:${Ly.col}"/>`;
      s+=`<text x="${K.x+16}" y="${f1(yy+(N?K.bh/2+4.5:19))}" class="t-lbl">${Ly.b}</text>`;
      s+=N?`<text x="${K.x+K.w-10}" y="${f1(yy+K.bh/2+4)}" class="t-xs t-end">${Ly.ev}</text>`:`<text x="${K.x+16}" y="${f1(yy+35)}" class="t-xs">${Ly.ev}${on[Ly.id]?'':' · hidden'}</text>`;
      s+=`</g>`});
    s=`<defs>${marker('lvArr','var(--agrp)',5)}</defs>`+s;
    svg.innerHTML=s;
    note.innerHTML=noteHTML(S);
    rd.innerHTML=LAYERS.map(Ly=>`<li class="${on[Ly.id]?'':'off'}"><i style="background:${Ly.col}"></i><span><b>${Ly.b}.</b> ${Ly.say}</span></li>`).join('');
  }
  draw(+rg.value);

  /* ---------- domains of daily life ---------- */
  const DM=[
   {b:'Work',k:'Work',t:'Fair treatment at work',
    say:['Weight discrimination is common at work. Institutional forms, such as in employment, and interpersonal forms, such as name-calling, were sometimes more common than gender or race discrimination. [[Puhl2008Discrimination]]','The weight-specific quality-of-life questionnaire IWQOL-Lite has a Work scale among its five, a sign of how much work life matters. [[Kolotkin2001]]'],
    guide:['The 2020 consensus calls for clear policies that prohibit weight-based discrimination. [[Rubino2020Stigma]]']},
   {b:'Travel & transport',k:'Getting around',t:'Seats and seatbelts that fit',
    say:['In US fatal crashes 2003–2009, drivers of normal weight had 67% higher odds of wearing a seatbelt than drivers with the highest BMI (OR 1.67). Poor seatbelt fit is one practical reason seatbelt extenders matter. [[Jehle2014]]'],
    guide:['The consensus says suitable infrastructure for people with obesity should be a standard requirement for medical facilities (unanimous). [[Rubino2020Stigma]] Outside health care, asking for a seatbelt extender is a practical step.']},
   {b:'Clothing & equipment',k:'Things that fit',t:'The right cuff, chair and bed',
    say:['Kiosk blood pressure machines usually have a single cuff size that is too small for most US adults. [[Muntner2019]]','A cuff that is too small overestimates blood pressure, a common error in people with larger arms; the AHA lists large and extra-large adult cuffs, and a thigh cuff when the arm is larger than the largest cuff. [[Muntner2019]]','Ill-fitting clothes are one of the stigmatising framings in news images. [[Puhl2013Headless]]'],
    guide:['The consensus says suitable infrastructure for people with obesity should be a standard requirement for accrediting medical facilities (unanimous). [[Rubino2020Stigma]] See <a href="#nursing" data-go="nursing">Nursing care</a>.']},
   {b:'Relationships & intimacy',k:'Relationships',t:'Partners, family and friends',
    say:['IWQOL-Lite measures five areas: Physical Function, Self-Esteem, Sexual Life, Public Distress and Work, with scale reliability of 0.90–0.94. Sexual life and public distress are named parts of weight-related quality of life. [[Kolotkin2001]]','Stigma can come from close to home: among 361 adolescents at weight-loss camps, parents were among the perpetrators of weight-based teasing (37%). [[Puhl2013Bullying]]'],
    guide:['The AAP asks clinicians to address weight stigma and bullying at the visit and to model non-biased language for families. [[Pont2017AAP]] More in <a href="#stigma" data-go="stigma">Weight stigma &amp; bias</a>.']},
   {b:'Mental health',k:'Mood',t:'Mood and weight feed each other',
    say:['Obesity at baseline raised the odds of later depression (OR 1.55; 95% CI 1.22–1.98), and depression raised the odds of later obesity (OR 1.58; 95% CI 1.33–1.87). [[Luppino2010]]','Weight stigma and internalised weight bias are linked to depression, anxiety and disordered eating. <span class="ev est">Established</span> [[Wu2018,Pearl2018WBI]]'],
    guide:['Addressing stigma and internalised bias is part of mental-health care for people living with obesity. [[Wu2018,Pearl2018WBI]] Asking for help with mood is part of looking after health.']},
   {b:'Binge eating',k:'Eating',t:'Binge-eating disorder: screen, then refer',
    say:['Lifetime prevalence of BED in a US national survey was 3.5% in women and 2.0% in men; BED was associated with severe obesity, and only a minority ever sought treatment. [[Hudson2007]]','BEDS-7 is a brief screen that flags possible BED for full evaluation; it screens rather than diagnoses. [[Herman2016BEDS7]]'],
    guide:['Psychotherapy, mostly CBT, has large effects on binge episodes. [[Hilbert2019]] Lisdexamfetamine is labelled for moderate to severe BED in adults, "not indicated or recommended for weight loss". [[FDA-Vyvanse]] The screen below shows what a positive result means.']},
   {b:'Sleep',k:'Sleep',t:'Sleep and appetite',
    say:['Short sleep was linked to obesity in adults (pooled OR 1.55) in a meta-analysis of 634,511 people; causal inference is difficult. [[Cappuccio2008]]','Two days of restricted sleep in 12 young men lowered leptin by 18%, raised ghrelin by 28% and raised hunger by 24%. [[Spiegel2004]]'],
    guide:['In a trial in 80 adults who usually slept under 6.5 hours, sleep-hygiene counselling added about 1.2 hours a night and they ate 270 kcal a day less than controls. <span class="ev early">Early evidence</span> [[Tasali2022]]']}
  ];
  const db=$('#lvDmBtns'),dp=$('#lvDm');
  db.innerHTML=DM.map((d,i)=>`<button class="btn" data-dm="${i}" aria-pressed="${i===0}">${d.b}</button>`).join('');
  function drawDm(i){const d=DM[i];
    dp.innerHTML=`<div class="kicker">${d.k}</div><h4>${d.t}</h4><div class="kicker">What studies show</div><ul>${d.say.map(x=>`<li>${x}</li>`).join('')}</ul><div class="kicker">What guidelines and experts say</div><ul>${d.guide.map(x=>`<li>${x}</li>`).join('')}</ul>`}
  db.addEventListener('click',e=>{const b=e.target.closest('[data-dm]');if(!b)return;$$('[data-dm]',db).forEach(x=>x.setAttribute('aria-pressed',x===b));drawDm(+b.dataset.dm)});
  drawDm(0);

  /* ---------- BEDS-7: screening arithmetic ---------- */
  const bs=$('#lvBeds'),bn=$('#lvBNote'),sel=$('#lvPrev');
  const SENS=1,SPEC=.387;
  let shown=[0,0],stopB=null;
  function counts(pv){const tp=pv*SENS,fp=(1-pv)*(1-SPEC);return {tp,fp,tn:1-pv-fp,ppv:tp/(tp+fp)}}
  function drawB(u){
    vb(bs,'720 280','400 470');const N=NARROW(),pv=+sel.value,C=counts(pv);
    const tp=Math.round(lerp(shown[0],C.tp*100,u)),fp=Math.round(lerp(shown[1],C.fp*100,u));
    const ia=iconArray(N?62:40,N?20:26,{n:100,cols:10,size:N?24:19,gap:N?4:4,shape:'dot',groups:[{k:tp,col:'var(--hl)'},{k:fp,col:'var(--warn)'}],base:'var(--line)'});
    let s=ia.svg;
    const tx=N?24:300,ty=N?ia.h+56:44,lh=N?24:30;
    const rows=[['var(--hl)',`${f1(C.tp*1000).replace('.0','')} per 1000`,'have BED and are flagged'],['var(--warn)',`${Math.round(C.fp*1000)} per 1000`,'are flagged but do not have BED'],['var(--line)',`${Math.round(C.tn*1000)} per 1000`,'are not flagged']];
    rows.forEach((r,i)=>{const y=ty+i*lh*1.6;s+=`<circle cx="${tx+7}" cy="${y-4}" r="7" style="fill:${r[0]}"/><text x="${tx+22}" y="${y}" class="t-lbl">${r[1]}</text><text x="${tx+22}" y="${y+15}" class="t-xs">${r[2]}</text>`});
    const py=ty+3*lh*1.6+6;
    s+=`<text x="${tx}" y="${py}" class="t-big" style="fill:var(--life)">${Math.round(C.ppv*100)}%</text><text x="${tx+(N?56:62)}" y="${py}" class="t-sm" style="fill:var(--ink)">of people flagged have BED</text>`;
    s+=`<text x="${tx}" y="${py+18}" class="t-xs">each dot = 1 in 100 screened (rounded)</text>`;
    bs.innerHTML=s;
    bn.innerHTML=`<div class="kicker">Calculated here</div><h4>A positive screen means "look closer"</h4><div class="big-num">${Math.round(C.ppv*100)}%</div><p>At ${f1(pv*100)}% prevalence, about ${Math.round(C.ppv*100)} in 100 people who screen positive would have BED; the rest are flagged because specificity is 38.7%. Sensitivity of 100% means a negative screen rules BED out well in this arithmetic. [[Herman2016BEDS7]] That is why BEDS-7 leads to a full evaluation, not a diagnosis.</p><div class="pt"><b>In plain words</b>A positive screen is a reason to talk to a clinician, not a label. Binge-eating disorder is treatable, and talking therapies help most. [[Hilbert2019]]</div>`;
  }
  sel.addEventListener('change',()=>{if(stopB)stopB();const pv=+sel.value,C=counts(pv),from=shown.slice();
    stopB=animate(700,q=>{shown=from;drawB(ease(q))},()=>{stopB=null;shown=[C.tp*100,C.fp*100];drawB(0)})});
  {const C=counts(+sel.value);shown=[C.tp*100,C.fp*100];drawB(0)}
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawB(0)};
  const prevH=onHide.living;onHide.living=()=>{prevH&&prevH();if(stopB){stopB();stopB=null;const C=counts(+sel.value);shown=[C.tp*100,C.fp*100]}};
};
