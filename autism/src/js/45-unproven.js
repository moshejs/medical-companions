/* =============== 4.5 Unproven & harmful treatments =============== */
/* One hype curve per case. u in [0,1] runs through five stages; the band is drawn by hand (schematic),
   the events are from the cited studies. kind: claim, spread, pos (a positive small study), neg (no benefit),
   harm, stop (trial withdrawn or retracted), rev (systematic review), guide (guideline). */
const UN_STAGES=['The idea','It spreads','The test','The verdict','Afterwards'];
const UN_KIND={claim:['?','var(--muted)'],spread:['↑','var(--warn)'],pos:['+','var(--good)'],neg:['×','var(--bad)'],harm:['!','var(--bad)'],stop:['■','var(--bad)'],rev:['R','var(--accent)'],guide:['G','var(--rx)']};
const UN_CASES={
 secretin:{name:'Secretin',peak:.36,h:.95,fall:.62,res:.06,ev:[0,0],
  e:[{u:.07,k:'claim',l:'An anecdote',d:'One anecdote about a gut hormone, secretin, spreads before any trial. [[Sandler1999]]'},
     {u:.27,k:'spread',l:'"Thousands" injected',d:'"Thousands" of children receive secretin injections before trials are done. [[Sandler1999]]'},
     {u:.47,k:'neg',l:'RCT: no benefit',d:'Randomised trial, 60 children: no outcome improved. The checklist fell 8.9 points on secretin and 17.8 on placebo. [[Sandler1999]]'},
     {u:.55,k:'spread',l:'69% still want it',d:'After hearing the negative result, 69% of parents in that trial still wanted secretin. [[Sandler1999]]'},
     {u:.7,k:'rev',l:'Cochrane: 16 RCTs',d:'Cochrane: 16 RCTs, more than 900 children. Secretin "should not be recommended or administered as a treatment for ASD". [[Williams2012Secretin]]'},
     {u:.88,k:'guide',l:'NICE: do not use',d:'NICE guidance for adults lists secretin among interventions not to use for core features. [[Pilling2012]]'}],
  cap:'Secretin: [[Sandler1999,Williams2012Secretin,Pilling2012]]',
  n:[{txt:`Secretin is a gut hormone given by injection. The idea that it helped autism spread from one anecdote, without a controlled study. [[Sandler1999]]`,pt:`One family's story travelled fast, long before anyone had tested it fairly.`},
     {txt:`Before any trial was done, "thousands" of children received secretin injections. Publicity, not evidence, drove demand. [[Sandler1999]]`,hook:`Secretin is the classic example of publicity outrunning evidence: "thousands" treated before a trial. [[Sandler1999]]`},
     {txt:`A randomised trial gave one IV dose of synthetic human secretin or saline to 60 children (56 analysed). No outcome improved. The Autism Behavior Checklist fell 8.9 points with secretin and 17.8 with placebo (difference −8.9, 95% CI −19.4 to 1.6). Even so, 69% of parents in the trial still wanted secretin afterwards. [[Sandler1999]]`,pt:`When it was tested fairly against salt water, children on salt water did just as well.`},
     {txt:`A Cochrane review pooled 16 randomised trials and more than 900 children and concluded that secretin "should not be recommended or administered as a treatment for ASD". [[Williams2012Secretin]]`,hook:`Secretin: 16 RCTs, 900+ children, no benefit. [[Williams2012Secretin]]`},
     {txt:`NICE guidance lists secretin among interventions not to use for the core features of autism in adults. Interest faded, but the lesson remains: a placebo response can make an ineffective treatment look effective. [[Pilling2012,Siafis2020]]`,pt:`Secretin is no longer recommended anywhere in this guide's sources.`}]},
 chelation:{name:'Chelation',peak:.34,h:.7,fall:.6,res:.08,ev:[0,0],
  e:[{u:.07,k:'claim',l:'"Metals cause autism"',d:'Chelation was promoted on the idea that heavy metals, including mercury in the vaccine preservative thimerosal, cause autism. [[James2015]]'},
     {u:.3,k:'harm',l:'3 deaths reported',d:'2003–2005: CDC received reports of 3 deaths from hypocalcaemia during chelation; 2 were children given edetate disodium. [[Brown2006]]'},
     {u:.44,k:'neg',l:'No vaccine link',d:'657,461 Danish children: MMR adjusted HR 0.93. 1,256,407 children: no link with thimerosal or mercury. [[Hviid2019,Taylor2014Vaccine]]'},
     {u:.54,k:'stop',l:'NIMH trial withdrawn',d:'The NIMH "Mercury Chelation to Treat Autism" trial is listed as withdrawn, with 0 participants enrolled. [[NCT00376194]]'},
     {u:.7,k:'rev',l:'Cochrane: no evidence',d:'Cochrane: one eligible RCT and "no clinical trial evidence"; risks outweigh proven benefits. [[James2015]]'},
     {u:.88,k:'guide',l:'NICE: do not use',d:'NICE guidance for adults lists chelation among interventions not to use for core features. [[Pilling2012]]'}],
  cap:'Chelation: [[James2015,Brown2006,NCT00376194,Hviid2019,Taylor2014Vaccine]]',
  n:[{txt:`Chelation drugs bind metals so the body can excrete them. They were promoted for autism on the idea that heavy metals, including the mercury-containing vaccine preservative thimerosal, cause autism. [[James2015]]`,pt:`The treatment was built on a belief that metals from vaccines caused autism. That belief is wrong.`},
     {txt:`Between 2003 and 2005, CDC received reports of 3 deaths from cardiac arrest caused by hypocalcaemia (low calcium) during chelation. Two were children, both given edetate disodium. [[Brown2006]]`,hook:`Chelation has killed children: hypocalcaemia with edetate disodium. [[Brown2006]]`},
     {txt:`The premise was tested directly. In 657,461 Danish children, MMR vaccination did not raise autism risk (adjusted HR 0.93, 95% CI 0.85–1.02). A meta-analysis of 1,256,407 children found no association with vaccination (OR 0.99), thimerosal (OR 1.00) or mercury (OR 1.00). An NIMH-sponsored chelation trial is listed as withdrawn with 0 enrolled. [[Hviid2019,Taylor2014Vaccine,NCT00376194]]`,pt:`Vaccines do not cause autism. Very large studies checked this.`},
     {txt:`Cochrane found only one eligible randomised trial (oral DMSA) and "no clinical trial evidence" that chelation works for autism. Given reported hypocalcaemia, renal impairment and death, the reviewers judged that "the risks of using chelation for ASD currently outweigh proven benefits". [[James2015]]`,hook:`Chelation: no trial evidence of benefit; deaths reported. [[James2015,Brown2006]]`},
     {txt:`NICE lists chelation among interventions not to use for the core features of autism in adults. [[Pilling2012]]`,pt:`Chelation does not help autism and can kill. Please do not use it.`}]},
 hbot:{name:'Hyperbaric oxygen',peak:.4,h:.6,fall:.66,res:.12,ev:[.38,.5],
  e:[{u:.08,k:'claim',l:'Pressurised oxygen',d:'Hyperbaric oxygen: sessions breathing oxygen in a pressurised chamber. [[Rossignol2009]]'},
     {u:.42,k:'pos',l:'RCT: 30% vs 8%',d:'Multicentre RCT, 62 children aged 2–7, 40 sessions at 1.3 atm and 24% oxygen: physician-rated "much improved" 30% vs 8% on slightly pressurised air. [[Rossignol2009]]'},
     {u:.56,k:'neg',l:'"No consistent effects"',d:'Controlled within-subject study, 16 children, same 1.3 atm and 24% oxygen: "no consistent effects" on 11 observed behaviours. [[Jepson2011]]'},
     {u:.86,k:'guide',l:'NICE: do not use',d:'NICE guidance for adults lists hyperbaric oxygen among interventions not to use for core features. [[Pilling2012]]'}],
  cap:'Hyperbaric oxygen: [[Rossignol2009,Jepson2011,Pilling2012]]',
  n:[{txt:`Hyperbaric oxygen means breathing extra oxygen inside a pressurised chamber, usually over many sessions. [[Rossignol2009]]`},
     {txt:`Interest grew with clinics offering long courses of sessions. This case shows why one positive trial is not the end of the story.`,pt:`A treatment can sound scientific and still not be proven.`},
     {txt:`One multicentre RCT (62 children aged 2–7, 40 sessions at 1.3 atm and 24% oxygen) reported better physician global ratings: 30% vs 8% "much" or "very much improved". A controlled within-subject study of 16 children at the same settings found "no consistent effects" on 11 directly observed behaviours. [[Rossignol2009,Jepson2011]]`,hook:`One positive RCT, one negative controlled study: unreplicated benefit is not established benefit. [[Rossignol2009,Jepson2011]]`},
     {txt:`The single positive result was not confirmed. The evidence line rose briefly, then fell back when observed behaviour was measured directly. [[Jepson2011]]`,pt:`When researchers watched the children's actual behaviour, the oxygen made no steady difference.`},
     {txt:`NICE lists hyperbaric oxygen among interventions not to use for the core features of autism in adults. [[Pilling2012]]`}]},
 gfcf:{name:'GFCF diets',peak:.38,h:.85,fall:.64,res:.42,ev:[.06,.46],
  e:[{u:.08,k:'claim',l:'Gluten & casein out',d:'Gluten-free, casein-free (GFCF) diets remove wheat proteins and milk proteins. [[Piwowarczyk2018]]'},
     {u:.28,k:'spread',l:'Diets lead CAM use',d:'Special diets and supplements ranked first in 75% of CAM studies; 17% of ATN children were on special diets. [[Hofer2017,Perrin2012]]'},
     {u:.46,k:'rev',l:'Cochrane: "poor"',d:'Cochrane 2008: two small RCTs (n=35), evidence "poor". The review was withdrawn in 2019. [[Millward2008]]'},
     {u:.66,k:'neg',l:'6 RCTs: little evidence',d:'2018 review of 6 RCTs (214 children): "little evidence" a GFCF diet helps autism symptoms. [[Piwowarczyk2018]]'},
     {u:.88,k:'guide',l:'NICE: not for core features',d:'NICE: do not use exclusion diets such as gluten- or casein-free diets for core features. [[Kendall2013]]'}],
  cap:'GFCF diets: [[Hofer2017,Perrin2012,Millward2008,Piwowarczyk2018,Kendall2013]]',
  n:[{txt:`Gluten-free, casein-free (GFCF) diets remove wheat and milk proteins on the idea that they affect behaviour. [[Piwowarczyk2018]]`},
     {txt:`Diets became the most common alternative approach: special diets and supplements ranked first in 75% of studies of CAM use, and 17% of children in the Autism Treatment Network registry were on special diets. Use was higher in children with gastrointestinal symptoms. [[Hofer2017,Perrin2012]]`,pt:`Many families try a special diet. It feels safe and is something you can do at home.`},
     {txt:`A 2008 Cochrane review found two small RCTs with 35 children and called the evidence "poor". It was later withdrawn from the Cochrane Library (2019), not replaced with a positive update. [[Millward2008]]`},
     {txt:`A 2018 systematic review of 6 RCTs (214 children) found "little evidence" that a GFCF diet helps autism symptoms; with few exceptions, core-symptom scores did not differ between groups. [[Piwowarczyk2018]]`,hook:`GFCF diet: 6 RCTs, 214 children, "little evidence" of benefit. [[Piwowarczyk2018]]`},
     {txt:`NICE says not to use exclusion diets such as gluten- or casein-free diets for the core features of autism in children and young people. Interest stays high, which is why the band does not fall to zero. [[Kendall2013,Hofer2017]]`,pt:`Diets have not been shown to change autism. Talk to a doctor before cutting out foods.`}]},
 stem:{name:'Stem cells',peak:.4,h:.75,fall:.66,res:.2,ev:[.15,.3],
  e:[{u:.1,k:'pos',l:'Phase I: feasible',d:'Phase I open-label trial, 25 children, one cord-blood infusion: safe and feasible; no control group. [[Dawson2017]]'},
     {u:.3,k:'spread',l:'Crowdfunded clinics',d:'Crowdfunding for "stem cell" treatment at an international clinic: strong claims, testimonials, academic trials cited for credibility. [[Snyder2021]]'},
     {u:.56,k:'neg',l:'Phase II RCT: no benefit',d:'Phase II RCT, 180 children aged 2–7: one cord-blood infusion did not improve socialisation or autism symptoms at 6 months. [[Dawson2020]]'},
     {u:.74,k:'rev',l:'Subgroups exploratory',d:'Signals in children without intellectual disability were exploratory only. [[Dawson2020]]'}],
  cap:'Stem cells and cord blood: [[Dawson2017,Dawson2020,Snyder2021]]',
  n:[{txt:`A phase I open-label trial gave one infusion of the child's own cord blood to 25 children and found it safe and feasible. Its uncontrolled behavioural gains were used only to choose outcomes for a controlled trial. [[Dawson2017]]`,pt:`A first small study checked safety. It could not show whether the treatment works.`},
     {txt:`Crowdfunding campaigns for "stem cell" treatment at an international clinic made strong efficacy claims and relied on testimonials. Early academic trials and press releases were used to lend these clinics credibility. [[Snyder2021]]`,hook:`Stem-cell clinics borrow credibility from early academic trials. [[Snyder2021]]`},
     {txt:`The controlled phase II trial randomised 180 children aged 2–7. One cord-blood infusion was not associated with better socialisation or fewer autism symptoms at 6 months. [[Dawson2020]]`,pt:`When tested fairly, the infusion did not help.`},
     {txt:`Subgroup signals in children without intellectual disability were exploratory, which means they need their own trial before anyone can rely on them. [[Dawson2020]]`},
     {txt:`Families raising money for overseas clinics are paying for something a controlled trial did not support. Ask whether a treatment is part of a registered trial before paying for it. [[Snyder2021,Dawson2020]]`}]},
 camel:{name:'Camel milk',peak:.4,h:.55,fall:.7,res:.15,ev:[.4,.55],
  e:[{u:.1,k:'claim',l:'Marketed as helpful',d:'Camel milk and other products are sold to families with claims about autism. [[Kandeel2022]]'},
     {u:.44,k:'rev',l:'2022 meta-analysis',d:'A 2022 meta-analysis claimed camel milk lowered CARS scores. [[Kandeel2022]]'},
     {u:.62,k:'stop',l:'Retracted 2023',d:'The journal retracted that meta-analysis in 2023. [[Kandeel2022]]'},
     {u:.86,k:'guide',l:'NICE: no supplements',d:'NICE: do not use vitamins, minerals or dietary supplements for core features in adults. [[Pilling2012]]'}],
  cap:'Camel milk: [[Kandeel2022,Pilling2012]]',
  n:[{txt:`Camel milk is one of many products marketed to families. In this guide's sources, its evidence rests on a single meta-analysis. [[Kandeel2022]]`},
     {txt:`Products spread through word of mouth and online shops; diets and supplements are the most-used alternative approaches. [[Hofer2017]]`},
     {txt:`A 2022 meta-analysis claimed that camel milk lowered CARS scores, and the evidence line rises. [[Kandeel2022]]`,pt:`A paper can look like strong evidence and still be wrong.`},
     {txt:`In 2023 the journal retracted that meta-analysis. A retracted paper is no longer evidence, and the line falls back to zero. [[Kandeel2022]]`,hook:`Check for retractions: the camel-milk meta-analysis (2022) was retracted in 2023. [[Kandeel2022]]`},
     {txt:`NICE lists vitamins, minerals and dietary supplements among interventions not to use for the core features of autism in adults. [[Pilling2012]]`}]}
};
const UN_STEPS=UN_STAGES.map((t,i)=>({from:i*.2,at:i*.2+.13,t}));
const UN_Q=['Tested against placebo in randomised trials?','Benefit on outcomes that matter?','Confirmed by larger trials or reviews?','Promoted by independent clinicians, not the seller?','Harms small and well known?','Cost and burden reasonable?'];
/* g = reassuring, b = warning, u = unknown */
const UN_EX={
 secretin:{a:[['g','Yes: 16 RCTs, 900+ children'],['b','No: no outcome improved'],['b','Cochrane: do not use'],['b','Spread by publicity after one anecdote'],['u','Not the main issue: it does not work'],['u','Not reported in these sources']],v:'no',vt:'Not supported',vx:'Tested many times, and it does not work. [[Williams2012Secretin,Sandler1999]]'},
 chelation:{a:[['b','No: one small RCT; NIMH trial withdrawn'],['b','No trial evidence of benefit'],['b','Cochrane: risks outweigh benefits'],['b','Built on a vaccine–mercury idea that large studies reject'],['b','Deaths from hypocalcaemia; renal impairment'],['u','Not reported in these sources']],v:'no',vt:'Harmful: do not use',vx:'No evidence of benefit, a false premise, and deaths reported. [[James2015,Brown2006,Hviid2019]]'},
 hbot:{a:[['g','One RCT of 62 children'],['u','Mixed: one positive, one negative study'],['b','Not confirmed; NICE: do not use'],['u','Not reported in these sources'],['u','Not reported in these sources'],['b','40 chamber sessions in the trial']],v:'no',vt:'Not recommended',vx:'A single unconfirmed positive trial is not enough. [[Rossignol2009,Jepson2011,Pilling2012]]'},
 gfcf:{a:[['g','6 small RCTs, 214 children'],['b','"Little evidence" for autism symptoms'],['b','Cochrane 2008 "poor", later withdrawn'],['u','Not reported in these sources'],['u','Not reported in these sources'],['u','Not reported in these sources']],v:'no',vt:'Not supported for core features',vx:'Trials found little evidence; NICE advises against exclusion diets for core features. [[Piwowarczyk2018,Kendall2013]]'},
 stem:{a:[['g','Phase II RCT, 180 children'],['b','No better socialisation at 6 months'],['b','Phase I had no control group'],['b','Clinics crowdfunded with testimonials'],['u','Not reported in these sources'],['b','Families crowdfund to pay']],v:'no',vt:'Not supported',vx:'The controlled trial was negative; clinics sell what trials did not show. [[Dawson2020,Snyder2021]]'},
 camel:{a:[['u','No trial details in these sources'],['b','The only meta-analysis was retracted'],['b','Retracted in 2023'],['u','Sold as a product'],['u','Not reported in these sources'],['u','Not reported in these sources']],v:'no',vt:'Not supported',vx:'Its only evidence was retracted. [[Kandeel2022]]'},
 mel:{a:[['g','RCT, 125 children, 13 weeks'],['g','+57.5 vs +9.1 min sleep'],['g','Meta-analysis of 5 crossover RCTs'],['g','AAN guideline, after behavioural steps'],['u','Somnolence; long-term safety data lacking'],['g','Pharmaceutical-grade product advised']],v:'yes',vt:'Supported, for sleep, after behavioural steps',vx:'It helps sleep in trials; it does not treat autism. Long-term safety data are limited. [[Gringras2017,Rossignol2011,WilliamsBuckley2020]]'},
 ris:{a:[['g','RCT, 101 children, 8 weeks'],['g','69% vs 12% responders'],['g','45-trial meta-analysis'],['g','US label for irritability'],['b','Weight gain, sedation, prolactin'],['u','Needs regular monitoring']],v:'maybe',vt:'Supported for severe irritability, with real costs',vx:'It works for aggression and self-injury, not for autism itself, and needs monitoring. [[McCracken2002,SalazarDePablo2023,FDA-Risperdal]]'}
};

