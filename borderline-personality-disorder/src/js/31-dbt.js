/* =============== 3.1 dialectical behaviour therapy =============== */
const DB_PROG={
 std:{W:52,n:'Standard DBT',short:'12 months',
  end:{k:'Week 52 · end of the year',t:'What a year of DBT showed',
   txt:`In the first trial, a year of DBT meant fewer and less medically severe parasuicidal acts, more people staying in therapy and fewer inpatient days than usual care. [[Linehan1991]] Against expert community therapists, people in DBT were "half as likely to make a suicide attempt" over 2 years (hazard ratio 2.66), with fewer hospital admissions and lower dropout. [[Linehan2006]] Against general psychiatric management, both improved and no outcome differed. [[McMain2009]] Two years later, about two-thirds were in diagnostic remission. [[McMain2012]] These are group results from trials, not a promise for one person.`,
   pt:`After a year, many people self-harm less, go to hospital less and stay in treatment. Other well-organised care can help as much.`,
   hook:`Linehan 2006: DBT vs expert therapy, suicide attempts HR 2.66, dropout HR 3.2. [[Linehan2006]]`}},
 six:{W:26,n:'6-month DBT',short:'6 months',
  end:{k:'Week 26 · end of treatment',t:'Is 6 months enough?',
   txt:`McMain 2022 randomised 240 suicidal or self-harming people with BPD (mean age 28; 79% female) to 6 or 12 months of comprehensive DBT. Six months was non-inferior for total self-harm at 6, 12 and 24 months, gave faster falls in BPD symptoms and general psychopathology, and dropout did not differ. [[McMain2022]] NICE CG78 still advises against BPD-specific interventions shorter than 3 months outside a structured service. [[NICE2009]]`,
   pt:`In one large trial, half a year of DBT worked as well as a full year for self-harm.`,
   hook:`McMain 2022: DBT-6 non-inferior to DBT-12 for self-harm up to 24 months. [[McMain2022]]`}},
 ado:{W:19,n:'DBT-A',short:'19 weeks',
  end:{k:'Week 19 · end of treatment',t:'What DBT-A showed',
   txt:`In Mehlum 2014, 77 adolescents with recent, repeated self-harm received 19 weeks of DBT-A or enhanced usual care; DBT-A reduced self-harm, suicidal ideation and depressive symptoms more. [[Mehlum2014]] At 1 year it stayed ahead for self-harm frequency [[Mehlum2016]]; at 12.4 years self-harm episodes were more than twice as common after usual care, a difference that was not statistically significant at the last follow-up. [[Mehlum2026]] In McCauley 2018 (173 adolescents, 6 months), 90.3% with DBT made no suicide attempt against 78.9% with supportive therapy. [[McCauley2018]]`,
   pt:`Teenagers who self-harmed did so less after a few months of DBT for adolescents than with usual care.`,
   hook:`McCauley 2018: no suicide attempt 90.3% vs 78.9% (OR 0.30); completion 75.6% vs 55.2%. [[McCauley2018]]`}}
};
function dbSteps(p){const P=DB_PROG[p];return [
 {from:0,at:.015,k:'Before week 1',t:'Orientation and commitment',
  txt:`DBT starts with orientation and a commitment to reducing life-threatening behaviour. Its risk-management toolkit is the diary card, chain analysis, solution analysis, phone coaching and the consultation team. [[Alba2022DBT]] Any version of DBT must serve five functions: building capabilities, generalising them to daily life, improving motivation and reducing dysfunctional behaviour, keeping therapists capable and motivated, and structuring the environment. [[Chapman2006DBT]]`,
  pt:`At the start you and your therapist agree on goals and on what therapy will work on first.`,
  hook:`DBT's five functions: enhance capabilities, generalise them, improve motivation, support the therapist, structure the environment. [[Chapman2006DBT]]`},
 {from:.06,at:.1,k:'Every week',t:'Four modes, running together',
  txt:`Standard DBT runs weekly individual therapy (about 1 hour), a weekly skills group (about 1.5–2.5 hours, usually 4 to 10 members) and a weekly consultation team for the therapists (about 1–2 hours). Between sessions the individual therapist can be phoned for coaching, to help the person use skills when they are most needed, for example in a crisis: this serves the "generalisation" function. [[Chapman2006DBT,LinehanWilks2015]]`,
  pt:`Each week there is one-to-one therapy and a skills class, and you can call your therapist for quick coaching between sessions.`,
  hook:`Four modes: individual therapy, skills group, phone coaching, therapist consultation team. [[LinehanWilks2015]]`},
 {from:.18,at:.22,k:'Each session',t:'The target hierarchy',
  txt:`Each week the person fills in a diary card tracking targets such as self-harm, suicide attempts and emotional misery; the therapist uses it to set the agenda. Session time goes first to behaviours that threaten life, then to behaviours that interfere with therapy (missed sessions, lateness, non-collaboration), then to behaviours that interfere with quality of life. [[Chapman2006DBT]] Watch the ladder: the highest step present comes first.`,
  pt:`Safety comes first in every session, then anything that gets in the way of therapy, then the rest of life.`,
  hook:`DBT target priority: life-threatening → therapy-interfering → quality-of-life-interfering. [[Chapman2006DBT]]`},
 {from:.38,at:.5,k:'In the skills group',t:'Four skills modules',
  txt:`The group teaches four skills areas: mindfulness (attention to the present moment), distress tolerance (surviving crises without making things worse), emotion regulation and interpersonal effectiveness. Sessions combine teaching, practice, discussion and homework. [[Chapman2006DBT]] In a component trial, the arms that included skills training reduced non-suicidal self-injury more than DBT without skills. [[Linehan2015]]`,
  pt:`The skills class teaches four things: staying present, getting through a crisis, handling strong feelings and asking for what you need.`,
  hook:`Linehan 2015: skills training drives the extra drop in non-suicidal self-injury; dropout 24% with standard DBT vs 48% without skills. [[Linehan2015]]`},
 {from:.58,at:.66,k:'When something happens',t:'Chain analysis and coaching',
  txt:`When a target behaviour happens, therapist and patient map the chain that led to it and the consequences that may keep it going, then look for more skilful alternatives. [[Chapman2006DBT,Lynch2006DBT]] Lynch and colleagues distil DBT's proposed mechanism to "the reduction of ineffective action tendencies linked with dysregulated emotions". <span class="ev hyp">Hypothesis</span> [[Lynch2006DBT]] Build a chain yourself below.`,
  pt:`After a hard moment, you trace step by step what led there, and find the point where a skill could have changed the ending.`,
  hook:`Chain analysis = vulnerability → prompting event → links → behaviour → consequences, then solution analysis. [[Chapman2006DBT,Alba2022DBT]]`},
 Object.assign({from:.86,at:1},P.end)
]}
const DB_CHAIN=[
 {n:'Vulnerability',ex:['slept 4 hours,','skipped meals'],sk:'Emotion regulation',do:['look after sleep and food','to lower vulnerability'],
  txt:`The chain often starts before the trigger: poor sleep, hunger, illness or stress make emotions easier to set off. Emotion regulation is one of the four skills modules. [[Chapman2006DBT]] Changing the earliest link makes every later link weaker.`,
  pt:`A tired, hungry body reacts faster. Looking after basics is a real skill, not a small thing.`},
 {n:'Prompting event',ex:['a friend','cancels by text'],sk:'Interpersonal effectiveness',do:['ask what happened,','say what you need'],
  txt:`The prompting event is often interpersonal. Interpersonal effectiveness is the skills module for asking for what you need in relationships. [[Chapman2006DBT]] In daily life, rejection is followed by hostility and sadness more strongly in BPD. [[Hepp2018]]`,
  pt:`Checking what the message meant, and asking for what you need, can change what happens next.`},
 {n:'Thoughts',ex:['"they don\'t','want me around"'],sk:'Mindfulness',do:['notice the thought','as a thought'],
  txt:`Mindfulness, attention to the present moment, is one of the four skills areas and one of DBT's essential acceptance-based elements. [[Chapman2006DBT]] Noticing an interpretation as an interpretation leaves room before acting on it.`,
  pt:`A thought is not a fact. Seeing it as "just a thought" can slow everything down.`},
 {n:'Emotions',ex:['shame, fear,','anger'],sk:'Emotion regulation',do:['name the emotion,','let it rise and fall'],
  txt:`Not being able to name emotions was linked to distress in BPD in daily life. [[EbnerPriemer2008]] DBT keeps a focus on emotions and the biosocial theory at its core, and emotion regulation is taught in the group. [[Chapman2006DBT]] See <a href="#emotion" data-go="emotion">The emotion wave</a>.`,
  pt:`Putting a name to the feeling is the first step to riding it out.`},
 {n:'Urge',ex:['urge to act','on it, now'],sk:'Distress tolerance',do:['get through the peak','without making it worse'],
  txt:`Distress tolerance is the module for surviving crises without making things worse. [[Chapman2006DBT]] Urges build and then pass: in one study most thoughts of self-injury lasted 1–30 minutes. [[Nock2009]] Phone coaching exists for exactly this moment. [[Chapman2006DBT]]`,
  pt:`An urge is a wave too. It peaks and passes, often within minutes, and a call for coaching can help get through it.`},
 {n:'Behaviour',ex:['the target','behaviour','(kept abstract)'],sk:'Phone coaching',do:['call for skills','coaching instead'],
  txt:`Between sessions the individual therapist is available by phone to help apply skills when they are most needed, for example in a crisis. [[Chapman2006DBT]] Skills training arms in the component trial reduced non-suicidal self-injury more than DBT without skills. [[Linehan2015]]`,
  pt:`At the moment of acting, reaching out for coaching is itself the skilful behaviour.`},
 {n:'Consequences',ex:['brief relief,','then shame;','friend upset'],sk:'Solution analysis',do:['change what keeps','the chain going'],
  txt:`Chain analysis also asks which consequences may be maintaining the behaviour; solution analysis then finds more skilful alternatives. [[Chapman2006DBT,Alba2022DBT]] Short-term relief can reinforce a behaviour even when negative emotion rises again in the following hours. [[Klonsky2007,Houben2017]]`,
  pt:`Quick relief can keep a habit going. Seeing that clearly, without blame, is how the next chain gets shorter.`}
];
const DB_FLIPS=[
 ['Skills module','Mindfulness','Attention to the present moment. One of DBT\'s essential elements, with acceptance-oriented interventions. [[Chapman2006DBT]]'],
 ['Skills module','Distress tolerance','Surviving crises without making things worse. [[Chapman2006DBT]]'],
 ['Skills module','Emotion regulation','Handling strong feelings: one of the four areas taught in the weekly skills group. [[Chapman2006DBT]]'],
 ['Skills module','Interpersonal effectiveness','Asking for what you need in relationships, and keeping them. [[Chapman2006DBT]]'],
 ['Tool','Diary card','A weekly self-monitoring form tracking targets such as self-harm, suicide attempts and emotional misery; it sets the session agenda. [[Chapman2006DBT]]'],
 ['Tool','Chain analysis','Working out what led up to a behaviour and what keeps it going, then finding skilful alternatives. [[Chapman2006DBT,Lynch2006DBT]]'],
 ['Mode','Phone coaching','The therapist can be phoned between sessions to help use skills when most needed, for example in a crisis. [[Chapman2006DBT]]'],
 ['Mode','Consultation team','Therapists meet weekly for about 1–2 hours to stay compassionate and non-judgemental and to reduce burnout. [[Chapman2006DBT]]'],
 ['Idea','Dialectics','DBT holds a dialectical philosophy at its core, with the biosocial theory and a focus on emotions. [[Chapman2006DBT]] Proposed mechanisms include validation, mindfulness and dialectics. [[Lynch2006DBT]]'],
 ['Idea','The five functions','Enhance capabilities, generalise them, improve motivation and reduce dysfunctional behaviour, support the therapists, structure the environment. [[Chapman2006DBT]]']
];
const DB_CO={
 all:{n:'All BPD psychotherapies vs usual care',rows:[
  ['BPD severity',-.52,-.70,-.33,'moderate','22 trials'],
  ['Self-harm',-.32,-.49,-.14,'low','13 trials'],
  ['Suicide-related outcomes',-.34,-.57,-.11,'low','13 trials'],
  ['Psychosocial functioning',-.45,-.68,-.22,'low','22 trials']],
  note:{k:'Cochrane 2020 · 75 RCTs · 4,507 people',t:'Only severity clears the bar',
   txt:`Across BPD psychotherapies against usual care, BPD severity fell by SMD −0.52 (moderate certainty), about −3.6 points on the 0–36 ZAN-BPD, above the 3.0-point minimal clinically relevant difference. "Only the outcome of BPD severity reached the MIREDIF-defined cut-off for a clinically meaningful improvement", and subgroups found no clear difference between therapy types. [[Storebo2020]] The 2012 review had concluded that "none of the treatments has a very robust evidence base". [[Stoffers2012]]`,
   pt:`On average, specialised therapy helps more than usual care, most clearly for overall BPD symptoms.`,
   hook:`Cochrane 2020: BPD severity SMD −0.52 (moderate certainty), the only outcome above the clinically meaningful threshold. [[Storebo2020]]`}},
 dbt:{n:'DBT vs usual care',rows:[
  ['BPD severity',-.60,null,null,'low','3 trials'],
  ['Self-harm',-.28,-.48,-.07,'low','7 trials'],
  ['Psychosocial functioning',-.36,null,null,'low','6 trials']],
  note:{k:'Cochrane 2020 · DBT subgroup',t:'Consistent, low-certainty gains',
   txt:`DBT was the subject of about a third of the 75 trials. Against usual care it reduced BPD severity (SMD −0.60, 3 trials), self-harm (−0.28, 7 trials) and improved psychosocial functioning (−0.36, 6 trials), all at low certainty. [[Storebo2020,StoffersWinterling2022BJP]] A focused 2022 analysis found standalone DBT reduced self-harm (SMD −0.54) and add-on DBT skills training reduced BPD severity (SMD −0.66, moderate certainty). [[StoffersWinterling2022BJP]] Cristea 2017 found small effects that shrank when risk of bias was accounted for. [[Cristea2017]]`,
   pt:`DBT helps on average, but the studies are small and the size of the benefit is uncertain.`,
   hook:`Add-on DBT skills training: BPD severity SMD −0.66 (moderate certainty). [[StoffersWinterling2022BJP]]`}}
};
inits.dbt=()=>{
  const svg=$('#dbSvg'),rg=$('#dbT');let pg='std',STEPS=dbSteps(pg),setSt=()=>{};
  const PH=rng(7),COACH=[];for(let i=0;i<60;i++)COACH.push(PH()<.32);
  const MODS=[{k:'DT',n:'Distress tolerance',c:'var(--accent)',a0:-90},{k:'ER',n:'Emotion regulation',c:'var(--mood)',a0:30},{k:'IE',n:'Interpersonal effectiveness',c:'var(--other)',a0:150}];
  const ROWS=[{n:'Individual therapy',s:'weekly · about 1 h',c:'var(--rx)',on:()=>1},{n:'Skills group',s:'weekly · 1.5–2.5 h',c:'var(--accent)',on:()=>1},
    {n:'Phone coaching',s:'between sessions',c:'var(--gold)',on:w=>COACH[w]},{n:'Consultation team',s:'therapists · 1–2 h',c:'var(--brand)',on:()=>1}];
  const rad=a=>a*Math.PI/180,pt=(cx,cy,r,a)=>[cx+r*Math.cos(rad(a)),cy+r*Math.sin(rad(a))];
  function sector(cx,cy,r1,r2,a0,a1){if(a1-a0<.05)return '';const L=a1-a0>180?1:0,[x1,y1]=pt(cx,cy,r2,a0),[x2,y2]=pt(cx,cy,r2,a1),[x3,y3]=pt(cx,cy,r1,a1),[x4,y4]=pt(cx,cy,r1,a0);
    return `M${f1(x1)} ${f1(y1)}A${r2} ${r2} 0 ${L} 1 ${f1(x2)} ${f1(y2)}L${f1(x3)} ${f1(y3)}A${r1} ${r1} 0 ${L} 0 ${f1(x4)} ${f1(y4)}Z`}
  function draw(t){const NR=vb(svg,'720 420','400 740'),P=DB_PROG[pg],W=P.W,wk=t*W,ph=phaseOf(STEPS,t);
    const L=NR?{cx:200,cy:178,R:112,r0:44,wkY:330,mt:368,mx0:16,cx0:150,cx1:374,ry:382,rh:38,tlY:540,lt:578,lx:20,ly:590,lw:360,lh:110,ft:730}
              :{cx:168,cy:184,R:118,r0:46,wkY:350,mt:28,mx0:336,cx0:466,cx1:704,ry:42,rh:40,tlY:212,lt:248,lx:340,ly:258,lw:364,lh:112,ft:404};
    let s=`<text x="${NR?16:40}" y="28" class="t-sm" style="fill:var(--rx)">SKILLS GROUP · FOUR MODULES</text>`;
    /* ---- skills ring ---- */
    const third=W/3,mi=Math.min(2,Math.floor(wk/third));
    MODS.forEach((m,i)=>{const a0=m.a0,a1=a0+120,pr=ramp(wk,i*third,(i+1)*third),on=i===mi&&t>.02;
      s+=`<path d="${sector(L.cx,L.cy,L.r0+4,L.R,a0+1.5,a1-1.5)}" style="fill:var(--panel-2);stroke:${on?m.c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      if(pr>0)s+=`<path d="${sector(L.cx,L.cy,L.r0+4,L.R,a0+1.5,a0+1.5+(117)*pr)}" style="fill:${m.c};opacity:${on?.62:.4}"/>`;
      const [lx,ly]=pt(L.cx,L.cy,(L.r0+L.R)/2+4,a0+60),w=m.n.split(' ');
      s+=`<text x="${f1(lx)}" y="${f1(ly-3)}" class="t-lbl t-mid" style="font-size:12px">${w[0]}</text><text x="${f1(lx)}" y="${f1(ly+11)}" class="t-lbl t-mid" style="font-size:12px">${w.slice(1).join(' ')}</text>`;
      if(pr>0&&pr<1&&on){const [px,py]=pt(L.cx,L.cy,L.R+8,a0+1.5+117*pr);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="5" style="fill:${m.c};stroke:var(--panel);stroke-width:2"/>`}});
    /* mindfulness at the centre glows at the start of each module (schematic) */
    const mf=t>.01?Math.max(...[0,1,2].map(i=>bump(wk,i*third-.5,i*third+Math.max(2,W*.05)))):0;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r0}" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:${f1(1.2+mf*2)}"/>`;
    if(mf>0)s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${f1(L.r0*(.5+.5*mf))}" style="fill:var(--rx);opacity:${f1(.15+.25*mf)}"/>`;
    s+=`<text x="${L.cx}" y="${L.cy+4}" class="t-lbl t-mid" style="font-size:12px">Mindfulness</text>`;
    s+=`<text x="${L.cx}" y="${L.wkY}" class="t-big t-mid">${t<.01?'Before week 1':`Week ${Math.max(1,Math.ceil(wk))} of ${W}`}</text>`;
    s+=`<text x="${L.cx}" y="${L.wkY+18}" class="t-xs t-mid">${P.n} · module: ${t<.01?'none yet':MODS[mi].n.toLowerCase()}</text>`;
    /* ---- the four modes, week by week ---- */
    s+=`<text x="${L.mx0}" y="${L.mt}" class="t-sm" style="fill:var(--rx)">FOUR MODES · WEEK BY WEEK</text>`;
    const X=w=>lerp(L.cx0,L.cx1,w/W),cw=(L.cx1-L.cx0)/W,lit=ph>=1||t>.06;
    ROWS.forEach((r,i)=>{const y=L.ry+i*L.rh,act=lit&&(ph!==0);
      s+=`<text x="${L.mx0}" y="${y+12}" class="t-lbl" style="font-size:12px;opacity:${act?1:.55}">${r.n}</text><text x="${L.mx0}" y="${y+25}" class="t-xs">${r.s}</text>`;
      for(let w=0;w<W;w++){const done=w<wk,on=r.on(w),cur=w===Math.floor(wk)&&t>.01;
        s+=`<rect x="${f1(X(w)+cw*.12)}" y="${y+4}" width="${f1(Math.max(1.5,cw*.76))}" height="22" rx="${f1(Math.min(3,cw*.3))}" style="fill:${done&&on?r.c:'var(--panel-2)'};opacity:${done&&on?.85:on?1:.45};${cur?`stroke:${r.c};stroke-width:1.5`:''}"/>`}});
    const tl=tline(L.cx0,L.tlY,L.cx1-L.cx0,{min:0,max:W,step:W===52?13:W===26?13:W===19?19:10,fmt:v=>v?'wk '+v:'0'});s+=tl.svg;
    s+=`<line x1="${f1(X(Math.min(W,wk)))}" x2="${f1(X(Math.min(W,wk)))}" y1="${L.ry-2}" y2="${L.tlY}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    /* ---- target hierarchy ---- */
    let at=-1;if(ph===2)at=2-Math.min(2,Math.floor(ramp(t,.18,.38)*3));else if(ph===4)at=2;
    s+=`<text x="${L.lx}" y="${L.lt}" class="t-sm" style="fill:var(--rx)">SESSION AGENDA · PRIORITY RISES →</text>`;
    const LD=ladder(L.lx,L.ly,L.lw,L.lh,['Quality of life','Therapy-interfering','Life-threatening'],{at,col:'var(--rx)'});s+=LD.svg;
    ['3rd','2nd','1st'].forEach((n,i)=>{const [x,y]=LD.top(i);s+=`<text x="${f1(x)}" y="${f1(y+(L.lh/3)*(i+1)-8)}" class="t-xs t-mid" style="fill:${i===at?'var(--on-brand)':'var(--muted)'}">${n}</text>`});
    s+=`<text x="${NR?200:L.cx}" y="${L.ft}" class="t-xs t-mid" style="fill:var(--warn)">SCHEMATIC · pacing and coaching weeks illustrative</text>`;
    svg.innerHTML=s;
    setSt(ph);
    $('#dbNote').innerHTML=noteHTML(STEPS[ph]);
    const n=Math.min(W,Math.ceil(wk));
    $('#dbRead').innerHTML=`<span>week <b>${n} of ${W}</b></span><span>individual therapy <b>≈${n} h</b></span><span>skills group <b>≈${f1(n*1.5).replace('.0','')}–${f1(n*2.5).replace('.0','')} h</b></span><span>coaching weeks (illustrative) <b>${COACH.slice(0,n).filter(Boolean).length}</b></span>`;
  }
  const stop=playWire(rg,$('#dbPlay'),draw,24000,'%t:player.replay%','dbt');
  function wire(){const old=$('#dbSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-dbv]').forEach(b=>b.addEventListener('click',()=>{stop();pg=b.dataset.dbv;STEPS=dbSteps(pg);$$('[data-dbv]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- chain analysis builder ---- */
  const cs=$('#dbChSvg');let cut=4,CG=null;
  $('#dbCut').innerHTML='<span class="kicker" style="align-self:center">Skill goes in at</span>'+DB_CHAIN.map((c,i)=>`<button class="btn" data-cut="${i}" aria-pressed="${i===cut}">${c.n}</button>`).join('');
  function drawC(){const NR=vb(cs,'720 300','400 590');let s=`<defs>${marker('dbArr','var(--muted)')}${marker('dbArrA','var(--accent)')}</defs>`;
    const box=i=>NR?{x:14,y:14+i*80,w:200,h:62}:{x:12+i*100,y:30,w:90,h:92};CG={NR,box};
    DB_CHAIN.forEach((c,i)=>{const b=box(i),after=i>cut,on=i===cut;
      if(i){const p=box(i-1);s+=NR?`<path d="M${b.x+40} ${p.y+p.h-6}V${b.y+6}M${b.x+56} ${p.y+p.h-6}V${b.y+6}" style="stroke:var(--muted);stroke-width:2;opacity:${after?.3:.8}"/>`
        :`<path d="M${p.x+p.w-6} ${b.y+38}H${b.x+6}M${p.x+p.w-6} ${b.y+54}H${b.x+6}" style="stroke:var(--muted);stroke-width:2;opacity:${after?.3:.8}"/>`}
      s+=`<g class="clk" data-ci="${i}" style="opacity:${after?.32:1}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${NR?22:30}" style="fill:${on?'var(--accent-soft)':'var(--panel)'};stroke:${on?'var(--accent)':i===5?'var(--storm)':'var(--line)'};stroke-width:${on?2.6:1.6}"/>`;
      if(NR)s+=`<text x="${b.x+18}" y="${b.y+25}" class="t-lbl" style="font-size:12.5px">${i+1}. ${c.n}</text><text x="${b.x+18}" y="${b.y+44}" class="t-xs">${c.ex.join(' ').replace(/"/g,'&quot;')}</text>`;
      else s+=`<text x="${b.x+b.w/2}" y="${b.y+30}" class="t-lbl t-mid" style="font-size:11.5px">${c.n.split(' ')[0]}</text>${c.n.split(' ')[1]?`<text x="${b.x+b.w/2}" y="${b.y+44}" class="t-lbl t-mid" style="font-size:11.5px">${c.n.split(' ')[1]}</text>`:''}`+
        c.ex.map((e,k)=>`<text x="${b.x+b.w/2}" y="${b.y+(c.n.includes(' ')?62:54)+k*12}" class="t-xs t-mid" style="font-size:8.6px">${e.replace(/"/g,'&quot;')}</text>`).join('');
      s+='</g>'});
    /* the skill drops in */
    const c=DB_CHAIN[cut],b=box(cut);
    const S=NR?{x:236,y:clamp(b.y-14,8,590-110),w:154,h:96}:{x:clamp(b.x+b.w/2-92,8,712-184),y:172,w:184,h:84};
    s+=NR?`<path d="M${b.x+b.w} ${b.y+b.h/2}H${S.x-4}" style="stroke:var(--accent);stroke-width:2" marker-end="url(#dbArrA)"/>`
         :`<path d="M${b.x+b.w/2} ${b.y+b.h}V${S.y-4}" style="stroke:var(--accent);stroke-width:2" marker-end="url(#dbArrA)"/>`;
    s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="12" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.8"/>`+
      `<text x="${S.x+S.w/2}" y="${S.y+18}" class="t-xs t-mid" style="fill:var(--accent);font-weight:600">SKILL</text>`+
      `<text x="${S.x+S.w/2}" y="${S.y+36}" class="t-lbl t-mid" style="font-size:${c.sk.length>20?11:12.5}px">${c.sk}</text>`+
      c.do.map((d,k)=>`<text x="${S.x+S.w/2}" y="${S.y+56+k*13}" class="t-xs t-mid">${d}</text>`).join('');
    if(cut<6){const e=box(6);
      s+=NR?`<path d="M${S.x+S.w/2} ${S.y+S.h+2}V${e.y+e.h/2}" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 5" marker-end="url(#dbArrA)"/><text x="${S.x+S.w/2+6}" y="${(S.y+S.h+e.y+e.h/2)/2}" class="t-xs" style="fill:var(--accent)">a different</text><text x="${S.x+S.w/2+6}" y="${(S.y+S.h+e.y+e.h/2)/2+12}" class="t-xs" style="fill:var(--accent)">ending</text>`
        :(S.x+S.w<640?`<path d="M${S.x+S.w+2} ${S.y+S.h/2}H${e.x+e.w/2}V${e.y+e.h+4}" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 5" marker-end="url(#dbArrA)"/><text x="${(S.x+S.w+e.x+e.w/2)/2}" y="${S.y+S.h/2-6}" class="t-xs t-mid" style="fill:var(--accent)">a different ending</text>`:'')}
    s+=`<text x="${NR?14:12}" y="${NR?584:290}" class="t-xs">${NR?'':'Faded links: what the skill can change. '}Link ${cut+1} of 7: ${c.n.toLowerCase()}</text>`;
    cs.innerHTML=s;
    $$('[data-cut]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.cut===cut));
    $('#dbChNote').innerHTML=noteHTML({k:`Link ${cut+1} · ${c.n}`,t:`Break it with ${c.sk.toLowerCase()}`,txt:c.txt,pt:c.pt,
      hook:cut===6?`Chain analysis looks backward to the vulnerability and forward to the consequences that maintain the behaviour. [[Chapman2006DBT]]`:cut===4?`Distress tolerance = surviving crises without making things worse. [[Chapman2006DBT]]`:null});
  }
  $('#dbCut').addEventListener('click',e=>{const b=e.target.closest('[data-cut]');if(!b)return;cut=+b.dataset.cut;drawC()});
  cs.addEventListener('click',e=>{const g=e.target.closest('[data-ci]');if(g){cut=+g.dataset.ci;drawC();return}
    const p=cs.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=cs.getScreenCTM();if(!m||!CG)return;const q=p.matrixTransform(m.inverse());
    let best=0,bd=1e9;DB_CHAIN.forEach((_,i)=>{const b=CG.box(i),d=CG.NR?Math.abs(q.y-(b.y+b.h/2)):Math.abs(q.x-(b.x+b.w/2));if(d<bd){bd=d;best=i}});cut=best;drawC()});
  drawC();

  /* ---- flip set ---- */
  $('#dbFlips').innerHTML=DB_FLIPS.map(([k,n,b])=>`<button class="dbflip" aria-pressed="false"><small>${k}</small><b>${n}</b><span class="fr">Tap to see what it is for</span><span class="bk">${b}</span></button>`).join('');
  $('#dbFlips').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('.dbflip');if(b)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});

  /* ---- Cochrane forest ---- */
  const co=$('#dbCoSvg');let cv='all';
  function drawCo(p){const D=DB_CO[cv],nr=D.rows.length-1,NR=vb(co,`620 ${58+46*nr+64}`,`400 ${62+66*nr+64}`);let s='';
    const G=NR?{x0:30,x1:384,y0:62,dy:66,lab:-30}:{x0:220,x1:600,y0:58,dy:46,lab:0},X=v=>lerp(G.x0,G.x1,(v+1)/1.2);
    const yEnd=G.y0+G.dy*(D.rows.length-1)+24;
    [-1,-.75,-.5,-.25,0].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${G.y0-22}" y2="${yEnd}" class="${v?'grid':'axis'}" style="${v?'':'stroke:var(--ink);opacity:.5'}"/><text x="${f1(X(v))}" y="${yEnd+14}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${f1(X(-.5))}" y="${yEnd+30}" class="t-xs t-mid">← favours therapy · SMD</text><text x="${f1(X(0)-4)}" y="${G.y0-28}" class="t-xs t-end">no difference</text>`;
    if(!NR)s+=`<text x="${G.x0-14}" y="${G.y0-28}" class="t-xs t-end">outcome · trials · certainty</text>`;
    D.rows.forEach(([n,m,lo,hi,cert,tr],i)=>{const y=G.y0+G.dy*i,col=cert==='moderate'?'var(--rx)':'var(--muted)',mm=m*p;
      const lx=NR?G.x0:G.x0-14,ly=NR?y+G.lab:y-2;
      s+=`<text x="${lx}" y="${ly}" class="t-lbl ${NR?'':'t-end'}" style="font-size:12.5px">${n}</text><text x="${lx}" y="${ly+13}" class="t-xs ${NR?'':'t-end'}">${tr} · ${cert} certainty</text>`;
      if(lo!=null)s+=`<line x1="${f1(X(lo*p))}" x2="${f1(X(hi*p))}" y1="${y}" y2="${y}" style="stroke:${col};stroke-width:2.4;stroke-linecap:round"/>`;
      s+=`<rect x="${f1(X(mm)-6)}" y="${y-6}" width="12" height="12" style="fill:${col}"/>`;
      if(p>.98)s+=`<text x="${f1(lo==null?X(m)-12:X(lo)-6)}" y="${y+4}" class="t-xs t-end" style="fill:var(--ink)">${lo==null?'no CI given · ':''}${m.toFixed(2).replace('-','−')}</text>`});
    co.innerHTML=s;
    $('#dbCoCap').innerHTML=`${D.n}. Squares are standardised mean differences; lines are 95% confidence intervals where the abstract reports them. Green = moderate certainty, grey = low. Population averages from trials. [[Storebo2020]]`;
    $('#dbCoNote').innerHTML=noteHTML(D.note);
  }
  $$('[data-dbc]').forEach(b=>b.addEventListener('click',()=>{cv=b.dataset.dbc;$$('[data-dbc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCo(1)}));
  drawCo(1);
  const pr=redraws.dbt;redraws.dbt=()=>{pr&&pr();drawC();drawCo(1)};
};
