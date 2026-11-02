/* =============== 4.3 Surgery & anaesthesia =============== */
inits.surgery=()=>{
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st,rx=0)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===val)));
  const TN={h:'hEDS',c:'cEDS',v:'vEDS'};

  /* ================= 1. peri-operative pathway ================= */
  let ty='h';
  const svg=$('#suSvg'),rg=$('#suT');
  /* anchor points in the scene's own frame (470 x 300) */
  const A={mouth:[50,162],neck:[94,200],clip:[318,66],shoulder:[122,178],elbow:[180,194],hand:[238,190],upperArm:[150,188],abdomen:[206,166],abdomen2:[234,166],
    groin:[262,180],groin2:[270,192],thigh:[318,172],heel:[414,200],chest:[150,166],back:[196,204]};
  const ITEMS=[
    {s:0,ty:'hcv',a:'mouth',l:['Airway assessment','for every type'],x:`Comprehensive airway assessment for all EDS types, and planning around common comorbidities, reached consensus in the 2026 Delphi panel. [[Amaral2026]]`},
    {s:0,ty:'hcv',a:'clip',l:['Ask: has numbing','failed before?'],x:`Record any history of failed local anaesthesia, for example during dental work, and earlier failed regional blocks. [[Wiesmann2014]]`},
    {s:0,ty:'cv',a:'hand',l:['Bleeding work-up;','consider desmopressin'],x:`The Delphi panel recommends bleeding-risk evaluation, and considering desmopressin, in classical, classical-like, kyphoscoliotic and vascular EDS. [[Amaral2026]]`},
    {s:0,ty:'h',a:'hand',l:['Bleeding history:','often multifactorial'],x:`In 17 adults (10 hEDS, 7 classical), bleeding scores were often high (90% in hEDS) yet ROTEM clotting tests were normal, suggesting bleeding in EDS is multifactorial (Early evidence). Desmopressin is recommended for people with a positive bleeding history. [[Lam2025CJA,Wiesmann2014]]`},
    {s:0,ty:'v',a:'abdomen',l:['Is the operation','really needed?'],x:`GeneReviews discourages elective surgery in vEDS unless the benefit is expected to be substantial. [[Byers2025GeneReviews]]`},
    {s:0,ty:'hcv',a:'neck',l:['Neck instability','may be hidden'],x:`Subclinical cervical-spine instability may be present even when neck and jaw mobility seem normal. [[Wiesmann2014]]`},
    {s:1,ty:'hcv',a:'heel',l:['Pad pressure','points'],x:`Padding reduces shear and pressure. [[Wiesmann2014]]`},
    {s:1,ty:'hcv',a:'shoulder',l:['Move joints gently;','protect nerves, eyes'],x:`Position and mobilise carefully to avoid dislocation; careless positioning risks brachial plexus injury and visual loss from pressure on the eye. [[Wiesmann2014]]`},
    {s:1,ty:'hcv',a:'neck',l:['Upper-neck','instability'],x:`Occipito-atlanto-axial instability, with TMJ dysfunction and early spondylosis, is one reason intubation is difficult more often than usual. [[Wiesmann2014]]`},
    {s:1,ty:'hcv',a:'upperArm',l:['Blood-pressure cuff','can bruise'],x:`Repeated non-invasive blood-pressure cuff inflations can cause bruising and haematoma. [[Wiesmann2014]]`},
    {s:1,ty:'hcv',a:'elbow',l:['Gentle tapes','and dressings'],x:`Adhesive tapes and dressings should be easy to remove, or avoided, because of the risk of severe skin damage. [[Wiesmann2014]]`},
    {s:2,ty:'hcv',a:'mouth',l:['Jaw can dislocate;','fibreoptic option'],x:`Care is needed during mask ventilation to avoid dislocating the temporomandibular joint. Elective fibreoptic intubation should be considered when difficulty is anticipated. [[Wiesmann2014]]`},
    {s:2,ty:'hcv',a:'chest',l:['Small tube, low cuff','and airway pressure'],x:`Repeated intubation attempts may cause bleeding and smaller tubes may reduce mucosal damage. Cuff pressure is kept as low as possible, and airway pressure minimised because of pneumothorax risk. [[Wiesmann2014]]`},
    {s:2,ty:'v',a:'neck',l:['Avoid central and','arterial lines'],x:`In vEDS, avoid central venous access and arterial puncture whenever possible, and invasive blood-pressure monitoring in non-emergency surgery. If a central line is needed, ultrasound guidance is "mandatory", including seeing the wire inside the vessel. [[Wiesmann2014]]`},
    {s:2,ty:'hc',a:'elbow',l:['Ultrasound for','venous access'],x:`Ultrasound may reduce repeated vascular punctures. [[Wiesmann2014]]`},
    {s:2,ty:'v',a:'back',l:['Spinal or epidural:','avoid if possible'],x:`Wiesmann recommends avoiding neuraxial anaesthesia in vEDS; the Delphi panel advises cautious use with individual risk-benefit analysis because of haematoma risk. [[Wiesmann2014,Amaral2026]]`},
    {s:2,ty:'hc',a:'back',l:['Regional blocks after','spinal assessment'],x:`Neuraxial blocks are considered feasible in other EDS types after spinal assessment, and for hEDS the Delphi panel recommends multimodal and regional strategies. [[Wiesmann2014,Amaral2026]]`},
    {s:2,ty:'hcv',a:'hand',l:['Local anaesthetic','may wear off sooner'],x:`In a crossover trial, lidocaine worked equally at 5 minutes, but fewer people with EDS were still numb at 15 (60% vs 84%) and 30 minutes (53% vs 80%). [[Bourne2026RAPM]]`},
    {s:3,ty:'c',a:'abdomen',l:['Two-layer closure;','stitches left 2× longer'],x:`GeneReviews (classic EDS): close dermal wounds without tension, preferably in two layers; apply deep stitches generously; leave skin stitches twice as long as usual; tape the adjacent skin edges to stop the scar stretching. [[Malfait2024GeneReviews]]`},
    {s:3,ty:'hcv',a:'groin',l:['Bleeding plan:','DDAVP, tranexamic acid'],x:`In a retrospective series of 41 procedures in 26 patients, there were no bleeding complications when desmopressin was given before surgery, versus 30% when it was not. Prophylactic tranexamic acid may be considered, as in other bleeding disorders. [[Wiesmann2014]]`},
    {s:3,ty:'h',a:'abdomen',l:['Type-specific plan,','not vEDS rules'],x:`The Delphi panel gives type-specific advice, so vEDS fragility precautions are not applied to every type by default. [[Amaral2026]]`},
    {s:3,ty:'v',a:'thigh',l:['Tourniquets:','reported dangers'],x:`The review authors report anecdotal knowledge of severe and lethal complications from tourniquets in minor limb surgery in vEDS, including massive compartment bleeding and haemorrhagic shock. [[Wiesmann2014]]`},
    {s:3,ty:'v',a:'groin2',l:['No unnecessary','arteriography'],x:`Arteriography is used only to find life-threatening bleeding before surgery; a historical series reported a 67% complication rate. [[Byers2025GeneReviews,Cikrit1987]]`},
    {s:3,ty:'v',a:'abdomen2',l:['Open or endovascular:','a team decision'],x:`Published cases show 30% mortality after open surgery and 24% after endovascular procedures (likely publication bias); one series had 46% procedure-related morbidity. The ACC/AHA leaves decisions to a multidisciplinary aortic team, and a US cohort concluded vEDS "should not be a deterrent" when an operation is needed. [[Bergqvist2013,Oderich2005,Isselbacher2022,Shalhub2019JVS]]`},
    {s:4,ty:'h',a:'clip',l:['Outcomes vary:','set expectations'],x:`In a hEDS cohort of 79, 70.9% had had surgery, mainly on the limbs and abdomen, and only 33.9% of those reported a positive outcome. [[Rombaut2011F]]`},
    {s:4,ty:'hc',a:'abdomen',l:['Pain plan beyond','opioids'],x:`For hEDS the Delphi panel recommends multimodal strategies. After hip replacement, 14.8% of people with EDS who received opioids had a dislocation vs 2.1% without; the authors caution against reading this as cause and effect. [[Amaral2026,Kelly2024THA]]`},
    {s:4,ty:'c',a:'abdomen2',l:['Tape wound edges;','late stitch removal'],x:`Skin stitches stay in about twice as long as usual, and the adjacent skin edges are taped so the scar does not stretch. [[Malfait2024GeneReviews]]`},
    {s:4,ty:'hcv',a:'elbow',l:['Gentle removal of','tapes, dressings'],x:`Tapes and dressings that are easy to remove protect fragile skin. [[Wiesmann2014]]`},
    {s:4,ty:'v',a:'abdomen2',l:['Sudden pain =','emergency'],x:`People with vEDS are advised to seek immediate medical attention for sudden, unexplained pain. [[Byers2025GeneReviews]]`},
    {s:4,ty:'hcv',a:'shoulder',l:['Mobilise','carefully'],x:`Mobilise carefully to avoid joint dislocation. [[Wiesmann2014]]`}
  ];
  const STEPS=[
    {from:0,at:.1,k:'Stage 1 of 5',t:'Pre-operative assessment',
     txt:`EDS anaesthesia knowledge "is fragmented and consists mostly of case reports, small case series and expert opinion". The 2026 modified-Delphi survey (15 experts, 3 rounds) agreed 7 guidelines, the first consensus-based anaesthesia guidance for EDS. [[Wiesmann2014,Amaral2026]]`,
     pt:`Before any operation, tell the team about EDS and its type. They may plan extra padding, gentle positioning, careful breathing-tube placement and steps to reduce bleeding.`,
     hook:`Delphi 2026: comprehensive airway assessment for all EDS types; type-specific advice for the rest. [[Amaral2026]]`},
    {from:.2,at:.3,k:'Stage 2 of 5',t:'Positioning',
     txt:`Unstable joints, fragile skin and easily bruised tissue make positioning a step of its own. [[Wiesmann2014]]`,
     pt:`Soft padding and slow, careful moves on the table protect joints, skin and nerves.`,
     hook:`Careless positioning: brachial plexus injury and visual loss from eye pressure. [[Wiesmann2014]]`},
    {from:.4,at:.5,k:'Stage 3 of 5',t:'Anaesthesia and airway',
     txt:`Mask ventilation, intubation and laryngeal mask are all possible. Difficult intubation should be expected more often than in the general population. [[Wiesmann2014]]`,
     pt:`Numbing injections often wear off faster in EDS. Tell your dentist or doctor if numbing has failed before.`,
     hook:`vEDS: avoid neuraxial blocks and invasive lines where possible; ultrasound if a central line is unavoidable. [[Wiesmann2014]]`},
    {from:.6,at:.7,k:'Stage 4 of 5',t:'Incision and closure',
     txt:`Wound and vessel fragility differ by type: classical EDS needs meticulous closure, vascular EDS needs protection of the arteries, and hEDS should not be treated with vEDS rules by default. [[Malfait2024GeneReviews,Byers2025GeneReviews,Amaral2026]]`,
     pt:`Cuts in classic EDS heal best with careful stitches that stay in longer than usual.`,
     hook:`cEDS: two-layer, tension-free closure; skin stitches left twice as long. [[Malfait2024GeneReviews]]`},
    {from:.8,at:.9,k:'Stage 5 of 5',t:'Recovery',
     txt:`Recovery plans cover pain, skin, careful mobilisation and, in vEDS, a low threshold for urgent assessment. [[Wiesmann2014,Byers2025GeneReviews]]`,
     pt:`After surgery, move gently, look after the skin, and in vascular EDS treat sudden new pain as an emergency.`,
     hook:`hEDS: 70.9% had surgery, only 33.9% reported a positive outcome. [[Rombaut2011F]]`}
  ];
  const STAGES=['Pre-op','Position','Anaesthesia','Incision','Recovery'];
  function scene(p,t,f){
    let s='';
    /* table */
    s+=R(36,200,398,10,'fill:var(--panel-2);stroke:var(--muted);stroke-width:1',3)+R(222,210,26,70,'fill:var(--panel-2);stroke:var(--muted)')+R(170,280,130,10,'fill:var(--panel-2);stroke:var(--muted)',4);
    /* pads (positioning onwards) */
    if(p>=1){const o=f1(p===1?ease(ramp(t,.2,.26)):1);[[52,194,36],[168,196,30],[396,196,30]].forEach(([x,y,w])=>s+=R(x,y,w,7,`fill:var(--rx);opacity:${o*.55}`,3))}
    /* patient */
    const sk='fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1.2';
    s+=R(258,172,152,24,sk,10)+R(404,150,14,48,sk,5);
    s+=R(98,164,166,34,sk,14)+`<circle cx="70" cy="178" r="15" style="${sk}"/>`+R(82,174,20,14,sk,4);
    s+=`<path d="M122 182L180 192L238 190" style="fill:none;stroke:var(--skin-line);stroke-width:12;stroke-linecap:round;stroke-linejoin:round"/><path d="M122 182L180 192L238 190" style="fill:none;stroke:var(--skin-epi);stroke-width:9.6;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<circle cx="66" cy="172" r="1.8" style="fill:var(--ink)"/>`;
    /* gown */
    s+=R(110,164,140,34,'fill:var(--dx-soft);opacity:.75',12);
    /* BP cuff */
    if(p>=1)s+=R(140,181,22,13,`fill:var(--dx);opacity:.8`,3);
    /* clipboard or clock */
    if(p===0){s+=R(292,36,56,70,'fill:var(--panel);stroke:var(--ink);stroke-width:1.4',5)+R(308,30,24,10,'fill:var(--ink)',3);for(let i=0;i<4;i++){const on=ramp(t,.02+i*.03,.05+i*.03);s+=R(300,52+i*13,6,6,`fill:${on>0?'var(--rx)':'none'};stroke:var(--muted)`,1)+R(310,54+i*13,30*Math.max(.4,on),2.4,'fill:var(--muted)')}}
    if(p===4){s+=`<circle cx="320" cy="70" r="30" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;const a=t*40;s+=`<path d="M320 70L${f1(320+Math.sin(a)*20)} ${f1(70-Math.cos(a)*20)}M320 70L${f1(320+Math.sin(a/12)*13)} ${f1(70-Math.cos(a/12)*13)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`}
    /* airway and lines (anaesthesia onwards) */
    if(p>=2&&p<=3){s+=R(4,100,40,56,'fill:var(--panel-2);stroke:var(--muted)',4)+`<path d="M44 128C60 128 52 170 58 176" style="fill:none;stroke:var(--muted);stroke-width:3"/>`;
      s+=`<path d="M10 140${[0,1,2,3,4,5].map(i=>`L${14+i*5} ${140-Math.abs(Math.sin(t*30+i))*12}`).join('')}" style="fill:none;stroke:var(--accent);stroke-width:1.4"/>`}
    if(p>=2){s+=`<line x1="262" y1="20" x2="262" y2="196" style="stroke:var(--muted);stroke-width:2"/>`+R(250,24,24,32,'fill:var(--dx-soft);stroke:var(--dx)',6)+`<path d="M262 56C262 120 240 150 238 188" style="fill:none;stroke:var(--dx);stroke-width:1.4;stroke-dasharray:3 3"/>`}
    /* incision and stitches */
    if(p>=3){const k=p===3?ramp(t,.6,.68):1;s+=`<line x1="186" y1="165" x2="${f1(186+50*k)}" y2="165" style="stroke:var(--blood);stroke-width:2"/>`;
      const st=p===3?ramp(t,.68,.78):1;for(let i=0;i<Math.round(7*st);i++)s+=`<line x1="${189+i*7}" y1="160" x2="${189+i*7}" y2="170" style="stroke:var(--ink);stroke-width:1.2"/>`}
    if(p===3&&ty==='v')s+=R(306,168,14,32,'fill:var(--vas);opacity:.75',3);
    return s}
  function draw(t){
    const N=vb(svg,'720 390','400 640');
    const p=phaseOf(STEPS,t),f=ramp(t,STEPS[p].from,STEPS[p].from+.16);
    let s='';
    /* pathway bar */
    const bx=16,bw=(N?368:688)/5;
    STAGES.forEach((n,i)=>{const on=i===p,done=i<p,x=bx+i*bw;
      s+=R(x,10,bw-6,26,`fill:${on?'var(--rx-soft)':done?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?2:1}`,13)+T(x+(bw-6)/2,27,N?(i+1):(i+1)+' · '+n,'t-sm t-mid',on?'fill:var(--rx);font-weight:700':'')});
    const sc=N?.84:1,ox=N?4:8,oy=N?44:56;
    const items=ITEMS.filter(o=>o.s===p&&o.ty.includes(ty));
    s+=`<g transform="translate(${ox} ${oy}) scale(${sc})">`+scene(p,t,f);
    items.forEach((o,i)=>{const a=ramp(f,i/(items.length+1),(i+1)/(items.length+1));if(a<=0)return;const[x,y]=A[o.a],col=o.ty==='v'?'var(--vas)':'var(--rx)',dy=-(i%2)*4;
      s+=`<circle cx="${x}" cy="${y+dy}" r="${f1(9+6*(1-a))}" style="fill:none;stroke:${col};stroke-width:1.5;opacity:${f1(1-a*.6)}"/><circle cx="${x}" cy="${y+dy}" r="8.5" style="fill:${col};opacity:${f1(a)}"/>`+T(x,y+dy+4,i+1,'t-sm t-mid',`fill:var(--bg);font-weight:700;opacity:${f1(a)}`)});
    s+='</g>';
    /* list */
    const lx=N?16:488,ly=N?316:66,lw=N?368:220;
    s+=R(lx-8,ly-24,lw+16,N?310:310,'fill:var(--field);stroke:var(--line)',12);
    s+=T(lx,ly-4,STEPS[p].t.toUpperCase()+' · '+TN[ty],'t-xs','font-weight:700;fill:var(--ink)');
    items.forEach((o,i)=>{const a=ramp(f,i/(items.length+1),(i+1)/(items.length+1)),y=ly+22+i*(N?54:54),col=o.ty==='v'?'var(--vas)':'var(--rx)';
      s+=`<g style="opacity:${f1(.25+.75*a)}"><circle cx="${lx+9}" cy="${y-4}" r="9" style="fill:${col}"/>`+T(lx+9,y,i+1,'t-sm t-mid','fill:var(--bg);font-weight:700');
      s+=T(lx+26,y,o.l[0],N?'t-lbl':'t-sm',N?'':'fill:var(--ink);font-weight:600')+T(lx+26,y+16,o.l[1],'t-sm')+(o.ty==='v'?T(lx+lw,y,'vEDS','t-xs t-end','fill:var(--vas);font-weight:700'):'')+'</g>'});
    if(!items.length)s+=T(lx,ly+22,'No type-specific items','t-sm');
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',STEPS[p].t+', '+TN[ty]);
    $('#suNote').innerHTML=noteHTML(STEPS[p])+`<div class="kv"><div><dt>${TN[ty]}: ${items.length} considerations</dt><dd><ol style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${items.map(o=>`<li>${o.x}</li>`).join('')}</ol></dd></div></div>`;
  }
  const stop=playWire(rg,$('#suPlay'),draw,26000,'%t:player.replay%','surgery');
  const setSt=stepWire($('#suSteps'),STEPS,rg,draw,stop);
  $$('[data-sutype]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.sutype;press('[data-sutype]','sutype',ty);draw(+rg.value)}));
  draw(+rg.value);

  /* ================= 2. local anaesthetic icon arrays ================= */
  const la=$('#suLa');let mode='t15',cur={a:60,b:84},laStop=null;
  const LA={
    t15:{a:60,b:84,la:'EDS',lb:'Controls',what:'still numb at 15 min',col:'var(--rx)',
      note:{k:'Crossover trial · 2026',t:'Numb at 15 minutes: 60% vs 84%',txt:`In a randomised crossover trial (91 people with EDS, 44 healthy controls), subcutaneous lidocaine numbed both groups similarly at 5 minutes (p=0.2). At 15 minutes fewer people with EDS had anaesthesia (60% vs 84%, p=0.006). The registered primary outcome was the pain score at 5 minutes; the positive findings were at later times. (<span class="ev early">Early evidence</span>) [[Bourne2026RAPM,NCT05603741]]`,
       pt:`Numbing works at first in EDS, but in this trial it seemed to wear off sooner.`,hook:`Lidocaine in EDS: equal onset, shorter duration. [[Bourne2026RAPM]]`}},
    t30:{a:53,b:80,la:'EDS',lb:'Controls',what:'still numb at 30 min',col:'var(--rx)',
      note:{k:'Crossover trial · 2026',t:'Numb at 30 minutes: 53% vs 80%',txt:`At 30 minutes, 53% of people with EDS and 80% of controls still had anaesthesia (p=0.003). The authors interpret this as a shorter duration of lidocaine effect. An older controlled study of 8 people with EDS found intradermal lidocaine worked at 5 minutes but only controls' skin was numb at 1 hour, and EMLA cream gave no patient sufficient analgesia. [[Bourne2026RAPM,ArendtNielsen1990]]`,
       pt:`Tell the team if numbing has worn off early before, so they can plan.`,hook:`Older study: EMLA cream gave no EDS patient sufficient analgesia. [[ArendtNielsen1990]]`}},
    sv:{a:88,b:33,la:'EDS (n=980)',lb:'No EDS (n=249)',what:'recalled inadequate dental numbing',col:'var(--vas)',
      note:{k:'Online survey · 2019',t:'Dental numbing failed: 88% vs 33%',txt:`In an online survey, 88% (860 of 980) of people with EDS who had dental local anaesthetic recalled inadequate pain prevention, against 33% (83 of 249) without EDS. Among named agents, articaine had the highest reported success (30%), then bupivacaine (25%) and mepivacaine (22%). The authors call it hypothesis-generating: recall and selection bias are likely. [[Schubart2019LA]]`,
       pt:`Many people with EDS remember dental numbing not working. A survey like this cannot prove how often it happens.`,hook:`Survey: inadequate dental local anaesthesia recalled by 88% with EDS vs 33% without. [[Schubart2019LA]]`}}
  };
  function drawLa(a,b){
    const N=vb(la,'720 300','400 600'),D=LA[mode];let s='';
    const arr=(x0,y0,n,lab)=>{let g=T(x0,y0-12,`${lab}: ${Math.round(n)}%`,'t-lbl')+T(x0,y0+2,D.what,'t-xs');
      for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);g+=person(x0+c*22+11,y0+12+r*24,18,i<Math.round(n)?D.col:'var(--line)')}return g};
    if(N){s+=arr(90,30,a,D.la)+arr(90,320,b,D.lb)}
    else{s+=arr(40,30,a,D.la)+arr(400,30,b,D.lb);s+=T(320,150,'vs','t-big t-mid','fill:var(--muted)')}
    la.innerHTML=s}
  function setLa(m){mode=m;press('[data-sula]','sula',m);const D=LA[m],fa=cur.a,fb=cur.b;laStop&&laStop();
    laStop=animate(800,q=>{cur={a:lerp(fa,D.a,ease(q)),b:lerp(fb,D.b,ease(q))};drawLa(cur.a,cur.b)});$('#suLaNote').innerHTML=noteHTML(D.note)}
  $$('[data-sula]').forEach(b=>b.addEventListener('click',()=>setLa(b.dataset.sula)));
  drawLa(cur.a,cur.b);$('#suLaNote').innerHTML=noteHTML(LA[mode].note);
  redraws.surgery=(prev=>()=>{prev&&prev();drawLa(cur.a,cur.b)})(redraws.surgery);
};
