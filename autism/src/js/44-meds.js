/* =============== 4.4 Medication =============== */
/* Two 8-week placebo-controlled trials. End points are published; curve shapes between week 0 and 8 are drawn. */
const ME_D={
 ris:{name:'Risperidone',short:'RIS',trial:'RUPP 2002 · 101 children, 5–17 y · 8 weeks',
  unit:'%',yMax:70,yStep:20,yLab:'ABC-Irritability, % fall from baseline',
  lines:[{v:-56.9,l:'risperidone −56.9%',main:1}],plac:-14.1,placL:'placebo −14.1%',
  wMax:3,w:[{v:2.7,l:'+2.7 kg',main:1}],wP:.8,wPL:'+0.8 kg',
  ae:{h:'Side effects, % of children (label, autism trials)',rows:[['Sedation',63,15],['More appetite',44,15],['Fatigue',31,9],['Drooling',12,4],['Parkinsonism',8,1]],src:'[[FDA-Risperdal]]'},
  icons:{h:'Responders at week 8',sub:'≥25% fall in irritability and CGI-I much or very much improved',d:[34,49],p:[6,52],src:'[[McCracken2002]]'},
  rel:{h:'After 6 months: relapse when the medicine is stopped',d:12.5,p:62.5,dl:'kept on risperidone',pl:'switched to placebo',src:'[[RUPP2005Risperidone]]'},
  cap:'Risperidone data: RUPP Autism Network trial and its 6-month extension; side effects from the US label. [[McCracken2002,RUPP2005Risperidone,FDA-Risperdal]]'},
 ari:{name:'Aripiprazole',short:'ARI',trial:'Marcus 2009 · fixed dose · 218 children, 6–17 y · 8 weeks',
  unit:' pts',yMax:16,yStep:4,yLab:'ABC-Irritability, points fallen',
  lines:[{v:-14.4,l:'15 mg −14.4',main:1},{v:-13.2,l:'10 mg −13.2'},{v:-12.4,l:'5 mg −12.4'}],plac:-8.4,placL:'placebo −8.4',
  wMax:3,w:[{v:1.5,l:'15 mg +1.5 kg',main:1},{v:1.3,l:''}],wP:.3,wPL:'+0.3 kg',
  ae:{h:'Side effects, % of children (Owen 2009, flexible dose)',rows:[['Extrapyramidal',14.9,8.0],['Stopped: side effects',10.6,5.9]],src:'[[Owen2009]]'},
  icons:{h:'Extrapyramidal side effects per 100',sub:'movement side effects such as tremor or stiffness, Owen 2009',d:[15,100],p:[8,100],src:'[[Owen2009]]'},
  rel:{h:'Maintenance: relapse over 16 weeks after stabilising',d:35,p:52,dl:'kept on aripiprazole',pl:'switched to placebo',src:'[[Findling2014]]',ns:1},
  cap:'The thin lines are the 5 and 10 mg arms (−12.4 and −13.2 points). Aripiprazole data: the fixed-dose trial for irritability and weight; the flexible-dose trial for side effects; the maintenance trial for relapse. [[Marcus2009,Owen2009,Findling2014]]'}
};
const ME_STEPS={
 ris:[
  {from:0,at:.02,k:'Week 0 · who took part',t:'Severe irritability',
   txt:`The RUPP Autism Network randomised 101 children aged 5–17 with autistic disorder and severe tantrums, aggression or self-injury: 49 to risperidone (0.5–3.5 mg/day) and 52 to placebo, for 8 weeks. Irritability was rated on the Aberrant Behavior Checklist. The target was the behaviour, not autism. [[McCracken2002]]`,
   pt:`This trial was for children whose outbursts or self-injury were serious enough to hurt them or others. It did not try to change autism.`},
  {from:.08,at:.24,k:'Weeks 1–4',t:'The curves part',
   txt:`Both groups improve a little at first: families and raters expect change, and placebo responses in autism trials are large. The risperidone curve keeps falling while the placebo curve levels off. On the right the brain tints as the medicine takes effect; appetite and sleepiness begin to show. [[McCracken2002,Siafis2020]]`,
   hook:`A placebo arm is essential: about 1 in 5 participants on placebo in autism drug trials is rated "much improved". [[Siafis2020]]`},
  {from:.42,at:.56,k:'Week 8 · the result',t:'Irritability down, weight up',
   txt:`ABC-Irritability fell 56.9% on risperidone and 14.1% on placebo (P<0.001). Weight rose 2.7 ± 2.9 kg vs 0.8 ± 2.2 kg in 8 weeks (P<0.001). Increased appetite, fatigue, drowsiness, dizziness and drooling were more common on risperidone. [[McCracken2002]]`,
   pt:`The medicine calmed severe outbursts much more than the dummy pill, but children put on weight quickly.`,
   hook:`RUPP 2002: irritability −56.9% vs −14.1%; weight +2.7 vs +0.8 kg in 8 weeks. [[McCracken2002]]`},
  {from:.62,at:.68,k:'Side effects',t:'What it costs',
   txt:`Across the label's paediatric autism trials (risperidone n=107, placebo n=115), sedation affected 63% vs 15%, increased appetite 44% vs 15%, fatigue 31% vs 9%, drooling 12% vs 4% and parkinsonism 8% vs 1%. Prolactin was raised in 49% vs 2%. [[FDA-Risperdal]]`,
   hook:`Risperidone's commonest paediatric side effect is sedation (63% vs 15%); it raises prolactin (49% vs 2%). [[FDA-Risperdal]]`},
  {from:.74,at:.8,k:'Week 8 · who responded',t:'Responders',
   txt:`A positive response meant at least a 25% fall in irritability and a clinician rating of "much" or "very much improved": 69% (34 of 49) on risperidone vs 12% (6 of 52) on placebo. In two thirds of responders (23 of 34), benefit was maintained at 6 months. [[McCracken2002]]`,
   pt:`About 7 in 10 children improved clearly on the medicine, and about 1 in 10 on the dummy pill. Not everyone responds.`},
  {from:.87,at:.95,k:'Months 4–6 and after',t:'Stopping or continuing',
   txt:`In the extension, 63 responders took open-label risperidone for 16 more weeks and gained a mean 5.1 kg. In a blinded discontinuation, relapse was 62.5% with a gradual switch to placebo vs 12.5% on continued risperidone. A Dutch study found relapse in 8 of 12 switched to placebo vs 3 of 12 who stayed on it. NICE advises review at 3–4 weeks, stopping if there is no meaningful response by 6 weeks, and the minimum effective dose. [[RUPP2005Risperidone,Troost2005,Kendall2013]]`,
   pt:`If the medicine helps, stopping it often brings the outbursts back. If it does not help within about 6 weeks, it should usually be stopped.`,
   hook:`Relapse after stopping risperidone: 62.5% (placebo) vs 12.5% (continued). [[RUPP2005Risperidone]]`}],
 ari:[
  {from:0,at:.02,k:'Week 0 · who took part',t:'Two trials, two designs',
   txt:`Aripiprazole was tested in a fixed-dose trial (218 children aged 6–17 randomised to 5, 10 or 15 mg/day or placebo) and a flexible-dose trial (98 children: 47 aripiprazole, 51 placebo). Both lasted 8 weeks and both targeted irritability. The US label covers ages 6–17. [[Marcus2009,Owen2009,FDA-Abilify]]`,
   pt:`Like risperidone, this medicine was tested for serious outbursts and self-injury, not for autism itself.`},
  {from:.08,at:.24,k:'Weeks 1–4',t:'Early separation',
   txt:`In the flexible-dose trial, ABC-Irritability improved more on aripiprazole from week 1 through week 8. Placebo improved too. [[Owen2009]]`,
   hook:`Aripiprazole separated from placebo from week 1 in the flexible-dose trial. [[Owen2009]]`},
  {from:.42,at:.56,k:'Week 8 · the result',t:'Every dose beat placebo',
   txt:`ABC-Irritability fell 12.4 points on 5 mg, 13.2 on 10 mg and 14.4 on 15 mg vs 8.4 on placebo (all p<.05). Weight changed +1.3, +1.3 and +1.5 kg vs +0.3 kg. In the flexible-dose trial weight rose 2.0 vs 0.8 kg. A Cochrane review of the two trials (316 children) found a mean difference of −6.17 points on ABC-Irritability (95% CI −9.07 to −3.26), moderate-quality evidence. [[Marcus2009,Owen2009,Hirsch2016]]`,
   pt:`All three doses calmed outbursts more than the dummy pill. Weight went up, but less than with risperidone in these trials.`,
   hook:`Aripiprazole vs placebo, Cochrane: ABC-I −6.17 points; weight +1.13 kg. All included trials were industry-supported. [[Hirsch2016]]`},
  {from:.62,at:.68,k:'Side effects',t:'What it costs',
   txt:`In the flexible-dose trial, 10.6% stopped for side effects vs 5.9%, and extrapyramidal (movement) events affected 14.9% vs 8.0%. In the fixed-dose trial sedation was the commonest reason to stop. Cochrane: sedation RR 4.28, tremor RR 10.26. Unlike risperidone, aripiprazole tends to lower prolactin. [[Owen2009,Marcus2009,Hirsch2016,FDA-Abilify]]`,
   hook:`Risperidone raises prolactin; aripiprazole tends to lower it. [[FDA-Risperdal,FDA-Abilify]]`},
  {from:.74,at:.8,k:'Movement side effects',t:'Per 100 children',
   txt:`Seen as icons, extrapyramidal events were about 15 in 100 children on aripiprazole and 8 in 100 on placebo. These include tremor and stiffness, and they are one reason the labels ask for monitoring. [[Owen2009,FDA-Abilify]]`,
   pt:`Some children get shaky or stiff on this medicine. Doctors watch for it and can lower the dose or stop.`},
  {from:.87,at:.95,k:'Months 3–7',t:'Is maintenance needed?',
   txt:`85 stabilised children were randomised to stay on aripiprazole or switch to placebo for 16 weeks. Relapse was 35% vs 52% (HR 0.57, 95% CI 0.28 to 1.12; P=.097, not significant; NNT 6). The authors advise periodic reassessment, and the label states maintenance efficacy "was not established". In a 52-week open-label study, 60.3% completed a year and BMI z-score rose by 0.31. [[Findling2014,FDA-Abilify,Marcus2011]]`,
   pt:`After a few months, it is worth checking whether the medicine is still needed.`,
   hook:`Abilify label: maintenance efficacy for autism irritability "was not established". [[FDA-Abilify]]`}]
};
const ME_CMP=[
 {id:'mph',name:'Methylphenidate',tag:'ADHD symptoms',tc:'accent',
  bars:[['Responders',49],['Stopped: side effects',18]],unit:'%',single:1,
  front:`RUPP crossover trial, 72 children aged 5–14 with hyperactivity: 49% (35/72) responded; effect sizes 0.20–0.54 by dose and rater. [[RUPP2005Methylphenidate]]`,
  back:[`Response was smaller and side effects more frequent than in typically developing children with ADHD; side effects ended the study drug in 18% (13/72). [[RUPP2005Methylphenidate]]`,
   `Cochrane (4 trials, 113 children): high-dose methylphenidate improved teacher-rated hyperactivity (SMD −0.78), low-quality evidence; reduced appetite RR 8.28. [[Sturman2017]]`,
   `No evidence that it worsens or improves the core features of autism. [[Sturman2017]]`]},
 {id:'atx',name:'Atomoxetine',tag:'ADHD symptoms',tc:'accent',
  bars:[['ADHD-RS fall, drug',9.1],['ADHD-RS fall, placebo',.3]],unit:' pts',max:12,
  front:`8 weeks, 97 children aged 6–17 with autism and ADHD: ADHD-RS fell from 40.7 to 31.6 vs 38.6 to 38.3 on placebo (difference −6.7; p<.001). [[Harfterkamp2012]]`,
  back:[`Clinician-rated "much improved" did not differ significantly: 20.9% vs 8.7%. Adverse events: 81.3% vs 65.3%. [[Harfterkamp2012]]`,
   `In a 2×2 trial (128 children), atomoxetine, atomoxetine plus parent training, and parent training alone each beat placebo on ADHD symptoms (effect sizes 0.57–0.98). [[Handen2015]]`]},
 {id:'gfc',name:'Guanfacine (extended release)',tag:'Hyperactivity',tc:'accent',
  bars:[['Responders, drug',50],['Responders, placebo',9.4]],unit:'%',
  front:`8 weeks, 62 children (mean age 8.5): ABC-Hyperactivity fell 43.6% (34.2 to 19.3) vs 13.2% on placebo; responders 50% (15/30) vs 9.4% (3/32). [[Scahill2015]]`,
  back:[`Common side effects: drowsiness, fatigue and decreased appetite. [[Scahill2015]]`,
   `Blood pressure fell in the first 4 weeks and returned nearly to baseline by week 8. [[Scahill2015]]`,
   `ADHD medicines as a group also reduced irritability, though less than antipsychotics (SMD 0.471 vs 1.028). [[SalazarDePablo2023]]`]},
 {id:'mel',name:'Melatonin (prolonged release)',tag:'Sleep',tc:'rx',
  bars:[['Extra sleep, drug',57.5],['Extra sleep, placebo',9.1]],unit:' min',max:70,
  front:`13 weeks, 125 children aged 2–17.5 whose sleep had not improved with behavioural steps alone: total sleep rose 57.5 vs 9.14 min (adjusted difference 32.43 min). [[Gringras2017]]`,
  back:[`Behavioural strategies come first; melatonin is offered if they have not helped. [[WilliamsBuckley2020]] Clinically meaningful response 68.9% vs 39.3%; sleep latency fell 39.6 vs 12.5 min; somnolence was more common. [[Gringras2017]]`,
   `Open-label to 52 weeks: 62.08 min more sleep than baseline. Over 104 weeks, growth, BMI and puberty stayed within normal ranges. [[Maras2018,Malow2021]]`,
   `A meta-analysis found melatonin did not reduce night-time awakenings. [[Rossignol2011]] The AAN advises counselling about the lack of long-term safety data. [[WilliamsBuckley2020]]`]},
 {id:'cit',name:'Citalopram (an SSRI)',tag:'Repetitive behaviour',tc:'bad',
  bars:[['Response, drug',32.9],['Response, placebo',34.2]],unit:'%',
  front:`STAART trial, 149 children aged 5–17 with high levels of repetitive behaviour, 12 weeks: response 32.9% vs 34.2% on placebo (RR 0.96). No benefit. [[King2009F]]`,
  back:[`Side effects were more likely on citalopram: increased energy, impulsiveness, hyperactivity, stereotypy, diarrhoea and insomnia. [[King2009F]]`,
   `Cochrane (9 trials): "There is no evidence of effect of SSRIs in children and emerging evidence of harm." [[Williams2013SSRI]]`,
   `Repetitive behaviour is a core feature of autism; anxiety or depression in an autistic person is a separate question. [[Pilling2012]]`]}
];
const ME_SMD=[['Aripiprazole',1.179],['Risperidone',1.074],['Antipsychotics (class)',1.028],['ADHD medicines',.471]];
const ME_USE=[['Any psychotropic',64],['2+ classes at once',35],['3+ classes at once',15]];

