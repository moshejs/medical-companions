/* =============== 4.2 Modulator trials & eligibility =============== */
/* Main scene: the pivotal results built trial by trial, ppFEV1 change on the left and sweat chloride fall on the
   right. Every bar is a published number from the research pass (Numbers for the animations); a null means the
   pass gives no figure for that trial, and the chart says so instead of drawing a bar. cmp: pbo = vs placebo,
   act = vs an active modulator, pre = before vs after in the same people (real world). */
const TR_ROWS=[
 {n:'STRIVE',y:2011,g:'G551D · age ≥12',d:'ivacaftor',cmp:'pbo',fev:10.6,sw:48.1,at:.02},
 {n:'TRAFFIC/TRANSPORT',y:2015,g:'F/F · age ≥12',d:'lumacaftor-ivacaftor',cmp:'pbo',fev:[2.6,4.0],sw:null,at:.19},
 {n:'EVOLVE',y:2017,g:'F/F · age ≥12',d:'tezacaftor-ivacaftor',cmp:'pbo',fev:4.0,sw:null,at:.26},
 {n:'Middleton 2019',y:2019,g:'F/MF · age ≥12',d:'ETI',cmp:'pbo',fev:14.3,sw:41.8,at:.36},
 {n:'Heijerman 2019',y:2019,g:'F/F · age ≥12',d:'ETI vs tez-iva',cmp:'act',fev:10.0,sw:45.1,at:.43},
 {n:'SKYLINE 102/103',y:2025,g:'age ≥12 · after ETI',d:'VTD vs ETI',cmp:'act',fev:.2,sw:[2.8,8.4],at:.54},
 {n:'RIDGELINE',y:2025,g:'age 6–11 · single arm',d:'VTD',cmp:'pre',fev:'kept',sw:'kept',at:.70},
 {n:'PROMISE',y:2022,g:'real world · age ≥12',d:'ETI, 6 months',cmp:'pre',fev:9.76,sw:41.7,at:.84}
];
const TR_COL={pbo:'var(--rx)',act:'var(--dx)',pre:'var(--gold)'};
const TR_STEPS=[
 {from:0,at:.1,rows:[0],k:'2011 · the first modulator',t:'STRIVE: a potentiator for G551D',
  txt:`STRIVE randomised 167 people aged 12 or older with at least one G551D variant to ivacaftor or placebo for 48 weeks. Through week 24, ppFEV1 was 10.6 percentage points higher with ivacaftor; through week 48, sweat chloride fell 48.1 mmol/L, weight rose 2.7 kg more and the chance of a pulmonary exacerbation was 55% lower. The effect appeared by week 2 [[Ramsey2011STRIVE]]. In children aged 6–11 (ENVISION), ppFEV1 rose 12.5 points despite near-normal baseline values [[Davies2013ENVISION]].`,
  pt:`For people whose CFTR reaches the surface but stays shut, a gate-opening pill improved breathing tests within two weeks [[Ramsey2011STRIVE]].`,
  hook:`STRIVE (G551D, age ≥12): ppFEV1 +10.6 points, sweat chloride −48.1 mmol/L, exacerbations 55% less likely [[Ramsey2011STRIVE]].`},
 {from:.17,at:.3,rows:[1,2],k:'2015–2017 · one corrector',t:'F508del homozygotes: modest gains',
  txt:`TRAFFIC and TRANSPORT (1,108 people homozygous for F508del, mean baseline ppFEV1 61%) found lumacaftor-ivacaftor raised ppFEV1 by 2.6 to 4.0 points over placebo, with 30–39% fewer pulmonary exacerbations [[Wainwright2015TRAFFIC]]. EVOLVE (509 dosed) found tezacaftor-ivacaftor raised ppFEV1 by 4.0 points, with 35% fewer exacerbations and fewer serious adverse events (12.4% vs 18.2%) [[TaylorCousar2017EVOLVE]]. The adult trials' sweat chloride results are not in this guide's sources; in children aged 6–11, lumacaftor-ivacaftor lowered sweat chloride 20.8 mmol/L vs placebo [[Ratjen2017LumIva]].`,
  pt:`One corrector plus a potentiator helped people with two copies of F508del, but only a little: a few points on the breathing test [[Wainwright2015TRAFFIC,TaylorCousar2017EVOLVE]].`,
  hook:`TRAFFIC/TRANSPORT (F/F): lumacaftor-ivacaftor ppFEV1 +2.6 to 4.0 points, a modest effect. EVOLVE: tezacaftor-ivacaftor +4.0 points, exacerbations −35% [[Wainwright2015TRAFFIC,TaylorCousar2017EVOLVE]].`},
 {from:.34,at:.47,rows:[3,4],k:'2019 · two correctors',t:'The triple combination',
  txt:`Middleton 2019 randomised 403 people aged 12 or older with F508del and a minimal-function variant (F/MF) to ETI or placebo: ppFEV1 was 13.8 points higher at week 4 and 14.3 points higher through week 24, exacerbations 63% lower, CFQ-R respiratory domain 20.2 points higher (minimum clinically important difference 4) and sweat chloride 41.8 mmol/L lower; 1% stopped for adverse events [[Middleton2019ETI]]. Heijerman 2019 compared ETI with tezacaftor-ivacaftor in 107 F508del homozygotes: ppFEV1 +10.0 points (95% CI 7.4 to 12.6), sweat chloride −45.1 mmol/L [[Heijerman2019ETI]].`,
  pt:`In trials, the triple medicine improved breathing tests by about 10 to 14 points on average and cut flare-ups by about two thirds [[Middleton2019ETI,Heijerman2019ETI]].`,
  hook:`Heijerman 2019 compared ETI with tezacaftor-ivacaftor, an active comparator, not placebo: ppFEV1 +10.0 points on top of an existing modulator [[Heijerman2019ETI]].`},
 {from:.52,at:.62,rows:[5],k:'2025 · once daily',t:'SKYLINE: as good as ETI, taken once a day',
  txt:`SKYLINE 102 and 103 (398 and 573 randomised, 52 weeks, age 12 or older after an ETI run-in) compared once-daily vanzacaftor-tezacaftor-deutivacaftor with ETI. VTD was non-inferior for ppFEV1, with a margin of −3.0 points: the difference was +0.2 points in both trials (95% CI −0.7 to 1.1 and −0.5 to 0.9) [[Keating2025SKYLINE]]. Sweat chloride was lower on VTD: −8.4 mmol/L (Trial 1) and −2.8 mmol/L (Trial 2) vs ETI, as the label reports [[FDA-Alyftrek]].`,
  pt:`The newest medicine is taken once a day and worked as well as the triple medicine on breathing tests [[Keating2025SKYLINE]].`,
  hook:`Non-inferiority: VTD is compared with ETI, so a bar near zero is the expected, successful result [[Keating2025SKYLINE]].`},
 {from:.68,at:.76,rows:[6],k:'2025 · children',t:'RIDGELINE: children aged 6–11',
  txt:`RIDGELINE gave VTD to 78 children aged 6–11 in a single arm. ppFEV1 was maintained from the ETI baseline, nearly all children had sweat chloride below 60 mmol/L and more than half below 30 mmol/L; one child (1%) stopped for adverse events [[Hoppe2025RIDGELINE]]. ClinicalTrials.gov lists RIDGELINE (NCT05422222) as continuing for ages 1–11, with completion estimated in 2030 [[NCT05422222]].`,
  pt:`In children already doing well on the triple medicine, switching kept their lung function steady and brought most sweat tests into the normal range [[Hoppe2025RIDGELINE]].`},
 {from:.82,at:.94,rows:[7],k:'Real world',t:'PROMISE: outside a trial',
  txt:`PROMISE followed 487 people aged 12 or older starting ETI in the US. After 6 months, ppFEV1 had risen 9.76 points (95% CI 8.76 to 10.76), CFQ-R respiratory domain 20.4 points and sweat chloride had fallen 41.7 mmol/L, from each person's own baseline rather than against placebo; gains were larger in people new to modulators [[Nichols2022PROMISE]]. In the US registry (16,116 people), exacerbations fell from 0.86 to 0.18 per person per year and ppFEV1 rose 8.2 points in year 1 [[Bower2023]].`,
  pt:`These are averages for groups of people. One person's response can be larger or smaller [[Fidler2017SwCl]].`,
  hook:`Within a trial, a person's fall in sweat chloride does not predict their FEV1 gain; the two correlate only across populations [[Fidler2017SwCl,Durmowicz2013SwCl]].`}
];
/* eligibility teaching tool: what the US labels state, as the research pass summarises them */
const TR_PROD=[
 {k:'kal',n:'Kalydeco',d:'ivacaftor',min:1,minT:'1 month',c:'[[FDA-Kalydeco]]'},
 {k:'ork',n:'Orkambi',d:'lumacaftor-ivacaftor',min:12,minT:'1 year',c:'[[FDA-Orkambi]]'},
 {k:'sym',n:'Symdeko',d:'tezacaftor-ivacaftor',min:72,minT:'6 years',c:'[[FDA-Symdeko]]'},
 {k:'tri',n:'Trikafta',d:'elexacaftor-tezacaftor-ivacaftor',min:24,minT:'2 years',c:'[[FDA-Trikafta]]'},
 {k:'aly',n:'Alyftrek',d:'vanzacaftor-tezacaftor-deutivacaftor',min:72,minT:'6 years',c:'[[FDA-Alyftrek]]'}
];
const TR_TAB=`Needs a variant in the label's responsive table`;
const TR_ELIG={
 ff:{lbl:'F508del / F508del',
  kal:['maybe',`${TR_TAB} (about 97 listed). The pivotal ivacaftor-alone trials enrolled gating and R117H variants, not F508del homozygotes [[FDA-Kalydeco,Ramsey2011STRIVE,Moss2015KONDUCT]].`],
  ork:['yes',`The label covers only people homozygous for F508del [[FDA-Orkambi]].`],
  sym:['yes',`The label covers people homozygous for F508del [[FDA-Symdeko]].`],
  tri:['yes',`At least one responsive variant; ETI was tested against tezacaftor-ivacaftor in F508del homozygotes [[FDA-Trikafta,Heijerman2019ETI]].`],
  aly:['maybe',`${TR_TAB} (about 560 listed); the phase 2 trials included F508del homozygotes [[FDA-Alyftrek,Uluer2023VTD]].`]},
 fmf:{lbl:'F508del / minimal function',
  kal:['maybe',`${TR_TAB} (about 97 listed) [[FDA-Kalydeco]].`],
  ork:['no',`The label covers only people homozygous for F508del [[FDA-Orkambi]].`],
  sym:['maybe',`Covers homozygous F508del or a responsive variant in its table (about 154 listed) [[FDA-Symdeko]].`],
  tri:['yes',`At least one responsive variant; Middleton 2019 tested ETI in exactly this genotype (ppFEV1 +14.3 points vs placebo) [[FDA-Trikafta,Middleton2019ETI]].`],
  aly:['maybe',`${TR_TAB} (about 560 listed); the phase 2 trial in F/MF adults raised ppFEV1 14.2 points [[FDA-Alyftrek,Uluer2023VTD]].`]},
 gat:{lbl:'A gating variant (for example G551D)',
  kal:['yes',`Ivacaftor is the gating-variant treatment: STRIVE and ENVISION (G551D) and KONNECTION (other gating variants), from age 1 month on the label, for variants in its table [[FDA-Kalydeco,Ramsey2011STRIVE,DeBoeck2014KONNECTION]].`],
  ork:['no',`The label covers only people homozygous for F508del [[FDA-Orkambi]].`],
  sym:['maybe',`${TR_TAB} (about 154 listed) [[FDA-Symdeko]].`],
  tri:['maybe',`${TR_TAB} (more than 500 listed). Barry 2021 tested ETI in F508del plus a gating variant: ppFEV1 +3.5 points over the previous modulator [[FDA-Trikafta,Barry2021ETI]].`],
  aly:['maybe',`${TR_TAB} (about 560 listed) [[FDA-Alyftrek]].`]},
 res:{lbl:'A residual-function variant (for example R117H)',
  kal:['maybe',`${TR_TAB}. In KONDUCT (R117H), the primary endpoint was not met overall (ppFEV1 +2.1, p=0.20), though adults gained 5.0 points [[FDA-Kalydeco,Moss2015KONDUCT]].`],
  ork:['no',`The label covers only people homozygous for F508del [[FDA-Orkambi]].`],
  sym:['maybe',`${TR_TAB}. EXPAND (F508del plus a residual-function variant) found ppFEV1 +6.8 points vs placebo [[FDA-Symdeko,Rowe2017EXPAND]].`],
  tri:['maybe',`${TR_TAB}. Barry 2021 included F508del plus residual-function genotypes [[FDA-Trikafta,Barry2021ETI]].`],
  aly:['maybe',`${TR_TAB} (about 560 listed) [[FDA-Alyftrek]].`]},
 rare:{lbl:'Other rare variants, no F508del',
  kal:['maybe',`${TR_TAB}; since 2017 the FDA has added rare variants on in vitro FRT data [[FDA-Kalydeco,Durmowicz2018]].`],
  ork:['no',`The label covers only people homozygous for F508del [[FDA-Orkambi]].`],
  sym:['maybe',`${TR_TAB} (about 154 listed) [[FDA-Symdeko]].`],
  tri:['maybe',`The label covers a variant "either responsive based on clinical and/or in vitro data … or results in production of CFTR protein" (N1303K is listed on HBE cell data). In FRT cells 518 of 620 rare variants (84%) responded; in trial 445-124 ppFEV1 rose 9.2 points vs placebo [[FDA-Trikafta,Castellani2026RareVariants]].`],
  aly:['maybe',`${TR_TAB} (about 560 listed) [[FDA-Alyftrek]].`]},
 non:{lbl:'Two nonsense variants (no protein)',
  kal:['no',`Drugs that act on the CFTR protein cannot help when no protein is made, as with many nonsense variants [[Kerem2014Ataluren]].`],
  ork:['no',`The label covers only people homozygous for F508del [[FDA-Orkambi]].`],
  sym:['no',`No protein for the drug to act on [[Kerem2014Ataluren]].`],
  tri:['no',`No protein for the drug to act on; the label's wider criterion needs a variant that "results in production of CFTR protein" [[FDA-Trikafta,Kerem2014Ataluren]].`],
  aly:['no',`No protein for the drug to act on [[Kerem2014Ataluren]].`]}
};
const TR_AGE={lt1:[0,'under 1 month'],m1:[6,'1 to 11 months'],y1:[12,'1 year'],y2:[36,'2 to 5 years'],y6:[96,'6 to 11 years'],y12:[160,'12 years or older']};
inits.trials=()=>{
  const svg=$('#trSvg'),rg=$('#trT'),note=$('#trNote');let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 440','400 660'),p=phaseOf(TR_STEPS,t),P=TR_STEPS[p];
    const L=N?{lx:12,fx:12,fw:178,sx:212,sw:176,y0:92,rh:66,hy:66}:{lx:14,fx:236,fw:226,sx:492,sw:214,y0:84,rh:40,hy:62};
    const FX=v=>L.fx+L.fw*v/16,SX=v=>L.sx+L.sw*v/60;
    let s=`<text x="${L.lx}" y="24" class="t-big">${P.t}</text><text x="${L.lx}" y="40" class="t-sm">${P.k}</text>`;
    s+=`<text x="${L.fx}" y="${L.hy-8}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'ppFEV1 (points)':'ppFEV1 change (percentage points)'}</text>`;
    s+=`<text x="${L.sx}" y="${L.hy-8}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'Sweat Cl⁻ fall (mmol/L)':'Sweat chloride fall (mmol/L)'}</text>`;
    const bot=L.y0+L.rh*TR_ROWS.length;
    [0,4,8,12,16].forEach(v=>{s+=`<line x1="${f1(FX(v))}" x2="${f1(FX(v))}" y1="${L.hy}" y2="${bot}" class="grid"/><text x="${f1(FX(v))}" y="${bot+13}" class="t-xs t-mid">${v}</text>`});
    [0,20,40,60].forEach(v=>{s+=`<line x1="${f1(SX(v))}" x2="${f1(SX(v))}" y1="${L.hy}" y2="${bot}" class="grid"/><text x="${f1(SX(v))}" y="${bot+13}" class="t-xs t-mid">${v?'−'+v:0}</text>`});
    const cur=P.rows;
    TR_ROWS.forEach((r,i)=>{const g=ease(ramp(t,r.at,r.at+.08));if(t<r.at)return;
      const on=cur.includes(i),op=on?1:.42,yy=L.y0+L.rh*i,by=N?yy+22:yy+6,bh=N?18:18,col=TR_COL[r.cmp];
      s+=`<g style="opacity:${op}">`;
      if(N){s+=`<text x="${L.lx}" y="${yy+12}" class="t-lbl" style="font-size:12px">${r.n} <tspan class="t-xs">${r.y} · ${r.d}</tspan></text>`;
        s+=`<text x="${L.lx}" y="${yy+54}" class="t-xs">${r.g}</text>`}
      else{s+=`<text x="${L.lx}" y="${yy+14}" class="t-lbl" style="font-size:12.5px">${r.n} <tspan class="t-xs">${r.y}</tspan></text><text x="${L.lx}" y="${yy+27}" class="t-xs">${r.d} · ${r.g}</text>`}
      const bar=(X,x0,v,lo,txt,bx)=>{let q='';
        if(typeof v==='string'){q+=`<text x="${f1(X(0)+4)}" y="${f1(by+13)}" class="t-xs" style="fill:var(--ink)">${v==='kept'?(bx?'most <30':'kept at ETI level'):''}</text>`;return q}
        if(v==null){q+=`<text x="${f1(X(0)+4)}" y="${f1(by+13)}" class="t-xs">not in sources</text>`;return q}
        const hi=Array.isArray(v)?v[1]:v,lw=Array.isArray(v)?v[0]:null,vv=hi*g;
        q+=`<rect x="${f1(X(0))}" y="${by}" width="${f1(Math.max(1.5,X(vv)-X(0)))}" height="${bh}" rx="4" style="fill:${col};opacity:${lw!=null?.45:.85}"/>`;
        if(lw!=null)q+=`<rect x="${f1(X(0))}" y="${by}" width="${f1(Math.max(1.5,X(Math.min(lw,vv))-X(0)))}" height="${bh}" rx="4" style="fill:${col};opacity:.85"/>`;
        const F=z=>Number.isInteger(z)?z.toFixed(1):String(z);const lab=lw!=null?(g>.98?(bx?`${F(lw)} to −${F(hi)}`:`${F(lw)}–${F(hi)}`):f1(vv)):(g>.98?F(hi):f1(vv));
        q+=`<text x="${f1(X(vv)+5)}" y="${f1(by+13)}" class="t-sm" style="fill:var(--ink);font-weight:600">${bx&&lab!=='0.0'?'−':(bx?'':'+')}${lab}</text>`;return q};
      s+=bar(FX,L.fx,r.fev,null,'',false)+bar(SX,L.sx,r.sw,null,'',true);
      if(r.n.startsWith('SKY')&&g>.9)s+=`<text x="${f1(FX(3.4))}" y="${f1(by+13)}" class="t-xs" style="fill:var(--dx)">non-inferior to ETI</text>`;
      s+=`</g>`});
    /* legend */
    const ly=N?bot+34:bot+30;[['pbo','vs placebo'],['act',N?'vs a modulator':'vs another modulator'],['pre','before vs after']].forEach((q,i)=>{const lx=L.lx+(N?[0,112,240]:[0,170,340])[i];
      s+=`<rect x="${lx}" y="${ly-9}" width="12" height="10" rx="2" style="fill:${TR_COL[q[0]]}"/><text x="${lx+17}" y="${ly}" class="t-xs" style="fill:var(--ink)">${q[1]}</text>`});
    svg.innerHTML=s;rg.setAttribute('aria-valuetext',P.t);note.innerHTML=noteHTML(P);setSt(p)}
  const stop=playWire(rg,$('#trPlay'),draw,26000,'Replay','trials');
  setSt=stepWire($('#trSteps'),TR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- eligibility teaching tool ---------- */
  const gs=$('#trGeno'),as=$('#trAgeSel'),out=$('#trOut'),ag=$('#trAge');
  const V={yes:'Fits the label as summarised here',maybe:'Depends on the label’s variant table',no:'Not indicated as labelled'};
  function elig(){const G=TR_ELIG[gs.value],A=TR_AGE[as.value];
    out.innerHTML=TR_PROD.map(P=>{let [v,why]=G[P.k];if(A[0]<P.min){v='no';why=`Below the youngest age on the label (${P.minT}) ${P.c}.`}
      return `<div class="card"><h4>${P.n}</h4><p class="t-d">${P.d} · from ${P.minT}</p><div class="verdict ${v}">${V[v]}</div><p>${why}</p></div>`}).join('');
    drawAge(A[0])}
  function drawAge(m){const N=vb(ag,'720 230','400 300'),x=N?110:170,w=N?272:520;
    const T=[[0,'0'],[1,'1 mo'],[12,'1 y'],[24,'2 y'],[72,'6 y'],[144,'12 y'],[216,'18 y']],X=v=>{for(let i=1;i<T.length;i++)if(v<=T[i][0]){const a=T[i-1],b=T[i];return x+w*((i-1)+(v-a[0])/(b[0]-a[0]))/(T.length-1)}return x+w};
    let s=`<text x="${N?12:16}" y="22" class="t-lbl">Youngest age on each US label</text><text x="${N?12:16}" y="38" class="t-xs">bar = ages the label covers; line = the age you chose (axis not to scale)</text>`;
    const rh=N?38:30,y0=56;
    TR_PROD.forEach((P,i)=>{const yy=y0+i*rh,ok=m>=P.min;
      s+=`<text x="${x-10}" y="${yy+14}" class="t-sm t-end" style="fill:var(--ink)">${P.n}</text>`;
      s+=`<rect x="${f1(X(P.min))}" y="${yy+3}" width="${f1(x+w-X(P.min))}" height="15" rx="4" style="fill:${ok?'var(--rx)':'var(--panel-2)'};opacity:${ok?.8:1}"/><text x="${f1(X(P.min)-4)}" y="${yy+14}" class="t-xs t-end">${P.minT}</text>`});
    const by=y0+TR_PROD.length*rh+6;
    T.forEach(q=>{s+=`<line x1="${f1(X(q[0]))}" x2="${f1(X(q[0]))}" y1="${by}" y2="${by+5}" class="axis"/><text x="${f1(X(q[0]))}" y="${by+17}" class="t-xs t-mid">${q[1]}</text>`});
    s+=`<line x1="${x}" x2="${x+w}" y1="${by}" y2="${by}" class="axis"/>`;
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${y0-4}" y2="${by}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:4 3"/>`;
    ag.innerHTML=s}
  gs.addEventListener('change',elig);as.addEventListener('change',elig);elig();
};
