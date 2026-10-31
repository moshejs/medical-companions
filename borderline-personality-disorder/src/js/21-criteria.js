/* =============== 2.1 DSM-5-TR criteria =============== */
const CR_C=[
 {s:['Abandonment','fears'],n:'Abandonment fears',w:`Frantic efforts to avoid real or imagined abandonment. Suicidal or self-harming behaviour is not counted here: it belongs to criterion 5.`,m:'V'},
 {s:['Unstable','relationships'],n:'Unstable, intense relationships',w:`A pattern of unstable and intense relationships that alternate between extremes of idealization and devaluation.`,m:'L'},
 {s:['Identity','disturbance'],n:'Identity disturbance',w:`A markedly and persistently unstable self-image or sense of self.`,m:'U'},
 {s:['Impulsivity','(2+ areas)'],n:'Impulsivity',w:`Impulsivity in at least two areas that are potentially self-damaging, for example spending, sex, substance use, reckless driving or binge eating. Suicidal or self-harming behaviour is not counted here.`,m:'I'},
 {s:['Suicidal or','self-harm'],n:'Suicidal or self-harming behaviour',w:`Recurrent suicidal behaviour, gestures or threats, or self-mutilating behaviour. This is the only criterion under which such behaviour is scored.`,m:'S'},
 {s:['Affective','instability'],n:'Affective instability',w:`Affective instability due to marked reactivity of mood, for example intense episodic dysphoria, irritability or anxiety “usually lasting a few hours and only rarely more than a few days”.`,m:'M'},
 {s:['Chronic','emptiness'],n:'Chronic emptiness',w:`Chronic feelings of emptiness.`,m:'E'},
 {s:['Intense','anger'],n:'Intense anger',w:`Inappropriate, intense anger or difficulty controlling anger, for example frequent displays of temper, constant anger or recurrent physical fights.`,m:'I'},
 {s:['Paranoia or','dissociation'],n:'Stress-related paranoia or dissociation',w:`Transient, stress-related paranoid ideation or severe dissociative symptoms.`,m:'P'}
];
/* CLPS adult mean symptom ratings, 0-2 (Peters 2023, Table 1) */
const CR_MEAN=[.75,1.02,.88,1.11,.64,1.23,1.05,1.14,.84];
const CR_EF=[
 `Against bipolar disorder: highest specificity and highest positive predictive value (0.90), accuracy 85%. [[Bayes2020]] The best inclusion criterion in hospitalised adolescents. [[Becker2002]]`,
 `Highest negative predictive value against bipolar disorder (0.91). [[Bayes2020]] With suicidal or self-injurious behaviour, the best predictor of a BPD diagnosis 2 years later. [[Grilo2007]]`,
 `Accuracy 85% against bipolar disorder, [[Bayes2020]] and one of the two most central criteria in symptom networks. [[Peters2023]]`,
 `The best exclusion criterion in hospitalised adults. [[Becker2002]]`,
 `With unstable relationships, the best predictor of a BPD diagnosis 2 years later. [[Grilo2007]]`,
 `Highest sensitivity in 3,674 outpatients (92.8%), negative predictive value 99%: its absence nearly rules BPD out. [[Zimmerman2017BJP]] Most common criterion in BPD (92.5%) but lowest specificity against bipolar disorder. [[Bayes2020]]`,
 `On its own, the only single feature linked to impairment on every index of psychosocial functioning. [[Ellison2016]]`,
 `Least common criterion in BPD in a comparison with bipolar disorder (49%). [[Bayes2020]] The best exclusion criterion in hospitalised adolescents. [[Becker2002]]`,
 ''
];
const CR_STEPS=[
 {from:0,at:.1,k:'DSM-5-TR Section II',t:'Nine criteria on one ring',
  txt:`DSM-5-TR describes BPD as a pervasive pattern of instability of interpersonal relationships, self-image and affects, with marked impulsivity, that begins by early adulthood and is present in a variety of contexts. It is shown by 5 (or more) of 9 criteria. The defining criteria have not changed in any major way since DSM-III in 1980. [[APA2022,Kaess2025,Leichsenring2024WP]]`,
  pt:`There is a list of nine typical difficulties. A diagnosis needs at least five of them, lasting a long time and showing up in many parts of life.`,
  hook:`5 or more of 9, beginning by early adulthood, across a variety of contexts.`},
 {from:.18,at:.32,k:'Person A',t:'Five tiles: the threshold',
  txt:`Person A meets criteria 1 to 5: abandonment fears, unstable relationships, identity disturbance, impulsivity, and suicidal or self-harming behaviour. The fifth tile takes the count over the threshold. Suicidal or self-harming behaviour is scored only under criterion 5, never under criteria 1 or 4. [[APA2022,Kaess2025,Mulay2019]]`,
  pt:`Five is the line. Four is not enough for the diagnosis, although four features can still cause real difficulty.`,
  hook:`Self-harm counts once: only under criterion 5, never under 1 (abandonment) or 4 (impulsivity).`},
 {from:.36,at:.5,k:'Person B',t:'A different five',
  txt:`Person B meets criteria 5 to 9: suicidal or self-harming behaviour, affective instability, chronic emptiness, intense anger, and stress-related paranoia or dissociation. Both people meet the same diagnosis. [[Mulay2019]]`,
  pt:`Two people with the same diagnosis can have very different everyday struggles.`},
 {from:.54,at:.62,k:'Overlap',t:'Only one criterion shared',
  txt:`Persons A and B share only criterion 5: the arithmetic of a polythetic rule, where any 5 of 9 will do. [[Mulay2019]] Even so, the criteria hang together. In 668 CLPS participants a one-factor model fitted well, and a three-factor model (disturbed relatedness, behavioural dysregulation, affective dysregulation) fitted better and replicated at 2 years. <span class="ev est">Established</span> [[Sanislow2002]]`,
  pt:`People with BPD do not all look alike, but their difficulties still belong together.`,
  hook:`Two people can share a single criterion and both have BPD.`},
 {from:.66,at:.84,k:'Counting',t:'256 ways to qualify',
  txt:`Count every way to meet 5 or more of 9: 126 sets of exactly 5, 84 of 6, 36 of 7, 9 of 8 and 1 of all 9, which makes 256. [[Mulay2019]] In practice many people meet more than five: in one clinical comparison, people with BPD met a mean of 6.6 criteria, against 1.9 in people with bipolar disorder. [[Bayes2020]]`,
  pt:`There are 256 different combinations that all lead to the same diagnosis.`,
  hook:`256 = 126 + 84 + 36 + 9 + 1. Exactly five: 126 combinations.`},
 {from:.88,at:.97,k:'Network view',t:'Two criteria at the centre',
  txt:`In symptom-network analyses of three clinical samples (CLPS adults, n = 731; MIDAS outpatients, n = 3,651; adolescents, n = 1,012), affective instability and identity disturbance were the most central criteria in all three, and relationship difficulties were also central in both adult networks. The network was broadly the same in adolescents and adults. [[Peters2023]]`,
  pt:`Mood swings and an unsteady sense of who you are tend to be linked to all the other difficulties.`,
  hook:`Most central in networks: affective instability (6) and identity disturbance (3).`}
];
function crBin(n,k){if(k<0||k>n)return 0;let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r)}
function crArc(cx,cy,r,a0,a1){/* degrees, 0 = top, clockwise */
  if(a1-a0>=359.9)return `M${f1(cx)} ${f1(cy-r)}A${r} ${r} 0 1 1 ${f1(cx-.01)} ${f1(cy-r)}`;
  const P=a=>{const q=(a-90)*Math.PI/180;return [cx+r*Math.cos(q),cy+r*Math.sin(q)]},p0=P(a0),p1=P(a1);
  return `M${f1(p0[0])} ${f1(p0[1])}A${r} ${r} 0 ${a1-a0>180?1:0} 1 ${f1(p1[0])} ${f1(p1[1])}`}
