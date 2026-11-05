/* =============== 3.1 Lithium: how it works and the evidence =============== */
/* six steps: three proposed mechanisms inside a schematic neuron (t 0–.5), then a forest plot
   that builds up the trial evidence (t .5–1). Numbers are as published in the research pass. */
const LI_STEPS=[
 {from:0,at:.1,k:'Mechanism 1 of 3 · inside the cell',t:'Inositol depletion',
  txt:`Lithium is one small ion, Li⁺. Its label says it alters sodium transport in nerve and muscle cells and shifts catecholamine metabolism, "but the specific biochemical mechanism of lithium action in mania is unknown". No single mechanism has been proven or ruled out: lithium acts on many steps of cell signalling, usually enhancing basal and damping stimulated activity. [[FDA-Lithobid,Alda2015]] The first candidate: lithium blocks inositol monophosphatase (IMPase), the enzyme that recycles inositol; brain enzyme was 50% inhibited at 0.8 mM, and inositol 1-phosphate piles up while myo-inositol falls. [[Hallcher1980]] Berridge's inositol-depletion hypothesis says this damps phosphoinositide signalling most in the busiest cells <span class="ev hyp">Hypothesis</span>. [[Berridge1989,Harwood2005]] In 12 people, frontal myo-inositol fell about 30% within 5–7 days, while their clinical state had not yet changed. [[Moore1999Inositol]]`,
  pt:`Lithium slows a recycling step inside brain cells, so the busiest signalling pathways run down a little. Whether this is why it helps is still unproven.`,
  hook:`IMPase is 50% inhibited at 0.8 mM. Brain myo-inositol falls about 30% within a week, before any clinical change, which argues against a simple inositol explanation. [[Hallcher1980,Moore1999Inositol]]`},
 {from:.17,at:.27,k:'Mechanism 2 of 3 · inside the cell',t:'GSK-3β inhibition',
  txt:`In 1996 two groups showed that lithium directly inhibits glycogen synthase kinase-3β (GSK-3β), with a Ki of about 2 mM, without being a general kinase inhibitor; β-catenin then builds up, mimicking Wnt signalling. [[Klein1996,Stambolic1996]] Lithium does this by competing with magnesium, an ion of similar size. [[Gould2005]] It also switches GSK-3 off indirectly through Akt in mouse striatum <span class="ev early">Early evidence</span>. [[Beaulieu2004]] In people, inhibitory Ser9-phosphorylated GSK-3β was eightfold higher in blood cells of 9 people taking lithium than in 23 healthy controls <span class="ev early">Early evidence</span>. [[Li2007GSK3]] Final proof that GSK-3 is the therapeutic target would need trials of selective GSK-3 inhibitors <span class="ev hyp">Hypothesis</span>. [[Gould2005]]`,
  pt:`Lithium pushes magnesium out of an enzyme called GSK-3 and slows it down. Blood tests show this happens in people taking lithium, but nobody has proven it is the reason lithium helps.`,
  hook:`GSK-3β Ki is about 2 mM, above the label's therapeutic serum range: one reason the IMPase-or-GSK-3 debate is unresolved. [[Klein1996,FDA-Lithobid]]`},
 {from:.33,at:.43,k:'Mechanism 3 of 3 · inside the cell',t:'Neuroprotection and the body clock',
  txt:`Lithium raises protective proteins such as BDNF and Bcl-2 and reduces cell death through GSK-3 <span class="ev early">Early evidence</span>. [[Malhi2013CNSDrugs]] In 10 people with mania given lithium alone, plasma BDNF rose from 406 to 511 pg/mL over 28 days, though the rise did not track improvement. [[deSousa2011]] People with at least 2 years of lithium had hippocampal volumes like healthy controls, even if they still had episodes. [[Hajek2012,Hajek2014]] Such imaging links are cross-sectional and may partly reflect who is prescribed lithium. [[Hibar2018]] Lithium also acts on molecular clocks: it delays and stabilises daily rhythms, firmly in animals and with <span class="ev early">Early evidence</span> in people. [[Moreira2016]]`,
  pt:`In scans, people who have taken lithium for years tend to have brain measures closer to people without bipolar disorder. That may mean lithium protects brain cells, but it is not proven.`,
  hook:`Lithium and imaging: thicker cortex and a larger hippocampus are associations, not proof of neuroprotection; no randomised imaging trial exists. [[Hibar2018,Hajek2014]]`},
 {from:.5,at:.6,k:'The evidence · relapse prevention',t:'Fewer new episodes than placebo',
  txt:`Each square is a pooled estimate and each line its 95% confidence interval; left of the vertical line at 1 means fewer events on lithium. Geddes 2004 (5 RCTs, 770 people): all relapses RR 0.65 (0.50–0.84), manic RR 0.62 (0.40–0.95), depressive RR 0.72 (0.49–1.07), which is uncertain. [[Geddes2004]] The Severus 2014 update (7 trials, 1,580 people): any episode RR 0.66 (0.53–0.82), manic 0.52 (0.38–0.71), depressive 0.78 (0.59–1.03) by random effects. More people stopped lithium than placebo for reasons other than an episode (RR 1.33). [[Severus2014E]] A 2014 network meta-analysis concluded lithium "should remain the first-line treatment". [[Miura2014]]`,
  pt:`Over months to years, lithium lowers the chance of a new mood episode by about a third compared with a dummy pill. The clearest effect is on highs.`,
  hook:`Lithium vs placebo for maintenance: RR 0.66 overall and 0.52 for mania; the depressive interval crosses 1. [[Severus2014E]]`},
 {from:.66,at:.76,k:'The evidence · head to head and acute mania',t:'BALANCE and acute mania',
  txt:`BALANCE randomised 330 people with bipolar I disorder to lithium, valproate or both, open label, for up to 24 months. A new intervention for an emerging episode was needed by 54% on the combination, 59% on lithium and 69% on valproate. Lithium vs valproate HR 0.71 (0.51–1.00, p = 0.047); combination vs valproate HR 0.59 (0.42–0.83); combination vs lithium HR 0.82 (0.58–1.17), not significant. [[Geddes2010BALANCE]] In acute mania, a 68-trial network meta-analysis found lithium better than placebo at 3 weeks (SMD −0.37) while haloperidol was more effective than lithium (SMD −0.19). [[Cipriani2011]] The label says lithium "may produce a normalization of symptomatology within 1 to 3 weeks". [[FDA-Lithobid]]`,
  pt:`In a large head-to-head trial, lithium alone or lithium plus valproate kept more people well than valproate alone.`,
  hook:`BALANCE: lithium alone or combined beat valproate alone; the combination did not clearly beat lithium alone. [[Geddes2010BALANCE]]`},
 {from:.82,at:.94,k:'The evidence · suicide and mortality',t:'Suicide and death',
  txt:`Across 48 RCTs (6,674 people), lithium was associated with fewer suicides than placebo (OR 0.13, 0.03–0.66) and fewer deaths from any cause (OR 0.38, 0.15–0.95), with no clear effect on deliberate self-harm (OR 0.60, 0.27–1.32). [[Cipriani2013]] In Swedish registers, suicide-related events were 14% lower during periods on lithium (HR 0.86). [[Song2017]] But a VA trial that added lithium after a recent suicide-related event was stopped for futility (HR 1.10, 0.77–1.55), with low mean levels of about 0.5 mEq/L. [[Katz2022]] <span class="ev est">Established</span> for the placebo-controlled evidence; uncertain as an add-on for people at high risk already in treatment. [[Cipriani2013,Katz2022]] These are population statistics.`,
  pt:`People taking lithium have lower suicide rates in many studies. Help works: if you are struggling, contact a crisis line or emergency services (988 in the US; Samaritans 116 123 in the UK and Ireland).`,
  hook:`Cipriani 2013: suicide OR 0.13 vs placebo; deliberate self-harm not clearly reduced. [[Cipriani2013]]`}
];
/* forest plot rows: [label, short label (phones), measure, point, low, high] */
const LI_FOREST=[
 {s:3,g:'Relapse vs placebo · Geddes 2004 (5 RCTs, 770 people)',gn:'Geddes 2004 · 5 RCTs vs placebo',rows:[['Any relapse','RR',.65,.50,.84],['Manic relapse','RR',.62,.40,.95],['Depressive relapse','RR',.72,.49,1.07]]},
 {s:3,g:'Relapse vs placebo · Severus 2014 (7 trials, 1,580 people)',gn:'Severus 2014 · 7 trials vs placebo',rows:[['Any mood episode','RR',.66,.53,.82],['Manic episode','RR',.52,.38,.71],['Depressive (random effects)','RR',.78,.59,1.03]]},
 {s:4,g:'BALANCE 2010 · 330 people, up to 24 months, open label',gn:'BALANCE 2010 · 330 people',rows:[['Lithium vs valproate','HR',.71,.51,1.00],['Lithium + valproate vs valproate','HR',.59,.42,.83],['Lithium + valproate vs lithium','HR',.82,.58,1.17]]},
 {s:5,g:'Vs placebo · Cipriani 2013 (48 RCTs, 6,674 people)',gn:'Cipriani 2013 · 48 RCTs vs placebo',rows:[['Suicide','OR',.13,.03,.66],['Death from any cause','OR',.38,.15,.95],['Deliberate self-harm','OR',.60,.27,1.32]]},
 {s:5,g:'VA trial 2022 · lithium added after a suicide-related event (519)',gn:'VA trial 2022 · added after an event',rows:[['Repeat suicide-related event','HR',1.10,.77,1.55]]}
];
/* acute mania, Cipriani 2011: standardised mean difference on a mania scale */
const LI_MANIA=[['Lithium vs placebo',-.37,-.63,-.11],['Haloperidol vs lithium',-.19,-.36,-.01]];
/* icon-array comparisons */
const LI_RR={any:[.66,.53,.82,'any new mood episode'],man:[.52,.38,.71,'a manic episode'],dep:[.78,.59,1.03,'a depressive episode']};

