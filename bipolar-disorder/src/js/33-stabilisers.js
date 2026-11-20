/* =============== 3.3 Valproate, lamotrigine & carbamazepine =============== */
/* Lamotrigine schedules exactly as the US Lamictal label's Table 5 (adults with bipolar disorder).
   w = mg/day for weeks 1..7 (valproate weeks 1-2 = 25 mg every other day, drawn as 12.5/day). */
const ST_SCH={
  std:{n:'Lamotrigine alone',nl:'No valproate, no enzyme inducers',w:[25,25,50,50,100,200,200],
       lab:['25 mg daily','25 mg daily','50 mg daily','50 mg daily','100 mg daily','200 mg daily','200 mg daily'],tg:200,eod:0},
  vpa:{n:'With valproate',nl:'Taking valproate',w:[12.5,12.5,25,25,50,100,100],
       lab:['25 mg every other day','25 mg every other day','25 mg daily','25 mg daily','50 mg daily','100 mg daily','100 mg daily'],tg:100,eod:2},
  ind:{n:'With enzyme inducers',nl:'Carbamazepine, phenytoin, phenobarbital or primidone, not valproate',w:[50,50,100,100,200,300,400],
       lab:['50 mg daily','50 mg daily','100 mg daily','100 mg daily','200 mg','300 mg','up to 400 mg daily'],tg:400,eod:0}
};
const ST_STEPS=[
 {from:0,at:.07,k:'Weeks 1–2',t:'A deliberately low start',
  txt:`The US Lamictal label sets out the escalation for adults with bipolar disorder in its Table 5. Without valproate or enzyme inducers it begins at 25 mg daily in weeks 1–2. With valproate it begins at 25 mg every other day; with carbamazepine, phenytoin, phenobarbital or primidone (and not valproate) at 50 mg daily. Quoted as published, not as instructions. [[FDA-Lamictal]]`,
  pt:`Lamotrigine starts at a small dose and rises slowly over about six weeks. The slow start is there to lower the chance of a serious rash.`,
  hook:`Lamictal label: exceeding the recommended initial dose or the recommended escalation are listed risk factors for serious rash.`},
 {from:2/7,at:.33,k:'Weeks 3–4',t:'The first step up',
  txt:`In weeks 3–4 the label's schedules reach 50 mg daily alone, 25 mg daily with valproate and 100 mg daily with an enzyme inducer. Valproate <i>"has been shown to inhibit glucuronidation and decrease the apparent clearance of lamotrigine"</i>, which is why its schedule runs at about half. Inducers such as carbamazepine speed clearance, so theirs runs at about double. [[FDA-Lamictal]]`,
  pt:`Some medicines change how fast the body clears lamotrigine. Valproate slows it, so the doses are smaller; carbamazepine speeds it up, so they are larger.`,
  hook:`With valproate: halve the titration. With carbamazepine: roughly double it.`},
 {from:4/7,at:.6,k:'Week 5',t:'Other medicines matter too',
  txt:`Week 5 is 100 mg daily alone, 50 mg with valproate and 200 mg with an inducer. Estrogen-containing oral contraceptives also increase lamotrigine clearance: the label says the maintenance dose <i>"will in most cases need to be increased by as much as 2-fold"</i> when they are taken, and decreased by as much as 50% when they are stopped. If valproate is stopped, the label says the lamotrigine dose <i>"should be doubled over a 2-week period in equal weekly increments"</i>. [[FDA-Lamictal]]`,
  pt:`Starting or stopping the contraceptive pill, valproate or carbamazepine can change lamotrigine levels a lot. That is one reason every change is planned with the prescriber.`,
  hook:`Estrogen-containing pills lower lamotrigine levels; stopping them raises levels.`},
 {from:5/7,at:.79,k:'Weeks 6–7',t:'The label’s target dose',
  txt:`The label's bipolar target is 200 mg/day: 100 mg/day with valproate, or 400 mg/day with enzyme inducers and no valproate (reached in divided doses by week 7). Trials found <i>"no additional benefit"</i> at 400 mg vs 200 mg/day, so <i>"doses above 200 mg/day are not recommended"</i> without inducers. Because of this slow climb, lamotrigine cannot be judged by an early 2-week response the way some other bipolar depression treatments can; CANMAT/ISBD 2018 suggests a target of <i>"a minimum of 200 mg/day"</i>. [[FDA-Lamictal,Yatham2018]]`,
  pt:`Lamotrigine takes weeks to reach its working dose, so it is a medicine for keeping well over time more than for a quick fix.`,
  hook:`Label bipolar targets: 200 mg/day alone, 100 with valproate, 400 with inducers.`},
 {from:.93,at:1,k:'Boxed warning',t:'The rash window',
  txt:`The Lamictal boxed warning: serious rash, including Stevens–Johnson syndrome, occurs in about 0.08% to 0.3% of adults and 0.3% to 0.8% of patients aged 2–17. Risk factors are taking valproate, exceeding the initial dose or the escalation, and the HLA-B*1502 allele, <i>"However, cases have occurred in the absence of these factors"</i>. <i>"Nearly all cases of life-threatening rashes caused by LAMICTAL have occurred within 2 to 8 weeks of treatment initiation"</i>, and it <i>"should ordinarily be discontinued at the first sign of rash, unless the rash is clearly not drug related"</i>. NICE advises people to <i>"contact their doctor immediately if they develop a rash while the dose of lamotrigine is being increased"</i>. [[FDA-Lamictal,NICE2014CG185F]]`,
  pt:`A new rash while the dose is going up is a reason to contact the doctor straight away. Most rashes are not dangerous, but a doctor needs to decide.`,
  hook:`Serious rash in adults: 0.08–0.3%, nearly all within 2–8 weeks of starting.`}
];
/* EURAP major congenital malformation rates (%), monotherapy, at 1 year */
const ST_PG={'2018':{src:'Tomson 2018',d:[['Valproate',10.3],['Carbamazepine',5.5],['Lamotrigine',2.9],['Levetiracetam',2.8]]},
             '2024':{src:'Battino 2024',d:[['Valproate',9.9],['Carbamazepine',5.4],['Lamotrigine',3.1],['Levetiracetam',2.5]]}};
