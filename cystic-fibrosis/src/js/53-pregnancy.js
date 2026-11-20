/* =============== 5.3 Fertility, pregnancy & parenthood =============== */
/* The main scrubber: the rise in pregnancies, female fertility, male fertility, partner testing, pregnancy on
   modulators, and the baby after birth. Glyphs local to this module: pgSperm (a small sperm cell), pgEgg (an egg
   with a zona ring), pgMale (a schematic testis, epididymis and vas deferens). All schematic. */
function pgSperm(x,y,s=10,ang=0,o={}){const col=o.col||'var(--accent)',ph=o.ph||0;let d=`M${f1(-s*.3)} 0`;
  for(let i=1;i<=8;i++){const u=i/8;d+=`L${f1(-s*.3-s*1.6*u)} ${f1(Math.sin(u*6+ph*12)*s*.22*u)}`}
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" style="opacity:${o.op==null?1:f1(o.op)}"><path d="${d}" style="fill:none;stroke:${col};stroke-width:1.3;stroke-linecap:round"/><ellipse cx="0" cy="0" rx="${f1(s*.38)}" ry="${f1(s*.24)}" style="fill:${col}"/></g>`}
function pgEgg(x,y,r,o={}){let s=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:${f1(Math.max(2,r*.12))}"/><circle cx="${f1(x+r*.15)}" cy="${f1(y-r*.1)}" r="${f1(r*.28)}" style="fill:var(--nucleus)"/>`;
  if(o.fert)s+=`<circle cx="${f1(x-r*.3)}" cy="${f1(y+r*.25)}" r="${f1(r*.2)}" style="fill:var(--accent);opacity:${f1(o.fert)}"/>`;return s}
function pgMale(x,y,s,o={}){const vd=o.vas==null?0:o.vas;/* (x,y) the testis centre; vas 0 absent (dashed ghost), 1 present */
  let g=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(s*.42)}" ry="${f1(s*.58)}" style="fill:var(--tissue);stroke:var(--bronchi);stroke-width:1.6"/>`;
  g+=`<path d="M${f1(x+s*.38)} ${f1(y-s*.5)}C${f1(x+s*.7)} ${f1(y-s*.4)} ${f1(x+s*.7)} ${f1(y+s*.3)} ${f1(x+s*.4)} ${f1(y+s*.52)}" style="fill:none;stroke:var(--duct);stroke-width:${f1(s*.14)};stroke-linecap:round;opacity:${f1(o.epi==null?1:o.epi)}"/>`;
  const vp=`M${f1(x+s*.42)} ${f1(y+s*.52)}C${f1(x+s*.9)} ${f1(y+s*.7)} ${f1(x+s*1.1)} ${f1(y)} ${f1(x+s*1.05)} ${f1(y-s*1.1)}`;
  g+=`<path d="${vp}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4"/>`;
  if(vd>0)g+=`<path d="${vp}" style="fill:none;stroke:var(--duct);stroke-width:${f1(s*.09)};opacity:${f1(vd)}"/>`;
  return g}
