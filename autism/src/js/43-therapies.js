/* =============== 4.3 Communication, AAC & therapies =============== */
const TH_LANES=[
 {id:'ges',n:'Gestures',c:'var(--gold)'},
 {id:'pic',n:'Pictures (PECS)',c:'var(--accent)'},
 {id:'sgd',n:'Speech-generating device',c:'var(--rx)'},
 {id:'spk',n:'Spoken words',c:'var(--neuro)'}];
const TH_PECS=[['I','exchange',100],['II','distance',100],['III','discriminate',100],['IV','sentence',82],['V','"What do you want?"',64],['VI','commenting',19]];
/* the person's path between lanes: [t, lane] knots (schematic) */
const TH_PATH=[[0,0],[.14,0],[.2,1],[.55,1],[.6,2],[.72,2],[.76,0],[.8,2],[.88,3],[.92,2],[1,2]];
const TH_MSG={ges:'points',pic:'juice card',sgd:'"I want juice"',spk:'"juice"'};
const TH_STEPS=[
 {from:0,at:.08,k:'Many paths',t:'Not a ladder',
  txt:`People communicate in many ways at once: gestures, pictures, devices and speech. Augmentative and alternative communication (AAC) adds to these. A meta-analysis of 24 single-case studies found large overall effects of aided AAC, with picture exchange (PECS) and speech-generating devices showing larger effects than other picture-based systems. [[Ganz2012]] A person can use several paths on the same day, and switch between them.`,
  pt:`Pointing, pictures, a talking tablet and words are all real communication. Using one does not mean a person has "failed" at another.`,
  hook:`AAC = augmentative and alternative communication: aided (pictures, devices) and unaided (gestures, signs). [[Ganz2012]]`},
 {from:.18,at:.3,k:'PECS phases I–III',t:'Exchanging a picture',
  txt:`PECS is taught in six phases. I: physical exchange (how to communicate); II: distance and persistence; III: picture discrimination. In a 24-session programme with 22 minimally verbal children aged 6–12, all children reached phases I–III. [[Tamanaha2023]]`,
  pt:`First the child learns that handing over a picture gets a response, then to go and find the person, then to choose the right picture.`,
  hook:`PECS phases: I exchange · II distance & persistence · III discrimination · IV sentence · V "What do you want?" · VI commenting. [[Tamanaha2023]]`},
 {from:.38,at:.5,k:'PECS phases IV–VI',t:'Sentences and comments',
  txt:`Phase IV builds sentences ("I want…"), V answers "What do you want?", and VI is commenting. In the same programme about 82% reached phase IV, 64% phase V and 19% phase VI. [[Tamanaha2023]] In a group RCT of PECS teacher training (84 children, mean age 6.8), PECS use (OR 3.90) and initiations (OR 2.72) rose, but speech, ADOS scores and language tests did not, and effects faded once the active intervention stopped. [[Howlin2007]] A meta-analysis called PECS "promising but not yet established". <span class="ev early">Early evidence</span> [[Flippin2010]]`,
  pt:`Most children learned to ask for things with pictures. Fewer went on to comment on the world, which is harder to teach.`,
  hook:`PECS RCT: more communication with pictures, but gains faded when support stopped. [[Howlin2007]]`},
 {from:.58,at:.68,k:'Speech-generating devices',t:'A voice on a tablet',
  txt:`In a sequential multiple assignment randomised trial of 61 minimally verbal children aged 5–8, starting a play-based intervention (JASP+EMT) with a speech-generating device produced more spontaneous communicative utterances, new words and comments than spoken-word intervention alone. [[Kasari2014]] Follow-up to week 36 again favoured the approach that began with the device. [[Almirall2016]]`,
  pt:`Giving a child a talking device from the start led to more communication, including more words, than working on speech alone.`,
  hook:`Kasari 2014 SMART: starting with an SGD beat spoken-word-only intervention for minimally verbal 5–8-year-olds. [[Kasari2014]]`},
 {from:.78,at:.93,k:'Does AAC stop speech?',t:'Speech keeps its own path',
  txt:`<span class="ev est">Established</span> A systematic review of 9 single-subject and 2 group studies concluded that AAC interventions "do not impede speech production"; most studies reported increased speech, though gains were modest. [[Schlosser2008]] In the PECS RCT, spontaneous speech rose (RR 1.77) and was the only effect still present at 9 months. [[Gordon2011]] A PECS meta-analysis found speech gains "small to negative", so AAC should not be promised as a route to speech either. [[Flippin2010]]`,
  pt:`Using pictures, devices or other AAC does not stop a person learning to talk. It gives them a way to be understood now.`,
  hook:`Schlosser & Wendt 2008: AAC does not impede speech production. [[Schlosser2008]]`}];
