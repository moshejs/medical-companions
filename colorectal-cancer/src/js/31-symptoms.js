/* =============== 3.1 Symptoms & red flags =============== */
/* Primary-care positive predictive values as published. head = the value drawn in the 1,000-dot grid. */
const SY_SYM={
 bleed:{n:'Rectal bleeding',head:0,ppv:[['Exeter, age 40+',2.4],['First episode, men (3-year)',2.4],['First episode, women (3-year)',2.0],['Men aged 80+ (GPRD)',4.5],['Pooled, age 50+ (23 studies)',8.1]],
  txt:`In the Exeter case-control study (349 cases aged 40 and over, 1,744 controls) the positive predictive value of rectal bleeding in primary care was 2.4%. In a GPRD cohort of 762,325 patients, the 3-year PPV of a first episode was 2.4% in men and 2.0% in women and rose with age; in men aged 80 and over it reached 4.5% in a GPRD case-control study. A systematic review of 23 primary-care studies pooled 8.1% in people aged 50 and over. Bleeding as the first symptom was associated with less advanced stage and lower mortality (HR 0.56). [[Hamilton2005,Jones2007,Hamilton2009,Astin2011,Stapley2006]]`,
  pt:`Blood from your bottom is the most common warning sign in younger people, but it is frequently caused by piles. A doctor needs to check it. [[Demb2024,Monahan2022]]`,
  hook:`PPV of rectal bleeding in primary care: about 2–8%, depending on age and setting. [[Hamilton2005,Astin2011,Jones2007]]`},
 habit:{n:'Change in bowel habit',head:0,ppv:[['Diarrhoea (Exeter)',0.94],['Constipation (Exeter)',0.42],['Change in habit, men 80+ (GPRD)',3.9]],
  txt:`In the Exeter study the PPV was 0.94% for diarrhoea and 0.42% for constipation. In the larger GPRD case-control study (5,477 cases, 38,314 controls), change in bowel habit reached a PPV of 3.9% in men aged 80 and over; values were lower in women and younger patients. Rectal bleeding and change in bowel habit were the two higher-risk symptoms, yet only 27% of patients had reported either: most symptomatic cancers present with a low-risk symptom. [[Hamilton2005,Hamilton2009]]`,
  pt:`Changes in bowel habit are common and usually come from something like irritable bowel, but they can be a sign of bowel cancer. [[Monahan2022,Hamilton2009]]`,
  hook:`Rectal bleeding with a change in bowel habit: pooled positive likelihood ratio 1.8. [[Astin2011]]`},
 pain:{n:'Abdominal pain',head:0,ppv:[['Abdominal pain (Exeter)',1.1],['Abdominal tenderness (Exeter)',1.1],['Abdominal pain, pooled',3.3]],
  txt:`In the Exeter study the PPV of abdominal pain was 1.1%, and abdominal tenderness on examination also 1.1%. The systematic review pooled 3.3% (95% CI 0.7–16%). Under 50, abdominal pain is the second most common presenting feature (pooled prevalence 40%). [[Hamilton2005,Astin2011,Demb2024]]`,
  pt:`Tummy pain is common, and on its own it is rarely caused by bowel cancer. [[Hamilton2005]]`,
  hook:`Abdominal pain PPV: 1.1% (Exeter), 3.3% pooled. [[Hamilton2005,Astin2011]]`},
 weight:{n:'Weight loss',head:0,ppv:[['Weight loss (Exeter)',1.2]],
  txt:`In the Exeter study the PPV of weight loss was 1.2%. Rectal bleeding together with weight loss raised the pooled positive likelihood ratio to 1.9. In a Turkish cohort of 1,795 patients, weight loss was associated with a longer symptom time <span class="ev early">Early evidence</span>. [[Hamilton2005,Astin2011,Ozturk2019]]`,
  pt:`Losing weight without trying matters more when it comes with bleeding from the bottom. [[Astin2011]]`,
  hook:`Weight loss PPV 1.2%; with rectal bleeding, LR+ 1.9. [[Hamilton2005,Astin2011]]`},
 anaemia:{n:'Anaemia',head:3,ppv:[['Hb below 10 g/dL (Exeter)',2.3],['Anaemia, pooled',9.7],['Women, Hb <10 + iron deficiency',7.7],['Men over 60, Hb <11 + iron deficiency',13.3]],
  txt:`In the Exeter study, haemoglobin below 10.0 g/dL had a PPV of 2.3%; the systematic review pooled 9.7% for anaemia (95% CI 3.5–27%). Among 6,442 cases in the THIN database, haemoglobin below 9.0 g/dL carried a likelihood ratio of 27 in men and 41 in women. With iron deficiency the PPV was 13.3% in men over 60 with Hb below 11 g/dL and 7.7% in women with Hb below 10 g/dL. Mild anaemia (Hb 10.0–12.9 g/dL) at presentation went with more advanced stage and higher mortality (adjusted HR 1.7). [[Hamilton2005,Astin2011,Hamilton2008,Stapley2006]]`,
  pt:`Feeling tired from low iron (anaemia) can be a sign of bowel cancer, especially in older adults. [[Hamilton2008]]`,
  hook:`Iron-deficiency anaemia, man over 60, Hb below 11 g/dL: PPV 13.3%. [[Hamilton2008]]`},
 exam:{n:'Abnormal rectal examination',head:0,ppv:[['Abnormal rectal exam (Exeter)',4.0]],
  txt:`An abnormal rectal examination had a PPV of 4.0% in the Exeter study, higher than any single symptom it measured. Other signs and tests in the same study: abdominal tenderness 1.1%, haemoglobin below 10.0 g/dL 2.3%, blood glucose above 10 mmol/L 0.78%. [[Hamilton2005]]`,
  pt:`An examination finding predicted cancer better than any single symptom in that study. [[Hamilton2005]]`,
  hook:`Abnormal rectal examination: PPV 4.0% (Exeter). [[Hamilton2005]]`},
 fob:{n:'Positive faecal occult blood',head:0,ppv:[['Positive faecal occult blood (Exeter)',7.1]],
  txt:`A positive faecal occult blood test had a PPV of 7.1% in the Exeter study, higher than any symptom. Today a quantitative faecal immunochemical test (FIT) is used to sort people with symptoms by urgency: follow the pathway below. [[Hamilton2005,Monahan2022]]`,
  pt:`A stool test can find blood you cannot see. [[Monahan2022]]`,
  hook:`In the NICE FIT study, FIT predicted cancer better than symptoms (area under the ROC curve 0.93). [[DSouza2021Gut]]`}
};
const SY_SIDE={
 right:{n:'Right (proximal) colon',u:[0,.55],txt:`Right-sided tumours: cancers missed by FIT in one UK cohort were right-sided (caecal), mostly in people with iron-deficiency anaemia, so a low FIT result is less reassuring when there is iron-deficiency anaemia <span class="ev early">Early evidence</span>. In a cohort of 1,795 patients, anaemia and a right-colon tumour were each associated with a longer symptom time, although overall symptom duration did not differ by tumour site <span class="ev early">Early evidence</span>. [[Monahan2022,Ozturk2019]]`},
 left:{n:'Left (distal) colon',u:[.55,.89],txt:`Left-sided tumours: in the same 1,795-patient cohort, the principal presenting symptoms were significantly associated with left colon cancer <span class="ev early">Early evidence</span>. The rise of colorectal cancer in younger adults is dominated by left-sided tumours, which the ACS links to more rectal bleeding in younger patients. [[Ozturk2019,Siegel2026CRC]]`},
 rectal:{n:'Rectum',u:[.89,1],txt:`Rectal tumours: rectal bleeding as a first symptom was associated with less advanced stage. Rectal cancer had the lowest share of emergency presentations among the cancers studied in six high-income countries (12.1% on average). The guideline suggests flexible sigmoidoscopy for persistent anorectal bleeding even when fHb is below 10 µg Hb/g (weak recommendation). [[Stapley2006,McPhail2022,Monahan2022]]`}
};
const SY_FIT={2:{pos:37.2,sens:97.0,ppv:8.7,npv:99.8,x:`Lower thresholds catch more cancers at the cost of more referrals. At the limit of detection (≥2 to ≥7 µg Hb/g), pooled primary-care data gave sensitivity 93.4% and specificity 76.9%. [[DSouza2021Gut,Monahan2022]]`},
 10:{pos:19.0,sens:90.9,ppv:16.1,npv:99.6,x:`At 10 µg/g, a primary-care meta-analysis (23 studies, 69,536 people) found sensitivity 87.2% and specificity 84.4%. In people with iron-deficiency anaemia, FIT sensitivity was 80.0% against 89.0% with other symptoms <span class="ev early">Early evidence</span>. [[PinVieito2022,Monahan2022]]`},
 150:{pos:7.6,sens:70.8,ppv:31.1,npv:98.9,x:`At ≥150 µg/g a positive result is much more likely to mean cancer, but more cancers are missed: pooled sensitivity was 64.1% with specificity 95.0%. [[PinVieito2022]]`}};
