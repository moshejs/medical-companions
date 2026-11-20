/* =============== 4.3 Life after GBS =============== */
/* Three widgets: (1) the main player, a timeline from before the weakness to 10+ years, where each stop
   lights up one published proportion in a block of 100 figures (each stop is a different study, labelled);
   (2) the fatigue-frequency controversy as selectable bars; (3) recurrence risk on a 1000-dot grid.
   Numbers from research G, H and F (pain parts). */
const AF_NODES=[{l:'before',s:'before'},{l:'acute',s:'acute'},{l:'3 months',s:'3 mo'},{l:'1 year',s:'1 yr'},{l:'2 years',s:'2 yr'},{l:'3–6 years',s:'3–6 yr'},{l:'10+ years',s:'10+ yr'}];
const AF_STEPS=[
 {from:0,at:.04,k:'Before weakness · pain',t:'Pain can come first',sv:'Before the weakness',th:'Pain',col:'var(--rx)',v:36,big:'36%',c1:'had pain in the 2 weeks',c2:'before weakness began',src:'Netherlands, 156 people',
  txt:'In a prospective Dutch cohort of 156 people, 36% reported pain in the 2 weeks before weakness began [[Ruts2010Pain]]. In an IVIg trial sample, 55% of 223 had pain at randomisation, and for 70% of them it started before the weakness [[Ruts2007Pain]]. Pain first can delay the diagnosis, especially in young children [[Leonhard2019]].',
  pt:'Pain is common in GBS, and it can start before the weakness [[Ruts2010Pain]].',
  hook:'Pain can come before weakness: 36% reported it in the preceding 2 weeks [[Ruts2010Pain]].'},
 {from:.11,at:.18,k:'Acute phase · pain',t:'In the acute phase, most people hurt',sv:'The acute phase',th:'Pain',col:'var(--rx)',v:66,big:'66%',c1:'had pain in the',c2:'acute phase',src:'Netherlands, 156 people',
  txt:'Pain was present in the acute phase in 66% of the Dutch cohort, mostly moderate to severe, across all variants including Miller Fisher syndrome [[Ruts2010Pain]]. In Bangladesh 71% had pain at enrolment [[Papri2024Pain]]. In a Canadian series of 55, 89.1% had pain at some point and 74.5% needed opioids [[Moulin1997]]. How it is counted matters: a retrospective Chinese study found only 34.5% [[Yao2018]].',
  pt:'Pain is common and real, even when weakness is the main problem. Please say if you hurt [[Ruts2010Pain]].',
  hook:'Pain is present in about two-thirds acutely and over a third at 1 year [[Ruts2010Pain]].'},
 {from:.25,at:.32,k:'First months · mood',t:'The first months are hardest on mood',sv:'Around three months',th:'Mood',col:'var(--care)',v:53,big:'53%',c1:'had symptoms of',c2:'depression at week 13',src:'Bangladesh, 111 people',
  txt:'In a Bangladeshi cohort (111 analysed), depression was found in 53% at week 13 and 41% at week 26, and anxiety in 45% and 36% [[Papri2026Mood]]. In Danish population data the hazard of depression was highest in the first 3 months, 20.5 times that of the general population [[Levison2023Depression]]. At admission the most stressful things were fear of staying paralysed, uncertainty and fear of intubation [[Sharshar2012]].',
  pt:'Low mood and worry are common, especially in the first months. Asking for help with them is part of recovery [[Levison2023Depression,Leonhard2019]].',
  hook:'Depression risk is highest in the first 3 months and normalises after 2 years in Danish data [[Levison2023Depression]].'},
 {from:.39,at:.46,k:'1 year · pain',t:'At one year, pain is still common',sv:'One year after onset',th:'Pain',col:'var(--rx)',v:38,big:'38%',c1:'still had pain',c2:'at 1 year',src:'Netherlands, 156 people',
  txt:'At 1 year, 38% of the Dutch cohort still had pain, mostly moderate to severe [[Ruts2010Pain]]; the guideline review notes severe pain at 1 year in at least a third, sometimes lasting more than 10 years [[Leonhard2019]]. In Bangladesh pain fell from 71% to 38% at week 13 and 26% at week 26 [[Papri2024Pain]]. Pain intensity at admission did not predict outcome [[Moulin1997]].',
  pt:'For many people pain fades over the first year, but for about a third it is still there at a year. Medicines may help, though the research is small [[Ruts2010Pain,vanDoorn2023]].',
  hook:'Methylprednisolone did not reduce pain in GBS [[Ruts2007Pain,Liu2015]].'},
 {from:.53,at:.6,k:'2 years · work',t:'Two years: back to work, mostly',sv:'Two years after onset',th:'Work',col:'var(--accent)',v:17,big:'17%',c1:'of those who had worked',c2:'still could not work',src:'Sweden, 42 adults',
  txt:'In the Swedish cohort, everyone who had been working was unable to work at 2 weeks, and 17% were still unable to work at 2 years [[Forsberg2005Disability]]. At 2 years, 26% still depended on informal help [[Forsberg2006Burden]]. In Danish data, depression risk after 2 years matched that of the general population (HR 0.8) [[Levison2023Depression]].',
  pt:'By two years most people who worked before are working again, though some need help at home for longer [[Forsberg2005Disability,Forsberg2006Burden]].',
  hook:'All Swedish people working before GBS were off work at 2 weeks; 17% were still unable to work at 2 years [[Forsberg2005Disability]].'},
 {from:.67,at:.74,k:'3 to 6 years · daily life',t:'Years on, life has often changed',sv:'Three to six years after onset',th:'Daily life',col:'var(--accent)',v:63,big:'63%',c1:'reported a change in work,',c2:'leisure, home or partner',src:'Netherlands, 122 people',
  txt:'Of 122 people from the Dutch trial, 63% reported one or more changes in lifestyle, work, leisure or their partner\'s life, including people who had physically recovered [[Bernsen1999Daily]]. 38% of those with jobs had to change them [[Bernsen2002Work]]. Muscle aches and cramps persisted in 48%, linked to sensory loss rather than weakness [[Bernsen2001]].',
  pt:'Even after the body has largely recovered, many people find their work, hobbies or family life have changed [[Bernsen1999Daily,Bernsen2002Work]].',
  hook:'Psychosocial function can be impaired even with no or mild residual signs at 3 to 6 years [[Bernsen1997Health]].'},
 {from:.81,at:.9,k:'10 years and more · fatigue and pain',t:'A decade on: tiredness and pain for many',sv:'Ten years and more',th:'Fatigue and pain',col:'var(--weak)',v:70,big:'about 70%',c1:'reported pain or',c2:'severe fatigue',src:'Dutch patient society, 245 people',
  txt:'In questionnaires from 245 members of the Dutch patient society at a median of 10 years (70% responded), about 70% reported pain or severe fatigue, with lower quality of life [[Kuitwaard2009JPNS]]. People who join a patient society may not be typical. More than 20 years after GBS, 10 of 24 people reported severe fatigue [[Drory2012]], and at 10 years 52% of a Swedish cohort had limits in walking [[Forsberg2012Decade]].',
  pt:'Tiredness and pain can last for many years, even after a good recovery. That is not imagined, and it is worth raising with your care team [[Kuitwaard2009JPNS,Leonhard2019]].',
  hook:'Fatigue unrelated to motor deficits is reported in 60 to 80% and is often among the most disabling complaints [[Leonhard2019]].'}];
