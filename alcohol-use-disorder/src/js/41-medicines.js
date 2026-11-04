/* =============== 4.1 Approved medicines: naltrexone, acamprosate, disulfiram =============== */
function meWrap(s,n){const L=[];let c='';s.split(' ').forEach(w=>{const nx=c?c+' '+w:w;if(nx.length>n&&c){L.push(c);c=w}else c=nx});if(c)L.push(c);return L}
const ME_STEPS=[
 {from:0,at:.08,k:'Naltrexone · 1 of 2',t:'A drink releases the brain’s own opioids',
  txt:`PET imaging shows that drinking releases endogenous opioids (endorphins) in the nucleus accumbens and orbitofrontal cortex; in heavy drinkers the orbitofrontal change tracked problem drinking and the subjective "high". Alcohol also releases dopamine in the ventral striatum. Together these suggest why an opioid blocker could help. <span class="ev early">Early evidence</span> [[Mitchell2012,Boileau2003]]`,
  pt:`Part of why alcohol feels rewarding is that it makes the brain release its own opioid-like chemicals, which switch on the reward system.`,
  hook:`Alcohol → endogenous opioids → mu-opioid receptors → dopamine in the nucleus accumbens: the reward loop naltrexone targets.`},
 {from:.15,at:.27,k:'Naltrexone · 2 of 2',t:'Naltrexone sits on the receptors',
  txt:`Naltrexone is a pure opioid receptor antagonist. The label says its mechanism in AUD "is not understood", though preclinical data point to the endogenous opioid system. It "is not aversive therapy": drinking on it causes no disulfiram-like reaction. The oral label states "A dose of 50 mg once daily is recommended for most patients"; the injection is 380 mg every 4 weeks, given by a healthcare provider. [[FDA-Naltrexone,FDA-Vivitrol]]`,
  pt:`Naltrexone fills the parking spots the brain’s opioids would use, so a drink gives less of a reward signal. It does not make a person sick if they drink.`,
  hook:`Naltrexone blocks opioids: check for opioid use first. The labels advise 7–10 opioid-free days before starting, to avoid precipitated withdrawal. [[FDA-Naltrexone,FDA-Vivitrol]]`},
 {from:.34,at:.40,k:'Acamprosate · 1 of 2',t:'After heavy drinking stops: an over-excited brain',
  txt:`Chronic alcohol is thought to upset the balance between neuronal excitation and inhibition. With tolerance, NMDA glutamate receptors are up-regulated; when alcohol stops abruptly, this hyperexcitable state can lead to seizures and delirium tremens. <span class="ev est">Established</span> Get medical help to stop safely. The acamprosate label is clear that it "does not eliminate or diminish withdrawal symptoms". [[FDA-Campral,TsaiCoyle1998]]`,
  pt:`After months of heavy drinking the brain’s accelerator is turned up. When alcohol stops it can race, which is why stopping after heavy daily drinking needs medical help.`,
  hook:`Withdrawal hyperexcitability: NMDA up-regulation after chronic alcohol. Acamprosate is not a withdrawal treatment.`},
 {from:.49,at:.60,k:'Acamprosate · 2 of 2',t:'Acamprosate: rebalancing, as a hypothesis',
  txt:`The label calls the mechanism "not completely understood": animal studies suggest acamprosate acts on glutamate and GABA systems, which leads to the hypothesis that it restores the balance. <span class="ev hyp">Hypothesis</span> Its indication is "maintenance of abstinence from alcohol in patients with alcohol dependence who are abstinent at treatment initiation", at two 333 mg tablets three times daily as published. [[FDA-Campral,KranzlerSoyka2018]]`,
  pt:`Acamprosate helps people who have already stopped drinking stay stopped. It is cleared by the kidneys, not the liver, and it is taken three times a day.`,
  hook:`Acamprosate is excreted unchanged by the kidneys: label dose cut at CrCl 30–50 mL/min, contraindicated at ≤30. [[FDA-Campral]]`},
 {from:.66,at:.73,k:'Disulfiram · 1 of 2',t:'Disulfiram blocks the second enzyme',
  txt:`Alcohol is broken down to acetaldehyde, then to acetate by aldehyde dehydrogenase (ALDH). Disulfiram blocks that second step: after drinking on it, blood acetaldehyde can be 5–10 times higher than with the same alcohol alone. Its boxed warning: it "should never be administered to a patient when he is in a state of alcohol intoxication, or without his full knowledge". [[FDA-Antabuse,KranzlerSoyka2018]]`,
  pt:`Disulfiram does not lower craving. It works as a deterrent: drinking while taking it makes a person very ill, so taking it must always be the person’s own informed choice.`,
  hook:`Disulfiram inhibits ALDH → acetaldehyde builds 5–10-fold. Boxed warning: never during intoxication or without full knowledge. [[FDA-Antabuse]]`},
 {from:.81,at:.96,k:'Disulfiram · 2 of 2',t:'Acetaldehyde builds: the reaction',
  txt:`The label lists flushing, throbbing headache, breathing difficulty, nausea, heavy vomiting, sweating, chest pain, palpitations, tachycardia, hypotension, fainting, vertigo, blurred vision and confusion. Severe reactions can include cardiovascular collapse, arrhythmias, heart attack, convulsions and death: a severe reaction is an emergency, so call emergency services. A reaction can happen up to 14 days after the last dose, including from hidden alcohol in sauces, vinegars, cough mixtures, aftershave lotions and back rubs. [[FDA-Antabuse]]`,
  pt:`For up to two weeks after the last tablet, even hidden alcohol in food, cough syrup or skin lotions can set off a reaction.`,
  hook:`Disulfiram-alcohol reactions: up to 14 days after the last dose; mild from a blood alcohol of 5–10 mg/100 mL, fully developed at 50 mg/100 mL (label). Tolerance does not develop. [[FDA-Antabuse]]`}
];
const ME_PH=[
 {name:'Naltrexone',appr:['1984 · ReVia, oral tablets','2006 · Vivitrol, monthly injection'],
  pts:['Opioid antagonist: blocks opioid painkillers, cough and antidiarrhoeal medicines','7–10 opioid-free days before starting','After it stops, a smaller opioid dose than before can cause overdose','No boxed warning now (liver warning removed in 2013)']},
 {name:'Acamprosate',appr:['2004 · Campral, delayed-release tablets'],
  pts:['For people already abstinent when it starts','Excreted unchanged by the kidneys','CrCl 30–50 mL/min: lower starting dose; ≤30: contraindicated','Does not treat withdrawal; watch for low mood or suicidal thoughts']},
 {name:'Disulfiram',appr:['1951 · Antabuse (earliest Drugs@FDA record)'],
  pts:['Boxed warning: never during intoxication or without the person’s full knowledge','Not until at least 12 h without alcohol','Reactions up to 14 days after the last dose','Hidden alcohol: sauces, vinegars, cough mixtures, aftershave']}
];
const ME_KV=[
 `<div class="kv"><div><dt>First US approval</dt><dd>ReVia (oral naltrexone) 20 Nov 1984, with an efficacy supplement on 30 Dec 1994; Vivitrol (extended-release injection) 13 Apr 2006. [[DrugsFDA-AUD]]</dd></div><div><dt>Label points</dt><dd>Contraindicated with current opioid painkillers, current opioid dependence (including methadone or buprenorphine maintenance) or acute opioid withdrawal. Trying to overcome the blockade with large opioid doses can cause fatal overdose, and prescribers are told to discuss naloxone or nalmefene. The current labels carry no boxed warning; an earlier hepatotoxicity boxed warning was removed in 2013. [[FDA-Naltrexone,FDA-Vivitrol,Thompson2024JHEP]]</dd></div></div>`,
 `<div class="kv"><div><dt>First US approval</dt><dd>Campral 29 Jul 2004. In 2001 it was already used in many other countries but not yet approved in the US. [[DrugsFDA-AUD,KranzlerVanKirk2001]]</dd></div><div><dt>Label points</dt><dd>Moderate renal impairment (creatinine clearance 30–50 mL/min): a starting dose of one 333 mg tablet three times daily; contraindicated at ≤30 mL/min. Suicidal events were uncommon but more frequent than on placebo (1.4% vs 0.5% in studies of 6 months or less), and the label asks families and caregivers to watch for and report depression or suicidal thinking. [[FDA-Campral]]</dd></div></div>`,
 `<div class="kv"><div><dt>First US approval</dt><dd>Antabuse 28 Aug 1951, the earliest Drugs@FDA record; one review dates the first approval to 1949. [[DrugsFDA-AUD,KranzlerSoyka2018]]</dd></div><div><dt>Label points</dt><dd>Boxed warning: never during intoxication or without the person’s full knowledge, and the physician should tell relatives this. Contraindicated with recent metronidazole, paraldehyde, alcohol or alcohol-containing preparations, severe heart disease, psychoses, or thiuram allergy. Hepatitis, sometimes fulminant, has been reported. [[FDA-Antabuse]]</dd></div></div>`
];
/* scene 1: the reward synapse, in a 458 x 356 local box */
function meSceneN(t){
  const rA=ramp(t,0,.06),c=ramp(t,.16,.28),rr=rng(7),X=[110,170,230,290,350],ord=[2,0,4,1,3];
  let s=`<text x="14" y="24" class="t-sm">REWARD SYNAPSE · SCHEMATIC</text>`;
  s+=mol(216,20,'opi',{r:4.5})+`<text x="224" y="23.5" class="t-xs">endorphin</text>`;
  s+=`<rect x="290" y="15" width="14" height="10" rx="3" style="fill:var(--rx)"/><text x="309" y="23.5" class="t-xs">naltrexone</text>`;
  s+=mol(388,20,'da',{r:4})+`<text x="396" y="23.5" class="t-xs">dopamine</text>`;
  s+=beaker(20,56,30,40,.55*rA+.05,{label:'a drink',ticks:3});
  s+=`<path d="M58 78H112" class="arrow" marker-end="url(#meA)"/>`;
  s+=`<path d="M120 44H340V86C340 114 300 120 230 120S120 114 120 86Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  s+=`<text x="230" y="62" class="t-xs t-mid">opioid-releasing nerve ending</text>`;
  for(let i=0;i<5;i++)s+=`<circle cx="${150+i*40}" cy="92" r="8" style="fill:none;stroke:var(--stri);stroke-width:1.2"/><circle cx="${150+i*40}" cy="92" r="3" style="fill:var(--stri);opacity:${f1(1-rA*.6)}"/>`;
  s+=`<path d="M40 208Q230 198 420 208V262H40Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  s+=`<text x="230" y="254" class="t-xs t-mid">dopamine-releasing cell · mu-opioid receptors</text>`;
  let bound=0;
  X.forEach((x,i)=>{const cap=clamp(c*5-ord.indexOf(i));let on=false;
    if(rA>0){const p=(t*14+i*.29)%1,q=p*1.6;let ex=x,ey,op=rA;
      if(q<1){ey=lerp(122,194,ease(q))}
      else if(cap>=.95){const b=clamp((q-1)/.6);ey=194-b*64;ex=x+(i%2?1:-1)*b*26;op=rA*(1-b)}
      else{ey=194;on=true}
      s+=mol(ex,ey,'opi',{r:5,op:f1(op)})}
    if(on)bound++;
    s+=`<path d="M${x-11} 190V202Q${x-11} 212 ${x} 212Q${x+11} 212 ${x+11} 202V190" style="fill:${on?'var(--stri)':'none'};fill-opacity:.35;stroke:var(--stri);stroke-width:3;stroke-linecap:round"/>`;
    if(cap>0){const y=lerp(140,196,ease(cap));s+=`<rect x="${x-9}" y="${f1(y-6)}" width="18" height="12" rx="3" style="fill:var(--rx)"/>`}});
  const m=rA*(1-.7*c);
  const nd=Math.round(20*m);
  for(let i=0;i<20;i++){const bx=rr(),by=rr();if(i<nd)s+=mol(50+((bx+t*2.5)%1)*370,276+by*40,'da',{r:3.6})}
  s+=`<text x="14" y="344" class="t-xs">dopamine → reward signal (nucleus accumbens)</text>`;
  if(c>0)s+=`<g style="opacity:${f1(c)}">${pill(404,150,40,{txt:'NTX',ang:-18})}</g>`;
  if(c>.55)s+=`<text x="230" y="236" class="t-xs t-mid" style="fill:var(--rx)">receptors occupied: endorphins bounce off</text>`;
  else if(rA>.5)s+=`<text x="230" y="236" class="t-xs t-mid" style="fill:var(--stri)">endorphins land on the receptors</text>`;
  return {svg:s,m}}
