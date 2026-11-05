/* ===== 2.2 Recognising sepsis ===== */
/* NEWS2 points as in the chart reproduced by Verma 2023 (from RCP 2017). Teaching only. */
function rcPts(o){
  const rr=o.rr<=8?3:o.rr<=11?1:o.rr<=20?0:o.rr<=24?2:3;
  let sp;if(o.scale===2){const s=o.sp,ox=o.o2;sp=s<=83?3:s<=85?2:s<=87?1:s<=92?0:!ox?0:s<=94?1:s<=96?2:3}
  else sp=o.sp<=91?3:o.sp<=93?2:o.sp<=95?1:0;
  const o2=o.o2?2:0;
  const bp=o.sbp<=90?3:o.sbp<=100?2:o.sbp<=110?1:o.sbp<=219?0:3;
  const hr=o.hr<=40?3:o.hr<=50?1:o.hr<=90?0:o.hr<=110?1:o.hr<=130?2:3;
  const cn=o.conf?3:0;
  const tt=Math.round(o.temp*10)/10,te=tt<=35?3:tt<=36?1:tt<=38?0:tt<=39?1:2;
  const P={rr,sp,o2,bp,hr,cn,te};P.total=rr+sp+o2+bp+hr+cn+te;P.any3=[rr,sp,bp,hr,cn,te].some(v=>v===3);return P}
function rcBand(P){return P.total>=7?{k:'high',l:'High',c:'var(--bad)'}:P.total>=5?{k:'med',l:'Medium',c:'var(--warn)'}:P.any3?{k:'lm',l:'Low-medium',c:'var(--warn)'}:{k:'low',l:'Low',c:'var(--good)'}}
const RC_SIGNS=[
 {L:'S',w:'Slurred speech or confusion',v:22.2},{L:'E',w:'Extreme shivering or muscle pain, fever',v:54.9},{L:'P',w:'Passing no urine all day',v:4.1},
 {L:'S',w:'Severe breathlessness',v:41.4},{L:'I',w:'It feels like you are going to die',v:1.1},{L:'S',w:'Skin mottled or discoloured',v:1.1}];
