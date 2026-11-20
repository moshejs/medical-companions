/* =============== 3.1 The first minutes: calling for help, CPR & defibrillators =============== */
/* glyphs for this module (schematic, no data) */
function caAmb(x,y,s=1){/* an ambulance facing right, centred on (x,y) */
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-17" y="-10" width="22" height="16" rx="2" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><path d="M5 -6H12L17 0V6H5Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4;stroke-linejoin:round"/><path d="M-6 -6V2M-10 -2H-2" style="stroke:var(--brand);stroke-width:2.4"/><rect x="-6" y="-13" width="6" height="3" rx="1" style="fill:var(--brand)"/><circle cx="-10" cy="7" r="3" style="fill:var(--ink)"/><circle cx="11" cy="7" r="3" style="fill:var(--ink)"/></g>`}
function caCar(x,y,s=1){
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M-16 4V-1L-11 -2L-6 -9H6L11 -2L16 -1V4Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4;stroke-linejoin:round"/><path d="M-4 -7H4L7 -2H-7Z" style="fill:var(--accent-soft)"/><circle cx="-9" cy="5" r="3" style="fill:var(--ink)"/><circle cx="9" cy="5" r="3" style="fill:var(--ink)"/></g>`}
function caWho(x,y,s=1,pain=0){/* a standing person with a glow on the chest */
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${pain>0?`<circle cx="0" cy="-2" r="${f1(6+pain*3)}" style="fill:var(--pain);opacity:${f1(.15+pain*.25)}"/>`:''}<circle cx="0" cy="-13" r="4" style="fill:var(--ink)"/><path d="M-5 9V-3Q-5 -7 0 -7Q5 -7 5 -3V9Z" style="fill:var(--ink)"/></g>`}
function caHosp(x,y,s=1){
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-10" y="-11" width="20" height="20" rx="2" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/><path d="M0 -7V3M-5 -2H5" style="stroke:var(--rx);stroke-width:2.6"/></g>`}
function caPhone(x,y,s=1){
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-6" y="-11" width="12" height="21" rx="2.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="-4" y="-8" width="8" height="12" style="fill:var(--brand-soft)"/><circle cx="0" cy="7" r="1.2" style="fill:var(--ink)"/></g>`}

const CA_STEPS=[
 {from:0,at:.04,k:'Minute 0 · symptoms start',t:'The clock starts at the first symptom',
  txt:`Both people start to feel unwell at the same moment. What happens next depends largely on how soon help is called. An AHA scientific statement calls patient delay <i>"the major factor limiting delivery of definitive treatment"</i> for acute coronary syndromes. [[Moser2006]] In the international GRACE registry, the median time before reaching hospital was 2.3 hours for STEMI and 3.0 hours for NSTEMI. [[Goldberg2002GRACE]] ESC 2023 lists <i>"prolonged chest pain (&gt;15 min) and/or recurrent pain within 1 h"</i> as red flags for contacting emergency services. [[Byrne2023ESC]]`,
  pt:`Heart muscle starts to suffer as soon as the artery blocks. The sooner help is called, the more muscle can be saved.`,
  hook:`GRACE median prehospital delay: 2.3 h for STEMI, 3.0 h for NSTEMI and unstable angina. [[Goldberg2002GRACE]]`},
 {from:.106,at:.15,k:'The call',t:'Call an ambulance rather than self-present',
  txt:`ESC 2023, as published: <i>"The recommended action should be to contact the EMS rather than to self-present."</i> [[Byrne2023ESC]] Yet only 53.4% of US heart attack patients arrived by ambulance in 1994–1998, and 60% of STEMI patients in 2007–2009. [[Canto2002,Mathews2011]] Older people, people living farther away and people who were haemodynamically unstable were more likely to use an ambulance; race, income and education were not linked with the choice. [[Mathews2011]] Knowing to call is common (94.9% of US adults in 2017); knowing all five common symptoms is not (50.2%). [[Fang2019MMWR]]`,
  pt:`Ring your emergency number instead of getting a lift. The crew can record your heart tracing on the way and warn the hospital.`,
  hook:`Only 53.4% (NRMI-2) to 60% (ACTION registry) of US heart attack patients arrived by ambulance. [[Canto2002,Mathews2011]]`},
 {from:.194,at:.24,k:'In the ambulance',t:'A 12-lead ECG, and the cath lab alerted',
  txt:`ESC 2023: <i>"an ECG should be performed within 10 min of FMC"</i> (first medical contact) and <i>"interpreted by a qualified emergency medical technician or physician within 10 min"</i>. [[Byrne2023ESC]] In a 2007 US registry only 27.4% of ambulance patients with STEMI had a prehospital ECG; when they did, median door-to-balloon time was 61 vs 75 minutes. [[Diercks2009]] In the UK audit MINAP, prehospital ECGs rose from 64% to 79% and went with more reperfusion and lower 30-day mortality (7.4% vs 8.2%). [[Quinn2014]] Activating the cath lab while the patient is still on the way cut door-to-balloon time by 15.4 minutes on average. [[Bradley2006]]`,
  pt:`The heart tracing is sent ahead, so the heart team is waiting at the door instead of being called after you arrive.`,
  hook:`ECG within 10 min of first medical contact (ESC 2023). [[Byrne2023ESC]]`},
 {from:.303,at:.62,k:'Arrival',t:'Through the door to an open artery',
  txt:`In 37,634 US STEMI patients, ambulance transport went with a shorter median time from symptoms to arrival (89 vs 120 minutes), a shorter door-to-balloon time (63 vs 76 minutes) and a shorter door-to-needle time (23 vs 29 minutes). [[Mathews2011]] ESC 2023: <i>"It is recommended that a regional reperfusion strategy is established"</i>, and ambulances should <i>"transport patients with a working diagnosis of STEMI to hospitals with a 24/7 service for PCI"</i>. [[Byrne2023ESC]] Watch the hearts: muscle keeps greying until the artery is opened.`,
  pt:`The ambulance route was faster at every stage: reaching hospital, and opening the artery once there.`,
  hook:`Ambulance vs own transport (medians): onset-to-door 89 vs 120 min; door-to-balloon 63 vs 76 min. [[Mathews2011]]`},
 {from:.76,at:.95,k:'If the heart stops',t:'Bystander CPR and defibrillators',
  txt:`A heart attack can cause cardiac arrest. In Sweden, 30-day survival after a witnessed arrest outside hospital was 10.5% when bystanders gave CPR before the ambulance came, against 4.0% without (adjusted OR 2.15). [[HasselqvistAx2015]] In the Resuscitation Outcomes Consortium, survival to discharge was 9% with bystander CPR but no AED, 24% when an AED was applied before EMS arrived and 38% when the AED gave a shock. [[Weisfeldt2010]] These are population statistics from separate studies.`,
  pt:`If someone collapses and is not breathing normally, calling for help, starting CPR and using a public defibrillator can more than double their chance of surviving. [[HasselqvistAx2015,Weisfeldt2010]]`,
  hook:`Bystander CPR roughly doubles the odds of 30-day survival (OR 2.15). [[HasselqvistAx2015]]`}
];

inits.call=()=>{
  const svg=$('#caSvg'),rg=$('#caT'),MM=210;
  const mOf=t=>MM*ramp(t,0,.74);
  const LANES=[
   {n:'Ambulance called',door:89,d2b:63,col:'var(--brand)',soft:'var(--brand-soft)',go:35,veh:caAmb,
    ev:[[35,'call'],[60,'ECG sent · lab alerted'],[89,'door'],[152,'artery open']]},
   {n:'Own transport',door:120,d2b:76,col:'var(--accent)',soft:'var(--accent-soft)',go:70,veh:caCar,
    ev:[[70,'sets off'],[120,'door'],[128,'first ECG'],[196,'artery open']]}];
  const status=(L,m)=>m<L.go?(L.go===35?'deciding to call':'waiting'):m<L.door?(L.go===35?'in the ambulance':'on the way'):m<L.door+L.d2b?'in hospital, heading to the cath lab':'artery open';
  function draw(t){
    const N=vb(svg,'720 380','400 522'),m=mOf(t);
    const G=N?{x0:16,w:296,hx:360,ya:98,yb:208,ax:256,pt:282,pb:514}:{x0:24,w:556,hx:652,ya:80,yb:170,ax:212,pt:238,pb:372};
    const X=v=>G.x0+G.w*v/MM;let s='';
    s+=`<text x="${G.x0}" y="18" class="t-sm">MINUTES FROM SYMPTOM ONSET</text><text x="${N?388:706}" y="${N?20:22}" class="t-end" style="font:800 ${N?20:24}px var(--display);fill:var(--ink)">${Math.round(m)} min</text>`;
    LANES.forEach((L,i)=>{const y=i?G.yb:G.ya,open=L.door+L.d2b,done=m>=open;
      s+=`<text x="${G.x0}" y="${y-(N?46:30)}" class="t-lbl" style="fill:${L.col}">${L.n}</text>`;
      s+=`<text x="${N?G.x0:G.x0+G.w}" y="${y-(N?32:30)}" class="t-xs${N?'':' t-end'}">door ${L.door} min · artery open ≈${open} min (medians end to end)</text>`;
      s+=`<line x1="${G.x0}" x2="${G.x0+G.w}" y1="${y}" y2="${y}" class="axis"/>`;
      s+=`<rect x="${f1(X(0))}" y="${y-6}" width="${f1(X(L.door)-X(0))}" height="12" rx="3" style="fill:${L.soft}"/>`;
      s+=`<rect x="${f1(X(L.door))}" y="${y-6}" width="${f1(X(open)-X(L.door))}" height="12" rx="3" style="fill:var(--rx-soft)"/>`;
      const pre=Math.min(m,L.door),inn=clamp(m-L.door,0,L.d2b);
      if(pre>0)s+=`<rect x="${f1(X(0))}" y="${y-6}" width="${f1(X(pre)-X(0))}" height="12" rx="3" style="fill:${L.col};opacity:.75"/>`;
      if(inn>0)s+=`<rect x="${f1(X(L.door))}" y="${y-6}" width="${f1(X(L.door+inn)-X(L.door))}" height="12" rx="3" style="fill:var(--rx);opacity:.8"/>`;
      L.ev.forEach(([v,lb],k)=>{const on=m>=v,ex=X(v),ly=y+(k%2?31:19);
        s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${y+6}" y2="${ly-8}" style="stroke:var(--muted);stroke-width:1;opacity:${on?1:.4}"/><text x="${f1(clamp(ex,G.x0+30,G.x0+G.w-30))}" y="${ly}" class="${N?'t-xs':'t-sm'} t-mid" style="${on?'fill:var(--ink);font-weight:600':'opacity:.55'}">${lb}</text>`});
      /* the actor */
      const ax=X(Math.min(m,L.door));
      if(m<L.go)s+=caWho(ax+2,y-10,1,.5+.5*Math.sin(m*.6));
      else if(m<L.door)s+=L.veh(ax,y-9,1);
      else{s+=caHosp(X(L.door),y-18,1);
        if(!done){const bx=X(L.door+inn);s+=`<circle cx="${f1(bx)}" cy="${y}" r="4.5" style="fill:var(--balloon);stroke:var(--panel);stroke-width:1.5"/>`}}
      if(L.go===35&&m>=35&&m<60)s+=caPhone(X(35),y-26,.8);
      /* the heart: muscle greys until the artery is opened (schematic) */
      const lost=1.85*Math.min(m,open)/MM;
      const H=heart(G.hx,y-4,N?.27:.31,{id:'caH'+i,terr:{lad:lost},occl:{a:'lad',at:.3,v:done?0:1},stent:done?{a:'lad',at:.3,v:1}:null});
      s+=H.svg;
      s+=`<text x="${G.hx}" y="${y+(N?34:38)}" class="t-xs t-mid" style="${done?'fill:var(--good);font-weight:700':''}">${done?'reperfused':m>0?'muscle at risk':''}</text>`;
    });
    const TL=tline(G.x0,G.ax,G.w,{min:0,max:MM,step:30,fmt:v=>v});s+=TL.svg;
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${G.ya-18}" y2="${G.ax}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3;opacity:.5"/>`;
    /* cardiac arrest panel */
    const g=ramp(t,.76,.93),act=t>=.74;
    s+=`<rect x="${N?6:12}" y="${G.pt}" width="${N?388:696}" height="${G.pb-G.pt}" rx="10" style="fill:var(--field);stroke:${act?'var(--brand)':'var(--line)'};stroke-width:${act?1.6:1}"/>`;
    s+=N?`<text x="16" y="${G.pt+20}" class="t-lbl">If the heart stops:</text><text x="16" y="${G.pt+36}" class="t-sm" style="fill:var(--ink)">survival after cardiac arrest outside hospital</text>`:`<text x="24" y="${G.pt+20}" class="t-lbl">If the heart stops: survival after cardiac arrest outside hospital</text>`;
    if(!N)s+=`<text x="700" y="${G.pt+20}" class="t-xs t-end">${act?'population statistics':'step 5 fills this panel'}</text>`;
    const groups=[
     {h:'Sweden · 30-day survival',rows:[['no CPR before EMS',4.0,'var(--muted)'],['bystander CPR',10.5,'var(--brand)']]},
     {h:'US & Canada · survival to discharge',rows:[['CPR, no AED',9,'var(--muted)'],['AED applied',24,'var(--brand)'],['AED gave a shock',38,'var(--good)']]}];
    groups.forEach((gr,gi)=>{
      const gx=N?16:(gi?372:24),gy=N?G.pt+62+gi*84:G.pt+46,lw=N?118:120,bw=N?226:(gi?200:200);
      s+=`<text x="${gx}" y="${gy}" class="t-sm" style="fill:var(--ink)">${gr.h}</text>`;
      gr.rows.forEach((r,k)=>{const ry=gy+14+k*21,w=bw*r[1]/40*g;
        s+=`<text x="${gx}" y="${ry+10}" class="t-xs">${r[0]}</text><rect x="${gx+lw}" y="${ry}" width="${bw}" height="13" rx="3" style="fill:var(--panel-2)"/>`;
        if(w>0)s+=`<rect x="${gx+lw}" y="${ry}" width="${f1(w)}" height="13" rx="3" style="fill:${r[2]}"/>`;
        s+=`<text x="${f1(gx+lw+Math.max(w,0)+5)}" y="${ry+10}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(g>0?1:.0)}">${r[1].toFixed(r[1]%1?1:0)}%</text>`});
    });
    if(!act&&N)s+=`<text x="${N?200:360}" y="${G.pb-(N?6:10)}" class="t-xs t-mid">Step 5 fills this panel</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CA_STEPS,t);setSt(p);
    $('#caNote').innerHTML=noteHTML(CA_STEPS[p]);
    $('#caRead').innerHTML=`<span>minute <b>${Math.round(m)}</b></span>${LANES.map(L=>`<span>${L.n.toLowerCase()}: <b>${status(L,m)}</b></span>`).join('')}`;
  }
  const stop=playWire(rg,$('#caPlay'),draw,26000,'Replay','call');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- chain of survival ---- */
  const CH=[
   {n:'Recognise',nn:'Recognise',h:'Recognise: collapse, not breathing normally',
    li:[`The 2025 AHA basic life support guideline begins with recognising cardiac arrest and activating the emergency response. [[Kleinman2025BLS]]`,
        `Before an arrest, heart attack symptoms are the warning: ESC 2023 names <i>"prolonged chest pain (&gt;15 min) and/or recurrent pain within 1 h"</i> as red flags for calling. [[Byrne2023ESC]]`,
        `Time from collapse to the start of CPR mattered: shorter times went with higher survival in the Swedish registry. [[HasselqvistAx2015]]`],
    pt:`If someone collapses and is not breathing normally, treat it as an emergency and get help at once.`},
   {n:'Call',nn:'Call',h:'Call: the dispatcher is part of the team',
    li:[`If you think you or someone else is having a heart attack, call your local emergency number now (911 in the US, 999 in the UK, 112 in the EU).`,
        `The 2025 AHA systems-of-care chapter describes an enhanced role for emergency telecommunicators (dispatchers) alongside lay rescuers and public defibrillators. [[Dezfulian2025Systems]]`,
        `In US survey data, 94.9% of adults knew to call 9-1-1 for a heart attack in 2017. [[Fang2019MMWR]]`],
    pt:`The person on the phone can tell you what to do while the ambulance is coming.`},
   {n:'CPR',nn:'CPR',h:'CPR: keeping blood moving',
    li:[`Bystanders started CPR before the ambulance in 51.1% of 30,381 witnessed arrests in Sweden; 30-day survival was 10.5% with early CPR vs 4.0% without (adjusted OR 2.15). [[HasselqvistAx2015]]`,
        `In Denmark, bystander CPR rose from 66.7% to 80.6% (2001–2012) and went with less brain damage or nursing-home admission among survivors at 1 year (HR 0.62). [[Kragholm2017]]`,
        `The AHA executive summary stresses high-quality chest compressions. [[DelRios2025AHA]] Hand position, rate, depth and hands-only CPR are taught in certified courses; this page does not restate the steps.`],
    pt:`CPR pushes blood to the brain and heart until a defibrillator and the ambulance arrive. Learn it in a certified course.`},
   {n:'Defibrillator',nn:'AED',h:'Defibrillator (AED): the shock that resets the rhythm',
    li:[`Survival to discharge was 9% with bystander CPR but no AED, 24% when an AED was applied before EMS arrived and 38% when it delivered a shock (adjusted OR for AED use 1.75). [[Weisfeldt2010]]`,
        `In Japan, public-access defibrillation rose from 1.1% to 16.5% of witnessed VF arrests (2005–2013); good neurological survival was 38.5% with it vs 18.2% without. [[Kitamura2016]]`,
        `Each minute to the first shock lowered the odds of a good outcome (adjusted OR 0.91 per minute): see the curve below. [[Kitamura2010]]`],
    pt:`A public defibrillator talks you through what to do. Survival was highest when one was used before the ambulance came.`},
   {n:'Advanced care',nn:'Advanced',h:'Advanced care: ambulance, hospital, cath lab',
    li:[`ESC 2023: resuscitated patients with persistent ST elevation <i>"should, in general, undergo a PPCI strategy (immediate ICA and PCI if indicated)"</i>. [[Byrne2023ESC]]`,
        `Without ST elevation, <i>"routine immediate ICA is not superior to a delayed invasive strategy"</i> (ESC 2023), based on COACT and TOMAHAWK. [[Byrne2023ESC,Lemkes2019COACT,Desch2021TOMAHAWK]]`,
        `See <a href="#complications" data-go="complications">Complications &amp; cardiogenic shock</a> for what follows.`],
    pt:`The ambulance team and the hospital take over: restarting the heart, then finding and opening the blocked artery.`}];
  const cs=$('#caChain');let ci=0;
  function vfPath(x,y,w,amp,seed){const r=rng(seed);let d='';for(let i=0;i<=60;i++){const u=i/60;d+=(i?'L':'M')+f1(x+u*w)+' '+f1(y+Math.sin(u*38+r()*2)*amp*(.5+r()*.6))}return d}
  function illo(k){let s='';const lab=(x,y,txt,c)=>`<text x="${x}" y="${y}" class="t-sm t-mid" style="${c?'fill:'+c+';font-weight:600':''}">${txt}</text>`;
    const lying=(x,y)=>`<circle cx="${x}" cy="${y}" r="10" style="fill:var(--skin);stroke:var(--muted)"/><rect x="${x+12}" y="${y-9}" width="70" height="18" rx="8" style="fill:var(--skin);stroke:var(--muted)"/><rect x="${x+80}" y="${y-6}" width="50" height="12" rx="6" style="fill:var(--skin);stroke:var(--muted)"/>`;
    if(k===0){s+=lying(80,120)+`<circle cx="130" cy="111" r="16" style="fill:none;stroke:var(--brand);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=lab(170,40,'collapsed · not breathing normally','var(--brand)')+lab(170,165,'recognise it as cardiac arrest');
      s+=`<path d="M150 50Q150 80 135 92" class="arrow"/>`}
    if(k===1){s+=caPhone(110,95,3)+`<text x="225" y="78" class="t-mid" style="font:800 26px var(--display);fill:var(--brand)">911</text><text x="225" y="108" class="t-mid" style="font:800 26px var(--display);fill:var(--brand)">999</text><text x="225" y="138" class="t-mid" style="font:800 26px var(--display);fill:var(--brand)">112</text>`;
      s+=lab(170,30,'call your local emergency number')+lab(170,170,'the dispatcher can guide you')}
    if(k===2){s+=lying(70,130)+`<rect x="118" y="96" width="30" height="12" rx="5" style="fill:var(--ink)"/><rect x="121" y="86" width="24" height="10" rx="4" style="fill:var(--ink);opacity:.75"/><path d="M133 52V80" class="arrow" marker-end="url(#caArr)"/>`;
      s+=lab(170,30,'learn CPR in a certified course','var(--brand)');
      s+=`<text x="230" y="70" class="t-xs">30-day survival</text><rect x="230" y="78" width="${f1(4.0*9)}" height="12" rx="3" style="fill:var(--muted)"/><text x="${f1(236+36)}" y="88" class="t-xs" style="fill:var(--ink)">4.0% no CPR</text><rect x="230" y="96" width="${f1(10.5*9)}" height="12" rx="3" style="fill:var(--brand)"/><text x="${f1(236+94.5)}" y="106" class="t-xs" style="fill:var(--ink)">10.5% CPR</text>`;
      s+=lab(170,172,'Sweden, witnessed arrests (population statistics)')}
    if(k===3){s+=`<rect x="20" y="50" width="70" height="80" rx="10" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.6"/><path d="M55 72c-6-8-18-4-14 6c3 7 14 14 14 14s11-7 14-14c4-10-8-14-14-6z" style="fill:var(--brand)"/><path d="M58 98l-6 10h8l-6 10" style="fill:none;stroke:var(--warn);stroke-width:2.4;stroke-linejoin:round"/>`;
      s+=`<rect x="105" y="58" width="225" height="64" rx="6" style="fill:var(--ecg-paper)"/><path d="${vfPath(110,90,90,12,4)}" style="fill:none;stroke:var(--ecg-ink);stroke-width:1.5"/><path d="M206 66l-6 14h9l-6 16" style="fill:none;stroke:var(--warn);stroke-width:2.6;stroke-linejoin:round"/>`;
      const tr=ecgTrace(214,100,112,{mm:2.4,hr:75,lw:1.4});s+=tr.svg;
      s+=lab(150,140,'chaotic rhythm (VF)')+lab(270,156,'shock → organised beats')+lab(170,30,'a public AED, applied before the ambulance','var(--good)')+lab(170,176,'survival 9% → 24% → 38% (CPR, AED applied, shock)')}
    if(k===4){s+=caAmb(60,100,2.2)+`<path d="M110 100H150" class="arrow" marker-end="url(#caArr)"/>`+caHosp(185,98,2.2)+`<path d="M220 100H255" class="arrow" marker-end="url(#caArr)"/>`;
      const A=artery(262,78,70,44,{plaque:.6,stent:1,ph:.3,seed:3});s+=A.svg;
      s+=lab(60,140,'EMS team')+lab(185,140,'hospital')+lab(297,140,'cath lab')+lab(170,30,'restart, stabilise, open the artery')}
    return s}
  function drawChain(){const N=vb(cs,'720 300','400 290');let s=`<defs>${marker('caArr','var(--muted)')}</defs>`;
    const lw=N?70:120,gap=N?7.5:14,x0=N?10:28,y0=N?14:22,lh=N?40:46;
    CH.forEach((c,i)=>{const x=x0+i*(lw+gap),on=i===ci,past=i<ci;
      if(i)s+=`<line x1="${x-gap-6}" x2="${x+6}" y1="${y0+lh/2}" y2="${y0+lh/2}" style="stroke:var(--muted);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<rect x="${x}" y="${y0}" width="${lw}" height="${lh}" rx="${lh/2}" class="clk" data-chs="${i}" style="fill:${on?'var(--brand-soft)':past?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--muted)'};stroke-width:${on?4:2.4}"/>`;
      s+=`<text x="${x+lw/2}" y="${y0+lh/2+4}" class="${N?'t-xs':'t-sm'} t-mid" style="fill:var(--ink);font-weight:${on?700:500};pointer-events:none">${N?c.nn:c.n}</text>`});
    const ox=N?30:190,oy=N?80:100;
    s+=`<rect x="${ox-10}" y="${oy-6}" width="360" height="${N?196:190}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<g transform="translate(${ox} ${oy})">${illo(ci)}</g>`;
    cs.innerHTML=s;
    const c=CH[ci];$('#caChainTxt').innerHTML=`<div class="kicker">Link ${ci+1} of 5</div><h4>${c.h}</h4><ul>${c.li.map(x=>`<li>${x}</li>`).join('')}</ul><div class="pt"><b>In plain words</b>${c.pt}</div>`;
    $$('#caChainBtns [data-ch]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ch===ci))}
  $('#caChainBtns').addEventListener('click',e=>{const b=e.target.closest('[data-ch]');if(!b)return;ci=+b.dataset.ch;drawChain()});
  cs.addEventListener('click',e=>{const r=e.target.closest('[data-chs]');if(!r)return;ci=+r.dataset.chs;drawChain()});
  drawChain();

  /* ---- minutes to first shock (Kitamura 2010: adjusted OR 0.91 per minute) ---- */
  const ss=$('#caShock'),mr=$('#caMin'),OR=.91;
  function drawShock(){const N=vb(ss,'720 260','400 330'),v=+mr.value,rel=Math.pow(OR,v);
    const B=N?{x:44,y:24,w:330,h:150}:{x:56,y:24,w:400,h:190};
    const C=curve(B.x,B.y,B.w,B.h,x=>Math.pow(OR,x),{x0:0,x1:10,y0:0,y1:1,col:'var(--good)',fill:true});let s=C.svg;
    for(let k=0;k<=10;k+=2)s+=`<text x="${f1(C.X(k))}" y="${B.y+B.h+14}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${B.x+B.w}" y="${B.y+B.h+28}" class="t-xs t-end">minutes from collapse to first shock</text>`;
    [0,.5,1].forEach(q=>s+=`<text x="${B.x-6}" y="${f1(C.Y(q)+3)}" class="t-xs t-end">${Math.round(q*100)}%</text>`);
    [[2.2,'≥4 AEDs/km²: mean 2.2 min'],[3.7,'fewer AEDs: mean 3.7 min']].forEach(([mm,lb],k)=>{const x=C.X(mm);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="${f1(x+4)}" y="${B.y+12+k*13}" class="t-xs" style="fill:var(--accent)">${lb}</text>`});
    const p=C.at(v);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="6" style="fill:var(--good);stroke:var(--panel);stroke-width:2"/>`;
    const px=N?44:490,py=N?222:40;
    s+=`<text x="${px}" y="${py}" class="t-sm">RELATIVE ODDS OF A GOOD OUTCOME</text><text x="${px}" y="${py+34}" style="font:800 32px var(--display);fill:var(--good)">${Math.round(rel*100)}%</text><text x="${px}" y="${py+52}" class="t-xs">of the odds with a shock at minute 0</text>`;
    const bw=N?330:210;s+=`<rect x="${px}" y="${py+62}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${px}" y="${py+62}" width="${f1(bw*rel)}" height="12" rx="3" style="fill:var(--good)"/>`;
    if(!N)s+=`<text x="${px}" y="${py+96}" class="t-xs">modelled: 0.91 × 0.91 × … once per minute</text>`;
    ss.innerHTML=s;
    mr.setAttribute('aria-valuetext',`${v.toFixed(1)} minutes: relative odds ${Math.round(rel*100)}%`);
    $('#caShockNote').innerHTML=noteHTML({k:`${v.toFixed(1)} minutes to the first shock`,t:'Every minute counts',
      txt:`In Japan's nationwide registry of witnessed arrests in ventricular fibrillation, each minute of delay to the first shock lowered the odds of surviving with good brain function (adjusted OR 0.91 per minute, 95% CI 0.89–0.92). Repeating that figure, a shock at ${v.toFixed(1)} minutes leaves about <b>${Math.round(rel*100)}%</b> of the odds of a shock at minute 0. Areas with 4 or more public AEDs per km² had a mean time to shock of 2.2 minutes, against 3.7 minutes elsewhere. [[Kitamura2010]]`,
      pt:`A defibrillator close by means an earlier shock, and an earlier shock means a better chance of recovering well.`,
      hook:`Public AED shock in Japan: 31.6% alive with minimal brain impairment at 1 month vs 14.4% of all such patients. [[Kitamura2010]]`})}
  mr.addEventListener('input',drawShock);drawShock();
  const prevR=redraws.call;redraws.call=()=>{prevR&&prevR();drawChain();drawShock()};
};
