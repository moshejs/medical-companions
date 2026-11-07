/* =============== 3.4 Stopping smoking & vaccines =============== */
/* Two widgets: (1) the main scrubber draws the Lung Health Study FEV1 lines (continuing smoker at the published
   62 mL/yr; quitter +47 mL in year 1 then 31 mL/yr) beside a step panel (smoking, the quit, the slopes, quit-rate
   bars, long-term mortality, vaccines); (2) a comparison explorer drawing published RRs/ORs with 95% CIs on a log
   scale, plus EAGLES neuropsychiatric event rates as bars. Every number is from research pass F, cited in the
   step text, the captions or the HTML. */
const QT_STEPS=[
 {from:0,at:.1,k:'The damage',t:'Smoking speeds lung loss',
  txt:'The Lung Health Study randomised 5887 smokers aged 35–60 with spirometric signs of early COPD [[Anthonisen1994]]. Among them, people who kept smoking lost FEV1 at 62 ± 55 mL a year (mean ± SD) [[Scanlon2000]].',
  pt:'While smoking continued, the amount of air people could blow out in one second fell year after year [[Scanlon2000]].',
  hook:'Continuing smokers in the Lung Health Study lost about 62 mL of FEV1 a year [[Scanlon2000]].'},
 {from:.17,at:.27,k:'The quit',t:'A small rebound',
  txt:'In 3818 participants with analysable results, people who stopped smoking gained an average of 47 mL (2%) of FEV1 in the year after quitting [[Scanlon2000]]. In a varenicline trial in COPD, FEV1 at week 12 rose by 121.8 mL in continuous abstainers versus 37.9 mL in continuing smokers; the difference was no longer significant at weeks 24 or 52 [[Tashkin2011RespirMed]].',
  pt:'In the first year after stopping, lung function went up a little on average [[Scanlon2000]].',
  hook:'Year 1 after quitting: FEV1 +47 mL (2%) on average [[Scanlon2000]].'},
 {from:.34,at:.47,k:'The slope changes',t:'Decline halves',
  txt:'After the first year, sustained quitters lost 31 ± 48 mL a year versus 62 ± 55 mL in continuing smokers, which the authors described as comparable to never-smokers [[Scanlon2000]]. Fletcher and Peto: a susceptible smoker who stops "will not recover his lung function, but the average further rates of loss of FEV1 will revert to normal" [[Fletcher1977]].',
  pt:'Quitting does not give back lung that is already lost, but it slows the loss to about half the speed [[Scanlon2000,Fletcher1977]].',
  hook:'After quitting, FEV1 decline roughly halves (62 → 31 mL/yr); lost function is not regained [[Scanlon2000,Fletcher1977]].'},
 {from:.52,at:.6,k:'Getting help',t:'Medicines plus support',
  txt:'In a Cochrane review of 16 trials in smokers with COPD, medicine plus high-intensity behavioural treatment beat placebo plus the same behavioural treatment (RR 2.53, 95% CI 1.83–3.50; high-quality evidence) [[vanEerd2016]]. In 504 smokers with mild to moderate COPD, continuous abstinence over weeks 9–12 was 42.3% with varenicline versus 8.8% with placebo, and 18.6% versus 5.6% over weeks 9–52 [[Tashkin2011Chest]].',
  pt:'Stop-smoking medicines together with regular support more than doubled the chance of quitting in people with COPD [[vanEerd2016]].',
  hook:'COPD: pharmacotherapy + high-intensity support vs placebo + same support, RR 2.53 [[vanEerd2016]].'},
 {from:.68,at:.76,k:'Long term',t:'Fewer deaths',
  txt:'By 5 years, 21.7% of the special-intervention group had stopped smoking versus 5.4% with usual care. After up to 14.5 years, all-cause mortality was 8.83 versus 10.38 per 1000 person-years (P = 0.03; HR for usual care 1.18, 95% CI 1.02–1.37). The authors conclude that cessation programmes "can have a substantial effect on subsequent mortality, even when successful in a minority of participants" [[Anthonisen2005]].',
  pt:'Years later, fewer people had died in the group offered help to quit, even though most of them did not manage to stop for good [[Anthonisen2005]].',
  hook:'Lung Health Study at 14.5 years: 8.83 vs 10.38 deaths per 1000 person-years [[Anthonisen2005]].'},
 {from:.84,at:.92,k:'Protect',t:'Vaccines',
  txt:'GOLD 2023 lists influenza, pneumococcal, COVID-19, pertussis and herpes zoster vaccines, depending on local guidelines [[Agusti2023]]. In June 2024, ACIP recommended a single dose of an RSV vaccine for all adults aged ≥ 75 and for adults aged 60–74 at increased risk of severe RSV disease [[Britton2024]]. Pneumococcal vaccination in COPD lowered the odds of an exacerbation (OR 0.60; NNTB 8) [[Walters2017]].',
  pt:'Vaccines against flu, pneumonia germs, RSV and COVID-19 can help prevent chest infections and flare-ups [[Agusti2023,Walters2017]].',
  hook:'Pneumococcal vaccine in COPD: NNTB 21 for pneumonia, 8 for an exacerbation [[Walters2017]].'}
];
const QT_TXT={
  chartT:'FEV1 change from the start (mL)',years:'years',start:'starting level',quitDay:'quit day',
  smoker:'continuing smoker',quitter:'sustained quitter',
  slopeS:'−62 mL a year',slopeQ:'−31 mL a year',rebound:'+47 mL in year 1',
  gap:mL=>`gap at 5 years: ${mL} mL`,gapSub:'computed from the mean rates',notBack:'lost function is not regained',
  read:(y,s,q)=>q==null?`Year ${y}: continuing smoker <b>${s} mL</b> · computed from the published mean rate`:
    `Year ${y}: continuing smoker <b>${s} mL</b> · sustained quitter <b>${q} mL</b> · computed from the published mean rates`,
  p0:{h:'Keeps smoking',l:'tobacco smoke, year after year'},
  p1:{h:'Stops smoking',big:'+47 mL',l1:'average FEV1 gain',l2:'in the year after quitting'},
  p2:{h:'The slope after year 1',a:'smoking: 62 mL a year',b:'after quitting: 31 mL a year',c:'half the rate'},
  p3:{h:'Varenicline in COPD',r1:'weeks 9–12: varenicline',r2:'weeks 9–12: placebo',r3:'weeks 9–52: varenicline',r4:'weeks 9–52: placebo',
    l:'continuous abstinence, 504 smokers',rr:'medicine + support: RR 2.53'},
  p4:{h:'Lung Health Study',r1:'stopped for good: programme',r2:'stopped for good: usual care',r3:'deaths: programme',r4:'deaths: usual care',
    u1:'%',u2:'per 1000 person-years'},
  p5:{h:'Vaccines in guidance',v:['Influenza','Pneumococcal','COVID-19','Pertussis','Herpes zoster','RSV'],
    s:['GOLD 2023','GOLD 2023','GOLD 2023','GOLD 2023','GOLD 2023','ACIP 2024'],l:'depending on local guidelines'},
  pct:v=>v+'%',
  /* comparison explorer */
  fav1:'favours the first option →',fav0:'← favours the comparator',
  off:'off scale →',
  rr:(k,v,lo,hi)=>lo==null?`${k} ${v.toFixed(2)}`:`${k} ${v.toFixed(2)} (95% CI ${lo.toFixed(2)}–${hi.toFixed(2)})`,
  safeLeg:['without psychiatric disorder','with psychiatric disorder'],safeAx:'moderate or severe neuropsychiatric adverse events (%)',
  sets:{
   copd:{k:'RR',cap:'Smokers with COPD, Cochrane 2016 (16 trials, 13,123 participants). The review found "no convincing evidence for preferring any particular form" of behavioural or drug treatment [[vanEerd2016]].',
    rows:[['Medicine + intensive support vs placebo + same',2.53,1.83,3.50],['Varenicline vs placebo',3.34,1.88,5.92],['Nicotine sublingual tablet vs placebo',2.60,1.29,5.24],
      ['Bupropion vs placebo (pooled)',2.03,1.26,3.28],['Intensive vs low-intensity behavioural',2.18,null,null],['Intensive behavioural vs usual care',25.38,8.03,80.22]]},
   all:{k:'RR',cap:'All smokers, long-term abstinence: varenicline and cytisine [[LivingstoneBanks2023]]; nicotine replacement, 133 trials [[HartmannBoyce2018]]; medicines plus behavioural support versus usual care or brief advice, 52 trials [[Stead2016]]. The NRT review concluded that NRTs "increase the rate of quitting by 50% to 60%, regardless of setting" [[HartmannBoyce2018]].',
    rows:[['Varenicline vs placebo',2.32,2.15,2.51],['Cytisine vs placebo',1.30,1.15,1.47],['Any NRT vs control',1.55,1.49,1.61],['NRT patch vs control',1.64,null,null],
      ['NRT gum vs control',1.49,null,null],['NRT tablet or lozenge vs control',1.52,null,null],['NRT inhalator vs control',1.90,null,null],['NRT nasal spray vs control',2.02,null,null],
      ['Medicines + support vs usual care',1.83,1.68,1.98]]},
   h2h:{k:'RR',cap:'Head to head: varenicline comparisons from the Cochrane review (no clear difference against two forms of NRT; low certainty) [[LivingstoneBanks2023]]; e-cigarettes versus NRT from the 2024 Cochrane review [[Lindson2024]] and one NHS trial [[Hajek2019]].',
    rows:[['Varenicline vs bupropion',1.36,null,null],['Varenicline vs single-form NRT',1.25,null,null],['Varenicline vs dual-form NRT',1.02,0.87,1.20],
      ['Nicotine e-cigarette vs NRT (review)',1.59,1.29,1.93],['Refillable e-cigarette vs NRT (one trial)',1.83,1.30,2.58]]},
   eagles:{k:'OR',cap:'EAGLES, 8144 motivated smokers with and without psychiatric disorders, 12 weeks of treatment. Odds ratios for abstinence as published; confidence intervals are not given in this guide\'s research [[Anthenelli2016]].',
    rows:[['Varenicline vs placebo',3.61,null,null],['Varenicline vs nicotine patch',1.68,null,null],['Varenicline vs bupropion',1.75,null,null],
      ['Nicotine patch vs placebo',2.15,null,null],['Bupropion vs placebo',2.07,null,null]]},
   safety:{cap:'EAGLES neuropsychiatric safety: moderate and severe neuropsychiatric adverse events by arm and cohort. None of the varenicline–placebo or bupropion–placebo differences was statistically significant [[Anthenelli2016]].',
    rows:[['Varenicline',1.3,6.5],['Bupropion',2.2,6.7],['Nicotine patch',2.5,5.2],['Placebo',2.4,4.9]]}
  }
};
function qtTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
/* horizontal bars: rows [label,value,colourVar,valueLabel]; bars scale to max */
function qtBars(x,y,w,rows,max,rh=34){let g='';const bw=w-78;
  rows.forEach(([l,v,c,vl],i)=>{const yy=y+i*rh,ww=Math.max(2,bw*v/max);
    g+=qtTx(x,yy,l,'t-xs');
    g+=`<rect x="${f1(x)}" y="${f1(yy+5)}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(yy+5)}" width="${f1(ww)}" height="12" rx="3" style="fill:${c}"/>`;
    g+=qtTx(x+bw+6,yy+15,vl,'t-lbl')});return g}
