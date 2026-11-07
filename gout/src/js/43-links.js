/* =============== 4.3 gout, kidneys & heart =============== */
const LK_STEPS=[
 {from:0,at:.12,k:'Scene 1 · Kidney',t:'CKD raises urate, and gout is common in CKD',f:[1,2],e0:2,
  txt:`Reduced kidney function raises serum urate, so CKD drives hyperuricaemia and gout. [[Johnson2018]] A meta-analysis of 17 observational studies found CKD stage ≥ 3 in 24% of people with gout, with a pooled adjusted OR of 2.41. [[Roughley2015]] Seen from the other side, 24.3% of 5,085 people in the German CKD cohort reported gout, rising from 16.0% at eGFR ≥ 60 to 35.6% below 30 mL/min/1.73 m². [[Jing2015]] Whether urate itself injures the kidney is unsettled: Mendelian randomisation found no causal effect on eGFR or CKD. [[Jordan2019]]`,
  pt:`About one person in four with gout has kidney disease, and about one in four with kidney disease has gout. Weak kidneys hold on to urate.`,
  hook:`CKD → high urate is established; urate → CKD is a <b>hypothesis</b>. CKD ≥ 3 in gout <b>24%</b>; gout in CKD <b>24.3%</b>.`},
 {from:.3,at:.42,k:'Scene 2 · Stones',t:'Uric acid stones',f:[3,0],e0:3,
  txt:`Self-reported kidney stones were found in 14% of people with gout (pooled OR 1.77). [[Roughley2015]] In 51,529 men, gout roughly doubled the risk of new stones (RR 2.12), while a history of stones did not raise the risk of gout (RR 1.05). [[Kramer2003]] Uric acid stones are about 10% of all stones. Below a urine pH of 5.5 almost all uric acid is undissociated and the urine becomes supersaturated; persistently low pH, high urinary uric acid and low urine volume drive them. [[AbouElela2017]] Urine pH falls as body weight rises. [[Maalouf2004]] Of 136 outcomes studied for urate, only gout and kidney stones had convincing evidence of a causal role. [[Li2017]]`,
  pt:`Gout makes kidney stones about twice as likely. Acid urine lets uric acid come out of solution and clump into stones.`,
  hook:`Uric acid stones form in persistently acidic urine (<b>pH &lt; 5.5</b>). Urate → stones and urate → gout are the two convincing causal links.`},
 {from:.55,at:.7,k:'Scene 3 · Heart',t:'Flares and cardiovascular events',f:[5,6,4],e0:6,
  txt:`In 62,574 people with gout in English primary care, heart attacks and strokes ran at 2.49 per 1000 person-days in the 60 days after a flare, 2.16 in days 61–120 and 1.70 in days 121–180, against 1.32 in reference periods. People with a cardiovascular event had higher odds of a flare in the previous 60 days (OR 1.93), but not 121–180 days before (OR 1.06). [[Cipolletta2022]] Over the long term, gout carries higher cardiovascular mortality (HR 1.29) and coronary mortality (HR 1.42). [[Clarson2015]] Mendelian randomisation does not support urate itself as the cause. [[Keenan2016,White2016]]`,
  pt:`In the two months after a flare, the chance of a heart attack or stroke goes up for a while. It then settles back down.`,
  hook:`Flare → CV event odds about double in the next 60 days (<b>OR 1.93</b>) and are back to baseline by 121–180 days (<b>OR 1.06</b>).`},
 {from:.8,at:.95,k:'Scene 4 · Does treating help?',t:'What the trials show',f:[2,4,5],e0:5,
  txt:`Allopurinol did not slow CKD in CKD-FIX or PERL, and FEATHER (febuxostat) missed its primary endpoint. [[Badve2020,Doria2020,Kimura2018]] In ALL-HEART, allopurinol did not reduce MACE in ischaemic heart disease (HR 1.04). [[Mackenzie2022]] Across 28 trials, urate lowering did not reduce kidney failure, MACE or death. [[Chen2020]] Low-dose colchicine cut cardiovascular events in COLCOT (HR 0.77) and LoDoCo2 (HR 0.69) but not in CLEAR SYNERGY (HR 0.99). [[Tardif2019,Nidorf2020,Jolly2025]] KDIGO 2024 suggests not lowering urate in CKD without gout to slow the kidney's decline. [[KDIGO2024]]`,
  pt:`Lowering urate treats gout, but it has not been shown to protect the kidneys or heart in people without gout. A low dose of colchicine helped the heart in two of three big trials.`,
  hook:`Association is not causation: allopurinol did not slow CKD in <b>CKD-FIX</b> or <b>PERL</b>, or prevent MACE in <b>ALL-HEART</b>.`}
];
/* the network. w = wide position, r = radius. Narrow mode lists the links instead. */
const LK_N={
 urate:{w:[78,214],r:30,l:['Serum','urate'],nn:'Serum urate',c:'gold'},
 gout:{w:[232,214],r:38,l:['Gout'],nn:'Gout',c:'terra'},
 ckd:{w:[78,74],r:30,l:['CKD'],nn:'CKD',sub:'chronic kidney disease',sy:-1},
 stones:{w:[360,74],r:30,l:['Kidney','stones'],nn:'Kidney stones'},
 htn:{w:[400,214],r:32,l:['High blood','pressure'],nn:'High BP'},
 cvd:{w:[360,354],r:30,l:['Heart &amp;','vessels'],nn:'Heart &amp; vessels',sub:'cardiovascular disease',sy:1},
 met:{w:[78,354],r:32,l:['Metabolic','syndrome'],nn:'Metabolic synd.',sub:'obesity · diabetes',sy:1}
};
const LK_EV={est:['Established','var(--good)','est'],early:['Early evidence','var(--warn)','early'],hyp:['Hypothesis','var(--crocus)','hyp']};
const LK_E=[
 {a:'urate',b:'gout',arr:1,lt:.5,m:'OR 3.41–6.04',src:'Jordan 2019 · MR, per 1 mg/dL',s:'est',q:'Urate → gout',
  d:`In Mendelian randomisation, genetically higher urate strongly predicted gout: OR 3.41 to 6.04 per 1 mg/dL [59.48 µmol/L], the positive control that showed the method worked. [[Jordan2019]] A second study gave OR 5.84 per standard deviation. [[Keenan2016]] An umbrella review of 136 outcomes found convincing evidence of a causal role for urate only in gout and kidney stones. [[Li2017]]`},
 {a:'ckd',b:'urate',arr:1,lt:.5,m:'gout 16.0→35.6%',src:'Jing 2015 · eGFR ≥60 → <30',s:'est',q:'CKD → urate',
  d:`Reduced kidney function raises serum urate: this direction is not in doubt. [[Johnson2018]] In the German CKD cohort, self-reported gout rose from 16.0% at eGFR ≥ 60 to 35.6% below 30 mL/min/1.73 m² (prevalence ratio 1.46). Of those with gout, 30.7% took no gout medicine, and 47.2% of those on urate-lowering therapy were still hyperuricaemic. [[Jing2015]] In Framingham, CKD carried an adjusted HR for gout of 1.88 in men and 2.31 in women. [[Wang2015]]`},
 {a:'gout',b:'ckd',lt:.45,m:'OR 2.41',src:'Roughley 2015 · 17 studies',s:'hyp',q:'Gout ↔ CKD',
  d:`Gout is associated with CKD (pooled adjusted OR 2.41, 1.86–3.11), and 24% of people with gout have CKD stage ≥ 3. [[Roughley2015]] People with new gout developed CKD stage ≥ 3 at 28.6 vs 15.8 per 10,000 person-years (adjusted HR 1.78), and advanced CKD at HR 1.29, highest for end-stage kidney disease (HR 2.13). [[Roughley2018,Stack2019]] Causation is a hypothesis: Mendelian randomisation found no effect of urate on eGFR or CKD despite an observational OR of 1.48 per 1 mg/dL, and allopurinol did not slow CKD in two trials. [[Jordan2019,Badve2020,Doria2020]] Starting allopurinol at ≥ 300 mg/day was not linked to kidney harm (HR 0.87 for CKD ≥ 3). [[VargasSantos2018]]`},
 {a:'gout',b:'stones',lt:.5,m:'OR 1.77',src:'Roughley 2015 · pooled',s:'est',q:'Gout ↔ kidney stones',
  d:`Lifetime stones were reported by 14% of people with gout (pooled adjusted OR 1.77). [[Roughley2015]] In 51,529 men, 15% with gout had a stone history against 8% without, and confirmed gout raised the risk of new stones (RR 2.12). [[Kramer2003]] Here causation is established: the umbrella review counts stones and gout as the only convincing causal outcomes of urate. [[Li2017]] Allopurinol prevented recurrent calcium oxalate stones in people with high urinary uric acid (0.12 vs 0.26 events per patient-year). [[Ettinger1986]]`},
 {a:'gout',b:'htn',lt:.5,m:'RR 2.31',src:'Choi 2005 · hypertension → gout',s:'hyp',q:'Gout ↔ high blood pressure',
  d:`Hypertension raises the risk of gout (RR 2.31), and so do diuretics (RR 1.77). [[Choi2005]] High urate predicts new hypertension in 18 cohorts (RR 1.41; 1.13 per 1 mg/dL), more so in younger people. [[Grayson2011]] In 30 adolescents, allopurinol lowered blood pressure in a small 4-week crossover trial that its authors called preliminary. [[Feig2008]] Mendelian randomisation in 68,674 Danes found no causal link between urate and blood pressure, but did find that BMI raises urate, so weight may confound the observational link. [[Palmer2013]] Across 28 trials, urate lowering lowered systolic pressure by 3.45 mm Hg. [[Chen2020]]`},
 {a:'gout',b:'cvd',lt:.5,m:'HR 1.29',src:'Clarson 2015 · CVD death',s:'hyp',q:'Gout ↔ cardiovascular disease',
  d:`In 6 studies of 223,448 people, gout raised cardiovascular mortality (HR 1.29) and coronary mortality (HR 1.42). [[Clarson2015]] In 51,297 men, gout carried RR 1.55 for fatal coronary disease, and in MRFIT the odds of a heart attack were 1.26 times higher, holding without diuretics, alcohol, diabetes or obesity. [[Choi2007Circ,Krishnan2006]] Causation by urate is a hypothesis: urate-specific and pleiotropy-robust Mendelian randomisation is null for coronary disease, and allopurinol did not reduce MACE in ALL-HEART. [[Keenan2016,White2016,Mackenzie2022]]`},
 {a:'gout',b:'cvd',arr:1,cv:[226,346],lt:.5,m:'flare OR 1.93',src:'Cipolletta 2022 · 0–60 days',s:'early',q:'Gout flare → CV event',na:'Gout flare',
  d:`Cardiovascular events cluster after flares. The odds of a flare in the 0–60 days before a heart attack or stroke were 1.93, and 1.57 for days 61–120. Event rates were 2.49, 2.16 and 1.70 per 1000 person-days in the three windows after a flare, against 1.32 at other times; two study designs agreed. [[Cipolletta2022]] This points to inflammation rather than urate: in people starting urate-lowering therapy, colchicine prophylaxis was linked to fewer heart attacks and strokes (HR 0.82). Both findings are observational. [[Cipolletta2025]]`},
 {a:'met',b:'urate',arr:1,lt:.5,m:'BMI raises urate',src:'Palmer 2013 · MR',s:'early',q:'Weight → urate',
  d:`Mendelian randomisation found that higher BMI causally raises urate (+0.03 mmol/L per 4 BMI units; +7.5% risk of hyperuricaemia). [[Palmer2013]] Gout risk rises by RR 1.55 per 5 BMI units in a meta-analysis of 10 prospective studies. [[Aune2014]] Urine pH also falls as weight rises, which favours uric acid stones. [[Maalouf2004]]`},
 {a:'gout',b:'met',lt:.3,m:'OR 3.05',src:'Choi 2007 · NHANES III',s:'early',q:'Gout ↔ metabolic syndrome',
  d:`Metabolic syndrome was present in 62.8% of people with gout against 25.4% without (age- and sex-adjusted OR 3.05), about 3.5 million US adults. [[Choi2007AR]] In NHANES 2007–2008, 53% of adults with gout were obese and 26% had diabetes. [[Zhu2012]] In high-risk men, gout at baseline carried RR 1.34 for new type 2 diabetes, 1.26 after adjusting for urate. [[Choi2008Rheum]]`}
];
inits.links=()=>{
  const svg=$('#lkSvg'),rg=$('#lkT');let mode='assoc',sel=null,selP=-1;
  const curE=p=>(sel!=null&&selP===p)?sel:LK_STEPS[p].e0;
  /* wide geometry: each link starts and ends at the node circles */
  const GEO=LK_E.map(e=>{const A=LK_N[e.a],B=LK_N[e.b],[ax,ay]=A.w,[bx,by]=B.w,gap=e.arr?5:2;
    if(e.cv){const [cx,cy]=e.cv,ua=Math.atan2(cy-ay,cx-ax),ub=Math.atan2(cy-by,cx-bx);
      const p0=[ax+A.r*Math.cos(ua),ay+A.r*Math.sin(ua)],p2=[bx+(B.r+gap)*Math.cos(ub),by+(B.r+gap)*Math.sin(ub)];
      const at=u=>[(1-u)*(1-u)*p0[0]+2*(1-u)*u*cx+u*u*p2[0],(1-u)*(1-u)*p0[1]+2*(1-u)*u*cy+u*u*p2[1]];
      return {d:`M${f1(p0[0])} ${f1(p0[1])}Q${cx} ${cy} ${f1(p2[0])} ${f1(p2[1])}`,at}}
    const L=Math.hypot(bx-ax,by-ay),ux=(bx-ax)/L,uy=(by-ay)/L,p0=[ax+ux*A.r,ay+uy*A.r],p1=[bx-ux*(B.r+gap),by-uy*(B.r+gap)];
    return {d:`M${f1(p0[0])} ${f1(p0[1])}L${f1(p1[0])} ${f1(p1[1])}`,at:u=>[lerp(p0[0],p1[0],u),lerp(p0[1],p1[1],u)]}});
  const MK={'var(--muted)':'lkMm','var(--terra)':'lkMt','var(--good)':'lkMg','var(--crocus)':'lkMc','var(--warn)':'lkMw','var(--gold)':'lkMo'};
  /* arrowheads in user units, so a thick selected link does not grow a giant head */
  const defs=()=>`<defs>${Object.entries(MK).map(([c,id])=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${c}"/></marker>`).join('')}</defs>`;
  const ecol=(e,i,foc)=>mode==='cause'?LK_EV[e.s][1]:(foc.has(i)?'var(--terra)':'var(--muted)');
  const dash=e=>mode!=='cause'?'':e.s==='hyp'?';stroke-dasharray:6 4':e.s==='early'?';stroke-dasharray:2 4':'';
  const pill=(x,y,txt,col,fill='var(--panel)',w)=>{w=w||txt.replace(/&[a-z]+;/g,'&').length*5.8+12;return `<rect class="lk-pill" x="${f1(x-w/2)}" y="${f1(y-9)}" width="${f1(w)}" height="18" rx="9" style="fill:${fill};stroke:${col};stroke-width:1.3"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:${col};font-weight:600">${txt}</text>`};
  /* ---------- the scene panels ---------- */
  function panel(p,t,X,Y,W){
    let s='';const T=(y,txt,cls='t-sm',st='')=>`<text x="${X}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
    const bar=(y,v,mx,col,lbl,src,val,k)=>{const w=W*v/mx*k;let b=`<text x="${X}" y="${y}" class="t-lbl" style="font-size:12px">${lbl}</text>`;if(src)b+=`<text x="${X}" y="${y+13}" class="t-xs">${src}</text>`;const by=y+(src?18:6);
      return b+`<rect x="${X}" y="${by}" width="${W}" height="13" rx="4" style="fill:var(--panel-2)"/><rect x="${X}" y="${by}" width="${f1(w)}" height="13" rx="4" style="fill:${col}"/><text x="${f1(X+w+6)}" y="${by+10.5}" class="t-xs" style="fill:${col};font-weight:700;opacity:${f1(ramp(k,.4,1))}">${val}</text>`};
    if(p===0){const k=ease(ramp(t,0,.1)),k2=ease(ramp(t,.02,.12));
      s+=T(Y,'ONE IN FOUR, BOTH WAYS','t-sm','fill:var(--terra)');
      s+=bar(Y+24,24,50,'var(--terra)','CKD stage ≥3 in people with gout','Roughley 2015 · 17 studies','24%',k);
      s+=bar(Y+74,24.3,50,'var(--terra)','Gout in people with CKD','Jing 2015 · German CKD cohort, 5,085','24.3%',k2);
      s+=T(Y+138,'GOUT BY KIDNEY FUNCTION · Jing 2015','t-sm');
      s+=bar(Y+158,16.0,50,'var(--gold)','eGFR ≥ 60 mL/min/1.73 m²','','16.0%',k);
      s+=bar(Y+196,35.6,50,'var(--gold)','eGFR &lt; 30 mL/min/1.73 m²','','35.6%',k2);
      const L=['Low kidney function raises urate:','established. Urate harming the kidney:','not supported by MR or trials.'];
      L.forEach((l,i)=>s+=T(Y+248+i*14,l,'t-xs','fill:var(--ink)'));
      s+=T(Y+302,'New CKD ≥3: HR 1.78 · Roughley 2018','t-xs');
      s+=T(Y+316,'Advanced CKD: HR 1.29 · Stack 2019','t-xs');}
    else if(p===1){const k=ease(ramp(t,.3,.42)),ph=lerp(6.3,5.1,k),px=v=>X+W*(v-4.5)/2.5,R=rng(17);
      s+=T(Y,'URINE pH AND URIC ACID','t-sm','fill:var(--terra)');
      s+=`<rect x="${X}" y="${Y+30}" width="${W}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${X}" y="${Y+30}" width="${f1(px(5.5)-X)}" height="14" rx="4" style="fill:var(--gold-soft);stroke:var(--gold)"/>`;
      [4.5,5,5.5,6,6.5,7].forEach(v=>s+=`<text x="${f1(px(v))}" y="${Y+58}" class="t-xs ${v===4.5?'':v===7?'t-end':'t-mid'}">${v}</text>`);
      s+=`<line x1="${f1(px(5.5))}" x2="${f1(px(5.5))}" y1="${Y+24}" y2="${Y+48}" style="stroke:var(--gold);stroke-width:2"/>`;
      s+=`<path d="M${f1(px(ph))} ${Y+28}l-6 -9h12z" style="fill:var(--ink)"/><text x="${f1(clamp(px(ph),X+72,X+W-72))}" y="${Y+14}" class="t-xs t-mid" style="fill:var(--ink)">urine pH ${ph.toFixed(1)} (schematic)</text>`;
      s+=T(Y+72,'below 5.5, uric acid comes out of solution','t-xs','fill:var(--gold)');
      /* crystals clump into a stone as the pH falls below 5.5 */
      const n=Math.round(26*ramp(5.5-ph,0,.4)),cx=X+W/2,cy=Y+106;
      s+=`<ellipse cx="${f1(cx)}" cy="${cy}" rx="${f1(W/2-4)}" ry="24" style="fill:var(--field);stroke:var(--line)"/><text x="${X+8}" y="${cy+4}" class="t-xs">urine</text>`;
      for(let i=0;i<26;i++){const a=R()*Math.PI*2,rr=4+15*Math.sqrt(R()),sx=cx+30+rr*1.4*Math.cos(a),sy=cy+rr*.8*Math.sin(a),rot=R()*180;
        if(i<n)s+=`<rect x="-3" y="-3" width="6" height="6" transform="translate(${f1(sx)} ${f1(sy)}) rotate(${f1(rot)})" style="fill:var(--gold);opacity:.85"/>`}
      s+=bar(Y+150,14,30,'var(--terra)','Lifetime stones, people with gout','Roughley 2015 · pooled','14%',k);
      s+=bar(Y+200,15,30,'var(--terra)','Stone history, men with gout','Kramer 2003 · 51,529 men','15%',k);
      s+=bar(Y+246,8,30,'var(--muted)','Men without gout','','8%',k);
      s+=T(Y+286,'New stones: RR 2.12 · Kramer 2003','t-xs');
      s+=T(Y+300,'Uric acid stones: about 10% of all stones','t-xs');
      s+=T(Y+314,'pH falls as weight rises: 6.09 → 5.91','t-xs');}
    else if(p===2){const k=ramp(t,.55,.7),y0=Y+200,H=150,yv=v=>y0-H*v/3,bw=W/5-8;
      const B=[['before',1.32,'var(--muted)',''],['0–60 d',2.49,'var(--terra)','OR 1.93'],['61–120',2.16,'var(--terra)','1.57'],['121–180',1.70,'var(--terra)','1.06'],['181–540',1.32,'var(--muted)','']];
      s+=T(Y,'CV EVENTS AFTER A FLARE','t-sm','fill:var(--terra)');
      s+=T(Y+15,'MI or stroke per 1000 person-days','t-xs');s+=T(Y+28,'Cipolletta 2022 · 62,574 people','t-xs');
      [0,1,2,3].forEach(v=>s+=`<line x1="${X}" x2="${X+W}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X+W}" y="${f1(yv(v)-3)}" class="t-xs t-end">${v}</text>`);
      B.forEach(([l,v,c,o],i)=>{const ki=ease(ramp(k,i*.17,i*.17+.3)),x=X+4+i*(bw+8),h=H*v/3*ki;
        s+=`<rect x="${f1(x)}" y="${f1(y0-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:${c};opacity:${i===0||i===4?.55:.9}"/>`;
        if(ki>.5)s+=`<text x="${f1(x+bw/2)}" y="${f1(y0-h-5)}" class="t-xs t-mid" style="fill:${c};font-weight:700">${v.toFixed(2)}</text>`;
        s+=`<text x="${f1(x+bw/2)}" y="${y0+14}" class="t-xs t-mid">${l}</text>`;
        if(o)s+=`<text x="${f1(x+bw/2)}" y="${y0+44}" class="t-xs t-mid" style="fill:var(--terra);opacity:${f1(ki)}">${o}</text>`});
      s+=`<line x1="${X}" x2="${X+W}" y1="${f1(yv(1.32))}" y2="${f1(yv(1.32))}" style="stroke:var(--ink);stroke-dasharray:4 3;opacity:.6"/>`;
      const fx=X+4+bw+4;s+=`<line x1="${f1(fx)}" x2="${f1(fx)}" y1="${Y+40}" y2="${y0}" style="stroke:var(--terra);stroke-width:1.6"/><text x="${f1(fx+4)}" y="${Y+50}" class="t-xs" style="fill:var(--terra)">flare</text>`;
      s+=T(y0+30,'odds of a flare before an event:','t-xs');
      s+=T(y0+76,'Long term: CVD death HR 1.29,','t-xs','fill:var(--ink)');
      s+=T(y0+90,'coronary death HR 1.42 · Clarson 2015','t-xs','fill:var(--ink)');
      s+=T(y0+108,'Observational; two designs agree.','t-xs');}
    else{const k=ease(ramp(t,.8,.95));
      const lx=v=>X+W*(Math.log(v/.5)/Math.log(3)),ly=v=>X+W*(v+2)/4;
      s+=T(Y,'DOES TREATING HELP?','t-sm','fill:var(--terra)');
      s+=T(Y+18,'MACE · hazard ratio (log scale)','t-xs','fill:var(--ink)');
      const FA=[['COLCOT · colchicine',.77,.61,.96,'var(--crocus)'],['LoDoCo2 · colchicine',.69,.57,.83,'var(--crocus)'],['CLEAR SYNERGY · colchicine',.99,.85,1.16,'var(--crocus)'],['ALL-HEART · allopurinol',1.04,.89,1.21,'var(--sea)']];
      const FB=[['CKD-FIX · allopurinol',-.10,-1.18,.97,'var(--sea)','−0.10'],['PERL · allopurinol (GFR)',.001,-1.9,1.9,'var(--sea)','0.001'],['FEATHER · febuxostat',.70,-.21,1.62,'var(--sea)','0.70']];
      const forest=(y0,rows,sx,ref,fmt)=>{let f=`<line x1="${f1(sx(ref))}" x2="${f1(sx(ref))}" y1="${y0-4}" y2="${y0+rows.length*30}" class="axis"/>`;
        rows.forEach((r,i)=>{const y=y0+i*30,ki=ease(clamp(k*1.6-i*.15));
          f+=`<text x="${X}" y="${y+6}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><text x="${X+W}" y="${y+6}" class="t-xs t-end" style="fill:${r[4]};font-weight:700">${fmt(r)}</text>`;
          f+=`<g style="opacity:${f1(ki)}"><line x1="${f1(sx(r[2]))}" x2="${f1(sx(r[3]))}" y1="${y+16}" y2="${y+16}" style="stroke:${r[4]};stroke-width:2"/><rect x="${f1(sx(r[1])-5)}" y="${y+11}" width="10" height="10" style="fill:${r[4]}"/></g>`});return f};
      s+=forest(Y+32,FA,lx,1,r=>r[1].toFixed(2));
      [.5,1,1.5].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${Y+162}" class="t-xs ${v===.5?'':v===1.5?'t-end':'t-mid'}">${v}</text>`);
      s+=T(Y+176,'← fewer events with the drug','t-xs');
      s+=T(Y+200,'Kidney · eGFR difference per year','t-xs','fill:var(--ink)');
      s+=forest(Y+214,FB,ly,0,r=>r[5]);
      [-2,0,2].forEach(v=>s+=`<text x="${f1(ly(v))}" y="${Y+314}" class="t-xs ${v===-2?'':v===2?'t-end':'t-mid'}">${v>0?'+'+v:v===0?'0':'−'+(-v)}</text>`);
      s+=T(Y+328,'mL/min/1.73 m² · better with the drug →','t-xs');}
    return s;
  }
  /* ---------- the network (wide) ---------- */
  function net(t,p,foc,ce){
    let s=`<text x="16" y="20" class="t-sm">THE LINKS · click one to read it</text>`;
    const hot=new Set();foc.forEach(i=>{hot.add(LK_E[i].a);hot.add(LK_E[i].b)});
    LK_E.forEach((e,i)=>{const g=GEO[i],c=ecol(e,i,foc),f=foc.has(i),on=i===ce,mid=g.at(e.lt);
      const mkE=(e.arr||mode==='cause')?` marker-end="url(#${MK[c]})"`:'';
      s+=`<g class="clk" data-lke="${i}"><path class="lk-hit" d="${g.d}" style="fill:none;stroke:transparent;stroke-width:16"/>`;
      s+=`<path d="${g.d}" style="fill:none;stroke:${c};stroke-width:${on?3.4:f?2.4:1.5};opacity:${on||f?1:.55}${dash(e)}"${mkE}/>`;
      if(f)for(let j=0;j<3;j++){const u=(t*24+j/3+i*.13)%1,[x,y]=g.at(u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:${c};opacity:${f1(.9*bump(u,0,1))}"/>`}
      const txt=mode==='cause'?LK_EV[e.s][0]:e.m;
      s+=pill(mid[0],mid[1],txt,on||f||mode==='cause'?c:'var(--muted)',on?'var(--terra-soft)':'var(--panel)');
      if(p===3&&(i===2||i===5)){s+=`<text x="${i===5?f1(mid[0]+42):118}" y="${i===5?f1(mid[1]+4):104}" class="t-xs" style="fill:var(--crocus);font-weight:700">${i===2?'CKD-FIX, PERL: null':'ALL-HEART: null'}</text>`}
      s+=`</g>`});
    Object.entries(LK_N).forEach(([k,n])=>{const [x,y]=n.w,h=hot.has(k);
      const fill=n.c?`var(--${n.c}-soft)`:'var(--panel-2)',st=n.c?`var(--${n.c})`:(h?'var(--ink)':'var(--muted)');
      if(k==='gout'&&p===2){const b=bump((t*6)%1,0,1);s+=`<circle cx="${x}" cy="${y}" r="${f1(n.r+4+10*b)}" style="fill:none;stroke:var(--terra);stroke-width:2;opacity:${f1(.7*(1-b))}"/>`}
      s+=`<circle cx="${x}" cy="${y}" r="${n.r}" style="fill:${fill};stroke:${st};stroke-width:${h?2.4:1.4}"/>`;
      const L=n.l;L.forEach((l,j)=>s+=`<text x="${x}" y="${f1(y+4-(L.length-1)*6.5+j*13)}" class="t-lbl t-mid" style="font-size:${k==='gout'?15:11}px">${l}</text>`);
      if(n.sub)s+=`<text x="${x}" y="${n.sy<0?y-n.r-7:y+n.r+13}" class="t-xs t-mid">${n.sub}</text>`});
    return s;
  }
  /* ---------- the list (narrow): each link is a row, from → to ---------- */
  const NTOP=56,NROW=50;
  function list(t,p,foc,ce){
    let s=`<text x="16" y="20" class="t-sm">THE LINKS · tap one to read it</text><text x="16" y="36" class="t-xs">from → to · association · causation label</text>`;
    LK_E.forEach((e,i)=>{const y=NTOP+i*NROW,c=ecol(e,i,foc),f=foc.has(i),on=i===ce,A=LK_N[e.a],B=LK_N[e.b];
      s+=`<g class="clk" data-lke="${i}"><rect x="8" y="${y-15}" width="384" height="${NROW-6}" rx="9" style="fill:${on?'var(--terra-soft)':f?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'}"/>`;
      const both=!e.arr&&mode!=='cause';
      s+=pill(70,y,e.na||A.nn,A.c?`var(--${A.c})`:'var(--ink)','var(--panel)',108);
      s+=`<line x1="${both?130:126}" x2="${both?162:166}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:${f||on?2.4:1.6}${dash(e)}" marker-end="url(#${MK[c]})"${both?` marker-start="url(#${MK[c]})"`:''}/>`;
      s+=pill(224,y,B.nn,B.c?`var(--${B.c})`:'var(--ink)','var(--panel)',108);
      const ev=LK_EV[e.s];s+=pill(334,y,ev[0],ev[1],'var(--panel)',92);
      s+=`<text x="20" y="${y+21}" class="t-xs" style="fill:${f||on?'var(--ink)':'var(--muted)'}"><tspan style="font-weight:700;fill:${f||on?'var(--terra)':'var(--muted)'}">${e.m}</tspan> · ${e.src.replace('<','&lt;')}</text>`;
      if(f)for(let j=0;j<2;j++){const u=(t*24+j/2+i*.13)%1;s+=`<circle cx="${f1(lerp(132,162,u))}" cy="${y}" r="2.6" style="fill:${c};opacity:${f1(bump(u,0,1))}"/>`}
      s+=`</g>`});
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 420','400 870'),p=phaseOf(LK_STEPS,t),S=LK_STEPS[p],ce=curE(p),foc=new Set(S.f);foc.add(ce);
    let s=defs();
    if(!N){s+=net(t,p,foc,ce);s+=`<line x1="448" x2="448" y1="10" y2="410" class="axis"/>`;s+=panel(p,t,462,24,246)}
    else{s+=list(t,p,foc,ce);const Y=NTOP+LK_E.length*NROW+8;s+=`<line x1="8" x2="392" y1="${Y-10}" y2="${Y-10}" class="axis"/>`;s+=panel(p,t,16,Y+16,368)}
    svg.innerHTML=s;
    setSt(p);
    const e=LK_E[ce],ev=LK_EV[e.s];
    $('#lkNote').innerHTML=noteHTML(S)+`<dl class="kv"><div><dt>Selected link · ${e.q} · <span class="ev ${ev[2]}">${ev[0]}</span></dt><dd><b>${e.m.replace('<','&lt;')}</b> (${e.src.replace('<','&lt;')}). ${e.d}</dd></div></dl>`;
    $$('[data-lke]',$('#lkEdges')).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.lke===ce));
  }
  const stop=playWire(rg,$('#lkPlay'),draw,22000,'Replay','links');
  const setSt=stepWire($('#lkSteps'),LK_STEPS,rg,draw,stop);
  $('#lkSteps').addEventListener('click',()=>{sel=null},true);
  $('#lkEdges').innerHTML=LK_E.map((e,i)=>`<button class="btn" data-lke="${i}" aria-pressed="false">${e.q}</button>`).join('');
  const pick=i=>{sel=i;selP=phaseOf(LK_STEPS,+rg.value);draw(+rg.value)};
  $('#lkEdges').addEventListener('click',ev=>{const b=ev.target.closest('[data-lke]');if(b)pick(+b.dataset.lke)});
  svg.addEventListener('click',ev=>{const g=ev.target.closest('[data-lke]');if(g)pick(+g.dataset.lke)});
  $$('[data-lkm]').forEach(b=>b.onclick=()=>{mode=b.dataset.lkm;$$('[data-lkm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---------- comorbidity bars (NHANES) ---------- */
  const cs=$('#lkCom');
  const LK_COM=[['High blood pressure',74,66],['CKD stage ≥ 2',71,86],['Obesity',53,65],['Diabetes',26,33],['Kidney stones',24,null],['Heart attack (MI)',14,23],['Heart failure',11,33],['Stroke',10,12]];
  let cm='gout',cv=LK_COM.map(()=>0).concat([0,0]),stopC=null;
  const target=m=>LK_COM.map(r=>m==='gout'?r[1]:(r[2]==null?0:r[2])).concat([62.8,25.4]);
  function drawC(){
    const N=vb(cs,'720 390','400 550');
    const BX0=N?16:236,BX1=N?330:640,RH=N?44:30,Y0=N?58:50;
    let s=`<text x="${N?16:14}" y="20" class="t-sm" style="fill:var(--terra)">${cm==='gout'?'US ADULTS WITH GOUT · NHANES 2007–2008':'US ADULTS WITH URATE ≥ 10 mg/dL · same survey'}</text>`;
    s+=`<text x="${N?16:706}" y="${N?36:20}" class="t-xs${N?'':' t-end'}">% who also have each condition · Zhu 2012</text>`;
    const bx=v=>BX0+(BX1-BX0)*v/100;
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(bx(v))}" x2="${f1(bx(v))}" y1="${Y0-14}" y2="${Y0+LK_COM.length*RH-8}" class="grid"/><text x="${f1(bx(v))}" y="${Y0+LK_COM.length*RH+6}" class="t-xs t-mid">${v}%</text>`);
    LK_COM.forEach((r,i)=>{const y=Y0+i*RH,v=cv[i],na=cm==='u10'&&r[2]==null,by=N?y+4:y-9;
      s+=`<text x="${N?16:224}" y="${N?y:y+3}" class="t-lbl${N?'':' t-end'}" style="font-size:12.5px">${r[0]}</text>`;
      if(na){s+=`<text x="${f1(BX0+4)}" y="${by+12}" class="t-xs">not reported for this group</text>`;return}
      s+=`<rect x="${BX0}" y="${by}" width="${f1(Math.max(0,bx(v)-BX0))}" height="16" rx="4" style="fill:var(--terra);opacity:.85"/>`;
      s+=`<text x="${f1(bx(v)+6)}" y="${by+12}" class="t-xs" style="fill:var(--terra);font-weight:700">${Math.round(v)}%</text>`});
    const MY=Y0+LK_COM.length*RH+(N?34:30);
    s+=`<text x="${N?16:14}" y="${MY}" class="t-sm" style="fill:var(--terra)">METABOLIC SYNDROME · NHANES III · Choi 2007</text>`;
    [['with gout',cv[8],'var(--terra)','62.8%'],['without gout',cv[9],'var(--muted)','25.4%']].forEach(([l,v,c,lab],j)=>{const y=MY+(N?22:18)+j*(N?40:26),by=N?y+4:y-9;
      s+=`<text x="${N?16:224}" y="${N?y:y+3}" class="t-lbl${N?'':' t-end'}" style="font-size:12.5px">${l}</text>`;
      s+=`<rect x="${BX0}" y="${by}" width="${f1(Math.max(0,bx(v)-BX0))}" height="16" rx="4" style="fill:${c};opacity:.85"/><text x="${f1(bx(v)+6)}" y="${by+12}" class="t-xs" style="fill:${c};font-weight:700">${v>1?lab:''}</text>`});
    cs.innerHTML=s;
  }
  function tween(m){cm=m;const from=cv.slice(),to=target(m);if(stopC)stopC();stopC=animate(900,q=>{const e=ease(q);cv=from.map((v,i)=>lerp(v,to[i],e));drawC()},()=>{stopC=null})}
  $$('[data-lkc]').forEach(b=>b.onclick=()=>{$$('[data-lkc]').forEach(x=>x.setAttribute('aria-pressed',x===b));tween(b.dataset.lkc)});
  drawC();
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();tween(cm)}},{threshold:.3});io.observe(cs)}else{cv=target(cm);drawC()}
  onHide.links=(prev=>()=>{prev&&prev();if(stopC){stopC();stopC=null;cv=target(cm);drawC()}})(onHide.links);
  const prevR=redraws.links;redraws.links=()=>{prevR&&prevR();drawC()};
};
