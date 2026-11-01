/* =============== 5.2 Living with ADHD =============== */
/* The day runs from 06:00 (t = 0) to 24:00 (t = 1). Each phase has a teen and an adult version.
   Strategy items: [label, text with its citation, module link]. Labels: g guideline, l label, est, early,
   weak (little evidence), pop (population data), tip (practical tip), safe (safety), link. */
const LV_PH=[
 {id:'am',h0:6,h1:8.5,at:7.2,c:'var(--gold)',n:'Morning',nt:'Morning routine',
  teen:{t:'Getting out of the door',
   txt:`Mornings are a common pinch point. Unmedicated children with ADHD have more difficulty waking in the morning and more daytime sleepiness than controls (16 studies). [[Cortese2009Sleep]] NICE lists reducing stigma, "because there is no need to take medication at school or in the workplace", as one reason to think about a once-daily modified-release stimulant. [[NICE2018F]]`,
   pt:`A long-acting medicine taken at home can mean no dose at school. A written checklist by the door keeps the morning steps in one place.`,
   hook:`NICE 1.7.20: once-daily modified-release stimulants, partly to reduce stigma. [[NICE2018F]]`,
   items:[['g','A once-daily modified-release stimulant means no dose is needed at school; NICE lists reducing stigma as one reason to consider it. [[NICE2018F]]','release'],
    ['l','How a medicine is taken matters. The labels state that Concerta tablets must not be crushed, chewed or split, and that Adderall XR capsules may be sprinkled on applesauce. [[FDA-Concerta,FDA-AdderallXR]]','nursing'],
    ['tip','A written checklist by the door (clothes, bag, medicine) puts the routine outside the head.','']]},
  adult:{t:'Structure before the day starts',
   txt:`NICE asks clinicians to advise the families of adults with ADHD on how ADHD may affect relationships and functioning, and on "the importance of structure in daily activities". [[NICE2018F]] A once-daily modified-release stimulant also means no dose at work, which NICE lists as a way of reducing stigma. [[NICE2018F]]`,
   pt:`A fixed morning order, the same each day, takes some decisions off the table before work.`,
   hook:`NICE 1.4.10: structure in daily activities, in its advice to families of adults with ADHD. [[NICE2018F]]`,
   items:[['g','Structure in daily activities, part of NICE advice to the families of adults with ADHD. [[NICE2018F]]','therapy'],
    ['g','Once-daily modified-release stimulant: no dose needed at work. [[NICE2018F]]','release'],
    ['tip','One fixed place for keys, wallet, phone and medicine.','']]}},
 {id:'day',h0:8.5,h1:15,at:10.6,c:'var(--dx)',n:'School / work',nt:'School or work',
  teen:{t:'School: fewer distractions, more skills',
   txt:`AAP 2019 calls educational interventions and individualised supports "a necessary part of any treatment plan", often through an Individualized Education Program (IEP) or a 504 plan. [[Wolraich2019]] NICE's examples of environmental modifications: changes to seating, lighting and noise; fewer distractions, for example headphones; shorter periods of focus with movement breaks, including "I need a break" cards; and written instructions to back up spoken requests. [[NICE2018F]]`,
   pt:`Small changes in the room help, and so does being taught how to organise work. The second matters more than extra time on tests.`,
   hook:`Extended time is the most common accommodation but has little ADHD-specific evidence; read-aloud for younger pupils was the exception. [[Lovett2021]]`,
   items:[['g','Seating, lighting and noise changes; headphones; movement breaks and "I need a break" cards; written instructions (NICE examples). [[NICE2018F]]','parenting'],
    ['early','Skills over allowances: in an RCT of 64 middle-school pupils, organisation training, self-management and note-taking instruction led to more organised binders and more complete notes than accommodations did. [[Harrison2020]]','parenting'],
    ['weak','Extended time on tests: by far the most common accommodation, with little ADHD-specific benefit in a 68-document review. [[Lovett2021]]',''],
    ['pop','In 657,720 Swedish pupils, 3 months of ADHD medication was associated with a grade point sum 9.35 points higher (0–320 scale). An association in a register, not a trial. [[Jangmo2019]]','compare']]},
  adult:{t:'Work: adjustments and fewer interruptions',
   txt:`NICE says the conversation after diagnosis should cover employment, "for example, impact on career choices and rights to reasonable adjustments in the workplace", and defines reasonable adjustments as the legal duty of employers to make sure disabled workers are not substantially disadvantaged. [[NICE2018F]] An international consensus found that occupational health was used as a "last resort" rather than to make positive workplace changes. [[Adamou2013]]`,
   pt:`Adjustments are changes that let a person do the same job well: a quieter desk, written task lists, planned breaks.`,
   hook:`NICE 1.4.3: discuss rights to reasonable adjustments in the workplace after diagnosis. [[NICE2018F]]`,
   items:[['g','Reasonable adjustments, using NICE examples of environmental modifications: a quieter seat, headphones, written instructions, shorter focus periods with movement breaks. [[NICE2018F]]',''],
    ['pop','On average, in 1.2 million Swedes followed 6–16 years, annual income was 17% lower (ratio 0.83) with 12.19 more days of unemployment a year; education explained only part of the gap. [[Jangmo2021]]','outcomes'],
    ['weak','Occupational health was found to be used as a "last resort" in the UK and elsewhere. [[Adamou2013]]',''],
    ['link','Psychological support for adults is covered in its own module.','therapy']]}},
 {id:'pm',h0:15,h1:17.5,at:16,c:'var(--beh)',n:'Afternoon',nt:'Afternoon',
  teen:{t:'After school: move, and mind the late dose',
   txt:`Short-term aerobic exercise had moderate to large effects on attention (SMD 0.84) in a meta-analysis of 8 randomised trials with 249 children (Early evidence). [[Cerrillo2015]] The World Federation consensus is more cautious: one meta-analysis found a symptom reduction that was no longer significant after adjusting for publication bias. [[Faraone2021]] The Adderall XR and Vyvanse labels say afternoon doses should be avoided because they may cause insomnia. [[FDA-AdderallXR,FDA-Vyvanse]]`,
   pt:`Being active is good for everyone. Whether it eases ADHD symptoms on its own is still being tested.`,
   hook:`Exercise: Early evidence for symptoms; NICE lists "a healthy lifestyle, including exercise" as a topic before any treatment. [[Faraone2021,NICE2018F]]`,
   items:[['early','Aerobic exercise: attention SMD 0.84 in 8 small RCTs; recommended for health, unproven for core symptoms. [[Cerrillo2015,Faraone2021]]',''],
    ['l','Afternoon doses of Adderall XR or Vyvanse "should be avoided" because of possible insomnia, as the labels state. [[FDA-AdderallXR,FDA-Vyvanse]]','safety']]},
  adult:{t:'Late afternoon: energy and the evening plan',
   txt:`A meta-analysis of 10 studies found exercise improved functional outcomes such as executive function (g = 0.627), with larger effects for longer programmes (Early evidence). [[Vysniauske2020]] The labels for Adderall XR and Vyvanse say afternoon doses should be avoided because they may cause insomnia. [[FDA-AdderallXR,FDA-Vyvanse]]`,
   pt:`A walk, a run or a class after work is good for health. Taking a long-acting stimulant late in the day can cost sleep.`,
   hook:`Labels: avoid afternoon doses of Adderall XR and Vyvanse (insomnia). [[FDA-AdderallXR,FDA-Vyvanse]]`,
   items:[['early','Exercise programmes: executive function and motor skills improved (g = 0.627), more with longer programmes. [[Vysniauske2020]]',''],
    ['l','Afternoon doses of Adderall XR or Vyvanse "should be avoided" (insomnia). [[FDA-AdderallXR,FDA-Vyvanse]]','safety']]}},
 {id:'tasks',h0:17.5,h1:19.5,at:18.4,c:'var(--accent)',n:'Homework / home',nt:'Homework or home',
  teen:{t:'Homework in short blocks',
   txt:`Organisation and note-taking can be taught: in the middle-school RCT, the skill-building group kept more organised binders. [[Harrison2020]] For children aged 6–12, AAP 2019 recommends FDA-approved medication together with parent training in behaviour management and/or behavioural classroom intervention, preferably both (grade A). [[Wolraich2019]] NICE says a recommendation for parent training "does not imply bad parenting"; it meets "the above-average parenting needs" of children with ADHD. [[NICE2018F]]`,
   pt:`Homework goes better in short pieces with a break in between, using a planner the young person has been taught to use.`,
   hook:`NICE 1.4.11: parent training "does not imply bad parenting". [[NICE2018F]]`,
   items:[['early','Organisation training: planners, binder checks and note-taking. [[Harrison2020]]','therapy'],
    ['g','Ages 6–12: medication with behavioural parent training and/or classroom intervention, preferably both (AAP, grade A). [[Wolraich2019]]','parenting'],
    ['g','Shorter periods of focus with movement breaks (a NICE example). [[NICE2018F]]','']]},
  adult:{t:'Home, money and relationships',
   txt:`A review describes research pointing to "short-lived and discordant" romantic relationships in adults with ADHD, and little work on what protects against this. [[Wymbs2021]] In the Pittsburgh study, men with childhood ADHD were projected to earn US$1.27 million less over their working lives, and financial deficits were present even in people who no longer met any DSM symptom criteria. [[Pelham2020Finance]] These are group averages, not predictions.`,
   pt:`Bills, paperwork and shared chores are where ADHD often shows at home. Planning them, and talking about them, helps both partners.`,
   hook:`Financial deficits persisted even after symptoms no longer met criteria (Pittsburgh ADHD Longitudinal Study). [[Pelham2020Finance]]`,
   items:[['g','NICE: advise families on how ADHD may affect relationships, and on structure in daily activities. [[NICE2018F]]',''],
    ['pop','Money: lower income and net worth on average; regular admin is worth planning for. [[Pelham2020Finance,Jangmo2021]]','outcomes'],
    ['link','CBT, coaching and adult support.','therapy']]}},
 {id:'drive',h0:19.5,h1:21.5,at:20.3,c:'var(--dz)',n:'Driving',nt:'Evening driving',
  teen:{t:'An evening drive as a new driver',
   txt:`Among 14,936 newly licensed New Jersey drivers, those with ADHD had a higher crash rate, most of all in the first month of licensure (adjusted rate ratio 1.62). [[Curry2019]] AAP 2019 advises "special concern" to provide medication coverage while adolescents drive, and notes that longer-acting or late-afternoon short-acting doses may help. [[Wolraich2019]] In 15 randomised trials, stimulants generally improved driving performance, but immediate-release methylphenidate lost its effect in the evening. [[Gobbo2014]]`,
   pt:`The first months of driving carry the most risk. Plan when the medicine covers, and keep evening drives short at first.`,
   hook:`Crash RR about 1.23 after controlling for distance driven, not the old "fourfold" figure. [[Vaa2014]]`,
   items:[['g','Plan medication coverage for driving times (AAP). [[Wolraich2019]]','release'],
    ['early','15 RCTs: stimulants generally improved simulator or on-road driving, especially in teens and young adults; immediate-release methylphenidate wore off by evening. [[Gobbo2014]]',''],
    ['early','Within the same people, months on medication had lower odds of a crash-related emergency visit (men OR 0.62, women OR 0.58). [[Chang2017Crash]]','outcomes'],
    ['pop','First year of driving: 3.6 times the rate of alcohol and/or drug violations. [[Curry2019]]','']]},
  adult:{t:'Driving home after dark',
   txt:`In a meta-analysis of 16 studies, drivers with ADHD had a crash relative risk of 1.36 unadjusted and 1.23 after controlling for distance driven. [[Vaa2014]] In 17,408 Swedish adults with ADHD, serious transport accidents were more common (aHR 1.47 in men, 1.45 in women); within the same men, medicated periods carried a 58% lower risk (HR 0.42), while the association in women was not significant. [[Chang2014Crash]]`,
   pt:`Evening is when a morning dose has often worn off. If driving is part of the evening, it is worth planning with the prescriber.`,
   hook:`UK: people with ADHD must tell the DVLA if symptoms or medication affect safe driving (NICE). [[NICE2018F]]`,
   items:[['early','Extended-release mixed amphetamine salts worsened evening driving in the trials reviewed; immediate-release methylphenidate lost its effect. [[Gobbo2014]]','release'],
    ['early','Men: medicated periods, 58% fewer serious transport accidents than unmedicated periods (HR 0.42). [[Chang2014Crash]]','outcomes'],
    ['g','Tell the DVLA (UK) if symptoms or medication affect driving safely. [[NICE2018F]]',''],
    ['pop','Drivers aged 65–79 with ADHD: more self-reported crashes (aIRR 1.74) and traffic tickets (aIRR 2.02). [[Liu2023Drivers]]','']]}},
 {id:'sleep',h0:21.5,h1:24,at:22.6,c:'var(--ne)',n:'Sleep',nt:'Sleep',
  teen:{t:'Bedtime: the same routine each night',
   txt:`In a randomised trial of 244 children aged 5–12 with ADHD, two sessions of sleep hygiene and behavioural strategies cut moderate to severe sleep problems from 56% to 30% at 3 months (number needed to treat 3.9), and also reduced ADHD symptom severity. [[Hiscock2015]] Stimulants lengthened sleep latency (effect size 0.54) and shortened total sleep in trials with objective measures. [[Kidwell2015]] NICE recommends monitoring sleep, for example with a sleep diary, and adjusting medication accordingly. [[NICE2018F]]`,
   pt:`A calm, fixed bedtime routine helps many young people with ADHD sleep better. A sleep diary shows the prescriber what is happening.`,
   hook:`Sleep hygiene RCT (Hiscock 2015): 56% to 30% with moderate to severe sleep problems; NNT 3.9. [[Hiscock2015]]`,
   items:[['early','Sleep hygiene and behavioural strategies (RCT, children 5–12): number needed to treat 3.9. [[Hiscock2015]]',''],
    ['g','A sleep diary, and medication adjusted with the prescriber when sleep changes (NICE). [[NICE2018F]]','nursing'],
    ['early','Melatonin RCT in 105 unmedicated children aged 6–12 with insomnia: sleep onset 26.9 minutes earlier versus 10.5 minutes later on placebo; no effect on behaviour. [[VanderHeijden2007]]',''],
    ['safe','Melatonin is a dietary supplement in the US: content varied from −83% to +478% of the label, and child ingestions rose 530% in 2012–2021. Store it out of reach. [[Erland2017,Lelak2022]]','']]},
  adult:{t:'Winding down',
   txt:`Adults with ADHD differed from controls on 7 of 9 self-reported sleep measures; actigraphy showed longer sleep onset latency and lower sleep efficiency, while polysomnography showed no differences. [[DiazRoman2018]] In trials with objective sleep measures, stimulants lengthened sleep latency and shortened total sleep, less so with longer time on medication. [[Kidwell2015]]`,
   pt:`Many adults with ADHD take longer to fall asleep. Tracking it for two weeks gives a clearer picture than memory.`,
   hook:`Adults with ADHD: longer sleep onset latency on actigraphy (SMD 0.80), no difference on polysomnography. [[DiazRoman2018]]`,
   items:[['g','A sleep diary, and medication adjusted with the prescriber when sleep changes (NICE). [[NICE2018F]]','nursing'],
    ['est','Self-reported and actigraphy sleep differences in adults with ADHD (13 studies). [[DiazRoman2018]]',''],
    ['weak','The melatonin trials cited in this guide are in children and adolescents; none in adults were identified here. [[Salanitro2022]]','']]}}
];
const LV_LAB={g:'<span class="tag accent">Guideline</span>',l:'<span class="tag rx">Label</span>',est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',weak:'<span class="tag warn">Little evidence</span>',pop:'<span class="tag">Population data</span>',tip:'<span class="tag">Practical tip</span>',safe:'<span class="tag bad">Safety</span>',link:'<span class="tag brand">More</span>'};
const LV_MODT={release:'Formulations &amp; the daily curve',nursing:'Nursing care',therapy:'CBT, coaching &amp; adult support',parenting:'Parent training &amp; classroom support',outcomes:'Course &amp; outcomes',compare:'How well treatments work',safety:'Side effects, safety &amp; misuse'};
const LV_SET={
 us:{h:'School in the United States',cards:[
  ['g','IEP or 504 plan',`AAP 2019 says educational interventions and individualised instructional supports are "a necessary part of any treatment plan" and "often include an Individualized Education Program (IEP) or a rehabilitation plan (504 plan)" (grade A, strong recommendation). [[Wolraich2019]]`],
  ['pop','What plans contain',`In 97 US middle-school students with ADHD, 61.9% had an IEP and 38.1% a 504 plan. Listed services often matched federal recommendations "but had little to no research supporting their effectiveness"; in 85% of IEPs the present-performance statement described behaviour problems, yet fewer than half had measurable goals for them. [[Spiel2014]]`],
  ['weak','Extended time',`Accommodations are "by far the most common response to ADHD in educational settings". Most showed no ADHD-specific benefit; read-aloud accommodations for younger students were the exception. The review advises pairing accommodations with evidence-based interventions. [[Lovett2021]]`],
  ['early','Skill-building',`In a randomised trial of 64 middle-school students, organisation training, self-management and note-taking instruction beat accommodations (organisation support, extended time, a copy of the teacher's notes) for organised binders and accurate notes. [[Harrison2020]]`]]},
 uk:{h:'School in the United Kingdom',note:`UK special educational needs law is not summarised here, because this guide's research did not include a validated source for it. The points below are NICE's.`,cards:[
  ['g','Talking to the school',`With consent, NICE asks clinicians to contact the school, college or university at diagnosis, when symptoms change, and at each transition. The contact covers how ADHD may affect school life, the treatment plan, special educational needs, and "reasonable adjustments and environmental modifications". [[NICE2018F]]`],
  ['g','Changes in the classroom',`NICE examples: seating, lighting and noise; fewer distractions, for example headphones; shorter periods of focus with movement breaks, including "I need a break" cards; written instructions to back up spoken requests; and teaching assistants. [[NICE2018F]]`],
  ['g','The SENCO and screening',`NICE says there should be no universal screening for ADHD in nurseries or schools. When a child with conduct problems and suspected ADHD is referred to the school's special educational needs coordinator (SENCO), the SENCO should tell parents about local parent-training programmes. [[NICE2018F]]`],
  ['weak','Accommodations alone',`The same caution applies as in the US: accommodations showed little ADHD-specific benefit and are best combined with skill-building interventions. [[Lovett2021,Harrison2020]]`]]},
 uni:{h:'University and college',cards:[
  ['pop','How common',`About 2% to 8% of college students report clinically significant ADHD symptoms, and at least 25% of college students with disabilities have an ADHD diagnosis. [[DuPaul2009College]]`],
  ['pop','Other conditions',`Among first-year US students, 55.0% of those with well-defined ADHD had at least one other psychiatric diagnosis, against 11.2% of comparison students, mostly depression and generalised anxiety. [[Anastopoulos2018]]`],
  ['g','Reasonable adjustments',`NICE defines reasonable adjustments as the legal duty of employers and higher education providers to make sure disabled students and workers are not substantially disadvantaged, and lists the move to college or university as a point to contact the institution, with consent. [[NICE2018F]]`],
  ['weak','Extended time in exams',`College students with more ADHD symptoms and executive-function problems benefited less from extended time, and students' own sense of needing more time did not predict benefit. [[Lovett2015]]`],
  ['safe','Diversion',`About 7% of all college students reported non-prescribed stimulant use. Sharing or selling prescribed stimulants is diversion. [[DuPaul2009College]] More in <a href="#safety" data-go="safety">Side effects, safety &amp; misuse</a>.`]]},
 work:{h:'The workplace',note:`US workplace law (the Americans with Disabilities Act) is not summarised here, because this guide's research did not include a validated source for it. UK disability law appears only as NICE's definition of reasonable adjustments.`,cards:[
  ['g','Rights to adjustments',`NICE says the discussion after diagnosis should cover employment issues, "for example, impact on career choices and rights to reasonable adjustments in the workplace". [[NICE2018F]]`],
  ['weak','Occupational health',`An international consensus found weak arrangements in the UK and elsewhere for work difficulties linked to adult ADHD, with occupational health used as a "last resort" rather than a way to make positive changes. [[Adamou2013]]`],
  ['pop','Income and work, on average',`People with ADHD had 17% lower annual income on average (ratio 0.83) in 1.2 million Swedes; [[Jangmo2021]] a US sibling comparison found 12% lower employment and 34% lower earnings. [[Faraone2021]] Group averages, not predictions.`],
  ['pop','Who carries the cost',`The US national annual excess cost of ADHD was estimated at US$143–266 billion (2010 dollars), mostly in adults and mainly productivity and income losses; family members carried $33–43 billion. [[Doshi2012]]`]]}
};
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');let who='teen',cover=true;
  const T=(x,y,c,v,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const steps=LV_PH.map(p=>({from:(p.h0-6)/18,at:(p.at-6)/18,t:p.n}));
  const hOf=t=>6+18*t;
  const phOf=h=>{let k=0;LV_PH.forEach((p,i)=>{if(h>=p.h0)k=i});return k};
  /* schematic cover of one long-acting morning dose taken at 07:15 */
  const cov=h=>ease(ramp(h,7.25,8.75))*(1-ease(ramp(h,15.5,20.5)))*.92;
  const INK='stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;fill:none';
  function headphones(x,y,r){return `<path d="M${f1(x-r)} ${f1(y+2)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+r)} ${f1(y+2)}" style="fill:none;stroke:var(--accent);stroke-width:3"/><rect x="${f1(x-r-3)}" y="${f1(y-1)}" width="6" height="9" rx="2" style="fill:var(--accent)"/><rect x="${f1(x+r-3)}" y="${f1(y-1)}" width="6" height="9" rx="2" style="fill:var(--accent)"/>`}
  function note(x,y,w,lines,c='var(--gold)'){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${12+lines.length*13}" rx="3" style="fill:var(--gold-soft);stroke:${c};stroke-width:1.2"/>`;
    lines.forEach((l,i)=>{s+=T(x+7,y+16+i*13,'t-xs',l,'fill:var(--ink)')});return s}
  function sceneAM(cx,gy,u){const L=who==='teen'?['Clothes','Bag and books','Medicine taken']:['Keys and wallet','Laptop','Medicine taken'];
    let s=`<rect x="${f1(cx+112)}" y="${f1(gy-112)}" width="48" height="112" rx="3" style="fill:var(--panel-2);stroke:var(--desk);stroke-width:2"/><circle cx="${f1(cx+150)}" cy="${f1(gy-56)}" r="3" style="fill:var(--desk)"/>`;
    s+=`<rect x="${f1(cx-160)}" y="${f1(gy-158)}" width="132" height="102" rx="6" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/>`+T(cx-150,gy-140,'t-sm','CHECKLIST','fill:var(--brand)');
    L.forEach((l,i)=>{const y=gy-118+i*24,done=u>(i+1)/4.2;
      s+=`<rect x="${f1(cx-150)}" y="${f1(y-10)}" width="13" height="13" rx="2" style="fill:${done?'var(--good-soft)':'var(--panel)'};stroke:${done?'var(--good)':'var(--muted)'};stroke-width:1.4"/>`;
      if(done)s+=`<path d="M${f1(cx-147)} ${f1(y-4)}l3.5 4l6 -8" style="fill:none;stroke:var(--good);stroke-width:2;stroke-linecap:round"/>`;
      s+=T(cx-131,y+1,'t-xs',l,`fill:var(--ink);${done?'opacity:.6':''}`)});
    s+=T(cx-94,gy-40,'t-xs t-mid','a written list (practical tip)');
    const px=lerp(cx+20,cx+96,ease(ramp(u,.55,1)));s+=person(px,gy-60,60,'var(--muted)');
    if(u>.4&&u<.8)s+=pill(cx+40,gy-74,22,who==='teen'?'er':'cap',{rot:-20});
    return s}
  function sceneDay(cx,gy,u,t){const fc=.25+.75*ramp(u,.1,.4),br=bump(u,.48,.68),ds=clamp(1-ramp(u,.05,.3))*.9;
    let s=desk(cx-40,gy,90,{focus:fc*(1-br),distract:ds,fidget:br*.9,t,fill:who==='teen'?'var(--muted)':'var(--neuron)'});
    const hx=cx-40-21,hy=gy-87;if(u>.18)s+=`<g style="opacity:${f1(ramp(u,.18,.3))}">${headphones(hx,hy,12)}</g>`+T(hx-20,hy-22,'t-xs t-mid','headphones');
    if(who==='adult')s+=`<rect x="${f1(cx-40+18)}" y="${f1(gy-74)}" width="30" height="20" rx="2" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(cx-40+14)} ${f1(gy-53)}H${f1(cx-40+52)}" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=note(cx+70,gy-168,110,who==='teen'?['1. Read page 12','2. Questions 1–5','3. Hand in at 2pm']:['1. Draft the report','2. Reply to Sam','3. Call at 3pm']);
    s+=T(cx+125,gy-103,'t-xs t-mid','written steps');
    if(br>.05)s+=`<g style="opacity:${f1(br)}">${bubble(cx-170,gy-200,118,28,'I need a break',{tx:cx-70,ty:gy-120,c:'var(--beh)'})}</g>`;
    s+=T(cx+125,gy-30,'t-xs t-mid',br>.3?'movement break':(u<.3?'fewer distractions':'focus'),`fill:${br>.3?'var(--beh)':'var(--accent)'}`);
    s+=T(cx-150,gy+16,'t-xs',who==='teen'?'Classroom':'Office','fill:var(--muted)');
    return s}
  function scenePM(cx,gy,u,t){let s=`<path d="M${f1(cx-180)} ${f1(gy)}H${f1(cx+180)}" style="stroke:var(--beh);stroke-width:3"/>`;
    [[-150,40],[150,34],[100,26]].forEach(([dx,r])=>{s+=`<line x1="${f1(cx+dx)}" x2="${f1(cx+dx)}" y1="${f1(gy)}" y2="${f1(gy-r-10)}" style="stroke:var(--desk);stroke-width:4"/><circle cx="${f1(cx+dx)}" cy="${f1(gy-r-18)}" r="${r*.6}" style="fill:var(--beh-soft);stroke:var(--beh)"/>`});
    const px=lerp(cx-130,cx+70,u),bob=Math.abs(Math.sin(t*Math.PI*60))*5,a=Math.sin(t*Math.PI*60)*.6;
    s+=`<circle cx="${f1(px)}" cy="${f1(gy-62-bob)}" r="7" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(px)} ${f1(gy-54-bob)}L${f1(px+4)} ${f1(gy-30-bob)}" style="${INK}"/>`;
    s+=`<path d="M${f1(px+4)} ${f1(gy-30-bob)}L${f1(px+4+Math.sin(a)*18)} ${f1(gy)}M${f1(px+4)} ${f1(gy-30-bob)}L${f1(px+4-Math.sin(a)*18)} ${f1(gy)}M${f1(px+2)} ${f1(gy-48-bob)}L${f1(px+2+Math.sin(-a)*14)} ${f1(gy-34-bob)}M${f1(px+2)} ${f1(gy-48-bob)}L${f1(px+2+Math.sin(a)*14)} ${f1(gy-34-bob)}" style="${INK}"/>`;
    s+=T(cx,gy+16,'t-xs t-mid','aerobic exercise · Early evidence for symptoms','fill:var(--beh)');
    if(u>.55)s+=`<g style="opacity:${f1(ramp(u,.55,.75))}">${note(cx-188,gy-176,138,['Label: avoid afternoon','doses of Adderall XR','and Vyvanse (insomnia)'],'var(--rx)')}</g>`;
    return s}
  function sceneTasks(cx,gy,u,t){let s=desk(cx-80,gy,80,{focus:.75,t,fill:who==='teen'?'var(--muted)':'var(--neuron)'});
    s+=`<path d="M${f1(cx-38)} ${f1(gy-46)}V${f1(gy-86)}L${f1(cx-58)} ${f1(gy-100)}" style="fill:none;stroke:var(--desk);stroke-width:3;stroke-linecap:round"/><path d="M${f1(cx-70)} ${f1(gy-96)}L${f1(cx-50)} ${f1(gy-108)}L${f1(cx-44)} ${f1(gy-92)}Z" style="fill:var(--gold)"/>`;
    const blk=u<.4?['focus',u/.4]:u<.5?['break',(u-.4)/.1]:u<.9?['focus',(u-.5)/.4]:['break',(u-.9)/.1],R=34,X=cx+90,Y=gy-118;
    const a=Math.PI*2*clamp(blk[1]),c=blk[0]==='focus'?'var(--accent)':'var(--beh)';
    s+=`<circle cx="${X}" cy="${Y}" r="${R}" style="fill:var(--panel);stroke:var(--line);stroke-width:6"/>`;
    if(a>.01)s+=`<path d="M${X} ${Y-R}A${R} ${R} 0 ${a>Math.PI?1:0} 1 ${f1(X+Math.sin(a)*R)} ${f1(Y-Math.cos(a)*R)}" style="fill:none;stroke:${c};stroke-width:6;stroke-linecap:round"/>`;
    s+=T(X,Y+4,'t-sm t-mid',blk[0]==='focus'?'focus block':'break',`fill:${c}`)+T(X,Y+R+18,'t-xs t-mid','short blocks, then a break');
    if(who==='teen')s+=note(cx+20,gy-56,124,['Planner: maths Q1–5','Science notes ✓'],'var(--accent)');
    else{s+=`<rect x="${f1(cx+28)}" y="${f1(gy-62)}" width="120" height="50" rx="4" style="fill:var(--panel);stroke:var(--line)"/>`+T(cx+36,gy-48,'t-xs','BILLS & ADMIN','fill:var(--brand)');
      for(let i=0;i<6;i++){const bx=cx+36+(i%3)*36,by=gy-40+Math.floor(i/3)*15,ok=u>(i+1)/7;s+=`<rect x="${bx}" y="${by}" width="30" height="11" rx="2" style="fill:${ok?'var(--good-soft)':'var(--panel-2)'};stroke:${ok?'var(--good)':'var(--line)'}"/>`}}
    return s}
  function sceneDrive(cx,gy,u,t){let s=`<rect x="${f1(cx-190)}" y="${f1(gy-46)}" width="380" height="46" style="fill:var(--panel-2)"/>`;
    const off=(t*4000)%60;for(let x=cx-190-off;x<cx+190;x+=60)s+=`<rect x="${f1(Math.max(cx-190,x))}" y="${f1(gy-25)}" width="${f1(Math.max(0,Math.min(30,cx+190-x,x+30-(cx-190))))}" height="4" style="fill:var(--gold)"/>`;
    const X=cx-70,Y=gy-30;
    s+=`<path d="M${X+100} ${Y-14}L${X+200} ${Y-34}L${X+200} ${Y+10}Z" style="fill:var(--gold);opacity:.22"/>`;
    s+=`<path d="M${X-50} ${Y+6}V${Y-14}Q${X-48} ${Y-20} ${X-36} ${Y-22}L${X-14} ${Y-42}H${X+44}L${X+70} ${Y-22}Q${X+96} ${Y-20} ${X+100} ${Y-10}V${Y+6}Z" style="fill:var(--dz-soft);stroke:var(--dz);stroke-width:2;stroke-linejoin:round"/>`;
    s+=`<path d="M${X-8} ${Y-38}H${X+18}V${Y-24}H${X-24}Z M${X+24} ${Y-38}H${X+42}L${X+60} ${Y-24}H${X+24}Z" style="fill:var(--panel);stroke:var(--dz);stroke-width:1.2"/>`;
    [X-24,X+72].forEach(wx=>{s+=`<circle cx="${wx}" cy="${Y+8}" r="11" style="fill:var(--ink)"/><circle cx="${wx}" cy="${Y+8}" r="4" style="fill:var(--panel-2)"/>`});
    const c=cov(hOf(t));s+=note(cx+40,gy-176,146,who==='teen'?['Newly licensed:','crash rate ratio 1.62','in the first month']:['Morning dose at 07:15;',`schematic cover now: ${Math.round(c*100)}%`,'plan with the prescriber'],'var(--dz)');
    s+=T(cx-150,gy-150,'t-xs','evening, after a morning dose','fill:var(--muted)');
    return s}
  function sceneSleep(cx,gy,u,t){let s=`<path d="M${f1(cx-170)} ${f1(gy)}V${f1(gy-70)}M${f1(cx+40)} ${f1(gy)}V${f1(gy-44)}M${f1(cx-170)} ${f1(gy-24)}H${f1(cx+40)}" style="stroke:var(--desk);stroke-width:4;stroke-linecap:round"/>`;
    s+=`<rect x="${f1(cx-166)}" y="${f1(gy-36)}" width="204" height="12" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><ellipse cx="${f1(cx-146)}" cy="${f1(gy-42)}" rx="15" ry="6" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${f1(cx-140)}" cy="${f1(gy-50)}" r="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/>`;
    s+=`<rect x="${f1(cx-128)}" y="${f1(gy-52)}" width="160" height="16" rx="7" style="fill:var(--ne-soft);stroke:var(--ne);stroke-width:1.4"/>`;
    for(let i=0;i<3;i++){const p=(u*3+i/3)%1;s+=T(cx-120+i*10+p*20,gy-66-p*60,'t-lbl','z',`fill:var(--ne);opacity:${f1(1-p)}`)}
    s+=note(cx+70,gy-150,118,['Sleep diary','Bed 22:30','Asleep ~23:10',who==='teen'?'Woke 06:45':'Woke 06:30'],'var(--ne)');
    s+=T(cx-66,gy+16,'t-xs t-mid','the same calm routine each night','fill:var(--ne)');
    return s}
  const SC=[sceneAM,sceneDay,scenePM,sceneTasks,sceneDrive,sceneSleep];
  let setStep=null;
  function draw(t){const N=vb(svg,'720 400','400 560'),h=hOf(t),k=phOf(h),P=LV_PH[k],u=clamp((h-P.h0)/(P.h1-P.h0)),D=P[who];
    const L=N?{cx:200,cy:52,cr:36,tx:100,sx0:16,sx1:384,gy:356,sy:112,bx0:16,bx1:384,by0:420,by1:470,ry:494,lab:[16,408]}:
      {cx:64,cy:62,cr:44,tx:132,sx0:132,sx1:710,gy:252,sy:70,bx0:132,bx1:710,by0:282,by1:326,ry:346,lab:[12,296]};
    if(N){L.cx=58;L.cy=56}
    const X=hh=>lerp(L.bx0,L.bx1,(hh-6)/18);let s='<defs></defs>';
    /* sky: sun by day, moon after dusk */
    const sx0=L.sx0+10,sx1=L.sx1-10,su=clamp((h-6)/14),sxx=lerp(sx0,sx1,su),syy=L.sy+34-Math.sin(Math.PI*su)*26;
    if(h<20)s+=`<circle cx="${f1(sxx)}" cy="${f1(syy)}" r="10" style="fill:var(--gold);opacity:${f1(1-ramp(h,19,20))}"/>`;
    if(h>19.5){const mu=clamp((h-19.5)/4.5),mx=lerp(sx0,sx1,mu),my=L.sy+34-Math.sin(Math.PI*(.3+mu*.5))*26;s+=`<g style="opacity:${f1(ramp(h,19.5,20.3))}"><circle cx="${f1(mx)}" cy="${f1(my)}" r="10" style="fill:var(--ne-soft);stroke:var(--ne)"/><circle cx="${f1(mx+5)}" cy="${f1(my-3)}" r="9" style="fill:var(--panel)"/></g>`;
      const rr=rng(4);for(let i=0;i<10;i++){const x=lerp(L.sx0+20,L.sx1-20,rr()),y=L.sy+rr()*40;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.2" style="fill:var(--ne);opacity:${f1(ramp(h,20,21)*.8)}"/>`}}
    /* clock and title */
    s+=clock(L.cx,L.cy,L.cr,h,{label:true,c:P.c});
    s+=T(L.tx,N?34:30,'t-big',N?P.nt:`${P.nt} · ${D.t}`)+T(L.tx,N?52:50,'t-sm',who==='teen'?'A teenager, 15, at school':'An adult, 34, at work');
    if(N)s+=T(L.tx,68,'t-xs',D.t,'fill:var(--ink)');
    /* scene */
    const scx=(L.sx0+L.sx1)/2+(N?10:0);
    s+=`<g>${SC[k](scx,L.gy,u,t)}</g>`;
    /* medicine-cover band */
    const bh=L.by1-L.by0;
    s+=`<rect x="${L.bx0}" y="${L.by0}" width="${L.bx1-L.bx0}" height="${bh}" rx="6" style="fill:var(--panel-2);opacity:.5"/>`;
    if(cover){const pts=[];for(let i=0;i<=72;i++){const hh=6+i/4;pts.push([hh,cov(hh)])}
      const tr=(arr,st)=>{const d=arr.map((p,i)=>(i?'L':'M')+f1(X(p[0]))+' '+f1(L.by1-p[1]*bh)).join('');return d};
      s+=`<path d="${tr(pts)}" style="fill:none;stroke:var(--rx);stroke-width:1.4;stroke-dasharray:3 3;opacity:.6"/>`;
      const up=pts.filter(p=>p[0]<=h);if(up.length>1)s+=`<path d="${tr(up)}L${f1(X(up[up.length-1][0]))} ${L.by1}L${f1(X(6))} ${L.by1}Z" style="fill:var(--rx);opacity:.16"/><path d="${tr(up)}" style="fill:none;stroke:var(--rx);stroke-width:2.4"/>`;
      s+=pill(X(7.25),L.by1-8,16,'er',{c:'var(--rx)'});
      const c=cov(h);s+=`<circle cx="${f1(X(h))}" cy="${f1(L.by1-c*bh)}" r="4" style="fill:var(--rx);stroke:var(--panel);stroke-width:1.5"/>`;
      s+=T(N?L.bx0:L.lab[0],N?L.lab[1]:L.lab[1],'t-xs',N?'Medicine cover, one long-acting morning dose (schematic)':'Medicine cover','fill:var(--rx)');
      if(!N)s+=T(L.lab[0],L.lab[1]+13,'t-xs','(schematic)','fill:var(--rx)');
    }else s+=T((L.bx0+L.bx1)/2,L.by0+bh/2+4,'t-xs t-mid','medicine-cover curve hidden');
    /* day ribbon */
    LV_PH.forEach((p,i)=>{const x0=X(p.h0),x1=X(p.h1);s+=`<rect x="${f1(x0+1)}" y="${L.ry}" width="${f1(x1-x0-2)}" height="18" rx="4" style="fill:${p.c};opacity:${i===k?.95:.28}"/>`;
      const lbN=(!N&&x1-x0>p.n.length*5.9+6)?p.n:p.n.split(' /')[0];if(x1-x0>lbN.length*5.9+6)s+=T((x0+x1)/2,L.ry+12.5,'t-xs t-mid',lbN,`fill:${i===k?'var(--panel)':'var(--ink)'};font-weight:600`)});
    for(let hh=6;hh<=24;hh+=3)s+=`<line x1="${f1(X(hh))}" x2="${f1(X(hh))}" y1="${L.ry+19}" y2="${L.ry+23}" class="axis"/>`+T(X(hh),L.ry+34,'t-xs t-mid',String(hh%24).padStart(2,'0')+':00');
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${L.by0-4}" y2="${L.ry+20}" style="stroke:var(--ink);stroke-width:1.2;opacity:.6"/><path d="M${f1(X(h)-5)} ${L.by0-10}h10l-5 7z" style="fill:var(--ink)"/>`;
    if(!N)s+=T(L.lab[0],L.ry+13,'t-xs','Day');
    svg.innerHTML=s;
    const hh=Math.floor(h)%24,mm=Math.floor((h%1)*60);
    $('#lvNote').innerHTML=noteHTML({k:`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')} · ${P.nt}`,t:D.t,txt:D.txt,pt:D.pt,hook:D.hook});
    $('#lvRead').innerHTML=`<span>Time <b>${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}</b></span><span>Part of the day <b>${P.nt}</b></span>`+(cover?`<span>Schematic cover <b>${Math.round(cov(h)*100)}%</b></span>`:'');
    if(lastK!==k||lastWho!==who){lastK=k;lastWho=who;
      $('#lvPlanH').textContent=`Strategies: ${P.nt.toLowerCase()} (${who==='teen'?'teenager':'adult'})`;
      $('#lvPlan').innerHTML=D.items.map(([lb,tx,go])=>`<li><div class="lv-lab">${LV_LAB[lb]}</div><span>${tx}</span>${go?`<a href="#${go}" data-go="${go}">${LV_MODT[go]} →</a>`:''}</li>`).join('')}
    setStep&&setStep(phaseOf(steps,t));
  }
  let lastK=-1,lastWho='';
  const stop=playWire(rg,$('#lvPlay'),draw,26000,'Replay','living');
  setStep=stepWire($('#lvSteps'),steps,rg,draw,stop);
  $$('[data-lvwho]').forEach(b=>b.addEventListener('click',()=>{who=b.dataset.lvwho;$$('[data-lvwho]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#lvCover').addEventListener('click',e=>{cover=!cover;e.currentTarget.setAttribute('aria-pressed',cover);draw(+rg.value)});
  draw(+rg.value);

  /* ---- settings: school, university, work ---- */
  function drawSet(k){const S=LV_SET[k];
    $('#lvSet').innerHTML=`<h4 class="kicker">${S.h}</h4>`+(S.note?`<p class="stage-cap">${S.note}</p>`:'')+`<div class="cards">${S.cards.map(([lb,h,tx])=>`<div class="card">${LV_LAB[lb]}<h4>${h}</h4><p>${tx}</p></div>`).join('')}</div>`}
  $$('[data-lvset]').forEach(b=>b.addEventListener('click',()=>{$$('[data-lvset]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawSet(b.dataset.lvset)}));
  drawSet('us');

  /* ---- driving bars ---- */
  const dsvg=$('#lvDrive');let med=false;
  function drawDrive(){const N=vb(dsvg,'520 300','400 340');const W=N?400:520,x0=N?150:190,x1=W-30,y0=40;
    const rows=med?[['Unadjusted',1.36,'var(--dz)'],['Mileage controlled',1.23,'var(--dz)'],['Men: months on medication',.62,'var(--rx)'],['Women: months on medication',.58,'var(--rx)']]:
      [['Unadjusted',1.36,'var(--dz)'],['Publication-bias corrected',1.29,'var(--dz)'],['Mileage controlled',1.23,'var(--dz)'],['With ODD or CD (most drivers)',1.86,'var(--warn)'],['Without ODD or CD',1.31,'var(--warn)']];
    const mx=4.4,Xv=v=>x0+(x1-x0)*v/mx,rh=N?44:40;let s='';
    for(let v=0;v<=4;v++)s+=`<line x1="${f1(Xv(v))}" x2="${f1(Xv(v))}" y1="${y0-8}" y2="${y0+rows.length*rh}" class="grid"/>`+`<text x="${f1(Xv(v))}" y="${y0-14}" class="t-xs t-mid">${v}×</text>`;
    s+=`<line x1="${f1(Xv(1))}" x2="${f1(Xv(1))}" y1="${y0-8}" y2="${y0+rows.length*rh}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    s+=`<rect x="${f1(x0)}" y="${y0+rows.length*rh+6}" width="${f1(Xv(4)-x0)}" height="16" rx="3" style="fill:none;stroke:var(--muted);stroke-dasharray:4 3"/><text x="${f1(Xv(4)-6)}" y="${y0+rows.length*rh+18}" class="t-xs t-end">older "fourfold" claim, rejected</text>`;
    rows.forEach(([l,v,c],i)=>{const y=y0+i*rh;s+=`<text x="${x0-8}" y="${y+rh/2}" class="t-xs t-end" style="fill:var(--ink)">${l}</text><rect x="${f1(x0)}" y="${y+rh/2-11}" width="${f1(Xv(v)-x0)}" height="16" rx="3" style="fill:${c};opacity:.85"/><text x="${f1(Xv(v)+6)}" y="${y+rh/2+1}" class="t-sm" style="fill:var(--ink)">${v.toFixed(2)}</text>`});
    s+=`<text x="16" y="${y0-26}" class="t-sm" style="fill:var(--brand)">${med?'CRASH RISK, AND ODDS ON VERSUS OFF MEDICATION':'CRASH RELATIVE RISK, DRIVERS WITH ADHD'}</text>`;
    dsvg.innerHTML=s}
  $('#lvDrvMed').addEventListener('click',e=>{med=!med;e.currentTarget.setAttribute('aria-pressed',med);drawDrive()});
  drawDrive();

  /* ---- pregnancy charts ---- */
  const psvg=$('#lvPreg');let rr=false;
  function drawPreg(){const N=vb(psvg,'520 330','400 380');const W=N?400:520,x0=20,x1=W-20;let s='';
    s+=`<text x="${x0}" y="22" class="t-sm" style="fill:var(--brand)">AROUND PREGNANCY, DENMARK (4,717)</text>`;
    const seg=[['Continued',23.3,'var(--rx)'],['Stopped',41.8,'var(--muted)'],['Paused, restarted',17.2,'var(--gold)'],['Started after birth',17.7,'var(--ne)']];let cx=x0;
    seg.forEach(([l,v,c],i)=>{const w=(x1-x0)*v/100;s+=`<rect x="${f1(cx)}" y="34" width="${f1(w-2)}" height="30" rx="3" style="fill:${c};opacity:.85"/><text x="${f1(cx+w/2)}" y="54" class="t-sm t-mid" style="fill:var(--panel);font-weight:700">${v}%</text>`;
      const ly=N?82+Math.floor(i/2)*16:82,lx=N?x0+(i%2)*(W/2-10):cx;s+=`<rect x="${f1(lx)}" y="${ly-8}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${f1(lx+13)}" y="${ly}" class="t-xs" style="fill:var(--ink)">${l}</text>`;cx+=w});
    const top=N?140:122;
    s+=`<text x="${x0}" y="${top}" class="t-sm" style="fill:var(--brand)">${rr?'ADJUSTED RELATIVE RISK, FIRST TRIMESTER':'MAJOR MALFORMATIONS PER 1000 INFANTS (US MEDICAID)'}</text>`;
    const bars=rr?[['Methylphenidate, any',1.11,.91,1.35],['Methylphenidate, cardiac*',1.28,1.00,1.64],['Amphetamines, any',1.05,.93,1.19],['Amphetamines, cardiac*',.96,null,null]]:[['Unexposed',35.0],['Methylphenidate',45.9],['Amphetamines',45.4]];
    const bx0=N?150:180,bx1=x1-40,mx=rr?2:60,Xv=v=>bx0+(bx1-bx0)*v/mx,rh=34;
    if(rr){[0,.5,1,1.5,2].forEach(v=>{s+=`<line x1="${f1(Xv(v))}" x2="${f1(Xv(v))}" y1="${top+12}" y2="${top+14+bars.length*rh}" class="${v===1?'axis':'grid'}"/><text x="${f1(Xv(v))}" y="${top+28+bars.length*rh}" class="t-xs t-mid">${v}</text>`});
      s+=`<line x1="${f1(Xv(1))}" x2="${f1(Xv(1))}" y1="${top+12}" y2="${top+14+bars.length*rh}" style="stroke:var(--ink);stroke-width:1.4"/>`}
    bars.forEach(([l,v,lo,hi],i)=>{const y=top+18+i*rh;s+=`<text x="${bx0-8}" y="${y+12}" class="t-xs t-end" style="fill:var(--ink)">${l}</text>`;
      if(rr){if(lo!=null)s+=`<line x1="${f1(Xv(lo))}" x2="${f1(Xv(hi))}" y1="${y+8}" y2="${y+8}" style="stroke:var(--rx);stroke-width:2"/>`;s+=`<circle cx="${f1(Xv(v))}" cy="${y+8}" r="5" style="fill:var(--rx)"/><text x="${f1(Xv(lo!=null?hi:v)+8)}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${v.toFixed(2)}${lo!=null?` (${lo.toFixed(2)}–${hi.toFixed(2)})`:''}</text>`}
      else s+=`<rect x="${bx0}" y="${y}" width="${f1(Xv(v)-bx0)}" height="16" rx="3" style="fill:${i?'var(--rx)':'var(--muted)'};opacity:.8"/><text x="${f1(Xv(v)+6)}" y="${y+12}" class="t-sm" style="fill:var(--ink)">${v.toFixed(1)}</text>`});
    if(rr)s+=`<text x="${x0}" y="${top+46+bars.length*rh}" class="t-xs">* cardiac: US and Nordic data pooled; amphetamine cardiac CI not given here</text>`;
    else s+=`<text x="${x0}" y="${top+30+bars.length*rh}" class="t-xs">Unadjusted counts; adjusted relative risks were not significant</text>`;
    psvg.innerHTML=s}
  $('#lvPregRR').addEventListener('click',e=>{rr=!rr;e.currentTarget.setAttribute('aria-pressed',rr);drawPreg()});
  drawPreg();
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawDrive();drawPreg()};
};
