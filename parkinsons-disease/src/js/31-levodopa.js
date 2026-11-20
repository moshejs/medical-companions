/* =============== 3.1 levodopa: from the pill to the striatum =============== */
const LD_STEPS=[
 {from:0,at:.06,k:'Step 1 · The pill',t:'The pill',
  txt:`A carbidopa-levodopa tablet carries two drugs. Dopamine itself does not cross the blood-brain barrier. Levodopa, the step before dopamine, does, and is presumed to be turned into dopamine in the brain. Carbidopa is there to protect it on the way. [[LevodopaLabels2026]] Taken fasting, immediate-release levodopa peaks in the blood at about 1 hour. [[LevodopaLabels2026]]`,
  pt:`Levodopa is a building block the brain turns into dopamine. Carbidopa is a bodyguard that stops it being used up before it reaches the brain.`,
  hook:`Dopamine cannot cross the blood-brain barrier; levodopa can. That is why the medicine is the precursor, not dopamine itself.`},
 {from:.16,at:.24,k:'Step 2 · The gut',t:'Absorbed in the small intestine',
  txt:`The stomach has to empty first. Levodopa is absorbed only in the upper small intestine (duodenum and jejunum), and slow stomach emptying, recognised in Parkinson\'s, goes with a delayed time to "on". [[Jenner2026]] It crosses the gut wall on a saturable carrier shared with the large neutral amino acids from dietary protein. [[Contin2010]]`,
  pt:`The tablet has to leave the stomach and reach the start of the small intestine. Protein in food uses the same doorway, so a large protein meal can slow it down.`,
  hook:`Levodopa shares the large neutral amino acid carrier with dietary protein, in the gut and again at the blood-brain barrier. [[Contin2010,Nutt1984]]`},
 {from:.32,at:.39,k:'Step 3 · The blood',t:'Carbidopa protects it in the blood',
  txt:`Outside the brain, dopa decarboxylase (AADC) quickly turns levodopa into dopamine, which cannot enter the brain and causes nausea. Carbidopa blocks this enzyme and does not cross the blood-brain barrier, so the brain\'s own conversion is untouched. It cuts the levodopa needed by about 75%, and the enzyme is saturated at about 70 to 100 mg of carbidopa a day. [[LevodopaLabels2026]] With that route blocked, COMT takes over and makes 3-O-methyldopa (3-OMD), which lasts more than 10 hours and may compete for the brain carrier. [[Jenner2026]]`,
  pt:`In the blood, an enzyme would turn most of the levodopa into dopamine too early. Carbidopa blocks that enzyme but stays out of the brain, so more levodopa arrives where it is needed.`,
  hook:`Carbidopa (and benserazide) inhibit peripheral dopa decarboxylase and do not cross the blood-brain barrier: more levodopa reaches the brain and nausea falls.`},
 {from:.47,at:.54,k:'Step 4 · The barrier',t:'Across the blood-brain barrier',
  txt:`Only 5 to 10% of a dose taken with a decarboxylase inhibitor reaches the brain. [[Jenner2026]] It crosses on the carrier for large neutral amino acids. [[LevodopaLabels2026,Contin2010]] High-protein meals, or oral phenylalanine, leucine or isoleucine, reversed the benefit of intravenous levodopa without lowering its blood level: the competition happens at the barrier as well as in the gut. [[Nutt1984]]`,
  pt:`Of every hundred levodopa molecules swallowed, only a handful get into the brain, through the same kind of doorway used by protein building blocks.`,
  hook:`With carbidopa, 5–10% reaches the brain; without it, about 1%, a figure traced only to a secondary review. [[Jenner2026,Silva2021]]`},
 {from:.62,at:.7,k:'Step 5 · The terminal',t:'Turned into dopamine',
  txt:`Inside the brain, the same decarboxylase, which carbidopa cannot reach, turns levodopa into dopamine. [[LevodopaLabels2026]] The new dopamine is packed into vesicles (textbook physiology). In Parkinson\'s these terminals are already depleted: imaging puts putamen terminal loss at onset at 50 to 70% with dopamine transporter and VMAT2 tracers, and dorsal putamen markers are virtually gone 4 years after diagnosis. [[Cheng2010,Kordower2013]]`,
  pt:`The surviving nerve endings turn levodopa into dopamine and store it in tiny bubbles, ready to release.`,
  hook:`Fewer terminals means less room to store dopamine, an "inability to buffer" that was linked to wearing-off. [[Mouradian1987]] See Levodopa over time.`},
 {from:.79,at:.88,k:'Step 6 · The synapse',t:'Released and broken down',
  txt:`Released dopamine acts on D1 receptors of the direct pathway and D2 receptors of the indirect pathway in the striatum. [[Galvan2008]] It is then cleared: carried back into the terminal by the dopamine transporter (DAT) and broken down by monoamine oxidase B (MAO-B), a mitochondrial enzyme (textbook physiology). Rasagiline inhibits mitochondrial MAO-B with an IC50 of 4.43 nM, against 412 nM for MAO-A. [[Youdim2001]]`,
  pt:`The dopamine passes the message to the next cell, then is pulled back in and chopped up, so each signal is short.`,
  hook:`MAO-B inhibitors slow dopamine breakdown in the brain; COMT inhibitors slow levodopa breakdown in the blood.`}
];
const LD_TOG={
 nocd:{t:'Without carbidopa',
  d:`Half-life about 50 minutes instead of about 1.5 hours. [[LevodopaLabels2026]] Most of the dose becomes dopamine outside the brain, and nausea and vomiting are more frequent than with carbidopa-levodopa. [[LevodopaLabels2026]] A 2021 review states that only 1% reaches the brain; the primary measurement was not traced, so treat it as approximate. [[Silva2021]]`},
 meal:{t:'High-protein meal',
  d:`In 9 people with fluctuations, meals cut the peak level by 29% and delayed absorption by 34 minutes. [[Nutt1984]] Protein also competes at the blood-brain barrier, so fewer dots get through in time; the size of that effect is drawn schematically, as no figure was found. A high-fat meal in a label study cut the peak by about 25% and delayed it about 30 minutes. [[LevodopaLabels2026]]`},
 comt:{t:'COMT inhibitor added',
  d:`With entacapone 200 mg, levodopa exposure (AUC) rose about 35% and the half-life went from 1.3 to 2.4 hours; the peak and its timing (about 1 hour) were generally unchanged. Entacapone has no antiparkinsonian effect of its own. Opicapone 50 mg once daily kept more than 65% COMT inhibition over 24 hours. [[EnzymeInhibitorLabels2026]] Fewer dots become 3-OMD and more stay as levodopa for longer.`},
 maob:{t:'MAO-B inhibitor added',
  d:`MAO-B inhibitors act in the brain, not the blood: here, dopamine taken back up is stored again instead of broken down. As an add-on to levodopa (LARGO, 687 people), rasagiline 1 mg cut daily off-time by 1.18 hours against 0.4 on placebo. [[Rascol2005]] See <a href="#drugs" data-go="drugs">The other medicines</a>.`}
};
const LD_BEN=[
 {k:'ELLDOPA · 361 people',t:'Clinical decline was not faster on levodopa',
  txt:`People with early Parkinson\'s took carbidopa-levodopa 37.5/150, 75/300 or 150/600 mg a day, or placebo, for 40 weeks, then stopped for 2 weeks. At week 42 the UPDRS had worsened by 7.8 points on placebo against 1.9, 1.9 and −1.4 on the three doses (p<0.001). Dopamine-transporter imaging (β-CIT) fell more on levodopa (−6%, −4%, −7.2%) than on placebo (−1.4%; p=0.036). The highest dose had more dyskinesia, hypertonia, infection, headache and nausea. [[Fahn2004]]`,
  pt:`Even after two weeks off the drug, people who had taken levodopa were doing better than those on placebo. A scan measure pointed the other way, which kept the question open.`,
  hook:`ELLDOPA: clinical scores favoured levodopa after washout; the β-CIT imaging marker declined more on levodopa. [[Fahn2004]]`},
 {k:'LEAP · 445 people',t:'Starting early neither slowed nor sped the disease',
  txt:`A delayed-start trial: levodopa/carbidopa 100/25 mg three times a day for 80 weeks (early start), against placebo for 40 weeks followed by the same drug (delayed start). At week 80 the UPDRS had changed by −1.0 against −2.0 points: a difference of 1.0 (95% CI −1.5 to 3.5; p=0.44), so no disease-modifying effect. Dyskinesia and fluctuation rates did not differ. [[Verschuur2019]]`,
  pt:`Whether people started levodopa early or 40 weeks later, they ended up in the same place. Levodopa treats symptoms; it does not change the course, for better or worse.`,
  hook:`Delayed start: if the early group stays ahead once both are on the drug, the drug may modify the disease. In LEAP the two groups ended level.`},
 {k:'US label · carbidopa',t:'How much carbidopa is enough',
  txt:`Peripheral dopa decarboxylase is saturated by carbidopa at about 70 to 100 mg a day, and people taking less are more likely to have nausea and vomiting. Carbidopa cuts the levodopa needed for a given response by about 75%. One 25/100 tablet three times a day gives 75 mg. Experience above 200 mg of carbidopa a day is limited. For Rytary, 140 to 200 mg a day matches the exposure from 70 to 100 mg of other products. [[LevodopaLabels2026]]`,
  pt:`There is a minimum amount of the bodyguard drug that does the job. Below it, sickness is more likely.`,
  hook:`Nausea on levodopa: the label points to carbidopa of at least 70–100 mg a day. [[LevodopaLabels2026]]`}
];
/* plasma curve of one dose: Tmax 1 h; half-life 1.5 h with carbidopa, about 50 min without (Sinemet label);
   a COMT inhibitor lengthens the fall after the peak to a 2.4 h half-life (entacapone label) */
