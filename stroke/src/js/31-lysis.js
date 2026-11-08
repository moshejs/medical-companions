/* =============== 3.1 Clot-dissolving treatment =============== */
/* Main player: kit artery with o.lysis above a close-up of the clot (fibrin mesh, drug, plasminogen to plasmin).
   Widgets: delay explorer (published bands only, never interpolated) with 100 people, IST-3 stacked bars, bleeding
   views, two trial explorers built from one renderer, and a window chart. */
const LY_STEPS=[
 {from:0,at:.08,k:'Step 1 · the blockage',t:'A clot blocks the artery',
  txt:'Most strokes happen because a clot blocks a blood vessel in the brain. Reperfusion means getting blood flowing again [[Goyal2016,NINDS1995]]. Red cells pile up behind the clot and none get past.',
  pt:'A clot is like a plug in a pipe. Brain tissue beyond it is short of blood until the plug clears.'},
 {from:.2,at:.3,k:'Step 2 · the drug arrives',t:'Given into a vein',
  txt:'Alteplase is published as 0.9 mg/kg, maximum 90 mg, with 10% as a bolus over 1 minute and the rest over 60 minutes [[FDA-Activase]]. Tenecteplase is a single bolus over 5 seconds, maximum 25 mg [[FDA-TNKase]]. Doses as published, not instructions.',
  pt:'A clot-busting medicine is given through a drip or a single injection into a vein. It can only be given to some people, and timing matters [[FDA-Activase,FDA-TNKase]].'},
 {from:.4,at:.5,k:'Step 3 · the key reaction',t:'Plasminogen becomes plasmin',
  txt:'The Activase label says alteplase "binds to fibrin in a thrombus and converts the entrapped plasminogen to plasmin" [[FDA-Activase]]. Conversion is limited without fibrin. Tenecteplase is a modified form of tPA, and the label says the clinical significance of its fibrin specificity on safety or efficacy has not been established [[FDA-TNKase]].',
  hook:'tPA is a serine protease: it converts plasminogen to plasmin, and fibrin enhances the reaction [[FDA-Activase]].'},
 {from:.6,at:.7,k:'Step 4 · the mesh breaks',t:'Plasmin cuts the fibrin',
  txt:'The conversion starts what the label calls "local fibrinolysis with limited systemic proteolysis" [[FDA-Activase]]. The fibrin mesh holding the clot together falls apart into fragments, which the blood carries away. The same drug can also cause bleeding: fatal intracerebral haemorrhage within 7 days was 2.7% versus 0.4% in pooled trials [[Whiteley2016]].',
  pt:'The medicine switches on the body\'s own clot-cutting enzyme, right where the clot is.'},
 {from:.8,at:.95,k:'Step 5 · and when it fails',t:'Flow returns, if the clot clears',
  txt:'Not every clot dissolves. In EXTEND-IA TNK, people with large-vessel occlusion were imaged before thrombectomy: over 50% of the territory had reperfused in 22% with tenecteplase and 10% with alteplase [[Campbell2018]]. That is one reason thrombectomy exists (next module).',
  hook:'In EXTEND-IA TNK, reperfusion at first angiogram was 22% versus 10% (P=0.03 for superiority) [[Campbell2018]].'}];
const LY_STATE=['no flow past the clot','drug reaching the clot','clot still blocking','clot breaking up','flow returning'];
const LY_CAP=['Inside the clot: fibrin, red cells, plasminogen','The drug binds to fibrin in the clot','On fibrin, plasminogen is converted to plasmin','Plasmin cuts the fibrin into fragments','The mesh is gone: blood can pass'];
const LY_LEG=['alteplase or tenecteplase','plasminogen','plasmin','fibrin strand','red cell'];

/* the mesh is built once per layout, from a seeded generator, so scrubbing never reshuffles it */
function lyMeshBuild(B){const R=rng(23),pieces=[],sites=[],cells=[],rows=6,M=Math.max(4,Math.round(B.w/70));
  const addLine=(p0,p1,n)=>{let prev=p0;for(let i=1;i<=n;i++){const u=i/n,nx=i===n?p1:[lerp(p0[0],p1[0],u)+(R()-.5)*14,lerp(p0[1],p1[1],u)+(R()-.5)*14];
    pieces.push({a:prev,b:nx,ct:.6+R()*.15,dx:40+R()*70,dy:(R()-.5)*34});if(i<n&&i%2===0&&sites.length<14)sites.push({p:nx,y0:B.y+R()*B.h,dx:30+R()*50,dy:(R()-.5)*24});prev=nx}};
  for(let r=0;r<rows;r++){const y=B.y+B.h*(r+.5)/rows;addLine([B.x,y+(R()-.5)*8],[B.x+B.w,y+(R()-.5)*8],M)}
  for(let d=0;d<5;d++){const x0=B.x+B.w*(d+.15)/5,x1=x0+B.w*.14*(d%2?1:-1);addLine([x0,B.y],[clamp(x1,B.x,B.x+B.w),B.y+B.h],4)}
  for(let i=0;i<10;i++)cells.push({x:B.x+R()*B.w,y:B.y+R()*B.h,rot:R()*160,ct:.62+R()*.12,dx:50+R()*70});
  return {pieces,sites,cells,B}}
