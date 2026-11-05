/* =============== 3.1 how urate-lowering drugs work =============== */
const UL_STEPS=[
 {from:0,at:.06,k:'Scene 1 · Make less',t:'Xanthine oxidase inhibitors',
  txt:'Purines from food and from the body\'s own cell turnover are broken down to hypoxanthine. Xanthine oxidoreductase then works twice: hypoxanthine to xanthine, and xanthine to uric acid. It is the rate-limiting enzyme of urate production. [[Chen2016,Furuhashi2020]] Allopurinol, a purine (hypoxanthine) analogue, and its metabolite oxipurinol block that enzyme. [[FDA-Zyloprim]] Febuxostat blocks it too, but is not a purine. [[Becker2005,White2018]]',
  pt:'Make less: these tablets slow down the last two steps of the factory line, so less uric acid is made.',
  hook:'Allopurinol is a <b>purine analogue</b>; its metabolite <b>oxypurinol</b> (t½ 23.3 h) does most of the work and is cleared by the kidney. [[Day2007]]'},
 {from:.34,at:.4,k:'Scene 2 · Excrete more',t:'Uricosurics: let the kidney pass more',
  txt:'At least 90% of the urate the kidney filters is taken back into the blood, through transporters that include URAT1 and GLUT9. [[Chen2016]] URAT1, identified in 2002, is the target of uricosuric drugs. [[Enomoto2002]] Blocking reabsorption sends more urate out in the urine. Probenecid increases urinary uric acid excretion; [[FDA-Probenecid]] dotinurad is a selective URAT1 inhibitor that barely touches the secretory transporters ABCG2 and OAT1/3. [[Taniguchi2020]] The gut, through ABCG2, removes about a third of urate. [[Ohashi2023,HalperinKuhns2021]]',
  pt:'Excrete more: these tablets stop the kidney from taking uric acid back, so more of it leaves in the urine.',
  hook:'Probenecid "may not be effective" at GFR ≤30 mL/min and is contraindicated with uric acid stones. [[FDA-Probenecid]]'},
 {from:.67,at:.72,k:'Scene 3 · Break it down',t:'Uricase: the enzyme humans lost',
  txt:'Most mammals turn urate into allantoin with uricase. Humans and other great apes lost the gene through a nonsense mutation, so urate is our end product. [[Wu1992,Oda2002,Chen2016]] Pegloticase is a PEGylated recombinant uricase given by infusion. It oxidises uric acid to allantoin, an inert, water-soluble product cleared by the kidneys. About 24 h after the first 8 mg dose, mean plasma uric acid was 0.7 mg/dL against 8.2 mg/dL on placebo. [[FDA-Krystexxa]]',
  pt:'Break it down: an enzyme drip turns uric acid into a substance the body can wash out easily.',
  hook:'Pegloticase: screen for <b>G6PD deficiency</b>, check urate before every infusion, and give it with <b>methotrexate</b>. [[FDA-Krystexxa,Botson2023]]'}
];
const UL_AUTO=['allo','prob','peg'];
const UL_DRUGS={
 none:{n:'No drug',c:'Untreated',site:[],at:'nothing blocked',lvl:8.5,cap:'illustrative starting value'},
 allo:{n:'Allopurinol',c:'Xanthine oxidase inhibitor',site:['xo'],at:'xanthine oxidase (both steps)',lvl:5.5,rg:[5.16,5.75],cap:'−2.75 to −3.34 mg/dL on 300 mg/day · Perez-Ruiz 1998',
  mech:'A purine (hypoxanthine) analogue. It and its metabolite oxipurinol (oxypurinol) inhibit xanthine oxidase. [[FDA-Zyloprim]] Most of the urate-lowering effect comes from oxypurinol. [[Day2007]]',
  pk:'Allopurinol: bioavailability 79 ± 20%, half-life 1.2 ± 0.3 h; about 90 mg of oxypurinol forms from each 100 mg. Oxypurinol: half-life 23.3 ± 6.0 h with normal kidney function, cleared almost entirely in urine. [[Day2007]] The US label gives about 1–2 h and about 15 h. [[FDA-Zyloprim]]',
  lab:'The US label raises the dose by 100 mg each week to serum urate ≤6 mg/dL, to a maximum of 800 mg/day. [[FDA-Zyloprim]] The UK SmPC allows up to 900 mg/day. [[SmPC-Allopurinol-UK]] ACR 2020: first line, including in CKD stage ≥3, starting at ≤100 mg/day. [[FitzGerald2020]]',
  hist:'Came out of Hitchings and Elion\'s purine research (Nobel Prize 1988). Zyloprim was approved in the US on 19 August 1966. [[Elion1989,Nuki2006,DrugsFDA-ULT]]',
  eff:'300 mg/day lowered serum urate by 2.75 mg/dL in normal excretors and 3.34 mg/dL in under-excretors. [[PerezRuiz1998]]'},
 febu:{n:'Febuxostat',c:'Xanthine oxidase inhibitor',site:['xo'],at:'xanthine oxidase (both steps)',lvl:4.76,cap:'−44.00% on 40 mg · Hosoya 2020',
  mech:'A non-purine, selective xanthine oxidase inhibitor. [[Becker2005,White2018]]',
  pk:'Terminal half-life about 5–8 h. [[FDA-Uloric]]',
  lab:'US: 40 mg once daily, raised to 80 mg if serum urate is still ≥6 mg/dL after 2 weeks; 40 mg in severe renal impairment. [[FDA-Uloric]] EU: 80 mg, with 120 mg considered if serum urate is >6 mg/dL (357 µmol/L) after 2–4 weeks. [[EMA-Adenuric]] Since February 2019 the US label carries a boxed warning for cardiovascular death and limits febuxostat to people for whom allopurinol has failed or is not advisable. [[FDA-Uloric]]',
  hist:'EU (Adenuric) 21 April 2008; US (Uloric) 13 February 2009. [[EMA-Adenuric,DrugsFDA-ULT]]',
  eff:'Serum urate <6 mg/dL in 45% on 40 mg and 67% on 80 mg in CONFIRMS. [[Becker2010]] In a dotinurad trial febuxostat 40 mg lowered serum urate by 44.00%. [[Hosoya2020a]]'},
 prob:{n:'Probenecid',c:'Uricosuric',site:['urat1'],at:'urate reabsorption in the kidney',lvl:4.25,cap:'−50% on 2 g/day after allopurinol failure · Reinders 2009',
  mech:'Increases urinary uric acid excretion and so lowers serum urate. [[FDA-Probenecid]] URAT1 is the target of uricosuric drugs. [[Enomoto2002]]',
  pk:'Half-life not quoted in our sources. Salicylates antagonise its uricosuric action. [[FDA-Probenecid]]',
  lab:'US label: 250 mg twice daily for 1 week, then 500 mg twice daily, rising by 500 mg every 4 weeks, usually not above 2000 mg/day. It "may not be effective" at GFR ≤30 mL/min and is contraindicated with uric acid kidney stones. [[FDA-Probenecid]] ACR 2020 starts at 500 mg once or twice daily and prefers allopurinol or febuxostat in CKD stage ≥3. [[FitzGerald2020]]',
  hist:'An older generic uricosuric with a current US label. [[FDA-Probenecid]]',
  eff:'After allopurinol had failed, 2 g/day brought 65% (20/31) to ≤5 mg/dL, with a 50% mean fall in serum urate. [[Reinders2009Prob]]'},
 benz:{n:'Benzbromarone',c:'Uricosuric',site:['urat1'],at:'urate reabsorption in the kidney',lvl:3.46,cap:'−5.04 mg/dL on 100 mg/day · Perez-Ruiz 1998',
  mech:'A potent uricosuric. [[PerezRuiz1998,Lee2008]]',
  pk:'Metabolised by CYP2C9, which it also inhibits, so it interacts with warfarin. [[Lee2008]]',
  lab:'Not approved in the US: Drugs@FDA lists no application. [[DrugsFDA-ULT]] Doherty 2018 used 50→200 mg as a second-line option in the UK. [[Doherty2018]]',
  hist:'Registered in about 20 countries, then withdrawn by Sanofi-Synthélabo in 2003 after reports of liver toxicity; other companies still market it. The estimated hepatotoxicity risk in Europe is about 1 in 17,000 patients. [[Lee2008]]',
  eff:'100 mg/day lowered serum urate by 5.04 mg/dL (8.58 to 3.54), and every under-excretor reached <6 mg/dL, against 53% on allopurinol 300 mg/day. [[PerezRuiz1998]] After allopurinol failure, 200 mg reached ≤5 mg/dL in 92% (22/24). [[Reinders2009Prob]]'},
 dotin:{n:'Dotinurad',c:'Selective URAT1 inhibitor',site:['urat1'],at:'URAT1 in the kidney',lvl:4.95,cap:'−41.82% on 2 mg · Hosoya 2020',
  mech:'A selective URAT1 inhibitor that barely inhibits the secretory transporters ABCG2 and OAT1/3. [[Taniguchi2020]]',
  pk:'Half-life not quoted in our sources. Its efficacy is not reduced in mild to moderate renal impairment. [[Ishikawa2021]]',
  lab:'Approved in Japan; phase 3 trials against allopurinol and in tophaceous gout are recruiting in the US and Europe. [[Taniguchi2020,NCT07089875,NCT07089888]]',
  hist:'Japan, January 2020 (URECE). [[Taniguchi2020]]',
  eff:'Non-inferior to febuxostat (−41.82% on 2 mg vs −44.00% on 40 mg) and to benzbromarone (−45.9% on 2 mg vs −43.8% on 50 mg). [[Hosoya2020a,Hosoya2020Benz]]'},
 lesin:{n:'Lesinurad + XO inhibitor',c:'URAT1 inhibitor (add-on only)',site:['xo','urat1'],at:'URAT1, on top of xanthine oxidase inhibition',lvl:null,cap:'no mean change quoted · 54.2% vs 27.9% at target (CLEAR 1)',
  mech:'A URAT1 inhibitor approved only together with a xanthine oxidase inhibitor, never alone. [[FDA-Zurampic]]',
  pk:'Half-life not quoted in our sources.',
  lab:'US: 200 mg/day with a xanthine oxidase inhibitor. Boxed warning: "risk of acute renal failure, more common when used without a xanthine oxidase inhibitor". [[FDA-Zurampic]]',
  hist:'US approval 22 December 2015; later withdrawn by the manufacturer (Drugs@FDA: "Discontinued"). The EU authorisation of 18 February 2016 was withdrawn for commercial reasons, notified 31 July 2020. [[FitzGerald2020,DrugsFDA-ULT,EMA-Zurampic]]',
  eff:'CLEAR 1: with allopurinol, 54.2% reached <6 mg/dL at month 6 against 27.9% on allopurinol alone, with no significant benefit on flares or tophi. [[Saag2017]] CLEAR 2: renal adverse events in 5.9% (200 mg), 15.0% (400 mg) and 4.9% (allopurinol alone). [[Bardin2017]]'},
 peg:{n:'Pegloticase',c:'Uricase (enzyme)',site:['uc'],at:'urate itself, turned into allantoin',lvl:.7,cap:'0.7 mg/dL 24 h after the first dose (placebo 8.2) · US label',
  mech:'A PEGylated recombinant uricase. It oxidises uric acid to allantoin, an inert, water-soluble product cleared by the kidneys. [[FDA-Krystexxa]]',
  pk:'Given by IV infusion every 2 weeks. High-titre anti-drug antibodies developed in 41% and were linked to faster clearance and loss of response. [[FDA-Krystexxa,Lipsky2014]]',
  lab:'US: 8 mg IV every 2 weeks with oral methotrexate 15 mg weekly plus folic or folinic acid, started at least 4 weeks before; oral urate-lowering drugs are stopped first and patients are pre-medicated. [[FDA-Krystexxa]] ACR 2020 strongly recommends it only after other options fail, and never first line. [[FitzGerald2020]]',
  hist:'US approval 14 September 2010. The EU authorisation of 8 January 2013 was withdrawn on 30 June 2016. [[DrugsFDA-ULT,EMA-Krystexxa]]',
  eff:'Without methotrexate, 42% on every-2-week dosing kept serum urate <6 mg/dL in months 3 and 6 (placebo 0%). [[Sundy2011]] With methotrexate (MIRROR), 71.0% responded at month 6 against 38.5%. [[Botson2023]]'},
 losartan:{n:'Losartan',c:'Blood pressure drug, mildly uricosuric',site:['kid'],at:'the kidney (more urate in urine)',lvl:7.76,cap:'538 → 491 µmol/L on 50 mg/day · Würzner 2001',
  mech:'An angiotensin receptor blocker that lowers serum urate through uricosuria; irbesartan, a related drug, did not. [[Wurzner2001]]',
  pk:'Not a gout drug.',
  lab:'ACR 2020 conditionally recommends choosing losartan as the antihypertensive when feasible. [[FitzGerald2020]]',
  hist:'Losartan and calcium channel blockers are linked to a lower risk of gout, diuretics to a higher one. [[Choi2012BMJ]]',
  eff:'50 mg/day lowered serum urate from 538 to 491 µmol/L [about 9.0 to 8.3 mg/dL] in 13 people with gout and high blood pressure. [[Wurzner2001]]'},
 feno:{n:'Fenofibrate',c:'Lipid drug, mildly uricosuric',site:['kid'],at:'the kidney (urate clearance up 36%)',lvl:6.89,cap:'−19% on top of allopurinol · Feher 2003',
  mech:'A fibrate that raised urate clearance by 36%. [[Feher2003]]',
  pk:'Not a gout drug.',
  lab:'ACR 2020 conditionally recommends against adding or switching to fenofibrate for gout. [[FitzGerald2020]]',
  hist:'Not licensed for gout. [[FitzGerald2020]]',
  eff:'200 mg/day lowered serum urate by a further 19% on top of allopurinol. [[Feher2003]]'},
 sglt2:{n:'SGLT2 inhibitors',c:'Diabetes and heart drugs',site:['kid'],at:'the kidney (exact transporter not in our sources)',lvl:7.87,cap:'−37.73 µmol/L (≈ −0.63 mg/dL) · Zhao 2018',
  mech:'Drugs for diabetes that lower serum urate as a side effect. [[Zhao2018]]',
  pk:'Not a gout drug. The urate effect was lost at eGFR <60. [[Zhao2018]]',
  lab:'Not licensed for gout. Their links with fewer flares are covered in <a href="#links" data-go="links">Gout, kidneys &amp; heart</a>. [[Fralick2020,McCormick2023]]',
  hist:'In DAPA-HF, dapagliflozin lowered urate by 0.84 mg/dL over 12 months against placebo. [[McDowell2022]]',
  eff:'Across 62 randomised trials (34,941 people with type 2 diabetes), serum urate fell by a weighted mean of 37.73 µmol/L [about 0.63 mg/dL]. [[Zhao2018]]'}
};
/* two layouts: boxes, badges and particle routes. Each route point is [x,y,state]; the state
   colours the segment that starts there: p precursor, u urate, a allantoin */
