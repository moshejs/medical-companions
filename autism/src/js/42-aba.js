/* =============== 4.2 ABA and the debate =============== */
const AB_Y0=1965,AB_Y1=2026;
const abT=y=>(y-AB_Y0)/(AB_Y1-AB_Y0);
/* items: y year, s step, k 'ev' (event) | 'pro' (proponents argue) | 'crit' (critics argue), l short label (SVG, no citations) */
const AB_IT=[
 {y:1969,s:0,k:'ev',l:'Lovaas & Simmons: shock contingent on self-injury'},
 {y:1969,s:0,k:'pro',l:'Self-injury was suppressed during shock'},
 {y:1969,s:0,k:'crit',l:'It returned once shock was removed'},
 {y:2017,s:0,k:'crit',l:'Painful aversives rejected outright'},
 {y:1987,s:1,k:'ev',l:'Lovaas: 47% "normal functioning", ~40 h/week'},
 {y:1993,s:1,k:'ev',l:'McEachin: follow-up to mean age 11.5'},
 {y:1998,s:1,k:'ev',l:'Gresham & MacMillan critique'},
 {y:2000,s:1,k:'ev',l:'Smith RCT: 28 children, 24.5 h/week'},
 {y:2001,s:1,k:'ev',l:'UK EIBI programmes average 32 h/week'},
 {y:1987,s:1,k:'pro',l:'47% reached "normal functioning"'},
 {y:1993,s:1,k:'pro',l:'Gains kept to age 11.5'},
 {y:2000,s:1,k:'pro',l:'RCT: better IQ, language, academics'},
 {y:1998,s:1,k:'crit',l:'No random assignment; validity threats'},
 {y:2000,s:1,k:'crit',l:'No gain in adaptive skills or behaviour'},
 {y:2001,s:1,k:'crit',l:'No UK child met all original conditions'},
 {y:1994,s:2,k:'ev',l:'Iwata: functional analysis of self-injury'},
 {y:2002,s:2,k:'ev',l:'Positive behaviour support defined'},
 {y:2003,s:2,k:'ev',l:'Functional analysis "a hallmark"'},
 {y:1994,s:2,k:'pro',l:'6 of 9: self-injury had a clear function'},
 {y:2002,s:2,k:'pro',l:'PBS: quality of life, prevention'},
 {y:2025,s:2,k:'crit',l:'Targets mix harmful and harmless acts'},
 {y:2006,s:3,k:'ev',l:'Kasari: joint attention & play RCT'},
 {y:2010,s:3,k:'ev',l:'ESDM RCT: 48 toddlers, 2 years'},
 {y:2015,s:3,k:'ev',l:'NDBI umbrella defined'},
 {y:2019,s:3,k:'ev',l:'ESDM multisite: partial replication'},
 {y:2021,s:3,k:'ev',l:'15 vs 25 h/week RCT: no main effect'},
 {y:2010,s:3,k:'pro',l:'ESDM: IQ +17.6 vs +7.0 points'},
 {y:2022,s:3,k:'pro',l:'NDBIs as a bridge to neurodiversity'},
 {y:2019,s:3,k:'crit',l:'Replication: no change in autism severity'},
 {y:2021,s:3,k:'crit',l:'More hours gave no extra benefit'},
 {y:2017,s:4,k:'ev',l:'Kirkham: history of the critique'},
 {y:2018,s:4,k:'ev',l:'Kupferstein survey; Leaf et al. reply'},
 {y:2020,s:4,k:'ev',l:'McGill & Robinson: "hidden harms"'},
 {y:2023,s:4,k:'ev',l:'Anderson: 7 adults recall ABA'},
 {y:2025,s:4,k:'ev',l:'Expression of concern on Kupferstein'},
 {y:2018,s:4,k:'pro',l:'Survey: leading questions, no diagnosis check'},
 {y:2020,s:4,k:'pro',l:'Rebuttal: long-term ABA is not abuse'},
 {y:2022,s:4,k:'pro',l:'Change goals, do not abandon ABA'},
 {y:2025,s:4,k:'pro',l:'Critiques rest on "myths"'},
 {y:2017,s:4,k:'crit',l:'Removing benign autistic behaviour is harm'},
 {y:2018,s:4,k:'crit',l:'46% met a PTSD threshold (self-report)'},
 {y:2019,s:4,k:'crit',l:'Compliance emphasis can become abuse'},
 {y:2023,s:4,k:'crit',l:'Trauma; made to act like peers'},
 {y:2018,s:5,k:'ev',l:'Cochrane EIBI: 5 studies, 1 RCT'},
 {y:2021,s:5,k:'ev',l:'84% of ABA papers: author COI, 2% disclosed'},
 {y:2023,s:5,k:'ev',l:'Project AIM update: 252 studies'},
 {y:2024,s:5,k:'ev',l:'No link between hours and effect'},
 {y:2026,s:5,k:'ev',l:'Umbrella review; 5-year COI update'},
 {y:2018,s:5,k:'pro',l:'EIBI: IQ +15.4, adaptive +9.6 points'},
 {y:2024,s:5,k:'pro',l:'Reform: affirm neurodiversity in ABA'},
 {y:2026,s:5,k:'pro',l:'6 meta-analyses: "consistent, replicated"'},
 {y:2018,s:5,k:'crit',l:'Certainty low or very low'},
 {y:2023,s:5,k:'crit',l:'Behavioural effects fade under blinding'},
 {y:2026,s:5,k:'crit',l:'93% of "no COI" statements false'}];
