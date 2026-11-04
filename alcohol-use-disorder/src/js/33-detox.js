/* =============== 3.3 Managing withdrawal safely =============== */
/* word-wrap for SVG labels: splits text into lines of at most n characters */
function dxWrap(s,n){const w=[];String(s).split(' ').forEach(x=>{if(x.length>n&&x.includes('-')){const i=x.indexOf('-');w.push(x.slice(0,i+1),x.slice(i+1))}else w.push(x)});const L=[];let c='';w.forEach(x=>{if(!c)c=x;else if((c+(c.endsWith('-')?'':' ')+x).length<=n)c+=(c.endsWith('-')?'':' ')+x;else{L.push(c);c=x}});if(c)L.push(c);return L}
const DX_COLS=[
 {k:'assess',h:'1 · Assess risk',opts:[{id:'hx',t:'Past seizure or delirium tremens'},{id:'paws',t:'PAWSS risk score'},{id:'ciwa',t:'CIWA-Ar severity now'},{id:'ill',t:'Illness, mood and support'}]},
 {k:'set',h:'2 · Setting',opts:[{id:'l1',t:'Ambulatory (Level 1-WM)',d:'CIWA-Ar <10 appropriate'},{id:'l2',t:'Extended on-site monitoring (Level 2-WM)',d:'CIWA-Ar <18 appropriate'},{id:'inp',t:'Inpatient',d:'severe, complicated, pregnancy'},{id:'icu',t:'Intensive care',d:'delirium, resistant withdrawal'}]},
 {k:'med',h:'3 · Medicines',opts:[{id:'cg',t:'Carbamazepine or gabapentin',d:'mild; moderate alternative'},{id:'bst',t:'Benzodiazepine, symptom-triggered',d:'preferred inpatient method'},{id:'bfl',t:'Benzodiazepine front loading',d:'CIWA-Ar ≥19'},{id:'icu',t:'ICU agents: phenobarbital, propofol, dexmedetomidine',d:'experienced clinicians only'}]},
 {k:'adj',h:'4 · Adjuncts',opts:[{id:'thi',t:'Thiamine (vitamin B1)'},{id:'flu',t:'Fluids'},{id:'ele',t:'Electrolytes: magnesium, phosphate'}]},
 {k:'next',h:'5 · Next steps',opts:[{id:'rx',t:'AUD medicines',d:'start when thinking is clear'},{id:'tt',t:'Therapy and mutual help',d:'MI, CBT, AA, SMART'},{id:'wh',t:'Warm handoff',d:'to treatment providers'}]}
];
const DX_NAMES={mild:'Mild, low risk',mod:'Moderate, no complications',sev:'Severe, or past seizure or DT',del:'Delirium or resistant withdrawal'};
/* the route an example person takes, from the ASAM 2020 recommendations quoted in the notes */
function dxRoute(sc,liver,preg){
  const R={sc,liver,preg,assess:{},set:'',setAlt:[],med:'',medAlt:[],adj:{},ciwa:null};
  const A={
    mild:{hx:['none',0],paws:['under 4: lower risk',0],ciwa:['example 6: mild',0],ill:['none; support at home',0]},
    mod:{hx:['none',0],paws:['under 4: lower risk',0],ciwa:['example 14: moderate',1],ill:['none; can attend daily',0]},
    sev:{hx:['past withdrawal seizure',1],paws:['4 or more: high risk',1],ciwa:['example 24: severe',1],ill:['medical illness',1]},
    del:{hx:['past delirium tremens',1],paws:['4 or more: high risk',1],ciwa:['not used in delirium: RASS, CAM-ICU',1],ill:['acute illness',1]}}[sc];
  R.assess=Object.assign({},A);
  if(preg)R.assess.ill=['pregnant: obstetric consult',1];
  R.ciwa={mild:6,mod:14,sev:24,del:null}[sc];
  R.set={mild:'l1',mod:'l2',sev:'inp',del:'icu'}[sc];
  if(sc==='mod')R.setAlt=['l1','inp'];
  if(preg&&(sc==='mild'||sc==='mod')){R.set='inp';R.setAlt=[]}
  R.med={mild:'cg',mod:'bst',sev:'bfl',del:'icu'}[sc];
  if(sc==='mod')R.medAlt=['cg'];
  if(sc==='del')R.medAlt=['bfl'];
  if(preg&&R.med==='cg'){R.med='bst';R.medAlt=[]}
  if(preg&&sc==='mod')R.medAlt=[];
  const amb=R.set==='l1'||R.set==='l2';
  R.adj={thi:amb?'oral, as published':'IV or IM preferred',flu:amb?'non-caffeinated drinks':R.set==='icu'?'immediate IV access':'intake and output',
    ele:sc==='sev'?'magnesium: past seizures':sc==='del'?'watch sodium, acidosis':'check, correct if low'};
  return R}
const DX_STEPS=[
 {from:0,at:.09,k:'Step 1 · Assess',t:'Assess the risk'},
 {from:.2,at:.29,k:'Step 2 · Setting',t:'Choose a setting'},
 {from:.4,at:.49,k:'Step 3 · Medicines',t:'Choose medicines'},
 {from:.6,at:.69,k:'Step 4 · Adjuncts',t:'Thiamine, fluids, electrolytes'},
 {from:.8,at:.92,k:'Step 5 · Next',t:'Link to AUD treatment'}];
