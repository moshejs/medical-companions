/* =============== 2.3 measuring disability: EDSS =============== */
const ED_V=[0,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10];
const ED_FS=['Pyramidal','Cerebellar','Brainstem','Sensory','Bowel & bladder','Visual','Cerebral','Other'];
const edBand=v=>v<4?0:v<6?1:v<7?2:v<10?3:4;
const ED_BANDS=[{n:'exam findings',nn:'exam findings',c:'var(--brand)',cs:'var(--brand-soft)',r:'0–3.5'},{n:'walking range',nn:'walking',c:'var(--orange)',cs:'var(--orange-soft)',r:'4.0–5.5'},{n:'aids',nn:'aids',c:'var(--warn)',cs:'var(--warn-soft)',r:'6.0–6.5'},{n:'wheelchair, care',nn:'wheelchair, care',c:'var(--attack)',cs:'var(--attack-soft)',r:'7.0–9.5'},{n:'',nn:'',c:'var(--muted)',cs:'var(--panel-2)',r:'10'}];
const ED_LOW=['Increasing signs or disability in the functional systems; fully ambulatory','Signs in the functional','systems; fully ambulatory'];
const ED_A={0:['Normal neurological examination','Normal neurological','examination'],
 4:['Walks ≥500 m without aid or rest','Walks ≥500 m','without aid or rest'],4.5:['Walks ≥300 m without aid','Walks ≥300 m','without aid'],5:['Walks ≥200 m without aid','Walks ≥200 m','without aid'],5.5:['Walks ≥100 m without aid','Walks ≥100 m','without aid'],
 6:['Walks ≥100 m with unilateral assistance (one aid)','Walks ≥100 m with','one aid (one side)'],6.5:['Walks ≥20 m with bilateral assistance (two aids)','Walks ≥20 m with','two aids (both sides)'],
 7:['Walks ≤5 m with aid; uses a wheelchair, wheels self and transfers alone','Walks ≤5 m with aid;','wheelchair, transfers alone'],
 7.5:['A few steps only; may need help to transfer','A few steps only; may','need help to transfer'],
 8:['Essentially restricted to bed or chair; keeps effective use of the arms','Mostly in bed or chair;','effective use of the arms'],
 8.5:['Restricted to bed much of the day','In bed much','of the day'],9:['Helpless in bed, but can communicate and eat','In bed; can','communicate and eat'],
 9.5:['Totally dependent; cannot communicate effectively or eat/swallow','Totally dependent; cannot','communicate or eat'],10:['Death due to MS','Death due to MS','']};
