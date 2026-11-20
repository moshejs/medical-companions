/* =============== 4.4 Toward better treatment =============== */
inits.frontier=()=>{
  const svg=$('#reSvg'),rg=$('#reT'),note=$('#reNote'),hb=$('#reHuman');
  let human=false,pinned=null;
  const NOW=2026.82,Y0=2009,YB=2017,Y1=2030,BRK=.14;
  const LANES=['Genetics','Criteria','vEDS treatment','Mechanisms'];
  const EVC={est:'var(--good)',early:'var(--warn)',hyp:'var(--rx)'};
  /* y: decimal year; ln: lane; tr: interventional human trial; d: detail (cited) */
  const M=[
    {y:2010.75,ln:2,ev:'est',tr:1,l:'BBEST: celiprolol 20% vs 50%',d:'BBEST (Lancet 2010): open randomised trial, 53 people with clinical vEDS; arterial events 20% on celiprolol vs 50% untreated, HR 0.36; stopped early for benefit. [[Ong2010]]'},
    {y:2015.5,ln:3,ev:'early',l:'MEDIC plasma biomarkers done',d:'MEDIC, a French plasma-biomarker study in 211 people with vEDS, completed in 2015; no results are posted on the registry. [[NCT02165085]]'},
    {y:2017.2,ln:1,ev:'est',l:'2017 classification: 13 types',d:'The 2017 classification recognises 13 types; all except hEDS need molecular confirmation. Symptomatic hypermobility that meets no syndrome becomes hypermobility spectrum disorder. [[Malfait2017,Castori2017]]'},
    {y:2018.3,ln:0,ev:'est',l:'HEDGE study begins',d:'The Ehlers-Danlos Society began HEDGE in 2018 to find the genetic basis of hEDS by whole-genome sequencing of 1,000 adults meeting the 2017 criteria. Experts expect most hEDS will not have a single-gene cause (Hypothesis). [[Douglas2026,VanDijk2024]]'},
    {y:2019.3,ln:2,ev:'early',l:'French cohort: celiprolol survival',d:'In 144 people with confirmed vEDS followed for a median 5.3 years, those on celiprolol survived longer (p=0.0004), best at 400 mg/day. Observational, so open to confounding. [[Frank2019JACC]]'},
    {y:2020.1,ln:3,ev:'early',l:'Mouse: ERK/PKCβ, hydralazine',d:'In Col3a1 glycine-substitution mice, ERK1/2 or PKCβ inhibitors prevented death from aortic rupture; hydralazine from birth kept 97% alive to 45 days vs 52% untreated. Celiprolol, losartan, propranolol and atenolol did not help these mice. Animal data only. [[Bowen2020JCI]]'},
    {y:2020.13,ln:2,ev:'early',tr:1,l:'ARCADE completes',d:'ARCADE (irbesartan vs placebo on top of celiprolol) completed in February 2020 with 61 enrolled. [[NCT02597361]]'},
    {y:2021.8,ln:3,ev:'early',l:'Doxycycline in hEDS cells',d:'In hEDS skin fibroblasts, blocking matrix metalloproteinases with doxycycline restored a control-like matrix in the dish. In vitro only, not a treatment recommendation. [[Chiarelli2021]]'},
    {y:2022.0,ln:0,ev:'est',l:'Genetics appraisal: 11 of 304',d:'A critical appraisal found only 11 of 304 publications met its quality criteria; the hEDS genetic literature was "scant, dispersed and conflicting". [[Scicluna2022]]'},
    {y:2022.9,ln:1,ev:'early',l:'hEDS and HSD: one entity?',d:'Skin-fibroblast RNA sequencing found the same matrix disarray and myofibroblast pattern in hEDS and HSD; the authors argue they are a single entity. [[Ritelli2022]]'},
    {y:2022.85,ln:2,ev:'hyp',tr:1,l:'DiSCOVER phase 3 starts',d:'DiSCOVER (NCT05432466), a double-blind, placebo-controlled phase 3 trial of celiprolol 200 mg twice daily in COL3A1-positive vEDS, started on 7 November 2022, aiming for 150 people. [[NCT05432466]]'},
    {y:2023.2,ln:0,ev:'est',l:'HEDGE: 1,021 enrolled',d:'HEDGE enrolment reached 1,021: 92% female, 95% White, 62% from the United States. [[Halverson2023]]'},
    {y:2023.5,ln:2,ev:'early',l:'UK service: 5-year survival',d:'In the UK national vEDS service (126 patients), 5-year survival was 96.53% on medication vs 42.69% untreated: retrospective, observational and confounded. [[Bowen2023]]'},
    {y:2023.75,ln:3,ev:'early',l:'Vertebral tortuosity marker',d:'In 65 people with vEDS, a vertebral tortuosity index of at least 15.5 discriminated cardiovascular events (sensitivity 70%, specificity 76%). [[Stephens2023]]'},
    {y:2024.1,ln:3,ev:'early',l:'vEDS stem-cell line',d:'Induced pluripotent stem cell lines have been made from people with vEDS (a COL3A1 nonsense variant) and musculocontractural EDS, for studying disease in human cells. [[Hopperger2024,Yue2023]]'},
    {y:2024.18,ln:2,ev:'hyp',tr:1,l:'PREVEnt suspended',d:'PREVEnt, a phase 3 trial of the PKCβ inhibitor enzastaurin (260 planned), is suspended: "Indefinite hold by company" (last update March 2024). [[NCT05463679]]'},
    {y:2024.3,ln:0,ev:'early',l:'Exome study: no single gene',d:'Exome sequencing of 174 unresolved EDS patients found candidate loci, none reaching genome-wide significance. [[Vandersteen2024]]'},
    {y:2025.1,ln:2,ev:'early',tr:1,l:'ARCADE: HR 0.42',d:'ARCADE (Circulation 2025): irbesartan added to celiprolol cut arterial events or new lesions, 27.6% vs 53.6% (HR 0.42, 95% CI 0.17–0.99) in 57 adults. [[Jeunemaitre2025]]'},
    {y:2025.2,ln:3,ev:'early',l:'Plasma ECM fragment pattern',d:'A plasma fibronectin and collagen-fragment pattern was shared by hEDS and HSD and differed from other EDS types and arthritis: a potential blood test, not validated. [[Ritelli2025]]'},
    {y:2025.27,ln:0,ev:'hyp',tr:0,l:'Genotyping study completes',d:'A Boston University study genotyped 334 people with EDS and completed in April 2025; results are not yet posted. [[NCT03093493]]'},
    {y:2025.6,ln:0,ev:'early',l:'KLK15 candidate gene',d:'Exome sequencing of 200 people with hEDS found rare kallikrein-gene variants, including a recurrent KLK15 variant segregating in families; a knock-in mouse showed hEDS-like tendon and valve changes. Not yet replicated, not a diagnostic test. [[Gensemer2025]]'},
    {y:2025.75,ln:3,ev:'early',l:'Proteomics, AI face analysis',d:'Serum proteomics found complement proteins lower in women with hEDS; an AI facial model separated vEDS from controls and hEDS (AUC ≥0.97). Both need validation. [[Griggs2025,Murdock2025]]'},
    {y:2026.15,ln:1,ev:'early',l:'Proteomics: hEDS ≈ HSD',d:'Serum proteomics in 88 hEDS, 88 HSD and 176 controls found no significant differences between hEDS and HSD; a 2026 review calls current criteria inadequate for the heterogeneity of hEDS/HSD. [[Cinquina2026,Motlak2026]]'},
    {y:2026.4,ln:3,ev:'early',l:'Mouse: hormone blockade',d:'Combined androgen- and mineralocorticoid-receptor blockade gave "near-complete and durable protection" in vEDS mice of both sexes. Animal data only. [[Juzwiak2026]]'},
    {y:2027.17,ln:2,ev:'hyp',tr:1,fut:1,l:'vEDS exercise programme starts',d:'A co-designed 12-week remote exercise and lifestyle programme for vEDS (40 planned, Sheffield Hallam University) is registered as not yet recruiting, with an estimated start of 1 March 2027. [[NCT07697573]]'},
    {y:2028.0,ln:3,ev:'hyp',fut:1,l:'RaDiCo-SEDVasc ends (est.)',d:'The French national vEDS cohort (340 enrolled) has an estimated completion of January 2028. [[NCT05976841]]'},
    {y:2029.17,ln:2,ev:'hyp',tr:1,fut:1,l:'DiSCOVER results (est.)',d:'DiSCOVER\'s estimated primary completion is 1 March 2029, per the registry record last updated in August 2025. Its primary outcome is time to the first vEDS-related clinical event. [[NCT05432466]]'}
  ];
  const xOf=(y,x0,x1)=>{const bx=x0+(x1-x0)*BRK;return y<YB?lerp(x0,bx,ramp(y,Y0,YB)):lerp(bx,x1,ramp(y,YB,Y1))};
  const yrOf=t=>t<BRK?lerp(Y0,YB,t/BRK):lerp(YB,Y1,(t-BRK)/(1-BRK));
  const tOf=y=>y<YB?BRK*ramp(y,Y0,YB):BRK+(1-BRK)*ramp(y,YB,Y1);
  const STEPS=[
    {from:0,at:tOf(2017.4),k:'Up to 2017',t:'Where things stood',
     txt:`The 2017 classification defined 13 types, all but hEDS confirmed by a gene test. One drug trial existed for any type: BBEST, an open trial of celiprolol in vascular EDS. Management of every type remains supportive: "No specific medical or genetic therapies are available for any type of EDS". [[Malfait2017,Ong2010,Malfait2020]]`,
     pt:`In 2017 there was no medicine made for EDS, and doctors could only treat its symptoms and complications.`,
     hook:`All 13 types except hEDS need molecular confirmation (2017). [[Malfait2017]]`},
    {from:tOf(2018),at:tOf(2025.7),k:'2018–2025 · genetics',t:'Hunting for hEDS genes',
     txt:`HEDGE began in 2018, aiming to sequence 1,000 genomes; 1,021 people enrolled. A 2022 appraisal found the hEDS genetic literature "scant, dispersed and conflicting". In 2025 a KLK15 variant was reported in several families, with a mouse model, but it awaits replication <span class="ev early">Early evidence</span>. Reviews describe hEDS as likely genetically heterogeneous <span class="ev hyp">Hypothesis</span>. [[Douglas2026,Halverson2023,Scicluna2022,Gensemer2025,Gensemer2021]]`,
     pt:`Scientists are searching for the genes behind hypermobile EDS. There is still no gene test for it.`,
     hook:`KLK15 is an early-evidence candidate gene for hEDS, not a diagnostic test. [[Gensemer2025]]`},
    {from:tOf(2026.0),at:tOf(2026.3),k:'2020–2026 · mechanisms',t:'Mice, cells and markers',
     txt:`vEDS mice revealed a targetable signalling pathway (PLC/IP3/PKC/ERK): inhibitors, hydralazine and hormone blockade protected the mice <span class="ev early">Early evidence</span>. Human stem-cell lines, plasma fragment patterns and serum proteomics are being explored as models and markers. Several studies find no clear molecular line between hEDS and HSD. Animal and dish results are hypotheses for people, not treatments. [[Bowen2020JCI,Juzwiak2026,Hopperger2024,Ritelli2025,Cinquina2026]]`,
     pt:`Some drugs protect mice with vascular EDS. That is a promising start, but they have not been proven in people.`,
     hook:`In vEDS mice, celiprolol accelerated aortic rupture in one model and strengthened the aorta in another. [[Bowen2020JCI,Dubacher2020]]`},
    {from:tOf(2026.6),at:tOf(2026.8),k:'2010–2026 · vEDS trials',t:'From an open trial to placebo controls',
     txt:`After BBEST, observational cohorts supported celiprolol, and ARCADE showed a benefit of adding irbesartan (HR 0.42) <span class="ev early">Early evidence</span>. DiSCOVER, a placebo-controlled phase 3 trial of celiprolol, began in 2022; PREVEnt (enzastaurin) is suspended by its sponsor. Turn on "Show only human trials" to see this lane alone. [[Frank2019JACC,Jeunemaitre2025,NCT05432466,NCT05463679]]`,
     pt:`Vascular EDS now has a few real drug trials in people. The biggest one will not report until about 2029.`,
     hook:`DiSCOVER: celiprolol vs placebo, phase 3, estimated primary completion March 2029. [[NCT05432466]]`},
    {from:tOf(2026.86),at:1,k:'2027 and beyond',t:'What is announced next',
     txt:`Dates beyond October 2026 are as announced: a vEDS exercise programme is registered to start in 2027; the French vEDS cohort ends around 2028; DiSCOVER's primary completion is estimated for 2029; the Italian RED registry recruits through 2033. EDS trials are hard to run: an oxytocin trial for hEDS pain stopped after enrolling 2 people. [[NCT07697573,NCT05976841,NCT05432466,NCT04133272,NCT05405257]]`,
     pt:`More answers are coming, but slowly. Dates in the future are plans, not promises.`,
     hook:`No medicine is approved for any EDS type; management is supportive. [[Malfait2020]]`}
  ];
  const setActive=stepWire($('#reSteps'),STEPS,rg,t=>{pinned=null;draw(t)},()=>stop());
  const wrap=(s,n)=>{const w=s.replace(/\s*<sup[\s\S]*?<\/sup>/g,'').replace(/\s*\[\[[^\]]*\]\]/g,'').split(' ');const out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out};
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),yr=yrOf(t);
    const L=N?{x0:24,x1:384,lanes:[90,170,250,330],lab:-22,ax:372,cb:[12,406,376,184],cw:58}
             :{x0:150,x1:704,lanes:[44,104,164,224],lab:0,ax:262,cb:[12,286,696,86],cw:112};
    let s='';
    const X=y=>xOf(y,L.x0,L.x1);
    /* compressed segment and today */
    s+=`<rect x="${L.x0}" y="${L.lanes[0]-(N?36:22)}" width="${f1(X(YB)-L.x0)}" height="${f1(L.ax-L.lanes[0]+(N?36:22))}" style="fill:var(--panel-2);opacity:.5"/>`;
    s+=`<rect x="${f1(X(NOW))}" y="${L.lanes[0]-(N?36:22)}" width="${f1(L.x1-X(NOW))}" height="${f1(L.ax-L.lanes[0]+(N?36:22))}" style="fill:var(--rx-soft);opacity:.35"/>`;
    s+=`<line x1="${f1(X(NOW))}" x2="${f1(X(NOW))}" y1="${L.lanes[0]-(N?36:22)}" y2="${L.ax}" style="stroke:var(--rx);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(X(NOW)+4)}" y="${L.ax-4}" class="t-xs" style="fill:var(--rx)">Oct 2026</text>`;
    LANES.forEach((l,i)=>{const y=L.lanes[i];s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" class="grid"/>`;
      s+=N?`<text x="${L.x0}" y="${y+L.lab}" class="t-sm" style="fill:var(--ink)">${l.toUpperCase()}</text>`:`<text x="${L.x0-12}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${l}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    const ticks=N?[2009,2017,2020,2023,2026,2029]:[2009,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
    ticks.forEach(y=>s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${L.ax}" y2="${L.ax+4}" class="axis"/><text x="${f1(X(y))}" y="${L.ax+15}" class="t-xs t-mid">${y===2009?'earlier':N||y%2===1||y===2030?y:''}</text>`);
    s+=`<path d="M${f1(X(YB)-3)} ${L.ax-5}l3 10M${f1(X(YB)+1)} ${L.ax-5}l3 10" style="stroke:var(--muted)"/>`;
    /* milestones */
    let focus=null;
    M.forEach((m,i)=>{const on=yr>=m.y,x=X(m.y),y=L.lanes[m.ln]+((i%2)?5:-5),dim=human&&!m.tr,fut=m.fut||m.y>NOW,c=EVC[m.ev];
      if(on&&!dim)focus=i;
      const op=dim?.12:on?1:.22,r=on?(i===(pinned!=null?pinned:-1)?8:6):4;
      s+=`<g class="clk" data-rem="${i}" tabindex="${on&&!dim?0:-1}" role="button" aria-label="${esc(m.l)}" style="opacity:${op}">`;
      s+=fut?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${c};stroke-width:1.8;stroke-dasharray:3 2"/>`
            :m.ev==='hyp'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${c};stroke-width:2.4"/>`
            :`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c};stroke:var(--panel);stroke-width:1.2"/>`;
      if(m.tr)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r+3.5}" style="fill:none;stroke:var(--ink);stroke-width:.8;opacity:.5"/>`;
      s+=`</g>`});
    const fi=pinned!=null?pinned:focus;
    /* cursor */
    s+=`<line x1="${f1(X(yr))}" x2="${f1(X(yr))}" y1="${L.lanes[0]-(N?40:26)}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    s+=`<text x="${f1(clamp(X(yr),L.x0+20,L.x1-20))}" y="${L.lanes[0]-(N?44:28)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${yr<YB?'before 2017':Math.floor(yr)}</text>`;
    /* callout */
    const [cx,cy,cw,ch]=L.cb;
    s+=`<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(fi!=null){const m=M[fi],mx=X(m.y),my=L.lanes[m.ln];
      s+=`<line x1="${f1(mx)}" y1="${f1(my+8)}" x2="${f1(clamp(mx,cx+20,cx+cw-20))}" y2="${cy}" style="stroke:var(--muted);stroke-dasharray:2 3"/>`;
      const ys=m.y<YB?Math.floor(m.y):(m.fut||m.y>NOW?'as announced, ':'')+Math.floor(m.y);
      s+=`<text x="${cx+12}" y="${cy+20}" class="t-lbl" style="fill:${EVC[m.ev]}">${esc(m.l)}</text><text x="${N?cx+12:cx+cw-12}" y="${N?cy+36:cy+20}" class="t-xs ${N?'':'t-end'}">${ys} · ${LANES[m.ln]}${m.tr?' · human trial':''}</text>`;
      wrap(m.d,L.cw).slice(0,N?9:4).forEach((l,k)=>s+=`<text x="${cx+12}" y="${cy+(N?56:38)+k*14}" class="t-xs" style="fill:var(--ink)">${esc(l)}</text>`)}
    else s+=`<text x="${cx+12}" y="${cy+24}" class="t-xs">No milestone shown: move the cursor or turn off the filter.</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);note.innerHTML=noteHTML(STEPS[ph]);setActive(ph);
  }
  const stop=playWire(rg,$('#rePlay'),t=>{pinned=null;draw(t)},12000,'%t:player.replay%','frontier');
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rem]');if(!g)return;pinned=+g.dataset.rem;draw(+rg.value);showDetail(pinned)});
  svg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-rem]');if(!g)return;e.preventDefault();pinned=+g.dataset.rem;draw(+rg.value);const ng=svg.querySelector(`[data-rem="${pinned}"]`);ng&&ng.focus()});
  function showDetail(i){const m=M[i];note.innerHTML=noteHTML({k:(m.fut||m.y>NOW?'As announced · ':'')+LANES[m.ln],t:m.l,txt:m.d+(m.ev==='est'?' <span class="ev est">Established</span>':m.ev==='early'?' <span class="ev early">Early evidence</span>':' <span class="ev hyp">Unconfirmed</span>')})}
  hb.addEventListener('click',()=>{human=!human;hb.setAttribute('aria-pressed',human);pinned=null;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- pipeline funnel ---------- */
  const fsvg=$('#reFun'),fnote=$('#reFunNote');
  const STG=['Lab & animal','Early human','Randomised trial','Phase 3','Approved for EDS'];
  const CA=[
    {n:'Hydralazine',s:'Hydralazine',st:0,w:'vEDS',ev:'early',d:'Given from birth, hydralazine kept 97% of Col3a1 G938D mice alive to 45 days, against 52% untreated. No human trial is registered in the sources reviewed. [[Bowen2020JCI]]'},
    {n:'Cobimetinib (MEK/ERK)',s:'Cobimetinib',st:0,w:'vEDS',ev:'early',d:'This MEK/ERK inhibitor gave 90% survival at 45 days in vEDS mice vs 52% untreated. Animal data only. [[Bowen2020JCI]]'},
    {n:'Ruboxistaurin (PKCβ)',s:'Ruboxistaurin',st:0,w:'vEDS',ev:'early',d:'This PKCβ inhibitor gave 94% survival at 45 days in vEDS mice vs 52% untreated. Animal data only. [[Bowen2020JCI]]'},
    {n:'Hormone blockade',s:'Hormone block',st:0,w:'vEDS',ev:'early',d:'Blocking androgen signalling with bicalutamide raised survival through puberty in vEDS mice (70% vs 50% at 60 days); combined androgen- and mineralocorticoid-receptor blockade gave "near-complete and durable protection". Animal data only. [[Bowen2020JCI,Juzwiak2026]]'},
    {n:'Doxycycline (hEDS cells)',s:'Doxycycline',st:0,w:'hEDS',ev:'early',d:'In hEDS skin fibroblasts, doxycycline restored a control-like matrix and partly reversed myofibroblast features. In vitro only; the authors pose it as a question, not a recommendation. [[Chiarelli2021]]'},
    {n:'Oxytocin for hEDS pain',s:'Oxytocin',st:1,w:'hEDS',ev:'hyp',d:'EDS-OXY (NCT05405257) tested oxytocin for chronic pain in hEDS. Terminated 11 March 2025 after enrolling 2 participants, because of recruitment problems. [[NCT05405257]]'},
    {n:'Heart-coherence training',s:'Heart coherence',st:1,w:'vEDS',ev:'hyp',d:'HEARTMATH (NCT05994664) tests heart-coherence training in vEDS, with change in systolic blood pressure as the primary outcome; 40 estimated, recruiting (record updated July 2024). [[NCT05994664]]'},
    {n:'Exercise & lifestyle',s:'Exercise plan',st:1,w:'vEDS',ev:'hyp',d:'A co-designed 12-week remote exercise-based lifestyle programme for vEDS (NCT07697573; 40 planned) is not yet recruiting, with an estimated start of 1 March 2027. [[NCT07697573]]'},
    {n:'Celiprolol (BBEST)',s:'Celiprolol',st:2,w:'vEDS',ev:'est',d:'BBEST (NCT00190411), completed 2011: open randomised trial, 53 people; arterial events 20% vs 50%, HR 0.36 (0.15–0.88). Not FDA-approved for any indication. [[Ong2010,NCT00190411,openFDA-Celiprolol]]'},
    {n:'Irbesartan add-on (ARCADE)',s:'Irbesartan',st:2,w:'vEDS',ev:'early',d:'ARCADE (NCT02597361), completed February 2020, published 2025: double-blind, placebo-controlled, 57 adults on celiprolol; composite outcome 27.6% vs 53.6%, HR 0.42 (0.17–0.99). [[NCT02597361,Jeunemaitre2025]]'},
    {n:'Celiprolol (DiSCOVER)',s:'Celiprolol',st:3,w:'vEDS',ev:'hyp',d:'DiSCOVER (NCT05432466): phase 3, double-blind, decentralised, celiprolol 200 mg twice daily vs placebo in COL3A1-positive vEDS aged 15–64; recruiting since 7 November 2022; 150 estimated; primary completion estimated 1 March 2029; record updated 24 August 2025. [[NCT05432466]]'},
    {n:'Enzastaurin (PREVEnt)',s:'Enzastaurin',st:3,w:'vEDS',ev:'hyp',d:'PREVEnt (NCT05463679): phase 3, placebo-controlled trial of the PKCβ inhibitor enzastaurin 500 mg daily, 260 planned. Status: suspended, "Indefinite hold by company" (updated 8 March 2024). [[NCT05463679]]'}
  ];
  let sel=10;
  $('#reCands').innerHTML=CA.map((c,i)=>`<button class="btn" data-recand="${i}" aria-pressed="${i===sel}">${c.n}</button>`).join('');
  function drawFun(){
    const N=vb(fsvg,'720 300','400 600');let s='';
    const EV={est:'Established',early:'Early evidence',hyp:'Unconfirmed'};
    if(!N){const x0=14,cw=(706-x0)/5,top=40,bot=280;
      STG.forEach((g,k)=>{const h0=(bot-top)*(1-k*.15),h1=(bot-top)*(1-(k+1)*.15),xa=x0+k*cw,xb=xa+cw-4,mid=(top+bot)/2;
        s+=`<path d="M${f1(xa)} ${f1(mid-h0/2)}L${f1(xb)} ${f1(mid-h1/2)}L${f1(xb)} ${f1(mid+h1/2)}L${f1(xa)} ${f1(mid+h0/2)}Z" style="fill:${k===4?'var(--panel-2)':'var(--rx-soft)'};opacity:${k===4?1:.75-k*.1}"/>`;
        s+=`<text x="${f1(xa+cw/2)}" y="24" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${g}</text>`;
        const list=CA.map((c,i)=>[c,i]).filter(([c])=>c.st===k);
        list.forEach(([c,i],j)=>{const cy=mid-(list.length-1)*17+j*34,cx=xa+16,on=i===sel;
          s+=`<g class="clk" data-refun="${i}" tabindex="0" role="button" aria-label="${c.n}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${on?8:6}" style="fill:${c.st>=1&&c.ev==='hyp'?'var(--panel)':EVC[c.ev]};stroke:${EVC[c.ev]};stroke-width:2"/><text x="${f1(cx+12)}" y="${f1(cy+4)}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''}">${c.s}</text></g>`});
        if(k===4)s+=`<text x="${f1(xa+cw/2)}" y="${f1(mid-6)}" class="t-xs t-mid">none, for any</text><text x="${f1(xa+cw/2)}" y="${f1(mid+8)}" class="t-xs t-mid">EDS type</text>`});
    }else{const top=20,rh=112;
      STG.forEach((g,k)=>{const w0=360*(1-k*.13),w1=360*(1-(k+1)*.13),y=top+k*rh,cx=200;
        s+=`<path d="M${f1(cx-w0/2)} ${y}L${f1(cx+w0/2)} ${y}L${f1(cx+w1/2)} ${y+rh-6}L${f1(cx-w1/2)} ${y+rh-6}Z" style="fill:${k===4?'var(--panel-2)':'var(--rx-soft)'};opacity:${k===4?1:.75-k*.1}"/>`;
        s+=`<text x="${f1(cx-w0/2+10)}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:600">${g}</text>`;
        const list=CA.map((c,i)=>[c,i]).filter(([c])=>c.st===k);
        list.forEach(([c,i],j)=>{const col=j%2,row=Math.floor(j/2),px=cx-w1/2+14+col*(w1/2),py=y+36+row*22,on=i===sel;
          s+=`<g class="clk" data-refun="${i}" tabindex="0" role="button" aria-label="${c.n}"><circle cx="${f1(px)}" cy="${f1(py)}" r="${on?7:5}" style="fill:${c.st>=1&&c.ev==='hyp'?'var(--panel)':EVC[c.ev]};stroke:${EVC[c.ev]};stroke-width:2"/><text x="${f1(px+10)}" y="${f1(py+4)}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''}">${c.s}</text></g>`});
        if(k===4)s+=`<text x="${cx}" y="${y+50}" class="t-xs t-mid">none, for any EDS type</text>`});
    }
    fsvg.innerHTML=s;
    const c=CA[sel];fnote.innerHTML=noteHTML({k:STG[c.st]+' · '+c.w,t:c.n,txt:c.d+` <span class="ev ${c.ev}">${EV[c.ev]}</span>`,
      pt:c.st===0?'This has only been tested in animals or cells. It is not a treatment for people.':c.st<3?'Small or early studies in people. Results need confirming.':'A large trial in people is under way or on hold. No result yet.',
      hook:'No specific medical or genetic therapy is available for any EDS type. [[Malfait2020]]'})}
  function pick(i){sel=i;$$('[data-recand]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.recand===i));drawFun()}
  $('#reCands').addEventListener('click',e=>{const b=e.target.closest('[data-recand]');if(b)pick(+b.dataset.recand)});
  fsvg.addEventListener('click',e=>{const g=e.target.closest('[data-refun]');if(g)pick(+g.dataset.refun)});
  fsvg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest('[data-refun]');if(!g)return;e.preventDefault();const i=+g.dataset.refun;pick(i);const ng=fsvg.querySelector(`[data-refun="${i}"]`);ng&&ng.focus()});
  drawFun();
  {const prev=redraws.frontier;redraws.frontier=()=>{prev&&prev();drawFun()}}
};
