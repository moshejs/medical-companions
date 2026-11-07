/* =============== 2.2 The ECG: STEMI, NSTEMI & territories =============== */
/* the standard 12-lead layout: four columns, three rows */
const EC_LAYOUT=[['I','aVR','V1','V4'],['II','aVL','V2','V5'],['III','aVF','V3','V6']];
/* schematic resting morphology per lead (mm): drawing proportions, not norms */
const EC_BASE={I:{r:7,s:1.2,t:2.4},II:{r:10,s:1.5,t:3},III:{r:5,s:1,t:1.4,p:1},aVR:{p:-1,r:2,s:6,t:-2},aVL:{r:4,s:2,t:1.2,p:.8},aVF:{r:7,s:1.2,t:2},
  V1:{r:2,s:8,t:1.2},V2:{r:4,s:9,t:3.4},V3:{r:7,s:6,t:3.4},V4:{r:11,s:3.5,t:3.4},V5:{r:12,s:2,t:3},V6:{r:10,s:1.4,t:2.6}};
/* walls: leads, culprit artery (teaching convention), where the clot sits, the lead drawn large */
const EC_TER={
  ant:{n:'Anterior',leads:['V1','V2','V3','V4'],a:'lad',an:'left anterior descending (LAD)',at:.22,big:'V2'},
  inf:{n:'Inferior',leads:['II','III','aVF'],a:'rca',an:'right coronary (RCA)',at:.3,big:'II',alt:'sometimes the circumflex'},
  lat:{n:'Lateral',leads:['I','aVL','V5','V6'],a:'lcx',an:'circumflex (LCx)',at:.3,big:'V5',alt:'or a diagonal branch of the LAD'}};
/* the evolving pattern in the leads facing the infarct, from t in [0,1] (shape only; no timing in hours) */
function ecStage(t,rep){
  const occ=ramp(t,.08,.13),hy=ramp(t,.13,.26)*(1-ramp(t,.4,.62)),
    stRise=ramp(t,.16,.42),stFall=rep?ramp(t,.46,.56)*.85:ramp(t,.7,.96)*.8,
    q=ramp(t,.5,.68),inv=ramp(t,.74,.94);
  return{occ,hyper:hy,st:3.4*stRise*(1-stFall),q:q*(rep?2.6:4.2),rloss:q*(rep?.35:.6),inv,
    terr:Math.min(1,ramp(t,.1,.3))+(rep?ramp(t,.44,.56)*.3:ramp(t,.44,.8)),open:rep?ramp(t,.44,.5):0}}
function ecBeatFor(lead,S,on){const b=Object.assign({p:1.5,s:2.5},EC_BASE[lead]);if(!on)return b;
  return Object.assign({},b,{hyper:S.hyper,st:S.st,q:S.q,rloss:S.rloss,t:lerp(b.t*(1+S.hyper*.25),-Math.max(1.6,b.t*.75),S.inv)})}
