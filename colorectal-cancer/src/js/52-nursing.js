/* =============== 5.2 Nursing care =============== */
const NU_STEPS=[
 {from:0,at:.08,k:'Before · colonoscopy',t:'Bowel-prep teaching',
  txt:`The 2025 US Multi-Society Task Force update (replacing 2014) recommends split-dose preparation and suggests a 2 L regimen may be enough. Same-day prep is acceptable for afternoon colonoscopy but inferior for a morning one. Diet restriction is limited to the day before, with clear liquids or low-fibre, low-residue meals for breakfast and lunch; oral simethicone is suggested. Units should track adequate preps, with a target above 90% per endoscopist. ESGE adds: start the last dose within 5 hours of colonoscopy and finish at least 2 hours before. [[Jacobson2025,Johnson2014,Hassan2019]]`,
  pt:`Split the laxative between the evening before and the morning of the test, eat light low-fibre food the day before, and follow the written instructions closely.`,
  hook:`Split-dose beats day-before prep (OR 2.51). USMSTF target: more than 90% adequate preps. [[Martel2015,Jacobson2025]]`},
 {from:.17,at:.25,k:'Before · surgery',t:'Stoma site marking and teaching',
  txt:`The WOCN Society/ASCRS position statement says marking the best stoma site before surgery makes independent stoma care, predictable pouch wear and a return to normal activities more likely; colorectal surgeons and certified ostomy nurses are best placed to mark. In emergency surgery at one centre, grade 2 or worse stoma complications were 24% with marking vs 36% without (<span class="ev early">Early evidence</span>, retrospective). Preoperative education halved peristomal skin complications (9.5% vs 19.4%; very low certainty). [[Salvadalena2015,Nozawa2024,Shi2025]]`,
  pt:`Having a stoma nurse mark the best spot on your belly before surgery, and learning bag care early, can mean fewer skin problems.`,
  hook:`Not marking the site was an independent risk factor for stoma complications (adjusted OR 1.69). [[Nozawa2024]]`},
 {from:.34,at:.42,k:'Before and after surgery',t:'Enhanced recovery (ERAS)',
  txt:`ERAS replaces overnight fasting with carbohydrate drinks up to 2 hours before surgery, and adds minimally invasive surgery, balanced IV fluids, early removal of drains and tubes, early mobilisation, and drinking and eating on the day of the operation. An ERAS coordinator, often a nurse, is part of the team. Across 16 RCTs, morbidity fell (RR 0.60) and stay was 2.28 days shorter with no rise in readmissions. With dedicated stoma education inside ERAS, median stay was 6 vs 9 days. [[Ljungqvist2017,Greco2014,Forsmo2016]]`,
  pt:`After bowel surgery, getting up, drinking and eating early is part of the plan, not a risk.`,
  hook:`ERAS: carbohydrate drink to 2 h pre-op, early mobilisation, early feeding; stay 30–50% shorter. [[Ljungqvist2017]]`},
 {from:.5,at:.58,k:'Before chemotherapy',t:'DPYD testing',
  txt:`Fluoropyrimidines cause severe toxicity in up to 30% of patients, often because of reduced DPD activity. US capecitabine and fluorouracil labels now carry a <b>boxed warning</b> to test for DPYD variants before starting unless immediate treatment is necessary. CPIC states that an intermediate metabolizer with activity score 1 should have the starting dose reduced by 50% (strong recommendation). The 2020 EMA recommendation accepts phenotyping (blood uracil) or genotyping. [[Henricks2018,FDA-Xeloda,FDA-FluorouracilFK,Amstutz2018,deWith2023]]`,
  pt:`Before 5-FU or capecitabine, a blood test for a gene (DPYD) can show if your body clears the drug slowly, so the dose can be adjusted.`,
  hook:`CPIC: DPYD activity score 1 → 50% starting-dose reduction; activity score 0 → avoid fluoropyrimidines.`},
 {from:.67,at:.75,k:'During chemotherapy',t:'Toxicity watch',
  txt:`Capecitabine's hallmark is hand-foot syndrome: 60% any grade and 17% grade 3–4 in X-ACT, with a median onset of 2.6 months in single-agent data. The Xeloda label prints grade 2 diarrhoea as "an increase of 4 to 6 stools/day or nocturnal stools" and tells patients to stop and call at grade 2 or worse, and to call promptly for fever of 100.5°F or more. Grade 3–4 neutropenia was 20.3% with 3 months of FOLFOX in IDEA. Oxaliplatin neuropathy is acute (within hours to 2 days, resolves within 14 days, cold-triggered) or delayed (persists beyond 14 days). [[FDA-Xeloda,Grothey2018,FDA-OxaliplatinGland]]`,
  pt:`On capecitabine, stop the tablets and call your team if your hands or feet become red and sore enough to affect daily life, or if you have 4 or more extra bowel movements a day.`,
  hook:`Xeloda label: grade 2 diarrhoea = an increase of 4–6 stools/day or nocturnal stools.`},
 {from:.84,at:.92,k:'After',t:'Stoma care and survivorship',
  txt:`Dehydration was the commonest reason for readmission after a diverting loop ileostomy (43.1% of readmissions in 603 patients); one study defined it as output of 1500 mL or more in 24 h plus a BUN/creatinine ratio of 20 or more, or physical signs. Expert first-line management of high output is to rehydrate, restrict hypotonic drinks, sip a glucose-saline solution and give antimotility drugs, though pooled trials of the drugs showed no significant effect (<span class="ev early">Early evidence</span>). Survivorship teaching covers follow-up, exercise and fear of recurrence. [[Messaris2012,Nightingale2022,Lederhuber2023,Meyerhardt2013,Courneya2025,Kotronoulas2017]]`,
  pt:`With an ileostomy, watch your output. If the bag fills much more than usual, or you feel very thirsty, dizzy or are passing little urine, call your team.`,
  hook:`About 1 in 5 new ileostomies are readmitted within 30 days; 6% for dehydration. [[Vogel2022]]`}
];
const NU_FLIPS=[
 {k:'DPYD',f:'A normal DPYD test means 5-FU is safe.',b:`Testing the four main variants explains only 20–30% of early severe 5-FU toxicity, so a negative test does not rule out DPD deficiency. The Xeloda label notes serious reactions can still occur when no variant is found. [[Amstutz2018,FDA-Xeloda]]`},
 {k:'DPYD',f:'A dose cut for DPYD stays cut for the whole course.',b:`CPIC states the dose should be increased in later cycles if the first two cycles are tolerated, so that efficacy is maintained. [[Amstutz2018]]`},
 {k:'Oxaliplatin',f:'Ice chips help mouth sores during oxaliplatin.',b:`The oxaliplatin label says to avoid topical ice for mucositis prophylaxis, because cold worsens acute neurological symptoms. [[FDA-OxaliplatinGland]]`},
 {k:'Oxaliplatin',f:'Calcium and magnesium infusions prevent the neuropathy.',b:`A phase III placebo-controlled trial (N08CB, 353 patients) found IV calcium and magnesium did not reduce acute or cumulative neurotoxicity. ASCO recommends no agent for prevention. [[Loprinzi2014,Loprinzi2020]]`},
 {k:'Oxaliplatin',f:'The numbness is gone once chemo stops.',b:`In the adjuvant trial, 21% still had some neuropathy 18 months after the last cycle; by then symptoms were worse in the feet than the hands. [[FDA-OxaliplatinGland,Pachman2015]]`},
 {k:'Stoma',f:'A temporary stoma is always reversed.',b:`In the TME trial, 19% of stomas were never reversed; in a Swedish series, 24% had a permanent stoma at the end of follow-up. [[denDulk2007,Holmgren2017]]`},
 {k:'Stoma',f:'With high ileostomy output, drink as much water as you can.',b:`Expert guidance is to rehydrate first, then restrict oral hypotonic fluid and sip a glucose-saline solution, with antimotility drugs. Plain water can add to the losses. [[Nightingale2022]]`},
 {k:'Prep',f:'Three days of low-residue diet clean the bowel better than one.',b:`A meta-analysis of RCTs found one day as effective as three (OR 0.89 for adequate prep) and better tolerated. [[Wang2024LRD]]`},
 {k:'Follow-up',f:'More frequent scans after surgery help people live longer.',b:`FACS, COLOFOL and GILDA found earlier detection but no clear overall survival gain from intensive follow-up. [[Primrose2014,WilleJorgensen2018,Rosati2016]]`}
];
const NU_DP={
 '2':{ph:'Normal metabolizer',c:'var(--good)',dose:[1,1],lab:'no reduction listed',txt:`Activity score 2 is a normal metabolizer. The dose reductions CPIC lists are for intermediate and poor metabolizers. A normal result still does not rule out DPD deficiency: the four main variants explain only 20–30% of early severe toxicity. [[Amstutz2018]]`},
 '1.5':{ph:'Intermediate metabolizer',c:'var(--warn)',dose:[.5,.75],lab:'reduce by 25–50%',txt:`CPIC 2017: reduce the starting dose by 25–50% (moderate recommendation). In a prospective Dutch study, 25% reductions may have been too small for c.2846A>T and c.1236G>A carriers, so this point is still evolving. [[Amstutz2018,Henricks2018]]`},
 '1':{ph:'Intermediate metabolizer',c:'var(--warn)',dose:[.5,.5],lab:'reduce by 50%',txt:`CPIC 2017: reduce the starting dose by 50% (strong recommendation), then increase in later cycles if the first two cycles are tolerated, to maintain efficacy. With genotype-guided dosing, the relative risk of severe toxicity in DPYD*2A carriers fell to 1.31, vs 2.87 in a historical full-dose cohort. [[Amstutz2018,Henricks2018]]`},
 '0.5':{ph:'Poor metabolizer',c:'var(--bad)',dose:null,lab:'avoid; strongly reduced only if no alternative',txt:`CPIC 2017: avoid 5-FU and its prodrugs. At activity score 0.5, if no alternative is suitable, a strongly reduced dose with early therapeutic drug monitoring may be considered. The US labels state that no dose has been proven safe in complete DPD deficiency. [[Amstutz2018,FDA-Xeloda,FDA-FluorouracilFK]]`},
 '0':{ph:'Poor metabolizer',c:'var(--bad)',dose:null,lab:'avoid 5-FU and its prodrugs',txt:`CPIC 2017: avoid 5-FU and its prodrugs. The US labels say to avoid the drug in patients with certain homozygous or compound heterozygous DPYD variants that cause complete DPD deficiency. [[Amstutz2018,FDA-Xeloda,FDA-FluorouracilFK]]`}
};
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const tick=(x,y,on)=>on?`<path d="M${f1(x-5)} ${f1(y)}l4 4 7-9" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/>`:`<rect x="${f1(x-6)}" y="${f1(y-6)}" width="12" height="12" rx="3" style="fill:none;stroke:var(--muted)"/>`;
  const bar=(x,y,w,v,mx,c,lab,val)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*v/mx)}" height="14" rx="4" style="fill:${c}"/>${T(x,y-4,lab)}${T(x+w*v/mx+5,y+11,val,'t-xs','fill:var(--ink);font-weight:700')}`;
  const glass=(x,y,lvl,c='var(--rx)')=>`<path d="M${f1(x-9)} ${f1(y-26)}L${f1(x-7)} ${f1(y)}H${f1(x+7)}L${f1(x+9)} ${f1(y-26)}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><path d="M${f1(x-7+ (1-lvl)*1.5)} ${f1(y-24*lvl)}L${f1(x-7)} ${f1(y)}H${f1(x+7)}L${f1(x+7-(1-lvl)*1.5)} ${f1(y-24*lvl)}Z" style="fill:${c};opacity:.6"/>`;
  /* ---- vignettes: A and B are regions {x,y,w,h} ---- */
  function vPrep(A,B,f){let s=T(A.x,A.y+12,'SPLIT-DOSE PREP · RELATIVE TIMELINE','t-sm','fill:var(--rx)');
    const y=A.y+132,x0=A.x+10,x1=A.x+A.w-14,X=u=>lerp(x0,x1,u),cur=ease(clamp(f*1.15));
    s+=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<rect x="${f1(x0)}" y="${y-4}" width="${f1(X(.56)-x0)}" height="8" style="fill:var(--panel-2)"/>`;
    s+=T(X(.02),y+20,'DAY BEFORE','t-xs','font-weight:700')+T(X(.6),y+20,'PROCEDURE DAY','t-xs','font-weight:700');
    /* meals */
    s+=`<circle cx="${f1(X(.12))}" cy="${y-40}" r="12" style="fill:var(--panel);stroke:var(--gold);stroke-width:1.6"/><circle cx="${f1(X(.12))}" cy="${y-40}" r="6" style="fill:var(--gold-soft);stroke:var(--gold)"/>`;
    s+=T(X(.02),y-86,'breakfast &amp; lunch:')+T(X(.02),y-74,'clear liquids or')+T(X(.02),y-62,'low-fibre meals');
    /* dose 1 and 2 */
    const d1=X(.45),d2=X(.74),col=X(1);
    s+=glass(d1,y-14,cur<.4?1:clamp(1-(cur-.4)/.1))+T(d1,y-58,'evening:','t-xs t-mid')+T(d1,y-46,'dose 1','t-xs t-mid','font-weight:700');
    s+=glass(d2,y-14,cur<.74?1:clamp(1-(cur-.74)/.1))+T(d2,y-58,'morning:','t-xs t-mid')+T(d2,y-46,'dose 2','t-xs t-mid','font-weight:700');
    /* ESGE windows */
    const w5=X(.68),w2=X(.88);
    s+=`<path d="M${f1(w5)} ${y+34}V${y+40}H${f1(col)}V${y+34}" style="fill:none;stroke:var(--accent);stroke-width:1.3"/>`+T(col,y+54,'start last dose ≤ 5 h before','t-xs t-end','fill:var(--accent)');
    s+=`<path d="M${f1(w2)} ${y+64}V${y+70}H${f1(col)}V${y+64}" style="fill:none;stroke:var(--bad);stroke-width:1.3"/>`+T(col,y+84,'finish ≥ 2 h before','t-xs t-end','fill:var(--bad)');
    s+=scope(col-14,y-14,0,{})+T(col,y-46,'colonoscopy','t-xs t-end','font-weight:700');
    s+=`<line x1="${f1(X(cur))}" x2="${f1(X(cur))}" y1="${y-88}" y2="${y+6}" style="stroke:var(--ink);opacity:.3"/>`;
    /* B: quality */
    s+=T(B.x,B.y+12,'WHY THE DETAILS MATTER','t-sm','fill:var(--rx)');
    const g=ramp(f,.1,.6),bw=B.w-50;
    s+=bar(B.x,B.y+44,bw,90*g,100,'var(--rx)','adequate preps per endoscopist',`${Math.round(90*g)}%`);
    s+=`<line x1="${f1(B.x+bw*.9)}" x2="${f1(B.x+bw*.9)}" y1="${B.y+38}" y2="${B.y+64}" style="stroke:var(--ink);stroke-width:1.6"/>`+T(B.x+bw*.9,B.y+76,'USMSTF target > 90%','t-xs t-mid');
    const facts=[['Split vs day-before','OR 2.51 for adequate cleansing'],['Enhanced instructions','OR 2.35'],['1 day vs 3 days low-residue','equal (OR 0.89), better tolerated'],['Simethicone','suggested as an add-on']];
    facts.forEach(([a,b],k)=>{const yy=B.y+104+k*34,on=f>.25+k*.15;s+=tick(B.x+6,yy-4,on)+T(B.x+20,yy-2,a,'t-xs','fill:var(--ink);font-weight:700;opacity:'+(on?1:.45))+T(B.x+20,yy+10,b,'t-xs','opacity:'+(on?1:.45))});
    return s}
  function vMark(A,B,f){let s=T(A.x,A.y+12,'PRE-OPERATIVE STOMA SITE MARKING','t-sm','fill:var(--brand)');
    const cx=A.x+A.w*.32,top=A.y+30,w=150,h=196,l=cx-w/2,r=cx+w/2,b=top+h;
    s+=`<path d="M${l+22} ${top}Q${l} ${top+14} ${l+5} ${top+80}Q${l+10} ${b-36} ${l+30} ${b}H${r-30}Q${r-10} ${b-36} ${r-5} ${top+80}Q${r} ${top+14} ${r-22} ${top}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`;
    s+=`<circle cx="${cx}" cy="${top+104}" r="2.6" style="fill:var(--muted)"/>`+T(cx+6,top+100,'navel','t-xs');
    /* skin folds when sitting */
    s+=`<path d="M${l+14} ${top+132}Q${cx} ${top+142} ${r-14} ${top+132}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:.7"/>`+T(r-12,top+128,'fold','t-xs t-end');
    const tx=cx-40,ty=top+118,p=ramp(f,.1,.5),px=lerp(cx+90,tx,ease(p)),py=lerp(top-6,ty,ease(p));
    if(f>.5){const k=ramp(f,.5,.7);s+=`<circle cx="${tx}" cy="${ty}" r="${f1(12*k)}" style="fill:none;stroke:var(--brand);stroke-width:2"/><path d="M${tx-7} ${ty}h14M${tx} ${ty-7}v14" style="stroke:var(--brand);stroke-width:2;opacity:${k}"/>`}
    s+=`<g transform="translate(${f1(px)} ${f1(py)}) rotate(35)"><rect x="-3" y="-34" width="6" height="30" rx="2" style="fill:var(--brand)"/><path d="M-3 -4L0 3L3 -4Z" style="fill:var(--ink)"/></g>`;
    s+=T(r+10,top+60,'marked by a colorectal','t-xs')+T(r+10,top+72,'surgeon or certified','t-xs')+T(r+10,top+84,'ostomy nurse','t-xs');
    s+=T(r+10,top+110,'aims: independent care,','t-xs','fill:var(--ink)')+T(r+10,top+122,'predictable pouch wear,','t-xs','fill:var(--ink)')+T(r+10,top+134,'back to normal activities','t-xs','fill:var(--ink)');
    s+=T(B.x,B.y+12,'MARKED OR TAUGHT vs NOT','t-sm','fill:var(--brand)');
    const g=ease(ramp(f,.2,.8)),bw=B.w-46,rows=[['Stoma complications grade ≥ 2 · marked',24,'var(--brand)'],['not marked (emergency surgery)',36,'var(--muted)'],['Peristomal dermatitis · marked',10,'var(--brand)'],['not marked',18,'var(--muted)'],['Skin complications · pre-op education',9.5,'var(--rx)'],['no education',19.4,'var(--muted)']];
    rows.forEach(([l2,v,c],k)=>s+=bar(B.x,B.y+40+k*34+(k>>1)*6,bw,v*g,40,c,l2,`${(v*g).toFixed(v%1?1:0)}%`));
    return s}
  function vEras(A,B,f){let s=T(A.x,A.y+12,'ERAS PATHWAY ELEMENTS','t-sm','fill:var(--rx)');
    const items=['Carbohydrate drinks up to 2 h before, not overnight fasting','Minimally invasive surgery','Balanced rather than large-volume IV fluids','Drains and tubes avoided or removed early','Early mobilisation','Drinks and food on the day of the operation'];
    items.forEach((it,k)=>{const on=f>.08+k*.1,yy=A.y+42+k*32;s+=tick(A.x+8,yy-4,on)+T(A.x+24,yy,it.length>40?it.slice(0,it.lastIndexOf(' ',40)):it,'t-xs','fill:var(--ink);opacity:'+(on?1:.45));
      if(it.length>40)s+=T(A.x+24,yy+12,it.slice(it.lastIndexOf(' ',40)+1),'t-xs','fill:var(--ink);opacity:'+(on?1:.45))});
    s+=T(A.x,A.y+A.h-6,'An ERAS coordinator, often a nurse, runs the pathway.','t-xs','fill:var(--rx)');
    s+=T(B.x,B.y+12,'HOSPITAL STAY · MEDIAN DAYS','t-sm','fill:var(--rx)');
    const g=ease(ramp(f,.2,.75)),bw=B.w-40;
    s+=bar(B.x,B.y+44,bw,6*g,10,'var(--rx)','ERAS + stoma education',`${(6*g).toFixed(0)} d`)+bar(B.x,B.y+80,bw,9*g,10,'var(--muted)','standard care',`${(9*g).toFixed(0)} d`);
    s+=T(B.x,B.y+120,'16 RCTs, 2376 patients:','t-xs','fill:var(--ink);font-weight:700')+T(B.x,B.y+134,'morbidity RR 0.60','t-xs')+T(B.x,B.y+148,'stay 2.28 days shorter','t-xs')+T(B.x,B.y+162,'no rise in readmissions','t-xs');
    return s}
  function vDpyd(A,B,f){let s=T(A.x,A.y+12,'WHERE A 5-FU DOSE GOES','t-sm','fill:var(--accent)');
    const y=A.y+96,x0=A.x+20,gx=A.x+A.w*.55,x1=A.x+A.w-20,rr=rng(4);
    s+=`<rect x="${f1(gx-24)}" y="${y-34}" width="48" height="68" rx="10" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/>`+T(gx,y+4,'DPD','t-lbl t-mid','fill:var(--accent)');
    s+=T(x0-6,y-46,'dose','t-xs');
    for(let i=0;i<20;i++){const ph=clamp(f*1.6-i*.03),broken=i%5!==4;let x,yy;
      if(ph<=.5){x=lerp(x0,gx-26,ph/.5);yy=y-24+(i%4)*14+(rr()-.5)*2}
      else if(broken){const u=(ph-.5)/.5;x=lerp(gx,gx+20,u);yy=lerp(y,A.y+A.h-50,u)}
      else{const u=(ph-.5)/.5;x=lerp(gx+26,x1,u);yy=y-12+(i%3)*10}
      s+=`<circle cx="${f1(x)}" cy="${f1(yy)}" r="4.2" style="fill:${ph>.5&&broken?'var(--muted)':'var(--gold)'};opacity:${ph>.5&&broken?.55:.95}"/>`}
    s+=T(gx+30,A.y+A.h-34,'≈ 80% broken down by DPD','t-xs','fill:var(--accent);font-weight:700');
    s+=T(x1,y-40,'only 1–3% becomes','t-xs t-end')+T(x1,y-28,'cytotoxic metabolites','t-xs t-end');
    s+=T(A.x,A.y+A.h-6,'Less DPD activity → the drug lingers → toxicity','t-xs','fill:var(--ink)');
    /* B: boxed warning */
    s+=`<rect x="${B.x}" y="${B.y+4}" width="${B.w}" height="124" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.4"/>`;
    s+=T(B.x+12,B.y+24,'BOXED WARNING · US LABELS','t-sm','fill:var(--ink);font-weight:700');
    ['"Test patients for genetic variants','of DPYD prior to initiating"','capecitabine or fluorouracil','"unless immediate treatment','is necessary"'].forEach((l,k)=>s+=T(B.x+12,B.y+46+k*15,l,'t-xs','fill:var(--ink)'));
    const on=f>.45;s+=`<rect x="${B.x}" y="${B.y+144}" width="${B.w}" height="70" rx="8" style="fill:var(--warn-soft);stroke:var(--warn);opacity:${on?1:.35}"/>`;
    s+=T(B.x+12,B.y+164,'CPIC 2017, as published:','t-xs','fill:var(--warn);font-weight:700;opacity:'+(on?1:.35))+T(B.x+12,B.y+180,'activity score 1 → reduce the','t-xs','fill:var(--ink);opacity:'+(on?1:.35))+T(B.x+12,B.y+194,'starting dose by 50% (strong)','t-xs','fill:var(--ink);opacity:'+(on?1:.35));
    return s}
  function vTox(P,f,N){let s='';const cols=N?2:4,gap=10,tw=(P.w-gap*(cols-1)-24)/cols,th=N?236:248;
    const tiles=[
     {c:'var(--bad)',h:'HANDS AND FEET',l:['Hand-foot syndrome on','capecitabine (X-ACT):','60% any grade','17% grade 3–4','Label: stop and call','at grade 2 or worse']},
     {c:'var(--warn)',h:'BOWELS',l:['Label grade 2 diarrhoea:','"an increase of 4 to 6','stools/day or nocturnal','stools"','Stop capecitabine and','call at grade 2 or worse']},
     {c:'var(--tumour)',h:'TEMPERATURE',l:['Call promptly for fever','≥ 100.5°F (label)','Grade 3–4 neutropenia','(IDEA, 3 months):','FOLFOX 20.3%','CAPOX 7.7%']},
     {c:'var(--accent)',h:'NERVES',l:['Acute: hours to 2 days,','resolves ≤ 14 days,','cold-triggered','Delayed: persists','> 14 days; can impair','daily activities']}];
    tiles.forEach((T0,k)=>{const cx=P.x+12+(k%cols)*(tw+gap),cy=P.y+12+Math.floor(k/cols)*(th+gap),on=ramp(f,k*.18,k*.18+.2);
      s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(tw)}" height="${th}" rx="10" style="fill:var(--panel);stroke:${T0.c};stroke-width:1.4;opacity:${.35+.65*on}"/>`;
      s+=T(cx+10,cy+18,T0.h,'t-sm','fill:'+T0.c+';font-weight:700');
      const ix=cx+tw/2,iy=cy+70;
      if(k===0){s+=`<path d="M${f1(ix-18)} ${iy+32}V${iy}Q${f1(ix-18)} ${iy-8} ${f1(ix-12)} ${iy-8}Q${f1(ix-6)} ${iy-8} ${f1(ix-6)} ${iy}V${iy-24}Q${f1(ix-6)} ${iy-30} ${f1(ix)} ${iy-30}Q${f1(ix+6)} ${iy-30} ${f1(ix+6)} ${iy-24}V${iy-4}Q${f1(ix+6)} ${iy-14} ${f1(ix+12)} ${iy-14}Q${f1(ix+18)} ${iy-14} ${f1(ix+18)} ${iy-4}V${iy+20}Q${f1(ix+18)} ${iy+34} ${f1(ix+6)} ${iy+38}H${f1(ix-10)}Z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.4"/><ellipse cx="${f1(ix)}" cy="${iy+16}" rx="14" ry="12" style="fill:var(--bad);opacity:${f1(.6*on)}"/>`}
      if(k===1){const n=Math.round(6*on);for(let i=0;i<6;i++){const x=ix-48+i*19;s+=`<rect x="${f1(x)}" y="${iy-8}" width="14" height="22" rx="5" style="fill:${i<n?(i>=3?'var(--warn)':'var(--gold-soft)'):'var(--panel-2)'};stroke:var(--warn);stroke-width:1"/>`}
        s+=`<line x1="${f1(ix-48+3*19-3)}" x2="${f1(ix-48+3*19-3)}" y1="${iy-16}" y2="${iy+22}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:3 2"/>`+T(ix,iy+36,`+${n} stools/day vs usual`,'t-xs t-mid','fill:var(--ink)')}
      if(k===2){const lvl=on;s+=`<rect x="${f1(ix-6)}" y="${iy-34}" width="12" height="56" rx="6" style="fill:var(--panel);stroke:var(--tumour)"/><circle cx="${f1(ix)}" cy="${iy+26}" r="10" style="fill:var(--tumour)"/><rect x="${f1(ix-3)}" y="${f1(iy+20-48*lvl)}" width="6" height="${f1(48*lvl)}" style="fill:var(--tumour)"/><line x1="${f1(ix+8)}" x2="${f1(ix+22)}" y1="${iy-22}" y2="${iy-22}" style="stroke:var(--ink)"/>`+T(ix+24,iy-19,'100.5°F','t-xs','fill:var(--ink)')}
      if(k===3){s+=`<g transform="translate(${f1(ix)} ${iy})" style="stroke:var(--accent);stroke-width:2;stroke-linecap:round">${[0,60,120].map(a=>`<path d="M0 -22V22M-6 -16L0 -10L6 -16M-6 16L0 10L6 16" transform="rotate(${a})"/>`).join('')}</g><g style="opacity:${on}">${[...Array(6)].map((_,i)=>`<circle cx="${f1(ix-30+i*12)}" cy="${iy+34}" r="2" style="fill:var(--accent)"/>`).join('')}</g>`}
      T0.l.forEach((l,j)=>s+=T(cx+10,cy+(N?126:134)+j*15,l,'t-xs',(j>=4&&k!==2?'fill:var(--ink);font-weight:700;':'fill:var(--ink);')+'opacity:'+(.4+.6*on)))});
    return s}
  function vAfter(A,B,f){let s=T(A.x,A.y+12,'ILEOSTOMY OUTPUT · 24 HOURS','t-sm','fill:var(--brand)');
    const x0=A.x+38,x1=A.x+A.w-10,y0=A.y+40,y1=A.y+A.h-34,X=h=>lerp(x0,x1,h/24),Y=ml=>lerp(y1,y0,ml/2000);
    [0,500,1000,1500,2000].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(x0-4,Y(v)+3,v?v+'':'0','t-xs t-end'));
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(1500))}" y2="${f1(Y(1500))}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 3"/>`+T(x0+4,Y(1500)-5,'1500 mL / 24 h','t-xs','fill:var(--bad);font-weight:700');
    [0,6,12,18,24].forEach(h=>s+=T(X(h),y1+14,h+' h','t-xs t-mid'));
    const hrs=24*ease(clamp(f*1.2)),out=h=>1900*h/24;let d=`M${x0} ${y1}`;for(let h=0;h<=hrs;h+=.5)d+=`L${f1(X(h))} ${f1(Y(out(h)))}`;
    s+=`<path d="${d}L${f1(X(hrs))} ${y1}Z" style="fill:var(--stool);opacity:.35"/><path d="${d.replace(`M${x0} ${y1}`,`M${x0} ${f1(Y(0))}`)}" style="fill:none;stroke:var(--stool);stroke-width:2.2"/>`;
    const tot=out(hrs);s+=T(X(hrs)-4,Y(tot)-8,Math.round(tot/10)*10+' mL','t-xs t-end','fill:var(--ink);font-weight:700');
    if(tot>=1500){s+=T(x1,Y(1500)+16,'≥ 1500 mL + BUN/Cr ≥ 20','t-xs t-end','fill:var(--bad)')+T(x1,Y(1500)+28,'or signs = dehydration','t-xs t-end','fill:var(--bad)')+T(x1,Y(1500)+40,'(one study\'s definition)','t-xs t-end','fill:var(--bad)')}
    s+=T(B.x,B.y+12,'SURVIVORSHIP TEACHING','t-sm','fill:var(--brand)');
    const L=[['Follow-up plan','CEA 3–6-monthly, CT yearly × 3,','colonoscopy at 1 year'],['Exercise','structured exercise: DFS HR 0.72','(CHALLENGE)'],['Fear of recurrence','the most common need;','FCRI-SF cut-off 22'],['After rectal surgery','LARS score 0–42',''],['Fertility, work, money','ask early; often missed','']];
    L.forEach(([a,b,c],k)=>{const on=f>.15+k*.14,yy=B.y+40+k*42;s+=tick(B.x+6,yy-4,on)+T(B.x+20,yy-2,a,'t-xs','fill:var(--ink);font-weight:700;opacity:'+(on?1:.45))+T(B.x+20,yy+11,b,'t-xs','opacity:'+(on?1:.45))+(c?T(B.x+20,yy+23,c,'t-xs','opacity:'+(on?1:.45)):'')});
    return s}
  const VIG=[vPrep,vMark,vEras,vDpyd,null,vAfter];
  const STN=[['Bowel prep','Prep'],['Site marking','Marking'],['ERAS','ERAS'],['DPYD test','DPYD'],['Toxicity watch','Toxicity'],['Stoma & survivorship','After']];
  function draw(t){const N=vb(svg,'720 400','400 640');
    const sx=N?[34,100,166,234,300,366]:[80,192,304,424,536,648],py=68;
    const P=N?{x:8,y:118,w:384,h:514}:{x:16,y:116,w:688,h:276};
    const A=N?{x:20,y:130,w:360,h:236}:{x:32,y:128,w:360,h:252},B=N?{x:20,y:384,w:360,h:240}:{x:412,y:128,w:280,h:252};
    const p=phaseOf(NU_STEPS,t),nx=p<5?NU_STEPS[p+1].from:1.0001,f=ramp(t,NU_STEPS[p].from,nx-.015);
    let s='';
    /* group headers */
    const grp=[[0,2,'BEFORE SURGERY','BEFORE'],[3,4,'DURING CHEMOTHERAPY','CHEMO'],[5,5,'AFTER','AFTER']];
    grp.forEach(([a,b,l,ln])=>{const xa=sx[a]-(N?24:40),xb=sx[b]+(N?24:40);s+=`<path d="M${xa} 24V18H${xb}V24" style="fill:none;stroke:var(--muted);stroke-width:1"/>`+T((xa+xb)/2,12,N?ln:l,'t-xs t-mid','font-weight:700')});
    s+=`<line x1="${sx[0]}" x2="${sx[5]}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
    const wx=p<5?lerp(sx[p],sx[p+1],ease(ramp(f,.88,1))):sx[5];
    s+=`<line x1="${sx[0]}" x2="${f1(wx)}" y1="${py}" y2="${py}" style="stroke:var(--brand);stroke-width:6;stroke-linecap:round;opacity:.7"/>`;
    sx.forEach((x,i)=>{const cur=i===p,done=i<p;s+=`<circle cx="${x}" cy="${py}" r="${cur?14:11}" style="fill:${cur?'var(--brand)':done?'var(--brand-soft)':'var(--panel)'};stroke:var(--brand);stroke-width:1.8"/>`+T(x,py+4,String(i+1),'t-xs t-mid',`fill:${cur?'var(--on-brand)':'var(--ink)'};font-weight:700`);
      s+=T(x,py+(N?30:32),N?STN[i][1]:STN[i][0],'t-xs t-mid',cur?'fill:var(--ink);font-weight:700':'')});
    s+=person(wx+(p<5&&wx===sx[p]?0:0),py-38,20,'var(--ink)');
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    if(!N&&p!==4)s+=`<line x1="${B.x-12}" x2="${B.x-12}" y1="${P.y+14}" y2="${P.y+P.h-14}" style="stroke:var(--line)"/>`;
    if(N&&p!==4)s+=`<line x1="${P.x+14}" x2="${P.x+P.w-14}" y1="${B.y-12}" y2="${B.y-12}" style="stroke:var(--line)"/>`;
    s+=p===4?vTox(P,f,N):VIG[p](A,B,f);
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',`Step ${p+1} of 6: ${NU_STEPS[p].t}`);
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[p]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,36000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ===== DPYD teaching widget ===== */
  const ds=$('#nuDpyd');let as='1',dT=1,dStop=null;
  function drawD(){const ND=vb(ds,'720 250','400 330');const D=NU_DP[as],v=+as;let s='';
    const R=ND?{x0:24,x1:376,y:56}:{x0:30,x1:330,y:64},X=a=>lerp(R.x0,R.x1,a/2);
    s+=T(R.x0,R.y-38,'DPYD ACTIVITY SCORE → PHENOTYPE','t-sm','fill:var(--accent)');
    [[-.15,.65,'poor','var(--bad)','var(--bad-soft)'],[.85,1.65,'intermediate','var(--warn)','var(--warn-soft)'],[1.85,2.15,'normal','var(--good)','var(--good-soft)']].forEach(([a,b,l,c,cs])=>{const xa=X(Math.max(a,-.12)),xb=X(Math.min(b,2.12));
      s+=`<rect x="${f1(xa)}" y="${R.y-12}" width="${f1(xb-xa)}" height="24" rx="6" style="fill:${cs};stroke:${c}"/>`+T((xa+xb)/2,R.y+28,l,'t-xs t-mid','fill:'+c+';font-weight:700')});
    [0,.5,1,1.5,2].forEach(a=>s+=`<circle cx="${f1(X(a))}" cy="${R.y}" r="${a===v?8:4}" style="fill:${a===v?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.4"/>`+T(X(a),R.y-18,String(a),'t-xs t-mid',a===v?'fill:var(--ink);font-weight:700':''));
    /* dose bar */
    const Bx=ND?24:390,Bw=ND?352:300,By=ND?136:64;
    s+=T(Bx,By-38,'STARTING DOSE AS CPIC STATES','t-sm','fill:var(--accent)');
    s+=`<rect x="${Bx}" y="${By-12}" width="${Bw}" height="24" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    [0,.25,.5,.75,1].forEach(u=>s+=T(Bx+Bw*u,By+28,Math.round(u*100)+'%','t-xs t-mid'));
    const g=ease(dT);
    if(D.dose){const [a,b]=D.dose;s+=`<rect x="${Bx}" y="${By-12}" width="${f1(Bw*a*g)}" height="24" rx="6" style="fill:${D.c};opacity:.85"/>`;
      if(b>a)s+=`<rect x="${f1(Bx+Bw*a)}" y="${By-12}" width="${f1(Bw*(b-a)*g)}" height="24" style="fill:${D.c};opacity:.35"/>`;
      if(as==='2')s+=`<rect x="${Bx}" y="${By-12}" width="${Bw}" height="24" rx="6" style="fill:none;stroke:var(--good);stroke-width:2;stroke-dasharray:5 3"/>`}
    else s+=`<path d="M${Bx+Bw/2-14} ${By-10}l28 20M${Bx+Bw/2+14} ${By-10}l-28 20" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round;opacity:${g}"/>`;
    s+=T(Bx,By+48,D.lab,'t-lbl','fill:'+D.c);
    /* breakdown particles: schematic, slower with lower activity */
    const Py=ND?250:178,px0=ND?24:30,px1=ND?376:690,gx=lerp(px0,px1,.45);
    s+=T(px0,Py-26,'SCHEMATIC: THE SAME DOSE MEETS LESS DPD','t-sm','fill:var(--accent)');
    s+=`<rect x="${f1(gx-22)}" y="${Py-14}" width="44" height="44" rx="8" style="fill:var(--accent-soft);stroke:var(--accent);opacity:${.3+.35*v}"/>`+T(gx,Py+12,'DPD','t-xs t-mid','fill:var(--accent);font-weight:700');
    const rr=rng(9);let left=0;
    for(let i=0;i<24;i++){const ph=clamp(dT*1.4-i*.016),brk=rr()<v/2*.9;let x,y;
      if(ph<.5){x=lerp(px0,gx-24,ph/.5);y=Py-6+(i%4)*9}else if(brk){x=gx-6+(i%4)*4;y=Py+40+(i%3)*5}else{x=lerp(gx+24,px1-10,(ph-.5)/.5)-(i%6)*6;y=Py-6+(i%4)*9;left++}
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${ph>=.5&&brk?'var(--muted)':'var(--gold)'};opacity:${ph>=.5&&brk?.5:.95}"/>`}
    s+=T(ND?px0:px1,Py+(ND?70:48),'gold: drug still circulating · grey: broken down','t-xs'+(ND?'':' t-end'));
    ds.innerHTML=s;
    $('#nuDNote').innerHTML=`<div class="kicker">Activity score ${as} · ${D.ph}</div><h4>${D.lab[0].toUpperCase()+D.lab.slice(1)}</h4><p>${D.txt}</p>
      <div class="kv"><div><dt>Phenotypes (CPIC)</dt><dd>Normal metabolizer: activity score 2. Intermediate: 1 or 1.5. Poor: 0 or 0.5. [[Amstutz2018]]</dd></div>
      <div><dt>Severe toxicity risk by variant (IPD meta-analysis)</dt><dd>Adjusted relative risk 4.40 for c.1679T&gt;G, 3.02 for c.2846A&gt;T, 2.85 for DPYD*2A and 1.59 for c.1236G&gt;A/HapB3. [[Meulendijks2015]]</dd></div>
      <div><dt>Genotype-guided dosing in practice</dt><dd>In 1103 Dutch patients, 8% carried a variant and got 25% or 50% reduced starting doses; severe toxicity was 39% in carriers vs 23% in wild-type patients. [[Henricks2018]]</dd></div></div>
      <div class="hook"><b>Exam hook</b>CPIC: activity score 1 → 50% starting-dose reduction (strong); activity score 0 → avoid fluoropyrimidines. A negative test does not rule out DPD deficiency.</div>`;
  }
  $$('[data-nud]').forEach(b=>b.addEventListener('click',()=>{as=b.dataset.nud;$$('[data-nud]').forEach(x=>x.setAttribute('aria-pressed',x===b));dStop&&dStop();dStop=animate(1800,p=>{dT=p;drawD()},()=>{dStop=null})}));
  drawD();

  /* ===== carriers per 100 ===== */
  const ic=$('#nuIcons');let pop='eu';
  function drawI(){const NI=vb(ic,'720 150','400 180');const n=pop==='eu'?7:5,cols=NI?20:25,rows=100/cols,sz=NI?16:20,gx=NI?19:27,gy=NI?24:32,x0=NI?14:24,y0=NI?16:6;let s='';
    for(let i=0;i<100;i++){const c=i%cols,r=Math.floor(i/cols),hit=i<n;s+=person(x0+c*gx+sz/2,y0+r*gy,sz,hit?'var(--brand)':'var(--line)')}
    const cap=pop==='eu'?['≈ 7 in 100 Europeans carry one of the','four main decreased-function variants']:['≈ 5 in 100 people of African ancestry','carry c.557A&gt;G'];
    if(NI)cap.forEach((l,k)=>s+=T(14,y0+rows*gy+12+k*13,l,'t-xs','fill:var(--ink)'));else s+=T(x0,y0+rows*gy+14,cap.join(' '),'t-xs','fill:var(--ink)');
    ic.innerHTML=s;
    $('#nuIconCap').innerHTML=pop==='eu'?`Carrier frequencies in Europeans: HapB3 (c.1129–5923C&gt;G) 4.1–4.8%, c.1905+1G&gt;A (DPYD*2A) 1–1.2%, c.2846A&gt;T 0.8–1.4%; about 7% carry at least one of the four. [[Amstutz2018]]`:`In people of African ancestry, c.557A&gt;G has a carrier frequency of about 5%. [[Amstutz2018]]`}
  $$('[data-nup]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.nup;$$('[data-nup]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawI()}));
  drawI();

  /* ===== misunderstandings ===== */
  $('#nuFlips').innerHTML=NU_FLIPS.map((c,i)=>`<button class="nu-flip" data-nuf="${i}" aria-pressed="false"><span class="nu-k">${c.k} · ${'Myth'}</span><span class="nu-f">${c.f}</span><span class="nu-b">${c.b}</span></button>`).join('');
  $('#nuFlips').addEventListener('click',e=>{const b=e.target.closest('[data-nuf]');if(!b||e.target.closest('sup.c'))return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawD();drawI()};
};
