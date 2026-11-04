/* =============== 4.5 Compensated to decompensated: the course =============== */
/* Main scrubber: the D'Amico 5-stage staircase (25-year inception cohort) with 5-year mortality and 5-year
   transition rates, the compensated/decompensated survival cliff, and ACLF striking from any rung; a
   'cause removed' toggle draws recompensation. Second interactive: ACLF groups as 100-person icon arrays. */
const CO_RUNG=[
 {n:'Stage 1',l1:'Compensated',l2:'no varices',m5:1.5,tr:34.5,y1:'about 1% a year'},
 {n:'Stage 2',l1:'Compensated',l2:'varices',m5:10,tr:42,y1:'about 3% a year'},
 {n:'Stage 3',l1:'Bleeding',l2:'alone',m5:20,tr:65,y1:''},
 {n:'Stage 4',l1:'Ascites, HE',l2:'or jaundice',m5:30,tr:78,y1:'ascites: about 20% at 1 year'},
 {n:'Stage 5',l1:'Further',l2:'events',m5:88,tr:null,y1:''}];
const CO_STEPS=[
 {from:0,at:.08,k:'Stage 1 · compensated',t:'No varices yet',
  txt:`In D'Amico's 25-year inception cohort of 494 people (404 with hepatitis C), stage 1 was compensated cirrhosis without varices: 5-year mortality 1.5%, and 34.5% moved to a later stage within 5 years. [[DAmico2014APT]] The classic review put 1-year mortality at about 1% in this stage. [[Zipprich2012,DAmico2006]] Compensated means no present or past complications. [[deFranchis2022BavenoVII]]`,
  pt:`In the early stage the liver is scarred but still coping, and most people feel well. [[Gines2021Lancet]]`,
  hook:`Median survival is over 12 years in compensated cirrhosis and under 2 years in decompensated cirrhosis. [[Zipprich2012,DAmico2006]]`},
 {from:.17,at:.25,k:'Stage 2 · compensated',t:'Varices appear',
  txt:`Rising portal pressure opens varices, still without symptoms. 5-year mortality was 10%, and 42% moved on within 5 years. [[DAmico2014APT]] In the 4-stage model, about 3% died each year. [[Zipprich2012,DAmico2006]] Baveno VII splits compensated cirrhosis by clinically significant portal hypertension, which marks a higher risk of decompensation. [[deFranchis2022BavenoVII]] In 293 people with compensated cirrhosis, 58% had decompensated by 10 years. [[Gines1987]]`,
  pt:`Swollen veins (varices) can form in the gullet before anything is felt. They are looked for so they can be treated early: see <a href="#portal" data-go="portal">Portal hypertension</a>.`,
  hook:`D'Amico 4-stage 1-year mortality: about 1% (no varices), 3% (varices), 20% (ascites), 57% (bleeding). [[Zipprich2012,DAmico2006]]`},
 {from:.34,at:.42,k:'Stage 3 · decompensated',t:'Bleeding alone',
  txt:`Crossing the dashed line is the big change: decompensation. In the 5-stage model, a variceal bleed with no other complication carried 20% 5-year mortality, and 65% moved on within 5 years. [[DAmico2014APT]] In a German cohort, 1-year mortality was 21.9% with ascites but 18.1% with bleeding, and ascites stratified risk better. [[Zipprich2012]]`,
  pt:`Bleeding from varices shows as vomiting blood or black, tarry stools. It needs emergency care straight away.`,
  hook:`Baveno VII's three decompensating events: overt ascites, overt HE (West Haven grade II or higher) and variceal bleeding. [[deFranchis2022BavenoVII]]`},
 {from:.5,at:.58,k:'Stage 4 · decompensated',t:'Ascites, HE, jaundice',h:'Ascites, encephalopathy or jaundice',
  txt:`A first non-bleeding decompensation carried 30% 5-year mortality, and 78% moved on within 5 years. [[DAmico2014APT]] Median survival after ascites develops is about 1.1 years, and after hepatic encephalopathy 0.92 years. [[Tapper2023JAMA]] In a cohort of 443 people, 1-year mortality was 5.4% in compensated and 20.2% in decompensated cirrhosis. [[Zipprich2012]]`,
  pt:`Fluid in the belly or new confusion means the liver can no longer keep up. Treatment can still help a great deal, and some people later recover a stable state.`,
  hook:`Ascites is the most common first decompensating event (48% in decompensated hepatitis C cirrhosis). [[Planas2004]]`},
 {from:.67,at:.76,k:'Stage 5 · further decompensation',t:'Second event',h:'Further decompensation',
  txt:`Any second decompensating event: 5-year mortality 88% in D'Amico's cohort. [[DAmico2014APT]] Baveno VII describes further decompensation as a stage with even higher mortality than the first, defined by a second portal hypertension-driven event or jaundice, recurrent bleeding, recurrent ascites (3 or more large-volume paracenteses in a year), recurrent encephalopathy, or SBP or HRS-AKI. [[deFranchis2022BavenoVII]]`,
  pt:`When problems keep coming back, it is a good time to talk about transplant assessment and about support for symptoms, side by side.`,
  hook:`D'Amico 5-stage 5-year mortality: 1.5%, 10%, 20%, 30% and 88%. [[DAmico2014APT]]`},
 {from:.84,at:.94,k:'Any stage · ACLF',t:'ACLF',h:'Acute-on-chronic liver failure',
  txt:`ACLF can arise in compensated or decompensated cirrhosis. [[DAmico2018JHep]] In CANONIC, 28-day mortality was 33.9% with ACLF at enrolment, 29.7% when it developed during the stay and 1.9% without it; ACLF was most severe in people with no prior decompensation. [[Moreau2013CANONIC]] Across 30 cohorts, ACLF affected 35% of people admitted with decompensated cirrhosis, and pooled 90-day mortality was 58%. Infection was the commonest trigger (35%). [[Mezzano2022Gut]]`,
  pt:`ACLF is a sudden, severe worsening, often set off by an infection, in which other organs such as the kidneys start to fail. It is treated in hospital, often in intensive care.`,
  hook:`CANONIC: ACLF 28-day mortality 33.9% vs 1.9% without ACLF. Globally about 35% of people admitted with decompensated cirrhosis have ACLF. [[Moreau2013CANONIC,Mezzano2022Gut]]`}];
