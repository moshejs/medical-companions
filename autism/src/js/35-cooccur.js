/* =============== 3.5 Co-occurring conditions =============== */
/* n per 100 from pooled prevalence; on = schematic typical onset age (years) */
const CO_C=[
 {id:'id',n:'Intellectual disability',s:'Intellectual dis.',p:40,v:'39.6%',on:2,c:'var(--neuro)'},
 {id:'sleep',n:'Sleep-wake disorder',s:'Sleep-wake',p:13,v:'13%',on:2.5,c:'var(--accent)'},
 {id:'adhd',n:'ADHD',s:'ADHD',p:28,v:'28%',on:6,c:'var(--sense)'},
 {id:'disr',n:'Disruptive / conduct',s:'Disruptive',p:12,v:'12%',on:7,c:'var(--warn)'},
 {id:'anx',n:'Anxiety disorder',s:'Anxiety',p:20,v:'20%',on:9,c:'var(--inhibit)'},
 {id:'epi',n:'Epilepsy',s:'Epilepsy',p:12,v:'12.1%',on:11,c:'var(--bad)'},
 {id:'ocd',n:'OCD',s:'OCD',p:9,v:'9%',on:13,c:'var(--calm)'},
 {id:'dep',n:'Depressive disorder',s:'Depression',p:11,v:'11%',on:15,c:'var(--gold)'},
 {id:'bip',n:'Bipolar disorder',s:'Bipolar',p:5,v:'5%',on:21,c:'var(--excite)'},
 {id:'psy',n:'Schizophrenia spectrum',s:'Psychosis',p:4,v:'4%',on:22,c:'var(--muted)'}
];
const CO_STEPS=[
 {from:0,at:.075,k:'Age 0–5',t:'Early childhood',
  txt:`Some differences are present from the start. In ADDM 2022, 39.6% of autistic 8-year-olds with cognitive data had intellectual disability. [[Shaw2025]] Sleep problems are reported in 40–80% of autistic children, far more than the 13% with a diagnosed sleep-wake disorder, because a diagnosis is a stricter bar. [[Cortesi2010,Lai2019]] Feeding problems are about five times as likely as in peers (OR 5.11). [[Sharp2013Feeding]]`,
  pt:`Sleep and eating difficulties often show up early. They are common, and help exists.`,
  hook:`Diagnosed sleep-wake disorder 13% vs reported sleep problems 40–80%: the definitions differ. [[Lai2019,Cortesi2010]]`},
 {from:.125,at:.2,k:'Age 5–10',t:'Childhood: ADHD',
  txt:`ADHD is the commonest co-occurring condition in the pooled data (28%). [[Lai2019]] In a population-derived sample of autistic 10–14-year-olds, 70% had at least one psychiatric disorder and 41% had two or more; ADHD (28.2%) and oppositional defiant disorder (28.1%) were among the commonest, and 84% of those with ADHD had a further diagnosis. [[Simonoff2008]]`,
  pt:`Many autistic children also have ADHD. Spotting it matters, because it can be treated.`,
  hook:`70% of autistic 10–14-year-olds had ≥1 psychiatric disorder; 41% had ≥2. [[Simonoff2008]]`},
 {from:.25,at:.3,k:'Age 10–15',t:'Adolescence: anxiety, epilepsy',
  txt:`Anxiety disorders affect 39.6% of autistic young people under 18, most often specific phobia, OCD and social anxiety. [[vanSteensel2011]] Epilepsy prevalence averaged 12.5% at ages 2–17 and 26% from 13 upward, [[Viscidi2013]] and in a cohort followed to adulthood most seizures began after age 10. [[Bolton2011]] Autism also raises the risk of a later OCD diagnosis (IRR 2.18). [[Meier2015]]`,
  pt:`The teenage years bring new risks: anxiety, and for some, seizures that start for the first time.`,
  hook:`Epilepsy in autism: 21.5% with intellectual disability vs 8% without; onsets often after age 10. [[Amiet2008,Bolton2011]]`},
 {from:.375,at:.5,k:'Age 15–25',t:'Young adulthood: depression',
  txt:`Depression accumulates through adolescence: by age 27, 19.8% of autistic people in Stockholm had a depression diagnosis against 6.0% of the population (adjusted RR 3.64), and the risk was higher in autism without intellectual disability (RR 4.28). [[Rai2018Depression]] Compared with their own siblings, autistic people still had more than twice the odds. [[Rai2018Depression]] Catatonic deterioration usually emerges in adolescence or early adulthood. [[Wing2000,VaquerizoSerrano2021]]`,
  pt:`Low mood is common in autistic teenagers and young adults. It is not "just autism": it can be treated.`,
  hook:`Depression by 27: 19.8% autistic vs 6.0% general population. [[Rai2018Depression]]`},
 {from:.6,at:.95,k:'Age 25–40',t:'Adulthood',
  txt:`In autistic adults, pooled anxiety was 27% current and 42% lifetime, and depression 23% current and 37% lifetime. [[Hollocks2019]] Psychosis affected 9.4% and bipolar disorder 7.5%; males more often had psychosis and females bipolar disorder. [[Varcin2022]] Nearly every medical and psychiatric condition was more common in 1,507 autistic adults than in matched controls. [[Croen2015Adults]]`,
  pt:`By adulthood, many autistic people have more than one other condition. Each one deserves its own care.`,
  hook:`Lai 2019 order: ADHD 28 > anxiety 20 > sleep 13 > disruptive 12 > depression 11 > OCD 9 > bipolar 5 > schizophrenia spectrum 4 (%). [[Lai2019]]`}
];
/* deterministic, clustered assignment: people who already have a condition are more likely to get another */
const CO_ASSIGN=(()=>{const r=rng(11),cnt=new Array(100).fill(0),A={};
  CO_C.forEach(c=>{const w=cnt.map(k=>r()+.1*k);const idx=[...Array(100).keys()].sort((a,b)=>w[b]-w[a]).slice(0,c.p);
    const order=idx.map(i=>[i,r()]).sort((a,b)=>a[1]-b[1]);A[c.id]=new Map(order.map(([i],k)=>[i,k/c.p]));idx.forEach(i=>cnt[i]++)});
  return A})();