const edAnch=v=>ED_A[v]||ED_LOW;
const ED_LIM={4:500,4.5:300,5:200,5.5:100,6:100,6.5:20};
const ED_STEPS=[
 {from:0,at:.175,k:'EDSS 0–3.5',t:'Exam findings, walking unaffected',
  txt:`The EDSS (Kurtzke, 1983) expanded the earlier 0–10 Disability Status Scale into half-steps. It rests on eight functional systems: pyramidal, cerebellar, brainstem, sensory, bowel and bladder, visual, cerebral and other. 0 is a normal examination; 1.0 to 3.5 reflect increasing signs or disability in the functional systems while the person is fully ambulatory. Agreement between raters is weakest in this range. [[Kurtzke1983,Das2019,MeyerMoock2014]]`,
  pt:`In the lower steps, the score comes from what the neurologist finds on examination. Walking is still normal.`,
  hook:`Eight functional systems: pyramidal, cerebellar, brainstem, sensory, bowel &amp; bladder, visual, cerebral, other.`},
 {from:.35,at:.425,k:'EDSS 4.0–5.5',t:'Walking distance shrinks',
  txt:`From 4.0 the scale leans on walking: at least 500 m without aid or rest at 4.0, 300 m at 4.5, 200 m at 5.0 and 100 m at 5.5. EDSS 4–6 depends heavily on walking ability. In the Lyon cohort, the median time from onset to irreversible DSS 4 was 11.4 years with relapsing onset. [[Das2019,MeyerMoock2014,Confavreux2000]]`,
  pt:`Here the score mostly depends on how far the person can walk without stopping.`,
  hook:`4.0 = 500 m, 4.5 = 300 m, 5.0 = 200 m, 5.5 = 100 m, all without an aid.`},
 {from:.55,at:.575,k:'EDSS 6.0–6.5',t:'Walking aids',
  txt:`6.0 means walking at least 100 m with unilateral assistance (one aid); 6.5, at least 20 m with bilateral assistance. EDSS 6 is a common milestone: in NO.MS, placebo-treated patients starting at EDSS 1 took 18.48 years to reach it, and in the Lyon cohort the median time to DSS 6 was 23.1 years with relapsing onset and 7.1 years with progressive onset. [[Das2019,Lublin2022,Confavreux2000]]`,
  pt:`At 6.0 a person uses a walking aid on one side; at 6.5, support on both sides.`,
  hook:`EDSS 6.0 = one aid for 100 m; 6.5 = two aids for 20 m.`},
 {from:.65,at:.675,k:'EDSS 7.0–10',t:'Wheelchair and care needs',
  txt:`At 7.0 a person walks 5 m or less even with aid and mainly uses a wheelchair, wheeling themselves and transferring alone; at 7.5, only a few steps, and help may be needed to transfer. 8.0 to 9.5 describe increasing care needs, from bed or chair with effective use of the arms to total dependence. 10 is death due to MS. Above 6, the scale mostly measures handicap. [[Das2019,MeyerMoock2014]]`,
  pt:`The top of the scale describes how much help a person needs in daily life, not walking distance.`,
  hook:`7.0 = wheelchair, transfers alone; 7.5 = help to transfer; 8.0 = bed or chair, arms still useful.`}
];
const ED_INK='stroke:var(--ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;fill:none';
function edPerson(x,g,o={}){const a=o.walk?Math.sin(o.ph||0)*.42:.2,hp=g-26,sh=g-44;
  let r=`<circle cx="${f1(x)}" cy="${f1(g-53)}" r="6.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(x)} ${f1(sh-3)}L${f1(x)} ${f1(hp)}" style="${ED_INK}"/>`;
  r+=`<path d="M${f1(x)} ${f1(hp)}L${f1(x+Math.sin(a)*26)} ${f1(g)}M${f1(x)} ${f1(hp)}L${f1(x-Math.sin(a)*26)} ${f1(g)}" style="${ED_INK}"/>`;
  const aidS='stroke:var(--warn);stroke-width:2.8;stroke-linecap:round';
  if(o.aid===1)r+=`<path d="M${f1(x)} ${f1(sh)}L${f1(x-Math.sin(a)*14)} ${f1(sh+16)}M${f1(x)} ${f1(sh)}L${f1(x+12)} ${f1(sh+14)}" style="${ED_INK}"/><path d="M${f1(x+12)} ${f1(sh+13)}L${f1(x+16)} ${f1(g)}" style="${aidS}"/>`;
  else if(o.aid===2)r+=`<path d="M${f1(x)} ${f1(sh)}L${f1(x+12)} ${f1(sh+14)}M${f1(x)} ${f1(sh)}L${f1(x-12)} ${f1(sh+14)}" style="${ED_INK}"/><path d="M${f1(x+12)} ${f1(sh+10)}L${f1(x+17)} ${f1(g)}M${f1(x-12)} ${f1(sh+10)}L${f1(x-17)} ${f1(g)}" style="${aidS}"/>`;
  else if(o.reach)r+=`<path d="M${f1(x)} ${f1(sh)}L${f1(x+16)} ${f1(sh+8)}M${f1(x)} ${f1(sh)}L${f1(x-8)} ${f1(sh+16)}" style="${ED_INK}"/>`;
  else r+=`<path d="M${f1(x)} ${f1(sh)}L${f1(x-Math.sin(a)*14)} ${f1(sh+16)}M${f1(x)} ${f1(sh)}L${f1(x+Math.sin(a)*14)} ${f1(sh+16)}" style="${ED_INK}"/>`;
  return r}
function edChair(x,g,helper,spin){const c='stroke:var(--attack);stroke-width:2.6;stroke-linecap:round;fill:none';
  let r=`<circle cx="${f1(x)}" cy="${f1(g-17)}" r="17" style="${c}"/>`;
  for(let i=0;i<3;i++){const an=(spin||0)+i*Math.PI/3;r+=`<line x1="${f1(x-Math.cos(an)*15)}" y1="${f1(g-17-Math.sin(an)*15)}" x2="${f1(x+Math.cos(an)*15)}" y2="${f1(g-17+Math.sin(an)*15)}" style="stroke:var(--attack);stroke-width:1;opacity:.6"/>`}
  r+=`<circle cx="${f1(x+26)}" cy="${f1(g-5)}" r="5" style="${c}"/><path d="M${f1(x-12)} ${f1(g-32)}L${f1(x+22)} ${f1(g-32)}L${f1(x+26)} ${f1(g-10)}M${f1(x-12)} ${f1(g-32)}L${f1(x-17)} ${f1(g-60)}L${f1(x-26)} ${f1(g-60)}" style="${c}"/>`;
  r+=`<circle cx="${f1(x-3)}" cy="${f1(g-74)}" r="6.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(x-4)} ${f1(g-66)}L${f1(x-7)} ${f1(g-36)}L${f1(x+18)} ${f1(g-36)}L${f1(x+22)} ${f1(g-14)}M${f1(x-5)} ${f1(g-58)}L${f1(x+6)} ${f1(g-38)}L${f1(x+2)} ${f1(g-26)}" style="${ED_INK}"/>`;
  if(helper)r+=edPerson(x-52,g,{reach:true});
  return r}
