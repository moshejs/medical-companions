/* =============== 3.2 Lithium levels, toxicity & interactions =============== */
/* A teaching model, not a dosing tool: a two-compartment, first-order model with the labelled
   half-life (18–36 h, about 24 h in LITHOBID) and labelled time to peak (IR 0.25–3 h, SR 2–6 h),
   twice-daily doses at 08:00 and 20:00, scaled so the steady 12-hour trough (IR, 24 h) is 0.7. */
const LV_STEPS=[
 {from:0,at:.012,k:'Hours 0–12 · the first tablet',t:'Absorption peak',
  txt:`Lithium is reported to be completely absorbed in the upper gut. The peak serum level comes 0.25–3 hours after an immediate-release dose and 2–6 hours after a sustained-release one. [[FDA-Lithium]] Sustained-release forms lower the peak by 30–50% without much change in the total exposure (the area under the curve): switch the tablet type above to compare. [[Grandjean2009PartII]] Lithium spreads through roughly total body water, 0.7–1 L/kg, and barely binds to plasma proteins. [[FDA-Lithium]]`,
  pt:`After a tablet, the blood level rises within a few hours and then slowly falls. Slow-release tablets give a lower, flatter peak.`,
  hook:`Time to peak: immediate release 0.25–3 h, sustained release 2–6 h; sustained release lowers the peak by 30–50%. [[FDA-Lithium,Grandjean2009PartII]]`},
 {from:.07,at:.16,k:'Hours 12–36 · going out',t:'Half-life and the kidney',
  txt:`Lithium is not metabolised. It leaves mainly in the urine, in proportion to its serum level: the glomerulus filters it and about 80% is reabsorbed in the proximal tubule. [[FDA-Lithium]] The elimination half-life is about 18–36 hours in the generic label and "approximately 24 hours" in LITHOBID. [[FDA-Lithium,FDA-Lithobid]] The dashed line shows what one dose alone would do. Clearance falls with age, and rises 30–50% in late pregnancy as filtration rises. [[Grandjean2009PartII]] Try the 18 h and 36 h buttons: with the same doses, slower clearance means a higher level.`,
  pt:`The body does not break lithium down. The kidneys remove it, slowly: with the label's 24-hour half-life, about half of what is in the body leaves in a day.`,
  hook:`Lithium is renally excreted, not metabolised; about 80% of filtered lithium is reabsorbed in the proximal tubule. [[FDA-Lithium]]`},
 {from:.2,at:.29,k:'Each morning · the blood test',t:'The 12-hour trough',
  txt:`The generic label says to draw the level immediately before the next dose, about 12 hours after the previous one, when concentrations are relatively stable, and not to rely on levels alone: assessment must be clinical as well as laboratory. [[FDA-Lithium]] LITHOBID gives a window of 8–12 hours. [[FDA-Lithobid]] For once-daily dosing, a review says the 24-hour level serves as the control value. [[Grandjean2009PartII]] On the curve, a sample taken near a peak would read well above the trough, so it could not be compared with the published ranges.`,
  pt:`The blood test is usually taken about 12 hours after the last dose, often in the morning before that day's dose. Timing matters because the level moves through the day.`,
  hook:`A lithium level means a 12-hour trough, drawn just before the next dose. [[FDA-Lithium,Yatham2018]]`},
 {from:.36,at:.55,k:'Days 1–5 · building up',t:'Steady state in about 5 days',
  txt:`With a 24-hour half-life, each day closes half the remaining gap: troughs reach about 50% of their steady value after 1 day, 75% after 2, 87.5% after 3, 93.75% after 4 and 96.9% after 5. This is a derived calculation from the labelled half-life, not a measured curve. [[FDA-Lithobid]] That is why first levels wait: the generic label checks after 3 days, CANMAT about 5 days after a dose change, and NICE 1 week after starting and after every change. [[FDA-Lithium,Yatham2018,NICE2014CG185]]`,
  pt:`Lithium builds up over several days before the level settles. A test taken too early shows a level that is still climbing.`,
  hook:`About 5 half-lives to steady state; CANMAT checks levels about 5 days after a dose change. [[FDA-Lithium,Yatham2018]]`},
 {from:.62,at:.74,k:'Day 5 onward · steady state',t:'Where the published ranges sit',
  txt:`Quoted as published, not as targets for anyone. NICE: aim for 0.6–0.8 mmol/L in people prescribed lithium for the first time, and consider 0.8–1.0 for at least 6 months after a relapse on lithium. [[NICE2014CG185]] The generic US label titrates to 0.8–1.2 mEq/L for acute manic or mixed episodes and 0.8–1.0 for maintenance. [[FDA-Lithium]] CANMAT: 0.8–1.2 in acute treatment (0.4–0.8 in older adults); 0.6–1 "may be sufficient" for maintenance. [[Yatham2018]] Both US labels give 1.5 mEq/L and above as toxic, "close to the therapeutic range". [[FDA-Lithium,FDA-Lithobid]]`,
  pt:`The level that helps and the level that harms are close together. That is why regular blood tests are part of lithium treatment.`,
  hook:`Narrow therapeutic index: toxic at 1.5 mEq/L or more; NICE's first target is 0.6–0.8 mmol/L. [[FDA-Lithium,NICE2014CG185]]`},
 {from:.82,at:.93,k:'Beyond the blood test',t:'The brain lags, and people differ',
  txt:`Measured by lithium MR spectroscopy, brain lithium is about half the serum level, occasionally 75–80%, and the two correlate only weakly (dashed line, schematic). [[Grandjean2009PartII]] Lithium "may take up to 24 hours to distribute into brain tissue", so toxicity symptoms may appear late. [[FDA-Lithium]] Some people "abnormally sensitive to lithium may exhibit toxic signs" inside the therapeutic range, and older people may show toxicity at levels others tolerate; NICE says neurotoxicity "can occur at therapeutic levels". [[FDA-Lithium,NICE2014CG185]] Suspected toxicity is an emergency.`,
  pt:`A normal blood result does not rule out a problem. How the person feels and what the clinician sees count as much as the number.`,
  hook:`Treat the person, not the number: toxicity can occur at therapeutic levels. [[FDA-Lithium,NICE2014CG185]]`}
];
/* published effects on a steady level: [low, mid, high] multipliers */
const LV_FX={
 thz:{n:'Thiazide',m:[1.25,1.325,1.40],lab:'thiazide +25–40%',
  txt:`Thiazide diuretics have the greatest potential among diuretics to raise lithium: concentrations often rise by 25–40% after a thiazide starts; loop and potassium-sparing diuretics have minor, variable effects. [[Finley1995]] In older adults in Ontario, though, toxicity admissions were linked with starting loop diuretics (RR 5.5), not thiazides. [[Juurlink2004]]`},
 ace:{n:'ACE inhibitor',m:[1.361,1.361,1.361],lab:'ACE inhibitor +36%',
  txt:`In 20 people stable on lithium, starting an ACE inhibitor raised the steady level by 36.1% and cut lithium clearance by 25.5%. [[Finley1996]] In older adults, admissions for toxicity rose within a month of starting one (RR 7.6). [[Juurlink2004]] ARBs (also renin-angiotensin system antagonists) can raise levels too; no size is given, so the chart uses the ACE inhibitor figure. [[FDA-Lithium]]`},
 nsaid:{n:'NSAID',m:[1.17,1.17,1.17],lab:'celecoxib +17%',
  txt:`NSAIDs reduce kidney blood flow and lithium clearance. Indomethacin and piroxicam significantly raise steady levels; the only size in the sources is about 17% for celecoxib 200 mg twice daily in healthy volunteers, used here. [[FDA-Lithium,FDA-Lithobid]] NICE warns people taking lithium not to take over-the-counter NSAIDs. [[NICE2014CG185]]`},
 dehy:{n:'Dehydration',m:[1,1,1],lab:'dehydration: size varies',
  txt:`A low-sodium state raises lithium retention, and protracted sweating, diarrhoea or fever lower tolerance to lithium; volume depletion is a labelled risk factor for toxicity. [[FDA-Lithium,FDA-Lithobid]] No source gives one size for this rise, so the chart shows only its direction. NICE advises seeking medical attention with diarrhoea or vomiting or any acute illness, and keeping up fluids after sweating, in heat or with fever. [[NICE2014CG185]]`}
};
/* explainer bands (mmol/L = mEq/L) */
const LV_BANDS=[
 {a:0,b:.4,v:'maybe',t:'Below the maintenance levels named in the sources',
  txt:`An earlier review placed the minimum efficacious maintenance level at 0.4 mmol/L, with optimal response at 0.6–0.75. [[Severus2008]] In a double-blind trial, 38% relapsed at 0.4–0.6 mmol/L against 13% at 0.8–1.0. [[Gelenberg1989]] An abrupt fall of more than 0.2 mmol/L was linked with a higher relapse risk. [[Severus2008]]`},
 {a:.4,b:.6,v:'yes',t:'0.4–0.6: a lower band',
  txt:`ISBD/IGSLI (2019), for adults: lower the standard 0.60–0.80 to 0.40–0.60 if response is good but tolerance poor. For older adults, most of the panel (not a consensus) endorsed 0.40–0.60 usually. [[Nolen2019]] In the one direct trial, more people relapsed at 0.4–0.6 than at 0.8–1.0 (38% vs 13%), with fewer side effects. [[Gelenberg1989]]`},
 {a:.6,b:.8,v:'yes',t:'0.6–0.8: the usual starting band',
  txt:`NICE: "aim for" 0.6–0.8 mmol/L in people prescribed lithium for the first time. [[NICE2014CG185]] ISBD/IGSLI standard level: 0.60–0.80. [[Nolen2019]] LITHOBID: desirable long-term levels 0.6–1.2 mEq/L. [[FDA-Lithobid]] CANMAT: 0.6–1 "may be sufficient" in maintenance. [[Yatham2018]]`},
 {a:.8,b:1.0,v:'yes',t:'0.8–1.0: a higher maintenance band',
  txt:`NICE: consider 0.8–1.0 mmol/L for a trial of at least 6 months in people who relapsed on lithium before or who have subthreshold symptoms with functional impairment. [[NICE2014CG185]] The generic US label titrates maintenance to 0.8–1.0 mEq/L. [[FDA-Lithium]] ISBD/IGSLI: raise to 0.80–1.00 if response is insufficient and tolerance good. [[Nolen2019]] NICE keeps 3-monthly checks when the last level was 0.8 or higher. [[NICE2014CG185]]`},
 {a:1.0,b:1.2,v:'maybe',t:'1.0–1.2: acute-treatment band',
  txt:`Acute ranges: the generic label titrates to 0.8–1.2 mEq/L for acute manic or mixed episodes; CANMAT gives 0.8–1.2 in acute treatment; LITHOBID says acute-mania doses "normally produce" 1.0–1.5. [[FDA-Lithium,Yatham2018,FDA-Lithobid]] Side effects are more common at higher levels. [[Gelenberg1989]]`},
 {a:1.2,b:1.5,v:'maybe',t:'1.2–1.5: close to the toxic threshold',
  txt:`Above the generic label's acute range (0.8–1.2) and close to the 1.5 mEq/L threshold that both labels call toxic; LITHOBID's acute range reaches 1.5. [[FDA-Lithium,FDA-Lithobid]] In older adults, levels of 1.20–1.25 were overtly toxic in a 2026 review. [[Nunes2026]]`},
 {a:1.5,b:2.0,v:'no',t:'1.5 and above: toxic in both US labels',
  txt:`Both labels give 1.5 mEq/L or more as the toxic concentration. [[FDA-Lithium,FDA-Lithobid]] LITHOBID: mild to moderate toxic reactions may occur at 1.5–2.5 mEq/L; diarrhoea, vomiting, drowsiness, muscle weakness and lack of coordination may be early signs below 2.0. [[FDA-Lithobid]]`},
 {a:2.0,b:3.0,v:'no',t:'2.0 and above: moderate to severe',
  txt:`LITHOBID: moderate to severe reactions at 2.0 mEq/L and above, and levels "should not exceed 2.0" during the acute phase. [[FDA-Lithobid]] In 97 poisonings, severe neurotoxicity was linked with higher peak levels (2.3 vs 1.6 mmol/L). [[Oakley2001]]`},
 {a:3.0,b:4.0,v:'no',t:'Above 3.0: multi-organ toxicity',
  txt:`LITHOBID: above 3.0 mEq/L, a complex multi-organ picture. The generic label: patients "may progress to seizures, coma, and irreversible brain damage". [[FDA-Lithobid,FDA-Lithium]]`},
 {a:4.0,b:5.01,v:'no',t:'Above 4.0: dialysis thresholds',
  txt:`EXTRIP recommends extracorporeal treatment (haemodialysis is preferred) with impaired kidney function and a level above 4.0 mEq/L, and suggests it above 5.0, or with significant confusion, or if the level would take more than 36 hours to fall below 1.0. With reduced consciousness, seizures or dangerous dysrhythmias it is recommended at any level. [[Decker2015]]`}
];

