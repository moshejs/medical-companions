/* =============== 5.4 Pregnancy and fetal alcohol spectrum disorders =============== */
const PG_STEPS=[
 {from:0,at:.1,k:'Weeks 0–12',t:'Early pregnancy',
  txt:`The CDC states that there is no known safe amount of alcohol in pregnancy; drinking can cause FASD and might increase the risk of miscarriage and stillbirth. [[Gosdin2022MMWR]] In a meta-analysis of 24 studies (231,808 pregnant women), alcohol exposure was linked with higher miscarriage risk (OR 1.19, 95% CI 1.12–1.28); at up to 5 drinks a week, each extra weekly drink added about 6%. [[Sundermann2019ACER]]`,
  pt:`No amount of alcohol is known to be safe in pregnancy, at any stage. If you are pregnant or planning a pregnancy, plan with your care team.`,
  hook:`No known safe amount and no safe time to drink in pregnancy. [[Gosdin2022MMWR,Williams2015AAP]]`},
 {from:.3,at:.45,k:'Weeks 13–27',t:'No safe trimester',
  txt:`The AAP clinical report states that no amount of alcohol should be considered safe, there is no safe trimester, all forms (beer, wine, liquor) pose similar risk, and binge drinking poses dose-related risk. [[Williams2015AAP]] In the US in 2018–2020, 13.5% of pregnant adults reported current drinking and 5.2% binge drinking; frequent mental distress and having no usual provider were linked with more drinking. [[Gosdin2022MMWR]]`,
  pt:`Stopping at any point in pregnancy helps. Support for mental health and good access to care make stopping easier.`},
 {from:.6,at:.72,k:'Weeks 28–40',t:'A lifelong effect, fully preventable',
  txt:`Prenatal alcohol exposure is the leading preventable cause of birth defects and of intellectual and neurodevelopmental disabilities. The neurocognitive and behavioural effects are lifelong, and they are completely preventable when no alcohol is used in pregnancy. [[Williams2015AAP]] The brain is highlighted throughout the timeline because the AAP finds no safe trimester. [[Williams2015AAP]]`,
  pt:`Alcohol can affect how a baby’s brain develops, and these effects can last for life.`,
  hook:`Prenatal alcohol = leading preventable cause of birth defects and neurodevelopmental disabilities (AAP). [[Williams2015AAP]]`},
 {from:.82,at:.9,k:'After birth',t:'FAS facial features',
  txt:`The 2016 criteria for fetal alcohol syndrome need at least 2 of 3 facial features (short palpebral fissures at or below the 10th centile, a thin upper-lip vermilion and a smooth philtrum, rank 4 or 5 on a racially normed guide), plus growth deficiency, deficient brain growth or abnormal brain structure or function, and neurobehavioural impairment. FAS can be diagnosed with or without documented exposure. [[Hoyme2016Pediatrics]]`,
  pt:`Doctors look for a pattern: small eye openings, a smooth groove under the nose and a thin upper lip, together with growth and development checks.`,
  hook:`FAS face: short palpebral fissures, smooth philtrum, thin upper-lip vermilion (≥2 of 3). [[Hoyme2016Pediatrics]]`},
 {from:.96,at:1,k:'Childhood and beyond',t:'Support changes outcomes',
  txt:`FASD rarely comes alone: 428 co-occurring conditions have been described. In 415 people with FAS or fetal alcohol effects, diagnosis at a younger age and a stable, nurturing home raised the odds of avoiding adverse outcomes 2- to 4-fold. [[Popova2016Lancet,Streissguth2004JDBP]] Early recognition and therapy improve outcomes. [[Williams2015AAP]]`,
  pt:`Children affected by alcohol before birth do better when they are diagnosed early and grow up with steady support.`,
  hook:`FASD categories (IOM): FAS, partial FAS, ARND, ARBD. [[Hoyme2016Pediatrics]]`}
];
inits.pregnancy=()=>{
  const svg=$('#pgSvg'),rg=$('#pgT'),rd=$('#pgRead'),note=$('#pgNote');
  const wk=t=>40*ramp(t,0,.8);
  function fetus(cx,cy,k,br){/* curled schematic fetus, k = size 0..1, br = brain highlight 0..1 */
    const s=lerp(.28,1,k);let g=`<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(s)})">`;
    g+=`<path d="M-6 -30C26 -34 48 -10 44 18C40 44 14 58 -12 52C-30 48 -40 34 -36 18C-32 6 -20 0 -10 6" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:${f1(1.6/s)}"/>`;
    g+=`<circle cx="-14" cy="-26" r="26" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:${f1(1.6/s)}"/>`;
    g+=`<path d="M-30 -32C-26 -46 -6 -50 4 -38C6 -28 -4 -20 -16 -22C-24 -22 -30 -26 -30 -32Z" style="fill:var(--dx);opacity:${f1(.25+br*.55)}"/>`;
    g+=`<path d="M10 10C4 18 6 28 14 32M26 24C20 34 26 44 34 42" style="fill:none;stroke:var(--brain-line);stroke-width:${f1(1.4/s)};stroke-linecap:round"/>`;
    g+=`<circle cx="-26" cy="-18" r="2" style="fill:var(--brain-line)"/>`;
    return g+'</g>'}
  function face(cx,cy,sc,m,N){/* schematic child face; m 0 typical .. 1 the FAS facial pattern */
    let g=`<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(sc)})">`;
    g+=`<ellipse cx="0" cy="0" rx="62" ry="76" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.6"/>`;
    g+=`<path d="M-58 -30C-50 -80 50 -80 58 -30C40 -56 -40 -56 -58 -30Z" style="fill:var(--brain-line);opacity:.5"/>`;
    const ew=lerp(16,11,m);/* palpebral fissure length */
    [-1,1].forEach(d=>{const ex=d*24;g+=`<path d="M${f1(ex-ew)} -8Q${f1(ex)} -17 ${f1(ex+ew)} -8Q${f1(ex)} 0 ${f1(ex-ew)} -8Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(ex)}" cy="-8" r="3.6" style="fill:var(--ink)"/>`;
      if(m>.05)g+=`<path d="M${ex-16} 4H${ex+16}" style="stroke:var(--muted);stroke-width:.8;stroke-dasharray:2 2;opacity:${f1(m)}"/>`});
    g+=`<path d="M-4 0Q-8 18 -8 22Q0 27 8 22Q8 18 4 0" style="fill:none;stroke:var(--brain-line);stroke-width:1.3"/>`;
    /* philtrum: two ridges that fade away */
    g+=`<path d="M-5 28V40M5 28V40" style="stroke:var(--brain-line);stroke-width:1.4;opacity:${f1(1-m)}"/>`;
    /* upper lip vermilion thins */
    const lt=lerp(6,1.6,m);
    g+=`<path d="M-18 44Q-8 ${f1(44-lt)} 0 ${f1(44-lt*.4)}Q8 ${f1(44-lt)} 18 44Q0 ${f1(44+1)} -18 44Z" style="fill:var(--glu-fill);opacity:.8"/><path d="M-16 45Q0 54 16 45" style="fill:var(--glu-fill);opacity:.6;stroke:none"/>`;
    return g+'</g>'}
  function draw(t){
    const N=vb(svg,'720 380','400 640'),ph=phaseOf(PG_STEPS,t),w=wk(t),born=ramp(t,.8,.86);setSt(ph);
    const L=N?{tx0:24,tx1:376,ty:52,wx:200,wy:232,wr:104,fx:200,fy:236,fs:1.25,px:12,py:372,pw:376,ph:256}
             :{tx0:30,tx1:690,ty:52,wx:190,wy:228,wr:118,fx:190,fy:230,fs:1.35,px:372,py:96,pw:336,ph:270};
    let s='';
    /* timeline */
    const X=v=>lerp(L.tx0,L.tx1,v/40),TR=[[0,13,'1st trimester'],[13,27,'2nd trimester'],[27,40,'3rd trimester']];
    TR.forEach(([a,b,n],i)=>{const on=w>=a&&(w<b||(i===2&&w>=40));s+=`<rect x="${f1(X(a))}" y="${L.ty}" width="${f1(X(b)-X(a)-2)}" height="12" rx="6" style="fill:${on?'var(--brand)':'var(--panel-2)'};opacity:${on?.85:1}"/><text x="${f1((X(a)+X(b))/2)}" y="${L.ty+27}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?['1st','2nd','3rd'][i]:n}</text>`});
    [0,10,20,30,40].forEach(v=>s+=`<text x="${f1(X(v))}" y="${L.ty-6}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.tx1}" y="${L.ty-18}" class="t-xs t-end">weeks</text>`;
    const nx=X(Math.min(w,40));s+=`<path d="M${f1(nx-6)} ${L.ty-2}L${f1(nx+6)} ${L.ty-2}L${f1(nx)} ${L.ty+8}Z" style="fill:var(--ink)"/>`;
    /* the guidance band across the whole timeline */
    const bw=L.tx1-L.tx0;
    s+=`<rect x="${L.tx0}" y="${L.ty-46}" width="${f1(bw)}" height="18" rx="9" style="fill:var(--accent-soft)"/>`;
    s+=`<text x="${L.tx0+10}" y="${L.ty-33}" class="t-xs" style="fill:var(--accent);font-weight:700">${N?'no known safe amount · no safe trimester':'no known safe amount · no safe trimester · all drinks similar risk'}</text>`;
    /* womb and fetus, cross-fading to the face after birth */
    const op=1-born;
    if(op>0){s+=`<g style="opacity:${f1(op)}"><circle cx="${L.wx}" cy="${L.wy}" r="${L.wr}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:2"/><circle cx="${L.wx}" cy="${L.wy}" r="${L.wr-8}" style="fill:var(--panel);opacity:.55"/>`;
      s+=`<path d="M${L.wx+L.wr*.55} ${L.wy-L.wr*.62}C${L.wx+L.wr*.8} ${L.wy-L.wr*.4} ${L.wx+L.wr*.78} ${L.wy-L.wr*.1} ${L.wx+L.wr*.62} ${L.wy+L.wr*.05}" style="fill:none;stroke:var(--liver);stroke-width:9;stroke-linecap:round;opacity:.5"/>`;
      s+=`<text x="${L.wx+L.wr*.7}" y="${L.wy-L.wr*.7}" class="t-xs">placenta</text>`;
      s+=fetus(L.fx,L.fy,ramp(w,4,40),.5+.5*Math.sin(t*40)**2);
      s+=`<text x="${L.wx}" y="${L.wy+L.wr+18}" class="t-xs t-mid" style="fill:var(--dx)">brain developing throughout (highlighted)</text></g>`}
    if(born>0){const m=ramp(t,.84,.94),sc=N?1.15:1.3;s+=`<g style="opacity:${f1(born)}">`+face(L.wx,L.wy+6,sc,m,N);
      const lab=(x1,y1,x2,y2,a,b,anc)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:.9"/><text x="${f1(x2+(anc==='e'?-3:3))}" y="${f1(y2-2)}" class="t-xs${anc==='e'?' t-end':''}" style="fill:var(--ink)">${a}</text><text x="${f1(x2+(anc==='e'?-3:3))}" y="${f1(y2+10)}" class="t-xs${anc==='e'?' t-end':''}">${b}</text>`;
      if(m>.3){const cx=L.wx,cy=L.wy+6;
        s+=lab(cx+24*sc,cy-8*sc,cx+(N?90:120),cy-70,'short palpebral','fissures (≤10th centile)','s');
        s+=lab(cx,cy+34*sc,cx-(N?84:110),cy+70,'smooth','philtrum (rank 4–5)','e');
        s+=lab(cx+12*sc,cy+42*sc,cx+(N?86:112),cy+82,'thin upper-lip','vermilion','s')}
      s+=`<text x="${L.wx}" y="${L.wy+L.wr+18}" class="t-xs t-mid">${m>.5?'≥2 of 3 features for the FAS facial criterion':'schematic face'}</text></g>`}
    /* facts panel */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const P=[[`OR 1.19`,'miscarriage risk with alcohol','exposure (24 studies)','+6% per extra weekly drink','(at up to 5 drinks a week)'],
             [`13.5%`,'of pregnant US adults reported','current drinking, 2018–2020','5.2% reported binge drinking','global estimate: 9.8%'],
             [`Leading`,'preventable cause of birth','defects and neurodevelopmental','disabilities; effects lifelong,','and completely preventable'],
             [`≥2 of 3`,'facial features, plus growth,','brain growth or structure, and','neurobehavioural impairment','(Hoyme 2016)'],
             [`2–4×`,'better odds of avoiding adverse','outcomes with earlier diagnosis','and a stable, nurturing home','(Streissguth 2004)']][ph];
    const SRC=['Sundermann 2019','Gosdin 2022 · Popova 2017','AAP · Williams 2015','Hoyme 2016','Streissguth 2004'][ph];
    const k=ph===0?1:ramp(t,PG_STEPS[ph].from,PG_STEPS[ph].from+.06);
    s+=`<text x="${L.px+18}" y="${L.py+26}" class="t-sm">${PG_STEPS[ph].k.toUpperCase()}</text>`;
    s+=`<text x="${L.px+18}" y="${L.py+(N?70:74)}" style="font:800 ${N?36:40}px var(--display);fill:${ph>=4?'var(--good)':'var(--accent)'};opacity:${f1(.3+.7*k)}">${P[0]}</text>`;
    P.slice(1).forEach((ln,i)=>s+=`<text x="${L.px+18}" y="${L.py+(N?100:108)+i*(N?20:22)}" class="t-lbl" style="font-weight:${i<2?700:400};opacity:${f1(.3+.7*k)}">${ln}</text>`);
    s+=`<text x="${L.px+18}" y="${L.py+L.ph-16}" class="t-xs">${SRC}</text>`;
    svg.innerHTML=s;
    rd.innerHTML=born>.5?`<span>Stage <b>after birth</b></span><span>Facial pattern drawn <b>${Math.round(ramp(t,.84,.94)*100)}%</b></span>`:`<span>Week <b>${Math.round(w)}</b> of 40</span><span>Trimester <b>${w<13?1:w<27?2:3}</b></span><span>Safe amount known: <b>none</b></span>`;
    note.innerHTML=noteHTML(PG_STEPS[ph]);
  }
  const stop=playWire(rg,$('#pgPlay'),draw,22000,'Replay','pregnancy');
  const setSt=stepWire($('#pgSteps'),PG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- prevalence icon array (per 1,000) ---------- */
  const ps=$('#pgPrevSvg'),pn=$('#pgPrevNote'),PB=$$('[data-pgp]');
  const PV=[
   {lo:7.7,hi:7.7,lab:'7.7 per 1,000',k:'Lange 2017 · global',t:'Global FASD prevalence',txt:`The estimated global prevalence of FASD among children and youth is 7.7 per 1,000 (95% CI 4.9–11.7). [[Lange2017JAMAPediatr]]`,pt:`About 8 in every 1,000 children and young people worldwide are estimated to have FASD.`},
   {lo:19.8,hi:19.8,lab:'19.8 per 1,000',k:'Lange 2017 · Europe',t:'Highest regional estimate',txt:`The WHO European Region had the highest estimate, 19.8 per 1,000. [[Lange2017JAMAPediatr]]`,pt:`In Europe the estimate is about 2 in every 100 children.`},
   {lo:11.3,hi:50,lab:'11.3–50.0 per 1,000',k:'May 2018 · US first-graders',t:'Four US communities',txt:`Among 6,639 first-graders assessed in 4 US communities (2010–2016), conservative FASD prevalence ranged from 11.3 to 50.0 per 1,000 (1.1% to 5.0%); weighted estimates were 31.1 to 98.5 per 1,000. [[May2018JAMA]]`,pt:`In these US communities, between about 1 and 5 in every 100 six-year-olds had FASD by the conservative count.`,hook:`Global FASD prevalence 7.7/1,000; US first-graders 1.1–5.0%. [[Lange2017JAMAPediatr,May2018JAMA]]`},
   {lo:1.46,hi:1.46,lab:'14.6 per 10,000',k:'Popova 2017 · FAS',t:'FAS, the most severe form',txt:`The global prevalence of fetal alcohol syndrome was estimated at 14.6 per 10,000; about one in every 67 women who drank during pregnancy would have a child with FAS, about 119,000 children a year worldwide. [[Popova2017LancetGH]]`,pt:`The full syndrome is much rarer than the wider spectrum: about 1.5 in every 1,000 people.`}];
  let pv=0,pFrom=0,pK=1,pStop=null;
  function drawP(){const N=vb(ps,'720 300','400 520');
    const cols=N?25:50,rows=1000/cols,gap=N?14.4:13.4,r=N?4.6:4.4,x0=N?20:22,y0=N?60:52;
    const cur=PV[pv],prev=PV[pFrom],lo=lerp(prev.lo,cur.lo,pK),hi=lerp(prev.hi,cur.hi,pK);
    let s=`<text x="${x0}" y="${N?22:22}" class="t-sm">1,000 CHILDREN</text><text x="${x0}" y="${N?44:40}" style="font:800 ${N?18:20}px var(--display);fill:var(--accent)">${cur.lab}</text>`;
    for(let i=0;i<1000;i++){const c=i%cols,rw=Math.floor(i/cols),x=x0+c*gap+gap/2,y=y0+rw*gap+gap/2,solid=i<Math.round(lo),range=!solid&&i<Math.round(hi);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${solid?'var(--accent)':range?'var(--ember)':'var(--panel-2)'};opacity:${range?.4:1}"/>`}
    ps.innerHTML=s;pn.innerHTML=noteHTML(cur)}
  function setP(m){if(m===pv)return;if(pStop)pStop();pFrom=pv;pv=m;pK=0;PB.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pgp===m));pStop=animate(600,p=>{pK=ease(p);drawP()},()=>{pStop=null;pK=1;drawP()})}
  PB.forEach(b=>b.addEventListener('click',()=>setP(+b.dataset.pgp)));
  const prevR=redraws.pregnancy;redraws.pregnancy=()=>{prevR&&prevR();drawP()};
  drawP();
};