const AF_FOOT='One study per stop, scaled to 100 people: not one cohort, not a forecast.';
/* fatigue studies */
const AF_FAT=[
 {k:'merkies',l:'Merkies 1999',v:80,lab:'80%',
  cap:'<b>Merkies 1999:</b> severe fatigue in 80% of 113 people with past GBS, CIDP or MGUS neuropathy, including 81 to 86% of those with normal strength or sensation. A mixed clinic group, not GBS alone [[Merkies1999]].'},
 {k:'garssen',l:'Garssen 2006',v:60,lab:'60%',
  cap:'<b>Garssen 2006:</b> severe fatigue (mean Fatigue Severity Scale 5.0 or more) in 60% of 100 people after GBS, more often in women and people over 50, with no relation to disability at nadir, the preceding infection or time since GBS [[Garssen2006Fatigue]].'},
 {k:'zul',l:'Zuluaga 2025, pooled',v:32,lab:'32%',
  cap:'<b>Zuluaga 2025:</b> a meta-analysis of 12 studies (1498 people) pooled a frequency of 32% (95% CI 22 to 44%), with very high heterogeneity (I squared 93%): 39% in high-income and 8% in low-to-middle-income countries [[Zuluaga2025]].'},
 {k:'zul',l:'  high-income',v:39,lab:'39%',sub:1},
 {k:'zul',l:'  lower-income',v:8,lab:'8%',sub:1},
 {k:'witsch',l:'Witsch 2013',v:30.4,lab:'30.4%',
  cap:'<b>Witsch 2013:</b> severe fatigue in 30.4% of 110 people who had needed ventilation, at a mean of 52.6 months [[Witsch2013]].'},
 {k:'drory',l:'Drory 2012',v:100*10/24,lab:'10 of 24',
  cap:'<b>Drory 2012:</b> more than 20 years after GBS, 10 of 24 people reported severe fatigue (Fatigue Severity Scale above 5) [[Drory2012]].'}];
