/* =============== 4.1 Medication: the evidence =============== */
/* polypharmacy pile-up: one illustrative person over 24 months (schematic) */
const ME_CRISES=[2,6,11,16];
const ME_PILLS=[
 {m:2,lab:'Sedative for a crisis',col:'var(--med)',keep:false},
 {m:6,lab:'Antipsychotic added',col:'var(--storm)',keep:false},
 {m:11,lab:'Antidepressant added',col:'var(--dx)',keep:true},
 {m:16,lab:'Mood stabiliser added',col:'var(--accent)',keep:false}];
const ME_STEPS=[
 {from:0,at:.1,k:'Month 2 · first crisis',t:'One crisis, one prescription',
  txt:`A crisis brings the person to a doctor, and a sedative is started. NICE CG78 allows short-term sedative medication "cautiously" in a crisis: a single drug with a low side-effect profile, low addictive properties and "relative safety in overdose", agreed in advance, and usually stopped within 1 week. [[NICE2009]]`,
  pt:`A short-term medicine in a crisis can be reasonable. The plan should say when it stops.`,
  hook:`NICE CG78: crisis sedatives only short-term, usually stopped within 1 week. [[NICE2009]]`},
 {from:.2,at:.27,k:'Month 6 · another crisis',t:'Another crisis, another drug',
  txt:`The first medicine was never stopped, and a new crisis adds an antipsychotic. APA 2024 warns that "Frequent dose escalation or medication changes in response to crises or transient mood states are also problematic and rarely effective", and that medicines "would not be expected to affect core features of BPD". [[APA2024Guideline]]`,
  pt:`Adding a new medicine after every crisis rarely helps, because medicines do not treat the core of BPD.`},
 {from:.4,at:.5,k:'Month 11 · the pile-up',t:'Most people end up on several',
  txt:`This is common. In 2195 European inpatients with BPD, 90% received at least one psychotropic drug, 80% two or more and 54% three or more (mean 2.8); quetiapine was the most used single drug (22%). In a UK audit, 92% of people with emotionally unstable personality disorder were prescribed psychotropics. A review puts it at "up to 96%". [[Bridler2015,Paton2015,Gartlehner2021]]`,
  pt:`Most people with BPD who are in hospital take two or more psychiatric medicines, even though none is approved for BPD.`,
  hook:`About 90% of inpatients with BPD receive psychotropics and over half receive three or more. [[Bridler2015]]`},
 {from:.58,at:.68,k:'Months 16–18 · by default',t:'Continued by default',
  txt:`People with BPD and no co-occurring diagnosis were less likely to have had a medication review in the past year, and treatment "may be continued long term by default". In the McLean study, use of antipsychotics and mood stabilisers stayed stable over 16 years, and "as needed" medicine use was about twice as common in people who never recovered. [[Paton2015,Zanarini2015Meds,Martinho2014PRN]]`,
  pt:`Medicines started in a crisis often stay on the list for years unless someone reviews them.`},
 {from:.74,at:.83,k:'Month 18 · review',t:'Review and reconcile',
  txt:`APA recommends (1C) a review and reconciliation of medications "at least every 6 months", to find those that "warrant tapering or discontinuation", and notes review is "especially useful following stabilization of an acute crisis". NICE asks for review "with the aim of reducing and stopping unnecessary drug treatment". Any change is planned with the prescriber. [[APA2024Guideline,NICE2009]]`,
  pt:`It is reasonable to ask what each medicine is for and when it will be reviewed. Changes should be planned with your doctor, not made suddenly on your own.`,
  hook:`APA 2024 (1C): review and reconcile medicines at least every 6 months. NICE: aim to reduce and stop unnecessary drugs. [[APA2024Guideline,NICE2009]]`},
 {from:.9,at:1,k:'Month 24 · what stays',t:'A clear target, or nothing',
  txt:`What remains should have a clear reason. NICE allows drug treatment for "comorbid conditions"; APA suggests (2C) any medicine be "time-limited, aimed at addressing a specific measurable target symptom, and adjunctive to psychotherapy". In this sketch, an antidepressant stays because a co-occurring depression was diagnosed; the main treatment is psychotherapy. [[NICE2009,APA2024Guideline,Bohus2021]]`,
  pt:`A medicine can still be right for a separate condition such as depression. Therapy remains the main treatment for BPD.`,
  hook:`APA 2024 (2C): time-limited, a measurable target symptom, adjunctive to psychotherapy. [[APA2024Guideline]]`}
];
/* Cochrane 2022 vs placebo (very low certainty unless stated) */
const ME_CL={
 ap:{n:'Antipsychotics',sh:'Antipsych.',col:'var(--storm)',
  rows:[{o:'BPD severity',m:'smd',e:-.18,lo:-.45,hi:.08,k:'8 trials, 951',c:'vlow'},{o:'Self-harm',m:'rr',e:.66,lo:.15,hi:2.84,k:'2 trials, 76',c:'vlow'},{o:'Suicide-related',m:'smd',e:.05,lo:-.18,hi:.29,k:'7 trials, 854',c:'vlow'},{o:'Functioning',m:'smd',e:-.16,lo:-.33,hi:0,k:'7 trials, 904',c:'vlow'},{o:'Interpersonal problems',m:'smd',e:-.21,lo:-.34,hi:-.08,k:'8 trials, 907',c:'low'}],
  trials:[`<b>Quetiapine XR</b> (95 adults, 8 weeks): 150 mg/day improved ZAN-BPD vs placebo; responders among completers 82% (150 mg), 74% (300 mg), 48% (placebo); sedation drove dropout. [[Black2014Quetiapine]]`,
   `<b>Olanzapine</b> (451 people, 12 weeks): only 5–10 mg/day beat placebo (ZAN-BPD −8.5 vs −6.8; effect size 0.29), "a clinically modest advantage", with +3.17 kg weight gain vs +0.02 kg. A 314-person variable-dose trial found no difference. [[Zanarini2011Olanzapine,Schulz2008Olanzapine]]`,
   `<b>Aripiprazole, ziprasidone, haloperidol</b>: one small positive aripiprazole trial; ziprasidone no different from placebo; haloperidol's early benefit was not replicated. [[Nickel2006Aripiprazole,Pascual2008Ziprasidone,Soloff1993Phenelzine]]`],
  harm:`Weight gain, metabolic syndrome, movement side effects or tardive dyskinesia; NICE: not for medium- or long-term treatment of BPD. [[APA2024Guideline,NICE2009]]`,
  co:`Second-generation antipsychotics carry US indications for conditions such as schizophrenia and bipolar disorder, not BPD. APA: a low dose "may be used" for psychosis, high impulsivity or agitation. [[FDA-Seroquel,APA2024Guideline]]`},
 ms:{n:'Mood stabilisers',sh:'Mood stab.',col:'var(--accent)',
  rows:[{o:'BPD severity',m:'smd',e:-.07,lo:-.43,hi:.57,k:'4 trials, 265',c:'vlow'},{o:'Self-harm',m:'rr',e:1.08,lo:.79,hi:1.48,k:'1 trial, 276',c:'vlow'},{o:'Interpersonal problems',m:'smd',e:-.58,lo:-1.14,hi:-.02,k:'4 trials, 300',c:'low'}],
  trials:[`<b>LABILE</b> (UK, 276 adults, lamotrigine up to 400 mg/day, 52 weeks): ZAN-BPD 11.3 vs 11.5 on placebo, adjusted difference 0.1 (95% CI −1.8 to 2.0); no difference on any secondary outcome; "not a clinically effective or cost-effective use of resources". Only 36% and 42% were still taking study medicine at 52 weeks. [[Crawford2018LABILE]]`,
   `<b>Earlier small trials</b>: lamotrigine in 24 women reduced self-rated anger; divalproex beat placebo for impulsive aggression in 52 outpatients; topiramate improved several scales. Pooled early effects (SMD 1.51 for impulsive dyscontrol) were not confirmed by LABILE. <span class="ev early">Early evidence, superseded</span> [[Tritt2005Lamotrigine,Hollander2005Divalproex,Loew2006Topiramate,Ingenhoven2010]]`],
  harm:`Valproate: neural tube defects and lower child IQ after exposure in pregnancy, polycystic ovaries; lamotrigine: Stevens-Johnson syndrome; topiramate: cognitive effects; lithium: narrow therapeutic index. [[APA2024Guideline,FDA-Depakote,FDA-Lamictal,FDA-Lithobid]]`,
  co:`Lamotrigine and valproate carry US indications for epilepsy and bipolar disorder, not BPD. APA notes lithium's narrow therapeutic index and toxicity in overdose for people with BPD and bipolar disorder. [[FDA-Lamictal,FDA-Depakote,APA2024Guideline]]`},
 ad:{n:'Antidepressants',sh:'Antidep.',col:'var(--dx)',
  rows:[{o:'BPD severity',m:'smd',e:-.27,lo:-.65,hi:1.18,k:'2 trials, 87',c:'vlow'}],
  trials:[`<b>Too few trials</b>: Cochrane 2022 found too little data for firm conclusions; for self-harm there was one 20-person trial. [[StoffersWinterling2022]]`,
   `<b>Fluoxetine</b> (22 people, 13 weeks) reduced anger, with a high placebo response; <b>fluvoxamine</b> (38 women) reduced rapid mood shifts but not impulsivity or aggression; <b>phenelzine</b> beat haloperidol on anger and hostility in 1993. [[Salzman1995,Rinne2002,Soloff1993Phenelzine]]`],
  harm:`Boxed warning: more suicidal thoughts and behaviour in children, adolescents and young adults in short-term studies. Swedish registry: HR 1.38 for suicidal behaviour on vs off antidepressants (observational). [[FDA-Prozac,Lieslehto2023Suicide]]`,
  co:`Depression is common with BPD: NESARC found lifetime mood disorders in 82.7%. NICE allows drug treatment for comorbid conditions such as this. [[Tomko2014,NICE2009]]`},
 cz:{n:'Clozapine',sh:'Clozapine',col:'var(--storm)',ring:1,rows:[],
  trials:[`<b>CALMED</b> (UK): aimed for 222 inpatients with severe BPD, closed early with 29 because of poor recruitment and COVID-19; ZAN-BPD difference −3.86 (95% CI −10.04 to 2.32), so the question could not be answered. [[Crawford2022CALMED]]`,
   `<b>Observational</b>: in 1107 Danish people with BPD, psychiatric bed-days fell from 190.08 to 65.95 after starting clozapine (mirror-image, no control group); in Sweden clozapine was linked to less rehospitalisation (HR 0.54); a 2025 register study found no hospitalisation benefit in BPD. <span class="ev early">Early evidence</span> [[Rohde2018Clozapine,Lieslehto2023Outcomes,Luykx2025Clozapine]]`],
  harm:`Boxed warning: severe neutropenia, orthostatic hypotension, bradycardia and syncope, seizure, myocarditis. Its US label for reducing suicidal behaviour covers schizophrenia and schizoaffective disorder only. [[FDA-Clozaril]]`,
  co:`APA: clozapine "may be considered" for extremely ill hospitalized patients, based on case reports, naturalistic data and a small trial. [[APA2024Guideline]]`},
 bz:{n:'Benzodiazepines',sh:'Benzos',col:'var(--bad)',ring:1,rows:[],
  trials:[`<b>No trial benefit</b> on core BPD outcomes in the research summarised here. Swedish within-person cohort (22,601 people): attempted or completed suicide HR 1.61 (1.45–1.78) on vs off benzodiazepines, the highest of the classes studied. <span class="ev early">Early evidence: observational</span> [[Lieslehto2023Suicide]]`,
   `<b>Rehospitalisation</b>: HR 1.38 on benzodiazepines in a sister analysis of 17,532 people. [[Lieslehto2023Outcomes]]`],
  harm:`APA: "not generally recommended because of potential for greater impulsivity or disinhibition as well as potential for misuse or development of dependence". [[APA2024Guideline]]`,
  co:`Anxiety disorders are common with BPD (lifetime 84.8% in NESARC); the APA caution about benzodiazepines in BPD still applies. [[Tomko2014,APA2024Guideline]]`},
 o3:{n:'Omega-3 and others',sh:'Omega-3',col:'var(--med)',rows:[],
  trials:[`<b>Omega-3</b> (ethyl-EPA 1 g/day, 30 women, 8 weeks): better than placebo for aggression and depressive symptoms in this pilot. <span class="ev early">Early evidence</span> [[Zanarini2003Omega3]]`,
   `<b>Naltrexone</b> for dissociation (two small crossover trials, 29 people): lower but not significantly. [[Schmahl2012]]`,
   `<b>ADHD medicines</b>: linked to lower suicidal-behaviour hazard (HR 0.83) and less rehospitalisation (HR 0.88) in Swedish registry data. Observational only. [[Lieslehto2023Suicide,Lieslehto2023Outcomes]]`],
  harm:`Small pilots: no reliable safety picture. Report all supplements to the prescriber.`,
  co:`ADHD is among the conditions that can come with BPD; the registry signal for ADHD medicines is observational and untested in trials. [[Lieslehto2023Suicide]]`},
 nw:{n:'Newer agents',sh:'Newer',col:'var(--hpa)',rows:[],
  trials:[`<b>Brexpiprazole</b> phase 2 (324 people, 11 weeks; NCT04100096): primary endpoint not met (difference −1.02; p = 0.24); akathisia 14.0% vs 1.2%. [[Rothman2024Brexpiprazole,NCT04100096]]`,
   `<b>BI 1358894</b>, a TRPC4/5 inhibitor (390 people; NCT04566601): no difference from placebo on any endpoint. [[Dwyer2025BI1358894,NCT04566601]]`,
   `<b>Memantine</b> (33 people, 8 weeks): reduced ZAN-BPD over time vs placebo. <span class="ev early">Early evidence</span> Ketamine, MDMA, oxytocin and methylphenidate studies are small or early-phase. See <a href="#frontier" data-go="frontier">Research toward better care</a>. [[Kulkarni2018Memantine,NCT07099534,NCT06683014,NCT07551882,NCT06759298]]`],
  harm:`Large placebo responses and high dropout are common in BPD drug trials. [[Grant2022Brexpiprazole,Rothman2024Brexpiprazole,Dwyer2025BI1358894]]`,
  co:`None of these is approved for BPD; they are research medicines here. [[Rothman2024Brexpiprazole]]`}
};
const ME_ORDER=['ap','ms','ad','cz','bz','o3','nw'];
const ME_MXC=[['sev','BPD severity'],['sh','Self-harm'],['sui','Suicide-related'],['fun','Functioning'],['ip','Interpersonal']];
const ME_MX=[
 {r:'Antipsychotics',cl:{sev:['−0.18','vlow','SMD −0.18 (95% CI −0.45 to 0.08); 8 trials, 951 people'],sh:['RR 0.66','vlow','RR 0.66 (0.15 to 2.84); 2 trials, 76 people'],sui:['0.05','vlow','SMD 0.05 (−0.18 to 0.29); 7 trials, 854 people'],fun:['−0.16','vlow','SMD −0.16 (−0.33 to 0.00); 7 trials, 904 people'],ip:['−0.21','low','SMD −0.21 (−0.34 to −0.08); 8 trials, 907 people: "may slightly reduce" interpersonal problems']}},
 {r:'Mood stabilisers',cl:{sev:['−0.07','vlow','SMD −0.07 (−0.43 to 0.57); 4 trials, 265 people'],sh:['RR 1.08','vlow','RR 1.08 (0.79 to 1.48); 1 trial, 276 people'],ip:['−0.58','low','SMD −0.58 (−1.14 to −0.02); 4 trials, 300 people: "may reduce" interpersonal problems']}},
 {r:'Antidepressants',cl:{sev:['−0.27','vlow','SMD −0.27 (−0.65 to 1.18); 2 trials, 87 people'],sh:['1 trial','vlow','a single 20-person trial; too few data for a conclusion']}},
 {r:'Psychotherapy vs usual care',pt:1,cl:{sev:['−0.52','mod','SMD −0.52 (−0.70 to −0.33); 22 trials, 1244 people; moderate certainty'],sh:['−0.32','low','SMD −0.32 (−0.49 to −0.14); 13 trials'],sui:['−0.34','low','SMD −0.34 (−0.57 to −0.11); 13 trials'],fun:['−0.45','low','SMD −0.45 (−0.68 to −0.22); 22 trials']}}
];
const ME_CN={mod:'moderate certainty',low:'low certainty',vlow:'very low certainty'};

