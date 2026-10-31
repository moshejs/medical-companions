/* =============== 5.2 Families & carers =============== */
/* One illustrative moment, replayed with three replies. Version A (invalidating) runs over
   t 0–.38, B (reassuring but dismissive) over .38–.62 and C (validating) over .62–1. Inside a
   version, u 0–.3 is the shared opening line and the reply lands at u = .3. */
const FA_V={
 A:{t0:0,t1:.38,name:'invalidating',col:'var(--storm)'},
 B:{t0:.38,t1:.62,name:'dismissive',col:'var(--med)'},
 C:{t0:.62,t1:1,name:'validating',col:'var(--calm)'}
};
const faPre=u=>.15+.4*ease(ramp(u,.02,.25));
const FA_WAVE={
 A:u=>u<.3?faPre(u):.55+.42*ease(ramp(u,.3,.68)),
 B:u=>u<.3?faPre(u):.55+.06*bump(u,.3,.55)-.12*ease(ramp(u,.55,1)),
 C:u=>u<.3?faPre(u):.55-.38*ease(ramp(u,.32,.95))
};
/* the family member's own intensity: the transactional model has two people, not one */
const FA_CARER={
 A:u=>.24+.08*ramp(u,.25,.3)+.42*ease(ramp(u,.55,.8)),
 B:u=>.24+.1*ramp(u,.3,.5),
 C:u=>.24-.06*ramp(u,.4,1)
};
const FA_BOND={
 A:u=>({k:lerp(.6,.15,ease(ramp(u,.3,.7))),rupture:ease(ramp(u,.55,.8))}),
 B:u=>({k:lerp(.6,.36,ease(ramp(u,.3,.75))),rupture:0}),
 C:u=>({k:lerp(.6,.96,ease(ramp(u,.35,1))),rupture:0})
};
const FA_SCRIPT={
 parent:{who:'Sam, 19',role:'lives with BPD',fam:'Parent',famRole:'family member',
  open:['I failed the exam.','I worked so hard and','it was all for nothing.'],
  A:{say:['You’re overreacting.','It’s one exam.'],back:['You never take','me seriously!']},
  B:{say:['Don’t worry! You’ll','do better next time.'],back:['They don’t get it.'],think:true},
  C1:{say:['That sounds really','painful. What','happened?'],back:['I just froze on','the first question.']},
  C2:{say:['It makes sense you’re','upset after all that','work. Plan, or talk?'],back:['Talk first.','Then maybe plan.']}},
 partner:{who:'Alex',role:'lives with BPD',fam:'Partner',famRole:'partner',
  open:['You didn’t text back','all afternoon. I','thought you’d left.'],
  A:{say:['You’re being dramatic.','I was busy.'],back:['You don’t care','about me!']},
  B:{say:['Relax, it’s fine.','I’m here now.'],back:['So my feelings','don’t count.'],think:true},
  C1:{say:['You were scared when','I went quiet. That','sounds hard.'],back:['It was. My mind','went to the worst.']},
  C2:{say:['That makes sense','after today. Next time','I’ll text quickly.'],back:['Thank you.','That would help.']}}
};
const FA_STEPS=[
 {from:0,at:.07,k:'The moment',t:'Something painful is said',
  txt:`A person living with BPD brings a painful moment to someone close. Emotional vulnerability in the biosocial model means heightened sensitivity, intense responses and a slow return to baseline: the wave is already rising before anyone replies. [[Crowell2009]] Families are under strain too: in a review of 465 carers, burden ran about half a standard deviation higher than for carers of people with other serious mental illnesses. [[Bailey2013]]`,
  pt:`The feeling is real and strong. What happens next depends on both people, not only one.`,
  hook:`Biosocial model: emotional vulnerability (sensitivity, reactivity, slow return to baseline) × an invalidating environment. [[Crowell2009]]`},
 {from:.11,at:.3,k:'Reply A',t:'Invalidating: "You’re overreacting"',
  txt:`The reply tells the person their feeling is wrong. The invalidating environment of the biosocial model is one that does not tolerate the expression of private emotional experience, especially feelings not backed by observable events. [[Crowell2009]] In the transactional model, critical responses and a person's emotional vulnerability shape each other over time, which is why the family member's own thermometer climbs as well. Its authors say it blames neither the person with BPD nor the parents. <span class="ev hyp">Hypothesis</span> [[Fruzzetti2005]] Among 280 carers, 82.9% reported high criticism in the family. [[Bailey2015]]`,
  pt:`Being told you are overreacting usually makes the feeling bigger, and then both people get upset.`,
  hook:`Transactional model (Fruzzetti): invalidation and emotional vulnerability feed each other; it blames neither side. [[Fruzzetti2005]]`},
 {from:.38,at:.55,k:'Reply B · same moment again',t:'Reassuring, but dismissive',
  txt:`This reply is kind in intent, but it jumps past the feeling to a fix. The wave stops climbing but does not settle, and the person thinks the reply rather than says it. NICE's crisis advice for clinicians names exactly this trap: avoid minimising the person's stated reasons, and do not offer solutions before the problem is clear. [[NICE2009]] Emotional overinvolvement was high in 69.6% of 280 carers, and it went with higher burden for the carer. [[Bailey2015]]`,
  pt:`"Don't worry" is meant kindly, but it can sound like "your feeling doesn't matter".`,
  hook:`NICE CG78 crisis principles: understand the person's point of view, use validating statements, do not minimise, do not offer solutions before the problem is clear. [[NICE2009]]`},
 {from:.62,at:.76,k:'Reply C · validate, part 1',t:'Listen, then reflect what you hear',
  txt:`The first steps of validation are attention and reflection: put other things down, ask an open question, and say back the feeling you hear. NICE describes empathic open questions with validating statements, and trying to understand the crisis from the person's point of view. [[NICE2009]] People with BPD and carers both describe helpful language as "connecting, validating and accepting". [[vanSchie2024]]`,
  pt:`You don't have to agree to validate. You show you have heard the feeling and that it makes sense to you.`,
  hook:`Validation ≠ agreement. It communicates that a response is understandable from the other person's point of view.`},
 {from:.81,at:.95,k:'Reply C · validate, part 2',t:'Make sense of it, then ask before fixing',
  txt:`Next, link the feeling to its causes ("after all that work, it makes sense") and ask whether the person wants help or just to be heard. Problem-solving comes after understanding. DBT family skills training aims to build a mutually validating environment and teaches every family member emotion-regulation and interpersonal skills. [[Hoffman1999]] Family Connections, a 12-week programme led by trained family members, teaches these family skills alongside information and coping skills. [[Hoffman2005]]`,
  pt:`When people feel understood, the wave comes down faster, and then solving the problem gets easier.`,
  hook:`Family Connections: 12 weeks, DBT-based, led by trained family members. [[Hoffman2005]]`}
];
const FA_PERSP={
 parent:` In this version a parent replies to a young adult. Among 82 carers of young people with BPD features, distress and negative caregiving experiences were higher than in general-population adults. [[Seigerman2020]]`,
 partner:` In this version two partners talk. Attachment anxiety correlates with BPD traits (r = 0.48 across 27 effect sizes), so a silence can land as abandonment. [[Smith2020Attachment]]`
};
/* Family Connections outcomes. dir: down / up (a significant improvement), ns (no significant
   difference), fav (effect sizes favoured FC, not significant), nr (not in our source). */
