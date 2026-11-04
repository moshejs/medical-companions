/* =============== 6.1 History & people =============== */
/* Main scrubber: a four-lane timeline 1819–2024 (the stretch before 1950 compressed), vertical on phones; the
   current milestone shows in a card with a small picture from the kit. Second interactive: hepatitis C
   before and after cure, as 100-person icon arrays (van der Meer 2012). */
const HI_Y0=1819,HI_YB=1950,HI_Y1=2025,HI_UB=.12;
const hiU=y=>y<=HI_YB?(y-HI_Y0)/(HI_YB-HI_Y0)*HI_UB:HI_UB+(y-HI_YB)/(HI_Y1-HI_YB)*(1-HI_UB);
const hiYr=u=>u<=HI_UB?HI_Y0+u/HI_UB*(HI_YB-HI_Y0):HI_YB+(u-HI_UB)/(1-HI_UB)*(HI_Y1-HI_YB);
/* lane: 0 transplant, 1 scores, 2 viruses & medicines, 3 names, shunts & consensus; ic: picture in the card */
const HI_EV=[
 {y:1819,l:3,ic:'nm',t:'Laennec names cirrhosis',d:'From the Greek kirrhos, tawny, in a footnote to De l\'auscultation médiate.',c:`René Laennec named cirrhosis from the Greek <i>kirrhos</i> ("tawny") in a brief footnote to his treatise <i>De l'auscultation médiate</i>; the lesion had been recognised in England more than a century before. [[Duffin1987]]`},
 {y:1958,l:0,ic:'tx',t:'Transplant technique in dogs',d:'Francis Moore describes orthotopic liver transplantation in dogs.',c:`Francis Moore described orthotopic liver transplantation in dogs. [[Meirelles2015]]`},
 {y:1963,l:0,ic:'tx',t:'First human liver transplant',d:'Starzl and colleagues. None of the first five recipients lived beyond 23 days.',c:`Starzl and colleagues performed the first human liver transplant; none of the first five patients survived more than 23 days. [[Starzl1963,Meirelles2015]]`},
 {y:1964,l:1,ic:'sc',t:'Child–Turcotte classification',d:'Made to stratify people facing surgery for portal hypertension.',c:`Child and Turcotte published their classification in the monograph <i>Surgery and portal hypertension</i>, to stratify patients facing portal-hypertension surgery. [[ChildTurcotte1964]]`},
 {y:1965,l:2,ic:'vi',t:'A "new" antigen',d:'Blumberg, Alter and Visnich: later known as the Australia antigen of hepatitis B.',c:`Blumberg, Alter and Visnich described a "new" antigen in leukaemia sera, later known as the Australia antigen of hepatitis B. [[Blumberg1965]]`},
 {y:1967,l:0,ic:'tx',t:'A successful series begins',d:'Encouraged by Calne\'s antilymphocyte serum; 3 recipients with extended survival reported in 1968.',c:`Starzl began a successful series, encouraged by Calne's use of antilymphocyte serum; a 1968 report described extended survival in 3 recipients. [[Meirelles2015,Starzl1968Surgery]] By 1977 about 200 liver transplants had been performed worldwide. [[Meirelles2015]]`},
 {y:1969,l:3,ic:'sh',t:'An experimental transjugular shunt',d:'Rösch, Hanafee and Snow, in an experimental study.',c:`Rösch, Hanafee and Snow described transjugular portal venography and an experimental radiologic portacaval shunt. [[Rosch1969]]`},
 {y:1973,l:1,ic:'sc',t:'Child–Pugh',d:'Pugh and colleagues modify the classification, in a paper on bleeding varices.',c:`Pugh and colleagues' modification, the Child–Pugh score, appeared in a paper on oesophageal transection for bleeding oesophageal varices. [[Pugh1973]]`},
 {y:1979,l:2,ic:'rx',t:'Cyclosporin A',d:'Calne: 34 recipients of cadaveric organs, 2 of them livers.',c:`Calne reported cyclosporin A as the first immunosuppressant in 34 recipients of cadaveric organs, including 2 livers that were working at the time of the report. [[Calne1979]]`},
 {y:1981,l:0,ic:'tx',t:'Cyclosporin with prednisone',d:'Starzl reports liver transplantation using the combination.',c:`Starzl reported liver transplantation using cyclosporin A plus prednisone. [[Starzl1981NEJM]]`},
 {y:1983,l:0,ic:'cs',t:'NIH consensus conference',d:'On liver transplantation, held in June 1983.',c:`A US NIH Consensus Development Conference on liver transplantation was held in June 1983. [[NIH1984LT]]`},
 {y:1986,l:3,ic:'cs',t:'Groningen meeting',d:'The start of the consensus series on portal hypertension that became Baveno.',c:`The Baveno consensus series began with a meeting in Groningen; Baveno I followed in 1990. [[deFranchis2022BavenoVII]]`},
 {y:1989,l:2,ic:'vi',t:'Hepatitis C identified',d:'Choo, Houghton and colleagues clone the blood-borne non-A, non-B agent.',c:`Choo, Houghton and colleagues isolated a cDNA clone from the blood-borne non-A, non-B hepatitis agent, now known as hepatitis C virus. [[Choo1989]]`},
 {y:1989.4,l:3,ic:'sh',t:'The first TIPS in a person',d:'Heidelberg: a stent shunt placed by interventional radiology; gradient 38 → 18 mmHg.',c:`Richter and colleagues in Heidelberg reported the first stent-supported transjugular intrahepatic portosystemic shunt done entirely by interventional radiology: a 49-year-old man with Child C cirrhosis whose gradient fell from 38 to 18 mmHg. Their 1990 pilot of 9 patients used Palmaz stents. [[Richter1989Radiologe,Richter1990CVIR]]`},
 {y:1990,l:2,ic:'rx',t:'Tacrolimus',d:'Follows Starzl\'s 1989 report: 1,179 transplants, 73% alive at 1 year.',c:`In 1989 Starzl reported 1,179 consecutive liver transplants with 73% 1-year and 64% 5-year survival; tacrolimus followed in 1990. [[Meirelles2015]]`},
 {y:2000,l:1,ic:'sc',t:'The Mayo TIPS model',d:'Bilirubin, creatinine, INR and cause predicted survival after TIPS: the seed of MELD.',c:`MELD began as the Mayo TIPS model: bilirubin, creatinine, INR and the cause of liver disease predicted survival in 231 patients having elective TIPS. [[Malinchoc2000]]`},
 {y:2001,l:1,ic:'sc',t:'MELD validated',d:'In 4 independent groups; c-statistics 0.78–0.87 for death at 3 months.',c:`The model was validated as MELD in 4 independent groups, with c-statistics for 3-month death of 0.78 to 0.87. [[Kamath2001MELD]]`},
 {y:2003,l:1,ic:'sc',t:'MELD and donor livers',d:'Among 3,437 waiting-list candidates, MELD beat Child–Turcotte–Pugh (0.83 vs 0.76).',c:`In 3,437 US waiting-list candidates, 3-month mortality was 1.9% at MELD below 9 and 71.3% at MELD 40 or above; the c-statistic of 0.83 against 0.76 for Child–Turcotte–Pugh supported MELD-based allocation of donor livers. [[Wiesner2003]]`},
 {y:2008,l:1,ic:'sc',t:'MELD-Na',d:'Serum sodium adds to MELD in predicting death on the waiting list.',c:`Serum sodium predicted waiting-list death on top of MELD (HR 1.05 per 1 mmol/L fall between 125 and 140). [[Kim2008MELDNa]]`},
 {y:2013,l:2,ic:'rx',t:'Sofosbuvir approved',d:'FDA approval on 6 December 2013. The same year, CANONIC defines ACLF.',c:`The FDA first approved sofosbuvir (Sovaldi) on 6 December 2013; in its phase 3 trials, 90% of untreated patients given 12 weeks with peginterferon–ribavirin had SVR. [[FDA-Sovaldi,Lawitz2013]] The CANONIC study defined acute-on-chronic liver failure the same year. [[Moreau2013CANONIC]]`},
 {y:2014,l:2,ic:'rx',t:'Interferon-free treatment',d:'Ledipasvir/sofosbuvir approved on 10 October 2014.',c:`The FDA first approved the interferon-free combination ledipasvir/sofosbuvir (Harvoni) on 10 October 2014. [[FDA-Harvoni]]`},
 {y:2020,l:2,ic:'vi',t:'Nobel Prize for hepatitis C',d:'Harvey Alter, Michael Houghton and Charles Rice.',c:`Harvey Alter, Michael Houghton and Charles Rice shared the 2020 Nobel Prize in Physiology or Medicine for the discovery of hepatitis C virus; WHO set a goal of global elimination by 2030. [[Lin2021Nobel]]`},
 {y:2021,l:1,ic:'sc',t:'MELD 3.0 and Baveno VII',d:'MELD adds female sex and albumin; Baveno VII meets in October.',c:`MELD 3.0 added female sex and albumin, interaction terms and a creatinine cap of 3.0 mg/dL (C-statistic 0.869 vs 0.862 for MELD-Na). [[Kim2021MELD3]] The Baveno VII workshop met in October 2021. [[deFranchis2022BavenoVII]]`},
 {y:2023,l:3,ic:'nm',t:'MASLD, and MELD 3.0 in use',d:'NAFLD renamed MASLD; US allocation moves to MELD 3.0 in July.',c:`A multisociety Delphi consensus renamed NAFLD as MASLD and created MetALD. [[Rinella2023MASLD]] The US replaced MELD-Na with MELD 3.0 for allocation in July 2023, partly to narrow the sex gap in access; US liver transplants reached a record 10,659 that year. [[Kwong2025OPTN]]`},
 {y:2024,l:2,ic:'rx',t:'Resmetirom',d:'Approved for noncirrhotic MASH with moderate to advanced fibrosis (F2–F3).',c:`Resmetirom received US accelerated approval, with diet and exercise, for adults with noncirrhotic MASH and F2–F3 fibrosis; the label says to avoid it in decompensated cirrhosis. [[FDA-Rezdiffra]] In MAESTRO-NASH, fibrosis improved by at least one stage in 24.2–25.9% vs 14.2% on placebo at 52 weeks. [[Harrison2024MAESTRO]]`}];
