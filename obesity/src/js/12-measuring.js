/* =============== 1.2 BMI, waist & body fat =============== */
/* Main player: the height x weight plane shaded by the WHO BMI classes (curves w = BMI x h^2), with an optional
   overlay of the WHO 2004 Asian action points. An imaginary adult's point moves through the classes while a side
   panel works the formula, lists the classes, shows what BMI >=30 misses (Okorodudu2010) and the ethnicity
   equivalents (Caleyachetty2021Ethnicity), the waist-to-height ratio and the Commission's confirmation rules.
   Calculator: BMI and waist-to-height for an imaginary adult, read against published cut-offs, with no advice. */
const MS_CLASSES=[ /* WHO adult classes [[WHO2000TRS894,Flegal1998]]; underweight below 18.5 [[NCDRisC2016]] */
 {lo:0,hi:18.5,n:'underweight',r:'below 18.5'},
 {lo:18.5,hi:25,n:'18.5 to 24.9',r:'18.5–24.9'},
 {lo:25,hi:30,n:'pre-obese, or overweight',r:'25.0–29.9'},
 {lo:30,hi:35,n:'obesity class I',r:'30.0–34.9'},
 {lo:35,hi:40,n:'obesity class II',r:'35.0–39.9'},
 {lo:40,hi:99,n:'obesity class III',r:'40.0 or more'}];
const MS_ASIAN=[23,27.5,32.5,37.5];                     /* [[WHO2004Asian]] */
const MS_ETH=[['White',30.0],['Black',28.1],['Chinese',26.9],['Arab',26.6],['South Asian',23.9]]; /* [[Caleyachetty2021Ethnicity]] */
const MS_STEPS=[
 {from:0,at:.08,k:'Step 1 · the formula',t:"Quetelet's formula",sub:'weight in kg divided by height in metres, squared',
  txt:`BMI is weight in kilograms divided by height in metres squared [[Keys1972,Eknoyan2008]]. In 1832 Adolphe Quetelet concluded from growth studies that, outside the growth spurts of infancy and puberty, "the weight increases as the square of the height" [[Eknoyan2008]]. In 1972 Ancel Keys and colleagues compared indices in 7,424 healthy men in 12 cohorts and named weight/height² the "body mass index": it correlated little with height and well with body fat [[Keys1972,Eknoyan2008]].`,
  pt:`BMI is your weight divided by your height squared. It is a quick screening number, but it cannot tell fat from muscle, so on its own it is not a diagnosis [[Okorodudu2010,Rubino2025Commission]].`,
  hook:`BMI = kg/m². Quetelet described the index in 1832; Keys named it in 1972 [[Eknoyan2008,Keys1972]].`},
 {from:.2,at:.36,k:'Step 2 · the classes',t:'The WHO classes',sub:'bands for comparing populations',
  txt:`The WHO classification used in international surveillance runs: pre-obese (overweight) 25.0–29.9, class I obesity 30.0–34.9, class II 35.0–39.9 and class III 40.0 or more [[WHO2000TRS894,Flegal1998]]; NCD-RisC adds underweight below 18.5 [[NCDRisC2016]]. The bands came from WHO's first obesity consultation (1997) and its 2000 report [[James2008WHO,WHO2000TRS894]]. Across 239 cohorts of never-smokers, all-cause mortality was lowest at BMI 20–25, with a hazard ratio of 1.45 at 30–35 and 2.76 at 40–60: group averages, not predictions for one person [[GBMC2016]].`,
  pt:`The classes are bands for comparing large groups of people. They describe groups, not how healthy one person is.`,
  hook:`25–29.9 overweight · 30–34.9 class I · 35–39.9 class II · ≥40 class III [[WHO2000TRS894,Flegal1998]].`},
 {from:.42,at:.56,k:'Step 3 · blind spots',t:'Why BMI misclassifies',sub:'muscle, age, sex and ethnicity',
  txt:`Across 32 samples (31,968 people), BMI ≥30 had a sensitivity of 0.42 and a specificity of 0.97 for excess body fat; the authors conclude that BMI "fail[s] to identify half of the people with excess BF%" [[Okorodudu2010]]. BMI does worst in the 25–29.9 range, in men and in older adults [[RomeroCorral2008]]. Risk also starts at lower BMI in some groups: the BMI matching the diabetes risk of 30 in White adults was 23.9 in south Asian, 26.6 in Arab, 26.9 in Chinese and 28.1 in Black adults in England [[Caleyachetty2021Ethnicity]], and WHO added action points at 23, 27.5, 32.5 and 37.5 for Asian populations [[WHO2004Asian]].`,
  pt:`Health risks can start at a lower BMI in people of south Asian, Chinese, Arab or Black background, so some services use lower cut-off points [[WHO2004Asian,Caleyachetty2021Ethnicity]].`,
  hook:`BMI ≥30 is specific (0.97) but insensitive (0.42) for excess body fat [[Okorodudu2010]].`},
 {from:.62,at:.74,k:'Step 4 · the waist',t:'Waist and waist-to-height',sub:'where the fat sits adds information',
  txt:`The IAS/ICCR consensus calls waist circumference a "vital sign" that gives "both independent and additive information to BMI" [[Ross2020IASICCR]]. In EPIC, the highest waist fifth carried a relative risk of death of 2.05 in men and 1.78 in women after adjusting for BMI [[Pischon2008EPIC]]. Waist-to-height ratio discriminated cardiometabolic outcomes slightly better than waist or BMI (mean AUC 0.704, 0.693, 0.671), with a proposed boundary of 0.5 [[Browning2010,Ashwell2012]]. A fixed cut-off over-classifies shorter adults [[Nevill2023]].`,
  pt:`A simple guide some services use is that a waist under half your height is a lower-risk range. It is rough, and may be less fair to shorter people [[Browning2010,Nevill2023]].`,
  hook:`WHtR boundary 0.5 [[Browning2010,Ashwell2012]]; waist action levels 94/80 and 102/88 cm, men/women [[Lean1995]].`},
 {from:.8,at:.9,k:'Step 5 · confirm',t:'Confirm with a second measure',sub:'the Lancet Commission, 2025',
  txt:`To confirm excess adiposity the Commission requires one of: direct body-fat measurement (DEXA, bioimpedance and others); BMI plus at least one of waist, waist-to-hip or waist-to-height; or at least two of those body measures whatever the BMI, with cut-offs validated for age, sex and ethnicity (agreement 98%). Above BMI 40, excess adiposity "can pragmatically be assumed" [[Rubino2025Commission]]. In pooled cohorts, 5% of people with a normal BMI had a high waist, and 9% of people with obesity a low one [[Dardari2026]].`,
  pt:`Many health experts now say a waist measurement should be checked as well as BMI, because fat around the middle carries extra risk [[Ross2020IASICCR,Pischon2008EPIC]].`,
  hook:`Commission: BMI + 1 body measure, 2 body measures, or direct fat measurement; assumed above BMI 40 [[Rubino2025Commission]].`}];
