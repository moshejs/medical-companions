/* =============== 3.1 Alcohol withdrawal: the timeline =============== */
const WD_H=120; /* the scrubber runs 0-120 h after the last drink */
const WD_STEPS=[
 {from:0,at:.025,k:'Hours 0–6',t:'The last drink',
  txt:`Over months of heavy, regular drinking the brain adapts to alcohol's depressant effect. When a person who is physically dependent stops or cuts down, that effect is suddenly reversed and the brain is left over-excited: that is withdrawal. Its most severe results are seizure, delirium and death. [[ASAM2020Withdrawal]] In the first hours the blood alcohol level is still falling and signs may not have begun; ASAM lists a positive blood alcohol level alongside withdrawal signs as a factor that may raise risk. [[ASAM2020Withdrawal]]`,
  pt:`If your body has got used to alcohol and you stop suddenly, your brain can be over-excited for a few days. This is called withdrawal. [[ASAM2020Withdrawal]]`,
  hook:`Withdrawal signs can appear while the blood alcohol level is still positive, and ASAM counts that combination as a possible added risk. [[ASAM2020Withdrawal]]`},
 {from:.05,at:.09,k:'6–24 h',t:'Minor withdrawal',
  txt:`ASAM 2020: symptoms usually begin 6–24 h after stopping or cutting down. Early features are anxiety, sleep disturbance, loss of appetite, vivid dreams, headache and nausea, with tachycardia, brisk reflexes, sweating, raised blood pressure and hyperthermia. Mirijello's stage I (6–12 h) also lists tremor and fast breathing. [[ASAM2020Withdrawal,Mirijello2015]] Up to 50% of people with alcohol use disorder have withdrawal symptoms, and only a minority need medical treatment. Mild to moderate withdrawal often settles within 2–7 days. [[Mirijello2015]]`,
  pt:`Early signs are shaking hands, sweating, a fast heartbeat, feeling anxious or sick, and poor sleep. They usually start 6 to 24 hours after the last drink. [[ASAM2020Withdrawal]]`,
  hook:`Minor withdrawal: onset 6–24 h. DSM-5 needs ≥2 of 8 signs; a pulse &gt;100 bpm counts as autonomic hyperactivity. [[ASAM2020Withdrawal]]`},
 {from:.1,at:.14,k:'12–48 h',t:'Hallucinosis',
  txt:`Hallucinations develop within 12–24 h and usually resolve within 24–48 h, unless signs of delirium appear (ASAM 2020). Alcoholic hallucinosis means visual, tactile or auditory hallucinations without clouding of consciousness: the person stays oriented, which is what separates it from delirium tremens. [[ASAM2020Withdrawal,Saitz1998AHRW]]`,
  pt:`Some people see, hear or feel things that are not there, while still knowing where they are and what day it is. It is frightening, and it needs medical care.`,
  hook:`Hallucinosis = hallucinations with a clear sensorium at 12–24 h. Delirium tremens = hallucinations <i>with</i> confusion, later. [[Saitz1998AHRW,ASAM2020Withdrawal]]`},
 {from:.18,at:.2,k:'8–48 h · peak ≈24 h',t:'Seizures',
  txt:`Withdrawal seizures may begin as early as 8 h after the last drink, continue for up to 48 h and peak at about 24 h (ASAM 2020); more than 90% appear within 48 h. [[ASAM2020Withdrawal,Jesse2017]] About 10% of people with withdrawal symptoms have them: generalised tonic-clonic seizures with little or no postictal period. More than half of those affected have repeated seizures, a second one "generally happens within 6 hours of the first", and in up to 5% they progress to status epilepticus. [[Mirijello2015,Jesse2017,Saitz1998AHRW]] In an emergency-department trial after a witnessed alcohol-related seizure, a further seizure within 6 h occurred in 3% given IV lorazepam and 24% given placebo. [[DOnofrio1999NEJM]] ASAM adds that a mild, low-risk patient can be watched for up to 36 h, "after which more severe withdrawal is unlikely to develop". [[ASAM2020Withdrawal]]`,
  pt:`A seizure can come without much shaking or sweating first. A seizure is an emergency: call emergency services. [[ASAM2020Withdrawal]]`,
  hook:`Seizures come <b>early</b>: window 8–48 h, peak ≈24 h. Phenytoin is not used for withdrawal seizures. [[ASAM2020Withdrawal,Hillbom2003]]`},
 {from:.4,at:.5,k:'48–96 h',t:'Delirium tremens',
  txt:`Delirium tremens (alcohol withdrawal delirium) is a disturbance of attention and awareness that develops over hours to days and fluctuates, with disorientation, usually severe agitation, tachycardia, high blood pressure and fever. [[ASAM2020Withdrawal,Saitz1998AHRW]] Its onset is published differently: 48–72 h after the last drink (Mirijello 2015; Jesse 2017) or 72–96 h (ASAM 2020, initial-assessment section), and it "could begin up to 10 days later". [[Mirijello2015,Jesse2017,ASAM2020Withdrawal]] It occurs in about 5% of patients with withdrawal syndrome, often as the result of no treatment or undertreatment. [[Mirijello2015]]`,
  pt:`Delirium tremens ("DTs") means severe confusion, seeing or hearing things, fever and a racing heart, usually two to four days after the last drink. It is a medical emergency. [[Saitz1998AHRW,Mirijello2015]]`,
  hook:`DTs come <b>late</b>: 48–96 h (48–72 h Mirijello and Jesse; 72–96 h ASAM). Fluctuating attention plus autonomic overactivity. [[Mirijello2015,Jesse2017,ASAM2020Withdrawal]]`},
 {from:.75,at:.92,k:'Days 4–5 and after',t:'Settling, or a long delirium',
  txt:`Delirium tremens normally lasts 5–7 days (Mirijello), up to 3–4 days (Saitz), or as long as 2 weeks (Jesse). [[Mirijello2015,Saitz1998AHRW,Jesse2017]] Deaths range from about 1% or less with early detection and appropriate treatment (Jesse 2017), through 1–5% (Mirijello 2015), to about 5% in the historical series quoted by Saitz 1998 and 6.6% in a 1987–2003 Spanish hospital cohort. In controlled trials, no deaths were reported in 217 patients treated with benzodiazepines or barbiturates. These are group statistics from different eras and settings. [[Jesse2017,Mirijello2015,Saitz1998AHRW,Monte2010,MayoSmith2004Delirium]] If delirium lasts longer than 72 h, ASAM advises looking for drug-induced delirium or withdrawal from another GABAergic agent. [[ASAM2020Withdrawal]]`,
  pt:`With modern hospital care, most people with DTs survive. This is a group statistic, not a promise for any one person. Getting through withdrawal is a first step; ongoing treatment is what helps recovery last. [[Jesse2017,MayoSmith2004Delirium,ASAM2020Withdrawal]]`,
  hook:`Antipsychotics alone raise the risk of death in DT (RR 6.6 against sedative-hypnotics). [[MayoSmith2004Delirium]]`}
];
const WD_K_STEPS=[
 {from:0,at:.1,k:'Episode 1',t:'One withdrawal',
  txt:`Kindling is a process in which a repeated weak stimulus that at first causes no behavioural effect comes to cause effects such as seizures. Clinical and experimental evidence supports a kindling mechanism in alcohol withdrawal. [[Becker1998]] <span class="ev est">Established in animal models</span> <span class="ev early">Early evidence in humans</span>`,
  pt:`Each time withdrawal happens, the brain may become a little more easily over-excited the next time.`},
 {from:.25,at:.45,k:'Episodes 2–6',t:'Again and again',
  txt:`In animal studies, NMDA glutamate-receptor sensitivity and the severity of withdrawal seizures both increase with the number of past withdrawal episodes. [[Becker1998]] <span class="ev est">Established in animal models</span>`,
  hook:`Kindling: NMDA sensitivity and seizure severity rise with each withdrawal in animal models. [[Becker1998]]`},
 {from:.55,at:.75,k:'Brown 1988',t:'In people',
  txt:`Brown 1988 compared 25 men with withdrawal seizures and 25 without: 12 of 25 (48%) with seizures had 5 or more previous detoxifications, against 3 of 25 (12%) without. The authors found no link with drinking history. [[Brown1988Kindling]] In a family study, people with a history of delirium tremens or convulsions reported more withdrawal episodes (28.2 vs 15.9). [[Schuckit1995]] ASAM 2020 lists "numerous prior withdrawal episodes" as a risk factor for complicated withdrawal. [[ASAM2020Withdrawal]] <span class="ev early">Early evidence in humans</span>`,
  hook:`Brown 1988: 48% of people with withdrawal seizures had ≥5 prior detoxifications vs 12% without. [[Brown1988Kindling]]`},
 {from:.85,at:.95,k:'An open question',t:'Can early treatment help?',
  txt:`Some experimental evidence suggests that treating early withdrawal may delay later kindled seizures; in humans this remains a hypothesis. [[Becker1998]] <span class="ev hyp">Hypothesis</span> In a trial of 136 outpatients, among people with two or more past medicated withdrawals, those treated with carbamazepine drank less than 1 drink a day afterwards, against about 5 a day on lorazepam (P=.033); lorazepam showed rebound symptoms. [[Malcolm2002]] <span class="ev early">Early evidence</span>`,
  pt:`Every withdrawal is worth taking seriously. Get medical help to stop safely, each time. [[ASAM2020Withdrawal]]`}
];
/* PAWSS items as named in the AAST 2022 summary (concomitant substances split in two, as in the published scale) */
const WD_PAWS_GATE='Any alcohol in the last 30 days, or a positive blood alcohol level on admission';
const WD_PAWS_HX=['Previous episodes of alcohol withdrawal','Previous alcohol withdrawal seizures','Previous delirium tremens','Previous alcohol rehabilitation treatment','Previous blackouts','Concomitant use of other CNS depressants','Concomitant use of illicit substances','Recent intoxication'];
const WD_PAWS_CL=['Elevated blood alcohol level on admission','Evidence of increased autonomic activity'];

