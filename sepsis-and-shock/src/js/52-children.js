/* ===== 5.2 Sepsis in babies and children ===== */
/* timings from Thompson 2006 (meningococcal disease in 448 UK children); hour = t*24 */
const CH_STEPS=[
 {from:0,at:2/24,t:'0–6 h',k:'First hours',h:'At first, it looks like any illness',
  txt:`Most children had only non-specific symptoms in the first 4–6 hours, the kind seen with many ordinary infections, yet many were close to death by 24 hours. This is why early recognition is so hard. [[Thompson2006Meningococcal]]`,
  pt:`In the first hours, a child with sepsis can look like a child with a cold or a tummy bug. What matters is how fast things change.`,
  hook:`Meningococcal disease: non-specific symptoms in the first 4–6 h.`},
 {from:6/24,at:8.5/24,t:'≈8 h',k:'Early sepsis signs',h:'Leg pain, cold hands and feet, odd skin colour',
  txt:`72% of the children had early sepsis signs (leg pains, cold hands and feet, abnormal skin colour). They first appeared at a median of 8 hours, well before the classic signs. [[Thompson2006Meningococcal]]`,
  pt:`Watch for a child who will not walk or stand because their legs hurt, hands and feet that are cold even in a warm room, and skin that looks pale, blotchy or bluish.`,
  hook:`Early signs at a median of 8 h in 72%: leg pain, cold extremities, abnormal skin colour.`},
 {from:12/24,at:15.5/24,t:'13–22 h',k:'Classic late signs',h:'Rash, stiff neck, drowsiness',
  txt:`The classic signs (haemorrhagic rash, meningism, impaired consciousness) appeared late, at a median onset of 13–22 hours. The authors urge parents and clinicians to look for the early signs rather than wait for the rash. [[Thompson2006Meningococcal]]`,
  pt:`A rash that does not fade, a stiff neck or a child who is very hard to wake are late signs. By then the child is seriously ill.`,
  hook:`Haemorrhagic rash, meningism and impaired consciousness: median onset 13–22 h.`},
 {from:18/24,at:19.2/24,t:'19 h',k:'Hospital',h:'Median hospital admission: 19 hours',
  txt:`The median time to hospital admission was 19 hours. Only 51% of the children were sent to hospital after the first consultation. [[Thompson2006Meningococcal]]`,
  pt:`Many children were seen by a doctor early but sent home, because it looked like a minor illness. If your child gets worse after being seen, go back or call for help. That is the right thing to do.`,
  hook:`Only 51% were referred to hospital at the first consultation.`},
 {from:21/24,at:23.6/24,t:'24 h',k:'By 24 hours',h:'Why hours matter',
  txt:`Most children had only non-specific symptoms in the first 4–6 hours but were close to death by 24 hours. The window between the early sepsis signs (about 8 h) and admission (about 19 h) is where recognition can be earlier. [[Thompson2006Meningococcal]]`,
  pt:`Spotting the early signs gives doctors hours that matter. You do not need to be sure it is sepsis to ask for help.`,
  hook:`Early signs at ~8 h, admission at ~19 h: an 11-hour window for earlier recognition.`}];
const CH_CHIPS=[{h:0,s:'Non-specific symptoms'},{h:8,s:'Leg pain'},{h:8,s:'Cold hands and feet'},{h:8,s:'Abnormal skin colour'},{h:13,s:'Haemorrhagic rash'},{h:13,s:'Stiff neck (meningism)'},{h:13,s:'Drowsy, hard to wake'},{h:19,s:'Admitted to hospital'}];
/* Phoenix Sepsis Score (DeWitt 2024 table) */
const CH_MAP=[[17,30],[25,38],[31,43],[32,44],[36,48],[38,51]];
function chPhoenix(o){const r=o.resp,vas=o.vaso,lac=o.lac>=11?2:o.lac>=5?1:0,M=CH_MAP[o.age],mp=o.map<M[0]?2:o.map<=M[1]?1:0,cv=vas+lac+mp;
  const co=Math.min(2,(o.plt?1:0)+(o.inr?1:0)+(o.dd?1:0)+(o.fib?1:0)),ne=o.pup?2:o.gcs?1:0;return {r,cv,vas,lac,mp,co,ne,total:r+cv+co+ne}}