const AB_STEPS=[
 {from:0,at:abT(1969.5),k:'1960s · aversive beginnings',t:'Shock and self-injury',
  txt:`Early behavioural work used physical aversives. In a 1969 study, Lovaas and Simmons gave three children painful electric shock contingent on self-injury: the behaviour was suppressed, but came back when shock was removed. [[LovaasSimmons1969]] Neurodiversity-movement critics reject these aversives outright; the Judge Rotenberg Center's use of electric shock is their main present-day example. [[Kirkham2017]]`,
  pt:`Some of the earliest behaviour programmes hurt children to stop them hurting themselves. That is the history many autistic people remember when they hear "ABA".`,
  hook:`Punishment suppressed self-injury only while it was applied (Lovaas & Simmons 1969). [[LovaasSimmons1969]]`},
 {from:abT(1984),at:abT(1989),k:'1987–2001 · EIBI',t:'Lovaas and 40 hours a week',
  txt:`Lovaas's 1987 UCLA project reported that 47% of 19 treated children reached "normal functioning", with treatment at about 40 hours a week. [[Lovaas1987,Mudford2001]] A follow-up to mean age 11.5 reported that gains were kept. [[McEachin1993]] Critics pointed to serious threats to validity, including no random assignment. <span class="ev est">Established</span> [[Gresham1998]] A small later RCT (24.52 hours a week) found gains in IQ, language and academics but not in adaptive functioning or behaviour problems. [[Smith2000AJMR]] UK programmes averaged 32 hours, and no child met all the original conditions. [[Mudford2001]]`,
  pt:`One famous study said almost half the children "recovered" with 40 hours a week. It was not a fair test, because children were not put into groups by chance.`,
  hook:`Lovaas 1987: 47% "normal functioning", ~40 h/week, not randomised. [[Mudford2001,Gresham1998]]`},
 {from:abT(1992.5),at:abT(1998),k:'1994–2003 · asking why',t:'Functional analysis and PBS',
  txt:`Functional analysis exposes a person briefly and repeatedly to conditions that vary play materials, demands and attention. In 1994, 6 of 9 participants showed self-injury mostly in one condition, showing it served an identifiable function. [[Iwata1994]] By 2003 it was "a hallmark" of behavioural assessment. [[Hanley2003]] Positive behaviour support grew from ABA, the inclusion movement and person-centred values, with lifestyle change, stakeholder participation and prevention as defining features. [[Carr2002PBS]] A later review warned that many studies' target behaviours mixed harm with harmless difference. [[BottemaBeutel2025]]`,
  pt:`Instead of only stopping a behaviour, practitioners began asking what the behaviour does for the person, and changing the situation.`,
  hook:`Functional analysis = direct observation under ≥2 conditions in which one environmental variable is changed. [[Hanley2003]]`},
 {from:abT(2005),at:abT(2012),k:'2006–2021 · NDBIs',t:'Following the child’s lead',
  txt:`Naturalistic developmental behavioural interventions (NDBIs) teach in natural settings with shared control and natural rewards; ESDM and JASPER belong here. [[Schreibman2015]] In the ESDM RCT, IQ rose 17.6 points against 7.0 over 2 years. [[Dawson2010]] A multisite replication was "partial": a language advantage, but no differences in autism severity or adaptive behaviour. [[Rogers2019]] A meta-analysis of 12 ESDM studies found g 0.357, driven by cognition and language. [[Fuller2020]] An RCT found no main effect of 15 vs 25 hours a week, or of NDBI vs discrete trial style. [[Rogers2021]] NDBIs have been proposed as a bridge to the neurodiversity movement. <span class="ev hyp">Hypothesis</span> [[Schuck2022]]`,
  pt:`Newer approaches mix behavioural teaching with play and the child's own interests, usually with parents involved.`,
  hook:`ESDM: IQ +17.6 vs +7.0 (Dawson 2010); replication partial (Rogers 2019). [[Dawson2010,Rogers2019]]`},
 {from:abT(2016),at:abT(2020),k:'2017–2025 · autistic voices',t:'The autistic critique',
  txt:`Critics argue that removing benign autistic behaviour is harmful to the person and to society. [[Kirkham2017]] Ten autistic adults described "hidden harms" [[McGill2020]]; seven recalled traumatic events, rejected being made to act like peers and called ABA unethical, while also reporting some benefits. [[Anderson2023]] Kupferstein's online survey (460 respondents; self-diagnosis allowed) reported 46% of ABA-exposed respondents over a PTSD threshold. [[Kupferstein2018]] <b>Its limits:</b> leading questions in a non-validated survey, no diagnosis check, social-media recruitment and a cross-sectional design that cannot show cause. [[Leaf2018AiA]] The journal issued an expression of concern in 2025. [[AiA2025EOC]] Defenders call the claims of trauma and abuse "unfounded criticism and longstanding myths". [[Travers2025]]`,
  pt:`Many autistic adults say ABA hurt them. The one survey that tried to count harm had serious weaknesses, so nobody knows yet how common harm is.`,
  hook:`Kupferstein 2018: self-selected, non-validated survey; correlational; now under an expression of concern. [[Leaf2018AiA,AiA2025EOC]]`},
 {from:abT(2021.5),at:abT(2025.5),k:'2018–2026 · the reviews',t:'Same studies, different verdicts',
  txt:`Cochrane (2018) found 5 studies, 1 of them randomised, with 219 children: EIBI improved adaptive behaviour (MD 9.58) and IQ (MD 15.44), not autism symptoms, with low or very low certainty. [[Reichow2018Cochrane]] A 2026 umbrella review of 6 meta-analyses called the IQ and adaptive gains "consistent, replicated" [[Reichow2026Umbrella]]; Project AIM, using only blinded, non-caregiver-rated RCT outcomes, found behavioural effects did not survive. [[Sandbank2023BMJ]] The difference is which designs and outcomes count. In ABA journals, 93% of "no conflict" statements were false. [[BottemaBeutel2026]] Some analysts now call for neurodiversity-affirming practice. [[Mathur2024]]`,
  pt:`Experts read the same evidence differently, depending on which studies they trust. The question is unsettled.`,
  hook:`Cochrane EIBI 2018: 5 studies, 1 RCT, 219 children; certainty low or very low. [[Reichow2018Cochrane]]`}];
