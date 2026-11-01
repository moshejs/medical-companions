/* =============== 3.5 Side effects & monitoring =============== */
const SF_DC={H:'var(--dH)',R:'var(--dR)',Z:'var(--dZ)',E:'var(--dE)',P:'var(--dR)',M:'var(--dNew)',B:'var(--dNew)',Pa:'var(--dNew)',L:'var(--dNew)'};
const SF_DN={H:'isoniazid',R:'rifampicin',Z:'pyrazinamide',E:'ethambutol',P:'rifapentine',M:'moxifloxacin',B:'bedaquiline',Pa:'pretomanid',L:'linezolid'};
const SF_REG={std:{H:[0,26],R:[0,26],Z:[0,8],E:[0,8]},hpzm:{H:[0,17],P:[0,17],M:[0,17],Z:[0,8]},bpalm:{B:[0,24],Pa:[0,24],L:[0,24],M:[0,24]}};
/* side effects: org = organ lit on the body; typ = typical window in weeks (only where a source gives one); mon = check weeks */
const SF_AE=[
 {id:'orange',org:'fluids',d:['R'],n:'Orange body fluids',f:'expected, harmless',col:'var(--dR)'},
 {id:'liver',org:'liver',d:['H','R','Z','P','Pa'],n:'Liver injury',f:'2–28% in reported series',typ:[0,12],col:'var(--bad)',mon:'monthly'},
 {id:'neuroH',org:'nerves',d:['H'],n:'Neuropathy (isoniazid)',f:'pyridoxine listed with H',col:'var(--dH)'},
 {id:'eye',org:'eyes',d:['E'],n:'Optic neuritis',f:'22.5 per 1,000 treated',col:'var(--dE)',mon:'monthly'},
 {id:'urate',org:'joints',d:['Z'],n:'High urate, gout',f:'hyperuricaemia is common',col:'var(--dZ)'},
 {id:'rash',org:'skin',d:['Z'],n:'Rash (pyrazinamide)',f:'more than once thought',col:'var(--dZ)'},
 {id:'flu',org:'skin',d:['P'],n:'Hypersensitivity',f:'incl. flu-like syndrome',col:'var(--dR)'},
 {id:'tendon',org:'tendon',d:['M'],n:'Tendinitis, rupture',f:'boxed warning',col:'var(--dNew)'},
 {id:'qt',org:'heart',d:['B','M','Pa'],n:'QT prolongation',f:'stop B if QTc >500 ms',col:'var(--bad)',mon:'ecg'},
 {id:'marrow',org:'marrow',d:['L','Pa'],n:'Low blood counts',f:'2% (600 mg) to 22%',col:'var(--dNew)',mon:'weekly'},
 {id:'neuroL',org:'nerves',d:['L','Pa'],n:'Neuropathy (linezolid)',f:'24% (600 mg) to 38%',typ:[4,26],col:'var(--dNew)'},
 {id:'optic',org:'eyes',d:['L','Pa'],n:'Optic neuropathy',f:'9% at 1,200 mg, 26 wk',typ:[4,26],col:'var(--dNew)'}
];
const SF_ST=[
 {from:0,at:.002,k:'Week 0',t:'Baseline checks',
  txt:`Checks before the first dose set a baseline for later comparison. The rifampin label lists liver enzymes, bilirubin, creatinine, blood count and platelets for adults; the isoniazid label adds AST and ALT from age 35; the ethambutol label asks for visual acuity in each eye and colour discrimination; bedaquiline needs an ECG, liver enzymes and electrolytes. The table below has the full list. [[FDA-Rifampin,FDA-Isoniazid,FDA-Ethambutol,FDA-Sirturo]]`,
  pt:`Before treatment starts you will usually have blood tests, an eye test if ethambutol is used, and a heart tracing (ECG) for some newer medicines. These are routine.`,
  hook:`Baseline LFTs for everyone on the rifampin label; AST/ALT from age 35 on the isoniazid label; vision for ethambutol; ECG for bedaquiline. [[FDA-Rifampin,FDA-Isoniazid,FDA-Ethambutol,FDA-Sirturo]]`},
 {from:.01,at:.04,k:'From the first doses',t:'Orange fluids: expected',
  txt:`Rifampin can turn teeth, urine, sweat, sputum and tears yellow, orange, red or brown, and can permanently stain soft contact lenses. People should be told about this in advance. It is harmless, and it is a useful sign that the medicine is being taken. [[FDA-Rifampin]]`,
  pt:`Orange urine, sweat and tears are expected with rifampicin and are not dangerous. Switch to glasses or daily disposable lenses if you wear soft contacts.`,
  hook:`Rifampicin = orange body fluids, stained soft contact lenses. [[FDA-Rifampin]]`},
 {from:.08,at:.2,k:'Weeks 1–12',t:'The liver window',
  txt:`Isoniazid, rifampicin and pyrazinamide can all injure the liver; reported rates range from 2% to 28%. Isoniazid hepatitis usually occurs in the first 3 months, and in SHINE all but 2 of 11 liver reactions in children came in the first 8 weeks. Pyrazinamide caused the most major adverse events of the four first-line drugs (1.48 per 100 person-months). On the rifapentine regimen, grade 3 or higher bilirubin rises were 3.3% against 1.0%. [[Tostmann2008,FDA-Isoniazid,Turkova2022,Yee2003,Dorman2021]]`,
  pt:`Tell the TB team straight away about yellow eyes or skin, dark urine, stomach pain, sickness or loss of appetite. Avoid alcohol during treatment.`,
  hook:`ATS: interrupt when ALT is >3× ULN with symptoms or jaundice, or >5× ULN without symptoms. [[Saukkonen2006]]`},
 {from:.24,at:.28,k:'Weeks 0–8',t:'Eyes, joints and skin',
  txt:`Ethambutol can cause optic neuritis, usually reversible if stopped promptly, though irreversible blindness has been reported; visual impairment occurred in 22.5 per 1,000 people treated. The label asks for vision checks monthly at doses above 15 mg/kg/day. Pyrazinamide inhibits urate excretion and often raises uric acid, usually without symptoms; it is contraindicated in acute gout. Pyrazinamide rash was more common than previously recognised. In the standard regimen both drugs stop at 8 weeks. [[FDA-Ethambutol,Ezer2013,FDA-Pyrazinamide,Yee2003]]`,
  pt:`Report blurred vision or trouble telling red from green at once. Joint pain or a rash should also be mentioned to the team.`,
  hook:`Ethambutol: check visual acuity and red-green colour vision. Not on the US label under 13 or in people who cannot report vision changes. [[FDA-Ethambutol]]`},
 {from:.36,at:.55,k:'Months 2–6',t:'Nerves',
  txt:`Isoniazid can cause pyridoxine deficiency by competing with pyridoxal phosphate, leading to peripheral neuropathy; pre-existing neuropathy calls for closer monitoring, and ATS/CDC/ERS/IDSA lists pyridoxine (vitamin B6) 25 to 50 mg/day with isoniazid. Linezolid causes peripheral and optic neuropathy mainly after 28 days: in ZeNix, 24% at 600 mg for 26 weeks and 38% at 1,200 mg. Choose <b>BPaLM</b> to see it. [[FDA-Isoniazid,Saukkonen2025,FDA-Zyvox,Conradie2022]]`,
  pt:`Tingling, numbness or burning in the hands or feet should be reported early. Vitamin B6 is often given with isoniazid to protect the nerves.`,
  hook:`Isoniazid neuropathy → pyridoxine (B6). Linezolid: neuropathy and myelosuppression, dose-related. [[FDA-Isoniazid,Conradie2022]]`},
 {from:.68,at:.85,k:'Throughout',t:'Heart and blood: the newer drugs',
  txt:`Bedaquiline carries a boxed warning for QTc prolongation: ECGs are monitored and the drug stopped for significant ventricular arrhythmia or QTc above 500 ms. ATS/CDC/ERS/IDSA calls for ECGs at baseline and at 2, 12 and 24 weeks on BPaL, monthly if moxifloxacin is added. Linezolid needs weekly blood counts for myelosuppression, which was 2% at 600 mg for 26 weeks in ZeNix against 22% at 1,200 mg. Moxifloxacin adds a boxed warning for tendinitis and tendon rupture. [[FDA-Sirturo,Saukkonen2025,FDA-Zyvox,Conradie2022,FDA-Moxifloxacin]]`,
  pt:`Heart tracings and blood tests during treatment are routine safety checks, not a sign that something is wrong.`,
  hook:`Bedaquiline = QT (ECG). Linezolid = bone marrow and nerves (weekly counts). [[FDA-Sirturo,FDA-Zyvox]]`}
];
const SF_INT=[
 {id:'contra',n:'Hormonal contraception',sm:'pill, patch, implant',co:'contraceptive hormone',
  txt:`The rifampin label warns that the reliability of oral and other systemic hormonal contraceptives may be affected and that alternative contraception should be considered. The rifapentine label gives the same warning. [[FDA-Rifampin,FDA-Priftin]]`,
  pt:`Hormonal contraception may not work reliably during rifampicin and for a while after it. Check with a pharmacist or the TB team which method to use.`},
 {id:'art',n:'HIV medicines (ART)',sm:'protease inhibitors, dolutegravir',co:'antiretroviral',
  txt:`Combining rifampicin with indinavir, nelfinavir or saquinavir is contraindicated. In INSPIRING, adults on rifampicin-based TB treatment took dolutegravir 50 mg twice daily during TB treatment and for 2 weeks after it; week-48 viral response was 75%, against 82% with efavirenz. In DOLPHIN, weekly rifapentine-isoniazid raised dolutegravir clearance by 36%, yet viral load stayed suppressed in all 60 people. See <a href="#special" data-go="special">TB with HIV</a>. [[Niemi2003,Dooley2020CID,Dooley2020LancetHIV]]`,
  pt:`TB and HIV can be treated together. The HIV medicines or their doses may need adjusting, and the teams plan this together. Check with a pharmacist before changing anything.`},
 {id:'anti',n:'Anticoagulants',sm:'warfarin',co:'(S)-warfarin',
  txt:`Rifampicin also induces CYP2C, lowering (S)-warfarin levels, so the anticoagulant effect falls during treatment and rises again over the weeks after rifampicin stops. [[Niemi2003]]`,
  pt:`Blood thinners can stop working properly during rifampicin. Check with a pharmacist or the clinic that manages your anticoagulant.`},
 {id:'meth',n:'Methadone',sm:'opioid substitution',co:'methadone',
  txt:`Rifampicin lowers methadone levels, leading to opioid withdrawal symptoms in most patients. [[Niemi2003]]`,
  pt:`If you take methadone, tell both your TB team and your methadone service before starting, so the dose can be reviewed. Withdrawal symptoms are a reason to call, not to stop TB treatment.`},
 {id:'other',n:'Many others',sm:'statins, sedatives, diabetes, transplant',co:'co-prescribed drug',
  txt:`Oral midazolam, triazolam, simvastatin, verapamil and most dihydropyridine calcium-channel blockers become ineffective during rifampicin treatment. Sulfonylurea levels fall, and ciclosporin levels can drop enough to cause acute transplant rejection. Interactions reported between 2008 and 2012 included posaconazole, voriconazole, oxycodone and risperidone, and the list keeps growing. [[Niemi2003,Baciewicz2013]]`,
  pt:`Tell every doctor, dentist and pharmacist that you take rifampicin, and check new medicines, including herbal and over-the-counter ones, with a pharmacist first.`}
];