const SY_STEPS=[
 {from:0,at:.06,k:'Step 1 · primary care',t:'A symptom',
  txt:`Most colorectal cancers are diagnosed after symptoms begin, and most present in primary care <span class="ev est">Established</span>. The ACS names four red flags for public and clinician awareness: rectal bleeding, abdominal pain, diarrhoea and iron-deficiency anaemia. Combinations matter: rectal bleeding with weight loss or with a change in bowel habit had pooled positive likelihood ratios of 1.9 and 1.8, while bleeding with abdominal pain, diarrhoea or constipation had ratios of 1 or less. [[Hamilton2005,Astin2011,Siegel2026CRC]]`,
  pt:`Most of the time these symptoms are caused by something less serious, like piles or irritable bowel. That is why a doctor needs to check them. [[Monahan2022]]`,
  hook:`Most symptomatic CRCs present with a low-risk symptom: only 27% had reported rectal bleeding or change in bowel habit. [[Hamilton2009]]`},
 {from:.17,at:.3,k:'Step 2 · FIT in primary care',t:'A FIT stool test',txt:'',
  pt:`A simple poo test called FIT looks for tiny amounts of blood. It helps doctors decide who needs a camera test quickly. [[Monahan2022]]`,
  hook:`NICE FIT study at 10 µg/g: sensitivity 90.9%, NPV 99.6%. UK urgent-referral threshold: fHb ≥10 µg Hb/g. [[DSouza2021Gut,Monahan2022]]`},
 {from:.4,at:.52,k:'Step 3 · endoscopy',t:'Colonoscopy and biopsy',
  txt:`Colonoscopy examines the bowel and takes biopsies of anything suspicious. The whole colon matters: in a Dutch registry, 3.9% of people with colorectal cancer (534 of 13,683, about 1 in 25) had a second, separate cancer at the same time, and in 34% of those the tumours lay in different surgical segments, so the authors concluded the whole colon should be examined, preferably before surgery. For people with symptoms, the ACPGBI/BSG guideline treats CT colonography as equivalent to colonoscopy for detecting cancer. The procedure step by step: <a href="#colonoscopy" data-go="colonoscopy">Colonoscopy, animated</a>. [[Mulder2011,Monahan2022]]`,
  pt:`The whole bowel is checked, because about 1 in 25 people with bowel cancer have a second cancer elsewhere in it. [[Mulder2011]]`,
  hook:`Synchronous CRC: 3.9% (about 1 in 25); examine the whole colon, preferably before surgery. [[Mulder2011]]`},
 {from:.6,at:.7,k:'Step 4 · staging',t:'CT and MRI staging',
  txt:`Scans then show how far the cancer has spread. In a meta-analysis, CT detected growth beyond the bowel wall (T3–T4) with sensitivity 90% and specificity 69%, but was less accurate for lymph nodes (71% and 67%). For rectal cancer, high-resolution pelvic MRI in the MERCURY study predicted a clear circumferential resection margin (CRM) with 92% specificity and measured spread beyond the wall to within 0.5 mm of the pathology. ASCO recommends a CEA blood test before surgery if it would help with staging and surgical planning. How the stage is worked out: <a href="#staging" data-go="staging">Staging: TNM calculator</a>. [[Nerad2016,MERCURY2006,MERCURY2007,Locker2006]]`,
  pt:`Scans show how deep the cancer has grown and whether it has spread. For rectal cancer, MRI shows how close it is to the edge the surgeon will cut along. [[Nerad2016,MERCURY2006]]`,
  hook:`MRI-involved CRM (tumour ≤1 mm from the mesorectal fascia): 5-year OS 42.2% vs 62.2% when clear. [[Taylor2014]]`},
 {from:.8,at:.95,k:'Routes · England 2006–2008',t:'Routes to diagnosis',
  txt:`Of 91,416 colorectal cancers in England, 26% were diagnosed after an emergency presentation, 27% through the urgent 2-week-wait route, 20% through routine GP referral and 2% by screening. One-year relative survival was 50% after emergency presentation, 82% via the 2-week wait and 98% when screen-detected (74% for all routes). These are population statistics; emergency presentation is more likely at older age and advanced stage. [[EllissBrookes2012,McPhail2022]]`,
  pt:`About 1 in 4 bowel cancers in England were found only after an emergency hospital visit. People found this way did less well. [[EllissBrookes2012]]`,
  hook:`Emergency presentation: 26% of English CRCs; 1-year survival 50% vs 82% via the 2-week wait. [[EllissBrookes2012]]`}
];

