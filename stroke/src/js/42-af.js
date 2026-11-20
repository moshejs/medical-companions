/* =============== 4.2 AF and antithrombotics =============== */
/* Widgets: AF to embolic stroke (main scrubber), CHA2DS2-VASc teaching calculator, warfarin icon array, DOAC forest
   (pvForest from module prevent), DOAC timing timeline, dual antiplatelet curve, appendage closure. */
const AF_STEPS=[
 {from:0,at:.07,k:'Step 1 · sinus rhythm',t:'A regular heartbeat',
  txt:'The strip shows a regular rhythm: each beat at the same interval, with a small wave from the atria before it. The atria squeeze in time and blood moves on through the heart. The drawing is schematic.',
  pt:'The top chambers of the heart squeeze in a steady rhythm.'},
 {from:.16,at:.27,k:'Step 2 · fibrillation',t:'The atria quiver',
  txt:'In atrial fibrillation (AF) the atria quiver and the beat becomes irregular. A state public health review describes AF as the causal mechanism of about 20% of acute ischaemic strokes [[Tai2023]].',
  pt:'An irregular heartbeat called atrial fibrillation can form clots that travel to the brain [[Hart2007]].',
  hook:'About 1 in 5 acute ischaemic strokes is attributed to AF in this review [[Tai2023]].'},
 {from:.34,at:.46,k:'Step 3 · a clot forms',t:'A clot in the appendage',
  txt:'The drawing puts the clot in the left atrial appendage, the pouch that closure devices seal off [[Reddy2014,Whitlock2021]]. Anticoagulants lower this risk a lot: adjusted-dose warfarin reduced stroke by 64% against control, and antiplatelets by 22% [[Hart2007]].',
  hook:'Warfarin 64%, antiplatelets 22% stroke reduction in AF [[Hart2007]].'},
 {from:.52,at:.62,k:'Step 4 · it breaks loose',t:'A piece leaves the heart',
  txt:'A fragment passes through the left ventricle and out through the aorta. The drawing shows the route only, not a measured event.',
  pt:'A piece of clot can break off and be carried along in the blood.'},
 {from:.68,at:.76,k:'Step 5 · the neck',t:'Up the neck arteries',
  txt:'From the aorta the fragment follows the arterial blood up the neck towards the brain. Module 1.2 shows the vessels, and module 1.4 sets cardioembolism among the other causes of ischaemic stroke.',
  pt:'The blood carries the clot up to the brain, where the arteries get narrower.'},
 {from:.83,at:.95,k:'Step 6 · the block',t:'A brain artery is blocked',
  txt:'The clot lodges in a middle cerebral artery, flow stops beyond it and tissue is injured. The centre is the core and the amber rim is the penumbra (module 1.3). A previous thromboembolism is one of the two 2-point items in the score below [[Olesen2011]].',
  pt:'Part of the brain loses its blood supply. If you think someone is having a stroke, call your local emergency number [[Harbison2003,Ekundayo2013]].'}];
const AF_CHAIN=['Regular rhythm','Atria quiver: AF','Clot in the appendage','Clot leaves the heart','Up the neck arteries','Brain artery blocked'];
/* score rows: [value, 1-year thromboembolism per 100 person-years] [[Olesen2011]] */
const AF_RATE=[.78,2.01,3.71,5.92,9.27,15.26,19.74,21.50,22.38,23.64];
const AF_ITEMS=[{id:'chf',l:'Heart failure',p:1},{id:'htn',l:'Hypertension',p:1},{id:'dm',l:'Diabetes',p:1},{id:'pte',l:'Previous thromboembolism',p:2},{id:'vas',l:'Vascular disease',p:1}];
const AF_WAR={w:{k:36,n:'Warfarin',txt:'Adjusted-dose warfarin reduced stroke by 64% (49 to 74) vs control, in 6 trials and 2900 participants [[Hart2007]].'},a:{k:78,n:'Antiplatelets',txt:'Antiplatelets reduced stroke by 22% (6 to 35) vs control. Warfarin beat antiplatelets by 39% (22 to 52) [[Hart2007]].'}};
const AF_DOAC=[
 {l:'Stroke or systemic embolism',txt:'RR 0.81 (0.73 to 0.91)',v:.81,lo:.73,hi:.91},
 {l:'Haemorrhagic stroke',txt:'RR 0.49 (0.38 to 0.64)',v:.49,lo:.38,hi:.64},
 {l:'Intracranial haemorrhage',txt:'RR 0.48 (0.39 to 0.59)',v:.48,lo:.39,hi:.59},
 {l:'All-cause mortality',txt:'RR 0.90 (0.85 to 0.95)',v:.90,lo:.85,hi:.95},
 {l:'Gastrointestinal bleeding',txt:'RR 1.25 (1.01 to 1.55)',v:1.25,lo:1.01,hi:1.55}];
