/* =============== 3.3 Non-stimulant medicines =============== */
inits.nonstim=()=>{
  const svg=$('#nsSvg'),rg=$('#nsT');let drug='atx',setSt=()=>{};
  const NAMES={atx:'Atomoxetine',vlx:'Viloxazine ER',gxr:'Guanfacine ER',clon:'Clonidine ER'};
  const isNET=d=>d==='atx'||d==='vlx';
  /* ---- step notes ---- */
  const NET0={from:0,at:.12,k:'Step 1 · the untreated synapse',t:'Noradrenaline is recycled fast',
    txt:`In the prefrontal cortex a vesicle releases noradrenaline (periwinkle) into the cleft, and the noradrenaline transporter (NET, teal) pulls it back into the terminal within moments. In this region NET also clears dopamine, because dopamine transporters are sparse there. Prefrontal networks hold goals "in mind", and small changes in noradrenaline or dopamine have large effects on them. [[Arnsten2009CNS,Bymaster2002]]`,
    pt:`The signal is switched off quickly because the sending cell vacuums its messenger back up.`};
  const STEPS={
    atx:[NET0,
     {from:.2,at:.32,k:'Step 2 · atomoxetine arrives',t:'A selective NET blocker',
      txt:`The Strattera label says the mechanism "is thought to be related to selective inhibition of the pre-synaptic norepinephrine transporter". Atomoxetine binds human NET far more tightly than the serotonin or dopamine transporters (Ki 5, 77 and 1,451 nM). In monkey PET, clinically relevant doses were estimated to occupy more than 90% of NET and more than 85% of the serotonin transporter. [[FDA-Strattera,Bymaster2002,Ding2014Atomoxetine]]`,
      pt:`The medicine sits in the recycling pump, so the messenger stays outside the cell for longer.`,
      hook:`Atomoxetine = selective noradrenaline reuptake inhibitor; not a stimulant and not a controlled substance. [[FDA-Strattera]]`},
     {from:.4,at:.5,k:'Step 3 · the cleft fills',t:'Noradrenaline and dopamine rise in the prefrontal cortex only',
      txt:`In rats, atomoxetine raised extracellular noradrenaline about 3-fold and dopamine about 3-fold in the prefrontal cortex, without changing dopamine in the striatum or nucleus accumbens. Its activity marker Fos rose 3.7-fold in the prefrontal cortex but not in the striatum, and the authors predicted no motor or misuse liability. <span class="ev hyp">Hypothesis</span> That prefrontal-selective rise is thought to carry the therapeutic effect. [[Bymaster2002]]`,
      pt:`More messenger reaches the thinking part at the front of the brain, but not the reward centre deeper down.`,
      hook:`Atomoxetine raises prefrontal dopamine via NET but leaves striatal dopamine alone (rat), which is why it lacks stimulant-type misuse potential. [[Bymaster2002]]`},
     {from:.6,at:.68,k:'Step 4 · the prefrontal network',t:'More signal, less noise',
      txt:`In monkeys doing a working-memory task, atomoxetine followed an inverted-U: moderate doses helped, higher doses did not. At the cellular level it raised firing for a neuron's preferred direction ("signal") and lowered firing for non-preferred directions ("noise"). Blocking alpha-2 or D1 receptors removed the benefit. [[Gamo2010]]`,
      pt:`The front of the brain gets better at holding on to what matters and tuning out what does not.`},
     {from:.8,at:.92,k:'Step 5 · the rest of the body',t:'Heart rate, the liver and CYP2D6',
      txt:`Atomoxetine is metabolised mainly by CYP2D6. Normal metabolisers have a half-life of 5.2 hours; poor metabolisers 21.6 hours, with 3.3-fold accumulation. Poor metabolisers had larger heart-rate rises (9.4 vs 5 bpm in children) and stopped more often for adverse reactions (11% vs 6%). The label suggests considering CYP2D6 testing and a 4-week titration interval for poor metabolisers or with strong CYP2D6 inhibitors. It also carries a boxed warning for suicidal thoughts in children 6 and older, and a severe liver injury warning. [[FDA-Strattera,Brown2019CPIC]]`,
      pt:`Some people's livers break atomoxetine down slowly, so it stays in their body four times longer.`,
      hook:`CYP2D6 poor metabolisers: atomoxetine half-life 21.6 h vs 5.2 h; titrate more slowly (4-week steps). [[FDA-Strattera]]`}],
    vlx:[NET0,
     {from:.2,at:.32,k:'Step 2 · viloxazine arrives',t:'NET inhibition plus serotonin receptors',
      txt:`The Qelbree label calls the mechanism "unclear" but thought to work through noradrenaline reuptake inhibition: viloxazine binds NET (Ki 0.13 μM) and is a partial agonist at 5-HT2C receptors (Ki 0.66 μM). A 2026 study also found 5-HT2B and 5-HT7 antagonism. [[FDA-Qelbree,GarciaOlivares2026]]`,
      pt:`Viloxazine blocks the same recycling pump as atomoxetine, and also touches some serotonin receptors.`,
      hook:`Viloxazine: NET inhibitor + 5-HT2C partial agonist; boxed warning for suicidal thoughts and behaviour. [[FDA-Qelbree]]`},
     {from:.4,at:.5,k:'Step 3 · how much is occupied',t:'Near-complete NET occupancy',
      txt:`At clinically relevant unbound plasma levels (0.4–3.6 μM), viloxazine was estimated to occupy nearly 95% of NET, more than 80% of 5-HT2C and 5-HT2B receptors and 65% of 5-HT7 receptors (the bars). In rat microdialysis it raised serotonin in the prefrontal cortex and had moderate NET-inhibiting effects. [[GarciaOlivares2026,Yu2020Viloxazine]]`,
      pt:`At normal doses almost all the recycling pumps are blocked, and several serotonin receptors are partly occupied too.`},
     {from:.6,at:.68,k:'Step 4 · a new label?',t:'A "serotonin norepinephrine modulating agent"',
      txt:`<span class="ev hyp">Hypothesis</span> Because of its serotonin actions, Yu and colleagues proposed calling viloxazine a "serotonin norepinephrine modulating agent". Whether the serotonin effects add to its ADHD benefit is not known. Clinically, 100 and 200 mg improved ADHD-RS-5 scores versus placebo from week 1 in children aged 6–11, and in adults AISRS scores fell 15.5 vs 11.7 points at week 6. [[Yu2020Viloxazine,Nasser2020Children,Nasser2022Adults]]`,
      pt:`Scientists are still working out which of its actions matter most for ADHD.`},
     {from:.8,at:.92,k:'Step 5 · the rest of the body',t:'Sleep, heart rate and CYP1A2',
      txt:`Adults on Qelbree reported more insomnia (23% vs 7%), headache, nausea and fatigue than on placebo. In children aged 6–11 on 100 mg, 22% had a heart-rate rise of at least 20 bpm at some point, vs 9% on placebo. It is contraindicated with MAOIs and with sensitive or narrow-range CYP1A2 substrates. Half-life is 7.02 hours, with steady state after 2 days. [[FDA-Qelbree]]`,
      pt:`Trouble sleeping and a faster heartbeat are the effects most worth watching.`,
      hook:`Viloxazine interacts through CYP1A2; atomoxetine through CYP2D6. [[FDA-Qelbree,FDA-Strattera]]`}],
    gxr:[
     {from:0,at:.12,k:'Step 1 · a prefrontal dendritic spine',t:'Leaky connections',
      txt:`Prefrontal pyramidal cells hold information by exciting each other through synapses on dendritic spines. In monkeys, cAMP signalling in the spine opens HCN channels, which let current leak out and weaken the incoming signal; with too much cAMP, network firing collapses. Blocking prefrontal alpha-2A receptors in animals produces an ADHD-like profile of hyperactivity, impulsivity and poor working memory. [[Wang2007Cell,Arnsten2009CNS]]`,
      pt:`The connection is like a leaky hose: part of the signal drains away before it arrives.`},
     {from:.2,at:.32,k:'Step 2 · guanfacine binds',t:'A selective alpha-2A agonist',
      txt:`Guanfacine is a central alpha-2A agonist and not a CNS stimulant; its label says its mechanism in ADHD is not known. It has 15 to 20 times higher affinity for alpha-2A receptors than for alpha-2B or alpha-2C, and it stimulates postsynaptic alpha-2A receptors on the spines of prefrontal pyramidal cells. [[FDA-Intuniv,Arnsten2010]]`,
      pt:`Instead of raising noradrenaline, guanfacine imitates it at one particular receptor.`,
      hook:`Guanfacine works on the receptor (agonist), not on the transporter. [[FDA-Intuniv]]`},
     {from:.4,at:.5,k:'Step 3 · cAMP falls, channels close',t:'Plugging the leak',
      txt:`<span class="ev est">Established in animal studies</span> Alpha-2A stimulation inhibits cAMP signalling, and the HCN channels that sit next to alpha-2A receptors on the spine close. With less current leaking out, inputs from neighbouring prefrontal neurons have more effect. [[Wang2007Cell,Arnsten2010]]`,
      pt:`Closing the leak lets more of each incoming signal through.`},
     {from:.6,at:.68,k:'Step 4 · the network holds',t:'Persistent firing for working memory',
      txt:`In monkeys, this strengthened delay-period firing, the activity that keeps a cue in mind after it disappears, and improved working memory. <span class="ev hyp">Hypothesis</span> Because imaging shows weaker prefrontal connections in ADHD, Arnsten argues that medicines strengthening prefrontal networks may help. In an 8-week trial in ages 6–17, ADHD-RS-IV totals fell 16.2–18.9 points on 2–4 mg vs 8.5 on placebo. [[Wang2007Cell,Arnsten2010,Biederman2008GXR]]`,
      pt:`The front of the brain can hold an idea for longer before it fades.`},
     {from:.8,at:.92,k:'Step 5 · brainstem and body',t:'Lower blood pressure, sleepiness, and a taper',
      txt:`Stimulating central alpha-2A receptors lowers sympathetic outflow to the heart and blood vessels. In children, guanfacine lowered systolic pressure by 2.83 mm Hg and pulse by 4.06 bpm versus placebo. Somnolence rose with dose from 28% at 1 mg to 51% at 4 mg (11% on placebo). Abrupt stopping "can lead to clinically significant and persistent rebound hypertension", so the label tapers by no more than 1 mg every 3 to 7 days. [[FDA-Intuniv,Farhat2025CV]]`,
      pt:`Guanfacine can make people sleepy and lowers blood pressure. Stopping it suddenly can make blood pressure jump.`,
      hook:`Taper guanfacine ER (≤1 mg every 3–7 days) to avoid rebound hypertension; avoid high-fat meals (Cmax +75%). [[FDA-Intuniv]]`}],
    clon:[]
  };
  STEPS.clon=STEPS.gxr.map((s,i)=>Object.assign({},s));
  Object.assign(STEPS.clon[1],{k:'Step 2 · clonidine binds',t:'An alpha-2 agonist',
    txt:`Clonidine stimulates alpha-2 adrenergic receptors in the brain and is not a CNS stimulant; its label says its mechanism in ADHD is not known. Guanfacine is the one described as 15 to 20 times more selective for the alpha-2A subtype. Both extended-release forms are labelled as monotherapy and as add-ons to stimulants. [[FDA-OnydaXR,FDA-Intuniv]]`,
    pt:`Clonidine imitates noradrenaline at alpha-2 receptors, like guanfacine.`,
    hook:`Clonidine ER and guanfacine ER: alpha-2 agonists, used alone or added to a stimulant. [[FDA-OnydaXR,FDA-Intuniv]]`});
  Object.assign(STEPS.clon[3],{txt:`The prefrontal account drawn here comes from alpha-2A studies in monkeys; the clonidine label states no mechanism. In an 8-week trial in ages 6–17 (n = 236), clonidine ER 0.2 and 0.4 mg/day improved ADHD-RS-IV scores versus placebo, separating "as soon as week 2". [[FDA-OnydaXR,Wang2007Cell,Jain2011]]`});
  Object.assign(STEPS.clon[4],{t:'Brainstem, sedation and a taper',
    txt:`Clonidine lowers sympathetic outflow from the brainstem, reducing vascular resistance, heart rate and blood pressure. Somnolence was 38% at 0.2 mg/day and 31% at 0.4 mg/day vs 4% on placebo, and 19% vs 7% as an add-on to stimulants; the label gives an equal or larger dose at bedtime. Doses are tapered by no more than 0.1 mg every 3 to 7 days to avoid rebound hypertension. [[FDA-OnydaXR,FDA-ClonidineER]]`,
    pt:`Sleepiness is the most common effect, so the bigger dose is given at night. It must be stopped slowly.`,
    hook:`Clonidine ER: taper ≤0.1 mg every 3–7 days; doses above 0.4 mg/day not recommended. [[FDA-ClonidineER]]`});
  /* ---- drawing ---- */
  function spine(bx,by,o){const cx=bx+170,hy=by+112;let s='';const bind=o.bind,cl=o.close,op=1-cl;
    /* presynaptic input from a neighbouring prefrontal neuron */
    s+=`<path d="M${cx-30} ${by-4}Q${cx} ${by+8} ${cx+30} ${by-4}V${by+34}Q${cx} ${by+52} ${cx-30} ${by+34}Z" style="fill:var(--cell);stroke:var(--neuron);stroke-width:1.5"/>`;
    for(let i=0;i<5;i++)s+=`<circle cx="${cx-14+i*7}" cy="${by+38+(i%2)*4+o.ph*10%6}" r="2" style="fill:var(--brand);opacity:.8"/>`;
    s+=`<text x="${cx+40}" y="${by+12}" class="t-xs">input from a neighbouring cell</text>`;
    /* dendrite shaft and spine */
    s+=`<rect x="${bx}" y="${by+200}" width="380" height="34" rx="16" style="fill:var(--cell);stroke:var(--neuron);stroke-width:1.6"/>`;
    s+=`<path d="M${cx-12} ${by+202}V${hy+40}M${cx+12} ${by+202}V${hy+40}" style="stroke:var(--neuron);stroke-width:1.6"/><rect x="${cx-11}" y="${hy+36}" width="22" height="${by+204-(hy+36)}" style="fill:var(--cell)"/>`;
    s+=`<ellipse cx="${cx}" cy="${hy}" rx="74" ry="52" style="fill:var(--cell);stroke:var(--neuron);stroke-width:1.6"/>`;
    s+=`<text x="${bx+6}" y="${by+222}" class="t-xs">dendrite of a prefrontal pyramidal cell</text>`;
    /* signal arriving: arrow strength grows as the leak closes */
    s+=`<path d="M${cx} ${by+50}V${hy-38}" style="stroke:var(--brand);stroke-width:${f1(1.5+2.5*cl)};opacity:${f1(.5+.5*cl)}" marker-end="url(#nsArrB)"/>`;
    /* alpha-2 receptor on the left of the head */
    const rx=cx-66,ry=hy-20;s+=`<path d="M${rx-8} ${ry-6}L${rx} ${ry+2}L${rx-8} ${ry+10}" style="fill:none;stroke:var(--rcpt);stroke-width:3;stroke-linejoin:round"/>`;
    s+=`<text x="${rx-14}" y="${ry-12}" class="t-sm t-end" style="fill:var(--rcpt)">${o.clon?'α2':'α2A'} receptor</text>`;
    if(bind>0)s+=`<circle cx="${f1(lerp(rx-60,rx-12,ease(bind)))}" cy="${ry+2}" r="6" style="fill:var(--drug);stroke:var(--panel);stroke-width:1"/>`;
    if(bind>0)s+=`<text x="${rx-14}" y="${ry+26}" class="t-xs t-end" style="fill:var(--drug)">${o.clon?'clonidine':'guanfacine'}</text>`;
    /* cAMP inside the head */
    const nC=Math.round(12*(1-cl*.85)),rr=rng(5);for(let i=0;i<12;i++){const a=rr()*Math.PI*2,d=rr()*34;if(i<nC)s+=`<text x="${f1(cx-8+Math.cos(a)*d*1.2)}" y="${f1(hy+6+Math.sin(a)*d*.7)}" class="t-xs t-mid" style="fill:var(--gold)">●</text>`}
    s+=`<text x="${cx}" y="${hy+44}" class="t-xs t-mid" style="fill:var(--gold)">cAMP ${cl>.5?'low':'high'}</text>`;
    /* HCN channel on the right */
    const hx=cx+72,hyy=hy+4,gap=1+op*7;s+=`<rect x="${f1(hx-gap/2-6)}" y="${hyy-12}" width="6" height="24" rx="2" style="fill:var(--dat)"/><rect x="${f1(hx+gap/2)}" y="${hyy-12}" width="6" height="24" rx="2" style="fill:var(--dat)"/>`;
    if(op>.05)for(let i=0;i<3;i++){const d=(o.ph*3+i/3)%1;s+=`<circle cx="${f1(hx+6+d*40)}" cy="${f1(hyy+(i-1)*6)}" r="2.4" style="fill:var(--brand);opacity:${f1(op*(1-d))}"/>`}
    s+=`<text x="${hx+12}" y="${hyy-18}" class="t-sm" style="fill:var(--dat)">HCN ${op>.5?'open: leak':'closed'}</text>`;
    s+=`<defs>${marker('nsArrB','var(--brand)',5)}</defs>`;
    return s}
  function bars(x,y,w,rows,title,N){let s=`<text x="${x}" y="${y}" class="t-xs">${title}</text>`;
    rows.forEach((r,i)=>{const yy=y+12+i*17,lw=N?96:104,bw=w-lw-44;
      s+=`<text x="${x+lw-6}" y="${yy+9}" class="t-xs t-end" style="fill:var(--ink)">${r[0]}</text><rect x="${x+lw}" y="${yy}" width="${bw}" height="11" rx="3" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${x+lw}" y="${yy}" width="${f1(bw*clamp(r[1]))}" height="11" rx="3" style="fill:${r[3]||'var(--ne)'}"/><text x="${f1(x+lw+bw+4)}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${r[2]}</text>`});
    return s}
  const BODY={atx:['Heart rate up: +5.58 bpm vs placebo (children, NMA)','CYP2D6 poor metabolisers: t½ 21.6 h vs 5.2 h','Boxed warning: suicidal thoughts (age 6+)','Liver injury warning; not controlled'],
    vlx:['Heart rate up: +2.79 bpm vs placebo (children, NMA)','≥20 bpm rise: 22% vs 9% (ages 6–11, 100 mg)','Boxed warning: suicidal thoughts and behaviour','CYP1A2 substrates contraindicated'],
    gxr:['Pulse −4.06 bpm, SBP −2.83 mm Hg (children)','Somnolence 28–51% (1–4 mg) vs 11%','Hypotension 7% vs 3%','Stop by tapering: rebound hypertension'],
    clon:['Sympathetic outflow from brainstem ↓','Somnolence 38% (0.2 mg/day) vs 4%','Larger dose at bedtime','Stop by tapering: rebound hypertension']};
  function draw(t){const N=vb(svg,'720 420','400 660'),net=isNET(drug),ph=phaseOf(STEPS[drug],t);
    const blk=ramp(t,.2,.38),lvl=lerp(.22,.9,ramp(t,.38,.55)),glow=ramp(t,.55,.72),body=ramp(t,.78,.9),fz=t<.2?(t*12)%1:0;
    let s=`<text x="14" y="20" class="t-sm" style="fill:var(--rx)">${NAMES[drug].toUpperCase()} · ${net?'PREFRONTAL SYNAPSE':'PREFRONTAL DENDRITIC SPINE'}</text>`;
    if(net){const sy=synapse(N?50:40,34,300,{nt:'ne',tlabel:'NET',labels:true,fuse:t<.2?fz:1,level:lvl,uptake:1,block:blk,seed:7});s+=sy.svg;
      /* dopamine is also cleared by NET in the prefrontal cortex */
      if(drug==='atx'){const rr=rng(31),k=300/200,ox=N?50:40;const nd=Math.round(lvl*9);for(let i=0;i<nd;i++){s+=`<circle cx="${f1(ox+(40+rr()*120)*k)}" cy="${f1(34+(100+rr()*12)*k)}" r="2.3" style="fill:var(--da);stroke:var(--panel);stroke-width:.6"/>`}}
      const bx=N?14:20,by=N?326:332,bw=N?372:400;
      if(drug==='atx')s+=bars(bx,by,bw,[['PFC noradrenaline',lerp(1,3,ramp(t,.38,.55))/3.5,'×'+f1(lerp(1,3,ramp(t,.38,.55)))],['PFC dopamine',lerp(1,3,ramp(t,.38,.55))/3.5,'×'+f1(lerp(1,3,ramp(t,.38,.55))),'var(--da)'],['striatal dopamine',1/3.5,'×1.0','var(--da)']],'rat microdialysis, fold change from baseline (Bymaster 2002)',N);
      else s+=bars(bx,by,bw,[['NET',.95*blk,Math.round(95*blk)+'%'],['5-HT2C (agonist)',.8*blk,'>'+Math.round(80*blk)+'%','var(--rcpt)'],['5-HT2B (antag.)',.8*blk,'>'+Math.round(80*blk)+'%','var(--rcpt)'],['5-HT7 (antag.)',.65*blk,Math.round(65*blk)+'%','var(--rcpt)']],'estimated occupancy at clinical levels (García-Olivares 2026)',N);
    }else{const bx=N?10:20,by=N?50:44;s+=spine(bx,by,{bind:blk,close:ramp(t,.38,.55),ph:t*20,clon:drug==='clon'});
      /* delay-period firing trace */
      const fy=N?352:340,fw=N?370:390,pers=ramp(t,.55,.72);
      s+=`<text x="${bx}" y="${fy-26}" class="t-xs">delay-period firing after a cue (working memory)</text>`;
      s+=`<rect x="${bx}" y="${fy-18}" width="18" height="36" style="fill:var(--brand-soft)"/><text x="${bx+9}" y="${fy+30}" class="t-xs t-mid">cue</text>`;
      s+=wave(bx+18,fy,fw-18,15,{freq:13,noise:.3,damp:lerp(.97,.12,pers),c:'var(--brand)',sw:1.6,seed:4});
      s+=`<text x="${bx+fw}" y="${fy+30}" class="t-xs t-end" style="fill:var(--ink)">${pers>.5?'activity holds':'activity fades'}</text>`}
    /* brain and body */
    const B=N?{x:20,y:392,s:170}:{x:452,y:56,s:250};const br=brain(B.x,B.y,B.s,{hl:['pfc'],act:{pfc:glow},labels:!N});s+=br.svg;
    const [px,py]=br.at.pfc;if(glow>0)s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(B.s*.16+6*Math.sin(t*40))}" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:${f1(glow)}"/>`;
    if(drug==='atx'&&t>=.4){const [sx,sy2]=br.at.str;s+=`<text x="${f1(sx)}" y="${f1(sy2-(N?20:26))}" class="t-xs t-mid" style="fill:var(--ink)">striatal DA unchanged</text>`}
    if(!net&&body>0){const [tx,ty]=br.at.stem;s+=`<circle cx="${f1(tx)}" cy="${f1(ty-8)}" r="${f1(9+4*body)}" style="fill:var(--ne);opacity:${f1(.35*body)}"/><text x="${f1(tx-16)}" y="${f1(ty+4)}" class="t-xs t-end" style="fill:var(--ne)">brainstem</text>`}
    const by0=N?572:300,bx0=N?14:452;
    s+=`<text x="${bx0}" y="${by0}" class="t-sm" style="fill:${body>0?'var(--ink)':'var(--muted)'}">IN THE BODY${body>0?'':' · step 5'}</text>`;
    BODY[drug].forEach((l,i)=>{s+=`<text x="${bx0}" y="${by0+20+i*19}" class="t-xs" style="fill:var(--ink);opacity:${f1(clamp(body*4-i))}">• ${l}</text>`});
    svg.innerHTML=s;setSt(ph);$('#nsNote').innerHTML=noteHTML(STEPS[drug][ph]);
  }
  const stop=playWire(rg,$('#nsPlay'),draw,16000,'Replay','nonstim');
  function wire(){const old=$('#nsSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS[drug],rg,draw,stop)}
  $$('[data-nsd]').forEach(b=>b.addEventListener('click',()=>{stop();drug=b.dataset.nsd;$$('[data-nsd]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value);drawW(+$('#nsWkT').value)}));
  wire();draw(+rg.value);

  /* ---- weeks to full effect ---- */
  const wsv=$('#nsWk'),wr=$('#nsWkT'),W1=12;
  const CUR=[
    {id:'stim',n:'Stimulant (lisdexamfetamine, adults)',s:'stimulant',c:'var(--drug)',f:w=>1-Math.exp(-w/.35),a:[{w:1,l:'separates from week 1'}]},
    {id:'vlx',n:'Viloxazine ER (ages 6–11)',s:'viloxazine',c:'var(--rcpt)',f:w=>1-Math.exp(-w/1.6),a:[{w:1,l:'from week 1'}]},
    {id:'clon',n:'Clonidine ER (ages 6–17)',s:'clonidine',c:'var(--ne)',f:w=>w<.4?0:1-Math.exp(-(w-.4)/1.9),a:[{w:2,l:'"as soon as week 2"'}]},
    {id:'gxr',n:'Guanfacine ER (ages 6–17)',s:'guanfacine',c:'var(--rx)',f:w=>1-Math.exp(-Math.pow(w/3,1.4)),a:[{w:8,l:'8-wk trial endpoint'}]},
    {id:'atx',n:'Atomoxetine',s:'atomoxetine',c:'var(--da)',f:w=>w<.5?0:1-Math.exp(-(w-.5)/6.5),a:[{w:1.5,l:'onset 1–2 wk'},{w:12,l:'still rising'}]}];
  const WN=[
    {from:0,k:'Week 0–1',t:'Stimulants work from the first dose',txt:`In an adult trial, lisdexamfetamine 30, 50 and 70 mg separated from placebo "beginning at week 1 and for each week throughout"; clinician-rated improvement was 57–62% vs 29% on placebo. Viloxazine ER separated from week 1 in children aged 6–11. [[Adler2008LDX,Nasser2020Children]]`,pt:`A stimulant works the day it is taken; most non-stimulants build up over weeks.`},
    {from:1/W1,k:'Weeks 1–2',t:'Atomoxetine and clonidine begin',txt:`A review found atomoxetine "can have an onset of action within 1-2 weeks" (Early evidence; nonsystematic review). Clonidine ER separated from placebo "as soon as week 2". Guanfacine ER starts at 1 mg and rises by no more than 1 mg a week, so the target dose itself takes weeks to reach. [[Clemow2015,Jain2011,FDA-Intuniv]]`,hook:`Guanfacine ER titration: start 1 mg, increase by ≤1 mg/week. [[FDA-Intuniv]]`},
    {from:3/W1,k:'Weeks 3–8',t:'Titration and the trial endpoints',txt:`Viloxazine's children's trial ran 6 weeks and its adult trial reported AISRS change at week 6 (15.5 vs 11.7 points). Guanfacine ER's 8-week trial ended with ADHD-RS-IV falls of 16.18, 16.43 and 18.87 points on 2, 3 and 4 mg vs 8.48 on placebo. For CYP2D6 poor metabolisers the atomoxetine label suggests 4-week titration steps. [[Nasser2020Children,Nasser2022Adults,Biederman2008GXR,FDA-Strattera]]`,pt:`Judging a non-stimulant after a few days is too early. Trials measure them over 6 to 8 weeks or longer.`},
    {from:8.5/W1,k:'Weeks 9–12 and beyond',t:'Atomoxetine keeps improving',txt:`Atomoxetine's response increases gradually for up to 24 weeks or longer, and single daily doses gave 24-hour efficacy despite a 5-hour plasma half-life (Early evidence; nonsystematic review). In two 10-week adult trials it beat placebo on both symptom domains, with fewer than 10% stopping for adverse events. [[Clemow2015,Michelson2003ATX]]`,hook:`Atomoxetine may start in 1–2 weeks but keeps improving for months; stimulants separate from placebo in week 1. [[Clemow2015,Adler2008LDX]]`}];
  function drawW(t){const N=vb(wsv,'720 320','400 470'),wk=t*W1;
    const L=N?{x:44,y:30,w:340,h:210}:{x:60,y:30,w:440,h:230};
    const A=axes(L.x,L.y,L.w,L.h,{x0:0,x1:W1,y0:0,y1:1.05,xt:[0,2,4,6,8,10,12],yt:[0,.5,1],fy:v=>v?Math.round(v*100)+'%':'0',xl:'weeks on treatment',yl:'share of eventual improvement (schematic)'});
    let s=A.svg;
    CUR.forEach(c=>{const me=c.id===drug||(c.id==='stim'&&false);const pts=[];for(let w=0;w<=wk+1e-6;w+=.05)pts.push([w,c.f(w)]);
      s+=trace(pts,A.X,A.Y,{c:c.c,w:me?3.6:2,dash:me?'':''});
      c.a.forEach(a=>{if(wk>=a.w){const x=A.X(a.w),y=A.Y(c.f(a.w));s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:var(--panel);stroke:${c.c};stroke-width:2"/>`;
        if(!N)s+=`<text x="${f1(a.w>11?x-8:x+8)}" y="${f1(y+(c.id==='atx'?14:-6))}" class="t-xs${a.w>11?' t-end':''}" style="fill:var(--ink)">${a.l}</text>`}})});
    s+=`<line x1="${f1(A.X(wk))}" x2="${f1(A.X(wk))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);opacity:.3"/>`;
    const lx=N?L.x-30:L.x+L.w+24,ly=N?L.y+L.h+50:L.y+16;
    CUR.forEach((c,i)=>{const y=ly+i*(N?22:34),me=c.id===drug;s+=`<rect x="${lx}" y="${y-8}" width="16" height="${me?5:3}" rx="1.5" style="fill:${c.c}"/><text x="${lx+22}" y="${y-2}" class="${me?'t-lbl':'t-sm'}" style="${me?'font-size:12px':''}">${N?c.n:c.s}</text>`;
      if(!N)s+=`<text x="${lx+22}" y="${y+10}" class="t-xs">${Math.round(c.f(wk)*100)}% at week ${f1(wk)}</text>`});
    if(N)s+=`<text x="${L.x-30}" y="${ly+5*22+6}" class="t-xs">week ${f1(wk)} · thick line = medicine chosen above</text>`;
    wsv.innerHTML=s;$('#nsWkNote').innerHTML=noteHTML(WN[phaseOf(WN,t)]);
  }
  playWire(wr,$('#nsWkPlay'),drawW,9000,'Replay','nonstim');drawW(+wr.value);
};
