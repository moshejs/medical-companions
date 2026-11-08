/* =============== 4.1 Risk factors and prevention =============== */
/* Widgets: the INTERSTROKE adder (main scrubber), a forest-plot explorer of blood pressure and lipid trials,
   a one-cigarette curve, and the salt substitute bars. pvForest is also used by modules af and carotid. */
const PV_F=[
 {id:'htn',l:'Hypertension',par:47.9},{id:'act',l:'Physical activity',par:35.8},{id:'apo',l:'ApoB/ApoA1 ratio',par:26.8},
 {id:'diet',l:'Diet (mAHEI)',par:23.2},{id:'whr',l:'Waist-to-hip ratio',par:18.6},{id:'psy',l:'Psychosocial',par:17.4},
 {id:'smk',l:'Current smoking',par:12.4},{id:'car',l:'Cardiac causes',par:9.1},{id:'alc',l:'Alcohol',par:5.8},{id:'dm',l:'Diabetes',par:3.9}];
const PV_STEPS=[
 {from:0,at:.07,k:'Step 1 · one factor',t:'Hypertension alone',
  txt:'INTERSTROKE was a standardised case-control study in 32 countries from 2007 to 2015: 13 447 people with an acute first stroke and 13 472 controls. Hypertension (a history of it, or a reading of 140/90 mm Hg or higher) had an odds ratio of 2.98 and the largest population attributable risk (PAR), 47.9% [[ODonnell2016]].',
  pt:'Most strokes are linked to things that can be changed, and high blood pressure is the biggest one [[ODonnell2016,Feigin2024]].',
  hook:'INTERSTROKE: ten factors, about 90% of PAR, with hypertension the largest at 47.9% [[ODonnell2016]].'},
 {from:.14,at:.26,k:'Step 2 · adding bars',t:'The bars pass 100%',
  txt:'Each PAR answers one question: what share of strokes is statistically linked to this factor, taken on its own? One person can have several factors, so the same stroke is counted under each of them. That is why three factors already add to more than 100% [[ODonnell2016]].',
  pt:'These bars overlap. One stroke can be linked to high blood pressure and to smoking at the same time. So you cannot simply add them up.'},
 {from:.5,at:.8,k:'Step 3 · all ten',t:'A simple sum of 200.9%',
  txt:'Add all ten published PARs and you get 200.9% (summed here, not a published figure). No real share can pass 100%, so the sum has no meaning. Switch factors off above the chart and watch both bars change. The lower bar combines them as 1 minus the product of (1 minus each PAR). This is a teaching estimate computed on this page and it assumes the factors act independently, which they do not fully.',
  hook:'Population attributable fractions do not add. Combined, they must stay below 100%.'},
 {from:.84,at:.95,k:'Step 4 · the joint figure',t:'Together: 90.7%',
  txt:'The figure INTERSTROKE did publish for all ten together is 90.7% for all stroke: 91.5% for ischaemic stroke (ischemic in US spelling) and 87.1% for intracerebral haemorrhage. It ranged from 82.7% in Africa to 97.4% in southeast Asia. It was 90.6% in both men and women, 92.2% at age 55 or under and 90.0% above 55 [[ODonnell2016]].',
  pt:'About 9 in 10 strokes in this study were linked to these ten factors. That is a figure about populations. It does not say why any one person had a stroke.'}];