const EC_STEPS=[
 {from:0,at:.05,k:'Before the artery closes',t:'A normal 12-lead ECG',
  txt:`Each small square is 1 mm; at standard calibration 10 mm is 1 mV, shown by the step at the start of the long strip. In the normal beat the ST segment, between the end of the QRS (the J point) and the T wave, sits on the baseline. The 2023 ESC guideline asks for a 12-lead ECG at first medical contact, interpreted within 10 minutes, and repeated as needed. [[Byrne2023ESC]]`,
  pt:`The ECG is a picture of the heart's electrical signal, taken from twelve angles at once. It takes a few minutes and does not hurt.`,
  hook:`ECG target: obtained at first medical contact and read within 10 minutes. [[Byrne2023ESC,Thygesen2018UDMI4C]]`},
 {from:.12,at:.22,k:'Earliest change',t:'Hyperacute T waves',
  txt:`A clot has closed the artery (see the heart). UDMI4 says hyperacute T waves, with increased amplitude and prominent symmetrical T waves in at least two contiguous leads, may come before ST elevation. [[Thygesen2018UDMI4C]] They are easy to miss on a single tracing, which is one reason ECGs are repeated.`,
  pt:`The first sign can be T waves that look too tall and too broad, before the classic changes appear.`,
  hook:`Order of evolution: hyperacute T → ST elevation → Q waves → T inversion. [[Thygesen2018UDMI4C]]`},
 {from:.3,at:.42,k:'Injury current',t:'ST elevation',
  txt:`The ST segment lifts off the baseline in the leads facing the injured wall. UDMI4 counts new or presumed new J-point elevation of at least 1 mm in two contiguous leads, with higher thresholds in V2–V3 (2 mm in men 40 or older, 2.5 mm in men under 40, 1.5 mm in women). [[Thygesen2018UDMI4C]] ST elevation with the right clinical picture leads to the working diagnosis of STEMI and urgent reperfusion. [[Byrne2023ESC]]`,
  pt:`The flat part after the spike rises up like a tombstone. It means a wall of heart muscle is not getting blood right now.`,
  hook:`STEMI: ≥1 mm in 2 contiguous leads; V2–V3: ≥2 mm men ≥40, ≥2.5 mm men <40, ≥1.5 mm women. [[Thygesen2018UDMI4C]]`},
 {from:.5,at:.62,k:'Minutes to hours',t:'Q waves: muscle is dying',
  txt:`UDMI4 says new pathological Q waves indicate necrosis that starts minutes to hours after the insult. [[Thygesen2018UDMI4C]] The R wave shrinks as the wall stops conducting, and a deep, wide Q wave appears. Press <b>Artery reopened</b>: UDMI4 says reperfusion usually brings a large, prompt fall in ST elevation. [[Thygesen2018UDMI4C]] How much muscle is saved depends on time: see <a href="#ischaemia" data-go="ischaemia">Ischaemia: time is muscle</a>.`,
  pt:`A Q wave is a downward dip at the start of the beat. It is a footprint of heart muscle that has died.`,
  hook:`Prior-MI Q waves are most specific in several leads or lead groups, or when they last >0.04 s. [[Thygesen2018UDMI4C]]`},
 {from:.72,at:.9,k:'Later',t:'T inversion: the scar settles',
  txt:`The ST segment comes back down and the T wave turns upside down. UDMI4 counts T inversion &gt;1 mm in two contiguous leads with a prominent R wave or R/S ratio &gt;1 as an ischaemic change, and says Q waves with inverted T waves in the same lead group raise the likelihood of a prior MI. [[Thygesen2018UDMI4C]] The Q wave can remain as a lasting record.`,
  pt:`The tracing calms down, but the dip (Q wave) and the upside-down T wave can stay as a record that a heart attack happened.`,
  hook:`Q waves + inverted T waves in the same lead group → think prior MI. [[Thygesen2018UDMI4C]]`}
];
inits.ecg=()=>{
  const svg=$('#ecSvg'),rg=$('#ecT');let ter='ant',rep=false;
  const ECG_PAPER=(x,y,w,h,mm,minor)=>ecgGrid(x,y,w,h,{mm,minor});
  function draw(t){
    const N=vb(svg,'720 400','400 650'),T=EC_TER[ter],S=ecStage(t,rep);
    const L=N?{gx:8,gy:24,cw:96,ch:58,mm:2,sx:8,sy:214,sw:384,sh:110,smm:3.2,base:62,hx:104,hy:448,hs:.78,rx:206,ry:368,tlx:24,tlw:352,tly:600}
             :{gx:10,gy:22,cw:114,ch:64,mm:2.4,sx:10,sy:230,sw:456,sh:112,smm:3.4,base:66,hx:596,hy:140,hs:1.02,rx:490,ry:268,tlx:30,tlw:660,tly:372};
    let s='';
    /* 12-lead grid */
    s+=`<text x="${L.gx}" y="${L.gy-7}" class="t-sm">12-LEAD ECG · ${T.n.toUpperCase()} WALL OUTLINED</text>`;
    s+=ECG_PAPER(L.gx,L.gy,L.cw*4,L.ch*3,L.mm,!N);
    EC_LAYOUT.forEach((row,ri)=>row.forEach((ld,ci)=>{
      const x=L.gx+ci*L.cw,y=L.gy+ri*L.ch,on=T.leads.includes(ld),bl=y+L.ch*.56;
      const tr=ecgTrace(x+4,bl,L.cw-8,Object.assign({mm:L.mm,hr:72,from:.12+ci*.18,lw:on?1.7:1.2,col:on?'var(--ecg-ink)':'var(--muted)'},ecBeatFor(ld,S,on)));
      if(on)s+=`<rect x="${f1(x+1.5)}" y="${f1(y+1.5)}" width="${f1(L.cw-3)}" height="${f1(L.ch-3)}" rx="4" style="fill:var(--dx-soft);opacity:${f1(.35+.4*S.occ)};stroke:var(--dx);stroke-width:2"/>`;
      s+=tr.svg+`<text x="${f1(x+5)}" y="${f1(y+12)}" class="t-xs" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:${on?700:500}">${ld}</text>`;
    }));
    /* the large strip of one lead, scrolling with time */
    const mm=L.smm,bx=L.sx,by=L.sy,bw=L.sw,bh=L.sh,base=by+L.base,big=ecBeatFor(T.big,S,true);
    s+=`<text x="${bx}" y="${by-6}" class="t-sm">LEAD ${T.big} · LARGE</text>`;
    s+=ECG_PAPER(bx,by,bw,bh,mm,true);
    const from=t*46,hr=72,per=60/hr,calW=7*mm,dur=(bw-calW-8)/(mm*25);
    s+=`<line x1="${bx}" x2="${bx+bw}" y1="${base}" y2="${base}" style="stroke:var(--muted);stroke-width:.8;stroke-dasharray:3 3;opacity:.8"/>`;
    s+=ecgTrace(bx+4,base,bw-8,Object.assign({mm,hr,from,cal:true,lw:2},big)).svg;
    /* annotate one beat in the middle of the visible window */
    const x0=bx+4+calW,k=Math.ceil((from+dur*.42-.25)/per),X=sec=>x0+(sec-from)*25*mm,jx=X(k*per+.25),jy=base-big.st*mm;
    if(jx<bx+bw-30){
      s+=`<circle cx="${f1(jx)}" cy="${f1(jy)}" r="3.2" style="fill:none;stroke:var(--brand);stroke-width:1.6"/><text x="${f1(jx)}" y="${f1(by+bh-6)}" class="t-xs t-mid" style="fill:var(--brand)">J point</text>`;
      if(big.st>.25){s+=`<path d="M${f1(jx+8)} ${f1(base)}V${f1(jy)}" style="stroke:var(--brand);stroke-width:1.6"/><path d="M${f1(jx+5)} ${f1(base)}h6M${f1(jx+5)} ${f1(jy)}h6" style="stroke:var(--brand);stroke-width:1.2"/><rect x="${f1(jx-84)}" y="${f1(by+5)}" width="76" height="15" rx="3" style="fill:var(--panel);opacity:.9"/><text x="${f1(jx-12)}" y="${f1(by+16)}" class="t-xs t-end" style="fill:var(--brand);font-weight:700">ST ↑ ${big.st.toFixed(1)} mm</text><path d="M${f1(jx-10)} ${f1(by+18)}L${f1(jx+6)} ${f1(Math.min(jy,base)-3)}" style="stroke:var(--brand);stroke-width:1"/>`}
      const tx=X(k*per+.37),ty=base-(big.st*.3+ecgBeat(.37,big))*mm;
      if(S.hyper>.35)s+=`<text x="${f1(tx+12)}" y="${f1(Math.max(by+30,ty-4))}" class="t-xs" style="fill:var(--dx);font-weight:700">hyperacute T</text>`;
      if(S.inv>.4)s+=`<text x="${f1(tx+6)}" y="${f1(base+mm*4.4)}" class="t-xs" style="fill:var(--dx);font-weight:700">inverted T</text>`;
      if(S.q>1.2){const qx=X(k*per+.19);s+=`<text x="${f1(qx-6)}" y="${f1(base+mm*(big.q+2.2))}" class="t-xs t-end" style="fill:var(--dx);font-weight:700">Q wave</text>`}
    }
    s+=`<text x="${f1(bx+bw-4)}" y="${f1(by+12)}" class="t-xs t-end">25 mm/s · 10 mm/mV</text>`;
    /* heart: the culprit artery and its wall */
    const terr={lad:0,rca:0,lcx:0};terr[T.a]=S.terr;
    const H=heart(L.hx,L.hy,L.hs,{terr,occl:{a:T.a,at:T.at,v:S.occ*(1-S.open)},hl:[T.a],labels:true,id:'ecHeart'});
    s+=H.svg;
    const p=H.along(T.a,T.at);
    const lbo={lad:[-14,4,'t-end'],rca:[-12,-6,'t-end'],lcx:[0,-14,'t-mid']}[T.a],lbt=S.open>.5?['reopened','var(--good)']:S.occ>.3?['clot','var(--brand)']:null;
    if(lbt)s+=`<rect x="${f1(p[0]+lbo[0]-(lbo[2]==='t-end'?56:28))}" y="${f1(p[1]+lbo[1]-10)}" width="56" height="14" rx="3" style="fill:var(--panel);opacity:.85"/><text x="${f1(p[0]+lbo[0]-(lbo[2]==='t-end'?2:0))}" y="${f1(p[1]+lbo[1])}" class="t-xs ${lbo[2]}" style="fill:${lbt[1]};font-weight:700">${lbt[0]}</text>`;
    const stat=S.terr<.05?'healthy muscle':S.terr<=1.02?'ischaemic (starved of oxygen)':S.terr<1.5?'ischaemic, necrosis starting':'necrotic (dead) muscle';
    const R=N?[L.rx,L.ry]:[L.rx,L.ry];
    s+=`<text x="${R[0]}" y="${R[1]}" class="t-sm">WALL: ${T.n.toUpperCase()}</text><text x="${R[0]}" y="${R[1]+16}" class="t-lbl" style="font-size:12px">Culprit (convention): ${T.a.toUpperCase()}</text>`;
    s+=`<text x="${R[0]}" y="${R[1]+32}" class="t-xs" style="fill:${S.terr>1.02?'var(--necro)':S.terr>.05?'var(--isch)':'var(--muted)'};font-weight:600">${stat}</text>`;
    if(N)s+=`<text x="${R[0]}" y="${R[1]+48}" class="t-xs">ST at J point: ${big.st.toFixed(1)} mm</text><text x="${R[0]}" y="${R[1]+62}" class="t-xs">Q waves: ${S.q>1.2?'present':'none'}</text>`;
    s+=`<text x="${R[0]}" y="${R[1]+(N?82:52)}" class="t-xs" style="font-style:italic">schematic wall map, not anatomy</text>`;
    /* timeline */
    const tx0=L.tlx,tw=L.tlw,ty=L.tly,XT=v=>tx0+tw*v;
    s+=`<line x1="${tx0}" x2="${tx0+tw}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/><line x1="${tx0}" x2="${f1(XT(t))}" y1="${ty}" y2="${ty}" style="stroke:var(--dx);stroke-width:5;stroke-linecap:round"/>`;
    const lab=N?['normal','hyper T','ST ↑','Q','T inv']:['normal','hyperacute T','ST elevation','Q waves','T inversion'];
    EC_STEPS.forEach((st,i)=>{const xx=XT(st.at),on=phaseOf(EC_STEPS,t)===i;s+=`<circle cx="${f1(xx)}" cy="${ty}" r="${on?6:4}" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:1.6"/><text x="${f1(xx)}" y="${ty-11}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${lab[i]}</text>`});
    s+=`<text x="${tx0}" y="${ty+17}" class="t-xs">artery closes →</text><text x="${tx0+tw}" y="${ty+17}" class="t-xs t-end">later → (no fixed clock)</text>`;
    s+=`<circle cx="${f1(XT(t))}" cy="${ty}" r="3" style="fill:var(--on-brand)"/>`;
    svg.innerHTML=s;
    const ph=phaseOf(EC_STEPS,t);setSt(ph);
    $('#ecRead').innerHTML=`<span>wall <b>${T.n}</b></span><span>leads <b>${T.leads.join(', ')}</b></span><span>culprit by convention <b>${T.a.toUpperCase()}</b></span><span>ST at J (lead ${T.big}) <b>${big.st.toFixed(1)} mm</b></span><span>Q waves <b>${S.q>1.2?'yes':'no'}</b></span>`;
    $('#ecNote').innerHTML=noteHTML(EC_STEPS[ph])+`<div class="kv"><div><dt>${T.n} wall (teaching convention)</dt><dd>Leads ${T.leads.join(', ')} usually reflect the ${T.an}${T.alt?', '+T.alt:''}. Anatomy varies; angiography identifies the culprit.${ter!=='ant'?' Among people with NSTEMI whose culprit artery was totally occluded, 40% were in the right coronary and 33% in the circumflex, [[Khan2017]]':''}</dd></div>${rep&&t>.44?`<div><dt>Reperfusion</dt><dd>Reopening the artery usually brings a large, prompt fall in ST elevation. [[Thygesen2018UDMI4C]] The smaller dark area on the heart is drawn to show that muscle can be saved; it is not a measured amount.</dd></div>`:''}</div>`;
  }
  const stop=playWire(rg,$('#ecPlay'),draw,22000,'%t:player.replay%','ecg');
  const setSt=stepWire($('#ecSteps'),EC_STEPS,rg,draw,stop);
  $$('[data-ecter]').forEach(b=>b.addEventListener('click',()=>{ter=b.dataset.ecter;$$('[data-ecter]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#ecReperf').addEventListener('click',e=>{rep=!rep;e.currentTarget.setAttribute('aria-pressed',rep);draw(+rg.value)});
  draw(+rg.value);

  /* ---- STEMI criteria explainer ---- */
  const cs=$('#ecCrit');let sex='m';
  const GRP={oth:{n:'Other leads',nn:'other'},v23:{n:'V2–V3',nn:'V2–V3'},post:{n:'V7–V9',nn:'V7–V9'},rv:{n:'V3R/V4R',nn:'V3R/V4R'}};
  function thr(g,sx,age){
    if(g==='oth')return{v:1,who:'all adults'};
    if(g==='v23')return sx==='f'?{v:1.5,who:'women, any age'}:age>=40?{v:2,who:'men aged 40 or over'}:{v:2.5,who:'men under 40'};
    if(g==='post')return sx==='m'&&age<40?{v:1,who:'men under 40'}:{v:.5,who:sx==='m'?'men aged 40 or over':'women'};
    return sx==='m'&&age<30?{v:1,who:'men under 30'}:{v:.5,who:sx==='m'?'men aged 30 or over':'women'}}
  function drawC(){
    const N=vb(cs,'720 300','400 470'),g=$('#ecGrp').value,age=+$('#ecAge').value,st=+$('#ecMm').value,contig=$('#ecContig').checked,nw=$('#ecNew').checked;
    $('#ecAgeV').textContent=age;$('#ecMmV').textContent=st.toFixed(2);
    const th=thr(g,sex,age),meets=st>=th.v-1e-9;
    const P=N?{x:10,y:10,w:380,h:226,mm:6.5,base:180,lx:40,ly:284,lw:330,lh:150}:{x:12,y:12,w:440,h:276,mm:8,base:210,lx:500,ly:34,lw:200,lh:230};
    let s=ecgGrid(P.x,P.y,P.w,P.h,{mm:P.mm});
    const mm=P.mm,calW=7*mm,base=P.base,x0=P.x+10;
    s+=`<line x1="${P.x}" x2="${P.x+P.w}" y1="${base}" y2="${base}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=ecgTrace(x0,base,P.w-20,{mm,hr:60,from:.55,cal:true,st,t:3,r:14,lw:2.4}).svg;
    const X=sec=>x0+calW+(sec-.55)*25*mm,jx=X(1.25),jy=base-st*mm,ty=base-th.v*mm;
    s+=`<line x1="${P.x}" x2="${P.x+P.w}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 4"/>`;
    s+=`<path d="M${P.x+8} ${P.y+12}h22" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${P.x+36}" y="${P.y+15}" class="t-xs ec-halo" style="fill:var(--bad);font-weight:700">threshold ${th.v} mm · ${GRP[g].nn}, ${th.who}</text>`;
    s+=`<circle cx="${f1(jx)}" cy="${f1(jy)}" r="4.5" style="fill:none;stroke:var(--brand);stroke-width:2"/>`;
    if(st>0)s+=`<path d="M${f1(jx-12)} ${f1(base)}V${f1(jy)}" style="stroke:var(--brand);stroke-width:2"/><path d="M${f1(jx-16)} ${f1(base)}h8M${f1(jx-16)} ${f1(jy)}h8" style="stroke:var(--brand);stroke-width:1.4"/>`;
    s+=`<text x="${f1(jx-20)}" y="${f1(Math.min(base-4,(base+jy)/2+4))}" class="t-xs t-end ec-halo" style="fill:var(--brand);font-weight:700">${st.toFixed(2)} mm</text>`;
    s+=`<text x="${f1(jx+8)}" y="${f1(base+30)}" class="t-xs" style="fill:var(--brand)">J point</text><text x="${f1(P.x+6)}" y="${f1(base+16)}" class="t-xs">baseline</text>`;
    s+=`<text x="${f1(P.x+6)}" y="${f1(P.y+P.h-6)}" class="t-xs">1 small square = 1 mm · calibration step = 10 mm</text>`;
    /* ladder of thresholds for this person */
    const ks=['oth','v23','post','rv'],cw=P.lw/4,Y=v=>P.ly+P.lh-(v/4)*P.lh;
    s+=`<text x="${P.lx-30}" y="${P.ly-14}" class="t-sm">THRESHOLDS FOR ${sex==='m'?'A MAN':'A WOMAN'}, ${age} Y</text>`;
    [0,1,2,3,4].forEach(v=>s+=`<line x1="${P.lx}" x2="${P.lx+P.lw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${P.lx-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v} mm</text>`);
    ks.forEach((k,i)=>{const h=thr(k,sex,age),x=P.lx+i*cw+cw*.18,w=cw*.64,on=k===g,ok=st>=h.v-1e-9;
      s+=`<rect x="${f1(x)}" y="${f1(Y(h.v))}" width="${f1(w)}" height="${f1(P.ly+P.lh-Y(h.v))}" rx="3" style="fill:${on?'var(--dx)':'var(--dx-soft)'};stroke:var(--dx);stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${f1(Y(h.v)-5)}" class="t-xs t-mid ec-halo" style="fill:${ok?'var(--good)':'var(--ink)'};font-weight:700">${h.v}${ok?' ✓':''}</text><text x="${f1(x+w/2)}" y="${f1(P.ly+P.lh+14)}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${GRP[k].nn}</text>`});
    s+=`<line x1="${P.lx-4}" x2="${P.lx+P.lw+4}" y1="${f1(Y(st))}" y2="${f1(Y(st))}" style="stroke:var(--brand);stroke-width:2"/><circle cx="${P.lx+P.lw+4}" cy="${f1(Y(st))}" r="4" style="fill:var(--brand)"/><text x="${P.lx+P.lw}" y="${f1(Y(st)-6)}" class="t-xs t-end ec-halo" style="fill:var(--brand);font-weight:700">ST ${st.toFixed(2)}</text>`;
    cs.innerHTML=s;
    let cls='no',msg;
    const rvTxt=g==='rv'?' In V3R/V4R UDMI4 treats this as supportive of right ventricular infarction.':'';
    if(meets&&contig&&nw){cls='yes';msg=`Meets the published UDMI4 threshold for ${GRP[g].n} (${th.v} mm, ${th.who}).${rvTxt}`}
    else if(meets&&!contig){cls='maybe';msg=`${st.toFixed(2)} mm reaches ${th.v} mm, but UDMI4 asks for the change in two contiguous leads: one lead alone does not meet the criterion.`}
    else if(meets&&!nw){cls='maybe';msg=`${st.toFixed(2)} mm reaches ${th.v} mm, but UDMI4 counts new or presumed new elevation. Long-standing elevation (for example an old scar or a normal variant) is compared with previous ECGs.`}
    else msg=`Below the published threshold for ${GRP[g].n}: ${st.toFixed(2)} mm vs ${th.v} mm. This does not exclude a heart attack.`;
    const V=$('#ecVerdict');V.className='verdict '+cls;V.textContent=msg;
    $('#ecCritNote').innerHTML=noteHTML({k:`${GRP[g].n} · ${sex==='m'?'man':'woman'} · ${age} years`,t:'Why the threshold moves',
      txt:g==='v23'?`V2–V3 sit close to the heart and often show some J-point elevation in healthy people, so UDMI4 sets higher cut-offs there: healthy men under 40 can have up to 2.5 mm, with lower values in women. [[Thygesen2018UDMI4C]]`
        :g==='post'?`V7–V9 are placed on the back, farther from the heart, so smaller voltages count: UDMI4 recommends 0.5 mm, and 1 mm in men under 40. The ESC calls ST depression in V1–V3 and/or ST elevation in V7–V9 highly suggestive of posterior occlusion. [[Thygesen2018UDMI4C,Byrne2023ESC]]`
        :g==='rv'?`Right-sided leads look at the right ventricle, often involved in inferior MI. UDMI4: ≥0.5 mm (≥1 mm in men under 30) is supportive, and its absence does not exclude right ventricular infarction. [[Thygesen2018UDMI4C]]`
        :`In every lead except V2–V3, UDMI4 uses one threshold for all adults: new or presumed new J-point elevation of at least 1 mm in two contiguous leads. [[Thygesen2018UDMI4C]]`,
      pt:`The ruler is the small squares on ECG paper. Where the rule says "2 mm", it means the flat part of the beat sits two small squares above the baseline.`,
      hook:`A normal ECG does not exclude ACS: it may be normal in more than one-third of NSTE-ACS. LBBB or a paced rhythm precludes accurate ST assessment. [[Byrne2023ESC]]`});
  }
  ['ecGrp','ecAge','ecMm','ecContig','ecNew'].forEach(id=>{const el=$('#'+id);el.addEventListener('input',drawC);el.addEventListener('change',drawC)});
  $$('[data-ecsex]').forEach(b=>b.addEventListener('click',()=>{sex=b.dataset.ecsex;$$('[data-ecsex]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC()}));
  drawC();
  const prevR=redraws.ecg;redraws.ecg=()=>{prevR&&prevR();drawC()};
};
