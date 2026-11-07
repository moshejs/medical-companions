/* =============== 2.1 Symptoms & where TB strikes =============== */
/* extrapulmonary sites, in the order they light up. p: share of extrapulmonary TB, US 1993–2006 (Peto2009) */
const SY_SITES=[
 {id:'lymph',n:'Lymph nodes',p:40.4,t0:.40,sg:'painless neck swelling'},
 {id:'pleural',n:'Pleura',p:19.8,t0:.46,sg:'fluid around the lung'},
 {id:'bone',n:'Bone &amp; joint',p:11.3,t0:.54,sg:'spine: Pott’s disease'},
 {id:'gu',n:'Genitourinary',p:6.5,t0:.59,sg:'kidney, bladder, genitals'},
 {id:'perit',n:'Peritoneum',p:4.9,t0:.635,sg:'lining of the abdomen'},
 {id:'mening',n:'Meninges',p:5.4,t0:.69,sg:'the most lethal form'},
 {id:'mil',n:'Miliary',p:null,t0:.83,sg:'spread through the blood'}];
/* what each profile shows: P lung chips, C whole-body chips, st summary chips, lesions in the lungs */
const SY_PRO={
 adult:{name:'an adult',sc:1,
  P:[{l:'Cough ≥ 2 weeks',s:'sens 42% · spec 94%',t:.02},{l:'Any cough',s:'sens 51% · spec 88%',t:.08}],
  C:[{l:'Fever',t:.2},{l:'Night sweats',t:.25},{l:'Weight loss',t:.3}],
  st:[{l:'Any TB symptom: sens 71% · spec 65%',t:.34},{l:'~Half of people with TB in surveys: no symptoms',t:.37}],
  les:[{side:'R',u:.42,v:.13,r:10,kind:'cavity'},{side:'R',u:.52,v:.22,r:15,kind:'infiltrate'}],lesN:'cavity'},
 child:{name:'a child',sc:.76,
  P:[{l:'Cough > 2 wk, not improving',t:.02},{l:'Swollen chest lymph nodes',s:'primary TB pattern',t:.09}],
  C:[{l:'Failure to thrive',s:'documented, past 3 months',t:.2},{l:'Fatigue',t:.27}],
  st:[{l:'All three: sens 63% · spec 90%',t:.33},{l:'Weaker under age 3 (sens 52%)',t:.36}],
  les:[{side:'R',u:.04,v:.3,r:9,kind:'node'},{side:'R',u:.45,v:.62,r:16,kind:'infiltrate'}],lesN:'hilar node'},
 hiv:{name:'a person with HIV',sc:1,
  P:[{l:'Current cough, any length',t:.02},{l:'Fewer cavities',s:'less cavitation with HIV',t:.09}],
  C:[{l:'Fever',t:.2},{l:'Night sweats',t:.25},{l:'Weight loss',t:.3}],
  st:[{l:'Any 1 of 4: sens 79% · spec 50%',t:.34},{l:'On ART: sens falls to 51%',t:.37}],
  les:[{side:'R',u:.5,v:.6,r:16,kind:'infiltrate'},{side:'L',u:.5,v:.55,r:14,kind:'infiltrate'}],lesN:'no cavity'}};
