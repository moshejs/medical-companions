/* =============== 3.6 Long-term oxygen & home ventilation =============== */
/* Three widgets: (1) the main scrubber draws survival curves from published anchor points only (MRC 5-year
   values from its abstract; NOTT 12/24-month values secondary-sourced via Arif 2022; survival = 100 − mortality),
   then LOTT, REDOX and the HOT-HMV event-free curves (anchors: 100% at 0, 50% at the published medians, 100 − the
   12-month risk at 12 months), beside a step panel; (2) a threshold explainer for the ATS 2020 severe and moderate
   hypoxaemia bands; (3) LOTT safety-event bars. Numbers from research pass F, cited in steps, captions and HTML. */
const OX_STEPS=[
 {from:0,at:.08,k:'Measure',t:'Is resting oxygen low enough?',
  txt:'ATS 2020 defines severe hypoxaemia as PaO2 ≤ 55 mm Hg (7.3 kPa) or SpO2 ≤ 88%; or PaO2 56–59 mm Hg (7.5–7.9 kPa) or SpO2 89% plus oedema, haematocrit ≥ 55% or P pulmonale on an ECG. For that group it recommends long-term oxygen for at least 15 h/day (strong recommendation) [[Jacobs2020]].',
  pt:'Home oxygen was studied in people whose oxygen level was very low while resting and breathing room air [[Jacobs2020]].',
  hook:'LTOT threshold (ATS 2020): PaO2 ≤ 55 mm Hg / SpO2 ≤ 88%, or 56–59 mm Hg / 89% with oedema, haematocrit ≥ 55% or P pulmonale [[Jacobs2020]].'},
 {from:.17,at:.3,k:'MRC 1981',t:'Oxygen vs none',
  txt:'The MRC trial randomised 87 people under 70 with severe hypoxaemia, CO2 retention and heart failure to oxygen by nasal prongs for at least 15 h daily (usually 2 L/min) or no oxygen. Over 5 years, 19 of 42 oxygen-treated patients (45%) died versus 30 of 45 controls (67%). In the 66 men, "the survival advantage of oxygen did not emerge until 500 days had elapsed" [[MRC1981]].',
  pt:'People who used oxygen at least 15 hours a day lived longer than people who had none [[MRC1981]].',
  hook:'MRC: ≥ 15 h/day oxygen vs none, 45% vs 67% dead at 5 years [[MRC1981]].'},
 {from:.34,at:.46,k:'NOTT 1980',t:'More hours, fewer deaths',
  txt:'NOTT randomised 203 people with hypoxaemic COPD to continuous or 12-hour nocturnal oxygen. Overall mortality on nocturnal oxygen was 1.94 times that on continuous oxygen (P = 0.01), "striking" in people with CO2 retention [[NOTT1980]]. Mortality was 11.9% versus 20.6% at 12 months and 22.4% versus 40.8% at 24 months, as tabulated in a systematic review; the continuous arm averaged 17.7 ± 4.8 h/day [[NOTT1980,Arif2022]].',
  pt:'Oxygen for most of the day did better than oxygen only at night [[NOTT1980]].',
  hook:'NOTT: nocturnal-only oxygen had 1.94 times the mortality of continuous oxygen [[NOTT1980]].'},
 {from:.51,at:.58,k:'LOTT 2016',t:'Milder lows do not benefit',
  txt:'LOTT followed 738 people with moderate desaturation (resting SpO2 89–93%, or desaturation only on exercise) for 1–6 years. Oxygen did not delay death or first hospitalisation (HR 0.94, 95% CI 0.79–1.12) [[Albert2016]]. In INOX, nocturnal oxygen for night-time desaturation did not change death or progression to long-term oxygen (39.0% vs 42.0%) [[Lacasse2020]]. ATS 2020 suggests not prescribing long-term oxygen for moderate hypoxaemia [[Jacobs2020]].',
  pt:'For oxygen levels that were only a little low, or low only at night or on exercise, home oxygen did not help people live longer [[Albert2016,Lacasse2020]].',
  hook:'LOTT: no benefit of oxygen for moderate desaturation (SpO2 89–93% or exercise-only), HR 0.94 [[Albert2016]].'},
 {from:.67,at:.74,k:'REDOX 2024',t:'15 hours vs 24',
  txt:'REDOX randomised 241 people starting oxygen for severe resting hypoxaemia to 24 or 15 h/day (median use 24.0 vs 15.0 h). Hospitalisation or death within 1 year did not differ: 124.7 versus 124.5 events per 100 person-years (HR 0.99, 95% CI 0.72–1.36). The authors note that the 24 h/day advice rested on the non-randomised NOTT-versus-MRC contrast [[Ekstrom2024]].',
  pt:'Using oxygen all day and night was no better over a year than using it 15 hours a day [[Ekstrom2024]].',
  hook:'REDOX: 24 h/day no better than 15 h/day at 1 year (HR 0.99) [[Ekstrom2024]].'},
 {from:.83,at:.94,k:'High CO2',t:'Add a ventilator at night',
  txt:'HOT-HMV randomised 116 people with PaCO2 > 53 mm Hg 2–4 weeks after an acidotic exacerbation to home oxygen plus home NIV or oxygen alone. Median time to readmission or death was 4.3 versus 1.4 months (adjusted HR 0.49, 95% CI 0.31–0.77), and the 12-month risk 63.4% versus 80.4% [[Murphy2017]]. In stable GOLD stage IV disease with PaCO2 ≥ 7 kPa, NIV targeting lower PaCO2 cut 1-year mortality from 33% to 12% [[Kohnlein2014]].',
  pt:'For people whose carbon dioxide stays high, a breathing machine with a mask at night kept them out of hospital for longer [[Murphy2017]].',
  hook:'HOT-HMV: home NIV + oxygen halved the hazard of readmission or death (HR 0.49) [[Murphy2017]].'}
];
const OX_TXT={
  yAx:'alive (%)',xAx:'months',yAx2:'free of readmission or death (%)',
  lg:{mo:'MRC · oxygen ≥ 15 h/day: 54.8% alive at 5 y',mc:'MRC · no oxygen: 33.3% alive at 5 y',nc:'NOTT · continuous: 77.6% alive at 24 mo',nn:'NOTT · 12 h nocturnal: 59.2% alive at 24 mo',
    hn:'HOT-HMV · oxygen + home NIV',ho:'HOT-HMV · oxygen alone'},
  pct:v=>v+'%',m500:'≈ 500 days (men)',via:'NOTT points via a 2022 review',
  lott1:'LOTT: HR 0.94 (0.79–1.12)',lott2:'moderate lows: no benefit',
  medA:'median',medB:m=>`${m} mo`,
  p0:{h:'Resting, room air',b:[['severe','PaO2 ≤ 55 mm Hg (7.3 kPa) or SpO2 ≤ 88%'],['severe if','PaO2 56–59 or SpO2 89% + oedema, haematocrit ≥ 55% or P pulmonale'],['moderate','SpO2 89–93%: ATS suggests no long-term oxygen']]},
  p1:{h:'MRC 1981',c:'≥ 15 h a day, usually 2 L/min',r1:'died in 5 years: oxygen',r2:'died in 5 years: no oxygen'},
  p2:{h:'NOTT 1980',a:'continuous',b:'12 h nocturnal',ha:'17.7 h',hb:'12 h',l:'mean hours a day',r:'mortality ratio 1.94'},
  p3:{h:'LOTT and INOX',band:'SpO2 89–93%',r1:'INOX death or LTOT: oxygen',r2:'INOX death or LTOT: sham',hr:'LOTT HR 0.94'},
  p4:{h:'REDOX 2024',a:'24 h a day',b:'15 h a day',da:'24 h',db:'15 h',r1:'events: 24 h',r2:'events: 15 h',u:'hospitalisations or deaths per 100 person-years'},
  p5:{h:'Home NIV',vent:'ventilator',mask:'mask',r1:'Köhnlein 1-year deaths: NIV',r2:'Köhnlein 1-year deaths: usual care'},
  /* threshold explainer */
  lblP:'Resting PaO2 on room air',lblS:'Resting SpO2 on room air',
  valP:v=>`${v} mm Hg`,valS:v=>`${v}%`,
  rulerP:[['≤ 55 (7.3 kPa)','bad'],['56–59','warn'],['60 and above','none']],
  rulerS:[['≤ 88','bad'],['89','warn'],['90–93','mod'],['94 and above','none']],
  mrc:'MRC entry: 40–60 mm Hg with ankle oedema',lott:'LOTT: SpO2 89–93%',
  out:{
   s1:{cls:'no',v:'Severe hypoxaemia: ATS 2020 criterion 1',p:'PaO2 ≤ 55 mm Hg (7.3 kPa) or SpO2 ≤ 88% at rest on room air. For severe chronic resting hypoxaemia, ATS 2020 recommends long-term oxygen for at least 15 h/day (strong recommendation, moderate-quality evidence) [[Jacobs2020]]. NOTT and MRC enrolled people in this range [[NOTT1980,MRC1981]].'},
   s2:{cls:'no',v:'Severe hypoxaemia: ATS 2020 criterion 2',p:'PaO2 56–59 mm Hg (7.5–7.9 kPa) or SpO2 89%, together with oedema, haematocrit ≥ 55% or P pulmonale on an ECG. ATS 2020 counts this as severe hypoxaemia, matching the NOTT entry criterion of ≤ 59 mm Hg with one of these findings [[Jacobs2020]].'},
   b2:{cls:'maybe',v:'Borderline band, no qualifying finding ticked',p:'PaO2 56–59 mm Hg or SpO2 89% meets the ATS 2020 severe definition only with oedema, haematocrit ≥ 55% or P pulmonale [[Jacobs2020]]. Tick a finding to see how the band changes.'},
   mod:{cls:'maybe',v:'Moderate hypoxaemia (SpO2 89–93%)',p:'ATS 2020 defines moderate hypoxaemia as SpO2 89–93% and suggests not prescribing long-term oxygen for it (conditional recommendation, low-quality evidence), based on LOTT, which found no difference in death or first hospitalisation (HR 0.94) [[Jacobs2020,Albert2016]]. The corresponding PaO2 was not reported in LOTT [[Jacobs2020]].'},
   hiP:{cls:'yes',v:'Above both PaO2 criteria',p:'At 60 mm Hg or more, neither ATS 2020 severe criterion is met. ATS defines moderate hypoxaemia by SpO2 (89–93%) only; the corresponding PaO2 was not reported in LOTT [[Jacobs2020]].'},
   hiS:{cls:'yes',v:'Above the moderate band',p:'SpO2 above 93% at rest is above both the severe and the moderate bands defined in ATS 2020 [[Jacobs2020]]. Cochrane found no survival benefit from home oxygen in mild to moderate hypoxaemia [[Cranston2005]].'}},
  /* safety */
  safe:[['Trips or falls over equipment',.9],['Nosebleeds',.35],['Burns from liquid-oxygen frost',.16],['Burns from smoking near oxygen',.12],['Fires',.08],['Burns from open flame',.04]],
  safeAx:'events per 100 person-years'
};
function oxTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
function oxBar(x,y,w,l,v,max,col,vl){const bw=w-70,ww=Math.max(2,bw*v/max);
  return oxTx(x,y,l,'t-xs')+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(ww)}" height="12" rx="3" style="fill:${col}"/>`+oxTx(x+bw+6,y+15,vl,'t-lbl')}
