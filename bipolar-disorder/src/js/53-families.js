/* =============== 5.3 Families, work & school =============== */
inits.families=()=>{
  const svg=$('#faSvg'),rg=$('#faT'),noteEl=$('#faNote');
  const T0=.14,T1=.74;/* sessions run from T0 to T1, the follow-up after */
  const MODS3=[{n:'psychoeducation',c:'var(--brand)'},{n:'communication',c:'var(--accent)'},{n:'problem solving',c:'var(--rx)'}];
  const STEPS=[
   {from:0,at:.07,k:'Before therapy',t:'Expressed emotion',
    txt:`Researchers rate the family climate as <b>expressed emotion</b> (EE): critical, hostile or emotionally over-involved attitudes towards the person. In 23 recently manic inpatients, high family EE and a negative affective style predicted relapse over the 9 months after discharge, independent of whether medicines were taken. A meta-analysis found EE robustly predicts relapse, with larger effects in mood disorders than in schizophrenia. The 1988 study reports this as a prediction; its abstract gives no relapse percentage that could be checked, so none is shown. [[Miklowitz1988EE,Butzlaff1998]]`,
    pt:`Expressed emotion describes how a family talks with and about the person. It is a pattern that can change, not a verdict on anyone.`,
    hook:`High EE = critical, hostile or over-involved; it predicted relapse in bipolar disorder (Miklowitz 1988). [[Miklowitz1988EE]]`},
   {from:T0,at:.25,k:'Months 1–3',t:'Psycho&shy;education',
    txt:`In the 2003 trial, 101 people recovering from a manic, mixed or depressive episode were randomised to 21 sessions of family-focused therapy (FFT) over 9 months, or to crisis management, all with medication. FFT starts by learning together: what bipolar disorder is, its early warning signs and how to plan for relapse. Caring often weighs heavily: carers show high EE, and carer burden is linked to carer depression. [[Miklowitz2003FFT,Ogilvie2005]]`,
    pt:`The whole family learns the same facts about the illness at the same time, so nobody has to guess.`,
    hook:`NICE CG185: offer a family intervention to people who live with or are in close contact with family (1.7.2). [[NICE2014CG185]]`},
   {from:.36,at:.46,k:'Months 4–6',t:'Communication training',
    txt:`The middle part practises how the family talks together, which is exactly the climate that expressed emotion measures. In the gauge, criticism and hostility fall; this is a schematic picture, because the trial reported relapse, not EE scores. Family or conjoint therapy also kept people in treatment better than standard psychoeducation (OR 0.46). [[Miklowitz2003FFT,Miklowitz1988EE,Miklowitz2021NMA]]`,
    pt:`Families practise saying hard things calmly, and listening, so a worry can be raised without a fight.`,
    hook:`FFT = psychoeducation + communication training + problem solving, over 21 sessions in 9 months. [[Miklowitz2003FFT]]`},
   {from:.56,at:.66,k:'Months 7–9',t:'Problem solving',
    txt:`The last part works through practical problems the family faces. In a network meta-analysis of 39 trials, psychoeducation with guided practice of illness-management skills in a family or group format reduced recurrences compared with the same strategies delivered individually (OR 0.12). Another network meta-analysis found that only carer-focused interventions significantly reduced manic or depressive relapse. [[Miklowitz2021NMA,Chatterton2017]]`,
    pt:`Instead of arguing about a problem, the family lists options together and tries one.`,
    hook:`Carer-focused interventions were the only ones to significantly cut relapse in Chatterton 2017. [[Chatterton2017]]`},
   {from:T1,at:.97,k:'Two years later',t:'Fewer relapses',
    txt:`Over 2 years, 35% (11 of 31) relapsed with FFT against 54% (38 of 70) with crisis management, and mean time without relapse was 73.5 against 53.2 weeks (HR 0.38, intention to treat). FFT also improved medication adherence. These are trial averages, not a promise for any one family. [[Miklowitz2003FFT]]`,
    pt:`Families who took part together saw fewer relapses and longer well spells than families who only had help in a crisis.`,
    hook:`FFT 2-year relapse: 35% vs 54% (HR 0.38). [[Miklowitz2003FFT]]`}
  ];
  /* schematic climate: criticism, hostility, over-involvement fall through the three parts */
  const CL=[['criticism',.82,.3],['hostility',.62,.18],['over-involvement',.74,.32]];
  const climate=(t,i)=>{const [,a,b]=CL[i];const p=i===2?ramp(t,.18,.7):ramp(t,.3,.62);return lerp(a,b,ease(p))};
  const SAY=[
    [['You’re just being lazy again.'],['I’ll sort everything out','for you, as always.']],
    [['So short nights can be','an early warning sign?']],
    [['I noticed you’ve been up late.','I’m worried. Can we talk?']],
    [['Let’s list some options','and pick one to try.']],
    [['We know our plan,','and who to call.']]];
  let setSt=()=>{};
  function bubble(x,y,lines,col,tail){const w=Math.max(...lines.map(l=>l.length))*6.3+20,h=lines.length*15+12;
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="10" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/>`;
    s+=`<path d="M${f1(tail[0])} ${f1(y+h)}l6 9 4-9" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/><path d="M${f1(tail[0]+.8)} ${f1(y+h-1)}h8.4" style="stroke:var(--panel);stroke-width:2.4"/>`;
    lines.forEach((l,i)=>{s+=`<text x="${f1(x+10)}" y="${f1(y+19+i*15)}" style="font:600 12px var(--body);fill:var(--ink)">${l}</text>`});return s}
  function draw(t){
    const N=vb(svg,'720 400','400 650'),ph=phaseOf(STEPS,t);
    const L=N?{tx0:20,tx1:380,ty:52,sx:20,sy:118,sw:360,gx:20,gy:346,gw:360,ox:20,oy:500,ow:360}
             :{tx0:40,tx1:680,ty:48,sx:30,sy:104,sw:330,gx:400,gy:100,gw:290,ox:400,oy:262,ow:290};
    let s='';
    /* timeline */
    const TX=u=>lerp(L.tx0,L.tx1,u);
    s+=`<text x="${L.tx0}" y="${L.ty-26}" class="t-sm" style="fill:var(--ink)">${N?'FFT: 21 SESSIONS, 9 MONTHS':'FAMILY-FOCUSED THERAPY · 21 SESSIONS OVER 9 MONTHS'}</text>`;
    s+=`<line x1="${f1(TX(0))}" x2="${f1(TX(1))}" y1="${L.ty}" y2="${L.ty}" class="axis"/>`;
    MODS3.forEach((m,i)=>{const a=lerp(T0,T1,i/3),b=lerp(T0,T1,(i+1)/3),on=t>=a;
      s+=`<rect x="${f1(TX(a))}" y="${L.ty-5}" width="${f1(TX(b)-TX(a)-2)}" height="10" rx="5" style="fill:${m.c};opacity:${on?.25:.08}"/>`;
      s+=`<text x="${f1((TX(a)+TX(b))/2)}" y="${L.ty+22}" class="t-xs t-mid" style="fill:${on?m.c:'var(--muted)'};font-weight:${on?700:500}">${N?['psychoed.','communic.','problems'][i]:m.n}</text>`});
    for(let i=0;i<21;i++){const u=lerp(T0,T1,(i+.5)/21),on=t>=u,c=MODS3[Math.floor(i/7)].c;s+=`<circle cx="${f1(TX(u))}" cy="${L.ty}" r="${on?3.6:2.6}" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.2"/>`}
    if(!N)s+=`<text x="${f1(TX(T0/2))}" y="${L.ty+22}" class="t-xs t-mid">before</text>`;s+=`<text x="${f1(TX((T1+1)/2))}" y="${L.ty+22}" class="t-xs t-mid">${N?'2-yr follow-up':'2-year follow-up'}</text>`;
    s+=`<path d="M${f1(TX(t))} ${L.ty-12}l-5 -7h10z" style="fill:var(--ink)"/>`;
    /* family scene */
    const fy=L.sy+(N?120:130),cxs=[L.sx+L.sw*.2,L.sx+L.sw*.5,L.sx+L.sw*.8];
    s+=`<rect x="${f1(L.sx+L.sw*.08)}" y="${f1(fy+44)}" width="${f1(L.sw*.84)}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const who=['relative','the person','relative'];
    cxs.forEach((x,i)=>{s+=person(x,fy-6,54,i===1?'var(--brand)':'var(--muted)');s+=`<text x="${f1(x)}" y="${f1(fy+70)}" class="t-xs t-mid">${who[i]}</text>`});
    const lines=SAY[ph];
    if(ph===0){s+=bubble(L.sx,L.sy,lines[0],'var(--bad)',[cxs[0]-6]);const w2=Math.max(...lines[1].map(l=>l.length))*6.3+20;s+=bubble(L.sx+L.sw-w2,L.sy+(N?40:44),lines[1],'var(--warn)',[cxs[2]-10])}
    else{const w=Math.max(...lines[0].map(l=>l.length))*6.3+20,spk=ph===1?1:ph===4?1:ph===3?2:0,bx=clamp(cxs[spk]-w/2,L.sx,L.sx+L.sw-w);s+=bubble(bx,L.sy+24,lines[0],ph===4?'var(--good)':MODS3[Math.min(2,ph-1)].c,[cxs[spk]-6])}
    /* climate gauge */
    s+=`<text x="${L.gx}" y="${L.gy}" class="t-sm" style="fill:var(--ink)">FAMILY CLIMATE</text><text x="${L.gx+L.gw}" y="${L.gy}" class="t-xs t-end">schematic</text>`;
    CL.forEach(([n],i)=>{const v=climate(t,i),y=L.gy+18+i*34,w=L.gw;
      s+=`<text x="${L.gx}" y="${y+4}" class="t-xs">${n}</text>`;
      s+=`<rect x="${L.gx}" y="${y+9}" width="${w}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.gx}" y="${y+9}" width="${f1(w*v)}" height="10" rx="5" style="fill:${v>.55?'var(--bad)':v>.4?'var(--warn)':'var(--good)'};opacity:.8"/>`});
    const ee=(climate(t,0)+climate(t,1)+climate(t,2))/3;
    s+=`<text x="${L.gx}" y="${L.gy+124}" class="t-lbl" style="fill:${ee>.55?'var(--bad)':ee>.4?'var(--warn)':'var(--good)'}">${ee>.55?'High expressed emotion':ee>.4?'Climate shifting':'Calmer, lower-EE climate'}</text>`;
    /* outcomes */
    const g=ease(ramp(t,T1+.02,.95));
    s+=`<text x="${L.ox}" y="${L.oy}" class="t-sm" style="fill:var(--ink)">TWO-YEAR RESULTS</text><text x="${L.ox+L.ow}" y="${L.oy}" class="t-xs t-end">Miklowitz 2003</text>`;
    if(g<=0)s+=`<text x="${L.ox}" y="${L.oy+24}" class="t-xs">appear after the 9 months of sessions</text>`;
    else{const rows=[['Relapsed by 2 years',[['FFT',35,'%','var(--brand)'],['crisis management',54,'%','var(--muted)']],60],['Mean weeks without relapse',[['FFT',73.5,' wk','var(--brand)'],['crisis management',53.2,' wk','var(--muted)']],80]];
      let y=L.oy+20;const lw=N?118:112,bw=L.ow-lw-44;
      rows.forEach(([h,R,mx])=>{s+=`<text x="${L.ox}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:600">${h}</text>`;y+=8;
        R.forEach(([n,v,u,c])=>{const vv=v*g;s+=`<text x="${f1(L.ox+lw-6)}" y="${y+10}" class="t-xs t-end">${n}</text><rect x="${L.ox+lw}" y="${y+1}" width="${f1(bw*vv/mx)}" height="12" rx="3" style="fill:${c};opacity:.85"/><text x="${f1(L.ox+lw+bw*vv/mx+5)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${u===' wk'?f1(vv):Math.round(vv)}${u}</text>`;y+=17});y+=10});
      if(g>.95)s+=`<text x="${L.ox}" y="${y+2}" class="t-xs">HR 0.38 for relapse · adherence improved too</text>`}
    svg.innerHTML=s;noteEl.innerHTML=noteHTML(STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#faPlay'),draw,20000,'Replay','families');
  setSt=stepWire($('#faSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- what helps, what hurts ---------- */
  const VL={helps:'Helps',hurts:'Can hurt',mixed:'Mixed evidence',myth:'Not so'};
  const CARDS=[
   {f:'Calling the person lazy or selfish when they are depressed',v:'hurts',b:'Critical and hostile comments are part of high expressed emotion, which predicted relapse in bipolar disorder. [[Miklowitz1988EE,Butzlaff1998]]'},
   {f:'Learning the person’s early warning signs together',v:'helps',b:'At least 80% of people can name an early sign, and family-focused therapy, which starts with this kind of learning, cut 2-year relapse from 54% to 35%. [[Jackson2003,Miklowitz2003FFT]]'},
   {f:'Taking over every decision “for their own good”',v:'hurts',b:'Emotional over-involvement is the third strand of expressed emotion, alongside criticism and hostility. [[Miklowitz1988EE]]'},
   {f:'Joining a carers’ education group, even if the person does not come',v:'helps',b:'Twelve group sessions for caregivers only reduced the share of patients with any recurrence and lengthened relapse-free time, mainly for hypomania and mania. [[Reinares2008]]'},
   {f:'Putting your own health on hold, indefinitely',v:'hurts',b:'High-burden carers reported more physical health problems and depressive symptoms and less support. Family-focused therapy for carers reduced carers’ depressive symptoms. [[Perlick2007,Perlick2010]]'},
   {f:'Agreeing early on how information about risk will be shared',v:'helps',b:'NICE says to negotiate early how information will be shared, stressing the importance of sharing information about risk (1.1.7). [[NICE2014CG185]]'},
   {f:'Writing a crisis plan together while things are calm',v:'helps',b:'NICE recommends a jointly made plan with triggers, early signs, coping strategies and crisis contacts (1.4.1). One trial of joint crisis plans halved compulsory treatment (13% vs 27%). [[NICE2014CG185,Henderson2004BMJ]]'},
   {f:'Keeping regular household routines: meals, wake time, bedtime',v:'helps',b:'More regular daily rhythms went with fewer recurrences in IPSRT, and sleep disturbance is the most common early sign of mania. [[Frank2005IPSRT,Jackson2003]]'},
   {f:'Learning about the medicines as a family',v:'helps',b:'Family-focused therapy improved medication adherence, and psychoeducation reduced non-adherence in a network meta-analysis. [[Miklowitz2003FFT,Chatterton2017]]'},
   {f:'Assuming the children will develop bipolar disorder',v:'myth',b:'In a 22-year offspring study, 11–13% developed bipolar disorder, so most did not. Mood disorders overall were common (65%), so early help is worth having. [[Helmink2025]]'},
   {f:'Relying on an online toolkit for relatives on its own',v:'mixed',b:'In the REACT trial (800 relatives), distress fell in both arms, with no difference between the online toolkit and a resource directory alone. [[Lobban2020REACT]]'},
   {f:'Hearing a hopeful message about recovery',v:'helps',b:'NICE says carers should be offered an education and support programme “with a positive message about recovery” (1.1.8). [[NICE2014CG185]]'}];
  const box=$('#faCards'),cnt=$('#faCount'),all=$('#faAll');
  box.innerHTML=CARDS.map((c,i)=>`<button class="fa-card v-${c.v}" data-fa="${i}" aria-pressed="false"><span class="fa-f">${c.f}</span><span class="fa-b"><span class="fa-v">${VL[c.v]}</span>${c.b}</span><small>Tap to turn over</small></button>`).join('');
  const upd=()=>{const n=$$('.fa-card[aria-pressed="true"]',box).length;cnt.innerHTML=`<span>turned over <b>${n}</b> of 12</span>`;all.setAttribute('aria-pressed',String(n===12));all.textContent=n===12?'Turn all cards back':'Turn all cards over'};
  box.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('.fa-card');if(!b)return;b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'));upd()});
  all.addEventListener('click',()=>{const on=all.getAttribute('aria-pressed')!=='true';$$('.fa-card',box).forEach(b=>b.setAttribute('aria-pressed',String(on)));upd()});
  upd();
};
