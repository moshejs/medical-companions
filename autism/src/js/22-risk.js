/* =============== 2.2 Risk factors & myths =============== */
/* forest rows: label, short label (phones), estimate, CI, measure, phase in which it drops in, kind */
const RI_ROWS=[
 {l:'Father 50+ vs 20–29',e:1.66,lo:1.49,hi:1.85,m:'RR',ph:0},
 {l:'Mother 40–49 vs 20–29',e:1.15,lo:1.06,hi:1.24,m:'RR',ph:0},
 {l:'Extremely preterm (boys)',e:3.72,lo:3.27,hi:4.23,m:'PR',ph:1},
 {l:'All preterm (boys)',e:1.35,lo:1.30,hi:1.40,m:'PR',ph:1},
 {l:'Gestational diabetes ≤26 wk',e:1.42,lo:1.15,hi:1.74,m:'HR',ph:1},
 {l:'Valproate in pregnancy',e:2.9,lo:1.7,hi:4.9,m:'aHR',ph:2},
 {l:'Infection needing hospital',e:1.30,lo:1.14,hi:1.50,m:'OR',ph:3},
 {l:'Fever, 2nd trimester',e:1.40,lo:1.09,hi:1.79,m:'aOR',ph:3},
 {l:'Pregnancies <12 mo apart',e:1.90,lo:1.16,hi:3.09,m:'OR',ph:3},
 {l:'Folic acid around conception',e:.61,lo:.41,hi:.90,m:'aOR',ph:4,k:'good'},
 {l:'MMR vaccine (comparison)',e:.93,lo:.85,hi:1.02,m:'HR',ph:4,k:'null'}
];
const RI_STEPS=[
 {from:0,at:.1,k:'Step 1 · reading the plot',t:'Older parents',
  txt:`Each dot is a study's estimate and each line its 95% confidence interval. The vertical line at 1 means "no difference"; to the right, a higher chance; to the left, lower. In a five-country cohort of 5,766,794 children, fathers aged 50 or older (against 20–29) had RR 1.66 (1.49–1.85) and mothers aged 40–49 RR 1.15 (1.06–1.24), after mutual adjustment; mothers under 20 also had a slightly higher risk (RR 1.18). Parental age effects reflect several genetic mechanisms, including de novo mutations in the father's germline and inherited risk. In Sweden the paternal-age association held within discordant sibling pairs, and a meta-analysis of 27 studies found risk rising by 18% (mothers) and 21% (fathers) per additional 10 years. [[Sandin2016,Antaki2022,Hultman2011,Wu2017ParentalAge]]`,
  pt:`Children of older parents are a little more often autistic. Most children of older parents are not autistic.`,
  hook:`Paternal age ≥50 vs 20–29: RR 1.66. Advanced parental age is one of two "established" non-genetic risk factors, with preterm birth. [[Sandin2016,Lyall2017]]`},
 {from:.17,at:.27,k:'Step 2 · pregnancy and birth',t:'Preterm birth and diabetes',
  txt:`In 4,061,795 Swedish singletons, autism prevalence rose as gestation shortened: 1.4% at term (39–41 weeks), 1.9% late preterm, 2.6% at 28–33 weeks and 6.1% when extremely preterm (22–27 weeks). Adjusted prevalence ratios for extremely preterm birth were 3.72 in boys and 4.19 in girls, "only slightly attenuated" in co-sibling analyses. <span class="ev early">Early evidence</span> for a causal link. Gestational diabetes diagnosed by 26 weeks was associated with autism (HR 1.42; 1.15–1.74); pre-existing type 2 diabetes was not after full adjustment (HR 1.21; 0.97–1.52), and antidiabetic medicines were not independently associated. A meta-analysis of 16 studies gave a pooled RR of 1.48 for maternal diabetes, with high heterogeneity and publication bias. [[Crump2021Preterm,Xiang2015,Wan2018Diabetes]]`,
  pt:`Babies born very early are more often autistic later. This is a pattern in large groups, not a sign that anyone did something wrong.`,
  hook:`Extremely preterm (22–27 wk): 6.1% autism vs 1.4% at term. Preterm cohorts overall: 7%. [[Crump2021Preterm,Agrawal2018Preterm]]`},
 {from:.33,at:.42,k:'Step 3 · a medicine',t:'Valproate in pregnancy',
  txt:`Valproate is the clearest medicine signal. In 655,615 Danish children, prenatal exposure gave an adjusted HR of 2.9 (1.7–4.9) for autism and 5.2 (2.7–10.0) for childhood autism. Among children of mothers with epilepsy the HR was 1.7 (0.9–3.2) for autism and 2.9 (1.4–6.0) for childhood autism. The US label's boxed warning names neurodevelopmental disorders after in utero exposure. Quoted as published, not as advice: nobody should stop valproate without their prescriber. [[Christensen2013,FDA-Depakote]]`,
  pt:`One epilepsy medicine, valproate, can affect a baby's brain development. Doctors discuss this before pregnancy; it is not something to change alone.`,
  hook:`Valproate: 14-year absolute risk 4.42% vs 1.53% in all children (aHR 2.9). [[Christensen2013]]`},
 {from:.5,at:.6,k:'Step 4 · infection and spacing',t:'Infection, fever and short spacing',
  txt:`Across 15 studies, maternal infection in pregnancy was associated with autism (OR 1.13; 1.03–1.23), more so for infections needing hospital care (OR 1.30; 1.14–1.50). In all Danish births 1980–2005, any infection was not significantly associated (HR 1.14; 0.96–1.34). In Norway, fever in the second trimester gave aOR 1.40 (1.09–1.79), and three or more fevers after 12 weeks 3.12 (1.28–7.63). <span class="ev hyp">Hypothesis</span> Maternal immune activation is a proposed mechanism. Pregnancies less than 12 months apart, against 36 months or more, gave OR 1.90 (1.16–3.09); long intervals were also associated, and the mechanism is unknown. [[Jiang2016Infection,Atladottir2010,Hornig2018,CondeAgudelo2016,CheslackPostava2014]]`,
  pt:`Being very unwell with fever or infection in pregnancy is linked with a slightly higher chance. Nobody chooses to get an infection.`,
  hook:`Short interpregnancy interval is only a "potential" risk factor; both short and long intervals are associated. [[Lyall2017,CheslackPostava2014]]`},
 {from:.67,at:.78,k:'Step 5 · left of the line, and on it',t:'Folic acid, and a null result',
  txt:`In the Norwegian MoBa cohort (85,176 children), autistic disorder occurred in 0.10% of children whose mothers took folic acid from 4 weeks before to 8 weeks after the start of pregnancy, against 0.21% without (aOR 0.61; 0.41–0.90). An Israeli cohort found similar associations before (RR 0.56) and during pregnancy (RR 0.32). These are observational and "cannot establish causality"; folic acid is recommended anyway to prevent neural tube defects. <span class="ev early">Early evidence</span> For comparison, the MMR vaccine sits on the line: HR 0.93 (0.85–1.02). [[Suren2013,Levine2018,Hviid2019]]`,
  pt:`Folic acid taken around conception is linked with a lower chance of autism in some big studies. The MMR vaccine shows no link at all.`,
  hook:`A confidence interval that crosses 1 (MMR: 0.85–1.02) means no detectable association. [[Hviid2019]]`},
 {from:.84,at:1,k:'Step 6 · absolute risk',t:'Out of 100 children',
  txt:`Relative risks sound large; absolute risks show the size. Of 100 children exposed to valproate, about 4.4 were autistic by 14 years, against about 1.5 of 100 children overall: about 95 of 100 exposed children were not autistic. Within mothers with epilepsy the comparison was 4.15 against 2.44 in 100. Of 100 children born extremely preterm, about 6 were autistic, against 1.4 born at term. [[Christensen2013,Crump2021Preterm]]`,
  pt:`Even with the strongest known factors, most children are not autistic. A risk factor changes the odds for a group a little; it does not decide what happens to one child.`,
  hook:`Always ask "out of how many?" A doubled risk of something rare is still uncommon. [[Christensen2013]]`}
];
const RI_ABS=[
 {t:'Valproate in pregnancy',a:['all children',1.53],b:['exposed',4.42],src:'14-year risk, Denmark'},
 {t:'Epilepsy in mother',a:['not exposed',2.44],b:['valproate',4.15],src:'14-year risk, Denmark'},
 {t:'Birth timing',a:['term 39–41 wk',1.4],b:['22–27 wk',6.1],src:'prevalence, Sweden'}
];
const RI_VAX=[
 {y:1998,s:'1998 · case series',d:`A 12-child case series in The Lancet suggested a link between MMR vaccination and developmental regression. [[Wakefield1998]]`,pt:`One small report of 12 children started the fear. It had no comparison group.`},
 {y:2002,s:'2002 · 537,303 children',d:`A Danish cohort of 537,303 children (82.0% MMR-vaccinated) found adjusted relative risks of 0.92 (0.68–1.24) for autistic disorder and 0.83 (0.65–1.07) for other ASD, with no link to age at or time since vaccination. [[Madsen2002]]`,pt:`Half a million children: vaccinated and unvaccinated children were diagnosed at the same rate.`},
 {y:2003,s:'2003 · thimerosal',d:`In 467,450 Danish children, thimerosal-containing and thimerosal-free versions of the same vaccine carried similar risk (RR 0.85; 0.60–1.20), with no dose-response (RR 0.98 per 25 µg ethylmercury). [[Hviid2003]]`,pt:`The mercury-based preservative made no difference.`},
 {y:2008,s:'2008 · rates kept rising',d:`After thimerosal was removed from nearly all US childhood vaccines (1999–2001), autism counts in California's developmental services system kept rising through 2007. This does not support thimerosal as a primary cause. [[Schechter2008]]`,pt:`Taking the preservative out did not lower autism numbers.`},
 {y:2010,s:'2010 · retraction',d:`In February 2010 The Lancet formally retracted the 1998 Wakefield paper. [[Lancet2010Retraction]]`,pt:`The journal withdrew the paper that started the scare.`},
 {y:2011,s:'2011 · fraud',d:`The BMJ published an investigation by Brian Deer and an editorial concluding that the Wakefield article was fraudulent. [[Deer2011,Godlee2011]]`,pt:`An investigation found the original study was fraudulent.`},
 {y:2013,s:'2013 · "too many too soon"',d:`Cumulative exposure to vaccine antigens by age 2 was not associated with autism (aOR 0.999 per 25-unit increase). [[DeStefano2013]]`,pt:`The number of vaccines in early childhood made no difference.`},
 {y:2014,s:'2014 · 1.26 million',d:`A meta-analysis of five cohort studies (1,256,407 children) found no link between vaccination and autism (OR 0.99; 0.92–1.06), nor for MMR (0.84; 0.70–1.01), thimerosal (1.00) or mercury (1.00). [[Taylor2014Vaccine]]`,pt:`More than a million children across studies: no link.`},
 {y:2015,s:'2015 · siblings',d:`Among US children with an autistic older sibling, MMR was not associated with higher risk: RR 0.76 (0.49–1.18) for one dose at age 2 and 0.56 (0.31–1.01) for two doses at age 5. [[Jain2015MMR]]`,pt:`Even in families where an older child is autistic, the vaccine did not raise the chance.`},
 {y:2019,s:'2019 · 657,461 children',d:`In a nationwide Danish cohort of 657,461 children (6,517 autism diagnoses), MMR-vaccinated children had a fully adjusted hazard ratio of 0.93 (0.85–1.02) against unvaccinated children, with no increase in subgroups such as children with an autistic sibling and no clustering after vaccination. [[Hviid2019]]`,pt:`The two groups below look the same because they are the same.`}
];
const RI_AP={
 apap:{n:'Paracetamol (acetaminophen)',pop:[1.05,1.02,1.08],sib:[.98,.93,1.04],abs:[1.33,1.53],absL:'crude 10-year risk',N:'2,480,797 Swedish children',
  popT:`Across 2,480,797 Swedish children, crude 10-year autism risk was 1.33% without and 1.53% with prenatal paracetamol exposure. The population model gave HR 1.05 (1.02–1.08), a risk difference of 0.09%. [[Ahlqvist2024]]`,
  sibT:`Comparing siblings in the same cohort, one exposed and one not, the association disappeared: HR 0.98 (0.93–1.04), with no dose-response. The authors attribute the population link to familial confounding. A Hong Kong sibling-matched cohort found aHR 1.00 (0.91–1.11), and paracetamol use <i>before</i> pregnancy also "associated" with autism (HR 1.12), a negative control that points to confounding. A 2025 BMJ umbrella review concluded the evidence "does not clearly link" maternal paracetamol with autism. A 2025 Navigation Guide review argued the evidence is consistent with an association; its senior author disclosed serving as a plaintiffs' expert witness. [[Ahlqvist2024,Luo2026Paracetamol,Sheikh2025,Prada2025]]`,
  hook:`Population HR 1.05 → sibling HR 0.98: familial confounding, not a drug effect. [[Ahlqvist2024]]`},
 ad:{n:'Antidepressants, first trimester',pop:[2.02,null,null],sib:[.83,.62,1.13],abs:[2.14,5.28],absL:'risk by age 15',N:'1,580,629 Swedish offspring',
  popT:`In 1,580,629 Swedish offspring, 5.28% of children exposed in the first trimester were autistic by age 15 against 2.14% unexposed (HR 2.02; its interval is not shown here). The umbrella review rated SSRI use convincing (OR 1.84) but found antidepressant use before pregnancy carried a similar risk (RR 1.48). [[Sujan2017,Kim2019Umbrella]]`,
  sibT:`In sibling comparisons the HR was 0.83 (0.62–1.13), pointing to familial confounding. In Stockholm the authors judged the association "might not solely be" confounding, and stressed that the absolute risk was small and the number of cases preventable by stopping antidepressants would be small. Decisions about treatment in pregnancy belong with the prescriber. [[Sujan2017,Rai2017Antidepressants]]`,
  hook:`A link that also appears with use before pregnancy, and fades in siblings, points to the mother's condition and family factors. [[Kim2019Umbrella,Sujan2017]]`}
};

