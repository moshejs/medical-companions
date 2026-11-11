/* =============== 1.1 What obesity is =============== */
/* Main player: a 10x10 grid of figures fills from the 1990 to the 2022 NCD-RisC estimate for the chosen group, and a
   bar counts the people living with obesity worldwide up past one billion, while a side panel tells the definition
   story step by step. Only the two survey endpoints exist in the source, so the fill between them is drawn as a
   transition with no year attached. Explorer: the Commission's clinical vs preclinical logic on two identical figures.
   Chart: US adult obesity from NHANES survey periods. */
const WH_GRP={
 women:{l:'women',lab:'adult women',p:[8.8,18.5],m:[127,504]},
 men:{l:'men',lab:'adult men',p:[4.8,14.0],m:[67,374]},
 girls:{l:'girls',lab:'girls aged 5–19',p:[1.7,6.9],m:[13.9,65.1]},
 boys:{l:'boys',lab:'boys aged 5–19',p:[2.1,9.3],m:[17.5,94.2]}};
/* NCD-RisC 2024: 2022 counts as published; 1990 counts derived by subtracting the reported increases [[NCDRisC2024]] */
const WH_TOT=[127+67+13.9+17.5,504+374+65.1+94.2];
const WH_STEPS=[
 {from:0,at:.03,k:'Step 1 · definition',t:'Excess adiposity',sub:'more body fat than is healthy, with many causes',
  txt:`The 2025 Lancet Diabetes &amp; Endocrinology Commission defines obesity as "a condition characterised by excess adiposity, with or without abnormal distribution or function of adipose tissue, and with causes that are multifactorial and still incompletely understood" [[Rubino2025Commission]]. Its 58 experts, who included people with lived experience of obesity, reached 90–100% agreement, and 76 organisations endorsed it [[Rubino2025Commission]].`,
  pt:`Obesity means carrying more body fat than is healthy for you. It is a long-term condition with many causes, including genes, biology, surroundings and life circumstances, not a failure of willpower [[Rubino2025Commission,Bray2017WOF]].`,
  hook:`Commission 2025: obesity is excess adiposity, with or without abnormal distribution or function of fat tissue [[Rubino2025Commission]].`},
 {from:.2,at:.3,k:'Step 2 · BMI',t:'The BMI definition',sub:'weight in kg ÷ height in metres, squared',
  txt:`Body mass index is weight in kilograms divided by height in metres squared [[Keys1972,Eknoyan2008]]. The WHO adult classes are 25.0–29.9 pre-obese (overweight), 30.0–34.9 class I, 35.0–39.9 class II and 40.0 or more class III obesity [[WHO2000TRS894,Flegal1998]]. The Commission recommends BMI only as a surrogate for health risk at population level, for epidemiology or screening, not as an individual measure of health [[Rubino2025Commission]]. More in <a href="#measuring" data-go="measuring">BMI, waist &amp; body fat</a>.`,
  pt:`BMI is a quick screening number, but it cannot tell fat from muscle, so on its own it is not a diagnosis [[Okorodudu2010,Rubino2025Commission]].`,
  hook:`WHO classes: 25–29.9 overweight, 30–34.9 class I, 35–39.9 class II, ≥40 class III [[WHO2000TRS894,Flegal1998]].`},
 {from:.4,at:.5,k:'Step 3 · two states',t:'Clinical or preclinical',sub:'is excess fat already changing how the body works?',
  txt:`Clinical obesity is "a chronic, systemic illness characterised by alterations in the function of tissues, organs, the entire individual, or a combination thereof, due to excess adiposity". Preclinical obesity is excess adiposity with preserved function of other tissues and organs, and a varying but generally increased risk of clinical obesity and other non-communicable diseases [[Rubino2025Commission]]. The Commission set 18 criteria for adults and 13 for children and adolescents [[Rubino2025Commission]].`,
  pt:`Doctors now separate obesity that is already affecting how organs work or how someone manages daily life ("clinical obesity") from obesity that is not yet doing so ("preclinical obesity") [[Rubino2025Commission]].`,
  hook:`Clinical obesity = confirmed excess adiposity + organ dysfunction and/or limits on daily activities; 18 adult and 13 child criteria [[Rubino2025Commission]].`},
 {from:.6,at:.68,k:'Step 4 · chronic',t:'A chronic, relapsing disease',sub:'statements that frame obesity as a disease',
  txt:`In 2013 the American Medical Association recognised obesity as "a complex, chronic disease requiring medical attention" [[Kyle2016AMA]]. AACE/ACE proposed "adiposity-based chronic disease" [[Mechanick2017ABCD,Garvey2016AACE]], and the World Obesity Federation called obesity "a chronic relapsing progressive disease process" [[Bray2017WOF]]. The Commission defines remission as resolution of organ dysfunction that "does not imply cure", and says public-health strategy should rest on evidence "rather than unproven assumptions that blame individual responsibility" [[Rubino2025Commission]].`,
  pt:`After weight loss, hunger hormones and appetite stay changed for at least a year. Weight coming back is the body defending its weight: biology, not weakness [[Sumithran2011]].`,
  hook:`WOF 2017: "a chronic relapsing progressive disease process" [[Bray2017WOF]]; AMA disease recognition: 2013 [[Kyle2016AMA]].`},
 {from:.8,at:.93,k:'Step 5 · burden',t:'The global burden',sub:'more than a billion people; millions of deaths',
  txt:`Between 1990 and 2022, age-standardised adult obesity rose from 8.8% to 18.5% in women and from 4.8% to 14.0% in men. In 2022, 504 million women, 374 million men, 65.1 million girls and 94.2 million boys were living with obesity: over 1 billion people in all (sum of the four groups) [[NCDRisC2024]]. High BMI accounted for 4.0 million deaths in 2015 [[Afshin2017]], and the age-standardised disability-adjusted life-year rate it causes rose 15.7% from 2000 to 2021 [[GBD2021RiskFactors]]. These are population statistics.`,
  pt:`Obesity has become much more common worldwide since 1990. More than 1 billion people now live with it, including children [[NCDRisC2024]].`,
  hook:`2022: over 1 billion people with obesity, 878 million adults and 159 million aged 5–19 [[NCDRisC2024]]. High BMI: 4.0 million deaths in 2015, over two thirds cardiovascular [[Afshin2017]].`}];

