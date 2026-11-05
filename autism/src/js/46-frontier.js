/* =============== 4.6 Research toward better support =============== */
/* Lanes of rows. s/e: first and latest result (decimal years) in this guide's sources.
   m: milestones {y, l}. res: the outcome shown at e: neg, mixed, early, ongoing, pos, cleared. ev: est|early|hyp. */
const FR_Y0=2010,FR_Y1=2026.9;
const FR_RES={neg:['No benefit','var(--bad)'],mixed:['Mixed','var(--warn)'],early:['Early','var(--warn)'],ongoing:['Ongoing','var(--accent)'],pos:['Benefit','var(--good)'],cleared:['FDA cleared','var(--good)'],paused:['Postponed','var(--bad)'],created:['Category created','var(--good)'],rec:['Recommended','var(--rx)'],set:['Priorities set','var(--rx)']};
const FR_LANES={
 med:{name:'Medicines',rows:[
  {n:'Bumetanide',s:2017.2,e:2023.8,res:'neg',ev:'est',m:[{y:2017.2,l:'phase 2b: CARS better in completers'},{y:2021.5,l:'BAMBI: no benefit'},{y:2023.8,l:'phase 3 SIGN 1 & 2 stopped'}]},
  {n:'Oxytocin',s:2021.8,e:2023.1,res:'neg',ev:'est',m:[{y:2021.8,l:'SOARS-B, 290 children: no benefit'},{y:2023.1,l:'87 children: no overall effect'}]},
  {n:'Balovaptan',s:2022.2,e:2022.6,res:'neg',ev:'est',m:[{y:2022.2,l:'adults: stopped for futility'},{y:2022.6,l:'children: no benefit'}]},
  {n:'Arbaclofen',s:2017.4,e:2023.1,res:'early',ev:'early',m:[{y:2017.4,l:'missed primary outcome'},{y:2023.1,l:'EU trial done, no results posted'}]},
  {n:'Suramin',s:2017.5,e:2023.8,res:'neg',ev:'hyp',m:[{y:2017.5,l:'pilot, 10 boys'},{y:2023.8,l:'RCT, 52 boys: no benefit'}]},
  {n:'Sulforaphane',s:2021.4,e:2021.4,res:'mixed',ev:'early',m:[{y:2021.4,l:'primary missed; caregiver ABC better'}]},
  {n:'Cannabinoids',s:2021.1,e:2023.95,res:'mixed',ev:'early',m:[{y:2021.1,l:'one primary failed, CGI-I 49% vs 21%'},{y:2023.95,l:'CBD solution: no difference'}]},
  {n:'Microbiota transfer',s:2017.1,e:2026.8,res:'ongoing',ev:'early',m:[{y:2017.1,l:'open-label, 18 children'},{y:2019.3,l:'2-year follow-up'},{y:2026.8,l:'placebo-controlled trials: no results yet'}]},
  {n:'Leucovorin',s:2018.1,e:2026.2,res:'early',ev:'early',m:[{y:2018.1,l:'RCT, 48 children: d=0.70'},{y:2021.9,l:'meta-analysis'},{y:2025.7,l:'promotion; prescribing 24× up'},{y:2026.2,l:'label: FOLR1 deficiency, not autism'}]},
  {n:'ASOs, Angelman',s:2025.5,e:2026.5,res:'ongoing',ev:'hyp',m:[{y:2025.5,l:'phase 1: safety met'},{y:2026.5,l:'3 phase 3 trials'}]}]},
 dx:{name:'Diagnostics',rows:[
  {n:'EarliPoint',s:2019.4,e:2023.7,res:'cleared',ev:'est',m:[{y:2019.4,l:'pivotal study completes'},{y:2022.45,l:'FDA 510(k) clearance'},{y:2023.7,l:'JAMA: sens 71%, spec 81%'}]},
  {n:'Canvas Dx (Cognoa)',s:2021.4,e:2025.3,res:'cleared',ev:'est',m:[{y:2021.4,l:'De Novo: new device type'},{y:2022.35,l:'result in 31.8% of children'},{y:2025.3,l:'cleared again, 510(k)'}]},
  {n:'Device category QPF',s:2021.4,e:2026.8,res:'created',ev:'est',m:[{y:2021.4,l:'"Pediatric ASD Diagnosis Aid", class II'}]}]},
 sup:{name:'Services & supports',rows:[
  {n:'PACT parent coaching',s:2010.4,e:2016.9,res:'pos',ev:'est',m:[{y:2010.4,l:'13 months: symptoms not significant'},{y:2016.9,l:'6 years on: ES 0.55'}]},
  {n:'Community priorities',s:2014.5,e:2021.1,res:'set',ev:'est',m:[{y:2014.5,l:'UK: "clear disparity"'},{y:2015.5,l:'US survey: life skills'},{y:2020.5,l:'mental-health priorities'},{y:2021.1,l:'review of 7 studies'}]},
  {n:'Music therapy',s:2017.6,e:2017.6,res:'neg',ev:'est',m:[{y:2017.6,l:'364 children: no difference'}]},
  {n:'Adapted CBT, anxiety',s:2020.1,e:2020.1,res:'pos',ev:'est',m:[{y:2020.1,l:'response 92.4% vs 11.1%'}]},
  {n:'Project AIM review',s:2020.2,e:2020.2,res:'mixed',ev:'est',m:[{y:2020.2,l:'low-bias outcomes: no effects'}]},
  {n:'Spectrum 10K',s:2021.7,e:2023.1,res:'paused',ev:'est',m:[{y:2021.7,l:'postponed after backlash'},{y:2023.1,l:'interviews: trust, data'}]},
  {n:'Sensory integration',s:2022.4,e:2022.4,res:'neg',ev:'est',m:[{y:2022.4,l:'138 children: no effect'}]},
  {n:'Trial registration',s:2025.4,e:2025.4,res:'rec',ev:'est',m:[{y:2025.4,l:'INSAR: require registration'}]}]}
};
const FR_WIN=[[2010,2013.99,'2010–2013'],[2014,2017.99,'2014–2017'],[2018,2020.99,'2018–2020'],[2021,2023.99,'2021–2023'],[2024,2026.9,'2024–2026']];
const FR_STEPS=FR_WIN.map(([a,b,t])=>({from:(a-FR_Y0)/(FR_Y1-FR_Y0),at:Math.min(1,(b-FR_Y0)/(FR_Y1-FR_Y0)),t}));
const FR_NOTES={
 med:[
  {txt:`In this guide's sources, no medicine trial for autism itself reports before 2017. The approved medicines of the period treat irritability, not autism (see <a href="#meds" data-go="meds">Medication</a>). [[Pandina2026,FDA-Risperdal]]`,pt:`There is still no medicine for autism itself. Research has tried to find one; so far none has worked in large trials.`},
  {txt:`<span class="ev early">Early evidence</span> Small studies looked promising. A phase 2b bumetanide study (88 participants) reported better CARS scores in completers, with dose-dependent hypokalaemia. Arbaclofen missed its primary outcome in 150 participants. An open-label microbiota transfer study in 18 children reported about an 80% fall in GI symptoms, with no placebo arm. A suramin pilot treated 5 boys. [[Lemonnier2017,VeenstraVanderWeele2017,Kang2017,Naviaux2017]]`,hook:`Small, open-label or completer-only results often shrink or vanish in large placebo-controlled trials. [[Siafis2020]]`},
  {txt:`<span class="ev early">Early evidence</span> Folinic acid (leucovorin) improved verbal communication in a 12-week RCT of 48 children (d=0.70), more in children with folate receptor-α autoantibodies. At 2 years, most of the microbiota transfer GI gains persisted, and the authors called for a double-blind trial. [[Frye2018,Kang2019]]`,pt:`A few small studies gave hope. They need bigger, fairer tests.`},
  {txt:`<span class="ev est">Established: negative</span> The big trials reported. Oxytocin (SOARS-B, 290 children, 24 weeks): social withdrawal −3.7 vs −3.5 on placebo, P=0.61. Balovaptan: adults stopped for futility (Vineland +4.56 vs +6.83 on placebo); children no better (P=.91). Bumetanide: BAMBI no benefit, hypokalaemia 51% vs 0%; both phase 3 SIGN trials stopped for lack of efficacy. Cannabinoids and sulforaphane were mixed; suramin's RCT missed its primary outcome. [[Sikich2021,Jacob2022,Hollander2022,Sprengers2021,Fuentes2023,Aran2021,Zimmerman2021,Hough2023]]`,hook:`Oxytocin (SOARS-B), balovaptan (V1aduct, aV1ation) and bumetanide (SIGN 1 and 2) were all negative in large trials. [[Sikich2021,Jacob2022,Hollander2022,Fuentes2023]]`},
  {txt:`<span class="ev hyp">Hypothesis</span> for autism in general: in Angelman syndrome, the antisense oligonucleotide rugonersen met its phase 1 safety endpoint in 61 children, and three phase 3 trials are registered. <span class="ev early">Early evidence</span> Leucovorin's 2026 label is for FOLR1 cerebral folate transport deficiency, not autism, yet prescribing to autistic children rose more than 24-fold after promotion in 2025. Placebo-controlled microbiota trials are active with no results posted. [[Hipp2025,NCT07605429,FDA-Wellcovorin,Rothman2026,NCT04182633,NCT03408886]]`,pt:`Leucovorin is approved for a rare genetic folate disorder, not for autism. Research in autism is still early.`}],
 dx:[
  {txt:`Diagnosis relied on specialist assessment, with long waits for many families. No FDA device category for an autism diagnosis aid existed in this window in these sources. [[Crane2016Diagnosis,FDA-DEN200069]]`},
  {txt:`Researchers developed eye-tracking of social visual engagement and machine-learning tools that combine questionnaires and home videos. The EarliPoint pivotal study enrolled children aged 16–30 months. [[NCT03469986,Jones2023]]`,pt:`Scientists tried to build tools that help specialists recognise autism earlier.`},
  {txt:`The EarliPoint pivotal study (NCT03469986) completed in May 2019 and compared eye-tracking with expert diagnosis. [[NCT03469986]]`},
  {txt:`<span class="ev est">Established</span> The FDA created a new device type, "Pediatric Autism Spectrum Disorder Diagnosis Aid" (class II), with Cognoa's De Novo grant on 2 June 2021. EarliPoint was cleared on 8 June 2022. Canvas Dx combines a caregiver questionnaire, two home videos and a clinician questionnaire: in 425 children aged 18–72 months it gave a result in 31.8%, with sensitivity 98.4% and specificity 78.9% when it did. EarliPoint: sensitivity 71.0% and specificity 80.7% in 475 children; 78.0% and 85.4% where diagnosis was certain. [[FDA-DEN200069,FDA-K213882,Megerian2022,Jones2023]]`,hook:`Canvas Dx gives no result in about two thirds of children; EarliPoint sensitivity was 71% in all children tested. Both are aids to clinicians. [[Megerian2022,Jones2023]]`},
  {txt:`Canvas Dx was cleared again as a 510(k) on 11 April 2025. These devices may shorten waits, but they are cleared as aids to clinicians, not stand-alone tests, and are not for self-diagnosis. [[FDA-K243558,Megerian2022,Jones2023]]`,pt:`A computer tool can help a specialist, but it does not replace a full assessment.`}],
 sup:[
  {txt:`<span class="ev est">Established</span> PACT randomised 152 children aged 2–4 years to parent-mediated communication therapy or usual care. At 13 months, symptom scores were not significantly different (ES −0.24), but parent synchronous response improved strongly (ES 1.22). [[Green2010]]`,pt:`Coaching parents to follow their child's lead changed how parents and children talked together.`},
  {txt:`<span class="ev est">Established</span> Autistic people and families were asked what research should study: UK consultation found a "clear disparity" with funding. A US survey of 255 autistic adults and 143 guardian-reported adults named life skills, co-occurring conditions, jobs and education, public services, health-care access and, "above all", public acceptance. PACT follow-up at about 6 years found a lasting symptom effect (ES 0.55 over the whole period). The TIME-A music therapy trial (364 children) found no difference. [[Pellicano2014,Gotham2015,Pickles2016,Bieleninik2017]]`,hook:`PACT: the first RCT to show long-term symptom reduction (ES 0.55, 6 years). [[Pickles2016]]`},
  {txt:`<span class="ev est">Established</span> CBT adapted for autism beat standard CBT and usual care for anxiety in 167 children (response 92.4% vs 81.0% vs 11.1%). Project AIM: restricted to RCTs and outcomes with no risk of detection bias, no intervention type showed a significant effect. An autistic-co-led project set 5 mental-health research priorities. [[Wood2020,Sandbank2020,Benevides2020]]`,pt:`Therapy adapted for autistic children worked better for anxiety than the standard version.`},
  {txt:`Spectrum 10K, a UK genetic study planning 10,000 autistic participants, was postponed in 2021 after backlash; interviews later recorded concerns about trust and data reuse. A review of 7 priority-setting studies found consistent priorities for real-world impact and lifelong skills. A UK sensory integration trial (138 children) found no effect on irritability. [[Ellis2023,Roche2021,Randell2022]]`,hook:`Spectrum 10K (2021) was postponed after community objections: consent and trust matter in genetic research. [[Ellis2023]]`},
  {txt:`In 2025 an INSAR group of autistic people, clinicians and researchers recommended that autism journals require trial registration, published protocols and analysis plans. [[LaPoint2025]]`,pt:`Researchers and autistic people are agreeing on rules that make studies easier to trust.`}]
};
/* priorities (Gotham 2015 order) and the primary outcomes of the medicine trials above (this guide's count) */
const FR_PRI=[{n:'Life skills',k:'life'},{n:'Co-occurring conditions',k:'co'},{n:'Jobs & education',k:'job'},{n:'Public services',k:'svc'},{n:'Health-care access',k:'hc'},{n:'Public acceptance ("above all")',k:'acc'}];
const FR_OUT=[{n:'Autism-severity scales (CARS2, SRS-2)',c:4,t:'SIGN 1 & 2, BAMBI, oxytocin',to:[]},
 {n:'Behaviour-problem scales (HSQ, ABC)',c:3,t:'2 cannabinoid trials, suramin',to:['co']},
 {n:'Social withdrawal (ABC)',c:2,t:'SOARS-B oxytocin, arbaclofen',to:[]},
 {n:'Adaptive behaviour (Vineland)',c:1,t:'balovaptan in adults',to:['life']},
 {n:'Verbal communication',c:1,t:'leucovorin',to:['life']},
 {n:'Gastrointestinal symptoms',c:1,t:'microbiota transfer',to:['co']},
 {n:'Global clinical rating',c:1,t:'sulforaphane',to:[]},
 {n:'Safety',c:1,t:'Angelman ASO phase 1',to:[]}];

inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT');let lane=store.get('frLane','med');if(!FR_LANES[lane])lane='med';
  function draw(t){
    const R=FR_LANES[lane].rows,nr=R.length,N=vb(svg,'720 400',`400 ${110+nr*56}`),yr=lerp(FR_Y0,FR_Y1,t),p=phaseOf(FR_STEPS,t);
    const L=N?{x0:14,x1:386,top:52,rh:56}:{x0:160,x1:704,top:40,rh:Math.min(52,330/nr)};
    const X=y=>lerp(L.x0,L.x1,(y-FR_Y0)/(FR_Y1-FR_Y0)),bot=L.top+nr*L.rh;let s='';
    for(let y=2010;y<=2026;y+=2){const x=X(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.top-6}" y2="${f1(bot)}" class="grid"/><text x="${f1(x)}" y="${L.top-12}" class="t-xs t-mid">${N?"'"+String(y).slice(2):y}</text>`}
    FR_WIN.forEach(([a,b],i)=>{if(i===p)s+=`<rect x="${f1(X(a))}" y="${L.top-6}" width="${f1(X(Math.min(b+.01,FR_Y1))-X(a))}" height="${f1(bot-L.top+6)}" style="fill:var(--rx-soft);opacity:.5"/>`});
    R.forEach((r,i)=>{const y0=L.top+i*L.rh,on=yr>=r.s,done=yr>=r.e,RS=FR_RES[r.res];
      const by=N?y0+L.rh*.42:y0+L.rh*.22,bh=N?L.rh*.34:L.rh*.5,ty=N?y0+L.rh*.34:y0+L.rh*.56;
      const evc=r.ev==='est'?'var(--good)':r.ev==='early'?'var(--warn)':'var(--rx)';
      s+=`<text x="${N?L.x0:L.x0-10}" y="${f1(N?y0+L.rh*.3:ty)}" class="t-lbl ${N?'':'t-end'}" style="font-size:${N?13:12.5}px;opacity:${on?1:.45}">${r.n}</text>`;
      if(!N)s+=`<circle cx="${L.x0-4}" cy="${f1(ty-4)}" r="0" />`;
      if(on){const xe=X(Math.min(yr,Math.max(r.e,r.s+.35))),xs=X(r.s);
        s+=`<rect x="${f1(xs)}" y="${f1(by)}" width="${f1(Math.max(6,xe-xs))}" height="${f1(bh)}" rx="5" style="fill:${done?RS[1]:'var(--muted)'};opacity:${done?.85:.45}"/>`;
        s+=`<rect x="${f1(xs)}" y="${f1(by)}" width="4" height="${f1(bh)}" rx="2" style="fill:${evc}"/>`;
        let lastM=null;r.m.forEach(m=>{if(yr>=m.y){lastM=m;s+=`<circle cx="${f1(X(m.y))}" cy="${f1(by+bh/2)}" r="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`}});
        /* label: the result badge when finished, else the latest milestone */
        const lab=done?RS[0]+(lastM?' · '+lastM.l:''):(lastM?lastM.l:'');
        if(lab){let lx,anc='',room;
          if(N){lx=L.x0+(r.n.length*8.2)+8;room=L.x1-lx}
          else{const rr=L.x1-xe-8,rl=xs-8-L.x0;if(rr>=rl||rr>220){lx=xe+8;room=rr}else{lx=xs-8;room=rl;anc='t-end'}}
          const mx=Math.max(4,Math.floor(room/(N?7.9:6.1)));const txt=lab.length>mx?lab.slice(0,mx-1)+'…':lab;
          if(room>30)s+=`<text x="${f1(lx)}" y="${f1(N?y0+L.rh*.3:by+bh/2+4)}" class="t-xs ${anc}" style="fill:${done?RS[1]:'var(--ink)'};font-weight:${done?700:500}">${txt}</text>`}}
      s+=`<line x1="${N?L.x0:L.x0-150}" x2="${L.x1}" y1="${f1(y0+L.rh)}" y2="${f1(y0+L.rh)}" style="stroke:var(--line);stroke-width:.6"/>`});
    const cx=X(yr);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.top-6}" y2="${f1(bot+4)}" style="stroke:var(--ink);stroke-width:1.6"/><rect x="${f1(clamp(cx-24,L.x0,L.x1-48))}" y="${f1(bot+6)}" width="48" height="18" rx="9" style="fill:var(--ink)"/><text x="${f1(clamp(cx,L.x0+24,L.x1-24))}" y="${f1(bot+19)}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${Math.floor(yr)}</text>`;
    /* legend */
    const ly=bot+(N?44:40);let lx=N?L.x0:L.x0-150;
    [['est','Established','var(--good)'],['early','Early','var(--warn)'],['hyp','Hypothesis','var(--rx)']].forEach(([k,l,c])=>{s+=`<rect x="${lx}" y="${ly-9}" width="4" height="11" style="fill:${c}"/><text x="${lx+8}" y="${ly}" class="t-xs">${l}</text>`;lx+=N?124:96});
    if(!N)s+=`<text x="${L.x1}" y="${ly}" class="t-xs t-end">bar colour = result · dots = milestones · left edge = evidence label</text>`;
    svg.innerHTML=s;setSt(p);
    const nn=FR_NOTES[lane][p];$('#frNote').innerHTML=noteHTML({k:FR_LANES[lane].name+' · '+FR_WIN[p][2],t:['Before the big trials','Small studies, big hopes','First signals','The large trials report','Where things stand'][p],txt:nn.txt,pt:nn.pt,hook:nn.hook});
    rg.setAttribute('aria-valuetext',`${Math.floor(yr)}, ${FR_LANES[lane].name}`);
  }
  const stop=playWire(rg,$('#frPlay'),draw,24000,'%t:player.replay%','frontier');
  const setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  function setLane(l){lane=l;store.set('frLane',l);$$('[data-fr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fr===l));
    $('#frCap').innerHTML={med:'Medicines: [[Lemonnier2017,Sprengers2021,Fuentes2023]] [[Sikich2021,Guastella2023,Jacob2022]] [[Hollander2022,VeenstraVanderWeele2017,NCT03682978]] [[Naviaux2017,Hough2023,Zimmerman2021]] [[Aran2021,NCT04745026,Kang2017]] [[Kang2019,NCT04182633,Frye2018]] [[Rossignol2021,Rothman2026,FDA-Wellcovorin]] [[Hipp2025,NCT07605429]]',
      dx:'Diagnostics: [[NCT03469986,FDA-K213882,Jones2023]] [[FDA-DEN200069,Megerian2022,FDA-K243558]]',
      sup:'Services and supports: [[Green2010,Pickles2016,Pellicano2014]] [[Gotham2015,Benevides2020,Roche2021]] [[Bieleninik2017,Wood2020,Sandbank2020]] [[Ellis2023,Randell2022,LaPoint2025]]'}[l];
    draw(+rg.value)}
  $$('[data-fr]').forEach(b=>b.addEventListener('click',()=>{stop();setLane(b.dataset.fr)}));
  setLane(lane);

  /* priorities explorer */
  const ms=$('#frMatch');let pk=null,stopM=null;
  $('#frPri').innerHTML=FR_PRI.map(q=>`<button class="btn" data-fp="${q.k}" aria-pressed="false">${q.n}</button>`).join('');
  function drawM(k=1){const N=vb(ms,'720 360','400 640');let s='';
    const lw=N?{x:12,w:376,y0:40,h:38,ry0:330,rh:36}:{x:16,w:250,y0:44,h:44,rx:380,rw:324,ry0:44,rh:38};
    s+=`<text x="${lw.x}" y="${lw.y0-16}" class="t-sm">What the community prioritises</text>`;
    const pos={};FR_PRI.forEach((q,i)=>{const y=lw.y0+i*lw.h,on=pk===q.k,lit=pk?on:true;pos[q.k]=[lw.x+(N?lw.w:lw.w),y+lw.h*.4];
      s+=`<rect x="${lw.x}" y="${y}" width="${N?lw.w*.62:lw.w}" height="${lw.h-8}" rx="8" style="fill:${on?'var(--rx-soft)':'var(--field)'};stroke:${on?'var(--rx)':'var(--line)'};opacity:${lit?1:.55}"/>`;
      s+=`<text x="${lw.x+10}" y="${y+lw.h*.5}" class="t-lbl" style="font-size:${N?12.5:13}px">${i+1}. ${q.n}</text>`;
      pos[q.k]=[lw.x+(N?lw.w*.62:lw.w),y+(lw.h-8)/2]});
    const rx=N?12:lw.rx,rw=N?376:lw.rw,ry0=N?lw.ry0:lw.ry0,mxc=4;
    s+=`<text x="${rx}" y="${ry0-16}" class="t-sm">${N?'What the medicine trials measured':'What the medicine trials measured'}</text>`;
    FR_OUT.forEach((o,i)=>{const y=ry0+i*lw.rh,lit=pk?o.to.includes(pk):true,bw=(N?140:80)*o.c/mxc;
      const tx=N?rx+bw+38:rx+10;
      s+=`<rect x="${N?rx:rx}" y="${y}" width="${f1(N?bw+28:rw)}" height="${lw.rh-8}" rx="6" style="fill:${N?(lit?'var(--accent-soft)':'var(--field)'):(lit?'var(--accent-soft)':'var(--field)')};stroke:${pk&&lit?'var(--accent)':'var(--line)'};opacity:${lit?1:.5}"/>`;
      if(!N)s+=`<rect x="${rx+rw-bw-34}" y="${y+6}" width="${f1(bw)}" height="${lw.rh-20}" rx="3" style="fill:var(--accent);opacity:${lit?.8:.35}"/>`;
      s+=`<text x="${N?rx+8:rx+rw-8}" y="${y+(lw.rh-8)/2+4}" class="t-lbl ${N?'':'t-end'}" style="font-size:12px">${o.c}</text>`;
      s+=`<text x="${tx}" y="${y+(lw.rh-8)/2}" class="t-xs" style="fill:var(--ink);opacity:${lit?1:.6}">${o.n.replace(/ \(.*\)/,'')}</text>`;
      s+=`<text x="${tx}" y="${y+(lw.rh-8)/2+12}" class="t-xs" style="opacity:${lit?1:.6}">${o.t}</text>`;
      o.to.forEach(q=>{const a=pos[q],b=[rx,y+(lw.rh-8)/2],show=!N&&(!pk||pk===q);if(!show)return;
        const c1=N?[a[0]+30,a[1]]:[a[0]+60,a[1]],c2=N?[b[0]-0,b[1]-40]:[b[0]-60,b[1]];
        const d=`M${f1(a[0])} ${f1(a[1])}C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(b[0])} ${f1(b[1])}`;
        s+=`<path d="${d}" pathLength="1" style="fill:none;stroke:var(--rx);stroke-width:${pk?2.6:1.6};opacity:${f1(.2+.65*k)}"/>`})});
    ms.innerHTML=s;
    const P=FR_PRI.find(q=>q.k===pk),hits=pk?FR_OUT.filter(o=>o.to.includes(pk)):[];
    $('#frMatchCap').innerHTML=(pk?(hits.length?`<b>${P.n}</b>: ${hits.map(o=>o.n+' ('+o.t+')').join('; ')}. `:`<b>${P.n}</b>: none of the medicine trials in this module measured this as a primary outcome; it is studied in services research. `):'Lines join each community priority to the trial outcomes that address it. ')+
      'Left: priorities named by 255 autistic adults and 143 guardian-reported adults, in the order published. [[Gotham2015]] Right: this guide\'s count of the primary outcome in 14 medicine trials from the timeline, one per trial. Most measured autism-severity or social scales, which a 2026 review advises against using as efficacy endpoints. [[Pandina2026]]'}
  $('#frPri').addEventListener('click',e=>{const b=e.target.closest('[data-fp]');if(!b)return;pk=pk===b.dataset.fp?null:b.dataset.fp;
    $$('[data-fp]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.fp===pk));stopM&&stopM();stopM=animate(700,q=>drawM(ease(q)))});
  drawM(1);
  redraws.frontier=(f=>()=>{f&&f();drawM(1)})(redraws.frontier);
};
