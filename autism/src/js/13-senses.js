/* =============== 1.3 The sensory world =============== */
/* One schematic day. Six input lanes (what the surroundings give, and what registers), one load curve
   against a threshold, and a person whose state follows the load. All numbers in the model are
   illustrative; the facts in the notes come from the cited studies. */
const SE_LANES=[
  {k:'sound',n:'Sound',s:'Sound',col:'var(--sense)'},
  {k:'light',n:'Light',s:'Light',col:'var(--gold)'},
  {k:'touch',n:'Touch',s:'Touch',col:'var(--sense)'},
  {k:'smell',n:'Smell',s:'Smell',col:'var(--gold)'},
  {k:'crowd',n:'Crowds',s:'Crowd',col:'var(--sense)'},
  {k:'intero',n:'Body signals',s:'Body',col:'var(--neuro)'}];
/* scenes of the day: a..b on the 0..1 timeline, x = input per lane */
const SE_SC=[
  {a:0,b:.12,n:'Wake up',s:'Wake',x:[.15,.2,.25,.1,0,.3]},
  {a:.12,b:.27,n:'Bus',s:'Bus',x:[.6,.35,.5,.35,.7,.2]},
  {a:.27,b:.47,n:'Classroom or office',s:'Class',x:[.55,.7,.3,.15,.5,.25]},
  {a:.47,b:.62,n:'Lunch hall',s:'Lunch',x:[.95,.5,.5,.9,.95,.3]},
  {a:.62,b:.78,n:'Shop',s:'Shop',x:[.7,.8,.35,.5,.7,.25]},
  {a:.78,b:1,n:'Home',s:'Home',x:[.1,.15,.1,.15,0,.2]}];
/* single events: a lane spike, or an unexpected change (ch) that a warning can soften */
const SE_EV=[
  {u:.19,lane:0,a:.35,w:.008,lb:'brakes screech'},
  {u:.40,ch:1,a:.3,w:.016,lb:'room change, no warning'},
  {u:.555,lane:0,a:.45,w:.008,lb:'trays crash'},
  {u:.70,lane:2,a:.55,w:.006,lb:'bumped by a trolley'}];
/* profiles: w = how strongly each lane registers; th = overload threshold; chg = sensitivity to change */
const SE_PROF={
  hyper:{n:'Hyper-reactive',w:[1.15,1,1,1,.9,.7],th:.72,chg:1},
  hypo:{n:'Hypo-reactive',w:[.35,.35,.3,.3,.35,.15],th:.9,chg:.5},
  seek:{n:'Sensory-seeking',w:[.55,.6,.5,.5,.5,.4],th:.86,chg:.6}};
const SE_SUP=[
  {k:'ear',n:'Ear defenders'},{k:'glasses',n:'Sunglasses or a cap'},{k:'quiet',n:'Quiet space at lunch'},{k:'warn',n:'Warning before changes'}];
/* piecewise-linear input for lane i at time u, before supports */
function seRaw(i,u){const K=[];SE_SC.forEach(S=>{K.push([S.a+(S.a?.012:0),S.x[i]],[S.b-(S.b<1?.012:0),S.x[i]])});
  let v=K[0][1];for(let k=1;k<K.length;k++)if(u<=K[k][0]){const A=K[k-1],B=K[k];v=A[1]+(B[1]-A[1])*clamp((u-A[0])/Math.max(1e-6,B[0]-A[0]));break}else v=K[k][1];
  if(i===5)v+=.32*bump(u,.34,.5)+.3*bump(u,.66,.77);/* hunger before lunch, needing the toilet in the shop */
  v*=.86+.14*Math.sin(u*97+i*1.7)*Math.sin(u*31+i);
  SE_EV.forEach(E=>{if(E.lane===i)v+=E.a*Math.exp(-Math.pow((u-E.u)/E.w,2))});
  return clamp(v,0,1.2)}
function seChange(u){let c=0;SE_EV.forEach(E=>{if(E.ch)c+=E.a*Math.exp(-Math.pow((u-E.u)/E.w,2))});
  SE_SC.forEach((S,k)=>{if(k)c+=.1*Math.exp(-Math.pow((u-S.a)/.01,2))});return c}
/* what reaches the person once supports are in place */
function seEnv(i,u,sup){let v=seRaw(i,u);
  if(sup.ear&&i===0)v*=.45;
  if(sup.glasses&&i===1)v*=.5;
  if(sup.quiet&&u>.49&&u<.62&&i<5)v*=.45;
  return v}
