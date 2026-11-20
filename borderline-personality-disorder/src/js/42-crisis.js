/* =============== 4.2 Suicide & self-harm safety =============== */
/* Safe messaging: no methods or means anywhere in this module; help-seeking and treatability throughout. */
const CS_STEPS=[
 {from:0,at:.08,k:'Step 1 of 6',t:'Warning signs',
  txt:`A safety plan is "a brief clinical intervention" that combines evidence-based strategies into a prioritised list of coping skills and strategies. [[Stanley2018ED]] It starts with warning signs: the thoughts, moods and situations that tend to come before a crisis. A NICE crisis plan likewise names the person's likely triggers. [[NICE2009]]`,
  pt:`Knowing your own early signs lets you start using the plan before the wave reaches its peak.`,
  hook:`Safety plan plus at least 2 follow-up calls: suicidal behaviour in 3.03% vs 5.29% over 6 months (OR 0.56). [[Stanley2018ED]]`},
 {from:1/6,at:1/6+.08,k:'Step 2 of 6',t:'Internal coping',
  txt:`Next come things the person can do on their own to get through the peak. Self-management strategies that have worked before are a core part of a NICE crisis plan. [[NICE2009]] Skills-based therapy targets exactly this: in Cochrane 2020, DBT reduced self-harm compared with usual care. [[Storebo2020]]`,
  pt:`Strong feelings rise fast and then pass. Coping skills help you ride out the highest part.`,
  hook:`The best-supported function of self-injury is short-term relief from intense emotion; skills offer other routes to relief. [[Klonsky2007,Kleindienst2008]]`},
 {from:2/6,at:2/6+.08,k:'Step 3 of 6',t:'People and places for distraction',
  txt:`If coping alone is not enough, the plan lists people and social settings that help take the mind off the crisis, without needing to talk about it. The steps are used in order, moving to the next if one does not help. [[Stanley2018ED]]`,
  pt:`Being around other people, even without talking about how you feel, can help the wave pass.`,
  hook:`A safety plan is a prioritised list: start with the first step and move up only if needed. [[Stanley2018ED]]`},
 {from:3/6,at:3/6+.08,k:'Step 4 of 6',t:'People to ask for help',
  txt:`Then come people the person trusts enough to say "I'm struggling" and ask for help. Families can help by staying calm, listening and helping the person use the plan. NICE asks that, after a crisis, the crisis plan is updated with the person, and with family or carers if possible. [[NICE2009]]`,
  pt:`Telling someone you trust that you are struggling is a strength, not a burden.`,
  hook:`NICE CG78: after a crisis, review what triggered it and update the crisis plan with the person and, if possible, family or carers. [[NICE2009]]`},
 {from:4/6,at:4/6+.08,k:'Step 5 of 6',t:'Professionals and crisis lines',
  txt:`The plan lists the care team, out-of-hours and crisis team numbers [[NICE2009]], and crisis lines: in the US, call, text or chat 988, free and confidential, 24/7 [[SAMHSA988]]; in the UK and Ireland, Samaritans on 116 123, free from any phone at any time [[Samaritans116123]]. In ED-SAFE, screening plus a brief ED intervention with follow-up calls lowered suicide attempts to 18%, against 23% with usual care. [[Miller2017EDSAFE]]`,
  pt:`Crisis lines are free, confidential and always open. Calling is always OK, even if you are not sure it is "bad enough".`,
  hook:`ED-SAFE: screening alone did nothing (22% vs 23%); screening plus a brief intervention and calls cut attempts to 18%. [[Miller2017EDSAFE]]`},
 {from:5/6,at:5/6+.08,k:'Step 6 of 6',t:'Making the surroundings safer',
  txt:`The last step is agreeing, together, how to make the person's surroundings safer during a crisis. For medicines, NICE NG225 advises shared decisions about limiting the quantity supplied and returning unwanted medicines. [[NICE2022NG225]] And the wave passes: suicidal thoughts and self-harm in BPD usually decline markedly over the years. [[Soloff2019Suicidal,Zanarini2008SelfHarm]]`,
  pt:`A safety plan is yours to keep, carry and change. Most people with BPD get better over time.`,
  hook:`Meta-analysis of safety planning: RR 0.57 for suicidal behaviour (NNT 16), with no effect on suicidal ideation. [[Nuij2021]]`}
];
const CS_CLIN=[
 `Write the plan with the person, in their own words. APA 2024 implementation text asks for monitoring of suicide risk, documented assessments and "individualized safety plans". [[APA2024Guideline]]`,
 `Explore what has helped before. In a crisis, NICE asks for empathic open questions and no solutions offered before the problem is clear. [[NICE2009]]`,
 `Use validating statements and avoid minimising the person's stated reasons; try to understand the crisis from their point of view. [[NICE2009]]`,
 `Agree who may be contacted. In 41 joint crisis plans, people with BPD asked for dignity and respect; some wanted contact during crises, others to be left alone. [[Borschmann2014]]`,
 `Give the person a copy of the plan with contact details [[NICE2022NG225]], and provide initial aftercare within 48 hours of the assessment if there are ongoing safety concerns. [[NICE2022SelfHarm]]`,
 `Discuss medicine quantities through shared decision-making and consider toxicity in overdose when prescribing. [[NICE2022NG225]] Follow up: the VA model used at least two calls to monitor risk and revise the plan. [[Stanley2018ED]]`
];
const CS_TXT={me:[['Notice the thoughts, feelings and situations','that tell me a crisis may be building'],['Things I can do on my own to ride the wave:','a skill, music, a walk, slow breathing'],['People and social places that take my mind','off things: a friend\'s home, a café, a group'],['People I can tell that I am struggling','and ask to help me'],['My care team and out-of-hours numbers;','988 (US) · Samaritans 116 123 (UK, Ireland)'],['Agreeing, with support, how to make','my surroundings safer during a crisis']],
 clin:[['Help the person name their own warning','signs, in their own words'],['Explore what has helped before;','practise one strategy together'],['Identify places and people that distract,','without needing to talk about the crisis'],['With consent, agree who can be','contacted and how they can help'],['Write in team, out-of-hours and crisis-line','numbers; give the person a copy'],['Discuss safety together, e.g. limiting the','quantity of medicines supplied']]};
