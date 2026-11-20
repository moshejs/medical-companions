/* =============== 3.4 Complications & cardiogenic shock =============== */
inits.complications=()=>{
  /* ---------- main timeline: the first 90 days ---------- */
  const svg=$('#coSvg'),rg=$('#coT');
  const H1=1/24,D90=90,LN0=Math.log(H1),LN1=Math.log(D90);
  const dayOf=t=>Math.exp(LN0+(LN1-LN0)*clamp(t)),tOf=d=>clamp((Math.log(d)-LN0)/(LN1-LN0));
  const fmtD=d=>d<2?`hour ${Math.max(1,Math.round(d*24))}`:d<14?`day ${Math.round(d)}`:`day ${Math.round(d)} (week ${Math.round(d/7)})`;
  let site='ant';
  /* rows: win = [start, end] in days; segs = shares of cases per window; dot = a cited time point.
     emph = the infarct site the cited studies link it to */
  const ROWS=[
    {id:'vf',n:'VT / VF',stat:'5.7% · 90% within 48 h',win:[H1,2],col:'var(--bad)',emph:['inf']},
    {id:'shock',n:'Cardiogenic shock',stat:'up to 10% · median 5.6 h',win:[H1,2],dot:[5.6/24,'median 5.6 h'],col:'var(--brand)',emph:['ant']},
    {id:'avb',n:'High-degree AV block',stat:'3.2% (PCI era) · 6.9% (lytic)',win:[H1,30],col:'var(--warn)',emph:['inf'],sub:'excess risk: first 30 days'},
    {id:'af',n:'Atrial fibrillation',stat:'6–21% in acute MI',segs:[[H1,2,.30],[2,30,.16],[30,D90,.54]],col:'var(--accent)',emph:[]},
    {id:'mech',n:'Mechanical rupture',stat:'0.27% of STEMI · most in week 1',win:[H1,7],dot:[1,'septal rupture: median 1 d'],col:'var(--clot)',emph:['ant','inf']},
    {id:'lvt',n:'LV thrombus / aneurysm',stat:'up to 15% · 25% anterior',win:[1,D90],col:'var(--necro-fill)',emph:['ant'],drawn:1},
    {id:'peri',n:'Early pericarditis',stat:'1.2% of STEMI',win:[1,7],col:'var(--isch)',emph:[],drawn:1},
    {id:'hf',n:'Heart failure',stat:'23.1% by 30 days (1990s)',win:[1,D90],col:'var(--rx)',emph:[],ramp:1},
    {id:'scd',n:'Sudden death risk',stat:'1.4% a month in month 1',win:[1,D90],col:'var(--ink)',emph:[],fade:1}
  ];
  const isEmph=r=>r.emph.includes(site);
  /* how strongly a row is "on" at day d: 1 inside its window, fading after it */
  const actOf=(r,d)=>{const w=r.win||[r.segs[0][0],r.segs[r.segs.length-1][1]];if(d<w[0])return 0;if(d<=w[1])return 1;return clamp(1-(Math.log(d)-Math.log(w[1]))/1.2)};

  /* a rhythm strip: sinus, VF, complete heart block or AF */
  const AFB=(()=>{const r=rng(11),a=[];let x=0;while(x<300){a.push(x);x+=.42+r()*.58}return a})();
  function strip(x,y,w,h,mode,ph){const mm=2.4,base=y+h*.64;let s=ecgGrid(x,y,w,h,{mm,minor:false});
    const dur=w/(mm*25),N=Math.round(w*1.1);let d='',bi=0;
    for(let i=0;i<=N;i++){const ts=ph+dur*i/N;let v=0;
      if(mode==='vf')v=2.4*Math.sin(2*Math.PI*4.6*ts)+1.5*Math.sin(2*Math.PI*2.8*ts+1.3)+1.1*Math.sin(2*Math.PI*6.4*ts+.4)*(.6+.4*Math.sin(ts*1.7));
      else if(mode==='chb'){const pp=60/80,qp=60/36;v=ecgBeat(ts%pp,{r:0,s:0,t:0})+ecgBeat((ts+.4)%qp,{p:0,r:9,s:3,t:3.4})}
      else if(mode==='af'){while(bi<AFB.length-1&&AFB[bi+1]<=ts)bi++;v=.35*Math.sin(2*Math.PI*7.3*ts)+.25*Math.sin(2*Math.PI*5.1*ts+2)+ecgBeat(ts-AFB[bi],{p:0})}
      else{const per=60/(mode==='tachy'?108:76);v=ecgBeat(ts%per,{})}
      d+=(i?'L':'M')+f1(x+w*i/N)+' '+f1(base-clamp(v,-6,11)*mm)}
    return s+`<path d="${d}" style="fill:none;stroke:var(--ecg-ink);stroke-width:1.4;stroke-linejoin:round"/>`}
  const STRIP={vf:'ventricular fibrillation',tachy:'fast sinus rhythm',chb:'complete heart block',af:'atrial fibrillation',sinus:'sinus rhythm'};

  const STEPS=[
    {from:0,at:tOf(3/24),k:'Hours 0–48',t:'Electrical storm: VT and VF',
     txt:`In APEX-AMI (5,745 people with ST-elevation MI having primary PCI), 5.7% had sustained ventricular tachycardia or fibrillation (VT/VF). 64% of episodes came before the end of catheterisation and 90% within 48 hours of symptom onset. 90-day mortality was 23.2% with VT/VF and 3.6% without; VT/VF after catheterisation carried more risk (33.3%) than earlier VT/VF (17.2%). Early VT/VF was linked to an occluded artery before PCI, inferior infarction and Killip class above I. [[Mehta2009APEX]] Across 21 cohorts, primary VF went with ST elevation and earlier arrival in hospital: abrupt occlusion plus early arrival. [[Gheeraert2006]] The first minutes, CPR and defibrillators are in <a href="#call" data-go="call">The first minutes</a>.`,
     pt:`The first two days carry the highest risk of a dangerous heart rhythm. That is why people are watched on a heart monitor in hospital. [[Mehta2009APEX]]`,
     hook:`About 90% of VT/VF in primary-PCI STEMI occurs within 48 hours of onset. Late VT/VF is worse than early (33.3% vs 17.2% at 90 days). [[Mehta2009APEX]]`},
    {from:tOf(4.2/24),at:tOf(5.6/24),k:'The first hours',t:'Cardiogenic shock',
     txt:`Cardiogenic shock occurs in up to 10% of people right after acute MI; about 40% die by 30 days and close to 50% by 1 year. [[Samsky2021]] In the SHOCK trial, shock began at a median of 5.6 hours after infarction, and most infarcts were anterior. [[Hochman1999SHOCK]] In US STEMI admissions, in-hospital mortality with shock fell from 44.6% in 2003 to 33.8% in 2010, as early revascularisation rose from 30.4% to 50.7%. [[Kolte2014]] The stages and trials are in the two panels below.`,
     pt:`Cardiogenic shock means the heart is too weak to pump enough blood to the body. It is uncommon but serious, and the main treatment proven in trials is opening the blocked artery quickly. [[Samsky2021]]`,
     hook:`Shock is the leading cause of in-hospital death after MI. Immediate revascularisation of the infarct artery is the only shock treatment supported by randomised trials (review before DanGer Shock). [[Samsky2021]]`},
    {from:tOf(10/24),at:tOf(1.4),k:'Days 1–2',t:'Slow beats, AF and the right ventricle',
     txt:`High-degree atrioventricular (AV) block complicated 6.9% of STEMI in the fibrinolytic era and 3.2% with primary PCI, more often with inferior MI and right coronary artery occlusion. Its excess mortality was confined to the first 30 days. [[Meine2005,Gang2012]] Complete heart block raised in-hospital mortality to 20.4% from 8.7%, most of all in anterior STEMI. [[Harikrishnan2015]] In inferior MI, ST elevation in V4R points to right ventricular infarction (sensitivity 88%, specificity 78%); in-hospital mortality was 31% with it and 6% without. [[Zehender1993]] Atrial fibrillation affects 6–21%; 30% of post-MI cases start within 2 days. [[Schmitt2009AF,Jabre2011Community]] The strip shows heart block for an inferior infarct and AF for an anterior one.`,
     pt:`A heart attack can disturb the heart's wiring and make the heartbeat too slow. This is more common when the lower (inferior) wall of the heart is affected. [[Meine2005,Gang2012]]`,
     hook:`Heart block after inferior MI usually reflects RCA occlusion; in the PCI era its excess mortality is confined to the first 30 days. V4R elevation = RV infarction (sens 88%, spec 78%). [[Gang2012,Zehender1993]]`},
    {from:tOf(2.4),at:tOf(4),k:'The first week',t:'Mechanical rupture',
     txt:`The main mechanical complications are papillary muscle rupture (sudden mitral regurgitation), ventricular septal rupture, pseudoaneurysm and free wall rupture. [[Damluji2021]] With early reperfusion they now affect fewer than 0.1% of people after acute MI, but mortality has not fallen in parallel. They occur most often within the first week, often as shock or acute pulmonary oedema; echocardiography usually comes first and surgery is the definitive treatment. [[Gong2021]] Classic teaching often says days 3–5; in GUSTO-I, after clot-busting drugs, septal rupture came at a median of 1 day (0.2% of patients; 30-day mortality 73.8%). [[Crenshaw2000]] Papillary muscle rupture affected 0.029% of US MI admissions, with in-hospital mortality of 36.3%; inferior MI predicted death. [[Bhardwaj2020]] In one series, free wall rupture followed septal rupture in 20 patients. [[Figueras1998]]`,
     pt:`Rarely, a part of the damaged heart tears, usually within the first week. This is an emergency that often needs surgery. [[Gong2021]]`,
     hook:`Mechanical complications: 0.27% of STEMI admissions, 42.4% in-hospital mortality, no improvement 2003–2015. Teach "usually within the first week". [[Elbadawi2019,Gong2021]]`},
    {from:tOf(5.5),at:tOf(14),k:'Weeks 1–4',t:'Clot, bulge and inflamed sac',
     txt:`With optimal imaging, a clot inside the left ventricle (LV thrombus) may occur in up to 15% of STEMI and up to 25% of anterior MI. Standard echo misses many, so contrast echo or cardiac MRI is advised when suspicion is high, and anticoagulation is essential once a clot is found. [[McCarthy2018LVT,Levine2022LVT]] Before routine reperfusion, an LV aneurysm formed in 22% of first MIs, mostly anterior, and none appeared after 3 months; aneurysms forming within 5 days carried 80% 1-year mortality. [[Visser1986]] Early pericarditis complicated 1.2% of STEMI in Israel and has become rarer. [[Lador2018]] Post-MI pericarditis belongs to the post-cardiac injury syndromes (Dressler syndrome is one), thought to be immune-mediated and treated with anti-inflammatory drugs plus colchicine. [[Imazio2013]]`,
     pt:`A blood clot can form inside a weakened heart chamber. Doctors check with heart scans and use blood thinners if they find one. [[McCarthy2018LVT]]`,
     hook:`LV thrombus: most common after anterior MI (up to 25%); cardiac MRI is more sensitive than echo. [[McCarthy2018LVT,Levine2022LVT]]`},
    {from:tOf(24),at:tOf(60),k:'Month 1 onward',t:'Heart failure and sudden death',
     txt:`In Framingham, 23.1% of people had heart failure within 30 days of a first MI in the 1990s, up from 10% in the 1970s, while 30-day mortality fell from 12.2% to 4.1%. [[Velagaleti2008]] Delayed-onset heart failure carried more risk than early-onset. [[Gerber2016]] In VALIANT, sudden death or resuscitated arrest was highest in the first 30 days (1.4% a month; 2.3% with LVEF ≤30%), falling to 0.14% a month after 2 years. [[Solomon2005VALIANT]] 54% of post-MI atrial fibrillation began after day 30, and that late AF carried the highest mortality (HR 2.58). [[Jabre2011Community]] See the defibrillator panel below.`,
     pt:`Some people develop heart failure after a heart attack, meaning the heart cannot pump as well as before. Because more people now survive the heart attack itself, more live with heart failure afterwards. [[Velagaleti2008]]`,
     hook:`Sudden death risk after MI peaks in the first 30 days (VALIANT 1.4%/month), yet early ICDs (DINAMIT, IRIS) did not lower total mortality. [[Solomon2005VALIANT,Hohnloser2004DINAMIT,Steinbeck2009IRIS]]`}
  ];
  const stripMode=ph=>[ 'vf','tachy',site==='inf'?'chb':'af','tachy','sinus','af' ][ph];

  function draw(t){
    const N=vb(svg,'720 420','400 742'),d=dayOf(t),ph=phaseOf(STEPS,t);
    const L=N?{cx:200,cy:140,s:1.1,sx:20,sy:262,sw:360,sh:46,x0:20,x1:385,r0:340,rs:40}:{cx:158,cy:186,s:1.28,sx:24,sy:338,sw:272,sh:50,x0:332,x1:705,r0:46,rs:37};
    const X=dd=>L.x0+(L.x1-L.x0)*tOf(dd);
    let s='';
    /* heart: dilates a little as heart failure develops */
    const hfA=ramp(d,7,D90)*.07,sh=L.s*(1+hfA),reop=ramp(d,1.5/24,3/24);
    const terr=site==='ant'?{lad:2}:{rca:2},occA=site==='ant'?{a:'lad',at:.28}:{a:'rca',at:.32};
    if(hfA>.005)s+=`<path d="${smoothPath(HEART_OUT.map(p=>[L.cx+(p[0]-100)*L.s,L.cy+(p[1]-100)*L.s]))}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    const H=heart(L.cx,L.cy,sh,{terr,occl:Object.assign({v:1-reop},occA),stent:Object.assign({v:reop},occA),labels:['lad','rca'],id:'coHt'});
    const P=(lx,ly)=>[L.cx+(lx-100)*sh,L.cy+(ly-100)*sh];
    /* pericardium (behind the heart) */
    const pa=actOf(ROWS[6],d);
    if(pa>0){const PP=HEART_OUT.map(p=>P(100+(p[0]-100)*1.1,100+(p[1]-100)*1.1));s+=`<path d="${smoothPath(PP)}" style="fill:var(--isch-soft);stroke:var(--isch);stroke-width:2.4;stroke-dasharray:5 3;opacity:${f1(.25+.75*pa)}"/>`}
    s+=H.svg;
    if(hfA>.02){const q=P(170,58);s+=`<text x="${f1(q[0])}" y="${f1(q[1])}" class="t-xs" style="fill:var(--rx)">${N?'dilating':'dilating heart'}</text>`}
    /* markers on the heart, numbered like the rows */
    const badge=(i,p,a,col)=>a>0?`<g style="opacity:${f1(.3+.7*a)}"><circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="7.5" style="fill:${col};stroke:var(--panel);stroke-width:1.5"/><text x="${f1(p[0])}" y="${f1(p[1]+3.3)}" class="t-mid" style="font:700 9.5px var(--mono);fill:var(--on-brand)">${i+1}</text></g>`:'';
    const A=ROWS.map(r=>actOf(r,d));
    const pulse=.5+.5*Math.sin(t*260);
    if(A[0]>0){const z=[[66,118],[86,132],[78,140],[104,152],[96,160],[128,170]].map(p=>P(p[0],p[1]));s+=`<path d="${ptsD(z)}" style="fill:none;stroke:var(--bad);stroke-width:${f1(2+1.5*pulse)};stroke-linejoin:round;opacity:${f1(A[0]*(.5+.5*pulse))}"/>`}
    if(A[2]>0){const n=P(90,102),b=[P(96,112),P(108,134),P(118,160)];s+=`<path d="M${f1(n[0])} ${f1(n[1])}${b.map(p=>'L'+f1(p[0])+' '+f1(p[1])).join('')}" style="fill:none;stroke:var(--warn);stroke-width:2;stroke-dasharray:4 3;opacity:${f1(A[2])}"/><circle cx="${f1(n[0])}" cy="${f1(n[1])}" r="4.5" style="fill:var(--warn);opacity:${f1(A[2])}"/>`;
      if(site==='inf'&&ph===2)s+=`<path d="M${f1(n[0]+4)} ${f1(n[1]+8)}l8 8m0 -8l-8 8" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`}
    if(A[3]>0){const a=P(44,92);let w='';for(let i=0;i<=24;i++){const u=i/24;w+=(i?'L':'M')+f1(a[0]+u*26*sh)+' '+f1(a[1]+Math.sin(u*Math.PI*6+t*90)*3*sh)}s+=`<path d="${w}" style="fill:none;stroke:var(--accent);stroke-width:1.8;opacity:${f1(A[3])}"/>`}
    if(A[4]>0){const sp=P(116,140),pm=P(146,152),fw=P(174,124),o=A[4];
      s+=`<circle cx="${f1(sp[0])}" cy="${f1(sp[1])}" r="${f1(4.2*sh)}" style="fill:var(--clot);stroke:var(--cell);stroke-width:1.2;opacity:${f1(o)}"/>`;
      s+=`<path d="M${f1(pm[0])} ${f1(pm[1])}l-6 -16M${f1(pm[0])} ${f1(pm[1])}l4 -15M${f1(pm[0]-3)} ${f1(pm[1]-6)}l4 2" style="stroke:var(--clot);stroke-width:1.8;stroke-linecap:round;opacity:${f1(o)}"/><ellipse cx="${f1(pm[0])}" cy="${f1(pm[1]+4)}" rx="4" ry="6" style="fill:var(--muscle-dark);opacity:${f1(o)}"/>`;
      s+=`<path d="M${f1(fw[0]-2)} ${f1(fw[1]-8)}l5 5l-4 4l5 6" style="fill:none;stroke:var(--clot);stroke-width:2.4;stroke-linecap:round;opacity:${f1(o)}"/>`;
      for(let i=0;i<3;i++)s+=`<circle cx="${f1(fw[0]+8+i*4)}" cy="${f1(fw[1]+2+i*6+pulse*2)}" r="2" style="fill:var(--blood);opacity:${f1(o)}"/>`}
    if(A[5]>0){const ap=P(136,176),bulge=site==='ant'?1:.45;
      s+=`<path d="M${f1(P(118,186)[0])} ${f1(P(118,186)[1])}Q${f1(P(150,214)[0])} ${f1(P(150,214)[1])} ${f1(P(164,176)[0])} ${f1(P(164,176)[1])}" style="fill:none;stroke:var(--necro-fill);stroke-width:2.2;stroke-dasharray:4 2;opacity:${f1(A[5]*bulge)}"/>`;
      s+=`<ellipse cx="${f1(ap[0])}" cy="${f1(ap[1])}" rx="${f1(7*sh*(site==='ant'?1:.7))}" ry="${f1(5*sh*(site==='ant'?1:.7))}" style="fill:var(--clot);stroke:var(--cell);stroke-width:1;stroke-dasharray:2 2;opacity:${f1(A[5])}"/>`}
    /* output arrow from the aorta: thin while shock is active */
    {const sa=A[1]*(ph===1?1:.6),a=P(160,36),b=P(192,36),w=7-5*sa,col=sa>.3?'var(--bad)':'var(--blood)';
      s+=`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0]-6)} ${f1(b[1])}" style="stroke:${col};stroke-width:${f1(w)};opacity:.75"/><path d="M${f1(b[0]-7)} ${f1(b[1]-w/2-4)}L${f1(b[0]+3)} ${f1(b[1])}L${f1(b[0]-7)} ${f1(b[1]+w/2+4)}Z" style="fill:${col};opacity:.75"/><text x="${f1(a[0])}" y="${f1(a[1]-9)}" class="t-xs" style="fill:${sa>.3?'var(--bad)':'var(--muted)'}">${sa>.3?'low output':'output'}</text>`}
    const BP=[P(78,150),P(152,64),P(98,96),P(56,82),P(170,150),P(114,198),P(182,186),P(60,170),P(30,140)];
    ROWS.forEach((r,i)=>{if(i===7||i===8)return;s+=badge(i,BP[i],A[i],r.col==='var(--ink)'?'var(--muted)':r.col)});
    s+=`<text x="${N?L.sx:L.sx}" y="${N?18:24}" class="t-sm" style="fill:var(--brand)">${site==='ant'?'ANTERIOR MI · LAD':'INFERIOR MI · RCA'}</text>`;
    if(reop>.5)s+=`<text x="${N?L.x1:L.sx}" y="${N?18:40}" class="t-xs${N?' t-end':''}">artery reopened (stent)</text>`;
    /* rhythm strip */
    const md=stripMode(ph);
    s+=`<text x="${L.sx}" y="${L.sy-6}" class="t-xs" style="fill:var(--ink)">RHYTHM · ${STRIP[md]}</text>`+strip(L.sx,L.sy,L.sw,L.sh,md,t*80);
    /* timeline rows */
    const yTop=L.r0-14,yAx=L.r0+L.rs*9-4;
    ROWS.forEach((r,i)=>{const y=L.r0+i*L.rs,a=A[i],seen=d>=(r.win?r.win[0]:r.segs[0][0]),em=isEmph(r)&&!(r.id==='mech'&&false);
      s+=`<g style="opacity:${seen?1:.4}"><circle cx="${L.x0+6}" cy="${y-4}" r="6.5" style="fill:${a>0?(r.col==='var(--ink)'?'var(--muted)':r.col):'var(--panel-2)'}"/><text x="${L.x0+6}" y="${y-.8}" class="t-mid" style="font:700 9px var(--mono);fill:${a>0?'var(--on-brand)':'var(--muted)'}">${i+1}</text>`;
      s+=`<text x="${L.x0+17}" y="${y}" class="t-lbl" style="font-size:12px;fill:${em?'var(--brand)':'var(--ink)'}">${r.n}${em?' ◆':''}</text><text x="${L.x1}" y="${y}" class="t-xs t-end" style="fill:${a>0?'var(--ink)':'var(--muted)'}">${r.stat}</text></g>`;
      const by=y+5,bh=8;s+=`<rect x="${L.x0}" y="${by}" width="${L.x1-L.x0}" height="${bh}" rx="3" style="fill:var(--panel-2)"/>`;
      const segs=r.segs||[[r.win[0],r.win[1],1]];
      segs.forEach(g=>{const xa=X(g[0]),xb=X(g[1]),xe=X(Math.min(d,g[1]));
        s+=`<rect x="${f1(xa)}" y="${by}" width="${f1(xb-xa)}" height="${bh}" rx="3" style="fill:none;stroke:${r.col};stroke-width:1;opacity:.45${r.drawn?';stroke-dasharray:3 2':''}"/>`;
        if(d>g[0]){let op=r.segs?.3+g[2]:.85;if(r.ramp)op=.85;s+=r.ramp?`<path d="M${f1(xa)} ${by+bh}L${f1(xe)} ${f1(by+bh-bh*clamp((Math.log(Math.min(d,g[1]))-Math.log(g[0]))/(Math.log(g[1])-Math.log(g[0]))))}L${f1(xe)} ${by+bh}Z" style="fill:${r.col};opacity:.85"/>`
          :r.fade?`<rect x="${f1(xa)}" y="${by}" width="${f1(Math.max(0,X(Math.min(d,30))-xa))}" height="${bh}" rx="3" style="fill:${r.col};opacity:.8"/><rect x="${f1(X(30))}" y="${by}" width="${f1(Math.max(0,xe-X(30)))}" height="${bh}" rx="3" style="fill:${r.col};opacity:.25"/>`
          :`<rect x="${f1(xa)}" y="${by}" width="${f1(Math.max(0,xe-xa))}" height="${bh}" rx="3" style="fill:${r.col};opacity:${f1(op)}"/>`;
          if(r.segs&&d>g[0])s+=`<text x="${f1((xa+Math.min(xb,Math.max(xe,xa+20)))/2)}" y="${by+bh+10}" class="t-xs t-mid" style="fill:var(--ink)">${Math.round(g[2]*100)}%</text>`}});
      if(r.dot&&d>=r.dot[0]){const xd=X(r.dot[0]);s+=`<circle cx="${f1(xd)}" cy="${by+bh/2}" r="4.5" style="fill:var(--panel);stroke:${r.col};stroke-width:2.2"/><text x="${f1(xd+7)}" y="${by+bh+10}" class="t-xs" style="fill:var(--ink)">${r.dot[1]}</text>`}
      if(r.sub&&d>=r.win[0])s+=`<text x="${f1(X(r.win[1]))}" y="${by+bh+10}" class="t-xs t-end">${r.sub}</text>`;
      });
    if(!N)s+=`<text x="${L.x0}" y="${yTop-8}" class="t-sm" style="fill:var(--brand)">WHEN COMPLICATIONS APPEAR · first 90 days</text>`;
    else s+=`<text x="${L.x0}" y="${yTop-6}" class="t-sm" style="fill:var(--brand)">FIRST 90 DAYS</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${yAx}" y2="${yAx}" class="axis"/>`;
    [[H1,'1 h'],[6/24,'6 h'],[1,'1 d'],[2,'2 d'],[7,'1 wk'],[30,'30 d'],[D90,'90 d']].forEach(([v,l])=>{const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${yAx-4}" y2="${yAx+4}" class="axis"/><text x="${f1(Math.min(xx,L.x1-8))}" y="${yAx+15}" class="t-xs t-mid">${l}</text>`});
    const xN=X(d);s+=`<line x1="${f1(xN)}" x2="${f1(xN)}" y1="${yTop}" y2="${yAx}" style="stroke:var(--brand);stroke-width:1.6;opacity:.7"/><rect x="${f1(clamp(xN-34,L.x0,L.x1-68))}" y="${yAx-22}" width="68" height="15" rx="4" style="fill:var(--brand)"/><text x="${f1(clamp(xN,L.x0+34,L.x1-34))}" y="${yAx-11}" class="t-mid" style="font:600 9.5px var(--mono);fill:var(--on-brand)">${d<2?Math.max(1,Math.round(d*24))+' h':Math.round(d)+' d'}</text>`;
    svg.innerHTML=s;
    setSt(ph);
    const on=ROWS.filter((r,i)=>A[i]===1).map(r=>r.n+(isEmph(r)?' ◆':''));
    const SITE={ant:'Anterior MI: in the cited studies, septal rupture, LV thrombus (up to 25%) and aneurysm were linked to anterior infarcts, and most infarcts in the SHOCK trial were anterior. [[Crenshaw2000,McCarthy2018LVT,Visser1986,Hochman1999SHOCK]]',
      inf:'Inferior MI: high-degree AV block, early VT/VF (HR 2.16) and right ventricular infarction were linked to inferior infarcts, and inferior MI predicted death after papillary muscle rupture. [[Meine2005,Mehta2009APEX,Zehender1993,Bhardwaj2020]]'};
    $('#coRead').innerHTML=`<span>time <b>${fmtD(d)}</b></span><span>in their window now <b>${on.length?on.join(', '):'none'}</b></span><span>${SITE[site]}</span>`;
    $('#coNote').innerHTML=noteHTML(STEPS[ph]);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#coPlay'),draw,24000,'Replay','complications');
  setSt=stepWire($('#coSteps'),STEPS,rg,draw,stop);
  $$('[data-cosite]').forEach(b=>b.addEventListener('click',()=>{site=b.dataset.cosite;$$('[data-cosite]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- cardiogenic shock: SCAI stages ---------- */
  const ss=$('#coShSvg'),sr=$('#coShT');
  const SC=['A','B','C','D','E'],SCN=['at risk','beginning','classic','deteriorating','extremis'];
  /* schematic needle positions per stage (0..1): direction only */
  const OUT=[.82,.62,.44,.3,.14],PRS=[.8,.56,.44,.3,.15],PERF=[.86,.8,.42,.26,.1];
  const knot=(K,t)=>{const u=clamp(t)*4.999-.5;if(u<=0)return K[0];const i=Math.min(3,Math.floor(u)),f=ease(clamp(u-i));return lerp(K[i],K[i+1],f)};
  const SH_STEPS=[
    {from:0,at:.1,k:'SCAI stage A',t:'At risk',
     txt:`The SCAI classification stages shock from A to E. Stage A is "at risk". [[Baran2019SCAI]] Cardiogenic shock occurs in up to 10% of people right after acute MI. [[Samsky2021]] In US STEMI admissions, shock rose from 6.5% in 2003 to 10.1% in 2010. [[Kolte2014]]`,
     pt:`The heart is damaged, but the body is still getting enough blood.`,
     hook:`SCAI stages: A at risk, B beginning, C classic, D deteriorating, E extremis. [[Baran2019SCAI]]`},
    {from:.2,at:.3,k:'SCAI stage B',t:'Beginning',
     txt:`Stage B is "beginning" shock, without hypoperfusion: pump output and pressure are falling, but the organs are still getting enough blood. That is why the organ-flow needle holds up here. [[Baran2019SCAI]]`,
     pt:`The heart is starting to struggle, but the organs are still coping.`,
     hook:`The line between B and C is hypoperfusion: B is without it, C has it. [[Baran2019SCAI]]`},
    {from:.4,at:.5,k:'SCAI stage C',t:'Classic shock',
     txt:`Stage C is "classic" shock, with hypoperfusion present. [[Baran2019SCAI]] Cardiogenic shock is end-organ hypoperfusion from heart failure, often with multisystem organ failure. [[vanDiepen2017]] Immediate revascularisation of the infarct artery is the only shock treatment supported by randomised trials. [[Samsky2021]] ESC 2023 states: "Early revascularization with either PCI or CABG is recommended for patients with AMI complicated by CS". [[Byrne2023ESC]] With several narrowed arteries, CULPRIT-SHOCK favoured treating the culprit lesion first. [[Thiele2017CULPRIT]]`,
     pt:`The organs are not getting enough blood. Opening the blocked artery quickly is the treatment proven in trials. [[Samsky2021]]`,
     hook:`In shock with multivessel disease: culprit-only PCI first (CULPRIT-SHOCK, death or RRT 45.9% vs 55.4%). [[Thiele2017CULPRIT]]`},
    {from:.6,at:.7,k:'SCAI stage D',t:'Deteriorating',
     txt:`Stage D is "deteriorating": no stability after at least 30 minutes of initial treatment. [[Baran2019SCAI]] This is where mechanical support devices are often considered, yet the randomised evidence is mixed: routine balloon pumps (IABP-SHOCK II) and routine ECLS (ECLS-SHOCK) did not lower death, while a microaxial pump (DanGer Shock) lowered 180-day death in selected STEMI shock, with more complications. [[Thiele2012IABP,Thiele2023ECLS,Moller2024DanGer]] The AHA statement calls for regional systems of care. [[vanDiepen2017]]`,
     pt:`The first treatments are not enough. Machines that help the heart pump may be used, but trials show they help only some people.`,
     hook:`IABP-SHOCK II and ECLS-SHOCK: neutral. DanGer Shock: lower 180-day death (45.8% vs 58.5%), more complications. [[Thiele2012IABP,Thiele2023ECLS,Moller2024DanGer]]`},
    {from:.8,at:.92,k:'SCAI stage E',t:'Extremis',
     txt:`Stage E is "extremis", the most severe stage. [[Baran2019SCAI]] Despite improving survival, morbidity and mortality in cardiogenic shock remain high and few interventions clearly improve outcomes. [[vanDiepen2017]] About 40% of people with shock after MI die by 30 days. [[Samsky2021]] These are population statistics.`,
     pt:`This is the most severe stage: the body is failing despite treatment.`,
     hook:`Shock after MI: about 40% mortality at 30 days, approaching 50% at 1 year. [[Samsky2021]]`}
  ];
  let setSh=()=>{};
  function gaugeQ(cx,cy,r,v,label){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))];
    const arc=(u0,u1,rr)=>{const a=P(u0,rr),b=P(u1,rr);return `M${f1(a[0])} ${f1(a[1])}A${rr} ${rr} 0 0 1 ${f1(b[0])} ${f1(b[1])}`};
    let g=`<path d="${arc(0,.33,r-6)}" style="fill:none;stroke:var(--bad-soft);stroke-width:12"/><path d="${arc(.33,.66,r-6)}" style="fill:none;stroke:var(--warn-soft);stroke-width:12"/><path d="${arc(.66,1,r-6)}" style="fill:none;stroke:var(--good-soft);stroke-width:12"/>`;
    const p=P(v,r-16);g+=`<line x1="${cx}" y1="${cy}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:${v<.35?'var(--bad)':'var(--ink)'};stroke-width:2.8;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="4" style="fill:var(--ink)"/>`;
    g+=`<text x="${f1(cx-r+4)}" y="${cy+13}" class="t-xs t-mid">low</text><text x="${f1(cx+r-4)}" y="${cy+13}" class="t-xs t-mid">normal</text><text x="${cx}" y="${cy+28}" class="t-lbl t-mid" style="font-size:12px">${label}</text>`;
    return g}
  function kidney(x,y,s,op){return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="opacity:${f1(op)}"><path d="M-6 -14C-18 -14 -22 0 -18 10C-14 18 -4 16 -4 8C-4 2 -8 0 -8 -4C-8 -8 -2 -8 -2 -12C-2 -14 -4 -14 -6 -14Z" style="fill:var(--muscle-dark)"/><path d="M6 -14C18 -14 22 0 18 10C14 18 4 16 4 8C4 2 8 0 8 -4C8 -8 2 -8 2 -12C2 -14 4 -14 6 -14Z" style="fill:var(--muscle-dark)"/></g>`}
  function drawSh(t){const N=vb(ss,'720 360','400 540'),k=Math.min(4,Math.floor(clamp(t)*5)),out=knot(OUT,t),prs=knot(PRS,t),perf=knot(PERF,t);
    const L=N?{hx:110,hy:150,hs:.82,ox:318,oy1:90,oy2:210,g:[[72,372],[200,372],[328,372]],gr:48,sx:20,sy:452,sw:360}
             :{hx:120,hy:150,hs:.8,ox:315,oy1:90,oy2:215,g:[[420,150],[540,150],[660,150]],gr:46,sx:20,sy:276,sw:680};
    let s='';
    const reop=ramp(t,.46,.56);
    s+=heart(L.hx,L.hy,L.hs,{terr:{lad:2},occl:{a:'lad',at:.28,v:1-reop},stent:{a:'lad',at:.28,v:reop},id:'coShH'}).svg;
    if(reop>.3)s+=`<text x="${L.hx}" y="${f1(L.hy+L.hs*112)}" class="t-xs t-mid" style="fill:var(--rx)">culprit artery reopened</text>`;
    /* flow arrows to the organs */
    const fw=f1(1.5+8*out);
    [[L.oy1,'kidneys'],[L.oy2,'other organs']].forEach(([oy,l],i)=>{const x0=L.hx+L.hs*80,y0=L.hy-L.hs*40+i*L.hs*60;
      const ex=L.ox-40,hw=+fw/2+5;s+=`<path d="M${f1(x0)} ${f1(y0)}C${f1(x0+50)} ${f1(y0)} ${f1(L.ox-80)} ${oy} ${f1(ex)} ${oy}" style="fill:none;stroke:var(--blood);stroke-width:${fw};opacity:${f1(.3+.6*out)}"/><path d="M${f1(ex-2)} ${f1(oy-hw)}L${f1(ex+12)} ${oy}L${f1(ex-2)} ${f1(oy+hw)}Z" style="fill:var(--blood);opacity:${f1(.3+.6*out)}"/>`;
      for(let j=0;j<3;j++){const u=((t*30+j/3)%1),bx=lerp(x0,L.ox-40,u),by=lerp(y0,oy,u*u*(3-2*u));s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(1.5+2.5*out)}" style="fill:var(--blood);opacity:${f1(out)}"/>`}
      const op=.25+.75*perf;
      if(i===0)s+=kidney(L.ox,oy,1.1,op);else s+=`<path d="M${L.ox-20} ${oy-8}C${L.ox-10} ${oy-20} ${L.ox+22} ${oy-16} ${L.ox+22} ${oy-4}C${L.ox+22} ${oy+10} ${L.ox-2} ${oy+14} ${L.ox-20} ${oy+4}Z" style="fill:var(--muscle-dark);opacity:${f1(op)}"/>`;
      s+=`<text x="${L.ox}" y="${oy+30}" class="t-xs t-mid" style="fill:${perf<.35?'var(--bad)':'var(--ink)'}">${l}${perf<.35?(N?' · failing':' · under-perfused'):''}</text>`});
    L.g.forEach((c,i)=>s+=gaugeQ(c[0],c[1],L.gr,[out,prs,perf][i],['Pump output','Pressure','Organ blood flow'][i]));
    /* SCAI strip */
    const sw=L.sw/5;
    SC.forEach((c,i)=>{const x=L.sx+i*sw,on=i===k;s+=`<rect x="${f1(x+2)}" y="${L.sy}" width="${f1(sw-4)}" height="30" rx="7" style="fill:${on?'var(--brand)':i<k?'var(--brand-soft)':'var(--panel-2)'};stroke:${on?'var(--brand)':'var(--line)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-mid" style="font:800 15px var(--display);fill:${on?'var(--on-brand)':'var(--ink)'}">${c}</text>`;
      if(!N)s+=`<text x="${f1(x+sw/2)}" y="${L.sy+47}" class="t-xs t-mid" style="fill:${on?'var(--brand)':'var(--muted)'}">${SCN[i]}</text>`});
    const mx=L.sx+L.sw*clamp(t);s+=`<path d="M${f1(mx)} ${L.sy-3}l-5 -8h10z" style="fill:var(--ink)"/>`;
    s+=`<text x="${L.sx}" y="${N?L.sy+54:L.sy-14}" class="t-sm" style="fill:var(--brand)">SCAI ${SC[k]} · ${SCN[k].toUpperCase()}${k===1?' (no hypoperfusion)':k===2?' (hypoperfusion)':''}</text>`;
    s+=`<text x="${N?20:20}" y="${N?20:24}" class="t-sm" style="fill:var(--brand)">${N?'PUMP → ORGANS':'THE PUMP AND THE ORGANS IT FEEDS'}</text>`;
    ss.innerHTML=s;setSh(Math.min(4,phaseOf(SH_STEPS,t)));$('#coShNote').innerHTML=noteHTML(SH_STEPS[phaseOf(SH_STEPS,t)]);
  }
  const stopSh=playWire(sr,$('#coShPlay'),drawSh,15000,'Replay','complications');
  setSh=stepWire($('#coShSteps'),SH_STEPS,sr,drawSh,stopSh);
  drawSh(+sr.value);

  /* ---------- trials board ---------- */
  const ts=$('#coTrSvg');
  const TR={
    shock:{n:'SHOCK',y:1999,o:'30-day death',a:['Early revascularisation','Medical stabilisation'],v:[46.7,56.0],note:'P=0.11, not significant',
      txt:`302 people with shock from LV failure after MI were randomised to emergency revascularisation (by CABG or angioplasty) or initial medical stabilisation; a balloon pump was used in 86% of both groups. 30-day mortality, the primary endpoint, was 46.7% vs 56.0%, not significant. But 6-month mortality was lower (50.3% vs 63.1%), and survival was better at 1 year (46.7% vs 33.6%) and 6 years (32.8% vs 19.6%; HR 0.74). [[Hochman1999SHOCK,Hochman2001SHOCK1y,Hochman2006SHOCKlong]]`,
      pt:`Opening the artery fast did not change survival at one month, but more people were alive months and years later.`,
      hook:`SHOCK: early revascularisation was neutral at 30 days but improved survival at 6 months, 1 year and 6 years. [[Hochman1999SHOCK,Hochman2006SHOCKlong]]`},
    iabp:{n:'IABP-SHOCK II',y:2012,o:'30-day death',a:['Balloon pump (IABP)','No IABP'],v:[39.7,41.3],note:'RR 0.96, P=0.69',
      txt:`600 people with MI and cardiogenic shock, all planned for early revascularisation, were randomised to an intra-aortic balloon pump or none. 30-day mortality was 39.7% vs 41.3% (RR 0.96). At 12 months, 52% vs 51% had died, and quality of life did not differ. [[Thiele2012IABP,Thiele2013IABP]]`,
      pt:`A balloon pump in the main artery did not help people live longer.`,
      hook:`IABP-SHOCK II: routine IABP did not reduce mortality at 30 days or 12 months. [[Thiele2012IABP,Thiele2013IABP]]`},
    culprit:{n:'CULPRIT-SHOCK',y:2017,o:'30-day death or dialysis',a:['Culprit lesion only','Immediate multivessel PCI'],v:[45.9,55.4],note:'RR 0.83',
      txt:`706 people with MI, shock and disease in several arteries: treating only the culprit lesion, with optional staged PCI later, beat immediate PCI of all narrowings. Death or renal-replacement therapy at 30 days was 45.9% vs 55.4% (RR 0.83), and death alone had an RR of 0.84. [[Thiele2017CULPRIT]] At 1 year, death was 50.0% vs 56.9%, with more repeat revascularisation after culprit-only PCI. [[Thiele2018CULPRIT1y]]`,
      pt:`When the heart is in shock, fixing just the artery causing the heart attack first worked better than fixing every narrowing at once.`,
      hook:`CULPRIT-SHOCK: culprit-only PCI first in shock with multivessel disease. Contrast COMPLETE in stable STEMI. [[Thiele2017CULPRIT,Mehta2019COMPLETE]]`},
    ecls:{n:'ECLS-SHOCK',y:2023,o:'30-day death',a:['Early ECLS','No ECLS'],v:[47.8,49.0],note:'RR 0.98',
      txt:`417 people analysed: early veno-arterial extracorporeal life support (ECLS), a heart-lung machine at the bedside, did not lower 30-day death (47.8% vs 49.0%). It raised moderate or severe bleeding (23.4% vs 9.6%) and peripheral vascular complications needing intervention (11.0% vs 3.8%). [[Thiele2023ECLS]]`,
      pt:`A bedside heart-lung machine did not help more people survive, and it caused more bleeding.`,
      hook:`ECLS-SHOCK: neutral for 30-day death, more bleeding and vascular complications. [[Thiele2023ECLS]]`},
    danger:{n:'DanGer Shock',y:2024,o:'180-day death',a:['Microaxial pump + care','Standard care'],v:[45.8,58.5],note:'HR 0.74, P=0.04',
      txt:`355 people with STEMI and cardiogenic shock (median age 67; 79.2% men): a microaxial flow pump (Impella CP) plus standard care lowered death at 180 days, 45.8% vs 58.5% (HR 0.74). A composite of severe bleeding, limb ischaemia, haemolysis, device failure or worsening aortic regurgitation occurred in 24.0% vs 6.2%, and renal-replacement therapy in 41.9% vs 26.7%. [[Moller2024DanGer]]`,
      pt:`A small pump placed in the heart helped more people in this carefully chosen group survive, but caused more complications.`,
      hook:`DanGer Shock: lower 180-day death with a microaxial pump in selected STEMI shock, at the cost of more complications. [[Moller2024DanGer]]`}
  };
  const TK=Object.keys(TR);let trSel='shock',trP=1,trStop=null;
  const SURV=[[0,'30 d',53.3,44.0],[1,'6 mo',49.7,36.9],[2,'1 y',46.7,33.6],[3,'6 y',32.8,19.6]];
  function drawTr(){const N=vb(ts,'720 340','400 720'),p=ease(trP);
    const L=N?{x0:14,x1:386,y0:34,rh:56,ix:[24,214],iy:344,cy:600}:{x0:20,x1:430,y0:40,rh:58,ix:[460,595],iy:62,cy:236};
    const sc=(L.x1-L.x0-44)/70;let s='';
    s+=`<text x="${L.x0}" y="${L.y0-18}" class="t-sm" style="fill:var(--brand)">PRIMARY OUTCOME, %</text>`;
    TK.forEach((k,i)=>{const T=TR[k],y=L.y0+i*L.rh,on=k===trSel,q=on?p:1;
      if(on)s+=`<rect x="${L.x0-8}" y="${y-14}" width="${L.x1-L.x0+16}" height="${L.rh-4}" rx="8" style="fill:var(--brand-soft)"/>`;
      s+=`<text x="${L.x0}" y="${y}" class="t-lbl" style="font-size:12.5px">${T.n} <tspan class="t-xs">${T.y}</tspan></text><text x="${L.x1}" y="${y}" class="t-xs t-end">${T.o}${N?'':' · '+T.note}</text>`;
      T.v.forEach((v,j)=>{const w=v*sc*q,by=y+6+j*15;s+=`<rect x="${L.x0}" y="${by}" width="${f1(w)}" height="12" rx="3" style="fill:${j?'var(--muted)':'var(--brand)'};opacity:${j?.55:.9}"/><text x="${f1(L.x0+w+5)}" y="${by+10}" class="t-xs" style="fill:var(--ink)">${(v*q).toFixed(1)}%</text>`})});
    /* the selected trial per 100 people */
    const T=TR[trSel];
    s+=`<text x="${L.ix[0]}" y="${L.iy-30}" class="t-sm" style="fill:var(--brand)">${T.n.toUpperCase()} · PER 100 PEOPLE</text><text x="${L.ix[0]}" y="${L.iy-16}" class="t-xs">filled = ${T.o}</text>`;
    T.a.forEach((a,j)=>{const I=icons(L.ix[j],L.iy+14,{n:100,cols:10,k:Math.round(T.v[j]*p),size:N?14:8,gap:N?3:2,col:j?'var(--muted)':'var(--brand)'});
      s+=`<text x="${L.ix[j]}" y="${L.iy+4}" class="t-xs" style="fill:var(--ink)">${a}</text>`+I.svg+`<text x="${L.ix[j]}" y="${f1(L.iy+14+I.h+12)}" class="t-lbl" style="font-size:12px;fill:${j?'var(--muted)':'var(--brand)'}">${Math.round(T.v[j]*p)} of 100</text>`});
    if(trSel==='shock'){const cx0=L.ix[0],cx1=N?380:705,cy0=L.cy,cy1=L.cy+(N?100:66),X=i=>lerp(cx0+10,cx1-30,i/3),Y=v=>lerp(cy1,cy0,v/60);
      s+=`<text x="${cx0}" y="${cy0-10}" class="t-xs" style="fill:var(--ink)">SHOCK · % alive over time</text>`;
      [0,20,40,60].forEach(v=>s+=`<line x1="${cx0}" x2="${cx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${cx0-3}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
      [[2,'var(--brand)','revasc.'],[3,'var(--muted)','medical']].forEach(([c,col,l])=>{const n=Math.max(1,Math.ceil(p*4));const pts=SURV.slice(0,n).map(r=>[X(r[0]),Y(r[c])]);
        s+=`<path d="${ptsD(pts)}" style="fill:none;stroke:${col};stroke-width:2.4"/>`+pts.map((q,i)=>`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="3.5" style="fill:${col}"/><text x="${f1(q[0]+5)}" y="${f1(q[1]+(c===2?-6:12))}" class="t-xs" style="fill:${col}">${SURV[i][c]}</text>`).join('');
        if(n===4)s+=`<text x="${f1(X(3)+8)}" y="${f1(Y(SURV[3][c])+(c===2?-16:20))}" class="t-xs" style="fill:${col}">${l}</text>`});
      SURV.forEach(r=>s+=`<text x="${f1(X(r[0]))}" y="${cy1+13}" class="t-xs t-mid">${r[1]}</text>`)}
    ts.innerHTML=s;
    $('#coTrNote').innerHTML=noteHTML({k:`${T.n} · ${T.y}`,t:`${T.a[0]} vs ${T.a[1].toLowerCase()}`,txt:T.txt,pt:T.pt,hook:T.hook});
  }
  $$('[data-cotr]').forEach(b=>b.addEventListener('click',()=>{trSel=b.dataset.cotr;$$('[data-cotr]').forEach(x=>x.setAttribute('aria-pressed',x===b));trStop&&trStop();trP=0;trStop=animate(800,q=>{trP=q;drawTr()},()=>{trStop=null})}));
  drawTr();
  redraws.complications=(prev=>()=>{prev&&prev();drawTr();drawIcd()})(redraws.complications);
  {const prevH=onHide.complications;onHide.complications=()=>{prevH&&prevH();if(trStop){trStop();trStop=null;trP=1}}}

  /* ---------- ICD timing ---------- */
  const is=$('#coIcdSvg');let ef30=false;
  function drawIcd(){const N=vb(is,'720 320','400 470');
    const L=N?{x0:30,x1:385,yb:150,hb:110,bands:200,bh:44}:{x0:60,x1:700,yb:120,hb:90,bands:150,bh:26};
    const X=m=>L.x0+(L.x1-L.x0)*Math.sqrt(clamp(m/24));let s='';
    const r1=ef30?2.3:1.4,Yr=v=>L.yb-L.hb*v/2.5;
    s+=`<text x="${L.x0}" y="${N?16:18}" class="t-sm" style="fill:var(--brand)">SUDDEN DEATH OR ARREST · % PER MONTH (VALIANT)</text>`;
    [0,1,2].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Yr(v))}" y2="${f1(Yr(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-5}" y="${f1(Yr(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<rect x="${f1(X(0))}" y="${f1(Yr(r1))}" width="${f1(X(1)-X(0))}" height="${f1(L.yb-Yr(r1))}" style="fill:var(--bad);opacity:.8"/><text x="${f1(X(1)+5)}" y="${f1(Yr(r1)+10)}" class="t-lbl" style="font-size:12px;fill:var(--bad)">${r1}%/month in month 1${ef30?' (LVEF ≤30%)':''}</text>`;
    s+=`<rect x="${f1(X(23))}" y="${f1(Yr(.14))}" width="${f1(X(24)-X(23))}" height="${f1(L.yb-Yr(.14))}" style="fill:var(--bad);opacity:.8"/><text x="${f1(X(24))}" y="${f1(Yr(.55))}" class="t-xs t-end" style="fill:var(--bad)">0.14%/month after 2 years</text>`;
    s+=`<path d="M${f1(X(1))} ${f1(Yr(r1))}C${f1(X(3))} ${f1(Yr(.5))} ${f1(X(10))} ${f1(Yr(.2))} ${f1(X(23))} ${f1(Yr(.14))}" style="fill:none;stroke:var(--bad);stroke-width:1.4;stroke-dasharray:4 4;opacity:.7"/>`;
    s+=`<line x1="${f1(X(6))}" x2="${f1(X(6))}" y1="${f1(Yr(2.4))}" y2="${L.yb}" style="stroke:var(--ink);stroke-dasharray:2 3;opacity:.5"/><text x="${f1(X(6)+4)}" y="${f1(Yr(N?2.4:1.3))}" class="t-xs" style="fill:var(--ink)">median event: day 180</text>`;
    const d2m=d=>d/30.4;
    const B=[['DINAMIT: ICD 6–40 d · no overall gain',d2m(6),d2m(40),'var(--warn)'],['IRIS: ICD 5–31 d · no overall gain',d2m(5),d2m(31),'var(--warn)'],['VEST: wearable to 90 d · primary endpoint not met',0,d2m(90),'var(--accent)'],['ICD contraindicated until 40–90 d (VEST authors)',0,d2m(40),'var(--muted)'],['PROFID EHRA: from 3 months, recruiting',3,24,'var(--rx)']];
    B.forEach(([l,a,b,col],i)=>{const y=L.bands+i*L.bh,xa=X(a),xb=X(b);
      s+=`<rect x="${f1(xa)}" y="${y}" width="${f1(Math.max(3,xb-xa))}" height="10" rx="3" style="fill:${col};opacity:.75"/>`;
      if(i===3)s+=`<rect x="${f1(X(d2m(40)))}" y="${y}" width="${f1(X(d2m(90))-X(d2m(40)))}" height="10" rx="3" style="fill:none;stroke:${col};stroke-dasharray:3 2"/>`;
      s+=N?`<text x="${L.x0}" y="${y-4}" class="t-xs" style="fill:var(--ink)">${l}</text>`:`<text x="${f1(i===4?xa-6:Math.max(xb,X(d2m(90)))+8)}" y="${y+9}" class="t-xs${i===4?' t-end':''}" style="fill:var(--ink)">${l}</text>`});
    const ya=L.bands+B.length*L.bh+(N?2:6);
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${ya}" y2="${ya}" class="axis"/>`;
    [[0,'0'],[1,'1 mo'],[3,'3 mo'],[6,'6 mo'],[12,'1 y'],[24,'2 y']].forEach(([m,l])=>s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${ya-4}" y2="${ya+4}" class="axis"/><text x="${f1(X(m))}" y="${ya+15}" class="t-xs t-mid">${l}</text>`);
    is.innerHTML=s;
    $('#coIcdNote').innerHTML=noteHTML({k:'VALIANT · DINAMIT · IRIS · VEST · MADIT-II',t:'Highest risk early, but early ICDs did not help',
      txt:`In VALIANT (14,609 people with LV dysfunction or heart failure after MI), 7% died suddenly or were resuscitated, at a median of 180 days. 19% of these events came in the first 30 days, and each 5-point fall in LVEF raised the 30-day risk by 21%. [[Solomon2005VALIANT]] DINAMIT and IRIS implanted ICDs in the first weeks: arrhythmic deaths fell (DINAMIT HR 0.42; IRIS sudden deaths HR 0.55) but non-arrhythmic deaths rose, so total mortality did not change. [[Hohnloser2004DINAMIT,Steinbeck2009IRIS]] In VEST, 1.3% of device wearers received an appropriate shock and 0.6% an inappropriate one. [[Olgin2018VEST]] MADIT-II, outside the early window, showed lower mortality with an ICD (HR 0.69). [[Moss2002MADIT]]`,
      pt:`When the heart muscle is badly weakened, the risk of sudden cardiac arrest is highest in the first month. An implanted defibrillator is usually not fitted right away, because early implants did not help people live longer overall. [[Solomon2005VALIANT,Hohnloser2004DINAMIT]]`,
      hook:`Early ICD (DINAMIT 6–40 d, IRIS 5–31 d): fewer arrhythmic deaths, no fall in total mortality. Wearable (VEST): primary endpoint not met. [[Hohnloser2004DINAMIT,Steinbeck2009IRIS,Olgin2018VEST]]`});
  }
  $('#coEf').addEventListener('click',()=>{ef30=!ef30;$('#coEf').setAttribute('aria-pressed',ef30);drawIcd()});
  drawIcd();
};
