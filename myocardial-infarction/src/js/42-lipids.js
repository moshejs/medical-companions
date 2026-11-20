/* =============== 4.2 Lowering LDL cholesterol =============== */
const LD_MG=38.67;/* mg/dL per mmol/L for cholesterol */
/* trial dots: x = LDL difference between arms (mmol/L), y = 1 - HR; appear at a */
const LD_DOTS=[
 {n:'CTT: more vs less statin',x:.51,y:.15,a:.22,c:'var(--muted)'},
 {n:'PROVE IT',x:(95-62)/LD_MG,y:.16,a:.38,c:'var(--rx)'},
 {n:'IMPROVE-IT',x:(69.5-53.7)/LD_MG,y:.064,a:.55,c:'var(--rx)'},
 {n:'FOURIER',x:.59*92/LD_MG,y:.15,a:.70,c:'var(--rx)'},
 {n:'CLEAR Outcomes',x:29.2/LD_MG,y:.13,a:.88,c:'var(--rx)'}];
/* one illustrative person: baseline as in EVOPACS (3.61 mmol/L), then the cited average percentages */
const LD_BARS=[{n:'start',v:3.6,a:0,l:''},{n:'statin',v:3.6*.5,a:.36,l:'−50%'},{n:'+ezetimibe',v:3.6*.5*.8,a:.53,l:'−15–25%'},{n:'+PCSK9',v:3.6*.5*.8*.41,a:.69,l:'−59%'}];
const LD_STEPS=[
 {from:0,at:.08,k:'Step 1 · Cause',t:'LDL causes atherosclerosis',
  txt:`A European Atherosclerosis Society panel judged that LDL particles cause atherosclerotic cardiovascular disease, from genetic studies, more than 200 cohorts, Mendelian randomisation and trials in more than 2 million people, showing a “dose-dependent log-linear” link. Any way of lowering LDL should cut events in proportion to how far and how long it is lowered. <span class="ev est">Established</span> [[Ference2017EAS]]`,
  pt:`“Bad” LDL cholesterol helps build the fatty plaque inside heart arteries. Lowering it, by any means, lowers the risk.`,
  hook:`LDL causality rests on genetics, cohorts, Mendelian randomisation and trials: risk is log-linear in LDL exposure. [[Ference2017EAS]]`},
 {from:.16,at:.25,k:'Step 2 · The CTT line',t:'About 22% fewer events per mmol/L',
  txt:`The Cholesterol Treatment Trialists pooled 26 trials (about 170,000 people). Each 1.0 mmol/L (about 39 mg/dL) lower LDL cut major vascular events by about a fifth (RR 0.78), in every type of patient, including those already below 2 mmol/L, with “no evidence of any threshold”. Lowering by 2–3 mmol/L would cut risk by about 40–50%. More intensive statins lowered LDL a further 0.51 mmol/L and events by a further 15% (the grey dot). [[CTT2010]]`,
  pt:`The lower LDL went in these trials, the fewer heart attacks and strokes people had, on average.`,
  hook:`CTT: RR 0.78 per 1 mmol/L LDL reduction; all-cause mortality RR 0.90 per mmol/L; no lower threshold seen. [[CTT2010]]`},
 {from:.32,at:.41,k:'Step 3 · Statin',t:'A high-intensity statin after ACS: PROVE IT',
  txt:`PROVE IT–TIMI 22 (4162 people within 10 days of ACS) was designed to show pravastatin 40 mg was not worse than atorvastatin 80 mg; instead the intensive statin won. Median LDL was 62 vs 95 mg/dL, and the 2-year composite 22.4% vs 26.3% (16% hazard reduction). A high-intensity statin lowers LDL by about 50% or more. <span class="ev est">Established</span> [[Cannon2004PROVEIT,Grundy2019ACC]]`,
  pt:`A strong statin dose roughly halves LDL. In the bar, one illustrative person drops from 3.6 to about 1.8 mmol/L.`,
  hook:`PROVE IT: atorvastatin 80 mg beat pravastatin 40 mg after ACS (LDL 62 vs 95 mg/dL; 22.4% vs 26.3%).`},
 {from:.50,at:.58,k:'Step 4 · Ezetimibe',t:'Add ezetimibe: IMPROVE-IT',
  txt:`IMPROVE-IT (18,144 people after ACS) added ezetimibe 10 mg to simvastatin 40 mg. LDL was 53.7 vs 69.5 mg/dL and the 7-year event rate 32.7% vs 34.7% (HR 0.936), with similar side effects. The authors concluded that “lowering LDL cholesterol to levels below previous targets provided additional benefit”. A 2026 review puts ezetimibe's extra lowering on a statin at 15–25%. [[Cannon2015IMPROVEIT,Sabouret2026G]]`,
  pt:`Ezetimibe is a tablet that blocks cholesterol uptake from the gut. It adds a smaller drop on top of a statin.`,
  hook:`IMPROVE-IT: 2.0-point absolute reduction at 7 years (32.7% vs 34.7%); the dot sits close to the CTT line.`},
 {from:.66,at:.74,k:'Step 5 · PCSK9 antibodies',t:'PCSK9 antibodies: FOURIER and ODYSSEY',
  txt:`FOURIER (27,564 people with ASCVD on statins): evolocumab cut LDL by 59%, from a median 92 to 30 mg/dL, and the primary end point from 11.3% to 9.8% (HR 0.85) over a median 2.2 years, shorter than the roughly 5 years of the statin trials behind the CTT line. Lower achieved LDL meant lower risk all the way below 0.2 mmol/L, with no safety signal. ODYSSEY OUTCOMES (alirocumab 1–12 months after ACS): HR 0.85, deaths 3.5% vs 4.1%; its LDL difference is not given in the sources here, so it sits on the edge rail. [[Sabatine2017FOURIER,Giugliano2017FOURIERLDL,CTT2010,Schwartz2018ODYSSEY]]`,
  pt:`These injections every 2 or 4 weeks lower LDL much further. In the bar, the illustrative person falls well under the ESC goal line.`,
  hook:`FOURIER: LDL 92 → 30 mg/dL, HR 0.85. ODYSSEY: HR 0.85, deaths 3.5% vs 4.1%. FOURIER-OLE: earlier start, lower CV death (HR 0.77). [[ODonoghue2022FOURIEROLE]]`},
 {from:.84,at:1,k:'Step 6 · Statin intolerance',t:'Bempedoic acid: CLEAR Outcomes',
  txt:`CLEAR Outcomes (13,970 statin-intolerant people): bempedoic acid lowered LDL by 29.2 mg/dL more than placebo and cut four-point major events from 13.3% to 11.7% (HR 0.87). Its dot sits close to the line too: a different drug, the same LDL rule. Starting early has been tested too: given in hospital during ACS, evolocumab brought LDL from 3.61 to 0.79 mmol/L by week 8 (EVOPACS). [[Nissen2023CLEAR,Koskinas2019EVOPACS]]`,
  pt:`People who cannot take a statin have other options. What matters most is how far LDL falls and for how long.`,
  hook:`CLEAR Outcomes: MACE HR 0.87; MI 3.7% vs 4.8%; watch for gout and gallstones. [[Nissen2023CLEAR]]`}
];
inits.lipids=()=>{
  const svg=$('#ldSvg'),rg=$('#ldT');
  const TX=(x,y,cls,txt,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  function chart(x,y,w,h,t,N){
    const X=v=>x+w*v/3,Y=v=>y+h-h*v/.55,lp=ramp(t,.1,.3);
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:var(--field)"/>`;
    [0,.1,.2,.3,.4,.5].forEach(v=>{s+=`<line x1="${x}" x2="${x+w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+TX(x-6,Y(v)+3,'t-xs t-end',Math.round(v*100)+'%')});
    [0,1,2,3].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y+h}" y2="${y+h+4}" class="axis"/>`+TX(X(v),y+h+15,'t-xs '+(v===3?'t-end':'t-mid'),v)+TX(X(v),y+h+27,'t-xs '+(v===3?'t-end':'t-mid'),v?Math.round(v*LD_MG)+' mg/dL':'')});
    s+=`<line x1="${x}" x2="${x+w}" y1="${y+h}" y2="${y+h}" class="axis"/><line x1="${x}" x2="${x}" y1="${y}" y2="${y+h}" class="axis"/>`;
    s+=TX(x+w,y+h+41,'t-sm t-end','LDL reduction, mmol/L')+`<text transform="translate(${x-(N?32:38)} ${f1(y+h/2)}) rotate(-90)" class="t-sm t-mid">fewer major vascular events</text>`;
    /* the CTT line: 1 - 0.78^x */
    if(lp>0){let d='';const n=80;for(let i=0;i<=n;i++){const v=3*lp*i/n;d+=(i?'L':'M')+f1(X(v))+' '+f1(Y(1-Math.pow(.78,v)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.6;stroke-linecap:round"/>`;
      if(lp>.98){s+=TX(X(1.5)+10,Y(1-Math.pow(.78,1.5))+14,'t-sm','CTT line: ×0.78 per mmol/L','fill:var(--brand);font-weight:600');
        [1,2].forEach(v=>{const yy=Y(1-Math.pow(.78,v));s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yy)}" y2="${y+h}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:2 3;opacity:.6"/>`+TX(X(v)-5,yy-5,'t-xs t-end','−'+Math.round((1-Math.pow(.78,v))*100)+'%','fill:var(--brand);font-weight:600')})}}
    /* trial dots */
    let row=0;
    LD_DOTS.forEach(d=>{const g=ramp(t,d.a,d.a+.05);if(g<=0)return;const px=X(d.x),py=Y(d.y);
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(3+3.5*ease(g))}" style="fill:${d.c};stroke:var(--panel);stroke-width:2;opacity:${f1(g)}"/>`;
      const nm=`${d.n==='CTT: more vs less statin'?'intensive statin (CTT)':d.n} −${Math.round(d.y*100)}%`;
      if(d.n==='FOURIER'){s+=TX(px+10,py+4,'t-xs',nm,`fill:var(--ink);font-weight:600;opacity:${f1(g)}`);return}
      const k=['CTT: more vs less statin','PROVE IT','CLEAR Outcomes','IMPROVE-IT'].indexOf(d.n),cx=X(1.72),cy=Y(.10)+k*13;
      s+=`<path d="M${f1(px+5)} ${f1(py+2)}L${f1(cx-5)} ${f1(cy-3)}" style="stroke:var(--muted);stroke-width:.8;opacity:${f1(g*.8)}"/>`+TX(cx,cy,'t-xs',nm,`fill:var(--ink);font-weight:600;opacity:${f1(g)}`)});
    /* ODYSSEY: HR 0.85 known, LDL difference not given here: a marker on the right rail */
    const go=ramp(t,.72,.77);if(go>0){const py=Y(.15);s+=`<path d="M${x+w} ${f1(py)}l9 -6v12z" style="fill:var(--rx);opacity:${f1(go)}"/>`+TX(x+w-6,py-10,'t-xs t-end','ODYSSEY −15% (LDL gap not given) ▸',`fill:var(--ink);font-weight:600;opacity:${f1(go)}`)}
    /* the illustrative person's position on the line */
    const sp=t<.36?0:t<.53?1:t<.69?2:3,pv=sp?3.6-LD_BARS[sp].v:0;
    if(pv>0&&lp>.98){const pr=1-Math.pow(.78,pv);s+=`<circle cx="${f1(X(pv))}" cy="${f1(Y(pr))}" r="7" style="fill:none;stroke:var(--brand);stroke-width:2"/>`+TX(x+8,y+14,'t-xs',`○ illustrative person: LDL −${f1(pv)} mmol/L → line says −${Math.round(pr*100)}%`,'fill:var(--brand);font-weight:600')}
    return s}
  function bars(x,y,w,h,t){
    const mx=4.3,Y=v=>y+h-h*v/mx,bw=w/4-10;
    let s=TX(x,y-24,'t-sm','ONE ILLUSTRATIVE PERSON')+TX(x,y-10,'t-xs','green dashes: ESC goal <1.4 mmol/L','fill:var(--good);font-weight:600');
    s+=`<line x1="${x}" x2="${x+w}" y1="${y+h}" y2="${y+h}" class="axis"/>`;
    const gy=Y(1.4);s+=`<line x1="${x-4}" x2="${x+w}" y1="${f1(gy)}" y2="${f1(gy)}" style="stroke:var(--good);stroke-width:1.6;stroke-dasharray:5 3"/>`;
    LD_BARS.forEach((b,i)=>{const g=ease(ramp(t,b.a,b.a+.06)),bx=x+i*(w/4)+5;
      const prev=i?LD_BARS[i-1].v:b.v,v=i?lerp(prev,b.v,g):b.v,show=i===0||g>0;
      if(!show){s+=`<rect x="${f1(bx)}" y="${f1(y)}" width="${f1(bw)}" height="${h}" rx="4" style="fill:none;stroke:var(--line);stroke-dasharray:3 3"/>`;s+=TX(bx+bw/2,y+h+14,'t-xs t-mid',b.n);return}
      const col=v<1.4?'var(--good)':i===0?'var(--plaque)':'var(--rx)';
      s+=`<rect x="${f1(bx)}" y="${f1(Y(v))}" width="${f1(bw)}" height="${f1(y+h-Y(v))}" rx="4" style="fill:${col};opacity:.85"/>`;
      s+=TX(bx+bw/2,Y(v)-6,'t-sm t-mid',f1(v)+(i===0?' mmol/L':''),'fill:var(--ink);font-weight:600')+TX(bx+bw/2,y+h+14,'t-xs t-mid',b.n,'fill:var(--ink)')+(b.l?TX(bx+bw/2,y+h+26,'t-xs t-mid',b.l):'');
      });
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    let s=N?chart(46,30,336,270,t,true)+bars(30,410,350,180,t):chart(58,24,372,282,t,false)+`<line x1="466" x2="466" y1="12" y2="368" class="axis"/>`+bars(478,52,236,258,t);
    svg.innerHTML=s;
    const p=phaseOf(LD_STEPS,t);$('#ldNote').innerHTML=noteHTML(LD_STEPS[p]);setSt(p);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#ldPlay'),draw,26000,'%t:player.replay%','lipids');
  setSt=stepWire($('#ldSteps'),LD_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ===== LDL goals explainer ===== */
  const ts=$('#ldTgt'),inp=$('#ldBase'),rec=$('#ldRec');let unit='mmol';
  const fmt=v=>unit==='mmol'?f1(v)+' mmol/L':Math.round(v*LD_MG)+' mg/dL';
  function tdraw(){
    let b=parseFloat(inp.value);if(!isFinite(b)||b<=0)b=unit==='mmol'?3.6:139;
    const bm=unit==='mmol'?b:b/LD_MG,bb=clamp(bm,.5,8);
    const esc=Math.min(1.4,bm*.5),escR=rec.checked?Math.min(40/LD_MG,esc):esc;
    const N=vb(ts,'720 210','400 240'),x0=N?16:30,x1=N?384:700,mx=Math.max(5,Math.ceil(bb+.5)),X=v=>x0+(x1-x0)*clamp(v,0,mx)/mx;
    const y=N?136:108;
    let s=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:10;stroke-linecap:round"/>`;
    for(let v=0;v<=mx;v++)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y+8}" y2="${y+13}" class="axis"/><text x="${f1(X(v))}" y="${y+25}" class="t-xs t-mid">${unit==='mmol'?v:Math.round(v*LD_MG)}</text>`;
    s+=`<text x="${x1}" y="${y+38}" class="t-xs t-end">${unit==='mmol'?'mmol/L':'mg/dL'}</text>`;
    /* goal zone */
    s+=`<rect x="${x0}" y="${y-5}" width="${f1(X(escR)-x0)}" height="10" rx="5" style="fill:var(--good);opacity:.8"/>`;
    /* US thresholds */
    [[70/LD_MG,'70 mg/dL','US threshold'],[55/LD_MG,'55 mg/dL','US very-high-risk goal']].forEach(([v,l,d],i)=>{const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-18}" y2="${y+8}" style="stroke:var(--dx);stroke-width:1.6"/><text x="${f1(xx+(i?-4:4))}" y="${y-22}" class="t-xs ${i?'t-end':''}" style="fill:var(--dx);font-weight:600">${l}</text>`});
    /* baseline and average steps */
    const st=[[bm,'baseline','var(--plaque)'],[bm*.5,'statin','var(--rx)'],[bm*.4,'+ ezetimibe','var(--rx)'],[bm*.4*.41,'+ PCSK9','var(--rx)']];
    st.forEach(([v,l,c],i)=>{const xx=X(v),up=i%2===0,ly=up?y-58-(N?8:0):y+52;
      s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${up?ly+4:y+6}" y2="${up?y-6:ly-10}" style="stroke:${c};stroke-width:1.2;stroke-dasharray:${i?'2 2':'0'}"/><circle cx="${f1(xx)}" cy="${y}" r="${i?5:7}" style="fill:${c};stroke:var(--panel);stroke-width:2"/><text x="${f1(xx)}" y="${ly}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${l}</text><text x="${f1(xx)}" y="${ly+12}" class="t-xs t-mid">${fmt(v)}</text>`});
    s+=`<text x="${x0}" y="${N?20:18}" class="t-sm" style="fill:var(--ink)">ESC goal zone (green): below ${fmt(escR)}${rec.checked?' (the &lt;40 mg/dL option)':''}</text>`;
    s+=N?`<text x="${x0}" y="36" class="t-xs">Steps use average percentages (statin −50%,</text><text x="${x0}" y="49" class="t-xs">ezetimibe −20% more, PCSK9 antibody −59%); individuals differ.</text>`:`<text x="${x0}" y="34" class="t-xs">Steps use average percentages (statin −50%, ezetimibe −20% more, PCSK9 antibody −59%); individuals differ.</text>`;
    ts.innerHTML=s;
    const need=Math.max(0,Math.round((1-escR/bm)*100));
    const step=bm*.5<escR?'a high-intensity statin alone (on average)':bm*.4<escR?'statin plus ezetimibe (on average)':bm*.4*.41<escR?'statin, ezetimibe and a PCSK9 antibody (on average)':'more than these three average steps';
    $('#ldOut').innerHTML=`<div class="card"><span class="kicker">ESC/EAS very-high-risk goal</span><span class="big-num">${fmt(escR)}</span><p>The goal is <span class="ldq">“&lt;55 mg/dL and ≥50% reduction”</span> (&lt;1.4 mmol/L), so from ${fmt(bm)} it is the lower of 1.4 mmol/L and half the baseline${rec.checked?'. After a recurrent vascular event within two years on maximally tolerated therapy, <span class="ldq">“A goal &lt; 40 mg/dL may be considered”</span>':''}. [[Mach2019ESC,Mach2025ESC,Sabouret2026G,Goel2026]]</p></div>`+
      `<div class="card"><span class="kicker">Reduction needed</span><span class="big-num">${need}%</span><p>On the average percentages cited, that is reached by ${step}. The real response is measured: labels and ESC/EAS say to recheck LDL from 4 weeks (4–6 weeks for ESC/EAS). [[FDA-Lipitor,FDA-Zetia,Sabouret2026G]]</p></div>`+
      `<div class="card"><span class="kicker">US statements</span><p>2018 AHA/ACC: in very high-risk ASCVD, <span class="ldq">“use a LDL-C threshold of 70 mg/dL (1.8 mmol/L) to consider addition of nonstatins to statin therapy.”</span> [[Grundy2019ACC]] 2026 ACC/AHA: very high risk <span class="ldq">“should achieve LDL-C below 55 mg/dL”</span> (per review). [[Blumenthal2026ACC,Sabouret2026G]] Baseline ${fmt(bm)} is ${bm*LD_MG>=70?'at or above':'below'} 70 mg/dL.</p></div>`;
  }
  inp.addEventListener('input',tdraw);rec.addEventListener('change',tdraw);
  $$('[data-ldu]').forEach(b=>b.addEventListener('click',()=>{const u=b.dataset.ldu;if(u!==unit){let v=parseFloat(inp.value);if(isFinite(v)){v=u==='mg'?Math.round(v*LD_MG):Math.round(v/LD_MG*10)/10;inp.value=v}
    unit=u;inp.step=u==='mg'?'1':'0.1';inp.min=u==='mg'?'20':'0.5';inp.max=u==='mg'?'460':'12'}$$('[data-ldu]').forEach(x=>x.setAttribute('aria-pressed',x===b));tdraw()}));
  redraws.lipids=(f=>()=>{f&&f();tdraw()})(redraws.lipids);
  tdraw();
};
