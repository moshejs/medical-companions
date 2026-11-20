/* =============== 1.1 what GBS is =============== */
/* Player: one person's peripheral nerves through infection, attack, climbing weakness, the worst point and recovery.
   Everything in that drawing is schematic: the order follows the sources, the timing and bar levels do not encode data. */
const WH_STEPS=[
 {from:0,at:.06,s:'nerves',k:'Where',t:'The peripheral nerves',
  txt:'GBS is a rare but potentially fatal immune-mediated disease of the peripheral nerves and nerve roots, usually triggered by an infection. [[Leonhard2019]] These are the nerves outside the brain and spinal cord. Besides weakness and changed sensation, GBS can affect the cranial nerves of the face and throat, breathing, the autonomic nerves that steady blood pressure, heart rate, bowel and bladder, and it often causes pain. [[vanDoorn2023,Leonhard2019]] On the right, an impulse jumps from node to node along a healthy, myelinated fibre.',
  pt:'Nerves carry messages between the spinal cord and the muscles and skin. In GBS the immune system attacks these nerves, not the brain or spinal cord.',
  hook:'An acute <b>polyradiculoneuropathy</b>: many nerve roots (radiculo-) and nerves (neuropathy) at once. [[vanDoorn2023]]'},
 {from:.15,at:.22,s:'infection',k:'Weeks before',t:'An infection first',
  txt:'In IGOS, 76% reported an illness or other event in the weeks before the weakness. [[Doets2018]] Blood tests in its first 1,000 participants found recent <i>Campylobacter jejuni</i> in 30%, <i>Mycoplasma pneumoniae</i> in 10%, cytomegalovirus in 4%, hepatitis E virus in 3% and Epstein-Barr virus in 1%. [[Leonhard2022IGOS]] The infection before GBS can spread between people; the immune reaction that follows is not described as catching. [[Leonhard2019,Papri2021]]',
  pt:'Many people had a stomach bug or a chest infection in the weeks before the weakness started. GBS itself does not pass from person to person.',
  hook:'<i>C. jejuni</i> was the commonest recent infection on IGOS serology, in 30%. [[Leonhard2022IGOS]] See <a href="#triggers" data-go="triggers">Triggers</a>.'},
 {from:.31,at:.38,s:'attack',k:'The attack',t:'The immune system turns on the nerve',
  txt:'A <i>C. jejuni</i> strain from a person with GBS carried a sugar structure like the nerve ganglioside GM1, and immunising rabbits with that material reproduced the disease: an immune response to the germ that also fits the nerve. [[Yuki1993,Yuki2004]] The damage takes two main forms. The myelin sheath is stripped (demyelinating), or the axon itself is injured at the nodes (axonal). In IGOS the demyelinating subtype was found in 55% in Europe/Americas and the axonal one in 6%. [[Doets2018]] Here antibodies bind the nodes and a macrophage strips myelin.',
  pt:'The body\'s defences, built to fight the germ, mistake part of the nerve for it and damage the nerve. Messages then travel slowly or not at all.',
  hook:'Mimicry shown: a GM1-like structure on <i>C. jejuni</i> (1993), and the disease reproduced in rabbits (2004). [[Yuki1993,Yuki2004]] See <a href="#mimicry" data-go="mimicry">Molecular mimicry</a>.'},
 {from:.47,at:.55,s:'climb',k:'Over days',t:'Weakness climbs',
  txt:'All 494 adults in a Dutch cohort developed weakness on both sides, generally in arms and legs; it stayed in the legs in 6% and in the arms in 1%. [[Fokke2014]] Weakness is always bilateral, but it can start in the legs, the arms or all limbs at once. [[Leonhard2019]] Reflexes were reduced in weak limbs in 91% at first and in everyone during follow-up, although 2% kept normal reflexes in weak arms. [[Fokke2014]] Severe pain, or a problem with a single cranial nerve, can come before the weakness. [[Leonhard2019]]',
  pt:'Weakness and tingling usually start in the feet and legs and spread upward over days. Both sides are affected. The knee and ankle jerks fade.',
  hook:'Classic GBS: rapidly progressive, symmetrical weakness with sensory signs and absent or reduced reflexes. [[Leonhard2019]] A minority, especially with AMAN, keep normal or even brisk reflexes. [[Leonhard2019]]'},
 {from:.64,at:.71,s:'worst',k:'Within 4 weeks',t:'The worst point',
  txt:'Most people reach their worst point, the nadir, within 2 weeks: 80% of Dutch adults by 2 weeks, 97% by 4 weeks and all by 6 weeks. [[Fokke2014]] About 20% develop breathing failure and need a ventilator, up to 22% within the first week of admission. [[Leonhard2019]] In IGOS, 19% were ventilated, and 76% in Europe/Americas could not walk unaided at their worst. [[Doets2018]] Blood pressure and heart rate can swing when the autonomic nerves are involved. [[Leonhard2019]]',
  pt:'The weakest point usually comes within 2 weeks. Many people cannot walk then, and about 1 in 5 need a machine to help them breathe for a while.',
  hook:'Nadir within 2 weeks in most and, by definition, within 4 weeks. [[Leonhard2019,Hughes1997]] Ventilation in about 20%. [[Leonhard2019]] Breathing is covered in <a href="#breathing" data-go="breathing">Breathing &amp; the 20/30/40 rule</a>.'},
 {from:.8,at:.9,s:'recovery',k:'Months to years',t:'Most people recover',
  txt:'A plateau of days, weeks or months follows, then recovery. [[Leonhard2019]] About 80% regain independent walking by 6 months. [[Leonhard2019]] In IGOS, 79% in Europe/Americas walked unaided at 6 months and 83% at 1 year. [[Doets2018]] Mortality is 3 to 10% even with the best medical care. [[Leonhard2019]] Most people recover extensively, especially in the first year, and remaining problems can still improve more than 5 years after onset. [[Leonhard2019]]',
  pt:'Then comes a flat stretch, and then a slow recovery. Most people walk on their own again. Tiredness and pain can last longer, even when strength comes back.',
  hook:'GBS is monophasic; treatment-related fluctuations and relapses occur in a minority. [[Leonhard2019]] About 5% are later re-diagnosed with acute-onset CIDP. [[vanDoorn2023]]'}
];
/* symptom rows in the player: which zone each reads */
const WH_ROWS=[{n:'leg weakness',z:'legs'},{n:'arm weakness',z:'arms'},{n:'breathing muscles',z:'breath'},{n:'face weakness',z:'face'},{n:'reflexes lost',z:'refl'}];
const WH_WORDS=['none','mild','marked','severe'];
const WH_FIB={nerves:'impulses jump from node to node',infection:'the nerve is still healthy',attack:'antibodies bind the nodes',climb:'myelin stripped: signals slow or stop',worst:'signals blocked',recovery:'thin new myelin: signals return'};
const WH_LBL={brain1:'brain and',brain2:'spinal cord: spared',nerve1:'peripheral nerves',nerve2:'and roots: attacked',vent:'breathing support',chest:'chest infection',gut:'gut infection',climb:'weakness rises from the feet',fibre:'one motor nerve fibre, magnified',bars:'how affected (schematic)'};
/* nerve paths in the body glyph's local frame (146 tall, centre x 0), the viewer's left side; mirrored for the right */
const WH_NV={arm:[ [0,-24],[-8,-23],[-16,-20],[-21,-14],[-23,-4],[-25,8],[-27,20] ],
  leg:[ [0,16],[-3,22],[-7,30],[-9,44],[-9,60],[-9,76],[-9,90] ],
  breath:[ [0,-20],[-6,-16],[-12,-12],[-16,-6] ],
  face:[ [0,-31],[-4,-34],[-7,-38] ]};