const CO_CAUSE_COMP=`<p><span class="ev est">Established</span> Removing or suppressing the cause lowers portal pressure (HVPG) in most people and substantially reduces the risk of decompensation. [[deFranchis2022BavenoVII]] In hepatitis C with advanced fibrosis, 10-year all-cause mortality was 8.9% after SVR vs 26.0% without, and liver failure 2.1% vs 29.9%. [[vanderMeer2012]]</p>`;
const CO_CAUSE_DEC=`<p><span class="ev est">Established</span> Baveno VII states that recompensation implies at least partial regression of the structural and functional changes of cirrhosis once the cause is removed. [[deFranchis2022BavenoVII]] <span class="ev early">Early evidence</span> Published rates vary by cause and definition: 56.2% by 120 weeks with entecavir for hepatitis B, [[Wang2022Recomp]] 33.8% by 5 years with abstinence in alcohol-related cirrhosis (abstinence within a month of decompensation doubled the chance), [[Hofer2026JHep]] and 13% within 24 months of antivirals in decompensated hepatitis C. [[Goyes2026]] Because CSPH may persist, Baveno VII states that non-selective beta-blockers should not be stopped unless CSPH resolves. [[deFranchis2022BavenoVII]]</p>`;
const CO_ACL={
 no:{t:'No ACLF',k:'CANONIC · 28 days',lo:1.9,hi:1.9,lab:'1.9%',
  txt:`Among people admitted with acute decompensation who never developed ACLF, 28-day mortality was 1.9%. [[Moreau2013CANONIC]]`},
 yes:{t:'ACLF at admission',k:'CANONIC · 28 days',lo:33.9,hi:33.9,lab:'33.9%',
  txt:`303 of the 1,343 people had ACLF at enrolment and 112 developed it during the stay. 28-day mortality was 33.9% and 29.7%. People with ACLF were younger, more often had alcohol-related disease and bacterial infections, and had higher white cell counts and C-reactive protein. [[Moreau2013CANONIC]]`},
 g01:{t:'Final grade: none or ACLF-1',k:'Gustot 2015 · 28 days, transplant-free',lo:6,hi:18,lab:'6–18%',
  txt:`ACLF moves. Of 388 people with ACLF, 49.2% resolved or improved, and 81% reached their final grade within 1 week. When the final grade was no ACLF or ACLF-1, 28-day transplant-free mortality was 6–18%. [[Gustot2015]]`},
 g23:{t:'Final grade: ACLF-2 or ACLF-3',k:'Gustot 2015 · 28 days, transplant-free',lo:42,hi:92,lab:'42–92%',
  txt:`When the final grade was ACLF-2 or ACLF-3, 28-day transplant-free mortality was 42–92%. 75% of those who had an early transplant survived at least 1 year. [[Gustot2015]]`},
 glob:{t:'Worldwide, 90 days',k:'Meta-analysis of 30 cohorts',lo:58,hi:58,lab:'58%',
  txt:`Across 30 cohorts (43,206 people with ACLF), pooled 90-day mortality was 58%, highest in South America (73%). Prevalence among admitted people with decompensated cirrhosis was 35%, and 65% in South Asia; kidney dysfunction was the commonest organ failure (49%). Definitions differ between regions, and a global multisociety consensus on definitions was published in 2026. [[Mezzano2022Gut,ACLFConsensus2026]]`}};

inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote'),cb=$('#coCause');let cause=false;
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  /* where the marker stands: rung index (fractional while climbing) */
  const pos=t=>{const F=CO_STEPS.map(s=>s.from);let r=0;for(let i=1;i<5;i++)r+=ramp(t,F[i]-.05,F[i]);return r};
  function icons(x,y,d,s,n,hi,col,hatch){let g='';for(let i=0;i<100;i++){const px=x+(i%10)*d+d/2,py=y+Math.floor(i/10)*d;
    g+=person(px,py,s,i<n?col:i<hi?hatch:'var(--panel-2)',{op:i>=n&&i<hi?.7:1})}return g}
  let setActive=()=>{};
  function draw(t){const N=vb(svg,'720 380','400 560'),p=phaseOf(CO_STEPS,t),P=CO_STEPS[p],r=pos(t),ri=Math.min(4,Math.round(r)),aclf=p===5;
    const L=N?{x0:20,w:72,base:290,dh:34,h0:66,lx:72,ly:104,ls:.4,ax:228,ay:44}:{x0:28,w:72,base:316,dh:36,h0:70,lx:92,ly:116,ls:.5,ax:244,ay:48};
    const top=i=>L.base-(L.h0+i*L.dh);
    let s=`<defs>${marker('coArG','var(--rx)')}${marker('coArB','var(--bad)')}</defs>`;
    s+=T(N?20:28,28,P.h||P.t,'t-big','font-size:19px')+T(N?20:28,46,P.k,'t-sm');
    /* the liver: more scarred as the stairs rise; regresses part way when the cause is removed */
    s+=liver(L.lx,L.ly,L.ls,{fib:3.3+Math.min(r,4)*.18,regress:cause?.85:0,seed:21,gb:false}).svg;
    s+=T(L.lx,L.ly+(N?34:40),cause?'scar thins, in part':'scarred liver','t-xs t-mid',cause?'fill:var(--rx)':'');
    /* the cliff between compensated and decompensated */
    const cx=L.x0+2*L.w-2;
    s+=`<line x1="${cx}" x2="${cx}" y1="${top(2)-8}" y2="${L.base+38}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:4 4;opacity:.8"/>`;
    s+=T(cx-6,L.base+34,'median survival >12 y','t-xs t-end','fill:var(--ink)')+T(cx+6,L.base+34,'<2 y','t-xs','fill:var(--bad)');
    /* rungs */
    CO_RUNG.forEach((g,i)=>{const x=L.x0+i*L.w,y=top(i),on=i===ri&&!aclf,past=i<r-.01,dec=i>=2;
      s+=`<rect x="${x}" y="${y}" width="${L.w-4}" height="${L.base-y}" rx="6" style="fill:${on?(dec?'var(--accent-soft)':'var(--brand-soft)'):past?'var(--panel-2)':'var(--field)'};stroke:${on?(dec?'var(--accent)':'var(--brand)'):'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=T(x+(L.w-4)/2,y+15,g.n,'t-xs t-mid','fill:var(--ink);font-weight:700')+T(x+(L.w-4)/2,y+28,g.l1,'t-xs t-mid')+T(x+(L.w-4)/2,y+(N?39:40),g.l2,'t-xs t-mid');
      if(!N||L.base-y>60)s+=T(x+(L.w-4)/2,L.base-8,g.m5+'%','t-lbl t-mid',`fill:${dec?'var(--accent)':'var(--brand)'}`);});
    s+=T(L.x0,L.base+18,'compensated','t-xs','fill:var(--brand)')+T(cx+6,L.base+18,'decompensated','t-xs','fill:var(--accent)');
    s+=T(L.x0+5*L.w-4,L.base+18,'5-year mortality','t-xs t-end');
    /* the marker climbs */
    const ix=Math.floor(Math.min(r,4)),fr=Math.min(r,4)-ix,j=Math.min(4,ix+1);
    const mx=lerp(L.x0+ix*L.w+(L.w-4)/2,L.x0+j*L.w+(L.w-4)/2,ease(fr)),my=lerp(top(ix),top(j),ease(fr))-10-bump(fr,0,1)*16;
    if(!aclf)s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.4"/>`;
    /* ACLF: from any rung */
    const ao=ramp(t,.82,.88);
    if(ao>0){const bw=N?150:150,bh=N?40:46;s+=`<g style="opacity:${f1(ao)}"><rect x="${L.ax}" y="${L.ay}" width="${bw}" height="${bh}" rx="8" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6"/>`;
      s+=T(L.ax+bw/2,L.ay+18,'ACLF','t-lbl t-mid','fill:var(--bad)')+T(L.ax+bw/2,L.ay+32,'organ failure, any stage','t-xs t-mid');
      CO_RUNG.forEach((g,i)=>{const x=L.x0+i*L.w+(L.w-4)/2,y=top(i)-2;s+=`<path d="M${f1(x)} ${f1(y)}Q${f1(lerp(x,L.ax+bw/2,.5))} ${f1(Math.min(y,L.ay+bh)-20)} ${f1(L.ax+12+i*(bw-24)/4)} ${f1(L.ay+bh+2)}" style="fill:none;stroke:var(--bad);stroke-width:1.2;stroke-dasharray:3 3;opacity:.7" marker-end="url(#coArB)"/>`});
      s+='</g>'}
    /* cause removed: arrows back down */
    if(cause){[2,3,4].forEach(i=>{const x=L.x0+i*L.w+(L.w-4)/2,y=top(i)-4,tx=L.x0+1*L.w+(L.w-4)/2+((i-3)*10),ty=top(1)-8;
      s+=`<path d="M${f1(x)} ${f1(y)}Q${f1((x+tx)/2)} ${f1(Math.min(y,ty)-(N?24:34)-i*4)} ${f1(tx)} ${f1(ty)}" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:.9" marker-end="url(#coArG)"/>`});
      s+=T(L.x0+L.w-2,top(1)-4,'recompensation','t-xs t-end','fill:var(--rx);font-weight:700')}
    /* right panel */
    const R=N?{x:20,y:362,d:15,s:12,bx:196,w:184}:{x:410,y:96,d:19,s:15,bx:614,w:290};
    if(cause){s+=T(R.x,R.y-10,p<2?'Removing the cause, compensated':'Recompensation after the cause is removed','t-sm','fill:var(--rx)');
      const B=p<2?[['Hep C, 10-y death, no SVR',26.0,'26.0%','var(--scar-line)'],['Hep C, 10-y death, SVR',8.9,'8.9%','var(--rx)'],['Hep C, liver failure, no SVR',29.9,'29.9%','var(--scar-line)'],['Hep C, liver failure, SVR',2.1,'2.1%','var(--rx)']]
        :[['Hep B, entecavir, 120 weeks',56.2,'56.2%','var(--rx)'],['Alcohol, abstinence, 5 years',33.8,'33.8%','var(--rx)'],['Alcohol, abstinence, 2 years',23.4,'23.4%','var(--rx-soft)'],['Hep C, antivirals, 24 months',13,'13%','var(--rx)']];
      const bw=N?250:200;B.forEach(([l,v,lab,c],i)=>{const y=R.y+12+i*(N?40:50);s+=T(R.x,y+8,l,'t-xs','fill:var(--ink)');
        s+=`<rect x="${R.x}" y="${y+14}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${R.x}" y="${y+14}" width="${f1(bw*v/100)}" height="12" rx="6" style="fill:${c};stroke:var(--rx);stroke-width:${c==='var(--rx-soft)'?1:0}"/>`+T(R.x+bw+8,y+24,lab,'t-lbl')});
      s+=T(R.x,R.y+12+4*(N?40:50)+6,p<2?'van der Meer 2012: interferon-treated cohort':'published rates; definitions and follow-up differ','t-xs')}
    else if(aclf){const n=Math.round(33.9*ramp(t,.86,.93));
      s+=T(R.x,R.y-10,'ACLF at admission: deaths by 28 days','t-sm','fill:var(--ink)');
      s+=icons(R.x,R.y,R.d,R.s,n,n,'var(--bad)','var(--bad)');
      const bx=N?R.bx:R.x+10*R.d+14;
      s+=`<text x="${bx}" y="${R.y+(N?34:40)}" class="t-big" style="font-size:${N?30:34}px;fill:var(--bad)">${n}%</text>`+T(bx,R.y+(N?52:60),'CANONIC','t-xs');
      s+=T(bx,R.y+(N?74:90),'no ACLF: 1.9%','t-sm','fill:var(--ink)')+T(bx,R.y+(N?92:110),'worldwide,','t-sm')+T(bx,R.y+(N?106:126),'90 days: 58%','t-sm','fill:var(--ink)')}
    else{const g=CO_RUNG[ri],u=ramp(t,CO_STEPS[ri].from+.01,CO_STEPS[ri].from+.06),n=Math.round(g.m5*u*10)/10,dec=ri>=2,col=dec?'var(--accent)':'var(--brand)';
      s+=T(R.x,R.y-10,`${g.n} · deaths within 5 years, per 100`,'t-sm','fill:var(--ink)');
      s+=icons(R.x,R.y,R.d,R.s,Math.floor(n),Math.ceil(n),dec?'var(--bile)':'var(--brand)',dec?'var(--bile)':'var(--brand)');
      const bx=N?R.bx:R.x+10*R.d+14;
      s+=`<text x="${bx}" y="${R.y+(N?34:40)}" class="t-big" style="font-size:${N?30:34}px;fill:${col}">${n%1?n.toFixed(1):n}%</text>`+T(bx,R.y+(N?52:60),'5-year mortality','t-xs');
      if(g.tr!=null){const bw=N?160:76,by=R.y+(N?80:96);s+=T(bx,by,'move on','t-xs','fill:var(--ink)')+T(bx,by+12,'within 5 years','t-xs');
        s+=`<rect x="${bx}" y="${by+20}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by+20}" width="${f1(bw*g.tr/100*u)}" height="10" rx="5" style="fill:var(--accent)"/>`+T(bx,by+46,g.tr+'%','t-lbl')}
      if(g.y1){const yy=N?R.y+168:R.y+10*R.d+14;s+=T(N?R.x:R.x,yy,`4-stage review: ${g.y1}`,'t-xs')}}
    svg.innerHTML=s;
    note.innerHTML=noteHTML(Object.assign({},P,{t:P.h||P.t,txt:P.txt+(cause?(p<2?CO_CAUSE_COMP:CO_CAUSE_DEC).replace(/^<p>/,'</p><p>').replace(/<\/p>$/,''):'')}));
    setActive(p)}
  const stop=playWire(rg,$('#coPlay'),draw,24000,'%t:player.replay%','course');
  setActive=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  cb.addEventListener('click',()=>{cause=!cause;cb.setAttribute('aria-pressed',cause);draw(+rg.value)});
  draw(+rg.value);

  /* ACLF icon arrays */
  const as=$('#coAclf'),an=$('#coAclfNote');let ak='yes',shown={lo:0,hi:0},stopA=null;
  function drawA(lo,hi){const N=vb(as,'720 300','400 520'),G=CO_ACL[ak];
    const A=N?{x:20,y:44,d:20,s:16}:{x:28,y:44,d:22,s:18};let s='';
    s+=T(A.x,24,G.t+' · deaths per 100','t-sm','fill:var(--ink)');
    s+=icons(A.x,A.y,A.d,A.s,Math.round(lo),Math.round(hi),'var(--bad)','var(--bad-soft)');
    const bx=N?A.x+10*A.d+16:A.x+10*A.d+20,lab=G.lo===G.hi?f1(lo).replace(/\.0$/,'')+'%':Math.round(lo)+'–'+Math.round(hi)+'%';
    s+=`<text x="${bx}" y="${A.y+34}" class="t-big" style="font-size:${N?26:34}px;fill:var(--bad)">${lab}</text>`+T(bx,A.y+52,G.k.split(' · ')[0],'t-xs')+T(bx,A.y+65,G.k.split(' · ')[1]||'','t-xs');
    if(G.lo!==G.hi){s+=`<rect x="${bx}" y="${A.y+82}" width="12" height="12" rx="2" style="fill:var(--bad)"/>`+T(bx+18,A.y+92,'low end','t-xs')+`<rect x="${bx}" y="${A.y+100}" width="12" height="12" rx="2" style="fill:var(--bad-soft);stroke:var(--bad)"/>`+T(bx+18,A.y+110,'up to high end','t-xs')}
    /* how ACLF evolved (Gustot): always shown */
    const C=N?{x:20,y:330,w:360}:{x:300,y:178,w:390};
    s+=T(C.x,C.y,'How ACLF evolved in 388 people','t-sm','fill:var(--ink)');
    let x=C.x;[[49.2,'resolved or improved','var(--rx)'],[30.4,'steady or fluctuating','var(--bile)'],[20.4,'worsened','var(--bad)']].forEach(([v,l,c],i)=>{const w=C.w*v/100;
      s+=`<rect x="${f1(x)}" y="${C.y+10}" width="${f1(w-2)}" height="22" rx="4" style="fill:${c};opacity:.85"/>`+`<text x="${f1(x+6)}" y="${C.y+25}" style="font:700 11px var(--body);fill:var(--panel)">${v}%</text>`;
      s+=T(N?C.x:x,N?C.y+52+i*16:C.y+48+(i%2)*14,(N?v+'% ':'')+l,'t-xs');x+=w});
    s+=T(C.x,N?C.y+112:C.y+92,'81% reached their final grade within 1 week','t-xs','fill:var(--ink)');
    as.innerHTML=s;an.innerHTML=noteHTML({k:G.k,t:G.t,txt:G.txt,
      pt:ak==='g01'||ak==='g23'?'ACLF often changes over the first week, for better or worse, which is why it is reassessed day by day in hospital.':'ACLF is a medical emergency. Most people with it are cared for in hospital, often in intensive care.',
      hook:'CANONIC 28-day mortality: 33.9% with ACLF at enrolment vs 1.9% without. [[Moreau2013CANONIC]]'})}
  function pick(k){ak=k;$$('[data-acl]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.acl===k));
    if(stopA)stopA();const G=CO_ACL[k],a={...shown};
    stopA=animate(700,q=>{const e=ease(q);shown={lo:lerp(a.lo,G.lo,e),hi:lerp(a.hi,G.hi,e)};drawA(shown.lo,shown.hi)},()=>{stopA=null})}
  $$('[data-acl]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.acl)));
  shown={lo:CO_ACL.yes.lo,hi:CO_ACL.yes.hi};drawA(shown.lo,shown.hi);
  const prevR=redraws.course;redraws.course=()=>{prevR&&prevR();drawA(shown.lo,shown.hi)};
  const prevH=onHide.course;onHide.course=()=>{prevH&&prevH();if(stopA){stopA();stopA=null}};
};
