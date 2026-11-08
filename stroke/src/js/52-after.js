/* =============== 5.2 Life after stroke =============== */
/* Widgets: the invisible-effects explorer (six effects on one timeline, each with an array of 100 people and a chart of
   published prevalence by time window), life-domain tabs with charts and the DVLA rule explorer, and population curves
   for survival and recurrence. Every number comes from research pass H. rhbBars is shared from 5.1. */
const AFT_FX=[
 {id:'dep',k:'Effect 1 of 6',t:'Depression',head:31,big:'About 31 in 100',sub:'pooled, at any time',
  segs:[{a:.1,b:180,v:31,dash:'band',lab:'pooled, any time: 31%',x:'r',y:-6},
   {a:.1,b:120,v:29,dash:'6 4',lab:'second review: 29%, stable to 10 yr',x:'l',y:14},
   {a:12,b:60,v:25,lab:'1 to 5 yr: 25%',x:'l',y:15},
   {a:60,b:60,v:23,lab:'5 yr: 23%',x:'pr',y:16},
   {a:180,b:180,v:39.1,lab:'15 yr: 39.1%, selected group',x:'pe',y:-9}],
  txt:'Pooled frequency 31% (95% CI 28% to 35%), 61 studies and 25,488 people, unchanged from 33% in the 2005 review [[Hackett2014]]. Two reviews disagree on the course: Hackett reports lower frequency with time, Ayerbe reports stable prevalence [[Hackett2014,Ayerbe2013]]. Predictors include pre-stroke depression and more severe deficit, and depression worsens functional outcome, a reciprocal relationship [[Kutlubaev2014]]. Inflammation, genetic variation, white matter disease and altered neuroplasticity are proposed mechanisms <span class="ev hyp">Hypothesis</span> [[Robinson2016]].',
  pt:'Low mood is common and it can be treated. It is part of the stroke, not a weakness [[Hackett2014,Richards2026]].',
  hook:'Post-stroke depression is about 31% [[Hackett2014]].'},
 {id:'anx',k:'Effect 2 of 6',t:'Anxiety',head:29,big:'About 29 in 100',sub:'in the first year',
  segs:[{a:.1,b:.46,v:36.7,lab:'0 to 2 weeks: 36.7%',x:'l',y:-7},
   {a:.1,b:12,v:29.3,dash:'6 4',lab:'first year, pooled: 29.3%',x:'lc',y:-6},
   {a:.46,b:3,v:24.1,lab:'2 weeks to 3 months: 24.1%',x:'l',y:15},
   {a:3,b:12,v:23.8,lab:'3 to 12 months: 23.8%',x:'l',y:30},
   {a:180,b:180,v:34.9,lab:'15 yr: 34.9%, selected group',x:'pe',y:-9}],
  txt:'Pooled anxiety prevalence in the first year 29.3% (24.8% to 33.8%), with high heterogeneity. It is highest in the first 2 weeks [[Rafsten2018]]. At 15 years in South London, anxiety was 34.9% among survivors, a small, selected group [[Crichton2016]]. Regular benzodiazepines are potentially harmful in anxiety (COR 3: Harm, LOE B-NR) [[Richards2026]].',
  pt:'Worry is common after a stroke, and it is often highest at the very start [[Rafsten2018]].',
  hook:'Anxiety is about 29% [[Rafsten2018]].'},
 {id:'pts',k:'Effect 3 of 6',t:'Post-traumatic stress',head:23,big:'About 23 in 100',sub:'within a year',
  segs:[{a:.1,b:12,v:23,lab:'within 1 year: 23%',x:'l',y:-7},
   {a:12,b:180,v:11,dash:'6 4',lab:'after 1 year: 11%',x:'l',y:-7}],
  txt:'PTSD after stroke or TIA, 9 studies, N=1138: 23% (16% to 33%) within 1 year, 11% (8% to 14%) after 1 year [[Edmondson2013]]. The dashed line shows "after 1 year" as an open-ended window, not a measurement at each point.',
  pt:'A stroke can be frightening. Post-traumatic stress after it is a recognised effect, and it is less common after the first year [[Edmondson2013]].'},
 {id:'fat',k:'Effect 4 of 6',t:'Fatigue',head:48,big:'About 48 in 100',sub:'score of 4 or more',tag:['No single time curve here.','Time of assessment explains part of the spread.'],
  segs:[{a:.1,b:180,v:48,dash:'band',lab:'pooled: 48%',x:'r',y:-6},
   {a:.1,b:180,v:40,dash:'6 4',lab:'guideline: more than 40%',x:'r',y:15}],
  txt:'Pooled prevalence using a Fatigue Severity Scale cut-off of 4 or more: 48% (95% CI 42% to 53%), 35 studies, N=6851. Time of assessment, stroke type and geography explain variation, so no single time curve is drawn [[Alghamdi2021]]. The 2026 guideline gives "&gt;40%" and defines fatigue as not relieved by rest [[Richards2026]]. Cochrane found insufficient evidence on any treatment or prevention [[Wu2015]].',
  pt:'Feeling very tired is common after a stroke, and rest does not always fix it. It is worth telling your team [[Alghamdi2021,Richards2026]].',
  hook:'Fatigue is about 48% [[Alghamdi2021]].'},
 {id:'cog',k:'Effect 5 of 6',t:'Cognition & dementia',head:44,big:'About 44 in 100',sub:'impaired overall, 2 to 6 months',
  segs:[{a:2,b:6,v:44,lab:'2 to 6 months, overall: 44%',x:'l',y:-7},
   {a:2,b:6,v:32.5,band:[30,35],lab:'single domains: 30% to 35%',x:'r6',y:4},
   {a:.1,b:.1,v:10,lab:'dementia: 10% before, 10% soon after a first stroke',ln:'dementia: 10% before, 10% soon after',x:'pr',y:17},
   {a:180,b:180,v:30,lab:'15 yr: 30.0%, selected group',x:'pe',y:18}],
  txt:'STROKOG (3146 people, 13 studies, 8 countries): 44% impaired in global cognition and 30% to 35% in individual domains at 2 to 6 months [[Lo2019]]. 10% had dementia before a first stroke, 10% developed it soon after, and more than a third had it after recurrent stroke. The range runs from 7.4% to 41.3% depending on the kind of study [[Pendlebury2009]]. REGARDS found an acute drop in global cognition, then faster decline [[Levine2015]]. Lack of a harmonised definition is the main challenge [[Rost2022]].',
  pt:'Trouble with thinking is common after a stroke. The 2026 guideline lists cognitive training and exercise. Dementia is more common after a second stroke, so prevention matters [[Richards2026,Pendlebury2009]].',
  hook:'10% dementia soon after first stroke, more than a third after recurrent stroke [[Pendlebury2009]].'},
 {id:'pai',k:'Effect 6 of 6',t:'Pain',head:29,big:'About 29 in 100',sub:'shoulder pain in follow-up',
  segs:[{a:.1,b:180,v:29,dash:'band',lab:'shoulder pain, any time in follow-up: 29%',x:'r',y:-6},
   {a:4,b:12,v:21,lab:'shoulder, 4 and 12 months: 21%',x:'l',y:15},
   {a:.1,b:.1,v:10,lab:'shoulder, baseline: 10%',x:'pr',y:16},
   {a:.1,b:180,v:11,dash:'6 4',lab:'central post-stroke pain, pooled: 11%',x:'r',y:-6}],
  txt:'Hemiplegic shoulder pain, population-based: 10% at baseline, 21% at 4 and 12 months, 29% overall, with peak onset and severity at 4 months [[AdeyWakeling2015]]. Central post-stroke pain pooled 11% (7% to 18%), exceeding 50% with medullary or thalamic stroke [[Liampas2020]]. It is pain with sensory abnormalities in the body parts matching the injured brain territory [[Klit2009]]. Pain is linked to depression, cognitive dysfunction and poor quality of life, and it is underdiagnosed [[Harrison2015]].',
  pt:'Pain after a stroke has several causes, and it can begin weeks or months later. It is often missed, so it is worth mentioning [[Harrison2015,Liampas2020]].',
  hook:'Central pain is about 11% [[Liampas2020]], hemiplegic shoulder pain about 29% [[AdeyWakeling2015]].'}];
