/* =============== 3.5 Pulmonary rehabilitation =============== */
/* Three widgets: (1) the main scrubber: a loop of breathlessness, inactivity and weaker muscles (a teaching
   picture) that a training block turns into a recovery loop, beside a step panel with the trial numbers;
   (2) an effect explorer drawing published mean differences and ratios with their CIs and the MIDs the
   Cochrane reviews used; (3) a timing slider placing the early in-hospital trial and the after-discharge
   cohort on one timeline. Numbers from research pass F, cited in steps, captions and HTML. */
const RH_STEPS=[
 {from:0,at:.08,k:'Assess',t:'Start with a full assessment',
  txt:'Pulmonary rehabilitation is defined as "a comprehensive intervention based on a thorough patient assessment followed by patient-tailored therapies that include, but are not limited to, exercise training, education, and behavior change" [[Spruit2013,Rochester2023]]. GOLD 2023 recommends a formal programme for people in groups B and E [[Agusti2023]].',
  pt:'A programme starts by finding out what each person can do and what they need, then builds exercise and teaching around that [[Spruit2013]].',
  hook:'PR = assessment + tailored exercise training, education and behaviour change (ATS/ERS 2013) [[Spruit2013]].'},
 {from:.17,at:.25,k:'Train',t:'Exercise for 8–12 weeks',
  txt:'The 2015 Cochrane review pooled 65 randomised trials (3822 participants; mean FEV1 about 37–39% predicted); most programmes ran 8 or 12 weeks. Exercise-only programmes and programmes with more complex add-ons did not differ significantly in effect [[McCarthy2015]].',
  pt:'Most programmes in the trials lasted two to three months of regular supervised exercise [[McCarthy2015]].',
  hook:'Most PR programmes in the Cochrane review: 8 or 12 weeks [[McCarthy2015]].'},
 {from:.34,at:.42,k:'Gain',t:'Walk further, breathe easier',
  txt:'Compared with usual care, 6-minute walk distance rose by 43.93 m (95% CI 32.64–55.21; 38 studies, 1879 participants) and SGRQ total score improved by 6.89 points, beyond the 4-unit threshold. CRQ dyspnoea improved by 0.79 units, above the 0.5-unit minimal important difference; maximal exercise rose by 6.77 W [[McCarthy2015]].',
  pt:'After a programme, people walked about 44 metres further in six minutes and felt less out of breath [[McCarthy2015]].',
  hook:'PR in stable COPD: 6MWD +44 m, SGRQ −6.9 points, CRQ dyspnoea +0.79 [[McCarthy2015]].'},
 {from:.51,at:.58,k:'After hospital',t:'The window that matters',
  txt:'In 197,376 US Medicare beneficiaries admitted for COPD, only 2721 (1.5%) started rehabilitation within 90 days of discharge. One-year mortality was 7.3% in those who did versus 19.6% in those who started later or never (HR 0.63, 95% CI 0.57–0.69); the authors caution that residual confounding is possible [[Lindenauer2020]]. In the Cochrane review of rehabilitation after exacerbations, readmissions fell (OR 0.44, 95% CI 0.21–0.91) [[Puhan2016]].',
  pt:'People who started rehab in the three months after leaving hospital were less likely to die in the next year, though this kind of study cannot prove cause [[Lindenauer2020]].',
  hook:'Medicare: PR within 90 days of discharge, 1-year mortality 7.3% vs 19.6% (observational) [[Lindenauer2020]].'},
 {from:.67,at:.74,k:'Not too soon',t:'Avoid the acute phase',
  txt:'An early programme started within 48 hours of admission (389 patients, 82% with COPD) did not reduce 12-month readmissions: 62% versus 58% (HR 1.1, 95% CI 0.86–1.43). One-year mortality was higher with the intervention (OR 1.74, 95% CI 1.05–2.88), and the authors suggest that progressive exercise beyond standard physiotherapy "should not be started during the early stages of the acute illness" [[Greening2014]].',
  pt:'Starting hard exercise in the first two days of a hospital stay did not help in a trial [[Greening2014]].',
  hook:'Rehab within 48 h of admission: no fewer readmissions; 1-year mortality OR 1.74 [[Greening2014]].'},
 {from:.83,at:.9,k:'Keep going',t:'Home, telehealth and maintenance',
  txt:'Telerehabilitation gave probably little or no difference in 6MWD from centre-based rehabilitation (MD 0.06 m), and 93% completed it versus 70% in person [[Cox2021Cochrane]]. In a home-based trial, "Neither group maintained postrehabilitation gains at 12 months" [[Holland2017]]. ATS 2023 makes a conditional recommendation for supervised maintenance or usual care after the first programme [[Rochester2023]].',
  pt:'Rehab at home or by video worked about as well as at a centre, but the gains faded within a year if nothing followed [[Cox2021Cochrane,Holland2017]].',
  hook:'Telerehab completion 93% vs 70% centre-based; gains not maintained at 12 months [[Cox2021Cochrane,Holland2017]].'}
];
const RH_TXT={
  bad:['Breathless','Less active','Weaker muscles'],good:['Less breathless','More active','Fitter'],train:'exercise training',
  loopBad:'a loop that feeds itself',loopGood:'training breaks the loop',
  p0:{h:'A tailored programme',c:['thorough assessment','exercise training','education','behaviour change'],l:'to improve physical and psychological condition'},
  p1:{h:'8 to 12 weeks',w8:'8 weeks',w12:'12 weeks',l:'most programmes in the Cochrane review',wk:'week'},
  p2:{h:'Versus usual care',r1:'6-minute walk',v1:'+43.93 m',r2:'SGRQ (lower is better)',v2:'−6.89',m2:'4-point threshold',
    r3:'CRQ dyspnoea',v3:'+0.79',m3:'MID 0.5',ci:'95% CI'},
  p3:{h:'After a COPD admission',dots:'started within 90 days: 1.5 in 100',b1:'1-year deaths: started ≤ 90 days',b2:'1-year deaths: later or never',obs:'observational: confounding possible'},
  p4:{h:'Within 48 h of admission',r1:'12-month readmission: early rehab',r2:'12-month readmission: usual care',or:'1-year mortality OR 1.74',adm:'admission',d2:'48 h'},
  p5:{h:'Telerehabilitation',r1:'completed: telerehab',r2:'completed: centre-based',l1:'6MWD vs centre: 0.06 m',l2:'gains faded by 12 months without maintenance'},
  pct:v=>v+'%',
  /* effect explorer */
  fx:{
   walk:{min:-20,max:100,ticks:[-20,0,20,40,60,80,100],unit:'metres',cap:'6-minute walk distance. Stable COPD [[McCarthy2015]]; after an exacerbation (high-quality evidence) [[Puhan2016]]; home versus centre-based [[Holland2017]]; telerehabilitation versus centre-based, review [[Cox2021Cochrane]] and trial [[Cox2022]]. Positive values favour the first option named.',
    rows:[['Rehab vs usual care, stable COPD','+43.93 m (95% CI 32.64 to 55.21)',43.93,32.64,55.21],['Rehab vs usual care, after an exacerbation','+62 m (95% CI 38 to 86)',62,38,86],
      ['Home vs centre-based','+18.6 m',18.6,null,null],['Telerehab vs centre-based (review)','+0.06 m (95% CI −10.82 to 10.94)',0.06,-10.82,10.94],['Telerehab vs centre-based (trial)','−6 m',-6,null,null]]},
   sgrq:{min:-12,max:2,ticks:[-12,-8,-4,0],unit:'SGRQ points (negative = better)',mid:-4,midL:'4-point threshold',cap:'St George\'s Respiratory Questionnaire total score. Stable COPD [[McCarthy2015]]; after an exacerbation [[Puhan2016]]. The 4-unit threshold is the one the Cochrane review used.',
    rows:[['Rehab vs usual care, stable COPD','−6.89 (95% CI −9.26 to −4.52)',-6.89,-9.26,-4.52],['Rehab vs usual care, after an exacerbation','−7.80',-7.8,null,null]]},
   crq:{min:0,max:1,ticks:[0,.25,.5,.75,1],unit:'CRQ units (positive = better)',mid:.5,midL:'MID 0.5',cap:'Chronic Respiratory Questionnaire domains, rehabilitation versus usual care in stable COPD; all four exceeded the 0.5-unit minimal important difference [[McCarthy2015]].',
    rows:[['Dyspnoea','+0.79',.79,null,null],['Fatigue','+0.68',.68,null,null],['Emotional function','+0.56',.56,null,null],['Mastery','+0.71',.71,null,null]]},
   hosp:{log:true,min:.2,max:4,ticks:[.25,.5,1,2,4],unit:'ratio (below 1 = fewer events with rehabilitation)',mid:1,cap:'After an exacerbation: Cochrane readmission and mortality odds ratios (heterogeneous; mortality low quality) [[Puhan2016]]; Medicare 1-year mortality hazard ratio, observational [[Lindenauer2020]]; rehabilitation started within 48 hours of admission [[Greening2014]].',
    rows:[['Readmission, rehab after exacerbation','OR 0.44 (95% CI 0.21 to 0.91)',.44,.21,.91],['Death, rehab after exacerbation','OR 0.68 (95% CI 0.28 to 1.67)',.68,.28,1.67],
      ['1-year death, started ≤ 90 days (cohort)','HR 0.63 (95% CI 0.57 to 0.69)',.63,.57,.69],['12-month readmission, started ≤ 48 h','HR 1.1 (95% CI 0.86 to 1.43)',1.1,.86,1.43],['1-year death, started ≤ 48 h','OR 1.74 (95% CI 1.05 to 2.88)',1.74,1.05,2.88]]}
  },
  /* timing slider */
  zones:['in hospital','first 48 h','≤ 90 days after discharge','later or never'],ticks:['admission','discharge','90 days'],start:'start',
  day:[
   {cls:'no',v:'Within 48 hours of admission: no fewer readmissions',p:'In a randomised trial of 389 patients (82% with COPD), early progressive rehabilitation did not reduce 12-month readmissions (62% vs 58%; HR 1.1, 95% CI 0.86–1.43), and 1-year mortality was higher (OR 1.74, 95% CI 1.05–2.88). The authors suggest progressive exercise beyond standard physiotherapy "should not be started during the early stages of the acute illness" [[Greening2014]].'},
   {cls:'yes',v:'Within 90 days after discharge: linked with lower 1-year mortality',p:'In the Medicare cohort, 1-year mortality was 7.3% versus 19.6% (HR 0.63, 95% CI 0.57–0.69), and every 3 additional sessions was associated with lower risk (HR 0.91); residual confounding is possible [[Lindenauer2020]]. In trials of rehabilitation after exacerbations, readmissions fell (OR 0.44), SGRQ improved by 7.80 points and 6MWD by 62 m; mortality did not change significantly (OR 0.68, 95% CI 0.28–1.67) [[Puhan2016]]. ATS 2023 strongly recommends rehabilitation after hospitalisation [[Rochester2023]].'},
   {cls:'maybe',v:'Later than 90 days, or never',p:'This was the Medicare comparison group: 1-year mortality 19.6%. It was by far the largest group, because only 1.5% of 197,376 people started within 90 days [[Lindenauer2020]]. The ATS guideline states that fewer than 5% of people with COPD who may benefit receive rehabilitation [[Rochester2023]].'}]
};
function rhTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
function rhBar(x,y,w,l,v,max,col,vl){const bw=w-70,ww=Math.max(2,bw*v/max);
  return rhTx(x,y,l,'t-xs')+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(ww)}" height="12" rx="3" style="fill:${col}"/>`+rhTx(x+bw+6,y+15,vl,'t-lbl')}
