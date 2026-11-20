/* =============== 3.2 Thrombectomy =============== */
/* Main player: kit catheterStent beside kit brainSide (MCA occlusion, then reperfusion, penumbra saved).
   Widgets: dumbbell trial explorer by category, HERMES forest, mRS bars (only SWIFT PRIME and TIMELESS have verified
   per-category data), delay curve with published anchors, TICI grades, and an access icon block. */
const EV_STEPS=[
 {from:0,at:.08,k:'Step 1 · the blockage',t:'A large artery is blocked',
  txt:'A clot sits in the first part of the middle cerebral artery (M1). Everything beyond it goes pale. Tissue with no flow dies (the core, red), and a wider rim is at risk (the penumbra, amber).',
  pt:'Thrombectomy is for clots in larger arteries [[Goyal2016,Saver2015,Balami2018]]. A drug alone often does not open them: in EXTEND-IA TNK, 22% with tenecteplase and 10% with alteplase had reperfused by the first angiogram [[Campbell2018]].'},
 {from:.2,at:.3,k:'Step 2 · the route',t:'A catheter travels up',
  txt:'A doctor passes a thin tube up an artery, often from the groin [[Goyal2016,Saver2015,Balami2018]]. In SWIFT PRIME the median time from imaging to puncture was 57 minutes; in ESCAPE, CT to reperfusion had a median of 84 minutes [[Saver2015,Goyal2015]].',
  hook:'In HERMES, median onset to puncture was 238 minutes and onset to reperfusion 286 minutes [[Saver2016]].'},
 {from:.4,at:.52,k:'Step 3 · the stent opens',t:'The mesh opens through the clot',
  txt:'In this schematic a thin sheath crosses the clot and pulls back, and a mesh opens through the clot. In MR CLEAN 81.5% were treated with stent retrievers [[Berkhemer2015]]. First-line contact aspiration is the alternative: in ASTER, successful revascularisation was 85.4% versus 83.1% with a stent retriever [[Lapergue2017]].'},
 {from:.62,at:.72,k:'Step 4 · retrieval',t:'The clot comes out',
  txt:'The mesh draws the clot back into the catheter and out of the body. SWIFT PRIME reported 88% substantial reperfusion [[Saver2015]]. In clinical practice it was 85.9% [[Jahan2019]].',
  hook:'mTICI 2b means more than half of the territory reperfused [[Zaidat2013]].'},
 {from:.82,at:.96,k:'Step 5 · reperfusion',t:'Flow returns, tissue is saved',
  txt:'Blood reaches the branches again. Tissue in the penumbra can be saved, but the core does not come back. In HERMES the adjusted common odds ratio for reduced disability was 2.49 (95% CI 1.76 to 3.53), with an NNT of 2.6 for at least a one-level mRS improvement [[Goyal2016]].',
  pt:'For every 3 or so people who have thrombectomy, about one is left with less disability [[Goyal2016]].'}];
const EV_STATE=['no flow past the clot','catheter on its way','mesh open: some flow returns','pulling the clot back','artery open'];

