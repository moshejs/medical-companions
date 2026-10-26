/* =============== 2.1 Screening tests compared =============== */
/* Per 1,000 people, one round. All "derived" rows apply the published sensitivity/specificity to
   7 CRC + 76 advanced precancerous lesions (APL) + 917 with neither (prevalence of Imperiale2014). */
const SC_TESTS=[
 {id:'fit',b:'FIT',s:'FIT',crc:5.2,apl:18,fp:47,col:70,
  r:`<b>FIT</b>: the FIT arm of the 2014 stool DNA trial (cancer sensitivity 73.8%, advanced precancerous lesions 23.8%, specificity 94.9%), applied to 1,000 people. About 7 in every 100 people need a colonoscopy. [[Imperiale2014]]`},
 {id:'gfobt',b:'gFOBT',s:'gFOBT',crc:4.4,apl:null,fp:28,col:32,
  r:`<b>High-sensitivity guaiac test</b>: pooled cancer sensitivity 0.50–0.75 and specificity 0.96–0.98; the midpoints are drawn (cancers found 3.5–5.3, false alarms 18–37). Its sensitivity for advanced lesions is not given in our sources, so those 76 people stay grey, and the colonoscopy count is a lower bound. [[Lin2021]]`},
 {id:'sdna',b:'mt-sDNA (Cologuard)',s:'mt-sDNA',crc:6.5,apl:32,fp:123,col:162,
  r:`<b>Multitarget stool DNA</b>: sensitivity 92.3% for cancer and 42.4% for advanced precancerous lesions, specificity 86.6%. It finds more than FIT, and sends more than twice as many people to colonoscopy. [[Imperiale2014]]`},
 {id:'ng',b:'Next-gen mt-sDNA',s:'Next-gen mt-sDNA',crc:6.6,apl:33,fp:86,col:126,
  r:`<b>Next-generation mt-sDNA</b> (BLUE-C, 20,176 people): cancer sensitivity 93.9%, advanced precancerous lesions 43.4%, specificity for advanced neoplasia 90.6%, applied to the same population. [[Imperiale2024,Imperiale2014]]`},
 {id:'rna',b:'mt-sRNA (ColoSense)',s:'mt-sRNA',crc:6.6,apl:35,fp:110,col:152,
  r:`<b>Multitarget stool RNA</b> (CRC-PREVENT, 8,920 people): cancer sensitivity 94%, advanced adenomas 46%, specificity 88% for "no lesions". Because that specificity is for no lesions at all, the false-alarm count here is approximate. [[Barnell2023,Imperiale2014]]`},
 {id:'shield',b:'Blood cfDNA (Shield)',s:'Shield (blood)',crc:5.8,apl:10,fp:95,col:111,
  r:`<b>Cell-free DNA blood test</b> (ECLIPSE, 7,861 evaluable): cancer sensitivity 83.1%, advanced precancerous lesions 13.2%, specificity 89.6%. It finds most cancers but very few precancerous lesions, so it prevents fewer cancers. [[Chung2024,Imperiale2014]]`},
 {id:'sept9',b:'Blood SEPT9',s:'SEPT9 (blood)',crc:3.4,apl:8.5,fp:78,col:90,
  r:`<b>Plasma methylated SEPT9</b>: standardised cancer sensitivity 48.2% (stage I 35.0%), advanced adenomas 11.2%, specificity 91.5%. USMSTF 2017 suggests it not be used. [[Church2014,Rex2017]]`},
 {id:'ctc',b:'CT colonography',s:'CT colonography',crc:6.3,apl:68.4,fp:128.4,col:203,
  r:`<b>CT colonography</b> (ACRIN, 2,531 people): per-patient sensitivity 0.90 and specificity 0.86 for adenomas or cancers ≥10 mm. Here 0.90 is applied to cancers and advanced lesions alike, an approximation because "≥10 mm" is not the same as "advanced". Extracolonic findings are of uncertain net value. [[Johnson2008,Lin2021]]`},
 {id:'fs',b:'Flexible sigmoidoscopy',s:'Sigmoidoscopy',sig:true,col:null,
  r:`<b>Flexible sigmoidoscopy</b> sees only the lower bowel, and our sources give no single sensitivity for it. Its trials measured outcomes instead: pooled over 15 years, 0.51 fewer cancers and 0.13 fewer CRC deaths per 100 people, drawn here as about 5 and 1 per 1,000. [[Juul2022]]`},
 {id:'col',b:'Colonoscopy',s:'Colonoscopy',all:true,crc:7,apl:69.2,fp:0,col:1000,
  r:`<b>Colonoscopy</b> examines everyone and removes polyps in the same visit. It is the reference standard, so all 7 cancers are drawn as found, but tandem studies miss 9% of advanced adenomas (drawn: 69 of 76 found) and 26% of all adenomas. Expected serious harms: about 1.8 per 1,000. [[Zhao2019,Lin2021]]`}
];
const SC_STEPS=[
 {from:0,at:.15,k:'Step 1 · The people',t:'1,000 people, one round',
  txt:`Picture 1,000 people at average risk, each taking one screening test. In the 2014 stool DNA trial 0.7% had colorectal cancer and 7.6% an advanced precancerous lesion: about 7 and 76 people here, shown in colour. No one can see these yet. Disease is usually symptomatic only at an advanced stage, which is the case for organised screening. [[Imperiale2014,Dekker2019]]`,
  pt:`Most people screened are healthy. A test has to find the few who are not, without alarming too many who are.`,
  hook:`USPSTF 2021: grade B at 45–49, A at 50–75, C at 76–85. [[USPSTF2021]]`},
 {from:.2,at:.35,k:'Step 2 · The test',t:'Who tests positive',
  txt:`Each test flags some people (navy). A positive result is not a diagnosis: it means a colonoscopy is needed to find out why. More sensitive tests flag more people, including more who turn out to have nothing serious. Against FIT, mt-sDNA had higher cancer sensitivity (92.3% vs 73.8%) but lower specificity (86.6% vs 94.9%). [[Imperiale2014]]`,
  pt:`A positive stool or blood test means "look closer", not "you have cancer".`,
  hook:`mt-sDNA vs FIT: sensitivity 92.3% vs 73.8%; specificity 86.6% vs 94.9%. [[Imperiale2014]]`},
 {from:.4,at:.52,k:'Step 3 · Follow-up',t:'Colonoscopy sorts the positives',
  txt:`ACS 2026 states that any positive non-colonoscopy test needs a follow-up colonoscopy, preferably within 6 months. Ringed people had one: it shows which positives were cancers, which were precancerous lesions (removed on the spot) and which were false alarms (violet). Each colonoscopy carries a small risk: 3.1 perforations and 14.6 major bleeds per 10,000 screening colonoscopies. [[Wolf2026,Lin2021]]`,
  pt:`The colonoscopy is part of the test. A positive stool test only helps if the colonoscopy happens.`,
  hook:`After a positive FIT, colonoscopy at 10–12 months carried more cancers (OR 1.48) and more stage III–IV disease (OR 1.97) than at 8–30 days. [[Corley2017]]`},
 {from:.6,at:.72,k:'Step 4 · Found and missed',t:'Cancers found, cancers missed',
  txt:`Faded icons are people the test missed this round. FIT's one-time sensitivity for advanced adenomas is low at any threshold (0.40 even at 10 µg/g), which is why stool tests are repeated every year or two. The Shield blood test found 83.1% of cancers but only 13.2% of advanced precancerous lesions. [[Imperiale2019,Chung2024]]`,
  pt:`One round can miss things. Repeating the test on schedule is what makes stool testing work.`,
  hook:`Shield: 83% of CRC but only 13% of advanced precancerous lesions. [[Chung2024]]`},
 {from:.8,at:.95,k:'Step 5 · The trade-off',t:'Colonoscopies versus cancers found',
  txt:`Side by side: follow-up colonoscopies per 1,000 people for each test, and how many of the 7 cancers each finds in one round. In modelling, CRC death rates relative to no screening were 0.19 for colonoscopy every 10 years, 0.25 for annual FIT, 0.28 for triennial next-generation mt-sDNA and 0.44 for triennial Shield. Number needed to screen to detect one cancer: 154 with colonoscopy, 166 with mt-sDNA, 208 with FIT. [[Ladabaum2024AIM,Imperiale2014]]`,
  pt:`The best test is the one you actually do. A home stool test done on schedule is a good choice. [[Wolf2026]]`,
  hook:`Modelled CRC death relative rate vs no screening: colonoscopy 0.19, annual FIT 0.25, next-gen mt-sDNA 0.28, Shield 0.44. [[Ladabaum2024AIM]]`}
];
/* published FIT thresholds only (Li2021): [µg/g, CRC sens %, HRA sens %, referred %, no CRC/HRA above threshold %] */
const SC_THR=[[4,95.6,90.2,21.3,null],[10,90.0,77.7,12.6,null],[20,82.2,64.3,7.8,4.5],[40,73.3,50.0,5.2,2.9],[80,58.9,32.1,2.9,1.5],[120,47.8,25.0,2.1,1.1],[150,44.4,20.8,1.8,0.9],[180,40.0,17.6,1.5,null]];
const SC_L22={20:'58,812 colonoscopies, 550 cancers prevented, 1,216 detected',120:'16,092 colonoscopies, 186 cancers prevented, 1,142 detected',180:'11,500 colonoscopies, 131 cancers prevented'};
/* mortality forest: [label, group, itt, lo, hi, pp, ppLabel, key-ish note] */
const SC_FOREST=[
 {g:'Guaiac stool test (gFOBT)'},
 {n:'Minnesota, annual (18 y)',v:.67,lo:.51,hi:.83},
 {n:'Minnesota, biennial (18 y)',v:.79,lo:.62,hi:.97},
 {n:'Nottingham, biennial (7.8 y)',v:.85,lo:.74,hi:.98},
 {n:'Funen, biennial (10 y)',v:.82,lo:.68,hi:.99},
 {n:'Cochrane, 4 RCTs pooled',v:.84,lo:.78,hi:.90,pp:.75,ppn:'attended ≥1 round'},
 {g:'Flexible sigmoidoscopy'},
 {n:'UK FSST, once-only (17 y)',v:.70,pp:.59,ppn:'−41%'},
 {n:'PLCO (11.9 y)',v:.74},
 {n:'NORCCAP (10.9 y)',v:.73},
 {n:'4 RCTs pooled (15 y)',v:.80},
 {g:'Colonoscopy'},
 {n:'NordICC, invited vs usual care (10 y)',v:.90,lo:.64,hi:1.16,pp:.50,ppn:'−50%'},
 {n:'COLONPREV, colonoscopy vs FIT (10 y)',v:.92,lo:.64,hi:1.32,cmp:true}
];
inits.screening=()=>{
  const svg=$('#scSvg'),rg=$('#scT'),note=$('#scNote'),read=$('#scRead');
  let cur=0;
  /* fixed population: shuffled order, first 7 CRC, next 76 APL, rest healthy */
  const R=rng(2021),ord=[...Array(1000).keys()];
  for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]]}
  const role=new Array(1000),rank=new Array(1000);
  ord.forEach((cell,k)=>{if(k<7){role[cell]='c';rank[cell]=k}else if(k<83){role[cell]='a';rank[cell]=k-7}else{role[cell]='h';rank[cell]=k-83}});
  const rd=x=>Math.round(x-.001);
  const fmt=v=>v==null?'–':v>=1000?Math.round(v).toLocaleString('en-GB'):v>=20?String(Math.round(v)):(Math.round(v*10)/10).toString();
  $('#scTests').innerHTML=SC_TESTS.map((T,i)=>`<button class="btn" data-sct="${i}" aria-pressed="${i===0}">${T.b}</button>`).join('');
  function draw(t){
    const N=vb(svg,'720 380','400 640'),T=SC_TESTS[cur];
    const L=N?{gx:14,gy:52,cw:9.4,rh:11.2,ps:8.6,px:12,py:350,pw:376,rowH:26}:{gx:16,gy:50,cw:11,rh:12.8,ps:10,px:478,py:56,pw:234,rowH:31};
    const p1=ramp(t,.01,.16),p2=ramp(t,.21,.36),p3=ramp(t,.41,.53),p4=ramp(t,.61,.73),p5=ramp(t,.81,.93);
    const nc=T.sig?0:rd(T.crc),na=T.sig||T.apl==null?0:rd(T.apl),nf=T.sig?0:rd(T.fp);
    const harmN=T.all?2:0;
    let s=`<defs><g id="scPer">${person(0,0,L.ps,'currentColor')}</g></defs>`;
    s+=`<text x="${L.gx}" y="${N?22:24}" class="t-lbl">1,000 people at average risk · one round of ${T.s}</text>`;
    s+=`<text x="${L.gx}" y="${N?38:40}" class="t-xs">${t<.2?'who has what (unknown to anyone yet)':t<.4?'test result':t<.6?'after follow-up colonoscopy':'found and missed'}</text>`;
    let rings='';
    for(let i=0;i<1000;i++){
      const x=L.gx+(i%40)*L.cw+L.cw/2-L.ps*.0,y=L.gy+Math.floor(i/40)*L.rh,ro=role[i],rk=rank[i];
      const ord01=i/1000;
      const pos=!T.sig&&!T.all&&((ro==='c'&&rk<nc)||(ro==='a'&&rk<na)||(ro==='h'&&rk<nf));
      const found=(ro==='c'&&rk<nc)||(ro==='a'&&rk<na);
      let col='var(--line)',op=1;
      if(t<.2){
        if(ro==='c'&&p1>rk/7*.4)col='var(--tumour)';
        else if(ro==='a'&&p1>.4+rk/76*.6)col='var(--polyp)';
      }else if(T.sig){
        if(p2>ord01)col='var(--accent-soft)';
        if(ro==='c')col='var(--tumour)',op=.45;else if(ro==='a')col='var(--polyp)',op=.4;
        if(p4>0&&ro==='h'&&rk<6&&p4>rk/6){col='var(--good)';op=1;rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.62)}" style="fill:none;stroke:var(--good);stroke-width:1.3${rk===5?';stroke-dasharray:2 1.5':''}"/>`}
      }else if(T.all){
        if(p2>ord01)col='var(--accent-soft)';
        if(t>=.4&&p3>ord01){if(ro==='c')col='var(--tumour)';else if(ro==='a'&&found)col='var(--polyp)';
          if(ro==='h'&&rk>=900&&rk<900+harmN)rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.66)}" style="fill:none;stroke:var(--bad);stroke-width:1.6"/>`}
        if(t>=.6&&ro==='a'&&!found&&p4>.3)col='var(--polyp)',op=.35;
      }else{
        if(pos&&p2>ord01)col='var(--accent)';
        if(t>=.4&&pos&&p3>ord01){col=ro==='c'?'var(--tumour)':ro==='a'?'var(--polyp)':'var(--lymph)';
          rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.62)}" style="fill:none;stroke:var(--accent);stroke-width:1"/>`}
        if(t>=.6&&!pos&&p4>.2){if(ro==='c')col='var(--tumour)',op=.38;else if(ro==='a'&&T.apl!=null)col='var(--polyp)',op=.32}
        if(t>=.6&&!pos&&ro==='c'&&p4>.2)rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.66)}" style="fill:none;stroke:var(--bad);stroke-width:1.2;stroke-dasharray:2 1.6"/>`;
        if(t>=.6&&T.apl==null&&ro==='a'&&p4>.2)rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.5)}" style="fill:none;stroke:var(--polyp);stroke-width:.8;stroke-dasharray:1.5 1.5"/>`;
      }
      s+=`<use href="#scPer" x="${f1(x)}" y="${f1(y)}" style="color:${col};opacity:${op}"/>`;
    }
    s+=rings;
    /* right / lower panel */
    const px=L.px,py=L.py,pw=L.pw;
    if(p5<=0){
      const tp=T.sig||T.all?null:T.crc+(T.apl||0)+T.fp;
      const harms=T.col==null?null:T.col*(3.1+14.6)/10000;
      const rows=T.sig?[
        ['1,000','people examined','var(--ink)',0,1],['7','with colorectal cancer','var(--tumour)',0,p1],['76','with an advanced lesion','var(--polyp)',0,p1],
        ['distal','colon only: rectum, sigmoid','var(--accent)',1,p2],['?','follow-up rate not reported','var(--muted)',2,p3],
        ['−5.1','fewer cancers (15 years)','var(--good)',3,p4],['−1.3','fewer CRC deaths (15 years)','var(--good)',3,p4],
        ['0.73','mortality ratio, men','var(--good)',3,p4],['0.91','mortality ratio, women','var(--warn)',3,p4]
      ]:[
        ['1,000','people tested','var(--ink)',0,1],
        [fmt(7*p1),'with colorectal cancer','var(--tumour)',0,p1],
        [fmt(76*ramp(p1,.4,1)),'with an advanced lesion','var(--polyp)',0,p1],
        [T.all?fmt(1000*p2):fmt(tp*p2),T.all?'colonoscopies done':'test positive','var(--accent)',1,p2],
        [fmt(T.fp*p3),T.all?'false alarms (none)':'false alarms','var(--lymph)',2,p3],
        [harms==null?'–':(harms*p3).toFixed(2),'serious harms expected','var(--bad)',2,p3],
        [fmt(T.crc*p4),'of 7 cancers found','var(--tumour)',3,p4],
        [fmt((7-T.crc)*p4),'cancers missed','var(--bad)',3,p4],
        [T.apl==null?'?':fmt(T.apl*p4),'of 76 advanced lesions found','var(--polyp)',3,p4]
      ];
      if(!T.sig&&!T.all)rows.splice(4,0,[fmt(T.col*p3),'follow-up colonoscopies','var(--accent)',2,p3]);
      const ph=t<.2?0:t<.4?1:t<.6?2:3;
      rows.forEach((r,k)=>{const y=py+k*L.rowH+(N?0:4),on=ph>=r[3],cur2=ph===r[3]&&r[3]>0;
        s+=`<g style="opacity:${on?1:.22}"><rect x="${px}" y="${f1(y-13)}" width="4" height="${N?18:20}" rx="2" style="fill:${r[2]}"/>`;
        s+=`<text x="${px+12}" y="${f1(y+1)}" class="t-lbl" style="fill:${r[2]}${cur2?';font-size:14px':''}">${on?r[0]:'·'}</text>`;
        s+=`<text x="${px+(N?84:66)}" y="${f1(y+1)}" class="t-xs" style="${cur2?'fill:var(--ink)':''}">${r[1]}</text></g>`});
    }else{
      /* comparison: follow-up colonoscopies per 1,000 and cancers found of 7 */
      const nameW=N?118:100,bx=px+nameW,bw=N?150:74,vmax=250,rh=N?24:28;
      s+=`<text x="${px}" y="${py-6+(N?0:0)}" class="t-xs" style="fill:var(--ink)">colonoscopies per 1,000 · cancers found (of 7)</text>`;
      SC_TESTS.forEach((X,k)=>{const y=py+14+k*rh,me=k===cur,g=p5;
        s+=`<text x="${px}" y="${y+4}" class="t-xs" style="${me?'fill:var(--ink);font-weight:700':''}">${X.s}</text>`;
        if(X.col==null){s+=`<text x="${bx}" y="${y+4}" class="t-xs">not in sources</text>`;return}
        const w=Math.min(X.col,vmax)/vmax*bw*g;
        s+=`<rect x="${bx}" y="${y-5}" width="${f1(w)}" height="11" rx="2" style="fill:var(--accent);opacity:${me?1:.45}"/>`;
        if(X.col>vmax&&g>.95)s+=`<path d="M${f1(bx+bw-14)} ${y-7}l4 15M${f1(bx+bw-9)} ${y-7}l4 15" style="stroke:var(--panel);stroke-width:2.4"/>`;
        s+=`<text x="${f1(bx+bw+6)}" y="${y+4}" class="t-xs" style="${me?'fill:var(--ink);font-weight:700':''}">${fmt(X.col)}${X.id==='gfobt'?'+':''} · ${fmt(X.crc)}</text>`});
    }
    svg.innerHTML=s;
    const ph=phaseOf(SC_STEPS,t);note.innerHTML=noteHTML(SC_STEPS[ph]);setSt(ph);
  }
  function pick(i){cur=i;$$('[data-sct]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sct===i));read.innerHTML=SC_TESTS[i].r;draw(+rg.value)}
  const stop=playWire(rg,$('#scPlay'),draw,22000,'Replay','screening');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  $('#scTests').addEventListener('click',e=>{const b=e.target.closest('[data-sct]');if(b)pick(+b.dataset.sct)});
  pick(0);

  /* ---- FIT threshold: snaps to the published thresholds only ---- */
  const fs=$('#scFitSvg'),thr=$('#scThr'),fnote=$('#scFitNote');
  let shown=SC_THR[2].slice(1,4),stopT=null;
  function drawFit(v,k){
    const N=vb(fs,'720 310','400 580'),row=SC_THR[k],[c,h,r]=v;
    let s='';
    const G=N?[{x:22,y:58},{x:212,y:58}]:[{x:24,y:58},{x:226,y:58}],sp=N?17:17;
    [[c,'cancers','var(--tumour)'],[h,'high-risk adenomas','var(--polyp)']].forEach((g,gi)=>{const o=G[gi],n=Math.round(g[0]);
      s+=`<text x="${o.x}" y="${o.y-22}" class="t-lbl">Of 100 ${g[1]}</text><text x="${o.x}" y="${o.y-8}" class="t-xs">FIT positive: <tspan style="fill:${g[2]};font-weight:700">${f1(g[0])}%</tspan></text>`;
      for(let j=0;j<100;j++){const cx=o.x+7+(j%10)*sp,cy=o.y+7+Math.floor(j/10)*sp,on=j<n;
        s+=`<circle cx="${cx}" cy="${cy}" r="6.3" style="fill:${on?g[2]:'var(--panel)'};stroke:${g[2]};stroke-width:1.2;opacity:${on?1:.55}"/>`}});
    /* referred */
    const rx=N?22:430,ry=N?286:58,rw=N?356:270,max=25;
    s+=`<text x="${rx}" y="${ry-22}" class="t-lbl">Of every 1,000 people tested</text>`;
    s+=`<text x="${rx}" y="${ry-8}" class="t-xs">referred for colonoscopy: <tspan style="fill:var(--accent);font-weight:700">${Math.round(r*10)}</tspan> (${f1(r)}%)</text>`;
    s+=`<rect x="${rx}" y="${ry}" width="${rw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${rx}" y="${ry}" width="${f1(r/max*rw)}" height="18" rx="4" style="fill:var(--accent)"/>`;
    [0,5,10,15,20,25].forEach(q=>s+=`<text x="${f1(rx+q/max*rw)}" y="${ry+32}" class="t-xs t-mid">${q}%</text>`);
    const o2=row[4];
    s+=`<text x="${rx}" y="${ry+56}" class="t-xs">people with no cancer or high-risk adenoma</text><text x="${rx}" y="${ry+69}" class="t-xs">who are above the threshold:</text>`;
    s+=`<text x="${rx+(N?190:180)}" y="${ry+69}" class="t-lbl" style="fill:var(--lymph)">${o2==null?'not reported':f1(o2)+'%'}</text>`;
    if(o2!=null)s+=`<rect x="${rx}" y="${ry+78}" width="${rw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${rx}" y="${ry+78}" width="${f1(o2/max*rw)}" height="10" rx="3" style="fill:var(--lymph)"/>`;
    const l22=SC_L22[row[0]];
    s+=`<text x="${rx}" y="${ry+112}" class="t-xs" style="font-weight:700;fill:var(--ink)">England model over 15 years,</text><text x="${rx}" y="${ry+125}" class="t-xs" style="font-weight:700;fill:var(--ink)">per 100,000 screened every 2 years:</text>`;
    if(l22){const parts=l22.split(', ');parts.forEach((p,i)=>s+=`<text x="${rx}" y="${ry+140+i*13}" class="t-xs">${p}</text>`)}
    else s+=`<text x="${rx}" y="${ry+140}" class="t-xs">modelled only at 20, 120 and 180 µg/g</text>`;
    /* scale of published stops */
    const sy=N?526:262,sx0=N?30:40,sx1=N?370:690,stp=(sx1-sx0)/7;
    s+=`<line x1="${sx0}" x2="${sx1}" y1="${sy}" y2="${sy}" style="stroke:var(--line);stroke-width:3"/>`;
    SC_THR.forEach((q,i)=>{const x=sx0+i*stp,me=i===k;
      s+=`<circle cx="${f1(x)}" cy="${sy}" r="${me?8:5}" style="fill:${me?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.6"/>`;
      s+=`<text x="${f1(x)}" y="${sy-14}" class="t-xs t-mid" style="${me?'fill:var(--ink);font-weight:700':''}">${q[0]}</text>`;
      if(q[0]===120)s+=`<text x="${f1(x)}" y="${sy+22}" class="t-xs t-mid" style="fill:var(--accent)">England</text>`;
      if(q[0]===20)s+=`<text x="${f1(x)}" y="${sy+22}" class="t-xs t-mid" style="fill:var(--accent)">${N?'most used':'most common'}</text>`});
    s+=`<text x="${sx1}" y="${sy+36}" class="t-xs t-end">µg Hb/g · published stops only, evenly spaced</text>`;
    fs.innerHTML=s;
  }
  function setThr(k,instant){
    const row=SC_THR[k],to=row.slice(1,4),from=shown.slice();
    $('#scThrVal').textContent=row[0]+' µg/g';thr.setAttribute('aria-valuetext',row[0]+' micrograms per gram');
    fnote.innerHTML=noteHTML({k:'Threshold '+row[0]+' µg/g',t:`${f1(row[1])}% of cancers, ${Math.round(row[3]*10)} referrals per 1,000`,
      txt:`At ${row[0]} µg/g the English pilot estimated that FIT identifies ${f1(row[1])}% of cancers and ${f1(row[2])}% of high-risk adenomas, and refers ${f1(row[3])}% of participants for colonoscopy.${row[0]===120?' This is England’s programme threshold.':row[0]===20?' This is the threshold 15 of 38 programmes use.':''} [[Li2021,Young2025]]`,
      pt:k<3?'A low cut-off catches more, but many more people need a colonoscopy, and most of them will be fine.':'A high cut-off saves colonoscopies but misses more cancers in each round.',
      hook:'England: 120 µg/g catches 47.8% of CRC per round versus 82.2% at 20 µg/g, but needs far fewer colonoscopies (16,092 vs 58,812 per 100,000 over 15 years). [[Li2021,Li2022]]'});
    if(stopT)stopT();
    if(instant){shown=to;drawFit(to,k);return}
    stopT=animate(450,p=>{const e=ease(p);shown=from.map((a,i)=>lerp(a,to[i],e));drawFit(shown,k)},()=>{stopT=null});
  }
  thr.addEventListener('input',()=>setThr(+thr.value));
  setThr(+thr.value,true);

  /* ---- trial forest plot ---- */
  const fo=$('#scForest'),fnote2=$('#scForestNote');let mode='itt',mk=0,stopF=null;
  function drawForest(k){
    const N=vb(fo,'720 450','400 700');
    const ax0=N?40:360,ax1=N?380:700,v0=.3,v1=1.4,X=v=>ax0+(clamp(v,v0,v1)-v0)/(v1-v0)*(ax1-ax0);
    let s='',y=N?20:24;const step=N?47:27.5;
    const top=y;
    s+=`<rect x="${f1(X(.3))}" y="0" width="${f1(X(1)-X(.3))}" height="${N?640:410}" style="fill:var(--good-soft);opacity:.35"/>`;
    SC_FOREST.forEach(r=>{
      if(r.g){s+=`<text x="${N?12:12}" y="${f1(y+4)}" class="t-lbl" style="fill:var(--accent)">${r.g}</text>`;y+=N?26:24;return}
      const ly=N?y:y,py=N?y+16:y;
      const has=mode==='pp'&&r.pp!=null,v=lerp(r.v,r.pp!=null?r.pp:r.v,r.pp!=null?k:0);
      s+=`<text x="${N?20:20}" y="${f1(ly+4)}" class="t-sm" style="fill:var(--ink);${mode==='pp'&&r.pp==null?'opacity:.5':''}">${r.n}</text>`;
      if(r.lo!=null){const a=1-(r.pp!=null?k:0);s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--ink);stroke-width:1.6;opacity:${f1(.15+.85*a)}"/>`}
      const ppNow=r.pp!=null&&k>.5;
      s+=`<rect x="${f1(X(v)-5)}" y="${f1(py-5)}" width="10" height="10" ${ppNow?'rx="5"':''} style="fill:${ppNow?'var(--panel)':r.cmp?'var(--muted)':'var(--accent)'};stroke:var(--accent);stroke-width:2;opacity:${mode==='pp'&&r.pp==null?.4:1}"/>`;
      const lab=(ppNow?(r.ppn+' → '+f1(v).replace(/^0/,'0')):v.toFixed(2))+(r.lo!=null&&!ppNow?` (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`:'');
      s+=N?`<text x="380" y="${f1(ly+4)}" class="t-xs t-end" style="fill:var(--ink)">${ppNow?(r.ppn+' ('+v.toFixed(2)+')'):lab}</text>`:`<text x="${f1(X(v))}" y="${f1(py-9)}" class="t-xs t-mid" style="fill:var(--ink)">${ppNow?(r.ppn+' ('+v.toFixed(2)+')'):lab}</text>`;
      y+=step});
    const by=y+4;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${top-10}" y2="${by}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${by}" y2="${by}" class="axis" style="stroke:var(--muted)"/>`;
    [.4,.6,.8,1,1.2,1.4].forEach(v=>s+=`<text x="${f1(X(v))}" y="${by+14}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
    s+=`<text x="${f1(X(.62))}" y="${by+28}" class="t-xs t-mid" style="fill:var(--good)">← fewer CRC deaths</text><text x="${f1(X(1.22))}" y="${by+28}" class="t-xs t-mid">more →</text>`;
    fo.innerHTML=s;
  }
  function forestNote(){fnote2.innerHTML=mode==='itt'?noteHTML({k:'Intention to screen',t:'Everyone invited, attended or not',
      txt:`Every person randomised is counted in the group they were assigned to. This answers "what does offering screening do for a population?". In NordICC only 42.0% of those invited attended, and the CRC death ratio was 0.90 (0.64–1.16), not significant at 10 years, while CRC incidence fell 18%. [[Bretthauer2022]]`,
      pt:'If most people invited never have the test, the trial result mostly measures the invitation, not the test.',
      hook:'NordICC: 18% lower CRC incidence at 10 years among those invited, no significant drop in CRC deaths; only 42% attended. [[Bretthauer2022]]'})
    :noteHTML({k:'Per protocol',t:'Only the people who were screened',
      txt:`Restricting to people who were actually screened shows a larger effect: NordICC 31% lower incidence and 50% lower CRC mortality (as the 2024 quality indicators report it); UK sigmoidoscopy 41% lower mortality at 17 years; gFOBT 25% among attenders. People who attend may be healthier in other ways, which is why the intention-to-screen result stays primary. Critics of NordICC also raise quality: 28.6% of its endoscopists missed the 25% ADR benchmark. [[Rex2024,Atkin2017,Hewitson2007,Bretthauer2016]]`,
      pt:'For someone who actually has the test, the benefit is larger than the headline trial result.',
      hook:'UKFSST at 17 years: mortality −30% intention to treat, −41% per protocol. [[Atkin2017]]'})}
  $$('[data-scfp]').forEach(b=>b.addEventListener('click',()=>{const m=b.dataset.scfp;if(m===mode)return;mode=m;
    $$('[data-scfp]').forEach(x=>x.setAttribute('aria-pressed',x===b));forestNote();
    if(stopF)stopF();const from=mk,to=m==='pp'?1:0;
    /* the analysis label must show the end state while it slides */
    stopF=animate(700,p=>{mk=lerp(from,to,ease(p));drawForest(mk)},()=>{stopF=null})}));
  drawForest(0);forestNote();
  const prevR=redraws.screening;redraws.screening=()=>{prevR&&prevR();drawFit(shown,+thr.value);drawForest(mk)};
};
