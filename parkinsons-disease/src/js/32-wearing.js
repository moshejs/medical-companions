/* =============== 3.2 wearing: levodopa over time =============== */
const WR_STEPS=[
 {from:0,at:.05,k:'Year 1',t:'The honeymoon: smooth all day',
  txt:`Early in treatment people notice little change from dose to dose: a sustained benefit called the long-duration response. [[Freitas2017]] In a pooled analysis of 74 publications, motor fluctuations were nil in the first year of levodopa. [[Ahlskog2001]] In the drawing, the blood level still rises and falls with every dose, but the brain\'s stores smooth it into a steady effect.`,
  pt:`In the first years each dose seems to last all day, because the brain can still store dopamine and release it evenly.`,
  hook:`Long-duration response (lasting days) versus short-duration response (hours, around each dose). [[Freitas2017,Nutt2002]]`},
 {from:.25,at:.3,k:'Years 3–5',t:'Wearing-off before the next dose',
  txt:`On average after 2 to 5 years of levodopa the short-duration response matters more, and benefit rises and falls around each dose. [[Freitas2017]] Predictable wearing-off is the most frequent fluctuation; about 40% have fluctuations by 4 to 6 years. [[Freitas2017,Ahlskog2001]] In a continuous-infusion study, wearing-off was put down to loss of dopamine terminals and an "inability to buffer" changes in levodopa supply. [[Mouradian1987]] Half-life and clearance did not differ between people with and without fluctuations. [[Fabbrini1987]]`,
  pt:`Each dose now lasts a few hours. Symptoms creep back before the next one is due.`,
  hook:`Wearing-off is the commonest motor fluctuation. The change is in the brain, not in how the body handles levodopa. [[Freitas2017,Fabbrini1987]]`},
 {from:.5,at:.55,k:'Years 5–10',t:'Peaks bring dyskinesia',
  txt:`Peak-dose dyskinesia is involuntary movement when levodopa action peaks; chorea is the commonest form. [[Freitas2017]] Once terminals are lost, stimulation becomes pulsatile: PET shows sharp rises in striatal dopamine after a dose in advanced Parkinson\'s, matching dyskinesia severity. [[Freitas2017]] Slightly less than 40% have dyskinesia by 4 to 6 years. [[Ahlskog2001]] In STRIDE-PD the risk rose with levodopa dose, and young onset was the strongest predictor. [[WarrenOlanow2013]]`,
  pt:`At the top of each dose there may be extra, wriggling movements. Between doses, stiffness and slowness return.`,
  hook:`Young onset is the strongest predictor of dyskinesia: median 3 years to dyskinesia and fluctuations, against 4–6 years in older onset. [[WarrenOlanow2013,Freitas2017]]`},
 {from:.75,at:.8,k:'Advanced',t:'Sudden offs and a narrow window',
  txt:`Unpredictable "sudden offs" come regardless of dose timing and can develop within seconds. Delayed-on and dose failure are put down mainly to erratic absorption, [[Freitas2017]] including slow stomach emptying. [[Jenner2026]] After 10 years of treatment 80 to 100% have motor complications. [[Freitas2017]] The narrowing window drawn here is widely taught but disputed: in 20 people followed for 4 years, dyskinesia and benefit began and ended together, which the authors judged not consistent with a falling dyskinesia threshold. [[Nutt2010]]`,
  pt:`Late on, the gap between too little and too much is small, and absorption from the gut is less reliable. Steadier delivery is the main tool. Try the infusions.`,
  hook:`Continuous delivery flattens the curve: intestinal gel and foslevodopa each cut off-time by about 1.8 to 1.9 hours a day against oral levodopa. [[Olanow2014,Soileau2022]]`}
];
const WR_RX={
 ir:{t:'Tablets',
  d3:`Immediate-release carbidopa-levodopa three times a day, the label\'s starting schedule. [[LevodopaLabels2026]] The Parkinson\'s Foundation says levodopa works best taken on time, just before the previous dose wears off. [[PFMyths]]`,
  d5:`The same total, split into five smaller doses: lower peaks, shorter gaps. In ADVANCE-PD, people with fluctuations on immediate-release took a mean of 5.0 doses a day. [[Hauser2013]]`},
 ryt:{t:'Rytary',d:`Extended-release capsules: peak about 30% of immediate-release, held for about 4 to 5 hours; fluctuation index about 1.5 against 3.2. [[LevodopaLabels2026]] In ADVANCE-PD, off-time was 1.17 hours a day less than on immediate-release, with 3.6 against 5.0 doses a day. [[Hauser2013]]`},
 crx:{t:'Crexont',d:`Extended-release capsules: after a first peak at about 1 hour, levels hold for about 6 to 7 hours; fluctuation index about 1.7 against 2.7. Week-20 off-time 4.18 against 4.75 hours on immediate-release. [[LevodopaLabels2026]]`},
 sc:{t:'Foslevodopa infusion under the skin',d:`A 24-hour infusion from a small pump. It bypasses the gut, so food does not change absorption. [[LevodopaLabels2026]] Against oral levodopa: good on-time +1.75 hours and off-time −1.79 hours a day. [[Soileau2022]]`},
 lcig:{t:'Intestinal gel',d:`Gel pumped into the jejunum through a PEG-J tube over 16 hours: a morning dose, a continuous dose and extra doses. [[DrugsFDA2026F]] Against oral levodopa: off-time −1.91 hours, good on-time +1.86 hours a day. [[Olanow2014]] Overnight the pump is off, so the level falls.`}
};
const WR_ADD={
 comt:{t:'COMT inhibitor',d:`Entacapone lengthens levodopa\'s half-life from 1.3 to 2.4 hours without changing the peak. [[EnzymeInhibitorLabels2026]] In BIPARK-I, off-time fell 116.8 minutes on opicapone, 96.3 on entacapone and 56.0 on placebo; dyskinesia was the commonest adverse event. [[Ferreira2016]] Started early in STRIDE-PD, entacapone brought dyskinesia sooner (42% against 32% at week 134). [[Stocchi2010]]`},
 maob:{t:'MAO-B inhibitor',d:`Slows dopamine breakdown in the brain, drawn here as a slightly longer, stronger effect. Rasagiline 1 mg cut off-time 1.18 hours against 0.4 on placebo (LARGO). [[Rascol2005]] Safinamide added 0.96 hours of good on-time; dyskinesia was its commonest adverse event (14.6% against 5.5%). [[Schapira2017]]`},
 meal:{t:'Protein-rich lunch',d:`Meals cut the peak by 29% and delayed absorption by 34 minutes in people with fluctuations; protein also competes at the blood-brain barrier, even with intravenous levodopa. [[Nutt1984]] The model applies the oral delay only; infusion absorption is not changed by food. [[LevodopaLabels2026]]`}
};
const WR_INC=[
 {k:'Cited frequencies',t:'From nil to most people',
  txt:`Pooled literature (74 publications): fluctuations nil in year 1 and about 40% by 4 to 6 years; dyskinesia slightly less than 40% by 4 to 6 years. [[Ahlskog2001]] A 2017 review cites about 10% a year, and 80 to 100% after 10 years. It reports a median of 3 years to dyskinesia and fluctuations in young-onset Parkinson\'s against 4 to 6 years in older onset. [[Freitas2017]] Ahlskog notes that these are incidence figures: troublesome complications may be much less common. [[Ahlskog2001]]`,
  pt:`Almost nobody fluctuates in the first year. By ten years, most people have some ups and downs, though often mild.`,
  hook:`Motor complications: about 10% a year; 80–100% after 10 years. [[Freitas2017]]`},
 {k:'Randomised trials',t:'Starting with levodopa or something else',
  txt:`Starting with an agonist gave fewer motor complications: CALM-PD 28% on pramipexole against 51% on levodopa at 23.5 months, [[PSG2000CALM]] and 50.0% against 68.4% at about 6 years; [[PSG2009CALM]] the 056 study 20% dyskinesia on ropinirole against 45% at 5 years. [[Rascol2000]] But levodopa gave more motor benefit (UPDRS 9.2 against 4.5 points) and less sleepiness, and PD MED found small lasting mobility benefits from starting with levodopa. [[PSG2000CALM,PDMED2014]] In STRIDE-PD, adding entacapone from the start raised dyskinesia. [[Stocchi2010]]`,
  pt:`Other first medicines delay the ups and downs a little, but control symptoms less well. Disabling dyskinesia was uncommon either way in the long run.`,
  hook:`CALM-PD at 6 years: disabling dyskinesia uncommon in both groups; Schwab and England ADL similar. [[PSG2009CALM]]`},
 {k:'STRIDE-PD analysis · 745 people',t:'Who is most at risk',
  txt:`Ranked predictors of dyskinesia: young onset, higher levodopa dose, low body weight, North American region, being in the entacapone arm, female sex and worse UPDRS part II. Dyskinesia and wearing-off risk both rose with dose (p<0.001). [[WarrenOlanow2013]] A review also names female sex as a risk factor. [[Freitas2017]]`,
  pt:`People who develop Parkinson\'s young, people on higher doses and lighter people are more likely to get dyskinesia.`,
  hook:`Top predictor of levodopa-induced dyskinesia: young age at onset. [[WarrenOlanow2013]]`}
];
const WR_TX=[
 {k:'Off-time',t:'Hours a day less off',
  txt:`Each bar is the difference against that trial\'s own comparator. Extended-release: Rytary −1.17, [[Hauser2013]] Crexont −0.57 (4.18 against 4.75). [[LevodopaLabels2026]] Add-ons: opicapone −60.8 minutes against placebo; [[Ferreira2016]] rasagiline −1.18 against −0.40. [[Rascol2005]] Infusions: intestinal gel −1.91, [[Olanow2014]] foslevodopa −1.79, [[Soileau2022]] ND0612 −1.40 (not approved in the US), [[Espay2024]] apomorphine −1.89 (TOLEDO) [[Katzenschlager2018]] and −1.65 (Onapgo). [[AgonistLabels2026]]`,
  pt:`Steady delivery by pump cut off-time by almost two hours a day more than the comparison; tablets and add-ons by about half an hour to an hour.`,
  hook:`Several differences are worked out from two arms (marked "by arithmetic"); the trials are not head to head.`},
 {k:'Good on-time',t:'Hours a day more on, without troublesome dyskinesia',
  txt:`Crexont +0.58 (11.35 against 10.77), [[LevodopaLabels2026]] rasagiline +0.82 (0.85 against 0.03), [[Rascol2005]] safinamide +0.96, [[Schapira2017]] ND0612 +1.72 (95% CI 1.08 to 2.36), [[Espay2024]] foslevodopa +1.75, [[Soileau2022]] intestinal gel +1.86, [[Olanow2014]] and deep-brain stimulation +4.5 against best medical therapy (95% CI 3.7 to 5.4). [[Weaver2009]]`,
  pt:`Deep-brain stimulation gave the largest gain in good hours in its trial, but it is surgery, with its own risks.`,
  hook:`VA CSP 468: DBS +4.5 h/day on-time without troubling dyskinesia versus best medical therapy. [[Weaver2009]] See Deep-brain stimulation.`}
];
/* ---- the schematic model ----
   Plasma: one immediate-release dose peaks at 1 h with a 1.5 h half-life (label); a COMT inhibitor gives a 2.4 h fall
   after the peak (label). Extended-release = an immediate part plus a part released steadily for 4.5 h (Rytary) or
   6.5 h (Crexont), matching the label plateaus. Infusions are steady. Brain effect = a short buffer (minutes) plus a
   long-duration store that shrinks with the years. Every threshold and buffer value is illustrative. */
