/* =============== 3.3 Child–Pugh & MELD scores =============== */
/* published formulas (Kim 2008 for MELD and its MELD-Na; Kim 2021 for the OPTN MELD-Na and MELD 3.0) */
function scMeldRaw(b,c,i,rrt){b=Math.max(1,b);i=Math.max(1,i);c=Math.max(1,c);if(rrt||c>4)c=4;return 11.2*Math.log(i)+9.57*Math.log(c)+3.78*Math.log(b)+6.43}
const scMeld=(b,c,i,rrt)=>clamp(Math.round(scMeldRaw(b,c,i,rrt)),6,40);
function scNaOptn(m,na){const n=clamp(na,125,137);return m>11?m+1.32*(137-n)-.033*m*(137-n):m}
function scNaKim(m,na){const n=clamp(na,125,140);return m-n-.025*m*(140-n)+140}
function scMeld3(b,c,i,na,alb,fem){b=Math.max(1,b);i=Math.max(1,i);c=clamp(Math.max(1,c),1,3);const n=clamp(na,125,137),a=clamp(alb,1.5,3.5),lb=Math.log(b),lc=Math.log(c);
  return (fem?1.33:0)+4.56*lb+.82*(137-n)-.24*(137-n)*lb+9.09*Math.log(i)+11.14*lc+1.85*(3.5-a)-1.83*(3.5-a)*lc+6}
