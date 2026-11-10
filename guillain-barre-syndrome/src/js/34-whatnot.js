/* =============== 3.4 Steroids, repeats & relapses =============== */
/* Three players: courses over time (usual course, no early improvement, treatment-related fluctuations, A-CIDP and
   recurrence), an A-CIDP rule explorer, and a "what was tried" explorer of forest plots. Curves are schematic
   shapes between published time anchors (8 weeks, the 10 to 54 day range, the 18-day median); they carry no data. */
const WN_STEPS=[
 {from:0,at:.15,k:'Course 1 · the usual shape',sv:'The usual course with treatment',sub:'worse to a nadir, a plateau, then recovery',
  t:'Treatment speeds recovery; it does not switch GBS off',
  txt:'IVIg or plasma exchange speeds recovery but does not cure everyone: about 20% of treated people cannot walk at 6 months and about 5% die as a consequence of GBS (population statistics) [[Leonhard2024]]. 60 to 80% can walk independently 6 months after onset, with or without treatment [[Leonhard2019]]. Neither treatment has been shown to reduce mortality [[Hughes2007,Chevret2017]].',
  pt:'These treatments help you recover faster. They do not switch the illness off straight away [[Hughes2014,Chevret2017]].',
  hook:'About 20% die or have persistent disability despite immunotherapy [[Hughes2007]].'},
 {from:.17,at:.31,k:'Course 2 · no early gain',sv:'No better by 4 weeks',sub:'common, and not proof that treatment failed',
  t:'No improvement in the first 4 weeks is common',
  txt:'About 40% of people on standard plasma exchange or IVIg do not improve in the first 4 weeks. This does not mean the treatment failed, because progression might have been worse without it [[Leonhard2019]]. In IGOS, 235 people (32%) did not improve after their initial treatment [[Verboon2019]]. The guideline does not suggest switching to the other treatment, for lack of trial evidence [[vanDoorn2023]].',
  pt:'You may not improve in the first weeks, even with treatment. This is common, and it does not mean the treatment failed [[Leonhard2019]].',
  hook:'Worsening or no change at 4 weeks does not equal treatment failure: about 40% do not improve early [[Leonhard2019]].'},
 {from:.33,at:.48,k:'Course 3 · fluctuation',sv:'Better, then worse again',sub:'a treatment-related fluctuation',
  t:'A treatment-related fluctuation',
  txt:'A treatment-related fluctuation is progression within 2 months after initial improvement or stabilisation from treatment; it must be told apart from progression with no initial response [[Leonhard2019]]. The usual view is that the treatment wears off while inflammation is still active <span class="ev hyp">Hypothesis</span> [[Leonhard2019]]. In a prospective Dutch study the first fluctuation always came within 8 weeks of onset, median day 18 (range 10 to 54) [[Ruts2010]]. The guideline suggests considering re-treatment with IVIg or plasma exchange (observational evidence only) [[vanDoorn2023]].',
  pt:'If you get better and then worse again within a couple of months, tell your team. A repeat treatment may be considered [[Leonhard2019,vanDoorn2023]].',
  hook:'Fluctuation: worse again within 2 months of improving on treatment; 6 to 10% [[Leonhard2019]].'},
 {from:.5,at:.64,k:'Course 4 · a second dip',sv:'A second fluctuation',sub:'some have two; in one study none had more',
  t:'Two fluctuations, but not three',
  txt:'Of 16 people with a fluctuation in the prospective study, 5 (31%) had a second, and none had more [[Ruts2010]]. Risk was unrelated to the type of treatment; nobody with a preceding gut infection, mainly distal weakness, an acute motor neuropathy or anti-GM1 antibodies fluctuated [[Visser1998]]. In IGOS, 36 of 53 people with a fluctuation (68%) were re-treated [[Verboon2019]].',
  pt:'Some people dip twice. Doctors watch closely, because more dips can point to a different condition.',
  hook:'Up to two fluctuations fit GBS; a third points towards A-CIDP [[Ruts2010]].'},
 {from:.67,at:.81,k:'Course 5 · A-CIDP',sv:'Worse after 8 weeks: A-CIDP?',sub:'acute-onset chronic inflammatory demyelinating polyneuropathy',
  t:'When it keeps coming back: acute-onset CIDP',
  txt:'About 5% of people first diagnosed with GBS turn out to have acute-onset CIDP (A-CIDP) [[Ruts2010,vanDoorn2023]]. A-CIDP should be considered with deterioration more than 8 weeks after onset, or three or more episodes of worsening [[Ruts2010]]. Further worsening after 8 weeks had a sensitivity of 100% and a specificity of 92%; three or more fluctuations, 52% and 96% [[vanDoorn2023]]. People with A-CIDP were less severely affected, did not need ventilation and rarely had cranial nerve involvement [[Ruts2010]].',
  pt:'If you get worse after 8 weeks, doctors may check for a related long-term condition called CIDP [[vanDoorn2023]].',
  hook:'A-CIDP: worsening 8 weeks or more after onset, or 3 or more episodes [[Ruts2010,vanDoorn2023]].'},
 {from:.84,at:.97,k:'Course 6 · years later',sv:'GBS again, years later',sub:'a recurrence after recovery',
  t:'Recurrence is uncommon',
  txt:'Relapses of GBS occur in 2 to 5% [[Leonhard2019]]. In a survey, 9 of 245 people had a confirmed recurrence (3.7%, arithmetic) [[Kuitwaard2009JPNS]]. A series of 32 people with recurrent GBS (81 episodes) defined it as at least 2 months between episodes after full recovery, or 4 months after partial recovery; they were younger (mean 34.2 against 46.9 years), and recurrence was more frequent under 30, with milder symptoms and in Miller Fisher syndrome [[Kuitwaard2009JNNP]].',
  pt:'Getting GBS a second time is uncommon, at about 2 to 5 in 100 people [[Leonhard2019]].',
  hook:'Fluctuation 6 to 10%, A-CIDP about 5%, recurrence 2 to 5% [[Leonhard2019]].'}
];
const WN_L={
  y1:'weaker',y0:'stronger',x:'weeks from onset of weakness',xN:'weeks from onset',
  tx:'first treatment',retx:'re-treatment considered',retxN:'re-treat?',nadir:'nadir',
  w4:'4 weeks',w8:'8 weeks',band:'first fluctuations: day 10 to 54',bandN:'day 10 to 54',med:'median day 18',
  forty:'about 40% not yet better',usual:'usual course',
  second:'second fluctuation',acidp:'worse after 8 weeks',acidpN:'after 8 weeks',
  rec:'years later',recT:'2 to 5 in 100',recL1:'after full recovery,',recL2:'a new episode',
  sch:'Schematic shapes: only the time marks are published'
};
/* key points of each schematic course: [day, level 0..1] */
const WN_C={
  base:[ [0,0],[4,.45],[10,.8],[24,.8],[40,.6],[70,.38],[112,.2] ],
  late:[ [0,0],[4,.5],[11,.84],[44,.84],[62,.66],[90,.46],[112,.36] ],
  trf1:[ [0,0],[4,.45],[9,.72],[15,.54],[19,.78],[26,.62],[45,.46],[80,.3],[112,.2] ],
  trf2:[ [0,0],[4,.45],[9,.72],[15,.54],[19,.78],[27,.6],[33,.52],[39,.72],[48,.55],[80,.33],[112,.22] ],
  acidp:[ [0,0],[4,.4],[9,.64],[15,.5],[19,.7],[27,.52],[33,.5],[39,.68],[50,.5],[62,.48],[73,.7],[86,.56],[112,.5] ],
  full:[ [0,0],[4,.45],[10,.8],[24,.8],[45,.5],[80,.14],[112,.02] ]
};
const WN_KEY=['base','late','trf1','trf2','acidp','full'];
/* the A-CIDP rule explorer */
const WN_RULE={
  fl:'Fits a treatment-related fluctuation',ac:'Published rule: consider A-CIDP',
  why8W:['Worsening after 8 weeks:','sensitivity 100%, specificity 92%'],why3W:['3 or more episodes:','sensitivity 52%, specificity 96%'],
  why8N:['After 8 weeks: sensitivity 100%,','specificity 92%'],why3N:['3 or more: sensitivity 52%,','specificity 96%'],
  ok:'Within 8 weeks and fewer than 3 episodes',okN:['Within 8 weeks,','fewer than 3 episodes'],
  sFl:'Worsening that comes within 8 weeks of onset and fewer than three times fits a treatment-related fluctuation of GBS. The guideline suggests considering re-treatment with IVIg or plasma exchange; there is no randomised trial, only observational data [[Leonhard2019,vanDoorn2023]].',
  sAc:'By the published rule, A-CIDP should be considered with deterioration after 8 weeks from onset or three or more episodes of worsening, especially if the person can still walk, lacks cranial nerve weakness and has CIDP-like nerve conduction [[Ruts2010]]. A-CIDP cannot be confirmed unless worsening continues at least 8 weeks after onset, and it is then treated as CIDP (as published) [[vanDoorn2023,VandenBergh2021]].',
  ep:'episode'
};
/* "what was tried": forest-style views */
const WN_TRIED={
  ster:{t:'Corticosteroids: change in disability grade at 4 weeks',tN:['Corticosteroids: disability','change at 4 weeks'],
    lo:-1.6,hi:1.6,ticks:[-1.5,-1,-.5,0,.5,1,1.5],left:'less improvement with steroids',right:'more improvement',leftN:'less improvement',rightN:'more',log:false,
    rows:[{k:'All steroids (6 trials, 587 people)',kn:'All (6 trials, 587)',v:-.36,a:-.88,b:.16},{k:'Oral (4 trials, 120 people)',kn:'Oral (4 trials, 120)',v:-.82,a:-1.47,b:-.17},{k:'Intravenous (2 trials, 467 people)',kn:'IV (2 trials, 467)',v:.17,a:-.06,b:.39}],
    s:'Cochrane 2016: overall 0.36 grade less improvement with corticosteroids, not significant. Oral steroids (very low quality) gave 0.82 grade less improvement, the signal for possible harm; intravenous steroids made no significant difference. Diabetes needing insulin was more common (RR 2.21) and hypertension less common (RR 0.15) with steroids [[Hughes2016]]. The 2023 EAN/PNS guideline strongly recommends against oral corticosteroids and weakly against IV methylprednisolone, alone or added to IVIg [[vanDoorn2023]].'},
  sid:{t:'A second IVIg course: better disability score at 4 weeks (odds ratio)',tN:['Second IVIg course: odds','ratio, better at 4 weeks'],
    lo:.125,hi:8,ticks:[.125,.25,.5,1,2,4,8],left:'favours one course',right:'favours a second',leftN:'one course',rightN:'second',log:true,
    rows:[{k:'SID-GBS, randomised (93 people)',kn:'SID-GBS, randomised',v:1.4,a:.6,b:3.3},{k:'ISID early second course (not randomised)',kn:'ISID early (not random)',v:.70,a:.16,b:3.04},{k:'ISID late second course (not randomised)',kn:'ISID late (not random)',v:.66,a:.18,b:2.5}],
    bars:{t:'Serious adverse events, first 30 days',a:['Second course',35],b:['Placebo',16]},
    s:'SID-GBS gave people with a poor prognosis (mEGOS 6 or more) a second 2 g/kg course or placebo 7 to 9 days after inclusion: adjusted common odds ratio 1.4 (95% CI 0.6 to 3.3; P=0.45), with serious adverse events in 35% against 16%, including thromboembolic events, and four deaths in the second-course group 13 to 24 weeks after randomisation [[Walgaard2021]]. The non-randomised ISID study found no benefit either [[Verboon2020]]. The guideline strongly recommends one standard course only for a poor prognosis [[vanDoorn2023]].'},
  other:{t:'Other drugs: mean difference in disability grade, as reported',tN:['Other drugs: mean','difference, as reported'],
    lo:-2,hi:2,ticks:[-2,-1,0,1,2],left:'',right:'',log:false,
    rows:[{k:'Interferon beta-1a (19 people)',kn:'Interferon beta-1a (19)',v:-.1,a:-1.58,b:1.38},{k:'Eculizumab (2 trials, 41 people)',kn:'Eculizumab (2 trials, 41)',v:-.23,a:-1.79,b:1.34}],
    s:'Cochrane 2020 found six trials of five other interventions with 151 participants in all, all very low certainty, none showing a clinically important difference [[Doets2020]]. The guideline weakly recommends against eculizumab and strongly against alemtuzumab, BDNF, CSF filtration, cyclophosphamide, interferon beta-1a, muromonab-CD3, mycophenolate mofetil and tripterygium polyglycoside [[vanDoorn2023]]. Complement inhibitors still under study are covered in module 5.4.'}
};
inits.whatnot=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const FN={};WN_KEY.forEach(k=>{FN[k]=monoFn(WN_C[k])});
  /* ---------- main player ---------- */
  const svg=$('#wnSvg'),rg=$('#wnT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 600'),p=phaseOf(WN_STEPS,t),P=WN_STEPS[p];
    const nx=WN_STEPS[p+1]?WN_STEPS[p+1].from:1.0001,u=ramp(t,P.from+.01,nx-.03);
    const L=N?{x:44,y:84,w:340,h:240,rx:44,ry:420,rw:340,rh:110}:{x:56,y:84,w:500,h:250,rx:584,ry:84,rw:122,rh:250};
    const X=d=>L.x+L.w*d/112,Y=v=>L.y+L.h-L.h*v;
    let s=tx(16,28,P.sv,'t-big','font-size:18px')+tx(16,46,P.sub,'t-sm');
    s+=`<rect x="${f1(L.x)}" y="${f1(L.y)}" width="${f1(L.w)}" height="${f1(L.h)}" style="fill:var(--field)"/>`;
    /* time anchors */
    if(p>=1){s+=`<line x1="${f1(X(28))}" x2="${f1(X(28))}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" class="grid"/>`+tx(X(28)+4,L.y+12,WN_L.w4,'t-xs')}
    if(p>=2&&p<=4){s+=`<rect x="${f1(X(10))}" y="${f1(L.y+L.h-16)}" width="${f1(X(54)-X(10))}" height="16" style="fill:var(--warn);opacity:.22"/>`+tx(X(10)+4,L.y+L.h-4.5,N?WN_L.bandN:WN_L.band,'t-xs','fill:var(--ink)');
      s+=`<line x1="${f1(X(18))}" x2="${f1(X(18))}" y1="${f1(L.y+L.h-28)}" y2="${f1(L.y+L.h-17)}" style="stroke:var(--warn);stroke-width:2.4"/>`}
    if(p>=2){const strong=p===4;s+=`<line x1="${f1(X(56))}" x2="${f1(X(56))}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" style="stroke:${strong?'var(--rx)':'var(--muted)'};stroke-width:${strong?2.4:1.2};stroke-dasharray:${strong?'none':'4 4'}"/>`+tx(X(56)+4,L.y+12,WN_L.w8,'t-xs',strong?'fill:var(--rx);font-weight:700':'')}
    /* axes */
    s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(L.y+L.h)}" y2="${f1(L.y+L.h)}" class="axis"/><line x1="${f1(L.x)}" x2="${f1(L.x)}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" class="axis"/>`;
    for(let w=0;w<=16;w+=2)s+=`<line x1="${f1(X(w*7))}" x2="${f1(X(w*7))}" y1="${f1(L.y+L.h)}" y2="${f1(L.y+L.h+4)}" class="axis"/>`+tx(X(w*7),L.y+L.h+15,w,'t-xs t-mid');
    s+=tx(L.x+L.w,L.y+L.h+30,N?WN_L.xN:WN_L.x,'t-xs t-end');
    s+=tx(L.x-6,L.y+10,'↑','t-sm t-end')+tx(L.x+4,L.y-6,WN_L.y1,'t-xs')+tx(L.x-6,L.y+L.h-4,'↓','t-sm t-end');
    s+=tx(L.x,L.y+L.h+44,WN_L.sch,'t-xs','font-style:italic');
    /* treatments */
    const txBar=(d0,d1,lab,a,yo)=>`<g style="opacity:${f1(a)}"><rect x="${f1(X(d0))}" y="${f1(L.y+4+(yo||0))}" width="${f1(X(d1)-X(d0))}" height="10" rx="3" style="fill:var(--ivig)"/></g>`+(lab?`<g style="opacity:${f1(a)}">${kitLabel(X(d1)+4,L.y+13+(yo||0),lab,{})}</g>`:'');
    const key=WN_KEY[p],f=FN[key],upto=p===5?112:112*ease(u);
    /* ghost of the usual course */
    if(p>=1&&p<=4){let d='';for(let i=0;i<=112;i+=2)d+=(i?'L':'M')+f1(X(i))+' '+f1(Y(FN.base(i)));s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4;opacity:.7"/>`;
      s+=tx(X(112)-4,Y(FN.base(112))+16,WN_L.usual,'t-xs t-end')}
    s+=txBar(2,6,p===0?WN_L.tx:'',ramp(upto,2,4));
    if(p>=2&&p<=4)s+=txBar(20,24,p===2?(N?WN_L.retxN:WN_L.retx):'',ramp(upto,20,22),14);
    if(p>=3&&p<=4)s+=txBar(40,44,'',ramp(upto,40,42),14);
    /* the curve */
    {let d='';const n=Math.max(2,Math.round(upto/1));for(let i=0;i<=n;i++){const dd=upto*i/n;d+=(i?'L':'M')+f1(X(dd))+' '+f1(Y(f(dd)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linejoin:round;stroke-linecap:round"/>`;
      s+=`<circle cx="${f1(X(upto))}" cy="${f1(Y(f(upto)))}" r="5" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`}
    /* step labels */
    const lab=(d,txt,dy,a)=>upto>=d?kitLabel(X(d),Y(f(d))-(dy||12),txt,{a:a||'m'}):'';
    if(p===0)s+=lab(12,WN_L.nadir);
    if(p===1&&upto>=28)s+=kitLabel(X(28)+6,Y(f(28))-12,WN_L.forty,{});
    if(p===2)s+=lab(18,WN_L.med,14);
    if(p===3||p===4)s+=lab(39,WN_L.second,14);
    if(p===4)s+=lab(73,N?WN_L.acidpN:WN_L.acidp,14);
    /* recurrence panel */
    const ra=p===5?ease(ramp(t,.86,.95)):0;
    if(p===5){const rx=L.rx,ry=L.ry,rw=L.rw,rh=L.rh;
      s+=`<g style="opacity:${f1(.25+.75*ra)}"><rect x="${f1(rx)}" y="${f1(ry)}" width="${f1(rw)}" height="${f1(rh)}" style="fill:var(--field)"/>`;
      if(!N)s+=`<path d="M${f1(L.x+L.w+6)} ${f1(L.y+L.h+6)}l8 -12M${f1(L.x+L.w+14)} ${f1(L.y+L.h+6)}l8 -12" style="stroke:var(--muted);stroke-width:1.6"/>`;
      const rf=d=>FN.base(Math.min(112,d*1.6))*.75,RX=v=>rx+rw*v,RY=v=>ry+rh-rh*v;
      let d='';for(let i=0;i<=40;i++){const v=i/40,k=ramp(v,.35,1);d+=(i?'L':'M')+f1(RX(v))+' '+f1(RY(k>0?rf(k*70):0))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linejoin:round"/>`;
      s+=tx(rx+6,ry+14,WN_L.rec,'t-xs','fill:var(--ink);font-weight:700');
      if(N){s+=tx(rx+rw-6,ry+14,WN_L.recT,'t-lbl t-end','fill:var(--rx)');s+=tx(rx,ry+rh+16,WN_L.recL1+' '+WN_L.recL2,'t-xs')}
      else{s+=tx(rx+rw/2,ry+rh+18,WN_L.recT,'t-lbl t-mid','fill:var(--rx)');s+=tx(rx+rw/2,ry+rh+34,WN_L.recL1,'t-xs t-mid')+tx(rx+rw/2,ry+rh+47,WN_L.recL2,'t-xs t-mid')}
      s+='</g>'}
    svg.innerHTML=s;
    setSt(p);$('#wnNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#wnPlay'),draw,24000,'%t:player.replay%','whatnot');
  setSt=stepWire($('#wnSteps'),WN_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- A-CIDP rule ---------- */
  const rsvg=$('#wnRuleSvg');let nEp=2,late=false;
  function drawRule(){
    const N=vb(rsvg,'720 200','400 300');
    const L=N?{x:20,w:360,y:70}:{x:30,w:420,y:80};
    const X=d=>L.x+L.w*d/112;
    const days=late?[ [70],[18,70],[18,38,70] ][nEp-1]:[ [18],[18,38],[18,38,50] ][nEp-1];
    const isA=late||nEp>=3;
    let s=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(L.y)}" y2="${f1(L.y)}" class="axis"/>`;
    s+=`<rect x="${f1(X(56))}" y="${f1(L.y-34)}" width="${f1(X(112)-X(56))}" height="34" style="fill:var(--rx-soft)"/>`;
    s+=`<line x1="${f1(X(56))}" x2="${f1(X(56))}" y1="${f1(L.y-40)}" y2="${f1(L.y+6)}" style="stroke:var(--rx);stroke-width:2"/>`+tx(X(56)+4,L.y-42,WN_L.w8,'t-xs','fill:var(--rx);font-weight:700');
    for(let w=0;w<=16;w+=4)s+=`<line x1="${f1(X(w*7))}" x2="${f1(X(w*7))}" y1="${f1(L.y)}" y2="${f1(L.y+5)}" class="axis"/>`+tx(X(w*7),L.y+18,w,'t-xs t-mid');
    s+=tx(L.x+L.w,L.y+32,WN_L.xN,'t-xs t-end');
    days.forEach((d,i)=>{s+=`<path d="M${f1(X(d))} ${f1(L.y-4)}l-8 -16h16z" style="fill:var(--rx);stroke:var(--panel);stroke-width:1.4"/>`+tx(X(d),L.y-24,String(i+1),'t-xs t-mid','fill:var(--ink);font-weight:700')});
    /* verdict */
    const vx=N?20:480,vy=N?140:40;
    const lines=[];
    if(late)(N?WN_RULE.why8N:WN_RULE.why8W).forEach(l=>lines.push(l));
    if(nEp>=3)(N?WN_RULE.why3N:WN_RULE.why3W).forEach(l=>lines.push(l));
    if(!isA)(N?WN_RULE.okN:[WN_RULE.ok]).forEach(l=>lines.push(l));
    s+=`<rect x="${f1(vx-8)}" y="${f1(vy-18)}" width="${N?368:236}" height="${f1(36+lines.length*17)}" rx="10" style="fill:${isA?'var(--rx-soft)':'var(--good-soft)'}"/>`;
    s+=tx(vx,vy,isA?WN_RULE.ac:WN_RULE.fl,'t-sm',`fill:${isA?'var(--rx)':'var(--good)'};font-weight:700`);
    lines.forEach((l,i)=>{s+=tx(vx,vy+22+i*17,l,'t-xs','fill:var(--ink)')});
    rsvg.innerHTML=s;
    $('#wnRuleNote').innerHTML=isA?WN_RULE.sAc:WN_RULE.sFl;
    $$('[data-wne]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.wne===nEp));
    $$('[data-wnt]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.wnt==='late')===late));
  }
  $$('[data-wne]').forEach(b=>b.addEventListener('click',()=>{nEp=+b.dataset.wne;drawRule()}));
  $$('[data-wnt]').forEach(b=>b.addEventListener('click',()=>{late=b.dataset.wnt==='late';drawRule()}));
  drawRule();

  /* ---------- what was tried ---------- */
  const tsvg=$('#wnTriedSvg');let view='ster';
  function drawTried(){
    const V=WN_TRIED[view],nb=V.bars?1:0,N=vb(tsvg,'720 '+(nb?340:250),'400 '+(nb?500:400));
    const L=N?{x:24,w:350,y0:N&&V.tN?78:60,rh:56}:{x:330,w:340,y0:62,rh:40};
    const sc=V.log?(v=>Math.log2(v)):(v=>v),X=v=>L.x+L.w*(sc(v)-sc(V.lo))/(sc(V.hi)-sc(V.lo));
    let s='';
    if(N)V.tN.forEach((l,i)=>{s+=tx(16,22+i*17,l,'t-lbl')});else s+=tx(16,24,V.t,'t-lbl');
    const ref=V.log?1:0;
    V.rows.forEach((R,i)=>{const y=L.y0+i*L.rh+(N?16:0);
      if(N)s+=tx(L.x,y-14,R.kn,'t-sm','fill:var(--ink)');else s+=tx(16,y+4,R.k,'t-sm','fill:var(--ink)');
      s+=`<line x1="${f1(X(ref))}" x2="${f1(X(ref))}" y1="${f1(y-(N?8:L.rh/2))}" y2="${f1(y+(N?12:L.rh/2))}" style="stroke:var(--muted);stroke-width:1.4"/>`;
      s+=`<line x1="${f1(X(R.a))}" x2="${f1(X(R.b))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:2.2"/><rect x="${f1(X(R.v)-6)}" y="${f1(y-6)}" width="12" height="12" style="fill:var(--rx);stroke:var(--ink)"/>`;
      s+=tx(N?L.x+L.w:X(V.hi)+8,N?y-14:y+4,(R.v>0&&!V.log?'+':'')+R.v.toFixed(2),N?'t-sm t-end':'t-sm','fill:var(--ink);font-weight:700')});
    const yA=L.y0+V.rows.length*L.rh+(N?0:-10);
    s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(yA)}" y2="${f1(yA)}" class="axis"/>`;
    V.ticks.forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yA)}" y2="${f1(yA+5)}" class="axis"/>`+tx(X(v),yA+17,(v>0&&!V.log?'+':'')+v,'t-xs t-mid')});
    if(V.left)s+=tx(X(ref)-8,yA+33,N?V.leftN:V.left,'t-xs t-end')+tx(X(ref)+8,yA+33,N?V.rightN:V.right,'t-xs');
    if(V.bars){const B=V.bars,by=yA+(N?66:58),bx=N?24:330,bw=N?300:300;
      s+=tx(16,by,B.t,'t-sm','fill:var(--ink);font-weight:700');
      [B.a,B.b].forEach(([n,v],i)=>{const y=by+14+i*(N?42:30);
        if(N)s+=tx(bx,y+31,n,'t-xs');else s+=tx(bx-10,y+13,n,'t-sm t-end','fill:var(--ink)');
        s+=`<rect x="${f1(bx)}" y="${f1(y)}" width="${f1(bw)}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(y)}" width="${f1(bw*v/100)}" height="18" rx="4" style="fill:${i?'var(--muted)':'var(--rx)'};opacity:.85"/>`+tx(bx+bw*v/100+6,y+13,v+'%','t-sm','fill:var(--ink);font-weight:700')})}
    tsvg.innerHTML=s;
    $('#wnTriedNote').innerHTML=V.s;
    $$('[data-wnv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.wnv===view));
  }
  $$('[data-wnv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.wnv;drawTried()}));
  drawTried();
  const prev=redraws.whatnot;redraws.whatnot=()=>{prev&&prev();drawRule();drawTried()};
};