inits.unproven=()=>{
  const svg=$('#unSvg'),rg=$('#unT');let cs=store.get('unCase','secretin');if(!UN_CASES[cs])cs='secretin';
  const band=(C,u)=>{if(u<C.peak)return C.h*Math.pow(Math.sin(Math.PI/2*u/C.peak),1.6);
    if(u<C.fall)return lerp(C.h,(C.h+C.res)/2,ease(ramp(u,C.peak,C.fall)));return lerp((C.h+C.res)/2,C.res,ease(ramp(u,C.fall,Math.min(1,C.fall+.2))))};
  const evid=(C,u)=>C.ev[0]?C.ev[0]*bump(u,C.ev[1]-.12,C.ev[1]+.14):0;
  function draw(t){
    const N=vb(svg,'720 380','400 460'),C=UN_CASES[cs],p=phaseOf(UN_STEPS,t);
    const L=N?{x0:16,x1:384,y0:60,y1:290}:{x0:30,x1:700,y0:84,y1:262};
    const X=u=>lerp(L.x0,L.x1,u),Y=v=>lerp(L.y1,L.y0,v);let s='';
    UN_STAGES.forEach((n,i)=>{const a=X(i*.2),b=X(i*.2+.2);s+=`<rect x="${f1(a)}" y="${L.y0-(N?30:58)}" width="${f1(b-a)}" height="${f1(L.y1-L.y0+(N?30:58))}" style="fill:${i===p?'var(--rx-soft)':'none'};opacity:.6"/>`;
      if(i)s+=`<line x1="${f1(a)}" x2="${f1(a)}" y1="${L.y0-(N?30:58)}" y2="${L.y1}" class="grid"/>`;
      s+=`<text x="${f1((a+b)/2)}" y="${L.y0-(N?14:46)}" class="t-xs t-mid" style="${i===p?'fill:var(--ink);font-weight:700':''}">${N?n.replace('The ','').replace('It ',''):n}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.y1}" y2="${L.y1}" class="axis" style="stroke:var(--muted)"/>`;
    /* interest band up to t */
    let top='',n=Math.max(2,Math.round(t*120));for(let i=0;i<=n;i++){const u=t*i/n;top+=(i?'L':'M')+f1(X(u))+' '+f1(Y(band(C,u)))}
    s+=`<path d="${top}L${f1(X(t))} ${L.y1}L${X(0)} ${L.y1}Z" style="fill:var(--warn);opacity:.2"/><path d="${top}" style="fill:none;stroke:var(--warn);stroke-width:2.6"/>`;
    let ev='';for(let i=0;i<=n;i++){const u=t*i/n;ev+=(i?'L':'M')+f1(X(u))+' '+f1(Y(evid(C,u)))}
    s+=`<path d="${ev}" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-dasharray:6 3"/>`;
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.y0-30}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    /* legend */
    const lgy=L.y1+(N?20:18);
    s+=`<rect x="${L.x0}" y="${lgy-8}" width="14" height="6" style="fill:var(--warn)"/><text x="${L.x0+20}" y="${lgy}" class="t-xs">interest and use</text>`;
    s+=`<line x1="${L.x0+(N?186:150)}" x2="${L.x0+(N?202:166)}" y1="${lgy-4}" y2="${lgy-4}" style="stroke:var(--good);stroke-width:2.4;stroke-dasharray:6 3"/><text x="${L.x0+(N?208:172)}" y="${lgy}" class="t-xs">evidence of benefit</text>`;
    /* events */
    let last=null;C.e.forEach((E,i)=>{const on=t>=E.u;if(!on)return;last=E;const K=UN_KIND[E.k],x=X(E.u),bv=band(C,E.u),y=Y(bv)-14-(i%2)*(N?0:0);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y+9)}" y2="${L.y1}" style="stroke:${K[1]};stroke-width:1;stroke-dasharray:2 3;opacity:.7"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:${K[1]}"/><text x="${f1(x)}" y="${f1(y+4)}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${K[0]}</text>`;
      if(!N){const ly=L.y0-30+(i%3)*12,anc=E.u>.85?'t-end':E.u<.12?'':'t-mid';s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(ly+3)}" y2="${f1(y-9)}" style="stroke:${K[1]};stroke-width:1;opacity:.6"/><text x="${f1(x)}" y="${f1(ly)}" class="t-xs ${anc}" style="fill:var(--ink)">${E.l}</text>`}});
    /* the latest event, spelled out */
    const by=N?lgy+18:lgy+14,bw=L.x1-L.x0;
    s+=`<rect x="${L.x0}" y="${by}" width="${bw}" height="${N?(460-by-6):(380-by-8)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(last){const K=UN_KIND[last.k];s+=`<circle cx="${L.x0+18}" cy="${by+20}" r="9" style="fill:${K[1]}"/><text x="${L.x0+18}" y="${by+24}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${K[0]}</text><text x="${L.x0+34}" y="${by+24}" class="t-lbl">${last.l}</text>`;
      const words=last.d.replace(/\s*<sup[^>]*>.*?<\/sup>/g,'').replace(/\s*\[\[[^\]]*\]\]/g,'').split(' '),mx=N?44:92;let line='',k=0;const lines=[];words.forEach(w=>{if((line+' '+w).length>mx){lines.push(line);line=w}else line=line?line+' '+w:w});lines.push(line);
      lines.slice(0,N?4:2).forEach((ln,j)=>s+=`<text x="${L.x0+14}" y="${by+42+j*15}" class="t-sm" style="fill:var(--ink)">${ln}</text>`);void k}
    else s+=`<text x="${L.x0+14}" y="${by+24}" class="t-sm">Press Play to follow ${C.name.toLowerCase()} from claim to verdict.</text>`;
    svg.innerHTML=s;setSt(p);
    const nn=C.n[p];$('#unNote').innerHTML=noteHTML({k:C.name+' · stage '+(p+1)+' of 5',t:UN_STAGES[p],txt:nn.txt,pt:nn.pt,hook:nn.hook});
    rg.setAttribute('aria-valuetext',`${C.name}: ${UN_STAGES[p]}${last?', '+last.l:''}`);
  }
  const stop=playWire(rg,$('#unPlay'),draw,20000,'%t:player.replay%','unproven');
  const setSt=stepWire($('#unSteps'),UN_STEPS,rg,draw,stop);
  function setCase(c){cs=c;store.set('unCase',c);$$('[data-un]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.un===c));$('#unCap').innerHTML=UN_CASES[c].cap;draw(+rg.value)}
  $$('[data-un]').forEach(b=>b.addEventListener('click',()=>{stop();setCase(b.dataset.un)}));
  setCase(cs);

  /* claim checker */
  const tree=$('#unTree'),sel=$('#unEx'),own=['u','u','u','u','u','u'];
  $('#unQs').innerHTML=UN_Q.map((q,i)=>`<div class="unq"><span>${i+1}. ${q}</span><div class="unrow" role="group" aria-label="${q}">${[['g','Yes'],['b','No'],['u','Not sure']].map(([v,l])=>`<button class="btn" data-uq="${i}" data-uv="${v}" aria-pressed="${v==='u'}">${l}</button>`).join('')}</div></div>`).join('');
  const COL={g:'var(--good)',b:'var(--bad)',u:'var(--muted)'},SOFT={g:'var(--good-soft)',b:'var(--bad-soft)',u:'var(--panel-2)'},MARK={g:'✓',b:'✕',u:'?'};
  function ownVerdict(){const a=own;
    if(a[0]==='b')return['no','Unproven','No randomised, placebo-controlled trial. In autism research, about 1 in 5 children improve on placebo, so stories and before-and-after reports cannot tell you whether it works. [[Siafis2020]]'];
    if(a[1]==='b')return['no','Not supported','It was tested and did not help. Treatments like secretin were abandoned for this reason. [[Williams2012Secretin]]'];
    if(a[4]==='b')return['no','Weigh the harms carefully','Known serious harms need a clear, proven benefit to justify them, as with chelation, which has killed children. [[Brown2006,James2015]]'];
    if(a.slice(0,3).every(x=>x==='g'))return['yes','Promising: discuss with your clinician','Randomised, beneficial and confirmed. Ask what it is for, what it costs you, and how you will know if it is working. [[Hyman2020]]'];
    if(a[3]==='b')return['maybe','Be cautious','Promotion by the seller, testimonials and crowdfunding are warning signs. [[Snyder2021]]'];
    return['maybe','Not enough information yet','Look for a registered, randomised trial and an independent review before spending money or time. [[Siafis2020]]']}
  function drawTree(){const N=vb(tree,'520 470','400 520'),ex=sel.value,E=UN_EX[ex],ans=ex==='own'?own.map(v=>[v,{g:'Yes',b:'No',u:'Not sure'}[v]]):E.a;
    const w=N?380:500,x0=10,bh=N?62:56,gap=N?20:20;let s=`<defs>${marker('unArr','var(--muted)')}</defs>`;
    ans.forEach(([v,txt],i)=>{const y=8+i*(bh+gap);
      s+=`<rect x="${x0}" y="${y}" width="${w}" height="${bh}" rx="10" style="fill:${SOFT[v]};stroke:${COL[v]};stroke-width:1.4"/>`;
      s+=`<circle cx="${x0+22}" cy="${y+bh/2}" r="13" style="fill:${COL[v]}"/><text x="${x0+22}" y="${y+bh/2+5}" class="t-lbl t-mid" style="fill:var(--bg)">${MARK[v]}</text>`;
      s+=`<text x="${x0+44}" y="${y+22}" class="t-lbl" style="font-size:${N?13:13.5}px">${i+1}. ${UN_Q[i]}</text>`;
      s+=`<text x="${x0+44}" y="${y+42}" class="t-sm" style="fill:var(--ink)">${txt}</text>`;
      if(i<5)s+=`<path d="M${x0+22} ${y+bh+2}V${y+bh+gap-3}" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#unArr)"/>`});
    tree.innerHTML=s;
    const V=ex==='own'?ownVerdict():[E.v,E.vt,E.vx];
    $('#unVerdict').innerHTML=`<div class="verdict ${V[0]}">${V[1]}<p>${V[2]}</p></div>`;
    $('#unOwn').hidden=ex!=='own'}
  sel.addEventListener('change',drawTree);
  $('#unQs').addEventListener('click',e=>{const b=e.target.closest('[data-uq]');if(!b)return;const i=+b.dataset.uq;own[i]=b.dataset.uv;
    $$(`[data-uq="${i}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));drawTree()});
  drawTree();
  redraws.unproven=(f=>()=>{f&&f();drawTree()})(redraws.unproven);
};
