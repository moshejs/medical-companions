/* =============== 4.2 Medicines =============== */
inits.meds=()=>{
  const svg=$('#meSvg'),rg=$('#meT'),note=$('#meNote'),read=$('#meRead');
  let track='pain';
  const CH={g:['var(--good-soft)','var(--good)'],w:['var(--warn-soft)','var(--warn)'],h:['var(--rx-soft)','var(--rx)'],m:['var(--panel-2)','var(--muted)'],b:['var(--bad-soft)','var(--bad)']};
  const chip=(x,y,l,c,anchorEnd)=>{const w=l.length*5.9+12,x0=anchorEnd?x-w:x,[bg,fg]=CH[c];
    return `<rect x="${f1(x0)}" y="${f1(y-11)}" width="${f1(w)}" height="15" rx="4" style="fill:${bg}"/><text x="${f1(x0+6)}" y="${f1(y)}" class="t-xs" style="fill:${fg};font-weight:600">${l}</text>`};
  const txt=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}" style="${st}">${s}</text>`;
  const bar=(x,y,w,v,max,col,lab,val)=>`${txt(x,y-4,lab,'t-xs')}<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*clamp(v/max))}" height="12" rx="3" style="fill:${col}"/>${txt(x+w*clamp(v/max)+5,y+10,val,'t-xs','fill:var(--ink);font-weight:600')}`;
  /* a vein in cross-section whose fill (blood volume) and calibre change */
  const vessel=(cx,cy,r,fill,lab)=>{let g=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r+5)}" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.4"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel)"/>`;
    const rr=rng(7),n=Math.round(10+fill*34);for(let i=0;i<n;i++){const a=rr()*6.283,d=Math.sqrt(rr())*(r-3);g+=`<circle cx="${f1(cx+Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d)}" r="2.2" style="fill:var(--blood);opacity:.8"/>`}
    return g+(lab?txt(cx,cy+r+20,lab,'t-xs t-mid'):'')};
  const hrStrip=(x,y,w,bpm,ph,lab)=>`<rect x="${f1(x)}" y="${f1(y-30)}" width="${f1(w)}" height="44" rx="6" style="fill:var(--panel);stroke:var(--line)"/>${pulse(x+4,y+6,w-8,30,{bpm,secs:5,phase:ph})}${txt(x+w,y-36,Math.round(bpm)+' bpm','t-lbl t-end','fill:var(--ink)')}${lab?txt(x,y-36,lab,'t-xs'):''}`;

  /* glyphs: g(x,y,w,h,f,t) draw inside a box; f = 0..1 progress within the rung */
  const R={
  pain:[
    {n:'Non-drug foundation',c:['Consensus','m'],g:(x,y,w,h,f)=>{let s=joint(x+70,y+h*.48,.62,{lax:.6,muscle:.2+.8*f});
      ['Physiotherapy','Occupational therapy','Braces, cushions, garments'].forEach((l,i)=>{const on=f>i*.25;s+=`<rect x="${f1(x+150)}" y="${f1(y+30+i*40)}" width="${f1(w-160)}" height="28" rx="8" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'}"/>`+txt(x+160,y+48+i*40,l,'t-sm',on?'fill:var(--ink)':'')});
      return s+txt(x+150,y+170,'OT and bracing: 70% improved','t-xs','fill:var(--rx)')+txt(x+150,y+184,'(98-person chart review)','t-xs')},
     k:'Rung 1 · pain',t:'Non-drug foundation',
     txt:`The international pain consensus groups management into physical therapy, medicines and "durable medical equipment such as cushions, compressive garments, and braces", treating both the cause (for example a dislocation) and the pain itself. Treatment studies "are few and insufficient to guide management". In a chart review of 98 people with EDS, occupational therapy and bracing were the most effective options, with 70% reporting improvement. [[Chopra2017,Song2020PainPhysician]]`,
     pt:`Exercise, therapy and supports come first. Medicines are added on top, not instead.`,
     hook:`Pain care in EDS targets the cause (dislocation, poor proprioception) as well as the pain. [[Chopra2017]]`},
    {n:'Simple analgesics, one at a time',c:['Expert opinion','m'],g:(x,y,w,h,f)=>{let s=txt(x,y+18,'ONE DRUG, LOW DOSE, THEN REASSESS','t-xs');
      for(let i=0;i<3;i++){const on=f>i*.3,xx=x+20+i*(w-40)/3;s+=`<rect x="${f1(xx)}" y="${f1(y+50)}" width="44" height="20" rx="10" style="fill:${on?'var(--rx)':'var(--panel-2)'};stroke:var(--line)"/><line x1="${f1(xx+22)}" x2="${f1(xx+22)}" y1="${f1(y+50)}" y2="${f1(y+70)}" style="stroke:var(--panel);stroke-width:1.4"/>`;
        if(f>i*.3+.15)s+=`<path d="M${f1(xx+8)} ${f1(y+96)}l8 8l16 -16" style="fill:none;stroke:var(--good);stroke-width:2.4"/>`+txt(xx+40,y+102,i<2?'review':'keep?','t-xs');
        if(i<2)s+=`<path d="M${f1(xx+52)} ${f1(y+60)}H${f1(xx+(w-40)/3-8)}" class="arrow" marker-end="url(#meArr)"/>`}
      return s+bar(x+10,y+150,w-90,92.4*ramp(f,0,.6),100,'var(--rx)','took medicines (79 people with hEDS)',(92.4*ramp(f,0,.6)).toFixed(1)+'%')},
     k:'Rung 2 · pain',t:'Simple analgesics, one at a time',
     txt:`A 2026 expert review found evidence for pain drugs in hypermobility "low-level", supporting no "disease-specific, repurposed, or novel drug". It advises one drug at a time, usually at a low dose, with benefit and side effects reassessed after a set trial. GeneReviews states that anti-inflammatory drugs may relieve joint pain in classical EDS. In 79 people with hEDS, 92.4% took medicines, mostly analgesics; heavier use went with more dysfunction, though the design cannot show which came first. The 2017 consensus's drug-by-drug advice is not reproduced here because its full text could not be read. [[Castori2026EOP,Malfait2024GR,Rombaut2011F]]`,
     pt:`Doctors usually try one painkiller at a time, at a low dose, and check whether it really helps before adding anything else.`,
     hook:`No drug has good trial evidence for EDS pain; try one at a time and reassess. [[Castori2026EOP]]`},
    {n:'Neuropathic agents',c:['Expert opinion','m'],g:(x,y,w,h,f)=>{let d='',s='';for(let i=0;i<=60;i++){const xx=x+10+(w-20)*i/60;d+=(i?'L':'M')+f1(xx)+' '+f1(y+60+Math.sin(i*.5)*8)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--nerve);stroke-width:3;opacity:.7"/>`;
      const n=Math.round(lerp(9,3,f));for(let i=0;i<n;i++){const u=((i/n)+f*.9)%1,xx=x+10+(w-20)*u;s+=`<circle cx="${f1(xx)}" cy="${f1(y+60+Math.sin(u*60*.5)*8)}" r="4" style="fill:var(--variant)"/>`}
      s+=txt(x+10,y+30,'pain signals damped (schematic)','t-xs');
      return s+bar(x+10,y+140,w-90,47*ramp(f,.2,.8),100,'var(--warn)','reported adverse effects (98-person review)',Math.round(47*ramp(f,.2,.8))+'%')},
     k:'Rung 3 · pain',t:'Neuropathic agents',
     txt:`GeneReviews describes chronic pain in hEDS as "often neuropathic in nature" and recommends "pain management tailored to cause and symptoms". It warns that autonomic and gut problems may limit choices: common analgesics in someone with slow gut transit, or vasodilators in someone with orthostatic intolerance. In a 98-person chart review, neuropathic modulators were the least well tolerated option, with 47% reporting adverse effects. [[Hakim2024GR,Song2020PainPhysician]]`,
     pt:`Some EDS pain comes from irritated nerves. Nerve-pain medicines help some people, but side effects are common.`,
     hook:`Neuropathic modulators: least tolerated, 47% adverse effects in one EDS chart review. [[Song2020PainPhysician]]`},
    {n:'Specialist pain service',c:['Consensus','m'],g:(x,y,w,h,f)=>{const cx=x+w/2,cy=y+h*.45,r=Math.min(w,h)*.33;let s=person(cx-9,cy-14,28,'var(--ink)');
      ['Physio','Psychology','Pain doctor','OT','Anaesthesia'].forEach((l,i)=>{const a=-Math.PI/2+i*2*Math.PI/5,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r*.8,on=f>i*.16;
        s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(px)}" y2="${f1(py)}" style="stroke:var(--rx);stroke-width:1.4;opacity:${on?.8:.12}"/><circle cx="${f1(px)}" cy="${f1(py)}" r="15" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};stroke:var(--rx)"/>`+txt(px,py+(py>cy?30:-20),l,'t-xs t-mid',on?'fill:var(--ink)':'')});
      return s},
     k:'Rung 4 · pain',t:'Specialist pain service',
     txt:`Multidisciplinary programmes combine physiotherapy with psychological approaches. A UK cognitive behavioural programme (87 people, 8 days over 6 weeks) improved self-efficacy, mood and pain at 1 month, though gains drifted by 5 months. For surgery, a 2026 Delphi panel recommends multimodal analgesia and regional anaesthesia in hEDS, and one team proposes opioid-free anaesthesia with lidocaine, ketamine and dexmedetomidine as opioid-sparing adjuncts <span class="ev early">Early evidence</span>. [[Rahman2014,Amaral2026,RamirezPaesano2023]]`,
     pt:`A pain team brings several kinds of help together: exercise, coping skills and careful use of medicines.`,
     hook:`Multimodal, opioid-sparing analgesia and regional techniques are the consensus for hEDS surgery. [[Amaral2026]]`},
    {n:'Opioids: cautions',c:['Observational','w'],g:(x,y,w,h,f)=>{const v=ramp(f,0,.7),bw=w-110;let s=txt(x,y+18,'OPIOID PRESCRIPTION CLAIMS, US 2005–2014','t-xs');
      s+=bar(x,y+50,bw,62*v,100,'var(--vas)','adults with EDS',(62*v).toFixed(0)+'%')+bar(x,y+82,bw,34.1*v,100,'var(--muted)','matched controls',(34.1*v).toFixed(1)+'%');
      s+=bar(x,y+124,bw,27.5*v,100,'var(--vas)','children with EDS',(27.5*v).toFixed(1)+'%')+bar(x,y+156,bw,13.5*v,100,'var(--muted)','matched controls',(13.5*v).toFixed(1)+'%');
      return s},
     k:'Rung 5 · pain',t:'Opioids: what is published',
     txt:`In US claims data, 62% of adults with EDS had an opioid prescription vs 34.1% of matched controls (children 27.5% vs 13.5%), and those with EDS had higher cumulative doses. After hip replacement, 14.8% of people with EDS who received opioids had a hip dislocation vs 2.1% of those who did not (OR 8.13), an association the authors caution against reading as cause and effect. One surgical team describes opioid-induced hyperalgesia and central sensitisation in hEDS. [[Schubart2019Opioid,Kelly2024THA,RamirezPaesano2023]]`,
     pt:`People with EDS are given strong opioid painkillers about twice as often as others. These carry real risks, so teams try other options first.`,
     hook:`EDS adults: opioid claims 62% vs 34.1% in controls (US claims). [[Schubart2019Opioid]]`}
  ],
  pots:[
    {n:'Fluids and salt',c:['HRS IIb','w'],g:(x,y,w,h,f)=>{let s=vessel(x+60,y+80,lerp(26,38,f),f,'blood volume (schematic)');
      s+=txt(x+130,y+40,'HRS 2015: 2–3 L water,','t-sm','fill:var(--ink)')+txt(x+130,y+56,'10–12 g sodium chloride/day','t-sm','fill:var(--ink)');
      s+=txt(x+130,y+84,'NIH 2019: 2–3 L water,','t-sm')+txt(x+130,y+100,'3–10 g sodium/day','t-sm');
      s+=txt(x+130,y+130,'note the different units','t-xs','fill:var(--warn)');
      return s+txt(x+10,y+178,'High-sodium diet raised plasma volume in a 6-day study','t-xs','fill:var(--rx)')},
     k:'POTS · step 1',t:'Fluids and salt',
     txt:`The heart rhythm society (HRS 2015, Class IIb, level E) says up to 2–3 L of water and 10–12 g of sodium chloride daily "may be considered". The NIH 2019 consensus recommends at least 2–3 L of water and 3–10 g of sodium a day, adding that the true benefit and best dose of salt loading need research. In a 6-day crossover study, high versus low sodium increased plasma volume and reduced the standing heart-rate rise, though standing heart rate stayed higher than in controls (117 vs 85). [[Sheldon2015,Vernino2021,Garland2021JACC]]`,
     pt:`Drinking more and, if your doctor agrees, eating more salt can raise blood volume so less blood pools in the legs.`,
     hook:`HRS gives grams of sodium chloride (10–12 g); NIH gives grams of sodium (3–10 g). [[Sheldon2015,Vernino2021]]`},
    {n:'Compression',c:['RCT crossover','g'],g:(x,y,w,h,f)=>{const L=[['none',109],['leg',103],['abdomen + thigh',97],['full',92]],k=Math.min(3,Math.floor(f*4));
      let s='';L.forEach(([l,v],i)=>{s+=bar(x+10,y+28+i*30,w-100,v-60,60,i<=k?'var(--rx)':'var(--panel-2)',l,i<=k?v+' bpm':'')});
      return s+hrStrip(x+10,y+180,w-20,L[k][1],f*4%1,'heart rate on tilt')},
     k:'POTS · step 2',t:'Compression',
     txt:`In a randomised crossover tilt study of 30 adults with POTS, compression lowered heart rate in a dose-dependent way: 109 beats/min with none, 103 leg-only, 97 abdomen and thigh, 92 full abdominal-leg compression (p<0.001), and symptoms improved. An abdominal-only garment lowered standing heart rate (103 vs 118) until it was taken off. [[Bourne2021JACC,Bourne2026CJC]]`,
     pt:`Tight garments over the tummy and legs stop blood pooling when you stand, so the heart does not have to race.`,
     hook:`Full abdominal-leg compression: tilt heart rate 109 → 92 bpm. [[Bourne2021JACC]]`},
    {n:'Reconditioning',c:['HRS IIa','g'],g:(x,y,w,h,f)=>{let s=tilt(x+80,y+90,1,lerp(0,70,ease(f)),{pool:f*.25});
      s+=txt(x+170,y+30,f<.5?'start lying or sitting:':'build towards upright','t-sm','fill:var(--ink)')+txt(x+170,y+46,f<.5?'rowing, recumbent bike, swimming':'over about 3 months','t-xs');
      return s+bar(x+170,y+90,w-250,9*ramp(f,.3,1),12,'var(--rx)','upright HR fall after 3 months','−'+Math.round(9*ramp(f,.3,1))+' bpm')+bar(x+170,y+130,w-250,53*ramp(f,.4,1),100,'var(--rx)','no longer met POTS criteria',Math.round(10*ramp(f,.4,1))+' of 19')},
     k:'POTS · step 3',t:'Reconditioning',
     txt:`A regular, structured and progressive exercise programme "can be effective" (HRS 2015, Class IIa), starting in non-upright forms such as a rowing machine, recumbent bike or swimming. After 3 months of training, upright heart rate fell by 9 beats/min and 10 of 19 people no longer met POTS criteria. In another trial, training improved SF-36 physical functioning from 33 to 50, while propranolol did not improve quality of life. [[Sheldon2015,Fu2010JACC,Fu2011Hypertension]]`,
     pt:`Exercise helps POTS, but start lying down or sitting (rowing, cycling on a recumbent bike, swimming) and build up slowly.`,
     hook:`3 months of training: 10 of 19 no longer met POTS criteria. [[Fu2010JACC]]`},
    {n:'Fludrocortisone · midodrine',c:['HRS IIb','w'],g:(x,y,w,h,f)=>{const a=f<.5,ff=a?f*2:(f-.5)*2;
      let s=vessel(x+70,y+80,a?lerp(26,34,ff):lerp(34,22,ff),a?.4+.4*ff:.8,a?'volume ↑ ?':'vessel tightens');
      s+=txt(x+150,y+30,a?'FLUDROCORTISONE':'MIDODRINE','t-sm','fill:var(--ink);font-weight:600');
      const L=a?['retains sodium; effect may last only 1–2 days','no RCT in POTS; no evidence it raises','blood volume; needs a high-sodium diet','label: Addison\'s disease, 0.1 mg daily']
               :['constricts blood vessels; short-acting,','dosed 3 times a day','boxed warning: supine hypertension','label: 10 mg 3×/day, daytime only'];
      L.forEach((l,i)=>s+=txt(x+150,y+52+i*18,l,'t-xs',i===L.length-1?'fill:var(--warn)':''));
      return s+chip(x+150,y+150,a?'Hypothesis: untested in POTS':'Early evidence',a?'h':'w')},
     k:'POTS · step 4',t:'Volume and vessel drugs',
     txt:`HRS 2015 says it "seems reasonable" to use fludrocortisone (Class IIb), but notes it has not been tested in randomised trials in POTS and its effect on plasma volume might last 1–2 days; the NIH adds there is no evidence it actually increases blood volume and that it needs a high-sodium diet with potassium monitored. Midodrine "may be considered" (Class IIb); it acts briefly and its label carries a boxed warning that it "can cause marked elevation of supine blood pressure", with 10 mg three times daily in daytime, not after the evening meal or within 4 hours of bedtime. [[Sheldon2015,Vernino2021,FDA-Fludrocortisone,FDA-Midodrine]]`,
     pt:`These medicines try to hold more fluid in the blood or tighten blood vessels. Neither is approved for POTS, and both need monitoring.`,
     hook:`Midodrine: boxed warning for supine hypertension; no dose after the evening meal. [[FDA-Midodrine]]`},
    {n:'Propranolol · ivabradine',c:['Small RCTs','w'],g:(x,y,w,h,f)=>{const bpm=lerp(118,100,ease(ramp(f,.1,.9)));
      let s=hrStrip(x+10,y+44,w-20,bpm,f*6%1,'peak tilt heart rate');
      s+=txt(x+10,y+92,'28 WOMEN WITH POTS, 4 WEEKS PER PHASE','t-xs');
      [['placebo',118,'var(--muted)'],['propranolol',100,'var(--rx)'],['ivabradine',99,'var(--accent)']].forEach(([l,v,c],i)=>{const vv=i?lerp(118,v,ramp(f,.2,.9)):118;s+=bar(x+10,y+112+i*30,w-80,vv-60,60,c,l,Math.round(vv)+' bpm')});
      return s},
     k:'POTS · step 5',t:'Slowing the heart',
     txt:`Low-dose propranolol "may be considered" (HRS 2015, Class IIb). In 54 people, 20 mg lowered heart rate and symptoms; 80 mg lowered heart rate more, but symptoms improved more with 20 mg: "less is more". Ivabradine lowered heart rate and improved physical and social functioning in 22 people with hyperadrenergic POTS. In a 2026 crossover trial, peak tilt heart rate was 99 on ivabradine, 100 on propranolol and 118 on placebo. The ivabradine label (heart failure) warns of fetal toxicity and advises effective contraception, which matters because most people with POTS are women of childbearing age. [[Sheldon2015,Raj2009Circ,Taub2021JACC,Uppal2026,FDA-Corlanor,Vernino2021]]`,
     pt:`Some heart medicines slow a racing heart. Small doses often work best. None is officially approved for POTS.`,
     hook:`Propranolol in POTS: 20 mg beat 80 mg for symptoms ("less is more"). [[Raj2009Circ]]`},
    {n:'Pyridostigmine',c:['HRS IIb','w'],g:(x,y,w,h,f)=>{const hr=f<.5?lerp(119,104,f*2):lerp(104,100,(f-.5)*2),hrs=f*4;
      let s=hrStrip(x+10,y+44,w-20,hr,f*6%1,'standing HR, '+hrs.toFixed(1)+' h after 30 mg');
      const X=v=>x+30+(w-60)*v/4,Y=v=>y+180-(v-95)*3;s+=`<line x1="${f1(X(0))}" x2="${f1(X(4))}" y1="${f1(Y(95))}" y2="${f1(Y(95))}" class="axis"/>`;
      let d='';[[0,119],[2,104],[4,100]].forEach(([a,b],i)=>{d+=(i?'L':'M')+f1(X(a))+' '+f1(Y(b));s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(b))}" r="3.5" style="fill:var(--rx)"/>`+txt(X(a),Y(b)-8,b,'t-xs t-mid','fill:var(--ink)')+txt(X(a),Y(95)+13,a+' h','t-xs t-mid')});
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2"/><circle cx="${f1(X(hrs))}" cy="${f1(Y(hr))}" r="5" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`;
      return s},
     k:'POTS · step 6',t:'Pyridostigmine',
     txt:`It "seems reasonable" to use pyridostigmine (HRS 2015, Class IIb). In 17 people, a single 30 mg dose cut standing heart rate from 119 to 104 at 2 hours and 100 at 4 hours, with no change in blood pressure. In a series of 203 people, 43% improved and 19% had gut side effects. In a 3-month factorial trial, adding pyridostigmine to propranolol or bisoprolol gave no clear extra benefit. Its label is for myasthenia gravis. [[Sheldon2015,Raj2005Circ,Kanjwal2011,Moon2018Neurotherapeutics,FDA-Mestinon]]`,
     pt:`This medicine boosts a nerve signal that slows the heart. It helps some people; stomach upset is a common side effect.`,
     hook:`There are no FDA-approved medicines for POTS; all of these are off-label. [[Vernino2021]]`}
  ],
  veds:[
    {n:'Confirm, plan, passport',c:['Consensus','m'],g:(x,y,w,h,f)=>{let s=`<rect x="${f1(x+20)}" y="${f1(y+20)}" width="190" height="120" rx="10" style="fill:var(--panel);stroke:var(--vas);stroke-width:1.6"/>`+zebra(x+50,y+50,16,{id:'meZb'});
      s+=txt(x+74,y+46,'vEDS EMERGENCY PASSPORT','t-xs','fill:var(--vas);font-weight:600')+txt(x+74,y+60,'COL3A1 variant confirmed','t-xs');
      ['Diagnosis & variant','Management plan','Emergency contacts','Avoid arteriography'].forEach((l,i)=>{if(f>i*.22)s+=txt(x+36,y+88+i*14,'✓ '+l,'t-xs','fill:var(--ink)')});
      s+=txt(x+230,y+40,'Sudden, unexplained','t-sm','fill:var(--ink)')+txt(x+230,y+56,'pain = urgent care','t-sm','fill:var(--ink)');
      return s+txt(x+230,y+84,'care centralised at','t-xs')+txt(x+230,y+98,'experienced centres','t-xs')},
     k:'vEDS · step 1',t:'Confirm, plan, carry a passport',
     txt:`The 2017 vEDS consensus recommends confirming the COL3A1 variant before applying the diagnosis, adapting lifestyle to minimise injury and rupture risk, building a care team, and carrying an individual emergency plan (a "vascular EDS passport"). GeneReviews advises a MedicAlert bracelet or emergency letter and immediate medical attention for sudden, unexplained pain. See <a href="#vascular" data-go="vascular">Vascular EDS</a>. [[Byers2017,Byers2025GR]]`,
     pt:`Carry a card or letter that says you have vascular EDS. Sudden, unexplained pain needs urgent hospital care.`,
     hook:`vEDS passport: diagnosis + plan, carried at all times; sudden unexplained pain = emergency. [[Byers2017,Byers2025GR]]`},
    {n:'Blood-pressure control',c:['Consensus','m'],g:(x,y,w,h,f)=>{const cx=x+100,cy=y+120,r=80,v=lerp(.85,.42,ease(f)),a=Math.PI*(1-v);
      let s='';[[0,.55,'var(--good)'],[.55,.75,'var(--warn)'],[.75,1,'var(--bad)']].forEach(([p,q,c])=>{const a0=Math.PI*(1-p),a1=Math.PI*(1-q);s+=`<path d="M${f1(cx+Math.cos(a0)*r)} ${f1(cy-Math.sin(a0)*r)}A${r} ${r} 0 0 1 ${f1(cx+Math.cos(a1)*r)} ${f1(cy-Math.sin(a1)*r)}" style="fill:none;stroke:${c};stroke-width:12;opacity:.7"/>`});
      s+=`<line x1="${cx}" y1="${cy}" x2="${f1(cx+Math.cos(a)*(r-16))}" y2="${f1(cy-Math.sin(a)*(r-16))}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="5" style="fill:var(--ink)"/>`;
      s+=txt(cx,cy+22,v<.55?'normal range':'raised','t-sm t-mid','fill:var(--ink)');
      return s+txt(x+200,y+60,'"maintain blood pressure in','t-sm','fill:var(--ink)')+txt(x+200,y+76,'the normal range and treat','t-sm','fill:var(--ink)')+txt(x+200,y+92,'hypertension aggressively"','t-sm','fill:var(--ink)')+txt(x+200,y+120,'2017 vEDS consensus','t-xs')},
     k:'vEDS · step 2',t:'Blood-pressure control',
     txt:`The consensus says to "maintain blood pressure in the normal range and treat hypertension aggressively", and GeneReviews advises regular blood-pressure monitoring so hypertension is treated early. In 1,780 people with heritable aortic disease genes, arterial events beyond the aorta were most common with COL3A1 (20.8% vs 1.5% with FBN1); the authors stress smoking cessation and blood-pressure control. [[Byers2017,Byers2025GR,CalderonMartinez2025]]`,
     pt:`Keeping blood pressure normal lowers the strain on fragile artery walls.`,
     hook:`vEDS: treat hypertension aggressively; arteries can rupture "even without significant dilation". [[Byers2017,Isselbacher2022]]`},
    {n:'Celiprolol',c:['Open RCT','g'],g:(x,y,w,h,f)=>{const X=m=>x+20+(w-40)*m/24,Y=d=>y+150-d*.28;let s=txt(x+20,y+18,'BBEST TITRATION: +100 mg EVERY 6 MONTHS','t-xs');
      let d='';[[0,100],[6,200],[12,300],[18,400]].forEach(([m,dz],i)=>{d+=(i?`L${f1(X(m))} ${f1(Y([0,100,200,300][i]))}`:`M${f1(X(m))} ${f1(Y(0))}`)+`L${f1(X(m))} ${f1(Y(dz))}`;if(f*24>=m)s+=txt(X(m)+4,Y(dz)-5,dz+' mg/day','t-xs','fill:var(--ink)')});
      d+=`L${f1(X(24))} ${f1(Y(400))}`;
      s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:3"/>`;
      s+=`<clipPath id="meClipC"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(20+(w-40)*f)}" height="${h}"/></clipPath><path d="${d}" clip-path="url(#meClipC)" style="fill:none;stroke:var(--rx);stroke-width:3"/>`;
      s+=`<line x1="${f1(X(0))}" x2="${f1(X(24))}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" class="axis"/>`+[0,6,12,18,24].map(m=>txt(X(m),Y(0)+13,m+' mo','t-xs t-mid')).join('');
      s+=artery(x+20,y+190,w-40,{r:9,media:6,thin:true,flow:f*3});
      return s+txt(x+w-20,y+40,'β1 blocker + β2 agonist','t-xs t-end','fill:var(--rx)')},
     k:'vEDS · step 3',t:'Celiprolol',
     txt:`Celiprolol is a β1-adrenoceptor antagonist with β2-agonist action, chosen to lower arterial wall stress without excessive vasodilation or heart-rate slowing <span class="ev hyp">Hypothesis</span> for the mechanism. In BBEST, it was given twice daily and uptitrated by 100 mg every 6 months to a maximum of 400 mg/day. Arterial rupture or dissection occurred in 20% vs 50% (HR 0.36). In a French cohort of 144 people, celiprolol users survived longer, best at 400 mg/day (observational). The 2022 ACC/AHA guideline notes the data were judged insufficient for FDA approval, and celiprolol has no FDA approval for any indication. [[Ong2010,Buso2024,Frank2019JACC,Isselbacher2022,openFDA-Celiprolol]]`,
     pt:`Celiprolol is a heart-and-artery medicine that lowered artery tears in one trial. It is not approved in the US and is not available in every country.`,
     hook:`BBEST: celiprolol 20% vs 50% arterial events, HR 0.36 (0.15–0.88); open-label, stopped early. [[Ong2010]]`},
    {n:'Adding an ARB',c:['Small RCT','w'],g:(x,y,w,h,f)=>{const v=ramp(f,0,.8);let s=txt(x+10,y+18,'ARCADE, 2 YEARS, ALL ON CELIPROLOL','t-xs');
      s+=bar(x+10,y+50,w-110,53.6*v,100,'var(--muted)','placebo (28)',(53.6*v).toFixed(1)+'%')+bar(x+10,y+88,w-110,27.6*v,100,'var(--rx)','irbesartan (29)',(27.6*v).toFixed(1)+'%');
      s+=txt(x+10,y+132,'arterial event or new/worse lesion on imaging','t-xs');
      return s+(f>.8?txt(x+10,y+160,'HR 0.42 (95% CI 0.17–0.99)','t-lbl','fill:var(--rx)'):'')},
     k:'vEDS · step 4',t:'Adding an ARB',
     txt:`In ARCADE, 57 adults already on celiprolol were randomised to irbesartan (150 mg/day titrated to 300 mg/day) or placebo for 2 years. The composite of arterial events or new or worsening lesions on imaging occurred in 27.6% vs 53.6% (HR 0.42, 95% CI 0.17–0.99). Blood pressure fell 5.4 mm Hg, but this did not explain the benefit; 11 hypotension episodes led to down-titration in 4 people. The 2022 ACC/AHA guideline, written before ARCADE, said there were no studies showing ARB benefit. <span class="ev early">Early evidence</span> one small trial, not yet replicated. [[Jeunemaitre2025,Isselbacher2022]]`,
     pt:`In one trial, adding a second blood-pressure medicine (irbesartan) to celiprolol halved new artery problems.`,
     hook:`ARCADE: irbesartan + celiprolol, 27.6% vs 53.6%, HR 0.42. [[Jeunemaitre2025]]`},
    {n:'Surveillance, avoid harm',c:['Consensus','m'],g:(x,y,w,h,f)=>{const X=yr=>x+20+(w-40)*yr/6;let s=txt(x+20,y+18,'IMAGING (ACC/AHA TYPICAL PROTOCOL)','t-xs');
      [['abnormal: yearly',[0,1,2,3,4,5,6],'var(--vas)',50],['normal: every 2 years',[0,2,4,6],'var(--rx)',90]].forEach(([l,ys,c,yy])=>{s+=txt(x+20,y+yy-10,l,'t-xs')+`<line x1="${f1(X(0))}" x2="${f1(X(6))}" y1="${f1(y+yy)}" y2="${f1(y+yy)}" class="axis"/>`;
        ys.forEach(v=>{if(v<=f*6+.01)s+=`<circle cx="${f1(X(v))}" cy="${f1(y+yy)}" r="6" style="fill:${c}"/>`})});
      [0,2,4,6].forEach(v=>s+=txt(X(v),y+112,'year '+v,'t-xs t-mid'));
      s+=`<rect x="${f1(x+20)}" y="${f1(y+132)}" width="${f1(w-40)}" height="46" rx="8" style="fill:var(--bad-soft)"/>`+txt(x+32,y+152,'✕ diagnostic arteriography (historical series: 67% complications)','t-xs','fill:var(--bad)')+txt(x+32,y+168,'✕ routine colonoscopy, elective surgery unless clearly needed','t-xs','fill:var(--bad)');
      return s},
     k:'vEDS · step 5',t:'Surveillance and avoiding harm',
     txt:`The consensus suggests imaging the arteries "if feasible on an annual basis"; the ACC/AHA describes baseline head-to-pelvis CT or MR, then yearly imaging of abnormal segments or every 2 years if normal, while stating the right interval is uncertain; European centres differ. GeneReviews discourages arteriography except to locate life-threatening bleeding before surgery (one historical series reported 67% complications), and advises avoiding routine colonoscopy and elective surgery unless the benefit is substantial. [[Byers2017,Isselbacher2022,vanDeLaar2022,Byers2025GR,Cikrit1987]]`,
     pt:`Regular scans watch the arteries. Tests that put a tube inside an artery are avoided unless they are needed to save a life.`,
     hook:`vEDS: avoid diagnostic arteriography (67% complications in a historical series). [[Cikrit1987,Byers2025GR]]`}
  ]};
  const ST={};const SA={};
  ['pain','pots','veds'].forEach(k=>{const n=R[k].length;ST[k]=R[k].map((r,i)=>({from:i/n,at:(i+.55)/n,k:r.k,t:r.t,txt:r.txt,pt:r.pt,hook:r.hook}));
    const el=$('#meSteps'+k[0].toUpperCase()+k.slice(1));SA[k]=stepWire(el,ST[k],rg,t=>{if(track!==k)setTrack(k);draw(t)},()=>stop())});

  function draw(t){
    const N=vb(svg,'720 380','400 640');const rungs=R[track],n=rungs.length,pos=clamp(t*n,0,n-.0001),i=Math.floor(pos),f=pos-i;
    const L=N?{lx0:30,lx1:370,ly0:300,ly1:28,gx:20,gy:340,gw:360,gh:290}:{lx0:30,lx1:300,ly0:352,ly1:30,gx:330,gy:20,gw:378,gh:340};
    let s=`<defs>${marker('meArr','var(--muted)')}</defs>`;
    const sp=(L.ly0-L.ly1)/n,ry=k=>L.ly0-(k+.5)*sp;
    s+=`<line x1="${L.lx0}" x2="${L.lx0}" y1="${L.ly1-8}" y2="${L.ly0+8}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round"/><line x1="${L.lx1}" x2="${L.lx1}" y1="${L.ly1-8}" y2="${L.ly0+8}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round"/>`;
    rungs.forEach((r,k)=>{const y=ry(k)+sp*.3,cur=k===i,past=k<i;
      s+=`<line x1="${L.lx0}" x2="${L.lx1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${cur?'var(--rx)':past?'var(--ink)':'var(--line)'};stroke-width:${cur?5:3};stroke-linecap:round"/>`;
      s+=txt(L.lx0+12,y-8,(k+1)+'. '+r.n,cur?'t-lbl':'t-sm',cur?'fill:var(--rx)':past?'fill:var(--ink)':'');
      s+=chip(L.lx1-8,y+18,r.c[0],r.c[1],true)});
    const my=lerp(ry(i)+sp*.3,ry(Math.min(n-1,i+1))+sp*.3,i<n-1?ease(ramp(f,.85,1)):0);
    s+=`<circle cx="${L.lx0}" cy="${f1(my)}" r="8" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`;
    /* glyph panel */
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="${L.gh}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=txt(L.gx+14,L.gy+26,rungs[i].n,'t-big')+chip(L.gx+L.gw-12,L.gy+24,rungs[i].c[0],rungs[i].c[1],true);
    const k=N?1:1.12,dy=N?52:62;s+=`<g transform="translate(${L.gx+14} ${L.gy+dy}) scale(${k})">${rungs[i].g(0,0,(L.gw-28)/k,(L.gh-dy-10)/k,f)}</g>`;
    svg.innerHTML=s;
    const st=ST[track],ph=phaseOf(st,t);note.innerHTML=noteHTML(st[ph]);SA[track](ph);
    read.innerHTML=`<span>Ladder <b>${{pain:'Pain',pots:'POTS',veds:'Vascular EDS'}[track]}</b></span><span>Rung <b>${i+1} of ${n}</b></span><span>Evidence <b>${rungs[i].c[0]}</b></span>`;
  }
  function setTrack(k){track=k;$$('[data-metr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.metr===k));
    ['Pain','Pots','Veds'].forEach(x=>$('#meSteps'+x).hidden=x.toLowerCase()!==k)}
  const stop=playWire(rg,$('#mePlay'),draw,11000,'%t:player.replay%','meds');
  $$('[data-metr]').forEach(b=>b.addEventListener('click',()=>{stop();setTrack(b.dataset.metr);rg.value=.1;draw(.1)}));
  draw(+rg.value);

  /* ---------- icon array: BBEST / ARCADE ---------- */
  const bsvg=$('#meBb'),brg=$('#meBbT'),bnote=$('#meBbNote');
  const TRI={
    bbest:{mo:47,arms:[{l:'Celiprolol',n:25,e:5,c:'var(--rx)'},{l:'No treatment',n:28,e:14,c:'var(--muted)'}],hr:'HR 0.36 (95% CI 0.15–0.88), p=0.040',
      note:{k:'BBEST · Lancet 2010',t:'Celiprolol: 20% vs 50%',
        txt:`53 people with clinical vEDS (25 celiprolol, 28 untreated), at 8 centres in France and 1 in Belgium. Arterial rupture or dissection, fatal or not: 5 of 25 vs 14 of 28 over a mean 47 months (HR 0.36, 95% CI 0.15–0.88). Limitations: open-label (no placebo), small, only 33 of 53 had a confirmed COL3A1 variant, and stopped early for benefit, which can exaggerate an effect. Side effects: severe fatigue in 1 person, mild fatigue in 2 during uptitration. A placebo-controlled phase 3 trial, DiSCOVER (NCT05432466), is recruiting. [[Ong2010,NCT00190411,NCT05432466]]`,
        pt:`Fewer people on celiprolol had an artery tear. But the trial was small and everyone knew who was getting the medicine.`,
        hook:`BBEST limitations: open, 53 patients (33 COL3A1-confirmed), stopped early. [[Ong2010]]`}},
    arcade:{mo:24,arms:[{l:'Irbesartan',n:29,e:8,c:'var(--rx)'},{l:'Placebo',n:28,e:15,c:'var(--muted)'}],hr:'HR 0.42 (95% CI 0.17–0.99)',
      note:{k:'ARCADE · Circulation 2025',t:'Irbesartan on top of celiprolol: 27.6% vs 53.6%',
        txt:`Double-blind and placebo-controlled: 57 adults with vEDS on stable celiprolol, randomised to irbesartan (150 mg/day titrated to 300 mg/day) or placebo for 2 years. The composite outcome counted symptomatic arterial events and new or worsening lesions on systematic imaging: 8 of 29 vs 15 of 28 (HR 0.42, 95% CI 0.17–0.99). The upper limit of the interval is close to 1, the trial is small, and it is not yet replicated. [[Jeunemaitre2025,NCT02597361]]`,
        pt:`Adding irbesartan to celiprolol roughly halved new artery problems found by symptoms or scans, in one small trial.`,
        hook:`ARCADE's outcome includes imaging findings, so it is not directly comparable with BBEST's clinical events. [[Jeunemaitre2025,Ong2010]]`}}};
  let tri='bbest';
  function drawBb(t){
    const N=vb(bsvg,'720 330','400 560'),T=TRI[tri],m=t*T.mo;let s='';
    const cols=8,sz=N?24:26,gx=N?40:40,gy=N?40:40;
    T.arms.forEach((a,ai)=>{const ox=N?20:(ai?380:30),oy=N?(ai?212:24):24,rr=rng(ai?31:17);
      const times=[];for(let k=0;k<a.e;k++)times.push(T.mo*(k+.5+ (rr()-.5)*.6)/a.e);
      const pick=[];const r2=rng(ai?5:9);while(pick.length<a.e){const p=Math.floor(r2()*a.n);if(!pick.includes(p))pick.push(p)}
      let cnt=0;
      s+=txt(ox,oy+12,a.l.toUpperCase()+' · '+a.n,'t-sm','fill:var(--ink);font-weight:600');
      for(let p=0;p<a.n;p++){const ev=pick.indexOf(p),hit=ev>=0&&times[ev]<=m;if(hit)cnt++;
        const px=ox+(p%cols)*gx+6,py=oy+24+Math.floor(p/cols)*gy;
        s+=person(px,py,sz,hit?'var(--vas)':a.c,{op:hit?1:.75});if(hit)s+=`<circle cx="${f1(px+sz*.42)}" cy="${f1(py+4)}" r="4" style="fill:var(--vas);stroke:var(--panel)"/>`}
      s+=txt(N?380:ox+cols*gx-14,oy+12,`${cnt} event${cnt===1?'':'s'} · ${Math.round(cnt/a.n*100)}%`,'t-lbl t-end',`fill:${cnt?'var(--vas)':'var(--muted)'}`);
      a._cnt=cnt});
    /* cumulative chart */
    const cy0=N?410:208,ch=N?66:76,cx0=N?40:60,cx1=N?380:660;
    const X=v=>cx0+(cx1-cx0)*v/T.mo,Y=v=>cy0+ch-ch*v/60;
    s+=`<line x1="${cx0}" x2="${cx1}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" class="axis"/>`;
    [0,25,50].forEach(v=>s+=`<line x1="${cx0}" x2="${cx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+txt(cx0-5,Y(v)+3,v+'%','t-xs t-end'));
    T.arms.forEach(a=>{const fin=a.e/a.n*100;s+=`<path d="${pathFn(u=>clamp(u*T.mo<=m?u*fin/60:m/T.mo*fin/60),cx0,cx1,Y(0),Y(60),60)}" style="fill:none;stroke:${a.c};stroke-width:2.4"/>`;
      if(m>=T.mo*.98)s+=txt(cx1+(N?-2:4),Y(fin)+(N?-6:4),fin.toFixed(N?0:1)+'%',N?'t-xs t-end':'t-xs','fill:var(--ink)')});
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${f1(Y(60))}" y2="${f1(Y(0))}" style="stroke:var(--ink);opacity:.5"/>`;
    s+=txt(cx0,Y(0)+14,'0','t-xs t-mid')+txt(cx1,Y(0)+14,T.mo+' months','t-xs t-end')+txt(X(m),Y(60)-4,'month '+Math.round(m),'t-xs t-mid','fill:var(--ink)');
    if(m>=T.mo*.98)s+=txt((cx0+cx1)/2,Y(0)+28,T.hr,'t-sm t-mid','fill:var(--rx);font-weight:600');
    bsvg.innerHTML=s;bnote.innerHTML=noteHTML(T.note)}
  playWire(brg,$('#meBbPlay'),drawBb,7000,'%t:player.replay%','meds');
  $$('[data-mebb]').forEach(b=>b.addEventListener('click',()=>{tri=b.dataset.mebb;$$('[data-mebb]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawBb(+brg.value)}));
  drawBb(+brg.value);
};