const AF_BAND='guideline review: 60 to 80%';
const AF_FATNOTE='Definitions, selection and settings differ between studies.';
/* recurrence */
const AF_REC={
 gbs:{lo:20,hi:50,big:'2 to 5 in 100',l1:'people with GBS',l2:'have it again',
  cap:'Recurrent GBS affects 2 to 5% of people with GBS: rare, but higher than the 0.1% lifetime risk in the general population [[Leonhard2019]]. Recurrences were defined as at least 2 months apart after full recovery, or 4 months after partial recovery [[Kuitwaard2009JNNP]]. The lighter dots show the spread between 2% and 5%.'},
 cal:{lo:11,hi:11,big:'11 in 1000',l1:'in a Californian cohort',l2:'of 550 people',
  cap:'In a Californian cohort of 550 people followed through 2008, 1.1% had a second diagnosis of GBS, none within 2 months of a vaccine [[Baxter2012]].'},
 pop:{lo:1,hi:1,big:'1 in 1000',l1:'lifetime risk of GBS',l2:'in the general population',
  cap:'The guideline review puts the lifetime risk of GBS in the general population at 0.1% [[Leonhard2019]]. One dot in a thousand.'}};
const AF_RKEY={solid:'counted',light:'range',base:'one person in 1000'};

/* pain over the first year: month of each published point (before weakness drawn at -0.5) */
const AF_PAIN=[
 {k:'nl',l:'Netherlands',pts:[ [-.5,36,'b'],[.5,66,'l'],[12,38,'bl'] ],col:'var(--rx)',dash:''},
 {k:'bd',l:'Bangladesh',pts:[ [.5,71,'a'],[3,38,'a'],[6,26,'a'] ],col:'var(--accent)',dash:'7 4'}];
