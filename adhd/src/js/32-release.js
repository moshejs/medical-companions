/* =============== 3.2 Formulations & the daily curve =============== */
inits.release=()=>{
  const H0=6,H1=30,L2=Math.LN2;
  const hOf=t=>H0+(H1-H0)*t, tOf=h=>(h-H0)/(H1-H0);
  const hhmm=h=>{const x=((h%24)+24)%24,H=Math.floor(x),M=Math.round((x-H)*60)%60;return String(M===0&&x-H>.99?H+1:H).padStart(2,'0')+':'+String(M).padStart(2,'0')};
  /* absorption rate constant that gives a stated Tmax for a one-compartment model */
  const kaFor=(tmax,ke)=>{let lo=ke*1.0001,hi=60;for(let i=0;i<80;i++){const m=(lo+hi)/2,tm=Math.log(m/ke)/(m-ke);if(tm>tmax)lo=m;else hi=m}return (lo+hi)/2};
  /* Euler simulation from 18:00 the evening before to 06:00 the next morning; returns rows of (hour, level, prodrug) scaled to the curve's own peak */
  function sim(F){const dt=.02,out=[];let C=0,P=0;
    const g=F.doses.map(d=>{const o=Object.assign({A:0,on:false},d);if(d.shape){let a=0;for(let i=1;i<d.shape.length;i++){const [x0,y0]=d.shape[i-1],[x1,y1]=d.shape[i];a+=(y0+y1)/2*(x1-x0)}o.k=d.amt/a}return o});
    const rate=(d,u)=>{const s=d.shape;if(u<s[0][0]||u>s[s.length-1][0])return 0;for(let i=1;i<s.length;i++)if(u<=s[i][0]){const [x0,y0]=s[i-1],[x1,y1]=s[i];return d.k*(y0+(y1-y0)*(u-x0)/(x1-x0))}return 0};
    let n=0;for(let h=-6;h<=H1+1e-4;h+=dt,n++){let inp=0;
      g.forEach(d=>{if(d.shape){inp+=rate(d,h-d.t0);return}const st=d.t0+(d.lag||0);if(!d.on&&h>=st){d.on=true;d.A=d.amt}if(d.on){const r=d.ka*d.A;d.A-=r*dt;inp+=r}});
      if(F.kc){P+=(inp-F.kc*P)*dt;C+=(F.kc*P-F.ke*C)*dt}else C+=(inp-F.ke*C)*dt;
      if(n%5===0&&h>=H0-1e-6)out.push([h,C,P])}
    const mc=Math.max(...out.map(p=>p[1])),mp=Math.max(1e-9,...out.map(p=>p[2]));
    return out.map(p=>[p[0],p[1]/mc,F.kc?p[2]/mp*.62:0])}
  const k=hl=>L2/hl;
  const F={
    mphir:{n:'IR methylphenidate ×3',s:'IR MPH ×3',pill:'tab',ke:k(3),dose:[7,11,15],
      mk(){return{ke:this.ke,doses:[7,11,15].map(t=>({t0:t,amt:1,ka:kaFor(2,this.ke)}))}},
      anch:[{h:9,l:'peak ≈2 h after each tablet'},{h:15,l:'3rd dose'}],win:null,
      info:`<b class="n">Immediate-release methylphenidate (Ritalin)</b><span>A tablet that releases everything at once: peak about 2 hours after a 10 mg tablet in adults, 1.9 hours in children; food has no relevant effect. The label starts children at 5 mg twice daily (before breakfast and lunch); adults average 20–30 mg/day in 2–3 doses. Drawn here as three doses 4 hours apart (half-life 3.0 h), the comparison arm of Concerta's label study. [[FDA-RitalinC,FDA-Concerta]]</span>`},
    oros:{n:'OROS methylphenidate',s:'OROS MPH',pill:'er',ke:k(3.5),dose:[7],
      mk(){return{ke:this.ke,doses:[{t0:7,amt:.22,ka:kaFor(1,this.ke)},{t0:7,amt:.78,shape:[[.5,0],[5.2,1],[7,.55],[8.6,0]]}]}},
      anch:[{h:8,l:'initial max ≈1 h'},{h:13.8,l:'Tmax 6.8 h (18 mg, adults)'}],win:{a:7,b:19,l:'effect maintained through 12 h (paediatric trials)'},
      info:`<b class="n">OROS methylphenidate (Concerta)</b><span>An extended-release tablet: 22% of its methylphenidate is available for immediate release and 78% for extended release. Plasma levels make "an initial maximum concentration at about 1 hour", then rise gradually over 5 to 9 hours; mean Tmax was 6 to 10 hours across doses. It must be swallowed whole with liquids. [[FDA-Concerta]]</span>`},
    beads:{n:'Biphasic bead capsule',s:'beads',pill:'beads',ke:k(2.2),dose:[7],
      mk(){return{ke:this.ke,doses:[{t0:7,amt:.5,ka:kaFor(1.5,this.ke)},{t0:7,lag:4.9,amt:.5,ka:kaFor(1.6,this.ke)}]}},
      anch:[{h:8.5,l:'peak 1 · 1.5 h'},{h:13.5,l:'peak 2 · ≈6.5 h'}],win:null,
      info:`<b class="n">Bead capsules (Ritalin LA, Focalin XR)</b><span>Two bead populations, one released at once and one later, give a bimodal profile with two peaks about 4 hours apart. Focalin XR's first peak comes at 1.5 hours (range 1–4) and its second at about 6.5 hours (range 4.5–7). Drawn with dexmethylphenidate's half-life of about 2.2 hours. Both capsules may be opened and sprinkled on applesauce. [[FDA-RitalinLA,FDA-FocalinXR,FDA-Focalin]]</span>`},
    masxr:{n:'Mixed amphetamine salts XR',s:'MAS XR',pill:'beads',ke:k(10),dose:[7],
      mk(){return{ke:this.ke,doses:[{t0:7,amt:.5,ka:kaFor(3,this.ke)},{t0:7,lag:4.5,amt:.5,ka:kaFor(3,this.ke)}]}},
      anch:[{h:14,l:'Tmax ≈7 h'}],win:null,
      info:`<b class="n">Mixed amphetamine salts XR (Adderall XR)</b><span>d- and l-amphetamine in a 3:1 ratio, in two kinds of bead. Peak about 7 hours, about 4 hours later than the IR tablet; a 20 mg XR dose gave plasma profiles comparable to 10 mg IR twice daily, 4 hours apart. The d-amphetamine half-life is 10 h in adults and 9 h in children aged 6–12, which is why the tail is long. [[FDA-AdderallXR,FDA-Adderall]]</span>`},
    ldx:{n:'Lisdexamfetamine',s:'LDX',pill:'cap',ke:k(9),kc:k(.8),dose:[7],
      mk(){return{ke:this.ke,kc:this.kc,doses:[{t0:7,amt:1,ka:2.2}]}},
      anch:[{h:8,l:'prodrug peak ≈1 h',pro:1},{h:10.5,l:'d-amphetamine ≈3.5 h'}],win:{a:9,b:19,l:'significant vs placebo 2–12 h (children)'},
      info:`<b class="n">Lisdexamfetamine (Vyvanse)</b><span>A prodrug: lisdexamfetamine itself (dashed) peaks at about 1 hour and has a half-life under 1 hour, while red blood cells convert it to dextroamphetamine (solid), which peaks at about 3.5 hours in children aged 6–12 (fasted) with a half-life of 8.6–9.5 hours. The rate of conversion, not the capsule, shapes the curve. [[FDA-Vyvanse]]</span>`},
    jornay:{n:'Evening DR/ER methylphenidate',s:'Jornay PM',pill:'cap',ke:k(5.9),dose:[-4],
      mk(){return{ke:this.ke,doses:[{t0:-4,lag:9.6,amt:1,ka:kaFor(4.2,this.ke)}]}},
      anch:[{h:10,l:'Tmax 14 h after a 20:00 dose'}],win:null,
      info:`<b class="n">Delayed-release, extended-release methylphenidate (Jornay PM)</b><span>Taken only in the evening, between 6:30 p.m. and 9:30 p.m. After a lag period it makes a single peak with a median Tmax of 14.0 hours, so the level climbs overnight toward the morning; its apparent half-life in adults is about 5.9 hours. Drawn here with the dose at 20:00 the evening before. [[FDA-JornayPM]]</span>`}
  };
  Object.values(F).forEach(f=>{f.pts=sim(f.mk())});
  const lv=(f,h)=>{const P=f.pts,i=clamp(Math.round((h-H0)/.1),0,P.length-1);return P[i]};
  const EV=[{a:8.5,b:15,n:'School',l:'08:30–15:00'},{a:16,b:18,n:'Homework',l:'16:00–18:00'},{a:19,b:20,n:'Evening drive',l:'19:00–20:00'},{a:22,b:30,n:'Sleep',l:'22:00–06:00'}];
  const word=v=>v>=.6?'high':v>=.3?'moderate':'low';
  const STEPS=[
    {from:0,at:tOf(7.7),k:'07:00 · the morning dose',t:'Absorption: the curve starts to rise',
     txt:`A swallowed dose has to dissolve and be absorbed before anything happens. Immediate-release methylphenidate peaks about 2 hours after a 10 mg tablet in adults and at 1.9 hours (range 0.3–4.4) in children. Only part of the dose reaches the blood: absolute bioavailability is 22 ± 8% for d-methylphenidate. In the Vyvanse classroom study, the effect was significant from hour 2 but not at hour 1. [[FDA-RitalinC,FDA-Vyvanse]]`,
     pt:`A pill does not work the moment it is swallowed. The level in the blood takes an hour or two to climb.`,
     hook:`Tmax: IR methylphenidate ≈2 h, IR mixed amphetamine salts ≈3 h, lisdexamfetamine's d-amphetamine ≈3.5 h in children. [[FDA-RitalinC,FDA-Adderall,FDA-Vyvanse]]`},
    {from:tOf(8.4),at:tOf(10.5),k:'08:30–12:00 · school morning',t:'One dose, different mornings',
     txt:`Long-acting products differ most in the morning. Concerta gives a small early maximum at about 1 hour from the 22% available at once, then rises gradually as the other 78% is released. Bead capsules make two peaks about 4 hours apart (Focalin XR 1.5 and ≈6.5 hours). Lisdexamfetamine rises smoothly because conversion in the blood limits the rate. [[FDA-Concerta,FDA-FocalinXR,FDA-Vyvanse]]`,
     pt:`Long-acting forms build a second dose into the first, so there is no lunchtime pill to remember.`,
     hook:`Concerta: 22% immediate, 78% extended release; swallow whole, never split, crush or chew. [[FDA-Concerta]]`},
    {from:tOf(12),at:tOf(13.5),k:'12:00–15:00 · afternoon',t:'Where IR needs a second and third dose',
     txt:`In 36 healthy adults, one 18 mg Concerta dose and three 5 mg IR methylphenidate doses 4 hours apart gave similar exposure: Cmax 3.7 vs 4.2 ng/mL, Tmax 6.8 vs 6.5 hours, half-life 3.5 vs 3.0 hours. In the same way, 20 mg Adderall XR gave plasma profiles comparable to 10 mg IR twice daily, 4 hours apart. [[FDA-Concerta,FDA-AdderallXR]]`,
     pt:`Short-acting tablets wear off within hours, so they are taken two or three times a day.`,
     hook:`Adderall XR 20 mg once ≈ Adderall IR 10 mg twice, 4 hours apart; XR peaks ≈7 h, about 4 h later than IR. [[FDA-AdderallXR]]`},
    {from:tOf(15.5),at:tOf(17),k:'16:00–18:00 · homework',t:'How long does the effect last?',
     txt:`Labels anchor duration to trials. Concerta's paediatric results "were maintained through 12 hours after dosing". Vyvanse beat placebo from hour 2 to hour 12 in a classroom study in children, and at every point from 2 to 14 hours in an adult workplace simulation. Mydayis is taken on waking "because the effects may last up to 16 hours". Half-life matters too: d-amphetamine lasts 9 hours in children aged 6–12 and 10 in adults, because children clear more per kg of body weight. [[FDA-Concerta,FDA-Vyvanse,FDA-Mydayis,FDA-AdderallXR]]`,
     pt:`Homework comes late in the day. Whether the medicine still covers it depends on the product, the time it was taken, and the person.`,
     hook:`Effect windows on labels: Concerta through 12 h; Vyvanse 2–12 h (children), 2–14 h (adults); Mydayis up to 16 h. [[FDA-Concerta,FDA-Vyvanse,FDA-Mydayis]]`},
    {from:tOf(18.6),at:tOf(19.5),k:'19:00–20:00 · evening drive',t:'Teen drivers and the evening gap',
     txt:`A systematic review of 15 randomised trials found that stimulants generally improved driving in simulators or cars, especially in teenagers and young adults. Immediate-release methylphenidate lost its effect in the evening, and extended-release mixed amphetamine salts worsened evening driving. The AAP gives "special concern" to medication coverage while adolescents drive, and notes that longer-acting or late-afternoon short-acting doses may help. [[Gobbo2014,Wolraich2019]]`,
     pt:`If a teenager drives in the evening, when the medicine is taken matters as much as which one.`,
     hook:`AAP 2019: "special concern" for medication coverage while adolescents with ADHD drive. [[Wolraich2019]]`},
    {from:tOf(21.4),at:tOf(22.6),k:'22:00 · bedtime',t:'Sleep and the late dose',
     txt:`The Vyvanse and Adderall XR labels say afternoon doses should be avoided because of the potential for insomnia. In a meta-analysis of objective sleep studies, stimulants lengthened the time to fall asleep (effect size 0.54) and shortened total sleep (−0.59). Jornay PM turns this around on purpose: it is taken between 6:30 and 9:30 p.m., stays low through the night after a lag, and peaks the next morning (median Tmax 14 hours). [[FDA-Vyvanse,FDA-AdderallXR,Kidwell2015,FDA-JornayPM]]`,
     pt:`A long-acting dose taken too late in the day can make it hard to fall asleep.`,
     hook:`Jornay PM is the methylphenidate taken in the evening; median Tmax 14 h. [[FDA-JornayPM]]`}
  ];
  const svg=$('#rlSvg'),rg=$('#rlT');let cur='oros',ghost=false,setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 362','400 530'),f=F[cur],hN=hOf(t);
    const L=N?{x0:46,x1:384,y0:78,y1:300,rb0:338,rb1:362,top:24}:{x0:66,x1:700,y0:74,y1:250,rb0:288,rb1:316,top:22};
    const A=axes(L.x0,L.y0,L.x1-L.x0,L.y1-L.y0,{x0:H0,x1:H1,y0:0,y1:1.08,xt:N?[6,12,18,24,30]:[6,9,12,15,18,21,24,27,30],yt:[0,.5,1],fx:v=>String(v%24).padStart(2,'0')+':00',fy:v=>v===1?'peak':v===.5?'½':'0'});
    let s=`<defs>${marker('rlArr','var(--muted)',6)}</defs>`;
    s+=`<text x="${L.x0-(N?40:60)}" y="${L.top}" class="t-sm" style="fill:var(--rx)">${N?f.s.toUpperCase():f.n.toUpperCase()}</text>`;
    s+=`<text x="${L.x0-(N?40:60)}" y="${L.top+15}" class="t-xs" style="fill:var(--warn)">${N?'SCHEMATIC: SHAPE FROM TMAX + HALF-LIFE':'SCHEMATIC SHAPE FROM PUBLISHED TMAX AND HALF-LIFE · scaled to its own peak'}</text>`;
    s+=clock(N?360:676,N?30:30,N?17:19,hN)+`<text x="${N?336:650}" y="${N?35:35}" class="t-big t-end">${hhmm(hN)}</text>`;
    /* night shading */
    s+=`<rect x="${f1(A.X(22))}" y="${L.y0}" width="${f1(A.X(30)-A.X(22))}" height="${L.y1-L.y0}" style="fill:var(--panel-2);opacity:.7"/>`;
    s+=A.svg+`<text x="${L.x0}" y="${L.y0-8}" class="t-xs">relative plasma level</text>`;
    /* label effect window bracket */
    if(f.win&&hN>=f.win.a){const xa=A.X(f.win.a),xb=A.X(Math.min(hN,f.win.b)),y=L.y0+8;
      s+=`<path d="M${f1(xa)} ${y+6}V${y}H${f1(xb)}${hN>=f.win.b?'V'+(y+6):''}" style="fill:none;stroke:var(--good);stroke-width:1.6"/>`;
      if(hN>=f.win.b)s+=`<text x="${f1((xa+A.X(f.win.b))/2)}" y="${y-4}" class="t-xs t-mid" style="fill:var(--good)">${N?f.win.l.replace(' (paediatric trials)','').replace(' (children)',''):f.win.l}</text>`}
    /* ghost comparison */
    if(ghost&&cur!=='mphir')s+=trace(F.mphir.pts.map(p=>[p[0],p[1]]),A.X,A.Y,{c:'var(--muted)',w:1.4,dash:'4 3'});
    /* doses */
    f.dose.forEach(d=>{const dh=d<H0?H0:d;const x=A.X(dh);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y1}" y2="${L.y0+22}" style="stroke:var(--rx);stroke-width:1;stroke-dasharray:2 3;opacity:.6"/>`;
      if(hN>=dh-.01)s+=pill(x,L.y0+30,N?20:22,f.pill,{c:'var(--rx)'})+(d<H0?`<text x="${f1(x+14)}" y="${L.y0+34}" class="t-xs">dose at 20:00 the night before</text>`:'')});
    /* the curve so far */
    if(f.kc)s+=trace(f.pts.map(p=>[p[0],p[2]]),A.X,A.Y,{c:'var(--drug)',w:1.6,dash:'5 3',upto:hN});
    s+=trace(f.pts.map(p=>[p[0],p[1]]),A.X,A.Y,{c:'var(--rx)',w:2.8,area:true,upto:hN});
    const p=lv(f,hN);s+=`<circle cx="${f1(A.X(hN))}" cy="${f1(A.Y(p[1]))}" r="4.5" style="fill:var(--rx);stroke:var(--panel);stroke-width:1.5"/>`;
    s+=`<line x1="${f1(A.X(hN))}" x2="${f1(A.X(hN))}" y1="${L.y0}" y2="${L.rb1}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`;
    /* anchors */
    f.anch.forEach((a,i)=>{if(hN<a.h)return;const v=lv(f,a.h)[a.pro?2:1],x=A.X(a.h),y=A.Y(v);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
      const up=y-L.y0>40,tx=clamp(x,L.x0+60,L.x1-60),ty=up?y-14:y+20;
      s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="${N?'t-xs':'t-sm'} t-mid" style="fill:var(--ink)">${a.l}</text>`});
    /* the day ribbon */
    s+=`<text x="${L.x0}" y="${L.rb0-6}" class="t-xs">${N?'the day · shade = schematic level':'the day · shading = mean schematic level during each block so far'}</text>`;
    const RS=[];
    EV.forEach((e,i)=>{const xa=A.X(e.a),xb=A.X(e.b),seen=hN>e.a;let m=0,c=0;
      if(seen){for(let h=e.a;h<=Math.min(hN,e.b);h+=.1){m+=lv(f,h)[1];c++}m=c?m/c:0}
      s+=`<rect x="${f1(xa)}" y="${L.rb0}" width="${f1(xb-xa)}" height="${L.rb1-L.rb0}" rx="4" style="fill:${seen?'var(--rx)':'none'};opacity:${seen?f1(.18+.72*m):1};stroke:var(--line);stroke-width:1;${seen?'':'stroke-dasharray:3 3'}"/>`;
      if(!N)s+=`<text x="${f1((xa+xb)/2)}" y="${L.rb1+15}" class="t-xs t-mid" style="fill:var(--ink)">${e.n}${seen?' · '+word(m):''}</text>`;
      RS.push([e,seen,m])});
    if(N)RS.forEach(([e,seen,m],i)=>{const y=L.rb1+30+i*30;
      s+=`<rect x="${L.x0-36}" y="${y-12}" width="16" height="16" rx="3" style="fill:${seen?'var(--rx)':'none'};opacity:${seen?f1(.18+.72*m):1};stroke:var(--line)"/>`;
      s+=`<text x="${L.x0-12}" y="${y+1}" class="t-lbl" style="font-size:13px">${e.n}</text><text x="${L.x0+100}" y="${y+1}" class="t-sm">${e.l}</text><text x="${L.x1}" y="${y+1}" class="t-sm t-end" style="fill:var(--ink)">${seen?word(m):'not yet'}</text>`});
    if(N&&f.kc)s+=`<text x="${L.x0-36}" y="${L.rb1+30+4*30}" class="t-xs" style="fill:var(--drug)">dashed: lisdexamfetamine (inactive prodrug)</text>`;
    if(!N&&f.kc)s+=`<text x="${L.x1}" y="${L.rb1+36}" class="t-xs t-end" style="fill:var(--drug)">dashed: lisdexamfetamine, the inactive prodrug · solid: d-amphetamine</text>`;
    if(ghost&&cur!=='mphir')s+=`<text x="${L.x0+(N?-36:0)}" y="${N?L.rb1+30+4*30+(f.kc?16:0):L.rb1+36}" class="t-xs" style="fill:var(--muted)">grey dashed: IR methylphenidate ×3</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);$('#rlNote').innerHTML=noteHTML(STEPS[ph]);
    const tr=lv(f,Math.min(H1,hN+.3))[1]-lv(f,Math.max(H0,hN-.3))[1];
    $('#rlRead').innerHTML=`<span>time <b>${hhmm(hN)}</b></span><span>schematic level <b>${Math.round(p[1]*100)}% of peak</b></span><span>trend <b>${Math.abs(tr)<.012?'steady':tr>0?'rising':'falling'}</b></span><span>formulation <b>${f.n}</b></span>`;
  }
  const stop=playWire(rg,$('#rlPlay'),draw,22000,'Replay','release');
  setSt=stepWire($('#rlSteps'),STEPS,rg,draw,stop);
  const info=()=>{$('#rlInfo').innerHTML=F[cur].info};
  $$('[data-rlf]').forEach(b=>b.addEventListener('click',()=>{stop();cur=b.dataset.rlf;$$('[data-rlf]').forEach(x=>x.setAttribute('aria-pressed',x===b));info();draw(+rg.value)}));
  $('#rlGhost').addEventListener('click',()=>{ghost=!ghost;$('#rlGhost').setAttribute('aria-pressed',ghost);draw(+rg.value)});
  info();draw(+rg.value);

  /* ---- label facts comparator ---- */
  const SB='Stimulant class boxed warning: "Abuse, misuse, and addiction". Schedule II controlled substance in the US.';
  const LB=[
    {id:'ritalin',n:'Ritalin',g:'methylphenidate IR tablet',pill:'tab',c:'[[FDA-RitalinC]]',
     age:'ADHD "in pediatric patients 6 years and older and adults"; also narcolepsy.',
     start:'Children: 5 mg twice daily (before breakfast and lunch), titrated weekly in 5–10 mg steps.',
     max:'Doses above 60 mg/day "not recommended". Adults: average 20–30 mg/day in 2–3 doses, maximum 60 mg/day.',
     freq:'2–3 times a day.',form:'Tablet.',food:'Food has no relevant effect on absorption.',pk:'Tmax about 2 h (adults, 10 mg); 1.9 h in children.'},
    {id:'concerta',n:'Concerta',g:'OROS methylphenidate ER tablet',pill:'er',c:'[[FDA-Concerta]]',
     age:'ADHD "in patients aged 6 to 65 years old".',
     start:'18 mg once daily in patients new to methylphenidate (18 or 36 mg in adults), increased weekly in 18 mg steps.',
     max:'54 mg/day at 6–12 years; 72 mg/day at 13–17 years ("not to exceed 2 mg/kg/day") and in adults.',
     freq:'Once daily.',form:'Swallow whole with liquids; do not split, crush or chew.',food:'A high-fat breakfast did not change its pharmacokinetics.',pk:'22% immediate / 78% extended; initial max ≈1 h, mean Tmax 6–10 h; effect maintained through 12 h.'},
    {id:'ritalinla',n:'Ritalin LA',g:'methylphenidate ER bead capsule',pill:'beads',c:'[[FDA-RitalinLA]]',
     age:'ADHD in children aged 6 to 12 years.',start:'20 mg once daily, increased weekly by 10 mg.',max:'Doses above 60 mg/day are not recommended.',
     freq:'Once daily.',form:'Capsule; may be opened and sprinkled on applesauce.',food:'Not covered in this guide\'s label extract.',pk:'Bimodal: two peaks about 4 h apart.'},
    {id:'focalin',n:'Focalin',g:'dexmethylphenidate IR tablet',pill:'tab',c:'[[FDA-Focalin]]',
     age:'Not covered in this guide\'s label extract.',start:'2.5 mg twice daily in patients new to methylphenidate; patients on racemic methylphenidate start at half their current total daily dose.',
     max:'20 mg/day (10 mg twice daily).',freq:'Twice daily.',form:'Tablet.',food:'A high-fat breakfast delayed Tmax from 1.5 to 2.9 h.',pk:'Tmax ≈1–1.5 h fasted; half-life ≈2.2 h.'},
    {id:'focalinxr',n:'Focalin XR',g:'dexmethylphenidate ER bead capsule',pill:'beads',c:'[[FDA-FocalinXR]]',
     age:'Children and adults (separate starting doses); not recommended under 6 years.',start:'5 mg/day in children, 10 mg/day in adults.',max:'30 mg/day in children, 40 mg/day in adults (maximum recommended).',
     freq:'Once daily.',form:'Capsule; may be sprinkled on applesauce.',food:'Not covered in this guide\'s label extract.',pk:'Peaks at 1.5 h (1–4) and ≈6.5 h (4.5–7).'},
    {id:'jornay',n:'Jornay PM',g:'methylphenidate DR/ER capsule',pill:'cap',c:'[[FDA-JornayPM]]',
     age:'Patients 6 years and older.',start:'20 mg, taken only in the evening between 6:30 p.m. and 9:30 p.m.; may be increased weekly by 20 mg.',max:'100 mg/day.',
     freq:'Once daily, in the evening. "Do not take JORNAY PM in the morning."',form:'Capsule; not swapped mg for mg with other methylphenidate products.',food:'Taken consistently with or without food.',pk:'Lag, then single peak; median Tmax 14.0 h; half-life ≈5.9 h (adults).'},
    {id:'azstarys',n:'Azstarys',g:'serdexmethylphenidate/dexmethylphenidate capsule',pill:'cap',c:'[[FDA-Azstarys]]',
     age:'Patients 6 years and older.',start:'39.2 mg/7.8 mg once daily.',max:'52.3 mg/10.4 mg once daily.',freq:'Once daily.',form:'Capsule (a prodrug plus immediate dexmethylphenidate).',food:'Not covered in this guide\'s label extract.',
     pk:'Dexmethylphenidate from the prodrug peaks ≈8 h; half-lives ≈5.7 h (prodrug) and 11.7 h (dexmethylphenidate) in adults.'},
    {id:'daytrana',n:'Daytrana',g:'methylphenidate transdermal patch',pill:'patch',c:'[[FDA-Daytrana]]',
     age:'Ages 6 to 17.',start:'Nominal delivered doses 10, 15, 20 and 30 mg per 9 hours.',max:'The largest nominal patch delivers 30 mg per 9 hours.',
     freq:'Applied to the hip 2 h before an effect is needed; removed 9 h after application.',form:'Patch. On inflamed skin, Cmax and AUC were about 3-fold higher.',food:'Not applicable (through the skin).',pk:'Peak ≈10 h after a single application, ≈8 h after repeated ones.'},
    {id:'adderall',n:'Adderall',g:'mixed amphetamine salts IR tablet',pill:'tab',c:'[[FDA-Adderall]]',
     age:'"Not recommended for children under 3 years of age".',start:'Ages 3–5: 2.5 mg daily. Ages 6 and older: 5 mg once or twice daily.',max:'"Only in rare cases will it be necessary to exceed a total of 40 mg per day".',
     freq:'Once or twice daily.',form:'Tablet; d- and l-amphetamine 3:1.',food:'Not covered in this guide\'s label extract.',pk:'Peak ≈3 h; half-life 9.77–11 h (d) and 11.5–13.8 h (l).'},
    {id:'adderallxr',n:'Adderall XR',g:'mixed amphetamine salts ER bead capsule',pill:'beads',c:'[[FDA-AdderallXR]]',
     age:'ADHD in adults and children 6 years and older.',start:'Ages 6–12: 10 mg once daily. Recommended adult dose 20 mg/day.',max:'Ages 6–12: 30 mg/day. Not recommended in end-stage renal disease.',
     freq:'Once daily; afternoon doses should be avoided (insomnia).',form:'Capsule; may be opened and sprinkled on applesauce, eaten immediately without chewing the beads.',food:'Not covered in this guide\'s label extract.',pk:'Tmax ≈7 h; d-amphetamine half-life 10 h (adults), 9 h (ages 6–12).'},
    {id:'mydayis',n:'Mydayis',g:'mixed amphetamine salts, triple-bead capsule',pill:'beads',c:'[[FDA-Mydayis]]',
     age:'Patients 13 years and older.',start:'12.5 mg.',max:'50 mg in adults, 25 mg in adolescents.',freq:'Once daily on waking, "because the effects may last up to 16 hours".',form:'Capsule.',
     food:'A high-fat meal prolonged d-amphetamine Tmax from 7.0 to 12.0 h.',pk:'Peak ≈7–10 h in children, ≈8 h in adults.'},
    {id:'zenzedi',n:'Zenzedi / Dexedrine Spansule',g:'dextroamphetamine IR tablet / ER capsule',pill:'tab',c:'[[FDA-Zenzedi,FDA-Dexedrine]]',
     age:'Zenzedi: "pediatric patients (ages 3 to 16 years)" (older-format indication). Dexedrine Spansule: ages 6 to 16.',start:'Zenzedi, ages 3–5: 2.5 mg daily.',max:'"Only in rare cases will it be necessary to exceed a total of 40 mg per day".',
     freq:'Not covered in this guide\'s label extract.',form:'Tablet (Zenzedi); capsule (Spansule).',food:'Not covered in this guide\'s label extract.',pk:'Not covered in this guide\'s label extract.'},
    {id:'vyvanse',n:'Vyvanse',g:'lisdexamfetamine capsule or chewable tablet',pill:'cap',c:'[[FDA-Vyvanse]]',
     age:'ADHD in adults and children 6 years and older; moderate to severe binge eating disorder in adults.',start:'30 mg every morning, titrated by 10–20 mg weekly.',max:'30–70 mg/day; maximum 70 mg/day (50 mg/day in severe renal impairment, 30 mg/day in end-stage renal disease).',
     freq:'Once every morning; afternoon doses avoided "because of the potential for insomnia".',form:'Capsules swallowed whole or opened and mixed with yogurt, water or orange juice; chewable tablets.',food:'Food delays Tmax ≈1 h (3.8 → 4.7 h after a high-fat meal); AUC and Cmax unchanged.',pk:'Prodrug peak ≈1 h; d-amphetamine ≈3.5 h (children, fasted); effect 2–12 h in children.'}
  ];
  const glyph=k=>k==='patch'?`<rect x="18" y="8" width="56" height="30" rx="8" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.8"/><rect x="28" y="15" width="36" height="16" rx="4" style="fill:var(--rx);opacity:.35"/>`:pill(46,23,k==='tab'?34:64,k,{c:'var(--rx)'});
  const opts=LB.map(p=>`<option value="${p.id}">${p.n} · ${p.g}</option>`).join('');
  function card(sel,box){const p=LB.find(x=>x.id===sel.value)||LB[0];
    const ci=' '+p.c;
    box.innerHTML=`<div class="lblhead"><svg viewBox="0 0 92 46" role="img" aria-label="${p.g} glyph">${glyph(p.pill)}</svg><p><b>${p.n}</b><br>${p.g}</p></div>
      <dl><dt>Ages on the label</dt><dd>${p.age}</dd><dt>Starting dose, as published</dt><dd>${p.start}</dd><dt>Maximum, as published</dt><dd>${p.max}</dd>
      <dt>How often</dt><dd>${p.freq}</dd><dt>Swallow, open, sprinkle or chew</dt><dd>${p.form}</dd><dt>Food</dt><dd>${p.food}</dd><dt>Curve</dt><dd>${p.pk}</dd>
      <dt>Warning</dt><dd>${SB}</dd><dt>Source</dt><dd>US prescribing information${ci}</dd></dl>`}
  const sa=$('#rlA'),sb=$('#rlB');sa.innerHTML=opts;sb.innerHTML=opts;sa.value='concerta';sb.value='vyvanse';
  sa.addEventListener('change',()=>card(sa,$('#rlCardA')));sb.addEventListener('change',()=>card(sb,$('#rlCardB')));
  card(sa,$('#rlCardA'));card(sb,$('#rlCardB'));
};