const FA_FC={
 h05:{n:'Hoffman 2005 · uncontrolled',
  rows:[{o:'Burden',d:'down',l:'fell; held at 6 months'},{o:'Grief',d:'down',l:'fell; held at 6 months'},{o:'Depression',d:'nr',l:'not reported in our source'},{o:'Mastery',d:'up',l:'rose; held at 6 months'}],
  k:'44 participants, 34 families',t:'The first Family Connections study',
  txt:`In the first uncontrolled study of Family Connections (44 participants from 34 families), grief and burden fell and mastery rose from before to after the 12 weeks, and the gains held at 6 months. <span class="ev early">Early evidence</span> The developers published a second uncontrolled study in 2007; until 2017 these two were the only studies. [[Hoffman2005,Hoffman2007JMH,Flynn2017]]`,
  pt:`Relatives who took the course felt less weighed down and more able to cope, and still did 6 months later.`,
  hook:`No control group: improvement before and after cannot by itself show the programme caused it.`},
 f17:{n:'Flynn 2017 · controlled, not randomised',cmp:'Optimised TAU',
  rows:[{o:'Burden',d:'down',l:'p < 0.001 · vs TAU p = .02',c:'ns'},{o:'Grief',d:'down',l:'p < 0.001 · vs TAU p = 0.013',c:'ns'},{o:'Depression',d:'down',l:'p < 0.001',c:'ns'},{o:'Mastery',d:'up',l:'p < 0.001',c:'ns'}],
  k:'Ireland · n = 80 (51 FC, 29 comparison)',t:'A comparison group, but no randomisation',
  txt:`In a non-randomised controlled study in Ireland, Family Connections improved burden, grief, depression and mastery (all p < 0.001), while optimised treatment-as-usual showed only non-significant change. Between groups, FC was better for subjective burden (p = .02), objective burden (p = .048) and grief (p = 0.013), and the gains held at 3 and 12–19 months. The comparison arm, a three-session psychoeducation programme, was "of limited benefit". [[Flynn2017]]`,
  pt:`Families who took the full course improved; families who had a short three-session course did not change much.`,
  hook:`Flynn 2017: FC beat a short psychoeducation comparison on burden and grief, but groups were not randomised.`},
 g24:{n:'Guillén 2024 · randomised',cmp:'Active TAU',
  rows:[{o:'Burden',d:'ns',l:'not superior to active TAU',c:'ns'},{o:'Grief',d:'nr',l:'not reported in our source'},{o:'Depression',d:'fav',l:'effect sizes favoured FC',c:'ns'},{o:'Mastery',d:'nr',l:'not reported in our source'}],
  k:'Spain · 121 relatives, 82 families',t:'The randomised trial',
  txt:`In a two-arm randomised trial in Spain (121 relatives from 82 families, plus 82 patients), Family Connections was not statistically superior to an active treatment-as-usual of similar length on burden. Its adjusted means and effect sizes were consistently better for burden, stress, depression, family functioning and quality of life, and patients whose relatives took FC improved significantly in stress, depression and anxiety. [[Guillen2024]]`,
  pt:`Against another good programme of the same length, FC was not clearly better, though the numbers leaned its way.`,
  hook:`Only RCT of FC vs active TAU: no significant difference on burden. Status: promising, not proven superior. [[Guillen2024]]`},
 l25:{n:'Lanfredi 2025 · before and after',
  rows:[{o:'Burden',d:'down',l:'fell; held at 4 months'},{o:'Grief',d:'down',l:'fell; held at 4 months'},{o:'Depression',d:'down',l:'fell; held at 4 months'},{o:'Mastery',d:'nr',l:'not reported in our source'}],
  k:'Italy · 202 caregivers',t:'A large Italian sample',
  txt:`In 202 Italian caregivers, burden, grief, depression, global distress and both suppressed and expressed anger fell after Family Connections, and the gains held at 4 months. [[Lanfredi2025]] In another sample of 75 participants (57% parents), hopelessness was mostly minimal or mild to begin with (mean 4.61) and did not change significantly. [[Joyce2024]]`,
  pt:`In a big group of Italian families, carers felt less burden, grief, low mood and anger after the course.`,
  hook:`Uncontrolled FC studies consistently show lower burden and grief; the controlled evidence is thinner. [[Lanfredi2025,Guillen2024]]`}
};
inits.families=()=>{
  const svg=$('#faSvg'),rg=$('#faT'),note=$('#faNote'),read=$('#faRead');
  let who=store.get('fa-persp','parent');if(!FA_SCRIPT[who])who='parent';
  let setSt=()=>{};
  function ver(t){return t<FA_V.B.t0?'A':t<FA_V.C.t0?'B':'C'}
  function uOf(v,t){return ramp(t,FA_V[v].t0,FA_V[v].t1)}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const S=FA_SCRIPT[who],v=ver(t),u=uOf(v,t),wf=FA_WAVE[v];
    const L=N?{P:[105,122,84],C:[295,122,84],pb:[6,12,190,62],cb:[204,12,190,62],tp:34,tc:366,th:74,nm:236,chip:[6,272,388,28],cap:318,
               ch:{x:40,y:356,w:250,h:150,tl:340,lx:298,ax:528}}
            :{P:[110,150,96],C:[330,150,96],pb:[10,24,200,64],cb:[230,24,200,64],tp:42,tc:398,th:86,nm:272,chip:[10,302,420,30],cap:356,
               ch:{x:462,y:58,w:160,h:206,tl:34,lx:628,ax:286}};
    const [px,py,ps]=L.P,[cx,cy,cs]=L.C;
    let s='';
    /* bond */
    const B=FA_BOND[v](u);
    s+=bond(px+ps*.32,py+ps*.62,cx-cs*.32,cy+cs*.62,{k:B.k,rupture:B.rupture,curve:N?10:14});
    const bw=B.rupture>.3?'broken':B.k<.3?'thin':B.k<.55?'strained':B.k<.8?'steady':'strong';
    s+=`<text x="${f1((px+cx)/2)}" y="${f1(py+ps*.62-(N?16:20))}" class="t-xs t-mid" style="fill:var(--bond)">bond: ${bw}</text>`;
    /* people */
    s+=person(px,py,ps,'var(--self)')+person(cx,cy,cs,'var(--other)');
    /* thermometers */
    const pv=wf(u),cvv=FA_CARER[v](u);
    s+=thermo(L.tp,py+4,L.th,pv,{w:N?10:12,label:'feeling'})+thermo(L.tc,cy+4,L.th,cvv,{w:N?10:12,label:'feeling'});
    /* names */
    s+=`<text x="${px}" y="${L.nm}" class="t-lbl t-mid">${S.who}</text><text x="${px}" y="${L.nm+14}" class="t-xs t-mid">${S.role}</text>`;
    s+=`<text x="${cx}" y="${L.nm}" class="t-lbl t-mid">${S.fam}</text><text x="${cx}" y="${L.nm+14}" class="t-xs t-mid">${S.famRole}</text>`;
    /* speech */
    const key=v==='C'?(u>=.5?'C2':'C1'):v,R=S[key],tipP=[px,py-6],tipC=[cx,cy-6];
    const [bx,by,bwid,bh]=L.pb,[qx,qy,qw,qh]=L.cb;
    /* what the person with BPD is saying (or thinking) now */
    let pl=S.open,pThink=false;
    if(v!=='C'){if(u>=.55){pl=R.back;pThink=!!R.think}}
    else if(u>=.62)pl=S.C2.back;else if(u>=.5)pl=['\u2026'];else if(u>=.38)pl=S.C1.back;
    s+=bubble(bx,by,bwid,bh,{tx:tipP[0],ty:tipP[1],lines:pl,col:pThink?'var(--muted)':'var(--self)',think:pThink});
    if(u>=.3)s+=bubble(qx,qy,qw,qh,{tx:tipC[0],ty:tipC[1],lines:R.say,col:FA_V[v].col,fill:'var(--panel)'});
    else s+=`<text x="${qx+qw/2}" y="${qy+qh/2+4}" class="t-xs t-mid">listening…</text>`;
    if(pThink)s+=`<text x="${bx+bwid/2}" y="${by+bh+(N?14:16)}" class="t-xs t-mid">(thought, not said)</text>`;
    /* version chips */
    const [kx,ky,kw,kh]=L.chip,cw=kw/3;
    ['A','B','C'].forEach((k,i)=>{const on=k===v,done=FA_V[k].t1<=t+1e-6&&!on,x=kx+cw*i+2;
      s+=`<rect x="${f1(x)}" y="${ky}" width="${f1(cw-4)}" height="${kh}" rx="${kh/2}" style="fill:${on?FA_V[k].col:'var(--panel-2)'};stroke:${FA_V[k].col};stroke-width:1.2;opacity:${on||done?1:.6}"/>`+
        `<text x="${f1(x+(cw-4)/2)}" y="${f1(ky+kh/2+4)}" class="${N?'t-xs':'t-sm'} t-mid" style="fill:${on?'var(--panel)':'var(--ink)'};font-weight:600">${k} · ${FA_V[k].name}${done&&!N?' ✓':''}</text>`});
    const cap=u<.3?(v==='A'?'The opening line. Nobody has replied yet.':'Same moment, replayed: a different reply is coming.'):
      v==='A'?(u<.55?'Reply A dismisses the feeling.':'The feeling escalates on both sides.'):
      v==='B'?(u<.55?'Reply B reassures, but skips the feeling.':'The wave stalls high: it is not heard.'):
      (u<.5?'Reply C listens and reflects.':'Reply C makes sense of it, then asks.');
    s+=`<text x="${f1(kx+kw/2)}" y="${L.cap}" class="t-sm t-mid" style="fill:var(--ink)">${cap}</text>`;
    /* emotion wave chart */
    const c=L.ch;
    s+=`<text x="${c.x}" y="${c.tl}" class="t-sm" style="fill:var(--mood);font-weight:600">${N?'EMOTION WAVE · '+S.who.toUpperCase():'EMOTION WAVE'}</text>`;
    if(!N)s+=`<text x="${c.x}" y="${c.tl+14}" class="t-xs">${S.who}, schematic intensity</text>`;
    s+=`<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const rx=c.x+c.w*.3;
    s+=`<line x1="${f1(rx)}" x2="${f1(rx)}" y1="${c.y}" y2="${c.y+c.h}" class="grid"/><text x="${f1(rx+4)}" y="${c.y+c.h-6}" class="t-xs">reply</text>`;
    s+=`<text x="${c.x+4}" y="${c.y+c.h-6}" class="t-xs">opener</text>`;
    const thr=wave(c.x,c.y,c.w,c.h,FA_WAVE.A,{upto:0,thr:.78,thrLabel:'overwhelmed'});s+=thr.svg;
    ['A','B','C'].forEach(k=>{const isCur=k===v,past=FA_V[k].t1<=t+1e-6;if(!isCur&&!past)return;
      const W=wave(c.x,c.y,c.w,c.h,FA_WAVE[k],{upto:isCur?Math.max(.004,u):1,col:FA_V[k].col,dot:isCur,fill:isCur});
      s+=`<g style="opacity:${isCur?1:.45}">${W.svg}</g>`;
      if(past||u>.96){const e=W.at(1);s+=`<text x="${c.lx}" y="${f1(e[1]+3)}" class="t-xs" style="fill:${FA_V[k].col};font-weight:600">${k} ${FA_V[k].name}</text>`}});
    s+=`<text x="${c.x+c.w}" y="${c.ax}" class="t-xs t-end">time after the opener →</text>`;
    svg.innerHTML=s;
    /* note + readout */
    const i=phaseOf(FA_STEPS,t),P=Object.assign({},FA_STEPS[i]);
    if(i===0)P.txt+=FA_PERSP[who];
    note.innerHTML=noteHTML(P);setSt(i);
    read.innerHTML=`<span>Reply <b>${v} · ${FA_V[v].name}</b></span><span>${S.who}: <b>${Math.round(pv*100)}</b>/100</span><span>${S.fam}: <b>${Math.round(cvv*100)}</b>/100</span><span>Bond <b>${bw}</b></span><span>(schematic units)</span>`;
  }
  const stop=playWire(rg,$('#faPlay'),draw,16000,'%t:player.replay%','families');
  setSt=stepWire($('#faSteps'),FA_STEPS,rg,draw,stop);
  $$('[data-fap]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.fap===who);
    b.addEventListener('click',()=>{who=b.dataset.fap;store.set('fa-persp',who);$$('[data-fap]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)})});
  draw(+rg.value);

  /* ---- Family Connections outcomes ---- */
  const fsv=$('#faFc'),fnote=$('#faFcNote');let st='h05',stopF=null;
  const AFT={down:.58,up:1.42,ns:.96,fav:.82};
  function drawFc(p){
    const N=vb(fsv,'620 290','400 470'),D=FA_FC[st],cmp=!!D.cmp;
    const L=N?{x:20,w:250,row:104,y0:58,lbl:0}:{x:110,w:380,row:56,y0:62,lbl:1};
    let s=`<text x="${N?20:20}" y="22" class="t-sm" style="fill:var(--brand);font-weight:600">${D.n.toUpperCase()}</text>`;
    s+=`<text x="${N?20:20}" y="38" class="t-xs"><tspan style="fill:var(--muted)">■ before</tspan>   <tspan style="fill:var(--accent)">■ after Family Connections</tspan>${cmp?`   <tspan style="fill:var(--other)">■ ${D.cmp}, after</tspan>`:''}</text>`;
    const base=N?L.w*.5:190,bh=cmp?11:14;
    D.rows.forEach((r,i)=>{const y=L.y0+i*L.row,good=r.d==='down'||r.d==='up';
      const lx=N?L.x:L.x-12,ly=N?y+4:y+16;
      s+=`<text x="${lx}" y="${ly}" class="t-lbl${N?'':' t-end'}">${r.o}</text>`;
      const by=N?y+12:y+2;
      s+=`<rect x="${L.x}" y="${by}" width="${f1(base)}" height="${bh}" rx="3" style="fill:var(--muted);opacity:.45"/>`;
      if(r.d!=='nr'){const w=base*lerp(1,AFT[r.d],ease(p));
        s+=`<rect x="${L.x}" y="${by+bh+3}" width="${f1(w)}" height="${bh}" rx="3" style="fill:var(--accent)${r.d==='fav'?';opacity:.55':''}"/>`;
        if(r.d==='fav')s+=`<rect x="${L.x}" y="${by+bh+3}" width="${f1(w)}" height="${bh}" rx="3" style="fill:none;stroke:var(--accent);stroke-dasharray:4 3"/>`;
        if(cmp&&r.c){const wc=base*lerp(1,AFT[r.c],ease(p));s+=`<rect x="${L.x}" y="${by+2*bh+6}" width="${f1(wc)}" height="${bh}" rx="3" style="fill:var(--other);opacity:.8"/>`}
        const arrow=r.d==='down'?'↓':r.d==='up'?'↑':r.d==='fav'?'↘':'≈';
        const tx=N?L.x:L.x+base*1.45+10,ty=N?by+(cmp?3:2)*bh+(cmp?24:20):by+bh+6;
        s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-sm" style="fill:${good?'var(--good)':'var(--warn)'};font-weight:600">${arrow} ${r.l}</text>`;
        if(cmp&&r.c&&!N)s+=`<text x="${f1(tx)}" y="${f1(ty+15)}" class="t-xs">${D.cmp}: ${r.c==='ns'?'no significant change':r.c}</text>`;
        if(cmp&&r.c&&N)s+=`<text x="${f1(tx)}" y="${f1(ty+14)}" class="t-xs">${D.cmp}: no significant change</text>`;
      }else{
        const tx=N?L.x:L.x+base+10,ty=N?by+bh+18:by+bh-2;
        s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-xs">${r.l}</text>`}
    });
    fsv.innerHTML=s;
  }
  function pickFc(k){st=k;$$('[data-fas]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fas===k));
    const D=FA_FC[k];fnote.innerHTML=noteHTML({k:D.k,t:D.t,txt:D.txt,pt:D.pt,hook:D.hook});
    if(stopF)stopF();clearTimeout(pickFc.tm);stopF=animate(700,drawFc,()=>{stopF=null});
    /* a background tab can pause animation frames: make sure the final state is drawn */
    pickFc.tm=setTimeout(()=>{if(stopF){stopF();stopF=null}drawFc(1)},900)}
  $$('[data-fas]').forEach(b=>b.addEventListener('click',()=>pickFc(b.dataset.fas)));
  drawFc(1);pickFc('h05');
  redraws.families=(()=>{const prev=redraws.families;return()=>{prev&&prev();drawFc(1)}})();

  /* ---- carer checklist: educational, never scored ---- */
  const out=$('#faCheckOut'),NM={sleep:'sleep and health',support:'people to talk to',therapy:'help of your own',limits:'limits',info:'good information'};
  function chk(){const on=$$('[data-fac]').filter(c=>c.checked);
    $$('[data-fac]').forEach(c=>{c.closest('li').querySelector('.tip').hidden=!c.checked});
    const st0=store.get('fa-check',{});$$('[data-fac]').forEach(c=>st0[c.dataset.fac]=c.checked);store.set('fa-check',st0);
    out.textContent=on.length?`In place: ${on.map(c=>NM[c.dataset.fac]).join(', ')}. This is not a score; anything unticked is simply a place to start.`:'Nothing ticked yet. That is common: carers often put themselves last.'}
  const saved=store.get('fa-check',{});
  $$('[data-fac]').forEach(c=>{c.checked=!!saved[c.dataset.fac];c.addEventListener('change',chk)});
  chk();
};