function dxNote(i,R){const S=DX_STEPS[i],sc=R.sc,o={k:S.k+' · '+DX_NAMES[sc]+(R.liver?' · liver disease':'')+(R.preg?' · pregnant':''),t:S.t};
  if(i===0){
    o.t='Who is at risk of complicated withdrawal?';
    o.txt=`ASAM 2020 lists the risk factors: past withdrawal delirium or seizure, many prior withdrawals, medical or surgical illness (especially traumatic brain injury), age over 65, long heavy drinking, a seizure in this episode, marked autonomic overactivity, and dependence on benzodiazepines or barbiturates. [[ASAM2020Withdrawal]] The PAWSS can be used before any signs appear: at 4 or more it had a sensitivity of 93.1% and specificity of 99.5% in medically ill inpatients, but performed poorly in a community detox unit where severe withdrawal was common. [[Maldonado2015,Crepeault2025]] CIWA-Ar measures how severe withdrawal is now (ASAM bands: under 10, 10–18, 19 or more); ASAM says it "should not be used as a diagnostic tool". Suicide risk is assessed at intake. [[ASAM2020Withdrawal]] `+
      {mild:'This example person has none of the risk factors, and an example CIWA-Ar of 6 sits in the mild band.',
       mod:'This example person has no complicating factors, but an example CIWA-Ar of 14 is in the moderate band.',
       sev:'This example person had a seizure in a past withdrawal, scores high on PAWSS, and an example CIWA-Ar of 24 is in the severe band.',
       del:'This example person is delirious. CIWA-Ar relies on what the person reports, so ASAM does not recommend it in delirium: CAM-ICU, RASS or similar tools are used instead. [[ASAM2020Withdrawal]]'}[sc]+
      (R.preg?' Pregnancy changes the setting: see step 2.':'');
    o.pt='Before deciding where and how, the team asks: has this person had seizures or DTs before, how strong are the symptoms now, are they ill in other ways, and is someone at home to help?';
    o.hook='The strongest predictor of DT or seizures is a past DT or seizure (OR 2.58 and 2.8). Low platelets and low potassium also predict DT. [[Goodson2014]]'}
  if(i===1){
    o.t={l1:'Ambulatory care with daily check-ins',l2:'Ambulatory, with extended on-site monitoring',inp:'An inpatient bed',icu:'Intensive care'}[R.set];
    o.txt=`ASAM 2020: withdrawal can usually be managed safely as an outpatient when risk factors are limited, aiming for the least intensive setting that is safe and effective. Its placement table rates outpatient care (Level 1-WM) appropriate for mild withdrawal (CIWA-Ar under 10), uncertain for moderate (10–18) and inappropriate for severe or complicated (19 or more); extended on-site monitoring (Level 2-WM) is appropriate below 18. Outpatients check in daily for up to 5 days. [[ASAM2020Withdrawal]] `+
      {l1:'Transfer to more intensive care if agitation or tremor persist despite several doses, vomiting, hallucinations, confusion, a seizure, over-sedation, a return to drinking, fainting or unstable vital signs. [[ASAM2020Withdrawal]]',
       l2:'For moderate withdrawal without complications, on-site monitoring is appropriate; plain outpatient care is "neutral or uncertain", and drinking more than 8 standard drinks a day is also flagged as uncertain. [[ASAM2020Withdrawal]]',
       inp:R.preg?'ASAM: consider inpatient care for every pregnant patient who needs withdrawal management, offer it at CIWA-Ar 10 or more, and consult an obstetrician. [[ASAM2020Withdrawal]]':'Severe or complicated withdrawal is inappropriate for outpatient care. After a withdrawal seizure, ASAM asks for a closely monitored setting with reassessment every 1–2 hours for 6–24 hours. [[ASAM2020Withdrawal]]',
       icu:'Delirium tremens should be managed in an ICU or a ward with vital-sign monitoring: untreated or late-recognised, it can be fatal through arrhythmia, respiratory arrest, sepsis, electrolyte disturbance or prolonged seizures. [[Mainerova2015]]'}[R.set];
    o.pt='Most people can be helped to withdraw safely at home or at a clinic with daily check-ins. Some need a hospital bed, and a few need intensive care. [[ASAM2020Withdrawal]]';
    o.hook='Emergency-department discharge to outpatient care needs all of: mild (or uncomplicated moderate) withdrawal, not intoxicated, no past seizures or delirium in withdrawal, no significant comorbidity, able to attend follow-up. [[ASAM2020Withdrawal]]'}
  if(i===2){
    o.t={cg:'Carbamazepine or gabapentin',bst:'A benzodiazepine, symptom-triggered',bfl:'Benzodiazepine front loading',icu:'Specialist ICU medicines'}[R.med];
    o.txt=`Benzodiazepines are first line because they reduce both seizures and delirium (Mayo-Smith 1997: 7.7 fewer seizures and 4.9 fewer cases of delirium per 100 patients). [[MayoSmith1997]] `+
      {cg:'For mild withdrawal, ASAM rates carbamazepine or gabapentin appropriate. In outpatient care, it also asks that benzodiazepine supplies be kept to the minimum, with these two as alternatives. [[ASAM2020Withdrawal]]',
       bst:(R.preg?'In pregnancy, ASAM names benzodiazepines and barbiturates the medicines of choice, judging the risks of severe withdrawal greater than the small first-trimester risks. ':'For moderate withdrawal, benzodiazepines come first, with carbamazepine or gabapentin as alternatives. ')+'Inpatient symptom-triggered treatment "is the preferred benzodiazepine dosing method". ASAM\'s sample regimen, quoted as published and not an instruction: chlordiazepoxide "25-100 mg PO q4-6h when CIWA-Ar ≥ 10. Additional doses PRN". [[ASAM2020Withdrawal]]',
       bfl:'For severe withdrawal (CIWA-Ar 19 or more) ASAM recommends front loading, preferring diazepam or chlordiazepoxide. Its sample, quoted as published and not an instruction: chlordiazepoxide "50-100 mg PO q1-2h until CIWA-Ar < 10". [[ASAM2020Withdrawal]]',
       icu:'In delirium, very large benzodiazepine doses may be needed. For resistant withdrawal ASAM allows phenobarbital (only by clinicians experienced with it, "given its narrow therapeutic window"), propofol in people who already need a ventilator, and dexmedetomidine in the ICU. [[ASAM2020Withdrawal]]'}[R.med]+
      (R.liver?' <b>Liver disease:</b> ASAM asks for an agent with less hepatic metabolism, warns of accumulation in older adults and in liver disease, and rules out valproic acid. [[ASAM2020Withdrawal]]':'');
    o.pt='Benzodiazepines calm the over-excited brain and lower the chance of seizures and DTs. "Symptom-triggered" means a dose is given only when the checklist score shows it is needed.';
    o.hook='Symptom-triggered dosing used less drug for a shorter time with similar safety (Saitz 1994: 100 vs 425 mg chlordiazepoxide; 9 vs 68 hours). [[Saitz1994]]'}
  if(i===3){
    const amb=R.set==='l1'||R.set==='l2';
    o.t='Protect the brain, correct the body';
    o.txt=(amb?'In ambulatory care, ASAM says oral thiamine can be offered: "Typical dosing is 100 mg PO per day for 3-5 days" (quoted as published). Patients drink non-caffeinated fluids, and a daily multivitamin may help. ':'In inpatient care, ASAM prefers IV or IM thiamine, typically "100 mg IV/IM per day for 3-5 days" (quoted as published), and says thiamine and glucose may be given "in any order or concurrently". ')+
      `Magnesium is given for low magnesium, arrhythmias, electrolyte disturbances or past withdrawal seizures; phosphorus is supplemented below 1 mg/dL. Emergency patients get a blood count and a metabolic panel including liver enzymes and magnesium, without delaying withdrawal treatment for the results. [[ASAM2020Withdrawal]] `+
      (R.sc==='del'?'People given repeated high IV doses of lorazepam or diazepam are watched for low sodium and metabolic acidosis. [[ASAM2020Withdrawal]] ':'')+
      'The full thiamine story is in <a href="#wernicke" data-go="wernicke">Thiamine, Wernicke and Korsakoff</a>.';
    o.pt='Vitamin B1 (thiamine) protects the brain. Fluids and salts such as magnesium are checked and topped up when they are low.';
    o.hook='Magnesium given only as a treatment for withdrawal itself "has no supporting evidence": it is for low levels and specific problems. [[ASAM2020Withdrawal]]'}
  if(i===4){
    o.t='A way into treatment';
    o.txt='ASAM 2020: withdrawal management alone "is not an effective treatment for alcohol use disorder". The withdrawal period is used to engage the person in treatment, including starting an AUD medicine when thinking allows, and a "warm handoff" to treatment providers. Gabapentin is a favourable withdrawal choice when the clinician also plans to use it for ongoing AUD treatment. The word "withdrawal management" has replaced the older "detoxification". [[ASAM2020Withdrawal]] See <a href="#medicines" data-go="medicines">approved medicines</a> and <a href="#therapy" data-go="therapy">talking therapies</a>.';
    o.pt='Getting through withdrawal is a first step. Ongoing treatment for alcohol use disorder is what helps recovery last. [[ASAM2020Withdrawal]]';
    o.hook='Repeated withdrawals may "kindle" worse ones: in Brown 1988, 48% of people with withdrawal seizures had 5 or more prior detoxifications, against 12% without seizures. [[Brown1988Kindling]]'}
  return o}