/* a small shield for the vaccine panel */
function qtShield(x,y,s,col){return `<path d="M${f1(x)} ${f1(y-s*.5)}L${f1(x+s*.42)} ${f1(y-s*.34)}V${f1(y)}Q${f1(x+s*.42)} ${f1(y+s*.36)} ${f1(x)} ${f1(y+s*.52)}Q${f1(x-s*.42)} ${f1(y+s*.36)} ${f1(x-s*.42)} ${f1(y)}V${f1(y-s*.34)}Z" style="fill:var(--rec-soft);stroke:${col};stroke-width:1.8"/><path d="M${f1(x-s*.16)} ${f1(y)}l${f1(s*.12)} ${f1(s*.13)}l${f1(s*.22)} ${f1(-s*.26)}" style="fill:none;stroke:${col};stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"/>`}
inits.quitting=()=>{
  const svg=$('#qtSvg'),rg=$('#qtT'),T=QT_TXT;
  /* FEV1 change in mL at year y: published mean rates; the first-year shape is drawn as a straight rebound */
  const smk=y=>-62*y, qit=y=>y<=1?47*y:47-31*(y-1);
  function draw(t){
    const N=vb(svg,'720 400','400 690'),p=phaseOf(QT_STEPS,t);
    const L=N?{gx:58,gy:44,gw:316,gh:240,px:20,py:340,pw:360,ph:340}
             :{gx:66,gy:44,gw:352,gh:282,px:458,py:30,pw:250,ph:350};
    const Y=v=>L.gy+(100-v)/450*L.gh, X=y=>L.gx+y/5*L.gw;
    let s=qtTx(L.gx-48,L.gy-18,T.chartT,'t-lbl');
    s+=axes(L.gx,L.gy,L.gw,L.gh,{xt:[0,1,2,3,4,5].map(v=>[v/5,String(v)]),yt:[100,0,-100,-200,-300].map(v=>[(v+350)/450,String(v)]),grid:true});
    s+=qtTx(L.gx+L.gw,L.gy+L.gh+30,T.years,'t-xs','','end');
    s+=`<line x1="${f1(L.gx)}" x2="${f1(L.gx+L.gw)}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-dasharray:5 4;stroke-width:1.2"/>`+qtTx(X(1.3),Y(0)+14,T.start,'t-xs');
    const yS=5*ramp(t,.02,.15), yQ=t<.17?0:t<.34?ramp(t,.17,.3):1+4*ramp(t,.34,.47);
    /* continuing smoker */
    if(yS>0){s+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(yS))} ${f1(Y(smk(yS)))}" style="stroke:var(--smoke);stroke-width:3.2;fill:none;stroke-linecap:round"/><circle cx="${f1(X(yS))}" cy="${f1(Y(smk(yS)))}" r="4.5" style="fill:var(--smoke)"/>`;
      if(yS>=3.4)s+=qtTx(X(3.4)-6,Y(smk(3.4))+20,T.smoker,'t-sm','fill:var(--ink)','end')+qtTx(X(3.4)-6,Y(smk(3.4))+34,T.slopeS,'t-xs','','end')}
    /* sustained quitter */
    if(t>=.17){const n=40;let d='';for(let i=0;i<=n;i++){const yy=yQ*i/n;d+=(i?'L':'M')+f1(X(yy))+' '+f1(Y(qit(yy)))}
      s+=`<path d="${d}" style="stroke:var(--rx);stroke-width:3.4;fill:none;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(X(yQ))}" cy="${f1(Y(qit(yQ)))}" r="5" style="fill:var(--rx)"/>`;
      s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${f1(L.gy)}" y2="${f1(L.gy+L.gh)}" style="stroke:var(--rx);stroke-dasharray:3 3"/>`+qtTx(X(0)+5,L.gy+12,T.quitDay,'t-xs','fill:var(--rx)');
      if(yQ>=.9)s+=qtTx(X(1)+4,Y(47)-10,T.rebound,'t-xs','fill:var(--rx)');
      if(yQ>=3)s+=qtTx(X(3)+4,Y(qit(3))-28,T.quitter,'t-sm','fill:var(--rx)')+qtTx(X(3)+4,Y(qit(3))-14,T.slopeQ,'t-xs');}
    /* the gap at year 5 and the "not regained" note */
    if(t>=.47){const a=ramp(t,.47,.52),xg=X(5)-10,g1=Y(qit(5)),g2=Y(smk(5));
      s+=`<g style="opacity:${f1(a)}"><path d="M${f1(xg)} ${f1(g1+4)}V${f1(g2-4)}" style="stroke:var(--ink);stroke-width:1.6"/><path d="M${f1(xg-5)} ${f1(g1+4)}h10M${f1(xg-5)} ${f1(g2-4)}h10" style="stroke:var(--ink);stroke-width:1.6"/>`+
        qtTx(xg-8,Y(-95),T.gap(qit(5)-smk(5)),'t-sm','fill:var(--ink)','end')+qtTx(xg-8,Y(-95)+13,T.gapSub,'t-xs','','end')+
        qtTx(X(5),Y(86),T.notBack,'t-xs','fill:var(--muted)','end')+'</g>'}
    s+=qtPanel(L,t,p);
    svg.innerHTML=s;
    const yc=p===0?yS:yQ,yr=f1(yc);
    $('#qtRead').innerHTML=T.read(yr,Math.round(smk(yc)),t>=.17?Math.round(qit(yQ)):null);
    setSt(p);$('#qtNote').innerHTML=noteHTML(QT_STEPS[p]);
  }
  function qtPanel(L,t,p){const T2=T,x=L.px,y=L.py,w=L.pw,h=L.ph,cx=x+w/2;let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="14" style="fill:var(--panel-2);opacity:.55"/>`;
    const ph=t*40;
    if(p===0||p===1){const P=p?T2.p1:T2.p0,pxp=x+w*.36,pyp=y+h-28,ps=Math.min(170,h*.5);
      g+=qtTx(x+16,y+28,P.h,'t-big',p?'fill:var(--rx)':'');
      g+=person(pxp,pyp,ps,{col:p?'var(--rx)':'var(--brand)',breath:p?(Math.sin(ph)+1)/2:0});
      const hx=pxp+ps*.18,hy=pyp-ps*.5;
      if(p===0){g+=cig(hx,hy,52,{burn:ramp(t,0,.17)*.6,smoke:1,ph});g+=qtTx(x+16,y+46,P.l,'t-xs')}
      else{g+=`<g transform="rotate(28 ${f1(pxp+ps*.55)} ${f1(pyp-6)})">${cig(pxp+ps*.4,pyp-6,44,{burn:.62})}</g>`;
        g+=qtTx(x+w-16,y+h*.38,P.big,'t-big','font-size:30px;fill:var(--rx)','end')+qtTx(x+w-16,y+h*.38+20,P.l1,'t-xs','','end')+qtTx(x+w-16,y+h*.38+34,P.l2,'t-xs','','end')}}
    else if(p===2){const P=T2.p2,ox=x+28,oy=y+64,ww=w-56,hh=h-176;
      g+=qtTx(x+16,y+28,P.h,'t-big');
      g+=`<path d="M${f1(ox)} ${f1(oy)}L${f1(ox+ww)} ${f1(oy+hh)}" style="stroke:var(--smoke);stroke-width:4;stroke-linecap:round"/><path d="M${f1(ox)} ${f1(oy)}L${f1(ox+ww)} ${f1(oy+hh/2)}" style="stroke:var(--rx);stroke-width:4;stroke-linecap:round"/>`;
      g+=`<rect x="${f1(ox)}" y="${f1(y+h-92)}" width="16" height="5" rx="2" style="fill:var(--smoke)"/><rect x="${f1(ox)}" y="${f1(y+h-72)}" width="16" height="5" rx="2" style="fill:var(--rx)"/>`;
      g+=qtTx(ox+24,y+h-86,P.a,'t-sm','fill:var(--ink)')+qtTx(ox+24,y+h-66,P.b,'t-sm','fill:var(--rx)');
      g+=chip(cx,y+h-30,P.c,{anchor:'middle',col:'var(--rx)',fill:'var(--rx-soft)'})}
    else if(p===3){const P=T2.p3;g+=qtTx(x+16,y+28,P.h,'t-big')+qtTx(x+16,y+46,P.l,'t-xs');
      const a=ease(ramp(t,.52,.6));
      g+=qtBars(x+16,y+76,w-32,[[P.r1,42.3*a,'var(--rx)',T2.pct(42.3)],[P.r2,8.8*a,'var(--smoke)',T2.pct(8.8)],[P.r3,18.6*a,'var(--rx)',T2.pct(18.6)],[P.r4,5.6*a,'var(--smoke)',T2.pct(5.6)]],50,40);
      g+=chip(cx,y+h-30,P.rr,{anchor:'middle',col:'var(--rx)',fill:'var(--rx-soft)'})}
    else if(p===4){const P=T2.p4,a=ease(ramp(t,.68,.76));g+=qtTx(x+16,y+28,P.h,'t-big');
      g+=qtBars(x+16,y+62,w-32,[[P.r1,21.7*a,'var(--rx)',T2.pct(21.7)],[P.r2,5.4*a,'var(--smoke)',T2.pct(5.4)]],30,40);
      g+=qtBars(x+16,y+160,w-32,[[P.r3,8.83*a,'var(--rx)','8.83'],[P.r4,10.38*a,'var(--smoke)','10.38']],12,40);
      g+=qtTx(x+16,y+250,P.u2,'t-xs')}
    else{const P=T2.p5;g+=qtTx(x+16,y+28,P.h,'t-big')+qtTx(x+16,y+46,P.l,'t-xs');
      const cols=N2(L)?3:2,cw=(w-24)/cols,rh=N2(L)?110:88;
      P.v.forEach((v,i)=>{const c=i%cols,r=Math.floor(i/cols),sx=x+12+cw*(c+.5),sy=y+92+r*rh,a=ramp(t,.84+i*.015,.88+i*.015);
        g+=`<g style="opacity:${f1(a)}">`+qtShield(sx,sy,36,i===5?'var(--air)':'var(--rec)')+qtTx(sx,sy+38,v,'t-sm','fill:var(--ink)','middle')+qtTx(sx,sy+51,P.s[i],'t-xs','','middle')+'</g>'})}
    return g}
  const N2=L=>L.pw>300;
  const stop=playWire(rg,$('#qtPlay'),draw,16000,'%t:player.replay%','quitting');
  const setSt=stepWire($('#qtSteps'),QT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- comparison explorer ---- */
  const fsv=$('#qtForest');let set='copd';
  function drawForest(){const N=NARROW(),S=T.sets[set];let g='';
    if(set==='safety'){const rows=S.rows,rh=N?62:50,top=56,H=top+rows.length*rh+44,W=N?400:720;
      fsv.setAttribute('viewBox',`0 0 ${W} ${H}`);
      const lx=N?16:20,bx=N?16:200,bw=(N?W-80:W-280),mx=8,sc=v=>bx+bw*v/mx;
      g+=`<rect x="${lx}" y="14" width="14" height="10" rx="2" style="fill:var(--rx)"/>`+qtTx(lx+20,23,T.safeLeg[0],'t-xs');
      g+=`<rect x="${N?lx:lx+230}" y="${N?32:14}" width="14" height="10" rx="2" style="fill:var(--accent)"/>`+qtTx((N?lx:lx+230)+20,N?41:23,T.safeLeg[1],'t-xs');
      rows.forEach(([l,a,b],i)=>{const y=top+i*rh;
        g+=N?qtTx(lx,y+4,l,'t-lbl'):qtTx(bx-12,y+18,l,'t-lbl','','end');
        const by=N?y+12:y+4;
        g+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(sc(a)-bx)}" height="13" rx="3" style="fill:var(--rx)"/>`+qtTx(sc(a)+6,by+11,T.pct(a),'t-xs','fill:var(--ink)');
        g+=`<rect x="${f1(bx)}" y="${f1(by+17)}" width="${f1(sc(b)-bx)}" height="13" rx="3" style="fill:var(--accent)"/>`+qtTx(sc(b)+6,by+28,T.pct(b),'t-xs','fill:var(--ink)')});
      const ay=top+rows.length*rh;g+=axes(bx,ay-4,bw,0.1,{xt:[0,2,4,6,8].map(v=>[v/mx,v+'%']),grid:false});
      g+=qtTx(bx,ay+32,T.safeAx,'t-xs');fsv.innerHTML=g;$('#qtForestCap').innerHTML=S.cap;return}
    const rows=S.rows,lo=.5,hi=8,W=N?400:720,rh=N?70:42,top=N?24:34,H=top+rows.length*rh+52;
    fsv.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const x0=N?40:390,x1=N?372:696,lx=N?16:16,sc=v=>x0+(Math.log(v)-Math.log(lo))/(Math.log(hi)-Math.log(lo))*(x1-x0);
    [.5,1,2,4,8].forEach(v=>{g+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${top-8}" y2="${f1(top+rows.length*rh)}" style="stroke:var(--line);stroke-width:${v===1?2:1};${v===1?'':'stroke-dasharray:2 4'}"/>`+qtTx(sc(v),top+rows.length*rh+16,String(v),'t-xs','','middle')});
    rows.forEach(([l,v,a,b],i)=>{const y=top+i*rh,ry=N?y+46:y+14;
      g+=qtTx(lx,N?y+12:y+12,l,'t-lbl')+qtTx(lx,N?y+27:y+27,T.rr(S.k,v,a,b),'t-xs');
      const cl=a==null?null:sc(Math.max(lo,a)),ch=b==null?null:sc(Math.min(hi,b));
      if(cl!=null)g+=`<line x1="${f1(cl)}" x2="${f1(ch)}" y1="${f1(ry)}" y2="${f1(ry)}" style="stroke:var(--rx);stroke-width:2.4"/>`;
      if(b!=null&&b>hi)g+=`<path d="M${f1(x1-8)} ${f1(ry-5)}L${f1(x1)} ${f1(ry)}L${f1(x1-8)} ${f1(ry+5)}" style="fill:none;stroke:var(--rx);stroke-width:2"/>`;
      if(v<=hi)g+=`<rect x="${f1(sc(v)-6)}" y="${f1(ry-6)}" width="12" height="12" style="fill:var(--rx)"/>`;
      else g+=qtTx(x1-12,ry-8,T.off,'t-xs','fill:var(--rx)','end')});
    const fy=top+rows.length*rh+34;
    g+=N?qtTx(lx,fy,T.fav0,'t-xs')+qtTx(x1,fy,T.fav1,'t-xs','','end'):qtTx(sc(1)-6,fy,T.fav0,'t-xs','','end')+qtTx(sc(1)+6,fy,T.fav1,'t-xs');
    fsv.innerHTML=g;$('#qtForestCap').innerHTML=S.cap}
  $('#qtTabs').addEventListener('click',e=>{const b=e.target.closest('[data-set]');if(!b)return;set=b.dataset.set;
    $$('[data-set]',$('#qtTabs')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawForest()});
  drawForest();
  const prev=redraws.quitting;redraws.quitting=()=>{prev&&prev();drawForest()};
};