const WR_KE=Math.LN2/1.5,WR_K2=Math.LN2/2.4;
const WR_KA=(()=>{let lo=WR_KE*1.001,hi=60;for(let k=0;k<80;k++){const m=(lo+hi)/2;if(Math.log(m/WR_KE)/(m-WR_KE)>1)lo=m;else hi=m}return(lo+hi)/2})();
const WR_A=1/(Math.exp(-WR_KE)-Math.exp(-WR_KA));
function wrIR(t,c){if(t<=0)return 0;if(c&&t>1)return Math.exp(-WR_K2*(t-1));return WR_A*(Math.exp(-WR_KE*t)-Math.exp(-WR_KA*t))}
function wrER(t,R,c){if(t<=0)return 0;const k=c?WR_K2:WR_KE,z=(1-Math.exp(-WR_KE*Math.min(t,R)))*Math.exp(-k*Math.max(0,t-R))/(1-Math.exp(-WR_KE*R));return .5*wrIR(t,c)+.5*z}
const WR_FORM={ryt:{R:4.5,times:[7,11,15,19]},crx:{R:6.5,times:[7,13,19]}};
const wrThr=y=>({off:.2+.018*y,dys:.6+2.6*Math.exp(-y/3.3)});
function wrSim(o){
  const y=o.y,F=o.form,oral=F==='ir'||F==='ryt'||F==='crx',T=wrThr(y),c=oral&&o.comt;
  const times=F==='ir'?(o.sched===5?[7,10,13,16,19]:[7,12,17]):oral?WR_FORM[F].times:[];
  const amt=F==='ir'&&o.sched===5?.6:1,one=(t,cc)=>F==='ir'?wrIR(t,cc):wrER(t,WR_FORM[F].R,cc);
  const ev=times.map((h,k)=>{let s=0,m=1;const tags=[];
    if(o.meal&&h>=11&&h<=13.5){s+=34/60;m*=.71;tags.push('meal')}
    if(y>=10&&k===1){s+=.75;m*=.85;tags.push('late')}
    if(y>=13&&k===2){m*=.25;tags.push('fail')}
    return{h,at:h+s,a:amt*m,tags}});
  const day=(t,f)=>{const hh=((t%24)+24)%24;let v=0;for(let d=-1;d<=0;d++)v+=f(hh-d*24);return v};
  const oralP=(list,cc)=>t=>day(t,u=>{let v=0;for(const e of list)v+=one(u-e.at,cc)*e.a;return v});
  const lcig=t=>day(t,u=>{const tt=u-7;if(tt<=0)return 0;const lv=1-Math.exp(-Math.min(tt,16)/.6);return .45*wrIR(tt)+(tt<=16?lv:lv*Math.exp(-WR_KE*(tt-16)))});
  const raw=F==='sc'?()=>1:F==='lcig'?lcig:oralP(ev,c);
  const plain=F==='sc'?()=>1:F==='lcig'?lcig:oralP(times.map(h=>({at:h,a:amt})),false);
  /* titration: the plain regimen is scaled so its waking average sits mid-window for that year */
  let m=0,n=0;for(let h=7;h<23;h+=.25){m+=plain(h);n++}m/=n;
  const M=T.off+.5*(Math.min(T.dys,1)-T.off),sc=M/m;
  const b=Math.exp(-y/2.4),tL=6+30*Math.exp(-y/5),tS=o.maob?.42:.35,g=o.maob?1.07:1,dt=1/12;
  let cs=M,cl=M;const P=[],E=[],S=[];
  for(let i=0;i<4*288;i++){const t=i*dt,p=raw(t)*sc;cs+=(p-cs)*dt/tS;cl+=(p-cl)*dt/tL;
    if(i>=3*288){const e=g*(b*cl+(1-b)*cs),h=t-72;let st=e<T.off?0:e>T.dys?2:1;if(oral&&y>=11.5&&h>=15.33&&h<15.83)st=3;P.push(p);E.push(e);S.push(st)}}
  let on=0,dk=0,of=0;S.forEach((st,i)=>{const h=i*dt;if(h>=7&&h<23){if(st===0||st===3)of+=dt;else if(st===2)dk+=dt;else on+=dt}});
  return{P,E,S,on,dk,of,T,ev,b,oral}
}
const WR_L={
 w:{x0:56,x1:604,yT:52,yB:236,dY:244,rb:[252,266],hY:281,buf:302,st:[334,350,368,382],now:[616,52,712,266]},
 n:{x0:34,x1:388,yT:84,yB:260,dY:268,rb:[276,290],hY:305,buf:326,st:[360,378,398,412],now:[8,432,392,590]}
};
const WR_STN=['OFF','ON','DYSKINESIA','SUDDEN OFF'],WR_COL=['var(--bad)','var(--good)','var(--warn)','var(--bad)'];
/* a stick figure: stooped and still when off, upright when on, writhing with dyskinesia */
function wrFig(x,y,k,st,ph,night){const c=night?'var(--muted)':WR_COL[st],w=f1(3.4*k);
  const L=(a,b,c2,d)=>`<path d="M${f1(x+a*k)} ${f1(y+b*k)} L${f1(x+c2*k)} ${f1(y+d*k)}" style="stroke:${c};stroke-width:${w};stroke-linecap:round;fill:none"/>`;
  if(night)return `<g style="opacity:.8"><path d="M${f1(x-34*k)} ${f1(y-4*k)} H${f1(x+34*k)}" style="stroke:var(--line);stroke-width:${f1(6*k)};stroke-linecap:round"/>${L(-24,-12,18,-12)}<circle cx="${f1(x-30*k)}" cy="${f1(y-14*k)}" r="${f1(7*k)}" style="fill:none;stroke:${c};stroke-width:${w}"/><text x="${f1(x+12*k)}" y="${f1(y-26*k)}" class="t-xs" style="fill:var(--muted)">z z</text></g>`;
  if(st===0||st===3){/* stooped, flexed, small steps */
    return `<g>${L(4,-40,-2,-12)+L(-2,-12,-8,14)+L(-2,-12,6,14)+L(4,-36,12,-22)+L(12,-22,10,-12)+L(4,-36,-2,-22)}<circle cx="${f1(x+10*k)}" cy="${f1(y-48*k)}" r="${f1(7*k)}" style="fill:none;stroke:${c};stroke-width:${w}"/></g>`}
  const sw=st===1?Math.sin(ph)*8:0,wr=st===2?1:0;
  const a=wr?Math.sin(ph*1.7)*10:0,b=wr?Math.cos(ph*2.3)*9:0,cc=wr?Math.sin(ph*1.3)*5:0;
  return `<g>${L(0,-42,cc*.4,-12)+L(cc*.4,-12,-8-sw*.6,14)+L(cc*.4,-12,8+sw*.6,14)+L(0,-38,-14-sw+a*.6,-20+b*.5)+L(0,-38,14+sw+b*.6,-22-a*.5)}<circle cx="${f1(x+cc*.3*k)}" cy="${f1(y-50*k)}" r="${f1(7*k)}" style="fill:none;stroke:${c};stroke-width:${w}"/></g>`}