inits.criteria=()=>{
  /* ---------- main scrubber: two people, same diagnosis ---------- */
  const svg=$('#crSvg'),rg=$('#crT'),note=$('#crNote');
  const A=[0,1,2,3,4],B=[4,5,6,7,8],CNT=[126,84,36,9,1];
  let setA=()=>{},lastP=-1;
  function draw(t){
    const N=vb(svg,'720 380','400 640'),P=phaseOf(CR_STEPS,t);
    if(P!==lastP){lastP=P;setA(P);note.innerHTML=noteHTML(CR_STEPS[P])}
    const L=N?{cx:200,cy:186,r:136,tw:84,th:40,px:16,pw:368,py:364}:{cx:198,cy:200,r:140,tw:88,th:42,px:410,pw:300,py:28};
    const ap=ramp(t,0,.08),fa=ramp(t,.18,.32),fb=ramp(t,.36,.5),ov=ramp(t,.54,.62),cb=ramp(t,.66,.84),ce=ramp(t,.88,.97);
    const nA=P>=1?Math.floor(fa*5+1e-6):0,nB=P>=2?Math.floor(fb*5+1e-6):0;
    const pos=i=>{const q=(-90+i*40)*Math.PI/180;return [L.cx+L.r*Math.cos(q),L.cy+L.r*Math.sin(q)]};
    let s='';
    s+=`<text x="${N?16:20}" y="20" class="t-sm">DSM-5-TR · 9 CRITERIA · ≥5 NEEDED</text>`;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r}" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 5"/>`;
    /* network edges */
    if(P>=5&&ce>0){for(let i=0;i<9;i++)for(let j=i+1;j<9;j++){const c=(i===2||i===5||j===2||j===5),m=(i===1||j===1);const a=pos(i),b=pos(j);
      s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:${c?'var(--dx)':m?'var(--mood)':'var(--muted)'};stroke-width:${c?2.4:m?1.6:.8};opacity:${f1(ce*(c?.75:m?.5:.22))}"/>`}}
    /* progress arc in the ring */
    const ar=L.r-62;let cnt=0,arcCol='var(--dx)';
    if(P===1)cnt=nA;else if(P===2){cnt=nB;arcCol='var(--mood)'}else if(P===3){cnt=1;arcCol='var(--gold)'}
    if(P>=1&&P<=3){s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${ar}" style="fill:none;stroke:var(--panel-2);stroke-width:9"/>`;
      if(cnt>0)s+=`<path d="${crArc(L.cx,L.cy,ar,0,cnt*40)}" style="fill:none;stroke:${cnt>=5&&P<3?'var(--good)':arcCol};stroke-width:9;stroke-linecap:round"/>`;
      const tq=(200-90)*Math.PI/180;s+=`<line x1="${f1(L.cx+(ar-9)*Math.cos(tq))}" y1="${f1(L.cy+(ar-9)*Math.sin(tq))}" x2="${f1(L.cx+(ar+9)*Math.cos(tq))}" y2="${f1(L.cy+(ar+9)*Math.sin(tq))}" style="stroke:var(--ink);stroke-width:2"/>`;
      s+=`<text x="${f1(L.cx+(ar+18)*Math.cos(tq))}" y="${f1(L.cy+(ar+18)*Math.sin(tq)+4)}" class="t-xs t-mid" style="fill:var(--ink)">5</text>`}
    /* tiles */
    for(let i=0;i<9;i++){const [x,y]=pos(i),op=clamp(ap*9-i*.9+.2);
      const inA=P>=1&&A.indexOf(i)>=0&&A.indexOf(i)<nA,inB=P>=2&&B.indexOf(i)>=0&&B.indexOf(i)<nB;
      let fill='var(--panel)',st='var(--line)',sw=1.3,o=op,sc=1;
      if(P<=3){if(inA&&inB){fill='var(--gold-soft)';st='var(--gold)';sw=2.2}else if(inB){fill='var(--brand-soft)';st='var(--mood)';sw=1.8}else if(inA){fill=P>=2?'var(--panel)':'var(--dx-soft)';st='var(--dx)';sw=1.8}
        if(P===3&&!(inA&&inB))o=lerp(1,.32,ov)}
      if(P>=4&&P<5){o=1}
      if(P>=5&&(i===2||i===5)){fill='var(--dx-soft)';st='var(--dx)';sw=2.4;sc=1+.1*ce}
      const w=L.tw*sc,h=L.th*sc;
      s+=`<g style="opacity:${f1(o)}"><rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="9" style="fill:${fill};stroke:${st};stroke-width:${sw}"/>`;
      s+=`<circle cx="${f1(x-w/2+3)}" cy="${f1(y-h/2+3)}" r="8.5" style="fill:${st==='var(--line)'?'var(--panel-2)':st};stroke:var(--panel);stroke-width:1.5"/><text x="${f1(x-w/2+3)}" y="${f1(y-h/2+6.5)}" class="t-xs t-mid" style="fill:${st==='var(--line)'?'var(--ink)':'var(--panel)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${f1(x+3)}" y="${f1(y-2)}" class="t-xs t-mid" style="fill:var(--ink)">${CR_C[i].s[0]}</text><text x="${f1(x+3)}" y="${f1(y+10)}" class="t-xs t-mid" style="fill:var(--ink)">${CR_C[i].s[1]}</text>`;
      if(P>=2&&P<=3&&(inA||inB)){const tg=(P>=2&&A.indexOf(i)>=0&&A.indexOf(i)<nA?'A':'')+(inB?'B':'');s+=`<text x="${f1(x+w/2-4)}" y="${f1(y-h/2-4)}" class="t-xs t-end" style="fill:${tg==='AB'?'var(--gold)':tg==='B'?'var(--mood)':'var(--dx)'};font-weight:700">${tg.split('').join('+')}</text>`}
      s+='</g>'}
    /* centre */
    let big='9',sub1='criteria',sub2='5 or more needed',bc='var(--ink)';
    if(P===1){big=nA+'/9';sub1='Person A';sub2=nA>=5?'threshold met':'below threshold';bc=nA>=5?'var(--good)':'var(--dx)'}
    else if(P===2){big=nB+'/9';sub1='Person B';sub2=nB>=5?'threshold met':'below threshold';bc=nB>=5?'var(--good)':'var(--mood)'}
    else if(P===3){big='1';sub1='criterion';sub2='in common';bc='var(--gold)'}
    else if(P===4){let tot=0;CNT.forEach((c,k)=>tot+=c*ramp(cb,k/5,(k+1)/5));big=String(Math.round(tot));sub1='ways to';sub2='qualify';bc='var(--dx)'}
    else if(P===5){big='3 · 6';sub1='most';sub2='central';bc='var(--dx)'}
    if(P===5)s+=`<circle cx="${L.cx}" cy="${L.cy+8}" r="40" style="fill:var(--panel);opacity:${f1(.9*ce)}"/>`;
    s+=`<text x="${L.cx}" y="${L.cy+4}" class="t-mid" style="font:800 ${P===5?26:34}px var(--display);fill:${bc}">${big}</text><text x="${L.cx}" y="${L.cy+22}" class="t-xs t-mid">${sub1}</text><text x="${L.cx}" y="${L.cy+34}" class="t-xs t-mid" style="fill:${bc}">${sub2}</text>`;
    /* panel: people */
    const X=L.px,Y=L.py,rows=N?[Y+18,Y+56,Y+94]:[Y+34,Y+86,Y+138],sq=20,sx=X+(N?118:104);
    const rowDef=[{l:'Person A',c:'var(--dx)',on:i=>A.indexOf(i)>=0&&A.indexOf(i)<nA,vis:P>=1},{l:'Person B',c:'var(--mood)',on:i=>B.indexOf(i)>=0&&B.indexOf(i)<nB,vis:P>=2},{l:'Shared',c:'var(--gold)',on:i=>i===4,vis:P>=3}];
    if(!N)s+=`<text x="${X}" y="${Y}" class="t-sm">TWO PEOPLE, ONE DIAGNOSIS</text>`;
    rowDef.forEach((r,k)=>{const y=rows[k],o=r.vis?(k===0?clamp(fa*3):k===1?clamp(fb*3):ov):0;if(o<=0)return;
      s+=`<g style="opacity:${f1(P>=4?.55:o)}">`+(k<2?person(X+8,y-13,24,r.c):`<circle cx="${X+8}" cy="${y-1}" r="7" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>`);
      const c=CR_C.reduce((a,_,i)=>a+(r.on(i)?1:0),0);
      s+=`<text x="${X+26}" y="${y-3}" class="t-lbl" style="fill:${r.c}">${r.l}</text><text x="${X+26}" y="${y+10}" class="t-xs">${k<2?c+' of 9'+(c>=5?' ✓':''):'criterion 5'}</text>`;
      for(let i=0;i<9;i++){const xx=sx+i*(sq+2),on=r.on(i);s+=`<rect x="${xx}" y="${y-sq/2-2}" width="${sq}" height="${sq}" rx="4" style="fill:${on?r.c:'var(--panel-2)'};stroke:${on?r.c:'var(--line)'}"/><text x="${xx+sq/2}" y="${y+2}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`}
      s+='</g>'});
    /* panel: combinations */
    const cy0=N?Y+132:Y+186,H=N?72:90,bot=cy0+H+40,bw=N?40:36,gap=(L.pw-30-5*bw)/4;
    if(P>=4||P===3&&ov>.9){const o=P>=4?1:.35;
      s+=`<g style="opacity:${o}"><text x="${X}" y="${cy0}" class="t-sm">WAYS TO MEET ≥5 OF 9</text>`;
      let tot=0;CNT.forEach((c,k)=>{const g=P>=4?ramp(cb,k/5,(k+1)/5):0;tot+=c*g;const h=Math.max(c/126*H,1.5)*g,x=X+30+k*(bw+gap);
        s+=`<rect x="${f1(x)}" y="${f1(bot-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${k===0?'var(--dx)':'var(--dx-soft)'};stroke:var(--dx)"/>`;
        if(g>0)s+=`<text x="${f1(x+bw/2)}" y="${f1(bot-h-5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${Math.round(c*g)}</text>`;
        s+=`<text x="${f1(x+bw/2)}" y="${bot+13}" class="t-xs t-mid">${k+5}</text>`});
      s+=`<line x1="${X+24}" x2="${X+L.pw}" y1="${bot}" y2="${bot}" class="axis"/><text x="${X+L.pw}" y="${bot+26}" class="t-xs t-end">criteria met</text>`;
      s+=`<text x="${X+L.pw}" y="${cy0+(N?4:6)}" class="t-end" style="font:800 ${N?22:28}px var(--display);fill:var(--dx)">${Math.round(tot)}</text><text x="${X+L.pw}" y="${cy0+(N?16:20)}" class="t-xs t-end">total</text></g>`}
    else if(P<3){s+=`<text x="${X}" y="${cy0+20}" class="t-xs" style="opacity:.7">How many different sets of five or more are there?</text>`}
    svg.innerHTML=s;
  }
  const stop=playWire(rg,$('#crPlay'),draw,15000,'Replay','criteria');
  setA=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the counter ---------- */
  const ring=$('#crRing'),rsvg=$('#crRingSvg'),det=$('#crDet'),sel=new Set();let last=-1;
  CR_C.forEach((c,i)=>{const q=(-90+i*40)*Math.PI/180,b=document.createElement('button');b.className='cr-tile';b.type='button';b.dataset.i=i;b.setAttribute('aria-pressed','false');
    b.style.left=f1(50+38*Math.cos(q))+'%';b.style.top=f1(50+38*Math.sin(q))+'%';b.innerHTML=`<b>${i+1}</b><span>${c.s[0]} ${c.s[1].replace(/[()]/g,'')}</span>`;b.setAttribute('aria-label',`Criterion ${i+1}: ${c.n}`);ring.appendChild(b)});
  const gates=$$('#crGate input');
  function upd(flip){
    $$('.cr-tile',ring).forEach(b=>{const i=+b.dataset.i;b.setAttribute('aria-pressed',sel.has(i));b.classList.toggle('last',i===last)});
    const n=sel.size,g=gates.filter(x=>x.checked).length,met=n>=5;
    let r=`<circle cx="50" cy="50" r="38" style="fill:none;stroke:var(--line);stroke-width:.5;stroke-dasharray:1.2 2"/><circle cx="50" cy="50" r="21" style="fill:none;stroke:var(--panel-2);stroke-width:4"/>`;
    if(n>0)r+=`<path d="${crArc(50,50,21,0,n*40)}" style="fill:none;stroke:${met?'var(--good)':'var(--dx)'};stroke-width:4;stroke-linecap:round"/>`;
    const tq=(200-90)*Math.PI/180;r+=`<line x1="${f1(50+18.5*Math.cos(tq))}" y1="${f1(50+18.5*Math.sin(tq))}" x2="${f1(50+23.5*Math.cos(tq))}" y2="${f1(50+23.5*Math.sin(tq))}" style="stroke:var(--ink);stroke-width:.7"/>`;
    r+=`<text x="50" y="50" text-anchor="middle" style="font:800 11px var(--display);fill:${met?'var(--good)':'var(--ink)'}">${n}/9</text><text x="50" y="55.6" text-anchor="middle" style="font:600 2.9px var(--mono);fill:var(--muted);letter-spacing:.15px">${met?'THRESHOLD MET':(5-n)+' MORE NEEDED'}</text>`;
    for(let k=0;k<4;k++)r+=`<circle cx="${44.6+k*3.6}" cy="60" r="1.2" style="fill:${gates[k].checked?'var(--dx)':'var(--panel-2)'};stroke:var(--dx);stroke-width:.3"><title>General criterion ${k+1}</title></circle>`;
    rsvg.innerHTML=r;
    if(last>=0){const c=CR_C[last];det.innerHTML=`<div class="kicker">Criterion ${last+1} · full wording · mnemonic letter ${c.m}</div><h4>${c.n}</h4><p>${c.w} [[APA2022,Kaess2025]]</p><p class="stage-cap">${sel.has(last)?'Counted':'Not counted'} · CLPS mean rating ${CR_MEAN[last].toFixed(2)} of 2</p>`;
      if(flip){det.classList.remove('flip');void det.offsetWidth;det.classList.add('flip')}}
    else det.innerHTML=`<div class="kicker">The flip side</div><h4>Tap a tile</h4><p>Each tile shows a short label. Tap it to count it, and its full wording appears here.</p>`;
    const v=$('#crVerdict');
    if(!met){v.className='verdict no';v.innerHTML=`${n} of 9: below the DSM-5-TR threshold of 5.${n?` Features below the threshold still matter: people with even one criterion had more co-occurring disorders, hospital admissions and time off work than people with none. [[Zimmerman2012JCP]]`:''}`}
    else if(g<4){v.className='verdict maybe';v.innerHTML=`${n} of 9 counted, but ${4-g} of the 4 general criteria ${4-g===1?'is':'are'} not ticked. A count alone is not a diagnosis: a clinician asks whether the pattern is enduring, pervasive and not better explained by something else.`}
    else{v.className='verdict yes';v.innerHTML=`${n} of 9 plus all four general criteria: the teaching threshold is met. In real care, this is where a clinician confirms each feature with a semi-structured interview, which is how BPD is diagnosed reliably. [[Leichsenring2024WP]]`}
    let inc=0;for(let k=Math.max(5,n);k<=9;k++)inc+=crBin(9-n,k-n);
    $('#crCombo').innerHTML=`<span>General criteria ticked: <b>${g}/4</b>.</span><span>Of the <b>256</b> ways to meet the threshold, <b>${inc}</b> include every tile you chose.</span>${n>=5?`<span>Your set is 1 of <b>${crBin(9,n)}</b> possible sets of exactly ${n}.</span>`:''}`;
  }
  ring.addEventListener('click',e=>{const b=e.target.closest('.cr-tile');if(!b)return;const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);last=i;upd(true)});
  gates.forEach(x=>x.addEventListener('change',()=>upd(false)));
  const ex=a=>{sel.clear();a.forEach(i=>sel.add(i));last=a[a.length-1];upd(true)};
  $('#crExA').addEventListener('click',()=>ex(A));$('#crExB').addEventListener('click',()=>ex(B));
  $('#crClear').addEventListener('click',()=>{sel.clear();last=-1;gates.forEach(x=>x.checked=false);upd(false)});
  upd(false);

  /* ---------- frequency rows ---------- */
  const fq=$('#crFreq');let order='dsm';
  fq.innerHTML=CR_C.map((c,i)=>`<div class="cr-row" data-i="${i}"><span class="lb"><b>${i+1}</b>${c.n}</span><span class="br" aria-hidden="true"><i style="width:${f1(CR_MEAN[i]/2*100)}%"></i></span><span class="vl">${CR_MEAN[i].toFixed(2)}</span><span class="ef">${CR_EF[i]||'No criterion-level accuracy figure in the sources used here.'}</span></div>`).join('');
  function sortRows(){
    const rows=$$('.cr-row',fq),before=new Map(rows.map(r=>[r,r.getBoundingClientRect().top]));
    const key=i=>order==='mean'?-CR_MEAN[i]:order==='ef'?(CR_EF[i]?0:1)*10+i/10:i;
    rows.sort((a,b)=>key(+a.dataset.i)-key(+b.dataset.i)).forEach(r=>fq.appendChild(r));
    const mx=Math.max(...CR_MEAN);rows.forEach(r=>r.classList.toggle('top',order==='mean'&&CR_MEAN[+r.dataset.i]===mx));
    rows.forEach(r=>{const d=before.get(r)-r.getBoundingClientRect().top;if(!d)return;r.style.transition='none';r.style.transform=`translateY(${d}px)`;
      requestAnimationFrame(()=>{r.style.transition='transform .45s ease';r.style.transform=''})});
  }
  $$('[data-crs]').forEach(b=>b.addEventListener('click',()=>{order=b.dataset.crs;$$('[data-crs]').forEach(x=>x.setAttribute('aria-pressed',x===b));sortRows()}));
  $('#crEfT').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);fq.classList.toggle('noef',!on)});
};