const CH_FEAST=[{n:'48 hours',v:[10.6,10.5,7.3]},{n:'4 weeks',v:[12.2,12.0,8.7]}];
inits.children=()=>{
  /* ---------- 1. the first 24 hours ---------- */
  const svg=$('#chSvg'),rg=$('#chT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(CH_STEPS,t),st=CH_STEPS[p],h=t*24;
    const L=N?{bx:110,by:52,bs:.78,cx:220,cy:62,cw:168,ax0:24,ax1:376,ay:540}:{bx:140,by:48,bs:.98,cx:300,cy:50,cw:190,ax0:300,ax1:690,ay:318};
    let s=`<text x="${N?16:20}" y="26" class="t-big" style="fill:${p>=1?'var(--rec)':'var(--ink)'}">${st.h}</text>`;
    const cold=ramp(h,6,9),mot=ramp(h,7,10)*.85;
    const B=body(L.bx,L.by,L.bs,{id:'chB',cold,mottle:mot});s+=B.svg;
    const k=B.at.knee,hd=B.at.brain,bs=L.bs;
    const lp=ramp(h,6.5,8.5);if(lp>0)[0,40*bs].forEach(dx=>{s+=`<path d="M${f1(k[0]+dx-8)} ${f1(k[1]-18)}l6 5l-6 5l6 5l-6 5" style="fill:none;stroke:var(--accent);stroke-width:2;opacity:${f1(lp)}"/>`});
    const rs=ramp(h,13,18);if(rs>0){const rr=rng(31);for(let i=0;i<Math.round(rs*22);i++){const x=L.bx+(rr()-.5)*60*bs,y=L.by+(60+rr()*180)*bs;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(1.6+rr()*1.6)}" style="fill:var(--clot)"/>`}}
    const dz=ramp(h,14,18);if(dz>0)s+=`<text x="${f1(hd[0]+22*bs)}" y="${f1(hd[1]-18*bs)}" class="t-big" style="fill:var(--dx);opacity:${f1(dz)}">z</text><text x="${f1(hd[0]+34*bs)}" y="${f1(hd[1]-30*bs)}" class="t-sm" style="fill:var(--dx);opacity:${f1(dz)}">z</text>`;
    if(h>=19){const op=ramp(h,19,20),hx=N?L.ax1-30:L.ax1-40,hy=N?L.cy+10:L.cy+232;s+=`<g style="opacity:${f1(op)}"><rect x="${hx-16}" y="${hy-16}" width="32" height="32" rx="6" style="fill:var(--panel);stroke:var(--bad);stroke-width:1.6"/><path d="M${hx} ${hy-9}v18M${hx-9} ${hy}h18" style="stroke:var(--bad);stroke-width:4"/></g>`}
    /* chips */
    CH_CHIPS.forEach((c,i)=>{const on=h>=c.h,y=L.cy+i*(N?26:27),op=c.h===0?(h<7?1:.4):ramp(h,c.h-.6,c.h);
      s+=`<rect x="${L.cx}" y="${y}" width="${L.cw}" height="22" rx="11" style="fill:${on?(c.h===13?'var(--bad-soft)':c.h===8?'var(--accent-soft)':'var(--panel)'):'var(--panel)'};stroke:${on?'var(--line)':'var(--line)'};opacity:${f1(.25+.75*op)}"/><text x="${L.cx+10}" y="${y+15}" class="t-xs" style="fill:var(--ink);opacity:${f1(.3+.7*op)}">${c.s}</text>`});
    /* timeline */
    const X=v=>L.ax0+(L.ax1-L.ax0)*v/24;
    s+=`<rect x="${f1(X(0))}" y="${L.ay-26}" width="${f1(X(6)-X(0))}" height="12" rx="3" style="fill:var(--panel-2)"/><text x="${f1(X(0))}" y="${L.ay-32}" class="t-xs">non-specific</text>`;
    s+=`<rect x="${f1(X(13))}" y="${L.ay-26}" width="${f1(X(22)-X(13))}" height="12" rx="3" style="fill:var(--bad-soft)"/><text x="${f1(X(13))}" y="${L.ay-32}" class="t-xs">classic signs</text>`;
    s+=`<circle cx="${f1(X(8))}" cy="${L.ay-20}" r="6" style="fill:var(--accent)"/><text x="${f1(X(8))}" y="${L.ay-32}" class="t-xs t-mid">early</text>`;
    s+=`<line x1="${f1(X(19))}" x2="${f1(X(19))}" y1="${L.ay-30}" y2="${L.ay}" style="stroke:var(--bad);stroke-width:2"/><text x="${f1(X(19))}" y="${L.ay+26}" class="t-xs t-mid" style="fill:var(--bad)">admission</text>`;
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    [0,6,12,18,24].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${L.ay+13}" class="t-xs t-mid">${v} h</text>`});
    s+=`<path d="M${f1(X(h))} ${L.ay-40}v44" style="stroke:var(--rec);stroke-width:2.4"/><circle cx="${f1(X(h))}" cy="${L.ay-40}" r="4" style="fill:var(--rec)"/>`;
    svg.innerHTML=s;
    $('#chNote').innerHTML=noteHTML({k:st.k,t:st.h,txt:st.txt,pt:st.pt,hook:st.hook});
    $('#chRead').innerHTML=`<span>Hour <b>${Math.floor(h)}</b> of 24</span><span>Signs shown <b>${CH_CHIPS.filter(c=>h>=c.h).length}</b></span>`;
    mark(p)}
  const stop=playWire(rg,$('#chPlay'),draw,16000,'Replay','children');
  const mark=stepWire($('#chSteps'),CH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. newborn timeline ---------- */
  const neo=$('#chNeo');
  function dneo(){const N=vb(neo,'720 260','400 430');let s='';
    const bar=(x,y,w,v,lab)=>`<text x="${x}" y="${y-4}" class="t-xs">${lab}</text><rect x="${x}" y="${y}" width="${f1(w)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${x}" y="${y}" width="${f1(w*v/100)}" height="12" rx="3" style="fill:var(--rec)"/><text x="${f1(x+w*v/100+5)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${v}%</text>`;
    if(!N){const x0=30,x72=280,x1=690,y=56;
      s+=`<rect x="${x0}" y="${y-18}" width="${x72-x0}" height="26" rx="6" style="fill:var(--rec-soft);stroke:var(--rec)"/><text x="${(x0+x72)/2}" y="${y}" class="t-lbl t-mid">Early onset: first 72 h</text>`;
      s+=`<rect x="${x72+6}" y="${y-18}" width="${x1-x72-6}" height="26" rx="6" style="fill:var(--panel);stroke:var(--line)"/><text x="${(x72+x1)/2}" y="${y}" class="t-lbl t-mid">Late onset: after 3 days</text>`;
      s+=`<text x="${x0}" y="${y+28}" class="t-xs">birth</text><text x="${x72}" y="${y+28}" class="t-xs t-mid">72 h</text>`;
      s+=`<text x="${x0}" y="${y+56}" class="t-sm" style="fill:var(--ink)">1.08 per 1,000 live births</text><text x="${x0}" y="${y+72}" class="t-xs">18.47 per 1,000 at 22–28 weeks</text>`;
      s+=bar(x0,y+104,170,36.6,'E. coli')+bar(x0,y+140,170,30.2,'Group B streptococcus');
      s+=`<text x="${x72+20}" y="${y+56}" class="t-sm" style="fill:var(--ink)">Very low birth weight babies surviving beyond 3 days</text>`;
      s+=bar(x72+20,y+104,220,21,'Culture-proven late-onset sepsis')+bar(x72+20,y+140,220,48,'Of these: coagulase-negative staphylococci');
      s+=`<text x="${x72+20}" y="${y+184}" class="t-xs">mortality 18% infected vs 7% uninfected</text>`}
    else{let y=30;
      s+=`<rect x="12" y="${y-18}" width="376" height="26" rx="6" style="fill:var(--rec-soft);stroke:var(--rec)"/><text x="200" y="${y}" class="t-lbl t-mid">Early onset: first 72 hours</text>`;
      s+=`<text x="16" y="${y+30}" class="t-sm" style="fill:var(--ink)">1.08 per 1,000 live births</text><text x="16" y="${y+46}" class="t-xs">18.47 per 1,000 at 22–28 weeks</text>`;
      s+=bar(16,y+76,240,36.6,'E. coli')+bar(16,y+110,240,30.2,'Group B streptococcus');
      y=230;s+=`<rect x="12" y="${y-18}" width="376" height="26" rx="6" style="fill:var(--panel);stroke:var(--line)"/><text x="200" y="${y}" class="t-lbl t-mid">Late onset: after 3 days</text>`;
      s+=`<text x="16" y="${y+30}" class="t-xs" style="fill:var(--ink)">Very low birth weight babies beyond 3 days</text>`;
      s+=bar(16,y+60,240,21,'Culture-proven late-onset sepsis')+bar(16,y+94,240,48,'Of these: coagulase-negative staph');
      s+=`<text x="16" y="${y+130}" class="t-xs">mortality 18% infected vs 7% uninfected</text>`}
    neo.innerHTML=s}
  dneo();

  /* ---------- 3. FEAST ---------- */
  const fe=$('#chFeast');let ft=0;
  function dfeast(){const N=vb(fe,'720 220','400 260'),D=CH_FEAST[ft],labs=['Albumin bolus','Saline bolus','No bolus'];
    const x0=N?40:120,w=N?340:520,y0=N?220:180,hh=N?170:140,Y=v=>y0-hh*v/14,bw=N?80:110,gap=(w-3*bw)/4;
    let s=`<line x1="${x0}" x2="${x0+w}" y1="${y0}" y2="${y0}" class="axis"/>`;
    [0,5,10].forEach(v=>{s+=`<text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text><line x1="${x0}" x2="${x0+w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`});
    D.v.forEach((v,i)=>{const x=x0+gap+i*(bw+gap);s+=`<rect x="${f1(x)}" y="${f1(Y(v))}" width="${bw}" height="${f1(y0-Y(v))}" rx="4" style="fill:${i<2?'var(--fluid)':'var(--rec)'}"/><text x="${f1(x+bw/2)}" y="${f1(Y(v)-6)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${v.toFixed(1)}%</text><text x="${f1(x+bw/2)}" y="${y0+14}" class="t-xs t-mid">${labs[i]}</text>`});
    s+=`<text x="${x0}" y="16" class="t-sm" style="fill:var(--ink)">Mortality at ${D.n}</text>`;fe.innerHTML=s}
  $('#chFtog').addEventListener('click',e=>{const b=e.target.closest('[data-ft]');if(!b)return;ft=+b.dataset.ft;$$('#chFtog [data-ft]').forEach(x=>x.setAttribute('aria-pressed',x===b));dfeast()});
  dfeast();
  redraws.children=(()=>{const prev=redraws.children;return()=>{prev&&prev();dneo();dfeast()}})();

  /* ---------- 4. Phoenix teaching calculator ---------- */
  const F={resp:$('#chResp'),vaso:$('#chVaso'),lac:$('#chLac'),age:$('#chAge'),map:$('#chMap'),plt:$('#chPlt'),inr:$('#chInr'),dd:$('#chDd'),fib:$('#chFib'),gcs:$('#chGcs'),pup:$('#chPup')};
  const DEF={resp:'0',vaso:'0',lac:1.5,age:'3',map:62,plt:false,inr:false,dd:false,fib:false,gcs:false,pup:false};
  const EX={resp:'2',vaso:'1',lac:6.2,age:'3',map:40,plt:true,inr:true,dd:false,fib:false,gcs:false,pup:false};
  function calc(){const o={resp:+F.resp.value,vaso:+F.vaso.value,lac:parseFloat(F.lac.value)||0,age:+F.age.value,map:parseFloat(F.map.value)||0,plt:F.plt.checked,inr:F.inr.checked,dd:F.dd.checked,fib:F.fib.checked,gcs:F.gcs.checked,pup:F.pup.checked};
    const P=chPhoenix(o),sep=P.total>=2,sh=sep&&P.cv>=1;
    $('#chRes').innerHTML=`<div><small>Phoenix score</small><b>${P.total}</b></div><div><small>Respiratory</small><b>${P.r}</b></div><div><small>Cardiovascular</small><b>${P.cv}</b></div><div><small>Coagulation</small><b>${P.co}</b></div><div><small>Neurological</small><b>${P.ne}</b></div>`;
    const M=CH_MAP[o.age];
    $('#chPnote').innerHTML=noteHTML({k:'Teaching calculator',t:sh?'Meets the septic shock criteria (with suspected infection)':sep?'Meets the sepsis criteria (with suspected infection)':'Score below 2',
      txt:`Cardiovascular ${P.cv} = vasoactive ${P.vas} + lactate ${P.lac} + MAP ${P.mp} (for this age, 1 point at ${M[0]}–${M[1]} mmHg, 2 points below ${M[0]}). [[DeWitt2024phoenix]] ${sep?`With suspected infection, a score of 2 or more meets the Phoenix definition of sepsis${sh?', and at least 1 cardiovascular point makes it septic shock':''}. [[Schlapbach2024Phoenix]]`:`Phoenix sepsis needs a score of 2 or more in a child with suspected infection. [[Schlapbach2024Phoenix]]`}`,
      pt:`This only shows how the published points add up. Nearly every item needs hospital tests. If a child seems very unwell, seek help urgently, whatever the score.`,
      hook:`Phoenix: respiratory 0–3, cardiovascular 0–6, coagulation 0–2, neurological 0–2.`})}
  function load(v){Object.keys(v).forEach(k=>{if(F[k].type==='checkbox')F[k].checked=v[k];else F[k].value=v[k]});calc()}
  Object.values(F).forEach(el=>{el.addEventListener('input',calc);el.addEventListener('change',calc)});
  $('#chEx').addEventListener('click',()=>load(EX));$('#chReset').addEventListener('click',()=>load(DEF));
  calc();
};