/* scene 2: the over-excited synapse and the balance */
function meSceneA(t){
  const s1=ramp(t,.34,.38),u=ramp(t,.49,.60),fl=Math.floor(t*300)%9,tilt=lerp(.85,0,u)*s1;
  let s=`<text x="14" y="24" class="t-sm">AFTER LONG, HEAVY DRINKING STOPS · SCHEMATIC</text>`;
  s+=synapse(150,192,2.1,{gaba:2,nmda:6,gt:lerp(.3,.6,u),gl:.2+lerp(.8,.25,u)*s1,cl:lerp(.25,.6,u),ca:lerp(1,.3,u)*s1,spark:lerp(1,.06,u)*s1,seed:11+fl});
  s+=`<text x="92" y="310" class="t-xs t-mid" style="fill:var(--gaba)">GABA-A · calming</text><text x="212" y="310" class="t-xs t-mid" style="fill:var(--glu)">NMDA · exciting</text>`;
  s+=`<text x="150" y="330" class="t-xs t-mid">more NMDA receptors after chronic alcohol</text>`;
  const B=balance(370,96,104,{tilt,ln:2,rn:Math.round(lerp(5,2,u)),lsub:'inhibition',rsub:'excitation'});s+=B.svg;
  s+=`<text x="370" y="192" class="t-xs t-mid" style="fill:${u>.5?'var(--good)':'var(--glu)'};font-weight:700">${u>.5?'closer to':'excitation outweighs'}</text><text x="370" y="205" class="t-xs t-mid" style="fill:${u>.5?'var(--good)':'var(--glu)'};font-weight:700">${u>.5?'balance':'inhibition'}</text>`;
  if(u>0){s+=`<g style="opacity:${f1(u)}">${pill(370,236,38,{round:true,txt:'ACA'})}`;
    s+=`<text x="370" y="276" class="t-xs t-mid">acamprosate may act on</text><text x="370" y="289" class="t-xs t-mid">glutamate and GABA</text>`;
    s+=`<rect x="330" y="298" width="80" height="16" rx="4" style="fill:var(--rx-soft)"/><text x="370" y="309.5" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">HYPOTHESIS</text></g>`}
  return {svg:s,m:tilt}}
