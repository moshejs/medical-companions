/* =============== 5.3 Sepsis in pregnancy and after birth =============== */
const MT_STEPS=[
 {from:0,at:.12,k:'Step 1 · a new baseline',t:'Pregnancy changes the numbers',
  txt:`In normal pregnancy, systemic vascular resistance falls by 25–30%, cardiac output rises by about 40% and the heart rate rises by 10–20 beats per minute. Blood pressure falls in the first and second trimesters and returns to non-pregnant levels in the third. Minute ventilation rises by 40–50%, mainly through larger breaths, giving a mild compensated respiratory alkalosis. [[SomaPillay2016]]`,
  pt:`During pregnancy the heart beats faster, more blood is pumped and breathing gets deeper. This is normal and healthy.`,
  hook:`Pregnancy: heart rate +10–20 bpm, cardiac output +40%, SVR −25–30%, minute ventilation +40–50%. [[SomaPillay2016]]`},
 {from:.2,at:.32,k:'Step 2 · the overlap',t:'Early sepsis pushes the same way',
  txt:`These normal changes overlap with early signs of sepsis: a fast heart rate, lower blood pressure and faster breathing. That is why obstetric-specific thresholds and scores were developed. SMFM 2023 recommends considering sepsis in pregnant or postpartum patients with otherwise unexplained end-organ damage and a suspected or confirmed infection "regardless of the presence of fever" (GRADE 1C). [[Albright2014SOS,SomaPillay2016,SMFM2023Sepsis]]`,
  pt:`Because pregnancy already changes heart rate, breathing and blood pressure, the warning signs of sepsis can be easier to miss. Feeling very unwell with or without a fever, during pregnancy or after birth, needs urgent help.`,
  hook:`Fever is not required: SMFM 2023 says consider sepsis "regardless of the presence of fever". [[SMFM2023Sepsis]]`},
 {from:.4,at:.52,k:'Step 3 · blood tests',t:'The lab ranges move too',
  txt:`Plasma volume rises by about 50% by 34 weeks, so haemoglobin falls. In 5–10% of women, platelets fall to 100–150 × 10⁹/L by term with no disease present. Arterial pH is about 7.44 and serum bicarbonate 18–22 mmol/L because of the compensated respiratory alkalosis. [[SomaPillay2016]]`,
  pt:`Some blood test results are different in pregnancy, so the team reads them against pregnancy ranges.`},
 {from:.6,at:.72,k:'Step 4 · warning charts',t:'MEOWS: good at ruling out',
  txt:`MEOWS, recommended for all obstetric inpatients by the UK 2003–05 enquiry, was 89% sensitive and 79% specific in 676 consecutive admissions, with a PPV of 39% and NPV of 98% for morbidity. A GLOSS analysis of 21 early warning systems in 2,560 women found that "no score demonstrated enough diagnostic accuracy to be used alone to identify sepsis". [[Singh2012MEOWS,Chimwaza2025EWS]]`,
  pt:`Warning charts help staff notice when someone is getting sicker. No single score is perfect, and they are not for checking yourself at home.`,
  hook:`MEOWS: sensitivity 89%, specificity 79%, PPV 39%, NPV 98%. [[Singh2012MEOWS]]`},
 {from:.8,at:.9,k:'Step 5 · group A streptococcus',t:'It can move in hours',
  txt:`In the UK case-control study, for 50% of women with group A streptococcal (GAS) infection less than 2 hours passed between the first sign of a systemic inflammatory response and a diagnosis of severe sepsis; for 75% it was less than 9 hours. GAS was associated with progression to septic shock (aOR 4.84). Postpartum women had invasive GAS at 0.56 per 1,000 woman-years, against 0.019 in non-pregnant women. [[Acosta2014UK,Deutscher2011Strep]]`,
  pt:`After giving birth, a person has a much higher risk of a serious strep infection, and it can get worse within hours. Get urgent help if someone becomes very unwell.`,
  hook:`GAS: half progressed to severe sepsis in under 2 h; postpartum invasive GAS about 20-fold higher. [[Acosta2014UK,Deutscher2011Strep]]`}];