const RC_STEPS=[
 {from:0,at:.06,t:'An infection',k:'Where it starts',h:'It starts with an infection',
  txt:`Sepsis begins with an infection somewhere in the body: here, the lungs, because pneumonia was the commonest infection behind sepsis in a CDC review of 325 patients. Early on, it can look like an ordinary illness. Vague presenting symptoms were independently linked with in-hospital death in a Thai cohort (adjusted OR 2.17). [[Novosad2016MMWR,Wattanapaiboon2020SEPSIS]]`,
  pt:`Most infections get better. The worry is a person who becomes much more unwell than you would expect, or keeps getting worse.`,
  hook:`Pneumonia is the commonest source of sepsis in the CDC New York review.`},
 {from:.12,at:.18,t:'S · Confusion',k:'S',h:'Slurred speech or confusion',
  txt:`New confusion, drowsiness or slurred speech can mean the brain is not getting enough blood and oxygen. Altered mentation is one of the three qSOFA items, and new confusion scores the full 3 points in NEWS2. In the Thai cohort, 22.2% of people with sepsis reported it. [[Seymour2016qSOFA,Verma2023NEWS2,Wattanapaiboon2020SEPSIS]]`,
  pt:`If someone is muddled, saying odd things, or very hard to wake, and this is new, treat it as serious.`,
  hook:`New confusion = 3 points on NEWS2 and 1 point on qSOFA.`},
 {from:.25,at:.31,t:'E · Shivering, fever',k:'E',h:'Extreme shivering or muscle pain, fever',
  txt:`This was the commonest sign in the Thai emergency cohort, reported by 54.9%. Temperature counts both ways in NEWS2: 38.1°C or more scores points, and so does 36.0°C or below. [[Wattanapaiboon2020SEPSIS,Verma2023NEWS2]]`,
  pt:`Uncontrollable shaking, severe aches, or feeling very hot or very cold can all be part of sepsis. A normal or low temperature does not rule it out.`,
  hook:`NEWS2 scores a low temperature (≤35.0°C = 3 points) as well as fever.`},
 {from:.37,at:.43,t:'P · No urine',k:'P',h:'Passing no urine all day',
  txt:`When blood pressure falls and blood flow to the kidneys drops, they make less urine. Few people mentioned it (4.1% in the Thai cohort), so it is a sign to ask about directly. Urine output is also part of the kidney score in SOFA. [[Wattanapaiboon2020SEPSIS,Lambden2019SOFA]]`,
  pt:`Ask when the person last passed urine. Very little or none for many hours is a warning sign.`,
  hook:`Low urine output reflects poor kidney perfusion; SOFA counts urine below 500 ml/day.`},
 {from:.5,at:.56,t:'S · Breathless',k:'S',h:'Severe breathlessness',
  txt:`Fast breathing is one of the earliest and most useful observations. A respiratory rate of 22 or more is a qSOFA item, and NEWS2 gives 2 points at 21–24 and 3 points at 25 or more breaths a minute. 41.4% of the Thai cohort reported breathlessness. [[Seymour2016qSOFA,Verma2023NEWS2,Wattanapaiboon2020SEPSIS]]`,
  pt:`Count the breaths for a minute. Breathing very fast, or struggling to speak in sentences, needs urgent help.`,
  hook:`RR ≥22 (qSOFA); RR ≥25 = 3 points (NEWS2).`},
 {from:.62,at:.68,t:'I · Feels like dying',k:'I',h:'It feels like you are going to die',
  txt:`Some people describe an overwhelming sense that something is very wrong. Only 1.1% of the Thai cohort said this, so its absence means little, but when a person or family says it, it deserves to be taken seriously. [[Wattanapaiboon2020SEPSIS]]`,
  pt:`If the person says they have never felt this ill, believe them and get help.`,
  hook:`The SEPSIS mnemonic is an awareness tool and "has not been validated".`},
 {from:.75,at:.81,t:'S · Skin',k:'S',h:'Skin mottled or discoloured',
  txt:`Mottled, blotchy, pale-blue or grey skin, often on the knees and limbs, and cold hands and feet are signs that blood is not reaching the skin. In children with meningococcal disease, abnormal skin colour and cold hands and feet were early signs, appearing at a median of 8 hours. [[Wattanapaiboon2020SEPSIS,Thompson2006Meningococcal]]`,
  pt:`Look at the skin on the knees, arms and lips. Blotchy, bluish or grey patches are a reason to call for help now.`,
  hook:`Early meningococcal sepsis signs: leg pain, cold hands and feet, abnormal skin colour.`},
 {from:.88,at:.95,t:'None of these',k:'A caution',h:'No sign does not mean no sepsis',
  txt:`In the Thai cohort, 14.9% of people with sepsis had none of the six SEPSIS signs. The mnemonic raises awareness; it cannot rule sepsis out. Doctors combine the story, the examination, repeated observations and tests. [[Wattanapaiboon2020SEPSIS]]`,
  pt:`If you are worried, say so, even if the person does not fit a checklist. Ask: could this be sepsis?`,
  hook:`About 1 in 7 people with sepsis in the Thai cohort had none of the SEPSIS signs.`}];
/* invented example patient for the timeline, all on air */
const RC_OBS=[{h:0,rr:16,sp:97,sbp:128,hr:84,temp:37.6,conf:false},{h:2,rr:19,sp:96,sbp:122,hr:94,temp:38.3,conf:false},
  {h:4,rr:21,sp:95,sbp:114,hr:102,temp:38.7,conf:false},{h:6,rr:23,sp:94,sbp:106,hr:112,temp:38.9,conf:false},{h:8,rr:25,sp:93,sbp:98,hr:118,temp:39.2,conf:true}]
  .map(o=>Object.assign(o,{scale:1,o2:false,P:rcPts(Object.assign({scale:1,o2:false},o))}));
