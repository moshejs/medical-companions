/* =============== 2.2 MGFA class & scores =============== */
const CL_ROWS=[{c:'—',d:'no weakness'},{c:'I',d:'ocular only'},{c:'IIa',d:'mild, limb'},{c:'IIb',d:'mild, bulbar'},{c:'IIIa',d:'moderate, limb'},{c:'IIIb',d:'moderate, bulbar'},{c:'IVa',d:'severe, limb'},{c:'IVb',d:'severe, bulbar'},{c:'V',d:'intubation'}];
const CL_SEV={II:'Mild',III:'Moderate',IV:'Severe'};
const CL_A='Predominantly affecting limb, axial muscles, or both. May also have lesser involvement of oropharyngeal muscles.';
const CL_B='Predominantly affecting oropharyngeal, respiratory muscles, or both. May also have lesser or equal involvement of limb, axial muscles, or both.';
function clWording(r){
  if(r===0)return 'Not an MGFA class. The classification describes weakness, and none is found on examination; the post-intervention status (for example, remission) describes this person instead.';
  if(r===1)return '"Any ocular muscle weakness; may have weakness of eye closure. All other muscle strength is normal."';
  if(r===8)return '"Defined as intubation, with or without mechanical ventilation, except when employed during routine postoperative management. The use of a feeding tube without intubation places the patient in class IVb."';
  const c=CL_ROWS[r].c,n=c.slice(0,-1),ab=c.slice(-1);
  return `"${CL_SEV[n]} weakness affecting muscles other than ocular muscles; may also have ocular muscle weakness of any severity." ${ab}: "${ab==='a'?CL_A:CL_B}"`}