const AFT_STEPS=AFT_FX.map((f,i)=>({from:i/6,at:i/6+.125,k:f.k,t:f.t,txt:f.txt,pt:f.pt,hook:f.hook}));
const AFT_TICKS=[ [.46,'2 wk'],[3,'3 mo'],[12,'1 yr'],[60,'5 yr'],[120,'10 yr'],[180,'15 yr'] ];
const AFT_BARS={
 work:[{h:'Back at work, median across studies of young stroke'},{l:'0 to 6 months',v:41,txt:'41%'},{l:'1 year',v:53,txt:'53%'},{l:'1.5 years',v:56,txt:'56%'},{l:'2 to 4 years',v:66,txt:'66%'}],
 young:[{h:'FUTURE: poor outcome (mRS over 2), mean 9.1 years on'},{l:'After TIA',v:16.8,txt:'16.8%'},{l:'After ischaemic stroke',v:36.5,txt:'36.5%'},{l:'After intracerebral haemorrhage',v:49.3,txt:'49.3%'}],
 need:[{h:'UK survey, 1251 people, 1 to 5 years after stroke'},{l:'No unmet needs',v:51,txt:'51%'},{h:'Also reported (the base may differ from the bar above)'},{l:'Unmet need for stroke information',v:54,txt:'54%'},{l:'Lost work activities',v:52,txt:'52%'},{l:'Higher expenses',v:31,txt:'31%'},{l:'Lost income',v:18,txt:'18%'}]};