/* the day simulated once per setting: load L, energy E, crossing time, seeking moments */
function seSim(pk,sup){const P=SE_PROF[pk],N=600,L=[],E=[],I=[],SK=[];let l=.12,e=1,cross=null,seek=0;
  for(let k=0;k<=N;k++){const u=k/N;let inp=0;for(let i=0;i<6;i++)inp+=P.w[i]*seEnv(i,u,sup);
    inp=inp/4.5+P.chg*seChange(u)*(sup.warn?.25:1);
    /* a sensory seeker adds movement and touch when things are quiet, which helps regulate */
    let sk=0;if(pk==='seek'&&l<.5*P.th&&Math.sin(u*70)>.55)sk=1;SK.push(sk);if(sk)inp-=.08;
    I.push(inp);
    l+=inp>l?(inp-l)*.032:(inp-l)*.004*(u>.78?2.4:1);
    if(cross==null&&l>=P.th)cross=u;
    if(cross!=null&&u>=cross&&u<cross+.07)l=Math.max(l,P.th+.07*bump(u,cross,cross+.07));
    if(cross!=null&&Math.abs(u-(cross+.07))<.5/N)l=Math.max(.3,l-.22);
    e-=l*l*2.1/N;if(cross!=null&&Math.abs(u-(cross+.07))<.5/N)e-=.22;if(u>.8)e+=2.2*(1-l)/N;e=clamp(e,.03,1);
    L.push(l);E.push(e)}
  return {L,E,I,SK,cross,th:P.th,N}}
function seState(S,pk,resp,t){const k=Math.round(t*S.N),l=S.L[k],c=S.cross;
  if(c!=null&&t>=c){if(t<c+.012)return{k:'over',n:'Overload',d:'too much at once'};
    if(t<c+.07)return resp==='shut'?{k:'shut',n:'Shutdown',d:'goes still, withdraws'}:{k:'melt',n:'Meltdown',d:'out of control'};
    if(t<.78)return{k:'drained',n:'Drained',d:'low energy, on edge'};
    return l>.32?{k:'rec',n:'Recovering',d:'quiet, no demands'}:{k:'calm',n:'Calm again',d:'load back down'}}
  if(pk==='hypo'){const m=SE_MISS.find(M=>Math.abs(t-M.u)<.035);if(m)return{k:'miss',n:'Cue missed',d:m.lb}}
  if(pk==='seek'&&S.SK[k])return{k:'seek',n:'Seeking input',d:'moves, fidgets, stims'};
  const r=l/S.th;return r<.62?{k:'calm',n:'Calm',d:'comfortable'}:r<.86?{k:'busy',n:'Busy',d:'coping, using energy'}:{k:'edge',n:'Near the limit',d:'needs a break soon'}}
const SE_MISS=[{u:.44,lane:5,lb:'hunger not noticed'},{u:.70,lane:2,lb:'a bump, no sign of pain'},{u:.73,lane:5,lb:'needs the toilet'}];