function edBed(x,g,o={}){let r=`<path d="M${f1(x-66)} ${f1(g)}L${f1(x-66)} ${f1(g-56)}M${f1(x+66)} ${f1(g)}L${f1(x+66)} ${f1(g-34)}M${f1(x-66)} ${f1(g-20)}L${f1(x+66)} ${f1(g-20)}" style="stroke:var(--muted);stroke-width:3;stroke-linecap:round"/>`;
  r+=`<rect x="${f1(x-64)}" y="${f1(g-30)}" width="128" height="10" rx="3" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
  if(o.up){r+=`<circle cx="${f1(x-40)}" cy="${f1(g-62)}" r="6.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(x-40)} ${f1(g-55)}L${f1(x-32)} ${f1(g-32)}L${f1(x+40)} ${f1(g-32)}" style="${ED_INK}"/><path d="M${f1(x-60)} ${f1(g-30)}L${f1(x-50)} ${f1(g-62)}" style="stroke:var(--muted);stroke-width:3"/>`}
  else r+=`<ellipse cx="${f1(x-50)}" cy="${f1(g-35)}" rx="11" ry="5" style="fill:var(--panel);stroke:var(--muted)"/><circle cx="${f1(x-46)}" cy="${f1(g-41)}" r="6.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(x-38)} ${f1(g-36)}L${f1(x+48)} ${f1(g-34)}" style="${ED_INK}"/>`;
  r+=`<rect x="${f1(x-30)}" y="${f1(g-40)}" width="${o.up?70:84}" height="9" rx="4" style="fill:var(--brand-soft);stroke:var(--brand);opacity:.9" transform="translate(${o.up?2:0} 0)"/>`;
  if(o.talk)r+=`<rect x="${f1(x-34)}" y="${f1(g-92)}" width="34" height="20" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x-17)}" y="${f1(g-78)}" class="t-lbl t-mid">…</text>`;
  if(o.carer)r+=edPerson(x+92,g,{reach:true});
  return r}
function edArmchair(x,g,ph){let r=`<path d="M${f1(x-22)} ${f1(g)}L${f1(x-22)} ${f1(g-66)}M${f1(x-22)} ${f1(g-30)}L${f1(x+22)} ${f1(g-30)}L${f1(x+22)} ${f1(g)}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round;fill:none"/>`;
  const hy=g-50+Math.sin(ph||0)*3;
  r+=`<circle cx="${f1(x-8)}" cy="${f1(g-70)}" r="6.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(x-9)} ${f1(g-62)}L${f1(x-12)} ${f1(g-34)}L${f1(x+14)} ${f1(g-34)}L${f1(x+18)} ${f1(g-6)}M${f1(x-10)} ${f1(g-56)}L${f1(x+12)} ${f1(hy)}" style="${ED_INK}"/><rect x="${f1(x+10)}" y="${f1(hy-12)}" width="14" height="18" rx="2" style="fill:var(--gold-soft);stroke:var(--gold)" transform="rotate(-12 ${f1(x+17)} ${f1(hy-3)})"/>`;
  return r}
/* simplified teaching rule: only what the published anchors support.
   No walking limit: normal exam = 0; any functional-system signs = the 1.0-3.5 range (exact step needs Kurtzke's grade rules, not reproduced).
   Walking limit or care needs: the published anchor for that walking/care level. */
