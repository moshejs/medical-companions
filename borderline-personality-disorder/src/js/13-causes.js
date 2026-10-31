/* =============== 1.3 Causes & the biosocial model =============== */
const CA_AGE=25;
/* ages (years) at which the schematic child shows a strong feeling and someone responds */
const CA_EV=[0.7,1.7,2.6,3.5,4.4,5.3,6.2,7.0,7.8,8.6,9.4,10.2,11.0,11.8,12.6,13.4,14.2,15.0,15.9,16.8,17.7,18.8,20.1,21.5,23.0,24.4];
/* response type per exchange: d = dismissed / punished, a = answered only after escalation, v = validated, n = neutral (infancy) */
function caResp(env,i,a){if(a<1.2)return 'n';if(env==='val')return 'v';
  if(a>=6&&a<12.5)return i%3===2?'a':'d';return i%5===4?'v':'d'}
function caPulse(env,a){/* height and settle time of the reaction at age a */
  const inv=env==='inv';
  const h=inv?.3+.5*ramp(a,1.5,15)-.2*ramp(a,18,25):.3+.1*ramp(a,1.5,12)-.08*ramp(a,18,25);
  const tau=inv?.18+.36*ramp(a,2,15)-.12*ramp(a,18,25):.18+.04*ramp(a,2,12);
  return {h,tau}}
function caLevel(env,a){const inv=env==='inv';
  let v=inv?.1+.12*ramp(a,4,16)-.07*ramp(a,18,25):.1+.02*ramp(a,4,16);
  CA_EV.forEach((e,i)=>{const d=a-e;if(d<=0)return;const P=caPulse(env,e),boost=caResp(env,i,e)==='a'?1.12:1;
    v+=P.h*boost*(1-Math.exp(-d/.05))*Math.exp(-d/P.tau)});
  return clamp(v,0,1)}
const CA_TXT={
 inv:[
  {c:['Big feelings,','fast to rise'],e:['Caregivers learn','this baby’s signals']},
  {c:['Upset, and','it isn’t real?'],e:['“Stop crying,','it’s nothing.”']},
  {c:['Louder, so','someone notices'],e:['“You’re','overreacting.”']},
  {c:['Only the biggest','storms get through'],e:['Ignored, then','suddenly answered']},
  {c:['Who am I if my','feelings are wrong?'],e:['“You’re too much.”']},
  {c:['Strong feelings,','slow to settle'],e:['Pattern carries into','adult relationships']}],
 val:[
  {c:['Big feelings,','fast to rise'],e:['Caregivers learn','this baby’s signals']},
  {c:['Upset,','and seen'],e:['“That scared you.','I’m here.”']},
  {c:['Angry, but','heard'],e:['“You’re angry.','Let’s sort it out.”']},
  {c:['Feelings rise,','then settle'],e:['Steady, predictable','responses']},
  {c:['Still sensitive,','with words for it'],e:['“That makes sense.','What would help?”']},
  {c:['Sensitive,','with ways to cope'],e:['Skills learned','at home travel on']}]};