const RC_STEPS2=[
 {from:0,at:.02,t:'Hour 0',k:'Observations · hour 0',h:'All six observations normal',
  txt:`Breathing 16, SpO₂ 97% on air, systolic BP 128, pulse 84, temperature 37.6°C, alert: every observation sits in the 0-point column. A score of 0 is the low band. [[Verma2023NEWS2]]`,
  pt:`At the start, every number is in the normal range, so the score is 0.`,hook:`NEWS2 0–4 = low clinical risk.`},
 {from:.2,at:.21,t:'Hour 2',k:'Observations · hour 2',h:'Pulse and temperature tick up',
  txt:`Pulse 94 (91–110: 1 point) and temperature 38.3°C (38.1–39.0: 1 point). Total 2, still the low band. Nothing looks dramatic yet, which is exactly why the trend matters. [[Verma2023NEWS2]]`,
  pt:`Small changes like a faster pulse and a fever are common in any infection. On their own they do not mean sepsis.`,hook:`Pulse 91–110 = 1; temperature 38.1–39.0 = 1.`},
 {from:.4,at:.41,t:'Hour 4',k:'Observations · hour 4',h:'Breathing speeds up: medium band',
  txt:`Breathing 21 (21–24: 2 points), SpO₂ 95% (1), pulse 102 (1), temperature 38.7°C (1): total 5, the medium band (5–6). Breathing rate is often the first observation to move. Churpek found qSOFA ≥2 was first met a median of only 5 hours before death or ICU transfer, against 17 hours for SIRS ≥2. [[Verma2023NEWS2,Churpek2017]]`,
  pt:`The breathing is getting faster. Together, the small changes now add up to a score that tells staff to look more closely.`,hook:`NEWS2 5–6 = medium clinical risk.`},
 {from:.6,at:.61,t:'Hour 6',k:'Observations · hour 6',h:'Blood pressure falls: high band',
  txt:`Breathing 23 (2), SpO₂ 94% (1), systolic 106 (101–110: 1), pulse 112 (111–130: 2), temperature 38.9°C (1): total 7, the high band. In 198,755 observation sets, NEWS discriminated death within 24 hours with AUROC 0.894. [[Verma2023NEWS2,Smith2013NEWS]]`,
  pt:`Now the score is high. On the chart, this band means a high clinical risk: a signal that this person may be seriously ill.`,hook:`NEWS2 ≥7 = high clinical risk.`},
 {from:.8,at:.85,t:'Hour 8',k:'Observations · hour 8',h:'New confusion',
  txt:`Breathing 25 (3), SpO₂ 93% (2), systolic 98 (91–100: 2), pulse 118 (2), temperature 39.2°C (2) and new confusion (3): total 14. Two single observations now score 3 each. This invented patient also meets qSOFA (breathing ≥22, systolic ≤100, altered mentation), which was framed in Sepsis-3 as a prompt to consider possible sepsis. [[Verma2023NEWS2,Seymour2016qSOFA]]`,
  pt:`New confusion plus very fast breathing and falling blood pressure is an emergency. Recognising the rising trend earlier is the aim.`,hook:`A single parameter scoring 3 is low-medium risk even when the total is low.`}];