const SY_COMMON=[
 {from:.39,at:.5,k:'Outside the lungs · 1',t:'Lymph nodes and pleura',
  txt:`In 2024, 16% of the 8.3 million people notified with a new episode of TB had extrapulmonary TB. [[WHO-GTR2025]] In US data the commonest sites were the lymph nodes (40.4%) and the pleura (19.8%). [[Peto2009]] TB lymphadenitis typically means 1–2 months of painless swelling of one group of neck nodes; excision biopsy is the most sensitive test (80%). [[Fontanilla2011]] Pleural fluid adenosine deaminase had a pooled sensitivity of 0.92 and specificity of 0.90. [[Liang2008]]`,
  pt:`TB can settle outside the lungs. The neck glands are the most common place: a lump that grows slowly and usually does not hurt.`,
  hook:`Commonest extrapulmonary site: lymph nodes (40.4%), then pleura (19.8%). Pleural ADA: sensitivity 92%, specificity 90%.`},
 {from:.53,at:.61,k:'Outside the lungs · 2',t:'Bone, kidneys and abdomen',
  txt:`Bone and joint TB made up 11.3% of US extrapulmonary cases, genitourinary 6.5% and peritoneal 4.9%. Extrapulmonary TB was more common in women (OR 1.7) and in people born outside the US (OR 1.5), and its share rose from 15.7% of cases in 1993 to 21.0% in 2006. [[Peto2009]] Spinal TB, Pott's disease, leaves a deformity seen in Egyptian remains from about 2400 BC. [[Barberis2017]] Samples from these sites hold few bacilli: smear sensitivity runs from under 10% to 42% and culture from 23% to 90%. [[Lewinsohn2017]]`,
  pt:`TB of the spine, kidneys or belly is less common. It is harder to confirm because samples contain few germs, so doctors often need a biopsy.`,
  hook:`Pott's disease = TB of the spine. Extrapulmonary samples: smear sensitivity under 10% to 42%.`},
 {from:.68,at:.75,k:'Outside the lungs · 3',t:'Meninges: the most dangerous',
  txt:`TB meningitis is the most lethal and disabling form of TB, with more than 100,000 new cases a year. [[Wilkinson2017]] Across 39 studies of adults, 6-month mortality was 16% without HIV and 57% with HIV; 32% of survivors had a physical disability. These are population averages. [[Stadelman2020]] In children, 19.3% died and only 36.7% survived without neurological sequelae; 47% were diagnosed at the most advanced stage. [[Chiang2014]] In 1,699 Vietnamese adults, 9-month mortality was 23.0% without HIV and 51.3% with HIV. [[Thao2018]] On CSF, Xpert Ultra was 89.4% sensitive against culture, but a negative result cannot rule TB meningitis out. [[Kohli2021,Huynh2022]]`,
  pt:`TB of the lining of the brain is rare but serious. Headache, fever and confusion that build over days need urgent care.`,
  hook:`TB meningitis, 6-month mortality in adults: 16% without HIV, 57% with HIV (population averages).`},
 {from:.82,at:.94,k:'Everywhere at once',t:'Miliary TB',
  txt:`Miliary TB comes from massive spread of bacilli through lymph and blood, seeding many organs with tiny lesions. Its symptoms are non-specific and the typical chest X-ray pattern may appear only late, which delays diagnosis. [[Sharma2005]] It is more common in immunocompromised people. [[Nachiappan2017]] BCG given to infants protects strongly against miliary and meningeal TB (RR 0.1 in randomised trials). [[Mangtani2014]] Treatment for these forms is covered in <a href="#regimen" data-go="regimen">Treating TB disease</a>.`,
  pt:`Sometimes TB spreads through the blood to many organs at once. It can be hard to spot because the person just feels very unwell.`,
  hook:`Miliary and meningeal TB are the forms BCG prevents best in young children.`}];
/* a pleural effusion clipped to the patient's right lung (same outline as lung() in the kit) */
function syEffusion(x,y,s,a){const X=v=>f1(x+v*s),Y=v=>f1(y+v*s),id='sye'+Math.round(x)+'_'+Math.round(y);
  return `<clipPath id="${id}"><path d="M${X(92)} ${Y(42)}C${X(62)} ${Y(26)} ${X(30)} ${Y(40)} ${X(18)} ${Y(92)}C${X(8)} ${Y(132)} ${X(6)} ${Y(176)} ${X(20)} ${Y(190)}C${X(44)} ${Y(199)} ${X(76)} ${Y(193)} ${X(92)} ${Y(181)}Z"/></clipPath><path clip-path="url(#${id})" d="M${X(0)} ${Y(lerp(196,146,a))}Q${X(50)} ${Y(lerp(198,160,a))} ${X(100)} ${Y(lerp(196,144,a))}V${Y(205)}H${X(0)}Z" style="fill:var(--air);opacity:.5"/>`}