const AFT_DRIVE={
 '1s':{m:1,h:'Group 1 after a stroke: 1 month',t:'Must not drive. May resume after 1 month with satisfactory clinical recovery. Need not notify the DVLA unless residual neurological deficit remains at 1 month, such as visual field defects, cognitive defects or impaired limb function [[DVLA-Neuro]].'},
 '1t':{m:1,h:'Group 1 after a TIA: 1 month',t:'1 month off driving after each episode [[DVLA-Neuro]].'},
 '2s':{m:12,h:'Group 2 after a stroke: 1 year',t:'Must notify the DVLA. The licence is refused or revoked for 1 year. Relicensing is considered with no debarring residual impairment and no other significant risk factors [[DVLA-Neuro]].'},
 '2t':{m:12,h:'Group 2 after a TIA: 1 year',t:'Must notify the DVLA. The licence is refused or revoked for 1 year. Relicensing is considered with no debarring residual impairment and no other significant risk factors [[DVLA-Neuro]].'}};
const AFT_SV_STEPS=[
 {from:0,at:.16,k:'First months',t:'3 months',
  txt:'Australia and New Zealand, 313,162 people, 2008 to 2017: 79.4% alive at 3 months. Pooled recurrence 3.1% at 30 days; 7.8% at 3 months in the Australian and New Zealand cohort [[Peng2022,Mohan2011]].'},
 {from:.2,at:.32,k:'One year',t:'1 year',
  txt:'73.0% alive at 1 year. Recurrence 11.1% pooled and 11.0% in Australia and New Zealand, close agreement between very different sources [[Peng2022,Mohan2011]].'},
 {from:.42,at:.71,k:'Five years',t:'5 years',
  txt:'52.8% alive at 5 years. Recurrence 26.4% pooled, 19.8% in Australia and New Zealand [[Peng2022,Mohan2011]]. These are averages over everyone in the register.',
  pt:'A second stroke is a real risk for years, so preventing one is lifelong work [[Mohan2011,Maaijwee2014]].',
  hook:'Five-year recurrence 26.4% [[Mohan2011]]; 5-year survival 52.8% [[Peng2022]].'},
 {from:.85,at:1,k:'Ten years',t:'10 years, and the trend',
  txt:'36.4% alive at 10 years, and recurrence 39.2% pooled, 26.8% in Australia and New Zealand. Life expectancy loss was 5.5 years on average (32.7% of predicted) and 7.4 years with haemorrhagic stroke [[Peng2022,Mohan2011]]. In Perth\'s 1989 cohort, 10-year recurrence was 43% [[Hardie2004]]. The better news is the trend: across studies, five-year recurrence risk fell from 32% to 16.2% [[Mohan2011]].',
  pt:'These are not your odds. They are averages over huge groups. And the five-year risk of a second stroke fell across studies [[Mohan2011]].'}];
