/* =============== 1.3 Core, penumbra & time =============== */
/* Widgets: the clock (main scrubber, growth rate and reperfusion controls), the flow ladder, collaterals, and the
   cascade at one synapse. Saver's published rates drive the average line. Fast and slow rates are labelled illustrative. */
const CAS_RATE={avg:5.4,fast:20,slow:2};
const CAS_AT_RISK=54;
const CAS_STEPS=[
 {from:0,at:.02,k:'Onset',t:'An artery blocks',txt:`Flow falls at once. The infarct core is described at 5-10 mL/100 g/min with persistent depolarisation [[Koukalova2024]]. Around it lies the penumbra, a name given in 1981 [[Astrup1981]]. Early after onset, penumbra may be as much as half of the lesion volume [[Woodruff2011]].`,pt:`When an artery blocks, the centre dies fast. Around it, tissue is struggling but can still recover if blood comes back soon [[Baron2021]].`},
 {from:.04,at:.1,k:'The first hour',t:'1.9 million neurons a minute',txt:`Saver's estimate for a typical large-vessel supratentorial stroke: per minute, 1.9 million neurons, 14 billion synapses and 12 km of myelinated fibres. Per hour, 120 million, 830 billion and 714 km, equal to 3.6 years of normal ageing [[Saver2006]].`,hook:`1.9 million neurons per minute in large-vessel occlusion [[Saver2006]].`},
 {from:.2,at:.3,k:'Hours 2 to 4',t:'The core eats the penumbra',txt:`In rodents the penumbra is gone after a few hours as the core expands [[Hossmann1994]], and it was described as short-lived [[Hakim1998]]. Tissue here has preserved energy metabolism, and that is what is being lost [[Hossmann1994]].`,pt:`Each hour without blood turns some tissue that could recover into tissue that cannot. On average.`},
 {from:.45,at:.55,k:'Mid-course',t:'People do not run at one speed',txt:`Core growth varies between people, and penumbra can remain salvageable up to and perhaps beyond 24 hours [[Baron2021]]. In 94 people with untreated occlusion, time showed no correlation with growth (r=-0.05) [[Vagal2018]]. Try the fast and slow buttons.`,hook:`SELECT slow progressors grow under 10 mL/h [[Sarraj2021]].`},
 {from:.8,at:1,k:'Hour 10',t:'The final infarct',txt:`Saver's assumptions: final infarct 54 mL (range 19-100), evolution 10 hours (range 6-18), out of 22 billion forebrain neurons [[Saver2006]]. At the steady per-minute rate the counter reaches 1.14 billion neurons. That total is calculated on this page.`}];
const CAS_TH=[
 {v:55,l:'Protein synthesis stops',n:'Rodent · 0.55 mL/g/min'},
 {v:35,l:'Anaerobic glycolysis starts',n:'Rodent · 0.35 mL/g/min'},
 {v:23,l:'Paralysis, still reversible',n:'Awake monkey · below about 23'},
 {v:20,l:'Transmitter release, energy disturbed',n:'Rodent · 0.20 mL/g/min'},
 {v:17.5,l:'Irreversible if occlusion is permanent',n:'Awake monkey · 17-18'},
 {v:15,l:'Anoxic depolarisation',n:'Rodent · below 0.15 mL/g/min'},
 {v:11,l:'Irreversible after 2-3 hours',n:'Awake monkey · 10-12'}];
const CAS_LZ=[
 {min:50,k:'Normal range',t:'Normal flow',txt:`Normal cerebral blood flow is stated as about 50-60 mL/100 g/min [[Mangiardi2023]].`},
 {min:35,k:'Early warning, in rodents',t:'Protein synthesis has stopped',txt:`In the rodent ladder, protein synthesis stops at 0.55 mL/g/min, the first rung of this ladder [[Hossmann1994]].`},
 {min:23,k:'Metabolism switching, in rodents',t:'Anaerobic glycolysis',txt:`In rodents anaerobic glycolysis starts at 0.35 mL/g/min [[Hossmann1994]]. Reported human penumbra thresholds run from 14.1 to 35.0 mL/100 g/min, too varied to pool [[Bandera2006]].`},
 {min:11,k:'The penumbra zone',t:'Silent but alive',txt:`In awake monkeys, reversible paralysis occurred below about 23 mL/100 g/min, and damage became irreversible at 17-18 with permanent occlusion [[Jones1981]]. In rodents, anoxic depolarisation occurs below 0.15 mL/g/min [[Hossmann1994]]. At 10-20 mL/100 g/min cellular functions are interrupted but structure is intact [[Mangiardi2023]].`,hook:`Normal flow about 50-60 mL/100 g/min; below 10-20 mL/100 g/min is the injury zone [[Mangiardi2023]].`},
 {min:-1,k:'The core',t:'Cell death within minutes',txt:`In monkeys, flow below 10-12 mL/100 g/min for 2-3 hours was irreversible, and microscopic infarct was seen at 15-30 minutes [[Jones1981]]. Below the 10-20 zone, cell death follows within minutes [[Mangiardi2023]]. Reported human core thresholds are 4.8-8.4 mL/100 g/min [[Bandera2006]].`}];