/* every number below is from the research pass; nnt strings are derived there and flagged in the UI */
const EV_CATS=[
 {id:'early',t:'Early window',trials:[
  {id:'herm',n:'HERMES pool',txt:'common OR 2.49 (1.76 to 3.53); NNT 2.6 as published',k:'5 trials · 1287 people',
   d:'Individual patient data from the five 2015 trials. Subgroups: age 80 or over cOR 3.68 (1.95 to 6.92); randomised after 300 minutes 1.76 (1.05 to 2.97); not eligible for alteplase 2.43 (1.30 to 4.55). 90-day mortality and symptomatic haemorrhage did not differ [[Goyal2016]].'},
  {id:'mrc',n:'MR CLEAN',o:'mRS 0-2',a:32.6,b:19.1,nnt:'about 7',k:'Netherlands · 500 people · within 6 hours',
   d:'89.0% had alteplase, 81.5% stent retrievers. Common OR 1.67 (1.21 to 2.30); difference 13.5 points (5.9 to 21.2) [[Berkhemer2015]].'},
  {id:'esc',n:'ESCAPE',o:'mRS 0-2',a:53.0,b:29.3,nnt:'about 4',k:'316 people · up to 12 hours · stopped early',
   d:'Small core and good collaterals, CT to reperfusion median 84 minutes. Common OR 2.6 (1.7 to 3.8). Mortality 10.4% versus 19.0% (P=0.04); symptomatic haemorrhage 3.6% versus 2.7% [[Goyal2015]].'},
  {id:'exi',n:'EXTEND-IA',o:'mRS 0-2',a:71,b:40,nnt:'about 3',k:'70 people · stopped early',
   d:'Core under 70 ml on CT perfusion. Reperfusion at 24 hours median 100% versus 37%; early improvement 80% versus 37% [[Campbell2015]].'},
  {id:'swi',n:'SWIFT PRIME',o:'mRS 0-2',a:60,b:35,nnt:'4',k:'196 people · within 6 hours · stopped early',
   d:'Imaging to puncture median 57 minutes, 88% substantial reperfusion. Mortality 9% versus 12%; symptomatic haemorrhage 0% versus 3% [[Saver2015]].'},
  {id:'rev',n:'REVASCAT',o:'mRS 0-2',a:43.7,b:28.2,nnt:'about 6.5',k:'206 people · within 8 hours',
   d:'Adjusted OR for 1-point improvement 1.7 (1.05 to 2.8). Symptomatic haemorrhage 1.9% each; death 18.4% versus 15.5% [[Jovin2015]].'}]},
 {id:'late',t:'Late window',trials:[
  {id:'daw',n:'DAWN',o:'mRS 0-2',a:49,b:13,nnt:'about 3',k:'206 people · 6 to 24 hours',
   d:'Clinical-core mismatch by age under or over 80. Utility-weighted mRS 5.5 versus 3.4 (adjusted difference 2.0, 1.1 to 3.0). Symptomatic haemorrhage 6% versus 3%; mortality 19% versus 18% [[Nogueira2018]].'},
  {id:'def',n:'DEFUSE 3',o:'mRS 0-2',a:45,b:17,nnt:'about 3.6',k:'182 people · 6 to 16 hours · 38 US centres',
   d:'Core under 70 ml, mismatch ratio 1.8 or more. Common OR 2.77 (1.63 to 4.70); median mRS 3 versus 4. Reperfusion above 90% at 24 hours 79% versus 18%. Mortality 14% versus 26% (P=0.05); symptomatic haemorrhage 7% versus 4% [[Albers2018]].'},
  {id:'lat',n:'LATE-MT',txt:'common OR 1.74 (1.19 to 2.55)',k:'China · 336 people · 24 to 72 hours',ev:1,
   d:'Median 38.5 hours, salvageable tissue on imaging. Symptomatic haemorrhage 4.8% versus 0. Deaths 6.0% versus 1.8%. A single trial, not yet reflected in the 2026 guideline [[Yang2026]].'}]},
 {id:'core',t:'Large core',trials:[
  {id:'res',n:'RESCUE-Japan LIMIT',o:'mRS 0-3',a:31.0,b:12.7,k:'203 people · ASPECTS 3 to 5',
   d:'RR 2.43 (1.35 to 4.37). Any intracranial haemorrhage 58.0% versus 31.4% [[Yoshimura2022]].'},
  {id:'sel',n:'SELECT2',o:'mRS 0-2',a:20,b:7,k:'352 people · within 24 hours',
   d:'ASPECTS 3 to 5 or core 50 ml or more. Generalised OR 1.51 (1.20 to 1.89); RR 2.97 (1.60 to 5.51). Symptomatic haemorrhage 1 versus 2 patients; access-site complications 5, dissection 10, perforation 7, vasospasm 11 [[Sarraj2023]]. At 1 year: generalised OR 1.43 (1.14 to 1.78); died 45% versus 52% (RR 0.89, 0.71 to 1.11) [[Sarraj2024]].'},
  {id:'ang',n:'ANGEL-ASPECT',txt:'generalised OR 1.37 (1.11 to 1.69)',k:'China · 456 people',
   d:'ASPECTS 3 to 5 or core 70 to 100 ml. Symptomatic haemorrhage 6.1% versus 2.7%; any haemorrhage 49.1% versus 17.3% [[Huo2023]].'},
  {id:'ten',n:'TENSION',txt:'common OR 2.58 (1.60 to 4.15)',k:'253 people · up to 12 hours',
   d:'ASPECTS 3 to 5, mainly non-contrast CT. Mortality HR 0.67 (0.46 to 0.98); symptomatic haemorrhage 6% versus 5%. At 12 months common OR 2.39 (1.47 to 3.90) [[Bendszus2023,Thomalla2024]].'},
  {id:'las',n:'LASTE',txt:'median mRS 4 versus 6; generalised OR 1.63',k:'333 people · within 6.5 hours',
   d:'ASPECTS 5 or less, unrestricted size. Generalised OR 1.63 (1.29 to 2.06). Death 36.1% versus 55.5% (adjusted RR 0.65, 0.50 to 0.84). Symptomatic haemorrhage 9.6% versus 5.7% [[Costalat2024]].'},
  {id:'tes',n:'TESLA',txt:'utility-weighted mRS 2.93 versus 2.27',k:'US · 300 people · within 24 hours',
   d:'ASPECTS 2 to 5 on non-contrast CT. Adjusted difference 0.63 (95% credible interval -0.09 to 1.34; posterior probability 0.96). This did not demonstrate improvement, and the interval includes both no effect and clinically relevant benefit. Mortality 35.3% versus 33.3%; symptomatic haemorrhage 4.0% versus 1.3% [[Yoo2024]].'},
  {id:'atl',n:'Pooled, 6 trials',txt:'median mRS 4 versus 5; generalised OR 1.63',k:'1886 people · core lab readjudicated',
   d:'Adjusted generalised OR 1.63 (1.42 to 1.88). Mortality 31.1% versus 37.3% (adjusted RR 0.82, 0.70 to 0.97). Symptomatic haemorrhage 1.1% versus 1.0%. Evidence remains limited for core 150 ml or more beyond 6 hours [[Sarraj2026]]. Bleeding disagrees: single trials range from 1 patient to 9.6%, and the abstracts do not explain the gap [[Sarraj2023,Costalat2024,Sarraj2026]].'}]},
 {id:'bas',t:'Basilar',trials:[
  {id:'att',n:'ATTENTION',o:'mRS 0-3',a:46,b:23,k:'China · 340 people · within 12 hours',
   d:'Adjusted rate ratio 2.06 (1.46 to 2.91). Mortality 37% versus 55% (adjusted RR 0.66, 0.52 to 0.82). Symptomatic haemorrhage 5% versus 0. Procedural complications 14% [[Tao2022]].'},
  {id:'bao',n:'BAOCHE',o:'mRS 0-3',a:46,b:24,k:'China · 217 people · 6 to 24 hours',
   d:'Median 663 minutes. Adjusted rate ratio 1.81 (1.26 to 2.60). The primary outcome was changed from mRS 0 to 4, which gave 55% versus 43% (1.21, 0.95 to 1.54). Mortality 31% versus 42%. Symptomatic haemorrhage 6% versus 1%. Procedural complications 11% [[Jovin2022]].'}]},
 {id:'mev',t:'Medium vessels',trials:[
  {id:'emv',n:'ESCAPE-MeVO',o:'mRS 0-1',a:41.6,b:43.1,k:'530 people · within 12 hours · neutral',
   d:'84.7% MCA branch. Adjusted rate ratio 0.95 (0.79 to 1.15). Mortality 13.3% versus 8.4% (adjusted HR 1.82, 1.06 to 3.12). Symptomatic haemorrhage 5.4% versus 2.2% [[Goyal2025]].'},
  {id:'dis',n:'DISTAL',txt:'common OR 0.90 (0.67 to 1.22)',k:'543 people · within 24 hours · neutral',
   d:'Median NIHSS 6, 65.4% had thrombolysis. Mortality 15.5% versus 14.0%. Symptomatic haemorrhage 5.9% versus 2.6% [[Psychogios2025]].'}]}];

