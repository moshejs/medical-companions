/* =============== 4.1 diagnosis & the acr/eular score =============== */
const DX_U=59.48; /* µmol/L per mg/dL */
/* the eight scored domains of the 2015 criteria, in table order; g = clinical, laboratory, imaging */
const DX_DOM=[
 {id:'joint',n:'Joint pattern',sn:'joint',g:'c'},{id:'traits',n:'Episode features',sn:'features',g:'c'},{id:'course',n:'Time course',sn:'course',g:'c'},{id:'tophus',n:'Tophus',sn:'tophus',g:'c'},
 {id:'urate',n:'Serum urate',sn:'urate',g:'l'},{id:'fluid',n:'Fluid without MSU',sn:'fluid',g:'l'},{id:'img',n:'US or DECT urate',sn:'US/DECT',g:'i'},{id:'eros',n:'X-ray erosion',sn:'erosion',g:'i'}];
const DX_GC={c:'var(--terra)',l:'var(--gold)',i:'var(--sea)'};
const DX_UR={none:null,u0:-4,u1:0,u2:2,u3:3,u4:4};
const dxUrCat=v=>v<4?'u0':v<6?'u1':v<8?'u2':v<10?'u3':'u4';
/* worked examples from the research file (weights from Neogi 2015; illustrative, not study patients) */
const DX_EX={
 pod:{joint:2,tr:3,course:2,toph:0,ur:8.5,fluid:0,img:0,ero:0,fl:0},
 first:{joint:2,tr:3,course:1,toph:0,ur:5.5,fluid:0,img:0,ero:0,fl:1},
 retest:{joint:2,tr:3,course:1,toph:0,ur:7.2,fluid:0,img:0,ero:0,fl:0},
 knee:{joint:0,tr:2,course:1,toph:0,ur:5.0,fluid:-2,img:0,ero:0,fl:0},
 toph:{joint:2,tr:3,course:2,toph:1,ur:9,fluid:0,img:1,ero:0,fl:0}
};
const DX_EXNOTE={
 pod:`Classic podagra: 2 + 3 + 2 + 3 = <b>10</b>. Classified without fluid or imaging. [[Neogi2015]]`,
 first:`First flare, urate 5.5 mg/dL (327 µmol/L) measured during the flare: 2 + 3 + 1 + 0 = <b>6</b>. Not classified, yet. [[Neogi2015]]`,
 retest:`The same person retested 6 weeks later at 7.2 mg/dL (428 µmol/L): 2 + 3 + 1 + 2 = <b>8</b>. Now classified. The highest value counts. [[Neogi2015]]`,
 knee:`Knee in an older woman, fluid examined without MSU crystals: 0 + 2 + 1 + 0 − 2 = <b>1</b>. Think of CPP crystal arthritis. [[Neogi2015]]`,
 toph:`Tophaceous gout: 2 + 3 + 2 + 4 + 3 + 4 = <b>18</b>. [[Neogi2015]]`
};
const DX_JN=[['male','Male sex',2],['prev','Previous arthritis attack (patient-reported)',2],['onset','Onset within 1 day',.5],['red','Joint redness',1],['mtp','First MTP involved',2.5],['cv','Hypertension or at least 1 cardiovascular disease',1.5],['ua','Serum uric acid above 5.88 mg/dL (above 350 µmol/L)',3.5]];
const DX_JB=[{k:'low',l:'Low',r:'≤4',lo:0,hi:4,p:2.2,c:'var(--sea)'},{k:'mid',l:'Intermediate',r:'>4 to <8',lo:4,hi:8,p:31.2,c:'var(--warn)'},{k:'high',l:'High',r:'≥8',lo:8,hi:13,p:82.5,c:'var(--terra)'}];
function dxBars(rows){
  return rows.map(r=>`<div class="dx-pr"><span class="lbl">${r.l}</span><div class="dx-bars">
    <span>sens</span><i><b style="width:${(r.s*100).toFixed(1)}%;background:var(--terra)"></b></i><span>${r.s.toFixed(2)}</span>
    <span>spec</span><i><b style="width:${(r.p*100).toFixed(1)}%;background:var(--sea)"></b></i><span>${r.p.toFixed(2)}</span>
    <span>AUC</span><i><b style="width:${(r.a*100).toFixed(1)}%;background:var(--muted)"></b></i><span>${r.a.toFixed(2)}</span></div></div>`).join('');
}
/* ---------- the polarised microscope ---------- */
const DX_MS=[
 {from:0,at:0,k:'Compensator 0°',t:'Needles along the slow axis are yellow',
  txt:`Under a compensated polarised microscope the background is red-magenta. MSU needles lying parallel to the slow axis of the red compensator look yellow, and those lying across it look blue. That is strong negative birefringence. [[Zhang2016SciRep,Ragab2017]]`,
  pt:'Gout crystals are thin needles. Lined up with the marked direction, they shine yellow.',
  hook:`MSU: needle, <b>strongly negative</b>: <b>yellow when parallel</b> to the compensator's slow axis, blue when perpendicular. [[Zhang2016SciRep,Ragab2017]]`},
 {from:.14,at:.25,k:'Compensator 45°',t:'At 45° the colours fade',
  txt:`The colour depends on the angle between the crystal and the slow axis, not on the crystal alone. A needle at 45° to the slow axis takes the background colour and almost disappears. Crystals can also sit inside white cells, and a report should say whether they are intracellular or extracellular. [[Ragab2017,Jokic2020]]`,
  pt:'Turn the filter and the same needle changes colour. Halfway between, it nearly vanishes.',
  hook:`A good report states <b>birefringence</b> (strong or weak), <b>shape</b>, <b>intra- or extracellular</b> and <b>number per high-power field</b>. [[Jokic2020]]`},
 {from:.38,at:.5,k:'Compensator 90°',t:'Turn 90°: the colours swap',
  txt:`With the slow axis turned through 90°, every needle that was yellow is now blue, and the blue ones are yellow. Reading the colour only makes sense once the slow-axis direction is known. [[Zhang2016SciRep,Ragab2017]]`,
  pt:'The colour is a clue only when you know which way the filter points.'},
 {from:.62,at:.75,k:'Compare',t:'CPP: the opposite colours, and fainter',
  txt:`CPP crystals are positively birefringent: blue when parallel to the slow axis, yellow when across it. They are rod-like, rhomboid or square, and their birefringence is weak, so the colours are pale. [[Jokic2020,Ragab2017,Rosenthal2016]]`,
  pt:'The crystals of a similar disease, CPPD, look like small blocks with paler, opposite colours.',
  hook:`CPP: rhomboid, <b>weakly positive</b>: <b>blue when parallel</b>. Mnemonic for the two: needle, negative, yellow parallel. [[Jokic2020,Rosenthal2016]]`},
 {from:.88,at:1,k:'Compensator 180°',t:'Training matters',
  txt:`A full half-turn brings the field back to the start. Trained observers agree well: kappa 0.93 for MSU and 0.79 for CPP. In an online test of mixed readers, only 23% called all 22 non-MSU images non-MSU. [[Lumbreras2005,Berendsen2017]]`,
  pt:'Reading crystals is a skill. Trained eyes are very reliable; untrained ones much less so.',
  hook:`Trained MSU identification: sensitivity 95.3%, specificity 97.2%. [[Lumbreras2005]]`}
];
/* ---------- the diagnostic pathway ---------- */
const DX_PL=[.02,.27,.52,.77];
const DX_PATH=[
 {from:0,at:.12,k:'Step 1',t:'A hot joint: exclude infection first',
  txt:`Septic arthritis can look like a gout flare, and the two can occur together. Fever had a sensitivity of only 57% for septic arthritis, so its absence does not exclude infection. Risk factors include older age, diabetes, RA, joint surgery, a hip or knee prosthesis, skin infection and HIV. [[Margaretten2007,Shah2007]] Shoulder sepsis in crystal arthritis was bacteraemic in 90%. [[Papanicolas2012]]`,
  pt:'A hot, swollen joint with fever or chills needs a doctor the same day.',
  hook:`Crystals do not exclude infection: 1.5–5% of crystal-positive joints are also septic. [[Shah2007,Papanicolas2012]]`},
 {from:DX_PL[1],at:.37,k:'Step 2',t:'Aspirate and look for crystals',
  txt:`EULAR 2018 recommends a search for crystals in every person with suspected gout, because MSU crystals give a definite diagnosis. [[Richette2020]] The synovial white count and neutrophil share guide care before the Gram stain and culture come back. [[Margaretten2007,Mathews2010]] The ACP 2017 primary-care guideline advises fluid analysis when clinical judgement says testing is needed (weak recommendation). [[Qaseem2017Dx]]`,
  pt:'A little fluid from the joint, checked under a special microscope, gives the clearest answer.',
  hook:`EULAR 2006: crystal identification in symptomatic gout had a likelihood ratio of 567. [[Zhang2006Dx]]`},
 {from:DX_PL[2],at:.62,k:'Step 3',t:'No crystals? Score and image',
  txt:`Where crystals cannot be sought, atypical presentations should be imaged, especially with ultrasound for the double-contour sign and tophi. Gout should not be diagnosed on hyperuricaemia alone. [[Richette2020]] The ACR/EULAR score uses the highest urate, ideally measured more than 4 weeks after the flare began. [[Neogi2015]] In primary care the Janssens rule gives a probability band. [[Janssens2010,Kienhorst2015]]`,
  pt:'Without fluid, doctors combine the story, the blood urate and a scan.'},
 {from:DX_PL[3],at:.9,k:'Step 4',t:'Screen what travels with gout',
  txt:`EULAR strongly recommends assessing every person with gout for comorbidities, cardiovascular risk factors and causes of chronic hyperuricaemia. [[Richette2020]] Among US adults with gout (NHANES 2007–2008): hypertension 74%, CKD stage 2 or higher 71%, obesity 53%, diabetes 26%, kidney stones 24%, myocardial infarction 14%, heart failure 11%, stroke 10%. [[Zhu2012]] The ACR 2020 guideline advises HLA-B*5801 testing before allopurinol in people of Southeast Asian descent and African American people. [[FitzGerald2020]]`,
  pt:'After diagnosis, ask to have your blood pressure, kidneys, blood sugar and heart risk checked.',
  hook:`ACR 2020 strongly recommends urate-lowering therapy for tophi, radiographic damage or frequent flares, with a target under 6 mg/dL (360 µmol/L). [[FitzGerald2020]]`}
];
const DX_CO=[['hypertension',74],['CKD stage ≥2',71],['obesity',53],['diabetes',26],['kidney stones',24],['heart attack',14],['heart failure',11],['stroke',10]];
inits.dx=()=>{
  /* ================= polarised microscope ================= */
  const ms=$('#dxMsSvg'),mr=$('#dxMsT');let msShow='both';
  /* crystals in unit-disc coordinates, placed once with a fixed seed so the field never jumps */
  const R=rng(4101),X=[];
  const place=(minD)=>{for(let k=0;k<400;k++){const a=R()*Math.PI*2,r=Math.sqrt(R())*.86,u=Math.cos(a)*r,v=Math.sin(a)*r;if(X.every(p=>Math.hypot(p.u-u,p.v-v)>minD))return[u,v]}return[R()*.8-.4,R()*.8-.4]};
  [0,90,0,90,15,75,105,165,0,90,35,140,60,120].forEach(a=>{const[u,v]=place(.2);X.push({k:'n',u,v,a,l:.15+R()*.07})});
  [[20,110],[0,90],[60,150]].forEach(([a,b])=>{const[u,v]=place(.26);X.push({k:'c',u,v,a,b})});
  [0,90,0,90,30,120,60,150,10,100].forEach(a=>{const[u,v]=place(.17);X.push({k:'r',u,v,a,s:.06+R()*.025})});
  /* compensated light: c = cos 2θ between crystal long axis and slow axis; MSU (negative) is yellow at c > 0,
     CPP (positive) is the reverse, and weaker */
  const col=(a,ang,sign,str)=>{const c=Math.cos(2*(a-ang)*Math.PI/180)*sign;return{c,o:Math.abs(c)*str,k:c>0?'var(--dx-yel)':'var(--dx-blu)'}};
  function drawMs(t){
    const ang=t*180,N=vb(ms,'720 400','330 552');
    const F=N?{cx:165,cy:162,r:150}:{cx:206,cy:200,r:186};
    const P=N?{cx:56,cy:400,r:40,lx:116,ly:370}:{cx:520,cy:86,r:52,lx:430,ly:214};
    const sc=F.r;let s=`<defs><clipPath id="dxMsClip"><circle cx="${F.cx}" cy="${F.cy}" r="${F.r}"/></clipPath>${marker('dxMsA','var(--ink)')}</defs>`;
    s+=`<circle cx="${F.cx}" cy="${F.cy}" r="${F.r+7}" style="fill:var(--dx-rim)"/><circle cx="${F.cx}" cy="${F.cy}" r="${F.r}" style="fill:var(--dx-mag)"/>`;
    s+=`<g clip-path="url(#dxMsClip)">`;
    const showN=msShow!=='cpp',showR=msShow!=='msu';
    X.forEach(p=>{const x=F.cx+p.u*sc,y=F.cy+p.v*sc;
      if(p.k==='n'&&showN){const L=p.l*sc,C=col(p.a,ang,1,1);s+=needle(x,y,L,p.a,.55,'var(--dx-magd)')+needle(x,y,L,p.a,C.o,C.k)}
      if(p.k==='c'&&showN){s+=neutro(x,y,sc*.1,.92);[p.a,p.b].forEach((a,i)=>{const C=col(a,ang,1,1),dx=(i?-1:1)*sc*.025;s+=needle(x+dx,y+dx*.6,sc*.11,a,.6,'var(--dx-magd)')+needle(x+dx,y+dx*.6,sc*.11,a,C.o,C.k)})}
      if(p.k==='r'&&showR){const S=p.s*sc,C=col(p.a,ang,-1,.6);s+=rhomb(x,y,S,p.a,.55,'var(--dx-magd)')+rhomb(x,y,S,p.a,C.o,C.k)}
    });
    s+=`</g>`;
    /* slow-axis ticks on the rim of the field */
    {const r=Math.PI*ang/180,dx=Math.cos(r),dy=Math.sin(r);
      [1,-1].forEach(sg=>{s+=`<line x1="${f1(F.cx+sg*dx*(F.r+2))}" y1="${f1(F.cy+sg*dy*(F.r+2))}" x2="${f1(F.cx+sg*dx*(F.r+14))}" y2="${f1(F.cy+sg*dy*(F.r+14))}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/>`})}
    /* compensator diagram */
    s+=`<text x="${N?P.cx:P.cx}" y="${P.cy-P.r-14}" class="t-sm t-mid">COMPENSATOR</text>`;
    s+=`<circle cx="${P.cx}" cy="${P.cy}" r="${P.r}" style="fill:var(--dx-mag);stroke:var(--dx-rim);stroke-width:4"/>`;
    s+=`<line x1="${P.cx-P.r}" x2="${P.cx+P.r}" y1="${P.cy}" y2="${P.cy}" style="stroke:var(--panel);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/><line y1="${P.cy-P.r}" y2="${P.cy+P.r}" x1="${P.cx}" x2="${P.cx}" style="stroke:var(--panel);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`;
    s+=`<text x="${P.cx+P.r+5}" y="${P.cy+4}" class="t-xs">P</text><text x="${P.cx}" y="${P.cy+P.r+13}" class="t-xs t-mid">A</text>`;
    {const r=Math.PI*ang/180,dx=Math.cos(r)*(P.r-8),dy=Math.sin(r)*(P.r-8);
      s+=`<line x1="${f1(P.cx-dx)}" y1="${f1(P.cy-dy)}" x2="${f1(P.cx+dx)}" y2="${f1(P.cy+dy)}" style="stroke:var(--ink);stroke-width:3" marker-end="url(#dxMsA)" marker-start="url(#dxMsA)"/>`;
      s+=`<text x="${P.cx}" y="${P.cy+P.r+(N?30:28)}" class="t-lbl t-mid">${N?'γ':'slow axis γ'} · ${Math.round(ang)}°</text>`}
    /* legend: two reference crystals at the current angle */
    const ly=P.ly,lx=P.lx,rowH=44;
    const ref=(y,kind,lbl,sub,a)=>{const C=kind==='n'?col(a,ang,1,1):col(a,ang,-1,.6);let g=`<rect x="${lx}" y="${y-16}" width="34" height="30" rx="6" style="fill:var(--dx-mag)"/>`;
      g+=kind==='n'?needle(lx+17,y-1,24,a,.55,'var(--dx-magd)')+needle(lx+17,y-1,24,a,C.o,C.k):rhomb(lx+17,y-1,14,a,.55,'var(--dx-magd)')+rhomb(lx+17,y-1,14,a,C.o,C.k);
      const word=C.o<.12?(N?'faint':'background colour'):C.k.includes('yel')?'yellow':'blue';
      g+=`<text x="${lx+44}" y="${y-3}" class="t-lbl">${lbl}</text><text x="${lx+44}" y="${y+11}" class="t-xs">${sub} → ${N?'':'now '}${word}</text>`;return g};
    s+=`<text x="${lx}" y="${ly-26}" class="t-sm">REFERENCE CRYSTALS AT ${Math.round(ang)}°</text>`;
    s+=ref(ly,'n','MSU needle, E–W','strong, negative',0);
    s+=ref(ly+rowH,'n','MSU needle, N–S','strong, negative',90);
    s+=ref(ly+rowH*2,'r','CPP rhomboid, E–W','weak, positive',0);
    s+=ref(ly+rowH*3,'r','CPP rhomboid, N–S','weak, positive',90);
    if(!N)s+=`<text x="${lx}" y="${ly+rowH*4-4}" class="t-xs">MSU: yellow ∥ slow axis · CPP: blue ∥ slow axis</text>`;
    else s+=`<text x="165" y="${ly+rowH*4-4}" class="t-xs t-mid">MSU: yellow ∥ slow axis · CPP: blue ∥ slow axis</text>`;
    ms.innerHTML=s;
    const p=phaseOf(DX_MS,t);setMs(p);$('#dxMsNote').innerHTML=noteHTML(DX_MS[p]);
    const cy=X.filter(q=>q.k==='n').map(q=>col(q.a,ang,1,1));
    $('#dxMsRead').innerHTML=`<span>slow axis <b>${Math.round(ang)}°</b></span><span>free MSU needles: <b>${cy.filter(c=>c.o>=.12&&c.c>0).length} yellow</b>, <b>${cy.filter(c=>c.o>=.12&&c.c<0).length} blue</b>, <b>${cy.filter(c=>c.o<.12).length} faint</b></span>`;
  }
  const stopM=playWire(mr,$('#dxMsPlay'),drawMs,14000,'Replay','dx');
  const setMs=stepWire($('#dxMsSteps'),DX_MS,mr,drawMs,stopM);
  $$('[data-msv]').forEach(b=>b.addEventListener('click',()=>{msShow=b.dataset.msv;$$('[data-msv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMs(+mr.value)}));
  drawMs(+mr.value);

  /* ================= ACR/EULAR calculator ================= */
  const G=$('#dxGauge'),form=$('#dxForm');const shown={};DX_DOM.forEach(d=>shown[d.id]=0);let stopG=null,gTok=0;
  const rad=n=>{const r=$(`#m-dx input[name="${n}"]:checked`);return r?r.value:null};
  function st(){
    const tr=$$('#m-dx [data-tr]').filter(c=>c.checked).length,uk=rad('dxUr'),up=DX_UR[uk];
    const pts={joint:+rad('dxJoint'),traits:tr,course:+rad('dxCourse'),tophus:$('#dxToph').checked?4:0,urate:up==null?0:up,fluid:+rad('dxFluid'),img:$('#dxImg').checked?4:0,eros:$('#dxEro').checked?4:0};
    const tot=DX_DOM.reduce((a,d)=>a+pts[d.id],0);
    return{entry:$('#dxEntry').checked,suff:$('#dxSuff').checked,uMiss:up==null,pts,tot,flare:$('#dxFlareU').checked,clin:pts.fluid===0&&!pts.img&&!pts.eros}}
  function gauge(V,S){
    const N=vb(G,'400 250','330 338');
    const W=N?330:400,C=W/2,X0=N?16:24,X1=W-X0,xs=v=>X0+(v+6)/29*(X1-X0),by=108,bh=22;
    const live=S.entry&&!S.suff,tot=DX_DOM.reduce((a,d)=>a+V[d.id],0),met=live&&!S.uMiss&&S.tot>=8;
    let s=`<text x="10" y="16" class="t-sm">ACR/EULAR 2015 · SCORE −6 TO 23</text>`;
    s+=`<g style="opacity:${live?1:.32}">`;
    if(live){s+=`<text x="${C}" y="60" class="t-big t-mid" style="font-size:44px;fill:${met?'var(--good)':'var(--ink)'}">${Math.round(tot)}</text>`;
      s+=`<text x="${C}" y="78" class="t-xs t-mid">${S.uMiss?'urate missing: score incomplete':met?'≥ 8 · classified as gout':'of 23 · threshold 8'}</text>`}
    s+=`<rect x="${X0}" y="${by}" width="${X1-X0}" height="${bh}" rx="5" style="fill:var(--panel-2)"/>`;
    /* positive domains stack rightward from 0, negative ones leftward */
    let pos=0,neg=0;
    DX_DOM.forEach(d=>{const v=V[d.id];if(Math.abs(v)<.02)return;
      if(v>0){const a=xs(pos),b=xs(pos+v);s+=`<rect x="${f1(a)}" y="${by}" width="${f1(b-a)}" height="${bh}" style="fill:${DX_GC[d.g]};opacity:.85;stroke:var(--panel);stroke-width:1.5"/>`;pos+=v}
      else{const b=xs(neg),a=xs(neg+v);s+=`<rect x="${f1(a)}" y="${by}" width="${f1(b-a)}" height="${bh}" style="fill:var(--bad);opacity:.8;stroke:var(--panel);stroke-width:1.5"/>`;neg+=v}});
    s+=`<line x1="${f1(xs(0))}" x2="${f1(xs(0))}" y1="${by-4}" y2="${by+bh+4}" style="stroke:var(--muted);stroke-width:1.5"/>`;
    s+=`<line x1="${f1(xs(8))}" x2="${f1(xs(8))}" y1="${by-10}" y2="${by+bh+6}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${f1(xs(8))}" y="${by-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">gout ≥ 8</text>`;
    s+=`<line x1="${f1(xs(15))}" x2="${f1(xs(15))}" y1="${by}" y2="${by+bh+6}" style="stroke:var(--muted);stroke-dasharray:2 2"/>`;
    s+=`<circle cx="${f1(xs(tot))}" cy="${by+bh+9}" r="4.5" style="fill:${met?'var(--good)':'var(--ink)'}"/>`;
    [[-6,'−6'],[0,'0'],[8,'8'],[15,'15 clinical max'],[23,'23']].forEach(([v,l])=>{s+=`<text x="${f1(xs(v))}" y="${by+bh+26}" class="t-xs ${v===23?'t-end':v===-6?'':'t-mid'}" ${v===-6?`style="text-anchor:start"`:''}>${v===15&&N?'15':l}</text>`});
    /* per-domain readout */
    const rows=DX_DOM.map((d,i)=>{const v=V[d.id],x=N?12:(i<4?14:206),y=N?176+i*20:176+(i%4)*19;
      const miss=d.id==='urate'&&S.uMiss;
      return `<rect x="${x}" y="${y-8}" width="9" height="9" rx="2" style="fill:${DX_GC[d.g]}"/><text x="${x+15}" y="${y}" class="t-xs" style="fill:var(--ink)">${d.n}</text><text x="${x+(N?306:178)}" y="${y}" class="t-xs t-end" style="font-weight:700;fill:${miss?'var(--warn)':v<0?'var(--bad)':v>0?'var(--ink)':'var(--muted)'}">${miss?'needed':(v>0?'+':v<0?'−':'')+Math.abs(Math.round(v))}</text>`}).join('');
    s+=rows+`</g>`;
    if(!S.entry)s+=`<text x="${C}" y="58" class="t-big t-mid" style="fill:var(--warn)">Entry criterion not met</text><text x="${C}" y="78" class="t-xs t-mid">the score is not applied</text>`;
    else if(S.suff)s+=`<text x="${C}" y="58" class="t-big t-mid" style="fill:var(--good)">MSU crystals seen</text><text x="${C}" y="78" class="t-xs t-mid">classified as gout without scoring</text>`;
    G.innerHTML=s;
  }
  function update(){
    const S=st();const from={...shown};stopG&&stopG();
    stopG=animate(500,p=>{const e=ease(p);DX_DOM.forEach(d=>shown[d.id]=lerp(from[d.id],S.pts[d.id],e));gauge(shown,S)},()=>{stopG=null});
    const tok=++gTok;setTimeout(()=>{if(tok!==gTok)return;stopG&&stopG();stopG=null;DX_DOM.forEach(d=>shown[d.id]=S.pts[d.id]);gauge(shown,S)},650);
    if(RM){DX_DOM.forEach(d=>shown[d.id]=S.pts[d.id]);gauge(shown,S)}
    const v=$('#dxVerdict');let cls='',h='';
    const best=S.tot-S.pts.urate+4;
    if(!S.entry){cls='na';h=`<strong>Criteria not applied</strong><span>The entry criterion comes first: at least one episode of swelling, pain or tenderness in a peripheral joint or bursa. [[Neogi2015]]</span>`}
    else if(S.suff){cls='yes';h=`<strong>Classified as gout: sufficient criterion</strong><span>MSU crystals in a symptomatic joint, bursa or tophus classify without any scoring. [[Neogi2015]]</span>`}
    else if(S.uMiss){cls='na';h=`<strong>Score cannot be computed yet</strong><span>Serum urate is mandatory. The other items add up to ${S.tot}. [[Neogi2015]]</span>`}
    else if(S.tot>=8){cls='yes';h=`<strong>Classified as gout: ${S.tot} of 23</strong><span>A score of 8 or more meets the classification criteria. [[Neogi2015]]</span>`}
    else{h=`<strong>Not classified as gout: ${S.tot} of 23</strong><span>That does not rule gout out. Aspiration remains the way to establish the diagnosis. [[Neogi2015]]</span>`}
    if(S.entry&&!S.suff&&S.flare&&!S.uMiss&&S.pts.urate<4){h+=`<span><span class="tag warn">Urate timing</span> Urate often falls during a flare: it was normal in 49% of one series. If practicable, retest more than 4 weeks after the flare began and off urate-lowering therapy, and score the highest value.${S.tot<8&&best>=8?' A higher value on retest could change this result.':''} [[Urano2002,Neogi2015]]</span>`}
    h+=`<span class="stage-cap">Classification criteria for studies, not a diagnostic test for one person.</span>`;
    v.className='dx-verdict'+(cls?' '+cls:'');v.innerHTML=h;
    $('#dxPerfF').classList.toggle('on',S.entry&&!S.suff&&!S.clin);$('#dxPerfC').classList.toggle('on',S.entry&&!S.suff&&S.clin);
    $('#dxLive').innerHTML=!S.entry?`<span>entry criterion not met</span>`:S.suff?`<b class="ok">Gout</b><span>sufficient criterion</span>`:`<span>score</span><b class="${!S.uMiss&&S.tot>=8?'ok':''}">${S.tot}</b><span>of 23 · ${S.uMiss?'urate needed':S.tot>=8?'classified':'below 8'}</span>`;
  }
  function conv(){const n=$('#dxUrN'),v=parseFloat(n.value);$('#dxUrConv').textContent=isFinite(v)&&v>0?`≈ ${Math.round(v*DX_U)} µmol/L`:''}
  $('#dxUrN').addEventListener('input',()=>{const v=parseFloat($('#dxUrN').value);if(isFinite(v)&&v>0){const r=$(`#m-dx input[name="dxUr"][value="${dxUrCat(v)}"]`);r.checked=true}conv();update()});
  form.addEventListener('change',e=>{if(e.target.name==='dxUr'){$('#dxUrN').value='';conv()}if(e.target.id!=='dxUrN')update()});
  const setR=(n,v)=>{const r=$(`#m-dx input[name="${n}"][value="${v}"]`);if(r)r.checked=true};
  function load(k){const E=DX_EX[k];
    if(!E){$$('#dxForm input[type=checkbox]').forEach(c=>c.checked=false);setR('dxJoint',0);setR('dxCourse',0);setR('dxUr','none');setR('dxFluid',0);$('#dxUrN').value='';conv();update();return}
    $('#dxEntry').checked=true;$('#dxSuff').checked=false;setR('dxJoint',E.joint);setR('dxCourse',E.course);
    $$('#m-dx [data-tr]').forEach((c,i)=>c.checked=i<E.tr);$('#dxToph').checked=!!E.toph;$('#dxImg').checked=!!E.img;$('#dxEro').checked=!!E.ero;
    setR('dxFluid',E.fluid);$('#dxUrN').value=E.ur;setR('dxUr',dxUrCat(E.ur));$('#dxFlareU').checked=!!E.fl;conv();update();
    $('#dxVerdict').innerHTML+=`<span class="dx-def">${DX_EXNOTE[k]}</span>`}
  $$('[data-dxex]').forEach(b=>b.addEventListener('click',()=>load(b.dataset.dxex)));
  $('#dxPerfFb').innerHTML=dxBars([{l:'All 8 domains · SUGAR validation, n = 330',s:.92,p:.89,a:.95}]);
  $('#dxPerfCb').innerHTML=dxBars([{l:'Clinical and urate items only · same set',s:.85,p:.78,a:.89}]);
  load('pod');

  /* ================= Janssens rule ================= */
  const J=$('#dxJnSvg');let jShown=0,stopJ=null,jTok=0;
  $('#dxJnForm').innerHTML=`<fieldset><legend>Janssens rule · 7 items</legend>${DX_JN.map(([k,l,w])=>`<label class="dx-ck"><input type="checkbox" data-jn="${k}"><span>${l}</span><span class="pts">+${w}</span></label>`).join('')}
    <p class="dx-def">Weights: male 2; previous attack 2; onset within 1 day 0.5; redness 1; first MTP 2.5; hypertension or cardiovascular disease 1.5; uric acid above 5.88 mg/dL 3.5. Maximum 13. [[Lee2015,Janssens2010]]</p></fieldset>
    <div class="ctrls" role="group" aria-label="Janssens examples"><button class="btn" id="dxJnTyp">Typical gout story</button><button class="btn" id="dxJnClr">Clear</button></div>`;
  const band=v=>v<=4?DX_JB[0]:v<8?DX_JB[1]:DX_JB[2];
  function jDraw(v,real){const N=vb(J,'400 210','330 236');const X0=N?14:20,X1=N?316:380,xs=k=>X0+k/13*(X1-X0),by=46,B=band(real);
    let s=`<text x="10" y="16" class="t-sm">JANSSENS SCORE · 0 TO 13</text>`;
    DX_JB.forEach(b=>{s+=`<rect x="${f1(xs(b.lo))}" y="${by}" width="${f1(xs(b.hi)-xs(b.lo))}" height="22" style="fill:${b.c};opacity:${b===B?.32:.1}"/><text x="${f1((xs(b.lo)+xs(b.hi))/2)}" y="${by-6}" class="t-xs t-mid" style="fill:${b===B?'var(--ink)':'var(--muted)'};font-weight:${b===B?700:500}">${b.l} ${b.r}</text>`});
    s+=`<rect x="${X0}" y="${by}" width="${f1(xs(v)-X0)}" height="22" rx="3" style="fill:${B.c};opacity:.75"/>`;
    s+=`<line x1="${f1(xs(v))}" x2="${f1(xs(v))}" y1="${by-2}" y2="${by+26}" style="stroke:var(--ink);stroke-width:2.5"/>`;
    [0,4,8,13].forEach(k=>{s+=`<text x="${f1(xs(k))}" y="${by+38}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${X1}" y="16" class="t-big t-end" style="fill:${B.c}">${(Math.round(v*2)/2).toFixed(1)}</text>`;
    const y0=N?120:116,rh=N?36:30;
    s+=`<text x="10" y="${y0-10}" class="t-sm">${N?'GOUT IN EACH BAND (DERIVATION STUDY)':'GOUT IN EACH BAND · DERIVATION STUDY (LEE 2015)'}</text>`;
    DX_JB.forEach((b,i)=>{const y=y0+i*rh,on=b===B,bx=N?146:160,bw=N?128:180;
      s+=`<text x="10" y="${y+12}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${b.l} (${b.r})</text>`;
      s+=`<rect x="${bx}" y="${y+2}" width="${bw}" height="13" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+2}" width="${f1(bw*b.p/100)}" height="13" rx="3" style="fill:${b.c};opacity:${on?.9:.35}"/>`;
      s+=`<text x="${bx+bw+6}" y="${y+12}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:700">${b.p}%</text>`});
    J.innerHTML=s}
  function jUpd(){let v=0;$$('[data-jn]').forEach(c=>{if(c.checked)v+=DX_JN.find(x=>x[0]===c.dataset.jn)[2]});
    const from=jShown;stopJ&&stopJ();stopJ=animate(450,p=>{jShown=lerp(from,v,ease(p));jDraw(jShown,v)},()=>{stopJ=null});
    const tok=++jTok;setTimeout(()=>{if(tok!==jTok)return;stopJ&&stopJ();stopJ=null;jShown=v;jDraw(v,v)},600);if(RM){jShown=v;jDraw(v,v)}
    const B=band(v),o=$('#dxJnOut');o.className='dx-verdict'+(B.k==='high'?' yes':B.k==='mid'?' na':'');
    o.innerHTML=`<span class="kicker">Score ${v} of 13</span><strong>${B.l} probability band (${B.r})</strong><span>In the derivation study, ${B.p}% of people in this band had gout. [[Lee2015]]</span>`+
      (B.k==='high'?`<span>In a study of gout vs septic arthritis, 3 of 54 septic joints still scored "high". A high score does not exclude infection. [[Lee2015]]</span>`:B.k==='low'?`<span>In secondary care, a score of 4 or less had an NPV of 0.95 for gout. [[Kienhorst2015]]</span>`:`<span>Between the cut-offs the rule does not settle it. EULAR 2018 advises a crystal search in every person with suspected gout. [[Richette2020]]</span>`)}
  $('#dxJnForm').addEventListener('change',jUpd);
  $('#dxJnTyp').onclick=()=>{$$('[data-jn]').forEach(c=>c.checked=['male','prev','onset','red','mtp','ua'].includes(c.dataset.jn));jUpd()};
  $('#dxJnClr').onclick=()=>{$$('[data-jn]').forEach(c=>c.checked=false);jUpd()};
  jDraw(0,0);jUpd();

  /* ================= imaging sketches ================= */
  {let s=`<text x="10" y="16" class="t-xs">SCHEMATIC · LONGITUDINAL VIEW</text>`;
    s+=`<rect x="0" y="24" width="260" height="116" style="fill:var(--panel-2)"/>`;
    s+=`<path d="M0 112 C60 108 110 104 160 106 S230 112 260 110 L260 140 L0 140Z" style="fill:var(--muted);opacity:.35"/>`;
    s+=`<path d="M0 112 C60 108 110 104 160 106 S230 112 260 110" style="fill:none;stroke:var(--ink);stroke-width:3"/>`;
    s+=`<path d="M0 86 C60 82 110 78 160 80 S230 86 260 84 L260 111 C230 112 200 106 160 106 S60 108 0 112Z" style="fill:var(--panel);opacity:.9"/>`;
    let d='';for(let x=0;x<=260;x+=5){const y=86-((x/260)*4)+Math.sin(x*.21)*1.6+Math.sin(x*.07)*1.2-(x>100&&x<200?2*Math.sin((x-100)/100*Math.PI):0);d+=(x?'L':'M')+x+' '+f1(y)}
    s+=`<path d="${d}" style="fill:none;stroke:var(--xtal);stroke-width:3.4;stroke-linejoin:round"/>`;
    s+=`<text x="252" y="70" class="t-xs t-end" style="fill:var(--xtal);font-weight:700">urate on cartilage</text><text x="252" y="100" class="t-xs t-end">cartilage (dark)</text><text x="252" y="132" class="t-xs t-end" style="fill:var(--ink)">bone surface</text>`;
    s+=`<text x="10" y="40" class="t-xs" style="fill:var(--ink)">two bright parallel lines = "double contour"</text>`;
    $('#dxUsSvg').innerHTML=s}
  {let s=`<text x="10" y="18" class="t-xs">DECT SENSITIVITY, JOINT LEVEL · GAMALA 2019</text>`;
    [['all disease durations',.83,'var(--sea)'],['disease ≤ 6 weeks',.55,'var(--terra)']].forEach(([l,v,c],i)=>{const y=40+i*40;
      s+=`<text x="10" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="10" y="${y+6}" width="200" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="10" y="${y+6}" width="${200*v}" height="16" rx="4" style="fill:${c}"/><text x="${16+200*v}" y="${y+19}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(2)}</text>`});
    s+=`<text x="10" y="128" class="t-xs">early negatives do not exclude gout</text>`;
    $('#dxCtSvg').innerHTML=s}
  {let s=`<text x="10" y="16" class="t-xs">SCHEMATIC · BONE END WITH A GOUTY EROSION</text>`;
    s+=`<path d="M30 140 L30 64 C30 42 58 30 90 30 C120 30 146 38 152 50 L170 42 C160 50 142 56 137 74 C132 92 142 104 152 106 L152 140Z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:2.5;stroke-linejoin:round"/>`;
    s+=`<ellipse cx="166" cy="80" rx="16" ry="21" style="fill:var(--xtal);opacity:.35;stroke:var(--xtal)"/>`;
    s+=`<path d="M170 42 C160 50 142 56 137 74 C132 92 142 104 152 106" style="fill:none;stroke:var(--ink);stroke-width:5;opacity:.5"/>`;
    s+=`<path d="M152 50 L170 42" style="fill:none;stroke:var(--gold);stroke-width:3.5;stroke-linecap:round"/>`;
    s+=`<line x1="172" y1="40" x2="190" y2="32" class="arrow"/><text x="194" y="34" class="t-xs" style="fill:var(--ink)">overhanging</text><text x="194" y="45" class="t-xs" style="fill:var(--ink)">edge</text>`;
    s+=`<text x="188" y="84" class="t-xs" style="fill:var(--xtal);font-weight:700">tophus</text>`;
    s+=`<line x1="136" y1="92" x2="104" y2="114" class="arrow"/><text x="40" y="126" class="t-xs" style="fill:var(--ink)">sclerotic margin</text>`;
    $('#dxXrSvg').innerHTML=s}

  /* ================= diagnostic pathway ================= */
  const ps=$('#dxPathSvg'),pr=$('#dxPathT');
  const PN=[{a:'Exclude infection',b:'red flags first'},{a:'Aspirate the joint',b:'crystals · culture'},{a:'No crystals?',b:'score · US · DECT'},{a:'Screen',b:'kidneys · heart · sugar'}];
  function drawPath(t){let s=`<defs>${marker('dxPa')}${marker('dxPb','var(--terra)')}</defs>`;
    const N=vb(ps,'720 420','330 1000');
    const L=N?{nw:306,nh:60,pw:306,ph:150,pos:PN.map((_,i)=>({x:12,y:16+i*246})),pan:PN.map((_,i)=>({x:12,y:16+i*246+76}))}
             :{nw:160,nh:62,pw:160,ph:290,pos:PN.map((_,i)=>({x:16+i*176,y:20})),pan:PN.map((_,i)=>({x:16+i*176,y:106}))};
    const lit=i=>t>=DX_PL[i],cur=phaseOf(DX_PATH,t);
    for(let k=0;k<3;k++){const a=L.pos[k],b=L.pos[k+1],on=lit(k+1);
      const[x1,y1,x2,y2]=N?[165,a.y+L.nh+L.ph+16,165,b.y-3]:[a.x+L.nw,a.y+L.nh/2,b.x-3,b.y+L.nh/2];
      s+=`<path d="M${x1} ${y1} L${x2} ${y2}" class="arrow" style="${on?'stroke:var(--terra);stroke-width:2.2':''}" marker-end="url(#${on?'dxPb':'dxPa'})"/>`;
      const p0=DX_PL[k]+.08,p1=DX_PL[k+1];if(t>p0&&t<p1){const u=ease(ramp(t,p0,p1));s+=`<circle cx="${f1(lerp(x1,x2,u))}" cy="${f1(lerp(y1,y2,u))}" r="6" style="fill:var(--terra)"/>`}}
    PN.forEach((n,i)=>{const p=L.pos[i],on=lit(i),c=i===cur;
      s+=`<rect x="${p.x}" y="${p.y}" width="${L.nw}" height="${L.nh}" rx="12" style="fill:${on?'var(--terra-soft)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${c?3:1.5}"/>`;
      s+=`<circle cx="${p.x}" cy="${p.y}" r="11" style="fill:${on?'var(--terra)':'var(--panel-2)'};stroke:var(--panel);stroke-width:2"/><text x="${p.x}" y="${p.y+4}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${p.x+L.nw/2}" y="${p.y+27}" class="t-lbl t-mid" style="opacity:${on?1:.55}">${n.a}</text><text x="${p.x+L.nw/2}" y="${p.y+45}" class="t-xs t-mid">${n.b}</text>`});
    const pan=(i,inner)=>{const o=ramp(t,DX_PL[i]+.02,DX_PL[i]+.12);if(o<=0)return '';const p=L.pan[i];
      return `<g style="opacity:${f1(o)}"><rect x="${p.x}" y="${p.y}" width="${L.pw}" height="${L.ph}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>${inner(p.x+10,p.y,o)}</g>`};
    const lines=(x,y,arr,gap=17)=>arr.map(([tx,c,w],k)=>`<text x="${x}" y="${y+k*gap}" class="${w?'t-lbl':'t-xs'}" style="fill:${c||'var(--ink)'}${w?';font-size:12px':''}">${tx}</text>`).join('');
    s+=pan(0,(x,y,o)=>{const sw=L.pw-20;let g=lines(x,y+20,[['RED FLAGS','var(--terra)'],['fever, sweats, rigors'],['prosthesis · diabetes'],['RA · skin infection · HIV'],['shoulder joint']]);
      const yb=y+(N?112:122);g+=`<text x="${x}" y="${yb}" class="t-xs">fever: sensitivity only</text><rect x="${x}" y="${yb+6}" width="${sw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${x}" y="${yb+6}" width="${f1(sw*.57*ease(o))}" height="12" rx="3" style="fill:var(--terra)"/><text x="${x+sw-2}" y="${yb+16}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">57%</text>`;
      if(!N)g+=lines(x,y+170,[['no fever does not','var(--muted)'],['mean no infection','var(--muted)']]);return g});
    s+=pan(1,(x,y,o)=>{let g=lines(x,y+20,[['SEND THE FLUID FOR','var(--terra)'],['polarised microscopy'],['cell count, % neutrophils'],['Gram stain + culture']]);
      const nx=x+(N?196:20),ny=y+(N?60:120);g+=`<rect x="${nx-8}" y="${ny-26}" width="${N?96:140}" height="58" rx="8" style="fill:var(--dx-mag)"/>`;
      [[0,-14,0],[18,-4,90],[38,-12,20],[-2,10,160],[24,14,0],[48,8,90],[70,-8,0],[84,10,60]].slice(0,N?5:8).forEach(([dx,dy,a])=>{const c=Math.cos(2*a*Math.PI/180);g+=needle(nx+dx+4,ny+dy+4,14,a,Math.max(.25,Math.abs(c)),c>0?'var(--dx-yel)':'var(--dx-blu)')});
      if(!N)g+=lines(x,y+200,[['MSU crystals = definite','var(--good)',1],['crystals do not exclude'],['infection (1.5–5%)']]);
      else g+=lines(x,y+108,[['MSU crystals = definite gout','var(--good)',1],['crystals do not exclude infection (1.5–5%)']]);return g});
    s+=pan(2,(x,y,o)=>{let g=lines(x,y+20,[['WITHOUT CRYSTALS','var(--terra)'],['ACR/EULAR score ≥ 8'],['Janssens (primary care)'],['ultrasound: double contour'],['DECT: misses early gout']]);
      const yb=y+(N?112:120),sw=L.pw-20,xs=v=>x+(v+6)/29*sw;
      g+=`<text x="${x}" y="${yb}" class="t-xs">score −6 … 23</text><rect x="${x}" y="${yb+6}" width="${sw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(xs(0))}" y="${yb+6}" width="${f1((xs(10)-xs(0))*ease(o))}" height="12" style="fill:var(--terra);opacity:.8"/><line x1="${f1(xs(8))}" x2="${f1(xs(8))}" y1="${yb+2}" y2="${yb+22}" style="stroke:var(--ink);stroke-width:2"/>`;
      if(!N)g+=lines(x,y+170,[['urate: highest value,','var(--muted)'],['ideally >4 weeks after','var(--muted)'],['the flare began','var(--muted)'],['not on urate alone','var(--bad)']]);return g});
    s+=pan(3,(x,y,o)=>{const sw=N?120:70,lx=N?112:76;let g=`<text x="${x}" y="${y+18}" class="t-xs" style="fill:var(--terra)">${N?'US ADULTS WITH GOUT, NHANES 2007–08':'WITH GOUT · NHANES'}</text>`;
      DX_CO.forEach(([l,v],k)=>{const yy=y+(N?34:38)+k*(N?14:31);
        if(N){g+=`<text x="${x}" y="${yy+8}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x+lx}" y="${yy}" width="${f1(sw*v/100*ease(o))}" height="10" rx="2" style="fill:var(--sea)"/><text x="${f1(x+lx+sw*v/100*ease(o)+4)}" y="${yy+9}" class="t-xs">${v}%</text>`}
        else{g+=`<text x="${x}" y="${yy}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x}" y="${yy+5}" width="${f1(110*v/100*ease(o))}" height="10" rx="2" style="fill:var(--sea)"/><text x="${f1(x+110*v/100*ease(o)+4)}" y="${yy+14}" class="t-xs">${v}%</text>`}});
      return g});
    ps.innerHTML=s;setPath(cur);$('#dxPathNote').innerHTML=noteHTML(DX_PATH[cur])}
  const stopP=playWire(pr,$('#dxPathPlay'),drawPath,16000,'Replay','dx');
  const setPath=stepWire($('#dxPathSteps'),DX_PATH,pr,drawPath,stopP);
  drawPath(+pr.value);
  /* several drawings share one module id, so re-lay-out all of them together */
  redraws.dx=()=>{stopM();stopP();drawMs(+mr.value);drawPath(+pr.value);update();jUpd()};
};