inits.wearing=()=>{
  /* ---------- 1. a day of doses across the years ---------- */
  const svg=$('#wrSvg'),rg=$('#wrT'),hr=$('#wrH');
  const o={form:'ir',sched:3,comt:false,maob:false,meal:false};let cache=null,ck='';
  const sim=y=>{const k=[y.toFixed(3),o.form,o.sched,o.comt,o.maob,o.meal].join();if(k!==ck){ck=k;cache=wrSim({...o,y})}return cache};
  const clock=h=>{const H=Math.floor(h)%24,Mi=Math.floor((h-Math.floor(h))*60/5)*5;return String(H).padStart(2,'0')+':'+String(Mi).padStart(2,'0')};
  function render(){
    const t=+rg.value,hv=+hr.value*24,y=t*15,R=sim(y),T=R.T;
    const N=vb(svg,'720 400','400 600'),L=N?WR_L.n:WR_L.w;
    const X=h=>L.x0+h/24*(L.x1-L.x0),Y=v=>L.yB-Math.min(v,1.5)/1.5*(L.yB-L.yT),pw=L.x1-L.x0;
    const reg=o.form==='ir'?(o.sched===5?'5 smaller doses, tablets':'3 doses, tablets'):WR_RX[o.form].t;
    const adds=(R.oral?['comt','maob'].filter(k=>o[k]).map(k=>({comt:'COMT',maob:'MAO-B'})[k]):[]).concat(o.meal?['protein lunch']:[]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* header and legend */
    const yrTxt=`YEAR ${y.toFixed(1)} WITH PARKINSON'S`;
    if(N){s+=`<text x="${L.x0}" y="20" class="t-big">${yrTxt.replace("WITH PARKINSON'S","")}</text><text x="${L.x0+92}" y="20" class="t-sm">${reg}</text><text x="${L.x0}" y="36" class="t-xs" style="fill:var(--sky)">${adds.length?'+ '+adds.join(', '):'no add-ons'}</text>`}
    else s+=`<text x="${L.x0}" y="22" class="t-big">${yrTxt}</text><text x="${L.x0+292}" y="22" class="t-sm">${reg}</text><text x="712" y="40" class="t-xs t-end" style="fill:var(--sky);font-weight:700">${adds.length?'+ '+adds.join(', '):''}</text>`;
    const lg=[['line','var(--sky)','blood level'],['thick','var(--ink)','effect in the brain'],['box','var(--good-soft)','window'],['box','var(--warn-soft)','dyskinesia'],['box','var(--bad-soft)','off']];
    const lgX=N?[L.x0,L.x0+96,L.x0+234,L.x0,L.x0+96]:[L.x0,L.x0+100,L.x0+240,L.x0+316,L.x0+412],lgY=N?[54,54,54,70,70]:[40,40,40,40,40];
    lg.forEach((q,k)=>{const x=lgX[k],yy=lgY[k];s+=q[0]==='box'?`<rect x="${x}" y="${yy-8}" width="14" height="9" rx="2" style="fill:${q[1]};stroke:var(--line)"/>`:`<path d="M${x} ${yy-4} h16" style="stroke:${q[1]};stroke-width:${q[0]==='thick'?3:1.8}"/>`;s+=`<text x="${x+20}" y="${yy}" class="t-xs">${q[2]}</text>`});
    /* zones */
    const yOff=Y(T.off),yDys=Y(T.dys);
    s+=`<rect x="${L.x0}" y="${f1(yOff)}" width="${pw}" height="${f1(L.yB-yOff)}" style="fill:var(--bad-soft);opacity:.75"/>`;
    s+=`<rect x="${L.x0}" y="${f1(yDys)}" width="${pw}" height="${f1(yOff-yDys)}" style="fill:var(--good-soft);opacity:.8"/>`;
    if(T.dys<1.5)s+=`<rect x="${L.x0}" y="${L.yT}" width="${pw}" height="${f1(yDys-L.yT)}" style="fill:var(--warn-soft);opacity:.85"/>`;
    /* night */
    [[0,7],[23,24]].forEach(([a,b2])=>{s+=`<rect x="${f1(X(a))}" y="${L.yT}" width="${f1(X(b2)-X(a))}" height="${L.yB-L.yT}" style="fill:var(--panel-2);opacity:.7"/>`});
    s+=`<text x="${f1(X(3.5))}" y="${L.yT+14}" class="t-xs t-mid">asleep</text>`;
    /* thresholds: now, and year 0 as a ghost */
    s+=`<path d="M${L.x0} ${f1(yOff)} H${L.x1}" style="stroke:var(--bad);stroke-width:1.6"/>`;
    if(T.dys<1.5)s+=`<path d="M${L.x0} ${f1(yDys)} H${L.x1}" style="stroke:var(--warn);stroke-width:1.6"/>`;
    const T0=wrThr(0),lab=(x,yy,txt,c,anc)=>{const w=txt.length*5.8+6,xa=anc==='end'?x-w+3:x-3;return `<rect x="${f1(xa)}" y="${f1(yy-9)}" width="${f1(w)}" height="12" rx="3" style="fill:var(--field);opacity:.85"/><text x="${f1(x)}" y="${f1(yy)}" class="t-xs ${anc==='end'?'t-end':''}" style="fill:${c};font-weight:700">${txt}</text>`};
    if(y>1)s+=`<path d="M${L.x0} ${f1(Y(T0.off))} H${L.x1}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4"/>`+lab(X(23)-4,Y(T0.off)+12,'year-0 off line','var(--muted)','end');
    s+=lab(L.x0+6,yOff+12,'off below this line','var(--bad)');
    s+=T.dys<1.5?lab(L.x0+6,yDys-4,'dyskinesia above this line','var(--warn)'):`<text x="${L.x1-4}" y="${L.yT+12}" class="t-xs t-end" style="fill:var(--warn)">dyskinesia line: above the chart ↑</text>`;
    /* curves */
    const dt=1/12;let dp='',de='';R.P.forEach((v,i)=>{dp+=(i?'L':'M')+f1(X(i*dt))+' '+f1(Y(v))});R.E.forEach((v,i)=>{de+=(i?'L':'M')+f1(X(i*dt))+' '+f1(Y(v))});
    s+=`<path d="${dp}L${L.x1} ${L.yB}L${L.x0} ${L.yB}Z" style="fill:var(--sky-soft);opacity:.55"/><path d="${dp}" style="fill:none;stroke:var(--sky);stroke-width:1.8"/>`;
    s+=`<path d="${de}" style="fill:none;stroke:var(--ink);stroke-width:2.8;stroke-linejoin:round"/>`;
    s+=`<path d="M${L.x0} ${L.yT} V${L.yB} H${L.x1}" class="axis"/>`;
    s+=`<text transform="translate(${L.x0-10} ${(L.yT+L.yB)/2}) rotate(-90)" class="t-xs t-mid">${N?'level':'level (schematic)'}</text>`;
    /* doses */
    if(R.oral)R.ev.forEach(e=>{const x=X(e.h),fail=e.tags.includes('fail');s+=`<rect x="${f1(x-6)}" y="${L.dY-4}" width="12" height="7" rx="3.5" style="fill:${fail?'var(--panel)':'var(--sky)'};stroke:var(--sky);stroke-width:1.2"/>`});
    else{const a=o.form==='sc'?0:7,b2=o.form==='sc'?24:23;s+=`<path d="M${f1(X(a))} ${L.dY} H${f1(X(b2))}" style="stroke:var(--sky);stroke-width:4;stroke-linecap:round"/><text x="${f1(X(o.form==='sc'?12:15))}" y="${L.dY-6}" class="t-xs t-mid" style="fill:var(--sky)">${o.form==='sc'?'pump running 24 h':'pump running 16 h'}</text>`;
      if(o.form==='lcig')s+=`<circle cx="${f1(X(7))}" cy="${L.dY}" r="4.5" style="fill:var(--sky)"/>`}
    if(o.meal){const x=X(12.5);s+=`<path d="M${f1(x)} ${L.yT+16} V${L.yB}" style="stroke:var(--sage);stroke-dasharray:2 3"/>`}
    /* ribbon: merge runs of the same state */
    const rb=L.rb;let i0=0;const runs=[];for(let i=1;i<=R.S.length;i++){if(i===R.S.length||R.S[i]!==R.S[i0]){runs.push([i0,i,R.S[i0]]);i0=i}}
    runs.forEach(([a,b2,st])=>{const xa=X(a*dt),xb=X(b2*dt);s+=`<rect x="${f1(xa)}" y="${rb[0]}" width="${f1(xb-xa)}" height="${rb[1]-rb[0]}" style="fill:${WR_COL[st]}"/>`;
      const mid=(a+b2)/2*dt,awake=mid>=7&&mid<23;if(awake&&(b2-a)*dt>(N?2.6:1.6))s+=`<text x="${f1((xa+xb)/2)}" y="${rb[1]-3.5}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${['off','on','dyskinesia','off'][st]}</text>`});
    [[0,7],[23,24]].forEach(([a,b2])=>{s+=`<rect x="${f1(X(a))}" y="${rb[0]}" width="${f1(X(b2)-X(a))}" height="${rb[1]-rb[0]}" style="fill:var(--field);opacity:.72"/>`});
    s+=`<text x="${L.x0-4}" y="${rb[1]-3}" class="t-xs t-end">${N?'':'state'}</text>`;
    (N?[0,6,12,18,24]:[0,3,6,9,12,15,18,21,24]).forEach(h=>{s+=`<text x="${f1(X(h))}" y="${L.hY}" class="t-xs ${h===0?'':h===24?'t-end':'t-mid'}">${String(h).padStart(2,'0')}:00</text>`});
    /* events above the curve */
    const evs=[];
    if(R.oral){R.ev.forEach(e=>{if(e.tags.includes('late'))evs.push([e.at,'delayed-on','var(--warn)']);if(e.tags.includes('fail'))evs.push([e.h+.6,'no-on','var(--bad)'])});
      if(y>=11.5)evs.push([15.55,'sudden off','var(--bad)'])}
    if(o.meal)evs.push([12.5,'protein lunch','var(--sage)']);
    const wo=runs.find(([a,b2,st])=>st===0&&a*dt>8.5&&a*dt<22&&R.oral);if(wo&&y>2)evs.push([(wo[0]+wo[1])/2*dt,'wearing-off','var(--bad)']);
    const dk=runs.find(([a,b2,st])=>st===2&&a*dt>7);if(dk)evs.push([(dk[0]+dk[1])/2*dt,'peak-dose dyskinesia','var(--warn)']);
    evs.sort((p,q)=>p[0]-q[0]);const lastX=[-999,-999,-999];
    evs.forEach(([h,l,c])=>{const w=l.length*5.8+6,x=clamp(X(h),L.x0+w/2,L.x1-w/2);let row=lastX.findIndex(v=>x-w/2>v+4);if(row<0)row=lastX.indexOf(Math.min(...lastX));lastX[row]=x+w/2;const yy=L.yT+28+row*13;
      s+=`<rect x="${f1(x-w/2)}" y="${yy-9}" width="${f1(w)}" height="12" rx="3" style="fill:var(--field);opacity:.85"/><text x="${f1(x)}" y="${yy}" class="t-xs t-mid" style="fill:${c};font-weight:700">${l}</text>`});
    /* cursor */
    const ih=Math.min(287,Math.round(hv/dt)),stNow=R.S[ih],night=hv<7||hv>=23,xc=X(hv);
    s+=`<path d="M${f1(xc)} ${L.yT} V${rb[1]+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.55"/><circle cx="${f1(xc)}" cy="${f1(Y(R.E[ih]))}" r="5" style="fill:${WR_COL[stNow]};stroke:var(--panel);stroke-width:2"/>`;
    /* storage buffer */
    const bw=N?160:260,bx=L.x0+(N?150:250);
    s+=`<text x="${L.x0}" y="${L.buf+8}" class="t-xs" style="font-weight:700">${N?'STORAGE BUFFER':'STORAGE BUFFER · long-duration response'}</text>`;
    s+=`<rect x="${bx}" y="${L.buf}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${L.buf}" width="${f1(Math.max(4,bw*R.b))}" height="10" rx="5" style="fill:var(--amber)"/>`;
    s+=`<text x="${bx+bw+8}" y="${L.buf+8}" class="t-xs">${R.b>.6?'large':R.b>.2?'shrinking':'small'}</text>`;
    /* cited frequency strip */
    const S0=L.st,Xy=v=>L.x0+v/15*pw;
    s+=`<text x="${L.x0}" y="${S0[0]}" class="t-xs" style="font-weight:700">${N?'YEARS ON LEVODOPA · cited':'YEARS ON LEVODOPA · cited frequencies of motor complications'}</text>`;
    s+=`<path d="M${L.x0} ${S0[2]} H${L.x1}" class="axis"/>`;
    [0,3,6,9,12,15].forEach(v=>{s+=`<path d="M${f1(Xy(v))} ${S0[2]} v4" class="axis"/><text x="${f1(Xy(v))}" y="${S0[3]}" class="t-xs t-mid">${v}</text>`});
    const ann=[[1,1,N?'nil':'nil in year 1','var(--good)'],[4,6,N?'≈40%':'about 40% fluctuate','var(--warn)'],[10,15,N?'80–100%':'80–100% have complications','var(--bad)']];
    ann.forEach(([a,b2,l,c])=>{const xa=Xy(a),xb=Xy(b2);s+=a===b2?`<circle cx="${f1(xa)}" cy="${S0[2]-6}" r="3.5" style="fill:${c}"/>`:`<rect x="${f1(xa)}" y="${S0[2]-9}" width="${f1(xb-xa)}" height="6" rx="3" style="fill:${c};opacity:.8"/>`;
      s+=`<text x="${f1((xa+xb)/2)}" y="${S0[1]}" class="t-xs t-mid" style="fill:${c}">${l}</text>`});
    s+=`<path d="M${f1(Xy(y))} ${S0[2]+1} l-5 8 h10 z" style="fill:var(--ink)"/>`;
    /* now panel */
    const Q=L.now,ph=hv*9;
    s+=`<rect x="${Q[0]}" y="${Q[1]}" width="${Q[2]-Q[0]}" height="${Q[3]-Q[1]}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const stTxt=night?'ASLEEP':WR_STN[stNow],stCol=night?'var(--muted)':WR_COL[stNow];
    const why=night?'outside the waking day':stNow===3?'regardless of the dose':stNow===2?'level above the dyskinesia line':stNow===0?'level below the off line':'inside the window';
    if(N){s+=`<text x="${Q[0]+14}" y="${Q[1]+22}" class="t-xs" style="font-weight:700">AT THIS HOUR</text><text x="${Q[0]+14}" y="${Q[1]+58}" class="t-big" style="font-size:30px">${clock(hv)}</text>`;
      s+=`<text x="${Q[0]+14}" y="${Q[1]+98}" class="t-big" style="fill:${stCol}">${stTxt}</text><text x="${Q[0]+14}" y="${Q[1]+118}" class="t-xs">${why}</text>`;
      s+=`<text x="${Q[0]+14}" y="${Q[1]+142}" class="t-xs">${o.form==='ir'||R.oral?'drag the hour or play the day':'pump: steady level'}</text>`;
      s+=wrFig(Q[2]-80,Q[3]-26,1.45,stNow,ph,night)}
    else{const cx=(Q[0]+Q[2])/2;s+=`<text x="${cx}" y="${Q[1]+18}" class="t-xs t-mid" style="font-weight:700">AT THIS HOUR</text><text x="${cx}" y="${Q[1]+46}" class="t-big t-mid" style="font-size:22px">${clock(hv)}</text>`;
      s+=wrFig(cx,Q[1]+150,1.25,stNow,ph,night);
      s+=`<text x="${cx}" y="${Q[1]+184}" class="t-lbl t-mid" style="fill:${stCol};font-size:${stTxt.length>8?11:13}px">${stTxt}</text>`;
      const w2=why.split(' '),half=Math.ceil(w2.length/2);s+=`<text x="${cx}" y="${Q[1]+200}" class="t-xs t-mid">${w2.slice(0,half).join(' ')}</text><text x="${cx}" y="${Q[1]+211}" class="t-xs t-mid">${w2.slice(half).join(' ')}</text>`}
    svg.innerHTML=s;
    /* note, readout, caption */
    const p=phaseOf(WR_STEPS,t);setSt(p);
    const rx=o.form==='ir'?(o.sched===5?WR_RX.ir.d5:WR_RX.ir.d3):WR_RX[o.form].d;
    const extra=['comt','maob','meal'].filter(k=>o[k]&&(k==='meal'||R.oral)).map(k=>`<div><dt>${WR_ADD[k].t}</dt><dd>${WR_ADD[k].d}</dd></div>`).join('');
    const offInf=!R.oral&&(o.comt||o.maob)?`<div><dt>Add-ons</dt><dd>The tablet add-ons are not drawn with the pumps.</dd></div>`:'';
    $('#wrNote').innerHTML=noteHTML(WR_STEPS[p])+`<div class="kv"><div><dt>This regimen: ${reg}</dt><dd>${rx}</dd></div>${extra}${offInf}</div>`;
    $('#wrRead').innerHTML=`<span>at ${clock(hv)} <b style="color:${stCol}">${stTxt.toLowerCase()}</b></span><span>on, no troublesome dyskinesia <b>${f1(R.on)} h</b></span><span>on with dyskinesia <b>${f1(R.dk)} h</b></span><span>off <b>${f1(R.of)} h</b></span><span>of a 16-hour waking day · schematic estimate</span>`;
    rg.setAttribute('aria-valuetext',`Year ${y.toFixed(1)} with Parkinson's. Step ${p+1} of ${WR_STEPS.length}: ${WR_STEPS[p].t}. Schematic estimate: on ${f1(R.on)} hours, on with dyskinesia ${f1(R.dk)}, off ${f1(R.of)}.`);
    hr.setAttribute('aria-valuetext',`${clock(hv)}, ${stTxt.toLowerCase()}`);
  }
  const drawY=()=>render(),drawH=()=>render();
  const stop=playWire(rg,$('#wrPlay'),drawY,20000,'Replay','wearing');
  const stopH=playWire(hr,$('#wrDay'),drawH,12000,'Replay','wearing');
  const setSt=stepWire($('#wrSteps'),WR_STEPS,rg,drawY,stop);
  $('#wrCap').innerHTML=`Schematic. The window, the buffer and every curve height are drawn for illustration: no published window widths were found, and the narrowing-window idea is disputed. [[Nutt2010]] Curve shapes use the cited half-life (about 1.5 hours with carbidopa) and label peak times. [[LevodopaLabels2026]] In the model each regimen is titrated to the same average level for that year; add-ons and meals then act on top, and levodopa starts at diagnosis. The hours are schematic estimates, not trial results; for those, see below.`;
  const syncB=()=>{$$('[data-wrf]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.wrf===o.form));$$('[data-wrs]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.wrs===o.sched&&o.form==='ir'));
    $$('[data-wra]').forEach(x=>x.setAttribute('aria-pressed',!!o[x.dataset.wra]))};
  $$('[data-wrf]').forEach(b=>b.addEventListener('click',()=>{o.form=b.dataset.wrf;syncB();render()}));
  $$('[data-wrs]').forEach(b=>b.addEventListener('click',()=>{o.sched=+b.dataset.wrs;o.form='ir';syncB();render()}));
  $$('[data-wra]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.wra;o[k]=!o[k];if(k!=='meal'&&o[k]&&!['ir','ryt','crx'].includes(o.form))o.form='ir';syncB();render()}));

  /* ---------- 2. how often, and in whom ---------- */
  const is=$('#wrInc'),ir=$('#wrIncT');let iv=0;
  function drawInc(t){
    const N=vb(is,'720 380','400 '+[470,600,560][iv]);let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(iv===0){
      const x0=N?44:70,x1=N?380:640,y0=N?50:46,y1=N?330:320,X=v=>lerp(x0,x1,v/12),Y=v=>lerp(y1,y0,v/100);
      s+=`<text x="20" y="24" class="t-sm">${N?'% WITH COMPLICATIONS, BY YEARS ON LEVODOPA':'PEOPLE WITH MOTOR COMPLICATIONS, BY YEARS ON LEVODOPA (CITED POINTS ONLY)'}</text>`;
      [0,20,40,60,80,100].forEach(v=>{s+=`<path d="M${x0} ${f1(Y(v))} H${x1}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`});
      [0,2,4,6,8,10,12].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${y1+16}" class="t-xs t-mid">${v}</text>`});
      s+=`<text x="${x1}" y="${y1+30}" class="t-xs t-end">years</text><path d="M${x0} ${y0} V${y1} H${x1}" class="axis"/>`;
      const it=(k,f)=>{const q=ease(ramp(t,k*.14,k*.14+.2));if(q>0)s+=`<g style="opacity:${f1(q)}">${f(q)}</g>`};
      it(0,q=>`<path d="M${f1(X(0))} ${f1(Y(0))} L${f1(X(10*q))} ${f1(Y(100*q))}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4"/><text x="${f1(X(7.4))}" y="${f1(Y(78))}" class="t-xs t-end">about 10% a year (review)</text>`);
      it(1,()=>`<circle cx="${f1(X(1))}" cy="${f1(Y(0))}" r="6" style="fill:var(--good)"/><text x="${f1(X(1)+10)}" y="${f1(Y(0)-8)}" class="t-xs" style="fill:var(--good);font-weight:700">nil in year 1</text>`);
      it(2,q=>`<path d="M${f1(X(4))} ${f1(Y(40))} H${f1(X(lerp(4,6,q)))}" style="stroke:var(--sky);stroke-width:7;stroke-linecap:round"/><text x="${f1(X(6)+10)}" y="${f1(Y(40)-4)}" class="t-xs" style="fill:var(--sky);font-weight:700">fluctuations about 40%</text>`);
      it(3,q=>`<path d="M${f1(X(4))} ${f1(Y(34))} H${f1(X(lerp(4,6,q)))}" style="stroke:var(--warn);stroke-width:7;stroke-linecap:round"/><text x="${f1(X(6)+10)}" y="${f1(Y(34)+8)}" class="t-xs" style="fill:var(--warn);font-weight:700">dyskinesia: slightly under 40%</text>`);
      it(4,()=>`<rect x="${f1(X(10))}" y="${f1(Y(100))}" width="${f1(X(12)-X(10))}" height="${f1(Y(80)-Y(100))}" rx="4" style="fill:var(--bad-soft);stroke:var(--bad)"/><text x="${f1(X(10)-6)}" y="${f1(Y(92))}" class="t-xs t-end" style="fill:var(--bad);font-weight:700">80–100% after 10 years</text>`);
      it(5,()=>`<circle cx="${f1(X(3))}" cy="${f1(Y(50))}" r="6" style="fill:var(--violet)"/><path d="M${f1(X(4))} ${f1(Y(50))} H${f1(X(6))}" style="stroke:var(--violet);stroke-width:3;stroke-dasharray:3 3"/><text x="${f1(X(3))}" y="${f1(Y(50)-12)}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">young onset: median 3 y</text><text x="${f1(X(6)+8)}" y="${f1(Y(50)+4)}" class="t-xs" style="fill:var(--violet)">older onset: 4–6</text>`);
      if(N)s+=`<text x="20" y="${y1+52}" class="t-xs">Points and bars from a pooled analysis and a review;</text><text x="20" y="${y1+66}" class="t-xs">no curve is fitted between them.</text>`;
    }else if(iv===1){
      const rows=[['CALM-PD','23.5 months · any motor complication',[['levodopa',51],['pramipexole',28]]],['STRIDE-PD','week 134 · dyskinesia',[['with entacapone',42],['levodopa alone',32]]],['056 study','5 years · dyskinesia',[['levodopa',45],['ropinirole',20]]],['CALM-PD, extended','about 6 years · any complication',[['levodopa',68.4],['pramipexole',50.0]]]];
      const x0=N?20:250,x1=N?330:620,rh=N?128:76,y0=N?54:50;
      s+=`<text x="20" y="24" class="t-sm">${N?'% WITH COMPLICATIONS, BY FIRST TREATMENT':'% WITH MOTOR COMPLICATIONS IN RANDOMISED TRIALS, BY STARTING TREATMENT'}</text>`;
      rows.forEach((r,i)=>{const yy=y0+i*rh+(N?36:0),q=ease(ramp(t,i*.15,i*.15+.3));
        if(N)s+=`<text x="20" y="${yy-20}" class="t-lbl">${r[0]}</text><text x="20" y="${yy-6}" class="t-xs">${r[1]}</text>`;
        else s+=`<text x="20" y="${yy+12}" class="t-lbl">${r[0]}</text><text x="20" y="${yy+26}" class="t-xs">${r[1]}</text>`;
        r[2].forEach(([nm,v],j)=>{const by=yy+j*(N?40:26),c=j?'var(--muted)':'var(--sky)';
          s+=`<rect x="${x0}" y="${by}" width="${f1(Math.max(1,(x1-x0)*v/100*q))}" height="${N?14:16}" rx="3" style="fill:${c};opacity:${j?.55:1}"/>`;
          s+=N?`<text x="${x0}" y="${by+26}" class="t-xs">${nm}</text>`:`<text x="${x0-8}" y="${by+12}" class="t-xs t-end">${nm}</text>`;
          if(q>.6)s+=`<text x="${f1(x0+(x1-x0)*v/100+6)}" y="${by+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${v}%</text>`})});
    }else{
      const pr=['Young onset','Higher levodopa dose','Low body weight','North American region','Entacapone arm','Female sex','Worse UPDRS part II'];
      s+=`<text x="20" y="24" class="t-sm">${N?'STRIDE-PD: PREDICTORS OF DYSKINESIA':'STRIDE-PD (745 PEOPLE): PREDICTORS OF DYSKINESIA, IN RANK ORDER'}</text>`;
      const rh=N?30:34,y0=48;
      pr.forEach((l,i)=>{const q=ease(ramp(t,i*.07,i*.07+.2)),yy=y0+i*rh;s+=`<g style="opacity:${f1(q)}"><circle cx="${32}" cy="${yy+6}" r="11" style="fill:${i?'var(--panel)':'var(--warn-soft)'};stroke:var(--warn);stroke-width:1.5"/><text x="32" y="${yy+10}" class="t-xs t-mid" style="font-weight:700;fill:var(--ink)">${i+1}</text><text x="52" y="${yy+10}" class="t-lbl">${l}</text></g>`});
      /* dose groups */
      const gx=N?20:400,gy=N?300:62,gw=N?360:300,gh=N?190:250,groups=[['<400',157],['400',310],['401–600',201],['>600',77]];
      if(t>.5){s+=`<g style="opacity:${f1(ramp(t,.5,.6))}"><text x="${gx}" y="${gy}" class="t-sm">LEVODOPA DOSE GROUPS, MG/DAY</text>`;
        const bw=gw/4-14,base=gy+gh-30;groups.forEach(([l,n],k)=>{const q=ease(ramp(t,.55+k*.08,.75+k*.08)),h=(gh-80)*n/310*q,x=gx+k*(gw/4);
          s+=`<rect x="${f1(x)}" y="${f1(base-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:var(--sky);opacity:${f1(.45+k*.18)}"/><text x="${f1(x+bw/2)}" y="${f1(base-h-6)}" class="t-xs t-mid" style="fill:var(--ink)">n=${n}</text><text x="${f1(x+bw/2)}" y="${base+14}" class="t-xs t-mid">${l}</text>`});
        s+=`<path d="M${gx} ${gy+22} H${gx+gw-20}" class="arrow" marker-end="url(#wrA)"/><text x="${gx}" y="${gy+16}" class="t-xs" style="fill:var(--warn);font-weight:700">risk of dyskinesia and wearing-off rose with dose, p&lt;0.001</text>`;
        s+=`<text x="${gx}" y="${base+30}" class="t-xs">bar height = number of people in each group</text></g>`}
    }
    is.innerHTML=`<defs>${marker('wrA','var(--muted)')}</defs>`+s;
    $('#wrIncNote').innerHTML=noteHTML(WR_INC[iv]);
    $('#wrIncCap').textContent=['Published points and ranges only; nothing is fitted between them. Years are years of levodopa treatment.','Percent of each arm with the outcome named on the left, at the time shown. Comparator arms in grey.','Predictors are listed in the order the STRIDE-PD analysis ranked them; group sizes are the numbers analysed.'][iv];
    ir.setAttribute('aria-valuetext',['Over the years','In trials','Who is at risk'][iv]+', '+Math.round(t*100)+'% revealed');
  }
  const stopI=playWire(ir,$('#wrIncPlay'),drawInc,8000,'Replay','wearing');
  $$('[data-wri]').forEach(b=>b.addEventListener('click',()=>{iv=+b.dataset.wri;$$('[data-wri]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopI();ir.value=0;drawInc(0);$('#wrIncPlay').click()}));

  /* ---------- 3. what smooths the curve: trial differences ---------- */
  const xs=$('#wrTx'),xr=$('#wrTxT');let xv=0;
  /* kind: o oral or add-on, i infusion, s surgery; ar = difference worked out from two arms */
  const TX=[
   [['Crexont','vs immediate-release',.57,'o',1],['Rasagiline (LARGO)','vs placebo',.78,'o',1],['Opicapone 50 mg (BIPARK-I)','vs placebo',1.01,'o',1],['Rytary (ADVANCE-PD)','vs immediate-release',1.17,'o'],['ND0612 · not approved in US','vs oral levodopa',1.40,'i'],['Apomorphine infusion (Onapgo)','vs placebo',1.65,'i',1],['Foslevodopa','vs oral levodopa',1.79,'i'],['Apomorphine infusion (TOLEDO)','vs placebo',1.89,'i',1],['Intestinal gel (LCIG)','vs oral levodopa',1.91,'i']],
   [['Crexont','vs immediate-release',.58,'o',1],['Rasagiline (LARGO)','vs placebo',.82,'o',1],['Safinamide (SETTLE)','vs placebo',.96,'o'],['ND0612 · not approved in US','vs oral levodopa',1.72,'i',0,1.08,2.36],['Foslevodopa','vs oral levodopa',1.75,'i'],['Intestinal gel (LCIG)','vs oral levodopa',1.86,'i'],['Deep-brain stimulation (VA trial)','vs best medical therapy',4.5,'s',0,3.7,5.4]]];
  function drawTx(t){
    const rows=TX[xv],N=vb(xs,'720 '+(rows.length*38+96),'400 '+(rows.length*58+110));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const mx=xv?5.5:2.5,x0=N?20:300,x1=N?360:650,X=v=>lerp(x0,x1,v/mx),rh=N?58:38,y0=N?62:52;
    s+=`<text x="20" y="24" class="t-sm">${xv?(N?'MORE GOOD ON-TIME, HOURS A DAY':'MORE ON-TIME WITHOUT TROUBLESOME DYSKINESIA, HOURS A DAY'):(N?'LESS OFF-TIME, HOURS A DAY':'LESS OFF-TIME, HOURS A DAY, AGAINST EACH TRIAL\'S COMPARATOR')}</text>`;
    const lgy=N?42:40;[['o','tablets and add-ons'],['i','infusions'],['s','surgery']].filter(q=>xv||q[0]!=='s').forEach(([k,l],j)=>{const x=20+j*(N?120:150);s+=`<rect x="${x}" y="${lgy-8}" width="14" height="9" rx="2" style="${k==='o'?'fill:var(--sky)':k==='i'?'fill:var(--sky-soft);stroke:var(--sky)':'fill:var(--sage)'}"/><text x="${x+20}" y="${lgy}" class="t-xs">${l}</text>`});
    const ticks=xv?[0,1,2,3,4,5]:[0,.5,1,1.5,2,2.5];
    rows.forEach((r,i)=>{const q=ease(ramp(t,i*.07,i*.07+.25)),yy=y0+i*rh+(N?26:0),w=(X(r[2])-x0)*q,k=r[3];
      if(N)s+=`<text x="20" y="${yy-8}" class="t-lbl" style="font-size:12px">${r[0]}</text><text x="${x1+30}" y="${yy-8}" class="t-xs t-end">${r[1]}</text>`;
      else s+=`<text x="${x0-10}" y="${yy+8}" class="t-lbl t-end" style="font-size:12px">${r[0]}</text><text x="${x0-10}" y="${yy+20}" class="t-xs t-end">${r[1]}</text>`;
      s+=`<rect x="${x0}" y="${yy}" width="${f1(Math.max(1.5,w))}" height="14" rx="3" style="${k==='o'?'fill:var(--sky)':k==='i'?'fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.4':'fill:var(--sage)'}"/>`;
      if(r[5]!=null&&q>.9)s+=`<path d="M${f1(X(r[5]))} ${yy+7} H${f1(X(r[6]))} M${f1(X(r[5]))} ${yy+3} v8 M${f1(X(r[6]))} ${yy+3} v8" style="stroke:var(--ink);stroke-width:1.3"/>`;
      if(q>.6)s+=`<text x="${f1(Math.min(X(r[2])+(r[5]!=null?X(r[6])-X(r[2]):0)+6,N?x1+30:700))}" y="${yy+11}" class="t-xs ${N&&r[2]>4?'t-end':''}" style="fill:var(--ink);font-weight:700">${xv?'+':'−'}${r[2].toFixed(2)} h${r[4]?' *':''}</text>`});
    const ya=y0+rows.length*rh+(N?18:4);s+=`<path d="M${x0} ${ya} H${x1}" class="axis"/>`;ticks.forEach(v=>{s+=`<path d="M${f1(X(v))} ${ya} v4" class="axis"/><text x="${f1(X(v))}" y="${ya+15}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="20" y="${ya+(N?34:30)}" class="t-xs">* worked out by arithmetic from the two arms${xv?'; whiskers: 95% CI':''}</text>`;
    xs.innerHTML=s;
    $('#wrTxNote').innerHTML=noteHTML(WR_TX[xv])+(xv?`<p>See <a href="#dbs" data-go="dbs">Deep-brain stimulation</a> for the surgical trials.</p>`:'');
    $('#wrTxCap').textContent=['Hours a day less off-time than the comparator in each trial. Comparators differ: placebo, immediate-release or oral levodopa.','Hours a day more on-time without troublesome dyskinesia than the comparator. The DBS comparator is best medical therapy.'][xv];
    xr.setAttribute('aria-valuetext',['Off-time','Good on-time'][xv]+', '+Math.round(t*100)+'% revealed');
  }
  const stopX=playWire(xr,$('#wrTxPlay'),drawTx,7000,'Replay','wearing');
  $$('[data-wrx]').forEach(b=>b.addEventListener('click',()=>{xv=+b.dataset.wrx;$$('[data-wrx]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopX();xr.value=0;drawTx(0);$('#wrTxPlay').click()}));
  syncB();render();drawInc(+ir.value);drawTx(+xr.value);
};
