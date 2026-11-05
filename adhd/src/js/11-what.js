/* =============== 1.1 What ADHD is =============== */
/* WH: one stage in three phases (how common, who is diagnosed, how long it lasts), then a US
   comparator of diagnosis and treatment. Every number is a population statistic from the cited study. */
const WH_STEPS=[
 {from:0,at:.12,k:'How common · worldwide',t:'About 5 in 100 children',
  txt:`Polanczyk and colleagues searched MEDLINE and PsycINFO from 1978 to 2005, read 303 full texts and pooled 102 studies with 171,756 participants aged 18 or under, from every world region. The pooled prevalence was 5.29% (95% CI 5.01–5.56). [[Polanczyk2007,Posner2020]]`,
  pt:`ADHD is common. About 5 in every 100 children and teenagers around the world meet the criteria for it. [[Polanczyk2007]]`,
  hook:`Worldwide pooled childhood prevalence (Polanczyk 2007): 5.29%. [[Polanczyk2007]]`,
  adult:{t:'About 3 to 7 in 100 adults',
   txt:`Song 2021 age-standardised adult studies to the 2020 world population. Persistent adult ADHD (with childhood onset) was 2.58% (95% CI 1.51–4.45), about 139.84 million adults; symptomatic adult ADHD (whatever the childhood history) was 6.76% (95% CI 4.31–10.61), about 366.33 million. Prevalence falls with age: persistent ADHD went from 5.05% at 18–24 years to 0.77% at 60 and over. [[Song2021]]`,
   pt:`Many adults have ADHD too. Worldwide, between about 3 and 7 adults in 100 have it, depending on how it is counted. [[Song2021]]`,
   hook:`Song 2021: persistent adult ADHD 2.58%, symptomatic adult ADHD 6.76%. [[Song2021]]`}},
 {from:.2,at:.29,k:'How common · method',t:'Why the estimates differ',
  txt:`Pooled childhood estimates run from 3.4% in strict community interviews to 7.2% and 8.0% in broader reviews. In the 2014 update (135 studies in the model), the diagnostic criteria, the impairment requirement and the source of information explained the differences; geographic location and year of study did not. After controlling for the diagnostic algorithm, Willcutt found no difference between countries or regions. [[Polanczyk2015,Thomas2015,Ayano2023Children,Polanczyk2014,Willcutt2012]]`,
  pt:`The number depends on how a study counts. Asking for problems in daily life, and asking more than one person, finds fewer cases. ADHD is found in every part of the world that has been studied. [[Polanczyk2007,Willcutt2012]]`,
  hook:`Variation in prevalence is explained mainly by methods (criteria, informant, impairment requirement), not by geography or year. [[Polanczyk2014]]`,
  adult:{t:'Why adult estimates differ',
   txt:`The WHO World Mental Health surveys (20 surveys, 26,744 respondents) found current adult ADHD averaging 2.8%: 3.6% in high-income, 3.0% in upper-middle-income and 1.4% in low or lower-middle-income countries. Song 2021 found the opposite pattern for persistent ADHD (8.00% in low- and middle-income versus 3.25% in high-income countries), and the difference is unresolved. In older adults the figure depends on what is counted: 2.18% on symptom scales, 0.23% by clinical diagnosis, 0.09% in treatment records. [[Fayyad2017,Song2021,Dobrosavljevic2020]]`,
   pt:`Adult numbers depend a lot on the method. Many adults with ADHD have never been diagnosed, so records find far fewer than surveys do. [[Dobrosavljevic2020,Kooij2019]]`,
   hook:`WHO surveys: current adult ADHD 2.8% on average. [[Fayyad2017]]`}},
 {from:.36,at:.52,k:'Who is diagnosed',t:'Boys referred, girls missed',
  txt:`In children referred to a psychiatric clinic the male-to-female ratio was about 10:1, against about 3:1 in community samples. Reported referral ratios range from 3:1 to 16:1, so many girls with ADHD are likely to stay unidentified. Parent and teacher ratings in youth give about 2:1. By adulthood the ratio is much closer to equal: of US adults with current ADHD in 2023, 55.8% were men and 44.2% women. [[Biederman2002Gender,Young2020Females,Faraone2021,Hinshaw2022,Staley2024]]`,
  pt:`Girls with ADHD are often quiet daydreamers rather than disruptive, so their ADHD can be missed. [[Hinshaw2022,Quinn2014]]`,
  hook:`Male:female ratio about 10:1 in clinic-referred children versus about 3:1 in the community. [[Biederman2002Gender]]`},
 {from:.62,at:.8,k:'Over the lifespan',t:'Does it last into adulthood?',
  txt:`In a meta-analysis of controlled follow-up studies, about 15% of children with ADHD still met full criteria at age 25, but about 65% did when ADHD in partial remission (fewer symptoms, still impairing) was counted. Two birth cohorts give similar full-syndrome figures at 18: 21.9% in the UK E-Risk twins and 17.2% in Pelotas, Brazil. Reported remission depends mainly on the definition used. [[Faraone2006,AgnewBlais2016,Caye2016,Biederman2000Decline]]`,
  pt:`Being very active and restless often gets milder with age. Trouble paying attention usually lasts longer. [[Biederman2000Decline,Faraone2021]]`,
  hook:`Persistence at 25: about 15% full syndrome, about 65% including partial remission. [[Faraone2006]]`},
 {from:.86,at:.97,k:'Over the lifespan',t:'Symptoms come and go',
  txt:`The MTA followed 558 children with eight assessments to a mean age of 25. About 30% had full remission at some point, but 60% of them later had a recurrence. By the end, 9.1% showed sustained recovery, 10.8% stable persistence and 63.8% a fluctuating course; 90% still had residual symptoms as young adults. People with a fluctuating course averaged 3.58 swings over 16 years. [[Sibley2022,Sibley2024]]`,
  pt:`For many people, ADHD symptoms come and go over the years. Good stretches and harder stretches are both normal, and coming back for help when things get harder is expected. [[Sibley2022,Sibley2024]]`,
  hook:`MTA: 63.8% fluctuating course; only 9.1% sustained recovery. [[Sibley2022]]`}
];
/* the estimate strips under the icon array (value %, short label) */
const WH_EST={kids:[['1.78','GBD 2021 · modelled, under 20','var(--muted)'],['3.4','Polanczyk 2015 · strict interviews','var(--dz)'],['5.29','Polanczyk 2007 · 102 studies','var(--dz)'],['7.2','Thomas 2015 · 175 studies','var(--dz)'],['8.0','Ayano 2023 · umbrella review','var(--dz)']],
 adults:[['1.4','WHO surveys · lower-income','var(--muted)'],['2.8','WHO surveys · 20 surveys','var(--dz)'],['3.6','WHO surveys · high-income','var(--dz)'],['4.4','NCS-R · US adults 18–44','var(--dz)'],['6.76','Song 2021 · symptomatic','var(--da)']]};
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote');let pop='kids';
  const T=(x,y,c,s,st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  /* ---- phase A: icon array ---- */
  function phA(N,t){const kids=pop==='kids',L=N?{ax:60,ay:62,gs:17,dx:28,dy:23,nx:20,ny:332,est:[20,452,380,28]}:{ax:28,ay:66,gs:20,dx:25,dy:27.5,nx:322,ny:100,est:[322,212,700,30]};
    const grow=ease(ramp(t,.02,.17)),A=kids?5.29:6.76,B=kids?5.29:2.58,n=A*grow;let s='';
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),x=L.ax+c*L.dx+L.gs*.3,y=L.ay+r*L.dy;
      const on=i<Math.floor(n)?1:(i<n?n-Math.floor(n):0),core=i<B;
      s+=person(x,y,L.gs,'var(--line)');
      if(on>0)s+=person(x,y,L.gs,core?'var(--dz)':'var(--da)',{op:f1(Math.max(.25,on))})}
    const shown=(n).toFixed(2);
    s+=`<text x="${L.nx}" y="${L.ny}" style="font:700 ${N?30:44}px var(--display);fill:var(--dz)">${shown}%</text>`;
    const lines=kids?['of children and adolescents','worldwide meet ADHD criteria','Pooled meta-analysis, 102 studies,','171,756 people aged ≤18, 1978–2005']
      :['of adults have symptomatic ADHD;','2.58% have persistent ADHD','Meta-analysis, age-standardised to','the 2020 world population (Song 2021)'];
    lines.forEach((l,k)=>{s+=T(L.nx,L.ny+(N?20:24)+k*(N?14:16),k<2?(N?'t-sm':'t-lbl'):'t-xs',l,k<2&&!N?'':'')});
    if(!kids){const ly=L.ny+(N?20:24)+4*(N?14:16)+6;s+=person(L.nx+6,ly,12,'var(--dz)')+T(L.nx+16,ly+10,'t-xs','persistent')+person(L.nx+90,ly,12,'var(--da)')+T(L.nx+100,ly+10,'t-xs','other symptomatic')}
    /* strip of published estimates */
    const sp=ramp(t,.17,.3),[ex,ey,ex1,rowH]=L.est,E=WH_EST[pop],X=v=>ex+v/10*(ex1-ex);
    if(sp>0){s+=`<g style="opacity:${f1(sp)}">`+T(ex,ey-8,'t-sm',kids?'PUBLISHED ESTIMATES, CHILDREN (%)':'PUBLISHED ESTIMATES, ADULTS (%)');
      [0,2,4,6,8,10].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ey}" y2="${ey+rowH*E.length}" class="grid"/>`+T(X(v),ey+rowH*E.length+12,'t-xs t-mid',v)});
      E.forEach(([vs,lab,c],k)=>{const v=+vs;const y=ey+k*rowH,w=ramp(sp,k/E.length*.6,k/E.length*.6+.4);
        s+=T(ex,y+11,'t-xs',lab,'fill:var(--ink)')+`<rect x="${ex}" y="${f1(y+15)}" width="${f1((X(v)-ex)*w)}" height="7" rx="3.5" style="fill:${c};opacity:.85"/>`+(w>.95?T(X(v)+5,y+22,'t-xs',vs+'%','fill:var(--ink);font-weight:700'):'')});
      s+='</g>'}
    return s}
  /* ---- phase B: paired glyph columns by setting ---- */
  function phB(N,t){const g=ease(ramp(t,.38,.5)),gap=ramp(t,.48,.56);let s='';
    const SET=[['Referred to clinics','children',10,1,'≈ 10 : 1'],['Community samples','children',3,1,'≈ 3 : 1'],['US adults with ADHD','2023 survey',55.8,44.2,'55.8% : 44.2%']];
    const L=N?{cx:[72,200,328],pd:21,gs:15,dy:19,base:480,lab:502}:{cx:[130,360,590],pd:30,gs:18,dy:20,base:338,lab:358};
    SET.forEach(([a,b,m,f,r],k)=>{const cx=L.cx[k],nm=12*m/(m+f),nf=12*f/(m+f);
      const col=(x,n,c)=>{let o='';for(let i=0;i<Math.ceil(n*g-1e-6);i++){const fr=Math.min(1,n*g-i);o+=person(x,L.base-(i+1)*L.dy,L.gs,c,{op:f1(Math.max(.3,fr))})}return o};
      s+=col(cx-L.pd,nm,'var(--dx)')+col(cx+L.pd,nf,'var(--dz)');
      if(k===0&&gap>0){/* girls you would expect in clinics if referral followed the community ratio */
        const want=nm/3,have=nf;for(let i=Math.ceil(have);i<Math.ceil(want);i++){const y=L.base-(i+1)*L.dy;
          s+=`<g style="opacity:${f1(gap)}"><circle cx="${f1(cx+L.pd)}" cy="${f1(y+L.gs*.17)}" r="${f1(L.gs*.17)}" style="fill:none;stroke:var(--dz);stroke-width:1.2;stroke-dasharray:2 2"/><path d="M${f1(cx+L.pd-L.gs*.26)} ${f1(y+L.gs)}V${f1(y+L.gs*.6)}Q${f1(cx+L.pd-L.gs*.26)} ${f1(y+L.gs*.4)} ${f1(cx+L.pd)} ${f1(y+L.gs*.4)}Q${f1(cx+L.pd+L.gs*.26)} ${f1(y+L.gs*.4)} ${f1(cx+L.pd+L.gs*.26)} ${f1(y+L.gs*.6)}V${f1(y+L.gs)}Z" style="fill:none;stroke:var(--dz);stroke-width:1.2;stroke-dasharray:2 2"/></g>`}
        const ty=L.base-Math.ceil(want)*L.dy-10;s+=`<g style="opacity:${f1(gap)}">`+T(cx+L.pd-8,ty-12,'t-xs','girls missing','fill:var(--dz);font-weight:700')+(N?'':T(cx+L.pd-8,ty,'t-xs','vs community ratio','fill:var(--dz)'))+'</g>'}
      s+=`<line x1="${cx-L.pd-16}" x2="${cx+L.pd+16}" y1="${L.base+2}" y2="${L.base+2}" class="axis"/>`;
      s+=T(cx,L.lab,'t-lbl t-mid',a,N?'font-size:11px':'')+T(cx,L.lab+(N?13:15),'t-xs t-mid',b)+T(cx,L.lab+(N?28:32),'t-mid',r,`font:700 ${N?13:15}px var(--display);fill:var(--ink);opacity:${f1(g)}`)});
    const ly=N?92:72;s+=person(N?22:30,ly-12,13,'var(--dx)')+T(N?34:44,ly,'t-xs','boys / men')+person(N?110:130,ly-12,13,'var(--dz)')+T(N?122:144,ly,'t-xs','girls / women')+(gap>0?`<g style="opacity:${f1(gap)}"><circle cx="${N?212:254}" cy="${ly-4}" r="4" style="fill:none;stroke:var(--dz);stroke-dasharray:2 2"/>`+T(N?220:262,ly,'t-xs',N?'schematic':'schematic arithmetic, not a count')+'</g>':'');
    s+=T(N?20:30,ly+(N?16:18),'t-xs','Each column is scaled to 12 people with ADHD in that setting.');
    return s}
  /* ---- phase C: persistence curves on axes ---- */
  const FULL=[[8,100],[10,86],[12,70],[14,52],[16,36],[18,24],[21,18],[25,15],[30,13]],PART=[[8,100],[10,97],[12,92],[14,86],[16,80],[18,75],[21,70],[25,65],[30,62]];
  function phC(N,t){const L=N?{x:52,y:96,w:322,h:250}:{x:66,y:78,w:400,h:252},age=lerp(8,30,ease(ramp(t,.64,.84)));let s='';
    const ax=axes(L.x,L.y,L.w,L.h,{x0:6,x1:30,y0:0,y1:100,xt:[6,10,14,18,22,26,30],yt:[0,25,50,75,100],fy:v=>v+'%',xl:'age (years)',yl:'still meeting criteria (%)'});s+=ax.svg;
    const X=ax.X,Y=ax.Y;
    /* the band between the curves: partial remission */
    const up=PART.filter(p=>p[0]<=age),dn=FULL.filter(p=>p[0]<=age);
    if(up.length>1){const d=up.map((p,i)=>(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))).join('')+dn.slice().reverse().map(p=>'L'+f1(X(p[0]))+' '+f1(Y(p[1]))).join('')+'Z';s+=`<path d="${d}" style="fill:var(--da);opacity:.16"/>`}
    s+=trace(PART,X,Y,{c:'var(--da)',w:2.6,upto:age})+trace(FULL,X,Y,{c:'var(--dz)',w:2.6,upto:age});
    const dot=(a,v,c,lab,dx=8,anc='')=>{if(age<a)return '';return `<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="5.5" style="fill:var(--panel);stroke:${c};stroke-width:2.2"/>`+T(X(a)+dx,Y(v)+4,'t-xs'+anc,lab,'fill:var(--ink)')};
    s+=dot(25,65,'var(--da)','65%',8)+dot(25,15,'var(--dz)','15%',8)+dot(18,21.9,'var(--muted)','E-Risk 21.9%',-8,' t-end')+dot(18.5,17.2,'var(--muted)','Pelotas 17.2%',-8,' t-end');
    if(age>12){s+=T(X(13),Y(91)-6,'t-xs','full or partial (still impairing)','fill:var(--warn);font-weight:700');s+=T(X(8.6),Y(62),'t-xs','full criteria','fill:var(--dz);font-weight:700')}
    s+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`+T(Math.min(X(age),L.x+L.w-14),L.y-4,'t-xs t-mid','age '+Math.round(age),'fill:var(--ink)');
    if(N)s+=T(L.x-30,L.y+L.h+40,'t-xs','Schematic curves through published points (circles):')+T(L.x-30,L.y+L.h+52,'t-xs','Faraone 2006 meta-analysis; two cohorts at age 18.');else s+=T(L.x,L.y+L.h+42,'t-xs','Schematic curves drawn through published points (circles). Faraone 2006 meta-analysis; cohorts at age 18.');
    /* MTA: what happens between snapshots */
    const m=ramp(t,.86,.95);if(m>0){const B=N?{x:20,y:L.y+L.h+84,w:360}:{x:510,y:84,w:196};
      s+=`<g style="opacity:${f1(m)}"><rect x="${B.x-8}" y="${B.y-18}" width="${B.w+16}" height="${N?112:258}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`+T(B.x,B.y-2,'t-sm','MTA · 558 CHILDREN, 16 YEARS');
      const parts=[[63.8,'fluctuating','var(--da)'],[15.6,'partial remission','var(--warn)'],[10.8,'stable persistence','var(--dz)'],[9.1,'sustained recovery','var(--good)']];let x=B.x;
      parts.forEach(([v,lab,c])=>{const w=B.w*v/100*ease(m);s+=`<rect x="${f1(x)}" y="${B.y+8}" width="${f1(Math.max(0,w-1.5))}" height="16" rx="3" style="fill:${c};opacity:.85"/>`;x+=w});
      parts.forEach(([v,lab,c],k)=>{const yy=B.y+44+k*(N?15:17);s+=`<rect x="${B.x}" y="${yy-8}" width="9" height="9" rx="2" style="fill:${c}"/>`+T(B.x+14,yy,'t-xs',`${v}% ${lab}`,'fill:var(--ink)')});
      if(!N){s+=T(B.x,B.y+126,'t-xs','one fluctuating course (schematic):');
        s+=wave(B.x,B.y+170,B.w,22,{freq:3.58,phase:.1,c:'var(--da)',sw:2.2,damp:.2});
        s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+170}" y2="${B.y+170}" style="stroke:var(--line);stroke-dasharray:2 3"/>`+T(B.x+B.w,B.y+166,'t-xs t-end','threshold')+T(B.x,B.y+210,'t-xs','mean 3.58 swings over 16 years,')+T(B.x,B.y+224,'t-xs','6–7 symptoms peak to trough')}
      else s+=T(B.x+200,B.y+59,'t-xs','mean 3.58 swings')+T(B.x+200,B.y+74,'t-xs','over 16 years');
      s+='</g>'}
    return s}
  function draw(t){const N=vb(svg,'720 400','400 620'),p=phaseOf(WH_STEPS,t),kids=pop==='kids';
    const oA=1-ramp(t,.32,.36),oB=ramp(t,.34,.38)*(1-ramp(t,.58,.62)),oC=ramp(t,.6,.64);
    const H=t<.36?['1 · How common',kids?'children and adolescents, worldwide':'adults, worldwide']:t<.62?['2 · Who is diagnosed','boys and girls in different settings']:['3 · Over the lifespan','children with ADHD followed into adulthood'];
    let s=`<text x="${N?20:28}" y="26" class="t-big">${H[0]}</text><text x="${N?20:28}" y="42" class="t-sm">${H[1]}</text>`;
    if(oA>0)s+=`<g style="opacity:${f1(oA)}">${phA(N,t)}</g>`;
    if(oB>0)s+=`<g style="opacity:${f1(oB)}">${phB(N,t)}</g>`;
    if(oC>0)s+=`<g style="opacity:${f1(oC)}">${phC(N,t)}</g>`;
    svg.innerHTML=s;setSt(p);
    const S=WH_STEPS[p],V=(!kids&&S.adult)?Object.assign({},S,S.adult):S;note.innerHTML=noteHTML(V)}
  const stop=playWire(rg,$('#whPlay'),draw,26000,'%t:player.replay%','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-wp]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.wp;$$('[data-wp]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value>.36){rg.value=.12}draw(+rg.value)}));
  draw(+rg.value);

  /* ---- US comparator: diagnosed versus treated ---- */
  const cs=$('#whCmp'),cn=$('#whCmpNote');let grp='kids',stopC=null;
  const CMP={kids:{title:'US children aged 3–17, 2022 (NSCH, n = 45,169)',
     dx:[[11.4,'ever diagnosed','7.1 million'],[10.5,'current ADHD','6.5 million']],
     tx:[[53.6,'took ADHD medication',62.0],[44.4,'behavioural treatment, past year',46.7],[30.1,'no ADHD-specific treatment',23.0],[77.9,'at least one co-occurring disorder',null]],
     note:`In 2022, 11.4% of US children aged 3–17 had ever been diagnosed with ADHD and 10.5% had current ADHD; about 1 million more children had ever been diagnosed than in 2016. Among children with current ADHD, 53.6% took ADHD medication, 44.4% had behavioural treatment in the past year and 30.1% had neither (in 2016: 62.0%, 46.7% and 23.0%). 58.1% had moderate or severe ADHD and 77.9% at least one co-occurring disorder. The figures are parent-reported. [[Danielson2024,Danielson2018]]`},
   adults:{title:'US adults, October–November 2023 (n = 7,046 interviews)',
     dx:[[6.0,'current ADHD diagnosis','15.5 million']],
     tx:[[36.5,'no treatment',null],[35.2,'medication and counselling',null],[15.1,'medication only',null],[13.3,'counselling only',null],[55.9,'first diagnosed at 18 or older',null]],
     note:`In late 2023, 6.0% of US adults (about 15.5 million, 1 in 16) reported a current ADHD diagnosis, and 55.9% of them were first diagnosed at 18 or older. 36.5% had no treatment, 35.2% medication and counselling, 15.1% medication only and 13.3% counselling only; 33.4% had taken a stimulant in the past year. 71.5% of adults taking a stimulant had trouble filling a prescription because the medicine was unavailable. Self-reported survey data. [[Staley2024]]`}};
  function drawC(k){const N=vb(cs,'720 300','400 470'),D=CMP[grp];let s='';
    const L=N?{lx:20,ly:56,lw:360,rx:20,ry:196,rw:360,row:30}:{lx:24,ly:66,lw:250,rx:320,ry:66,rw:380,row:34};
    s+=`<text x="${N?20:24}" y="24" class="t-big">${grp==='kids'?'Children':'Adults'}</text><text x="${N?20:24}" y="40" class="t-sm">${D.title}</text>`;
    /* left: share of the whole population diagnosed, on a 0–15% scale */
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-xs" style="font-weight:700;fill:var(--ink)">DIAGNOSED · % OF ALL ${grp==='kids'?'CHILDREN':'ADULTS'}</text>`;
    const XL=v=>L.lx+v/15*L.lw;[0,5,10,15].forEach(v=>{s+=`<line x1="${f1(XL(v))}" x2="${f1(XL(v))}" y1="${L.ly+8}" y2="${L.ly+12+2*L.row}" class="grid"/><text x="${f1(XL(v))}" y="${L.ly+24+2*L.row}" class="t-xs t-mid">${v}%</text>`});
    D.dx.forEach(([v,lab,n],i)=>{const y=L.ly+14+i*L.row;s+=`<rect x="${L.lx}" y="${y}" width="${f1((XL(v)-L.lx)*k)}" height="12" rx="6" style="fill:var(--dz)"/><text x="${f1(XL(v*k)+6)}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${f1(v*k)}%</text><text x="${L.lx}" y="${y+L.row-6}" class="t-xs">${lab} · ${n}</text>`});
    /* right: what happens among those diagnosed, 0–100% */
    s+=`<text x="${L.rx}" y="${L.ry}" class="t-xs" style="font-weight:700;fill:var(--ink)">AMONG THOSE WITH CURRENT ADHD (%)</text>`;
    const XR=v=>L.rx+v/100*L.rw,nr=D.tx.length;[0,25,50,75,100].forEach(v=>{s+=`<line x1="${f1(XR(v))}" x2="${f1(XR(v))}" y1="${L.ry+8}" y2="${L.ry+10+nr*L.row}" class="grid"/><text x="${f1(XR(v))}" y="${L.ry+22+nr*L.row}" class="t-xs t-mid">${v}</text>`});
    D.tx.forEach(([v,lab,old],i)=>{const y=L.ry+14+i*L.row,c=/no /.test(lab)?'var(--muted)':/co-occ|18 or/.test(lab)?'var(--dx)':'var(--rx)';
      s+=`<rect x="${L.rx}" y="${y}" width="${f1((XR(v)-L.rx)*k)}" height="12" rx="6" style="fill:${c};opacity:.9"/><text x="${f1(Math.min(XR(Math.max(v*k,old||0))+6,L.rx+L.rw-30))}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${f1(v*k)}%</text>`;
      if(old!=null)s+=`<line x1="${f1(XR(old))}" x2="${f1(XR(old))}" y1="${y-3}" y2="${y+15}" style="stroke:var(--ink);stroke-width:2"/>`;
      s+=`<text x="${L.rx}" y="${y+L.row-6}" class="t-xs">${lab}</text>`});
    if(grp==='kids')s+=`<line x1="${N?250:L.rx+L.rw-118}" x2="${N?250:L.rx+L.rw-118}" y1="${(N?L.ry+22+nr*L.row:L.ry+22+nr*L.row)+10}" y2="${(N?L.ry+22+nr*L.row:L.ry+22+nr*L.row)+22}" style="stroke:var(--ink);stroke-width:2"/><text x="${N?256:L.rx+L.rw-112}" y="${(N?L.ry+22+nr*L.row:L.ry+22+nr*L.row)+20}" class="t-xs">= same survey, 2016</text>`;
    cs.innerHTML=s}
  $$('[data-wc]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.wc;$$('[data-wc]').forEach(x=>x.setAttribute('aria-pressed',x===b));cn.innerHTML=`<p>${CMP[grp].note}</p>`;
    if(stopC)stopC();stopC=animate(700,p=>drawC(ease(p)))}));
  cn.innerHTML=`<p>${CMP.kids.note}</p>`;drawC(1);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawC(1)};
};