const CA_STEPS=[
 {from:0,at:.03,k:'Birth to age 2',t:'Temperament at birth',
  txt:`The biosocial model starts with the child. Some children are born more emotionally vulnerable: more sensitive to emotional cues, with reactions that are hard to regulate and slow to return to baseline. The developmental version adds impulsivity as one of the earliest traits on the path. In the Pittsburgh Girls Study, parent and teacher ratings of emotionality at ages 5–8, and parent-rated hyperactivity/impulsivity, predicted new positive BPD screens at 14–22. [[Crowell2009,Stepp2017]]`,
  pt:`Some babies feel things more strongly and calm down more slowly. That is a difference in temperament, not a fault, and it is nobody’s doing.`,
  hook:`Biosocial model = emotional vulnerability (sensitivity, reactivity, slow return to baseline) × an invalidating environment. [[Crowell2009]]`},
 {from:.08,at:.15,k:'Ages 2–6',t:'Early invalidation',
  txt:`The other half of the model is the environment. An invalidating environment is intolerant of a child’s private emotional experience, especially emotions that are not backed by something others can see. In a 56-family study followed from infancy, maternal withdrawal observed at 18 months predicted borderline symptoms and suicidality or self-injury in late adolescence, independently of childhood abuse. In the Minnesota high-risk cohort, early temperament, disorganised attachment and parental hostility all predicted adult BPD symptoms. [[Crowell2009,LyonsRuth2013,Carlson2009]]`,
  pt:`“Invalidating” means the child’s feelings are dismissed, punished or treated as wrong, often by people who are stressed themselves and doing their best.`,
  hook:`The invalidating environment = intolerance of the child’s expression of private emotion. [[Crowell2009]]`},
 {from:.24,at:.3,k:'Ages 6–9',t:'Escalation to be heard',
  txt:`Development is described as a chain of transactions: each side’s response becomes the other side’s next trigger. The cohorts fit this two-way picture. In the Pittsburgh Girls Study, child dysregulation and harsh parenting influenced each other from 5 to 14. In ALSPAC, children with dysregulated behaviour at 4–8 were more likely to meet maladaptive parenting (β = 0.075) and to be bullied (β = 0.327). [[Crowell2009,Hallquist2015,Winsper2017]]`,
  pt:`When calm signals are not answered, a child may learn to signal louder. Then the adults react to the louder signal, and both sides can get stuck.`,
  hook:`Transactional = child and environment shape each other over time, not a one-way arrow from parent to child. [[Crowell2009,Fruzzetti2005]]`},
 {from:.36,at:.42,k:'Ages 9–12',t:'Intermittent reinforcement',
  txt:`<span class="ev hyp">Hypothesis</span> The drawing shows one way such a loop can keep itself going (gold arrows): small signals are dismissed, and only the most intense ones get a response, which teaches that only intense signals work. This part is a schematic of the transactional idea, not a measured result. What has been measured is the two-way influence: Fruzzetti’s model describes invalidating and conflictual family exchanges, and the absence of validating ones, transacting with the child’s vulnerability. [[Fruzzetti2005,Hallquist2015]]`,
  pt:`If a reaction only gets noticed when it is very big, big reactions are what the child learns. Nobody plans this; it grows out of tired, stressed moments on both sides.`,
  hook:`Fruzzetti’s transactional model: invalidation and missing validation interact with the child’s vulnerability, and it blames neither child nor parent. [[Fruzzetti2005]]`},
 {from:.48,at:.6,k:'Ages 12–18',t:'Adolescence: onset',
  txt:`A coherent BPD syndrome usually begins in adolescence, after age 12, often preceded by or alongside internalising problems (depression, anxiety) or externalising problems (conduct problems, hyperactivity, substance use). In E-Risk, borderline-related characteristics were already measurable at 12. In the Pittsburgh cohort only worsening self-control between 12 and 14 predicted growth in BPD symptoms from 14 to 17, and rises in teenage symptoms predicted harsher parenting more than the reverse. [[Bohus2021,Belsky2012,Hallquist2015,Stepp2014]]`,
  pt:`The pattern usually becomes clear in the teenage years. Teenage symptoms can change how parents feel and act, too: influence runs both ways.`,
  hook:`BPD onset is typically in adolescence (after 12), often after internalising or externalising problems. [[Bohus2021]]`},
 {from:.72,at:.9,k:'Ages 18–25',t:'The adult pattern',
  txt:`In the model’s terms, emotional vulnerability and invalidation have transacted into pervasive emotion dysregulation. But traits are not fixed: in the Minnesota Twin Family Study the mean BPD-trait score fell from 41.3 at 14 to 35.19 at 24, and in Norwegian twins the mean criterion count fell 28% over 10 years. Most people with BPD gradually reach symptomatic remission, and treatment can speed this up; these are population-level statements. Switch to <b>Mostly validating</b> to compare the braid. [[Bornovalova2009,ReichbornKjennerud2015,Gunderson2018]]`,
  pt:`BPD traits usually ease with age, and recovery is common. Knowing how the loop works points care toward emotion skills for the person and support for the family.`,
  hook:`BPD traits: mean levels fall from the teens into adulthood while rank-order stability stays high (r = .53–.73). [[Bornovalova2009]]`}];