const HI_LANES=['Transplant','Scores','Viruses & medicines','Names, shunts, consensus'];
const HI_LN=[['transplant'],['scores'],['virus &','drugs'],['names &','shunts']];
const HI_STEPS=[
 {from:0,at:0,y0:1819,k:'1819',t:'A name',
  txt:`Laennec gave cirrhosis its name in 1819 in a footnote. [[Duffin1987]] For more than a century after that, there was little to offer but description: the scale here is compressed until 1950.`,
  pt:`"Cirrhosis" comes from a Greek word for an orange-yellow, tawny colour: the colour of the scarred liver. [[Duffin1987]]`,
  hook:`Laennec coined "cirrhosis" in 1819, from Greek <i>kirrhos</i>, "tawny". [[Duffin1987]]`},
 {from:hiU(1955),at:hiU(1963.2),y0:1958,k:'1958–1969',t:'First transplants, first scores',
  txt:`Within a decade came the transplant technique in dogs (1958), Starzl's first human liver transplant (1963), the Child–Turcotte classification for surgery in portal hypertension (1964), the antigen later tied to hepatitis B (1965), the first successful transplant series (1967) and an experimental transjugular shunt (1969). [[Meirelles2015,Starzl1963,ChildTurcotte1964,Blumberg1965,Rosch1969]]`,
  pt:`The first liver transplants did not succeed for long, but they showed it could be done. [[Meirelles2015]]`,
  hook:`Starzl: first human liver transplant 1963, first successful series 1967. [[Meirelles2015]]`},
 {from:hiU(1971),at:hiU(1973.2),y0:1973,k:'1973–1990',t:'Making it work',
  txt:`Pugh's modification gave Child–Pugh (1973). [[Pugh1973]] Cyclosporin (1979, 1981) and then tacrolimus (1990) made transplant survivable for many: Starzl's 1,179 transplants reported in 1989 had 73% 1-year survival. [[Calne1979,Starzl1981NEJM,Meirelles2015]] 1989 also brought the identification of hepatitis C and the first TIPS in a person. [[Choo1989,Richter1989Radiologe]]`,
  pt:`Medicines that calm the immune system turned transplant from an experiment into a treatment. [[Meirelles2015]]`,
  hook:`The first stent-supported TIPS was placed in Heidelberg in 1989 (Richter, Palmaz stents). [[Richter1989Radiologe]]`},
 {from:hiU(1997),at:hiU(2000.2),y0:2000,k:'2000–2008',t:'MELD',
  txt:`A model built to predict survival after TIPS (2000) became the Model for End-Stage Liver Disease, validated in 2001, and was used to rank people for donor livers. Sodium was added in 2008. [[Malinchoc2000,Kamath2001MELD,Wiesner2003,Kim2008MELDNa]] Across 119 studies, Child–Pugh and MELD had similar prognostic value in most settings. [[Peng2016ChildMELD]]`,
  pt:`MELD is a number made from a few blood tests. It helps decide who most urgently needs a donor liver. Try the teaching calculator in <a href="#scores" data-go="scores">Child–Pugh &amp; MELD</a>.`,
  hook:`MELD was born from a TIPS survival model (2000) using bilirubin, creatinine and INR. [[Malinchoc2000,Kamath2001MELD]]`},
 {from:hiU(2011),at:hiU(2013.2),y0:2013,k:'2013–2020',t:'Curing hepatitis C',
  txt:`Sofosbuvir (December 2013) and the interferon-free ledipasvir/sofosbuvir (October 2014) opened the era of tablet cures. [[FDA-Sovaldi,FDA-Harvoni]] The 2020 Nobel Prize honoured the discovery of the virus; antivirals now clear it in up to 95% of those treated. [[Lin2021Nobel]] ACLF was defined in 2013. [[Moreau2013CANONIC]]`,
  pt:`Hepatitis C went from a lifelong infection to one that a course of tablets can cure in most people. [[Lin2021Nobel]]`,
  hook:`Hepatitis C was discovered in 1989; the discovery won the 2020 Nobel Prize. [[Choo1989,Lin2021Nobel]]`},
 {from:hiU(2020.6),at:hiU(2021.2),y0:2021,k:'2021–2024',t:'New names, new tools',
  txt:`MELD 3.0 (2021) added female sex and albumin and was adopted for US allocation in July 2023. Baveno VII (2021) renewed the consensus on portal hypertension. MASLD replaced NAFLD in 2023. Resmetirom was approved in 2024 for noncirrhotic MASH with F2–F3 fibrosis. [[Kim2021MELD3,Kwong2025OPTN,deFranchis2022BavenoVII,Rinella2023MASLD,FDA-Rezdiffra]]`,
  pt:`Names and scores keep changing as the evidence grows, often to make care fairer, as MELD 3.0 did for women. [[Kwong2025OPTN]]`,
  hook:`MELD-Na 2008; MELD 3.0 added female sex and albumin, US adoption July 2023. [[Kim2008MELDNa,Kim2021MELD3,Kwong2025OPTN]]`}];
