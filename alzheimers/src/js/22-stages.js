/* =============== 2.2 stages and symptoms =============== */
const ST_STEPS=[
 {from:0,at:.07,k:'FAST 1 · No symptoms',t:'Life as usual',
  txt:`FAST, the Functional Assessment Staging scale, rates function across the whole course of Alzheimer's in 7 stages, with stages 6 and 7 split into 11 ordered substages. Validation studies found it reliable and found that losses come in a fixed order. At stage 1 there is no functional difficulty, yet the brain changes can already be there: in a community autopsy series, 24.2% of people without dementia had pure Alzheimer's pathology. In a model built from 6 cohorts, someone with preclinical Alzheimer's at 70 spent about 10 years preclinical, 4 with MCI and 6 with dementia. [[Reisberg1988,Sclan1992,Schneider2007,Vermunt2019]]`,
  pt:`Nothing looks different from the outside. The disease can be present in the brain for years before anyone notices.`,
  hook:`FAST stages function (what a person can still do), not test scores. It covers the whole course, including late disease, where substages 6a to 7f are lost in a fixed order.`},
 {from:1/7,at:1/7+.07,k:'FAST 2 · Subjective',t:'Only the person notices',
  txt:`Stage 2 is subjective difficulty, such as finding words. Others usually see nothing. The 2024 Alzheimer's Association scheme has a comparable "transitional decline" stage: subtle decline over the last 1 to 3 years, lasting at least 6 months, with test scores still normal. A recent change in mood, anxiety or motivation alone can be enough. [[Reisberg1988,Jack2024]]`,
  pt:`The person may feel that something is slipping, like a name on the tip of the tongue, while tests still come out normal.`,
  hook:`2024 clinical stage 2 ("transitional decline") can be assigned on neurobehavioural symptoms alone.`},
 {from:2/7,at:2/7+.07,k:'FAST 3 · MCI',t:'Others start to notice',
  txt:`Decline becomes noticeable in demanding work or social settings. This is roughly where mild cognitive impairment sits: test scores drop into the impaired range while daily life stays largely independent. About 22% of Americans aged 65 and older have MCI, and only about half of them show Alzheimer's changes on PET. Conventional ranges: CDR 0.5, CDR Sum of Boxes 0.5 to 4.0, MMSE 26 to 29. [[Reisberg1988,Jack2024,AA2025Facts,OBryant2008,Perneczky2006]]`,
  pt:`Colleagues or friends start to notice slips at work or in busy company. Life at home still works.`,
  hook:`MCI is not dementia: the person is still independent in everyday life. The MMSE separates normal from "questionable" poorly (kappa 0.28 to 0.44). [[Perneczky2006]]`},
 {from:3/7,at:3/7+.07,k:'FAST 4 · Mild dementia',t:'Complex tasks get hard',
  txt:`Complex tasks such as finances and planning meals become hard. Dementia is defined by exactly this: cognitive problems that interfere with everyday tasks such as driving, cooking or cleaning. Basic self-care is still independent. Typical early symptoms are trouble remembering recent conversations, names or events, often with apathy and depression. Conventional ranges: CDR 1, CDR Sum of Boxes 4.5 to 9.0, MMSE 21 to 25. Driving is shown here as an example of a complex task; it is not a FAST item. [[Reisberg1988,AA2025Facts,Jack2024,OBryant2008,Perneczky2006]]`,
  pt:`Paying bills, planning a meal or driving become hard. Washing and dressing are still done alone.`,
  hook:`Instrumental activities (money, meals, driving) go before basic ones (dressing, bathing, toileting).`},
 {from:4/7,at:4/7+.07,k:'FAST 5 · Moderate',t:'Help choosing clothes',
  txt:`The person needs help choosing the right clothing for the day or the weather. Communication problems, confusion, poor judgment and changes in behaviour are common at this point. Conventional ranges: CDR 2, CDR Sum of Boxes 9.5 to 15.5, MMSE 11 to 20. [[Reisberg1988,AA2025Facts,OBryant2008,Perneczky2006]]`,
  pt:`The person can still put clothes on, but needs someone to help pick the right ones. Confusion and behaviour changes become more common.`},
 {from:5/7,at:5/7+.07,k:'FAST 6 · Moderately severe',t:'Help with daily care',
  txt:`Basic self-care goes in a set order: 6a dressing, 6b bathing, 6c the mechanics of toileting, 6d urinary incontinence, 6e faecal incontinence. In the 2024 scheme this is dementia with moderate functional impairment, needing help with basic activities. [[Reisberg1988,Jack2024]]`,
  pt:`Help is needed with dressing, then bathing, then using the toilet. Continence is lost late in this stage.`,
  hook:`FAST 6 order: dress, bathe, toilet, urine, faeces (6a to 6e).`},
 {from:6/7,at:.955,k:'FAST 7 · Severe',t:'Full dependence',
  txt:`Speech narrows to a few words a day (7a), then one intelligible word (7b). Walking (7c), sitting up (7d), smiling (7e) and holding up the head (7f) are then lost. Difficulty walking, speaking and swallowing is common late, and swallowing problems can lead to aspiration pneumonia, the most commonly identified immediate cause of death. Swallowing is not itself a FAST item. Conventional ranges: CDR 3, CDR Sum of Boxes 16 to 18, MMSE 0 to 10. [[Reisberg1988,AA2025Facts,OBryant2008,Perneczky2006]]`,
  pt:`The person depends on others for all care. Speech, walking and swallowing become very limited.`,
  hook:`FAST 7 order: speech (7a, 7b), walking (7c), sitting up (7d), smiling (7e), head control (7f). Walking goes before sitting up.`}
];
/* abilities: at = FAST value where it changes (6a=6.0 … 6e=6.8; 7a=7.0 … 7f=7.83) */
const ST_AB=[
 {l:'Work, social',ic:'brief',at:3,c:'3',st:'harder'},
 {l:'Bills',ic:'bill',at:4,c:'4',st:'difficult'},
 {l:'Driving',ic:'wheel',at:4,c:'4',st:'difficult'},
 {l:'Clothes choice',ic:'hanger',at:5,c:'5',st:'needs help'},
 {l:'Dressing',ic:'shirt',at:6,c:'6a',st:'needs help'},
 {l:'Bathing',ic:'bath',at:6.2,c:'6b',st:'needs help'},
 {l:'Toileting',ic:'wc',at:6.4,c:'6c',st:'needs help',at2:6.6,c2:'6d',st2:'incontinent'},
 {l:'Speech',ic:'talk',at:7,c:'7a',st:'few words',at2:7+1/6,c2:'7b',st2:'one word'},
 {l:'Swallowing',ic:'cup',at:7.25,c:'late',st:'often hard'},
 {l:'Walking',ic:'walk',at:7+2/6,c:'7c',st:'lost'},
 {l:'Sitting up',ic:'chair',at:7.5,c:'7d',st:'lost'},
 {l:'Smiling',ic:'smile',at:7+4/6,c:'7e',st:'lost',at2:7+5/6,c2:'7f',st2:'head control lost'}
];
const ST_SPAN=[ {a:0,b:2,ph:'Preclinical',cdr:'0',sb:'0',mm:'30'},{a:2,b:3,ph:'MCI',cdr:'0.5',sb:'0.5–4.0',mm:'26–29'},{a:3,b:4,ph:'Mild',cdr:'1',sb:'4.5–9.0',mm:'21–25'},{a:4,b:6,ph:'Moderate',cdr:'2',sb:'9.5–15.5',mm:'11–20'},{a:6,b:7,ph:'Severe',cdr:'3',sb:'16–18',mm:'0–10'} ];
const ST_SD=['No difficulty','Notices own slips','Slips at work, socially','Bills, driving get hard','Help choosing clothes','Help with self-care','Full care needed'];
function stIcon(k,x,y,c,o){
  const S=`style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"`;
  const P=d=>`<path d="${d}" ${S}/>`;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o)}">`;
  switch(k){
    case 'brief':g+=P('M-12 -5h24v16h-24zM-5 -5v-4h10v4M-12 2h24');break;
    case 'bill':g+=P('M-9 -13h13l5 5v21h-18zM-5 -4h9M-5 1h9M-5 6h6');break;
    case 'wheel':g+=`<circle r="12" ${S}/><circle r="3" ${S}/>`+P('M-12 0h9M3 0h9M0 3v9');break;
    case 'hanger':g+=P('M0 -5v-3a3.5 3.5 0 1 1 3.5 -3.5M0 -5L-14 7h28z');break;
    case 'shirt':g+=P('M-5 -12l-9 5 3 6 4 -2v15h14v-15l4 2 3 -6 -9 -5q-5 4 -10 0z');break;
    case 'bath':g+=P('M-13 0h26v3q0 8 -8 8h-10q-8 0 -8 -8zM-9 0v-9q0 -4 4 -4t4 4M-7 11l-2 3M7 11l2 3');break;
    case 'wc':g+=P('M-10 -13h10v8h-10zM-12 -5h18q0 8 -8 10l1 8h-9l1 -9q-3 -3 -3 -9z');break;
    case 'talk':g+=P('M-12 -10h24v15h-11l-6 6v-6h-7z')+`<circle cx="-5" cy="-2.5" r="1.4" style="fill:${c}"/><circle cx="0" cy="-2.5" r="1.4" style="fill:${c}"/><circle cx="5" cy="-2.5" r="1.4" style="fill:${c}"/>`;break;
    case 'cup':g+=P('M-9 -4h16v8q0 7 -8 7t-8 -7zM7 -1h3q3 0 3 3t-3 3h-3M-4 -8q-2 -3 0 -5M1 -8q-2 -3 0 -5');break;
    case 'walk':g+=`<circle cx="2" cy="-11" r="3" ${S}/>`+P('M1 -6l-3 9 5 5 1 6M-2 3l-5 9M0 -4l6 4M-1 -4l-6 3');break;
    case 'chair':g+=P('M-7 -13v25M-7 1h14v11M-7 -3h14');break;
    case 'smile':g+=`<circle r="12" ${S}/><circle cx="-4" cy="-3" r="1.5" style="fill:${c}"/><circle cx="4" cy="-3" r="1.5" style="fill:${c}"/>`+P('M-6 3q6 6 12 0');break;
  }
  return g+'</g>';
}
/* the person, in one of three poses, with a carer who appears at FAST 6 */
function stPerson(x,g,F){
  const oS=1-ramp(F,7.26,7.32),oC=ramp(F,7.32,7.38)*(1-ramp(F,7.44,7.5)),oL=ramp(F,7.5,7.56),oK=ramp(F,5.6,6);
  const st='fill:none;stroke:var(--sage);stroke-width:6;stroke-linecap:round;stroke-linejoin:round';
  const hd='fill:var(--sage-soft);stroke:var(--sage);stroke-width:3';
  let s=`<path d="M${x-74} ${g}H${x+92}" class="axis"/>`;
  if(oS>0){const reach=oK;
    s+=`<g style="opacity:${f1(oS)}"><circle cx="${x}" cy="${g-122}" r="12" style="${hd}"/><path d="M${x} ${g-107}V${g-62}M${x} ${g-62}L${x-11} ${g}M${x} ${g-62}L${x+11} ${g}M${x} ${g-98}L${x-16} ${g-70}M${x} ${g-98}L${f1(x+16+10*reach)} ${f1(g-70-16*reach)}" style="${st}"/>`;
    /* thought bubble: memories fade one by one */
    const bx=x+36,by=g-170,bo=1-ramp(F,6.6,7);
    if(bo>0){s+=`<g style="opacity:${f1(bo)}"><circle cx="${x+14}" cy="${g-142}" r="3" style="fill:var(--panel);stroke:var(--violet);stroke-width:1.5"/><circle cx="${x+22}" cy="${g-151}" r="4.5" style="fill:var(--panel);stroke:var(--violet);stroke-width:1.5"/><circle cx="${bx}" cy="${by}" r="22" style="fill:var(--panel);stroke:var(--violet);stroke-width:1.5"/>`;
      for(let i=0;i<5;i++){const a=i/5*Math.PI*2-1.2,o=1-ramp(F,2+i,3+i);s+=`<circle cx="${f1(bx+Math.cos(a)*11)}" cy="${f1(by+Math.sin(a)*11)}" r="4" style="fill:var(--violet);opacity:${f1(.15+.85*o)}"/>`}
      s+='</g>'}
    s+='</g>'}
  if(oC>0)s+=`<g style="opacity:${f1(oC)}"><path d="M${x-20} ${g-52}h42M${x-20} ${g-52}V${g-112}M${x-18} ${g-50}V${g}M${x+20} ${g-50}V${g}" style="fill:none;stroke:var(--muted);stroke-width:4;stroke-linecap:round"/><circle cx="${x-4}" cy="${g-112}" r="12" style="${hd}"/><path d="M${x-4} ${g-98}V${g-58}H${x+22}L${x+24} ${g-6}M${x-4} ${g-90}L${x+14} ${g-68}" style="${st}"/></g>`;
  if(oL>0)s+=`<g style="opacity:${f1(oL)}"><path d="M${x-62} ${g-74}V${g}M${x+68} ${g-34}V${g}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round"/><rect x="${x-62}" y="${g-44}" width="132" height="12" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><ellipse cx="${x-44}" cy="${g-50}" rx="14" ry="6" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/><circle cx="${x-42}" cy="${g-62}" r="11" style="${hd}"/><rect x="${x-30}" y="${g-62}" width="94" height="18" rx="6" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.5"/></g>`;
  if(oK>0){const cx=x+58,lean=oL>0?12*oL:0;
    s+=`<g style="opacity:${f1(oK)}"><circle cx="${f1(cx+lean*.3)}" cy="${g-126}" r="12" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:3"/><path d="M${cx} ${g-111}V${g-62}M${cx} ${g-62}L${cx-10} ${g}M${cx} ${g-62}L${cx+10} ${g}M${cx} ${g-102}L${f1(cx-24-lean)} ${f1(g-84+lean*1.6)}" style="fill:none;stroke:var(--sky);stroke-width:6;stroke-linecap:round"/><text x="${cx+16}" y="${g-140}" class="t-xs" style="fill:var(--sky)">carer</text></g>`}
  const lab=F<4?'Lives independently':F<5?'Help with complex tasks':F<7.33?'Help with daily care':'Needs full care';
  s+=`<text x="${x+8}" y="${g+18}" class="t-sm t-mid">${lab}</text>`;
  return s;
}
inits.stages=()=>{
  /* ---------- 1. life course ---------- */
  const svg=$('#stSvg'),rg=$('#stT');
  function draw(t){
    const N=vb(svg,'720 440','400 716');
    const L=N?{lx:8,sx0:58,sx1:392,px:110,pg:360,tx0:12,ty0:392,tw:120,cols:3,txtCls:'t-xs',dur:['~10 yrs','~4 yrs','~6 yrs']}
             :{lx:16,sx0:84,sx1:708,px:88,pg:404,tx0:196,ty0:176,tw:122,cols:4,txtCls:'t-sm',dur:['about 10 years','about 4 years','about 6 years']};
    const F=Math.min(7.999,1+t*7),stg=Math.floor(F),sw=(L.sx1-L.sx0)/7,X=i=>L.sx0+i*sw;
    const sub=stg===6?'abcde'[Math.floor((F-6)*5)]:stg===7?'abcdef'[Math.floor((F-7)*6)]:'';
    const span=ST_SPAN.find(p=>stg-1>=p.a&&stg-1<p.b);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* durations (Vermunt 2019) */
    [ [0,2],[2,3],[3,7] ].forEach(([a,b],i)=>{s+=`<path d="M${f1(X(a)+3)} 24v-5H${f1(X(b)-3)}v5" style="fill:none;stroke:var(--muted);stroke-width:1"/><text x="${f1((X(a)+X(b))/2)}" y="13" class="t-xs t-mid">${L.dur[i]}</text>`});
    /* clinical phase labels */
    ST_SPAN.forEach(p=>{const on=p===span;s+=`<text x="${f1((X(p.a)+X(p.b))/2)}" y="38" class="${L.txtCls} t-mid" style="fill:${on?'var(--rose)':'var(--muted)'};font-weight:${on?700:500}">${p.ph}</text>`});
    /* strips */
    const rows=[ {n:'FAST',y:44,h:22},{n:'CDR',y:72,h:18,k:'cdr'},{n:'CDR-SB',y:96,h:18,k:'sb'},{n:'MMSE',y:120,h:18,k:'mm'} ];
    rows.forEach(r=>{s+=`<text x="${L.lx}" y="${r.y+r.h/2+4}" class="t-xs" style="font-weight:600">${r.n}</text>`;
      if(!r.k){for(let i=0;i<7;i++){const on=i===stg-1,past=i<stg-1;
          s+=`<rect x="${f1(X(i)+1)}" y="${r.y}" width="${f1(sw-2)}" height="${r.h}" rx="5" style="fill:${on?'var(--rose-soft)':past?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--rose)':'var(--line)'};stroke-width:${on?2:1}"/><text x="${f1(X(i)+sw/2)}" y="${r.y+16}" class="t-lbl t-mid" style="fill:${on?'var(--rose)':'var(--ink)'}">${i+1}</text>`}}
      else ST_SPAN.forEach(p=>{const on=p===span;
          s+=`<rect x="${f1(X(p.a)+1)}" y="${r.y}" width="${f1(X(p.b)-X(p.a)-2)}" height="${r.h}" rx="5" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':'var(--line)'};stroke-width:${on?1.6:1}"/><text x="${f1((X(p.a)+X(p.b))/2)}" y="${r.y+13}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${p[r.k]}</text>`})});
    /* playhead and tag */
    const px=L.sx0+t*(L.sx1-L.sx0);
    s+=`<path d="M${f1(px)} 40V146" style="stroke:var(--ink);stroke-width:2;opacity:.35"/>`;
    const tag=`FAST ${stg}${sub} · CDR ${span.cdr} · MMSE ${span.mm}`,tw=tag.length*5.9+16,tx=clamp(px,L.sx0+tw/2-50,L.sx1-tw/2);
    s+=`<rect x="${f1(tx-tw/2)}" y="146" width="${f1(tw)}" height="18" rx="9" style="fill:var(--ink)"/><text x="${f1(tx)}" y="158.5" class="t-xs t-mid" style="fill:var(--bg);font-weight:600">${tag}</text>`;
    /* the person */
    s+=stPerson(L.px,L.pg,F);
    if(N){s+=`<text x="232" y="214" class="t-big">FAST ${stg}${sub}</text><text x="232" y="236" class="t-sm" style="fill:var(--ink)">${stg===6?'Moderately severe':span.ph}</text><text x="232" y="256" class="t-sm">${ST_SD[stg-1]}</text>`}
    /* ability tiles */
    ST_AB.forEach((a,i)=>{const cx=L.tx0+(i%L.cols)*(L.tw+8),cy=L.ty0+Math.floor(i/L.cols)*80;
      const lv=F<a.at?0:(a.at2&&F>=a.at2?2:1),fade=ramp(F,a.at-.15,a.at);
      const lost=lv===2||/lost|few|one/.test(a.st)&&lv>0;
      const col=lv===0?'var(--sage)':lost?'var(--rose)':'var(--warn)';
      const fill=lv===0?'var(--panel)':lost?'var(--rose-soft)':'var(--warn-soft)';
      const status=lv===0?'kept':lv===1?`${a.c} · ${a.st}`:`${a.c2} · ${a.st2}`;
      s+=`<rect x="${cx}" y="${cy}" width="${L.tw}" height="72" rx="10" style="fill:${fill};stroke:${lv?col:'var(--line)'};stroke-width:${lv?1.6:1}"/>`;
      s+=stIcon(a.ic,cx+L.tw/2,cy+20,col,1-.55*fade-.2*(lv===2));
      if(lost&&lv>0)s+=`<path d="M${cx+L.tw/2-15} ${cy+33}L${cx+L.tw/2+15} ${cy+7}" style="stroke:var(--rose);stroke-width:2;stroke-linecap:round;opacity:.8"/>`;
      s+=`<text x="${cx+L.tw/2}" y="${cy+50}" class="t-lbl t-mid" style="font-size:12.5px">${a.l}</text><text x="${cx+L.tw/2}" y="${cy+64}" class="t-xs t-mid" style="fill:${lv?col:'var(--muted)'};font-weight:${lv?700:500}">${status}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(ST_STEPS,t);setSt(p);
    const kept=ST_AB.filter(a=>F<a.at).map(a=>a.l.toLowerCase()),gone=ST_AB.filter(a=>F>=a.at).map(a=>a.l.toLowerCase());
    $('#stNote').innerHTML=noteHTML(ST_STEPS[p])+`<p class="readout"><span>Now <b>FAST ${stg}${sub}</b></span><span>CDR <b>${span.cdr}</b></span><span>CDR-SB <b>${span.sb}</b></span><span>MMSE <b>${span.mm}</b></span></p><p class="readout"><span>Kept: <b>${kept.length?kept.join(', '):'none'}</b></span><span>Affected: <b>${gone.length?gone.join(', '):'none yet'}</b></span></p>`;
  }
  const stop=playWire(rg,$('#stPlay'),draw,22000,'Replay','stages');
  const setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);

  /* ---------- 2. MCI cohort ---------- */
  const cs=$('#stCoh'),cr=$('#stCohT');
  const COH=[ {n:'Specialist clinics',sn:'Clinics',r:.096,seed:7,col:'var(--rose)'},{n:'Community studies',sn:'Community',r:.049,seed:19,col:'var(--amber)'} ];
  COH.forEach(c=>{const R=rng(c.seed),idx=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(R()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}c.rank=[];idx.forEach((v,k)=>c.rank[v]=k)});
  const cum=(r,y)=>1-Math.pow(1-r,y);
  const COH_STEPS=[
   {from:0,k:'Start',t:'Two groups of 100 with MCI',txt:`In a meta-analysis of 41 cohorts, about 9.6% of people with MCI a year progressed to dementia in specialist clinics, and 4.9% a year in community studies. To Alzheimer's dementia specifically, the rates were 8.1% and 6.8%. [[Mitchell2009]]`,pt:`An MCI diagnosis raises the chance of dementia. It does not mean dementia is certain.`},
   {from:.3,k:'Two years on',t:'A check against a guideline figure',txt:`The AAN 2018 guideline, since marked retired, reported cumulative dementia incidence of 14.9% over 2 years in people with MCI older than 65. That sits between the two settings drawn here. [[Petersen2018]]`,pt:`After two years, most people in both groups still do not have dementia.`},
   {from:.62,k:'Five years on',t:'Most do not progress',txt:`In the meta-analysis, most people with MCI had not progressed to dementia even after 10 years. MCI has many causes: only about half of people with MCI have Alzheimer's changes on PET. [[Mitchell2009,AA2025Facts]]`,pt:`Many people with MCI stay stable for years. A diagnosis of MCI is a reason for follow-up, not a sentence.`,hook:`MCI to dementia: about 10% a year in clinics, about 5% a year in the community. Clinic patients progress faster, and most people with MCI had not converted even after 10 years.`}
  ];
  function glyph(x,y,f,col){let g='';
    if(f<1)g+=`<g style="opacity:${f1(1-f)}"><circle cx="${f1(x)}" cy="${f1(y-4.5)}" r="3" style="fill:none;stroke:var(--sage);stroke-width:1.3"/><path d="M${f1(x-5)} ${f1(y+7)}q0 -7 5 -7q5 0 5 7z" style="fill:none;stroke:var(--sage);stroke-width:1.3"/></g>`;
    if(f>0)g+=`<g style="opacity:${f1(f)}"><circle cx="${f1(x)}" cy="${f1(y-4.5)}" r="3.4" style="fill:${col}"/><path d="M${f1(x-5.5)} ${f1(y+7.5)}q0 -8 5.5 -8q5.5 0 5.5 8z" style="fill:${col}"/></g>`;
    return g}
  function drawCoh(t){
    const N=vb(cs,'720 300','400 520');
    const yrs=t*5;
    const L=N?{g:[ [22,64],[212,64] ],cx0:56,cx1:380,cy0:300,cy1:470,tit:['Clinics, 9.6%/yr','Community, 4.9%/yr']}
             :{g:[ [24,64],[224,64] ],cx0:470,cx1:700,cy0:56,cy1:226,tit:['Clinics, 9.6% a year','Community, 4.9% a year']};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const counts=COH.map((c,ci)=>{const ex=100*cum(c.r,yrs),[gx,gy]=L.g[ci];
      s+=`<text x="${gx}" y="${gy-22}" class="t-sm" style="fill:var(--ink);font-weight:600">${L.tit[ci]}</text>`;
      for(let i=0;i<100;i++){const x=gx+8+(i%10)*17,y=gy+(Math.floor(i/10))*17;s+=glyph(x,y,clamp(ex-c.rank[i]),c.col)}
      const n=Math.round(ex);
      s+=`<text x="${gx}" y="${gy+184}" class="t-lbl">${n} of 100 progressed</text><text x="${gx}" y="${gy+200}" class="t-xs">${100-n} without dementia</text>`;
      return n});
    /* cumulative chart */
    const xs=y=>L.cx0+y/5*(L.cx1-L.cx0),ys=p=>L.cy1-p/.5*(L.cy1-L.cy0);
    [0,.1,.2,.3,.4,.5].forEach(p=>{s+=`<path d="M${L.cx0} ${f1(ys(p))}H${L.cx1}" class="grid"/><text x="${L.cx0-6}" y="${f1(ys(p)+3)}" class="t-xs t-end">${p*100}%</text>`});
    for(let y=0;y<=5;y++)s+=`<text x="${f1(xs(y))}" y="${L.cy1+16}" class="t-xs t-mid">${y}</text>`;
    s+=`<text x="${f1((L.cx0+L.cx1)/2)}" y="${L.cy1+32}" class="t-xs t-mid">years after MCI diagnosis</text><path d="M${L.cx0} ${L.cy0}V${L.cy1}H${L.cx1}" class="axis" style="fill:none"/>`;
    COH.forEach((c,ci)=>{let d='';for(let i=0;i<=60;i++){const y=yrs*i/60;d+=(i?'L':'M')+f1(xs(y))+' '+f1(ys(cum(c.r,y)))}
      s+=`<path d="${d}" style="fill:none;stroke:${c.col};stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(xs(yrs))}" cy="${f1(ys(cum(c.r,yrs)))}" r="4" style="fill:${c.col}"/>`;
      if(yrs>.4)s+=`<text x="${f1(xs(yrs)+(yrs>4?-8:8))}" y="${f1(ys(cum(c.r,yrs))+(ci?14:-6))}" class="t-xs ${yrs>4?'t-end':''}" style="fill:${c.col};font-weight:700">${c.sn} ${Math.round(100*cum(c.r,yrs))}%</text>`});
    const po=ramp(yrs,1.8,2.2);
    if(po>0){const x=xs(2),y=ys(.149);s+=`<g style="opacity:${f1(po)}"><rect x="${f1(x-4)}" y="${f1(y-4)}" width="8" height="8" style="fill:var(--sky)" transform="rotate(45 ${f1(x)} ${f1(y)})"/><path d="M${f1(x)} ${f1(y+6)}L${f1(x)} ${f1(ys(.03)-10)}" style="stroke:var(--sky);stroke-width:1;stroke-dasharray:2 2"/><text x="${L.cx1}" y="${f1(ys(.03))}" class="t-xs t-end" style="fill:var(--sky);font-weight:700">◆ AAN 2018: 14.9% at 2 years</text></g>`}
    s+=`<path d="M${f1(xs(yrs))} ${L.cy0}V${L.cy1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
    cs.innerHTML=s;
    const p=phaseOf(COH_STEPS,t),P=COH_STEPS[p];
    $('#stCohNote').innerHTML=noteHTML({...P,k:`${P.k} · year ${f1(yrs)}`,txt:`<b>Clinics: ${counts[0]} of 100 progressed. Community: ${counts[1]} of 100.</b> `+P.txt});
    cr.setAttribute('aria-valuetext',`Year ${f1(yrs)}: clinics ${counts[0]}, community ${counts[1]} of 100 progressed`);
  }
  playWire(cr,$('#stCohPlay'),drawCoh,12000,'Replay','stages');

  /* ---------- 3. atypical variants ---------- */
  const brain=(hl,cx,cy,rx,ry,lab)=>`<svg viewBox="0 0 150 112" role="img" aria-label="Side view of the brain with the ${lab} highlighted"><path d="M20 62C14 34 40 12 76 12c34 0 58 18 58 46 0 16-10 26-24 28-6 10-20 12-30 8-8 6-22 6-30 0C34 96 24 82 20 62z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><path d="M90 86c8 4 22 6 30-2" style="fill:none;stroke:var(--cell-line);stroke-width:1.5"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:var(--${hl});opacity:.55"/><text x="6" y="108" class="t-xs" style="font-size:15px">front</text><text x="146" y="108" class="t-xs t-end" style="font-size:15px">back</text></svg>`;
  $('#stVar').innerHTML=`
   <div class="card vcard"><div class="vhead">${brain('violet',80,72,20,10,'medial temporal lobe')}<h4>Typical: memory first</h4></div><p>A slowly progressive amnestic disorder reflecting early tangles in medial temporal structures, which spreads into a multi-domain dementia. [[GraffRadford2021]]</p></div>
   <div class="card vcard"><div class="vhead">${brain('rose',118,50,22,20,'back of the brain')}<h4>Posterior cortical atrophy</h4></div><p>Trouble seeing space and objects, seeing only one thing at a time, and apraxias. Alzheimer's pathology causes 75 to 100% of cases, and 82% of 302 patients had young onset. [[GraffRadford2021]]</p></div>
   <div class="card vcard"><div class="vhead">${brain('amber',92,56,18,14,'left temporoparietal region')}<h4>Logopenic aphasia</h4></div><p>Word-finding pauses, trouble repeating sentences, sound errors. Amyloid PET was positive in 86% of 443 cases, against 20% of nonfluent and 16% of semantic variant cases. [[GraffRadford2021,GornoTempini2011]]</p></div>
   <div class="card vcard"><div class="vhead">${brain('sky',40,46,22,18,'frontal lobe')}<h4>Frontal variants</h4></div><p>A dysexecutive form (working memory, switching, inhibition), mostly young onset, and a behavioural form. [[GraffRadford2021]]</p></div>`;
  const ss=$('#stShare'),sr=$('#stShareT');
  const SH_STEPS=[
   {from:0,k:'Who starts atypically',t:'1 in 3 versus about 1 in 17',txt:`Atypical, non-memory presentations make up about one third of young-onset Alzheimer's but about 6% of late-onset Alzheimer's. Early-onset Alzheimer's is about 5% of all Alzheimer's, most cases are not familial, and the course is on average more aggressive. [[GraffRadford2021,Mendez2017]]`,pt:`When Alzheimer's starts before 65, it often begins with vision, language or planning problems rather than memory.`},
   {from:.62,k:'Why it matters',t:'Atypical starts get missed',txt:`In an autopsy-confirmed young-onset cohort, 53% of atypical cases had been misdiagnosed in life, against 4% of typical cases. Diagnosis of early-onset Alzheimer's was delayed by about 1.6 years on average compared with older patients. [[GraffRadford2021,Mendez2017]]`,pt:`An unusual first symptom in a younger person can delay the right diagnosis.`,hook:`Young onset → think atypical: posterior cortical atrophy (vision), logopenic aphasia (language), dysexecutive (planning). Logopenic PPA is the PPA variant most often due to Alzheimer's.`}
  ];
  function drawShare(t){
    const N=vb(ss,'720 240','400 420');
    const L=N?{w:[ [24,52],[216,52] ],cell:16,bx:24,by:262,bw:250}:{w:[ [28,52],[238,52] ],cell:16,bx:452,by:70,bw:200};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const fill=ramp(t,0,.55);
    [ ['Young onset (under 65)',33],['Late onset',6] ].forEach(([lab,n],wi)=>{const [wx,wy]=L.w[wi];
      s+=`<text x="${wx}" y="${wy-14}" class="t-sm" style="fill:var(--ink);font-weight:600">${lab}</text>`;
      for(let i=0;i<100;i++){const x=wx+(i%10)*L.cell,y=wy+Math.floor(i/10)*L.cell,on=i<n&&i<fill*n+.5;
        s+=on?`<rect x="${x+1}" y="${y+1}" width="${L.cell-3}" height="${L.cell-3}" rx="2" style="fill:var(--rose)"/>`:`<rect x="${x+1.5}" y="${y+1.5}" width="${L.cell-4}" height="${L.cell-4}" rx="2" style="fill:none;stroke:var(--sage);stroke-width:1.2;opacity:.6"/>`}
      s+=`<text x="${wx}" y="${wy+176}" class="t-lbl" style="fill:var(--rose)">${Math.round(fill*n)} atypical</text>`});
    const mo=ramp(t,.6,1);
    if(mo>0){s+=`<g style="opacity:${f1(Math.min(1,mo*2))}"><text x="${L.bx}" y="${L.by}" class="t-sm" style="fill:var(--ink);font-weight:600">Misdiagnosed in life</text><text x="${L.bx}" y="${L.by+14}" class="t-xs">young-onset autopsy cohort</text>`;
      [ ['atypical',53,'var(--rose)'],['typical',4,'var(--sage)'] ].forEach(([l,v,c],i)=>{const y=L.by+32+i*40,w=L.bw*v/100*ease(mo);
        s+=`<text x="${L.bx}" y="${y}" class="t-xs">${l}</text><rect x="${L.bx}" y="${y+5}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y+5}" width="${f1(Math.max(2,w))}" height="14" rx="4" style="fill:${c}"/><text x="${f1(L.bx+Math.max(2,w)+6)}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${Math.round(v*ease(mo))}%</text>`});
      s+='</g>'}
    ss.innerHTML=s;
    $('#stShareNote').innerHTML=noteHTML(SH_STEPS[phaseOf(SH_STEPS,t)]);
  }
  playWire(sr,$('#stSharePlay'),drawShare,8000,'Replay','stages');

  /* ---------- 4. neuropsychiatric symptoms ---------- */
  const ns=$('#stNps'),nr=$('#stNpsT');let study='z';
  const NPS={z:[ ['Apathy',49],['Depression',42],['Aggression',40],['Anxiety',39],['Sleep disorder',39],['Irritability',36],['Appetite change',34],['Motor behaviour',32],['Delusions',31],['Disinhibition',17],['Hallucinations',16],['Euphoria',7] ],
             l:[ ['Any symptom, past month',75],['Clinically significant',62],['Apathy',36],['Depression',32],['Agitation, aggression',30],['MCI: any symptom',43,1],['MCI: depression',20,1] ]};
  function drawNps(t){
    const D=NPS[study],n=D.length;
    const N=vb(ns,`720 ${study==='z'?390:260}`,`400 ${study==='z'?490:310}`);
    const L=N?{lx:16,bx:16,bw:300,y0:34,rh:36}:{lx:206,bx:216,bw:440,y0:40,rh:27};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const sc=v=>L.bw*v/80,ybot=L.y0+n*L.rh;
    [0,25,50,75].forEach(v=>{s+=`<path d="M${f1(L.bx+sc(v))} ${L.y0-8}V${ybot}" class="grid"/><text x="${f1(L.bx+sc(v))}" y="${ybot+14}" class="t-xs t-mid">${v}%</text>`});
    D.forEach(([lab,v,mci],i)=>{const y=L.y0+i*L.rh,g=ease(ramp(t,i*.5/n,i*.5/n+.5)),col=mci?'var(--sky)':'var(--rose)';
      const by=N?y+8:y,bh=N?13:16;
      s+=N?`<text x="${L.lx}" y="${y+4}" class="t-sm" style="fill:var(--ink)">${lab}</text>`:`<text x="${L.lx}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink)">${lab}</text>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(1,sc(v)*g))}" height="${bh}" rx="4" style="fill:${col}"/>`;
      if(g>0)s+=`<text x="${f1(L.bx+sc(v)*g+6)}" y="${by+bh-3}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(g)}">${Math.round(v*g)}%</text>`});
    ns.innerHTML=s;
    $('#stNpsNote').innerHTML=study==='z'?noteHTML({k:'Meta-analysis · 48 studies',t:'Apathy leads',txt:`Pooled prevalence in Alzheimer's on the Neuropsychiatric Inventory: apathy 49%, depression 42%, aggression 40%, anxiety and sleep disorder 39% each, down to euphoria at 7%. Heterogeneity between studies was significant. [[Zhao2016]]`,pt:`Changes in mood and behaviour are part of the illness itself, not a failure of the person or the family.`,hook:`Most common neuropsychiatric symptom in Alzheimer's: apathy, then depression and aggression. Hallucinations are less common (16%); recurrent well-formed visual hallucinations are a core feature of Lewy body dementia. [[Zhao2016,McKeith2017]]`})
      :noteHTML({k:'Cardiovascular Health Study',t:'Three in four, in one month',txt:`In this population study, 75% of people with dementia had a neuropsychiatric symptom in the past month, 62% clinically significant. The most frequent were apathy (36%), depression (32%) and agitation or aggression (30%). Among people with MCI, 43% had symptoms, most often depression (20%). [[Lyketsos2002]] For care and drug cautions, see <a href="#bpsd" data-go="bpsd">Beyond memory</a>.`,pt:`Most people with dementia will have some change in mood or behaviour. Even people with MCI often do.`});
    $('#stNpsCap').textContent=study==='z'?'Pooled prevalence in Alzheimer\'s, Neuropsychiatric Inventory (Zhao 2016). Studies varied a lot.':'Population-based, all dementia and MCI (Lyketsos 2002). Blue bars: people with MCI.';
  }
  playWire(nr,$('#stNpsPlay'),drawNps,6000,'Replay','stages');
  const setStudy=v=>{study=v;$('#stNpsZ').setAttribute('aria-pressed',v==='z');$('#stNpsL').setAttribute('aria-pressed',v==='l');drawNps(+nr.value)};
  $('#stNpsZ').onclick=()=>setStudy('z');$('#stNpsL').onclick=()=>setStudy('l');

  draw(+rg.value);drawCoh(+cr.value);drawShare(+sr.value);drawNps(+nr.value);
};