inits.risk=()=>{
  const svg=$('#riSvg'),rg=$('#riT');let setSt=()=>{};
  const txt=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const LG=v=>Math.log(v),lmin=LG(.4),lmax=LG(5);
  function icons(x,y,v,cols,sp,ps,col,k){let s='';const vv=v*k;
    for(let i=0;i<100;i++){const c=i%cols,r=Math.floor(i/cols),f=clamp(vv-i,0,1);
      s+=person(x+c*sp+sp/2,y+r*sp*1.12,ps,f>0?col:'var(--muted)',{op:f>0?f1(.4+.6*f):.22})}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 660'),ph=phaseOf(RI_STEPS,t),m=ease(ramp(t,.84,.95));let s='';
    /* --- forest --- */
    if(m<1){const L=N?{x0:12,x1:300,top:40,rh:47,vx:396}:{x0:262,x1:600,top:46,rh:25.5,vx:714};
      const X=v=>lerp(L.x0,L.x1,(LG(v)-lmin)/(lmax-lmin)),bot=L.top+RI_ROWS.length*L.rh;
      let g=txt(N?12:12,N?22:24,'PRENATAL &amp; PERINATAL FACTORS · 95% CI','t-sm','fill:var(--neuro);font-weight:700;letter-spacing:.05em');
      g+=`<rect x="${f1(X(1))}" y="${L.top-8}" width="${f1(L.x1-X(1))}" height="${f1(bot-L.top+4)}" style="fill:var(--bad-soft);opacity:.22"/>`;
      g+=`<rect x="${f1(L.x0)}" y="${L.top-8}" width="${f1(X(1)-L.x0)}" height="${f1(bot-L.top+4)}" style="fill:var(--good-soft);opacity:.3"/>`;
      [.5,1,2,3,5].forEach(v=>{g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-8}" y2="${f1(bot)}" class="${v===1?'':'grid'}" style="${v===1?'stroke:var(--ink);stroke-width:1.6':''}"/>`+txt(X(v),bot+14,v,'t-xs t-mid')});
      g+=txt(X(1)-6,bot+28,'← lower','t-xs t-end','fill:var(--good)')+txt(X(1)+6,bot+28,'higher →','t-xs','fill:var(--bad)');
      RI_ROWS.forEach((r,i)=>{const st=RI_STEPS[r.ph].from,k=ease(ramp(t,st+.01+(i%3)*.025,st+.08+(i%3)*.025));
        const yc=L.top+i*L.rh+(N?22:6),y=lerp(yc-30,yc,k),col=r.k==='good'?'var(--good)':r.k==='null'?'var(--muted)':'var(--neuro)',cur=r.ph===ph;
        const ly=N?L.top+i*L.rh+6:yc+4;
        g+=txt(N?12:12,ly,r.l,N?'t-xs':'t-sm',`fill:var(--ink);opacity:${k>0?1:.35};${cur&&k>0?'font-weight:700':''}`);
        if(k<=0)return;
        g+=`<g style="opacity:${f1(k)}"><line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:2.2"/><line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${f1(y-4)}" y2="${f1(y+4)}" style="stroke:${col};stroke-width:1.6"/><line x1="${f1(X(r.hi))}" x2="${f1(X(r.hi))}" y1="${f1(y-4)}" y2="${f1(y+4)}" style="stroke:${col};stroke-width:1.6"/><rect x="${f1(X(r.e)-4.5)}" y="${f1(y-4.5)}" width="9" height="9" style="fill:${col}"/></g>`;
        g+=txt(L.vx,N?y+4:yc+4,`${r.m} ${r.e} (${r.lo}–${r.hi})`,'t-xs t-end',`fill:var(--ink);opacity:${f1(k)}`)});
      s+=`<g style="opacity:${f1(1-m)}">${g}</g>`}
    /* --- absolute icon arrays --- */
    if(m>0){let g=txt(12,N?22:24,'OUT OF 100 CHILDREN','t-sm','fill:var(--neuro);font-weight:700;letter-spacing:.05em');
      const fk=ramp(t,.9,1);
      RI_ABS.forEach((A,i)=>{if(N){const bx=12,by=40+i*196,sp=12.5,ps=11;
          g+=txt(bx,by+6,A.t,'t-sm','fill:var(--ink);font-weight:700')+txt(bx,by+20,A.src,'t-xs');
          [[A.a,'var(--gold)',0],[A.b,'var(--neuro)',1]].forEach(([[lab,v],c,j])=>{const ax=bx+j*(sp*10+40),ay=by+30;
            g+=icons(ax,ay,v,10,sp,ps,c,fk);g+=txt(ax,ay+sp*11.2+8,lab,'t-xs','fill:var(--ink)')+txt(ax,ay+sp*11.2+21,f1(v*fk)+' in 100','t-sm',`fill:${c};font-weight:700`)});return}
        const by=46+i*104,sp=12.6,ps=12.5;
        g+=txt(12,by+18,A.t,'t-sm','fill:var(--ink);font-weight:700')+txt(12,by+33,A.src,'t-xs');
        [[A.a,'var(--gold)',0],[A.b,'var(--neuro)',1]].forEach(([[lab,v],c,j])=>{const ax=186+j*266,ay=by;
          g+=icons(ax,ay,v,20,sp,ps,c,fk);g+=txt(ax,ay+5*sp*1.12+14,lab,'t-xs','fill:var(--ink)')+txt(ax+20*sp,ay+5*sp*1.12+14,f1(v*fk)+' in 100','t-sm t-end',`fill:${c};font-weight:700`)})});
      if(!N)g+=txt(12,372,'Shaded figures: autistic children per 100 in each group. Most children in every group are not autistic.','t-xs','fill:var(--ink)');
      else g+=txt(12,650,'Most children in every group are not autistic.','t-xs','fill:var(--ink)');
      s+=`<g style="opacity:${f1(m)}">${g}</g>`}
    svg.innerHTML=s;setSt(ph);
    $$('[data-rimode]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.rimode==='abs')===(t>=.84)));
    $('#riNote').innerHTML=noteHTML(RI_STEPS[ph])}
  const stop=playWire(rg,$('#riPlay'),draw,26000,'%t:player.replay%','risk');
  setSt=stepWire($('#riSteps'),RI_STEPS,rg,draw,stop);
  $$('[data-rimode]').forEach(b=>b.addEventListener('click',()=>{stop();rg.value=b.dataset.rimode==='abs'?1:.8;draw(+rg.value)}));
  draw(+rg.value);

  /* ---- vaccine timeline and icon arrays ---- */
  const vs=$('#riVax'),vr=$('#riVaxT');
  function drawV(t){const N=vb(vs,'720 330','400 560'),yr=lerp(1998,2019,t);let s='';
    const x0=N?24:40,x1=N?376:680,ty=N?40:44,X=y=>lerp(x0,x1,(y-1998)/21);
    s+=txt(12,18,'THE MMR SCARE AND THE EVIDENCE','t-sm','fill:var(--neuro);font-weight:700;letter-spacing:.05em');
    s+=`<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${x0}" x2="${f1(X(yr))}" y1="${ty}" y2="${ty}" style="stroke:var(--neuro);stroke-width:4;stroke-linecap:round"/>`;
    [1998,2003,2008,2013,2019].forEach(y=>s+=txt(X(y),ty+18,y,'t-xs t-mid'));
    let cur=0;RI_VAX.forEach((e,i)=>{if(yr>=e.y-.01)cur=i});
    RI_VAX.forEach((e,i)=>{const on=yr>=e.y-.01,bad=e.y===1998,flag=e.y===2010||e.y===2011;
      s+=`<circle cx="${f1(X(e.y))}" cy="${ty}" r="${i===cur?7:5}" style="fill:${on?(bad?'var(--bad)':flag?'var(--warn)':'var(--good)'):'var(--panel)'};stroke:var(--ink);stroke-width:1.2"/>`});
    const E=RI_VAX[cur],bx=N?12:Math.min(Math.max(12,X(E.y)-130),440);
    s+=`<rect x="${f1(bx)}" y="${ty+28}" width="${N?376:268}" height="26" rx="8" style="fill:var(--neuro-soft);stroke:var(--neuro)"/>`+txt(bx+(N?188:134),ty+45,E.s,'t-sm t-mid','fill:var(--ink);font-weight:700');
    /* icon arrays */
    const k=ramp(t,.86,1),ay=N?150:120,sp=N?15:15.5,ps=N?12:13.5;
    [['MMR-vaccinated',0],['Unvaccinated',1]].forEach(([lab,j])=>{const ax=N?12+j*196:70+j*250;
      s+=txt(ax,ay-8,lab,'t-sm','fill:var(--ink);font-weight:700');
      for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),fill=i===0&&k>.5;s+=person(ax+c*sp+sp/2,ay+r*sp,ps,fill?'var(--neuro)':'var(--line)',{op:k>0?1:.5})}
      s+=txt(ax,ay+sp*10+16,k>.5?'≈ 1 in 100 diagnosed':'—','t-xs','fill:var(--ink)')});
    if(N){s+=txt(12,ay+sp*10+48,`HR ${k>.5?'0.93 (0.85–1.02)':'…'} · Denmark, 657,461 children`,'t-sm','fill:var(--ink);font-weight:700')}
    else{s+=txt(560,ay+40,'Hazard ratio','t-xs')+txt(560,ay+62,k>.5?'0.93':'…','t-big','fill:var(--neuro)')+txt(560,ay+80,k>.5?'95% CI 0.85–1.02':'','t-xs','fill:var(--ink)')+txt(560,ay+96,'657,461 children','t-xs')+txt(560,ay+110,'Denmark, 2019','t-xs')}
    vs.innerHTML=s;
    $('#riVaxNote').innerHTML=noteHTML({k:'Year '+Math.floor(yr),t:E.s.replace(/^\d+ · /,''),txt:E.d,pt:E.pt,
      hook:`MMR does not cause autism: HR 0.93 (0.85–1.02) in 657,461 children. The 1998 paper was retracted (2010) and judged fraudulent (BMJ 2011). [[Hviid2019,Lancet2010Retraction,Godlee2011]]`})}
  playWire(vr,$('#riVaxPlay'),drawV,16000,'%t:player.replay%','risk');drawV(+vr.value);

  /* ---- association vs cause ---- */
  const as=$('#riApap'),sel=$('#riApEx');let mode='pop',mk=0,stopM=null;
  function drawA(){const N=vb(as,'720 300','400 560'),D=RI_AP[sel.value],k=ease(mk);let s='';
    /* DAG */
    const fx=N?200:180,fy=N?40:46,ex=N?80:60,ey=N?190:220,ox=N?320:300,oy=ey;
    const box=(x,y,w,l1,l2,st)=>`<rect x="${f1(x-w/2)}" y="${f1(y-20)}" width="${w}" height="40" rx="9" style="${st}"/>`+txt(x,y-3,l1,'t-sm t-mid','fill:var(--ink);font-weight:700')+txt(x,y+12,l2,'t-xs t-mid');
    const arr=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}" marker-end="url(#riArr)"/>`;
    s+=`<defs>${marker('riArr','var(--muted)')}</defs>`;
    s+=box(fx,fy,N?230:220,'Family factors','shared genes, mother\'s health',`fill:${k>.5?'var(--panel-2)':'var(--gold-soft)'};stroke:var(--gold);stroke-width:1.4;${k>.5?'stroke-dasharray:4 3':''}`);
    s+=arr(fx-40,fy+20,ex+20,ey-22,`stroke:var(--gold);stroke-width:2;opacity:${f1(1-.75*k)}`)+arr(fx+40,fy+20,ox-20,oy-22,`stroke:var(--gold);stroke-width:2;opacity:${f1(1-.75*k)}`);
    if(k>.05)s+=txt(fx,fy+40,'held constant within siblings','t-xs t-mid',`fill:var(--gold);opacity:${f1(k)}`);
    s+=box(ex,ey,N?130:118,'Exposure','in pregnancy','fill:var(--panel);stroke:var(--ink)')+box(ox,oy,N?130:118,'Autism','diagnosis','fill:var(--panel);stroke:var(--ink)');
    s+=`<line x1="${ex+60}" y1="${ey}" x2="${ox-62}" y2="${oy}" style="stroke:var(--neuro);stroke-width:2.2;stroke-dasharray:5 4;opacity:${f1(1-.8*k)}" marker-end="url(#riArr)"/>`;
    s+=txt((ex+ox)/2,ey-8,k<.5?'association?':'no association','t-xs t-mid',`fill:${k<.5?'var(--neuro)':'var(--good)'};font-weight:600`);
    /* mini forest */
    const L=N?{x0:40,x1:370,y:330}:{x0:440,x1:700,y:80},lo=Math.log(.5),hi=Math.log(2.5),X=v=>lerp(L.x0,L.x1,(Math.log(v)-lo)/(hi-lo));
    s+=txt(L.x0-(N?28:0),L.y-24,'HAZARD RATIO','t-xs','fill:var(--ink);font-weight:600;letter-spacing:.05em');
    [.5,1,2].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y-12}" y2="${L.y+78}" style="${v===1?'stroke:var(--ink);stroke-width:1.5':'stroke:var(--line);stroke-dasharray:2 3'}"/>`+txt(X(v),L.y+92,v,'t-xs t-mid'));
    const row=(lab,[e,l,h],y,on,col)=>{let g=txt(L.x0-(N?28:0),y-10,lab,'t-xs',`fill:var(--ink);${on?'font-weight:700':''}`);
      if(l!=null)g+=`<line x1="${f1(X(l))}" x2="${f1(X(h))}" y1="${y}" y2="${y}" style="stroke:${col};stroke-width:2.2"/>`;
      g+=`<rect x="${f1(X(e)-5)}" y="${y-5}" width="10" height="10" style="fill:${col}"/>`+txt(X(e)+9,y+16,e.toFixed(2)+(l!=null?` (${l.toFixed(2)}–${h.toFixed(2)})`:''),'t-xs','fill:var(--ink)');
      return `<g style="opacity:${on?1:.45}">${g}</g>`};
    s+=row('Whole population',D.pop,L.y+16,k<.5,'var(--neuro)')+row('Sibling comparison',D.sib,L.y+60,k>=.5,'var(--good)');
    /* absolute */
    const ay=N?470:200,ax=N?40:440,aw=N?320:240,am=6;
    s+=txt(ax-(N?28:0),ay,`Absolute: ${D.absL}`,'t-xs','fill:var(--ink);font-weight:600');
    [['not exposed',D.abs[0],'var(--muted)'],['exposed',D.abs[1],'var(--neuro)']].forEach(([l,v,c],i)=>{const y=ay+10+i*24;
      s+=`<rect x="${ax-(N?28:0)}" y="${y}" width="${aw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${ax-(N?28:0)}" y="${y}" width="${f1(aw*v/am)}" height="12" rx="3" style="fill:${c}"/>`+txt(ax-(N?28:0)+aw*v/am+6,y+10,`${v}% ${l}`,'t-xs','fill:var(--ink)')});
    as.innerHTML=s;
    $('#riApCap').innerHTML=`${D.n}: ${D.N}. Bars on a 0–6% scale. Schematic diagram of confounding; the numbers are as published. `+(sel.value==='apap'?'[[Ahlqvist2024]]':'[[Sujan2017]]');
    $('#riApNote').innerHTML=noteHTML({k:mode==='pop'?'Whole-population analysis':'Sibling comparison',t:mode==='pop'?'A small association':(sel.value==='apap'?'The association disappears':'The association fades'),
      txt:mode==='pop'?D.popT:D.sibT,
      pt:mode==='pop'?`Across a whole country, children exposed before birth were diagnosed a little more often. That does not yet show the medicine caused it.`:`When brothers and sisters are compared, one exposed and one not, the difference goes away. Something families share explained it.`,
      hook:D.hook})}
  function setMode(m){mode=m;$$('[data-riap]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.riap===m));
    if(stopM)stopM();const from=mk,to=m==='sib'?1:0;stopM=animate(650,p=>{mk=lerp(from,to,p);drawA()},()=>{mk=to;stopM=null;drawA()})}
  $$('[data-riap]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.riap)));
  sel.addEventListener('change',drawA);
  drawA();
  redraws.risk=(prev=>()=>{prev&&prev();drawA()})(redraws.risk);

  /* ---- flip cards ---- */
  $$('#riFlips .fc').forEach(c=>c.addEventListener('click',e=>{if(e.target.closest('a,sup'))return;const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));
};
