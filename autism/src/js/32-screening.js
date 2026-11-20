/* =============== 3.2 Screening tools =============== */
/* teaching model: pooled M-CHAT(-R/F) accuracy (Wieckowski 2023), prevalence 2.2% (Guthrie 2019) or 20.2%
   in younger siblings (Ozonoff 2024); about 90% of non-autistic screen-positives had another developmental
   concern, derived from Robins 2014 ((94.6 - 47.5) / (100 - 47.5)). Band split is illustrative. */
const SC_POP={gen:{p:.022,n:'General population'},sib:{p:.202,n:'Younger siblings'}};
const SC_SE=.83,SC_SP=.94,SC_OTH=.897;
const SC_STEPS_BASE=[
 {from:0,at:.06,k:'Step 1 · who is screened',t:'1,000 toddlers at a check-up',
  txt:`The AAP recommends autism-specific screening at the 18- and 24-month visits, alongside developmental surveillance at every visit. [[Hyman2020]] The M-CHAT-R/F was validated in 16,071 toddlers screened at those visits in primary care. [[Robins2014]] In this group of 1,000, 22 will turn out to be autistic: 2.2%, the prevalence found when a universally screened primary-care cohort was followed to age 4–8. [[Guthrie2019]] No one knows yet which 22.`,
  pt:`A screen is a quick first look at many children. It does not decide anything about one child.`,
  hook:`AAP: autism-specific screening at 18 and 24 months; general developmental screening at 9, 18 and 30 months. [[Hyman2020,Lipkin2020]]`,
  sib:{txt:`Younger siblings of autistic children have a much higher chance of being autistic: in a 2024 consortium study of 1,605 infants at 18 sites, 20.2% were autistic by age 3 (18.7% in the 2011 study). [[Ozonoff2024,Ozonoff2011]] So in this group of 1,000, about 202 will turn out to be autistic.`,
   pt:`In families who already have an autistic child, the chance for a younger sibling is about 1 in 5.`,
   hook:`Sibling recurrence about 20% by 36 months (Baby Siblings Research Consortium). [[Ozonoff2024]]`}},
 {from:.2,at:.29,k:'Step 2 · the questionnaire',t:'Three score bands',
  txt:`A parent answers 20 yes/no questions, so scores run from 0 to 20. A score of 0–2 is low likelihood; 3–7 means a follow-up interview is recommended; 8 or more is screen-positive without the interview. [[Robins2014,Sturner2022]] The items are copyrighted and are not shown here. The original 23-item M-CHAT dates from 2001. [[Robins2001]]`,
  pt:`Most children land in the low band. A middle score is not a "fail": it means a few more questions.`,
  hook:`M-CHAT-R: 0–2 low · 3–7 follow-up interview · 8–20 refer directly. [[Robins2014,Sturner2022]]`},
 {from:.4,at:.49,k:'Step 3 · follow-up interview',t:'A second look at the middle band',
  txt:`For scores of 3–7, a clinician goes back over the answered items with the parent, asking for examples. Children still scoring 2 or more after the interview are screen-positive; the rest return to the screen-negative group. [[Robins2014]] At 18 months, one study found the interview cut sensitivity from 0.73 to 0.36 while raising specificity from 0.66 to 0.89. [[Sturner2022]] In real practice the interview is often skipped. [[Carbone2020]]`,
  pt:`The interview catches answers that were misunderstood, so fewer families get a false alarm.`,
  hook:`Two-stage screening trades sensitivity for specificity. [[Sturner2022]]`},
 {from:.6,at:.7,k:'Step 4 · diagnostic evaluation',t:'Who the screen-positive children are',
  txt:`Screen-positive children are referred for a full assessment. In this model, {POS} of 1,000 screen positive and {TP} of them are autistic: a PPV of {PPV}. In the M-CHAT-R/F validation study itself, 47.5% of children who stayed positive after the interview were autistic and 94.6% had some developmental delay or concern. [[Robins2014]] So most screen-positive children who are not autistic still need help.`,
  pt:`A positive screen means "this child should be seen by specialists", not "this child is autistic".`,
  hook:`M-CHAT-R/F after follow-up: PPV 47.5% for autism, 94.6% for any developmental concern. [[Robins2014]]`,
  sib:{txt:`In siblings, {POS} of 1,000 screen positive and {TP} are autistic: a PPV of {PPV}, far higher than in the general population with the same test, because autism is far more common in this group. The model assumes the same sensitivity and specificity; accuracy in sibling samples was not part of the pooled estimate used here. [[Wieckowski2023]]`,
   pt:`The same score means more in a group where autism is common. This is why the setting matters.`,
   hook:`PPV depends on prevalence: same test, higher PPV in a high-likelihood group.`}},
 {from:.8,at:.92,k:'Step 5 · what the screen missed',t:'Autistic children who screened negative',
  txt:`{FN} autistic children screened negative in this model. Real-world data are less kind than the pooled estimate: when every child in a primary-care network was followed to age 4–8, M-CHAT/F sensitivity was 38.8% and PPV 14.6%; in Utah, 33.1% and 17.8%. [[Guthrie2019,Carbone2020]] A negative screen does not rule autism out, and screening needs repeating after 18 months. [[Fuentes2021ESCAP,Sturner2022]]`,
  pt:`If you are still worried after a "normal" screen, say so. Development keeps unfolding, and checks can be repeated.`,
  hook:`Universal screening, full follow-up: sensitivity 38.8%, PPV 14.6% (CHOP 2019). A negative screen is not reassurance on its own. [[Guthrie2019]]`,
  sib:{txt:`{FN} autistic siblings screened negative in this model. Among younger siblings, 63% of children diagnosed at 36 months had not been diagnosed at 18 months and 41% not at 24 months, so families with an autistic child benefit from repeated developmental checks. [[Ozonoff2015]]`,
   pt:`For younger siblings, one check is not enough. Signs can appear later.`,
   hook:`Sibling studies: many children diagnosed at 36 months were not yet diagnosed at 18 (63%) or 24 months (41%). [[Ozonoff2015]]`}}
];