function lyLegGlyph(k,x,y){
  if(k===0)return `<rect x="${f1(x+1)}" y="${f1(y-5)}" width="8" height="8" transform="rotate(45 ${f1(x+5)} ${f1(y-1)})" style="fill:var(--tpa)"/>`;
  if(k===1)return `<circle cx="${f1(x+5)}" cy="${f1(y-1)}" r="5.5" style="fill:var(--panel);stroke:var(--ca);stroke-width:2"/>`;
  if(k===2)return `<circle cx="${f1(x+5)}" cy="${f1(y-1)}" r="6" style="fill:var(--ca);stroke:var(--ink);stroke-width:1"/>`;
  if(k===3)return `<line x1="${f1(x-2)}" x2="${f1(x+12)}" y1="${f1(y-1)}" y2="${f1(y-1)}" style="stroke:var(--artery-line);stroke-width:2.2"/>`;
  return `<ellipse cx="${f1(x+5)}" cy="${f1(y-1)}" rx="6" ry="3.8" style="fill:var(--blood)"/>`}

/* paired bars, one renderer for both trial explorers and the bleeding views */
const LY_ROW=62,LY_TROW=40;
function lyPairH(rows){return 40+rows.reduce((a,r)=>a+(r.txt?LY_TROW:(r.b==null?LY_ROW-16:LY_ROW)),0)}
function lyPair(x,y,w,title,rows,arms,o={}){const vals=[];rows.forEach(r=>{if(!r.txt){vals.push(r.a);if(r.b!=null)vals.push(r.b)}});
  const mx=Math.max(o.max||0,...vals,1),bw=w-138,u=o.unit==null?'%':o.unit;
  let s=`<text x="${f1(x)}" y="${f1(y+14)}" class="t-big">${title}</text>`,yy=y+30;
  rows.forEach(r=>{s+=`<text x="${f1(x)}" y="${f1(yy+11)}" class="t-sm" style="fill:var(--ink)">${r.l}</text>`;
    if(r.txt){s+=`<text x="${f1(x)}" y="${f1(yy+26)}" class="t-sm">${r.txt}</text>`;yy+=LY_TROW;return}
    const bar=(v,col,arm,by)=>{const wd=Math.max(1.5,v/mx*bw);return `<rect x="${f1(x)}" y="${f1(by)}" width="${f1(wd)}" height="13" rx="2" style="fill:${col}"/><text x="${f1(x+wd+6)}" y="${f1(by+10.5)}" class="t-xs" style="fill:var(--ink);font-weight:700">${arm} ${v}${u}</text>`};
    s+=bar(r.a,r.ca||'var(--rx)',r.la||arms[0],yy+17);
    if(r.b!=null){s+=bar(r.b,'var(--muted)',r.lb||arms[1],yy+33);yy+=LY_ROW}else yy+=LY_ROW-16});
  return s}

const LY_TNK=[
 {id:'act',n:'AcT',arms:['TNK','Alteplase'],k:'Canada · 1577 in analysis',v:'Noninferior',
  rows:[{l:'mRS 0 to 1 at 90 days',a:36.9,b:34.8},{l:'Symptomatic haemorrhage at 24 hours',a:3.4,b:3.2},{l:'Death at 90 days',a:15.3,b:15.4}],
  txt:'Median age 74, 47.9% female. Risk difference 2.1% (95% CI -2.6 to 6.9), meeting noninferiority [[Menon2022]].'},
 {id:'lab',n:'US label subset',arms:['TNK','Alteplase'],k:'AcT, 0 to 3 hours · n=1147',v:'As in the TNKase label',
  rows:[{l:'mRS 0 to 1',a:36.6,b:35.9},{l:'Symptomatic intracerebral haemorrhage',a:3.4,b:3.1},{l:'Death',a:15.0,b:15.0},{l:'Orolingual angioedema',a:1.0,b:1.4}],
  txt:'The label analysed this subset because the comparator is approved for 0 to 3 hours. Median onset to needle 108 minutes. Risk difference 0.7% (95% CI -4.9 to 6.3) [[FDA-TNKase]].'},
 {id:'tr2',n:'TRACE-2',arms:['TNK','Alteplase'],k:'China · 1430 enrolled',v:'Noninferior',
  rows:[{l:'mRS 0 to 1',a:62,b:58},{l:'Symptomatic haemorrhage',a:2,b:2},{l:'Mortality',a:7,b:5}],
  txt:'NIHSS 5 to 25, not eligible for thrombectomy. RR 1.07 (0.98 to 1.16), noninferior [[Wang2023Lancet]].'},
 {id:'att',n:'ATTEST-2',arms:['TNK','Alteplase'],k:'UK, 39 centres · 1777 analysed',v:'Noninferior, not superior',
  rows:[{l:'mRS distribution',txt:'OR 1.07 (0.90 to 1.27); p=0.43 for superiority'},{l:'Deaths',a:8,b:8},{l:'Symptomatic haemorrhage',a:2,b:2},{l:'Parenchymal haematoma type 2',a:4,b:3},{l:'Angioedema',a:1,b:1}],
  txt:'Median NIHSS 7. Noninferior but not superior on mRS distribution [[Muir2024]].'},
 {id:'ori',n:'ORIGINAL',arms:['TNK','Alteplase'],k:'China · 1465 analysed',v:'Noninferior',
  rows:[{l:'mRS 0 to 1',a:72.7,b:70.3},{l:'Symptomatic haemorrhage',a:1.2,b:1.2},{l:'Mortality at 90 days',a:4.6,b:5.8}],
  txt:'NIHSS 1 to 25. RR 1.03 (0.97 to 1.09), noninferior [[Meng2024]].'},
 {id:'ei1',n:'EXTEND-IA TNK',arms:['TNK','Alteplase'],k:'Before thrombectomy · 202 people',v:'More early reperfusion',
  rows:[{l:'Reperfusion over 50% at first angiogram',a:22,b:10},{l:'Symptomatic haemorrhage',a:1,b:1},{l:'Median mRS at 90 days',txt:'2 versus 3 (common OR 1.7, 1.0 to 2.8)'}],
  txt:'Large-vessel occlusion, tenecteplase 0.25 mg/kg. P=0.03 for superiority on reperfusion [[Campbell2018]].'},
 {id:'ei2',n:'EXTEND-IA TNK part 2',arms:['0.40 mg/kg','0.25 mg/kg'],k:'Dose comparison · 300 people',v:'No gain from the higher dose',
  rows:[{l:'Reperfusion',a:19.3,b:19.3},{l:'Symptomatic haemorrhage',a:4.7,b:1.3}],
  txt:'The higher dose gave identical reperfusion and numerically more symptomatic haemorrhage [[Campbell2020JAMA]].'}];