const CAS_COL={good:{t:'Good collaterals: slow growth',txt:`Vessels from the neighbouring territories keep the penumbra alive. Growth with good collaterals was 0.9 cm³ and median penumbral salvage 5.9 cm³ [[Vagal2018]]. With good collaterals, time had no significant effect on outcome in one series [[Hwang2015]].`,pt:`Backup blood vessels buy time [[Vagal2018]].`},
 poor:{t:'Poor collaterals: fast growth',txt:`Growth with poor collaterals was 52.3 cm³ and median penumbral salvage 0 [[Vagal2018]]. With poor collaterals, favourable outcome fell with delay: 59% vs 32% at the 300-minute onset-to-puncture split [[Hwang2015]].`,hook:`Time matters most when collaterals are poor [[Hwang2015]].`}};
const CAS_CS=[
 {from:0,at:.07,k:'Step 1 · energy',t:'Energy fails',txt:`With flow gone, energy falls. Ion pumps and glutamate reuptake fail [[Moskowitz2010]]. In rodents, anoxic depolarisation occurs below 0.15 mL/g/min [[Hossmann1994]].`,pt:`Brain cells need a steady supply of energy. Without blood, the pumps that keep each cell in balance stop [[Moskowitz2010]].`},
 {from:.167,at:.25,k:'Step 2 · glutamate',t:'Glutamate floods the gap',txt:`Glutamate accumulates from pump and reuptake failure, and overstimulates AMPA and NMDA receptors [[Moskowitz2010]].`},
 {from:.334,at:.42,k:'Step 3 · influx',t:'Calcium, sodium and water pour in',txt:`Open receptors drive calcium, sodium and water influx [[Moskowitz2010]]. Persistent depolarisation produces cytotoxic oedema and the diffusion-weighted core [[Hartings2017]].`,pt:`The cell takes on water and swells. This is what a diffusion MRI scan picks up [[Hartings2017]].`},
 {from:.5,at:.58,k:'Step 4 · enzymes',t:'Enzymes turn on the cell',txt:`Calcium activates proteases, lipases and nucleases, plus nNOS and PLA2, and mitochondria release more calcium [[Moskowitz2010]]. NMDA signalling is split: extrasynaptic GluN2B has been proposed to promote death and GluN2A survival [[Lai2014]].`},
 {from:.667,at:.75,k:'Step 5 · the wave',t:'Spreading depolarisation',txt:`Spreading depolarisation is triggered by glutamate and potassium [[Moskowitz2010]]. Transient waves in the penumbra expand the lesion [[Hartings2017]], and an inverse haemodynamic response turns the normal flow rise into a fall [[Dreier2011]]. In human injured cortex, spread was 3.3 mm/min (range 0.41-10) [[Fabricius2006]]. In 16 people with malignant MCA infarction, 127 cortical spreading depressions and 42 peri-infarct depolarisations were recorded over 1,638 hours [[Dohmen2008]].`},
 {from:.834,at:.93,k:'Step 6 · barrier',t:'Inflammation and a leaking barrier',txt:`Inflammation is involved at all stages, along with stroke-related immunodepression, and extracellular ATP rises within minutes [[Iadecola2011]]. The immune response is double-edged [[Iadecola2020]]. Matrix metalloproteinases open the blood-brain barrier early and reversibly, then again at 24-72 hours [[Yang2011]].`,hook:`Delayed barrier opening occurs at 24-72 hours [[Yang2011]].`}];