const SY_STEPS={
 adult:[
  {from:0,at:.07,k:'Lungs · post-primary TB',t:'A cough that lingers',
   txt:`In adults, TB disease usually develops in the lungs long after infection, with cavities, consolidation and small nodules on imaging. [[Nachiappan2017]] Cavities typically form at the apex of the lung. [[Balasubramanian1994]] In community screening of adults, cough for 2 weeks or more had a summary sensitivity of 42.1% and specificity of 94.4% (41 studies); any cough, 51.3% and 87.6%. [[VantHoog2022]]`,
   pt:`A cough lasting 2 weeks or more is a reason to get checked. But many people with TB do not cough that long, so a short cough does not rule it out.`,
   hook:`Cough ≥ 2 weeks is specific (94%) but misses more than half of TB (sensitivity 42%) in community screening.`},
  {from:.18,at:.3,k:'The whole body',t:'Fever, night sweats, weight loss',
   txt:`Any TB symptom had a sensitivity of 70.6% and specificity of 65.1% in community screening (29 studies). [[VantHoog2022]] In national prevalence surveys a median 50.4% of people with confirmed TB had no symptoms on screening, while a chest X-ray detected 89%. That is why screening pairs symptoms with an X-ray. [[Frascella2021,VantHoog2022]]`,
   pt:`TB can make the whole body unwell: fever, sweating at night and losing weight without trying. Some people with TB feel completely well.`,
   hook:`About half of TB found in surveys is subclinical: symptom screens miss it, and chest X-ray finds most of it (89%).`}],
 child:[
  {from:0,at:.07,k:'Lungs · primary TB',t:'A cough that will not settle',
   txt:`Primary TB, shortly after infection, is commonest in children and shows as enlarged lymph nodes, consolidation and pleural effusion. [[Nachiappan2017]] In HIV-negative children in Cape Town, a persistent cough not improving over 2 weeks, documented failure to thrive and fatigue together had a sensitivity of 62.6% and specificity of 89.8%. [[Marais2006]] Young children rarely cough up sputum; see <a href="#diagnose" data-go="diagnose">Diagnosing TB disease</a> for gastric, stool and nasal samples.`,
   pt:`In children, watch for a cough that goes on for more than 2 weeks and does not get better.`,
   hook:`Marais 2006: persistent cough + failure to thrive + fatigue: sensitivity 62.6%, specificity 89.8%.`},
  {from:.18,at:.3,k:'The whole body',t:'Failure to thrive and tiredness',
   txt:`The same symptom approach worked better from age 3 (sensitivity 82.3%) than under 3 (51.8%), and it added little in children with HIV. [[Marais2006]] WHO estimates that children under 15 make up about 11% of people with TB: 1.1 million fall ill each year and more than 225,000 die. [[WHO-Mod5-2022]] Only 29.9% of children classified as having pulmonary TB in 13 studies were bacteriologically confirmed. [[Gunasekera2023]]`,
   pt:`A child who stops growing or gaining weight, or is unusually tired, may need checking for TB, especially after contact with someone who has it.`,
   hook:`About 70% of children treated for pulmonary TB are never bacteriologically confirmed. [[Gunasekera2023]]`}],
 hiv:[
  {from:0,at:.07,k:'Lungs · advanced HIV',t:'Any cough counts',
   txt:`For people living with HIV, the WHO four-symptom screen is positive with any one of current cough (of any length), fever, night sweats or weight loss. It came from 12 studies of 9,626 people with HIV: sensitivity 78.9%, specificity 49.6%. [[Getahun2011]] HIV co-infection is associated with less cavitation. [[Pai2016]] TB in advanced HIV often presents outside the lungs, sputum may be impossible to produce and samples hold few bacilli. [[Peter2016]]`,
   pt:`For people with HIV, a cough of any length, fever, night sweats or weight loss is enough to check for TB.`,
   hook:`WHO four-symptom screen (W4SS): cough, fever, night sweats, weight loss. Any one = positive.`},
  {from:.18,at:.3,k:'The whole body',t:'The four-symptom screen',
   txt:`The screen loses sensitivity on antiretroviral therapy: 51.0% on ART versus 89.4% not on ART (18 studies). [[Hamada2018]] Its negative predictive value was 97.7% at 5% TB prevalence but 90.0% at 20%, so a negative screen rules TB out well only where TB is uncommon. [[Getahun2011]] CRP of 10 mg/L or more had a sensitivity of 77% and specificity of 74%. [[Dhana2022]] Try it in the icon array below.`,
   pt:`HIV medicines can make TB quieter, so a screen with no symptoms is less reassuring for someone on treatment.`,
   hook:`W4SS sensitivity: 89% not on ART, 51% on ART. Add a chest X-ray or CRP.`}]};

