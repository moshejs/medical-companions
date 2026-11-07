/* =============== 4.2 the differential =============== */
const DD_COLS=[['joint','Typical joints'],['xtal','Crystals'],['fever','Fever & inflammation'],['onset','Onset & course'],['img','Imaging hallmark'],['who','Who & other clues']];
const DD_NONE='<span class="dd-none">—</span>';
const DD_DZ=[
 {id:'gout',n:'Gout',
  joint:`First MTP (39.4% of SUGAR gout cases), ankle or midfoot; one or a few joints at a time [[Taylor2015,Neogi2015]]`,
  xtal:`Needles with strong negative birefringence: yellow when parallel to the slow axis [[Zhang2016SciRep]]`,
  fever:`Fever is possible: 34% of hospitalised people with crystal arthritis had fever from the synovitis [[Ho1993]]`,
  onset:`Maximal pain in under 24 h, often overnight; resolves within 14 days [[Neogi2015,Choi2015]]`,
  img:`Double contour, tophus, DECT urate, overhanging-edge erosion [[Neogi2015,Thiele2007]]`,
  who:`Men; hypertension or cardiovascular disease; raised serum urate [[Janssens2010,Richette2020]]`},
 {id:'cppd',n:'Acute CPP crystal arthritis',
  joint:`Knee and wrist; crowned dens syndrome is a sufficient criterion [[Abhishek2023,Rosenthal2016]]`,
  xtal:`Rhomboids with weak positive birefringence: blue when parallel [[Rosenthal2016,Jokic2020]]`,
  fever:`Fever is reported [[Rosenthal2016,Ho1993]]`,
  onset:`Rapid-onset inflammation is suggestive but not definitive [[Zhang2011CPPD]]`,
  img:`Chondrocalcinosis; ultrasound LR 24.2 for peripheral joints [[Zhang2011CPPD]]`,
  who:`Onset after 60 is a criteria item; osteoarthritis, hyperparathyroidism, haemochromatosis, low magnesium, Gitelman syndrome [[Abhishek2023,Zhang2011CPPD]]`},
 {id:'septic',n:'Septic arthritis',
  joint:`Knee most often when it coexists with gout; septic shoulders were bacteraemic in 90% [[Yu2003,Papanicolas2012]]`,
  xtal:`Crystals do not exclude it: infection in 1.5% of 265 crystal aspirates and 5% of crystal-positive joints [[Shah2007,Papanicolas2012]]`,
  fever:`Fever sensitivity only 57%, rigors 19%; a third of septic gout cases had no fever [[Margaretten2007,Yu2003]]`,
  onset:`Acute; the synovial white count and % neutrophils guide care before Gram stain and culture return [[Margaretten2007,Mathews2010]]`,
  img:`No imaging hallmark; aspiration is the key test [[Mathews2010]]`,
  who:`Older age, diabetes, RA, joint surgery, hip or knee prosthesis, skin infection, HIV [[Margaretten2007]]`},
 {id:'cell',n:'Cellulitis',
  joint:`Skin, not joint: deep dermis and fat, with spreading redness, warmth, tenderness and swelling [[Raff2016]]`,
  xtal:`None: not a joint disease [[Raff2016]]`,
  fever:`Cultures are rarely positive: an organism is found in 15% [[Raff2016]]`,
  onset:`No effective diagnostic test; the diagnosis is clinical [[Raff2016]]`,
  img:DD_NONE,
  who:`30.5% of 259 people admitted with "lower-limb cellulitis" had another diagnosis [[Weng2017]]`},
 {id:'reac',n:'Reactive arthritis',
  joint:`Acute oligoarthritis of larger joints [[Hannu2011]]`,
  xtal:`None: sterile inflammation [[Hannu2011]]`,
  fever:DD_NONE,
  onset:`2–4 weeks after a gut or urogenital infection [[Hannu2011]]`,
  img:DD_NONE,
  who:`0.6–27 per 100,000 a year; HLA-B27 is not a diagnostic test [[Hannu2011]]`},
 {id:'psa',n:'Psoriatic arthritis',
  joint:`Inflammatory joint disease, classified with CASPAR points [[Taylor2006CASPAR]]`,
  xtal:DD_NONE,fever:DD_NONE,onset:DD_NONE,
  img:`Juxta-articular new bone formation [[Taylor2006CASPAR]]`,
  who:`Current psoriasis 2 points; history or family history of psoriasis, dactylitis, new bone, negative RF, nail dystrophy 1 each; 3 or more classifies [[Taylor2006CASPAR]]`},
 {id:'ra',n:'Rheumatoid arthritis',
  joint:`Many small joints; first MTP or midfoot as part of a polyarticular pattern is not specific for gout [[Neogi2015]]`,
  xtal:DD_NONE,
  fever:`Acute-phase reactants are one criteria domain [[Aletaha2010]]`,
  onset:`Symptom duration is a domain (2 levels, 0–1 point) [[Aletaha2010]]`,
  img:DD_NONE,
  who:`2010 criteria: synovitis in ≥1 joint and ≥6 of 10 points from joint count (0–5), serology (0–3), acute-phase (0–1) and duration (0–1) [[Aletaha2010]]`},
 {id:'oa',n:'Osteoarthritis',
  joint:`Knee and hand DIP joints [[Zhang2010OA,Neogi2015]]`,
  xtal:`Occasional CPP crystals; non-inflammatory fluid [[Jokic2020]]`,
  fever:`Morning stiffness is limited [[Zhang2010OA]]`,
  onset:`Persistent pain with use [[Zhang2010OA]]`,
  img:`Gull-wing erosions; DECT can falsely show "urate" in advanced knee OA [[Neogi2015,Bongartz2015]]`,
  who:`Crepitus, restricted movement, bony enlargement [[Zhang2010OA]]`}
];
const DD_CLUE=[
 {l:'Needle crystals, strongly negative',ids:['gout'],col:['xtal'],say:`MSU crystals in a symptomatic joint or tophus are the sufficient criterion for gout. They do not rule out infection in the same joint. [[Neogi2015,Shah2007]]`},
 {l:'Rhomboid crystals, weakly positive',ids:['cppd','oa'],col:['xtal'],say:`CPP crystals point to CPP crystal arthritis, and they also turn up in osteoarthritic fluid. Trained observers identify CPP less reliably than MSU (kappa 0.79 vs 0.93). [[Rosenthal2016,Jokic2020,Lumbreras2005]]`},
 {l:'First MTP, one or a few joints',ids:['gout'],col:['joint'],say:`First MTP involvement in a mono- or oligoarticular episode scores 2 points in the gout criteria, and it was the commonest joint pattern in SUGAR gout cases (39.4%). As part of a polyarticular presentation it is not specific. [[Neogi2015,Taylor2015]]`},
 {l:'Knee or wrist, onset after 60',ids:['cppd','oa'],col:['joint','who'],say:`Knee and wrist involvement and age at onset over 60 are items in the 2023 CPPD criteria. Osteoarthritis also favours the knee. [[Abhishek2023,Zhang2010OA]]`},
 {l:'Maximal pain within 24 h, gone in 2 weeks',ids:['gout'],col:['onset'],say:`A typical gout episode has at least 2 of: maximal pain in under 24 h, resolution within 14 days, complete resolution between episodes. Flares often begin overnight (odds ratio 2.36 vs daytime). [[Neogi2015,Choi2015]]`},
 {l:'Fever',ids:['gout','cppd','septic'],col:['fever'],say:`Fever does not separate them. It occurred in 34% of hospitalised people with crystal arthritis, and in septic arthritis its sensitivity was only 57%. [[Ho1993,Margaretten2007]]`},
 {l:'Prosthesis, diabetes, RA or skin infection',ids:['septic'],col:['who'],say:`These raise the risk of septic arthritis. The joint needs aspirating, with a cell count, Gram stain and culture. [[Margaretten2007,Mathews2010]]`},
 {l:'Spreading skin redness, no joint swelling',ids:['cell'],col:['joint'],say:`Cellulitis sits in the deep dermis and fat. There is no diagnostic test, and 30.5% of admitted "cellulitis" in one series was something else. [[Raff2016,Weng2017]]`},
 {l:'Weeks after a gut or urinary infection',ids:['reac'],col:['onset'],say:`Reactive arthritis follows a gut or urogenital infection by 2–4 weeks and affects larger joints. [[Hannu2011]]`},
 {l:'Psoriasis, dactylitis or nail changes',ids:['psa'],col:['who'],say:`These score CASPAR points for psoriatic arthritis: current psoriasis 2, the others 1 each, with 3 or more classifying. [[Taylor2006CASPAR]]`},
 {l:'Many small joints at once',ids:['ra'],col:['joint'],say:`A polyarticular small-joint pattern points to RA. First MTP or midfoot involvement as part of it does not count toward gout. [[Aletaha2010,Neogi2015]]`},
 {l:'Hand DIP joints, gull-wing erosions',ids:['oa'],col:['joint','img'],say:`DIP joints and the gull-wing pattern are excluded from the gout erosion item because they occur in osteoarthritis. [[Neogi2015]]`}
];
/* likelihood ratios by synovial white count cut-off (Margaretten 2007) */
const DD_LRC=[{lo:0,hi:25000,lr:.32,l:'under 25,000',c:'var(--sea)'},{lo:25000,hi:50000,lr:2.9,l:'25,000 or more',c:'var(--warn)'},{lo:50000,hi:100000,lr:7.7,l:'over 50,000',c:'var(--terra)'},{lo:100000,hi:150000,lr:28,l:'over 100,000',c:'var(--bad)'}];
const ddLR=w=>w<25000?DD_LRC[0]:w<=50000?DD_LRC[1]:w<=100000?DD_LRC[2]:DD_LRC[3];
const DD_STEPS=[
 {from:0,at:.08,k:'Count under 25,000',t:'A low count lowers the odds',
  txt:`Across 14 studies (6,242 patients, 653 with septic arthritis), a synovial white count under 25,000/µL had a likelihood ratio of 0.32. That lowers the odds of infection but does not remove them. The mean count in 265 crystal-positive aspirates was 23,200/µL. [[Margaretten2007,Shah2007]]`,
  pt:'A low cell count makes infection less likely, not impossible.',
  hook:`Synovial white count under 25,000/µL: <b>LR 0.32</b> for septic arthritis. [[Margaretten2007]]`},
 {from:25000/150000,at:.25,k:'Count 25,000 or more',t:'Above 25,000 the odds rise',
  txt:`At 25,000/µL or more the LR was 2.9. Crystal arthritis lives here too: inflammatory fluid runs 2,000–50,000/µL in gout, CPPD and RA. [[Margaretten2007,Jokic2020]]`,
  pt:'This range is common in gout flares as well as in infection.'},
 {from:50000/150000,at:.45,k:'Count over 50,000',t:'Over 50,000: LR 7.7, still not proof',
  txt:`Over 50,000/µL the LR was 7.7. But fluid in acute gout can exceed 50,000/µL, mostly neutrophils, and a 50,000 cut-off missed 39% of 49 culture-proven septic joints. Neutrophils of 90% or more gave an LR of 3.4. [[Margaretten2007,Ragab2017,McGillicuddy2007]]`,
  pt:'A very high count points toward infection, but gout can do this too, and some infected joints have lower counts.',
  hook:`A 50,000/µL cut-off had a sensitivity of only <b>61%</b> for septic arthritis. [[McGillicuddy2007]]`},
 {from:100000/150000,at:.8,k:'Count over 100,000',t:'Over 100,000: LR 28',
  txt:`Over 100,000/µL the LR was 28.0. The 4 aspirates that held both crystals and bacteria had a mean count of 113,000/µL, and all 4 patients had major comorbidities. [[Margaretten2007,Shah2007]]`,
  pt:'Counts this high strongly suggest infection, even if gout crystals are also there.',
  hook:`Synovial white count over 100,000/µL: <b>LR 28</b>. [[Margaretten2007]]`},
 {from:.9,at:1,k:'Crystals + infection',t:'Crystals do not exclude infection',
  txt:`Of 265 crystal-positive aspirates, 4 (1.5%) were also infected; another series found infection in 5% of crystal-positive joints. Coexistence is very unlikely only when the Gram stain is negative, CRP is under 100 mg/L and the joint count is under 10,000/µL. [[Shah2007,Papanicolas2012]]`,
  pt:'Finding gout crystals does not prove the joint is free of infection.',
  hook:`Gout and septic arthritis can coexist: <b>1.5–5%</b> of crystal-positive joints are also infected. [[Shah2007,Papanicolas2012]]`}
];
inits.ddx=()=>{
  /* ================= the matrix ================= */
  let clue=-1,col='all';
  $('#ddHead').innerHTML=`<tr><th>Condition</th>${DD_COLS.map(([k,l])=>`<th data-ddh="${k}">${l}</th>`).join('')}</tr>`;
  $('#ddTbl').innerHTML=DD_DZ.map(D=>`<tr data-dd="${D.id}"><th>${D.n}</th>${DD_COLS.map(([k])=>`<td data-ddk="${k}">${D[k]}</td>`).join('')}</tr>`).join('');
  $('#ddCards').innerHTML=DD_DZ.map(D=>`<article class="dd-card${D.id==='gout'?' gout':''}" data-dd="${D.id}"><h4>${D.n}</h4><dl>${DD_COLS.map(([k,l])=>`<div data-ddk="${k}"><dt>${l}</dt><dd>${D[k]}</dd></div>`).join('')}</dl></article>`).join('');
  $('#ddClues').innerHTML=DD_CLUE.map((c,i)=>`<button class="btn" data-ddc="${i}" aria-pressed="false">${c.l}</button>`).join('');
  $('#ddCols').innerHTML=`<button class="btn" data-ddf="all" aria-pressed="true">All</button>`+DD_COLS.map(([k,l])=>`<button class="btn" data-ddf="${k}" aria-pressed="false">${l}</button>`).join('');
  function paint(){
    const C=clue>=0?DD_CLUE[clue]:null,ids=C?C.ids:null,cols=col!=='all'?[col]:C?C.col:[];
    $$('#m-ddx [data-dd]').forEach(r=>{const on=ids&&ids.includes(r.dataset.dd);r.classList.toggle('on',!!on);r.classList.toggle('dim',!!ids&&!on)});
    $$('#m-ddx [data-ddk]').forEach(c=>c.classList.toggle('fx',cols.includes(c.dataset.ddk)));
    $$('#m-ddx [data-ddh]').forEach(h=>h.classList.toggle('fx',cols.includes(h.dataset.ddh)));
    /* on a phone, "compare one feature" trims each card to that feature */
    $$('#ddCards [data-ddk]').forEach(c=>c.hidden=col!=='all'&&c.dataset.ddk!==col);
    $$('[data-ddc]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ddc===clue));
    $$('[data-ddf]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddf===col));
    const o=$('#ddClueOut');
    if(!C)o.innerHTML=`<span class="kicker">No clue selected</span><span>Choose a clue above. The matching rows light up, and the feature that gives them away is outlined.</span>`;
    else o.innerHTML=`<span class="kicker">Points toward</span><b class="big">${C.ids.map(i=>DD_DZ.find(d=>d.id===i).n).join(' · ')}</b><span>${C.say}</span>`}
  $('#ddClues').addEventListener('click',e=>{const b=e.target.closest('[data-ddc]');if(!b)return;const i=+b.dataset.ddc;clue=clue===i?-1:i;paint()});
  $('#ddCols').addEventListener('click',e=>{const b=e.target.closest('[data-ddf]');if(!b)return;col=b.dataset.ddf;paint()});
  paint();

  /* ================= synovial white count and the odds ================= */
  const svg=$('#ddSvg'),rg=$('#ddT');
  /* a fixed scatter of the 4 infected aspirates among 265 */
  const INF=[37,112,171,238];
  function draw(t){
    const N=vb(svg,'720 420','330 580'),w=Math.round(Math.min(1,t)*150000),B=ddLR(w);
    const L=N?{X0:14,X1:316,ty:14,by:58,bh:44,lab:118,jy:136,ly:226,lh:22,wy:350,cols:19,gap:15.5,wx:22,r:5}
             :{X0:40,X1:680,ty:14,by:46,bh:46,lab:110,jy:128,ly:212,lh:24,wy:316,cols:53,gap:12,wx:46,r:4.2};
    const xs=v=>L.X0+v/150000*(L.X1-L.X0);
    let s=`<text x="${L.X0}" y="${L.ty}" class="t-sm">${N?'SYNOVIAL WHITE CELLS /µL · LR FOR SEPSIS':'SYNOVIAL WHITE CELLS /µL AND THE LIKELIHOOD RATIO FOR SEPTIC ARTHRITIS (MARGARETTEN 2007)'}</text>`;
    DD_LRC.forEach(b=>{const on=b===B;
      s+=`<rect x="${f1(xs(b.lo))}" y="${L.by}" width="${f1(xs(b.hi)-xs(b.lo))}" height="${L.bh}" style="fill:${b.c};opacity:${on?.34:.12}"/>`;
      s+=`<text x="${f1((xs(b.lo)+xs(b.hi))/2)}" y="${L.by+L.bh/2+5}" class="t-lbl t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};${N?'font-size:11px':''}">${N?'':'LR '}${b.lr===28?'28.0':b.lr}</text>`});
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.by+L.bh}" y2="${L.by+L.bh}" class="axis"/>`;
    [0,25000,50000,100000,150000].forEach(v=>{s+=`<line x1="${f1(xs(v))}" x2="${f1(xs(v))}" y1="${L.by+L.bh}" y2="${L.by+L.bh+5}" class="axis"/><text x="${f1(xs(v))}" y="${L.lab}" class="t-xs ${v===150000?'t-end':v===0?'':'t-mid'}">${N&&v?v/1000+'k':v.toLocaleString('en')}</text>`});
    /* Jokic 2020 categories under the axis */
    const jy=L.jy;
    s+=`<path d="M${f1(xs(2000))} ${jy} v6 H${f1(xs(50000))} v-6" style="fill:none;stroke:var(--warn);stroke-width:1.5"/><text x="${f1(xs(2000))}" y="${jy+20}" class="t-xs" style="fill:var(--warn)">${N?'inflammatory: gout, CPPD, RA':'inflammatory 2,000–50,000: gout, CPPD, RA'}</text>`;
    s+=`<path d="M${f1(xs(50000)+3)} ${jy+28} v6 H${L.X1} v-6" style="fill:none;stroke:var(--bad);stroke-width:1.5"/><text x="${L.X1}" y="${jy+48}" class="t-xs t-end" style="fill:var(--bad)">septic range over 50,000 (Jokic 2020)</text>`;
    /* reference marks */
    const mk=(v,c,lbl,up)=>`<line x1="${f1(xs(v))}" x2="${f1(xs(v))}" y1="${L.by-6}" y2="${L.by+L.bh}" style="stroke:${c};stroke-width:2;stroke-dasharray:3 2"/><text x="${f1(xs(v))}" y="${L.by-9-(up?11:0)}" class="t-xs ${v>90000?'t-end':'t-mid'}" style="fill:${c};font-weight:700">${lbl}</text>`;
    s+=mk(23200,'var(--xtal)',N?'crystal mean 23,200':'mean in crystal aspirates 23,200',0);
    s+=mk(113000,'var(--bad)',N?'crystal + infection 113,000':'crystals + infection: mean 113,000',N);
    /* the moving count */
    s+=`<line x1="${f1(xs(w))}" x2="${f1(xs(w))}" y1="${L.by-2}" y2="${L.by+L.bh+2}" style="stroke:var(--ink);stroke-width:3"/><circle cx="${f1(xs(w))}" cy="${L.by+L.bh}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    /* LR on a log scale: left lowers the odds, right raises them */
    const lx=v=>L.X0+(Math.log10(v)+1)/3*(L.X1-L.X0),ly=L.ly;
    s+=`<text x="${L.X0}" y="${ly-16}" class="t-sm">LIKELIHOOD RATIO · LOG SCALE</text>`;
    s+=`<rect x="${L.X0}" y="${ly}" width="${L.X1-L.X0}" height="${L.lh}" rx="5" style="fill:var(--panel-2)"/>`;
    const a=lx(1),b=lx(B.lr);s+=`<rect x="${f1(Math.min(a,b))}" y="${ly}" width="${f1(Math.abs(b-a))}" height="${L.lh}" rx="4" style="fill:${B.c};opacity:.85"/>`;
    s+=`<line x1="${f1(a)}" x2="${f1(a)}" y1="${ly-4}" y2="${ly+L.lh+4}" style="stroke:var(--ink);stroke-width:2"/>`;
    [.1,.32,1,2.9,7.7,28,100].forEach(v=>{s+=`<text x="${f1(lx(v))}" y="${ly+L.lh+16}" class="t-xs ${v===.1?'':v===100?'t-end':'t-mid'}" style="fill:${v===B.lr?'var(--ink)':'var(--muted)'};font-weight:${v===B.lr?700:500}">${v}</text>`});
    s+=`<text x="${f1(a-6)}" y="${ly+L.lh+32}" class="t-xs t-end" style="fill:var(--sea)">← lowers the odds</text><text x="${f1(a+6)}" y="${ly+L.lh+32}" class="t-xs" style="fill:var(--bad)">raises the odds →</text>`;
    /* 265 crystal-positive aspirates, 4 infected (Shah 2007) */
    const op=ramp(t,.86,.97),wy=L.wy;
    s+=`<text x="${L.X0}" y="${wy-18}" class="t-sm" style="opacity:${f1(.35+.65*op)}">${N?'265 CRYSTAL-POSITIVE ASPIRATES':'265 CRYSTAL-POSITIVE ASPIRATES · 4 ALSO INFECTED (1.5%) · SHAH 2007'}</text>`;
    if(N)s+=`<text x="${L.X0}" y="${wy-5}" class="t-xs" style="opacity:${f1(.35+.65*op)}">4 also infected (1.5%) · Shah 2007</text>`;
    const wy0=wy+(N?8:0);
    for(let i=0;i<265;i++){const cx=L.wx+(i%L.cols)*L.gap,cy=wy0+Math.floor(i/L.cols)*L.gap,inf=INF.includes(i);
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${inf?L.r+1.2*op:L.r}" style="fill:${inf&&op>0?'var(--bad)':'var(--xtal)'};opacity:${f1(inf?.25+.75*op:.18+.4*op)}${inf&&op>.5?';stroke:var(--ink);stroke-width:1.5':''}"/>`}
    svg.innerHTML=s;
    const p=phaseOf(DD_STEPS,t);setSt(p);$('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
    $('#ddRead').innerHTML=`<span>white count <b>${w.toLocaleString('en')}/µL</b></span><span>cut-off <b>${B.l}</b></span><span>LR <b>${B.lr===28?'28.0':B.lr}</b></span>`;
  }
  const stop=playWire(rg,$('#ddPlay'),draw,15000,'Replay','ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  draw(+rg.value);
};
