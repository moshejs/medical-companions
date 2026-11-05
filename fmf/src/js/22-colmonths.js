
/* =============== 2.2 colchicine over months =============== */
const CM_STEPS=[
 {from:0,at:.05,k:'Months −3 to 0',t:'Before treatment',
  txt:'Untreated, attacks come every few weeks. SAA soars during attacks (median 693 mg/L in one cohort) and stays above normal between them in some patients. Persistently raised SAA is the fuel for amyloidosis. [[Lachmann2006,Lachmann2007]]',
  pt:'Before treatment, attacks keep coming and hidden inflammation continues between them.',
  hook:'Treat to two targets: <b>no attacks</b> and <b>normal SAA/CRP between attacks</b>.'},
 {from:.111,at:.13,k:'Days 1–14',t:'Drug builds up in white cells',
  txt:'After each dose, leukocyte levels peak about two days later. With a half-life of roughly 27–31 hours on repeated dosing, plasma levels approach steady state within about a week, and leukocyte levels build over a similar or slightly longer span. This is a pharmacokinetic estimate, not a trial result. [[Chappey1993,FDA-Colcrys,BenChetrit2018Textbook]]',
  pt:'For the first week or two the drug is still building up inside the white cells.',
  hook:'Colchicine is daily <b>prophylaxis</b>. During an attack guidelines continue the usual dose and add NSAIDs.'},
 {from:.15,at:.19,k:'Months 1–3',t:'Fewer attacks, slowly visible',
  txt:'Because attacks were weeks apart to begin with, it takes months of observation to see that they have become rarer. EULAR 2016 advised reviewing response, toxicity and adherence every 6 months; a German treat-to-target consensus suggests every 3–6 months. The 1974 placebo-controlled trials used treatment periods of 2–3 months. [[Ozen2016,Ozen2017,Ehlers2023,Zemer1974,Goldstein1974]]',
  pt:'Attacks come less often, but you only notice after a few months because they were weeks apart anyway.',
  hook:'Response is assessed over months. Do not label someone resistant after a few weeks.'},
 {from:.222,at:.27,k:'Months 3–6',t:'Adjusting the dose',
  txt:'Guidelines advise raising the dose stepwise (often 0.25–0.5 mg steps) up to the maximum tolerated if attacks or raised markers persist, checking CRP or SAA at least every 3 months while escalating, and confirming adherence first. EULAR 2016 suggested resistance when ≥1 attack a month continues after ≥6 months at the maximum tolerated dose. A 2021 consensus uses ≥1 attack a month over 3 months or persistent laboratory inflammation. [[Ozen2017,Ehlers2023,Ozen2021]]',
  pt:'If attacks continue, doctors usually raise the dose step by step and check the tablets are being taken every day.',
  hook:'Before "resistance": confirm adherence, then maximize the dose.'},
 {from:.333,at:.6,k:'Months 6–24',t:'SAA normalizes, protection accrues',
  txt:'With full control, SAA between attacks falls into the normal range. In children with high SAA, a dose increase cut median SAA from 244 to 35.5 mg/L within 2 months. Adherent colchicine prevents AA amyloidosis even in patients with occasional attacks. Treatment is lifelong; EULAR 2016 allowed considering dose reduction only after 5+ attack-free years with normal markers. [[Duzova2003,Zemer1986,Lachmann2007,Ozen2017]]',
  pt:'Over time the hidden inflammation settles, which protects the kidneys for the long run. Treatment continues for life.',
  hook:'Colchicine\'s most important job is preventing <b>amyloidosis</b>. Attack control is the visible part.'}
];
const CM_SC={
 full:{n:'Full response',eff:[.95,.95],off:[]},
 partial:{n:'Partial response',eff:[.6,.82],off:[]},
 miss:{n:'Many missed doses',eff:[.95,.95],off:[[150,215],[330,380],[500,575]]},
 resist:{n:'Colchicine-resistant',eff:[.3,.38],off:[]}
};
inits.colmonths=()=>{
  const svg=$('#cmSvg'),rg=$('#cmT');let sc='full';const D0=-90,D1=730,ND=D1-D0;
  function sim(key){const S=CM_SC[key],r=rng(key.length*131+7);const lv=[],ct=[],saa=[],att=[],dose=[],cum=[];let L=0,C=0,cu=0,spike=0;
    for(let i=0;i<=ND;i++){const d=D0+i;const on=d>=0&&!S.off.some(([a,b])=>d>=a&&d<b);
      const dz=d<0?0:(key!=='full'&&d>=120?1:.67);dose.push(dz);
      const target=on?dz/1:0;L+=(target-L)*(on?1/5:1/4);lv.push(L);
      C+=(L-C)/40;ct.push(C);
      const eff=d>=120?S.eff[1]:S.eff[0];const rate=1.6/30*(1-eff*clamp(C*1.25));
      if(r()<rate&&!(att.length&&d-att[att.length-1]<6))att.push(d);
      if(att.length&&att[att.length-1]===d)spike=1;else spike*=.6;
      const base=3+40*(1-eff*clamp(C*1.25));saa.push(base+600*spike);
      cu+=Math.max(0,saa[i]-10);cum.push(cu)}
    return{lv,ct,saa,att,dose,cum}}
  const UNT=(()=>{const s=sim('resist');return s})();
  const SIM={};Object.keys(CM_SC).forEach(k=>SIM[k]=sim(k));
  const untreatedCum=(()=>{let cu=0;const out=[];const r=rng(9);let spike=0,last=-99;for(let i=0;i<=ND;i++){const d=D0+i;if(r()<1.6/30&&d-last>6){last=d;spike=1}else spike*=.6;cu+=Math.max(0,43+600*spike-10);out.push(cu)}return out})();
  function draw(t){
    const _d=Math.round(D0+t*ND), _inset=_d>=0&&_d<60;
    const N=vb(svg,'720 470',_inset?'400 566':'400 452');
    const X0=N?46:70, X1=N?392:700, xd=d=>lerp(X0,X1,(d-D0)/ND);
    const y1=N?26:24,h1=N?70:78, y2=N?128:130,h2=N?56:68, y3=N?210:226,h3=N?86:96, y4=N?322:348,h4=N?70:78;
    const gridBot=y4+h4, axisY=gridBot+16;
    const S=SIM[sc],dNow=Math.round(D0+t*ND),iNow=dNow-D0;let s=`<defs>${marker('cmA')}</defs>`;
    const panel=(y0,h,title,c)=>`<text x="${X0}" y="${y0-3}" class="t-sm" style="fill:${c}">${title}</text><line x1="${X0}" x2="${X1}" y1="${y0+h}" y2="${y0+h}" class="axis"/>`;
    // month grid
    for(const m of (N?[-3,0,6,12,18,24]:[-3,0,3,6,9,12,15,18,21,24])){const x=xd(m*30.4);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="16" y2="${gridBot}" class="grid"/><text x="${f1(x)}" y="${axisY}" class="t-xs t-mid">${m}</text>`}
    s+=N?`<text x="${X0}" y="${axisY+16}" class="t-xs">months since starting · <tspan style="fill:var(--warn)">illustrative model</tspan></text>`:`<text x="${X1}" y="468" class="t-xs t-end">months since starting colchicine</text><text x="${X0}" y="468" class="t-xs" style="fill:var(--warn)">ILLUSTRATIVE MODEL · not measured kinetics</text>`;
    s+=`<rect x="${f1(xd(0))}" y="14" width="${f1(X1-xd(0))}" height="${gridBot-14}" style="fill:var(--crocus-soft);opacity:.35"/>`;
    // panel 1 drug
    s+=panel(y1,h1,'COLCHICINE INSIDE LEUKOCYTES · dashed = prescribed dose','var(--crocus)');
    const sl=(arr,mx,y0,h)=>{let d='';for(let i=0;i<=iNow;i+=2)d+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y0+h-h*clamp(arr[i]/mx));return d};
    s+=`<path d="${sl(S.lv,1.05,y1,h1)}" style="fill:none;stroke:var(--crocus);stroke-width:2.5"/>`;
    s+=`<path d="${sl(S.dose,1.05,y1,h1)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4"/>`;
    CM_SC[sc].off.forEach(([a,b])=>{if(a<=dNow)s+=`<rect x="${f1(xd(a))}" y="${y1+14}" width="${f1(xd(Math.min(b,dNow))-xd(a))}" height="${h1-14}" style="fill:var(--bad);opacity:.12"/><text x="${f1(xd(a)+3)}" y="${y1+26}" class="t-xs" style="fill:var(--bad)">doses missed</text>`});
    // inset: first 3 weeks
    if(dNow>=0&&dNow<60){const ix=N?X0:430,iy=N?axisY+30:30,iw=N?(X1-X0):260,ih=70,k=clamp(dNow/21);s+=`<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="8" style="fill:var(--panel);stroke:var(--line)"/><text x="${ix+8}" y="${iy+14}" class="t-xs">ZOOM · first 21 days</text>`;
      let pd='',ld='';for(let i=0;i<=200*k;i++){const day=i/200*21,ph=day%1;const p=(ph<.06?ph/.06:Math.exp(-(ph-.06)*2.2))*.55+.05;const l=1-Math.exp(-day/4);const x=ix+10+i/200*(iw-20);pd+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*p);ld+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*l)}
      s+=`<path d="${pd}" style="fill:none;stroke:var(--bad);stroke-width:1.2"/><path d="${ld}" style="fill:none;stroke:var(--crocus);stroke-width:2.2"/><text x="${ix+iw-8}" y="${iy+14}" class="t-xs t-end"><tspan style="fill:var(--bad)">plasma</tspan> · <tspan style="fill:var(--crocus)">leukocytes</tspan></text>`}
    // panel 2 attacks
    s+=panel(y2,h2,'ATTACKS','var(--terra)');
    S.att.filter(d=>d<=dNow).forEach(d=>{const x=xd(d);s+=`<path d="M${f1(x-4)} ${y2+h2} L${f1(x)} ${y2+20} L${f1(x+4)} ${y2+h2}z" style="fill:var(--terra)"/>`});
    // panel 3 SAA log
    const lg=v=>clamp(Math.log10(Math.max(1,v))/3);
    s+=panel(y3,h3,'SAA (log scale, mg/L)','var(--gold)');
    s+=`<rect x="${X0}" y="${f1(y3+h3-h3*lg(10))}" width="${X1-X0}" height="${f1(h3*lg(10))}" style="fill:var(--good-soft);opacity:.8"/><text x="${X1-4}" y="${f1(y3+h3-4)}" class="t-xs t-end" style="fill:var(--good)">normal range (&lt;10)</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${X0-6}" y="${f1(y3+h3-h3*lg(v)+3)}" class="t-xs t-end">${v}</text>`);
    let sd='';for(let i=0;i<=iNow;i++)sd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y3+h3-h3*lg(S.saa[i]));s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.6"/>`;
    // panel 4 cumulative inflammatory burden
    const mx=untreatedCum[ND];s+=panel(y4,h4,'CUMULATIVE SAA BURDEN · dashed = never treated','var(--bad)');
    let ud='';for(let i=0;i<=ND;i+=4)ud+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*untreatedCum[i]/mx);s+=`<path d="${ud}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    let cd='';for(let i=0;i<=iNow;i+=2)cd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*S.cum[i]/mx);s+=`<path d="${cd}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
    s+=`<line x1="${f1(xd(dNow))}" x2="${f1(xd(dNow))}" y1="14" y2="${gridBot+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<text x="${f1(xd(0)+4)}" y="${y2+12}" class="t-xs" style="fill:var(--crocus)">colchicine starts ↓</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CM_STEPS,t);setSt(p);
    const last90=S.att.filter(d=>d<=dNow&&d>dNow-90).length;
    const months=(dNow/30.4);
    $('#cmRead').innerHTML=`<span>month <b>${months.toFixed(1)}</b></span><span>attacks in last 90 days <b>${last90}</b></span><span>SAA today <b>${Math.round(S.saa[iNow])} mg/L</b></span><span>drug in leukocytes <b>${S.dose[iNow]>0?Math.min(100,Math.round(100*S.lv[iNow]/S.dose[iNow])):0}%</b> of steady state for the current dose</span>`;
    let extra='';
    if(sc==='partial')extra='<div class="kv"><div><dt>This scenario</dt><dd>Attacks fall but do not stop. At month 4 the dose is raised (dashed line steps up), which helps further. If SAA or attacks persist at the maximum tolerated dose, guidelines add IL-1 blockade. [[Ozen2016]]</dd></div></div>';
    if(sc==='miss')extra='<div class="kv"><div><dt>This scenario</dt><dd>Each gap in doses lets leukocyte levels drain within days, and attacks and SAA return after a lag. Poor adherence is common: in one Israeli clinic only 13% filled every prescription in a year. It is a frequent reason for apparent resistance, and in Zemer\'s cohort it was the difference between 1.7% and 48.9% developing proteinuria. [[BenChetrit2009D,Zemer1986,Ozen2017]]</dd></div></div>';
    if(sc==='resist')extra='<div class="kv"><div><dt>This scenario</dt><dd>Roughly 5–10% of patients keep having attacks or raised markers despite the maximum tolerated dose, and another 2–5% cannot tolerate it. Colchicine is usually continued, because it may still lower amyloid risk, and an IL-1 blocker is added. [[Ozen2017,BenChetrit2018Textbook,Ozen2025,DeBenedetti2018]]</dd></div></div>';
    $('#cmNote').innerHTML=noteHTML(CM_STEPS[p])+extra;
  }
  const stop=playWire(rg,$('#cmPlay'),draw,22000,'Replay','colmonths');
  const setSt=stepWire($('#cmSteps'),CM_STEPS,rg,draw,stop);
  $$('[data-cm]').forEach(b=>b.onclick=()=>{sc=b.dataset.cm;$$('[data-cm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* long view: decades */
  const ls=$('#cmLong'),lr=$('#clT');
  // anchored on Zemer 1986: cumulative proteinuria 48.9% at 9 y without adherence, 1.7% at 11 y with adherence
  const untreated=y=>1-Math.exp(-y*0.0746),adherent=y=>1-Math.exp(-y*0.00156);
  function drawL(t){const NL=vb(ls,'720 260','400 300');const Y=t*12;const x0=NL?46:60,x1=NL?392:700,y0=20,y1=NL?236:210,xy=y=>lerp(x0,x1,y/12),yv=v=>lerp(y1,y0,v/.7);let s='';
    [0,.2,.4,.6].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${x0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${Math.round(v*100)}%</text>`);
    (NL?[0,4,8,12]:[0,2,4,6,8,10,12]).forEach(y=>s+=`<text x="${f1(xy(y))}" y="${y1+18}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${x1}" y="${y1+36}" class="t-xs t-end">years</text><text x="${x0}" y="14" class="t-xs">CUMULATIVE RISK OF AA AMYLOIDOSIS (schematic)</text>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?untreated(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:3"/>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?adherent(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(untreated(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--bad)">${NL?'untreated':'untreated / non-adherent'}</text><text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(adherent(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--crocus)">${NL?'adherent':'adherent colchicine'}</text>`;
    s+=`<circle cx="${f1(xy(9))}" cy="${f1(yv(.489))}" r="5" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/><circle cx="${f1(xy(11))}" cy="${f1(yv(.017))}" r="5" style="fill:none;stroke:var(--crocus);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/>`;
    ls.innerHTML=s;
    $('#clCap').innerHTML=`Year ${Y.toFixed(0)}: untreated ${Math.round(untreated(Y)*100)}% vs adherent ${(adherent(Y)*100).toFixed(1)}%. Curves pass through the circled points from Zemer et al. 1986: cumulative proteinuria 48.9% at 9 years in non-adherent patients and 1.7% at 11 years in adherent ones (1,070 patients). Between and beyond those points the curves are smooth interpolations. Real risk depends strongly on genotype, ancestry and country. [[Zemer1986,Touitou2007]]`}
  playWire(lr,$('#clPlay'),drawL,9000,'Replay','colmonths');drawL(+lr.value);
  $('#cmCards').innerHTML=`
   <div class="card"><h4>Why the benefit is not immediate</h4><ul><li>The drug needs days of daily dosing to build up in leukocytes.</li><li>Attacks were weeks apart, so fewer attacks only shows up over months.</li><li>Doses are adjusted in steps over months.</li><li>The biggest benefit, amyloid prevention, accrues over years.</li></ul></div>
   <div class="card"><h4>A common misunderstanding</h4><p>Taking extra colchicine once an attack has started is not what the guidelines describe, and patients commonly report doing it. EULAR 2016 advises continuing the usual daily dose during an attack and adding NSAIDs for symptoms, while considering other causes of the pain. Separately, it says a temporary increase may be considered during stressful periods known to trigger attacks, and it calls an increase during the warning phase before an attack unproven. [[Ozen2016,Ozen2017,Ozen2025]]</p></div>
   <div class="card"><span class="ev early">Evidence check</span><h4>The trial base is thinner than the reputation</h4><p>In the Cochrane re-analysis only one of the 1974 placebo-controlled trials (Goldstein, RR 0.21, 95% CI 0.05–0.95) was clearly positive; the Zemer 1974 trial was not significant. No randomized trial measured amyloidosis: that benefit rests on Zemer\'s 1986 cohort. [[Yin2022,Goldstein1974,Zemer1974,Zemer1986]]</p></div>
   <div class="card"><h4>Protection without perfection</h4><p>Even patients who still have some attacks are protected from amyloidosis if they take colchicine regularly, because SAA between attacks stays lower. [[Zemer1986,Lachmann2007]]</p></div>`;
};
