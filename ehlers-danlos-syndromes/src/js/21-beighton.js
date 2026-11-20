/* =============== 2.1 Beighton score =============== */
inits.beighton=()=>{
  const svg=$('#beSvg'),rg=$('#beT');

  /* ---- the illustrative adult: one value per side (degrees for limb items; the thumb is "folded" degrees) ----
     pass = 1 when that side reaches the published threshold. Total 7 of 9. */
  const ITEMS=[
    {k:'finger',n:'Little finger',thr:'≥ 90° back',sides:[{a:-100,p:1},{a:-94,p:1}],lim:-90,len:74,len2:52,w:10},
    {k:'thumb',n:'Thumb to forearm',thr:'touches the forearm',sides:[{a:171,p:1},{a:136,p:0}],len:96,len2:44,w:11},
    {k:'elbow',n:'Elbow',thr:'≥ 10° hyperextension',sides:[{a:-14,p:1},{a:-12,p:1}],lim:-10,len:92,len2:88,w:17},
    {k:'knee',n:'Knee',thr:'≥ 10° hyperextension',sides:[{a:-6,p:0},{a:-13,p:1}],lim:-10,len:98,len2:94,w:22},
    {k:'trunk',n:'Palms flat',thr:'palms flat, knees straight',sides:[{a:1,p:1}]}];
  const SEG=.17;
  const segOf=t=>Math.min(5,Math.floor(t/SEG+1e-9));
  /* progress of each side's sweep inside an item's segment */
  function sweep(i,t,side){const a=i*SEG,u=(t-a)/SEG;
    if(ITEMS[i].k==='trunk')return clamp(ramp(u,.08,.8));
    return side===0?ramp(u,.06,.44):ramp(u,.52,.9)}
  function state(t){const cells=ITEMS.map((it,i)=>it.sides.map((s,sd)=>{const p=sweep(i,t,sd);return p>=1?s.p:null}));
    let tot=0;cells.forEach(r=>r.forEach(c=>{if(c)tot++}));return {cells,tot}}

  const STEPS=[
    {from:0,at:.165,k:'Manoeuvre 1 · 2 points',t:'Little finger',
     txt:`The examiner bends the little finger back at the knuckle (the metacarpophalangeal joint), passively. Reaching 90° or more scores 1 point for that side; Malek's review words it as "beyond 90°", and the figure redrawn from the 2017 criteria gives "≥ 90°". Here both sides pass: 100° on the left, 94° on the right. This item had the lowest agreement between examiners in one three-phase study (kappa 0.60 or more, against above 0.80 for most items). [[Thwaites2022,Malek2021C,Malfait2017,Juul-Kristensen2007]]`,
     pt:`The little finger is gently bent backwards. If it goes back to a right angle or further, that side scores a point.`,
     hook:`Beighton = 9 points from 5 manoeuvres: little finger, thumb, elbow and knee on each side (8), plus palms flat (1). [[Thwaites2022,Carroll2023]]`},
    {from:.17,at:.335,k:'Manoeuvre 2 · 2 points',t:'Thumb to forearm',
     txt:`The thumb is pressed passively towards the flexor (palm-side) surface of the same forearm. A point is scored only if it touches. The left thumb folds flat against the forearm; the right stops with a gap, so the right side scores nothing. Only one plane of movement is tested, and the score says whether hypermobility is there, not how severe it is. [[Thwaites2022,Carroll2023,Malek2021C]]`,
     pt:`Each side is scored on its own. One thumb can reach the arm while the other cannot.`,
     hook:`Thumb item = apposition of the thumb to the volar (flexor) forearm, scored left and right. [[Thwaites2022]]`},
    {from:.34,at:.505,k:'Manoeuvre 3 · 2 points',t:'Elbow beyond straight',
     txt:`The elbow scores when it straightens 10° or more past a straight line (hyperextension). The dashed ray marks the 10° threshold. Ten degrees is hard to judge by eye: in children the score was shown valid "when goniometry is used", and with a structured protocol in degrees raters agreed within 5°. [[Thwaites2022,Carroll2023,Smits-Engelsman2011,Schlager2018]]`,
     pt:`The arm is straightened. If it bends backwards past straight by a small but definite angle, it counts.`,
     hook:`Elbow and knee: ≥ 10° hyperextension, each side scored separately. [[Thwaites2022]]`},
    {from:.51,at:.675,k:'Manoeuvre 4 · 2 points',t:'Knee beyond straight',
     txt:`The knee uses the same 10° rule. Here the left knee goes 6° past straight, which looks "very straight" but misses; the right reaches 13° and scores. Major joints such as the shoulders, hips and ankles are not scored at all, and two-thirds of the scored joints are in the upper limbs. [[Thwaites2022,Carroll2023,Malek2021C]]`,
     pt:`A knee can look very straight and still miss the 10° mark. That is one reason careful measuring matters.`,
     hook:`The Beighton score does not test the shoulders, hips or ankles. [[Malek2021C]]`},
    {from:.68,at:.845,k:'Manoeuvre 5 · 1 point',t:'Palms flat on the floor',
     txt:`With knees locked straight and feet together, the person bends forward until both palms rest flat on the floor: 1 point, the only unpaired item. It can be trained (as in ballet) and is limited by short hamstrings: in one study, 84.2% of over 200 hypermobile people (score 5 or more) could not do it. [[Thwaites2022,Carroll2023,Malek2021C]]`,
     pt:`Bending to put both hands flat on the floor, without bending the knees, adds one point.`,
     hook:`Trunk flexion is the single 1-point item; the score runs 0 to 9. [[Thwaites2022]]`},
    {from:.85,at:.97,k:'Total · compare with the cut-off',t:'7 of 9, then the age cut-off',
     txt:`This person scores 7. The 2017 hEDS criteria judge generalised joint hypermobility with a cut-off that falls with age: 6 or more for prepubertal children and adolescents, 5 or more from puberty to age 50, and 4 or more over 50. A score one point below the cut-off can still count if the five-part questionnaire is positive (2 or more "yes"). Open reproductions print the cut-offs as ">6, >5, >4" while others give "≥"; this guide follows the "≥" sources. [[Tofts2023,Fairweather2025,Thwaites2022,AubryRozier2021]]`,
     pt:`Seven meets every age cut-off. But that only shows bendy joints. It is one part of three for hypermobile EDS, and many healthy people score this high.`,
     hook:`Cut-offs ≥6 / ≥5 / ≥4 by age. One point short + 5PQ ≥2 still meets Criterion 1. [[Thwaites2022,Tofts2023]]`}];

  /* ---- drawing ---- */
  const badge=(x,y,p,r=11)=>p==null?'':`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${p?'var(--dx)':'var(--panel)'};stroke:${p?'var(--dx)':'var(--muted)'};stroke-width:1.5"/>`+
    (p?`<path d="M${f1(x-5)} ${f1(y)}l3.6 3.8l6.6-7.4" style="fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"/>`:`<path d="M${f1(x-4.5)} ${f1(y)}h9" style="stroke:var(--muted);stroke-width:2;stroke-linecap:round"/>`);
  const N_W=()=>svg.dataset.mode==='n';
  function limbPanel(it,side,cx,cy,S,p){
    S=S*(N_W()?165:200)/(it.len+it.len2);
    const s=it.sides[side],flip=side===0,len=it.len*S,l2=it.len2*S,deg=s.a*ease(p);
    const j=flip?cx-(len-l2)/2:cx+(len-l2)/2;let g='';
    if(it.k==='finger'){/* the back of the hand behind the knuckle */
      const hx=flip?j:j-len;g+=`<rect x="${f1(hx-(flip?0:0))}" y="${f1(cy-3*S)}" width="${f1(len)}" height="${f1(22*S)}" rx="${f1(10*S)}" style="fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1.2;opacity:.85"/>`}
    if(it.k==='knee'){/* floor and heel support */}
    if(it.k==='thumb'){const L=limb(j,cy,len,deg,{len2:l2,w:it.w*S,arc:false,flip});g+=L.svg;
      const tipY=L.end[1],gap=Math.max(0,tipY-cy-(it.w*S)*.5-(it.w*S)*.5);
      g+=`<line x1="${f1(flip?j+8:j-8)}" x2="${f1(flip?j+len:j-len)}" y1="${f1(cy+it.w*S*.5+1)}" y2="${f1(cy+it.w*S*.5+1)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      if(p>.05){const txt=gap<6?'touches':'gap';g+=`<text x="${f1(L.end[0])}" y="${f1(Math.max(tipY,cy+it.w*S)+22)}" class="t-sm t-mid" style="fill:${gap<6?'var(--dx)':'var(--muted)'}">${txt}</text>`}
      return g}
    const L=limb(j,cy,len,deg,{len2:l2,w:it.w*S,limit:it.lim,flip});g+=L.svg;
    return g}
  function trunkPanel(cx,F,S,p){/* side view, facing right; bends at the hip */
    const hipY=F-104*S,th=ease(p)*Math.PI*.86,T=82*S;
    const sh=[cx+Math.sin(th)*T,hipY-Math.cos(th)*T];
    const head=[cx+Math.sin(th)*(T+17*S),hipY-Math.cos(th)*(T+17*S)];
    const reach=sh[1]+70*S,flat=reach>=F-4;const hand=[sh[0]+(flat?4*S:-4*S*Math.cos(th)),Math.min(F-4,reach)];
    let g=`<line x1="${f1(cx-110*S)}" x2="${f1(cx+130*S)}" y1="${f1(F)}" y2="${f1(F)}" style="stroke:var(--muted);stroke-width:2"/>`;
    const st=(a,b,w,c='var(--skin-epi)')=>`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:var(--skin-line);stroke-width:${f1(w+2.4)};stroke-linecap:round"/><path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:${c};stroke-width:${f1(w)};stroke-linecap:round"/>`;
    g+=st([cx,hipY],[cx,F-6*S],15*S)+`<path d="M${f1(cx-4*S)} ${f1(F-3*S)}h${f1(22*S)}" style="stroke:var(--skin-line);stroke-width:${f1(7*S)};stroke-linecap:round"/>`;
    g+=st([cx,hipY],sh,22*S)+`<circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="${f1(12*S)}" style="fill:var(--skin-epi);stroke:var(--skin-line);stroke-width:1.2"/>`;
    g+=st(sh,hand,9*S);
    if(flat)g+=`<path d="M${f1(hand[0]-2*S)} ${f1(F-3)}h${f1(20*S)}" style="stroke:var(--dx);stroke-width:${f1(6*S)};stroke-linecap:round"/>`;
    /* straight-knee marker */
    g+=`<text x="${f1(cx-12*S)}" y="${f1(F-40*S)}" class="t-xs t-end">knees locked</text>`;
    return {svg:g,flat}}

  function draw(t){
    const N=vb(svg,'720 380','400 560');const i=segOf(t),st=state(t),it=ITEMS[Math.min(i,4)];
    const L=N?{sx:[100,300],sy:160,S:1,top:26,cap:78,sbx:16,sby:334,rh:34,cL:300,cR:352,tot:[200,548],W:400}
             :{sx:[120,340],sy:200,S:1,top:30,cap:92,sbx:478,sby:72,rh:44,cL:640,cR:690,tot:[594,330],W:720};
    let s='';
    /* scene */
    if(i<5){
      s+=`<text x="${N?16:20}" y="${L.top}" class="t-sm">MANOEUVRE ${i+1} OF 5</text><text x="${N?16:20}" y="${L.top+22}" class="t-big">${it.n}</text>`;
      s+=`<text x="${N?16:20}" y="${L.top+40}" class="t-xs">threshold: ${it.thr}${it.lim!=null?' (dashed ray)':''}</text>`;
      if(it.k==='trunk'){const p=sweep(i,t,0),T=trunkPanel(N?150:200,N?290:330,L.S*(N?1:1.05),p);s+=T.svg;
        s+=`<text x="${N?300:350}" y="${N?180:210}" class="t-lbl t-mid">${T.flat?'palms flat':'bending…'}</text>`+badge(N?300:350,N?204:236,st.cells[4][0]);}
      else [0,1].forEach(sd=>{const p=sweep(i,t,sd),cx=L.sx[sd];
        s+=`<g style="opacity:${p>0?1:.45}">${limbPanel(it,sd,cx,L.sy,L.S,p)}</g>`;
        const deg=Math.round(Math.abs(it.sides[sd].a*ease(p)));
        s+=`<text x="${cx}" y="${L.sy+(N?96:112)}" class="t-lbl t-mid">${sd?'Right':'Left'}<tspan class="t-sm" dx="6">${it.k==='thumb'?(p<=0?'waiting':''):(p>0?deg+'°':'waiting')}</tspan></text>`;
        s+=badge(cx,L.sy+(N?120:140),st.cells[i][sd])});
    }else{/* summary: ruler and cut-offs */
      const u=ramp(t,.86,.95),v=7*ease(u),x0=N?30:40,x1=N?370:430,ry=N?150:190,X=k=>lerp(x0,x1,k/9);
      s+=`<text x="${N?16:20}" y="${L.top}" class="t-sm">TOTAL</text><text x="${N?16:20}" y="${L.top+30}" style="font:400 30px var(--display);fill:var(--dx)">${Math.round(v)} of 9</text>`;
      const cuts=[{c:6,l:'≥6 child or adolescent'},{c:5,l:'≥5 puberty to 50'},{c:4,l:'≥4 over 50'}];
      cuts.forEach((c,k)=>{const yy=ry-26-k*22,on=v>=c.c-.01;
        s+=`<line x1="${f1(X(c.c))}" x2="${f1(X(9))}" y1="${yy}" y2="${yy}" style="stroke:${on?'var(--good)':'var(--line)'};stroke-width:6;stroke-linecap:round"/>`;
        s+=`<text x="${f1(X(c.c)-8)}" y="${yy+4}" class="t-xs t-end" style="${on?'fill:var(--good)':''}">${c.l}</text>`});
      s+=`<line x1="${x0}" x2="${x1}" y1="${ry}" y2="${ry}" class="axis" style="stroke:var(--muted);stroke-width:1.5"/>`;
      for(let k=0;k<=9;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ry}" y2="${ry+7}" style="stroke:var(--muted)"/><text x="${f1(X(k))}" y="${ry+22}" class="t-sm t-mid">${k}</text>`;
      s+=`<path d="M${f1(X(v)-8)} ${ry+38}L${f1(X(v)+8)} ${ry+38}L${f1(X(v))} ${ry+28}Z" style="fill:var(--dx)"/>`;
      const lines=N?['7 meets every age cut-off','for generalised joint hypermobility.','That is Criterion 1 of 3 for hEDS:','not a diagnosis of EDS.']
                   :['7 meets every age cut-off for generalised joint hypermobility.','That is Criterion 1 of 3 for hEDS, not a diagnosis of EDS.'];
      if(u>.6)lines.forEach((l,k)=>s+=`<text x="${N?16:20}" y="${ry+70+k*18}" class="t-lbl" style="opacity:${f1(ramp(u,.6,1))}">${l}</text>`);
    }
    /* scoreboard */
    const B=L.sbx,Y=L.sby;
    s+=`<rect x="${B-8}" y="${Y-40}" width="${N?384:236}" height="${N?240:300}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${B}" y="${Y-18}" class="t-sm">SCOREBOARD</text><text x="${L.cL}" y="${Y-18}" class="t-sm t-mid">L</text><text x="${L.cR}" y="${Y-18}" class="t-sm t-mid">R</text>`;
    ITEMS.forEach((itm,k)=>{const yy=Y+k*L.rh,cur=k===i;
      s+=`<text x="${B}" y="${yy+4}" class="t-lbl" style="${cur?'fill:var(--dx)':''};font-size:${N?12:12.5}px">${itm.n}</text>`;
      const cell=(x,c)=>c==null?`<circle cx="${x}" cy="${yy}" r="11" style="fill:none;stroke:var(--line);stroke-width:1.5;stroke-dasharray:3 2"/>`:badge(x,yy,c);
      if(itm.sides.length===2)s+=cell(L.cL,st.cells[k][0])+cell(L.cR,st.cells[k][1]);
      else s+=cell((L.cL+L.cR)/2,st.cells[k][0]);});
    const ty=Y+5*L.rh+(N?8:12);
    s+=`<line x1="${B}" x2="${B+(N?370:222)}" y1="${ty-22}" y2="${ty-22}" style="stroke:var(--line)"/>`;
    s+=`<text x="${B}" y="${ty+4}" class="t-lbl">Total</text><text x="${(L.cL+L.cR)/2}" y="${ty+10}" class="t-mid" style="font:400 28px var(--display);fill:var(--dx)">${st.tot}<tspan class="t-sm" dx="3">/9</tspan></text>`;
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);setSt(p);
    const sideTxt=sd=>{if(i>=5||it.k==='trunk')return '';const pr=sweep(i,t,sd);return pr<=0?'—':it.k==='thumb'?(pr>=1?(it.sides[sd].p?'touches':'gap'):'folding'):Math.round(Math.abs(it.sides[sd].a*ease(pr)))+'°'};
    $('#beRead').innerHTML=i<5?`<span>Manoeuvre <b>${i+1} of 5 · ${it.n}</b></span>${it.k==='trunk'?`<span>Palms <b>${st.cells[4][0]==null?'bending':'flat'}</b></span>`:`<span>Left <b>${sideTxt(0)}</b></span><span>Right <b>${sideTxt(1)}</b></span>`}<span>Running total <b>${st.tot} / 9</b></span>`
      :`<span>Total <b>7 / 9</b></span><span>Cut-offs <b>≥6 · ≥5 · ≥4</b></span><span>Generalised hypermobility <b>met at every age</b></span>`;
    $('#beNote').innerHTML=noteHTML(STEPS[p]);
  }
  const stop=playWire(rg,$('#bePlay'),draw,20000,'%t:player.replay%','beighton');
  const setSt=stepWire($('#beSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= teaching calculator ================= */
  const CI=[{k:'f',n:'Little finger',s:'bends back to 90° or more'},{k:'t',n:'Thumb',s:'touches the forearm'},
    {k:'e',n:'Elbow',s:'10° or more past straight'},{k:'k',n:'Knee',s:'10° or more past straight'}];
  const PQ=['Do you consider yourself double-jointed?',
    'Can you now (or could you ever) place your hands flat on the floor without bending your knees?',
    'Can you now (or could you ever) bend your thumb to touch your forearm?',
    'As a child, did you amuse your friends by contorting your body into strange shapes, or could you do the splits?',
    'As a child or teenager, did your shoulder or kneecap dislocate on more than one occasion?'];
  const saved=store.get('beCalc',null);
  const C=saved&&saved.c?saved:{c:{},pq:[0,0,0,0,0],age:'5',tab:'bs'};
  const btnTxt=(sd,on)=>`${on?'✓ ':''}${sd}${on?'':': no'}`;
  let gh=`<span class="kicker">Manoeuvre</span><span class="kicker">Left</span><span class="kicker">Right</span>`;
  CI.forEach(c=>{gh+=`<div class="lbl">${c.n}<small>${c.s}</small></div>`+['0','1'].map(sd=>{const id=c.k+sd,on=!!C.c[id];
    return `<button class="btn" data-bek="${id}" aria-pressed="${on}" aria-label="${c.n}, ${sd==='0'?'left':'right'}">${btnTxt(sd==='0'?'Left':'Right',on)}</button>`}).join('')});
  gh+=`<div class="lbl">Palms flat<small>knees straight, feet together</small></div><button class="btn span2" data-bek="p" aria-pressed="${!!C.c.p}" aria-label="Palms flat on the floor">${btnTxt('Trunk',!!C.c.p)}</button>`;
  $('#beGrid').innerHTML=gh;
  $('#bePq').innerHTML=PQ.map((q,k)=>`<button class="btn" data-bepq="${k}" aria-pressed="${!!C.pq[k]}"><b>Q${k+1}${C.pq[k]?' ✓':''}</b><span>${q}</span></button>`).join('');
  $('#beAge').value=C.age;
  const cs=$('#beCalcSvg');
  function calc(){
    const score=Object.keys(C.c).filter(k=>C.c[k]).length,cut=+C.age,pq=C.pq.reduce((a,b)=>a+b,0);
    store.set('beCalc',C);
    const N=vb(cs,'720 120','400 170');let s='';
    const x0=N?24:30,x1=N?376:450,ry=N?52:58,X=k=>lerp(x0,x1,k/9);
    s+=`<text x="${x0}" y="${N?16:18}" class="t-sm">BEIGHTON TOTAL</text>`;
    s+=`<rect x="${f1(X(cut)-((x1-x0)/18))}" y="${ry-14}" width="${f1(X(9)-X(cut)+(x1-x0)/18)}" height="14" rx="4" style="fill:var(--good-soft)"/>`;
    if(cut>0)s+=`<rect x="${f1(X(cut-1)-(x1-x0)/18)}" y="${ry-14}" width="${f1((x1-x0)/9)}" height="14" rx="4" style="fill:var(--warn-soft)"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${ry}" y2="${ry}" style="stroke:var(--muted);stroke-width:1.5"/>`;
    for(let k=0;k<=9;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ry}" y2="${ry+6}" style="stroke:var(--muted)"/><text x="${f1(X(k))}" y="${ry+20}" class="t-sm t-mid" style="${k===score?'fill:var(--ink);font-weight:700':''}">${k}</text>`;
    s+=`<text x="${f1(X(cut))}" y="${ry-20}" class="t-xs t-mid" style="fill:var(--good)">cut-off ≥${cut}</text>`;
    s+=`<path d="M${f1(X(score)-8)} ${ry+38}L${f1(X(score)+8)} ${ry+38}L${f1(X(score))} ${ry+28}Z" style="fill:var(--dx)"/>`;
    const px=N?24:520,py=N?132:40;
    s+=`<text x="${px}" y="${N?py-14:18}" class="t-sm">5PQ "YES" ANSWERS</text>`;
    for(let k=0;k<5;k++){const cx=px+10+k*(N?30:34),on=k<pq;s+=`<circle cx="${cx}" cy="${py+12}" r="10" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:${k<2?'var(--dx)':'var(--muted)'};stroke-width:1.5"/>`}
    s+=`<text x="${px+(N?165:180)}" y="${py+16}" class="t-xs" style="${pq>=2?'fill:var(--good)':''}">${pq>=2?'positive (2+)':'2 needed'}</text>`;
    cs.innerHTML=s;
    let v,cls;
    if(score>=cut){cls='yes';v=`Score ${score} of 9 reaches the cut-off of ${cut}: the generalised joint hypermobility part (Criterion 1) of the 2017 hEDS criteria is met.`}
    else if(score===cut-1&&pq>=2){cls='yes';v=`Score ${score} is one point below ${cut}, and the questionnaire has ${pq} "yes" answers: under the 2017 rule this still meets Criterion 1.`}
    else if(score===cut-1){cls='maybe';v=`Score ${score} is one point below ${cut}. The 2017 rule lets a positive five-part questionnaire (2 or more "yes") count: open the 5PQ tab.`}
    else {cls='no';v=`Score ${score} is below the cut-off of ${cut}: Criterion 1 is not met on the Beighton score.`}
    const ageNote=cut===6?`<p>The paediatric working group proposes that children should not be assessed with the 2017 hEDS criteria, or diagnosed with hEDS, until they are biologically mature; it uses a score of 6 or more to define generalised hypermobility in children. [[Tofts2023]]</p>`:cut===4?`<p>Scores fall with age: in one dataset the chance of meeting the cut-off fell by 5.5% per year, which is why the cut-off drops after 50. [[Malek2021C]]</p>`:'';
    const hist=score<cut-1&&pq>=2?`<p>A negative score on examination with a positive questionnaire is what the 2017 framework calls <b>historical</b> joint hypermobility. With symptoms, that can fit historical HSD: see <a href="#hsd" data-go="hsd">hEDS or HSD?</a> [[Carroll2023]]</p>`:'';
    $('#beCalcNote').innerHTML=`<div class="kicker">Teaching calculator</div><div class="be-big"><span class="big-num">${score}</span><span>of 9 · cut-off ≥${cut} · 5PQ ${pq} of 5</span></div><div class="verdict ${cls}">${v}</div>${ageNote}${hist}
      <p>Generalised joint hypermobility on its own is common and is not a disease. A full hEDS assessment also needs Criteria 2 and 3: see <a href="#criteria" data-go="criteria">the 2017 hEDS criteria</a>. [[Castori2017,Fairweather2025]]</p>
      <div class="pt"><b>%t:note.plain%</b>This shows how the published rule adds up. It is not an examination and cannot tell you whether you have EDS or HSD; bring questions to a clinician.</div>`;
  }
  $('#beGrid').addEventListener('click',e=>{const b=e.target.closest('[data-bek]');if(!b)return;const id=b.dataset.bek;C.c[id]=!C.c[id];
    b.setAttribute('aria-pressed',C.c[id]);b.textContent=id==='p'?btnTxt('Trunk',C.c[id]):btnTxt(id[1]==='0'?'Left':'Right',C.c[id]);calc()});
  $('#bePq').addEventListener('click',e=>{const b=e.target.closest('[data-bepq]');if(!b)return;const k=+b.dataset.bepq;C.pq[k]=C.pq[k]?0:1;
    b.setAttribute('aria-pressed',!!C.pq[k]);b.querySelector('b').textContent=`Q${k+1}${C.pq[k]?' ✓':''}`;calc()});
  $('#beAge').addEventListener('change',e=>{C.age=e.target.value;calc()});
  $('#beReset').addEventListener('click',()=>{C.c={};C.pq=[0,0,0,0,0];
    $$('[data-bek]').forEach(b=>{b.setAttribute('aria-pressed','false');const id=b.dataset.bek;b.textContent=id==='p'?btnTxt('Trunk',false):btnTxt(id[1]==='0'?'Left':'Right',false)});
    $$('[data-bepq]').forEach((b,k)=>{b.setAttribute('aria-pressed','false');b.querySelector('b').textContent=`Q${k+1}`});calc()});
  function tab(k){C.tab=k;$$('[data-betab]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.betab===k));$('#bePaneBs').hidden=k!=='bs';$('#bePanePq').hidden=k!=='pq'}
  $$('[data-betab]').forEach(b=>b.addEventListener('click',()=>{tab(b.dataset.betab);calc()}));
  tab(C.tab||'bs');calc();

  /* ================= population icon array ================= */
  const POP=[
    {id:'c47',b:'Ages 4–7',sets:[{n:'Children aged 4–7',p:64.6}],cut:'Beighton ≥4',
     txt:`A review lists generalised joint hypermobility (score 4 or more) in 64.6% of children aged 4–7. Young children are the most flexible group. [[Malek2021C]]`},
    {id:'c10',b:'Age 10',sets:[{n:'Children aged 10',p:35.6}],cut:'Beighton ≥4',
     txt:`At age 10 the same review lists 35.6%. Flexibility falls quickly through childhood. [[Malek2021C]]`},
    {id:'c12',b:'Ages 12–13',sets:[{n:'Children aged 12–13',p:9.4}],cut:'Beighton ≥4',
     txt:`At ages 12–13 the review lists 9.4%. In 207 Swedish 11-year-olds the median score was 1, and 6 or more sat near the 95th percentile, which supports the paediatric cut-off of 6. [[Malek2021C,Glans2025]]`},
    {id:'t13',b:'Ages 13–19',sets:[{n:'Teenagers 13–19',p:11.7}],cut:'Beighton ≥4',
     txt:`At ages 13–19 the review lists 11.7%. Studies differ in method and cut-off, so the steps between ages are rough. [[Malek2021C]]`},
    {id:'uk',b:'UK 14-year-olds by sex',sets:[{n:'Girls',p:27.5},{n:'Boys',p:10.6}],cut:'Beighton ≥4',
     txt:`In 6,022 UK 14-year-olds (the ALSPAC cohort), 27.5% of girls and 10.6% of boys scored 4 or more. GJH is more common in females at every age, and the gap widens around 14. [[Clinch2011,Malek2021C]]`},
    {id:'us',b:'US students 17–26 by sex',sets:[{n:'Women',p:36.7},{n:'Men',p:13.7}],cut:'Beighton ≥5',
     txt:`Among 267 US college students aged 17–26, with a cut-off of 5, 36.7% of women and 13.7% of men met generalised joint hypermobility (26.2% overall). [[Russek2016]]`},
    {id:'o70',b:'Over 70',sets:[{n:'People over 70',p:0}],cut:'none scored above 2',
     txt:`In one population dataset the chance of meeting the cut-off fell by 5.5% for each extra year of age, and among 200 people over 70 nobody scored above 2. [[Malek2021C]]`}];
  const SERIES=[{l:'4–7',p:64.6,id:'c47'},{l:'10',p:35.6,id:'c10'},{l:'12–13',p:9.4,id:'c12'},{l:'13–19',p:11.7,id:'t13'},{l:'>70',p:0,id:'o70'}];
  let pop='uk';
  $('#bePopBtns').innerHTML=`<span class="kicker">Population</span>`+POP.map(o=>`<button class="btn" data-bepop="${o.id}" aria-pressed="${o.id===pop}">${o.b}</button>`).join('');
  const ps=$('#bePopSvg');
  function drawPop(){const N=vb(ps,'720 300','400 560'),o=POP.find(q=>q.id===pop);let s='';
    const two=o.sets.length===2,cw=N?18:20,chh=N?21:23;
    o.sets.forEach((st,k)=>{const ox=N?(two?(k?208:12):100):(two?(k?236:16):16),oy=N?30:34,fill=Math.round(st.p);
      s+=`<text x="${ox}" y="${oy-12}" class="t-lbl">${st.n}</text>`;
      for(let r=0;r<10;r++)for(let c=0;c<10;c++){const idx=r*10+c,on=idx<fill;
        s+=person(ox+c*cw,oy+r*chh,N?16:18,on?'var(--dx)':'var(--line)')}
      s+=`<text x="${ox}" y="${oy+10*chh+22}" style="font:400 24px var(--display);fill:var(--dx)">${st.p}%</text><text x="${ox+(N?66:74)}" y="${oy+10*chh+20}" class="t-xs">≈ ${fill} in 100</text>`});
    if(!two&&!N){s+=`<text x="250" y="80" class="t-sm">${o.cut.toUpperCase()}</text><text x="250" y="122" style="font:400 40px var(--display);fill:var(--dx)">${o.sets[0].p}%</text>`;
      s+=`<text x="250" y="148" class="t-xs">about ${Math.round(o.sets[0].p)} in every 100</text>`}
    else s+=`<text x="${N?12:16}" y="${N?296:296}" class="t-xs">${o.cut}</text>`;
    /* review series by age */
    const gx=N?40:490,gy=N?330:40,gw=N?330:210,gh=N?190:200,bw=gw/SERIES.length;
    s+=`<text x="${gx-(N?28:10)}" y="${gy-12}" class="t-sm">REVIEW SERIES · BEIGHTON ≥4 BY AGE</text>`;
    [0,25,50,75].forEach(v=>{const y=gy+gh-gh*v/75;s+=`<line x1="${gx}" x2="${gx+gw}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${gx-4}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    SERIES.forEach((q,k)=>{const h=gh*q.p/75,x=gx+k*bw+bw*.18,on=q.id===pop;
      s+=`<rect x="${f1(x)}" y="${f1(gy+gh-h)}" width="${f1(bw*.64)}" height="${f1(Math.max(h,1.5))}" rx="3" style="fill:${on?'var(--dx)':'var(--dx-soft)'};stroke:var(--dx);stroke-width:${on?1.5:.6}"/>`;
      s+=`<text x="${f1(x+bw*.32)}" y="${f1(gy+gh-h-5)}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.p}</text><text x="${f1(x+bw*.32)}" y="${gy+gh+15}" class="t-xs t-mid">${q.l}</text>`});
    s+=`<text x="${gx+gw/2}" y="${gy+gh+32}" class="t-xs t-mid">age (years); ">70": nobody above 2</text>`;
    ps.innerHTML=s;
    $('#bePopNote').innerHTML=`<div class="kicker">${o.cut}</div><h4>${o.sets.map(q=>q.n+': '+q.p+'%').join(' · ')}</h4><p>${o.txt}</p><div class="pt"><b>%t:note.plain%</b>Being bendy is common, especially in children and girls, and on its own it is not a disease. [[Clinch2011,Castori2017]]</div><div class="hook"><b>%t:note.hook%</b>Population statistics from different studies, cut-offs and methods: compare within a study, not across them. [[Malek2021C,Remvig2007]]</div>`}
  $('#bePopBtns').addEventListener('click',e=>{const b=e.target.closest('[data-bepop]');if(!b)return;pop=b.dataset.bepop;$$('[data-bepop]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.bepop===pop));drawPop()});
  drawPop();
  const prevR=redraws.beighton;redraws.beighton=()=>{prevR&&prevR();calc();drawPop()};
};