const CS_LBL={w:['Warning signs','Inner coping','Distraction','Ask for help','Crisis lines','Safer space'],n:['Signs','Coping','Distract','Ask','Helplines','Safer']};
const CS_OUT=[
 {n:'Meta-analysis · 35 studies, 34,832 people',s:6,o:0,c:'[[Lak2025]]',
  txt:`Pooled across 35 studies of 34,832 people with BPD, lifetime suicidal ideation was estimated at 80%, suicide attempts at 52% and death by suicide at 6% (95% CI 4–8%). [[Lak2025]] So about 94 in 100 people with BPD in these studies did not die by suicide.`,
  read:[['did not die by suicide','94 in 100'],['suicide (pooled)','6%'],['lifetime suicidal thoughts','80%']]},
 {n:'McLean Study of Adult Development · 24 years',s:6,o:14,c:'[[Temes2019]]',
  txt:`Over 24 years, 5.9% of 290 former inpatients with BPD died by suicide, compared with 1.4% of 72 comparison subjects; 14.0% vs 5.5% died of other causes. Of those who died by suicide, 87.5% had not recovered before death, so getting better matters. [[Temes2019]]`,
  read:[['did not die by suicide','94 in 100'],['suicide, 24 years','5.9%'],['other causes','14.0%']]},
 {n:'Montreal follow-up · 27 years',s:10,o:0,c:'[[Paris2001]]',
  txt:`In a 27-year follow-up of 64 people, the cumulative proportion who died by suicide reached 10.3%, and only 5 still met BPD criteria. [[Paris2001]] Reviews by Paris give "up to 10%" as the share who die by suicide. [[Paris2019Suicidality]] Higher than in the other studies, and still: about 90 in 100 did not die by suicide.`,
  read:[['did not die by suicide','about 90 in 100'],['suicide, 27 years','10.3%'],['still met criteria','5 people']]}
];
inits.crisis=()=>{
  const svg=$('#csSvg'),rg=$('#csT');let view='me';
  const F=moodF({t0:.1,base:.16,peak:.9,rise:.3,fall:.25});
  const tx=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  function draw(t){const N=vb(svg,'720 380','400 600');
    const L=N?{wx:12,wy:100,ww:376,wh:484,lx:18,ly:280,lw:364,lh:300,hx:14,hy:28}:{wx:24,wy:82,ww:672,wh:270,lx:44,ly:150,lw:632,lh:200,hx:24,hy:26};
    const f=t*6,k=clamp(Math.floor(f),0,5),u=clamp(f-k),a=ease(ramp(u,0,.45));
    let s=`<rect x="${L.wx}" y="${L.wy}" width="${L.ww}" height="${L.wh}" rx="10" style="fill:var(--field)"/>`;
    /* the distress wave, behind the stairs */
    const w=wave(L.wx,L.wy+10,L.ww,L.wh-14,F,{upto:t,col:'var(--storm)',fill:true,thr:.72,dot:true});
    s+=`<g style="opacity:.75">${w.svg}</g>`;
    s+=tx(L.wx+10,L.wy+18,'distress (schematic)','t-xs','fill:var(--storm)')+tx(L.wx+10,L.wy+10+(L.wh-14)*.28-5,'very intense','t-xs','fill:var(--storm)');
    const v=F(t);s+=tx(L.wx+L.ww-10,L.wy+18,t<F.peakAt?'rising':v>.5?'cresting, then easing':v>.3?'passing':'settling','t-xs t-end','fill:var(--storm)');
    /* the stairs rise one at a time: a clip reveals finished steps and the growing current one */
    const n=6,sw=L.lw/n,sh=L.lh/n,bot=L.ly+L.lh;let clip='';
    for(let j=0;j<=k;j++){const hj=sh*(j+1)*(j<k?1:a);clip+=`<rect x="${f1(L.lx+sw*j)}" y="${f1(bot-hj)}" width="${f1(sw)}" height="${f1(hj)}"/>`}
    for(let j=k+1;j<n;j++){const hj=sh*(j+1);s+=`<rect x="${f1(L.lx+sw*j)}" y="${f1(bot-hj)}" width="${f1(sw-3)}" height="${f1(hj)}" rx="6" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:4 4"/>`}
    const ld=ladder(L.lx,L.ly,L.lw,L.lh,CS_LBL[N?'n':'w'],{at:k,col:'var(--accent)',done:true});
    s+=`<defs><clipPath id="csClip">${clip}</clipPath></defs><g clip-path="url(#csClip)">${ld.svg}</g>`;
    for(let j=0;j<=k;j++){const c=ld.top(j),hj=sh*(j+1)*(j<k?1:a);if(hj<40)continue;
      s+=tx(c[0]-1.5,bot-hj+34,j+1,'t-big t-mid',j===k?'fill:var(--on-brand);opacity:.9':'fill:var(--accent);opacity:.8')}
    /* the person stands on the step that is rising */
    const c=ld.top(k),py=bot-sh*(k+1)*a;
    s+=person(c[0]-1.5,py-32,30,'var(--self)');
    /* header: what this step means, in the chosen view */
    const T=CS_TXT[view][k];
    s+=tx(L.hx,L.hy,`${k+1} · ${CS_STEPS[k].t}`,'t-lbl',N?'font-size:15px':'')+tx(N?384:696,L.hy,view==='me'?'PERSONAL VIEW':'CLINICIAN VIEW','t-xs t-end','fill:var(--accent);font-weight:700');
    const fs=N?'fill:var(--ink);font-size:12.5px':'fill:var(--ink)';s+=tx(L.hx,L.hy+(N?24:20),T[0],'t-sm',fs)+tx(L.hx,L.hy+(N?42:36),T[1],'t-sm',fs);
    svg.innerHTML=s;
    const p=phaseOf(CS_STEPS,t);setSt(p);
    $('#csNote').innerHTML=noteHTML(CS_STEPS[p])+(view==='clin'?`<div class="kv"><div><dt>The clinician's part</dt><dd>${CS_CLIN[p]}</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#csPlay'),draw,30000,'%t:player.replay%','crisis');
  const setSt=stepWire($('#csSteps'),CS_STEPS,rg,draw,stop);
  $$('[data-csview]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.csview;$$('[data-csview]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- chronic vs acute: schematic ---- */
  const rs=$('#csRisk'),rr=$('#csRiskT');const show={chronic:true,acute:true};
  const SP=[[.08,.42],[.19,.36],[.31,.3],[.46,.2],[.68,.12]];
  const chron=u=>.44-.24*u+.015*Math.sin(u*40);
  const spk=u=>SP.reduce((m,[c,h])=>m+h*Math.exp(-Math.pow((u-c)/.018,2)),0);
  const tot=u=>chron(u)+spk(u);
  function drawR(t){const N=vb(rs,'720 300','400 320');
    const C=N?{x:40,y:30,w:340,h:250,ax:300}:{x:56,y:24,w:620,h:210,ax:252};
    let s='';const Y=v=>C.y+C.h*(1-v);
    [.25,.5,.75].forEach(g=>{s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(Y(g))}" y2="${f1(Y(g))}" class="grid"/>`});
    s+=`<line x1="${C.x}" x2="${C.x}" y1="${C.y}" y2="${C.y+C.h}" class="axis"/>`;
    s+=`<text transform="translate(${C.x-14} ${C.y+C.h/2}) rotate(-90)" class="t-xs t-mid">suicidal thinking (schematic)</text>`;
    const tl=tline(C.x,C.y+C.h,C.w,{min:0,max:10,step:N?2:1,fmt:v=>v,label:'years'});s+=tl.svg;
    if(show.acute){s+=`<path d="${pathFn(u=>tot(u*t),C.x,C.x+C.w*t,C.y+C.h,C.y,Math.max(2,Math.round(400*t)))}" style="fill:none;stroke:var(--storm);stroke-width:2.4;stroke-linejoin:round"/>`}
    if(show.chronic){s+=`<path d="${pathFn(u=>chron(u*t),C.x,C.x+C.w*t,C.y+C.h,C.y,Math.max(2,Math.round(120*t)))}" style="fill:none;stroke:var(--mood);stroke-width:2.4;stroke-dasharray:7 5"/>`}
    const inSp=SP.find(([c])=>Math.abs(t-c)<.035);
    const cx=C.x+C.w*t,cy=Y(show.acute?tot(t):chron(t));
    if(show.acute||show.chronic)s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5.5" style="fill:${inSp&&show.acute?'var(--storm)':'var(--mood)'};stroke:var(--panel);stroke-width:2"/>`;
    /* labels */
    if(show.chronic&&t>.55)s+=tx(C.x+C.w*(N?.4:.55),Y(chron(.55))+20,N?'chronic baseline':'chronic baseline: slowly falling','t-xs','fill:var(--mood)');
    if(show.acute&&t>.1){const [c,h]=SP[0];s+=tx(C.x+C.w*c+10,Y(chron(c)+h)+4,'acute crisis','t-xs','fill:var(--storm)')}
    if(show.acute&&t>.5)s+=tx(C.x+C.w*.46+10,Y(chron(.46)+.2)+4,'fewer, lower','t-xs','fill:var(--storm)');
    rs.innerHTML=s;
    const yr=(t*10).toFixed(1);
    const ac=inSp&&show.acute;
    $('#csRiskNote').innerHTML=noteHTML(ac?{k:`Year ${yr} · acute`,t:'An acute rise',
      txt:`A rise above the person's usual level, often after a trigger. The response is the safety plan, crisis contact and an assessment focused on needs and safety, with a risk formulation rather than a score. [[NICE2022NG225]] NICE CG78 asks clinicians to explore other options before considering admission, keeping admission for crises with significant risk that cannot be managed elsewhere, with its length and purpose agreed in advance. [[NICE2009]]`,
      pt:`A crisis is a time to use your plan and reach out. It is temporary, even when it does not feel that way.`,
      hook:`Acute risk: safety plan, crisis team, follow-up. NICE CG78: consider a crisis or home treatment team before admission. [[NICE2009]]`}
     :{k:`Year ${yr} · chronic`,t:'The chronic baseline',
      txt:`Long-standing suicidal thoughts that, in outpatient therapy, "can be best understood as a way of communicating distress". [[Paris2002Chronic]] The response is steady, ongoing treatment: specifically designed psychotherapies have the best evidence, and hospitalisation has not been shown to be useful for chronic suicidality. [[Paris2019Suicidality]] Over years, ideation, attempts and self-injury diminished markedly in a 14-year cohort. [[Soloff2019Suicidal]]`,
      pt:`Living with suicidal thoughts for a long time is common in BPD, and those thoughts usually fade as treatment and life go on.`,
      hook:`Chronic suicidality → long-term psychotherapy; acute rise → crisis response. Hospitalisation is of unproven value for chronic suicidality (review opinion). [[Paris2002Chronic]]`});
  }
  const stopR=playWire(rr,$('#csRiskPlay'),drawR,14000,'%t:player.replay%','crisis');
  $$('[data-csline]').forEach(b=>b.addEventListener('click',()=>{show[b.dataset.csline]=!show[b.dataset.csline];b.setAttribute('aria-pressed',show[b.dataset.csline]);drawR(+rr.value)}));
  drawR(+rr.value);

  /* ---- long-term outcomes icon array ---- */
  const os=$('#csOut');let ds=0,rev=1,stopO=null;
  function drawO(){const N=vb(os,'720 230','400 430');const D=CS_OUT[ds];
    const cols=N?10:20,cw=N?36:33,ch=N?38:40,x0=N?(400-cols*cw)/2:(720-cols*cw)/2,y0=14;let s='';
    const lim=Math.round(100*rev);
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),q=i%cols;
      /* alive first, then other causes, then suicide at the end so the majority reads first */
      const g=i<100-D.s-D.o?0:i<100-D.s?1:2,col=g===0?'var(--accent)':g===1?'var(--muted)':'var(--storm)';
      s+=person(x0+q*cw+cw/2,y0+r*ch,ch*.72,i<lim?col:'var(--panel-2)',{op:g===1?.55:1})}
    const yb=y0+(100/cols)*ch+(N?14:12);
    s+=`<text x="${f1(x0)}" y="${f1(yb)}" class="t-xs">${N?'each figure = 1 in 100 · population statistic':D.n+' · each figure = 1 in 100 · population statistic'}</text>`;
    os.innerHTML=s;
    $('#csOutRead').innerHTML=D.read.map(([a,b],i)=>`<div><small>${a}</small><b class="cs-big" style="${i?'color:var(--ink)':''}">${b}</b></div>`).join('');
    $('#csOutNote').innerHTML=noteHTML({k:'Population statistics',t:D.n.split(' · ')[0],txt:D.txt,
      pt:`Most people with BPD do not die by suicide, and suicidal behaviour usually becomes less frequent with time and treatment.`,
      hook:`About 1 in 10 or fewer (5.9–10.3% in long cohorts; 6% pooled) die by suicide; the risk is real, and so is recovery. [[Temes2019,Paris2001,Lak2025]]`})
      +`<div class="kv"><div><dt>Legend</dt><dd><span style="color:var(--accent);font-weight:700">alive or not known to have died</span> · <span style="color:var(--muted);font-weight:700">died of other causes</span> · <span style="color:var(--storm);font-weight:700">died by suicide</span></dd></div></div>`;
  }
  function runO(){if(stopO)stopO();rev=0;stopO=animate(800,p=>{rev=p;drawO()},()=>{stopO=null})}
  $$('[data-csout]').forEach(b=>b.addEventListener('click',()=>{ds=+b.dataset.csout;$$('[data-csout]').forEach(x=>x.setAttribute('aria-pressed',x===b));runO()}));
  drawO();
  const prevR=redraws.crisis;redraws.crisis=()=>{prevR&&prevR();drawO()};
  const prevH=onHide.crisis;onHide.crisis=()=>{prevH&&prevH();if(stopO){stopO();stopO=null;rev=1}};
};