const UL_L={
 w:{vb:'720 400',
  box:{pur:[14,66,100,52,'Purines','food, turnover'],hyp:[154,66,108,52,'Hypoxanthine',''],xan:[318,66,92,52,'Xanthine',''],
   pool:[462,56,112,118,'Urate','in the blood'],all:[616,18,96,46,'Allantoin','soluble'],kid:[616,120,96,130,'Kidney','reabsorbs most'],
   uri:[616,300,96,46,'Urine','≈ 2/3 of output'],gut:[462,236,112,46,'Gut','ABCG2 exports'],sto:[462,316,112,40,'Stool','≈ 1/3']},
  bd:{xo1:[290,92,'XO','v',1],xo2:[436,92,'XO','v',1],uc:[566,40,'uricase'],urat1:[616,206,'URAT1','v',-1]},
  rt:{prod:[[64,92,'p'],[208,92,'p'],[364,92,'p'],[436,92,'u'],[518,115]],
   uri:[[518,115,'u'],[574,150,'u'],[664,160,'u'],[664,330,'u'],[664,332]],
   reab:[[518,115,'u'],[574,150,'u'],[664,160,'u'],[640,206,'u'],[600,206,'u'],[574,190,'u'],[518,150]],
   gut:[[518,115,'u'],[518,259,'u'],[518,336,'u'],[518,338]],
   uc:[[518,115,'u'],[518,40,'u'],[566,40,'a'],[664,40,'a'],[664,160,'a'],[664,330,'a'],[664,332]]},
  g:{x0:30,x1:420,y:318,ty:204}},
 n:{vb:'400 740',
  box:{pur:[20,50,150,46,'Purines','food, cell turnover'],hyp:[20,130,150,46,'Hypoxanthine',''],xan:[20,210,150,46,'Xanthine',''],
   pool:[20,296,150,110,'Urate','in the blood'],all:[250,50,130,46,'Allantoin','soluble'],kid:[250,230,130,140,'Kidney','reabsorbs most'],
   uri:[250,420,130,46,'Urine','≈ 2/3 of output'],gut:[20,446,150,46,'Gut','ABCG2 exports'],sto:[20,526,150,40,'Stool','≈ 1/3']},
  bd:{xo1:[95,193,'XO','h',1],xo2:[95,276,'XO','h',1],uc:[210,150,'uricase'],urat1:[250,352,'URAT1','v',-1]},
  rt:{prod:[[95,73,'p'],[95,153,'p'],[95,233,'p'],[95,276,'u'],[95,350]],
   uri:[[95,350,'u'],[170,320,'u'],[250,320,'u'],[315,300,'u'],[315,443,'u'],[315,446]],
   reab:[[95,350,'u'],[170,320,'u'],[250,320,'u'],[315,300,'u'],[290,352,'u'],[250,352,'u'],[170,380,'u'],[95,380]],
   gut:[[95,350,'u'],[95,469,'u'],[95,546,'u'],[95,548]],
   uc:[[95,350,'u'],[170,306,'u'],[210,306,'u'],[210,150,'a'],[210,73,'a'],[315,73,'a'],[315,300,'a'],[315,443,'a'],[315,446]]},
  g:{x0:30,x1:370,y:656,ty:586}}
};
/* exit shares by what the drug blocks */
function ulShares(site){
  if(site.includes('uc'))return{uc:.8,reab:.08,uri:.07,gut:.05};
  if(site.includes('urat1'))return{uc:0,reab:.08,uri:.67,gut:.25};
  if(site.includes('kid'))return{uc:0,reab:.3,uri:.45,gut:.25};
  return{uc:0,reab:.42,uri:.33,gut:.25};
}
/* a polyline with cumulative lengths, sampled by distance */
function ulPoly(pts){const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));return{pts,L,len:L[L.length-1]}}
function ulAt(P,d){d=clamp(d,0,P.len);let i=1;while(i<P.L.length-1&&P.L[i]<d)i++;const a=P.pts[i-1],b=P.pts[i],u=(d-P.L[i-1])/Math.max(1e-6,P.L[i]-P.L[i-1]);return[lerp(a[0],b[0],u),lerp(a[1],b[1],u),a[2]||'u']}
function ulDist(P,x,y){let best=0,bd=1e9;for(let i=1;i<P.pts.length;i++){const a=P.pts[i-1],b=P.pts[i];for(let k=0;k<=20;k++){const u=k/20,px=lerp(a[0],b[0],u),py=lerp(a[1],b[1],u),dd=Math.hypot(px-x,py-y);if(dd<bd){bd=dd;best=P.L[i-1]+u*(P.L[i]-P.L[i-1])}}}return best}
inits.ult=()=>{
  const svg=$('#ulSvg'),rg=$('#ulT');let pick='auto';
  const R=rng(31),PART=Array.from({length:34},(_,i)=>({o:i/34,r1:R(),r2:R()}));
  const COL={p:'var(--muted)',u:'var(--gold)',a:'var(--sea)'};
  const routes={};
  function prep(key){if(routes[key])return routes[key];const Lw=UL_L[key],P=ulPoly(Lw.rt.prod),o={prod:P};
    ['uri','reab','gut','uc'].forEach(k=>o[k]=ulPoly(Lw.rt.prod.slice(0,-1).concat(Lw.rt[k])));
    o.xo1=ulDist(P,Lw.bd.xo1[0],Lw.bd.xo1[1]);o.xo2=ulDist(P,Lw.bd.xo2[0],Lw.bd.xo2[1]);
    return routes[key]=o}
  function wrapT(txt,n){const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o}
  function draw(t){
    const N=vb(svg,'720 400','400 740'),key=N?'n':'w',L=UL_L[key],RT=prep(key);
    const p=phaseOf(UL_STEPS,t),S=UL_STEPS[p],nx=p<2?UL_STEPS[p+1].from:1,lt=clamp((t-S.from)/(nx-S.from));
    const dk=pick==='auto'?UL_AUTO[p]:pick,D=UL_DRUGS[dk],site=D.site;
    const k=ease(ramp(lt,.06,.55)),lvl=D.lvl==null?null:lerp(8.5,D.lvl,k);
    const hot={0:['pur','hyp','xan'],1:['kid','uri','gut','sto'],2:['all']}[p];
    let s=`<defs>${marker('ulA','var(--muted)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="${N?28:12}" class="t-sm" style="fill:var(--sea)">${['1 · MAKE LESS','2 · EXCRETE MORE','3 · BREAK IT DOWN'][p]}</text>`;
    if(!N)s+=`<text x="14" y="30" class="t-xs">${D.n==='No drug'?'no drug selected':D.n+' · acts on '+D.at}</text>`;
    // guide lines under the particles
    Object.keys(L.rt).forEach(r=>{const pts=L.rt[r];if(r==='uc'&&!site.includes('uc')){s+=`<path d="M${pts.map(q=>q[0]+' '+q[1]).join('L')}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:3 5"/>`;return}
      s+=`<path d="M${pts.map(q=>q[0]+' '+q[1]).join('L')}" style="fill:none;stroke:var(--line);stroke-width:2.4;stroke-linejoin:round"/>`});
    // particles
    const sh=ulShares(site),xoB=site.includes('xo'),blockF=xoB?(site.includes('urat1')?.5:.55):0,pile={xo1:0,xo2:0};
    PART.forEach(q=>{
      let ex='gut';const r=q.r1;let a=0;for(const k2 of ['uc','reab','uri','gut']){a+=sh[k2];if(r<a){ex=k2;break}}
      const P=RT[ex],u=((t*7+q.o)%1),d=u*P.len;
      if(xoB&&q.r2<blockF){const bk=q.r2<blockF/2?'xo1':'xo2',bd=RT[bk]-12;if(d>bd){pile[bk]++;return}}
      const [x,y,c]=ulAt(P,d);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${COL[c]};opacity:.92"/>`});
    // boxes over the particles
    Object.entries(L.box).forEach(([id,b])=>{const [x,y,w,h,l,sb]=b,isHot=hot.includes(id);
      const isSite=(id==='kid'&&(site.includes('kid')||site.includes('urat1')))||(id==='all'&&site.includes('uc'))||(xoB&&(id==='hyp'||id==='xan'));
      if(id==='pool'){const fh=(h-34)*clamp((lvl==null?D.lvlFallback||6.2:lvl)/10);
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--gold);stroke-width:2"/>`;
        s+=`<rect x="${x+6}" y="${f1(y+h-6-fh)}" width="${w-12}" height="${f1(fh)}" rx="7" style="fill:var(--gold-soft)"/>`;
        s+=`<line x1="${x+6}" x2="${x+w-6}" y1="${f1(y+h-6-(h-34)*.6)}" y2="${f1(y+h-6-(h-34)*.6)}" style="stroke:var(--sea);stroke-width:1.4;stroke-dasharray:4 3"/>`;
        s+=`<text x="${x+w/2}" y="${y+20}" class="t-lbl t-mid">${l}</text><text x="${x+w/2}" y="${y+33}" class="t-xs t-mid">${sb}</text>`;
        s+=`<text x="${x+w-8}" y="${f1(y+h-6-(h-34)*.6-4)}" class="t-xs t-end" style="fill:var(--sea)">6</text>`;return}
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="11" style="fill:${isHot?'var(--panel)':'var(--panel-2)'};stroke:${isSite?'var(--sea)':isHot?'var(--muted)':'var(--line)'};stroke-width:${isSite?2.4:1.3}"/>`;
      s+=`<text x="${x+w/2}" y="${y+(sb?21:h/2+5)}" class="t-lbl t-mid">${l}</text>`;if(sb)s+=`<text x="${x+w/2}" y="${y+36}" class="t-xs t-mid">${sb}</text>`;
      if(id==='kid'){const cx=x+w/2,cy=y+56;s+=`<circle cx="${cx-18}" cy="${cy}" r="9" style="fill:none;stroke:var(--tub-a);stroke-width:1.6"/><path d="M${cx-9} ${cy} H${cx+14} V${cy+44} H${cx-4}" style="fill:none;stroke:var(--tub-a);stroke-width:5;stroke-linejoin:round;opacity:.55"/>`}});
    // badges
    Object.entries(L.bd).forEach(([id,b])=>{const [x,y,l,o,sg]=b,w=l.length*7+14;
      const on=(id.startsWith('xo')&&xoB)||(id==='urat1'&&site.includes('urat1'))||(id==='uc'&&site.includes('uc'));
      const lost=id==='uc'&&!site.includes('uc');
      s+=`<rect x="${f1(x-w/2)}" y="${y-10}" width="${w}" height="20" rx="10" style="fill:${on?'var(--sea)':'var(--panel)'};stroke:${on?'var(--sea)':lost?'var(--line)':'var(--muted)'};stroke-width:1.4${lost?';stroke-dasharray:3 3':''}"/>`;
      s+=`<text x="${x}" y="${y+4}" class="t-xs t-mid" style="fill:${on?'var(--on-sea)':lost?'var(--muted)':'var(--ink)'};font-weight:700">${l}</text>`;
      if(on&&id!=='uc'){s+=o==='v'?`<line x1="${f1(x+sg*(w/2+6))}" x2="${f1(x+sg*(w/2+6))}" y1="${y-14}" y2="${y+14}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/>`:`<line x1="${x-16}" x2="${x+16}" y1="${y+sg*13}" y2="${y+sg*13}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/>`}
      if(lost)s+=`<text x="${x}" y="${y+(N?22:-14)}" class="t-xs t-mid">${N?'lost in humans':'lost in humans'}</text>`});
    // piles of blocked precursors
    ['xo1','xo2'].forEach(bk=>{const [bx,by]=L.bd[bk];for(let j=0;j<pile[bk];j++){const col=j%4,row=Math.floor(j/4);
      const px=N?bx-34-col*7:bx-10+col*7,py=N?by-6+row*7:by-34-row*7;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.6" style="fill:var(--muted);opacity:.55"/>`}});
    // gauge
    const G=L.g,gx=v=>lerp(G.x0,G.x1,clamp(v/10)),gy=G.y;
    s+=`<text x="${G.x0-14}" y="${G.ty}" class="t-big">${D.n}</text><text x="${G.x0-14}" y="${G.ty+18}" class="t-sm">${D.c}</text>`;
    wrapT('acts on: '+D.at,N?54:58).forEach((ln,i)=>s+=`<text x="${G.x0-14}" y="${G.ty+34+i*13}" class="t-xs" style="fill:var(--ink)">${ln}</text>`);
    s+=`<text x="${G.x0}" y="${gy-14}" class="t-xs">SERUM URATE, mg/dL · SCHEMATIC</text>`;
    s+=`<rect x="${G.x0}" y="${gy}" width="${G.x1-G.x0}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${G.x0}" y="${gy}" width="${f1(gx(6)-G.x0)}" height="16" rx="8" style="fill:var(--sea-soft)"/>`;
    if(lvl!=null)s+=`<rect x="${G.x0}" y="${gy+3}" width="${f1(Math.max(4,gx(lvl)-G.x0))}" height="10" rx="5" style="fill:var(--gold)"/><text x="${f1(Math.min(G.x1-2,Math.max(G.x0+30,gx(lvl))))}" y="${gy-3}" class="t-sm t-end" style="fill:var(--gold);font-weight:700">${f1(lvl)}</text>`;
    else s+=`<rect x="${G.x0}" y="${gy+3}" width="${f1(gx(8.5)-G.x0)}" height="10" rx="5" style="fill:none;stroke:var(--gold);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    if(D.rg&&k>.95)s+=`<line x1="${f1(gx(D.rg[0]))}" x2="${f1(gx(D.rg[1]))}" y1="${gy+8}" y2="${gy+8}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(gx(D.rg[0]))}" x2="${f1(gx(D.rg[0]))}" y1="${gy+3}" y2="${gy+13}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(gx(D.rg[1]))}" x2="${f1(gx(D.rg[1]))}" y1="${gy+3}" y2="${gy+13}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    s+=`<line x1="${f1(gx(6))}" x2="${f1(gx(6))}" y1="${gy-6}" y2="${gy+22}" style="stroke:var(--sea);stroke-width:2"/>`;
    [0,2,4,6,8,10].forEach(v=>s+=`<text x="${f1(gx(v))}" y="${gy+32}" class="t-xs t-mid" style="${v===6?'fill:var(--sea);font-weight:700':''}">${v}</text>`);
    s+=`<text x="${f1(gx(6)+4)}" y="${gy+45}" class="t-xs" style="fill:var(--sea)">← target &lt;6</text>`;
    wrapT(D.cap,N?58:62).forEach((ln,i)=>s+=`<text x="${G.x0}" y="${gy+(N?58:60)+i*12}" class="t-xs" style="fill:var(--ink)">${ln}</text>`);
    svg.innerHTML=s;
    setSt(p);
    $('#ulRead').innerHTML=`<span>scene <b>${p+1} of 3</b></span><span>drug <b>${D.n}</b></span><span>acts on <b>${D.at}</b></span><span>gauge <b>${lvl==null?'not drawn: no mean change quoted':'8.5 → '+f1(lvl)+' mg/dL'}</b></span>`;
    let extra='';
    if(D.mech)extra=`<div class="ul-drug"><div class="kicker">${pick==='auto'?'This scene\'s example drug':'Your pick'} · ${D.n}</div><dl class="kv">`+
      `<div><dt>Mechanism</dt><dd>${D.mech}</dd></div><div><dt>Half-life and handling</dt><dd>${D.pk}</dd></div>`+
      `<div><dt>Label and guideline (as published)</dt><dd>${D.lab}</dd></div><div><dt>Approval history</dt><dd>${D.hist}</dd></div>`+
      `<div><dt>Published effect</dt><dd>${D.eff}</dd></div></dl></div>`;
    else extra=`<div class="ul-drug"><div class="kicker">No drug</div><p>Nothing is blocked: urate is made at the usual rate, most of what the kidney filters is reabsorbed, and the uricase step is missing in humans. [[Chen2016,Oda2002]]</p></div>`;
    $('#ulNote').innerHTML=noteHTML(S)+extra;
  }
  const stop=playWire(rg,$('#ulPlay'),draw,24000,'Replay','ult');
  const setSt=stepWire($('#ulSteps'),UL_STEPS,rg,draw,stop);
  $$('[data-ul]').forEach(b=>b.onclick=()=>{pick=b.dataset.ul;$$('[data-ul]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    // a manual pick jumps to the scene that drug belongs to, so its step is in view
    const D=UL_DRUGS[pick];if(D&&D.site){const sc=D.site.includes('uc')?2:(D.site.includes('urat1')||D.site.includes('kid'))?1:D.site.includes('xo')?0:-1;
      if(sc>=0&&phaseOf(UL_STEPS,+rg.value)!==sc){stop();rg.value=UL_STEPS[sc].at}}
    draw(+rg.value)});
  draw(+rg.value);
};