const TH_CARDS=[
 {g:['comm'],ev:'est',n:'Early language intervention',age:'children, mean age 3.3 years',tg:'spoken language',
  t:`Across 26 studies (1,738 children), early intervention improved spoken language, g 0.26 (95% CI 0.11 to 0.42); effects were largest when both a parent and a clinician delivered it. [[Hampton2016]]`},
 {g:['comm'],ev:'est',n:'Parent-mediated therapy (e.g. PACT)',age:'1–6 years',tg:'parent–child interaction, social communication',
  t:`19 RCTs found small effects, g 0.18 to 0.27; more parent training did not change outcomes. [[Nevill2018]] Cochrane found strong evidence for changes in parent–child interaction (parent synchrony SMD 0.90), with most child outcomes inconclusive. [[Oono2013]] See <a href="#supports" data-go="supports">PACT</a>.`},
 {g:['comm'],ev:'early',n:'JASPER (joint attention, play)',age:'3–4 years; 5–8 in later trials',tg:'joint attention, play, language',
  t:`In an RCT of 58 children, each group improved in its targeted skill [[Kasari2006]]; 12 months later both had larger expressive-language gains than controls, most for joint-attention training in children with the lowest starting language. [[Kasari2008]]`},
 {g:['comm'],ev:'est',n:'AAC and speech-generating devices',age:'mostly children; 5–8 in the SMART trial',tg:'communication, including speech',
  t:`Aided AAC showed large effects in single-case studies [[Ganz2012]]; AAC does not impede speech production. [[Schlosser2008]] Starting with a speech-generating device gave more spontaneous communication. [[Kasari2014]]`},
 {g:['comm'],ev:'early',n:'PECS',age:'mean age 6.8 (RCT); 6–12 (programme)',tg:'requesting, initiation',
  t:`PECS use and initiations rose in an RCT, but speech and language tests did not, and effects faded after the active phase. [[Howlin2007]] "Promising but not yet established". [[Flippin2010]]`},
 {g:['daily'],ev:'early',n:'Occupational therapy: Ayres sensory integration',age:'4–8 (RCT); 4–12 (review)',tg:'sensory-related goals, self-care',
  t:`A small manualised RCT (17 vs 15 children) found better goal attainment (d 1.2) and less caregiver help with self-care (d 0.9). [[Schaaf2014]] A review by authors linked to the approach rated it evidence-based. [[Schoen2019]] The larger UK SenITA RCT (138 children) found no effect on its primary outcome and no cost-effectiveness, though carers reported better daily functioning. [[Randell2022]] The AAP calls the research "limited and inconclusive". [[Zimmer2012]]`},
 {g:['daily'],ev:'no',n:'Weighted blankets and vests',age:'5–16 (blanket RCT)',tg:'sleep, calm',
  t:`In a placebo-controlled crossover RCT of 67 children, a weighted blanket did not increase total sleep time or improve sleep onset or waking, though children and parents preferred it. [[Gringras2014]] A review of 7 studies concluded weighted vests "cannot be recommended for clinical application". [[Stephenson2009]]`},
 {g:['daily'],ev:'early',n:'TEACCH structured teaching',age:'children and adults',tg:'skills, behaviour, independence',
  t:`A meta-analysis of 13 studies (172 people) found small effects on perceptual, motor, verbal and cognitive skills and moderate to large gains in social and maladaptive behaviour; the authors called the results exploratory. [[ViruesOrtega2013]]`},
 {g:['friend'],ev:'est',n:'Social skills groups and PEERS',age:'6–21 (Cochrane); teens 13–17; adults 18–24',tg:'friendships, social knowledge',
  t:`Cochrane (5 RCTs) found improved social competence (ES 0.47) and friendship quality (0.41), mostly in US children aged 7–12 with average or above-average IQ. [[Reichow2012Cochrane]] PEERS improved social-skills knowledge and get-togethers in teens [[Laugeson2009]] and social skills in young adults, with most gains held at 16 weeks. [[Laugeson2015]] Self-reported gains reflected knowledge more than performance. [[Gates2017]]`},
 {g:['anx'],ev:'est',n:'CBT adapted for autistic people',age:'7–13 (RCT)',tg:'anxiety',
  t:`In an RCT of 167 children, adapted CBT (BIACA) beat standard CBT and treatment as usual: response 92.4%, 81.0% and 11.1%. [[Wood2020]] Across 19 RCTs effects depended on the rater and were not maintained at follow-up. [[Sharma2021]]`},
 {g:['comm'],ev:'early',n:'Music therapy',age:'children, adolescents and adults; 4–7 in TIME-A',tg:'global improvement, wellbeing',
  t:`Cochrane (26 studies, 1,165 participants): more likely to give global improvement than placebo or standard care, RR 1.22, NNTB 11, moderate certainty; no clear effect on social interaction or communication. [[Geretsegger2022]] The largest trial, TIME-A (364 children), found no difference in ADOS social affect. [[Bieleninik2017]]`}];
