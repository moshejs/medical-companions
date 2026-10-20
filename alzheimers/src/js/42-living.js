/* =============== 4.2 living with dementia and caregiving =============== */
const LV_STEPS=[
 {from:0,at:.1,k:'1 of 7 · After the diagnosis',t:'Being told',
  txt:`In a review of 23 studies (9,065 respondents), 90.7% of people without memory problems and 84.8% of people referred to memory clinics or already diagnosed said they would want to be told a dementia diagnosis. The main reasons were autonomy and the chance to plan. [[vandenDungen2014]] Early on, trouble remembering recent conversations, names or events is common, often with apathy or low mood. [[AA2025Facts]]`,
  pt:'Most people say they would want to know. Knowing early leaves time for the person to make their own choices while they can still lead them.',
  hook:'About 9 in 10 people say they would want to be told a dementia diagnosis. Reasons given: autonomy and planning.'},
 {from:1/7,at:1/7+.1,k:'2 of 7 · Planning ahead',t:'Legal and money plans',
  txt:`NICE NG97 recommends offering early and ongoing chances to plan ahead: lasting power of attorney (health and welfare, and property and financial affairs), advance statements, advance decisions to refuse treatment, and preferences for place of care and death. It also lists information on legal rights, including reasonable adjustments at work. [[NICE2018]] Money trouble can come before the diagnosis: people later diagnosed with dementia were more likely to miss credit payments as early as 6 years before (7.7% vs 7.3%). [[Nicholas2021]]`,
  pt:'Legal and money plans are easiest to make early, while the person can still say what they want. Unexplained missed bills can be an early sign of change.',
  hook:'NICE NG97: offer advance care planning early and revisit it. Lasting power of attorney comes in two types: health and welfare, and property and financial affairs.'},
 {from:2/7,at:2/7+.1,k:'3 of 7 · Driving',t:'Driving and the road test',
  txt:`A 2017 meta-analysis found people with dementia far more likely than healthy controls to fail an on-road driving test (RR 10.77, 95% CI 3.00 to 38.62). Data on real crashes were equivocal: one study found 4 times more crashes, another found no significant increase. [[Chee2017]] The American Academy of Neurology found the Clinical Dementia Rating useful for identifying higher risk (Level A), and a caregiver's rating of driving as marginal or unsafe useful (Level B). The driver's own rating of safe driving was not useful. [[Iverson2010]] In the UK, NICE says clinicians should explain that the person must tell the DVLA and their car insurer about the diagnosis. [[NICE2018]]`,
  pt:'On a road test, drivers with dementia fail much more often. Studies of real crashes disagree. A family member\'s view of the driving told researchers more than the driver\'s own.',
  hook:'AAN 2010 driving parameter: CDR is a Level A predictor, caregiver rating of marginal or unsafe driving Level B, and the patient\'s self-rating is not useful.'},
 {from:3/7,at:3/7+.1,k:'4 of 7 · Home safety and falls',t:'Safety at home',
  txt:`In a 12-month study, people with dementia fell nearly 8 times as often as controls (9,118 vs 1,023 falls per 1,000 person-years). Lewy body disorders, earlier falls, dizziness on standing, other autonomic symptoms and depression predicted falls; physical activity was protective. [[Allan2009]] In the COPE trial (237 families), training in home safety, simpler tasks and stress reduction lowered functional dependence at 4 months, but the difference was gone by 9 months. [[Gitlin2010]] In ATTILA (495 people), a full assistive technology and telecare package did not significantly delay moving into care compared with a basic one. [[Gathercole2021]] No strong study was found that measured home changes on their own. As the illness moves on, help is needed with basic activities such as dressing and bathing. [[Jack2024,Reisberg1988]]`,
  pt:'Falls are much more common in dementia. Training families helped for a few months. Extra gadgets alone did not keep people at home longer in the largest trial.',
  hook:'Falls in dementia: about 8 times the rate of controls (Allan 2009). COPE benefits for the person had faded by 9 months.'},
 {from:4/7,at:4/7+.1,k:'5 of 7 · Getting lost',t:'Getting lost',
  txt:`The Alzheimer's Association estimates that 35% to 60% of people with dementia will wander at least once. That range comes from advocacy and NCOA web pages rather than an epidemiological study, so it is approximate. [[AA2025Facts]] In UK police data, getting lost affected 0.5% of a region's dementia population over 4 years; 5% of incidents involved significant harm, more often in winter and with longer time missing. [[BantryWhite2015]] Of 156 missing drivers with dementia in Florida, 5% died, 15% were found in dangerous situations and 10% in another state. [[Rowe2012]] Most missing incidents began during normal, permitted activities, and the people who died were found closer to where they were last seen. [[Rowe2011]]`,
  pt:'Getting lost usually starts with an ordinary walk or drive. In one study, the people who died were found closer to where they had last been seen.',
  hook:'Researchers separate "missing incidents" from "wandering": most missing episodes start during normal, purposeful activity (Rowe 2011).'},
 {from:5/7,at:5/7+.1,k:'6 of 7 · Moving care',t:'Care transitions',
  txt:`About 65% of older US adults with dementia live in the community, against 98% of those without dementia; of those in the community, 26% live alone. 46% of nursing-home residents have dementia (58% of long-stay residents). About two-thirds of people who die from dementia die in a nursing home, against 20% of people with cancer. [[AA2025Facts]] NICE recommends reviewing the person's needs and advance care plans after every transition, including moves into a care home or respite. [[NICE2018]] By this point many people need help with most basic activities. [[Jack2024]]`,
  pt:'Most people live at home for much of the illness, but many move into care later on. Each move is a moment to look at the plans again.',
  hook:'NICE NG97: review needs and advance care plans after every care transition.'},
 {from:6/7,at:6/7+.1,k:'7 of 7 · End of life',t:'Advanced dementia and comfort',
  txt:`In CASCADE, 323 nursing-home residents with advanced dementia were followed for 18 months. 54.8% died; 85.8% had an eating problem, 52.6% a febrile episode and 41.1% pneumonia. Six-month mortality after pneumonia was 46.7%. 40.7% had at least one burdensome intervention in their last 3 months. When the family proxy understood the prognosis and the expected complications, those interventions were much less likely (adjusted OR 0.12). [[Mitchell2009NEJM]] The American Geriatrics Society does not recommend feeding tubes in advanced dementia; careful hand feeding is considered as good for death, aspiration pneumonia, function and comfort. [[AGS2014]] A Cochrane review found no evidence that tube feeding improves survival, quality of life or nutrition. [[Davies2021]] NICE recommends palliative care from the time of diagnosis, and says tube feeding should not be used routinely in severe dementia. [[NICE2018]]`,
  pt:'In the last stage, trouble eating and infections are expected parts of the illness, not sudden failures of care. Residents whose families understood this ahead of time had far fewer burdensome hospital-type treatments.',
  hook:'CASCADE: eating problems (85.8%) were the most common complication of advanced dementia. AGS 2014: feeding tubes are not recommended; careful hand feeding is the alternative.'}
];
const LV_NAMES=['Diagnosis','Planning','Driving','Home safety','Getting lost','Moving care','End of life'];
const LV_CHG=['recent memory, apathy, low mood','complex tasks like money get harder','confusion, poor judgement','help with dressing and bathing','confusion, changes in behaviour','help with most basic activities','walking, speaking and swallowing'];
/* figure panel for each point: bars (max), a checklist, or a range */
const LV_FIG=[
 {t:'Would want to be told the diagnosis',max:100,foot:'Review of 23 studies, 9,065 respondents',
  it:[{l:'People without memory problems',v:90.7,s:'90.7%'},{l:'People at memory clinics or diagnosed',v:84.8,s:'84.8%'}]},
 {t:'Planning topics NICE lists',check:['Lasting power of attorney: health and welfare','Lasting power of attorney: property and finance','Advance statements','Advance decision to refuse treatment','Preferred place of care and of death','Rights at work, incl. reasonable adjustments'],
  foot:'Missed payments rise up to 6 years before diagnosis'},
 {t:'Compared with drivers without dementia',max:11,foot:'2017 meta-analysis: crash data are equivocal',
  it:[{l:'Fail an on-road driving test',v:10.77,s:'≈10.8×',c:'var(--rose)'},{l:'Crashes, one study',v:4,s:'4×',c:'var(--amber)'},{l:'Crashes, another study',v:1,s:'no clear rise',c:'var(--amber)'}]},
 {t:'Falls per 1,000 person-years',max:9118,foot:'Nearly 8 times as many falls (ratio 7.58)',
  it:[{l:'People with dementia',v:9118,s:'9,118',c:'var(--rose)'},{l:'Controls without dementia',v:1023,s:'1,023'}]},
 {t:'Getting lost',max:60,foot:'Drivers: 156 Florida Silver Alert cases',
  it:[{l:'Will wander at least once (advocacy estimate)',range:[35,60],s:'35–60%',c:'var(--amber)'},{l:'Missing drivers: found in danger',v:15,s:'15%',c:'var(--rose)'},{l:'Missing drivers: found in another state',v:10,s:'10%',c:'var(--rose)'},{l:'Missing drivers: died',v:5,s:'5%',c:'var(--rose)'}]},
 {t:'Where people live and die (US)',max:100,foot:'46% of nursing-home residents have dementia',
  it:[{l:'Live in the community: with dementia',v:65,s:'65%'},{l:'Live in the community: without dementia',v:98,s:'98%',c:'var(--muted)'},{l:'Die in a nursing home: dementia',v:66.7,s:'≈2 in 3',c:'var(--rose)'},{l:'Die in a nursing home: cancer',v:20,s:'20%',c:'var(--muted)'}]},
 {t:'Advanced dementia in nursing homes, 18 months',max:100,foot:'Feeding tubes: not recommended in advanced dementia (AGS)',
  it:[{l:'Eating problems',v:85.8,s:'85.8%',c:'var(--rose)'},{l:'Febrile episodes',v:52.6,s:'52.6%',c:'var(--amber)'},{l:'Pneumonia',v:41.1,s:'41.1%',c:'var(--amber)'},{l:'Died during the 18 months',v:54.8,s:'54.8%',c:'var(--muted)'}]}
];
const lvPerson=(x,y,c='var(--sage)',f='var(--sage-soft)')=>`<circle cx="${f1(x)}" cy="${f1(y-28)}" r="10" style="fill:${f};stroke:${c};stroke-width:2"/><path d="M${f1(x-16)} ${f1(y+14)} v-14 q0 -14 16 -14 q16 0 16 14 v14 z" style="fill:${f};stroke:${c};stroke-width:2"/>`;
function lvFig(F,x,y,w,u){
  let s=`<text x="${x}" y="${y}" class="t-lbl">${F.t}</text>`;let yy=y+30;
  if(F.check){const n=F.check.length;
    F.check.forEach((c,i)=>{const k=ease(ramp(u,.06+i*.45/n,.3+i*.45/n));
      s+=`<rect x="${x}" y="${yy-12}" width="15" height="15" rx="3" style="fill:var(--panel);stroke:var(--sage);stroke-width:1.5"/>`;
      if(k>0)s+=`<path d="M${x+3} ${yy-5} l4 4 l6 -9" pathLength="1" style="fill:none;stroke:var(--sage);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:${f1(1-k)}"/>`;
      s+=`<text x="${x+24}" y="${yy}" class="t-sm" style="fill:var(--ink);opacity:${f1(.35+.65*k)}">${c}</text>`;yy+=25});
  }else{const n=F.it.length,bw=w-112;
    F.it.forEach((it,i)=>{const k=ease(ramp(u,.06+i*.45/n,.3+i*.45/n)),c=it.c||'var(--sage)';
      s+=`<text x="${x}" y="${yy}" class="t-sm" style="fill:var(--ink)">${it.l}</text>`;
      s+=`<rect x="${x}" y="${yy+6}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--panel-2)"/>`;
      let end;
      if(it.range){const a=x+bw*it.range[0]/F.max,b=x+bw*it.range[1]/F.max;end=lerp(a,b,k);
        s+=`<rect x="${f1(a)}" y="${yy+6}" width="${f1(Math.max(0,end-a))}" height="14" rx="4" style="fill:${c};opacity:.45;stroke:${c};stroke-width:1.5;stroke-dasharray:4 3"/>`;
      }else{end=x+bw*it.v/F.max*k;s+=`<rect x="${x}" y="${yy+6}" width="${f1(Math.max(0,end-x))}" height="14" rx="4" style="fill:${c}"/>`}
      s+=`<text x="${f1(end+6)}" y="${yy+18}" class="t-lbl" style="opacity:${f1(k)}">${it.s}</text>`;yy+=40});
  }
  if(F.foot)s+=`<text x="${x}" y="${yy+(F.check?6:0)}" class="t-xs" style="opacity:${f1(ramp(u,.5,.7))}">${F.foot}</text>`;
  return s}
