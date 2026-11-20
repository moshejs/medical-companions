/* =============== 3.1 Joints & dislocations =============== */
inits.joints=()=>{
  const svg=$('#joSvg'),rg=$('#joT'),mu=$('#joM');
  let jt='shoulder';

  /* ---------- per-joint labels and facts (every number cited in the readout) ---------- */
  const JOINTS={
    shoulder:{n:'Shoulder',prox:'humeral head',dist:'glenoid socket',s:1,ang:14,dir:'downward and forward',
      read:`<span>HSD shoulder trial: <b>25%</b> of those with mechanical symptoms had dislocated before; <b>64%</b> said it felt loose [[Liaghat2022APMR]]</span><span>WOSI <b>49.9</b> in JHS/hEDS vs <b>83.3</b> in controls (higher is better) [[Johannessen2016]]</span>`},
    knee:{n:'Knee',prox:'femur',dist:'tibia',s:1,ang:-10,dir:'sideways and into extension',
      read:`<span>knee movement noticed later than controls at <b>30°</b> and <b>5°</b> of flexion [[Hall1995]]</span><span>commonest presenting site in children with EDS: <b>43.4%</b> [[Stern2017]]</span>`},
    patella:{n:'Kneecap',prox:'femoral groove',dist:'patella',s:1,ang:0,dir:'outward (laterally)',
      read:`<span>patellofemoral instability with a joint hypermobility syndrome diagnosis: <b>aOR 11.40</b> at 1 year [[Kutschke2024]]</span><span>with an EDS diagnosis: <b>aOR 16.32</b> [[Kutschke2024]]</span>`},
    finger:{n:'Finger',prox:'proximal phalanx',dist:'middle phalanx',s:.72,ang:-18,dir:'backward (into hyperextension)',
      read:`<span>finger position-matching errors larger than controls at <b>every angle</b> [[Mallik1994]]</span><span>digits among the commonest dislocation sites in cEDS [[Ritelli2020C]]</span>`}};

  const STEPS=[
    {from:0,at:.12,k:'Phase 1 · load',t:'Load arrives',
     txt:`A joint is held by its shape, by passive restraints (the capsule and ligaments) and by active ones (muscles). In EDS these passive tissues are built from connective tissue that is looser or weaker than usual, and the molecular cause of hEDS is still unknown. Tendons are measurably softer: in 25 women with hEDS, Achilles tendon stiffness was lower than in 25 matched controls, and in classical EDS patellar tendon stiffness was about half that of controls. [[Malfait2020,Rombaut2012Tendon,Nielsen2014]]`,
     pt:`Joints are held together by "straps" (ligaments and the joint capsule) and by muscles. In EDS the straps are stretchier, so the muscles have more work to do.`,
     hook:`hEDS: lower Achilles tendon stiffness and lower passive muscle tension than controls (25 vs 25 women). [[Rombaut2012Tendon]]`},
    {from:.2,at:.32,k:'Phase 2 · end of range',t:'End of range',
     txt:`With typical tissue the capsule and ligaments come taut near the end of range and stop the movement while the joint surfaces stay centred. With lax tissue the capsule is longer and thinner, so it takes up slack later: in 100 hip-arthroscopy patients a Beighton score of 4 or more went with a capsule thinner than 10 mm. The brain also gets a blurrier signal: in women with hypermobility syndrome, knee movements had to be larger before they were noticed, and the usual sharpening of position sense near full extension was missing. [[Devitt2017,Hall1995]]`,
     pt:`Loose straps tighten late, and loose joints send a fuzzy "where am I?" signal to the brain. So a joint can drift too far before anything stops it.`,
     hook:`Proprioception: poorer lower-limb joint position sense in benign joint hypermobility syndrome (meta-analysis, 5 studies, 254 people). [[Smith2013BJHS]]`},
    {from:.4,at:.52,k:'Phase 3 · subluxation',t:'Subluxation',
     txt:`Under more load the lax joint keeps sliding: the surfaces move partly apart but keep some contact. In imaging studies of hEDS/HSD with multidirectional shoulder instability, the humeral head moved more than in controls during simple exercises, and holding a 2 kg dumbbell or rotating the arm outward translated it downward. Subluxations were reported by 29.3% of 75 people with classical EDS. [[Spanhove2020,Ritelli2020C]]`,
     pt:`A subluxation is a partial slip: the joint shifts part of the way out and usually slides back. People often describe a clunk or a feeling that the joint "gave way".`,
     hook:`Multidirectional shoulder instability in hEDS/HSD: lower scapular upward rotation and higher infraspinatus, middle trapezius and posterior deltoid activity. [[Spanhove2022]]`},
    {from:.6,at:.74,k:'Phase 4 · dislocation',t:'Dislocation',
     txt:`If the load keeps going, contact is lost: a dislocation. In 75 people with classical EDS, 21.3% had dislocated a joint (34.1% of adults, 3.2% of children), mostly the shoulder, digits, hip, radius and clavicle. Joint hypermobility, subluxations and dislocations are the core of the hEDS picture, and in an Italian hEDS/JHS cohort the rate and sites of instability did not change with age. [[Ritelli2020C,Tinkle2017,Morlino2017]]`,
     pt:`A dislocation means the joint has come fully out. In EDS this can happen with much less force than people expect.`,
     hook:`Patellofemoral instability: aOR 11.40 with a joint hypermobility syndrome diagnosis and 16.32 with EDS at 1 year (US claims, 91,747 people). [[Kutschke2024]]`},
    {from:.8,at:.95,k:'Phase 5 · reduction',t:'Reduction, and what muscles add',
     txt:`In classical EDS most dislocations went back by themselves; 6.7% had a fixed dislocation that did not. Muscles are the restraint that can be trained. Women with hEDS had 30% to 49% lower knee strength than controls with similar muscle mass, and strength tracked chair-rise, walking and daily function. Drag the muscle slider up and replay: the lax joint stops at a subluxation. That is the rationale for strength and control programmes, shown here as an illustration, not a measured effect. [[Ritelli2020C,Rombaut2012Strength,Scheper2017Strength]]`,
     pt:`Most slipped joints in EDS go back on their own. Stronger, better-controlled muscles act like extra straps, which is why exercise with a physiotherapist who knows hypermobility is the main treatment.`,
     hook:`Women with hEDS: 30–49% lower knee strength with normal muscle mass, suggesting muscle dysfunction rather than reduced mass. [[Rombaut2012Strength]]`}];
  const setSt=stepWire($('#joSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- the timeline: load, and how far the lax joint would slide with no muscle help ---------- */
  const loadOf=t=>ease(ramp(t,0,.16))*(1-ease(ramp(t,.82,.92)));
  function baseSlip(t){
    if(t<.2)return .06*ramp(t,0,.2);
    if(t<.4)return lerp(.06,.22,ramp(t,.2,.4));
    if(t<.6)return lerp(.22,.55,ease(ramp(t,.4,.58)));
    if(t<.8)return lerp(.55,1,ease(ramp(t,.6,.74)));
    return lerp(1,0,ease(ramp(t,.82,.96)))}
  const stateOf=(sl,red)=>sl<.1?['centred','var(--good)']:sl<.32?[red?'back in place':'shifting','var(--warn)']:sl<.72?[red?'reducing':'subluxed','var(--variant)']:[red?'reducing':'dislocated','var(--bad)'];

  /* ---------- kneecap seen from below (axial view) ---------- */
  function patella(x,y,s,o){const sl=clamp(o.slip||0),lax=clamp(o.lax||0),m=clamp(o.muscle||0),S=v=>f1(v*s);
    const px=x+sl*64*s,py=y-30*s-10*s*Math.sin(Math.PI*Math.min(1,sl*1.4))+sl*6*s,rot=sl*28;let g='';
    /* femoral condyles with the trochlear groove; lateral side (right) is higher */
    g+=`<path d="M${f1(x-72*s)} ${f1(y+46*s)}L${f1(x-70*s)} ${f1(y-4*s)}Q${f1(x-58*s)} ${f1(y-22*s)} ${f1(x-34*s)} ${f1(y-16*s)}Q${f1(x-12*s)} ${f1(y-8*s)} ${f1(x)} ${f1(y+2*s)}Q${f1(x+14*s)} ${f1(y-12*s)} ${f1(x+38*s)} ${f1(y-24*s)}Q${f1(x+62*s)} ${f1(y-26*s)} ${f1(x+72*s)} ${f1(y-4*s)}L${f1(x+74*s)} ${f1(y+46*s)}Q${f1(x)} ${f1(y+62*s)} ${f1(x-72*s)} ${f1(y+46*s)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/>`;
    g+=`<path d="M${f1(x-62*s)} ${f1(y-15*s)}Q${f1(x-40*s)} ${f1(y-20*s)} ${f1(x-34*s)} ${f1(y-15*s)}Q${f1(x-12*s)} ${f1(y-6*s)} ${f1(x)} ${f1(y+3*s)}Q${f1(x+14*s)} ${f1(y-10*s)} ${f1(x+38*s)} ${f1(y-22*s)}Q${f1(x+58*s)} ${f1(y-24*s)} ${f1(x+66*s)} ${f1(y-14*s)}" style="fill:none;stroke:var(--cartilage);stroke-width:${S(3.4)}"/>`;
    /* medial vastus pulling medially */
    if(m>0)g+=`<path d="M${f1(x-96*s)} ${f1(y-74*s)}Q${f1(x-60*s)} ${f1(y-52*s)} ${f1(px-20*s)} ${f1(py-6*s)}" style="fill:none;stroke:var(--muscle);stroke-width:${f1((4+m*10)*s)};stroke-linecap:round;opacity:.6"/>`;
    /* retinacula: medial (left) stretches as the patella slides out */
    [[-1,x-70*s,y-2*s],[1,x+72*s,y-2*s]].forEach(([sd,ax,ay])=>{const bx=px+sd*24*s,by=py+2*s,mx=(ax+bx)/2,my=Math.min(ay,by)-(sd<0?(8+lax*16)*(1-sl*.7):6+lax*10)*s;
      g+=`<path d="M${f1(ax)} ${f1(ay)}Q${f1(mx)} ${f1(my)} ${f1(bx)} ${f1(by)}" style="fill:none;stroke:var(--capsule);stroke-width:${f1(2.4*s+.4)};stroke-linecap:round;${lax>.3?`stroke-dasharray:${f1(5*s)} ${f1(2.2*s*lax)}`:''}"/>`});
    g+=`<g transform="translate(${f1(px)} ${f1(py)}) rotate(${f1(rot)})"><path d="M${S(-26)} ${S(6)}Q${S(-22)} ${S(-20)} 0 ${S(-22)}Q${S(22)} ${S(-20)} ${S(26)} ${S(6)}Q${S(0)} ${S(-4)} ${S(-26)} ${S(6)}Z" style="fill:var(--bone);stroke:var(--bone-line);stroke-width:1.3"/><path d="M${S(-22)} ${S(4)}Q0 ${S(-5)} ${S(22)} ${S(4)}" style="fill:none;stroke:var(--cartilage);stroke-width:${S(3)}"/></g>`;
    if(o.hl)g+=`<circle cx="${f1(x+sl*32*s)}" cy="${f1(y-16*s)}" r="${S(46)}" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3"/>`;
    g+=`<text x="${f1(x-70*s)}" y="${f1(y+62*s)}" class="t-xs">medial</text><text x="${f1(x+74*s)}" y="${f1(y+62*s)}" class="t-xs t-end">lateral</text>`;
    return g}

  /* ---------- one joint panel ---------- */
  function panel(cx,cy,s,o,J,load,title,lax,N){let g='';const sc=s*J.s;
    if(jt==='patella')g+=patella(cx,cy+20*s,s,o);
    else g+=joint(cx,cy,sc,o);
    /* load arrow on the distal part */
    if(load>.02){let ax,ay,dx,dy;
      if(jt==='patella'){ax=cx+o.slip*64*s+14*s;ay=cy-14*s;dx=1;dy=0}
      else{const tx=o.slip*30*sc,rad=(o.ang||0)*Math.PI/180;ax=cx+tx-Math.sin(rad)*82*sc;ay=cy+Math.cos(rad)*82*sc;dx=jt==='finger'?0:.8;dy=jt==='finger'?-1:.6}
      const L=(14+34*load)*s;g+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(ax+dx*L)}" y2="${f1(ay+dy*L)}" style="stroke:var(--vas);stroke-width:3;stroke-linecap:round" marker-end="url(#joArr)"/>`}
    const hy=cy-(jt==='patella'?92:104)*s,st=stateOf(o.slip,o.red);
    g+=`<text x="${cx}" y="${f1(hy)}" class="t-lbl t-mid" style="fill:${lax?'var(--variant)':'var(--ink)'}">${title}</text>`;
    const by=cy+(jt==='patella'?110:116)*s;
    g+=`<rect x="${f1(cx-58)}" y="${f1(by-14)}" width="116" height="20" rx="10" style="fill:var(--panel);stroke:${st[1]};stroke-width:1.4"/><text x="${cx}" y="${f1(by)}" class="t-sm t-mid" style="fill:${st[1]};font-weight:600">${st[0]}</text>`;
    if(jt!=='patella'&&!N){g+=`<text x="${f1(cx+24*sc)}" y="${f1(cy-60*sc)}" class="t-xs">${J.prox}</text><text x="${f1(cx+20*sc+o.slip*30*sc)}" y="${f1(cy+70*sc)}" class="t-xs">${J.dist}</text>`}
    return g}
  function bar(x,y,w,v,lbl,col,txt){return `<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${lbl}</text><rect x="${x}" y="${y+5}" width="${w}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x}" y="${y+5}" width="${f1(Math.max(0,w*clamp(v)))}" height="10" rx="5" style="fill:${col}"/><text x="${x+w}" y="${y}" class="t-sm t-end" style="fill:var(--ink);font-weight:600">${txt}</text>`}

  /* ---------- the scene ---------- */
  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,J=JOINTS[jt],m=+mu.value;
    const ph=phaseOf(STEPS,t),load=loadOf(t),base=baseSlip(t),red=t>=.8;
    const slipLax=base*(1-.62*m),slipTyp=.05*load;
    const oT={slip:slipTyp,lax:.3*(1-load),ang:J.ang*load,muscle:.45,red};
    const oL={slip:slipLax,lax:.6+.35*ramp(base,0,1),ang:J.ang*load+(jt==='finger'?-14:8)*base*(1-.5*m),muscle:m,red,hl:slipLax>.5};
    let s=`<defs>${marker('joArr','var(--vas)')}</defs>`;
    s+=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text><text x="${W-16}" y="28" class="t-sm t-end">${J.n} · ${ph+1} / 5</text>`;
    if(N){
      s+=`<line x1="200" y1="56" x2="200" y2="318" class="grid"/>`;
      s+=panel(102,196,1,oT,J,load,'Typical tissue',false,N)+panel(298,196,1,oL,J,load,'Lax tissue',true,N);
      const gx=24,gw=352;let y=372;
      s+=`<text x="${gx}" y="${y-14}" class="t-sm" style="font-weight:600">LOAD ${J.dir.toUpperCase()}</text>`;
      s+=bar(gx,y,gw,load,'load (schematic)','var(--vas)',Math.round(load*100)+'%');y+=38;
      s+=bar(gx,y,gw,1-slipTyp*1.05,'joint-surface contact · typical','var(--good)',Math.round(clamp(1-slipTyp*1.05)*100)+'%');y+=38;
      s+=bar(gx,y,gw,1-slipLax*1.05,'joint-surface contact · lax','var(--variant)',Math.round(clamp(1-slipLax*1.05)*100)+'%');y+=38;
      s+=bar(gx,y,gw,m,'muscle co-contraction (slider)','var(--muscle)',Math.round(m*100)+'%');y+=40;
      s+=`<text x="${gx}" y="${y}" class="t-sm">Illustrative values. Muscle help shrinks</text><text x="${gx}" y="${y+15}" class="t-sm">the lax joint's slide.</text>`;
    }else{
      s+=`<line x1="270" y1="52" x2="270" y2="352" class="grid"/><line x1="510" y1="52" x2="510" y2="352" class="grid"/>`;
      s+=panel(140,200,1.1,oT,J,load,'Typical tissue',false,N)+panel(390,200,1.1,oL,J,load,'Lax tissue',true,N);
      const gx=532,gw=170;let y=74;
      s+=`<text x="${gx}" y="${y-14}" class="t-sm" style="font-weight:600">GAUGES</text>`;
      s+=bar(gx,y,gw,load,'load','var(--vas)',Math.round(load*100)+'%');y+=44;
      s+=bar(gx,y,gw,1-slipTyp*1.05,'contact · typical','var(--good)',Math.round(clamp(1-slipTyp*1.05)*100)+'%');y+=44;
      s+=bar(gx,y,gw,1-slipLax*1.05,'contact · lax','var(--variant)',Math.round(clamp(1-slipLax*1.05)*100)+'%');y+=44;
      s+=bar(gx,y,gw,m,'muscle co-contraction','var(--muscle)',Math.round(m*100)+'%');y+=50;
      s+=`<text x="${gx}" y="${y}" class="t-xs" style="fill:var(--ink)">Load pulls ${J.dir.split(' (')[0]}.</text>`;
      s+=`<text x="${gx}" y="${y+16}" class="t-xs">Values are illustrative.</text>`;
      s+=`<text x="${gx}" y="${y+32}" class="t-xs">Raise muscle control and</text><text x="${gx}" y="${y+46}" class="t-xs">replay: the lax joint stops</text><text x="${gx}" y="${y+60}" class="t-xs">at a subluxation.</text>`;
    }
    svg.innerHTML=s;setSt(ph);
    $('#joNote').innerHTML=noteHTML(STEPS[ph]);
    $('#joRead').innerHTML=J.read;
    $('#joMv').textContent=m<.34?'low':m<.67?'moderate':'trained';
  }
  const stop=playWire(rg,$('#joPlay'),draw,16000,'%t:player.replay%','joints');
  mu.addEventListener('input',()=>draw(+rg.value));
  $$('[data-jojoint]').forEach(b=>b.addEventListener('click',()=>{jt=b.dataset.jojoint;$$('[data-jojoint]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- body map ---------- */
  const map=$('#joMap');let layer='disl',sel='shoulder';
  /* v: value for shading (0..1), lbl: short value label; d: detail html */
  const SITES=[
    {id:'jaw',n:'Jaw (TMJ)',x:180,y:66,disl:{v:.6,l:'reported'},pain:null,kids:null,
     d:`Among 42 people with hypermobility from inherited connective tissue disease (Marfan or EDS), 71.4% had temporomandibular disorder symptoms and 85.7% had disc displacement with reduction. Recurrent jaw dislocations were more frequent than in controls (P &lt; .01). [[DeCoster2005]]`},
    {id:'neck',n:'Neck',x:180,y:90,disl:null,pain:{v:.76,l:'76%'},kids:null,
     d:`Neck pain was reported by 76% in an online survey of 396 people (80% hEDS) and by 90% vs 27% of controls in a Norwegian survey. Claims about craniocervical instability lack agreed imaging criteria; the evidence is level III–V. [[TeranWodzinski2023,Johannessen2016,Lohkamp2022]]`},
    {id:'shoulder',n:'Shoulder',x:136,y:112,mirror:1,disl:{v:1,l:'main site'},pain:{v:.6,l:'60%'},kids:{v:.312,l:'31.2%'},
     d:`A main dislocation site in classical EDS. In 100 adults with HSD and shoulder complaints, 67 had mechanical symptoms; of those, 25% had dislocated before and 64% said the shoulder felt loose. Shoulder pain: 60% in an adult survey; 31.2% of children with EDS presented with it. [[Ritelli2020C,Liaghat2022APMR,TeranWodzinski2023,Stern2017]]`},
    {id:'clav',n:'Collarbone (clavicle)',x:158,y:98,disl:{v:1,l:'main site'},pain:null,kids:null,
     d:`The clavicle is named among the main dislocation sites in 75 people with classical EDS. [[Ritelli2020C]]`},
    {id:'upback',n:'Upper back',x:180,y:136,disl:null,pain:{v:.66,l:'66%'},kids:null,
     d:`Upper-back pain: 66% in the 2023 online survey (396 analysed, self-selected). [[TeranWodzinski2023]]`},
    {id:'elbow',n:'Elbow and radius',x:120,y:172,mirror:1,disl:{v:1,l:'main site'},pain:null,kids:null,
     d:`The radius is named among the main dislocation sites in classical EDS. [[Ritelli2020C]]`},
    {id:'lowback',n:'Lower back',x:180,y:190,disl:{v:.45,l:'described'},pain:{v:.76,l:'76%'},kids:{v:.322,l:'32.2%'},
     d:`Lower-back pain: 76% in the adult survey; the back was the presenting site for 32.2% of 205 children with EDS. Early disc degeneration and segmental instability are described in a consensus review without epidemiological data (Hypothesis). [[TeranWodzinski2023,Stern2017,Henderson2017]]`},
    {id:'fingers',n:'Fingers and thumb',x:104,y:246,mirror:1,disl:{v:1,l:'main site'},pain:null,kids:null,
     d:`Digits are among the main dislocation sites in classical EDS. Finger position sense is impaired, and thumb-base osteoarthritis is the clearest osteoarthritis link with hypermobility. [[Ritelli2020C,Mallik1994,Jonsson1996]]`},
    {id:'hip',n:'Hip',x:160,y:224,mirror:1,disl:{v:1,l:'main site'},pain:{v:.6,l:'60%'},kids:null,
     d:`A main dislocation site in classical EDS; hip pain was reported by 60% in the adult survey. After total hip replacement, 2 of 13 people with EDS dislocated vs 5.1% of controls (very small sample). [[Ritelli2020C,TeranWodzinski2023,Guier2020]]`},
    {id:'knee',n:'Knee',x:160,y:318,mirror:1,disl:{v:.55,l:'instability'},pain:{v:.64,l:'64%'},kids:{v:.434,l:'43.4%'},
     d:`The commonest presenting site in 205 children with EDS (43.4%). Knee pain: 64% in the adult survey. Hypermobility at 13.8 years predicted knee pain at 17.8 years (OR 1.83), more so with obesity. Knee position sense is reduced. [[Stern2017,TeranWodzinski2023,Tobias2013,Hall1995]]`},
    {id:'patella',n:'Kneecap (patella)',x:200,y:298,disl:{v:1,l:'aOR 16.3'},pain:null,kids:null,
     d:`In a US claims database of 91,747 people, patellofemoral instability had aOR 11.40 with a joint hypermobility syndrome diagnosis and 16.32 with EDS at 1 year. [[Kutschke2024]]`},
    {id:'ankle',n:'Ankle and foot',x:158,y:404,mirror:1,disl:{v:.35,l:'sprains'},pain:null,kids:null,
     d:`Sprains were reported by 59.1% of adults and 25.8% of children with classical EDS, and 82.7% had bilateral flat feet. Hypermobility at 13.8 years predicted ankle/foot pain at 17.8 years (OR 1.82). [[Ritelli2020C,Tobias2013]]`}];
  const LAY={disl:{t:'Instability & dislocation',lo:'reported',hi:'main site',src:`Dark: named among the main dislocation sites in 75 people with classical EDS; lighter: instability or dislocation reported in other studies. [[Ritelli2020C,Kutschke2024,DeCoster2005]]`},
             pain:{t:'Pain sites, adults',lo:'0%',hi:'100%',src:`Share reporting pain at each site in an online survey of 396 people, 80% with hEDS (self-selected). [[TeranWodzinski2023]]`},
             kids:{t:'Presenting sites, children',lo:'0%',hi:'50%',src:`Presenting site in 205 children with EDS aged 6–19 seen in orthopaedic or sports clinics. [[Stern2017]]`}};
  function bodyPath(){const P=(x,y)=>x+' '+y;
    return `<circle cx="180" cy="44" r="24" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>
      <path d="M${P(170,66)}L${P(170,80)}L${P(190,80)}L${P(190,66)}Z" style="fill:var(--panel-2)"/>
      <path d="M${P(132,96)}Q${P(180,84)} ${P(228,96)}L${P(214,226)}Q${P(180,236)} ${P(146,226)}Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`+
      [[`M134 104L118 172L104 246`],[`M226 104L242 172L256 246`],[`M162 228L160 318L158 404`],[`M198 228L200 318L202 404`]].map(d=>`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:24;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:20;stroke-linecap:round;stroke-linejoin:round"/>`).join('')}
  function drawMap(){let s=bodyPath();
    const pts=[];SITES.forEach(S=>{pts.push({S,x:S.x,y:S.y});if(S.mirror)pts.push({S,x:360-S.x,y:S.y})});
    pts.forEach(({S,x,y})=>{const L=S[layer],v=L?L.v:0,on=S.id===sel,r=on?13:10;
      const fill=L?`color-mix(in srgb, var(--vas) ${Math.round(18+v*82)}%, var(--panel))`:'var(--panel)';
      s+=`<g class="clk" data-josite="${S.id}" tabindex="0" role="button" aria-label="${S.n}${L?': '+L.l:': no data in this layer'}" aria-pressed="${on}">`;
      s+=`<circle class="ring" cx="${x}" cy="${y}" r="${r}" style="fill:${fill};stroke:${on?'var(--ink)':L?'var(--vas)':'var(--muted)'};stroke-width:${on?2.4:1.3};${L?'':'stroke-dasharray:3 2'}"/>`;
      s+=`</g>`});
    /* value labels for the selected layer, once per site */
    SITES.forEach(S=>{const L=S[layer];if(!L)return;const px=S.mirror?360-S.x:S.x,r=S.id===sel?13:10;
      s+=`<line x1="${px+r}" y1="${S.y}" x2="282" y2="${S.y}" style="stroke:var(--muted);stroke-width:.8;stroke-dasharray:2 2"/><text x="286" y="${S.y+4}" class="t-xs" style="fill:var(--ink);font-weight:600">${L.l}</text>`});
    map.innerHTML=s;
    const S=SITES.find(z=>z.id===sel),L=S[layer];
    $('#joMapNote').innerHTML=`<div class="kicker">${LAY[layer].t}</div><h4>${S.n}</h4><p><b>${L?L.l:'No figure in this layer'}</b></p><p>${S.d}</p><p class="stage-cap">${LAY[layer].src}</p>`;
    $('#joScale').innerHTML=`<span>${LAY[layer].lo}</span><i></i><span>${LAY[layer].hi}</span><span>· dashed ring: no data in this layer</span>`}
  map.addEventListener('click',e=>{const g=e.target.closest('[data-josite]');if(!g)return;sel=g.dataset.josite;drawMap();const f=map.querySelector(`[data-josite="${sel}"]`);f&&f.focus()});
  map.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-josite]');if(!g)return;e.preventDefault();sel=g.dataset.josite;drawMap();const f=map.querySelector(`[data-josite="${sel}"]`);f&&f.focus()});
  $$('[data-jolayer]').forEach(b=>b.addEventListener('click',()=>{layer=b.dataset.jolayer;$$('[data-jolayer]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMap()}));
  drawMap();
};