inits.meds=()=>{
  const sec=$('#m-meds'),svg=$('#meSvg'),rg=$('#meT');
  const dist=u=>{let v=.16;ME_CRISES.forEach((m,i)=>{const d=u-m/24;if(d>0)v+=.7*(1-Math.exp(-d/.006))*Math.exp(-d/.03)*(i===3?.9:1)});return clamp(v)};
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 660'),M=t*24;
    const W=N?{x:20,y:34,w:360,h:90}:{x:24,y:34,w:430,h:100};
    let s=`<text x="${W.x}" y="22" class="t-sm">DISTRESS (schematic) · months 0–24</text>`;
    const wv=wave(W.x,W.y,W.w,W.h,dist,{upto:t,fill:true,col:'var(--storm)',dot:true});s+=wv.svg;
    s+=`<line x1="${W.x}" x2="${W.x+W.w}" y1="${W.y+W.h+4}" y2="${W.y+W.h+4}" class="axis"/>`;
    [0,6,12,18,24].forEach(m=>{const x=W.x+W.w*m/24;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${W.y+W.h+4}" y2="${W.y+W.h+8}" class="axis"/><text x="${f1(x)}" y="${W.y+W.h+20}" class="t-xs t-mid">${m}</text>`});
    ME_CRISES.forEach((m,i)=>{if(M<m)return;const x=W.x+W.w*m/24;s+=`<text x="${f1(x+4)}" y="${W.y+8}" class="t-xs" style="fill:var(--storm)">crisis ${i+1}</text>`});
    /* review band */
    if(M>=18){const x0=W.x+W.w*18/24,x1=W.x+W.w*Math.min(M,21)/24;s+=`<rect x="${f1(x0)}" y="${W.y}" width="${f1(Math.max(2,x1-x0))}" height="${W.h}" style="fill:var(--accent-soft);opacity:.7"/><text x="${f1(x0+4)}" y="${W.y+W.h-6}" class="t-xs" style="fill:var(--accent)">review</text>`}
    /* the pill stack */
    const S=N?{x:110,y0:330,lx:160,top:176}:{x:120,y0:350,lx:170,top:182};
    s+=`<text x="${N?20:24}" y="${S.top}" class="t-sm">PRESCRIPTION LIST</text>`;
    let onList=0;
    ME_PILLS.forEach((p,i)=>{if(M<p.m)return;const dp=ease(clamp((M-p.m)/1.2));const sx=W.x+W.w*p.m/24,sy=W.y+W.h*(1-dist(p.m/24+.004));
      const ty=S.y0-i*34,x=lerp(sx,S.x,dp),y=lerp(sy,ty,dp);
      let gone=0;if(!p.keep&&M>18)gone=ease(clamp((M-18-i*.6)/1.4));
      const op=1-gone;if(op<=.02)return;
      if(gone<.5)onList++;
      s+=`<g style="opacity:${f1(op)}" transform="translate(${f1(-gone*40)} 0)">${pill(x,y,46,{col:p.col,ang:(1-dp)*35})}`;
      if(dp>.9){s+=`<text x="${S.lx}" y="${f1(ty+4)}" class="t-sm" style="fill:var(--ink)">${p.lab}</text>`;
        if(gone>0)s+=`<line x1="${S.lx}" x2="${S.lx+150}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--bad);stroke-width:1.6"/>`;
        if(p.keep&&M>21)s+=`<text x="${S.lx}" y="${f1(ty+17)}" class="t-xs" style="fill:var(--accent)">kept: diagnosed co-occurring depression</text>`}
      s+='</g>'});
    if(M>=12&&M<18){const pr=clamp((M-12)/2);s+=`<g style="opacity:${f1(pr)}">${pill(S.x,S.y0-4*34,30,{col:'var(--muted)'})}<text x="${S.lx}" y="${S.y0-4*34+4}" class="t-sm">+ "as needed" extras</text></g>`}
    if(M<2)s+=`<text x="${S.lx-40}" y="${S.y0+4}" class="t-sm" style="font-style:italic">no medicines yet</text>`;
    s+=`<line x1="${S.x-40}" x2="${S.x+40}" y1="${S.y0+22}" y2="${S.y0+22}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    /* published bars */
    const B=N?{x:20,y:416,w:300,lw:0}:{x:480,y:60,w:150,lw:0},bp=ramp(t,.4,.56);
    s+=`<text x="${B.x}" y="${B.y-14}" class="t-sm">PUBLISHED: INPATIENTS WITH BPD</text>`;
    [ [90,'1 or more psychotropic'],[80,'2 or more'],[54,'3 or more'] ].forEach(([v,l],i)=>{const y=B.y+i*(N?44:48);
      s+=`<text x="${B.x}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${B.x}" y="${y+14}" width="${B.w}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+14}" width="${f1(B.w*v/100*bp)}" height="14" rx="4" style="fill:var(--med)"/><text x="${f1(B.x+B.w+6)}" y="${y+25}" class="t-sm" style="fill:var(--ink);opacity:${f1(bp)}">${Math.round(v*bp)}%</text>`});
    const ny=B.y+3*(N?44:48)+8;
    s+=`<g style="opacity:${f1(bp)}"><text x="${B.x}" y="${ny}" class="t-xs">mean 2.8 drugs · Bridler 2015, n = 2195</text><text x="${B.x}" y="${ny+16}" class="t-xs">UK audit: 92% prescribed · Paton 2015</text></g>`;
    const rv=ramp(t,.74,.8);
    if(rv>0){const ry=ny+40;s+=`<g style="opacity:${f1(rv)}"><rect x="${B.x}" y="${ry}" width="${N?360:226}" height="${N?62:92}" rx="10" style="fill:var(--accent-soft);stroke:var(--accent)"/>`+
      (N?`<text x="${B.x+10}" y="${ry+20}" class="t-sm" style="fill:var(--ink)">APA 2024: review at least every 6 months</text><text x="${B.x+10}" y="${ry+38}" class="t-sm" style="fill:var(--ink)">NICE: aim to reduce and stop</text><text x="${B.x+10}" y="${ry+54}" class="t-sm" style="fill:var(--ink)">unnecessary drug treatment</text>`
        :`<text x="${B.x+10}" y="${ry+20}" class="t-sm" style="fill:var(--ink)">APA 2024 (1C): review and</text><text x="${B.x+10}" y="${ry+36}" class="t-sm" style="fill:var(--ink)">reconcile at least every</text><text x="${B.x+10}" y="${ry+52}" class="t-sm" style="fill:var(--ink)">6 months. NICE: reduce</text><text x="${B.x+10}" y="${ry+68}" class="t-sm" style="fill:var(--ink)">and stop unnecessary drugs.</text>`)+'</g>'}
    svg.innerHTML=s;
    const p=phaseOf(ME_STEPS,t);setSt(p);
    $('#meNote').innerHTML=noteHTML(ME_STEPS[p]);
    $('#meRead').innerHTML=`<span>month <b>${Math.floor(M)}</b></span><span>crises <b>${ME_CRISES.filter(m=>M>=m).length}</b></span><span>medicines on the list <b>${onList}</b></span><span>status <b>${M<18?'no review yet':M<21.5?'under review':'reviewed'}</b></span>`;
  }
  const stop=playWire(rg,$('#mePlay'),draw,20000,'%t:player.replay%','meds');
  setSt=stepWire($('#meSteps'),ME_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- evidence board ---- */
  const bd=$('#meBoard'),card=$('#meCard');let cl='ap',lens='core',stopC=null;
  function drawBoard(){
    const N=vb(bd,'520 420','400 470'),cx=N?200:260,cy=N?220:200,rx=N?150:190,ry=N?170:150;
    let s=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none;stroke:var(--line);stroke-dasharray:3 5"/>`;
    s+=pill(cx,cy-12,78,{cross:true,col:'var(--med)'});
    const cl1=lens==='core'?['No medicine is','approved for BPD itself']:['For conditions that','come with BPD'];
    s+=`<text x="${cx}" y="${cy+50}" class="t-lbl t-mid">${cl1[0]}</text><text x="${cx}" y="${cy+66}" class="t-lbl t-mid">${cl1[1]}</text>`;
    if(lens==='co')s+=`<text x="${cx}" y="${cy+84}" class="t-xs t-mid">treated per that condition's guidance</text>`;
    ME_ORDER.forEach((k,i)=>{const a=-Math.PI/2+i*2*Math.PI/ME_ORDER.length,x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a),C=ME_CL[k],on=k===cl;
      s+=`<g class="clk" data-cl="${k}" tabindex="0" role="button" aria-label="${C.n}">`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?32:26}" style="fill:${on?'var(--med-soft)':'var(--panel)'};stroke:${C.ring?'var(--bad)':on?'var(--med)':'var(--line)'};stroke-width:${on||C.ring?2:1}"/>`;
      s+=pill(x,y,on?40:32,{col:C.col,ang:-30});
      s+=`<text x="${f1(x)}" y="${f1(y+(on?46:40))}" class="t-sm t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${N?C.sh:C.n.replace(' and others','')}</text></g>`;
      });
    bd.innerHTML=s}
  function forest(C,k){/* mini forest plot of Cochrane rows, k 0..1 grows the CIs */
    const rows=C.rows.filter(r=>r.m==='smd'),rr=C.rows.filter(r=>r.m==='rr'),N=NARROW();
    if(!rows.length&&!rr.length)return '';
    const W=N?320:480,a0=N?12:150,a1=W-10,rh=N?36:26,y0=N?40:34,X=v=>lerp(a0,a1,(v+1.2)/2.4);
    const all=rows.concat([{o:'Psychotherapy (for contrast)',m:'smd',e:-.52,lo:-.70,hi:-.33,k:'vs usual care',c:'mod',pt:1}]);
    const ay=y0+all.length*rh-10,H=ay+34;
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cochrane 2022 estimates against placebo for ${C.n}">`;
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="14" y2="${ay}" style="stroke:var(--ink);stroke-dasharray:4 3;opacity:.6"/>`;
    all.forEach((r,i)=>{const y=y0+i*rh,col=r.c==='mod'?'var(--good)':r.c==='low'?'var(--warn)':'var(--bad)';
      s+=N?`<text x="4" y="${y-9}" class="t-sm" style="fill:var(--ink)">${r.o} <tspan class="t-xs">${r.e<0?'−'+Math.abs(r.e):r.e}</tspan></text>`:`<text x="4" y="${y+4}" class="t-xs" style="fill:var(--ink)">${r.o}</text>`;
      s+=`<line x1="${f1(lerp(X(r.e),X(r.lo),k))}" x2="${f1(lerp(X(r.e),X(r.hi),k))}" y1="${y}" y2="${y}" style="stroke:${col};stroke-width:2"/>`;
      s+=r.pt?`<path d="M${f1(X(r.e)-7)} ${y}L${f1(X(r.e))} ${y-6}L${f1(X(r.e)+7)} ${y}L${f1(X(r.e))} ${y+6}Z" style="fill:${col}"/>`:`<rect x="${f1(X(r.e)-4.5)}" y="${y-4.5}" width="9" height="9" style="fill:${col}"/>`});
    s+=`<line x1="${a0}" x2="${a1}" y1="${ay}" y2="${ay}" class="axis"/>`;[-1,-.5,0,.5,1].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${ay+13}" class="t-xs t-mid">${v<0?'−'+Math.abs(v):v}</text>`});
    s+=`<text x="${f1(X(0)-4)}" y="${ay+26}" class="t-xs t-end" style="fill:var(--rx)">← favours treatment</text><text x="${f1(X(0)+4)}" y="${ay+26}" class="t-xs">favours placebo / control →</text>`;
    s+=`<text x="${a1}" y="10" class="t-xs t-end">SMD, 95% CI</text></svg>`;
    if(rr.length)s+=rr.map(r=>`<p class="stage-cap">${r.o}: RR ${r.e} (95% CI ${r.lo}–${r.hi}), crosses 1 · ${r.k} people</p>`).join('');
    return s}
  function openCard(quiet){
    const C=ME_CL[cl];if(stopC)stopC();
    const head=`<div class="sub">${lens==='core'?'Core BPD outcomes':'Co-occurring conditions'}</div><h4>${C.n}</h4>`;
    if(lens==='co'){card.innerHTML=head+`<p>${C.co}</p><p>NICE: drug treatment "may be considered in the overall treatment of comorbid conditions". A 2025 re-analysis of the Cochrane data found that its findings "do not support the use of pharmacological interventions in people with BPD to target co-occurring psychopathology" within BPD. Treating a diagnosed co-occurring condition in its own right, on that condition's evidence, is a separate question. [[NICE2009,PereiraRibeiro2025]]</p><p class="stage-cap">Lifetime co-occurring disorders in BPD (NESARC): anxiety 84.8%, mood 82.7%, substance use 78.2%; about 30% have PTSD. [[Tomko2014,Pagura2010PTSD]]</p>`;return}
    const hasF=C.rows.length;
    const draw1=k=>{card.innerHTML=head+(hasF?`<p class="sub">Cochrane 2022 vs placebo</p>${forest(C,k)}`:`<p class="sub">No pooled Cochrane estimate</p>`)+`<p class="sub">Key trials</p><ul>${C.trials.map(x=>`<li>${x}</li>`).join('')}</ul><p class="sub">Harms</p><p>${C.harm}</p>`+(hasF?`<p class="stage-cap">Cochrane 2022: 46 trials, 2769 participants; "no difference in effects were observed on any of the primary outcomes at the end of treatment for any medication". [[StoffersWinterling2022]]</p>`:'')};
    if(hasF&&!quiet){stopC=animate(700,p=>draw1(ease(p)))}else draw1(1)}
  function pick(k,quiet){cl=k;$$('[data-cl]',sec).forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',b.dataset.cl===k)});drawBoard();openCard(quiet)}
  $$('button[data-cl]',sec).forEach(b=>b.addEventListener('click',()=>pick(b.dataset.cl)));
  bd.addEventListener('click',e=>{const g=e.target.closest('[data-cl]');if(g)pick(g.dataset.cl)});
  bd.addEventListener('keydown',e=>{const g=e.target.closest('[data-cl]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.cl)}});
  $$('[data-lens]',sec).forEach(b=>b.addEventListener('click',()=>{lens=b.dataset.lens;$$('[data-lens]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));drawBoard();openCard()}));
  pick('ap',true);
  const prevR=redraws.meds;redraws.meds=()=>{prevR&&prevR();drawBoard();openCard(true)};

  /* ---- certainty matrix ---- */
  const mx=$('#meMx'),mn=$('#meMxNote');
  mx.innerHTML=`<thead><tr><th>Drug class vs placebo</th>${ME_MXC.map(c=>`<th>${c[1]}</th>`).join('')}</tr></thead><tbody>`+ME_MX.map((r,i)=>`<tr${r.pt?' class="hl"':''}><th>${r.r}</th>${ME_MXC.map(([c])=>{const v=r.cl[c];return `<td><button class="${v?'c-'+v[1]:'c-none'}" data-mx="${i}:${c}" aria-pressed="false">${v?v[0]:'—'}<small>${v?ME_CN[v[1]]:'no estimate'}</small></button></td>`}).join('')}</tr>`).join('')+'</tbody>';
  function mxNote(i,c){const r=ME_MX[i],v=r.cl[c],cn=ME_MXC.find(x=>x[0]===c)[1];
    mn.innerHTML=`<div class="kicker">${r.r} · ${cn}</div><h4>${v?v[0]+' · '+ME_CN[v[1]]:'No pooled estimate'}</h4><p>${v?v[2]+'.':'The reviews summarised here report no pooled estimate for this cell.'} ${r.pt?'Source: Cochrane 2020 psychotherapy review. [[Storebo2020]]':'Source: Cochrane 2022 medication review. "No pharmacological therapy seems effective in specifically treating BPD pathology." [[StoffersWinterling2022]]'}</p>
      <div class="pt"><b>In plain words</b>${v&&v[1]==='vlow'?'Very low certainty: few or small trials, so the true effect could be quite different from this estimate.':v&&v[1]==='low'?'Low certainty: a possible small benefit, based on few and small trials.':v?'Moderate certainty: the most solid result in this table.':'Not enough studies to say.'}</div>`}
  mx.addEventListener('click',e=>{const b=e.target.closest('[data-mx]');if(!b)return;$$('[data-mx]',mx).forEach(x=>x.setAttribute('aria-pressed',x===b));const [i,c]=b.dataset.mx.split(':');mxNote(+i,c)});
  const first=$('[data-mx="0:sev"]',mx);first.setAttribute('aria-pressed','true');mxNote(0,'sev');
};