inits.meds=()=>{
  const svg=$('#meSvg'),rg=$('#meT');let drug=store.get('meDrug','ris');if(!ME_D[drug])drug='ris';
  const shape=w=>(1-Math.exp(-w/2.1))/(1-Math.exp(-8/2.1));            /* drawn path, reaches 1 at week 8 */
  const wshape=w=>w/8;                                                    /* weight: roughly linear in 8 weeks */
  function icons(x,y,n,k,col,per,sz){let g='';for(let i=0;i<n;i++){const cx=x+(i%per)*sz,cy=y+Math.floor(i/per)*(sz*1.25);g+=person(cx,cy,sz*.95,i<k?col:'var(--line)')}return g}
  function draw(t){
    const N=vb(svg,'720 380','400 760'),D=ME_D[drug],S=ME_STEPS[drug],p=phaseOf(S,t),w=8*ramp(t,.03,.56);
    const L=N?{x0:48,x1:380,c0:44,c1:220,wy0:268,wy1:350,px:8,py:384,pw:384,ph:368}
             :{x0:58,x1:420,c0:40,c1:196,wy0:240,wy1:330,px:446,py:14,pw:262,ph:354};
    const X=v=>lerp(L.x0,L.x1,v/8),Y=v=>lerp(L.c0,L.c1,Math.abs(v)/D.yMax),WY=v=>lerp(L.wy1,L.wy0,v/D.wMax);
    let s=`<defs>${marker('meArr','var(--muted)')}</defs>`;
    s+=`<text x="${L.x0-40}" y="${L.c0-20}" class="t-sm">${D.yLab}</text>`;
    for(let v=0;v<=D.yMax+1e-9;v+=D.yStep){s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v?'−'+v:'0'}${D.unit==='%'?'%':''}</text>`}
    for(let k=0;k<=8;k+=2){s+=`<text x="${f1(k?X(k):X(0)+2)}" y="${f1(L.c1+16)}" class="t-xs ${k?(k===8?'t-end':'t-mid'):''}">wk ${k}</text>`}
    /* placebo and drug curves up to the current week */
    const curve=(end,col,sw,dash)=>{let d='';const n=Math.max(2,Math.round(w*12));for(let i=0;i<=n;i++){const ww=w*i/n;d+=(i?'L':'M')+f1(X(ww))+' '+f1(Y(end*shape(ww)))}
      return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${sw};stroke-linecap:round;${dash?'stroke-dasharray:5 4':''}"/>`};
    s+=curve(D.plac,'var(--muted)',2.4,1);
    D.lines.slice().reverse().forEach(l=>s+=curve(l.v,'var(--rx)',l.main?3.2:1.6,0).replace('stroke-linecap',l.main?'stroke-linecap':'opacity:.55;stroke-linecap'));
    const cx=X(w);s+=`<circle cx="${f1(cx)}" cy="${f1(Y(D.lines[0].v*shape(w)))}" r="4.5" style="fill:var(--rx)"/><circle cx="${f1(cx)}" cy="${f1(Y(D.plac*shape(w)))}" r="4" style="fill:var(--muted)"/>`;
    if(w>7.9){const ly=Y(D.lines[0].v);s+=`<text x="${f1(L.x1-14)}" y="${f1(ly-8)}" class="t-lbl t-end" style="fill:var(--rx)">${D.lines[0].l}</text>`;
      s+=`<text x="${f1(L.x1-4)}" y="${f1(Y(D.plac)-7)}" class="t-lbl t-end" style="fill:var(--muted)">${D.placL}</text>`;
      if(!N)s+=`<path d="M${f1(L.x1+8)} ${f1(Y(D.plac))}V${f1(Y(D.lines[0].v))}" style="stroke:var(--ink);stroke-width:1.3" marker-end="url(#meArr)" marker-start="url(#meArr)"/>`}
    else s+=`<text x="${f1(Math.min(cx+8,L.x1-60))}" y="${f1(Y(D.lines[0].v*shape(w))+18)}" class="t-xs" style="fill:var(--rx)">${D.name.toLowerCase()} ${f1(D.lines[0].v*shape(w))}${D.unit}</text>`;
    /* weight panel */
    s+=`<text x="${L.x0-40}" y="${L.wy0-12}" class="t-sm">Weight gained, kg</text>`;
    [0,1,2,3].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(WY(v))}" y2="${f1(WY(v))}" class="grid"/><text x="${L.x0-6}" y="${f1(WY(v)+3)}" class="t-xs t-end">${v}</text>`);
    const wl=(v,col,sw,dash)=>`<path d="M${f1(X(0))} ${f1(WY(0))}L${f1(X(w))} ${f1(WY(v*wshape(w)))}" style="stroke:${col};stroke-width:${sw};stroke-linecap:round;${dash?'stroke-dasharray:5 4':''}"/>`;
    s+=wl(D.wP,'var(--muted)',2.2,1)+wl(D.w[0].v,'var(--warn)',3,0);
    s+=`<text x="${f1(Math.min(X(w)+6,L.x1-2))}" y="${f1(WY(D.w[0].v*wshape(w))-6)}" class="t-xs ${w>6?'t-end':''}" style="fill:var(--warn)">${w>7.9?D.w[0].l:'+'+f1(D.w[0].v*wshape(w))+' kg'}</text>`;
    s+=`<text x="${f1(Math.min(X(w)+6,L.x1-2))}" y="${f1(WY(D.wP*wshape(w))-5)}" class="t-xs ${w>6?'t-end':''}">${w>7.9?'placebo '+D.wPL:''}</text>`;
    s+=`<text x="${f1(X(w))}" y="${f1(L.wy1+14)}" class="t-xs ${w>7?'t-end':'t-mid'}" style="fill:var(--ink);font-weight:700">week ${f1(w)}</text>`;
    /* panel on the right / below */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const bx=L.px+14,by=L.py+12,bs=N?.52:.62,g=ramp(t,.08,.5);
    const B=brain(bx,by,bs,{glow:{frontal:g,parietal:g*.8,temporal:g*.8,occipital:g*.6,brainstem:g*.5},hlCol:'var(--rx)',id:'meBr'});
    s+=B.svg;
    const tx=bx+200*bs+10;
    s+=`<text x="${f1(tx)}" y="${f1(by+14)}" class="t-lbl">${D.name}</text><text x="${f1(tx)}" y="${f1(by+30)}" class="t-xs">psychotropic</text>`;
    const fx=[['sleepiness',.14],['appetite ↑',.3],['irritability ↓',.08]];
    fx.forEach(([l,a],i)=>{const op=ramp(t,a,a+.12);if(op>0)s+=`<text x="${f1(tx)}" y="${f1(by+50+i*15)}" class="t-xs" style="fill:${i===2?'var(--rx)':'var(--warn)'};opacity:${f1(op)}">${l}</text>`});
    const cy0=by+150*bs+22,cw=L.pw-28;
    if(p<=2){
      const tp=D.trial.split(' · ');s+=`<text x="${bx}" y="${f1(cy0)}" class="t-sm">${tp[0]}</text><text x="${bx}" y="${f1(cy0+14)}" class="t-xs">${tp.slice(1).join(' · ')}</text>`;
      const rows=[['Irritability',D.lines[0].v*shape(w),D.plac*shape(w),D.unit],['Weight',D.w[0].v*wshape(w),D.wP*wshape(w),' kg']];
      rows.forEach((r,i)=>{const y=cy0+34+i*64;s+=`<text x="${bx}" y="${f1(y)}" class="t-xs">${r[0]}</text>`;
        s+=`<text x="${bx}" y="${f1(y+28)}" style="font:800 24px var(--display);fill:${i?'var(--warn)':'var(--rx)'}">${(r[1]>0?'+':'')+f1(r[1])}${r[3]}</text>`;
        s+=`<text x="${f1(bx+cw*.55)}" y="${f1(y+28)}" style="font:800 18px var(--display);fill:var(--muted)">${(r[2]>0?'+':'')+f1(r[2])}${r[3]}</text>`;
        s+=`<text x="${f1(bx+cw*.55)}" y="${f1(y+40)}" class="t-xs">placebo</text><text x="${bx}" y="${f1(y+40)}" class="t-xs">${D.short.toLowerCase()==='ris'?'risperidone':'aripiprazole'}</text>`});
    }else if(p===3){
      s+=`<text x="${bx}" y="${f1(cy0)}" class="t-sm">${D.ae.h.split(' (')[0]}</text>`;
      const rows=D.ae.rows,rh=Math.min(30,(L.py+L.ph-cy0-30)/rows.length),lw=N?110:92,bw=cw-lw-34,k=ramp(t,.62,.7);
      rows.forEach((r,i)=>{const y=cy0+16+i*rh;s+=`<text x="${bx}" y="${f1(y+10)}" class="t-xs">${r[0]}</text>`;
        s+=`<rect x="${bx+lw}" y="${f1(y)}" width="${f1(bw*r[1]/70*k)}" height="8" rx="2" style="fill:var(--warn)"/><rect x="${bx+lw}" y="${f1(y+10)}" width="${f1(bw*r[2]/70*k)}" height="6" rx="2" style="fill:var(--muted);opacity:.7"/>`;
        s+=`<text x="${f1(bx+lw+bw*r[1]/70*k+4)}" y="${f1(y+8)}" class="t-xs" style="fill:var(--warn)">${r[1]}%</text><text x="${f1(bx+lw+bw*r[2]/70*k+4)}" y="${f1(y+17)}" class="t-xs">${r[2]}%</text>`});
      s+=`<text x="${bx}" y="${f1(L.py+L.ph-10)}" class="t-xs"><tspan style="fill:var(--warn)">■</tspan> ${D.name.toLowerCase()}  <tspan style="fill:var(--muted)">■</tspan> placebo</text>`;
    }else if(p===4){
      const I=D.icons;s+=`<text x="${bx}" y="${f1(cy0)}" class="t-sm">${I.h}</text>`;
      const k=ramp(t,.74,.82),per=I.d[1]>60?10:7,sz=N?(I.d[1]>60?14:16):(I.d[1]>60?9:14),colW=per*sz+14,y0=cy0+26;
      s+=`<text x="${bx}" y="${f1(y0-6)}" class="t-xs" style="fill:var(--rx)">drug ${I.d[0]}/${I.d[1]}</text>`;
      s+=icons(bx+4,y0,I.d[1],Math.round(I.d[0]*k),drug==='ris'?'var(--rx)':'var(--warn)',per,sz);
      s+=`<text x="${f1(bx+colW)}" y="${f1(y0-6)}" class="t-xs">placebo ${I.p[0]}/${I.p[1]}</text>`;
      s+=icons(bx+colW+4,y0,I.p[1],Math.round(I.p[0]*k),'var(--muted)',per,sz);
      s+=`<text x="${bx}" y="${f1(L.py+L.ph-10)}" class="t-xs">${N?I.sub.split(' and ')[0].split(' such')[0]:I.sub}</text>`;
    }else{
      const R=D.rel,k=ramp(t,.87,.96);s+=`<text x="${bx}" y="${f1(cy0)}" class="t-sm">${N?R.h:R.h.split(':')[0]}</text>`;
      if(!N)s+=`<text x="${bx}" y="${f1(cy0+14)}" class="t-xs">${R.h.split(': ')[1]||''}</text>`;
      const bw=cw-60,y=cy0+34;[[R.pl,R.p,'var(--warn)'],[R.dl,R.d,'var(--rx)']].forEach(([l,v,c],i)=>{const yy=y+i*44;
        s+=`<text x="${bx}" y="${f1(yy)}" class="t-xs">${l}</text><rect x="${bx}" y="${f1(yy+6)}" width="${f1(bw*v/70*k)}" height="16" rx="3" style="fill:${c}"/><text x="${f1(bx+bw*v/70*k+6)}" y="${f1(yy+19)}" class="t-lbl">${f1(v*k)}%</text>`});
      if(R.ns)s+=`<text x="${bx}" y="${f1(y+100)}" class="t-xs" style="fill:var(--warn)">difference not significant (P=.097)</text>`;
    }
    svg.innerHTML=s;setSt(p);
    $('#meRead').innerHTML=`<span>week <b>${f1(w)}</b></span><span>${D.name.toLowerCase()} <b>${f1(D.lines[0].v*shape(w))}${D.unit}</b></span><span>placebo <b>${f1(D.plac*shape(w))}${D.unit}</b></span><span>weight <b>+${f1(D.w[0].v*wshape(w))} kg</b> vs <b>+${f1(D.wP*wshape(w))} kg</b></span>`;
    $('#meNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#mePlay'),draw,22000,'%t:player.replay%','meds');
  let setSt=stepWire($('#meSteps'),ME_STEPS[drug],rg,draw,stop);
  function setDrug(d){drug=d;store.set('meDrug',d);$$('[data-me]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.me===d));
    /* the stepper keeps its buttons; refresh their titles for this medicine */
    $$('#meSteps [data-st]').forEach((b,i)=>{const sp=b.querySelector('span');if(sp)sp.textContent=ME_STEPS[d][i].t});
    $('#meCap').innerHTML=ME_D[d].cap;draw(+rg.value)}
  /* stepWire captured the first steps array; both arrays share the same .at values, so jumps stay right */
  $$('[data-me]').forEach(b=>b.addEventListener('click',()=>{stop();setDrug(b.dataset.me)}));
  setDrug(drug);

  /* effect sizes / prescribing */
  const sm=$('#meSmd');let smode='smd';
  function drawSmd(k=1){const N=vb(sm,'720 230','400 300');const rows=smode==='smd'?ME_SMD:ME_USE,mx=smode==='smd'?1.3:70;
    const lx=N?12:20,bx0=N?150:200,bx1=N?360:640,top=N?40:36,rh=N?(smode==='smd'?58:72):(smode==='smd'?42:52);let s='';
    s+=`<text x="${lx}" y="${top-14}" class="t-sm">${smode==='smd'?(N?'Effect on irritability (SMD)':'Effect vs placebo on irritability (SMD; bigger = more effect)'):(N?'US children with autism, 2001–2009':'Psychotropic prescriptions, 33,565 US children with autism, 2001–2009')}</text>`;
    if(smode==='smd')[0,.5,1].forEach(v=>{const x=lerp(bx0,bx1,v/mx);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top}" y2="${top+rows.length*rh}" class="grid"/><text x="${f1(x)}" y="${top+rows.length*rh+14}" class="t-xs t-mid">${v}</text>`});
    rows.forEach((r,i)=>{const y=top+i*rh+8,w=(bx1-bx0)*r[1]/mx*k,col=smode==='smd'?(i<3?'var(--rx)':'var(--accent)'):'var(--warn)';
      s+=`<text x="${lx}" y="${y+14}" class="t-lbl" style="font-size:${N?12:13}px">${r[0]}</text><rect x="${bx0}" y="${y}" width="${f1(w)}" height="20" rx="4" style="fill:${col}"/><text x="${f1(bx0+w+6)}" y="${y+15}" class="t-lbl">${smode==='smd'?r[1].toFixed(3):Math.round(r[1]*k)+'%'}</text>`});
    sm.innerHTML=s;
    $('#meSmdCap').innerHTML=smode==='smd'?'Meta-analysis of 45 placebo-controlled trials (2,856 participants). No other drug class beat placebo for irritability. An SMD around 1 is a large effect; 0.5 is moderate. [[SalazarDePablo2023,Fung2016]]':'Claims data: 64% filled at least one psychotropic prescription, 35% had polypharmacy across at least 2 classes and 15% used at least 3 classes at once. [[Spencer2013]]'}
  let stopS=null;
  $$('[data-ms]').forEach(b=>b.addEventListener('click',()=>{smode=b.dataset.ms;$$('[data-ms]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopS&&stopS();stopS=animate(700,p=>drawSmd(ease(p)))}));
  drawSmd(1);redraws.meds=(f=>()=>{f&&f();drawSmd(1);drawCards()})(redraws.meds);

  /* comparator cards */
  const box=$('#meCards');
  box.innerHTML=ME_CMP.map((c,i)=>`<div class="mecard" id="meC${i}"><span class="tag ${c.tc}">${c.tag}</span><h4>${c.name}</h4><svg id="meCs${i}" viewBox="0 0 300 74" role="img" aria-label="${c.bars.map(b=>b[0]+' '+b[1]+c.unit).join(', ')}"></svg><div class="fr"><p>${c.front}</p></div><div class="bk" hidden><ul>${c.back.map(x=>`<li>${x}</li>`).join('')}</ul></div><button class="btn ghost flip" data-mc="${i}" aria-pressed="false">Turn over: side effects &amp; caveats</button></div>`).join('');
  function drawCards(){ME_CMP.forEach((c,i)=>{const sv=$('#meCs'+i),mx=c.max||70;let s='';
    c.bars.forEach((b,k)=>{const y=6+k*32,w=170*b[1]/mx,col=c.single?(k?'var(--warn)':'var(--accent)'):(k?'var(--muted)':(c.tc==='bad'?'var(--bad)':c.tc==='rx'?'var(--rx)':'var(--accent)'));
      s+=`<text x="0" y="${y+9}" class="t-xs">${b[0]}</text><rect x="0" y="${y+13}" width="${f1(Math.max(2,w))}" height="11" rx="3" style="fill:${col}"/><text x="${f1(Math.max(2,w)+5)}" y="${y+23}" class="t-lbl" style="font-size:12px">${b[1]}${c.unit}</text>`});
    sv.innerHTML=s})}
  drawCards();
  box.addEventListener('click',e=>{const b=e.target.closest('[data-mc]');if(!b)return;const card=$('#meC'+b.dataset.mc),on=b.getAttribute('aria-pressed')!=='true';
    b.setAttribute('aria-pressed',on);card.classList.toggle('back',on);$('.fr',card).hidden=on;$('.bk',card).hidden=!on;$('svg',card).style.opacity=on?.35:1;
    b.innerHTML=on?'Turn back: the trial result':'Turn over: side effects &amp; caveats'});
};
