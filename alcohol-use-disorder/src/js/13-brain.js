/* =============== 1.3 Alcohol and the brain: reward, adaptation, craving =============== */
const BR_PH=[{a:0,b:.14,n:'before',w:'before drinking'},{a:.14,b:.36,n:'drink',w:'first drinks'},{a:.36,b:.64,n:'months',w:'months of heavy drinking'},{a:.64,b:.82,n:'stops',w:'drinking stops'},{a:.82,b:1,n:'again',w:'repeated withdrawals'}];
const BR_STEPS=[
 {from:0,at:.06,k:'Before drinking',t:'A brain in balance',
  txt:`Two signals keep neurons in check. GABA acting on GABA-A receptors opens a chloride channel and calms the cell (blue). Glutamate acting on NMDA receptors lets in positive ions and excites it (red). Ethanol acts on the brain from the low millimolar range up to about 100 mM: early stimulant effects are followed by depressant ones. [[Abrahao2017]]`,
  pt:`The brain has a brake (GABA) and an accelerator (glutamate). Normally they balance.`,
  hook:`GABA-A = ligand-gated Cl<sup>−</sup> channel (inhibitory). NMDA = glutamate-gated cation channel (excitatory).`},
 {from:.14,at:.26,k:'A drink',t:'Brake on, accelerator off',
  txt:`Specific GABA-A receptor subtypes respond to ethanol at social-drinking doses, and ethanol also raises GABA transmission indirectly, through neuroactive steroids and more presynaptic GABA release. [[Kumar2009]] At the same time it blocks NMDA receptors: in hippocampal neurons 50 mM ethanol cut NMDA current by 61%, against 18% for kainate and 15% for quisqualate currents, and the potency of different alcohols at this tracked how intoxicating they are. [[Lovinger1989]] Alcohol also releases dopamine in the nucleus accumbens [[Boileau2003]] and the brain's own opioids in the nucleus accumbens and orbitofrontal cortex [[Mitchell2012]]: the glowing reward area.`,
  pt:`Alcohol presses the brake and eases off the accelerator, so the brain slows. It also triggers the brain's reward chemicals.`,
  hook:`Acute ethanol: <b>potentiates GABA-A</b>, <b>inhibits NMDA</b> (61% at 50 mM), releases dopamine and endogenous opioids. [[Kumar2009,Lovinger1989,Boileau2003,Mitchell2012]]`},
 {from:.36,at:.55,k:'Months of heavy drinking',t:'The brain pushes back: tolerance',
  txt:`With alcohol nearly always present, the brain adapts. GABA-A α1 subunits are pulled into the cell and reduced in the cortex, while α4 rises (after 14 days of chronic ethanol in animals). [[Kumar2009]] NMDA receptors are up-regulated. [[TsaiCoyle1998]] Fewer brakes and more accelerators bring the beam back to level <i>while alcohol is there</i>: the same amount has less effect. That is tolerance. <span class="ev est">Established</span> The reward glow fades too: people with alcohol dependence had lower striatal D2 receptor availability than controls. [[Volkow1996]]`,
  pt:`The brain rebuilds itself to work normally with alcohol in it. It now needs alcohol to feel balanced.`,
  hook:`Chronic: GABA-A α1 ↓ (internalised), α4 ↑, NMDA receptors ↑ = tolerance and dependence. [[Kumar2009,TsaiCoyle1998]]`},
 {from:.64,at:.74,k:'Drinking stops suddenly',t:'Unopposed excitation: withdrawal',
  txt:`Take the alcohol away and the adapted brain is left with too few brakes and too many accelerators. Abrupt withdrawal produces a hyperexcitable state that leads to seizures, delirium tremens and excitotoxic neuronal death. <span class="ev est">Established</span> [[TsaiCoyle1998]] Stress systems join in: more noradrenaline and dynorphin, less neuropeptide Y. [[Koob2014]] This is why stopping after long, heavy daily drinking should be done with medical help. See <a href="#withdrawal" data-go="withdrawal">the withdrawal timeline</a> and <a href="#detox" data-go="detox">managing withdrawal safely</a>.`,
  pt:`Without alcohol the brain races: shaking, sweating, anxiety, and sometimes seizures or confusion. Get medical help to stop safely.`,
  hook:`Withdrawal = NMDA up-regulation + GABA-A down-regulation unmasked → seizures, delirium tremens, excitotoxic neuronal death. [[TsaiCoyle1998]]`},
 {from:.82,at:.92,k:'Repeated withdrawals',t:'Kindling: each episode can be worse',
  txt:`Withdrawal severity can increase after repeated withdrawal episodes. Kindling may also contribute to relapse risk and alcohol-related cognitive impairment. <span class="ev early">Early evidence</span> [[Becker1998]] The bars show the idea, not measured sizes. Some brain changes do recover with sustained abstinence: in 58 men scanned repeatedly, fluid spaces shrank over the first weeks without alcohol. [[Pfefferbaum1995,Zahr2017]]`,
  pt:`Each time a person goes through withdrawal without help, the next one may be harder. That is another reason to get medical support.`,
  hook:`Kindling (Becker 1998): repeated withdrawals → withdrawal severity can increase with each episode; may add to relapse risk and cognitive impairment. [[Becker1998]]`}
];
const BR_CY=[
 {from:0,at:.12,k:'Stage 1 of 3 · basal ganglia',t:'Binge / intoxication',
  txt:`The rewarding effects of alcohol, incentive salience (alcohol cues gaining pull) and drug-seeking habits involve dopamine and opioid peptides in the basal ganglia. [[KoobVolkow2016]]`,
  early:`Early on, drinking is driven mainly by the reward itself: positive reinforcement.`,
  late:`Later, the "high" is smaller (tolerance and lower D2 availability [[Volkow1996]]) and habit carries more weight: in heavy drinkers, alcohol cues activate the dorsal striatum more. <span class="ev early">Early evidence</span> [[VollstadtKlein2010]]`,
  pt:`Drinking feels rewarding, and the brain learns to notice alcohol and the places, people and moods linked to it.`,
  hook:`Binge/intoxication = basal ganglia (nucleus accumbens, dorsal striatum); dopamine + opioid peptides. [[KoobVolkow2016]]`},
 {from:1/3,at:.45,k:'Stage 2 of 3 · extended amygdala',t:'Withdrawal / negative affect',
  txt:`As the effect wears off, the dopamine reward component weakens and stress transmitters, corticotropin-releasing factor (CRF) and dynorphin, are recruited in the extended amygdala: a reward deficit plus a stress surfeit. [[KoobVolkow2016]] In animals, acute withdrawal from dependence raises reward thresholds, increases anxiety-like behaviour and raises CRF in the central amygdala. [[Koob2014]]`,
  early:`Early on this dip is small and passes.`,
  late:`Later the dip is deep, and drinking comes to relieve it: negative reinforcement. <span class="ev early">Early evidence, mainly from animal models</span> [[Koob2014]]`,
  pt:`After drinking the person feels low, irritable or anxious, and alcohol starts to be used to make that feeling go away.`,
  hook:`Withdrawal/negative affect = extended amygdala; CRF and dynorphin ↑, dopamine ↓. Drinking for relief = <b>negative reinforcement</b>. [[KoobVolkow2016,Koob2014]]`},
 {from:2/3,at:.8,k:'Stage 3 of 3 · prefrontal cortex and insula',t:'Preoccupation / anticipation',
  txt:`Craving and weaker executive control involve dysregulated glutamate projections from the prefrontal cortex and insula to the basal ganglia and extended amygdala. [[KoobVolkow2016]] This is the link to acamprosate's glutamate hypothesis and to the talking therapies: see <a href="#therapy" data-go="therapy">Talking therapies</a>.`,
  early:`Early on, the brakes of the prefrontal cortex still work well.`,
  late:`Later, the allostasis model says the reward set point itself has shifted, which would explain lasting vulnerability to relapse after drinking stops. <span class="ev hyp">Hypothesis</span> [[KoobLeMoal2001]]`,
  pt:`Thoughts keep turning to drinking, and it gets harder to stop a plan once it starts. This is a change in brain circuits, not a lack of willpower.`,
  hook:`Preoccupation/anticipation = prefrontal cortex + insula; glutamate; craving and executive dysfunction. [[KoobVolkow2016]]`}
];