/* the imaginary adult: height fixed, weight keyframes [t, kg] */
const MS_H=1.72;
const MS_KF=[[0,70],[.2,70],[.24,50],[.4,132],[.46,85],[.84,85],[.95,124],[1,124]];

inits.measuring=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const wrap=(s,n)=>{const out=[];let c='';s.split(' ').forEach(w=>{if(c&&(c+' '+w).length>n){out.push(c);c=w}else c=c?c+' '+w:w});if(c)out.push(c);return out};
  const lines=(x,y,arr,lh,c,st)=>arr.map((l,i)=>T(x,y+i*lh,l,c,st)).join('');
  const clsOf=b=>MS_CLASSES.find(c=>b<c.hi)||MS_CLASSES[5];
  const kgAt=t=>{for(let i=1;i<MS_KF.length;i++){const a=MS_KF[i-1],b=MS_KF[i];if(t<=b[0])return lerp(a[1],b[1],ease(ramp(t,a[0],b[0])))}return MS_KF[MS_KF.length-1][1]};
  const svg=$('#msSvg'),rg=$('#msT'),note=$('#msNote'),asb=$('#msAsian');let asian=false,setSt=()=>{};
  function chart(L,kg,p){const h0=1.45,h1=2.0,w0=40,w1=150,X=h=>L.cx+L.cw*(h-h0)/(h1-h0),Y=w=>L.cy+L.ch-L.ch*(w-w0)/(w1-w0);
    const cid=kid('msclip');let s=`<defs><clipPath id="${cid}"><rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="${L.ch}"/></clipPath></defs>`;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="${L.ch}" style="fill:var(--field)"/><g clip-path="url(#${cid})">`;
    const curve=(B,rev)=>{const P=[];for(let i=0;i<=24;i++){const h=lerp(h0,h1,i/24);P.push([X(h),Y(B*h*h)])}return rev?P.reverse():P};
    const bmiNow=kg/(MS_H*MS_H),cur=clsOf(bmiNow);
    MS_CLASSES.forEach((c,i)=>{const P=[...curve(Math.max(c.lo,8)),...curve(Math.min(c.hi,80),true)];
      s+=`<path d="${ptsD(P)}Z" style="fill:var(--accent);opacity:${f1(.05+i*.075+(c===cur&&p<2?.08:0))}"/>`});
    [18.5,25,30,35,40].forEach(B=>s+=`<path d="${ptsD(curve(B))}" style="fill:none;stroke:var(--accent);stroke-width:1.2;opacity:.7"/>`);
    if(asian)MS_ASIAN.forEach(B=>s+=`<path d="${ptsD(curve(B))}" style="fill:none;stroke:var(--tx);stroke-width:1.6;stroke-dasharray:5 4"/>`);
    s+='</g>';
    /* axes */
    [1.5,1.6,1.7,1.8,1.9,2.0].forEach(h=>s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${L.cy+L.ch}" y2="${L.cy+L.ch+4}" class="axis"/>`+T(X(h),L.cy+L.ch+16,h.toFixed(1),'t-xs t-mid'));
    [40,60,80,100,120,140].forEach(w=>s+=T(L.cx-6,Y(w)+3.5,w,'t-xs t-end'));
    s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${L.cy+L.ch}" y2="${L.cy+L.ch}" class="axis"/><line x1="${L.cx}" x2="${L.cx}" y1="${L.cy}" y2="${L.cy+L.ch}" class="axis"/>`;
    s+=T(L.cx+L.cw,L.cy+L.ch+30,'height (m)','t-xs t-end')+T(L.cx,L.cy-8,'weight (kg)','t-xs');
    /* curve labels where each line leaves the plot */
    [18.5,25,30,35,40].forEach(B=>{const hT=Math.sqrt(w1/B);const top=hT<h1;const hx=top?hT:h1,wy=top?w1:B*h1*h1;
      s+=T(top?X(hx):X(hx)+3,top?Y(wy)-3:Y(wy)+3.5,B,top?'t-xs t-mid':'t-xs','fill:var(--accent);font-weight:700')});
    if(asian)MS_ASIAN.forEach(B=>{const hT=Math.sqrt(w1/B),top=hT<h1;s+=T(top?X(hT):X(h1)+3,top?Y(w1)-3:Y(B*h1*h1)+3.5,B,top?'t-xs t-mid':'t-xs','fill:var(--tx);font-weight:700')});
    /* class names inside the bands, at h = 1.6 (underweight further right) */
    [[0,1.9,16.2],[1,1.88,21.75],[2,1.88,27.5],[3,1.88,32.5],[4,1.88,37.5],[5,1.6,50]].forEach(([i,h,mid])=>{const c=MS_CLASSES[i];
      s+=T(X(h),Y(mid*h*h)+3.5,['underweight','18.5–24.9','pre-obese','class I','class II','class III'][i],'t-sm t-mid',c===cur?INK:'fill:var(--ink);opacity:.75')});
    /* the point */
    const px=X(MS_H),py=Y(kg);
    s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(py)}" y2="${L.cy+L.ch}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/><line x1="${L.cx}" x2="${f1(px)}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/>`;
    s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.4"/>`;
    s+=kitLabel(px+12,py-10,`BMI ${f1(bmiNow)}`,{});
    s+=T(L.cx,L.cy+L.ch+46,`${MS_H.toFixed(2)} m · ${Math.round(kg)} kg → BMI ${f1(bmiNow)} · ${cur.n}`,'t-sm',INK);
    if(asian)s+=T(L.cx+L.cw,L.cy+L.ch+46,'dashed: WHO 2004 action points','t-xs t-end','fill:var(--tx)');
    return s}
  function panel(p,lp,kg,X0,Y0,W,H){let s=`<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;const x=X0+16,wn=W>320?50:42;
    const bmi=kg/(MS_H*MS_H);
    if(p===0){const a=[ramp(lp,0,.2),ramp(lp,.2,.4),ramp(lp,.4,.6)];
      s+=T(x,Y0+28,'BMI = weight ÷ height²','t-big');
      s+=`<g style="opacity:${f1(a[0])}">`+T(x,Y0+58,`= ${Math.round(kg)} ÷ (${MS_H.toFixed(2)} × ${MS_H.toFixed(2)})`,'t-lbl')+'</g>';
      s+=`<g style="opacity:${f1(a[1])}">`+T(x,Y0+82,`= ${Math.round(kg)} ÷ ${(MS_H*MS_H).toFixed(2)}`,'t-lbl')+'</g>';
      s+=`<g style="opacity:${f1(a[2])}">`+T(x,Y0+110,`= ${f1(bmi)} kg/m²`,'t-big','fill:var(--brand);font-size:22px')+'</g>';
      const H2=[['1832','Quetelet: weight rises as the square of height'],['1972','Keys names it the "body mass index"'],['1985','Garrow: r ≈ 0.95 with measured fat mass/height²']];
      H2.forEach((e,i)=>{const op=ramp(lp,.55+i*.12,.65+i*.12),y=Y0+150+i*44;
        s+=`<g style="opacity:${f1(.2+.8*op)}">`+T(x,y,e[0],'t-lbl','fill:var(--brand)')+lines(x+44,y,wrap(e[1],W>320?36:30),14,'t-sm','fill:var(--ink)')+'</g>'})}
    else if(p===1){const cur=clsOf(bmi);s+=T(x,Y0+26,'WHO adult classes (kg/m²)','t-lbl');
      MS_CLASSES.forEach((c,i)=>{const y=Y0+48+i*36,on=c===cur;
        s+=`<rect x="${x-6}" y="${y-4}" width="${W-20}" height="30" rx="7" style="fill:${on?'var(--accent-soft)':'transparent'};stroke:${on?'var(--accent)':'none'};stroke-width:1.6"/>`;
        s+=T(x+4,y+15,c.r,'t-sm',on?INK:'fill:var(--ink)')+T(x+(W>320?110:100),y+15,c.n,'t-sm',on?INK:'')});
      s+=T(x,Y0+H-14,asian?'Asian action points: 23 · 27.5 · 32.5 · 37.5':'Toggle the Asian action points below the chart','t-xs',asian?'fill:var(--tx);font-weight:700':'')}
    else if(p===2){const k=Math.round(42*ease(ramp(lp,0,.4)));
      s+=lines(x,Y0+24,['100 adults with excess body fat,','measured directly'],13,'t-xs',INK);
      const IA=iconArray(x,Y0+44,{n:100,cols:10,k,size:9,gap:3.4,col:'var(--accent)',base:'var(--line)'});s+=IA.svg;
      const cx2=x+IA.w+14;
      s+=T(cx2,Y0+70,`${k}`,'t-big','font-size:24px;fill:var(--accent)')+T(cx2,Y0+86,'flagged by BMI ≥30','t-xs',INK);
      s+=T(cx2,Y0+122,`${100-k}`,'t-big','font-size:24px')+T(cx2,Y0+138,'missed','t-xs',INK);
      const ey=Y0+44+IA.h+26,ax0=x+78,aw=W-(ax0-X0)-22,sc=v=>ax0+aw*(v-22)/10;
      s+=lines(x,ey,['BMI with the type 2 diabetes risk','of BMI 30 in White adults (England)'],13,'t-xs',INK);
      [24,26,28,30,32].forEach(v=>s+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${ey+20}" y2="${ey+20+5*21}" style="stroke:var(--line);stroke-dasharray:2 3"/>`+T(sc(v),ey+20+5*21+12,v,'t-xs t-mid'));
      MS_ETH.forEach((e,i)=>{const a=ramp(lp,.2+i*.08,.3+i*.08),y=ey+32+i*21,vx=sc(lerp(30,e[1],ease(a)));
        s+=T(x,y+3.5,e[0],'t-xs','fill:var(--ink)')+`<line x1="${f1(sc(30))}" x2="${f1(vx)}" y1="${y}" y2="${y}" style="stroke:var(--tx);stroke-width:2"/><circle cx="${f1(vx)}" cy="${y}" r="4.5" style="fill:var(--tx)"/>`+(a>.95?T(vx-8,y+3.5,f1(e[1]),'t-xs t-end',INK):'')});
      }
    else if(p===3){const cmW=lerp(70,100,ease(lp)),ratio=cmW/(MS_H*100),fx=X0+W*.24,fs=Math.min(230,H-70),fy=Y0+26;
      const P=person(fx,fy,fs,{size:.5});s+=P.svg;const k=fs/100,wy=fy+50*k,half=(12+5*.5)*k,axx=X0+12;
      s+=`<ellipse cx="${f1(fx)}" cy="${f1(wy)}" rx="${f1(half)}" ry="${f1(3.5*k)}" style="fill:none;stroke:var(--tx);stroke-width:2.6"/>`;
      s+=`<path d="M${f1(axx)} ${fy}V${f1(fy+fs)}" style="stroke:var(--muted);stroke-width:1.2" marker-start="url(#msAr)" marker-end="url(#msAr)"/>`;
      s+=T(axx+4,fy+fs+18,`height ${Math.round(MS_H*100)} cm`,'t-xs',INK);
      const rx=X0+W*.5,rw=W*.46;
      s+=T(rx,Y0+40,'waist','t-sm')+T(rx,Y0+62,`${Math.round(cmW)} cm`,'t-big','fill:var(--tx)');
      s+=T(rx,Y0+96,'waist ÷ height','t-sm')+T(rx,Y0+124,ratio.toFixed(2),'t-big','font-size:28px;fill:'+(ratio>=.5?'var(--tx)':'var(--ink)'));
      const sx=v=>rx+rw*(v-.35)/.35,by=Y0+142;
      s+=`<rect x="${f1(rx)}" y="${by}" width="${f1(rw)}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(rx)}" y="${by}" width="${f1(sx(clamp(ratio,.35,.7))-rx)}" height="10" rx="5" style="fill:var(--tx);opacity:.7"/>`;
      s+=`<line x1="${f1(sx(.5))}" x2="${f1(sx(.5))}" y1="${by-6}" y2="${by+16}" style="stroke:var(--ink);stroke-width:2"/>`+T(sx(.5),by+30,'0.5 boundary','t-xs t-mid',INK);
      s+=lines(rx,by+62,['Waist action levels','(Lean 1995):','men 94 and 102 cm','women 80 and 88 cm'],15,'t-sm','fill:var(--ink)');
      s+=lines(rx,by+136,['EPIC: top waist fifth,','death RR 2.05 men,','1.78 women, after BMI'],14,'t-xs');
      s+=`<defs><marker id="msAr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted)"/></marker></defs>`}
    else{const bmiNow=bmi,assumed=bmiNow>40,bw=W-32;
      const box=(y,h,txt,on,col='var(--tx)')=>`<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="9" style="fill:${on?'var(--tx-soft)':'var(--panel)'};stroke:${on?col:'var(--line)'};stroke-width:${on?2:1}"/>`+lines(x+10,y+17,txt,13,'t-xs',on?INK:'fill:var(--ink)');
      const a=i=>ramp(lp,i*.12,i*.12+.1)>.5;
      s+=T(x,Y0+24,'Confirm excess adiposity with one of:','t-lbl');
      s+=box(Y0+36,40,wrap('BMI plus waist, waist-to-hip or waist-to-height',W>320?46:40),a(1));
      s+=box(Y0+82,40,wrap('two of those body measures, whatever the BMI',W>320?46:40),a(2));
      s+=box(Y0+128,40,wrap('direct fat measurement: DEXA, bioimpedance',W>320?46:40),a(3));
      s+=box(Y0+184,40,wrap(`BMI above 40: "can pragmatically be assumed"`,W>320?46:40),assumed,'var(--accent)');
      s+=T(x,Y0+246,`now: BMI ${f1(bmiNow)}${assumed?' · above 40':''}`,'t-sm',INK);
      s+=lines(x,Y0+268,wrap('Cut-offs validated for age, sex and ethnicity. Then: is organ function or daily life affected?',W>320?50:44),13,'t-xs')}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 744'),p=phaseOf(MS_STEPS,t),P=MS_STEPS[p],kg=kgAt(t);
    const L=N?{tx:12,ty:22,cx:46,cy:62,cw:328,ch:260,px:10,py:396,pw:380,ph:338}
             :{tx:16,ty:24,cx:50,cy:62,cw:330,ch:248,px:420,py:20,pw:288,ph:344};
    let s=T(L.tx,L.ty,P.t,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    s+=chart(L,kg,p);
    s+=panel(p,ramp(t,P.from,(MS_STEPS[p+1]||{from:1}).from),kg,L.px,L.py,L.pw,L.ph);
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#msPlay'),draw,22000,'%t:player.replay%','measuring');
  setSt=stepWire($('#msSteps'),MS_STEPS,rg,draw,stop);
  asb.addEventListener('click',()=>{asian=!asian;asb.setAttribute('aria-pressed',asian);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- calculator ---------- */
  const gauge=$('#msGauge'),out=$('#msOut'),met=$('#msMet'),imp=$('#msImp');let metric=true;
  const num=id=>{const v=parseFloat($('#'+id).value);return isFinite(v)?v:NaN};
  function read(){let h,w,wa;
    if(metric){h=num('msHcm')/100;w=num('msWkg');wa=num('msWaist')}
    else{const ft=num('msHft'),inch=num('msHin');h=((isFinite(ft)?ft:0)*12+(isFinite(inch)?inch:0))*0.0254;w=num('msWlb')*0.45359237;wa=num('msWaistIn')*2.54}
    return {h,w,wa}}
  function gDraw(b,r){const N=vb(gauge,'720 190','400 220');const x0=N?20:40,gw=N?360:640;
    const bx=v=>x0+gw*(clamp(v,15,45)-15)/30,rx=v=>x0+gw*(clamp(v,.35,.75)-.35)/.4;let s='';
    s+=T(x0,20,'BMI (kg/m²)','t-xs',INK);
    const B=[15,18.5,25,30,35,40,45];for(let i=0;i<6;i++)s+=`<rect x="${f1(bx(B[i]))}" y="30" width="${f1(bx(B[i+1])-bx(B[i])-1)}" height="22" rx="3" style="fill:var(--accent);opacity:${f1(.08+i*.08)}"/>`;
    B.slice(1,6).forEach(v=>s+=T(bx(v),66,v,'t-xs t-mid'));
    if(isFinite(b)){const m=bx(b);s+=`<path d="M${f1(m)} 26v30" style="stroke:var(--ink);stroke-width:2.6"/><circle cx="${f1(m)}" cy="41" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`+kitLabel(clamp(m,x0+30,x0+gw-30),N?88:86,f1(b),{a:'m'})}
    const ry=N?130:122;s+=T(x0,ry-10,'Waist ÷ height','t-xs',INK);
    s+=`<rect x="${x0}" y="${ry}" width="${gw}" height="16" rx="8" style="fill:var(--panel-2)"/><rect x="${f1(rx(.5))}" y="${ry}" width="${f1(rx(.75)-rx(.5))}" height="16" rx="8" style="fill:var(--tx);opacity:.2"/>`;
    s+=`<line x1="${f1(rx(.5))}" x2="${f1(rx(.5))}" y1="${ry-5}" y2="${ry+21}" style="stroke:var(--ink);stroke-width:1.8"/>`;
    [.4,.5,.6,.7].forEach(v=>s+=T(rx(v),ry+34,v.toFixed(1),'t-xs t-mid'));
    if(isFinite(r)){const m=rx(r);s+=`<circle cx="${f1(m)}" cy="${ry+8}" r="7" style="fill:var(--tx);stroke:var(--panel);stroke-width:2"/>`+kitLabel(clamp(m,x0+24,x0+gw-24),ry+54,r.toFixed(2),{a:'m'})}
    else s+=T(x0+gw,ry-10,'add a waist to see the ratio','t-xs t-end');
    gauge.innerHTML=s}
  function calc(){const {h,w,wa}=read(),sex=$('#msSex').value;
    if(!(h>=1&&h<=2.3&&w>=25&&w<=350)){out.innerHTML=`<div class="kicker">Teaching calculator</div><p>Enter an adult height between 100 and 230 cm (3 ft 4 in to 7 ft 6 in) and a weight between 25 and 350 kg (55 to 770 lb).</p>`;gDraw(NaN,NaN);return}
    const b=w/(h*h),c=clsOf(b),hasW=wa>=40&&wa<=250,r=hasW?wa/(h*100):NaN;
    const ap=MS_ASIAN.filter(v=>b>=v).pop();
    let H=`<div class="kicker">Teaching calculator · published cut-offs</div><div class="row"><span>BMI</span><b>${f1(b)} kg/m²</b></div>`;
    H+=`<p>In the WHO adult classification this BMI falls in the band <b>${c.r}</b>${c.lo>=25||c.hi<=18.5?` (${c.n})`:''} [[WHO2000TRS894,Flegal1998]].</p>`;
    H+=`<p>Against the WHO 2004 action points for Asian populations, it is ${ap?`at or above the <b>${ap}</b> point`:'below the first point (23)'} [[WHO2004Asian]].</p>`;
    if(b>40)H+=`<p>Above BMI 40, the Lancet Commission says excess adiposity "can pragmatically be assumed" [[Rubino2025Commission]].</p>`;
    if(hasW){H+=`<div class="row"><span>Waist ÷ height</span><b>${r.toFixed(2)}</b></div><p>That is ${r>=.5?'at or above':'below'} the 0.5 boundary proposed by Browning and colleagues [[Browning2010]].</p>`;
      if(sex){const L1=sex==='m'?94:80,L2=sex==='m'?102:88;H+=`<p>A waist of ${Math.round(wa)} cm is ${wa>=L2?`at or above both of Lean's levels (${L1} and ${L2} cm)`:wa>=L1?`at or above the first of Lean's levels (${L1} cm) and below the second (${L2} cm)`:`below both of Lean's levels (${L1} and ${L2} cm)`} for ${sex==='m'?'men':'women'} [[Lean1995]].</p>`}
      else H+=`<p class="stage-cap">Choose a sex to compare the waist with Lean's action levels, which differ for men and women [[Lean1995]].</p>`}
    H+=`<div class="pt"><b>Keep in mind</b><ul><li>BMI cannot tell fat from muscle and misses about half of adults with excess body fat [[Okorodudu2010]].</li><li>Risk can start at lower BMI in south Asian, Chinese, Arab and Black adults [[Caleyachetty2021Ethnicity]].</li><li>A fixed waist-to-height cut-off over-classifies shorter adults [[Nevill2023]].</li><li>These are population cut-offs: a teaching result, not a diagnosis or a target.</li></ul></div>`;
    out.innerHTML=H;gDraw(b,r)}
  function setUnits(m){if(m===metric)return;const a=read();metric=m;met.setAttribute('aria-pressed',m);imp.setAttribute('aria-pressed',!m);$('#msCalcMet').hidden=!m;$('#msCalcImp').hidden=m;
    if(isFinite(a.h)&&isFinite(a.w)){if(m){$('#msHcm').value=(a.h*100).toFixed(1);$('#msWkg').value=a.w.toFixed(1);if(isFinite(a.wa))$('#msWaist').value=a.wa.toFixed(1)}
      else{const ti=a.h/0.0254,ft=Math.floor(ti/12);$('#msHft').value=ft;$('#msHin').value=(ti-ft*12).toFixed(1);$('#msWlb').value=Math.round(a.w/0.45359237);if(isFinite(a.wa))$('#msWaistIn').value=(a.wa/2.54).toFixed(1)}}
    calc()}
  met.addEventListener('click',()=>setUnits(true));imp.addEventListener('click',()=>setUnits(false));
  $$('#m-measuring input[type=number],#msSex').forEach(el=>{el.addEventListener('input',calc);el.addEventListener('change',calc)});
  calc();
  redraws.measuring=(()=>{const prev=redraws.measuring;return()=>{prev&&prev();calc()}})();
};
