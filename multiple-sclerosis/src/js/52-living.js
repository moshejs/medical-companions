/* =============== 5.2 living with MS =============== */
/* time segments of the pregnancy timeline: t0/t1 = their share of the timeline (both layouts), ww/wn = drawn width share */
const LW_SEG=[
 {n:'year before',ns:'Pre',t0:0,t1:.30,ww:.27,wn:.22},
 {n:'1st trim.',ns:'T1',t0:.30,t1:.42,ww:.12,wn:.13},
 {n:'2nd trim.',ns:'T2',t0:.42,t1:.54,ww:.12,wn:.13},
 {n:'3rd trim.',ns:'T3',t0:.54,t1:.66,ww:.12,wn:.13},
 {n:'0–3 mo after',ns:'0–3 mo',t0:.66,t1:.80,ww:.16,wn:.18},
 {n:'3–12 mo after',ns:'3–12 mo',t0:.80,t1:1,ww:.21,wn:.21}];
const LW_PRIMS=[.7,.5,.6,.2,1.2,.7];
const LW_CMP={kaiser:{n:'Kaiser',c:'var(--rx)',v:[.37,null,null,null,.27,null],band:[.07,.14],cell:['0.37','0.14–0.07 across pregnancy','','','0.27','']},
              msbase:{n:'MSBase',c:'var(--gold)',v:[.32,null,null,.13,.61,null],cell:['0.32','—','—','0.13','0.61','—']}};
const LW_STEPS=[
 {from:0,at:.2,k:'Before pregnancy',t:'The year before',
  txt:`PRIMS followed 254 women through 269 pregnancies in 12 European countries. In the year before pregnancy their annualised relapse rate was 0.7. More recent cohorts started lower: 0.37 in Kaiser Permanente (2008–2016) and 0.32 in MSBase. [[Confavreux1998,LangerGould2020,Hughes2014]] NICE NG220 asks clinicians to explain that MS should not stop people planning a family, and mentions vitamin D and folic acid before and during pregnancy. [[NICE2022]]`,
  pt:'Having MS is not, on its own, a reason not to have children. Which medicines to stop, and when, is a separate planning question.'},
 {from:.30,at:.47,k:'Pregnancy',t:'Relapses start to fall',
  txt:`In PRIMS the rate was 0.5 in the first trimester and 0.6 in the second. In the Kaiser cohort it fell from 0.37 before pregnancy to between 0.14 and 0.07 during pregnancy. [[Confavreux1998,LangerGould2020]]`,
  pt:'Pregnancy is usually a quieter time for MS relapses.'},
 {from:.54,at:.62,k:'Pregnancy',t:'Third trimester: the lowest point',
  txt:`PRIMS: 0.2 in the third trimester (P<0.001), about 70% below the year before (0.2 vs 0.7, arithmetic). MSBase: 0.13 in the third trimester. [[Confavreux1998,Hughes2014]]`,
  hook:'PRIMS shape to remember: 0.7 before → 0.5, 0.6, 0.2 by trimester → 1.2 in the first 3 months after birth → back to 0.7.'},
 {from:.66,at:.76,k:'After birth · controversy',t:'The first 3 months',
  txt:`PRIMS: 1.2 in the first 3 months after birth, yet 72% of women had no relapse in that window; higher relapse rates before and during pregnancy, and more disability at its start, predicted a postpartum relapse. [[Confavreux1998,Vukusic2004]] Kaiser: 0.27, no rebound above the pre-pregnancy rate, though 26.4% relapsed in the year after birth. [[LangerGould2020]] MSBase: 0.61, with DMT before conception and a low pre-conception rate independently protective. [[Hughes2014]] Current status: postpartum risk depends on prior disease activity and treatment.`,
  hook:'Postpartum rebound is a controversy: clear in PRIMS (1.2 vs 0.7), absent above baseline in Kaiser (2020). Epidural analgesia did not raise relapse risk in PRIMS. [[Confavreux1998,LangerGould2020]]'},
 {from:.80,at:.95,k:'The longer view',t:'Settling back',
  txt:`After the first 3 months the PRIMS rate returned to its pre-pregnancy level. Mean EDSS worsened 0.7 point over 33 months, with no faster worsening after delivery. NICE NG220 says pregnancy does not increase the risk of progression, and that relapses may rise in the 3–6 months after birth. [[Confavreux1998,NICE2022]]`,
  pt:'Over the long run, pregnancy did not make MS worse in these studies.'}];