function whLv(t){if(t<.36)return 0;if(t<.66)return .82*ease(ramp(t,.36,.66));if(t<.82)return .82;return lerp(.82,.1,ease(ramp(t,.82,1)))}
function whZones(lv){return {legs:clamp(lv/.35),arms:clamp((lv-.3)/.3),breath:clamp((lv-.55)/.22),face:clamp((lv-.66)/.3),refl:clamp(lv/.25)}}
function whAlong(P,f){const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}
  let r=clamp(f)*tot;for(let i=0;i<L.length;i++){if(r<=L[i]){const u=L[i]?r/L[i]:0;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)]}r-=L[i]}return P[P.length-1]}
function whWord(v){return WH_WORDS[v<.08?0:v<.4?1:v<.75?2:3]}

/* incidence by age: Western model [[Sejvar2011]]; urban China 2017 bands [[Xu2024]] */
const WH_M=[ [5,.80],[25,1.18],[45,1.73],[65,2.54],[85,3.72] ];
const WH_F=[ [5,.45],[25,.66],[45,.97],[65,1.42],[85,2.09] ];
const WH_CN=[{a0:0,a1:18,v:.16},{a0:19,a1:29,v:.20},{a0:30,a1:39,v:.40},{a0:40,a1:49,v:.45},{a0:50,a1:59,v:.78},{a0:60,a1:69,v:1.03},{a0:70,a1:90,v:1.12}];
const WH_SX={all:'everyone',m:'men',f:'women'};
const whMf=monoFn(WH_M),whFf=monoFn(WH_F);
function whRate(a,sx){if(sx==='m')return whMf(clamp(a,5,85));if(sx==='f')return whFf(clamp(a,5,85));return Math.exp(-12.0771+.01813*a)*1e5}
const WH_CAP_AGE='Lines: the Western meta-analysis model. Everyone: the published formula. Men and women: lines drawn through the published model points at ages 5, 25, 45, 65 and 85. Dashed steps: urban China, 2017, by age band. Rates per 100,000 person-years, not counts. [[Sejvar2011,Xu2024]]';
const WH_CAP_REG='Each bar names what it measured: hospital admissions, treated cases, coded diagnoses and pooled estimates are not quite the same measure, so compare with care. A pale extension marks a published range. Tap or focus a bar for its source.';
/* incidence by country or region, per 100,000 a year */
const WH_INC=[
 {n:'Bangladesh, Iran, Curaçao',m:'highest reported range',lo:2.1,hi:3.0,
  txt:'The highest reported incidences, 2.1 to 3.0 per 100,000 persons per year, come from Iran, Curaçao and Bangladesh. Reported incidence worldwide spans 0.16 to 3.0. The true incidence in many low-income and middle-income countries remains unknown, and publications from Africa are especially scarce. [[Papri2021]]'},
 {n:'New Zealand',m:'first hospital admissions, 1988–2010',v:2.32,
  txt:'An average of 2.32 first hospital admissions for GBS per 100,000 people per year, 1988 to 2010, from 2,056 admissions. After poultry regulation cut <i>Campylobacter</i> contamination, GBS admissions fell 13%. [[Baker2012NZ]]'},
 {n:'United Kingdom',m:'treated in hospital, 2016–2019',lo:1.65,hi:1.88,
  txt:'1.65 to 1.88 per 100,000 per year treated in hospital, 2016 to 2019, from national immunoglobulin records. In spring 2020, during lockdown, cases fell by roughly a third to a half against the same months of earlier years. [[Keddie2021]]'},
 {n:'United States',m:'age-standardised, 2000–2009',v:1.72,
  txt:'About 1.72 per 100,000 person-years, age-standardised, in the Vaccine Safety Datalink, 2000 to 2009, after correcting for diagnosis codes that were right only 55% of the time. Rates were 15% higher in winter and spring than in summer. [[Shui2012]] In hospital discharge data, 2000 to 2004, adult incidence was 1.65 to 1.79. [[Alshekhlee2008]]'},
 {n:'Europe and North America',m:'reported range',lo:.84,hi:1.91,
  txt:'Studies from Europe and North America report 0.84 to 1.91 per 100,000 per year. In these ageing populations GBS is most frequent between 50 and 80 years, at 2.0 to 4.0 per 100,000 per year. [[Papri2021]]'},
 {n:'World',m:'2024 meta-analysis, 122 articles',v:1.12,
  txt:'1.12 per 100,000 person-years (95% CI 0.98 to 1.27): 1.38 in males and 0.99 in females. Across countries, more enteric infection went with more GBS. [[Xu2024]]'},
 {n:'Western countries',m:'2011 meta-analysis, median',v:1.11,lo:.81,hi:1.89,
  txt:'Sixteen North American and European studies, 1,643 cases and 152.7 million person-years: crude incidence 0.81 to 1.89 per 100,000 person-years, median 1.11. The model built from them gives the age curve in the other view. [[Sejvar2011]]'},
 {n:'Peru, 2015–2017',m:'hospital discharges, before the outbreak',lo:.62,hi:.92,
  txt:'0.62 (2015), 0.92 (2016) and 0.91 (2017) per 100,000 from hospital discharge data, before the 2019 outbreak, when the rate in affected areas reached nearly 25 times the expected level. [[Munayco2019,Munayco2020]]'},
 {n:'Mainland China',m:'all tertiary hospitals, 2016–2019',v:.698,
  txt:'0.698 per 100,000 person-years from 38,861 people at all 1,665 tertiary hospitals: 0.233 in children and 0.829 in adults, peaking at 70 to 74 years. Only tertiary hospitals were covered, so this may undercount. [[Zheng2022]]'},
 {n:'Urban China',m:'insurance records, 2013–2017',lo:.41,hi:.58,
  txt:'0.41 to 0.58 per 100,000 person-years from 1.44 billion insured person-years and 3,534 cases. [[Xu2024]]'},
 {n:'Brazil',m:'approximate',v:.40,lab:'0.40',
  txt:'About 0.40 per 100,000 per year, one of the lowest reported. [[Papri2021]]'}
];
/* IGOS regions [[Doets2018]] */
const WH_IG=[
 {n:'Europe/Americas',sh:'Europe/Am.',
  txt:'715 participants. The commonest form was sensorimotor (69%); Miller Fisher syndrome or overlap 11%. Median time from weakness to treatment 4 days, and IVIg was the first treatment in 86%. Median time to walking independently: 63 days. [[Doets2018]]'},
 {n:'Asia (not Bangladesh)',sh:'Asia',
  txt:'69 participants from Japan, Malaysia and Taiwan. Sensorimotor 43%, and Miller Fisher syndrome or overlap 22%, the highest share. Median time to treatment 5 days. Median time to walking independently: 39 days. [[Doets2018]]'},
 {n:'Bangladesh',sh:'Bangladesh',
  txt:'125 participants, median age 28 against 55 in Europe/Americas. Pure motor GBS was the main form (69%). Median MRC sum score at the worst point was 16 out of 60, against 46 in Europe/Americas. 86% received no immunotherapy. Median time to walking independently: 95 days. [[Doets2018]]'}
];
const WH_IGM=[
 {n:'Needed a ventilator',v:[17,25,29]},
 {n:'Unable to walk alone at worst',v:[76,76,93]},
 {n:'Axonal subtype',v:[6,6,36]},
 {n:'No immunotherapy at first',v:[7,13,86]},
 {n:'Walking unaided at 6 months',v:[79,88,62]},
 {n:'Walking unaided at 1 year',v:[83,91,69]},
 {n:'Died during follow-up',v:[5,2,17]}
];
const WH_IG_LEG='In each row, top to bottom: Europe/Americas, Asia, Bangladesh';