inits.levels=()=>{
  const DT=.1,HMAX=170;const cache={};
  /* two-compartment first-order model; returns {s: serum (scaled), b: brain (schematic)} sampled every 0.1 h */
  function sim(form,th,single){const key=form+th+(single?'s':'');if(cache[key])return cache[key];
    const ka=form==='sr'?.35:2,k12=.3,k21=.3,kel=(1+k12/k21)*Math.LN2/th,dt=.02,n=Math.round(HMAX/dt),every=Math.round(DT/dt);
    let A=0,C=0,P=0;const s=[];
    for(let i=0;i<=n;i++){const t=i*dt;if(i%every===0)s.push(C);
      if((!single||i===0)&&Math.abs(t/12-Math.round(t/12))<1e-6)A+=1;
      const dC=ka*A-k12*C+k21*P-kel*C,dP=k12*C-k21*P;A-=ka*A*dt;C+=dC*dt;P+=dP*dt}
    return cache[key]=s}
  const ref=sim('ir',24),K=.7/ref[Math.round(156/DT)];
  const lvAt=(arr,h)=>arr[clamp(Math.round(h/DT),0,arr.length-1)]*K;
  function brainOf(arr){const b=[];let v=0;for(let i=0;i<arr.length;i++){v+=(.5*arr[i]*K-v)*DT/8;b.push(v)}return b}
  const svg=$('#lvSvg'),rg=$('#lvT');let form='ir',th=24,setSt=()=>{};
  const BANDS=[[.6,.8,'var(--good-soft)','var(--good)','NICE first 0.6–0.8','NICE first 0.6–0.8'],[.8,1,'var(--rx-soft)','var(--rx)','label maint. 0.8–1.0','0.8–1.0'],[1,1.2,'var(--warn-soft)','var(--warn)','label acute ≤1.2','acute to 1.2'],[1.5,2,'var(--bad-soft)','var(--bad)','toxic ≥1.5 (labels)','toxic ≥1.5']];
  function draw(t){
    const N=vb(svg,'720 400','400 462'),H=t*168,ph=phaseOf(LV_STEPS,t);
    const L=N?{x0:40,x1:388,y0:52,y1:392}:{x0:58,x1:578,y0:48,y1:330};
    const X=h=>lerp(L.x0,L.x1,h/168),Y=v=>lerp(L.y1,L.y0,v/2);
    const S=sim(form,th);let s='';
    s+=`<text x="${N?12:20}" y="20" class="t-sm" style="fill:var(--rx);font-weight:600">${N?'SERUM LITHIUM · TEACHING MODEL':'SERUM LITHIUM OVER A WEEK · TEACHING MODEL, NOT A DOSING GUIDE'}</text>`;
    /* bands */
    BANDS.forEach(([a,b,fill,ink,lw,ln])=>{s+=`<rect x="${L.x0}" y="${f1(Y(b))}" width="${L.x1-L.x0}" height="${f1(Y(a)-Y(b))}" style="fill:${fill};opacity:.85"/><line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(a))}" y2="${f1(Y(a))}" style="stroke:${ink};stroke-width:.8;opacity:.6"/>`;
      s+=N?`<text x="${L.x1-4}" y="${f1(Y(a)-4)}" class="t-xs t-end" style="fill:${ink}">${ln}</text>`:`<text x="${L.x1+6}" y="${f1((Y(a)+Y(b))/2+3)}" class="t-xs" style="fill:${ink}">${lw}</text>`});
    /* axes */
    [0,.5,1,1.5,2].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`});
    s+=`<text x="${L.x0-6}" y="${L.y0-8}" class="t-xs t-end" style="fill:var(--ink)">mmol/L</text>`;
    for(let d=0;d<=7;d++){s+=`<line x1="${f1(X(d*24))}" x2="${f1(X(d*24))}" y1="${L.y0}" y2="${L.y1}" class="grid"/>`;if(d<7)s+=`<text x="${f1(X(d*24+12))}" y="${L.y1+15}" class="t-xs t-mid">day ${d+1}</text>`}
    /* doses: pills at 08:00 and 20:00 */
    for(let h=0;h<168;h+=12){const on=h<=H;s+=pill(X(h),L.y1+31,N?10:13,{round:true,col:on?'var(--rx)':'var(--line)'})}
    s+=`<text x="${L.x0-(N?9:11)}" y="${L.y1+34}" class="t-xs t-end">dose</text>`;
    /* ghost: one dose alone */
    if(ph===1){const G=sim(form,th,true);let d='';for(let h=0;h<=72;h+=.5)d+=(h?'L':'M')+f1(X(h))+' '+f1(Y(lvAt(G,h)));
      s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4"/>`;
      const v24=lvAt(G,24),v48=lvAt(G,48);s+=`<circle cx="${f1(X(24))}" cy="${f1(Y(v24))}" r="3.5" style="fill:var(--muted)"/><circle cx="${f1(X(48))}" cy="${f1(Y(v48))}" r="3.5" style="fill:var(--muted)"/><text x="${f1(X(24)+8)}" y="${f1(Y(v24)-12)}" class="t-xs">one dose alone: ${v24.toFixed(2)} → ${v48.toFixed(2)} in ${th} h${th===24?'':' (24 h shown)'}</text>`}
    /* the curve up to H */
    const n=Math.round(H/DT);let d='';for(let i=0;i<=n;i+=2)d+=(i?'L':'M')+f1(X(i*DT))+' '+f1(Y(S[i]*K));
    if(n>0)s+=`<path d="${d}" style="fill:none;stroke:var(--li);stroke-width:2.4;stroke-linejoin:round"/>`;
    /* brain (schematic) */
    if(ph===5){const B=brainOf(S);let bd='';for(let i=0;i<=n;i+=4)bd+=(i?'L':'M')+f1(X(i*DT))+' '+f1(Y(B[i]));s+=`<path d="${bd}" style="fill:none;stroke:var(--hippo);stroke-width:2;stroke-dasharray:6 4"/><text x="${f1(X(Math.min(H,150))-4)}" y="${f1(Y(B[Math.min(n,1500)])+16)}" class="t-xs t-end" style="fill:var(--hippo)">brain: about half, lagging (schematic)</text>`}
    /* trough samples at 08:00 each day, 12 h after the evening dose */
    for(let k=1;k<=7;k++){const h=24*k;if(h>H+.01||h>167)continue;const v=lvAt(S,h);
      s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${f1(Y(v))}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3;opacity:.5"/><path d="M${f1(X(h))} ${f1(Y(v)-11)}q5 6 5 9a5 5 0 0 1-10 0q0-3 5-9Z" style="fill:var(--bad);opacity:.85"/>`;
      if(ph>=2&&ph<=3&&k<=5){const lbl=ph===3?Math.round(100*(1-Math.pow(.5,h/th)))+'%':v.toFixed(2);s+=`<text x="${f1(X(h))}" y="${f1(Y(v)-15)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${lbl}</text>`}
      if(ph>=4&&k===Math.min(7,Math.floor(H/24)))s+=`<text x="${f1(X(h)+(N?-8:8))}" y="${f1(Y(v)+16)}" class="t-xs${N?' t-end':''}" style="fill:var(--ink);font-weight:600">trough ${v.toFixed(2)}</text>`}
    /* first-dose peak note */
    if(ph===0&&H>.3){let im=0;for(let i=1;i<=Math.min(n,119);i++)if(S[i]>S[im])im=i;if(im>0){const pv=S[im]*K;s+=`<text x="${f1(X(im*DT)+8)}" y="${f1(Y(pv)-8)}" class="t-xs" style="fill:var(--ink)">peak ${pv.toFixed(2)} at ${(im*DT).toFixed(1)} h (${form==='sr'?'label: 2–6 h':'label: 0.25–3 h'})</text>`}}
    if(ph===3){[[72,'label: first level after 3 days'],[120,'CANMAT: about 5 days'],[168,'NICE: 1 week']].forEach(([h,l],i)=>{if(H>=h-1)s+=`<text x="${f1(X(h)-3)}" y="${L.y0+12+i*13}" class="t-xs t-end" style="fill:var(--rx)">${l} ▸</text>`})}
    /* playhead */
    const vN=lvAt(S,H);s+=`<line x1="${f1(X(H))}" x2="${f1(X(H))}" y1="${L.y0}" y2="${L.y1}" style="stroke:var(--ink);opacity:.3"/><circle cx="${f1(X(H))}" cy="${f1(Y(vN))}" r="4.5" style="fill:var(--li);stroke:var(--panel);stroke-width:1.5"/>`;
    s+=`<text x="${N?12:20}" y="${N?452:392}" class="t-xs"><tspan style="fill:var(--li)">━ serum</tspan>   <tspan style="fill:var(--bad)">● 12-hour trough sample</tspan>   ${N?'':'1 mmol/L = 1 mEq/L'}</text>`;
    svg.innerHTML=s;setSt(ph);
    const hod=(8+Math.floor(H))%24,ss=Math.round(100*(1-Math.pow(.5,Math.floor(H/24)*24/th)));
    $('#lvRead').innerHTML=`<span>day <b>${Math.min(7,Math.floor(H/24)+1)}</b>, <b>${String(hod).padStart(2,'0')}:${String(Math.floor((H%1)*60)).padStart(2,'0')}</b></span><span>serum (model) <b>${vN.toFixed(2)}</b> mmol/L</span><span>troughs at <b>${ss}%</b> of steady state</span><span>half-life <b>${th} h</b>, ${form==='sr'?'sustained':'immediate'} release</span>`;
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[ph]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,24000,'Replay','levels');
  setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  $$('[data-lvf]').forEach(b=>b.addEventListener('click',()=>{form=b.dataset.lvf;$$('[data-lvf]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-lvh]').forEach(b=>b.addEventListener('click',()=>{th=+b.dataset.lvh;$$('[data-lvh]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- kidney panel ---------- */
  const ks=$('#lvKid'),kr=$('#lvKT'),on={dehy:false,thz:false,ace:false,nsaid:false};
  const R=rng(32),PT=Array.from({length:42},(_,i)=>({o:i/42,r:R(),na:i%3===0,ur:.06+R()*.3}));
  /* tubule polyline (local nephron coordinates, 440 × 330) */
  const TUB=[[118,98],[140,138],[170,148],[200,138],[230,152],[260,138],[290,152],[320,142],[342,150],[342,262],[374,262],[374,176],[408,176],[408,304]];
  const seg=[];let tot=0;for(let i=1;i<TUB.length;i++){const l=Math.hypot(TUB[i][0]-TUB[i-1][0],TUB[i][1]-TUB[i-1][1]);seg.push(l);tot+=l}
  const proxEnd=seg.slice(0,8).reduce((a,b)=>a+b,0)/tot;
  const along=u=>{let d=clamp(u)*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const q=d/seg[i];return [lerp(TUB[i][0],TUB[i+1][0],q),lerp(TUB[i][1],TUB[i+1][1],q)]}d-=seg[i]}return TUB[TUB.length-1]};
  function mult(day,which){/* which 0 low,1 mid,2 high; rise starts on day 4 with a 24 h half-life */
    let m=1;Object.keys(on).forEach(k=>{if(on[k])m*=LV_FX[k].m[which]});if(day<=4)return 1;return 1+(m-1)*(1-Math.pow(.5,(day-4)))}
  function nephron(t,day){const f=1-.2/mult(day,1);let s='';
    s+=`<text x="10" y="40" class="t-xs">blood in</text><line x1="10" y1="64" x2="92" y2="64" style="stroke:var(--kid);stroke-width:7;stroke-linecap:round;opacity:.35"/>`;
    s+=`<circle cx="112" cy="76" r="27" style="fill:none;stroke:var(--kid);stroke-width:1.6"/><circle cx="112" cy="76" r="15" style="fill:var(--kid-soft);stroke:var(--kid);stroke-width:1.2"/><text x="112" y="24" class="t-xs t-mid">glomerulus: filters</text>`;
    s+=`<path d="M132 66L160 108H436" style="fill:none;stroke:var(--kid);stroke-width:7;stroke-linecap:round;opacity:.35"/><text x="436" y="98" class="t-xs t-end">back to the blood →</text>`;
    const tp=TUB.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join('');
    s+=`<path d="${tp}" style="fill:none;stroke:var(--kid-soft);stroke-width:13;stroke-linejoin:round;stroke-linecap:round"/><path d="${tp}" style="fill:none;stroke:var(--kid);stroke-width:1.2;stroke-linejoin:round;opacity:.7"/>`;
    s+=`<rect x="140" y="122" width="200" height="40" rx="8" style="fill:var(--li);opacity:${f1(.05+.12*(f-.8)/.2)}"/>`;
    s+=`<text x="236" y="186" class="t-xs t-mid" style="fill:var(--ink)">proximal tubule: about 80% taken back</text><text x="358" y="284" class="t-xs t-mid">loop</text><text x="400" y="324" class="t-xs t-end" style="fill:var(--ink)">urine ↓${f>.81?' less lithium leaves':''}</text>`;
    s+=ion(16,300,'li',{r:6,txt:false})+`<text x="26" y="303" class="t-xs">lithium</text>`+ion(16,318,'na',{r:6,txt:false})+`<text x="26" y="321" class="t-xs">sodium</text>`;
    PT.forEach(p=>{const u=(t*14+p.o)%1;let x,y;
      if(u<.12){const q=u/.12;x=lerp(10,112,q);y=lerp(64,76,q)}
      else{const v=(u-.12)/.88,back=p.r<f;
        if(back&&v>p.ur*proxEnd/.36){const v0=p.ur*proxEnd/.36,[bx,by]=along(v0),w=(v-v0)/(1-v0);if(w<.18){x=bx;y=lerp(by,108,w/.18)}else{x=lerp(bx,436,(w-.18)/.82);y=108}}
        else [x,y]=along(v)}
      s+=ion(x,y,p.na?'na':'li',{r:6,txt:false,op:.9})});
    return s}
  function kchart(day,x0,x1,y0,y1){const X=d=>lerp(x0,x1,d/14),Y=v=>lerp(y1,y0,v/1.6),base=.7;let s='';
    BANDS.forEach(([a,b,fill,ink,lw,ln])=>{const bb=Math.min(b,1.6);s+=`<rect x="${x0}" y="${f1(Y(bb))}" width="${x1-x0}" height="${f1(Y(a)-Y(bb))}" style="fill:${fill};opacity:.85"/><text x="${x0+4}" y="${f1(Y(a)-4)}" class="t-xs" style="fill:${ink}">${ln}</text>`});
    [0,.4,.8,1.2,1.6].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`});
    [0,4,7,14].forEach(d=>s+=`<text x="${f1(X(d))}" y="${y1+14}" class="t-xs t-mid">${d}</text>`);s+=`<text x="${x1}" y="${y1+27}" class="t-xs t-end">days</text>`;
    s+=`<line x1="${f1(X(4))}" x2="${f1(X(4))}" y1="${y0}" y2="${y1}" style="stroke:var(--ink);stroke-dasharray:3 3;opacity:.45"/><text x="${f1(X(4)+4)}" y="${y1-6}" class="t-xs">change starts</text>`;
    const any=on.thz||on.ace||on.nsaid;
    if(any&&day>4){let lo='',hi='';const N2=40;for(let i=0;i<=N2;i++){const d=4+(day-4)*i/N2;lo+=(i?'L':'M')+f1(X(d))+' '+f1(Y(base*mult(d,0)));}for(let i=N2;i>=0;i--){const d=4+(day-4)*i/N2;hi+='L'+f1(X(d))+' '+f1(Y(base*mult(d,2)))}
      s+=`<path d="${lo}${hi}Z" style="fill:var(--li);opacity:.18"/>`}
    let ln='';const N3=80;for(let i=0;i<=N3;i++){const d=day*i/N3;ln+=(i?'L':'M')+f1(X(d))+' '+f1(Y(base*mult(d,1)))}
    s+=`<path d="${ln}" style="fill:none;stroke:var(--li);stroke-width:2.4"/>`;
    const v=base*mult(day,1);s+=`<circle cx="${f1(X(day))}" cy="${f1(Y(v))}" r="4.5" style="fill:var(--li);stroke:var(--panel);stroke-width:1.5"/>`;
    if(on.dehy&&day>4){const xx=X(day);s+=`<path d="M${f1(xx)} ${f1(Y(v)-8)}V${f1(Y(v)-46)}" style="stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3" marker-end="url(#lvArr)"/><text x="${x0}" y="${y1+27}" class="t-xs" style="fill:var(--bad)">↑ dehydration: rises, size varies</text>`}
    s+=`<text x="${x0}" y="${y0-10}" class="t-sm" style="fill:var(--rx);font-weight:600">STEADY LEVEL (illustrative)</text>`;
    return {svg:s,v}}
  function drawK(t){const N=vb(ks,'720 340','400 600'),day=t*14;let s=`<defs>${marker('lvArr','var(--bad)')}</defs>`;
    s+=N?`<g transform="translate(4 8) scale(.89)">${nephron(t,day)}</g>`:`<g transform="translate(8 6)">${nephron(t,day)}</g>`;
    const C=N?kchart(day,44,384,350,560):kchart(day,488,708,40,292);s+=C.svg;ks.innerHTML=s;
    const act=Object.keys(on).filter(k=>on[k]);
    const m=mult(day,1),pct=Math.round((m-1)*100);
    $('#lvKNote').innerHTML=noteHTML({k:`Day ${f1(day)} · level ≈ ${C.v.toFixed(2)} mmol/L (illustration)${pct?' · +'+pct+'%':''}`,
      t:act.length?act.map(k=>LV_FX[k].n).join(' + '):'Lithium follows sodium',
      txt:act.length?act.map(k=>LV_FX[k].txt).join(' ')+(act.length>1?' Together the chart multiplies the separate figures; no source gives a combined size.':''):`The glomerulus filters lithium, and about 80% of the filtered lithium is reabsorbed by passive diffusion in the proximal tubule; the rest leaves in the urine, in proportion to the serum level. Lithium reduces sodium reabsorption, and a low-sodium state makes the kidney hold on to more lithium, so the labels stress a normal salt intake and, while levels settle, adequate fluid (2500–3000 mL in the generic label). [[FDA-Lithium,FDA-Lithobid]] Switch on a situation or medicine above.`,
      pt:act.length?`Some ordinary medicines and being dried out can push lithium up. Anyone taking lithium is advised to tell every prescriber and pharmacist, and to contact the care team when vomiting, having diarrhoea or unable to drink.`:`The kidney cannot tell lithium from sodium very well. When the body is short of salt or water, it keeps both.`,
      hook:act.length?`Levels rise after a new interacting drug over about 5 half-lives, so the label rechecks levels after starting or stopping diuretics, NSAIDs or renin-angiotensin system antagonists. [[FDA-Lithium]]`:`Lithium is handled like sodium: about 80% of filtered lithium is reabsorbed in the proximal tubule. [[FDA-Lithium]]`})}
  playWire(kr,$('#lvKPlay'),drawK,16000,'Replay','levels');
  $$('[data-lvx]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.lvx;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);if(+kr.value<.55){kr.value=.75}drawK(+kr.value)}));
  drawK(+kr.value);

  /* ---------- level explainer ---------- */
  const gs=$('#lvGauge'),vi=$('#lvVal'),pop=$('#lvPop'),when=$('#lvWhen'),ex=$('#lvExp');
  function gX(v,x0,x1){const w=x1-x0;return v<=2?x0+v/2*w*.7:x0+w*.7+(Math.min(v,5)-2)/3*w*.3}
  function drawG(){const v=+vi.value,N=vb(gs,'720 130','400 150'),x0=N?16:20,x1=N?384:700,yb=N?62:52,bh=22;let s='';
    const vc={yes:'var(--good-soft)',maybe:'var(--warn-soft)',no:'var(--bad-soft)'},ik={yes:'var(--good)',maybe:'var(--warn)',no:'var(--bad)'};
    LV_BANDS.forEach(B=>{s+=`<rect x="${f1(gX(B.a,x0,x1))}" y="${yb}" width="${f1(gX(Math.min(B.b,5),x0,x1)-gX(B.a,x0,x1))}" height="${bh}" style="fill:${vc[B.v]};stroke:var(--panel);stroke-width:1"/>`});
    const old=pop.value!=='adult',up=pop.value==='o80'?.7:.8;
    if(old)s+=`<rect x="${f1(gX(.4,x0,x1))}" y="${yb-6}" width="${f1(gX(up,x0,x1)-gX(.4,x0,x1))}" height="4" rx="2" style="fill:var(--rx)"/><text x="${f1(gX(.4,x0,x1))}" y="${yb-10}" class="t-xs" style="fill:var(--rx)">older-adult range 0.4–${up}</text>`;
    (N?[0,.4,.6,.8,1,1.2,1.5,2,3,4,5]:[0,.2,.4,.6,.8,1,1.2,1.5,2,2.5,3,4,5]).forEach(t=>{const x=gX(t,x0,x1);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${yb+bh}" y2="${yb+bh+5}" class="axis"/><text x="${f1(x)}" y="${yb+bh+(N&&[.6,1,1.5].includes(t)?28:17)}" class="t-xs t-mid">${t}</text>`});
    s+=`<text x="${x1}" y="${yb+bh+(N?44:32)}" class="t-xs t-end">mmol/L = mEq/L (scale compressed above 2)</text>`;
    const mx=gX(v,x0,x1),B=LV_BANDS.find(b=>v>=b.a&&v<b.b)||LV_BANDS[LV_BANDS.length-1];
    s+=`<path d="M${f1(mx)} ${yb-2}l-7 -12h14Z" style="fill:${ik[B.v]}"/><line x1="${f1(mx)}" x2="${f1(mx)}" y1="${yb}" y2="${yb+bh}" style="stroke:var(--ink);stroke-width:2.4"/>`;
    s+=`<text x="${f1(clamp(mx,x0+30,x1-30))}" y="${yb-(old?22:18)}" class="t-lbl t-mid" style="fill:${ik[B.v]}">${v.toFixed(2)}</text>`;
    gs.innerHTML=s;$('#lvValT').textContent=v.toFixed(2);
    let verdict=B.v==='no'?`<div class="verdict no">In the toxic range of the labels. A real result like this is a medical emergency: contact emergency services.</div>`
      :B.v==='maybe'&&v>=1?`<div class="verdict maybe">Above maintenance ranges and nearer the toxic threshold. Clinicians interpret this with symptoms and timing.</div>`
      :B.v==='maybe'?`<div class="verdict maybe">Below the ranges named in the sources. Clinicians interpret this with timing, adherence and how the person is.</div>`
      :`<div class="verdict yes">Inside a band named in a label or guideline. Which band applies to one person is a clinical decision, and toxicity can still occur.</div>`;
    if(old&&v>up&&B.v!=='no')verdict=`<div class="verdict maybe">Above the lower range proposed for older adults (0.4–${up}). A clinician interprets this with symptoms.</div>`;
    let extra='';
    if(old)extra+=`<p><b>Older adults.</b> An ISBD initiative recommends laboratory ranges of 0.4–0.8 mmol/L at ages 60–79 and 0.4–0.7 at 80 and over. [[Shulman2026]] In 14 studies of 8,808 adults aged 60 or older, levels of 0.82–1.00 were linked to more side effects or early toxicity, and 1.20–1.25 were overtly toxic. [[Nunes2026]] CANMAT gives 0.4–0.8 for acute treatment in older adults. [[Yatham2018]] Older patients may show toxicity at levels others tolerate. [[FDA-Lithium]]</p>`;
    if(when.value!=='t12')extra+=`<p><b>Timing.</b> ${when.value==='early'?'A sample taken within a few hours of a dose catches the absorption peak.':'If the timing is not known, the number cannot be placed on the curve.'} The ranges are written for a level drawn immediately before the next dose, about 12 hours after the last (LITHOBID: 8–12 hours), so this value cannot be read against them. [[FDA-Lithium,FDA-Lithobid]]</p>`;
    ex.innerHTML=`<div class="lvval">${v.toFixed(2)}<small>mmol/L</small></div><h4>${B.t}</h4>${verdict}<p>${B.txt}</p>${extra}<p class="stage-cap">Teaching tool only. A level inside any range does not rule out toxicity: some people "abnormally sensitive to lithium may exhibit toxic signs" at therapeutic levels. Symptoms of toxicity need urgent care whatever the number. [[FDA-Lithium]]</p>`}
  vi.addEventListener('input',drawG);pop.addEventListener('change',drawG);when.addEventListener('change',drawG);
  drawG();
  {const prev=redraws.levels;redraws.levels=()=>{prev&&prev();drawG()}}
};