const EV_MS={
 S:{n:'SWIFT PRIME',ar:[ {l:'Thrombectomy, n=98',c:[17,25,17,12,15,12,0],p:[17.3,25.5,17.3,12.2,15.3,12.2,0]},{l:'Control, n=93',c:[8,10,15,16,20,24,0],p:[8.6,10.8,16.1,17.2,21.5,25.8,0]} ],g:'60.2% versus 35.5%',merged:true,
  note:'<div class="kicker">Thrombectomy · 90-day mRS</div><h4>A clear shift to the left</h4><p>Counting registry participants, 59 of 98 and 33 of 93 reached mRS 0 to 2. That matches the 60% versus 35% in the paper [[NCT01657461,Saver2015]].</p><p><b>Two caveats.</b> The registry denominators (98 and 93) differ from the 98 and 98 randomised, and scores 5 and 6 are merged, so that segment shows severe disability and death together [[NCT01657461,Saver2015]].</p>'},
 T:{n:'TIMELESS',ar:[ {l:'Tenecteplase, n=226',c:[35,38,31,34,29,15,44],p:[15.5,16.8,13.7,15.0,12.8,6.6,19.5]},{l:'Placebo, n=229',c:[31,30,36,41,34,13,44],p:[13.5,13.1,15.7,17.9,14.8,5.7,19.2]} ],g:'46.0% versus 42.4%',merged:false,
  note:'<div class="kicker">Late-window lytic · 90-day mRS</div><h4>Almost no shift</h4><p>A neutral trial looks like this: common OR 1.13 (0.82 to 1.57; P=0.45). 77.3% had thrombectomy [[Albers2024]].</p><p><b>Registry and paper differ slightly.</b> Here 44 of 226 and 44 of 229 died (19.5% and 19.2%, derived), while the paper reports mortality of 19.7% versus 18.2% in 458 people [[NCT03785678,Albers2024]]. Both are shown as found.</p>'}};
/* Saver 2016 anchors */
const EV_DL={O:{lab:'Common odds ratio for lower disability',y0:.8,y1:4.2,ticks:[1,2,3,4],pts:[ {h:3,v:2.79,lo:1.96,hi:3.98},{h:6,v:1.98,lo:1.30,hi:3.00},{h:8,v:1.57,lo:.86,hi:2.88} ],fmt:v=>v.toFixed(2),ci:p=>`95% CI ${p.lo} to ${p.hi}`},
 A:{lab:'Absolute risk difference for lower disability, %',y0:0,y1:45,ticks:[0,10,20,30,40],pts:[ {h:3,v:39.2},{h:6,v:30.2},{h:8,v:15.7} ],fmt:v=>v.toFixed(1)+'%',ci:()=>''}};