/* the Commission's 18 adult criteria, short names from Table 2 [[Rubino2025Commission]]; p = where the point sits on the figure */
const WH_CRIT=[
 {g:'Brain & breathing',id:'icp',l:'Raised pressure inside the skull',p:'head'},
 {g:'Brain & breathing',id:'osa',l:'Sleep apnoeas or hypopnoeas',p:'neck'},
 {g:'Brain & breathing',id:'hypo',l:'Hypoventilation or breathlessness',p:'lungL'},
 {g:'Heart & circulation',id:'hfref',l:'Heart failure with reduced ejection fraction',p:'heart'},
 {g:'Heart & circulation',id:'hfpef',l:'Heart failure with preserved ejection fraction',p:'heart'},
 {g:'Heart & circulation',id:'af',l:'Chronic or recurrent atrial fibrillation',p:'heart'},
 {g:'Heart & circulation',id:'ph',l:'Pulmonary hypertension',p:'lungR'},
 {g:'Heart & circulation',id:'vte',l:'Recurrent deep-vein thrombosis or pulmonary embolism',p:'calf'},
 {g:'Heart & circulation',id:'bp',l:'Raised blood pressure',p:'arm'},
 {g:'Metabolism, liver & kidney',id:'met',l:'High blood glucose with high triglycerides and low HDL',p:'belly'},
 {g:'Metabolism, liver & kidney',id:'liv',l:'Fatty liver disease with liver fibrosis',p:'liver'},
 {g:'Metabolism, liver & kidney',id:'kid',l:'Microalbuminuria with reduced kidney function',p:'kidney'},
 {g:'Pelvis & reproduction',id:'uri',l:'Recurrent or chronic urinary incontinence',p:'pelvis'},
 {g:'Pelvis & reproduction',id:'ov',l:'Anovulation, oligomenorrhoea or PCOS',p:'pelvis'},
 {g:'Pelvis & reproduction',id:'hg',l:'Male hypogonadism',p:'pelvis'},
 {g:'Joints, limbs & daily life',id:'jnt',l:'Chronic severe knee or hip pain with stiffness',p:'knee'},
 {g:'Joints, limbs & daily life',id:'lym',l:'Lower-limb lymphoedema',p:'ankle'},
 {g:'Joints, limbs & daily life',id:'adl',l:'Significant limitation of daily activities',p:'whole'}];
