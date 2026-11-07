/* =============== 2.1 Who is at risk =============== */
/* four views of age and sepsis: icon arrays of 100, then bars per 1,000 (each from its own cited population) */
const RK_STEPS=[
 {from:0,at:.15,k:'View 1 · the US population',t:'12 in 100 people are 65 or older',
  txt:`In the US analysis by Martin and colleagues, adults aged 65 or older made up 12% of the population [[Martin2006Age]]. Keep that number in mind for the next view.`,
  pt:`Out of every 100 people in the US population studied, about 12 were aged 65 or over [[Martin2006Age]].`,
  hook:`Older adults: 12% of the population but 64.9% of sepsis cases [[Martin2006Age]].`},
 {from:.25,at:.4,k:'View 2 · people with sepsis',t:'65 in 100 people with sepsis are 65 or older',
  txt:`The same older adults accounted for 64.9% of sepsis cases, a relative risk of 13.1 (95% CI 12.6–13.6) compared with younger adults, and age independently predicted death (OR 2.26) [[Martin2006Age]]. In US data from 1995, severe-sepsis incidence rose more than 100-fold with age [[Angus2001CCM]].`,
  pt:`Older people are much more likely to get sepsis: about two thirds of people with sepsis in this study were 65 or older [[Martin2006Age]].`,
  hook:`Age ≥65: RR 13.1 for sepsis versus younger adults; OR 2.26 for death [[Martin2006Age]].`},
 {from:.5,at:.65,k:'View 3 · the world, 2017',t:'More than half of cases are in children',
  txt:`Of an estimated 48.9 million sepsis cases worldwide in 2017, 20.3 million were in children under 5, 4.9 million at ages 5–19 and 23.7 million in adults 20 or older. The authors note that more than half of all cases were among children, many of them newborns [[Rudd2020GBD]]. Among children under 5, the commonest causes were diarrhoeal disease (27.9%), neonatal disorders (25.7%) and lower respiratory infection (16.5%) [[Rudd2020GBD]].`,
  pt:`Around the world, babies and young children are hit hardest: in 2017, more than half of everyone with sepsis was a child [[Rudd2020GBD]].`,
  hook:`GBD 2017: 20.3 million of 48.9 million cases were in under-5s; incidence peaks in early childhood and again in older adults [[Rudd2020GBD]].`},
 {from:.75,at:.9,k:'View 4 · rates',t:'The two ends of life',
  txt:`In US data from 1995, severe sepsis occurred in 0.2 per 1,000 children and 26.2 per 1,000 people over 85, and mortality rose from 10% to 38.4% [[Angus2001CCM]]. A 2021 meta-analysis estimated neonatal sepsis at 2,824 per 100,000 live births (about 28 per 1,000), the highest population incidence of any age group, with 17.6% dying [[Fleischmann2021Neonatal]]. The rates come from different populations and definitions, so compare their size, not their decimals.`,
  pt:`Newborn babies and the very old have the highest rates of sepsis. These are figures for large groups, not predictions for one person [[Angus2001CCM,Fleischmann2021Neonatal]].`,
  hook:`Neonates: about 2,824 sepsis cases per 100,000 live births [[Fleischmann2021Neonatal]]. Over 85s: 26.2 per 1,000 [[Angus2001CCM]].`}
];
/* REGARDS adjusted hazard ratios */
const RK_HR=[
 ['Chronic lung disease',2.43,'sepsis','Wang2012Chronic'],['Peripheral artery disease',2.16,'sepsis','Wang2012Chronic'],['Steroid medicines',2.10,'infection','Chaudhary2017Steroids'],
 ['Chronic kidney disease',1.99,'sepsis','Wang2012Chronic'],['Previous heart attack',1.79,'sepsis','Wang2012Chronic'],['Diabetes',1.78,'sepsis','Wang2012Chronic'],
 ['Stroke',1.67,'sepsis','Wang2012Chronic'],['Deep vein thrombosis',1.63,'sepsis','Wang2012Chronic'],['Frailty',1.44,'sepsis','Mahalingam2019Frailty']];