const TH_EV={est:['est','Established'],early:['early','Early evidence'],no:['','Not supported']};
const TH_RATE={
 cbt:{n:'CBT for anxiety in autistic youth',rows:[['Clinician',.88],['Parent',.40],['Child',.25]],
  txt:`A meta-analysis of 19 RCTs (833 participants) found that the effect of CBT on anxiety depended on who rated it: clinicians saw the most change, children themselves the least, and benefits were not maintained at follow-up. [[Sharma2021]] Across 48 studies of CBT in autistic people, effects on affective disorders were 0.24 (not significant) on self-report. [[Weston2016]]`,
  pt:`The same therapy looked most helpful to clinicians and least helpful to the young people themselves.`,
  hook:`Clinician g 0.88 vs child g 0.25 for the same treatment: ask who measured the outcome. [[Sharma2021]]`},
 ss:{n:'Group social skills interventions',rows:[['Self-report',.92],['Task-based',.58],['Parent',.47],['Observer',.40],['Teacher',0]],
  txt:`A meta-analysis of 19 RCTs found an overall g of 0.51, but the self-report effect reflected social knowledge (g 1.15) more than social performance (g 0.28, not significant); teacher ratings showed no significant effect. [[Gates2017]]`,
  pt:`Young people said they had learned a lot about social rules; people watching them saw smaller changes in what they did.`,
  hook:`Social skills groups: knowing the rules improved more than using them. [[Gates2017]]`}};

