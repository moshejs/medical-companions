/* =============== 1.1 what =============== */
const WH_STEPS=[
 {from:0,at:.1,k:'Step 1 · The syndrome',t:'Bradykinesia plus tremor or rigidity',
  txt:'The MDS clinical criteria start by asking whether parkinsonism is present, "defined as bradykinesia, in combination with at least one between rest tremor (4-6 Hz) and rigidity". Only then do they ask which disease causes it. [[Postuma2015,Marsili2018]] Bradykinesia means slowness of movement and also a decrement in amplitude or speed, or hesitations, as a movement is repeated. [[PPMI-FEATPD]] The older UK Brain Bank criteria also accepted postural instability as the second sign; the MDS definition does not. [[Marsili2018]]',
  pt:'Parkinsonism is a name for a set of movement signs: slowness that gets worse as a movement is repeated, plus a shake at rest or stiffness. It describes what is happening, not why.',
  hook:'Parkinsonism = bradykinesia + (rest tremor and/or rigidity). Postural instability is no longer a core feature in the MDS 2015 criteria.'},
 {from:.2,at:.31,k:'Step 2 · Many causes',t:'Several conditions cause parkinsonism',
  txt:'Medicines can cause it: typical and atypical antipsychotics, prokinetics such as metoclopramide, flunarizine and cinnarizine, valproate and lithium. [[Shin2012]] So can small-vessel disease, often as a "lower-body" parkinsonism with a shuffling gait. [[Zijlmans2004]] The atypical parkinsonisms, multiple system atrophy (MSA), progressive supranuclear palsy (PSP) and corticobasal degeneration (CBD), have their own criteria, and in dementia with Lewy bodies parkinsonism eventually affects over 85%. [[Wenning2022,Hoglinger2017,Armstrong2013,McKeith2017]] How they are told apart is in <a href="#ddx" data-go="ddx">The differential</a>.',
  pt:'Some medicines, small strokes and several other brain diseases can all cause Parkinson-like slowness and stiffness.'},
 {from:.4,at:.52,k:'Step 3 · The largest share',t:'Parkinson\'s disease is the most common',
  txt:'In Olmsted County, Minnesota, 364 people developed parkinsonism between 1976 and 1990: 42% had Parkinson\'s disease, 20% drug-induced parkinsonism, 17% unspecified parkinsonism, 14% parkinsonism in dementia and 7% other causes. Incidence at ages 50 to 99 was 114.7 per 100,000 person-years, and the cumulative risk to age 90 was 7.5% if nothing else intervened. Men had higher incidence than women for every type except drug-induced parkinsonism. [[Bower1999]]',
  pt:'Of every ten people who develop Parkinson-like signs, about four have Parkinson\'s disease and about two have signs caused by a medicine.',
  hook:'Drug-induced parkinsonism is the second most common cause in older people after Parkinson\'s disease. [[Shin2012]]'},
 {from:.62,at:.78,k:'Step 4 · A clinical diagnosis',t:'Telling the causes apart is hard',
  txt:'In 100 brains from people diagnosed with Parkinson\'s by consultant neurologists, only 76 had nigral Lewy bodies; the rest included PSP, MSA, Alzheimer\'s disease and vascular disease. [[Hughes1992]] A meta-analysis put the pooled accuracy of clinical diagnosis at 80.6%, with no improvement over 25 years. [[Rizzo2016]] Against expert diagnosis the MDS criteria for clinically probable Parkinson\'s were 92.6% accurate. [[Postuma2018]] Extra brain changes complicate the picture: 37.2% of people with Parkinson\'s at the UK Brain Bank had co-pathology. [[Fox2025]] The criteria themselves are in <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>.',
  pt:'There is no single blood test that settles the diagnosis in everyday care. It rests on the examination and on how things change over time, and even specialists are sometimes wrong at first.',
  hook:'Hughes 1992: 76 of 100 clinically diagnosed brains had Lewy bodies. Clinical diagnosis has a pooled accuracy of about 80%.'}
];
const WH_CAUSES=[ /* wide-frame coordinates; the narrow frame maps them */
 {x:115,y:275,r:80,a:.21,c:'var(--rose)',f:'var(--rose-soft)',l:['Parkinson\'s','disease'],cls:'t-lbl'},
 {x:255,y:215,r:42,a:.24,c:'var(--warn)',f:'var(--warn-soft)',l:['drug-','induced'],cls:'t-sm'},
 {x:300,y:315,r:36,a:.26,c:'var(--violet)',f:'var(--violet-soft)',l:['with','dementia'],cls:'t-sm'},
 {x:215,y:345,r:26,a:.28,c:'var(--vessel)',f:'var(--panel-2)',l:['vascular'],cls:'t-xs'},
 {x:335,y:195,r:18,a:.3,c:'var(--muted)',f:'var(--panel-2)',l:['MSA'],cls:'t-xs'},
 {x:345,y:245,r:16,a:.31,c:'var(--muted)',f:'var(--panel-2)',l:['PSP'],cls:'t-xs'},
 {x:240,y:285,r:12,a:.32,c:'var(--muted)',f:'var(--panel-2)',l:['CBD'],cls:'t-xs'},
 {x:345,y:365,r:12,a:.33,c:'var(--muted)',f:'var(--panel)',l:['other'],cls:'t-xs',out:1}
];
const WH_WAF=[ ['Parkinson\'s disease',42,'var(--rose)'],['drug-induced',20,'var(--warn)'],['unspecified',17,'var(--panel-2)'],['in dementia',14,'var(--violet)'],['other causes',7,'var(--muted)'] ];
const WH_SIGNS=[
 {k:'Core sign · always required',t:'Bradykinesia',
  txt:'The MDS wording: "slowness of movement AND decrement in amplitude or speed or progressive hesitations / halts as movements are continued." Slowness alone is not enough; the movement must also shrink, slow or stall as it is repeated, as in repeated finger tapping. [[PPMI-FEATPD]] It is the one sign every case of parkinsonism must have. [[Postuma2015]]',
  pt:'Movements become slow, and when a movement is repeated, like tapping fingers, each one gets smaller or slower, or stops for a moment.',
  hook:'Look for the decrement: taps that get smaller with repetition. Slowness without decrement does not meet the definition.',
  aria:'Finger tapping that gets slower and smaller with each tap, drawn beside a trace of tap size that shrinks over time compared with a steady typical trace.'},
 {k:'Core sign · one of two',t:'Rest tremor',
  txt:'The MDS wording: a "4-6 Hz tremor in the fully resting limb which is suppressed during movement initiation. Kinetic and postural tremor do not qualify for parkinsonism criteria." [[PPMI-FEATPD]] The tremor consensus describes the parkinsonian pill-rolling rest tremor as 4 to 7 Hz. [[Bhatia2018]] Essential tremor, by contrast, is an action tremor of both arms, a 4 to 12 Hz kinetic tremor. [[Bhatia2018,Louis2026]]',
  pt:'The hand shakes when it is resting, for example in the lap, and the shaking pauses when the person starts to use it.',
  hook:'Rest tremor that stops on movement suggests parkinsonism; tremor that appears on holding or using the arms suggests essential tremor.',
  aria:'A hand resting on the lap trembles about five times a second and then stops trembling when the arm starts to move, beside a trace of the tremor that flattens at movement onset.'},
 {k:'Core sign · one of two',t:'Rigidity',
  txt:'The MDS wording: rigidity is "judged on slow passive movement of major joints with the patient in a relaxed position", a "lead-pipe" resistance that is velocity-independent, "not solely reflecting failure to relax". "Isolated cogwheeling without lead-pipe rigidity does not fulfill minimum requirements for rigidity." [[PPMI-FEATPD]]',
  pt:'When someone else slowly bends and straightens the relaxed arm, it feels stiff the whole way through, like bending a lead pipe.',
  hook:'Lead-pipe resistance counts; a cogwheel catch on its own does not.',
  aria:'An examiner slowly bends and straightens a relaxed elbow, beside a graph of resistance across the movement: low and flat when typical, high and even for lead-pipe rigidity, and a ratcheting cogwheel line that does not count on its own.'},
 {k:'Not a core sign',t:'Postural instability',
  txt:'Balance problems were part of the older UK Brain Bank definition of parkinsonism, but the MDS 2015 definition leaves them out. [[Marsili2018,Postuma2015]] Early instability points elsewhere: repeated unprovoked falls or falling on the pull test within 3 years are core features of PSP, and postural instability within 3 years had 88.7% specificity for MSA against Parkinson\'s. [[Hoglinger2017,Wenning2022]] In Parkinson\'s itself, impaired balance marks Hoehn and Yahr stage 3. [[Goetz2004HY]] See <a href="#stages" data-go="stages">Stages and symptoms</a>.',
  pt:'Losing balance when pulled backwards usually comes later in Parkinson\'s disease. When it comes early, doctors think about other causes.',
  hook:'Early falls are a red flag for atypical parkinsonism, especially PSP.',
  aria:'In the pull test an examiner tugs the shoulders backwards: a person with typical balance recovers in a step or two, while a person with postural instability takes several steps back and would fall without being caught.'}
];
/* Savica 2016, Olmsted County 1976-2005: incidence per 100,000 person-years (men, women, both) */
const WH_INC=[ {a:30,b:40,l:'under 40',m:.2,w:0,c:.1},{a:40,b:60,l:'40–59',m:11.7,w:7,c:9.2},{a:60,b:70,l:'60–69',m:80.8,w:32.6,c:55.1},{a:70,b:80,l:'70–79',m:179.2,w:77.7,c:119.2},{a:80,b:100,l:'80–99',m:211.4,w:101.8,c:133.9} ];
const WH_AGE=[
 {from:0,at:.06,k:'Under 40',t:'Very rare before 40',
  txt:'Incidence under 40 was 0.1 per 100,000 person-years in Olmsted County. [[Savica2016]] The MDS task force defines early-onset Parkinson\'s as onset after 21 and before 50, and calls onset before 21 juvenile parkinsonism. [[Mehanna2022]] Only 4% of Kaiser Permanente cases began before 50. [[VanDenEeden2003]]',
  pt:'Parkinson\'s can start young, but it is rare at these ages.'},
 {from:.145,at:.29,k:'Ages 40 to 59',t:'Still uncommon in midlife',
  txt:'Incidence was 11.7 per 100,000 person-years in men and 7.0 in women at 40 to 59. [[Savica2016]] Worldwide prevalence was 41 per 100,000 at 40 to 49 and 107 at 50 to 59; the only significant sex difference in prevalence was at 50 to 59, 134 in men against 41 in women. [[Pringsheim2014]]',
  pt:'In middle age, roughly one person in 10,000 develops Parkinson\'s each year.'},
 {from:.435,at:.51,k:'Ages 60 to 69',t:'The steep rise begins',
  txt:'At 60 to 69 incidence jumped to 80.8 in men and 32.6 in women per 100,000 person-years, about two and a half times higher in men. [[Savica2016]] In Kaiser Permanente data, incidence rose rapidly after 60 and the rate in men was 91% higher than in women overall. [[VanDenEeden2003]]',
  pt:'After 60 the chance rises quickly, and more men than women are affected.'},
 {from:.58,at:.65,k:'Ages 70 to 79',t:'Median onset at 73',
  txt:'At 70 to 79 incidence was 179.2 in men and 77.7 in women. The median age at onset was 73 (IQR 64 to 80), and 59% of the 464 patients were men. Incidence in men rose over the 30 years (RR 1.24 per decade), mostly at 70 and over, a trend the authors say might reflect changes in smoking or could be spurious. [[Savica2016]] Worldwide prevalence at 70 to 79 was 1,087 per 100,000, and 1,601 in North America, Europe and Australia against 646 in Asia. [[Pringsheim2014]]',
  pt:'Half of people are diagnosed after their early seventies. Around one in a hundred people in their seventies has Parkinson\'s.',
  hook:'Age is the strongest risk factor: incidence rises from 0.1 under 40 to 133.9 per 100,000 a year at 80 and over. [[Savica2016]]'},
 {from:.725,at:.9,k:'80 and over',t:'Highest, perhaps levelling off',
  txt:'At 80 to 99 incidence was 211.4 in men and 101.8 in women, 133.9 overall. [[Savica2016]] An incidence meta-analysis of 27 studies found that incidence rises with age in both sexes and may level off at 80 and over, where studies disagreed significantly. [[Hirsch2016]] Worldwide prevalence at 80 and over was 1,903 per 100,000, close to 2 in 100. [[Pringsheim2014]]',
  pt:'The oldest age group has the most new cases, though the rise may flatten out at the very top.'}
];
function whTok(B,ti,su,kind,o,rev,dim,N){if(o<=0)return '';
  let g=`<g style="opacity:${f1(o)}"><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="10" style="fill:${dim?'var(--panel)':'var(--rose-soft)'};stroke:${dim?'var(--muted)':'var(--rose)'};stroke-width:${dim?1.2:1.8};${dim?'stroke-dasharray:4 3':''}"/>`;
  g+=`<text x="${B.x+10}" y="${B.y+18}" class="t-lbl" style="${dim?'fill:var(--muted)':''}">${ti}</text>`;
  if(su)g+=`<text x="${B.x+B.w-9}" y="${B.y+18}" class="t-xs t-end" style="fill:${dim?'var(--muted)':'var(--rose)'};font-weight:600">${su}</text>`;
  if(kind&&B.h>=40){const x0=B.x+10,x1=B.x+B.w-10,y0=B.y+B.h-8,y1=B.y+27,xr=lerp(x0,x1,rev);
    const fn=kind==='b'?u=>(1-.72*u)*Math.abs(Math.sin(Math.PI*7*u)):kind==='t'?u=>.5+.42*Math.sin(Math.PI*2*9*u):u=>.72;
    if(kind==='r')g+=`<path d="M${x0} ${f1(lerp(y0,y1,.12))}H${x1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    if(rev>0)g+=`<path d="${pathFn(u=>fn(u*rev),x0,xr,y0,y1,90)}" style="fill:none;stroke:var(--rose);stroke-width:${kind==='r'?4:1.8};stroke-linecap:round;stroke-linejoin:round"/>`}
  return g+'</g>'}
function whHand(x,y,open,col){/* side view of a pinch: thumb fixed, index finger opens by open (0..1) */
  const th=-.4+open*1.05,px=x+4,py=y-14,L=46;
  return `<rect x="${x-26}" y="${y-22}" width="36" height="52" rx="14" style="fill:var(--cell);stroke:${col};stroke-width:2.2"/>`+
  `<path d="M${x+2} ${y+12}L${x+46} ${y+6}" style="stroke:${col};stroke-width:10;stroke-linecap:round"/>`+
  `<path d="M${px} ${py}L${f1(px+Math.cos(th)*L)} ${f1(py-Math.sin(th)*L)}" style="stroke:${col};stroke-width:9;stroke-linecap:round"/>`+
  `<path d="M${x-14} ${y+30}v26" style="stroke:${col};stroke-width:14;stroke-linecap:round;opacity:.5"/>`}
function whFig(x,g,lean,col,fill){/* standing figure rotated about the feet; lean in radians, negative leans left (backwards) */
  const P=h=>[x+Math.sin(lean)*h,g-Math.cos(lean)*h],[hx,hy]=P(62),[nx,ny]=P(112),[sx,sy]=P(102),[ax,ay]=P(72),[cx,cy]=P(126);
  return `<path d="M${f1(x-10)} ${g}L${f1(hx)} ${f1(hy)}L${f1(x+10)} ${g}M${f1(hx)} ${f1(hy)}L${f1(nx)} ${f1(ny)}M${f1(sx)} ${f1(sy)}L${f1(ax-16)} ${f1(ay)}M${f1(sx)} ${f1(sy)}L${f1(ax+16)} ${f1(ay)}" style="fill:none;stroke:${col};stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="12" style="fill:${fill};stroke:${col};stroke-width:3"/>`}
inits.what=()=>{
  /* ---------- 1. syndrome and causes ---------- */
  const svg=$('#whSvg'),rg=$('#whT');
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const L=N?{brady:{x:16,y:14,w:368,h:54},plus:[200,88],trem:{x:16,y:98,w:160,h:54},or:[200,129],rig:{x:224,y:98,w:160,h:54},pi:{x:16,y:162,w:368,h:28},
        ub:{x:10,y:202,w:380,h:200},P:(x,y)=>[10+(x-20)*380/350,202+(y-130)*196/255],rf:.9,
        wf:{x:20,y:440,c:12,ty:428},lg:{x:162,y:448,r:20},dx:{x:20,y:584,w:360}}
      :{brady:{x:24,y:34,w:160,h:62},plus:[200,70],trem:{x:216,y:34,w:150,h:62},or:[386,70],rig:{x:406,y:34,w:150,h:62},pi:{x:572,y:34,w:128,h:62},
        ub:{x:20,y:130,w:350,h:255},P:(x,y)=>[x,y],rf:1,
        wf:{x:400,y:162,c:15,ty:150},lg:{x:562,y:176,r:24},dx:{x:400,y:340,w:300}};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* formula */
    const ob=ease(ramp(t,0,.04)),ot=ease(ramp(t,.03,.07)),orr=ease(ramp(t,.05,.09)),op=ease(ramp(t,.1,.16));
    const rv=k=>ramp(t,k,k+.08);
    if(!N){s+=`<text x="${L.brady.x}" y="24" class="t-xs" style="opacity:${f1(ob)};fill:var(--rose);font-weight:700">REQUIRED</text>`;
      if(ot>0)s+=`<path d="M${L.trem.x} 30V26H${L.rig.x+L.rig.w}V30" style="fill:none;stroke:var(--rose);stroke-width:1.2;opacity:${f1(ot)}"/><text x="${L.or[0]}" y="21" class="t-xs t-mid" style="opacity:${f1(ot)};fill:var(--rose);font-weight:700">AT LEAST ONE OF</text>`}
    s+=whTok(L.brady,'Bradykinesia',N?'required':'','b',ob,rv(.02),0,N);
    if(ot>0)s+=`<text x="${L.plus[0]}" y="${L.plus[1]+(N?0:6)}" class="t-mid" style="font:800 ${N?15:24}px var(--display);fill:var(--ink);opacity:${f1(ot)}">${N?'+ at least one of':'+'}</text>`;
    s+=whTok(L.trem,'Rest tremor','4–6 Hz','t',ot,rv(.05),0,N);
    if(orr>0)s+=`<text x="${L.or[0]}" y="${L.or[1]+(N?0:4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700;opacity:${f1(orr)}">and/or</text>`;
    s+=whTok(L.rig,'Rigidity','lead-pipe','r',orr,rv(.07),0,N);
    if(op>0){const B=L.pi;
      if(N)s+=`<g style="opacity:${f1(op)}"><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="8" style="fill:var(--panel);stroke:var(--muted);stroke-dasharray:4 3"/><text x="${B.x+10}" y="${B.y+18}" class="t-sm" style="fill:var(--muted);font-weight:600">Postural instability</text><text x="${B.x+B.w-9}" y="${B.y+18}" class="t-xs t-end">not required (MDS 2015)</text></g>`;
      else s+=`<g style="opacity:${f1(op)}"><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-dasharray:4 3"/><text x="${B.x+10}" y="${B.y+20}" class="t-lbl" style="fill:var(--muted)">Postural</text><text x="${B.x+10}" y="${B.y+36}" class="t-lbl" style="fill:var(--muted)">instability</text><text x="${B.x+10}" y="${B.y+53}" class="t-xs">not required</text><text x="${B.x+B.w/2}" y="24" class="t-xs t-mid">MDS 2015</text></g>`;
      const sk=ease(ramp(t,.12,.17));if(sk>0)s+=`<path d="M${B.x+6} ${B.y+B.h-6}L${f1(B.x+6+(B.w-12)*sk)} ${f1(B.y+B.h-6-(B.h-12)*sk)}" style="stroke:var(--bad);stroke-width:2;stroke-linecap:round;opacity:.75"/>`}
    /* umbrella */
    const ou=ease(ramp(t,.18,.23)),U=L.ub;
    if(ou>0){const [tx,ty]=L.P(40,152);
      s+=`<rect x="${U.x}" y="${U.y}" width="${U.w}" height="${U.h}" rx="22" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.8;opacity:${f1(ou)}"/>`;
      s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-big" style="opacity:${f1(ou)}">PARKINSONISM</text><text x="${f1(tx)}" y="${f1(ty+15)}" class="t-xs" style="opacity:${f1(ou)}">the syndrome, with its causes</text>`}
    const hiPd=ramp(t,.44,.5);
    WH_CAUSES.forEach((c,i)=>{const g=ease(ramp(t,c.a,c.a+.05));if(g<=0)return;const [x,y]=L.P(c.x,c.y),r=c.r*L.rf*g,pd=i===0;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${c.f};stroke:${c.c};stroke-width:${pd?2.2+hiPd:1.6}"/>`;
      const lo=ramp(t,c.a+.03,c.a+.06);if(lo<=0)return;
      if(c.out)s+=`<text x="${f1(x-r-5)}" y="${f1(y+3)}" class="t-xs t-end" style="opacity:${f1(lo)}">${c.l[0]}</text>`;
      else{const lh=c.cls==='t-lbl'?15:c.cls==='t-sm'?12:10,y0=y-(c.l.length-1)*lh/2+(c.cls==='t-lbl'?4:3)-(pd?10*hiPd:0);
        c.l.forEach((ln,k)=>{s+=`<text x="${f1(x)}" y="${f1(y0+k*lh)}" class="${c.cls} t-mid" style="fill:var(--ink);opacity:${f1(lo)}">${ln}</text>`})}
      if(pd&&hiPd>0)s+=`<text x="${f1(x)}" y="${f1(y+24)}" class="t-sm t-mid" style="fill:var(--rose);font-weight:700;opacity:${f1(hiPd)}">42% of new cases</text>`});
    /* waffle: 364 incident cases, per 100 */
    const ow=ramp(t,.4,.45);
    if(ow>0){const W=L.wf,n=Math.round(100*ramp(t,.42,.56));
      s+=`<g style="opacity:${f1(ow)}"><text x="${W.x}" y="${W.ty}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'NEW PARKINSONISM, PER 100':'NEW CASES OF PARKINSONISM, PER 100'}</text>`;
      let i=0;WH_WAF.forEach(([l,cnt,col])=>{for(let j=0;j<cnt;j++,i++){const cx=W.x+(i%10)*W.c,cy=W.y+Math.floor(i/10)*W.c,sz=W.c-3;
        s+=i<n?`<rect x="${cx}" y="${cy}" width="${sz}" height="${sz}" rx="2" style="fill:${col};${col==='var(--panel-2)'?'stroke:var(--muted);stroke-width:1':''}"/>`:`<rect x="${cx+.5}" y="${cy+.5}" width="${sz-1}" height="${sz-1}" rx="2" style="fill:none;stroke:var(--line)"/>`}});
      const LG=L.lg;WH_WAF.forEach(([l,cnt,col],k)=>{const y=LG.y+k*LG.r,o=ramp(t,.44+k*.02,.48+k*.02);
        s+=`<g style="opacity:${f1(o)}"><rect x="${LG.x}" y="${y-9}" width="11" height="11" rx="2" style="fill:${col};stroke:var(--muted);stroke-width:${col==='var(--panel-2)'?1:0}"/><text x="${LG.x+17}" y="${y}" class="t-xs" style="fill:var(--ink)">${l} <tspan style="font-weight:700">${cnt}%</tspan></text></g>`});
      s+=`<text x="${LG.x}" y="${LG.y+5*LG.r+(N?-2:4)}" class="t-xs" style="opacity:${f1(ramp(t,.52,.56))}">Olmsted 1976–90, n = 364</text></g>`}
    /* autopsy check */
    const oa=ramp(t,.62,.66);
    if(oa>0){const D=L.dx,g=ease(ramp(t,.64,.76)),w=D.w;
      s+=`<g style="opacity:${f1(oa)}"><text x="${D.x}" y="${D.y}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'DIAGNOSED IN LIFE: 100 BRAINS':'DIAGNOSED WITH PARKINSON\'S IN LIFE: 100 BRAINS'}</text>`;
      s+=`<rect x="${D.x}" y="${D.y+8}" width="${w}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${D.x}" y="${D.y+8}" width="${f1(w*.76*g)}" height="16" rx="4" style="fill:var(--rose)"/>`;
      if(g>.2)s+=`<text x="${f1(D.x+6)}" y="${D.y+20}" class="t-xs" style="fill:var(--panel);font-weight:700">${Math.round(76*g)} Lewy bodies</text>`;
      if(g>.95)s+=`<text x="${D.x+w-6}" y="${D.y+20}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">24 other</text>`;
      s+=`<text x="${D.x}" y="${D.y+40}" class="t-xs">${N?'other: PSP, MSA, Alzheimer\'s, vascular':'the other 24: PSP, MSA, Alzheimer\'s, vascular'}</text></g>`}
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  const stop=playWire(rg,$('#whPlay'),draw,16000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);

  /* ---------- 2. the signs up close ---------- */
  const sg=$('#whSign'),sr=$('#whSignT');let sign=0;
  function drawSign(t){
    const N=vb(sg,'720 270','400 500');
    const L=N?{sx:200,sy:36,gx0:46,gx1:384,gy0:290,gy1:464}:{sx:160,sy:36,gx0:360,gx1:700,gy0:40,gy1:226};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const W=L.gx1-L.gx0,H=L.gy1-L.gy0,X=u=>L.gx0+u*W,Y=v=>L.gy1-v*H;
    const axes=(xl,yl)=>`<path d="M${L.gx0} ${L.gy0}V${L.gy1}H${L.gx1}" class="axis" style="stroke:var(--muted)"/><text x="${L.gx0}" y="${L.gy0-8}" class="t-xs">${yl}</text><text x="${L.gx1}" y="${L.gy1+16}" class="t-xs t-end">${xl}</text>`;
    const cx=L.sx,cy=L.sy;
    if(sign===0){ /* finger tapping */
      const taps=10,ph=t*taps,k=Math.floor(ph),u=ph-k,env=1-.7*Math.min(1,t*1.05),open=Math.abs(Math.sin(Math.PI*u))*env;
      s+=`<text x="${cx-90}" y="${cy-8}" class="t-sm" style="fill:var(--ink);font-weight:600">FINGER TAPPING</text>`;
      s+=whHand(cx-70,cy+90,Math.abs(Math.sin(Math.PI*u)),'var(--sage)')+whHand(cx+50,cy+90,open,'var(--rose)');
      s+=`<text x="${cx-58}" y="${cy+172}" class="t-xs t-mid" style="fill:var(--sage)">typical</text><text x="${cx+62}" y="${cy+172}" class="t-xs t-mid" style="fill:var(--rose)">bradykinesia</text>`;
      s+=`<text x="${cx-96}" y="${cy+196}" class="t-xs">tap ${Math.min(taps,k+1)} of ${taps}</text>`;
      s+=axes('time →','tap size');
      s+=`<path d="${pathFn(v=>.85*Math.abs(Math.sin(Math.PI*taps*v*t)),L.gx0,lerp(L.gx0,L.gx1,t),L.gy1,L.gy0,200)}" style="fill:none;stroke:var(--sage);stroke-width:1.6;opacity:.8"/>`;
      s+=`<path d="${pathFn(v=>(1-.7*Math.min(1,v*t*1.05))*.85*Math.abs(Math.sin(Math.PI*taps*v*t)),L.gx0,lerp(L.gx0,L.gx1,t),L.gy1,L.gy0,200)}" style="fill:none;stroke:var(--rose);stroke-width:2.2"/>`;
      if(t>.3)s+=`<path d="M${f1(X(.04))} ${f1(Y(.9))}L${f1(X(Math.min(t,.98)))} ${f1(Y(.86-.6*Math.min(1,t)))}" style="stroke:var(--rose);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${L.gx1}" y="${L.gy0+4}" class="t-xs t-end" style="fill:var(--rose);font-weight:700">- - shrinking taps: decrement</text>`;
    }else if(sign===1){ /* rest tremor, suppressed on movement */
      const move=ease(ramp(t,.58,.7)),back=ease(ramp(t,.86,.98)),lift=move*(1-back),amp=(1-ramp(t,.58,.62))+ramp(t,.9,.98);
      const jit=6*clamp(amp)*Math.sin(Math.PI*2*5*t*4);
      const ex=cx-20,ey=cy+120,ang=-lift*.9,hx=ex+Math.cos(ang)*92,hy=ey+Math.sin(ang)*92+jit*(1-lift);
      s+=`<text x="${cx-130}" y="${cy-8}" class="t-sm" style="fill:var(--ink);font-weight:600">HAND RESTING IN THE LAP</text>`;
      const hip=ex-30;s+=`<path d="M${hip-16} ${ey+22}H${hip+40}M${hip-14} ${ey+22}V${ey+70}M${hip+36} ${ey+22}V${ey+70}M${hip-16} ${ey+22}V${ey-40}" style="fill:none;stroke:var(--muted);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<path d="M${hip} ${ey-70}L${hip} ${ey+12}L${hip+124} ${ey+12}L${hip+124} ${ey+70}" style="fill:none;stroke:var(--sage);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;opacity:.55"/><circle cx="${hip}" cy="${ey-88}" r="13" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:3"/>`;
      s+=`<path d="M${hip} ${ey-62}L${ex} ${ey}L${f1(hx)} ${f1(hy)}" style="fill:none;stroke:var(--sage);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(hx+8)}" cy="${f1(hy)}" r="10" style="fill:var(--cell);stroke:var(--rose);stroke-width:2.5"/>`;
      if(amp>.1&&lift<.2)s+=`<path d="M${f1(hx+24)} ${f1(hy-10)}q5 5 0 10M${f1(hx+30)} ${f1(hy-14)}q8 9 0 18" style="fill:none;stroke:var(--rose);stroke-width:1.6"/>`;
      s+=`<text x="${cx+20}" y="${cy+200}" class="t-xs t-mid" style="fill:${lift>.2?'var(--sage)':'var(--rose)'};font-weight:700">${lift>.2?'reaching: tremor suppressed':'at rest: about 5 shakes a second'}</text>`;
      s+=axes('time →','tremor');
      s+=`<path d="${pathFn(v=>{const tt=v*t,a=(1-ramp(tt,.58,.62))+ramp(tt,.9,.98);return .5+.4*clamp(a)*Math.sin(Math.PI*2*5*tt*4)},L.gx0,lerp(L.gx0,L.gx1,t),L.gy1,L.gy0,260)}" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`;
      if(t>.6)s+=`<path d="M${f1(X(.6))} ${L.gy0+6}V${L.gy1}" style="stroke:var(--sage);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(X(.6)+4)}" y="${L.gy0+16}" class="t-xs" style="fill:var(--sage);font-weight:700">movement starts</text>`;
    }else if(sign===2){ /* rigidity */
      const sweep=.5-.5*Math.cos(Math.PI*2*t*2),ang=lerp(.35,2.3,sweep);
      const ex=cx+20,ey=cy+110,hx=ex+Math.cos(ang)*90,hy=ey-Math.sin(ang)*90;
      s+=`<text x="${cx-130}" y="${cy-8}" class="t-sm" style="fill:var(--ink);font-weight:600">SLOW PASSIVE ELBOW MOVEMENT</text>`;
      s+=`<path d="M${ex-90} ${ey}L${ex} ${ey}L${f1(hx)} ${f1(hy)}" style="fill:none;stroke:var(--sage);stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${ex-96}" cy="${ey}" r="13" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/><text x="${ex-96}" y="${ey+30}" class="t-xs t-mid">shoulder</text>`;
      s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="9" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2.5"/><text x="${f1(hx+(hx>ex?14:-14))}" y="${f1(hy-12)}" class="t-xs ${hx>ex?'':'t-end'}" style="fill:var(--sky)">examiner</text>`;
      s+=`<circle cx="${ex}" cy="${ey}" r="6" style="fill:var(--panel);stroke:var(--sage);stroke-width:2"/><text x="${cx-130}" y="${cy+168}" class="t-xs">the person stays relaxed</text>`;
      s+=axes('elbow angle →','resistance');
      const mk=(fn,col,w,dash)=>`<path d="${pathFn(fn,L.gx0+4,L.gx1-4,L.gy1,L.gy0,160)}" style="fill:none;stroke:${col};stroke-width:${w};${dash?'stroke-dasharray:'+dash:''}"/>`;
      s+=mk(u=>.12,'var(--sage)',2)+mk(u=>.78,'var(--rose)',3.4)+mk(u=>.38+.16*((u*10)%1),'var(--warn)',1.6,'5 3');
      const px=lerp(L.gx0+4,L.gx1-4,sweep);s+=`<path d="M${f1(px)} ${L.gy0}V${L.gy1}" style="stroke:var(--ink);stroke-width:1;opacity:.4"/><circle cx="${f1(px)}" cy="${f1(Y(.78))}" r="5" style="fill:var(--rose)"/>`;
      s+=`<text x="${L.gx1-6}" y="${f1(Y(.78)-8)}" class="t-xs t-end" style="fill:var(--rose);font-weight:700">lead-pipe: even, counts</text><text x="${L.gx1-6}" y="${f1(Y(.56)-6)}" class="t-xs t-end" style="fill:var(--warn);font-weight:700">cogwheel alone: does not count</text><text x="${L.gx1-6}" y="${f1(Y(.12)-6)}" class="t-xs t-end" style="fill:var(--sage);font-weight:700">typical</text>`;
    }else{ /* pull test */
      const pull=bump(t,.08,.34),k=ramp(t,.1,.7);
      const g=cy+190,x1=N?cx-90:cx-80,x2=N?cx+80:cx+90;
      s+=`<text x="${cx-130}" y="${cy-8}" class="t-sm" style="fill:var(--ink);font-weight:600">THE PULL TEST</text><path d="M${cx-140} ${g}H${cx+150}" class="axis" style="stroke:var(--muted)"/>`;
      const lean1=-.12*pull;
      s+=whFig(x1-Math.min(1,k*3)*14,g,lean1,'var(--sage)','var(--sage-soft)');
      const st2=ease(k)*70,lean2=-.28*clamp(pull+ramp(t,.3,.6)*(1-ramp(t,.8,.95)));
      s+=whFig(x2-st2,g,lean2,'var(--rose)','var(--rose-soft)');
      for(let i=0;i<5;i++){const o=ramp(t,.18+i*.11,.22+i*.11);if(o>0)s+=`<ellipse cx="${f1(x2-14*i-4)}" cy="${g+5}" rx="6" ry="2.6" style="fill:var(--rose);opacity:${f1(o*.6)}"/>`}
      if(pull>0)[x1,x2-st2].forEach(x=>{s+=`<g style="opacity:${f1(Math.min(1,pull*2))}"><path d="M${f1(x-20)} ${g-104}h${f1(-34)}" style="stroke:var(--sky);stroke-width:3;stroke-linecap:round"/><path d="M${f1(x-60)} ${g-104}l9 -6v12z" style="fill:var(--sky)"/><text x="${f1(x-44)}" y="${g-90}" class="t-xs t-mid" style="fill:var(--sky)">pull</text></g>`});
      s+=`<text x="${x1}" y="${g+22}" class="t-xs t-mid" style="fill:var(--sage)">recovers in 1–2 steps</text><text x="${x2-20}" y="${g+22}" class="t-xs t-mid" style="fill:var(--rose)">keeps stepping back</text>`;
      /* text panel instead of a graph */
      const T=(y,txt,st)=>`<text x="${L.gx0}" y="${y}" class="t-sm" style="${st||'fill:var(--ink)'}">${txt}</text>`;
      const y0=L.gy0+10,lh=N?20:22;
      s+=T(y0,'WHERE IT FITS','fill:var(--muted);font-weight:700')+T(y0+lh*1.3,'UK Brain Bank: one of the signs','')+T(y0+lh*2.3,'MDS 2015: not part of the core','fill:var(--rose);font-weight:700')+T(y0+lh*3.6,'In Parkinson\'s: Hoehn and Yahr 3','')+T(y0+lh*4.9,'Early falls (within 3 years):','fill:var(--warn);font-weight:700')+T(y0+lh*5.9,'think PSP or MSA','fill:var(--warn)');
    }
    sg.innerHTML=s;
    const P=WH_SIGNS[sign];$('#whSignNote').innerHTML=noteHTML(P);sg.setAttribute('aria-label',P.aria);
    sr.setAttribute('aria-valuetext',`${P.t}: ${Math.round(t*100)}% through the demonstration`);
  }
  playWire(sr,$('#whSignPlay'),drawSign,7000,'Replay','what');
  $('#whSignBtns').addEventListener('click',e=>{const b=e.target.closest('[data-whs]');if(!b)return;sign=+b.dataset.whs;
    $$('[data-whs]',$('#whSignBtns')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawSign(+sr.value)});
  {const prev=redraws.what;redraws.what=()=>{prev&&prev();drawSign(+sr.value)}}

  /* ---------- 3. age and sex ---------- */
  const ag=$('#whAge'),ar=$('#whAgeT');let split=true;
  function drawAge(t){
    const N=vb(ag,'720 360','400 610');
    const L=N?{x0:54,x1:384,y0:56,y1:330,rx:20,ry:400,lw:360}:{x0:66,x1:470,y0:40,y1:300,rx:500,ry:56,lw:200};
    const age=lerp(30,99,t),X=a=>lerp(L.x0,L.x1,(a-30)/70),Y=v=>L.y1-v/220*(L.y1-L.y0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    [0,50,100,150,200].forEach(v=>{s+=`<path d="M${L.x0} ${f1(Y(v))}H${L.x1}" class="grid"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.x0-6}" y="${L.y0-14}" class="t-xs">per 100,000 a year</text>`;
    s+=`<path d="M${L.x0} ${L.y1}H${L.x1}" class="axis" style="stroke:var(--muted)"/>`;
    [30,40,60,70,80,100].forEach(a=>{s+=`<path d="M${f1(X(a))} ${L.y1}v5" class="axis" style="stroke:var(--muted)"/><text x="${f1(X(a))}" y="${L.y1+16}" class="t-xs t-mid">${a===100?'99':a===30?'<40':a}</text>`});
    s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${L.y1+32}" class="t-xs t-mid">age band</text>`;
    let cb=null;
    WH_INC.forEach(B=>{const xa=X(B.a)+2,xb=X(B.b)-2,w=xb-xa,g=ease(ramp(age,B.a,B.a+Math.min(6,(B.b-B.a)*.6))),here=age>=B.a&&(age<B.b||B.b===100);if(here)cb=B;
      const ser=split?[[B.m,'var(--sage)',xa,w/2-1],[B.w,'var(--violet)',xa+w/2+1,w/2-1]]:[[B.c,'var(--ink)',xa,w]];
      ser.forEach(([v,col,x,ww])=>{const h=L.y1-Y(v);
        s+=`<rect x="${f1(x)}" y="${f1(Y(v))}" width="${f1(ww)}" height="${f1(Math.max(.5,h))}" rx="3" style="fill:none;stroke:${col};stroke-width:1;stroke-dasharray:3 3;opacity:.45"/>`;
        if(g>0)s+=`<rect x="${f1(x)}" y="${f1(L.y1-h*g)}" width="${f1(ww)}" height="${f1(Math.max(.5,h*g))}" rx="3" style="fill:${col};opacity:${split?(here?.95:.7):(here?.75:.5)}"/>`;
        if(g>.6&&(ww>20||!N))s+=`<text x="${f1(x+ww/2)}" y="${f1(L.y1-h*g-5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${here?700:500};${N&&split?'font-size:8.5px':''}">${f1(v)}</text>`})});
    /* marker */
    const mx=X(age);s+=`<path d="M${f1(mx)} ${L.y0-4}V${L.y1}" style="stroke:var(--ink);stroke-width:1.5;stroke-dasharray:4 3"/><path d="M${f1(mx)} ${L.y0-4}l-6 -9h12z" style="fill:var(--ink)"/><text x="${f1(clamp(mx,L.x0+20,L.x1-20))}" y="${L.y0-18}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">age ${Math.round(age)}</text>`;
    /* readout panel */
    const B=cb||WH_INC[0],R=L.rx,ry=L.ry;
    s+=`<rect x="${R-8}" y="${ry-26}" width="${L.lw}" height="${N?204:240}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${R}" y="${ry-6}" class="t-sm" style="fill:var(--ink);font-weight:700">BAND ${B.l.toUpperCase()}</text>`;
    const row=(y,lab,v,col)=>`<rect x="${R}" y="${y-10}" width="10" height="10" rx="2" style="fill:${col}"/><text x="${R+16}" y="${y}" class="t-sm" style="fill:var(--ink)">${lab}</text><text x="${R+L.lw-24}" y="${y}" class="t-lbl t-end" style="fill:${col}">${f1(v)}</text>`;
    s+=row(ry+20,'men',B.m,'var(--sage)')+row(ry+44,'women',B.w,'var(--violet)')+row(ry+68,'both sexes',B.c,'var(--ink)');
    const rat=B.w>0?(B.m/B.w):null;
    s+=`<text x="${R}" y="${ry+98}" class="t-xs">per 100,000 person-years</text>`;
    s+=`<text x="${R}" y="${ry+126}" class="t-big" style="fill:var(--sage)">${rat?'men '+f1(rat)+'×':'too few cases'}</text><text x="${R}" y="${ry+142}" class="t-xs">${rat?'the rate in women, this band':'to compare men and women'}</text>`;
    if(!N)s+=`<text x="${R}" y="${ry+172}" class="t-xs">Median onset 73 (IQR 64–80).</text><text x="${R}" y="${ry+186}" class="t-xs">59% of the 464 patients were men.</text><text x="${R}" y="${ry+200}" class="t-xs">Crude rate, all ages: 14.0.</text>`;
    else s+=`<text x="${R}" y="${ry+160}" class="t-xs">Median onset 73. 59% of 464 patients were men.</text>`;
    ag.innerHTML=s;
    const p=phaseOf(WH_AGE,t);setAge(p);$('#whAgeNote').innerHTML=noteHTML(WH_AGE[p]);
    ar.setAttribute('aria-valuetext',`Age ${Math.round(age)}, band ${B.l}: men ${f1(B.m)}, women ${f1(B.w)} per 100,000 a year`);
  }
  const stopA=playWire(ar,$('#whAgePlay'),drawAge,13000,'Replay','what');
  const setAge=stepWire($('#whAgeSteps'),WH_AGE,ar,drawAge,stopA);
  const setSplit=v=>{split=v;$('#whSexSplit').setAttribute('aria-pressed',v);$('#whSexBoth').setAttribute('aria-pressed',!v);
    ag.setAttribute('aria-label',v?'Bars of new Parkinson\'s cases per 100,000 people a year by age band in Olmsted County, Minnesota, for men and women, filling in as an age marker moves from 30 to 95: almost none under 40, rising steeply after 60, and about twice as high in men as in women.':'Bars of new Parkinson\'s cases per 100,000 people a year by age band in Olmsted County, Minnesota, both sexes combined: 0.1 under 40, 9.2 at 40 to 59, 55.1 at 60 to 69, 119.2 at 70 to 79 and 133.9 at 80 and over.');
    drawAge(+ar.value)};
  $('#whSexSplit').onclick=()=>setSplit(true);$('#whSexBoth').onclick=()=>setSplit(false);

  /* ---------- 4. projections card ---------- */
  const PR=[ ['1990',2.5,'GBD','var(--muted)'],['2016',6.1,'GBD','var(--muted)'],['2019',8.5,'WHO','var(--sage)'],['2040',12,'Dorsey','var(--warn)'],['2050',25.2,'Su','var(--rose)'] ];
  let ps=`<rect width="300" height="150" rx="8" style="fill:var(--field)"/><path d="M14 122H290" class="axis" style="stroke:var(--muted)"/>`;
  PR.forEach(([y,v,src,col],i)=>{const x=22+i*56,h=v/25.2*92;ps+=`<rect x="${x}" y="${f1(122-h)}" width="40" height="${f1(h)}" rx="4" style="fill:${col};${i>2?'opacity:.75':''}"/>`;
    ps+=`<text x="${x+20}" y="${f1(116-h)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${i===2||i===3?'>':''}${v}M</text><text x="${x+20}" y="135" class="t-xs t-mid" style="fill:var(--ink)">${y}</text><text x="${x+20}" y="146" class="t-xs t-mid">${src}</text>`});
  ps+=`<path d="M190 14V124" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="194" y="22" class="t-xs">projected →</text>`;
  $('#whProj').innerHTML=ps;

  draw(+rg.value);drawSign(+sr.value);drawAge(+ar.value);
};
