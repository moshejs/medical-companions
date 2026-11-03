/* =============== 2.4 Bipolar or something else? =============== */
const DF_BPD_TRIG=[.07,.19,.33,.47,.58,.71,.86];
const DF_LANES=[
 {name:'Bipolar II disorder',nn:'Bipolar II',col:'var(--dx)',
  f:moodSeries([[0,0],[.05,-.04],[.1,-.6],[.22,-.62],[.27,-.05],[.36,0],[.39,.32],[.425,.34],[.455,0],[.55,0],[.6,-.55],[.74,-.6],[.79,0],[.87,.02],[.9,.32],[.93,.32],[.96,.02],[1,0]]),
  feat:'distinct episodes, weeks long, with well intervals'},
 {name:'Recurrent unipolar depression',nn:'Unipolar depression',col:'var(--down)',
  f:moodSeries([[0,0],[.12,-.03],[.18,-.58],[.38,-.64],[.45,-.02],[.62,0],[.69,-.55],[.9,-.6],[.96,-.08],[1,0]]),
  feat:'lows only; no hypomania or mania'},
 {name:'Borderline personality disorder',nn:'Borderline PD',col:'var(--mixed)',
  f:null,feat:'shifts within hours, reactive to stress'},
 {name:'ADHD',nn:'ADHD',col:'var(--rx)',
  f:null,feat:'constant, not episodic; since childhood'},
 {name:'Substance- or medication-induced',nn:'Substance-induced',col:'var(--warn)',
  f:moodSeries([[0,0],[.36,0],[.42,.08],[.48,.6],[.56,.6],[.6,.45],[.64,.08],[.68,0],[1,0]]),
  feat:'starts and stops with the substance'}];