inits.safety=()=>{
  const svg=$('#sfSvg'),rg=$('#sfT');let reg='std',setSt=()=>{};const off={};
  const drugsOf=()=>Object.keys(SF_REG[reg]);
  const given=(k,w)=>{const r=SF_REG[reg][k];return r&&!off[k]&&w>=r[0]&&w<r[1]};
  const rows=()=>SF_AE.filter(a=>a.d.some(k=>SF_REG[reg][k]&&!off[k]));
  function chips(){const el=$('#sfChips');el.innerHTML=`<span class="kicker">Show</span>`+drugsOf().map(k=>`<button class="btn" data-sfd="${k}" aria-pressed="${!off[k]}"><i style="background:${SF_DC[k]}"></i>${k} · ${SF_DN[k]}</button>`).join('')}
  $('#sfChips').addEventListener('click',e=>{const b=e.target.closest('[data-sfd]');if(!b)return;const k=b.dataset.sfd;off[k]=!off[k];b.setAttribute('aria-pressed',!off[k]);draw(+rg.value)});
  const typOf=a=>a.id==='liver'&&!a.d.some(k=>['H','R','Z'].includes(k)&&SF_REG[reg][k]&&!off[k])?null:a.typ;
  function level(a,w){if(!a.d.some(k=>given(k,w)))return 0;const ty=typOf(a);if(!ty)return a.id==='orange'?1:.8;return w>=ty[0]&&w<ty[1]?1:.4}
  function body(cx,top,H,lit){const X=u=>cx+u*H,Y=v=>top+v*H;let s='';
    const sk=lit.skin;
    s+=`<g style="fill:var(--panel-2);stroke:${sk?sk.col:'var(--muted)'};stroke-width:${sk?2.4:1.2};stroke-opacity:${sk?.9:.5}">`;
    s+=`<circle cx="${f1(X(0))}" cy="${f1(Y(.07))}" r="${f1(H*.062)}"/>`;
    s+=`<path d="M${f1(X(-.03))} ${f1(Y(.125))}L${f1(X(-.12))} ${f1(Y(.16))}Q${f1(X(-.15))} ${f1(Y(.17))} ${f1(X(-.155))} ${f1(Y(.21))}L${f1(X(-.2))} ${f1(Y(.5))}L${f1(X(-.17))} ${f1(Y(.51))}L${f1(X(-.11))} ${f1(Y(.27))}L${f1(X(-.1))} ${f1(Y(.52))}L${f1(X(-.085))} ${f1(Y(.97))}L${f1(X(-.025))} ${f1(Y(.97))}L${f1(X(0))} ${f1(Y(.57))}L${f1(X(.025))} ${f1(Y(.97))}L${f1(X(.085))} ${f1(Y(.97))}L${f1(X(.1))} ${f1(Y(.52))}L${f1(X(.11))} ${f1(Y(.27))}L${f1(X(.17))} ${f1(Y(.51))}L${f1(X(.2))} ${f1(Y(.5))}L${f1(X(.155))} ${f1(Y(.21))}Q${f1(X(.15))} ${f1(Y(.17))} ${f1(X(.12))} ${f1(Y(.16))}L${f1(X(.03))} ${f1(Y(.125))}Z"/></g>`;
    const o=(k,shape)=>{const L=lit[k];return shape(L?L.col:'var(--muted)',L?.25+.7*L.v:.12)};
    s+=o('eyes',(c,op)=>[-1,1].map(sg=>`<ellipse cx="${f1(X(sg*.022))}" cy="${f1(Y(.065))}" rx="${f1(H*.012)}" ry="${f1(H*.007)}" style="fill:${c};opacity:${f1(op)}"/>`).join(''));
    s+=o('heart',(c,op)=>`<path d="M${f1(X(.035))} ${f1(Y(.29))}C${f1(X(-.01))} ${f1(Y(.26))} ${f1(X(.0))} ${f1(Y(.215))} ${f1(X(.025))} ${f1(Y(.23))}C${f1(X(.05))} ${f1(Y(.21))} ${f1(X(.08))} ${f1(Y(.25))} ${f1(X(.035))} ${f1(Y(.29))}Z" style="fill:${c};opacity:${f1(op)}"/>`);
    s+=o('liver',(c,op)=>`<path d="M${f1(X(-.085))} ${f1(Y(.31))}Q${f1(X(-.02))} ${f1(Y(.295))} ${f1(X(.03))} ${f1(Y(.315))}Q${f1(X(-.02))} ${f1(Y(.36))} ${f1(X(-.08))} ${f1(Y(.355))}Z" style="fill:${c};opacity:${f1(op)}"/>`);
    s+=o('fluids',(c,op)=>[-1,1].map(sg=>`<ellipse cx="${f1(X(sg*.045))}" cy="${f1(Y(.39))}" rx="${f1(H*.013)}" ry="${f1(H*.022)}" style="fill:${c};opacity:${f1(op)}"/>`).join('')+`<ellipse cx="${f1(X(0))}" cy="${f1(Y(.5))}" rx="${f1(H*.022)}" ry="${f1(H*.016)}" style="fill:${c};opacity:${f1(op)}"/>`);
    s+=o('marrow',(c,op)=>[-1,1].map(sg=>`<rect x="${f1(X(sg*.055)-H*.009)}" y="${f1(Y(.58))}" width="${f1(H*.018)}" height="${f1(H*.14)}" rx="${f1(H*.009)}" style="fill:${c};opacity:${f1(op)}"/>`).join('')+`<rect x="${f1(X(0)-H*.008)}" y="${f1(Y(.17))}" width="${f1(H*.016)}" height="${f1(H*.08)}" rx="3" style="fill:${c};opacity:${f1(op*.8)}"/>`);
    s+=o('joints',(c,op)=>[-1,1].map(sg=>`<circle cx="${f1(X(sg*.055))}" cy="${f1(Y(.77))}" r="${f1(H*.016)}" style="fill:${c};opacity:${f1(op)}"/><circle cx="${f1(X(sg*.07))}" cy="${f1(Y(.965))}" r="${f1(H*.009)}" style="fill:${c};opacity:${f1(op)}"/>`).join(''));
    s+=o('nerves',(c,op)=>[-1,1].map(sg=>`<path d="M${f1(X(sg*.175))} ${f1(Y(.45))}L${f1(X(sg*.188))} ${f1(Y(.52))}M${f1(X(sg*.04))} ${f1(Y(.86))}L${f1(X(sg*.058))} ${f1(Y(.975))}" style="stroke:${c};stroke-width:${f1(H*.012)};stroke-linecap:round;opacity:${f1(op)}"/>`).join(''));
    s+=o('tendon',(c,op)=>[-1,1].map(sg=>`<line x1="${f1(X(sg*.06))}" x2="${f1(X(sg*.062))}" y1="${f1(Y(.9))}" y2="${f1(Y(.95))}" style="stroke:${c};stroke-width:${f1(H*.01)};stroke-linecap:round;opacity:${f1(op)}"/>`).join(''));
    return s}
  const ORG={eyes:{v:.065,u:.03,n:'Eyes'},heart:{v:.25,u:.06,n:'Heart'},liver:{v:.33,u:-.02,n:'Liver'},fluids:{v:.44,u:.06,n:'Urine, sweat, tears'},skin:{v:.4,u:.19,n:'Skin, whole body'},nerves:{v:.5,u:.19,n:'Nerves'},marrow:{v:.64,u:.07,n:'Bone marrow'},joints:{v:.77,u:.07,n:'Joints'},tendon:{v:.92,u:.07,n:'Tendons'}};
  const SLOT={eyes:.04,heart:.15,liver:.255,fluids:.36,skin:.465,nerves:.57,marrow:.675,joints:.78,tendon:.885};
  function draw(t){
    const N=vb(svg,'720 440','400 '+(372+rows().length*26+40));const w=t*26;let s='';
    const lit={};SF_AE.forEach(a=>{if(!a.d.some(k=>SF_REG[reg][k]&&!off[k]))return;const v=level(a,w);if(v>0&&(!lit[a.org]||lit[a.org].v<v))lit[a.org]={v,col:a.col,a}});
    const B=N?{cx:72,top:14,H:330,lx:150}:{cx:84,top:22,H:400,lx:162};
    s+=body(B.cx,B.top,B.H,lit);
    Object.keys(ORG).forEach(k=>{const O=ORG[k],L=lit[k],ox=B.cx+O.u*B.H,oy=B.top+O.v*B.H,sy=B.top+SLOT[k]*B.H;
      const ae=SF_AE.filter(a=>a.org===k&&a.d.some(d=>SF_REG[reg][d]&&!off[d]));if(!ae.length)return;
      const best=L?L.a:ae[0];
      s+=`<path d="M${f1(ox)} ${f1(oy)}L${f1(B.lx-6)} ${f1(sy-4)}" style="fill:none;stroke:${L?L.col:'var(--line)'};stroke-width:${L?1.2:.8};opacity:${L?.9:.6}"/>`;
      if(!N)s+=`<text x="${B.lx}" y="${f1(sy-6)}" class="t-xs" style="fill:${L?'var(--ink)':'var(--muted)'};font-weight:700;opacity:${L?1:.6}">${O.n.toUpperCase()}${L&&L.v<.5?' · less typical now':''}</text>`;
      s+=`<text x="${B.lx}" y="${f1(sy+(N?-2:6))}" class="t-xs" style="fill:${L?best.col:'var(--muted)'};opacity:${L?1:.5}">${best.n} · ${best.d.filter(d=>SF_REG[reg][d]).join(' ')}</text>`;
      if(L)s+=`<text x="${B.lx}" y="${f1(sy+(N?10:17))}" class="t-xs" style="opacity:.9">${best.f}${N&&L.v<.5?' · less typical now':''}</text>`});
    /* timeline */
    const R=rows(),T=N?{lx:8,x0:178,x1:390,y0:376,rh:26}:{lx:342,x0:500,x1:708,y0:40,rh:Math.min(40,340/Math.max(1,R.length))};
    const X=wk=>lerp(T.x0,T.x1,wk/26);
    s+=`<text x="${T.lx}" y="${T.y0-16}" class="t-sm">WHEN TO WATCH · ${reg==='std'?'2HRZE/4HR':reg==='hpzm'?'2HPMZ/2HPM':'BPaLM'}</text>`;
    R.forEach((a,i)=>{const y=T.y0+i*T.rh;const ds=a.d.filter(k=>SF_REG[reg][k]&&!off[k]);
      let ra=26,rb=0;ds.forEach(k=>{ra=Math.min(ra,SF_REG[reg][k][0]);rb=Math.max(rb,SF_REG[reg][k][1])});
      const now=level(a,w)>0;
      s+=`<text x="${T.lx}" y="${f1(y+T.rh*.5+3)}" class="t-xs" style="fill:${now?'var(--ink)':'var(--muted)'};font-weight:${now?700:500}">${a.n}</text>`;
      s+=`<rect x="${f1(X(ra))}" y="${f1(y+T.rh*.3)}" width="${f1(X(rb)-X(ra))}" height="${f1(T.rh*.4)}" rx="3" style="fill:${a.col};opacity:.22"/>`;
      const ty=typOf(a);if(ty){const ta=Math.max(ra,ty[0]),tb=Math.min(rb,ty[1]);if(tb>ta)s+=`<rect x="${f1(X(ta))}" y="${f1(y+T.rh*.3)}" width="${f1(X(tb)-X(ta))}" height="${f1(T.rh*.4)}" rx="3" style="fill:${a.col};opacity:.7"/>`}
      else s+=`<rect x="${f1(X(ra))}" y="${f1(y+T.rh*.3)}" width="${f1(X(rb)-X(ra))}" height="${f1(T.rh*.4)}" rx="3" style="fill:${a.col};opacity:.45"/>`;
      let mk=[];if(a.mon==='monthly'&&ds.some(k=>'HRE'.includes(k)&&k.length===1))for(let k=0;k<rb;k+=4)mk.push(k);if(a.mon==='weekly')for(let k=0;k<rb;k++)mk.push(k);if(a.mon==='ecg'&&reg==='bpalm')mk=[0,2,12,24];if(a.mon==='ecg'&&reg==='hpzm')mk=[];
      mk.forEach(k=>{const mx=X(k)+1,my=y+T.rh*.5;s+=a.mon==='ecg'?`<path d="M${f1(mx)} ${f1(my-5)}l4 5l-4 5l-4 -5z" style="fill:var(--ink)"/>`:`<circle cx="${f1(mx)}" cy="${f1(my)}" r="${a.mon==='weekly'?1.5:2.4}" style="fill:var(--ink);opacity:.75"/>`});
      let cxr=T.x0-6;ds.slice().reverse().forEach(k=>{s+=`<text x="${f1(cxr)}" y="${f1(y+T.rh*.5+3)}" class="t-xs t-end" style="fill:${SF_DC[k]};font-weight:700">${k}</text>`;cxr-=k.length*6.5+4})});
    const yb=T.y0+R.length*T.rh+4;
    [0,4,8,12,16,20,24].forEach(k=>s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${T.y0}" y2="${yb}" class="grid"/><text x="${f1(X(k))}" y="${yb+12}" class="t-xs t-mid">${k}</text>`);
    s+=`<text x="${T.x1}" y="${yb+24}" class="t-xs t-end">weeks</text>`;
    s+=`<text x="${T.lx}" y="${yb+24}" class="t-xs">● check  ◆ ECG  dark = typical window</text>`;
    s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${T.y0-6}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/>`;
    if(!R.length)s+=`<text x="${f1((T.x0+T.x1)/2)}" y="${T.y0+20}" class="t-xs t-mid">all drugs hidden</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(SF_ST,t);setSt(ph);$('#sfNote').innerHTML=noteHTML(SF_ST[ph]);
    const gv=drugsOf().filter(k=>given(k,w)),nowAE=R.filter(a=>level(a,w)>=.8).map(a=>a.n.toLowerCase());
    $('#sfRead').innerHTML=`<span>week <b>${f1(w)}</b></span><span>drugs given <b>${gv.length?gv.join(' '):'none'}</b></span><span>in typical window <b>${nowAE.length?nowAE.join(', '):'none'}</b></span>`;
  }
  const stop=playWire(rg,$('#sfPlay'),draw,22000,'%t:player.replay%','safety');
  setSt=stepWire($('#sfSteps'),SF_ST,rg,draw,stop);
  $$('[data-sfr]').forEach(b=>b.addEventListener('click',()=>{reg=b.dataset.sfr;$$('[data-sfr]').forEach(x=>x.setAttribute('aria-pressed',x===b));Object.keys(off).forEach(k=>delete off[k]);chips();draw(+rg.value)}));
  chips();draw(+rg.value);

  /* ---- hepatotoxicity tree ---- */
  const tr=$('#sfTree'),ar=$('#sfAlt');let sym=false;
  function drawTree(){const N=vb(tr,'720 380','400 430');const alt=+ar.value;let s='';
    const lim=sym?3:5,stopIt=alt>lim;
    const tc=N?'t-xs':'t-sm';const box=(x,y,w,h,l1,l2,on,col)=>`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${w}" height="${h}" rx="9" style="fill:${on?(col||'var(--rx-soft)'):'var(--panel-2)'};stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?1.6:1};opacity:${on?1:.6}"/><text x="${f1(x)}" y="${f1(y+(l2?-3:4))}" class="${tc} t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${l1}</text>${l2?`<text x="${f1(x)}" y="${f1(y+10)}" class="${tc} t-mid" style="fill:var(--ink)">${l2}</text>`:''}`;
    const ln=(x1,y1,x2,y2,on,lbl)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?2:1}"/>${lbl?`<text x="${f1((x1+x2)/2+(x2<x1?-6:6))}" y="${f1((y1+y2)/2)}" class="t-xs ${x2<x1?'t-end':''}" style="fill:${on?'var(--ink)':'var(--muted)'}">${lbl}</text>`:''}`;
    const G=N?{c:200,r0:28,q:88,b:156,l:232,rs:300,bw:176,lw:84,lx:[52,148,252,348],bx:[100,300],gy:390}:{c:360,r0:28,q:90,b:160,l:236,rs:304,bw:200,lw:150,lx:[95,265,455,625],bx:[180,540],gy:350};
    s+=box(G.c,G.r0,N?260:300,30,'ALT rise during TB treatment','',true,'var(--panel)');
    s+=ln(G.c,G.r0+15,G.c,G.q-16,true);
    s+=box(G.c,G.q,N?220:240,32,'Symptoms or jaundice?','',true,'var(--panel)');
    s+=ln(G.c-40,G.q+16,G.bx[0],G.b-16,sym,'yes')+ln(G.c+40,G.q+16,G.bx[1],G.b-16,!sym,'no');
    s+=box(G.bx[0],G.b,G.bw,32,'ALT more than 3× ULN?','',sym)+box(G.bx[1],G.b,G.bw,32,'ALT more than 5× ULN?','',!sym);
    const lf=[[0,true],[0,false],[1,true],[1,false]];
    lf.forEach((q,i)=>{const on=(q[0]===0?sym:!sym)&&(q[1]===stopIt);const x=G.lx[i];
      s+=ln(G.bx[q[0]],G.b+16,x,G.l-17,on,q[1]?'yes':'no');
      s+=box(x,G.l,G.lw,34,q[1]?(N?'Interrupt':'Interrupt treatment'):(N?'Rule not met':'Interruption rule'),q[1]?(N?'(ATS)':'(ATS statement)'):(N?'':'not met'),on,q[1]?'var(--bad-soft)':'var(--good-soft)')});
    s+=ln(G.lx[sym?0:2],G.l+17,G.c,G.rs-17,stopIt);
    s+=box(G.c,G.rs,N?370:520,34,N?'Then: usually a modified or alternative regimen':'Then: usually a modified or alternative regimen when restarting',N?'(clinician decides how to reintroduce)':'full-dose and stepwise reintroduction recurred at similar rates',stopIt,'var(--warn-soft)');
    /* gauge */
    const gx0=N?30:160,gx1=N?370:560,gy=G.gy,gX=v=>lerp(gx0,gx1,(v-1)/9);
    s+=`<rect x="${gx0}" y="${gy}" width="${gx1-gx0}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${gx0}" y="${gy}" width="${f1(gX(alt)-gx0)}" height="10" rx="5" style="fill:${stopIt?'var(--bad)':'var(--warn)'}"/>`;
    [[3,'3×'],[5,'5×']].forEach(q=>s+=`<line x1="${f1(gX(q[0]))}" x2="${f1(gX(q[0]))}" y1="${gy-5}" y2="${gy+15}" style="stroke:var(--ink);stroke-width:${q[0]===lim?2:1};stroke-dasharray:${q[0]===lim?'none':'2 2'}"/><text x="${f1(gX(q[0]))}" y="${gy+27}" class="t-xs t-mid">${q[1]}</text>`);
    s+=`<text x="${gx0}" y="${gy-(N?22:8)}" class="t-xs" style="fill:var(--ink)">ALT ${f1(alt)} × upper limit of normal</text><text x="${N?gx0:gx1}" y="${gy-8}" class="t-xs ${N?'':'t-end'}">threshold ${lim}× ${sym?'(with symptoms)':'(no symptoms)'}</text>`;
    tr.innerHTML=s;
    const v=$('#sfVerdict');v.className='verdict '+(stopIt?'no':'yes');
    v.textContent=stopIt?`ALT ${f1(alt)}× ULN ${sym?'with symptoms or jaundice':'without symptoms'}: above the ATS threshold of ${lim}×. The statement says treatment should be interrupted.`:`ALT ${f1(alt)}× ULN ${sym?'with symptoms or jaundice':'without symptoms'}: below the ATS interruption threshold of ${lim}×. The clinician decides how closely to watch.`;
  }
  $('#sfTreeNote').innerHTML=noteHTML({k:'ATS statement, 2006',t:'3× with symptoms, 5× without',
    txt:`The ATS hepatotoxicity statement says treatment should be interrupted, and usually a modified or alternative regimen used, when ALT is more than 3 times the upper limit of normal with symptoms or jaundice, or more than 5 times without symptoms. The isoniazid label advises strongly considering stopping if enzymes exceed 3 to 5 times normal. After drug-induced hepatitis, restarting isoniazid, rifampicin and pyrazinamide all at full dose from day 1 led to recurrence at similar rates to two stepwise schemes: 19 of 175 people overall (10.9%). [[Saukkonen2006,FDA-Isoniazid,Sharma2010DILI]]`,
    pt:`A small rise in a liver test is common and often settles. A bigger rise, or any rise with yellow eyes, dark urine or feeling sick, means the medicines are paused while the liver recovers. TB treatment then restarts, sometimes with different medicines.`,
    hook:`Interrupt at ALT >3× ULN with symptoms/jaundice, or >5× ULN without. [[Saukkonen2006]]`});
  ar.addEventListener('input',drawTree);
  $('#sfSym').addEventListener('click',()=>{sym=!sym;$('#sfSym').setAttribute('aria-pressed',sym);drawTree()});
  drawTree();

  /* ---- rifampicin interactions ---- */
  const is=$('#sfInd'),ir=$('#sfIndT');let it='contra';
  $('#sfInt').innerHTML=SF_INT.map(c=>`<button data-sfi="${c.id}" aria-pressed="${c.id===it}"><b>${c.n}</b><small>${c.sm}</small></button>`).join('');
  const ind=w=>{const on=2,offW=10;if(w<on)return 0;if(w<offW)return 1-Math.exp(-(w-on)*3);const e0=1-Math.exp(-(offW-on)*3);return e0*Math.exp(-(w-offW)*1.5)};
  function drawInd(t){const N=vb(is,'720 260','400 300');const c=SF_INT.find(q=>q.id===it),W=16,w=t*W;let s='';
    const C=N?{x0:44,x1:388,y0:40,y1:240}:{x0:70,x1:700,y0:40,y1:210};const X=v=>lerp(C.x0,C.x1,v/W),V=v=>lerp(C.y1,C.y0,v);
    s+=`<rect x="${f1(X(2))}" y="${C.y0-22}" width="${f1(X(10)-X(2))}" height="16" rx="4" style="fill:var(--dR);opacity:.85"/><text x="${f1((X(2)+X(10))/2)}" y="${C.y0-10}" class="t-xs t-mid" style="fill:#fff;font-weight:700">RIFAMPICIN TAKEN</text>`;
    [0,.5,1].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/>`);
    for(let k=0;k<=W;k+=2)s+=`<text x="${f1(X(k))}" y="${C.y1+14}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${C.x1}" y="${C.y1+26}" class="t-xs t-end">weeks</text><text x="${C.x0-6}" y="${f1(V(1)+3)}" class="t-xs t-end">high</text><text x="${C.x0-6}" y="${f1(V(0)+3)}" class="t-xs t-end">low</text>`;
    const p=f=>{let d='';const n=Math.max(2,Math.round(w*8));for(let i=0;i<=n;i++){const u=w*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(V(f(u)))}return d};
    s+=`<path d="${p(u=>.1+.8*ind(u))}" style="fill:none;stroke:var(--dR);stroke-width:2.4;stroke-dasharray:6 3"/>`;
    s+=`<path d="${p(u=>.85-.65*ind(u))}" style="fill:none;stroke:var(--accent);stroke-width:3"/>`;
    s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    if(w>3)s+=`<text x="${f1(X(3.4))}" y="${f1(V(.6))}" class="t-xs" style="fill:var(--dR)">enzymes induced (~1 wk)</text>`;
    if(w>11)s+=`<text x="${f1(X(11.6))}" y="${f1(V(.5))}" class="t-xs" style="fill:var(--ink)">wears off (~2 wk)</text>`;
    s+=`<text x="${C.x0}" y="${C.y1+(N?40:42)}" class="t-xs" style="fill:var(--accent);font-weight:700">— level of ${c.co} (schematic)</text>`;
    is.innerHTML=s}
  function noteI(){const c=SF_INT.find(q=>q.id===it);$('#sfIntNote').innerHTML=noteHTML({k:'Rifampicin interaction',t:c.n,txt:c.txt,pt:c.pt+' Always check with a pharmacist.',hook:`Rifampicin is a strong CYP3A4 inducer: hormonal contraception may fail, methadone withdrawal follows, warfarin and protease inhibitor levels fall. [[Niemi2003,FDA-Rifampin]]`})}
  $('#sfInt').addEventListener('click',e=>{const b=e.target.closest('[data-sfi]');if(!b)return;it=b.dataset.sfi;$$('[data-sfi]').forEach(x=>x.setAttribute('aria-pressed',x===b));noteI();drawInd(+ir.value)});
  playWire(ir,$('#sfIndPlay'),drawInd,7000,'%t:player.replay%','safety');
  noteI();drawInd(+ir.value);
  redraws.safety=(()=>{const p=redraws.safety;return()=>{p&&p();drawTree();drawInd(+ir.value)}})();
};