const AB_FN={
 sens:{n:'Sensory',a:'Noisy group work: many voices, chairs scraping',a2:'The noise gets louder',b:'Leaves the room, hands over ears',c:'The corridor is quiet; the noise stops',
  h:'Function: getting away from overwhelming sound',
  sup:[`Lower the noise at its source, and offer ear defenders and a quiet space she can choose to use.`,
   `Teach a "break" card so she can ask to leave instead of having to run.`,
   `Why it matters: an estimated 41% of autistic people currently have hyperacusis, where everyday sounds feel too loud or painful. [[Williams2021Hyperacusis]] In an RCT, a sensory-adapted dental room lowered physiological stress. [[SteinDuker2023]]`],
  q:'Does she leave mostly when it is loud, whatever the task?'},
 esc:{n:'Escape a demand',a:'Asked to read aloud to the class',a2:'Her turn is next',b:'Leaves the room',c:'The reading task is dropped',
  h:'Function: avoiding a task that feels too hard or too exposing',
  sup:[`Make the task doable: a written answer, reading to one adult, or choosing the passage.`,
   `Warn her ahead of time and agree a way to pass.`,
   `Positive behaviour support aims at prevention and quality of life, not just stopping the behaviour. [[Carr2002PBS]] Critics warn against goals that train compliance for its own sake. [[SandovalNorton2019]]`],
  q:'Does she leave mostly when a demand is made, even in a quiet room?'},
 att:{n:'Attention',a:'Teacher busy with another group',a2:'No one has spoken to her for a while',b:'Leaves the room',c:'An adult follows and talks with her',
  h:'Function: connection with an adult',
  sup:[`Give planned attention before she needs to leave: regular check-ins.`,
   `Teach a clear way to ask for help or company, and answer it.`,
   `In functional analysis, attention is one of the conditions varied to test what maintains a behaviour. [[Iwata1994]]`],
  q:'Does she leave mostly when adults are busy elsewhere?'},
 tan:{n:'Tangible',a:'Tablet put away for group work',a2:'The tablet is on the teacher’s desk',b:'Leaves the room',c:'She gets the tablet back in the corridor',
  h:'Function: getting back a wanted item or activity',
  sup:[`Show on a visual timetable when the tablet comes back.`,
   `Give transition warnings and agree a fair plan with her.`,
   `Play materials are one of the conditions varied in functional analysis. [[Iwata1994,Hanley2003]]`],
  q:'Does she leave mostly when a favourite item is taken away?'}};

