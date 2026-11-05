
/* =============== 1.3 amyloid =============== */
const AM_STEPS=[
 {from:0,at:.06,k:'Step 1 · The precursor',t:'APP sits in the membrane',
  txt:'APP is a single-pass membrane protein encoded on chromosome 21: a large ectodomain outside the cell, one segment crossing the membrane, a short tail inside. The amyloid-beta sequence straddles the membrane surface. Neurons mainly make the APP695 isoform. [[Zhang2011]]',
  pt:'Amyloid starts as a small piece of a bigger protein that sits in the wall of every neuron.',
  hook:'APP is on chromosome 21. That is why people with Down syndrome, who have three copies, develop amyloid plaques early. [[SelkoeHardy2016]]'},
 {from:.15,at:.24,k:'Step 2 · The first cut',t:'Which enzyme gets there first',
  txt:'Alpha-secretase (ADAM10, the constitutive one in neurons) cuts inside the amyloid-beta region, between residues 16 and 17, so amyloid beta can never form. Beta-secretase (BACE1) cuts at the start of the amyloid-beta region instead. BACE1 works best at acid pH, which fits its activity in endosomes, and is thought to be the rate-limiting step for amyloid beta. [[Zhang2011,Kuhn2010,Vassar1999,Haass2012]]',
  pt:'Two different scissors can make the first cut. One cuts through the amyloid piece and destroys it. The other cuts just before it and leaves it intact.',
  hook:'Alpha-secretase first = non-amyloidogenic. Beta-secretase (BACE1) first = amyloidogenic.'},
 {from:.35,at:.42,k:'Step 3 · A fragment floats off',t:'sAPPalpha or sAPPbeta',
  txt:'The big outer piece is released. After an alpha cut it is sAPPalpha, reported to be neuroprotective; expressing it alone rescued the abnormalities of APP-deficient mice. After a beta cut it is sAPPbeta, which lacks amyloid-beta residues 1 to 16. What stays in the membrane is an 83-residue stub (C83) or a 99-residue stub (C99). [[Zhang2011]]',
  pt:'The large outer part drifts away. A short stub stays stuck in the membrane.'},
 {from:.5,at:.58,k:'Step 4 · The second cut',t:'Gamma-secretase cuts inside the membrane',
  txt:'Gamma-secretase is a complex of four parts: presenilin (PS1 or PS2, the catalytic core), nicastrin, APH-1 and PEN-2. It cuts the stub inside the membrane in steps, from residue 49 to 46 to 40 or 42. Mouse neurons lacking PS1 made about five times less amyloid beta. [[Zhang2011,Haass2012,DeStrooper1998]]',
  pt:'A second pair of scissors, buried in the membrane, cuts the stub free.',
  hook:'Presenilin is the catalytic subunit of gamma-secretase, so PSEN1 and PSEN2 mutations act on the very cut that makes amyloid beta.'},
 {from:.7,at:.78,k:'Step 5 · The products',t:'p3, or amyloid beta',
  txt:'After an alpha cut, gamma-secretase releases p3, considered pathologically irrelevant. After a beta cut it releases amyloid beta, mostly the 40-residue form; the 42-residue form is about 10% of the total but is more hydrophobic and more prone to form fibrils. The intracellular tail (AICD) is released inside the cell either way. [[Haass2012,Zhang2011]]',
  pt:'One route makes a harmless fragment. The other makes amyloid beta, and about one molecule in ten is the sticky kind.'},
 {from:.88,at:.95,k:'Step 6 · Genetics changes the balance',t:'The 42-to-40 ratio',
  txt:'Familial Alzheimer\'s mutations in APP and presenilin consistently raise the ratio of amyloid beta 42 to 40. The Icelandic A673T variant, next to the beta-site, cut amyloidogenic peptide formation by about 40% in vitro and protects against Alzheimer\'s and age-related decline. [[Zhang2011,Jonsson2012]]',
  pt:'Some gene changes make more of the sticky form. One rare change makes less, and the people who carry it are protected.',
  hook:'Every dominant early-onset mutation sits in APP or presenilin, the substrate and the enzyme of the reaction that makes amyloid beta. [[SelkoeHardy2016]]'}
];
const AM_AGG=[
 {from:0,at:.06,k:'Monomers',t:'Single molecules',txt:'Amyloid-beta monomers are released into the fluid between cells. Amyloid formation is nucleation-dependent, like crystallisation: the slow step is forming the first seed, and the 42-residue form seeds aggregation of the slower 40-residue form. [[Jarrett1993]]',pt:'Single amyloid molecules float free at first. Starting a clump is slow; growing one is fast.'},
 {from:.18,at:.26,k:'Oligomers',t:'Small soluble clumps',txt:'Small soluble assemblies form, from dimers upward. Naturally secreted oligomers, with no fibrils present, strongly inhibited memory-related long-term potentiation in live rats. Dimers extracted from Alzheimer\'s cortex reduced dendritic spines and disrupted learned memory. [[Walsh2002,Shankar2008]]',pt:'Small clumps that still float freely seem to be what harms connections between neurons.',hook:'Many researchers see soluble oligomers, not plaques, as the main synapse-damaging form. A 2012 critique noted there is no agreed definition of a toxic oligomer. [[HaassSelkoe2007,Benilova2012]]'},
 {from:.38,at:.46,k:'Protofibrils',t:'Curved threads',txt:'Oligomers lengthen into curved protofibrils, 6 to 8 nm wide and under 200 nm long. Lecanemab was designed to bind soluble protofibrils with high affinity. [[Walsh1997,vanDyck2023]]',pt:'The clumps lengthen into short curved threads. One of the new drugs was built to grab exactly these.'},
 {from:.56,at:.64,k:'Fibrils',t:'Straight beta-sheet fibres',txt:'Protofibrils mature into straight amyloid fibrils. Large insoluble deposits may act as reservoirs that release bioactive oligomers. [[Walsh1997,HaassSelkoe2007]]',pt:'The threads straighten into long fibres that no longer dissolve.'},
 {from:.72,at:.8,k:'Diffuse plaque',t:'A loose deposit',txt:'Fibrils deposit as a diffuse plaque: weakly stained, without damaged neurites or activated glia. The earliest deposits are 42-positive and 40-negative. Whether diffuse plaques are harmless ageing or an early stage is still uncertain. [[DeTure2019,Iwatsubo1994]]',pt:'A loose deposit forms. On its own it does not yet damage the neurons around it.'},
 {from:.86,at:.95,k:'Neuritic plaque',t:'A dense core with damage around it',txt:'A dense-core plaque attracts swollen tau-positive neurites, activated microglia and reactive astrocytes, making it a neuritic plaque. Oligomers sit in a halo around it and synapse loss is greatest near its edge. [[DeTure2019,SelkoeHardy2016]]',pt:'A dense plaque forms with damaged nerve endings, inflammation and lost connections around it.',hook:'Diffuse plaque = no damage around it. Neuritic plaque = dense core, dystrophic tau-positive neurites, activated glia.'}
];
inits.amyloid=()=>{
  const svg=$('#amSvg'),rg=$('#amT');let beta=true,fad=false,prot=false;
  function draw(t){
    const N=vb(svg,'720 400','400 600');
    const L=N?{mx0:12,mx1:388,my:250,cx:150,tx:24,ty:540,inX:20,inY:296,outX:20,outY:30,tally:{x:24,y:440,w:352}}
             :{mx0:20,mx1:520,my:230,cx:270,tx:540,ty:52,inX:30,inY:282,outX:30,outY:30,tally:{x:540,y:150,w:160}};
    const cutA=ramp(t,.15,.3), away=ease(ramp(t,.35,.5)), gam=ease(ramp(t,.5,.68)), rel=ease(ramp(t,.7,.88)), tal=ramp(t,.88,1);
    const blocked=prot&&beta?.4:0;
    let s=`<defs>${marker('amA')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // compartments
    s+=`<rect x="0" y="0" width="100%" height="${L.my-18}" style="fill:var(--csf);opacity:.45"/>`;
    s+=`<text x="${L.mx1}" y="${L.outY}" class="t-sm t-end">OUTSIDE THE NEURON</text>`;
    s+=`<text x="${L.inX}" y="${L.inY}" class="t-sm">INSIDE THE NEURON</text>`;
    // membrane bilayer
    for(let x=L.mx0;x<L.mx1;x+=12){s+=`<circle cx="${x}" cy="${L.my-14}" r="4.4" style="fill:var(--cell-line)"/><circle cx="${x}" cy="${L.my+14}" r="4.4" style="fill:var(--cell-line)"/><path d="M${x-1.5} ${L.my-10}v8M${x+1.5} ${L.my-10}v8M${x-1.5} ${L.my+2}v8M${x+1.5} ${L.my+2}v8" style="stroke:var(--cell-line);stroke-width:1;opacity:.6"/>`}
    s+=`<text x="${L.mx1}" y="${L.my+42}" class="t-xs t-end">membrane</text>`;
    // APP: ectodomain (drifts away after first cut), Abeta segment, transmembrane, tail
    const cx=L.cx, ab0=L.my-46, ab1=L.my+6;            // amyloid-beta region spans the surface
    const ecto=`<path d="M-26 0 C-50 -40 -36 -96 0 -104 C36 -96 50 -40 26 0 Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    const dx=away*(N?-80:-150), dy=-away*(N?40:56), rot=-away*24;
    s+=`<g transform="translate(${f1(cx+dx)} ${f1(ab0+dy)}) rotate(${f1(rot)})" style="opacity:${f1(1-away*.35)}">${ecto}<text x="0" y="-48" class="t-sm t-mid" style="fill:var(--sage)">${away>.15?(beta?'sAPPβ':'sAPPα'):'APP'}</text></g>`;
    if(away>.4)s+=`<text x="${f1(cx+dx)}" y="${f1(ab0+dy+16)}" class="t-xs t-mid" style="opacity:${f1(ramp(away,.4,.7))}">${beta?'released, lacks Aβ 1–16':'released, neuroprotective'}</text>`;
    // the stub (C83 / C99) and its amyloid-beta part
    const abVisible=beta?1:(1-cutA*.0);
    const abTop=beta?ab0:ab0+16;                       // alpha cut is inside the region, so the outer third goes with sAPPalpha
    const rise=rel*(N?-120:-150);
    s+=`<rect x="${cx-8}" y="${f1(abTop+rise)}" width="16" height="${f1(ab1-abTop)}" rx="6" style="fill:${beta?'var(--amber)':'var(--panel-2)'};stroke:${beta?'var(--amber)':'var(--muted)'};stroke-width:1.5;opacity:${f1(abVisible)}"/>`;
    if(rel>.15)s+=`<text x="${cx+16}" y="${f1(abTop+rise+16)}" class="t-lbl" style="fill:${beta?'var(--amber)':'var(--muted)'}">${beta?'amyloid β':'p3'}</text>`;
    // transmembrane remainder + intracellular tail (AICD drops after gamma)
    const drop=rel*60;
    s+=`<rect x="${cx-6}" y="${ab1}" width="12" height="${f1(L.my+18-ab1)}" style="fill:var(--sage);opacity:${f1(1-rel)}"/>`;
    s+=`<path d="M${cx} ${f1(L.my+18+drop)} q12 18 -2 34 q-12 14 4 26" style="fill:none;stroke:var(--sage);stroke-width:6;stroke-linecap:round"/>`;
    if(rel>.3)s+=`<text x="${cx+16}" y="${f1(L.my+60+drop)}" class="t-xs">AICD</text>`;
    if(away>.2&&rel<.1)s+=`<text x="${cx+18}" y="${L.my+(N?-22:4)}" class="t-xs">${beta?'C99 stub':'C83 stub'}</text>`;
    // first secretase: scissors approach and cut
    const sc1x=lerp(cx-120,cx-12,ramp(t,.15,.24)), sc1y=beta?ab0:ab0+16;
    if(t>.12&&t<.5)s+=`<g transform="translate(${f1(sc1x)} ${f1(sc1y)})" style="opacity:${f1(ramp(t,.12,.16)*(1-ramp(t,.4,.5)))}"><rect x="-58" y="-14" width="52" height="28" rx="9" style="fill:var(--panel);stroke:${beta?'var(--rose)':'var(--sage)'};stroke-width:2"/><text x="-32" y="5" class="t-xs t-mid" style="fill:${beta?'var(--rose)':'var(--sage)'};font-weight:700">${beta?'BACE1':'ADAM10'}</text><path d="M-6 0 l10 -6 M-6 0 l10 6" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/></g>`;
    if(blocked&&t>.15&&t<.4)s+=`<text x="${f1(cx-70)}" y="${f1(ab0-30)}" class="t-xs t-mid" style="fill:var(--good)">A673T: cuts ~40% less</text>`;
    // gamma-secretase: four-part complex inside the membrane
    if(t>.48&&t<.92){const gx=lerp(cx+130,cx+14,gam),o=ramp(t,.48,.52)*(1-ramp(t,.86,.92));
      s+=`<g transform="translate(${f1(gx)} ${L.my})" style="opacity:${f1(o)}">`;
      [['PS','var(--rose)'],['NCT','var(--sky)'],['APH','var(--violet)'],['PEN','var(--amber)']].forEach(([l,c],i)=>{const a=i*Math.PI/2+.4;
        s+=`<circle cx="${f1(14+Math.cos(a)*16)}" cy="${f1(Math.sin(a)*16)}" r="13" style="fill:var(--panel);stroke:${c};stroke-width:2"/><text x="${f1(14+Math.cos(a)*16)}" y="${f1(Math.sin(a)*16+3)}" class="t-xs t-mid" style="font-size:8.5px">${l}</text>`});
      s+=`</g><text x="${f1(gx+14)}" y="${L.my+(N?58:52)}" class="t-xs t-mid" style="opacity:${f1(o)}">γ-secretase</text>`}
    // tally of products: Abeta40 vs Abeta42
    if(tal>0&&beta){const T=L.tally,n42=fad?4:1,tot=10;
      s+=`<g style="opacity:${f1(tal)}"><text x="${T.x}" y="${T.y}" class="t-sm">OUT OF EVERY 10 AMYLOID-β</text>`;
      for(let i=0;i<tot;i++){const is42=i<n42,x=T.x+(i%5)*(N?22:28),y=T.y+16+Math.floor(i/5)*(N?22:28);
        s+=`<rect x="${x}" y="${y}" width="${N?16:20}" height="${is42?(N?16:20):(N?14:17)}" rx="4" style="fill:${is42?'var(--rose)':'var(--amber)'};opacity:.9"/>`}
      const ly=T.y+(N?66:80);
      s+=`<text x="${T.x}" y="${ly}" class="t-xs" style="fill:var(--amber)">■ Aβ40</text><text x="${T.x+(N?70:70)}" y="${ly}" class="t-xs" style="fill:var(--rose)">■ Aβ42, stickier</text>`;
      if(fad)s+=`<text x="${T.x}" y="${ly+16}" class="t-xs" style="fill:var(--rose)">familial mutation: ratio rises</text>`;
      s+='</g>'}
    if(tal>0&&!beta)s+=`<text x="${L.tally.x}" y="${L.tally.y}" class="t-sm" style="fill:var(--sage);opacity:${f1(tal)}">NO AMYLOID β MADE</text>`;
    svg.innerHTML=s;
    const p=phaseOf(AM_STEPS,t);setSt(p);
    let P=AM_STEPS[p];
    if(!beta&&p===4)P={...P,t:'p3, not amyloid beta',txt:'Because alpha-secretase cut inside the amyloid-beta region, gamma-secretase releases p3, which is considered pathologically irrelevant. No amyloid beta is made on this route. [[Haass2012,Zhang2011]]'};
    $('#amNote').innerHTML=noteHTML(P);
    $('#amCap').textContent=`${beta?'Beta-secretase first: amyloid beta is made':'Alpha-secretase first: no amyloid beta'}${fad?' · familial mutation (the higher Aβ42 share is drawn schematically)':''}${prot?' · protective A673T':''}. Schematic, not to scale.`;
  }
  const stop=playWire(rg,$('#amPlay'),draw,16000,'Replay','amyloid');
  const setSt=stepWire($('#amSteps'),AM_STEPS,rg,draw,stop);
  const set=(id,v)=>$(id).setAttribute('aria-pressed',v);
  $('#amAlpha').onclick=()=>{beta=false;set('#amAlpha',true);set('#amBeta',false);draw(+rg.value)};
  $('#amBeta').onclick=()=>{beta=true;set('#amAlpha',false);set('#amBeta',true);draw(+rg.value)};
  $('#amFad').onclick=()=>{fad=!fad;set('#amFad',fad);if(fad){prot=false;set('#amProt',false)}draw(+rg.value)};
  $('#amProt').onclick=()=>{prot=!prot;set('#amProt',prot);if(prot){fad=false;set('#amFad',false)}draw(+rg.value)};

  /* ---- aggregation ---- */
  $('#amAggLede').innerHTML='Amyloid beta is cleared all the time. In late-onset Alzheimer\'s, production was normal in a labelling study but clearance was about 30% slower, so it builds up over years. [[Mawuenyega2010]]';
  const ag=$('#amAgg'),ar=$('#amAggT');const R=rng(31);
  const MONO=Array.from({length:26},()=>({x:R(),y:R(),p:R()}));
  function drawAgg(t){
    const N=vb(ag,'720 320','400 560');
    const L=N?{cols:[[150,64],[150,174],[150,284],[150,394],[150,504]],w:360}:{cols:[[70,150],[210,150],[350,150],[490,150],[630,150]],w:720};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const stages=['monomers','oligomers','protofibrils','fibrils','plaque'];
    const prog=t*5;
    L.cols.forEach(([x,y],i)=>{const on=clamp(prog-i+.6),cur=Math.floor(clamp(prog,0,4.999))===i;
      s+=`<circle cx="${x}" cy="${y}" r="${N?44:52}" style="fill:${cur?'var(--amber-soft)':'var(--panel)'};stroke:${cur?'var(--amber)':'var(--line)'};stroke-width:${cur?2:1}"/>`;
      s+=`<text x="${N?x+54:x}" y="${y+(N?4:72)}" class="t-sm${N?'':' t-mid'}" style="fill:${cur?'var(--ink)':'var(--muted)'}">${stages[i]}</text>`;
      if(i<4){const [nx,ny]=L.cols[i+1];s+=N?`<path d="M${x} ${y+48} V${ny-48}" class="arrow" marker-end="url(#agA)" style="opacity:.5"/>`:`<path d="M${x+56} ${y} H${nx-58}" class="arrow" marker-end="url(#agA)" style="opacity:.5"/>`}
      if(on<=0)return;
      const o=f1(on);
      if(i===0)MONO.slice(0,10).forEach(m=>{s+=`<circle cx="${f1(x-26+m.x*52)}" cy="${f1(y-26+m.y*52)}" r="3.4" style="fill:var(--amber);opacity:${o}"/>`});
      if(i===1)for(let k=0;k<4;k++){const a=k/4*Math.PI*2,cx=x+Math.cos(a)*20,cy=y+Math.sin(a)*20;for(let j=0;j<3;j++)s+=`<circle cx="${f1(cx+(j-1)*5)}" cy="${f1(cy+(j%2)*4)}" r="3.2" style="fill:var(--amber);opacity:${o}"/>`}
      if(i===2)for(let k=0;k<3;k++)s+=`<path d="M${x-28} ${y-14+k*14} q14 -10 28 0 t28 0" style="fill:none;stroke:var(--amber);stroke-width:5;stroke-linecap:round;opacity:${o}"/>`;
      if(i===3)for(let k=0;k<4;k++)s+=`<path d="M${x-32} ${y-18+k*12} L${x+32} ${y-24+k*12}" style="stroke:var(--amber);stroke-width:4;stroke-linecap:round;opacity:${o}"/>`;
      if(i===4){const neur=ramp(t,.86,1);s+=plaque(x,y,30,7,+o);
        for(let k=0;k<5;k++){const a=k/5*Math.PI*2+.4;s+=`<circle cx="${f1(x+Math.cos(a)*40)}" cy="${f1(y+Math.sin(a)*40)}" r="${f1(3+3*neur)}" style="fill:var(--rose);opacity:${f1(neur*.85)}"/>`}
        if(neur>0)s+=microglia(x+38,y-30,6,neur,1)}});
    ag.innerHTML=`<defs>${marker('agA')}</defs>`+s;
    const p=phaseOf(AM_AGG,t);$('#amAggNote').innerHTML=noteHTML(AM_AGG[p]);
    ar.setAttribute('aria-valuetext',`Stage ${p+1} of ${AM_AGG.length}: ${AM_AGG[p].t}`);
  }
  playWire(ar,$('#amAggPlay'),drawAgg,12000,'Replay','amyloid');
  $('#amCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>The genetics point at amyloid</h4><p>Every dominant early-onset mutation is in APP or presenilin. Duplicating normal APP causes Alzheimer's. The protective A673T variant lowers beta-cleavage. In dominantly inherited Alzheimer's, spinal-fluid amyloid beta 42 began falling about 25 years before expected symptoms. [[SelkoeHardy2016,Jonsson2012,Bateman2012]]</p></div>
   <div class="card"><span class="ev early">Contested</span><h4>But plaques track memory poorly</h4><p>Tangle counts correlate with cognitive impairment far better than plaque burden. In a meta-analysis of 2,914 cognitively normal people, amyloid positivity rose from 10% at age 50 to 44% at age 90. [[Nelson2012,Arriagada1992,Jansen2015]]</p></div>
   <div class="card"><span class="ev early">Contested</span><h4>Drugs that blocked the cuts failed</h4><p>The gamma-secretase inhibitor semagacestat did not help, and its higher dose worsened function. The BACE1 inhibitor verubecestat stopped early for futility. Supporters point to poor selectivity and to treating too late. [[Doody2013,Egan2018,SelkoeHardy2016]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Removing amyloid slowed decline, modestly</h4><p>In 2023, lecanemab cleared amyloid, and CDR-SB worsened 1.21 points against 1.66 on placebo over 18 months, a difference of 0.45. How meaningful that is to patients is debated. [[vanDyck2023,Karran2022]] See <a href="#antibody" data-go="antibody">Anti-amyloid antibodies</a>.</p></div>
   <div class="card"><span class="ev hyp">Retracted</span><h4>The Aβ*56 paper</h4><p>A 2006 Nature paper reported one oligomer, Aβ*56, in one mouse model and linked it to memory loss. [[Lesne2006]] A 2022 Science investigation reported signs of image fabrication in many Alzheimer's papers. [[Piller2022]] Nature retracted the 2006 paper in 2024, citing concerns about its figures and stating the data could not be verified from the records; the first author disagreed with the retraction. [[Lesne2024Retraction]] The retraction removes that paper's evidence for Aβ*56. It does not touch the genetic evidence, the human biomarker timelines, other labs' oligomer work, or the antibody trials. That last judgement is a synthesis across sources, not any single source's statement. [[SelkoeHardy2016,Jonsson2012,Bateman2012,Walsh2002,Shankar2008,vanDyck2023]] A 2025 preprint from the senior author's lab, not peer reviewed, reports Aβ*56 variants in human brain. [[Lapcinski2025]]</p></div>
   <div class="card"><h4>Where the hypothesis stands</h4><p>The 2016 revision adds a direct path from oligomers to synapse injury and glial activation. A 2022 review argues plaque must fall to about 20 centiloids before benefit shows, with a lag. A 2015 critique argued the linear model should be rejected. [[SelkoeHardy2016,Karran2022,Herrup2015]]</p></div>`;
  const prevR=redraws.amyloid;redraws.amyloid=()=>{prevR&&prevR();drawAgg(+ar.value)};
  draw(+rg.value);drawAgg(+ar.value);
};