inits.cooccur=()=>{
  const svg=$('#coSvg'),rg=$('#coT');
  const on={};CO_C.forEach(c=>on[c.id]=true);
  $('#coTg').innerHTML='<span class="kicker">Conditions</span>'+CO_C.map(c=>`<button class="btn" data-cotg="${c.id}" aria-pressed="true"><i style="background:${c.c}"></i>${c.s}</button>`).join('');
  const vis=(c,age)=>on[c.id]?ramp(age,c.on,c.on+5):0;
  function draw(t){
    const N=vb(svg,'720 400','400 708'),age=t*40;
    const L=N?{gx:24,gy:16,dx:36,dy:34,ps:20,bx:132,bw:186,by:372,bh:22,ax:[30,370],ay:684,lx:14}
             :{gx:26,gy:14,dx:35,dy:32,ps:18,bx:520,bw:150,by:30,bh:26,ax:[40,690],ay:368,lx:388};
    let s='';
    const has=new Array(100).fill(0);
    for(let i=0;i<100;i++){const cx=i%10,cy=Math.floor(i/10),x=L.gx+cx*L.dx+L.dx/2,y=L.gy+cy*L.dy;
      const pips=[];CO_C.forEach(c=>{const m=CO_ASSIGN[c.id];if(m.has(i)){const v=vis(c,age);if(v>m.get(i))pips.push(c)}});
      has[i]=pips.length;
      s+=person(x,y,L.ps,pips.length?'var(--ink)':'var(--muted)',{op:pips.length?.9:.45});
      pips.forEach((c,k)=>{const px=x-12+(k%5)*6,py=y+L.ps+4+Math.floor(k/5)*6;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.7" style="fill:${c.c}"/>`})}
    const one=has.filter(v=>v>=1).length,two=has.filter(v=>v>=2).length,three=has.filter(v=>v>=3).length;
    /* bars */
    CO_C.forEach((c,k)=>{const y=L.by+k*L.bh,v=vis(c,age),w=L.bw*c.p/40;
      s+=`<text x="${L.bx-8}" y="${y+12}" class="t-xs t-end" style="fill:${on[c.id]?'var(--ink)':'var(--muted)'};${on[c.id]?'':'opacity:.5'}">${c.s}</text>`;
      s+=`<rect x="${L.bx}" y="${y+2}" width="${f1(w)}" height="${L.bh-9}" rx="3" style="fill:none;stroke:${c.c};stroke-dasharray:2 2;opacity:.6"/>`;
      s+=`<rect x="${L.bx}" y="${y+2}" width="${f1(w*v)}" height="${L.bh-9}" rx="3" style="fill:${c.c}"/>`;
      s+=`<text x="${f1(L.bx+w+5)}" y="${y+12}" class="t-xs" style="fill:${v>.99?'var(--ink)':'var(--muted)'}">${c.v}</text>`});
    const cy0=L.by+10*L.bh+(N?10:14);
    s+=`<text x="${L.lx}" y="${cy0}" class="t-sm" style="fill:var(--accent)">IN THIS ILLUSTRATION, BY AGE ${Math.round(age)}</text>`;
    s+=`<text x="${L.lx}" y="${cy0+20}" class="t-lbl">${one} of 100 have at least one condition</text><text x="${L.lx}" y="${cy0+37}" class="t-lbl">${two} have two or more · ${three} three or more</text>`;
    /* lifespan axis */
    const X=v=>lerp(L.ax[0],L.ax[1],v/40);
    s+=`<line x1="${L.ax[0]}" x2="${L.ax[1]}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--muted);stroke-width:1.4"/>`;
    for(let v=0;v<=40;v+=5)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.ay-4}" y2="${L.ay+4}" style="stroke:var(--muted)"/><text x="${f1(X(v))}" y="${L.ay+16}" class="t-xs t-mid">${v}${v===40?' y':''}</text>`;
    CO_C.forEach(c=>{if(on[c.id])s+=`<circle cx="${f1(X(c.on))}" cy="${L.ay}" r="3.5" style="fill:${c.c}"/>`});
    s+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="${L.ay-12}" y2="${L.ay+6}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(clamp(X(age),L.ax[0]+20,L.ax[1]-20))}" y="${L.ay-16}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">age ${Math.round(age)}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CO_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`Age ${Math.round(age)}: ${one} of 100 with at least one condition, ${two} with two or more`);
    $('#coRead').innerHTML=`<span>age <b>${Math.round(age)}</b></span><span>≥1 condition <b>${one}/100</b></span><span>≥2 <b>${two}/100</b></span><span>shown <b>${CO_C.filter(c=>on[c.id]).length} of 10</b></span>`;
    $('#coNote').innerHTML=noteHTML(CO_STEPS[p]);
  }
  const stop=playWire(rg,$('#coPlay'),draw,20000,'Replay','cooccur');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  $$('[data-cotg]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.cotg;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}));
  const setAll=v=>{CO_C.forEach(c=>on[c.id]=v);$$('[data-cotg]').forEach(b=>b.setAttribute('aria-pressed',v));draw(+rg.value)};
  $('#coAll').addEventListener('click',()=>setAll(true));$('#coNone').addEventListener('click',()=>setAll(false));
  draw(+rg.value);

  /* ---- AuDHD ---- */
  const au=$('#coAuSvg');let view='overlap',stopA=null,prog=1;
  const AU_NOTE={
   overlap:{k:'AuDHD · how often',t:'Two conditions, often together',
    txt:`Pooled across 96 studies, 28% of autistic people have ADHD, the commonest co-occurring condition. [[Lai2019]] In 1,899,654 people born in Sweden, autistic people had 22 times the odds of an ADHD diagnosis (OR 22.33), and the link was stronger in autism without intellectual disability. [[Ghirardi2018]]`,
    pt:`Having both autism and ADHD, sometimes called "AuDHD", is common. Each needs to be recognised.`,
    hook:`ADHD in autism: 28% pooled [[Lai2019]]; OR 22.33 in Swedish registers. [[Ghirardi2018]]`},
   family:{k:'AuDHD · families and genes',t:'It runs in families',
    txt:`Relatives of autistic people had a higher risk of ADHD, graded by genetic relatedness: identical twins OR 17.77, non-identical twins 4.33, full siblings 4.59 <span class="ev est">Established</span>. [[Ghirardi2018]] In 2.4 million Swedes, the genetic correlation between autism and other neurodevelopmental disorders was 0.73. [[Ghirardi2021]]`,
    pt:`The closer the family tie to an autistic person, the higher the chance of ADHD. Shared genes explain much of the overlap.`,
    hook:`Graded by relatedness: MZ 17.77 > DZ 4.33 ≈ full sibling 4.59. [[Ghirardi2018]]`},
   treat:{k:'AuDHD · treatment',t:'Treating ADHD in autistic children',
    txt:`In the RUPP crossover trial (72 children), 49% responded to methylphenidate; response was smaller and side effects more frequent than in non-autistic children with ADHD, and 18% stopped because of adverse effects. [[RUPP2005Methylphenidate]] Extended-release guanfacine: 50% responders vs 9.4% on placebo. [[Scahill2015]] Atomoxetine lowered ADHD ratings, [[Harfterkamp2012]] and parent training alone also beat placebo. [[Handen2015]] Medicines are covered in <a href="#meds" data-go="meds">Medication</a> and in the <a href="%SITE%/adhd/">ADHD Companion</a>.`,
    pt:`ADHD medicines can help autistic children, but they work a little less well and side effects are more common, so doctors start carefully and review often.`,
    hook:`Methylphenidate in autism: 49% responders, 18% stopped for adverse effects. [[RUPP2005Methylphenidate]]`}
  };
  function drawAu(){const N=vb(au,'720 320','400 470'),u=ease(prog);let s='';
    if(view==='overlap'){const cx=N?200:300,cy=N?150:150,R=N?100:110,d=lerp(N?150:220,N?70:110,u);
      s+=`<circle cx="${f1(cx-d/2)}" cy="${cy}" r="${R}" style="fill:var(--accent);fill-opacity:.16;stroke:var(--accent);stroke-width:2"/><circle cx="${f1(cx+d/2)}" cy="${cy}" r="${R*.72}" style="fill:var(--sense);fill-opacity:.18;stroke:var(--sense);stroke-width:2"/>`;
      s+=`<text x="${f1(cx-d/2-R*.45)}" y="${cy-R*.15}" class="t-lbl t-mid">Autism</text><text x="${f1(cx+d/2+R*.36)}" y="${cy-R*.15}" class="t-lbl t-mid">ADHD</text>`;
      s+=`<g style="opacity:${f1(ramp(u,.6,1))}"><text x="${f1(cx+d/4)}" y="${cy+4}" class="t-mid" style="font:800 22px var(--display);fill:var(--ink)">28%</text><text x="${f1(cx+d/4)}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink)">of autistic</text><text x="${f1(cx+d/4)}" y="${cy+32}" class="t-xs t-mid" style="fill:var(--ink)">people</text></g>`;
      const tx=N?20:520,ty=N?300:60;
      [['OR 22.33','odds of an ADHD diagnosis','if autistic (Sweden)'],['stronger','in autism without','intellectual disability'],['84%','of autistic children with ADHD','had a further diagnosis']].forEach((r,k)=>{const y=ty+k*(N?54:72);
        s+=`<g style="opacity:${f1(ramp(u,.3+k*.15,.6+k*.15))}"><text x="${tx}" y="${y}" style="font:800 20px var(--display);fill:var(--accent)">${r[0]}</text><text x="${tx}" y="${y+16}" class="t-xs">${r[1]}</text><text x="${tx}" y="${y+28}" class="t-xs">${r[2]}</text></g>`})}
    else if(view==='family'){const rows=[['Autistic person (vs not)',22.33],['Identical twin',17.77],['Non-identical twin',4.33],['Full sibling',4.59]];
      const x0=N?150:220,x1=N?380:640,y0=N?40:50,rh=N?60:56,X=v=>lerp(x0,x1,v/25);
      s+=`<text x="${N?14:24}" y="${N?22:30}" class="t-sm" style="fill:var(--accent)">ODDS OF ADHD (OR) · 1 = NO RAISED RISK</text>`;
      rows.forEach(([n,v],k)=>{const y=y0+k*rh,w=X(v*u)-x0;s+=`<text x="${x0-8}" y="${y+18}" class="t-xs t-end" style="fill:var(--ink)">${n}</text><rect x="${x0}" y="${y+4}" width="${f1(Math.max(0,w))}" height="22" rx="4" style="fill:${k?'var(--sense)':'var(--accent)'};opacity:${k?.75:1}"/><text x="${f1(x0+w+6)}" y="${y+20}" class="t-xs" style="fill:var(--ink);font-weight:600">${(v*u).toFixed(2)}</text>`});
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${y0}" y2="${y0+4*rh}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(X(1))}" y="${y0+4*rh+14}" class="t-xs t-mid">1</text>`;
      s+=`<text x="${N?14:24}" y="${y0+4*rh+(N?44:40)}" class="t-xs" style="fill:var(--ink)">Genetic correlation, autism with other neurodevelopmental disorders: rg 0.73</text>`}
    else{const rows=[['Methylphenidate: responders',49,null],['Methylphenidate: stopped for side effects',18,null],['Guanfacine XR: responders',50,9.4],['Atomoxetine: "much improved" (n.s.)',20.9,8.7]];
      const x0=N?14:250,x1=N?380:640,y0=N?40:44,rh=N?92:60,X=v=>lerp(x0,x1,v/100);
      s+=`<text x="${N?14:24}" y="${N?22:28}" class="t-sm" style="fill:var(--accent)">% OF AUTISTIC CHILDREN · DRUG vs PLACEBO</text>`;
      rows.forEach(([n,v,pl],k)=>{const y=y0+k*rh,ly=N?y+12:y+18,by=N?y+20:y+4;
        s+=`<text x="${N?x0:x0-8}" y="${ly}" class="t-xs ${N?'':'t-end'}" style="fill:var(--ink)">${n}</text>`;
        s+=`<rect x="${x0}" y="${by}" width="${f1(X(v*u)-x0)}" height="18" rx="4" style="fill:${k===1?'var(--warn)':'var(--sense)'}"/><text x="${f1(X(v*u)+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink);font-weight:600">${(v*u).toFixed(1)}%</text>`;
        if(pl!=null)s+=`<rect x="${x0}" y="${by+22}" width="${f1(X(pl*u)-x0)}" height="12" rx="3" style="fill:var(--muted);opacity:.6"/><text x="${f1(X(pl*u)+6)}" y="${by+32}" class="t-xs">placebo ${(pl*u).toFixed(1)}%</text>`});
      s+=`<text x="${N?14:24}" y="${y0+4*rh+(N?6:10)}" class="t-xs">Different trials and outcomes: not a head-to-head comparison.</text>`}
    au.innerHTML=s;
    $('#coAuNote').innerHTML=noteHTML(AU_NOTE[view]);
  }
  $$('[data-auv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.auv;$$('[data-auv]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopA)stopA();prog=0;stopA=animate(1400,p=>{prog=p;drawAu()},()=>{stopA=null})}));
  redraws.cooccur=(prev=>()=>{prev&&prev();drawAu()})(redraws.cooccur);
  onHide.cooccur=(prev=>()=>{prev&&prev();if(stopA)stopA()})(onHide.cooccur);
  drawAu();
};