const RK_HRTXT=[
 `Chronic lung disease: adjusted hazard ratio 2.43, the strongest single condition in REGARDS. People who had it at the start went on to develop sepsis at about 2.4 times the rate of comparable people without it, after adjusting for other factors [[Wang2012Chronic]].`,
 `Peripheral artery disease (narrowed leg arteries): adjusted hazard ratio 2.16, about twice the rate of sepsis of comparable people without it [[Wang2012Chronic]].`,
 `Oral or injected steroids: adjusted hazard ratio 2.10 for infection, and once infected, adjusted odds ratio 2.11 for sepsis [[Chaudhary2017Steroids]]. Steroids are often essential medicines: the point is to know the risk, not to stop them without advice.`,
 `Chronic kidney disease: adjusted hazard ratio 1.99, about twice the rate of comparable people without it [[Wang2012Chronic]].`,
 `A previous heart attack (myocardial infarction): adjusted hazard ratio 1.79 [[Wang2012Chronic]].`,
 `Diabetes: adjusted hazard ratio 1.78 [[Wang2012Chronic]].`,
 `Stroke: adjusted hazard ratio 1.67 [[Wang2012Chronic]].`,
 `Deep vein thrombosis: adjusted hazard ratio 1.63 [[Wang2012Chronic]].`,
 `Frailty: adjusted hazard ratio 1.44 for sepsis, and adjusted odds ratio 1.62 for dying within 30 days of it [[Mahalingam2019Frailty]].`];