inits.lithium=()=>{
  const svg=$('#liSvg'),rg=$('#liT');let setSt=()=>{};
  const fmt=v=>v.toFixed(2).replace(/^(-?)0\./,'$10.'),dash=(a,b)=>`${fmt(a)}–${fmt(b)}`.replace('-','−');
  /* a small evidence chip drawn in SVG */
  const chip=(x,y,txt,kind)=>{const c=kind==='hyp'?['var(--rx-soft)','var(--rx)']:kind==='early'?['var(--warn-soft)','var(--warn)']:['var(--good-soft)','var(--good)'];
    const w=txt.length*6.1+12;return `<rect x="${f1(x)}" y="${f1(y-10)}" width="${f1(w)}" height="14" rx="3" style="fill:${c[0]}"/><text x="${f1(x+6)}" y="${f1(y+.5)}" class="t-xs" style="fill:${c[1]};font-weight:600">${txt}</text>`};
  const R=rng(31);const IONS=Array.from({length:9},(_,i)=>({x:190+R()*70,y:40+R()*180,ph:R()*6.28,tin:.004+i*.006}));
  /* ---------- the cell (local coordinates 450 × 370) ---------- */
  function cell(t,N){
    const p1=ramp(t,.02,.15),p2=ramp(t,.18,.3),p3=ramp(t,.34,.46),ph=phaseOf(LI_STEPS,t);
    const lab=N?'t-sm':'t-xs',zo=i=>ph===i?1:ph>2?1:.38;
    let s=`<rect x="0" y="0" width="450" height="370" rx="46" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:2.2"/><rect x="6" y="6" width="438" height="358" rx="41" style="fill:none;stroke:var(--brain-line);stroke-width:.8;stroke-dasharray:3 4;opacity:.7"/>`;
    /* channel in the top membrane */
    s+=`<rect x="212" y="-6" width="8" height="18" rx="3" style="fill:var(--li);opacity:.5"/><rect x="230" y="-6" width="8" height="18" rx="3" style="fill:var(--li);opacity:.5"/>`;
    s+=`<text x="26" y="30" class="${lab}" style="fill:var(--muted)">NEURON (schematic)</text>`;
    /* zone A: inositol recycling loop */
    const ax=112,ay=150,ar=58,e1=p1,P=a=>[ax+ar*Math.cos(a*Math.PI/180),ay+ar*Math.sin(a*Math.PI/180)];
    let A=`<circle cx="${ax}" cy="${ay}" r="${ar}" style="fill:none;stroke:var(--rx);stroke-width:1.6;opacity:.55"/>`;
    for(let k=0;k<14;k++){const u=(k/14+t*5)%1,ang=-90+360*u,[x,y]=P(ang),after=ang>=135&&ang<=270;
      A+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--rx);opacity:${f1(after?1-.75*e1:1)}"/>`}
    const nodes=[[-90,'PIP₂'],[0,'IP₃'],[90,'IP₁'],[180,'inositol']];
    nodes.forEach(([a,n])=>{const [x,y]=P(a),r=a===180?16*(1-.3*e1):a===90?12+5*e1:12;
      A+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/>`;
      const tx=a===180?x:a===0?x+17:x,ty=a===-90?y-17:a===90?y+27:a===180?y-22:y+4;
      A+=`<text x="${f1(tx)}" y="${f1(ty)}" class="${lab}${a===0?'':' t-mid'}" style="fill:var(--ink)">${n}</text>`});
    for(let k=0;k<Math.round(5*e1);k++){const [x,y]=P(90);A+=`<circle cx="${f1(x-14+k*7)}" cy="${f1(y+8+(k%2)*5)}" r="2.6" style="fill:var(--rx)"/>`}
    const ix=ax+(ar+16)*Math.cos(Math.PI*.75),iy=ay+(ar+16)*Math.sin(Math.PI*.75);A+=`<rect x="${f1(ix-24)}" y="${f1(iy-8)}" width="48" height="16" rx="8" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.2"/><text x="${f1(ix)}" y="${f1(iy+3.5)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">IMPase</text>`;
    if(e1>.25){const d=ramp(e1,.25,.6);A+=ion(lerp(ix+30,ix+18,d),lerp(iy-40,iy-14,d),'li',{r:8})+(d>.9?`<line x1="${f1(ix-20)}" y1="${f1(iy-10)}" x2="${f1(ix+20)}" y2="${f1(iy+10)}" style="stroke:var(--bad);stroke-width:2"/>`:'')}
    if(e1>.6)A+=`<text x="${ax}" y="${ay+4}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">−30%</text><text x="${ax}" y="${ay+16}" class="t-xs t-mid">inositol</text>`;
    A+=`<text x="${ax}" y="${ay-ar-36}" class="${lab} t-mid" style="fill:var(--rx);font-weight:600">INOSITOL RECYCLING</text>`;
    s+=`<g style="opacity:${zo(0)}">${A}</g>`;
    /* zone B: GSK-3β with its magnesium site */
    const bx=330,by=150,e2=p2;
    let B=`<path d="M${bx-30} ${by-14}A42 42 0 1 1 ${bx-30} ${by+14}L${bx-6} ${by}Z" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6;opacity:${f1(1-.4*e2)}"/>`;
    B+=`<text x="${bx+10}" y="${by+4}" class="${lab} t-mid" style="fill:var(--ink);font-weight:600">GSK-3β</text>`;
    const mg=ramp(e2,.1,.45),li=ramp(e2,.3,.65);
    B+=`<g style="opacity:${f1(1-.6*mg)}"><circle cx="${f1(lerp(bx-22,bx-56,mg))}" cy="${f1(lerp(by,by+46,mg))}" r="8.5" style="fill:var(--muted)"/><text x="${f1(lerp(bx-22,bx-56,mg))}" y="${f1(lerp(by,by+46,mg)+3)}" class="t-mid" style="font:700 8px var(--mono);fill:var(--panel)">Mg</text></g>`;
    if(li>0)B+=ion(lerp(bx-40,bx-22,li),lerp(by-60,by,li),'li',{r:8});
    const nb=2+Math.round(10*e2);for(let k=0;k<nb;k++){const cx=bx+56+(k%3)*13,cy=by-34+Math.floor(k/3)*15;B+=`<path d="M${cx} ${cy-5}L${cx+5} ${cy}L${cx} ${cy+5}L${cx-5} ${cy}Z" style="fill:var(--nt)"/>`}
    B+=`<text x="${bx+69}" y="${by+46}" class="t-xs t-mid" style="fill:var(--ink)">β-catenin${e2>.5?' ↑':''}</text>`;
    B+=`<text x="${bx}" y="${by-78}" class="${lab} t-mid" style="fill:var(--rx);font-weight:600">GSK-3β</text>`;
    if(e2>.55)B+=`<text x="${bx}" y="${by+70}" class="t-xs t-mid">Li⁺ takes the Mg²⁺ site</text>`;
    s+=`<g style="opacity:${zo(1)}">${B}</g>`;
    /* zone C: nucleus, BDNF and the clock */
    const cx0=196,cy0=292,e3=p3;
    let C=`<ellipse cx="${cx0}" cy="${cy0}" rx="118" ry="50" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.4"/>`;
    C+=`<path d="M${cx0-70} ${cy0+6}${Array.from({length:14},(_,k)=>`Q${cx0-65+k*10} ${cy0+(k%2?-8:8)} ${cx0-60+k*10} ${cy0+6}`).join('')}" style="fill:none;stroke:var(--brain-line);stroke-width:1.4;opacity:.7"/>`;
    C+=`<text x="${cx0}" y="${cy0-20}" class="${lab} t-mid" style="fill:var(--ink);font-weight:600">NUCLEUS</text>`;
    if(e3>0){for(let k=0;k<18;k++){const u=((k/18*3)+t*4)%1,a=-170+k*9,rr=55+u*55*e3;const x=cx0+Math.cos(a*Math.PI/180)*rr*1.6,y=cy0+Math.sin(a*Math.PI/180)*rr*.9;
        if(y>8&&y<362&&x>12&&x<438)C+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--hippo);opacity:${f1(e3*(1-u*.5))}"/>`}
      C+=`<text x="${cx0}" y="${cy0+30}" class="${lab} t-mid" style="fill:var(--hippo);font-weight:600;opacity:${f1(ramp(e3,.2,.5))}">BDNF ↑  Bcl-2 ↑</text>`}
    const ck=clock24(390,300,34,{sleep:[23,7],h:(t*120)%24,small:true});C+=ck.svg+`<text x="390" y="${300-42}" class="t-xs t-mid">body clock</text>`;
    s+=`<g style="opacity:${zo(2)}">${C}</g>`;
    /* lithium ions drifting in through the channel */
    IONS.forEach((o,i)=>{const a=ramp(t,o.tin,o.tin+.05);if(a<=0)return;const x=lerp(225,o.x,a)+Math.sin(t*30+o.ph)*4*a,y=lerp(-4,o.y,a)+Math.cos(t*26+o.ph)*4*a;s+=ion(x,y,'li',{r:7,op:.85})});
    return s}
  /* ---------- mechanism cards ---------- */
  const CARDS=[
    {t:'Inositol depletion',ev:['HYPOTHESIS','hyp'],l:['Blocks IMPase: 50% at 0.8 mM','Frontal myo-inositol −30% in 5–7 days','…before mood had changed (n = 12)']},
    {t:'GSK-3β inhibition',ev:['EARLY EVIDENCE','early'],l:['Direct block, Ki ≈ 2 mM, vs Mg²⁺','Inhibited GSK-3β 8× higher (9 people)','Proof needs selective inhibitors']},
    {t:'Neuroprotection, clock',ev:['EARLY EVIDENCE','early'],l:['BDNF and Bcl-2 up, cell death down','Hippocampus like controls after 2+ y','Delays and steadies daily rhythms']}];
  function cards(t,x,y,w,h,gap,N){const ph=phaseOf(LI_STEPS,t);let s='';
    CARDS.forEach((c,i)=>{const yy=y+i*(h+gap),on=ph===i,seen=ph>=i;
      s+=`<g style="opacity:${seen?1:.45}"><rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="10" style="fill:var(--panel);stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x+12}" y="${yy+20}" class="t-lbl">${c.t}</text>`+(N?chip(x+w-c.ev[0].length*6.1-24,yy+18,c.ev[0],c.ev[1]):chip(x+12,yy+38,c.ev[0],c.ev[1]));
      c.l.forEach((l,k)=>{s+=`<text x="${x+12}" y="${yy+(N?40:60)+k*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`});s+='</g>'});
    return s}
  /* ---------- forest plot ---------- */
  function forest(t,N){const L=N?{x0:16,x1:300,vx:388,top:48,rh:30,gh:22}:{x0:300,x1:585,vx:712,top:52,rh:18,gh:21};
    const lo=Math.log(.02),hi=Math.log(3),X=v=>L.x0+(Math.log(v)-lo)/(hi-lo)*(L.x1-L.x0);
    let s='',y=L.top;
    const rowsH=LI_FOREST.reduce((a,g)=>a+L.gh+g.rows.length*L.rh,0),yEnd=L.top+rowsH;
    /* axis */
    [.05,.1,.25,.5,1,2].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-6}" y2="${yEnd}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);stroke-width:1.2"':''}/><text x="${f1(X(v))}" y="${L.top-10}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-6)}" y="${yEnd+14}" class="t-xs t-end" style="fill:var(--rx)">${N?'← fewer with lithium':'← fewer events with lithium (or first named)'}</text><text x="${f1(X(1)+6)}" y="${yEnd+14}" class="t-xs">more →</text>`;
    LI_FOREST.forEach(G=>{const st=LI_STEPS[G.s],gp=ramp(t,st.from,st.from+.03);
      if(gp>0)s+=`<text x="${N?L.x0:16}" y="${f1(y+15)}" class="t-sm" style="fill:var(--rx);opacity:${f1(gp)};font-weight:600">${N?G.gn:G.g}</text>`;
      y+=L.gh;
      G.rows.forEach((r,k)=>{const rp=ramp(t,st.from+.015+k*.02,st.from+.06+k*.02);const yy=N?y+17:y+9;
        if(rp>0){const [lb,m,pt,a,b]=r,sig=b<1,col=sig?'var(--rx)':'var(--muted)',la=Math.exp(lerp(Math.log(pt),Math.log(a),rp)),lb2=Math.exp(lerp(Math.log(pt),Math.log(b),rp));
          s+=`<g style="opacity:${f1(ramp(rp,0,.4))}"><text x="${N?L.x0:28}" y="${f1(N?y+9:yy+3.5)}" class="t-xs" style="fill:var(--ink)">${lb}</text>`;
          s+=`<line x1="${f1(X(la))}" x2="${f1(X(lb2))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:2;stroke-linecap:round"/><rect x="${f1(X(pt)-4.5)}" y="${f1(yy-4.5)}" width="9" height="9" style="fill:${col}"/>`;
          if(rp>.7)s+=`<text x="${L.vx}" y="${f1(N?y+9:yy+3.5)}" class="t-xs t-end" style="fill:${sig?'var(--ink)':'var(--muted)'}">${m} ${fmt(pt)} (${dash(a,b)})</text>`;s+='</g>'}
        y+=L.rh})});
    /* acute mania mini-panel (different scale) */
    const mt=N?yEnd+34:yEnd+30,mp=ramp(t,LI_STEPS[4].from+.04,LI_STEPS[4].from+.09);
    if(mp>0){const M=N?{x0:16,x1:300}:{x0:300,x1:585},MX=v=>lerp(M.x0,M.x1,(v+.8)/1.2);
      s+=`<g style="opacity:${f1(mp)}"><text x="16" y="${mt}" class="t-sm" style="fill:var(--rx);font-weight:600">${N?'Acute mania, 3 weeks · Cipriani 2011':'Acute mania at 3 weeks · Cipriani 2011 (68 RCTs, 16,073 people) · SMD, different scale'}</text>`;
      const y0=mt+10,y1=y0+(N?2:2)*(N?30:18)+4;
      [-.8,-.4,0,.4].forEach(v=>{s+=`<line x1="${f1(MX(v))}" x2="${f1(MX(v))}" y1="${y0}" y2="${y1}" class="${v?'grid':'axis'}" ${v?'':'style="stroke:var(--ink);stroke-width:1.2"'}/><text x="${f1(MX(v))}" y="${y1+12}" class="t-xs t-mid">${v>0?'+':''}${v===0?'0':String(v).replace('-','−')}</text>`});
      LI_MANIA.forEach((r,k)=>{const yb=N?y0+k*30+22:y0+k*18+9;
        s+=`<text x="${N?M.x0:28}" y="${f1(N?yb-8:yb+3.5)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><line x1="${f1(MX(r[2]))}" x2="${f1(MX(r[3]))}" y1="${yb}" y2="${yb}" style="stroke:var(--rx);stroke-width:2"/><rect x="${f1(MX(r[1])-4.5)}" y="${yb-4.5}" width="9" height="9" style="fill:var(--rx)"/><text x="${N?388:712}" y="${f1(N?yb-8:yb+3.5)}" class="t-xs t-end" style="fill:var(--ink)">SMD ${fmt(r[1])} (${fmt(r[2])} to ${fmt(r[3])})</text>`.replace(/-0\./g,'−0.')});
      s+='</g>'}
    return s}
  function draw(t){
    const N=vb(svg,'720 490','400 680');const ph=phaseOf(LI_STEPS,t);let s='';
    const fc=ramp(t,.47,.5),ff=ramp(t,.5,.53);
    if(t<.5){
      s+=`<text x="${N?12:20}" y="20" class="t-sm" style="fill:var(--rx);font-weight:600">INSIDE THE CELL · THREE PROPOSED MECHANISMS</text>`;
      s+=`<g style="opacity:${f1(1-fc)}">`;
      s+=N?`<g transform="translate(8 40) scale(.853)">${cell(t,N)}</g>`+cards(t,10,370,380,90,8,N)
          :`<g transform="translate(12 52) scale(.92)">${cell(t,N)}</g>`+cards(t,446,52,266,106,14,N);
      s+='</g>';
      const lg=N?670:430,lx=N?12:20;s+=ion(lx+6,lg-4,'li',{r:6})+`<text x="${lx+16}" y="${lg}" class="t-xs">lithium ion</text><circle cx="${lx+100}" cy="${lg-4}" r="6" style="fill:var(--muted)"/><text x="${lx+110}" y="${lg}" class="t-xs">magnesium</text><path d="M${lx+188} ${lg-9}l5 5l-5 5l-5-5Z" style="fill:var(--nt)"/><text x="${lx+198}" y="${lg}" class="t-xs">β-catenin</text><circle cx="${lx+270}" cy="${lg-4}" r="3.6" style="fill:var(--hippo)"/><text x="${lx+278}" y="${lg}" class="t-xs">BDNF</text>`}
    else{
      s+=`<text x="${N?12:20}" y="20" class="t-sm" style="fill:var(--rx);font-weight:600">${N?'THE EVIDENCE · FOREST PLOT':'THE EVIDENCE · POINT ESTIMATE AND 95% CONFIDENCE INTERVAL'}</text>`;
      s+=`<g style="opacity:${f1(ff)}">${forest(t,N)}</g>`}
    svg.innerHTML=s;setSt(ph);$('#liNote').innerHTML=noteHTML(LI_STEPS[ph]);
  }
  const stop=playWire(rg,$('#liPlay'),draw,30000,'Replay','lithium');
  setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- icon arrays ---------- */
  const isv=$('#liIcons'),txt=$('#liIconTxt');let mode='pbo',stopI=null,shown=1;
  function groups(){
    if(mode==='pbo'){const b=+$('#liBase').value,r=LI_RR[$('#liOut').value];
      return {G:[['Placebo',b],['Lithium',Math.round(b*r[0])]],col:'var(--accent)',what:'had '+r[3],
        txt:`Applying the pooled risk ratio for ${r[3]}, RR ${r[0].toFixed(2)} (95% CI ${r[1].toFixed(2)}–${r[2].toFixed(2)}), to a placebo group in which ${b} of 100 have one gives about <b>${Math.round(b*r[0])} of 100 on lithium</b> (range ${Math.round(b*r[1])}–${Math.min(100,Math.round(b*r[2]))}).${r[2]>=1?' This interval crosses 1, so lithium may make no difference to depressive episodes.':''} The placebo figure is yours to set: trials differed in length and baseline risk, and this is an illustration of a pooled relative effect, not a trial result. [[Severus2014E]]`}}
    if(mode==='bal')return {G:[['Lithium + valproate',54],['Lithium',59],['Valproate',69]],col:'var(--accent)',what:'needed a new intervention for an emerging episode',
        txt:`BALANCE (330 people with bipolar I disorder, up to 24 months): <b>54%</b> on the combination, <b>59%</b> on lithium and <b>69%</b> on valproate needed a new intervention for an emerging mood episode. Lithium vs valproate HR 0.71 (0.51–1.00); combination vs lithium was not significantly different. [[Geddes2010BALANCE]]`};
    if(mode==='gel')return {G:[['Standard level 0.8–1.0',13],['Low level 0.4–0.6',38]],col:'var(--accent)',what:'relapsed',
        txt:`In a double-blind trial of 94 people, <b>13%</b> (6 of 47) kept at a "standard" level of 0.8–1.0 mmol/L relapsed, against <b>38%</b> (18 of 47) at a "low" level of 0.4–0.6 mmol/L: 2.6 times the risk (95% CI 1.3–5.2). Tremor, diarrhoea, urinary frequency, weight gain and metallic taste were more common at the standard level. Ranges are quoted as published, not as targets for anyone. See <a href="#levels" data-go="levels">Lithium levels</a>. [[Gelenberg1989]]`};
    return {G:[['Lithium',49],['Divalproex',48],['Placebo',25]],col:'var(--good)',what:'improved by at least 50%',
        txt:`In a 21-day trial of 179 inpatients with mania, at least 50% improvement was seen in <b>49%</b> on lithium, <b>48%</b> on divalproex and <b>25%</b> on placebo. [[Bowden1994]]`}}
  function drawI(p){const D=groups(),n=D.G.length,N=NARROW();
    const cols=N?(n>2?2:2):n,gw=N?180:(n>2?226:300),cw=N?17:(n>2?19.5:22),gh=10*cw+52,rows=Math.ceil(n/cols);
    const W=N?400:720,H=rows*gh+26;vb(isv,`${W} ${H}`,`${W} ${H}`);
    let s='';const tot=cols*gw,ox=(W-tot)/2;
    D.G.forEach(([nm,v],gi)=>{const c=gi%cols,r=Math.floor(gi/cols),gx=ox+c*gw+(gw-10*cw)/2+(rows>1&&r===rows-1&&n%cols?gw/2:0),gy=r*gh+8,k=Math.round(v*p);
      s+=`<text x="${f1(gx)}" y="${gy+12}" class="t-lbl">${nm}</text><text x="${f1(gx)}" y="${gy+22+10*cw+14}" class="t-lbl" style="fill:${D.col}">${k} of 100</text>`;
      for(let i=0;i<100;i++){const x=gx+(i%10)*cw+cw/2-2,y=gy+22+Math.floor(i/10)*cw;s+=person(x,y,cw*.82,i<k?D.col:'var(--line)')}});
    s+=`<text x="${W/2}" y="${H-6}" class="t-xs t-mid">filled = ${D.what}</text>`;
    isv.innerHTML=s;txt.innerHTML=D.txt}
  function run(){if(stopI)stopI();stopI=animate(900,p=>{shown=p;drawI(p)},()=>{stopI=null})}
  $$('[data-lic]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.lic;$$('[data-lic]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#liPboCtl').hidden=mode!=='pbo';run()}));
  $('#liOut').addEventListener('change',run);
  $('#liBase').addEventListener('input',()=>{$('#liBaseV').textContent=$('#liBase').value;if(stopI){stopI();stopI=null}drawI(1)});
  drawI(1);
  {const prev=redraws.lithium;redraws.lithium=()=>{prev&&prev();drawI(1)}}
};