/* one small scene per point, drawn around (cx,cy) inside about 220 x 190 */
function lvScene(i,u,cx,cy){let s='';
  if(i===0){ // a conversation at a table
    s+=`<rect x="${cx-46}" y="${cy+18}" width="92" height="8" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><path d="M${cx-34} ${cy+26}v44M${cx+34} ${cy+26}v44" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=lvPerson(cx-72,cy+40)+lvPerson(cx-112,cy+52,'var(--sage)','var(--panel)')+lvPerson(cx+74,cy+40,'var(--sky)','var(--sky-soft)');
    const left=u<.5,bx=left?cx-92:cx+8,k=left?ramp(u,.05,.4):ramp(u,.55,.9);
    s+=`<g style="opacity:${f1(Math.min(1,k*3))}"><rect x="${bx}" y="${cy-84}" width="84" height="38" rx="14" style="fill:var(--panel);stroke:${left?'var(--sage)':'var(--sky)'};stroke-width:1.6"/><path d="M${left?bx+22:bx+60} ${cy-46} l${left?-6:6} 14 l${left?12:-12} -14" style="fill:var(--panel);stroke:${left?'var(--sage)':'var(--sky)'};stroke-width:1.6"/>`;
    for(let d=0;d<3;d++)if(k>d*.3)s+=`<circle cx="${bx+26+d*16}" cy="${cy-65}" r="4" style="fill:${left?'var(--sage)':'var(--sky)'}"/>`;
    s+=`</g><text x="${cx-112}" y="${cy+84}" class="t-xs t-mid">family</text>`;
  }else if(i===1){ // a plan being signed
    s+=`<rect x="${cx-62}" y="${cy-86}" width="124" height="160" rx="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    for(let l=0;l<6;l++){const k=ramp(u,.06+l*.075,.3+l*.075);s+=`<path d="M${cx-46} ${cy-62+l*18} h${f1(70*(.4+.6*k))}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/><circle cx="${cx+40}" cy="${cy-62+l*18}" r="4" style="fill:${k>.95?'var(--sage)':'var(--panel-2)'}"/>`}
    const sg=ramp(u,.55,.95);
    s+=`<path d="M${cx-44} ${cy+54} c10 -18 16 8 26 -6 s10 -14 18 0 s12 10 22 -4 s8 -6 18 4" pathLength="1" style="fill:none;stroke:var(--sky);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:${f1(1-sg)}"/><path d="M${cx-48} ${cy+62}h96" style="stroke:var(--muted);stroke-width:1"/>`;
  }else if(i===2){ // a car on a test route
    s+=`<rect x="${cx-108}" y="${cy+16}" width="216" height="44" rx="6" style="fill:var(--panel-2)"/>`;
    for(let k=0;k<7;k++){const x=cx-108+((k*40-u*200)%280+280)%280;if(x<cx+86)s+=`<rect x="${f1(x)}" y="${cy+36}" width="22" height="4" rx="2" style="fill:var(--panel)"/>`}
    s+=`<path d="M${cx-46} ${cy+8} l12 -22 h50 l16 22 z" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/><rect x="${cx-58}" y="${cy+6}" width="116" height="24" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/>`;
    s+=`<circle cx="${cx-32}" cy="${cy+32}" r="9" style="fill:var(--ink)"/><circle cx="${cx+32}" cy="${cy+32}" r="9" style="fill:var(--ink)"/>`;
    s+=`<path d="M${cx+78} ${cy+14} v-62" style="stroke:var(--muted);stroke-width:2.5"/><rect x="${cx+44}" y="${cy-80}" width="68" height="32" rx="5" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/><text x="${cx+78}" y="${cy-67}" class="t-xs t-mid" style="fill:var(--ink)">ROAD</text><text x="${cx+78}" y="${cy-55}" class="t-xs t-mid" style="fill:var(--ink)">TEST</text>`;
  }else if(i===3){ // a house with a light on
    const glow=.35+.35*Math.sin(u*Math.PI*4)**2;
    s+=`<path d="M${cx-90} ${cy-30} L${cx} ${cy-92} L${cx+90} ${cy-30}" style="fill:none;stroke:var(--muted);stroke-width:2.5;stroke-linejoin:round"/><rect x="${cx-76}" y="${cy-34}" width="152" height="118" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    s+=`<circle cx="${cx-36}" cy="${cy-6}" r="26" style="fill:var(--amber);opacity:${f1(glow*.5)}"/><path d="M${cx-46} ${cy-14} h20 l-4 -12 h-12 z" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/><path d="M${cx-36} ${cy-14} v40 M${cx-44} ${cy+26}h16" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="M${cx+20} ${cy+14} h44" style="stroke:var(--sage);stroke-width:4;stroke-linecap:round"/><path d="M${cx+24} ${cy+14}v8M${cx+60} ${cy+14}v8" style="stroke:var(--sage);stroke-width:3"/>`;
    s+=lvPerson(cx+lerp(4,30,ease(ramp(u,.2,.8))),cy+70);
  }else if(i===4){ // a street map with a path
    s+=`<rect x="${cx-104}" y="${cy-84}" width="208" height="168" rx="8" style="fill:var(--panel-2)"/>`;
    for(let k=0;k<4;k++){s+=`<path d="M${cx-104} ${cy-60+k*40}h208" style="stroke:var(--panel);stroke-width:9"/><path d="M${cx-80+k*54} ${cy-84}v168" style="stroke:var(--panel);stroke-width:9"/>`}
    const P=`M${cx-80} ${cy+60} H${cx-26} V${cy+20} H${cx+28} V${cy-20} H${cx+82} V${cy-60}`,k=ramp(u,.08,.75);
    s+=`<rect x="${cx-92}" y="${cy+50}" width="24" height="20" rx="3" style="fill:var(--sage)"/><text x="${cx-80}" y="${cy+84}" class="t-xs t-mid" style="fill:var(--ink)">home</text>`;
    s+=`<path d="${P}" pathLength="1" style="fill:none;stroke:var(--rose);stroke-width:3;stroke-dasharray:1;stroke-dashoffset:${f1(1-k)}"/>`;
    if(k>.35)s+=`<circle cx="${cx-26}" cy="${cy+20}" r="6" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/><text x="${cx-34}" y="${cy+6}" class="t-xs t-end" style="fill:var(--ink)">last seen</text>`;
    const pin=ease(ramp(u,.72,.9));if(pin>0)s+=`<g transform="translate(${cx+82} ${f1(cy-60-30*(1-pin))})" style="opacity:${f1(pin)}"><path d="M0 0 C-12 -14 -12 -30 0 -30 C12 -30 12 -14 0 0Z" style="fill:var(--rose)"/><circle cy="-20" r="4" style="fill:var(--panel)"/></g>`;
  }else if(i===5){ // home to a care home
    s+=`<path d="M${cx-108} ${cy+6} L${cx-72} ${cy-24} L${cx-36} ${cy+6}" style="fill:none;stroke:var(--muted);stroke-width:2.2;stroke-linejoin:round"/><rect x="${cx-100}" y="${cy+4}" width="56" height="52" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/><rect x="${cx-80}" y="${cy+28}" width="16" height="28" style="fill:var(--sage-soft)"/>`;
    s+=`<rect x="${cx+6}" y="${cy-30}" width="100" height="86" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    for(let r=0;r<3;r++)for(let c=0;c<4;c++)s+=`<rect x="${cx+16+c*22}" y="${cy-20+r*22}" width="12" height="12" style="fill:${(r*4+c)%3?'var(--panel-2)':'var(--amber-soft)'}"/>`;
    s+=`<text x="${cx-72}" y="${cy+74}" class="t-xs t-mid">home</text><text x="${cx+56}" y="${cy+74}" class="t-xs t-mid">care home</text>`;
    const k=ease(ramp(u,.1,.8)),P0=[cx-60,cy-30],P1=[cx-14,cy-110],P2=[cx+40,cy-38];
    s+=`<path d="M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" class="arrow" style="stroke-dasharray:4 4"/>`;
    const bx=(1-k)*(1-k)*P0[0]+2*(1-k)*k*P1[0]+k*k*P2[0],by=(1-k)*(1-k)*P0[1]+2*(1-k)*k*P1[1]+k*k*P2[1];
    s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="8" style="fill:var(--sage);stroke:var(--panel);stroke-width:2"/>`;
  }else{ // comfort at the bedside
    s+=`<rect x="${cx-104}" y="${cy-20}" width="10" height="70" rx="3" style="fill:var(--muted)"/><rect x="${cx-96}" y="${cy+14}" width="140" height="22" rx="4" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><path d="M${cx-96} ${cy+36}v16M${cx+40} ${cy+36}v16" style="stroke:var(--muted);stroke-width:3"/>`;
    s+=`<ellipse cx="${cx-74}" cy="${cy+6}" rx="18" ry="9" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/><circle cx="${cx-72}" cy="${cy-2}" r="10" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/><path d="M${cx-60} ${cy+14} q50 -24 104 0" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    s+=lvPerson(cx+82,cy+36,'var(--sky)','var(--sky-soft)');
    const sp=Math.sin(u*Math.PI*3);
    s+=`<path d="M${cx+24} ${cy-46} h36 a18 12 0 0 1 -36 0z" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/><g transform="rotate(${f1(-20+12*sp)} ${cx+50} ${cy-52})"><path d="M${cx+50} ${cy-52} l26 -16" style="stroke:var(--muted);stroke-width:2.5;stroke-linecap:round"/><ellipse cx="${cx+48}" cy="${cy-51}" rx="5" ry="3" style="fill:var(--muted)"/></g>`;
    s+=`<text x="${cx+42}" y="${cy-72}" class="t-xs t-mid">hand feeding</text>`;
    const h=.8+.2*Math.sin(u*Math.PI*6);
    s+=`<path transform="translate(${cx+12} ${cy-14}) scale(${f1(h)})" d="M0 6 C-12 -4 -8 -14 0 -8 C8 -14 12 -4 0 6Z" style="fill:var(--rose);opacity:.8"/>`;
  }
  return s}

const LV_IV=[
 {from:0,at:.12,k:'<span class="ev est">Established</span> · RCT, 642 carers',t:'REACH II: carer depression fell',
  txt:`REACH II enrolled 642 Hispanic or Latino, White and Black or African American carers in 5 US cities. Twelve home and telephone sessions over 6 months improved carer quality of life and lowered the prevalence of clinical depression from 22.7% to 12.6% (P=0.001). It did not change moves into institutional care at 6 months. [[Belle2006]]`,
  pt:'A structured programme of home and phone sessions roughly halved the share of carers who were clinically depressed.'},
 {from:.2,at:.32,k:'<span class="ev est">Established</span> · RCT, 406 spouse carers',t:'NYU: placement came later',
  txt:`The NYU Caregiver Intervention gave spouse carers individual and family counselling, support groups and on-demand telephone counselling. The rate of nursing-home placement fell by 28.3% (HR 0.717), and the model-predicted median time to placement was 557 days longer. Better satisfaction with social support, better responses to behaviour problems and fewer carer depressive symptoms explained 61.2% of the effect. [[Mittelman2006]]`,
  pt:'Supporting the spouse kept the person with dementia at home for longer, about a year and a half longer in the trial\'s model.',
  hook:'NYU Caregiver Intervention: about 557 days longer to nursing-home placement (Mittelman 2006).'},
 {from:.4,at:.52,k:'<span class="ev est">Established</span> · RCT, 260 carers',t:'START: benefit lasted 6 years',
  txt:`START was an 8-session, manual-based coping programme delivered by supervised psychology graduates. At 8 months the carers' anxiety and depression score (HADS) was 1.80 points lower and case-level depression less likely (OR 0.24). [[Livingston2013]] It had a greater than 99% probability of being cost-effective at £30,000 per QALY. [[Knapp2013]] The difference was still there at 2 years (−2.58) [[Livingston2014]] and at 6 years (−2.00), without higher costs; time to care-home admission did not differ significantly. [[Livingston2020]] NICE recommends offering carers psychoeducation and skills training. [[NICE2018]]`,
  pt:'Eight sessions of practical coping skills left carers less anxious and depressed for at least six years, and did not cost more.',
  hook:'START: 8 sessions, cost-effective, carer mental health still better at 6 years (Livingston 2020).'},
 {from:.6,at:.72,k:'<span class="ev early">No effect shown</span> · Cochrane, 4 trials',t:'Respite: not proven either way',
  txt:`A Cochrane review found 4 trials of respite care with 753 participants, all very low quality evidence. It found no demonstrated benefits or harms for carers. The authors say this probably reflects a lack of good research rather than proof that respite does not help. [[Maayan2014]]`,
  pt:'Breaks for carers have hardly been studied well. "We have no good evidence it helps" is not the same as "it does not help".',
  hook:'Absence of evidence is not evidence of absence: respite has no demonstrated effect in Cochrane, mainly because good trials are missing.'},
 {from:.8,at:.92,k:'<span class="ev hyp">No outcomes yet</span> · CMS model',t:'GUIDE: launched, not yet tested',
  txt:`CMS launched GUIDE (Guiding an Improved Dementia Experience) on 1 July 2024 as an 8-year Medicare model. It includes a care navigator, carer training and support, a 24/7 support line, and respite up to $2,500 per eligible person per year, with monthly payments tiered by complexity and carer strain. [[CMS2024GUIDE]] Reported participation varies by source and date: 390 organisations, "more than 300", and 292 on the current CMS page. No outcome results from GUIDE have been published. [[AA2025Facts,AA2026Facts,CMS2024GUIDE]]`,
  pt:'GUIDE is a new US Medicare programme that pays for dementia care coordination and carer support. Whether it helps is not known yet.'}
];

inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');
  function draw(t){
    const N=vb(svg,'720 430','400 660');
    const L=N?{x0:30,x1:370,ty:30,cl:92,c0:104,c1:150,chg:176,div:190,scx:200,scy:300,fx:20,fy:430,fw:360}
             :{x0:60,x1:660,ty:30,cl:86,c0:96,c1:148,chg:172,div:186,scx:140,scy:305,fx:282,fy:214,fw:420};
    const st=Math.min(6,Math.floor(t*7)),u=ramp(t,st/7,(st+1)/7);
    const pos=st===0?0:(st-1)+ease(ramp(u,0,.22)),gap=(L.x1-L.x0)/6,mx=L.x0+pos*gap;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // the track of seven points
    s+=`<path d="M${L.x0} ${L.ty}H${L.x1}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><path d="M${L.x0} ${L.ty}H${f1(mx)}" style="stroke:var(--sage);stroke-width:4;stroke-linecap:round"/>`;
    for(let i=0;i<7;i++){const x=L.x0+i*gap,on=i<=st;
      s+=`<circle cx="${f1(x)}" cy="${L.ty}" r="${N?11:8}" style="fill:${i===st?'var(--sage)':on?'var(--sage-soft)':'var(--panel)'};stroke:${on?'var(--sage)':'var(--line)'};stroke-width:2"/>`;
      if(N)s+=`<text x="${f1(x)}" y="${L.ty+3.5}" class="t-xs t-mid" style="fill:${i===st?'var(--on-sage)':'var(--ink)'}">${i+1}</text>`;
      else s+=`<text x="${f1(x)}" y="${L.ty+26}" class="t-sm t-mid" style="fill:${i===st?'var(--ink)':'var(--muted)'};font-weight:${i===st?600:500}">${LV_NAMES[i]}</text>`}
    if(N)s+=`<text x="200" y="${L.ty+34}" class="t-lbl t-mid">${st+1} of 7 · ${LV_NAMES[st]}</text>`;
    s+=`<circle cx="${f1(mx)}" cy="${L.ty}" r="${N?15:12}" style="fill:none;stroke:var(--sage);stroke-width:2;opacity:.6"/>`;
    // independence curve (schematic)
    const cv=p=>.08+.84*Math.pow(p,1.45),p=pos/6;
    s+=`<text x="20" y="${L.cl}" class="t-xs">INDEPENDENCE IN DAILY LIFE, SCHEMATIC</text>`;
    s+=`<path d="${pathFn(cv,L.x0,L.x1,L.c0,L.c1,60)}" style="fill:none;stroke:var(--line);stroke-width:3;stroke-dasharray:3 4"/>`;
    if(p>0)s+=`<path d="${pathFn(q=>cv(q*p),L.x0,L.x0+(L.x1-L.x0)*p,L.c0,L.c1,40)}" style="fill:none;stroke:var(--sage);stroke-width:3.5;stroke-linecap:round"/>`;
    s+=`<circle cx="${f1(mx)}" cy="${f1(lerp(L.c0,L.c1,cv(p)))}" r="6" style="fill:var(--sage);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="20" y="${L.chg}" class="t-sm">Tends to change: <tspan style="fill:var(--ink)">${LV_CHG[st]}</tspan></text>`;
    s+=`<path d="M16 ${L.div}H${N?384:704}" class="axis"/>`;
    // the scene and the figures for this point
    const fade=ramp(u,0,.12);
    s+=`<g style="opacity:${f1(fade)}">${lvScene(st,u,L.scx,L.scy)}</g>`;
    s+=`<g style="opacity:${f1(fade)}">${lvFig(LV_FIG[st],L.fx,L.fy,L.fw,u)}</g>`;
    svg.innerHTML=s;
    setSt(st);$('#lvNote').innerHTML=noteHTML(LV_STEPS[st]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,28000,'Replay','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);

  /* ---- the family carer: numbers ---- */
  $('#lvNums').innerHTML=[
   ['11.9 million','unpaid US carers of people with dementia in 2024','[[AA2025Facts]]'],
   ['19.2 billion','hours of care in 2024, valued at $413.5 billion','[[AA2025Facts]]'],
   ['≈31 hours','of care per carer per week, on average','[[AA2025Facts]]'],
   ['59%','rate the emotional stress of caring as high or very high','[[AA2025Facts]]'],
   ['92 vs 65','hours a month: dementia carers against other carers','[[AA2025Facts]]'],
   ['64.5 hours','a week of family care in the last year of life, against 39.3 for cancer','[[AA2025Facts]]'],
   ['2 in 3','dementia carers are women; about 1 in 4 also care for a child','[[AA2025Facts]]'],
   ['12.7 million','carers in the 2026 report, giving 19.6 billion hours in 2025 ($446.3 billion)','[[AA2026Facts]]']
  ].map(([b,t,c])=>`<div class="lv-num"><b>${b}</b><span>${t} ${c}</span></div>`).join('');
  $('#lvDep').innerHTML=`Depression is common among dementia carers: 30% to 40% in the Alzheimer's Association report, 34.0% in a meta-analysis of 10,825 carers of people with Alzheimer's (anxiety 43.6%), and 31.2% in a larger meta-analysis cited by the Lancet Commission. Female and spousal carers were more likely to be depressed. When the carer had depression, the person with dementia used the emergency department 73% more over 6 months. [[AA2025Facts,Sallim2015,Livingston2024]] The panel below shows five programmes and what their best evidence found.`;

  /* ---- caregiver interventions, compared ---- */
  const iv=$('#lvIv'),ir=$('#lvIvT');
  const NAMES=[['REACH II','12 sessions over 6 months'],['NYU Caregiver Intervention','counselling and support groups'],['START','8 coping-skills sessions'],['Respite care','Cochrane review'],['GUIDE model','US Medicare, from July 2024']];
  function drawIv(t){
    const N=vb(iv,'720 425','400 680');
    const L=N?{rh:130,y0:30,nx:20,ax:20,aw:360,vy:52,blx:96}:{rh:76,y0:40,nx:16,ax:206,aw:494,vy:0,blx:292};
    const cur=phaseOf(LV_IV,t);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(!N)s+=`<text x="16" y="24" class="t-xs">PROGRAMME</text><text x="${L.ax}" y="24" class="t-xs">WHAT ITS BEST EVIDENCE FOUND</text>`;
    else s+=`<text x="20" y="20" class="t-xs">PROGRAMME AND WHAT ITS BEST EVIDENCE FOUND</text>`;
    for(let i=0;i<5;i++){
      const y=L.y0+i*L.rh,reached=t>=LV_IV[i].from,k=ease(ramp(t,LV_IV[i].from,LV_IV[i].from+.12)),on=i===cur;
      if(on)s+=`<rect x="6" y="${y-4}" width="${N?388:708}" height="${L.rh-6}" rx="10" style="fill:var(--sage-soft)"/>`;
      s+=`<g style="opacity:${reached?1:.4}"><text x="${L.nx}" y="${y+16}" class="t-lbl">${NAMES[i][0]}</text><text x="${L.nx}" y="${y+32}" class="t-xs">${NAMES[i][1]}</text></g>`;
      if(!reached)continue;
      const ax=L.ax,aw=L.aw,vy=y+L.vy;
      if(i===0){const bw=N?170:250;
        [['control',22.7,'var(--muted)'],['REACH II',12.6,'var(--sage)']].forEach(([l,v,c],j)=>{const yy=vy+8+j*26,w=bw*v/25*k;
          s+=`<text x="${ax}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${L.blx}" y="${yy}" width="${f1(w)}" height="15" rx="4" style="fill:${c}"/><text x="${f1(L.blx+w+6)}" y="${yy+12}" class="t-sm" style="fill:var(--ink);opacity:${f1(k)}">${v}% depressed</text>`});
      }else if(i===1){const x0=ax+(N?30:60),x1=x0+(N?250:330)*k,ty=vy+30;
        s+=`<path d="M${ax} ${ty}H${ax+aw-6}" class="axis"/><text x="${ax+aw-6}" y="${ty+30}" class="t-xs t-end">time →</text>`;
        s+=`<circle cx="${x0}" cy="${ty}" r="7" style="fill:var(--muted)"/><text x="${x0}" y="${ty+20}" class="t-xs t-mid">control</text>`;
        if(k>.05)s+=`<path d="M${x0+9} ${ty}H${f1(x1-9)}" style="stroke:var(--sage);stroke-width:3"/><circle cx="${f1(x1)}" cy="${ty}" r="7" style="fill:var(--sage)"/>`;
        s+=`<text x="${f1(x1)}" y="${ty+20}" class="t-xs t-mid" style="opacity:${f1(k)}">with NYU support</text><text x="${f1((x0+x1)/2)}" y="${ty-12}" class="t-sm t-mid" style="fill:var(--ink);opacity:${f1(k)}">placement ≈557 days later</text>`;
      }else if(i===2){const x0=ax+8,sc=(aw-40)/6.4,ty=vy+30;
        s+=`<path d="M${x0} ${ty}H${f1(x0+sc*6.4)}" class="axis"/><text x="${x0}" y="${ty+38}" class="t-xs">carer anxiety and depression (HADS), lower is better</text>`;
        [[.67,'8 mo','−1.80'],[2,'2 y','−2.58'],[6,'6 y','−2.00']].forEach(([yr,l,v],j)=>{const kk=ramp(k,j*.3,j*.3+.4),x=x0+yr*sc;
          s+=`<g style="opacity:${f1(kk)}"><circle cx="${f1(x)}" cy="${ty}" r="${f1(4+4*kk)}" style="fill:var(--sage)"/><text x="${f1(x)}" y="${ty-12}" class="t-sm t-mid" style="fill:var(--ink)">${v}</text><text x="${f1(x)}" y="${ty+20}" class="t-xs t-mid">${l}</text></g>`});
      }else if(i===3){const w=(aw-8)*k;
        s+=`<rect x="${ax}" y="${vy+8}" width="${f1(w)}" height="${N?56:52}" rx="8" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4"/>`;
        s+=`<g style="opacity:${f1(ramp(k,.5,1))}"><text x="${ax+20}" y="${vy+44}" class="t-big t-mid" style="font-size:26px;fill:var(--muted)">?</text><text x="${ax+40}" y="${vy+30}" class="t-sm" style="fill:var(--ink)">No demonstrated benefit or harm</text><text x="${ax+40}" y="${vy+48}" class="t-xs">4 trials, 753 people, very low quality</text></g>`;
      }else{const x0=ax+8,sc=(aw-24)/8,ty=vy+28,now=2026.8;
        for(let yr=0;yr<=8;yr+=N?2:1)s+=`<path d="M${f1(x0+yr*sc)} ${ty-4}v8" class="axis"/><text x="${f1(x0+yr*sc)}" y="${ty+18}" class="t-xs t-mid">${2024+yr}</text>`;
        const xn=x0+(now-2024)*sc,xe=x0+8*sc;
        s+=`<path d="M${f1(x0+.5*sc)} ${ty}H${f1(lerp(x0+.5*sc,xn,k))}" style="stroke:var(--sky);stroke-width:4;stroke-linecap:round"/><path d="M${f1(xn)} ${ty}H${f1(xe)}" style="stroke:var(--sky);stroke-width:2;stroke-dasharray:4 4;opacity:${f1(k)}"/>`;
        s+=`<circle cx="${f1(x0+.5*sc)}" cy="${ty}" r="5" style="fill:var(--sky)"/><text x="${f1(x0+.5*sc)}" y="${ty-10}" class="t-xs" style="fill:var(--ink)">launched Jul 2024</text>`;
        s+=`<g style="opacity:${f1(ramp(k,.6,1))}"><path d="M${f1(xn)} ${ty-8}v16" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(N?xn-4:xn+6)}" y="${N?ty+34:ty-10}" class="t-xs" style="fill:var(--ink)">today: no outcomes published</text></g>`;
      }
    }
    iv.innerHTML=s;
    setIv(cur);$('#lvIvNote').innerHTML=noteHTML(LV_IV[cur]);
  }
  const stopIv=playWire(ir,$('#lvIvPlay'),drawIv,16000,'Replay','living');
  const setIv=stepWire($('#lvIvSteps'),LV_IV,ir,drawIv,stopIv);

  /* ---- language toggle ---- */
  const lb=$('#lvLangBtn'),lo=$('#lvLangOut');let res=false;
  const LANG=[`<b>Everyday wording:</b> "Ana is living with dementia. Her son talks about the impact of supporting her, and about changed behaviours that can be an expression of unmet need." [[DementiaAustralia2021]]`,
              `<b>Research wording:</b> "Caregiver burden was measured with the Zarit Burden Interview." Trials such as ATTILA report carer burden as an outcome. [[DementiaAustralia2021,Lamb2018,Gathercole2021]]`];
  function lang(){lb.setAttribute('aria-pressed',res);lb.textContent=res?'Show the everyday wording':'Show the research wording';lo.innerHTML=LANG[res?1:0]}
  lb.addEventListener('click',()=>{res=!res;lang()});lang();

  draw(+rg.value);drawIv(+ir.value);
};