inits.causes=()=>{
  const svg=$('#caSvg'),rg=$('#caT');let env='inv';
  function draw(t){
    const N=vb(svg,'720 420','400 700'),A=t*CA_AGE,p=phaseOf(CA_STEPS,t),T=CA_TXT[env][p];
    const L=N?{x0:30,x1:370,cy:90,ch:150,ey:312,eh:80,ty:478,ob:[20,548,360,140],bw:178}
             :{x0:40,x1:560,cy:46,ch:150,ey:236,eh:64,ty:378,ob:[578,40,130,300],bw:160};
    const X=a=>lerp(L.x0,L.x1,a/CA_AGE),W=L.x1-L.x0;
    let s=`<defs>${marker('caA','var(--mood)')}${marker('caD','var(--storm)')}${marker('caV','var(--calm)')}${marker('caG','var(--gold)')}${marker('caN','var(--muted)')}</defs>`;
    /* adolescence band */
    if(A>10){const op=ramp(A,10,12.5)*.55;s+=`<rect x="${f1(X(12))}" y="${L.cy-14}" width="${f1(X(18)-X(12))}" height="${f1(L.ey+L.eh-L.cy+22)}" rx="8" style="fill:var(--storm-soft);opacity:${f1(op)}"/>`;
      s+=`<text x="${f1((X(12)+X(18))/2)}" y="${L.cy+L.ch+(N?30:14)}" class="t-xs t-mid" style="fill:var(--storm);opacity:${f1(ramp(A,11,13))}">adolescence: onset</text>`}
    /* lane labels */
    s+=`<text x="${L.x0}" y="${L.cy+L.ch+14}" class="t-sm" style="fill:var(--mood);font-weight:600">CHILD · reactions</text>`;
    s+=`<text x="${L.x0}" y="${L.ey-12}" class="t-sm" style="fill:${env==='inv'?'var(--storm)':'var(--calm)'};font-weight:600">ENVIRONMENT · responses</text>`;
    s+=`<rect x="${L.x0}" y="${L.ey}" width="${W}" height="${L.eh}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    /* child wave */
    const f=u=>caLevel(env,u*CA_AGE);
    const wv=wave(L.x0,L.cy,W,L.ch,f,{upto:t,fill:true,dot:true,base:true,col:'var(--mood)'});
    s+=wv.svg;
    /* braid: exchanges up to now */
    const my=L.ey+L.eh/2;
    CA_EV.forEach((e,i)=>{if(e>A)return;const r=caResp(env,i,e),age=A-e,op=f1(clamp(1-age/9,.18,1));
      const pk=wv.at(Math.min(t,(e+.12)/CA_AGE)),xr=X(e+.32);
      const col=r==='d'?'var(--storm)':r==='v'?'var(--calm)':r==='a'?'var(--gold)':'var(--muted)',mk=r==='d'?'caD':r==='v'?'caV':r==='a'?'caG':'caN';
      /* child signal down to the environment */
      s+=`<path d="M${f1(pk[0])} ${f1(pk[1]+6)}C${f1(pk[0]+4)} ${f1((pk[1]+my)/2)} ${f1(xr-8)} ${f1((pk[1]+my)/2)} ${f1(xr-3)} ${f1(my-12)}" style="fill:none;stroke:var(--mood);stroke-width:1.3;opacity:${op}" marker-end="url(#caA)"/>`;
      /* the response marker and its arrow back up */
      if(A>=e+.3){const xb=X(e+.62),yb=wv.at(Math.min(t,(e+.6)/CA_AGE))[1];
        s+=`<circle cx="${f1(xr)}" cy="${f1(my)}" r="${r==='a'?6.5:5}" style="fill:${col};opacity:${op}"/>`;
        s+=`<path d="M${f1(xr+3)} ${f1(my-8)}C${f1(xr+8)} ${f1((yb+my)/2)} ${f1(xb-2)} ${f1((yb+my)/2+6)} ${f1(xb)} ${f1(yb+10)}" style="fill:none;stroke:${col};stroke-width:${r==='a'?2.2:1.3};opacity:${op};stroke-dasharray:${r==='d'?'3 3':'none'}" marker-end="url(#${mk})"/>`}});
    /* bubbles for the current phase */
    const cur=wv.at(t),bw=L.bw,bx=clamp(cur[0]-bw*.7,L.x0-8,L.x1-bw+8);
    if(t>.004){
      const ex=CA_EV.filter(e=>e<=A).pop();
      const by=N?L.ey+L.eh+14:L.ey+L.eh+10;
      const ecol=env==='inv'?(p===0?'var(--muted)':'var(--storm)'):(p===0?'var(--muted)':'var(--calm)');
      if(ex!=null){const ebx=clamp(X(ex)-bw/2,L.x0-8,L.x1-bw+8);
        s+=bubble(ebx,N?by+4:by-2,bw,T.e.length*15+12,{lines:T.e,col:ecol,tx:X(ex+.32),ty:my+8});}
      const cyb=Math.max(4,L.cy-12-(T.c.length*15+12));
      if(!N||true){s+=bubble(bx,N?cyb+6:cyb+22,bw,T.c.length*15+12,{lines:T.c,col:'var(--mood)',think:true,tx:cur[0],ty:cur[1]-8})}
    }
    /* time axis */
    s+=tline(L.x0,L.ty,W,{min:0,max:25,step:5,fmt:v=>v,label:'age (years)'}).svg;
    s+=`<line x1="${f1(X(A))}" x2="${f1(X(A))}" y1="${L.cy-6}" y2="${L.ty}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3;opacity:.45"/>`;
    /* outcome box */
    const [ox,oy,ow,oh]=L.ob,show=ramp(t,.7,.82),inv=env==='inv';
    s+=`<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="12" style="fill:${inv?'var(--storm-soft)':'var(--calm-soft)'};stroke:${inv?'var(--storm)':'var(--calm)'};stroke-width:1.2;opacity:${f1(.25+show*.75)}"/>`;
    const head=inv?['One possible','path']:['Same','temperament'];
    const body=inv?['Pervasive emotion','dysregulation: the','pattern the model','links to BPD']:['More ways to','manage strong','feelings; lower','risk (schematic)'];
    const tx=ox+ow/2;
    if(show>0){s+=`<g style="opacity:${f1(show)}">`;
      if(N){s+=`<text x="${tx}" y="${oy+28}" class="t-big t-mid">${head.join(' ')}</text>`;body.forEach((b,i)=>s+=`<text x="${tx}" y="${oy+54+i*17}" class="t-sm t-mid" style="fill:var(--ink)">${b}</text>`);
        s+=`<text x="${tx}" y="${oy+oh-14}" class="t-xs t-mid">schematic; traits often ease later</text>`}
      else{head.forEach((h,i)=>s+=`<text x="${tx}" y="${oy+34+i*20}" class="t-big t-mid">${h}</text>`);body.forEach((b,i)=>s+=`<text x="${tx}" y="${oy+90+i*17}" class="t-sm t-mid" style="fill:var(--ink)">${b}</text>`);
        ['schematic, not','a prediction;','traits often','ease with age'].forEach((b,i)=>s+=`<text x="${tx}" y="${oy+190+i*14}" class="t-xs t-mid">${b}</text>`)}
      s+='</g>'}
    else{s+=`<text x="${tx}" y="${oy+(N?oh/2:oh/2)}" class="t-xs t-mid">${N?'outcome appears at 18+':'outcome'}</text>`;if(!N)s+=`<text x="${tx}" y="${oy+oh/2+14}" class="t-xs t-mid">at 18+</text>`}
    /* legend */
    const lgY=N?L.ty+50:L.ty+32,lg=env==='inv'?[['var(--storm)','dismissed'],['var(--gold)',N?'answered late':'answered after escalating'],['var(--calm)','validated']]:[['var(--calm)','validated'],['var(--mood)','child’s signal']];
    let lx=L.x0;lg.forEach(([c,n])=>{s+=`<circle cx="${f1(lx+5)}" cy="${lgY-3}" r="4.5" style="fill:${c}"/><text x="${f1(lx+14)}" y="${lgY}" class="t-xs">${n}</text>`;lx+=n.length*(N?7.2:5.9)+(N?26:30)});
    svg.innerHTML=s;
    setSt(p);
    const lv=caLevel(env,A);
    rg.setAttribute('aria-valuetext',`Age ${A.toFixed(1)}: ${CA_STEPS[p].t}`);
    $('#caRead').innerHTML=`<span>age <b>${A.toFixed(1)} y</b></span><span>environment <b>${env==='inv'?'mostly invalidating':'mostly validating'}</b></span><span>reaction now <b>${Math.round(lv*100)}</b> / 100 (schematic)</span>`;
    $('#caNote').innerHTML=noteHTML(CA_STEPS[p]);
  }
  const stop=playWire(rg,$('#caPlay'),draw,22000,'%t:player.replay%','causes');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  $$('[data-caenv]').forEach(b=>b.addEventListener('click',()=>{env=b.dataset.caenv;$$('[data-caenv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- forest plot ---------- */
  const R=[
   {g:'design',n:'Any adversity: BPD vs non-clinical controls',sn:'Adversity vs non-clinical',or:13.91,lo:11.11,hi:17.43,src:'Porter 2020 · 97 studies · case–control',k:'Porter2020',c:'[[Porter2020]]',
    d:'People with BPD were 13.91 times more likely to report childhood adversity than non-clinical controls in case–control studies. This is the biggest number, and also the design most open to recall and selection differences.'},
   {g:'design',n:'Any adversity: BPD vs other psychiatric groups',sn:'vs other psychiatric groups',or:3.15,lo:2.62,hi:3.79,src:'Porter 2020',k:'Porter2020',c:'[[Porter2020]]',
    d:'Compared with people with other psychiatric diagnoses, the odds ratio for reported adversity was 3.15: adversity is common in many conditions, not only BPD.'},
   {g:'design',n:'Any adversity: retrospective cohorts',sn:'Retrospective cohorts',or:2.59,lo:.93,hi:7.3,src:'Porter 2020',k:'Porter2020',c:'[[Porter2020]]',
    d:'In retrospective cohort studies the odds ratio was 2.59, and its interval (0.93–7.30) crosses 1.'},
   {g:'design',n:'Any adversity: epidemiological studies',sn:'Epidemiological studies',or:2.56,lo:1.24,hi:5.3,src:'Porter 2020',k:'Porter2020',c:'[[Porter2020]]',
    d:'In population (epidemiological) studies the odds ratio was 2.56. The drop from 13.91 to about 2.6 shows that most people exposed to adversity do not develop BPD.'},
   {g:'design',n:'Abuse or neglect, US population (adjusted)',sn:'NESARC, adjusted',lo:1.22,hi:1.63,range:true,src:'Afifi 2011 · NESARC n = 34,653 · cluster A/B PD',k:'Afifi2011',c:'[[Afifi2011]]',
    d:'In the nationally representative NESARC survey, childhood abuse and neglect stayed linked to cluster A and B personality disorders after adjusting for other adversities and disorders, but the adjusted odds ratios were modest: 1.22 to 1.63 (the bar shows that range, not a confidence interval).'},
   {g:'abuse',n:'Emotional abuse (case–control)',sn:'Emotional abuse',or:38.11,lo:25.99,hi:55.88,src:'Porter 2020',k:'Porter2020',c:'[[Porter2020]]',
    d:'Emotional abuse showed the largest effect of any subtype in the case–control data: OR 38.11.'},
   {g:'abuse',n:'Sexual abuse (youth, ≤19)',sn:'Sexual abuse, youth',or:4.88,lo:3.3,hi:7.21,src:'Winsper 2016 · 61 studies',k:'Winsper2016',c:'[[Winsper2016,Zanarini1997]]',
    d:'In a meta-analysis of 61 youth studies (age 19 or under), sexual abuse went with youth BPD at OR 4.88. In adults, sexual abuse is “neither necessary nor sufficient” for BPD.'},
   {g:'abuse',n:'Physical abuse (youth)',sn:'Physical abuse, youth',or:2.79,lo:2.03,hi:3.84,src:'Winsper 2016',k:'Winsper2016',c:'[[Winsper2016]]',d:'Physical abuse and youth BPD: OR 2.79.'},
   {g:'abuse',n:'Maternal hostility / verbal abuse (youth)',sn:'Maternal hostility, youth',or:3.28,lo:2.67,hi:4.03,src:'Winsper 2016',k:'Winsper2016',c:'[[Winsper2016]]',d:'Maternal hostility or verbal abuse and youth BPD: OR 3.28.'},
   {g:'neglect',n:'Neglect (case–control)',sn:'Neglect',or:17.73,lo:13.01,hi:24.17,src:'Porter 2020 · Zanarini 1997',k:'Porter2020',c:'[[Porter2020,Zanarini1997]]',
    d:'Neglect had the second-largest effect in case–control data (OR 17.73). In 358 inpatients with BPD, 92% reported neglect before 18, and caretaker neglect by both genders was a significant risk factor.'},
   {g:'neglect',n:'Neglect (youth)',sn:'Neglect, youth',or:3.4,lo:2.27,hi:5.11,src:'Winsper 2016',k:'Winsper2016',c:'[[Winsper2016]]',d:'Neglect and youth BPD: OR 3.40.'},
   {g:'bully',n:'Bullied: self-report',sn:'Bullied, self-report',or:2.82,lo:2.13,hi:3.72,src:'Wolke 2012 · ALSPAC 6,050 pairs · symptoms at ~11.8 y',k:'Wolke2012',c:'[[Wolke2012]]',
    d:'In ALSPAC, peer-bullying victims had higher odds of BPD symptoms at about 11.8 years after adjusting for confounders: 2.82 by self-report.'},
   {g:'bully',n:'Bullied: mother report',sn:'Bullied, mother report',or:2.43,lo:1.86,hi:3.16,src:'Wolke 2012',k:'Wolke2012',c:'[[Wolke2012]]',d:'By mother report: OR 2.43.'},
   {g:'bully',n:'Bullied: teacher report',sn:'Bullied, teacher report',or:1.95,lo:1.34,hi:2.83,src:'Wolke 2012',k:'Wolke2012',c:'[[Wolke2012]]',d:'By teacher report: OR 1.95. All three informants agree on the direction.'},
   {g:'bully',n:'Chronically bullied',sn:'Chronically bullied',or:5.44,lo:3.86,hi:7.66,src:'Wolke 2012',k:'Wolke2012',c:'[[Wolke2012]]',d:'Chronic bullying gave an OR of 5.44 for BPD symptoms at 11, a dose–response pattern.'},
   {g:'bully',n:'Relational + overt victimisation',sn:'Relational + overt',or:7.1,lo:4.79,hi:10.51,src:'Wolke 2012',k:'Wolke2012',c:'[[Wolke2012]]',d:'Combined relational and overt victimisation: OR 7.10.'},
   {g:'family',n:'Family adversity in pregnancy: 1–2',sn:'Family adversity 1–2',or:1.34,lo:1.01,hi:1.77,src:'Winsper 2012 · ALSPAC · symptoms at 11',k:'Winsper2012',c:'[[Winsper2012]]',
    d:'Family adversity measured in pregnancy predicted probable BPD symptoms at 11 in a dose–response way: 1–2 adversities OR 1.34.'},
   {g:'family',n:'Family adversity in pregnancy: more than 2',sn:'Family adversity >2',or:1.99,lo:1.34,hi:2.94,src:'Winsper 2012',k:'Winsper2012',c:'[[Winsper2012]]',d:'More than 2 adversities: OR 1.99.'},
   {g:'family',n:'Suboptimal parenting (per index point)',sn:'Suboptimal parenting / point',or:1.13,lo:1.05,hi:1.23,src:'Winsper 2012',k:'Winsper2012',c:'[[Winsper2012]]',d:'Each point on a suboptimal-parenting index raised the odds of probable BPD symptoms: OR 1.13 per point.'},
   {g:'family',n:'Parent conflict',sn:'Parent conflict',or:1.19,lo:1.06,hi:1.34,src:'Winsper 2012',k:'Winsper2012',c:'[[Winsper2012]]',d:'Conflict between parents: OR 1.19.'},
   {g:'family',n:'Parental psychiatric history',sn:'Parental psychiatric history',none:'modifies the harsh-treatment effect',src:'Belsky 2012 · E-Risk 1,116 twin pairs',k:'Belsky2012',c:'[[Belsky2012]]',
    d:'No pooled odds ratio. In E-Risk, harsh treatment through age 10 predicted borderline-related characteristics at 12, and the effect was stronger in children with a family history of psychiatric illness: a diathesis–stress pattern.'},
   {g:'attach',n:'Insecure attachment',sn:'Insecure attachment',none:'13 of 13 studies: strong link',src:'Agrawal 2004 · review',k:'Agrawal2004',c:'[[Agrawal2004]]',
    d:'No pooled odds ratio. All 13 studies in the review reported a strong association between BPD and insecure attachment (unresolved, preoccupied, fearful); the direction of effect is unclear.'},
   {g:'attach',n:'Maternal withdrawal at 18 months',sn:'Maternal withdrawal, 18 mo',none:'predicted symptoms at ~20 y',src:'Lyons-Ruth 2013 · 56 families',k:'LyonsRuth2013',c:'[[LyonsRuth2013]]',
    d:'No odds ratio. Observed maternal withdrawal at 18 months predicted borderline symptoms in late adolescence, independently of childhood abuse severity.'}];
  const fs=$('#caForest'),pk=$('#caPick');let grp='all',sel=3;
  pk.innerHTML=R.map((r,i)=>`<option value="${i}">${r.n}${r.or?` (OR ${r.or})`:''}</option>`).join('');pk.value=sel;
  const LX=v=>Math.log(v)/Math.log(60);
  function drawF(){
    const N=vb(fs,'720 100','400 100'),rows=R.map((r,i)=>[r,i]).filter(([r])=>grp==='all'||r.g===grp);
    const rh=N?40:24,top=40,H=top+rows.length*rh+44;
    fs.setAttribute('viewBox',`0 0 ${N?400:720} ${H}`);
    const px0=N?16:322,px1=N?318:572,X=v=>lerp(px0,px1,LX(clamp(v,1,60)));
    let s='';
    [1,2,5,10,20,50].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-8}" y2="${H-36}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--muted);stroke-dasharray:4 3':''}"/><text x="${f1(X(v))}" y="${H-20}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1((px0+px1)/2)}" y="${H-5}" class="t-xs t-mid">odds ratio (log scale)</text>`;
    s+=`<text x="${N?px0:10}" y="${top-18}" class="t-xs" style="font-weight:600">${N?'ESTIMATE':'RISK FACTOR / DESIGN'}</text><text x="${N?390:712}" y="${top-18}" class="t-xs t-end" style="font-weight:600">OR (95% CI)</text>`;
    const gc={design:'var(--dx)',abuse:'var(--storm)',neglect:'var(--amyg)',bully:'var(--gold)',family:'var(--mood)',attach:'var(--bond)'};
    rows.forEach(([r,i],k)=>{const y=top+k*rh+(N?24:12),on=i===sel,c=gc[r.g];
      s+=`<g class="ca-row" data-row="${i}" tabindex="0" role="button" aria-label="${r.n}">`;
      s+=`<rect x="2" y="${f1(y-(N?30:12))}" width="${N?396:716}" height="${rh-2}" rx="6" style="fill:${on?'var(--storm-soft)':'transparent'}"/>`;
      if(N)s+=`<text x="${px0}" y="${f1(y-12)}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''}">${r.sn}</text>`;
      else s+=`<text x="10" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-size:10.5px;${on?'font-weight:700':''}">${r.n}</text>`;
      if(r.none){s+=`<text x="${f1(X(1)+8)}" y="${f1(y+4)}" class="t-xs" style="fill:${c};font-style:italic">${r.none}</text><text x="${N?390:712}" y="${f1(y+4)}" class="t-xs t-end">no pooled OR</text>`}
      else{s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:${on?3:2};stroke-linecap:round${r.range?';stroke-dasharray:4 3':''}"/>`;
        if(!r.range){s+=`<rect x="${f1(X(r.or)-(on?6:4.5))}" y="${f1(y-(on?6:4.5))}" width="${on?12:9}" height="${on?12:9}" style="fill:${c}"/>`;
          s+=`<text x="${N?390:712}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink)">${r.or.toFixed(2)} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})</text>`}
        else s+=`<text x="${N?390:712}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink)">${r.lo.toFixed(2)} to ${r.hi.toFixed(2)}</text>`}
      s+='</g>'});
    fs.innerHTML=s;
    const r=R[sel];
    $('#caDetail').innerHTML=`<div class="kicker">${r.src}</div><h4>${r.n}</h4><p>${r.d} ${r.c}</p>`+(r.g==='design'&&r.or>10?`<div class="hook"><b>%t:note.hook%</b>Case–control OR 13.91 vs population OR ≈ 2.6: same exposure, very different numbers. Design shapes the estimate. [[Porter2020]]</div>`:'')+(r.g!=='design'?`<div class="pt"><b>%t:note.plain%</b>An odds ratio compares groups. It does not tell you what will happen to one child: most children with this experience do not develop BPD.</div>`:'');
  }
  $$('[data-cagrp]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.cagrp;$$('[data-cagrp]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(grp!=='all'&&R[sel].g!==grp){sel=R.findIndex(r=>r.g===grp);pk.value=sel}drawF()}));
  pk.addEventListener('change',()=>{sel=+pk.value;if(grp!=='all'&&R[sel].g!==grp){grp='all';$$('[data-cagrp]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.cagrp==='all'))}drawF()});
  fs.addEventListener('click',e=>{const g=e.target.closest('[data-row]');if(!g)return;sel=+g.dataset.row;pk.value=sel;drawF()});
  fs.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-row]');if(!g)return;e.preventDefault();sel=+g.dataset.row;pk.value=sel;drawF();const n=fs.querySelector(`[data-row="${sel}"]`);n&&n.focus()});
  drawF();

  /* ---------- 100 children ---------- */
  const IC=[{n:'any childhood adversity (epidemiological studies)',or:2.56},{n:'more than 2 family adversities in pregnancy',or:1.99},{n:'self-reported bullying',or:2.82},{n:'chronic bullying',or:5.44}];
  const is=$('#caIconSvg'),ip=$('#caIconPick'),P0=.017;
  function drawI(){const N=vb(is,'720 340','400 640'),c=IC[+ip.value],p1=c.or*P0/(1-P0+c.or*P0);
    const k0=Math.round(P0*100),k1=Math.round(p1*100);let s='';
    const grid=(gx,gy,k,title,pct,col)=>{let g=`<text x="${gx}" y="${gy-30}" class="t-lbl">${title}</text><text x="${gx}" y="${gy-14}" class="t-sm">≈ ${pct.toFixed(1)} in 100 · ${100-k} of 100 figures stay grey</text>`;
      for(let i=0;i<100;i++){const r=Math.floor(i/10),q=i%10,on=i>=100-k;g+=person(gx+q*27+8,gy+r*26,19,on?col:'var(--muted)',{op:on?1:.3})}return g};
    if(N){s+=grid(28,50,k0,'Without the exposure',P0*100,'var(--mood)');s+=grid(28,370,k1,'With '+(c.or<3?'it':'it'),p1*100,'var(--storm)')}
    else{s+=grid(50,60,k0,'100 children without the exposure',P0*100,'var(--mood)');s+=grid(400,60,k1,'100 children with '+c.n.split(' (')[0],p1*100,'var(--storm)')}
    is.innerHTML=s}
  ip.addEventListener('change',drawI);drawI();
  const prR=redraws.causes;redraws.causes=()=>{prR&&prR();drawF();drawI()};
  const ib=$('#caIconBtn');ib.addEventListener('click',()=>{const on=ib.getAttribute('aria-pressed')!=='true';ib.setAttribute('aria-pressed',on);$('#caIcons').classList.toggle('on',on);drawI()});
};