/* scene 3: the blocked pathway and the acetaldehyde pool */
function meSceneD(t){
  const b=ramp(t,.66,.73),aL=ramp(t,.75,.95),lv=lerp(.1,.85,aL);
  let s=`<text x="14" y="24" class="t-sm">ALCOHOL BREAKDOWN · SCHEMATIC</text>`;
  s+=pathway(14,40,430,{eth:.55,acet:lerp(.12,1,aL),ace:lerp(.75,.12,b),block:b}).svg;
  if(b>.3)s+=`<text x="338" y="86" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">blocked by disulfiram</text>`;
  s+=tank(36,150,96,150,lv,{col:'var(--acet)',label:'acetaldehyde in blood'});
  [ [.1,'1×'],[.5,'5×'],[1,'10×'] ].forEach(([v,l])=>{const y=150+150*(1-v);s+=`<line x1="132" x2="140" y1="${f1(y)}" y2="${f1(y)}" class="axis"/><text x="144" y="${f1(y+3)}" class="t-xs">${l}</text>`});
  s+=`<path d="M168 150V225" style="stroke:var(--acet);stroke-width:2.4"/><text x="174" y="190" class="t-xs" style="fill:var(--acet)">5–10×</text><text x="174" y="202" class="t-xs">(label)</text>`;
  const fl=ramp(t,.80,.9),px=244,py=150;
  if(fl>0)s+=`<circle cx="${px}" cy="${f1(py+19)}" r="${f1(22+fl*6)}" style="fill:var(--glu-fill);opacity:${f1(.15+fl*.3)}"/>`;
  s+=person(px,py,110,'var(--skin)');
  s+=symptoms(px,py,110,{sweat:fl,tremor:0});
  const SY=['flushing','throbbing headache','nausea, vomiting','sweating','breathing difficulty','palpitations','chest pain','low blood pressure'];
  SY.forEach((y,i)=>{const a=ramp(aL,(i+.5)/9,(i+1.2)/9);if(a>0)s+=`<text x="${f1(300+(1-a)*10)}" y="${158+i*17}" class="t-xs" style="opacity:${f1(a)};fill:var(--ink)">• ${y}</text>`});
  if(aL>.92)['Severe reactions can be','life-threatening: call','emergency services.'].forEach((l,i)=>{s+=`<text x="196" y="${302+i*13}" class="t-xs" style="fill:var(--bad);font-weight:700">${l}</text>`});
  return {svg:s,m:lv}}
