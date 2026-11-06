/* =============== 2.3 Sweat, diabetes, bones & fertility =============== */
/* Two interactives. (1) orSvg: CF-related diabetes over a lifetime: islets in a scarring pancreas fade as age runs
   on, registry prevalence by age band builds up, weight and lung function dip before diagnosis, the yearly OGTT,
   and treatment with insulin. (2) orBody: a body outline with one toggle per organ (sweat, sinuses, hearing, bones,
   joints, kidneys, male and female reproductive tract); each lights its organ and draws a chart of the cited
   figures beside it. Schematic: anatomy and the insulin bar are not to scale; plotted numbers are the cited ones. */
inits.organs=()=>{
  const svg=$('#orSvg'),rg=$('#orT'),note=$('#orNote');
  const STEPS=[
    {from:0,at:.07,k:'Childhood · the islets',t:'Islets sit inside a scarring pancreas',sub:'insulin secretion is impaired in almost everyone',
      txt:'The insulin-making islets (blue rings) sit inside the pancreas. Insulin secretion defects are present in essentially all people with CF, partly because damage to the islets spreads from the destruction of the exocrine pancreas (ISPAD 2022) [[Ode2022ISPAD]]. CF-related diabetes (CFRD) is a distinct type of diabetes, different from type 1 and type 2, and is linked with worse health outcomes in CF [[Kelly2013]].',
      pt:'The pancreas has small clusters of cells, the islets, that make insulin. In CF the scarring around them slowly damages them too.',
      hook:'CFRD is its own type of diabetes, neither type 1 nor type 2 [[Kelly2013]].'},
    {from:.15,at:.24,k:'Adolescence · insulin falls short',t:'Islets are lost; insulin falls short',sub:'often with normal fasting sugar at first',
      txt:'In younger people, CFRD without fasting hyperglycaemia predominates; fasting hyperglycaemia becomes more common with age [[Moran2009Trends]]. Fasting glucose alone misses the diagnosis in about half of people with CFRD, those without fasting hyperglycaemia [[Moran2010CFRD]]. CFRD is more common with female sex, pancreatic insufficiency, severe genotypes and CF liver disease [[Ode2022ISPAD]].',
      pt:'Early on, blood sugar is often normal before breakfast and only rises after food. That is why a fasting test is not enough.',
      hook:'Fasting glucose misses about half of CFRD [[Moran2010CFRD]].'},
    {from:.32,at:.48,k:'Adulthood · prevalence',t:'CFRD becomes common with age',sub:'registry prevalence by age band',
      txt:'In the Minnesota cohort, CFRD was present in 2% of children, 19% of adolescents and 40–50% of adults [[Moran2009Trends]]. The European registry (insulin use as proxy) gives 0.8% under 10, 9.7% at 10–19, 24.1% at 20–29 and 32.7% at 30 and over; the US registry in 2020 about 20% of 20-year-olds, 30% of 30-year-olds and just under 40% of 40-year-olds [[Ode2022ISPAD]]. Both registries may underestimate, because US screening rates are below 70% in teens and below 40% in adults [[Ode2022ISPAD]].',
      pt:'Many adults with CF develop this special type of diabetes [[Moran2010CFRD]]. The numbers describe groups of people, not what will happen to any one person.',
      hook:'CFRD: about 2% of children, 19% of adolescents, 40–50% of adults (Minnesota) [[Moran2009Trends]].'},
    {from:.52,at:.62,k:'Before diagnosis',t:'Weight and lungs dip years before',sub:'changes before diagnosis, Danish matched study',
      txt:'In 38 matched pairs, weight, BMI, FEV1 and FVC began to fall years before diabetes was diagnosed: differences emerged 4 years before for weight and BMI, 3 years before for FVC and 1.25 years before for FEV1 [[Lanng1992]]. In 152 people followed for 4 years, lung function fell fastest in those with CFRD without fasting hyperglycaemia at baseline and slowest in those with normal glucose tolerance [[Milla2000]].',
      pt:'Diabetes in CF can quietly pull down weight and breathing before anyone names it, which is why it is looked for every year.',
      hook:'Weight and BMI fall about 4 years, FEV1 about 1.25 years, before CFRD is diagnosed [[Lanng1992]].'},
    {from:.68,at:.78,k:'Screening, as published',t:'A yearly 2-hour OGTT from age 10',sub:'a 75 g glucose drink, blood glucose at 2 hours',
      txt:'ADA/CFF 2010: annual CFRD screening should begin by age 10 in everyone with CF who does not have CFRD, using a 2-hour 75-g oral glucose tolerance test (OGTT); HbA1c is not recommended as a screening test because it is not sensitive enough. Diagnostic thresholds include a 2-hour glucose ≥200 mg/dL (11.1 mmol/L), fasting glucose ≥126 mg/dL (7.0 mmol/L) or HbA1c ≥6.5% [[Moran2010CFRD]]. ISPAD 2022 finds not enough evidence to replace the OGTT with continuous glucose monitoring, or to change screening for people on highly effective modulators [[Ode2022ISPAD]].',
      pt:'A yearly sugar-drink test from age 10 helps catch it early [[Moran2010CFRD]].',
      hook:'CFRD screening: yearly 2-hour 75-g OGTT from age 10; HbA1c is not a screening test [[Moran2010CFRD]].'},
    {from:.84,at:.93,k:'Treatment, as published',t:'Insulin, and a better outlook',sub:'BMI on insulin, and deaths per 100 patient-years',
      txt:'ADA/CFF 2010: people with CFRD should be treated with insulin; oral diabetes agents are not as effective and are not recommended outside research trials [[Moran2010CFRD]]. In the CFRDT trial, insulin aspart reversed a BMI loss of 0.30 units a year to a gain of 0.39 after 1 year [[Moran2009CFRDT]]. From 1992–1997 to 2003–2008, CFRD mortality fell from 6.9 to 3.2 deaths per 100 patient-years in females and from 6.5 to 3.8 in males, and the sex difference disappeared [[Moran2009Trends]]. People with CFRD keep the high-calorie, high-salt, high-fat CF diet [[Moran2010CFRD,Ode2022ISPAD]].',
      pt:'Insulin treats it, and people keep eating the high-energy CF diet: cutting calories is almost never right in CFRD [[Moran2010CFRD,Ode2022ISPAD]].',
      hook:'Insulin is the recommended treatment for CFRD; oral agents are not, outside trials [[Moran2010CFRD]].'}
  ];
  const STRIP=['islets','insulin','prevalence','lead time','OGTT','insulin Rx'];
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const ink='fill:var(--ink)',bold='fill:var(--ink);font-weight:600';
  function hbar(x,y,w,v,max,col,lab,val,o={}){const h=o.h||11,vv=clamp(v/max);let s=tx(x,y-4,lab,'t-xs',ink);
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="3" style="fill:var(--panel-2)"/>`;
    if(o.lo!=null){const a=clamp(o.lo/max);s+=`<rect x="${f1(x+w*a)}" y="${f1(y)}" width="${f1(Math.max(0,w*(vv-a)))}" height="${h}" rx="3" style="fill:${col}"/><line x1="${f1(x)}" x2="${f1(x+w*a)}" y1="${f1(y+h/2)}" y2="${f1(y+h/2)}" style="stroke:${col};stroke-width:1;stroke-dasharray:2 2"/>`}
    else s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*vv)}" height="${h}" rx="3" style="fill:${col}"/>`;
    return s+tx(x+w*vv+5,y+h-2,val,'t-xs',bold)}
  const ISL=[[70,44],[112,40],[150,34],[96,52]];
  /* left: the pancreas with its islets and an insulin bar */
  function left(A,t,N){const s=Math.min(A.w*.92/200,(N?A.h*.62:A.h*.5)/100),px=A.x+(A.w-196*s)/2,py=A.y+8;
    const alive=1-.8*ramp(t,.1,.5),fib=.3+.7*ramp(t,.04,.34);
    let g=pancreas(px,py,s,{block:1,flow:.25,ph:t*5,fib,islets:alive,labels:true}).svg;
    /* insulin leaving the islets: fewer as they fade */
    ISL.forEach((q,i)=>{for(let j=0;j<2;j++){const u=((t*6+i*.31+j*.5)%1+1)%1;if(((i*2+j)/8)>alive)continue;
      g+=`<circle cx="${f1(px+q[0]*s)}" cy="${f1(py+(q[1]-u*30)*s)}" r="2.6" style="fill:var(--bicarb);opacity:${f1((1-u)*.9)}"/>`}});
    if(alive<.95)ISL.forEach(q=>{g+=`<circle cx="${f1(px+q[0]*s)}" cy="${f1(py+q[1]*s)}" r="${f1(3.6*s)}" style="fill:none;stroke:var(--bad);stroke-width:1.2;stroke-dasharray:2 2;opacity:${f1(1-alive)}"/>`});
    g+=tx(px+70*s,py-2+ (N?0:0),'○ islets make insulin','t-xs',`fill:var(--bicarb);font-weight:600`);
    const by=py+100*s+(N?42:36),bw=A.w-70;
    g+=tx(A.x,by-6,'insulin release (schematic)','t-xs',ink)+`<rect x="${f1(A.x)}" y="${f1(by)}" width="${f1(bw)}" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(A.x)}" y="${f1(by)}" width="${f1(bw*lerp(.25,1,alive))}" height="12" rx="4" style="fill:var(--bicarb)"/>`;
    const age=Math.round(45*ramp(t,.02,.5));
    g+=`<text x="${f1(A.x+A.w)}" y="${f1(by+11)}" class="t-big t-end" style="font-size:22px;fill:var(--brand)">${age}</text>`+tx(A.x+A.w,by+24,'age, years','t-xs t-end');
    return g}
  /* right, phases 0-2: prevalence by age */
  function prev(B,t,N){const age=45*ramp(t,.02,.5),x=B.x+26,y=B.y+24,w=B.w-36,h=B.h-(N?92:96),X=a=>x+w*a/50,Y=v=>y+h-h*v/50;
    let g=tx(B.x,B.y+8,'people with CFRD, % by age','t-sm',bold);
    g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/>`;
    [10,20,30,40,50].forEach(v=>{g+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(x-4,Y(v)+3,v,'t-xs t-end')});
    [0,10,20,30,40,50].forEach(a=>{g+=tx(X(a),y+h+12,a,'t-xs t-mid')});g+=tx(x+w,y+h+24,'age, years','t-xs t-end');
    const EU=[[0,10,.8,'0.8'],[10,20,9.7,'9.7'],[20,30,24.1,'24.1'],[30,50,32.7,'32.7 (≥30)']];
    EU.forEach(([a0,a1,v,l])=>{const k=ramp(age,a0,a0+5);if(k<=0)return;g+=`<rect x="${f1(X(a0)+2)}" y="${f1(Y(v*k))}" width="${f1(X(a1)-X(a0)-4)}" height="${f1(Y(0)-Y(v*k))}" rx="2" style="fill:var(--brand);opacity:.28"/>`;
      if(k>.95)g+=tx((X(a0)+X(a1))/2,Y(v)-4,l,'t-xs t-mid',bold)});
    const US=[[20,20],[30,30],[40,39]];let d='';US.forEach(([a,v],i)=>{if(age>=a){d+=(d?'L':'M')+f1(X(a))+' '+f1(Y(v))}});
    if(d)g+=`<path d="${d}" style="fill:none;stroke:var(--bicarb);stroke-width:2.4"/>`;
    US.forEach(([a,v])=>{if(age>=a)g+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="4.5" style="fill:var(--bicarb);stroke:var(--panel);stroke-width:1.5"/>`});
    g+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="${f1(y)}" y2="${f1(y+h)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
    const ly=y+h+(N?40:42);
    g+=`<rect x="${f1(B.x)}" y="${f1(ly-8)}" width="12" height="8" style="fill:var(--brand);opacity:.28"/>`+tx(B.x+16,ly,'European registry 2008–2015','t-xs',ink);
    g+=`<circle cx="${f1(B.x+(N?190:196))}" cy="${f1(ly-4)}" r="4" style="fill:var(--bicarb)"/>`+tx(B.x+(N?198:204),ly,'US registry 2020','t-xs',ink);
    g+=tx(B.x,ly+14,'Minnesota: children 2%, adolescents 19%, adults 40–50%','t-xs');
    return g}
  /* phase 3: lead time before diagnosis */
  function lead(B,t,N){const cur=lerp(-5,.6,ramp(t,.53,.66)),x=B.x+(N?84:96),w=B.w-(N?96:110),X=v=>x+w*(v+5)/6;
    let g=tx(B.x,B.y+8,'years before CFRD diagnosis','t-sm',bold)+tx(B.x,B.y+21,'when each measure began to fall (38 matched pairs)','t-xs');
    const R=[['weight & BMI',-4],['FVC',-3],['FEV1',-1.25]];
    R.forEach(([n,st],i)=>{const yy=B.y+(N?56:62)+i*(N?46:50);g+=tx(B.x,yy+4,n,'t-sm',bold)+`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--line);stroke-width:1.4"/>`;
      if(cur>st){const e=Math.min(cur,0);g+=`<path d="M${f1(X(-5))} ${f1(yy)}L${f1(X(st))} ${f1(yy)}L${f1(X(e))} ${f1(yy+14*(e-st)/(-st))}" style="fill:none;stroke:var(--bad);stroke-width:2.4;stroke-linejoin:round"/>`;
        g+=`<circle cx="${f1(X(st))}" cy="${f1(yy)}" r="4" style="fill:var(--bad)"/>`+tx(X(st),yy-8,`${st} y`,'t-xs t-mid','fill:var(--bad);font-weight:700')}
      else g+=`<line x1="${f1(X(-5))}" x2="${f1(X(Math.min(cur,0)))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--good);stroke-width:2.4"/>`});
    const ay=B.y+(N?56:62)+3*(N?46:50)-6,tl=tline(x,ay,w,{min:-5,max:1,step:1,fmt:v=>v===0?'0 dx':v});g+=tl.svg;
    g+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${f1(B.y+40)}" y2="${f1(ay)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`+tx(X(0)+4,B.y+44,'diagnosis','t-xs',bold);
    g+=tx(B.x,ay+(N?34:36),'slopes are schematic; start times as published','t-xs');
    return g}
  /* phase 4: the OGTT */
  function ogtt(B,t,N){const m=120*ramp(t,.69,.79),cx=B.x+(N?52:56),cy=B.y+(N?62:66);
    let g=clock(cx,cy,N?38:42,m,{full:120,col:'var(--bicarb)',label:`${Math.round(m)} of 120 min`,ticks:8});
    const gx=B.x+(N?116:126);g+=`<path d="M${gx} ${f1(cy-26)}h26l-4 46h-18z" style="fill:var(--water-soft);stroke:var(--muted);stroke-width:1.2"/>`+tx(gx+13,cy+34,'75 g glucose','t-xs t-mid',ink);
    const tx0=B.x+(N?172:176);
    g+=tx(tx0,B.y+14,'CFRD diagnostic thresholds','t-xs',bold)+tx(tx0,B.y+28,'(ADA/CFF 2010, as published)','t-xs');
    [['2-hour glucose ≥200 mg/dL','(11.1 mmol/L)'],['fasting glucose ≥126 mg/dL','(7.0 mmol/L)'],['HbA1c ≥6.5%','but not a screening test']].forEach(([a,b],i)=>{const yy=B.y+48+i*30;
      g+=`<rect x="${f1(tx0-4)}" y="${f1(yy-11)}" width="${f1(B.x+B.w-tx0+4)}" height="27" rx="6" style="fill:${i===0&&m>=119?'var(--dx-soft)':'var(--panel-2)'}"/>`+tx(tx0+2,yy,a,'t-xs',bold)+tx(tx0+2,yy+11,b,'t-xs')});
    const ay=B.y+B.h-(N?54:52),x=B.x+8,w=B.w-22,tl=tline(x,ay,w,{min:0,max:40,step:10});g+=tl.svg+tx(B.x,ay-30,'a yearly OGTT from age 10','t-sm',bold);
    const nOn=Math.floor(30*ramp(t,.7,.83));for(let a=10;a<=40;a++){const on=a-10<nOn;g+=`<circle cx="${f1(tl.X(a))}" cy="${f1(ay-12)}" r="2.8" style="fill:${on?'var(--bicarb)':'var(--line)'}"/>`}
    g+=tx(x+w,ay+30,'age, years','t-xs t-end');
    return g}
  /* phase 5: treatment and outlook */
  function treat(B,t,N){const k=ramp(t,.85,.95),x0=B.x+B.w*.5,sc=(B.w*.36)/.45;
    let g=tx(B.x,B.y+8,'BMI change, units a year (CFRDT trial)','t-sm',bold);
    const row=(yy,v,l,col)=>{const w=v*sc*k;return tx(v<0?x0+4:x0-4,yy+9,l,'t-xs'+(v<0?'':' t-end'),ink)+`<rect x="${f1(Math.min(x0,x0+w))}" y="${f1(yy)}" width="${f1(Math.abs(w))}" height="12" rx="3" style="fill:${col}"/>`+tx(w<0?x0+w-4:x0+w+4,yy+10,(v>0?'+':'')+(v*k).toFixed(2),'t-xs'+(w<0?' t-end':''),bold)};
    g+=`<line x1="${f1(x0)}" x2="${f1(x0)}" y1="${f1(B.y+18)}" y2="${f1(B.y+70)}" style="stroke:var(--muted)"/>`;
    g+=row(B.y+26,-.30,'year before insulin','var(--bad)')+row(B.y+50,.39,'year on insulin','var(--good)');
    const y2=B.y+(N?104:106),bw=B.w-60;g+=tx(B.x,y2,'CFRD deaths per 100 patient-years','t-sm',bold);
    g+=hbar(B.x,y2+22,bw,6.9,8,'var(--muted)','females 1992–1997','6.9')+hbar(B.x,y2+50,bw,lerp(6.9,3.2,k),8,'var(--rec)','females 2003–2008',f1(lerp(6.9,3.2,k)));
    g+=hbar(B.x,y2+80,bw,6.5,8,'var(--muted)','males 1992–1997','6.5')+hbar(B.x,y2+108,bw,lerp(6.5,3.8,k),8,'var(--rec)','males 2003–2008',f1(lerp(6.5,3.8,k)));
    g+=tx(B.x,y2+(N?134:136),'Minnesota cohort statistics, not predictions','t-xs');
    return g}
  const RIGHT=[prev,prev,prev,lead,ogtt,treat];
  function draw(t){const N=vb(svg,'720 384','400 640'),p=phaseOf(STEPS,t),P=STEPS[p];
    const L=N?{tx:16,ty:26,A:{x:16,y:54,w:368,h:220},B:{x:16,y:300,w:368,h:270},sx:16,sy:606,sw:368}
             :{tx:20,ty:28,A:{x:20,y:62,w:290,h:270},B:{x:336,y:62,w:366,h:270},sx:20,sy:352,sw:680};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big">${P.t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${P.sub}</text>`;
    s+=N?`<line x1="16" x2="384" y1="${L.B.y-14}" y2="${L.B.y-14}" style="stroke:var(--line)"/>`:`<line x1="${L.B.x-14}" x2="${L.B.x-14}" y1="${L.B.y}" y2="${L.B.y+L.B.h}" style="stroke:var(--line)"/>`;
    s+=left(L.A,t,N)+RIGHT[p](L.B,t,N);
    const sw=L.sw/STRIP.length;
    STRIP.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q}</text>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;note.innerHTML=noteHTML(P);setA(p)}
  const stop=playWire(rg,$('#orPlay'),draw,28000,'%t:player.replay%','organs');
  const setA=stepWire($('#orSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* =============== the body map =============== */
  const body=$('#orBody'),info=$('#orInfo');
  const ORG={
    sweat:{t:'Sweat, salt and heat',items:[
      'In CF the sweat duct cannot take salt back as sweat flows up it, so the sweat that reaches the skin stays salty <span class="ev est">Established</span> [[Quinton1983]].',
      'Sweat-gland dysfunction can cause "heat shock" (salt depletion) in people with CF [[Elborn2016]].',
      'Pseudo-Bartter syndrome is low chloride, low sodium (hyponatraemia), low potassium and a metabolic alkalosis from salt lost in sweat; it can be the first presentation of CF in early childhood [[Mantoo2020]].',
      'The CFF infant guideline recommends 1/8 teaspoon of table salt a day from diagnosis, rising to 1/4 teaspoon at 6 months (about 12.5 mEq of sodium per 1/8 teaspoon), because baby foods contain no added salt [[Borowitz2009]]. Quoted for teaching, not as advice.']},
    sinus:{t:'Sinuses and nasal polyps',items:[
      'Chronic rhinosinusitis is highly prevalent in CF and adds to lung disease; nasal polyps are more common at all ages and look more neutrophilic than polyps in people without CF [[Hamilos2016]].',
      'On endoscopy of 211 adults with CF, 37% had nasal polyps; the commonest symptoms were discharge, headache and obstruction [[Hadfield2000]].',
      'In 64 people, one year of elexacaftor/tezacaftor/ivacaftor cut the median Lund-Mackay sinus CT score from 5.8 to 3.3 [[Sheikh2023]].']},
    hear:{t:'Hearing and aminoglycosides',items:[
      'In 63 children with CF who had IV aminoglycosides, 15 (24%) had ototoxicity on extended high-frequency audiometry; 11 of them had received at least 10 courses [[AlMalky2015]].',
      'Standard pure-tone audiometry missed some cases; risk factors were the number of IV aminoglycoside courses, age and lower lung function [[AlMalky2015]].']},
    bone:{t:'CF bone disease',items:[
      'In 12 studies of 1,055 adults (median age 28.2), pooled osteoporosis was 23.5% and osteopenia 38%; vertebral fractures 14% and non-vertebral fractures 19.7% [[Paccou2010]].',
      'Some studies found 50–75% of adults with CF have low bone density. Risk factors include poor absorption of fat-soluble vitamins, altered sex hormones, chronic lung infection and inflammation, low activity and glucocorticoids [[Aris2005]].',
      'ESPEN-ESPGHAN-ECFS: bone mineral density should be examined from age 8–10 years [[Turck2016Nutrition]]. CFF: check vitamin D yearly, preferably at the end of winter; 25-hydroxyvitamin D of at least 30 ng/mL (75 nmol/L) is considered sufficient [[Tangpricha2012]]. European guidelines give consensus statements on assessment, prevention and treatment [[SermetGaudelus2011]].']},
    joint:{t:'Joints: CF arthropathy',items:[
      'CF arthropathy was found in 4.9% of 6,069 people in the German CF registry: 8.4% of adults against 0.7% of under-18s [[Grehn2021]].',
      'In adults it was associated with female sex (OR 2.10), chronic P. aeruginosa (1.83), CFRD (1.69), pancreatic insufficiency (2.39) and sinusitis or polyps (1.91) [[Grehn2021]].']},
    kidney:{t:'Kidney stones',items:[
      'Kidney stones affect 3.0% to 6.3% of people with CF against 1–2% of age-matched controls; proposed mechanisms include high urinary oxalate, low citrate, high uric acid and loss of the oxalate-degrading gut bacterium Oxalobacter formigenes after antibiotics [[Gibney2003]].',
      'A 2026 single-centre cohort of 332 adults, counting incidental imaging findings, found a lifetime prevalence of any stone event of 32%, and 51% of those with stones had recurrences [[Ryoo2026]]. The gap largely reflects method and era.']},
    male:{t:'Male reproductive tract',items:[
      'Up to 97–98% of men with CF are infertile because of obstructive azoospermia from congenital bilateral absence of the vas deferens (CBAVD); sperm production itself is usually intact [[Kaltsas2025]].',
      'Sperm retrieval with IVF and intracytoplasmic sperm injection (ICSI) achieves high success rates for men with CF (narrative review) [[Kaltsas2025]].',
      'CBAVD also occurs in men without CF: a meta-analysis found 78% of men with CBAVD carried at least one CFTR variant [[Yu2012CBAVD]], and the 5T allele with a CF variant on the other copy was the commonest cause in an earlier series [[Chillon1995]].']},
    female:{t:'Female fertility',items:[
      'About 35% of females with CF who try to conceive are infertile, against 5–15% in the general population; causes include nutrition, thick acidic cervical mucus and lower ovarian reserve [[Kazmerski2022Family]].',
      'The CFF 2026 position paper says fertility may be improving with CFTR modulators for females, but not for males [[Jain2026CFFReproductive]]. Pregnancy is covered in <a href="#pregnancy" data-go="pregnancy">Fertility, pregnancy &amp; parenthood</a>.']}
  };
  let sel='sweat';
  const BODY='M100 98Q150 84 200 98L214 182Q210 250 206 292H94Q90 250 86 182Z';
  function bodyFig(ox,oy,k){const T=(a,b)=>[ox+a*k,oy+b*k];const on=q=>sel===q;
    const hi='var(--brand)';let g=`<g transform="translate(${f1(ox)} ${f1(oy)}) scale(${f1(k)})">`;
    const limb='fill:none;stroke:var(--skin);stroke-linecap:round;stroke-linejoin:round';
    g+=`<path d="M106 106L74 190L64 276M194 106L226 190L236 276" style="${limb};stroke-width:20"/><path d="M122 286L116 430M178 286L184 430" style="${limb};stroke-width:30"/>`;
    g+=`<rect x="140" y="72" width="20" height="22" style="fill:var(--skin)"/><path d="${BODY}" style="fill:var(--skin)"/><circle cx="150" cy="48" r="30" style="fill:var(--skin)"/>`;
    if(on('sweat'))g+=`<path d="${BODY}" style="fill:none;stroke:${hi};stroke-width:2.4"/><circle cx="150" cy="48" r="30" style="fill:none;stroke:${hi};stroke-width:2.4"/>`;
    /* sinuses */
    const sn=on('sinus');g+=`<ellipse cx="150" cy="30" rx="9" ry="5" style="fill:${sn?hi:'var(--airway)'};opacity:${sn?.85:.6}"/><ellipse cx="138" cy="54" rx="6" ry="5" style="fill:${sn?hi:'var(--airway)'};opacity:${sn?.85:.6}"/><ellipse cx="162" cy="54" rx="6" ry="5" style="fill:${sn?hi:'var(--airway)'};opacity:${sn?.85:.6}"/>`;
    /* ears */
    const er=on('hear');g+=`<ellipse cx="119" cy="50" rx="5" ry="9" style="fill:${er?hi:'var(--skin)'};stroke:${er?hi:'var(--salt-edge)'};stroke-width:1.2"/><ellipse cx="181" cy="50" rx="5" ry="9" style="fill:${er?hi:'var(--skin)'};stroke:${er?hi:'var(--salt-edge)'};stroke-width:1.2"/>`;
    /* spine and long bones */
    const bn=on('bone');for(let y=100;y<280;y+=12)g+=`<rect x="145" y="${y}" width="10" height="9" rx="2.5" style="fill:${bn?hi:'var(--salt)'};stroke:${bn?hi:'var(--salt-edge)'};stroke-width:.8;opacity:${bn?.9:.75}"/>`;
    g+=`<path d="M121 300L117 352M179 300L183 352M118 372L115 420M182 372L185 420" style="stroke:${bn?hi:'var(--salt-edge)'};stroke-width:${bn?5:3};stroke-linecap:round;opacity:${bn?.9:.55}"/>`;
    /* joints */
    const jt=on('joint');[[117,362,10],[183,362,10],[66,262,6.5],[234,262,6.5]].forEach(([x,y,r])=>{g+=`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${jt?hi:'none'};fill-opacity:.3;stroke:${jt?hi:'var(--salt-edge)'};stroke-width:${jt?2.2:1}"/>`});
    /* kidneys */
    const kd=on('kidney');[[128,206],[172,206]].forEach(([x,y],i)=>{g+=`<path d="M${x} ${y-14}C${x+(i?-12:12)} ${y-14} ${x+(i?-12:12)} ${y+14} ${x} ${y+14}C${x+(i?12:-12)} ${y+14} ${x+(i?14:-14)} ${y-14} ${x} ${y-14}Z" style="fill:${kd?hi:'var(--bronchi)'};opacity:${kd?.85:.55}"/>`});
    if(kd)g+=`<circle cx="130" cy="210" r="2.6" style="fill:var(--salt);stroke:var(--salt-edge)"/>`;
    /* reproductive tract */
    const ml=on('male'),fe=on('female');
    if(ml){g+=`<ellipse cx="140" cy="304" rx="6" ry="8" style="fill:${hi};opacity:.8"/><ellipse cx="160" cy="304" rx="6" ry="8" style="fill:${hi};opacity:.8"/>`;
      g+=`<path d="M140 296C128 284 132 262 146 258M160 296C172 284 168 262 154 258" style="fill:none;stroke:${hi};stroke-width:2;stroke-dasharray:3 3"/><path d="M128 272l8 8m0 -8l-8 8M164 272l8 8m0 -8l-8 8" style="stroke:var(--bad);stroke-width:2"/>`}
    else if(fe){g+=`<path d="M138 252H162L156 272Q150 280 144 272Z" style="fill:${hi};opacity:.8"/><path d="M138 252Q128 246 122 254M162 252Q172 246 178 254" style="fill:none;stroke:${hi};stroke-width:2"/><circle cx="121" cy="256" r="4" style="fill:${hi}"/><circle cx="179" cy="256" r="4" style="fill:${hi}"/>`}
    else g+=`<path d="M138 256H162L156 274Q150 280 144 274Z" style="fill:none;stroke:var(--salt-edge);stroke-width:1;stroke-dasharray:2 2;opacity:.7"/>`;
    /* sweat drops */
    if(on('sweat'))[[140,26],[164,34],[76,180],[226,186],[100,140],[200,150]].forEach(([x,y])=>{g+=ion(x,y,'h2o',{r:3.4})});
    g+='</g>';
    /* labels */
    const LB={sweat:[[214,140],'skin & sweat'],sinus:[[162,30],'sinuses'],hear:[[186,50],'ears'],bone:[[156,170],'spine & bones'],joint:[[190,362],'knees & wrists'],kidney:[[182,206],'kidneys'],male:[[168,300],'vas deferens'],female:[[176,262],'uterus & ovaries']};
    const [p,l]=LB[sel],q=T(p[0],p[1]),lx=ox+300*k+4;
    g+=`<line x1="${f1(q[0])}" y1="${f1(q[1])}" x2="${f1(lx-2)}" y2="${f1(q[1])}" style="stroke:var(--brand);stroke-width:1"/>`+tx(lx,q[1]+3,l,'t-xs','fill:var(--brand);font-weight:700');
    return g}
  function chart(B,N){const c=sel;let g=tx(B.x,B.y+10,ORG[c].t,'t-big','font-size:15px;fill:var(--ink)');const y=B.y+30,bw=B.w-60;
    if(c==='sweat'){const s1=N?.92:1;[[0,'CFTR working','salt taken back'],[1,'CF','salt stays in sweat']].forEach(([cf,a,b],i)=>{const cx=B.x+B.w*(i?.72:.25),py=y+30;
        g+=sweatGland(cx,py,s1,{cf,ph:.35,labels:i===0}).svg+tx(cx,py-18,a,'t-sm t-mid',bold)+tx(cx,py+160*s1+14,b,'t-xs t-mid',cf?'fill:var(--bad);font-weight:600':'fill:var(--good);font-weight:600')})}
    else if(c==='sinus'){g+=tx(B.x,y+8,'adults with nasal polyps on endoscopy (n = 211)','t-xs',ink);const I=icons(B.x,y+18,{n:100,cols:20,k:37,size:N?11:12,gap:3,col:'var(--brand)',shape:'dot'});g+=I.svg+tx(B.x,y+18+I.h+14,'37 in 100','t-sm',bold);
      const y2=y+I.h+60;g+=tx(B.x,y2-14,'median Lund-Mackay sinus CT score','t-xs',ink)+hbar(B.x,y2,bw,5.8,8,'var(--muted)','before elexacaftor/tezacaftor/ivacaftor','5.8')+hbar(B.x,y2+32,bw,3.3,8,'var(--rx)','after 1 year (n = 64)','3.3')}
    else if(c==='hear'){g+=tx(B.x,y+8,'children given IV aminoglycosides (n = 63)','t-xs',ink);const I=icons(B.x,y+20,{n:63,cols:9,k:15,size:N?16:18,gap:5,col:'var(--brand)'});g+=I.svg;
      const tx0=B.x+9*((N?16:18)+5)+14;g+=`<text x="${f1(tx0)}" y="${f1(y+60)}" class="t-big" style="font-size:30px;fill:var(--brand)">24%</text>`+tx(tx0,y+78,'15 of 63 had ototoxicity','t-xs',bold)+tx(tx0,y+92,'on extended high-frequency','t-xs',ink)+tx(tx0,y+105,'audiometry','t-xs',ink)+tx(tx0,y+124,'11 of the 15 had had','t-xs',ink)+tx(tx0,y+137,'at least 10 courses','t-xs',ink)}
    else if(c==='bone'){g+=tx(B.x,y+8,'adults with CF, pooled (12 studies, 1,055 people)','t-xs',ink);
      [['osteopenia',38],['osteoporosis',23.5],['non-vertebral fracture',19.7],['vertebral fracture',14]].forEach(([l,v],i)=>{g+=hbar(B.x,y+34+i*34,bw,v,50,'var(--brand)',l,v+'%')});
      g+=tx(B.x,y+34+4*34+4,'bone density checks from age 8–10 (ESPEN-ESPGHAN-ECFS)','t-xs')}
    else if(c==='joint'){g+=tx(B.x,y+8,'German CF registry, 6,069 people','t-xs',ink)+hbar(B.x,y+36,bw,.7,10,'var(--muted)','under 18','0.7%')+hbar(B.x,y+70,bw,8.4,10,'var(--brand)','adults','8.4%')+tx(B.x,y+108,'4.9% overall','t-sm',bold)}
    else if(c==='kidney'){g+=tx(B.x,y+8,'people with kidney stones, %','t-xs',ink)+hbar(B.x,y+36,bw,2,35,'var(--muted)','age-matched controls (review)','1–2%',{lo:1})+hbar(B.x,y+70,bw,6.3,35,'var(--brand)','people with CF (review)','3.0–6.3%',{lo:3})+hbar(B.x,y+104,bw,32,35,'var(--bad)','lifetime, adults, one 2026 centre','32%');
      g+=tx(B.x,y+136,'the 2026 figure counts incidental imaging findings,','t-xs')+tx(B.x,y+149,'so it is not comparable with the older range','t-xs')}
    else if(c==='male'){g+=tx(B.x,y+8,'men with CF, per 100','t-xs',ink);const I=icons(B.x,y+18,{n:100,cols:20,k:97,size:N?11:12,gap:3,col:'var(--brand)',shape:'dot'});g+=I.svg+tx(B.x,y+18+I.h+14,'up to 97–98 in 100 have CBAVD','t-sm',bold)+tx(B.x,y+18+I.h+30,'no vas deferens on either side: sperm cannot leave,','t-xs',ink)+tx(B.x,y+18+I.h+43,'but sperm production is usually intact','t-xs',ink)}
    else if(c==='female'){g+=tx(B.x,y+8,'infertile among those trying to conceive, %','t-xs',ink)+hbar(B.x,y+36,bw,15,50,'var(--muted)','general population','5–15%',{lo:5})+hbar(B.x,y+70,bw,35,50,'var(--brand)','females with CF','about 35%');
      g+=tx(B.x,y+106,'causes: nutrition, thick acidic cervical mucus,','t-xs',ink)+tx(B.x,y+119,'lower ovarian reserve','t-xs',ink)}
    return g}
  function drawBody(){const N=vb(body,'720 460','400 760');let s='';
    if(N){s+=bodyFig(40,6,.86)+chart({x:16,y:410,w:368,h:330},N)}
    else{s+=bodyFig(10,10,.98)+chart({x:420,y:20,w:286,h:420},N)}
    body.innerHTML=s;const o=ORG[sel];info.innerHTML=`<h4>${o.t}</h4><ul>${o.items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
    $$('[data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===sel))}
  $('#orBtns').addEventListener('click',e=>{const b=e.target.closest('[data-org]');if(!b)return;sel=b.dataset.org;drawBody()});
  drawBody();
  const prevR=redraws.organs;redraws.organs=()=>{prevR&&prevR();drawBody()};
};
