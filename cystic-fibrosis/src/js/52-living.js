/* =============== 5.2 Living with CF =============== */
/* The main scrubber walks one illustrative day of treatments on a 24-hour dial, then the modulator-era
   question (SIMPLIFY), adherence, the life course (school, transition, work), mental health and later life.
   Every figure is cited in the step text or in the stage caption; the day's schedule is a drawing built to
   match the study averages, not anyone's prescription. */
const LV_STEPS=[
 {from:0,at:.1,k:'Step 1 · treatment burden',t:'A day of treatments',
  txt:'In 204 US adults with CF, the median number of daily therapies was 7 (IQR 5–9) and the mean time spent on treatment was 108 minutes a day (SD 58). On the day before the survey, people reported a median of 3 inhaled and 3 oral therapies, and only 49% had done airway clearance that day [[Sawicki2009]]. The workload did not differ by gender, age or FEV1: it stays high whatever the disease severity [[Sawicki2009]]. The dial sweeps one illustrative day built to match those averages.',
  pt:'Daily CF care can take about two hours a day. Feeling tired of treatments is common and worth telling your team about [[Sawicki2009]].',
  hook:'Pre-modulator adults: about 108 minutes a day and a median of 7 therapies [[Sawicki2009]].'},
 {from:.17,at:.26,k:'Step 2 · the modulator era',t:'Can treatments be dropped on ETI?',
  txt:'SIMPLIFY randomised 594 people taking elexacaftor/tezacaftor/ivacaftor (ETI) who had good lung function (mean ppFEV1 96.9%). Stopping hypertonic saline or dornase alfa for 6 weeks was non-inferior to continuing for the change in ppFEV1. Adverse events were more frequent among those who stopped: 35% vs 24% (hypertonic saline) and 37% vs 23% (dornase alfa). SIMPLIFY is short-term evidence and does not give advice for any individual [[MayerHamblett2023SIMPLIFY]].',
  pt:'For some people on a modulator, a study found that stopping one inhaled treatment for six weeks did not lower lung function. That is a question to decide with the CF team, never alone [[MayerHamblett2023SIMPLIFY]].',
  hook:'SIMPLIFY: stopping hypertonic saline (−0.32%) or dornase alfa (+0.35%) for 6 weeks was non-inferior for ppFEV1 on ETI [[MayerHamblett2023SIMPLIFY]].'},
 {from:.34,at:.42,k:'Step 3 · adherence',t:'Doing every treatment, every day',
  txt:'In 78 adults with data-logging nebulisers, self-report gave a median adherence of 80%, clinicians estimated 50–60%, and the device download showed 36% [[Daniels2011Adherence]]. In 3287 people in a US claims cohort, mean adherence to pulmonary medicines was 48% and fell with age; low adherence (MPR &lt;0.50 vs ≥0.80) was linked to more CF-related hospitalisations (rate ratio 1.35) [[Quittner2014Adherence]]. For CFTR modulators, electronic monitoring showed 61% [[Hansen2024Adherence]].',
  pt:'Most people find it hard to do every treatment every day. Teams want honest answers so they can help, not judge [[Daniels2011Adherence]].',
  hook:'Electronic monitoring shows far lower adherence than self-report: 36% vs 80% for nebulisers [[Daniels2011Adherence]].'},
 {from:.5,at:.6,k:'Step 4 · the life course',t:'School, transition and work',
  txt:'Families in a 2024 CF Foundation survey named absences for appointments, getting accommodations, infection control and the effect of CF on schoolwork as common school challenges [[Heimbruch2026]]. In 3876 US young people, the median gap between the last paediatric and first adult visit was 7.6 months, and gaps longer than 3 months predicted lower lung function [[Melton2024Transition]]. In 254 UK adults, 65% were in work or education; 40% had stopped a job because of CF, 47% said CF affected their career choice and 23% reported workplace discrimination [[Targett2014Employment]].',
  pt:'Moving from children\'s to adult CF care goes better when there is no long gap between visits [[Melton2024Transition]].',
  hook:'Transition gaps longer than 3 months between paediatric and adult care predict lower lung function [[Melton2024Transition]].'},
 {from:.67,at:.76,k:'Step 5 · mental health',t:'Mood, worry and screening',
  txt:'The TIDES study screened 6088 people with CF aged 12 and older and 4102 parents in 9 countries. Elevated depression: 10% of adolescents, 19% of adults, 37% of mothers and 31% of fathers. Elevated anxiety: 22%, 32%, 48% and 36%. These rates were 2–3 times those in community samples [[Quittner2014TIDES]]. The consensus statement reads: "The ICMH recommends annual screening for depression and anxiety with the PHQ-9 and GAD-7 for adolescents and adults with CF (ages 12–adulthood)" [[Quittner2016ICMH]].',
  pt:'Feeling low or anxious is common for people with CF and for their parents. From age 12, clinics check in about mood once a year [[Quittner2014TIDES,Quittner2016ICMH]].',
  hook:'Annual PHQ-9 and GAD-7 from age 12, plus annual screening offered to a caregiver of children aged 0–17 [[Quittner2016ICMH]].'},
 {from:.84,at:.93,k:'Step 6 · later life',t:'Carers, family and ageing',
  txt:'The 2024 ECFS standard "Planning for a longer life" frames people with CF "not as a \'problem\' to be solved, but as a success, a potential and a voice to be heard" [[Gramegna2024Standards]]. Reviews of an ageing CF population highlight cancer, cardiovascular disease, obesity and body-composition change, menopause and lifetime antimicrobial resistance [[Frost2025Ageing]]. In 8262 US adults who started ETI, 26.5% gained 5 kg or more in a year [[Ostrenga2026Obesity]]. The colorectal cancer task force puts the start of colonoscopy screening at age 40 (30 for transplant recipients) [[Hadjiliadis2018]].',
  pt:'Survival and outcome numbers come from large groups of people and are changing fast with new medicines. They cannot predict what will happen to any one person [[Schechter2021Depression,Frost2025Ageing]].',
  hook:'CF colorectal cancer screening: colonoscopy from age 40, or 30 after transplant [[Hadjiliadis2018]].'}];
