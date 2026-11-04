/* =============== 5.3 Families, friends and everyday life =============== */
const FA_STEPS=[
 {from:0,at:.07,k:'The whole family',t:'Drinking affects everyone close',
  txt:`Family members of people with alcohol or drug dependence were more likely than family members of people with diabetes or asthma to be diagnosed with substance use disorders, depression and trauma, with similar or higher healthcare costs. Family help comes in three kinds: helping the family member get the person into treatment, involving the family in that treatment, and supporting family members in their own right. [[Ray2009Family,Copello2005]]`,
  pt:`When someone drinks heavily, the people around them carry stress too. Their own health matters.`,
  hook:`Three kinds of family intervention: engage the person, involve the family in treatment, support the family itself. [[Copello2005]]`},
 {from:.16,at:.25,k:'Children',t:'Children growing up with a parent\'s drinking',
  txt:`About 7.5 million US children (10.5%) aged 17 or younger lived with at least one parent with past-year AUD (2009–2014). In 8,629 adults in the ACE study, the mean number of adverse childhood experiences was 1.4 with no parental alcohol problem, 2.6 with the father only, 3.2 with the mother only and 3.8 with both. These are retrospective reports and cannot prove cause; the authors call for joined-up adult and paediatric care. [[Lipari2017,Dube2001]]`,
  pt:`Children often feel the strain. It is never their fault, and support for the whole family helps.`,
  hook:`Parental alcohol problems raised the odds of each adverse childhood experience about 2 to 13 times (ACE study). [[Dube2001]]`},
 {from:.33,at:.4,k:'Help for you',t:'Support in your own right',
  txt:`Al-Anon is the most widely used help for people concerned about someone else's drinking: in a national survey of 359 newcomers and 264 members, members were more satisfied with their quality of life. When the person who drinks will not seek help, Al-Anon facilitation and coping-skills training help family members cope better. Family members improved psychologically and physically whether they had CRAFT, Al-Anon or the Johnson intervention. [[Timko2013,OFarrell2012,Roozen2010CRAFT]]`,
  pt:`You can get support even if your loved one is not ready. Looking after yourself is not giving up on them.`,
  hook:`Every family approach studied improved the family member's own wellbeing. [[Miller1999,Roozen2010CRAFT]]`},
 {from:.5,at:.6,k:'CRAFT',t:'Community reinforcement and family training',
  txt:`CRAFT trains a concerned family member or friend, building on the community reinforcement approach, which reduces drinking days more than usual care. It works with the person who drinks still at home and not yet seeking help. In a trial of 130 family members, engagement usually came after 4 to 6 sessions. [[Miller1999,Roozen2004CRA,Hunt1973]]`,
  pt:`CRAFT is training for you, the family member, in ways to make treatment more likely, without confrontation.`,
  hook:`CRAFT engagement typically follows 4–6 sessions with the family member. [[Miller1999]]`},
 {from:.66,at:.8,k:'Comparing approaches',t:'Which approach gets a loved one to treatment?',
  txt:`In the RCT of 130 concerned significant others, CRAFT engaged 64% of initially unmotivated problem drinkers in treatment, against 30% for the Johnson Institute confrontational intervention and 13% for Al-Anon facilitation. 70% of families assigned to the Johnson intervention chose not to go ahead with the confrontation. A review found CRAFT about three times as effective as Al-Anon/Nar-Anon (RR 3.25; NNT 2) and twice the Johnson intervention (RR 2.15; NNT 3). [[Miller1999,Roozen2010CRAFT]]`,
  pt:`Calm, practised skills got more loved ones into treatment than a surprise confrontation did.`,
  hook:`CRAFT 64% vs Johnson 30% vs Al-Anon facilitation 13% engaged (Miller 1999). [[Miller1999]]`},
 {from:.86,at:.94,k:'Together in treatment',t:'Couples and family therapy',
  txt:`Once the person enters treatment, behavioural couples therapy (BCT) is "clearly more effective" than individual treatment for abstinence and relationship functioning, including in studies with women and with gay and lesbian couples. In a meta-analysis of 12 RCTs (n = 754), BCT beat individual treatment (d = 0.54), and its advantage grew over time: frequency of use d = 0.45, consequences 0.50, relationship satisfaction 0.51. [[OFarrell2012,Powers2008]]`,
  pt:`When both partners take part, treatment often works better, for drinking and for the relationship.`,
  hook:`BCT vs individual treatment: d = 0.54 (12 RCTs). [[Powers2008]]`}
];
const FA_LANG={
 home:{old:`I can't keep living with <mark>a drunk</mark>. He's <mark>an alcoholic</mark> and he <mark>relapsed</mark> again.`,neu:`I'm worried about my partner. He has <mark>alcohol use disorder</mark>, he <mark>had a recurrence of use</mark> this week, and I want us both to get support.`},
 clinic:{old:`Patient is <mark>an alcohol abuser</mark> who <mark>relapsed</mark> after detox.`,neu:`Patient has <mark>alcohol use disorder</mark>, severe; <mark>recurrence of use</mark> after withdrawal management. Discussed medicine and follow-up.`},
 work:{old:`We can't trust him with the team, he's <mark>an addict</mark>.`,neu:`He is <mark>a person in recovery</mark> and is getting treatment; we will support his return to work.`}};