function edTeach(n,W){if(W>0)return{v:W,range:false};return n?{v:1,range:true}:{v:0,range:false}}
inits.edss=()=>{
  const svg=$('#edSvg'),rg=$('#edT');
  const idxOf=t=>clamp(Math.floor(t*20),0,19);
  function draw(t){
    const N=vb(svg,'720 380','400 692');
    const i=idxOf(t),v=ED_V[i],f=clamp(t*20-i),B=edBand(v),BD=ED_BANDS[B];
    const L=N?{sx0:12,sw:18.8,gy:640,hk:19,h0:10,fsx:16,fsy:318,fsq:124,px0:12,px1:388,py0:14,py1:290,num:[24,48],al:[70,88],bl:106,g:224,trk:[40,360],tl:240,lbY:654,brY:668}
             :{sx0:24,sw:21.5,gy:330,hk:24.5,h0:12,fsx:24,fsy:36,fsq:132,px0:470,px1:712,py0:20,py1:334,num:[484,52],al:[76,94],bl:112,g:262,trk:[488,694],tl:278,lbY:344,brY:358};
    let s='';
    /* staircase */
    ED_V.forEach((vv,k)=>{const b=ED_BANDS[edBand(vv)],x=L.sx0+k*L.sw,h=L.h0+vv*L.hk,cur=k===i;
      s+=`<rect x="${f1(x)}" y="${f1(L.gy-h)}" width="${f1(L.sw-1.5)}" height="${f1(h)}" rx="2" style="fill:${cur?b.c:b.cs};stroke:${b.c};stroke-width:${cur?2:1};opacity:${k<=i?1:.55}"/>`});
    const cx=L.sx0+i*L.sw+L.sw/2-.75,ch=L.gy-(L.h0+v*L.hk);
    s+=`<path d="M${f1(cx-6)} ${f1(ch-14)}L${f1(cx+6)} ${f1(ch-14)}L${f1(cx)} ${f1(ch-5)}Z" style="fill:var(--ink)"/>`;
    [0,1,2,3,4,5,6,7,8,9,10].forEach(n=>{const k=ED_V.indexOf(n);s+=`<text x="${f1(L.sx0+k*L.sw+L.sw/2-.75)}" y="${L.lbY}" class="t-xs t-mid" style="${n===Math.floor(v)?'fill:var(--ink);font-weight:700':''}">${n}</text>`});
    [ [0,6],[7,10],[11,12],[13,18] ].forEach(([a,b2],bi)=>{const x0=L.sx0+a*L.sw,x1=L.sx0+(b2+1)*L.sw-1.5,bb=ED_BANDS[bi];
      s+=`<path d="M${f1(x0)} ${L.brY-6}L${f1(x0)} ${L.brY}L${f1(x1)} ${L.brY}L${f1(x1)} ${L.brY-6}" style="fill:none;stroke:${bb.c};stroke-width:1.2"/><text x="${f1((x0+x1)/2)}" y="${L.brY+12}" class="t-xs t-mid" style="fill:${bb.c}">${N?bb.nn:bb.n}</text>`});
    /* functional systems: the eight systems, and a schematic bar for examination signs (no grade rules) */
    const dim=v>=4,lvl=v===0?0:v<4?v/3.5:1,bx=L.fsq,bT=L.fsy+8,bB=L.fsy+18+7*13+1;
    s+=`<text x="${L.fsx}" y="${L.fsy}" class="t-sm">FUNCTIONAL SYSTEMS (8)</text>`;
    ED_FS.forEach((n,k)=>{const y=L.fsy+18+k*13;s+=`<text x="${L.fsx}" y="${y}" class="t-xs" style="${dim?'opacity:.55':''}">${n}</text>`});
    s+=`<rect x="${bx}" y="${bT}" width="12" height="${bB-bT}" rx="2" style="fill:none;stroke:var(--muted);stroke-width:.8"/>`;
    if(v<10&&lvl>0)s+=`<rect x="${bx}" y="${f1(bB-(bB-bT)*lvl)}" width="12" height="${f1((bB-bT)*lvl)}" rx="2" style="fill:${BD.c};opacity:${dim?.4:.85}"/>`;
    const fsT=v===0?['no signs:','normal exam']:v<4?['increasing','signs, fully','ambulatory']:v<10?['walking and','care set','the step']:['–'];
    s+=`<text x="${bx+20}" y="${bT+10}" class="t-xs" style="font-weight:600">signs on exam</text><text x="${bx+20}" y="${bT+23}" class="t-xs">(schematic)</text>`;
    fsT.forEach((tx,k)=>s+=`<text x="${bx+20}" y="${bT+44+k*13}" class="t-xs" style="fill:${BD.c}">${tx}</text>`);
    /* scene panel */
    s+=`<rect x="${L.px0}" y="${L.py0}" width="${L.px1-L.px0}" height="${L.py1-L.py0}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.num[0]}" y="${L.num[1]}" style="font:800 28px var(--display);fill:${BD.c}">EDSS ${v.toFixed(1)}</text>`;
    const A=edAnch(v);s+=`<text x="${L.num[0]}" y="${L.al[0]}" class="t-lbl">${A[1]}</text><text x="${L.num[0]}" y="${L.al[1]}" class="t-lbl">${A[2]}</text>`;
    s+=`<text x="${L.num[0]}" y="${L.bl}" class="t-xs" style="fill:${BD.c}">${v===10?'top of the scale':BD.r+' · '+BD.n}</text>`;
    const g=L.g,[t0,t1]=L.trk,mid=(t0+t1)/2,pxm=(t1-t0)/500;
    if(v<7){/* walking track */
      s+=`<line x1="${t0}" x2="${t1}" y1="${g+2}" y2="${g+2}" style="stroke:var(--muted);stroke-width:2"/>`;
      [0,100,200,300,500].forEach(m=>s+=`<line x1="${f1(t0+m*pxm)}" x2="${f1(t0+m*pxm)}" y1="${g+2}" y2="${g+8}" style="stroke:var(--muted)"/><text x="${f1(t0+m*pxm)}" y="${L.tl}" class="t-xs t-mid">${m}${m===500?' m':''}</text>`);
      const lim=ED_LIM[v],max=lim||500,dist=lim?Math.min(lim,f*1.3*lim):f*500,stop=lim&&f*1.3>=1,x=t0+dist*pxm;
      if(lim)s+=`<line x1="${f1(t0+lim*pxm)}" x2="${f1(t0+lim*pxm)}" y1="${g-70}" y2="${g+2}" style="stroke:${BD.c};stroke-width:1.4;stroke-dasharray:3 3"/>`;
      s+=edPerson(x,g,{walk:!stop,ph:dist*pxm/5,aid:v===6?1:v===6.5?2:0});
      const lab=lim?(stop?`stops: ≈${lim} m${v>=6?(v===6?' with one aid':' with two aids'):' without rest'}`:''):'no walking limit';
      if(lab){const lx=clamp(x,t0+40,t1-40);s+=`<text x="${f1(lx)}" y="${g-70}" class="t-xs t-mid" style="fill:${BD.c}">${lab}</text>`}
      if(!lim)s+=`<text x="${t1}" y="${g-12}" class="t-xs t-end">→ beyond 500 m</text>`;
      void max}
    else if(v===7)s+=edChair(mid+10,g,false,f*6);
    else if(v===7.5)s+=edChair(mid+26,g,true,0);
    else if(v===8)s+=edArmchair(mid,g,f*12);
    else if(v===8.5)s+=edBed(mid-8,g,{up:true});
    else if(v===9)s+=edBed(mid-8,g,{talk:true});
    else if(v===9.5)s+=edBed(mid-24,g,{carer:true});
    else s+=`<text x="${f1(mid)}" y="${g-40}" class="t-lbl t-mid">The scale ends at 10:</text><text x="${f1(mid)}" y="${g-22}" class="t-lbl t-mid">death due to MS</text>`;
    s+=`<line x1="${L.px0+10}" x2="${L.px1-10}" y1="${g+2}" y2="${g+2}" style="stroke:var(--line);stroke-width:1;opacity:${v<7?0:1}"/>`;
    svg.innerHTML=s;
    const p=phaseOf(ED_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`EDSS ${v.toFixed(1)}: ${A[0]}`);
    $('#edRead').innerHTML=`<span>EDSS <b>${v.toFixed(1)}</b></span><span>range <b>${v===10?'10':BD.r+' · '+BD.n}</b></span><span>anchor <b>${A[0]}</b></span>`;
    $('#edNote').innerHTML=noteHTML(ED_STEPS[p])+`<div class="kv"><div><dt>EDSS ${v.toFixed(1)}</dt><dd>${A[0]}${v>0&&v<4?'. Within 1.0–3.5 the exact half-step depends on the grades in the functional systems under Kurtzke\'s detailed rules, which are not shown here':''}. [[Das2019,Kurtzke1983]]</dd></div></div>`;
  }
  const stop=playWire(rg,$('#edPlay'),draw,24000,'Replay','edss');
  const setSt=stepWire($('#edSteps'),ED_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- teaching calculator ---- */
  $('#edFs').innerHTML=ED_FS.map((n,k)=>`<label for="edFs${k}"><input type="checkbox" id="edFs${k}" data-fs="${k}"><span>${n.replace('&','&amp;')}</span></label>`).join('');
  const cs=$('#edCalcSvg');let res=0,edRng=false;
  function calc(){const on=ED_FS.filter((n,k)=>$('#edFs'+k).checked),nS=on.length;
    const W=+$('#edWalk').value,F=edTeach(nS,W);res=F.v;edRng=F.range;
    const wl=$('#edWalk').selectedOptions[0].textContent;
    const odd=W>=4&&nS===0?' This is an unusual combination: a walking limit usually comes with findings on examination, and real scoring checks that the two fit together.':'';
    const fsTxt=nS?`signs in ${nS} system${nS>1?'s':''} (${on.join(', ').replace('&','&amp;')})`:'no signs ticked';
    const resTxt=edRng?'1.0–3.5':res.toFixed(1);
    const anch=edRng?'Increasing signs or disability in the functional systems; fully ambulatory':edAnch(res)[0];
    $('#edCalcNote').innerHTML=`<div class="kicker">Teaching result (simplified)</div><div class="edbig">EDSS ${edRng?'':'≈ '}${resTxt}</div><p><b>${anch}.</b></p>
      <div class="kv"><div><dt>Functional systems</dt><dd>${fsTxt}</dd></div><div><dt>Walking</dt><dd>${wl} → ${W?W.toFixed(1):'no walking limit'}</dd></div><div><dt>The rule used here</dt><dd>A normal examination with no walking limit is 0. Signs in any functional system while the person is fully ambulatory place the score in the 1.0–3.5 range; the exact half-step depends on the grades in each system under Kurtzke\'s detailed rules, which this tool does not reproduce. From 4.0 the step shown is the published walking or care anchor you chose; a real score also checks the functional systems.${odd} [[Kurtzke1983,Das2019,MeyerMoock2014]]</dd></div></div>
      <div class="hook"><b>Exam hook</b>EDSS 0 = normal exam; 1.0–3.5 = increasing functional-system signs, fully ambulatory; from 4.0 walking-weighted: 6.0 = one aid for 100 m. Only a trained examiner gives a real score.</div>`;
    drawC()}
  function drawC(){const NC=vb(cs,'720 96','400 110');const x0=NC?20:40,x1=NC?380:700,y=NC?66:56,X=v=>lerp(x0,x1,v/10);let s='';
    [ [0,4],[4,6],[6,7],[7,10] ].forEach(([a,b],k)=>s+=`<rect x="${f1(X(a))}" y="${y-10}" width="${f1(X(b)-X(a))}" height="20" style="fill:${ED_BANDS[k].cs};stroke:${ED_BANDS[k].c};stroke-width:.8"/>`);
    for(let v=0;v<=10;v+=.5)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y+10}" y2="${y+(v%1?14:18)}" style="stroke:var(--muted)"/>`;
    for(let v=0;v<=10;v++)s+=`<text x="${f1(X(v))}" y="${y+30}" class="t-xs t-mid">${v}</text>`;
    if(edRng)s+=`<path d="M${f1(X(1))} ${y-12}L${f1(X(1))} ${y-20}L${f1(X(3.5))} ${y-20}L${f1(X(3.5))} ${y-12}" style="fill:none;stroke:var(--ink);stroke-width:2"/><text x="${f1(X(2.25))}" y="${y-28}" class="t-lbl t-mid">EDSS 1.0–3.5</text>`;
    else s+=`<path d="M${f1(X(res)-7)} ${y-22}L${f1(X(res)+7)} ${y-22}L${f1(X(res))} ${y-11}Z" style="fill:var(--ink)"/><text x="${f1(clamp(X(res),x0+30,x1-30))}" y="${y-28}" class="t-lbl t-mid">EDSS ${res.toFixed(1)}</text>`;
    cs.innerHTML=s}
  $('#edFs').addEventListener('change',calc);$('#edWalk').addEventListener('change',calc);$('#edWalk').addEventListener('input',calc);
  $('#edCalcReset').addEventListener('click',()=>{ED_FS.forEach((n,k)=>$('#edFs'+k).checked=false);$('#edWalk').value='0';calc()});
  $('#edCalcShow').addEventListener('click',()=>{stop();const k=ED_V.indexOf(res);rg.value=(k+.5)/20;draw(+rg.value);svg.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'})});
  calc();
  const prevR=redraws.edss;redraws.edss=()=>{prevR&&prevR();drawC()};

  /* ---- confirmed disability progression ---- */
  const ds=$('#edCdp'),dr=$('#edCdpT');let base=3,conf=12;
  const DL={3:[0,.5,1,1,0,0,1,1,1],6:[0,0,.5,.5,0,0,.5,.5,.5]};
  function events(){const d=DL[base],thr=base<=5.5?1:.5,k=conf/12,ev=[];
    for(let i=1;i<d.length;i++)if(d[i]>=thr&&d[i-1]<thr){const j=i+k;let ok=null,back=null;if(j<d.length){ok=d.slice(i,j+1).every(x=>x>=thr);if(ok)for(let m=j+1;m<d.length;m++)if(d[m]<thr){back=m;break}}ev.push({i,j,ok,back})}
    return{d,thr,ev}}
  function drawD(t){const ND=vb(ds,'720 300','400 520');const W=t*100,{d,thr,ev}=events();
    const C=ND?{x0:50,x1:384,r1:50,r2:66,y0:86,y1:236,tk:254,ax:270,bx:[56,374],bT:300,b0:332,b1:470,bl:486,bh:502}:{x0:66,x1:460,r1:44,r2:60,y0:84,y1:232,tk:250,ax:268,bx:[520,700],bT:30,b0:74,b1:226,bl:244,bh:262};
    const X=w=>lerp(C.x0,C.x1,w/96),Y=v=>lerp(C.y1,C.y0,(v-(base-.5))/2);let s='';
    s+=`<text x="${C.x0}" y="${C.r1-22}" class="t-sm" style="fill:var(--orange)">${ND?'VISITS':'ONE PERSON\'S VISITS'} · <tspan style="fill:var(--warn)">threshold +${thr.toFixed(1)} → ${(base+thr).toFixed(1)} (dashed)</tspan></text>`;
    [base-.5,base,base+.5,base+1,base+1.5].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`);
    s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(base))}" y2="${f1(Y(base))}" style="stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${C.x0+6}" y="${f1(Y(base)+13)}" class="t-xs">baseline ${base.toFixed(1)}</text>`;
    s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(base+thr))}" y2="${f1(Y(base+thr))}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:6 3"/>`;
    for(let w=0;w<=96;w+=ND?24:12)s+=`<text x="${f1(X(w))}" y="${C.tk}" class="t-xs t-mid">${w}</text>`;
    s+=`<text x="${C.x1}" y="${C.ax}" class="t-xs t-end">weeks</text>`;
    let ln='';d.forEach((v,k)=>{if(W>=k*12)ln+=(ln?'L':'M')+f1(X(k*12))+' '+f1(Y(base+v))});s+=`<path d="${ln}" style="fill:none;stroke:var(--orange);stroke-width:2.2"/>`;
    d.forEach((v,k)=>{if(W<k*12)return;s+=`<circle cx="${f1(X(k*12))}" cy="${f1(Y(base+v))}" r="5" style="fill:var(--orange);stroke:var(--panel);stroke-width:1.5"/>`;
      if(base===3&&k===1)s+=`<text x="${f1(X(12)+7)}" y="${f1(Y(base+v)+15)}" class="t-xs">below threshold</text>`});
    let status=[];
    ev.forEach((e,n)=>{if(W<e.i*12)return;const xa=X(e.i*12),ya=Y(base+d[e.i]);
      s+=`<circle cx="${f1(xa)}" cy="${f1(ya)}" r="9" style="fill:none;stroke:var(--warn);stroke-width:1.8"/><text x="${f1(xa)}" y="${f1(ya-14)}" class="t-xs t-mid" style="fill:var(--warn)">rise ${n+1}</text>`;
      if(e.ok===null){status.push(`Rise ${n+1} (week ${e.i*12}) cannot be confirmed within this record.`);return}
      const xb=X(e.j*12);
      if(W>=e.i*12)s+=`<path d="M${f1(xa)} ${C.r1+4}L${f1(xa)} ${C.r1}L${f1(Math.min(xb,X(W)))} ${C.r1}${W>=e.j*12?`L${f1(xb)} ${C.r1+4}`:''}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
      if(W>=e.j*12){s+=`<text x="${f1((xa+xb)/2)}" y="${C.r1-4}" class="t-xs t-mid">${conf} w</text><text x="${f1(Math.min(xb,(ND?398:466)-(e.ok?11:15)*3))}" y="${C.r2+6}" class="t-xs t-mid" style="fill:${e.ok?'var(--good)':'var(--bad)'};font-weight:700">${e.ok?'✓ confirmed':'✗ not confirmed'}</text>`;
        status.push(`Rise ${n+1} (week ${e.i*12}): ${e.ok?'<b>confirmed</b>':'<b>not confirmed</b>'} at week ${e.j*12}${e.ok?'':', because EDSS had fallen back below the threshold'}.`);
        if(e.ok&&e.back!=null&&W>=e.back*12){s+=`<text x="${f1(X(e.back*12))}" y="${f1(Y(base+d[e.back])+14)}" class="t-xs t-mid" style="fill:var(--warn)">↓ fell back: did not last</text>`;status.push(`It then fell back at week ${e.back*12}: a "confirmed" event that did not last.`)}}
      else status.push(`Rise ${n+1} (week ${e.i*12}): waiting for the week-${e.j*12} visit.`)});
    s+=`<line x1="${f1(X(Math.min(W,96)))}" x2="${f1(X(Math.min(W,96)))}" y1="${C.r1-10}" y2="${C.y1}" style="stroke:var(--ink);opacity:.25"/>`;
    /* MSBase persistence bars */
    const bars=[ ['3 mo',70],['6 mo',74],['12 mo',80],['24 mo',89] ],hi=conf===12?0:1,bw=(C.bx[1]-C.bx[0])/4;
    s+=`<text x="${C.bx[0]}" y="${C.bT}" class="t-sm" style="fill:var(--brand)">STILL PRESENT 5 YEARS LATER</text><text x="${C.bx[0]}" y="${C.bT+14}" class="t-xs">by confirmation period · MSBase</text>`;
    bars.forEach(([l,v],k)=>{const x=C.bx[0]+k*bw+bw*.2,w=bw*.6,h=(C.b1-C.b0)*v/100*ramp(t,0,.25);
      s+=`<rect x="${f1(x)}" y="${f1(C.b1-h)}" width="${f1(w)}" height="${f1(h)}" rx="3" style="fill:${k===hi?'var(--brand)':'var(--brand-soft)'};stroke:var(--brand);stroke-width:${k===hi?2:1}"/><text x="${f1(x+w/2)}" y="${f1(C.b1-h-5)}" class="t-xs t-mid" style="fill:var(--ink)">${v}%</text><text x="${f1(x+w/2)}" y="${C.bl}" class="t-xs t-mid">${l}</text>`;
      if(k===hi)s+=`<text x="${f1(x+w/2)}" y="${C.bh}" class="t-xs t-mid" style="fill:var(--brand)">≈ this rule</text>`});
    s+=`<line x1="${C.bx[0]}" x2="${C.bx[1]}" y1="${C.b1}" y2="${C.b1}" class="axis"/>`;
    ds.innerHTML=s;
    $('#edCdpNote').innerHTML=noteHTML({k:`Baseline ${base.toFixed(1)} · confirmed after ${conf} weeks`,t:'Confirmed, or just a bad patch?',
      txt:`A rise counts only if it reaches +${thr.toFixed(1)} (baseline ${base<=5.5?'5.5 or less':'above 5.5'}) and is still there ${conf} weeks later. ${status.join(' ')||'Press Play to walk through the visits.'}`,
      pt:`One bad day, or a few bad weeks, should not be counted as permanent worsening. Trials wait and re-check.`,
      hook:`CDP: +1.0 from baseline ≤5.5, +0.5 above 5.5, confirmed at 12 or 24 weeks. In MSBase, 3–6-month confirmation overestimated lasting disability by up to 30%.`})
      +`<div class="kv"><div><dt>Limitation (MSBase)</dt><dd>70%, 74%, 80% and 89% of events confirmed at 3, 6, 12 and 24 months were still present 5 years later. Among 48 definitions of progression, concordance was only 17.3%. [[Kalincik2015]]</dd></div><div><dt>PIRA in trials</dt><dd>Definitions re-baseline disability at least 30 days after each relapse and require no relapse within 30 days around the rise and its confirmation; a rise within 90 days of a relapse is relapse-associated worsening. [[Kappos2020,Lublin2022]]</dd></div></div>`;
  }
  playWire(dr,$('#edCdpPlay'),drawD,11000,'Replay','edss');
  $$('[data-cdb]').forEach(b=>b.addEventListener('click',()=>{base=+b.dataset.cdb;$$('[data-cdb]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawD(+dr.value)}));
  $$('[data-cdc]').forEach(b=>b.addEventListener('click',()=>{conf=+b.dataset.cdc;$$('[data-cdc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawD(+dr.value)}));
  drawD(+dr.value);
};