function seSteps(pk,S,resp){const P=SE_PROF[pk],crossed=S.cross!=null;
  const cw=crossed?(S.cross<.47?'classroom':S.cross<.62?'lunch hall':'shop'):'';
  const st=[
  {from:0,at:.06,k:'07:00 · Home',t:'Six channels, one nervous system',
   txt:`DSM-5-TR criterion B4, paraphrased: being much more or much less reactive to sensory input, or unusually interested in sensory aspects of the surroundings. Its examples include seeming indifferent to pain or temperature, strong reactions to certain sounds or textures, lots of smelling or touching of objects, and fascination with lights or movement. [[APA2022]] DSM-5 placed these differences in the restricted and repetitive behaviours domain to reflect how common they are. [[Lord2020NRDP]] Each lane is one channel; "body signals" is interoception, the sense of the body's inner state. The thin line is what the surroundings give; the filled wave is what registers for this profile.`,
   pt:`Each wavy line is one sense. The bigger the filled wave, the more that sense is taking in right now.`,
   hook:`Sensory hyper- or hypo-reactivity is criterion B4, inside domain B (restricted, repetitive behaviours), not domain A.`},
  {from:.12,at:.2,k:'07:45 · The bus',t:'Noise, jostling, smells',
   txt:`<span class="ev est">Established</span> A meta-analysis of 67 studies put current hyperacusis (everyday sounds feeling too loud or painful) in autistic people at 41.42%, and lifetime hyperacusis at 60.58%; with objective or observational measures, current prevalence was 27.30%. [[Williams2021Hyperacusis]] <span class="ev hyp">Hypothesis</span> A review proposes splitting decreased sound tolerance into hyperacusis, misophonia (learned aversion to specific sounds) and phonophobia (fear of sound). [[Williams2021DST]] <span class="ev early">Early evidence</span> Autistic adults in participatory focus groups named public transport among commonly disabling places. [[MacLennan2023]]`,
   pt:`About 4 in 10 autistic people find everyday sounds too loud or painful right now, and about 6 in 10 do at some point in life.`,
   hook:`Hyperacusis in autism: about 41% current, about 61% lifetime (meta-analysis, Williams 2021).`},
  {from:.27,at:.39,k:'09:00 · Classroom or office',t:'It does not fade into the background',
   txt:`<span class="ev early">Early evidence</span> In an fMRI study of 19 autistic and 19 non-autistic youth, mildly aversive sounds and touch produced stronger responses in primary sensory cortex and the amygdala in autistic youth. Youth with over-responsivity showed reduced habituation: the response did not fade with repetition. [[Green2015SOR]] More than half of autistic youth have sensory over-responsivity, and it often co-occurs with anxiety; which causes which is still open. [[Green2015SOR,GreenBenSasson2010]] Watch the load: it climbs with each input and falls only slowly. The "!" is a change of plan with no warning.`,
   pt:`For many autistic people a buzzing light or a ticking clock never fades into the background. It stays loud all day, and the strain adds up.`,
   hook:`Sensory over-responsivity: stronger primary-sensory and amygdala responses and reduced habituation (Green 2015).`},
  crossed?
  {from:.47,at:Math.min(.6,S.cross+.035),k:`Over the threshold · ${cw}`,t:resp==='shut'?'Overload, then shutdown':'Overload, then meltdown',
   txt:`<span class="ev early">Early evidence</span> In interviews with 32 autistic adults, meltdowns were described as being overwhelmed by information, senses, and social and emotional stress, with extreme emotion, trouble thinking and remembering, a sense of "not being themselves", and a release of pent-up emotion. [[Lewis2023Meltdown]] Autistic youth described meltdowns as "feeling out of control" and shutdowns as "feeling frozen": more inward, with withdrawal from the surroundings, ranging from mild to severe. [[Phung2021]] Switch between <b>Meltdown</b> and <b>Shutdown</b> to see both. Then turn supports on and watch the curve.`,
   pt:`A meltdown is a response to overload, not bad behaviour. A shutdown is a quieter version, where the person goes still or withdraws.`,
   hook:`Meltdown: an involuntary response to overload. Shutdown: inward, withdrawn, "feeling frozen" (Phung 2021).`}:
  pk==='hypo'?
  {from:.47,at:.5,k:'12:30 · Lunch hall',t:'High threshold: little registers',
   txt:`<span class="ev est">Established model</span> In Dunn's model, low registration is a high neurological threshold with passive regulation: cues are missed. [[Dunn2001]] The hall is just as loud (thin line), but little of it registers, so the load stays low. The risk here is different: hunger, needing the toilet or an injury can go unnoticed. One DSM-5-TR example of B4 is apparent indifference to pain or temperature. [[APA2022]] In the 2009 meta-analysis, under-responsivity showed the largest difference between autistic and typical groups. [[BenSasson2009]]`,
   pt:`Some autistic people hardly notice noise, pain, hunger or cold. They are not ignoring you: the signal does not get through.`,
   hook:`Dunn: low registration = high threshold + passive strategy. Watch for missed pain, hunger and temperature.`}:
  {from:.47,at:.53,k:'12:30 · Lunch hall',t:pk==='seek'?'Seeking keeps the balance':'Supports keep the load under the line',
   txt:pk==='seek'?`<span class="ev est">Established model</span> In Dunn's model, sensation seeking is a high threshold with an active strategy: the person adds input. [[Dunn2001]] The green marks are moments of movement, touch or stimming. <span class="ev early">Early evidence</span> In interviews with 32 autistic adults, stimming served as self-regulation, to soothe or to express intense emotion. [[Kapp2019]] A seeker can still be overloaded: every person has some amount of each pattern. [[Dunn2001]]`
     :`The same hall, with supports on. The thin line still shows how loud the room is; the filled waves show what reaches the person. <span class="ev early">Early evidence</span> In a single-subject study of six children with autism and hyperacusis, noise-attenuating headphones lowered skin-conductance markers of arousal. In parent and teacher interviews, headphones increased participation at home, at school and in the community. [[Pfeiffer2019EDA,Pfeiffer2019Participation]] Lunch in a quiet room and warning before a change do the rest.`,
   pt:pk==='seek'?`Rocking, bouncing or fiddling with something can be how a person keeps themselves steady.`:`Changing the room, not the person, can keep the day under the limit.`,
   hook:pk==='seek'?`Dunn: seeking = high threshold + active strategy. Stimming often serves self-regulation (Kapp 2019).`:`Supports work on the input side: less noise, softer light, warning before changes, a place to recover.`},
  {from:.62,at:.71,k:'15:30 · The shop',t:crossed?'Drained, still on edge':'Still coping',
   txt:(crossed?`After an episode, energy is low and the threshold feels closer. `:'')+`<span class="ev early">Early evidence</span> Autistic adults named supermarkets, eateries, town centres, public transport and health-care settings as commonly disabling. [[MacLennan2023]] When a meltdown was coming, adults tried to avoid triggers or to be alone, to prevent harm to their bodies, emotions and relationships. [[Lewis2023Meltdown]] Youth said compassion and collaboration from trusted adults help, while demands such as eye contact during distress make things worse. [[Phung2021]]`,
   pt:crossed?`After a meltdown or shutdown, people need time and calm, not questions or a lecture.`:`Bright lights, music and crowds in a shop can push a full day over the edge.`,
   hook:`During distress: fewer demands, no insistence on eye contact, a calm trusted adult (Phung 2021).`},
  {from:.78,at:.92,k:'18:00 · Home',t:'Recovery',
   txt:`At home the inputs drop and the load falls, slowly. <span class="ev early">Early evidence</span> Autistic adults in participatory focus groups identified six principles of enabling spaces: sensoryscape, space, predictability, understanding, adjustments and recovery. [[MacLennan2023]] Autistic adults describe autistic burnout as chronic exhaustion, loss of skills and reduced tolerance to stimuli, arising from accumulated stressors and barriers to relief. [[Raymaker2020]] The energy battery in the figure is a teaching picture of that idea, not a measurement.`,
   pt:`Rest in a calm place lets the load fall again. Recovery time is part of the day, not a luxury.`,
   hook:`Enabling spaces (MacLennan 2023): sensoryscape, space, predictability, understanding, adjustments, recovery.`}];
  return st}