const MT_TR=[
 {n:'Heart rate',v:'+10–20 bpm',d:1,l:.32,s:'faster'},
 {n:'Breathing (minute ventilation)',v:'+40–50%',d:1,l:.45,s:'faster'},
 {n:'Blood pressure',v:'lower in trimesters 1–2',d:-1,l:.3,s:'lower'},
 {n:'Vascular resistance',v:'−25–30%',d:-1,l:.28},
 {n:'Cardiac output',v:'about +40%',d:1,l:.4}];
const MT_CAP=[
 ['Normal pregnancy shifts the baseline (green bars)','Heart rate, breathing and cardiac output rise; resistance and blood pressure fall','Bar lengths schematic; values as published (Soma-Pillay 2016)'],
 ['Ember arrows: the direction early sepsis pushes the same signs','Faster heart rate, faster breathing, lower blood pressure','The signals overlap, so sepsis can hide'],
 ['Blood tests shift too (Soma-Pillay 2016)','Plasma volume +50% by 34 weeks · platelets 100–150 in 5–10% at term','Bicarbonate 18–22 mmol/L · arterial pH about 7.44'],
 ['MEOWS in 676 consecutive obstetric admissions (Singh 2012)','Of 100 flagged, about 39 had morbidity · of 100 not flagged, about 98 did not','A GLOSS analysis: no score accurate enough to be used alone'],
 ['UKOSS 2011–12: time from first sign of systemic inflammation to severe sepsis','Group A strep: under 2 h for half of women, under 9 h for three quarters','"should be regarded as an obstetric emergency" (Acosta 2014)']];
const MB_STEPS=[
 {from:0,at:.2,k:'Worldwide · 2003–09',t:'A leading cause of maternal death',
  txt:`WHO's systematic analysis of 60,799 maternal deaths attributed 10.7% (95% UI 5.9–18.6%) of maternal deaths worldwide to sepsis, about 261,000 deaths, behind haemorrhage (27.1%) and hypertensive disorders (14.0%). [[Say2014Causes]]`,
  pt:`Around the world, sepsis is one of the three main direct causes of death in pregnancy and after birth. These are population figures, not a prediction for any one pregnancy.`},
 {from:.34,at:.54,k:'GLOSS · 52 countries',t:'How often infection happens',
  txt:`The GLOSS 1-week inception cohort (2017; 713 facilities in 52 countries; 2,850 women) found 70.4 hospitalised women per 1,000 live births had a maternal infection, and 10.9 per 1,000 had infection-related severe maternal outcomes (death or near-miss). Ratios were highest in low- and middle-income countries. [[GLOSS2020]]`,
  pt:`Infection around pregnancy is common in hospitals worldwide, and most women recover. A small share become seriously ill.`},
 {from:.67,at:.85,k:'UK · 2011–12',t:'For each death, many near-misses',
  txt:`The UKOSS case-control study found severe maternal sepsis in 4.7 per 10,000 maternities; 19.5% developed septic shock and 1.4% (5 women) died. The authors estimated that for each maternal sepsis death about 50 women have life-threatening sepsis illness. [[Acosta2014UK]]`,
  pt:`Deaths from maternal sepsis are rare in the UK, but many more women become very ill and recover, which is why early recognition matters.`}];
const MB_CAUSE=[['Haemorrhage',27.1],['Hypertensive disorders',14.0],['Sepsis',10.7]];
const MV_D={
 anode:{n:'ANODE',w:'3,427 UK women after operative (assisted) vaginal birth',out:'confirmed or suspected infection',per:100,a:['without the dose',19],b:['one IV dose of amoxicillin-clavulanate',11],rr:'RR 0.58 (0.49–0.69)',src:`[[Knight2019ANODE]]`,
   more:`A single intravenous dose of amoxicillin-clavulanate after operative vaginal birth lowered confirmed or suspected infection from 19% to 11%.`},
 csoap:{n:'C/SOAP',w:'2,013 women having a non-elective caesarean',out:'endometritis, wound or other infection',per:100,a:['standard prophylaxis',12.0],b:['standard + azithromycin',6.1],rr:'RR 0.51 (0.38–0.68)',src:`[[Tita2016CSOAP]]`,
   more:`Adding azithromycin to standard antibiotic prophylaxis halved post-caesarean infection, from 12.0% to 6.1%.`},
 aplus:{n:'A-PLUS',w:'29,278 women in labour, 8 countries',out:'maternal sepsis or death',per:1000,a:['without the dose',24],b:['single oral 2-g azithromycin',16],rr:'RR 0.67 (0.56–0.79)',src:`[[Tita2023APLUS]]`,
   more:`A single oral 2-g dose of azithromycin in labour lowered maternal sepsis or death from 2.4% to 1.6%. It did not change stillbirth, neonatal death or neonatal sepsis (10.5% vs 10.3%).`}};