inits.withdrawal=()=>{
  /* ---------- main timeline ---------- */
  const svg=$('#wdSvg'),rg=$('#wdT');let src='both';
  const sig=h=>{const dtOn=src==='asam'?[74,88]:[52,66];
    const tremor=ramp(h,6,16)*(1-.3*ramp(h,104,120)),sweat=ramp(h,8,20),hallu=ramp(h,12,18)*(1-ramp(h,40,48)),
      seize=bump(h,22,26.5),conf=ramp(h,dtOn[0],dtOn[1]),
      hr=Math.round(78+28*ramp(h,6,24)+10*bump(h,20,30)+24*conf-12*ramp(h,100,120));
    return {tremor,sweat,hallu,seize,conf,hr}};
  function hallGlyph(x,y,s,v){if(v<=0)return '';let g='';[[-.5,-.05],[.52,0],[.48,.62],[-.5,.66]].forEach(([dx,dy],i)=>{const cx=x+dx*s,cy=y+dy*s,o=v*(.55+.45*Math.sin(i*1.7));
      g+=`<path d="M${f1(cx-6)} ${f1(cy)}q3 -4 6 0t6 0" style="fill:none;stroke:var(--dx);stroke-width:1.6;stroke-linecap:round;opacity:${f1(o)}"/><circle cx="${f1(cx)}" cy="${f1(cy-6)}" r="1.8" style="fill:var(--dx);opacity:${f1(o)}"/>`});return g}
  function dial(cx,cy,r,h){const A=v=>-Math.PI/2+2*Math.PI*v/WD_H,P=(v,rr)=>[cx+rr*Math.cos(A(v)),cy+rr*Math.sin(A(v))];
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--panel-2);stroke-width:10"/>`;
    if(h>0){const p0=P(0,r),p1=P(Math.min(h,WD_H-.01),r),big=h>WD_H/2?1:0;s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${r} ${r} 0 ${big} 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;opacity:.85"/>`}
    [0,24,48,72,96].forEach(v=>{const a=P(v,r-9),b=P(v,r+9),l=P(v,r+19);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:1.4"/><text x="${f1(l[0])}" y="${f1(l[1]+3.5)}" class="t-xs t-mid">${v===0?'0 · 120 h':v+' h'}</text>`});
    const k=P(h,r);s+=`<circle cx="${f1(k[0])}" cy="${f1(k[1])}" r="6.5" style="fill:var(--panel);stroke:var(--accent);stroke-width:2.6"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 388','400 612'),h=t*WD_H,S=sig(h);
    const L=N?{px:[8,8,392,244],dc:[102,124],dr:72,ps:70,rx:212,big:58,sub:76,pulseY:112,pw:[212,384],signY:156,tx:[22,382],rows:{mi:282,ha:346,se:416,dt:484},axY:556,dayY:588,ob:[258,546]}
           :{px:[10,10,250,378],dc:[135,112],dr:78,ps:80,rx:24,big:230,sub:247,pulseY:274,pw:[24,236],signY:312,tx:[292,704],rows:{mi:54,ha:112,se:178,dt:246},axY:330,dayY:362,ob:[30,322]};
    let s=`<defs>${marker('wdA','var(--muted)')}<pattern id="wdHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--bad);opacity:.35"/><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--bad);stroke-width:3"/></pattern></defs>`;
    /* ----- person panel ----- */
    s+=`<rect x="${L.px[0]}" y="${L.px[1]}" width="${L.px[2]-L.px[0]}" height="${L.px[3]-L.px[1]}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const [cx,cy]=L.dc;s+=dial(cx,cy,L.dr,h);
    const py=cy-L.ps*.5,jit=S.tremor*1.2*Math.sin(h*9);
    s+=person(cx+jit*.4,py,L.ps,'var(--muted)');
    s+=symptoms(cx,py,L.ps,{tremor:S.tremor,sweat:S.sweat,conf:S.conf,seize:S.seize});
    s+=hallGlyph(cx,py,L.ps,S.hallu*(1-S.conf*.6));
    const day=Math.min(5,Math.floor(h/24)+1);
    s+=`<text x="${L.rx}" y="${L.big}" style="font:800 30px var(--display);fill:var(--ink)">${Math.round(h)} h</text>`;
    s+=`<text x="${L.rx}" y="${L.sub}" class="t-sm">day ${day} after the last drink</text>`;
    /* pulse readout (schematic) with the DSM-5 >100 bpm line */
    const [p0,p1]=L.pw,PX=v=>p0+(p1-p0)*clamp((v-60)/(160-60)),pY=L.pulseY,hot=S.hr>100;
    s+=`<text x="${p0}" y="${pY-8}" class="t-xs">pulse (schematic)</text><text x="${p1}" y="${pY-8}" class="t-xs t-end" style="fill:${hot?'var(--bad)':'var(--ink)'};font-weight:700">♥ ${S.hr} bpm</text>`;
    s+=`<rect x="${p0}" y="${pY}" width="${p1-p0}" height="8" rx="4" style="fill:var(--panel-2)"/><rect x="${p0}" y="${pY}" width="${f1(PX(S.hr)-p0)}" height="8" rx="4" style="fill:${hot?'var(--glu-fill)':'var(--gaba-fill)'}"/>`;
    s+=`<line x1="${f1(PX(100))}" x2="${f1(PX(100))}" y1="${pY-3}" y2="${pY+11}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(PX(100))}" y="${pY+22}" class="t-xs t-mid">&gt;100: a DSM-5 sign</text>`;
    /* signs now */
    const now=[];if(h<5)now.push('no signs yet');
    if(S.tremor>.3)now.push('tremor');if(S.sweat>.3)now.push('sweating');if(h>=6&&h<60&&S.conf<.3)now.push('anxiety, poor sleep, nausea');
    if(S.hallu>.3&&S.conf<.3)now.push('hallucinations, still oriented');if(S.seize>.15)now.push('seizure risk at its peak');
    if(S.conf>.3)now.push('confusion, agitation, fever');if(hot)now.push('fast pulse');
    const lines=[];let ln='';now.forEach(w=>{const tr=ln?ln+' · '+w:w;if(tr.length>(N?29:38)){lines.push(ln);ln=w}else ln=tr});if(ln)lines.push(ln);
    s+=`<text x="${L.rx}" y="${L.signY}" class="t-xs" style="font-weight:600">SIGNS DRAWN NOW</text>`;
    lines.slice(0,N?5:4).forEach((l,i)=>s+=`<text x="${L.rx}" y="${L.signY+15+i*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    /* ----- timeline ----- */
    const [x0,x1]=L.tx,X=v=>x0+(x1-x0)*v/WD_H,R=L.rows,on=(a,b)=>h>=a&&h<=b;
    const tl=tline(x0,L.axY,x1-x0,{min:0,max:WD_H,step:12,fmt:v=>v%24===0?v+' h':''});s+=tl.svg;
    for(let d=0;d<5;d++)s+=`<text x="${f1(X(d*24+12))}" y="${L.dayY}" class="t-xs t-mid" style="${day===d+1?'fill:var(--accent);font-weight:700':''}">day ${d+1}</text>`;
    for(let v=24;v<WD_H;v+=24)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.ob[0]}" y2="${L.axY}" class="grid"/>`;
    const lab=(y,name,det,act,col)=>`<text x="${x0}" y="${y-13}" class="t-lbl" style="${act?`fill:${col}`:''}">${name}</text><text x="${x1}" y="${y-13}" class="t-xs t-end">${det}</text>`;
    const bar=(a,b,y,col,act,o={})=>`<rect x="${f1(X(a))}" y="${f1(y-(o.h||14)/2)}" width="${f1(X(b)-X(a))}" height="${o.h||14}" rx="${o.sq?2:7}" style="fill:${o.fill||col};opacity:${f1((act?.95:.35)*(o.op||1))};stroke:${col};stroke-width:${act?1.6:0}"/>`;
    const brk=(a,b,y,txt)=>`<path d="M${f1(X(a))} ${y+14}v5H${f1(X(b))}v-5" style="fill:none;stroke:var(--muted);stroke-width:1"/><text x="${f1((X(a)+X(b))/2)}" y="${y+30}" class="t-xs t-mid">${txt}</text>`;
    /* minor withdrawal: onset 6-24 h (ASAM), early withdrawal to 48 h (Jesse) */
    let act=on(6,48);s+=lab(R.mi,'Minor withdrawal',N?'onset 6–24 h':'onset 6–24 h (ASAM) · to 48 h (Jesse)',act,'var(--warn)')+bar(6,48,R.mi,'var(--warn)',act)+bar(6,24,R.mi,'var(--warn)',act&&h<=24,{h:6,op:.9,fill:'var(--panel)'})+brk(6,24,R.mi,'onset');
    act=on(12,48);s+=lab(R.ha,'Hallucinosis',N?'onset 12–24 h':'onset 12–24 h, gone by 24–48 h (ASAM)',act,'var(--dx)')+bar(12,48,R.ha,'var(--dx)',act)+bar(12,24,R.ha,'var(--dx)',act&&h<=24,{h:6,op:.9,fill:'var(--panel)'})+brk(12,24,R.ha,'onset');
    /* seizures: 8-48 h, peak about 24 h (ASAM); 6-48 h (Jesse, Hillbom) */
    act=on(8,48);s+=lab(R.se-10,'Seizures',N?'8–48 h, peak ≈24 h':'ASAM 8–48 h · dashed: Jesse, Hillbom 6–48 h',act,'var(--glu)');
    const sb=R.se+10,sp=(v)=>v<=24?Math.sin(Math.PI/2*ramp(v,8,24)):Math.cos(Math.PI/2*ramp(v,24,48));let d=`M${f1(X(8))} ${sb}`;for(let v=8;v<=48;v+=1)d+=`L${f1(X(v))} ${f1(sb-24*sp(v))}`;
    s+=`<path d="${d}Z" style="fill:var(--glu-fill);opacity:${act?.8:.3};stroke:var(--glu);stroke-width:${act?1.4:0}"/><line x1="${f1(X(6))}" x2="${f1(X(48))}" y1="${sb+5}" y2="${sb+5}" style="stroke:var(--glu);stroke-width:2;stroke-dasharray:3 3;opacity:.7"/>`;
    s+=`<text x="${f1(X(24))}" y="${sb+18}" class="t-xs t-mid">peak ≈24 h</text>`;
    /* delirium tremens: two published onset windows, and a long tail */
    const mOn=src!=='asam',aOn=src!=='mir';act=h>=48;
    s+=lab(R.dt,'Delirium tremens',N?'onset by source':'onset 48–72 h (Mirijello) or 72–96 h (ASAM)',act,'var(--bad)');
    s+=bar(48,WD_H,R.dt+10,'var(--bad)',act&&h>=72,{h:5,op:.45});
    if(mOn)s+=bar(48,72,R.dt,'var(--bad)',on(48,72),{sq:1});
    if(aOn)s+=`<rect x="${f1(X(72))}" y="${R.dt-7}" width="${f1(X(96)-X(72))}" height="14" rx="2" style="fill:url(#wdHatch);opacity:${on(72,96)?1:.45};stroke:var(--bad);stroke-width:${on(72,96)?1.6:.6}"/>`;
    if(mOn)s+=`<text x="${f1((X(48)+X(72))/2)}" y="${R.dt+28}" class="t-xs t-mid">Mirijello</text>`;
    if(aOn)s+=`<text x="${f1((X(72)+X(96))/2)}" y="${R.dt+28}" class="t-xs t-mid">ASAM</text>`;
    s+=`<text x="${f1(X(WD_H))}" y="${R.dt+28}" class="t-xs t-end">lasts days →</text>`;
    /* ASAM: low-risk observation to 36 h */
    const ob=X(36);s+=`<line x1="${f1(ob)}" x2="${f1(ob)}" y1="${L.ob[0]}" y2="${L.ob[1]}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${f1(ob+4)}" y="${L.ob[1]-4}" class="t-xs" style="fill:var(--good)">36 h: low-risk watch (ASAM)</text>`;
    /* playhead */
    const hx=X(h);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.ob[0]-8}" y2="${L.axY}" style="stroke:var(--ink);stroke-width:1.6"/><path d="M${f1(hx-6)} ${L.ob[0]-14}h12l-6 8Z" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    const p=phaseOf(WD_STEPS,t);setSt(p);
    const open=[];if(on(6,48))open.push('minor withdrawal');if(on(12,48))open.push('hallucinosis');if(on(8,48))open.push('seizures');if((mOn&&on(48,72))||(aOn&&on(72,96)))open.push('DT onset');else if(h>72)open.push('DT may continue');
    rg.setAttribute('aria-valuetext',`${Math.round(h)} hours after the last drink: ${WD_STEPS[p].t}`);
    $('#wdRead').innerHTML=`<span>hours <b>${Math.round(h)}</b></span><span>day <b>${day}</b></span><span>windows open <b>${open.length?open.join(', '):'none yet'}</b></span>`;
    $('#wdNote').innerHTML=noteHTML(WD_STEPS[p]);
  }
  const stop=playWire(rg,$('#wdPlay'),draw,26000,'%t:player.replay%','withdrawal');
  const setSt=stepWire($('#wdSteps'),WD_STEPS,rg,draw,stop);
  $$('[data-wsrc]').forEach(b=>b.addEventListener('click',()=>{src=b.dataset.wsrc;$$('[data-wsrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- kindling ---------- */
  const ks=$('#wdKSvg'),kr=$('#wdKT');
  function kdraw(t){
    const N=vb(ks,'720 320','400 600'),G=i=>clamp((t-.02-i*.08)/.07),nE=Math.max(1,[0,1,2,3,4,5].filter(i=>G(i)>.5).length),bars=ramp(t,.55,.75);
    const L=N?{c:[18,20,382,262],th:130,syn:[200,346],ss:1.15,bx:[150,370],by:[482,520],bt:462,hs:.82}
             :{c:[14,16,420,300],th:140,syn:[570,100],ss:1.15,bx:[560,700],by:[226,266],bt:206,hs:1};
    const [cx0,cy0,cx1,cy1]=L.c,base=cy1-34,sp=(cx1-cx0-40)/6;
    let s=`<rect x="${cx0}" y="${cy0}" width="${cx1-cx0}" height="${cy1-cy0}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${cx0+12}" y="${cy0+20}" class="t-sm">WITHDRAWAL SEVERITY, EPISODE BY EPISODE (SCHEMATIC)</text>`;
    s+=`<line x1="${cx0+12}" x2="${cx1-12}" y1="${base}" y2="${base}" class="axis"/>`;
    s+=`<line x1="${cx0+12}" x2="${cx1-12}" y1="${L.th}" y2="${L.th}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${cx0+14}" y="${L.th-6}" class="t-xs" style="fill:var(--bad)">seizure threshold (schematic)</text>`;
    for(let i=0;i<6;i++){const g=G(i),x=cx0+32+sp*i+sp/2,hh=(40+i*30)*L.hs*ease(g),w=sp*.42;
      s+=`<text x="${f1(x)}" y="${base+16}" class="t-xs t-mid" style="${i<nE?'fill:var(--ink)':''}">${i+1}</text>`;
      if(g<=0)continue;
      const top=base-hh,over=top<L.th;
      s+=`<path d="M${f1(x-w)} ${base}C${f1(x-w*.4)} ${base} ${f1(x-w*.35)} ${f1(top)} ${f1(x)} ${f1(top)}S${f1(x+w*.4)} ${base} ${f1(x+w)} ${base}Z" style="fill:${over?'var(--glu-fill)':'var(--warn)'};opacity:.75"/>`;
      if(over&&g>.9)for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*.45;s+=`<line x1="${f1(x+Math.cos(a)*6)}" y1="${f1(top-4+Math.sin(a)*6)}" x2="${f1(x+Math.cos(a)*15)}" y2="${f1(top-4+Math.sin(a)*15)}" style="stroke:var(--bad);stroke-width:1.6;stroke-linecap:round"/>`}}
    s+=`<text x="${f1((cx0+cx1)/2)}" y="${base+30}" class="t-xs t-mid">withdrawal episode number</text>`;
    /* synapse: NMDA receptors up with repeated withdrawals (animal data) */
    const [sx,sy]=L.syn;
    s+=synapse(sx,sy,L.ss,{gaba:3,nmda:Math.min(6,1+nE),gl:.3+nE*.1,ca:.2+nE*.12,spark:clamp((nE-1)/5),seed:7});
    s+=`<text x="${sx}" y="${f1(sy+L.ss*56)}" class="t-xs t-mid">NMDA receptors: ${Math.min(6,1+nE)} drawn (animal studies)</text>`;
    s+=`<text x="${sx}" y="${f1(sy+L.ss*56+13)}" class="t-xs t-mid">blue GABA-A · red NMDA</text>`;
    /* Brown 1988 bars */
    const [b0,b1]=L.bx;s+=`<text x="${N?cx0+4:b0-130}" y="${L.bt}" class="t-sm">BROWN 1988: ≥5 PRIOR DETOXES</text>`;
    [[48,'with seizures','var(--glu-fill)'],[12,'without','var(--gaba-fill)']].forEach(([v,nm,col],i)=>{const y=L.by[i],w=(b1-b0)*v/100*bars;
      s+=`<text x="${b0-8}" y="${y+10}" class="t-xs t-end">${nm}</text><rect x="${b0}" y="${y}" width="${b1-b0}" height="14" rx="4" style="fill:var(--panel-2)"/>`;
      if(w>0)s+=`<rect x="${b0}" y="${y}" width="${f1(w)}" height="14" rx="4" style="fill:${col}"/>`;
      s+=`<text x="${f1(b0+Math.max(w,0)+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${bars>0?Math.round(v*bars)+'%':''}</text>`});
    s+=`<text x="${N?cx0+4:b0-130}" y="${L.by[1]+32}" class="t-xs">25 men with vs 25 without withdrawal seizures</text>`;
    ks.innerHTML=s;
    const p=phaseOf(WD_K_STEPS,t);setK(p);
    kr.setAttribute('aria-valuetext',`Episode ${nE}: ${WD_K_STEPS[p].t}`);
    $('#wdKNote').innerHTML=noteHTML(WD_K_STEPS[p]);
  }
  const kstop=playWire(kr,$('#wdKPlay'),kdraw,16000,'%t:player.replay%','withdrawal');
  const setK=stepWire($('#wdKSteps'),WD_K_STEPS,kr,kdraw,kstop);
  kdraw(+kr.value);

  /* ---------- PAWSS teaching checklist ---------- */
  const box=(id,txt,cls)=>`<label class="${cls||''}"><input type="checkbox" id="${id}"><span>${txt}</span></label>`;
  $('#wdPawsGate').insertAdjacentHTML('beforeend',box('wdPg',WD_PAWS_GATE,'gate'));
  $('#wdPawsHx').insertAdjacentHTML('beforeend',WD_PAWS_HX.map((t,i)=>box('wdPh'+i,t)).join(''));
  $('#wdPawsCl').insertAdjacentHTML('beforeend',WD_PAWS_CL.map((t,i)=>box('wdPc'+i,t)).join(''));
  const pv=$('#wdPawsSvg'),out=$('#wdPawsOut');
  function paws(){
    const gate=$('#wdPg').checked,items=$$('#wdPawsHx input,#wdPawsCl input'),n=items.filter(x=>x.checked).length,score=gate?n:0;
    items.forEach(x=>x.closest('label').classList.toggle('off',!gate));
    let s=gauge(160,150,120,score,10,{bands:[{to:4,col:'var(--good)'},{to:10,col:'var(--bad)'}],big:true,label:gate?'teaching score / 10':'threshold question not ticked'});
    /* tick at the published threshold of 4 */
    const a=Math.PI*(1-.4),r0=94,r1=130;s+=`<line x1="${f1(160+r0*Math.cos(a))}" y1="${f1(150-r0*Math.sin(a))}" x2="${f1(160+r1*Math.cos(a))}" y2="${f1(150-r1*Math.sin(a))}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(160+(r1+8)*Math.cos(a)-4)}" y="${f1(150-(r1+8)*Math.sin(a))}" class="t-xs t-end" style="fill:var(--ink)">4</text>`;
    pv.innerHTML=s;
    let v;
    if(!gate)v=`<div class="verdict maybe">The scale opens with the threshold question: alcohol in the last 30 days, or a positive blood alcohol level on admission. Tick it to score the items. PAWSS can be used before any withdrawal signs appear. [[ASAM2020Withdrawal]]</div>`;
    else if(score>=4)v=`<div class="verdict no">Teaching result: ${score} of 10. A score of 4 or more is the published threshold for <b>higher risk of complicated withdrawal</b> (seizures, delirium tremens). [[Maldonado2014,Maldonado2015]]</div>`;
    else v=`<div class="verdict maybe">Teaching result: ${score} of 10, below the published threshold of 4. In the validation study the negative predictive value at this cut-off was 99.5%, but in a community detox unit the cut-off of 4 did not perform well, and a low score never means withdrawal is safe without help. [[Maldonado2015,Crepeault2025]]</div>`;
    v+=`<p style="font-size:14.5px">Why it matters: ASAM 2020 says withdrawal can usually be managed safely outside hospital when risk factors are limited or mitigated, aiming for the least intensive level of care that is safe and effective. A higher predicted risk is a reason for closer medical supervision. [[ASAM2020Withdrawal]] Any score here is a teaching example, not a reading of anyone's own risk.</p>`;
    out.innerHTML=v;
  }
  $$('#m-withdrawal .wd-list input').forEach(x=>x.addEventListener('change',paws));
  paws();
};