/* a dumbbell icon for the training block */
function rhBell(x,y,s,col){return `<path d="M${f1(x-s*.45)} ${f1(y)}H${f1(x+s*.45)}" style="stroke:${col};stroke-width:${f1(s*.12)};stroke-linecap:round"/>`+
  [-1,1].map(k=>`<rect x="${f1(x+k*s*.42-s*.1)}" y="${f1(y-s*.28)}" width="${f1(s*.2)}" height="${f1(s*.56)}" rx="${f1(s*.05)}" style="fill:${col}"/><rect x="${f1(x+k*s*.6-s*.07)}" y="${f1(y-s*.18)}" width="${f1(s*.14)}" height="${f1(s*.36)}" rx="${f1(s*.04)}" style="fill:${col}"/>`).join('')}
inits.rehab=()=>{
  const svg=$('#rhSvg'),rg=$('#rhT'),T=RH_TXT;
  function draw(t){
    const N=vb(svg,'720 400','400 700'),p=phaseOf(RH_STEPS,t);
    const L=N?{cx:200,cy:172,R:104,ps:66,px:20,py:342,pw:360,ph:344}:{cx:184,cy:206,R:120,ps:78,px:372,py:28,pw:334,ph:350};
    const v=ease(ramp(t,.17,.3)),col=v<.5?'var(--fl)':'var(--rec)',ang=[-90,30,150],rad=a=>a*Math.PI/180;
    let s=`<defs>${marker('rhA0','var(--fl)')}${marker('rhA1','var(--rec)')}</defs>`;
    s+=rhTx(L.cx,N?24:30,v<.5?T.loopBad:T.loopGood,'t-sm',`fill:${col}`,'middle');
    /* arcs between the three nodes, clockwise */
    for(let i=0;i<3;i++){const a0=rad(ang[i]+26),a1=rad(ang[(i+1)%3]-26+(i===2?360:0));
      const x0=L.cx+L.R*Math.cos(a0),y0=L.cy+L.R*Math.sin(a0),x1=L.cx+L.R*Math.cos(a1),y1=L.cy+L.R*Math.sin(a1);
      const broken=i===1&&v>0;/* the arc from "less active" to "weaker muscles" is where training enters */
      s+=`<path d="M${f1(x0)} ${f1(y0)}A${L.R} ${L.R} 0 0 1 ${f1(x1)} ${f1(y1)}" style="fill:none;stroke:${col};stroke-width:3;${broken?'stroke-dasharray:10 6;':''}" marker-end="url(#${v<.5?'rhA0':'rhA1'})"/>`}
    /* the circulating dot */
    const spd=lerp(5,8,v),da=rad(-90+360*((t*spd)%1));
    s+=`<circle cx="${f1(L.cx+L.R*Math.cos(da))}" cy="${f1(L.cy+L.R*Math.sin(da))}" r="6" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
    /* training block on the lower arc */
    if(v>0){const bx=L.cx,by=L.cy+L.R;s+=`<g style="opacity:${f1(v)}"><circle cx="${f1(bx)}" cy="${f1(by)}" r="20" style="fill:var(--rec-soft);stroke:var(--rec);stroke-width:2"/>${rhBell(bx,by,26,'var(--rec)')}`+rhTx(bx,by+36,T.train,'t-sm','fill:var(--rec)','middle')+'</g>'}
    /* nodes: labels swap at the crossfade midpoint */
    ang.forEach((a,i)=>{const nx=L.cx+L.R*Math.cos(rad(a)),ny=L.cy+L.R*Math.sin(rad(a)),lab=v<.5?T.bad[i]:T.good[i];
      s+=chip(nx,ny,lab,{anchor:'middle',col,fill:v<.5?'var(--fl-soft)':'var(--rec-soft)',size:12.5})});
    /* the walker */
    s+=person(L.cx,L.cy+L.ps*.55,L.ps,{col:v<.5?'var(--brand)':'var(--rec)',lean:.55*(1-v),walk:t*lerp(14,30,v),breath:(1-v)*(Math.sin(t*90)+1)/2});
    s+=rhPanel(L,t,p);
    svg.innerHTML=s;setSt(p);$('#rhNote').innerHTML=noteHTML(RH_STEPS[p]);
  }
  function rhPanel(L,t,p){const x=L.px,y=L.py,w=L.pw,h=L.ph,cx=x+w/2;let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="14" style="fill:var(--panel-2);opacity:.55"/>`;
    if(p===0){const P=T.p0;g+=rhTx(x+16,y+28,P.h,'t-big');
      P.c.forEach((c,i)=>{const a=ramp(t,i*.02,i*.02+.02);g+=`<g style="opacity:${f1(a)}">`+chip(x+16,y+70+i*44,(i+1)+'  '+c,{col:i?'var(--rx)':'var(--dx)',fill:i?'var(--rx-soft)':'var(--dx-soft)',size:13})+'</g>'});
      g+=wrapT(x+16,y+h-42,P.l,40,{cls:'t-xs',lh:13}).svg}
    else if(p===1){const P=T.p1,n=12,gw=(w-32)/n,fill=12*ramp(t,.17,.32);g+=rhTx(x+16,y+28,P.h,'t-big');
      for(let i=0;i<n;i++){const k=clamp(fill-i);g+=`<rect x="${f1(x+16+i*gw+2)}" y="${f1(y+62)}" width="${f1(gw-4)}" height="${f1(gw-4)}" rx="4" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.2"/><rect x="${f1(x+16+i*gw+2)}" y="${f1(y+62+(gw-4)*(1-k))}" width="${f1(gw-4)}" height="${f1((gw-4)*k)}" rx="4" style="fill:var(--rx);opacity:.75"/>`}
      [[8,P.w8],[12,P.w12]].forEach(([wk,l])=>{const mx=x+16+wk*gw-2;g+=`<path d="M${f1(mx)} ${f1(y+62+gw)}v14" style="stroke:var(--ink);stroke-width:1.4"/>`+rhTx(mx,y+62+gw+28,l,'t-sm','fill:var(--ink)','end')});
      g+=rhTx(x+16,y+62+gw+48,P.l,'t-xs');
      const ty=y+h-30;g+=`<line x1="${f1(x+16)}" x2="${f1(x+w-16)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--line);stroke-width:2"/>`;
      g+=person(x+30+(w-60)*((t*3)%1),ty,70,{col:'var(--rx)',walk:t*40})}
    else if(p===2){const P=T.p2,a=ease(ramp(t,.34,.42)),bx=x+16,bw=w-32;g+=rhTx(x+16,y+28,P.h,'t-big');
      const row=(yy,l,vl,v,lo,hi,max,mid,ml,c)=>{const sc=u=>bx+bw*u/max;let r=rhTx(bx,yy,l,'t-xs')+rhTx(bx+bw,yy,vl,'t-lbl','','end');
        r+=`<rect x="${f1(bx)}" y="${f1(yy+8)}" width="${f1(bw)}" height="16" rx="4" style="fill:var(--panel)"/><rect x="${f1(bx)}" y="${f1(yy+8)}" width="${f1(sc(v*a)-bx)}" height="16" rx="4" style="fill:${c}"/>`;
        if(lo!=null)r+=`<path d="M${f1(sc(lo))} ${f1(yy+30)}H${f1(sc(hi))}M${f1(sc(lo))} ${f1(yy+26)}v8M${f1(sc(hi))} ${f1(yy+26)}v8" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(a)}"/>`+rhTx(sc(hi)+4,yy+34,P.ci,'t-xs');
        if(mid!=null)r+=`<line x1="${f1(sc(mid))}" x2="${f1(sc(mid))}" y1="${f1(yy+4)}" y2="${f1(yy+28)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/>`+rhTx(sc(mid)+4,yy+46,ml,'t-xs','fill:var(--ink)');
        return r};
      g+=row(y+64,P.r1,P.v1,43.93,32.64,55.21,70,null,null,'var(--rx)');
      g+=row(y+150,P.r2,P.v2,6.89,null,null,10,4,P.m2,'var(--rec)');
      g+=row(y+236,P.r3,P.v3,.79,null,null,1.2,.5,P.m3,'var(--air)')}
    else if(p===3){const P=T.p3,a=ease(ramp(t,.51,.58));g+=rhTx(x+16,y+28,P.h,'t-big');
      const ds=N3(L)?13:12,dx0=x+16,dy0=y+50;for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),on=i<1?1:i<2?.5:0;
        g+=`<circle cx="${f1(dx0+c*ds+ds/2)}" cy="${f1(dy0+r*ds+ds/2)}" r="${f1(ds*.36)}" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:var(--muted);stroke-width:.6;opacity:${on===.5?.6:1}"/>`}
      const tx=dx0+ds*10+12;g+=wrapT(tx,dy0+14,P.dots,N3(L)?26:16,{cls:'t-xs',lh:13}).svg;
      g+=rhBar(x+16,y+200,w-32,P.b1,7.3*a,25,'var(--rec)',T.pct(7.3))+rhBar(x+16,y+242,w-32,P.b2,19.6*a,25,'var(--fl)',T.pct(19.6));
      g+=rhTx(x+16,y+h-16,P.obs,'t-xs','fill:var(--warn)')}
    else if(p===4){const P=T.p4,a=ease(ramp(t,.67,.74));g+=rhTx(x+16,y+28,P.h,'t-big');
      const lx0=x+20,lx1=x+w-20,ly=y+72,d2=lx0+(lx1-lx0)*.22;
      g+=`<rect x="${f1(lx0)}" y="${f1(ly-10)}" width="${f1(d2-lx0)}" height="20" rx="4" style="fill:var(--fl-soft);stroke:var(--fl)"/><line x1="${f1(lx0)}" x2="${f1(lx1)}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:var(--muted);stroke-width:2"/>`;
      g+=rhTx(lx0,ly+26,P.adm,'t-xs')+rhTx(d2,ly+26,P.d2,'t-xs','fill:var(--fl)','middle');
      g+=rhBar(x+16,y+124,w-32,P.r1,62*a,80,'var(--fl)',T.pct(62))+rhBar(x+16,y+166,w-32,P.r2,58*a,80,'var(--smoke)',T.pct(58));
      g+=chip(cx,y+h-40,P.or,{anchor:'middle',col:'var(--fl)',fill:'var(--fl-soft)'})}
    else{const P=T.p5,a=ease(ramp(t,.83,.9));g+=rhTx(x+16,y+28,P.h,'t-big');
      g+=rhBar(x+16,y+62,w-32,P.r1,93*a,100,'var(--rec)',T.pct(93))+rhBar(x+16,y+104,w-32,P.r2,70*a,100,'var(--smoke)',T.pct(70));
      g+=chip(x+16,y+168,P.l1,{col:'var(--rx)',fill:'var(--rx-soft)'});
      g+=wrapT(x+16,y+212,P.l2,N3(L)?48:40,{cls:'t-sm',lh:15}).svg;
      const ty=y+h-24;g+=`<line x1="${f1(x+16)}" x2="${f1(x+w-16)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--line);stroke-width:2"/>`+person(x+40+(w-80)*((t*2)%1),ty,60,{col:'var(--rec)',walk:t*36})}
    return g}
  const N3=L=>L.pw>340;
  const stop=playWire(rg,$('#rhPlay'),draw,16000,'%t:player.replay%','rehab');
  const setSt=stepWire($('#rhSteps'),RH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- effect explorer ---- */
  const fsv=$('#rhFx');let out='walk';
  function drawFx(){const N=NARROW(),S=T.fx[out],rows=S.rows,W=N?400:720,rh=N?70:44,top=N?18:30,H=top+rows.length*rh+56;
    fsv.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const x0=N?30:400,x1=N?376:700,lx=16;
    const sc=S.log?u=>x0+(Math.log(u)-Math.log(S.min))/(Math.log(S.max)-Math.log(S.min))*(x1-x0):u=>x0+(u-S.min)/(S.max-S.min)*(x1-x0);
    let g='';const yb=top+rows.length*rh;
    S.ticks.forEach(u=>{g+=`<line x1="${f1(sc(u))}" x2="${f1(sc(u))}" y1="${top-6}" y2="${f1(yb)}" style="stroke:var(--line);stroke-dasharray:2 4"/>`+rhTx(sc(u),yb+16,String(u),'t-xs','','middle')});
    const zero=S.log?1:0;if(zero>=S.min&&zero<=S.max)g+=`<line x1="${f1(sc(zero))}" x2="${f1(sc(zero))}" y1="${top-6}" y2="${f1(yb)}" style="stroke:var(--muted);stroke-width:2"/>`;
    if(S.mid!=null&&S.mid!==zero)g+=`<line x1="${f1(sc(S.mid))}" x2="${f1(sc(S.mid))}" y1="${top-6}" y2="${f1(yb)}" style="stroke:var(--warn);stroke-width:1.8;stroke-dasharray:6 4"/>`+rhTx(x1,yb+36,S.midL,'t-xs','fill:var(--warn)','end');
    rows.forEach(([l,vl,v,lo,hi],i)=>{const y=top+i*rh,ry=N?y+50:y+16;
      g+=rhTx(lx,y+(N?14:12),l,'t-lbl')+rhTx(lx,y+(N?29:27),vl,'t-xs');
      if(lo!=null)g+=`<line x1="${f1(sc(Math.max(S.min,lo)))}" x2="${f1(sc(Math.min(S.max,hi)))}" y1="${f1(ry)}" y2="${f1(ry)}" style="stroke:var(--rx);stroke-width:2.4"/>`;
      g+=`<rect x="${f1(sc(v)-6)}" y="${f1(ry-6)}" width="12" height="12" style="fill:var(--rx)"/>`});
    g+=rhTx(N?lx:x0,yb+36,S.unit,'t-xs');
    fsv.innerHTML=g;$('#rhFxCap').innerHTML=S.cap}
  $('#rhTabs').addEventListener('click',e=>{const b=e.target.closest('[data-o]');if(!b)return;out=b.dataset.o;
    $$('[data-o]',$('#rhTabs')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawFx()});
  drawFx();

  /* ---- timing slider ---- */
  const tsv=$('#rhTime'),dr=$('#rhDay');
  function drawDay(){const N=vb(tsv,'560 170','400 190'),k=+dr.value,W=N?400:560;
    const X=u=>N?20+(u-30)/500*360:u;/* positions designed on the 560-wide layout */
    const ly=N?104:96,Z=[[30,170],[30,80],[170,400],[400,530]],act=[1,2,3][k];
    let g='';
    Z.forEach(([a,b],i)=>{if(i===0)return;const on=i===act;g+=`<rect x="${f1(X(a))}" y="${ly-12}" width="${f1(X(b)-X(a))}" height="24" rx="5" style="fill:${on?(i===1?'var(--fl-soft)':i===2?'var(--rec-soft)':'var(--warn-soft)'):'var(--panel-2)'};stroke:${on?(i===1?'var(--fl)':i===2?'var(--rec)':'var(--warn)'):'var(--line)'};stroke-width:${on?2:1}"/>`});
    g+=`<rect x="${f1(X(80))}" y="${ly-12}" width="${f1(X(170)-X(80))}" height="24" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    g+=rhTx(X(100),ly-46,T.zones[0],'t-xs','fill:var(--ink)','middle')+`<path d="M${f1(X(32))} ${ly-38}H${f1(X(168))}" style="stroke:var(--muted)"/>`;
    g+=rhTx(X(55),ly-20,T.zones[1],'t-xs','fill:var(--ink)','middle')+rhTx(X(285),ly-20,T.zones[2],'t-xs','fill:var(--ink)','middle')+rhTx(X(465),ly-20,T.zones[3],'t-xs','fill:var(--ink)','middle');
    [[30,T.ticks[0],'start'],[170,T.ticks[1],'middle'],[400,T.ticks[2],'middle']].forEach(([u,l,an])=>{g+=`<path d="M${f1(X(u))} ${ly+12}v10" style="stroke:var(--ink)"/>`+rhTx(X(u),ly+36,l,'t-xs','',an)});
    const mx=X([55,285,465][k]);g+=`<path d="M${f1(mx)} ${ly+14}l-8 14h16z" style="fill:var(--ink)"/>`+rhTx(mx,ly+64,T.start,'t-sm','fill:var(--ink)','middle');
    tsv.innerHTML=g;const D=T.day[k];
    $('#rhDayOut').innerHTML=`<p class="verdict ${D.cls}">${D.v}</p><p>${D.p}</p>`;
    dr.setAttribute('aria-valuetext',D.v)}
  dr.addEventListener('input',drawDay);drawDay();
  const prev=redraws.rehab;redraws.rehab=()=>{prev&&prev();drawFx();drawDay()};
};
