/* =============== 1.5 Environment, risk & myths =============== */
/* forest rows: label, population estimate [est, lo, hi], better-design estimate (null = none published here),
   what the second design is, evidence class, note */
const RK_ROWS=[
 {l:'Very preterm / very low birth weight',p:[2.25,1.56,3.26],s:'held',d:'within mother: similar odds',ev:'est'},
 {l:'Extremely preterm / extremely low weight',p:[4.05,2.38,6.87],s:'held',d:'within mother: similar odds',ev:'est'},
 {l:'Severe head injury (>1 year later)',p:[6.25,2.06,15.06],s:[6.70,2.02,16.82],d:'vs children with other injuries',ev:'est'},
 {l:'Mild head injury / concussion',p:[1.07,null,null],s:null,d:'no significant rise',ev:'early'},
 {l:'Early severe deprivation (>6 months)',p:[7.7,null,null],s:null,d:'natural experiment: 29.3% vs 3.8%',ev:'est'},
 {l:'Lead: top fifth of blood lead',p:[4,null,null],s:null,d:'no sibling estimate',ev:'est'},
 {l:'Valproate in pregnancy',p:[1.48,1.09,2.00],s:null,d:'no sibling estimate',ev:'early'},
 {l:'Maternal pre-pregnancy obesity',p:[1.64,1.57,1.73],s:[1.15,.85,1.56],d:'full siblings',ev:'hyp'},
 {l:'Smoking in pregnancy',p:[2.01,1.94,2.07],s:[1.07,.94,1.22],d:'siblings (Denmark)',ev:'hyp'},
 {l:'Acetaminophen in pregnancy',p:[1.07,1.05,1.10],s:[.98,.94,1.02],d:'full siblings (Sweden)',ev:'early'},
 {l:'Low-moderate alcohol (≤70 g/week)',p:[.94,.86,1.02],s:null,d:'no association',ev:'early'}
];
const RK_STEPS=[
 {from:0,at:.14,k:'September · first day',t:'Same class, different ages',
  txt:`Children start school by date of birth. Where the cutoff is 1 September, a child born in late August can be almost a year younger than a classmate born in September. At 5 or 6 years old, a year is a large share of a life: attention, sitting still and waiting a turn are all still developing. The pupils are sorted left to right from oldest to youngest. [[Layton2018]]`,
  pt:`In one class, some children are nearly a year older than others. That shows in how long they can sit still and focus.`,
  hook:`Relative-age effect: the youngest in a school year are more often diagnosed with and treated for ADHD. [[Layton2018,Whitely2019]]`},
 {from:.2,at:.34,k:'Autumn term',t:'Judged against classmates',
  txt:`Teachers and parents naturally compare a child with the rest of the class. The youngest pupils are more restless on average simply because they are younger, so they stand out. That is a fact about comparison, not about ADHD. A diagnosis should be made against children of the same age, across settings. [[Whitely2019,Layton2018]]`,
  pt:`A child who is just younger can look "more hyperactive" next to older classmates.`,
  hook:`The relative-age effect is evidence about diagnosis practice, not about what causes ADHD. [[Layton2018,Whitely2019]]`},
 {from:.4,at:.54,k:'Spring term · UK',t:'A graded pattern by birth quarter',
  txt:`In a UK primary-care cohort of 1,042,106 children aged 4–15, the youngest quarter of the school year had an adjusted hazard ratio of 1.36 for ADHD diagnosis against the oldest quarter, with a graded pattern: 1.15 for the second quarter and 1.31 for the third. <span class="ev est">Established</span> [[Root2019]]`,
  pt:`The younger a child is in their school year, the more likely they are to be diagnosed.`,
  hook:`UK: youngest vs oldest quarter of the school year, aHR 1.36 for an ADHD diagnosis. [[Root2019]]`},
 {from:.6,at:.74,k:'Summer term · USA',t:'August versus September births',
  txt:`In US claims data (407,846 children) in states with a 1 September cutoff, diagnosed ADHD was 85.1 per 10,000 among August-born children against 63.6 among September-born children (34% more); treatment was 52.9 against 40.4 per 10,000. In states without that cutoff the difference was small and not significant (8.9 per 10,000). Asthma, diabetes and obesity did not differ by birth month: a built-in negative control. [[Layton2018]]`,
  pt:`Only where August children are the youngest in class do they get more ADHD diagnoses. Other conditions do not change with birth month.`,
  hook:`August vs September births, 1 September cutoff: 85.1 vs 63.6 diagnoses per 10,000. [[Layton2018]]`},
 {from:.8,at:.94,k:'End of year · worldwide',t:'Stronger in girls, seen in most countries',
  txt:`In British Columbia (937,943 children, 31 December cutoff), December-born children were more often diagnosed than January-born: boys RR 1.30, girls 1.70; and more often medicated: boys 1.41, girls 1.77. A review of 19 studies in 13 countries (over 15.4 million children) found the effect in 17. Denmark, where parents often delay school entry for less mature children, showed a weak or no effect. Whether this means overdiagnosis of the youngest or under-recognition of the oldest, the data cannot settle. [[Morrow2012,Whitely2019]]`,
  pt:`A child's age in class should always be part of an ADHD assessment.`,
  hook:`British Columbia: youngest-in-class girls RR 1.70 for diagnosis and 1.77 for medication. [[Morrow2012]]`}
];
inits.risk=()=>{
  /* ---------- forest plot ---------- */
  const fs=$('#rkForest');let mode='pop',mv=0,stopF=null;
  const EVC={est:['EST','var(--good)','var(--good-soft)'],early:['EARLY','var(--warn)','var(--warn-soft)'],hyp:['HYP','var(--rx)','var(--rx-soft)']};
  function drawF(){const N=vb(fs,'720 470','400 640');let s='';
    const L=N?{x0:30,x1:300,top:58,gap:50}:{x0:300,x1:610,top:58,gap:36};
    const X=v=>lerp(L.x0,L.x1,(Math.log(v)-Math.log(.5))/(Math.log(20)-Math.log(.5)));
    const bot=L.top+RK_ROWS.length*L.gap-L.gap/2;
    s+=`<text x="${N?10:10}" y="22" class="t-sm" style="fill:var(--dz)">${mv>.5?'SIBLING OR BETTER COMPARISON':'POPULATION ESTIMATE'}</text><text x="${N?390:710}" y="22" class="t-xs t-end">ratio, log scale</text>`;
    [.5,1,2,5,10,20].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-18}" y2="${bot}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);stroke-width:1.2"':''}/><text x="${f1(X(v))}" y="${bot+16}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(.5))}" y="${bot+32}" class="t-xs">← less ADHD</text><text x="${f1(X(20))}" y="${bot+32}" class="t-xs t-end">more ADHD →</text>`;
    RK_ROWS.forEach((r,i)=>{const y=L.top+i*L.gap,[e,lo,hi]=r.p,has=Array.isArray(r.s),q=has?ease(mv):0;
      const est=has?Math.exp(lerp(Math.log(e),Math.log(r.s[0]),q)):e,lo2=has&&lo?Math.exp(lerp(Math.log(lo),Math.log(r.s[1]),q)):lo,hi2=has&&hi?Math.exp(lerp(Math.log(hi),Math.log(r.s[2]),q)):hi;
      const [et,ec,eb]=EVC[r.ev],dim=mv>.5&&!has&&r.s!=='held';
      if(i%2===0)s+=`<rect x="4" y="${f1(y-(N?30:16))}" width="${N?392:712}" height="${N?48:34}" rx="6" style="fill:var(--panel-2);opacity:.45"/>`;
      if(N){s+=`<rect x="10" y="${f1(y-24)}" width="40" height="13" rx="3" style="fill:${eb}"/><text x="30" y="${f1(y-14)}" class="t-xs t-mid" style="fill:${ec};font-weight:700">${et}</text><text x="56" y="${f1(y-14)}" class="t-xs" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px">${r.l}</text>`}
      else{s+=`<text x="58" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink)">${r.l}</text><rect x="10" y="${f1(y-7)}" width="40" height="13" rx="3" style="fill:${eb}"/><text x="30" y="${f1(y+3)}" class="t-xs t-mid" style="fill:${ec};font-weight:700">${et}</text>`}
      const yy=N?y+2:y,op=dim?.35:1;
      if(lo2)s+=`<line x1="${f1(X(lo2))}" x2="${f1(X(Math.min(hi2,20)))}" y1="${yy}" y2="${yy}" style="stroke:var(--ink);stroke-width:1.8;opacity:${op}"/>`;
      const c=has&&q>.5?'var(--accent)':'var(--dz)';
      s+=`<rect x="${f1(X(est)-5)}" y="${f1(yy-5)}" width="10" height="10" style="fill:${c};opacity:${op}" transform="rotate(45 ${f1(X(est))} ${f1(yy)})"/>`;
      const tx=N?396:712,lab=(has&&q>.5?r.s[0]:e)+(r.l.startsWith('Early severe')?'×':'');
      s+=`<text x="${tx}" y="${f1(yy+4)}" class="t-xs t-end" style="fill:${dim?'var(--muted)':'var(--ink)'};font-weight:700">${lab}</text>`;
      if(mv>.5&&!N)s+=`<text x="${f1(Math.min(X(Math.max(hi2||est,est))+10,L.x1-4))}" y="${f1(yy-8)}" class="t-xs" style="fill:${has?'var(--accent)':'var(--muted)'}">${r.s==='held'?'holds · '+r.d:r.d}</text>`;
      if(mv>.5&&N)s+=`<text x="${tx}" y="${f1(y-14)}" class="t-xs t-end" style="fill:${has?'var(--accent)':'var(--muted)'}">${r.s==='held'?'holds':has?'':'—'}</text>`;
    });
    fs.innerHTML=s;
    $('#rkFNote').innerHTML=noteHTML(mv>.5?{k:'Sibling or better comparison',t:'Some links shrink, some hold',
      txt:`Brothers and sisters share much of their genes and home, so comparing an exposed sibling with an unexposed one removes those confounders. Prenatal smoking falls from HR 2.01 to 1.07 (Denmark), maternal obesity from 1.64 to 1.15 (Sweden), and acetaminophen from 1.07 to 0.98 (2.48 million Swedish children): these look like family confounding. Preterm birth held within mothers, and lower birth weight still predicted symptoms within identical-twin pairs. Severe head injury stayed raised against children with other injuries (OR 6.70). [[Obel2016,Chen2014IJE,Ahlqvist2024,Lindstrom2011,Pettersson2015,Asarnow2021]]`,
      pt:`When families are compared with themselves, smoking, weight and paracetamol in pregnancy stop looking like causes. Being born very early still matters.`,
      hook:`Prenatal smoking: conventional HR ≈ 2, sibling HR ≈ 1 → familial confounding. Preterm birth survives sibling and twin controls. [[Obel2016,Skoglund2014,Lindstrom2011]]`}
     :{k:'Population estimates',t:'What a simple comparison shows',
      txt:`Comparing exposed with unexposed people across a population finds many links: very preterm or very low birth weight OR 2.25 and extremely preterm OR 4.05; severe head injury OR 6.25 more than a year later; over 6 months of severe early deprivation, ADHD in 29.3% vs 3.8% of young adults; lead in the top fifth, about 4 times the odds; valproate in pregnancy aHR 1.48 (15-year risk 11.0% vs 4.6%); smoking HR 2.01. Low-to-moderate alcohol showed none (OR 0.94). But families that differ in exposures also differ in genes and circumstances. [[Franz2018,Asarnow2021,Kennedy2016,Faraone2021,Christensen2019Valproate,Obel2016,SanMartinPorter2019]]`,
      pt:`A link between an exposure and ADHD does not prove the exposure causes ADHD.`,
      hook:`Umbrella review "convincing" class: maternal pre-pregnancy obesity OR 1.63, acetaminophen RR 1.25. Both shrink in sibling designs. [[Kim2020LancetPsych,Chen2014IJE,Ahlqvist2024]]`});
  }
  $$('[data-rkd]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.rkd;$$('[data-rkd]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const a=mv,z=mode==='sib'?1:0;if(stopF)stopF();stopF=animate(900,p=>{mv=lerp(a,z,p);drawF()},()=>{stopF=null})}));
  drawF();

  /* ---------- classroom scrubber ---------- */
  const svg=$('#rkSvg'),rg=$('#rkT');
  const MON=['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],TERM=['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const QHR=[1,1.15,1.31,1.36],QN=['oldest','','','youngest'];
  function bars(B,items,max,o={}){let s='';const n=items.length,bw=Math.min(o.bw||60,(B.w-20)/n-14);
    items.forEach(([l,v,c,sub],i)=>{const x=B.x+10+i*((B.w-20)/n)+((B.w-20)/n-bw)/2,h=(B.h-34)*v/max,y=B.y+B.h-20-h;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(bw)}" height="${f1(Math.max(0,h))}" rx="4" style="fill:${c}"/><text x="${f1(x+bw/2)}" y="${f1(y-5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${o.fmt?o.fmt(v):v}</text><text x="${f1(x+bw/2)}" y="${f1(B.y+B.h-7)}" class="t-xs t-mid">${l}</text>`;
      if(sub)s+=`<text x="${f1(x+bw/2)}" y="${f1(B.y+B.h+6)}" class="t-xs t-mid">${sub}</text>`});
    return s+`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h-20}" y2="${B.y+B.h-20}" class="axis"/>`}
  let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 400','400 690'),ph=phaseOf(RK_STEPS,t);let s='';
    const mi=Math.min(10,Math.floor(t*11)),fid=ramp(t,.15,.35);
    /* desks: two rows of six */
    const D=[];for(let i=0;i<12;i++){const r=i<6?0:1,c=i%6;D.push(N?[44+c*62,r?262:142]:[60+c*76,r?316:166])}
    const qBox=q=>{const a=D[q*3],b=D[q*3+2];return [a[0]-28,b[0]+(N?34:42),a[1]]};
    const PILL=[2,7,10,11];
    for(let q=0;q<4;q++){const [xa,xb,fy]=qBox(q);s+=`<rect x="${f1(xa)}" y="${f1(fy+4)}" width="${f1(xb-xa)}" height="32" rx="6" style="fill:${q===3?'var(--dz-soft)':'var(--panel-2)'};opacity:.8"/><text x="${f1((xa+xb)/2)}" y="${f1(fy+30)}" class="t-xs t-mid" style="fill:${q===3?'var(--dz)':'var(--muted)'}">Q${q+1}${QN[q]?' · '+QN[q]:''}${t>=.4?' · aHR '+QHR[q].toFixed(2):''}</text>`}
    D.forEach(([x,y],i)=>{const young=i/11,sc=N?40:50;
      s+=desk(x,y,sc*(1-young*.12),{fidget:fid*(.15+young*.75),t:t+i*.13,fill:i>=9?'var(--dz)':'var(--muted)',distract:fid*young*.6});
      s+=`<text x="${x+6}" y="${y+16}" class="t-xs t-mid" style="fill:var(--ink)">${MON[i]}</text>`;
      if(t>=.6&&PILL.includes(i)){const k=sc*(1-young*.12)/60;s+=pill(x+k*34,y-k*44,14,'tab',{c:'var(--rx)'})}});
    s+=`<text x="12" y="22" class="t-sm" style="fill:var(--dz)">${N?'ONE CLASS · OLDEST → YOUNGEST':'ONE CLASS, SORTED BY BIRTH MONTH'}</text>`;
    const cx=N?370:440,cy=N?36:34;
    s+=clock(cx,cy,14,(t*10)%12,{c:'var(--dz)'})+`<text x="${cx-20}" y="${cy+4}" class="t-xs t-end" style="fill:var(--ink)">${TERM[mi]}</text>`;
    if(t>=.6)s+=`<text x="12" y="${N?58:44}" class="t-xs">tablets: medicated more often (schematic)</text>`;
    /* step panel */
    const B=N?{x:16,y:340,w:368,h:220}:{x:494,y:30,w:216,h:250};
    if(N)s+=`<line x1="16" x2="384" y1="326" y2="326" style="stroke:var(--line)"/>`;else s+=`<line x1="478" x2="478" y1="16" y2="390" style="stroke:var(--line)"/>`;
    const p=ease(ramp(t,[0,.2,.4,.6,.8][ph]+.01,[0,.2,.4,.6,.8][ph]+.13)),tl=B.y+B.h+22;
    const lines=(a,y0=tl)=>a.map(([tx,c],i)=>`<text x="${B.x}" y="${y0+i*17}" class="t-xs" style="fill:${c||'var(--muted)'}">${tx}</text>`).join('');
    const ttl=tx=>`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--dz)">${tx}</text>`;
    if(ph===0){s+=ttl('AGE ON THE FIRST DAY');
      const W=B.w;s+=`<rect x="${B.x}" y="${B.y+40}" width="${f1(W)}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${B.y+40}" width="${f1(W*p)}" height="14" rx="7" style="fill:var(--dz)"/>`;
      s+=lines([ ['1 September cutoff:','var(--ink)'],['born 1 September → oldest',''],['born 31 August → almost','var(--dz)'],['a year younger','var(--dz)'],['At 5, one year is a fifth',''],['of a child\'s life.',''] ],B.y+80)}
    else if(ph===1){s+=ttl('RESTLESSNESS (SCHEMATIC)');
      const W=B.w,y0=B.y+40,H=B.h-80;s+=`<line x1="${B.x}" x2="${B.x+W}" y1="${y0+H}" y2="${y0+H}" class="axis"/>`;
      let d='';for(let i=0;i<=60;i++){const u=i/60;if(u>p)break;d+=(i?'L':'M')+f1(B.x+u*W)+' '+f1(y0+H*(.85-u*u*.7)+Math.sin(u*40)*4)}
      if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--dz);stroke-width:2.4"/>`;
      s+=`<text x="${B.x}" y="${y0+H+14}" class="t-xs">Sep-born</text><text x="${B.x+W}" y="${y0+H+14}" class="t-xs t-end" style="fill:var(--dz)">Aug-born</text>`;
      s+=lines([ ['Younger children are more','var(--ink)'],['restless on average, so','var(--ink)'],['they stand out next to','var(--ink)'],['older classmates.','var(--ink)'] ],y0+H+40)}
    else if(ph===2){s+=ttl('UK · aHR BY QUARTER');
      s+=bars({x:B.x,y:B.y+22,w:B.w,h:B.h-22},QHR.map((v,i)=>['Q'+(i+1),+(1+(v-1)*p).toFixed(2),i===3?'var(--dz)':'var(--muted)']),1.5,{fmt:v=>v.toFixed(2),bw:40});
      s+=lines([ ['1,042,106 children aged 4–15','var(--ink)'],['youngest vs oldest quarter:',''],['1.36 (95% CI 1.28–1.45)','var(--dz)'] ])}
    else if(ph===3){s+=ttl('USA · PER 10,000');
      const it=[ ['Sep dx',63.6,'var(--muted)'],['Aug dx',85.1,'var(--dz)'],['Sep tx',40.4,'var(--muted)'],['Aug tx',52.9,'var(--rx)'] ].map(([l,v,c])=>[l,+(v*p).toFixed(1),c]);
      s+=bars({x:B.x,y:B.y+22,w:B.w,h:B.h-22},it,100,{bw:40});
      s+=lines([ ['dx diagnosed · tx treated','var(--ink)'],['no Sept cutoff: 8.9 (n.s.)',''],['asthma, diabetes: no change',''] ])}
    else{s+=ttl('BC · DEC VS JAN BIRTHS');
      const it=[ ['boys dx',1.30,'var(--muted)'],['boys rx',1.41,'var(--rx)'],['girls dx',1.70,'var(--dz)'],['girls rx',1.77,'var(--rx)'] ].map(([l,v,c])=>[l,+(1+(v-1)*p).toFixed(2),c]);
      s+=bars({x:B.x,y:B.y+22,w:B.w,h:B.h-22},it,2,{fmt:v=>v.toFixed(2),bw:40});
      s+=lines([ ['rate ratios · rx medicated','var(--ink)'],['19 studies, 13 countries:',''],['effect found in 17','var(--dz)'] ])}
    svg.innerHTML=s;setSt(ph);$('#rkNote').innerHTML=noteHTML(RK_STEPS[ph]);
  }
  const stop=playWire(rg,$('#rkPlay'),draw,20000,'Replay','risk');
  setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);
  const prevR=redraws.risk;redraws.risk=()=>{prevR&&prevR();drawF()};
  draw(+rg.value);

  /* ---------- myth flip cards ---------- */
  $$('#m-risk button.fc').forEach(b=>b.addEventListener('click',e=>{if(e.target.closest('sup.c,a'))return;const on=!b.classList.contains('flip');b.classList.toggle('flip',on);b.setAttribute('aria-pressed',on)}));
};