/* the illustrative day: start hour, minutes, label, therapy id. Totals 108 min and 7 therapies (3 inhaled, 3 oral,
   airway clearance), the Sawicki 2009 mean and medians; hs and da are the two SIMPLIFY therapies */
const LV_DAY=[
 {h:7.0,m:30,lb:'airway clearance',id:'ac',c:'var(--rec)'},
 {h:7.6,m:12,lb:'hypertonic saline',id:'hs',c:'var(--water)'},
 {h:7.9,m:8,lb:'dornase alfa',id:'da',c:'var(--accent)'},
 {h:8.25,m:3,lb:'enzymes with breakfast',id:'enz',c:'var(--enzyme)'},
 {h:9.0,m:2,lb:'oral medicine',id:'or2',c:'var(--gold)'},
 {h:12.5,m:2,lb:'enzymes with lunch',id:'enz',c:'var(--enzyme)'},
 {h:16.0,m:1,lb:'enzymes with a snack',id:'enz',c:'var(--enzyme)'},
 {h:18.0,m:20,lb:'airway clearance',id:'ac',c:'var(--rec)'},
 {h:18.4,m:15,lb:'inhaled antibiotic',id:'inh3',c:'var(--rx)'},
 {h:19.0,m:3,lb:'enzymes with dinner',id:'enz',c:'var(--enzyme)'},
 {h:21.5,m:12,lb:'hypertonic saline',id:'hs',c:'var(--water)'},
 {h:22.0,m:0,lb:'vitamins',id:'or3',c:'var(--gold)'}];
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),note=$('#lvNote'),rd=$('#lvRead');
  let setSt=()=>{};
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  /* a horizontal bar with a label above it and a value at its end */
  function bar(x,y,w,v,max,col,lab,val,o={}){const h=o.h||13,bw=w*clamp(v/max);
    let s=lab?T(x,y-4,lab,'t-xs','fill:var(--ink)'):'';
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,bw))}" height="${h}" rx="4" style="fill:${col};opacity:.85"/>`;
    if(o.lo!=null){const a=x+w*o.lo/max,b=x+w*o.hi/max;s+=`<path d="M${f1(a)} ${f1(y+h/2)}H${f1(b)}M${f1(a)} ${f1(y+1)}V${f1(y+h-1)}M${f1(b)} ${f1(y+1)}V${f1(y+h-1)}" style="stroke:var(--ink);stroke-width:1.4"/>`}
    if(val)s+=T(x+Math.max(bw,o.lo!=null?w*o.hi/max:0)+6,y+h-3,val,'t-sm','fill:var(--ink);font-weight:700');
    return s}
  /* a 24-hour dial: midnight at the top, treatments as coloured arcs, a hand sweeping the day */
  function dial(cx,cy,r,hr,o={}){const A=h=>(h/24*360-90)*Math.PI/180,P=(h,rr)=>[cx+rr*Math.cos(A(h)),cy+rr*Math.sin(A(h))];
    let s=clock(cx,cy,r,hr*60,{full:1440,ticks:24,col:'var(--rec)'});
    /* cover the kit's 12-hour hands with a plain face, then draw a single 24-hour hand */
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.72)}" style="fill:var(--panel)"/>`;
    const arc=(h0,h1,rr)=>{const a=P(h0,rr),b=P(h1,rr);return `M${f1(a[0])} ${f1(a[1])}A${f1(rr)} ${f1(rr)} 0 ${h1-h0>12?1:0} 1 ${f1(b[0])} ${f1(b[1])}`};
    LV_DAY.forEach(d=>{const off=o.off&&o.off.includes(d.id),dur=Math.max(d.m,5)/60,done=hr>=d.h,op=off?.22:done?1:.28;
      s+=`<path d="${arc(d.h,d.h+dur,r*.82)}" style="fill:none;stroke:${d.c};stroke-width:${f1(r*.2)};opacity:${f1(op*(o.fade==null?1:1-(off?o.fade:0)*.6))}${off?';stroke-dasharray:3 3':''}"/>`});
    if(r>=100)[0,6,12,18].forEach(h=>{const p=P(h,r*.6);s+=T(p[0]+(h===6?-4:h===18?4:0),p[1]+3.5,['midnight','6 am','noon','6 pm'][h/6],'t-xs'+(h===6?' t-end':h===18?'':' t-mid'))});
    const hp=P(hr,r*.9);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(hp[0])}" y2="${f1(hp[1])}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="3.5" style="fill:var(--ink)"/>`;
    return s}
  function dayTotals(hr,off=[]){let m=0;const ids=new Set();LV_DAY.forEach(d=>{if(off.includes(d.id))return;if(hr>=d.h){m+=d.m;ids.add(d.id==='enz'?'or1':d.id)}});return {m,n:ids.size}}
  const hhmm=h=>{const H=Math.floor(h)%24,M=Math.floor((h%1)*60);return String(H).padStart(2,'0')+':'+String(M).padStart(2,'0')};
  /* ---- six scenes; u runs 0..1 inside each ---- */
  const SC=[
   (L,u,N)=>{const hr=lerp(5,24,ease(clamp(u/.9))),tt=dayTotals(hr);
     const cx=N?200:190,cy=N?190:200,r=N?118:128;let s=dial(cx,cy,r,hr);
     s+=T(cx,cy+r*.3,hhmm(hr),'t-big t-mid')+T(cx,cy+r*.3+14,'one illustrative day','t-xs t-mid');
     const bx=N?24:350,by=N?318:84;
     s+=T(bx,by,'time on treatment so far','t-sm')+`<text x="${bx}" y="${by+36}" class="t-big" style="font-size:34px;fill:var(--rec)">${tt.m}<tspan class="t-sm" style="font-size:13px"> min</tspan></text>`;
     s+=T(bx+(N?190:170),by,'therapies so far','t-sm')+`<text x="${bx+(N?190:170)}" y="${by+36}" class="t-big" style="font-size:34px;fill:var(--rec)">${tt.n}<tspan class="t-sm" style="font-size:13px"> of 7</tspan></text>`;
     /* the list of the day's slots, lit as the hand passes */
     const ly=by+64;const cols=2,cw=N?180:184;
     LV_DAY.forEach((d,i)=>{const c=i%cols,rw=Math.floor(i/cols),x=bx+c*cw,y=ly+rw*19,on=hr>=d.h;
       s+=`<rect x="${x}" y="${f1(y-8)}" width="9" height="9" rx="2" style="fill:${d.c};opacity:${on?1:.25}"/>`+T(x+14,y,`${hhmm(d.h)} ${d.lb.replace('enzymes with','enzymes +').replace('hypertonic saline','hypertonic saline').replace('inhaled antibiotic','inhaled antibiotic')}`,N?'t-xs':'t-sm',on?'fill:var(--ink)':'')});
     s+=T(bx,ly+6*19+10,'Totals match the study: mean 108 min, median 7 therapies','t-xs','fill:var(--ink)');
     return s},
   (L,u,N)=>{const f=ease(ramp(u,.05,.4));const cx=N?110:150,cy=N?140:185,r=N?84:118;
     let s=dial(cx,cy,r,24,{off:['hs','da'],fade:f});const tt=dayTotals(24,f>.5?['hs','da']:[]);
     s+=T(cx,cy+r*.3,(f>.5?tt.m:'108')+' min','t-big t-mid')+T(cx,cy+r*.3+14,f>.5?'if both were stopped':'the full day','t-xs t-mid');
     const fx=N?20:320,fy=N?262:70,fw=N?360:370;
     s+=T(fx,fy,'SIMPLIFY: stop minus continue, ppFEV1 change at 6 weeks','t-sm','fill:var(--ink);font-weight:600');
     const X=v=>fx+20+(fw-40)*(v+2)/4;
     s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${fy+12}" y2="${fy+96}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
     [-2,-1,0,1,2].forEach(v=>{s+=T(X(v),fy+110,(v>0?'+':'')+v,'t-xs t-mid')});
     s+=T(X(-2),fy+124,'favours continuing','t-xs')+T(X(2),fy+124,'favours stopping','t-xs t-end');
     [['hypertonic saline',-.32,-1.25,.6,'var(--water)'],['dornase alfa',.35,-.45,1.14,'var(--accent)']].forEach((q,j)=>{const y=fy+36+j*38,g=ease(ramp(u,.15+j*.1,.5+j*.1));
       s+=T(fx+20,y-10,q[0]+': '+(q[1]>0?'+':'')+q[1]+'% (95% CI '+q[2]+' to '+q[3]+')','t-xs','fill:var(--ink)');
       s+=`<path d="M${f1(X(lerp(q[1],q[2],g)))} ${y}H${f1(X(lerp(q[1],q[3],g)))}" style="stroke:${q[4]};stroke-width:3;stroke-linecap:round"/><rect x="${f1(X(q[1])-5)}" y="${y-5}" width="10" height="10" style="fill:${q[4]}"/>`});
     const ay=fy+(N?150:156);s+=T(fx,ay,'adverse events, stopped vs continued','t-sm','fill:var(--ink);font-weight:600');
     const g2=ease(ramp(u,.45,.85)),bw=N?150:160;
     [['saline: stopped',35,'var(--warn)'],['saline: continued',24,'var(--muted)'],['dornase: stopped',37,'var(--warn)'],['dornase: continued',23,'var(--muted)']].forEach((q,j)=>{
       const x=fx+(j>>1)*(bw+30),y=ay+22+(j%2)*30;s+=bar(x,y,bw,q[1]*g2,50,q[2],q[0],Math.round(q[1]*g2)+'%')});
     return s},
   (L,u,N)=>{const x0=N?20:40,w=N?300:470,y0=N?78:80;let s=T(x0,y0-22,'Nebuliser adherence in 78 adults, three ways (median)','t-sm','fill:var(--ink);font-weight:600');
     const sp=N?54:44;const R=[['what people said (self-report)',80,'var(--brand)'],['what clinicians estimated',55,'var(--accent)',50,60],['what the nebuliser recorded',36,'var(--rec)']];
     R.forEach((q,j)=>{const g=ease(ramp(u,.05+j*.14,.35+j*.14));s+=bar(x0,y0+j*sp,w,q[1]*g,100,q[2],q[0],j===1?'50–60%':Math.round(q[1]*g)+'%',j===1&&g>.95?{lo:q[3],hi:q[4],h:16}:{h:16})});
     const y1=y0+(N?184:150);s+=T(x0,y1,'Other measures','t-sm','fill:var(--ink);font-weight:600');
     const g4=ease(ramp(u,.5,.8)),g5=ease(ramp(u,.6,.9));
     s+=bar(x0,y1+24,w,48*g4,100,'var(--gold)','pulmonary medicines, US claims (mean, n=3287)',Math.round(48*g4)+'%',{h:14});
     s+=bar(x0,y1+(N?72:64),w,61*g5,100,'var(--rx)','CFTR modulators, electronic monitoring (review)',Math.round(61*g5)+'%',{h:14});
     const ny=y1+(N?122:104);
     if(u>.7)s+=`<g style="opacity:${f1(ramp(u,.7,.85))}">${T(x0,ny,'Low (MPR &lt;0.50) vs high (≥0.80) adherence: CF hospitalisations ×1.35','t-xs','fill:var(--ink)')}${T(x0,ny+14,N?'and US$14,211 higher concurrent costs':'and US$14,211 higher concurrent healthcare costs','t-xs')}</g>`;
     /* the honest gap: an arrow from 80 to 36 */
     if(u>.42){const a=x0+w*.8,b=x0+w*.36,yy=y0+2*sp+30,op=ramp(u,.42,.55);s+=`<path d="M${f1(a)} ${yy}H${f1(b+6)}" style="stroke:var(--bad);stroke-width:1.6;opacity:${f1(op)}" marker-end="url(#lvAr)"/>`+T((a+b)/2,yy+13,'the gap','t-xs t-mid',`fill:var(--bad);opacity:${f1(op)}`)}
     return s},
   (L,u,N)=>{const x0=N?24:40,w=N?352:640,ty=N?92:96,age=lerp(4,45,ease(u));
     let s=tline(x0,ty,w,{min:0,max:50,step:10,fmt:v=>v+' y',label:''}).svg;const X=v=>x0+w*v/50;
     const band=(a,b,lbl,col,row)=>{const on=age>=a;return `<rect x="${f1(X(a))}" y="${ty-30-row*16}" width="${f1(X(b)-X(a))}" height="12" rx="4" style="fill:${col};opacity:${on?.75:.2}"/>`+T(X(a)+4,ty-21-row*16,lbl,'t-xs',`fill:${on?'var(--on-brand)':'var(--muted)'};font-weight:600`)};
     s+=band(2,21,N?'school':'school (survey ages 2–21)','var(--accent)',1)+band(18,50,'adult CF care','var(--rec)',0)+band(0,18,'paediatric care','var(--brand)',0);
     s+=person(X(age),ty+8,22,'var(--ink)');
     const py=ty+46;
     if(age<18){s+=T(x0,py,N?'School challenges (2024 survey, n=146)':'School challenges families named (2024 survey, 146 people)','t-sm','fill:var(--ink);font-weight:600');
       ['frequent absences for appointments',N?'getting accommodations':'getting accommodations (medicines, bathroom passes)','managing infection control','CF health issues affecting schoolwork'].forEach((q,j)=>{const op=ramp(u,.02+j*.05,.08+j*.05);s+=`<g style="opacity:${f1(op)}"><circle cx="${x0+6}" cy="${py+20+j*20}" r="4" style="fill:var(--accent)"/>${T(x0+16,py+24+j*20,q,'t-sm','fill:var(--ink)')}</g>`});
       s+=T(x0,py+108,N?'Families wanted the CF team to raise school first':'Families preferred the CF team to start conversations about school','t-xs');
       {const op=ramp(u,.2,.3),qx=N?24:452,qy=N?py+136:py-14;s+=`<g style="opacity:${f1(op)}"><rect x="${qx}" y="${qy}" width="236" height="124" rx="10" style="fill:var(--accent-soft)"/>`;['ECFS standards: CF nurse','specialists visit schools,','with parental permission,','to teach staff about enzymes','and other medicines, time off','for clinic visits and adherence'].forEach((q,j)=>{s+=T(qx+12,qy+20+j*17,q,j?'t-xs':'t-sm',j?'fill:var(--ink)':'fill:var(--accent);font-weight:700')});s+='</g>'}}
     else if(age<26){const g=ease(ramp(age,18,22)),gx=x0,gw=N?340:520,mx=v=>gx+gw*v/12;
       s+=T(x0,py,N?'Gap between paediatric and adult clinic':'Moving to adult care: the gap between clinics (3876 young people)','t-sm','fill:var(--ink);font-weight:600');
       s+=`<rect x="${gx}" y="${py+18}" width="${gw}" height="22" rx="5" style="fill:var(--panel-2)"/><rect x="${gx}" y="${py+18}" width="${f1(mx(7.6*g)-gx)}" height="22" rx="5" style="fill:var(--warn);opacity:.8"/>`;
       s+=`<line x1="${f1(mx(3))}" x2="${f1(mx(3))}" y1="${py+12}" y2="${py+46}" style="stroke:var(--bad);stroke-width:2"/>`+T(mx(3),py+58,N?'3 mo: longer gaps, lower lung function':'3 months: longer gaps predicted lower lung function','t-xs','fill:var(--bad)');
       for(let m=0;m<=12;m+=3)s+=T(mx(m),py+74,m+' mo','t-xs t-mid');
       s+=T(mx(7.6*g)+(g>.8?-6:6),py+33,'median '+f1(7.6*g)+' months',g>.8?'t-sm t-end':'t-sm','fill:var(--ink);font-weight:700');
       if(N)s+=T(x0,py+98,'3876 US young people, 2013–2019','t-xs')+T(x0,py+118,'Centres more engaged in CF RISE had better','t-xs')+T(x0,py+132,'lung function and weight at the first adult visit','t-xs');else s+=T(x0,py+98,'Centres more engaged in the CF RISE programme had better lung function and weight','t-xs')}
     else{s+=T(x0,py,'Work: 254 UK adults with CF','t-sm','fill:var(--ink);font-weight:600');const bw=N?240:300;
       [['in work or education',65,'var(--rec)'],['of those: stopped a job because of CF',40,'var(--warn)'],['of those: CF affected career choice',47,'var(--gold)'],['of those: workplace discrimination',23,'var(--bad)']].forEach((q,j)=>{const g=ease(ramp(age,26+j*3,33+j*3));s+=bar(x0,py+22+j*30,bw,q[1]*g,100,q[2],q[0],Math.round(q[1]*g)+'%')});
       if(!N)s+=T(x0+bw+90,py+40,'Employment was linked to education,','t-xs','fill:var(--ink)')+T(x0+bw+90,py+54,'centre and CFQ-R role and health-','t-xs','fill:var(--ink)')+T(x0+bw+90,py+68,'perception scores, not clinical severity','t-xs','fill:var(--ink)');
       else s+=T(x0,py+146,'Linked to education and CFQ-R scores, not severity','t-xs','fill:var(--ink)');s+=T(x0,py+(N?170:152),N?'Denmark: similar education, lower employment':'Denmark 1990–2018: education matched comparators, employment was lower','t-xs')}
     return s},
   (L,u,N)=>{const G=[['adolescents',10,22],['adults',19,32],['mothers',37,48],['fathers',31,36]],x0=N?24:60,y0=N?82:84;
     let s=T(x0,y0-18,'TIDES: share screening with elevated symptoms (%)','t-sm','fill:var(--ink);font-weight:600');
     s+=`<rect x="${x0}" y="${y0-8}" width="10" height="8" style="fill:var(--brand)"/>`+T(x0+14,y0,'depression','t-xs')+`<rect x="${x0+90}" y="${y0-8}" width="10" height="8" style="fill:var(--accent)"/>`+T(x0+104,y0,'anxiety','t-xs');
     if(N){G.forEach((q,j)=>{const y=y0+30+j*58,g=ease(ramp(u,.04+j*.1,.34+j*.1));s+=T(x0,y-6,q[0],'t-sm','fill:var(--ink);font-weight:600');
         s+=bar(x0,y,250,q[1]*g,60,'var(--brand)','',Math.round(q[1]*g)+'%',{h:12})+bar(x0,y+16,250,q[2]*g,60,'var(--accent)','',Math.round(q[2]*g)+'%',{h:12})})}
     else{const bw=58,gap=104,base=y0+214,H=180/60;G.forEach((q,j)=>{const x=x0+j*gap,g=ease(ramp(u,.04+j*.1,.34+j*.1));
         [[q[1],'var(--brand)'],[q[2],'var(--accent)']].forEach((v,k)=>{const hh=v[0]*g*H;s+=`<rect x="${x+k*(bw/2+2)}" y="${f1(base-hh)}" width="${bw/2}" height="${f1(hh)}" rx="3" style="fill:${v[1]};opacity:.85"/>`+T(x+k*(bw/2+2)+bw/4,base-hh-4,Math.round(v[0]*g),'t-xs t-mid','fill:var(--ink);font-weight:700')});
         s+=T(x+bw/2,base+14,q[0],'t-xs t-mid','fill:var(--ink)')});
       s+=`<line x1="${x0-6}" x2="${x0+4*gap-30}" y1="${base}" y2="${base}" class="axis"/>`}
     const sx=N?24:500,sy=N?346:84,op=ramp(u,.5,.7);
     s+=`<g style="opacity:${f1(op)}"><rect x="${sx-8}" y="${sy-16}" width="${N?360:210}" height="${N?150:236}" rx="10" style="fill:var(--rec-soft)"/>`;
     const lines=N?['ICMH: screen every year from age 12','PHQ-9 (depression) and GAD-7 (anxiety)','Offer a caregiver screening too','(children aged 0–17)','Mild: education and rescreening','Moderate: CBT or IPT','Rates 2–3× community samples']
       :['ICMH consensus:','annual PHQ-9 (depression)','and GAD-7 (anxiety),','ages 12 to adulthood','','offer a caregiver annual','screening for children 0–17','','stepped care: mild = education','and rescreening; moderate =','CBT or IPT','','rates were 2–3× community samples'];
     lines.forEach((q,j)=>{s+=T(sx,sy+j*(N?18:16.5),q,j===0?'t-sm':'t-xs',j===0?'fill:var(--rec);font-weight:700':'fill:var(--ink)')});
     return s+'</g>'},
   (L,u,N)=>{const x0=N?24:40;let s='';const y0=N?66:70,bw=N?352:330;
     s+=T(x0,y0,'Weight change 1 year after starting ETI (8262 US adults)','t-sm','fill:var(--ink);font-weight:600');
     const W=[['lost',18.1,'var(--accent)'],['gained <5 kg',55.4,'var(--rec)'],['5 to <10 kg',20,'var(--gold)'],['≥10 kg',6.5,'var(--warn)']];let xx=x0;const g=ease(ramp(u,.04,.4));
     W.forEach((q,j)=>{const ww=bw*q[1]/100*g;s+=`<rect x="${f1(xx)}" y="${y0+12}" width="${f1(Math.max(0,ww-1))}" height="22" style="fill:${q[2]};opacity:.85"/>`;
       if(g>.9)s+=T(Math.min(xx+2,x0+bw-(N?62:70)),y0+(j%2?62:50),q[0]+' '+q[1]+'%','t-xs','fill:var(--ink)');xx+=ww});
     const cy=N?y0+100:y0+110;s+=T(x0,cy,N?'Digestive-tract cancer vs general population (SIR)':'Digestive-tract cancer risk (SIR, US 1990–2009)','t-sm','fill:var(--ink);font-weight:600');
     const g2=ease(ramp(u,.3,.65));s+=bar(x0,cy+24,bw,3.5*g2,20,'var(--brand)','no transplant',f1(3.5*g2)+'×')+bar(x0,cy+58,bw,17.3*g2,20,'var(--bad)','after transplant',f1(17.3*g2)+'×');
     const ky=cy+102;s+=`<g style="opacity:${f1(ramp(u,.4,.55))}">`+T(x0,ky,'Colonoscopy screening, as the CFF task force recommends:','t-sm','fill:var(--ink);font-weight:600');
     const tx=x0,tw=bw,X=a=>tx+tw*(a-20)/40;s+=tline(tx,ky+30,tw,{min:20,max:60,step:10,fmt:v=>v}).svg;
     s+=`<circle cx="${f1(X(40))}" cy="${ky+30}" r="6" style="fill:var(--brand)"/><circle cx="${f1(X(30))}" cy="${ky+30}" r="6" style="fill:var(--bad)"/>`+T(X(40)+9,ky+24,'40: start','t-xs','fill:var(--ink)')+T(X(30)-4,ky+12,'30: after transplant','t-xs','fill:var(--bad)')+'</g>';
     const cx=N?24:440,cyy=N?ky+66:84;
     s+=`<g style="opacity:${f1(ramp(u,.5,.65))}"><rect x="${cx-8}" y="${cyy-16}" width="${N?360:272}" height="${N?96:150}" rx="10" style="fill:var(--brand-soft)"/>`;
     (N?['Carers count too: TIDES found 37% of mothers','and 31% of fathers with elevated depression;','teens of a depressed parent were more','likely to score high themselves (OR 2.32)']
       :['Carers count too','TIDES: 37% of mothers and 31% of','fathers screened with elevated depression;','adolescents whose parents reported','depression were more likely to score','high themselves (OR 2.32)','']).forEach((q,j)=>{s+=T(cx,cyy+j*17,q,!N&&j===0?'t-sm':'t-xs',!N&&j===0?'fill:var(--brand);font-weight:700':'fill:var(--ink)')});
     return s+'</g>'}];
  function draw(t){const N=vb(svg,'720 380','400 540'),p=phaseOf(LV_STEPS,t),S=LV_STEPS[p],nx=LV_STEPS[p+1]?LV_STEPS[p+1].from:1.0001,u=clamp((t-S.from)/(nx-S.from));
    let s=`<defs>${marker('lvAr','var(--bad)',6)}</defs>`;
    s+=T(N?16:20,26,S.t,'t-big','fill:var(--rec)')+T(N?16:20,42,S.k,'t-sm');
    s+=SC[p]({},u,N);
    /* scene strip */
    const sx=N?16:20,sw=(N?368:680)/6,sy=N?520:356;
    LV_STEPS.forEach((q,j)=>{s+=`<rect x="${f1(sx+j*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${j===p?'var(--rec)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(sx+(N?368:680)*t)}" cy="${sy+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const tt=dayTotals(24);
    rd.innerHTML=[`<span>Illustrative day <b>${tt.m} min · ${tt.n} therapies</b></span>`,`<span>SIMPLIFY <b>stop ≈ continue at 6 weeks</b></span>`,`<span>Self-report vs device <b>80% vs 36%</b></span>`,`<span>Transition gap <b>median 7.6 months</b></span>`,`<span>Screening <b>PHQ-9 + GAD-7 yearly from 12</b></span>`,`<span>Colonoscopy <b>from 40 (30 after transplant)</b></span>`][p];
    note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#lvPlay'),draw,42000,'Replay','living');
  setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- life-stage selector ---------- */
  const LS={
   early:{h:'Early childhood',tag:'0–5 years',p:['Newly diagnosed infants are seen more often, at first weekly; routine visits for stable disease are every 2–3 months [[Conway2014ECFS]].','In the pre-school years the CF nurse specialist works with the dietitian on adjusting enzyme therapy, including what to do when a child refuses enzymes, and with the physiotherapist on airway clearance and exercise [[Conway2014ECFS]].','The CFF/ECFS consensus recommends offering at least one primary caregiver of a child aged 0–17 annual screening for depression and anxiety [[Quittner2016ICMH]].'],
     fig:['weekly','first visits for new infants [[Conway2014ECFS]]']},
   school:{h:'School years',tag:'2–21 years',p:['Common school challenges: frequent absences for appointments, getting accommodations (medicines, bathroom passes), managing infection control, and the effect of CF on schoolwork [[Heimbruch2026]].','Families preferred the CF care team to start conversations about school [[Heimbruch2026]].','ECFS standards describe CF nurse specialists visiting schools, with parental permission, to teach staff about nutrition, enzymes and other medicines, time off for clinic visits, and adherence [[Conway2014ECFS]].','Haggie summarises the infection-control guideline\'s advice that children with CF at the same school should avoid contact and shared facilities [[Haggie2020,Saiman2014IPC]].'],
     fig:['146','people with CF and caregivers surveyed [[Heimbruch2026]]']},
   teen:{h:'Adolescence',tag:'12–18 years',p:['From age 12, annual PHQ-9 and GAD-7 screening is recommended [[Quittner2016ICMH]].','The CF nurse specialist should be able to discuss honestly recreational drugs, sexuality and contraception, fertility and pregnancy, education and employment, body image, and adherence and self-care [[Conway2014ECFS]].','Reproductive-health education should begin early in adolescence: men first told about CF infertility after age 20 were more likely to report being "very upset" than those told before 16 [[West2022SRH]].','In 50 adolescents and young adults, YouTube, Snapchat and Instagram were the most-used platforms; they were interested in a CF-specific platform [[Perkins2021SocialMedia]].'],
     fig:['10%','of adolescents screened with elevated depression; 22% anxiety [[Quittner2014TIDES]]']},
   transition:{h:'Transition to adult care',tag:'late teens',p:['ECFS: all children with CF should move from paediatric to adult care, with paediatric and adult CF nurse specialists coordinating the move [[Conway2014ECFS]].','The median gap between the last paediatric and first adult visit was 7.6 months; gaps over 3 months predicted lower lung function [[Melton2024Transition]].','Centres more engaged in the CF RISE transition programme had better lung function and weight at the first adult visit [[Melton2024Transition]].','In the US, more than half of people with CF were expected to be adults by 2010, and the CF Foundation required accredited programmes to set up adult CF programmes [[Tuchman2010Transition]].'],
     fig:['7.6 mo','median gap between paediatric and adult clinics [[Melton2024Transition]]']},
   work:{h:'Adult life and work',tag:'adults',p:['In 254 UK adults, 65% were in work or education; 40% had stopped a job because of CF, 47% said CF affected their career choice and 23% reported workplace discrimination [[Targett2014Employment]].','Employment was associated with education, centre and the CFQ-R role and health-perception domains, not with clinical severity [[Targett2014Employment]].','In Denmark (1990–2018) the adult CF population grew almost fourfold; education matched comparators, but adults with CF were less often employed [[Jensen2024Employment]].','The ECFS 2024 standards stress a physically active lifestyle and the "strict avoidance of all recreational inhalations, including e-cigarettes" [[Southern2024Standards]].'],
     fig:['65%','of UK adults with CF in work or education [[Targett2014Employment]]']},
   family:{h:'Relationships and family',tag:'any age',p:['The CFF position paper says reproductive-health education should begin at diagnosis and be revisited every year [[Jain2026CFFReproductive]].','Pregnancies among people with CF in the US registry nearly doubled to 619 in 2020, after modulators were approved for most people with CF [[Montemayor2022Pregnancy]].','Parenting adds burden: caring for a newborn, physical change after birth, and keeping up CF treatments [[Shteinberg2021Fertility]].','The full story is in <a href="#pregnancy" data-go="pregnancy">Fertility, pregnancy &amp; parenthood</a>.'],
     fig:['619','US pregnancies in 2020, up from 200–310 a year [[Montemayor2022Pregnancy]]']},
   ageing:{h:'Ageing with CF',tag:'40s and beyond',p:['ECFS "Planning for a longer life" covers the life moments CF teams should support, including having a family [[Gramegna2024Standards]].','Reviews highlight cancer, cardiovascular disease, obesity and body-composition change, menopause and lifetime antimicrobial resistance [[Frost2025Ageing]].','A case series described new high blood pressure in 4 adults within weeks of starting ETI; the authors suggest monitoring cardiovascular measures <span class="ev early">Early evidence</span> [[Gramegna2022Hypertension]].','ECFS 2024: cancer is more common in people with CF and needs regular screening; planning for end of life should be discussed "openly, honestly, with sensitivity and compassion" [[Burgel2024Standards]].'],
     fig:['40','age to start colonoscopy screening (30 after transplant) [[Hadjiliadis2018]]']}};
  const lsOut=$('#lvStage');
  function setLs(k){const c=LS[k];$$('[data-ls]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ls===k));
    lsOut.innerHTML=`<div class="lv-fig"><span class="big-num">${c.fig[0]}</span><small>${c.fig[1]}</small></div><div class="lv-body"><p class="kicker">${c.tag}</p><h4>${c.h}</h4><ul>${c.p.map(x=>`<li>${x}</li>`).join('')}</ul></div>`}
  $$('[data-ls]').forEach(b=>b.addEventListener('click',()=>setLs(b.dataset.ls)));
  setLs('school');
};
