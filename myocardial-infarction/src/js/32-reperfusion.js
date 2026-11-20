/* =============== 3.2 Reperfusion: PCI & clot-busting drugs =============== */
function rpAmb(x,y,s=1,col='var(--brand)'){/* ambulance facing right, centred on (x,y) */
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-17" y="-10" width="22" height="16" rx="2" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><path d="M5 -6H12L17 0V6H5Z" style="fill:var(--panel);stroke:${col};stroke-width:1.6;stroke-linejoin:round"/><path d="M-6 -6V2M-10 -2H-2" style="stroke:${col};stroke-width:2.4"/><circle cx="-10" cy="7" r="3" style="fill:var(--ink)"/><circle cx="11" cy="7" r="3" style="fill:var(--ink)"/></g>`}
function rpBldg(x,y,s=1,col='var(--rx)',big=false){
  const w=big?44:30,h=big?34:26;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="3" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/><path d="M0 ${-h+6}V${-h+18}M-6 ${-h+12}H6" style="stroke:${col};stroke-width:3"/>${big?`<rect x="-16" y="-9" width="8" height="9" style="fill:${col};opacity:.4"/><rect x="8" y="-9" width="8" height="9" style="fill:${col};opacity:.4"/>`:''}</g>`}

const RP_MAX=200;
const RP_STEPS=[
 {from:0,at:.02,k:'Minute 0 · the ECG diagnosis',t:'Two patients, one decision',
  txt:`Two people have a STEMI diagnosed on the ECG at the same moment, at a hospital without a cath lab. ESC 2023 prefers primary PCI <i>"provided it can be performed in a timely manner (i.e. within 120 min of the ECG-based diagnosis"</i>, and states <i>"If PPCI is not feasible within 120 min, patients should undergo immediate fibrinolysis"</i>. Reperfusion applies <i>"provided the patient has presented within 12 h of symptom onset"</i>. [[Byrne2023ESC]] Change the transfer time above and watch the verdict.`,
  pt:`Doctors open a blocked heart artery in one of two ways: a thin tube with a tiny balloon and a mesh tube (stent), usually through the wrist, or clot-dissolving medicine. [[Keeley2003,Valgimigli2015MATRIX]]`,
  hook:`ESC 2023: primary PCI if it can be done within 120 min of the ECG-based diagnosis; otherwise fibrinolysis within 10 min of diagnosis. [[Byrne2023ESC]]`},
 {from:.038,at:.07,k:'Minute 10 · fibrinolysis',t:'The clot-dissolving drug',
  txt:`ESC 2023: <i>"The goal is to start fibrinolytic therapy within 10 min of the STEMI diagnosis."</i> [[Byrne2023ESC]] The drug works best early: across 22 trials, 65 lives were saved per 1000 treated in the first hour after symptoms began, 37 at 1–2 hours and 26–29 at 2–6 hours, and the proportional reduction in death was 44% within 2 hours against 20% later. [[Boersma1996]] The main risk is bleeding in the brain: about 4 extra strokes per 1000 on the first day. [[FTT1994]] In ISIS-2, streptokinase cut 5-week vascular death from 12.0% to 9.2%. [[ISIS2_1988]]`,
  pt:`The drug dissolves the clot from the inside. It works best in the first hours, but it does not always work, and it can cause bleeding.`,
  hook:`The golden hour: 65 lives saved per 1000 treated in the first hour vs 26–29 per 1000 at 2–6 h. [[Boersma1996]]`},
 {from:.124,at:.2,k:'Minutes 0–30 · door-in to door-out',t:'Moving the PCI patient fast',
  txt:`ESC 2023: <i>"a door-in to door-out time of ≤30 min is recommended to expedite reperfusion therapy"</i>. [[Byrne2023ESC]] In DANAMI-2 (1572 patients), moving people from referral hospitals for angioplasty beat on-site fibrinolysis for death, reinfarction or disabling stroke at 30 days (8.5% vs 14.2%); 96% were transferred within 2 hours, and the gain came mainly from less reinfarction (1.6% vs 6.3%). [[Andersen2003DANAMI2]] The advantage of PCI shrinks as the extra delay it needs grows; the break-even point depended on age, symptom duration and infarct location. [[Pinto2006]]`,
  pt:`Being moved to a bigger hospital for the balloon was still better than the drug, as long as the trip was quick.`,
  hook:`Door-in to door-out at a non-PCI hospital: ≤30 min (ESC 2023). [[Byrne2023ESC]]`},
 {from:.418,at:.5,k:'At the PCI centre',t:'Balloon and stent',
  txt:`A thin wire crosses the clot, a balloon presses it and the plaque back against the wall, and a stent holds the artery open. In 23 randomised trials, primary angioplasty beat fibrinolysis for short-term death (7% vs 9%), non-fatal reinfarction (3% vs 7%) and stroke (1% vs 2%), whichever drug was used and whether or not patients were transferred. [[Keeley2003]] ESC 2023 lists <i>"Radial artery approach as default vascular access"</i>. [[Byrne2023ESC]] Routine clot suction did not help in TOTAL or TASTE. [[Jolly2015TOTAL,Frobert2013TASTE]]`,
  pt:`A thin tube is passed, usually from the wrist, to the blocked artery. A tiny balloon opens it and a mesh tube (stent) keeps it open.`,
  hook:`Keeley 2003 (23 RCTs): death 7% vs 9%, reinfarction 3% vs 7%, stroke 1% vs 2% for primary PCI vs fibrinolysis. [[Keeley2003]]`},
 {from:.618,at:.85,k:'After the drug',t:'Angiography in 2–24 hours, or rescue PCI',
  txt:`ESC 2023: after fibrinolysis <i>"routine early angiography (i.e. within 2–24 h) is recommended"</i>, and <i>"rescue PCI is indicated if fibrinolysis fails"</i>. [[Byrne2023ESC]] In STREAM, 36.3% of the fibrinolysis group needed emergency angiography because the drug had failed; the rest had angiography at a median of 17 hours. [[Armstrong2013STREAM]] Tick <b>Fibrinolysis fails</b> above to see the rescue route. In CAPTIM, prehospital fibrinolysis and primary angioplasty gave 30-day composites of 8.2% vs 6.2%, a difference that was not significant. [[Bonnefoy2002CAPTIM]]`,
  pt:`Even when the drug works, the person is moved to a PCI centre for an angiogram within a day. If it does not work, they go straight away for rescue PCI.`,
  hook:`After fibrinolysis: routine angiography within 2–24 h, rescue PCI if it fails (ESC 2023). [[Byrne2023ESC]]`}
];

inits.reperfusion=()=>{
  const svg=$('#rpSvg'),rg=$('#rpT'),dsel=$('#rpDist'),fail=$('#rpFail');
  const mOf=t=>RP_MAX*ramp(t,0,.95);
  function plan(){const D=+dsel.value,F=fail.checked;
    const A={leave:30,arr:30+D,open:45+D};
    const B=F?{lyt:10,leave:60,arr:60+D,open:75+D}:{lyt:10,leave:60,arr:60+D,open:null};
    return {D,F,A,B}}
  function verdict(){const P=plan(),ok=P.A.open<=120;const v=$('#rpVerdict');
    v.className='verdict '+(ok?'yes':'no');
    v.innerHTML=ok?`With a ${P.D}-minute transfer, primary PCI could open the artery about ${P.A.open} minutes after diagnosis: within the 120 minutes in which ESC 2023 prefers primary PCI. [[Byrne2023ESC]]`
      :`With a ${P.D}-minute transfer, PCI would come about ${P.A.open} minutes after diagnosis: beyond 120 minutes. ESC 2023: "If PPCI is not feasible within 120 min, patients should undergo immediate fibrinolysis". [[Byrne2023ESC]]`}
  function draw(t){
    const N=vb(svg,'720 400','400 640'),m=mOf(t),P=plan(),A=P.A,B=P.B;
    const M=N?{bx:6,by:26,bw:388,bh:276,L:[66,262],C:[318,92],c1:[160,252],c2:[240,96]}:{bx:12,by:30,bw:424,bh:362,L:[82,322],C:[366,118],c1:[190,312],c2:[262,124]};
    const bz=u=>{const q=1-u;return[0,1].map(j=>q*q*q*M.L[j]+3*q*q*u*M.c1[j]+3*q*u*u*M.c2[j]+u*u*u*M.C[j])};
    let s=`<text x="${M.bx}" y="16" class="t-sm">MINUTES SINCE THE ECG DIAGNOSIS</text><text x="${N?394:712}" y="${N?18:20}" class="t-end" style="font:800 ${N?20:24}px var(--display);fill:var(--ink)">${Math.round(m)} min</text>`;
    /* the map */
    s+=`<rect x="${M.bx}" y="${M.by}" width="${M.bw}" height="${M.bh}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    for(let i=1;i<5;i++){s+=`<line x1="${M.bx}" x2="${M.bx+M.bw}" y1="${f1(M.by+M.bh*i/5)}" y2="${f1(M.by+M.bh*i/5+18)}" style="stroke:var(--panel-2);stroke-width:5"/>`;
      s+=`<line x1="${f1(M.bx+M.bw*i/5)}" x2="${f1(M.bx+M.bw*i/5-24)}" y1="${M.by}" y2="${M.by+M.bh}" style="stroke:var(--panel-2);stroke-width:5"/>`}
    const road=`M${M.L.join(' ')}C${M.c1.join(' ')} ${M.c2.join(' ')} ${M.C.join(' ')}`;
    s+=`<path d="${road}" style="fill:none;stroke:var(--line);stroke-width:16;stroke-linecap:round"/><path d="${road}" style="fill:none;stroke:var(--panel);stroke-width:1.6;stroke-dasharray:6 6"/>`;
    const mid=bz(.5);s+=`<text x="${f1(mid[0]+18)}" y="${f1(mid[1]+4)}" class="t-sm" style="fill:var(--ink)">${P.D} min by ambulance</text>`;
    s+=rpBldg(M.L[0],M.L[1]+4,1.1,'var(--accent)')+`<text x="${M.L[0]}" y="${M.L[1]-34}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">hospital without PCI</text>`;
    s+=rpBldg(M.C[0],M.C[1]-6,1.1,'var(--rx)',true)+`<text x="${N?M.bx+M.bw-8:M.C[0]}" y="${M.C[1]-50}" class="t-xs ${N?'t-end':'t-mid'}" style="fill:var(--ink);font-weight:600">PCI centre · cath lab 24/7</text>`;
    /* the two ambulances */
    const veh=(R,off,col,tag)=>{let u=null;if(R.open!==null||tag==='B'){if(m>=R.leave&&m<R.arr)u=(m-R.leave)/(R.arr-R.leave)}
      if(u===null){const at=m<R.leave?M.L:M.C;return m<R.leave?rpAmb(at[0]-40,at[1]+(tag==='B'?12:-14),.8,col):rpAmb(at[0]-48,at[1]+off,.8,col)}
      const p=bz(u);return rpAmb(p[0],p[1]+off,.9,col)};
    s+=veh(A,-14,'var(--brand)','A')+veh(B,16,'var(--rx)','B');
    s+=`<g transform="translate(${M.bx+12} ${M.by+18})"><rect width="10" height="10" rx="2" style="fill:var(--brand)"/><text x="15" y="9" class="t-xs" style="fill:var(--ink)">A · transfer for primary PCI</text><rect y="16" width="10" height="10" rx="2" style="fill:var(--rx)"/><text x="15" y="25" class="t-xs" style="fill:var(--ink)">B · fibrinolysis first${P.F?' (fails → rescue)':''}</text></g>`;
    /* insets: the artery and its clock */
    const IN=N?[{x:6,y:312,w:388,h:154},{x:6,y:476,w:388,h:154}]:[{x:448,y:30,w:264,h:174},{x:448,y:218,w:264,h:174}];
    [A,B].forEach((R,i)=>{const b=IN[i],isA=i===0,col=isA?'var(--brand)':'var(--rx)';
      let clot=1,bal=0,st=0,stat='',lyt=0;
      if(isA){if(m<R.leave)stat='door-in to door-out';else if(m<R.arr)stat='in the ambulance';else if(m<R.open-5)stat='into the cath lab: wire across';else if(m<R.open)stat='balloon inflating';else stat=`stent in: open at ${R.open} min`;
        bal=bump(m,R.open-6,R.open+1);st=ramp(m,R.open-2,R.open);clot=1-ramp(m,R.open-5,R.open)}
      else{const L0=R.lyt;lyt=m>=L0&&m<R.leave+10?1:0;
        if(!P.F){clot=1-.88*ease(ramp(m,L0,L0+45));stat=m<L0?'drug being prepared':m<R.leave?'drug in: clot dissolving':m<R.arr?'transfer for angiography':'angiography within 2–24 h'}
        else{clot=1-.12*ramp(m,L0,L0+40);
          if(m<L0)stat='drug being prepared';else if(m<R.leave)stat='drug in: clot persists';else if(m<R.arr)stat='failed: rescue PCI transfer';else if(m<R.open)stat='rescue PCI: balloon';else stat=`rescue stent: open at ${R.open} min`;
          if(m>=R.arr){bal=bump(m,R.open-6,R.open+1);st=ramp(m,R.open-2,R.open);clot=clot*(1-ramp(m,R.open-5,R.open))}}}
      s+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/>`;
      s+=`<text x="${b.x+12}" y="${b.y+20}" class="t-lbl" style="fill:${col}">${isA?'A · primary PCI':'B · fibrinolysis first'}</text>`;
      const aw=N?250:176,ah=N?70:72,ax=b.x+10,ay=b.y+32;
      const Ar=artery(ax,ay,aw,ah,{plaque:.7,px:.55,cap:.35,rupture:.6,clot:clamp(clot),balloon:bal,stent:st,ph:m*.06,seed:11});
      s+=Ar.svg;
      if(lyt){const r=rng(Math.floor(m*3));for(let k=0;k<9;k++){const u=((k/9)+m*.04)%1,px=ax+6+u*(Ar.at.cx-ax-6),py=lerp(Ar.at.top+4,Ar.at.bot-4,r());s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.2" style="fill:var(--rx);opacity:.9"/>`}}
      const cx=N?b.x+b.w-40:b.x+b.w-34,cy=b.y+70,over=m>120;
      s+=clock(cx,cy,24,Math.min(m,RP_MAX),{full:120,col:over?'var(--bad)':col,ticks:12});
      s+=`<text x="${cx}" y="${cy+38}" class="t-xs t-mid">of 120 min</text>`;
      s+=`<text x="${b.x+12}" y="${b.y+b.h-34}" class="t-sm" style="fill:var(--ink);font-weight:600">${stat}</text>`;
      let tg;if(isA){const done=m>=R.open;tg=`target: PCI ≤120 min after diagnosis${done?(R.open<=120?'  ✓ met':'  ✗ missed'):''}`}
      else tg=!P.F&&m>=R.arr?'drug ≤10 min ✓ · angiography in 2–24 h':`target: drug started ≤10 min${m>=R.lyt?'  ✓ met':''}`;
      s+=`<text x="${b.x+12}" y="${b.y+b.h-14}" class="t-xs">${tg}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(RP_STEPS,t);setSt(p);$('#rpNote').innerHTML=noteHTML(RP_STEPS[p]);
    $('#rpRead').innerHTML=`<span>minute <b>${Math.round(m)}</b></span><span>PCI artery open <b>${A.open} min</b></span><span>drug started <b>${B.lyt} min</b></span>${P.F?`<span>rescue PCI open <b>${B.open} min</b></span>`:''}`;
    rg.setAttribute('aria-valuetext',`${Math.round(m)} minutes since diagnosis`);
  }
  const stop=playWire(rg,$('#rpPlay'),draw,24000,'Replay','reperfusion');
  const setSt=stepWire($('#rpSteps'),RP_STEPS,rg,draw,stop);
  const upd=()=>{verdict();draw(+rg.value)};
  dsel.addEventListener('change',()=>{stop();upd()});fail.addEventListener('change',()=>{stop();upd()});
  upd();

  /* ---- Keeley 2003 icon arrays ---- */
  const KO=[
   {n:'Short-term death',p:7,l:9,txt:`Short-term death was 7% with primary angioplasty vs 9% with fibrinolysis (p = 0.0002). Without the SHOCK trial's patients it was 5% vs 7%. The benefit held at long-term follow-up, whichever fibrinolytic was used and whether or not patients were transferred. [[Keeley2003]]`,hook:`Primary PCI vs fibrinolysis, short-term death: 7% vs 9%. [[Keeley2003]]`},
   {n:'Non-fatal reinfarction',p:3,l:7,txt:`Non-fatal reinfarction, a new heart attack, was 3% vs 7% (p &lt; 0.0001). A drug can dissolve the clot but leaves the narrowed plaque behind; a stent treats the narrowing too. In DANAMI-2, too, the gain from transfer for angioplasty came mainly from less reinfarction (1.6% vs 6.3%). [[Keeley2003,Andersen2003DANAMI2]]`,hook:`Reinfarction 3% vs 7% (Keeley 2003). [[Keeley2003]]`},
   {n:'Stroke',p:1,l:2,txt:`Stroke was 1% vs 2% (p = 0.0004). Fibrinolysis carries a risk of bleeding in the brain: about 4 extra strokes per 1000 on days 0–1 in the trialists' overview. [[Keeley2003,FTT1994]]`,hook:`Stroke 1% vs 2%; haemorrhagic stroke is the main risk of fibrinolysis. [[Keeley2003,FTT1994]]`},
   {n:'Combined endpoint',p:8,l:14,txt:`The combined endpoint of death, non-fatal reinfarction and stroke was 8% vs 14% (p &lt; 0.0001). This is why primary PCI is preferred when it can be done in time. [[Keeley2003,Byrne2023ESC]]`,hook:`Combined death, reinfarction or stroke: 8% vs 14%. [[Keeley2003]]`}];
  const ks=$('#rpIcons');let ko=0,kf=1,kstop=null;
  function drawK(){const N=vb(ks,'720 280','400 520'),o=KO[ko];let s='';
    const G=N?[{x:112,y:62},{x:112,y:318}]:[{x:88,y:62},{x:452,y:62}];
    [['Primary PCI',o.p,'var(--brand)'],['Fibrinolysis',o.l,'var(--rx)']].forEach(([nm,v,col],i)=>{const g=G[i];
      s+=`<text x="${g.x}" y="${g.y-34}" class="t-lbl">${nm}</text><text x="${g.x+180}" y="${g.y-30}" class="t-end" style="font:800 22px var(--display);fill:${col}">${v} in 100</text><text x="${g.x}" y="${g.y-16}" class="t-xs">${o.n.toLowerCase()}</text>`;
      s+=icons(g.x,g.y,{n:100,cols:10,k:Math.round(v*kf),size:14,gap:4,col,base:'var(--line)'}).svg});
    if(!N)s+=`<text x="360" y="160" class="t-mid" style="font:800 20px var(--display);fill:var(--muted)">vs</text>`;
    ks.innerHTML=s;
    $('#rpKoNote').innerHTML=noteHTML({k:'Keeley 2003 · 23 randomised trials · 7739 patients',t:o.n,txt:o.txt,
      pt:`When the balloon-and-stent procedure can be done quickly, it works better than clot-dissolving medicine. When it cannot be done quickly, the medicine is given first. [[Keeley2003,Byrne2023ESC]]`,hook:o.hook});
    $$('#rpKo [data-ko]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ko===ko))}
  $('#rpKo').addEventListener('click',e=>{const b=e.target.closest('[data-ko]');if(!b)return;ko=+b.dataset.ko;kstop&&kstop();kstop=animate(700,p=>{kf=ease(p);drawK()},()=>{kstop=null})});
  drawK();

  /* ---- delay costs: Rathore 2009 and Boersma 1996 ---- */
  const RP_RAT=[[30,3.0],[60,3.5],[90,4.3],[120,5.6],[150,7.0],[180,8.4]],RP_BOE=[['0–1 h',65],['1–2 h',37],['2–3 h',26],['3–6 h',29]];
  const fr=monoFn(RP_RAT),ds=$('#rpDelay'),dr=$('#rpD2B');
  function drawD(){const N=vb(ds,'720 300','400 560'),v=+dr.value,y=fr(v);
    const B=N?{x:44,y:52,w:336,h:180}:{x:52,y:52,w:340,h:190};
    let s=`<text x="${B.x-36}" y="22" class="t-sm" style="fill:var(--ink)">PRIMARY PCI · in-hospital mortality (adjusted)</text>`;
    const C=curve(B.x,B.y,B.w,B.h,fr,{x0:30,x1:180,y0:0,y1:10,col:'var(--brand)',fill:true});s+=C.svg;
    [0,2,4,6,8,10].forEach(q=>s+=`<text x="${B.x-6}" y="${f1(C.Y(q)+3)}" class="t-xs t-end">${q}%</text>`);
    RP_RAT.forEach(([x,yy])=>{const p=[C.X(x),C.Y(yy)];s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.6" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.6"/><text x="${f1(p[0])}" y="${B.y+B.h+14}" class="t-xs t-mid">${x}</text>`});
    s+=`<text x="${B.x+B.w}" y="${B.y+B.h+28}" class="t-xs t-end">door-to-balloon, minutes</text>`;
    const x90=C.X(90);s+=`<line x1="${f1(x90)}" x2="${f1(x90)}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--accent);stroke-dasharray:4 3"/><text x="${f1(x90+4)}" y="${B.y+12}" class="t-xs" style="fill:var(--accent)">earlier US target ≤90</text>`;
    const p=C.at(v);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${B.x+8}" y="${B.y+40}" style="font:800 28px var(--display);fill:var(--brand)">${y.toFixed(1)}%</text><text x="${B.x+8}" y="${B.y+56}" class="t-xs">at ${v} min</text>`;
    /* Boersma bars */
    const G=N?{x:60,y:330,w:300,h:150}:{x:450,y:52,w:250,h:190};
    s+=`<text x="${N?16:G.x-10}" y="${N?G.y-28:22}" class="t-sm" style="fill:var(--ink)">FIBRINOLYSIS · lives saved per 1000 treated</text>`;
    const bw=G.w/4;RP_BOE.forEach(([lb,val],k)=>{const h=G.h*val/70,x=G.x+k*bw+bw*.15;
      s+=`<rect x="${f1(x)}" y="${f1(G.y+G.h-h)}" width="${f1(bw*.7)}" height="${f1(h)}" rx="3" style="fill:var(--rx);opacity:${k?.55:1}"/><text x="${f1(x+bw*.35)}" y="${f1(G.y+G.h-h-5)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${val}</text><text x="${f1(x+bw*.35)}" y="${G.y+G.h+14}" class="t-xs t-mid">${lb}</text>`});
    s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h}" y2="${G.y+G.h}" class="axis"/><text x="${G.x+G.w}" y="${G.y+G.h+28}" class="t-xs t-end">time from symptom onset</text>`;
    ds.innerHTML=s;
    dr.setAttribute('aria-valuetext',`${v} minutes: ${y.toFixed(1)}% adjusted in-hospital mortality`);
    $('#rpDelayNote').innerHTML=noteHTML({k:`Door-to-balloon ${v} min`,t:'Delay and death go together',
      txt:`In 43,801 US patients treated with primary PCI, adjusted in-hospital mortality rose with door-to-balloon time: 3.0% at 30 minutes, 4.3% at 90, 5.6% at 120 and 8.4% at 180. Between the published points the line is drawn; at ${v} minutes it reads about <b>${y.toFixed(1)}%</b>. [[Rathore2009]] In 1791 primary angioplasty patients, each 30 minutes of delay carried a relative risk of 1.075 for death at 1 year. [[DeLuca2004]] For fibrinolysis the gradient is steepest in the first hour. [[Boersma1996]]`,
      pt:`Survival numbers here come from large groups of people. They cannot predict what will happen to any one person.`,
      hook:`De Luca 2004: "every minute of delay counts": RR 1.075 for 1-year death per 30 min. [[DeLuca2004]]`})}
  dr.addEventListener('input',drawD);drawD();
  const prevR=redraws.reperfusion;redraws.reperfusion=()=>{prevR&&prevR();drawK();drawD()};
};
