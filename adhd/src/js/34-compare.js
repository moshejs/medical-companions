/* =============== 3.4 How well treatments work =============== */
inits.compare=()=>{
  const C=[ 'var(--drug)','var(--rx)','var(--da)','var(--ne)','var(--rcpt)' ];
  /* Cortese 2018: SMD vs placebo [est, lo, hi]; order of reveal = order in the list */
  const V={
    kid:{n:'Children & adolescents · clinician ratings',d:[
      {n:'Amphetamines',e:-1.02,lo:-1.19,hi:-.85,c:'var(--drug)'},
      {n:'Methylphenidate',e:-.78,lo:-.93,hi:-.62,c:'var(--rx)'},
      {n:'Atomoxetine',e:-.56,lo:-.66,hi:-.45,c:'var(--da)'}],
      tol:{n:'children',d:[{n:'Amphetamines',e:2.30,lo:1.36,hi:3.89,c:'var(--drug)'},{n:'Guanfacine',e:2.64,lo:1.20,hi:5.81,c:'var(--ne)'},{n:'Methylphenidate',ns:1,c:'var(--rx)'},{n:'Atomoxetine',ns:1,c:'var(--da)'}]}},
    kidT:{n:'Children · teacher ratings',d:[
      {n:'Methylphenidate',e:-.82,lo:-1.16,hi:-.48,c:'var(--rx)'},
      {n:'Modafinil',e:-.76,lo:-1.15,hi:-.37,c:'var(--rcpt)'}],
      tol:null},
    adult:{n:'Adults · clinician ratings',d:[
      {n:'Amphetamines',e:-.79,lo:-.99,hi:-.58,c:'var(--drug)'},
      {n:'Methylphenidate',e:-.49,lo:-.64,hi:-.35,c:'var(--rx)'},
      {n:'Bupropion',e:-.46,lo:-.85,hi:-.07,c:'var(--muted)'},
      {n:'Atomoxetine',e:-.45,lo:-.58,hi:-.32,c:'var(--da)'},
      {n:'Modafinil',e:.16,lo:-.28,hi:.59,c:'var(--rcpt)'}],
      tol:{n:'adults',d:[{n:'Amphetamines',e:3.26,lo:1.54,hi:6.92,c:'var(--drug)'},{n:'Methylphenidate',e:2.39,c:'var(--rx)'},{n:'Atomoxetine',e:2.33,c:'var(--da)'},{n:'Modafinil',e:4.01,c:'var(--rcpt)'}]}}
  };
  V.kidT.tol=V.kid.tol;
  const STEPS=[
    {from:0,at:.1,k:'Step 1 · the yardstick',t:'Zero is placebo',
     txt:`A network meta-analysis pools direct and indirect comparisons. Cortese and colleagues combined 133 double-blind RCTs, with 10,068 children and adolescents and 8,131 adults, for efficacy at about 12 weeks. The standardised mean difference (SMD) is the difference from placebo in symptom scores divided by the spread of scores: about 0.2 is called small, 0.5 medium and 0.8 large. Here negative means fewer symptoms. [[Cortese2018]]`,
     pt:`Every result is measured against people who took a dummy pill, so the bar starts at zero.`},
    {from:.18,at:.3,k:'Step 2 · amphetamines',t:'The largest average effect',
     txt:`On clinician ratings, amphetamines reached SMD −1.02 (95% CI −1.19 to −0.85) in children and adolescents and −0.79 (−0.99 to −0.58) in adults. Head to head, amphetamines also beat methylphenidate, atomoxetine and modafinil on clinician ratings (children SMDs −0.46 to −0.24; adults −0.94 to −0.29). [[Cortese2018]]`,
     pt:`On average, amphetamine medicines lowered clinician-rated symptoms the most.`},
    {from:.38,at:.5,k:'Step 3 · methylphenidate',t:'Large in children, moderate in adults',
     txt:`Methylphenidate reached SMD −0.78 (−0.93 to −0.62) in children on clinician ratings and −0.49 (−0.64 to −0.35) in adults. On teacher ratings in children it was −0.82 (−1.16 to −0.48), one of only two medicines with teacher-rated data that beat placebo. The authors concluded the evidence "supports methylphenidate in children and adolescents, and amphetamines in adults, as preferred first-choice medications". [[Cortese2018]]`,
     pt:`Methylphenidate is the usual first choice for children; amphetamines for adults.`,
     hook:`Cortese 2018: first choice methylphenidate in children and adolescents, amphetamines in adults (short-term). [[Cortese2018]]`},
    {from:.58,at:.7,k:'Step 4 · the others',t:'Atomoxetine, bupropion, modafinil',
     txt:`Atomoxetine reached −0.56 (−0.66 to −0.45) in children and −0.45 (−0.58 to −0.32) in adults; bupropion −0.46 in adults with a wide interval (−0.85 to −0.07). Modafinil did not beat placebo in adults (0.16, −0.28 to 0.59) although it did on children's teacher ratings (−0.76). The World Federation consensus calls the amphetamine effect large at all ages and atomoxetine's moderate. [[Cortese2018,Faraone2021]]`,
     pt:`Every medicine in children beat placebo, but some by a smaller margin. A wide line means the estimate is less certain.`,
     hook:`AAP: effect size about 1.0 for stimulants, 0.7 for non-stimulants. [[Wolraich2019]]`},
    {from:.78,at:.95,k:'Step 5 · tolerability',t:'Who stops because of side effects?',
     txt:`Odds ratios above 1 mean more dropouts because of adverse effects than on placebo. Amphetamines were worse than placebo in children (OR 2.30, 1.36–3.89) and adults (3.26, 1.54–6.92). Guanfacine was worse in children only (2.64, 1.20–5.81). Atomoxetine (2.33), methylphenidate (2.39) and modafinil (4.01) were worse in adults only. [[Cortese2018]]`,
     pt:`The medicine that helps most on average is not always the easiest to stay on. The best choice balances both.`,
     hook:`Tolerability ≠ efficacy: amphetamines top efficacy but have higher dropout odds (children OR 2.30). [[Cortese2018]]`}
  ];
  const svg=$('#cpSvg'),rg=$('#cpT');let view='kid',sel=null,setSt=()=>{};
  const reveal=(i,n,t)=>{const s=.18+.2*Math.min(i,2);return ease(ramp(t,s,s+.14))};
  function draw(t){const N=NARROW(),D=V[view];
    const L=N?{lx:112,x0:118,x1:386,y0:58,row:36}:{lx:176,x0:186,x1:700,y0:52,row:32};
    const sx=v=>L.x0+(v+1.4)/2.1*(L.x1-L.x0),h=D.d.length*L.row;const HH=Math.max(N?300:300,L.y0+h+56+(D.tol?D.tol.d.length*26+56:20));vb(svg,'720 '+HH,'400 '+HH);let s=`<defs></defs>`;
    s+=`<text x="${N?8:20}" y="20" class="t-sm" style="fill:var(--rx)">EFFICACY · ${N?D.n.replace(' & adolescents','').toUpperCase():D.n.toUpperCase()}</text>`;
    [-1.2,-.8,-.4,0,.4].forEach(v=>{s+=`<line x1="${f1(sx(v))}" x2="${f1(sx(v))}" y1="${L.y0-8}" y2="${L.y0+h}" class="${v?'grid':'axis'}"/><text x="${f1(sx(v))}" y="${L.y0+h+14}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`});
    s+=`<line x1="${f1(sx(0))}" x2="${f1(sx(0))}" y1="${L.y0-14}" y2="${L.y0+h}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(sx(0)+5)}" y="${L.y0-14}" class="t-xs" style="fill:var(--ink)">placebo</text>`;
    s+=`<text x="${f1(sx(-.05))}" y="${L.y0+h+30}" class="t-xs t-end">← fewer symptoms than placebo (SMD)</text>`;
    D.d.forEach((d,i)=>{const r=reveal(i,D.d.length,t),y=L.y0+12+i*L.row,e=lerp(0,d.e,r);
      s+=`<g class="clk" data-cpi="${i}" tabindex="0" role="button" aria-label="${d.n}: SMD ${d.e}, 95% CI ${d.lo} to ${d.hi}">`;
      s+=`<rect x="${N?2:10}" y="${y-13}" width="${L.x1-(N?2:10)}" height="26" style="fill:${sel===i?'var(--panel-2)':'transparent'}"/>`;
      s+=`<text x="${L.lx}" y="${y+4}" class="t-lbl t-end" style="font-size:${N?11.5:13}px">${d.n}</text>`;
      if(r>0){s+=`<line x1="${f1(sx(lerp(0,d.lo,r)))}" x2="${f1(sx(lerp(0,d.hi,r)))}" y1="${y}" y2="${y}" style="stroke:${d.c};stroke-width:3;stroke-linecap:round;opacity:.55"/>`;
        s+=`<circle class="dot" cx="${f1(sx(e))}" cy="${y}" r="${sel===i?8:6.5}" style="fill:${d.c};stroke:var(--panel);stroke-width:1.5"/>`;
        if(r>.98)s+=N?`<text x="${f1(sx(d.e))}" y="${y-10}" class="t-xs t-mid" style="fill:var(--ink)">${d.e.toFixed(2)}</text>`:`<text x="${f1(d.e>0?sx(d.hi)+6:sx(d.lo)-6)}" y="${y+4}" class="t-xs ${d.e>0?'':'t-end'}" style="fill:var(--ink)">${d.e.toFixed(2)}</text>`}
      s+='</g>'});
    /* tolerability panel */
    const T=D.tol,ty=L.y0+h+56,tp=ramp(t,.78,.95);
    if(T){const lx=v=>L.x0+(Math.log(v)-Math.log(.5))/(Math.log(8)-Math.log(.5))*(L.x1-L.x0),th=T.d.length*26;
      s+=`<text x="${N?8:20}" y="${ty}" class="t-sm" style="fill:${tp>0?'var(--warn)':'var(--muted)'}">TOLERABILITY · DROPOUTS FOR SIDE EFFECTS, ${T.n.toUpperCase()}${tp>0?'':' · step 5'}</text>`;
      [.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${ty+10}" y2="${ty+16+th}" class="${v===1?'axis':'grid'}"/><text x="${f1(lx(v))}" y="${ty+30+th}" class="t-xs t-mid">${v}</text>`});
      s+=`<line x1="${f1(lx(1))}" x2="${f1(lx(1))}" y1="${ty+10}" y2="${ty+16+th}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<text x="${L.x1}" y="${ty+44+th}" class="t-xs t-end">odds ratio vs placebo (log scale) · more dropouts →</text>`;
      T.d.forEach((d,i)=>{const y=ty+26+i*26;s+=`<text x="${L.lx}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${d.n}</text>`;
        if(d.ns){s+=`<text x="${f1(lx(1)+8)}" y="${y+4}" class="t-xs" style="opacity:${f1(tp)}">${N?'not sig. worse than placebo':'not significantly worse than placebo in '+T.n}</text>`;return}
        const e=Math.exp(lerp(0,Math.log(d.e),ease(tp)));
        if(d.lo&&tp>0)s+=`<line x1="${f1(lx(Math.exp(lerp(0,Math.log(d.lo),tp))))}" x2="${f1(lx(Math.exp(lerp(0,Math.log(d.hi),tp))))}" y1="${y}" y2="${y}" style="stroke:${d.c};stroke-width:3;opacity:.5;stroke-linecap:round"/>`;
        if(tp>0)s+=`<rect x="${f1(lx(e)-5)}" y="${y-5}" width="10" height="10" style="fill:${d.c}"/>`;
        if(tp>.98)s+=`<text x="${f1(lx(d.hi||d.e)+8)}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${d.e.toFixed(2)}${d.lo?'':' (CI not shown)'}</text>`})}
    else s+=`<text x="${N?8:20}" y="${ty}" class="t-xs">No separate teacher-rated tolerability: see the clinician views.</text>`;
    svg.innerHTML=s;const ph=phaseOf(STEPS,t);setSt(ph);$('#cpNote').innerHTML=noteHTML(STEPS[ph]);rd()}
  function rd(){const D=V[view];const d=sel!=null&&D.d[sel];
    $('#cpRead').innerHTML=d?`<span><b>${d.n}</b> · ${D.n}</span><span>SMD <b>${d.e.toFixed(2)}</b></span><span>95% CI <b>${d.lo.toFixed(2)} to ${d.hi.toFixed(2)}</b></span><span>${d.hi<0?'<b>beats placebo</b>':'<b>interval crosses zero: not better than placebo</b>'}</span>`:`<span>Tap or focus a dot for its numbers.</span>`}
  const stop=playWire(rg,$('#cpPlay'),draw,12000,'Replay','compare');
  setSt=stepWire($('#cpSteps'),STEPS,rg,draw,stop);
  const pick=e=>{const g=e.target.closest('[data-cpi]');if(!g)return;sel=+g.dataset.cpi;draw(+rg.value);const ng=svg.querySelector(`[data-cpi="${sel}"]`);if(ng&&e.type==='keydown')ng.focus()};
  svg.addEventListener('click',pick);svg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(e)}});
  $$('[data-cpv]').forEach(b=>b.addEventListener('click',()=>{stop();view=b.dataset.cpv;sel=null;$$('[data-cpv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- effect-size translator ---- */
  const erf=x=>{const s=x<0?-1:1;x=Math.abs(x);const a1=.254829592,a2=-.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=.3275911,u=1/(1+p*x);return s*(1-(((((a5*u+a4)*u)+a3)*u+a2)*u+a1)*u*Math.exp(-x*x))};
  const Phi=z=>.5*(1+erf(z/Math.SQRT2));
  const es=$('#cpEs'),dr=$('#cpD');
  function drawE(d){const N=vb(es,'720 280','400 300');const L=N?{x0:14,x1:386,y0:40,y1:220}:{x0:40,x1:680,y0:36,y1:220};
    const X=z=>L.x0+(z+3.4)/(3.4+4.6)*(L.x1-L.x0),pdf=z=>Math.exp(-z*z/2),Y=v=>L.y1-v*(L.y1-L.y0-14);
    let s='',a='',b='',o='';for(let i=0;i<=160;i++){const z=-3.4+i/160*8;a+=(i?'L':'M')+f1(X(z))+' '+f1(Y(pdf(z)));b+=(i?'L':'M')+f1(X(z))+' '+f1(Y(pdf(z-d)));o+=(i?'L':'M')+f1(X(z))+' '+f1(Y(Math.min(pdf(z),pdf(z-d))))}
    s+=`<path d="${o}L${f1(X(4.6))} ${L.y1}L${f1(X(-3.4))} ${L.y1}Z" style="fill:var(--gold);opacity:.28"/>`;
    s+=`<path d="${a}" style="fill:none;stroke:var(--muted);stroke-width:2.2"/><path d="${b}" style="fill:none;stroke:var(--rx);stroke-width:2.8"/>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.y1}" y2="${L.y1}" class="axis"/>`;
    [[0,'placebo mean','var(--muted)'],[d,'medicine mean','var(--rx)']].forEach(([z,l,c],i)=>{s+=`<line x1="${f1(X(z))}" x2="${f1(X(z))}" y1="${f1(Y(1))}" y2="${L.y1}" style="stroke:${c};stroke-dasharray:3 3"/>`;
      s+=`<text x="${f1(X(z)+(i?6:-6))}" y="${f1(Y(1)-6-(N&&d<.9?(i?0:12):0))}" class="t-xs ${i?'':'t-end'}" style="fill:${c}">${l}</text>`});
    s+=`<text x="${f1(X(d/2))}" y="${f1(Y(pdf(d/2))+(N?14:18))}" class="t-xs t-mid" style="fill:var(--ink)">overlap</text>`;
    s+=`<text x="${L.x1}" y="${L.y1+18}" class="t-xs t-end">symptom improvement →</text><text x="${L.x0}" y="18" class="t-sm" style="fill:var(--rx)">SMD ${d.toFixed(2)} · ${d<.2?'very small':d<.5?'small':d<.8?'medium':'large'}</text>`;
    es.innerHTML=s;
    const ovl=2*Phi(-d/2),ps=Phi(d/Math.SQRT2),u3=Phi(d),nnt=d>0.005?1/(2*ps-1):Infinity;
    $('#cpEsOut').innerHTML=`<div><small>Overlap of the two groups</small><b>${Math.round(ovl*100)}%</b></div><div><small>Chance a random treated person does better than a random placebo person</small><b>${Math.round(ps*100)}%</b></div><div><small>Treated people above the placebo average</small><b>${Math.round(u3*100)}%</b></div><div><small>Approximate NNT (formula)</small><b>${isFinite(nnt)&&nnt<100?f1(nnt):'—'}</b></div>`;
    $('#cpEsNote').innerHTML=noteHTML({k:'Effect size in plain numbers',t:d<.2?'Barely separable':d<.5?'Small: heavily overlapping groups':d<.8?'Medium: a clear average difference':'Large: by convention 0.8 or more',
      txt:`At SMD ${d.toFixed(2)}, the two groups still overlap by about ${Math.round(ovl*100)}%: many people on placebo improve more than many people on the medicine. Pick a preset to see published values: Cortese 2018 gives ${'−'}1.02 for amphetamines, −0.78 for methylphenidate and −0.56 for atomoxetine in children (clinician ratings); the AAP uses about 1.0 for stimulants and 0.7 for non-stimulants; parent training reached 0.35 on unblinded ADHD-symptom ratings. [[Cortese2018,Wolraich2019,Daley2014]]`,
      pt:`Even a large effect is an average. It cannot say in advance how much one person will improve.`,
      hook:`Larger SMD → smaller overlap, higher probability of superiority and lower NNT; all three come from the same number.`})}
  dr.addEventListener('input',()=>{$$('[data-cpd]').forEach(x=>x.setAttribute('aria-pressed',Math.abs(+x.dataset.cpd-+dr.value)<.005));drawE(+dr.value)});
  $$('[data-cpd]').forEach(b=>b.addEventListener('click',()=>{const from=+dr.value,to=+b.dataset.cpd;$$('[data-cpd]').forEach(x=>x.setAttribute('aria-pressed',x===b));animate(500,p=>{const v=lerp(from,to,ease(p));dr.value=v;drawE(v)})}));
  drawE(+dr.value);
  addEventListener('resize',()=>{if(cur==='compare'){drawE(+dr.value);drawC(bl)}});

  /* ---- blinded vs unblinded context ---- */
  const CX=[
    {n:'Behavioural interventions: ADHD symptoms',u:.35,b:null,bn:'not significant (no number in abstract)'},
    {n:'Behavioural interventions: conduct problems',u:.26,b:.31},
    {n:'All psychological treatments (range)',u:.64,ulo:.40,b:null,bn:'behavioural, neurofeedback, cognitive training: n.s.'},
    {n:'Neurofeedback: total ADHD symptoms',u:.35,b:.04},
    {n:'Cognitive training: total ADHD symptoms',u:.37,b:.20},
    {n:'Free fatty acid supplements',u:null,b:.16,un:'(blinded value only)'},
    {n:'Artificial food colour exclusion',u:null,b:.42,un:'(blinded value only; selected samples)'}];
  const ctx=$('#cpCtx');let bl=0;
  function drawC(p){const N=vb(ctx,'720 330','400 470');
    const L=N?{x0:16,x1:380,y0:40,row:58,lab:-16}:{x0:300,x1:690,y0:44,row:38,lab:0},S=v=>L.x0+v/1.1*(L.x1-L.x0);let s='';
    s+=`<text x="${N?16:20}" y="20" class="t-sm" style="fill:var(--beh)">${p<.5?'UNBLINDED: RATED BY PEOPLE CLOSEST TO TREATMENT':'PROBABLY BLINDED RATINGS'}</text>`;
    const H=CX.length*L.row;[0,.2,.4,.6,.8,1].forEach(v=>s+=`<line x1="${f1(S(v))}" x2="${f1(S(v))}" y1="${L.y0-6}" y2="${L.y0+H-10}" class="${v?'grid':'axis'}"/><text x="${f1(S(v))}" y="${L.y0+H+4}" class="t-xs t-mid">${v}</text>`);
    [[1,'stimulants ≈1.0'],[.7,'non-stimulants ≈0.7']].forEach(([v,l])=>s+=`<line x1="${f1(S(v))}" x2="${f1(S(v))}" y1="${L.y0-6}" y2="${L.y0+H-10}" style="stroke:var(--rx);stroke-dasharray:5 4;stroke-width:1.4"/><text x="${f1(S(v)-4)}" y="${L.y0+H+18}" class="t-xs t-end" style="fill:var(--rx)">${l}</text>`);
    CX.forEach((c,i)=>{const y=L.y0+i*L.row+(N?14:0);
      s+=`<text x="${N?L.x0:L.x0-10}" y="${N?y-12:y+4}" class="t-sm ${N?'':'t-end'}" style="fill:var(--ink)">${c.n}</text>`;
      const u=c.u,b=c.b;let v=null,op=1;
      if(u!=null&&b!=null)v=lerp(u,b,p);else if(u!=null){v=u*(1-p);op=1-p*.6}else{v=b*p;op=.4+.6*p}
      if(v!=null&&v>0.001){if(c.ulo&&p<.5)s+=`<rect x="${f1(S(0))}" y="${y-7}" width="${f1(S(c.ulo*(1-p))-S(0))}" height="14" rx="3" style="fill:var(--beh);opacity:${f1(op)}"/><rect x="${f1(S(c.ulo*(1-p)))}" y="${y-7}" width="${f1(S(v)-S(c.ulo*(1-p)))}" height="14" rx="3" style="fill:var(--beh);opacity:${f1(op*.4)}"/>`;
        else s+=`<rect x="${f1(S(0))}" y="${y-7}" width="${f1(S(v)-S(0))}" height="14" rx="3" style="fill:var(--beh);opacity:${f1(op)}"/>`}
      const note=p<.5?(u!=null?(c.ulo?c.ulo.toFixed(2)+'–'+u.toFixed(2):u.toFixed(2)):c.un):(b!=null?b.toFixed(2):c.bn);
      s+=`<text x="${f1(S(Math.max(v||0,c.ulo&&p<.5?u:0))+6)}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${note}</text>`});
    ctx.innerHTML=s}
  $$('[data-cpb]').forEach(b=>b.addEventListener('click',()=>{const to=+b.dataset.cpb,from=bl;$$('[data-cpb]').forEach(x=>x.setAttribute('aria-pressed',x===b));bl=to;animate(700,q=>drawC(lerp(from,to,ease(q))))}));
  drawC(0);
};