const PG_STEPS=[
 {from:0,at:.1,k:'Step 1 · a changing picture',t:'More pregnancies in the modulator era',
  txt:'In the US CF Foundation Patient Registry, annual pregnancies numbered 200–310 a year from 2010 to 2019. In 2020 the count nearly doubled to 619, after CFTR modulators were approved for most people with CF in 2019 [[Montemayor2022Pregnancy]]. The CFF 2026 position paper says reproductive-health education should begin at CF diagnosis and be revisited every year [[Jain2026CFFReproductive]].',
  pt:'Many more people with CF are becoming parents than a decade ago. Planning ahead with the CF team helps [[Montemayor2022Pregnancy,Jain2026CFFReproductive]].',
  hook:'US registry pregnancies: 200–310 a year (2010–2019), then 619 in 2020 [[Montemayor2022Pregnancy]].'},
 {from:.17,at:.25,k:'Step 2 · female fertility',t:'Fertility in women, and surprise pregnancies',
  txt:'About 35% of females with CF who try to conceive are infertile, compared with 5–15% of the general population; causes include nutrition, thick acidic cervical mucus and lower ovarian reserve [[Kazmerski2022Family]]. The CFF position paper says fertility may be improving with modulators for females [[Jain2026CFFReproductive]]. In a survey of 561 females aged 18–45, 89% used modulators and 99% used contraception; 34% had ever been pregnant and 48% of reported pregnancies were unintended [[Godfrey2025Contraception]]. An Italian centre linked more unplanned pregnancies after ETI to a long-held sense of subfertility rather than contraceptive failure [[Dacco2023]].',
  pt:'Many women with CF can get pregnant, sometimes without planning to, especially after starting modulators. Talking about birth control and planning with your team is important [[Godfrey2025Contraception,Dacco2023]].',
  hook:'Modulators did not appear to reduce the effectiveness of hormonal contraception in the 561-person survey [[Godfrey2025Contraception]].'},
 {from:.34,at:.42,k:'Step 3 · male fertility',t:'Fertility in men: sperm made, path missing',
  txt:'More than 97% of males with CF are infertile, because of congenital bilateral absence of the vas deferens (CBAVD) and atresia or absence of the epididymis [[Kazmerski2022Family]]. Sperm production itself is usually intact [[Kaltsas2025]]. Biological parenthood needs sperm retrieval (such as TESA or TESE) followed by ICSI: TESA finds sperm in about one-third to one-half of males, and about 10% more when TESE follows. Clinical pregnancy rates with assisted reproduction are close to 50%, but miscarriage risk is higher [[Kazmerski2022Family]]. In one comparison, the ICSI fertilisation rate was 32.5% in men with CF vs 68.9% in men with CBAVD only [[McBride2021]].',
  pt:'Most men with CF are born without the tubes that carry sperm, but they usually make sperm. Doctors can collect it to help them become fathers [[Kazmerski2022Family]].',
  hook:'More than 97% of males with CF are infertile from CBAVD; sperm retrieval plus ICSI allows biological parenthood [[Kazmerski2022Family]].'},
 {from:.5,at:.62,k:'Step 4 · partner testing',t:'Testing the partner, and the chances',
  txt:'ACOG advises that when a person is found to carry a CF variant, their reproductive partner should be offered testing, and if both are carriers, genetic counselling should be offered; a patient may decline any or all screening [[ACOG2017CO691]]. CF is autosomal recessive: disease needs variants on both copies [[Deignan2020ACMG,Shteinberg2021]]. Worked from that rule, every child of a person with CF inherits one variant. With a partner who is not a carrier, each child would be a carrier; with a carrier partner, each pregnancy has a 2 in 4 chance of CF. Genetic counsellors have an important role in thinking through the options [[Kazmerski2022Family]].',
  pt:'If you are thinking about pregnancy, your CF team, a diabetes check and a genetic counsellor can help you plan [[Moran2010CFRD,Kazmerski2022Family]].',
  hook:'One partner a carrier → offer testing to the other; both carriers → offer genetic counselling [[ACOG2017CO691]].'},
 {from:.67,at:.76,k:'Step 5 · pregnancy',t:'Lung health and diabetes checks in pregnancy',
  txt:'In 307 pregnancies at 11 US adult centres, ppFEV1 fell from before to during pregnancy without a modulator (−2.36) and rose with a highly effective modulator (+2.60) [[Jain2025MaternalOutcomes]]. In the Italian registry (172 pregnancies), preterm birth was 24.1% overall, 40.6% with CF-related diabetes and 22.7% on modulators [[Salvatore2026Registry]]. The CFF/ADA guideline recommends screening for gestational diabetes "at both 12–16 weeks and 24–28 weeks of gestation" in pregnant women with CF not known to have CFRD, using a 2-h 75-g OGTT [[Moran2010CFRD]]. Gestational diabetes occurs in 10–36% of CF pregnancies [[Montemayor2022Pregnancy]].',
  pt:'Most women with CF have healthy pregnancies, but babies are more often born early, especially when lung function is low or there is diabetes. Extra sugar tests are part of pregnancy care [[Shteinberg2021Fertility,Moran2010CFRD]].',
  hook:'Pregnancy in CF: OGTT at 12–16 and at 24–28 weeks if no known CFRD; OGTT 6–12 weeks postpartum after gestational diabetes [[Moran2010CFRD]].'},
 {from:.84,at:.92,k:'Step 6 · after birth',t:'The baby, breastfeeding and the newborn screen',
  txt:'The Trikafta label (8.2) says there is no information on elexacaftor, tezacaftor or ivacaftor in human milk, though all three pass into rat milk, and that breastfeeding benefits should be weighed against the mother\'s clinical need and any potential infant effects [[FDA-Trikafta]]. Three infants exposed to ETI in the womb and through breastfeeding had bilateral cataracts without significant visual impairment <span class="ev early">Early evidence</span> [[Jain2022Cataracts]]. In 19 ETI-exposed infants, the median newborn-screen IRT was 18.9 ng/mL, similar to normal screens (22.5 ng/mL); the authors recommend CFTR variant analysis for all ETI-exposed infants [[Patel2023IRT]]. A false-negative newborn screen has been reported [[Fortner2021]].',
  pt:'A baby whose mother took a modulator may need an eye check and a gene test for CF, because the usual newborn blood test can miss CF [[Patel2023IRT,Jain2022Cataracts]].',
  hook:'In-utero ETI exposure lowers newborn IRT and can give a false-negative CF newborn screen [[Patel2023IRT,Fortner2021]].'}];
