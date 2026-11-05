/* =============== 1.1 What cirrhosis is =============== */
/* Main scrubber "Who has cirrhosis?": four scenes (worldwide burden, causes, silent at first, what it costs),
   every number from research pass A. Second interactive: a 'words matter' flip set. */
const WH_STEPS=[
 {from:0,at:.2,k:'Scene 1 · worldwide',t:'Worldwide',
  txt:`In 2017 an estimated 112 million people (95% UI 107–119 million) were living with compensated cirrhosis and 10.6 million with decompensated cirrhosis. That year cirrhosis and other chronic liver diseases caused more than 1.32 million deaths, up from fewer than 899,000 in 1990: 2.4% of all deaths, against 1.9% in 1990. Two-thirds of the deaths were in men. [[GBD2020Cirrhosis]] GBD 2021 counted 1,425,142 deaths. [[Tham2025]] Death counts rose mainly because the world's population grew and aged: the age-standardised death rate actually fell, from 21.0 to 16.5 per 100,000. [[GBD2020Cirrhosis]]`,
  pt:`More than 100 million people around the world are estimated to live with early-stage cirrhosis, most of them without knowing it. [[GBD2020Cirrhosis]]`,
  hook:`GBD 2017: more than 1.32 million deaths, 2.4% of all deaths. Counts up, age-standardised rate down (21.0 → 16.5 per 100,000). [[GBD2020Cirrhosis]]`},
 {from:.25,at:.27,k:'Scene 2 · causes',t:'Causes',
  txt:`The ring shows which causes cirrhosis deaths were attributed to in 2017. In men: hepatitis B 31.5%, alcohol-related liver disease 27.3%, hepatitis C 25.5%, NASH 7.7%, other 8.0%. In women the NASH and "other" shares were higher (11.3% and 17.3%). In western sub-Saharan Africa hepatitis B caused 48.9% and hepatitis C 7.8%. NASH-related cirrhosis was the only cause whose age-standardised death rate did not fall from 1990 to 2017. [[GBD2020Cirrhosis]] By 2021, MASH accounted for 48.3 million of the 58.4 million new cases of cirrhosis and other chronic liver diseases, and was the only cause with a rising incidence rate. [[Tham2025]]`,
  pt:`Which cause leads depends on where you live and what you count. Viruses still cause the most deaths worldwide; fatty liver disease is the fastest-growing cause. [[Huang2023NRGH,Tham2025]]`,
  hook:`Hepatitis B caused the largest share of cirrhosis deaths in 2017; NASH/MASH is the fastest-growing cause. [[GBD2020Cirrhosis,Tham2025]]`},
 {from:.5,at:.72,k:'Scene 3 · silent at first',t:'Silent at first',
  txt:`How many US adults have cirrhosis depends on the yardstick. NHANES 1999–2010, using an AST-to-platelet ratio above 2 plus abnormal liver tests, found 0.27% (about 3 in 1,000). [[Scaglione2015]] NHANES 2017–2020, using liver stiffness or FIB-4, found 2.6% (about 26 in 1,000), most of them with MASLD. [[Younossi2025Prev]] Either way, most people do not know: 69% of the adults with cirrhosis in the earlier survey said they were unaware of having liver disease. [[Scaglione2015]]`,
  pt:`Most people with early cirrhosis feel well. In one US survey, about 7 in 10 did not know they had it. [[Scaglione2015]]`,
  hook:`NHANES 1999–2010: 69% of US adults with cirrhosis were unaware of liver disease. Viral hepatitis, diabetes and alcohol together had a population-attributable fraction of 53.5%. [[Scaglione2015]]`},
 {from:.78,at:.95,k:'Scene 4 · what it costs',t:'What it costs',
  txt:`From 1999 to 2016 yearly US deaths from cirrhosis rose by 65%, to 34,174, with the steepest rise (10.5% a year from 2009) in people aged 25–34, driven entirely by alcohol-related liver disease. [[Tapper2018BMJ]] The age-adjusted death rate rose from 14.9 to 21.9 per 100,000 between 2010 and 2021. [[Tapper2023JAMA]] US inpatient costs for chronic liver disease rose from $14.9 billion in 2012 to $18.8 billion in 2016. [[Hirode2020]] In the UK, incidence rose 45% over 1992–2001. [[Fleming2008UKIncidence]] Liver transplant is the second most common solid-organ transplant, yet less than 10% of global need is met. [[Asrani2019JHep]]`,
  pt:`Cirrhosis is becoming more common in many countries, including among younger adults, and it costs health systems billions. Much of it can be prevented. [[Tapper2018BMJ,Scaglione2015]]`,
  hook:`US cirrhosis deaths rose 65% from 1999 to 2016 (to 34,174 a year); the fastest rise was in ages 25–34. [[Tapper2018BMJ]]`}
];
const WH_CAPS=[
 'Each square is one million people; bars are yearly deaths, drawn to scale. GBD 2017 and GBD 2021. [[GBD2020Cirrhosis,Tham2025]]',
 'Share of cirrhosis deaths by attributed cause, 2017. For western sub-Saharan Africa the source splits out only hepatitis B and C. [[GBD2020Cirrhosis]]',
 'Each dot is one US adult; the two counts come from two surveys with different definitions. The 100 people are the earlier survey\'s adults with cirrhosis. [[Scaglione2015,Younossi2025Prev]]',
 'Bars are drawn to scale within each panel; the 1999 deaths bar is drawn from the published 65% rise. [[Tapper2018BMJ,Tapper2023JAMA,Hirode2020,Fleming2008UKIncidence]]'];