/* a 24-hour dial with the hours of oxygen shaded */
function oxDial(x,y,r,h,col,big){const a1=-Math.PI/2+2*Math.PI*clamp(h/24,0,.9999),lg=h/24>.5?1:0;
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/>`+
    `<path d="M${f1(x)} ${f1(y)}L${f1(x)} ${f1(y-r)}A${f1(r)} ${f1(r)} 0 ${lg} 1 ${f1(x+r*Math.cos(a1))} ${f1(y+r*Math.sin(a1))}Z" style="fill:${col};opacity:.55"/>`+
    oxTx(x,y+5,big,'t-lbl','','middle')}
/* polyline through anchor points [[month,value],...] cut at month m */
function oxPts(P,m){const out=[P[0]];for(let i=1;i<P.length;i++){if(P[i][0]<=m)out.push(P[i]);else{const a=P[i-1],b=P[i],u=(m-a[0])/(b[0]-a[0]);if(u>0)out.push([m,lerp(a[1],b[1],u)]);break}}return out}
inits.oxygen=()=>{
  const svg=$('#oxSvg'),rg=$('#oxT'),T=OX_TXT;
  const S={mo:[[0,100],[60,54.8]],mc:[[0,100],[60,33.3]],nc:[[0,100],[12,88.1],[24,77.6]],nn:[[0,100],[12,79.4],[24,59.2]],
    hn:[[0,100],[4.3,50],[12,36.6]],ho:[[0,100],[1.4,50],[12,19.6]]};
  const COL={mo:'var(--o2)',mc:'var(--smoke)',nc:'var(--rx)',nn:'var(--accent)',hn:'var(--co2)',ho:'var(--smoke)'};
  function draw(t){
    const N=vb(svg,'720 400','400 730'),p=phaseOf(OX_STEPS,t);
    const L=N?{gx:54,gy:44,gw:322,gh:240,px:20,py:356,pw:360,ph:360}:{gx:62,gy:36,gw:368,gh:290,px:458,py:24,pw:250,ph:356};
    const a5=ramp(t,.83,.87),xm=a5<.5?60:12,X=m=>L.gx+m/xm*L.gw,Y=v=>L.gy+(100-v)/100*L.gh;
    let s='';
    s+=axes(L.gx,L.gy,L.gw,L.gh,{xt:(xm===60?[0,12,24,36,48,60]:[0,3,6,9,12]).map(v=>[v/xm,String(v)]),yt:[0,25,50,75,100].map(v=>[v/100,String(v)]),grid:true});
    s+=oxTx(L.gx-40,L.gy-14,a5<.5?T.yAx:T.yAx2,'t-lbl')+oxTx(L.gx+L.gw,L.gy+L.gh+30,T.xAx,'t-xs','','end');
    const line=(k,m,op,mk,lbls)=>{const pts=oxPts(S[k],m);if(pts.length<2)return '';let g=`<g style="opacity:${f1(op)}"><path d="${pts.map((q,i)=>(i?'L':'M')+f1(X(q[0]))+' '+f1(Y(q[1]))).join('')}" style="fill:none;stroke:${COL[k]};stroke-width:2.6;stroke-dasharray:2 5;stroke-linecap:round"/>`;
      S[k].forEach(([mm,v],i)=>{if(mm>m+1e-6)return;g+=mk==='sq'?`<rect x="${f1(X(mm)-5)}" y="${f1(Y(v)-5)}" width="10" height="10" style="fill:${COL[k]}"/>`:`<circle cx="${f1(X(mm))}" cy="${f1(Y(v))}" r="5.5" style="fill:${COL[k]}"/>`;
        if(lbls&&i>0&&lbls[i-1])g+=lbls[i-1](X(mm),Y(v),v)});
      return g+'</g>'};
    const up=(x,y,v)=>oxTx(x+8,y-10,T.pct(v),'t-sm',`fill:var(--ink)`),dn=(x,y,v)=>oxTx(x-8,y+18,T.pct(v),'t-sm',`fill:var(--ink)`,'end');
    const legend=(items)=>{let g='';items.forEach(([k,txt],i)=>{const ly=L.gy+L.gh-14-(items.length-1-i)*16;
      g+=`<line x1="${f1(L.gx+10)}" x2="${f1(L.gx+28)}" y1="${f1(ly-4)}" y2="${f1(ly-4)}" style="stroke:${COL[k]};stroke-width:3;stroke-dasharray:2 4;stroke-linecap:round"/>`+oxTx(L.gx+34,ly,txt,'t-xs','fill:var(--ink)')});return g};
    if(a5<1){let g='';const m1=60*ramp(t,.17,.31),m2=24*ramp(t,.34,.46);
      const mrcOp=p===1?1:p===2?1-ramp(t,.34,.38):p>=3?.45:0,nOp=p===2?1:p>=3?.45:0;
      if(t>=.17){g+=line('mo',m1,mrcOp,'sq',p===1?[dn]:null)+line('mc',m1,mrcOp,'sq',p===1?[dn]:null);
        if(p===1&&m1>=16.4){const xx=X(16.4);g+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(L.gy)}" y2="${f1(L.gy+L.gh-72)}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`+oxTx(xx+4,L.gy+L.gh-76,T.m500,'t-xs')}}
      if(t>=.34){g+=line('nc',m2,nOp,'ci',p===2?[up,up]:null)+line('nn',m2,nOp,'ci',p===2?[dn,dn]:null);
        if(p===2)g+=oxTx(X(60),L.gy+14,T.via,'t-xs','fill:var(--warn)','end')}
      const it=[];if(t>=.17&&p!==2)it.push(['mo',T.lg.mo],['mc',T.lg.mc]);if(t>=.34)it.push(['nc',T.lg.nc],['nn',T.lg.nn]);g+=legend(it);
      if(p>=3){const a=ramp(t,.51,.55),bw=168,bx=X(60)-bw,by=L.gy+6;
        g+=`<g style="opacity:${f1(a)}"><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="40" rx="8" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.4"/>`+oxTx(bx+8,by+17,T.lott1,'t-xs','fill:var(--ink)')+oxTx(bx+8,by+32,T.lott2,'t-xs')+'</g>'}
      s+=`<g style="opacity:${f1(1-a5)}">${g}</g>`}
    if(a5>0){const m3=12*ramp(t,.86,.96);let g=line('hn',m3,1,'ci',null)+line('ho',m3,1,'ci',null);
      [['hn',4.3],['ho',1.4]].forEach(([k,md])=>{if(m3>=md){g+=`<path d="M${f1(X(0))} ${f1(Y(50))}H${f1(X(md))}V${f1(Y(0))}" style="fill:none;stroke:${COL[k]};stroke-width:1.2;stroke-dasharray:4 3"/>`+oxTx(X(md)+4,Y(k==='hn'?14:30),T.medA,'t-xs',`fill:var(--ink)`)+oxTx(X(md)+4,Y(k==='hn'?14:30)+12,T.medB(md),'t-xs',`fill:var(--ink)`)}});
      if(m3>=12)g+=oxTx(X(12)-8,Y(36.6)-10,T.pct(36.6),'t-sm','fill:var(--ink)','end')+oxTx(X(12)-8,Y(19.6)+18,T.pct(19.6),'t-sm','fill:var(--ink)','end');
      const it=[['hn',T.lg.hn],['ho',T.lg.ho]];let lg='';it.forEach(([k,txt],i)=>{const ly=L.gy+16+i*16;lg+=`<line x1="${f1(X(5))}" x2="${f1(X(5)+18)}" y1="${f1(ly-4)}" y2="${f1(ly-4)}" style="stroke:${COL[k]};stroke-width:3;stroke-dasharray:2 4;stroke-linecap:round"/>`+oxTx(X(5)+24,ly,txt,'t-xs','fill:var(--ink)')});
      s+=`<g style="opacity:${f1(a5)}">${g}${lg}</g>`}
    s+=oxPanel(L,t,p);
    svg.innerHTML=s;setSt(p);$('#oxNote').innerHTML=noteHTML(OX_STEPS[p]);
  }
  function oxPanel(L,t,p){const x=L.px,y=L.py,w=L.pw,h=L.ph,cx=x+w/2,wide=w>300;let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="14" style="fill:var(--panel-2);opacity:.55"/>`;
    if(p===0){const P=T.p0;g+=oxTx(x+16,y+28,P.h,'t-big');
      const cols=['var(--bad)','var(--warn)','var(--muted)'],soft=['var(--bad-soft)','var(--warn-soft)','var(--panel)'];
      P.b.forEach(([k,txt],i)=>{const by=y+48+i*96,W=wrapT(x+28,by+38,txt,wide?44:30,{cls:'t-xs',lh:13});
        g+=`<rect x="${f1(x+14)}" y="${f1(by)}" width="${f1(w-28)}" height="84" rx="10" style="fill:${soft[i]};stroke:${cols[i]};stroke-width:1.4"/>`+oxTx(x+28,by+20,k,'t-lbl',`fill:${cols[i]}`)+W.svg})}
    else if(p===1){const P=T.p1,a=ease(ramp(t,.17,.27));g+=oxTx(x+16,y+28,P.h,'t-big');
      const px=x+w*.3,py=y+176;g+=person(px,py,120,{col:'var(--o2)',cannula:true});
      g+=`<rect x="${f1(px-62)}" y="${f1(py-50)}" width="34" height="50" rx="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><circle cx="${f1(px-45)}" cy="${f1(py-34)}" r="7" style="fill:var(--o2-soft);stroke:var(--o2)"/>`;
      g+=wrapT(x+w*.52,y+80,P.c,wide?24:16,{cls:'t-sm',lh:15,style:'fill:var(--o2-ink)'}).svg;
      g+=oxBar(x+16,y+212,w-32,P.r1,45*a,80,'var(--o2)',T.pct(45))+oxBar(x+16,y+254,w-32,P.r2,67*a,80,'var(--smoke)',T.pct(67))}
    else if(p===2){const P=T.p2,a=ease(ramp(t,.34,.42)),r=wide?58:46;g+=oxTx(x+16,y+28,P.h,'t-big');
      const d1=x+w*.28,d2=x+w*.72,dy=y+120;g+=oxDial(d1,dy,r,17.7*a,'var(--rx)',P.ha)+oxDial(d2,dy,r,12*a,'var(--accent)',P.hb);
      g+=oxTx(d1,dy+r+20,P.a,'t-sm','fill:var(--ink)','middle')+oxTx(d2,dy+r+20,P.b,'t-sm','fill:var(--ink)','middle')+oxTx(cx,dy+r+40,P.l,'t-xs','','middle');
      g+=chip(cx,y+h-36,P.r,{anchor:'middle',col:'var(--accent)',fill:'var(--accent-soft)'})}
    else if(p===3){const P=T.p3,a=ease(ramp(t,.51,.58));g+=oxTx(x+16,y+28,P.h,'t-big');
      const rx0=x+20,rw=w-40,sp=v=>rx0+(v-80)/20*rw,ry=y+70;
      g+=`<rect x="${f1(rx0)}" y="${f1(ry)}" width="${f1(rw)}" height="16" rx="4" style="fill:var(--panel)"/><rect x="${f1(sp(89))}" y="${f1(ry)}" width="${f1(sp(93.5)-sp(89))}" height="16" rx="4" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      [80,85,90,95,100].forEach(v=>g+=oxTx(sp(v),ry+30,String(v),'t-xs','','middle'));g+=oxTx(sp(91.25),ry-6,P.band,'t-xs','fill:var(--warn)','middle');
      g+=oxBar(x+16,y+136,w-32,P.r1,39*a,60,'var(--o2)',T.pct(39.0))+oxBar(x+16,y+178,w-32,P.r2,42*a,60,'var(--smoke)',T.pct(42.0));
      g+=chip(cx,y+h-36,P.hr,{anchor:'middle',col:'var(--warn)',fill:'var(--warn-soft)'})}
    else if(p===4){const P=T.p4,a=ease(ramp(t,.67,.73)),r=wide?52:44;g+=oxTx(x+16,y+28,P.h,'t-big');
      const d1=x+w*.28,d2=x+w*.72,dy=y+104;g+=oxDial(d1,dy,r,24*a,'var(--o2)',P.da)+oxDial(d2,dy,r,15*a,'var(--o2)',P.db);
      g+=oxTx(d1,dy+r+18,P.a,'t-sm','fill:var(--ink)','middle')+oxTx(d2,dy+r+18,P.b,'t-sm','fill:var(--ink)','middle');
      g+=oxBar(x+16,y+212,w-32,P.r1,124.7*a,160,'var(--o2)','124.7')+oxBar(x+16,y+254,w-32,P.r2,124.5*a,160,'var(--smoke)','124.5');
      g+=wrapT(x+16,y+h-24,P.u,wide?52:40,{cls:'t-xs',lh:12}).svg}
    else{const P=T.p5,a=ease(ramp(t,.86,.93));g+=oxTx(x+16,y+28,P.h,'t-big');
      const vx=x+24,vy=y+60;g+=`<rect x="${f1(vx)}" y="${f1(vy)}" width="70" height="52" rx="8" style="fill:var(--panel);stroke:var(--co2);stroke-width:1.6"/>`;
      const br=(Math.sin(t*120)+1)/2;g+=`<rect x="${f1(vx+10)}" y="${f1(vy+12)}" width="${f1(50*br)}" height="8" rx="3" style="fill:var(--co2)"/>`+oxTx(vx+35,vy+70,P.vent,'t-xs','','middle');
      const fx=x+w-70,fy=vy+30;g+=`<circle cx="${f1(fx)}" cy="${f1(fy)}" r="26" style="fill:var(--skin);stroke:var(--muted)"/><path d="M${f1(fx-18)} ${f1(fy+2)}q18 -16 36 0q-4 18 -18 20q-14 -2 -18 -20z" style="fill:var(--co2-soft);stroke:var(--co2);stroke-width:1.6;opacity:.9"/>`+oxTx(fx,fy+44,P.mask,'t-xs','','middle');
      g+=`<path d="M${f1(vx+70)} ${f1(vy+30)}C${f1(vx+110)} ${f1(vy+70)} ${f1(fx-60)} ${f1(fy+40)} ${f1(fx-16)} ${f1(fy+12)}" style="fill:none;stroke:var(--air);stroke-width:4;stroke-dasharray:${f1(6)} 4;stroke-dashoffset:${f1(-t*400)}"/>`;
      g+=oxBar(x+16,y+176,w-32,P.r1,12*a,40,'var(--co2)',T.pct(12))+oxBar(x+16,y+218,w-32,P.r2,33*a,40,'var(--smoke)',T.pct(33))}
    return g}
  const stop=playWire(rg,$('#oxPlay'),draw,17000,'%t:player.replay%','oxygen');
  const setSt=stepWire($('#oxSteps'),OX_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- threshold explainer ---- */
  const esv=$('#oxElig'),vr=$('#oxVal');let meas='pao2';
  function classify(v){const q=$('#oxOed').checked||$('#oxHct').checked||$('#oxPp').checked,O=T.out;
    if(meas==='pao2'){if(v<=55)return O.s1;if(v<=59)return q?O.s2:O.b2;return O.hiP}
    if(v<=88)return O.s1;if(v===89)return q?O.s2:O.mod;if(v<=93)return O.mod;return O.hiS}
  function drawElig(){const N=vb(esv,'720 150','400 190'),v=+vr.value,isP=meas==='pao2';
    const lo=isP?40:80,hi=isP?75:100,x0=N?20:40,x1=N?380:680,sx=u=>x0+(u-lo)/(hi-lo)*(x1-x0),ry=N?92:74;
    const bands=isP?[[lo,55.5,'bad'],[55.5,59.5,'warn'],[59.5,hi,'none']]:[[lo,88.5,'bad'],[88.5,89.5,'warn'],[89.5,93.5,'mod'],[93.5,hi,'none']];
    const fill={bad:'var(--bad-soft)',warn:'var(--warn-soft)',mod:'var(--air-soft)',none:'var(--panel-2)'},stk={bad:'var(--bad)',warn:'var(--warn)',mod:'var(--air)',none:'var(--line)'};
    let g='';const R=isP?T.rulerP:T.rulerS;
    bands.forEach(([a,b,k],i)=>{g+=`<rect x="${f1(sx(a))}" y="${ry}" width="${f1(sx(b)-sx(a))}" height="24" style="fill:${fill[k]};stroke:${stk[k]};stroke-width:1"/>`;
      const cxm=(sx(a)+sx(b))/2;g+=oxTx(cxm,ry+40,R[i][0],'t-xs',`fill:${k==='none'?'var(--muted)':stk[k]}`,'middle')});
    const step=isP?5:2;for(let u=lo;u<=hi;u+=step)g+=`<path d="M${f1(sx(u))} ${ry+24}v5" style="stroke:var(--muted)"/>`;
    g+=oxTx(x0,ry+58,String(lo),'t-xs')+oxTx(x1,ry+58,String(hi),'t-xs','','end');
    /* trial entry bracket */
    const [ba,bb,bl]=isP?[40,60,T.mrc]:[89,93,T.lott],by=ry-18;
    g+=`<path d="M${f1(sx(ba))} ${by+8}V${by}H${f1(sx(bb))}V${by+8}" style="fill:none;stroke:var(--ink);stroke-width:1.2"/>`+oxTx(isP?sx(ba):Math.min(sx(bb),x1),by-6,bl,'t-xs','fill:var(--ink)',isP?'start':'end');
    const mx=sx(v);g+=`<path d="M${f1(mx)} ${ry-2}l-7 -12h14z" style="fill:var(--ink)"/><line x1="${f1(mx)}" x2="${f1(mx)}" y1="${ry}" y2="${ry+24}" style="stroke:var(--ink);stroke-width:2.4"/>`;
    esv.innerHTML=g;
    $('#oxValOut').textContent=isP?T.valP(v):T.valS(v);$('#oxValLbl').textContent=isP?T.lblP:T.lblS;
    vr.setAttribute('aria-valuetext',isP?T.valP(v):T.valS(v));
    const C=classify(v);$('#oxEligOut').innerHTML=`<p class="verdict ${C.cls}">${C.v}</p><p>${C.p}</p>`}
  vr.addEventListener('input',drawElig);['#oxOed','#oxHct','#oxPp'].forEach(id=>$(id).addEventListener('change',drawElig));
  $('#oxMeas').addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;meas=b.dataset.m;
    $$('[data-m]',$('#oxMeas')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(meas==='pao2'){vr.min=40;vr.max=75;vr.value=57}else{vr.min=80;vr.max=100;vr.value=89}drawElig()});
  drawElig();

  /* ---- safety bars ---- */
  const ssv=$('#oxSafe');
  function drawSafe(){const N=vb(ssv,'560 250','400 300');let g='';const rows=T.safe,rh=N?44:34,x=16,bw=N?300:300,bx=N?16:240,mx=1;
    rows.forEach(([l,v],i)=>{const y=14+i*rh;
      g+=N?oxTx(x,y+10,l,'t-xs','fill:var(--ink)'):oxTx(bx-10,y+16,l,'t-xs','fill:var(--ink)','end');
      const yy=N?y+16:y+6;g+=`<rect x="${f1(bx)}" y="${f1(yy)}" width="${f1(bw*v/mx)}" height="14" rx="3" style="fill:${i===3||i===5?'var(--fl)':i===4?'var(--bad)':'var(--o2)'}"/>`+oxTx(bx+bw*v/mx+6,yy+12,v.toFixed(2),'t-lbl')});
    const ay=14+rows.length*rh+4;g+=`<line x1="${f1(bx)}" x2="${f1(bx+bw)}" y1="${ay}" y2="${ay}" class="axis"/>`+oxTx(bx,ay+16,T.safeAx,'t-xs');
    ssv.innerHTML=g}
  drawSafe();
  const prev=redraws.oxygen;redraws.oxygen=()=>{prev&&prev();drawElig();drawSafe()};
};