const AFT_SURV=[ [.25,79.4],[1,73.0],[5,52.8],[10,36.4] ];
const AFT_REC_P=[ [1/12,3.1],[1,11.1],[5,26.4],[10,39.2] ];
const AFT_REC_A=[ [.25,7.8],[1,11.0],[5,19.8],[10,26.8] ];
function aftTX(m){return Math.log10(1+m*2)/Math.log10(361)}
inits.after=()=>{
  /* ---- invisible effects ---- */
  const svg=$('#aftSvg'),rg=$('#aftT');
  function draw(t){
    const N=vb(svg,'720 410','400 740');
    const L=N?{ix:14,iy:82,cols:20,sz:15,gap:3,cx:40,cy:232,cw:344,ch:430}:{ix:18,iy:92,cols:10,sz:17,gap:3,cx:258,cy:42,cw:448,ch:320};
    const idx=Math.min(5,Math.floor(t*6)),u=clamp((t-idx/6)*6),F=AFT_FX[idx];
    const X=m=>L.cx+L.cw*aftTX(m),Y=v=>L.cy+L.ch-L.ch*v/60;
    let s=`<text x="${L.ix}" y="24" class="t-big">${F.t}</text><text x="${L.ix}" y="${N?46:48}" class="t-lbl">${F.big}</text><text x="${L.ix}" y="${N?62:66}" class="t-sm">${F.sub}</text>`;
    const IC=icons(L.ix,L.iy,{n:100,cols:L.cols,k:Math.round(F.head*ease(ramp(u,.04,.4))),size:L.sz,gap:L.gap,col:'var(--rec)',base:'var(--line)',shape:'person'});
    s+=IC.svg;
    /* the chart frame */
    s+=`<text x="${L.cx-30}" y="${L.cy-14}" class="t-lbl">Share affected, by time since stroke</text>`;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="${L.ch}" style="fill:var(--field)"/>`;
    [0,20,40,60].forEach(v=>{s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.cx-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`});
    AFT_TICKS.forEach(([m,l])=>{if(N&&m===120)return;s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${L.cy}" y2="${L.cy+L.ch}" class="grid"/><text x="${f1(X(m))}" y="${L.cy+L.ch+14}" class="t-xs t-mid">${l}</text>`});
    s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${L.cy+L.ch}" y2="${L.cy+L.ch}" class="axis"/><line x1="${L.cx}" x2="${L.cx}" y1="${L.cy}" y2="${L.cy+L.ch}" class="axis"/>`;
    F.segs.forEach((g,j)=>{const p=ease(ramp(u,.1+j*.08,.2+j*.08));if(p<=0)return;
      const xa=g.a<=.1?L.cx:X(g.a),xb=X(g.b),xe=lerp(xa,xb,p),y=Y(g.v);let lab=N&&g.ln?g.ln:g.lab;
      if(g.band){s+=`<rect x="${f1(xa)}" y="${f1(Y(g.band[1]))}" width="${f1(xe-xa)}" height="${f1(Y(g.band[0])-Y(g.band[1]))}" rx="2" style="fill:var(--rec);opacity:.55"/>`}
      else if(g.a===g.b){s+=`<circle cx="${f1(xa)}" cy="${f1(y)}" r="${f1(5.5*p)}" style="fill:var(--rec);stroke:var(--panel);stroke-width:1.5"/>`}
      else if(g.dash==='band'){s+=`<line x1="${f1(xa)}" x2="${f1(xe)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--brand);stroke-width:2"/>`}
      else s+=`<line x1="${f1(xa)}" x2="${f1(xe)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--rec);stroke-width:${g.dash?2:4};stroke-linecap:round${g.dash?';stroke-dasharray:'+g.dash:''}"/>`;
      /* its label, placed by the data entry so that nothing collides */
      let lx=xa+6,an='',ly=y+g.y;
      if(g.x==='l')lx=xa+2;
      if(g.x==='l0')lx=L.cx+6;
      if(g.x==='lc')lx=X(.46)+6;
      if(g.x==='r'){lx=L.cx+L.cw-4;an='t-end'}
      if(g.x==='r6'){lx=xb+8;}
      if(g.x==='pr'){lx=xa+7}
      if(g.x==='pe'){lx=xa-2;an='t-end'}
      s+=aftLab(lx,ly,lab,an,ramp(u,.18+j*.08,.26+j*.08))});
    if(F.tag&&u>.45)F.tag.forEach((l,i)=>{s+=aftLab(L.cx+L.cw/2,Y(22)+i*16,l,'t-mid',ramp(u,.45,.55))});
    svg.innerHTML=s;
    const p=phaseOf(AFT_STEPS,t);setSt(p);$('#aftNote').innerHTML=noteHTML(AFT_STEPS[p]);
  }
  const stop=playWire(rg,$('#aftPlay'),draw,36000,'%t:player.replay%','after');
  const setSt=stepWire($('#aftSteps'),AFT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- life tabs ---- */
  const tabs=$('#aftTabs');let tab='work',drL='1',drE='s';
  const drawDrive=()=>{const el=$('#aftC-drive'),N=NARROW(),W=N?400:720,x0=N?14:24,w=W-x0*2,D=AFT_DRIVE[drL+drE],X=m=>x0+w*m/12,y=46;
    el.setAttribute('viewBox',`0 0 ${W} 130`);
    let s=`<text x="${x0}" y="20" class="t-lbl">Time off driving, UK DVLA rules as published</text>`;
    s+=`<rect x="${x0}" y="${y}" width="${w}" height="26" rx="4" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(X(D.m)-x0)}" height="26" rx="4" style="fill:var(--warn)"/>`;
    [0,3,6,9,12].forEach(m=>{s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${y+26}" y2="${y+32}" class="axis"/><text x="${f1(X(m))}" y="${y+45}" class="t-xs ${m===0?'':m===12?'t-end':'t-mid'}">${m===0?'event':m+' mo'}</text>`});
    s+=D.m<12?`<text x="${f1(X(D.m)+8)}" y="${y+18}" class="t-sm" style="fill:var(--ink)">1 month off driving</text>`:`<text x="${f1(x0+w/2)}" y="${y+18}" class="t-sm t-mid" style="fill:var(--panel)">1 year: licence refused or revoked</text>`;
    s+=`<text x="${x0}" y="${y+70}" class="t-sm">Rules differ by country.</text>`;
    el.innerHTML=s;$('#aftDrH').textContent=D.h;$('#aftDrT').innerHTML=D.t};
  const drawTab=()=>{if(AFT_BARS[tab])rhbBars($('#aftC-'+tab),AFT_BARS[tab]);if(tab==='drive')drawDrive()};
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;
    $$('[data-tab]',tabs).forEach(k=>k.setAttribute('aria-pressed',k===b));
    $$('.aftpanel',$('#m-after')).forEach(p=>p.hidden=p.id!=='aftP-'+tab);drawTab()});
  $('#aftDrL').addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;drL=b.dataset.l;$$('[data-l]',$('#aftDrL')).forEach(k=>k.setAttribute('aria-pressed',k===b));drawDrive()});
  $('#aftDrE').addEventListener('click',e=>{const b=e.target.closest('[data-e]');if(!b)return;drE=b.dataset.e;$$('[data-e]',$('#aftDrE')).forEach(k=>k.setAttribute('aria-pressed',k===b));drawDrive()});
  drawTab();drawDrive();

  /* ---- survival and recurrence ---- */
  const sv=$('#aftSvSvg'),svT=$('#aftSvT');
  function aftPanel(B,title,sers,yr,ymax,step){
    const YX=v=>B.x+B.w*Math.sqrt(v)/Math.sqrt(10),Y=v=>B.y+B.h-B.h*v/ymax;
    let g=`<text x="${B.x-28}" y="${B.y-12}" class="t-lbl">${title}</text><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" style="fill:var(--field)"/>`;
    for(let v=0;v<=ymax;v+=step)g+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${B.x-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`;
    [ [.25,'3 mo'],[1,'1 yr'],[5,'5 yr'],[10,'10 yr'] ].forEach(([v,l])=>{g+=`<text x="${f1(YX(v))}" y="${B.y+B.h+14}" class="t-xs ${v===10?'t-end':'t-mid'}">${l}</text>`});
    g+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/><line x1="${B.x}" x2="${B.x}" y1="${B.y}" y2="${B.y+B.h}" class="axis"/>`;
    sers.forEach(S=>{const f=monoFn(S.pts),a=S.pts[0][0],e=Math.min(yr,10);
      if(e>a){let d='';for(let i=0;i<=50;i++){const v=a+(e-a)*Math.pow(i/50,2);d+=(i?'L':'M')+f1(YX(v))+' '+f1(Y(f(v)))}g+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.2;stroke-dasharray:${S.dash}"/>`}
      S.pts.forEach((p,i)=>{if(yr<p[0])return;g+=S.shape==='sq'?`<rect x="${f1(YX(p[0])-4.5)}" y="${f1(Y(p[1])-4.5)}" width="9" height="9" style="fill:${S.col};stroke:var(--panel);stroke-width:1"/>`:`<circle cx="${f1(YX(p[0]))}" cy="${f1(Y(p[1]))}" r="5" style="fill:${S.col};stroke:var(--panel);stroke-width:1.2"/>`;
        const P=S.lab[i];g+=rhbLab(YX(p[0])+P[0],Y(p[1])+P[1],`${p[1].toFixed(1)}%`,{a:P[2]||''})});
      if(S.name)g+=rhbLab(B.x+B.w-6,Y(S.ny),S.name,{a:'t-end'})});
    return g}
  function drawSv(t){
    const N=vb(sv,'720 370','400 720');
    const A=N?{x:42,y:40,w:340,h:250}:{x:42,y:36,w:290,h:286},B=N?{x:42,y:400,w:340,h:270}:{x:402,y:36,w:296,h:286};
    const yr=Math.pow(clamp(t),2)*10,cx=[A,B];
    let s=aftPanel(A,'Alive, Australia and New Zealand',[{pts:AFT_SURV,col:'var(--rec)',dash:'6 4',lab:[ [8,-6],[8,-6],[8,-6],[-8,16,'t-end'] ]}],yr,100,25);
    s+=aftPanel(B,'Had a further stroke (cumulative)',[
      {pts:AFT_REC_P,col:'var(--brand)',dash:'6 4',lab:[ [0,-9,'t-mid'],[-6,-9,'t-end'],[-6,-9,'t-end'],[-6,-9,'t-end'] ],name:'circles: pooled review',ny:8},
      {pts:AFT_REC_A,col:'var(--rec)',dash:'2 4',shape:'sq',lab:[ [0,-9,'t-mid'],[6,17],[6,17],[-6,-9,'t-end'] ],name:'squares: Australia and NZ',ny:3.5}],yr,50,10);
    const sw=()=>Math.sqrt(yr)/Math.sqrt(10);
    cx.forEach(P=>{const x=P.x+P.w*sw();s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${P.y}" y2="${P.y+P.h}" style="stroke:var(--ink);stroke-width:1"/>`});
    const yl=`${yr<.95?Math.round(yr*12)+' months':yr.toFixed(yr<9.95?1:0)+' years'} after stroke`;cx.forEach(P=>{s+=`<text x="${f1(P.x+P.w/2)}" y="${P.y+P.h+30}" class="t-sm t-mid">${yl}</text>`});
    sv.innerHTML=s;
    const p=phaseOf(AFT_SV_STEPS,t);setSv(p);$('#aftSvNote').innerHTML=noteHTML(AFT_SV_STEPS[p]);
  }
  const stopSv=playWire(svT,$('#aftSvPlay'),drawSv,16000,'%t:player.replay%','after');
  const setSv=stepWire($('#aftSvSteps'),AFT_SV_STEPS,svT,drawSv,stopSv);
  drawSv(+svT.value);

  const prev=redraws.after;redraws.after=()=>{prev&&prev();drawTab();drawDrive()};
};
function aftLab(x,y,t,a,op){return `<text x="${f1(x)}" y="${f1(y)}" class="t-sm${a?' '+a:''}" style="fill:var(--ink);opacity:${f1(op)};paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round">${t}</text>`}