const WH_WORDS=[
 {old:'alcoholic',new:'person with alcohol use disorder',why:`A label turns a health condition into an identity. Population studies show people with alcohol dependence are held more responsible for their condition and face more social rejection and structural discrimination than people with other mental disorders. [[Schomerus2011]]`},
 {old:'alcoholic liver disease',new:'alcohol-related (alcohol-associated) liver disease',why:`AASLD guidance uses "alcohol-associated liver diseases" in place of the older term. [[Crabb2020AASLD]] It names the cause without naming the person.`},
 {old:'non-alcoholic fatty liver disease',new:'MASLD',why:`In the 2023 Delphi consensus, 61% of panellists felt "nonalcoholic" and 66% felt "fatty" were stigmatising. The new name describes the metabolic cause instead. [[Rinella2023MASLD]]`},
 {old:'a cirrhotic',new:'a person with cirrhosis',why:`89% of people with cirrhosis in one survey agreed with at least one stigma statement, and more stigma went with less care-seeking. Person-first language keeps the person in view. [[VaughnSandler2014]]`},
 {old:'drug abuser',new:'person who uses or injects drugs',why:`A review of 28 studies found negative attitudes among health professionals towards people with substance use disorders were common, and they reduced people's engagement in care. [[vanBoekel2013]]`},
 {old:'self-inflicted',new:'a liver disease with many causes',why:`Cirrhosis follows fatty liver disease, viral hepatitis, alcohol, autoimmune, cholestatic and inherited conditions; it is not caused by alcohol alone. [[Gines2021Lancet]] Blame is a barrier to care, not a medical fact. [[VaughnSandler2014]]`}];

inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),cap=$('#whCap');
  const COL={hbv:'var(--portal)',hcv:'var(--nh3)',alc:'var(--liver-fill)',nash:'var(--bile)',oth:'var(--scar-line)'};
  const CAUSE=[['hbv','Hepatitis B'],['hcv','Hepatitis C'],['alc','Alcohol-related'],['nash','NASH (MASH)'],['oth','Other']];
  const DS={m:[31.5,25.5,27.3,7.7,8.0],f:[24.0,26.7,20.6,11.3,17.3],w:[48.9,7.8,0,0,43.3]};
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const arc=(cx,cy,r0,r1,a0,a1)=>{if(a1-a0<1e-4)return '';const lg=a1-a0>Math.PI?1:0,P=(r,a)=>f1(cx+r*Math.sin(a))+' '+f1(cy-r*Math.cos(a));
    return `M${P(r1,a0)}A${r1} ${r1} 0 ${lg} 1 ${P(r1,a1)}L${P(r0,a1)}A${r0} ${r0} 0 ${lg} 0 ${P(r0,a0)}Z`};
  const pick=(()=>{const r=rng(42),s=new Set();while(s.size<26)s.add(Math.floor(r()*1000));return [...s]})();
  const fmtK=n=>Math.round(n).toLocaleString('en-US');
  let setActive=()=>{};

  function sceneWorld(t,N){const u=ramp(t,.005,.17);let s='';
    const g=N?{x:72,y:78,c:16,d:16}:{x:28,y:80,c:16,d:16};
    s+=T(g.x,g.y-12,'People living with cirrhosis, 2017','t-sm','fill:var(--ink)');
    const fill=u*122.6;
    for(let i=0;i<123;i++){const cx=g.x+(i%g.c)*g.d,cy=g.y+Math.floor(i/g.c)*g.d,dec=i>=112,on=i<fill;
      const w=i===122?14*.6:14;
      s+=`<rect x="${cx}" y="${cy}" width="14" height="14" rx="2.5" style="fill:var(--panel-2)"/>`;
      if(on)s+=`<rect x="${cx}" y="${cy}" width="${f1(w)}" height="14" rx="2.5" style="fill:${dec?'var(--bile)':'var(--brand)'}"/>`}
    const ly=g.y+8*g.d+16;
    s+=`<rect x="${g.x}" y="${ly-9}" width="11" height="11" rx="2" style="fill:var(--brand)"/>`+T(g.x+17,ly,`${Math.round(Math.min(fill,112))} million compensated`,'t-sm','fill:var(--ink)');
    s+=`<rect x="${g.x}" y="${ly+9}" width="11" height="11" rx="2" style="fill:var(--bile)"/>`+T(g.x+17,ly+18,`${f1(clamp(fill-112,0,10.6))} million decompensated`,'t-sm','fill:var(--ink)');
    s+=T(g.x,ly+36,'one square = 1 million people','t-xs');
    /* deaths bars */
    const B=N?{x0:84,dx:96,w:58,base:500,h:150,ty:330}:{x0:410,dx:100,w:64,base:300,h:176,ty:68};
    s+=T(N?40:B.x0-14,B.ty,'Deaths per year','t-sm','fill:var(--ink)')+T(N?40:B.x0-14,B.ty+14,'cirrhosis and other chronic liver diseases','t-xs');
    const D=[['1990',.899,'< 0.90 M'],['2017',1.32,'> 1.32 M'],['2021',1.425,'1.43 M']];
    s+=`<line x1="${B.x0-14}" x2="${B.x0+2*B.dx+B.w+14}" y1="${B.base}" y2="${B.base}" class="axis"/>`;
    D.forEach(([yr,v,l],i)=>{const g2=ramp(t,.03+i*.045,.1+i*.045),h=B.h*v/1.5*g2,x=B.x0+i*B.dx;
      s+=`<rect x="${x}" y="${f1(B.base-h)}" width="${B.w}" height="${f1(h)}" rx="3" style="fill:var(--liver-fill);opacity:${i===2?.75:1}"/>`;
      s+=T(x+B.w/2,B.base+15,yr,'t-sm t-mid');
      if(g2>.05)s+=T(x+B.w/2,B.base-h-7,l,'t-lbl t-mid')});
    const sx=N?40:B.x0-14,sy=N?B.base+38:B.base+38;
    if(t>.08){s+=T(sx,sy,'2.4% of all deaths in 2017 (1.9% in 1990)','t-sm','fill:var(--ink)');
      s+=T(sx,sy+16,'age-standardised death rate fell: 21.0 → 16.5 per 100,000','t-xs')}
    return s}

  function sceneCauses(t,N){let s='';
    const a=ramp(t,.29,.33),b=ramp(t,.38,.42);
    const V=DS.m.map((m,i)=>lerp(lerp(m,DS.f[i],a),DS.w[i],b));
    const who=t<.31?['Men','worldwide, 2017']:t<.40?['Women','worldwide, 2017']:['Western','sub-Saharan Africa'];
    const D=N?{cx:200,cy:182,r1:104,r0:60}:{cx:178,cy:212,r1:118,r0:68};
    const tot=V.reduce((x,y)=>x+y,0);let ang=0;
    V.forEach((v,i)=>{const a1=ang+v/tot*2*Math.PI;s+=`<path d="${arc(D.cx,D.cy,D.r0,D.r1,ang,a1)}" style="fill:${COL[CAUSE[i][0]]};stroke:var(--panel);stroke-width:2${b>.5&&i===4?';opacity:.55':''}"/>`;
      if(v>6){const m=(ang+a1)/2,rr=(D.r0+D.r1)/2;s+=`<text x="${f1(D.cx+rr*Math.sin(m))}" y="${f1(D.cy-rr*Math.cos(m)+4)}" class="t-mid" style="font:700 12px var(--body);fill:var(--panel)">${Math.round(v)}%</text>`}
      ang=a1});
    s+=T(D.cx,D.cy-6,who[0],'t-big t-mid')+T(D.cx,D.cy+11,who[1],'t-xs t-mid')+T(D.cx,D.cy+24,'cirrhosis deaths','t-xs t-mid');
    const L=N?{x:40,y:318,dy:30,bw:2.6}:{x:338,y:96,dy:40,bw:3.6};
    s+=T(L.x,L.y-22,'Share of deaths by attributed cause','t-sm','fill:var(--ink)');
    CAUSE.forEach(([k,n],i)=>{const y=L.y+i*L.dy,v=V[i],w=b>.5;
      s+=`<rect x="${L.x}" y="${y-10}" width="12" height="12" rx="2" style="fill:${COL[k]}"/>`;
      s+=T(L.x+20,y,n,'t-lbl');
      const txt=w&&(i===2||i===3)?'—':w&&i===4?'43.3% (rest, not split)':f1(v)+'%';
      s+=T(L.x+(N?320:340),y,txt,'t-sm t-end','fill:var(--ink)');
      s+=`<rect x="${L.x+20}" y="${y+5}" width="${f1(Math.max(1,v*L.bw))}" height="5" rx="2.5" style="fill:${COL[k]};opacity:.7"/>`});
    /* the fastest-growing cause */
    const my=N?498:L.y+5*L.dy+22,mx=L.x,mw=N?320:340;
    s+=T(mx,my,'New cases, 2021: MASH 48.3 of 58.4 million','t-sm','fill:var(--ink)');
    s+=`<rect x="${mx}" y="${my+8}" width="${mw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my+8}" width="${f1(mw*48.3/58.4*ramp(t,.27,.4))}" height="10" rx="5" style="fill:var(--bile)"/>`;
    s+=T(mx,my+34,'the only cause with a rising incidence rate','t-xs');
    return s}

  function sceneSilent(t,N){let s='';
    const G=N?{x:34,y:76,d:8.4,r:2.9}:{x:28,y:84,d:7.7,r:2.7};
    const a=Math.round(ramp(t,.515,.575)*3),b=Math.round(ramp(t,.6,.66)*23);
    s+=T(G.x,G.y-14,'1,000 US adults','t-sm','fill:var(--ink)');
    for(let i=0;i<1000;i++){const x=G.x+(i%40)*G.d,y=G.y+Math.floor(i/40)*G.d,k=pick.indexOf(i);
      if(k>-1&&k<a)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r+1.3)}" style="fill:var(--liver)"/>`;
      else if(k>=3&&k<3+b)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r+.9)}" style="fill:var(--panel);stroke:var(--liver-fill);stroke-width:1.8"/>`;
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r)}" style="fill:var(--scar-line);opacity:.35"/>`}
    const cy=G.y+25*G.d+12;
    s+=`<circle cx="${G.x+4}" cy="${cy-4}" r="4.5" style="fill:var(--liver)"/>`+T(G.x+14,cy,`${a} in 1,000 · blood-test definition, 1999–2010`,'t-sm','fill:var(--ink)');
    if(b>0)s+=`<circle cx="${G.x+4}" cy="${cy+14}" r="4" style="fill:var(--panel);stroke:var(--liver-fill);stroke-width:1.8"/>`+T(G.x+14,cy+18,`${3+b} in 1,000 · liver stiffness or FIB-4, 2017–2020`,'t-sm','fill:var(--ink)');
    if(b>=23)s+=T(G.x,cy+36,'about a 10-fold gap: different yardsticks, different eras','t-xs');
    /* 100 people with cirrhosis */
    const P=N?{x:24,y:398,d:17,s:14}:{x:410,y:84,d:25,s:19};
    const un=Math.round(ramp(t,.64,.745)*69);
    s+=T(P.x,P.y-14,N?'100 adults with cirrhosis, 1999–2010':'100 US adults with cirrhosis, 1999–2010','t-sm','fill:var(--ink)');
    for(let i=0;i<100;i++){const x=P.x+(i%10)*P.d+P.d/2,y=P.y+Math.floor(i/10)*P.d;s+=person(x,y,P.s,i<un?'var(--bile)':'var(--brand)')}
    const cx=N?P.x+10*P.d+20:P.x,cyy=N?P.y+30:P.y+10*P.d+24;
    s+=`<text x="${cx}" y="${cyy}" class="t-big" style="font-size:${N?34:30}px;fill:var(--accent)">${un}</text>`;
    s+=T(cx+(N?0:46),cyy+(N?20:-9),N?'did not know':'did not know they had','t-sm','fill:var(--ink)');
    s+=T(cx+(N?0:46),cyy+(N?36:4),N?'they had liver disease':'liver disease','t-sm','fill:var(--ink)');
    if(N){s+=`<rect x="${cx}" y="${cyy+56}" width="11" height="11" rx="2" style="fill:var(--brand)"/>`+T(cx+16,cyy+66,'knew','t-xs')+`<rect x="${cx}" y="${cyy+74}" width="11" height="11" rx="2" style="fill:var(--bile)"/>`+T(cx+16,cyy+84,'unaware','t-xs')}
    return s}

  function sceneCost(t,N){let s='';
    const PN=[
     {h:'US cirrhosis deaths per year',r:[['1999',34174/1.65,''],['2016',34174,'34,174 (+65%)']],max:36000},
     {h:'US age-adjusted cirrhosis deaths per 100,000',r:[['2010',14.9,'14.9'],['2021',21.9,'21.9']],max:24},
     {h:'US inpatient costs, chronic liver disease',r:[['2012',14.9,'$14.9 bn'],['2016',18.8,'$18.8 bn']],max:21},
     {h:'UK incidence per 100,000 person-years',r:[['1992',12.05,'12.05'],['2001',16.99,'16.99']],max:19}];
    PN.forEach((p,i)=>{const o=N?{x:24,y:72+i*112,w:352}:{x:i%2?372:28,y:i<2?80:212,w:320};
      const bw=o.w-128,g=ramp(t,.79+i*.03,.87+i*.03);
      s+=`<rect x="${o.x-10}" y="${o.y-22}" width="${o.w+20}" height="${N?100:118}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
      s+=T(o.x,o.y-4,p.h,'t-sm','fill:var(--ink)');
      p.r.forEach(([yr,v,l],j)=>{const y=o.y+14+j*(N?34:40),w=bw*v/p.max*g;
        s+=T(o.x,y+12,yr,'t-sm');
        s+=`<rect x="${o.x+40}" y="${y}" width="${f1(w)}" height="${N?16:18}" rx="3" style="fill:${j?'var(--liver-fill)':'var(--scar-line)'}"/>`;
        if(l&&g>.2)s+=T(o.x+46+w,y+13,l,'t-lbl')})});
    const fy=N?528:356;
    if(t>.86){if(N){s+=T(24,fy,'Liver transplant: the second most common solid-organ','t-xs')+T(24,fy+14,'transplant, yet less than 10% of global need is met','t-xs')}
      else s+=T(28,fy,'Liver transplant: the second most common solid-organ transplant, yet less than 10% of global need is met.','t-xs')}
    return s}

  function draw(t){const N=vb(svg,'720 380','400 560');const p=phaseOf(WH_STEPS,t),P=WH_STEPS[p];
    let s=T(N?24:28,N?30:30,P.t,'t-big','font-size:19px');
    s+=T(N?24:28,N?48:48,['How many people live with cirrhosis, and die of it','Which causes lie behind cirrhosis deaths','Most people with cirrhosis do not know they have it','Deaths, rates and costs are rising'][p],'t-sm');
    s+=[sceneWorld,sceneCauses,sceneSilent,sceneCost][p](t,N);
    svg.innerHTML=s;
    note.innerHTML=noteHTML(P);setActive(p);
    if(cap._p!==p){cap._p=p;cap.innerHTML=WH_CAPS[p]}}

  const stop=playWire(rg,$('#whPlay'),draw,26000,'%t:player.replay%','what');
  setActive=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* words matter: flip cards */
  const wb=$('#whWords');
  wb.innerHTML=WH_WORDS.map((w,i)=>`<button class="wcard" aria-pressed="false" data-wi="${i}" aria-label="Instead of '${w.old}', say '${w.new}'. Press to read why."><span class="in"><span class="f"><small>Instead of</small><span class="old">${w.old}</span><span class="hint">Tap to turn</span></span><span class="b"><small>Say</small><span class="new">${w.new}</span><p>${w.why}</p></span></span></button>`).join('');
  wb.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('.wcard');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true')});
};