const AF_TIME=[
 {l:'ELAN, minor',e:[0,2],d:[3,4],r:''},
 {l:'ELAN, moderate',e:[0,2],d:[6,7],r:'all ELAN: 2.9% vs 4.1%, 30 days'},
 {l:'ELAN, major',e:[6,7],d:[12,14],r:''},
 {l:'TIMING',e:[0,4],d:[5,10],r:'6.89% vs 8.68%, 90 days'},
 {l:'OPTIMAS',e:[0,4],d:[7,14],r:'3.3% in each group, 90 days'},
 {l:'CATALYST, pooled',e:[0,4],d:[5,14],open:1,r:'2.1% vs 3.0%, 30 days'}];
const AF_DUR=[ ['CHANCE',21],['POINT',90],['THALES',30],['CHANCE-2',21] ];
const AF_LAA={
 pro:{n:'PROTECT AF',cmp:'warfarin',bars:[ ['Primary event, per 100 patient-years',2.3,3.8] ],
  txt:'707 people, device vs warfarin. Rate ratio 0.60; cardiovascular mortality HR 0.40 (0.21 to 0.75) [[Reddy2014]]. Pooled with PREVAIL at 5 years, the composite (HR 0.820) and all stroke or embolism (HR 0.961) were not significant. Ischaemic stroke or embolism was numerically higher with closure (HR 1.71, p=0.080). Haemorrhagic stroke (HR 0.20) and post-procedure bleeding (HR 0.48) favoured closure [[Reddy2017]].'},
 laa:{n:'LAAOS III',cmp:'no closure',bars:[ ['Stroke or embolism, %',4.8,7.0] ],
  txt:'Closure added during cardiac surgery, with most people staying on anticoagulation. HR 0.67 (0.53 to 0.85) [[Whitlock2021]]. This tests closure on top of anticoagulants, not instead of them.'},
 opt:{n:'OPTION',cmp:'anticoagulant',bars:[ ['Non-procedural bleeding, %',8.5,18.1],['Death, stroke or embolism, %',5.3,5.8] ],
  txt:'1600 people after catheter ablation, 36 months. Superior on bleeding and noninferior on death, stroke or embolism [[Wazni2025]].'},
 cha:{n:'CHAMPION-AF',cmp:'NOAC',bars:[ ['Non-procedural bleeding, %',10.9,19.0],['CV death, stroke or embolism, %',5.7,4.8] ],
  txt:'3000 people suitable for anticoagulation. At 3 years the efficacy difference was 0.9 points (-0.8 to 2.6), noninferior with a 4.8-point margin. Bleeding HR 0.55 [[Doshi2026]].'},
 clo:{n:'CLOSURE-AF',cmp:'best medical care',bars:[ ['Primary composite, per 100 patient-years',16.8,13.3],['Serious adverse events, %',82.5,77.4] ],
  txt:'912 people in Germany, mean age 77.9, CHA2DS2-VASc 5.2, HAS-BLED 3.0. Closure was not noninferior (P=0.44) [[Landmesser2026]].'}};