const SC_ITEMS=[['Bilirubin','lab'],['Albumin','lab'],['INR (prothrombin time)','lab'],['Ascites','bedside'],['Encephalopathy','bedside']];
const SC_EX=[2,1,2,1,1];
const SC_CLS=[{c:'A',r:'5–6',lo:5,hi:6,col:'var(--good)'},{c:'B',r:'7–9',lo:7,hi:9,col:'var(--warn)'},{c:'C',r:'10–15',lo:10,hi:15,col:'var(--bad)'}];
const scCls=v=>v<=6?0:v<=9?1:2;
const SC_STEPS=[
 {from:0,at:.13,k:'Child–Pugh · 1964, 1973',t:'Five items, 1–3 points each',
  txt:`Child and Turcotte's classification, made to estimate surgical risk in portosystemic shunt surgery, used ascites, encephalopathy, nutritional status, bilirubin and albumin. Pugh and colleagues replaced nutritional status with prothrombin time/INR. Each of the five items scores 1 to 3 points. Two of them, ascites and encephalopathy, are judged at the bedside and so are partly subjective. [[Peng2016ChildMELD,Pugh1973,Costa2023ChildB,Johnson2015ALBI]]`,
  pt:`Child–Pugh adds up points for three blood tests and two things a clinician sees: fluid in the belly and confusion. More points means the liver is struggling more.`,
  hook:`Child–Pugh = bilirubin, albumin, INR, ascites and encephalopathy: three lab values and two bedside findings.`},
 {from:.22,at:.33,k:'Child–Pugh · totals',t:'Classes A, B and C',
  txt:`The total gives Child–Pugh A (5–6 points), B (7–9) or C (10–15). In 177 people with cirrhosis, the three classes captured less survival variance than the continuous 5–15 score, which in turn captured less than the components in their original units. Child–Pugh class A is the usual requirement for surgical resection of liver cancer and for atezolizumab–bevacizumab. [[Costa2023ChildB,InfanteRivard1987,Singal2023AASLDHCC,Reig2022BCLC]]`,
  pt:`Class A is the mildest and class C the most severe. The class is a rough grouping; two people in the same class can be quite different.`,
  hook:`Child–Pugh A 5–6, B 7–9, C 10–15.`},
 {from:.44,at:.57,k:'MELD · 2000, 2001',t:'MELD: three labs',
  txt:`MELD began as the Mayo TIPS model: in 231 elective TIPS patients, bilirubin, creatinine, INR and cause of liver disease predicted survival. Kamath 2001 validated it in 4 cohorts (c-statistics 0.78–0.87 for 3-month death). As used for US allocation: 11.2 × ln(INR) + 9.57 × ln(creatinine) + 3.78 × ln(bilirubin) + 6.43, each value floored at 1, creatinine capped at 4 (and set to 4 on renal replacement therapy), rounded to an integer from 6 to 40. [[Malinchoc2000,Kamath2001MELD,Kim2008MELDNa]]`,
  pt:`MELD turns three blood tests (bilirubin, creatinine for the kidneys, and INR for clotting) into one number. A higher number means a sicker liver, on average.`,
  hook:`MELD = bilirubin, creatinine and INR. It was first built to predict survival after TIPS.`},
 {from:.66,at:.77,k:'MELD-Na · 2008',t:'Adding sodium',
  txt:`In 6769 US registrants in 2005, death risk rose 1.21-fold per MELD point and 1.05-fold per 1 mmol/L fall in sodium (125–140), and sodium mattered more when MELD was low. Kim 2008: MELD − Na − [0.025 × MELD × (140 − Na)] + 140, Na bounded 125–140; people with hyponatraemia could gain up to 13 points. The OPTN version quoted in Kim 2021: MELD + 1.32 × (137 − Na) − [0.033 × MELD × (137 − Na)], Na bounded 125–137, applied only when MELD &gt;11. [[Kim2008MELDNa,Kim2021MELD3]]`,
  pt:`A low blood sodium level is a sign of more advanced liver disease, so MELD-Na adds points when sodium is low.`,
  hook:`Low sodium raises MELD-Na; the effect is biggest when MELD itself is low.`},
 {from:.84,at:.95,k:'MELD 3.0 · 2021',t:'Sex and albumin',
  txt:`MELD 3.0 adds female sex and serum albumin, interactions for bilirubin × sodium and albumin × creatinine, and caps creatinine at 3.0 mg/dL. It discriminated slightly better than MELD-Na (C 0.869 vs 0.862) and reclassified a net 8.8% of decedents to a higher tier, particularly women. Kim 2021's example woman (bilirubin 12, Na 128, INR 2.2, creatinine 2.8, albumin 2.0) scores MELD 35, MELD-Na 36 and MELD 3.0 39, with predicted 30-day mortality 41.8%, a population statistic. OPTN adopted MELD 3.0 in July 2023. [[Kim2021MELD3,Akabane2025MELD3]]`,
  pt:`Older MELD versions tended to under-score women. MELD 3.0 adds sex and albumin to make the score fairer and slightly more accurate.`,
  hook:`MELD 3.0 adds sex and albumin to MELD-Na. US allocation adopted it in July 2023.`}
];
inits.scores=()=>{
  const svg=$('#scSvg'),rg=$('#scT');
  function draw(t){
    const N=vb(svg,'720 380','400 700'),p=phaseOf(SC_STEPS,t),st=SC_STEPS[p],nx=p<4?SC_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    let s='';
    /* ---------- Child–Pugh card ---------- */
    const CP=N?{x:12,y:8,w:376,h:302}:{x:12,y:14,w:340,h:352},cpOn=p<2;
    s+=`<rect x="${CP.x}" y="${CP.y}" width="${CP.w}" height="${CP.h}" rx="12" style="fill:${cpOn?'var(--dx-soft)':'var(--panel)'};stroke:${cpOn?'var(--dx)':'var(--line)'};stroke-width:${cpOn?1.6:1}"/>`;
    s+=`<text x="${CP.x+14}" y="${CP.y+24}" class="t-lbl" style="fill:var(--dx)">Child–Pugh</text><text x="${CP.x+CP.w-14}" y="${CP.y+24}" class="t-xs t-end">points per item</text>`;
    /* points per item */
    let pts;
    if(p===0)pts=SC_EX.map((v,k)=>ramp(lp,k*.17,k*.17+.12)>0?v:0);
    else if(p===1){const tot=Math.round(lerp(5,15,ease(ramp(lp,.05,.9))));pts=[1,1,1,1,1];for(let j=0;j<tot-5;j++)pts[[0,2,3,1,4][j%5]]++}
    else pts=SC_EX.slice();
    const rh=N?34:40,ry0=CP.y+44,px0=CP.x+(N?210:178);
    SC_ITEMS.forEach(([n,kind],k)=>{const y=ry0+k*rh,v=pts[k],on=v>0;
      s+=`<text x="${CP.x+14}" y="${y+16}" class="t-lbl" style="opacity:${on?1:.45}">${n}</text><text x="${CP.x+14}" y="${y+28}" class="t-xs" style="fill:${kind==='bedside'?'var(--warn)':'var(--muted)'}">${kind==='bedside'?'judged at the bedside':'blood test'}</text>`;
      for(let q=1;q<=3;q++){const cx=px0+(q-1)*(N?50:46),fill=v>=q;
        s+=`<rect x="${cx}" y="${y+2}" width="${N?42:38}" height="22" rx="6" style="fill:${fill?SC_CLS[Math.min(2,v-1)].col:'var(--panel)'};stroke:${fill?SC_CLS[Math.min(2,v-1)].col:'var(--line)'};opacity:${fill?.85:1}"/><text x="${cx+(N?21:19)}" y="${y+17}" class="t-sm t-mid" style="fill:${fill?'var(--on-brand)':'var(--muted)'};font-weight:700">${q}</text>`}});
    const tot=pts.reduce((a,b)=>a+b,0),filled=pts.every(v=>v>0);
    /* total ruler 5..15 */
    const ty=ry0+5*rh+(N?30:36),tx0=CP.x+16,tx1=CP.x+CP.w-16,TX=v=>lerp(tx0,tx1,(v-4.5)/11);
    SC_CLS.forEach(C=>{const on=filled&&scCls(tot)===SC_CLS.indexOf(C);s+=`<rect x="${f1(TX(C.lo-.5))}" y="${ty}" width="${f1(TX(C.hi+.5)-TX(C.lo-.5))}" height="22" style="fill:${C.col};opacity:${on?.75:.22}"/><text x="${f1((TX(C.lo-.5)+TX(C.hi+.5))/2)}" y="${ty+15}" class="t-sm t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${C.c} ${C.r}</text>`});
    for(let v=5;v<=15;v++)s+=`<text x="${f1(TX(v))}" y="${ty+36}" class="t-xs t-mid">${v}</text>`;
    if(tot>0){const xv=TX(Math.max(5,tot));s+=`<path d="M${f1(xv-7)} ${ty-12}L${f1(xv+7)} ${ty-12}L${f1(xv)} ${ty-2}Z" style="fill:var(--ink)"/>`}
    const big=filled?`Total ${tot} · class ${SC_CLS[scCls(tot)].c}`:`Total so far ${tot}`;
    s+=`<text x="${CP.x+14}" y="${ty-14}" class="t-big">${big}</text>`;
    if(!N)s+=`<text x="${CP.x+14}" y="${CP.y+CP.h-12}" class="t-xs">thresholds for 2 and 3 points not shown (unverified)</text>`;
    else s+=`<text x="${CP.x+14}" y="${CP.y+CP.h-6}" class="t-xs">thresholds for 2 and 3 points not shown (unverified)</text>`;
    /* ---------- MELD panel ---------- */
    const M=N?{x:12,y:318,w:376,h:374}:{x:362,y:14,w:346,h:352},mOn=p>=2;
    s+=`<rect x="${M.x}" y="${M.y}" width="${M.w}" height="${M.h}" rx="12" style="fill:${mOn?'var(--dx-soft)':'var(--panel)'};stroke:${mOn?'var(--dx)':'var(--line)'};stroke-width:${mOn?1.6:1}"/>`;
    const title=p<=2?'MELD':p===3?'MELD-Na':'MELD 3.0';
    s+=`<text x="${M.x+14}" y="${M.y+24}" class="t-lbl" style="fill:var(--dx)">${title}</text>`;
    /* lab values over time */
    const u2=p<2?0:p===2?ease(ramp(lp,.05,.85)):1;
    let bili=Math.exp(lerp(0,Math.log(6),u2)),cr=lerp(1,2.2,u2),inr=lerp(1,2,u2),na=p<3?140:p===3?lerp(140,125,ease(ramp(lp,.05,.8))):128,alb=3.5,fem=false;
    if(p===4){bili=12;cr=2.8;inr=2.2;na=128;alb=2.0;fem=true}
    const labs=[['Bili',bili,'mg/dL','var(--bile)'],['Creat',cr,'mg/dL','var(--kidney)'],['INR',inr,'','var(--dx)']];
    if(p>=3)labs.push(['Na',na,'mmol/L','var(--fluid)']);
    if(p===4)labs.push(['Alb',alb,'g/dL','var(--brand)'],['Sex','female','','var(--nh3)']);
    const lx=M.x+12,ly0=M.y+40,lh=labs.length>4?(N?28:21):(N?30:26),lw=N?160:128;
    labs.forEach(([n,v,u,c],k)=>{const y=ly0+k*lh;
      s+=`<rect x="${lx}" y="${y}" width="${lw}" height="${lh-5}" rx="7" style="fill:var(--panel);stroke:${c}"/><circle cx="${lx+10}" cy="${f1(y+(lh-5)/2)}" r="4" style="fill:${c}"/>`;
      s+=`<text x="${lx+20}" y="${f1(y+(lh-5)/2+4)}" class="t-xs" style="fill:var(--ink)">${n}</text><text x="${lx+lw-8}" y="${f1(y+(lh-5)/2+4)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${typeof v==='number'?(n==='Na'?Math.round(v):v.toFixed(1)):v}${u?' '+u:''}</text>`});
    /* formula box */
    const fx=lx+lw+(N?12:10),fw=M.x+M.w-12-fx,fy=ly0,fh=p===4?(N?164:150):(N?150:132);
    s+=`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="8" style="fill:var(--field);stroke:var(--line)"/>`;
    const FL=p<=2?['MELD =','11.2 × ln(INR)','+ 9.57 × ln(creatinine)','+ 3.78 × ln(bilirubin)','+ 6.43','floor 1 · creat. cap 4 · 6–40']
           :p===3?['MELD-Na (OPTN) =','MELD + 1.32 × (137 − Na)','− 0.033 × MELD × (137 − Na)','Na bounded 125–137','only when MELD > 11','']
           :['MELD 3.0 =','1.33 if female','+ 4.56 ln(bili)','+ 0.82 (137−Na)','− 0.24 (137−Na) ln(bili)','+ 9.09 ln(INR)','+ 11.14 ln(cr)','+ 1.85 (3.5−alb)','− 1.83 (3.5−alb) ln(cr)','+ 6'];
    FL.forEach((l,k)=>{s+=`<text x="${fx+8}" y="${fy+16+k*(p===4?(N?15.6:13.6):(N?19:16.5))}" class="t-xs" style="${k===0?'fill:var(--dx);font-weight:700':'fill:var(--ink)'}">${l}</text>`});
    /* particles from the labs into the formula */
    if(p>=2){const ph=(t*50)%1;labs.forEach(([n,v,u,c],k)=>{const y=ly0+k*lh+(lh-5)/2;for(let j=0;j<2;j++){const q=(ph+j/2+k*.17)%1,x=lerp(lx+lw,fx,q),yy=lerp(y,fy+fh/2,q);s+=`<circle cx="${f1(x)}" cy="${f1(yy)}" r="2.4" style="fill:${c};opacity:${f1(.9*bump(q,0,1))}"/>`}})}
    /* score ruler 6..40 */
    const rx0=M.x+16,rx1=M.x+M.w-16,RX=v=>lerp(rx0,rx1,(clamp(v,6,44)-6)/38),rY=fy+fh+(N?58:44);
    const mRaw=scMeldRaw(bili,cr,inr,false),mR=scMeld(bili,cr,inr,false);
    if(p<4){
      /* stacked contributions */
      const terms=[['6.43',6.43,'var(--muted)'],['bilirubin',3.78*Math.log(Math.max(1,bili)),'var(--bile)'],['creatinine',9.57*Math.log(Math.max(1,cr)),'var(--kidney)'],['INR',11.2*Math.log(Math.max(1,inr)),'var(--dx)']];
      let acc=0;const bx=v=>lerp(rx0,rx1,v/44);
      s+=`<text x="${rx0}" y="${rY-36}" class="t-sm">How each term adds up</text>`;
      terms.forEach(([n,v,c])=>{s+=`<rect x="${f1(bx(acc))}" y="${rY-28}" width="${f1(Math.max(0,bx(acc+v)-bx(acc)))}" height="14" style="fill:${c};opacity:.8"/>`;acc+=v});
      let naAdd=0;if(p===3){naAdd=scNaOptn(mR,na)-mR;if(naAdd>0)s+=`<rect x="${f1(bx(acc))}" y="${rY-28}" width="${f1(bx(acc+naAdd)-bx(acc))}" height="14" style="fill:var(--fluid);opacity:.8"/>`}
      if(p>=2)s+=`<text x="${f1(Math.min(bx(acc+naAdd)+4,rx1-60))}" y="${rY-17}" class="t-xs">${p===3&&naAdd>0?'+ sodium':''}</text>`;
      /* the 6..40 ruler with published anchors */
      s+=`<rect x="${rx0}" y="${rY}" width="${rx1-rx0}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
      [6,10,20,30,40].forEach(v=>s+=`<text x="${f1(RX(v))}" y="${rY+24}" class="t-xs t-mid">${v}</text>`);
      const sc=p===3?Math.round(scNaOptn(mR,na)):mR;
      if(p>=2){const xv=RX(sc);s+=`<rect x="${rx0}" y="${rY}" width="${f1(xv-rx0)}" height="10" rx="5" style="fill:var(--dx);opacity:.75"/><circle cx="${f1(xv)}" cy="${rY+5}" r="7" style="fill:var(--dx);stroke:var(--panel);stroke-width:2"/>`;
        s+=`<text x="${M.x+M.w-14}" y="${M.y+26}" class="t-big t-end" style="font-size:22px;fill:var(--dx)">${sc}</text>`}
      s+=`<line x1="${f1(RX(9))}" x2="${f1(RX(9))}" y1="${rY-4}" y2="${rY+14}" style="stroke:var(--good);stroke-width:2"/><line x1="${f1(RX(40))}" x2="${f1(RX(40))}" y1="${rY-4}" y2="${rY+14}" style="stroke:var(--bad);stroke-width:2"/>`;
      s+=`<text x="${rx0}" y="${rY+40}" class="t-xs" style="fill:var(--good)">MELD &lt;9: 1.9% died in 3 months</text><text x="${rx1}" y="${rY+(N?54:40)}" class="t-xs t-end" style="fill:var(--bad)">≥40: 71.3%</text>`;
      s+=`<text x="${rx0}" y="${rY+(N?70:54)}" class="t-xs">US waiting list 1999–2001 (population statistics)</text>`;
      if(p===3&&N)s+=`<text x="${rx0}" y="${rY+86}" class="t-xs">MELD ${mR} → MELD-Na ${Math.round(scNaOptn(mR,na))} at sodium ${Math.round(na)}</text>`;
      if(p===3&&!N)s+=`<text x="${rx0}" y="${rY+68}" class="t-xs">MELD ${mR} → MELD-Na ${Math.round(scNaOptn(mR,na))} at sodium ${Math.round(na)}</text>`;
    }else{
      /* the published example: three scores */
      const vals=[['MELD',scMeld(12,2.8,2.2,false)],['MELD-Na',Math.round(scNaOptn(scMeld(12,2.8,2.2,false),128))],['MELD 3.0',Math.round(scMeld3(12,2.8,2.2,128,2.0,true))]];
      const by=fy+fh+(N?28:18);
      s+=`<text x="${rx0}" y="${by}" class="t-sm">Kim 2021 example woman</text>`;
      vals.forEach(([n,v],k)=>{const g=ease(ramp(lp,k*.18,k*.18+.3)),y=by+10+k*(N?30:26);
        s+=`<text x="${rx0}" y="${y+13}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${rx0+64}" y="${y}" width="${f1((rx1-rx0-64)*v/44*g)}" height="18" rx="4" style="fill:${k===2?'var(--dx)':'var(--muted)'};opacity:${k===2?.85:.55}"/>`;
        if(g>.6)s+=`<text x="${f1(rx0+64+(rx1-rx0-64)*v/44*g-6)}" y="${y+13}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${v}</text>`});
      const yy=by+10+3*(N?30:26)+8;
      s+=`<text x="${rx0}" y="${yy}" class="t-xs" style="opacity:${f1(ramp(lp,.6,.8))}">predicted 30-day mortality 41.8% (population statistic)</text>`;
      s+=`<text x="${M.x+M.w-14}" y="${M.y+26}" class="t-big t-end" style="font-size:22px;fill:var(--dx)">${vals[2][1]}</text>`;
    }
    svg.innerHTML=s;
    setSt(p);
    $('#scRead').innerHTML=p<2?`<span>Child–Pugh total <b>${tot}</b></span><span>class <b>${filled?SC_CLS[scCls(tot)].c+' ('+SC_CLS[scCls(tot)].r+')':'…'}</b></span>`
      :`<span>bilirubin <b>${bili.toFixed(1)}</b></span><span>creatinine <b>${cr.toFixed(1)}</b></span><span>INR <b>${inr.toFixed(1)}</b></span><span>MELD <b>${mR}</b></span>${p>=3?`<span>sodium <b>${Math.round(na)}</b></span>`:''}`;
    $('#scNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#scPlay'),draw,30000,'Replay','scores');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- teaching calculator ---------- */
  const cs=$('#scCalcSvg'),IDS=['scBili','scCr','scInr','scNa','scAlb'],DEF={scBili:2.0,scCr:1.2,scInr:1.5,scNa:132,scAlb:3.0},EX={scBili:12,scCr:2.8,scInr:2.2,scNa:128,scAlb:2.0};
  function calc(){const g=id=>parseFloat($('#'+id).value),b=g('scBili'),c=g('scCr'),i=g('scInr'),na=g('scNa'),al=g('scAlb'),fem=$('#scSex').value==='f',rrt=$('#scRrt').checked;
    const ok=[b,c,i,na,al].every(v=>isFinite(v)&&v>0);
    if(!ok){$('#scRes').innerHTML='';cs.innerHTML=`<text x="20" y="40" class="t-sm">Enter all five values</text>`;$('#scCalcNote').innerHTML=`<div class="kicker">Teaching result</div><h4>Enter all five values</h4><p>Each must be a positive number in the units shown.</p>`;return}
    const m=scMeld(b,c,i,rrt),mo=Math.round(scNaOptn(m,na)),mk=Math.round(scNaKim(m,na)),m3=Math.round(scMeld3(b,c,i,na,al,fem));
    const R=[['MELD',m],['MELD-Na · OPTN',mo],['MELD-Na · Kim 2008',mk],['MELD 3.0',m3]];
    $('#scRes').innerHTML=R.map(([n,v])=>`<div><small>${n}</small><b>${v}</b></div>`).join('');
    drawC(R);
    const used=`bilirubin ${Math.max(1,b).toFixed(1)}, INR ${Math.max(1,i).toFixed(1)}, creatinine ${(rrt||c>4?4:Math.max(1,c)).toFixed(1)} mg/dL`;
    const used3=`creatinine ${clamp(Math.max(1,c),1,3).toFixed(1)}, sodium ${clamp(na,125,137)}, albumin ${clamp(al,1.5,3.5).toFixed(1)}`;
    $('#scCalcNote').innerHTML=`<div class="kicker">Teaching result (not for clinical or allocation decisions)</div><h4>MELD ${m} · MELD&#8209;Na ${mo} · MELD&nbsp;3.0 ${m3}</h4>
      <dl class="kv"><div><dt>MELD</dt><dd>Values used after the published limits: ${used}. Rounded and kept between 6 and 40. [[Kim2008MELDNa]]</dd></div>
      <div><dt>MELD-Na</dt><dd>OPTN version: sodium bounded 125–137, applied only when MELD &gt;11${m<=11?' (here MELD is 11 or less, so MELD-Na equals MELD)':''}. Kim 2008 version: sodium bounded 125–140. This tool feeds the rounded MELD into both. [[Kim2021MELD3,Kim2008MELDNa]]</dd></div>
      <div><dt>MELD 3.0</dt><dd>Values used: ${used3}${fem?', female (+1.33)':''}. The 3.0 mg/dL creatinine bound and the floor of 1.0 for bilirubin, INR and creatinine are applied; our sources do not describe a separate dialysis rule for MELD 3.0, so the dialysis box changes only MELD and MELD-Na here. Rounded to the nearest integer. [[Kim2021MELD3]]</dd></div></dl>
      <div class="pt"><b>In plain words</b>Child–Pugh and MELD scores describe how sick the liver is for groups of people. They cannot tell any one person what will happen. [[Kim2021MELD3,Peng2016ChildMELD]]</div>
      <div class="hook"><b>Exam hook</b>Published anchors: MELD &lt;9 → 1.9% and ≥40 → 71.3% 3-month mortality on the 1999–2001 US list; Biggins' early sodium score of 20, 30 and 40 matched 6%, 16% and 37% at 6 months. [[Wiesner2003,Biggins2006MELDNa]]</div>`}
  function drawC(R){const N=vb(cs,'720 170','400 200'),x0=N?10:16,lab=N?112:150,x1=N?388:704,bx0=x0+lab,X=v=>lerp(bx0,x1,(clamp(v,6,44)-6)/38);let s='';
    const rh=N?34:30,y0=N?14:12;
    R.forEach(([n,v],k)=>{const y=y0+k*rh;s+=`<text x="${x0}" y="${y+14}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${bx0}" y="${y}" width="${x1-bx0}" height="20" rx="5" style="fill:var(--panel-2)"/><rect x="${bx0}" y="${y}" width="${f1(X(v)-bx0)}" height="20" rx="5" style="fill:${k===3?'var(--dx)':'var(--muted)'};opacity:${k===3?.85:.55}"/><text x="${f1(X(v)-6)}" y="${y+14}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${v>44?'>44':v}</text>`});
    const ay=y0+4*rh+4;[6,9,20,30,40].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0-4}" y2="${ay}" style="stroke:var(--ink);stroke-dasharray:2 3;opacity:.45"/><text x="${f1(X(v))}" y="${ay+12}" class="t-xs t-mid">${v}</text>`});
    (N?['anchors: MELD 9 and 40 (3-month, 1999–2001)','MELD 3.0 of 20: 5.4% at 90 days']:['anchors: MELD 9 and 40 (3-month mortality, 1999–2001); MELD 3.0 of 20: 5.4% at 90 days']).forEach((l,k)=>s+=`<text x="${x1}" y="${ay+26+k*12}" class="t-xs t-end">${l}</text>`);
    cs.innerHTML=s}
  [...IDS,'scSex'].forEach(id=>{$('#'+id).addEventListener('input',calc);$('#'+id).addEventListener('change',calc)});
  $('#scRrt').addEventListener('change',calc);
  $('#scEx').addEventListener('click',()=>{Object.entries(EX).forEach(([k,v])=>$('#'+k).value=v);$('#scSex').value='f';$('#scRrt').checked=false;calc()});
  $('#scReset').addEventListener('click',()=>{Object.entries(DEF).forEach(([k,v])=>$('#'+k).value=v);$('#scSex').value='m';$('#scRrt').checked=false;calc()});
  calc();
  const prevR=redraws.scores;redraws.scores=()=>{prevR&&prevR();calc()};
};
