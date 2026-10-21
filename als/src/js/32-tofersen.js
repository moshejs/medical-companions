/* =============== 3.2 tofersen, gene-targeted =============== */
const TF_STEPS=[
 {from:0,at:.06,k:'Step 1 · SOD1-ALS',t:'A toxic SOD1 protein',
  txt:'In SOD1-ALS a disease-causing variant in the SOD1 gene is copied into pre-mRNA, spliced into mRNA and translated into SOD1 protein. Normal SOD1 is a copper-zinc enzyme that turns superoxide into oxygen and hydrogen peroxide. [[Rosen1993]] ALS-linked variants destabilise the protein so it misfolds; the harm comes from a toxic gain of function, since mice lacking SOD1 do not get ALS. [[Lindberg2002,Reaume1996,Bruijn1998]] The EMA assessment says the ALS-linked SOD1 variants are assumed to act this way, so the aim is to make less of the protein. [[EMA2024Qalsody]]',
  pt:'A faulty gene makes a protein that harms motor neurons. Making less of that protein is the idea behind tofersen.'},
 {from:.16,at:.22,k:'Step 2 · Delivery',t:'Into the spinal fluid by lumbar puncture',
  txt:'The label dose is 100 mg (15 mL), injected into the lumbar CSF by lumbar puncture over 1 to 3 minutes after about 10 mL of CSF is removed. Three loading doses are given 14 days apart (days 1, 15 and 29), then one every 28 days. [[FDA2023Qalsody,EMA2024Qalsody]] VALOR gave 8 doses over 24 weeks; the first one is lit on the dose row of the VALOR panel. [[Miller2022]]',
  pt:'The medicine is injected into the fluid around the spinal cord, through a needle in the lower back.',
  hook:'Intrathecal 100 mg: 3 loading doses 14 days apart, then every 28 days.'},
 {from:.3,at:.36,k:'Step 3 · Binding',t:'Tofersen pairs with SOD1 mRNA',
  txt:'Tofersen is a 20-mer 5-10-5 2\'-O-methoxyethyl (MOE) gapmer: 10 central DNA nucleotides flanked by 5 MOE-modified nucleotides on each side, on a mixed phosphorothioate and phosphodiester backbone. [[FDA2023Qalsody]] It pairs base by base with SOD1 mRNA, forming an RNA:DNA hybrid at the gap. [[FDA2023Qalsody,EMA2024Qalsody]]',
  pt:'Tofersen is a short strand of genetic code that sticks to the faulty gene\'s message.'},
 {from:.44,at:.5,k:'Step 4 · RNase H',t:'The message is cut',
  txt:'RNase H recognises the RNA:DNA hybrid and cuts the RNA strand, so the SOD1 message is destroyed and less SOD1 protein is made. [[EMA2024Qalsody,FDA2023Qalsody]] The gene itself is not changed: the drug lowers how much protein is made from it, which is why it is given again every 28 days.',
  pt:'The cell throws the stuck message away, so it makes less of the harmful protein.',
  hook:'Gapmer antisense oligonucleotide → RNA:DNA hybrid → RNase H cuts SOD1 mRNA → less SOD1 protein.'},
 {from:.58,at:.68,k:'Step 5 · Weeks 0 to 28',t:'SOD1 and NfL fall',
  txt:g=>(g==='fast'
   ?`<span class="ev est">Established (biomarker)</span> Faster-progressing group, the primary analysis (n = 60): at week 28 CSF SOD1 was 0.71 times baseline on tofersen vs 1.16 on placebo (−29% vs +16%), and plasma neurofilament light (NfL) 0.40 vs 1.20 (−60% vs +20%). [[FDA2023Qalsody]]`
   :`<span class="ev est">Established (biomarker)</span> Slower-progressing group (n = 48): the EMA assessment gives CSF SOD1 26% lower and plasma NfL 48% lower than placebo at week 28 (nominal p = 0.0007 and p < 0.0001). It does not give each arm\'s change from baseline, so here the chart shows tofersen relative to placebo. [[EMA2024Qalsody]]`)
   +` NfL fell until about day 113 (around week 16) and then stayed down. [[FDA2023Qalsody]] The label\'s headline figures are for everyone randomised (ITT, n = 108): SOD1 0.65 vs 0.98 (−35% vs −2%), NfL 0.45 vs 1.12 (−55% vs +12%). [[FDA2023Qalsody]] NfL is released when axons are damaged. [[Gaiottino2013]]`,
  pt:'Within weeks, the harmful protein and a blood marker of nerve damage both went down.'},
 {from:.74,at:.8,k:'Step 6 · VALOR, week 28',t:'The clinical endpoint was missed',
  txt:g=>(g==='fast'
   ?`The primary endpoint was the change in ALSFRS-R to week 28 in the faster-progressing group: −6.98 on tofersen vs −8.14 on placebo, a difference of 1.2 points (95% CI −3.2 to 5.5; P = 0.97). It was not met. [[Miller2022]]`
   :`In the slower-progressing group the change was −1.33 vs −2.73, difference 1.4 points (95% CI −1.1 to 3.9), not significant. [[EMA2024Qalsody]] The primary endpoint, in the faster group, was not met (difference 1.2 points, 95% CI −3.2 to 5.5; P = 0.97). [[Miller2022]]`)
   +` In everyone randomised: −4.5 vs −5.8, difference 1.4 (95% CI −1.3 to 4.1). [[EMA2024Qalsody]] Death or permanent ventilation by week 28 in the faster group: 4 of 39 vs 2 of 21, too few to interpret. [[EMA2024Qalsody]]`,
  pt:'Over the 28 weeks of the trial, people on tofersen did not lose clearly less function than people on placebo.',
  hook:'VALOR missed its 28-week ALSFRS-R primary endpoint: difference 1.2 points (95% CI −3.2 to 5.5), faster-progressing group.'},
 {from:.88,at:.96,k:'Step 7 · Week 52 and approval',t:'Earlier start, and approval on NfL',
  txt:'<span class="ev early">Open-label, nominal</span> 95 of 108 people (88%) entered the open-label extension, where everyone received tofersen. In the 52-week integrated analysis, ALSFRS-R changed by −6.0 with early start vs −9.5 with delayed start: a difference of 3.5 points (95% CI 0.4 to 6.7; nominal p = 0.027, not adjusted for multiplicity). [[Miller2022,EMA2024Qalsody]] The label says open-label comparisons "should be interpreted with caution" because of possible confounding. [[FDA2023Qalsody]] The FDA gave accelerated approval on 25 April 2023, based on the fall in plasma NfL, with the presymptomatic ATLAS trial as confirmatory study; the EU followed on 29 May 2024 under exceptional circumstances. [[DrugsFDA,FDA2023Qalsody,Biogen2023,EMA2024Qalsody]]',
  pt:'People who started earlier lost less function over a year, but this comparison was not blinded, so it is weaker evidence.',
  hook:'Accelerated approval rests on a surrogate endpoint; for tofersen the label names the reduction in plasma NfL. The 52-week difference of 3.5 points is nominal.'}
];
const TF_TXT={
 grp:[ ['fast','Faster-progressing (primary)'],['slow','Slower-progressing'] ],
 start:[ ['early','Early start (tofersen)'],['delayed','Delayed start (placebo first)'] ],
 grpLab:{fast:'Faster-progressing group (primary analysis, n = 60)',slow:'Slower-progressing group (n = 48)'},
 hl:{early:'Highlighted: early start, the group given tofersen from week 0.',delayed:'Highlighted: delayed start, the group given placebo for 28 weeks and then tofersen in the open-label extension.'},
 cap:(g,a)=>`${g} · highlighted: ${a}. Only the week-28 and week-52 values come from the trial; the line shapes between them are schematic.`,
 armShort:{early:'early start',delayed:'delayed start'},
 /* panel 1 */
 p1:'Inside a motor neuron',nucleus:'nucleus',gene:'SOD1 gene',pre:'pre-mRNA',mrna:'mRNA',mrnaC:'SOD1 mRNA',ribo:'ribosome',
 prot:'SOD1 protein',less:'less SOD1 made',tof:'tofersen',moe:'MOE',gap:'DNA gap',rnh:'RNase H',cut:'message cut',
 csf:'CSF (spinal fluid)',toMN:'to motor neurons',lp:'lumbar puncture',lp1:'100 mg in 15 mL, 1 to 3 min',lp2:'about 10 mL CSF removed first',
 /* panel 2 */
 p2:'VALOR: weeks after the first dose',legT:'tofersen (early start)',legP:'placebo (delayed start)',
 regA:'randomised, blinded',regB:'open-label',
 chartA:{fast:'CSF SOD1, × baseline',slow:'CSF SOD1, tofersen ÷ placebo'},
 chartB:{fast:'Plasma NfL, × baseline',slow:'Plasma NfL, tofersen ÷ placebo'},
 chartC:{fast:'ALSFRS-R change, primary endpoint',slow:'ALSFRS-R change',ole:'ALSFRS-R change, 52-week integrated'},
 xb:v=>`${v}×`,vsP:n=>`−${n}%`,pboRef:'placebo = 1',
 brk:{fast:['difference 1.2 points','95% CI −3.2 to 5.5, P = 0.97'],slow:['difference 1.4 points','95% CI −1.1 to 3.9'],ole:['week 52: difference 3.5','95% CI 0.4 to 6.7, nominal']},
 doses:'doses',weeks:'weeks',falls:'falls after the switch',wait:'The weeks start at step 5',
 appr:['FDA: accelerated approval 25 April 2023, on NfL','EU: 29 May 2024, exceptional circumstances','Confirmatory trial: ATLAS (presymptomatic)']
};
const TF_D={
 fast:{s:[.71,1.16],n:[.40,1.20],c:[-6.98,-8.14],lab:'xb'},
 slow:{s:[.74,1],n:[.52,1],c:[-1.33,-2.73],lab:'pct',pct:[26,48]},
 ole:[-6.0,-9.5],doseW:[0,2,4,8,12,16,20,24],xt:[0,4,16,28,52]
};
inits.tofersen=()=>{
  const svg=$('#tfSvg'),rg=$('#tfT');let grp='fast',start='early';
  const sh=u=>(1-Math.exp(-3*u))/(1-Math.exp(-3));
  const along=(P,u)=>{const seg=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);tot+=d}
    let r=u*tot;for(let i=0;i<seg.length;i++){if(r<=seg[i]||i===seg.length-1){const k=seg[i]?clamp(r/seg[i]):1;return[lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}r-=seg[i]}return P[P.length-1]};
  const strand=(x,y,o,sc=1)=>{const w=50*sc;return `<g style="opacity:${f1(o)}"><rect x="${f1(x-w)}" y="${f1(y-3.5*sc)}" width="${f1(w/2)}" height="${f1(7*sc)}" rx="${f1(3*sc)}" style="fill:var(--treat)"/><rect x="${f1(x-w/2)}" y="${f1(y-2.5*sc)}" width="${f1(w)}" height="${f1(5*sc)}" style="fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.2"/><rect x="${f1(x+w/2)}" y="${f1(y-3.5*sc)}" width="${f1(w/2)}" height="${f1(7*sc)}" rx="${f1(3*sc)}" style="fill:var(--treat)"/></g>`};
  const prot=(x,y,o)=>`<g style="opacity:${f1(o)}"><circle cx="${f1(x-4)}" cy="${f1(y)}" r="5.5" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.3"/><path d="M${f1(x+1)} ${f1(y-4)} q7 -3 8 3 q2 6 -5 6 q-5 1 -3 -9z" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.3"/></g>`;
  function panel1(t){
    const tx=ramp(t,.01,.06),sp=ramp(t,.06,.09),ex=ease(ramp(t,.09,.14));
    const inj=ramp(t,.16,.21),trav=ease(ramp(t,.2,.31)),bind=ease(ramp(t,.31,.4));
    const rh=ease(ramp(t,.44,.49)),cut=ease(ramp(t,.49,.53)),frag=ramp(t,.53,.6);
    let s=`<text x="0" y="14" class="t-lbl">${TF_TXT.p1}</text>`;
    s+=`<rect x="0" y="24" width="350" height="238" rx="24" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    /* nucleus, DNA, gene */
    s+=`<ellipse cx="80" cy="140" rx="66" ry="84" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<rect x="141" y="122" width="10" height="16" rx="3" style="fill:var(--cell);stroke:var(--cell-line)"/>`;
    s+=`<text x="80" y="74" class="t-xs t-mid">${TF_TXT.nucleus}</text>`;
    s+=`<path d="${pathFn(u=>.5+.18*Math.sin(u*Math.PI*8),26,134,104,120,60)}" style="fill:none;stroke:var(--nuc);stroke-width:1.6"/>`;
    s+=`<path d="${pathFn(u=>.5-.18*Math.sin(u*Math.PI*8),26,134,104,120,60)}" style="fill:none;stroke:var(--nuc);stroke-width:1.6"/>`;
    s+=`<rect x="44" y="105" width="68" height="14" rx="4" style="fill:var(--tdp);fill-opacity:.18;stroke:var(--tdp);stroke-width:1.4"/>`;
    s+=`<text x="78" y="98" class="t-xs t-mid" style="fill:var(--tdp)">${TF_TXT.gene}</text>`;
    s+=`<path d="M90 106 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z" style="fill:var(--tdp)"/>`;
    /* pre-mRNA → mRNA → out to the cytoplasm */
    if(ex<1){const len=lerp(68,56,sp),amp=10*(1-sp),x0=44,y0=140;
      const xs=lerp(x0,200,ex),ys=lerp(y0,122,ex),L=lerp(len*tx,130,ex);
      let d=`M${f1(xs)} ${f1(ys)}`;const k=amp*(1-ex);
      d+=` l${f1(L*.3)} 0 q${f1(L*.06)} ${f1(-k*2)} ${f1(L*.12)} 0 l${f1(L*.2)} 0 q${f1(L*.06)} ${f1(-k*2)} ${f1(L*.12)} 0 l${f1(L*.26)} 0`;
      if(tx>0)s+=`<path d="${d}" style="fill:none;stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/>`;
      if(tx>.3&&ex<.4)s+=`<text x="78" y="164" class="t-xs t-mid" style="opacity:${f1(1-ex*2.5)}">${sp<.5?TF_TXT.pre:TF_TXT.mrna}</text>`;
      }
    /* mRNA in the cytoplasm (whole, or cut in two) */
    if(ex>=1){
      const dx1=-14*cut,dx2=12*cut,dy=10*frag,of=1-.85*frag;
      if(cut<=0)s+=`<line x1="200" x2="330" y1="122" y2="122" style="stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/>`;
      else{s+=`<g style="opacity:${f1(of)}"><line x1="${f1(200+dx1)}" x2="${f1(262+dx1)}" y1="${f1(122+dy)}" y2="${f1(122+dy)}" style="stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/><line x1="${f1(268+dx2)}" x2="${f1(330+dx2)}" y1="${f1(122+dy)}" y2="${f1(122+dy)}" style="stroke:var(--tdp);stroke-width:3;stroke-linecap:round"/></g>`}
      for(let i=0;i<20;i++){const x=217+i*5;if(cut>0&&Math.abs(x-265)<3)continue;s+=`<line x1="${x}" x2="${x}" y1="${f1(117+(cut>0?dy:0))}" y2="${f1(121+(cut>0?dy:0))}" style="stroke:var(--tdp);stroke-width:1;opacity:${f1(.6*of)}"/>`}
      if(cut<.3)s+=`<text x="262" y="144" class="t-xs t-mid">${TF_TXT.mrnaC}</text>`;
      else s+=`<text x="250" y="144" class="t-xs t-mid" style="fill:var(--bad)">${TF_TXT.cut}</text>`;
      /* ribosome */
      const ro=1-cut;
      s+=`<g style="opacity:${f1(.35+.65*ro)}"><ellipse cx="320" cy="128" rx="11" ry="7" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.3"/><ellipse cx="320" cy="117" rx="7" ry="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.3"/></g>`;
      s+=`<text x="320" y="156" class="t-xs t-mid">${TF_TXT.ribo}</text>`}
    /* proteins */
    const nf=t<.52?lerp(3,9,ramp(t,.1,.18)):lerp(9,5,ramp(t,.52,.66)),nP=Math.ceil(nf-1e-6);
    s+=`<text x="196" y="184" class="t-xs">${TF_TXT.prot}</text>`;
    for(let i=0;i<10;i++){const x=206+(i%5)*28,y=202+Math.floor(i/5)*26;
      const o=i<Math.floor(nf)?1:i<nP?nf-Math.floor(nf):0;
      if(o>0)s+=prot(x,y,o);else s+=`<circle cx="${x}" cy="${y}" r="4" style="fill:none;stroke:var(--line);stroke-dasharray:2 2"/>`}
    if(cut>.5)s+=`<text x="336" y="254" class="t-xs t-end" style="fill:var(--treat)">${TF_TXT.less}</text>`;
    /* CSF and the lumbar puncture */
    s+=`<rect x="0" y="304" width="350" height="52" rx="26" style="fill:var(--csf);stroke:var(--air);stroke-width:1.4"/>`;
    s+=`<text x="16" y="322" class="t-sm" style="fill:var(--air)">${TF_TXT.csf}</text>`;
    s+=`<path d="M265 302 V270" class="arrow" marker-end="url(#tfA)"/><text x="257" y="292" class="t-xs t-end">${TF_TXT.toMN}</text>`;
    const pl=lerp(0,14,inj);
    s+=`<line x1="80" y1="398" x2="96" y2="350" style="stroke:var(--ink);stroke-width:1.6"/>`;
    s+=`<line x1="${f1(66-pl*.3)}" y1="${f1(430-pl*.9)}" x2="80" y2="398" style="stroke:var(--muted);stroke-width:10;stroke-linecap:round;opacity:.8"/>`;
    s+=`<line x1="${f1(60-pl*.3)}" y1="${f1(434-pl*.9)}" x2="${f1(56-pl*.3)}" y2="${f1(436-pl*.9)}" style="stroke:var(--ink);stroke-width:3"/>`;
    s+=`<text x="112" y="384" class="t-sm" style="fill:var(--ink)">${TF_TXT.lp}</text><text x="112" y="400" class="t-xs">${TF_TXT.lp1}</text><text x="112" y="414" class="t-xs">${TF_TXT.lp2}</text>`;
    /* drug copies spreading in the CSF */
    if(inj>0)for(let i=0;i<4;i++){const u=(i*.25+t*1.4)%1,x=110+u*200,y=338+Math.sin(u*9+i)*5;s+=strand(x,y,inj*.55*bump(u,0,1)+.1*inj,.4)}
    /* the followed molecule */
    if(inj>0){let x,y;
      if(trav<=0){x=96;y=lerp(350,330,inj)}else{[x,y]=along([ [96,330],[265,330],[265,262],[265,112] ],trav)}
      s+=strand(x,y,clamp(inj*2),1);
      if(trav>0&&trav<.98)s+=`<text x="${f1(x)}" y="${f1(y-9)}" class="t-xs t-mid" style="fill:var(--treat)">${TF_TXT.tof}</text>`;
      if(trav>=.98){s+=`<text x="210" y="116" class="t-sm t-end" style="fill:var(--treat)">${TF_TXT.tof}</text>`;
        if(bind>0){for(let i=0;i<20;i++){const xx=217+i*5;s+=`<line x1="${xx}" x2="${xx}" y1="115.5" y2="119" style="stroke:var(--treat);stroke-width:1.2;opacity:${f1(bind*(1-.8*frag))}"/>`}
          const lo=bind*(1-rh);if(lo>0)s+=`<g style="opacity:${f1(lo)}"><text x="227" y="104" class="t-xs t-mid">${TF_TXT.moe}</text><text x="265" y="104" class="t-xs t-mid">${TF_TXT.gap}</text><text x="303" y="104" class="t-xs t-mid">${TF_TXT.moe}</text></g>`}}}
    /* RNase H */
    if(rh>0){const o=1-ramp(t,.6,.68)*.6,x=lerp(345,265,rh),y=lerp(44,94,rh);
      s+=`<g style="opacity:${f1(o)}"><path d="M${f1(x-16)} ${f1(y+8)} C${f1(x-18)} ${f1(y-14)} ${f1(x+18)} ${f1(y-14)} ${f1(x+16)} ${f1(y+8)} L${f1(x+8)} ${f1(y+8)} C${f1(x+8)} ${f1(y-2)} ${f1(x-8)} ${f1(y-2)} ${f1(x-8)} ${f1(y+8)}Z" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:1.6"/>`;
      s+=`<text x="${f1(x)}" y="${f1(y-16)}" class="t-sm t-mid" style="fill:var(--steel)">${TF_TXT.rnh}</text></g>`;
      if(cut>0&&cut<1)s+=`<path d="M259 112 l12 18 M271 112 l-12 18" style="stroke:var(--bad);stroke-width:2;opacity:${f1(bump(cut,0,1))}"/>`}
    return s}
  function panel2(t){
    const x0=40,x1=280,X=w=>x0+w/52*(x1-x0),W28=X(28);
    const p=ramp(t,.58,.74),wk=28*p,cl=ease(ramp(t,.74,.8)),q=ease(ramp(t,.88,.96)),ap=ramp(t,.9,.97);
    const D=TF_D[grp],fast=grp==='fast',on=t>=.58;
    const swT=start==='early'?3.2:1.6,swP=start==='early'?1.6:3.2;
    let s=`<text x="0" y="14" class="t-lbl">${TF_TXT.p2}</text>`;
    s+=`<text x="0" y="30" class="t-xs" style="fill:var(--ink)">${TF_TXT.grpLab[grp]}</text>`;
    s+=`<line x1="0" x2="18" y1="41" y2="41" style="stroke:var(--treat);stroke-width:${swT}"/><text x="22" y="44" class="t-xs">${TF_TXT.legT}</text>`;
    s+=`<line x1="170" x2="188" y1="41" y2="41" style="stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><text x="192" y="44" class="t-xs">${TF_TXT.legP}</text>`;
    s+=`<rect x="${x0}" y="52" width="${f1(W28-x0)}" height="292" style="fill:var(--panel-2);opacity:.5"/><rect x="${f1(W28)}" y="52" width="${f1(x1-W28)}" height="292" style="fill:var(--treat-soft);opacity:.32"/>`;
    s+=`<text x="${f1(X(14))}" y="64" class="t-xs t-mid">${TF_TXT.regA}</text><text x="${f1(X(40))}" y="64" class="t-xs t-mid">${TF_TXT.regB}</text>`;
    const g=on?1:.5;
    /* biomarker charts */
    const chart=(top,title,vals,fT)=>{const bot=top+60,Y=v=>bot-(v-.2)/1.2*60;let c=`<g style="opacity:${f1(g)}">`;
      c+=`<text x="${x0}" y="${top-6}" class="t-sm">${title}</text>`;
      c+=`<line x1="${x0}" x2="${x1}" y1="${bot}" y2="${bot}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${top}" y2="${bot}" class="axis"/>`;
      [1,.5].forEach(v=>{c+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${f1(v)}</text>`});
      c+='</g>';
      if(wk>0){const fP=w=>fast?1+(vals[1]-1)*w/28:1;
        let dT='',dP='';for(let w=0;w<=wk+1e-6;w+=.5){dT+=(w?'L':'M')+f1(X(w))+' '+f1(Y(fT(w)));dP+=(w?'L':'M')+f1(X(w))+' '+f1(Y(fP(w)))}
        c+=`<path d="${dP}" style="fill:none;stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><path d="${dT}" style="fill:none;stroke:var(--treat);stroke-width:${swT}"/>`;
        if(p>.98){const yT=Y(vals[0]),yP=Y(vals[1]);
          c+=`<circle cx="${f1(W28)}" cy="${f1(yT)}" r="3.5" style="fill:var(--treat)"/><circle cx="${f1(W28)}" cy="${f1(yP)}" r="3.5" style="fill:var(--muted)"/>`;
          c+=`<text x="${f1(W28+5)}" y="${f1(yP-4)}" class="t-xs" style="fill:var(--ink)">${fast?TF_TXT.xb(vals[1].toFixed(2)):TF_TXT.pboRef}</text>`;
          c+=`<text x="${f1(W28+5)}" y="${f1(yT+11)}" class="t-xs" style="fill:var(--treat);font-weight:700">${fast?TF_TXT.xb(vals[0].toFixed(2)):TF_TXT.vsP(Math.round((1-vals[0])*100))}</text>`;
          if(q>0&&fast&&start==='delayed'){c+=`<path d="M${f1(W28+2)} ${f1(yP+2)} L${f1(X(34))} ${f1(yP+12)}" class="arrow" marker-end="url(#tfA)" style="stroke:var(--treat);stroke-dasharray:4 3;opacity:${f1(q)}"/><text x="${f1(X(35))}" y="${f1(yP+16)}" class="t-xs" style="fill:var(--treat);opacity:${f1(q)}">${TF_TXT.falls}</text>`}}}
      return c};
    s+=chart(84,TF_TXT.chartA[grp],D.s,w=>1-(1-D.s[0])*sh(w/28));
    s+=chart(172,TF_TXT.chartB[grp],D.n,w=>1-(1-D.n[0])*ease(Math.min(w/16,1)));
    if(!on)s+=`<text x="${f1(X(26))}" y="122" class="t-sm t-mid" style="fill:var(--ink)">${TF_TXT.wait}</text>`;
    /* ALSFRS-R chart */
    const top=260,bot=340,Yc=v=>top-v*8;
    s+=`<g style="opacity:${f1(g)}"><text x="${x0}" y="254" class="t-sm">${q>0?TF_TXT.chartC.ole:TF_TXT.chartC[grp]}</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${top}" y2="${top}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${top}" y2="${bot}" class="axis"/>`;
    [-5,-10].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${Yc(v)}" y2="${Yc(v)}" class="grid"/><text x="${x0-4}" y="${Yc(v)+3}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${x0-4}" y="${top+3}" class="t-xs t-end">0</text></g>`;
    if(cl>0){const o=1-.75*q,yT=Yc(D.c[0]*cl),yP=Yc(D.c[1]*cl),xe=X(28*cl);
      s+=`<g style="opacity:${f1(o)}"><line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yP)}" style="stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yT)}" style="stroke:var(--treat);stroke-width:${swT}"/></g>`;
      if(cl>.98&&q<=0){s+=`<text x="${f1(W28+5)}" y="${f1(yT-3)}" class="t-xs" style="fill:var(--treat);font-weight:700">${D.c[0].toFixed(2)}</text><text x="${f1(W28+5)}" y="${f1(yP+11)}" class="t-xs" style="fill:var(--ink)">${D.c[1].toFixed(2)}</text>`;
        const by=fast?[272,284]:[312,324];TF_TXT.brk[grp].forEach((l,i)=>{s+=`<text x="176" y="${by[i]}" class="t-xs" style="fill:var(--ink)">${l}</text>`})}}
    if(q>0){const xe=X(52*q),yE=Yc(TF_D.ole[0]*q),yD=Yc(TF_D.ole[1]*q);
      s+=`<line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yD)}" style="stroke:var(--muted);stroke-width:${swP};stroke-dasharray:5 3"/><line x1="${x0}" y1="${top}" x2="${f1(xe)}" y2="${f1(yE)}" style="stroke:var(--treat);stroke-width:${swT}"/>`;
      if(q>.98){s+=`<text x="${f1(X(52)+4)}" y="${f1(yE-3)}" class="t-xs" style="fill:var(--treat);font-weight:700">${TF_D.ole[0].toFixed(1)}</text><text x="${f1(X(52)+4)}" y="${f1(yD+11)}" class="t-xs" style="fill:var(--ink)">${TF_D.ole[1].toFixed(1)}</text>`;
        TF_TXT.brk.ole.forEach((l,i)=>{s+=`<text x="176" y="${268+i*12}" class="t-xs" style="fill:var(--ink)">${l}</text>`})}}
    /* dose row and the week axis */
    s+=`<text x="${x0-10}" y="359" class="t-xs t-end">${TF_TXT.doses}</text>`;
    TF_D.doseW.forEach((w,i)=>{const lit=(i===0&&t>=.16)||(on&&wk>=w);const x=X(w);
      s+=`<path d="M${f1(x-4)} 350 H${f1(x+4)} L${f1(x)} 358Z" style="fill:${lit?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:1.2"/>`;
      if(i===0&&t>=.16&&t<.3)s+=`<circle cx="${f1(x)}" cy="354" r="${f1(9+3*Math.sin(t*120))}" style="fill:none;stroke:var(--treat);stroke-width:1.6"/>`});
    TF_D.xt.forEach(w=>{s+=`<text x="${f1(X(w))}" y="376" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${x1+8}" y="376" class="t-xs">${TF_TXT.weeks}</text>`;
    if(ap>0)TF_TXT.appr.forEach((l,i)=>{s+=`<text x="0" y="${396+i*14}" class="t-xs" style="fill:${i<2?'var(--treat)':'var(--ink)'};opacity:${f1(ap)}">${l}</text>`});
    return s}
  function draw(t){
    const N=vb(svg,'720 440','400 880');
    const L=N?{a:[25,5],b:[25,445],div:'M10 438 H390'}:{a:[5,5],b:[365,5],div:'M360 10 V430'};
    let s=`<defs>${marker('tfA','var(--muted)')}</defs>`;
    s+=`<path d="${L.div}" style="stroke:var(--line);stroke-width:1.4"/>`;
    s+=`<g transform="translate(${L.a[0]} ${L.a[1]})">${panel1(t)}</g>`;
    s+=`<g transform="translate(${L.b[0]} ${L.b[1]})">${panel2(t)}</g>`;
    svg.innerHTML=s;
    const p=phaseOf(TF_STEPS,t);setSt(p);const S=TF_STEPS[p];
    const P=Object.assign({},S,{txt:typeof S.txt==='function'?S.txt(grp):S.txt});
    $('#tfNote').innerHTML=noteHTML(P)+(p>=4?`<p class="callout">${TF_TXT.hl[start]}</p>`:'');
    $('#tfCap').textContent=TF_TXT.cap(TF_TXT.grpLab[grp],TF_TXT.armShort[start]);
  }
  const stop=playWire(rg,$('#tfPlay'),draw,18000,UI.replay,'tofersen');
  const setSt=stepWire($('#tfSteps'),TF_STEPS,rg,draw,stop);
  toggleRow($('#tfGrp'),TF_TXT.grp,'fast',v=>{grp=v;draw(+rg.value)});
  toggleRow($('#tfStart'),TF_TXT.start,'early',v=>{start=v;draw(+rg.value)});
  draw(+rg.value);
};