inits.families=()=>{
  const svg=$('#faSvg'),rg=$('#faT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(FA_STEPS,t),u=ramp(t,FA_STEPS[p].from,p<5?FA_STEPS[p+1].from:1);
    /* constellation box */
    const O=N?{cx:200,cy:158,sc:1.22}:{cx:205,cy:182,sc:1.38};
    const M=[{k:'partner',n:'partner',a:-.5,d:118,s:52},{k:'kid1',n:'child',a:.45,d:120,s:38},{k:'kid2',n:'child',a:1.05,d:112,s:34},{k:'par',n:'parent',a:Math.PI+.45,d:122,s:50},{k:'fr',n:'friend',a:Math.PI-.35,d:126,s:48}];
    let s=`<defs>${marker('faA','var(--rx)')}</defs>`;
    const pos=m=>[O.cx+Math.cos(m.a)*m.d*O.sc,O.cy+Math.sin(m.a)*m.d*O.sc*.92];
    /* ripples */
    if(p===0)for(let i=0;i<3;i++){const k=(u*1.4+i/3)%1;s+=`<circle cx="${O.cx}" cy="${O.cy}" r="${f1(30+k*140)}" style="fill:none;stroke:var(--accent);stroke-width:1.4;opacity:${f1((1-k)*.5)}"/>`}
    M.forEach(m=>{const [x,y]=pos(m);s+=`<line x1="${O.cx}" y1="${O.cy}" x2="${f1(x)}" y2="${f1(y)}" style="stroke:var(--line);stroke-width:1.4"/>`});
    /* CRAFT: arrow partner -> person */
    if(p===3||p===4){const [x,y]=pos(M[0]),k=p===3?ease(ramp(u,0,.8)):1;s+=`<line x1="${f1(x)}" y1="${f1(y+20)}" x2="${f1(lerp(x,O.cx+24,k))}" y2="${f1(lerp(y+20,O.cy-4,k))}" style="stroke:var(--rx);stroke-width:2.6" marker-end="url(#faA)"/>`}
    /* support circle around partner and the other adults */
    if(p===2||p===3){const k=p===2?ramp(u,0,.6):1;[M[0],M[3]].forEach(m=>{const [x,y]=pos(m);s+=`<circle cx="${f1(x)}" cy="${f1(y+m.s*.5)}" r="${f1(m.s*.85*k+1)}" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.4;opacity:${f1(.9*k)}"/>`});
      const [x,y]=pos(M[0]);s+=`<text x="${f1(x)}" y="${f1(y-12)}" class="t-xs t-mid" style="fill:var(--good);opacity:${f1(k)}">support for you</text>`}
    /* couples therapy: a shared circle */
    if(p===5){const [x,y]=pos(M[0]),k=ramp(u,0,.6),mx=(x+O.cx)/2,my=(y+O.cy)/2+14;s+=`<ellipse cx="${f1(mx)}" cy="${f1(my)}" rx="${f1(30+86*k)}" ry="${f1(26+44*k)}" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6;opacity:${f1(.4+.5*k)}"/><text x="${f1(mx)}" y="${f1(my-(26+44*k)-6)}" class="t-sm t-mid" style="fill:var(--rx);font-weight:700;opacity:${f1(k)}">couples therapy</text>`}
    /* people */
    M.forEach(m=>{const [x,y]=pos(m),hl=(p===1&&m.k.startsWith('kid'))||((p===2||p===3||p===4)&&m.k==='partner')||(p===5&&m.k==='partner');
      s+=person(x,y,m.s*1.15,hl?'var(--rx)':'var(--muted)');
      if(p===0){const k=ramp(u,.2,.7);if(k>0)s+=`<path d="M${f1(x-8)} ${f1(y-6)}q4 -6 8 0q4 6 8 0" style="fill:none;stroke:var(--accent);stroke-width:1.4;opacity:${f1(k)}"/>`}
      s+=`<text x="${f1(x)}" y="${f1(y+m.s*1.15+14)}" class="t-xs t-mid">${m.n}</text>`});
    s+=person(O.cx,O.cy-36,72,'var(--ink)')+`<text x="${O.cx}" y="${O.cy+52}" class="t-xs t-mid" style="fill:var(--ink)">person with AUD</text>`;
    if(p===4){const ok=u>.5;s+=`<text x="${O.cx}" y="${O.cy-40}" class="t-sm t-mid" style="fill:${ok?'var(--rx)':'var(--muted)'};font-weight:700">${ok?'enters treatment?':''}</text>`}
    /* side panel */
    const B=N?{x:10,y:338,w:380,h:256}:{x:410,y:14,w:300,h:352};
    s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const X0=B.x+16,W=B.w-32;let y=B.y+28;
    const hd=(a,b)=>{s+=`<text x="${X0}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:700">${a}</text>`;if(b)s+=`<text x="${X0}" y="${y+15}" class="t-xs">${b}</text>`;y+=b?36:22};
    const bar=(lab,v,max,col,val,k)=>{s+=`<text x="${X0}" y="${y}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;const w=W-56;s+=`<rect x="${X0}" y="${y+6}" width="${f1(w)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${X0}" y="${y+6}" width="${f1(w*v/max*k)}" height="16" rx="4" style="fill:${col}"/><text x="${X0+W}" y="${y+19}" class="t-sm t-end" style="fill:${col};font-weight:700">${val}</text>`;y+=42};
    if(p===0){hd('Three kinds of family help','Copello 2005');
      ['1  Help the person get into treatment','2  Join in the person\'s treatment','3  Support family members themselves'].forEach((tx,i)=>{const k=ramp(u,i*.25,i*.25+.3);s+=`<rect x="${X0}" y="${y-14}" width="${W}" height="30" rx="8" style="fill:var(--rx-soft);opacity:${f1(k)}"/><text x="${X0+10}" y="${y+5}" class="t-sm" style="fill:var(--ink);opacity:${f1(k)}">${tx}</text>`;y+=40});
      y+=6;s+=`<text x="${X0}" y="${y}" class="t-xs">Family members had more SUD, depression</text><text x="${X0}" y="${y+15}" class="t-xs">and trauma diagnoses than families of</text><text x="${X0}" y="${y+30}" class="t-xs">people with diabetes or asthma.</text>`}
    else if(p===1){hd('Mean adverse childhood experiences','by parental alcohol problem · ACE study');
      [['None',1.4,'var(--muted)'],['Father only',2.6,'var(--warn)'],['Mother only',3.2,'var(--accent)'],['Both parents',3.8,'var(--accent)']].forEach((r,i)=>bar(r[0],r[1],4,r[2],r[1].toFixed(1),ease(ramp(u,i*.15,i*.15+.4))));
      s+=`<text x="${X0}" y="${y+2}" class="t-xs">Retrospective reports: an association,</text><text x="${X0}" y="${y+17}" class="t-xs">not proof of cause. 10.5% of US children</text><text x="${X0}" y="${y+32}" class="t-xs">lived with a parent with past-year AUD.</text>`}
    else if(p===2){hd('Al-Anon family groups','national survey · Timko 2013');
      bar('Newcomers surveyed',359,400,'var(--muted)','359',ramp(u,0,.4));bar('Members surveyed',264,400,'var(--good)','264',ramp(u,.15,.55));
      s+=`<text x="${X0}" y="${y}" class="t-sm" style="fill:var(--good);font-weight:700">Members: more satisfied with</text><text x="${X0}" y="${y+17}" class="t-sm" style="fill:var(--good);font-weight:700">their quality of life</text>`;
      s+=`<text x="${X0}" y="${y+44}" class="t-xs">Bars show sample sizes; the abstract</text><text x="${X0}" y="${y+59}" class="t-xs">reports the difference in words.</text>`}
    else if(p===3){hd('Sessions with the family member','engagement usually after 4–6 · Miller 1999');
      const n=Math.min(6,Math.floor(u*7.2));for(let i=0;i<6;i++){const cx=X0+18+i*(W-36)/5,on=i<n,band=i>=3;
        s+=`<circle cx="${f1(cx)}" cy="${y+20}" r="15" style="fill:${on?(band?'var(--rx)':'var(--rx-soft)'):'var(--panel-2)'};stroke:${band?'var(--rx)':'var(--line)'}"/><text x="${f1(cx)}" y="${y+24}" class="t-sm t-mid" style="fill:${on&&band?'var(--on-brand)':'var(--ink)'};font-weight:700">${i+1}</text>`}
      s+=`<path d="M${f1(X0+18+3*(W-36)/5-16)} ${y+48}h${f1(2*(W-36)/5+32)}" style="stroke:var(--rx);stroke-width:2"/><text x="${f1(X0+18+4*(W-36)/5)}" y="${y+64}" class="t-xs t-mid" style="fill:var(--rx)">usual window</text>`;
      y+=96;s+=`<text x="${X0}" y="${y}" class="t-xs">CRAFT builds on the community</text><text x="${X0}" y="${y+15}" class="t-xs">reinforcement approach (Hunt and Azrin, 1973),</text><text x="${X0}" y="${y+30}" class="t-xs">which cut drinking days more than usual care.</text>`}
    else if(p===4){hd('Loved ones engaged in treatment','RCT, 130 family members · Miller 1999');
      [['CRAFT',64,'var(--rx)'],['Johnson confrontation',30,'var(--warn)'],['Al-Anon facilitation',13,'var(--muted)']].forEach((r,i)=>bar(r[0],r[1],100,r[2],r[1]+'%',ease(ramp(u,.05+i*.08,.6+i*.08))));
      s+=`<text x="${X0}" y="${y}" class="t-xs">Review: CRAFT RR 3.25 vs Al-Anon (NNT 2),</text><text x="${X0}" y="${y+15}" class="t-xs">RR 2.15 vs Johnson (NNT 3).</text><text x="${X0}" y="${y+36}" class="t-xs" style="fill:var(--warn)">70% of Johnson families did not go</text><text x="${X0}" y="${y+51}" class="t-xs" style="fill:var(--warn)">ahead with the confrontation.</text>`}
    else{hd('Couples therapy vs individual','BCT meta-analysis, 12 RCTs · effect size d');
      [['Overall',.54,'var(--rx)'],['Frequency of use (follow-up)',.45,'var(--rx)'],['Consequences (follow-up)',.5,'var(--rx)'],['Relationship satisfaction',.51,'var(--good)']].forEach((r,i)=>bar(r[0],r[1],.8,r[2],'d '+r[1].toFixed(2),ease(ramp(u,i*.12,i*.12+.45))))}
    svg.innerHTML=s;setSt(p);$('#faNote').innerHTML=noteHTML(FA_STEPS[p]);
  }
  const stop=playWire(rg,$('#faPlay'),draw,30000,'%t:player.replay%','families');
  const setSt=stepWire($('#faSteps'),FA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- what to say ---- */
  let neu=true;const sel=$('#faCtx'),wb=$('#faWords'),card=$('#faLang');
  function drawL(){const L=FA_LANG[sel.value];card.classList.toggle('old',!neu);
    card.innerHTML=`<div class="kicker">${neu?'Person-first, non-stigmatising':'Labels that carry blame'}</div><p class="say">${neu?L.neu:L.old}</p><p class="stage-cap">${neu?'Names the condition, not the person; describes what happened and what comes next. "Long-term recovery" and "recurrence of use" carried more positive associations. [[Ashford2018]]':'In studies, "abuser", "addict" and "alcoholic" pushed readers toward blame and punishment. [[Kelly2010Language,Ashford2018]] Switch back to see the alternative.'}</p>`}
  sel.addEventListener('change',drawL);
  wb.addEventListener('click',()=>{neu=!neu;wb.setAttribute('aria-pressed',neu);wb.textContent=neu?'Person-first wording':'Stigmatising wording';drawL()});
  drawL();
};