const AF_PAX=[{m:-.5,l:'before',a:'t-end'},{m:.5,l:'onset',a:''},{m:3,l:'3 mo'},{m:6,l:'6 mo'},{m:12,l:'1 yr'}];
const AF_PY='with pain';
const AF_PLO={b:[0,18,'t-mid'],l:[-9,4,'t-end'],a:[0,-10,'t-mid'],bl:[-6,18,'t-end']};
inits.after=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. main player ---------- */
  const svg=$('#afSvg'),rg=$('#afT'),note=$('#afNote');let setSt=()=>{};
  function afPos(t){const A=AF_STEPS.map(s=>s.at);if(t<=A[0])return 0;for(let i=0;i<A.length-1;i++)if(t<=A[i+1])return i+(t-A[i])/(A[i+1]-A[i]);return A.length-1}
  function afVal(t,p){const S=AF_STEPS[p];if(p===0)return S.v;return lerp(AF_STEPS[p-1].v,S.v,ease(ramp(t,S.from,S.at)))}
  function draw(t){
    const N=vb(svg,'720 400','400 606');
    const L=N?{tx:16,ty:26,chx:16,chy:38,ax0:28,ax1:372,ay:126,gx:95,gy:172,bx:16,by:446,foot:594}
             :{tx:20,ty:30,chx:0,chy:12,ax0:44,ax1:676,ay:100,gx:40,gy:140,bx:300,by:210,foot:390};
    const p=phaseOf(AF_STEPS,t),S=AF_STEPS[p],pos=afPos(t),n=AF_NODES.length,X=i=>lerp(L.ax0,L.ax1,i/(n-1));
    let s=T(L.tx,L.ty,S.sv,'t-big','font-size:18px');
    /* theme chip: words, not colour */
    const cw=Math.max(70,S.th.length*7.4+26),chx=N?L.chx:700-cw;
    s+=`<rect x="${f1(chx)}" y="${L.chy}" width="${f1(cw)}" height="24" rx="12" style="fill:var(--panel-2);stroke:${S.col};stroke-width:1.6"/>`+T(chx+cw/2,L.chy+16,S.th,'t-sm t-mid',INK);
    /* the road */
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const px=lerp(L.ax0,L.ax1,pos/(n-1));
    s+=`<line x1="${L.ax0}" x2="${f1(px)}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--rec);stroke-width:4;stroke-linecap:round"/>`;
    AF_NODES.forEach((a,i)=>{const done=i<=pos+.01;s+=`<circle cx="${f1(X(i))}" cy="${L.ay}" r="${i===p?6.5:4.5}" style="fill:${done?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`+T(X(i),L.ay+20,N?a.s:a.l,'t-xs t-mid',i===p?INK:'')});
    const bob=RM?0:Math.abs(Math.sin(t*90))*2.5;
    s+=person(px,L.ay-34-bob,24,'var(--ink)');
    /* block of 100 */
    const k=Math.round(afVal(t,p));
    for(let i=0;i<100;i++){const cx=L.gx+(i%10)*21+8,cy=L.gy+Math.floor(i/10)*23;s+=person(cx,cy,16,i<k?S.col:'var(--line)',{op:i<k?1:.9})}
    /* the figure */
    s+=T(L.bx,L.by,S.big,'t-big',`font-size:${N?40:46}px;fill:var(--ink)`)+T(L.bx,L.by+28,S.c1,'t-lbl')+T(L.bx,L.by+46,S.c2,'t-lbl')+T(L.bx,L.by+70,S.src,'t-xs');
    s+=`<rect x="${L.bx}" y="${L.by+84}" width="14" height="14" rx="3" style="fill:${S.col}"/>`+T(L.bx+20,L.by+95,'figure with the problem, scaled to 100','t-xs');
    s+=T(L.tx,L.foot,AF_FOOT,'t-xs');
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#afPlay'),draw,21000,'%t:player.replay%','after');
  setSt=stepWire($('#afSteps'),AF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. fatigue studies ---------- */
  const fs=$('#afFatSvg'),fc=$('#afFatCap');let sel='garssen',glow=1,stopF=null;
  function drawF(g){
    const N=vb(fs,'720 312','400 392');
    const L=N?{lx:16,bx:16,bw:300,y0:54,rh:42,lab:0}:{lx:20,bx:220,bw:400,y0:48,rh:33,lab:1};
    const X=v=>L.bx+L.bw*v/100;
    let s=T(L.lx,22,'Share of people with fatigue, by study','t-sm',INK);
    /* guideline band */
    const top=L.y0-12,bot=L.y0+AF_FAT.length*L.rh-8;
    s+=`<rect x="${f1(X(60))}" y="${top}" width="${f1(X(80)-X(60))}" height="${bot-top}" style="fill:var(--warn-soft)"/>`+T((X(60)+X(80))/2,top-4,AF_BAND,'t-xs t-mid','fill:var(--warn);font-weight:700');
    [0,50,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top}" y2="${bot}" class="grid"/>`+T(X(v),bot+13,v+'%','t-xs t-mid')});
    AF_FAT.forEach((r,i)=>{const y=L.y0+i*L.rh,on=r.k===sel,w=L.bw*r.v/100;
      const ly=L.lab?y+12:y,by=L.lab?y:y+9;
      s+=`<g data-aff="${r.k}">`;
      s+=T(L.lx,ly,r.l.trim(),r.sub?'t-xs':'t-sm',on?INK:'fill:var(--ink)');
      if(on)s+=`<rect x="${L.bx-3}" y="${by-3}" width="${f1(w+6)}" height="22" rx="6" style="fill:none;stroke:var(--ink);stroke-width:${f1(1+1.5*g)};opacity:${f1(.4+.6*g)}"/>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(w)}" height="16" rx="4" style="fill:${r.sub?'var(--weak)':'var(--brand)'};opacity:${on?1:.55}"/>`;
      s+=T(L.bx+w+8,by+13,r.lab,'t-lbl')+'</g>'});
    s+=T(L.lx,N?384:306,AF_FATNOTE,'t-xs');
    fs.innerHTML=s}
  function setF(k,anim){sel=k;$$('button[data-aff]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.aff===k));fc.innerHTML=AF_FAT.find(r=>r.k===k&&r.cap).cap;
    if(stopF)stopF();if(!anim){glow=1;drawF(1);return}stopF=animate(600,q=>{glow=q;drawF(q)},()=>{glow=1;stopF=null})}
  $$('button[data-aff]').forEach(b=>b.addEventListener('click',()=>setF(b.dataset.aff,true)));
  fs.addEventListener('click',e=>{const g=e.target.closest('[data-aff]');if(g)setF(g.dataset.aff,true)});
  setF('garssen',false);

  /* ---------- 3. recurrence on 1000 dots ---------- */
  const rs=$('#afRecSvg'),rc=$('#afRecCap');let rk='gbs',rf=1,stopR=null;
  function drawR(f){
    const N=vb(rs,'720 260','400 372'),R=AF_REC[rk];
    const L=N?{gx:22,gy:24,d:9,tx:16,ty:276}:{gx:24,gy:24,d:9,tx:420,ty:84};
    let s='';const lo=Math.round(R.lo*f),hi=Math.round(R.hi*f);
    for(let i=0;i<1000;i++){const cx=L.gx+(i%40)*L.d,cy=L.gy+Math.floor(i/40)*L.d,c=i<lo?'var(--rx)':i<hi?'var(--rx)':'var(--line)',op=i<lo?1:i<hi?.4:1;
      s+=`<circle cx="${cx}" cy="${cy}" r="${i<hi?3.4:2.4}" style="fill:${c};opacity:${op}"/>`}
    s+=T(L.tx,L.ty,R.big,'t-big',`font-size:${N?30:34}px;fill:var(--ink)`)+T(L.tx,L.ty+26,R.l1,'t-lbl')+T(L.tx,L.ty+44,R.l2,'t-lbl');
    const ky=L.ty+(N?68:80);
    s+=`<circle cx="${L.tx+5}" cy="${ky-4}" r="3.4" style="fill:var(--rx)"/>`+T(L.tx+14,ky,AF_RKEY.solid,'t-xs');
    if(R.hi>R.lo)s+=`<circle cx="${L.tx+85}" cy="${ky-4}" r="3.4" style="fill:var(--rx);opacity:.4"/>`+T(L.tx+94,ky,AF_RKEY.light,'t-xs');
    s+=`<circle cx="${L.tx+5}" cy="${ky+14}" r="2.4" style="fill:var(--line)"/>`+T(L.tx+14,ky+18,AF_RKEY.base,'t-xs');
    rs.innerHTML=s}
  function setR(k,anim){rk=k;$$('[data-afr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.afr===k));rc.innerHTML=AF_REC[k].cap;
    if(stopR)stopR();if(!anim){rf=1;drawR(1);return}stopR=animate(900,q=>{rf=q;drawR(q)},()=>{rf=1;stopR=null})}
  $$('[data-afr]').forEach(b=>b.addEventListener('click',()=>setR(b.dataset.afr,true)));
  setR('gbs',false);

  /* ---------- 4. pain over the first year ---------- */
  const ps=$('#afPainSvg'),pr=$('#afPainT');const pOn=new Set(['nl','bd']);
  function drawP(t){
    const N=vb(ps,'720 270','400 300');
    const L=N?{x:44,y:30,w:330,h:200}:{x:60,y:30,w:560,h:180};
    const X=m=>L.x+L.w*(m+1)/13,Y=v=>L.y+L.h*(1-v/100),mNow=lerp(-1,12,t);
    let s=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.x-6,Y(v)+3,v+'%','t-xs t-end')});
    s+=T(L.x,L.y-10,AF_PY,'t-xs');
    AF_PAX.forEach(a=>{s+=`<line x1="${f1(X(a.m))}" x2="${f1(X(a.m))}" y1="${L.y+L.h}" y2="${L.y+L.h+5}" class="axis"/>`+T(X(a.m)+(a.a==='t-end'?4:a.a===''?-4:0),L.y+L.h+18,a.l,'t-xs '+(a.a===undefined?'t-mid':a.a))});
    AF_PAIN.forEach(C=>{if(!pOn.has(C.k))return;const P=C.pts;let d='';
      for(let i=0;i<P.length;i++){if(P[i][0]>mNow){if(i>0){const a=P[i-1],b=P[i],q=(mNow-a[0])/(b[0]-a[0]);d+='L'+f1(X(mNow))+' '+f1(Y(lerp(a[1],b[1],q)))}break}d+=(i?'L':'M')+f1(X(P[i][0]))+' '+f1(Y(P[i][1]))}
      if(d)s+=`<path d="${d}" style="fill:none;stroke:${C.col};stroke-width:2.8;stroke-linejoin:round${C.dash?';stroke-dasharray:'+C.dash:''}"/>`;
      P.forEach(q=>{if(q[0]>mNow+.01)return;const px=X(q[0]),py=Y(q[1]),o=AF_PLO[q[2]];
        s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4.5" style="fill:${C.col};stroke:var(--panel);stroke-width:1.6"/>`+T(px+o[0],py+o[1],q[1]+'%','t-sm '+o[2],'fill:var(--ink)')})});
    s+=`<line x1="${f1(X(mNow))}" x2="${f1(X(mNow))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
    const ly=L.y+L.h+(N?44:42);let lx=L.x;
    AF_PAIN.forEach(C=>{s+=`<line x1="${lx}" x2="${lx+24}" y1="${ly-4}" y2="${ly-4}" style="stroke:${C.col};stroke-width:3${C.dash?';stroke-dasharray:'+C.dash:''};opacity:${pOn.has(C.k)?1:.3}"/>`+T(lx+30,ly,C.l,'t-sm','fill:var(--ink)');lx+=150});
    ps.innerHTML=s}
  playWire(pr,$('#afPainPlay'),drawP,7000,'%t:player.replay%','after');
  $$('[data-afp]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.afp;pOn.has(k)?pOn.delete(k):pOn.add(k);b.setAttribute('aria-pressed',pOn.has(k));drawP(+pr.value)}));
  drawP(+pr.value);
  const prev=redraws.after;redraws.after=()=>{prev&&prev();drawF(glow);drawR(rf);drawP(+pr.value)};
};