inits.senses=()=>{
  const svg=$('#seSvg'),rg=$('#seT');let pk='hyper',resp='melt';const sup={ear:false,glasses:false,quiet:false,warn:false};
  let S=seSim(pk,sup),RAW=seSim(pk,{}),STEPS=seSteps(pk,S,resp),setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 600');
    const G=N?{x0:52,x1:394,sT:4,sB:28,tk:32,l0:62,lh:30,p0:256,p1:340,ft:592}:{x0:104,x1:560,sT:4,sB:28,tk:32,l0:62,lh:32,p0:266,p1:360,ft:394};
    const X=u=>lerp(G.x0,G.x1,u),xt=X(t),P=SE_PROF[pk],k=Math.round(t*S.N);
    const st=seState(S,pk,resp,t);let s=`<defs><clipPath id="seCA"><rect x="${G.x0}" y="0" width="${G.x1-G.x0}" height="${f1(lerp(G.p1,G.p0,P.th/1.1))}"/></clipPath><clipPath id="seCB"><rect x="${G.x0}" y="${f1(lerp(G.p1,G.p0,P.th/1.1))}" width="${G.x1-G.x0}" height="400"/></clipPath></defs>`;
    /* scene strip */
    SE_SC.forEach((C,i)=>{const on=t>=C.a&&t<(i===5?1.01:C.b);s+=`<rect x="${f1(X(C.a))}" y="${G.sT}" width="${f1(X(C.b)-X(C.a)-1)}" height="${G.sB-G.sT}" rx="4" style="fill:${on?'var(--brand-soft)':'var(--panel-2)'};stroke:${on?'var(--brand)':'none'}"/>`;
      s+=`<text x="${f1((X(C.a)+X(C.b))/2)}" y="${G.sB-8}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${N||C.n.length*5.6>X(C.b)-X(C.a)-6?C.s:C.n}</text>`});
    s+=`<text x="${G.x0-8}" y="${G.sB-8}" class="t-xs t-end">${N?'DAY':'THE DAY'}</text>`;
    /* track: change markers and the walking person */
    SE_EV.forEach(E=>{if(!E.ch||t<E.u-.005)return;s+=`<text x="${f1(X(E.u))}" y="${G.tk+20}" class="t-lbl t-mid" style="fill:${sup.warn?'var(--muted)':'var(--bad)'}">!</text>`;
      if(!N)s+=`<text x="${f1(X(E.u)+8)}" y="${G.tk+19}" class="t-xs">${sup.warn?'change, warned ahead':E.lb}</text>`});
    const pc={calm:'var(--calm)',busy:'var(--gold)',edge:'var(--warn)',over:'var(--bad)',melt:'var(--bad)',shut:'var(--muted)',drained:'var(--warn)',rec:'var(--calm)',miss:'var(--neuro)',seek:'var(--rx)'}[st.k];
    s+=person(xt,G.tk,26,pc);
    /* lanes */
    SE_LANES.forEach((Ln,i)=>{const yc=G.l0+i*G.lh+G.lh/2,w=Math.max(.5,xt-G.x0),amp=G.lh*.42;
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(yc)}" y2="${f1(yc)}" class="grid"/><text x="${G.x0-8}" y="${f1(yc+4)}" class="t-sm t-end" style="fill:var(--ink)">${N?Ln.s:Ln.n}</text>`;
      if(t>.002){const fq=Math.max(1,30*t),ph=t*6;
        s+=`<g style="opacity:.55">${wave(G.x0,yc,w,amp,{freq:fq,phase:ph,env:u=>clamp(seRaw(i,u*t)/1.05),col:'var(--muted)',sw:1})}</g>`;
        s+=wave(G.x0,yc,w,amp,{freq:fq,phase:ph,env:u=>clamp(P.w[i]*seEnv(i,u*t,sup)/1.05),col:Ln.col,fill:true,sw:1.5})}
      if(pk==='seek'&&i===2)for(let q=0;q<S.N*t;q+=6)if(S.SK[q])s+=`<rect x="${f1(X(q/S.N)-1.5)}" y="${f1(yc-amp)}" width="3" height="${f1(2*amp)}" rx="1.5" style="fill:var(--rx);opacity:.75"/>`;
      if(pk==='hypo')SE_MISS.forEach(M=>{if(M.lane!==i||t<M.u)return;const mx=X(M.u);s+=`<circle cx="${f1(mx)}" cy="${f1(yc)}" r="6" style="fill:none;stroke:var(--neuro);stroke-width:1.6;stroke-dasharray:2 2"/>`;
        const ed=N?M.u>.5:M.u>.72;if(!N||M.u<.72)s+=`<text x="${f1(mx+(ed?-9:9))}" y="${f1(yc-amp+(ed?-1:4))}" class="t-xs${ed?' t-end':''}" style="fill:var(--neuro)">${M.lb}</text>`})});
    if(pk==='seek'&&t>.15&&!N)s+=`<text x="${f1(X(.02))}" y="${f1(G.l0+2*G.lh+5)}" class="t-xs" style="fill:var(--rx)">green: seeks movement or touch</text>`;
    /* load panel */
    const Y=v=>lerp(G.p1,G.p0,clamp(v/1.1)),ty=Y(P.th);
    s+=`<rect x="${G.x0}" y="${G.p0}" width="${G.x1-G.x0}" height="${G.p1-G.p0}" rx="4" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${G.x0-8}" y="${G.p0+14}" class="t-sm t-end" style="fill:var(--ink)">Load</text>`;
    if(S.cross!=null&&t>=S.cross){const a=X(S.cross),b=X(Math.min(t,S.cross+.07));s+=`<rect x="${f1(a)}" y="${G.p0}" width="${f1(b-a)}" height="${G.p1-G.p0}" style="fill:var(--bad);opacity:.1"/>`;
      if(t>S.cross+.03)s+=`<text x="${f1((a+X(S.cross+.07))/2)}" y="${G.p1-6}" class="t-xs t-mid" style="fill:var(--bad)">${resp==='shut'?'shutdown':'meltdown'}</text>`}
    if(k>1){let d='';for(let q=0;q<=k;q+=2)d+=(q?'L':'M')+f1(X(q/S.N))+' '+f1(Y(S.L[q]));const ar=d+`L${f1(X(k/S.N))} ${G.p1}L${G.x0} ${G.p1}Z`;
      s+=`<path d="${ar}" clip-path="url(#seCB)" style="fill:var(--sense);opacity:.28"/><path d="${ar}" clip-path="url(#seCA)" style="fill:var(--bad);opacity:.4"/>`;
      if(Object.values(sup).some(Boolean)){let g='';for(let q=0;q<=k;q+=3)g+=(q?'L':'M')+f1(X(q/S.N))+' '+f1(Y(RAW.L[q]));s+=`<path d="${g}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`}
      s+=`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linejoin:round"/>`}
    s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${G.x1-4}" y="${f1(ty-5)}" class="t-xs t-end" style="fill:var(--bad)">${N?'threshold':'overload threshold for this profile'}</text>`;
    if(Object.values(sup).some(Boolean)&&!N)s+=`<text x="${G.x0+6}" y="${G.p0+13}" class="t-xs">dashed: the same day without supports</text>`;
    s+=`<line x1="${f1(xt)}" x2="${f1(xt)}" y1="${G.sB+2}" y2="${G.p1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    /* the person */
    const F=N?{fx:74,fy:410,fr:40,tx:136,ty:396,dx:110,dy:540,bx:290,by:536}:{fx:645,fy:96,fr:38,tx:645,ty:168,dx:645,dy:268,bx:645,by:346};
    const melt=st.k==='melt'||st.k==='over',shut=st.k==='shut';
    if(melt){for(let q=0;q<10;q++){const a=q/10*2*Math.PI+t*40,r1=F.fr*1.22,r2=F.fr*(1.45+.12*Math.sin(t*90+q));
      s+=`<path d="M${f1(F.fx+Math.cos(a)*r1)} ${f1(F.fy+Math.sin(a)*r1)}L${f1(F.fx+Math.cos(a+.08)*r2)} ${f1(F.fy+Math.sin(a+.08)*r2)}" style="stroke:var(--bad);stroke-width:2.2;stroke-linecap:round"/>`}}
    if(shut)s+=`<circle cx="${F.fx}" cy="${F.fy}" r="${f1(F.fr*1.3)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-dasharray:3 4"/>`;
    const mouth={calm:'smile',busy:'flat',edge:'wavy',over:'wavy',melt:'open',shut:'flat',drained:'flat',rec:'flat',miss:'smile',seek:'smile'}[st.k];
    s+=`<g style="opacity:${shut?.6:1}">${face(F.fx,F.fy,F.fr,{mouth,brows:['edge','over','melt','drained'].includes(st.k)?'tense':'calm',gaze:shut?90:st.k==='miss'?0:null,ear:sup.ear})}</g>`;
    if(sup.glasses)[-1,1].forEach(q=>s+=`<rect x="${f1(F.fx+q*F.fr*.36-F.fr*.22)}" y="${f1(F.fy-F.fr*.12)}" width="${f1(F.fr*.44)}" height="${f1(F.fr*.28)}" rx="${f1(F.fr*.1)}" style="fill:var(--ink);opacity:.82"/>`);
    if(st.k==='miss')s+=bubble(F.fx+F.fr*.5,F.fy-F.fr*1.9,30,22,{text:'?',tail:'left',think:true});
    s+=`<text x="${F.tx}" y="${F.ty}" class="t-big${N?'':' t-mid'}" style="fill:${pc}">${st.n}</text><text x="${F.tx}" y="${F.ty+16}" class="t-xs${N?'':' t-mid'}">${st.d}</text>`;
    if(N)s+=`<text x="${F.tx}" y="${F.ty+34}" class="t-xs">${P.n} · ${SE_SC.find((C,i)=>t>=C.a&&(t<C.b||i===5)).n}</text>`;
    s+=dial(F.dx,F.dy,N?44:42,clamp(S.L[k]/1.1),{th:P.th/1.1,label:'load · tick = limit'});
    s+=dial(F.bx,F.by,N?42:34,S.E[k],{battery:true,label:'energy'});
    s+=`<text x="${N?8:8}" y="${G.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative day, not a measurement</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);$('#seNote').innerHTML=noteHTML(STEPS[ph]);
    $('#seRead').innerHTML=`<span>profile <b>${P.n}</b></span><span>now <b>${st.n.toLowerCase()}</b></span><span>load <b>${Math.round(S.L[k]/P.th*100)}%</b> of threshold</span><span>peak today <b>${Math.round(Math.max(...S.L)/P.th*100)}%</b></span><span>supports <b>${SE_SUP.filter(x=>sup[x.k]).length}</b> of 4</span>`;
  }
  const stop=playWire(rg,$('#sePlay'),draw,30000,'%t:player.replay%','senses');
  function rebuild(){S=seSim(pk,sup);RAW=seSim(pk,{});STEPS=seSteps(pk,S,resp);const old=$('#seSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop);draw(+rg.value)}
  $$('[data-sep]').forEach(b=>b.addEventListener('click',()=>{stop();pk=b.dataset.sep;$$('[data-sep]').forEach(x=>x.setAttribute('aria-pressed',x===b));rebuild()}));
  $$('[data-ser]').forEach(b=>b.addEventListener('click',()=>{resp=b.dataset.ser;$$('[data-ser]').forEach(x=>x.setAttribute('aria-pressed',x===b));rebuild()}));
  $$('[data-ses]').forEach(b=>b.addEventListener('click',()=>{const q=b.dataset.ses;sup[q]=!sup[q];b.setAttribute('aria-pressed',sup[q]);rebuild()}));
  $('#seAll').addEventListener('click',()=>{const on=!SE_SUP.every(x=>sup[x.k]);SE_SUP.forEach(x=>sup[x.k]=on);$$('[data-ses]').forEach(b=>b.setAttribute('aria-pressed',on));rebuild()});
  rebuild();

  /* ---- the sensory profile builder (a teaching tool) ---- */
  const PB=[
   {n:'Sound',s:'Sound',hi:`Noise-attenuating headphones or ear defenders, a seat away from doors and scraping chairs, and quiet times to shop or travel. In a small single-subject study headphones lowered arousal; in interviews they increased participation, and many children learned to ask for them. [[Pfeiffer2019EDA,Pfeiffer2019Participation]]`,
     lo:`Get attention first, with the person's name plus a visual cue, before giving information. Check that hearing has been tested.`},
   {n:'Light and sight',s:'Light',hi:`Softer, steady lighting, a seat away from glare and flicker, and a cap or tinted glasses if they help. Changed lighting was part of the sensory-adapted dental room that lowered stress in a randomised trial. [[SteinDuker2023]]`,
     lo:`Use clear, high-contrast visual supports. Visual activity schedules meet criteria as an evidence-based practice from preschool to adulthood. [[Knight2015]]`},
   {n:'Touch and textures',s:'Touch',hi:`Ask before touching and say what will happen. Let the person choose clothing and textures that feel right. A sensory-adapted dental room changed touch input too. [[SteinDuker2023]]`,
     lo:`Check for bumps, cuts and burns after falls or play, because pain may not show in the usual way. [[APA2022]]`},
   {n:'Smell and taste',s:'Smell',hi:`Offer a choice of where to eat, away from strong food smells and perfume. Autistic adults named eateries and supermarkets among commonly disabling places. [[MacLennan2023]]`,
     lo:`Check food temperature and freshness, and make sure smoke alarms work rather than relying on smell.`},
   {n:'Movement and balance',s:'Move',hi:`Warn before lifts, escalators, swings or being moved, and keep movement predictable.`,
     lo:`Build in movement breaks and active jobs. Not every sensory product helps: weighted blankets did not lengthen measured sleep in a randomised trial, though many children and parents liked them. [[Gringras2014]]`},
   {n:'Body signals (interoception)',s:'Body',hi:`Strong awareness of heartbeat or breathing can feed anxiety: in one study the gap between felt and measured body awareness tracked anxiety. Naming the sensation calmly can help. [[Garfinkel2016]]`,
     lo:`Use reminders for drinks, food and the toilet, and ask about pain directly, since it may show only as a change in behaviour. [[Williams2023Interoception,McElhanon2014]]`}];
  const pS=$('#seProfSvg'),box=$('#seSliders');
  box.innerHTML=PB.map((p,i)=>`<label for="sePb${i}"><span>${p.n} <output id="sePo${i}">5</output></span><input type="range" id="sePb${i}" min="0" max="10" step="1" value="5" aria-describedby="sePbScale"><span class="se-seek"><input type="checkbox" id="sePc${i}"> seeks this out</span></label>`).join('');
  const PRE={a:[9,8,7,6,4,4],b:[2,3,1,3,3,1],c:[5,5,4,5,2,5]},PRES={a:[0,0,0,0,1,0],b:[0,0,0,0,0,0],c:[0,0,1,0,1,0]};
  function drawP(){const N=vb(pS,'720 330','400 420'),v=PB.map((p,i)=>+$('#sePb'+i).value),sk=PB.map((p,i)=>$('#sePc'+i).checked);
    PB.forEach((p,i)=>$('#sePo'+i).textContent=v[i]);
    const cx=N?200:200,cy=N?190:168,r=N?118:118;let s='';
    s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.3)}" style="fill:var(--neuro-soft);opacity:.55"/><circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--bad);stroke-width:1;stroke-dasharray:2 3;opacity:.5"/>`;
    const R=profile(cx,cy,r,v.map(x=>x/10),{labels:PB.map(p=>p.s),ghost:[.5,.5,.5,.5,.5,.5],col:'var(--sense)',fs:'t-sm'});s+=R.svg;
    sk.forEach((q,i)=>{if(!q)return;const p=R.pt(i,clamp(v[i]/10,.04,1));s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="8" style="fill:none;stroke:var(--rx);stroke-width:2"/>`});
    s+=`<text x="${cx}" y="${N?24:14}" class="t-xs t-mid">centre: hardly registers · dashed: middle · rim: very intense</text>`;
    const hi=v.filter(x=>x>=7).length,lo=v.filter(x=>x<=3).length,ns=sk.filter(Boolean).length;
    const lean=hi&&lo?'a mixed profile: some channels very intense, others hardly registering':hi?'mostly intense input (in Dunn\'s terms, a lower threshold: sensitivity or avoiding)':lo?(ns?'high threshold with seeking':'mostly low registration (a higher threshold)'):ns?'sensation seeking':'close to the middle on every channel';
    const lx=N?20:400,ly=N?354:60;
    s+=`<text x="${lx}" y="${ly}" class="t-sm" style="fill:var(--ink)">THIS SKETCH LEANS TOWARD</text>`;
    const words=lean.split(' ');let line='',ln=0;const mw=N?52:44;words.forEach(w=>{if((line+' '+w).length>mw){s+=`<text x="${lx}" y="${ly+20+ln*17}" class="t-lbl">${line.trim()}</text>`;ln++;line=''}line+=' '+w});s+=`<text x="${lx}" y="${ly+20+ln*17}" class="t-lbl">${line.trim()}</text>`;
    if(!N){s+=`<text x="${lx}" y="${ly+80}" class="t-xs">intense (7 or more): ${hi} · hardly registers (3 or less): ${lo}</text><text x="${lx}" y="${ly+96}" class="t-xs">seeks out: ${ns} · green ring = seeks this out</text>`;
      s+=`<text x="${lx}" y="${ly+140}" class="t-xs" style="fill:var(--warn)">A TEACHING TOOL, NOT AN ASSESSMENT</text><text x="${lx}" y="${ly+156}" class="t-xs">Real profiles use standardised questionnaires</text><text x="${lx}" y="${ly+170}" class="t-xs">such as the Sensory Profile, with a professional.</text>`}
    pS.innerHTML=s;
    let h='';PB.forEach((p,i)=>{const it=[];if(v[i]>=7)it.push(['Very intense',p.hi]);if(v[i]<=3)it.push(['Hardly registers',p.lo]);if(sk[i])it.push(['Seeks it out',`Build safe ways to get this input into the day, such as movement breaks, fidget items or something to chew. Leave harmless stims alone: autistic adults describe stimming as self-regulation and object to efforts to eliminate it. [[Kapp2019]]`]);
      it.forEach(([a,b])=>h+=`<li><b>${p.n}: ${a.toLowerCase()}.</b> ${b}</li>`)});
    $('#seProfNote').innerHTML=`<div class="kicker">Matching adjustments</div><h4>${h?'Ideas to discuss':'Move a slider to the ends'}</h4>`+(h?`<ul class="se-list">${h}</ul>`:`<p>Set a channel to 7 or more (very intense) or 3 or less (hardly registers), or tick "seeks this out", to see adjustments people often try. Every person has some of each pattern. [[Dunn2001]]</p>`)+`<div class="pt"><b>%t:note.plain%</b>The point is to change the surroundings to fit the person, and to ask them what helps.</div>`;
  }
  $$('#seSliders input').forEach(x=>x.addEventListener('input',drawP));$$('#seSliders input[type=checkbox]').forEach(x=>x.addEventListener('change',drawP));
  $$('[data-sepre]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.sepre;PB.forEach((p,i)=>{$('#sePb'+i).value=k==='r'?5:PRE[k][i];$('#sePc'+i).checked=k==='r'?false:!!PRES[k][i]});drawP()}));
  drawP();
  redraws.senses=(()=>{const prev=redraws.senses;return()=>{prev&&prev();drawP()}})();
};