inits.af=()=>{
  /* ---------- AF to stroke ---------- */
  const svg=$('#afSvg'),rg=$('#afT');
  const R=Array.from({length:8},(_,i)=>i*49.5),I=[0,38,108,154,182,244,288,362];
  function ecg(x,y,w,h,af,sh){const id='afEcgClip';let d='';const bt=R.map((r,i)=>lerp(r,I[i],af));
    for(let px=0;px<=w;px+=1.5){const u=((px+sh)%396+396)%396;let dm=1e9;bt.forEach(b=>{[b,b+396,b-396].forEach(c=>{if(Math.abs(u-c)<Math.abs(dm))dm=u-c})});
      const a=Math.abs(dm);let v=a<4?(1-a/4)*h*.42:0;if(dm>4&&dm<8)v-=h*.08*(1-af);if(dm<-11&&dm>-21)v+=(1-af)*h*.1*Math.sin((dm+21)/10*Math.PI);
      if(af>0)v+=af*(Math.sin(px*.9+sh*.2)*1.6+Math.sin(px*.37)*1.2);d+=(px?'L':'M')+f1(x+px)+' '+f1(y+h*.62-v)}
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:var(--field);stroke:var(--line)"/><path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linejoin:round"/>`}
  function draw(t){const N=vb(svg,'720 468','400 672'),bx=N?60:70,by=6,bs=.95,hs=.8,hx=bx+104.5-83.2,hy=280;
    const afv=ease(ramp(t,.16,.26)),th=ease(ramp(t,.34,.46)),em=ramp(t,.52,.67),neck=ramp(t,.68,.82),les=ease(ramp(t,.84,.97)),block=t>=.82,ph=t*5;
    const ex=[hx+104*hs,hy],m0=[bx+110*bs,by+206*bs],mE=[bx+101*bs,by+158*bs];
    let s='';
    s+=brainSide(bx,by,bs,{vessels:block?{occl:'m1',flow:1,ph}:{flow:1,ph},lesion:les>0?{core:34*les,penumbra:66*les,saved:0,mca:true}:null}).svg;
    /* the neck artery */
    s+=`<path d="M${f1(ex[0])} ${f1(ex[1]+4)}C${f1(ex[0]+8)} ${f1(ex[1]-26)} ${f1(m0[0]-8)} ${f1(m0[1]+26)} ${f1(m0[0])} ${f1(m0[1])}" style="fill:none;stroke:var(--artery-line);stroke-width:8"/><path d="M${f1(ex[0])} ${f1(ex[1]+4)}C${f1(ex[0]+8)} ${f1(ex[1]-26)} ${f1(m0[0]-8)} ${f1(m0[1]+26)} ${f1(m0[0])} ${f1(m0[1])}" style="fill:none;stroke:var(--artery);stroke-width:6"/>`;
    s+=kitLabel(ex[0]+12,(ex[1]+m0[1])/2+3,'neck artery');
    s+=heartAF(hx,hy,hs,{af:afv,ph:t*.6,thrombus:th*(em>=1?.65:1),embolus:em>0&&em<1?em:0,labels:true}).svg;
    if(neck>0&&!block){const P=[[ex[0],ex[1]],[ex[0]+3,ex[1]-20],[m0[0]-3,m0[1]+20],m0,[bx+108*bs,by+180*bs],mE],C=crPts(P,false,8),i=Math.min(C.length-1,Math.floor(neck*(C.length-1))),q=C[i];s+=clot(q[0],q[1],11,{seed:3})}
    /* rhythm strip, chain */
    const ex0=N?16:420,ew=N?368:286,ey=N?486:34;
    s+=`<text x="${ex0}" y="${ey-8}" class="t-sm" style="fill:var(--ink)">rhythm strip, schematic: ${afv>.5?'irregular':'regular'}</text>`+ecg(ex0,ey,ew,58,afv,t*2400);
    const cx=N?16:420,cy=N?572:128,crh=N?17:36,p=phaseOf(AF_STEPS,t);
    AF_CHAIN.forEach((l,i)=>{const y=cy+i*crh,on=i===p,past=i<p;
      if(i)s+=`<line x1="${cx+7}" x2="${cx+7}" y1="${y-crh+7}" y2="${y-7}" style="stroke:var(--line);stroke-width:2"/>`;
      s+=`<circle cx="${cx+7}" cy="${y}" r="${N?6:7}" style="fill:${on?'var(--bad)':past?'var(--muted)':'var(--panel)'};stroke:var(--muted);stroke-width:1.4"/><text x="${cx+22}" y="${y+4}" class="${on?'t-lbl':'t-sm'}">${l}</text>`});
    if(!N)s+=`<text x="420" y="372" class="t-big" style="font-size:24px">about 20%</text><text x="420" y="390" class="t-sm">of acute ischaemic strokes, as described</text><text x="420" y="405" class="t-sm">in a state public health review</text>`;
    svg.innerHTML=s;setSt(p);$('#afNote').innerHTML=noteHTML(AF_STEPS[p])}
  const stop=playWire(rg,$('#afPlay'),draw,18000,'Replay','af');
  const setSt=stepWire($('#afSteps'),AF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the calculator ---------- */
  const cs=$('#afCalc'),st={chf:false,htn:true,dm:false,pte:false,vas:false,age:'65',sex:'m',va:false};let shown=2,cStop=null;
  const score=()=>{let v=0;AF_ITEMS.forEach(i=>{if(st[i.id])v+=i.p});if(st.age==='65')v+=1;if(st.age==='75')v+=2;return {va:v,vasc:v+(st.sex==='f'?1:0)}};
  function drawCalc(p){const N=vb(cs,'720 270','400 270'),S=score(),x0=N?34:50,w=N?356:650,bw=w/10,y0=32,h=178,mx=25,Y=v=>y0+h-h*v/mx,cur=lerp(shown,S.vasc,p);let s='';
    s+=`<text x="${N?4:x0-6}" y="16" class="t-xs">thromboembolism per 100 person-years at 1 year${N?'':', by CHA2DS2-VASc, not on a vitamin K antagonist'}</text>`;
    [0,10,20].forEach(v=>{s+=`<line x1="${x0}" x2="${x0+w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    AF_RATE.forEach((r,i)=>{const on=!st.va&&Math.abs(i-cur)<.5,x=x0+i*bw;
      s+=`<rect x="${f1(x+3)}" y="${f1(Y(r))}" width="${f1(bw-6)}" height="${f1(y0+h-Y(r))}" rx="3" style="fill:${on?'var(--prev)':'var(--panel-2)'};stroke:${on?'var(--ink)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${f1(Y(r)-5)}" class="t-xs t-mid" style="fill:var(--ink)${on?';font-weight:700':''}">${N?r.toFixed(1):r.toFixed(2)}</text><text x="${f1(x+bw/2)}" y="${y0+h+15}" class="t-sm t-mid" style="fill:var(--ink)${on?';font-weight:700':''}">${i}</text>`});
    s+=`<text x="${x0+w}" y="${y0+h+32}" class="t-xs t-end">CHA2DS2-VASc score. Danish hospital cohort: rates run high.</text>`;
    if(st.va)s+=`<text x="${x0+4}" y="${y0+22}" class="t-lbl">CHA2DS2-VA has no rate column here: no bar is lit.</text>`;
    cs.innerHTML=s}
  function outCalc(){const S=score(),r=AF_RATE[S.vasc];
    $('#afCalcOut').innerHTML=st.va
     ?`<div class="kicker">ESC 2024 approach</div><h4>CHA2DS2-VA: ${S.va} of 8</h4><p>The same items without the sex point, so the maximum falls to 8 (derived from the item list) [[Olesen2011,ClueEspuny2025]]. The 2024 ESC/EACTS guideline indicates CHA2DS2-VA as a replacement when no locally validated tool exists. That comes from a paper describing the guideline, because the guideline itself could not be read here [[ClueEspuny2025,VanGelder2024]]. Rates by CHA2DS2-VA and ESC treatment thresholds could not be confirmed here, so none is shown.</p>`
     :`<div class="kicker">How the scale scores these inputs</div><h4>CHA2DS2-VASc: ${S.vasc} of 9</h4><p>In the Danish cohort, a score of ${S.vasc} went with <b>${r.toFixed(2)}</b> thromboembolic events per 100 person-years at 1 year [[Olesen2011]]. With the sex point removed, this person scores CHA2DS2-VA ${S.va}.</p><div class="callout"><p><b>A broader outcome than stroke.</b> This count includes peripheral embolism, ischaemic stroke and pulmonary embolism, in people admitted to hospital. So it runs higher than stroke rates alone [[Olesen2011]].</p></div>`}
  function setCalc(){const S=score();$$('[data-afc]').forEach(b=>b.setAttribute('aria-pressed',!!st[b.dataset.afc]));$$('[data-afa]').forEach(b=>b.setAttribute('aria-pressed',st.age===b.dataset.afa));$$('[data-afs]').forEach(b=>b.setAttribute('aria-pressed',st.sex===b.dataset.afs));$$('[data-afm]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.afm==='va')===st.va));
    outCalc();if(cStop)cStop();const from=shown;cStop=animate(350,p=>{shown=from;drawCalc(p)},()=>{shown=S.vasc;cStop=null;drawCalc(0)})}
  $('#afItems').innerHTML=AF_ITEMS.map(i=>`<button class="btn" data-afc="${i.id}" aria-pressed="false">${i.l} +${i.p}</button>`).join('');
  $('#afCalcBox').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;if(d.afc)st[d.afc]=!st[d.afc];else if(d.afa)st.age=d.afa;else if(d.afs)st.sex=d.afs;else if(d.afm)st.va=d.afm==='va';else return;setCalc()});
  shown=score().vasc;setCalc();drawCalc(0);

  /* ---------- warfarin ---------- */
  const ws=$('#afWar');let wk='w',wStop=null;
  function drawWar(p){const N=vb(ws,'720 244','400 470'),D=AF_WAR[wk],A=N?[100,34]:[60,40],B=N?[100,264]:[420,40],z=14;
    const k=Math.round(lerp(100,D.k,ease(p)));
    let s=`<text x="${A[0]}" y="${A[1]-12}" class="t-sm" style="fill:var(--ink)">without treatment: 100 strokes</text><text x="${B[0]}" y="${B[1]-12}" class="t-sm" style="fill:var(--ink)">${D.n}: ${k} strokes</text>`;
    s+=icons(A[0],A[1],{n:100,cols:10,k:100,size:z,gap:4,col:'var(--core)',shape:'dot'}).svg+icons(B[0],B[1],{n:100,cols:10,k,size:z,gap:4,col:'var(--core)',shape:'dot'}).svg;
    ws.innerHTML=s}
  function setWar(k){wk=k;$$('[data-afw]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.afw===k));$('#afWarNote').innerHTML=AF_WAR[k].txt;if(wStop)wStop();wStop=animate(1000,drawWar,()=>{wStop=null})}
  $$('[data-afw]').forEach(b=>b.addEventListener('click',()=>setWar(b.dataset.afw)));
  $('#afWarNote').innerHTML=AF_WAR.w.txt;drawWar(1);

  /* ---------- DOAC forest ---------- */
  const fs=$('#afFor');let fi=0;
  const AF_DN=['DOACs prevented more stroke and embolism than warfarin','Haemorrhagic stroke was about halved','Intracranial haemorrhage was about halved','Mortality was lower','Gastrointestinal bleeding was higher'];
  function drawFor(p){const N=vb(fs,'720 182','400 272'),F=pvForest(4,AF_DOAC,{N,W:N?400:720,p,sel:fi,rh:26,min:.35,max:1.75,ticks:[.5,1,1.5],lo:'lower with a DOAC',hi:'higher with a DOAC'});fs.innerHTML=F.svg;$('#afForNote').innerHTML=`${AF_DN[fi]}: ${AF_DOAC[fi].txt}, DOACs vs warfarin, 71 683 participants [[Ruff2014]].`}
  pvRows(fs,'data-fr',i=>{fi=i;drawFor(1)});drawFor(1);

  /* ---------- timing ---------- */
  const ts=$('#afTime'),trg=$('#afTimeT');
  function drawTime(t){const N=vb(ts,'720 290','400 396'),x0=N?12:136,w=N?376:340,X=d=>x0+w*d/14,y0=N?48:44,rh=N?52:36,day=t*14;let s='';
    s+=`<rect x="${N?12:136}" y="8" width="18" height="10" rx="2" style="fill:var(--tpa)"/><text x="${N?34:158}" y="17" class="t-xs" style="fill:var(--ink)">earlier start</text><rect x="${N?120:250}" y="8" width="18" height="10" rx="2" style="fill:var(--panel);stroke:var(--device);stroke-width:1.5;stroke-dasharray:3 2"/><text x="${N?142:272}" y="17" class="t-xs" style="fill:var(--ink)">later start</text>`;
    [0,2,4,6,8,10,12,14].forEach(d=>{const x=X(d);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y0-6}" y2="${y0+rh*6}" class="grid"/><text x="${f1(x)}" y="${y0+rh*6+14}" class="t-xs t-mid">${d}</text>`});
    s+=`<text x="${x0+w}" y="${y0+rh*6+28}" class="t-xs t-end">days after the stroke</text>`;
    if(!N)s+=`<text x="492" y="${y0-14}" class="t-xs">composite, earlier vs later</text>`;
    const cx=X(day);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${y0-10}" y2="${y0+rh*6}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    AF_TIME.forEach((r,i)=>{const y=y0+i*rh,by=N?y+18:y+2,bh=N?10:9,bar=(a,solid,yy)=>{const e=Math.min(day,a[1]);if(e<=a[0])return `<rect x="${f1(X(a[0]))}" y="${yy}" width="${f1(X(a[1])-X(a[0]))}" height="${bh}" rx="2" style="fill:none;stroke:var(--line);stroke-width:1"/>`;
        return `<rect x="${f1(X(a[0]))}" y="${yy}" width="${f1(X(a[1])-X(a[0]))}" height="${bh}" rx="2" style="fill:none;stroke:var(--line);stroke-width:1"/><rect x="${f1(X(a[0]))}" y="${yy}" width="${f1(X(e)-X(a[0]))}" height="${bh}" rx="2" style="${solid?'fill:var(--tpa)':'fill:var(--panel);stroke:var(--device);stroke-width:1.5;stroke-dasharray:3 2'}"/>`};
      s+=`<text x="${N?12:8}" y="${N?y+11:y+14}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${r.l}</text>`;
      if(r.r)s+=`<text x="${N?388:492}" y="${N?y+11:y+14}" class="t-sm${N?' t-end':''}" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${r.r}</text>`;
      s+=bar(r.e,true,by)+bar(r.d,false,by+bh+2);
      if(r.open&&day>=13.5)s+=`<text x="${f1(X(14)+3)}" y="${by+bh+11}" class="t-xs">${N?'':'or later'}</text>`});
    ts.innerHTML=s}
  playWire(trg,$('#afTimePlay'),drawTime,9000,'Replay','af');drawTime(+trg.value);

  /* ---------- dual antiplatelet curve ---------- */
  const ds=$('#afDapt'),drg=$('#afDaptT');
  const fC=monoFn([ [0,0],[21,7.8],[90,9.1] ]),fD=monoFn([ [0,0],[21,5.2],[90,6.5] ]);
  function drawDapt(t){const N=vb(ds,'720 356','400 490'),L=N?{x:66,y:22,w:318,h:190,by:252,rx:16,ry:366}:{x:74,y:22,w:420,h:200,by:264,rx:520,ry:44},up=t*90;
    const C=curve(L.x,L.y,L.w,L.h,fC,{x0:0,x1:90,y0:0,y1:10,upto:up,col:'var(--device)'});
    let s=C.svg;const xw=C.X(21);
    s+=`<rect x="${L.x}" y="${L.y}" width="${f1(xw-L.x)}" height="${L.h}" style="fill:var(--tpa);opacity:.14"/><text x="${f1(L.x+6)}" y="${L.y+14}" class="t-xs" style="fill:var(--ink)">first 21 days</text>`;
    let d='';const n=120;for(let i=0;i<=n;i++){const v=up*i/n;d+=(i?'L':'M')+f1(C.X(v))+' '+f1(C.Y(fD(v)))}
    if(up>0)s+=`<path d="${d}" style="fill:none;stroke:var(--tpa);stroke-width:2.8;stroke-linejoin:round"/><circle cx="${f1(C.X(up))}" cy="${f1(C.Y(fD(up)))}" r="5" style="fill:var(--tpa);stroke:var(--panel);stroke-width:2"/><circle cx="${f1(C.X(up))}" cy="${f1(C.Y(fC(up)))}" r="5" style="fill:var(--device);stroke:var(--panel);stroke-width:2"/>`;
    [0,5,10].forEach(v=>{s+=`<text x="${L.x-6}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v}%</text>`});
    s+=`<text x="${L.x}" y="${L.y-8}" class="t-xs">cumulative stroke or major ischaemic event (pooled CHANCE and POINT)</text>`.replace('cumulative stroke or major ischaemic event (pooled CHANCE and POINT)',N?'events, pooled CHANCE and POINT':'cumulative events, pooled CHANCE and POINT');
    if(up>=40){s+=`<text x="${f1(C.X(90)-4)}" y="${f1(C.Y(9.1)-8)}" class="t-sm t-end" style="fill:var(--ink)">aspirin alone</text><text x="${f1(C.X(90)-4)}" y="${f1(C.Y(6.5)+16)}" class="t-sm t-end" style="fill:var(--ink)">dual therapy</text>`}
    /* how long each trial gave dual therapy */
    s+=`<text x="${L.x}" y="${L.by-6}" class="t-xs">days of dual therapy in each trial, same day scale</text>`;
    AF_DUR.forEach(([l,dd],i)=>{const y=L.by+i*19;s+=`<text x="${L.x-6}" y="${y+10}" class="t-xs t-end" style="fill:var(--ink)">${l}</text><rect x="${L.x}" y="${y+1}" width="${f1(C.X(dd)-L.x)}" height="11" rx="3" style="fill:var(--tpa);opacity:.7"/><text x="${f1(C.X(dd)+5)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${dd}</text>`});
    const axY=L.y+L.h+12;[21,90].forEach(v=>{s+=`<text x="${f1(C.X(v))}" y="${axY}" class="t-xs t-mid">day ${v}</text>`});
    const col=(x,y,h,a,b,g)=>`<text x="${x}" y="${y}" class="t-lbl">${h}</text><text x="${x}" y="${y+18}" class="t-sm">aspirin alone ${a}%</text><text x="${x}" y="${y+33}" class="t-sm">dual therapy ${b}%</text><text x="${x}" y="${y+50}" class="t-sm" style="fill:var(--ink);font-weight:700">gap ${g} points</text>`;
    if(up>=21)s+=col(L.rx,L.ry,'At day 21','7.8','5.2','2.6');
    if(up>=89.5)s+=N?col(208,L.ry,'At day 90','9.1','6.5','2.6'):col(L.rx,L.ry+84,'At day 90','9.1','6.5','2.6');
    if(!N&&up>=89.5)s+=`<text x="${L.rx}" y="${L.ry+160}" class="t-sm" style="fill:var(--ink)">The gap opens early, then</text><text x="${L.rx}" y="${L.ry+175}" class="t-sm" style="fill:var(--ink)">stops growing.</text>`;
    ds.innerHTML=s}
  playWire(drg,$('#afDaptPlay'),drawDapt,9000,'Replay','af');drawDapt(+drg.value);

  /* ---------- closure ---------- */
  const ls=$('#afLaa'),lrg=$('#afLaaT');let lk='cha';
  function drawLaa(t){const N=vb(ls,'720 290','400 430'),hs=1.15,hx=N?70:16,hy=8,D=AF_LAA[lk],T=(a,b)=>[hx+a*hs,hy+b*hs];
    const go=ease(ramp(t,.1,.6)),open=ease(ramp(t,.55,.85));
    let s=heartAF(hx,hy,hs,{af:.5,ph:t*.4,thrombus:.75,labels:true}).svg;
    const a=T(118,72),b=T(162,63),p=[lerp(a[0],b[0],go),lerp(a[1],b[1],go)],r=lerp(2,11,open)*hs;
    s+=`<path d="M${f1(a[0]-46)} ${f1(a[1]+22)}L${f1(p[0])} ${f1(p[1])}" style="fill:none;stroke:var(--device);stroke-width:2.2;opacity:${f1(1-ramp(t,.85,1))}"/>`;
    s+=`<g transform="rotate(-24 ${f1(p[0])} ${f1(p[1])})"><path d="M${f1(p[0]-3)} ${f1(p[1]-r)}Q${f1(p[0]+r*1.1)} ${f1(p[1])} ${f1(p[0]-3)} ${f1(p[1]+r)}Z" style="fill:var(--device);stroke:var(--ink);stroke-width:1"/></g>`;
    if(open>.9)s+=kitLabel(p[0]-4,p[1]+r+16,'device',{a:'m'});
    const bx=N?16:300,bw=N?230:290,by0=N?290:46;
    s+=`<text x="${bx}" y="${by0-20}" class="t-lbl">${D.n}: device vs ${D.cmp}</text>`;
    const q=ease(ramp(t,.3,.9));
    D.bars.forEach((r0,i)=>{const y=by0+i*72,mx=Math.max(r0[1],r0[2])*1.05;
      s+=`<text x="${bx}" y="${y}" class="t-sm" style="fill:var(--ink)">${r0[0]}</text><rect x="${bx}" y="${y+6}" width="${f1(bw*r0[1]/mx*q)}" height="16" rx="3" style="fill:var(--tpa)"/><text x="${f1(bx+bw*r0[1]/mx*q+5)}" y="${y+18}" class="t-sm" style="fill:var(--ink)">device ${r0[1].toFixed(1)}</text><rect x="${bx}" y="${y+26}" width="${f1(bw*r0[2]/mx*q)}" height="16" rx="3" style="fill:var(--device)"/><text x="${f1(bx+bw*r0[2]/mx*q+5)}" y="${y+38}" class="t-sm" style="fill:var(--ink)">${D.cmp} ${r0[2].toFixed(1)}</text>`});
    ls.innerHTML=s;$('#afLaaNote').innerHTML=`<div class="kicker">${D.n}</div><p>${D.txt}</p>`}
  const lstop=playWire(lrg,$('#afLaaPlay'),drawLaa,6000,'Replay','af');
  $('#afLaaBtns').innerHTML=Object.keys(AF_LAA).map(k=>`<button class="btn" data-afl="${k}" aria-pressed="${k===lk}">${AF_LAA[k].n}</button>`).join('');
  $('#afLaaBtns').addEventListener('click',e=>{const b=e.target.closest('[data-afl]');if(!b)return;lstop();lk=b.dataset.afl;$$('[data-afl]').forEach(c=>c.setAttribute('aria-pressed',c===b));drawLaa(+lrg.value)});
  drawLaa(+lrg.value);
  const pr=redraws.af;redraws.af=()=>{pr&&pr();drawCalc(0);drawWar(1);drawFor(1)};
};