inits.pregnancy=()=>{
  const svg=$('#pgSvg'),rg=$('#pgT'),note=$('#pgNote'),rd=$('#pgRead');let setSt=()=>{};
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const H=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--ink);font-weight:600');
  function bar(x,y,w,v,max,col,lab,val,o={}){const h=o.h||13,bw=w*clamp(Math.abs(v)/max);let s=lab?T(x,y-4,lab,'t-xs','fill:var(--ink)'):'';
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(bw)}" height="${h}" rx="4" style="fill:${col};opacity:.85"/>`;
    if(val)s+=T(x+bw+6,y+h-3,val,'t-sm','fill:var(--ink);font-weight:700');return s}
  const SC=[
   /* 1: registry pregnancies, a band for 2010–2019 and a point for 2020 */
   (u,N)=>{const x=N?44:60,y=N?70:66,w=N?330:420,h=N?220:250,X=v=>x+w*(v-2010)/10,Y=v=>y+h-h*v/700;let s='';
     s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:var(--field)"/><line x1="${x}" x2="${x+w}" y1="${y+h}" y2="${y+h}" class="axis"/><line x1="${x}" x2="${x}" y1="${y}" y2="${y+h}" class="axis"/>`;
     [0,200,400,600].forEach(v=>{s+=`<line x1="${x}" x2="${x+w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(x-6,Y(v)+3,v,'t-xs t-end')});
     for(let yr=2010;yr<=2020;yr+=2)s+=T(X(yr),y+h+15,yr,'t-xs t-mid');
     s+=T(x,y-8,'US registry pregnancies per year','t-xs','fill:var(--ink)');
     const g=ease(ramp(u,.02,.45)),bx1=lerp(X(2010),X(2019),g);
     s+=`<rect x="${f1(X(2010))}" y="${f1(Y(310))}" width="${f1(bx1-X(2010))}" height="${f1(Y(200)-Y(310))}" style="fill:var(--brand);opacity:.3"/>`;
     if(g>.3)s+=T(X(2010)+6,Y(310)-6,'200–310 a year, 2010–2019','t-xs','fill:var(--brand);font-weight:600');
     const m=ramp(u,.4,.5);s+=`<line x1="${f1(X(2019))}" x2="${f1(X(2019))}" y1="${y}" y2="${y+h}" style="stroke:var(--rx);stroke-width:1.6;stroke-dasharray:4 3;opacity:${f1(m)}"/>`+T(X(2019)-4,y+h-8,'2019: modulators for most','t-xs t-end',`fill:var(--rx);opacity:${f1(m)}`);
     const d=ease(ramp(u,.5,.8)),v=lerp(310,619,d);
     if(d>0){s+=`<path d="M${f1(X(2019))} ${f1(Y(310))}L${f1(lerp(X(2019),X(2020),d))} ${f1(Y(v))}" style="stroke:var(--brand);stroke-width:2;stroke-dasharray:4 3"/><circle cx="${f1(lerp(X(2019),X(2020),d))}" cy="${f1(Y(v))}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
       if(d>.9)s+=T(X(2020)+(N?-10:10),Y(v)+(N?-6:5),619,N?'t-big t-end':'t-big','fill:var(--brand)')}
     if(u>.82)s+=T(X(2019)-8,Y(619)+4,'2020: nearly doubled','t-xs t-end',`fill:var(--ink);opacity:${f1(ramp(u,.82,.92))}`);
     const sx=N?24:550,sy=N?352:90;
     s+=`<g style="opacity:${f1(ramp(u,.2,.4))}">`+H(sx,sy,'What changed')+['Modulators approved for','most people with CF (2019)','','Reproductive-health','education: from diagnosis,','revisited every year'].map((q,j)=>T(sx,sy+20+j*15,q,'t-xs','fill:var(--ink)')).join('')+'</g>';
     return s},
   /* 2: cervical mucus and sperm; the survey's pregnancies */
   (u,N)=>{const x=N?24:30,y=N?64:70,w=N?352:330,h=N?150:170;let s='';
     s+=H(x,y,'Sperm meeting cervical mucus (schematic)');
     s+=`<path d="M${x} ${y+20}H${x+w}V${y+h}H${x}Z" style="fill:var(--tissue);opacity:.5"/><path d="M${x} ${y+50}Q${x+w/2} ${y+38} ${x+w} ${y+50}V${y+h-30}Q${x+w/2} ${y+h-18} ${x} ${y+h-30}Z" style="fill:var(--panel)"/>`;
     const th=1-ease(ramp(u,.35,.7))*.7;
     s+=mucusPlug(x+w*.55,y+h/2+10,(h-80)/2*(.55+.45*th),{thick:th,seed:4,wob:u*3});
     for(let i=0;i<6;i++){const k=(u*2.2+i/6)%1,pass=th<.6&&i%2===0,xx=x+16+k*(pass?w-30:w*.5),yy=y+h/2+10+Math.sin(i*2.1)*18;s+=pgSperm(Math.min(xx,pass?x+w-12:x+w*.5),yy,10,0,{ph:u*3+i,op:.9})}
     s+=T(x+4,y+h+14,th>.6?'thick, acidic mucus: one of several causes of lower fertility':'thinner mucus: drawn as a Hypothesis, not a measured effect','t-xs','fill:var(--ink)');
     const ix=N?24:400,iy=N?y+h+44:84;s+=H(ix,iy,'Reported pregnancies in 561 females (survey)');
     const I=icons(ix,iy+12,{n:50,cols:10,k:Math.round(24*ease(ramp(u,.1,.5))),size:N?15:14,gap:N?12:15,col:'var(--warn)',shape:'person'});s+=I.svg;
     const ly=iy+12+I.h+12;s+=`<rect x="${ix}" y="${ly-8}" width="10" height="9" style="fill:var(--warn)"/>`+T(ix+14,ly,'48% unintended (each figure = 2% of pregnancies)','t-xs','fill:var(--ink)');
     s+=`<g style="opacity:${f1(ramp(u,.5,.65))}">`+T(ix,ly+20,'Infertile when trying: about 35% (vs 5–15%)','t-xs','fill:var(--ink)')+T(ix,ly+36,'Partnered modulator users: OR 1.8 for pregnancy','t-xs','fill:var(--ink)')+'</g>';
     return s},
   /* 3: male anatomy, retrieval and ICSI */
   (u,N)=>{const mx=N?120:130,my=N?170:190,ms=N?70:80;let s=H(N?24:30,N?64:70,'The male reproductive tract in CF (schematic)');
     s+=pgMale(mx,my,ms,{vas:0});
     s+=T(mx+ms*1.15,my-ms*.95,'vas deferens absent (CBAVD)','t-xs','fill:var(--bad);font-weight:600');
     s+=T(mx,my+ms*.58+16,'testis: sperm usually made','t-xs t-mid','fill:var(--ink)');
     /* sperm inside the testis */
     for(let i=0;i<5;i++)s+=pgSperm(mx-ms*.2+((i*13)%30),my-ms*.3+i*ms*.13,7,(i*70)%360,{ph:u*4+i});
     /* the needle */
     const nd=ease(ramp(u,.15,.35))*(1-ease(ramp(u,.5,.6)));const nx=mx-ms*1.3+ms*.75*nd,ny=my-ms*.2;
     s+=`<g style="opacity:${f1(ramp(u,.1,.18)*(1-ramp(u,.6,.66)))}"><path d="M${f1(nx-60)} ${f1(ny-24)}L${f1(nx)} ${f1(ny)}" style="stroke:var(--muted);stroke-width:2.2"/><rect x="${f1(nx-88)}" y="${f1(ny-36)}" width="34" height="14" rx="3" transform="rotate(22 ${f1(nx-71)} ${f1(ny-29)})" style="fill:var(--panel-2);stroke:var(--muted)"/></g>`;
     s+=T(N?24:30,my+ms*.58+36,'retrieval: TESA, then TESE if needed','t-xs',`fill:var(--ink);opacity:${f1(ramp(u,.15,.25))}`);
     /* ICSI: an egg and a pipette */
     const ex=N?300:330,ey=N?170:190,er=N?34:40,ic=ease(ramp(u,.55,.8));
     s+=`<g style="opacity:${f1(ramp(u,.5,.58))}">`+pgEgg(ex,ey,er,{fert:ramp(u,.8,.9)});
     s+=`<path d="M${f1(ex+er+60-40*ic)} ${ey}H${f1(ex+er*.2+(1-ic)*40)}" style="stroke:var(--muted);stroke-width:3"/>`+pgSperm(ex+er*.3+(1-ic)*40,ey,7,0,{op:1-ramp(u,.8,.88)});
     s+=T(ex,ey+er+18,'ICSI: one sperm injected','t-xs t-mid','fill:var(--ink)')+'</g>';
     const bx=N?24:470,by=N?306:84,bw=N?250:170;
     s+=`<g style="opacity:${f1(ramp(u,.25,.4))}">`+H(bx,by,'Numbers')+bar(bx,by+24,bw,97*ease(ramp(u,.25,.45)),100,'var(--bad)','males with CF infertile','>97%')+
       bar(bx,by+64,bw,32.5*ease(ramp(u,.6,.8)),100,'var(--accent)','ICSI fertilisation: CF','32.5%')+bar(bx,by+104,bw,68.9*ease(ramp(u,.6,.8)),100,'var(--muted)','CBAVD without CF','68.9%')+
       T(bx,by+138,'clinical pregnancy with ART: ≈50%','t-xs','fill:var(--ink)')+T(bx,by+154,'avoiding all modulator exposure','t-xs','fill:var(--ink)')+T(bx,by+168,'of sperm: ≈80 days off therapy','t-xs','fill:var(--ink)')+'</g>';
     return s},
   /* 4: Punnett squares: partner not a carrier, then a carrier */
   (u,N)=>{const car=u>.5,sh=ease(ramp(car?u-.5:u,.05,.35)),ps=N?62:64,px=N?110:110,py=N?96:100;let s='';
     s+=H(N?24:30,N?64:70,car?'Partner is a carrier':'Partner is not a carrier');
     const P=punnett(px,py,ps,{a:['v','v'],b:car?['N','v']:['N','N'],show:sh,lbl:{cf:'CF',carrier:'carrier',none:'neither'}});s+=P.svg;
     s+=T(px-8,py+ps*2.9+8,'left: the parent with CF (v v)','t-xs','fill:var(--ink)')+T(px-8,py+ps*2.9+22,'top: the partner (v = CF variant, N = none)','t-xs','fill:var(--ink)');
     const rx=N?24:400,ry=N?py+ps*3+52:100;
     s+=`<g style="opacity:${f1(ramp(car?u-.5:u,.3,.42))}">`+H(rx,ry,'Each pregnancy')+(car?bar(rx,ry+24,N?240:220,50,100,'var(--variant)','CF','2 in 4')+bar(rx,ry+62,N?240:220,50,100,'var(--brand)','carrier','2 in 4'):bar(rx,ry+24,N?240:220,100,100,'var(--brand)','carrier, like the parent','4 in 4')+T(rx,ry+60,'no child with CF from this pairing','t-xs','fill:var(--ink)'))+'</g>';
     const fy=N?ry+100:236;
     s+=`<g style="opacity:${f1(ramp(u,.6,.75))}">`+H(rx,fy,'ACOG')+['one partner a carrier → offer the other testing','both carriers → offer genetic counselling','screening can be declined'].map((q,j)=>T(rx,fy+18+j*15,q,'t-xs','fill:var(--ink)')).join('')+'</g>';
     return s},
   /* 5: a 40-week line with the diabetes checks, then FEV1 and preterm bars */
   (u,N)=>{const x=N?24:40,w=N?352:640,ty=N?110:94,X=wk=>x+w*(wk+6)/60;let s=H(x,N?64:66,'Pregnancy and after (weeks)');
     s+=tline(x,ty,w,{min:-6,max:54,step:N?12:6,fmt:v=>v<0?'before':v===0?'0':v}).svg;
     const wk=lerp(-6,54,ease(ramp(u,0,.6)));s+=`<circle cx="${f1(X(wk))}" cy="${ty}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
     s+=`<rect x="${f1(X(0))}" y="${ty-26}" width="${f1(X(40)-X(0))}" height="10" rx="4" style="fill:var(--brand-soft)"/>`+T(X(20),ty-29,'pregnancy','t-xs t-mid','fill:var(--brand)');
     const M=[[-6,-1,'OGTT before, if no recent normal screen'],[12,16,'OGTT 12–16 wk'],[24,28,'OGTT 24–28 wk'],[46,52,'OGTT 6–12 wk after, if GDM']];
     M.forEach((m,j)=>{const on=wk>=m[0];s+=`<rect x="${f1(X(m[0]))}" y="${ty-12}" width="${f1(X(m[1])-X(m[0]))}" height="24" rx="4" style="fill:var(--warn);opacity:${on?.75:.2}"/>`;
       if(on)s+=T(X(m[0])+(j===3?X(m[1])-X(m[0]):0),ty+28+(j%2)*13,N?m[2].replace(', if no recent normal screen','').replace(', if GDM',''):m[2],j===3?'t-xs t-end':'t-xs','fill:var(--ink)')});
     const by=N?196:170,g=ease(ramp(u,.45,.75)),bw=N?140:150,cx0=N?x+176:x+230;
     s+=`<g style="opacity:${f1(ramp(u,.4,.5))}">`+H(x,by,N?'ppFEV1, before → during':'ppFEV1 change, before → during pregnancy');
     const Z=x+bw;s+=`<line x1="${Z}" x2="${Z}" y1="${by+14}" y2="${by+86}" style="stroke:var(--muted)"/>`;
     [['no modulator',-2.36,'var(--bad)'],['highly effective modulator',2.6,'var(--rx)']].forEach((q,j)=>{const yy=by+28+j*32,ww=bw*Math.abs(q[1])/3*g;
       s+=`<rect x="${f1(q[1]<0?Z-ww:Z)}" y="${yy}" width="${f1(ww)}" height="14" rx="3" style="fill:${q[2]};opacity:.85"/>`+T(q[1]<0?Z-ww-4:Z+ww+4,yy+11,(q[1]>0?'+':'')+(q[1]*g).toFixed(2),q[1]<0?'t-sm t-end':'t-sm','fill:var(--ink);font-weight:700')+T(q[1]<0?Z+6:Z-6,yy+11,q[0],q[1]<0?'t-xs':'t-xs t-end','fill:var(--ink)')});
     s+=T(x,by+100,'307 pregnancies, 11 US centres','t-xs')+'</g>';
     const qx=N?x:x+360,qy=N?by+130:by,g2=ease(ramp(u,.6,.9));
     s+=`<g style="opacity:${f1(ramp(u,.55,.65))}">`+H(qx,qy,'Preterm birth, Italian registry')+bar(qx,qy+26,N?240:220,24.1*g2,50,'var(--muted)','overall',f1(24.1*g2)+'%')+bar(qx,qy+60,N?240:220,40.6*g2,50,'var(--warn)','with CF-related diabetes',f1(40.6*g2)+'%')+bar(qx,qy+94,N?240:220,22.7*g2,50,'var(--rx)','on modulators',f1(22.7*g2)+'%')+'</g>';
     return s},
   /* 6: the baby: breastfeeding, eyes, liver tests and the newborn screen */
   (u,N)=>{const x=N?24:30;let s=H(x,N?64:66,'Checks for a modulator-exposed baby');
     const bx=N?70:90,by=N?140:150;
     s+=`<circle cx="${bx}" cy="${by-30}" r="22" style="fill:var(--skin)"/><path d="M${bx-30} ${by+40}Q${bx-30} ${by-6} ${bx} ${by-6}Q${bx+30} ${by-6} ${bx+30} ${by+40}Z" style="fill:var(--brand-soft);stroke:var(--brand)"/>`;
     s+=`<circle cx="${bx-8}" cy="${by-32}" r="2.6" style="fill:var(--ink)"/><circle cx="${bx+8}" cy="${by-32}" r="2.6" style="fill:var(--ink)"/>`;
     const C=[['eyes','cataract screening',.05,'Jain 2022: 3 infants with cataracts'],['liver','consider liver tests',.18,'case reports of raised LFTs'],['blood spot','IRT can read normal',.31,'variant analysis recommended']];
     C.forEach((c,j)=>{const op=ramp(u,c[2],c[2]+.1),ly=by-50+j*(N?40:46),lx=bx+48;
       s+=`<g style="opacity:${f1(op)}"><path d="M${bx+(j===0?14:j===1?12:24)} ${j===0?by-32:j===1?by+12:by+30}L${lx-4} ${ly-4}" style="stroke:var(--muted);stroke-width:1.2"/>`+T(lx,ly-2,c[0]+': '+c[1],'t-sm','fill:var(--ink);font-weight:600')+T(lx,ly+12,c[3],'t-xs')+'</g>'});
     const gx=N?24:440,gy=N?236:84,gw=N?300:240,g=ease(ramp(u,.42,.7));
     s+=`<g style="opacity:${f1(ramp(u,.4,.5))}">`+H(gx,gy,'Newborn-screen IRT, median ng/mL')+bar(gx,gy+26,gw,18.9*g,40,'var(--rx)','19 ETI-exposed infants',f1(18.9*g))+bar(gx,gy+62,gw,22.5*g,40,'var(--muted)','infants with normal screens',f1(22.5*g))+T(gx,gy+96,'exposed babies looked like normal screens','t-xs','fill:var(--ink)')+T(gx,gy+110,'→ a false negative is possible','t-xs','fill:var(--bad)')+'</g>';
     const mx=N?24:440,my=N?380:236,mw=N?340:240,X=v=>mx+mw*(v-2021)/6;
     s+=`<g style="opacity:${f1(ramp(u,.65,.78))}">`+H(mx,my,'MAYFLOWERS: about 285 pregnancies')+tline(mx,my+26,mw,{min:2021,max:2027,step:N?2:2}).svg+`<circle cx="${f1(X(2021.75))}" cy="${my+26}" r="5" style="fill:var(--brand)"/><circle cx="${f1(X(2027.5))}" cy="${my+26}" r="5" style="fill:none;stroke:var(--brand);stroke-width:2"/>`+T(mx,my+58,'start 2021 · primary results estimated 2027','t-xs','fill:var(--ink)')+'</g>';
     return s}];
  function draw(t){const N=vb(svg,'720 380','400 540'),p=phaseOf(PG_STEPS,t),S=PG_STEPS[p],nx=PG_STEPS[p+1]?PG_STEPS[p+1].from:1.0001,u=clamp((t-S.from)/(nx-S.from));
    let s=T(N?16:20,26,S.t,'t-big','fill:var(--rec)')+T(N?16:20,42,S.k,'t-sm');
    s+=SC[p](u,N);
    const sx=N?16:20,sw=(N?368:680)/6,sy=N?520:356;
    PG_STEPS.forEach((q,j)=>{s+=`<rect x="${f1(sx+j*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${j===p?'var(--rec)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(sx+(N?368:680)*t)}" cy="${sy+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=[`<span>US pregnancies <b>200–310/yr → 619 (2020)</b></span>`,`<span>Unintended <b>48% of pregnancies</b></span>`,`<span>Males infertile <b>&gt;97% (CBAVD)</b></span>`,`<span>Partner carrier <b>2 in 4 chance of CF</b></span>`,`<span>OGTT <b>12–16 and 24–28 weeks</b></span>`,`<span>Exposed infants <b>eyes · liver · gene test</b></span>`][p];
    note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#pgPlay'),draw,42000,'Replay','pregnancy');
  setSt=stepWire($('#pgSteps'),PG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- partner-testing explorer ---------- */
  const ex=$('#pgEx'),exOut=$('#pgExOut');let me='cf',pa='carrier';
  const ME={cf:['v','v'],carrier:['N','v']},PA={none:['N','N'],carrier:['N','v'],unknown:null};
  function drawEx(){const N=vb(ex,'560 260','380 330');$$('[data-pgme]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgme===me));$$('[data-pgpa]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgpa===pa));
    let s='';const ps=N?60:62,px=N?70:80,py=N?60:64;
    if(PA[pa]){const P=punnett(px,py,ps,{a:ME[me],b:PA[pa],show:1});s+=P.svg;
      const n=P.n,rx=N?24:300,ry=N?py+ps*3+30:70;
      s+=T(px-10,py-38,'left: you ('+ME[me].join(' ')+') · top: partner ('+PA[pa].join(' ')+')','t-xs','fill:var(--ink)');
      {s+=`<text x="${rx}" y="${ry}" class="t-sm" style="fill:var(--ink);font-weight:600">Each pregnancy</text>`;
        [['CF',n.cf,'var(--variant)'],['carrier',n.carrier,'var(--brand)'],['neither',n.none,'var(--muted)']].forEach((q,j)=>{const y=ry+22+j*(N?26:34),w=N?200:140;
          s+=`<rect x="${rx}" y="${y}" width="${w}" height="13" rx="4" style="fill:var(--panel-2)"/><rect x="${rx}" y="${y}" width="${f1(w*q[1]/4)}" height="13" rx="4" style="fill:${q[2]};opacity:.85"/><text x="${rx+w+8}" y="${y+11}" class="t-sm" style="fill:var(--ink);font-weight:700">${q[0]}: ${q[1]} in 4</text>`})}}
    else{s+=`<rect x="20" y="30" width="${N?340:520}" height="${N?140:120}" rx="12" style="fill:var(--panel-2)"/><text x="40" y="66" class="t-big">Partner not tested</text><text x="40" y="90" class="t-sm" style="fill:var(--ink)">The chance cannot be worked out yet.</text><text x="40" y="110" class="t-sm" style="fill:var(--ink)">ACOG: offer the partner testing; screening</text><text x="40" y="128" class="t-sm" style="fill:var(--ink)">can be declined.</text>`}
    ex.innerHTML=s;
    const txt={cf:{none:'You have CF and your partner tested as not a carrier: worked from the recessive rule, every child would carry one variant and none would have CF from these two copies.',carrier:'You have CF and your partner is a carrier: each pregnancy has a 2 in 4 chance of a child with CF and a 2 in 4 chance of a carrier child. ACOG advises offering genetic counselling when both partners carry a variant.',unknown:'You have CF and your partner has not been tested. ACOG advises offering the partner testing; anyone may decline.'},
      carrier:{none:'You are a carrier and your partner is not: each child has a 2 in 4 chance of being a carrier and no chance of CF from these copies.',carrier:'Both partners are carriers: each pregnancy has a 1 in 4 chance of CF, 2 in 4 of a carrier child and 1 in 4 of neither. "Chance has no memory": each pregnancy starts fresh.',unknown:'You are a carrier and your partner has not been tested. ACOG advises that the partner be offered testing.'}}[me][pa];
    exOut.innerHTML=txt+' [[ACOG2017CO691,Deignan2020ACMG]] <span class="pg-c">Carrier testing does not find every variant: with the older 23-variant panel, the estimated share of carrier couples detected ranged from 23.4% to 88.6% by ancestry [[Palomaki2004]], and carrier screening cannot detect new (de novo) variants in a child [[Gregg2021ACMG]].</span>'}
  $$('[data-pgme]').forEach(b=>b.addEventListener('click',()=>{me=b.dataset.pgme;drawEx()}));
  $$('[data-pgpa]').forEach(b=>b.addEventListener('click',()=>{pa=b.dataset.pgpa;drawEx()}));
  drawEx();
};