const HI_HCV={no:{t:'No cure (no SVR)',v:[26.0,29.9,21.8]},svr:{t:'Cured (SVR)',v:[8.9,2.1,5.1]}};

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),now=$('#hiNow'),chips=$('#hiYears');
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L};
  const LC=['var(--rx)','var(--dx)','var(--portal)','var(--liver)'];
  const yrTxt=y=>String(Math.floor(y));
  function virus(x,y,r){let g='';for(let i=0;i<10;i++){const a=i/10*2*Math.PI;g+=`<line x1="${f1(x+Math.cos(a)*r)}" y1="${f1(y+Math.sin(a)*r)}" x2="${f1(x+Math.cos(a)*r*1.35)}" y2="${f1(y+Math.sin(a)*r*1.35)}" style="stroke:var(--portal);stroke-width:2"/><circle cx="${f1(x+Math.cos(a)*r*1.4)}" cy="${f1(y+Math.sin(a)*r*1.4)}" r="${f1(r*.1+1)}" style="fill:var(--portal)"/>`}
    return g+`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--portal-soft);stroke:var(--portal);stroke-width:2"/><path d="M${f1(x-r*.5)} ${f1(y)}q${f1(r*.25)} ${f1(-r*.4)} ${f1(r*.5)} 0t${f1(r*.5)} 0" style="fill:none;stroke:var(--portal);stroke-width:1.5"/>`}
  function pic(e,x,y,s){/* (x,y) centre, s scale ~1 = 120 wide box */
    switch(e.ic){
      case 'nm':return e.y<1900?liver(x,y,.62*s,{fib:4,seed:3}).svg+T(x,y+50*s,'kirrhos: tawny','t-xs t-mid','fill:var(--accent)'):liver(x,y,.58*s,{fib:1.2,seed:5}).svg+T(x,y+48*s,'MASLD','t-xs t-mid','fill:var(--accent)');
      case 'tx':return liver(x-6*s,y-4*s,.5*s,{fib:0,seed:8}).svg+`<path d="M${f1(x+34*s)} ${f1(y-30*s)}v${f1(24*s)}M${f1(x+22*s)} ${f1(y-18*s)}h${f1(24*s)}" style="stroke:var(--rx);stroke-width:${f1(5*s)};stroke-linecap:round"/>`+T(x,y+44*s,'new liver','t-xs t-mid');
      case 'sc':return gauge(x,y+22*s,40*s,e.y<1990?2:e.y<2010?3:3.6,4,{ends:false,label:e.y<1990?'Child':'MELD',bands:[{to:1.5,col:'var(--rx-soft)'},{to:3,col:'var(--accent-soft)'},{to:4,col:'var(--bad-soft)'}]});
      case 'vi':return virus(x,y,20*s)+T(x,y+44*s,e.y<1980?'hepatitis B':'hepatitis C','t-xs t-mid');
      case 'rx':return pill(x-14*s,y-6*s,40*s,{ang:-24,col:'var(--rx)'})+pill(x+20*s,y+10*s,26*s,{round:true,col:'var(--rx)'})+T(x,y+44*s,e.y<1995?'anti-rejection':'antiviral','t-xs t-mid');
      case 'sh':return portalMap(x,y+6*s,.38*s,{pressure:.7,tips:e.y>1980?1:.5,labels:false,flow:.3}).svg;
      default:return `<rect x="${f1(x-30*s)}" y="${f1(y-30*s)}" width="${f1(48*s)}" height="${f1(60*s)}" rx="4" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(x-18*s)}" y="${f1(y-24*s)}" width="${f1(48*s)}" height="${f1(60*s)}" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/>`+[0,1,2,3].map(i=>`<line x1="${f1(x-10*s)}" x2="${f1(x+22*s)}" y1="${f1(y-12*s+i*11*s)}" y2="${f1(y-12*s+i*11*s)}" style="stroke:var(--muted);stroke-width:1.5"/>`).join('')+T(x,y+46*s,'consensus','t-xs t-mid')}}
  const curIdx=t=>{let k=0;HI_EV.forEach((e,i)=>{if(hiU(e.y)<=t+1e-6)k=i});return k};
  let setActive=()=>{},lastK=-1;
  function draw(t){const N=vb(svg,'720 380','400 560'),p=phaseOf(HI_STEPS,t),P=HI_STEPS[p],k=curIdx(t),E=HI_EV[k],yr=hiYr(t);
    let s=T(N?20:28,26,P.t,'t-big','font-size:19px')+T(N?20:28,44,P.k,'t-sm');
    /* the card */
    const C=N?{x:16,y:56,w:368,h:166}:{x:28,y:58,w:664,h:148};
    const fresh=clamp((t-hiU(E.y))/.012);
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="12" style="fill:var(--field);stroke:${LC[E.l]};stroke-width:${f1(1+1.2*(1-fresh))}"/>`;
    s+=`<rect x="${C.x}" y="${C.y}" width="6" height="${C.h}" rx="3" style="fill:${LC[E.l]}"/>`;
    s+=`<g>`+pic(E,N?C.x+C.w-62:C.x+84,C.y+C.h/2-(N?14:6),N?.8:1)+'</g>';
    const tx=N?C.x+20:C.x+176,ml=N?34:62;
    s+=`<text x="${tx}" y="${C.y+(N?36:40)}" class="t-big" style="font-size:${N?28:32}px;fill:${LC[E.l]}">${yrTxt(E.y)}</text>`;
    s+=T(tx+(N?0:96),C.y+(N?60:36),E.t,'t-lbl',N?'':'font-size:15px');
    s+=T(tx+(N?0:96),C.y+(N?76:54),HI_LANES[E.l],'t-xs');
    wrap(E.d,N?ml:ml).forEach((l,i)=>{s+=T(tx,C.y+(N?98:84)+i*16,l,'t-sm','fill:var(--ink)')});
    if(N){/* vertical timeline: years run down the page */
      const Y0=262,Y1=546,X0=66,Y=u=>Y0+(Y1-Y0)*u,LX=[110,162,214,266];
      HI_STEPS.forEach((q,i)=>{const a=Y(hiU(q.y0)),b=i<5?Y(HI_STEPS[i+1].from):Y1;s+=`<rect x="${X0}" y="${f1(Y(q.from))}" width="${384-X0}" height="${f1(b-Y(q.from))}" style="fill:${i%2?'var(--panel-2)':'var(--field)'};opacity:.6"/>`+T(380,Y(q.from)+12,q.k,'t-xs t-end')});
      s+=`<line x1="${X0}" x2="${X0}" y1="${Y0}" y2="${Y1}" class="axis"/>`;
      [1819,1950,1960,1970,1980,1990,2000,2010,2020].forEach(v=>{const yy=Y(hiU(v));s+=`<line x1="${X0-4}" x2="${X0}" y1="${f1(yy)}" y2="${f1(yy)}" class="axis"/>`+T(X0-7,yy+3,v,'t-xs t-end')});
      s+=T(X0-7,Y(HI_UB/2)+3,'≈','t-sm t-end');
      HI_LN.forEach((l,i)=>{l.forEach((w,j)=>{s+=T(LX[i],Y0-14+j*10-(l.length-1)*10,w,'t-xs t-mid',`fill:${LC[i]}`)});s+=`<line x1="${LX[i]}" x2="${LX[i]}" y1="${Y0}" y2="${Y1}" style="stroke:${LC[i]};stroke-width:1;opacity:.25"/>`});
      HI_EV.forEach((e,i)=>{const yy=Y(hiU(e.y)),on=hiU(e.y)<=t+1e-6,c=i===k;s+=`<circle cx="${LX[e.l]}" cy="${f1(yy)}" r="${c?6.5:4}" style="fill:${on?LC[e.l]:'var(--panel)'};stroke:${LC[e.l]};stroke-width:1.6"/>`;
        if(c)s+=`<circle cx="${LX[e.l]}" cy="${f1(yy)}" r="11" style="fill:none;stroke:${LC[e.l]};stroke-width:1.4;opacity:.6"/>`});
      const py=Y(t);s+=`<line x1="${X0}" x2="384" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/><rect x="${X0+222}" y="${f1(py-9)}" width="40" height="16" rx="8" style="fill:var(--ink)"/>`+T(X0+242,py+3,Math.round(yr),'t-xs t-mid','fill:var(--bg);font-weight:700')}
    else{/* horizontal timeline in four lanes */
      const X0=162,X1=700,X=u=>X0+(X1-X0)*u,LY=[290,312,334,356],AY=258;
      HI_STEPS.forEach((q,i)=>{const b=i<5?X(HI_STEPS[i+1].from):X1;s+=`<rect x="${f1(X(q.from))}" y="226" width="${f1(b-X(q.from))}" height="20" style="fill:${i%2?'var(--panel-2)':'var(--brand-soft)'};opacity:.8"/>`;
        if(b-X(q.from)>40)s+=T((X(q.from)+b)/2,240,q.k,'t-xs t-mid','fill:var(--ink)')});
      s+=`<line x1="${X0}" x2="${X1}" y1="${AY}" y2="${AY}" class="axis"/>`;
      [1950,1960,1970,1980,1990,2000,2010,2020].forEach(v=>{const xx=X(hiU(v));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${AY-3}" y2="${AY+3}" class="axis"/>`+T(xx,AY+14,v,'t-xs t-mid')});
      s+=T(X0,AY+14,'1819','t-xs t-mid')+T(X(HI_UB/2),AY-4,'≈ compressed','t-xs t-mid');
      HI_LANES.forEach((l,i)=>{s+=T(X0-10,LY[i]+3,l,'t-xs t-end',`fill:${LC[i]}`)+`<line x1="${X0}" x2="${X1}" y1="${LY[i]}" y2="${LY[i]}" style="stroke:${LC[i]};stroke-width:1;opacity:.25"/>`});
      HI_EV.forEach((e,i)=>{const xx=X(hiU(e.y)),on=hiU(e.y)<=t+1e-6,c=i===k;s+=`<circle cx="${f1(xx)}" cy="${LY[e.l]}" r="${c?6.5:4}" style="fill:${on?LC[e.l]:'var(--panel)'};stroke:${LC[e.l]};stroke-width:1.6"/>`;
        if(c)s+=`<circle cx="${f1(xx)}" cy="${LY[e.l]}" r="11" style="fill:none;stroke:${LC[e.l]};stroke-width:1.4;opacity:.6"/>`});
      const px=X(t);s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="222" y2="366" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/><rect x="${f1(px-20)}" y="208" width="40" height="16" rx="8" style="fill:var(--ink)"/>`+T(px,220,Math.round(yr),'t-xs t-mid','fill:var(--bg);font-weight:700')}
    svg.innerHTML=s;
    note.innerHTML=noteHTML(P);setActive(p);
    if(k!==lastK){lastK=k;now.innerHTML=`<b>${yrTxt(E.y)}</b>${E.c}`;$$('[data-hy]',chips).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hy===k))}
    rg.setAttribute('aria-valuetext',`${Math.round(yr)}: ${E.t}`)}
  const stop=playWire(rg,$('#hiPlay'),draw,32000,'%t:player.replay%','history');
  setActive=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  chips.innerHTML=HI_EV.map((e,i)=>`<button class="tag" data-hy="${i}" aria-pressed="false">${yrTxt(e.y)} · ${e.t}</button>`).join('');
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=hiU(HI_EV[+b.dataset.hy].y)+.0005;rg.value=v;draw(v)});
  draw(+rg.value);

  /* hepatitis C before and after cure */
  const hs=$('#hiHcv'),hn=$('#hiHcvNote');let hk='no',cur=HI_HCV.no.v.slice(),stopH=null;
  const LBL=[['Death from any cause','10 years'],['Liver failure','10 years'],['Liver cancer (HCC)','10 years']];
  function drawH(v){const N=vb(hs,'720 290','400 520');let s='';
    v.forEach((x,j)=>{const A=N?{x:20,y:20+j*168,d:13.5,s:11}:{x:24+j*236,y:44,d:19,s:15};
      const n=Math.round(x);
      s+=T(A.x,A.y-(N?6:22),LBL[j][0],'t-lbl')+(N?'':T(A.x,A.y-8,'per 100 people, '+LBL[j][1],'t-xs'));
      for(let i=0;i<100;i++){const px=A.x+(i%10)*A.d+A.d/2,py=A.y+(N?6:0)+Math.floor(i/10)*A.d;s+=person(px,py,A.s,i<n?(hk==='svr'?'var(--rx)':'var(--bad)'):'var(--panel-2)')}
      const bx=N?A.x+10*A.d+22:A.x,by=N?A.y+48:A.y+10*A.d+30;
      s+=`<text x="${f1(bx)}" y="${f1(by)}" class="t-big" style="font-size:${N?30:26}px;fill:${hk==='svr'?'var(--rx)':'var(--bad)'}">${f1(x)}</text>`+T(bx+(N?0:62),by+(N?18:-2),N?'per 100 at 10 years':'per 100','t-xs')});
    hs.innerHTML=s}
  function setH(k){hk=k;$$('[data-hc]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.hc===k));if(stopH)stopH();
    const a=cur.slice(),B=HI_HCV[k].v;stopH=animate(800,q=>{const e=ease(q);cur=a.map((x,i)=>lerp(x,B[i],e));drawH(cur)},()=>{stopH=null});
    hn.innerHTML=noteHTML({k:'Van der Meer 2012 · 530 people',t:HI_HCV[k].t,
      txt:k==='svr'?`With SVR, 10-year all-cause mortality was 8.9%, liver failure 2.1% and liver cancer 5.1%; liver-related death or transplant was 1.9% against 27.4% without SVR (HR 0.26 for all-cause death). [[vanderMeer2012]]`:`Without SVR, 10-year all-cause mortality was 26.0%, liver failure 29.9% and liver cancer 21.8% in this cohort of people with advanced fibrosis or cirrhosis. [[vanderMeer2012]]`,
      pt:k==='svr'?'Curing hepatitis C lowers the chance of liver failure and death a great deal. The risk of liver cancer goes down but does not go away, so checks continue. [[Kanwal2017]]':'Before tablets that cure, many people with hepatitis C and advanced scarring went on to liver failure or cancer.',
      hook:'SVR in hepatitis C with advanced fibrosis cut 10-year all-cause mortality from 26.0% to 8.9%. [[vanderMeer2012]]'})}
  $$('[data-hc]').forEach(b=>b.addEventListener('click',()=>setH(b.dataset.hc)));
  drawH(cur);setH('no');
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();drawH(cur)};
  const prevH=onHide.history;onHide.history=()=>{prevH&&prevH();if(stopH){stopH();stopH=null}};
};
