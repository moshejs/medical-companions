/* =============== 5.4 Nursing & healthcare visits =============== */
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let mode='usual',setSt=()=>{};const TH=.86;
  const ST=[['phone','Before the visit','Before'],['door','Arrival','Arrive'],['chairs','Waiting','Wait'],['clip','Assessment','Assess'],['needle','Blood test','Blood'],['bed','Recovery','Recover'],['house','Discharge','Home']];
  const KN={usual:[[0,.3],[.07,.42],[.143,.4],[.2,.54],[.286,.52],[.36,.72],[.429,.7],[.5,.77],[.571,.75],[.63,.96],[.68,.99],[.72,.88],[.79,.7],[.857,.6],[.93,.5],[1,.44]],
    adapt:[[0,.22],[.07,.2],[.143,.2],[.2,.27],[.286,.24],[.36,.26],[.429,.28],[.5,.33],[.571,.36],[.63,.6],[.68,.56],[.72,.44],[.79,.3],[.857,.24],[.93,.2],[1,.16]]};
  const sAt=(m,t)=>{const k=KN[m];for(let i=1;i<k.length;i++)if(t<=k[i][0]){const p=k[i-1],q=k[i];return lerp(p[1],q[1],ease((t-p[0])/(q[0]-p[0])))}return k[k.length-1][1]};
  const CH={
    usual:[['phone booking only','no idea what will happen'],['busy, bright reception','tell your story again'],['noisy waiting room','unknown wait'],['many questions at once','touched without warning','gown and BP "for everyone"'],['rushed','held still'],['busy, noisy bay'],['spoken instructions only','no follow-up plan']],
    adapt:[['hospital passport sent ahead','online or text booking','reason for visit sent ahead','photos / social story of the room'],['first appointment of the day','met at the door'],['quiet room, or wait in the car','dim light, less noise'],['one instruction at a time','say before you touch','write it down, show pictures','family as experts','skip non-essential checks'],['practised beforehand','numbing cream if prescribed','distraction: a favourite video','a plan B that is not restraint'],['quiet space','comfort object, own clothes'],['written plan with pictures','passport updated','who to call, and when']]};
  const STEPS=[
    {from:0,at:.06,k:'Before the visit',t:'Contact before the visit',
     txt:`In an international survey, 80% of 507 autistic adults against 37% of 157 non-autistic adults reported difficulty visiting a GP. The top barriers were deciding whether symptoms warranted a visit (72%), booking by telephone (62%), not feeling understood (56%), communicating with the doctor (53%) and the waiting room (51%); barriers were linked to untreated conditions and late presentation. Autistic adults asked for online or text booking, sending the reason for the visit in advance, the first or last appointment of the day and a quiet place to wait. [[Doherty2022]] After using the AASPIRE toolkit, which produces a personalised accommodations report, mean barriers fell from 4.07 to 2.82 (single-arm). [[Nicolaidis2016]]`,
     pt:`You can ask for reasonable adjustments, such as booking online, a quiet place to wait or the first appointment of the day.`,
     hook:`80% of autistic adults vs 37% of non-autistic adults report difficulty visiting a GP. [[Doherty2022]]`},
    {from:1/7,at:1/7+.06,k:'Arrival',t:'Arrival',
     txt:`A hospital passport tells staff how the person communicates, what upsets them and what helps. A review of 60 UK passports (for people with intellectual disabilities) found wide variation, and some omitted allergies, risk assessment or reasonable adjustments. [[Northway2017]] Passports tailored for emergency departments were rated helpful by staff, agencies and families. [[Heifetz2018]] Of 272 Australian users of an autism alert card, 16% had used it in healthcare and 76.2% would recommend it, though some met disbelief. [[Edwards2025AlertCard]]`,
     pt:`A hospital passport tells staff how you communicate, what upsets you and what helps.`,
     hook:`Check the passport on arrival, and check it is complete: allergies, risks, adjustments. [[Northway2017]]`},
    {from:2/7,at:2/7+.07,k:'Waiting',t:'Waiting',
     txt:`The waiting room is one of the commonest barriers (51%). [[Doherty2022]] Autistic adults name health-care settings among the places that most often disable them. [[MacLennan2023]] In the SADE-2 randomised crossover trial (162 autistic children aged 6–12), a sensory-adapted dental room with changed lighting, sound and touch lowered physiological stress (skin conductance −1.22 μS) and video-coded distress (Cohen d −0.84 to −1.19) against a regular room. [[SteinDuker2023,NCT02430051]] An earlier pilot found lower anxiety, pain and sensory discomfort. [[Cermak2015]]`,
     pt:`Small changes to a room, like softer light, less noise and a quiet place to wait, lower stress.`,
     hook:`SADE-2: a sensory-adapted environment lowered physiological and behavioural distress (RCT, crossover). [[SteinDuker2023]]`},
    {from:3/7,at:3/7+.07,k:'Assessment',t:'Assessment',
     txt:`Autistic adults described patient factors (sensory sensitivities, slow processing, body awareness, verbal communication), provider factors (wrong assumptions, unwillingness to allow written communication) and system factors. [[Nicolaidis2015]] Parents and staff of autistic children having day procedures valued clear explanations and flexibility, such as skipping unnecessary blood-pressure checks and not changing into gowns. [[Taghizadeh2019]] Parents are their child's experts. [[Taghizadeh2015]] In a survey of 304 UK GPs, 39.5% had never had formal autism training. [[Unigwe2017]]`,
     pt:`One question at a time, time to answer, and writing or pictures if they help. Ask the family what works.`,
     hook:`Allow written communication; say what you will do before you touch. [[Nicolaidis2015]]`},
    {from:4/7,at:.66,k:'Blood test',t:'The procedure',
     txt:`This is the peak. Preparation works: a Blood Draw Intervention Program raised compliance from 85.4% to 96.6% (OR 4.80; quasi-randomised). [[Davit2011]] Gradual exposure helped a teenager with needle phobia, and virtual-reality exposure an adult (single cases). [[Shabani2006,Meindl2019]] Watching a favourite film through video goggles lowered dental anxiety in an RCT of 80 children. [[Isong2014]] Autistic children do feel pain and show it on their faces. [[Nader2004]] Without these steps, distress can end in restraint: in one paediatric ED, physical restraint was used for 14.1% of autistic patients needing psychiatric consultation against 6.0% of others (adjusted OR 2.28). [[McGaughey2026]]`,
     pt:`Practise first, numb the skin if the prescriber agrees, distract with something loved, and have a plan B that is not holding the person down.`,
     hook:`Blood Draw Intervention Program: compliance 85.4% → 96.6%. [[Davit2011]]`},
    {from:5/7,at:5/7+.07,k:'Recovery',t:'Recovery',
     txt:`Stress can stay high after the procedure in a busy bay. A quiet space and comfort objects help it settle. In 121 autistic and 881 non-autistic children having general anaesthesia for dental treatment, complications, pain, recovery-room time and time to discharge were similar, although autistic children more often had non-standard premedication. [[Arnold2015]] If overload builds, treat it as overload, not defiance: autistic adults describe trying to get away or be alone to avoid harm. [[Lewis2023Meltdown]]`,
     pt:`After the test, a quiet place and something familiar help the body calm down.`,
     hook:`With good planning, autistic children's anaesthesia outcomes were similar to other children's. [[Arnold2015]]`},
    {from:6/7,at:.95,k:'Discharge',t:'Going home',
     txt:`Give the plan in writing, with pictures if helpful, and update the passport with what worked, so the next visit starts there. [[Northway2017]] The cost of getting it wrong is real: autistic adults had higher odds of unmet physical (OR 1.9) and mental health (OR 2.2) needs, lower odds of Pap smears (OR 0.5) and higher odds of using the ED (OR 2.1). [[Nicolaidis2013]] Compare the curves: in adapted care the line never reaches the overload zone.`,
     pt:`Written instructions and a named person to call make going home safer.`,
     hook:`Autistic adults: more unmet health needs and more ED use than non-autistic adults. [[Nicolaidis2013]]`}];

  function ico(k,x,y,r){const st='style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"';const u=r/20,X=v=>f1(x+v*u),Y=v=>f1(y+v*u);
    switch(k){case'phone':return `<rect x="${X(-6)}" y="${Y(-10)}" width="${f1(12*u)}" height="${f1(20*u)}" rx="2" ${st}/><line x1="${X(-2)}" x2="${X(2)}" y1="${Y(7)}" y2="${Y(7)}" ${st}/>`;
      case'door':return `<rect x="${X(-7)}" y="${Y(-10)}" width="${f1(14*u)}" height="${f1(20*u)}" ${st}/><circle cx="${X(3)}" cy="${Y(1)}" r="${f1(1.3*u)}" style="fill:var(--ink)"/>`;
      case'chairs':return `<path d="M${X(-10)} ${Y(8)}V${Y(-4)}M${X(-10)} ${Y(2)}H${X(-2)}V${Y(8)}M${X(2)} ${Y(8)}V${Y(-4)}M${X(2)} ${Y(2)}H${X(10)}V${Y(8)}" ${st}/>`;
      case'clip':return `<rect x="${X(-7)}" y="${Y(-9)}" width="${f1(14*u)}" height="${f1(19*u)}" rx="2" ${st}/><path d="M${X(-3)} ${Y(-3)}H${X(3)}M${X(-3)} ${Y(1)}H${X(3)}M${X(-3)} ${Y(5)}H${X(1)}" ${st}/>`;
      case'needle':return `<path d="M${X(-9)} ${Y(9)}L${X(-5)} ${Y(5)}M${X(-5)} ${Y(1)}L${X(1)} ${Y(-5)}L${X(5)} ${Y(-1)}L${X(-1)} ${Y(5)}Z M${X(3)} ${Y(-7)}L${X(9)} ${Y(-1)}" ${st}/>`;
      case'bed':return `<path d="M${X(-10)} ${Y(-6)}V${Y(8)}M${X(-10)} ${Y(3)}H${X(10)}V${Y(8)}M${X(-6)} ${Y(-1)}H${X(9)}" ${st}/>`;
      case'house':return `<path d="M${X(-9)} ${Y(9)}V${Y(-1)}L${X(0)} ${Y(-9)}L${X(9)} ${Y(-1)}V${Y(9)}Z" ${st}/>`}return ''}
  function chips(list,x0,x1,y0,prog,col,N){let s='',x=x0,y=y0;const h=N?20:22;
    list.forEach((c,j)=>{const w=c.length*(N?6.2:6.4)+16;if(x+w>x1){x=x0;y+=h+6}
      const vis=clamp((prog-j/(list.length+1))*6);if(vis>0)s+=`<g style="opacity:${f1(vis)}"><rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="${h}" rx="${h/2}" style="fill:${col}-soft);stroke:${col});stroke-width:1.2"/><text x="${f1(x+w/2)}" y="${y+h/2+3.5}" class="t-xs t-mid" style="fill:var(--ink)">${c}</text></g>`;x+=w+6});return s}
  function draw(t){
    const N=vb(svg,'720 380','400 600'),k=Math.min(6,Math.floor(t*7)),loc=t*7-k,v=sAt(mode,t),vo=sAt(mode==='usual'?'adapt':'usual',t);
    const L=N?{sx0:30,sx1:370,sy:56,sr:15,lab:86,cx0:14,cx1:386,cy:118,fx:70,fy:276,fr:34,dx:250,dy:302,dr:62,gx0:42,gx1:380,gy0:360,gy1:480,gl:496,lg:524}
             :{sx0:62,sx1:658,sy:50,sr:20,lab:88,cx0:24,cx1:696,cy:124,fx:84,fy:240,fr:40,dx:226,dy:276,dr:62,gx0:334,gx1:700,gy0:196,gy1:314,gl:330,lg:364};
    const SX=i=>lerp(L.sx0,L.sx1,i/6);let s='';
    /* pathway */
    s+=`<line x1="${L.sx0}" x2="${L.sx1}" y1="${L.sy}" y2="${L.sy}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${L.sx0}" x2="${f1(lerp(L.sx0,L.sx1,clamp(t*7/6.5)))}" y1="${L.sy}" y2="${L.sy}" style="stroke:var(--brand);stroke-width:4;stroke-linecap:round"/>`;
    ST.forEach((S,i)=>{const on=i===k,done=i<k;s+=`<circle cx="${f1(SX(i))}" cy="${L.sy}" r="${L.sr}" style="fill:${on?'var(--brand-soft)':'var(--panel)'};stroke:${on?'var(--brand)':done?'var(--muted)':'var(--line)'};stroke-width:${on?2.4:1.4}"/>`+ico(S[0],SX(i),L.sy,L.sr*.9);
      s+=`<text x="${f1(SX(i))}" y="${L.lab}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${N?S[2]:S[1]}</text>`});
    const pp=clamp(t*7/6.5)*6,px=lerp(L.sx0,L.sx1,pp/6);
    s+=face(px,L.sy-L.sr-12,N?9:11,{mouth:v<.4?'smile':v<.65?'flat':'wavy',brows:v>.6?'tense':'calm'});
    /* chips */
    const col=mode==='usual'?'var(--bad':'var(--rx';
    s+=`<text x="${L.cx0}" y="${L.cy-8}" class="t-sm" style="fill:${col})">${mode==='usual'?'BARRIERS MET HERE':'NURSE ACTIONS HERE'} · ${ST[k][1].toUpperCase()}</text>`;
    s+=chips(CH[mode][k],L.cx0,L.cx1,L.cy,loc*1.4+.1,col,N);
    /* face and dial */
    s+=face(L.fx,L.fy,L.fr,{mouth:v<.4?'smile':v<.65?'flat':v<TH?'wavy':'open',brows:v>.55?'tense':'calm',gaze:v>.7?120:null,ear:mode==='adapt'&&k===2});
    s+=`<text x="${L.fx}" y="${L.fy+L.fr+18}" class="t-xs t-mid">the patient</text>`;
    s+=dial(L.dx,L.dy,L.dr,v,{th:TH,label:'stress (schematic)'});
    const word=v<.4?'calm':v<.65?'uneasy':v<TH?'distressed':'overload';
    s+=`<text x="${L.dx}" y="${L.dy-L.dr-14}" class="t-big t-mid" style="fill:${v>=TH?'var(--bad)':v>=.65?'var(--warn)':'var(--calm)'}">${word}</text>`;
    /* curves */
    const X=u=>lerp(L.gx0,L.gx1,u),Y=w=>lerp(L.gy1,L.gy0,w);
    s+=`<text x="${L.gx0}" y="${L.gy0-10}" class="t-sm">STRESS ACROSS THE VISIT</text>`;
    s+=`<rect x="${L.gx0}" y="${L.gy0}" width="${L.gx1-L.gx0}" height="${f1(Y(TH)-L.gy0)}" style="fill:var(--bad);opacity:.1"/><text x="${L.gx1-4}" y="${L.gy0+11}" class="t-xs t-end" style="fill:var(--bad)">overload: restraint risk</text>`;
    for(let i=1;i<7;i++)s+=`<line x1="${f1(X(i/7))}" x2="${f1(X(i/7))}" y1="${L.gy0}" y2="${L.gy1}" class="grid"/>`;
    ST.forEach((S,i)=>s+=`<text x="${f1(X((i+.5)/7))}" y="${L.gl}" class="t-xs t-mid">${N?S[2].slice(0,4):S[2]}</text>`);
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${L.gy1}" y2="${L.gy1}" class="axis"/>`;
    const pth=(m,u1)=>{let d='';for(let i=0;i<=200;i++){const u=i/200;if(u>u1)break;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(sAt(m,u)))}return d};
    const oth=mode==='usual'?'adapt':'usual';
    s+=`<path d="${pth(oth,1)}" style="fill:none;stroke:${oth==='usual'?'var(--bad)':'var(--rx)'};stroke-width:1.4;stroke-dasharray:4 3;opacity:.7"/>`;
    s+=`<path d="${pth(mode,t)}" style="fill:none;stroke:${mode==='usual'?'var(--bad)':'var(--rx)'};stroke-width:2.8;stroke-linejoin:round"/>`;
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.gy0}" y2="${L.gy1}" style="stroke:var(--ink);opacity:.35"/><circle cx="${f1(X(t))}" cy="${f1(Y(v))}" r="4.5" style="fill:${mode==='usual'?'var(--bad)':'var(--rx)'};stroke:var(--panel);stroke-width:1.5"/>`;
    s+=`<text x="${N?L.gx0:L.gx0}" y="${L.lg}" class="t-xs"><tspan style="fill:var(--bad)">${mode==='usual'?'—':'- -'} usual care</tspan>   <tspan style="fill:var(--rx)">${mode==='adapt'?'—':'- -'} autism-adapted care</tspan></text><text x="${N?L.gx0:24}" y="${L.lg+(N?18:0)}" class="t-xs" style="fill:var(--warn)">${N?'SCHEMATIC · one illustrative patient':''}</text>`;
    if(!N)s+=`<text x="24" y="${L.lg}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative patient</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);$('#nuNote').innerHTML=noteHTML(STEPS[ph]);
    let peakU=0,peakA=0;for(let i=0;i<=100;i++){peakU=Math.max(peakU,sAt('usual',i/100));peakA=Math.max(peakA,sAt('adapt',i/100))}
    $('#nuRead').innerHTML=`<span>stage <b>${ST[k][1]}</b></span><span>care <b>${mode==='usual'?'usual':'autism-adapted'}</b></span><span>now <b>${word}</b> (other model: ${vo<.4?'calm':vo<.65?'uneasy':vo<TH?'distressed':'overload'})</span><span>reaches overload zone: usual <b>${peakU>=TH?'yes':'no'}</b> · adapted <b>${peakA>=TH?'yes':'no'}</b></span>`;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,24000,'Replay','nursing');
  setSt=stepWire($('#nuSteps'),STEPS,rg,draw,stop);
  $$('[data-nuc]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.nuc;$$('[data-nuc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ================= FLACC walkthrough ================= */
  const FL=[ ['Face',['no particular expression, or a smile','occasional grimace or frown; withdrawn, uninterested','frequent or constant quivering chin, clenched jaw']],
    ['Legs',['normal position or relaxed','uneasy, restless, tense','kicking, or legs drawn up']],
    ['Activity',['lying quietly, normal position, moves easily','squirming, shifting back and forth, tense','arched, rigid or jerking']],
    ['Cry',['no cry','moans or whimpers; occasional complaint','crying steadily, screams or sobs; frequent complaints']],
    ['Consolability',['content, relaxed','reassured by touch, hugs or talk; can be distracted','hard to console or comfort']]];
  const IND={hum:[3,'hums one tune, louder'],still:[2,'goes very still'],rock:[1,'rocks faster than usual']};
  const sel=[0,0,0,0,0],ind={hum:0,still:0,rock:0};const box=$('#nuFlacc'),psvg=$('#nuPain');
  box.innerHTML=FL.map((r,i)=>`<div class="row"><div><b>${r[0]}</b><small id="nuFi${i}"></small></div><div class="opts3" role="group" aria-label="${r[0]} score">${r[1].map((d,v)=>`<button data-fl="${i}:${v}" aria-pressed="${v===0}"><b>${v}</b>${d}</button>`).join('')}</div></div>`).join('');
  function eff(){const e=sel.slice();for(const k in ind)if(ind[k]){const r=IND[k][0];e[r]=Math.max(e[r],1)}return e}
  function drawPain(){const e=eff(),tot=e.reduce((a,b)=>a+b,0);let s='';
    const band=tot===0?['no pain behaviours scored','var(--calm)']:tot<=3?['lower range (1–3)','var(--calm)']:tot<=6?['middle range (4–6)','var(--warn)']:['upper range (7–10)','var(--bad)'];
    s+=`<text x="30" y="34" class="t-sm">FLACC TOTAL (0–10)</text><text x="30" y="92" style="font:800 56px var(--display);fill:${band[1]}">${tot}</text><text x="30" y="116" class="t-xs" style="fill:${band[1]}">${band[0]}</text>`;
    s+=face(320,74,44,{mouth:tot<=1?'smile':tot<=4?'flat':tot<=7?'wavy':'open',brows:tot>3?'tense':'calm'});
    const X=v=>lerp(30,370,v/10);
    [[0,1,'var(--calm)'],[1,4,'var(--calm)'],[4,7,'var(--warn)'],[7,10,'var(--bad)']].forEach(([a,b,c],i)=>s+=`<rect x="${f1(X(a))}" y="150" width="${f1(X(b)-X(a))}" height="18" style="fill:${c};opacity:${i?.35:.15}"/>`);
    for(let v=0;v<=10;v++)s+=`<text x="${f1(X(v))}" y="184" class="t-xs t-mid">${v}</text>`;
    s+=`<path d="M${f1(X(tot))} 146l-7 -12h14z" style="fill:var(--ink)"/>`;
    [[6.1,'before analgesia 6.1',212],[1.9,'after 1.9',236]].forEach(([v,l,y])=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="168" y2="${y-10}" style="stroke:var(--neuro);stroke-dasharray:2 2"/><text x="${f1(X(v))}" y="${y}" class="t-xs t-mid" style="fill:var(--neuro)">${l}</text>`);
    s+=`<text x="30" y="262" class="t-xs">r-FLACC study means, 52 children (Malviya 2006)</text><text x="30" y="282" class="t-xs" style="fill:var(--warn)">bands for teaching only; local policy sets action points</text>`;
    psvg.innerHTML=s;
    FL.forEach((r,i)=>{const added=Object.keys(ind).filter(k=>ind[k]&&IND[k][0]===i).map(k=>IND[k][1]);$('#nuFi'+i).textContent=`score ${e[i]}`+(added.length?` · parent-added sign: ${added.join(', ')}`:'')});
    $('#nuPainCap').innerHTML=`Total ${tot} of 10: ${band[0]}. ${Object.values(ind).some(Boolean)?'The parent-added behaviours lift their category to at least 1, as the r-FLACC allows. [[Malviya2006]] ':''}Re-score after any pain relief: a falling score is part of the picture. [[Merkel1997]]`}
  box.addEventListener('click',ev=>{const b=ev.target.closest('[data-fl]');if(!b)return;const[i,v]=b.dataset.fl.split(':').map(Number);sel[i]=v;$$(`[data-fl^="${i}:"]`,box).forEach(x=>x.setAttribute('aria-pressed',x===b));drawPain()});
  $$('[data-nui]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.nui;ind[k]=ind[k]?0:1;b.setAttribute('aria-pressed',!!ind[k]);drawPain()}));
  $('#nuReset').addEventListener('click',()=>{sel.fill(0);for(const k in ind)ind[k]=0;$$('[data-fl]',box).forEach(x=>x.setAttribute('aria-pressed',x.dataset.fl.endsWith(':0')));$$('[data-nui]').forEach(x=>x.setAttribute('aria-pressed','false'));drawPain()});
  drawPain();
};