inits.what=()=>{
  /* ---------- the player ---------- */
  const svg=$('#whSvg'),rg=$('#whT');
  function nerveG(k,x,y,Z,t,blockOn){
    let s=`<g transform="translate(${f1(x)} ${f1(y+50*k)}) scale(${k.toFixed(3)})">`;
    s+=`<ellipse cx="0" cy="-42" rx="6.5" ry="4.6" style="fill:var(--myelin-line);opacity:.35"/><path d="M0 -36V18" style="stroke:var(--myelin-line);stroke-width:2.2;stroke-linecap:round;opacity:.8"/>`;
    Object.keys(WH_NV).forEach(z=>{const v=z==='breath'?Z.breath:Z[z]||0;[1,-1].forEach(sd=>{const P=WH_NV[z].map(p=>[p[0]*sd,p[1]]);
      s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--node);stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round"/>`;
      if(v>0)s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--damage);stroke-width:1.3;stroke-dasharray:2 1.6;opacity:${f1(v)}"/>`;
      if(z==='arm'||z==='leg'){const zz=z==='arm'?Z.arms:Z.legs,f=(t*5+(sd>0?0:.5))%1,cap=zz>.5&&blockOn?.4:1,ff=Math.min(f,cap),q=whAlong(P,ff);
        s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="1.7" style="fill:var(--impulse);stroke:var(--ink);stroke-width:.4;opacity:${f1(f>cap?.35:1)}"/>`}})});
    return s+'</g>'}
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const L=N?{bx:118,by:34,bs:240,lx:196,la:'s',brainY:[46,58],brainTo:[128,47],ventY:92,ventTo:[176,72],vir:[300,126],virY:154,cj:[300,198],cjY:226,nerveY:[250,262],nerveTo:[134,216],climbY:298,
               fx:16,fw:368,fy:362,fh:30,flY:318,fsY:404,bhY:436,r0:458,rh:30,rlx:16,rbx:160,rbw:170,rwx:338,sx:16,sw:368,sy:604}
             :{bx:200,by:36,bs:290,lx:14,la:'s',brainY:[52,64],brainTo:[186,54],ventY:110,ventTo:[194,68],vir:[62,148],virY:176,cj:[62,208],cjY:234,nerveY:[280,292],nerveTo:[182,255],climbY:350,
               fx:300,fw:404,fy:96,fh:34,flY:44,fsY:140,bhY:170,r0:192,rh:32,rlx:300,rbx:440,rbw:196,rwx:644,sx:300,sw:404,sy:352};
    const p=phaseOf(WH_STEPS,t),P=WH_STEPS[p],lv=whLv(t),Z=whZones(lv),k=L.bs/146;
    const vent=t>=.62&&t<.86,blockOn=t>.47&&t<.88,inf=ramp(t,.13,.17)*(1-ramp(t,.3,.34));
    let s='';
    /* body, its nerves and labels */
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,tingle:ramp(t,.33,.4)*(1-ramp(t,.9,1)),vent});
    s+=B.svg+nerveG(k,L.bx,L.by,Z,t,blockOn);
    const lead=(x1,y1,x2,y2)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:1"/>`;
    const lw=N?0:118;/* wide labels sit left of the body, so leaders start at their right end */
    s+=`<text x="${L.lx}" y="${L.brainY[0]}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.brain1}</text><text x="${L.lx}" y="${L.brainY[1]}" class="t-xs" style="fill:var(--good);font-weight:700">${WH_LBL.brain2}</text>`;
    s+=lead(N?L.lx-4:L.lx+lw,L.brainY[0]+2,L.brainTo[0],L.brainTo[1]);
    s+=`<text x="${L.lx}" y="${L.nerveY[0]}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.nerve1}</text><text x="${L.lx}" y="${L.nerveY[1]}" class="t-xs" style="fill:${t>=.31?'var(--bad)':'var(--ink)'};font-weight:700">${WH_LBL.nerve2}</text>`;
    s+=lead(N?L.lx-4:L.lx+lw,L.nerveY[0]-3,L.nerveTo[0],L.nerveTo[1]);
    if(vent){s+=`<text x="${L.lx}" y="${L.ventY}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.vent}</text>`+lead(N?L.lx-4:L.lx+100,L.ventY-3,L.ventTo[0],L.ventTo[1])}
    if(inf>0){s+=`<g style="opacity:${f1(inf)}">`+virus(L.vir[0],L.vir[1],11)+kitLabel(L.vir[0],L.virY,WH_LBL.chest,{a:'m'})+campy(L.cj[0],L.cj[1],50,{ang:-10,ph:t*8})+kitLabel(L.cj[0],L.cjY,WH_LBL.gut,{a:'m'})+'</g>'}
    if(t>=.47&&t<.8)s+=kitLabel(L.bx,L.climbY,WH_LBL.climb,{a:'m'});
    /* the fibre */
    const hit=ramp(t,.31,.4)*(1-ramp(t,.8,.95)),demy=ramp(t,.36,.6),remy=ramp(t,.84,1);
    const nv=nerveFibre(L.fx,L.fy,L.fw,{n:5,h:L.fh,nodeHit:[0,hit*.6,hit,hit*.8,hit*.4,0],demy:[demy*.5,demy,demy*.7,demy*.3,0],remy:[remy,remy,remy,remy*.6,0],mac:[0,demy*(1-remy),0,0,0],pulse:(t*9)%1,block:blockOn?2:undefined});
    s+=`<text x="${L.fx}" y="${L.flY}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.fibre}</text>`+nv.svg;
    s+=kitLabel(L.fx+L.fw/2,L.fsY,WH_FIB[P.s],{a:'m'});
    /* symptom bars */
    s+=`<text x="${L.rlx}" y="${L.bhY}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.bars}</text>`;
    WH_ROWS.forEach((r,i)=>{const y=L.r0+i*L.rh,v=Z[r.z];
      s+=`<text x="${L.rlx}" y="${y+4}" class="t-sm" style="fill:var(--ink)">${r.n}</text><rect x="${L.rbx}" y="${y-6}" width="${L.rbw}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
      if(v>0)s+=`<rect x="${L.rbx}" y="${y-6}" width="${f1(Math.max(12,L.rbw*v))}" height="12" rx="6" style="fill:var(--weak)"/>`;
      s+=`<text x="${L.rwx}" y="${y+4}" class="t-xs" style="${v>=.75?'fill:var(--ink);font-weight:700':''}">${whWord(v)}</text>`});
    /* phase strip */
    const sw=L.sw/WH_STEPS.length;
    WH_STEPS.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.s}</text>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    setSt(p);$('#whNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#whPlay'),draw,22000,'%t:player.replay%','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- incidence: by age or by country ---------- */
  const isv=$('#whInc'),age=$('#whAge'),aOut=$('#whAgeOut'),cap=$('#whIncCap'),inote=$('#whIncNote');
  let view='age',sx='all',china=false,sel=6;
  function drawAge(){
    const N=vb(isv,'720 360','400 340');
    const L=N?{x:46,y:34,w:330,h:240,tk:20,yt:16}:{x:62,y:34,w:620,h:250,tk:10,yt:16};
    const X=a=>L.x+L.w*a/90,Y=v=>L.y+L.h-L.h*v/4;
    let s=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    for(let v=0;v<=4;v++){s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.x-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`}
    for(let a=0;a<=90;a+=L.tk){s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${L.y+L.h}" y2="${L.y+L.h+4}" class="axis"/><text x="${f1(X(a))}" y="${L.y+L.h+16}" class="t-xs t-mid">${a}</text>`}
    s+=`<text x="${L.x+L.w}" y="${L.y+L.h+30}" class="t-xs t-end">age (years)</text><text x="${L.x}" y="${L.yt}" class="t-xs" style="fill:var(--ink);font-weight:700">new cases per 100,000 person-years</text>`;
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><line x1="${L.x}" x2="${L.x}" y1="${L.y}" y2="${L.y+L.h}" class="axis"/>`;
    if(china){WH_CN.forEach(b=>{s+=`<path d="M${f1(X(b.a0))} ${f1(Y(b.v))}H${f1(X(Math.min(90,b.a1+1)))}" style="stroke:var(--accent);stroke-width:2.4;stroke-dasharray:5 3"/>`});
      s+=`<text x="${f1(X(90)-2)}" y="${f1(Y(1.12)+16)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">urban China, 2017</text>`}
    const line=(f,a0,a1,col,on,dash)=>{let d='';for(let a=a0;a<=a1;a+=1){d+=(a===a0?'M':'L')+f1(X(a))+' '+f1(Y(f(a)))}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${on?3:1.8};opacity:${on?1:.45};stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/>`};
    s+=line(a=>whRate(a,'all'),0,90,'var(--brand)',sx==='all');
    s+=line(whMf,5,85,'var(--care)',sx==='m','7 3');
    s+=line(whFf,5,85,'var(--rx)',sx==='f','2 3');
    s+=`<text x="${f1(X(90)-2)}" y="${f1(Y(whRate(90,'all'))-9)}" class="t-xs t-end" style="fill:var(--ink);font-weight:${sx==='all'?700:500}">everyone</text>`;
    s+=`<text x="${f1(X(85)+4)}" y="${f1(Y(3.72)+3)}" class="t-xs" style="fill:var(--ink);font-weight:${sx==='m'?700:500}">men</text>`;
    s+=`<text x="${f1(X(85)+4)}" y="${f1(Y(2.09)+12)}" class="t-xs" style="fill:var(--ink);font-weight:${sx==='f'?700:500}">women</text>`;
    WH_M.concat(WH_F).forEach(([a,v])=>{s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="2.4" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2"/>`});
    const a=+age.value,aa=sx==='all'?a:clamp(a,5,85),r=whRate(aa,sx);
    s+=`<line x1="${f1(X(aa))}" x2="${f1(X(aa))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/><circle cx="${f1(X(aa))}" cy="${f1(Y(r))}" r="6" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/>`;
    const lx=X(aa)>L.x+L.w-70?X(aa)-10:X(aa)+10;
    s+=kitLabel(lx,Y(r)-10,r.toFixed(2),{a:X(aa)>L.x+L.w-70?'e':''});
    isv.innerHTML=s;
    const one=Math.round(1e5/r/100)*100;
    aOut.textContent=a+' years';
    inote.innerHTML=`<div class="kicker">Western model · ${WH_SX[sx]}</div><h4>Age ${aa}: ${r.toFixed(2)} per 100,000 person-years</h4>`+
      `<p class="wh-big">1 in ${one.toLocaleString('en-GB')}</p><p>That is roughly 1 new case a year among this many people of this age (calculated here from the model). [[Sejvar2011]]</p>`+
      (sx==='all'?'<p>Everyone: rate = exp(−12.0771 + 0.01813 × age) × 100,000, from the pooled Western studies. Incidence rises about 20% with every 10 years of age. [[Sejvar2011]]</p>':'<p>Men and women: the published model points at ages 5, 25, 45, 65 and 85, with the line drawn between them. The male to female rate ratio is 1.78. [[Sejvar2011]]</p>')+
      (sx!=='all'&&(a<5||a>85)?'<p>The sex-specific points cover ages 5 to 85, so the reading stops there.</p>':'')+
      (china?'<p>Urban China, 2017: the rate also rises with age but from a lower base, 0.16 under 19 and 1.12 at 70 and over. [[Xu2024]] Where young people make up most of the population, as in Bangladesh, China, India, Brazil, Ethiopia and Tanzania, most cases occur at 21 to 35 years. [[Papri2021]]</p>':'')+
      '<p>The age slope is debated: 20% per decade in this model, against 50% per decade in US data that relied on diagnosis codes. [[Sejvar2011,Shui2012]]</p>';
  }
  function drawReg(){
    const N=vb(isv,'720 360','400 600');
    const L=N?{x0:16,bw:300,y0:44,rh:50}:{x0:310,bw:300,y0:46,rh:28};
    const X=v=>L.x0+L.bw*v/3.2;
    let s=`<text x="16" y="18" class="t-xs" style="fill:var(--ink);font-weight:700">new cases per 100,000 a year, as each study measured it</text>`;
    [0,1,2,3].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-10}" y2="${L.y0+WH_INC.length*L.rh-8}" class="grid"/><text x="${f1(X(v))}" y="${L.y0-14}" class="t-xs t-mid">${v}</text>`});
    WH_INC.forEach((r,i)=>{const y=L.y0+i*L.rh,on=i===sel,by=N?y+28:y+2,hi=r.hi||r.v,lo=r.v!=null?r.v:r.lo;
      s+=`<g class="clk" tabindex="0" role="button" aria-pressed="${on}" aria-label="${r.n}, ${r.m}" data-i="${i}">`;
      s+=`<rect class="fr" x="8" y="${N?y-4:y-3}" width="${N?384:704}" height="${N?L.rh-4:L.rh-3}" rx="7" style="fill:${on?'var(--brand-soft)':'transparent'};stroke:${on?'var(--brand)':'transparent'};stroke-width:1.4"/>`;
      s+=`<text x="16" y="${N?y+10:y+8}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text><text x="16" y="${N?y+22:y+19}" class="t-xs">${r.m}</text>`;
      s+=`<rect x="${L.x0}" y="${by}" width="${f1(X(lo)-L.x0)}" height="12" rx="3" style="fill:var(--brand)"/>`;
      if(r.hi)s+=`<rect x="${f1(X(lo))}" y="${by}" width="${f1(X(r.hi)-X(lo))}" height="12" rx="3" style="fill:var(--brand);opacity:.35"/>`;
      if(r.v!=null&&r.lo!=null)s+=`<path d="M${f1(X(r.lo))} ${by+6}H${f1(X(r.hi))}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      const val=r.lab||(r.v!=null?(r.lo!=null?`${r.v} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`:String(r.v)):`${r.lo.toFixed(2)}–${r.hi.toFixed(2)}`);
      s+=`<text x="${f1(X(hi)+6)}" y="${by+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${val}</text></g>`});
    isv.innerHTML=s;
    const r=WH_INC[sel];inote.innerHTML=`<div class="kicker">${r.m}</div><h4>${r.n}</h4><p>${r.txt}</p>`;
  }
  function drawInc(){if(view==='age')drawAge();else drawReg();cap.innerHTML=view==='age'?WH_CAP_AGE:WH_CAP_REG}
  const pickReg=i=>{sel=i;drawReg()};
  isv.addEventListener('click',e=>{const g=e.target.closest('[data-i]');if(g)pickReg(+g.dataset.i)});
  isv.addEventListener('keydown',e=>{const g=e.target.closest('[data-i]');if(!g)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();pickReg(+g.dataset.i);const n=isv.querySelector(`[data-i="${g.dataset.i}"]`);n&&n.focus()}});
  const setView=v=>{view=v;$('#whVAge').setAttribute('aria-pressed',v==='age');$('#whVReg').setAttribute('aria-pressed',v==='reg');$('#whAgeCtrls').hidden=v!=='age';drawInc()};
  $('#whVAge').addEventListener('click',()=>setView('age'));$('#whVReg').addEventListener('click',()=>setView('reg'));
  $$('[data-sx]',$('#whAgeCtrls')).forEach(b=>b.addEventListener('click',()=>{sx=b.dataset.sx;$$('[data-sx]',$('#whAgeCtrls')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawAge()}));
  $('#whChina').addEventListener('click',e=>{china=!china;e.currentTarget.setAttribute('aria-pressed',china);drawAge()});
  age.addEventListener('input',drawAge);
  drawInc();

  /* ---------- IGOS regions ---------- */
  const gsv=$('#whReg'),gnote=$('#whRegNote'),gb=$('#whRegBtns');let reg=0,grow=1,stopG=null;
  gb.innerHTML=WH_IG.map((r,i)=>`<button class="btn" data-r="${i}" aria-pressed="${i===0}">${r.n}</button>`).join('');
  function drawIG(){
    const N=vb(gsv,'720 380','400 510');
    const L=N?{lx:16,x0:16,bw:250,y0:40,rh:66,b0:18}:{lx:16,x0:250,bw:340,y0:40,rh:48,b0:4};
    let s=`<text x="16" y="20" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_IG_LEG}</text>`;
    WH_IGM.forEach((m,i)=>{const y=L.y0+i*L.rh;
      s+=`<text x="${L.lx}" y="${N?y+11:y+21}" class="t-sm" style="fill:var(--ink);font-weight:700">${m.n}</text>`;
      m.v.forEach((v,j)=>{const on=j===reg,by=y+L.b0+j*13,w=L.bw*v/100*(on?grow:1);
        s+=`<rect x="${L.x0}" y="${by}" width="${f1(L.bw)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${L.x0}" y="${by}" width="${f1(Math.max(2,w))}" height="11" rx="3" style="fill:${on?'var(--brand)':'var(--muted)'};opacity:${on?1:.4}"/>`;
        s+=`<text x="${f1(L.x0+L.bw+6)}" y="${by+9}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${v}% ${WH_IG[j].sh}</text>`})});
    gsv.innerHTML=s;
    const r=WH_IG[reg];gnote.innerHTML=`<div class="kicker">IGOS region</div><h4>${r.n}</h4><p>${r.txt}</p>`;
  }
  gb.addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;reg=+b.dataset.r;$$('[data-r]',gb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopG&&stopG();stopG=animate(700,q=>{grow=ease(q);drawIG()},()=>{stopG=null;grow=1})});
  drawIG();
  const prev=redraws.what;redraws.what=()=>{prev&&prev();drawInc();drawIG()};
  const prevH=onHide.what;onHide.what=()=>{prevH&&prevH();stopG&&stopG();stopG=null;grow=1};
};
