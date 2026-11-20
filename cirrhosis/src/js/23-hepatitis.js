/* =============== 2.3 Viral hepatitis B & C =============== */
const HE_STEPS=[
 {from:0,at:.12,k:'Two viruses',t:'Who has hepatitis B and C',
  txt:`Hepatitis B and C were still the main causes of the global cirrhosis burden in GBD 2017, especially in low-income countries, although NASH (now MASH) was expected to overtake them "in the near future" [[GBD2020Cirrhosis]]. Modelling estimates 257.5 million people living with hepatitis B in 2022 (3.2%), of whom 36.0 million were diagnosed and only 6.8 million of the 83.3 million eligible were treated [[Polaris2023HBV]]. For hepatitis C it estimates 56.8 million viraemic infections in 2020, down from 63.6 million in 2015 [[Polaris2022HCV]]. Estimates differ by method: a 2023 seminar gives 296 million with chronic hepatitis B in 2019 [[Jeng2023Lancet]].`,
  pt:`Hepatitis B often passes from mother to baby at birth, and a vaccine given at birth protects babies [[Terrault2018AASLD,Jeng2023Lancet]]. Hepatitis C spreads through blood: unsafe injection drug use and unsterile medical procedures are the major risk factors [[Manns2017NRDP]].`,
  hook:`Most people with hepatitis B are undiagnosed: 36.0 million of 257.5 million in 2022 [[Polaris2023HBV]].`},
 {from:.17,at:.28,k:'Hepatitis B',t:'Age decides who stays infected',
  txt:`After exposure, the chance that hepatitis B becomes chronic depends on age: 90% in newborns of HBeAg-positive mothers, 25–30% in infants and children under 5, and less than 5% in adults (AASLD 2018) [[Terrault2018AASLD]]. Chronic infection then passes through phases that may each last decades [[Yuen2018NRDP]]. Universal infant immunisation, including the birth dose, is described as the most effective prevention [[Jeng2023Lancet]], yet only 46% of infants had a timely birth dose in the most recent data [[Polaris2023HBV]].`,
  pt:`Babies who catch hepatitis B at birth usually keep it for life. Most adults who catch it clear it.`,
  hook:`Chronicity by age: 90% newborns of HBeAg+ mothers, 25–30% under-5s, &lt;5% adults [[Terrault2018AASLD]].`},
 {from:.33,at:.45,k:'REVEAL-HBV',t:'More virus, more scar',
  txt:`REVEAL-HBV followed 3,582 untreated people with hepatitis B in Taiwan for a mean of 11 years. Cumulative incidence of cirrhosis rose from 4.5% at HBV DNA below 300 copies/mL to 36.2% at 10<sup>6</sup> copies/mL or more. Adjusted for HBeAg and ALT, the relative risks were 2.5, 5.6 and 6.5 across the three highest bands [[Iloeje2006]]. Liver cancer followed the same gradient, from 108 to 1,152 per 100,000 person-years [[Chen2006JAMA]].`,
  pt:`The more hepatitis B virus there is in the blood, the higher the chance of scarring and liver cancer [[Iloeje2006,Chen2006JAMA]].`,
  hook:`HBV DNA level predicts cirrhosis independently of HBeAg and ALT: RR 6.5 at ≥10<sup>6</sup> copies/mL [[Iloeje2006]].`},
 {from:.5,at:.63,k:'Treating hepatitis B',t:'Quiet the virus, scar recedes',
  txt:`Nucleos(t)ide analogues and peginterferon can prevent cirrhosis and HCC, but they do not eradicate HBV and rarely clear HBsAg [[Jeng2023Lancet]]. In October 2026 the FDA approved bepirovirsen (Hibsago), an antisense injection added to nucleos(t)ide tablets for 24 weeks in adults without cirrhosis. In its two trials, 20% and 19% had no detectable HBsAg and suppressed HBV DNA 24 weeks after stopping all treatment, against 0% on placebo. It is contraindicated in cirrhosis and has a boxed warning about hepatic flares and thrombocytopenia [[FDA-Hibsago]]. In a lamivudine trial in advanced fibrosis or cirrhosis, disease progression fell from 17.7% on placebo to 7.8% [[Liaw2004NEJM]]. On tenofovir DF, 71 of 96 people (74%) with cirrhosis at baseline no longer had cirrhosis on biopsy at year 5 <span class="ev est">Established</span> [[Marcellin2013]]. The labels carry a boxed warning that stopping anti-hepatitis B therapy can cause severe acute flares [[FDA-Baraclude,FDA-Viread,FDA-Vemlidy]]. AASLD 2018 states that HCC risk persists despite suppression, so surveillance should continue in people at risk [[Terrault2018AASLD]].`,
  pt:`Hepatitis B pills do not remove the virus, but they keep it quiet, and in many people the scarring gets better over years. Do not stop them without talking to your liver team [[Marcellin2013,FDA-Viread]].`,
  hook:`Long-term tenofovir: cirrhosis had regressed in 74% (71 of 96) on the 5-year biopsy [[Marcellin2013]].`},
 {from:.67,at:.82,k:'Hepatitis C',t:'Slow scarring over decades',
  txt:`About 26% of people clear hepatitis C on their own after acute infection [[Micallef2006]]. For the rest, scarring is usually slow. In 2,235 untreated French patients the median fibrosis progression was 0.133 METAVIR units a year, a median of 30 years to cirrhosis: 13 years in men infected after 40, 42 years in women infected before 40 who did not drink [[Poynard1997]]. A meta-analysis estimated 16% with cirrhosis 20 years after infection (7% in non-clinical, 18% in clinical settings) [[Thein2008]]. Once cirrhosis is present, the yearly risk is 1–5% for HCC and 3–6% for decompensation [[Westbrook2014]].`,
  pt:`Hepatitis C usually scars the liver slowly, over decades. Older age at infection, drinking 50 g of alcohol a day or more, and male sex speed it up [[Poynard1997]].`,
  hook:`About 16% of people with chronic HCV have cirrhosis 20 years after infection [[Thein2008]].`},
 {from:.84,at:.97,k:'Cure',t:'DAA cure, and what follows',
  txt:`Direct-acting antivirals cure hepatitis C (SVR12) in more than 90% [[Manns2017NRDP]]: 99% with 12 weeks of sofosbuvir–velpatasvir in ASTRAL-1 [[Feld2015ASTRAL1]] and 99% with glecaprevir–pibrentasvir in compensated cirrhosis in EXPEDITION-1 [[Forns2017EXPEDITION1]]. Cure changes outcomes. In 530 interferon-treated people with advanced fibrosis or cirrhosis, 10-year mortality was 8.9% with SVR versus 26.0% without, and HCC 5.1% versus 21.8% <span class="ev est">Established</span> [[vanderMeer2012]]. In 22,500 US veterans treated with DAAs, SVR cut HCC from 3.45 to 0.90 per 100 person-years, but people with cirrhosis still had 1.82 per 100 person-years, so the authors advised ongoing surveillance [[Kanwal2017]].`,
  pt:`If you already have cirrhosis, keep having your liver cancer checks after hepatitis C is cured. The risk goes down but does not go away [[Kanwal2017]].`,
  hook:`After SVR, people with cirrhosis still need HCC surveillance (1.82 HCC per 100 person-years) [[Kanwal2017]].`}
];
const HE_CURE=[
 {k:'spont',lab:'No treatment',short:'no treatment: clear it alone',v:26,col:'var(--muted)',
  txt:`Not a treatment: in 31 studies of acute hepatitis C, a weighted mean of 26% cleared the virus spontaneously, more often women [[Micallef2006]]. The other three in four go on to chronic infection.`},
 {k:'peg',lab:'2013: with peginterferon',short:'SOF + PEG-IFN + RBV, 2013',v:90,col:'var(--accent)',
  txt:`In the 2013 phase 3 sofosbuvir trials, 90% of previously untreated people (mainly genotype 1 or 4) given 12 weeks of sofosbuvir plus peginterferon–ribavirin reached SVR [[Lawitz2013]]. Interferon still had to be injected. The first interferon-free combination, ledipasvir–sofosbuvir, was approved by the FDA on 10 October 2014 [[FDA-Harvoni]].`},
 {k:'astral1',lab:'ASTRAL-1',short:'ASTRAL-1 sof–vel, 12 wk',v:99,col:'var(--rx)',
  txt:`ASTRAL-1: sofosbuvir–velpatasvir for 12 weeks in genotypes 1, 2, 4, 5 and 6 (624 treated, 19% with cirrhosis). SVR12 was 99% (95% CI 98 to &gt;99), against 0 of 116 on placebo [[Feld2015ASTRAL1]].`},
 {k:'exp1',lab:'EXPEDITION-1',short:'EXPEDITION-1, compensated',v:99,col:'var(--rx)',
  txt:`EXPEDITION-1: glecaprevir–pibrentasvir for 12 weeks in 146 people with compensated cirrhosis. 145 (99%) reached SVR12 [[Forns2017EXPEDITION1]].`},
 {k:'astral4',lab:'ASTRAL-4',short:'ASTRAL-4 decomp., + RBV',v:94,col:'var(--rx)',
  txt:`ASTRAL-4: decompensated (Child–Pugh B) cirrhosis. SVR12 was 83% with 12 weeks of sofosbuvir–velpatasvir, 94% with ribavirin added, and 86% with 24 weeks [[Curry2015ASTRAL4]]. Cure is still very likely, but less certain once the liver has decompensated.`}
];
inits.hepatitis=()=>{
  const svg=$('#heSvg'),rg=$('#heT'),S=HE_STEPS;
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const R4=(x,y,w,h,st,rx=2)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const vir=(x,y,r,col,op)=>{let g=`<g style="opacity:${f1(op)}">`;for(let i=0;i<6;i++){const a=i/6*6.283;g+=`<line x1="${f1(x+Math.cos(a)*r)}" y1="${f1(y+Math.sin(a)*r)}" x2="${f1(x+Math.cos(a)*r*1.55)}" y2="${f1(y+Math.sin(a)*r*1.55)}" style="stroke:${col};stroke-width:1.2"/>`}
    return g+`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.42)}" style="fill:${col}"/></g>`};
  const HBC='var(--portal)',HCC='var(--dx)';
  /* ---- chart panels, each drawn into a rectangle R={x,y,w,h} ---- */
  function hbvBurden(R,u){const v=257.5*ease(ramp(u,0,.3));let s='';
    s+=T(R.x,R.y+20,`${v.toFixed(1)} million`,'t-big',`font-size:22px;fill:${HBC}`);
    s+=T(R.x,R.y+36,'living with hepatitis B in 2022 · 3.2% of the world');
    const rows=[['living with HBV',257.5],['eligible for treatment',83.3],['diagnosed',36.0],['on treatment',6.8]],lw=136,bm=R.w-lw-64,y0=R.y+48,rh=(R.h-50)/4;
    rows.forEach(([l,val],i)=>{const g=ease(ramp(u,.05+i*.1,.3+i*.1)),yy=y0+i*rh,bw=Math.max(2,bm*val/257.5)*g;
      s+=T(R.x,yy+rh*.62,l)+R4(R.x+lw,yy+rh*.2,bw,rh*.56,`fill:${HBC};opacity:${f1(.35+.5*(1-i/4))}`)+(g>.05?T(R.x+lw+bw+6,yy+rh*.62,`${(val*g).toFixed(1)} M`,'t-xs','fill:var(--ink)'):'')});
    return s}
  function hcvBurden(R,u){const v=56.8*ease(ramp(u,0,.3));let s='';
    s+=T(R.x,R.y+20,`${v.toFixed(1)} million`,'t-big',`font-size:22px;fill:${HCC}`);
    s+=T(R.x,R.y+36,'viraemic hepatitis C infections, 1 January 2020');
    const rows=[['viraemic, 2015',63.6],['viraemic, 2020',56.8],['diagnosed, end 2020',12.9],['began treatment, 2020',.641]],lw=136,bm=R.w-lw-64,y0=R.y+48,rh=(R.h-50)/4;
    rows.forEach(([l,val],i)=>{const g=ease(ramp(u,.05+i*.1,.3+i*.1)),yy=y0+i*rh,bw=Math.max(2,bm*val/63.6)*g;
      s+=T(R.x,yy+rh*.62,l)+R4(R.x+lw,yy+rh*.2,bw,rh*.56,`fill:${HCC};opacity:${f1(.35+.5*(1-i/4))}`)+(g>.05?T(R.x+lw+bw+6,yy+rh*.62,val<1?`${Math.round(641*g)},000`:`${(val*g).toFixed(1)} M`,'t-xs','fill:var(--ink)'):'')});
    return s}
  function hbvChronic(R,u){let s=T(R.x,R.y+14,'How often infection becomes chronic','t-lbl')+T(R.x,R.y+28,'by age at infection (AASLD 2018)');
    const B=[{v:90,txt:'90%',l:['newborn of','HBeAg+ mother']},{v:25,v2:30,txt:'25–30%',l:['infant or','child under 5']},{v:5,lt:1,txt:'under 5%',l:['adult','']}];
    const yb=R.y+R.h-26,mh=R.h-72,bw=Math.min(54,R.w/6);
    s+=`<line x1="${f1(R.x)}" x2="${f1(R.x+R.w)}" y1="${f1(yb)}" y2="${f1(yb)}" class="axis"/>`;
    B.forEach((b,i)=>{const cx=R.x+R.w*(i+.5)/3,g=ease(ramp(u,.04+i*.16,.26+i*.16)),h=mh*b.v/100*g;
      if(b.v2)s+=R4(cx-bw/2,yb-mh*b.v2/100*g,bw,mh*b.v2/100*g,`fill:${HBC};opacity:.25`);
      s+=R4(cx-bw/2,yb-h,bw,h,`fill:${HBC};opacity:${b.lt?.4:.85}`);
      if(b.lt)s+=`<line x1="${f1(cx-bw/2)}" x2="${f1(cx+bw/2)}" y1="${f1(yb-h)}" y2="${f1(yb-h)}" style="stroke:${HBC};stroke-width:1.4;stroke-dasharray:3 2"/>`;
      if(g>.02)s+=T(cx,yb-mh*(b.v2||b.v)/100*g-6,b.txt,'t-lbl t-mid',`fill:${HBC}`);
      s+=T(cx,yb+12,b.l[0],'t-xs t-mid')+T(cx,yb+22,b.l[1],'t-xs t-mid')});
    return s}
  function hbvReveal(R,u,k){let s=T(R.x,R.y+14,'Cirrhosis risk by HBV DNA (REVEAL-HBV)','t-lbl')+T(R.x,R.y+28,'relative risk, adjusted for HBeAg and ALT');
    const RR=[1,2.5,5.6,6.5],L=['<10⁴','10⁴–10⁵','10⁵–10⁶','≥10⁶'],bwR=R.w*.6,yb=R.y+R.h-24,mh=R.h-78,step=bwR/4,bw=Math.min(34,step*.6);
    s+=`<line x1="${f1(R.x)}" x2="${f1(R.x+bwR)}" y1="${f1(yb)}" y2="${f1(yb)}" class="axis"/>`;
    RR.forEach((r,i)=>{const cx=R.x+step*(i+.5),g=ease(clamp((u*5.4-i)*1.7)),h=mh*r/6.5*g,on=i===k;
      s+=R4(cx-bw/2,yb-h,bw,h,`fill:${HBC};opacity:${on?.95:.45};stroke:${on?'var(--ink)':'none'};stroke-width:1.4`);
      if(g>.05)s+=T(cx,yb-h-6,i?r.toFixed(1):'ref 1.0','t-xs t-mid',`fill:var(--ink);font-weight:${on?700:500}`);
      s+=T(cx,yb+12,L[i],'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')});
    s+=T(R.x+bwR/2,yb+22,'HBV DNA, copies/mL','t-xs t-mid');
    const rx=R.x+bwR+14,c=ramp(u,.1,.7);
    s+=T(rx,R.y+56,'cumulative cirrhosis,','t-xs')+T(rx,R.y+68,'mean 11 years:','t-xs');
    s+=T(rx,R.y+92,'4.5%','t-big',`font-size:18px;fill:${HBC};opacity:${f1(.35+.65*(1-c))}`)+T(rx+50,R.y+92,'at <300','t-xs');
    s+=T(rx,R.y+118,'36.2%','t-big',`font-size:18px;fill:${HBC};opacity:${f1(.35+.65*c)}`)+T(rx+60,R.y+118,'at ≥10⁶','t-xs');
    return s}
  const HE_ORD=(()=>{const r=rng(11),a=[...Array(96).keys()];for(let i=95;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function hbvTreat(R,u){let s=T(R.x,R.y+14,'Tenofovir DF for 5 years: repeat biopsy','t-lbl')+T(R.x,R.y+28,'96 people with cirrhosis at baseline (Ishak 5–6)');
    const n=Math.round(71*ease(ramp(u,.12,.66))),c=Math.min((R.h-48)/8,R.w*.5/12),gx=R.x,gy=R.y+40;
    for(let i=0;i<96;i++){const col=i%12,row=Math.floor(i/12),ok=HE_ORD[i]<n;
      s+=R4(gx+col*c+1,gy+row*c+1,c-2,c-2,`fill:${ok?'var(--rx)':'var(--scar-line)'};opacity:${ok?.9:.75}`,2)}
    const rx=gx+12*c+16;
    s+=T(rx,R.y+60,`${n} of 96`,'t-big','font-size:22px;fill:var(--rx)')+T(rx,R.y+76,`(${Math.round(n/96*100)}%) no longer cirrhotic`);
    s+=R4(rx,R.y+86,9,9,'fill:var(--rx)')+T(rx+14,R.y+94,'regressed')+R4(rx+76,R.y+86,9,9,'fill:var(--scar-line)')+T(rx+90,R.y+94,'still F4');
    const w=ramp(u,.5,.66);
    s+=`<g style="opacity:${f1(w)}">`+T(rx,R.y+R.h-26,'Boxed warning: stopping','t-xs','fill:var(--bad);font-weight:700')+T(rx,R.y+R.h-14,'can cause a severe flare','t-xs','fill:var(--bad);font-weight:700')+'</g>';
    return s}
  function hcvCourse(R,u){const Y=30*u,st=Math.min(4,.133*Y),fl=Math.min(4,Math.floor(st+1e-6));
    let s=T(R.x,R.y+14,`Year ${Math.round(Y)} after infection · METAVIR F${f1(st)}`,'t-lbl')+T(R.x,R.y+28,'one median path: 0.133 METAVIR units a year');
    const gap=16,bw=(R.w-4*gap)/5,by=R.y+38;
    for(let i=0;i<5;i++){const x=R.x+i*(bw+gap),on=i===fl,done=st>=i;
      s+=R4(x,by,bw,24,`fill:${done?(i===4?'var(--liver-soft)':'var(--dx-soft)'):'var(--panel-2)'};stroke:${on?(i===4?'var(--liver)':HCC):'var(--line)'};stroke-width:${on?2:1}`,6);
      s+=T(x+bw/2,by+16,`F${i}`,'t-lbl t-mid',on?`fill:${i===4?'var(--liver)':HCC}`:'');
      if(i<4)s+=T(x+bw+gap/2,by+40,['0.117','0.085','0.120','0.116'][i],'t-xs t-mid')+`<path d="M${f1(x+bw+2)} ${f1(by+12)}h${gap-4}" style="stroke:var(--muted);stroke-width:1.2" marker-end="url(#heArr)"/>`}
    s+=T(R.x,by+54,Y>29.5?'with cirrhosis: HCC 1–5% a year, decompensation 3–6%':'annual transition probabilities between stages (F4 = cirrhosis)','t-xs',Y>29.5?'fill:var(--bad)':'');
    const TY=R.y+R.h-34,x0=R.x+10,x1=R.x+R.w-10,X=v=>lerp(x0,x1,v/30);
    s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(TY)}" y2="${f1(TY)}" class="axis"/>`;
    [0,10,20,30].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(TY-3)}" y2="${f1(TY+3)}" class="axis"/>`+T(X(v),TY+12,v===30?'30 y':v,'t-xs t-mid')});
    s+=`<line x1="${f1(x0)}" x2="${f1(X(Y))}" y1="${f1(TY)}" y2="${f1(TY)}" style="stroke:${HCC};stroke-width:3"/><circle cx="${f1(X(Y))}" cy="${f1(TY)}" r="5" style="fill:${HCC};stroke:var(--panel);stroke-width:2"/>`;
    if(Y>.4)s+=T(x0,TY+24,'26% clear it early','t-xs','fill:var(--ink)');
    if(Y>=20)s+=T(X(20),TY-9,'16% cirrhosis at 20 y','t-xs t-mid','fill:var(--ink)');
    if(Y>=29.5)s+=T(x1,TY+24,'median 30 y (13–42)','t-xs t-end','fill:var(--ink)');
    return s}
  function hcvCure(R,u){const a=ramp(u,0,.35),b=ramp(u,.35,1);let s='';
    if(b<=0){s+=T(R.x,R.y+14,'Direct-acting antivirals: cure (SVR12)','t-lbl');
      s+=T(R.x,R.y+66,`${Math.round(99*ease(a))}%`,'t-big',`font-size:40px;fill:var(--rx)`);
      const lx=R.x+(R.w>420?110:96);
      [['ASTRAL-1: sofosbuvir–velpatasvir,','12 weeks: 99%'],['EXPEDITION-1: glecaprevir–','pibrentasvir, compensated: 99%'],['ASTRAL-4, decompensated:','83–94%']].forEach((l,i)=>{const o=ramp(a,.2+i*.25,.45+i*.25);s+=`<g style="opacity:${f1(o)}">`+T(lx,R.y+42+i*34,l[0],'t-xs')+T(lx,R.y+54+i*34,l[1],'t-xs','fill:var(--ink)')+'</g>'});
      s+=T(R.x,R.y+90,'SVR12, trials','t-xs');
      return s}
    s+=T(R.x,R.y+14,'10 years later: cured (SVR) vs not','t-lbl')+T(R.x,R.y+28,'n=530, interferon era, advanced fibrosis');
    const lg=R.x+R.w-96;s+=R4(lg,R.y+20,9,9,'fill:var(--muted);opacity:.6')+T(lg+13,R.y+28,'no SVR')+R4(lg+56,R.y+20,9,9,'fill:var(--rx)')+T(lg+69,R.y+28,'SVR');
    const rows=[['death, any cause',26.0,8.9],['liver cancer (HCC)',21.8,5.1],['liver failure',29.9,2.1]],lw=116,bm=R.w-lw-44,y0=R.y+38,rh=(R.h-38-20)/3;
    rows.forEach(([l,n0,n1],i)=>{const g=ease(ramp(b,i*.12,.4+i*.12)),yy=y0+i*rh,bh=Math.min(10,rh*.32);
      s+=T(R.x,yy+bh+4,l,'t-xs','fill:var(--ink)');
      s+=R4(R.x+lw,yy,bm*n0/30*g,bh,'fill:var(--muted);opacity:.55')+R4(R.x+lw,yy+bh+2,bm*n1/30*g,bh,'fill:var(--rx)');
      if(g>.1)s+=T(R.x+lw+bm*n0/30*g+4,yy+bh-1,`${(n0*g).toFixed(1)}%`)+T(R.x+lw+bm*n1/30*g+4,yy+2*bh+1,`${(n1*g).toFixed(1)}%`,'t-xs','fill:var(--rx)')});
    s+=T(R.x,R.y+R.h-3,'with cirrhosis after DAA cure: HCC 1.82 /100 person-years','t-xs',`fill:var(--bad);opacity:${f1(ramp(b,.5,.75))}`);
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 700'),p=phaseOf(S,t);
    const U=i=>ramp(t,S[i].from,i+1<S.length?S[i+1].from:1);
    const lanes=N?[{y:6,h:340},{y:354,h:340}]:[{y:8,h:178},{y:194,h:178}],bx=N?6:8,bw=N?388:704;
    const act=[p<=3,p===0||p>=4];
    /* hepatitis B state */
    const hb={fib:1,reg:0,load:.6,pill:0,st:'',k:0};
    if(p===0)hb.st='often mother → baby at birth';
    else if(p===1)hb.st='age at infection decides';
    else if(p===2){const u=U(2);hb.k=clamp(Math.floor(u*5.4),0,3);hb.fib=1+3*ease(u);hb.load=.3+.7*u;hb.st=`HBV DNA ${['<10⁴','10⁴–10⁵','10⁵–10⁶','≥10⁶'][hb.k]} copies/mL`}
    else{const u=p===3?U(3):1;hb.fib=4;hb.reg=.9*ease(u);hb.load=lerp(1,.06,ease(ramp(u,0,.45)));hb.pill=ramp(u,0,.12);hb.st=u<.15?'antiviral tablets start':'virus suppressed, scar recedes'}
    /* hepatitis C state */
    const hc={fib:.5,reg:0,load:.7,pill:0,badge:0,st:''},Y=p===4?30*U(4):p>4?30:0;
    if(p===0)hc.st='spreads blood to blood';
    else if(p<4)hc.st='chronic, slowly scarring';
    else if(p===4){hc.fib=Math.max(.5,Math.min(4,.133*Y));hc.st=`year ${Math.round(Y)} · stage F${f1(Math.min(4,.133*Y))}`}
    else{const u=U(5),a=ramp(u,0,.35),b=ramp(u,.35,1);hc.fib=4;hc.load=.7*(1-a);hc.reg=.6*b;hc.pill=b<1?1-ramp(b,0,.3):0;hc.badge=ramp(b,0,.3);hc.st=a<1?'DAA tablets, 8–12 weeks':'cured: HCC checks continue'}
    let s=`<defs>${marker('heArr','var(--muted)')}</defs>`;
    [hb,hc].forEach((L,li)=>{const ln=lanes[li],col=li?HCC:HBC,on=act[li];
      s+=`<rect x="${bx}" y="${ln.y}" width="${bw}" height="${ln.h}" rx="12" style="fill:var(--field);stroke:${on?col:'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=T(bx+14,ln.y+22,li?'HEPATITIS C':'HEPATITIS B','t-lbl',`fill:${col};letter-spacing:.06em`);
      const sub=li?['curable with 8–12','weeks of tablets']:['vaccine-preventable;','treatable, rarely cleared'];
      s+=N?T(bx+14,ln.y+36,sub.join(' ')):T(bx+14,ln.y+36,sub[0])+T(bx+14,ln.y+48,sub[1]);
      const lx=N?100:112,ly=ln.y+(N?98:102),ls=.6;
      s+=`<g style="opacity:${on?1:.6}">`+liver(lx,ly,ls,{fib:L.fib,regress:L.reg,gb:false,seed:li?13:7}).svg;
      const n=Math.round(clamp(L.load)*16);
      for(let i=0;i<16;i++){const a=i/16*6.283+t*(li?-7:7)+li,rx=68,ry=42,op=i<n?1:0;if(!op)continue;
        s+=vir(lx+Math.cos(a)*rx,ly+Math.sin(a)*ry,3.4,col,.9)}
      if(L.pill>0)s+=`<g style="opacity:${f1(L.pill)}">`+pill(lx+56,ly-30,24,{ang:-24})+'</g>';
      if(L.badge>0)s+=`<g style="opacity:${f1(L.badge)}"><circle cx="${f1(lx-54)}" cy="${f1(ly-28)}" r="8" style="fill:var(--panel);stroke:var(--accent);stroke-width:2"/><line x1="${f1(lx-48)}" y1="${f1(ly-22)}" x2="${f1(lx-42)}" y2="${f1(ly-16)}" style="stroke:var(--accent);stroke-width:2.6;stroke-linecap:round"/></g>`;
      s+='</g>';
      if(N)s+=T(190,ln.y+72,L.st,'t-xs','fill:var(--ink);font-weight:700');
      else s+=T(lx,ln.y+ln.h-10,L.st,'t-xs t-mid','fill:var(--ink);font-weight:700');
      const R=N?{x:bx+14,y:ln.y+150,w:bw-28,h:ln.h-160}:{x:214,y:ln.y+14,w:486,h:ln.h-24};
      let c='';
      if(li===0){if(p===0)c=hbvBurden(R,U(0));else if(p===1)c=hbvChronic(R,U(1));else if(p===2)c=hbvReveal(R,U(2),hb.k);else if(p===3)c=hbvTreat(R,U(3));else c=`<g style="opacity:.3">${hbvTreat(R,1)}</g>`}
      else{if(p===0)c=hcvBurden(R,U(0));else if(p<4)c=`<g style="opacity:.3">${hcvBurden(R,1)}</g>`;else if(p===4)c=hcvCourse(R,U(4));else c=hcvCure(R,U(5))}
      s+=c});
    svg.innerHTML=s;
    setSt(p);
    $('#heRead').innerHTML=`<span>hepatitis B <b>${hb.st}</b></span><span>hepatitis C <b>${hc.st}</b></span>`;
    $('#heNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#hePlay'),draw,30000,'%t:player.replay%','hepatitis');
  const setSt=stepWire($('#heSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- cure rates icon array ---- */
  const cs=$('#heCure');let sel=2,stopC=null;
  function drawCure(pr){const N=vb(cs,'720 300','400 590'),o=HE_CURE[sel],n=Math.round(o.v*pr);let s='';
    const ax=N?50:24,ay=N?20:22,c=N?30:24;
    for(let i=0;i<100;i++){const col=i%10,row=Math.floor(i/10),cured=i<n;
      s+=person(ax+col*c+c/2,ay+row*c+2,c*.82,cured?o.col:'var(--panel-2)',{op:cured?1:.9})}
    const ty=ay+10*c+(N?24:22);
    s+=T(ax,ty,`${n} in 100`,'t-big',`font-size:20px;fill:${o.col==='var(--muted)'?'var(--ink)':o.col}`)+T(ax+(N?104:100),ty,sel?'reached SVR (cure)':'cleared it without treatment','t-xs');
    const bx=N?20:330,by=N?ty+30:36,bw=N?360:370,rh=N?40:46,lw=N?0:0;
    s+=T(bx,by-10,'cure (or clearance) rate, as published','t-sm');
    HE_CURE.forEach((q,i)=>{const yy=by+i*rh,on=i===sel,L=(bw-46)*q.v/100*(on?pr:1);
      s+=T(bx+lw,yy+12,q.short,'t-xs',on?'fill:var(--ink);font-weight:700':'');
      s+=R4(bx+lw,yy+18,bw-46,12,'fill:var(--panel-2)',3)+R4(bx+lw,yy+18,L,12,`fill:${q.col};opacity:${on?1:.45}`,3);
      s+=T(bx+lw+L+6,yy+28,q.v+'%','t-xs','fill:var(--ink)')});
    cs.innerHTML=s;$('#heCureNote').innerHTML=`<div class="kicker">${o.lab}</div><h4>${o.v}% ${sel?'reached SVR':'cleared spontaneously'}</h4><p>${o.txt}</p>`}
  function pick(i){sel=i;$$('[data-cure]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cure===i));stopC&&stopC();stopC=animate(900,p=>drawCure(ease(p)),()=>{stopC=null})}
  $$('[data-cure]').forEach(b=>b.addEventListener('click',()=>pick(+b.dataset.cure)));
  drawCure(1);
  const prevR=redraws.hepatitis;redraws.hepatitis=()=>{prevR&&prevR();drawCure(1);drawTw()};

  /* ---- Taiwan vaccine mini chart ---- */
  const tw=$('#heTw');
  function drawTw(){const D=[['1981–86',.70],['1986–90',.57],['1990–94',.36]];let s='';const yb=96,mh=70;
    D.forEach(([l,v],i)=>{const x=24+i*88,h=mh*v/.7;s+=R4(x,yb-h,46,h,`fill:${HBC};opacity:${f1(.9-i*.2)}`)+T(x+23,yb-h-5,v.toFixed(2),'t-xs t-mid','fill:var(--ink);font-weight:700')+T(x+23,yb+13,l,'t-xs t-mid')});
    s+=`<line x1="14" x2="290" y1="${yb}" y2="${yb}" class="axis"/>`;
    tw.innerHTML=s}
  drawTw();
};
