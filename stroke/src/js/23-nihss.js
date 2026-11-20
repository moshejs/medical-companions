/* =============== 2.3 The NIH Stroke Scale =============== */
/* Main scrubber: the 15 items fill in for the current score set, with body, face and brain hints. The item cards below are the
   calculator and share that state. Then bands, the left-hemisphere bias, the posterior blind spot and the mRS explainer.
   Example score sets are invented for teaching. Uses sgHB, sgLines and sgFit from 21-signs.js. */
const NH_MOTOR=[[0,'No drift'],[1,'Drift'],[2,'Some effort against gravity'],[3,'No effort against gravity, limb falls'],[4,'No movement']];
const NH_UNJ='Amputation or joint fusion';
const NH_ITEMS=[
 {id:'1a',s:'Consciousness',name:'Level of consciousness',tst:'Tests alertness',o:[[0,'Alert; responsive'],[1,'Not alert; somnolent'],[2,'Not alert; soporose'],[3,'Comatose']],
  n:`The modified NIHSS removes level of consciousness [[Lyden2001]]. In the original scale the most reliable item, pupillary response, had low validity, while less reliable motor items were more valid [[Brott1989]].`},
 {id:'1b',s:'LOC questions',name:'LOC questions',tst:'Tests month and age',o:[[0,'Both correct'],[1,'One correct'],[2,'Neither correct']],
  n:`Uses month and age [[ContinuumNIHSS2014]]. A high LVO signal: LOC questions independently predicted central occlusion [[Fischer2005]].`},
 {id:'1c',s:'LOC commands',name:'LOC commands',tst:'Tests close eyes and hand grip',o:[[0,'Both tasks'],[1,'One task'],[2,'Neither task']],
  n:`Two simple tasks: closing the eyes and gripping the hand [[Budincevic2022]].`},
 {id:'2',s:'Gaze',name:'Best gaze',tst:'Tests eye movement',o:[[0,'Normal'],[1,'Partial gaze palsy'],[2,'Total gaze palsy']],
  n:`A high LVO signal: gaze independently predicted central occlusion [[Fischer2005]], and gaze deviation was a significant LVO indicator across tools [[Antipova2019]].`},
 {id:'3',s:'Visual',name:'Visual',tst:'Tests visual fields',o:[[0,'No visual loss'],[1,'Partial hemianopia'],[2,'Complete hemianopia'],[3,'Bilateral hemianopia (blind including cortical blindness)']],
  n:`One of only two subscores that run higher in posterior stroke [[Sato2008]]. Hemianopia explained 10.8% of EQ-5D utility variance at 90 days [[vanderEnde2023]].`},
 {id:'4',s:'Face',name:'Facial palsy',tst:'Tests the face',o:[[0,'Normal'],[1,'Minor paralysis'],[2,'Partial paralysis'],[3,'Complete paralysis']],
  n:`Historically one of the hardest items to agree on, kappa below 0.40 [[Lyden1994]]. One summary words 2 as "partial (lower only)" and 3 as "complete (upper and lower)" [[ContinuumNIHSS2014]]. The modified NIHSS removes it [[Lyden2001]].`},
 {id:'5a',s:'Arm, left',name:'Motor arm, left',tst:'Tests drift, held for 10 s',o:NH_MOTOR,un:NH_UNJ,
  n:`Limb paresis explained most of the variance in quality of life at 90 days (17.5 to 24.1% of EQ-5D utility) [[vanderEnde2023]]. A right-hemisphere stroke shows here with no language points to add [[Woo1999]].`},
 {id:'5b',s:'Arm, right',name:'Motor arm, right',tst:'Tests drift, held for 10 s',o:NH_MOTOR,un:NH_UNJ,
  n:`Same options as the left arm. In the 4-factor fit, motor function on each side separates from cortical function [[Lyden1999,Lyden2004]].`},
 {id:'6a',s:'Leg, left',name:'Motor leg, left',tst:'Tests drift, held for 5 s',o:NH_MOTOR,un:NH_UNJ,
  n:`A high LVO signal: motor leg independently predicted central occlusion [[Fischer2005]].`},
 {id:'6b',s:'Leg, right',name:'Motor leg, right',tst:'Tests drift, held for 5 s',o:NH_MOTOR,un:NH_UNJ,
  n:`Same options as the left leg, and the same LVO signal [[Fischer2005]].`},
 {id:'7',s:'Ataxia',name:'Limb ataxia',tst:'Tests finger-nose-finger and heel-knee-shin',o:[[0,'Absent'],[1,'Present in one limb'],[2,'Present in two limbs']],un:NH_UNJ,
  n:`Kappa below 0.40 historically [[Lyden1994]]. Runs higher in posterior stroke [[Sato2008]]. Truncal ataxia, the commonest sign in people who scored 0 with an infarct on DWI, is not on the scale [[MartinSchild2011]].`},
 {id:'8',s:'Sensory',name:'Sensory',tst:'Tests pinprick',o:[[0,'Normal'],[1,'Mild-to-moderate loss'],[2,'Severe-to-total loss']],
  n:`Uses pinprick [[ContinuumNIHSS2014]]. The modified NIHSS collapses it to 2 responses [[Lyden2001]].`},
 {id:'9',s:'Language',name:'Best language',tst:'Tests for aphasia',o:[[0,'No aphasia'],[1,'Mild-to-moderate aphasia'],[2,'Severe aphasia'],[3,'Mute, global aphasia']],
  n:`Language adds points that right-sided signs do not, so left hemisphere strokes score higher for the same volume [[Woo1999,Lyden2004]]. Aphasia explained 10.0% of EQ-5D utility variance at 90 days [[vanderEnde2023]].`},
 {id:'10',s:'Dysarthria',name:'Dysarthria',tst:'Tests articulation',o:[[0,'Normal'],[1,'Mild-to-moderate'],[2,'Severe']],un:'Intubated or other physical barrier',
  n:`Option 2 reads "near to unintelligible or worse" in one summary and "severe" in the other [[Budincevic2022,ContinuumNIHSS2014]]. The modified NIHSS removes it [[Lyden2001]].`},
 {id:'11',s:'Inattention',name:'Extinction and inattention',tst:'Formerly neglect',o:[[0,'No abnormality'],[1,'Mild'],[2,'Severe']],
  n:`Reads "partial" and "complete" neglect in one summary, "mild" and "severe" in the other [[Budincevic2022,ContinuumNIHSS2014]]. A high LVO signal [[Fischer2005]]. Neglect explained 8.9% of EQ-5D utility variance at 90 days [[vanderEnde2023]]. At most 2 points, against 3 for language.`}
];
const NH_MAX=[3,2,2,2,3,3,4,4,4,4,2,2,3,2,2];
/* invented teaching score sets, in item order */
const NH_PROF={lmca:[0,2,1,1,1,2,0,3,0,2,0,1,2,1,0],rmca:[0,0,0,1,1,2,3,0,2,0,0,1,0,1,2],post:[0,0,0,0,1,0,0,0,0,0,2,1,0,1,0],zero:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
const NH_PNOTE={lmca:'Invented: a left hemisphere pattern, with language points.',rmca:'Invented: a right hemisphere pattern, with inattention instead of language.',post:'Invented: a posterior pattern, with ataxia and vision. Note the low total.',zero:'All zero.'};
const NH_STEPS=[
 {from:0,at:.1,k:'Items 1a, 1b, 1c',t:'Alertness',txt:`Designed in 1989 as a 15-item examination for acute stroke trials [[Brott1989]]. The first three items cover alertness, then month and age, then two commands [[Budincevic2022,ContinuumNIHSS2014]]. LOC questions independently predicted central occlusion [[Fischer2005]].`,
  pt:`A short set of questions and tasks, each scored. A higher number means a more severe stroke now [[Adams1999,Kasner2006]].`},
 {from:.2,at:.27,k:'Items 2, 3',t:'Eyes',txt:`Gaze and visual fields. Gaze independently predicted central occlusion [[Fischer2005]]. Ataxia and visual are the only subscores that run higher in posterior stroke [[Sato2008]].`},
 {from:1/3,at:.56,k:'Items 4 to 7',t:'Face and limbs',txt:`Six items and up to 21 of the 42 points. Arms are held for 10 s and legs for 5 s [[Budincevic2022]]. Facial palsy and ataxia had poor agreement, kappa below 0.40 [[Lyden1994]]. Limb paresis explained the most variance in quality of life at 90 days [[vanderEnde2023]].`,
  hook:`Items with a high LVO signal: LOC questions, gaze, motor leg and neglect [[Fischer2005]].`},
 {from:11/15,at:.84,k:'Items 8, 9, 10',t:'Sensation and speech',txt:`Pinprick, then language, then articulation [[ContinuumNIHSS2014]]. Language adds points that right-sided signs do not. For the same NIHSS band below 20, median right hemisphere infarct volume was about double the left [[Woo1999]].`},
 {from:14/15,at:1,k:'Item 11, and the total',t:'Attention and total',txt:`Extinction and inattention closes the scale. A commonly used banding is minor 1 to 4, moderate 5 to 15, moderate to severe 16 to 20, severe 21 to 42: a convention, not validated thresholds [[Mwamba2026,Fonarow2012]]. In clinical practice the NIHSS is useful for early prognosis and serial assessment [[Kasner2006]].`,
  pt:`The total describes today. It is not a promise about the future [[Adams1999,Kasner2006]].`,
  hook:`NIHSS 16 or more forecasts death or severe disability; 6 or less forecasts good recovery [[Adams1999]].`}
];
const NH_BANDS=[[1,4,'minor'],[5,15,'moderate'],[16,20,'moderate to severe'],[21,42,'severe']];
const NH_FON=[[0,7,'4.2%'],[8,13,'13.9%'],[14,21,'31.6%'],[22,42,'53.5%']];
const NH_HEMI={
 woo:{L:48,R:133,sL:'NIHSS 16 to 20',sR:'NIHSS 16 to 20',cap:`<b>Same band, nearly three times the volume.</b> At NIHSS 16 to 20, median infarct volume 133 mL right vs 48 mL left (P&lt;0.001). For the same NIHSS band below 20, right volume was about double the left [[Woo1999]].`},
 lyd:{L:37.8,R:56.2,sL:'median NIHSS 19',sR:'median NIHSS 15',cap:`<b>Left scores higher with a smaller stroke.</b> In large strokes, median NIHSS 19 left and 15 right, with median volumes of 37.8 mL and 56.2 mL: about 4 points higher despite smaller volume [[Lyden2004]].`},
 fink:{L:3.2,R:8.8,sL:'NIHSS 0 to 5',sR:'NIHSS 0 to 5',cap:`<b>Low scores hide more on the right.</b> With NIHSS 0 to 5, DWI volume 8.8 cm³ right vs 3.2 cm³ left (P=0.04). Among lesions above the median of 9 cm³, 8 of 37 right-sided and 1 of 39 left-sided strokes scored 0 to 5 (P=0.01) [[Fink2002Stroke]].`}
};
const NH_MRS=[
 {g:0,t:'0 No symptoms',d:'No symptoms at all',rows:['yes','yes','yes','yes'],txt:`"No symptoms at all" [[Luo2026]].`},
 {g:1,t:'1 No significant disability',d:'No significant disability despite symptoms; able to carry out all usual duties and activities',rows:['yes','yes','yes','yes'],txt:`"No significant disability despite symptoms; able to carry out all usual duties and activities" [[Luo2026]]. The standard label is symptomatic but nondisabled, "excellent" [[Saver2021]].`},
 {g:2,t:'2 Slight disability',d:'Slight disability; unable to carry out all previous activities but able to look after own affairs without assistance',rows:['no','yes','yes','yes'],txt:`"Slight disability; unable to carry out all previous activities but able to look after own affairs without assistance" [[Luo2026]].`},
 {g:3,t:'3 Moderate disability',d:'Moderate disability; requires some help, but able to walk without assistance',rows:['no','no','yes','—'],txt:`"Moderate disability; requires some help, but able to walk without assistance" [[Luo2026]].`,hook:`Grade 3 walks unaided with some help; grade 4 cannot walk unaided [[Luo2026]].`},
 {g:4,t:'4 Moderately severe',d:'Moderately severe disability; unable to walk without assistance and unable to attend to own bodily needs without help',rows:['no','no','no','no'],txt:`"Moderately severe disability; unable to walk without assistance and unable to attend to own bodily needs without help" [[Luo2026]].`,hook:`Grade 3 walks unaided with some help; grade 4 cannot walk unaided [[Luo2026]].`},
 {g:5,t:'5 Severe disability',d:'Severe disability; bedridden, incontinent, and requiring constant nursing care and attention',rows:['no','no','no','no'],txt:`"Severe disability; bedridden, incontinent, and requiring constant nursing care and attention" [[Luo2026]]. The standard label is requires constant care, "very poor" [[Saver2021]].`},
 {g:6,t:'6 Death',d:'Death',rows:null,txt:`Modern usage adds 6 for death, so that trials count it on the same scale [[Saver2021,Thomalla2018]].`}
];
const NH_MRS_STEPS=NH_MRS.map((m,i)=>({from:i/7,at:(i+.5)/7,k:'mRS '+m.g,t:m.t,txt:m.txt,hook:m.hook}));
const NH_MRS_ROWS=['All usual activities','Own affairs, no assistance','Walks without assistance','Own bodily needs'];
const NH_CUT={'01':{to:2,cap:`<b>mRS 0 to 1.</b> Used in WAKE-UP (53.3% vs 41.8%) [[Thomalla2018]] and EXTEND (35.4% vs 29.5%) [[Ma2019]].`},
 '02':{to:3,cap:`<b>mRS 0 to 2, functional independence.</b> Used in DAWN (49% vs 13%) [[Nogueira2018]], DEFUSE 3 (45% vs 17%) [[Albers2018]], ESCAPE (53.0% vs 29.3%) [[Goyal2015]] and EXTEND-IA (71% vs 40%) [[Campbell2015]]. Trials differ, so compare the cut point before the percentages.`},
 '03':{to:4,cap:`<b>mRS 0 to 3.</b> Used in RESCUE-Japan LIMIT, a large ischaemic region (31.0% vs 12.7%) [[Yoshimura2022]].`},
 sh:{to:7,cap:`<b>Ordinal shift.</b> Counts movement across the whole scale. DEFUSE 3: OR 2.77 [[Albers2018]]. Pooled early-window thrombectomy: adjusted common OR 2.49, number needed to treat 2.6 for one level on the mRS [[Goyal2016]].`}};
inits.nihss=()=>{
  const svg=$('#nhSvg'),rg=$('#nhT'),note=$('#nhNote'),host=$('#nhItems'),tot=$('#nhTot');let setSt=()=>{},curI=-1;
  const val=NH_PROF.lmca.slice();
  const num=(i)=>val[i]==='UN'?0:val[i];
  const total=()=>val.reduce((a,_,i)=>a+num(i),0);
  const bandOf=T=>{if(T===0)return null;return NH_BANDS.find(b=>T>=b[0]&&T<=b[1])};
  /* ---------- item cards ---------- */
  host.innerHTML=NH_ITEMS.map((it,i)=>`<article class="nhitem" data-nhcard="${i}"><h4><span>${it.id}</span>${it.name}</h4><p class="tst">${it.tst}. Maximum ${NH_MAX[i]}.</p><div class="nhopts" role="group" aria-label="${it.name}">${it.o.map(o=>`<button class="nhopt" data-nhi="${i}" data-nhv="${o[0]}" aria-pressed="false"><b>${o[0]}</b><span>${o[1]}</span></button>`).join('')}${it.un?`<button class="nhopt" data-nhi="${i}" data-nhv="UN" aria-pressed="false"><b>UN</b><span>${it.un}: untestable, adds nothing</span></button>`:''}</div><p class="nhnote">${it.n}</p></article>`).join('');
  function syncCards(){$$('.nhopt',host).forEach(b=>{const i=+b.dataset.nhi,v=b.dataset.nhv;b.setAttribute('aria-pressed',String(val[i])===v)});
    $$('.nhitem',host).forEach((c,i)=>c.classList.toggle('cur',i===curI));
    const T=total(),b=bandOf(T),un=val.filter(v=>v==='UN').length;
    tot.innerHTML=`<b>${T} / 42</b><span>${b?`Commonly used band: ${b[2]} (${b[0]} to ${b[1]}), a convention`:'No points. A score of zero does not exclude stroke'}${un?`. Untestable items: ${un}`:''}</span>`;
    drawBands()}
  /* ---------- bands ---------- */
  const bs=$('#nhBands'),bc=$('#nhBandCap');
  function drawBands(){const N=vb(bs,'720 180','400 180'),T=total(),x0=N?14:20,w=N?372:680,X=v=>x0+w*v/42;let g='';
    const strip=(y,B,lab,cur)=>{let s=`<text x="${x0}" y="${y-8}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
      B.forEach(b=>{const on=T>=b[0]&&T<=b[1],a=X(b[0]===0?0:b[0]-.5),e=X(Math.min(42,b[1]+.5));s+=`<rect x="${f1(a)}" y="${y}" width="${f1(e-a-1)}" height="30" rx="4" style="fill:${on?'var(--dx-soft)':'var(--panel-2)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1}"/>`;
        const tx=cur(b);if(tx&&(e-a)>tx.length*5.4)s+=`<text x="${f1((a+e)/2)}" y="${y+19}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${tx}</text>`});return s};
    g+=strip(24,NH_BANDS,'Commonly used bands, a convention',b=>b[2]==='moderate to severe'?(N?'16-20':'mod.-severe'):b[2]==='minor'?(N?'1-4':'minor'):b[2]);
    g+=strip(90,NH_FON,'Medicare data: 30-day mortality, a population figure',b=>`${b[0]}-${b[1]}: ${b[2]}`);
    [0,7,14,21,28,35,42].forEach(v=>{g+=`<text x="${f1(X(v))}" y="148" class="t-xs t-mid">${v}</text>`});
    [66,132].forEach(y=>{g+=`<path d="M${f1(X(T)-6)} ${y}l6 -9l6 9z" style="fill:var(--ink)"/>`});g+=`<text x="${f1(clamp(X(T),x0+30,x0+w-30))}" y="172" class="t-lbl t-mid">total ${T}</text>`;
    bs.innerHTML=g;
    const F=NH_FON.find(b=>T>=b[0]&&T<=b[1]);
    bc.innerHTML=`In 33,102 Medicare beneficiaries with NIHSS ${F[0]} to ${F[1]}, 30-day mortality was ${F[2]} [[Fonarow2012]]. That is a population figure from one older US cohort, never a prediction for a person.`}
  /* ---------- main: the score builds ---------- */
  function hint(cur,V,L,t){let g='';const weakL=V(6)+V(8),weakR=V(7)+V(9),side=weakL>weakR?'L':weakR>weakL?'R':V(12)>0?'R':'L',brain=side==='L'?'R':'L',T=val.reduce((a,_,i)=>a+V(i),0);
    g+=bodyHemi(L.bx,L.by,L.bs,{left:Math.min(1,(V(6)+V(8))/6),right:Math.min(1,(V(7)+V(9))/6),labels:true});
    g+=`<text x="${L.bx}" y="${L.by-L.bs/2-8}" class="t-xs t-mid" style="fill:var(--ink)">weakness</text>`;
    g+=faceGlyph(L.fx,L.fy,L.fs,{droop:V(5)/3,side});
    g+=`<text x="${L.fx}" y="${L.fy-L.fs/2-6}" class="t-xs t-mid" style="fill:var(--ink)">${cur===5?'face: being scored':'face'}</text>`;
    const postItem=cur===4||cur===10;
    if(postItem&&L.ss){const s=L.ss;g+=brainSide(L.ax,L.ay+6,s,{shade:cur===4?{pca:.85}:{cerebellum:.9}}).svg;g+=`<text x="${f1(L.ax+150*s)}" y="${L.ay+6+250*s+12}" class="t-xs t-mid" style="fill:var(--ink)">${cur===4?'vision: back of the brain':'ataxia: cerebellum'}</text>`}
    else{const aw=240*L.as,A=brainAxial(L.ax,L.ay,L.as,{mode:'plain',side:brain,core:T?clamp(.08+T/42*.5):0,penumbra:T?clamp(.14+T/42*.7):0});g+=A.svg;
      const lab=cur===12?'language: adds points':cur===14?'inattention: at most 2':`hint: ${brain==='L'?'person\'s left':'person\'s right'} side`;g+=`<text x="${f1(L.ax+aw/2)}" y="${f1(L.ay+300*L.as+12)}" class="t-xs t-mid" style="fill:var(--ink)">${lab}</text>`}
    return g}
  function draw(t){const N=vb(svg,'720 420','400 620'),k=clamp(t*15,0,15),cur=Math.min(14,Math.floor(k)),p=phaseOf(NH_STEPS,t),V=i=>i<Math.floor(k)||(k>=15)?num(i):(i===cur&&(k-cur)>.45?num(i):0);
    const L=N?{bx:50,by:96,bs:150,fx:158,fy:62,fs:78,ax:232,ay:4,as:.58,ss:.5,rx:14,ry:228,rw:372,rh:21,tx:14,ty:578,tw:372}:{bx:62,by:122,bs:190,fx:62,fy:318,fs:120,ax:132,ay:20,as:.72,ss:.62,rx:326,ry:18,rw:380,rh:22,tx:132,ty:280,tw:0};
    let g=`<g>${hint(k>=15?-1:cur,V,L,t)}</g>`;
    /* the item rows */
    NH_ITEMS.forEach((it,i)=>{const y=L.ry+i*L.rh,on=i===cur&&k<15,v=V(i),un=val[i]==='UN'&&(i<k);
      if(on)g+=`<rect x="${L.rx-4}" y="${y-2}" width="${L.rw+8}" height="${L.rh}" rx="5" style="fill:var(--dx-soft)"/>`;
      g+=`<text x="${L.rx}" y="${y+13}" style="font:700 11px var(--mono);fill:${on?'var(--dx)':'var(--muted)'}">${it.id}</text><text x="${L.rx+30}" y="${y+13}" class="t-sm" style="fill:var(--ink);font-weight:${on?700:500}">${it.s}</text>`;
      const px=L.rx+L.rw-118;for(let q=0;q<NH_MAX[i];q++){g+=`<rect x="${px+q*20}" y="${y+2}" width="17" height="13" rx="3" style="fill:${q<v?'var(--dx)':'var(--panel-2)'};stroke:${q<v?'var(--dx)':'var(--line)'}"/>`}
      g+=`<text x="${L.rx+L.rw}" y="${y+13}" class="t-lbl t-end" style="font-size:12px">${un?'UN':v}</text>`});
    /* total and the band scale */
    const T=val.reduce((a,_,i)=>a+V(i),0),band=bandOf(T),bx=L.rx,bw=L.rw,by=L.ry+15*L.rh+36,X=v=>bx+bw*v/42;
    g+=`<text x="${bx}" y="${by-14}" class="t-big" style="font-size:20px">Total ${T}</text><text x="${bx+bw}" y="${by-14}" class="t-sm t-end" style="fill:var(--ink)">${band?band[2]:'no points'}</text>`;
    NH_BANDS.forEach(b=>{const a=X(b[0]-.5),e=X(Math.min(42,b[1]+.5)),on=band===b;g+=`<rect x="${f1(a)}" y="${by}" width="${f1(e-a-1)}" height="12" rx="3" style="fill:${on?'var(--dx)':'var(--panel-2)'};stroke:var(--line)"/>`});
    [0,5,16,21,42].forEach(v=>{g+=`<text x="${f1(X(v))}" y="${by+25}" class="t-xs t-mid">${v}</text>`});
    g+=`<circle cx="${f1(X(T))}" cy="${by+6}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    /* in wide layout the scale needs its own room under the rows, which by computes */
    svg.innerHTML=g;note.innerHTML=noteHTML(NH_STEPS[p]);setSt(p)}
  const stop=playWire(rg,$('#nhPlay'),draw,30000,'%t:player.replay%','nihss');
  setSt=stepWire($('#nhSteps'),NH_STEPS,rg,draw,stop);
  host.addEventListener('click',e=>{const b=e.target.closest('.nhopt');if(!b)return;const i=+b.dataset.nhi,v=b.dataset.nhv;stop();val[i]=v==='UN'?'UN':+v;curI=i;rg.value=1;$$('[data-nhp]').forEach(x=>x.setAttribute('aria-pressed',false));syncCards();draw(1)});
  $$('[data-nhp]').forEach(b=>b.addEventListener('click',()=>{const P=NH_PROF[b.dataset.nhp];P.forEach((v,i)=>val[i]=v);curI=-1;$$('[data-nhp]').forEach(x=>x.setAttribute('aria-pressed',x===b));syncCards();stop();rg.value=1;draw(1)}));
  syncCards();draw(+rg.value);

  /* ---------- the left-hemisphere bias ---------- */
  const hm=$('#nhHemi'),hc=$('#nhHemiCap');let hk='woo',hS=null;
  function drawHemi(q=1){const N=vb(hm,'720 310','400 300'),D=NH_HEMI[hk],s=N?.72:.86,y=10,x1=N?14:100,x2=N?214:400,fr=v=>clamp(.8*Math.sqrt(v/220),0,.99);let g='';
    g+=brainAxial(x1,y,s,{mode:'plain',side:'L',core:Math.max(.02,fr(D.L)*ease(q)),orient:true}).svg+brainAxial(x2,y,s,{mode:'plain',side:'R',core:Math.max(.02,fr(D.R)*ease(q)),orient:true}).svg;
    const cy=y+300*s+16,cw=240*s;[[x1,'Left hemisphere',D.L,D.sL],[x2,'Right hemisphere',D.R,D.sR]].forEach(([x,l,v,sc])=>{g+=`<text x="${f1(x+cw/2)}" y="${f1(cy)}" class="t-lbl t-mid">${l}: ${v} ${hk==='fink'?'cm³':'mL'}</text><text x="${f1(x+cw/2)}" y="${f1(cy+16)}" class="t-sm t-mid" style="fill:var(--ink)">${sc}</text>`});
    hm.innerHTML=g;sgFit(hm,N?400:720,cy+24);hc.innerHTML=D.cap+' Lesion areas follow the volumes only as a picture.'}
  $$('[data-nhh]').forEach(b=>b.addEventListener('click',()=>{hk=b.dataset.nhh;$$('[data-nhh]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(hS)hS();hS=animate(700,drawHemi,()=>{hS=null})}));
  drawHemi(1);

  /* ---------- the posterior blind spot ---------- */
  const po=$('#nhPost');
  function drawPost(){const R=sgHB(8,6,504,[{head:'Median NIHSS, 1569 people'},{l:'Posterior',v:2,txt:'2',col:'var(--pca)'},{l:'Anterior',v:7,txt:'7',col:'var(--mca)'},{head:'Median NIHSS, with occlusion'},{l:'Posterior',v:3,txt:'3',col:'var(--pca)'},{l:'Anterior',v:7,txt:'7',col:'var(--mca)'},{head:'Best cut-off for favourable outcome'},{l:'Posterior',v:5,txt:'5 or less',col:'var(--pca)'},{l:'Anterior',v:8,txt:'8 or less',col:'var(--mca)'}],{N:false,max:10,lw:90,rh:21,pad:70});
    po.innerHTML=R.svg;sgFit(po,520,R.h+10)}
  drawPost();

  /* ---------- the mRS ---------- */
  const ms=$('#nhMrs'),mr=$('#nhMrsT'),mno=$('#nhMrsNote'),cc=$('#nhCutCap');let setMs=()=>{},cut='01';
  function figure(g,cx,cy,s,u){let o='';const by=cy+s*.55;
    if(g===6)return '';
    if(g===5){o+=person(cx+s*.72,by-s*.92,s*.92,'var(--muted)',{op:.85})+`<rect x="${f1(cx-s*.5)}" y="${f1(cy+s*.2)}" width="${f1(s)}" height="${f1(s*.12)}" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/><path d="M${f1(cx-s*.5)} ${f1(cy+s*.05)}V${f1(by)}M${f1(cx+s*.5)} ${f1(cy+s*.05)}V${f1(by)}" style="stroke:var(--muted);stroke-width:3"/><g transform="rotate(90 ${f1(cx)} ${f1(cy-s*.02)})">${person(cx,cy-s*.38,s*.72,'var(--dx)')}</g><line x1="${f1(cx-s*.9)}" x2="${f1(cx+s*1)}" y1="${f1(by)}" y2="${f1(by)}" class="axis"/>`;return o}
    const bob=Math.sin(u*Math.PI*6)*2.5,walk=g<=3,dx=walk?Math.sin(u*Math.PI*2)*s*.16:0;
    o+=`<line x1="${f1(cx-s*.9)}" x2="${f1(cx+s*.9)}" y1="${f1(by)}" y2="${f1(by)}" class="axis"/>`;
    if(g>=3)o+=person(cx+dx+s*.44,by-s*(g===4?.92:.92),s*.92,'var(--muted)',{op:g===4?.85:.45});
    o+=person(cx+dx,by-s*.92+bob,s*.92,'var(--dx)');
    return o}
  function drawMrs(t){const N=vb(ms,'720 330','400 440'),i=Math.min(6,Math.floor(t*7)),u=t*7-i,M=NH_MRS[i],W=N?372:680,x0=N?14:20,by=30;
    const S=mrsStack(x0,by,W,30,[1,1,1,1,1,1,1],{fmt:()=>''});let g=S.svg;
    const a=S.at(i);g+=`<path d="M${f1(a[0]-8)} ${by+44}l8 -10l8 10z" style="fill:var(--ink)"/>`;
    const C=NH_CUT[cut],cw=W*C.to/7,cy=by+52;
    g+=`<path d="M${x0} ${cy}v6h${f1(cw)}v-6" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(Math.max(x0+66,x0+cw/2))}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${cut==='sh'?'the whole scale':'counted as a good outcome'}</text>`;
    const L=N?{fx:90,fy:186,fs:96,hx:14,hy:272}:{fx:120,fy:218,fs:120,hx:250,hy:126};
    g+=figure(i,L.fx,L.fy,L.fs,t*7);
    const lines=sgLines(M.d,N?54:62);g+=`<text x="${N?180:L.hx}" y="${N?150:L.hy}" class="t-big" style="font-size:20px">${N?'mRS '+M.g:M.t}</text>`;
    lines.forEach((l,j)=>{g+=`<text x="${N?14:L.hx}" y="${(N?272:L.hy+24)+j*18}" class="t-lbl" style="font-weight:500">${l}</text>`});
    if(M.rows){const ty=(N?272:L.hy+24)+lines.length*18+(N?10:14);NH_MRS_ROWS.forEach((r,j)=>{const y=ty+j*24,v=M.rows[j],tx=N?14:L.hx;
        g+=`<text x="${tx}" y="${y+13}" class="t-sm" style="fill:var(--ink)">${r}</text>`;
        const cx=tx+(N?260:290);g+=`<rect x="${cx}" y="${y}" width="50" height="19" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${cx+25}" y="${y+14}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${v}</text>`})}
    ms.innerHTML=g;mno.innerHTML=noteHTML(NH_MRS_STEPS[i]);setMs(i)}
  const mStop=playWire(mr,$('#nhMrsPlay'),drawMrs,16000,'%t:player.replay%','nihss');
  setMs=stepWire($('#nhMrsSteps'),NH_MRS_STEPS,mr,drawMrs,mStop);
  function setCut(k){cut=k;$$('[data-nhcut]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.nhcut===k));cc.innerHTML=NH_CUT[k].cap;drawMrs(+mr.value)}
  $$('[data-nhcut]').forEach(b=>b.addEventListener('click',()=>setCut(b.dataset.nhcut)));
  setCut('01');
  redraws.nihss=(f=>()=>{f&&f();drawBands();drawHemi(1);drawPost()})(redraws.nihss);
};
