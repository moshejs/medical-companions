/* =============== 5.3 Physical health, sleep & safety =============== */
/* hot spots, relative to the figure: [dx/s, dy/s] */
const HE_SYS={
 brain:{n:'Brain',at:[0,.12],lab:'epilepsy',col:'var(--neuro)',big:'12.1%',bl:'median epilepsy prevalence in autism',u:'%',mx:30,
  bars:[['With intellectual disability',21.5],['Without intellectual disability',8],['Ages 13 and over',26],['By adulthood (followed to 21+)',22]],
  k:'Brain · epilepsy',t:'Epilepsy',
  txt:`Across 74 studies, the median prevalence of epilepsy in autism was 12.1%. [[Lukmanji2019]] It was 21.5% in autistic people with intellectual disability against 8% without, [[Amiet2008]] and 26% from age 13 upward. [[Viscidi2013]] In a cohort followed to adulthood, 22% developed epilepsy, mostly after age 10; most were controlled with one or two anticonvulsants. [[Bolton2011]] Epilepsy was the commonest cause of death in autism with intellectual disability. [[Hirvikoski2016]]`,
  pt:`About 1 in 8 autistic people have epilepsy. Seizures can start in the teenage years or later, so new episodes deserve a check. [[Lukmanji2019,Bolton2011]]`,
  hook:`Epilepsy in autism: 21.5% with ID vs 8% without; onsets often after age 10. [[Amiet2008,Bolton2011]]`},
 sleep:{n:'Sleep',at:[-.32,.08],lab:'sleep',col:'var(--accent)',big:'40–80%',bl:'of autistic children with sleep problems',u:'%',mx:100,
  bars:[['Sleep problems reported (upper)',80],['Sleep problems reported (lower)',40],['Diagnosed sleep-wake disorder',13]],
  k:'Sleep',t:'Sleep',
  txt:`Sleep problems, especially insomnia, are reported in 40–80% of autistic children and adolescents, and children with a history of regression sleep worse. [[Cortesi2010]] A diagnosed sleep-wake disorder is a stricter bar: 13% pooled. [[Lai2019]] Autistic adults sleep worse too, with longer time to fall asleep and more waking after sleep onset. [[Morgan2020Sleep]] Follow one night in the chart below.`,
  pt:`Poor sleep is very common in autistic children. Bedtime routines often help, and a doctor can discuss other options. [[Cortesi2010]]`,
  hook:`Behavioural strategies first, then melatonin if they have not helped (AAN 2020). [[WilliamsBuckley2020]]`},
 teeth:{n:'Teeth',at:[0,.25],lab:'teeth',col:'var(--gold)',big:'60.6%',bl:'dental caries, children and young adults',u:'%',mx:100,
  bars:[['Dental caries',60.6],['Periodontal disease (3 studies)',69.4]],
  k:'Mouth · dental health',t:'Teeth',
  txt:`A meta-analysis found dental caries in 60.6% and periodontal disease in 69.4% (from only 3 studies) of autistic children and young adults. [[daSilva2017]] A later, larger meta-analysis found no difference in most caries indices but more severely affected tooth surfaces <span class="ev hyp">Hypothesis</span>. [[daMotta2026]] A sensory-adapted dental room (changed lighting, sound and touch) lowered physiological stress and distress during cleaning in 162 autistic children. [[SteinDuker2023]]`,
  pt:`Dental visits can be hard because of light, noise and touch. Dimmer lights and calmer rooms help many children. [[SteinDuker2023]]`,
  hook:`Sensory-adapted dental environment: lower skin conductance and less distress in an RCT. [[SteinDuker2023]]`},
 feed:{n:'Feeding',at:[.4,.5],lab:'feeding',col:'var(--rx)',big:'OR 5.11',bl:'feeding problems vs peers',u:'or',mx:6,
  bars:[['Feeding problems',5.11],['Calcium intake',0.31],['Protein intake',0.35]],
  k:'Feeding · selectivity and ARFID',t:'Feeding',
  txt:`Across 17 controlled studies, autistic children had about five times the odds of feeding problems (OR 5.11), with lower calcium (OR 0.31) and protein intake (OR 0.35). [[Sharp2013Feeding]] About 11% of autistic groups met criteria for ARFID, from only three studies with a very wide interval. [[Sader2025]]`,
  pt:`Many autistic children eat a narrow range of foods, often because of taste, texture or smell. Watching growth and nutrition matters.`,
  hook:`Feeding problems OR 5.11; lower calcium and protein intake. [[Sharp2013Feeding]]`},
 gut:{n:'Gut',at:[0,.72],lab:'gut',col:'var(--sense)',big:'OR 4.42',bl:'general GI symptoms vs peers',u:'or',mx:6,
  bars:[['General GI symptoms',4.42],['Constipation',3.86],['Diarrhoea',3.63],['Abdominal pain',2.45]],
  k:'Gut · gastrointestinal symptoms',t:'Gut',
  txt:`In 15 controlled studies, autistic children had more GI symptoms overall (OR 4.42), with more diarrhoea (OR 3.63), constipation (OR 3.86) and abdominal pain (OR 2.45). [[McElhanon2014]] Causes could not be analysed; dietary restriction is one possible factor <span class="ev hyp">Hypothesis</span>. [[McElhanon2014]] GI conditions remain more common in autistic adults over 65 (OR 5.2). [[Hand2020Medicare]]`,
  pt:`Tummy problems like constipation are more common. Pain can show up as a change in behaviour, so it is worth checking. [[McElhanon2014]]`,
  hook:`GI symptoms OR 4.42; constipation OR 3.86. [[McElhanon2014]]`},
 weight:{n:'Weight',at:[0,1.05],lab:'weight',col:'var(--warn)',big:'17%',bl:'obesity in autistic children and teens',u:'%',mx:40,
  bars:[['Obesity (20 studies)',17],['Obesity (second meta-analysis)',22.2],['Obesity, ages 14–25',25]],
  k:'Weight · obesity and medicines',t:'Weight',
  txt:`In 20 studies, 17% of autistic children and adolescents had obesity (RR 1.58 vs controls), mostly from US data. [[Sammels2022]] Another meta-analysis found 22.2%, [[Kahathuduwa2019]] and 25% of autistic 14–25-year-olds in Kaiser Permanente had obesity. [[Davignon2018]] Medicines add to it: over 8 weeks, children on risperidone gained 2.7 kg vs 0.8 kg on placebo, [[McCracken2002]] and the label lists metabolic changes including weight gain. [[FDA-Risperdal]]`,
  pt:`Some medicines for irritability cause weight gain, so doctors check weight and blood tests. [[McCracken2002,FDA-Risperdal]]`,
  hook:`Risperidone: +2.7 kg vs +0.8 kg on placebo in 8 weeks (RUPP). [[McCracken2002]]`},
 safety:{n:'Safety',at:[-.4,.8],lab:'wandering &amp; water',col:'var(--bad)',big:'49%',bl:'tried to wander away after age 4',u:'%',mx:100,
  bars:[['Ever tried to wander off (after 4)',49],['Missing long enough to worry',26],['Fatal drownings after wandering',73.9],['Deaths from injury (US)',27.9]],
  k:'Safety · wandering, injury, drowning',t:'Wandering & water',
  txt:`In 1,218 autistic children, 49% had tried to wander away after age 4 and 26% were missing long enough to cause concern; of those who went missing, 24% were in danger of drowning. [[Anderson2012Elopement]] Injury caused 27.9% of 1,367 US deaths with autism recorded, and drowning had the highest proportionate mortality ratio (39.89). [[Guan2017AJPH]] Wandering preceded 73.9% of news-reported fatal drownings, most often in ponds. [[Guan2017Drowning]]`,
  pt:`Some autistic children wander away, and water is a real danger. Close supervision, barriers around water and personal alarms are worth thinking about. [[Anderson2012Elopement,Guan2017Drowning,Peden2020]]`,
  hook:`Leading injury causes of death in autism: suffocation, asphyxiation and drowning (PMR 39.89). [[Guan2017AJPH]]`}
};
const HE_ORDER=['brain','sleep','teeth','feed','gut','weight','safety'];
/* the night: minutes after 18:00; the "none" night and the plan's size are illustrative, melatonin deltas from Gringras 2017 */
const HE_NIGHT={none:{lat:100,morn:750,n:'No support'},beh:{lat:70,morn:750,n:'Behavioural sleep plan'},mel:{lat:30.4,morn:767.9,n:'Plan plus melatonin'}};
const HE_BED=120,HE_WAKE=[480,520];
const HE_STEPS=[
 {from:0,at:.07,k:'18:00–20:00',t:'Wind-down',
  txt:`The AAN guideline says to look first for medicines and co-existing conditions that could cause the sleep problem, and to counsel parents on behavioural strategies "as a first-line treatment approach". [[WilliamsBuckley2020]] Children with a history of regression tend to sleep worse. [[Cortesi2010]]`,
  pt:`A calm, predictable bedtime routine is the usual first step.`,
  hook:`AAN 2020: behavioural strategies first; melatonin only if they have not helped. [[WilliamsBuckley2020]]`},
 {from:.133,at:.17,k:'Lights out',t:'Lying awake',
  txt:`Trouble falling asleep is the commonest complaint. Parent-based sleep education for 80 children aged 2–10 shortened the time to fall asleep on actigraphy within a few sessions, in group or individual formats. [[Malow2014]] Weighted blankets did not lengthen sleep in an RCT, though children and parents liked them. [[Gringras2014]]`,
  pt:`Simple teaching for parents can help children fall asleep sooner. Popular products do not always work.`,
  hook:`Weighted blankets: no gain in total sleep time vs a usual blanket. [[Gringras2014]]`},
 {from:.27,at:.4,k:'Asleep',t:'Sleep',
  txt:`In 125 children aged 2–17.5 whose sleep had not improved with behavioural support alone, prolonged-release melatonin added 57.5 minutes of total sleep vs 9.14 on placebo at 13 weeks, and sleep latency fell 39.6 vs 12.5 minutes; 68.9% vs 39.3% had a meaningful response. [[Gringras2017]] Somnolence was more common on melatonin. [[Gringras2017]]`,
  pt:`For children who still sleep badly, melatonin helped many fall asleep sooner and sleep about half an hour longer than placebo.`,
  hook:`PedPRM trial: +57.5 vs +9.14 min total sleep; responders 68.9% vs 39.3%. [[Gringras2017]]`},
 {from:.52,at:.545,k:'Night',t:'Night waking',
  txt:`In a meta-analysis of 5 crossover trials, melatonin lengthened sleep by 44 minutes and shortened the time to fall asleep by 39 minutes, but did not reduce night-time awakenings. [[Rossignol2011]] Autistic adults also have more waking after sleep onset than non-autistic adults. [[Morgan2020Sleep]]`,
  pt:`Melatonin helps with falling asleep more than with staying asleep.`,
  hook:`Melatonin: longer sleep and shorter latency, but no fewer awakenings. [[Rossignol2011]]`},
 {from:.78,at:.86,k:'Morning',t:'Morning & the long run',
  txt:`In open-label follow-up, benefits held over 104 weeks, and weight, height, BMI and pubertal development stayed within normal ranges for age. [[Malow2021]] The AAN recommends pharmaceutical-grade melatonin and counselling about the lack of long-term safety data. [[WilliamsBuckley2020]] Melatonin and other medicines are covered in <a href="#meds" data-go="meds">Medication</a>.`,
  pt:`Better nights help the whole family. Any medicine for sleep should be reviewed regularly.`,
  hook:`Two-year follow-up: growth and puberty normal for age on prolonged-release melatonin. [[Malow2021]]`}
];
const HE_OUT={
 all:{u:'ratio',mx:10,t:'All-cause mortality',k:'Mortality · ratio vs comparison',
  rows:[['Meta-analysis, 12 studies (RR)',2.37],['Sweden, all autistic (OR)',2.56],['Autism with intellectual disability',5.78],['Autism without intellectual disability',2.18],['Females, autism with ID',8.52]],
  txt:`In Sweden, 2.60% of 27,122 autistic people died during follow-up against 0.91% of controls (OR 2.56); relative mortality was highest in autism with intellectual disability (OR 5.78), especially in females (8.52). [[Hirvikoski2016]] A meta-analysis of 12 studies found all-cause mortality RR 2.37. [[CatalaLopez2022]]`,
  pt:`On average, autistic people die younger than other people. This is a group figure, not a prediction for any one person. [[Hirvikoski2016]]`,
  hook:`All-cause mortality about 2.4–2.6 times the general population. [[CatalaLopez2022,Hirvikoski2016]]`},
 sui:{u:'ratio',mx:10,t:'Suicide',k:'Suicide · ratio vs comparison',
  rows:[['Sweden, all autistic (OR)',7.55],['Autism without ID (OR)',9.40],['Autism with ID (OR)',2.41],['Denmark, suicide (aIRR)',3.75],['Meta-analysis, 10 studies (RR)',2.85]],
  txt:`Suicide risk was raised most in autism without intellectual disability (OR 9.40), [[Hirvikoski2016]] and highest of all with co-occurring ADHD. [[Hirvikoski2020]] In Denmark, the adjusted suicide rate ratio was 3.75, autistic females had 4.41 times the attempt rate of autistic males, and over 90% of those who attempted or died had another diagnosis. [[Kolves2021]] A meta-analysis gave RR 2.85, higher in females. [[Santomauro2024Suicide]]`,
  pt:`Thoughts of suicide are more common in autistic people, especially autistic women and people who also have depression or ADHD. If you are worried, get help early. [[Kolves2021,Cassidy2014]]`,
  hook:`Highest relative suicide risk: autism without intellectual disability, with ADHD. [[Hirvikoski2016,Hirvikoski2020]]`},
 psy:{u:'rate',mx:3.6,t:'The role of mental health',k:'Deaths per 1,000 person-years, ages 16–46',
  rows:[['Non-autistic, no psychiatric condition',0.27],['Autistic, no psychiatric condition',0.96],['Autistic, with psychiatric conditions',3.2]],
  txt:`In a Swedish cohort followed from age 16, the death rate was 3.2 per 1,000 person-years in autistic people with psychiatric conditions, 0.96 without, and 0.27 in non-autistic people without them. [[Taylor2026Mortality]] For suicide attempts in Denmark, the rate ratio was 1.33 with autism alone and 9.27 with another diagnosis. [[Kolves2021]]`,
  pt:`Much of the extra risk travels with depression, anxiety and other conditions that can be treated.`,
  hook:`Autism + psychiatric condition: HR 13.85 for premature death vs neither. [[Taylor2026Mortality]]`},
 age:{u:'yr',mx:80,t:'Age at death',k:'Mean or median age at death, years',
  rows:[['Controls, Sweden (mean)',70.20],['All autistic, Sweden (mean)',53.87],['Autism without ID (mean)',58.39],['Autism with ID (mean)',39.50],['Non-autistic aged 65+ (median)',75],['Autistic aged 65+ (median)',72]],
  txt:`Mean age at death in Sweden was 53.87 years for autistic people against 70.20 for controls; 39.50 with intellectual disability and 58.39 without. [[Hirvikoski2016]] Among people who reach 65, the gap shrinks: median 72 vs 75. [[Krantz2023]] Mean age at death among those who died is not life expectancy; a US death-certificate study's mean of 36.2 years drew on a biased sample of deaths. [[Guan2017AJPH]]`,
  pt:`Headlines about autistic life expectancy often use age at death, which is not the same thing. Many autistic people live into old age. [[Krantz2023]]`,
  hook:`Age at death ≠ life expectancy; the gap is small (72 vs 75) in those who reach 65. [[Krantz2023]]`}
};