const WH_CONF={
 none:`BMI alone does not confirm excess adiposity unless it is above 40. The Commission asks for BMI plus one body measure, two body measures, or direct fat measurement, with cut-offs validated for age, sex and ethnicity [[Rubino2025Commission]].`,
 bmi1:`BMI plus at least one anthropometric criterion (waist circumference, waist-to-hip or waist-to-height ratio) confirms excess adiposity [[Rubino2025Commission]].`,
 two:`At least two anthropometric criteria confirm excess adiposity regardless of BMI [[Rubino2025Commission]].`,
 dexa:`Direct body-fat measurement, such as DEXA or bioimpedance, confirms excess adiposity [[Rubino2025Commission]].`,
 b40:`When BMI is above 40, excess adiposity "can pragmatically be assumed" without further confirmation [[Rubino2025Commission]].`};

inits.what=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const wrap=(s,n)=>{const out=[];let c='';s.split(' ').forEach(w=>{if(c&&(c+' '+w).length>n){out.push(c);c=w}else c=c?c+' '+w:w});if(c)out.push(c);return out};
  const lines=(x,y,arr,lh,c,st)=>arr.map((l,i)=>T(x,y+i*lh,l,c,st)).join('');
  const INK='fill:var(--ink);font-weight:700';
  const fmtM=v=>v>=1000?(v/1000).toFixed(2).replace(/0$/,'')+' billion':Math.round(v)+' million';
  /* ---------- main player ---------- */
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote');let grp='women',setSt=()=>{};
  /* the side panel: one small scene per step; lp = progress through the step, 0..1 */
  function panel(p,lp,X,Y,W,H){let s=`<rect x="${X}" y="${Y}" width="${W}" height="${H}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const cx=X+W/2,wn=Math.floor((W-32)/6.7);
    if(p===0){const A=adiposeTissue(X+16,Y+16,W-32,H*.4,{size:lerp(.3,.85,ease(lp)),seed:7,frame:true,cell:26});s+=A.svg;
      s+=T(cx,Y+H*.4+36,'fat cells enlarge as stores grow','t-sm t-mid');
      s+=lines(X+16,Y+H*.4+66,wrap('Obesity: excess adiposity, with or without abnormal distribution or function of fat tissue.',wn),16,'t-sm','fill:var(--ink)');
      s+=lines(X+16,Y+H*.4+66+16*wrap('Obesity: excess adiposity, with or without abnormal distribution or function of fat tissue.',wn).length+10,wrap('Causes: genetic, environmental, psychological, nutritional and metabolic; still incompletely understood.',wn),16,'t-sm')}
    else if(p===1){s+=T(cx,Y+36,'BMI = weight (kg) ÷ height (m)²','t-big t-mid');
      s+=T(cx,Y+56,'Quetelet 1832 · named BMI by Keys 1972','t-xs t-mid');
      const B=[15,18.5,25,30,35,40,45],bx=X+18,bw=W-36,by=Y+96,bxv=v=>bx+bw*(v-15)/30;
      const nm=['under-\nweight','','pre-\nobese','class I','class II','class III'];
      for(let i=0;i<6;i++){const x0=bxv(B[i]),x1=bxv(B[i+1]);s+=`<rect x="${f1(x0)}" y="${by}" width="${f1(x1-x0-1)}" height="22" rx="3" style="fill:var(--accent);opacity:${f1(.08+i*.08)}"/>`;
        nm[i].split('\n').forEach((q,j)=>{if(q)s+=T((x0+x1)/2,by+40+j*11,q,'t-xs t-mid')})}
      B.slice(1,6).forEach(v=>s+=T(bxv(v),by-6,v,'t-xs t-mid'));
      const v=lerp(21,42,ease(lp)),mx=bxv(v);s+=`<path d="M${f1(mx)} ${by-2}v26" style="stroke:var(--ink);stroke-width:2.4"/><circle cx="${f1(mx)}" cy="${by+11}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
      s+=T(cx,by+86,`BMI ${f1(v)}`,'t-lbl t-mid');
      s+=lines(X+16,by+116,wrap('A surrogate for risk across populations, for surveillance and screening; not an individual measure of health.',wn),16,'t-sm','fill:var(--ink)')}
    else if(p===2){const fy=Y+40,fs=Math.min(210,H-100),ax=X+W*.27,bx2=X+W*.73;
      const A=person(ax,fy,fs,{size:.55}),B=person(bx2,fy,fs,{size:.55});s+=A.svg+B.svg;
      s+=T(ax,Y+24,'Preclinical','t-lbl t-mid')+T(bx2,Y+24,'Clinical','t-lbl t-mid');
      const k=fs/100,pts=[[4,33],[-4,40],[0,19],[5,77],[-4,47]];
      pts.forEach((q,i)=>{const a=ramp(lp,.15+i*.14,.27+i*.14);if(a<=0)return;const x=bx2+q[0]*k,y=fy+q[1]*k;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9*a)}" style="fill:var(--risk);opacity:.25"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4*a)}" style="fill:var(--risk)"/>`});
      s+=lines(ax,fy+fs+20,['organs work normally;','risk is raised'],14,'t-sm t-mid')+lines(bx2,fy+fs+20,['organ function or','daily life affected'],14,'t-sm t-mid')}
    else if(p===3){const ev=[['2013','AMA','"a complex, chronic disease"'],['2016–17','AACE/ACE','"adiposity-based chronic disease"'],['2017','World Obesity Fed.','"chronic relapsing progressive"'],['2025','Lancet Commission','clinical vs preclinical obesity']];
      const lx=X+30,y0=Y+30,gap=(H-50)/4;s+=`<line x1="${lx}" x2="${lx}" y1="${y0}" y2="${f1(y0+gap*3+6)}" style="stroke:var(--line);stroke-width:3"/>`;
      ev.forEach((e,i)=>{const a=ramp(lp,i*.2,i*.2+.15),y=y0+i*gap;
        s+=`<g style="opacity:${f1(.15+.85*a)}"><circle cx="${lx}" cy="${f1(y)}" r="7" style="fill:${a>=1?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`+T(lx+16,y+4,e[0]+' · '+e[1],'t-lbl')+T(lx+16,y+21,e[2],'t-sm')+'</g>'})}
    else{const bx=X+18,bw=W-36,a=ease(ramp(lp,0,.5)),b=ease(ramp(lp,.35,.85));
      s+=T(X+18,Y+30,'Deaths attributed to high BMI, 2015','t-lbl')+T(X+18,Y+56,'4.0 million','t-big','font-size:24px;fill:var(--hl)');
      const bar=(y,sh,lab1,lab2,al)=>{let q=`<rect x="${bx}" y="${y}" width="${bw}" height="20" rx="4" style="fill:var(--panel-2)"/>`;
        q+=`<rect x="${bx}" y="${y}" width="${f1(bw*sh*al)}" height="20" rx="4" style="fill:var(--hl);opacity:.75"/>`;
        return q+T(bx,y+38,lab1,'t-sm','fill:var(--ink);font-weight:700')+T(bx,y+53,lab2,'t-sm')};
      s+=bar(Y+76,2/3,'more than two thirds:','from cardiovascular disease',a);
      s+=bar(Y+150,.4,'nearly 40%: in people whose BMI','was below the obesity threshold',b);
      const c3=ease(ramp(lp,.6,.95));
      s+=`<g style="opacity:${f1(c3)}">`+T(X+18,Y+250,'+15.7%','t-big','font-size:22px;fill:var(--hl)')+lines(X+18,Y+270,['disability-adjusted life-year rate','from high BMI, 2000 to 2021'],15,'t-sm')+'</g>';
      s+=T(X+18,Y+H-14,'GBD modelled estimates; population statistics','t-xs')}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 690'),p=phaseOf(WH_STEPS,t),P=WH_STEPS[p],G=WH_GRP[grp];
    const L=N?{tx:12,ty:22,gx:14,gy:62,sx:222,sy:78,trx:14,trw:372,try:312,tby:352,px:10,py:396,pw:380,ph:286,sz:16}
             :{tx:16,ty:24,gx:18,gy:66,sx:226,sy:84,trx:18,trw:370,try:300,tby:338,px:406,py:20,pw:300,ph:344,sz:15};
    const u=ease(ramp(t,.04,.8)),pct=lerp(G.p[0],G.p[1],u),k=Math.round(pct),mil=lerp(G.m[0],G.m[1],u),tot=lerp(WH_TOT[0],WH_TOT[1],u);
    const ylab=u<=0?'1990':u>=1?'2022':'1990 → 2022';
    let s=T(L.tx,L.ty,P.t,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    /* the grid of 100 */
    const IA=iconArray(L.gx,L.gy,{n:100,cols:10,k,size:L.sz,gap:4,col:'var(--accent)',base:'var(--line)'});s+=IA.svg;
    /* readout */
    s+=T(L.sx,L.sy,ylab,'t-sm',INK)+T(L.sx,L.sy+34,f1(pct)+'%','t-big','font-size:30px;fill:var(--accent)');
    s+=lines(L.sx,L.sy+56,[`of ${G.lab}`,'living with obesity'],15,'t-sm','fill:var(--ink)');
    s+=T(L.sx,L.sy+104,fmtM(mil),'t-lbl')+T(L.sx,L.sy+120,'people in this group','t-sm');
    s+=T(L.sx,L.sy+148,`1990: ${f1(G.p[0])}%`,'t-sm')+T(L.sx,L.sy+164,`2022: ${f1(G.p[1])}%`,'t-sm');
    s+=T(L.sx,L.sy+190,'1 figure = 1 in 100','t-xs');
    /* endpoint track */
    const tx0=L.trx,tx1=L.trx+L.trw,mx=lerp(tx0,tx1,u);
    s+=`<line x1="${tx0}" x2="${tx1}" y1="${L.try}" y2="${L.try}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${tx0}" x2="${f1(mx)}" y1="${L.try}" y2="${L.try}" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"/>`;
    s+=T(tx0,L.try-9,'1990','t-sm')+T(tx1,L.try-9,'2022','t-sm t-end')+`<circle cx="${f1(mx)}" cy="${L.try}" r="5.5" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/>`;
    /* the billion bar: all four groups together */
    const bw=L.trw,bmax=1100,bX=v=>L.trx+bw*v/bmax,by=L.tby;
    s+=`<rect x="${L.trx}" y="${by}" width="${bw}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${L.trx}" y="${by}" width="${f1(bX(tot)-L.trx)}" height="14" rx="7" style="fill:var(--brand)"/>`;
    s+=`<line x1="${f1(bX(1000))}" x2="${f1(bX(1000))}" y1="${by-6}" y2="${by+20}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/>`;
    s+=T(bX(1000),by+32,'1 billion','t-sm t-mid',tot>=1000?INK:'');
    s+=T(L.trx,by+32,`Everyone with obesity: ${fmtM(tot)}`,'t-sm',tot>=1000?'fill:var(--brand);font-weight:700':'fill:var(--ink)');
    s+=panel(p,ramp(t,P.from,(WH_STEPS[p+1]||{from:1}).from),L.px,L.py,L.pw,L.ph);
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#whPlay'),draw,22000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-whg]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.whg;$$('[data-whg]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- clinical vs preclinical explorer ---------- */
  const ex=$('#whEx'),out=$('#whOut'),conf=$('#whConf'),crit=$('#whCrit');
  const groups=[...new Set(WH_CRIT.map(c=>c.g))];
  crit.innerHTML=groups.map(g=>`<fieldset><legend>${g}</legend>${WH_CRIT.filter(c=>c.g===g).map(c=>`<label><input type="checkbox" data-whc="${c.id}"><span>${c.l}</span></label>`).join('')}</fieldset>`).join('');
  const POS={head:[0,9],neck:[0,19],lungL:[-6,30],lungR:[6,30],heart:[4,34],arm:[-17,46],belly:[0,47],liver:[-5,41],kidney:[5,48],pelvis:[0,57],knee:[-5,77],calf:[5,87],ankle:[-5,94]};
  function exDraw(){const N=vb(ex,'600 330','400 380');const on=WH_CRIT.filter(c=>$(`[data-whc="${c.id}"]`).checked),cv=conf.value,ok=cv!=='none';
    const cls=!ok?0:on.length?2:1;
    const L=N?{w:194,h:360,x0:6,y0:10,fs:250,fy:58,gap:0}:{w:292,h:310,x0:6,y0:10,fs:236,fy:52,gap:10};
    let s='';
    [['Preclinical obesity','organs and daily life unaffected',1],['Clinical obesity','organ dysfunction or limits on daily life',2]].forEach(([h,sub,c],i)=>{
      const x=L.x0+i*(L.w+L.gap),cx=x+L.w/2,sel=cls===c;
      s+=`<rect x="${x}" y="${L.y0}" width="${L.w-4}" height="${L.h}" rx="14" style="fill:${sel?'var(--brand-soft)':'var(--field)'};stroke:${sel?'var(--brand)':'var(--line)'};stroke-width:${sel?2.6:1}"/>`;
      s+=T(cx,L.y0+24,h,'t-lbl t-mid',sel?'fill:var(--brand)':'')+T(cx,L.y0+40,N?(c===1?'organs unaffected':'organs or daily life affected'):sub,'t-xs t-mid');
      const P=person(cx,L.fy,L.fs,{size:.55,op:ok?1:.5});s+=P.svg;
      if(c===2){const k=L.fs/100;
        if(on.some(q=>q.p==='whole'))s+=`<ellipse cx="${f1(cx)}" cy="${f1(L.fy+L.fs*.5)}" rx="${f1(L.fs*.3)}" ry="${f1(L.fs*.54)}" style="fill:none;stroke:var(--risk);stroke-width:2;stroke-dasharray:5 4"/>`;
        const seen={};on.filter(q=>q.p!=='whole').forEach(q=>{const b=POS[q.p],n=seen[q.p]=(seen[q.p]||0)+1,x2=cx+b[0]*k+(n-1)*7,y2=L.fy+b[1]*k;
          s+=`<circle cx="${f1(x2)}" cy="${f1(y2)}" r="9" style="fill:var(--risk);opacity:.22"/><circle cx="${f1(x2)}" cy="${f1(y2)}" r="4.2" style="fill:var(--risk);stroke:var(--panel);stroke-width:1.2"/>`})}
      if(sel)s+=T(cx,L.y0+L.h-12,'matches the choices','t-xs t-mid',INK)});
    if(!ok)s+=T(N?200:300,N?372:326,'excess adiposity not confirmed: neither category applies yet','t-xs t-mid',INK);
    ex.innerHTML=s;
    let h=`<div class="kicker">Commission framework, as a teaching tool</div>`;
    if(!cls)h+=`<p class="verdict none">Not classed as obesity yet</p><p>${WH_CONF.none}</p>`+(on.length?`<p>The problems ticked still deserve care in their own right; the framework only counts them as clinical obesity when excess adiposity is confirmed and is their cause [[Rubino2025Commission]].</p>`:'');
    else if(cls===1)h+=`<p class="verdict">Preclinical obesity</p><p>${WH_CONF[cv]}</p><p>With no organ dysfunction and no limits on daily activities, the framework calls this preclinical obesity: preserved function, with a varying but generally increased risk of clinical obesity, type 2 diabetes, cardiovascular disease, some cancers and mental disorders [[Rubino2025Commission]].</p>`;
    else h+=`<p class="verdict">Clinical obesity</p><p>${WH_CONF[cv]}</p><p>Confirmed excess adiposity plus ${on.length===1?'one criterion':on.length+' criteria'} (reduced organ or tissue function due to obesity, or substantial limits on daily activities) meets the definition of clinical obesity [[Rubino2025Commission]]. Ticked: ${on.map(c=>c.l.toLowerCase()).join('; ')}.</p>`;
    h+=`<div class="pt"><b>%t:note.plain%</b>The label is about how the body is working, not about size. Two people with the same BMI can be in different categories.</div>`;
    h+=`<div class="hook"><b>%t:note.hook%</b>Confirm adiposity first (BMI + 1 body measure, 2 body measures, or direct fat measurement; assumed above BMI 40), then look for organ dysfunction [[Rubino2025Commission]].</div>`;
    out.innerHTML=h}
  conf.addEventListener('change',exDraw);crit.addEventListener('change',exDraw);
  exDraw();
  redraws.what=(()=>{const prev=redraws.what;return()=>{prev&&prev();exDraw();usDraw()}})();

  /* ---------- US adults chart ---------- */
  const us=$('#whUs');
  const US_A=[[1961,12.8],[1973,14.1],[1978,14.5],[1991,22.5]];           /* ages 20-74 [[Flegal1998]] */
  const US_B=[[1991,22.9],[2000,30.5],[2008,33.8],[2012,34.9],[2014,37.7],[2022,40.3]]; /* ages 20+ */
  const US_S=[[1991,2.9],[2000,4.7],[2014,7.7],[2022,9.7]];                /* BMI >=40, age-adjusted */
  function usDraw(){const N=vb(us,'720 300','400 340');
    const A=N?{x:44,y:24,w:330,h:250}:{x:56,y:22,w:620,h:236};
    const C=curveAxes(A.x,A.y,A.w,A.h,{x0:1955,x1:2033,y0:0,y1:52,xt:N?[1960,1980,2000,2020]:[1960,1970,1980,1990,2000,2010,2020,2030],yt:[0,10,20,30,40,50],yfmt:v=>v+'%'});
    let s=C.svg;
    s+=plotLine(US_A,C.X,C.Y,{col:'var(--brand)',lw:2.4,dash:'5 3'}).svg+plotLine(US_B,C.X,C.Y,{col:'var(--brand)',lw:2.8}).svg+plotLine(US_S,C.X,C.Y,{col:'var(--accent)',lw:2.6}).svg;
    s+=`<path d="M${f1(C.X(2022))} ${f1(C.Y(40.3))}L${f1(C.X(2030))} ${f1(C.Y(48.9))}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:3 4;fill:none"/><circle cx="${f1(C.X(2030))}" cy="${f1(C.Y(48.9))}" r="4.5" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    [...US_A,...US_B].forEach(q=>s+=`<circle cx="${f1(C.X(q[0]))}" cy="${f1(C.Y(q[1]))}" r="3.4" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.4"/>`);
    US_S.forEach(q=>s+=`<circle cx="${f1(C.X(q[0]))}" cy="${f1(C.Y(q[1]))}" r="3.2" style="fill:var(--accent);stroke:var(--panel);stroke-width:1.4"/>`);
    s+=T(C.X(1961)+4,C.Y(12.8)-10,'12.8%','t-xs');
    s+=T(C.X(1991)-6,C.Y(22.5)-10,'22.5%','t-xs t-end');
    s+=T(C.X(2022)-6,C.Y(40.3)-10,'40.3%','t-xs t-end',INK);
    s+=T(C.X(2030),C.Y(48.9)-12,'48.9% projected','t-xs t-mid');
    s+=T(C.X(2022)-6,C.Y(9.7)-10,'9.7%','t-xs t-end','fill:var(--accent);font-weight:700');
    s+=T(A.x+8,A.y+14,'% of US adults','t-xs');
    us.innerHTML=s}
  usDraw();
};
