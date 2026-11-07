/* =============== 1.1 What a heart attack is =============== */
/* Who has a heart attack: a 1,000-icon array (1 icon = about 805 US heart attacks a year),
   a 40-second stopwatch, STEMI/NSTEMI and the five types, age and sex, then survival grids.
   Every number comes from research pass A; citations sit in the note text, never in SVG text. */
const WH_STEPS=[
 {from:0,at:.14,k:'Step 1 · the United States, every year',t:'One heart attack about every 40 seconds',
  txt:`The American Heart Association estimates 605,000 first and 200,000 recurrent heart attacks a year in the US: 805,000 in all, or about one every 40 seconds (AHA/NHLBI tabulation of ARIC 2005–2014). An estimated 170,000 of them are silent, happening without significant symptoms. About 9.3 million US adults (3.2%) say they have had one. [[Martin2025HDSS]] Worldwide, ischaemic heart disease caused an estimated 8.99 million deaths in 2021 and was the leading age-standardised cause of death. [[Martin2025HDSS,GBD2021CausesOfDeath]]`,
  pt:`In the US, someone has a heart attack about every 40 seconds. About 1 in 5 is "silent": the person may not notice it, and it is found later on a heart tracing.`,
  hook:`805,000 US heart attacks a year = 605,000 first + 200,000 recurrent; about 170,000 silent; one every ~40 s. [[Martin2025HDSS]]`},
 {from:.25,at:.34,k:'Step 2 · two ECG patterns, five types',t:'STEMI, NSTEMI and the five types',
  txt:`Doctors split heart attacks by the first ECG. STEMI (ST-elevation MI) usually means an artery is completely blocked; NSTEMI shows no ST elevation. In 9 million US adults hospitalised for MI (2005–2019), 72% had NSTEMI and 28% STEMI. STEMI carried higher in-hospital risks in NCDR data: death 6.4% versus 3.4%. [[Martin2025HDSS]] Troponin testing raised NSTEMI counts, and NSTEMI is now the majority. [[Roger2010Olmsted]] Separately, the universal definition sorts MIs by cause into five types. Type 3 is rare, about 3–4% of all MIs. [[Thygesen2018UDMI4,Domienik2021UDMI4]]`,
  pt:`Some heart attacks show a clear pattern on the heart tracing (STEMI). Most do not (NSTEMI). Both are heart attacks and both need emergency care.`,
  hook:`Type 1 = atherothrombosis; type 2 = supply–demand mismatch without acute atherothrombosis; type 3 = cardiac death before biomarkers; type 4a = PCI (>5× the 99th percentile); type 5 = CABG (>10×). [[Domienik2021UDMI4]]`},
 {from:.5,at:.6,k:'Step 3 · age and sex',t:'Who, and at what age',
  txt:`The average age at a first heart attack is 65.6 years for males and 72.0 for females. Of the 9.3 million US adults who have had one, 6.1 million are men and 3.2 million women, and prevalence is higher in males at every age. [[Martin2025HDSS]] Younger people are not spared: in ARIC, the share of heart attack hospitalisations aged 35–54 grew from 27% to 32% between 1995–1999 and 2010–2014, most of all in young women. [[Arora2019ARICyoung]] Women have heart attacks at older ages, which is part of why they are more likely to die within a few weeks. [[Martin2025HDSS]]`,
  pt:`Heart attacks become more common with age. Women tend to have them about 6 years later than men, but younger women are a growing share.`,
  hook:`Average age at first MI: 65.6 years (males), 72.0 years (females). [[Martin2025HDSS]]`},
 {from:.75,at:.99,k:'Step 4 · after a first heart attack',t:'What happens next',
  txt:`Among US adults aged 45 or older, 18% of males and 23% of females died within a year of a first MI, and 36% and 47% within 5 years (pooled NHLBI cohorts treated in 1995–2012). Median survival was 8.2 and 5.5 years. These are population statistics from people treated years ago, not predictions for anyone. [[Martin2025HDSS]] Care keeps improving: in Swedish STEMI care, 1-year mortality fell from 22.1% to 14.1% between 1995 and 2014 as primary PCI rose from 4.5% to 78.0%. [[Szummer2017STEMI]]`,
  pt:`Survival after a heart attack has improved a lot. These numbers describe large groups of people treated in the past; they cannot say what will happen to one person.`,
  hook:`Within 5 years of a first MI at ≥45: recurrent MI or fatal CHD 17% (males) / 21% (females); heart failure 16% / 22%. [[Martin2025HDSS]]`}
];
/* the five types of the Fourth Universal Definition (short labels for the SVG cards) */
const WH_TYPES=[['1','Plaque and clot','rupture or erosion, then thrombus','var(--brand)'],['2','Supply–demand','e.g. anaemia, arrhythmia, shock','var(--isch)'],
  ['3','Sudden death','before blood tests can be taken','var(--necro)'],['4','After PCI','type 4a: >5× the 99th percentile','var(--stent)'],['5','After bypass','CABG: >10× the 99th percentile','var(--rx)']];