const LD_PK=(()=>{const ka=ke=>{let lo=ke*1.001,hi=60;for(let k=0;k<80;k++){const m=(lo+hi)/2;if(Math.log(m/ke)/(m-ke)>1)lo=m;else hi=m}return(lo+hi)/2};
  const mk=ke=>{const a=ka(ke),A=1/(Math.exp(-ke)-Math.exp(-a));return h=>h<=0?0:A*(Math.exp(-ke*h)-Math.exp(-a*h))};
  return{cd:mk(Math.LN2/1.5),no:mk(Math.LN2/(50/60)),k2:Math.LN2/2.4}})();
function ldConc(h,o){const sh=o.meal?34/60:0,u=h-sh;if(u<=0)return 0;const f=o.nocd?LD_PK.no:LD_PK.cd;
  const v=(o.comt&&!o.nocd&&u>1)?Math.exp(-LD_PK.k2*(u-1)):f(u);
  return v*(o.nocd?.55:1)*(o.meal?.71:1)}
/* layouts: wide 720x400 and a tall phone layout 400x680 */
const LD_L={
 w:{gut:[10,10,432,138],pill:[42,74],st:[124,80,46,38],int:[176,420,86,26],GX:[232,284,336,388],gY:99,
    ves:[150,148,708,230],aP:[282,190],cP:[410,194],da:[158,226,198,222],om:[452,690,160,196],bbb:[436,708],BX:[530,598,666],bY:230,
    term:[454,690,252,326],aC:[490,298],VX:[546,588,630],vY:300,mao:[662,276],dat:[676,326],cl:[326,344],RX:[492,542,592,642],post:[454,690,344,394],
    ch:[44,404,278,372],chT:262,nz:[152,244],key:[444,14,708,138],bl:[702,244,'t-sm']},
 n:{gut:[8,8,392,128],pill:[30,64],st:[96,70,38,32],int:[140,388,74,24],GX:[188,238,288,338],gY:86,
    ves:[8,140,392,232],aP:[112,186],cP:[214,192],da:[18,92,196,224],om:[240,384,150,180],bbb:[120,392],BX:[180,256,332],bY:232,
    term:[30,370,256,342],aC:[76,304],VX:[160,214,268],vY:316,mao:[330,288],dat:[352,342],cl:[342,362],RX:[80,156,232,308],post:[30,370,362,452],
    ch:[44,384,530,630],chT:516,nz:[18,248],key:[8,468,392,506],bl:[388,248,'t-xs']}
};
inits.levodopa=()=>{
  /* ---------- 1. the journey ---------- */
  const svg=$('#ldSvg'),rg=$('#ldT');const on={nocd:false,meal:false,comt:false,maob:false};
  const R=rng(3101),PT=Array.from({length:100},()=>({a:R(),b:R(),c:R(),d:R(),e:R(),f:R(),g:R()}));
  const ORD=PT.map((p,i)=>[p.g,i]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const AA=Array.from({length:24},()=>({a:R(),b:R(),c:R(),d:R()})),CD=Array.from({length:6},()=>({a:R(),b:R()}));
  /* fates: each dot is 1% of the dose. Brain share is cited; the split of the rest is schematic */
  function fates(){const F=new Array(100).fill('clr'),brain=on.nocd?[48]:[6,20,34,48,62,76,90];brain.forEach(i=>F[i]='brain');
    const nA=on.nocd?(on.comt?80:75):0,nC=on.nocd?(on.comt?5:15):(on.comt?20:60);let a=0,c=0;
    ORD.forEach(i=>{if(F[i]==='brain')return;if(a<nA){F[i]='aadc';a++}else if(c<nC){F[i]='comt';c++}});
    const stuck=new Set(on.meal&&!on.nocd?[20,48,76]:[]);return{F,brain,stuck}}
  const E=(u,a,b)=>ease(ramp(u,a,b));
  const mix=(P,Q,p)=>[lerp(P[0],Q[0],p),lerp(P[1],Q[1],p)];
  function pos(i,u,L,FT){
    const m=PT[i],f=FT.F[i],meal=on.meal,dM=meal?.05:0;
    const a1=.07+m.a*.03,a2=.15+m.b*.04+dM,a3=a2+.05,a4=a3+.035+(meal?.035*m.c:0);
    const pill=[L.pill[0]+(m.a-.5)*22,L.pill[1]+(m.b-.5)*8];
    const st=[L.st[0]+(m.a-.5)*1.3*L.st[2]+Math.sin(u*18+i)*3,L.st[1]+(m.b-.5)*1.25*L.st[3]+Math.cos(u*15+i)*3];
    const I=L.int,lum=[I[0]+16+m.c*(I[1]-I[0]-32),I[2]+(m.d-.5)*I[3]*.8];
    const k=i%4,gate=[L.GX[k]+(m.e-.5)*6,L.gY],bin=[L.GX[k]+(m.e-.5)*22,L.ves[1]+12+m.e*14];
    let p,kind='ld',o=1;
    if(u<a1)p=pill;
    else if(u<a1+.04)p=mix(pill,st,E(u,a1,a1+.04));
    else if(u<a2)p=st;
    else if(u<a3)p=mix(st,lum,E(u,a2,a3));
    else if(u<a4)p=u<a4-.018?mix(lum,gate,E(u,a3,a4-.018)):mix(gate,bin,E(u,a4-.018,a4));
    else{
      const drift=(u2)=>[bin[0]+(u2-a4)*90*(.4+m.f),bin[1]+Math.sin(u2*20+i)*4];
      if(f==='aadc'){const f0=.31+m.f*.07,P=L.aP,D=[L.da[0]+m.a*(L.da[1]-L.da[0]),L.da[2]+m.b*(L.da[3]-L.da[2])];
        if(u<f0)p=drift(u);else if(u<f0+.03)p=mix(drift(f0),[P[0]+(m.a-.5)*10,P[1]-4],E(u,f0,f0+.03));
        else{p=mix([P[0],P[1]],D,E(u,f0+.03,f0+.09));p=[p[0]+Math.sin(u*14+i)*2,p[1]+Math.cos(u*12+i)*2];kind='da'}}
      else if(f==='comt'){const f0=.34+m.f*.1,P=L.cP,D=[L.om[0]+m.a*(L.om[1]-L.om[0]),L.om[2]+m.b*(L.om[3]-L.om[2])];
        if(u<f0)p=drift(u);else if(u<f0+.03)p=mix(drift(f0),[P[0]+(m.a-.5)*10,P[1]-4],E(u,f0,f0+.03));
        else{p=mix([P[0],P[1]],D,E(u,f0+.03,f0+.12));p=[p[0]+Math.sin(u*9+i)*2,p[1]];kind='omd'}}
      else if(f==='clr'){const end=on.comt?.86+m.f*.12:.56+m.f*.26;p=drift(Math.min(u,a4+.35));p[0]=Math.min(p[0],L.ves[2]-8);o=1-ramp(u,end,end+.08);if(o<=0)return null}
      else{/* brain */const bi=FT.brain.indexOf(i),j=bi%3,b0=.43+bi*.012+(meal?.05:0),b1=b0+.05,
          gq=[L.BX[j]+(bi-3)*1.5,L.bY-12],gin=[L.BX[j],L.bY+12],ac=[L.aC[0]+(bi-3)*3,L.aC[1]+((bi%2)?4:-4)];
        const vk=bi%3,vc=[L.VX[vk]+((bi%2)?3:-3),L.vY+((bi>3)?3:-3)];
        if(u<b0)p=mix(drift(Math.min(u,b0-.02)),gq,E(u,a4,b0));
        else if(FT.stuck.has(i)){p=[gq[0]+Math.sin(u*30+i)*3,gq[1]-Math.abs(Math.sin(u*22+i))*5]}
        else if(u<b1)p=mix(gq,gin,E(u,b0,b1));
        else if(u<.66)p=mix(gin,ac,E(u,b1,.66));
        else if(u<.7){p=ac;kind=u>.68?'da':'ld'}
        else{kind='da';const fuse=E(u,.8,.835),vy=lerp(L.vY,L.cl[0]-8,fuse);
          if(u<.76)p=mix(ac,vc,E(u,.7,.76));
          else if(u<.835)p=[vc[0],lerp(vc[1],vy,fuse)];
          else{const r=[L.RX[bi%4]+((bi%2)?5:-5),L.cl[1]-5],rel=[vc[0],L.cl[0]+8];
            if(u<.845)p=mix([vc[0],vy],rel,E(u,.835,.845));
            else if(u<.86)p=mix(rel,r,E(u,.845,.86));
            else if(u<.9)p=r;
            else{const d0=[L.dat[0],L.cl[0]+4],d1=[L.dat[0]-10,L.cl[0]-14],mo=[L.mao[0]+(bi-3)*2,L.mao[1]];
              if(u<.925)p=mix(r,d0,E(u,.9,.925));else if(u<.94)p=mix(d0,d1,E(u,.925,.94));
              else if(on.maob)p=mix(d1,vc,E(u,.94,.98));
              else{p=mix(d1,mo,E(u,.94,.965));if(u>.965){kind='met';o=1-ramp(u,.975,1)}}}}}}
    }
    return{x:p[0],y:p[1],kind,o}
  }
  const glyph=(g,x,y,o=1)=>{const O=`opacity:${f1(o)}`;
    if(g==='ld')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="3.2" style="fill:var(--sky);${O}"/>`;
    if(g==='da')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="3.3" style="fill:var(--amber);${O}"/>`;
    if(g==='omd')return `<path d="M${f1(x)} ${f1(y-3.4)}L${f1(x+3.2)} ${f1(y+2.4)}H${f1(x-3.2)}Z" style="fill:var(--muted);${O}"/>`;
    if(g==='met')return `<rect x="${f1(x-2)}" y="${f1(y-2)}" width="4" height="4" style="fill:var(--muted);${O}"/>`;
    if(g==='aa')return `<rect x="${f1(x-2.6)}" y="${f1(y-2.6)}" width="5.2" height="5.2" rx="1" style="fill:var(--sage);${O}"/>`;
    if(g==='cd')return `<rect x="${f1(x-3)}" y="${f1(y-3)}" width="6" height="6" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.3;${O}"/>`;
    return `<rect x="${f1(x-3.6)}" y="${f1(y-3.6)}" width="7.2" height="7.2" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:var(--sky);stroke:var(--panel);stroke-width:1;${O}"/>`};
  const enz=(x,y,lab,col,blk,lp)=>{let g=`<path d="M${f1(x)} ${f1(y)} L${f1(x-7)} ${f1(y-9)} A11 11 0 1 0 ${f1(x+7)} ${f1(y-9)} Z" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`;
    if(blk)g+=glyph('inh',x,y-5.5);
    return g+`<text x="${f1(x+(lp?lp[0]:0))}" y="${f1(y+(lp?lp[1]:20))}" class="t-xs t-mid" style="fill:${col};font-weight:700">${lab}</text>`};
  function draw(t){
    const N=vb(svg,'720 400','400 680'),L=N?LD_L.n:LD_L.w,FT=fates();
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* gut */
    const G=L.gut;s+=`<rect x="${G[0]}" y="${G[1]}" width="${G[2]-G[0]}" height="${G[3]-G[1]}" rx="12" style="fill:var(--cell);stroke:var(--line)"/>`;
    const S=L.st,emp=on.meal?bump(t,.1,.26)*.3:0;
    s+=`<ellipse cx="${S[0]}" cy="${S[1]}" rx="${S[2]}" ry="${S[3]}" style="fill:var(--panel);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${S[0]}" y="${S[1]-S[3]-8}" class="t-xs t-mid" style="font-weight:700">STOMACH</text>`;
    const I=L.int;s+=`<path d="M${S[0]+S[2]-6} ${I[2]-I[3]/2+4} L${I[0]} ${I[2]-I[3]/2} H${I[1]} V${I[2]+I[3]/2} H${I[0]} L${S[0]+S[2]-6} ${I[2]+I[3]/2-4}" style="fill:var(--panel);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${I[0]+4}" y="${I[2]-I[3]/2-7}" class="t-xs" style="font-weight:700">UPPER SMALL INTESTINE · duodenum, jejunum</text>`;
    if(on.meal&&t>.08&&t<.3)s+=`<text x="${S[0]}" y="${S[1]+S[3]+(N?14:16)}" class="t-xs t-mid" style="fill:var(--warn);opacity:${f1(ramp(t,.08,.11)*(1-ramp(t,.27,.3)))}">slower emptying</text>`;
    else s+=`<text x="${S[0]}" y="${S[1]+S[3]+(N?14:16)}" class="t-xs t-mid">gastric emptying →</text>`;
    L.GX.forEach(x=>{s+=`<rect x="${x-7}" y="${L.gY-5}" width="5" height="10" rx="2" style="fill:var(--sage)"/><rect x="${x+2}" y="${L.gY-5}" width="5" height="10" rx="2" style="fill:var(--sage)"/>`});
    s+=`<text x="${L.GX[0]-10}" y="${L.gY+18}" class="t-xs" style="fill:var(--sage)">${N?'amino-acid carriers':'carriers shared with amino acids'}</text>`;
    s+=`<rect x="${L.pill[0]-15}" y="${L.pill[1]-7}" width="30" height="14" rx="7" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.4;opacity:${f1(1-ramp(t,.07,.11))}"/>`;
    s+=`<text x="${L.pill[0]}" y="${L.pill[1]+(N?24:22)}" class="t-xs t-mid">carbidopa-</text><text x="${L.pill[0]}" y="${L.pill[1]+(N?36:34)}" class="t-xs t-mid">levodopa</text>`;
    /* blood */
    const V=L.ves;s+=`<rect x="${V[0]}" y="${V[1]}" width="${V[2]-V[0]}" height="${V[3]-V[1]}" rx="10" style="fill:var(--vessel);opacity:.13"/><path d="M${V[0]} ${V[1]} H${V[2]}" style="stroke:var(--vessel);stroke-width:2;opacity:.6"/>`;
    s+=`<path d="M${V[0]} ${V[3]} H${L.bbb[0]}" style="stroke:var(--vessel);stroke-width:2;opacity:.6"/>`;
    s+=`<text x="${V[0]+8}" y="${V[1]+14}" class="t-xs" style="fill:var(--vessel);font-weight:700">BLOOD</text>`;
    /* blood-brain barrier: endothelial cells with tight junctions */
    for(let x=L.bbb[0];x<L.bbb[1]-4;x+=34){const w=Math.min(32,L.bbb[1]-x);
      s+=`<rect x="${x}" y="${V[3]-5}" width="${f1(w)}" height="10" rx="4" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.2"/>`}
    L.BX.forEach(x=>{s+=`<rect x="${x-9}" y="${V[3]-6}" width="18" height="12" style="fill:var(--field)"/><rect x="${x-8}" y="${V[3]-6}" width="5" height="12" rx="2" style="fill:var(--sage)"/><rect x="${x+3}" y="${V[3]-6}" width="5" height="12" rx="2" style="fill:var(--sage)"/>`});
    s+=`<text x="${L.bl[0]}" y="${L.bl[1]}" class="${L.bl[2]} t-end" style="font-weight:700">BLOOD-BRAIN BARRIER</text>`;
    /* peripheral enzymes */
    s+=enz(L.aP[0],L.aP[1],N?'AADC':'dopa decarboxylase (AADC)','var(--amber)',!on.nocd&&t>.3,N?[0,-24]:[30,20]);
    s+=enz(L.cP[0],L.cP[1],'COMT','var(--ink)',on.comt&&t>.28,N?[0,-24]:[0,20]);
    /* brain */
    const T=L.term;s+=`<rect x="${T[0]-14}" y="${T[2]-12}" width="${T[1]-T[0]+28}" height="${L.post[3]-T[2]+12}" rx="10" style="fill:var(--panel-2);opacity:.6"/>`;
    s+=`<path d="M${T[0]} ${T[2]} H${T[1]} V${T[3]-18} Q${T[1]} ${T[3]} ${T[1]-18} ${T[3]} H${T[0]+18} Q${T[0]} ${T[3]} ${T[0]} ${T[3]-18} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${T[0]+10}" y="${T[2]+16}" class="t-xs" style="font-weight:700">DOPAMINE TERMINAL · striatum</text>`;
    const P=L.post;s+=`<path d="M${P[0]} ${P[2]} H${P[1]} V${P[3]} H${P[0]} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${P[0]+10}" y="${P[3]-10}" class="t-xs" style="font-weight:700">STRIATAL NEURON</text>`;
    s+=enz(L.aC[0],L.aC[1],'AADC','var(--amber)',false,[0,18]);
    /* MAO-B on a mitochondrion */
    const M=L.mao;s+=`<ellipse cx="${M[0]}" cy="${M[1]}" rx="16" ry="9" style="fill:var(--panel);stroke:var(--violet);stroke-width:1.6"/><path d="M${M[0]-10} ${M[1]} q3 -6 6 0 t6 0 t6 0" style="fill:none;stroke:var(--violet);stroke-width:1"/>`;
    if(on.maob)s+=glyph('inh',M[0]+12,M[1]-8);
    s+=`<text x="${M[0]}" y="${M[1]+21}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">MAO-B</text>`;
    /* DAT on the terminal membrane */
    const D=L.dat;s+=`<rect x="${D[0]-8}" y="${D[1]-7}" width="5" height="12" rx="2" style="fill:var(--sage)"/><rect x="${D[0]+3}" y="${D[1]-7}" width="5" height="12" rx="2" style="fill:var(--sage)"/><text x="${D[0]-12}" y="${D[1]-10}" class="t-xs t-end" style="fill:var(--sage)">DAT</text>`;
    /* particles */
    const parts=[];const lit=[0,0,0,0];let nb=0,na=0,nc=0,nr=0,vesFull=[0,0,0];
    for(let i=0;i<100;i++){const q=pos(i,t,L,FT),f=FT.F[i];
      if(f==='brain'){const bi=FT.brain.indexOf(i);if(!FT.stuck.has(i)&&t>.43+bi*.012+(on.meal?.05:0)+.05)nb++;if(q&&!FT.stuck.has(i)&&t>.86&&t<.9)lit[bi%4]=1;if(t>.74&&t<.835&&!FT.stuck.has(i))vesFull[bi%3]=1}
      else if(f==='aadc'&&t>.34+PT[i].f*.07)na++;else if(f==='comt'&&t>.37+PT[i].f*.1)nc++;else if(f==='clr'&&t>.62)nr++;
      if(q)parts.push(glyph(q.kind,q.x,q.y,q.o))}
    /* vesicles */
    const fuse=E(t,.8,.835);L.VX.forEach((x,k)=>{const y=lerp(L.vY,L.cl[0]-8,fuse);const full=vesFull[k]||(on.maob&&t>.97);if(fuse<1||on.maob&&t>.97)s+=vesicle(x,on.maob&&t>.97?L.vY:y,8.5,on.maob&&t>.97?1:1-fuse*.9,full?1:0)});
    /* receptors */
    L.RX.forEach((x,k)=>{const c=lit[k]?'var(--amber)':'var(--cell-line)',fl=lit[k]?'var(--amber-soft)':'var(--panel)';
      s+=`<rect x="${x-8}" y="${L.cl[1]-3}" width="16" height="15" rx="4" style="fill:${fl};stroke:${c};stroke-width:1.5"/><text x="${x}" y="${L.cl[1]+24}" class="t-xs t-mid" style="font-weight:700">${k%2?'D2':'D1'}</text>`});
    /* carbidopa: binds the peripheral enzyme, cannot cross the barrier */
    if(!on.nocd)CD.forEach((c,k)=>{const a=.08+k*.004;let p;
      if(t<a)p=[L.pill[0]+(c.a-.5)*18,L.pill[1]+(c.b-.5)*6];
      else if(t<.15)p=mix([L.pill[0],L.pill[1]],[S[0]+(c.a-.5)*S[2],S[1]+(c.b-.5)*S[3]],E(t,a,a+.04));
      else if(t<.28)p=mix([S[0],S[1]],[L.GX[k%4],V[1]+18],E(t,.15,.28));
      else{const tgt=k<3?[L.aP[0]+(k-1)*9,L.aP[1]-16]:[L.BX[k%3]+8,V[3]-14];p=mix([L.GX[k%4],V[1]+18],tgt,E(t,.28,k<3?.33:.47))}
      if(!(k<3&&t>.33))parts.push(glyph('cd',p[0],p[1]))});
    if(!on.nocd&&t>.47&&t<.66)s+=`<text x="${L.BX[2]+(N?-16:-24)}" y="${V[3]-22}" class="t-xs t-end" style="fill:var(--sky);opacity:${f1(ramp(t,.47,.5)*(1-ramp(t,.63,.66)))}">carbidopa stays out</text>`;
    /* dietary amino acids crowd both carriers */
    if(on.meal)AA.forEach((q,k)=>{if(t<.09)return;let p;const gx=L.GX[k%4],bx=L.BX[k%3];
      if(t<.2)p=[S[0]+(q.a-.5)*1.4*S[2],S[1]+(q.b-.5)*1.3*S[3]];
      else if(t<.32)p=mix([S[0]+(q.a-.5)*S[2],S[1]],[gx+(q.c-.5)*14,L.gY-6-q.d*6],E(t,.2,.3));
      else if(t<.42)p=mix([gx,L.gY],[gx+(q.c-.5)*40,V[1]+20+q.d*30],E(t,.32,.42));
      else p=mix([gx,V[1]+30],[bx+(q.c-.5)*22,V[3]-10-q.d*10],E(t,.42,.52));
      parts.push(glyph('aa',p[0]+Math.sin(t*25+k)*1.5,p[1]))});
    s+=parts.join('');
    /* outside-brain labels */
    if(na>0)s+=`<text x="${L.nz[0]}" y="${L.nz[1]}" class="t-xs" style="fill:var(--amber);font-weight:700">${N?'dopamine outside the brain: nausea':'dopamine made here cannot enter the brain: nausea'}</text>`;
    if(nc>0)s+=`<text x="${L.om[1]}" y="${L.om[2]-2}" class="t-xs t-end" style="fill:var(--muted)">3-OMD · lasts over 10 h</text>`;
    /* key */
    const K=L.key,kx=[K[0]+10,K[0]+136],ky=[K[1]+38,K[1]+62,K[1]+86];
    const items=[['ld','levodopa'],['da','dopamine'],['cd','carbidopa'],['omd','3-OMD'],['aa','amino acid'],['inh','inhibitor']];
    if(!N){s+=`<rect x="${K[0]}" y="${K[1]}" width="${K[2]-K[0]}" height="${K[3]-K[1]}" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${K[0]+10}" y="${K[1]+18}" class="t-xs" style="font-weight:700">KEY · each dot is 1% of one dose</text>`;
      items.forEach(([g,l],k)=>{const x=kx[k%2],y=ky[Math.floor(k/2)];s+=glyph(g,x+4,y-3)+`<text x="${x+14}" y="${y}" class="t-xs">${l}</text>`});
      const sh=Object.keys(on).filter(k=>on[k]).map(k=>LD_TOG[k].t.toLowerCase());s+=`<text x="${K[0]+10}" y="${K[3]-12}" class="t-xs" style="fill:var(--sky)">${sh.length?'+ '+sh.join(', ').slice(0,52):'carbidopa-levodopa, fasting'}</text>`}
    else{s+=`<text x="${K[0]+4}" y="${K[1]-2}" class="t-xs" style="font-weight:700">KEY · each dot is 1% of one dose</text>`;
      items.forEach(([g,l],k)=>{const x=k<3?[K[0]+4,K[0]+136,K[0]+262][k]:[K[0]+4,K[0]+136,K[0]+262][k-3],y=k<3?K[1]+14:K[1]+32;s+=glyph(g,x+4,y-3)+`<text x="${x+14}" y="${y}" class="t-xs">${l}</text>`})}
    /* plasma chart */
    const C=L.ch,cw=C[1]-C[0],chh=C[3]-C[2],hx=h=>C[0]+h/6*cw,vy=v=>C[3]-v/1.5*chh;
    s+=`<text x="${C[0]-4}" y="${L.chT}" class="t-sm">${N?'PLASMA LEVODOPA, HOURS AFTER A DOSE':'PLASMA LEVODOPA, HOURS AFTER ONE DOSE · schematic'}</text>`;
    s+=`<path d="M${C[0]} ${C[2]} V${C[3]} H${C[1]}" class="axis"/>`;
    [0,1,2,3,4,5,6].forEach(h=>{s+=`<path d="M${f1(hx(h))} ${C[3]} v4" class="axis"/><text x="${f1(hx(h))}" y="${C[3]+14}" class="t-xs t-mid">${h}</text>`});
    const base={nocd:false,meal:false,comt:false},cur={nocd:on.nocd,meal:on.meal,comt:on.comt},diff=on.nocd||on.meal||on.comt;
    const path=o=>{let d='';for(let k=0;k<=120;k++){const h=k/20;d+=(k?'L':'M')+f1(hx(h))+' '+f1(vy(ldConc(h,o)))}return d};
    s+=`<path d="${path(base)}" style="fill:none;stroke:${diff?'var(--muted)':'var(--sky)'};stroke-width:${diff?1.6:2.6};${diff?'stroke-dasharray:4 4':''}"/>`;
    if(diff)s+=`<path d="${path(cur)}" style="fill:none;stroke:var(--sky);stroke-width:2.6"/>`;
    const hn=Math.min(6,t*2.4);s+=`<path d="M${f1(hx(hn))} ${C[2]} V${C[3]}" style="stroke:var(--ink);opacity:.25"/><circle cx="${f1(hx(hn))}" cy="${f1(vy(ldConc(hn,cur)))}" r="4.2" style="fill:var(--sky);stroke:var(--panel);stroke-width:1.5"/>`;
    s+=`<text x="${f1(hx(1)+6)}" y="${f1(vy(1)-4)}" class="t-xs">peak about 1 h</text>`;
    const ann=[diff?'dashed: carbidopa-levodopa, fasting':'',on.nocd?'without carbidopa: half-life about 50 min':'half-life about 1.5 h with carbidopa',on.comt?(on.nocd?'COMT inhibitor: label data are with carbidopa':'COMT inhibitor: half-life 1.3 → 2.4 h, AUC +35%'):'',on.meal?'meal: peak −29%, 34 min later':''];
    ann.filter(Boolean).forEach((a,k)=>{s+=`<text x="${C[1]}" y="${C[2]+4+k*11}" class="t-xs t-end" style="fill:${a.startsWith('dashed')||a.startsWith('half')?'var(--muted)':'var(--sky)'}">${a}</text>`});
    svg.innerHTML=s;
    /* note, readout, caption */
    const p=phaseOf(LD_STEPS,t);setSt(p);
    const act=Object.keys(on).filter(k=>on[k]);
    let NP=LD_STEPS[p];
    if(p===2&&on.nocd)NP={...NP,t:'No carbidopa: used up in the blood',pt:'Without the bodyguard, most of the levodopa turns into dopamine in the blood. That dopamine cannot get into the brain and makes people feel sick.'};
    if(p===5&&on.maob)NP={...NP,t:'Released, then saved from breakdown',pt:'With MAO-B blocked, the dopamine that is pulled back in is stored again instead of chopped up, so it can be used again.'};
    $('#ldNote').innerHTML=noteHTML(NP)+(act.length?`<div class="kv">${act.map(k=>`<div><dt>${LD_TOG[k].t}</dt><dd>${LD_TOG[k].d}</dd></div>`).join('')}</div>`:'');
    const shown=FT.brain.length,wait=FT.stuck.size;
    $('#ldRead').innerHTML=`<span>each dot <b>1% of the dose</b></span><span>reached the brain <b>${nb}${t>.6&&wait?' (+'+wait+' held back)':''}</b></span><span>dopamine outside the brain <b>${na}</b></span><span>3-OMD <b>${nc}</b></span><span>other tissues, cleared <b>${nr}</b></span>`;
    $('#ldCap').textContent=`Showing: ${act.length?act.map(k=>LD_TOG[k].t.toLowerCase()).join(', '):'carbidopa-levodopa, fasting'}. Schematic, not to scale. The share reaching the brain follows the cited figures (${on.nocd?'about 1% without carbidopa, from a secondary source':'5–10% with carbidopa; '+shown+' dots drawn'}); how the rest splits between pathways${on.meal?', and how many dots the meal holds back,':''} is illustrative. The chart shape comes from the label half-lives and peak time; its height is not to scale.`;
    rg.setAttribute('aria-valuetext',`Step ${p+1} of ${LD_STEPS.length}: ${LD_STEPS[p].t}. Reached the brain: ${nb} of 100.`);
  }
  const stop=playWire(rg,$('#ldPlay'),draw,18000,'Replay','levodopa');
  const setSt=stepWire($('#ldSteps'),LD_STEPS,rg,draw,stop);
  $$('[data-ld]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ld;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}));

  /* ---------- 2. ELLDOPA, LEAP and the carbidopa dose ---------- */
  const bs=$('#ldBen'),br=$('#ldBenT');let view=0;
  function bar(s,x0,x1,y,v,lo,hi,p,col,h=12){const X=q=>lerp(x0,x1,(q-lo)/(hi-lo)),z=X(0),e=X(v*p);
    return s+`<rect x="${f1(Math.min(z,e))}" y="${y}" width="${f1(Math.max(1.5,Math.abs(e-z)))}" height="${h}" rx="3" style="fill:${col}"/>`}
  function axis(x0,x1,y,lo,hi,ticks,unit){const X=q=>lerp(x0,x1,(q-lo)/(hi-lo));let g=`<path d="M${x0} ${y} H${x1}" class="axis"/>`;
    ticks.forEach(v=>{g+=`<path d="M${f1(X(v))} ${y} v4" class="axis"/><text x="${f1(X(v))}" y="${y+15}" class="t-xs t-mid">${v}${unit||''}</text>`});return g}
  function drawBen(t){
    const N=vb(bs,'720 400','400 '+[620,520,560][view]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const x0=N?20:250,x1=N?380:640;
    if(view===0){
      const rows=[['Placebo',7.8,'var(--muted)'],['150 mg/day',1.9,'var(--sky)'],['300 mg/day',1.9,'var(--sky)'],['600 mg/day',-1.4,'var(--sky)']];
      const lo=-2,hi=8,X=q=>lerp(x0,x1,(q-lo)/(hi-lo));
      s+=`<text x="20" y="24" class="t-sm">${N?'ELLDOPA · UPDRS CHANGE TO WEEK 42':'ELLDOPA · UPDRS CHANGE FROM BASELINE TO WEEK 42 (AFTER 2 WEEKS OFF DRUG)'}</text><text x="20" y="${N?40:40}" class="t-xs">higher = worse; levodopa doses per day</text>`;
      const rh=N?48:34,y0=N?62:58;
      rows.forEach((r,i)=>{const p=ease(ramp(t,i*.08,i*.08+.22)),y=y0+i*rh+(N?16:0);
        if(N)s+=`<text x="20" y="${y-6}" class="t-lbl">${r[0]}</text>`;else s+=`<text x="${x0-12}" y="${y+10}" class="t-lbl t-end">${r[0]}</text>`;
        s=bar(s,x0,x1,y,r[1],lo,hi,p,r[2]);if(p>.7)s+=`<text x="${f1(Math.max(X(r[1]),X(0))+6)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${r[1]>0?'+':''}${r[1]}</text>`});
      const ya=y0+4*rh+(N?12:2);s+=axis(x0,x1,ya,lo,hi,[-2,0,2,4,6,8]);s+=`<path d="M${f1(X(0))} ${y0-6} V${ya}" style="stroke:var(--ink);stroke-width:1.2"/>`;
      /* imaging */
      const lo2=-8,hi2=0,y1=ya+(N?56:48),X2=q=>lerp(x0,x1,(q-lo2)/(hi2-lo2));
      if(t>.42){s+=`<g style="opacity:${f1(ramp(t,.42,.5))}"><text x="20" y="${y1-12}" class="t-sm">${N?'β-CIT IMAGING, % CHANGE':'DOPAMINE-TRANSPORTER IMAGING (β-CIT), % CHANGE · p=0.036'}</text>`;
        const im=[['Placebo',-1.4,'var(--muted)'],['150',-6,'var(--rose)'],['300',-4,'var(--rose)'],['600',-7.2,'var(--rose)']],rh2=N?30:22;
        im.forEach((r,i)=>{const p=ease(ramp(t,.5+i*.07,.62+i*.07)),y=y1+i*rh2+(N?10:0);
          s+=N?`<text x="20" y="${y-3}" class="t-xs">${r[0]}${i?' mg/day':''}</text>`:`<text x="${x0-12}" y="${y+9}" class="t-xs t-end">${r[0]}${i?' mg/day':''}</text>`;
          s=bar(s,x0,x1,y,r[1],lo2,hi2,p,r[2],10);if(p>.7)s+=`<text x="${f1(X2(r[1])-6)}" y="${y+9}" class="t-xs t-end" style="fill:var(--ink)">${r[1]}%</text>`});
        const yb=y1+4*rh2+(N?8:2);s+=axis(x0,x1,yb,lo2,hi2,[-8,-6,-4,-2,0],'%')+'</g>'}
    }else if(view===1){
      s+=`<text x="20" y="24" class="t-sm">${N?'LEAP · UPDRS CHANGE AT WEEK 80':'LEAP · UPDRS CHANGE FROM BASELINE AT WEEK 80 (lower = better)'}</text>`;
      const lo=-4,hi=2,X=q=>lerp(x0,x1,(q-lo)/(hi-lo)),rh=N?54:40,y0=N?66:56;
      [['Early start (80 weeks)',-1,'var(--sky)'],['Delayed start (40 weeks placebo)',-2,'var(--muted)']].forEach((r,i)=>{const p=ease(ramp(t,i*.12,i*.12+.25)),y=y0+i*rh;
        if(N)s+=`<text x="20" y="${y-6}" class="t-lbl">${r[0]}</text>`;else s+=`<text x="${x0-12}" y="${y+10}" class="t-lbl t-end">${r[0]}</text>`;
        s=bar(s,x0,x1,y,r[1],lo,hi,p,r[2]);if(p>.7)s+=`<text x="${f1(X(r[1])-6)}" y="${y+10}" class="t-xs t-end" style="fill:var(--ink)">${r[1].toFixed(1)}</text>`});
      const ya=y0+2*rh;s+=axis(x0,x1,ya,lo,hi,[-4,-3,-2,-1,0,1,2]);s+=`<path d="M${f1(X(0))} ${y0-6} V${ya}" style="stroke:var(--ink);stroke-width:1.2"/>`;
      const y2=ya+(N?92:80),lo2=-4,hi2=4,X2=q=>lerp(x0,x1,(q-lo2)/(hi2-lo2)),p=ease(ramp(t,.4,.75));
      if(t>.36){s+=`<g style="opacity:${f1(ramp(t,.36,.44))}"><text x="20" y="${y2-44}" class="t-sm">DIFFERENCE, EARLY MINUS DELAYED · 95% CI</text>`;
        s+=`<path d="M${f1(X2(0))} ${y2-24} V${y2+6}" style="stroke:var(--muted);stroke-dasharray:3 3;stroke-width:1.4"/><text x="${f1(X2(0))}" y="${y2-28}" class="t-xs t-mid">no difference</text>`;
        s+=`<path d="M${f1(X2(lerp(1,-1.5,p)))} ${y2-8} H${f1(X2(lerp(1,3.5,p)))}" style="stroke:var(--sky);stroke-width:2.6"/><circle cx="${f1(X2(1))}" cy="${y2-8}" r="6" style="fill:var(--sky)"/>`;
        s+=axis(x0,x1,y2+8,lo2,hi2,[-4,-2,0,2,4]);
        s+=`<text x="${x0}" y="${y2+40}" class="t-xs">← early start better</text><text x="${x1}" y="${y2+40}" class="t-xs t-end">delayed start better →</text>`;
        if(p>.9)s+=`<text x="${f1(X2(1))}" y="${y2-18}" class="t-xs t-mid" style="fill:var(--sky);font-weight:700">1.0 (−1.5 to 3.5), p=0.44</text>`;
        s+='</g>'}
    }else{
      s+=`<text x="20" y="24" class="t-sm">${N?'CARBIDOPA, MG A DAY (US LABEL)':'CARBIDOPA, MG A DAY, AS NAMED IN THE US LABEL'}</text>`;
      const lo=0,hi=220,xa=N?20:50,xb=x1,Xc=q=>lerp(xa,xb,q/hi),y=N?96:86,p=ease(ramp(t,0,.3));
      s+=`<rect x="${f1(Xc(70))}" y="${y-30}" width="${f1(Xc(100)-Xc(70))}" height="48" rx="4" style="fill:var(--good-soft);opacity:${f1(p)}"/>`;
      s+=`<text x="${f1(Xc(85))}" y="${y-36}" class="t-xs t-mid" style="fill:var(--good);font-weight:700;opacity:${f1(p)}">70–100: enzyme saturated</text>`;
      s+=`<rect x="${xa}" y="${y-30}" width="${f1(Xc(70)-xa)}" height="48" rx="4" style="fill:var(--warn-soft);opacity:${f1(p*.8)}"/><text x="${xa+6}" y="${y-16}" class="t-xs" style="fill:var(--warn);opacity:${f1(p)}">${N?'less: more nausea':'less: more nausea and vomiting'}</text>`;
      s+=`<rect x="${f1(Xc(200))}" y="${y-30}" width="${f1(xb-Xc(200))}" height="48" rx="4" style="fill:var(--panel-2);opacity:${f1(p)}"/>`;
      s+=axis(xa,xb,y+20,lo,hi,N?[0,50,100,150,200]:[0,25,50,75,100,125,150,175,200]);
      const mk=(v,l1,l2,k)=>{const q=ease(ramp(t,.2+k*.15,.4+k*.15));if(q<=0)return'';const x=Xc(v);return `<g style="opacity:${f1(q)}"><path d="M${f1(x)} ${y-24} V${y+16}" style="stroke:var(--sky);stroke-width:2.4"/><circle cx="${f1(x)}" cy="${y-24}" r="4" style="fill:var(--sky)"/><text x="${f1(x+(k?-6:6))}" y="${y+48+k*28}" class="t-xs ${k?'t-end':''}" style="fill:var(--ink);font-weight:700">${l1}</text><text x="${f1(x+(k?-6:6))}" y="${y+60+k*28}" class="t-xs ${k?'t-end':''}">${l2}</text><path d="M${f1(x)} ${y+24} V${y+38+k*28}" style="stroke:var(--sky);stroke-dasharray:2 3"/></g>`};
      s+=mk(75,'75 mg: label start','one 25/100 tablet three times a day',0);
      s+=mk(200,'200 mg: eight tablets',N?'more is little studied':'experience above this is limited',1);
      /* levodopa needed */
      const y2=y+(N?160:150),q=ease(ramp(t,.55,.85)),bw=xb-xa;
      if(t>.5){s+=`<g style="opacity:${f1(ramp(t,.5,.58))}"><text x="20" y="${y2-14}" class="t-sm">LEVODOPA NEEDED FOR THE SAME RESPONSE</text>`;
        s+=`<text x="${xa}" y="${y2+12}" class="t-xs">without carbidopa</text><rect x="${xa}" y="${y2+18}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--muted);opacity:.5"/>`;
        s+=`<text x="${xa}" y="${y2+52}" class="t-xs">with carbidopa: about 75% less</text><rect x="${xa}" y="${y2+58}" width="${f1(lerp(bw,bw*.25,q))}" height="14" rx="4" style="fill:var(--sky)"/></g>`}
      if(t>.8)s+=`<text x="20" y="${y2+(N?108:100)}" class="t-xs" style="opacity:${f1(ramp(t,.8,.9))}">${N?'Rytary: 140–200 mg = 70–100 mg of others':'Rytary: 140–200 mg a day gives the same exposure as 70–100 mg from other products.'}</text>`;
    }
    bs.innerHTML=s;
    $('#ldBenNote').innerHTML=noteHTML(LD_BEN[view]);
    $('#ldBenCap').textContent=['Mean change in total UPDRS by arm; β-CIT is percent change in dopamine-transporter uptake. Bars start at zero.','Mean change at week 80; the line is the 95% confidence interval of the difference.','Carbidopa amounts and ranges as stated in the Sinemet and Rytary labels.'][view];
    br.setAttribute('aria-valuetext',['ELLDOPA','LEAP','Carbidopa dose'][view]+', '+Math.round(t*100)+'% revealed');
  }
  const stopBen=playWire(br,$('#ldBenPlay'),drawBen,8000,'Replay','levodopa');
  $$('[data-ldb]').forEach(b=>b.addEventListener('click',()=>{view=+b.dataset.ldb;$$('[data-ldb]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopBen();br.value=0;drawBen(0);$('#ldBenPlay').click()}));
  draw(+rg.value);drawBen(+br.value);
};