inits.maternal=()=>{
  /* ---- 1. why pregnancy hides sepsis ---- */
  const svg=$('#mtSvg'),rg=$('#mtT');
  function tracks(B,t,p,lp,N){let s='';const lw=N?0:186,x0=B.x+12+lw,x1=N?B.x+B.w-12:B.x+(p===2?470:B.w*.66),cx=(x0+x1)/2,hw=(x1-x0)/2,rh=N?54:46,y0=B.y+(N?28:30);
    s+=`<text x="${f1(cx)}" y="${B.y+16}" class="t-xs t-mid" style="fill:var(--ink)">not pregnant</text>`;
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${B.y+20}" y2="${f1(y0+MT_TR.length*rh-12)}" style="stroke:var(--ink);stroke-dasharray:3 3;opacity:.5"/>`;
    MT_TR.forEach((T,i)=>{const y=y0+i*rh+(N?14:0),g=ease(ramp(t,.02+i*.03,.1+i*.03)),bl=hw*T.l*g,be=cx+T.d*bl;
      s+=N?`<text x="${x0}" y="${y-6}" class="t-xs" style="fill:var(--ink);font-weight:600">${T.n}</text>`:`<text x="${x0-10}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink)">${T.n}</text>`;
      s+=`<rect x="${f1(x0)}" y="${y+2}" width="${f1(x1-x0)}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${f1(Math.min(cx,be))}" y="${y+2}" width="${f1(bl)}" height="14" rx="4" style="fill:var(--rec);opacity:.8"/>`;
      s+=`<text x="${f1(T.d>0?be+6:cx+6)}" y="${y+13}" class="t-xs" style="fill:var(--rec);font-weight:700;opacity:${f1(g)}">${T.v}</text>`;
      if(T.s&&p>=1){const a=ease(ramp(t,.22+i*.03,.3+i*.03)),ae=be+T.d*hw*.42*a,yy=y+(N?26:28);
        s+=`<rect x="${f1(Math.min(cx,ae))}" y="${y+2}" width="${f1(Math.abs(ae-cx))}" height="14" rx="4" style="fill:var(--accent);opacity:${f1(.14*a)}"/>`;
        s+=`<path d="M${f1(cx)} ${yy}H${f1(ae)}" style="stroke:var(--accent);stroke-width:2.4;opacity:${f1(a)}" marker-end="url(#mtAr)"/>`;
        s+=`<text x="${f1(N?(T.d>0?cx+4:cx-4):(T.d>0?ae+8:ae-8))}" y="${N?yy+12:yy+3}" class="t-xs${T.d>0?'':' t-end'}" style="fill:var(--accent);font-weight:700;opacity:${f1(a)}">sepsis: ${T.s}</text>`}});
    return s}
  function draw(t){const N=vb(svg,'720 380','400 620'),p=phaseOf(MT_STEPS,t),st=MT_STEPS[p],nx=p<4?MT_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    const B=N?{x:12,y:12,w:376,h:446}:{x:12,y:12,w:696,h:262},K=N?{x:12,y:468,w:376,h:142}:{x:12,y:282,w:696,h:90};
    let s=`<defs>${marker('mtAr','var(--accent)')}</defs><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    if(p<=2){s+=tracks(B,t,p,lp,N);
      const R=N?{x:B.x+12,y:B.y+300,w:B.w-24,h:136}:{x:p===2?B.x+486:B.x+B.w*.7,y:B.y+20,w:p===2?B.w-498:B.w*.28,h:B.h-40};
      if(p<2){const ph=t*60,hr=1+.06*Math.sin(ph*(p?1.6:1.25)),lr=1+.05*Math.sin(ph*.5*(p?1.4:1.15)),cxx=R.x+R.w/2;
        s+=organ('heart',N?cxx-70:cxx,N?R.y+60:R.y+70,(N?50:56)*hr,{label:'heart: beats faster',glow:p?.4:0});
        s+=organ('lung',N?cxx+70:cxx,N?R.y+60:R.y+170,(N?60:70)*lr,{label:'lungs: bigger breaths',glow:p?.4:0})}
      else{const L=[['Plasma volume','+50% by 34 weeks','haemoglobin falls'],['Platelets','100–150 ×10⁹/L','in 5–10% at term'],['Bicarbonate','18–22 mmol/L','pH about 7.44']];
        L.forEach((c,j)=>{const g=ease(ramp(lp,.1+j*.2,.3+j*.2)),bw=N?(R.w-12)/3:R.w,bh=N?R.h-10:(R.h-20)/3,bx=N?R.x+j*(bw+6):R.x,by=N?R.y:R.y+j*(bh+10);
          s+=`<g style="opacity:${f1(g)}"><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" rx="10" style="fill:var(--rec-soft);stroke:var(--rec)"/>`;
          s+=`<text x="${f1(bx+10)}" y="${f1(by+20)}" class="t-lbl" style="font-size:12px;fill:var(--rec)">${c[0]}</text><text x="${f1(bx+10)}" y="${f1(by+40)}" class="t-sm" style="fill:var(--ink)">${c[1]}</text><text x="${f1(bx+10)}" y="${f1(by+56)}" class="t-xs">${c[2]}</text></g>`})}}
    else if(p===3){const sz=N?13:14,gp=N?3:4,gw=10*(sz+gp);
      [['Flagged by MEOWS',39,'had morbidity (PPV 39%)','var(--bad)'],['Not flagged',98,'had no morbidity (NPV 98%)','var(--good)']].forEach(([h,k,l,c],j)=>{
        const x=N?B.x+(B.w-gw)/2:B.x+70+j*330,y=N?B.y+44+j*200:B.y+50,kk=Math.round(k*ease(ramp(lp,.05+j*.3,.35+j*.3)));
        s+=`<text x="${x}" y="${y-22}" class="t-lbl" style="fill:${c}">${h}</text><text x="${x}" y="${y-8}" class="t-xs">${k} of 100 ${l}</text>`;
        s+=icons(x,y,{n:100,cols:10,k:kk,size:sz,gap:gp,col:c,shape:'dot'}).svg});
      s+=`<text x="${B.x+B.w/2}" y="${B.y+B.h-10}" class="t-xs t-mid">sensitivity 89% · specificity 79% · 676 admissions</text>`}
    else{const ax=B.x+(N?24:60),aw=B.w-(N?48:120),ay=B.y+(N?120:110),X=v=>ax+aw*v/12;
      s+=tline(ax,ay,aw,{min:0,max:12,step:N?3:2,fmt:v=>v+' h',label:'hours from the first sign of systemic inflammation'}).svg;
      [[2,'half of women: under 2 h',ay-56,'var(--bad)'],[9,'three quarters: under 9 h',ay-28,'var(--warn)']].forEach(([h,l,y,c],j)=>{const g=ease(ramp(lp,.08+j*.25,.3+j*.25));
        s+=`<rect x="${f1(ax)}" y="${y}" width="${f1((X(h)-ax)*g)}" height="16" rx="4" style="fill:${c};opacity:.8"/><text x="${f1(ax+4)}" y="${y-5}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(g)}">${l}</text>`});
      const iy=ay+(N?60:52),ix=ax,iw=aw*(N?.7:.55),IX=v=>ix+iw*v/.6,g=ease(ramp(lp,.6,.85));
      s+=`<text x="${ix}" y="${iy}" class="t-xs" style="fill:var(--ink);font-weight:600">invasive GAS per 1,000 woman-years (US 2007–09)</text>`;
      [['postpartum',.56,'var(--bad)'],['not pregnant',.019,'var(--muted)']].forEach(([l,v,c],j)=>{const y=iy+12+j*24;
        s+=`<rect x="${ix}" y="${y}" width="${f1(Math.max(2,(IX(v)-ix)*g))}" height="14" rx="3" style="fill:${c}"/><text x="${f1(ix+Math.max(2,(IX(v)-ix)*g)+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${v} ${l}</text>`})}
    s+=`<rect x="${K.x}" y="${K.y}" width="${K.w}" height="${K.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    MT_CAP[p].forEach((l,j)=>{if(N){mtWrap(l,62).forEach((ll,q)=>{s+=`<text x="${K.x+12}" y="${K.y+22+j*42+q*14}" class="t-xs" style="${j===0?'fill:var(--ink);font-weight:600':''}">${ll}</text>`})}
      else s+=`<text x="${K.x+12}" y="${K.y+22+j*24}" class="t-sm" style="${j===0?'fill:var(--ink);font-weight:600':''}">${l}</text>`});
    svg.innerHTML=s;setSt(p);$('#mtNote').innerHTML=noteHTML(st)}
  const stop=playWire(rg,$('#mtPlay'),draw,28000,'%t:player.replay%','maternal');
  const setSt=stepWire($('#mtSteps'),MT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. burden ---- */
  const bs=$('#mbSvg'),brg=$('#mbT');
  function drawB(t){const N=vb(bs,'720 300','400 440'),p=phaseOf(MB_STEPS,t),st=MB_STEPS[p],nx=p<2?MB_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    const B=N?{x:12,y:12,w:376,h:416}:{x:12,y:12,w:696,h:276};let s=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    if(p===0){const bx=B.x+(N?16:200),bw=B.w-(N?40:260),X=v=>bx+bw*v/30;
      s+=`<text x="${B.x+16}" y="${B.y+26}" class="t-lbl">Share of maternal deaths worldwide, 2003–09 (WHO)</text>`;
      MB_CAUSE.forEach(([l,v],i)=>{const y=B.y+(N?60+i*70:64+i*58),g=ease(ramp(lp,.05+i*.2,.3+i*.2)),c=i===2?'var(--accent)':'var(--muted)';
        s+=N?`<text x="${bx}" y="${y-6}" class="t-sm" style="fill:var(--ink)">${l}</text>`:`<text x="${bx-10}" y="${y+16}" class="t-sm t-end" style="fill:var(--ink)">${l}</text>`;
        s+=`<rect x="${bx}" y="${y}" width="${f1((X(v)-bx)*g)}" height="24" rx="5" style="fill:${c}"/><text x="${f1(bx+(X(v)-bx)*g+8)}" y="${y+17}" class="t-lbl" style="opacity:${f1(g)}">${v}%</text>`});
      s+=`<text x="${B.x+16}" y="${B.y+B.h-12}" class="t-xs">60,799 maternal deaths analysed (Say 2014)</text>`}
    else if(p===1){const sz=N?6.2:5.4,gp=N?2.5:2.3,cols=N?40:50,gx=B.x+(N?12:20),gy=B.y+(N?92:52),k1=Math.round(70*ease(ramp(lp,.05,.45)));
      const G=icons(gx,gy,{n:1000,cols,k:k1,size:sz,gap:gp,col:'var(--warn)',shape:'dot'});s+=G.svg;
      const k2=Math.round(11*ease(ramp(lp,.5,.75)));for(let i=0;i<k2;i++){const a=G.at(i);s+=`<circle cx="${f1(a[0]+sz/2)}" cy="${f1(a[1]+sz/2)}" r="${f1(sz*.46)}" style="fill:var(--bad)"/>`}
      const tx=N?B.x+12:gx+cols*(sz+gp)+20,ty=N?B.y+24:B.y+60;
      [['1,000 dots = 1,000 live births','var(--ink)'],['70.4 hospitalised women with a maternal infection','var(--warn)'],['10.9 with infection-related death or near-miss','var(--bad)']].forEach(([l,c],j)=>{
        if(N)s+=`<text x="${tx}" y="${ty+j*20}" class="t-xs" style="fill:${c};font-weight:700">${l}</text>`;
        else mtWrap(l,24).forEach((ll,q)=>{s+=`<text x="${tx}" y="${ty+j*56+q*14}" class="t-sm" style="fill:${c};font-weight:600">${ll}</text>`})});
      s+=`<text x="${N?B.x+12:tx}" y="${B.y+B.h-12}" class="t-xs">GLOSS 2017: 713 facilities, 52 countries</text>`}
    else{const cols=N?10:17,sz=N?20:22,gp=N?10:12,gx=B.x+(N?24:30),gy=B.y+(N?60:50),k=Math.round(50*ease(ramp(lp,.15,.7)));
      s+=person(gx+sz/2,gy,sz,'var(--bad)');
      for(let i=0;i<k;i++){const j=i+1,x=gx+(j%cols)*(sz+gp)+sz/2,y=gy+Math.floor(j/cols)*(sz+gp*1.4);s+=person(x,y,sz,'var(--warn)',{op:.75})}
      const ty=N?B.y+300:B.y+190;
      s+=`<text x="${B.x+20}" y="${B.y+30}" class="t-lbl">UK 2011–12: for each maternal sepsis death (dark)</text>`;
      s+=`<text x="${B.x+20}" y="${ty}" class="t-sm" style="fill:var(--ink)">about 50 women have life-threatening sepsis illness</text>`;
      s+=`<text x="${B.x+20}" y="${ty+20}" class="t-xs">severe maternal sepsis: 4.7 per 10,000 maternities · 19.5% septic shock</text>`;
      s+=`<text x="${B.x+20}" y="${ty+36}" class="t-xs">CMACE 2006–08: sepsis deaths rose 0.85 → 1.13 per 100,000</text>`}
    bs.innerHTML=s;setB(p);$('#mbNote').innerHTML=noteHTML(st)}
  const stopB=playWire(brg,$('#mbPlay'),drawB,18000,'%t:player.replay%','maternal');
  const setB=stepWire($('#mbSteps'),MB_STEPS,brg,drawB,stopB);
  drawB(+brg.value);

  /* ---- 3. prevention trials ---- */
  const vs=$('#mvSvg'),pick=$('#mvPick');let mv='anode',mvA=null;
  function drawV(u){const D=MV_D[mv],N=vb(vs,'720 290','400 490'),big=D.per===1000;
    const sz=big?(N?5.4:4.6):(N?13:14),gp=big?(N?2.6:2):(N?3:4),cols=big?40:10,gw=cols*(sz+gp);let s='';
    [D.a,D.b].forEach(([lab,v],j)=>{const x=N?12+(376-gw)/2:(j?380:40)+(320-gw)/2,y=N?76+j*214:84,k=Math.round(v*ease(clamp(u*1.4-j*.3)));
      s+=`<text x="${N?12:j?380:40}" y="${y-36}" class="t-lbl" style="fill:${j?'var(--rec)':'var(--muted)'}">${v}${big?' per 1,000':' per 100'}</text><text x="${N?12:j?380:40}" y="${y-20}" class="t-xs">${lab}</text>`;
      s+=icons(x,y,{n:D.per,cols,k,size:sz,gap:gp,col:j?'var(--rec)':'var(--bad)',shape:'dot'}).svg});
    s+=`<text x="${N?12:40}" y="16" class="t-xs" style="fill:var(--ink);font-weight:700">${D.n}: ${D.out}</text>`;
    vs.innerHTML=s;
    $('#mvNote').innerHTML=`<div class="kicker">${D.n} · randomised trial</div><h4>${D.out[0].toUpperCase()+D.out.slice(1)}: ${D.a[1]} vs ${D.b[1]} ${big?'per 1,000':'per 100'}</h4>
      <p>${D.w}. ${D.more} ${D.rr}. Interventions and doses are quoted as published, not as advice. ${D.src}</p>
      <div class="pt"><b>%t:note.plain%</b>Trials like this test whether one antibiotic dose at the right moment prevents infection in large groups of women. Whether it applies to you is a question for your maternity team.</div>`}
  pick.addEventListener('click',e=>{const b=e.target.closest('[data-mv]');if(!b)return;mv=b.dataset.mv;$$('[data-mv]',pick).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(mvA)mvA();mvA=RM?null:animate(900,drawV,()=>{mvA=null});if(RM)drawV(1)});
  drawV(1);
  {const pr=redraws.maternal;redraws.maternal=()=>{pr&&pr();drawV(1)}}
};
function mtWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L}