const LY_EXT=[
 {id:'wak',n:'WAKE-UP',arms:['Alteplase','Control'],k:'Unknown onset · 503 of a planned 800',v:'Positive; stopped when funding ended',
  rows:[{l:'mRS 0 to 1 at 90 days',a:53.3,b:41.8},{l:'Deaths',a:4.1,b:1.2},{l:'Symptomatic haemorrhage',a:2.0,b:.4}],
  txt:'DWI-FLAIR mismatch, thrombectomy excluded. Adjusted OR 1.61 (1.09 to 2.36) [[Thomalla2018]].'},
 {id:'ext',n:'EXTEND',arms:['Alteplase','Control'],k:'4.5 to 9 hours or wake-up · 225 of 310',v:'Positive',
  rows:[{l:'mRS 0 to 1',a:35.4,b:29.5},{l:'Symptomatic haemorrhage',a:6.2,b:.9}],
  txt:'Perfusion selected. Adjusted RR 1.44 (1.01 to 2.06) [[Ma2019]].'},
 {id:'ipd',n:'Pooled, 4 trials',arms:['Alteplase','Comparator'],k:'WAKE-UP, EXTEND, THAWS, ECASS-4 · 843',v:'Benefit, with more deaths',
  rows:[{l:'mRS 0 to 1',a:47,b:39},{l:'mRS 4 to 6',a:21,b:25},{l:'Death',a:6,b:3},{l:'Symptomatic haemorrhage',txt:'3% versus under 1% (adjusted OR 5.58, 1.22 to 25.50)'}],
  txt:'Individual patient data. mRS 0 to 1 adjusted OR 1.49 (1.10 to 2.03); death adjusted OR 2.06 (1.03 to 4.09) [[Thomalla2020]].'},
 {id:'tim',n:'TIMELESS',arms:['TNK','Placebo'],k:'4.5 to 24 hours · 458 · 77.3% had thrombectomy',v:'Neutral',
  rows:[{l:'Primary outcome',txt:'common OR 1.13 (0.82 to 1.57); P=0.45'},{l:'Mortality',a:19.7,b:18.2},{l:'Symptomatic haemorrhage',a:3.2,b:2.3}],
  txt:'MCA or ICA occlusion, perfusion selected. Most people also had thrombectomy [[Albers2024]]. The full mRS bars are in the next module.'},
 {id:'tr3',n:'TRACE-III',arms:['TNK','Control'],k:'4.5 to 24 hours · China · 516',v:'Positive; no access to thrombectomy',
  rows:[{l:'mRS 0 to 1',a:33.0,b:24.2},{l:'Mortality',a:13.3,b:13.1},{l:'Symptomatic haemorrhage',a:3.0,b:.8}],
  txt:'Large-vessel occlusion, under 2% rescued. Relative rate 1.37 (1.04 to 1.81) [[Xiong2024]].'},
 {id:'cha',n:'CHABLIS-T II',arms:['TNK','Control'],k:'Up to 24 hours · 224',v:'More reperfusion, no clinical change',
  rows:[{l:'Reperfusion over 50%, no symptomatic bleed',a:33.3,b:10.8}],
  txt:'Adjusted RR 3.0 (1.6 to 5.7), with no change in 90-day clinical outcomes [[Cheng2025]].'},
 {id:'opt',n:'OPTION',arms:['TNK','Control'],k:'4.5 to 24 hours · China · 566',v:'Positive; non-large-vessel occlusion',
  rows:[{l:'mRS 0 to 1',a:43.6,b:34.2},{l:'Symptomatic haemorrhage',a:2.8,b:0},{l:'Mortality',a:5.0,b:3.2}],
  txt:'RR 1.28 (1.04 to 1.57) [[Ma2026]].'},
 {id:'hop',n:'HOPE',arms:['Alteplase','Control'],k:'4.5 to 24 hours · China · 372',v:'Positive',
  rows:[{l:'mRS 0 to 1',a:40,b:26},{l:'Symptomatic haemorrhage',a:3.8,b:.51},{l:'Mortality',a:11,b:11}],
  txt:'Perfusion selected. Adjusted RR 1.52 (1.14 to 2.02). The paper labels mRS 0 to 1 "functional independence", whereas most trials use 0 to 2 for that term [[Zhou2025]].'},
 {id:'exp',n:'EXPECTS',arms:['Alteplase','Control'],k:'Posterior circulation · China · 234',v:'Positive; mild strokes',
  rows:[{l:'mRS 0 to 2 (note the wider band)',a:89.6,b:72.6},{l:'Symptomatic haemorrhage',a:1.7,b:.9},{l:'Death',a:5.2,b:8.5}],
  txt:'Median NIHSS 3. Adjusted RR 1.16 (1.03 to 1.30) [[Yan2025]].'},
 {id:'met',n:'TNK meta-analysis',arms:['TNK','Control'],k:'4.5 to 24 hours · 4 RCTs · 1278',v:'Benefit without thrombectomy',
  rows:[{l:'mRS 0 to 1, all trials',txt:'OR 1.34 (1.06 to 1.71)'},{l:'Non-thrombectomy subgroup',txt:'OR 1.46 (1.02 to 2.08)'},{l:'Thrombectomy-permitted subgroup',txt:'improved only on recanalisation'}],
  txt:'The benefit held in the non-thrombectomy subgroup [[Wang2026]].'}];