/* schematic courses: [month, row]; 'X' is the crisis row, set by the breathing toggle */
const CL_COURSE={
 b:{pts:[[0,1],[3,3],[4.5,5],[6,7],[7,'X'],[8.3,7],[9.5,5],[11,3],[26,5],[28,3]],thy:13,
    pis:[[0,9,'',''],[9,17,'I','Improved (I)'],[17,26,'MM-3','Minimal manifestations, MM-3'],[26,30,'E','Exacerbation (E)']],
    ev:[[0,'Ptosis and double vision: Class I'],[3,'Speech and swallowing tire: IIb'],[4.5,'Moderate bulbar weakness: IIIb'],[6,'Feeding tube, no intubation: Class IVb'],[7,'X'],[8.3,'Off the ventilator: back to IVb'],[9.5,'Improving on treatment: IIIb, then IIb'],[13,'Thymectomy: routine post-op ventilation is not V'],[17,'MM-3: no functional limitation, some weakness'],[26,'Exacerbation after meeting MM: IIIb'],[28,'Settling again: IIb']]},
 l:{pts:[[0,1],[2.5,2],[5,4],[8.5,2],[15,0]],thy:null,
    pis:[[0,8.5,'',''],[8.5,27,'I','Improved (I)'],[27,30,'PR','Pharmacologic remission (PR)']],
    ev:[[0,'Ptosis first: Class I'],[2.5,'Mild limb weakness: IIa'],[5,'Moderate limb weakness: IIIa'],[8.5,'Better on immunosuppression: IIa'],[15,'No weakness on careful exam: no class applies'],[21,'Not yet a remission: needs 1 year'],[27,'1 year without signs, still on therapy: PR']]},
 o:{pts:[[0,1]],thy:null,
    pis:[[0,4,'',''],[4,16,'I','Improved (I)'],[16,30,'MM-2','Minimal manifestations, MM-2']],
    ev:[[0,'Ptosis and double vision only: Class I'],[4,'Low-dose pyridostigmine begins'],[16,'1 year on low-dose ChEI only: MM-2'],[24,'Still Class I: defined at a point in time']]}
};
const CL_STEPS=[
 {from:0,at:.02,k:'Class I',t:'Ocular only',
  txt:`Class I: "Any ocular muscle weakness; may have weakness of eye closure. All other muscle strength is normal." [[Jaretzki2000,MGFAClass2016]] The 2016 consensus defines ocular MG as Class I at a specified point in time, not by how long the disease has lasted, and asks for judgment before putting fatigue with normal strength testing down to generalized MG. [[Sanders2016]]`,
  pt:`Class I means only the eye muscles are weak: a drooping lid, double vision, perhaps weak eye closing.`,
  hook:`Class I = ocular only. Weak eye closure is allowed; every other muscle must be normal.`},
 {from:.09,at:.16,k:'Classes II to IV',t:'Mild, moderate, severe; a limb, b bulbar',
  txt:`Classes II, III and IV are mild, moderate and severe weakness "affecting muscles other than ocular muscles", with ocular weakness of any severity allowed. The letter says which muscles lead: "a" is predominantly limb, axial or both, with lesser oropharyngeal involvement; "b" is predominantly oropharyngeal, respiratory or both, with lesser or equal limb or axial involvement. [[Jaretzki2000,MGFAClass2016]]`,
  pt:`The number says how weak; the letter says where. "a" is arms, legs and trunk; "b" is speaking, swallowing and breathing.`,
  hook:`a = limb or axial predominant; b = oropharyngeal or respiratory predominant. Ocular weakness can be any severity in II to IV.`},
 {from:.195,at:.21,k:'Class IVb',t:'The feeding-tube rule',
  txt:`The Class V definition ends with a rule about feeding tubes: "The use of a feeding tube without intubation places the patient in class IVb." [[MGFAClass2016]] Bulbar weakness also threatens breathing: crisis can come from weak breathing muscles or from bulbar weakness with collapse of the upper airway. [[Claytor2023]]`,
  pt:`Needing a feeding tube is severe, but without a breathing tube it is still Class IVb, not V.`,
  hook:`Feeding tube without intubation = IVb.`},
 {from:.23,at:.245,k:'Class V',t:'Intubation, and the mask question',
  txt:`Class V is "defined as intubation, with or without mechanical ventilation, except when employed during routine postoperative management". [[Jaretzki2000,MGFAClass2016]] The 2016 international consensus defines manifest myasthenic crisis as Class V meaning worsening "requiring intubation or noninvasive ventilation to avoid intubation", which adds non-invasive ventilation to the original wording. [[Sanders2016]] Switch the crisis to "BiPAP mask only" to see the two readings split.`,
  pt:`Class V means a breathing tube. Whether a breathing mask also counts depends on which definition is used. Trouble breathing or swallowing in MG is an emergency.`,
  hook:`Class V = intubation, except routine post-operative care. The 2016 crisis definition also counts non-invasive ventilation used to avoid intubation.`},
 {from:.3,at:.45,k:'Over months',t:'A snapshot, re-taken',
  txt:`The MGFA class describes the disease at that examination; the 2025 MGFA task force says it should be updated every 3 to 6 months to reflect current status. [[Ruzhansky2025]] Ventilation after an operation does not count: intubation "employed during routine postoperative management" is excluded from Class V. [[MGFAClass2016]] See <a href="#thymectomy" data-go="thymectomy">Thymectomy over the years</a>.`,
  pt:`The class is a snapshot of today, not a permanent label. It is updated as the person changes.`,
  hook:`MGFA class = status at that examination. The 2025 MGFA task force: update it every 3 to 6 months. [[Ruzhansky2025]]`},
 {from:.55,at:.7,k:'MGFA-PIS',t:'Post-intervention status',
  txt:`Once treatment has started, the MGFA post-intervention status describes the result: complete stable remission, pharmacologic remission, minimal manifestations (MM-0 to MM-3), or a change from before treatment: improved, unchanged, worse, exacerbation or died of MG. [[Jaretzki2000,MGFAPIS2016]] The 2016 consensus sets the treatment goal as minimal manifestations or better, with no more than CTCAE grade 1 medication side effects. [[Sanders2016]] The 2025 task force calls PIS the evaluator's overall clinical judgement, not tied to a set change on any score. [[Ruzhansky2025]]`,
  pt:`After treatment, a second label says how well it is working, from remission to worse.`,
  hook:`MM = no functional limitation but some weakness on exam. CSR = no symptoms or signs for 1 year with no MG therapy. PR = the same, still on therapy, but not on a cholinesterase inhibitor.`},
 {from:.86,at:.9,k:'Exacerbation',t:'Worse after a good status',
  txt:`Exacerbation (E) is a patient who met CSR, PR or MM criteria and then developed findings beyond them. [[MGFAPIS2016]] Refractory MG, in the 2016 consensus, is PIS unchanged or worse after corticosteroids and at least 2 other immunosuppressive agents at adequate dose and duration. [[Sanders2016]]`,
  pt:`A flare after a good spell has its own label, so studies can count it.`,
  hook:`E = worse after having reached CSR, PR or MM. Refractory = unchanged or worse after steroids plus at least 2 other immunosuppressants.`}
];
const CL_ADL=[
 {n:'Talking',d:'o',a:['Normal','Intermittent slurring or nasal speech','Constant slurring or nasal, but can be understood','Difficult to understand speech']},
 {n:'Chewing',d:'o',a:['Normal','Fatigue with solid food','Fatigue with soft food','Gastric tube']},
 {n:'Swallowing',d:'o',a:['Normal','Rare episode of choking','Frequent choking necessitating changes in diet','Gastric tube']},
 {n:'Breathing',d:'r',a:['Normal','Shortness of breath with exertion','Shortness of breath at rest','Ventilator dependence']},
 {n:'Impairment of ability to brush teeth or comb hair',d:'x',a:['None','Extra effort, but no rest periods needed','Rest periods needed','Cannot do one of these functions']},
 {n:'Impairment of ability to arise from a chair',d:'x',a:['None','Mild, sometimes uses arms','Moderate, always uses arms','Severe, requires assistance']},
 {n:'Double vision',d:'e',a:['None','Occurs, but not daily','Daily, but not constant','Constant']},
 {n:'Eyelid droop',d:'e',a:['None','Occurs, but not daily','Daily, but not constant','Constant']}
];
const CL_DOM={e:['ocular','var(--nerve)'],o:['oropharyngeal','var(--ab)'],r:['respiratory','var(--warn)'],x:['extremity','var(--musk)']};
const CL_EX={gen:[1,1,2,1,2,2,0,1],ocu:[0,0,0,0,0,0,2,3],zero:[0,0,0,0,0,0,0,0]};