inits.aba=()=>{
  /* ===== timeline ===== */
  const svg=$('#abSvg'),rg=$('#abT');let view='ev',setSt=()=>{};
  const colOf=k=>k==='pro'?'var(--rx)':k==='crit'?'var(--neuro)':'var(--accent)';
  function rows(items,x,y0,dir,N,W,txt){let s='';const lh=N?20:21;
    items.forEach((it,j)=>{const ry=y0+dir*j*lh,xd=x(it.y),lab=`${it.y} · ${it.l}`,w=lab.length*6.7;
      const tx=N?12:clamp(xd-12,14,W-14-w);
      s+=`<line x1="${f1(xd)}" x2="${f1(xd)}" y1="${f1(txt)}" y2="${f1(ry+(dir<0?4:-11))}" style="stroke:${colOf(it.k)};stroke-width:1;opacity:.45;stroke-dasharray:2 2"/>`;
      s+=`<circle cx="${f1(tx-6)}" cy="${f1(ry-3)}" r="3" style="fill:${colOf(it.k)}"/><text x="${f1(tx)}" y="${f1(ry)}" class="t-xs" style="fill:var(--ink)">${lab}</text>`});
    return s}
  function draw(t){
    const P=view==='pc',H=NARROW()?(P?440:420):400,N=vb(svg,'720 400','400 '+H),W=N?400:720;
    const x0=N?20:30,x1=N?380:690,x=y=>lerp(x0,x1,(y-AB_Y0)/(AB_Y1-AB_Y0)),axY=N?(P?230:210):206;
    const yr=lerp(AB_Y0,AB_Y1,t),ph=phaseOf(AB_STEPS,t);
    let s=`<text x="${N?12:20}" y="26" class="t-big">${AB_STEPS[ph].t}</text><text x="${N?12:20}" y="44" class="t-sm">${AB_STEPS[ph].k}</text>`;
    /* lanes for split view */
    if(P){s+=`<rect x="${x0-8}" y="${N?60:56}" width="${x1-x0+16}" height="${axY-(N?66:62)}" rx="10" style="fill:var(--rx-soft);opacity:.45"/><rect x="${x0-8}" y="${axY+8}" width="${x1-x0+16}" height="${H-10-axY-8}" rx="10" style="fill:var(--neuro-soft);opacity:.45"/>`;
      s+=`<text x="${x1}" y="${N?74:70}" class="t-xs t-end" style="fill:var(--rx);font-weight:700">PROPONENTS ARGUE ↑</text><text x="${x1}" y="${H-16}" class="t-xs t-end" style="fill:var(--neuro);font-weight:700">CRITICS ARGUE ↓</text>`}
    /* axis */
    s+=`<line x1="${x0}" x2="${x1}" y1="${axY}" y2="${axY}" style="stroke:var(--muted);stroke-width:1.4"/>`;
    for(let d=1970;d<=2020;d+=10)s+=`<line x1="${f1(x(d))}" x2="${f1(x(d))}" y1="${axY-4}" y2="${axY+4}" style="stroke:var(--muted)"/><text x="${f1(x(d))}" y="${axY+17}" class="t-xs t-mid">${N&&d%20?'':d+'s'}</text>`;
    /* dots for everything already reached */
    AB_IT.forEach(it=>{if(it.y>yr+.01)return;if(!P&&it.k!=='ev')return;if(P&&it.k==='ev')return;
      const on=it.s===ph,dy=P?(it.k==='pro'?-7:7):0;
      s+=`<circle cx="${f1(x(it.y))}" cy="${axY+dy}" r="${on?5:3.4}" style="fill:${colOf(it.k)};opacity:${on?1:.45}"/>`});
    /* cursor */
    s+=`<line x1="${f1(x(yr))}" x2="${f1(x(yr))}" y1="${axY-14}" y2="${axY+14}" style="stroke:var(--brand);stroke-width:2.4"/><text x="${f1(clamp(x(yr),x0+16,x1-16))}" y="${axY+33}" class="t-sm t-mid" style="fill:var(--brand);font-weight:700">${Math.round(yr)}</text>`;
    /* labels for the current era */
    const all=AB_IT.filter(it=>it.s===ph);
    if(!P){const ev=all.filter(i=>i.k==='ev').sort((a,b)=>a.y-b.y);s+=rows(ev,x,axY-20-(ev.length-1)*(N?20:21),1,N,W,axY-6)}
    else{const pro=all.filter(i=>i.k==='pro').sort((a,b)=>b.y-a.y),cr=all.filter(i=>i.k==='crit').sort((a,b)=>a.y-b.y);
      s+=rows(pro,x,axY-22,-1,N,W,axY-10);s+=rows(cr,x,axY+(N?58:56),1,N,W,axY+10)}
    /* detail below the axis in events view */
    if(!P){const dy=axY+(N?56:52);
      if(ph===1){const H=[['Lovaas 1987',40,'var(--accent)'],['UK programmes 2001',32,'var(--accent)'],['Smith RCT 2000',24.52,'var(--accent)'],['Rogers RCT arm B',25,'var(--rx)'],['Rogers RCT arm A',15,'var(--rx)']];
        const bw=N?200:300,lx=N?12:150;s+=`<text x="${lx}" y="${dy}" class="t-xs" style="font-weight:700;fill:var(--ink)">Hours per week</text>`;
        H.forEach((h,j)=>{const yy=dy+14+j*(N?22:20),k=ramp(t,AB_STEPS[1].from+.01*j,AB_STEPS[1].from+.03+.01*j);
          s+=`<text x="${lx}" y="${yy+8}" class="t-xs">${h[0]}</text><rect x="${lx+(N?120:130)}" y="${yy}" width="${f1(bw*h[1]/40*k)}" height="10" rx="3" style="fill:${h[2]}"/><text x="${f1(lx+(N?124:134)+bw*h[1]/40*k)}" y="${yy+8}" class="t-xs" style="fill:var(--ink)">${h[1]}</text>`});
        s+=`<text x="${lx}" y="${dy+(N?130:122)}" class="t-xs">Green bars: one RCT, 15 vs 25 h/week; no main effect.</text>`}
      else if(ph===5){const B=[['Cochrane EIBI: randomised studies',1,5,'1 of 5'],['ABA journal studies with a COI author (2026)',.93,1,'93%'],['"No COI" statements that were false (2026)',.93,1,'93%']];
        const lx=N?12:150,bw=N?370:420;B.forEach((b,j)=>{const yy=dy+j*(N?38:36);
          s+=`<text x="${lx}" y="${yy}" class="t-xs" style="fill:var(--ink)">${b[0]}</text><rect x="${lx}" y="${yy+5}" width="${bw}" height="9" rx="4" style="fill:var(--panel-2)"/><rect x="${lx}" y="${yy+5}" width="${f1(bw*b[1]/b[2]*ramp(t,AB_STEPS[5].from,AB_STEPS[5].from+.04))}" height="9" rx="4" style="fill:var(--accent)"/><text x="${lx+bw}" y="${yy}" class="t-xs t-end" style="font-weight:700;fill:var(--ink)">${b[3]}</text>`})}
      else s+=`<text x="${N?12:x0}" y="${dy}" class="t-xs">${N?'Switch the view to see each side’s arguments.':'Switch to “Proponents | critics” to see each side’s arguments for this era.'}</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#abNote').innerHTML=noteHTML(AB_STEPS[ph]);
  }
  const stop=playWire(rg,$('#abPlay'),draw,30000,'Replay','aba');
  setSt=stepWire($('#abSteps'),AB_STEPS,rg,draw,stop);
  $$('[data-abv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.abv;$$('[data-abv]').forEach(q=>q.setAttribute('aria-pressed',q===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ===== ABC analyser ===== */
  const as=$('#abcSvg');let fn='sens';
  function wrap(txt,n){const w=txt.split(' '),L=[];let l='';w.forEach(q=>{if((l+' '+q).trim().length>n){L.push(l.trim());l=q}else l+=' '+q});if(l.trim())L.push(l.trim());return L}
  function drawABC(){
    const N=vb(as,'720 300','400 600'),F=AB_FN[fn];let s=`<defs>${marker('abAr','var(--muted)')}</defs>`;
    const box=N?[[14,14,372,180],[14,214,372,170],[14,404,372,180]]:[[10,10,224,280],[248,10,224,280],[486,10,224,280]];
    const ttl=['A · Antecedent','B · Behaviour','C · Consequence'],cols=['var(--accent)','var(--brand)','var(--rx)'];
    box.forEach(([bx,by,bw,bh],i)=>{s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" style="fill:var(--panel);stroke:${cols[i]};stroke-width:1.6"/><text x="${bx+12}" y="${by+20}" class="t-xs" style="fill:${cols[i]};font-weight:700;letter-spacing:.08em">${ttl[i].toUpperCase()}</text>`;
      if(i<2)s+=N?`<line x1="200" x2="200" y1="${by+bh+2}" y2="${by+bh+18}" style="stroke:var(--muted);stroke-width:1.6" marker-end="url(#abAr)"/>`:`<line x1="${bx+bw+2}" x2="${bx+bw+12}" y1="150" y2="150" style="stroke:var(--muted);stroke-width:1.6" marker-end="url(#abAr)"/>`});
    const tw=(i,lines,dy)=>{const [bx,by]=box[i];return lines.map((l,j)=>`<text x="${bx+12}" y="${by+dy+j*15}" class="t-sm" style="fill:var(--ink)">${l}</text>`).join('')};
    const nc=N?44:26;
    /* A: classroom */
    const [ax,ay]=box[0];
    s+=tw(0,wrap(F.a,nc),40);
    const sy=N?ay+110:ay+150;
    if(fn==='sens')for(let k=0;k<3;k++)s+=wave(ax+30,sy-20+k*20,N?150:170,6+k*2,{freq:5,phase:k*.3,sw:1.4});
    else if(fn==='esc')s+=`<rect x="${ax+40}" y="${sy-30}" width="70" height="52" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/>${[0,1,2,3].map(j=>`<line x1="${ax+48}" x2="${ax+100}" y1="${sy-18+j*10}" y2="${sy-18+j*10}" style="stroke:var(--muted)"/>`).join('')}`+face(ax+150,sy-4,18,{mouth:'flat',brows:'tense'});
    else if(fn==='att')s+=face(ax+50,sy-4,16,{gaze:0})+face(ax+100,sy-4,14,{gaze:180})+face(ax+170,sy+6,16,{gaze:90,mouth:'flat'});
    else s+=`<rect x="${ax+40}" y="${sy-28}" width="60" height="44" rx="6" style="fill:var(--ink);opacity:.85"/><rect x="${ax+45}" y="${sy-23}" width="50" height="34" rx="3" style="fill:var(--accent-soft)"/>`+face(ax+160,sy-4,18,{gaze:180,mouth:'flat'});
    s+=`<text x="${ax+12}" y="${box[0][1]+box[0][3]-14}" class="t-xs">then: ${F.a2.toLowerCase()}</text>`;
    /* B: leaving */
    const [bx2,by2,bw2]=box[1];s+=tw(1,wrap(F.b,nc),40);
    const dx=N?bx2+260:bx2+150,dyy=N?by2+80:by2+120;
    s+=`<rect x="${dx}" y="${dyy-10}" width="44" height="80" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/><circle cx="${dx+36}" cy="${dyy+32}" r="2.5" style="fill:var(--muted)"/>`;
    s+=face(N?bx2+90:bx2+70,dyy+20,20,{gaze:0,mouth:fn==='sens'?'wavy':'flat',brows:'tense',ear:false});
    if(fn==='sens')[-1,1].forEach(k=>s+=`<rect x="${(N?bx2+90:bx2+70)+k*22-5}" y="${dyy+12}" width="10" height="16" rx="4" style="fill:var(--skin);stroke:var(--hair)"/>`);
    s+=`<line x1="${N?bx2+120:bx2+96}" x2="${dx-8}" y1="${dyy+30}" y2="${dyy+30}" style="stroke:var(--brand);stroke-width:2" marker-end="url(#abAr)"/>`;
    /* C */
    const [cx,cy]=box[2];s+=tw(2,wrap(F.c,nc),40);
    s+=`<text x="${cx+12}" y="${cy+(N?96:110)}" class="t-xs" style="font-weight:700;fill:var(--ink)">What the behaviour may achieve:</text>`;
    s+=wrap(F.h.replace('Function: ',''),nc).map((l,j)=>`<text x="${cx+12}" y="${cy+(N?114:128)+j*14}" class="t-sm" style="fill:var(--rx)">${l}</text>`).join('');
    s+=`<text x="${cx+12}" y="${cy+(N?146:200)}" class="t-xs" style="font-weight:700;fill:var(--ink)">Test the hypothesis:</text>`;
    s+=wrap(F.q,nc).map((l,j)=>`<text x="${cx+12}" y="${cy+(N?162:216)+j*14}" class="t-xs">${l}</text>`).join('');
    as.innerHTML=s;
    $('#abcNote').innerHTML=`<div class="kicker">ABC · ${F.n}</div><h4>${F.h}</h4><p>A functional assessment looks for patterns across many episodes and checks for pain, illness or distress first. If this were the function, respectful, assent-based support might include:</p><ul>${F.sup.map(x=>`<li>${x}</li>`).join('')}</ul><div class="hook"><b>Exam hook</b>The same behaviour can serve different functions, so the same "leaving the room" needs different supports. Functional analysis tests this by changing one condition at a time. [[Iwata1994,Hanley2003]]</div>`;
  }
  $$('[data-abf]').forEach(b=>b.addEventListener('click',()=>{fn=b.dataset.abf;$$('[data-abf]').forEach(q=>q.setAttribute('aria-pressed',q===b));drawABC()}));
  drawABC();
  redraws.aba=(p=>()=>{p&&p();drawABC()})(redraws.aba);
};
