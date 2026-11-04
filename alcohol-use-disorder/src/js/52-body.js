/* =============== 5.2 Alcohol and the whole body: cancer, heart, brain =============== */
const BD_STEPS=[
 {from:0,at:0,k:'0 g a day',t:'No alcohol',
  txt:`Across all health outcomes together, the Global Burden of Disease 2016 study found that the level of drinking that minimised harm was zero (95% UI 0.0–0.8) standard drinks a week, with a standard drink defined as 10 g of alcohol. Alcohol was the leading risk factor for death and disability at ages 15–49. [[GBD2016Alcohol]]`,
  pt:`Research does not support drinking alcohol to improve your health.`,
  hook:`GBD 2016: harm minimised at zero drinks a week. [[GBD2016Alcohol]]`},
 {from:.02,at:.08,k:'Light · up to 12.5 g a day',t:'Light drinking',
  txt:`Even in the light band (up to 12.5 g a day, about one 10 g standard drink), cancer risks are above those of non-drinkers: breast 1.04 (95% CI 1.01–1.07), mouth and pharynx 1.13, oesophageal squamous cell 1.26. [[Bagnardi2015BJC]] Drinking up to 10 g a day accounted for an estimated 41,300 cancers worldwide in 2020. [[Rumgay2021LancetOncol]]`,
  pt:`Alcohol causes at least seven kinds of cancer, including breast and bowel cancer, and the risk starts at low amounts.`,
  hook:`IARC Group 1. Seven sites: mouth, pharynx, larynx, oesophagus, liver, colorectum, female breast. [[Baan2007IARC,Bagnardi2015BJC]]`},
 {from:.135,at:.3,k:'Moderate · up to 50 g a day',t:'Moderate band',
  txt:`In 599,912 current drinkers, all-cause mortality was lowest at or below about 100 g a week (the dashed line), and each extra 100 g a week went with more stroke (HR 1.14), heart failure (1.09) and fatal hypertensive disease (1.24). [[Wood2018Lancet]] Atrial fibrillation risk rises about 8% per drink a day (12 g drinks); hypertension risk rises almost linearly. [[Larsson2014JACC,Cecchini2024Hypertension]]`,
  pt:`Risks to the heart and blood vessels climb steadily with each extra drink, not just at heavy amounts.`,
  hook:`Wood 2018: lowest all-cause mortality at ≤100 g a week in current drinkers; &gt;350 g a week ≈ 4–5 years less life expectancy at 40. [[Wood2018Lancet]]`},
 {from:.505,at:.62,k:'Heavy · over 50 g a day',t:'Heavy drinking',
  txt:`Above 50 g a day the cancer risks jump: mouth and pharynx 5.13, oesophagus 4.95, larynx 2.65, liver 2.07, breast 1.61, bowel 1.44. [[Bagnardi2015BJC]] Heavy drinking (more than 4 drinks a day) was linked with bleeding strokes: intracerebral haemorrhage RR 1.67, subarachnoid haemorrhage 1.82. [[Larsson2016BMCMed]] In the 2023 meta-analysis, 45–64 g a day meant all-cause RR 1.19 and 65 g or more RR 1.35. [[Zhao2023JAMANO]]`,
  pt:`At heavy amounts, the chance of mouth and throat cancer is about five times that of people who do not drink.`,
  hook:`Breast cancer risk rises about 7% per 10 g a day. [[Hamajima2002BJC]]`},
 {from:.8,at:.95,k:'Very heavy · 80–100 g a day',t:'Very heavy drinking',
  txt:`Chronic pancreatitis risk rises steadily, to RR 6.29 (95% CI 3.04–13.02) at 100 g a day. [[Samokhvalov2015EBioMed]] Alcohol-related cardiomyopathy is generally considered to need more than 80 g a day for over 5 years. [[Dominguez2024EHJ]] Alcohol use disorders were the strongest modifiable risk factor for dementia (adjusted HR about 3.3). [[Schwarzinger2018LPH]] Cutting down helps: halving intake from 6 or more drinks a day lowered blood pressure by 5.50/3.97 mm Hg. [[Roerecke2017LPH]]`,
  pt:`Very heavy drinking can harm the pancreas, the heart muscle and memory. Many of these harms improve when a person stops; get medical help to stop safely after long, heavy daily drinking.`,
  hook:`Alcohol use disorder: strongest modifiable dementia risk factor (HR ~3.3). [[Schwarzinger2018LPH]]`}
];
inits.body=()=>{
  const svg=$('#bdSvg'),rg=$('#bdT'),rd=$('#bdRead'),note=$('#bdNote');
  const band=g=>g<=0?-1:g<=12.5?0:g<=50?1:2,BN=['light','moderate','heavy'];
  const rrB=(g,a)=>{const b=band(g);return b<0?1:a[b]};
  const AFP=[1,1.08,1.17,1.26,1.36,1.47];
  const afRR=g=>{const d=g/12;if(d>=5)return 1.47;const i=Math.floor(d);return lerp(AFP[i],AFP[i+1],d-i)};
  const ROWS=[
   {n:'Mouth & throat cancer',o:'mouth',c:'can',f:g=>{const v=rrB(g,[1.13,1.83,5.13]);return [v,'RR '+v.toFixed(2)]}},
   {n:'Oesophageal cancer',o:'oeso',c:'can',f:g=>{const v=rrB(g,[1.26,2.23,4.95]);return [v,'RR '+v.toFixed(2)]}},
   {n:'Larynx cancer',o:'mouth',c:'can',f:g=>{const v=rrB(g,[null,1.44,2.65]);return v==null?[1,'not given']:[v,'RR '+v.toFixed(2)]}},
   {n:'Breast cancer',o:'breast',c:'can',f:g=>{const v=rrB(g,[1.04,1.23,1.61]);return [v,'RR '+v.toFixed(2)]}},
   {n:'Bowel cancer',o:'bowel',c:'can',f:g=>{const v=rrB(g,[null,1.17,1.44]);return v==null?[1,'not given']:[v,'RR '+v.toFixed(2)]}},
   {n:'Liver cancer',o:'liver',c:'can',f:g=>{const v=rrB(g,[null,null,2.07]);return v==null?[1,'not given']:[v,'RR '+v.toFixed(2)]}},
   {n:'Atrial fibrillation',o:'heart',c:'hrt',f:g=>g<=0?[1,'RR 1']:[afRR(g),'RR '+afRR(g).toFixed(2)+(g/12>=5?'+':'')]},
   {n:'High blood pressure',o:'heart',c:'hrt',f:g=>g<24?[1,'vs 12 g: —']:g<36?[1.11,'RR 1.11 vs 12 g']:g<48?[1.22,'RR 1.22 vs 12 g']:[1.33,'RR 1.33+ vs 12 g']},
   {n:'Cardiomyopathy',o:'heart',c:'hrt',f:g=>g>80?[2,'>80 g/d for >5 y']:[1,'—']},
   {n:'Chronic pancreatitis',o:'panc',c:'pan',f:g=>g>=95?[6.29,'RR 6.29 at 100 g']:g>0?[1+g/40,'rises with intake']:[1,'—']},
   {n:'Brain volume',o:'brain',c:'brn',f:g=>g>0?[1+Math.min(1.5,g/40),'lower with intake']:[1,'—']}
  ];
  const CC={can:'var(--glu-fill)',hrt:'var(--ember)',pan:'var(--eth-fill)',brn:'var(--dx)'};
  /* all-cause mortality RR vs lifetime non-drinkers (Zhao 2023), as steps over g/day */
  const ZH=[[0,1.3,.96,0],[1.3,24,.93,0],[24,44,1.05,0],[44,64,1.19,1],[64,100,1.35,1]];
  const zRR=g=>{if(g<=0)return 1;for(const z of ZH)if(g<=z[1])return z[2];return 1.35};
  const life=gw=>gw<=0?'—':gw<=100?'reference (>0–100 g)':gw<=200?'≈6 months less':gw<=350?'≈1–2 years less':'≈4–5 years less';
  function draw(t){
    const N=vb(svg,'720 380','400 600'),ph=phaseOf(BD_STEPS,t),g=t*100;setSt(ph);
    const L=N?{bx:70,by:16,bs:1.0,rx:150,ry:26,rh:21.5,rv:392,cx:56,cy:312,cw:320,ch:170,lx:56,ly:540}
             :{bx:112,by:20,bs:1.38,rx:240,ry:36,rh:26.5,rv:468,cx:512,cy:56,cw:190,ch:190,lx:500,ly:300};
    const hl={},col={};
    const vals=ROWS.map(r=>{const [v,txt]=r.f(g),gl=clamp((v-1)/1.6);if(!hl[r.o]||gl>hl[r.o]){hl[r.o]=gl;col[r.o]=CC[r.c]}return [v,txt,gl]});
    if(band(g)===2){hl.stomach=.12;col.stomach=CC.can}
    let s=bodymap(L.bx,L.by,L.bs,{hl,col}).svg;
    /* list of organs */
    s+=`<text x="${L.rx}" y="${L.ry-14}" class="t-sm">${band(g)<0?'NO ALCOHOL':'CANCER BAND: '+BN[band(g)].toUpperCase()}</text>`;
    ROWS.forEach((r,i)=>{const y=L.ry+i*L.rh+6,[v,txt,gl]=vals[i],on=gl>.02;
      if(i===6||i===9)s+=`<line x1="${L.rx}" x2="${L.rv}" y1="${f1(y-L.rh*.62)}" y2="${f1(y-L.rh*.62)}" class="grid"/>`;
      s+=`<circle cx="${L.rx+5}" cy="${f1(y-4)}" r="${f1(3+gl*3)}" style="fill:${CC[r.c]};opacity:${f1(on?.5+gl*.5:.25)}"/>`;
      s+=`<text x="${L.rx+16}" y="${f1(y)}" class="t-xs" style="${on?'fill:var(--ink)':''}">${r.n}</text>`;
      s+=`<text x="${L.rv}" y="${f1(y)}" class="t-xs t-end" style="${on?'fill:var(--ink);font-weight:700':''}">${txt}</text>`;
      /* leader from the body map organ to the row, only when lit */
      if(gl>.25&&!N){const o=bodymap(L.bx,L.by,L.bs,{}).at[r.o];s+=`<line x1="${f1(o[0])}" y1="${f1(o[1])}" x2="${L.rx-2}" y2="${f1(y-4)}" style="stroke:${CC[r.c]};stroke-width:.8;opacity:${f1(gl*.6)}"/>`}});
    /* all-cause curve */
    const X=v=>L.cx+L.cw*v/100,Y=v=>L.cy+L.ch-L.ch*(v-.8)/.65;
    s+=`<text x="${L.cx-30}" y="${L.cy-16}" class="t-sm">ALL-CAUSE MORTALITY, RR</text>`;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="${L.ch}" style="fill:var(--field)"/>`;
    [.9,1,1.2,1.4].forEach(v=>s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===1?'axis':'grid'}"/><text x="${L.cx-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`);
    [0,25,50,75,100].forEach(v=>s+=`<text x="${f1(X(v))}" y="${L.cy+L.ch+13}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.cx+L.cw}" y="${L.cy+L.ch+26}" class="t-xs t-end">g a day</text>`;
    const wx=X(100/7);s+=`<line x1="${f1(wx)}" x2="${f1(wx)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--brand);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${f1(wx+4)}" y="${L.cy+11}" class="t-xs" style="fill:var(--brand)">100 g/week</text>`;
    s+=`<circle cx="${f1(X(0))}" cy="${f1(Y(1))}" r="3.5" style="fill:var(--muted)"/>`;
    let d='';ZH.forEach(([a,b,v])=>{if(g<=a)return;const e=Math.min(g,b);d+=`M${f1(X(a))} ${f1(Y(v))}H${f1(X(e))}`});
    if(d)s+=`<path d="${d}" style="stroke:var(--glu);stroke-width:3;stroke-linecap:round;fill:none"/>`;
    ZH.forEach(([a,b,v,sig])=>{if(g>a+(b-a)*.4)s+=`<text x="${f1(X((a+b)/2))}" y="${f1(Y(v)-6)}" class="t-xs t-mid" style="fill:var(--ink)">${v.toFixed(2)}${sig?'':'*'}</text>`});
    const zr=zRR(g);s+=`<circle cx="${f1(X(g))}" cy="${f1(Y(zr))}" r="5" style="fill:var(--glu);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-xs">* not significant · vs lifetime non-drinkers · Zhao 2023</text>`;
    s+=`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">LIFE EXPECTANCY AT 40 (WOOD 2018)</text><text x="${L.lx}" y="${L.ly+36}" class="t-lbl" style="fill:${g*7>100?'var(--glu)':'var(--ink)'}">${life(g*7)}</text>`;
    if(!N)s+=`<text x="${L.lx}" y="${L.ly+52}" class="t-xs">at ${Math.round(g*7)} g a week, vs &gt;0–100 g</text>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Intake <b>${Math.round(g)} g/day</b></span><span>≈ <b>${f1(g/10)}</b> standard drinks of 10 g</span><span><b>${Math.round(g*7)} g</b> a week</span><span>Cancer band <b>${band(g)<0?'none':BN[band(g)]}</b></span>`;
    note.innerHTML=noteHTML(BD_STEPS[ph]);
  }
  const stop=playWire(rg,$('#bdPlay'),draw,20000,'Replay','body');
  const setSt=stepWire($('#bdSteps'),BD_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- J-curve debate ---------- */
  const js=$('#bdJSvg'),jn=$('#bdJNote'),JB=$$('[data-bdj]');
  /* curves over u in [0,1] (schematic intake), y = relative risk; the labelled points are the published values */
  const sm=(P,u)=>{for(let i=1;i<P.length;i++)if(u<=P[i][0]){const a=P[i-1],b=P[i],k=ease(ramp(u,a[0],b[0]));return lerp(a[1],b[1],k)}return P[P.length-1][1]};
  const JC=[
   [[0,1],[.2,.86],[.42,1],[.7,1.19],[1,1.35]],
   [[0,1],[.2,.97],[.45,1.05],[.7,1.19],[1,1.35]],
   [[0,1],[1,1.58]]];
  const JN=[
   {k:'Position A · observational',t:'The classic J-curve',txt:`Without adjustment, 87 cohort studies reproduced the J: low-volume drinkers had an all-cause mortality RR of 0.86 versus “non-drinkers”. [[Stockwell2016JSAD]] But that reference group mixed lifetime abstainers with <b>former drinkers</b>, many of whom stopped because they were already ill, and whose mortality was raised (RR 1.22). Light drinkers also tend to have healthier lifestyles. [[Stockwell2016JSAD,Biddinger2022JAMANetwOpen]]`,
    pt:`Comparing light drinkers with a group that includes people who quit because they were sick makes light drinking look healthier than it is.`,hook:`“Abstainer bias” (sick quitters) explains much of the J-curve. [[Stockwell2016JSAD]]`},
   {k:'Position B · corrected',t:'The dip almost disappears',txt:`After adjusting for abstainer bias, the low-volume RR was 0.97 (0.88–1.07): no mortality benefit. <span class="ev est">Established</span> for the bias; benefit itself unproven. [[Stockwell2016JSAD]] In the 2023 update (107 cohorts, 4.8 million people), low-volume drinking was RR 0.93 (not significant) versus lifetime non-drinkers, rising to 1.19 at 45–64 g a day and 1.35 at 65 g or more. An apparent protective link with coronary death disappeared in younger cohorts and higher-quality studies. [[Zhao2023JAMANO,Zhao2017JSAD]]`,
    pt:`When the comparison is fair, light drinking does not lower the risk of dying.`,hook:`Adjusted RR for low-volume drinkers 0.97 (no benefit). [[Stockwell2016JSAD]]`},
   {k:'Position B · genetics',t:'Mendelian randomisation',txt:`Gene variants that make drinking unpleasant (ALDH2, ADH1B) act like a natural experiment. In the China Kadoorie Biobank (512,715 adults), self-reported drinking showed a U shape for stroke, but genotype-predicted intake did not: stroke risk rose steadily, RR 1.27 for ischaemic stroke and 1.58 for intracerebral haemorrhage per 280 g a week, with no significant effect on heart attack (0.96). The authors call the protective effect “largely non-causal”. <span class="ev est">Established</span> [[Millwood2019]] In Europeans, ADH1B carriers drank 17.2% less and had lower odds of coronary heart disease (OR 0.90). [[Holmes2014BMJ]] Non-linear analyses in UK Biobank suggest little added cardiovascular risk at light intake and exponential rises at heavier intake <span class="ev early">Early evidence</span>. [[Biddinger2022JAMANetwOpen]]`,
    pt:`Studies that use genes as a fair coin toss find that more alcohol means more stroke, with no protective dip.`,hook:`Mendelian randomisation (ALDH2/ADH1B): no protective U shape for stroke. [[Millwood2019]]`}];
  let jm=0,jFrom=0,jK=1,jStop=null;
  function drawJ(){
    const N=vb(js,'720 320','400 420');
    const x0=N?52:80,x1=N?386:520,y0=N?40:34,h=N?260:230,X=u=>lerp(x0,x1,u),Y=v=>y0+h-h*(v-.75)/.95;
    const f=u=>lerp(sm(JC[jFrom],u),sm(JC[jm],u),jK);
    let s=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${h}" style="fill:var(--field)"/>`;
    [.8,1,1.2,1.4,1.6].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===1?'axis':'grid'}"/><text x="${x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`);
    s+=`<text x="${x0}" y="${y0-12}" class="t-sm">${jm===2?'STROKE RISK (RR)':'ALL-CAUSE MORTALITY (RR)'}</text>`;
    const xl=jm===2?['0','genetically predicted intake →','280 g/wk']:['none','low','moderate','heavy'];
    if(jm===2){s+=`<text x="${x0}" y="${y0+h+14}" class="t-xs">0</text><text x="${(x0+x1)/2}" y="${y0+h+14}" class="t-xs t-mid">genetically predicted intake</text><text x="${x1}" y="${y0+h+14}" class="t-xs t-end">280 g a week</text>`}
    else xl.forEach((w,i)=>s+=`<text x="${f1(X([0,.2,.55,.95][i]))}" y="${y0+h+14}" class="t-xs t-mid">${w}</text>`);
    if(jm===2){/* self-reported U shape (dashed, schematic) and the two genetic lines */
      s+=`<path d="${pathFn(u=>(sm([[0,1],[.3,.88],[.6,1.02],[1,1.3]],u)-.75)/.95,x0,x1,y0+h,y0)}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(jK)}"/>`;
      s+=`<text x="${f1(X(.32))}" y="${f1(Y(.86)+14)}" class="t-xs t-mid">self-reported: U shape</text>`;
      const isch=u=>lerp(1,1.27,u);s+=`<path d="M${X(0)} ${f1(Y(1))}L${X(1)} ${f1(Y(lerp(1,1.27,jK)))}" style="stroke:var(--gaba);stroke-width:2.6;stroke-linecap:round"/><text x="${X(1)-4}" y="${f1(Y(lerp(1,1.27,jK))+14)}" class="t-xs t-end" style="fill:var(--gaba)">ischaemic stroke 1.27</text>`;
      s+=`<path d="M${X(0)} ${f1(Y(1))}L${X(1)} ${f1(Y(lerp(1,1.58,jK)))}" style="stroke:var(--glu);stroke-width:2.6;stroke-linecap:round"/><text x="${X(1)-4}" y="${f1(Y(lerp(1,1.58,jK))-8)}" class="t-xs t-end" style="fill:var(--glu)">brain bleed (ICH) 1.58</text>`;
      s+=`<text x="${f1(X(.5))}" y="${f1(Y(.96)+4)}" class="t-xs t-mid">heart attack: 0.96, not significant</text>`;
    }else{
      s+=`<path d="${pathFn(u=>(f(u)-.75)/.95,x0,x1,y0+h,y0)}" style="fill:none;stroke:var(--glu);stroke-width:3;stroke-linecap:round"/>`;
      const lv=f(.2);s+=`<circle cx="${f1(X(.2))}" cy="${f1(Y(lv))}" r="5" style="fill:var(--glu);stroke:var(--panel);stroke-width:2"/><text x="${f1(X(.2))}" y="${f1(Y(lv)+20)}" class="t-lbl t-mid">${lv.toFixed(2)}</text>`;
      s+=`<text x="${f1(X(.95))}" y="${f1(Y(f(.95))-10)}" class="t-xs t-end" style="fill:var(--ink)">1.35 at ≥65 g/day</text>`}
    /* the reference group */
    const rx=N?52:560,ry=N?y0+h+34:60,rw=N?334:148;
    if(!N||true){s+=`<text x="${rx}" y="${ry}" class="t-sm">${jm===2?'GROUPS SET BY GENES':'THE “NON-DRINKER” GROUP'}</text>`;
      if(jm===2){s+=`<text x="${rx}" y="${ry+20}" class="t-xs">ALDH2 / ADH1B variants decide</text><text x="${rx}" y="${ry+33}" class="t-xs">who drinks less, like a</text><text x="${rx}" y="${ry+46}" class="t-xs">natural randomised trial</text>`;
        for(let i=0;i<12;i++)s+=person(rx+8+(i%6)*(N?22:22),ry+(N?58:62)+Math.floor(i/6)*26,18,i%3===0?'var(--gaba-fill)':'var(--muted)',{op:i%3===0?1:.45})}
      else{const fd=jm===0?1-jK*0:0;
        for(let i=0;i<12;i++){const former=i>=8,show=!former||jm===0;s+=person(rx+8+(i%6)*22,ry+14+Math.floor(i/6)*26,18,former?'var(--accent)':'var(--muted)',{op:show?(former?1:.6):.12})}
        s+=`<rect x="${rx}" y="${ry+70}" width="10" height="10" rx="2" style="fill:var(--muted);opacity:.6"/><text x="${rx+16}" y="${ry+79}" class="t-xs">lifetime non-drinkers</text>`;
        s+=`<rect x="${rx}" y="${ry+88}" width="10" height="10" rx="2" style="fill:var(--accent);opacity:${jm===0?1:.25}"/><text x="${rx+16}" y="${ry+97}" class="t-xs">former drinkers (RR 1.22)</text>`;
        s+=`<text x="${rx}" y="${ry+118}" class="t-xs" style="fill:${jm===0?'var(--accent)':'var(--good)'}">${jm===0?'mixed in: reference looks sicker':'removed: a fair reference'}</text>`}}
    js.innerHTML=s;
    jn.innerHTML=noteHTML(JN[jm]);
  }
  function setJ(m){if(m===jm&&jK===1)return;if(jStop)jStop();jFrom=jK<1?jm:jm;jFrom=jm;jm=m;jK=0;JB.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.bdj===m));jStop=animate(700,p=>{jK=ease(p);drawJ()},()=>{jStop=null;jK=1;drawJ()})}
  JB.forEach(b=>b.addEventListener('click',()=>setJ(+b.dataset.bdj)));
  onHide.body=(prev=>()=>{prev&&prev();if(jStop){jStop();jStop=null;jK=1}})(onHide.body);
  const prevR=redraws.body;redraws.body=()=>{prevR&&prevR();drawJ()};
  drawJ();

  /* ---------- AF trial bars ---------- */
  const af=$('#bdAfSvg');let a='';
  a+=`<text x="0" y="12" class="t-xs">AF RECURRENCE BY 6 MONTHS</text>`;
  [['usual drinking',73,'var(--glu-fill)'],['abstinence',53,'var(--rx)']].forEach(([n,v,c],i)=>{const y=22+i*22;a+=`<text x="92" y="${y+10}" class="t-xs t-end">${n}</text><rect x="98" y="${y}" width="170" height="13" rx="6.5" style="fill:var(--panel-2)"/><rect x="98" y="${y}" width="${f1(170*v/100)}" height="13" rx="6.5" style="fill:${c}"/><text x="${f1(102+170*v/100)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
  a+=`<text x="0" y="84" class="t-xs">MEDIAN TIME IN AF</text>`;
  [['usual drinking',1.2,'var(--glu-fill)'],['abstinence',.5,'var(--rx)']].forEach(([n,v,c],i)=>{const y=92+i*20;a+=`<text x="92" y="${y+10}" class="t-xs t-end">${n}</text><rect x="98" y="${y}" width="${f1(110*v/1.2)}" height="12" rx="6" style="fill:${c}"/><text x="${f1(102+110*v/1.2)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
  af.innerHTML=a;
};
