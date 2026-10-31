/* =============== 1.2 the emotion wave =============== */
/* the wave occupies t 0..EM_WEND; the cycle ring occupies EM_WEND..1 */
const EM_WEND=.7;
const EM_STEPS=[
 {from:0,at:.05,k:'Before anything happens',t:'Baseline',
  txt:`The wave starts higher than in comparison groups. In one e-diary study, mean momentary distress over 24 hours was 4.85 out of 10 in BPD against 0.34 in healthy controls. [[Santangelo2014]] Kuo and Linehan found higher resting skin conductance and negative emotion and lower resting respiratory sinus arrhythmia in BPD. [[Kuo2009]] Across three e-diary datasets, people with BPD had a more negative emotional "home base". [[EbnerPriemer2015]]`,
  pt:`For many people with BPD the hardest part is how high painful feelings already are before anything happens.`,
  hook:`Kuo &amp; Linehan 2009: high <b>baseline</b> negative emotion and low resting RSA in BPD, not a bigger reaction. [[Kuo2009]]`},
 {from:.09,at:.118,k:'The trigger',t:'An interpersonal cue',
  txt:`Triggers are often interpersonal: a cancelled plan, a short reply, a look that reads as criticism. In daily life, rejection and disagreement were followed by hostility, sadness and fear, and the rejection links were stronger in BPD. [[Hepp2018]] Gunderson and colleagues describe "extreme sensitivity to perceived interpersonal slights". [[Gunderson2018]] This is the <b>sensitivity</b> part of Linehan's model. [[Kuo2009,Reitz2012]]`,
  pt:`A small signal from someone else, like a cancelled plan, can land as a big rejection.`,
  hook:`Rejection sensitivity and BPD features: pooled r = 0.326; clinical samples against controls r = 0.655. [[Foxhall2019]]`},
 {from:.13,at:.165,k:'Seconds to minutes',t:'A fast rise',
  txt:`Negative emotion climbs quickly. In laboratory mood inductions with ratings before, just after, and 3 and 6 minutes after a story, BPD, depression and control groups showed the <b>same rise and fall</b>; BPD differed by a much higher level throughout. [[Jacob2009]] Reactions were larger to a negative-evaluation stressor than to a general one. [[Gratz2010]] Press <b>Add a comparison curve</b> to see a parallel rise from a lower start.`,
  pt:`The feeling rises fast. In studies, the jump itself is often similar to other people's; it starts from a higher place.`,
  hook:`Jacob 2009: "extreme negative affectivity" may describe BPD better than hyperreactivity. [[Jacob2009]]`},
 {from:.18,at:.21,k:'The peak',t:'High intensity',
  txt:`At the top, emotions are intense and often mixed: people with BPD reported more often feeling more than one emotion at once and, early in treatment, more difficulty naming it. [[EbnerPriemer2007PsychiatryRes]] Not being able to label emotions was linked to distress in BPD. [[EbnerPriemer2008]] Urges are more likely when negative affect is high, after rejection and later in the day. [[Hepp2021PersonalDisord]] A meta-analysis of 31 laboratory studies found null-to-small differences in physiological reactivity; the big difference was how negatively people rated what they saw. [[Bortolla2020]]`,
  pt:`At the peak, feelings are strong and tangled, and urges to do something right now are strongest.`,
  hook:`Bortolla 2020 meta-analysis: the hyperreactivity hypothesis was "in general" not supported in the lab. [[Bortolla2020]]`},
 {from:.3,at:.47,k:'Minutes to hours',t:'A slow return',
  txt:`<span class="ev early">Early evidence</span> The return to baseline is where the evidence is most mixed. Shame after negative evaluation stayed raised in BPD through the end of the recovery period, and aversive tension returned more slowly in a pilot study. [[Gratz2010,Reitz2012]] Over 20 days, affect carried over more from one interpersonal event to the next. [[Sadikaj2010]] But a weaker pull back to baseline in e-diary data was inconsistent and small. [[EbnerPriemer2015]] Press <b>Skills used</b> to see what regulation is meant to do.`,
  pt:`Coming back down can take longer, especially after shame or criticism. But studies do not all agree on this.`,
  hook:`"Slow return to baseline": supported for shame and tension in specific contexts; e-diary attractor strength findings are small and inconsistent. [[Gratz2010,EbnerPriemer2015]]`},
 {from:EM_WEND,at:.86,k:'Hours to days',t:'The cycle',
  txt:`An urgent action can bring short-term relief, which is why it can become a habit. Self-injury most often aims to relieve negative emotion, and relief often follows. [[Klonsky2007]] But in daily life, negative emotion was higher in the hours after self-injury, a cycle the authors describe. [[Houben2017]] Shame and conflict then feed the next trigger. The experiential avoidance model sees escape from emotion as what keeps the cycle going. <span class="ev hyp">Hypothesis</span> [[Chapman2006]] Every link is a place where a skill or support can break the chain.`,
  pt:`Something that brings quick relief can feel like it works. The relief does not last, and bad feelings often come back within hours.`,
  hook:`Urges build and pass: most thoughts of self-injury lasted 1–30 minutes in one study. Getting through the peak with support matters. [[Nock2009,Hepp2021PersonalDisord]]`}
];
/* a person can tell when the nodes of the ring are read aloud */
const EM_RING=[
 {n:'Trigger',s:'rejection, criticism',v:.45},
 {n:'Emotion',s:'shame, fear, anger',v:.85},
 {n:'Urge',s:'builds, then passes',v:.95},
 {n:'Urgent action',s:'e.g. self-harm, lashing out',v:.8},
 {n:'Short-term relief',s:'tension falls briefly',v:.45},
 {n:'Shame & conflict',s:'emotion rises again',v:.78}
];
inits.emotion=()=>{
  const svg=$('#emSvg'),rg=$('#emT');let cmp=false,sk=false,setSt=()=>{};
  const F={bpd:moodF({t0:.16,base:.36,peak:.9,rise:.045,fall:.55}),
           cmp:moodF({t0:.16,base:.08,peak:.56,rise:.045,fall:.24}),
           sk:moodF({t0:.16,base:.36,peak:.7,rise:.06,fall:.17})};
  const PH=[['baseline',.06],['trigger',.16],['rise',.21],['peak',.31],['return',.66]];
  function ring(cx,cy,r,k,NR){let s='';const n=EM_RING.length,off=0,bw=NR?112:124,bh=40;
    const P=i=>{const a=(i*360/n+off-90)*Math.PI/180;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]};
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--line);stroke-width:10;opacity:.7"/>`;
    /* arrows between nodes along the ring */
    for(let i=0;i<n;i++){const a0=(i*360/n+off-90+18)*Math.PI/180,a1=((i+1)*360/n+off-90-18)*Math.PI/180;
      const x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
      const broken=sk&&i===2;
      s+=`<path d="M${f1(x0)} ${f1(y0)}A${r} ${r} 0 0 1 ${f1(x1)} ${f1(y1)}" style="fill:none;stroke:${broken?'var(--accent)':'var(--muted)'};stroke-width:1.8${broken?';stroke-dasharray:3 5':''}" marker-end="url(#emArr)"/>`}
    const act=Math.floor(((k%n)+n)%n+1e-6)%n;
    /* a token travels round the ring: the cycle turning */
    {const a=((k%n)*360/n-90)*Math.PI/180,tx=cx+r*Math.cos(a),ty=cy+r*Math.sin(a);s+=`<circle cx="${f1(tx)}" cy="${f1(ty)}" r="9" style="fill:var(--storm);opacity:.9;stroke:var(--panel);stroke-width:2.5"/>`}
    EM_RING.forEach((d,i)=>{const [x,y]=P(i),on=i===act,dim=sk&&(i===3||i===4);
      s+=`<g style="opacity:${dim?.4:1}"><rect x="${f1(x-bw/2)}" y="${f1(y-bh/2)}" width="${bw}" height="${bh}" rx="10" style="fill:${on?'var(--storm-soft)':'var(--panel)'};stroke:${on?'var(--storm)':'var(--line)'};stroke-width:${on?2:1.2}"/>`+
        `<text x="${f1(x)}" y="${f1(y-3)}" class="t-lbl t-mid" style="font-size:12.5px">${d.n.replace('&','&amp;')}</text><text x="${f1(x)}" y="${f1(y+12)}" class="t-xs t-mid">${d.s}</text></g>`});
    if(sk){const [x,y]=P(2.5);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="11" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/><path d="M${f1(x-5)} ${f1(y-5)}L${f1(x+5)} ${f1(y+5)}M${f1(x+5)} ${f1(y-5)}L${f1(x-5)} ${f1(y+5)}" style="stroke:var(--accent);stroke-width:2.2;stroke-linecap:round"/>`}
    const C=sk?['A skill breaks','the chain','the urge passes','without the action']:['The cycle','','each link can','be broken'];
    s+=`<text x="${cx}" y="${cy+(sk?14:6)}" class="t-lbl t-mid" style="font-size:${sk?13:16}px">${C[0]}</text>`+(C[1]?`<text x="${cx}" y="${cy+30}" class="t-lbl t-mid" style="font-size:13px">${C[1]}</text>`:'')+
      `<text x="${cx}" y="${cy+(sk?46:24)}" class="t-xs t-mid">${C[2]}</text><text x="${cx}" y="${cy+(sk?58:36)}" class="t-xs t-mid">${C[3]}</text>`;
    return {svg:s,act}}
  function draw(t){const NR=vb(svg,'720 380','400 600');
    const L=NR?{wx:44,wy:118,ww:326,wh:200,bx:118,by:470,bs:.78,tx:300,ty:410,th:120,cx:200,cy:222,cr:128}
              :{wx:56,wy:112,ww:440,wh:200,bx:620,by:118,bs:.72,tx:590,ty:196,th:118,cx:276,cy:206,cr:136};
    const ph=phaseOf(EM_STEPS,t),u=clamp(t/EM_WEND),cyc=ramp(t,EM_WEND-.02,EM_WEND+.04),k=ramp(t,EM_WEND,1)*7;
    const main=sk?F.sk:F.bpd;let s=`<defs>${marker('emArr','var(--muted)')}</defs>`;
    /* title */
    s+=`<text x="${L.wx}" y="28" class="t-sm" style="fill:var(--storm)">${cyc<.5?'NEGATIVE EMOTION OVER TIME':'EMOTION → URGE → ACTION → RELIEF → SHAME'}</text>`;
    /* ---- wave panel ---- */
    let w='';
    [0,.25,.5,.75,1].forEach(v=>{const y=L.wy+L.wh*(1-v);w+=`<line x1="${L.wx}" x2="${L.wx+L.ww}" y1="${f1(y)}" y2="${f1(y)}" class="${v?'grid':'axis'}"/>`});
    w+=`<text x="${L.wx-8}" y="${L.wy+6}" class="t-xs t-end">high</text><text x="${L.wx-8}" y="${L.wy+L.wh}" class="t-xs t-end">low</text>`;
    /* phase labels under the axis */
    /* only the current phase is named, at the middle of its stretch, so short phases never collide */
    let px=L.wx;PH.forEach(([n,e],i)=>{const x1=L.wx+L.ww*e,on=i===Math.min(ph,4)&&cyc<.5;
      if(on)w+=`<rect x="${f1(px)}" y="${L.wy+L.wh}" width="${f1(x1-px)}" height="4" style="fill:var(--storm);opacity:.6"/><text x="${f1(clamp((px+x1)/2,L.wx+24,L.wx+L.ww-24))}" y="${L.wy+L.wh+17}" class="t-xs t-mid" style="fill:var(--storm);font-weight:700">${n}</text>`;
      if(i<PH.length-1)w+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${L.wy+L.wh}" y2="${L.wy+L.wh+6}" class="axis"/>`;px=x1});
    w+=`<text x="${L.wx+L.ww}" y="${L.wy+L.wh+32}" class="t-xs t-end">time since the trigger (schematic)</text>`;
    if(cmp){const c=wave(L.wx,L.wy,L.ww,L.wh,F.cmp,{upto:u,col:'var(--calm)',dash:true});w+=c.svg;
      if(u>.5){const p=c.at(.62);w+=`<text x="${f1(p[0])}" y="${f1(p[1]+16)}" class="t-xs" style="fill:var(--calm)">comparison group</text>`}}
    if(sk){const g=wave(L.wx,L.wy,L.ww,L.wh,F.bpd,{upto:u,col:'var(--storm)',dash:true});w+=`<g style="opacity:.45">${g.svg}</g>`}
    const mw=wave(L.wx,L.wy,L.ww,L.wh,main,{upto:u,col:sk?'var(--accent)':'var(--mood)',fill:true,thr:.78,thrLabel:'urges more likely',base:true,dot:u>0});
    w+=mw.svg;
    if(u>.5){const p=mw.at(.78);w+=`<text x="${f1(p[0])}" y="${f1(p[1]-10)}" class="t-xs t-mid" style="fill:${sk?'var(--accent)':'var(--mood)'}">${sk?'with skills (illustrative)':'BPD-typical (schematic)'}</text>`}
    /* the trigger: another person and a message */
    const tx=L.wx+L.ww*.16,show=ramp(t,.085,.11)*(1-.6*ramp(t,.3,.4));
    if(show>0){w+=`<g style="opacity:${f1(show)}">`+person(tx-14,L.wy-62,30,'var(--other)')+
      bubble(tx+10,L.wy-74,NR?214:226,30,{tx:tx+4,ty:L.wy-52,col:'var(--other)',lines:['“Sorry, can’t make it tonight.”']})+
      `<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${L.wy-26}" y2="${L.wy+L.wh}" style="stroke:var(--other);stroke-width:1;stroke-dasharray:3 4"/></g>`}
    s+=`<g style="opacity:${f1(1-.88*cyc)}">${w}</g>`;
    /* ---- current intensity ---- */
    let v=main(u),act=-1;
    if(cyc>0){const R=ring(L.cx,L.cy,L.cr,k,NR);act=R.act;v=lerp(v,EM_RING[act].v*(sk&&(act===3||act===4)?.7:1),cyc);
      s+=`<g style="opacity:${f1(cyc)}">${R.svg}</g>`}
    const amy=clamp((v-.25)/.7),pfc=sk?clamp(.3+.6*ramp(u,.25,.5)):clamp(.15+.25*ramp(u,.4,.9));
    const B=brain(L.bx,L.by,L.bs,{hl:{amyg:amy,pfc:pfc,insula:amy*.6}});
    s+=B.svg;
    const bl=NR?L.by+64:L.by+62;
    s+=`<text x="${L.bx}" y="${bl}" class="t-xs t-mid">threat ${amy>.6?'high':amy>.3?'rising':'low'} · control ${pfc>.55?'engaged':'quiet'}</text>`;
    s+=thermo(L.tx,L.ty,L.th,v,{label:'intensity'});
    s+=`<text x="${L.tx+20}" y="${L.ty+L.th*(1-v)+4}" class="t-lbl">${Math.round(v*100)}</text><text x="${L.tx+20}" y="${L.ty+L.th*(1-v)+17}" class="t-xs">of 100</text>`;
    s+=`<text x="${NR?200:L.bx}" y="${NR?592:372}" class="t-xs t-mid" style="fill:var(--warn)">SCHEMATIC · not measured values</text>`;
    svg.innerHTML=s;
    setSt(ph);
    $('#emNote').innerHTML=noteHTML(EM_STEPS[ph]);
    $('#emRead').innerHTML=cyc>.5?`<span>link <b>${EM_RING[act].n.replace('&','&amp;')}</b></span><span>intensity <b>${Math.round(v*100)}</b>/100 (schematic)</span>${sk?'<span>skills <b>on</b> (illustrative)</span>':''}`:
      `<span>phase <b>${PH[Math.min(ph,4)][0]}</b></span><span>intensity <b>${Math.round(v*100)}</b>/100 (schematic)</span>${cmp?`<span>comparison <b>${Math.round(F.cmp(u)*100)}</b></span>`:''}${v>=.78?'<span><b>above the urge line</b></span>':''}`;
  }
  const stop=playWire(rg,$('#emPlay'),draw,22000,'%t:player.replay%','emotion');
  setSt=stepWire($('#emSteps'),EM_STEPS,rg,draw,stop);
  $('#emCmp').addEventListener('click',()=>{cmp=!cmp;$('#emCmp').setAttribute('aria-pressed',cmp);draw(+rg.value)});
  $('#emSk').addEventListener('click',()=>{sk=!sk;$('#emSk').setAttribute('aria-pressed',sk);draw(+rg.value)});
  draw(+rg.value);

  /* ---- e-diary day: MSSD live ---- */
  const es=$('#emEpSvg'),sel=$('#emEpI'),vr=$('#emEpV');
  const D0={bpd:[3,4,3,5,4,8,7,6,4,3,3,4,7,8,5,4,3,6,5,4,8,6,4,3],cmp:[0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,2,0,0,1,0]};
  let D={bpd:D0.bpd.slice(),cmp:D0.cmp.slice()},ed='bpd',sorted=false,selI=5,drag=false,G=null;
  sel.innerHTML=D.bpd.map((_,i)=>`<option value="${i}">${i+1}</option>`).join('');sel.value=selI;
  const view=k=>sorted?D[k].slice().sort((a,b)=>a-b):D[k];
  const stat=a=>{const n=a.length,m=a.reduce((x,y)=>x+y,0)/n,va=a.reduce((x,y)=>x+(y-m)*(y-m),0)/(n-1);
    let ss=0,ac=0;for(let i=1;i<n;i++){const d=a[i]-a[i-1];ss+=d*d;if(Math.abs(d)>=3)ac++}
    return{m,sd:Math.sqrt(va),va,mssd:ss/(n-1),pac:ac/(n-1)}};
  function drawE(){const NR=vb(es,'720 330','400 372');
    G=NR?{x0:34,x1:388,y0:36,y1:236,b0:262,b1:330,lab:356}:{x0:44,x1:704,y0:30,y1:206,b0:230,b1:290,lab:316};
    const X=i=>lerp(G.x0,G.x1,i/23),Y=v=>lerp(G.y1,G.y0,v/10);let s='';
    [0,2,4,6,8,10].forEach(v=>s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${G.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    for(let i=0;i<24;i+=NR?4:2)s+=`<text x="${f1(X(i))}" y="${G.y1+14}" class="t-xs t-mid">${i+1}</text>`;
    s+=`<text x="${G.x1}" y="${G.y0-12}" class="t-xs t-end">${NR?'distress 0–10 · prompt number':'distress 0–10 · prompt number across one day'}</text>`;
    ['cmp','bpd'].forEach(k=>{const a=view(k),col=k==='bpd'?'var(--storm)':'var(--calm)',on=k===ed;
      s+=`<path d="${a.map((v,i)=>(i?'L':'M')+f1(X(i))+' '+f1(Y(v))).join('')}" style="fill:none;stroke:${col};stroke-width:${on?2.6:1.8};opacity:${on?1:.55};stroke-linejoin:round"/>`;
      a.forEach((v,i)=>{s+=`<circle cx="${f1(X(i))}" cy="${f1(Y(v))}" r="${on?(i===selI&&!sorted?7:5):3}" style="fill:${on?(i===selI&&!sorted?'var(--panel)':col):col};stroke:${col};stroke-width:2;opacity:${on?1:.55}"/>`})});
    /* squared successive differences for the edited profile */
    const a=view(ed),col=ed==='bpd'?'var(--storm)':'var(--calm)',bw=(G.x1-G.x0)/23;
    s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${G.b1}" y2="${G.b1}" class="axis"/>`;
    for(let i=1;i<24;i++){const d=a[i]-a[i-1],h=(G.b1-G.b0)*Math.min(1,d*d/49),x=lerp(G.x0,G.x1,(i-.5)/23),big=Math.abs(d)>=3;
      s+=`<rect x="${f1(x-bw*.32)}" y="${f1(G.b1-h)}" width="${f1(bw*.64)}" height="${f1(Math.max(h,.8))}" rx="2" style="fill:${big?col:'var(--muted)'};opacity:${big?.85:.35}"/>`}
    s+=`<text x="${G.x0}" y="${G.lab}" class="t-xs">${NR?'bars: squared jumps · coloured = 3+ points':'bars: squared jump between successive ratings · coloured = a jump of 3 or more'}</text>`;
    es.innerHTML=s;
    const SB=stat(view('bpd')),SC=stat(view('cmp'));
    $('#emStats').innerHTML=[['bpd','BPD',SB],['cmp','Comparison',SC]].map(([c,n,S])=>
      `<div class="${c}"><small>${n} · MSSD</small><b>${S.mssd.toFixed(2)}</b><span class="stage-cap">mean ${S.m.toFixed(2)} · SD ${S.sd.toFixed(2)} · variance ${S.va.toFixed(2)} · acute changes ${Math.round(S.pac*100)}%</span></div>`).join('')+
      `<div><small>${sorted?'Sorted':'As rated'}</small><span class="stage-cap">${sorted?'Same values in rising order: mean and variance unchanged, MSSD much lower. Order is what MSSD measures.':'Drag a point up or down. A single big jump raises the MSSD far more than a slow drift.'}</span></div>`;
    vr.value=D[ed][selI];
  }
  function setPt(i,v){if(sorted){sorted=false;$('#emSort').setAttribute('aria-pressed','false')}selI=i;sel.value=i;D[ed][i]=clamp(Math.round(v),0,10);drawE()}
  function evPt(e){const p=es.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=es.getScreenCTM();if(!m)return null;const q=p.matrixTransform(m.inverse());
    return{i:clamp(Math.round((q.x-G.x0)/(G.x1-G.x0)*23),0,23),v:(G.y1-q.y)/(G.y1-G.y0)*10}}
  es.addEventListener('pointerdown',e=>{const q=evPt(e);if(!q)return;drag=true;try{es.setPointerCapture(e.pointerId)}catch(_){}setPt(q.i,q.v)});
  es.addEventListener('pointermove',e=>{if(!drag)return;const q=evPt(e);if(q)setPt(selI,q.v)});
  ['pointerup','pointercancel'].forEach(n=>es.addEventListener(n,()=>{drag=false}));
  sel.addEventListener('change',()=>{selI=+sel.value;drawE()});
  vr.addEventListener('input',()=>setPt(selI,+vr.value));
  $$('[data-ep]').forEach(b=>b.addEventListener('click',()=>{ed=b.dataset.ep;$$('[data-ep]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawE()}));
  $('#emSort').addEventListener('click',()=>{sorted=!sorted;$('#emSort').setAttribute('aria-pressed',sorted);drawE()});
  $('#emReset').addEventListener('click',()=>{D={bpd:D0.bpd.slice(),cmp:D0.cmp.slice()};sorted=false;$('#emSort').setAttribute('aria-pressed','false');drawE()});
  drawE();
  const pr=redraws.emotion;redraws.emotion=()=>{pr&&pr();drawE()};
};