const EV_HM=[ {l:'All patients',v:2.49,lo:1.76,hi:3.53},{l:'Age 80 or over',v:3.68,lo:1.95,hi:6.92},{l:'Randomised after 300 minutes',v:1.76,lo:1.05,hi:2.97},{l:'Not eligible for alteplase',v:2.43,lo:1.30,hi:4.55} ];
const EV_TI=[
 {g:'0',live:[],m1:.5,clot:true,d:'No perfusion [[Zaidat2013]].'},
 {g:'1',live:['s0','i0'],m1:1,clot:true,d:'Antegrade reperfusion past the occlusion, but limited distal filling [[Zaidat2013]].'},
 {g:'2a',live:['s0','i0','s1','s5','i3'],m1:1,d:'Reperfusion of less than half of the territory [[Zaidat2013]].'},
 {g:'2b',live:['s0','i0','s1','s5','i3','s2','s3','s6','i1','i2','i4'],m1:1,d:'Reperfusion of more than half of the territory. The consensus settled a discrepancy here: 2b had meant more than half (modified) or more than two thirds (original), and it chose more than half [[Zaidat2013]].'},
 {g:'3',live:'all',m1:1,d:'Complete reperfusion, with no visualised occlusion in distal branches. The 2013 consensus also suggested testing a 2c grade (over 90% but less than complete); it is reported here only as that suggestion [[Zaidat2013]].'}];