inits.symptoms=()=>{
  const svg=$('#sySvg'),rg=$('#syT');let pro='adult',setSt=()=>{};
  const steps=()=>SY_STEPS[pro].concat(SY_COMMON);
  /* a front-view body silhouette; w slims the torso (weight loss) */
  function body(cx,top,H,w){const R=[[.03,.125,0],[.08,.15,0],[.14,.175,0],[.165,.22,0],[.18,.34,0],[.185,.47,0],[.168,.505,0],[.15,.47,0],[.145,.34,0],[.128,.25,0],[.124,.36,1],[.112,.44,1],[.13,.53,1],[.115,.75,0],[.1,.955,0],[.105,.99,0],[.035,.99,0],[.035,.955,0],[.03,.75,0],[.012,.585,0]];
    const pt=(p,sg)=>f1(cx+sg*p[0]*H*(p[2]?w:1))+' '+f1(top+p[1]*H);
    let d='M'+R.map(p=>pt(p,1)).join('L');for(let i=R.length-1;i>=0;i--)d+='L'+pt(R[i],-1);
    return `<path d="${d}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2;stroke-linejoin:round;opacity:.95"/><circle cx="${f1(cx)}" cy="${f1(top+.065*H)}" r="${f1(.055*H)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`}
  function chip(x,y,w,c,o,a){if(a<=0)return '';const h=o.s?30:20;
    return `<g style="opacity:${f1(a)}" transform="translate(${f1((1-a)*14)} 0)"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="10" style="fill:var(--${c}-soft);stroke:var(--${c});stroke-width:1"/><text x="${f1(x+10)}" y="${f1(y+14)}" class="t-lbl" style="font-size:12px;fill:var(--${c})">${o.l}</text>${o.s?`<text x="${f1(x+10)}" y="${f1(y+25)}" class="t-xs">${o.s}</text>`:''}</g>`}
  function draw(t){
    const N=vb(svg,'720 430','400 640'),P=SY_PRO[pro],ST=steps(),ph=phaseOf(ST,t);
    const L=N?{cx:96,top:18,H:290,cx0:194,cw:198,cy:20,bx:12,by:336,bw:376,rh:41}:{cx:180,top:22,H:392,cx0:372,cw:330,cy:24,bx:372,by:234,bw:330,rh:27};
    const H=L.H*P.sc,top=L.top+L.H-H,cx=L.cx,X=u=>cx+u*H,Y=v=>top+v*H;
    const slim=1-.15*ramp(t,.28,.36)*(pro==='child'?.6:1);
    const act=id=>{const s=SY_SITES.find(q=>q.id===id);return ramp(t,s.t0,s.t0+.04)};
    const curS=(()=>{let c=null;SY_SITES.forEach(s=>{if(t>=s.t0)c=s.id});return c})();
    let s=`<defs><radialGradient id="syGlow"><stop offset="0" style="stop-color:var(--tb);stop-opacity:.55"/><stop offset="1" style="stop-color:var(--tb);stop-opacity:0"/></radialGradient></defs>`;
    s+=body(cx,top,H,slim);
    /* spine, kidneys, bladder, abdomen: drawn faintly, strong when their site is active */
    const aB=act('bone'),aG=act('gu'),aP=act('perit'),aM=act('mening'),aL=act('lymph'),aPl=act('pleural'),aMi=act('mil');
    for(let i=0;i<9;i++){const vy=.205+i*.036,hot=i===6&&aB>0,wd=.028*H;
      s+=`<rect x="${f1(cx-wd/2)}" y="${f1(Y(vy))}" width="${f1(wd)}" height="${f1(.03*H*(hot?.6:1))}" rx="2" style="fill:${hot?'var(--tb)':'var(--fibro)'};opacity:${f1(hot?.4+.6*aB:.12+.5*aB)}"/>`}
    [[-1],[1]].forEach(q=>{const sg=q[0];s+=`<ellipse cx="${f1(X(sg*.055))}" cy="${f1(Y(.435))}" rx="${f1(.018*H)}" ry="${f1(.028*H)}" style="fill:${aG>0?'var(--tb)':'var(--fibro)'};opacity:${f1(.12+.55*aG)}"/>`});
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(Y(.548))}" rx="${f1(.024*H)}" ry="${f1(.016*H)}" style="fill:${aG>0?'var(--tb)':'var(--fibro)'};opacity:${f1(.12+.5*aG)}"/>`;
    if(aP>0)s+=`<ellipse cx="${f1(cx)}" cy="${f1(Y(.485))}" rx="${f1(.085*H*slim)}" ry="${f1(.045*H)}" style="fill:var(--tb);fill-opacity:${f1(.12*aP)};stroke:var(--tb);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(aP)}"/>`;
    /* lungs with this profile's lesions */
    const ls=.00118*H,lx=cx-100*ls,ly=top+.145*H;
    const grow=ramp(t,.0,.12),les=P.les.map(l=>Object.assign({},l,{r:l.r*Math.max(.05,grow)}));
    if(aMi>0)les.push({kind:'miliary',side:'R',u:0,v:0});
    const lg=lung(lx,ly,ls,{hl:t<.18&&pro==='adult'?'upper':null,lesions:les});s+=lg.svg;if(aPl>0)s+=syEffusion(lx,ly,ls,aPl);
    /* lymph nodes at the neck */
    [[-1],[1]].forEach(q=>{const sg=q[0];for(let i=0;i<3;i++)s+=`<circle cx="${f1(X(sg*(.032+i*.009)))}" cy="${f1(Y(.128+i*.012))}" r="${f1(.008*H*(1+aL*.7))}" style="fill:${aL>0?'var(--tb)':'var(--fibro)'};opacity:${f1(.25+.7*aL)}"/>`});
    /* meninges: a ring over the brain */
    if(aM>0)s+=`<path d="M${f1(X(-.06))} ${f1(Y(.07))}A${f1(.062*H)} ${f1(.062*H)} 0 0 1 ${f1(X(.06))} ${f1(Y(.07))}" style="fill:none;stroke:var(--tb);stroke-width:${f1(2+2*bump(t,.69,.8))};opacity:${f1(aM)}"/>`;
    /* miliary: seeded dots across the body */
    if(aMi>0){const q=rng(77);for(let i=0;i<46;i++){const u=(q()-.5)*.24,v=.12+q()*.5;if(Math.abs(u)>.11&&v>.2&&v<.5)continue;s+=`<circle cx="${f1(X(u*slim))}" cy="${f1(Y(v))}" r="${f1(Math.max(1,.0045*H))}" style="fill:var(--tb);opacity:${f1(.7*ramp(t,.83+i*.002,.88+i*.002))}"/>`}}
    /* fever thermometer and night sweats drops */
    const aF=ramp(t,.2,.24),aS=ramp(t,.25,.29);
    if(P.C.some(c=>c.l==='Fever')&&aF>0){const tx=X(.11),ty=Y(.005),th=.09*H;
      s+=`<g style="opacity:${f1(aF)}"><rect x="${f1(tx-3.5)}" y="${f1(ty)}" width="7" height="${f1(th)}" rx="3.5" style="fill:var(--panel);stroke:var(--muted)"/><circle cx="${f1(tx)}" cy="${f1(ty+th+3)}" r="5.5" style="fill:var(--bad)"/><rect x="${f1(tx-1.8)}" y="${f1(ty+th*(1-.85*ramp(t,.2,.3)))}" width="3.6" height="${f1(th*.85*ramp(t,.2,.3)+2)}" style="fill:var(--bad)"/></g>`}
    if(P.C.some(c=>c.l==='Night sweats')&&aS>0)[[-.085,.03],[-.1,.075],[-.075,.1]].forEach((d,i)=>{const dx=X(d[0]),dy=Y(d[1])+((t*900+i*7)%9);s+=`<path d="M${f1(dx)} ${f1(dy-5)}Q${f1(dx+4)} ${f1(dy+1)} ${f1(dx)} ${f1(dy+3)}Q${f1(dx-4)} ${f1(dy+1)} ${f1(dx)} ${f1(dy-5)}Z" style="fill:var(--air);opacity:${f1(.8*aS)}"/>`});
    if(slim<.99){s+=`<path d="M${f1(X(-.2))} ${f1(Y(.46))}h${f1(.05*H)}M${f1(X(.2))} ${f1(Y(.46))}h${f1(-.05*H)}" style="stroke:var(--warn);stroke-width:1.5" marker-end="url(#syArr)"/><defs>${marker('syArr','var(--warn)')}</defs>`}
    /* lesion label */
    if(grow>.5&&t<.4){const [lx2,ly2]=lg.at(P.les[0].side,P.les[0].u,P.les[0].v),ex=cx-.2*H;s+=`<line x1="${f1(lx2)}" y1="${f1(ly2)}" x2="${f1(ex+2)}" y2="${f1(ly2-14)}" style="stroke:var(--tb);stroke-width:1"/><text x="${f1(ex)}" y="${f1(ly2-11)}" class="t-xs t-end" style="fill:var(--tb)">${P.lesN}</text>`}
    /* site number badges on the body */
    const SP={lymph:[.07,.13],pleural:[-.12,.36],bone:[.03,.43],gu:[.085,.45],perit:[-.05,.5],mening:[.0,-.005],mil:[-.16,.25]};
    SY_SITES.forEach((st,i)=>{const a=act(st.id);if(a<=0)return;let [u,v]=SP[st.id];if(st.id==='pleural'){const p=lg.at('R',1,.9);u=(p[0]-cx)/H-.03;v=(p[1]-top)/H}
      const bx=X(u),by=Y(v),hot=curS===st.id;
      if(hot)s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(16+6*bump((t*6)%1,0,1))}" style="fill:url(#syGlow)"/>`;
      s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="8" style="fill:${hot?'var(--tb)':'var(--panel)'};stroke:var(--tb);stroke-width:1.4;opacity:${f1(a)}"/><text x="${f1(bx)}" y="${f1(by+3.5)}" class="t-xs t-mid" style="fill:${hot?'#fff':'var(--tb)'};font-weight:700;opacity:${f1(a)}">${i+1}</text>`});
    /* chips */
    let y=L.cy;
    s+=`<text x="${L.cx0}" y="${y+8}" class="t-sm" style="fill:var(--tb)">IN THE LUNGS</text>`;y+=16;
    P.P.forEach(c=>{s+=chip(L.cx0,y,L.cw,'tb',c,ramp(t,c.t,c.t+.04));y+=(c.s?36:26)});
    y+=4;s+=`<text x="${L.cx0}" y="${y+8}" class="t-sm" style="fill:var(--gold);opacity:${f1(.35+.65*ramp(t,.18,.2))}">THE WHOLE BODY</text>`;y+=16;
    if(N){P.C.forEach(c=>{s+=chip(L.cx0,y,L.cw,'gold',c,ramp(t,c.t,c.t+.04));y+=(c.s?36:26)})}
    else{let x=L.cx0;P.C.forEach(c=>{const w=c.s?160:Math.max(70,c.l.length*7.4+24);if(x+w>L.cx0+L.cw){x=L.cx0;y+=36}s+=chip(x,y,w,'gold',c,ramp(t,c.t,c.t+.04));x+=w+8});y+=36}
    P.st.forEach(c=>{const a=ramp(t,c.t,c.t+.03);if(a<=0)return;s+=`<text x="${L.cx0}" y="${f1(y+10)}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}">${N?c.l.replace('~Half of people with TB in surveys','~Half in surveys'):c.l}</text>`;y+=15});
    /* site bars */
    const aT=ramp(t,.38,.41);
    if(aT>0){s+=`<text x="${L.bx}" y="${L.by-10}" class="t-sm" style="fill:var(--accent);opacity:${f1(aT)}">${N?'OUTSIDE THE LUNGS · share, US 1993–2006':'OUTSIDE THE LUNGS · % of extrapulmonary TB, US'}</text>`;
      SY_SITES.forEach((st,i)=>{const a=act(st.id),ry=L.by+i*L.rh;if(a<=0)return;const hot=curS===st.id;
        const nx=L.bx+10,bx0=N?L.bx+150:L.bx+132,bwM=N?150:120,bw=st.p?st.p/40.4*bwM*ease(a):0;
        s+=`<g style="opacity:${f1(.35+.65*a)}"><circle cx="${nx}" cy="${ry+6}" r="7.5" style="fill:${hot?'var(--tb)':'var(--panel)'};stroke:var(--tb)"/><text x="${nx}" y="${ry+9.5}" class="t-xs t-mid" style="fill:${hot?'#fff':'var(--tb)'};font-weight:700">${i+1}</text>`;
        s+=`<text x="${nx+14}" y="${ry+10}" class="t-lbl" style="font-size:12.5px">${st.n}</text><text x="${nx+14}" y="${ry+(N?24:22)}" class="t-xs">${st.sg}</text>`;
        if(st.p){s+=`<rect x="${bx0}" y="${ry}" width="${f1(bw)}" height="11" rx="3" style="fill:var(--tb);opacity:${hot?.9:.5}"/><text x="${f1(bx0+bw+5)}" y="${ry+9.5}" class="t-xs" style="fill:var(--ink)">${(st.p*a).toFixed(1)}%</text>`}
        else s+=`<text x="${bx0}" y="${ry+9.5}" class="t-xs">not counted separately</text>`;
        s+='</g>'})}
    svg.innerHTML=s;setSt(ph);
    const shown=SY_SITES.filter(q=>t>=q.t0).length;
    $('#syRead').innerHTML=`<span>presentation in <b>${P.name}</b></span><span>stage <b>${t<.18?'lung symptoms':t<.38?'whole-body symptoms':'sites outside the lungs'}</b></span><span>sites lit <b>${shown} of 7</b></span><span>worldwide 2024 <b>84% pulmonary · 16% extrapulmonary</b> [[WHO-GTR2025]]</span>`;
    $('#syNote').innerHTML=noteHTML(ST[ph]);
  }
  const stop=playWire(rg,$('#syPlay'),draw,20000,'Replay','symptoms');
  function wire(){const old=$('#sySteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps(),rg,draw,stop)}
  $$('[data-sy]').forEach(b=>b.addEventListener('click',()=>{stop();pro=b.dataset.sy;$$('[data-sy]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- screening on 1,000 people ---- */
  const T={
   w4ss:{n:'WHO four-symptom screen',g:'people with HIV (12 studies)',se:78.9,sp:49.6,c:`[[Getahun2011]]`,x:`Developed from an individual-participant meta-analysis; adding any chest X-ray abnormality raised sensitivity to 90.6% and lowered specificity to 38.9%.`},
   w4noart:{n:'Four-symptom screen, not on ART',g:'people with HIV not yet on ART',se:89.4,sp:28.1,c:`[[Hamada2018]]`,x:`Sensitive, but it flags most people without TB too, so many confirmatory tests are needed.`},
   w4art:{n:'Four-symptom screen, on ART',g:'people with HIV taking ART',se:51.0,sp:70.7,c:`[[Hamada2018]]`,x:`On ART, TB is quieter and the screen misses about half of it. Adding a chest X-ray raised sensitivity from 52.2% to 84.6% in two studies.`},
   crp:{n:'CRP of 10 mg/L or more',g:'ambulatory people with HIV',se:77,sp:74,c:`[[Dhana2022]]`,x:`A finger-prick blood test. At 10% prevalence, CRP strategies needed 244–272 fewer confirmatory tests per 1,000 than the symptom screen, at the cost of missing 1–2 more cases.`},
   cough2:{n:'Cough for 2 weeks or more',g:'HIV-negative or unknown-status adults (41 studies)',se:42.1,sp:94.4,c:`[[VantHoog2022]]`,x:`Specific but insensitive: most people it flags need testing, but it misses more than half of TB.`},
   anysym:{n:'Any TB symptom',g:'community adults (29 studies)',se:70.6,sp:65.1,c:`[[VantHoog2022]]`,x:`Asking about any symptom catches more TB than cough alone, but flags many more people without it.`},
   cxr:{n:'Any chest X-ray abnormality',g:'community adults (23 studies)',se:94.7,sp:89.1,c:`[[VantHoog2022]]`,x:`An X-ray finds TB that causes no symptoms. It cannot prove TB, so a flagged person still needs a bacteriological test.`},
   cxrs:{n:'X-ray abnormality suggestive of TB',g:'community adults (19 studies)',se:84.8,sp:95.6,c:`[[VantHoog2022]]`,x:`A stricter reading: fewer false alarms, more missed cases.`},
   combo:{n:'Cough ≥ 2 weeks or abnormal X-ray',g:'community adults (15 studies)',se:99.2,sp:84.9,c:`[[VantHoog2022]]`,x:`Either test positive counts as positive. This pairing is why X-ray-based screening is used alongside symptoms.`},
   cad:{n:'Computer-aided detection (CAD4TB v7)',g:'adults with cough ≥ 2 weeks, multinational cohort',se:90,sp:70.3,c:`[[Crowder2026]]`,x:`Software reads a digital chest X-ray and gives an abnormality score; here the threshold is set for 90% sensitivity. CAD performs worse in people over 60 and after previous TB. [[Qin2021]]`}};
  const ic=$('#syIcons'),sel=$('#syTest'),pr=$('#syPrev');
  function drawIco(){const N=vb(ic,'720 316','400 640'),k=T[sel.value],prev=+pr.value/100;
    const nTB=Math.round(1000*prev),TP=Math.round(nTB*k.se/100),FN=nTB-TP,nNo=1000-nTB,FP=Math.round(nNo*(1-k.sp/100)),TN=nNo-FP;
    const cols=N?25:50,cell=N?15:13.6,x0=N?13:13,y0=N?18:16;let s='';
    s+=`<text x="${x0}" y="${y0-5}" class="t-xs">${N?'1,000 people · reading left to right':'1,000 people, reading left to right: people with TB first, then people without TB'}</text>`;
    for(let i=0;i<1000;i++){const cx=x0+(i%cols)*cell+cell/2,cy=y0+Math.floor(i/cols)*cell+cell/2,r=cell*.36;
      let st;if(i<TP)st='fill:var(--tb)';else if(i<nTB)st='fill:none;stroke:var(--tb);stroke-width:1.6';else if(i<nTB+FP)st='fill:var(--warn);opacity:.85';else st='fill:var(--line)';
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(i<nTB&&i>=TP?r-.8:r)}" style="${st}"/>`}
    const by=y0+Math.ceil(1000/cols)*cell+16;
    s+=`<text x="${x0}" y="${by}" class="t-sm" style="fill:var(--ink)">${N?'':'Flagged for a confirmatory test: '}<tspan style="fill:var(--tb);font-weight:700">${TP} with TB</tspan> + <tspan style="fill:var(--warn);font-weight:700">${FP} without</tspan>${N?' flagged':''} · <tspan style="fill:var(--tb)">${FN} missed</tspan></text>`;
    ic.innerHTML=s;
    const ppv=TP+FP?TP/(TP+FP)*100:0,npv=TN+FN?TN/(TN+FN)*100:100;
    $('#syPrevV').textContent=(+pr.value).toFixed(1).replace('.0','')+'%';
    $('#syRes').innerHTML=`Of 1,000 people, <b>${nTB}</b> have TB. The screen flags <b>${TP}</b> of them and misses <b>${FN}</b>; it also flags <b>${FP}</b> people without TB. So <b>${TP+FP}</b> people would go on to a confirmatory test. Of those flagged, ${f1(ppv)}% have TB; of those cleared, ${f1(npv)}% truly do not. <br><b>Anyone with symptoms should see a clinician, whatever a screen shows.</b>`;
    $('#syIcoNote').innerHTML=noteHTML({k:'Screen · '+k.g,t:k.n,txt:`Sensitivity ${k.se}%, specificity ${k.sp}%. ${k.c} ${k.x}`,
      pt:`A screen sorts people into "test further" and "probably not TB". It is never a diagnosis, and its results change with how common TB is in the group.`,
      hook:prev<=.05?`Where TB is rare, a negative screen is reassuring (high NPV) but most positives are false alarms (low PPV).`:`As prevalence rises, a negative screen becomes less reassuring: the four-symptom screen's NPV fell from 97.7% at 5% to 90.0% at 20%. [[Getahun2011]]`})}
  sel.addEventListener('change',drawIco);pr.addEventListener('input',drawIco);
  redraws.symptoms=(()=>{const prv=redraws.symptoms;return()=>{prv&&prv();drawIco()}})();
  drawIco();
};