function casFmtN(m){return m<999.5?`${Math.round(m)} million`:`${(m/1000).toFixed(2)} billion`}
function casFmtS(b){return b<999.5?`${Math.round(b)} billion`:`${(b/1000).toFixed(2)} trillion`}
function casFmtK(k){return `${Math.round(k).toLocaleString('en-GB')} km`}
function casFmtT(h){const H=Math.floor(h+1e-6),M=Math.floor((h-H)*60+1e-6);return `${H} h ${String(M).padStart(2,'0')} min`}
inits.cascade=()=>{
  /* ---------- the clock ---------- */
  const svg=$('#caSvg'),rg=$('#caT'),rr=$('#caR');let prog='avg',rep=false,mode='plain',setSt=()=>{};
  function draw(t){const N=vb(svg,'720 430','400 590'),h=10*t,r=CAS_RATE[prog],rh=+rr.value,upTo=rep?rh:10;
    const V=hh=>Math.min(CAS_AT_RISK,r*Math.min(hh,upTo)),v=V(h),sv=rep?ease(ramp(h,rh,rh+.5)):0,mins=v/CAS_RATE.avg*60;
    const L=N?{bx:6,by:26,bs:.72,cx:214,cy:62,cr:22,tx:244,ty:60,tsy:75,cn:[ [190,108],[190,152],[190,196]],px:44,py:262,pw:336,ph:170,bar:{x:10,y:490,w:380},dy:32}:{bx:6,by:26,bs:.9,cx:36,cy:348,cr:26,tx:72,ty:346,tsy:364,cn:[ [236,26],[396,26],[556,26]],px:282,py:88,pw:420,ph:198,bar:{x:236,y:344,w:476},dy:32};
    let g=`<text x="${L.bx+4}" y="16" class="t-xs" style="letter-spacing:.06em">LEFT MCA BLOCKED · AXIAL SLICE</text>`;
    const pen=.66*ease(ramp(h,0,.15)),core=Math.max(.02,.66*Math.sqrt(v/CAS_AT_RISK));
    const ax=brainAxial(L.bx,L.by,L.bs,{mode,side:'L',core:h>0?core:0,penumbra:pen,saved:sv,orient:true});g+=ax.svg;
    const hal=mode==='plain'?'var(--panel)':'var(--scan-bg)';
    if(v>1.2)g+=kitLabel(ax.at.core[0]-2,ax.at.core[1]+4,'core',{a:'m',halo:hal});
    if(mode==='plain'&&pen>.3&&v<46)g+=kitLabel(ax.at.core[0]-(N?36:44)-core*40,ax.at.core[1]-(N?30:38),sv>.5?'saved':'penumbra',{a:'m',halo:hal});
    if(mode==='dwi')g+=kitLabel(L.bx+L.bs*120,L.by+L.bs*292,'penumbra invisible on DWI',{a:'m',halo:'var(--scan-bg)'});
    /* clock */
    g+=clock(L.cx,L.cy,L.cr,(h*60)%720,{full:600,col:'var(--accent)',h0:0});
    g+=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:21px">${casFmtT(h)}</text><text x="${L.tx}" y="${L.tsy}" class="t-xs">since the artery blocked</text>`;
    /* counters */
    [ ['NEURONS LOST',casFmtN(1.9*mins),'1.9 million a minute'],['SYNAPSES LOST',casFmtS(14*mins),'14 billion a minute'],['FIBRES LOST',casFmtK(12*mins),'12 km a minute']].forEach((c,i)=>{const [x,y]=L.cn[i];
      g+=`<text x="${x}" y="${y-8}" class="t-xs" style="letter-spacing:.08em">${c[0]}</text><text x="${x}" y="${y+13}" class="t-big" style="font-size:${N?18:20}px">${c[1]}</text><text x="${x}" y="${y+27}" class="t-xs">${c[2]}</text>`});
    /* growth chart */
    const C=curve(L.px,L.py,L.pw,L.ph,V,{x0:0,x1:10,y0:0,y1:60,upto:h,col:'var(--core)',dot:true,lw:3});g+=C.svg;
    [0,20,40,60].forEach(y=>{g+=`<text x="${L.px-6}" y="${f1(C.Y(y)+3)}" class="t-xs t-end">${y}</text>`;if(y)g+=`<line x1="${L.px}" x2="${L.px+L.pw}" y1="${f1(C.Y(y))}" y2="${f1(C.Y(y))}" class="grid"/>`});
    [0,2,4,6,8,10].forEach(x=>{g+=`<text x="${f1(C.X(x))}" y="${L.py+L.ph+14}" class="t-xs t-mid">${x}</text>`});
    g+=`<text x="${L.px+L.pw}" y="${L.py+L.ph+27}" class="t-xs t-end">hours since onset</text><text x="${L.px}" y="${L.py+L.ph+27}" class="t-xs">core volume, mL</text>`;
    g+=`<line x1="${f1(C.X(0))}" y1="${f1(C.Y(54))}" x2="${f1(C.X(10))}" y2="${f1(C.Y(54))}" style="stroke:var(--penumbra);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${f1(C.X(10)-4)}" y="${f1(C.Y(54)-5)}" class="t-xs t-end" style="fill:var(--ink)">54 mL at risk</text>`;
    g+=`<line x1="${f1(C.X(0))}" y1="${f1(C.Y(0))}" x2="${f1(C.X(5.4))}" y2="${f1(C.Y(54))}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4"/>`;
    if(prog!=='avg')g+=`<line x1="${f1(C.X(0))}" y1="${f1(C.Y(0))}" x2="${f1(C.X(10))}" y2="${f1(C.Y(54))}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:8 4"/><text x="${f1(C.X(8.1))}" y="${f1(C.Y(32))}" class="t-xs t-mid" style="fill:var(--ink)">Saver average</text>`;
    if(rep){const x=C.X(rh);g+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.py}" y2="${L.py+L.ph}" style="stroke:var(--salvage);stroke-width:2"/>`+kitLabel(rh>6.5?x-5:x+5,L.py+L.ph-8,'artery reopens',{a:rh>6.5?'e':'','halo':'var(--field)'})}
    g+=kitLabel(C.X(.12),C.Y(56.3),'dotted: 10 mL/h, the SELECT cutoff',{halo:'var(--field)'});
    /* the tissue bar */
    const B=L.bar,w=B.w,wc=w*v/CAS_AT_RISK,left=CAS_AT_RISK-v,ws=(w-wc)*sv,wp=w-wc-ws;
    g+=`<text x="${B.x}" y="${B.y-7}" class="t-xs" style="letter-spacing:.06em">THE ${CAS_AT_RISK} ML AT RISK, NOW</text>`;
    g+=`<rect x="${B.x}" y="${B.y}" width="${w}" height="20" rx="4" style="fill:var(--panel-2)"/>`;
    if(wc>0)g+=`<rect x="${B.x}" y="${B.y}" width="${f1(wc)}" height="20" style="fill:var(--core)"/>`;
    if(ws>0)g+=`<rect x="${f1(B.x+wc)}" y="${B.y}" width="${f1(ws)}" height="20" style="fill:var(--salvage)"/>`;
    if(wp>0)g+=`<rect x="${f1(B.x+wc+ws)}" y="${B.y}" width="${f1(wp)}" height="20" style="fill:var(--penumbra)"/>`;
    const col=w/3;[ ['core',v],['saved',left*sv],['penumbra',left*(1-sv)]].forEach((c,i)=>{g+=`<text x="${f1(B.x+i*col)}" y="${B.y+36}" class="t-sm" style="fill:var(--ink)">${c[0]} ${c[1].toFixed(1)} mL</text>`});
    const share=1.9*mins/22000*100,sn=left*sv/CAS_RATE.avg*60*1.9;
    g+=`<text x="${B.x}" y="${B.y+54}" class="t-xs">${share.toFixed(1)}% of 22 billion forebrain neurons, calculated here</text>`;
    if(rep&&sv>.5&&sn>=1)g+=`<text x="${B.x}" y="${B.y+70}" class="t-xs" style="fill:var(--ink)">neurons in the saved tissue: ${casFmtN(sn)}, calculated here</text>`;
    svg.innerHTML=g;const p=phaseOf(CAS_STEPS,t);setSt(p);$('#caNote').innerHTML=noteHTML(CAS_STEPS[p]);
    $('#caRVal').textContent=`${rh} h`;
    const big=prog==='fast'?'Fast progressor line':prog==='slow'?'Slow progressor line':'Saver average line';
    $('#caCap').innerHTML=rep?`<b>${big}, artery reopened at ${rh} h.</b> In this schematic the core stops where it was and the remaining penumbra turns green. In published mapping, with over 90% reperfusion, early diffusion volume correlated with final infarct at r=0.95 [[Wheeler2013]]. Real reopening is less clean: see the table lower on this page.`
      :prog==='avg'?`<b>${big}, artery stays blocked.</b> Press Reopens to choose a time, or change the growth rate.`:`<b>${big}, artery stays blocked.</b> Rates shown are illustrative. SELECT divided slow from fast at 10 mL/h, with functional independence 61% vs 35% [[Sarraj2021]].`}
  const stop=playWire(rg,$('#caPlay'),draw,22000,'%t:player.replay%','cascade');
  setSt=stepWire($('#caSteps'),CAS_STEPS,rg,draw,stop);
  const pick=(attr,fn)=>$$('['+attr+']').forEach(b=>b.addEventListener('click',()=>{stop();fn(b.getAttribute(attr));$$('['+attr+']').forEach(c=>c.setAttribute('aria-pressed',c===b));draw(+rg.value)}));
  pick('data-cap',v=>{prog=v});pick('data-car',v=>{rep=v==='on'});pick('data-cam',v=>{mode=v});
  rr.addEventListener('input',()=>{stop();if(!rep){rep=true;$$('[data-car]').forEach(c=>c.setAttribute('aria-pressed',c.dataset.car==='on'))}draw(+rg.value)});
  draw(+rg.value);

  /* ---------- flow ladder ---------- */
  const ls=$('#caLad'),lr=$('#caLadT');
  function drawLad(t){const N=vb(ls,'720 400','400 610'),f=60*(1-t),L=N?{ax:44,top:66,bot:596,bx:[52,74],rx:104,ry:94,rs:74,rw:290,nx:338,ny:32,nr:11}:{ax:62,top:34,bot:384,bx:[70,96],rx:150,ry:52,rs:49,rw:380,nx:615,ny:210,nr:26};
    const Y=v=>L.bot-(L.bot-L.top)*v/60;let g=`<text x="10" y="${N?20:18}" class="t-xs" style="letter-spacing:.06em">FLOW, mL/100 g/min</text>`;
    if(N)g+=`<text x="10" y="46" class="t-big" style="font-size:22px">${Math.round(f)}</text>`;
    g+=`<line x1="${L.ax}" x2="${L.ax}" y1="${L.top}" y2="${L.bot}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    [0,10,20,30,40,50,60].forEach(v=>{g+=`<line x1="${L.ax-4}" x2="${L.ax}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--ink)"/><text x="${L.ax-7}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    /* rungs, evenly spaced with a leader to their true height */
    CAS_TH.forEach((r,i)=>{const y=L.ry+i*L.rs,on=f<=r.v,lx=L.rx-6;
      g+=`<path d="M${L.ax} ${f1(Y(r.v))}C${L.ax+30} ${f1(Y(r.v))} ${lx-30} ${y} ${lx} ${y}" style="fill:none;stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      g+=`<rect x="${L.rx-4}" y="${y-18}" width="${L.rw}" height="${N?52:40}" rx="7" style="fill:${on?'var(--accent-soft)':'var(--panel-2)'}"/>`;
      g+=`<text x="${L.rx+4}" y="${y-2}" class="t-lbl">${r.l}</text><text x="${L.rx+4}" y="${y+13}" class="t-xs">${r.n}</text>`});
    /* the human bands, published */
    g+=`<rect x="${L.bx[0]}" y="${f1(Y(60))}" width="15" height="${f1(Y(50)-Y(60))}" rx="3" style="fill:var(--good);opacity:.8"/>`;
    g+=`<text transform="translate(${L.bx[0]+26} ${f1(Y(55))}) rotate(-90)" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">normal</text>`;
    g+=`<g><rect x="${L.bx[0]}" y="${f1(Y(35))}" width="15" height="${f1(Y(14.1)-Y(35))}" rx="3" style="fill:var(--penumbra);opacity:.85"/><rect x="${L.bx[0]}" y="${f1(Y(8.4))}" width="15" height="${f1(Y(4.8)-Y(8.4))}" rx="3" style="fill:var(--core)"/></g>`;
    g+=`<text transform="translate(${L.bx[0]+26} ${f1(Y(24.5))}) rotate(-90)" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">human penumbra</text><text transform="translate(${L.bx[0]+26} ${f1(Y(6.6))}) rotate(-90)" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">core</text>`;
    /* marker */
    const my=Y(f);g+=`<line x1="${L.ax-12}" x2="${L.ax+6}" y1="${f1(my)}" y2="${f1(my)}" style="stroke:var(--accent);stroke-width:3"/><path d="M${L.ax-16} ${f1(my-6)}L${L.ax-7} ${f1(my)}L${L.ax-16} ${f1(my+6)}Z" style="fill:var(--accent)"/>`;
    const st=f>=23?'alive':f>=11?'stressed':'dead',ca=st==='alive'?0:st==='stressed'?.4:1,glu=st==='alive'?0:st==='stressed'?.5:1;
    g+=neuron(L.nx,L.ny,L.nr,{state:st,ca,glu,axon:N?20:50,seed:6});
    if(!N){g+=`<text x="${L.nx+10}" y="${L.ny-128}" class="t-big t-mid" style="font-size:30px">${Math.round(f)}</text><text x="${L.nx+10}" y="${L.ny-112}" class="t-xs t-mid">mL/100 g/min now</text><text x="${L.nx+10}" y="${L.ny+120}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${{alive:'working',stressed:'silent, still alive',dead:'dying'}[st]}</text>`}
    else g+=`<text x="${L.nx-40}" y="${L.ny+5}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${{alive:'working',stressed:'silent, still alive',dead:'dying'}[st]}</text>`;
    ls.innerHTML=g;const Z=CAS_LZ.find(z=>f>=z.min);$('#caLadNote').innerHTML=noteHTML(Z)}
  playWire(lr,$('#caLadPlay'),drawLad,14000,'%t:player.replay%','cascade');
  drawLad(+lr.value);

  /* ---------- collaterals ---------- */
  const cs=$('#caCol'),cr=$('#caColT');let cok='good';
  const CAS_LINKS=[ [ [62,60],[80,84] ],[ [112,40],[118,70] ],[ [176,36],[170,66] ],[ [238,96],[212,92] ],[ [222,128],[196,118] ],[ [176,158],[160,138] ] ];
  function drawCol(t){const N=vb(cs,'720 320','400 600'),good=cok==='good',L=N?{bx:30,by:10,bs:1.13,px:12,py:320,pw:376,rows:96,bw:210}:{bx:6,by:26,bs:1.08,px:352,py:18,pw:360,rows:96,bw:200};
    const core=good?lerp(6,14,t):lerp(6,62,t),B=brainSide(L.bx,L.by,L.bs,{vessels:{occl:'m1',ph:t*30,flow:1,op:.9},lesion:{core,penumbra:68,mca:true}});let g=B.svg;
    const T=p=>[L.bx+p[0]*L.bs,L.by+p[1]*L.bs],n=good?6:2;
    CAS_LINKS.forEach((P,i)=>{if(i%3!==0&&!good)return;const a=T(P[0]),b=T(P[1]),op=good?1:.55;
      g+=`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:var(--artery-line);stroke-width:3.4;stroke-linecap:round;opacity:${op}"/><path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" style="stroke:var(--wm);stroke-width:1.5;stroke-dasharray:3 5;stroke-dashoffset:${f1(-t*140)};opacity:${op}"/>`});
    const q=T([20,18]);
    g+=`<text x="${L.bx+4}" y="${N?L.by+286:14}" class="t-sm" style="fill:var(--ink);font-weight:700">${good?'Six detours open: core small':'Few detours: core spreads'}</text>`;
    /* published bars */
    const M=[{h:'Infarct growth, cm³',a:'poor collaterals',va:52.3,b:'good collaterals',vb:.9,mx:60,sel:good?1:0,f:v=>v.toFixed(1)},
             {h:'Median penumbral salvage, cm³',a:'poor collaterals',va:0,b:'good collaterals',vb:5.9,mx:7,sel:good?1:0,f:v=>v===0?'0':v.toFixed(1)},
             {h:'Functional independence, %',a:'fast progressors',va:35,b:'slow progressors',vb:61,mx:70,sel:good?1:0,f:v=>v+'%'}];
    M.forEach((m,i)=>{const y=L.py+i*L.rows;g+=`<text x="${L.px}" y="${y+12}" class="t-lbl">${m.h}</text>`;
      [ [m.a,m.va,0],[m.b,m.vb,1]].forEach(([l,v,k])=>{const yy=y+20+k*28,x0=L.px+(N?118:118),bw=N?190:170,on=k===m.sel;
        g+=`<text x="${x0-6}" y="${yy+15}" class="t-xs t-end" style="fill:var(--ink)${on?';font-weight:700':''}">${l}</text><rect x="${x0}" y="${yy+3}" width="${f1(Math.max(1.5,bw*v/m.mx))}" height="17" rx="3" style="fill:${on?'var(--brand)':'var(--device)'};opacity:${on?1:.6}"/><text x="${f1(x0+Math.max(1.5,bw*v/m.mx)+6)}" y="${yy+16}" class="t-sm" style="fill:var(--ink)">${m.f(v)}</text>`})});
    cs.innerHTML=g;const D=CAS_COL[cok];$('#caColNote').innerHTML=noteHTML({k:'Collaterals',t:D.t,txt:D.txt,pt:D.pt,hook:D.hook})}
  const colStop=playWire(cr,$('#caColPlay'),drawCol,10000,'%t:player.replay%','cascade');
  $$('[data-cac]').forEach(b=>b.addEventListener('click',()=>{colStop();cok=b.dataset.cac;$$('[data-cac]').forEach(c=>c.setAttribute('aria-pressed',c===b));drawCol(+cr.value)}));
  drawCol(+cr.value);

  /* ---------- the cascade at one synapse ---------- */
  const zs=$('#caCell'),zr=$('#caCT');let setC=()=>{};
  function drawCell(t){const N=vb(zs,'720 440','400 726'),p=phaseOf(CAS_CS,t),L=N?{nx:200,ny:96,nr:24,bx:40,by:206,bw:320,sx:10,sy:238,sw:380,sh:360,tx:10,ty:636,tw:380}:{nx:120,ny:136,nr:28,bx:20,by:296,bw:200,sx:256,sy:14,sw:456,sh:326,tx:20,ty:358,tw:692};
    const E=1-ramp(t,.02,.2),G=ramp(t,.17,.34),I=ramp(t,.32,.5),En=ramp(t,.5,.64),W=ramp(t,.667,.83),Br=ramp(t,.834,.92),ph=t*60;let g='';
    /* left: the whole neuron */
    const st=t<.3?'alive':t<.62?'stressed':'dead';
    g+=`<text x="${L.nx}" y="${N?16:30}" class="t-xs t-mid" style="letter-spacing:.06em">ONE NEURON</text>`;
    if(W>0&&W<1){[0,1,2].forEach(i=>{const u=((W*2+i/3)%1);g+=`<circle cx="${L.nx}" cy="${L.ny}" r="${f1(L.nr+u*(N?70:88))}" style="fill:none;stroke:var(--penumbra);stroke-width:2;opacity:${f1((1-u)*.9)}"/>`})}
    g+=neuron(L.nx,L.ny,L.nr,{state:st,ca:Math.max(I,En),glu:G,axon:N?0:44,seed:6});
    if(W>0){(N?[ [60,50],[340,50],[60,150],[340,150] ]:[ [34,64],[206,64],[34,240],[206,240] ]).forEach((q,i)=>{const a=ramp(W,.15+.2*i,.5+.2*i);g+=neuron(q[0],q[1],N?9:10,{state:a>.5?'stressed':'alive',axon:0,seed:i+2,op:.9})})}
    /* energy bar */
    g+=`<text x="${L.bx}" y="${L.by-6}" class="t-xs" style="fill:var(--ink)">energy (ATP): ${E>.6?'falling':E>.05?'failing':'gone'}</text><rect x="${L.bx}" y="${L.by}" width="${L.bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${L.by}" width="${f1(Math.max(2,L.bw*E))}" height="12" rx="6" style="fill:var(--good)"/>`;
    /* right: the synapse */
    const X=v=>L.sx+L.sw*v,Y=v=>L.sy+L.sh*v,sc=rng(11);
    g+=`<rect x="${L.sx}" y="${L.sy}" width="${L.sw}" height="${L.sh}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const lab=(x,y,s,a='')=>`<text x="${f1(x)}" y="${f1(y)}" class="t-xs${a}" style="fill:var(--ink);font-weight:600">${s}</text>`;
    if(Br<.5){
      /* presynaptic terminal, cleft, postsynaptic cell */
      g+=`<rect x="${f1(X(.1))}" y="${f1(Y(.03))}" width="${f1(L.sw*.56)}" height="${f1(L.sh*.2)}" rx="22" style="fill:var(--neuron);opacity:.28;stroke:var(--neuron)"/>`+lab(X(.13),Y(.09),'nerve ending');
      for(let i=0;i<7;i++){const vx=X(.17+.065*i),vy=Y(.16-.03*(i%2));g+=`<circle cx="${f1(vx)}" cy="${f1(vy)}" r="6" style="fill:var(--panel);stroke:var(--glu);stroke-width:1.2;opacity:${f1(1-G*.6)}"/>`;if(G<.8)g+=`<circle cx="${f1(vx)}" cy="${f1(vy)}" r="2.2" style="fill:var(--glu)"/>`}
      /* glutamate in the cleft */
      const cy0=Y(.24),cy1=Y(.38),nd=Math.round(4+G*46);for(let i=0;i<nd;i++){const u=sc(),v=sc(),dr=Math.sin(ph*.3+i)*2;g+=`<circle cx="${f1(X(.12+.5*u)+dr)}" cy="${f1(lerp(cy0,cy1,v))}" r="2.6" style="fill:var(--glu)"/>`}
      if(G>.1)g+=lab(X(.71),Y(.3),'glutamate');
      /* astrocyte and failed reuptake */
      g+=`<ellipse cx="${f1(X(.88))}" cy="${f1(Y(.16))}" rx="${f1(L.sw*.085)}" ry="${f1(L.sh*.12)}" style="fill:var(--glia);opacity:.75"/>`+lab(X(.88),Y(.17),'glia',' t-mid');
      g+=`<path d="M${f1(X(.72))} ${f1(Y(.21))}L${f1(X(.8))} ${f1(Y(.18))}" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(E)}"/>`;
      if(E<.5)g+=`<path d="M${f1(X(.74))} ${f1(Y(.15))}l10 12m0 -12l-10 12" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`+lab(X(.69),Y(.235),'no reuptake',' t-mid');
      /* membrane and receptors */
      const my=Y(.4),mh=L.sh*.035;g+=`<rect x="${L.sx+6}" y="${f1(my)}" width="${L.sw-12}" height="${f1(mh)}" style="fill:var(--neuron);opacity:.75"/><rect x="${L.sx+6}" y="${f1(my+mh)}" width="${L.sw-12}" height="${f1(Y(.97)-my-mh)}" rx="10" style="fill:var(--neuron);opacity:.1"/>`;
      const open=clamp(G*1.3)*9,rx=[.32,.58];['AMPA','NMDA'].forEach((n,i)=>{const cx=X(rx[i]);g+=`<rect x="${f1(cx-10-open)}" y="${f1(my-11)}" width="10" height="${f1(mh+22)}" rx="3" style="fill:var(--dx)"/><rect x="${f1(cx+open)}" y="${f1(my-11)}" width="10" height="${f1(mh+22)}" rx="3" style="fill:var(--dx)"/>`+lab(cx+open+14,my+mh+18,n)});
      /* ions in */
      for(let k=0;k<26*I;k++){const u=((k/26+ph*.09)%1+1)%1,i=k%2,cx=X(rx[i])+(k%3-1)*4,yy=lerp(my-14,Y(.9),u),kind=k%3;g+=`<circle cx="${f1(cx+Math.sin(u*9+k)*u*L.sw*.06)}" cy="${f1(yy)}" r="${kind===2?2:3}" style="fill:var(--${['ca','vein','ventricle'][kind]});opacity:${f1(Math.min(1,(1-u)*2.5))}"/>`}
      if(I>.1){const y0=Y(.92);[ ['ca','calcium'],['vein','sodium'],['ventricle','water']].forEach((q,i)=>{const lx=L.sx+14+i*(N?90:110);g+=`<circle cx="${lx}" cy="${f1(y0-3)}" r="4" style="fill:var(--${q[0]})"/>`+lab(lx+8,y0,q[1])})}
      /* enzymes and mitochondrion */
      const mx=X(.8),mY=Y(.62);g+=`<ellipse cx="${f1(mx)}" cy="${f1(mY)}" rx="${f1(L.sw*.085)}" ry="${f1(L.sh*.05)}" style="fill:var(--panel);stroke:var(--ca);stroke-width:2"/><path d="M${f1(mx-L.sw*.06)} ${f1(mY)}q8 -10 16 0t16 0t16 0" style="fill:none;stroke:var(--ca);stroke-width:1.2"/>`+lab(mx,mY+L.sh*.05+32,'mitochondrion',' t-mid');
      if(En>0){for(let i=0;i<8;i++){const a=i/8*6.28+ph*.2,d=L.sw*.09+En*18;g+=`<circle cx="${f1(mx+Math.cos(a)*d)}" cy="${f1(mY+Math.sin(a)*d*.6)}" r="2.6" style="fill:var(--ca);opacity:${f1(En)}"/>`}
        const tags=['proteases','lipases','nucleases','nNOS, PLA2'];tags.forEach((u,i)=>{const a=ramp(En,i*.2,i*.2+.3),tx=X(.06),ty=Y(.52+i*.085);g+=`<g style="opacity:${f1(a)}"><rect x="${f1(tx)}" y="${f1(ty-11)}" width="${u.length*5.6+12}" height="16" rx="8" style="fill:var(--bad-soft)"/><text x="${f1(tx+6)}" y="${f1(ty+1)}" class="t-xs" style="fill:var(--bad);font-weight:700">${u}</text></g>`})}
      if(W>0)g+=lab(X(.55),Y(.86),'K⁺ and glutamate spread the wave',' t-mid');
    }else{
      /* a capillary wall, opening */
      const a=ramp(Br,.5,1),ty=Y(.14),by=Y(.36),n=6,cw=L.sw*.9/n;
      g+=`<g style="opacity:${f1(a)}">`+lab(L.sx+14,Y(.08),'capillary, cut lengthwise');
      g+=`<rect x="${L.sx+L.sw*.05}" y="${f1(ty)}" width="${f1(L.sw*.9)}" height="${f1(by-ty)}" style="fill:var(--artery);opacity:.18"/>`;
      for(let i=0;i<n;i++){const gp=(i%2)*10;[ty-8,by].forEach(yy=>{g+=`<rect x="${f1(L.sx+L.sw*.05+i*cw+gp/2)}" y="${f1(yy)}" width="${f1(cw-3-gp)}" height="8" rx="3" style="fill:var(--vein);opacity:.7"/>`})}
      for(let i=0;i<9;i++){const u=((i/9+ph*.04)%1),x=L.sx+L.sw*.08+u*L.sw*.84;g+=`<ellipse cx="${f1(x)}" cy="${f1((ty+by)/2+Math.sin(i*2)*12)}" rx="7" ry="4.5" style="fill:var(--blood)"/>`}
      for(let k=0;k<14;k++){const i=k%3,u=((k/14+ph*.05)%1),x=L.sx+L.sw*.05+(i*2+1.5)*cw+Math.sin(k*3)*u*40;g+=`<circle cx="${f1(x)}" cy="${f1(by+8+u*L.sh*.3)}" r="2.6" style="fill:var(--oedema);stroke:var(--vein);stroke-width:.6;opacity:${f1(1-u*.8)}"/>`}
      [ [.2,.74],[.5,.82],[.78,.72]].forEach((q,i)=>{const r=13,cx=X(q[0]),cy=Y(q[1]);g+=`<path d="${blob(cx,cy,r,i+3,{n:9,rough:.22})}" style="fill:var(--glia);stroke:var(--ink);stroke-width:.8"/>`});
      g+=lab(X(.5),Y(.62),'fluid and proteins leak out',' t-mid')+lab(X(.5),Y(.94),'immune cells arrive',' t-mid')+lab(X(.02)+8,Y(.42),'MMPs loosen the wall')+'</g>';
    }
    /* Dirnagl's four overlapping phases: order only */
    const TL=[ ['excitotoxicity',0,.42,[0,1,2,3] ],['peri-infarct depolarisations',.16,.6,[4] ],['inflammation',.38,.82,[5] ],['apoptosis',.6,1,[] ] ];
    g+=`<text x="${L.tx}" y="${L.ty-4}" class="t-xs" style="letter-spacing:.06em">ORDER AND OVERLAP ONLY, NO SCALE</text>`;
    TL.forEach((b,i)=>{const y=L.ty+i*19,x=L.tx+L.tw*b[1],w=L.tw*(b[2]-b[1]),on=b[3].includes(p);g+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="16" rx="8" style="fill:${on?'var(--accent-soft)':'var(--panel-2)'};stroke:${on?'var(--accent)':'var(--line)'}"/><text x="${f1(x+8)}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${b[0]}</text>`});
    zs.innerHTML=g;setC(p);$('#caCNote').innerHTML=noteHTML(CAS_CS[p])}
  const zstop=playWire(zr,$('#caCPlay'),drawCell,24000,'%t:player.replay%','cascade');
  setC=stepWire($('#caCSteps'),CAS_CS,zr,drawCell,zstop);
  drawCell(+zr.value);
};