const WH_CASES=[
 {t:'Crushing chest pressure',txt:'A man, 58, has had crushing chest pressure for 40 minutes. Troponin rises well above the 99th percentile between two samples, the ECG shows new ST elevation, and angiography finds a fresh clot on a ruptured plaque.',
  ans:'mi',lab:'Myocardial infarction, type 1',path:['q1','q2','q3','mi','q4','t1'],
  exp:`Acute injury (a rise above the 99th percentile) plus clinical evidence of ischaemia (symptoms, new ST elevation) is MI. A coronary thrombus on angiography is one of the type 1 criteria. [[Thygesen2018UDMI4,Domienik2021UDMI4]]`},
 {t:'Bleeding ulcer and anaemia',txt:'A woman, 79, is admitted with a bleeding stomach ulcer and severe anaemia. She has chest tightness, new ST depression and a rising troponin. Her coronary arteries have old, stable narrowings and no fresh clot.',
  ans:'mi',lab:'Myocardial infarction, type 2',path:['q1','q2','q3','mi','q4','t2'],
  exp:`She has acute injury and evidence of ischaemia, so this is MI. Without acute atherothrombosis, severe anaemia causing a supply–demand mismatch makes it type 2. [[Domienik2021UDMI4,DeFilippis2019Type2]] Type 2 MI made up 20–26% of MIs in hospital cohorts. [[Saaby2013Type2,Chapman2018Type2]]`},
 {t:'A routine dialysis visit',txt:'A man, 70, on dialysis for kidney disease comes for a routine visit with no symptoms. His troponin is above the 99th percentile, but the same on two samples a few hours apart.',
  ans:'inj',lab:'Chronic myocardial injury',path:['q1','q2','chronic'],
  exp:`A raised troponin without a rise and/or fall is chronic myocardial injury. Kidney disease is one of many causes of injury without MI. [[Domienik2021UDMI4]] In South Australia, chronic injury was found in 14.79% of emergency episodes. [[Chuang2021Injury]]`},
 {t:'Septic shock in intensive care',txt:'A woman, 66, is in septic shock with low blood pressure. Her troponin rises and falls. She has no chest pain, the ECG shows no ischaemic changes, and the heart walls move normally on echo.',
  ans:'inj',lab:'Acute myocardial injury, not MI',path:['q1','q2','q3','acute'],
  exp:`The troponin pattern shows acute injury, but there is no clinical evidence of acute ischaemia. The definition calls this "myocardial injury", not MI; hypotensive shock is one of the causes it lists. [[Domienik2021UDMI4]] How best to evaluate and treat non-ischaemic injury has not been established. [[DeFilippis2019Type2]]`},
 {t:'After a planned stent',txt:'A man, 62, has a planned stent. His troponin was normal beforehand. Within 48 hours it rises to more than 5 times the 99th percentile, and a new ECG change appears.',
  ans:'mi',lab:'Myocardial infarction, type 4a',path:['q1','q2','q3','mi','proc'],
  exp:`Procedure-related MI within 48 hours needs, with a normal baseline troponin, a rise above 5× the 99th percentile after PCI (type 4a) or 10× after CABG (type 5), plus a clinical criterion such as new ECG changes. [[Domienik2021UDMI4]]`},
 {t:'Chest pain after sudden bad news',txt:'A woman, 71, develops chest pain after hearing sudden bad news. Troponin rises and the ECG changes, but her coronary arteries are not blocked, and imaging shows the lower part of the left ventricle ballooning: takotsubo syndrome.',
  ans:'inj',lab:'Myocardial injury (takotsubo), not MI',path:['q1','q2','q3','acute'],takotsubo:true,
  exp:`Under the 2018 definition, takotsubo syndrome is classed as another cause of myocardial injury, not as MI, even though it can look like one. [[Domienik2021UDMI4]] More in <a href="#differential" data-go="differential">heart attack or something else?</a>`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),read=$('#whRead');
  /* which icons are recurrent and which silent (silent ones scattered, seeded) */
  const N=1000,REC=248,SIL=211,silent=new Set(),r=rng(805);
  while(silent.size<SIL)silent.add(Math.floor(r()*N));
  const fmt=n=>Math.round(n).toLocaleString('en-US');
  const sym=`<defs><symbol id="whP" viewBox="0 0 10 10"><circle cx="5" cy="1.8" r="1.8"/><path d="M2.3 10V6.2Q2.3 4.1 5 4.1Q7.7 4.1 7.7 6.2V10Z"/></symbol></defs>`;
  const use=(x,y,s,fill,op=1)=>`<use href="#whP" x="${f1(x)}" y="${f1(y)}" width="${f1(s)}" height="${f1(s)}" style="fill:${fill}${op<1?';opacity:'+f1(op):''}"/>`;
  const txt=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  /* stopwatch: one sweep = 40 seconds */
  function watch(cx,cy,R,sec){const u=(sec%40)/40,a=(u*360-90)*Math.PI/180;
    let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${R}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><rect x="${f1(cx-4)}" y="${f1(cy-R-7)}" width="8" height="6" rx="1.5" style="fill:var(--ink)"/>`;
    if(u>0)s+=`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-R+3)}A${R-3} ${R-3} 0 ${u>.5?1:0} 1 ${f1(cx+(R-3)*Math.cos(a))} ${f1(cy+(R-3)*Math.sin(a))}Z" style="fill:var(--brand);opacity:.22"/>`;
    for(let i=0;i<8;i++){const b=(i/8*360-90)*Math.PI/180;s+=`<line x1="${f1(cx+Math.cos(b)*R*.8)}" y1="${f1(cy+Math.sin(b)*R*.8)}" x2="${f1(cx+Math.cos(b)*R*.94)}" y2="${f1(cy+Math.sin(b)*R*.94)}" style="stroke:var(--muted);stroke-width:${i%2?1:1.8}"/>`}
    s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(a)*R*.8)}" y2="${f1(cy+Math.sin(a)*R*.8)}" style="stroke:var(--brand);stroke-width:2.2;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--ink)"/>`;
    return s+txt(cx,cy+R+14,`${Math.floor(sec%40)} s of 40`,'t-xs t-mid')}
  function bar(x,y,w,h,parts){let s='',xx=x;parts.forEach(p=>{const ww=w*p.v;s+=`<rect x="${f1(xx)}" y="${f1(y)}" width="${f1(Math.max(0,ww))}" height="${h}" style="fill:${p.c}"/>`;if(p.l&&ww>30)s+=txt(xx+ww/2,y+h/2+3.5,p.l,'t-xs t-mid','fill:#fff;font-weight:600');xx+=ww});return s}
  function draw(t){
    const NR=vb(svg,'720 400','400 584'),p=phaseOf(WH_STEPS,t),S=WH_STEPS[p];
    const L=NR?{ax:20,ay:58,cols:40,sz:7.6,cx:9,cy:8.8,px:20,py:318,pw:360}:{ax:16,ay:58,cols:40,sz:8.4,cx:9.25,cy:9.4,px:410,py:58,pw:296};
    const rows=N/L.cols,aw=L.cols*L.cx,ah=rows*L.cy;
    let s=sym+txt(L.ax,26,S.t,'t-big','fill:'+(p===3?'var(--good)':'var(--ink)'));
    s+=txt(L.ax,44,['1 icon ≈ 805 heart attacks a year in the US','each icon ≈ 805 attacks, recoloured by ECG pattern','people who have had a heart attack, by sex','after a first heart attack at age 45 or older'][p],'t-sm');
    /* ---- the 1,000-icon array (steps 1–3), fading out in step 4 ---- */
    const arrOp=1-ramp(t,.75,.79);
    const fill=ramp(t,.015,.2)*N,recOn=ramp(t,.1,.14),silOn=ramp(t,.15,.2)*(1-ramp(t,.25,.29));
    const split=ramp(t,.27,.37),sexOn=ramp(t,.5,.57),male=656;
    if(arrOp>0){let a='';
      for(let i=0;i<N;i++){const x=L.ax+(i%L.cols)*L.cx,y=L.ay+Math.floor(i/L.cols)*L.cy;let col='var(--line)',op=1;
        if(i<fill){col=i>=N-REC&&recOn>.5?'var(--clot)':'var(--brand)';if(silent.has(i)&&silOn>.5)op=.35}
        if(split>0&&t<.5){const lim=Math.round(split*N);if(i<lim)col=i<720?'var(--dx)':'var(--brand)'}
        if(sexOn>0){const lim=Math.round(sexOn*N);if(i<lim)col=i<male?'var(--dx)':'var(--plt)';else if(t>=.5)col=i<720?'var(--dx)':'var(--brand)'}
        a+=use(x,y,L.sz,col,op)}
      s+=`<g style="opacity:${f1(arrOp)}">${a}</g>`;
      /* legend under the array */
      const ly=L.ay+ah+14;let lg=[];
      if(t<.25)lg=[['var(--brand)','first attack · 605,000'],['var(--clot)','recurrent · 200,000']].concat(silOn>.5?[['var(--brand);opacity:.35','silent (about 1 in 5) · 170,000']]:[]);
      else if(t<.5)lg=[['var(--dx)','NSTEMI · 72%'],['var(--brand)','STEMI · 28%']];
      else lg=[['var(--dx)','men · 6.1 million'],['var(--plt)','women · 3.2 million']];
      let lx=L.ax,lyy=ly;lg.forEach(([c,l])=>{const w=l.length*6.4+24;if(lx+w>L.ax+aw+8&&lx>L.ax){lx=L.ax;lyy+=15}s+=`<g style="opacity:${f1(arrOp)}"><rect x="${f1(lx)}" y="${f1(lyy-8)}" width="10" height="10" rx="2" style="fill:${c}"/>${txt(lx+14,lyy+1,l,'t-xs','fill:var(--ink)')}</g>`;lx+=w});
    }
    /* ---- right (or lower) panel ---- */
    const X=L.px,Y=L.py,W=L.pw;
    if(p===0){const sec=ramp(t,.0,.22)*400,n=Math.floor(sec/40);
      s+=watch(X+40,Y+44,30,sec);
      s+=txt(X+90,Y+26,'attacks since the clock started','t-xs','fill:var(--ink);font-weight:600');
      s+=txt(X+90,Y+58,String(n),'t-big','font-size:34px;fill:var(--brand)');
      for(let i=0;i<10;i++)s+=use(X+150+i*14,Y+38,12,i<n?'var(--brand)':'var(--line)');
      s+=txt(X+150,Y+66,'one every ~40 seconds','t-xs');
      const tot=ramp(t,.02,.2)*805000,first=Math.min(605000,tot),rec=Math.max(0,tot-605000);
      const by=Y+108;
      s+=txt(X,by,'In a year','t-xs','fill:var(--ink);font-weight:600');
      s+=txt(X,by+34,fmt(tot),'t-big','font-size:30px');
      s+=bar(X,by+46,W,16,[{v:first/805000,c:'var(--brand)',l:'first'},{v:rec/805000,c:'var(--clot)',l:'recurrent'}]);
      s+=`<rect x="${f1(X)}" y="${f1(by+46)}" width="${f1(W)}" height="16" style="fill:none;stroke:var(--line)"/>`;
      s+=txt(X,by+78,`first ${fmt(first)} · recurrent ${fmt(rec)}`,'t-xs');
      if(silOn>.2)s+=txt(X,by+96,'about 170,000 a year are silent:','t-xs',`fill:var(--ink);opacity:${f1(silOn)}`)+txt(X,by+110,'no significant symptoms','t-xs',`opacity:${f1(silOn)}`);
      s+=txt(X,by+132,'9.3 million US adults have had one (3.2%)','t-xs','fill:var(--ink)');
    }else if(p===1){const sp=ramp(t,.27,.37);
      s+=txt(X,Y+12,'Hospitalised MI, US 2005–2019','t-xs','fill:var(--ink);font-weight:600');
      s+=bar(X,Y+20,W,20,[{v:.72*sp,c:'var(--dx)',l:'NSTEMI 72%'},{v:.28*sp,c:'var(--brand)',l:'STEMI 28%'}])+`<rect x="${f1(X)}" y="${f1(Y+20)}" width="${f1(W)}" height="20" style="fill:none;stroke:var(--line)"/>`;
      s+=txt(X,Y+58,'In-hospital death (NCDR registry)','t-xs','fill:var(--ink);font-weight:600');
      [['STEMI',6.4,'var(--brand)'],['NSTEMI',3.4,'var(--dx)']].forEach(([l,v,c],i)=>{const yy=Y+66+i*20,ww=(W-90)*v/8*ramp(t,.3,.38);s+=txt(X,yy+11,l,'t-xs')+`<rect x="${f1(X+52)}" y="${f1(yy)}" width="${f1(ww)}" height="14" rx="3" style="fill:${c}"/>`+txt(X+58+ww,yy+11,v+'%','t-xs','fill:var(--ink)')});
      s+=txt(X,Y+124,'Five types (Fourth Universal Definition)','t-xs','fill:var(--ink);font-weight:600');
      WH_TYPES.forEach((ty,i)=>{const op=ramp(t,.38+i*.02,.4+i*.02);if(op<=0)return;const dx=(1-op)*20;
        if(NR){const cw=176,xx=X+(i%2)*(cw+8),yy=Y+134+Math.floor(i/2)*32;s+=`<g style="opacity:${f1(op)}" transform="translate(${f1(dx)} 0)"><rect x="${f1(xx)}" y="${f1(yy)}" width="${cw}" height="26" rx="7" style="fill:var(--panel);stroke:${ty[3]};stroke-width:1.4"/><rect x="${f1(xx)}" y="${f1(yy)}" width="26" height="26" rx="7" style="fill:${ty[3]}"/>${txt(xx+13,yy+18,ty[0],'t-big t-mid','fill:#fff;font-size:14px')}${txt(xx+33,yy+17,ty[1],'t-xs','fill:var(--ink);font-weight:700')}</g>`;return}
        const yy=Y+132+i*34;
        s+=`<g style="opacity:${f1(op)}" transform="translate(${f1(dx)} 0)"><rect x="${f1(X)}" y="${f1(yy)}" width="${f1(W)}" height="30" rx="7" style="fill:var(--panel);stroke:${ty[3]};stroke-width:1.4"/><rect x="${f1(X)}" y="${f1(yy)}" width="30" height="30" rx="7" style="fill:${ty[3]}"/>${txt(X+15,yy+20,ty[0],'t-big t-mid','fill:#fff;font-size:15px')}${txt(X+38,yy+13,ty[1],'t-xs','fill:var(--ink);font-weight:700')}${txt(X+38,yy+25,ty[2],'t-xs')}</g>`});
    }else if(p===2){const a0=30,a1=90,AX=v=>X+W*(v-a0)/(a1-a0),yy=Y+56;
      s+=txt(X,Y+12,'Average age at a first heart attack','t-xs','fill:var(--ink);font-weight:600');
      s+=`<line x1="${f1(X)}" x2="${f1(X+W)}" y1="${yy}" y2="${yy}" class="axis"/>`;
      for(let v=30;v<=90;v+=10)s+=`<line x1="${f1(AX(v))}" x2="${f1(AX(v))}" y1="${yy-3}" y2="${yy+3}" class="axis"/>`+txt(AX(v),yy+15,v,'t-xs t-mid');
      [[65.6,'men 65.6','var(--dx)',-1],[72.0,'women 72.0','var(--brand)',1]].forEach(([v,l,c,d],i)=>{const m=ramp(t,.52+i*.04,.6+i*.04),xx=AX(lerp(a0,v,ease(m)));
        s+=`<circle cx="${f1(xx)}" cy="${yy}" r="6" style="fill:${c};opacity:${f1(.3+.7*m)}"/>`+txt(xx,yy+(d<0?-12:30),l+' y','t-xs t-mid',`fill:${c};font-weight:700;opacity:${f1(m)}`)});
      s+=txt(X+W,yy+44,'years','t-xs t-end');
      const by=Y+128,yo=ramp(t,.6,.68);
      s+=txt(X,by,'Aged 35–54: share of admissions (ARIC)','t-xs','fill:var(--ink);font-weight:600');
      [['1995–99',27],['2010–14',32]].forEach(([l,v],i)=>{const yy2=by+12+i*22,ww=(W-110)*v/40*yo;s+=txt(X,yy2+11,l,'t-xs')+`<rect x="${f1(X+56)}" y="${f1(yy2)}" width="${f1(ww)}" height="15" rx="3" style="fill:${i?'var(--brand)':'var(--isch-fill)'}"/>`+txt(X+62+ww,yy2+11,v+'%','t-xs','fill:var(--ink)')});
      s+=txt(X,by+76,'Ever had a heart attack (adults ≥20, NHANES)','t-xs','fill:var(--ink);font-weight:600');
      [['men',4.5,'var(--dx)'],['women',2.1,'var(--brand)']].forEach(([l,v,c],i)=>{const yy2=by+88+i*22,ww=(W-110)*v/6*ramp(t,.64,.72);s+=txt(X,yy2+11,l,'t-xs')+`<rect x="${f1(X+56)}" y="${f1(yy2)}" width="${f1(ww)}" height="15" rx="3" style="fill:${c}"/>`+txt(X+62+ww,yy2+11,v+'%','t-xs','fill:var(--ink)')});
    }
    /* ---- step 4: two 10x10 grids replace the array ---- */
    const gOp=ramp(t,.76,.8);
    if(gOp>0){const yrs=t<.88?1:5,d1=ramp(t,.8,.87),d5=ramp(t,.89,.97);
      const dead=(v1,v5)=>Math.round(v1*d1+(v5-v1)*d5);
      const G=NR?[{x:20,y:66},{x:212,y:66}]:[{x:16,y:70},{x:200,y:70}],gs=NR?16.4:16.6;
      [['Men',18,36,8.2],['Women',23,47,5.5]].forEach(([nm,v1,v5,med],gi)=>{const g=G[gi],k=dead(v1,v5);let a='';
        for(let i=0;i<100;i++)a+=use(g.x+(i%10)*gs,g.y+18+Math.floor(i/10)*gs,gs-3,i>=100-k?'var(--muted)':'var(--good)',i>=100-k?.45:1);
        s+=`<g style="opacity:${f1(gOp)}">${txt(g.x,g.y+8,nm+' · first MI at ≥45','t-xs','fill:var(--ink);font-weight:700')}${a}${txt(g.x,g.y+190,`${k} of 100 had died`,'t-lbl')}${txt(g.x,g.y+206,d5>0?'within 5 years':'within 1 year','t-xs')}${txt(g.x,g.y+222,`median survival ${med} y`,'t-xs')}</g>`});
      {s+=`<g style="opacity:${f1(gOp)}">`;
        const X2=NR?20:410,Y2=NR?330:70;s+=txt(X2,Y2+8,'Swedish STEMI care: 1-year mortality','t-xs','fill:var(--ink);font-weight:700');
        [['1995',22.1,'var(--isch-fill)'],['2014',14.1,'var(--good)']].forEach(([l,v,c],i)=>{const yy=Y2+22+i*26,ww=200*v/25*ramp(t,.82+i*.06,.9+i*.06);s+=txt(X2,yy+13,l,'t-xs')+`<rect x="${X2+36}" y="${yy}" width="${f1(ww)}" height="18" rx="3" style="fill:${c}"/>`+txt(X2+42+ww,yy+13,v+'%','t-xs','fill:var(--ink)')});
        s+=txt(X2,Y2+96,'primary PCI: 4.5% → 78.0% of STEMI','t-xs');
        s+=`<rect x="${X2}" y="${Y2+120}" width="296" height="64" rx="10" style="fill:var(--gold-soft)"/>`+txt(X2+12,Y2+142,'Population statistics','t-xs','fill:var(--warn);font-weight:700')+txt(X2+12,Y2+158,'cohorts treated in 1995–2012; they describe','t-xs','fill:var(--ink)')+txt(X2+12,Y2+172,'groups, not what will happen to one person','t-xs','fill:var(--ink)');
        s+='</g>'}
    }
    /* phase strip */
    const sy=NR?570:384,sw=(NR?360:688)/4,sx=NR?20:16;
    WH_STEPS.forEach((q,i)=>{s+=`<rect x="${f1(sx+i*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${i===p?'var(--brand)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(sx+(NR?360:688)*t)}" cy="${sy+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    note.innerHTML=noteHTML(S);setSt(p);
    read.innerHTML=p===0?`<span>Clock: <b>${Math.floor(ramp(t,0,.22)*400)} s</b></span><span>Attacks: <b>${Math.floor(ramp(t,0,.22)*10)}</b></span>`:p===1?`<span>NSTEMI <b>72%</b></span><span>STEMI <b>28%</b></span>`:p===2?`<span>Men <b>65.6 y</b></span><span>Women <b>72.0 y</b></span>`:`<span>Shown: <b>${t<.88?'1 year':'5 years'}</b> after a first MI</span>`;
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#whPlay'),draw,24000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- injury or infarction: cases + flow chart ---------- */
  const fsvg=$('#whFlow'),cap=$('#whFlowCap'),box=$('#whCases'),score=$('#whScore');
  const NODES={q1:['Troponin above','99th percentile?'],q2:['Rising and/or','falling?'],q3:['Clinical evidence','of acute ischaemia?','symptoms, ECG,','imaging, thrombus'],
    mi:['Myocardial','infarction'],q4:['Acute athero-','thrombosis?'],none:['No myocardial','injury'],chronic:['Chronic','myocardial injury'],acute:['Acute injury','(not MI)'],
    proc:['Within 48 h of','PCI: type 4a (>5×)','CABG: type 5 (>10×)'],t1:['Type 1 MI'],t2:['Type 2 MI','supply–demand']};
  const TERM={none:1,chronic:1,acute:1,proc:1,t1:1,t2:1,mi:1};
  const EDGES=[['q1','q2','yes'],['q1','none','no'],['q2','q3','yes'],['q2','chronic','no'],['q3','mi','yes'],['q3','acute','no'],['mi','q4',''],['mi','proc','procedure'],['q4','t1','yes'],['q4','t2','no']];
  let cur=-1;const answers=WH_CASES.map(()=>null);
  function fdraw(){const NR=vb(fsvg,'720 330','400 540');
    const P=NR?{q1:[20,16,190,52],none:[230,16,150,40],q2:[20,106,190,44],chronic:[230,106,150,40],q3:[20,186,190,70],acute:[230,186,150,40],mi:[20,296,190,44],proc:[230,290,150,56],q4:[20,384,190,44],t1:[20,476,170,40],t2:[210,476,170,40]}
      :{q1:[16,40,130,56],q2:[166,40,120,56],q3:[306,30,140,76],mi:[466,46,110,44],q4:[596,40,110,56],none:[16,200,130,40],chronic:[166,200,120,40],acute:[306,200,140,40],proc:[456,176,130,58],t1:[596,166,110,36],t2:[596,240,110,44]};
    const path=cur>=0?WH_CASES[cur].path:[],on=k=>path.includes(k),onE=(a,b)=>{const i=path.indexOf(a);return i>=0&&path[i+1]===b};
    let s=`<defs>${marker('whAr','var(--muted)')}${marker('whArOn','var(--brand)')}</defs>`;
    const mid=(k,side)=>{const[x,y,w,h]=P[k];return side==='r'?[x+w,y+h/2]:side==='l'?[x,y+h/2]:side==='b'?[x+w/2,y+h]:[x+w/2,y]};
    EDGES.forEach(([a,b,l])=>{const A=P[a],B=P[b];let p1,p2;
      if(NR){if(B[0]>A[0]+A[2]-5){p1=mid(a,'r');p2=mid(b,'l')}else{p1=mid(a,'b');p2=mid(b,'t')}
        if(a==='q4'&&b==='t2'){p1=mid(a,'b');p2=[B[0]+B[2]/2,B[1]]}}
      else{if(Math.abs(B[1]-A[1])<30){p1=mid(a,'r');p2=mid(b,'l')}else{p1=mid(a,'b');p2=mid(b,'t')}
        if(a==='q4'&&b==='t2'){p1=[A[0]+A[2]-14,A[1]+A[3]];p2=[B[0]+B[2]-14,B[1]]}}
      const hot=onE(a,b),d=`M${f1(p1[0])} ${f1(p1[1])}L${f1(p2[0])} ${f1(p2[1])}`;
      s+=`<path d="${d}" style="stroke:${hot?'var(--brand)':'var(--muted)'};stroke-width:${hot?2.6:1.3};fill:none" marker-end="url(#${hot?'whArOn':'whAr'})"/>`;
      if(l&&!(NR&&l==='procedure'))s+=txt((p1[0]+p2[0])/2+(Math.abs(p1[1]-p2[1])>10?5:0),(p1[1]+p2[1])/2-(Math.abs(p1[1]-p2[1])>10?0:5),l,'t-xs'+(Math.abs(p1[1]-p2[1])>10?'':' t-mid'),hot?'fill:var(--brand);font-weight:700':'')});
    for(const k of Object.keys(P)){const[x,y,w,h]=P[k],hot=on(k),term=TERM[k],lines=NODES[k];
      const isMI=k==='mi'||k==='t1'||k==='t2'||k==='proc';
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${term?12:6}" style="fill:${hot?(isMI?'var(--brand-soft)':'var(--isch-soft)'):'var(--panel)'};stroke:${hot?(isMI?'var(--brand)':'var(--isch)'):'var(--line)'};stroke-width:${hot?2.2:1.2}"/>`;
      lines.forEach((ln,i)=>{s+=txt(x+w/2,y+h/2+(i-(lines.length-1)/2)*12+3.5,ln,'t-xs t-mid',i===0||lines.length<3?'fill:var(--ink);font-weight:'+(term?700:600):'')})}
    if(cur>=0&&WH_CASES[cur].takotsubo){const[x,y,w,h]=P.acute;s+=txt(x+w/2,y+h+14,'takotsubo: classed as injury','t-xs t-mid','fill:var(--isch);font-weight:700')}
    if(!NR)s+=txt(16,320,'Teaching summary of the Fourth Universal Definition (2018), not a diagnostic tool.','t-xs');
    else s+=txt(20,532,'Teaching summary, not a diagnostic tool.','t-xs');
    fsvg.innerHTML=s}
  function cards(){box.innerHTML=WH_CASES.map((c,i)=>{const a=answers[i],ok=a&&a===c.ans;
    return `<div class="case${i===cur?' on':''}" data-case="${i}"><span class="kicker">Case ${i+1}</span><h4>${c.t}</h4><p>${c.txt}</p>
      <div class="ans" role="group" aria-label="Your answer for case ${i+1}"><button class="btn" data-wa="inj" data-i="${i}" aria-pressed="${a==='inj'}">Myocardial injury</button><button class="btn" data-wa="mi" data-i="${i}" aria-pressed="${a==='mi'}">Myocardial infarction</button></div>
      ${a?`<div class="exp"><div class="verdict ${ok?'yes':'no'}">${ok?'Right':'Not quite'}: ${c.lab}</div><p>${c.exp}</p></div>`:''}</div>`}).join('');
    const n=answers.filter((a,i)=>a&&a===WH_CASES[i].ans).length,d=answers.filter(a=>a).length;
    score.textContent=`${n} / 6`+(d<6?` (${d} answered)`:'')}
  box.addEventListener('click',e=>{const b=e.target.closest('[data-wa]');if(!b)return;const i=+b.dataset.i;answers[i]=b.dataset.wa;cur=i;
    cards();fdraw();const c=WH_CASES[i];cap.textContent=`Case ${i+1}: ${c.lab}. The highlighted path shows how the definition reaches it.`;
    const f=box.querySelector(`[data-wa="${b.dataset.wa}"][data-i="${i}"]`);f&&f.focus()});
  $('#whReset').addEventListener('click',()=>{answers.fill(null);cur=-1;cards();fdraw();cap.textContent='Choose a case to light its path.'});
  cards();fdraw();
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();fdraw()};
};