const LW_BF=`<div class="callout"><b>Breastfeeding</b> <span class="ev early">Early evidence</span> A meta-analysis of 24 studies (2974 women) found a pooled OR of 0.63 (95% CI 0.45–0.88) for postpartum relapse with breastfeeding, stronger for exclusive breastfeeding; the included studies had moderate to serious risk of bias. In Kaiser, exclusive breastfeeding lowered the risk of early postpartum relapse (aHR 0.37). PRIMS found no effect either way, and confounding by disease activity is possible. [[Krysko2020,LangerGould2020,Confavreux1998,Vukusic2004]]</div>`;
inits.living=()=>{
  const svg=$('#lwSvg'),rg=$('#lwT');let cmp='none',bf=false;
  const segOf=t=>{let i=0;LW_SEG.forEach((g,k)=>{if(t>=g.t0)i=k});return i};
  function draw(t){
    const N=vb(svg,'720 440','400 500');
    const L=N?{x0:58,x1:392,yT:62,yB:300,rN:322,rP:342,rC:360,fig:470,ttl:22}:{x0:96,x1:700,yT:56,yB:262,rN:284,rP:304,rC:322,fig:412,ttl:24};
    const W=LW_SEG.map(g=>N?g.wn:g.ww);let acc=0;const ed=W.map(w=>{const a=acc;acc+=w;return [a,acc]});
    const sx=(i,u)=>lerp(L.x0,L.x1,lerp(ed[i][0],ed[i][1],u)),Y=v=>lerp(L.yB,L.yT,v/1.4);
    const si=Math.min(LW_SEG.length-1,segOf(t)),g=LW_SEG[si],ux=clamp((t-g.t0)/(g.t1-g.t0)),xp=sx(si,ux);
    const C=LW_CMP[cmp];
    let s=`<text x="${N?8:20}" y="${L.ttl}" class="t-sm" style="fill:var(--ink);font-weight:600">ANNUALISED RELAPSE RATE · PRIMS (1998)</text>`;
    [0,.5,1].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.yB}" y2="${L.yB}" class="axis" style="stroke:var(--muted)"/>`;
    // pregnancy shading
    s+=`<rect x="${f1(sx(1,0))}" y="${L.yT-14}" width="${f1(sx(3,1)-sx(1,0))}" height="${f1(L.yB-L.yT+14)}" style="fill:var(--brand-soft);opacity:.45"/><text x="${f1((sx(1,0)+sx(3,1))/2)}" y="${L.yT-3}" class="t-xs t-mid" style="fill:var(--brand)">pregnancy</text>`;
    s+=`<line x1="${f1(sx(4,0))}" x2="${f1(sx(4,0))}" y1="${L.yT-14}" y2="${L.yB}" style="stroke:var(--muted);stroke-dasharray:4 3"/><text x="${f1(sx(4,0)+4)}" y="${L.yT-3}" class="t-xs">birth</text>`;
    // the Kaiser pregnancy band
    const grow=i=>i<si?1:i===si?ease(ramp(ux,0,.55)):0;
    if(C&&C.band&&grow(1)>0){const x2=si>3?sx(3,1):xp;s+=`<rect x="${f1(sx(1,0))}" y="${f1(Y(C.band[1]))}" width="${f1(Math.max(0,x2-sx(1,0)))}" height="${f1(Y(C.band[0])-Y(C.band[1]))}" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.2;opacity:.95"/>`}
    LW_SEG.forEach((sg,i)=>{const a=sx(i,0),b=sx(i,1),w=b-a,cx=(a+b)/2,bw=Math.min(34,w*.42),gr=grow(i),v=LW_PRIMS[i],last=i===5,on=i===si;
      if(gr>0){const h=(L.yB-Y(v))*gr;
        s+=`<rect x="${f1(cx-bw/2)}" y="${f1(L.yB-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:${last?'none':i===4?'var(--attack)':'var(--orange)'};${last?'stroke:var(--orange);stroke-width:1.6;stroke-dasharray:4 3;':''}opacity:${on||last?1:.8}"/>`;
        if(gr>.9)s+=`<text x="${f1(cx)}" y="${f1(Y(v)-6)}" class="t-lbl t-mid" style="fill:${i===4?'var(--attack)':'var(--ink)'}">${last?(N?'as before':'back to 0.7'):v.toFixed(1)}</text>`;
        if(C&&C.v[i]!=null&&gr>.5){const y=Y(C.v[i]);s+=`<line x1="${f1(a+w*.1)}" x2="${f1(b-w*.1)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${C.c};stroke-width:2.4"/><circle cx="${f1(cx+bw/2+5)}" cy="${f1(y)}" r="4" style="fill:${C.c};stroke:var(--panel);stroke-width:1.2"/>`}}
      s+=`<text x="${f1(cx)}" y="${L.rN}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?sg.ns:sg.n}</text>`;
      s+=`<text x="${f1(cx)}" y="${L.rP}" class="t-xs t-mid" style="fill:var(--orange)">${gr>.9?(last?'as before':v.toFixed(1)):'·'}</text>`;
      if(C&&gr>.9&&C.cell[i]&&!(cmp==='kaiser'&&i>=1&&i<=3))s+=`<text x="${f1(cx)}" y="${L.rC}" class="t-xs t-mid" style="fill:${C.c}">${C.cell[i]}</text>`});
    if(cmp==='kaiser'&&grow(1)>.9)s+=`<text x="${f1((sx(1,0)+sx(3,1))/2)}" y="${L.rC}" class="t-xs t-mid" style="fill:var(--rx)">${N?'0.14–0.07':'0.14–0.07 across pregnancy'}</text>`;
    s+=`<text x="${L.x0-6}" y="${L.rP}" class="t-xs t-end" style="fill:var(--orange)">PRIMS</text>`;
    if(C)s+=`<text x="${L.x0-6}" y="${L.rC}" class="t-xs t-end" style="fill:${C.c}">${C.n}</text>`;
    // breastfeeding note in the empty space above the pregnancy bars
    if(bf&&si>=4){const xr=sx(4,0)-8,y0=Y(1.32);
      s+=`<g><text x="${f1(xr)}" y="${f1(y0)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">breastfeeding vs not:</text><text x="${f1(xr)}" y="${f1(y0+13)}" class="t-xs t-end" style="fill:var(--ink)">pooled OR 0.63 (0.45–0.88)</text><text x="${f1(xr)}" y="${f1(y0+26)}" class="t-xs t-end">observational studies</text>`;
      s+=`<path d="M${f1(xr+3)} ${f1(y0+8)} L${f1(sx(4,.5)-14)} ${f1(Y(1.1))}" style="fill:none;stroke:var(--muted);stroke-width:1.2" marker-end="url(#lwAr)"/></g>`}
    s+=`<defs>${marker('lwAr')}</defs>`;
    // the figure walks along the playhead
    const bel=si>=1&&si<=3?lerp(2,13,(si-1+ux)/3):0,baby=si>=4,fy=L.fig,fx=xp;
    s+=`<line x1="${f1(xp)}" x2="${f1(xp)}" y1="${L.yT-14}" y2="${L.yB}" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
    s+=`<g style="stroke:var(--muted);stroke-width:2.4;stroke-linecap:round;fill:none"><line x1="${f1(fx-5)}" y1="${fy}" x2="${f1(fx-3)}" y2="${fy-20}"/><line x1="${f1(fx+5)}" y1="${fy}" x2="${f1(fx+3)}" y2="${fy-20}"/><path d="M${f1(fx-7)} ${fy-20} L${f1(fx-5)} ${fy-44} L${f1(fx+5)} ${fy-44} L${f1(fx+7)} ${fy-20} Z" style="fill:var(--panel-2)"/></g>`;
    if(bel>0)s+=`<path d="M${f1(fx+5)} ${fy-40} q${f1(bel*1.3)} ${f1(8)} 0 ${f1(16)}" style="fill:var(--orange-soft);stroke:var(--orange);stroke-width:1.6"/>`;
    s+=`<circle cx="${f1(fx)}" cy="${fy-52}" r="7" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:2"/>`;
    if(baby)s+=`<ellipse cx="${f1(fx+11)}" cy="${fy-34}" rx="7" ry="5" style="fill:var(--orange-soft);stroke:var(--orange);stroke-width:1.4"/><circle cx="${f1(fx+17)}" cy="${fy-37}" r="3.5" style="fill:var(--orange-soft);stroke:var(--orange);stroke-width:1.2"/><line x1="${f1(fx+5)}" y1="${fy-38}" x2="${f1(fx+12)}" y2="${fy-30}" style="stroke:var(--muted);stroke-width:2.2;stroke-linecap:round"/>`;
    const lab=g.n,lx=clamp(fx+(fx>L.x1-120?-24:24),L.x0,L.x1);
    s+=`<text x="${f1(lx)}" y="${fy-22}" class="t-xs${fx>L.x1-120?' t-end':''}" style="fill:var(--ink)">${lab}${baby?' · baby':''}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LW_STEPS,t);setSt(p);
    let nt=noteHTML(LW_STEPS[p]);if(bf&&p>=3)nt+=LW_BF;
    $('#lwNote').innerHTML=nt;
    $('#lwRead').innerHTML=`<span>period <b>${g.n}</b></span><span>PRIMS <b>${si===5?'back to pre-pregnancy rate':LW_PRIMS[si].toFixed(1)+' a year'}</b></span>${C?`<span>${C.n} <b>${C.cell[si]||(cmp==='kaiser'&&si>=1&&si<=3?'0.14–0.07 during pregnancy':'not reported')}</b></span>`:''}`;
  }
  const stop=playWire(rg,$('#lwPlay'),draw,18000,'Replay','living');
  const setSt=stepWire($('#lwSteps'),LW_STEPS,rg,draw,stop);
  $$('[data-lwc]').forEach(b=>b.addEventListener('click',()=>{cmp=b.dataset.lwc;$$('[data-lwc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#lwBf').addEventListener('click',e=>{bf=!bf;e.currentTarget.setAttribute('aria-pressed',bf);if(bf&&+rg.value<.66){stop();rg.value=.76}draw(+rg.value)});
  draw(+rg.value);

  /* ---------- smoking: the age at SPMS (GEMS) ---------- */
  const ssvg=$('#lwSmk'),srg=$('#lwST');
  const SM=[{n:'kept smoking',a:48,c:'var(--attack)'},{n:'stopped smoking',a:56,c:'var(--rx)'}];
  const SN=[
   {k:'GEMS, Sweden',t:'Same start, different paths',txt:`All 728 people in this analysis smoked when they were diagnosed. Some carried on and some stopped. Each additional year of smoking after diagnosis brought conversion to SPMS forward by 4.7% (acceleration factor 1.047). [[Ramanujam2015]]`,
    pt:'Stopping smoking after a diagnosis of MS is linked with a later move to the progressive phase.'},
   {k:'About age 48',t:'Kept smoking: SPMS arrives',txt:`People who kept smoking reached secondary progressive MS at about 48 years of age. In a separate UK GP-records cohort, ever-smokers had a hazard ratio of 3.6 (95% CI 1.3–9.9) for conversion to secondary progression. [[Ramanujam2015,Hernan2005]]`},
   {k:'About age 56',t:'Stopped smoking: about 8 years later',txt:`Those who quit reached SPMS at about 56, roughly 8 years later (arithmetic from the two published ages). A meta-analysis applying the Bradford Hill criteria gave a pooled HR of 1.80 (1.04–3.10) for conversion to SPMS. NICE NG220 tells clinicians to advise people with MS not to smoke, because smoking increases progression of disability. [[Ramanujam2015,Degelman2017,NICE2022]]`,
    hook:'Smoking: each extra year after diagnosis brings SPMS forward 4.7% (GEMS); kept smoking about 48 vs quit about 56. [[Ramanujam2015]]'}];
  function sdraw(t){
    const N=vb(ssvg,'720 280','400 330');
    const L=N?{x0:30,x1:380,ly:[110,210],lab:-30,ax:280,note:312}:{x0:180,x1:690,ly:[96,176],lab:0,ax:226,note:262};
    const age=lerp(40,60,t),X=a=>lerp(L.x0,L.x1,(a-40)/20);
    let s=`<text x="${N?14:20}" y="24" class="t-sm" style="fill:var(--ink);font-weight:600">AGE AT CONVERSION TO SECONDARY PROGRESSIVE MS</text>`;
    SM.forEach((m,j)=>{const y=L.ly[j],xa=X(m.a),xp=X(age),past=age>=m.a;
      s+=N?`<text x="${L.x0}" y="${y+L.lab}" class="t-lbl" style="fill:${m.c}">${m.n}</text>`:`<text x="20" y="${y+4}" class="t-lbl" style="fill:${m.c}">${m.n}</text>`;
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
      s+=`<line x1="${L.x0}" x2="${f1(Math.min(xp,xa))}" y1="${y}" y2="${y}" style="stroke:${m.c};stroke-width:6;stroke-linecap:round;opacity:.5"/>`;
      if(past)s+=`<line x1="${f1(xa)}" x2="${f1(xp)}" y1="${y}" y2="${y}" style="stroke:var(--orange);stroke-width:6;stroke-linecap:round"/>`;
      s+=`<line x1="${f1(xa)}" x2="${f1(xa)}" y1="${y-16}" y2="${y+14}" style="stroke:${past?'var(--orange)':'var(--muted)'};stroke-width:1.6;stroke-dasharray:${past?'0':'3 3'}"/>`;
      s+=`<text x="${f1(xa)}" y="${y+28}" class="t-xs t-mid" style="fill:${past?'var(--orange)':'var(--muted)'};${past?'font-weight:700':''}">${past?'SPMS at about '+m.a:'about '+m.a}</text>`;
      // the walker, with a cigarette or a crossed-out one
      const wx=xp,ph=age*3;s+=`<g style="stroke:${m.c};stroke-width:2.2;stroke-linecap:round;fill:none"><circle cx="${f1(wx)}" cy="${y-30}" r="4.5" style="fill:${m.c};stroke:none"/><line x1="${f1(wx)}" y1="${y-25}" x2="${f1(wx)}" y2="${y-13}"/><line x1="${f1(wx)}" y1="${y-13}" x2="${f1(wx+Math.sin(ph)*5)}" y2="${y-4}"/><line x1="${f1(wx)}" y1="${y-13}" x2="${f1(wx-Math.sin(ph)*5)}" y2="${y-4}"/></g>`;
      const cx=wx+8,cy=y-21;s+=`<line x1="${f1(cx)}" y1="${cy}" x2="${f1(cx+11)}" y2="${cy}" style="stroke:var(--muted);stroke-width:3"/>`;
      if(j===0)s+=`<path d="M${f1(cx+12)} ${cy-2} q3 -4 0 -8" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:.7"/>`;
      else s+=`<line x1="${f1(cx-1)}" y1="${cy+5}" x2="${f1(cx+12)}" y2="${cy-5}" style="stroke:var(--bad);stroke-width:1.8"/>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis" style="stroke:var(--muted)"/>`;
    [40,45,50,55,60].forEach(a=>{s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${L.ax-4}" y2="${L.ax+4}" style="stroke:var(--muted)"/><text x="${f1(X(a))}" y="${L.ax+16}" class="t-xs t-mid">${a}</text>`});
    s+=`<text x="${L.x1}" y="${L.ax-8}" class="t-xs t-end">age, years</text>`;
    s+=`<text x="${N?14:20}" y="${L.note}" class="t-sm" style="fill:var(--ink)">age now: ${Math.floor(age)}</text>`;
    ssvg.innerHTML=s;
    $('#lwSNote').innerHTML=noteHTML(SN[age<48?0:age<56?1:2]);
  }
  playWire(srg,$('#lwSPlay'),sdraw,12000,'Replay','living');
  sdraw(+srg.value);

  /* ---------- life expectancy ---------- */
  const vsvg=$('#lwSurv'),vrg=$('#lwVT');
  const LV=[['Norway, general population',81.8,'var(--brand)',0],['Norway, with MS',74.7,'var(--orange)',0],['Norway, relapsing-remitting',77.8,'var(--orange)',0],['Norway, primary progressive',71.4,'var(--orange)',0],['Manitoba, controls',83.4,'var(--brand)',1],['Manitoba, with MS',75.9,'var(--orange)',1]];
  const SMR=[['onset 1953–74',3.1],['1975–96',2.6],['1997–2012',0.7]];
  const LV_STEPS=[
   {from:0,at:.25,k:'Norway, 60 years',t:'About 7 years shorter',txt:`In a western Norway cohort of 1388 patients followed for 60 years, median life expectancy was 74.7 years with MS vs 81.8 in the general population: 77.8 for relapsing-remitting and 71.4 for primary progressive MS. The overall SMR was 2.7, and MS itself was the cause in 56.4% of deaths. [[Lunde2017]]`,
    pt:'On average, people with MS in this cohort lived about 7 years less than others in the same region.'},
   {from:.33,at:.55,k:'Manitoba, Canada',t:'Other illnesses matter too',txt:`In Manitoba (5797 people with MS, 28,807 controls), median survival from birth was 75.9 vs 83.4 years, and the adjusted mortality hazard ratio was 2.40. Diabetes, ischaemic heart disease, depression, anxiety and chronic lung disease each raised the risk of death. [[Marrie2015Mortality]]`,
    hook:'Life expectancy gap of about 7 years: 74.7 vs 81.8 (Norway), 75.9 vs 83.4 (Manitoba). Comorbidities add to the risk. [[Lunde2017,Marrie2015Mortality]]'},
   {from:.64,at:.92,k:'Over time',t:'The gap has narrowed',txt:`The Norwegian SMR fell from 3.1 for onset in 1953–1974 to 2.6 for 1975–1996 and 0.7 for 1997–2012. The most recent group had been followed for the shortest time, so its figure may change with longer follow-up. [[Lunde2017]]`,
    pt:'People diagnosed more recently have had a much lower excess risk of death than those diagnosed in the 1950s–70s.'}];
  function vdraw(t){
    const N=vb(vsvg,'720 420','400 560');
    const L=N?{bx:14,bw:340,ry:i=>64+i*42,lab:-9,sy:372,sh:140,sx0:40,sx1:390}:{bx:250,bw:400,ry:i=>58+i*30,lab:0,sy:262,sh:120,sx0:300,sx1:640};
    const X=a=>L.bx+L.bw*a/90;
    let s=`<text x="${N?14:20}" y="24" class="t-sm" style="fill:var(--ink);font-weight:600">MEDIAN LIFE EXPECTANCY, YEARS</text>`;
    [0,30,60,90].forEach(a=>{s+=`<text x="${f1(X(a))}" y="40" class="t-xs t-mid">${a}</text><line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="44" y2="${f1(L.ry(5)+8)}" class="grid"/>`});
    LV.forEach(([n,v,c,grp],i)=>{const y=L.ry(i),gr=ease(grp?ramp(t,.35,.55):ramp(t,i*.05,.2+i*.05));
      if(N)s+=`<text x="${L.bx}" y="${y+L.lab}" class="t-xs" style="fill:var(--ink)">${n}</text>`;else s+=`<text x="${L.bx-8}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${L.bx}" y="${y-6}" width="${L.bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y-6}" width="${f1((X(v)-L.bx)*gr)}" height="12" rx="3" style="fill:${c};opacity:.85"/>`;
      if(gr>.9)s+=`<text x="${f1(X(v)+5)}" y="${y+4}" class="t-xs" style="fill:var(--ink);font-weight:700">${f1(v)}</text>`});
    // SMR columns
    const gs=ease(ramp(t,.66,.9)),base=L.sy+L.sh,Ys=v=>base-L.sh*v/3.5;
    s+=`<text x="${N?14:20}" y="${L.sy-14}" class="t-sm" style="fill:var(--ink);font-weight:600">NORWAY · SMR BY ONSET PERIOD</text>`;
    s+=`<line x1="${L.sx0-10}" x2="${L.sx1}" y1="${f1(Ys(1))}" y2="${f1(Ys(1))}" style="stroke:var(--good);stroke-dasharray:4 3"/><line x1="${L.sx1-178}" x2="${L.sx1-160}" y1="${L.sy+1}" y2="${L.sy+1}" style="stroke:var(--good);stroke-dasharray:4 3"/><text x="${L.sx1}" y="${L.sy+4}" class="t-xs t-end" style="fill:var(--good)">SMR 1 = general population</text>`;
    s+=`<line x1="${L.sx0-10}" x2="${L.sx1}" y1="${base}" y2="${base}" class="axis" style="stroke:var(--muted)"/>`;
    SMR.forEach(([n,v],i)=>{const cx=lerp(L.sx0+30,L.sx1-60,i/2),h=L.sh*v/3.5*gs;
      s+=`<rect x="${f1(cx-18)}" y="${f1(base-h)}" width="36" height="${f1(h)}" rx="3" style="fill:var(--orange);opacity:${f1(.55+.15*i)}"/>`;
      if(gs>.9)s+=v<1?`<text x="${f1(cx+24)}" y="${f1(base-h+12)}" class="t-lbl">${f1(v)}</text>`:`<text x="${f1(cx)}" y="${f1(base-h-6)}" class="t-lbl t-mid">${f1(v)}</text>`;
      s+=`<text x="${f1(cx)}" y="${base+14}" class="t-xs t-mid">${n}</text>`});
    vsvg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);vset(p);$('#lwVNote').innerHTML=noteHTML(LV_STEPS[p]);
  }
  const vstop=playWire(vrg,$('#lwVPlay'),vdraw,12000,'Replay','living');
  const vset=stepWire($('#lwVSteps'),LV_STEPS,vrg,vdraw,vstop);
  vdraw(+vrg.value);
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();sdraw(+srg.value)};

  $('#lwCards').innerHTML=`
   <div class="card"><h4>Work</h4><p>Across 153 studies (188,436 people in 29 countries), 35.6% of people with MS were unemployed and 17.2% had retired early; unemployment has fallen slightly over time. In a European survey, work capacity fell from 82% at mild disability to 8% at severe disability. [[Vitturi2022,Kobelt2017]]</p></div>
   <div class="card"><h4>Heat</h4><p>An estimated 60–80% of people with MS have temporary worsening with heat. Cooling before or during exercise can reduce exercise-induced heat sensitivity, and a cooling-garment trial found modest benefits. <a href="#symptoms" data-go="symptoms">See heat sensitivity on the symptom map</a>. [[Davis2010,Silarova2024,Schwid2003]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Exercise</h4><p>NICE NG220 tells clinicians to encourage exercise and to say it has no harmful effects on MS. In the Cochrane review, relapses were similar with and without exercise. [[NICE2022,Heine2015]]</p></div>
   <div class="card"><h4>Vaccines and infections, in brief</h4><p>The AAN 2019 guideline: follow local schedules with yearly influenza vaccination, vaccinate at least 4–6 weeks before starting immune therapy, avoid live vaccines while on it, and delay vaccination during a relapse. Infections matter: relapse risk was 2.1 times higher from 2 weeks before to 5 weeks after a systemic infection. Drug-specific advice is in <a href="#safety" data-go="safety">Safety &amp; monitoring</a>. [[Farez2019,Buljevac2002]]</p></div>
   <div class="card"><span class="tag warn">Rules vary by country</span><h4>Driving</h4><p>Licensing rules differ between countries. In the UK, the DVLA web page (a regulator page, listed as unverified in our sources because it has no peer-reviewed record) says drivers with MS must notify the DVLA, and that car drivers may keep driving while they can control a vehicle safely, possibly on a shorter licence or with adapted controls. [[DVLA2025]]</p></div>
   <div class="card"><span class="tag warn">Controversy</span><h4>Diet</h4><p>No diet is proven to change MS outcomes: a Cochrane review of 30 trials found insufficient evidence, all at unknown or high risk of bias, and NICE says no specific diet is known to improve fatigue while a healthy diet helps general health. In WAVES (87 people), both the Swank low-saturated-fat diet and the Wahls modified Paleolithic diet were followed by better fatigue scores than at baseline (MFIS −9.87 and −14.41), but there was no non-diet control group. [[Parks2020,NICE2022,Wahls2021]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Alcohol</h4><p>In the CLIMB cohort, more than 4 drinks a week was associated with lower EDSS than abstinence, and red wine with faster T2 lesion growth. These are cross-sectional associations that cannot show cause and effect. [[DiazCruz2017]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Vitamin D</h4><p>SOLAR (high-dose D3 on top of interferon) missed its primary endpoint (NEDA-3 36.3% vs 35.3%). D-Lay MS, in people with a first episode, reduced disease activity driven by MRI (HR 0.66), with no significant effect on relapses. <a href="#risk" data-go="risk">Vitamin D as a risk factor</a>. [[Hupperts2019,Thouvenot2025]]</p></div>
   <div class="card"><span class="tag warn">Controversy</span><h4>Menopause</h4><p>In 987 Australian women with relapse-onset MS, menopause was not associated with disability progression (HR 0.95) or conversion to SPMS after adjustment; median age at menopause was 48.5. A 2026 journal debate argues both sides. [[Bridge2025,Campagna2026,Jokubaitis2026]]</p></div>
   <div class="card"><h4>Getting older with MS</h4><p>Older people with MS have more age-related comorbidity, the disease shifts from inflammatory to neurodegenerative, and DMTs work less well against age-related disability; stopping a DMT may become a discussion. Comorbidity estimates vary widely between studies. [[Vaughn2019,Marrie2015Comorbidity]]</p></div>
   <div class="card"><h4>Assisted reproduction</h4><p>A meta-analysis of published case series (220 cycles) showed more relapses in the 3 months after assisted reproduction, while the authors' own Boston cohort (22 cycles) did not. Status: unresolved, possibly protocol-dependent. [[Bove2020]]</p></div>
   <div class="card"><h4>Advance care planning and palliative care</h4><p>The EAN guideline on severe progressive MS (EDSS above 6.0) makes 34 recommendations, 33 of them weak, including home-based palliative care, and notes a lack of evidence on advance care planning and caregiver support. NICE says to refer to palliative care for symptom control and end-of-life care when appropriate. [[Solari2020,NICE2022]]</p></div>`;
};