inits.risk=()=>{
  /* ---------- main: icon arrays and rates ---------- */
  const svg=$('#rkSvg'),rg=$('#rkT'),note=$('#rkNote');let setSt=()=>{};
  const CAT=[['aged 65+','var(--accent)'],['under 5','var(--brand)'],['5–19','var(--gold)'],['20 or older','var(--dx)']];
  function draw(t){const N=vb(svg,'720 360','400 530'),p=phaseOf(RK_STEPS,t),S=RK_STEPS[p],u=ramp(t,S.from,S.from+.2),e=ease(u);
    const L=N?{gx:60,gy:70,sz:22,gp:6,rx:16,ry:400,bx:16,bw:300,by:90}:{gx:36,gy:66,sz:18,gp:7,rx:330,ry:96,bx:230,bw:420,by:110};
    let s=`<text x="16" y="26" class="t-big">${S.t}</text><text x="16" y="42" class="t-sm">${['US population (Martin 2006)','US sepsis cases (Martin 2006)','world sepsis cases, 2017 (GBD)','rates per 1,000 (Angus 2001; Fleischmann 2021)'][p]}</text>`;
    /* the 100-icon grid: colour by view */
    const fade=p===3?1-ease(ramp(t,.75,.82)):1;
    if(fade>0){let cnt=[0,0,0,0];
      const col=i=>{if(p===0){const k=Math.round(12*e);return i<k?0:-1}
        if(p===1){const k=Math.round(lerp(12,65,e));return i<k?0:-1}
        const a=Math.round(42*ease(ramp(u,0,.4))),b=Math.round(10*ease(ramp(u,.3,.6))),c=Math.round(48*ease(ramp(u,.5,1)));
        return i<a?1:i<42?-1:i<42+b?2:i<52?-1:i<52+c?3:-1};
      s+=`<g style="opacity:${f1(fade)}">`;
      for(let i=0;i<100;i++){const c=p===3?(i<42?1:i<52?2:3):col(i);if(c>=0)cnt[c]++;const x=L.gx+(i%10)*(L.sz+L.gp),y=L.gy+Math.floor(i/10)*(L.sz+L.gp*1.2);
        s+=person(x+L.sz/2,y,L.sz,c<0?'var(--line)':CAT[c][1])}
      s+=`</g>`;
      /* legend and the big number */
      const lx=L.rx,ly=L.ry;
      if(p<2){const k=p===0?Math.round(12*e):Math.round(lerp(12,65,e));
        s+=`<text x="${lx}" y="${ly}" class="t-big" style="font-size:44px;fill:var(--accent)">${k}</text><text x="${lx+(k>9?58:32)}" y="${ly}" class="t-big">in 100</text>`;
        s+=`<text x="${lx}" y="${ly+26}" class="t-sm" style="fill:var(--ink)">${p===0?'people in the population':'people with sepsis'}</text><text x="${lx}" y="${ly+42}" class="t-sm" style="fill:var(--ink)">are aged 65 or over</text>`;
        if(p===1)s+=`<text x="${lx}" y="${ly+70}" class="t-sm">relative risk 13.1 vs</text><text x="${lx}" y="${ly+85}" class="t-sm">younger adults</text>`}
      else if(p===2){[[1,'42','under 5 years'],[2,'10','aged 5–19'],[3,'48','aged 20 or older']].forEach((r,j)=>{const y=ly+j*(N?34:44);
          s+=`<rect x="${lx}" y="${y-14}" width="16" height="16" rx="4" style="fill:${CAT[r[0]][1]}"/><text x="${lx+24}" y="${y}" class="t-big" style="fill:${CAT[r[0]][1]}">${cnt[r[0]]}</text><text x="${lx+58}" y="${y}" class="t-sm" style="fill:var(--ink)">${r[2]}</text>`});
        s+=`<text x="${lx}" y="${ly+(N?108:140)}" class="t-sm">of 100 cases (48.9 million in all)</text>`}}
    /* view 4: bars per 1,000 */
    if(p===3){const g=ease(ramp(t,.8,.92)),X=v=>L.bx+L.bw*v/30;
      const R=[['children, US 1995',.2,'var(--brand)'],['over 85s, US 1995',26.2,'var(--accent)'],['newborns (per 1,000 births)',28.24,'var(--brand)']];
      s+=`<g style="opacity:${f1(ramp(t,.78,.84))}">`;
      R.forEach((r,j)=>{const y=L.by+j*(N?110:64);
        s+=`<text x="${N?L.bx:L.bx-12}" y="${N?y-10:y+15}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);font-weight:600">${r[0]}</text>`;
        s+=`<rect x="${L.bx}" y="${y}" width="${L.bw}" height="22" rx="5" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y}" width="${f1(Math.max(2,(X(r[1])-L.bx)*g))}" height="22" rx="5" style="fill:${r[2]};opacity:.85"/>`;
        s+=`<text x="${f1(L.bx+Math.max(2,(X(r[1])-L.bx)*g)+8)}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${(r[1]*g).toFixed(1)}</text>`});
      const ay=L.by+(N?330:196);s+=tline(L.bx,ay,L.bw,{min:0,max:30,step:10,label:'per 1,000'}).svg;
      s+=`<text x="${L.bx}" y="${ay+46}" class="t-xs">Different sources and definitions:</text><text x="${L.bx}" y="${ay+58}" class="t-xs">compare the size of the bars, not the decimals.</text></g>`}
    svg.innerHTML=s;note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#rkPlay'),draw,24000,'Replay','risk');
  setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- REGARDS hazard ratios ---------- */
  const hs=$('#rkHr'),ho=$('#rkHrOut');let sel=0;
  function drawHr(){const N=vb(hs,'720 330','400 490');let s='';
    const lx=N?12:16,bx=N?12:230,bw=N?330:420,rh=N?44:32,y0=N?34:30,X=v=>bx+bw*(v-1)/1.6;
    s+=`<text x="${f1(X(1))}" y="${y0-(N?20:14)}" class="t-xs${N?'':' t-mid'}" style="fill:var(--ink)">1 = same rate</text>`;
    RK_HR.forEach((r,i)=>{const y=y0+i*rh+(N?14:0),on=i===sel,w=X(r[1])-X(1);
      s+=`<text x="${N?lx:bx-10}" y="${f1(N?y-4:y+14)}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);${on?'font-weight:700':''}">${r[0]}${r[2]==='infection'?' (infection)':''}</text>`;
      s+=`<rect x="${f1(X(1))}" y="${y}" width="${f1(w)}" height="18" rx="4" style="fill:${on?'var(--accent)':'var(--dx)'};opacity:${on?.95:.55}"/>`;
      s+=`<text x="${f1(X(r[1])+6)}" y="${y+13}" class="t-sm" style="fill:var(--ink);font-weight:${on?700:500}">${r[1].toFixed(2)}</text>`});
    const ay=y0+RK_HR.length*rh+(N?14:6);
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${y0-8}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    s+=tline(X(1),ay,bw,{min:1,max:2.6,step:.4,fmt:v=>v.toFixed(1),label:'adjusted hazard ratio'}).svg;
    hs.innerHTML=s;ho.innerHTML=RK_HRTXT[sel]+' A hazard ratio compares rates between groups; it does not tell any one person their own chance.';
    $$('[data-hr]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hr===sel))}
  $$('[data-hr]').forEach(b=>b.addEventListener('click',()=>{sel=+b.dataset.hr;drawHr()}));drawHr();
  redraws.risk=(()=>{const prev=redraws.risk;return()=>{prev&&prev();drawHr()}})();
};