function mePanel(x,y,w,h,ph,m,t,N){const P=ME_PH[ph],n=Math.floor((w-34)/(N?6.6:5.75)),ns=Math.floor((w-24)/(N?7.2:6.7));
  let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;let yy=y+32;
  s+=`<text x="${x+12}" y="${yy}" style="font:800 24px var(--display);fill:var(--rx)">${P.name}</text>`;
  yy+=20;s+=`<text x="${x+12}" y="${yy}" class="t-xs">FIRST US APPROVAL · DRUGS@FDA</text>`;
  P.appr.forEach(a=>meWrap(a,ns).forEach((l,k)=>{yy+=15;s+=`<text x="${x+12+(k?10:0)}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`}));
  yy+=24;s+=`<text x="${x+12}" y="${yy}" class="t-xs">LABEL POINTS</text>`;yy+=2;
  P.pts.forEach((p,i)=>{const hot=ph===2&&i===0;meWrap(p,n).forEach((l,k)=>{yy+=13;s+=`${k?'':`<text x="${x+12}" y="${yy}" class="t-xs" style="fill:${hot?'var(--bad)':'var(--rx)'}">•</text>`}<text x="${x+22}" y="${yy}" class="t-xs" style="fill:${hot?'var(--bad)':'var(--ink)'}">${l}</text>`});yy+=3});
  const my=y+h-44,bx=x+12,bw=w-24;
  if(ph===0){s+=`<text x="${bx}" y="${my}" class="t-xs">REWARD / CRAVING PULL · SCHEMATIC</text><rect x="${bx}" y="${my+8}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${bx}" y="${my+8}" width="${f1(bw*m)}" height="12" rx="6" style="fill:var(--stri)"/>`;
    s+=`<text x="${bx}" y="${my+34}" class="t-xs" style="fill:var(--ink)">${t<.16?(m>.5?'a drink switches the reward system on':'before the drink'):'naltrexone dims the reward signal'}</text>`}
  else if(ph===1){const cx=bx+bw/2;s+=`<text x="${bx}" y="${my}" class="t-xs">EXCITATION ↔ INHIBITION · SCHEMATIC</text><rect x="${bx}" y="${my+8}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(cx)}" y="${my+8}" width="${f1(bw/2*m)}" height="12" rx="3" style="fill:var(--glu-fill)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="${my+4}" y2="${my+24}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${bx}" y="${my+34}" class="t-xs" style="fill:var(--gaba)">GABA</text><text x="${bx+bw}" y="${my+34}" class="t-xs t-end" style="fill:var(--glu)">glutamate</text>`}
  else{s+=`<text x="${bx}" y="${my}" class="t-xs">ACETALDEHYDE VS ALCOHOL ALONE</text><rect x="${bx}" y="${my+8}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(bx+bw*.5)}" y="${my+8}" width="${f1(bw*.5)}" height="12" rx="0" style="fill:var(--acet);opacity:.2"/><rect x="${bx}" y="${my+8}" width="${f1(bw*m)}" height="12" rx="6" style="fill:var(--acet)"/>`;
    s+=`<text x="${bx}" y="${my+34}" class="t-xs">1×</text><text x="${f1(bx+bw*.5)}" y="${my+34}" class="t-xs t-mid">5×</text><text x="${bx+bw}" y="${my+34}" class="t-xs t-end">10×</text>`}
  return s}