/* Emberson 2014 bands: rates, odds ratios, CIs. The NNTs are derived by the research pass, not stated by the source. */
const LY_EM=[
 {a:0,b:3,t:'Within 3 hours',or:1.75,lo:1.35,hi:2.27,rx:32.9,ctl:23.1,nC:23,nX:10,gain:'about 10% (as stated by the source)',nnt:'about 10',sig:true},
 {a:3,b:4.5,t:'Over 3 to 4.5 hours',or:1.26,lo:1.05,hi:1.51,rx:35.3,ctl:30.1,nC:30,nX:5,gain:'about 5% (as stated by the source)',nnt:'about 19',sig:true},
 {a:4.5,b:6.5,t:'Beyond 4.5 hours',or:1.15,lo:.95,hi:1.40,rx:32.6,ctl:30.6,nC:31,nX:2,gain:'2.0 points (not statistically significant)',nnt:'about 50, not statistically significant',sig:false}];
const LY_LE=[
 {a:0,b:1.5,t:'0 to 90 minutes',or:2.55,lo:1.44,hi:4.52,mort:.78},
 {a:1.5,b:3,t:'91 to 180 minutes',or:1.64,lo:1.12,hi:2.40,mort:1.13},
 {a:3,b:4.5,t:'181 to 270 minutes',or:1.34,lo:1.06,hi:1.68,mort:1.22},
 {a:4.5,b:6,t:'271 to 360 minutes',or:1.22,lo:.92,hi:1.61,mort:1.49}];
const LY_BL=[
 {arms:['Alteplase','Control'],title:'Pooled trials: three definitions, plus NINDS',
  rows:[{l:'Type 2 parenchymal haemorrhage within 7 days',a:6.8,b:1.3},{l:'SITS-MOST definition, 24 to 36 hours',a:3.7,b:.6},{l:'Fatal intracerebral haemorrhage within 7 days',a:2.7,b:.4},{l:'NINDS definition, within 36 hours (its own trial)',a:6.4,b:.6}],
  note:'<div class="kicker">Same drug, different number</div><h4>Definitions drive the headline</h4><p>Across the same pooled patients symptomatic bleeding reads 6.8% or 3.7% by definition, and NINDS reported 6.4% under its own definition [[Whiteley2016,NINDS1995]]. Odds ratios were 5.55 (4.01 to 7.70), 6.67 (4.11 to 10.84) and 7.14 (3.98 to 12.79) [[Whiteley2016]].</p>'},
 {arms:['Excess',''],title:'Excess SITS-MOST haemorrhage by stroke severity',
  rows:[{l:'NIHSS 0 to 4: absolute excess (0.8 to 2.6)',a:1.5,la:'Excess',ca:'var(--core)'},{l:'NIHSS 22 or more: absolute excess (2.1 to 6.3)',a:3.7,la:'Excess',ca:'var(--core)'}],max:6,
  note:'<div class="kicker">Severity</div><h4>Same proportion, bigger absolute risk</h4><p>However defined, the proportional increase did not depend on delay, age or severity. The absolute excess rose with severity (p=0.0101) [[Whiteley2016]].</p>'},
 {arms:['',''],title:'Within 4.5 hours: gain and harm, in points',
  rows:[{l:'Gain in mRS 0 to 1 (4.0 to 9.5)',a:6.8,la:'Gain',ca:'var(--salvage)'},{l:'Rise in fatal haemorrhage (1.5 to 3.0)',a:2.2,la:'Rise',ca:'var(--core)'},{l:'Rise in any death within 90 days (-1.4 to 3.2)',a:.9,la:'Rise',ca:'var(--core)'}],max:10,
  note:'<div class="kicker">The trade-off</div><h4>Gain exceeded harm within 4.5 hours</h4><p>The absolute gain in mRS 0 to 1 exceeded the rise in fatal haemorrhage and in any death within 90 days [[Whiteley2016]]. Overall 90-day mortality across the pool was 17.9% versus 16.5% (HR 1.11, 0.99 to 1.25; p=0.07) [[Emberson2014]].</p>'}];