inits.therapies=()=>{
  const svg=$('#thSvg'),rg=$('#thT');let who='child',setSt=()=>{};
  const laneAt=t=>{for(let i=1;i<TH_PATH.length;i++)if(t<=TH_PATH[i][0]){const a=TH_PATH[i-1],b=TH_PATH[i];return lerp(a[1],b[1],ease(ramp(t,a[0],b[0])))}return TH_PATH[TH_PATH.length-1][1]};
  const tablet=(x,y,s,c)=>{let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(30*s)}" height="${f1(22*s)}" rx="${f1(3*s)}" style="fill:var(--ink);opacity:.85"/>`;
    for(let i=0;i<6;i++)g+=`<rect x="${f1(x+3*s+(i%3)*8.2*s)}" y="${f1(y+3*s+Math.floor(i/3)*8.2*s)}" width="${f1(6.6*s)}" height="${f1(6.6*s)}" rx="1" style="fill:${i===1?c:'var(--accent-soft)'}"/>`;return g};
  const card=(x,y,s,c)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(18*s)}" height="${f1(22*s)}" rx="2" style="fill:var(--bubble);stroke:${c};stroke-width:1.4"/><circle cx="${f1(x+9*s)}" cy="${f1(y+9*s)}" r="${f1(4.5*s)}" style="fill:${c};opacity:.7"/>`;
  const hand=(x,y,s,c)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(6*s)}" style="fill:var(--skin);stroke:${c};stroke-width:1.2"/><line x1="${f1(x+4*s)}" y1="${f1(y-2*s)}" x2="${f1(x+14*s)}" y2="${f1(y-8*s)}" style="stroke:var(--skin);stroke-width:${f1(3.4*s)};stroke-linecap:round"/>`;
  function draw(t){
    const N=vb(svg,'720 380','400 480');
    const A=who==='adult';
    const lx0=N?24:212,lx1=N?300:600,ly=i=>N?122+i*96:92+i*72;
    let s=`<text x="${N?12:20}" y="26" class="t-big">${A?'An adult who speaks few or no words':'A young child, minimally verbal'}</text>`;
    const nMsg=Math.floor(t*14);
    s+=`<text x="${N?12:20}" y="46" class="t-sm">messages understood (schematic): ${nMsg}</text>`;
    TH_LANES.forEach((L,i)=>{const y=ly(i),on=t>=i*.03;
      s+=`<rect x="${lx0}" y="${y-16}" width="${lx1-lx0}" height="32" rx="16" style="fill:${L.c};opacity:${on?.12:.04}"/>`;
      s+=N?`<text x="${lx0}" y="${y-22}" class="t-xs" style="fill:${L.c};font-weight:700">${L.n}</text>`:`<text x="${lx0-12}" y="${y+4}" class="t-lbl t-end" style="fill:${L.c}">${L.n}</text>`;
      const ix=lx0+12;s+=i===0?hand(ix+6,y,1,L.c):i===1?card(ix-2,y-11,1,L.c):i===2?tablet(ix-4,y-11,1,L.c):bubble(ix-6,y-11,28,18,{tail:'none',col:L.c,text:''})});
    /* PECS phases on the pictures lane */
    const pk=ramp(t,.18,.5),py=ly(1);
    TH_PECS.forEach((P,j)=>{const x=lerp(lx0+56,lx1-20,j/5),k=ramp(pk,j/6,(j+1)/6);if(k<=0)return;
      const h=22*P[2]/100*k;
      s+=`<rect x="${f1(x-9)}" y="${f1(py+11-h)}" width="18" height="${f1(h)}" rx="2" style="fill:var(--accent);opacity:.55"/><text x="${f1(x)}" y="${N?py+27:py-19}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${P[0]}</text>`;
      if(k>=1&&!N)s+=`<text x="${f1(x)}" y="${py+28}" class="t-xs t-mid">${P[2]}%</text>`;
      if(k>=1&&N)s+=`<text x="${f1(x)}" y="${py+39}" class="t-xs t-mid">${P[2]}%</text>`});
    if(pk>0)s+=`<text x="${lx1}" y="${py+(N?54:42)}" class="t-xs t-end">${N?'% of 22 children reaching each phase':'% of 22 children reaching each PECS phase'}</text>`;
    /* the spoken-words lane keeps growing: a path, not a ceiling */
    const sy=ly(3),gw=(lx1-lx0-50)*lerp(.15,.85,t);
    s+=`<rect x="${lx0+40}" y="${sy-4}" width="${f1(gw)}" height="8" rx="4" style="fill:var(--neuro);opacity:.6"/>`;
    s+=`<text x="${f1(lx0+46+gw)}" y="${sy+4}" class="t-xs" style="fill:var(--neuro)">${t>.78?'speech still growing':''}</text>`;
    /* the person moving between lanes, with a trail */
    let d='';for(let u=0;u<=t+1e-9;u+=.01){const xx=lerp(lx0+40,lx1-14,u),yy=lerp(ly(0),ly(3),laneAt(u)/3);d+=(d?'L':'M')+f1(xx)+' '+f1(yy)}
    s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2;stroke-dasharray:4 3;opacity:.7"/>`;
    const L=laneAt(t),px=lerp(lx0+40,lx1-14,t),pyy=lerp(ly(0),ly(3),L/3),lane=TH_LANES[Math.round(L)];
    s+=`<circle cx="${f1(px)}" cy="${f1(pyy)}" r="${A?13:10}" style="fill:var(--brand);stroke:var(--bg);stroke-width:2"/>`+person(px,pyy-(A?11:8),A?20:15,'var(--bg)');
    /* partner + message */
    const fx=N?334:668,fy=N?ly(1)+48:ly(1)+36;
    s+=face(fx,fy,N?22:24,{gaze:180,mouth:'smile'})+`<text x="${fx}" y="${fy+(N?38:40)}" class="t-xs t-mid">${A?'support worker':'parent'}</text>`;
    const mw=N?112:110,bx=fx-mw/2,byy=fy-(N?74:78);
    s+=bubble(bx,byy,mw,26,{tail:'down',col:lane.c,text:TH_MSG[lane.id]});
    s+=`<line x1="${f1(px+14)}" y1="${f1(pyy)}" x2="${f1(fx-28)}" y2="${f1(fy)}" style="stroke:${lane.c};stroke-width:1.4;stroke-dasharray:2 3;opacity:.7"/>`;
    /* counter strip */
    const cy=N?462:362;
    if(t>=.74)s+=`<text x="${N?12:20}" y="${cy}" class="t-sm" style="fill:var(--ink)">${N?'AAC review (11 studies): speech not impeded':'AAC review: 11 studies · "do not impede speech production"'}</text>`;
    else s+=`<text x="${N?12:20}" y="${cy}" class="t-sm">now using: ${lane.n.toLowerCase()}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(TH_STEPS,t);setSt(ph);
    const P=TH_STEPS[ph];
    $('#thNote').innerHTML=noteHTML(A?Object.assign({},P,{txt:P.txt+' <b>For adults:</b> the trials and programmes cited here enrolled children (ages given above), so these numbers describe children, not adults. [[Tamanaha2023,Kasari2014,Schlosser2008]]'}):P);
    $('#thRead').innerHTML=`<span>path now <b>${lane.n}</b></span><span>PECS phases shown <b>${Math.min(6,Math.ceil(pk*6))} of 6</b></span><span>speech impeded by AAC (review) <b>${t>=.78?'no':'—'}</b></span>`;
  }
  const stop=playWire(rg,$('#thPlay'),draw,24000,'Replay','therapies');
  setSt=stepWire($('#thSteps'),TH_STEPS,rg,draw,stop);
  $$('[data-thw]').forEach(b=>b.addEventListener('click',()=>{who=b.dataset.thw;$$('[data-thw]').forEach(q=>q.setAttribute('aria-pressed',q===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ===== comparator cards ===== */
  const wrapC=$('#thCards');
  wrapC.innerHTML=TH_CARDS.map((c,i)=>{const e=TH_EV[c.ev];return `<div class="card" data-goal="${c.g.join(' ')}">${e[0]?`<span class="ev ${e[0]}">${e[1]}</span>`:`<span class="tag warn">${e[1]}</span>`}<h4>${c.n}</h4><p class="meta">Ages studied: ${c.age}<br>Targets: ${c.tg}</p><p>${c.t}</p></div>`}).join('');
  $$('[data-thg]').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.thg;$$('[data-thg]').forEach(q=>q.setAttribute('aria-pressed',q===b));
    $$('.card',wrapC).forEach(c=>c.hidden=!(g==='all'||c.dataset.goal.split(' ').includes(g)))}));

  /* ===== rater bars ===== */
  const rs=$('#thRSvg');let rk='cbt',stopR=null;
  function drawR(k){const N=vb(rs,'720 260','400 300'),R=TH_RATE[rk];
    const x0=N?110:170,x1=N?370:640,gx=g=>x0+(x1-x0)*g/1;let s=`<text x="${N?12:20}" y="24" class="t-lbl">${R.n}</text>`;
    const rh=N?40:36,y0=52;
    [0,.25,.5,.75,1].forEach(g=>s+=`<line x1="${f1(gx(g))}" x2="${f1(gx(g))}" y1="${y0-8}" y2="${y0+R.rows.length*rh}" style="stroke:var(--line);stroke-dasharray:${g?'2 3':'0'}"/><text x="${f1(gx(g))}" y="${y0+R.rows.length*rh+14}" class="t-xs t-mid">${g}</text>`);
    R.rows.forEach(([l,v],i)=>{const y=y0+i*rh;s+=`<text x="${x0-10}" y="${y+14}" class="t-sm t-end" style="fill:var(--ink)">${l}</text>`;
      if(v>0)s+=`<rect x="${x0}" y="${y+2}" width="${f1((gx(v)-x0)*k)}" height="18" rx="4" style="fill:var(--rx);opacity:.85"/><text x="${f1(gx(v*k)+6)}" y="${y+15}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(2)}</text>`;
      else s+=`<text x="${x0+6}" y="${y+15}" class="t-sm">not significant</text>`});
    s+=`<text x="${f1((x0+x1)/2)}" y="${y0+R.rows.length*rh+30}" class="t-xs t-mid">Hedges’ g, by who rated the outcome</text>`;
    rs.innerHTML=s;
    $('#thRNote').innerHTML=noteHTML({k:'Rater effects',t:R.n,txt:R.txt,pt:R.pt,hook:R.hook})}
  $$('[data-thr]').forEach(b=>b.addEventListener('click',()=>{rk=b.dataset.thr;$$('[data-thr]').forEach(q=>q.setAttribute('aria-pressed',q===b));stopR&&stopR();stopR=animate(700,p=>drawR(ease(p)))}));
  drawR(1);
  redraws.therapies=(p=>()=>{p&&p();drawR(1)})(redraws.therapies);
};
