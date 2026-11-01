/* =============== 5.1 Course & outcomes =============== */
const OC_A0=6,OC_A1=40,ocT=a=>(a-OC_A0)/(OC_A1-OC_A0);
const OC_STEPS=[
 {from:0,at:ocT(8),k:'Ages 6–11 · childhood',t:'Diagnosis, and more injuries',
  txt:`Most children are diagnosed at primary-school age. On average, children and adolescents with ADHD have more unintentional injuries: across 28 studies (350,938 with ADHD) the pooled odds ratio was 1.53. In Denmark, children with ADHD had more injuries at age 10 (adjusted OR 1.29) and 12 (1.30). Hyperactive-impulsive symptoms are the ones most linked to injury and peer rejection. [[RuizGoikoetxea2018,Dalsgaard2015Injury,Faraone2021]]`,
  pt:`Children with ADHD get hurt more often on average. Supervision and safety habits help.`,
  hook:`Injuries in children with ADHD: pooled OR 1.53 (28 studies). [[RuizGoikoetxea2018]]`},
 {from:ocT(12),at:ocT(15.5),k:'Ages 12–17 · adolescence',t:'Remission periods begin, demands rise',
  txt:`In the MTA cohort, remission periods usually first appeared in adolescence, and symptoms tended to return when environmental demands rose. Teenagers with ADHD had more substance use than classmates at every age, whatever their treatment. In Danish registers, people with ADHD were more likely to become parents at 12–16 (IRR 3.62 for girls, 2.30 for boys). Childhood ADHD is linked to not finishing high school (OR 3.7). [[Sibley2024,Molina2013,Ostergaard2017,Erskine2016]]`,
  pt:`Symptoms can ease in the teenage years and come back when school or life gets harder.`,
  hook:`MTA: remissions usually first appear in adolescence, often linked to environmental demands. [[Sibley2024]]`},
 {from:ocT(18),at:ocT(25),k:'Ages 18–25 · young adulthood',t:'Does ADHD last? It depends on the definition',
  txt:`A meta-analysis of follow-up studies found that at 25 only about 15% of people diagnosed in childhood still met full criteria, but about 65% did when partial remission (residual, impairing symptoms) was counted. Estimates "rely heavily on how one defines persistence". Use the buttons above the stepper to switch definitions. Young adults with ADHD face a modestly raised crash risk (RR 1.23 after adjusting for driving exposure) and convictions (RR 3.3), the crash excess mostly tied to co-occurring conduct problems. [[Faraone2006,Vaa2014,MohrJensen2016]]`,
  pt:`Many young adults no longer meet every criterion, but most still have some symptoms that get in the way.`,
  hook:`Persistence at 25: about 15% full syndrome, about 65% including partial remission. [[Faraone2006]]`},
 {from:ocT(25.2),at:ocT(27),k:'MTA · 16 years of follow-up',t:'A fluctuating course',
  txt:`The MTA followed 558 children with ADHD to a mean age of about 25 with 8 assessments. About 30% had full remission at some point, but 60% of those then had a recurrence. Only 9.1% showed sustained recovery and 10.8% stable persistence; 63.8% fluctuated, with a mean of 3.58 swings and a 6- to 7-symptom difference between peaks and troughs. The authors note that 90% still had residual symptoms into young adulthood, challenging the idea that half "outgrow" ADHD. [[Sibley2022,Sibley2024]]`,
  pt:`For most people ADHD is not simply "gone" or "still there". It eases and returns over the years.`,
  hook:`MTA course: 9.1% recovery, 10.8% stable persistence, 63.8% fluctuating. [[Sibley2022]]`},
 {from:ocT(30),at:ocT(39),k:'Ages 26–40 · adult life',t:'Group risks, not destiny',
  txt:`In Denmark, the mortality rate was 5.85 per 10,000 person-years with ADHD against 2.21 without: a fully adjusted mortality rate ratio of 2.07, and accidents were the most common cause of death. The ratio was highest for ADHD diagnosed in adulthood (4.25). Adults with ADHD earned 17% less on average in Sweden and had more unemployment (OR 2.0). These are group averages: many people with ADHD finish school, work, drive safely and live long lives. [[Dalsgaard2015,Jangmo2021,Erskine2016]]`,
  pt:`On average, people with ADHD face more risks, mostly from accidents. That is a pattern across groups, not a forecast for you.`,
  hook:`ADHD mortality rate ratio ≈ 2 (Denmark 2.07), mostly from accidents. [[Dalsgaard2015]]`}
];
inits.outcomes=()=>{
  const svg=$('#ocSvg'),rg=$('#ocT');let def='full',setSt=()=>{};
  const sh=a=>1-Math.pow(1-ramp(a,6,25),1.7);
  const band=a=>{const s=sh(a);return{full:1-.85*s,part:.5*s,rem:.35*s}};
  const sym=a=>clamp(lerp(12,7.5,ramp(a,8,25))+3.3*Math.sin(2*Math.PI*(a-12.6)/4.4)*ramp(a,11,14)*(1-.35*ramp(a,26,40)),0,18);
  const RIB=[ [8,'injuries','OR 1.53'],[13,'substance use','↑ (MTA)'],[15,'teen parent','IRR 3.62'],[17,'no school exit','OR 3.7'],[18,'crashes','RR 1.23'],[20,'convictions','RR 3.3'],[22,'depression','OR 1.35'],[25,'unemployment','OR 2.0'],[30,'income','−17%'],[36,'mortality','MRR 2.07'] ];
  function draw(t){const N=vb(svg,'720 480','400 800'),age=lerp(OC_A0,OC_A1,t),ph=phaseOf(OC_STEPS,t);let s='';
    const x0=N?40:52,x1=N?384:704,X=a=>lerp(x0,x1,(a-OC_A0)/(OC_A1-OC_A0));
    /* ---- persistence bands ---- */
    const P={y0:N?44:44,y1:N?220:184};const V=v=>lerp(P.y1,P.y0,v);
    s+=`<text x="${x0-30}" y="${P.y0-14}" class="t-sm" style="fill:var(--brand)">${N?'CHILDREN DIAGNOSED: STATUS BY AGE':'OF 100 CHILDREN DIAGNOSED WITH ADHD: STATUS BY AGE'}</text>`;
    [0,.5,1].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    const ages=[];for(let a=6;a<=age+1e-6;a+=.25)ages.push(a);ages.push(age);
    if(ages.length>1){const top=f=>ages.map((a,i)=>(i?'L':'M')+f1(X(a))+' '+f1(V(f(band(a))))).join('');
      const area=(fa,fb,c,op)=>{const up=ages.map((a,i)=>(i?'L':'M')+f1(X(a))+' '+f1(V(fa(band(a))))).join(''),dn=ages.slice().reverse().map(a=>'L'+f1(X(a))+' '+f1(V(fb(band(a))))).join('');return `<path d="${up}${dn}Z" style="fill:${c};opacity:${op}"/>`};
      const on=k=>def==='full'?k==='full':k!=='rem';
      s+=area(b=>1,b=>b.full+b.part,'var(--good)',.32);
      s+=area(b=>b.full+b.part,b=>b.full,'var(--da)',on('part')?.75:.3);
      s+=area(b=>b.full,b=>0,'var(--brand)',.8);
      s+=`<path d="${top(b=>b.full+b.part)}" style="fill:none;stroke:var(--panel);stroke-width:1"/>`;
      if(age>25)s+=`<line x1="${f1(X(25))}" x2="${f1(X(25))}" y1="${P.y0}" y2="${P.y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/><text x="${f1(X(25)+4)}" y="${P.y0+24}" class="t-xs" style="fill:var(--ink)">${N?'25: last data':'age 25: last published point · held flat after'}</text>`;
      const b=band(Math.min(age,40));
      if(age>=12){const lx=X(Math.min(age,25))-4;[ ['full syndrome',b.full/2,'var(--on-brand)'],['partial remission',b.full+b.part/2,'var(--ink)'],['remission',b.full+b.part+b.rem/2,'var(--ink)'] ].forEach(([l,v,c])=>{s+=`<text x="${f1(lx)}" y="${f1(V(v)+3)}" class="t-xs t-end" style="fill:${c};font-weight:700">${l}</text>`})}}
    /* ---- one person's course ---- */
    const C={y0:N?262:234,y1:N?380:316};const SY=v=>lerp(C.y1,C.y0,v/16);
    s+=`<text x="${x0-30}" y="${C.y0-10}" class="t-sm" style="fill:var(--brand)">${N?'ONE PERSON (ILLUSTRATIVE)':'ONE PERSON\'S SYMPTOM COUNT (ILLUSTRATIVE, MTA-LIKE COURSE)'}</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(SY(6))}" y2="${f1(SY(6))}" style="stroke:var(--dz);stroke-width:1.2;stroke-dasharray:5 4"/><text x="${x1}" y="${f1(SY(6)-4)}" class="t-xs t-end" style="fill:var(--dz)">threshold</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${C.y1}" y2="${C.y1}" class="axis"/><text x="${x0-6}" y="${f1(SY(0)+3)}" class="t-xs t-end">0</text><text x="${x0-6}" y="${f1(SY(16)+3)}" class="t-xs t-end">16</text>`;
    let rem='',d1='',d2='';for(let a=6;a<=age;a+=.1){const v=sym(a);
      if(v<6)rem+=`<rect x="${f1(X(a))}" y="${C.y0}" width="${f1(X(a+.1)-X(a)+.3)}" height="${C.y1-C.y0}" style="fill:var(--good);opacity:.16"/>`;
      if(a<=25.05)d1+=(d1?'L':'M')+f1(X(a))+' '+f1(SY(v));if(a>=25)d2+=(d2?'L':'M')+f1(X(a))+' '+f1(SY(v))}
    s+=rem+(d1?`<path d="${d1}" style="fill:none;stroke:var(--brand);stroke-width:2.4;stroke-linejoin:round"/>`:'')+(d2?`<path d="${d2}" style="fill:none;stroke:var(--brand);stroke-width:2;stroke-dasharray:4 3;opacity:.7"/>`:'');
    const fr=(()=>{for(let a=10;a<age;a+=.1)if(sym(a)<6)return a+.6;return null})();if(fr!=null)s+=`<text x="${f1(X(fr))}" y="${C.y1-6}" class="t-xs t-mid" style="fill:var(--good)">remission</text>`;
    if(ph===3||ph===4){const mx=N?x0-24:X(29.4),my=N?C.y1+30:C.y0+4,W=N?x1-x0+24:x1-X(29.4),parts=[ [9.1,'var(--good)','recover'],[15.6,'var(--da)','partial'],[63.8,'var(--brand)','fluctuate'],[10.8,'var(--dz)','persist'] ];let cx=mx;
      if(!N)s+=`<rect x="${f1(mx-6)}" y="${my-14}" width="${f1(W+8)}" height="72" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${f1(mx)}" y="${my-2}" class="t-xs" style="fill:var(--ink);font-weight:700">MTA course mix (N=558)</text>`;
      parts.forEach(([v,c,l],k)=>{const w=W*v/99.3;s+=`<rect x="${f1(cx)}" y="${my+4}" width="${f1(w-1)}" height="12" style="fill:${c}"/>`;cx+=w;
        const lx=mx+(k%2)*W/2,ly=my+32+Math.floor(k/2)*15;s+=`<rect x="${f1(lx)}" y="${ly-8}" width="8" height="8" style="fill:${c}"/><text x="${f1(lx+12)}" y="${ly}" class="t-xs" style="fill:var(--ink)">${l} ${v}%</text>`})}
    /* ---- life-course ribbon ---- */
    if(N){const y0=C.y1+(ph>=3?104:34);s+=`<text x="10" y="${y0}" class="t-sm" style="fill:var(--brand)">LIFE-COURSE MARKERS · GROUP RATIOS</text>`;
      RIB.forEach(([a,l,r],i)=>{const y=y0+20+i*(ph>=3?27:31),on=age>=a;
        s+=`<circle cx="22" cy="${y-4}" r="6" style="fill:${on?'var(--brand)':'var(--panel-2)'};stroke:var(--brand);stroke-width:1.2"/><text x="36" y="${y}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">age ${a} · ${l}</text><text x="384" y="${y}" class="t-xs t-end" style="fill:${on?'var(--brand)':'var(--line)'};font-weight:700">${on?r:''}</text>`})}
    else{const ry=416;s+=`<text x="${x0-30}" y="${ry-58}" class="t-sm" style="fill:var(--brand)">LIFE-COURSE MARKERS · PEOPLE WITH ADHD VS WITHOUT (GROUP RATIOS)</text>`;
      s+=`<line x1="${x0}" x2="${f1(X(age))}" y1="${ry}" y2="${ry}" style="stroke:var(--brand);stroke-width:6;stroke-linecap:round;opacity:.5"/><line x1="${f1(X(age))}" x2="${x1}" y1="${ry}" y2="${ry}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
      const TY=[-32,-14,24,42];
      RIB.forEach(([a,l,r],i)=>{const on=age>=a,x=X(a),ty=ry+TY[i%4];
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ry}" y2="${f1(ty+(ty<ry?4:-12))}" style="stroke:${on?'var(--brand)':'var(--line)'};stroke-width:1"/><circle cx="${f1(x)}" cy="${ry}" r="6" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.4"/>`;
        if(on)s+=`<text x="${f1(a>=33?x-4:x+4)}" y="${ty}" class="t-xs${a>=33?' t-end':''}" style="fill:var(--ink)">${l} <tspan style="fill:var(--brand);font-weight:700">${r}</tspan></text>`})}
    /* age axis & playhead */
    [6,10,15,20,25,30,35,40].forEach(a=>s+=`<text x="${f1(X(a))}" y="${P.y1+13}" class="t-xs t-mid">${a}</text>`);
    s+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="${P.y0}" y2="${C.y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/><text x="${f1(clamp(X(age),x0+20,x1-20))}" y="${P.y0-2}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">age ${Math.floor(age)}</text>`;
    svg.innerHTML=s;setSt(ph);
    const b=band(age),still=def==='full'?b.full:b.full+b.part;
    $('#ocRead').innerHTML=`<span>age <b>${Math.floor(age)}</b></span><span>full syndrome <b>${Math.round(b.full*100)}%</b></span><span>partial <b>${Math.round(b.part*100)}%</b></span><span>remission <b>${Math.round(b.rem*100)}%</b></span><span>${def==='full'?'still has ADHD (full)':'still has ADHD (incl. partial)'} <b>${Math.round(still*100)}%</b>${age>=25?' · published at 25':' · drawn'}</span>`;
    $('#ocNote').innerHTML=noteHTML(OC_STEPS[ph]);
  }
  const stop=playWire(rg,$('#ocPlay'),draw,24000,'Replay','outcomes');
  setSt=stepWire($('#ocSteps'),OC_STEPS,rg,draw,stop);
  $$('[data-ocdef]').forEach(b=>b.addEventListener('click',()=>{def=b.dataset.ocdef;$$('[data-ocdef]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- on vs off medication ---------- */
  const ms=$('#ocMed');
  const MED={
   crash:{t:'Driving crashes',ev:'est',max:100,unit:'emergency visits for crashes, off-medication months = 100',
    G:[ ['Men',100,62,'OR 0.62'],['Women',100,58,'OR 0.58'] ],
    cap:`US insurance claims, 2,319,450 people with ADHD (mean age 32.5). [[Chang2017Crash]]`,
    txt:`Months on ADHD medication had 38% lower odds of emergency visits for crashes in men (OR 0.62) and 42% lower in women (OR 0.58). The authors estimated that up to 22.1% of crashes might have been avoided with medication throughout follow-up, a model estimate. In Swedish men, medication periods went with a 58% lower risk of serious transport accidents (HR 0.42); in women there was no significant association. [[Chang2017Crash,Chang2014Crash]]`,
    hook:`Medicated months: 38% (men) and 42% (women) lower odds of crash-related emergency visits. [[Chang2017Crash]]`},
   crime:{t:'Criminal convictions',ev:'est',max:100,unit:'conviction rate, off-medication periods = 100',
    G:[ ['Men',100,68,'HR 0.68'],['Women',100,59,'HR 0.59'] ],
    cap:`Swedish registers, 25,656 people with ADHD, 2006–2009. [[Lichtenstein2012]]`,
    txt:`Comparing each person's medicated and unmedicated periods, conviction rates were 32% lower in men (HR 0.68) and 41% lower in women (HR 0.59). In men the reduction stayed between 17% and 46% across sensitivity analyses, including stimulant vs non-stimulant medicines and type of crime. A 2025 target-trial emulation found a lower first-event rate for criminality over 2 years after starting medication (IRR 0.87). [[Lichtenstein2012,Zhang2025BMJ]]`,
    hook:`Within-person design: 32% fewer convictions in men, 41% in women during medication. [[Lichtenstein2012]]`},
   injury:{t:'Injuries',ev:'early',max:100,unit:'injury events, off-medication periods = 100',
    G:[ ['Hong Kong, trauma admissions',100,91,'IRR 0.91'],['Pooled self-controlled studies',100,87.9,'0.879'] ],
    cap:`Self-controlled case series of 17,381 young people on methylphenidate; meta-analysis of designs avoiding confounding by indication. [[Man2015,RuizGoikoetxea2018]]`,
    txt:`In Hong Kong, trauma-related emergency admissions were lower during methylphenidate treatment (IRR 0.91), with no change in a negative-control outcome (IRR 0.99), a check that the design is not simply picking up healthier periods. Studies that avoided confounding by indication gave a pooled effect of 0.879. In Denmark, injury rates in medicated children fell from 19% at 5 to 14% at 10, against about 17% in untreated children. In a 2025 target-trial emulation, first injuries did not fall significantly (IRR 0.98), but recurrent injuries did (0.96). [[Man2015,RuizGoikoetxea2018,Dalsgaard2015Injury,Zhang2025BMJ]]`,
    hook:`Self-controlled injury studies: pooled effect 0.879 during ADHD medication. [[RuizGoikoetxea2018]]`},
   subst:{t:'Substance-related events',ev:'est',max:100,unit:'substance-related emergency visits, off-medication months = 100',
    G:[ ['Men, same month',100,65,'OR 0.65'],['Women, same month',100,69,'OR 0.69'],['Men, 2 years later',100,81,'OR 0.81'],['Women, 2 years later',100,86,'OR 0.86'] ],
    cap:`US claims, 2,993,887 adolescents and adults with ADHD. [[Quinn2017]]`,
    txt:`Medicated months had 35% lower odds of substance-related emergency visits in men and 31% lower in women, and odds were still lower two years later, though less consistently in women. In Sweden, stimulant treatment in 2006 went with a 31% lower rate of substance abuse in 2009 (HR 0.69). But in the randomised MTA, treatment was not linked to adolescent substance use in either direction: medication does not appear to raise later drug problems, and whether it lowers them is less certain. [[Quinn2017,Chang2014SUD,Molina2013]]`,
    hook:`Medicated months: 35% (men) and 31% (women) lower odds of substance-related emergency visits; MTA RCT follow-up: no effect either way. [[Quinn2017,Molina2013]]`},
   suic:{t:'Suicide-related events',ev:'early',max:140,unit:'suicide-related events, off medication = 100',
    G:[ ['Between people (naive)',100,131,'HR 1.31'],['Within the same person',100,89,'HR 0.89'] ],
    cap:`Swedish registers, 37,936 people with ADHD, 2006–2009. [[Chen2014BMJ]]`,
    txt:`This is the clearest lesson in study design. Comparing people who took medication with people who did not suggested more suicide-related events with medication (HR 1.31), because people with more severe problems are more likely to be treated. Comparing the same people on and off medication reversed the sign (HR 0.89); among stimulant users it was 0.81. Even so, a 2026 meta-analysis stressed that such findings "are not causal" and may carry residual confounding. [[Chen2014BMJ,Kozhevnikova2026]]`,
    hook:`Within-person designs can reverse a naive association: suicidal events HR 1.31 between people vs 0.89 within the same person. [[Chen2014BMJ]]`},
   death:{t:'Mortality',ev:'early',max:50,unit:'deaths per 10,000 over 2 years after diagnosis',
    G:[ ['All causes',48.1,39.1,'HR 0.79'],['Unnatural causes',33.3,25.9,'HR 0.75'],['Natural causes',14.7,13.1,'HR 0.86, n.s.'] ],
    cap:`Swedish target-trial emulation, 148,578 people aged 6–64 with a new diagnosis; "off" = did not start medication within 3 months. [[Li2024JAMA]]`,
    txt:`Starting ADHD medication within 3 months of diagnosis was associated with lower 2-year all-cause mortality: 39.1 vs 48.1 per 10,000 (HR 0.79). The benefit was seen for unnatural causes such as accidents (HR 0.75) but not natural causes (HR 0.86, not significant). That fits the Danish finding that excess deaths in ADHD (MRR 2.07) are mostly accidents. A target-trial emulation compares starters with similar non-starters; it is not a randomised trial. [[Li2024JAMA,Dalsgaard2015]]`,
    hook:`Starting ADHD medication: lower 2-year mortality (HR 0.79), driven by unnatural causes. [[Li2024JAMA]]`}
  };
  let mk='crash',stopM=null,prevG=null;
  function drawM(fr){const M=MED[mk],G=M.G,N=vb(ms,`720 ${70+G.length*60}`,`400 ${80+G.length*84}`);let s='';
    const lx=N?16:16,bx0=N?16:230,bx1=N?330:620,X=v=>lerp(bx0,bx1,v/M.max);
    s+=`<text x="${lx}" y="22" class="t-sm" style="fill:var(--brand)">${M.t.toUpperCase()}</text><text x="${N?384:704}" y="22" class="t-xs t-end">${N?'':M.unit}</text>`;
    if(N)s+=`<text x="${lx}" y="40" class="t-xs">${M.unit}</text>`;
    const rowH=N?84:60,y0=N?62:48;
    G.forEach(([l,off,on,lab],i)=>{const y=y0+i*rowH,onV=fr?fr[i]:on;
      if(N)s+=`<text x="${lx}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${l}</text>`;else s+=`<text x="${lx}" y="${y+22}" class="t-xs" style="fill:var(--ink);font-weight:700">${l}</text>`;
      const by=N?y+16:y+4,bh=N?16:18;
      s+=`<rect x="${bx0}" y="${by}" width="${f1(X(off)-bx0)}" height="${bh}" rx="4" style="fill:var(--muted);opacity:.55"/><text x="${f1(X(off)+6)}" y="${by+13}" class="t-xs">off ${off}</text>`;
      s+=`<rect x="${bx0}" y="${by+bh+4}" width="${f1(Math.max(0,X(onV)-bx0))}" height="${bh}" rx="4" style="fill:var(--rx)"/><text x="${f1(X(onV)+6)}" y="${by+bh+17}" class="t-xs" style="fill:var(--ink)">on ${f1(onV).replace('.0','')} · <tspan style="fill:var(--rx);font-weight:700">${lab}</tspan></text>`});
    if(mk!=='death')s+=`<line x1="${f1(X(100))}" x2="${f1(X(100))}" y1="${y0-6}" y2="${y0+G.length*rowH-8}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
    ms.innerHTML=s;
    $('#ocMedCap').innerHTML=M.cap+' Observational: within-person designs remove stable confounders but not changes over time. [[Kozhevnikova2026]]';
    const EV={est:'<span class="ev est">Established association</span>',early:'<span class="ev early">Early evidence</span>'};
    $('#ocMedNote').innerHTML=noteHTML({k:'On vs off medication · '+(M.ev==='est'?'replicated':'fewer studies'),t:M.t,txt:EV[M.ev]+' '+M.txt,
      pt:`In big studies, the same people had fewer of these events while taking ADHD medicine. That is strong evidence, but not proof that the medicine caused the change.`,hook:M.hook})}
  $$('[data-ocm]').forEach(b=>b.addEventListener('click',()=>{mk=b.dataset.ocm;$$('[data-ocm]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const G=MED[mk].G;if(stopM)stopM();stopM=animate(700,p=>drawM(G.map(g=>lerp(g[1],g[2],ease(p)))),()=>{stopM=null})}));
  const prevR=redraws.outcomes;redraws.outcomes=()=>{prevR&&prevR();drawM()};
  drawM();
};