inits.detox=()=>{
  const svg=$('#dxSvg'),rg=$('#dxT');let sc='mild',liver=false,preg=false,setSt=()=>{};
  /* layout of the five stages: wide = columns, narrow = rows */
  function layout(N,R){const cols=[];
    if(!N){DX_COLS.forEach((C,c)=>{const x=12+c*142,w=130;let y=48;const boxes=C.opts.map(op=>{const tl=dxWrap(op.t,18),vl=dxWrap(dxVal(C,op,R),20);const h=12+tl.length*12.5+vl.length*11.5+5;const b={op,x,y,w,h,tl,vl};y+=h+7;return b});cols.push({C,x,w,hy:32,boxes,bot:y})});
      const mb=Math.max(...cols.map(c=>c.bot));return {cols,W:720,H:Math.round(mb+92),strip:{x0:56,x1:680,y:mb+40}}}
    let y=26;DX_COLS.forEach((C,c)=>{const n=C.opts.length,w=(376-(n-1)*5)/n;const hy=y+10;const boxes=C.opts.map((op,i)=>{const tl=dxWrap(op.t,Math.floor((w-8)/5.9)),vl=dxWrap(dxVal(C,op,R),Math.floor((w-8)/5.25));return {op,x:12+i*(w+5),y:y+18,w,tl,vl}});
      const h=Math.max(...boxes.map(b=>10+b.tl.length*11.5+b.vl.length*10.5+5));boxes.forEach(b=>b.h=h);cols.push({C,x:12,w:376,hy,boxes,bot:y+18+h});y+=18+h+16});
    return {cols,W:400,H:Math.round(y+96),strip:{x0:30,x1:370,y:y+40}}}
  function dxVal(C,op,R){if(C.k==='assess')return R.assess[op.id][0];if(C.k==='adj')return R.adj[op.id];if(C.k==='med'&&R.liver&&op.id===R.med&&op.id!=='cg')return op.d+'; liver: less hepatic metabolism';return op.d||''}
  function state(C,op,R){if(C.k==='assess')return R.assess[op.id][1]?'risk':'ok';if(C.k==='adj'||C.k==='next')return 'on';
    const ch=C.k==='set'?R.set:R.med,al=C.k==='set'?R.setAlt:R.medAlt;return op.id===ch?'on':al.includes(op.id)?'alt':'off'}
  function draw(t){
    const R=dxRoute(sc,liver,preg),N=NARROW(),L=layout(N,R);vb(svg,'720 '+L.H,'400 '+L.H);
    const pos=clamp((t-.06)/.86)*4,ph=phaseOf(DX_STEPS,t);let s=`<defs>${marker('dxA','var(--accent)')}</defs>`;
    /* path points: the chosen box in each stage */
    const P=L.cols.map((col,c)=>{let b;if(c===0||c===3||c===4){const a=col.boxes[0],z=col.boxes[col.boxes.length-1];return N?[(a.x+z.x+z.w)/2,a.y-4]:[a.x-1,(a.y+z.y+z.h)/2]}
      b=col.boxes.find(bb=>state(col.C,bb.op,R)==='on');return N?[b.x+b.w/2,b.y-4]:[b.x-1,b.y+b.h/2]});
    /* stage headers */
    L.cols.forEach((col,c)=>{const reached=pos>=c-.5;s+=`<text x="${f1(N?col.x:col.x+col.w/2)}" y="${f1(col.hy)}" class="t-sm${N?'':' t-mid'}" style="fill:${reached?'var(--accent)':'var(--muted)'};font-weight:600">${col.C.h.toUpperCase()}</text>`});
    /* path behind the boxes */
    let dd='';P.forEach((p,i)=>{dd+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])});
    s+=`<path d="${dd}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:4 5"/>`;
    const seg=Math.min(3,Math.floor(pos)),fr=ease(clamp(pos-seg)),tok=[lerp(P[seg][0],P[seg+1][0],fr),lerp(P[seg][1],P[seg+1][1],fr)];
    let dn='M'+f1(P[0][0])+' '+f1(P[0][1]);for(let i=1;i<=seg;i++)dn+='L'+f1(P[i][0])+' '+f1(P[i][1]);dn+='L'+f1(tok[0])+' '+f1(tok[1]);
    s+=`<path d="${dn}" style="fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:.75"/>`;
    /* boxes */
    L.cols.forEach((col,c)=>{const reached=pos>=c-.45;col.boxes.forEach(b=>{const st=state(col.C,b.op,R);
      let fill='var(--panel-2)',stroke='var(--line)',sw=1,op=.9,dash='';
      if(reached){if(st==='on'){fill='var(--accent-soft)';stroke='var(--accent)';sw=2.2;op=1}
        else if(st==='alt'){fill='var(--panel)';stroke='var(--accent)';sw=1.4;dash='4 3';op=1}
        else if(st==='risk'){fill='var(--bad-soft)';stroke='var(--bad)';sw=1.6;op=1}
        else if(st==='ok'){fill='var(--good-soft)';stroke='var(--good)';sw=1.2;op=1}
        else op=.5}
      s+=`<rect x="${f1(b.x)}" y="${f1(b.y)}" width="${f1(b.w)}" height="${f1(b.h)}" rx="8" style="fill:${fill};stroke:${stroke};stroke-width:${sw};opacity:${op}${dash?';stroke-dasharray:'+dash:''}"/>`;
      const tx=b.x+(N?5:7);let ty=b.y+(N?13:15);
      b.tl.forEach(l=>{s+=`<text x="${f1(tx)}" y="${f1(ty)}" style="font:700 ${N?10:11}px var(--body);fill:var(--ink);opacity:${reached||st!=='off'?1:.75}">${l}</text>`;ty+=N?11.5:12.5});
      ty+=1;const vc=!reached?'var(--muted)':st==='risk'?'var(--bad)':st==='ok'?'var(--good)':st==='on'?'var(--accent)':'var(--muted)';
      b.vl.forEach(l=>{s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-xs" style="fill:${vc}${N?';font-size:9px':''}">${l}</text>`;ty+=N?10.5:11.5});
      if(reached&&st==='on'&&(col.C.k==='set'||col.C.k==='med'))s+=`<circle cx="${f1(b.x+b.w-9)}" cy="${f1(b.y+9)}" r="4" style="fill:var(--accent)"/>`;
      if(reached&&st==='alt')s+=`<text x="${f1(b.x+b.w-5)}" y="${f1(b.y+b.h-5)}" class="t-xs t-end" style="fill:var(--accent)">alt.</text>`;
})});
    /* token: a person in a circle */
    s+=`<circle cx="${f1(tok[0])}" cy="${f1(tok[1])}" r="9.5" style="fill:var(--ember);stroke:var(--panel);stroke-width:2"/>`+person(tok[0],tok[1]-6,12,'var(--panel)');
    /* CIWA-Ar strip */
    const S=L.strip,mx=30,X=v=>lerp(S.x0,S.x1,v/mx),y=S.y;
    s+=`<text x="${S.x0}" y="${f1(y-30)}" class="t-sm" style="font-weight:600">CIWA-Ar BANDS (ASAM 2020)${N?'':' · scale to 30 of a possible 67 · ▼ = an example score, not a real patient'}</text>`;
    [[0,10,'var(--good)','mild <10'],[10,19,'var(--warn)','moderate 10–18'],[19,30,'var(--bad)','severe ≥19']].forEach(([a,b2,c,l])=>{s+=`<rect x="${f1(X(a))}" y="${f1(y-12)}" width="${f1(X(b2)-X(a)-1)}" height="16" rx="3" style="fill:${c};opacity:.2"/><text x="${f1((X(a)+X(b2))/2)}" y="${f1(y)}" class="t-xs t-mid" style="fill:${c}">${l}</text>`});
    [0,10,19,30].forEach(v=>s+=`<text x="${f1(X(v))}" y="${f1(y+18)}" class="t-xs t-mid">${v}</text>`);
    if(R.ciwa!=null){const v=R.ciwa*ease(ramp(t,0,.1)),xm=X(v);s+=`<path d="M${f1(xm)} ${f1(y-14)}l-6 -9h12Z" style="fill:var(--ink)"/><text x="${f1(xm)}" y="${f1(y+32)}" class="t-xs t-mid" style="fill:var(--ink)">example ${Math.round(v)}</text>`}
    else s+=`<text x="${f1((S.x0+S.x1)/2)}" y="${f1(y+34)}" class="t-xs t-mid" style="fill:var(--bad)">${N?'delirium: CIWA-Ar not used; RASS or CAM-ICU':'In delirium CIWA-Ar is not recommended: RASS or CAM-ICU are used instead (ASAM VI.9)'}</text>`;
    svg.innerHTML=s;setSt(ph);
    const nm=(k,id)=>DX_COLS.find(C=>C.k===k).opts.find(o=>o.id===id).t;
    $('#dxRead').innerHTML=`<span>person <b>${DX_NAMES[sc]}${liver?' + liver disease':''}${preg?' + pregnant':''}</b></span><span>setting <b>${nm('set',R.set)}</b></span><span>medicine <b>${nm('med',R.med)}</b></span><span>thiamine <b>${R.adj.thi}</b></span>`;
    $('#dxNote').innerHTML=noteHTML(dxNote(ph,R));
  }
  const stop=playWire(rg,$('#dxPlay'),draw,16000,'Replay','detox');
  setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  $$('[data-dxs]').forEach(b=>b.addEventListener('click',()=>{stop();sc=b.dataset.dxs;$$('[data-dxs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#dxLiver').addEventListener('click',()=>{liver=!liver;$('#dxLiver').setAttribute('aria-pressed',liver);draw(+rg.value)});
  $('#dxPreg').addEventListener('click',()=>{preg=!preg;$('#dxPreg').setAttribute('aria-pressed',preg);draw(+rg.value)});
  draw(+rg.value);

  /* ---- longer- vs shorter-acting: schematic levels over 72 hours ---- */
  const bz=$('#dxBz'),br=$('#dxBzT');let mode='both',acc=false;
  const DOSES=[0,8,16,24,32,40];
  function lev(k,h){const ka=1.6;let c=0;DOSES.forEach(d=>{if(h>=d){const u=h-d;c+=ka/(ka-k)*(Math.exp(-k*u)-Math.exp(-ka*u))}});return c}
  /* normalise each agent to a schematic peak under normal clearance */
  const pk=(k)=>{let m=0;for(let h=0;h<=48;h+=.25)m=Math.max(m,lev(k,h));return m};
  const KL=.035,KS=.26,NL=.62/pk(KL),NS=.74/pk(KS);
  const fL=h=>NL*lev(acc?KL*.3:KL,h),fS=h=>NS*lev(acc?KS*.7:KS,h);
  function drawB(t){const N=vb(bz,'720 300','400 346');const H=t*72;
    const x0=N?40:58,x1=N?384:700,y0=N?52:40,y1=N?292:230,X=h=>lerp(x0,x1,h/72),Y=v=>lerp(y1,y0,clamp(v,0,1.05)/1.05);
    let s=`<rect x="${x0}" y="${f1(Y(.3))}" width="${x1-x0}" height="${f1(y1-Y(.3))}" style="fill:var(--glu-soft);opacity:.8"/><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${f1(Y(.86)-y0)}" style="fill:var(--gaba-soft);opacity:.9"/>`;
    s+=`<text x="${x1-6}" y="${f1(y0+13)}" class="t-xs t-end" style="fill:var(--gaba)">too much: over-sedation</text><rect x="${x0}" y="${y1+34}" width="10" height="9" style="fill:var(--glu-soft);stroke:var(--glu);stroke-width:.8"/><text x="${x0+15}" y="${y1+42}" class="t-xs" style="fill:var(--glu)">too little: withdrawal symptoms can return</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/>`;
    [0,12,24,36,48,60,72].forEach(h=>s+=`<text x="${f1(X(h))}" y="${y1+14}" class="t-xs t-mid">${h}</text>`);
    s+=`<text x="${x1}" y="${y1+28}" class="t-xs t-end">hours after the first dose (schematic)</text><text x="${x0-6}" y="${f1(Y(.55))}" class="t-xs t-end" transform="rotate(-90 ${x0-10} ${f1(Y(.55))})">drug effect</text>`;
    DOSES.forEach(d=>{s+=`<path d="M${f1(X(d))} ${y1+2}l-4 7h8Z" style="fill:var(--rx);opacity:${H>=d?1:.3}"/>`});
    s+=`<text x="${f1(X(20))}" y="${N?y0-26:y0-12}" class="t-xs t-mid" style="fill:var(--rx)">▲ doses, then the taper ends at 40 h</text>`;
    const line=(f,col,lab,dash)=>{if(H<=0)return '';const d=pathFn(u=>f(u*H)/1.05,x0,X(H),y1,y0,220);const e=f(H);
      return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/><circle cx="${f1(X(H))}" cy="${f1(Y(e))}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`};
    if(mode!=='short')s+=line(fL,'var(--rx)');
    if(mode!=='long'){s+=line(fS,'var(--accent)','',acc?'':'');
      /* mark dips into the symptom band */
      for(let h=4;h<=Math.min(H,72);h+=.5){const v=fS(h),p=fS(h-.5),n=fS(h+.5);if(v<.3&&v<=p&&v<=n)s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(v))}" r="6.5" style="fill:none;stroke:var(--glu);stroke-width:1.8"/>`}}
    if(mode!=='long'&&!acc&&H>=54)s+=`<text x="${x1}" y="${f1(Y(.3)-6)}" class="t-xs t-end" style="fill:var(--accent)">${N?'short: rebound':'shorter-acting: rebound'}</text>`;
    if(mode!=='short'&&H>=54)s+=`<text x="${x1}" y="${f1(Y(fL(54))-10)}" class="t-xs t-end" style="fill:var(--rx)">${N?'long: tapers itself':'longer-acting: tapers itself'}</text>`;
    if(acc&&mode!=='short'&&H>=30)s+=`<text x="${x0+6}" y="${f1(y0+13)}" class="t-xs" style="fill:var(--gaba)">both accumulate</text>`;
    s+=`<g transform="translate(${x0} ${N?18:14})"><line x1="0" x2="18" y1="0" y2="0" style="stroke:var(--rx);stroke-width:3"/><text x="24" y="3.5" class="t-xs">longer-acting</text><line x1="${N?110:120}" x2="${N?128:138}" y1="0" y2="0" style="stroke:var(--accent);stroke-width:3"/><text x="${N?134:144}" y="3.5" class="t-xs">shorter-acting</text>${N?'':'<circle cx="262" cy="0" r="5" style="fill:none;stroke:var(--glu);stroke-width:1.6"/><text x="272" y="3.5" class="t-xs">dip into the symptom band</text>'}</g>`;
    bz.innerHTML=s;
    const late=H>=44;
    $('#dxBzNote').innerHTML=noteHTML({k:`Hour ${Math.round(H)} · ${acc?'older adult or liver disease':'usual clearance'}`,t:acc?'When the drug piles up':late?'After the last dose':'During dosing',
      txt:acc?'ASAM 2020 warns that very large benzodiazepine doses can accumulate in older adults and in people with liver disease, causing over-sedation and slowed breathing, and asks for an agent with less hepatic metabolism in significant liver disease. Here both schematic curves clear more slowly, and the longer-acting one climbs into the over-sedation band. [[ASAM2020Withdrawal]]':
        late?'Once doses stop, a longer-acting agent fades gradually: it "tapers itself", giving a smoother course with less rebound. A shorter-acting agent falls quickly, and Saitz describes more risk of rebound symptoms with short-acting agents, including late seizures. ASAM\'s sample fixed-schedule regimen tapers the daily dose "by 25-50% per day over 3-5 days" (quoted, not an instruction). [[Saitz1998AHRW,ASAM2020Withdrawal]]':
        'With repeated doses, a longer-acting agent builds to an even level. A shorter-acting agent peaks and dips with every dose, and between doses the effect can sink low enough for symptoms to return (circled). ASAM still finds no benzodiazepine more effective than another: duration and liver handling, not strength, guide the choice. [[ASAM2020Withdrawal,Saitz1998AHRW]]',
      pt:acc?'In an older person or someone whose liver works poorly, the medicine can build up and make them too sleepy. Teams watch for this closely.':'A longer-acting medicine is like a slow dimmer; a shorter-acting one switches on and off. The slow one gives a steadier ride.',
      hook:'ASAM prefers longer-acting benzodiazepines (diazepam, chlordiazepoxide for front loading); in significant liver disease, an agent with less hepatic metabolism. [[ASAM2020Withdrawal]]'});
  }
  playWire(br,$('#dxBzPlay'),drawB,9000,'Replay','detox');
  $$('[data-dxb]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.dxb;$$('[data-dxb]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB(+br.value)}));
  $('#dxAcc').addEventListener('click',()=>{acc=!acc;$('#dxAcc').setAttribute('aria-pressed',acc);drawB(+br.value)});
  drawB(+br.value);

  /* ---- trial results as bars ---- */
  const fx=$('#dxFx');let fset='ms',stopF=null;
  const FX={
   ms:{t:'Benzodiazepines prevent seizures and delirium',unit:'fewer cases per 100 patients',max:14,
     rows:[{l:'Seizures',v:7.7,lo:3.5,hi:12,txt:'7.7 (95% CI 3.5–12.0)'},{l:'Delirium',v:4.9,lo:.7,hi:9,txt:'4.9 (95% CI 0.7–9.0)'}],
     cap:'Mayo-Smith 1997 ASAM meta-analysis: benzodiazepines against control. The 2010 Cochrane review found benzodiazepines protected against seizures against placebo (RR 0.16, 95% CI 0.04–0.69). [[MayoSmith1997,Amato2010Cochrane]]'},
   st:{t:'Symptom-triggered vs fixed schedule',pairs:true,
     rows:[{l:'Saitz 1994: hours of treatment (median)',a:9,b:68,u:'h'},{l:'Saitz 1994: chlordiazepoxide (mg)',a:100,b:425,u:'mg'},{l:'Daeppen 2002: hours (mean)',a:20.0,b:62.7,u:'h'},{l:'Daeppen 2002: oxazepam (mg, mean)',a:37.5,b:231.4,u:'mg'},{l:'Daeppen 2002: people given any drug',a:39,b:100,u:'%'}],
     la:'symptom-triggered',lb:'fixed schedule',
     cap:'Two double-blind trials. Saitz 1994 (101 inpatients, history of seizures excluded): no difference in severity, seizures or DT. Daeppen 2002 (117 patients): one seizure in the symptom-triggered group; comfort did not differ. [[Saitz1994,Daeppen2002]]'},
   more:{t:'Seizure, ICU and ventilator outcomes',pairs:true,
     rows:[{l:'Recurrent seizure in 6 h: IV lorazepam vs placebo (RCT)',a:3,b:24,u:'%'},{l:'ICU admission: phenobarbital + protocol vs placebo + protocol (RCT)',a:8,b:25,u:'%'},{l:'On a ventilator: after vs before an ICU guideline (before-after)',a:22,b:47,u:'%'},{l:'On a ventilator: phenobarbital vs CIWA-Ar protocol (retrospective)',a:2,b:23,u:'%'}],
     la:'first-named group',lb:'comparison',
     cap:'D\'Onofrio 1999 (186 ED patients after an alcohol-related seizure), Rosenson 2013 (102 ED patients), Gold 2007 (95 ICU patients), Tidwell 2018 (retrospective ICU cohort). Only the first two are randomised; an ED meta-analysis found no significant phenobarbital benefit for ICU admission (RR 0.92). [[DOnofrio1999NEJM,Rosenson2013,Gold2007CCM,Tidwell2018,Lee2024AEM]]'}};
  function drawF(p){const N=vb(fx,'720 300','400 '+(fset==='ms'?300:fset==='st'?470:420));const F=FX[fset];let s='';
    s+=`<text x="${N?12:20}" y="22" class="t-lbl">${F.t}</text>`;
    if(!F.pairs){const x0=N?20:150,x1=N?380:690,X=v=>lerp(x0,x1,v/F.max);
      F.rows.forEach((r,i)=>{const y=N?70+i*96:70+i*84;const v=r.v*ease(p);
        s+=`<text x="${N?x0:x0-12}" y="${N?y-10:y+20}" class="t-lbl${N?'':' t-end'}">${r.l}</text>`;
        s+=`<rect x="${x0}" y="${y}" width="${f1(X(v)-x0)}" height="30" rx="5" style="fill:var(--rx);opacity:.85"/>`;
        if(p>.9){s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y+15}" y2="${y+15}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${y+8}" y2="${y+22}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(X(r.hi))}" x2="${f1(X(r.hi))}" y1="${y+8}" y2="${y+22}" style="stroke:var(--ink);stroke-width:1.6"/>`}
        s+=`<text x="${N?x0:f1(X(r.hi)+10)}" y="${N?y+48:y+19}" class="t-sm" style="fill:var(--ink)">${f1(v)} ${N?'':' · '}${N?'':r.txt.replace(/^[0-9.]+ /,'')}</text>`});
      const ya=N?260:250;[0,2,4,6,8,10,12,14].forEach(v=>s+=`<text x="${f1(X(v))}" y="${ya}" class="t-xs t-mid">${v}</text>`);
      s+=`<line x1="${x0}" x2="${x1}" y1="${ya-12}" y2="${ya-12}" class="axis"/><text x="${x1}" y="${ya+16}" class="t-xs t-end">${F.unit} · whiskers = 95% CI</text>`}
    else{const x0=N?14:300,x1=N?380:690;
      F.rows.forEach((r,i)=>{const y=N?58+i*(fset==='st'?80:86):50+i*(fset==='st'?46:56),m=Math.max(r.a,r.b),X=v=>lerp(x0,x1-(N?40:60),v/m);
        const lab=dxWrap(r.l,N?56:46);lab.forEach((l,j)=>s+=`<text x="${N?x0:x0-12}" y="${f1(N?y-6-(lab.length-1-j)*11:y+10+j*11)}" class="t-xs${N?'':' t-end'}" style="fill:var(--ink)">${l}</text>`);
        const a=r.a*ease(p),b=r.b*ease(p);
        s+=`<rect x="${x0}" y="${y}" width="${f1(Math.max(1,X(a)-x0))}" height="15" rx="3" style="fill:var(--rx)"/><text x="${f1(X(a)+5)}" y="${y+11.5}" class="t-xs" style="fill:var(--ink)">${f1(a).replace('.0','')} ${r.u}</text>`;
        s+=`<rect x="${x0}" y="${y+18}" width="${f1(Math.max(1,X(b)-x0))}" height="15" rx="3" style="fill:var(--muted);opacity:.7"/><text x="${f1(X(b)+5)}" y="${y+29.5}" class="t-xs" style="fill:var(--ink)">${f1(b).replace('.0','')} ${r.u}</text>`});
      const ly=N?(fset==='st'?455:405):(fset==='st'?286:282);
      s+=`<rect x="${N?14:x0}" y="${ly-9}" width="12" height="10" rx="2" style="fill:var(--rx)"/><text x="${N?30:x0+16}" y="${ly}" class="t-xs">${F.la}</text><rect x="${N?170:x0+170}" y="${ly-9}" width="12" height="10" rx="2" style="fill:var(--muted);opacity:.7"/><text x="${N?186:x0+186}" y="${ly}" class="t-xs">${F.lb}</text>`}
    fx.innerHTML=s}
  const FXN={ms:{k:'Mayo-Smith 1997 · meta-analysis',t:'Why benzodiazepines come first',txt:'Benzodiazepines reduced delirium by 4.9 cases per 100 patients (P=.04) and seizures by 7.7 per 100 (P=.003). Beta-blockers, clonidine and carbamazepine eased symptoms, but the evidence was inadequate for their effect on seizures and delirium. Phenothiazines eased symptoms but were less effective than benzodiazepines at preventing delirium and seizures. Within the first 2 days, reviews describe benzodiazepines reducing seizures by up to 84%. [[MayoSmith1997,Jesse2017,Mirijello2015]]',
      pt:'For every 100 people treated, about 8 fewer had a seizure and about 5 fewer had delirium than without these medicines.',hook:'Benzodiazepines reduce both seizures and delirium. Alpha-2 agonists and beta-blockers only mask autonomic signs and should not be used alone. [[MayoSmith1997,ASAM2020Withdrawal]]'},
    st:{k:'Two randomised trials',t:'Give it when it is needed',txt:'Dosing by the CIWA-Ar score meant far less medicine for a far shorter time, with no difference in severity, seizures or DT in Saitz 1994; in Daeppen 2002, only 39% of the symptom-triggered group needed any oxazepam at all. A 1997 meta-analysis found that individualising therapy with withdrawal scales gives significantly less medication and shorter treatment. Symptom-triggered dosing needs a patient who has recently been drinking and can talk: in one hospital audit only 48% of patients on a CIWA-Ar protocol met both conditions. [[Saitz1994,Daeppen2002,MayoSmith1997,Hecksel2008]]',
      pt:'Instead of a fixed dose every few hours, the nurse checks the symptoms and gives medicine only when the score is high enough.',hook:'Saitz 1994: 100 vs 425 mg chlordiazepoxide, 9 vs 68 hours. ASAM: symptom-triggered is "the preferred benzodiazepine dosing method" in inpatients. [[Saitz1994,ASAM2020Withdrawal]]'},
    more:{k:'Emergency department and ICU',t:'After a seizure, and in the ICU',txt:'After a witnessed alcohol-related seizure, IV lorazepam cut recurrent seizures in 6 hours to 3/100 against 21/86 on placebo, and admissions from 42% to 29%. In the ICU, a guideline of escalating benzodiazepine doses plus phenobarbital went with fewer people needing ventilation, and a retrospective phenobarbital protocol with shorter ICU stays (2.4 vs 4.4 days). Before-after and retrospective studies can mislead, and an ICU meta-analysis rated the evidence for phenobarbital pathways very low certainty. [[DOnofrio1999NEJM,Gold2007CCM,Tidwell2018,Rizwan2026]] <span class="ev early">Early evidence</span>',
      pt:'A medicine given right after a seizure greatly lowers the chance of a second one. In intensive care, teams are still studying which plan works best.',hook:'After an alcohol withdrawal seizure: benzodiazepines prevent recurrence; phenytoin does not. [[DOnofrio1999NEJM,Hillbom2003,ASAM2020Withdrawal]]'}};
  function setF(k){fset=k;$$('[data-dxf]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.dxf===k));$('#dxFxCap').innerHTML=FX[k].cap;$('#dxFxNote').innerHTML=noteHTML(FXN[k]);if(stopF)stopF();stopF=animate(900,drawF,()=>{stopF=null});setTimeout(()=>{if(stopF&&fset===k){stopF();stopF=null;drawF(1)}},1600)}
  $$('[data-dxf]').forEach(b=>b.addEventListener('click',()=>setF(b.dataset.dxf)));
  $('#dxFxCap').innerHTML=FX.ms.cap;$('#dxFxNote').innerHTML=noteHTML(FXN.ms);drawF(1);
  const prevR=redraws.detox;redraws.detox=()=>{prevR&&prevR();drawF(1)};
};