const ME_NNT={j:{lab:'Jonas 2014 · 122 trials and 1 cohort, 22,803 people',any:{aca:[12,'8–26'],ntx:[20,'11–500']},heavy:{aca:null,ntx:[12,'8–26']}},
 m:{lab:'McPheeters 2023 · 118 trials, 20,976 people',any:{aca:[11,'1–32'],ntx:[18,'4–32']},heavy:{aca:null,ntx:[11,'5–41']}}};
const ME_COMB=[ ['CBI only, no pills, no MM',66.6,0],['Placebo pills + MM',75.1,0],['Naltrexone + CBI + MM',77.1,0],['CBI + MM + placebo pills',79.2,0],['Naltrexone + MM',80.6,1] ];
const ME_TL=[ [1951,['Antabuse','(disulfiram)'],0],[1984,['ReVia','(oral naltrexone)'],1],[1994,['ReVia efficacy','supplement'],0],[2004,['Campral','(acamprosate)'],1],[2006,['Vivitrol (injectable','naltrexone)'],2],[2013,['Liver boxed warning','removed (naltrexone)'],3] ];
inits.medicines=()=>{
  /* ---- main scrubber ---- */
  const svg=$('#meSvg'),rg=$('#meT');
  function draw(t){
    const N=vb(svg,'720 380','400 608'),ph=t<.34?0:t<.66?1:2;
    const sc=ph===0?meSceneN(t):ph===1?meSceneA(t):meSceneD(t);
    let s=`<defs>${marker('meA','var(--muted)')}</defs>`;
    s+=`<rect x="12" y="12" width="${N?376:458}" height="${N?292:356}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<g class="meSc" transform="translate(12 12) scale(${N?(376/458).toFixed(4):1})">${sc.svg}</g>`;
    s+=N?mePanel(12,316,376,280,ph,sc.m,t,1):mePanel(484,12,224,356,ph,sc.m,t);
    svg.innerHTML=s;
    const p=phaseOf(ME_STEPS,t);setSt(p);
    $('#meNote').innerHTML=noteHTML(ME_STEPS[p])+ME_KV[ph];
  }
  const stop=playWire(rg,$('#mePlay'),draw,32000,'%t:player.replay%','medicines');
  const setSt=stepWire($('#meSteps'),ME_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- NNT comparator ---- */
  const ns=$('#meNntSvg');let src='j',out='any',stopN=null;
  function drawN(p){const N=vb(ns,'720 300','400 610'),D=ME_NNT[src][out];let s='';
    [ ['aca','Acamprosate'],['ntx','Oral naltrexone 50 mg/day'] ].forEach(([k,name],gi)=>{
      const ox=N?14:20+gi*360,oy=N?14+gi*300:14,v=D[k],gx=ox,gy=oy+80,sp=N?19:19;
      s+=`<text x="${ox}" y="${oy+16}" class="t-lbl">${name}</text>`;
      if(v)s+=`<text x="${ox}" y="${oy+50}" style="font:800 30px var(--display);fill:var(--rx)">NNT ${v[0]}</text><text x="${ox+(String(v[0]).length>1?118:100)}" y="${oy+50}" class="t-xs">95% CI ${v[1]}</text>`;
      else s+=`<text x="${ox}" y="${oy+48}" style="font:800 22px var(--display);fill:var(--muted)">No NNT reported</text>`;
      s+=`<text x="${ox}" y="${oy+70}" class="t-xs">${out==='any'?'to prevent one return to any drinking':'to prevent one return to heavy drinking'}</text>`;
      const hi=v?Math.round(100/v[0]):0,shown=Math.round(hi*p);
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,on=i<shown;s+=person(gx+c*sp+4,gy+r*sp,15,on?'var(--rx)':'var(--brain-line)',{op:on?1:.35})}
      const tx=gx+10*sp+16,tw=N?(400-tx-10):(330-10*sp-16),nc=Math.floor(tw/(N?6.6:5.75));
      let ty=gy+14;
      if(v){s+=`<text x="${tx}" y="${ty+8}" style="font:800 26px var(--display);fill:var(--rx)">≈ ${hi}</text>`;ty+=26;
        meWrap(`in 100 treated avoid ${out==='any'?'any drinking':'heavy drinking'} who would not have on placebo`,nc).forEach(l=>{s+=`<text x="${tx}" y="${ty}" class="t-xs" style="fill:var(--ink)">${l}</text>`;ty+=12});
        ty+=6;meWrap(`Grey: the rest. Many of them also do well, on medicine or placebo.`,nc).forEach(l=>{s+=`<text x="${tx}" y="${ty}" class="t-xs">${l}</text>`;ty+=12})}
      else meWrap('The Cochrane review found acamprosate did not significantly reduce heavy drinking.',nc).forEach(l=>{s+=`<text x="${tx}" y="${ty}" class="t-xs" style="fill:var(--ink)">${l}</text>`;ty+=12});
    });
    if(!N)s+=`<line x1="360" x2="360" y1="20" y2="290" style="stroke:var(--line)"/>`;
    ns.innerHTML=s;
    const L=ME_NNT[src].lab,a=ME_NNT[src][out].aca,n=ME_NNT[src][out].ntx;
    $('#meNntNote').innerHTML=noteHTML({k:L,t:out==='any'?'Preventing a return to any drinking':'Preventing a return to heavy drinking',
      txt:(out==='any'?`Acamprosate NNT ${a[0]} (95% CI ${a[1]}) vs oral naltrexone NNT ${n[0]} (${n[1]}): a lower NNT means more people helped per 100 treated. In direct comparisons the two did not differ significantly for any drinking or heavy drinking. ${src==='m'?'[[Jonas2014JAMA,McPheeters2023JAMA]]':'[[Jonas2014JAMA]]'}`
        :`Oral naltrexone NNT ${n[0]} (95% CI ${n[1]}). Acamprosate has no NNT for this outcome: the Cochrane review found it did not significantly reduce heavy drinking. ${src==='m'?'[[McPheeters2023JAMA,Rosner2010Acamprosate]]':'[[Jonas2014JAMA,Rosner2010Acamprosate]]'}`)+` A wide interval means the true effect could be much smaller or larger than the central estimate.`,
      pt:`Out of every 100 people who take the medicine, a handful avoid going back to drinking who otherwise would not have. That is a real effect for a common, serious condition, and these medicines work best alongside counselling or support. [[McPheeters2023JAMA]]`,
      hook:`Jonas 2014 NNTs: acamprosate 12 (any drinking); oral naltrexone 20 (any) and 12 (heavy). Acamprosate best supports abstinence; naltrexone best reduces heavy drinking and craving. [[Jonas2014JAMA,Maisel2013]]`})
      +`<div class="kv"><div><dt>Harms</dt><dd>Naltrexone: one extra trial withdrawal for adverse events per 48 treated; nausea RR 1.73. Acamprosate: adverse-event withdrawals not significantly increased; diarrhoea RR 1.58. [[Jonas2014JAMA,McPheeters2023JAMA]]</dd></div></div>`;
  }
  function redrawN(){stopN&&stopN();stopN=animate(900,drawN,()=>{stopN=null})}
  $$('[data-mesrc]').forEach(b=>b.addEventListener('click',()=>{src=b.dataset.mesrc;$$('[data-mesrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));redrawN()}));
  $$('[data-meout]').forEach(b=>b.addEventListener('click',()=>{out=b.dataset.meout;$$('[data-meout]').forEach(x=>x.setAttribute('aria-pressed',x===b));redrawN()}));
  drawN(1);

  /* ---- situation highlighter ---- */
  const SITN={liver:'Liver disease: acamprosate is not metabolised by the liver; disulfiram is contraindicated (ACG); naltrexone is used in compensated but avoided in decompensated cirrhosis (ACG). [[Jophlin2024ACG,FDA-Campral]]',
    kidney:'Kidney disease: acamprosate is cleared by the kidneys, so its label lowers the dose and contraindicates it at creatinine clearance ≤30 mL/min. [[FDA-Campral]]',
    opioid:'Opioid use: naltrexone blocks opioids and is contraindicated with current opioid use or dependence, including methadone or buprenorphine. [[FDA-Naltrexone]]',
    abst:'Goal of abstinence: acamprosate’s label is for people already abstinent; disulfiram needs at least 12 hours without alcohol and the person’s full knowledge. [[FDA-Campral,FDA-Antabuse]]',
    reduce:'Goal of cutting down: naltrexone has the clearest effect on heavy drinking; acamprosate did not significantly reduce it. [[Rosner2010Naltrexone,Rosner2010Acamprosate]]'};
  $$('[data-mesit]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.mesit,on=b.getAttribute('aria-pressed')!=='true';
    $$('[data-mesit]').forEach(x=>x.setAttribute('aria-pressed',on&&x===b));
    $$('#m-medicines tr[data-sit]').forEach(r=>r.classList.toggle('hl',on&&r.dataset.sit===k));
    $('#meSitNote').innerHTML=on?SITN[k]:'Pick a situation to highlight its row.'}));

  /* ---- COMBINE bars ---- */
  const cs=$('#meCombSvg');
  function drawC(p){const N=vb(cs,'720 250','400 330');let s='';
    const x0=N?14:250,x1=N?340:650,X=v=>x0+(x1-x0)*v/100,rh=N?58:40,top=N?24:30;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-8}" y2="${top+rh*5}" class="grid"/><text x="${f1(X(v))}" y="${top+rh*5+14}" class="t-xs t-mid">${v}%</text>`});
    ME_COMB.forEach(([l,v,hi],i)=>{const y=top+i*rh,by=N?y+18:y+6,w=(X(v)-x0)*ease(p);
      s+=`<text x="${N?x0:x0-10}" y="${N?y+12:y+18}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink)">${l}</text>`;
      s+=`<rect x="${x0}" y="${by}" width="${f1(w)}" height="${N?18:16}" rx="4" style="fill:${hi?'var(--rx)':i===0?'var(--muted)':'var(--rx-soft)'};stroke:var(--rx);stroke-width:${hi?0:1}"/>`;
      s+=`<text x="${f1(x0+w+6)}" y="${by+(N?13:12)}" class="t-sm" style="fill:var(--ink);font-weight:600">${(v*ease(p)).toFixed(1)}</text>`});
    s+=`<text x="${N?x0:x0}" y="${top-14}" class="t-xs">PERCENT DAYS ABSTINENT DURING 16 WEEKS</text>`;
    cs.innerHTML=s}
  drawC(1);

  /* ---- underuse ---- */
  const us=$('#meUseSvg');
  function drawU(){const N=vb(us,'720 200','400 220');let s='';const cols=N?20:25,sp=N?18.5:20,ox=N?16:24,oy=N?16:20;
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),c=i%cols;s+=person(ox+c*sp+6,oy+r*(sp+6),16,i<8?'var(--rx)':'var(--brain-line)',{op:i<8?1:.35})}
    const ty=N?oy+5*(sp+6)+26:oy+4*(sp+6)+30;
    s+=`<text x="${ox}" y="${ty}" style="font:800 22px var(--display);fill:var(--rx)">fewer than 9 in 100</text>`;
    meWrap('people likely to benefit are prescribed an AUD medicine',N?46:90).forEach((l,k)=>{s+=`<text x="${ox}" y="${ty+18+k*13}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
    us.innerHTML=s}
  drawU();

  /* ---- approval timeline ---- */
  const ts=$('#meTlSvg');
  function drawT(){const N=vb(ts,'720 160','400 260');let s='';
    if(N){s+=`<line x1="40" x2="40" y1="16" y2="244" style="stroke:var(--rx);stroke-width:2"/>`;
      ME_TL.forEach(([yr,l],i)=>{const y=30+i*40;s+=`<circle cx="40" cy="${y}" r="6" style="fill:${i===5?'var(--panel)':'var(--rx)'};stroke:var(--rx);stroke-width:2"/><text x="56" y="${y+4}" class="t-lbl">${yr}</text><text x="100" y="${y+4}" class="t-sm" style="fill:var(--ink)">${l.join(' ')}</text>`})}
    else{const T=tline(40,80,640,{min:1945,max:2020,step:5,fmt:v=>v%10?'':v});s+=T.svg;
      ME_TL.forEach(([yr,l,lv],i)=>{const x=T.X(yr),up=lv%2===0,yb=up?(lv===2?20:40):(lv===3?140:110),anc=i===5?' t-end':' t-mid',tx=i===5?x+40:x;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="80" y2="${up?yb+16:yb-14}" style="stroke:var(--rx);stroke-width:1"/><circle cx="${f1(x)}" cy="80" r="5" style="fill:${i===5?'var(--panel)':'var(--rx)'};stroke:var(--rx);stroke-width:2"/>`;
        s+=`<text x="${f1(tx)}" y="${up?yb-4:yb}" class="t-sm${anc}" style="fill:var(--ink);font-weight:600">${yr} · ${l[0]}</text><text x="${f1(tx)}" y="${up?yb+9:yb+13}" class="t-xs${anc}">${l[1]}</text>`})}
    ts.innerHTML=s}
  drawT();
  const prevR=redraws.medicines;redraws.medicines=()=>{prevR&&prevR();drawN(1);drawC(1);drawU();drawT()};
};
