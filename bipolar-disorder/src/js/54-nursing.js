/* =============== 5.4 Nursing care =============== */
const NU_STEPS=[
 {from:0,at:.07,k:'09:00 · admission',t:'Safety first: assessment and observation',
  txt:`The first priority is the physical and psychological safety of the person and others. [[NICE2014CG185,NICE-NG10]] NICE NG10 sets four observation levels, from low-level intermittent (every 30–60 minutes) to continuous (within eyesight or arm's length of a designated nurse). At least once each shift a nurse should set aside time to assess mental state and engage positively with the person, and observation lasting a week or more needs a multidisciplinary review. [[NICE-NG10]] Here the nurse starts at arm's length.`,
  pt:`On arrival, staff stay close and keep everyone safe while they get to know the person.`,
  hook:`NG10 observation: low intermittent 30–60 min; high intermittent 15–30 min; continuous = eyesight or arm's length. [[NICE-NG10]]`},
 {from:.17,at:.25,k:'11:00 · the room',t:'A calm, low-stimulation environment',
  txt:`NICE says people with mania or hypomania should have "access to calming environments and reduced stimulation". It also advises them not to make important decisions until they recover, and encourages them to keep up relationships with carers. [[NICE2014CG185]] Watch the light, noise and number of people fall. On 31 wards, the ten Safewards staff-patient interventions reduced conflict by 15% and containment by 23.2%. [[Bowers2015]]`,
  pt:`Less noise, softer light and fewer people help a racing mind slow down.`,
  hook:`Mania nursing: calming environment, reduced stimulation, no major decisions until recovered. [[NICE2014CG185]]`},
 {from:.33,at:.42,k:'13:00 · body needs',t:'Fluids, food and the lithium label',
  txt:`A person who is too active to sit, eat or rest can become dehydrated, and dehydration matters doubly with lithium. The lithium label advises a normal diet including salt and adequate fluid (2500–3500 mL) "at least during the initial stabilization period", and warns that volume depletion, fever and changes in sodium raise the risk of toxicity. [[FDA-Lithobid]] After rapid tranquillisation, NG10 lists the level of hydration among the signs to monitor. [[NICE-NG10]] The observation level steps down to intermittent checks.`,
  pt:`Drinks and easy food are offered often, because someone who cannot sit still may forget to eat and drink.`,
  hook:`Priority order in teaching: safety → physiological needs (fluids, food, sleep) → calm environment and de-escalation → teaching and discharge. [[NICE2014CG185,NICE-NG10,FDA-Lithobid]]`},
 {from:.5,at:.56,k:'16:00 · escalation',t:'De-escalation before restriction',
  txt:`Agitation rises. The Project BETA consensus sets four aims: keep the patient, staff and others safe; help the patient manage emotions and regain control; avoid restraint when at all possible; and avoid coercion that escalates agitation. Its approach is to verbally engage, build a collaborative relationship, then verbally de-escalate. [[Richmond2012]] NICE NG10: use restrictive interventions only when de-escalation has failed, keep trying to de-escalate throughout, never use them to punish, and do not routinely use manual restraint for more than 10 minutes. [[NICE-NG10]]`,
  pt:`Staff talk calmly, listen and offer choices. Holding or sedating someone is a last resort.`,
  hook:`After rapid tranquillisation (NG10): pulse, BP, respiratory rate, temperature, hydration and consciousness at least hourly; every 15 minutes if higher risk. [[NICE-NG10]]`},
 {from:.67,at:.76,k:'23:00 · night',t:'Protecting sleep',
  txt:`Sleep loss can trigger a switch into mania, and mania reduces sleep: a proposed self-reinforcing loop (<span class="ev hyp">Hypothesis</span>, supported by sleep-deprivation data). [[Wehr1987]] Sleep disturbance is the most robust early warning sign of mania, in a median 77% of people. [[Jackson2003]] A dark, quiet ward at night follows the same calming-environment principle; here observation steps down to low-level intermittent checks. [[NICE2014CG185,NICE-NG10]]`,
  pt:`Sleep is part of treatment. A dark, quiet night helps the mood come down.`,
  hook:`Most robust early sign of mania: sleep disturbance (median 77%). [[Jackson2003]]`},
 {from:.83,at:.97,k:'Later · recovery',t:'Recovery and discharge planning',
  txt:`NICE says discharge plans should include recovery goals, a crisis plan with early warning signs and triggers, a mental-state assessment, and a medication plan with review dates and monitoring; the person and GP each get a copy. Consider intensive case management for people likely to disengage. [[NICE2014CG185]] Suicide rates are highest in the first 3 months after discharge, so follow-up contact should be arranged before the person leaves (population statistics). [[Chung2017JAMAPsych,Mann2021Suicide]]`,
  pt:`Before going home, the person leaves with a written plan, a follow-up appointment and people to call.`,
  hook:`Post-discharge suicide rate is highest in the first 3 months: 1132 per 100,000 person-years. [[Chung2017JAMAPsych]]`}
];
const NU_LI=[
 {k:'Toxicity',q:'Which signs can mean lithium toxicity?',a:`The label's boxed warning: toxicity "can occur at doses close to therapeutic levels". Mild: fine tremor, lightheadedness, lack of coordination, weakness. Moderate: drowsiness, ataxia, blurred vision, tinnitus, slurred speech. Severe: confusion, seizure, coma. Also nausea, vomiting and diarrhoea. Suspected toxicity is an emergency; there is no specific antidote. [[FDA-Lithobid]]`},
 {k:'Fluids & salt',q:'What does the label say about fluid and salt?',a:`Keep a normal diet including salt, with adequate fluid intake (2500–3500 mL) "at least during the initial stabilization period". Protracted sweating or diarrhoea lowers tolerance. [[FDA-Lithobid]] NICE: maintain fluid intake after sweating (exercise, heat, fever) or long immobility. [[NICE2014CG185]]`},
 {k:'Sick days',q:'What should happen with vomiting, diarrhoea or fever?',a:`NICE tells people taking lithium to seek medical attention if they develop diarrhoea or vomiting or become acutely ill. [[NICE2014CG185]] The label lists febrile illness, volume depletion or dehydration among the things that raise the risk of toxicity. [[FDA-Lithobid]]`},
 {k:'Pain relief',q:'Can someone on lithium take ibuprofen from a shop?',a:`NICE says to warn people taking lithium not to take over-the-counter NSAIDs. [[NICE2014CG185]] The label says lithium levels should be closely monitored when NSAIDs are started or stopped. [[FDA-Lithobid]] In an older-adult cohort NSAIDs were not independently significant, but caution remains standard teaching. [[Juurlink2004]]`},
 {k:'Other medicines',q:'Which other medicines can raise lithium levels?',a:`The label: sodium loss from diuretics, ACE inhibitors and ARBs may increase serum lithium. [[FDA-Lithobid]] In people aged 66 and over, starting an ACE inhibitor (RR 7.6) or a loop diuretic (RR 5.5) raised the risk of admission for lithium toxicity within a month. [[Juurlink2004]]`},
 {k:'Blood test timing',q:'When is the blood sample for a lithium level taken?',a:`The label: just before the next dose, 8–12 hours after the previous one; maintenance levels "at least every two months" in uncomplicated cases. [[FDA-Lithobid]] NICE: 1 week after starting and after every dose change, weekly until stable, then every 3 months in the first year and every 6 months after (3-monthly for higher-risk groups). Initial target for people new to lithium: 0.6–0.8 mmol/L. [[NICE2014CG185]]`},
 {k:'6-monthly checks',q:'What else does NICE list for regular checks?',a:`Every 6 months: weight or BMI, urea and electrolytes including calcium, eGFR and thyroid function. At every appointment: signs of neurotoxicity (paraesthesia, ataxia, tremor, cognitive impairment), which "can occur at therapeutic levels". [[NICE2014CG185]]`},
 {k:'Stopping',q:'What does NICE say about stopping lithium?',a:`If lithium is stopped, reduce it gradually over at least 4 weeks and preferably up to 3 months, with close monitoring for early signs of mania and depression for 3 months afterwards. Any change is planned with the prescriber. [[NICE2014CG185]]`},
 {k:'Pregnancy',q:'What if someone is planning a pregnancy?',a:`NICE tells people taking lithium to talk to their doctor promptly about pregnancy or pregnancy plans. Plan with the care team; do not stop or start a medicine on your own. [[NICE2014CG185]] More in Part 4.3, Pregnancy &amp; the postpartum period.`},
 {k:'Alertness',q:'Is driving affected?',a:`The label cautions that lithium "may impair mental and/or physical abilities" and advises care with activities that need alertness, such as driving. [[FDA-Lithobid]]`}
];
const NU_MON={
 ap:{cols:['Baseline','Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 12','Dose change','Yearly'],ncols:['Base','1','2','3','4','5','6','12','Δ dose','Year'],
  rows:[['Weight / BMI',[1,1,1,1,1,1,1,1,0,1]],['Pulse & blood pressure',[1,0,0,0,0,0,0,0,1,1]],['Glucose or HbA1c',[1,0,0,0,0,0,0,1,0,1]],['Lipids',[1,0,0,0,0,0,0,1,0,1]],['Liver, renal, thyroid, calcium',[0,0,0,0,0,0,0,0,0,1]]],
  prac:{t:'BASELINE CHECKS IN ROUTINE PRACTICE (39 STUDIES)',b:[['Blood pressure',69.8,null],['Weight',47.9,75.9],['Glucose',44.3,56.1],['Cholesterol / lipids',41.5,28.9]],leg:['before guidelines','after guidelines']},
  cap:'NICE CG185: record weight or BMI, pulse, blood pressure, fasting glucose or HbA1c and lipids before starting an antipsychotic; pulse and blood pressure after each dose change; weight weekly for 6 weeks and at 12 weeks; glucose and lipids at 12 weeks. The yearly column is the annual physical health check. [[NICE2014CG185]] Practice bars: [[Mitchell2012Monitoring]]'},
 li:{cols:['Week 1','Weekly to stable','3 months','6 months','9 months','12 months','18 months','24 months','Dose change','Each visit'],ncols:['Wk 1','Wkly','3 m','6 m','9 m','12 m','18 m','24 m','Δ dose','Visit'],
  rows:[['Lithium level',[1,1,1,1,1,1,1,1,1,0]],['Weight / BMI',[0,0,0,1,0,1,1,1,0,0]],['U&amp;E incl. calcium, eGFR',[0,0,0,1,0,1,1,1,0,0]],['Thyroid function',[0,0,0,1,0,1,1,1,0,0]],['Neurotoxicity signs',[0,0,0,0,0,0,0,0,0,1]]],
  prac:{t:'NICE STANDARD MET, UK AUDIT (ON LITHIUM ≥1 YEAR)',b:[['Lithium level',30,null],['Renal function',55,null],['Thyroid function',50,null]],leg:['standard met']},
  cap:'NICE CG185: lithium level 1 week after starting and after each dose change, weekly until stable, then 3-monthly in year 1 and 6-monthly after (3-monthly if higher risk); weight, U&E with calcium, eGFR and thyroid every 6 months; neurotoxicity at every appointment. The US label says to sample 8–12 hours after the last dose, at least every two months in uncomplicated maintenance. [[NICE2014CG185,FDA-Lithobid]] Audit bars: [[Collins2010]]'}
};
const NU_Q=[
 {q:'A man taking lithium has had vomiting and diarrhoea for two days. Today he is unsteady and his speech is slurred. What is the first action?',
  o:['Give his next lithium dose and recheck the level tomorrow','Treat this as possible lithium toxicity and get urgent medical review','Encourage oral fluids and reassess at the end of the shift','Teach him about a balanced diet'],a:1,
  e:`Unsteadiness (ataxia) and slurred speech are moderate signs of toxicity on the label, and volume depletion raises the risk. Suspected toxicity is an emergency, and NICE tells people on lithium to seek medical attention with diarrhoea or vomiting. [[FDA-Lithobid,NICE2014CG185]]`},
 {q:'A woman with mania is shouting at other patients in a busy day room. No one has been hurt and she has no object in her hands. What comes first?',
  o:['Manual restraint by the team','Request rapid tranquillisation','Approach calmly, engage her verbally and offer a quieter space','Tell her she will lose privileges if she continues'],a:2,
  e:`Project BETA: verbally engage, build collaboration, then de-escalate, and avoid coercion that escalates agitation. NG10: restrictive interventions only when de-escalation has failed, and never as punishment. NICE CG185 also supports reduced stimulation. [[Richmond2012,NICE-NG10,NICE2014CG185]]`},
 {q:'After rapid tranquillisation, which monitoring plan matches NICE NG10?',
  o:['Pulse, blood pressure, respiratory rate, temperature, hydration and consciousness at least hourly (every 15 minutes if higher risk)','A check at the next medication round','Blood pressure once, then only if she complains','No monitoring needed if she is asleep'],a:0,
  e:`NG10 recommendation 1.4.45 lists pulse, blood pressure, respiratory rate, temperature, level of hydration and level of consciousness, at least every hour until there are no further concerns, and every 15 minutes in higher-risk situations. [[NICE-NG10]]`},
 {q:'A man with mania has slept about 2 hours a night for 3 nights and has not sat down to eat today. Which need comes first?',
  o:['Attending the afternoon education group','Fluids, easy food and a quiet place to rest','Discharge teaching about his medicines','A trip to the hospital shop to burn off energy'],a:1,
  e:`In the teaching priority order, physiological needs (sleep, nutrition and hydration in a person too active to eat or rest) come right after safety, before education and discharge planning. The lithium label's fluid advice and NICE's calming-environment advice support this. [[NICE2014CG185,NICE-NG10,FDA-Lithobid]]`},
 {q:'A woman admitted with bipolar depression and suicidal thoughts is going home tomorrow. What matters most before she leaves?',
  o:['Give her a leaflet and tell her to call if needed','Arrange a follow-up contact and a written crisis plan before discharge','Book a routine review in 6 months','Ask her family to watch her at all times'],a:1,
  e:`The first 3 months after discharge carry the highest suicide rate, highest of all in people admitted with suicidal thoughts. Active follow-up should be routine, and NICE discharge plans include a crisis plan. [[Chung2017JAMAPsych,Mann2021Suicide,NICE2014CG185]]`},
 {q:'A man taking lithium asks for ibuprofen for back pain. What is the best first response?',
  o:['Give it: it is sold over the counter','Explain that NSAIDs can raise lithium levels and check with the prescriber or pharmacist first','Tell him to double his fluid intake and take it','Advise him to skip his lithium that day'],a:1,
  e:`NICE says to warn people taking lithium not to take over-the-counter NSAIDs, and the label says levels should be closely monitored when NSAIDs are started or stopped. Skipping lithium is never a fix. [[NICE2014CG185,FDA-Lithobid]]`}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  const HK=[[0,8],[.17,11],[.33,13],[.5,16],[.67,22],[.83,30]];
  const hour=t=>{if(t>=.83)return 10;for(let i=1;i<HK.length;i++)if(t<=HK[i][0]){const a=HK[i-1],b=HK[i];return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return 30};
  const hh=h=>{h=((h%24)+24)%24;return String(Math.floor(h)).padStart(2,'0')+':'+String(Math.floor((h%1)*60)).padStart(2,'0')};
  const PRI=['1 · Safety','2 · Fluids, food, sleep','3 · Calm space, de-escalation','4 · Teaching, discharge'];
  const PRI_ON=[[0],[2],[1],[0,2],[1],[3]];
  function room(R,S,t){let s='';const fy=R.y+R.h*.8,night=S.night;
    s+=`<rect x="${R.x}" y="${R.y}" width="${R.w}" height="${R.h}" rx="10" style="fill:${night>.5?'var(--night)':'var(--panel-2)'};opacity:${night>.5?.35:1}"/><rect x="${R.x}" y="${R.y}" width="${R.w}" height="${R.h}" rx="10" style="fill:none;stroke:var(--line)"/>`;
    s+=`<line x1="${R.x}" x2="${R.x+R.w}" y1="${f1(fy)}" y2="${f1(fy)}" style="stroke:var(--line);stroke-width:1.5"/>`;
    /* window */
    const wx=R.x+R.w-86,wy=R.y+14;s+=`<rect x="${wx}" y="${wy}" width="64" height="42" rx="4" style="fill:${night>.5?'var(--night)':'var(--day)'};opacity:.85;stroke:var(--line)"/><line x1="${wx+32}" x2="${wx+32}" y1="${wy}" y2="${wy+42}" style="stroke:var(--line)"/>`;
    if(night>.5)s+=`<circle cx="${wx+46}" cy="${wy+14}" r="7" style="fill:var(--day)"/><circle cx="${wx+50}" cy="${wy+12}" r="6" style="fill:var(--night)"/>`;
    /* ceiling light: rays = stimulation */
    const lx=R.x+R.w*.42,ly=R.y+12,nr=Math.round(S.stim*7);
    s+=`<line x1="${lx}" x2="${lx}" y1="${R.y}" y2="${ly}" style="stroke:var(--muted)"/><circle cx="${lx}" cy="${ly+5}" r="7" style="fill:${night>.5?'var(--panel-2)':'var(--day)'};stroke:var(--muted)"/>`;
    for(let i=0;i<nr;i++){const a=Math.PI*(.15+.7*i/Math.max(1,6));s+=`<line x1="${f1(lx+12*Math.cos(a))}" y1="${f1(ly+5+12*Math.sin(a))}" x2="${f1(lx+26*Math.cos(a))}" y2="${f1(ly+5+26*Math.sin(a))}" style="stroke:var(--up-fill);stroke-width:2;stroke-linecap:round;opacity:.8"/>`}
    /* noise: a speaker with arcs */
    const sx=R.x+16,sy=R.y+30,na=Math.round(S.stim*3.4);s+=`<rect x="${sx}" y="${sy}" width="14" height="20" rx="3" style="fill:var(--muted);opacity:.7"/>`;
    for(let i=1;i<=na;i++)s+=`<path d="M${sx+18+i*6} ${sy+2-i*2}Q${sx+26+i*8} ${sy+10} ${sx+18+i*6} ${sy+18+i*2}" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(.9-i*.15)}"/>`;
    /* other people: fewer as stimulation falls */
    const np=Math.round(S.stim*3);for(let i=0;i<np;i++)s+=person(R.x+22+i*20,fy-34,34,'var(--muted)',{op:.45});
    /* table and glass */
    const gx=R.x+R.w*.2,gy=fy-30;s+=`<rect x="${f1(gx-18)}" y="${f1(gy+18)}" width="40" height="5" rx="2" style="fill:var(--muted)"/><line x1="${f1(gx-12)}" x2="${f1(gx-12)}" y1="${f1(gy+23)}" y2="${f1(fy)}" style="stroke:var(--muted);stroke-width:2"/><line x1="${f1(gx+16)}" x2="${f1(gx+16)}" y1="${f1(gy+23)}" y2="${f1(fy)}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="M${f1(gx-6)} ${f1(gy-4)}L${f1(gx-4)} ${f1(gy+18)}H${f1(gx+8)}L${f1(gx+10)} ${f1(gy-4)}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(gx-4.5)}" y="${f1(gy+18-20*S.hyd)}" width="13" height="${f1(20*S.hyd)}" style="fill:var(--na);opacity:.55"/>`;
    /* bed */
    const bx=R.x+R.w-112,by=fy-22;s+=`<rect x="${bx}" y="${by}" width="96" height="16" rx="4" style="fill:var(--cell);stroke:var(--muted)"/><rect x="${bx}" y="${by-14}" width="6" height="30" rx="2" style="fill:var(--muted)"/><rect x="${bx+6}" y="${by-6}" width="20" height="8" rx="4" style="fill:var(--panel);stroke:var(--line)"/>`;
    /* patient */
    let px;if(S.sleep){px=bx+48;s+=`<ellipse cx="${bx+54}" cy="${by-3}" rx="36" ry="7" style="fill:var(--accent);opacity:.7"/><circle cx="${bx+16}" cy="${by-6}" r="7" style="fill:var(--accent)"/>`;
      s+=`<text x="${bx+62}" y="${by-16}" class="t-sm" style="fill:var(--muted)">z z</text>`}
    else{const amp=R.w*.16*S.agit;px=(S.dis?R.x+R.w*.46:R.x+R.w*.52)+amp*Math.sin(t*170);s+=person(px,fy-46,46,'var(--accent)');
      const nz=Math.round(S.agit*4);for(let i=0;i<nz;i++){const zx=px-14+i*9;s+=`<path d="M${f1(zx)} ${f1(fy-54)}l3 -6l3 6l3 -6" style="fill:none;stroke:var(--accent);stroke-width:1.4"/>`}
      if(S.dis)s+=`<rect x="${f1(px+12)}" y="${f1(fy-22)}" width="20" height="16" rx="3" style="fill:var(--accent-soft);stroke:var(--accent)"/><path d="M${f1(px+17)} ${f1(fy-22)}v-4h10v4" style="fill:none;stroke:var(--accent)"/>`}
    /* nurse at the observation distance */
    const nx=S.obs==='cont'?(S.sleep?bx-20:px+30):R.x+R.w*.08+(S.obs==='low'?0:6),op=S.obs==='low'?.45+.55*Math.max(0,Math.sin(t*90)):1;
    s+=person(nx,fy-44,44,'var(--rx)',{op});
    s+=`<text x="${f1(nx)}" y="${f1(fy+14)}" class="t-xs t-mid" style="fill:var(--rx)">nurse</text>`;
    if(S.obs==='cont'&&!S.sleep)s+=`<path d="M${f1(Math.min(px,nx)+6)} ${f1(fy+4)}H${f1(Math.max(px,nx)-6)}" style="stroke:var(--rx);stroke-width:1.2;stroke-dasharray:2 3"/>`;
    s+=`<text x="${R.x+10}" y="${R.y+R.h-8}" class="t-xs">observation: ${S.obs==='cont'?'continuous, arm’s length':S.obs==='high'?'high-level intermittent, 15–30 min':'low-level intermittent, 30–60 min'}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 410','400 640'),ph=phaseOf(NU_STEPS,t),h=hour(t);
    const night=ramp(t,.66,.69)*(1-ramp(t,.82,.84)),dis=t>=.83;
    let agit=.8-.15*ramp(t,.17,.3);agit+=.3*bump(t,.5,.6);agit*=1-.6*ramp(t,.56,.65);agit*=1-.6*ramp(t,.67,.75);if(dis)agit=.08;
    const S={stim:dis?.3:lerp(1,.3,ease(ramp(t,.17,.3)))*(1-.7*night),hyd:lerp(.3,.85,ease(ramp(t,.33,.47))),agit:clamp(agit),night,sleep:night>.5&&t>.7,dis,
      obs:ph<=1?'cont':ph===2?'high':ph===3?(t<.6?'cont':'high'):'low'};
    const slp=dis?6.5:2+4.5*ramp(t,.7,.8),ready=ramp(t,.85,.97);
    const L=N?{ck:[80,94,62],m:{x:166,y:30,w:216},rm:{x:16,y:196,w:368,h:214},pr:{x:16,y:438,w:368,h:184}}
             :{ck:[116,118,84],m:{x:494,y:40,w:212},rm:{x:226,y:30,w:252,h:232},pr:{x:16,y:300,w:690,h:104}};
    let s='';
    /* clock */
    const [cx,cy,r]=L.ck,ck=clock24(cx,cy,r,{sleep:ph>=4?[23,6]:[2,4],h:h,small:N});
    s+=ck.svg+`<text x="${cx}" y="${cy+r+18}" class="t-big t-mid">${dis?'Day 12':hh(h)}</text><text x="${cx}" y="${cy+r+32}" class="t-xs t-mid">${dis?'illustrative':ph>=4?'planned sleep in blue':'sleep: about 2 hours'}</text>`;
    /* room */
    s+=room(L.rm,S,t);
    /* gauges */
    const G=[['Stimulation',S.stim,'var(--up-fill)',''],['Hydration',S.hyd,'var(--na)',''],['Agitation',S.agit,'var(--accent)',''],['Sleep last night',slp/8,'var(--night)',f1(slp)+' h'],['Ready for discharge',ready,'var(--good)','']];
    const gh=N?26:34;s+=`<text x="${L.m.x}" y="${L.m.y-10}" class="t-sm">GAUGES · SCHEMATIC</text>`;
    G.forEach(([n,v,c,lab],i)=>{const y=L.m.y+i*gh;s+=`<text x="${L.m.x}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${n}${lab?' · '+lab:''}</text><rect x="${L.m.x}" y="${y+13}" width="${L.m.w}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${L.m.x}" y="${y+13}" width="${f1(Math.max(3,L.m.w*clamp(v)))}" height="7" rx="3.5" style="fill:${c}"/>`});
    /* priority stack */
    const P=L.pr,on=PRI_ON[ph];
    s+=`<text x="${P.x}" y="${P.y-8}" class="t-sm">NURSING PRIORITY ORDER · CURRENT FOCUS HIGHLIGHTED</text>`;
    PRI.forEach((p,i)=>{let x,y,w,hh2;if(N){w=(P.w-10)/2;hh2=(P.h-24)/2;x=P.x+(i%2)*(w+10);y=P.y+4+Math.floor(i/2)*(hh2+10)}else{w=(P.w-36)/4;hh2=P.h-30;x=P.x+i*(w+12);y=P.y+4}
      const hi=on.includes(i);s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(hh2)}" rx="10" style="fill:${hi?'var(--brand-soft)':'var(--panel)'};stroke:${hi?'var(--brand)':'var(--line)'};stroke-width:${hi?2:1}"/>`;
      const [a,b]=p.split(' · '),ci=b.lastIndexOf(', '),bl=b.length>16?[b.slice(0,ci+1),b.slice(ci+2)]:[b];s+=`<text x="${f1(x+w/2)}" y="${f1(y+hh2/2-8)}" class="t-big t-mid" style="fill:${hi?'var(--brand)':'var(--muted)'}">${a}</text>`;
      bl.forEach((q,k)=>{s+=`<text x="${f1(x+w/2)}" y="${f1(y+hh2/2+10+k*13)}" class="t-xs t-mid" style="fill:${hi?'var(--ink)':'var(--muted)'};font-size:${N?10:11}px">${q}</text>`});
      if(!N&&i<3)s+=`<path d="M${f1(x+w+2)} ${f1(y+hh2/2)}h8" style="stroke:var(--muted);stroke-width:1.5" marker-end="url(#nuAr)"/>`});
    s=`<defs>${marker('nuAr','var(--muted)')}</defs>`+s;
    svg.innerHTML=s;
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,28000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- lithium flip set ---- */
  const fl=$('#nuFlips');
  fl.innerHTML=NU_LI.map((c,i)=>`<button class="nu-flip" type="button" data-fl="${i}" aria-pressed="false"><span class="k">${String(i+1).padStart(2,'0')} · ${c.k}</span><span class="q">${c.q}</span><span class="a">${c.a}</span><span class="hint">Tap to see the answer</span></button>`).join('');
  fl.addEventListener('click',e=>{if(e.target.closest('a[data-go]'))return;const b=e.target.closest('[data-fl]');if(!b||e.target.closest('sup.c'))return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});
  $('#nuAll').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'Hide all answers':'Show all answers';$$('[data-fl]',fl).forEach(b=>b.setAttribute('aria-pressed',on))});

  /* ---- monitoring schedules ---- */
  const mon=$('#nuMon');let mk='ap',stopM=null;
  function drawM(p){const M=NU_MON[mk],nb=M.prac.b.length,nn=NARROW(),bh=nn&&M.prac.b.some(b=>b[2]!=null)?38:26;
    const L=nn?{lx:10,c0:152,c1:388,hy:44,r0:62,rh:36,py:292}:{lx:16,c0:236,c1:700,hy:40,r0:58,rh:34,py:270};
    const H=L.py+16+nb*bh+(M.prac.leg.length>1?22:4);const N=vb(mon,'720 '+H,'400 '+H);
    let s='';const n=M.cols.length,X=j=>lerp(L.c0,L.c1,j/(n-1));
    s+=`<text x="${L.lx}" y="16" class="t-sm" style="fill:var(--accent)">${mk==='ap'?'ANTIPSYCHOTIC: NICE CG185':'LITHIUM: NICE CG185'}</text>`;
    M.cols.forEach((c,j)=>{s+=`<text x="${f1(X(j))}" y="${L.hy}" class="t-xs t-mid" style="fill:var(--ink)">${M.ncols[j]}<title>${c}</title></text>`});
    s+=`<text x="${L.c1}" y="${L.hy-16}" class="t-xs t-end">${mk==='ap'?'weeks after starting · Δ = each dose change':'Wkly = weekly until stable · m = months · Δ = each dose change'}</text>`;
    const tot=M.rows.reduce((a,r)=>a+r[1].filter(Boolean).length,0);let k=0;
    M.rows.forEach(([nm,v],i)=>{const y=L.r0+i*L.rh+L.rh/2;
      s+=`<rect x="${L.lx-4}" y="${f1(y-L.rh/2+3)}" width="${f1(L.c1-L.lx+16)}" height="${L.rh-6}" rx="6" style="fill:${i%2?'none':'var(--field)'}"/>`;
      s+=`<text x="${L.lx}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-size:${N?9:10.5}px">${N&&nm.length>22?nm.replace('Liver, renal, thyroid, calcium','Liver/renal/thyroid/Ca').replace('U&amp;E incl. calcium, eGFR','U&amp;E, Ca, eGFR'):nm}</text>`;
      v.forEach((on,j)=>{if(!on)return;k++;const a=clamp(p*tot-k+1);if(a<=0)return;const dc=M.cols[j]==='Dose change',ev=M.cols[j]==='Each visit'||M.cols[j]==='Weekly to stable';
        s+=dc?`<path d="M${f1(X(j))} ${f1(y-8*a)}L${f1(X(j)+8*a)} ${f1(y)}L${f1(X(j))} ${f1(y+8*a)}L${f1(X(j)-8*a)} ${f1(y)}Z" style="fill:var(--accent)"/>`
             :ev?`<g style="opacity:${f1(a)}">${[-8,0,8].map(d=>`<circle cx="${f1(X(j)+d)}" cy="${f1(y)}" r="3.4" style="fill:var(--rx)"/>`).join('')}</g>`
             :`<circle cx="${f1(X(j))}" cy="${f1(y)}" r="${f1(7*a)}" style="fill:var(--rx)"/>`})});
    if(mk==='li'){const y=L.r0+L.rh/2;s+=`<text x="${f1((X(6)+X(7))/2)}" y="${f1(y-12)}" class="t-xs t-mid" style="fill:var(--accent)">3-monthly if higher risk</text>`}
    s+=`<text x="${L.lx}" y="${f1(L.r0+M.rows.length*L.rh+16)}" class="t-xs">${N?'● check  ◆ after dose change  ●●● repeated':'● scheduled check  ◆ after each dose change  ●●● repeated (weekly or every visit)'}</text>`;
    /* practice bars */
    const Pp=M.prac,bx=N?150:236,bw=N?200:380;s+=`<text x="${L.lx}" y="${L.py}" class="t-sm">${Pp.t}</text>`;
    Pp.b.forEach(([nm,v,v2],i)=>{const y=L.py+16+i*bh;s+=`<text x="${L.lx}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${nm}</text><rect x="${bx}" y="${y}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y}" width="${f1(bw*v/100*p)}" height="12" rx="3" style="fill:var(--muted)"/><text x="${f1(bx+bw*v/100*p+5)}" y="${y+10}" class="t-xs">${f1(v*p)}%</text>`;
      if(v2!=null){const y2=N?y+16:y;const xx=bx+bw*v2/100*p;s+=N?`<rect x="${bx}" y="${y2}" width="${f1(bw*v2/100*p)}" height="10" rx="3" style="fill:var(--accent)"/><text x="${f1(xx+5)}" y="${y2+9}" class="t-xs" style="fill:var(--accent)">${f1(v2*p)}%</text>`
        :`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-3}" y2="${y+15}" style="stroke:var(--accent);stroke-width:3"/><text x="${f1(xx)}" y="${y-5}" class="t-xs t-mid" style="fill:var(--accent)">${f1(v2*p)}</text>`}});
    if(Pp.leg.length>1)s+=`<text x="${L.lx}" y="${H-6}" class="t-xs"><tspan style="fill:var(--muted)">■ ${Pp.leg[0]}</tspan>   <tspan style="fill:var(--accent)">${N?'■':'|'} ${Pp.leg[1]}</tspan></text>`;
    mon.innerHTML=s;$('#nuMonCap').innerHTML=M.cap}
  function setM(k){mk=k;$$('[data-mon]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mon===k));if(stopM)stopM();drawM(1);stopM=animate(900,p=>drawM(p))}
  $$('[data-mon]').forEach(b=>b.addEventListener('click',()=>setM(b.dataset.mon)));
  drawM(1);

  /* ---- priority sorter ---- */
  const qz=$('#nuQuiz'),ans=NU_Q.map(()=>null);let qi=0;
  function drawQ(){const Q=NU_Q[qi],a=ans[qi],score=ans.filter((x,i)=>x===NU_Q[i].a).length,done=ans.filter(x=>x!=null).length;
    qz.innerHTML=`<div class="qcard"><div class="kicker">Scenario ${qi+1} of ${NU_Q.length} · score ${score}/${done}</div><div class="bar"><i style="width:${f1(100*done/NU_Q.length)}%"></i></div><div class="q">${Q.q}</div>
      <div class="opts" role="group" aria-label="Choose the first action">${Q.o.map((o,j)=>`<button class="opt${a==null?'':j===Q.a?' right':j===a?' wrong':''}" data-op="${j}" aria-pressed="${a===j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div>
      ${a==null?'':`<div class="expl"><b>${a===Q.a?'Correct.':'Not first.'}</b> The first action is ${'ABCD'[Q.a]}. ${Q.e}</div>`}
      <div class="nu-nav"><button class="btn" id="nuPrev" ${qi?'':'disabled'}>Previous</button><button class="btn primary" id="nuNext">${qi<NU_Q.length-1?'Next scenario':'Start again'}</button></div></div>`}
  qz.addEventListener('click',e=>{const o=e.target.closest('[data-op]');
    if(o){ans[qi]=+o.dataset.op;drawQ();return}
    if(e.target.closest('#nuPrev')&&qi>0){qi--;drawQ();return}
    if(e.target.closest('#nuNext')){if(qi<NU_Q.length-1)qi++;else{qi=0;ans.fill(null)}drawQ()}});
  drawQ();
  const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();drawM(1)};
};