DF_LANES[2].f=(()=>{const g=u=>{let v=-.1+.16*Math.sin(u*97)+.1*Math.sin(u*233+1);DF_BPD_TRIG.forEach(tg=>{const d=u-tg;if(d>=0&&d<.035)v-=.62*Math.exp(-d*90)*(d<.004?d/.004:1)});return clamp(v,-1,1)};g.pole=u=>{const v=g(u);return v>EU?'up':v<-EU?'down':'eu'};return g})();
DF_LANES[3].f=(()=>{const g=u=>.04+.05*Math.sin(u*61)+.03*Math.sin(u*151);g.pole=()=>'eu';return g})();
const DF_STEPS=[
 {from:0,at:.12,k:'Lane 1',t:'Bipolar II: distinct episodes',
  txt:`Bipolar mood changes are sustained episodes: lows lasting weeks and hypomanic highs of at least 4 days, with well intervals between. [[Paris2015,APA2022]] Over 13.4 years, people with bipolar II had depressive symptoms in 50.3% of weeks and hypomanic symptoms in only 1.3%, which is why the highs are easy to miss. [[Judd2003]]`,
  pt:`Bipolar disorder comes in episodes that last days to weeks, with steadier periods in between.`,
  hook:`Bipolar II: at least one hypomanic + one major depressive episode, never mania. Depression dominates the course. [[APA2022,Judd2003]]`},
 {from:.15,at:.27,k:'Lane 2',t:'Unipolar depression: lows only',
  txt:`Features that favour unipolar depression include initial insomnia, weight loss, later onset, long episodes and no family history of bipolar disorder; CANMAT's working thresholds are onset after 25 and a current episode longer than 6 months. [[Mitchell2008,Yatham2018]] But the line can move: in a meta-analysis, 22.5% of people with major depression developed bipolar disorder over 12–18 years, most often in the first 5. [[Ratheesh2017]]`,
  pt:`A first depression can be the first sign of bipolar disorder, so doctors keep asking about highs over time.`,
  hook:`The most frequent misdiagnosis of bipolar disorder is major depressive disorder. [[Yatham2018,Hirschfeld2003Perceptions]]`},
 {from:.3,at:.42,k:'Lane 3',t:'Borderline PD: reactive shifts',
  txt:`Both involve affective instability, but in borderline personality disorder mood shifts are transient and reactive to interpersonal stress (the flashes), while bipolar mood changes are sustained. [[Paris2015]] In borderline personality disorder "true euphoria and prolonged well-functioning intervals are extremely rare", and the pattern begins early and is long-standing. [[Yatham2018]]`,
  pt:`Mood that swings within hours after an argument or a rejection is a different pattern from a week-long high.`,
  hook:`Separating validators: childhood sexual abuse, family history of bipolar disorder, parasuicidal self-harm, treatment response. [[Ghaemi2014,Bayes2016]]`},
 {from:.45,at:.57,k:'Lane 4',t:'ADHD: a lifelong pattern',
  txt:`ADHD symptoms are chronic and present since childhood rather than coming in episodes; assessing chronicity versus episodicity helped tell the two apart in adult women, while emotional lability was raised in both. [[Kitsune2016]] The overlap is real: 17.11% of adults with bipolar disorder had ADHD, and 7.95% of adults with ADHD had bipolar disorder. [[Schiweck2021]]`,
  pt:`ADHD is "always there"; bipolar episodes come and go.`,
  hook:`Irritability as the only mood change is controversial because it overlaps with ADHD, conduct and personality disorders. [[Stein2020BMC]]`},
 {from:.6,at:.72,k:'Lane 5',t:'Substance-induced: tied to exposure',
  txt:`Steroids, stimulants, illicit drugs, levodopa, antidepressants and toxins can cause a mood episode during intoxication or withdrawal. [[Yatham2018]] Oral glucocorticoids carried a hazard ratio of 4.35 for mania. [[Fardet2012]] An episode that clears once the physiological effect wears off is substance/medication-induced; a full episode that persists beyond it counts towards bipolar disorder. [[APA2022,Yatham2018]]`,
  pt:`Some medicines, such as steroids, and some drugs, such as cannabis, can set off a manic-like state, so doctors ask about them first.`,
  hook:`Glucocorticoids: HR 4.35 for mania; cannabis: OR 2.97 for new manic symptoms. [[Fardet2012,Gibbs2015]]`},
 {from:.76,at:.95,k:'Compare',t:'The shape tells the story',
  txt:`Seen side by side, the courses differ in what CANMAT's differential table emphasises: onset, accompanying symptoms, past course and family history. [[Yatham2018]] Collateral history from family and a prospective mood chart make the pattern visible; confirmation is more confident "when episodes are prospectively observed". [[Yatham2018,NICE2014CG185]]`,
  pt:`Bipolar disorder is diagnosed from a person's story over time, not from a blood test or a brain scan.`,
  hook:`Over-diagnosis comes mostly from borderline PD, substance use disorder and ADHD; CANMAT: "strictly adhere to diagnostic criteria". [[Yatham2018]]`}];