inits.classes=()=>{
  let course='b',niv=false,pin=null;
  const svg=$('#clSvg'),rg=$('#clT');
  const rowAt=(C,m)=>{let r=C.pts[0][1];C.pts.forEach(p=>{if(m>=p[0])r=p[1]});return r==='X'?(niv?7:8):r};
  const pisAt=(C,m)=>C.pis.find(p=>m>=p[0]&&m<p[1])||C.pis[C.pis.length-1];
  const evAt=(C,m)=>{let e=null;C.ev.forEach(v=>{if(m>=v[0])e=v});if(!e)return '';if(e[1]==='X')return niv?'BiPAP, no tube: IVb by the 2000 wording, V by 2016':'Intubated: Class V, a myasthenic crisis';return e[1]};
  function draw(t){
    const N=vb(svg,'720 420','400 452'),C=CL_COURSE[course],m=t*30;
    const L=N?{lx:12,x0:126,x1:388,y0:58,rh:32,cy:10,ch:36,ax:356,pb:378,ph:28,pn:428,cls:'t-xs'}
             :{lx:12,x0:184,x1:704,y0:50,rh:30,cy:8,ch:30,ax:328,pb:350,ph:28,pn:398,cls:'t-sm'};
    const xm=v=>L.x0+(L.x1-L.x0)*v/30,yr=r=>L.y0+r*L.rh+L.rh/2;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* rows */
    CL_ROWS.forEach((R,i)=>{const y=L.y0+i*L.rh,band=i===0?'var(--achr-soft)':i===8?'var(--ab-soft)':(i>=2&&i<=3)||(i>=6&&i<=7)?'var(--panel-2)':'var(--panel)';
      s+=`<rect x="${L.x0}" y="${y}" width="${L.x1-L.x0}" height="${L.rh}" style="fill:${band};opacity:${i===0||i===8?.6:.8}"/>`;
      const on=rowAt(C,m)===i,sel=pin===i;
      s+=`<g class="clk" data-clrow="${i}" tabindex="0" role="button" aria-label="Class ${R.c==='—'?'none, no weakness':R.c+', '+R.d}: show wording">`;
      s+=`<rect x="${L.lx}" y="${y+2}" width="${L.x0-L.lx-8}" height="${L.rh-4}" rx="7" style="fill:${on?'var(--nerve-soft)':sel?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--nerve)':sel?'var(--ink)':'var(--line)'};stroke-width:${on||sel?1.8:1}"/>`;
      if(N)s+=`<text x="${L.lx+8}" y="${y+14}" class="t-lbl" style="font-size:12px">${R.c}</text><text x="${L.lx+8}" y="${y+26}" class="t-xs">${R.d}</text>`;
      else s+=`<text x="${L.lx+10}" y="${y+L.rh/2+4.5}" class="t-lbl">${R.c}</text><text x="${L.lx+52}" y="${y+L.rh/2+3.5}" class="t-xs" style="${on?'fill:var(--ink)':''}">${R.d}</text>`;
      s+='</g>'});
    /* month grid */
    for(let k=0;k<=30;k+=6){const x=xm(k);s+=`<path d="M${f1(x)} ${L.y0}V${L.y0+9*L.rh}" class="grid"/><text x="${f1(x)}" y="${L.ax+12}" class="t-xs t-mid">${k}</text>`}
    s+=`<text x="${L.x1}" y="${L.ax}" class="t-xs t-end">months · schematic course</text>`;
    if(C.thy!=null){const x=xm(C.thy),o=m>=C.thy?1:.35;s+=`<path d="M${f1(x)} ${L.y0}V${L.y0+9*L.rh}" style="stroke:var(--drug);stroke-width:1.4;stroke-dasharray:3 3;opacity:${o}"/><text x="${f1(x+4)}" y="${L.y0+L.rh/2+4}" class="t-xs" style="fill:var(--drug);opacity:${o}">thymectomy</text>`}
    /* trail */
    let d='',pr=null;
    const pts=C.pts.map(p=>[p[0],p[1]==='X'?(niv?7:8):p[1]]);
    pts.forEach((p,i)=>{if(p[0]>m)return;const x=xm(p[0]),y=yr(p[1]);d+=i?`H${f1(x)}V${f1(y)}`:`M${f1(x)} ${f1(y)}`;pr=p});
    d+=`H${f1(xm(m))}`;
    s+=`<path d="${d}" style="fill:none;stroke:var(--nerve);stroke-width:3;stroke-linejoin:round;opacity:.75"/>`;
    /* ghost: the 2016 reading */
    if(course==='b'&&niv&&m>=7){const gx=xm(7),gx1=xm(Math.min(m,8.3));
      s+=`<path d="M${f1(gx)} ${f1(yr(8))}H${f1(gx1)}" style="stroke:var(--ab);stroke-width:2;stroke-dasharray:4 4"/><circle cx="${f1(m<8.3?xm(m):gx1)}" cy="${f1(yr(8))}" r="8" style="fill:none;stroke:var(--ab);stroke-width:2;stroke-dasharray:3 3"/><text x="${f1(gx1+12)}" y="${f1(yr(8)+4)}" class="t-xs" style="fill:var(--ab)">2016 consensus: crisis = Class V</text>`}
    /* token */
    const cr=rowAt(C,m),tx=xm(m),ty=yr(cr);
    s+=`<circle cx="${f1(tx)}" cy="${f1(ty)}" r="9" style="fill:var(--nerve);stroke:var(--panel);stroke-width:2.5"/>`;
    /* event callout */
    const ev=evAt(C,m);
    if(ev){const w=Math.min(L.x1-L.lx,ev.length*(N?5.8:6.7)+20),cx=clamp(tx,L.lx+w/2,L.x1-w/2);
      s+=`<rect x="${f1(cx-w/2)}" y="${L.cy}" width="${f1(w)}" height="${L.ch}" rx="8" style="fill:var(--panel);stroke:var(--nerve)"/><text x="${f1(cx)}" y="${L.cy+L.ch/2+4}" class="${L.cls} t-mid" style="fill:var(--ink)">${ev}</text>`;
      s+=`<path d="M${f1(tx)} ${L.cy+L.ch}V${f1(ty-10)}" style="stroke:var(--nerve);stroke-width:1;stroke-dasharray:2 3;opacity:.6"/>`}
    /* PIS band */
    s+=`<text x="${L.lx}" y="${L.pb+L.ph/2+4}" class="t-xs">${N?'PIS':'MGFA-PIS'}</text>`;
    C.pis.forEach(([a,b,code,full])=>{const x=xm(a),w=xm(b)-x,reached=m>=a,col=!code?'var(--panel-2)':code==='E'?'var(--bad-soft)':code==='I'?'var(--achr-soft)':'var(--good-soft)';
      s+=`<rect x="${f1(x)}" y="${L.pb}" width="${f1(Math.max(0,(reached?Math.min(m,b):a)-a)/(b-a)*w)}" height="${L.ph}" style="fill:${col}"/><rect x="${f1(x)}" y="${L.pb}" width="${f1(w)}" height="${L.ph}" style="fill:none;stroke:var(--line)"/>`;
      if(reached)s+=`<text x="${f1(x+w/2)}" y="${L.pb+L.ph/2+4}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${code||'not yet'}</text>`});
    const P=pisAt(C,m);
    s+=`<text x="${L.x0}" y="${L.pn}" class="t-sm" style="fill:var(--ink)">Status now: <tspan style="font-weight:700">${P[3]||(N?'none yet':'none yet, treatment has not had its effect')}</tspan></text>`;
    svg.innerHTML=s;
    const p=phaseOf(CL_STEPS,t);setSt(p);$('#clNote').innerHTML=noteHTML(CL_STEPS[p]);
    $('#clRead').innerHTML=`<span>Month <b>${Math.floor(m)}</b></span><span>MGFA class <b>${CL_ROWS[cr].c==='—'?'none (no weakness)':CL_ROWS[cr].c}</b></span>${course==='b'&&niv&&m>=7&&m<8.3?'<span>2016 crisis reading <b>Class V</b></span>':''}<span>PIS <b>${P[3]||'not yet'}</b></span>`;
    const show=pin!=null?pin:cr;
    $('#clRung').innerHTML=`<b>${pin!=null?'Selected: ':'Token is in: '}${CL_ROWS[show].c==='—'?'no class':'Class '+CL_ROWS[show].c}</b><span>${clWording(show)}</span>`;
    rg.setAttribute('aria-valuetext',`Month ${Math.floor(m)}, class ${CL_ROWS[cr].c}`);
  }
  const stop=playWire(rg,$('#clPlay'),draw,24000,'Replay','classes');
  const setSt=stepWire($('#clSteps'),CL_STEPS,rg,draw,stop);
  rg.addEventListener('input',()=>{pin=null});
  const pick=i=>{pin=pin===i?null:i;draw(+rg.value)};
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-clrow]');if(g)pick(+g.dataset.clrow)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-clrow]');if(!g||(e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();const i=+g.dataset.clrow;pick(i);const ng=svg.querySelector(`[data-clrow="${i}"]`);ng&&ng.focus()});
  $$('#m-classes [data-clc]').forEach(b=>b.onclick=()=>{course=b.dataset.clc;$$('#m-classes [data-clc]').forEach(c=>c.setAttribute('aria-pressed',c===b));
    $$('#m-classes [data-clv]').forEach(c=>{c.disabled=course!=='b';c.title=c.disabled?'Only the bulbar course has a crisis':''});draw(+rg.value)});
  $$('#m-classes [data-clv]').forEach(b=>b.onclick=()=>{if(b.disabled)return;niv=b.dataset.clv==='niv';$$('#m-classes [data-clv]').forEach(c=>c.setAttribute('aria-pressed',c===b));
    if(course==='b'&&!(+rg.value>=.23&&+rg.value<.28)){stop();rg.value=.245}draw(+rg.value)});
  draw(+rg.value);

  /* ---------- MG-ADL calculator ---------- */
  const sc=CL_ADL.map(()=>0);let base=13,shown=0,shownD=0,stopA=null;
  $('#clAdl').innerHTML=CL_ADL.map((it,i)=>`<fieldset><legend><span class="cl-dom" style="background:${CL_DOM[it.d][1]}"></span>${i+1} · ${it.n}</legend>`+
    it.a.map((a,v)=>`<button class="cl-opt" data-adl="${i}" data-v="${v}" aria-pressed="${v===0}"><b>${v}</b><span>${a}</span></button>`).join('')+'</fieldset>').join('');
  const as=$('#clAdlSvg');
  function gauge(tot,del){
    const N=vb(as,'720 200','400 236');
    const L=N?{x0:16,x1:384,ty:20,ly:38,by:50,bh:24,tk:88,ms:104,cy:136,dy:150,dh:18,dl:181,dk:196,dn:222}:{x0:20,x1:700,ty:22,ly:22,by:40,bh:24,tk:78,ms:96,cy:128,dy:142,dh:18,dl:173,dk:188};
    const k=(L.x1-L.x0)/24,X=v=>L.x0+v*k;let s='';
    const dom={e:0,o:0,r:0,x:0};CL_ADL.forEach((it,i)=>dom[it.d]+=sc[i]);
    s+=`<text x="${L.x0}" y="${L.ty}" class="t-big">MG-ADL total ${Math.round(tot)} <tspan class="t-sm">of 24</tspan></text>`;
    s+=`<text x="${N?L.x0:L.x1}" y="${L.ly+(N?0:0)}" class="t-xs ${N?'':'t-end'}">ocular ${dom.e} · oropharyngeal ${dom.o} · respiratory ${dom.r} · extremity ${dom.x}</text>`;
    s+=`<rect x="${L.x0}" y="${L.by}" width="${L.x1-L.x0}" height="${L.bh}" rx="5" style="fill:var(--panel-2)"/>`;
    let acc=0;const fr=tot/(Object.values(dom).reduce((a,b)=>a+b,0)||1);
    ['e','o','r','x'].forEach(d=>{const w=dom[d]*fr*k;if(w>0)s+=`<rect x="${f1(X(acc))}" y="${L.by}" width="${f1(w)}" height="${L.bh}" style="fill:${CL_DOM[d][1]}"/>`;acc+=dom[d]*fr});
    [1,2].forEach(v=>{s+=`<path d="M${f1(X(v))} ${L.by-4}V${L.by+L.bh+4}" style="stroke:var(--ink);stroke-width:${v===2?2:1};stroke-dasharray:${v===1?'2 2':'none'}"/>`});
    for(let v=0;v<=24;v+=4)s+=`<text x="${f1(X(v))}" y="${L.tk}" class="t-xs t-mid">${v}</text>`;
    s+=`<text x="${f1(X(2)+6)}" y="${L.ms}" class="t-xs" style="fill:var(--ink)">◂ 0–1 minimal symptom expression · 2 PASS threshold</text>`;
    /* change from baseline */
    const D=clamp(del,-12,12),c0=(L.x0+L.x1)/2,dk=(L.x1-L.x0)/24;
    s+=`<text x="${L.x0}" y="${L.cy}" class="t-sm" style="fill:var(--ink)">Change from baseline ${base}: <tspan style="font-weight:700">${del>0?'+':''}${Math.round(del)}</tspan>${Math.round(del)<=-2?' · 2-point improvement reached':''}</text>`;
    s+=`<rect x="${L.x0}" y="${L.dy}" width="${L.x1-L.x0}" height="${L.dh}" rx="4" style="fill:var(--panel-2)"/>`;
    if(D)s+=`<rect x="${f1(D<0?c0+D*dk:c0)}" y="${L.dy}" width="${f1(Math.abs(D)*dk)}" height="${L.dh}" style="fill:${D<0?'var(--good)':'var(--bad)'}"/>`;
    s+=`<path d="M${f1(c0)} ${L.dy-4}V${L.dy+L.dh+4}" style="stroke:var(--ink);stroke-width:1.5"/><path d="M${f1(c0-2*dk)} ${L.dy-6}V${L.dy+L.dh+6}" style="stroke:var(--good);stroke-width:2;stroke-dasharray:3 2"/>`;
    for(let v=-12;v<=12;v+=4)s+=`<text x="${f1(c0+v*dk)}" y="${L.dk}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`;
    s+=`<text x="${f1(c0-2*dk-4)}" y="${L.dl}" class="t-xs t-end" style="fill:var(--good)">◂ −2: clinical improvement</text><text x="${f1(c0+6)}" y="${L.dl}" class="t-xs">worse ▸</text>`;
    if(N)s+=`<text x="${L.x0}" y="${L.dn}" class="t-xs">bar runs from −12 to +12</text>`;
    as.innerHTML=s}
  function adl(){const tot=sc.reduce((a,b)=>a+b,0),del=tot-base;
    $$('#clAdl [data-adl]').forEach(b=>b.setAttribute('aria-pressed',sc[+b.dataset.adl]===+b.dataset.v));
    $('#clBaseV').textContent=base;
    const f0=shown,d0=shownD;stopA&&stopA();gauge(f0,d0);stopA=animate(320,p=>{shown=lerp(f0,tot,ease(p));shownD=lerp(d0,del,ease(p));gauge(shown,shownD)},()=>{stopA=null;shown=tot;shownD=del;gauge(tot,del)});
    const o=$('#clAdlOut');o.className='cl-out'+(del<=-2?' good':del>=2?' warn':'');
    o.innerHTML=`<strong>Total ${tot} of 24 · change ${del>0?'+':''}${del}</strong>${tot<=1?'A total of 0 or 1 is "minimal symptom expression", used as a trial endpoint. ':''}${del<=-2?'A fall of 2 points or more from baseline: the size of change taken to indicate clinical improvement. ':del>=2?'A rise of 2 points or more from baseline. ':'Less than a 2-point change from baseline. '}Scores here are arithmetic only. [[Muppidi2011,MGNetSummaries2023]]`}
  $('#clAdl').addEventListener('click',e=>{const b=e.target.closest('[data-adl]');if(!b)return;sc[+b.dataset.adl]=+b.dataset.v;adl()});
  $$('#m-classes [data-clex]').forEach(b=>b.onclick=()=>{CL_EX[b.dataset.clex].forEach((v,i)=>sc[i]=v);adl()});
  $('#clBase').addEventListener('input',e=>{base=+e.target.value;adl()});
  $('#clBaseSet').onclick=()=>{base=sc.reduce((a,b)=>a+b,0);$('#clBase').value=base;adl()};
  CL_EX.gen.forEach((v,i)=>sc[i]=v);adl();
  {const pr=redraws.classes;redraws.classes=()=>{pr&&pr();gauge(shown,shownD)}}

  /* ---------- PIS finder ---------- */
  const q={q1:'none',q2:'none',q3:'y'};
  function pis(){let h,cls='';const yr=q.q3==='y',che=q.q2==='che'||q.q2==='both';
    if(q.q1==='func'){h=['Not minimal manifestations or better','Functional limitation from MG rules out CSR, PR and MM. The status is described as a change from before treatment: Improved, Unchanged or Worse, or Exacerbation if CSR, PR or MM had been reached before.']}
    else if(q.q1==='none'){
      if(che){h=['Not a remission',`Patients taking cholinesterase inhibitors are excluded from remission, "because their use suggests weakness". The 2016 consensus also excludes daily cholinesterase-inhibitor use with evidence of benefit. If weakness is found, see MM-2 or MM-3.`];cls='warn'}
      else if(!yr){h=['Not yet',`${q.q2==='none'?'Complete stable':'Pharmacologic'} remission needs no symptoms or signs for at least 1 year.`];cls='warn'}
      else if(q.q2==='none'){h=['Complete stable remission (CSR)','No symptoms or signs for at least 1 year with no MG therapy. Isolated weakness of eyelid closure is accepted.'];cls='good'}
      else{h=['Pharmacologic remission (PR)','The CSR criteria are met, but the person continues some MG therapy, not a cholinesterase inhibitor.'];cls='good'}}
    else{cls='good';
      if(q.q2==='none')h=yr?['MM-0','Minimal manifestations with no MG treatment for at least 1 year.']:(cls='warn',['Minimal manifestations, subgroup not yet set','MM-0 needs no MG treatment for at least 1 year.']);
      else if(q.q2==='is')h=['MM-1','Minimal manifestations while continuing immunosuppression, with no cholinesterase inhibitor or other symptomatic therapy.'];
      else if(q.q2==='che')h=yr?['MM-2','Minimal manifestations on only low-dose cholinesterase inhibitors (under 120 mg pyridostigmine a day) for at least 1 year.']:(cls='warn',['Minimal manifestations, subgroup not yet set','MM-2 needs at least 1 year on low-dose cholinesterase inhibitor only.']);
      else h=['MM-3','Minimal manifestations with cholinesterase inhibitors or other symptomatic therapy plus some immunosuppression during the past year.']}
    const o=$('#clPisOut');o.className='cl-out'+(cls?' '+cls:'');
    o.innerHTML=`<strong>${h[0]}</strong>${h[1]} The 2016 treatment goal is minimal manifestations or better, with no more than grade 1 medication side effects. [[MGFAPIS2016,Sanders2016]]`;
    ['q1','q2','q3'].forEach(k=>$$(`#m-classes [data-cl${k}]`).forEach(b=>b.setAttribute('aria-pressed',b.dataset['cl'+k]===q[k])))}
  ['q1','q2','q3'].forEach(k=>$$(`#m-classes [data-cl${k}]`).forEach(b=>b.onclick=()=>{q[k]=b.dataset['cl'+k];pis()}));
  pis();
};