inits.screening=()=>{
  const svg=$('#scSvg'),rg=$('#scT');let pop='gen',setSt=()=>{},M=null;
  const steps=()=>SC_STEPS_BASE.map(s=>Object.assign({},s,s[pop]||{}));
  /* build the 1,000 children for a population: outcome, band and a stable shuffled order */
  function build(k){const p=SC_POP[k].p,N=1000,A=Math.round(N*p),TP=Math.round(A*SC_SE),FN=A-TP,FP=Math.round((N-A)*(1-SC_SP)),POS=TP+FP;
    const ppl=[];for(let i=0;i<N;i++)ppl.push({aut:i<A,pos:i<TP||(i>=A&&i<A+FP)});
    /* other concern among false positives */
    let fpk=0;ppl.forEach(q=>{if(q.pos&&!q.aut){q.oth=fpk<Math.round(FP*SC_OTH);fpk++}});
    /* illustrative bands: 30% of positives score 8+, the rest pass through the interview; 1.3x as many again
       score 3-7 and drop back after it (taking half the missed autistic children first) */
    const posL=ppl.filter(q=>q.pos),hiN=Math.round(.3*POS);posL.forEach((q,i)=>q.band=i<hiN?'high':'med');
    const dropN=Math.round(1.3*(POS-hiN));let d=0;
    ppl.filter(q=>q.aut&&!q.pos).slice(0,Math.ceil(FN/2)).forEach(q=>{q.band='med';q.drop=1;d++});
    const r=rng(k==='gen'?41:73);const negs=ppl.filter(q=>!q.pos&&!q.aut);
    for(let i=negs.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[negs[i],negs[j]]=[negs[j],negs[i]]}
    negs.forEach(q=>{if(d<dropN){q.band='med';q.drop=1;d++}});
    ppl.forEach(q=>{if(!q.band)q.band='low'});
    /* shuffled grid order */
    const ord=ppl.map((q,i)=>i);for(let i=N-1;i>0;i--){const j=Math.floor(r()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]]}
    ord.forEach((pi,gi)=>ppl[pi].g=gi);
    return {ppl,A,TP,FN,FP,POS,TN:N-A-FP,hiN,medN:POS-hiN+dropN,dropN}}
  const MODELS={gen:build('gen'),sib:build('sib')};
  /* stage layouts: positions for every child at stage 0..3 */
  function layout(Md,N){
    const G=N?{lx:22,ly:74,lc:40,mx:22,my:410,mc:19,hx:212,hy:410,hc:19,cw:9,ch:11}:{lx:22,ly:74,lc:40,mx:412,my:74,mc:12,hx:548,hy:74,hc:15,cw:9,ch:11};
    const at=(x0,y0,c,i)=>[x0+(i%c)*G.cw,y0+Math.floor(i/c)*G.ch];
    const P=Md.ppl,byG=[...P].sort((a,b)=>a.g-b.g);
    byG.forEach((q,i)=>q.s0=at(G.lx,G.ly,G.lc,i));
    let lo=0,me=0,hi=0;byG.forEach(q=>{q.s1=q.band==='low'?at(G.lx,G.ly,G.lc,lo++):q.band==='med'?at(G.mx,G.my,G.mc,me++):at(G.hx,G.hy,G.hc,hi++)});
    /* stage 2: dropped children join the end of the low grid; passers join the positive bin */
    let lo2=lo,po=hi;byG.forEach(q=>{if(q.band==='low')q.s2=q.s1;else if(q.drop)q.s2=at(G.lx,G.ly,G.lc,lo2++);else if(q.band==='high')q.s2=q.s1;else q.s2=at(G.hx,G.hy,G.hc,po++)});
    /* stage 3: positives sorted by outcome */
    const rank=q=>q.aut?0:q.oth?1:2;let k3=0;
    byG.filter(q=>q.pos).sort((a,b)=>rank(a)-rank(b)||a.g-b.g).forEach(q=>q.s3=at(G.hx,G.hy,G.hc,k3++));
    byG.forEach(q=>{if(!q.pos)q.s3=q.s2});
    return {G,lowRows:Math.ceil(lo2/G.lc)}}
  function draw(t){
    const N=vb(svg,'720 440','400 670');M=MODELS[pop];const L=layout(M,N),G=L.G;
    const e1=ease(ramp(t,.18,.34)),e2=ease(ramp(t,.4,.54)),e3=ramp(t,.6,.7),e4=ramp(t,.8,.88);
    let s=`<defs><symbol id="scP" viewBox="0 0 8 11"><circle cx="4" cy="2" r="1.9"/><path d="M1 11V6.6Q1 4.6 4 4.6Q7 4.6 7 6.6V11Z"/></symbol></defs>`;
    /* bins */
    const lowH=Math.max(L.lowRows,22)*G.ch;
    const bin=(x,y,w,h,title,sub,col,op)=>`<g style="opacity:${f1(op)}"><rect x="${x-8}" y="${y-8}" width="${w+16}" height="${h+14}" rx="10" style="fill:none;stroke:${col};stroke-width:1.2;stroke-dasharray:4 3"/><text x="${x-6}" y="${y-30}" class="t-sm" style="fill:${col}">${title}</text><text x="${x-6}" y="${y-16}" class="t-xs">${sub}</text></g>`;
    const medRows=Math.ceil(M.medN/G.mc),posRows=Math.ceil(M.POS/G.hc);
    s+=bin(G.lx,G.ly,G.lc*G.cw-1,(t<.18?Math.ceil(1000/G.lc):Math.max(L.lowRows,1))*G.ch,t<.18?'1,000 TODDLERS':t<.54?'SCORE 0–2 · SCREEN NEGATIVE':'SCREEN NEGATIVE',t<.18?'at the 18- or 24-month visit':t<.4?'low likelihood':t<.6?'low band + those cleared at interview':'no referral from this screen','var(--muted)',1);
    s+=bin(G.mx,G.my,G.mc*G.cw-1,Math.max(1,medRows)*G.ch,N?'SCORE 3–7':'SCORE 3–7',t<.54?'follow-up interview':'interview done','var(--warn)',e1*(1-e2));
    s+=bin(G.hx,G.hy,G.hc*G.cw-1,Math.max(1,t<.5?Math.ceil(M.hiN/G.hc):posRows)*G.ch,t<.5?'SCORE 8–20':'SCREEN POSITIVE',t<.5?'positive, no interview needed':t<.6?'after the interview':'→ diagnostic evaluation','var(--accent)',e1);
    /* people */
    const pos=q=>{let [x,y]=q.s0;if(e1>0){x=lerp(x,q.s1[0],e1);y=lerp(y,q.s1[1],e1)}if(e2>0){x=lerp(x,q.s2[0],e2);y=lerp(y,q.s2[1],e2)}if(e3>0){x=lerp(x,q.s3[0],ease(e3));y=lerp(y,q.s3[1],ease(e3))}return[x,y]};
    let missed=0;
    M.ppl.forEach(q=>{const [x,y]=pos(q);let col='var(--muted)',op=.55;
      if(e1>0&&q.band!=='low'&&!(q.drop&&e2>.5)){col=q.band==='high'?'var(--accent)':'var(--warn)';op=.55+.4*e1}
      if(e2>.5&&q.pos){col='var(--accent)';op=.95}
      if(e3>0&&q.pos){col=q.aut?'var(--accent)':q.oth?'var(--gold)':'var(--muted)';op=q.aut||q.oth?1:.6;if(!q.aut)op*=lerp(1,q.oth?1:.8,e3)}
      if(q.pos&&e3>0&&!q.aut)col=e3>.5?(q.oth?'var(--gold)':'var(--muted)'):'var(--accent)';
      if(e4>0&&q.aut&&!q.pos){col='var(--bad)';op=lerp(.55,1,e4);missed++;s+=`<circle cx="${f1(x+4)}" cy="${f1(y+5.5)}" r="${f1(5.5+2*e4)}" style="fill:none;stroke:var(--bad);stroke-width:1.3;opacity:${f1(e4)}"/>`}
      s+=`<use href="#scP" x="${f1(x)}" y="${f1(y)}" width="8" height="11" style="fill:${col};opacity:${f1(op)}"/>`});
    /* stage-3 legend */
    if(e3>0){const lx=N?G.hx-6:G.hx-6,ly=G.hy+posRows*G.ch+(N?20:22),oth=Math.round(M.FP*SC_OTH);
      const rows=[ ['var(--accent)',`autistic: ${M.TP}`],['var(--gold)',`other concern: ${oth}`],['var(--muted)',`typical development: ${M.FP-oth}`] ];
      rows.forEach((r,i)=>s+=`<g style="opacity:${f1(e3)}"><use href="#scP" x="${lx}" y="${ly+i*15-9}" width="8" height="11" style="fill:${r[0]}"/><text x="${lx+13}" y="${ly+i*15}" class="t-xs" style="fill:var(--ink)">${r[1]}</text></g>`);
      const ppv=M.TP/M.POS;s+=`<text x="${lx}" y="${ly+50}" class="t-sm" style="fill:var(--accent);opacity:${f1(e3)}">PPV ${Math.round(ppv*100)}% (model)</text>`}
    if(e4>0){const y=G.ly+lowH+(N?20:18);s+=`<text x="${G.lx-6}" y="${Math.min(y,G.ly+L.lowRows*G.ch+20)}" class="t-sm" style="fill:var(--bad);opacity:${f1(e4)}">○ missed: ${M.FN} autistic children screened negative</text>`}
    /* stage arrows across the top */
    const stg=N?['All','Score','Interview','Evaluate','Missed']:['Toddlers','Questionnaire','Interview','Evaluation','Missed'],cur=t<.18?0:t<.4?1:t<.6?2:t<.8?3:4;
    const sx=N?16:22,sw=N?76:136;
    stg.forEach((n,i)=>s+=`<text x="${sx+i*sw}" y="18" class="t-xs" style="fill:${i===cur?'var(--accent)':'var(--muted)'};font-weight:${i===cur?700:500}">${String(i+1)}·${n}</text>`);
    svg.innerHTML=s;
    const ST=steps(),ph=phaseOf(ST,t);setSt(ph);
    const fill=x=>x.replace(/\{POS\}/g,M.POS).replace(/\{TP\}/g,M.TP).replace(/\{FN\}/g,M.FN).replace(/\{PPV\}/g,Math.round(M.TP/M.POS*100)+'%');
    const P=Object.assign({},ST[ph]);P.txt=fill(P.txt);P.hook=fill(P.hook||'');
    $('#scNote').innerHTML=noteHTML(P);
    $('#scRead').innerHTML=`<span>group <b>${SC_POP[pop].n}</b></span><span>prevalence <b>${(SC_POP[pop].p*100).toFixed(1)}%</b></span><span>sens/spec <b>83% / 94%</b></span><span>screen positive <b>${M.POS}</b></span><span>autistic among them <b>${M.TP}</b></span><span>missed <b>${M.FN}</b></span><span>PPV <b>${Math.round(M.TP/M.POS*100)}%</b></span><span>NPV <b>${(M.TN/(M.TN+M.FN)*100).toFixed(1)}%</b></span>`;
  }
  const stop=playWire(rg,$('#scPlay'),draw,20000,'%t:player.replay%','screening');
  function wire(){const old=$('#scSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps(),rg,draw,stop)}
  $$('[data-sc]').forEach(b=>b.addEventListener('click',()=>{stop();pop=b.dataset.sc;$$('[data-sc]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- predictive-value calculator ---- */
  const cs=$('#scCalcSvg'),se=$('#scSe'),sp=$('#scSp'),pv=$('#scPv');
  const PRE={
   pool:{se:83,sp:94,pv:2.2,cap:`Pooled M-CHAT(-R/F) sensitivity 0.83 and specificity 0.94 [[Wieckowski2023]] at the 2.2% prevalence of a universally screened cohort. [[Guthrie2019]] Teaching calculation.`},
   chop:{se:38.8,sp:94.9,pv:2.2,cap:`Philadelphia primary-care network, every child followed to age 4–8: sensitivity 38.8%, PPV 14.6%, prevalence 2.2%. [[Guthrie2019]] Specificity here (94.9%) is back-calculated from those three published numbers, not reported.`},
   utah:{se:33.1,sp:97.8,pv:1.4,cap:`Utah health system, 36,233 toddlers: sensitivity 33.1%, PPV 17.8%, 1.4% later diagnosed. [[Carbone2020]] Specificity here (97.8%) is back-calculated from those numbers, not reported.`},
   sib:{se:83,sp:94,pv:20.2,cap:`The pooled accuracy [[Wieckowski2023]] applied to younger siblings, 20.2% of whom were autistic by age 3. [[Ozonoff2024]] Assumes the same accuracy in siblings. Teaching calculation.`},
   aq:{se:77,sp:29,pv:73,cap:`Adults referred to a UK diagnostic service: 73% were diagnosed; AQ sensitivity 0.77, specificity 0.29, published PPV 0.76 and NPV 0.36. [[Ashwood2016]] When nearly everyone tested has the condition, PPV is high even for a test that barely separates groups.`}};
  function calc(){
    const Se=+se.value/100,Sp=+sp.value/100,Pv=+pv.value/100,Nn=1000;
    const A=Pv*Nn,TP=Se*A,FN=A-TP,FP=(1-Sp)*(Nn-A),TN=Nn-A-FP,ppv=TP/(TP+FP),npv=TN/(TN+FN);
    $('#scSeO').textContent=(+se.value).toFixed(1)+'%';$('#scSpO').textContent=(+sp.value).toFixed(1)+'%';$('#scPvO').textContent=(+pv.value).toFixed(1)+'%';
    const n=v=>Math.round(v);let tp=n(TP),fn=n(A)-tp,fp=n(FP);if(tp+fn+fp>Nn)fp=Nn-tp-fn;
    const NN=vb(cs,'560 320','400 480');const cols=NN?32:50,cw=NN?11:10,x0=NN?24:30,y0=NN?16:12;
    let s='';
    for(let i=0;i<Nn;i++){const c=i<tp?'var(--accent)':i<tp+fn?'var(--bad)':i<tp+fn+fp?'var(--gold)':'var(--panel-2)',x=x0+(i%cols)*cw,y=y0+Math.floor(i/cols)*cw;
      s+=i>=tp&&i<tp+fn?`<rect x="${x+1}" y="${y+1}" width="${cw-3}" height="${cw-3}" rx="1.5" style="fill:none;stroke:${c};stroke-width:1.4"/>`:`<rect x="${x+.5}" y="${y+.5}" width="${cw-2}" height="${cw-2}" rx="1.5" style="fill:${c}"/>`}
    const lx=NN?24:30,ly=NN?380:232;
    const leg=[ ['var(--accent)',`true positive · ${tp}`,0],['var(--bad)',`autistic, missed · ${fn}`,1],['var(--gold)',`false positive · ${fp}`,0],['var(--panel-2)',`true negative · ${Nn-tp-fn-fp}`,0] ];
    leg.forEach((l,i)=>{const x=lx+(i%2)*(NN?180:260),y=ly+Math.floor(i/2)*20;
      s+=l[2]?`<rect x="${x+1}" y="${y-9}" width="9" height="9" rx="1.5" style="fill:none;stroke:${l[0]};stroke-width:1.4"/>`:`<rect x="${x}" y="${y-10}" width="10" height="10" rx="1.5" style="fill:${l[0]};stroke:var(--line)"/>`;
      s+=`<text x="${x+16}" y="${y}" class="t-xs" style="fill:var(--ink)">${l[1]}</text>`});
    const by=ly+52,bw=NN?352:500,pos=tp+fp;
    s+=`<text x="${lx}" y="${by}" class="t-xs">of ${pos} screen-positive:</text><rect x="${lx}" y="${by+6}" width="${bw}" height="12" rx="6" style="fill:var(--gold)"/><rect x="${lx}" y="${by+6}" width="${f1(pos?bw*tp/pos:0)}" height="12" rx="6" style="fill:var(--accent)"/>`;
    s+=`<text x="${lx}" y="${by+34}" class="t-sm" style="fill:var(--accent)">${Math.round(ppv*100)}% are autistic</text>`;
    cs.innerHTML=s;
    $('#scPPV').textContent=isFinite(ppv)?Math.round(ppv*100)+'%':'–';
    $('#scNPV').textContent=isFinite(npv)?(npv*100).toFixed(1)+'%':'–';
    $('#scPos').textContent=`${pos} / 1,000`;$('#scMiss').textContent=fn;
    $('#scSay').innerHTML=`Out of 1,000 people screened, <b>${n(A)}</b> are autistic. The screen flags <b>${pos}</b>: <b>${tp}</b> autistic and <b>${fp}</b> not. It misses <b>${fn}</b>. ${ppv<.3?'Most positives here are false alarms, so a positive result is a reason to assess, not a conclusion.':ppv<.7?'A positive result here is close to a coin toss for autism itself.':'Here most positives are autistic, mainly because autism is common in the group tested.'}`;
  }
  function preset(k){const P=PRE[k];se.value=P.se;sp.value=P.sp;pv.value=P.pv;$('#scCalcCap').innerHTML=P.cap;$$('[data-scp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.scp===k));calc()}
  [se,sp,pv].forEach(r=>r.addEventListener('input',()=>{$$('[data-scp]').forEach(b=>b.setAttribute('aria-pressed','false'));$('#scCalcCap').textContent='Your own values: a teaching calculation.';calc()}));
  $$('[data-scp]').forEach(b=>b.addEventListener('click',()=>preset(b.dataset.scp)));
  preset('pool');
  redraws.screening=(prev=>()=>{prev&&prev();calc()})(redraws.screening);
};