const DF_CLUES=[
 ['onset','Early onset, many episodes',`CANMAT's working thresholds favouring bipolar depression: first depression before 25 and at least 5 prior episodes. Earlier onset of depression also predicted later conversion (g = −0.33). [[Yatham2018,Ratheesh2017]]`],
 ['fam','Family history of bipolar disorder',`It predicted transition from major depression to bipolar disorder (OR 2.89, 95% CI 2.01–4.14), and a family history of mania or hypomania was linked to bipolarity in BRIDGE (OR > 2). [[Ratheesh2017,Angst2011BRIDGE]]`],
 ['post','Postpartum onset',`CANMAT lists postpartum depression or psychosis as raising suspicion of bipolarity, and recommends screening all women with depressive symptoms in pregnancy and postpartum, with a clinical interview after any positive screen. [[Yatham2018]]`],
 ['psy','Psychotic features',`Psychotic depression predicted later bipolar disorder (OR 4.76, 1.79–12.66); in young adults hospitalised for depression, psychotic features at the index episode predicted the switch. [[Ratheesh2017,Goldberg2001]]`],
 ['atyp','Atypical features',`Hypersomnia, increased appetite (hyperphagia) and leaden paralysis, along with psychomotor retardation, favour bipolar depression. [[Mitchell2008,Yatham2018]]`],
 ['ad','Antidepressant-induced high',`Antidepressant-induced manic symptoms or rapid cycling should raise suspicion. Across 51 reports, switching was 2.6 times more likely with antidepressant treatment, and 4.5 times more frequent in young people than adults. [[Yatham2018,Baldessarini2013]]`],
 ['lab','Short episodes, mood lability',`Shorter episodes and mood lability are on the list of features favouring bipolar depression. [[Mitchell2008,Yatham2018]]`],
 ['sub','Past subthreshold highs',`In 550 people with major depression followed for 17.5 years, subthreshold decreased need for sleep, unusually high energy and more goal-directed activity predicted progression, though most who progressed had none at baseline. NICE: ask about past overactivity lasting 4 days or more. [[Fiedorowicz2011,NICE2014CG185]]`],
 ['sui','Past suicide attempts',`CANMAT lists past suicide attempts among features that should raise suspicion of bipolarity, and lifetime suicide attempt distinguished bipolar disorder from major depression in a Canadian survey. This is a reason for kind, regular safety check-ins, and help is available. [[Yatham2018,Schaffer2010]]`]];
