/* =============== 3.3 Schema therapy & TFP =============== */
inits.schema=()=>{
  const svg=$('#scSvg'),rg=$('#scT');let view='st',setSt=()=>{};
  /* ---------- schema-mode stage ---------- */
  const MODES=[
    {k:'vc',n:['Vulnerable','child'],c:'var(--mood)',kid:1,say:['Everyone leaves.','I am all alone.']},
    {k:'ac',n:['Angry /','impulsive','child'],c:'var(--storm)',kid:1,say:['How dare they!','I will show them.']},
    {k:'pp',n:['Punitive','parent'],c:'var(--med)',say:['You are too much.','You deserve this.']},
    {k:'dp',n:['Detached','protector'],c:'var(--muted)',say:['Feel nothing.','Shut it all off.']},
    {k:'ha',n:['Healthy','adult'],c:'var(--accent)',say:['That hurt. I can','ask what happened.']}
  ];
  const ST=[
    {from:0,at:.06,k:'The trigger',t:'A text cancels the plans',
     txt:`A friend cancels plans by text an hour before. Young's schema-mode model proposes that people with BPD flip between four maladaptive modes: the abandoned/abused ("vulnerable") child, the angry/impulsive child, the punitive parent and the detached protector. [[Arntz2005Modes]] The healthy adult mode, on the right, starts small: it was lowest in BPD and highest in non-patients in two experimental studies. [[Arntz2005Modes,Lobbestael2005]]`,
     pt:`Schema therapy describes "modes": different states, almost like different parts of you, that can take over in a moment of stress.`,
     hook:`BPD modes: detached protector, punitive parent, abandoned/abused child, angry/impulsive child; healthy adult is weak. [[Arntz2005Modes]]`},
    {from:.16,at:.22,k:'Mode 1',t:'The vulnerable child',
     txt:`The first mode to step forward is the abandoned or abused child: the hurt, frightened state that reads the cancelled plan as being left. [[Arntz2005Modes]] The same four modes were found in BPD in a second study. [[Lobbestael2005]]`,
     pt:`A small disappointment can feel like being abandoned. That is the "vulnerable child" mode speaking.`,
     hook:`Lobbestael 2005: the four BPD modes replicated; healthy adult low in BPD, high in non-patients. [[Lobbestael2005]]`},
    {from:.3,at:.36,k:'Mode 2',t:'The angry/impulsive child',
     txt:`Hurt flips into rage or urgent impulses. The angry/impulsive child mode is one of the four that people with BPD scored highest on. [[Arntz2005Modes]] The arrows show modes handing over to each other: the model is about flipping between states, not a fixed type.`,
     pt:`Hurt can turn into anger very fast, with an urge to do something right now.`,
     hook:`The schema-mode model is about flipping between states: people with BPD scored highest on all four maladaptive modes. [[Arntz2005Modes]]`},
    {from:.44,at:.5,k:'Mode 3',t:'The punitive parent',
     txt:`After the anger, an inner critic turns on the person: harsh, punishing, self-blaming. People with BPD scored highest on this mode alongside the other three maladaptive ones. [[Arntz2005Modes]]`,
     pt:`A harsh inner voice can follow: "You ruin everything." Schema therapy names this the "punitive parent".`,
     hook:`Punitive parent = the self-punishing inner critic mode. [[Arntz2005Modes]]`},
    {from:.58,at:.64,k:'Mode 4',t:'The detached protector',
     txt:`Finally everything shuts down: numbness, withdrawal, nothing felt. In the experimental test, a stress film raised the detached protector mode more in people with BPD than in either control group. [[Arntz2005Modes]]`,
     pt:`When it all gets too much, you may go numb or switch off. That shutdown is the "detached protector".`,
     hook:`Arntz 2005: stress raised the detached protector more in BPD than in controls. [[Arntz2005Modes]]`},
    {from:.72,at:.9,k:'Years of therapy',t:'Growing the healthy adult',
     txt:`Over sessions the healthy adult grows and the other modes quieten (schematic). Trials used long, frequent therapy: twice a week for 3 years. [[GiesenBloo2006]] After 1.5 years of schema therapy in regular care, 42% had recovered from BPD. [[Nadort2009]] Combined group and individual schema therapy beat usual care on BPD severity (d 1.14). [[Arntz2022GST]] The technique names that appear are labels for orientation only; this companion's sources do not describe how each one works.`,
     pt:`Therapy aims to make the calm, caring "healthy adult" side stronger, so it can look after the hurt parts instead of being overrun by them.`,
     hook:`Schema therapy evidence: beat TFP on recovery over 3 years (RR 2.18); combined individual + group beat usual care. [[GiesenBloo2006,Arntz2022GST]]`}
  ];
  const TFP=[
    {from:0,at:.08,k:'The model',t:'A split inner world',
     txt:`TFP comes from Kernberg's 1967 description of "borderline personality organization": a middle level of personality organisation marked by primitive defences such as splitting and projective identification, identity diffusion and lapses in reality testing. [[Kernberg1967,Gunderson2009Ontogeny]] The drawing shows splitting as two halves held apart: an all-good picture of self and other, and an all-bad one.`,
     pt:`Splitting means seeing yourself or someone else as all good or all bad, with nothing in between, and flipping from one to the other.`,
     hook:`Kernberg 1967, borderline personality organisation: splitting, projective identification, identity diffusion, lapses in reality testing. [[Kernberg1967]]`},
    {from:.2,at:.28,k:'All-good',t:'Idealisation',
     txt:`While the good half is lit, the other person is perfect and the self is loved. Because the bad half is kept separate, it cannot temper the picture. This is a schematic of the model, not a measured process. [[Kernberg1967]]`,
     pt:`Someone new can seem perfect, the one person who really understands you.`,
     hook:`Splitting keeps contradictory images apart; idealisation and devaluation are its two faces.`},
    {from:.4,at:.48,k:'All-bad',t:'The flip',
     txt:`One frustration and the same person flips into the all-bad half: cruel, rejecting, and the self worthless. In a three-way trial, only TFP changed irritability and verbal and direct assault. [[Clarkin2007]]`,
     pt:`After one letdown, the same person can suddenly seem all bad, and you may feel all bad too.`,
     hook:`Clarkin 2007 (TFP vs DBT vs supportive therapy, 90 patients): all improved; TFP and DBT improved suicidality; only TFP changed irritability and assault measures. [[Clarkin2007]]`},
    {from:.6,at:.67,k:'The frame',t:'A contract around the therapy',
     txt:`The dashed border is a schematic frame around the therapy (its terms are not described in this companion's sources). A one-year trial against experienced community psychotherapists found less dropout (38.5% vs 67.3%), fewer suicide attempts (d 0.8) and fewer inpatient admissions (d 0.5) with TFP; self-harm did not change in either group. [[Doering2010]]`,
     pt:`TFP is a structured, long-term therapy, and it kept more people in treatment than usual therapy in one trial.`,
     hook:`Doering 2010: TFP dropout 38.5% vs 67.3% with community therapists; borderline symptoms d 1.6. [[Doering2010]]`},
    {from:.78,at:.92,k:'Integration',t:'Halves come together',
     txt:`The aim drawn here is integration: the two halves slide together into one whole picture in which the same person can be both loving and disappointing. In the Dutch head-to-head trial both TFP and schema therapy helped on all measures, though schema therapy did better on recovery and TFP had a higher dropout risk. [[GiesenBloo2006]]`,
     pt:`Getting better can mean seeing people, and yourself, as mixed: good and bad at once, and still worth keeping.`,
     hook:`Giesen-Bloo 2006: both improved; schema therapy > TFP on recovery (RR 2.18) and retention. [[GiesenBloo2006]]`}
  ];
  const CAP={st:'<b>Schematic.</b> The figures and their activation bars illustrate the schema-mode model; they are not measurements. Mode names: [[Arntz2005Modes]].',
    tfp:'<b>Schematic.</b> The halves illustrate Kernberg\'s model of splitting; the drawing is not a measured process. [[Kernberg1967]]'};
  /* activation 0..1 of each mode at time t (schematic) */
  function act(i,t){const pk=[.22,.36,.5,.64][i],ther=ramp(t,.72,.98);
    if(i===4)return lerp(.18,1,ease(ther));
    let a=.12+.88*Math.exp(-Math.pow((t-pk)/.07,2));
    if(i===3&&t>.6&&t<.74)a=Math.max(a,.85);
    if(t<.12)a=.12;
    return clamp(lerp(a,.14,ease(ther)))}
  function drawST(t,N){let o='';const p=phaseOf(ST,t);
    const W=N?400:720,xs=N?[44,122,200,278,356]:[90,225,360,495,630],base=N?300:282,ther=ramp(t,.72,.98);
    /* trigger card */
    o+=`<rect x="${N?20:200}" y="${N?16:14}" width="${N?360:320}" height="34" rx="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    o+=`<text x="${W/2}" y="${N?37:35}" class="t-sm t-mid" style="fill:var(--ink)">${ther>0?'Therapy: '+f1(ther*3)+' of 3 years, twice weekly':'Trigger: "Sorry, can\'t make it tonight."'}</text>`;
    /* stage floor */
    o+=`<path d="M${N?10:30} ${base+8}H${W-(N?10:30)}" style="stroke:var(--line);stroke-width:2"/>`;
    let active=-1;if(p>=1&&p<=4)active=p-1;
    /* hand-over arrows between successive modes */
    const SZ=MODES.map((m,i)=>{const on=i===active||(i===4&&p===5);return (m.kid?(N?52:78):(N?66:100))*(i===4?lerp(.62,1.3,ease(ther)):1)*(on?1.12:1)});
    for(let i=0;i<3;i++){if(p>=i+2&&p<=4){const y=base-(N?96:132);o+=`<path d="M${xs[i]+18} ${y}Q${(xs[i]+xs[i+1])/2} ${y-18} ${xs[i+1]-18} ${y}" class="arrow" style="stroke:var(--storm);opacity:.6" marker-end="url(#scAr)"/>`}}
    MODES.forEach((m,i)=>{const a=act(i,t),on=i===active||(i===4&&p===5),sz=SZ[i],
        fy=base-sz+(on?6:0);
      o+=`<g style="opacity:${f1(.35+.65*a)}">`+person(xs[i],fy,sz,m.c)+'</g>';
      if(on&&i<4)o+=`<ellipse cx="${xs[i]}" cy="${base+8}" rx="${f1(sz*.45)}" ry="5" style="fill:${m.c};opacity:.35"/>`;
      m.n.forEach((ln,j)=>o+=`<text x="${xs[i]}" y="${base+24+j*12}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${ln}</text>`);
      const bw=N?56:80,by=base+60;
      o+=`<rect x="${xs[i]-bw/2}" y="${by}" width="${bw}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${xs[i]-bw/2}" y="${by}" width="${f1(bw*a)}" height="6" rx="3" style="fill:${m.c}"/>`});
    o+=`<text x="${N?10:30}" y="${base+82}" class="t-xs">bars: how active each mode is (schematic)</text>`;
    /* speech bubble of the active mode */
    const si=p===5?4:active;
    if(si>=0){const m=MODES[si],bw=N?190:200,bx=clamp(xs[si]-bw/2,N?6:20,W-bw-(N?6:20)),by=N?68:70;
      o+=bubble(bx,by,bw,44,{tx:xs[si],ty:base-SZ[si]+2,lines:m.say,col:m.c})}
    /* therapy technique labels */
    if(p===5){const L=['limited reparenting','imagery rescripting','chair work'];
      L.forEach((s,i)=>{const a=ramp(t,.76+i*.05,.8+i*.05);if(!a)return;const x=N?20:40,y=(N?140:150)+i*18;
        o+=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--accent);opacity:${f1(a)}">◆ ${s}</text>`});
      o+=`<text x="${N?20:40}" y="${(N?140:150)+56}" class="t-xs" style="opacity:${f1(ramp(t,.9,.94))}">technique names, for orientation</text>`}
    return {o,p}}
  /* ---------- TFP stage ---------- */
  function drawTFP(t,N){let o='';const p=phaseOf(TFP,t);
    const W=N?400:720,cx=W/2,cy=N?250:205,R=N?110:120,gap=lerp(N?40:110,0,ease(ramp(t,.8,.96))),
      litG=p===1?1:p===4?.8:.35,litB=p===2?1:p===4?.8:.35,mix=ease(ramp(t,.86,.98));
    if(p>=3){const fr=R+gap+(N?26:34);o+=`<rect x="${f1(cx-fr-(N?0:40))}" y="${f1(cy-R-(N?44:46))}" width="${f1(2*fr+(N?0:80))}" height="${f1(2*R+(N?88:92))}" rx="18" style="fill:none;stroke:var(--rx);stroke-width:1.6;stroke-dasharray:7 5;opacity:${f1(ramp(t,.6,.64))}"/>`;
      o+=`<text x="${cx}" y="${f1(cy-R-(N?30:30))}" class="t-xs t-mid" style="fill:var(--rx);opacity:${f1(ramp(t,.6,.64))}">treatment frame / contract (schematic)</text>`}
    const half=(side,col,lit,lab,sl,ol)=>{const x=cx+side*gap,d=side<0?`M${f1(x)} ${f1(cy-R)}A${R} ${R} 0 0 0 ${f1(x)} ${f1(cy+R)}Z`:`M${f1(x)} ${f1(cy-R)}A${R} ${R} 0 0 1 ${f1(x)} ${f1(cy+R)}Z`;
      let s=`<path d="${d}" style="fill:${col};opacity:${f1(.12+.3*lit)};stroke:${col};stroke-width:${lit>.9?2.4:1.4}"/>`;
      const px=x+side*R*.5;
      s+=person(px-(N?20:24),cy-(N?44:46),N?36:40,'var(--self)',{op:.4+.6*lit})+person(px+(N?20:24),cy-(N?44:46),N?36:40,'var(--other)',{op:.4+.6*lit});
      s+=`<text x="${f1(px)}" y="${f1(cy+14)}" class="t-sm t-mid" style="fill:${col};font-weight:600">${lab}</text>`;
      s+=`<text x="${f1(px)}" y="${f1(cy+32)}" class="t-xs t-mid" style="fill:var(--ink)">self: ${sl}</text><text x="${f1(px)}" y="${f1(cy+46)}" class="t-xs t-mid" style="fill:var(--ink)">other: ${ol}</text>`;
      return s};
    o+=half(-1,'var(--accent)',litG,'ALL-GOOD','loved','perfect');
    o+=half(1,'var(--storm)',litB,'ALL-BAD','worthless','cruel');
    if(gap>2)o+=`<line x1="${cx}" x2="${cx}" y1="${f1(cy-R+10)}" y2="${f1(cy+R-10)}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 4;opacity:${f1(gap/(N?40:110))}"/><text x="${cx}" y="${f1(cy+R+16)}" class="t-xs t-mid" style="opacity:${f1(gap/(N?40:110))}">split</text>`;
    if(mix>0){o+=`<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:var(--brand);stroke-width:${f1(1+2*mix)};opacity:${f1(mix)}"/>`;
      o+=`<text x="${cx}" y="${f1(cy+R+18)}" class="t-sm t-mid" style="fill:var(--brand);opacity:${f1(mix)}">one whole, mixed picture</text>`}
    /* flip arrow while splitting is active */
    if(p===2||p===1){const y=cy-R-(N?14:12);o+=`<path d="M${f1(cx-(N?60:120))} ${y}Q${cx} ${y-24} ${f1(cx+(N?60:120))} ${y}" class="arrow" style="stroke:var(--storm)" marker-end="url(#scAr)"/>`;
      if(p===2)o+=`<text x="${cx}" y="${y-22}" class="t-xs t-mid" style="fill:var(--storm)">one frustration flips the picture</text>`}
    o+=`<text x="${N?20:30}" y="${N?30:28}" class="t-sm" style="fill:var(--ink)">${['How the self and others are held in mind','All-good half lit','All-bad half lit','Agreeing the frame','Integration'][p]}</text>`;
    return {o,p}}
  function draw(t){const N=vb(svg,'720 400','400 '+(view==='st'?'420':'460'));
    const r=view==='st'?drawST(t,N):drawTFP(t,N);
    svg.innerHTML=`<defs>${marker('scAr','var(--storm)')}</defs>`+r.o+`<text x="${N?200:690}" y="${N?(view==='st'?412:452):392}" class="t-xs ${N?'t-mid':'t-end'}" style="fill:var(--warn)">SCHEMATIC</text>`;
    setSt(r.p);const S=(view==='st'?ST:TFP)[r.p];$('#scNote').innerHTML=noteHTML(S);
    if(view==='st'){const top=MODES.map((m,i)=>[act(i,t),i]).sort((a,b)=>b[0]-a[0])[0][1];
      $('#scRead').innerHTML=`<span>leading mode <b>${MODES[top].n.join(' ')}</b></span><span>healthy adult <b>${Math.round(act(4,t)*100)}%</b> (schematic)</span><span>therapy <b>${f1(ramp(t,.72,.98)*3)} of 3 years</b></span>`}
    else $('#scRead').innerHTML=`<span>view <b>${['split','all-good','all-bad','frame','integrating'][r.p]}</b></span><span>trial frequency <b>twice weekly, 3 years</b> (Giesen-Bloo 2006)</span>`;
  }
  const stop=playWire(rg,$('#scPlay'),draw,22000,'Replay','schema');
  function wire(){const old=$('#scSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,view==='st'?ST:TFP,rg,draw,stop)}
  $$('[data-scv]').forEach(b=>b.addEventListener('click',()=>{stop();view=b.dataset.scv;$$('[data-scv]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#scCap').innerHTML=CAP[view];wire();draw(+rg.value)}));
  $('#scCap').innerHTML=CAP.st;wire();draw(+rg.value);

  /* ---------- recovery curves, Giesen-Bloo / van Asselt ---------- */
  const rs=$('#scRec'),rr=$('#scRecT');
  const curve=(E,y)=>E*Math.pow(clamp(y/4),1.5);
  function drawR(u){const N=vb(rs,'600 330','400 380'),Y=u*4;let o='';
    const x0=N?46:60,x1=N?384:570,y0=N?40:36,y1=N?300:270,X=y=>lerp(x0,x1,y/4),V=v=>lerp(y1,y0,v/60);
    o+=`<rect x="${f1(X(0))}" y="${y0}" width="${f1(X(3)-X(0))}" height="${y1-y0}" style="fill:var(--rx-soft);opacity:.55"/><text x="${f1(X(1.5))}" y="${y0+14}" class="t-xs t-mid" style="fill:var(--rx)">treatment: 3 years, twice weekly</text>`;
    [0,20,40,60].forEach(v=>o+=`<line x1="${x0}" x2="${x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [0,1,2,3,4].forEach(y=>o+=`<text x="${f1(X(y))}" y="${y1+15}" class="t-xs t-mid">${y}</text>`);
    o+=`<text x="${x1}" y="${y1+30}" class="t-xs t-end">years since entry</text><text x="${x0}" y="${y0-14}" class="t-xs">RECOVERED FROM BPD</text>`;
    const path=E=>{let d='';for(let i=0;i<=80;i++){const y=Y*i/80;d+=(i?'L':'M')+f1(X(y))+' '+f1(V(curve(E,y)))}return d};
    o+=`<path d="${path(52)}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/><path d="${path(29)}" style="fill:none;stroke:var(--storm);stroke-width:2.6;stroke-dasharray:6 4"/>`;
    if(Y>=3){o+=`<line x1="${f1(X(3))}" x2="${f1(X(3))}" y1="${y0+20}" y2="${y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(X(3)-5)}" y="${f1(V(46))}" class="t-xs t-end" style="fill:var(--ink)">3 years: RR 2.18</text><text x="${f1(X(3)-5)}" y="${f1(V(46)+12)}" class="t-xs t-end">for recovery, P = .04</text>`}
    if(Y>=3.98){[[52,'var(--accent)','52%'],[29,'var(--storm)','29%']].forEach(([v,c,l])=>{o+=`<circle cx="${f1(X(4))}" cy="${f1(V(v))}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(X(4)-10)}" y="${f1(V(v)-9)}" class="t-xs t-end" style="fill:${c};font-weight:600">${l}</text>`})}
    o+=`<rect x="${x0+8}" y="${y0+26}" width="10" height="3" style="fill:var(--accent)"/><text x="${x0+22}" y="${y0+30}" class="t-xs">schema therapy</text><rect x="${x0+8}" y="${y0+40}" width="10" height="3" style="fill:var(--storm)"/><text x="${x0+22}" y="${y0+44}" class="t-xs">TFP</text>`;
    rs.innerHTML=o;
    $('#scRecRead').innerHTML=`<span>year <b>${f1(Y)}</b></span>`+(Y>=3.98?`<span>recovered <b>52% vs 29%</b></span><span>mean 4-year cost <b>EUR 37,826 vs 46,795</b></span>`:`<span>4-year values appear at year 4</span>`);
  }
  playWire(rr,$('#scRecPlay'),drawR,7000,'Replay','schema');
  drawR(+rr.value);
  $('#scRecNote').innerHTML=noteHTML({k:'Giesen-Bloo 2006 · 88 patients',t:'Schema therapy recovered more people',
    txt:`After 3 years, more schema therapy patients had recovered (relative risk 2.18; P = .04) or reliably improved (relative risk 2.33; P = .009), and TFP carried a higher dropout risk (P = .01). [[GiesenBloo2006]] The cost-effectiveness paper reported 52% vs 29% recovered over 4 years, at lower mean cost with schema therapy. [[vanAsselt2008]]`,
    pt:`In this trial, about half the people in schema therapy had recovered after 4 years, compared with about 3 in 10 in TFP. Both groups improved.`,
    hook:`Giesen-Bloo 2006: schema therapy beat TFP on recovery (RR 2.18) and retention. Note: a commonly quoted "45.5% vs 23.8%" is not in the abstract; the checked figures are RR 2.18 and 52% vs 29% at 4 years. [[GiesenBloo2006,vanAsselt2008]]`});

  /* ---------- Arntz 2022 group schema therapy ---------- */
  const gs=$('#scGst');let gv='eff';
  function drawG(){const N=vb(gs,'600 290',gv==='eff'?'400 420':'400 320');let o='';const W=N?400:600,x0=N?16:24,x1=W-(N?16:24);
    if(gv==='eff'){const R=[['Either schema format vs usual care',.73,.29,1.18],['IGST vs usual care',1.14],['IGST vs PGST',.84],['PGST vs usual care',.3,-.29,.89]];
      const lx0=N?x0+20:x0+230,lx1=x1-(N?20:20),X=v=>lerp(lx0,lx1,(v+.5)/2),rh=N?84:56,top=N?40:36;
      o+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${top-10}" y2="${top+R.length*rh}" style="stroke:var(--ink);stroke-dasharray:3 3"/>`;
      [-.5,0,.5,1,1.5].forEach(v=>o+=`<text x="${f1(X(v))}" y="${top+R.length*rh+14}" class="t-xs t-mid">${v}</text>`);
      o+=`<text x="${f1((lx0+lx1)/2)}" y="${top+R.length*rh+28}" class="t-xs t-mid">Cohen d for BPD severity (right = first arm better)</text>`;
      R.forEach((r,i)=>{const y=top+i*rh,cy=y+(N?30:4);o+=`<text x="${x0}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
        if(r.length>2)o+=`<line x1="${f1(X(r[2]))}" x2="${f1(X(r[3]))}" y1="${cy}" y2="${cy}" style="stroke:var(--rx);stroke-width:2"/>`;
        o+=`<rect x="${f1(X(r[1])-5)}" y="${cy-5}" width="10" height="10" style="fill:var(--rx)"/><text x="${f1(clamp(X(r[1]),lx0+70,lx1-70))}" y="${cy+20}" class="t-xs t-mid" style="fill:var(--ink)">d ${r[1]}${r.length>2?` (${r[2]} to ${r[3]})`:' (CI not in abstract)'}</text>`});
      $('#scGstCap').innerHTML='Mainly-group schema therapy alone did not beat usual care: its interval crosses zero. Combined individual and group schema therapy did best. [[Arntz2022GST]]'}
    else{const A=[['IGST · individual + group',.82,.74],['PGST · mainly group',.72,.62],['Optimal usual care',.73,.64]],top=N?44:40,rh=N?90:66,bx0=N?x0:x0+190,bw=x1-bx0-90;
      o+=`<text x="${x0}" y="${top-18}" class="t-xs">PROPORTION STILL IN TREATMENT</text>`;
      A.forEach((a,i)=>{const y=top+i*rh;o+=`<text x="${x0}" y="${y+(N?4:16)}" class="t-xs" style="fill:var(--ink)">${a[0]}</text>`;
        [[a[1],'1 year',1],[a[2],'2 years',.6]].forEach(([v,l,op],j)=>{const yy=y+(N?12:6)+j*(N?20:18);
          o+=`<rect x="${bx0}" y="${yy}" width="${f1(bw*v)}" height="13" rx="3" style="fill:${i===0?'var(--rx)':i===1?'var(--accent)':'var(--muted)'};opacity:${op}"/><text x="${f1(bx0+bw*v+6)}" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${v.toFixed(2)} · ${l}</text>`})});
      $('#scGstCap').innerHTML='Retention at 1 and 2 years as published. Population statistics, not individual predictions. [[Arntz2022GST]] Schema therapy had the lowest dropout overall in a survival meta-analysis; group formats had the highest. [[Arntz2023Dropout]]'}
    gs.innerHTML=o}
  $$('[data-scg]').forEach(b=>b.addEventListener('click',()=>{gv=b.dataset.scg;$$('[data-scg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawG()}));
  redraws.schema=(prev=>()=>{prev&&prev();drawG()})(redraws.schema);
  drawG();
};