inits.brain=()=>{
  const svg=$('#brSvg'),rg=$('#brT');let setSt=()=>{};
  function st(t){const p1=ramp(t,.14,.22),c=ramp(t,.38,.6),s=ramp(t,.64,.7),eth=p1*(1-s);
    const ng=Math.round(lerp(4,1,c)),nn=Math.round(lerp(3,6,c));
    let kind=0,ep=-1;if(t>=.82){const u=(t-.82)/.18;ep=Math.min(2,Math.floor(u*3));kind=Math.sin(Math.PI*clamp(u*3-ep))*(.6+.2*ep)}
    const sp=t<.82?s*clamp(1-ramp(t,.76,.82)*.6):kind;
    const I=ng/4*(1+eth*1.4),E=nn/3*(1-eth*.55)*(1+sp*.4);
    return {eth,ng,nn,c,s,sp,ep,kind,I,E,tilt:clamp((E-I)/1.2,-1,1),cl:clamp(.2+eth*.7*(ng/4)+.15*(ng/4)),ca:clamp(.2*(nn/3)*(1-eth*.8)+sp*.75),gl:.35+sp*.4}}
  function draw(t){
    const N=vb(svg,'720 390','400 610'),S=st(t);
    let s=`<defs>${marker('brA','var(--muted)')}</defs>`;
    /* synapse */
    const sx=N?200:200,sy=N?150:170,sc=N?2:2.15;
    s+=synapse(sx,sy,sc,{gaba:S.ng,nmda:S.nn,gt:.45,gl:S.gl,eth:S.eth,cl:S.cl,ca:S.ca,spark:S.sp,block:S.eth,seed:3+Math.floor(t*40)});
    s+=`<text x="${sx}" y="${f1(sy-66*sc-6)}" class="t-xs t-mid">presynaptic neuron</text>`;
    s+=`<text x="${sx}" y="${f1(sy+40*sc+32)}" class="t-xs t-mid">postsynaptic neuron</text>`;
    s+=`<text x="${f1(sx-32*sc)}" y="${f1(sy+40*sc+15)}" class="t-sm t-mid" style="fill:var(--gaba)">GABA-A × ${S.ng}</text>`;
    s+=`<text x="${f1(sx+38*sc)}" y="${f1(sy+40*sc+15)}" class="t-sm t-mid" style="fill:var(--glu)">NMDA × ${S.nn}</text>`;
    if(S.eth>.05)s+=`<text x="${f1(sx-62*sc-4)}" y="${f1(sy+4)}" class="t-xs t-end" style="fill:var(--eth)">◆ ethanol</text>`;
    if(S.sp>.2)s+=`<text x="${sx}" y="${f1(sy+40*sc+48)}" class="t-sm t-mid" style="fill:var(--glu);font-weight:700">over-excitation</text>`;
    /* balance */
    const bx=N?200:556,byy=N?348:84,bw=N?200:220;
    const B=balance(bx,byy,bw,{tilt:S.tilt,ln:Math.round(clamp(S.I*2,0,6)),rn:Math.round(clamp(S.E*2,0,6)),lsub:'calming',rsub:'exciting'});
    s+=B.svg;
    const verdict=S.tilt<-.3?'tipped to calm: intoxication':S.tilt>.4?'tipped to excitation: withdrawal':S.c>.5?'level again, but only with alcohol':'balanced';
    s+=`<text x="${bx}" y="${byy-30}" class="t-lbl t-mid" style="fill:${S.tilt>.4?'var(--glu)':S.tilt<-.3?'var(--gaba)':'var(--ink)'}">${verdict}</text>`;
    /* small brain: reward and stress areas */
    const rx=N?200:556,ry=N?482:262,rs=N?.78:.86;
    const rew=S.eth*(1-S.c*.55),neg=Math.max(S.s*(t<.82?1:.7),S.kind);
    const Br=brain(rx,ry,rs,{hl:{stri:rew,amyg:neg}});s+=Br.svg;
    if(rew>.1)for(let i=0;i<Math.round(rew*6);i++){const a=i*1.1+t*30;s+=mol(Br.at.stri[0]+Math.cos(a)*16,Br.at.stri[1]+Math.sin(a)*10,'da',{r:2.4})}
    s+=`<text x="${rx}" y="${f1(ry+62*rs+14)}" class="t-xs t-mid">${rew>.1?'reward area (striatum): dopamine'+(S.c>.5?', blunted':''):neg>.1?'stress area (extended amygdala) active':'reward and stress areas'}</text>`;
    /* kindling bars */
    if(t>=.8){const kx=N?14:636,ky=N?520:330,kw=N?90:78;s+=`<text x="${kx+kw}" y="${ky-48}" class="t-xs t-end" style="fill:var(--glu)">severity (schematic)</text>`;
      for(let i=0;i<3;i++){const hh=(14+i*10)*(S.ep>=i?1:.25),x=kx+i*(kw/3);s+=`<rect x="${f1(x)}" y="${f1(ky-hh)}" width="${f1(kw/3-8)}" height="${f1(hh)}" rx="3" style="fill:var(--glu-fill);opacity:${S.ep>=i?.9:.25}"/><text x="${f1(x+(kw/3-8)/2)}" y="${ky+12}" class="t-xs t-mid">${i+1}</text>`}}
    /* timeline */
    const tx0=N?20:30,tx1=N?380:700,ty=N?586:368;
    BR_PH.forEach((p,i)=>{const a=lerp(tx0,tx1,p.a),b=lerp(tx0,tx1,p.b),on=t>=p.a&&t<p.b+(i===4?.01:0);
      s+=`<rect x="${f1(a+1)}" y="${ty-6}" width="${f1(b-a-2)}" height="6" rx="3" style="fill:${['var(--panel-2)','var(--eth-fill)','var(--eth)','var(--glu-fill)','var(--glu)'][i]};opacity:${on?1:.45}"/><text x="${f1((a+b)/2)}" y="${ty+12}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?p.n:p.w}</text>`});
    s+=`<circle cx="${f1(lerp(tx0,tx1,t))}" cy="${ty-3}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const ph=phaseOf(BR_STEPS,t);setSt(ph);$('#brNote').innerHTML=noteHTML(BR_STEPS[ph]);
    $('#brRead').innerHTML=`<span>phase <b>${BR_PH.find(p=>t>=p.a&&t<=p.b).w}</b></span><span>ethanol <b>${S.eth>.05?'present':'none'}</b></span><span>GABA-A drawn <b>${S.ng}</b> · NMDA drawn <b>${S.nn}</b></span><span>beam <b>${S.tilt<-.3?'calm side down':S.tilt>.4?'excitation side down':'about level'}</b></span>`;
  }
  const stop=playWire(rg,$('#brPlay'),draw,20000,'Replay','brain');
  setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- the addiction cycle ---- */
  const cy=$('#brCy'),cr=$('#brCyT');let mode='early',setC=()=>{};
  const NAMES=[['Binge /','intoxication'],['Withdrawal /','negative affect'],['Preoccupation /','anticipation']],KEYS=['stri','amyg','pfc'],COLS=['var(--stri)','var(--amyg)','var(--pfc)'];
  /* reward level over one cycle: rises in the binge, dips in withdrawal; later the dip deepens and the baseline sinks */
  const lvl=(u,m)=>{const L=m==='late';const up=bump(u,0,1/3)*(L?.35:.8),dn=bump(u,1/3,2/3)*(L?.85:.25),base=L?-ramp(u,1/3,.6)*.45:0;return up-dn+base-(L?0:0)};
  function drawC(t){
    const N=vb(cy,'720 350','400 640'),L=mode==='late',stg=Math.min(2,Math.floor(t*3));
    let s='';const cx=N?200:222,cc=N?160:172,R=N?112:108;
    const arc=(a0,a1,r)=>{const p=a=>[cx+r*Math.sin(a),cc-r*Math.cos(a)];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${f1(x0)} ${f1(y0)}A${r} ${r} 0 0 1 ${f1(x1)} ${f1(y1)}`};
    for(let i=0;i<3;i++){const a0=i*2*Math.PI/3+.05,a1=(i+1)*2*Math.PI/3-.05,big=(L?i===1:i===0),on=i===stg;
      s+=`<path d="${arc(a0,a1,R)}" style="fill:none;stroke:${COLS[i]};stroke-width:${big?22:12};opacity:${on?.95:.35};stroke-linecap:round"/>`;
      const am=(a0+a1)/2,lr=R+(N?0:0),lx=cx+(R+(big?26:20))*Math.sin(am),ly=cc-(R+(big?26:20))*Math.cos(am);
      const anc=Math.sin(am)>.3?'':Math.sin(am)<-.3?' t-end':' t-mid';
      const ix=N?cx+(R-34)*Math.sin(am):lx,iy=N?cc-(R-34)*Math.cos(am):ly;
      s+=`<text x="${f1(ix)}" y="${f1(iy-2)}" class="t-lbl${N?' t-mid':anc}" style="fill:${on?'var(--ink)':'var(--muted)'};font-size:${N?11:13}px">${NAMES[i][0]}</text><text x="${f1(ix)}" y="${f1(iy+12)}" class="t-sm${N?' t-mid':anc}">${NAMES[i][1]}</text>`}
    /* travelling marker */
    const am=t*2*Math.PI,mx=cx+R*Math.sin(am),my=cc-R*Math.cos(am);
    s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="9" style="fill:var(--ink);stroke:var(--panel);stroke-width:3"/>`;
    if(!N){s+=`<text x="${cx}" y="${cc-6}" class="t-big t-mid" style="font-size:15px">${L?'negative':'positive'}</text><text x="${cx}" y="${cc+12}" class="t-big t-mid" style="font-size:15px">reinforcement</text><text x="${cx}" y="${cc+30}" class="t-xs t-mid">${L?'drinking for relief':'drinking for reward'}</text>`}
    else s+=`<text x="${cx}" y="${cc+4}" class="t-xs t-mid">${L?'negative':'positive'} reinforcement</text>`;
    /* brain */
    const bx=N?200:560,by=N?402:118,bs=N?1.25:1.4,hl={};KEYS.forEach((k,i)=>hl[k]=i===stg?1:.12);
    const BB=brain(bx,by,bs,{hl});s+=BB.svg;const RG=['Basal ganglia (striatum)','Extended amygdala','Prefrontal cortex'][stg],ap=BB.at[KEYS[stg]];
    s+=`<line x1="${f1(ap[0])}" y1="${f1(ap[1])}" x2="${f1(ap[0])}" y2="${f1(by-62*bs)}" style="stroke:${COLS[stg]};stroke-width:1.2"/><text x="${f1(ap[0])}" y="${f1(by-62*bs-5)}" class="t-lbl t-mid" style="fill:${COLS[stg]}">${RG}</text>`;
    s+=`<text x="${bx}" y="${f1(by+62*bs+22)}" class="t-xs t-mid">${['dopamine, opioid peptides','CRF, dynorphin ↑ · dopamine ↓','glutamate projections'][stg]}</text>`;
    /* set-point chart */
    const gx0=N?40:420,gx1=N?380:700,gy=N?572:312,gh=N?34:26;
    s+=`<text x="${gx0}" y="${gy-gh-10}" class="t-xs" style="fill:var(--muted)">REWARD / MOOD LEVEL (allostasis model, schematic)</text>`;
    s+=`<line x1="${gx0}" x2="${gx1}" y1="${gy}" y2="${gy}" style="stroke:var(--muted);stroke-dasharray:3 4"/><text x="${gx1}" y="${gy-4}" class="t-xs t-end">original set point</text>`;
    s+=`<path d="${pathFn(u=>.5+lvl(u*t,mode)/2,gx0,gx0+(gx1-gx0)*t,gy+gh,gy-gh,90)}" style="fill:none;stroke:${COLS[stg]};stroke-width:2.6"/>`;
    for(let i=1;i<3;i++){const x=lerp(gx0,gx1,i/3);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${gy-gh}" y2="${gy+gh}" class="grid"/>`}
    cy.innerHTML=s;
    const P=BR_CY[stg];setC(stg);
    $('#brCyNote').innerHTML=noteHTML({k:P.k,t:P.t,txt:P.txt+' <b>'+(L?'Later:':'Early:')+'</b> '+(L?P.late:P.early),pt:P.pt,hook:P.hook});
  }
  const stopC=playWire(cr,$('#brCyPlay'),drawC,15000,'Replay','brain');
  setC=stepWire($('#brCySteps'),BR_CY,cr,drawC,stopC);
  $$('[data-brcy]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.brcy;$$('[data-brcy]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC(+cr.value)}));
  drawC(+cr.value);
};