inits.symptoms=()=>{
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" style="${st}"/>`;
  const Ln=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const lines=(x,y,arr,c='t-sm',dy=15,st='')=>arr.map((l,i)=>T(x,y+i*dy,l,c,st)).join('');
  const head=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--brand);font-weight:600');
  const drop=(x,y,r,col)=>`<path d="M${f1(x)} ${f1(y-r*1.6)}Q${f1(x+r)} ${f1(y-r*.3)} ${f1(x+r)} ${f1(y+r*.2)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x-r)} ${f1(y+r*.2)}Q${f1(x-r)} ${f1(y-r*.3)} ${f1(x)} ${f1(y-r*1.6)}Z" style="fill:${col}"/>`;
  const segPath=(C,u0,u1,col,w,op)=>{let d='';for(let i=0;i<=40;i++){const q=C.at(lerp(u0,u1,i/40));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}"/>`};
  /* 1,000 dots, n of them lit */
  function dots(x,y,pitch,n,k,col){let s='';const lit=Math.round(n*k);
    for(let i=0;i<1000;i++){const c=i%50,r=Math.floor(i/50);s+=`<circle cx="${f1(x+c*pitch)}" cy="${f1(y+r*pitch)}" r="${f1(pitch*.34)}" style="fill:${i<lit?col:'var(--line)'}"/>`}return s}

  /* ---------- symptom map ---------- */
  const bs=$('#syBody');let sym='bleed',side=null,bp=1,bStop=null;
  function body(x,y,sc){const P=(a,b)=>f1(x+a*sc)+' '+f1(y+b*sc);
    return `<circle cx="${f1(x+130*sc)}" cy="${f1(y+30*sc)}" r="${f1(24*sc)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`+
      `<path d="M${P(88,62)}Q${P(58,66)} ${P(50,100)}L${P(30,210)}Q${P(26,224)} ${P(38,224)}L${P(56,140)}L${P(54,206)}Q${P(52,266)} ${P(76,306)}L${P(184,306)}Q${P(208,266)} ${P(206,206)}L${P(204,140)}L${P(222,224)}Q${P(234,224)} ${P(230,210)}L${P(210,100)}Q${P(202,66)} ${P(172,62)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4;stroke-linejoin:round"/>`}
  function drawB(){const N=vb(bs,'720 380','400 620'),S=SY_SYM[sym],p=bp;let s='';
    const bx=N?70:20,by=N?16:22,sc=N?1:1.05;
    s+=body(bx,by,sc);
    if(sym==='weight')s+=`<path d="M${f1(bx+100*sc)} ${f1(by+150*sc)}L${f1(bx+96*sc)} ${f1(by+290*sc)}M${f1(bx+160*sc)} ${f1(by+150*sc)}L${f1(bx+164*sc)} ${f1(by+290*sc)}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(p)}"/>`+T(bx+130*sc,by+322*sc,'weight loss','t-xs t-mid','fill:var(--warn)');
    if(sym==='anaemia')s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(260*sc)}" height="${f1(310*sc)}" style="fill:var(--panel);opacity:${f1(.45*p)}"/>`;
    const C=colon(bx+76*sc,by+150*sc,.36*sc,{w:9*sc});s+=C.svg;
    if(side){const D=SY_SIDE[side];s+=segPath(C,D.u[0],D.u[1],'var(--brand)',9*sc,.75)}
    const an=C.at(1);
    if(sym==='bleed')for(let i=0;i<3;i++){const fy=(p*1.6+i*.33)%1;s+=drop(an[0]+(i-1)*7,an[1]+12+fy*28,3.2,'var(--blood)')}
    if(sym==='habit')s+=segPath(C,.6,.95,'var(--polyp)',6*sc,.4+.5*Math.abs(Math.sin(p*Math.PI*3)));
    if(sym==='pain'){const c=C.at(.42),cx=bx+130*sc,cy=by+205*sc;for(let i=0;i<8;i++){const a=i/8*Math.PI*2,r0=26*sc,r1=r0+12*sc*p;s+=Ln(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0,cx+Math.cos(a)*r1,cy+Math.sin(a)*r1,'stroke:var(--warn);stroke-width:2.2;stroke-linecap:round')}}
    if(sym==='anaemia'){const cx=bx+165*sc,cy=by+100*sc;s+=drop(cx,cy,10*sc,'var(--blood)')+T(cx+16*sc,cy+5,'Hb ↓','t-lbl','fill:var(--blood)')}
    if(sym==='exam'){const q=C.at(.96);s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(5*sc*p+.1)}" style="fill:var(--tumour)"/>`+`<path d="M${f1(q[0]+48*sc)} ${f1(q[1]+30*sc)}L${f1(q[0]+10)} ${f1(q[1]+4)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#syArr)"/>`+T(q[0]+50*sc,q[1]+44*sc,'lump felt','t-xs t-mid','fill:var(--ink)')}
    if(sym==='fob')s+=tube(bx+236*sc,by+250*sc,.9*sc,{fill:p})+drop(bx+236*sc,by+214*sc,5,'var(--blood)');
    if(side)s+=T(bx+130*sc,by+(N?346:350),SY_SIDE[side].n,'t-sm t-mid','fill:var(--brand);font-weight:600');
    /* PPV bars */
    const rx=N?20:322,ry=N?370:40,rw=N?250:300,rh=N?28:30;
    s+=head(rx,ry,'PPV IN PRIMARY CARE · '+S.n.toUpperCase());
    S.ppv.forEach(([l,v],i)=>{const y=ry+14+i*rh,k=clamp(p*1.6-i*.15);
      s+=T(rx,y+8,l,'t-xs',i===S.head?'fill:var(--ink)':'');
      s+=R(rx,y+12,rw*v/14*k,10,`fill:var(--tumour);opacity:${i===S.head?1:.5}`);
      if(k>.97)s+=T(rx+rw*v/14+6,y+21,v+'%','t-sm',i===S.head?'fill:var(--tumour);font-weight:600':'')});
    const hv=S.ppv[S.head][1],gy=N?ry+14+5*rh+8:206,gp=N?7.2:7;
    s+=T(rx,gy,`≈ ${Math.round(hv*10)} in 1,000 people with “${S.ppv[S.head][0]}” have colorectal cancer`,'t-xs','fill:var(--ink)');
    s+=dots(rx+3,gy+12,gp,hv*10,ramp(p,.2,1),'var(--tumour)');
    s+=T(rx,gy+12+20*gp+8,`the other ≈ ${1000-Math.round(hv*10)} do not`,'t-xs');
    bs.innerHTML=`<defs>${marker('syArr','var(--ink)')}</defs>`+s;
    let h=noteHTML(Object.assign({k:'Symptom · primary care',t:S.n},S));
    if(side)h+=`<div class="callout"><p>${SY_SIDE[side].txt}</p><p class="stage-cap" style="margin-top:6px">Textbook patterns by side are tendencies, not rules: no source with numbers for the classic “right = anaemia, left = obstruction” teaching was found for this guide.</p></div>`;
    $('#syBodyNote').innerHTML=h}
  function runB(){if(bStop)bStop();bp=0;bStop=animate(1400,q=>{bp=q;drawB()},()=>{bStop=null})}
  $$('[data-sy-sym]').forEach(b=>b.addEventListener('click',()=>{sym=b.dataset.sySym;$$('[data-sy-sym]').forEach(x=>x.setAttribute('aria-pressed',x===b));runB()}));
  $$('[data-sy-side]').forEach(b=>b.addEventListener('click',()=>{side=side===b.dataset.sySide?null:b.dataset.sySide;$$('[data-sy-side]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sySide===side));drawB()}));
  onHide.symptoms=()=>{if(bStop){bStop();bStop=null;bp=1}};
  drawB();

  /* ---------- the pathway ---------- */
  const svg=$('#sySvg'),rg=$('#syT');let thr=10,setSt=()=>{};
  const KN=[[0,0],[.12,0],[.24,1],[.4,1],[.48,2],[.6,2],[.66,3],[1,3]];
  const posAt=t=>{for(let i=1;i<KN.length;i++)if(t<=KN[i][0]){const a=KN[i-1],b=KN[i];return lerp(a[1],b[1],ease((t-a[0])/(b[0]-a[0])))}return 3};
  const loc=(ph,t)=>{const a=SY_STEPS[ph].from,b=ph<SY_STEPS.length-1?SY_STEPS[ph+1].from:1.04;return clamp((t-a)/((b-a)*.8))};
  function stations(N,pos,ph){let s='';const xs=N?[50,150,250,350]:[90,270,450,630],y=N?44:50,lab=N?['Symptom','FIT','Colonoscopy','Scans']:['Symptom in primary care','FIT stool test','Colonoscopy + biopsy','CT / MRI staging'];
    s+=Ln(xs[0],y,xs[3],y,'stroke:var(--line);stroke-width:4;stroke-linecap:round');
    s+=Ln(xs[0],y,lerp(xs[0],xs[3],pos/3),y,'stroke:var(--brand);stroke-width:4;stroke-linecap:round');
    xs.forEach((x,i)=>{const on=Math.round(pos)===i&&ph<4;s+=`<circle cx="${x}" cy="${y}" r="${N?17:20}" style="fill:var(--panel);stroke:${pos>=i-.02?'var(--brand)':'var(--line)'};stroke-width:${on?3:1.6}"/>`;
      if(i===0)s+=person(x,y-11,22,'var(--muted)');
      if(i===1)s+=tube(x,y+4,.55);
      if(i===2)s+=scope(x+3,y,0);
      if(i===3)s+=`<circle cx="${x}" cy="${y}" r="9" style="fill:none;stroke:var(--accent);stroke-width:3"/><circle cx="${x}" cy="${y}" r="3" style="fill:var(--accent)"/>`;
      s+=T(x,y+(N?32:36),lab[i],'t-xs t-mid',on?'fill:var(--ink);font-weight:600':'')});
    const tx=lerp(xs[0],xs[3],pos/3);if(ph<4)s+=`<circle cx="${f1(tx)}" cy="${y-(N?24:28)}" r="5" style="fill:var(--brand)"/><path d="M${f1(tx-5)} ${y-(N?21:25)}L${f1(tx)} ${y-(N?14:18)}L${f1(tx+5)} ${y-(N?21:25)}Z" style="fill:var(--brand)"/>`;
    return s}
  function p0(N,p){let s='';const y0=N?110:118;
    s+=head(20,y0,'ACS RED FLAGS');
    ['Rectal bleeding','Abdominal pain','Diarrhoea','Iron-deficiency anaemia'].forEach((l,i)=>{const k=clamp(p*3-i*.4);if(k<=0)return;const cx=N?20+(i%2)*186:20,cy=N?y0+14+Math.floor(i/2)*36:y0+14+i*40,w=N?176:200;
      s+=`<g style="opacity:${f1(k)}"><rect x="${cx}" y="${cy}" width="${w}" height="28" rx="14" style="fill:var(--tumour-soft);stroke:var(--tumour)"/>${T(cx+w/2,cy+18,l,'t-sm t-mid','fill:var(--tumour);font-weight:600')}</g>`});
    const lx=N?20:280,ly=N?y0+110:y0,lw=N?250:300,X=v=>lx+lw*v/2.2;
    s+=head(lx,ly,'POOLED LIKELIHOOD RATIO (LR+), RECTAL BLEEDING PLUS…');
    const rows=[['… weight loss',1.9],['… change in bowel habit',1.8],['… pain, diarrhoea or constipation',1]];
    rows.forEach(([l,v],i)=>{const y=ly+18+i*(N?46:52),k=clamp(p*2-.3-i*.2);s+=T(lx,y+10,l,'t-xs','fill:var(--ink)');
      s+=R(lx,y+16,(X(v)-lx)*k,14,`fill:${i<2?'var(--tumour)':'var(--muted)'};opacity:.85`);
      if(k>.97)s+=T(X(v)+6,y+28,i<2?v.toFixed(1):'≤ 1','t-sm',i<2?'fill:var(--tumour);font-weight:600':'')});
    const yb=ly+18+3*(N?46:52);s+=Ln(X(1),ly+20,X(1),yb,'stroke:var(--ink);stroke-dasharray:3 3;opacity:.6')+T(X(1),yb+12,'1 = no change in odds','t-xs t-mid');
    s+=T(N?20:280,N?530:356,'Only 27% of patients reported either higher-risk symptom','t-xs','fill:var(--ink)');
    return s}
  function p1(N,p){let s='';const F=SY_FIT[thr],POS=Math.round(F.pos*10),CA=33,CAUGHT=Math.round(CA*F.sens/100),MISS=CA-CAUGHT;
    const gx=N?22:40,gy=N?122:132,pt=N?7.2:7.4,k=Math.round(p*1000);
    s+=head(gx,gy-14,`1,000 PEOPLE REFERRED · FIT AT ${thr} µg Hb/g`);
    for(let i=0;i<1000;i++){const c=Math.floor(i/20),r=i%20,x=gx+c*pt,y=gy+r*pt;if(i>=k){s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(pt*.3)}" style="fill:var(--line)"/>`;continue}
      const pos=i<POS,ca=i<CAUGHT||(i>=POS&&i<POS+MISS);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(pt*.36)}" style="fill:${ca?'var(--tumour)':pos?'var(--warn-soft)':'var(--panel-2)'};stroke:${pos?'var(--warn)':'none'};stroke-width:1"/>`}
    const bxp=gx+Math.ceil(POS/20)*pt-pt/2;if(p>.5)s+=Ln(bxp,gy-6,bxp,gy+20*pt-2,'stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3')+T(bxp-4,gy+20*pt+12,'← test positive','t-xs t-end','fill:var(--warn)')+T(bxp+4,gy+20*pt+12,'test negative →','t-xs');
    const tx=N?22:430,ty=N?318:132;
    if(p>.6){const L=[[`${POS} test positive (${F.pos}%)`,'var(--warn)'],[`${CAUGHT} of 33 cancers caught`,'var(--tumour)'],[`${MISS} cancer${MISS===1?'':'s'} missed (negative test)`,'var(--ink)'],['',''],[`Published sensitivity ${F.sens}%`,'var(--ink)'],[`Published PPV ${F.ppv}%`,'var(--ink)'],[`Published NPV ${F.npv}%`,'var(--ink)']];
      L.forEach(([l,c],i)=>{if(l)s+=T(tx,ty+i*(N?19:22),l,'t-lbl',`fill:${c}`)});
      s+=lines(tx,ty+7*(N?19:22)+8,['Counts derived: 3.3% prevalence,','published positivity and sensitivity.'],'t-xs',13)}
    return s}
  function p2(N,p){let s='';const cx=N?50:46,cy=N?118:128,sc=N?.98:.8;
    const C=colon(cx,cy,sc,{w:20*sc});s+=C.svg;
    const tu=C.at(.8);s+=`<circle cx="${f1(tu[0])}" cy="${f1(tu[1])}" r="${f1(9*sc)}" style="fill:var(--tumour);stroke:var(--field);stroke-width:1.5"/>`;
    const u=1-p*.97;let d='';for(let i=0;i<=40;i++){const q=C.at(lerp(1,u,i/40));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}
    const an=C.at(1);d='M'+f1(an[0])+' '+f1(an[1]+40)+'L'+d.slice(1);
    s+=`<path d="${d}" style="fill:none;stroke:var(--scope);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round"/>`;
    const a=C.at(u),b=C.at(Math.max(0,u-.01));s+=scope(a[0],a[1],Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI,{light:true});
    if(u<.82){s+=`<circle cx="${f1(tu[0])}" cy="${f1(tu[1])}" r="${f1(15*sc)}" style="fill:none;stroke:var(--gold);stroke-width:1.6;stroke-dasharray:3 3"/>`+T(tu[0]+18*sc,tu[1]+26*sc,'biopsy','t-sm','fill:var(--gold);font-weight:600')}
    if(p>.95)s+=T(C.at(0)[0]+16,C.at(0)[1]+34,'caecum reached','t-xs','fill:var(--good)');
    const tx=N?22:360,ty=N?405:140,dy=N?17:20;
    if(p>.3)s+=lines(tx,ty,['Second, separate cancer at the same','time: 3.9% (about 1 in 25)','','In 34% of those, the tumours were','in different surgical segments','','For symptoms: CT colonography treated','as equivalent for detecting cancer'],'t-sm',dy,'fill:var(--ink)');
    return s}
  function p3(N,p){let s='';
    const ax=N?20:30,ay=N?110:118,aw=N?360:320;
    s+=head(ax,ay,'CT · COLON CANCER (META-ANALYSIS)');
    [['Beyond the wall (T3–T4)',90,69],['Lymph nodes',71,67]].forEach(([l,se,sp],i)=>{const y=ay+22+i*(N?62:70),k=clamp(p*2-i*.3);
      s+=T(ax,y,l,'t-lbl');
      s+=R(ax,y+8,aw*.62*se/100*k,12,'fill:var(--accent)')+R(ax,y+24,aw*.62*sp/100*k,12,'fill:var(--accent);opacity:.45');
      if(k>.97)s+=T(ax+aw*.62*se/100+6,y+18,'sensitivity '+se+'%','t-xs','fill:var(--ink)')+T(ax+aw*.62*sp/100+6,y+34,'specificity '+sp+'%','t-xs')});
    const mx=N?110:500,my=N?400:236,R0=N?62:72,k=ease(clamp(p*1.6-.2));
    s+=head(N?20:390,N?262:118,'PELVIC MRI · RECTAL CANCER (MERCURY)');
    s+=`<circle cx="${mx}" cy="${my}" r="${R0}" style="fill:var(--fat);opacity:.7;stroke:var(--accent);stroke-width:1.8;stroke-dasharray:6 4"/>`;
    s+=`<circle cx="${mx}" cy="${my}" r="${R0*.48}" style="fill:var(--mucosa);stroke:var(--mucosa-line);stroke-width:2"/><circle cx="${mx}" cy="${my}" r="${R0*.2}" style="fill:var(--field)"/>`;
    const ang=-.9,tr=R0*(.48+.36*k);s+=`<path d="M${f1(mx+Math.cos(ang-.6)*R0*.3)} ${f1(my+Math.sin(ang-.6)*R0*.3)}Q${f1(mx+Math.cos(ang)*tr*1.1)} ${f1(my+Math.sin(ang)*tr*1.1)} ${f1(mx+Math.cos(ang+.6)*R0*.3)} ${f1(my+Math.sin(ang+.6)*R0*.3)}Z" style="fill:var(--tumour);opacity:.9"/>`;
    if(k>.95){const ex=mx+Math.cos(ang)*tr,ey=my+Math.sin(ang)*tr,fx=mx+Math.cos(ang)*R0,fy=my+Math.sin(ang)*R0;s+=Ln(ex,ey,fx,fy,'stroke:var(--ink);stroke-width:1.6')+T(fx+8,fy-4,'CRM','t-sm','fill:var(--ink);font-weight:600')}
    s+=T(mx,my+R0+16,'mesorectal fascia (dashed)','t-xs t-mid');
    const tx=N?190:590,ty=N?330:150;
    if(p>.55)s+=lines(tx,ty,N?['Clear-margin','prediction:','specificity 92%','','Spread beyond','the wall: within','0.5 mm of','pathology','','Involved CRM','= tumour ≤1 mm','from the fascia']:['Clear-margin','prediction:','specificity 92%','','Depth beyond','the wall: within','0.5 mm of','pathology','','Involved CRM:','≤1 mm from','the fascia'],'t-xs',14,'fill:var(--ink)');
    return s}
  function p4(N,p){let s='';const rows=[['Emergency',26,50],['Two-week wait',27,82],['GP referral',20,null],['Screen-detected',2,98]];
    const y0=N?120:122;s+=head(20,y0-4,'ROUTES TO DIAGNOSIS · ENGLAND 2006–2008');
    const sx=N?20:190,sw=N?170:230,vx=N?220:480,vw=N?160:210,dy=N?92:52,rt=N?y0+30:y0+26;
    s+=T(sx,rt,'share of cancers','t-xs')+T(vx,rt,'1-year relative survival','t-xs');
    rows.forEach(([l,sh,sv],i)=>{const y=(N?y0+56:y0+46)+i*dy,k=clamp(p*2.2-i*.25);
      if(N)s+=T(20,y-6,l,'t-lbl',i===0?'fill:var(--tumour)':'');else s+=T(sx-12,y+12,l,'t-lbl t-end',i===0?'fill:var(--tumour)':'');
      s+=R(sx,y,sw*sh/30*k,18,`fill:${i===0?'var(--tumour)':'var(--muted)'};opacity:.85`);if(k>.97)s+=T(sx+sw*sh/30+6,y+14,sh+'%','t-sm','fill:var(--ink)');
      s+=Ln(vx,y+9,vx+vw,y+9,'stroke:var(--line)');
      if(sv!=null){const cx=vx+vw*sv/100*k;s+=`<circle cx="${f1(cx)}" cy="${y+9}" r="7" style="fill:${i===0?'var(--tumour)':i===3?'var(--good)':'var(--accent)'}"/>`;if(k>.97)s+=T(cx,y-3,sv+'%','t-sm t-mid','fill:var(--ink);font-weight:600')}
      else if(k>.97)s+=T(vx+vw/2,y+13,'not reported here','t-xs t-mid')});
    const fy=(N?y0+56:y0+46)+4*dy+(N?-10:14);s+=T(20,fy,'All routes: 1-year relative survival 74%','t-sm','fill:var(--ink)');
    return s}
  const PS=[p0,p1,p2,p3,p4];
  function note(ph){const S=SY_STEPS[ph];if(ph!==1)return S;const F=SY_FIT[thr];
    return Object.assign({},S,{txt:`A faecal immunochemical test (FIT) measures haemoglobin in a stool sample (µg Hb/g faeces). In the NICE FIT study, 9,822 people referred on the urgent 2-week-wait pathway gave a sample and 3.3% had colorectal cancer. At ${thr} µg/g, ${F.pos}% tested positive; sensitivity was ${F.sens}%, PPV ${F.ppv}% and NPV ${F.npv}%. FIT predicted cancer better than symptoms (area under the ROC curve 0.93). The ACPGBI/BSG guideline recommends fHb ≥10 µg Hb/g to select people with lower GI symptoms for urgent referral, and that nobody be excluded from referral on FIT alone: persistent unexplained symptoms with ongoing GP concern still warrant referral. [[DSouza2021Gut,Monahan2022]] ${F.x}`})}
  function draw(t){const N=vb(svg,'720 380','400 560'),ph=phaseOf(SY_STEPS,t),p=loc(ph,t);
    svg.innerHTML=stations(N,posAt(t),ph)+PS[ph](N,ph===4?p:ease(p));
    setSt(ph);$('#syNote').innerHTML=noteHTML(note(ph));
    const F=SY_FIT[thr];
    $('#syRead').innerHTML=[`<span>red flags <b>bleeding · pain · diarrhoea · IDA</b></span>`,`<span>FIT <b>${thr} µg/g</b></span><span>positive <b>${F.pos}%</b></span><span>sensitivity <b>${F.sens}%</b></span><span>PPV <b>${F.ppv}%</b></span><span>NPV <b>${F.npv}%</b></span>`,
      `<span>synchronous cancer <b>3.9%</b></span>`,`<span>CT T3–T4 sens/spec <b>90/69%</b></span><span>MRI clear-CRM spec <b>92%</b></span>`,`<span>emergency <b>26%</b> · 1-yr survival <b>50%</b></span><span>2-week wait <b>82%</b></span><span>screen-detected <b>98%</b></span>`][ph]}
  const stop=playWire(rg,$('#syPlay'),draw,26000,'%t:player.replay%','symptoms');
  setSt=stepWire($('#sySteps'),SY_STEPS,rg,draw,stop);
  $$('[data-sy-fit]').forEach(b=>b.addEventListener('click',()=>{thr=+b.dataset.syFit;$$('[data-sy-fit]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const t=+rg.value;if(phaseOf(SY_STEPS,t)!==1){stop();rg.value=SY_STEPS[1].at}draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- early onset ---------- */
  const es=$('#syEo');let rf=1,ep=1,eStop=null;const OR={1:1.94,2:3.59,3:6.52};
  function drawE(){const N=vb(es,'720 270','400 540');let s='';const p=ep;
    const A={x:N?20:20,y:N?24:30,w:N?250:150},B={x:N?20:262,y:N?200:30,w:N?340:200},Cc={x:N?20:510,y:N?380:30,w:N?280:150};
    s+=head(A.x,A.y,N?'PRESENTING FEATURES UNDER 50 (POOLED)':'FEATURES UNDER 50');
    [['Visible blood (haematochezia)',45],['Abdominal pain',40],['Altered bowel habit',27]].forEach(([l,v],i)=>{const y=A.y+20+i*(N?42:58),k=clamp(p*2-i*.2);
      s+=T(A.x,y+8,l,'t-xs','fill:var(--ink)')+R(A.x,y+14,A.w*v/50*k,14,'fill:var(--tumour);opacity:.85');if(k>.97)s+=T(A.x+A.w*v/50+6,y+26,v+'%','t-sm','fill:var(--ink)')});
    if(!N)s+=T(A.x,A.y+200,'81 studies, pooled prevalence','t-xs');
    s+=head(B.x,B.y,'MONTHS FROM SYMPTOM TO DIAGNOSIS');
    const X=m=>B.x+B.w*m/14,by=B.y+(N?30:40);
    [0,4,8,12].forEach(m=>s+=Ln(X(m),by,X(m),by+(N?120:170),'stroke:var(--line);stroke-dasharray:2 4')+T(X(m),by+(N?132:184),m,'t-xs t-mid'));
    [['Mean 6.4 (23 studies)',6.4,1.8,13.7],['Median 4 (16 studies)',4,2,8.7],['Median interval, US study',8.7,null,null]].forEach(([l,v,lo,hi],i)=>{const y=by+10+i*(N?38:52),k=ease(clamp(p*2-i*.25));
      s+=T(B.x,y,l,'t-xs','fill:var(--ink)')+R(B.x,y+6,(X(v)-B.x)*k,12,`fill:${i<2?'var(--warn)':'var(--accent)'};opacity:.85`);
      if(k>.97&&lo!=null)s+=Ln(X(lo),y+12,X(hi),y+12,'stroke:var(--ink);stroke-width:1.3')+Ln(X(lo),y+7,X(lo),y+17,'stroke:var(--ink)')+Ln(X(hi),y+7,X(hi),y+17,'stroke:var(--ink)')});
    s+=T(B.x+B.w,by+(N?146:198),'months; whiskers = range of study values','t-xs t-end');
    s+=head(Cc.x,Cc.y,N?'ODDS OF EARLY-ONSET CRC BY NUMBER OF RED FLAGS':'ODDS BY RED-FLAG COUNT');
    const H=N?100:150,bb=Cc.y+30+H,V=v=>bb-H*v/7,bw=N?60:36;
    s+=Ln(Cc.x,V(1),Cc.x+Cc.w,V(1),'stroke:var(--ink);stroke-dasharray:3 3;opacity:.6')+T(Cc.x+Cc.w,V(1)-4,'OR 1','t-xs t-end');
    [1,2,3].forEach((n,i)=>{const cx=Cc.x+(N?40:24)+i*(N?90:52),on=n===rf,k=on?ease(p):1,v=1+(OR[n]-1)*k;
      s+=R(cx-bw/2,V(v),bw,bb-V(v),`fill:var(--tumour);opacity:${on?1:.3}`)+T(cx,bb+14,n===3?'3+':n,'t-sm t-mid',on?'fill:var(--ink);font-weight:600':'');
      s+=T(cx,V(v)-6,OR[n].toFixed(2),'t-sm t-mid',on?'fill:var(--tumour);font-weight:600':'')});
    s+=T(Cc.x,bb+30,'red flags 3 months–2 years before diagnosis','t-xs');
    es.innerHTML=s;
    $('#syEoCap').innerHTML=`With ${rf===3?'3 or more red flags':rf+' red flag'+(rf>1?'s':'')}, the odds of early-onset colorectal cancer were ${OR[rf]} times those with none (US case-control study, 5,075 cases). About 19.3% had their first sign 3 months to 2 years before diagnosis; the median diagnostic interval was 8.7 months. In a meta-analysis of 81 studies, visible blood carried at least a 5-fold risk (estimates 5.2–54.0) and time from symptom to diagnosis averaged 6.4 months. [[Fritz2023,Demb2024]]`}
  $$('[data-sy-rf]').forEach(b=>b.addEventListener('click',()=>{rf=+b.dataset.syRf;$$('[data-sy-rf]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(eStop)eStop();ep=0;eStop=animate(900,q=>{ep=q;drawE()},()=>{eStop=null})}));
  const prevH=onHide.symptoms;onHide.symptoms=()=>{prevH&&prevH();if(eStop){eStop();eStop=null;ep=1}};
  const prevR=redraws.symptoms;redraws.symptoms=()=>{prevR&&prevR();drawB();drawE()};
  drawE();
};