inits.evt=()=>{
  /* ---- main player ---- */
  const svg=$('#evSvg'),rg=$('#evT');
  function draw(t){const N=vb(svg,'720 420','400 680'),p=phaseOf(EV_STEPS,t);
    const L=N?{ax:12,ay:40,aw:376,ah:66,gx:12,gy:166,gw:376,bx:32,by:238,bs:1.12,px:200,py:590,ps:128,rt:[12,590]}
             :{ax:352,ay:58,aw:356,ah:70,gx:352,gy:204,gw:250,bx:8,by:72,bs:1.08,px:650,py:340,ps:130,rt:[352,300]};
    const dp=ease(ramp(t,.42,.6)),rt=ease(ramp(t,.64,.8)),rte=ease(ramp(t,.2,.38)),saved=ramp(t,.82,.96),open=rt>.72;
    let s=`<text x="${L.ax}" y="${N?16:20}" class="t-sm" style="fill:var(--ink);font-weight:700">Inside the artery</text><text x="${L.ax+L.aw}" y="${N?16:20}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${EV_STATE[p]}</text>`;
    /* before the catheter arrives the vessel holds only the clot */
    if(t<.2){const A=artery(L.ax,L.ay,L.aw,{h:L.ah,clot:1,at:.6,flow:1,ph:t*6,seed:29});s+=A.svg+kitLabel(A.at.clot[0],L.ay+L.ah+13,'clot',{a:'m'})}
    else{const gone=ramp(t,.82,.88);
      if(gone<1)s+=`<g style="opacity:${f1(1-gone)}">${catheterStent(L.ax,L.ay,L.aw,{h:L.ah,deploy:dp,retract:rt,ph:t*7,labels:true}).svg}</g>`;
      if(gone>0)s+=`<g style="opacity:${f1(gone)}">${artery(L.ax,L.ay,L.aw,{h:L.ah,flow:1,ph:t*7,seed:29}).svg}</g>`+(gone>=1?kitLabel(L.ax+L.aw/2,L.ay+L.ah+13,'clot and device removed',{a:'m'}):'')}
    /* reperfused share: illustrative, with the grade names at their published meaning */
    const share=open?lerp(.7,1,saved):Math.max(dp*.35,rt*.7);
    s+=`<text x="${L.gx}" y="${L.gy-12}" class="t-xs" style="fill:var(--ink)">Territory filling, illustrative</text>`;
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="14" rx="3" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${L.gx}" y="${L.gy}" width="${f1(Math.max(0,share*L.gw))}" height="14" rx="3" style="fill:var(--salvage)"/>`;
    s+=`<line x1="${f1(L.gx+L.gw/2)}" x2="${f1(L.gx+L.gw/2)}" y1="${L.gy-3}" y2="${L.gy+17}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    [ [0,'0'],[.25,'2a'],[.75,'2b'],[1,'3'] ].forEach(q=>{s+=`<text x="${f1(L.gx+q[0]*L.gw)}" y="${L.gy+29}" class="t-xs ${q[0]===0?'':q[0]===1?'t-end':'t-mid'}" style="fill:var(--ink)">TICI ${q[1]}</text>`});
    /* the route: a person with the catheter path */
    const k=L.ps/146,gr=[L.px+5*k,L.py+11*k],nk=[L.px+3*k,L.py-50*k],hd=[L.px+2*k,L.py-64*k];
    s+=bodyHemi(L.px,L.py,L.ps,{});
    const P=[gr,[L.px+7*k,L.py-15*k],nk,hd],seg=rte*3,pts=[P[0]];for(let i=0;i<3;i++){const u=clamp(seg-i);if(u<=0)break;pts.push([lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)])}
    if(rte>0){s+=`<path d="${ptsD(pts)}" style="fill:none;stroke:var(--device);stroke-width:2.6;stroke-linecap:round"/>`;const e=pts[pts.length-1];s+=`<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="3.2" style="fill:var(--ink)"/>`}
    s+=`<text x="${L.rt[0]}" y="${L.rt[1]}" class="t-xs" style="fill:var(--ink)">Route: often from the groin</text>`;
    /* the brain */
    const coreR=lerp(14,24,ramp(t,0,.72));
    const B=brainSide(L.bx,L.by,L.bs,{vessels:{occl:open?undefined:'m1',ph:t*5,flow:1},lesion:{core:coreR,penumbra:58,saved,mca:true}});
    s+=`<text x="${L.bx+8}" y="${L.by-(N?10:16)}" class="t-sm" style="fill:var(--ink);font-weight:700">Left hemisphere, side view</text>`+B.svg;
    const lc=B.at.lesion||[L.bx+150*L.bs,L.by+104*L.bs];
    s+=kitLabel(lc[0],lc[1]+3,'core',{a:'m'})+kitLabel(lc[0],lc[1]-44*L.bs,saved>.5?'saved tissue':'at risk',{a:'m'});
    if(!open)s+=kitLabel(L.bx+64*L.bs,L.by+172*L.bs,'clot in M1',{a:'m'});
    svg.innerHTML=s;setSt(p);$('#evNote').innerHTML=noteHTML(EV_STEPS[p])}
  const stop=playWire(rg,$('#evPlay'),draw,15000,'%t:player.replay%','evt');
  const setSt=stepWire($('#evSteps'),EV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- trial explorer ---- */
  const tr=$('#evTrSvg'),cb=$('#evCats'),tb=$('#evTrials');let cI=0,tI=0;
  cb.innerHTML=EV_CATS.map((c,i)=>`<button class="btn" data-c="${i}" aria-pressed="${i===0}">${c.t}</button>`).join('');
  function evFillTr(){tb.innerHTML=EV_CATS[cI].trials.map((d,i)=>`<button class="btn" data-t="${i}" aria-pressed="${i===tI}">${d.n}</button>`).join('')}
  function drawTr(){const C=EV_CATS[cI],N=NARROW(),pitch=N?58:42,H=44+C.trials.length*pitch+22;vb(tr,`720 ${H}`,`400 ${H}`);
    const ax0=N?32:176,ax1=N?368:556,X=v=>ax0+(ax1-ax0)*v/100;let s='';
    /* key */
    s+=`<circle cx="${N?14:ax0+4}" cy="12" r="5.5" style="fill:var(--rx)"/><text x="${(N?14:ax0+4)+10}" y="16" class="t-xs" style="fill:var(--ink)">thrombectomy</text><circle cx="${(N?14:ax0+4)+112}" cy="12" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.8"/><text x="${(N?14:ax0+4)+122}" y="16" class="t-xs" style="fill:var(--ink)">no thrombectomy</text>`;
    const top=38;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-4}" y2="${top+C.trials.length*pitch}" style="stroke:var(--line);stroke-width:1"/><text x="${f1(X(v))}" y="${top+C.trials.length*pitch+14}" class="t-xs t-mid">${v}%</text>`});
    C.trials.forEach((d,i)=>{const y=top+i*pitch,on=i===tI,mid=N?y+38:y+pitch/2,hl=`paint-order:stroke;stroke:${on?'var(--rx-soft)':'var(--panel)'};stroke-width:3px;stroke-linejoin:round`;
      s+=`<g class="evrow" data-t="${i}"><rect x="2" y="${y+1}" width="${N?396:716}" height="${pitch-3}" rx="6" style="fill:${on?'var(--rx-soft)':'transparent'}"/>`;
      s+=`<text x="${N?10:12}" y="${N?y+15:mid+4}" class="t-sm" style="fill:var(--ink);font-weight:700">${d.n}</text>`;
      if(d.txt){s+=`<text x="${N?10:ax0}" y="${N?y+38:mid+4}" class="t-xs" style="fill:var(--ink);${hl}">${d.txt}</text>`}
      else{const xa=X(d.a),xb=X(d.b),lftB=d.b<d.a,tb1=lftB?xb-9:xb+9,ta1=lftB?xa+9:xa-9;
        s+=`<line x1="${f1(xa)}" x2="${f1(xb)}" y1="${mid}" y2="${mid}" style="stroke:var(--muted);stroke-width:3"/><circle cx="${f1(xb)}" cy="${mid}" r="5.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.8"/><circle cx="${f1(xa)}" cy="${mid}" r="6.5" style="fill:var(--rx)"/>`;
        s+=`<text x="${f1(ta1)}" y="${mid+4}" class="t-xs ${lftB?'':'t-end'}" style="fill:var(--ink);font-weight:700;${hl}">${d.a}</text><text x="${f1(tb1)}" y="${mid+4}" class="t-xs ${lftB?'t-end':''}" style="fill:var(--ink);${hl}">${d.b}</text>`;
        const tail=`${d.o}${d.nnt?`, NNT ${d.nnt} (derived)`:''}`;
        s+=N?`<text x="390" y="${y+15}" class="t-xs t-end" style="fill:var(--ink)">${tail}</text>`:`<text x="566" y="${mid+(d.nnt?-3:4)}" class="t-xs" style="fill:var(--ink)">${d.o}</text>${d.nnt?`<text x="566" y="${mid+9}" class="t-xs" style="fill:var(--ink)">NNT ${d.nnt}, derived</text>`:''}`}
      s+='</g>'});
    tr.innerHTML=s;
    const d=C.trials[tI];
    $('#evTrNote').innerHTML=`<div class="kicker">${d.k}</div><h4>${d.n}</h4>${d.ev?'<span class="ev early" style="align-self:flex-start">Early evidence</span>':''}${d.a!=null?`<p><b>${d.o.replace('-',' to ')}: ${d.a}% versus ${d.b}%.</b>${d.nnt?` NNT ${d.nnt} is derived here, not stated by the source.`:''}</p>`:''}<p>${d.d}</p>`}
  cb.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;cI=+b.dataset.c;tI=0;$$('[data-c]',cb).forEach((q,k)=>q.setAttribute('aria-pressed',k===cI));evFillTr();drawTr()});
  const pickT=e=>{const b=e.target.closest('[data-t]');if(!b)return;tI=+b.dataset.t;$$('[data-t]',tb).forEach((q,k)=>q.setAttribute('aria-pressed',k===tI));drawTr()};
  tb.addEventListener('click',pickT);tr.addEventListener('click',pickT);
  evFillTr();drawTr();

  /* ---- HERMES forest ---- */
  const hm=$('#evHmSvg');
  function drawHm(){const N=NARROW(),pitch=N?44:36,top=N?20:22,H=top+EV_HM.length*pitch+38;vb(hm,`720 ${H}`,`400 ${H}`);
    const x0=N?16:240,x1=N?262:560,lg=Math.log,X=v=>x0+(x1-x0)*(lg(v)-lg(.8))/(lg(8)-lg(.8));let s='';const bot=top+EV_HM.length*pitch;
    [1,2,4,8].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-8}" y2="${bot}" style="stroke:${v===1?'var(--ink)':'var(--line)'};stroke-width:${v===1?1.4:1}${v===1?';stroke-dasharray:5 3':''}"/><text x="${f1(X(v))}" y="${bot+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)+6)}" y="${bot+28}" class="t-xs" style="fill:var(--ink)">favours thrombectomy to the right of 1</text>`;
    EV_HM.forEach((r,i)=>{const y=top+i*pitch,mid=N?y+28:y+pitch/2;
      s+=N?kitLabel(x0,y+12,r.l):`<text x="${x0-12}" y="${mid+4}" class="t-sm t-end" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${mid}" y2="${mid}" style="stroke:var(--rx);stroke-width:2.2"/><rect x="${f1(X(r.v)-5.5)}" y="${mid-5.5}" width="11" height="11" style="fill:var(--rx)"/>`;
      s+=`<text x="${f1(x1+8)}" y="${mid+4}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.v.toFixed(2)} (${r.lo.toFixed(2)} to ${r.hi.toFixed(2)})</text>`});
    hm.innerHTML=s}
  drawHm();

  /* ---- mRS bars ---- */
  const ms=$('#evMsSvg');let mK='S',mU='p';
  function drawMs(){const N0=NARROW(),T=EV_MS[mK],x=N0?12:14,w=N0?376:692,h=36,ys=N0?[50,142]:[50,138],LY=N0?ys[1]+h+28:ys[1]+h+16,LG=mrsLegend(x,LY,w),N=vb(ms,`720 ${LY+LG.h+6}`,`400 ${LY+LG.h+6}`);let s='';
    const seg=[];
    T.ar.forEach((a,i)=>{const dist=a[mU==='p'?'p':'c'],y=ys[i];
      s+=`<text x="${x}" y="${y-20}" class="t-sm" style="fill:var(--ink);font-weight:700">${a.l}</text>`;
      const R=mrsStack(x,y,w,h,dist,{digits:false,fmt:v=>mU==='p'?v.toFixed(1):v});s+=R.svg;
      dist.forEach((v,j)=>{if(v<=0)return;const c=R.at(j);const sw=v/dist.reduce((q,z)=>q+z,0)*w;if(sw>=9)s+=`<text x="${f1(c[0])}" y="${y-5}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${T.merged&&j===5?'5 or 6':j}</text>`});
      const tot=dist.reduce((q,z)=>q+z,0);seg.push(x+w*(dist[0]+dist[1]+dist[2])/tot)});
    s+=`<line x1="${f1(seg[0])}" x2="${f1(seg[1])}" y1="${ys[0]+h+1}" y2="${ys[1]-15}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/>`;
    const lab=`mRS 0 to 2: ${T.g}, derived`;
    s+=N?`<text x="${x}" y="${ys[1]+h+16}" class="t-xs" style="fill:var(--ink);font-weight:700">${lab}</text>`:`<text x="${x+w}" y="${ys[1]-30}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${lab}</text>`;
    s+=LG.svg;
    ms.innerHTML=s;$('#evMsNote').innerHTML=T.note}
  const msSet=()=>{[ ['#evMsS','S'],['#evMsT','T'] ].forEach(([i,v])=>$(i).setAttribute('aria-pressed',mK===v));[ ['#evMsP','p'],['#evMsC','c'] ].forEach(([i,v])=>$(i).setAttribute('aria-pressed',mU===v));drawMs()};
  $('#evMsS').addEventListener('click',()=>{mK='S';msSet()});$('#evMsT').addEventListener('click',()=>{mK='T';msSet()});
  $('#evMsP').addEventListener('click',()=>{mU='p';msSet()});$('#evMsC').addEventListener('click',()=>{mU='c';msSet()});
  drawMs();

  /* ---- delay curve ---- */
  const dl=$('#evDlSvg'),dlH=$('#evDlH');let dK='O';
  function drawDl(){const N=vb(dl,'720 340','400 340'),h=+dlH.value,D=EV_DL[dK],f=monoFn(D.pts.map(p=>[p.h,p.v])),x=N?44:60,w=N?344:640,y=44,ht=240;
    const C=curve(x,y,w,ht,f,{x0:2.75,x1:8.25,y0:D.y0,y1:D.y1,col:'none'});let s=`<text x="${x}" y="16" class="t-sm" style="fill:var(--ink);font-weight:700">${D.lab}</text>`+C.svg;
    let cd='';for(let i=0;i<=80;i++){const v=3+5*i/80;cd+=(i?'L':'M')+f1(C.X(v))+' '+f1(C.Y(f(v)))}
    D.ticks.forEach(v=>{const yy=C.Y(v);s+=`<line x1="${x}" x2="${x+w}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--line);stroke-width:1"/><text x="${x-6}" y="${f1(yy+3)}" class="t-xs t-end">${v}</text>`});
    if(dK==='O'){const yy=C.Y(1);s+=`<line x1="${x}" x2="${x+w}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/><text x="${x+6}" y="${f1(yy-5)}" class="t-xs" style="fill:var(--ink)">OR 1 = no effect</text>`}
    [3,4,5,6,7,8].forEach(v=>{s+=`<text x="${f1(C.X(v))}" y="${y+ht+16}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(x+w/2)}" y="${y+ht+34}" class="t-xs t-mid" style="fill:var(--ink)">Hours from onset to groin puncture</text>`;
    s+=`<path d="${cd}" style="fill:none;stroke:var(--rx);stroke-width:2.4;stroke-dasharray:7 5"/>`;
    const m=C.X(7.3);s+=`<line x1="${f1(m)}" x2="${f1(m)}" y1="${y-8}" y2="${y+ht}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(m-5)}" y="${y-10}" class="t-xs t-end" style="fill:var(--ink)">7 h 18 min: significance ends</text>`;
    const xh=C.X(h);s+=`<line x1="${f1(xh)}" x2="${f1(xh)}" y1="${y}" y2="${y+ht}" style="stroke:var(--ink);stroke-width:2"/>`;
    D.pts.forEach(p=>{const px=C.X(p.h);if(p.lo!=null)s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(C.Y(p.hi))}" y2="${f1(C.Y(p.lo))}" style="stroke:var(--rx);stroke-width:2.2"/>`;
      s+=`<circle cx="${f1(px)}" cy="${f1(C.Y(p.v))}" r="6" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`;
      const end=p.h===8;s+=kitLabel(px+(end?-10:10),C.Y(p.v)-8,D.fmt(p.v),{a:end?'e':undefined,halo:'var(--field)'})});
    dl.innerHTML=s;dlH.setAttribute('aria-valuetext',`${h} hours from onset to puncture`);
    const a=D.pts.find(p=>p.h===h);
    $('#evDlR').innerHTML=`<span>Time <b>${h} h</b></span><span>${a?`Published <b>${D.fmt(a.v)}</b>`:'<b>Between anchors</b>: no figure'}</span>`;
    const sigTxt=h<=7.25?'Within the range where benefit stayed significant, which held through 7 hours 18 minutes [[Saver2016]].':'Past 7 hours 18 minutes, where significance no longer held [[Saver2016]].';
    let nt=`<div class="kicker">HERMES timing · onset to puncture</div><h4>${h} hours</h4>`;
    if(a){const o=EV_DL.O.pts.find(p=>p.h===h),ar=EV_DL.A.pts.find(p=>p.h===h);nt+=`<dl class="kv"><div><dt>Common odds ratio</dt><dd><b>${o.v}</b> (95% CI ${o.lo} to ${o.hi}) [[Saver2016]]</dd></div><div><dt>Absolute risk difference for lower disability</dt><dd><b>${ar.v}%</b> [[Saver2016]]</dd></div></dl>`}
    else nt+=`<p>No published figure at this exact time. Published anchors are at 3, 6 and 8 hours, and the dashed line between them is schematic.</p>`;
    nt+=`<p>${sigTxt}</p><p>Among 390 with substantial reperfusion, each 1-hour delay gave worse disability (cOR 0.84, 0.76 to 0.93; absolute difference -6.7%) and less functional independence (OR 0.81, 0.71 to 0.92; -5.2%), with no change in mortality (OR 1.12, 0.93 to 1.34) [[Saver2016]].</p>`;
    $('#evDlNote').innerHTML=nt}
  dlH.addEventListener('input',drawDl);
  [ ['#evDlO','O'],['#evDlA','A'] ].forEach(([i,v])=>$(i).addEventListener('click',()=>{dK=v;$('#evDlO').setAttribute('aria-pressed',v==='O');$('#evDlA').setAttribute('aria-pressed',v==='A');drawDl()}));
  drawDl();

  /* ---- TICI ---- */
  const ti=$('#evTiSvg'),tiB=$('#evTiBtns');let tiI=3;
  tiB.innerHTML=EV_TI.map((d,i)=>`<button class="btn" data-g="${i}" aria-pressed="${i===tiI}">Grade ${d.g}</button>`).join('');
  function drawTi(){const D=EV_TI[tiI],N=vb(ti,'420 300','400 300'),x=N?42:52,y=30,sc=1.05;
    let s=`<text x="${x}" y="16" class="t-sm" style="fill:var(--ink);font-weight:700">TICI grade ${D.g}</text>`+brainSide(x,y,sc,{dim:.3}).svg;
    s+=`<g transform="translate(${x} ${y}) scale(${sc})" style="fill:none;stroke-linecap:round;stroke-linejoin:round">`;
    BS_MCA_V.forEach(([n,g,w,P])=>{const d=smoothPath(P,false),live=D.live==='all'||(D.live.indexOf(n)>=0);if(n==='m1')return;
      s+=`<path d="${d}" style="stroke:var(--artery-line);stroke-width:${f1(w+1.1)};opacity:${live?1:.3}"/><path d="${d}" style="stroke:var(--artery);stroke-width:${w};opacity:${live?1:.2}"/>`});
    const m=crPts(BS_MCA_V[0][3],false,6),cut=Math.floor(m.length*.62),a=D.m1<1?m.slice(0,cut+1):m;
    s+=`<path d="${ptsD(a)}" style="stroke:var(--artery-line);stroke-width:5.1"/><path d="${ptsD(a)}" style="stroke:var(--artery);stroke-width:4"/>`;
    if(D.m1<1){const b=m.slice(cut);s+=`<path d="${ptsD(b)}" style="stroke:var(--artery);stroke-width:4;opacity:.2"/>`}
    s+='</g>';
    if(D.clot){const q=m[cut];s+=clot(x+q[0]*sc,y+q[1]*sc,15,{seed:4,ang:-20})}
    ti.innerHTML=s;$('#evTiNote').innerHTML=`<div class="kicker">Modified TICI · 2013 consensus</div><h4>Grade ${D.g}</h4><p>${D.d}</p><div class="hook"><b>Exam hook</b>mTICI 2b means more than half of the territory reperfused [[Zaidat2013]].</div>`}
  tiB.addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b)return;tiI=+b.dataset.g;$$('[data-g]',tiB).forEach((q,k)=>q.setAttribute('aria-pressed',k===tiI));drawTi()});
  drawTi();

  /* ---- access ---- */
  const ac=$('#evAcSvg');
  ac.innerHTML=icons(20,8,{n:100,cols:20,k:3,size:15,gap:3,shape:'dot',col:'var(--rx)'}).svg+`<circle cx="26" cy="126" r="6" style="fill:var(--rx)"/><text x="38" y="130" class="t-sm" style="fill:var(--ink)">About 3 of 100 large-vessel occlusions reached</text><text x="20" y="154" class="t-xs" style="fill:var(--ink)">Each dot is 1 of 100 people. Global median, 2020 to 2021.</text>`;

  const prev=redraws.evt;redraws.evt=()=>{prev&&prev();drawTr();drawHm();drawMs();drawDl();drawTi()};
};
