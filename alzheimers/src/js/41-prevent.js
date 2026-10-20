/* =============== 4.1 prevent: lowering the risk =============== */
const PV_CAVEAT=`The Commission states that it "assumed risk factors cause dementia" and that some associations may be only partly causal. [[Livingston2024]]`;
const PV_F=[
 {n:'Less education',g:0,p:5,ev:'Association',
  txt:`Less education in early life accounts for about 5% in the model. In Framingham, the 44% fall in dementia incidence over three decades was seen only among people with at least a high-school diploma. [[Livingston2024,Satizabal2016]]`},
 {n:'Hearing impairment',g:1,p:7,ev:'Mixed trial evidence',
  txt:`Joint largest factor, about 7%. In the ACHIEVE trial, hearing aids with counselling did not change 3-year cognitive decline overall (difference 0.002 SD); in the higher-risk ARIC subgroup, decline slowed by 0.19 SD. WHO 2019 made no recommendation on hearing because intervention evidence was insufficient. [[Livingston2024,Lin2023,Chowdhary2021]]`},
 {n:'High LDL cholesterol',g:1,p:7,ev:'New in 2024',
  txt:`New in 2024 and joint largest, about 7%. In a UK cohort of 1,853,954 people, higher LDL was linked to dementia (RR 1.05 per SD), more strongly under 65. Statin use was linked to lower risk in 36 cohorts (OR 0.80, with very high heterogeneity, I² 97.5%), but a Cochrane review of late-life statin trials found no effect on dementia. No worldwide LDL prevalence estimate existed, so one cohort was used. [[Livingston2024]]`},
 {n:'Depression',g:1,p:3,ev:'Association',
  txt:`About 3%. WHO 2019 made no recommendation on treating depression to reduce dementia risk because the evidence was insufficient. [[Livingston2024,Chowdhary2021]]`},
 {n:'Traumatic brain injury',g:1,p:3,ev:'Association',
  txt:`About 3% in the model. This app's research summary has no intervention trial results for this factor. [[Livingston2024]]`},
 {n:'Physical inactivity',g:1,p:2,ev:'Reverse causation',
  txt:`About 2%. In an analysis of 404,840 people, inactivity measured less than 10 years before diagnosis was linked to dementia (HR 1.40), but measured 10 or more years before, it was not (HR 1.01, 95% CI 0.89 to 1.14). Part of the link may be early disease making people less active, not the other way round. The LIFE exercise trial found no difference in MCI or dementia (OR 1.08). WHO still recommends activity for adults with normal cognition (strong, moderate quality). [[Kivimaki2019,Sink2015,Chowdhary2021,Livingston2024]]`},
 {n:'Diabetes',g:1,p:2,ev:'Association',
  txt:`About 2%. WHO 2019: manage diabetes according to existing WHO guidelines (strong); doing so specifically to reduce dementia risk is conditional, with very-low-quality evidence for dementia outcomes. [[Livingston2024,Chowdhary2021]]`},
 {n:'Smoking',g:1,p:2,ev:'Association',
  txt:`About 2%. WHO 2019 strongly recommends stopping smoking, while grading the evidence for cognitive outcomes as low quality. [[Livingston2024,Chowdhary2021]]`},
 {n:'Hypertension',g:1,p:2,ev:'Trial evidence',
  txt:`About 2%. In SPRINT MIND, intensive blood pressure control did not significantly reduce probable dementia (HR 0.83, 95% CI 0.67 to 1.04) but did reduce MCI (HR 0.81). Across 12 trials of 92,135 people, lowering blood pressure was linked to less dementia or cognitive impairment: 7.0% vs 7.5% (OR 0.93), an absolute reduction of 0.39%. [[Livingston2024,Williamson2019,Hughes2020]]`},
 {n:'Obesity',g:1,p:1,ev:'Association',
  txt:`About 1%. WHO 2019 gives a conditional recommendation for midlife overweight and obesity interventions (low to moderate quality). [[Livingston2024,Chowdhary2021]]`},
 {n:'Excessive alcohol',g:1,p:1,ev:'Association',
  txt:`About 1%. WHO 2019: interventions to reduce hazardous drinking, conditional, moderate-quality observational evidence. The HUNT cohort used for overlap between factors had lower alcohol misuse than worldwide figures. [[Livingston2024,Chowdhary2021]]`},
 {n:'Social isolation',g:2,p:5,ev:'Association',
  txt:`About 5% in late life. WHO 2019 made no recommendation on social activity because intervention evidence was insufficient. [[Livingston2024,Chowdhary2021]]`},
 {n:'Air pollution',g:2,p:3,ev:'Association',
  txt:`About 3%. The Commission notes that no meta-analysis was possible for air pollution. [[Livingston2024]]`},
 {n:'Untreated vision loss',g:2,p:2,ev:'New in 2024',
  txt:`New in 2024, about 2%. A meta-analysis of 14 cohorts (6,204,827 older adults) linked vision impairment with dementia (pooled RR 1.47, 95% CI 1.36 to 1.60). The Commission puts avoidable vision impairment at 12.6% of adults aged 50 or over. [[Livingston2024]]`}
];
const PV_G=[ ['Early life','var(--violet)'],['Midlife','var(--sky)'],['Late life','var(--sage)'] ];
const PV_STEPS=[
 {from:0,at:.12,k:'Step 1 · Early life',t:'Education: about 5%',
  txt:`The 2024 Lancet Commission groups its 14 factors by when in life they act. Early life has one: less education, about 5%. Each percentage is a population attributable fraction (PAF): the share of cases that could theoretically be prevented or delayed if that risk were eliminated. [[Livingston2024]]`,
  pt:`The wheel is all dementia cases in the world. Each coloured slice is the share the Commission links to one changeable risk.`},
 {from:.18,at:.5,k:'Step 2 · Midlife',t:'Ten midlife factors: about 30%',
  txt:`Midlife carries ten factors. Hearing impairment and high LDL cholesterol (about 7% each) are the largest single contributors. High LDL is new in 2024, along with untreated vision loss. [[Livingston2024]]`,
  pt:`Most of the changeable risk sits in middle age, led by hearing loss and high "bad" cholesterol.`,
  hook:`Lancet 2024: 14 factors, 45%. Largest: hearing loss and high LDL, about 7% each. New in 2024: LDL and untreated vision loss.`},
 {from:.56,at:.72,k:'Step 3 · Late life',t:'Three late-life factors: about 10%',
  txt:`Late life adds social isolation (about 5%), air pollution (about 3%) and untreated vision loss (about 2%). [[Livingston2024]]`,
  pt:`In later life, loneliness, polluted air and poor eyesight that has not been corrected add the rest.`},
 {from:.78,at:.87,k:'Step 4 · The total',t:'45%: a modelled upper bound',
  txt:`Together the 14 factors account for about 45% of dementia worldwide (weighted PAF 45.3%). The fractions were weighted for overlap ("communality"), estimated in about 37,000 people from Norway's HUNT study, where five components explained 54% of the variance between factors. The figure assumes every risk is removed completely; it is not what any intervention has achieved. [[Livingston2024]]`,
  pt:`Nearly half of dementia is linked to these risks in the model. That is a ceiling, not a promise: no programme removes every risk.`,
  hook:`45% is a theoretical maximum from a model, not a trial result.`},
 {from:.92,at:.97,k:'Step 5 · Caveats',t:'Causation was assumed',
  txt:`The Commission "assumed risk factors cause dementia" and says some links may be only partly causal. Its stated limits include prevalence data skewed to high-income countries, one cohort for LDL, overlap estimated in one Norwegian cohort with little ethnic diversity, and no meta-analysis for air pollution. Reverse causation matters too: physical inactivity predicted dementia only when measured within 10 years of diagnosis. [[Livingston2024,Kivimaki2019]]`,
  pt:`Some of these links may partly run backwards: early disease can make people less active or more isolated years before diagnosis.`}
];
const PV_TR=[
 {from:0,at:.12,k:'Step 1 · Multidomain',t:'Lifestyle packages: small or null',
  txt:`FINGER (1,260 at-risk people, 2 years) improved a cognitive test score slightly more than general health advice: 0.022 z-score units a year (95% CI 0.002 to 0.042); both groups improved. US POINTER (2,111 people) compared a structured with a self-guided programme, with no untreated control: 0.029 SD a year in favour of structured. preDIVA (3,526 people, 6 years of nurse-led vascular care) did not reduce dementia: 7% vs 7%, HR 0.92. [[Ngandu2015,Baker2025POINTER,MollvanCharante2016]]`,
  pt:`Big lifestyle programmes nudged thinking-test scores up a little. None has yet shown fewer people getting dementia.`},
 {from:.22,at:.34,k:'Step 2 · Blood pressure',t:'SPRINT MIND: MCI yes, dementia unclear',
  txt:`SPRINT MIND (9,361 people) targeted systolic pressure below 120 versus below 140. Probable dementia: 7.2 vs 8.6 per 1,000 person-years, HR 0.83 (0.67 to 1.04), not significant; the trial stopped early and may have been underpowered. MCI: HR 0.81 (0.69 to 0.95), significant. [[Williamson2019]]`,
  pt:`Tighter blood pressure control reduced mild cognitive impairment. Its effect on dementia itself was not statistically clear.`,
  hook:`SPRINT MIND: intensive BP control reduced MCI (HR 0.81), not significantly dementia (HR 0.83).`},
 {from:.42,at:.53,k:'Step 3 · Hearing',t:'ACHIEVE: null overall, a subgroup signal',
  txt:`ACHIEVE (977 adults aged 70 to 84 with untreated hearing loss) found no overall difference in 3-year cognitive change (0.002 SD, 95% CI −0.077 to 0.081). In the 238 higher-risk ARIC participants, decline slowed by 0.19 SD (0.02 to 0.36), which the Commission describes as about 48% less decline. A subgroup result supports a hypothesis; it does not settle it. [[Lin2023,Livingston2024]]`,
  pt:`Hearing aids did not change memory decline for the whole group. They seemed to help a higher-risk subgroup, which needs confirming.`},
 {from:.6,at:.7,k:'Step 4 · Exercise and diet',t:'LIFE and MIND: null',
  txt:`LIFE (1,635 sedentary adults, 2 years of moderate activity) found no difference: MCI or dementia 13.2% vs 12.1%, OR 1.08 (0.80 to 1.46). The MIND diet trial (604 people, 3 years) found no significant difference in global cognition: 0.035 (−0.022 to 0.092); both groups improved. [[Sink2015,Barnes2023]]`,
  pt:`An exercise programme and a brain-healthy diet did not change thinking scores more than the comparison groups did.`},
 {from:.78,at:.86,k:'Step 5 · Cognitive training',t:'ACTIVE: one borderline signal',
  txt:`In ACTIVE (2,832 healthy older adults), only speed-of-processing training was linked to lower 10-year dementia risk: HR 0.71 (0.50 to 0.998), P = .049, borderline. At 20 years, lower diagnosed dementia appeared only in speed-trained people who attended boosters (HR 0.75), a self-selected subgroup using claims-based diagnoses. [[Rebok2014,Edwards2017,Coe2026]]`,
  pt:`One type of computer speed training was linked to slightly less dementia years later, but only just, and the later finding is in a self-selected group.`},
 {from:.92,at:.97,k:'Step 6 · Reading it honestly',t:'Mostly null or small',
  txt:`Of the ten results here, one clearly reduced a diagnosis (SPRINT MIND, for MCI), one was borderline (ACTIVE speed training), two showed small cognitive-score benefits (FINGER, US POINTER), one is a subgroup signal (ACHIEVE, ARIC participants), and five are null. Trials are short compared with the decades over which dementia develops, which is one reason prevention is hard to prove. [[Williamson2019,Edwards2017,Ngandu2015,Baker2025POINTER]]`,
  pt:`The risk factors are real associations, but trials that change them have mostly shown small or no effects so far.`,
  hook:`Prevention trials: FINGER and POINTER small positive; SPRINT MIND MCI positive; ACHIEVE, MIND diet, LIFE, preDIVA null overall.`}
];
inits.prevent=()=>{
  /* ---------- 1. the 14-factor wheel ---------- */
  const svg=$('#pvSvg'),rg=$('#pvT');let sel=-1;
  /* timing: each factor sweeps in during its life-stage window, in proportion to its share */
  const WIN=[ [.02,.12],[.2,.5],[.58,.72] ];
  const tim=PV_F.map((f,i)=>{const grp=PV_F.filter(x=>x.g===f.g),tot=grp.reduce((a,x)=>a+x.p,0);let before=0;for(const x of grp){if(x===f)break;before+=x.p}
    const [a,b]=WIN[f.g];return [a+(b-a)*before/tot,a+(b-a)*(before+f.p)/tot]});
  let cum=0;const ang=PV_F.map(f=>{const a0=cum/100*360;cum+=f.p;return [a0,cum/100*360]});
  const pol=(cx,cy,r,deg)=>{const a=(deg-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]};
  function arc(cx,cy,r0,r1,d0,d1){if(d1-d0<.05)return '';const [x0,y0]=pol(cx,cy,r1,d0),[x1,y1]=pol(cx,cy,r1,d1),[x2,y2]=pol(cx,cy,r0,d1),[x3,y3]=pol(cx,cy,r0,d0),lg=d1-d0>180?1:0;
    return `M${f1(x0)} ${f1(y0)} A${r1} ${r1} 0 ${lg} 1 ${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)} A${r0} ${r0} 0 ${lg} 0 ${f1(x3)} ${f1(y3)} Z`}
  function draw(t){
    const N=vb(svg,'720 420','400 770');
    const L=N?{cx:200,cy:192,r:140,list:{x0:20,x1:380,y:384,rh:22,bar:214,bs:16}}:{cx:190,cy:212,r:150,list:{x0:410,x1:708,y:30,rh:22.4,bar:600,bs:12}};
    const r0=L.r*.6;let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* whole-of-dementia ring */
    const rest=ramp(t,.78,.86);
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${f1((L.r+r0)/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(L.r-r0)}"/>`;
    if(rest>0){s+=`<path d="${arc(L.cx,L.cy,r0,L.r,162.6,162.6+(359.4-162.6)*rest)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4;opacity:.8"/>`;
      const [lx,ly]=pol(L.cx,L.cy,(L.r+r0)/2,262);s+=`<text x="${f1(lx)}" y="${f1(ly-4)}" class="t-xs t-mid" style="opacity:${f1(rest)}">55%: other or</text><text x="${f1(lx)}" y="${f1(ly+8)}" class="t-xs t-mid" style="opacity:${f1(rest)}">unknown causes</text>`}
    let total=0;
    PV_F.forEach((f,i)=>{const [ta,tb]=tim[i],pr=ramp(t,ta,tb);if(pr<=0)return;total+=f.p*pr;
      const [d0,d1]=ang[i],on=sel===i,pop=on?8:0,shade=(i%2)?.72:1;
      s+=`<path data-k="${i}" class="clk" d="${arc(L.cx,L.cy,r0,L.r+pop,d0+.3,d0+.3+(d1-d0-.6)*pr)}" style="fill:${PV_G[f.g][1]};opacity:${on?1:shade};stroke:${on?'var(--ink)':'none'};stroke-width:2"><title>${f.n}: about ${f.p}%</title></path>`});
    /* stage labels outside the ring */
    [ [9,'early life',0],[72,'midlife',1],[144,'late life',2]].forEach(([d,l,g])=>{const o=ramp(t,WIN[g][0],WIN[g][0]+.04);if(o<=0)return;const [x,y]=pol(L.cx,L.cy,L.r+13,d);
      s+=`<text x="${f1(x)}" y="${f1(y+4)}" class="t-xs ${d>100?'':''}" style="fill:${PV_G[g][1]};font-weight:700;opacity:${f1(o)}">${l}</text>`});
    /* centre counter */
    const caveat=ramp(t,.92,.96);
    s+=`<text x="${L.cx}" y="${L.cy+4}" class="t-mid" style="font:800 ${N?40:44}px var(--display);fill:var(--ink)">${Math.round(total)}%</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+24}" class="t-xs t-mid">of dementia cases</text><text x="${L.cx}" y="${L.cy+36}" class="t-xs t-mid">worldwide, modelled</text>`;
    if(caveat>0)s+=`<text x="${L.cx}" y="${L.cy-36}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700;opacity:${f1(caveat)}">if causal</text>`;
    /* the list */
    const Lt=L.list;let y=Lt.y;
    PV_G.forEach(([gn,gc],g)=>{const grpO=ramp(t,WIN[g][0],WIN[g][0]+.03);
      s+=`<g style="opacity:${f1(.25+.75*grpO)}"><rect x="${Lt.x0}" y="${f1(y-9)}" width="10" height="10" rx="2" style="fill:${gc}"/><text x="${Lt.x0+16}" y="${f1(y)}" class="t-sm" style="fill:${gc};font-weight:700">${gn.toUpperCase()} · ${PV_F.filter(f=>f.g===g).reduce((a,f)=>a+f.p,0)}%</text></g>`;y+=Lt.rh;
      PV_F.forEach((f,i)=>{if(f.g!==g)return;const pr=ramp(t,tim[i][0],tim[i][1]),on=sel===i;
        s+=`<g data-k="${i}" class="clk" style="opacity:${f1(.3+.7*Math.min(1,pr*3))}">`;
        s+=`<rect x="${Lt.x0-4}" y="${f1(y-14)}" width="${Lt.x1-Lt.x0+8}" height="${f1(Lt.rh-2)}" rx="5" style="fill:${on?'var(--panel-2)':'transparent'};stroke:${on?'var(--ink)':'none'}"/>`;
        s+=`<text x="${Lt.x0+16}" y="${f1(y)}" class="t-lbl" style="font-weight:${on?800:600}">${f.n}</text>`;
        s+=`<rect x="${Lt.bar}" y="${f1(y-9)}" width="${f1(Math.max(1,f.p*Lt.bs*pr))}" height="9" rx="3" style="fill:${gc};opacity:${(i%2)?.72:1}"/>`;
        s+=`<text x="${Lt.x1}" y="${f1(y)}" class="t-sm t-end" style="fill:var(--ink)">${f.p}%</text></g>`;y+=Lt.rh});
    });
    svg.innerHTML=s;
    const p=phaseOf(PV_STEPS,t);setSt(p);$('#pvNote').innerHTML=noteHTML(PV_STEPS[p]);
  }
  function showFx(){
    const fx=$('#pvFx');
    if(sel<0){fx.innerHTML=`<div class="kicker">Pick a factor</div><h4>The evidence behind each slice</h4><p>Choose a risk factor from the wheel, the list or the buttons above to see what the Commission and the trials say about it.</p><div class="callout">${PV_CAVEAT}</div>`;return}
    const f=PV_F[sel],cls='tag';
    fx.innerHTML=`<div class="kicker">${PV_G[f.g][0]} · about ${f.p}% of cases in the model</div><h4>${f.n}</h4><p><span class="${cls}">${f.ev}</span></p><p>${f.txt}</p><div class="callout"><b>Caveat.</b> ${PV_CAVEAT}${f.n==='Physical inactivity'?' <b>Reverse causation:</b> measured 10 or more years before diagnosis, inactivity was not linked to dementia (HR 1.01), which suggests part of the link reflects early disease. [[Kivimaki2019]]':''}</div>`;
  }
  function select(i){sel=sel===i?-1:i;$$('#pvBtns [data-pvf]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pvf===sel));draw(+rg.value);showFx()}
  $('#pvBtns').innerHTML='<span class="kicker">Evidence for</span>'+PV_F.map((f,i)=>`<button class="btn" data-pvf="${i}" aria-pressed="false">${f.n} · ${f.p}%</button>`).join('');
  $('#pvBtns').addEventListener('click',e=>{const b=e.target.closest('[data-pvf]');if(b)select(+b.dataset.pvf)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-k]');if(g)select(+g.dataset.k)});
  const stop=playWire(rg,$('#pvPlay'),draw,14000,'Replay','prevent');
  const setSt=stepWire($('#pvSteps'),PV_STEPS,rg,draw,stop);

  /* ---------- 2. trials forest plot ---------- */
  const tr=$('#pvTr'),trg=$('#pvTrT');
  const RAT=[
   {n:'preDIVA',d:'vascular care, 6 y · dementia HR',e:.92,lo:.71,hi:1.19,s:.06,v:'no clear effect',c:'var(--muted)'},
   {n:'SPRINT MIND',d:'intensive BP · dementia HR',e:.83,lo:.67,hi:1.04,s:.22,v:'not significant',c:'var(--muted)'},
   {n:'SPRINT MIND',d:'intensive BP · MCI HR',e:.81,lo:.69,hi:.95,s:.28,v:'fewer MCI cases',c:'var(--sky)'},
   {n:'LIFE',d:'exercise, 2 y · MCI or dementia OR',e:1.08,lo:.8,hi:1.46,s:.6,v:'no clear effect',c:'var(--muted)'},
   {n:'ACTIVE',d:'speed training, 10 y · dementia HR',e:.71,lo:.5,hi:.998,s:.78,v:'borderline',c:'var(--warn)'}
  ];
  const DIF=[
   {n:'FINGER',d:'multidomain · test score, per year',e:.022,lo:.002,hi:.042,s:.02,v:'small benefit',c:'var(--sky)'},
   {n:'US POINTER',d:'structured vs self-guided · per year',e:.029,lo:.008,hi:.05,s:.12,v:'small benefit',c:'var(--sky)'},
   {n:'ACHIEVE',d:'hearing · all, 3-year change',e:.002,lo:-.077,hi:.081,s:.42,v:'no clear effect',c:'var(--muted)'},
   {n:'ACHIEVE',d:'hearing · ARIC subgroup',e:.19,lo:.02,hi:.36,s:.48,v:'subgroup only',c:'var(--warn)'},
   {n:'MIND diet',d:'diet, 3 y · global cognition',e:.035,lo:-.022,hi:.092,s:.66,v:'no clear effect',c:'var(--muted)'}
  ];
  function drawTr(t){
    const N=vb(tr,'720 520','400 750');
    const P=N?{x0:24,x1:376,lab:20}:{x0:270,x1:560,lab:20};
    const lgX=v=>P.x0+(P.x1-P.x0)*Math.log(v/.4)/Math.log(4),liX=v=>P.x0+(P.x1-P.x0)*(v+.1)/.5;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    function block(rows,top,title,X,ticks,nullV,dir){
      const rh=N?58:34;
      s+=`<text x="${P.lab}" y="${top}" class="t-sm">${title}</text>`;
      const yA=top+14,yB=top+14+rows.length*rh+(N?6:4);
      ticks.forEach(v=>{s+=(N?'':`<path d="M${f1(X(v))} ${yA} V${yB}" class="grid"/>`)+`<text x="${f1(X(v))}" y="${yB+14}" class="t-xs t-mid">${v}</text>`});
      if(N){rows.forEach((r,i)=>{const py=yA+i*rh+36;ticks.forEach(v=>{s+=`<path d="M${f1(X(v))} ${py-5} V${py+5}" class="grid"/>`});s+=`<path d="M${f1(X(nullV))} ${py-7} V${py+9}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3"/>`});
        s+=`<path d="M${f1(X(nullV))} ${yB-6} V${yB+2}" style="stroke:var(--ink);stroke-width:1.4"/>`}
      else s+=`<path d="M${f1(X(nullV))} ${yA-4} V${yB+2}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`;
      s+=`<text x="${f1(X(nullV)+(dir<0?-6:6))}" y="${yB+30}" class="t-xs ${dir<0?'t-end':''}" style="fill:var(--ink)">${dir<0?'← fewer cases':'better →'}</text>`;
      rows.forEach((r,i)=>{const p=ease(ramp(t,r.s,r.s+.08)),o=ramp(t,r.s-.01,r.s+.02),yb=yA+i*rh;
        const py=N?yb+36:yb+16;
        s+=`<g style="opacity:${f1(.18+.82*o)}">`;
        if(N){s+=`<text x="${P.lab}" y="${yb+12}" class="t-lbl">${r.n}</text><text x="380" y="${yb+12}" class="t-xs t-end" style="fill:${o>0?r.c:'var(--muted)'};font-weight:700">${p>.9?r.v:''}</text><text x="${P.lab}" y="${yb+25}" class="t-xs">${r.d}</text>`}
        else{s+=`<text x="${P.lab}" y="${py-2}" class="t-lbl">${r.n}</text><text x="${P.lab}" y="${py+10}" class="t-xs">${r.d}</text>`;if(p>.9)s+=`<text x="580" y="${py+4}" class="t-xs" style="fill:${r.c};font-weight:700">${r.v}</text>`}
        if(p>0){const e=lerp(nullV,r.e,p),lo=lerp(nullV,r.lo,p),hi=lerp(nullV,r.hi,p);
          s+=`<path d="M${f1(X(lo))} ${py} H${f1(X(hi))} M${f1(X(lo))} ${py-4} v8 M${f1(X(hi))} ${py-4} v8" style="stroke:${r.c};stroke-width:2.2"/>`;
          s+=`<rect x="${f1(X(e)-5)}" y="${py-5}" width="10" height="10" transform="rotate(45 ${f1(X(e))} ${py})" style="fill:${r.c};stroke:var(--panel);stroke-width:1"/>`;
          if(p>.9){const lab=(dir<0?r.e:(r.e>=0?'+':'')+r.e);s+=`<text x="${f1(Math.max(X(r.hi),X(nullV))+6)}" y="${py+4}" class="t-xs" style="fill:var(--ink)">${lab}</text>`}}
        s+='</g>'});
      return yB+44}
    const yNext=block(RAT,N?24:26,N?'RATIOS: BELOW 1 = FEWER CASES':'HAZARD / ODDS RATIO FOR DEMENTIA OR MCI (BELOW 1 = FEWER CASES)',lgX,[.4,.5,.7,1,1.4],1,-1);
    block(DIF,yNext+(N?12:6),N?'COGNITIVE CHANGE: ABOVE 0 = BETTER':'DIFFERENCE IN COGNITIVE CHANGE, SD OR Z UNITS (ABOVE 0 = BETTER)',liX,[-.1,0,.1,.2,.3,.4],0,1);
    tr.innerHTML=s;
    const p=phaseOf(PV_TR,t);setTr(p);$('#pvTrNote').innerHTML=noteHTML(PV_TR[p]);
  }
  const stopTr=playWire(trg,$('#pvTrPlay'),drawTr,15000,'Replay','prevent');
  const setTr=stepWire($('#pvTrSteps'),PV_TR,trg,drawTr,stopTr);

  /* ---------- 3. cards ---------- */
  const rd=`<svg viewBox="0 0 300 120" role="img" aria-label="Regression discontinuity: shingles vaccine uptake in Wales jumps from almost zero to 47.2 percent at the birth-date cutoff of 2 September 1933."><rect width="300" height="120" rx="8" style="fill:var(--field)"/><path d="M30 96 H284 M30 14 V96" class="axis" style="fill:none"/><path d="M150 10 V100" style="stroke:var(--warn);stroke-dasharray:4 3"/><path d="M34 95 H150" style="stroke:var(--muted);stroke-width:3"/><path d="M150 57 H280" style="stroke:var(--sky);stroke-width:3"/><text x="146" y="22" class="t-xs t-end" style="fill:var(--warn)">born 2 Sep 1933</text><text x="40" y="88" class="t-xs">0.01% vaccinated</text><text x="156" y="44" class="t-xs" style="fill:var(--sky)">47.2% vaccinated</text><text x="156" y="112" class="t-xs">eligible →</text><text x="34" y="112" class="t-xs">← not eligible</text></svg>`;
  const fr=`<svg viewBox="0 0 300 120" role="img" aria-label="Framingham dementia incidence fell from 3.6 to 2.0 per 100 people over 5 years between the late 1970s and the late 2000s."><rect width="300" height="120" rx="8" style="fill:var(--field)"/><rect x="40" y="24" width="70" height="72" rx="4" style="fill:var(--rose)"/><rect x="170" y="56" width="70" height="40" rx="4" style="fill:var(--sage)"/><path d="M24 96 H276" class="axis" style="fill:none"/><text x="75" y="18" class="t-lbl t-mid">3.6</text><text x="205" y="50" class="t-lbl t-mid">2.0</text><text x="75" y="110" class="t-xs t-mid">late 1970s</text><text x="205" y="110" class="t-xs t-mid">late 2000s</text><text x="140" y="70" class="t-xs t-mid" style="fill:var(--good)">−44%</text></svg>`;
  $('#pvCards').innerHTML=`
   <div class="card"><span class="ev early">Early evidence</span><h4>Shingles vaccine: natural experiments</h4>${rd}<p>In Wales, eligibility for the live shingles vaccine depended on birth date. Comparing people just either side, vaccination cut new dementia diagnoses over 7 years by 3.5 percentage points (95% CI 0.6 to 7.1), a 20% relative reduction. Similar designs found that eligibility cut new diagnoses by 1.8 points in Australia (over 7.4 years) and 2.0 in Canada (over 5.5 years). Follow-up Welsh analyses report fewer MCI diagnoses too. [[Eyting2025,Pomirchy2025,Pomirchy2026,Xie2025]]</p><p>These quasi-experiments are less prone to confounding than ordinary cohorts, but no randomised trial has tested the vaccine for dementia prevention, and a records study of the newer recombinant vaccine is observational. The Commission notes vaccine links "may be partly due to confounding". [[Taquet2024,Eyting2025,Livingston2024]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Age-specific risk is falling</h4>${fr}<p>In Framingham, 5-year dementia incidence (per 100 people aged 60 and over, age- and sex-adjusted) fell 44% across three decades, only among people with at least a high-school diploma. Pooled cohorts in the US and Europe show a 13% fall per decade between 1988 and 2015, steeper in men (24%) than women (8%). [[Satizabal2016,Wolters2020]]</p><p>The number of people with dementia keeps rising because populations are ageing. The Commission links part of the fall to less vascular disease. [[Livingston2024]]</p></div>
   <div class="card"><span class="tag warn">Disagreement</span><h4>WHO 2019 versus the Lancet Commission</h4><p>WHO made no recommendation on hearing loss, depression or social activity because intervention evidence was insufficient. The Commission later rated the evidence for hearing and LDL as stronger, and puts them at the top of its list. That is a real difference in how the two bodies weigh evidence, not a typo in either. [[Chowdhary2021,Livingston2024]]</p><div class="hook"><b>Exam hook</b>WHO 2019 strongly recommends against vitamin B, E, PUFA and multi-complex supplements to reduce dementia risk. [[Chowdhary2021]]</div></div>
   <div class="card"><h4>The short version</h4><div class="pt"><b>In plain words</b>Many things linked to dementia, such as hearing loss, high cholesterol, high blood pressure, smoking and loneliness, are also worth addressing for general health. Trials that changed one of them have mostly shown small or no effects on dementia so far. Nothing has been proven to prevent Alzheimer's.</div></div>`;
  draw(+rg.value);showFx();drawTr(+trg.value);
};