/* a forest plot on a log axis: rows {l,txt,v,lo,hi}. Wide: label | plot | value. Narrow: label above, plot, value. */
function pvForest(y,rows,o){const N=o.N,mn=o.min||.14,mx=o.max||2.2,ax0=N?12:(o.ax0||238),axW=N?(o.axWN||232):(o.axW||320),vx=N?ax0+axW+8:ax0+axW+10,rh=N?46:(o.rh||26),n=rows.length,p=o.p==null?1:o.p;
  const X=v=>ax0+axW*Math.log(v/mn)/Math.log(mx/mn),yEnd=y+rh*n;let s='';
  (o.ticks||[.25,.5,1,2]).forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y-4)}" y2="${f1(yEnd)}" ${v===1?'style="stroke:var(--ink);stroke-width:1.2"':'class="grid"'}/><text x="${f1(x)}" y="${f1(yEnd+14)}" class="t-xs t-mid">${v}</text>`});
  s+=`<text x="${f1(X(1)-6)}" y="${f1(yEnd+28)}" class="t-xs t-end">${o.lo||'lower with treatment'}</text><text x="${f1(X(1)+6)}" y="${f1(yEnd+28)}" class="t-xs">${o.hi||'higher'}</text>`;
  rows.forEach((r,i)=>{const yy=y+i*rh,q=clamp(p*n-i*.92),on=o.sel===i,cy=N?yy+29:yy+rh/2,lo=lerp(r.v,r.lo,ease(q)),hi=lerp(r.v,r.hi,ease(q));
    s+=`<g ${o.attr||'data-fr'}="${i}" class="clk" tabindex="0" role="button" aria-pressed="${on}" aria-label="${r.l}: ${r.txt}">`;
    s+=`<rect x="4" y="${f1(yy+1)}" width="${o.W-8}" height="${rh-2}" rx="5" style="fill:${on?'var(--prev-soft)':'var(--panel)'};opacity:${on?1:0}"/>`;
    s+=`<text x="10" y="${f1(N?yy+14:yy+rh/2+4)}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:${on?'var(--prev-soft)':'var(--panel)'};stroke-width:3px${on?';font-weight:700':''}">${r.l}</text>`;
    if(q>0){s+=`<line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${f1(cy)}" y2="${f1(cy)}" style="stroke:var(--prev);stroke-width:2"/>`;
      const z=N?4.5:5;s+=`<rect x="${f1(X(r.v)-z)}" y="${f1(cy-z)}" width="${2*z}" height="${2*z}" transform="rotate(45 ${f1(X(r.v))} ${f1(cy)})" style="fill:${r.obs?'var(--panel)':'var(--prev)'};stroke:var(--prev);stroke-width:1.6;opacity:${f1(clamp(q*2))}"/>`;
      s+=`<text x="${f1(vx)}" y="${f1(cy+3.5)}" class="t-sm" style="opacity:${f1(clamp(q*2))};fill:var(--ink)">${r.txt}</text>`}
    s+='</g>'});
  return {svg:s,h:yEnd+30,X}}
/* wire delegated click and keyboard on an svg's focusable rows; keeps focus through a redraw */
function pvRows(svg,attr,pick){const hit=e=>e.target.closest('['+attr+']');
  svg.addEventListener('click',e=>{const g=hit(e);if(g)pick(+g.getAttribute(attr))});
  svg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=hit(e);if(!g)return;e.preventDefault();const v=g.getAttribute(attr);pick(+v);const f=svg.querySelector('['+attr+'="'+v+'"]');f&&f.focus()})}