const ST_PGN=[
 {from:0,k:'The picture',t:'100 pregnancies per medicine',
  txt:`EURAP is an international registry of pregnancies exposed to antiseizure medicines. Its 2018 analysis covered 7,355 monotherapy pregnancies (1999–2016); the 2024 update covered 9,840 (1999–2022). Each block is scaled to 100 pregnancies. [[Tomson2018,Battino2024EURAP]]`,
  pt:`Each little figure stands for one pregnancy. Most babies are born without a major malformation on any of these medicines.`},
 {from:.3,k:'Valproate',t:'About 1 in 10',
  txt:`With valproate, major malformations at 1 year occurred in 10.3% (142 of 1,381) in EURAP 2018 and 9.9% (95% CI 8.5–11.5%) in the 2024 update, and the risk rose with dose (p<0.0001). The US label adds the NAAED registry's 9–11% at an average 1,000 mg/day. [[Tomson2018,Battino2024EURAP,FDA-Depakote]]`,
  hook:`Valproate's major malformation rate is about 10% (EURAP 10.3%, Cochrane 10.93%), against about 3% for lamotrigine.`},
 {from:.54,k:'The others',t:'Lower, and lowest with lamotrigine',
  txt:`Carbamazepine sits in between (5.5% in 2018, 5.4% in 2024); lamotrigine (2.9%, 3.1%) and levetiracetam (2.8%, 2.5%) are lowest. A Cochrane review found that lamotrigine showed no increased risk of major malformation. [[Tomson2018,Battino2024EURAP,Weston2016]]`,
  pt:`Of these medicines, valproate carries the biggest risk to a developing baby. That is why it needs planning long before any pregnancy.`},
 {from:.86,k:'Beyond malformations',t:'Spina bifida, IQ and autism',
  txt:`The label puts spina bifida at about 0.06–0.07% in the general population against about 1–2% after valproate. Children exposed in the womb also had lower IQ at age 6 in NEAD (97 vs 108 with lamotrigine) and a higher 14-year autism risk in Denmark (4.42% vs 1.53%). These are population statistics. [[FDA-Depakote,Meador2013NEAD,Christensen2013]]`,
  pt:`Valproate's effects can show up later in childhood too, in learning and development. Anyone who could become pregnant should plan medicines with their care team ahead of time and not stop a medicine suddenly on their own.`,
  hook:`Depakote boxed warning: hepatotoxicity, fetal risk and pancreatitis.`}
];
/* comparator: guideline position per phase, then the detail cards */
const ST_CMP={
 vpa:{n:'Valproate (divalproex)',ph:[['First-line','good','divalproex, CANMAT/ISBD 2018'],['Second-line','warn','divalproex, bipolar I depression'],['First-line','good','level 1; weaker in BALANCE']],
  cards:[
   ['Best evidence',`Acute mania: 48% improved by ≥50% vs 25% on placebo (1994), and SMD −0.20 vs placebo in Cipriani 2011, below haloperidol, risperidone and olanzapine. Maintenance: its 12-month trial missed its primary endpoint and the US label says <i>"there are no data to support the benefits of Depakote in such longer-term treatment"</i>, yet CANMAT/ISBD still rates divalproex first-line (level 1). [[Bowden1994Divalproex,Cipriani2011Mania,Bowden2000Divalproex,FDA-Depakote,Yatham2018]]`],
   ['Boxed warning',`<i>"Life threatening adverse reactions"</i>: hepatotoxicity (fatal liver failure usually in the first six months; higher risk under age two and with POLG mitochondrial disease), fetal risk, and pancreatitis (2 cases without another cause in 2,416 trial patients). [[FDA-Depakote]]`],
   ['Monitoring',`Liver tests before therapy <i>"and at frequent intervals thereafter, especially during the first six months"</i> (label). NICE: weight or BMI, full blood count and liver function at the start, at 6 months, then yearly. Platelets fell to ≤75 × 10⁹/L in 27% at about 50 mg/kg/day in an epilepsy trial; the label also warns of high ammonia. [[FDA-Depakote,NICE2014CG185F]]`],
   ['Key interactions and planning',`Valproate halves lamotrigine's schedule by slowing its clearance. NICE: <i>"Do not start valproate in primary care to treat bipolar disorder"</i>; BAP 2016 says its risk/benefit <i>"contraindicates its use in women of child bearing potential under normal circumstances"</i>. [[FDA-Lamictal,NICE2014CG185F,Goodwin2016BAP]]`]]},
 ltg:{n:'Lamotrigine',ph:[['Not recommended','bad','level 1 negative'],['First-line','good','alone or added on'],['First-line','good','mainly prevents depression']],
  cards:[
   ['Best evidence',`Maintenance, mostly against depression: lamotrigine was <i>"predominantly effective against depression"</i> and lithium <i>"predominantly effective against mania"</i>. For acute bipolar depression the effect is modest (response RR 1.27; SMD 0.16, the smallest among agents that beat placebo). It is no better than placebo in acute mania, and the label states <i>"Treatment of acute manic or mixed episodes is not recommended"</i>. [[Calabrese2003Lamotrigine,Geddes2009Lamotrigine,Yildiz2023,Cipriani2011Mania,FDA-Lamictal]]`],
   ['Boxed warning',`Serious skin rash, including Stevens–Johnson syndrome: about 0.08–0.3% of adults and 0.3–0.8% of those aged 2–17, nearly all within 2–8 weeks of starting. Hence the slow published titration in the animation above. [[FDA-Lamictal]]`],
   ['Monitoring',`Watching for rash while the dose is rising. The label advises that people taking it for more than 16 weeks <i>"should be periodically reassessed to determine the need for maintenance treatment"</i>. Levels are not measured routinely (NICE). In Miura 2014 it was better tolerated than carbamazepine, lithium, or lithium plus valproate. [[FDA-Lamictal,NICE2014CG185F,Miura2014]]`],
   ['Key interactions',`Valproate: about half the schedule. Carbamazepine, phenytoin, phenobarbital or primidone: about double. Estrogen-containing contraceptives can lower levels by up to half, so doses change when they start or stop. [[FDA-Lamictal]]`]]},
 cbz:{n:'Carbamazepine',ph:[['Second-line','warn','level 1, downgraded for safety'],['Not covered','na','not in this module’s sources'],['Not better than placebo','bad','Miura 2014 network analysis']],
  cards:[
   ['Best evidence',`Acute mania: SMD −0.36 vs placebo in Cipriani 2011, and the extended-release capsule (Equetro) is indicated for <i>"acute manic or mixed episodes associated with bipolar I disorder"</i>. CANMAT/ISBD 2018 downgrades it to second-line <i>"due to safety/tolerability risks"</i>. For maintenance it did not significantly lower relapse vs placebo (RR 0.68, 0.44–1.06). [[Cipriani2011Mania,FDA-Equetro,Yatham2018,Miura2014]]`],
   ['Boxed warning',`SJS/TEN in about 1–6 per 10,000 new users in mainly Caucasian populations, about 10 times higher in people of Asian descent; and aplastic anaemia and agranulocytosis at 5–8 times the general-population risk. A complete blood count is taken before starting. [[FDA-Equetro]]`],
   ['HLA-B*15:02',`The label says to test for HLA-B*1502 before starting in people with <i>"an increased likelihood of carrying this allele"</i>, and to avoid it in carriers unless the benefit clearly outweighs the risk. In Taiwan, screening 4,877 people (7.7% carriers) gave zero SJS/TEN cases against about 10 expected. In Northern Europeans, HLA-A*3101 raised hypersensitivity risk from 5.0% to 26.0%. [[FDA-Equetro,Chung2004HLA,Chen2011HLA,McCormack2011HLA]]`],
   ['Key interactions',`Carbamazepine induces CYP3A4 and <i>"may decrease the effectiveness of hormonal contraceptives"</i>. It roughly doubles lamotrigine's published schedule and target. [[FDA-Equetro,FDA-Lamictal]]`]]}
};
inits.stabilisers=()=>{
  /* ---------- 1. lamotrigine titration calendar ---------- */
  const svg=$('#stSvg'),rg=$('#stT');let sch='std';
  const dose=(S,d)=>{const w=clamp(Math.floor(d/7),0,6);return S.w[w]};
  const taken=(S,d)=>!(S.eod&&d<14&&d%2===1);
  function draw(t){
    const N=vb(svg,'720 380','400 600'),S=ST_SCH[sch];
    const day=Math.min(48.99,t*49),dI=Math.floor(day),wk=Math.floor(day/7),p=phaseOf(ST_STEPS,t),rash=p===4?1:0;
    const L=N?{x0:52,x1:380,yt:262,yb:540,hy:24}:{x0:70,x1:700,yt:104,yb:318,hy:24};
    const X=d=>L.x0+(L.x1-L.x0)*d/49,Y=v=>L.yb-(L.yb-L.yt)*v/400;
    let s=`<defs>${marker('stArr','var(--bad)')}</defs>`;
    s+=`<text x="16" y="${L.hy}" class="t-lbl" style="fill:var(--rx)">${S.n}</text>`;
    s+=N?`<text x="16" y="${L.hy+16}" class="t-xs">week ${wk+1} · day ${dI+1} · ${S.lab[wk]}</text>`
        :`<text x="704" y="${L.hy}" class="t-sm t-end">week ${wk+1} · day ${dI+1} · ${S.lab[wk]}</text>`;
    /* calendar */
    for(let w=0;w<7;w++)for(let d=0;d<7;d++){const di=w*7+d,past=di<=dI,tk=taken(S,di),now=di===dI;
      let cx,cy,sz;if(N){sz=14;cx=56+d*18;cy=52+w*25}else{sz=10;cx=X(w*7)+3+d*12.4;cy=42}
      s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${sz}" height="${sz}" rx="2.5" style="fill:${past&&tk?'var(--rx)':'var(--panel)'};stroke:${now?'var(--ink)':past?'var(--rx)':'var(--line)'};stroke-width:${now?2:1};opacity:${past&&!tk?.9:1}"/>`;
      if(past&&!tk)s+=`<line x1="${f1(cx+3)}" x2="${f1(cx+sz-3)}" y1="${f1(cy+sz/2)}" y2="${f1(cy+sz/2)}" style="stroke:var(--rx);stroke-width:1.2"/>`}
    if(N){for(let w=0;w<7;w++){const cy=52+w*25+11;s+=`<text x="48" y="${cy}" class="t-xs t-end" style="${w===wk?'fill:var(--ink);font-weight:700':''}">wk ${w+1}</text>`;
        if(w<=wk)s+=`<text x="190" y="${cy}" class="t-xs" style="fill:${w===wk?'var(--rx)':'var(--muted)'};${w===wk?'font-weight:700':''}">${S.lab[w]}</text>`}
      s+=`<text x="56" y="${52+7*25+8}" class="t-xs">filled = a dose day · dash = no dose that day</text>`}
    else s+=`<text x="${L.x0-6}" y="51" class="t-xs t-end">days</text><text x="${L.x0}" y="70" class="t-xs">filled = a dose day · dash = no dose that day (every-other-day weeks)</text>`;
    /* rash window: label says weeks 2 to 8 */
    const rx0=X(7),op=.18+rash*.5;
    s+=`<rect x="${f1(rx0)}" y="${L.yt-8}" width="${f1(L.x1-rx0)}" height="${f1(L.yb-L.yt+8)}" style="fill:var(--bad-soft);opacity:${f1(op)}"/>`;
    s+=`<line x1="${f1(rx0)}" x2="${f1(rx0)}" y1="${L.yt-8}" y2="${L.yb}" style="stroke:var(--bad);stroke-width:1;stroke-dasharray:3 3;opacity:${f1(.4+rash*.6)}"/>`;
    s+=`<text x="${f1(rx0+6)}" y="${L.yt+6}" class="t-xs" style="fill:var(--bad);opacity:${f1(.6+rash*.4)}">${N?'rash window: weeks 2–8':'nearly all life-threatening rashes: weeks 2–8'}</text>`;
    s+=`<path d="M${f1(L.x1-34)} ${L.yt+16}H${f1(L.x1-4)}" style="stroke:var(--bad);stroke-width:1.4;opacity:${f1(.5+rash*.5)}" marker-end="url(#stArr)"/>`;
    /* grid */
    [0,100,200,300,400].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.x0-6}" y="${L.yt-12}" class="t-xs t-end">mg/day</text>`;
    for(let w=0;w<7;w++)s+=`<text x="${f1(X(w*7+3.5))}" y="${L.yb+16}" class="t-xs t-mid" style="${w===wk?'fill:var(--ink);font-weight:700':''}">wk ${w+1}</text>`;
    s+=`<text x="${L.x1}" y="${L.yb+32}" class="t-xs t-end">weeks since starting →</text>`;
    /* ghost schedules */
    const stepPath=(S2,upto)=>{let d='';for(let w=0;w<7;w++){const a=w*7,b=Math.min(upto,a+7);if(b<=a)break;const y=Y(S2.w[w]);d+=(w?'L':'M')+f1(X(a))+' '+f1(y)+'L'+f1(X(b))+' '+f1(y)}return d};
    Object.keys(ST_SCH).filter(k=>k!==sch).forEach(k=>{s+=`<path d="${stepPath(ST_SCH[k],49)}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4;opacity:.55"/>`});
    /* target */
    const ty=Y(S.tg),tOn=t>=5/7;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--rx);stroke-width:1.2;stroke-dasharray:2 3;opacity:${tOn?.9:.3}"/>`;
    s+=`<text x="${f1(N?L.x0+4:L.x0+6)}" y="${f1(ty-5)}" class="t-xs" style="fill:var(--rx);opacity:${tOn?1:.5}">label target ${S.tg} mg/day</text>`;
    /* active schedule */
    const ap=stepPath(S,day+.01);
    s+=`<path d="${ap}L${f1(X(day))} ${L.yb}L${L.x0} ${L.yb}Z" style="fill:var(--rx-soft);opacity:.7;stroke:none"/>`;
    s+=`<path d="${ap}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linejoin:round"/>`;
    /* dose labels at each new level */
    let prev=null;for(let w=0;w<=wk;w++){const v=S.w[w];if(v===prev)continue;prev=v;let e=w;while(e<6&&S.w[e+1]===v)e++;
      const mx=X((w*7+Math.min((e+1)*7,day+1))/2+0),lx=clamp(X(w*7)+4,L.x0,L.x1-40);void mx;
      s+=`<text x="${f1(lx)}" y="${f1(Y(v)-6)}" class="t-xs" style="fill:var(--rx);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px">${v===12.5?'25 alt. days':v}</text>`}
    /* today marker */
    const hx=X(day),hy=Y(dose(S,day));
    s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.yt-8}" y2="${L.yb}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=pill(hx,hy-16,22,{ang:-20});
    s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="4.5" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    setSt(p);
    $('#stRead').innerHTML=`<span>schedule <b>${S.nl}</b></span><span>week <b>${wk+1}</b></span><span>label dose <b>${S.lab[wk]}</b></span>`;
    $('#stNote').innerHTML=noteHTML(ST_STEPS[p]);
    rg.setAttribute('aria-valuetext',`Week ${wk+1}, day ${dI+1}: ${S.lab[wk]} (${S.n})`);
  }
  function legend(){$('#stLeg').innerHTML=Object.keys(ST_SCH).map(k=>`<span><i class="${k===sch?'on':''}" style="background:${k===sch?'var(--rx)':'var(--muted)'};opacity:${k===sch?1:.55}"></i>${ST_SCH[k].n}${k===sch?' (shown)':' (dashed)'}</span>`).join('')+`<span><i style="background:var(--bad-soft);height:10px;border:1px solid var(--bad)"></i>rash window</span>`}
  const stop=playWire(rg,$('#stPlay'),draw,16000,'%t:player.replay%','stabilisers');
  const setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);
  $$('[data-stsch]').forEach(b=>b.addEventListener('click',()=>{sch=b.dataset.stsch;$$('[data-stsch]').forEach(x=>x.setAttribute('aria-pressed',x===b));legend();draw(+rg.value)}));
  legend();draw(+rg.value);

  /* ---------- 2. valproate in pregnancy: icon arrays ---------- */
  const pg=$('#stPg'),prg=$('#stPgT');let ds='2018';
  const order=[0,1,2,3].map(i=>{const r=rng(31+i*7),a=[...Array(100).keys()];for(let k=99;k>0;k--){const j=Math.floor(r()*(k+1));[a[k],a[j]]=[a[j],a[k]]}return a});
  function drawPg(t){
    const N=vb(pg,'720 340','400 640'),D=ST_PG[ds].d,p=phaseOf(ST_PGN,t);
    const show=Math.round(ramp(t,0,.25)*100);let s='';
    D.forEach(([nm,v],i)=>{
      const px=N?12+(i%2)*196:14+i*176,py=N?(i<2?16:296):16,cnt=Math.round(v);
      const hi=i===0?ramp(t,.3,.48):ramp(t,.54+(i-1)*.08,.62+(i-1)*.08),k=Math.round(hi*cnt);
      const lit=new Set(order[i].slice(0,k));
      s+=`<rect x="${px}" y="${py}" width="${N?184:166}" height="${N?268:262}" rx="12" style="fill:${i===0?'var(--bad-soft)':'var(--field)'};stroke:var(--line);opacity:${i===0?.55:1}"/>`;
      s+=`<text x="${px+10}" y="${py+22}" class="t-lbl">${nm}</text>`;
      for(let j=0;j<show;j++){const gx=px+(N?18:10)+(j%10)*15,gy=py+32+Math.floor(j/10)*16;
        s+=person(gx,gy,12,lit.has(j)?'var(--bad)':'var(--muted)',{op:lit.has(j)?1:.32})}
      const shown=hi>0?(v*hi).toFixed(1):'–';
      s+=`<text x="${px+10}" y="${py+222}" style="font:800 24px var(--display);fill:${i===0?'var(--bad)':'var(--ink)'}">${hi>0?shown+'%':''}</text>`;
      s+=`<text x="${px+10}" y="${py+242}" class="t-xs">${hi>=1?'about '+cnt+' in 100 babies':'major malformation at 1 year'}</text>`;
      s+=`<text x="${px+10}" y="${py+256}" class="t-xs">${ST_PG[ds].src}</text>`});
    const fo=ramp(t,.86,.95);
    if(fo>0){const y0=N?590:300,x0=N?12:14;
      s+=`<g style="opacity:${f1(fo)}"><text x="${x0}" y="${y0}" class="t-sm" style="fill:var(--bad)">Spina bifida (US label): about 1–2% after valproate</text><text x="${x0}" y="${y0+16}" class="t-sm">vs about 0.06–0.07% in the general population</text></g>`}
    pg.innerHTML=s;
    $('#stPgNote').innerHTML=noteHTML(ST_PGN[p]);
  }
  playWire(prg,$('#stPgPlay'),drawPg,11000,'%t:player.replay%','stabilisers');
  $$('[data-stpg]').forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.stpg;$$('[data-stpg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPg(+prg.value)}));
  drawPg(+prg.value);

  /* ---------- 3. comparator ---------- */
  const cs=$('#stCmpSvg');let dr='vpa';
  const COL={good:['var(--good)','var(--good-soft)'],warn:['var(--warn)','var(--warn-soft)'],bad:['var(--bad)','var(--bad-soft)'],na:['var(--muted)','var(--panel-2)']};
  function drawCmp(){
    const N=vb(cs,'720 150','400 330'),C=ST_CMP[dr],PH=['Acute mania','Acute bipolar depression','Maintenance'];let s='';
    s+=`<text x="12" y="20" class="t-lbl" style="fill:var(--rx)">${C.n}</text>`;
    C.ph.forEach(([v,c,sub],i)=>{const [fg,bg]=COL[c],x=N?12:12+i*236,y=N?32+i*98:34,w=N?376:224,h=N?88:104;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:${bg};stroke:${fg};stroke-width:1.4"/>`;
      s+=`<text x="${x+14}" y="${y+22}" class="t-sm">${PH[i].toUpperCase()}</text>`;
      s+=`<text x="${x+14}" y="${y+50}" style="font:800 20px var(--display);fill:${fg}">${v}</text>`;
      s+=`<text x="${x+14}" y="${y+72}" class="t-xs">${sub}</text>`});
    cs.innerHTML=s;
    $('#stCmp').innerHTML=C.cards.map(([h,tx])=>`<div class="card"><p class="kicker">${C.n}</p><h4>${h}</h4><p>${tx}</p></div>`).join('');
  }
  $$('[data-stdrug]').forEach(b=>b.addEventListener('click',()=>{dr=b.dataset.stdrug;$$('[data-stdrug]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCmp()}));
  drawCmp();
  redraws.stabilisers=(prevR=>()=>{prevR&&prevR();drawCmp()})(redraws.stabilisers);
};