const LY_WIN=[
 {l:'Activase label: "within 3 hours"',a:0,b:3,kind:'label'},
 {l:'TNKase label: "within 3 hours"',a:0,b:3,kind:'label'},
 {l:'NINDS trial',a:0,b:3,kind:'trial'},
 {l:'ECASS III trial',a:3,b:4.5,kind:'trial'},
 {l:'IST-3 trial',a:0,b:6,kind:'trial'},
 {l:'ESO and 2026 AHA/ASA as summarised',a:0,b:4.5,kind:'guide'},
 {l:'2026 AHA/ASA as summarised: imaging-selected',a:4.5,b:9,kind:'guide',dash:1},
 {l:'EXTEND trial: perfusion selected',a:4.5,b:9,kind:'trial'},
 {l:'TIMELESS and TRACE-III trials',a:4.5,b:24,kind:'trial'}];
const LY_KIND={label:['var(--rx)','label'],trial:['var(--brand)','trial'],guide:['var(--prev)','guidance']};
const LY_OHS=[{l:'Alteplase, n=1515',d:[9,15,13,16,8,13,27]},{l:'Control, n=1520',d:[8,13,14,13,9,16,27]}];

inits.lysis=()=>{
  /* ---- main player ---- */
  const svg=$('#lySvg'),rg=$('#lyT'),meshes={};
  function draw(t){const N=vb(svg,'720 400','400 590'),p=phaseOf(LY_STEPS,t);
    const L=N?{ax:10,ay:36,aw:380,ah:62,bx:10,by:122,bw:380,bh:448,capx:22,capy:146,m:{x:22,y:164,w:356,h:300},leg:[ [26,490],[214,490],[26,516],[214,516],[26,542] ]}
             :{ax:20,ay:36,aw:680,ah:66,bx:20,by:124,bw:680,bh:266,capx:34,capy:146,m:{x:34,y:160,w:652,h:186},leg:[ [40,372],[214,372],[316,372],[396,372],[512,372] ]};
    const key=N?'n':'w',M=meshes[key]||(meshes[key]=lyMeshBuild(L.m)),B=M.B;
    const ly=t<.5?.25*ramp(t,.2,.4):.25+.75*ease(ramp(t,.5,.92)),cl=1-ramp(t,.9,.99);
    const A=artery(L.ax,L.ay,L.aw,{h:L.ah,clot:cl,lysis:ly,at:.62,flow:1,ph:t*7,seed:17,stopAt:L.ax+L.aw*.62,pass:ramp(t,.6,.86)});
    let s=`<text x="${L.ax}" y="${L.ay-10}" class="t-sm" style="fill:var(--ink)">Artery, cut lengthwise</text><text x="${L.ax+L.aw}" y="${L.ay-10}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${LY_STATE[p]}</text>`+A.svg;
    /* the lens: the close-up comes from the clot */
    const cx=A.at.clot[0];
    s+=`<path d="M${f1(cx-18)} ${f1(L.ay+L.ah)}L${f1(L.bx+24)} ${L.by}M${f1(cx+18)} ${f1(L.ay+L.ah)}L${f1(L.bx+L.bw-24)} ${L.by}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:4 4"/>`;
    s+=`<rect x="${L.bx}" y="${L.by}" width="${L.bw}" height="${L.bh}" rx="10" style="fill:var(--field);stroke:var(--muted);stroke-width:1"/>`;
    s+=`<text x="${L.capx}" y="${L.capy}" class="t-sm" style="fill:var(--ink);font-weight:700">${LY_CAP[p]}</text>`;
    s+=`<defs><clipPath id="lyMeshClip"><rect x="${B.x}" y="${B.y-10}" width="${B.w}" height="${B.h+14}"/></clipPath></defs><g clip-path="url(#lyMeshClip)">`;
    M.cells.forEach(c=>{const k=ramp(t,c.ct,c.ct+.14),op=1-ramp(t,c.ct+.03,c.ct+.16);if(op>.01)s+=`<ellipse cx="${f1(c.x+k*c.dx)}" cy="${f1(c.y)}" rx="9" ry="5.6" transform="rotate(${f1(c.rot)} ${f1(c.x+k*c.dx)} ${f1(c.y)})" style="fill:var(--blood);opacity:${f1(.85*op)}"/>`});
    M.pieces.forEach(q=>{const k=ease(ramp(t,q.ct,q.ct+.12)),op=1-ramp(t,q.ct+.05,q.ct+.17);if(op<=.01)return;
      s+=`<line x1="${f1(q.a[0]+k*q.dx)}" y1="${f1(q.a[1]+k*q.dy)}" x2="${f1(q.b[0]+k*q.dx)}" y2="${f1(q.b[1]+k*q.dy)}" style="stroke:var(--artery-line);stroke-width:2.2;stroke-linecap:round;opacity:${f1(op)}"/>`});
    const n=M.sites.length;
    M.sites.forEach((q,i)=>{const u=i/n,ta=.2+u*.17,c=ramp(t,.41+u*.13,.46+u*.13),gone=ease(ramp(t,.74,.86)),op=1-ramp(t,.78,.88),sx=q.p[0]+gone*q.dx,sy=q.p[1]+gone*q.dy;
      if(op>.01){s+=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="7.5" style="fill:var(--panel);stroke:var(--ca);stroke-width:2;opacity:${f1(op)}"/>`;
        if(c>0)s+=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="8" style="fill:var(--ca);stroke:var(--ink);stroke-width:1;opacity:${f1(c*op)}"/>`}
      const d=ease(ramp(t,ta,ta+.09)),dop=ramp(t,ta,ta+.02)*(1-ramp(t,.78,.88));
      if(dop>.01){const dx=lerp(B.x+4,q.p[0]-10,d)+gone*q.dx,dy=lerp(q.y0,q.p[1]-10,d)+gone*q.dy;
        s+=`<rect x="${f1(dx-4.5)}" y="${f1(dy-4.5)}" width="9" height="9" transform="rotate(45 ${f1(dx)} ${f1(dy)})" style="fill:var(--tpa);stroke:var(--ink);stroke-width:.6;opacity:${f1(dop)}"/>`}});
    const fl=ramp(t,.84,.94);
    if(fl>0)for(let i=0;i<16;i++){const w=((i/16+t*2.6+(i%3)*.07)%1),yy=B.y+B.h*(.08+.84*((i*.37)%1));s+=`<ellipse cx="${f1(B.x+w*B.w)}" cy="${f1(yy)}" rx="9" ry="5.6" style="fill:var(--blood);opacity:${f1(.8*fl)}"/>`}
    s+='</g>';
    LY_LEG.forEach((txt,i)=>{const[lx,ly2]=L.leg[i];s+=lyLegGlyph(i,lx,ly2)+`<text x="${lx+18}" y="${ly2+3}" class="t-xs" style="fill:var(--ink)">${txt}</text>`});
    svg.innerHTML=s;setSt(p);$('#lyNote').innerHTML=noteHTML(LY_STEPS[p])}
  const stop=playWire(rg,$('#lyPlay'),draw,16000,'%t:player.replay%','lysis');
  const setSt=stepWire($('#lySteps'),LY_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- delay explorer ---- */
  const tb=$('#lyTbSvg'),tbD=$('#lyTbD');let src='E';
  const emBand=h=>h<=3?LY_EM[0]:h<=4.5?LY_EM[1]:LY_EM[2];
  const leBand=h=>h<=1.5?LY_LE[0]:h<=3?LY_LE[1]:h<=4.5?LY_LE[2]:h<=6?LY_LE[3]:null;
  function lyPeople(x,y,sz,gap,E){let s='';const nC=E.nC,nX=E.nX;
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,px=x+c*(sz+gap)+sz/2,py=y+r*(sz+gap*1.2),good=i<nC,extra=i>=nC&&i<nC+nX,bleed=i>=98;
      s+=person(px,py,sz,good?'var(--mrs1)':extra?'var(--rx)':bleed?'var(--core)':'var(--line)');
      if(extra)s+=`<circle cx="${f1(px)}" cy="${f1(py+sz*.52)}" r="${f1(sz*.56)}" style="fill:none;stroke:var(--rx);stroke-width:1.4"/>`;
      if(bleed)s+=`<path d="M${f1(px-sz*.42)} ${f1(py+sz*.1)}L${f1(px+sz*.42)} ${f1(py+sz*.95)}M${f1(px+sz*.42)} ${f1(py+sz*.1)}L${f1(px-sz*.42)} ${f1(py+sz*.95)}" style="stroke:var(--ink);stroke-width:1.6"/>`}
    return s}
  function drawTb(){const h=+tbD.value,N=vb(tb,'720 390','400 700'),E=emBand(h),isE=src==='E',bands=isE?LY_EM:LY_LE,top=isE?2.6:6;
    const L=N?{x0:46,x1:388,y0:70,y1:290,axl:326,ix:92,iy:388,it:374,lx:30,ly:[632,652,672]}:{x0:52,x1:426,y0:66,y1:300,axl:336,ix:476,iy:66,it:48,lx:458,ly:[318,338,358]};
    const X=v=>L.x0+(L.x1-L.x0)*v/6.5,lg=v=>Math.log(v),Y=v=>L.y1-(L.y1-L.y0)*(lg(v)-lg(.8))/(lg(top)-lg(.8));
    let s=`<text x="${L.x0}" y="16" class="t-sm" style="fill:var(--ink);font-weight:700">Odds of mRS 0 to 1 with alteplase, by time band</text>`;
    s+=`<rect x="${L.x0}" y="${L.y0}" width="${L.x1-L.x0}" height="${L.y1-L.y0}" style="fill:var(--field)"/>`;
    (isE?[1,1.25,1.5,2]:[1,1.5,2,3,4]).forEach(v=>{const y=Y(v);s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid" style="stroke:var(--line)"/><text x="${L.x0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}</text>`});
    bands.forEach(b=>{const xa=X(b.a)+1.5,xb=X(b.b)-1.5,on=(isE?E===b:leBand(h)===b);
      s+=`<rect x="${f1(xa)}" y="${f1(Y(b.hi))}" width="${f1(xb-xa)}" height="${f1(Y(b.lo)-Y(b.hi))}" style="fill:var(--rx);opacity:${on?.3:.12}"/><line x1="${f1(xa)}" x2="${f1(xb)}" y1="${f1(Y(b.or))}" y2="${f1(Y(b.or))}" style="stroke:var(--rx);stroke-width:${on?4:2.4}"/>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(1))}" y2="${f1(Y(1))}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/>`;
    s+=`<text x="${L.x0+4}" y="${f1(Y(1)+13)}" class="t-xs" style="fill:var(--ink)">OR 1 = no effect</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.y1}" y2="${L.y1}" class="axis"/><line x1="${L.x0}" x2="${L.x0}" y1="${L.y0}" y2="${L.y1}" class="axis"/>`;
    [0,1.5,3,4.5,6].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y1}" y2="${L.y1+5}" class="axis"/><text x="${f1(X(v))}" y="${L.y1+17}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${L.y1+32}" class="t-xs t-mid" style="fill:var(--ink)">Hours from onset to treatment</text>`;
    if(isE){[ [5.1,'5.1 h: lower 95% CI reaches 1',48],[6.3,'6.3 h: estimated no effect',32] ].forEach(([v,txt,yy])=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${yy+3}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(X(v)-4)}" y="${yy}" class="t-xs t-end" style="fill:var(--ink)">${txt}</text>`})}
    const cx=X(h);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.y0}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:2"/><path d="M${f1(cx-6)} ${L.y1+1}L${f1(cx+6)} ${L.y1+1}L${f1(cx)} ${L.y1-9}Z" style="fill:var(--ink)"/>`;
    /* OR labels sit over the shading and the cursor */
    bands.forEach(b=>{s+=kitLabel((X(b.a)+X(b.b))/2,Y(b.or)-6,b.or.toFixed(2),{a:'m',halo:'var(--field)'})});
    /* 100 people */
    s+=`<text x="${L.lx}" y="${L.it}" class="t-sm" style="fill:var(--ink);font-weight:700">Out of 100 people: ${E.t.toLowerCase()}</text>`;
    s+=lyPeople(L.ix,L.iy,18,4,E);
    const rows=[ ['var(--mrs1)',`${E.nC} mRS 0 to 1 without the drug`],['var(--rx)',`${E.nX} more with alteplase (ringed)`],['var(--core)','2 fatal bleeds added, overall (crossed)'] ];
    rows.forEach((r,i)=>{s+=person(L.lx+7,L.ly[i]-10,13,r[0])+`<text x="${L.lx+20}" y="${L.ly[i]}" class="t-xs" style="fill:var(--ink)">${r[1]}</text>`});
    tb.innerHTML=s;
    tbD.setAttribute('aria-valuetext',`${h} hours from onset to treatment`);
    $('#lyTbR').innerHTML=`<span>Delay <b>${h} h</b></span><span>Band <b>${isE?E.t:(leBand(h)?leBand(h).t:'beyond the pool')}</b></span>`;
    let nt;
    if(isE)nt=`<div class="kicker">Stroke Thrombolysis Trialists · 9 trials, 6756 people</div><h4>${E.t}</h4><dl class="kv"><div><dt>mRS 0 to 1 at 3 to 6 months</dt><dd><b>${E.rx}%</b> alteplase versus <b>${E.ctl}%</b> control [[Emberson2014]]</dd></div><div><dt>Odds ratio</dt><dd><b>${E.or}</b> (95% CI ${E.lo} to ${E.hi}) [[Emberson2014]]</dd></div><div><dt>Gain</dt><dd>${E.gain} [[Emberson2014]]</dd></div><div><dt>NNT, derived here, not stated by the source</dt><dd>${E.nnt} for one extra mRS 0 to 1</dd></div><div><dt>Bleeding, pooled across all delays</dt><dd>Type 2 parenchymal haemorrhage <b>6.8%</b> versus 1.3%; SITS-MOST definition <b>3.7%</b> versus 0.6%; fatal within 7 days <b>2.7%</b> versus 0.4%. The proportional increase did not depend on delay [[Whiteley2016]]</dd></div></dl>${h>=5.1?'<p>Past 5.1 hours the lower 95% CI has crossed 1.0, and the model estimates no effect at 6.3 hours [[Emberson2014]].</p>':''}`;
    else{const b=leBand(h);nt=b?`<div class="kicker">Lees 2010 · 3670 people within 360 minutes</div><h4>${b.t}</h4><dl class="kv"><div><dt>Adjusted odds of mRS 0 to 1</dt><dd><b>${b.or}</b> (95% CI ${b.lo} to ${b.hi}) [[Lees2010]]</dd></div><div><dt>Adjusted odds of mortality</dt><dd><b>${b.mort}</b> [[Lees2010]]</dd></div></dl><p>Large parenchymal haemorrhage was 5.2% versus 1.0%, with no clear relation to onset-to-treatment time (p=0.4140) [[Lees2010]]. The people still use Emberson 2014, which gives absolute rates.</p>`:`<div class="kicker">Lees 2010</div><h4>Beyond 360 minutes</h4><p>This pool stopped at 360 minutes, so it gives no figure here [[Lees2010]].</p>`}
    $('#lyTbNote').innerHTML=nt}
  tbD.addEventListener('input',drawTb);
  [ ['#lyTbE','E'],['#lyTbL','L'] ].forEach(([id,v])=>$(id).addEventListener('click',()=>{src=v;$('#lyTbE').setAttribute('aria-pressed',v==='E');$('#lyTbL').setAttribute('aria-pressed',v==='L');drawTb()}));
  drawTb();

  /* ---- IST-3 ---- */
  const oh=$('#lyOhSvg');
  function drawOh(){const N=vb(oh,'720 210','400 210'),w=N?376:692,x=N?12:14;let s='';
    LY_OHS.forEach((r,i)=>{const y=52+i*76;s+=`<text x="${x}" y="${y-22}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.l}</text>`+mrsStack(x,y,w,30,r.d,{fmt:v=>v}).svg});
    s+=`<text x="${x}" y="${N?196:196}" class="t-xs" style="fill:var(--ink)">Numbers above bars: score. Rightmost segment: dead (27% in each group).</text>`;
    oh.innerHTML=s}
  drawOh();

  /* ---- bleeding views ---- */
  const bl=$('#lyBlSvg');let blI=0;
  function drawBl(){const D=LY_BL[blI],H=lyPairH(D.rows)+6;const N=vb(bl,`720 ${H}`,`400 ${H}`);
    bl.innerHTML=lyPair(N?8:14,4,N?384:692,D.title,D.rows,D.arms,{max:D.max});$('#lyBlNote').innerHTML=D.note}
  [0,1,2].forEach(i=>$('#lyBl'+i).addEventListener('click',()=>{blI=i;[0,1,2].forEach(k=>$('#lyBl'+k).setAttribute('aria-pressed',k===i));drawBl()}));
  drawBl();

  /* ---- trial explorers ---- */
  function lyExplorer(P,D){const sv=$('#'+P+'Svg'),bt=$('#'+P+'Btns'),no=$('#'+P+'Note');let cur=0;
    bt.innerHTML=D.map((d,i)=>`<button class="btn" data-i="${i}" aria-pressed="${i===0}">${d.n}</button>`).join('');
    function dr(){const d=D[cur],H=lyPairH(d.rows)+6,N=vb(sv,`720 ${H}`,`400 ${H}`);
      sv.innerHTML=lyPair(N?8:14,4,N?384:692,d.n,d.rows,d.arms);
      no.innerHTML=`<div class="kicker">${d.k}</div><h4>${d.n}</h4><p><b>${d.v}.</b></p><p>${d.txt}</p>`}
    bt.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;cur=+b.dataset.i;$$('[data-i]',bt).forEach((q,k)=>q.setAttribute('aria-pressed',k===cur));dr()});
    dr();return dr}
  const drT=lyExplorer('lyTnk',LY_TNK),drE=lyExplorer('lyExt',LY_EXT);

  /* ---- windows ---- */
  const wn=$('#lyWnSvg');
  function drawWn(){const N=NARROW(),pitch=N?38:27,top=N?46:44,H=top+LY_WIN.length*pitch+34;vb(wn,`720 ${H}`,`400 ${H}`);
    const x0=N?16:292,x1=N?384:700,X=v=>x0+(x1-x0)*v/24;let s='';
    /* a key, drawn directly in words */
    let kx=N?16:292;Object.keys(LY_KIND).forEach(k=>{s+=`<rect x="${kx}" y="8" width="12" height="12" rx="2" style="fill:${LY_KIND[k][0]}"/><text x="${kx+16}" y="18" class="t-xs" style="fill:var(--ink)">${LY_KIND[k][1]}</text>`;kx+=k==='guide'?0:70});
    [0,3,4.5,9,16,24].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-6}" y2="${top+LY_WIN.length*pitch}" style="stroke:var(--line);stroke-width:1"/><text x="${f1(X(v))}" y="${top-10}" class="t-xs t-mid" style="fill:var(--ink)">${v}</text>`});
    LY_WIN.forEach((r,i)=>{const y=top+i*pitch,col=LY_KIND[r.kind][0],by=N?y+16:y+6;
      s+=N?kitLabel(x0,y+11,r.l):`<text x="${x0-10}" y="${y+16}" class="t-xs t-end" style="fill:var(--ink)">${r.l}</text>`;
      const bw=X(r.b)-X(r.a);
      s+=r.dash?`<rect x="${f1(X(r.a))}" y="${by}" width="${f1(bw)}" height="14" rx="3" style="fill:none;stroke:${col};stroke-width:2;stroke-dasharray:4 3"/>`:`<rect x="${f1(X(r.a))}" y="${by}" width="${f1(bw)}" height="14" rx="3" style="fill:${col}"/>`});
    s+=`<text x="${x1}" y="${top+LY_WIN.length*pitch+18}" class="t-xs t-end" style="fill:var(--ink)">hours</text>`;
    wn.innerHTML=s}
  drawWn();

  const prev=redraws.lysis;redraws.lysis=()=>{prev&&prev();drawTb();drawOh();drawBl();drT();drE();drawWn()};
};
