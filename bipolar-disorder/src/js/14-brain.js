/* =============== 1.4 Brain, sleep & the body clock =============== */
/* 24 illustrative days: [bedtime, waking] in clock hours */
const BR_SLEEP=[[23,7],[23,7],[23,7],[23,7],[23.5,7],[23,7],[0,7],[1,7],[1.5,7],[2,7],[2.5,6.5],[3,6.5],[3,6],[3.5,6],[4,6],[4.5,6],[5,6],[4,6],[0.5,7],[0,7],[23.5,7],[23,7],[23,7],[23,7]];
const BR_D=BR_SLEEP.length;
const BR_EV={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
const BR_STEPS=[
 {from:0,at:2.5/24,k:'Days 1–6 · steady rhythm',t:'A regular rhythm',
  txt:`The brain's master clock, the suprachiasmatic nucleus, keeps a roughly 24-hour rhythm, and clocks also run in mood-related regions such as the ventral tegmentum and hippocampus. Daily anchors (waking, meals, work, other people) help set it: the social zeitgeber theory. Even between episodes sleep is often disturbed: 70% of euthymic people in one study had a clinically significant sleep problem, and a meta-analysis of 21 studies found longer time to fall asleep and more night-to-night variability. [[McCarthy2012,Ehlers1988,Harvey2005Sleep,Ng2015Sleep]]`,
  pt:`Going to bed, waking and eating at about the same times each day helps keep the body clock steady.`,
  hook:`Social zeitgebers (Ehlers, Frank and Kupfer, 1988): the theory behind interpersonal and social rhythm therapy. [[Ehlers1988,Frank2005IPSRT]]`},
 {from:6/24,at:8.5/24,k:'Days 7–10 · routine slips',t:'Late nights, lost anchors',
  txt:`${BR_EV.early} In 39 people with bipolar disorder, life events that disrupted social routines were more common in the 8 weeks before a manic onset than in a control period, but not before depression. In 414 students followed for about 33 months, less regular daily rhythms predicted a shorter time to the next episode in people with cyclothymia or bipolar II. Evening chronotype and a delayed melatonin and cortisol rhythm are more common in bipolar disorder. [[MalkoffSchwartz1998,Shen2008,Melo2017]]`,
  pt:`Late nights, shift work, travel across time zones or a big change in routine can knock the body clock off balance. [[Lewis2017Sleep]]`,
  hook:`Routine-disrupting events preceded manic, not depressive, onsets (Malkoff-Schwartz 1998). [[MalkoffSchwartz1998]]`},
 {from:10/24,at:12/24,k:'Days 11–14 · sleep shrinks',t:'Less sleep, but not tired',
  txt:`Decreased need for sleep is one of the DSM-5-TR criterion symptoms of a manic or hypomanic episode. In daily ratings from 59 outpatients, sleep changes went with the next day's mood change in 41% of people, and a change of more than 3 hours from the usual pattern may signal a large mood change. Across 17 studies, sleep disturbance was the most robust early warning sign of mania (median 77%); manic prodromes lasted on average more than 20 days (range 1–120). ${BR_EV.est} for prediction. [[APA2022,Bauer2006Sleep,Jackson2003,Plante2008]]`,
  pt:`Needing much less sleep without feeling tired is one of the clearest early signs that a high may be starting.`,
  hook:`Sleep disturbance is the most common early sign of mania (median 77% of prodromes). [[Jackson2003]]`},
 {from:14/24,at:16/24,k:'Days 15–18 · the loop',t:'Early mania feeds itself',
  txt:`${BR_EV.hyp} Wehr and colleagues proposed that sleep reduction is a "final common pathway" to mania: many triggers act by causing sleep loss, and because mania itself causes insomnia, the process can become self-reinforcing. Experiments support it: after one night awake, 7 of 9 rapid-cycling patients in a depressive phase were rated manic or hypomanic. Sleep loss as a trigger of high mood was reported more often in bipolar I (OR 2.81). The chart's bands are drawing conventions: DSM-5-TR separates hypomania from mania by duration and impairment, not by height. [[Wehr1987,Wehr1982,Lewis2017Sleep]]`,
  pt:`Losing sleep can push mood up, and a high mood makes sleep even harder, so the two feed each other. This is the moment to contact the care team.`,
  hook:`Wehr 1987: sleep loss as a "final common pathway" to mania. One night awake switched 7 of 9 rapid-cycling depressed patients. [[Wehr1987,Wehr1982]]`},
 {from:18/24,at:21.5/24,k:'Days 19–24 · recovery',t:'Back to a regular rhythm',
  txt:`With treatment, steady routines help. In a trial of 175 adults with bipolar I, interpersonal and social rhythm therapy in the acute phase lengthened time without a new episode over 2 years (P = .01); routines became more regular, and people whose regularity rose more were less likely to relapse. ${BR_EV.early} In 23 people in hospital with mania, orange blue-blocking glasses worn from 6 p.m. to 8 a.m. for 7 days, added to usual treatment, lowered mania scores by 14.1 points against 1.7 with clear glasses. Lithium also acts on the body clock: see <a href="#lithium" data-go="lithium">Lithium: how it works</a>. [[Frank2005IPSRT,Henriksen2016,Moreira2016]]`,
  pt:`Treatment, steady sleep and daily routines work together, and many people with bipolar disorder stay well for long periods. [[Frank2005IPSRT,Jackson2003]]`,
  hook:`IPSRT: making social rhythms more regular lengthened time to recurrence (Frank 2005). [[Frank2005IPSRT]]`}
];
const BR_MOOD=[[0,0],[5/24,.02],[7/24,.07],[9/24,.18],[11/24,.36],[13/24,.5],[15/24,.7],[17/24,.8],[19/24,.55],[21/24,.22],[23/24,.06],[1,.03]];
const BR_CHAIN=[['Routine disrupted','routine'],['Sleep lost','sleep'],['Mood rises','mood'],['Less need for sleep','need']];
/* brain outline from the kit, reused here for the cortex overlay */
const BR_OUT='M-72 6C-80 -20 -62 -48 -30 -54C-8 -60 20 -58 42 -48C66 -38 80 -16 76 6C74 22 62 30 48 30C40 40 24 42 14 36C2 44 -20 44 -32 36C-50 38 -68 28 -72 6Z';
const BR_L={
 cortex:{k:'ENIGMA · cortical thickness',t:'A slightly thinner cortex',hl:{pfc:.55},thin:1,
  marks:[[-50,6,2,'left pars opercularis · d −0.29'],[-56,-24,0,'left rostral middle frontal · d −0.28'],[22,30,3,'left fusiform · d −0.29']],
  bars:[['L pars opercularis',-.293],['L fusiform',-.288],['L rostral middle frontal',-.276]],
  txt:`${BR_EV.est} In 1,837 adults with bipolar disorder and 2,582 controls, cortical grey matter was thinner in frontal, temporal and parietal regions of both hemispheres. The largest effects were in the left pars opercularis (d −0.293), left fusiform gyrus (−0.288) and left rostral middle frontal cortex (−0.276). Longer illness went with thinner cortex and a history of psychosis with smaller surface area; mood state at scanning did not matter. [[Hibar2018]]`,
  pt:`On average, the brain's outer layer is a little thinner in some areas. The difference is small and varies a lot between people.`,
  hook:`ENIGMA cortex: largest effect in the left pars opercularis, d −0.29. [[Hibar2018]]`},
 sub:{k:'ENIGMA · deep structures',t:'Smaller hippocampus and thalamus',hl:{hippo:.9},thal:1,vent:1,
  marks:[[14,22,3,'hippocampus · d −0.23'],[2,6,1,'thalamus · d −0.15'],[-12,-12,0,'lateral ventricles · larger']],
  bars:[['Hippocampus',-.232],['Hippocampus (2022)',-.2],['Thalamus',-.148]],
  txt:`${BR_EV.est} In 1,710 people with bipolar disorder and 2,594 controls, the hippocampus (d −0.232) and thalamus (d −0.148) were smaller and the lateral ventricles larger. Bipolar I, but not bipolar II, differed from controls. A hippocampal-subfield mega-analysis of 1,472 people found a smaller whole hippocampus (d −0.20) and smaller volumes in 9 of 12 subfields. [[Hibar2016,Haukvik2022]]`,
  pt:`Some deeper structures, used for memory and for relaying signals, are on average slightly smaller.`,
  hook:`ENIGMA subcortical: smaller hippocampus and thalamus, larger lateral ventricles. [[Hibar2016]]`},
 wm:{k:'ENIGMA · white matter',t:'Less organised wiring',hl:{},cc:1,
  marks:[[0,-26,1,'corpus callosum'],[-26,-34,0,'cingulum']],grid:[29,43],
  txt:`${BR_EV.est} In the largest diffusion imaging dataset (1,482 people with bipolar disorder and 1,551 controls from 26 cohorts), fractional anisotropy, a measure of white-matter integrity, was lower in 29 of 43 regions, most of all in the corpus callosum and cingulum. Lithium use, later onset and shorter illness went with higher values. A 98-study meta-analysis also found more deep white-matter hyperintensities (OR 2.49). [[Favre2019,Kempton2008]]`,
  pt:`The wiring that links brain areas looks slightly less organised on average, most of all in the bridge between the two halves of the brain.`,
  hook:`ENIGMA white matter: lower FA in 29 of 43 regions, largest in the corpus callosum and cingulum. [[Favre2019]]`},
 fmri:{k:'fMRI · emotion and reward',t:'Brakes weaker, accelerators stronger',hl:{pfc:.15,amyg:1,stri:.85},ctrl:1,
  marks:[[-50,-16,0,'ventrolateral PFC · under-active'],[-6,24,2,'amygdala · over-active'],[-12,4,1,'reward circuit · over-active']],
  txt:`${BR_EV.est} A meta-analysis of 65 fMRI studies (1,040 people with bipolar disorder) found under-activation of the inferior frontal gyrus and ventrolateral prefrontal cortex, linked particularly to mania, and over-activation of limbic areas including the amygdala and hippocampus. The leading circuit model adds an over-active left-sided ventral striatal reward circuit, to explain emotional lability, emotional dysregulation and heightened reward sensitivity. ${BR_EV.hyp} A consensus model proposes that disrupted development of prefrontal–limbic connections weakens top-down control of the amygdala. [[Chen2011fMRI,Phillips2014,Strakowski2012]]`,
  pt:`The "brake" areas at the front of the brain are less active, while emotion and reward areas are more active.`,
  hook:`fMRI: under-active vlPFC / inferior frontal gyrus plus over-active amygdala; over-active reward circuit. [[Chen2011fMRI,Phillips2014]]`},
 li:{k:'Lithium · association',t:'Measures closer to typical',hl:{hippo:.55,amyg:.35},thal:1,
  marks:[[0,-54,0,'paracentral · d +0.21'],[30,-46,1,'superior parietal · d +0.20'],[14,22,3,'hippocampus · like controls']],
  bars:[['L paracentral',.211],['L superior parietal',.202],['R superior parietal',.188]],
  txt:`${BR_EV.early} People taking lithium (n = 700) had thicker cortex than those not taking it (n = 892), most in the left paracentral gyrus (d 0.211) and the superior parietal gyri (0.202 left, 0.188 right); antipsychotics showed the opposite relationship. Lithium users also had larger thalamic volumes, hippocampal subfields like those of controls, and higher white-matter integrity. These are cross-sectional associations and may partly reflect who is prescribed lithium; no randomised imaging trial establishes neuroprotection. [[Hibar2018,Hibar2016,Haukvik2022,Favre2019]]`,
  pt:`People taking lithium tend to have brain measures closer to people without bipolar disorder. That may mean lithium protects brain cells, but it is not proven. [[Hajek2014]]`,
  hook:`Lithium is associated with thicker cortex, a larger hippocampus and higher white-matter integrity (association, not proof). [[Hibar2018,Hallahan2011,Favre2019]]`}
};
const BR_K={
 data:{k:'Danish registers',t:'Recurrence rises with episode count',
  txt:`${BR_EV.est} for the association. In a Danish register of 20,350 first-admission patients (1971–1993), the rate of recurrence rose with the number of previous episodes, in both unipolar and bipolar disorder. A later register study (1,106 people with mania or bipolar disorder) found the same, and relapse rates had not fallen despite newer treatments. A 2017 review linked more episodes with higher recurrence risk, longer and more severe episodes and higher dementia risk, while noting how varied the course is. [[Kessing1998Recurrence,Kessing2004Course,Kessing2017Progression]]`,
  pt:`On average, people who have had more episodes are more likely to have another. Why is the open question.`,
  hook:`Danish registers: recurrence rate rises with the number of prior episodes (an association). [[Kessing1998Recurrence]]`},
 kindle:{k:'Reading 1',t:'Kindling and neuroprogression',
  txt:`${BR_EV.hyp} Post (1992) proposed that stressors and episodes leave lasting traces in gene expression, so later episodes need less stress to start and may eventually occur on their own, with possible progression to rapid cycling and treatment resistance; the model argues for early intervention. Allostatic-load and neuroprogression models add cumulative wear and tear from inflammation, oxidative stress, loss of neurotrophins and stress hormones. [[Post1992,Kapczinski2008,Berk2011]]`,
  pt:`The idea: each episode may make the next one easier to set off. It is one reason early, steady treatment is emphasised.`,
  hook:`Kindling (Post 1992): episodes and stressors sensitise the brain, so later episodes need smaller triggers. [[Post1992]]`},
 sev:{k:'Reading 2',t:'Severity from the start',
  txt:`${BR_EV.hyp} An association is not proof. People whose illness is more severe from the start will both have more episodes and a higher recurrence risk, so a pooled curve rises even if no one's own risk changes. A review of life stress found that the methodologically strongest studies are inconsistent with kindling in bipolar disorder. Status: contested. [[Kessing2017Progression,Bender2011]]`,
  pt:`The rise could come from mixing people with milder and more severe illness, not from episodes changing the brain.`,
  hook:`The best life-stress studies do not support kindling; the question is open. [[Bender2011]]`}
};

inits.brain=()=>{
  /* ================= sleep, clock and mood ================= */
  const svg=$('#brSvg'),rg=$('#brT');
  const mood=moodSeries(BR_MOOD);
  const R=rng(1404),ANCH=BR_SLEEP.map((_,d)=>{const reg=[7.5,9,13,18.5,20.5];if(d<6||d>=19)return reg.map(h=>h+(R()-.5)*.4);
    return reg.filter(()=>R()>.3).map(h=>(h+(R()-.3)*5+24)%24)});
  const fmtH=h=>{h=((h%24)+24)%24;const H=Math.floor(h),M=Math.round((h-H)*60);return String(H).padStart(2,'0')+':'+String(M===60?0:M).padStart(2,'0')};
  const dur=([b,w])=>((w-b)%24+24)%24;
  function chip(x,y,kind,anchor){const L={est:['Established','var(--good)','var(--good-soft)'],early:['Early evidence','var(--warn)','var(--warn-soft)'],hyp:['Hypothesis','var(--rx)','var(--rx-soft)']}[kind];
    const w=L[0].length*5.6+10,x0=anchor==='end'?x-w:anchor==='mid'?x-w/2:x;
    return `<rect x="${f1(x0)}" y="${f1(y-9)}" width="${f1(w)}" height="13" rx="3" style="fill:${L[2]}"/><text x="${f1(x0+5)}" y="${f1(y+1)}" style="font:600 8.5px var(--mono);fill:${L[1]};letter-spacing:.04em">${L[0].toUpperCase()}</text>`}
  function chain(N,ph,lp){
    /* which parts are lit at each step */
    const litN=[[],[0],[0,1,2],[0,1,2,3],[]][ph],litA=[[],[0],[0,1],[0,1,2,3],[]][ph];
    const P=N?[[16,592],[208,592],[208,670],[16,670]]:[[14,394],[194,394],[374,394],[554,394]],w=N?176:150,h=30;
    let s='';
    BR_CHAIN.forEach(([l],k)=>{const on=litN.includes(k),[x,y]=P[k];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${on?'var(--up-soft)':'var(--panel-2)'};stroke:${on?'var(--up-fill)':'var(--line)'};stroke-width:${on?1.8:1}"/><text x="${x+w/2}" y="${y+19}" class="t-lbl t-mid" style="font-size:12px;fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`});
    const arr=(x1,y1,x2,y2,on,kind,cx,cy,anc)=>`<path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:${on?'var(--up-fill)':'var(--line)'};stroke-width:2;fill:none" marker-end="url(#${on?'brA1':'brA0'})"/>`+chip(cx,cy,kind,anc);
    if(N){s+=arr(194,607,206,607,litA.includes(0),'early',200,584,'mid');
      s+=arr(296,624,296,668,litA.includes(1),'early',304,650,'');
      s+=arr(206,685,194,685,litA.includes(2),'est',200,716,'mid');
      s+=`<path d="M104 668C110 644 170 640 206 616" style="stroke:${litA.includes(3)?'var(--up-fill)':'var(--line)'};stroke-width:2;fill:none;stroke-dasharray:5 4" marker-end="url(#${litA.includes(3)?'brA1':'brA0'})"/>`+chip(98,648,'hyp','end');}
    else{s+=arr(166,409,192,409,litA.includes(0),'early',179,388,'mid');
      s+=arr(346,409,372,409,litA.includes(1),'early',359,388,'mid');
      s+=arr(526,409,552,409,litA.includes(2),'est',539,388,'mid');
      s+=`<path d="M629 426C600 452 300 452 271 428" style="stroke:${litA.includes(3)?'var(--up-fill)':'var(--line)'};stroke-width:2;fill:none;stroke-dasharray:5 4" marker-end="url(#${litA.includes(3)?'brA1':'brA0'})"/>`+chip(450,447,'hyp','mid')}
    if(ph===4){const op=f1(ramp(lp,0,.6)),x0=N?10:8,x1=N?392:712,y0=N?582:386,y1=N?726:450;
      s+=`<g style="opacity:${op}"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" rx="10" style="fill:var(--eu-soft);opacity:.85;stroke:var(--eu);stroke-width:1.4"/><text x="${(x0+x1)/2}" y="${(y0+y1)/2-2}" class="t-lbl t-mid" style="fill:var(--eu)">Regular rhythm + treatment break the loop</text><text x="${(x0+x1)/2}" y="${(y0+y1)/2+14}" class="t-xs t-mid">steady sleep and wake times, daily anchors, care team</text></g>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 460','400 734');
    const D=Math.min(BR_D-.001,t*BR_D),di=Math.floor(D),hr=(D-di)*24,sl=BR_SLEEP[di],ph=phaseOf(BR_STEPS,t),S=BR_STEPS[ph],lp=ramp(t,S.from,S.from+.06);
    let s=`<defs>${marker('brA1','var(--up-fill)')}${marker('brA0','var(--line)')}</defs>`;
    /* clock */
    const C=N?{cx:88,cy:104,r:72}:{cx:112,cy:128,r:84};
    const ck=clock24(C.cx,C.cy,C.r,{sleep:sl,h:hr});s+=ck.svg;
    (ANCH[di]||[]).forEach(h=>{const p=ck.P(h,C.r+7);s+=`<path d="M${f1(p[0])} ${f1(p[1]-4)}l4 4l-4 4l-4 -4z" style="fill:var(--accent)"/>`});
    const awake=!(((hr-sl[0])%24+24)%24<dur(sl));
    const info=[`Day ${di+1} of ${BR_D}`,`asleep ${fmtH(sl[0])}–${fmtH(sl[1])}`,`${dur(sl)} h of sleep`,awake?'awake now':'asleep now'];
    if(N){s+=`<text x="182" y="52" class="t-big">${info[0]}</text><text x="182" y="74" class="t-sm">${info[1]}</text><text x="182" y="92" class="t-lbl" style="fill:${dur(sl)<5?'var(--up)':'var(--ink)'}">${info[2]}</text><text x="182" y="110" class="t-xs">${info[3]} · ${fmtH(hr)}</text>`;
      s+=`<path d="M186 130l4 4l-4 4l-4 -4z" style="fill:var(--accent)"/><text x="196" y="138" class="t-xs">daily anchors</text><text x="196" y="151" class="t-xs">(meals, work, people)</text>`}
    else{s+=`<text x="${C.cx}" y="${C.cy+C.r+28}" class="t-big t-mid">${info[0]}</text><text x="${C.cx}" y="${C.cy+C.r+46}" class="t-sm t-mid">${info[1]}</text><text x="${C.cx}" y="${C.cy+C.r+64}" class="t-lbl t-mid" style="fill:${dur(sl)<5?'var(--up)':'var(--ink)'}">${info[2]}</text>`;
      s+=`<path d="M${C.cx-78} 16l4 4l-4 4l-4 -4z" style="fill:var(--accent)"/><text x="${C.cx-70}" y="24" class="t-xs">daily anchors: meals, work, people</text>`}
    /* actogram: one row per day, noon to noon */
    const A=N?{x0:58,x1:352,y0:226,rh:6.4,lab:216}:{x0:270,x1:668,y0:40,rh:6.6,lab:30};
    s+=`<text x="${A.x0}" y="${A.lab-12}" class="t-sm" style="fill:var(--night)">${N?'SLEEP EACH NIGHT':'SLEEP EACH NIGHT (NOON TO NOON)'}</text>`;
    [[12,'noon'],[18,'18'],[0,'0:00'],[6,'06'],[12.001,'noon']].forEach(([h,l],k)=>{const x=A.x0+(A.x1-A.x0)*k/4;s+=`<text x="${f1(x)}" y="${A.lab}" class="t-xs t-mid">${l}</text>`});
    for(let d=0;d<=di;d++){const y=A.y0+d*A.rh;s+=sleepbar(A.x0,y,A.x1-A.x0,A.rh-1.6,{sleep:BR_SLEEP[d]}).svg;
      if(d===di)s+=`<rect x="${A.x0-3}" y="${f1(y-1.5)}" width="${A.x1-A.x0+6}" height="${f1(A.rh+1.4)}" rx="3" style="fill:none;stroke:var(--ink);stroke-width:1"/><text x="${A.x1+6}" y="${f1(y+A.rh-1.5)}" class="t-xs" style="fill:var(--ink)">${dur(BR_SLEEP[d])} h</text>`;
      if(d%6===0)s+=`<text x="${A.x0-6}" y="${f1(y+A.rh-1.5)}" class="t-xs t-end">day ${d+1}</text>`}
    /* mood chart */
    const M=N?{x:20,y:410,w:356,h:132,ax:552}:{x:270,y:222,w:398,h:124,ax:352};
    s+=`<text x="${M.x}" y="${M.y-8}" class="t-sm" style="fill:var(--up)">MOOD</text>`;
    const lc=lifechart(M.x,M.y,M.w,M.h,mood,{upto:t,labels:true,dot:true,id:'brlc'});s+=lc.svg;
    [1,7,13,19,24].forEach(d=>{const x=M.x+M.w*(d-1)/(BR_D-1);s+=`<text x="${f1(x)}" y="${M.ax+2}" class="t-xs t-mid">${d}</text>`});
    s+=`<text x="${M.x+M.w}" y="${M.ax+15}" class="t-xs t-end">day</text>`;
    s+=chain(N,ph,lp);
    svg.innerHTML=s;setA(ph);$('#brNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#brPlay'),draw,16000,'Replay','brain');
  const setA=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= brain regions + dopamine synapse ================= */
  const bs=$('#brBr'),br=$('#brBrT');let layer='cortex';
  function drawB(t){
    const N=vb(bs,'720 420','400 830'),L=BR_L[layer],m=lerp(-.9,.9,t);
    const B=N?{cx:200,cy:196,s:2}:{cx:205,cy:190,s:2.05};const P=(a,b)=>[B.cx+a*B.s,B.cy+b*B.s];
    let s=`<text x="${N?16:20}" y="20" class="t-sm" style="fill:var(--brand)">${L.k.toUpperCase()}</text><text x="${N?386:396}" y="${N?38:20}" class="t-xs t-end">← front · side view · back →</text>`;
    const br0=brain(B.cx,B.cy,B.s,{hl:L.hl});s+=br0.svg;
    if(L.thin)s+=`<path d="${BR_OUT}" transform="translate(${B.cx} ${B.cy}) scale(${B.s})" style="fill:none;stroke:var(--down-fill);stroke-width:${f1(5/B.s)};stroke-dasharray:${f1(6/B.s)} ${f1(4/B.s)};opacity:.7"/>`;
    if(L.thal){const [x,y]=P(2,6);s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(9*B.s)}" ry="${f1(6*B.s)}" style="fill:var(--hippo);opacity:.35;stroke:var(--hippo);stroke-width:1.2"/>`}
    if(L.vent){const [x,y]=P(-12,-12);s+=`<path d="M${f1(x-16*B.s)} ${f1(y+2*B.s)}Q${f1(x)} ${f1(y-12*B.s)} ${f1(x+18*B.s)} ${f1(y+4*B.s)}Q${f1(x)} ${f1(y-4*B.s)} ${f1(x-16*B.s)} ${f1(y+2*B.s)}Z" style="fill:var(--down-fill);opacity:.55"/>`}
    if(L.cc){const a=P(-40,-16),c=P(0,-36),b=P(40,-14),a2=P(-36,-28),c2=P(0,-46),b2=P(34,-28);
      s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--down-fill);stroke-width:9;stroke-linecap:round;opacity:.55"/><path d="M${f1(a2[0])} ${f1(a2[1])}Q${f1(c2[0])} ${f1(c2[1])} ${f1(b2[0])} ${f1(b2[1])}" style="fill:none;stroke:var(--down-fill);stroke-width:2.5;stroke-dasharray:5 3;opacity:.8"/>`}
    if(L.ctrl){const a=P(-46,-8),b=P(-10,18);s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(a[0]+10)} ${f1(b[1]-4)} ${f1(b[0]-8)} ${f1(b[1])}" style="fill:none;stroke:var(--pfc);stroke-width:2;stroke-dasharray:4 4" marker-end="url(#brA2)"/>`}
    const SL=N?[[14,56,''],[386,56,' t-end'],[14,340,''],[386,340,' t-end']]:[[20,50,''],[396,50,' t-end'],[20,330,''],[396,334,' t-end']];
    (L.marks||[]).forEach(([bx,by,sl,txt])=>{const [x,y]=P(bx,by),[tx,ty,anc]=SL[sl],ex=anc===''?tx+24:tx-24;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:var(--ink)"/><line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(ex)}" y2="${f1(ty+(ty>y?-11:4))}" style="stroke:var(--muted);stroke-width:.8"/><text x="${tx}" y="${ty}" class="t-xs${anc}" style="fill:var(--ink)">${txt}</text>`});
    /* effect sizes or the 29-of-43 grid */
    const E=N?{x:16,y:356,w:368}:{x:20,y:350,w:372};
    if(L.bars){const lx=E.x+150,sc=(E.w-150-44)/.3;
      L.bars.forEach(([l,d],k)=>{const y=E.y+k*17,w=Math.abs(d)*sc;s+=`<text x="${f1(lx-6)}" y="${y+9}" class="t-xs t-end">${l}</text><rect x="${f1(lx)}" y="${y}" width="${f1(w)}" height="11" rx="2" style="fill:${d<0?'var(--down-fill)':'var(--good)'};opacity:.85"/><text x="${f1(lx+w+5)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${d<0?'−':'+'}${Math.abs(d).toFixed(2)}</text>`});
      s+=`<text x="${f1(lx)}" y="${E.y+L.bars.length*17+10}" class="t-xs">Cohen's d: ${L.bars[0][1]<0?'vs controls':'lithium vs no lithium'}</text>`}
    if(L.grid){const [k,n]=L.grid;for(let i=0;i<n;i++){const x=E.x+(i%22)*15,y=E.y+Math.floor(i/22)*15;s+=`<rect x="${x}" y="${y}" width="12" height="12" rx="2" style="fill:${i<k?'var(--down-fill)':'var(--panel-2)'};stroke:var(--line)"/>`}
      s+=`<text x="${E.x}" y="${E.y+44}" class="t-xs">${k} of ${n} regions with lower fractional anisotropy</text>`}
    /* dopamine synapse */
    const Y0=N?440:0,SX=N?190:555,SY=Y0+(N?175:165),ss=N?1.8:1.8;
    s+=`<line x1="${N?16:410}" x2="${N?384:410}" y1="${N?Y0+10:14}" y2="${N?Y0+10:404}" class="grid"/>`;
    s+=`<text x="${N?16:430}" y="${Y0+32}" class="t-sm" style="fill:var(--nt)">DOPAMINE SYNAPSE (CARTOON)</text>`;
    const n=clamp(.5+.48*m),dat=Math.round(1+Math.max(0,-m)*4);
    if(m>.15)s+=`<rect x="${f1(SX-50*ss)}" y="${f1(SY+2*ss)}" width="${f1(100*ss)}" height="${f1(14*ss)}" rx="8" style="fill:var(--up-fill);opacity:${f1(m*.35)}"/>`;
    s+=synapse(SX,SY,ss,{n,seed:7});
    for(let k=0;k<dat;k++){const x=SX+(-30+k*15)*ss,y=SY-8*ss;s+=`<path d="M${f1(x-4)} ${f1(y-6)}v8a4 4 0 0 0 8 0v-8" style="fill:none;stroke:var(--down-fill);stroke-width:2.6"/>`}
    const st=m<-.3?'depression':m>.3?'mania':'steady mood';
    s+=`<text x="${f1(SX+50*ss)}" y="${f1(SY-36*ss)}" class="t-xs">nerve ending</text><text x="${f1(SX+50*ss)}" y="${f1(SY+22*ss)}" class="t-xs">receptors</text>`;
    s+=`<path d="M${f1(SX+46*ss)} ${f1(SY-12*ss)}l4 0" style="stroke:var(--down-fill);stroke-width:2.6"/><text x="${f1(SX+50*ss)}" y="${f1(SY-9*ss)}" class="t-xs">DAT</text>`;
    /* mood scale */
    const mx0=N?40:440,mx1=N?360:700,my=SY+125;
    s+=`<line x1="${mx0}" x2="${mx1}" y1="${my}" y2="${my}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
    s+=`<text x="${mx0}" y="${my+18}" class="t-xs" style="fill:var(--down)">depression</text><text x="${(mx0+mx1)/2}" y="${my+18}" class="t-xs t-mid" style="fill:var(--eu)">steady</text><text x="${mx1}" y="${my+18}" class="t-xs t-end" style="fill:var(--up)">mania</text>`;
    s+=`<circle cx="${f1(lerp(mx0,mx1,t))}" cy="${my}" r="7" style="fill:${m<-.3?'var(--down-fill)':m>.3?'var(--up-fill)':'var(--eu)'};stroke:var(--panel);stroke-width:2"/>`;
    const lines=m<-.3?[['early','more DAT, less signalling'],['hyp','cycle: receptors turned down']]:m>.3?[['early','more D2/3 receptors available'],['early','over-active reward network']]:[['est','a model for 40+ years'],['hyp','evidence differs by pole']];
    lines.forEach(([kd,tx],k)=>{const y=my+62+k*20;s+=chip(mx0,y,kd,'')+`<text x="${mx0+(kd==='early'?94:kd==='hyp'?72:78)}" y="${y+1}" class="t-xs" style="fill:var(--ink)">${tx}</text>`});
    s+=`<text x="${mx0}" y="${my+38}" class="t-xs">now: <tspan style="font-weight:700;fill:var(--ink)">${st}</tspan> · dopamine release ${n>.65?'high':n<.35?'low':'moderate'}</text>`;
    bs.innerHTML=`<defs>${marker('brA2','var(--pfc)')}</defs>`+s;
    const syn=m<-.3?`${BR_EV.early} In bipolar depression, imaging shows more dopamine transporter, which would lower dopamine signalling; other dopamine findings in depression are inconsistent. [[Ashok2017]]`
      :m>.3?`${BR_EV.early} Converging drug and imaging evidence supports raised dopamine signalling in mania: higher striatal D2/3 receptor availability and an over-active reward-processing network. [[Ashok2017]]`
      :`The dopamine hypothesis holds that too much dopamine signalling underlies mania and too little underlies depression; it has been a key theory for over four decades (${BR_EV.est.replace('Established','Established as a model')}). [[Ashok2017]]`;
    $('#brBrNote').innerHTML=noteHTML(L)+`<div class="kv"><div><dt>Synapse panel · ${st}</dt><dd>${syn}</dd></div><div><dt>A proposed cycle</dt><dd>${BR_EV.hyp} High dopamine in mania may turn receptor sensitivity down, leading into a low-dopamine depressive phase; high-dose dopamine drugs in Parkinson's disease give a similar mania-then-depression picture. Brain glutamate (Glx) is also raised on average. [[Berk2007,Gigante2012]]</dd></div></div>`;
  }
  playWire(br,$('#brBrPlay'),drawB,9000,'Replay','brain');
  $$('[data-brl]').forEach(b=>b.addEventListener('click',()=>{layer=b.dataset.brl;$$('[data-brl]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB(+br.value)}));
  drawB(+br.value);

  /* ================= overlap of two groups for a given d ================= */
  const ov=$('#brOv');let dd=.293;
  const erf=x=>{const s=Math.sign(x),a=Math.abs(x),t=1/(1+.3275911*a);return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-a*a))};
  const Phi=z=>.5*(1+erf(z/Math.SQRT2));
  function drawO(){
    const N=vb(ov,'480 250','400 300'),x0=16,x1=N?384:464,yB=N?250:205,hh=N?170:150,X=z=>lerp(x0,x1,(z+3.6)/7.2);
    const pdf=z=>Math.exp(-z*z/2),cur=(m)=>{let p='';for(let k=0;k<=120;k++){const z=-3.6+7.2*k/120;p+=(k?'L':'M')+f1(X(z))+' '+f1(yB-hh*pdf(z-m))}return p};
    let s=`<path d="${cur(0)}L${x1} ${yB}L${x0} ${yB}Z" style="fill:var(--muted);opacity:.18"/><path d="${cur(0)}" style="fill:none;stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="${cur(-dd)}L${x1} ${yB}L${x0} ${yB}Z" style="fill:var(--down-fill);opacity:.22"/><path d="${cur(-dd)}" style="fill:none;stroke:var(--down-fill);stroke-width:2.2"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x1}" y="${yB+15}" class="t-xs t-end">thicker or larger →</text><text x="${x0}" y="${yB+15}" class="t-xs">← thinner or smaller</text>`;
    const ovl=Math.round(200*Phi(-dd/2));
    s+=`<text x="${x0}" y="22" class="t-lbl">The two groups overlap by about ${ovl}%</text><text x="${x0}" y="38" class="t-xs"><tspan style="fill:var(--down-fill)">■ bipolar disorder</tspan>   <tspan style="fill:var(--muted)">■ no bipolar disorder</tspan>   d = −${dd.toFixed(2)}</text>`;
    ov.innerHTML=s}
  $$('[data-brd]').forEach(b=>b.addEventListener('click',()=>{dd=+b.dataset.brd;$$('[data-brd]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawO()}));
  drawO();

  /* ================= kindling: two readings of one association ================= */
  const kd=$('#brKd');let view='data',mix=0,stopK=null;
  const LO=.24,HI=.86,pS=k=>.06+(k-1)*.105;
  function drawK(){
    const N=vb(kd,'720 300','400 440'),V=view,x0=N?40:70,x1=N?384:470,yB=N?320:250,hh=N?220:190,n=8,bw=(x1-x0)/n;
    let s=`<text x="${x0-30}" y="${yB-hh-14}" class="t-sm" style="fill:var(--brand)">RISK OF ANOTHER EPISODE (NO SCALE)</text>`;
    for(let k=1;k<=n;k++){const p=pS(k),tot=LO+(HI-LO)*p,x=x0+(k-1)*bw+bw*.18,w=bw*.64,H=hh*tot;
      if(V==='sev'){const hs=hh*HI*p,hm=hh*LO*(1-p);
        s+=`<rect x="${f1(x)}" y="${f1(yB-H)}" width="${f1(w)}" height="${f1(hs)}" rx="3" style="fill:var(--accent);opacity:.75"/><rect x="${f1(x)}" y="${f1(yB-hm)}" width="${f1(w)}" height="${f1(hm)}" rx="3" style="fill:var(--brand);opacity:.55"/>`}
      else s+=`<rect x="${f1(x)}" y="${f1(yB-H)}" width="${f1(w)}" height="${f1(H)}" rx="3" style="fill:var(--brand);opacity:.75"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${yB+14}" class="t-xs t-mid">${k===n?'8+':k}</text>`}
    s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x1}" y="${yB+30}" class="t-xs t-end">number of previous episodes</text>`;
    if(V==='kindle'){let p='';for(let k=1;k<=n;k++){const x=x0+(k-.5)*bw,y=yB-hh*(.98-.09*(k-1)*mix);p+=(k>1?'L':'M')+f1(x)+' '+f1(y);
        const sz=lerp(12,3,(k-1)/(n-1))*mix+3;s+=`<path d="M${f1(x+bw*.3)} ${f1(y-sz)}l${f1(-sz*.5)} ${f1(sz)}h${f1(sz*.5)}l${f1(-sz*.4)} ${f1(sz)}" style="fill:none;stroke:var(--up-fill);stroke-width:1.8;stroke-linejoin:round"/>`}
      s+=`<path d="${p}" style="fill:none;stroke:var(--up-fill);stroke-width:2;stroke-dasharray:5 4"/><text x="${x0+bw*1.6}" y="${f1(yB-hh*.98+4)}" class="t-xs" style="fill:var(--up)">trigger needed to start an episode (proposed)</text>`}
    if(V==='sev'){const yH=yB-hh*HI,yL=yB-hh*LO;
      s+=`<g style="opacity:${f1(mix)}"><line x1="${x0}" x2="${x1}" y1="${f1(yH)}" y2="${f1(yH)}" style="stroke:var(--accent);stroke-width:2;stroke-dasharray:6 4"/><line x1="${x0}" x2="${x1}" y1="${f1(yL)}" y2="${f1(yL)}" style="stroke:var(--brand);stroke-width:2;stroke-dasharray:6 4"/></g>`}
    const lx=N?x0:x1+22,ly=N?yB-hh-2:yB-hh+10;
    const leg=V==='sev'?[['var(--accent)','more severe from the start: high, flat risk'],['var(--brand)','milder course: low, flat risk'],['var(--muted)','bar = the mix at that episode count']]
      :V==='kindle'?[['var(--brand)','observed: risk rises'],['var(--up-fill)','proposed: smaller triggers suffice']]:[['var(--brand)','rate of recurrence rises'],['var(--muted)','with each previous episode']];
    if(!N)leg.forEach(([c,l],k)=>{const words=l.split(': ');s+=`<rect x="${lx}" y="${ly+k*34-9}" width="10" height="10" rx="2" style="fill:${c}"/><text x="${lx+16}" y="${ly+k*34}" class="t-xs" style="fill:var(--ink)">${words[0]}${words[1]?':':''}</text>${words[1]?`<text x="${lx+16}" y="${ly+k*34+13}" class="t-xs">${words[1]}</text>`:''}`});
    else leg.forEach(([c,l],k)=>{s+=`<rect x="${x0-30}" y="${yB+48+k*16}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${x0-16}" y="${yB+56+k*16}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    kd.innerHTML=s;$('#brKdNote').innerHTML=noteHTML(BR_K[V]);
  }
  $$('[data-brk]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.brk;$$('[data-brk]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopK)stopK();mix=0;stopK=animate(700,p=>{mix=ease(p);drawK()},()=>{stopK=null})}));
  mix=1;drawK();
  const prevR=redraws.brain;redraws.brain=()=>{prevR&&prevR();drawO();drawK()};
};
