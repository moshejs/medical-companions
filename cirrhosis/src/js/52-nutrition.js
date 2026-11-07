/* =============== 5.2 Nutrition, muscle & medicine safety =============== */
/* the clock runs 08:00 -> 08:00 over t 0..0.84; the last step (t > .86) shows 12 months of night feeding */
const NT_END=.84, NT_H=t=>24*clamp(t/NT_END), NT_T=h=>h/24*NT_END;
const NT_STEPS=[
 {from:0,at:NT_T(2.2),k:'08:00 to 19:30 · the day',t:'Meals every 3 to 4 hours',
  txt:`Through the day each lane eats breakfast, lunch, an afternoon snack and dinner, so the gaps stay short and the body runs on food (green) and briefly on stored liver sugar, glycogen (gold). AASLD 2021: "Fasting time should be minimized, with a maximum interval of 3-4 hours between nutritional intake while awake". [[Lai2021AASLD]] EASL 2019: "Optimal daily energy intake should not be lower than the recommended 35 kcal/kg.BW/d (in non-obese individuals)" and "Optimal daily protein intake should not be lower than the recommended 1.2–1.5 g/kg.BW/d". [[EASL2019Nutrition]] Quoted as published, not as instructions.`,
  pt:`Eating little and often during the day keeps the gaps between meals short.`,
  hook:`EASL 2019 floors: energy 35 kcal/kg/day, protein 1.2–1.5 g/kg/day. AASLD 2021: no more than 3–4 hours between intakes while awake. [[EASL2019Nutrition,Lai2021AASLD]]`},
 {from:NT_T(11.5),at:NT_T(15.6),k:'19:30 to 01:00 · the evening',t:'The last meal, then the long night',
  txt:`After dinner every lane lives on glycogen. In the healthy liver that store lasts the whole night. With cirrhosis it runs out much sooner: cirrhosis is described as a state of "accelerated starvation", in which the body starts making glucose from other fuels (gluconeogenesis) early after short fasts, and that drives muscle breakdown. [[Tsien2012,Plank2008]] Malnutrition "has been reported in 20% of patients with compensated cirrhosis and in more than 50% of patients with decompensated liver disease". [[EASL2019Nutrition]] The bottom lane has one more thing to eat at 22:30: a late evening snack.`,
  pt:`For a liver with cirrhosis, a night without food is like a much longer fast than it is for a healthy liver.`,
  hook:`Cirrhosis = "accelerated starvation": gluconeogenesis starts early after short fasts, and muscle pays for it. [[Tsien2012]]`},
 {from:NT_T(17),at:NT_T(20.4),k:'01:00 to 08:00 · overnight',t:'Muscle becomes fuel',
  txt:`In the middle lane the glycogen phase is over and amino acids from muscle are broken down to make glucose: the red stretch, and the muscle circle on the right begins to shrink. Sarcopenia affects "30%-70% of patients with end-stage liver disease"; a meta-analysis of 36 studies (8,821 people) pooled 33%. [[Lai2021AASLD,Mazeaud2023]] Muscle matters for the brain too: it "houses GS" (glutamine synthetase) and acts as a back-up ammonia sink when the liver cannot clear ammonia, which is why losing muscle raises the risk of <a href="#encephalopathy" data-go="encephalopathy">hepatic encephalopathy</a>. [[Rose2020]]`,
  pt:`When the stored sugar runs out, the body breaks down muscle to make more. Night after night, that wears muscle away.`,
  hook:`Muscle is an alternative ammonia sink (glutamine synthetase), so sarcopenia raises the risk of hepatic encephalopathy. [[Rose2020]]`},
 {from:NT_T(22.4),at:NT_T(24),k:'08:00 · next morning',t:'What the night cost',
  txt:`By breakfast the lane without a late snack spent the longest time burning muscle; the late snack shortened that stretch. One night is exaggerated here so the difference shows. Over months it adds up: sarcopenia independently predicted death on the transplant waiting list (HR 2.36, adjusted for age and MELD), and in 112 people evaluated for transplant median survival was 19 ± 6 months with sarcopenia against 34 ± 11 months without. [[Tandon2012,MontanoLoza2012]] These are population statistics from those cohorts, not a forecast for any one person.`,
  pt:`A snack before bed and an early breakfast shorten the long overnight fast that wears down muscle.`,
  hook:`CT sarcopenia in end-stage liver disease: L3 skeletal muscle index under 50 cm²/m² (men) or under 39 cm²/m² (women). [[Carey2017SMI]]`},
 {from:.86,at:1,k:'Twelve months later',t:'The late evening snack, measured',
  txt:`In a 12-month trial, 103 people with cirrhosis took a 710 kcal/day supplement either at night or in the daytime. Night feeding raised total body protein by 0.38 kg at 3 months, 0.48 kg at 6 months and 0.53 kg at 12 months, "about 2 kg of lean tissue"; the daytime group showed no gain. [[Plank2008]] <span class="ev early">Early evidence</span> A review found better nitrogen balance and quality of life with a late evening snack, inconsistent effects on lean mass, and no shown survival benefit. [[Tsien2012]] EASL 2019: "Include late evening oral nutritional supplementation and breakfast in dietary regime of malnourished decompensated cirrhotic patients". [[EASL2019Nutrition]]`,
  pt:`The EASL patient section puts it simply: "The late-evening snack is the most important, as it covers the long interval between dinner and breakfast." [[EASL2019Nutrition]]`,
  hook:`Plank 2008: the same 710 kcal supplement added about 2 kg of lean tissue in 12 months when taken at night, and nothing when taken by day. [[Plank2008]]`}
];
const NT_LANES=[
 {n:'Healthy liver',sub:'no late snack',meals:[0,4.5,8,11.5],gly:13,cir:false},
 {n:'Cirrhosis',sub:'no late snack',meals:[0,4.5,8,11.5],gly:2.5,cir:true},
 {n:'Cirrhosis',sub:'+ late evening snack',meals:[0,4.5,8,11.5,14.5],gly:2.5,cir:true}
];
const NT_MEALN=['breakfast','lunch','snack','dinner','late snack'];
/* medicine sorter: ans = pref | care | avoid, from the cited framing */
const NT_MEDS=[
 {id:'para',n:'Paracetamol (acetaminophen)',s:'for pain or fever',ans:'pref',
  why:`AASLD 2022: "Acetaminophen, 500 mg every 6 h, up to a maximum dose of 2 g/d, is the preferred first-line pharmacotherapy" for pain in cirrhosis. [[Rogal2022AASLD]] A prescribing review quotes "relatively small doses (2-3 g or less/day) for short durations". [[Lewis2013]] A systematic review found no high-quality trials supporting reduced doses in compensated cirrhosis, and the US over-the-counter label, written for everyone, warns of severe liver damage above 4,000 mg in 24 hours and says "Ask a doctor before use if you have liver disease". [[Schweighardt2018,FDA-Tylenol]] Limits differ by source: practice varies.`},
 {id:'nsaid',n:'NSAIDs',s:'ibuprofen, naproxen, aspirin for pain',ans:'avoid',
  why:`AASLD 2022: "Systemic NSAIDs should be avoided". [[Rogal2022AASLD]] A prescribing review says they "should be used cautiously (or not at all) in advanced cirrhosis", because drugs that can precipitate "renal failure, gastrointestinal bleeding, SBP and encephalopathy should be identified and avoided". [[Lewis2013]] The ibuprofen label says to ask a doctor first with "liver cirrhosis" and warns NSAIDs "may cause severe stomach bleeding". [[FDA-Advil]]`},
 {id:'bzd',n:'Benzodiazepines',s:'for sleep or anxiety',ans:'avoid',
  why:`AASLD 2022: chronic benzodiazepines should generally be avoided in decompensated cirrhosis (end-of-life comfort is a possible exception), and they should not be used for sleep because of sedation, cognitive impairment and falls. [[Rogal2022AASLD]] In a Taiwanese cohort, hepatic encephalopathy linked to benzodiazepines went with long-acting drugs, high doses, use beyond 2 months and low albumin. [[Lee2014BZD]] One exception is alcohol withdrawal, where ACG 2024 calls them the treatment of choice, used cautiously and preferably short- or intermediate-acting (lorazepam, oxazepam). [[Jophlin2024ACG]]`},
 {id:'opi',n:'Opioids',s:'strong pain relievers',ans:'care',
  why:`AASLD 2022: avoid opioids for chronic pain when possible; codeine, morphine and tramadol should generally be avoided; if one is needed, low-dose oxycodone or hydromorphone, with a laxative such as lactulose started at the same time to prevent constipation and encephalopathy. [[Rogal2022AASLD]] In 6,451 people with compensated cirrhosis, hepatic encephalopathy within a year occurred in 3.3% with no opioid, 5.0% with short-term and 6.3% with chronic prescriptions. [[Moon2020Opioids]]`},
 {id:'ppi',n:'Proton pump inhibitors',s:'omeprazole and similar acid reducers',ans:'care',
  why:`In 865 people with cirrhosis and ascites, PPI use was linked to hepatic encephalopathy (adjusted HR 1.36) and spontaneous bacterial peritonitis (adjusted HR 1.72). [[Dam2016PPI]] A meta-analysis found the SBP link in case-control but not cohort studies and "could not establish causality". [[Yu2016PPI]] A prescribing review says PPIs "should be used with care" in cirrhosis. [[Lewis2013]] Association likely, cause uncertain.`},
 {id:'herb',n:'Herbal and dietary supplements',s:'including "liver" products',ans:'care',
  why:`ACG 2021 names herbal and dietary supplements, with antimicrobials and anticancer drugs, as the most common causes of drug-induced liver injury in the Western world. [[Chalasani2021ACG]] No source used here rates any single product as safe in cirrhosis, so tell your care team about everything you take, including products bought without a prescription.`}
];
const NT_CH={pref:'Preferred, with a limit',care:'Use with care',avoid:'Generally avoid'};
inits.nutrition=()=>{
  const svg=$('#ntSvg'),rg=$('#ntT'),note=$('#ntNote');let setSt=()=>{};
  /* fuel segments for a lane: [from, to, state] with state 0 food, 1 glycogen, 2 muscle */
  const segs=L=>{const o=[],M=L.meals;M.forEach((m,i)=>{const nx=i+1<M.length?M[i+1]:24,f=Math.min(nx,m+3);o.push([m,f,0]);
    if(f<nx){const g=Math.min(nx,f+L.gly);o.push([f,g,1]);if(g<nx)o.push([g,nx,2])}});return o};
  const SEG=NT_LANES.map(segs);
  const musH=(i,h)=>SEG[i].reduce((a,s)=>a+(s[2]===2?Math.max(0,Math.min(h,s[1])-s[0]):0),0);
  const glyc=(i,h)=>{const s=SEG[i].find(q=>h>=q[0]&&h<=q[1])||SEG[i][SEG[i].length-1];return s[2]===0?1:s[2]===1?clamp(1-(h-s[0])/NT_LANES[i].gly):0};
  const stateAt=(i,h)=>{const s=SEG[i].find(q=>h>=q[0]&&h<q[1]);return s?s[2]:SEG[i][SEG[i].length-1][2]};
  const since=(i,h)=>{let l=0;NT_LANES[i].meals.forEach(m=>{if(m<=h)l=m});return h-l};
  const COL=['var(--rx)','var(--bile)','var(--bad)'],NAME=['food','liver glycogen','muscle as fuel'];
  const hhmm=h=>{const c=(8+h)%24,hh=Math.floor(c+1e-6),mm=Math.floor((c-hh)*60+1e-6);return String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')};
  function clock(cx,cy,r,h){const A=c=>c/24*2*Math.PI-Math.PI/2,P=(c,rr)=>[cx+rr*Math.cos(A(c)),cy+rr*Math.sin(A(c))];
    const wedge=(c0,c1,rr)=>{const p0=P(c0,rr),p1=P(c1,rr),lg=((c1-c0+24)%24)>12?1:0;return `M${f1(cx)} ${f1(cy)}L${f1(p0[0])} ${f1(p0[1])}A${rr} ${rr} 0 ${lg} 1 ${f1(p1[0])} ${f1(p1[1])}Z`};
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"/>`;
    s+=`<path d="${wedge(22,7,r-2)}" style="fill:var(--brand-soft);opacity:.9"/><text x="${f1(P(2.5,r*.62)[0])}" y="${f1(P(2.5,r*.62)[1]+3)}" class="t-xs t-mid">night</text>`;
    for(let k=0;k<24;k++){const a=P(k,r-2),b=P(k,r-(k%6?6:11));s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:${k%6?1:1.6}"/>`}
    [0,6,12,18].forEach(k=>{const p=P(k,r-22);s+=`<text x="${f1(p[0])}" y="${f1(p[1]+4)}" class="t-sm t-mid">${String(k).padStart(2,'0')}</text>`});
    /* elapsed ring */
    const c=(8+h)%24;if(h>.05){const p0=P(8,r+7),p1=P(c,r+7),lg=h>12?1:0;s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${r+7} ${r+7} 0 ${lg} 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linecap:round;opacity:.75"/>`}
    /* meals on the rim */
    NT_LANES[2].meals.forEach((m,i)=>{const cc=(8+m)%24,p=P(cc,r-2),late=i===4,done=h>=m;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${late?6:5}" style="fill:${done?(late?'var(--brand)':'var(--rx)'):'var(--panel)'};stroke:${late?'var(--brand)':'var(--rx)'};stroke-width:1.8"/>`});
    const ph=P(c,r-16);s+=`<line x1="${cx}" y1="${cy}" x2="${f1(ph[0])}" y2="${f1(ph[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="5" style="fill:var(--ink)"/>`;
    return s}
  function muscle(cx,cy,r0,mh){const r=r0*(1-.04*mh),rr=rng(5);let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r0)}" style="fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:2 3"/>`;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:1.5"/>`;
    for(let k=0;k<7;k++){const a=rr()*6.28,d=r*.55*rr();s+=`<circle cx="${f1(cx+Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d)}" r="${f1(r*.14)}" style="fill:var(--liver-fill);opacity:.45"/>`}
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r0*.18)}" style="fill:var(--scar);stroke:var(--scar-line);stroke-width:1"/>`;
    return s}
  function lane(i,x0,x1,y,h,N){const L=NT_LANES[i],X=v=>lerp(x0,x1,v/24),sh=N?16:18;let s='';
    s+=`<text x="${x0}" y="${y-13}" class="t-lbl" style="${N?'font-size:12px':''}">${L.n}<tspan class="t-sm" style="font-weight:500" dx="6">${L.sub}</tspan></text>`;
    s+=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="${sh}" rx="4" style="fill:var(--panel-2)"/>`;
    SEG[i].forEach(([a,b,st])=>{s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="${sh}" style="fill:${COL[st]};opacity:.16"/>`;
      if(h>a)s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(Math.min(b,h))-X(a))}" height="${sh}" style="fill:${COL[st]};opacity:.85"/>`});
    L.meals.forEach((m,k)=>{const late=k===4;s+=`<path d="M${f1(X(m))} ${y-2}l-4 -6h8z" style="fill:${late?'var(--brand)':'var(--rx)'}"/>`;
      if(late&&i===2)s+=`<text x="${f1(X(m))}" y="${y+sh+12}" class="t-xs t-mid" style="fill:var(--brand)">late snack</text>`});
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${y-4}" y2="${y+sh+4}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    /* glycogen tank and muscle */
    const tx=x1+(N?10:12),th=34,gl=glyc(i,h);
    s+=`<rect x="${tx}" y="${y+sh/2-th/2}" width="11" height="${th}" rx="3" style="fill:var(--panel);stroke:var(--line)"/><rect x="${tx+1.5}" y="${f1(y+sh/2+th/2-1.5-(th-3)*gl)}" width="8" height="${f1((th-3)*gl)}" rx="2" style="fill:var(--bile)"/>`;
    const mx=tx+(N?40:42),r0=N?17:18;
    if(i===0)s+=`<text x="${tx+11}" y="${y+sh/2-th/2-5}" class="t-xs t-end">glycogen</text><text x="${mx}" y="${y+sh/2-th/2-5}" class="t-xs t-mid">muscle</text>`;
    const mh=musH(i,h);s+=muscle(mx,y+sh/2,r0,mh);
    s+=`<text x="${mx}" y="${f1(y+sh/2+r0+12)}" class="t-xs t-mid" style="fill:${mh>.05?'var(--bad)':'var(--muted)'}">${f1(mh)} h on muscle</text>`;
    return s}
  function plank(bx,by,bw,bh,u){const X=m=>bx+bw*m/12,Y=k=>by+bh-bh*k/.6;let s=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" style="fill:var(--field)"/>`;
    [0,.2,.4,.6].forEach(k=>{s+=`<line x1="${bx}" x2="${bx+bw}" y1="${f1(Y(k))}" y2="${f1(Y(k))}" class="${k?'grid':'axis'}"/><text x="${bx-5}" y="${f1(Y(k)+3)}" class="t-xs t-end">${k.toFixed(1)}</text>`});
    [0,3,6,9,12].forEach(m=>{s+=`<text x="${f1(X(m))}" y="${by+bh+14}" class="t-xs t-mid">${m}</text>`});
    s+=`<text x="${bx+bw}" y="${by+bh+28}" class="t-xs t-end">months of supplement</text><text x="${bx}" y="${by-8}" class="t-sm">TOTAL BODY PROTEIN GAIN (kg)</text>`;
    const P=[[0,0],[3,.38],[6,.48],[12,.53]],mu=u*12;let d='',last=P[0];
    for(let k=0;k<P.length;k++){const p=P[k];if(p[0]<=mu){d+=(k?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]));last=p}else{const q=P[k-1],f=(mu-q[0])/(p[0]-q[0]);d+='L'+f1(X(mu))+' '+f1(Y(lerp(q[1],p[1],f)));break}}
    s+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(mu))} ${f1(Y(0))}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/>`;
    if(mu>6)s+=`<text x="${f1(X(12))}" y="${f1(Y(0)-6)}" class="t-xs t-end">daytime: no gain</text>`;
    s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.8;stroke-linejoin:round"/>`;
    P.slice(1).forEach(p=>{if(p[0]>mu)return;s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="4.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.5"/><text x="${f1(X(p[0])-(p[0]===12?6:0))}" y="${f1(Y(p[1])-9)}" class="t-xs ${p[0]===12?'t-end':'t-mid'}" style="fill:var(--brand)">+${p[1].toFixed(2)}</text>`});
    if(mu>=11.9)s+=`<text x="${f1(X(6))}" y="${f1(Y(.25))}" class="t-sm t-mid" style="fill:var(--brand)">night: ≈ 2 kg lean tissue</text>`;
    return s}
  function draw(t){const N=vb(svg,'720 400','400 650'),h=NT_H(t),late=t>NT_END+.01;let s='';
    if(!N){
      if(late)s+=plank(52,62,190,200,ramp(t,.86,.99));
      else{s+=clock(135,150,98,h);
        s+=`<text x="135" y="282" class="t-big t-mid" style="font-size:26px">${hhmm(h)}</text>`;
        s+=`<text x="135" y="304" class="t-xs t-mid">since last food</text><text x="135" y="320" class="t-sm t-mid">${f1(since(1,h))} h without late snack</text><text x="135" y="336" class="t-sm t-mid" style="fill:var(--brand)">${f1(since(2,h))} h with late snack</text>`}
      NT_LANES.forEach((L,i)=>{s+=lane(i,292,618,58+i*100,h,false)});
      const ax=tline(292,338,326,{min:0,max:24,step:4,fmt:v=>String((8+v)%24).padStart(2,'0')});s+=ax.svg;
      let lx=292;NAME.forEach((n,k)=>{s+=`<rect x="${lx}" y="372" width="12" height="9" rx="2" style="fill:${COL[k]}"/><text x="${lx+16}" y="380" class="t-xs">${n}</text>`;lx+=n.length*5.8+36});
    }else{
      if(late)s+=plank(60,44,300,190,ramp(t,.86,.99));
      else{s+=clock(130,124,90,h);
        s+=`<text x="300" y="96" class="t-big t-mid" style="font-size:26px">${hhmm(h)}</text><text x="300" y="122" class="t-xs t-mid">since last food</text><text x="300" y="140" class="t-sm t-mid">${f1(since(1,h))} h, no snack</text><text x="300" y="158" class="t-sm t-mid" style="fill:var(--brand)">${f1(since(2,h))} h, late snack</text>`}
      NT_LANES.forEach((L,i)=>{s+=lane(i,20,288,300+i*96,h,true)});
      const ax=tline(20,566,268,{min:0,max:24,step:6,fmt:v=>String((8+v)%24).padStart(2,'0')});s+=ax.svg;
      let ly=606;NAME.forEach((n,k)=>{const lx=20+k*128;s+=`<rect x="${lx}" y="${ly}" width="12" height="9" rx="2" style="fill:${COL[k]}"/><text x="${lx+16}" y="${ly+8}" class="t-xs">${n}</text>`});
    }
    svg.innerHTML=s;const p=phaseOf(NT_STEPS,t);note.innerHTML=noteHTML(NT_STEPS[p]);setSt(p);
    svg.setAttribute('aria-label',late?'Total body protein gain over 12 months: 0.38 kg at 3 months, 0.48 kg at 6 and 0.53 kg at 12 with a night-time supplement; no gain with the same supplement in the daytime.':`At ${hhmm(h)}: the healthy liver is using ${NAME[stateAt(0,h)]}; cirrhosis without a late snack is using ${NAME[stateAt(1,h)]}; cirrhosis with a late snack is using ${NAME[stateAt(2,h)]}.`)}
  const stop=playWire(rg,$('#ntPlay'),draw,16000,'%t:player.replay%','nutrition');
  setSt=stepWire($('#ntSteps'),NT_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- sarcopenia by Child–Pugh ---- */
  const sv=$('#ntSarc'),DS={t:{n:'Waiting-list cohort',v:[10,34,54],k:'Tandon 2012'},m:{n:'Pooled, 36 studies',v:[33,36,46],k:'Mazeaud 2023'}};
  let ds='t',cur=DS.t.v.slice(),stopS=()=>{};
  function drawS(v){const N=vb(sv,'400 300','400 300')||true,x0=N?44:90,x1=N?384:650,y0=26,y1=N?236:206,Y=p=>lerp(y1,y0,p/60);let s='';
    [0,20,40,60].forEach(p=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(p))}" y2="${f1(Y(p))}" class="${p?'grid':'axis'}"/><text x="${x0-6}" y="${f1(Y(p)+3)}" class="t-xs t-end">${p}%</text>`});
    const gw=(x1-x0)/3,bw=gw*.46;['A','B','C'].forEach((c,i)=>{const cx=x0+gw*(i+.5),hgt=y1-Y(v[i]);
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(Y(v[i]))}" width="${f1(bw)}" height="${f1(hgt)}" rx="5" style="fill:var(--liver-fill);opacity:${f1(.55+i*.18)}"/>`;
      s+=`<text x="${f1(cx)}" y="${f1(Y(v[i])-8)}" class="t-big t-mid" style="font-size:${N?17:20}px">${Math.round(v[i])}%</text>`;
      s+=`<text x="${f1(cx)}" y="${y1+18}" class="t-sm t-mid">Child–Pugh ${c}</text>`});
    s+=`<text x="${x1}" y="${y0-10}" class="t-xs t-end">${DS[ds].n} · ${DS[ds].k}</text><text x="${x0}" y="${y0-10}" class="t-xs">SARCOPENIA</text>`;
    sv.innerHTML=s}
  $$('[data-ntds]').forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.ntds;$$('[data-ntds]').forEach(q=>q.setAttribute('aria-pressed',q===b));
    const from=cur.slice(),to=DS[ds].v;stopS();stopS=animate(600,p=>{const e=ease(p);cur=from.map((f,i)=>lerp(f,to[i],e));drawS(cur)})}));
  drawS(cur);

  /* ---- Liver Frailty Index bands ---- */
  const lv=$('#ntLfi'),lr=$('#ntLfiR'),lo=$('#ntLfiOut');
  const BANDS=[{to:3.2,c:'var(--good)',n:'robust'},{to:4.4,c:'var(--warn)',n:'prefrail'},{to:6,c:'var(--bad)',n:'frail'}];
  function drawL(){const N=vb(lv,'400 190','400 190')||true,v=+lr.value,x0=N?20:40,x1=N?380:680,X=u=>lerp(x0,x1,(u-2)/4),y=N?70:58,hh=N?28:26;let s='',a=2;
    BANDS.forEach(b=>{s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b.to)-X(a))}" height="${hh}" style="fill:${b.c};opacity:.28"/><text x="${f1((X(a)+X(b.to))/2)}" y="${y+hh/2+4}" class="t-sm t-mid" style="fill:${b.c};font-weight:700">${b.n}</text>`;a=b.to});
    [2,3,3.2,4,4.4,5,6].forEach(u=>{s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${y+hh}" y2="${y+hh+5}" class="axis"/><text x="${f1(X(u))}" y="${y+hh+17}" class="t-xs t-mid">${u}</text>`});
    s+=`<line x1="${f1(X(4.5))}" x2="${f1(X(4.5))}" y1="${y-4}" y2="${y+hh+4}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(X(4.5)+4)}" y="${y+hh+32}" class="t-xs">≥4.5 in some cohorts</text>`;
    s+=`<text x="${x0}" y="${y+hh+32}" class="t-xs">AASLD 2021 bands</text>`;
    const mx=X(v);s+=`<path d="M${f1(mx)} ${y-2}l-7 -12h14z" style="fill:var(--ink)"/><text x="${f1(clamp(mx,x0+24,x1-24))}" y="${y-18}" class="t-big t-mid">${v.toFixed(2)}</text>`;
    lv.innerHTML=s;const b=BANDS.find(q=>v<q.to)||BANDS[2];
    lo.innerHTML=`An LFI of <span class="lfiv">${v.toFixed(2)}</span> falls in the AASLD 2021 <b>${b.n}</b> band${v>=4.4&&v<4.5?'; studies that use 4.5 as the cut-off would not yet call it frail':''}. Teaching tool only. [[Lai2021AASLD,Haugen2020]]`}
  lr.addEventListener('input',drawL);drawL();
  const rl=redraws.nutrition;redraws.nutrition=()=>{rl&&rl();drawS(cur);drawL()};

  /* ---- per-kilogram worked example ---- */
  const w=$('#ntW'),as=$('#ntAsc'),oe=$('#ntOed'),out=$('#ntOut');
  function calc(){const kg=clamp(+w.value||0,35,200),cut=(+as.value)+(oe.checked?5:0),dry=kg*(1-cut/100);
    out.innerHTML=`<div><small>Estimated dry weight</small><span class="big-num">${Math.round(dry)} kg</span><small>${cut?`${kg} kg minus ${cut}%`:'no adjustment'}</small></div>`+
      `<div><small>EASL 2019 energy floor (35 kcal/kg)</small><span class="big-num">${Math.round(dry*35).toLocaleString('en')}</span><small>kcal a day or more, in a non-obese person</small></div>`+
      `<div><small>Protein, 1.2–1.5 g/kg</small><span class="big-num">${Math.round(dry*1.2)}–${Math.round(dry*1.5)} g</span><small>a day (AASLD uses ideal body weight)</small></div>`}
  [w,as,oe].forEach(e=>{e.addEventListener('input',calc);e.addEventListener('change',calc)});calc();

  /* ---- medicine sorter ---- */
  const box=$('#ntMeds'),sc=$('#ntMedScore'),pick={};
  box.innerHTML=NT_MEDS.map(m=>`<div class="card med" data-ntmed="${m.id}"><h4>${m.n}</h4><p class="stage-cap" style="margin-top:-4px">${m.s}</p><div class="opts3" role="group" aria-label="How do the sources frame ${m.n}?">${Object.keys(NT_CH).map(c=>`<button class="btn" data-ntc="${c}" aria-pressed="false">${NT_CH[c]}</button>`).join('')}</div><div class="fb" aria-live="polite"></div></div>`).join('');
  function score(){const n=Object.keys(pick).length,ok=NT_MEDS.filter(m=>pick[m.id]===m.ans).length;sc.innerHTML=n?`<span>Sorted <b>${n}</b> of ${NT_MEDS.length}</span><span>Matching the sources: <b>${ok}</b></span>`:`<span>Choose an answer on each card.</span>`}
  box.addEventListener('click',e=>{const b=e.target.closest('[data-ntc]');if(!b)return;const card=b.closest('[data-ntmed]'),m=NT_MEDS.find(q=>q.id===card.dataset.ntmed);
    pick[m.id]=b.dataset.ntc;$$('[data-ntc]',card).forEach(q=>q.setAttribute('aria-pressed',q===b));
    const ok=pick[m.id]===m.ans,fb=$('.fb',card);fb.className='fb '+(ok?'ok':'off');
    fb.innerHTML=`<b>${ok?'Matches the sources':'The sources lean to: '+NT_CH[m.ans]}.</b> ${m.why}`;score()});
  score();

  /* ---- vaccine checklist (kept in this browser only) ---- */
  const vs=store.get('ntvax',{}),vo=$('#ntVaxOut');
  const vupd=()=>{const n=$$('[data-ntvax]').filter(c=>c.checked).length;vo.innerHTML=`<span>Ticked <b>${n}</b> of 3 to discuss</span>`};
  $$('[data-ntvax]').forEach(c=>{c.checked=!!vs[c.dataset.ntvax];c.addEventListener('change',()=>{vs[c.dataset.ntvax]=c.checked;store.set('ntvax',vs);vupd()})});vupd();
};