inits.differential=()=>{
  const svg=$('#dfSvg'),rg=$('#dfT');
  function bolt(x,y,c){return `<path d="M${f1(x+2)} ${f1(y-7)}L${f1(x-3)} ${f1(y+1)}H${f1(x+1)}L${f1(x-2)} ${f1(y+8)}L${f1(x+4)} ${f1(y-1)}H${f1(x)}Z" style="fill:${c}"/>`}
  function draw(t){
    const N=vb(svg,'720 410','400 690'),ph=phaseOf(DF_STEPS,t);setA(ph);
    let s='';const cmp=ramp(t,.76,.9);
    const LX=N?16:168,LW=N?368:532;
    s+=`<text x="${N?16:16}" y="18" class="t-sm" style="fill:var(--dx)">${N?'FIVE COURSES · 24 MONTHS':'FIVE COURSES OVER 24 MONTHS · SAME SCALE'}</text>`;
    DF_LANES.forEach((ln,i)=>{
      const ly=N?40+i*124:34+i*68,lh=N?62:48,cy=N?ly+30:ly,up=i<5?ramp(t,DF_STEPS[i].from,DF_STEPS[i].from+.13):1,foc=ph===i||ph===5,op=foc?1:up>=1?.5:.85;
      /* label */
      if(N){s+=`<text x="16" y="${ly+12}" class="t-lbl" style="fill:${foc?ln.col:'var(--ink)'};opacity:${op}">${ln.name}</text>`}
      else{s+=`<text x="16" y="${ly+20}" class="t-lbl" style="fill:${foc?ln.col:'var(--ink)'};opacity:${op}">${ln.nn}</text>`;
        if(foc&&up>.6||cmp>0)s+=`<foreignObject x="16" y="${ly+26}" width="146" height="34"><div xmlns="http://www.w3.org/1999/xhtml" style="font:500 9.5px/1.25 var(--mono);color:var(--muted)">${ln.feat}</div></foreignObject>`}
      s+=`<g opacity="${f1(op)}">`;
      const lc=lifechart(LX,cy,LW,lh,ln.f,{upto:up,id:'df'+i,lw:2});s+=lc.svg;
      if(i===0&&up>.45){const a=lc.X(.39),b=lc.X(.455);s+=`<path d="M${f1(a)} ${f1(cy+3)}H${f1(b)}" style="stroke:var(--up);stroke-width:2"/><text x="${f1((a+b)/2)}" y="${f1(cy-1)}" class="t-xs t-mid" style="fill:var(--up)">hypomania ≥ 4 d</text>`}
      if(i===0&&up>.25){const a=lc.X(.1),b=lc.X(.25);s+=`<text x="${f1((a+b)/2)}" y="${f1(cy+lh-4)}" class="t-xs t-mid" style="fill:var(--down)">weeks-long low</text>`}
      if(i===0&&up>.56&&!N){const a=lc.X(.46),b=lc.X(.56);s+=`<text x="${f1((a+b)/2)}" y="${f1(lc.Y(0)-5)}" class="t-xs t-mid" style="fill:var(--eu)">well</text>`}
      if(i===1&&up>.5)s+=`<text x="${f1(lc.X(.5)+4)}" y="${f1(cy+11)}" class="t-xs" style="fill:var(--down)">never a high</text>`;
      if(i===2)DF_BPD_TRIG.forEach(tg=>{if(up>tg)s+=bolt(lc.X(tg),cy+6,'var(--mixed)')});
      if(i===2&&up>.4)s+=`<text x="${f1(lc.X(.36))}" y="${f1(cy+lh-3)}" class="t-xs" style="fill:var(--mixed)">⚡ stress → mood drops within hours</text>`;
      if(i===3&&up>0){const w=lc.X(up)-LX;s+=`<rect x="${LX}" y="${f1(cy+lh*.12)}" width="${f1(w)}" height="${f1(lh*.2)}" rx="3" style="fill:var(--rx);opacity:.28"/><text x="${LX+6}" y="${f1(cy+lh*.12+lh*.2-3)}" class="t-xs" style="fill:var(--rx)">${up>.3?'inattention, restlessness: every day':''}</text>`;
        s+=`<text x="${LX-2}" y="${f1(cy+lh*.22+3)}" class="t-xs t-end" style="fill:var(--rx)">${N?'':'←'}</text>`}
      if(i===4&&up>.4){const a=lc.X(.4),b=lc.X(Math.min(up,.6)/1);s+=`<rect x="${f1(a)}" y="${f1(cy+lh-9)}" width="${f1(Math.max(2,b-a))}" height="7" rx="3" style="fill:var(--warn)"/><text x="${f1(a-4)}" y="${f1(cy+lh-2)}" class="t-xs t-end" style="fill:var(--warn)">steroid course</text>`+pill(a,cy+lh-18,16,{col:'var(--warn)'});
        if(up>.7)s+=`<text x="${f1(lc.X(.66))}" y="${f1(lc.Y(0)-5)}" class="t-xs" style="fill:var(--eu)">stopped → settles</text>`}
      s+='</g>';
      if(N&&(foc&&up>.6||cmp>0))s+=`<text x="16" y="${ly+cy-ly+lh+14}" class="t-xs" style="fill:${ln.col}">${ln.feat}</text>`;
      if(i===3&&N&&up>0)s+=`<text x="384" y="${ly+12}" class="t-xs t-end" style="fill:var(--rx)">began in childhood</text>`;
    });
    /* time axis and playhead */
    const ay=N?660:376,X=m=>LX+LW*m/24;
    s+=`<line x1="${LX}" x2="${LX+LW}" y1="${ay}" y2="${ay}" class="axis"/>`;
    for(let m=0;m<=24;m+=N?6:3)s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${ay-3}" y2="${ay+3}" class="axis"/><text x="${f1(X(m))}" y="${ay+15}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${LX+LW}" y="${ay+27}" class="t-xs t-end">months</text>`;
    if(ph<5){const u=ramp(t,DF_STEPS[ph].from,DF_STEPS[ph].from+.13),px=LX+LW*u;s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="30" y2="${ay}" style="stroke:var(--ink);opacity:.18"/>`}
    svg.innerHTML=s;
    $('#dfNote').innerHTML=noteHTML(DF_STEPS[ph]);
  }
  const stop=playWire(rg,$('#dfPlay'),draw,18000,'%t:player.replay%','differential');
  const setA=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- clue list ---------- */
  const on=new Set(['fam','psy']),cs=$('#dfClueSvg');
  $('#dfClues').innerHTML=DF_CLUES.map(c=>`<button class="btn" data-dfc="${c[0]}" aria-pressed="${on.has(c[0])}">${c[1]}</button>`).join('');
  let glow=1,gStop=null;
  function drawC(){const N=vb(cs,'600 320','400 400');let s='';const n=DF_CLUES.length;
    const C=N?{x:200,y:62,w:200,h:64}:{x:300,y:160,w:190,h:70};
    const pos=i=>{if(N){const col=i%2,row=Math.floor(i/2);return [16+col*190+86,140+row*56]}const a=-Math.PI/2+i*2*Math.PI/n;return [300+Math.cos(a)*228,160+Math.sin(a)*130]};
    DF_CLUES.forEach((c,i)=>{const [x,y]=pos(i),lit=on.has(c[0]);if(lit)s+=`<line x1="${f1(C.x)}" y1="${f1(C.y)}" x2="${f1(x)}" y2="${f1(y)}" style="stroke:var(--dx);stroke-width:${f1(1.2+glow*1.2)};opacity:${f1(.35+.5*glow)};stroke-dasharray:4 3"/>`});
    s+=`<rect x="${f1(C.x-C.w/2)}" y="${f1(C.y-C.h/2)}" width="${C.w}" height="${C.h}" rx="14" style="fill:var(--down-soft);stroke:var(--down-fill);stroke-width:1.6"/>`;
    s+=`<text x="${C.x}" y="${f1(C.y-8)}" class="t-mid" style="font:800 15px var(--display);fill:var(--down)">A depressive episode</text><text x="${C.x}" y="${f1(C.y+10)}" class="t-xs t-mid">${on.size} of ${n} clues switched on</text><text x="${C.x}" y="${f1(C.y+23)}" class="t-xs t-mid">not a score</text>`;
    DF_CLUES.forEach((c,i)=>{const [x,y]=pos(i),lit=on.has(c[0]),w=N?172:140,h=34;
      s+=`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${w}" height="${h}" rx="17" style="fill:${lit?'var(--dx-soft)':'var(--panel)'};stroke:${lit?'var(--dx)':'var(--line)'};stroke-width:${lit?2:1}"/>`;
      const words=c[1].split(' '),half=Math.ceil(words.length/2),two=c[1].length>(N?24:22);
      if(two)s+=`<text x="${f1(x)}" y="${f1(y-2)}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:${lit?700:500}">${words.slice(0,half).join(' ')}</text><text x="${f1(x)}" y="${f1(y+10)}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:${lit?700:500}">${words.slice(half).join(' ')}</text>`;
      else s+=`<text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:${lit?700:500}">${c[1]}</text>`});
    cs.innerHTML=s;
    const L=DF_CLUES.filter(c=>on.has(c[0]));
    $('#dfClueNote').innerHTML=`<div class="kicker">Clues switched on: ${L.length}</div><h4>${L.length?'What each clue is linked to':'Switch on a clue'}</h4>`+(L.length?`<ul class="dflist">${L.map(c=>`<li><b>${c[1]}</b>${c[2]}</li>`).join('')}</ul>`:`<p>Tap any clue above to see the published association behind it.</p>`)+
      `<div class="pt"><b>%t:note.plain%</b>Telling your doctor about any past times of unusual energy, little need for sleep or racing thoughts can shorten the road to the right diagnosis.</div><div class="hook"><b>%t:note.hook%</b>Transition from depression to bipolar disorder: family history OR 2.89, psychotic depression OR 4.76, early onset. [[Ratheesh2017]]</div>`}
  $('#dfClues').addEventListener('click',e=>{const b=e.target.closest('[data-dfc]');if(!b)return;const k=b.dataset.dfc;on.has(k)?on.delete(k):on.add(k);b.setAttribute('aria-pressed',on.has(k));gStop&&gStop();glow=0;gStop=animate(600,p=>{glow=p;drawC()},()=>{gStop=null})});
  drawC();
  const prevR=redraws.differential;redraws.differential=()=>{prevR&&prevR();drawC()};
};