inits.recognise=()=>{
  /* ---------- 1. the SEPSIS signs ---------- */
  const svg=$('#rcSvg'),rg=$('#rcT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(RC_STEPS,t),st=RC_STEPS[p],nx=p<RC_STEPS.length-1?RC_STEPS[p+1].from:1.0001,lp=ease(ramp(t,st.from,st.from+(nx-st.from)*.45)),si=p-1;
    const L=N?{bx:200,by:66,bs:.78,th:{x:150,y:72},rx:16,ry:318,rw:368,rh:34,ix:24,iy:546}:{bx:170,by:62,bs:1.05,th:{x:96,y:80},rx:356,ry:44,rw:346,rh:40,ix:372,iy:302};
    let s='';
    const shiv=si===1?Math.sin(t*900)*2.4*lp:0;
    const B=body(L.bx+shiv,L.by,L.bs,{id:'rcB',infect:{site:'lung',v:p===0?.4+.6*lp:.35},mottle:si===5?lp:0,cold:si===5?lp:0});
    const hd=B.at.brain,lu=B.at.lung,bl=B.at.bladder,hs=L.bs;
    s+=`<text x="${N?16:20}" y="28" class="t-big" style="fill:${p>0&&p<7?'var(--accent)':'var(--ink)'}">${p>0&&p<7?RC_SIGNS[si].L+' · '+RC_SIGNS[si].w:st.h}</text>`;
    s+=B.svg;
    if(si===0){for(let i=0;i<4;i++){const a=t*40+i*Math.PI/2,r=34*hs;s+=`<text x="${f1(hd[0]+Math.cos(a)*r)}" y="${f1(hd[1]-4+Math.sin(a)*r*.55)}" class="t-big t-mid" style="fill:var(--accent);opacity:${f1(lp)}">?</text>`}
      s+=`<path d="M${f1(hd[0]+22*hs)} ${f1(hd[1]-28*hs)}c6 -6 12 0 6 6s-12 0 -6 -12" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(lp)}"/>`}
    if(si===1){s+=thermometer(L.bx+62*hs,L.by+10,60*hs,.45+.5*lp,{w:8,label:'fever'});
      [-1,1].forEach(d=>{const ax=B.at.arm[0]+(d>0?96*hs:0)+d*10,ay=B.at.arm[1];for(let k=0;k<3;k++)s+=`<path d="M${f1(ax+d*k*6)} ${f1(ay-14)}q${f1(d*4)} 7 0 14q${f1(-d*4)} 7 0 14" style="fill:none;stroke:var(--accent);stroke-width:1.5;opacity:${f1(lp*(1-k*.25))}"/>`})}
    if(si===2){const dx=L.bx+(N?84:92)*hs,dy=bl[1]+10;s+=`<path d="M${f1(dx)} ${f1(dy-14)}C${f1(dx+9)} ${f1(dy-2)} ${f1(dx+9)} ${f1(dy+8)} ${f1(dx)} ${f1(dy+8)}C${f1(dx-9)} ${f1(dy+8)} ${f1(dx-9)} ${f1(dy-2)} ${f1(dx)} ${f1(dy-14)}Z" style="fill:none;stroke:var(--fluid);stroke-width:2;stroke-dasharray:3 3"/><line x1="${f1(dx-11)}" y1="${f1(dy+10)}" x2="${f1(dx+11)}" y2="${f1(dy-16)}" style="stroke:var(--bad);stroke-width:2.4;opacity:${f1(lp)}"/><text x="${f1(dx)}" y="${f1(dy+26)}" class="t-xs t-mid">no urine</text>`;
      s+=clock(dx,dy-62,20,lp*1440,{full:1440,col:'var(--accent)',label:'hours pass'})}
    if(si===3){s+=organ('lung',lu[0],lu[1],30*hs,{glow:lp});const ph=(t*30)%1;
      for(let k=0;k<3;k++){const u=(ph+k/3)%1;s+=`<path d="M${f1(hd[0]+16*hs+u*40)} ${f1(hd[1]+8-6)}q6 6 0 12" style="fill:none;stroke:var(--dx);stroke-width:2;opacity:${f1(lp*(1-u))}"/>`}}
    if(si===4){const bx=hd[0]+24*hs,by=hd[1]-10,bw=124;s+=`<g style="opacity:${f1(lp)}"><rect x="${f1(bx)}" y="${f1(by-30)}" width="${bw}" height="42" rx="12" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.6"/><path d="M${f1(bx+4)} ${f1(by+4)}l-12 10l18 -4" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.6"/><text x="${f1(bx+bw/2)}" y="${f1(by-13)}" class="t-sm t-mid" style="fill:var(--ink)">I feel like I'm</text><text x="${f1(bx+bw/2)}" y="${f1(by+2)}" class="t-sm t-mid" style="fill:var(--ink)">going to die</text></g>`}
    if(si===5)s+=`<text x="${f1(B.at.knee[0]+70*hs)}" y="${f1(B.at.knee[1])}" class="t-xs" style="opacity:${f1(lp)}">mottled, cold</text>`;
    /* the letters and how often each was reported */
    const X0=L.rx,bw=L.rw-150,sc=v=>bw*v/60;
    s+=`<text x="${X0}" y="${L.ry-8}" class="t-xs">reported by % of 437 patients</text>`;
    RC_SIGNS.forEach((g,i)=>{const y=L.ry+i*L.rh,on=i===si,done=i<si||p===7;
      s+=`<rect x="${X0}" y="${y}" width="${L.rw}" height="${L.rh-6}" rx="8" style="fill:${on?'var(--accent-soft)':'var(--panel)'};stroke:${on?'var(--accent)':'var(--line)'}"/>`;
      s+=`<text x="${X0+16}" y="${y+(L.rh-6)/2+7}" class="t-big t-mid" style="font-size:20px;fill:${on||done?'var(--accent)':'var(--muted)'}">${g.L}</text>`;
      const vv=on?g.v*lp:done?g.v:0;
      s+=`<rect x="${X0+34}" y="${y+(L.rh-6)/2-5}" width="${f1(Math.max(1,sc(vv)))}" height="10" rx="3" style="fill:var(--accent);opacity:${on?1:.5}"/>`;
      s+=`<text x="${X0+40+bw}" y="${y+(L.rh-6)/2+4}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}">${on||done?g.v.toFixed(1)+'%':''}</text>`});
    if(p===7){const I=icons(L.ix,L.iy-(N?20:0),{n:100,cols:20,k:15,size:N?11:12,gap:3,col:'var(--accent)',base:'var(--line)',shape:'dot'});
      s+=`<text x="${L.ix}" y="${L.iy-(N?28:8)}" class="t-sm" style="fill:var(--ink)">about 15 in 100 had none of the six (14.9%)</text>`+`<g style="opacity:${f1(lp)}">${I.svg}</g>`}
    svg.innerHTML=s;
    $('#rcNote').innerHTML=noteHTML({k:st.k,t:st.h,txt:st.txt,pt:st.pt,hook:st.hook});
    $('#rcRead').innerHTML=`<span>Step <b>${p+1}</b> of ${RC_STEPS.length}</span><span>${p>0&&p<7?'Reported by <b>'+RC_SIGNS[si].v.toFixed(1)+'%</b>':p===7?'None of the signs: <b>14.9%</b>':'Source: <b>lungs</b> (example)'}</span>`;
    mark(p)}
  const stop=playWire(rg,$('#rcPlay'),draw,16000,'Replay','recognise');
  const mark=stepWire($('#rcSteps'),RC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. the deterioration timeline ---------- */
  const svg2=$('#rcSvg2'),rg2=$('#rcT2');
  const ROWS=[['Breathing','rr',o=>o.rr,'/min'],['SpO₂','sp',o=>o.sp+'%',''],['Systolic BP','bp',o=>o.sbp,''],['Pulse','hr',o=>o.hr,''],['Temp','te',o=>o.temp.toFixed(1),'°C'],['Conscious','cn',o=>o.conf?'New C':'Alert','']];
  const PCOL=['var(--panel)','var(--warn-soft)','var(--accent-soft)','var(--bad-soft)'];
  function draw2(t){
    const N=vb(svg2,'720 380','400 560'),p=phaseOf(RC_STEPS2,t),st=RC_STEPS2[p],hr=clamp(t*10,0,8);
    const L=N?{lx:10,cx:112,cw:56,ry:36,rh:34,gx:40,gy:290,gw:340,gh:220}:{lx:16,cx:136,cw:110,ry:34,rh:30,gx:60,gy:236,gw:620,gh:124};
    let s=`<text x="${L.lx}" y="${L.ry-14}" class="t-xs">invented example · all on air</text>`;
    RC_OBS.forEach((o,j)=>{const x=L.cx+j*(L.cw+4),vis=ramp(hr,o.h-.6,o.h);
      s+=`<text x="${f1(x+L.cw/2)}" y="${L.ry-2}" class="t-xs t-mid" style="fill:${vis>0?'var(--ink)':'var(--muted)'}">h${o.h}</text>`;
      ROWS.forEach((r,i)=>{const y=L.ry+4+i*L.rh,pt=o.P[r[1]];
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${L.cw}" height="${L.rh-4}" rx="6" style="fill:${vis>0?PCOL[pt]:'var(--panel)'};stroke:var(--line);opacity:${f1(.25+.75*vis)}"/>`;
        if(vis>0)s+=`<text x="${f1(x+6)}" y="${f1(y+(L.rh-4)/2+4)}" class="t-sm" style="fill:var(--ink);opacity:${f1(vis)}">${r[2](o)}</text><text x="${f1(x+L.cw-6)}" y="${f1(y+(L.rh-4)/2+4)}" class="t-sm t-end" style="fill:${pt===3?'var(--bad)':'var(--muted)'};font-weight:600;opacity:${f1(vis)}">${pt}</text>`})});
    ROWS.forEach((r,i)=>{s+=`<text x="${L.lx}" y="${f1(L.ry+4+i*L.rh+(L.rh-4)/2+4)}" class="t-sm" style="fill:var(--ink)">${r[0]}</text>`});
    /* the score line with its bands */
    const Xh=h=>L.gx+L.gw*h/8,Ys=v=>L.gy+L.gh-L.gh*v/16;
    [[0,4.5,'var(--good)'],[4.5,6.5,'var(--warn)'],[6.5,16,'var(--bad)']].forEach(b=>{s+=`<rect x="${L.gx}" y="${f1(Ys(b[1]))}" width="${L.gw}" height="${f1(Ys(b[0])-Ys(b[1]))}" style="fill:${b[2]};opacity:.12"/>`});
    s+=`<text x="${L.gx+L.gw-4}" y="${f1(Ys(16)+12)}" class="t-xs t-end">high 7+</text><text x="${L.gx+L.gw-4}" y="${f1(Ys(6.5)+11)}" class="t-xs t-end">medium 5–6</text><text x="${L.gx+L.gw-4}" y="${f1(Ys(4.5)+11)}" class="t-xs t-end">low 0–4</text>`;
    s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${L.gy+L.gh}" y2="${L.gy+L.gh}" class="axis"/><line x1="${L.gx}" x2="${L.gx}" y1="${L.gy}" y2="${L.gy+L.gh}" class="axis"/>`;
    [0,2,4,6,8].forEach(h=>{s+=`<text x="${f1(Xh(h))}" y="${L.gy+L.gh+13}" class="t-xs t-mid">${h} h</text>`});
    [0,5,7,14].forEach(v=>{s+=`<text x="${L.gx-6}" y="${f1(Ys(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.gx}" y="${L.gy-6}" class="t-xs">NEWS2 total</text>`;
    const sc=h=>{let i=0;while(i<RC_OBS.length-1&&h>RC_OBS[i+1].h)i++;if(i>=RC_OBS.length-1)return RC_OBS[i].P.total;const a=RC_OBS[i],b=RC_OBS[i+1];return lerp(a.P.total,b.P.total,ramp(h,a.h,b.h))};
    let d='';for(let k=0;k<=60;k++){const h=hr*k/60;d+=(k?'L':'M')+f1(Xh(h))+' '+f1(Ys(sc(h)))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>`;
    RC_OBS.forEach(o=>{if(hr>=o.h){const B=rcBand(o.P);s+=`<circle cx="${f1(Xh(o.h))}" cy="${f1(Ys(o.P.total))}" r="5" style="fill:${B.c};stroke:var(--panel);stroke-width:1.5"/><text x="${f1(Xh(o.h))}" y="${f1(Ys(o.P.total)-9)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${o.P.total}</text>`}});
    svg2.innerHTML=s;
    const cur=RC_OBS[Math.min(4,Math.floor(hr/2+.0001))],B=rcBand(cur.P);
    $('#rcNote2').innerHTML=noteHTML({k:st.k,t:st.h,txt:st.txt,pt:st.pt,hook:st.hook});
    $('#rcRead2').innerHTML=`<span>Hour <b>${cur.h}</b></span><span>NEWS2 <b>${cur.P.total}</b></span><span>Band <b>${B.l}</b></span>`;
    mark2(p)}
  const stop2=playWire(rg2,$('#rcPlay2'),draw2,12000,'Replay','recognise');
  const mark2=stepWire($('#rcSteps2'),RC_STEPS2,rg2,draw2,stop2);
  draw2(+rg2.value);

  /* ---------- 3. the NEWS2 teaching calculator ---------- */
  const F={rr:$('#rcRR'),sp:$('#rcSp'),scale:$('#rcScale'),o2:$('#rcO2'),sbp:$('#rcSBP'),hr:$('#rcHR'),avpu:$('#rcAvpu'),temp:$('#rcTemp')};
  const DEF={rr:18,sp:97,scale:'1',o2:'air',sbp:124,hr:82,avpu:'a',temp:37.2},EX={rr:23,sp:94,scale:'1',o2:'air',sbp:106,hr:112,avpu:'a',temp:38.9};
  const num=(el,d)=>{const v=parseFloat(el.value);return isFinite(v)?v:d};
  function calc(){
    const o={rr:num(F.rr,18),sp:num(F.sp,97),scale:+F.scale.value,o2:F.o2.value==='o2',sbp:num(F.sbp,124),hr:num(F.hr,82),conf:F.avpu.value==='c',temp:num(F.temp,37.2)};
    const P=rcPts(o),B=rcBand(P),si=o.sbp>0?o.hr/o.sbp:0;
    $('#rcRes').innerHTML=`<div><small>NEWS2 total</small><b>${P.total}</b></div><div><small>Clinical risk band</small><b style="color:${B.c}">${B.l}</b></div><div><small>Shock index (HR ÷ SBP)</small><b>${si.toFixed(2)}</b></div>`;
    const ch=[['Breathing',P.rr],['SpO₂ (scale '+o.scale+')',P.sp],[o.o2?'Oxygen':'Air',P.o2],['Systolic BP',P.bp],['Pulse',P.hr],['Consciousness',P.cn],['Temperature',P.te]];
    $('#rcPts').innerHTML=ch.map(c=>`<span class="p${c[1]}">${c[0]}: <b>${c[1]}</b></span>`).join('');
    const why=B.k==='lm'?`The total is in the low range, but one observation scores 3 on its own, which the chart treats as low-medium risk.`:B.k==='high'?`A total of 7 or more is the high band on the NEWS2 chart.`:B.k==='med'?`A total of 5 or 6 is the medium band.`:`A total of 0 to 4, with no single 3, is the low band.`;
    const siTxt=si>=1?`A shock index of 1.0 or more was the most specific cut-off in Berger's pilot.`:si>=.7?`A shock index of 0.7 or more was linked with a raised lactate (≥4 mmol/L) about three times as often as below 0.7 in Berger's pilot.`:`Below 0.7, the shock index sat under the lower cut-off studied by Berger.`;
    $('#rcCalcNote').innerHTML=noteHTML({k:'Teaching calculator',t:`NEWS2 ${P.total}: ${B.l.toLowerCase()} band`,
      txt:`${why} [[Verma2023NEWS2]] ${siTxt} [[Berger2013SI]]${o.scale===2?' Scale 2 is only for patients with hypercapnic respiratory failure confirmed on a blood gas. [[Verma2023NEWS2]]':''}`,
      pt:`This shows how the chart adds up points. It cannot tell you whether a person has sepsis. If someone seems very unwell, get medical help now, whatever the number.`,
      hook:`NEWS2: 0–4 low, 5–6 medium, ≥7 high; any single 3 = low-medium.`})}
  function load(v){Object.keys(v).forEach(k=>{F[k].value=v[k]});calc()}
  Object.values(F).forEach(el=>{el.addEventListener('input',calc);el.addEventListener('change',calc)});
  $('#rcEx').addEventListener('click',()=>load(EX));$('#rcReset').addEventListener('click',()=>load(DEF));
  calc();
};
