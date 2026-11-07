/* =============== 3.3 the differential =============== */
const DD_DZ=[
 {id:'fmf',n:'FMF',full:'Familial Mediterranean fever',sub:'1–3 d, irregular',src:'cited',
  gene:`<i>MEFV</i>, 16p13.3; autosomal recessive, sometimes with one variant or dominant (M694del, T577 variants) [[GeneReviews,Booth2000,Stoffels2014]]`,
  len:`12–72 h; 1–3 days in Eurofever [[Livneh1997,Gattorno2019]]`,
  feat:`Eastern Mediterranean ancestry; peritonitis, one-sided pleuritis; monoarthritis of a large joint; erysipelas-like erythema on the lower leg; exertional leg pain; colchicine response [[Livneh1997,Tunca2005]]`,
  test:`CRP/SAA high in attacks while ferritin and platelets are not [[Korkmaz2002]]; <i>MEFV</i> genotype [[Gattorno2019]]; colchicine trial [[GeneReviews]]`,
  pn:`Episode length is cited. The uneven spacing reflects published descriptions of FMF attacks as irregular, unlike PFAPA. [[BenChetrit2019]]`,
  ep:[[3,2,'f'],[17,3,'f'],[24,1.5,'f'],[45,2.5,'f']]},
 {id:'traps',n:'TRAPS',full:'TNF receptor-associated periodic syndrome',sub:'≥7 days',src:'cited',
  gene:`<i>TNFRSF1A</i>; autosomal dominant [[Lachmann2014]]`,
  len:`Often 7 days or more [[Gattorno2019]]`,
  feat:`Migratory rash over painful muscles; periorbital oedema; conjunctivitis; family history in 64% of non-R92Q cases. About 70 symptomatic days a year, and AA amyloidosis in 10% [[Lachmann2014]]`,
  test:`<i>TNFRSF1A</i> sequencing (R92Q and P46L are low-penetrance variants) [[Gattorno2019]]`,
  pn:`One 11-day episode in 60 days matches the roughly 70 symptomatic days a year in the Eurofever TRAPS series. [[Lachmann2014]]`,
  ep:[[12,11,'f']]},
 {id:'mkd',n:'MKD / HIDS',full:'Mevalonate kinase deficiency (HIDS)',sub:'3–7 days',src:'cited',
  gene:`<i>MVK</i>; autosomal recessive (two variants required) [[Gattorno2019]]`,
  len:`3–7 days untreated [[Favier2016]]`,
  feat:`Onset in infancy (median 0.5 years); neck lymph nodes; mouth ulcers; diarrhoea and vomiting; maculopapular rash; vaccination triggered the first flare in 63% in one series [[TerHaar2016,Favier2016]]`,
  test:`Urinary mevalonic acid during an attack (sensitivity 92%, specificity 90%, NPV 98%) [[Jeyaratnam2016]]; <i>MVK</i> genotype or enzyme activity`,
  pn:`Episode length is cited; the gap between episodes is illustrative. [[Favier2016]]`,
  ep:[[6,5,'f'],[34,4.5,'f']]},
 {id:'caps',n:'CAPS (FCAS)',full:'Cryopyrin-associated periodic syndromes (FCAS, MWS, NOMID)',sub:'FCAS <24 h, cold',src:'gk',
  gene:`<i>NLRP3</i>; autosomal dominant or new (de novo) [[SoonLaxer2017]]`,
  len:`FCAS under 24 h; MWS 1–3 days; NOMID continuous (standard teaching, not checked against a primary source) [[Lachmann2017]]`,
  feat:`Hives-like (urticarial) rash; cold or stress triggers; sensorineural hearing loss; conjunctivitis; aseptic meningitis; bone overgrowth [[KuemmerleDeschner2017,Gattorno2019]]`,
  test:`<i>NLRP3</i> sequencing, including a search for somatic mosaicism [[Gattorno2019]]`,
  pn:`Subtype durations are standard teaching, flagged as not checked against a primary source. The row shows FCAS: short flares after cold days.`,
  ep:[[8,.6,'f'],[9.6,.5,'f'],[22,.7,'f'],[37,.5,'f'],[51,.6,'f']]},
 {id:'pfapa',n:'PFAPA',full:'Periodic fever, aphthous stomatitis, pharyngitis, adenitis',sub:'3–6 d, every ~28 d',src:'cited',
  gene:`No known gene; not inherited [[SoonLaxer2017]]`,
  len:`3–6 days (mean 4.8), clockwork about every 28 days [[Thomas1999,Gattorno2019]]`,
  feat:`Onset usually before age 5; sore throat, mouth ulcers, neck lymph nodes; no serositis, chest pain, arthritis or diarrhoea; normal growth; no amyloidosis [[Gattorno2019,SoonLaxer2017]]`,
  test:`Clinical diagnosis; a single dose of prednisone aborts the attack [[SoonLaxer2017,Thomas1999]]`,
  pn:`Length and the ~28-day rhythm are both cited. [[Thomas1999]]`,
  ep:[[4,4.8,'f'],[32,4.8,'f']]},
 {id:'beh',n:'Behçet disease',full:'Behçet disease',sub:'ulcers 1–2 weeks',src:'gk',
  gene:`Polygenic; HLA-B51 association (general knowledge)`,
  len:`Oral ulcers usually last 1–2 weeks (general knowledge); chronic relapsing course`,
  feat:`Recurrent oral and genital ulcers, uveitis, skin lesions, vascular thrombosis, pathergy [[ICBD2014]]`,
  test:`ICBD score of 4 or more: eye, oral and genital lesions 2 points each; skin, nervous system, vascular signs and a positive pathergy test 1 point each (sensitivity 93.9%, specificity 92.1%) [[ICBD2014]]`,
  pn:`Ulcer duration is general knowledge, not tied to a fetched source.`,
  ep:[[10,12,'u'],[44,10,'u']]},
 {id:'ibd',n:'IBD',full:'Inflammatory bowel disease (Crohn disease, ulcerative colitis)',sub:'chronic, not self-limited',src:'gk',
  gene:`Polygenic`,
  len:`Chronic or persistent rather than self-limiting in 1–3 days`,
  feat:`Chronic diarrhoea or bleeding, weight loss, growth failure, perianal disease [[Maaser2019]]`,
  test:`Faecal calprotectin; endoscopy with biopsy; cross-sectional imaging [[Maaser2019]]`,
  pn:`Drawn as continuous, fluctuating activity: standard teaching rather than a cited time course.`,
  ep:[[0,60,'c']]},
 {id:'aip',n:'Acute int. porphyria',full:'Acute intermittent porphyria',sub:'days, usually no fever',src:'gk',
  gene:`<i>HMBS</i>; autosomal dominant with low penetrance (general knowledge)`,
  len:`Days`,
  feat:`Severe abdominal pain with few peritoneal signs; neuropathy, low sodium, psychiatric symptoms, dark urine; drug or hormonal triggers; usually no fever [[Anderson2005]]`,
  test:`Markedly raised urinary porphobilinogen on a single spot urine sample [[Anderson2005]]`,
  pn:`"Days" is standard teaching; the absence of fever is cited. [[Anderson2005]]`,
  ep:[[26,4,'a']]},
 {id:'app',n:'Appendicitis',full:'Appendicitis or another surgical abdomen',sub:'progresses, not resolving',src:'gk',
  gene:`None`,
  len:`Pain persists and progresses rather than resolving in 1–3 days`,
  feat:`In FMF patients, a shift from diffuse to right-lower-quadrant pain best predicted a truly inflamed appendix; 80% of appendices removed from FMF patients were not inflamed [[Lidar2008]]`,
  test:`Ultrasound or CT and surgical assessment; a history of recurrent self-limited episodes argues for FMF [[Lidar2008]]`,
  pn:`A single episode that builds until surgery: standard teaching.`,
  ep:[[30,2.6,'p']]},
 {id:'aosd',n:'AOSD / sJIA',full:'Adult-onset Still\'s disease / systemic JIA',sub:'daily spikes, ≥1 week',src:'gk',
  gene:`Polygenic`,
  len:`Daily spiking fever for at least 1 week; persistent rather than episodic`,
  feat:`Evanescent salmon-pink rash with fever, arthritis, sore throat, lymph nodes or a big spleen, high white count [[Yamaguchi1992]]`,
  test:`Yamaguchi criteria (≥5 criteria including ≥2 major: sensitivity 96.2%, specificity 92.1%); very high ferritin, unlike FMF attacks [[Yamaguchi1992,Korkmaz2002]]`,
  pn:`Quotidian (once-daily) spikes are standard teaching, not a cited time course.`,
  ep:[[15,30,'d']]}
];
const DD_CLUE=[
 {l:'Ends by itself in 1–3 days',ids:['fmf'],say:`Short, self-limited, irregular attacks are the FMF signature. Next steps: CRP/SAA in and between attacks, <i>MEFV</i> genotype, colchicine response. MWS, a CAPS subtype, can also run 1–3 days. [[Livneh1997,Gattorno2019,Lachmann2017]]`},
 {l:'Lasts a week or more',ids:['traps','aosd','beh'],say:`TRAPS episodes often run 7 days or more (test: <i>TNFRSF1A</i>); Still's fever spikes daily for at least a week (very high ferritin); Behçet ulcers last 1–2 weeks (ICBD score). [[Gattorno2019,Yamaguchi1992,ICBD2014]]`},
 {l:'Clockwork, about every 4 weeks',ids:['pfapa'],say:`A regular ~28-day cycle with sore throat, mouth ulcers and neck nodes in a young child suggests PFAPA. One prednisone dose aborting the attack supports it. [[Thomas1999,SoonLaxer2017]]`},
 {l:'Infant onset, vaccine trigger, diarrhoea',ids:['mkd'],say:`MKD starts in infancy (median 0.5 years) and vaccines triggered the first flare in 63% in one series. Test: urinary mevalonic acid during an attack. [[TerHaar2016,Favier2016,Jeyaratnam2016]]`},
 {l:'Pain moves to the right lower quadrant and keeps worsening',ids:['app'],say:`Even in a known FMF patient, a shift from diffuse to right-lower-quadrant pain was the best predictor of a truly inflamed appendix. Imaging and surgical review. [[Lidar2008]]`},
 {l:'No fever; dark urine, low sodium, neuropathy',ids:['aip'],say:`Acute porphyria: severe pain with few peritoneal signs and usually no fever. Test: urinary porphobilinogen on a single spot sample. [[Anderson2005]]`},
 {l:'Hives-like rash after cold',ids:['caps'],say:`Urticarial rash with cold or stress triggers points to CAPS. Test: <i>NLRP3</i> sequencing, including somatic mosaicism. [[Gattorno2019,KuemmerleDeschner2017]]`},
 {l:'Chronic diarrhoea, weight loss, poor growth',ids:['ibd'],say:`Persistent bowel symptoms point to IBD. Tests: faecal calprotectin, then endoscopy with biopsy. [[Maaser2019]]`},
 {l:'Daily spikes, salmon rash, very high ferritin',ids:['aosd'],say:`Still's disease (AOSD/sJIA). In FMF attacks ferritin and platelets do not rise, which helps separate the two. [[Yamaguchi1992,Korkmaz2002]]`},
 {l:'Mouth and genital ulcers, eye inflammation',ids:['beh'],say:`Behçet disease: ICBD score of 4 or more classifies it; a pathergy test and an eye exam help. [[ICBD2014]]`}
];
inits.ddx=()=>{
  const svg=$('#ddSvg'),rg=$('#ddT');let sel='fmf',clue=-1;
  const KC={f:'var(--terra)',u:'var(--warn)',a:'var(--muted)',c:'var(--sea)',p:'var(--bad)',d:'var(--terra)'};
  function draw(t){const day=t*60;let s='';const hl=clue>=0?DD_CLUE[clue].ids:null;const act=[];
    /* narrow: the disease name sits above its own track, so the 60-day window gets the full width */
    const N=vb(svg,'720 420','400 604');
    const L=N?{W:400,X0:10,X1:386,RH:52,Y0:46,bo:20,bh:22,bx:342,bw:52}
             :{W:720,X0:178,X1:648,RH:35,Y0:28,bo:6,bh:22,bx:656,bw:56};
    const X0=L.X0,X1=L.X1,RH=L.RH,Y0=L.Y0,xd=d=>X0+d/60*(X1-X0);
    const yEnd=Y0+RH*10;
    if(N){s+=`<text x="4" y="13" class="t-xs">60-DAY WINDOW · LENGTHS CITED, SPACING SCHEMATIC</text>`;
      for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="33" class="t-xs t-mid">${d}</text>`}
    else{for(let d=0;d<=60;d+=10)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${Y0-4}" y2="${yEnd}" class="grid"/>`;
      s+=`<text x="${X0}" y="14" class="t-xs">TYPICAL EPISODE PATTERN · 60-DAY WINDOW · LENGTHS CITED, SPACING SCHEMATIC</text><text x="684" y="14" class="t-xs t-mid">source</text>`}
    for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="${yEnd+16}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${X1}" y="${yEnd+32}" class="t-xs t-end">days</text>`;
    DD_DZ.forEach((D,i)=>{const y0=Y0+i*RH,bt=y0+L.bo,bh=L.bh,dim=hl&&!hl.includes(D.id);let g='';
      if(D.id==='fmf')g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:var(--terra-soft);opacity:.75"/>`;
      if(hl&&!dim)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:var(--sea-soft)"/>`;
      if(N)g+=`<text x="8" y="${y0+14}" class="t-lbl">${D.n}</text><text x="336" y="${y0+14}" class="t-xs t-end">${D.sub}</text>`;
      else g+=`<text x="10" y="${y0+16}" class="t-lbl">${D.n}</text><text x="10" y="${y0+29}" class="t-xs">${D.sub}</text>`;
      if(N)for(let d=0;d<=60;d+=10)g+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${bt-3}" y2="${bt+bh+3}" class="grid"/>`;
      g+=`<line x1="${X0}" x2="${X1}" y1="${bt+bh}" y2="${bt+bh}" class="axis"/>`;
      let on=false;
      D.ep.forEach(([st,du,k])=>{const c=KC[k],xa=xd(st),xb=xd(Math.min(60,st+du)),lit=clamp((day-st)/du),xl=lerp(xa,xb,lit),live=day>=st&&day<=st+du;if(live)on=true;
        if(k==='f'||k==='u'||k==='a'){const dash=k==='a'?'stroke-dasharray:3 2;':'';
          g+=`<rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(2,xb-xa))}" height="${bh}" rx="4" style="fill:${c};opacity:.13"/><rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(2,xb-xa))}" height="${bh}" rx="4" style="fill:none;stroke:${c};stroke-width:1;opacity:.5;${dash}"/>`;
          if(lit>0)g+=`<rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(1.5,xl-xa))}" height="${bh}" rx="4" style="fill:${c};opacity:${k==='a'?.55:.9}"/>`;
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(Math.max(2,xb-xa)+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
        if(k==='c'){const wave=x=>bt+bh-(8+5*Math.sin(x/9)+3*Math.sin(x/23));let gp='',lp='';
          for(let x=xa;x<=xb;x+=4){gp+=(gp?'L':'M')+f1(x)+' '+f1(wave(x));if(x<=xd(day))lp+=(lp?'L':'M')+f1(x)+' '+f1(wave(x))}
          g+=`<path d="${gp} L${f1(xb)} ${bt+bh} L${f1(xa)} ${bt+bh}Z" style="fill:${c};opacity:.13"/>`;
          if(lp){const xe=Math.min(xb,xd(day));g+=`<path d="${lp} L${f1(xe)} ${bt+bh} L${f1(xa)} ${bt+bh}Z" style="fill:${c};opacity:.75"/>`}}
        if(k==='p'){const yb=bt+bh,xp=Math.min(xb,xd(day)),hp=bh*clamp((xp-xa)/(xb-xa));
          g+=`<path d="M${f1(xa)} ${yb} L${f1(xb)} ${bt} L${f1(xb)} ${yb}Z" style="fill:${c};opacity:.13"/>`;
          if(day>st)g+=`<path d="M${f1(xa)} ${yb} L${f1(xp)} ${f1(yb-hp)} L${f1(xp)} ${yb}Z" style="fill:${c};opacity:.85"/>`;
          g+=`<text x="${f1(xb+5)}" y="${bt+15}" class="t-xs" style="fill:${day>=st+du?'var(--bad)':'var(--muted)'};font-weight:${day>=st+du?700:500}">→ surgery</text>`}
        if(k==='d'){const yb=bt+bh;g+=`<rect x="${f1(xa)}" y="${yb-6}" width="${f1(xb-xa)}" height="6" style="fill:${c};opacity:.13"/>`;
          for(let q=0;q<du;q++){const xs=xd(st+q+.35),ok=day>=st+q+.35;g+=`<path d="M${f1(xs-3)} ${yb} L${f1(xs)} ${bt+1} L${f1(xs+3)} ${yb}Z" style="fill:${c};opacity:${ok?.9:.15}"/>`}
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(xb-xa+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
      });
      if(D.id==='pfapa'){const a=xd(4+4.8),b=xd(32);g+=`<line x1="${f1(a+3)}" x2="${f1(b-3)}" y1="${bt+bh/2}" y2="${bt+bh/2}" style="stroke:var(--muted);stroke-dasharray:2 3"/><text x="${f1((xd(4)+xd(32))/2+20)}" y="${bt+bh/2-4}" class="t-xs t-mid">~28 d</text>`}
      if(on)act.push(D.n);
      const cited=D.src==='cited';
      g+=`<rect x="${L.bx}" y="${y0+(N?2:9)}" width="${L.bw}" height="17" rx="5" style="fill:${cited?'var(--good-soft)':'var(--warn-soft)'}"/><text x="${L.bx+L.bw/2}" y="${y0+(N?14:21)}" class="t-xs t-mid" style="fill:${cited?'var(--good)':'var(--warn)'};font-weight:700">${cited?'cited':'teaching'}</text>`;
      if(D.id===sel)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
      s+=`<g class="clk" data-dd="${D.id}" style="opacity:${dim?.28:1}"><rect x="0" y="${y0}" width="${L.W}" height="${RH}" style="fill:transparent"/>${g}</g>`});
    if(N){DD_DZ.forEach((D,i)=>{const bt=Y0+i*RH+L.bo;s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${bt-5}" y2="${bt+L.bh+5}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/>`});
      s+=`<path d="M${f1(xd(day)-5)} 38 L${f1(xd(day)+5)} 38 L${f1(xd(day))} 46Z" style="fill:var(--ink)"/>`}
    else s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${Y0-6}" y2="${yEnd}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/><circle cx="${f1(xd(day))}" cy="${Y0-6}" r="4" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    $('#ddRead').innerHTML=`<span>day <b>${Math.floor(day)}</b></span><span>active now <b>${act.length?act.join(', '):'none'}</b></span>`;
  }
  function note(){const D=DD_DZ.find(x=>x.id===sel);const cited=D.src==='cited';
    $('#ddNote').innerHTML=`<div class="kicker">${D.id==='fmf'?'The reference pattern':'Compared with FMF'}</div><h4>${D.full}</h4>
     <dl class="kv"><div><dt>Gene / inheritance</dt><dd>${D.gene}</dd></div><div><dt>Typical attack length</dt><dd>${D.len}</dd></div><div><dt>Key features</dt><dd>${D.feat}</dd></div><div><dt>Distinguishing test</dt><dd>${D.test}</dd></div>
     <div><dt>Rhythm in the animation</dt><dd><span class="tag ${cited?'good':'warn'}">${cited?'cited':'general teaching'}</span> ${D.pn}</dd></div></dl>`;
    $$('[data-ddp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddp===sel));
    $$('#ddTbl tr').forEach(r=>r.style.outline=r.dataset.dd===sel?'2px solid var(--ink)':'')}
  function pick(id){sel=id;note();draw(+rg.value)}
  $('#ddPick').innerHTML=DD_DZ.map(D=>`<button class="btn" data-ddp="${D.id}" aria-pressed="${D.id===sel}">${D.n}</button>`).join('');
  $('#ddPick').addEventListener('click',e=>{const b=e.target.closest('[data-ddp]');if(b)pick(b.dataset.ddp)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dd]');if(g)pick(g.dataset.dd)});
  $('#ddTbl').innerHTML=DD_DZ.map(D=>`<tr data-dd="${D.id}"${D.id==='fmf'?' class="hl"':''}><th>${D.full}</th><td>${D.gene}</td><td>${D.len}</td><td>${D.feat}</td><td>${D.test}</td></tr>`).join('');
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r){pick(r.dataset.dd);$('#ddNote').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  function clueOut(){const o=$('#ddClueOut');
    if(clue<0){o.innerHTML=`<span class="kicker">No clue selected</span><span>Choose a clue above. FMF is the reference row, shaded in every view.</span>`;return}
    const C=DD_CLUE[clue];o.innerHTML=`<span class="kicker">Points toward</span><b class="big">${C.ids.map(i=>DD_DZ.find(d=>d.id===i).full).join(' · ')}</b><span>${C.say}</span>`}
  $('#ddClues').innerHTML=DD_CLUE.map((c,i)=>`<button class="btn" data-ddc="${i}" aria-pressed="false">${c.l}</button>`).join('');
  $('#ddClues').addEventListener('click',e=>{const b=e.target.closest('[data-ddc]');if(!b)return;const i=+b.dataset.ddc;clue=clue===i?-1:i;
    $$('[data-ddc]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.ddc===clue));if(clue>=0)sel=DD_CLUE[clue].ids[0];note();clueOut();draw(+rg.value)});
  playWire(rg,$('#ddPlay'),draw,18000,'Replay','ddx');
  note();clueOut();draw(+rg.value);
};