const PV_TR={bp:{name:'Blood pressure',rows:[
  {l:'Meta-analysis: per 10 mm Hg, stroke',txt:'RR 0.73 (0.68 to 0.77)',v:.73,lo:.68,hi:.77,k:'123 studies',t:'Each 10 mm Hg',d:'In 123 studies and 613 815 participants, a 10 mm Hg reduction in systolic BP reduced stroke by 27%. Coronary disease RR was 0.83 and heart failure RR 0.72. Calcium channel blockers were superior to other drugs for preventing stroke and beta blockers inferior [[Ettehad2016]].'},
  {l:'BPLTTC: per 5 mm Hg, MACE, no prior CVD',txt:'HR 0.91 (0.89 to 0.94)',v:.91,lo:.89,hi:.94,k:'344 716 people',t:'Also at normal BP',d:'Each 5 mm Hg lower systolic BP reduced major cardiovascular events by about 10%, without previous cardiovascular disease (HR 0.91) and with it (HR 0.89), including at normal or high-normal BP [[BPLTTC2021Levels]]. Relative benefit held to age 84. At 85 and over the HR was 0.99 (0.87 to 1.12) [[BPLTTC2021Age]].'},
  {l:'BPLTTC: per 5 mm Hg, MACE, prior CVD',txt:'HR 0.89 (0.86 to 0.92)',v:.89,lo:.86,hi:.92,k:'344 716 people',t:'With previous cardiovascular disease',d:'The same analysis in people with previous cardiovascular disease: HR 0.89 (0.86 to 0.92) per 5 mm Hg [[BPLTTC2021Levels]].'},
  {l:'PROGRESS: stroke, whole trial',txt:'RRR 28% (17 to 38)',v:.72,lo:.62,hi:.83,k:'6105 people, prior stroke or TIA',t:'Perindopril-based regimen',d:'BP fell by 9/4 mm Hg over 4 years. Stroke occurred in 10% vs 14%, in hypertensive and non-hypertensive subgroups alike [[PROGRESS2001]]. The plot converts the reported relative risk reduction to a ratio (1 minus RRR).'},
  {l:'PROGRESS: stroke, two drugs',txt:'RRR 43% (30 to 54)',v:.57,lo:.46,hi:.70,k:'Combination',t:'Perindopril plus indapamide',d:'BP fell by 12/5 mm Hg and stroke by 43%. Single-drug therapy lowered BP by 5/3 mm Hg with no discernible reduction in stroke [[PROGRESS2001]].'},
  {l:'SPS3: below 130, all stroke',txt:'HR 0.81 (0.64 to 1.03)',v:.81,lo:.64,hi:1.03,k:'3020 people, lacunar stroke',t:'Not significant for all stroke',d:'Systolic target below 130 vs 130 to 149 mm Hg (achieved 127 vs 138 at 1 year). All stroke was not significantly reduced [[Benavente2013]].'},
  {l:'SPS3: below 130, ICH',txt:'HR 0.37 (0.15 to 0.95)',v:.37,lo:.15,hi:.95,k:'Same trial',t:'Fewer intracerebral haemorrhages',d:'Intracerebral haemorrhage fell, HR 0.37 (0.15 to 0.95) [[Benavente2013]].'},
  {l:'RESPECT: below 120/80, stroke',txt:'HR 0.73 (0.49 to 1.11)',v:.73,lo:.49,hi:1.11,k:'1263 people, Japan',t:'Not significant alone',d:'Below 120/80 vs below 140/90 mm Hg (achieved 126.7/77.4 vs 133.2/77.7). Recurrent stroke was not significantly reduced on its own [[Kitagawa2019]].'},
  {l:'RESPECT pooled, 4 trials: stroke',txt:'RR 0.78 (0.64 to 0.96)',v:.78,lo:.64,hi:.96,k:'Pooled',t:'Pooled with 3 earlier trials',d:'Absolute difference 1.5%, NNT 67. The authors concluded this supports a target below 130/80 mm Hg [[Kitagawa2019]].'},
  {l:'ESPRIT: below 120, composite',txt:'HR 0.88 (0.78 to 0.99)',v:.88,lo:.78,hi:.99,k:'11 255 people, China',t:'High cardiovascular risk',d:'3022 had a previous stroke. Target below 120 vs below 140 mm Hg (achieved 119.1 vs 134.8). Composite 9.7% vs 11.1%, with no heterogeneity by history of stroke. Serious syncope 0.4% vs 0.1% [[Liu2024]].'},
  {l:'BPROAD: below 120, composite',txt:'HR 0.79 (0.69 to 0.90)',v:.79,lo:.69,hi:.90,k:'12 821 people, China',t:'Type 2 diabetes',d:'Primary composite 1.65 vs 2.09 events per 100 person-years. Symptomatic hypotension and hyperkalaemia were more frequent [[Bi2025]].'}]},
 lip:{name:'Lipids',rows:[
  {l:'SPARCL: atorvastatin 80, stroke',txt:'HR 0.84 (0.71 to 0.99)',v:.84,lo:.71,hi:.99,k:'4731 people',t:'Fewer strokes, more bleeds',d:'1 to 6 months after stroke or TIA, no known coronary disease. Mean LDL 73 vs 129 mg/dL. Stroke 11.2% vs 13.1% over a median 4.9 years (5-year absolute reduction 2.2%). The trade-off: 218 vs 274 ischaemic strokes and 55 vs 33 haemorrhagic strokes. Overall mortality was similar [[Amarenco2006]].'},
  {l:'Treat Stroke to Target: events',txt:'HR 0.78 (0.61 to 0.98)',v:.78,lo:.61,hi:.98,k:'2860 people',t:'LDL below 70 mg/dL',d:'Recent ischaemic stroke or TIA with atherosclerosis. LDL below 70 mg/dL (1.8 mmol/L) vs 90 to 110 mg/dL, achieved 65 vs 96 mg/dL. Events 8.5% vs 10.9%. Intracranial haemorrhage did not differ significantly. The trial stopped early with 277 of 385 planned events [[Amarenco2020]].'},
  {l:'CTT: intensive statin, ischaemic',txt:'RRR 16% (5 to 26)',v:.84,lo:.74,hi:.95,k:'Meta-analysis',t:'More vs less intensive statin',d:'More intensive regimens reduced ischaemic stroke by 16% (5 to 26) compared with less intensive regimens [[CTT2010]]. The plot converts this to a ratio (1 minus RRR).'},
  {l:'IMPROVE-IT: ischaemic stroke',txt:'HR 0.79 (0.67 to 0.94)',v:.79,lo:.67,hi:.94,k:'Ezetimibe plus simvastatin',t:'After acute coronary syndrome',d:'Ischaemic stroke 3.4% vs 4.1% [[Bohula2017]].'},
  {l:'IMPROVE-IT: haemorrhagic stroke',txt:'HR 1.38 (0.93 to 2.04)',v:1.38,lo:.93,hi:2.04,k:'Same trial',t:'Not significantly increased',d:'Haemorrhagic stroke 0.8% vs 0.6% [[Bohula2017]].'},
  {l:'IMPROVE-IT, prior stroke: any stroke',txt:'HR 0.60 (0.38 to 0.95)',v:.60,lo:.38,hi:.95,k:'Prior-stroke subgroup',t:'Large gain after a stroke',d:'Any stroke 10.2% vs 18.8%, NNT 12 [[Bohula2017]].'},
  {l:'FOURIER: all stroke',txt:'HR 0.79 (0.66 to 0.95)',v:.79,lo:.66,hi:.95,k:'Evolocumab on a statin',t:'PCSK9 antibody',d:'LDL fell by 59% to a median of 30 mg/dL (0.78 mmol/L); primary endpoint HR 0.85 (0.79 to 0.92) [[Sabatine2017FOURIER]]. All stroke 1.5% vs 1.9% [[Giugliano2020]].'},
  {l:'FOURIER: ischaemic stroke',txt:'HR 0.75 (0.62 to 0.92)',v:.75,lo:.62,hi:.92,k:'Same trial',t:'Ischaemic stroke',d:'Ischaemic stroke HR 0.75 (0.62 to 0.92) [[Giugliano2020]].'},
  {l:'FOURIER: haemorrhagic stroke',txt:'HR 1.16 (0.68 to 1.98)',v:1.16,lo:.68,hi:1.98,k:'Same trial',t:'No clear excess',d:'Haemorrhagic stroke 0.21% vs 0.18% [[Giugliano2020]].'},
  {l:'FOURIER, prior stroke: all stroke',txt:'HR 0.90 (0.68 to 1.19)',v:.90,lo:.68,hi:1.19,k:'5337 with prior ischaemic stroke',t:'No significant interaction',d:'The confidence interval crosses 1 in this subgroup, with no significant interaction [[Giugliano2020]].'},
  {l:'FOURIER-OLE, LDL below 40: stroke',txt:'RR 0.73 (0.53 to 0.99)',v:.73,lo:.53,hi:.99,obs:1,k:'Observational within a trial',t:'Lower achieved LDL',d:'<span class="ev early">Early evidence</span> In 5291 people with prior ischaemic stroke, risk fell monotonically with achieved LDL-C. Below 40 vs 70 mg/dL or higher, rate ratios were 0.69 (0.57 to 0.84) for the primary endpoint and 0.73 for all stroke. Haemorrhagic strokes were unrelated to achieved LDL-C [[Monguillon2026]]. The open marker means this comparison was not randomised.'}]}};