inits.health=()=>{
  /* ---- body map ---- */
  const bs=$('#heBody');let sel='brain',bp=1,stopB=null;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  function icon(id,x,y,c){if(id==='sleep')return `<path d="M${f1(x+4)} ${f1(y-10)}A10 10 0 1 0 ${f1(x+6)} ${f1(y+8)}A8 8 0 1 1 ${f1(x+4)} ${f1(y-10)}Z" style="fill:${c}"/>`;
    if(id==='feed')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="11" style="fill:var(--panel);stroke:${c};stroke-width:2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:none;stroke:${c};stroke-width:1.2"/>`;
    if(id==='weight')return `<rect x="${f1(x-14)}" y="${f1(y-7)}" width="28" height="14" rx="3" style="fill:var(--panel);stroke:${c};stroke-width:2"/><line x1="${f1(x)}" x2="${f1(x+5)}" y1="${f1(y)}" y2="${f1(y-4)}" style="stroke:${c};stroke-width:1.6"/>`;
    if(id==='safety')return `<path d="M${f1(x-14)} ${f1(y-3)}q3.5 -5 7 0t7 0t7 0t7 0M${f1(x-14)} ${f1(y+4)}q3.5 -5 7 0t7 0t7 0t7 0" style="fill:none;stroke:${c};stroke-width:2"/>`;
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="7" style="fill:${c}"/>`}
  function drawBody(){const N=vb(bs,'720 420','400 680');
    const F=N?{x:200,y:14,s:300}:{x:200,y:16,s:360},P=N?{x:16,y:390,w:368}:{x:404,y:24,w:300};
    let s=person(F.x,F.y,F.s,'var(--cortex)',{op:.95});
    s+=`<path d="M${F.x} ${f1(F.y+F.s*.42)}V${f1(F.y+F.s*.98)}" style="stroke:var(--cortex-line);stroke-width:1;opacity:.4"/>`;
    HE_ORDER.forEach(id=>{const S=HE_SYS[id],x=F.x+S.at[0]*F.s,y=F.y+S.at[1]*F.s,on=id===sel,c=S.col;
      s+=`<g class="clk" role="button" tabindex="0" data-hsk="${id}" aria-label="${S.n}" aria-pressed="${on}">`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?24+3*Math.sin(bp*Math.PI):19}" style="fill:${on?c:'var(--panel)'};fill-opacity:${on?.22:.85};stroke:${c};stroke-width:${on?2.6:1.6}"/>`;
      s+=icon(id,x,y,c);
      const side=Math.abs(S.at[0])>.1,lb=id==='safety'?'water':S.lab;
      s+=side?T(x,y+36,lb,'t-sm t-mid',on?'fill:var(--ink);font-weight:700':''):T(x+30,y+4,lb,'t-sm',on?'fill:var(--ink);font-weight:700':'');
      s+='</g>'});
    /* data panel */
    const S=HE_SYS[sel],u=ease(bp);
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${N?276:370}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=T(P.x+16,P.y+24,S.n.toUpperCase(),'t-sm','fill:'+S.col);
    s+=`<text x="${P.x+16}" y="${P.y+66}" style="font:800 ${N?34:38}px var(--display);fill:${S.col}">${S.big}</text>`+T(P.x+16,P.y+86,S.bl,'t-xs','fill:var(--ink)');
    const bx0=P.x+16,bx1=P.x+P.w-50,X=v=>lerp(bx0,bx1,clamp(v/S.mx)),rh=N?42:52,y0=P.y+(N?116:118);
    S.bars.forEach(([n,v],k)=>{const y=y0+k*rh;s+=T(bx0,y,n,'t-xs','fill:var(--ink)');
      s+=`<rect x="${bx0}" y="${y+5}" width="${f1(bx1-bx0)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${bx0}" y="${y+5}" width="${f1(Math.max(0,X(v*u)-bx0))}" height="16" rx="4" style="fill:${S.col};opacity:${k?.75:1}"/>`;
      s+=T(X(v*u)+6,y+18,S.u==='or'?'OR '+(v*u).toFixed(2):(v*u).toFixed(1)+'%','t-xs','fill:var(--ink);font-weight:600')});
    if(S.u==='or'){const x1=X(1);s+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${y0-6}" y2="${y0+S.bars.length*rh}" style="stroke:var(--ink);stroke-dasharray:3 3"/>`+T(x1,y0+S.bars.length*rh+12,'1 = same as peers','t-xs t-mid')}
    bs.innerHTML=s;
    $('#heBodyNote').innerHTML=noteHTML(S)}
  function pick(id){sel=id;$$('[data-hs]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.hs===id));if(stopB)stopB();bp=0;stopB=animate(900,p=>{bp=p;drawBody()},()=>{stopB=null})}
  $$('[data-hs]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.hs)));
  bs.addEventListener('click',e=>{const g=e.target.closest('[data-hsk]');if(g)pick(g.dataset.hsk)});
  bs.addEventListener('keydown',e=>{const g=e.target.closest('[data-hsk]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.hsk);setTimeout(()=>{const n=bs.querySelector(`[data-hsk="${g.dataset.hsk}"]`);n&&n.focus()},0)}});
  drawBody();

  /* ---- one night's sleep ---- */
  const ss=$('#heSleep'),rg=$('#heT');let mode='none',cur={...HE_NIGHT.none},stopM=null;
  const hhmm=m=>{const t=(18*60+Math.round(m))%(24*60);return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
  function drawSleep(t){const N=vb(ss,'720 340','400 372'),m=t*900;
    const C=N?{x0:30,x1:380,ty:40,by:150,gy:206,fy:96,ry:270}:{x0:60,x1:700,ty:40,by:150,gy:210,fy:96,ry:270};
    const X=v=>lerp(C.x0,C.x1,v/900);let s='';
    /* time axis */
    for(let h=0;h<=15;h++){const x=X(h*60),lab=(18+h)%24;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${C.ty+10}" y2="${C.gy+28}" class="grid" style="opacity:${h%3?.4:1}"/>`;
      if(h%(N?3:2)===0)s+=T(x,C.ty+4,String(lab).padStart(2,'0')+':00','t-xs t-mid')}
    const seg=(n,y,h,o)=>{const on=HE_BED+n.lat,w=[HE_WAKE[0],HE_WAKE[1]];let g='';
      const st=o.ghost?`fill:none;stroke:var(--muted);stroke-dasharray:4 3`:'';
      g+=`<rect x="${f1(X(HE_BED))}" y="${y}" width="${f1(X(on)-X(HE_BED))}" height="${h}" rx="4" style="${st||'fill:var(--sense);opacity:.85'}"/>`;
      g+=`<rect x="${f1(X(on))}" y="${y}" width="${f1(X(w[0])-X(on))}" height="${h}" rx="4" style="${st||'fill:var(--neuro)'}"/>`;
      g+=`<rect x="${f1(X(w[0]))}" y="${y}" width="${f1(X(w[1])-X(w[0]))}" height="${h}" rx="4" style="${st||'fill:var(--warn);opacity:.85'}"/>`;
      g+=`<rect x="${f1(X(w[1]))}" y="${y}" width="${f1(X(n.morn)-X(w[1]))}" height="${h}" rx="4" style="${st||'fill:var(--neuro)'}"/>`;
      return g};
    s+=T(C.x0,C.by-10,HE_NIGHT[mode].n.toUpperCase(),'t-sm','fill:var(--ink)');
    s+=seg(cur,C.by,36,{});
    s+=T(C.x0,C.gy-6,'without support (outline)','t-xs');s+=seg(HE_NIGHT.none,C.gy,14,{ghost:true});
    if(!N){s+=T(X(HE_BED+cur.lat/2),C.by+23,'awake','t-xs t-mid','fill:var(--bg);font-weight:700');s+=T(X((HE_BED+cur.lat+HE_WAKE[0])/2),C.by+23,'asleep','t-xs t-mid','fill:var(--bg);font-weight:700');s+=T(X((HE_WAKE[0]+HE_WAKE[1])/2),C.by+23,'up','t-xs t-mid','fill:var(--bg);font-weight:700')}
    /* cursor and child */
    const onset=HE_BED+cur.lat,asleep=m>=onset&&m<cur.morn&&!(m>=HE_WAKE[0]&&m<HE_WAKE[1]),inBed=m>=HE_BED&&m<cur.morn;
    const cx=X(m);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${C.ty+10}" y2="${C.gy+22}" style="stroke:var(--ink);stroke-width:2"/>`;
    const fx=clamp(cx,C.x0+26,C.x1-26);
    s+=face(fx,C.fy,20,{gaze:asleep?90:inBed?-60:0,mouth:asleep?'flat':inBed?'wavy':'smile',brows:inBed&&!asleep?'tense':'calm'});
    if(asleep){s+=`<rect x="${f1(fx-14)}" y="${f1(C.fy-4)}" width="28" height="7" rx="3" style="fill:var(--skin)"/>`;s+=T(fx+24,C.fy-16,'z','t-sm','fill:var(--neuro)')+T(fx+32,C.fy-26,'z','t-lbl','fill:var(--neuro)')}
    s+=T(fx,C.fy+36,hhmm(m),'t-xs t-mid','fill:var(--ink);font-weight:700');
    /* readouts */
    const tst=cur.morn-onset-(HE_WAKE[1]-HE_WAKE[0]),b0=HE_NIGHT.none,tst0=b0.morn-HE_BED-b0.lat-(HE_WAKE[1]-HE_WAKE[0]);
    const rd=[['falls asleep',hhmm(onset)],['time to fall asleep',Math.round(cur.lat)+' min'],['total sleep',Math.floor(tst/60)+' h '+Math.round(tst%60)+' min'],['vs no support',(tst-tst0>=0?'+':'')+Math.round(tst-tst0)+' min']];
    rd.forEach(([k,v],i)=>{const x=N?C.x0+(i%2)*180:C.x0+i*160,y=N?C.ry+Math.floor(i/2)*44:C.ry;s+=T(x,y,k.toUpperCase(),'t-xs')+`<text x="${f1(x)}" y="${y+22}" style="font:800 19px var(--display);fill:var(--ink)">${v}</text>`});
    ss.innerHTML=s;
    const p=phaseOf(HE_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`${hhmm(m)}: ${HE_STEPS[p].t}`);
    $('#heRead').innerHTML=`<span>time <b>${hhmm(m)}</b></span><span>child is <b>${asleep?'asleep':inBed?'awake in bed':'up'}</b></span><span>support <b>${HE_NIGHT[mode].n}</b></span>`;
    $('#heSleepNote').innerHTML=noteHTML(HE_STEPS[p]);
  }
  const stop=playWire(rg,$('#hePlay'),drawSleep,20000,'Replay','health');
  const setSt=stepWire($('#heSteps'),HE_STEPS,rg,drawSleep,stop);
  $$('[data-hsl]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.hsl;$$('[data-hsl]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const a={...cur},z=HE_NIGHT[mode];if(stopM)stopM();stopM=animate(900,p=>{const e=ease(p);cur={lat:lerp(a.lat,z.lat,e),morn:lerp(a.morn,z.morn,e)};drawSleep(+rg.value)},()=>{stopM=null})}));
  drawSleep(+rg.value);

  /* ---- outcomes compared ---- */
  const os=$('#heOut');let ov='all',op=1,stopO=null;
  function drawOut(){const N=vb(os,'720 320','400 470'),O=HE_OUT[ov],u=ease(op);let s='';
    const x0=N?16:270,x1=N?330:640,X=v=>lerp(x0,x1,clamp(v/O.mx)),rh=N?66:44,y0=N?40:34;
    s+=T(N?16:24,N?20:20,O.k.toUpperCase(),'t-sm','fill:var(--brand)');
    O.rows.forEach(([n,v],k)=>{const y=y0+k*rh,ly=N?y+10:y+17,by=N?y+16:y+4,hi=ov==='age'?(k===0||k===4):ov==='psy'&&k===0;
      s+=T(N?x0:x0-10,ly,n,'t-xs '+(N?'':'t-end'),'fill:var(--ink)');
      s+=`<rect x="${x0}" y="${by}" width="${f1(Math.max(0,X(v*u)-x0))}" height="20" rx="4" style="fill:${hi?'var(--muted)':'var(--brand)'};opacity:${hi?.55:.9}"/>`;
      s+=T(X(v*u)+6,by+15,O.u==='yr'?(v*u).toFixed(1)+' y':O.u==='rate'?(v*u).toFixed(2):(v*u).toFixed(2)+'×','t-xs','fill:var(--ink);font-weight:700')});
    if(O.u==='ratio'){const xr=X(1),yb=y0+O.rows.length*rh;s+=`<line x1="${f1(xr)}" x2="${f1(xr)}" y1="${y0-4}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.5;stroke-dasharray:4 3"/>`+T(xr,yb+14,'1 = general population','t-xs t-mid','fill:var(--ink)')}
    os.innerHTML=s;
    $('#heOutNote').innerHTML=noteHTML(O)+`<p class="kicker">Population statistics, not predictions for one person.</p>`}
  $$('[data-hoc]').forEach(b=>b.addEventListener('click',()=>{ov=b.dataset.hoc;$$('[data-hoc]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopO)stopO();op=0;stopO=animate(900,p=>{op=p;drawOut()},()=>{stopO=null})}));
  redraws.health=(prev=>()=>{prev&&prev();drawBody();drawOut()})(redraws.health);
  onHide.health=(prev=>()=>{prev&&prev();[stopB,stopM,stopO].forEach(f=>f&&f())})(onHide.health);
  drawOut();
};
