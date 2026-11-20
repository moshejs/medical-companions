/* =============== 2.4 Weight stigma & bias =============== */
/* SVG text helper shared by this module: wraps words into tspans of at most n characters. */
function stWrap(x,y,str,n,cls,lh=13,style=''){
  const W=String(str).split(' '),L=[];let cur='';
  W.forEach(w=>{if(cur&&(cur+' '+w).length>n){L.push(cur);cur=w}else cur=cur?cur+' '+w:w});if(cur)L.push(cur);
  return {svg:`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${style?` style="${style}"`:''}>${L.map((l,i)=>`<tspan x="${f1(x)}" dy="${i?lh:0}">${l}</tspan>`).join('')}</text>`,h:L.length*lh};
}
inits.stigma=()=>{
  /* ---------- the loop ---------- */
  const svg=$('#stSvg'),rg=$('#stT'),note=$('#stNote');
  const STEPS=[
   {from:0,at:.06,k:'How common',t:'Stigma is common',
    txt:'Among adults with obesity, 19–42% report weight discrimination, more at higher BMI and in women. [[Rubino2020Stigma]] In 13,996 adults in weight-management programmes across six countries, 56–61% had experienced weight stigma, and two-thirds of them reported it from doctors. [[Puhl2021SixCountries]] Common stereotypes cast people as lazy, gluttonous, lacking willpower, unmotivated, non-compliant and personally to blame. [[Rubino2020Stigma]]',
    pt:'Many people living with obesity are treated unfairly because of their weight, including by health workers. It is common, and it is not their fault.',
    hook:'Six-country survey: 56–61% experienced weight stigma; two-thirds of them from doctors. [[Puhl2021SixCountries]]'},
   {from:.16,at:.22,k:'In the clinic',t:'Bias in care',
    txt:'Among 2284 doctors who took the Weight Implicit Association Test, implicit anti-fat bias was strong (Cohen\'s d = 0.93), about the same as in the general public (d = 1.0). [[Sabin2012]] Many clinicians hold negative attitudes toward people with obesity; these affect judgement, behaviour and decisions, and can lower the quality of care despite good intentions. [[Phelan2015]]',
    pt:'Health workers grow up in the same culture as everyone else, so many carry the same hidden bias. Noticing it is the first step.',
    hook:'Doctors\' implicit anti-fat bias d = 0.93 vs public d = 1.0 (Weight IAT, n = 2284 doctors). [[Sabin2012]]'},
   {from:.32,at:.38,k:'Staying away',t:'Avoiding care',
    txt:'Expecting poor treatment leads to stress, avoiding care, mistrust and poorer adherence. [[Phelan2015]] In a US survey of 1064 adults, 19% would avoid future appointments and 21% would seek a new doctor if they felt stigmatised about their weight by their doctor. [[Puhl2013Language]] Higher internalised weight bias went with more avoidance of care, fewer routine check-ups and lower perceived quality of care, independent of BMI. [[Puhl2021SixCountries]]',
    pt:'If a visit feels shaming, people put off the next one. Missed check-ups mean problems are found later.',
    hook:'Felt stigmatised by their doctor: 19% would avoid future appointments, 21% would change doctor. [[Puhl2013Language]]'},
   {from:.48,at:.54,k:'In the body',t:'Stress in the body',
    txt:'In 33 studies of adults, weight stigma was associated with higher cortisol, oxidative stress and CRP, and with higher obesity and diabetes risk. [[Wu2018]] Weight discrimination was associated with nearly 60% higher mortality: HR 1.57 in the Health and Retirement Study (n = 13,692) and HR 1.59 in MIDUS (n = 5079), not explained by common physical or psychological risk factors. [[Sutin2015]]',
    pt:'Being treated badly again and again is a real stress on the body, not just on feelings.',
    hook:'Weight discrimination: HR 1.57–1.59 for death in two US cohorts. [[Sutin2015]]'},
   {from:.64,at:.7,k:'Eating, mood, moving',t:'Turned inwards',
    txt:'Weight stigma is associated with more disordered eating, depression and anxiety, and lower self-esteem. [[Wu2018]] About 40–50% of US adults with overweight or obesity internalise weight bias, about 20% at high levels. [[Rubino2020Stigma]] Across 74 studies, internalised weight bias had strong negative links with mental health; links with physical health were less consistent. [[Pearl2018WBI]] In young people, stigma contributes to binge eating, social isolation and less physical activity. [[Pont2017AAP]]',
    pt:'Hearing hurtful messages for years can lead people to believe them. That can affect eating, mood and how comfortable someone feels being active in public.',
    hook:'Internalised weight bias: about 40–50% of US adults with overweight or obesity, 20% at high levels. [[Rubino2020Stigma]]'},
   {from:.8,at:.97,k:'The loop',t:'The loop closes, and can be broken',
    txt:'Weight stigma raises the risk of obesity through several pathways and harms health over and above BMI <span class="ev early">Early evidence</span>, [[Tomiyama2018]] so stigma is not a useful public-health tool: it threatens health, creates disparities and interferes with treatment. <span class="ev est">Established</span> [[Puhl2010AJPH,Rubino2020Stigma]] The consensus agreed (above 90%) that the belief that obesity is a choice, reversible by eating less and moving more, misleads policy and undermines access to treatment, and all signatories agreed that weight stigma should not be tolerated in education, health care or public policy. [[Rubino2020Stigma]]',
    pt:'Shame does not help anyone get healthier. Respect does more: fair words, fitting equipment and care that treats obesity as the chronic disease it is.',
    hook:'Stigma reduction targets those who stigmatise, starting in health-professional training, not the people who experience it. [[Tomiyama2018,Rubino2020Stigma]]'}
  ];
  /* nodes: reveal time, label lines */
  const NODES={stig:{r:0,l:['Weight','stigma']},avoid:{r:.32,l:['Avoiding','care']},stress:{r:.48,l:['Stress in','the body']},
    eat:{r:.64,l:['Disordered eating,','low mood']},move:{r:.64,l:['Less','activity']},out:{r:.8,l:['Weight gain,','worse health']}};
  const MED=['stress','avoid','eat','move'];
  const ACT=[['stig'],['stig','avoid'],['avoid'],['stress'],['eat','move'],['out','stig']];
  /* the stat panel for each step */
  const STAT=[
   {big:'56–61%',cap:'of 13,996 adults in weight-management programmes in six countries had experienced weight stigma',vis:'icons',g:[[56,'var(--hl)'],[5,'var(--hl-soft)']]},
   {big:'d = 0.93',cap:'implicit anti-fat bias in 2284 doctors, close to the general public',vis:'bars',max:1.2,b:[['Doctors',.93,'var(--hl)'],['General public',1.0,'var(--muted)']],fmt:v=>v.toFixed(2)},
   {big:'19%',cap:'would avoid future appointments, and 21% would change doctor, after feeling stigmatised about weight',vis:'icons',g:[[19,'var(--hl)'],[21,'var(--hl-soft)']]},
   {big:'≈ 60%',cap:'higher mortality with weight discrimination (hazard ratios 1.57 and 1.59)',vis:'bars',max:1.8,b:[['No discrimination',1.0,'var(--muted)'],['HRS cohort',1.57,'var(--hl)'],['MIDUS cohort',1.59,'var(--hl)']],fmt:v=>v.toFixed(2)},
   {big:'40–50%',cap:'of US adults with overweight or obesity internalise weight bias; about 20% at high levels',vis:'icons',g:[[20,'var(--hl)'],[30,'var(--hl-soft)']]},
   {big:'Unanimous',cap:'2020 international consensus: weight stigma causes harm and should not be tolerated',vis:'list',items:['Causes physical and psychological harm','Keeps people from seeking good care','Not tolerated in schools, care or policy','Obesity is not simply a choice (over 90%)']}
  ];
  const stopP=playWire(rg,$('#stPlay'),draw,22000,'%t:player.replay%','stigma');
  const setStep=stepWire($('#stSteps'),STEPS,rg,draw,stopP);
  function box(cx,cy,w,h,lines,state){
    const on=state==='on',vis=state!=='hidden';
    let s=`<g style="opacity:${vis?1:.4}"><rect x="${f1(cx-w/2)}" y="${f1(cy-h/2)}" width="${w}" height="${h}" rx="12" style="fill:${on?'var(--hl-soft)':'var(--panel-2)'};stroke:${on?'var(--hl)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
    const lh=14,y0=cy-(lines.length-1)*lh/2+4.5;
    lines.forEach((l,i)=>{s+=`<text x="${f1(cx)}" y="${f1(y0+i*lh)}" class="t-lbl t-mid" style="font-size:12.5px${on?';fill:var(--hl)':''}">${l}</text>`});
    return s+'</g>';
  }
  function edge(P,live,t,col,dash){
    /* P: points of a polyline; live: dots travel along it */
    let s=`<path d="${ptsD(P)}" style="fill:none;stroke:${live?col:'var(--line)'};stroke-width:${live?2:1.4};${dash?'stroke-dasharray:5 4;':''}" marker-end="url(#stArr${live?'On':'Off'})"/>`;
    if(live&&!RM){const f=polyAt(P);for(let i=0;i<3;i++){const u=((t*9+i/3)%1+1)%1,p=f(u);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.2" style="fill:${col}"/>`}}
    return s;
  }
  function stat(S,x,y,w,h,u){
    /* u 0..1: build-up within the step */
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel-2)"/>`;
    const N=NARROW();
    const bx=x+14,bw=N?w-28:Math.min(240,w*.4);
    s+=`<text x="${bx}" y="${y+(N?36:38)}" class="t-big" style="font-size:${N?28:30}px;fill:var(--hl)">${S.big}</text>`;
    s+=stWrap(bx,y+(N?58:62),S.cap,N?46:30,'t-lbl',15,'font-weight:500;font-size:13px').svg;
    const vx=N?x+14:x+bw+30,vy=N?y+120:y+16,vw=N?w-28:w-bw-44;
    if(S.vis==='icons'){
      let acc=0;const groups=S.g.map(([k,col])=>{const kk=Math.round(clamp(u*(acc+k)-acc,0,k));acc+=k;return {k:kk,col}});
      const sz=N?11:12,ia=iconArray(vx,vy,{n:100,cols:20,size:sz,gap:N?4:3.4,groups,shape:'person',base:'var(--line)'});
      s+=ia.svg+`<text x="${vx}" y="${f1(vy+ia.h+12)}" class="t-xs">each figure = 1 in 100</text>`;
    }else if(S.vis==='bars'){
      const rows=S.b.length,rh=N?26:Math.min(24,(h-30)/rows-6),lw=N?118:110;
      S.b.forEach((b,i)=>{const yy=vy+(N?8:2)+i*(rh+6),ww=(vw-lw-50)*b[1]/S.max*ease(clamp(u*1.15));
        s+=`<text x="${vx+lw-6}" y="${f1(yy+rh/2+4)}" class="t-xs t-end" style="fill:var(--ink)">${b[0]}</text>`;
        s+=`<rect x="${vx+lw}" y="${f1(yy)}" width="${f1(Math.max(1,ww))}" height="${f1(rh)}" rx="4" style="fill:${b[2]}"/>`;
        s+=`<text x="${f1(vx+lw+ww+6)}" y="${f1(yy+rh/2+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">${S.fmt(b[1]*clamp(u*1.15))}</text>`});
    }else{
      S.items.forEach((it,i)=>{const show=clamp(u*S.items.length*1.2-i),yy=vy+14+i*(N?24:26);
        s+=`<g style="opacity:${f1(show)}"><path d="M${vx} ${yy-4}l4 4 8-9" style="fill:none;stroke:var(--life);stroke-width:2.2;stroke-linecap:round"/><text x="${vx+18}" y="${yy}" class="t-lbl" style="font-weight:500">${it}</text></g>`});
    }
    return s;
  }
  function draw(t){
    vb(svg,'720 380','400 560');const N=NARROW(),p=phaseOf(STEPS,t),S=STEPS[p];setStep(p);
    const act=ACT[p];
    const st=id=>t<NODES[id].r?'hidden':act.includes(id)?'on':'seen';
    let s=`<defs>${marker('stArrOn','var(--hl)',7)}${marker('stArrOff','var(--line)',7)}</defs>`;
    /* geometry */
    let P,bw,bh,mw;
    if(!N){P={stig:[92,126],out:[620,126],stress:[352,46],avoid:[352,98],eat:[352,152],move:[352,204]};bw=128;bh=50;mw=164}
    else{P={stig:[200,48],stress:[112,134],avoid:[288,134],eat:[112,196],move:[288,196],out:[200,278]};bw=150;bh=46;mw=156}
    const mh=N?44:42;
    /* edges */
    MED.forEach(m=>{
      const a=P.stig,b=P[m],live=t>=NODES[m].r;
      const e1=N?[[a[0]+(b[0]<200?-30:30),a[1]+bh/2],[b[0],b[1]-mh/2-2]]:[[a[0]+bw/2,a[1]],[b[0]-mw/2-2,b[1]]];
      s+=edge(e1,live,t,'var(--hl)');
      const o=P.out,live2=t>=NODES.out.r;
      const e2=N?[[b[0],b[1]+mh/2],[o[0]+(b[0]<200?-30:30),o[1]-bh/2-2]]:[[b[0]+mw/2,b[1]],[o[0]-bw/2-2,o[1]]];
      s+=edge(e2,live2,t,'var(--hl)');
    });
    /* the return arc: worse health draws more stigma */
    const ret=N?[[P.out[0]-bw/2,P.out[1]],[18,P.out[1]],[18,P.stig[1]],[P.stig[0]-bw/2-2,P.stig[1]]]
               :[[P.out[0],P.out[1]-bh/2],[P.out[0],13],[P.stig[0],13],[P.stig[0],P.stig[1]-bh/2-2]];
    const retLive=t>=NODES.out.r;
    s+=edge(ret,retLive,t,'var(--hl)',true);
    if(retLive){const lp=N?[24,(P.out[1]+P.stig[1])/2]:[(P.out[0]+P.stig[0])/2,10];
      s+=N?`<text x="30" y="${lp[1]}" class="t-xs" transform="rotate(-90 30 ${lp[1]})" style="text-anchor:middle;fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px">more stigma</text>`
          :kitLabel(lp[0],lp[1]+3,'and round again: more stigma',{a:'m'})}
    /* breaking the loop: a shield on the return path late in the last step */
    const brk=ramp(t,.9,.97);
    if(brk>0){const c=N?[66,P.out[1]]:[(P.out[0]+P.stig[0])/2+120,13];
      s+=`<g style="opacity:${f1(brk)}"><circle cx="${c[0]}" cy="${c[1]}" r="${f1(9+4*brk)}" style="fill:var(--life-soft);stroke:var(--life);stroke-width:2.4"/><path d="M${c[0]-6} ${c[1]}l4 4 8-9" style="fill:none;stroke:var(--life);stroke-width:2.4;stroke-linecap:round"/></g>`;
      const lx=N?16:c[0]+18,ly=N?c[1]+30:c[1]+4;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--life);font-weight:700;opacity:${f1(brk)};paint-order:stroke;stroke:var(--panel);stroke-width:3px">respect breaks the loop</text>`}
    /* nodes */
    s+=box(P.stig[0],P.stig[1],bw,bh,NODES.stig.l,st('stig'));
    MED.forEach(m=>{s+=box(P[m][0],P[m][1],mw,mh,NODES[m].l,st(m))});
    s+=box(P.out[0],P.out[1],bw+(N?0:10),bh,NODES.out.l,st('out'));
    /* stat panel */
    const u=ramp(t,S.from,Math.min(S.at+.04,S.from+.1));
    s+=N?stat(STAT[p],12,322,376,232,u):stat(STAT[p],12,238,696,138,u);
    svg.innerHTML=s;
    note.innerHTML=noteHTML(S);
  }
  draw(+rg.value);

  /* ---------- words matter ---------- */
  const WORDS=[
   {no:'"obese people"',yes:'"people with obesity"',why:'People-first language keeps the disease from defining the person. [[Kyle2014,Puhl2020Words]]'},
   {no:'"morbidly obese"',yes:'"higher weight", or talk about "weight"',why:'In a US national survey, "weight" and "unhealthy weight" were the most desirable terms; "morbidly obese", "fat" and "obese" the most undesirable, stigmatising and blaming for providers to use. [[Puhl2013Language]]'},
   {no:'"fat" (to a child)',yes:'"healthy weight", and talk about habits',why:'Young people preferred "healthy weight"; "obese", "fat" and "large" made them feel sad, ashamed and embarrassed. [[Puhl2022Terms]]'},
   {no:'"lazy, no willpower"',yes:'"a chronic disease with many causes"',why:'The consensus lists lazy, lacking willpower, unmotivated and personally to blame as stereotypes, not facts. [[Rubino2020Stigma]] Genes, biology, surroundings and life circumstances all play a part; see <a href="#causes" data-go="causes">Causes</a>.'},
   {no:'"just eat less and move more"',yes:'"let\'s look at what is driving this, and the options"',why:'Over 90% of the consensus agreed that the belief that obesity is a choice, reversible by eating less and exercising more, misleads policy and undermines access to treatment. [[Rubino2020Stigma]]'},
   {no:'"non-compliant"',yes:'"what has made this hard?"',why:'Expecting poor treatment brings stress, avoided care, mistrust and poorer adherence; a respectful question opens the problem up. [[Phelan2015]]'}
  ];
  const wd=$('#stWords');
  wd.innerHTML=WORDS.map((w,i)=>`<button class="st-fc" data-w="${i}" aria-pressed="false"><span class="st-front"><small>Instead of</small><span class="st-say">${w.no}</span><span class="st-hint">Tap for a person-first alternative</span></span><span class="st-back"><small>Try</small><span class="st-say">${w.yes}</span><span class="st-why">${w.why}</span></span></button>`).join('');
  wd.addEventListener('click',e=>{if(e.target.closest('a'))return;const b=e.target.closest('[data-w]');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});
  const fa=$('#stFlipAll');
  fa.addEventListener('click',()=>{const on=fa.getAttribute('aria-pressed')!=='true';fa.setAttribute('aria-pressed',on);fa.textContent=on?'Hide all alternatives':'Show all alternatives';$$('[data-w]',wd).forEach(b=>b.setAttribute('aria-pressed',on))});

  /* ---------- pictures matter: a camera over a park scene ---------- */
  const img=$('#stImg'),inote=$('#stImgNote'),fb=$('#stFrBtns');
  const AR=360/250;
  const FR=[
   {b:'Headless crop',c:[150,115,96],k:'Stigmatising framing',t:'Headless',txt:'The camera cuts the head off and keeps the body. In the news-video study this was one of the most common framings; with rear views and isolated body parts it was used to show 65% of adults with higher weight in a negative way. [[Puhl2013Headless]]',bad:true,tips:['Removes the person and keeps the body','A common framing in news videos about obesity','65% of adults and 77% of young people with higher weight were shown negatively']},
   {b:'Isolated body part',c:[150,118,54],k:'Stigmatising framing',t:'A body part, not a person',txt:'A close crop on one part of the body turns a person into a symbol. In three experiments (n = 1251), stereotyped images like these in news stories increased anti-fat attitudes and the wish for social distance. [[Puhl2013Media]]',bad:true,tips:['Body parts, rear views and ill-fitting clothes','Stereotyped images raised anti-fat attitudes','and the wish for social distance (3 experiments)']},
   {b:'Whole person, everyday life',c:[150,104,206],k:'Respectful framing',t:'The whole person, living their life',txt:'Show the whole person, head and all, doing ordinary things. In the same experiments, positive, non-stereotyped images improved attitudes. [[Puhl2013Media]] The consensus calls for "fair, accurate, and non-stigmatizing portrayals of obesity". [[Rubino2020Stigma]]',bad:false,tips:['The whole person, in an ordinary setting','Positive, non-stereotyped images','improved attitudes in the same experiments']}
  ];
  fb.innerHTML=FR.map((f,i)=>`<button class="btn" data-fr="${i}" aria-pressed="${i===0}">${f.b}</button>`).join('');
  let fi=0,cam=FR[0].c.slice(),stopC=null;
  /* the scene in world units (300 x 210), drawn once */
  const ID=kid('stc');
  function scene(){
    let s=`<rect x="-200" y="-200" width="700" height="600" style="fill:var(--field)"/>`;
    s+=`<rect x="-200" y="185" width="700" height="300" style="fill:var(--life-soft)"/><path d="M-200 196 Q150 178 500 200" style="fill:none;stroke:var(--line);stroke-width:10;stroke-linecap:round"/>`;
    /* tree */
    s+=`<rect x="36" y="110" width="9" height="78" rx="3" style="fill:var(--figure-line);opacity:.6"/><path d="${blob(40,92,34,4,{rough:.12})}" style="fill:var(--life);opacity:.35"/>`;
    /* bench */
    s+=`<rect x="214" y="158" width="64" height="6" rx="2" style="fill:var(--device)"/><rect x="214" y="146" width="64" height="5" rx="2" style="fill:var(--device)"/><rect x="220" y="164" width="4" height="22" style="fill:var(--device)"/><rect x="268" y="164" width="4" height="22" style="fill:var(--device)"/>`;
    /* a friend further back, and the main person, holding a bag */
    s+=person(250,108,78,{size:.25,op:.85}).svg;
    s+=person(150,40,146,{size:.85}).svg;
    s+=`<path d="M176 128 q8 -2 10 8 l3 22 h-20 l1 -22 q-1 -8 6 -8z" style="fill:var(--accent);opacity:.75"/>`;
    return s;
  }
  const SCN=scene();
  function drawImg(){
    vb(img,'720 300','400 430');const N=NARROW(),F=FR[fi];
    const fx=N?20:20,fy=20,fw=360,fh=250;
    const w=cam[2]*AR,h=cam[2];
    let s=`<defs><clipPath id="${ID}"><rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="10"/></clipPath></defs>`;
    s+=`<g clip-path="url(#${ID})"><svg x="${fx}" y="${fy}" width="${fw}" height="${fh}" viewBox="${f1(cam[0]-w/2)} ${f1(cam[1]-h/2)} ${f1(w)} ${f1(h)}" preserveAspectRatio="xMidYMid slice">${SCN}</svg></g>`;
    /* viewfinder corners */
    const C=(x,y,dx,dy)=>`<path d="M${x} ${y+dy*22}V${y}H${x+dx*22}" style="fill:none;stroke:${F.bad?'var(--bad)':'var(--life)'};stroke-width:3"/>`;
    s+=C(fx+8,fy+8,1,1)+C(fx+fw-8,fy+8,-1,1)+C(fx+8,fy+fh-8,1,-1)+C(fx+fw-8,fy+fh-8,-1,-1);
    s+=`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="10" style="fill:none;stroke:var(--line)"/>`;
    const tx=N?20:410,ty=N?300:44;
    s+=`<text x="${tx}" y="${ty}" class="t-sm" style="fill:${F.bad?'var(--bad)':'var(--life)'};font-weight:700;letter-spacing:.08em">${F.k.toUpperCase()}</text>`;
    s+=`<text x="${tx}" y="${ty+26}" class="t-big">${F.t}</text>`;
    const tips=F.tips;
    let ny=ty+52;tips.forEach(tp=>{const w=stWrap(tx,ny,'• '+tp,N?58:42,'t-sm',13,'fill:var(--ink)');s+=w.svg;ny+=w.h+(N?6:10)});
    img.innerHTML=s;
    inote.innerHTML=`<div class="kicker">${F.k}</div><h4>${F.t}</h4><p>${F.txt}</p>`;
  }
  fb.addEventListener('click',e=>{const b=e.target.closest('[data-fr]');if(!b)return;fi=+b.dataset.fr;$$('[data-fr]',fb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopC)stopC();const a=cam.slice(),z=FR[fi].c;stopC=animate(700,p=>{const q=ease(p);cam=a.map((v,i)=>lerp(v,z[i],q));drawImg()},()=>{stopC=null})});
  drawImg();
  const prevR=redraws.stigma;redraws.stigma=()=>{prevR&&prevR();drawImg()};
  const prevH=onHide.stigma;onHide.stigma=()=>{prevH&&prevH();if(stopC){stopC();stopC=null;cam=FR[fi].c.slice()}};
};