const PV_SMK={m:{n:'Men',one:1.25,tw:1.64,sh:41},f:{n:'Women',one:1.31,tw:2.16,sh:34}};
const PV_SALT=[{l:'Stroke',a:29.14,b:33.65,r:'rate ratio 0.86 (0.77 to 0.96)'},{l:'Death',a:39.28,b:44.61,r:'rate ratio 0.88'},{l:'Serious hyperkalaemia',a:3.35,b:3.30,r:'rate ratio 1.04, not significantly higher'}];
inits.prevent=()=>{
  /* ---------- the adder ---------- */
  const svg=$('#pvSvg'),rg=$('#pvT'),sel=new Set(PV_F.map(f=>f.id));
  function draw(t){const N=vb(svg,'720 392','400 392'),W=N?400:720,x0=N?118:166,sw=N?272:536,X=v=>x0+sw*v/210,rh=24,y0=48;
    const on=PV_F.filter(f=>sel.has(f.id)),n=on.length,reach=t/.8;let cum=0,prod=1,s='';
    const yEnd=y0+rh*10;
    /* the impossible zone and axis */
    s+=`<rect x="${f1(X(100))}" y="${y0-6}" width="${f1(X(210)-X(100))}" height="${yEnd-y0+90}" style="fill:var(--bad-soft)"/>`;
    s+=`<text x="${f1(X(210))}" y="16" class="t-sm t-end" style="fill:var(--bad);font-weight:700">above 100%: impossible</text>`;
    [0,50,100,150,200].forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y0-6}" y2="${yEnd+84}" ${v===100?'style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:5 4"':'class="grid"'}/><text x="${f1(x)}" y="36" class="t-xs t-mid">${v}%</text>`});
    s+=`<text x="8" y="36" class="t-xs">PAR, all stroke</text>`;
    const segs=[];
    PV_F.forEach((f,i)=>{const y=y0+i*rh,isOn=sel.has(f.id);
      s+=`<text x="8" y="${y+15}" class="t-sm" style="fill:${isOn?'var(--ink)':'var(--muted)'};opacity:${isOn?1:.6}${isOn?'':';text-decoration:line-through'}">${f.l}</text>`;
      if(!isOn)return;
      const k=on.indexOf(f),q=ease(clamp(reach*n-k)),w=f.par*q;
      if(q>0){const a=X(cum),b=X(cum+w),farRight=cum+f.par>150;
        s+=`<rect x="${f1(a)}" y="${y+4}" width="${f1(Math.max(.5,b-a))}" height="15" rx="2" style="fill:var(--prev);opacity:${k%2?.62:.95}"/>`;
        s+=`<text x="${f1(farRight?a-4:b+4)}" y="${y+15}" class="t-sm${farRight?' t-end':''}" style="fill:var(--ink);opacity:${f1(clamp(q*2))};paint-order:stroke;stroke:var(--panel);stroke-width:3px">${f.par.toFixed(1)}%</text>`;
        if(k>0)s+=`<line x1="${f1(a)}" x2="${f1(a)}" y1="${y-rh+19}" y2="${y+4}" style="stroke:var(--prev);stroke-width:1;stroke-dasharray:2 2"/>`;
        segs.push([cum,w,k]);cum+=w;prod*=1-w/100}});
    /* stacked sum */
    const ys=yEnd+14,yc=yEnd+54,fin=clamp(ramp(t,.8,.84));
    s+=`<text x="8" y="${ys+22}" class="t-lbl">Added up</text><text x="${x0}" y="${ys+4}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">simple sum ${cum.toFixed(1)}%${cum>100?': no real meaning':''}</text>`;
    segs.forEach(([a,w,k])=>{s+=`<rect x="${f1(X(a))}" y="${ys+9}" width="${f1(Math.max(.5,X(a+w)-X(a)))}" height="15" style="fill:var(--prev);opacity:${k%2?.62:.95};stroke:var(--panel);stroke-width:.8"/>`});
    /* combined */
    const est=(1-prod)*100,all=n===10&&fin>0;
    s+=`<text x="8" y="${yc+22}" class="t-lbl">Combined</text><text x="${N?8:x0}" y="${yc+4}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">teaching estimate ${est.toFixed(1)}%${all?'; published for all ten 90.7%':''}</text>`;
    s+=`<rect x="${f1(X(0))}" y="${yc+9}" width="${f1(X(est)-X(0))}" height="15" rx="2" style="fill:var(--salvage)"/>`;
    if(all)s+=`<line x1="${f1(X(90.7))}" x2="${f1(X(90.7))}" y1="${yc+6}" y2="${yc+27}" style="stroke:var(--ink);stroke-width:2.4"/>`;
    if(!n)s+=`<text x="${f1(W/2)}" y="${y0+120}" class="t-lbl t-mid">Switch on at least one factor above.</text>`;
    svg.innerHTML=s;
    const p=phaseOf(PV_STEPS,t);setSt(p);$('#pvNote').innerHTML=noteHTML(PV_STEPS[p])}
  const stop=playWire(rg,$('#pvPlay'),draw,16000,'Replay','prevent');
  const setSt=stepWire($('#pvSteps'),PV_STEPS,rg,draw,stop);
  const paint=()=>$$('[data-pvf]').forEach(b=>b.setAttribute('aria-pressed',sel.has(b.dataset.pvf)));
  $('#pvToggles').innerHTML=PV_F.map(f=>`<button class="btn" data-pvf="${f.id}" aria-pressed="true">${f.l}</button>`).join('');
  $('#pvToggles').addEventListener('click',e=>{const b=e.target.closest('[data-pvf]');if(!b)return;stop();sel.has(b.dataset.pvf)?sel.delete(b.dataset.pvf):sel.add(b.dataset.pvf);paint();if(+rg.value<.82)rg.value=.81;draw(+rg.value)});
  $('#pvAll').addEventListener('click',()=>{stop();PV_F.forEach(f=>sel.add(f.id));paint();draw(+rg.value)});
  draw(+rg.value);

  /* ---------- trials explorer ---------- */
  const fs=$('#pvFor'),frg=$('#pvForT');let fk='bp',fi=0;
  function drawFor(t){const N=vb(fs,'720 348','400 560'),D=PV_TR[fk],W=N?400:720;
    const F=pvForest(N?18:18,D.rows,{N,W,p:t/.9,sel:fi,rh:26});
    let s=`<text x="${N?10:238}" y="11" class="t-xs">ratio, log scale. Diamond = estimate, line = 95% CI</text>`+F.svg;
    fs.innerHTML=s;
    const r=D.rows[fi];$('#pvForNote').innerHTML=`<div class="kicker">${D.name} · ${r.k}</div><h4>${r.t}</h4><p>${r.d}</p>`}
  const fstop=playWire(frg,$('#pvForPlay'),drawFor,8000,'Replay','prevent');
  pvRows(fs,'data-fr',i=>{fstop();fi=i;drawFor(+frg.value)});
  $$('[data-pvt]').forEach(b=>b.addEventListener('click',()=>{fstop();fk=b.dataset.pvt;fi=0;$$('[data-pvt]').forEach(c=>c.setAttribute('aria-pressed',c===b));frg.value=0;$('#pvForPlay').click()}));
  drawFor(+frg.value);

  /* ---------- one cigarette ---------- */
  const sm=$('#pvSmk'),srg=$('#pvSmkT');let sk='m';
  function drawSmk(t){const N=vb(sm,'720 300','400 470'),D=PV_SMK[sk],L=N?{x:44,y:24,w:330,h:220,bx:16,by:320,bw:368}:{x:52,y:24,w:360,h:220,bx:452,by:70,bw:250};
    const f=monoFn([ [0,1],[1,D.one],[20,D.tw] ]),up=20*t,C=curve(L.x,L.y,L.w,L.h,f,{x0:0,x1:20,y0:1,y1:2.3,upto:up,col:'var(--prev)',dot:true});
    let s=C.svg;
    [1,1.5,2].forEach(v=>{s+=`<text x="${L.x-6}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text><line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(C.Y(v))}" y2="${f1(C.Y(v))}" class="grid"/>`});
    [0,1,10,20].forEach(v=>{s+=`<text x="${f1(C.X(v))}" y="${L.y+L.h+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${L.x+L.w}" y="${L.y+L.h+28}" class="t-xs t-end">cigarettes a day</text><text x="${L.x}" y="${L.y-8}" class="t-xs">relative risk of stroke</text>`;
    if(up>=1)s+=`<text x="${f1(C.X(1)+12)}" y="${f1(C.Y(D.one)+18)}" class="t-sm" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--field);stroke-width:3px">1 a day: RR ${D.one.toFixed(2)}</text>`;
    if(up>=19.8)s+=`<text x="${f1(C.X(20)-10)}" y="${f1(C.Y(D.tw)-10)}" class="t-sm t-end" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--field);stroke-width:3px">20 a day: RR ${D.tw.toFixed(2)}</text>`;
    const q=ease(ramp(t,.08,.5));
    s+=`<text x="${L.bx}" y="${L.by-26}" class="t-lbl">${D.n}: one a day carries</text><text x="${L.bx}" y="${L.by+2}" class="t-big" style="font-size:26px">${Math.round(D.sh*q)}%</text><text x="${L.bx+56}" y="${L.by+1}" class="t-sm">of the excess risk of 20 a day</text>`;
    s+=`<rect x="${L.bx}" y="${L.by+12}" width="${L.bw}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${L.by+12}" width="${f1(L.bw*D.sh/100*q)}" height="16" rx="4" style="fill:var(--prev)"/>`;
    s+=`<text x="${L.bx}" y="${L.by+46}" class="t-xs">1 cigarette is 5% of 20 cigarettes,</text><text x="${L.bx}" y="${L.by+60}" class="t-xs">but far more than 5% of the excess risk.</text>`;
    sm.innerHTML=s}
  const sstop=playWire(srg,$('#pvSmkPlay'),drawSmk,7000,'Replay','prevent');
  $$('[data-pvs]').forEach(b=>b.addEventListener('click',()=>{sstop();sk=b.dataset.pvs;$$('[data-pvs]').forEach(c=>c.setAttribute('aria-pressed',c===b));drawSmk(+srg.value)}));
  drawSmk(+srg.value);

  /* ---------- salt substitute ---------- */
  const sa=$('#pvSalt');let saStop=null;
  function drawSalt(p){const N=vb(sa,'720 216','400 324'),x0=N?12:190,bw=N?300:430,rh=N?104:66,mx=50,X=v=>bw*v/mx;let s='';
    PV_SALT.forEach((r,i)=>{const y=(N?8:12)+i*rh,q=ease(clamp(p*1.3-i*.15));
      if(N)s+=`<text x="${x0}" y="${y+10}" class="t-lbl">${r.l}</text><text x="${x0}" y="${y+24}" class="t-xs">${r.r}</text>`;
      else s+=`<text x="${x0-12}" y="${y+18}" class="t-lbl t-end">${r.l}</text>`;
      const y1=N?y+32:y+2,y2=y1+22;
      s+=`<rect x="${x0}" y="${y1}" width="${f1(X(r.a)*q)}" height="18" rx="3" style="fill:var(--salvage)"/><rect x="${x0}" y="${y2}" width="${f1(X(r.b)*q)}" height="18" rx="3" style="fill:var(--device)"/>`;
      s+=`<text x="${f1(x0+X(r.a)*q+6)}" y="${y1+13}" class="t-xs" style="fill:var(--ink)">substitute ${r.a.toFixed(2)}</text><text x="${f1(x0+X(r.b)*q+6)}" y="${y2+13}" class="t-xs" style="fill:var(--ink)">regular salt ${r.b.toFixed(2)}</text>`;
      if(!N)s+=`<text x="${x0-12}" y="${y+32}" class="t-xs t-end">${r.r.replace(', not significantly higher','')}</text>`});
    sa.innerHTML=s}
  $('#pvSaltPlay').addEventListener('click',()=>{if(saStop)saStop();saStop=animate(1100,drawSalt,()=>{saStop=null})});
  drawSalt(1);
  const pr=redraws.prevent;redraws.prevent=()=>{pr&&pr();drawSalt(1)};
};
