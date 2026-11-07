/* =============== 1.1 what FMF is =============== */
const WH_POPS=[
 {id:'iraqi',n:'Iraqi Jews',c:29,
  txt:'Iraqi Jews: 29% carriers in an Israeli screen that tested three variants (Kogan 2001); 1 in 3.5 on a four-variant panel (Gershoni-Baruch 2001). V726A is the main variant here (12.8% carry it). [[Kogan2001,GershoniBaruch2001]]',
  obs:[{l:'2 variants, well',v:25,c:'phenotype III, 1 in 25 [[Kogan2001]]'},{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional, not specific to this group) [[Tufan2020]]'}]},
 {id:'moroc',n:'Moroccan / North African Jews',c:21,
  txt:'Moroccan Jews: 21% on the same three-variant panel (Kogan 2001) and 1 in 4.7 on a four-variant panel (Gershoni-Baruch 2001). M694V dominates (11.1% carry it) and V726A is absent. One review gives 1 in 3.5. [[Kogan2001,GershoniBaruch2001,Lancieri2023]]',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional figure) [[Tufan2020]]'}]},
 {id:'ashk',n:'Ashkenazi Jews',c:21,
  txt:'Ashkenazi Jews: about 21% of ~200 anonymous samples carried a variant, mostly E148Q, with evidence of reduced penetrance; other screens give 14% on a three-variant panel and 1 in 4.5 on a four-variant panel. FMF is much rarer clinically than in North African and Iraqi Jews. [[Aksentijevich1999,Kogan2001,GershoniBaruch2001]]',
  obs:[{l:'2 variants, well',v:300,c:'phenotype III, 1 in 300 [[Kogan2001]]'}],none:'FMF: much rarer, no figure'},
 {id:'arab',n:'Muslim Arabs in Israel',c:23,
  txt:'Muslim Arabs in Israel: 1 in 4.3 carriers on a four-variant panel; V726A 7.3%, M694V 0.6%. [[GershoniBaruch2001]]',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional figure) [[Tufan2020]]'}]},
 {id:'armen',n:'Armenians',c:20,
  txt:'Armenians: about 1 in 5 in a recent review. An older pre-molecular segregation study of 64 Armenian-American families estimated a gene frequency of 0.073, about 1 carrier in 7. [[Lancieri2023,Rogers1989]]',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 (regional figure) [[Tufan2020]]'}]},
 {id:'turk',n:'Turks',c:20,
  txt:'Healthy Turks: 20% carry one of five common variants: E148Q 12%, M680I 5%, M694V 3%, V726A 2%. E148Q is common in healthy people but only 3.6% of patient alleles, a sign of low penetrance. [[Yilmaz2001]]',
  obs:[{l:'FMF, Sivas',v:395,c:'FMF in Sivas, Central Anatolia, 1 in 395 (door-to-door survey) [[Onen2004]]'},{l:'FMF, Turkey',v:1000,c:'Turkey overall, about 0.1% [[Onen2004]]'}]},
 {id:'greek',n:'Greeks',c:.7,
  txt:'Greeks: only 0.7% of 140 healthy Greeks were carriers, although Greek patients mainly carry M694V, M680I and V726A. [[Giaglis2007]]',
  obs:[],none:'No prevalence figure found'},
 {id:'pool',n:'Pooled meta-analysis',c:18.6,
  txt:'Meta-analysis of 16,756 chromosomes from 14 populations: mean carrier rate 0.186, peaking in Arabs, Armenians, Jews and Turks. [[Papadopoulos2008]]',
  obs:[{l:'FMF, endemic',r:[500,1000],c:'FMF in endemic countries, 1:500 to 1:1,000 [[Tufan2020]]'}]}
];
const WH_STEPS=[
 {from:0,at:.45,k:'Step 1 · Carriers',t:'One changed copy, no illness',
  txt:'Where FMF is common, roughly 1 person in 5 carries one MEFV variant. A meta-analysis of 16,756 chromosomes from 14 populations found a mean carrier rate of 0.186. Carriers are usually healthy, because FMF is classically recessive. [[Papadopoulos2008,GeneReviews]]',
  pt:'Many people carry one changed copy of the FMF gene without knowing it. One copy alone usually causes no illness.',
  hook:'MEFV carrier rates in Jewish, Arab, Armenian and Turkish populations (about 10% or more) are far above cystic fibrosis carriers in North Americans of European ancestry (about 4%). [[Park2020]]'},
 {from:.5,at:.72,k:'Step 2 · Two carriers',t:'1 child in 4 inherits two variants',
  txt:'When both parents carry one variant, each child has a 1 in 4 chance of inheriting two (one from each parent), 1 in 2 of being a carrier, and 1 in 4 of inheriting neither. [[GeneReviews]] The <a href="#gene" data-go="gene">next module</a> animates this as a Punnett square.',
  pt:'Each child of two carriers has a one-in-four chance of getting both changed copies.',
  hook:'Autosomal recessive: <b>25% / 50% / 25%</b> for each pregnancy, independent of earlier children.'},
 {from:.75,at:.97,k:'Step 3 · Prediction vs reality',t:'Fewer people get FMF than predicted',
  txt:'Squaring half the carrier rate gives a naive estimate of two-variant births. Observed FMF is rarer: about 1:500 to 1:1,000 in endemic countries, and 1:395 at the highest, in Sivas, Turkey. Two things explain the gap. Penetrance is reduced, especially for E148Q. And "phenotype III", two variants with no disease, was found in 1 in 25 Iraqi Jews and 1 in 300 Ashkenazi Jews: 40 to 240 times the rate of overt FMF in those groups. [[Tufan2020,Onen2004,Touitou2001,Kogan2001]]',
  pt:'Having two variants raises the chance of FMF a lot, but it does not guarantee it.',
  hook:'<b>Phenotype III</b> = two MEFV variants, no symptoms, no amyloidosis. E148Q is the mildest, least penetrant variant. [[SorianoManna2012,Touitou2001]]'}
];
const WH_SEL=[
 {from:0,at:.04,k:'About 2,100–2,200 years ago',t:'A new variant appears',
  txt:'<span class="ev est">Established</span> The variants are ancient. Carrier chromosomes from populations "separated for centuries" share the same surrounding DNA. Dating 4,626 haplotypes from 2,313 Turkish people put M694V at about 2,108 years by a hidden Markov model (95% CI 1,798–2,501) and V726A at about 2,192 years (1,826–2,754). The same paper\'s Gamma method dated the most recent common ancestor further back, about 3,541 years for M694V and 3,372 years for V726A, so "how old" depends on the method. [[IntFMF1997,Park2020]]',
  pt:'Each common FMF variant started once, in one person, more than two thousand years ago.',
  hook:'Shared haplotypes mean <b>founder</b> variants. Five founders (M694V, V726A, M694I, M680I, E148Q) explain about 74% of FMF chromosomes in typical patients. [[Touitou2001]]'},
 {from:.15,at:.26,k:'0–540 CE',t:'A slow, invisible rise',
  txt:'<span class="ev early">Early evidence</span> Park et al. found long unbroken stretches of DNA around M694V and V726A (extended haplotype homozygosity), a signature of strong, recent positive selection. There was no such signal around E148Q. Their selection coefficients were 0.077 for M694V and 0.068 for V726A per generation. Constant selection multiplies a rare variant by a fixed factor each generation, which is a straight line on this log scale. [[Park2020]]',
  pt:'Carriers seem to have had slightly more surviving children, generation after generation.',
  hook:'Selection signal: <b>M694V and V726A yes, E148Q no</b>.'},
 {from:.335,at:.37,k:'541 CE',t:'The Plague of Justinian',
  txt:'<span class="ev early">Consistent with, not proven</span> Park et al. link the timing of selection to plague pandemics, starting with the Plague of Justinian from 541 CE. The proposed mechanism: the plague bacterium <i>Yersinia pestis</i> uses an effector, YopM, to keep pyrin switched off. FMF-variant pyrin binds YopM less avidly, so patient and even carrier white cells release more IL-1β when infected. [[Park2020]]',
  pt:'The plague germ has a trick for switching pyrin off. FMF-type pyrin partly resists the trick.',
  hook:'YopM suppresses pyrin. FMF pyrin escapes YopM, giving more IL-1β against <i>Y. pestis</i>.'},
 {from:.70,at:.73,k:'1347 CE',t:'The Black Death',
  txt:'<span class="ev early">Early evidence</span> The second pandemic began with the Black Death in 1347 CE. Mice carrying the knock-in M680I pyrin on both copies survived <i>Y. pestis</i> infection better than mice with the normal human B30.2 domain, and the protection was lost without the IL-1 receptor. The survival experiment was done in homozygotes, not carriers. With YopM-deficient bacteria the difference between variant and normal cells disappeared. [[Park2020]]',
  pt:'Animal and cell experiments fit the idea, but nobody can rerun history to prove it.',
  hook:'Heterozygote advantage: one copy may help against an infection, two copies cause disease.'},
 {from:.88,at:1,k:'Today',t:'Carriers are common',
  txt:'Heterozygote frequency across Jewish, Arab, Armenian and Turkish populations is roughly 10% as Park et al. summarize it, while the pooled meta-analysis gives a mean of 18.6%; the figure depends on which variants were tested. Healthy carriers have slightly higher basal and peak CRP and SAA than non-carriers, a "pro-inflammatory" state proposed to aid host defence. [[Park2020,Papadopoulos2008,Lachmann2006]]',
  pt:'Today many people carry one copy. It may have been a small advantage in the past.',
  hook:'Evidence labels: plague selection is <b>early evidence</b> (consistent with, not proven). Tuberculosis resistance is a <b>hypothesis</b>.'}
];
const WH_SITES=[
 {id:'perit',n:'Peritonitis',v:93.7,txt:'Sudden belly pain that can look exactly like a surgical emergency, with guarding and rebound. It settles completely within 24–72 hours. Many patients have had unnecessary appendectomies or laparotomies. [[Tufan2020]]'},
 {id:'fever',n:'Fever',v:92.5,txt:'Starts suddenly and peaks within hours. It can occur alone, and in young children it can present as fever of unknown origin. [[Tufan2020]]'},
 {id:'arth',n:'Arthritis',v:47.4,txt:'Usually one large lower-limb joint: knee, ankle or hip. The joint fluid is sterile but inflamed, so it can mimic septic arthritis. It settles in about a week; protracted arthritis occurs in under 5%. [[Tufan2020]]'},
 {id:'myal',n:'Myalgia',v:39.6,txt:'Most often exertional pain in the calves after long standing or travel, more frequent with M694V. Protracted febrile myalgia is a rarer, severe form lasting weeks that responds to corticosteroids. [[Tufan2020,Langevitz1994]]'},
 {id:'pleur',n:'Pleuritis',v:31.2,txt:'Sudden, one-sided chest pain on breathing. There may be a small effusion. It resolves in 1–3 days. [[Tufan2020]]'},
 {id:'ele',n:'Erysipelas-like erythema',v:20.9,txt:'A tender red plaque, usually on the lower leg, ankle or top of the foot, often after long walking. In one paediatric cohort it was linked to arthritis and M694V homozygosity. [[Tufan2020,GezginYildirim2020]]'},
 {id:'peric',n:'Pericarditis',v:1.4,txt:'Rare. In Israel, 27 of about 4,000 patients over 20 years, still about ten times the background rate. Attacks lasted a mean of 4.2 days with no lasting damage. [[Kees1997,Tunca2005]]'}
];
inits.what=()=>{
  /* ---------- 1. carriers dot grid ---------- */
  const svg=$('#whSvg'),rg=$('#whT');let pop=WH_POPS[0];
  const order=(()=>{const r=rng(16),a=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  const person=(x,y,sc,fill,half)=>{
    const id='whc'+Math.round(x)+'_'+Math.round(y);
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${sc})">`;
    if(half){g+=`<defs><clipPath id="${id}"><rect x="-8" y="-16" width="8" height="28"/></clipPath></defs>`;
      g+=`<circle cy="-9" r="4.2" style="fill:var(--line)"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:var(--line)"/>`;
      g+=`<g clip-path="url(#${id})"><circle cy="-9" r="4.2" style="fill:var(--terra)"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:var(--terra)"/></g>`}
    else g+=`<circle cy="-9" r="4.2" style="fill:${fill}"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:${fill}"/>`;
    return g+'</g>'};
  const oneIn=n=>{if(n<1000)return Math.round(n).toLocaleString('en-US');const p=Math.pow(10,Math.floor(Math.log10(n))-1);return (Math.round(n/p)*p).toLocaleString('en-US')};
  function draw(t){
    /* narrow: the grid, the family and the prevalence scale stack in one column */
    const N=vb(svg,'720 420','400 896');
    const L=N
      ? {tx:20,ty:22, gx:36,gdx:36,gy:60,gdy:30, bigY:366,subY:386, div:'M20 404H380',
         famTx:20,famTy:432, paX:[130,270],paY:486,carY:522,
         conn:'M155 482H245M200 482V546M46 546H352', kidX:[46,148,250,352], stemY:[546,558],
         kidY:588,kidLab:618,ringY:581, oddX:46,oddY:646,oddY2:660,
         l3x:20,l3y:700, AX0:56,AX1:370, gTop:716, axY:846, tickY:862, rarerY:878,
         rowY:i=>740+i*40, noneY:i=>740+i*40-14}
      : {tx:30,ty:34, gx:46,gdx:26,gy:78,gdy:29, bigY:378,subY:398, div:'M318 40V400',
         famTx:336,famTy:34, paX:[430,560],paY:96,carY:132,
         conn:'M455 92H535M495 92V150M372 150H582', kidX:[372,442,512,582], stemY:[150,162],
         kidY:192,kidLab:222,ringY:185, oddX:614,oddY:186,oddY2:202,
         l3x:336,l3y:252, AX0:465,AX1:665, gTop:266, axY:370, tickY:386, rarerY:402,
         rowY:i=>i?288+i*30:286, noneY:i=>288+i*30+4};
    const lx=n=>lerp(L.AX0,L.AX1,(Math.log10(n)-1)/4);
    const c=pop.c,nLit=c>=1?Math.round(c*ramp(t,.03,.46)):(t>.3?1:0);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-lbl">100 people · ${pop.n}</text>`;
    for(let i=0;i<100;i++){const k=order.indexOf(i),r=Math.floor(i/10),q=i%10,x=L.gx+q*L.gdx,y=L.gy+r*L.gdy;
      const lit=k<nLit;s+=person(x,y,1,lit?'var(--terra)':'var(--line)');
      if(lit&&k===nLit-1&&t<.48)s+=`<circle cx="${x}" cy="${y-2}" r="13" style="fill:none;stroke:var(--terra);stroke-width:1.5;opacity:.6"/>`}
    const shown=c>=1?nLit:(nLit?.7:0);
    s+=`<text x="${L.tx}" y="${L.bigY}" class="t-big" style="fill:var(--terra)">${c>=1?shown:(nLit?'0.7':'0')} ${c>=1?'carriers in 100':'carriers in 100'}</text>`;
    s+=`<text x="${L.tx}" y="${L.subY}" class="t-sm">${nLit?'about 1 in '+(100/c<10?f1(100/c):Math.round(100/c)):'carry one MEFV variant'}${c<1&&nLit?' (shown as 1 figure)':''}</text>`;
    s+=`<path d="${L.div}" class="axis"/>`;
    /* layer 2: family */
    const o2=ramp(t,.5,.56);
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><text x="${L.famTx}" y="${L.famTy}" class="t-lbl">If two carriers have children</text>`;
      s+=person(L.paX[0],L.paY,2,'',true)+person(L.paX[1],L.paY,2,'',true);
      s+=`<text x="${L.paX[0]}" y="${L.carY}" class="t-xs t-mid">carrier</text><text x="${L.paX[1]}" y="${L.carY}" class="t-xs t-mid">carrier</text>`;
      s+=`<path d="${L.conn}" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`;
      const kids=[['VV','2 variants'],['V+','carrier'],['+V','carrier'],['++','neither']];
      kids.forEach(([g,l],i)=>{const o=ramp(t,.56+i*.035,.6+i*.035);if(o<=0)return;const x=L.kidX[i];
        s+=`<g style="opacity:${f1(o)}"><path d="M${x} ${L.stemY[0]}V${L.stemY[1]}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        s+=g==='VV'?person(x,L.kidY,1.6,'var(--terra)'):g==='++'?person(x,L.kidY,1.6,'var(--line)'):person(x,L.kidY,1.6,'',true);
        s+=`<text x="${x}" y="${L.kidLab}" class="t-xs t-mid" ${g==='VV'?'style="fill:var(--terra);font-weight:700"':''}>${l}</text></g>`});
      const o3=ramp(t,.7,.74);
      if(o3>0)s+=`<g style="opacity:${f1(o3)}"><circle cx="${L.kidX[0]}" cy="${L.ringY}" r="24" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:4 3"/><text x="${L.oddX}" y="${L.oddY}" class="t-big${N?' t-mid':''}">1 in 4</text><text x="${L.oddX}" y="${L.oddY2}" class="t-xs${N?' t-mid':''}">per child</text></g>`;
      s+='</g>'}
    /* layer 3: predicted vs observed, log axis */
    const o4=ramp(t,.75,.8);
    if(o4>0){const pred=1/Math.pow(c/200,2),slide=ease(ramp(t,.78,.9));
      s+=`<g style="opacity:${f1(o4)}"><text x="${L.l3x}" y="${L.l3y}" class="t-lbl">How common? 1 in N, log scale</text>`;
      s+=`<line x1="${L.AX0}" y1="${L.axY}" x2="${L.AX1}" y2="${L.axY}" style="stroke:var(--muted);stroke-width:1.2"/>`;
      [[10,'1:10'],[100,'1:100'],[1e3,'1:1k'],[1e4,'1:10k'],[1e5,'1:100k']].forEach(([n,l])=>{const x=lx(n);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gTop}" y2="${L.axY}" class="grid"/><text x="${f1(x)}" y="${L.tickY}" class="t-xs t-mid">${l}</text>`});
      s+=`<text x="${L.AX1}" y="${L.rarerY}" class="t-xs t-end">rarer →</text>`;
      /* narrow has no room for a label column beside the axis: the row label and its
         value share one line above the marker instead */
      const row=(y,lab,col,val)=>N
        ? `<text x="${L.l3x}" y="${y-14}" class="t-sm" style="fill:${col}">${lab} · ${val}</text>`
        : `<text x="${L.l3x}" y="${y+4}" class="t-sm" style="fill:${col}">${lab}</text>`;
      const val=(y,x,col,v)=>N?'':`<text x="${f1(x)}" y="${y-10}" class="t-xs t-mid" style="fill:${col};font-weight:700">${v}</text>`;
      const py=L.rowY(0),pv='1:'+oneIn(pred);
      s+=row(py,'Predicted (est.)','var(--sea)',pv);
      const px=lerp(L.AX0,lx(pred),slide);
      s+=`<path d="M${f1(px)} ${py-7}l7 7-7 7-7-7z" style="fill:var(--sea)"/>`+val(py,px,'var(--sea)',pv);
      pop.obs.forEach((ob,i)=>{const y=L.rowY(i+1),ov=ob.r?`1:${ob.r[0]}–1:1,000`:'1:'+oneIn(ob.v);
        s+=row(y,ob.l,'var(--terra)',ov);
        if(ob.r){const xa=lerp(L.AX0,lx(ob.r[0]),slide),xb=lerp(L.AX0,lx(ob.r[1]),slide);s+=`<rect x="${f1(xa-4)}" y="${y-5}" width="${f1(xb-xa+8)}" height="10" rx="5" style="fill:var(--terra);opacity:.85"/>`+val(y,(xa+xb)/2,'var(--terra)',ov)}
        else{const x=lerp(L.AX0,lx(ob.v),slide);s+=`<circle cx="${f1(x)}" cy="${y}" r="6" style="fill:var(--terra)"/>`+val(y,x,'var(--terra)',ov)}});
      if(pop.none)s+=`<text x="${L.l3x}" y="${L.noneY(pop.obs.length+1)}" class="t-sm">${pop.none}</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  function readout(){const pred=1/Math.pow(pop.c/200,2);
    $('#whRead').innerHTML=`<span>${pop.txt}</span><span>Simple estimate of two-variant births, assuming random partnering and ignoring penetrance: (${f1(pop.c)}% ÷ 2)² ≈ <b>1 in ${oneIn(pred)}</b>.</span>`+(pop.obs.length?`<span>Observed: ${pop.obs.map(o=>o.c).join('; ')}.</span>`:'')}
  const stop=playWire(rg,$('#whPlay'),draw,16000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $('#whPops').innerHTML=WH_POPS.map((p,i)=>`<button class="btn" data-pop="${i}" aria-pressed="${i===0}">${p.n}</button>`).join('');
  $('#whPops').addEventListener('click',e=>{const b=e.target.closest('[data-pop]');if(!b)return;pop=WH_POPS[+b.dataset.pop];
    $$('[data-pop]',$('#whPops')).forEach(x=>x.setAttribute('aria-pressed',x===b));readout();draw(+rg.value)});
  readout();draw(+rg.value);

  /* ---------- 2. heterozygote advantage ---------- */
  const sv=$('#whSel'),rs=$('#whSelT');
  const Y0=-200,Y1=2000,L0=-4.5,L1=-1;
  const VAR=[{n:'M694V',s:.077,o:2000-2108,ci:[2000-2501,2000-1798],col:'var(--terra)'},{n:'V726A',s:.068,o:2000-2192,ci:[2000-2754,2000-1826],col:'var(--crocus)'}];
  const P0=5e-5,pf=(v,yr)=>{if(yr<v.o)return null;const e=Math.exp(v.s*(yr-v.o)/25);return P0*e/(1-P0+P0*e)};
  const yrLbl=y=>y<0?Math.round(-y)+' BCE':Math.round(y)+' CE';
  const pct=p=>p<.001?(p*100).toFixed(3)+'%':p<.01?(p*100).toFixed(2)+'%':(p*100).toFixed(1)+'%';
  function drawSel(t){const yr=lerp(Y0,Y1,t);
    /* narrow: one chart at the full 400 width, taller, with fewer x ticks */
    const N=vb(sv,'720 400','400 520');
    const X0=N?46:84,X1=N?380:672,PY0=N?440:330,PY1=N?100:84;
    const xy=y=>lerp(X0,X1,(y-Y0)/(Y1-Y0)),yl=l=>lerp(PY0,PY1,(l-L0)/(L1-L0));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    [[-4,'0.01%'],[-3,'0.1%'],[-2,'1%'],[-1,'10%']].forEach(([l,lb])=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yl(l))}" y2="${f1(yl(l))}" class="grid"/><text x="${X0-6}" y="${f1(yl(l)+3)}" class="t-xs t-end">${lb}</text>`});
    s+=N?`<text x="14" y="26" class="t-xs">allele frequency, log scale</text>`
        :`<text x="16" y="${(PY0+PY1)/2}" class="t-xs t-mid" transform="rotate(-90 16 ${(PY0+PY1)/2})">allele frequency, log scale</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${PY0}" y2="${PY0}" class="axis"/>`;
    (N?[[-200,'200 BCE'],[600,'600'],[1300,'1300'],[2000,'2000 CE']]
      :[[-200,'200 BCE'],[0,'0'],[500,'500'],[1000,'1000'],[1500,'1500'],[2000,'2000 CE']]).forEach(([y,l])=>{const x=xy(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY0}" y2="${PY0+4}" class="axis"/><text x="${f1(x)}" y="${PY0+16}" class="t-xs ${y===-200?'':y===2000?'t-end':'t-mid'}">${l}</text>`});
    /* plague events */
    [[541,N?'Justinian plague':'Plague of Justinian','541 CE'],[1347,'Black Death','1347 CE']].forEach(([y,a,b])=>{const x=xy(y),on=yr>=y,o=on?1:.45;
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY1-12}" y2="${PY0}" style="stroke:var(--bad);stroke-width:${on?2:1.2};stroke-dasharray:5 4;opacity:${o}"/>`;
      s+=`<text x="${f1(x)}" y="${PY1-36}" class="t-lbl t-mid" style="fill:var(--bad);opacity:${o}">${a}</text><text x="${f1(x)}" y="${PY1-20}" class="t-xs t-mid" style="fill:var(--bad);opacity:${o}">${b}</text>`});
    /* curves */
    VAR.forEach((v,i)=>{let d='';for(let y=v.o;y<=yr;y+=10){const p=pf(v,y);d+=(d?'L':'M')+f1(xy(y))+' '+f1(yl(Math.log10(p)))}
      if(d){const pe=pf(v,yr),hx=xy(yr),hy=yl(Math.log10(pe));
        s+=`<path d="${d}L${f1(hx)} ${f1(hy)}" style="fill:none;stroke:${v.col};stroke-width:3;stroke-linecap:round"/>`;
        s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="5" style="fill:${v.col}"/>`;
        const nr=hx>X1-(N?96:110);s+=`<text x="${f1(nr?hx-8:hx+8)}" y="${f1(i?hy+16:hy-9)}" class="t-sm${nr?' t-end':''}" style="fill:${v.col};font-weight:600">${v.n} ${pct(pe)}</text>`}
      /* age CI bars */
      const by=PY0+34+i*16,xa=xy(Math.max(Y0,v.ci[0])),xb=xy(v.ci[1]);
      s+=`<line x1="${f1(xa)}" x2="${f1(xb)}" y1="${by}" y2="${by}" style="stroke:${v.col};stroke-width:3;opacity:.55"/><circle cx="${f1(xy(v.o))}" cy="${by}" r="4" style="fill:${v.col}"/>`;
      if(v.ci[0]<Y0)s+=`<path d="M${f1(xa)} ${by}l6 -4v8z" style="fill:${v.col}"/>`;
      s+=`<text x="${f1(xb+8)}" y="${by+3}" class="t-xs">${v.n} age ≈ ${(2000-v.o).toLocaleString('en-US')} y (HMM, 95% CI)</text>`});
    /* playhead */
    const hx=xy(yr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${PY1}" y2="${PY0}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=`<text x="${f1(clamp(hx,N?74:120,X1-(N?20:24)))}" y="${PY1-2}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${yrLbl(yr)}</text>`;
    s+=`<text x="${X1}" y="${PY0-8}" class="t-xs t-end">schematic model</text>`;
    sv.innerHTML=s;
    const a=pf(VAR[0],yr),b=pf(VAR[1],yr);
    $('#whSelRead').innerHTML=`<span>Year <b>${yrLbl(yr)}</b></span><span>M694V <b>${a?pct(a):'not yet'}</b></span><span>V726A <b>${b?pct(b):'not yet'}</b></span><span>generations since origin: <b>${a?Math.round((yr-VAR[0].o)/25):0}</b></span>`;
    const p=phaseOf(WH_SEL,t);setSel(p);$('#whSelNote').innerHTML=noteHTML(WH_SEL[p]);
  }
  const stopS=playWire(rs,$('#whSelPlay'),drawSel,18000,'Replay','what');
  const setSel=stepWire($('#whSelSteps'),WH_SEL,rs,drawSel,stopS);
  drawSel(+rs.value);
  $('#whSelCards').innerHTML=`
   <div class="card"><h4>What supports it <span class="ev early">Early evidence</span></h4><p>Three frequent variants shared across several Mediterranean populations "strongly suggests a heterozygote advantage". [[Aksentijevich1999]] Park 2020 added the selection signal, the YopM mechanism and the mouse survival data. [[Park2020]]</p></div>
   <div class="card"><h4>Counterpoint</h4><p>An Israeli study found no perceptible health advantage for Ashkenazi carriers today. [[Kogan2001]] A benefit against plague would not necessarily show up in a modern population. Drift in isolated populations remains the competing explanation: the pooled meta-analysis found the strongest isolation and drift in Jewish populations, the candidate group for <i>MEFV</i> founder effects. [[Papadopoulos2008]]</p></div>
   <div class="card"><h4>An older idea: tuberculosis <span class="ev hyp">Hypothesis</span></h4><p>A 2003 letter asked whether carriers had lower tuberculosis mortality. It was never tested directly. [[Cattan2003]]</p></div>
   <div class="card"><h4>Carriers run slightly hot</h4><p>Healthy heterozygotes have higher basal and peak CRP and SAA than people without variants. [[Lachmann2006]] That fits a primed, but not disease-causing, innate immune system.</p></div>`;

  /* ---------- 3. attack at a glance ---------- */
  const body=$('#whBody');let site='perit';
  function drawBody(){const on=k=>k===site?1:0,H=(k,inner,o=1)=>`<g class="wh-hl" style="opacity:${on(k)*o}">${inner}</g>`;
    const T='fill:var(--terra);opacity:.6';let s='';
    /* silhouette */
    s+=`<g style="stroke:var(--panel-2);stroke-linecap:round;fill:none">
      <path d="M96 84 L70 196" style="stroke-width:17"/><path d="M164 84 L190 196" style="stroke-width:17"/>
      <path d="M112 214 L104 372" style="stroke-width:24"/><path d="M148 214 L156 372" style="stroke-width:24"/></g>`;
    s+=`<path d="M92 76 Q130 64 168 76 L164 150 Q160 190 162 222 L98 222 Q100 190 96 150 Z" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="122" y="58" width="16" height="16" style="fill:var(--panel-2)"/><circle cx="130" cy="40" r="22" style="fill:var(--panel-2)"/>`;
    s+=`<ellipse cx="96" cy="382" rx="15" ry="7" style="fill:var(--panel-2)"/><ellipse cx="164" cy="382" rx="15" ry="7" style="fill:var(--panel-2)"/>`;
    /* faint organs */
    s+=`<g style="fill:none;stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 3"><ellipse cx="113" cy="118" rx="14" ry="25"/><ellipse cx="148" cy="118" rx="14" ry="25"/><ellipse cx="130" cy="180" rx="28" ry="24"/></g>`;
    /* highlights */
    s+=H('fever',`<circle cx="130" cy="40" r="22" style="${T}"/><path d="M92 76 Q130 64 168 76 L164 150 Q160 190 162 222 L98 222 Q100 190 96 150 Z" style="fill:var(--terra);opacity:.25"/>
      <g transform="translate(196 22)"><rect x="-4" y="0" width="8" height="34" rx="4" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.5"/><circle cy="40" r="7" style="fill:var(--terra)"/><rect x="-2" y="12" width="4" height="26" style="fill:var(--terra)"/></g>
      <path d="M60 30q5 -6 0 -12M48 34q5 -6 0 -12" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-linecap:round"/>`);
    s+=H('perit',`<ellipse cx="130" cy="180" rx="30" ry="26" style="${T}"/>`);
    s+=H('pleur',`<ellipse cx="113" cy="118" rx="15" ry="26" style="${T}"/><text x="60" y="122" class="t-xs t-end" style="fill:var(--terra)">one side</text><path d="M62 119H96" style="stroke:var(--terra);stroke-width:1"/>`);
    s+=H('peric',`<path d="M138 120c-6-8-16-2-11 6l11 11 11-11c5-8-5-14-11-6z" style="fill:var(--terra)"/>`);
    s+=H('arth',`<circle cx="107" cy="292" r="12" style="${T}"/><circle cx="155" cy="362" r="8" style="fill:var(--terra);opacity:.3"/><circle cx="112" cy="216" r="9" style="fill:var(--terra);opacity:.3"/><text x="82" y="296" class="t-xs t-end" style="fill:var(--terra)">knee</text>`);
    s+=H('myal',`<ellipse cx="106" cy="322" rx="9" ry="20" style="${T}"/><ellipse cx="154" cy="322" rx="9" ry="20" style="${T}"/>`);
    s+=H('ele',`<ellipse cx="156" cy="352" rx="11" ry="16" style="fill:var(--congo);opacity:.65"/><text x="178" y="356" class="t-xs" style="fill:var(--terra)">shin, ankle</text>`);
    const S=WH_SITES.find(x=>x.id===site);
    body.innerHTML=s;
    $('#whSiteNote').innerHTML=`<h4>${S.n} <span class="big" style="font-size:22px">${f1(S.v)}%</span></h4><p>${S.txt}</p>`;
    $$('.wh-site',$('#whSites')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.site===site));
  }
  $('#whSites').innerHTML=WH_SITES.map(x=>`<button class="wh-site" data-site="${x.id}" aria-pressed="false"><span>${x.n}</span><span class="tr"><i data-w="${x.v}"></i></span><span class="v">${f1(x.v)}%</span></button>`).join('')+
    `<div class="pt"><b>In plain words</b>Almost every attack brings fever, and most bring belly pain. About half of patients have joint attacks at some point. Between attacks most people feel completely well. [[Tunca2005,GeneReviews]]</div>`;
  $('#whSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;drawBody()});
  drawBody();
  setTimeout(()=>$$('#whSites .tr i').forEach(i=>i.style.width=i.dataset.w+'%'),60);

  /* ---------- 4. key numbers ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">Onset</span><span class="big">80–90%</span><p>have their first symptoms before age 20 [[Tufan2020,Sohar1967]], and more than half begin in the first decade [[PRINTO2016]]. First attacks after 40 are rare and usually mild [[Tufan2020]].</p></div>
   <div class="card"><span class="kicker">Sex ratio</span><span class="big">1.2 : 1</span><p>male to female in the Turkish registry of 2,838 patients [[Tunca2005]]. Older Israeli data gave about 1.7, read as reduced penetrance in females [[Rogers1989]].</p></div>
   <div class="card"><span class="kicker">Diagnostic delay</span><span class="big">6.9 years</span><p>mean time from first symptoms to diagnosis in Turkey, shortening by about 2 years each decade since 1981 [[Tunca2005]]. Very early onset goes with M694V homozygosity, more severe disease and a longer delay [[Tanatar2021,GezginYildirim2022age]].</p></div>
   <div class="card"><span class="kicker">Prevalence</span><span class="big">1:500–1:1,000</span><p>in endemic countries [[Tufan2020]]. The highest field figure is 1 in 395 in Sivas, Central Anatolia [[Onen2004]].</p></div>
   <div class="card"><span class="kicker">Japan</span><span class="big">192 of 601</span><p>Japanese patients with unexplained fever were diagnosed with FMF in a 2009–2015 study, which called it "no longer a rare disease in Japan" [[Migita2016]]. A 2009 survey had estimated only 292 patients. Japanese FMF starts later, is milder, often involves E148Q/M694I, and colchicine worked in 91.8% [[Migita2012]].</p></div>
   <div class="card"><span class="kicker">Worldwide</span><span class="big">No verified total</span><p>No primary source gives a checked global count; figures like "over 100,000" circulate unverified. Turkey's e-health records alone list 160,897 people with FMF codes [[Satis2025]]. Turkey has the most patients, then Israel and Armenia [[Tufan2020]].</p></div>
   <div class="card"><span class="kicker">Three phenotypes</span><ul><li><b>Phenotype 1:</b> recurrent attacks of fever with serositis or synovitis.</li><li><b>Phenotype 2:</b> AA amyloidosis as the first sign, without prior attacks. At most 0.3% in the Turkish registry, under 2% across cohorts.</li><li><b>Phenotype 3:</b> two variants, no symptoms and no amyloidosis.</li></ul><p>[[SorianoManna2012,Tunca2005,Tufan2020]]</p></div>
   <div class="card"><span class="kicker">Between attacks</span><span class="big">Well, mostly</span><p>Patients usually feel completely well between attacks [[GeneReviews,PRINTO2016]]. Yet median SAA between attacks was 6 mg/L against 693 mg/L during them, and many patients never fully normalize: attacks are the "tip of the iceberg" [[Lachmann2006]].</p><div class="hook"><b>Exam hook</b>Before colchicine, more than half of FMF patients died of amyloidosis [[Tufan2020]]. See <a href="#amyloid" data-go="amyloid">AA amyloidosis</a>.</div></div>`;
};
