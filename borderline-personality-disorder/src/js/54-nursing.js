/* =============== 5.4 Nursing care =============== */
/* Each station: s = short station label (wide), sn = narrow label, a/e/p = actions / evidence / pitfall for the
   SVG panels (no citations inside SVG), and the note fields with citations. No injury or method detail anywhere. */
const NU_ED=[
 {s:['Triage and','first contact'],sn:'Triage',a:'Greet calmly and explain what will happen next. Wait in an area close to staff who can support and observe.',e:'People with BPD, carers and clinicians mostly report negative ED experiences; stigma is felt to drive repeat visits.',p:'A long, unexplained wait and a cold or dismissive welcome.',
  k:'ED · Station 1 of 5',t:'Triage and a calm first contact',
  txt:`NICE CG78 asks for a calm, non-threatening attitude and an effort to understand the crisis from the person's point of view. [[NICE2009]] NICE NG225 places the waiting area for people who have self-harmed close to staff who can provide care, support and observation. [[NICE2022SelfHarm]] An integrative review of 9 papers found mostly negative ED experiences, with barriers to timely care and stigmatising attitudes felt to drive further visits. [[Miller2024ED]]`,
  pt:`The first few minutes shape the whole visit. Calm, clear words help a person in crisis feel safe enough to stay.`,
  hook:`NICE NG225: ED waiting area for people who self-harm should be near staff who can support and observe. [[NICE2022SelfHarm]]`},
 {s:['Physical care','without judgement'],sn:'Care',a:'Treat injuries with the same care and respect as any other patient. Start the psychosocial assessment alongside physical care.',e:'ED nurses describe their skills as biomedical and want closer links with psychiatry; empathy toward self-harm is often limited.',p:'Waiting until medical treatment ends, or until alcohol levels fall, before assessing.',
  k:'ED · Station 2 of 5',t:'Physical care without judgement',
  txt:`NICE NG225: carry out physical care and the psychosocial assessment at the same time, as soon as possible, and do not use breath or blood alcohol levels to delay the assessment. [[NICE2022SelfHarm]] Danish emergency nurses saw their competence as biomedical and suggested close collaboration with psychiatry. [[Ostervang2022]] A meta-analysis found limited empathy among ED nurses toward people who self-harm and recommended education and supervision. [[Rayner2019]]`,
  pt:`Good wound care is also emotional care: a respectful, unhurried manner tells the person they deserve help.`,
  hook:`Physical and psychosocial care run in parallel, not one after the other. [[NICE2022SelfHarm]]`},
 {s:['Assessment and','safety plan'],sn:'Assess',a:'Talk in a private space. Ask about needs, strengths and what is happening; build a risk formulation and write a safety plan together.',e:'Safety plan with follow-up calls: suicidal behaviour 3.03% vs 5.29% at 6 months. Risk scales: PPV for suicide only 5.5%.',p:'Rating the person low, medium or high risk and deciding care from the score.',
  k:'ED · Station 3 of 5',t:'Collaborative assessment and safety plan',
  txt:`Hold the assessment in a private area where the person cannot be overheard; use a risk formulation, not risk tools, scales or a global low/medium/high rating, and develop a safety plan with the person. [[NICE2022SelfHarm]] A safety plan with at least two follow-up calls was followed by suicidal behaviour in 3.03% vs 5.29% over 6 months. [[Stanley2018ED]] Risk scales had a pooled positive predictive value of 5.5% for suicide. [[Carter2017PPV]]`,
  pt:`Instead of scoring someone, the nurse asks what is going on, what helps and what would keep them safer, and writes it down with them.`,
  hook:`Risk formulation, not risk prediction. "No 'high-risk' classification was clinically useful." [[Carter2017PPV]]`},
 {s:['Brief admission','or discharge'],sn:'Admit?',a:'Consider a crisis or home treatment team first. If admitted, agree purpose and length in advance; if discharged, leave with a crisis plan.',e:'Brief admission RCT: no fewer hospital days, but within-group falls in compulsory days and self-injury.',p:'An open-ended admission with no agreed purpose, or discharge with no plan.',
  k:'ED · Station 4 of 5',t:'Brief admission or discharge with a crisis plan',
  txt:`NICE CG78: refer to a crisis resolution and home treatment team before considering acute admission; admit only for crises with significant risk that cannot be managed elsewhere, agreeing length and purpose in advance. [[NICE2009]] In the brief admission RCT (125 adults), self-referral did not reduce total hospital days, though only that group showed within-group falls in compulsory admission days and self-injury. [[Westling2019BA]] Cochrane 2022 rates the crisis-intervention evidence low to very low certainty. [[MonkCunliffe2022]]`,
  pt:`Hospital is one option, not the default. When it is used, everyone should know why, and for how long.`,
  hook:`NICE CG78: formal care programme review for anyone admitted twice or more in 6 months. [[NICE2009]]`},
 {s:['Follow-up','within days'],sn:'Follow-up',a:'Arrange aftercare within 48 hours if safety concerns continue. Phone to check in, update the plan, and tell the GP.',e:'ED-SAFE: a brief ED intervention plus calls lowered suicide attempts to 18% vs 23%.',p:'Losing contact at the hand-over between services.',
  k:'ED · Station 5 of 5',t:'Follow-up within days',
  txt:`NICE NG225: provide initial aftercare within 48 hours of the psychosocial assessment if there are ongoing safety concerns, and give the person a copy of the plan with contact details. [[NICE2022SelfHarm,NICE2022NG225]] In ED-SAFE, screening plus a brief intervention with telephone calls lowered suicide attempts to 18%, from 23% with usual care. [[Miller2017EDSAFE]] Safety planning more than doubled the odds of attending outpatient care (OR 2.06). [[Stanley2018ED]]`,
  pt:`A phone call a day or two later tells the person they were not forgotten, and it keeps the plan alive.`,
  hook:`Aftercare within 48 hours when concerns continue (NICE NG225); ED-SAFE attempts 18% vs 23%. [[NICE2022SelfHarm,Miller2017EDSAFE]]`}
];
const NU_WARD=[
 {s:['Admission with','a purpose'],sn:'Admit',a:'Agree the purpose and expected length of the stay with the person at the start; return to voluntary care as soon as possible.',e:'People found coercive admission and poor discharge planning harmful; they valued feeling safe.',p:'Unclear goals that let a stay drift on.',
  k:'Ward · Station 1 of 5',t:'Admission with a purpose',
  txt:`NICE CG78: agree the length and purpose of any admission in advance, and resume voluntary care as soon as possible if compulsion was needed; arrange a care programme review for anyone admitted twice or more in 6 months. [[NICE2009]] People who had stayed on acute wards found coercive admission and poor discharge planning harmful. [[Stapleton2019]]`,
  pt:`A short, focused stay with clear goals is usually more helpful than a long one without them.`,
  hook:`Admission: agreed purpose and length, voluntary care as soon as possible. [[NICE2009]]`},
 {s:['Therapeutic','relationship'],sn:'Relate',a:'Make time to talk and listen. Validate feelings, explain BPD in plain words, and build trust step by step.',e:'People valued being listened to and time to talk; with community nurses: learning, trust and validation.',p:'Little staff contact, and negative attitudes that people can feel.',
  k:'Ward · Station 2 of 5',t:'The therapeutic relationship',
  txt:`People on acute wards valued being listened to, time to talk with staff and other patients, time out and feeling safe; they found negative staff attitudes, lack of contact and lack of BPD knowledge harmful. [[Stapleton2019]] With community mental health nurses, people named learning about the disorder, building trust and being empowered through validation. [[RomeuLabayen2020]]`,
  pt:`Being listened to and taken seriously is itself part of treatment.`,
  hook:`Three helpful parts of the nurse relationship: psychoeducation, trust, validation. [[RomeuLabayen2020]]`},
 {s:['Observation,','least restrictive'],sn:'Observe',a:'Decide observation case by case with the person\'s views, by trained staff, and review it regularly.',e:'Safewards on 31 wards: conflict down 15%, containment down 23.2%.',p:'Blanket observation levels and restrictions that keep escalating.',
  k:'Ward · Station 3 of 5',t:'Observation and least-restrictive care',
  txt:`NICE NG225: decide the need for close observation case by case, taking the person's views into account, with skilled trained staff, consent or a legal framework, and regular review. [[NICE2022SelfHarm]] In the Safewards cluster RCT (31 wards, 15 hospitals), simple interventions to improve staff–patient relationships reduced conflict by 15% and containment by 23.2%. [[Bowers2015]]`,
  pt:`Being watched all the time can feel like punishment. Good wards use the least restriction that keeps people safe, and explain why.`,
  hook:`Safewards: conflict −15% (5.7–23.7), containment −23.2% (9.9–35.5). [[Bowers2015]]`},
 {s:['De-escalation,','one team plan'],sn:'Team',a:'Respond the same way across staff and shifts from one written plan. Use calm communication and self-regulation first.',e:'Nurses ask for a coherent therapeutic framework; care seemed better where one existed.',p:'Different answers from different staff, which feels unfair and confusing.',
  k:'Ward · Station 4 of 5',t:'De-escalation and a single team plan',
  txt:`De-escalation is "a collective term for a range of interwoven staff-delivered components comprising communication, self-regulation, assessment, actions, and safety maintenance", aiming to reduce aggression while minimising coercion. [[Hallett2017]] Nurses asked for a coherent therapeutic framework, and care seemed better where one existed. [[Dickens2016]] NICE asks teams to manage risk as a whole multidisciplinary team. [[NICE2009]]`,
  pt:`When every nurse follows the same plan, the person knows what to expect, and trust can grow.`,
  hook:`De-escalation components: communication, self-regulation, assessment, actions, safety maintenance. [[Hallett2017]]`},
 {s:['Discharge and','transition'],sn:'Discharge',a:'Plan discharge with the person (and family if possible): how to manage distress, future crises and re-engaging. Inform the GP.',e:'Poor discharge planning was named as harmful. Brief-admission use fell from about 8 to 3–4 days per 6 months over 4 years.',p:'An abrupt ending with no plan for the first days at home.',
  k:'Ward · Station 5 of 5',t:'Discharge and transition',
  txt:`NICE CG78: before discharge, agree a plan with the person (and family where possible) for managing distress, coping with future crises and re-engaging with services, and inform the GP; expect endings to evoke strong emotions and phase them. [[NICE2009]] In 4-year follow-up of 62 brief-admission users, mean use fell from about 8 days per 6 months to 3–4. [[Daukantaite2025]]`,
  pt:`Leaving hospital is a big step. A clear plan for the first days at home makes it safer.`,
  hook:`Transitions: discuss beforehand, structure and phase them, keep crisis access. [[NICE2009]]`}
];
const NU_TALK=[
 {who:'In the ED, after self-harm',say:['Just patch me up.','Nobody here wants to deal with me anyway.'],
  r:[{t:'"We\'re very busy. You\'ll have to wait like everyone else."',g:0,f:'Dismissive. It confirms the person\'s fear of being unwanted, and stigmatising attitudes are felt to drive repeat visits. [[Miller2024ED]]'},
     {t:'"It sounds like you\'ve had hard experiences here before. I\'m going to look after you now, and when you\'re ready I\'d like to hear what happened tonight."',g:1,f:'Validates the feeling, gives care now and starts the conversation without delay, as NICE NG225 asks: physical and psychosocial care together. [[NICE2022SelfHarm,NICE2009]]'},
     {t:'"Of course we want to help! Don\'t think like that."',g:0,f:'Kindly meant, but it minimises what the person said. NICE asks staff to avoid minimising the person\'s stated reasons. [[NICE2009]]'}]},
 {who:'On the ward',say:['You\'re the only nurse who understands me.','Can you be my nurse every shift?'],
  r:[{t:'"Yes, I\'ll ask to be your nurse every time."',g:0,f:'Warm, but not sustainable, and it makes the rest of the team seem less safe. Consistency across the whole team matters. [[NICE2009,Dickens2016]]'},
     {t:'"That\'s not appropriate. You need to stop getting attached."',g:0,f:'Rejecting. It punishes the person for trusting someone, and negative attitudes are among the things people found harmful on wards. [[Stapleton2019]]'},
     {t:'"I\'m glad our talks help. The whole team works from one plan, so I\'ll share what helps you with every nurse, and we\'ll keep it going together."',g:1,f:'Validates the relationship and holds the boundary by widening it to the team. Nurses ask for a coherent shared framework. [[Dickens2016,NICE2009]]'}]},
 {who:'Before discharge',say:['If you send me home,','I can\'t promise I\'ll be safe.'],
  r:[{t:'"Thank you for telling me. Let\'s look at your safety plan together now: what would help tonight, and who you can contact. I\'ll make sure the team hears this."',g:1,f:'Takes it seriously, stays collaborative and uses the safety plan; the team then reviews the plan rather than a score. [[NICE2022SelfHarm,Stanley2018ED]]'},
     {t:'"You\'re just saying that so you can stay."',g:0,f:'Invalidating and stigmatising. Statements about safety always deserve a caring, non-judgemental response. [[NICE2009]]'},
     {t:'"Then you can stay as long as you like."',g:0,f:'Kind, but it drops the plan. NICE asks for admissions with an agreed purpose and length and a discharge plan made with the person. [[NICE2009]]'}]},
 {who:'A community phone call',say:['I\'m furious with my therapist.','She\'s useless and I\'m never going back.'],
  r:[{t:'"You\'re right, she doesn\'t sound very good."',g:0,f:'Colludes with one side. It may feel validating, but it can push the person out of therapy that is likely to help.'},
     {t:'"You shouldn\'t talk about her like that."',g:0,f:'Corrects instead of understanding; NICE asks staff to understand the crisis from the person\'s point of view first. [[NICE2009]]'},
     {t:'"You sound really angry and let down. What happened in the session? Strong feelings about therapy are worth bringing to her; that can be part of the work."',g:1,f:'Validates the emotion, explores with an open question and keeps the door to treatment open. Changes and endings in care can evoke strong emotions. [[NICE2009]]'}]}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let focus='ed';
  const NU_S=NU_ED.map((d,i)=>({from:i/5,at:i/5+.08,k:d.k,t:d.t,txt:d.txt,pt:d.pt,hook:d.hook}));
  const tx=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){L.push(l);l=x}else l=(l+' '+x).trim()});if(l)L.push(l);return L};
  const esc=s=>s.replace(/&/g,'&amp;');
  function draw(t){const N=vb(svg,'720 380','400 600');const D=focus==='ed'?NU_ED:NU_WARD;
    const f=t*5,i=clamp(Math.floor(f),0,4),u=clamp(f-i);
    const T=N?{x0:36,x1:364,y:52}:{x0:70,x1:650,y:54};const X=k=>lerp(T.x0,T.x1,k/4);
    let s=`<line x1="${T.x0}" x2="${T.x1}" y1="${T.y}" y2="${T.y}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    /* walking position: stays at a station, moves to the next in the last part of the step */
    const mv=ease(ramp(u,.75,1)),pos=i<4?lerp(i,i+1,mv):4;
    s+=`<line x1="${T.x0}" x2="${f1(X(pos))}" y1="${T.y}" y2="${T.y}" style="stroke:var(--brand);stroke-width:4;stroke-linecap:round"/>`;
    D.forEach((d,k)=>{const on=k===i,dn=k<i;
      s+=`<circle cx="${f1(X(k))}" cy="${T.y}" r="${on?11:8}" style="fill:${on?'var(--brand)':dn?'var(--brand-soft)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`+tx(X(k),T.y+4,k+1,'t-xs t-mid',on?'fill:var(--on-brand);font-weight:700':'fill:var(--ink)');
      if(N)s+=tx(X(k),T.y-18,d.sn,'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'');
      else{s+=tx(X(k),T.y-28,d.s[0],'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')+tx(X(k),T.y-16,d.s[1],'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')}});
    /* nurse and patient walk together; the bond strengthens over the pathway */
    const px=X(pos),fy=N?78:80,fs=N?40:46,ph=Math.sin(t*90)*(mv>0&&mv<1?2:0);
    const k=.25+.7*(pos/4);
    s+=bond(px-20,fy+fs*.42,px+20,fy+fs*.42,{k,curve:-10});
    s+=person(px-26,fy+ph,fs,'var(--other)')+person(px+26,fy-ph,fs,'var(--accent)');
    s+=tx(px-26,fy+fs+13,'patient','t-xs t-mid')+tx(px+26,fy+fs+13,'nurse','t-xs t-mid','fill:var(--accent)');
    /* three panels for the current station, fading in */
    const d=D[i],al=f1(.25+.75*ramp(u,0,.15));
    const P=[['NURSE\'S ACTIONS',d.a,'var(--accent)'],['EVIDENCE',d.e,'var(--dx)'],['COMMON PITFALL',d.p,'var(--bad)']];
    if(N){let y=164;P.forEach(([h,b,c])=>{const L=wrap(esc(b),46),hh=30+L.length*16;
        s+=`<g style="opacity:${al}"><rect x="12" y="${y}" width="376" height="${hh}" rx="10" style="fill:var(--field);stroke:${c};stroke-width:1.3"/>`+tx(24,y+19,h,'t-xs',`fill:${c};font-weight:700;letter-spacing:.08em`);
        L.forEach((l,j)=>{s+=tx(24,y+37+j*16,l,'t-sm','fill:var(--ink);font-size:12px')});s+='</g>';y+=hh+10});svg.setAttribute('viewBox','0 0 400 '+Math.max(420,Math.round(y+6)));}
    else{const cw=216,gap=12,x0=(720-3*cw-2*gap)/2,y0=158,ph2=196;
      P.forEach(([h,b,c],j)=>{const x=x0+j*(cw+gap),L=wrap(esc(b),29);
        s+=`<g style="opacity:${al}"><rect x="${f1(x)}" y="${y0}" width="${cw}" height="${ph2}" rx="10" style="fill:var(--field);stroke:${c};stroke-width:1.3"/>`+tx(x+12,y0+22,h,'t-xs',`fill:${c};font-weight:700;letter-spacing:.08em`);
        L.forEach((l,q)=>{s+=tx(x+12,y0+44+q*17,l,'t-sm','fill:var(--ink);font-size:11.5px')});s+='</g>'})}
    svg.innerHTML=s;
    const p=phaseOf(NU_S,t);setSt(p);
    $('#nuNote').innerHTML=noteHTML(NU_S[p]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'%t:player.replay%','nursing');
  const setSt=stepWire($('#nuSteps'),NU_S,rg,draw,stop);
  $$('[data-nufocus]').forEach(b=>b.addEventListener('click',()=>{focus=b.dataset.nufocus;$$('[data-nufocus]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const D=focus==='ed'?NU_ED:NU_WARD;D.forEach((d,i)=>Object.assign(NU_S[i],{k:d.k,t:d.t,txt:d.txt,pt:d.pt,hook:d.hook}));
    $$('[data-st] span',$('#nuSteps')).forEach((sp,i)=>{sp.textContent=NU_S[i].t});draw(+rg.value)}));
  draw(+rg.value);

  /* ---- replies simulator ---- */
  const ts=$('#nuTalk');let sc=0,pick=-1,stopT=null,ta=1;
  function drawT(){const N=vb(ts,'720 230','400 330');const S=NU_TALK[sc];let s='';
    const pX=N?40:60,pY=N?60:50;
    s+=person(pX,pY,54,'var(--other)')+tx(pX,pY+70,'patient','t-xs t-mid');
    const bw=N?300:420,bx=pX+40;
    s+=bubble(bx,pY-24,bw,52,{tx:pX+14,ty:pY+16,lines:S.say.map(x=>x.replace(/&/g,'&amp;')),col:'var(--other)'});
    s+=tx(N?388:700,N?16:18,S.who.toUpperCase(),'t-xs t-end','fill:var(--muted);letter-spacing:.08em');
    if(pick>=0){const R=S.r[pick],nX=N?360:660,nY=N?220:150,L=wrap(R.t.replace(/^"|"$/g,'').replace(/&/g,'&amp;'),N?44:58).slice(0,6),bh=24+L.length*15,bw2=N?318:440,bx2=N?12:nX-40-bw2;
      s+=`<g style="opacity:${f1(ta)}">`+person(nX,nY,54,'var(--accent)')+tx(nX,nY+70,'nurse','t-xs t-mid','fill:var(--accent)');
      s+=bubble(bx2,nY-bh+30,bw2,bh,{tx:nX-14,ty:nY+16,lines:L,col:R.g?'var(--good)':'var(--bad)'});
      s+=tx(bx2+6,nY-bh+22-8,R.g?'✓ validates and holds the boundary':'✗ misses something','t-xs',`fill:${R.g?'var(--good)':'var(--bad)'};font-weight:700`)+'</g>'}
    else s+=tx(N?200:420,N?210:160,'Choose a reply below','t-sm t-mid');
    ts.innerHTML=s}
  function note(){const S=NU_TALK[sc];
    if(pick<0){$('#nuTalkNote').innerHTML=noteHTML({k:S.who,t:'What would you say?',txt:'Read what the person says, then choose one of the three replies. Look for a reply that shows the feeling makes sense and keeps the care plan and the team in place.',pt:'Validating is not the same as agreeing. You can understand a feeling and still hold a limit.',hook:'NICE CG78 in crisis: calm, non-threatening attitude; empathic open questions; validating statements; do not minimise; no solutions before the problem is clear. [[NICE2009]]'});return}
    const R=S.r[pick];$('#nuTalkNote').innerHTML=`<div class="verdict ${R.g?'yes':'no'}">${R.g?'A good reply':'Try another reply'}</div>`+noteHTML({k:S.who,t:R.g?'Validates and holds the boundary':'Why this one misses',txt:R.f,pt:R.g?'Name the feeling, stay with the person, and keep the plan and the team in the picture.':'Notice whether a reply dismisses, rejects, minimises, colludes or drops the plan.'})}
  function reps(){const S=NU_TALK[sc];$('#nuReps').innerHTML=S.r.map((r,i)=>`<button class="btn" data-nurep="${i}" aria-pressed="${i===pick}"><b>${'ABC'[i]}</b>${r.t.replace(/&/g,'&amp;')}</button>`).join('')}
  $('#nuReps').addEventListener('click',e=>{const b=e.target.closest('[data-nurep]');if(!b)return;pick=+b.dataset.nurep;$$('[data-nurep]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopT)stopT();ta=.3;stopT=animate(350,p=>{ta=.3+.7*p;drawT()},()=>{stopT=null});note()});
  $$('[data-nusc]').forEach(b=>b.addEventListener('click',()=>{sc=+b.dataset.nusc;pick=-1;$$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));reps();drawT();note()}));
  reps();drawT();note();

  /* ---- bars ---- */
  const bs=$('#nuBars');let gb=1,stopB=null;
  function drawB(){const N=vb(bs,'720 270','400 470');let s='';
    const A=N?{x:20,y:28,w:360,h:180}:{x:24,y:28,w:320,h:200},B=N?{x:20,y:290,w:360,h:200}:{x:384,y:28,w:316,h:200};
    s+=tx(A.x,A.y,'WHAT TRAINING CHANGES','t-xs','fill:var(--brand);font-weight:700;letter-spacing:.08em')+tx(A.x,A.y+14,'review of 8 studies · relative size, not measured','t-xs');
    [['Knowledge',.92,'largest'],['Cognitive attitudes',.8,'large'],['Feelings',.42,'smaller']].forEach(([l,v,w],k)=>{const y=A.y+40+k*48,bw=(A.w-10)*v*ease(gb);
      s+=tx(A.x,y,l,'t-sm','fill:var(--ink)')+`<rect x="${A.x}" y="${y+8}" width="${f1(A.w-10)}" height="16" rx="5" style="fill:var(--panel-2)"/><rect x="${A.x}" y="${y+8}" width="${f1(bw)}" height="16" rx="5" style="fill:var(--brand);opacity:${k===2?.55:.9}"/>`+(gb>.6?tx(A.x+bw-6,y+20,w,'t-xs t-end','fill:var(--on-brand);font-weight:700'):'')});
    s+=tx(A.x,A.y+40+3*48-6,'Biggest gains: staff with the poorest attitudes','t-xs');
    s+=tx(B.x,B.y,'SAFEWARDS · 31 WARDS · CLUSTER RCT','t-xs','fill:var(--accent);font-weight:700;letter-spacing:.08em')+tx(B.x,B.y+14,'reduction in events · 95% CI','t-xs');
    const sc=v=>B.x+(B.w-40)*v/40;
    [0,10,20,30,40].forEach(v=>{s+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${B.y+30}" y2="${B.y+150}" class="grid"/>`+tx(sc(v),B.y+166,v+'%','t-xs t-mid')});
    [['Conflict',15,5.7,23.7],['Containment',23.2,9.9,35.5]].forEach(([l,v,lo,hi],k)=>{const y=B.y+48+k*52,e=ease(gb);
      s+=tx(B.x,y,l,'t-sm','fill:var(--ink)')+`<rect x="${f1(sc(0))}" y="${y+8}" width="${f1(sc(v*e)-sc(0))}" height="18" rx="4" style="fill:var(--accent)"/>`;
      if(gb>.8)s+=`<path d="M${f1(sc(lo))} ${y+17}H${f1(sc(hi))}M${f1(sc(lo))} ${y+11}v12M${f1(sc(hi))} ${y+11}v12" style="stroke:var(--ink);stroke-width:1.4;fill:none"/>`+tx(sc(hi)+6,y+21,'−'+v+'%','t-sm','fill:var(--ink);font-weight:700')});
    bs.innerHTML=s}
  function runB(){if(stopB)stopB();gb=0;stopB=animate(900,p=>{gb=p;drawB()},()=>{stopB=null})}
  $('#nuBarsGo').addEventListener('click',runB);
  drawB();
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawB();drawT()};
  const prevH=onHide.nursing;onHide.nursing=()=>{prevH&&prevH();if(stopB){stopB();stopB=null;gb=1}if(stopT){stopT();stopT=null;ta=1}};
};
