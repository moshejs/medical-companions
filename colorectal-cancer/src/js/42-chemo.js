/* =============== 4.2 Chemotherapy after surgery =============== */
const CH_WK=30;/* weeks shown on the calendar */
/* regimen facts: cycle length (days), cycles in 3 and 6 months, oxaliplatin per cycle (label), IDEA grade >=2 neuropathy */
const CH_REG={
 folfox:{n:'FOLFOX',len:14,cyc:{3:6,6:12},ox:85,neu:{3:16.6,6:47.7},
  d1:'Day 1: oxaliplatin 85 mg/m² + leucovorin, then 5-FU bolus and 22-hour infusion; day 2: leucovorin and 5-FU again'},
 capox:{n:'CAPOX',len:21,cyc:{3:4,6:8},ox:130,neu:{3:14.2,6:44.9},
  d1:'Day 1: oxaliplatin 130 mg/m²; capecitabine 1,000 mg/m² twice daily on days 1–14, then a week off'}
};
/* schematic cumulative neuropathy: rises as a power curve to the published value at the end of the
   measuring window (end of treatment + about 4 weeks), then stays flat */
function chNeu(reg,dur,w){const P=CH_REG[reg].neu[dur],T=(dur===3?12:24)+4;return P*Math.pow(clamp(w/T),1.5)}
const CH_STEPS=[
 {from:0,at:.03,k:'Week 0 · after surgery',t:'Starting after the operation',
  txt:`Chemotherapy after surgery ("adjuvant") aims to kill cancer cells left behind that no scan can see. Timing matters: in a meta-analysis of 15,410 patients, each 4-week delay in starting was associated with worse overall survival (HR 1.14), though the data are observational. Before capecitabine or 5-FU, US labels now carry a boxed warning to test for DPYD variants unless treatment is urgent. [[Biagi2011,FDA-Xeloda,FDA-Fluorouracil]]`,
  pt:`The operation removed what can be seen. Chemotherapy goes after cells too small to see, and works best if it starts once recovery allows.`,
  hook:`Each 4-week delay to adjuvant chemotherapy: overall survival HR 1.14 (observational). [[Biagi2011]]`},
 {from:.06,at:.14,k:'Weeks 1–6',t:'Cycle by cycle',
  txt:`FOLFOX4 runs every 14 days: oxaliplatin, leucovorin and a fluorouracil bolus plus a 22-hour infusion on day 1, repeated on day 2. CAPOX runs every 21 days: oxaliplatin on day 1 and capecitabine tablets twice daily on days 1–14. The evidence behind them: in MOSAIC, adding oxaliplatin to 5-FU/leucovorin raised 3-year disease-free survival from 72.9% to 78.2%, and capecitabine was at least as good as IV fluorouracil in X-ACT. [[FDA-Oxaliplatin,FDA-Xeloda,Andre2004,Twelves2005]]`,
  pt:`FOLFOX means a drip every two weeks with a small pump carried home. CAPOX means a drip every three weeks and tablets at home.`,
  hook:`Label maximum: FOLFOX4 up to 12 cycles; capecitabine with oxaliplatin up to 8 cycles. [[FDA-Oxaliplatin,FDA-Xeloda]]`},
 {from:.2,at:.3,k:'Weeks 6–12',t:'The nerves keep count',
  txt:`Oxaliplatin causes an acute, cold-triggered neuropathy and a cumulative, delayed one in the hands and feet (the label says to "avoid topical application of ice"). The cumulative kind rises with every cycle, so it depends on total dose more than on regimen: compare the oxaliplatin total in the readout. [[FDA-Oxaliplatin,Grothey2018]]`,
  pt:`Tingling and numbness in the fingers and toes build up with each cycle. Tell the team early: they can reduce or stop the oxaliplatin.`,
  hook:`Six FOLFOX cycles (6 × 85) and four CAPOX cycles (4 × 130) give a similar oxaliplatin total, about 510–520 mg/m². [[FDA-Oxaliplatin,FDA-Xeloda]]`},
 {from:.43,at:.5,k:'Week 12 · 3 months',t:'The IDEA stopping point',
  txt:`IDEA (12,834 people) asked whether stopping here is enough. Overall, non-inferiority of 3 months was not confirmed (DFS HR 1.07). It was for CAPOX (HR 0.95) but not for FOLFOX (HR 1.16). In lower-risk disease (T1–3 N1), 3-year DFS was 83.1% at 3 months vs 83.3% at 6. Grade ≥2 neuropathy was 16.6% with 3 months of FOLFOX and 14.2% with CAPOX. [[Grothey2018]]`,
  pt:`For many people with lower-risk stage III cancer, 3 months of CAPOX works about as well as 6 and causes much less nerve damage.`,
  hook:`IDEA: 3 months of CAPOX is enough for low-risk T1–3 N1 disease. [[Grothey2018]]`},
 {from:.6,at:.95,k:'Weeks 12–28 · 6 months',t:'Six months: a small gain, a large cost',
  txt:`With 6 months, grade ≥2 neuropathy reached 47.7% (FOLFOX) and 44.9% (CAPOX), roughly triple. In higher-risk disease (T4 and/or N2), 6 months was better: 3-year DFS 64.4% vs 62.7%. Neuropathy fades for many: in MOSAIC grade 3 sensory neuropathy was 12.4% during treatment, 1.3% at 12 months and 0.7% at 48 months. [[Grothey2018,Andre2004,Andre2009]]`,
  pt:`Numbness and tingling get worse the longer treatment goes on. For most people it improves after treatment ends, but for some it lasts.`,
  hook:`Grade ≥2 neuropathy, 6 vs 3 months: FOLFOX 47.7% vs 16.6%; CAPOX 44.9% vs 14.2%. [[Grothey2018]]`}
];
const CH_IDEA={
 risk:{t:'3-year disease-free survival by risk group',groups:[['Low risk (T1–3 N1)',83.1,83.3],['High risk (T4 and/or N2)',62.7,64.4]],max:100,unit:'%',
  note:{k:'IDEA · Grothey 2018',t:'Risk group decides the duration',txt:`Lower-risk stage III (T1–3 N1): 3-year DFS 83.1% with 3 months vs 83.3% with 6 (HR 1.01). Higher-risk (T4 and/or N2): 6 months was superior, 64.4% vs 62.7% (HR 1.12; P=.01). [[Grothey2018]]`,
   pt:`In the lower-risk group the bars are almost identical. In the higher-risk group, the longer course kept a small lead.`,hook:`Low risk = T1–3 N1; high risk = T4 and/or N2. [[Grothey2018]]`}},
 hr:{t:'Disease-free survival, hazard ratio for 3 vs 6 months',rows:[['All patients',1.07,1.00,1.15],['CAPOX',.95,.85,1.06],['FOLFOX',1.16,1.06,1.26]],
  note:{k:'IDEA · non-inferiority',t:'CAPOX passes, FOLFOX does not',txt:`A hazard ratio above 1 means more events with 3 months. Three months counts as non-inferior only if the whole confidence interval stays below the pre-set margin of 1.12. CAPOX (0.95; 0.85–1.06) passes; FOLFOX (1.16; 1.06–1.26) and the overall result (1.07; 1.00–1.15) do not. [[Grothey2018]]`,
   pt:`Read each line as a range of plausible results. If the whole range sits left of the dashed line, the shorter course is "not worse" by the trial's rule.`,hook:`IDEA overall DFS HR 1.07 (95% CI 1.00–1.15) vs margin 1.12: non-inferiority not confirmed. [[Grothey2018]]`}},
 os:{t:'5-year overall survival',groups:[['All patients',82.4,82.8],['CAPOX',82.1,81.2],['FOLFOX',82.6,83.8]],max:100,unit:'%',
  note:{k:'IDEA final · André 2020',t:'Survival: almost the same',txt:`With a median 72 months of follow-up (12,835 patients), 5-year OS was 82.4% with 3 months vs 82.8% with 6 (HR 1.02); non-inferiority was not formally met. CAPOX 82.1% vs 81.2% (HR 0.96); FOLFOX 82.6% vs 83.8% (HR 1.07). The authors concluded the results support 3 months of CAPOX for most patients. [[Andre2020IDEA]]`,
   pt:`Five years on, about 82 in 100 were alive whichever length they had.`,hook:`IDEA final OS: absolute gap 0.4% (82.4% vs 82.8%). [[Andre2020IDEA]]`}}
};
const CH_WHO={
 'III-low':[`<span class="ev est">Established</span> IDEA: 3-year DFS 83.1% with 3 months vs 83.3% with 6. Three months of CAPOX was non-inferior (HR 0.95), with grade ≥2 neuropathy 14.2% vs 44.9%. [[Grothey2018]]`,`Final IDEA overall survival supports 3 months of CAPOX for most patients. [[Andre2020IDEA]]`,`The oxaliplatin label indication is adjuvant treatment of stage III colon cancer after complete resection. [[FDA-Oxaliplatin]]`],
 'III-high':[`<span class="ev est">Established</span> IDEA: for T4 and/or N2 disease, 6 months was superior (3-year DFS 64.4% vs 62.7%; HR 1.12). [[Grothey2018]]`,`MOSAIC: adding oxaliplatin gave a 10-year overall survival of 67.1% vs 59.0% in stage III. [[Andre2015]]`,`SCOT (67% CAPOX, high-risk II and III) met non-inferiority for 3 months overall (3-year DFS 76.7% vs 77.1%). [[Iveson2018]]`],
 'II-p':[`<span class="ev est">Established</span> QUASAR (91% stage II): FU/folinic acid lowered the risk of death (RR 0.82), an absolute gain of only about 3.6% if 5-year mortality without chemotherapy is 20%. [[QUASAR2007]]`,`MOSAIC 10-year OS in stage II: 78.4% with FOLFOX4 vs 79.5% without oxaliplatin (HR 1.00). [[Andre2015]]`,`<span class="ev early">Early evidence</span> DYNAMIC: ctDNA-guided care cut chemotherapy use from 28% to 15% with non-inferior 2-year recurrence-free survival. [[Tie2022]]`],
 'II-d':[`<span class="ev est">Established</span> Sargent 2010: dMMR tumours gained no DFS benefit from fluorouracil (HR 1.10), and in stage II dMMR, FU was associated with worse overall survival (HR 2.95; 95% CI 1.02–8.54). [[Sargent2010]]`,`dMMR made up 15% of the Sargent sample and 9.4% of MOSAIC specimens tested. [[Sargent2010,Andre2015]]`,`Mismatch-repair testing is covered in <a href="#biomarkers" data-go="biomarkers">Tumour biomarkers</a>.`],
 'III-d':[`<span class="ev est">Established</span> ATOMIC (712 people, resected stage III dMMR): adding atezolizumab to mFOLFOX6 raised 3-year DFS from 76.2% to 86.3% (HR 0.50), with more grade 3–4 adverse events (84.1% vs 71.9%). [[Sinicrope2026]]`,`<span class="ev early">Early evidence</span> NICHE-2: nivolumab plus ipilimumab before surgery gave a 68% complete pathological response in dMMR colon cancer. [[Chalabi2024]]`,`FOxTROT found little benefit from neoadjuvant chemotherapy in dMMR tumours. [[Morton2023]]`],
 'old':[`<span class="tag warn">Uncertain</span> ACCENT (11,953 patients): at 70 or older, adding oxaliplatin to IV fluorouracil gave little benefit (DFS HR 0.94; OS HR 1.04), but the age interaction was not statistically significant. [[McCleary2013]]`,`Oral fluoropyrimidines kept their efficacy at all ages in ACCENT. [[McCleary2013]]`,`Capecitabine alone (X-ACT) was at least equivalent to bolus FU/LV with fewer adverse events. [[Twelves2005]]`],
 'neo':[`<span class="ev est">Established</span> FOxTROT (1,053 people, T3–4 on CT): 6 weeks of chemotherapy before surgery lowered residual or recurrent disease at 2 years (16.9% vs 21.5%; rate ratio 0.72) and raised complete resection (94% vs 89%). [[Morton2023]]`,`4.3% developed obstruction needing earlier surgery, yet serious postoperative complications were fewer. There was little benefit in dMMR tumours. [[Morton2023]]`],
 'time':[`<span class="ev est">Established association</span> Each 4-week delay in starting adjuvant chemotherapy was associated with worse overall survival (HR 1.14; 95% CI 1.10–1.17) and DFS (HR 1.14), across 10 studies and 15,410 patients. The data are observational. [[Biagi2011]]`,`Enhanced-recovery programmes shorten hospital stay by about 2.28 days. [[Greco2014]] See <a href="#surgery" data-go="surgery">Surgery</a>.`]
};

inits.chemo=()=>{
  const svg=$('#chSvg'),rg=$('#chT');let reg='capox',dur=3;
  function draw(t){
    const N=vb(svg,'720 390','400 525');const R=CH_REG[reg],w=t*CH_WK,day=w*7,ph=phaseOf(CH_STEPS,t);
    const nCyc=R.cyc[dur],endDay=nCyc*R.len;let s='';
    const kind=d=>{if(d>=endDay)return'off';const c=d%R.len;if(reg==='folfox')return c===0?'ox':c===1?'fu':'rest';return c===0?'ox':c<14?'cap':'rest'};
    const fill={ox:'var(--rx)',fu:'var(--accent)',cap:'var(--gold)',rest:'var(--panel-2)',off:'none'};
    /* calendar */
    const cols=N?15:CH_WK,cs=N?20:18.6,rh=N?12:12,x0=N?50:74,blocks=N?2:1,by=[N?44:50,N?44+7*rh+34:0];
    s+=`<text x="${x0}" y="${N?18:22}" class="t-sm" style="fill:var(--rx)">${R.n} · ${dur} MONTHS · ${nCyc} CYCLES</text>`;
    for(let b=0;b<blocks;b++){const y0=by[b];
      for(let c=0;c<cols;c++){const wk=b*cols+c;if(wk>=CH_WK)break;
        if(wk%4===0)s+=`<text x="${f1(x0+c*cs+cs/2)}" y="${y0-5}" class="t-xs t-mid">wk ${wk}</text>`;
        for(let r=0;r<7;r++){const d=wk*7+r,k=kind(d),past=d<=day,x=x0+c*cs+1,y=y0+r*rh+1;
          s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cs-2)}" height="${rh-2}" rx="2" style="fill:${past?fill[k]:'none'};stroke:${k==='off'?'var(--line)':past?'none':'var(--line)'};${!past&&k!=='off'?'opacity:.8':''}"/>`;
          if(past&&k==='ox')s+=`<circle cx="${f1(x+cs/2-1)}" cy="${f1(y+rh/2-1)}" r="2" style="fill:var(--panel)"/>`}}
      if(N)s+=`<text x="${x0-6}" y="${f1(y0+rh*3.5+3)}" class="t-xs t-end">${b?'wk 15–29':'wk 0–14'}</text>`}
    if(!N)s+=`<text x="${x0-8}" y="${f1(by[0]+rh*3.5+3)}" class="t-xs t-end">7 days</text>`;
    /* end-of-course marker */
    const endW=endDay/7,colOf=wk=>N?wk%cols:wk,blkOf=wk=>N?Math.floor(wk/cols):0;
    {const ex=x0+colOf(endW)*cs,ey=by[blkOf(endW)];s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${ey-2}" y2="${ey+7*rh+2}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(ex+3)}" y="${ey+7*rh+12}" class="t-xs" style="fill:var(--ink)">last cycle ends</text>`}
    /* legend */
    const ly=N?by[1]+7*rh+30:by[0]+7*rh+30;
    const leg=reg==='folfox'?[['ox','oxaliplatin day'],['fu','5-FU pump'],['rest','no drug']]:[['ox','oxaliplatin day'],['cap','tablets'],['rest','week off']];
    leg.forEach(([k,l],i)=>{const lx=x0+i*(N?115:150);s+=`<rect x="${lx}" y="${ly-8}" width="12" height="9" rx="2" style="fill:${fill[k]}"/><text x="${lx+16}" y="${ly}" class="t-xs">${l}</text>`});
    /* neuropathy chart */
    const C=N?{x0:50,x1:380,y0:ly+46,y1:ly+206}:{x0:74,x1:632,y0:ly+40,y1:ly+190};
    const X=v=>lerp(C.x0,C.x1,v/CH_WK),Y=v=>lerp(C.y1,C.y0,v/60);
    s+=`<text x="${C.x0}" y="${C.y0-14}" class="t-sm" style="fill:var(--bad)">${N?'GRADE ≥2 NEUROPATHY, % (IDEA)':'PEOPLE WITH GRADE ≥2 NEUROPATHY, % (IDEA, schematic curve)'}</text>`;
    [0,20,40,60].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [0,4,8,12,16,20,24,28].forEach(v=>{if(N&&v%8)return;s+=`<text x="${f1(X(v))}" y="${C.y1+13}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${C.x1}" y="${C.y1+26}" class="t-xs t-end">weeks</text>`;
    [3,6].forEach(D=>{const on=D===dur,e=Math.min(w,CH_WK);if(e<=0)return;
      s+=`<path d="${pathFn(u=>chNeu(reg,D,u*e)/60,C.x0,X(e),C.y1,C.y0,80)}" style="fill:none;stroke:${on?'var(--bad)':'var(--muted)'};stroke-width:${on?2.8:1.4};${on?'':'stroke-dasharray:4 4;opacity:.7'}"/>`;
      const T=(D===3?12:24)+4,P=R.neu[D];if(w>=T){const lx=X(T),lyy=Y(P);s+=`<circle cx="${f1(lx)}" cy="${f1(lyy)}" r="5" style="fill:none;stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:1.8"/><text x="${f1(lx+(D===6?-8:8))}" y="${f1(lyy-8)}" class="t-xs${D===6?' t-end':''}" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${f1(P)}% · ${D} mo</text>`}});
    s+=`<line x1="${f1(X(Math.min(w,CH_WK)))}" x2="${f1(X(Math.min(w,CH_WK)))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    svg.innerHTML=s;
    const done=Math.min(nCyc,Math.floor(day/R.len)+(day>=0?1:0)),cd=Math.min(done,nCyc);
    $('#chRead').innerHTML=`<span>week <b>${f1(w)}</b></span><span>cycles started <b>${cd} of ${nCyc}</b></span><span>oxaliplatin so far <b>${cd*R.ox} mg/m²</b> (${cd} × ${R.ox}, label dose)</span><span>neuropathy grade ≥2 <b>≈${Math.round(chNeu(reg,dur,w))}%</b> (schematic)</span><span>${R.d1} [[FDA-Oxaliplatin,FDA-Xeloda]]</span>`;
    setSt(ph);$('#chNote').innerHTML=noteHTML(CH_STEPS[ph]);
  }
  const stop=playWire(rg,$('#chPlay'),draw,15000,'%t:player.replay%','chemo');
  const setSt=stepWire($('#chSteps'),CH_STEPS,rg,draw,stop);
  $$('[data-ch-reg]').forEach(b=>b.addEventListener('click',()=>{stop();reg=b.dataset.chReg;$$('[data-ch-reg]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-ch-dur]').forEach(b=>b.addEventListener('click',()=>{stop();dur=+b.dataset.chDur;$$('[data-ch-dur]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- IDEA results ---- */
  const iv=$('#chIdea');let view='risk',stopI=null;
  function drawI(k){const V=CH_IDEA[view],nn=(V.groups||V.rows).length,N=vb(iv,'720 '+(V.groups?Math.round(84+nn*(230/nn)):270),'400 '+(V.groups?84+nn*100:300));let s='';
    s+=`<text x="${N?16:30}" y="22" class="t-sm" style="fill:var(--rx)">${V.t.toUpperCase()}</text>`;
    if(V.groups){const n=V.groups.length,x0=N?92:200,x1=N?380:680,rowH=N?100:(230/n),bh=N?18:20;
      const Xs=v=>lerp(x0,x1,v/100);
      [0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(Xs(v))}" x2="${f1(Xs(v))}" y1="40" y2="${f1(44+rowH*n)}" class="grid"/><text x="${f1(Xs(v))}" y="${f1(58+rowH*n)}" class="t-xs t-mid">${v}%</text>`);
      V.groups.forEach(([l,a,b],i)=>{const y=46+i*rowH;
        suWrap(l,N?12:26).forEach((ll,j)=>s+=`<text x="${x0-10}" y="${f1(y+16+j*13)}" class="t-sm t-end" style="fill:var(--ink)">${ll}</text>`);
        [[a,'3 months','var(--rx)'],[b,'6 months','var(--accent)']].forEach(([v,lab,c],j)=>{const yy=y+j*(bh+6),wv=Xs(v*k)-x0;
          s+=`<rect x="${x0}" y="${f1(yy)}" width="${f1(Math.max(0,wv))}" height="${bh}" rx="3" style="fill:${c};opacity:.85"/>`;
          s+=`<text x="${f1(x0+6)}" y="${f1(yy+bh/2+4)}" class="t-xs" style="fill:var(--panel);font-weight:700">${lab}</text>`;
          if(k>.9)s+=`<text x="${f1(Math.max(x0+wv-6,x0+70))}" y="${f1(yy+bh/2+4)}" class="t-xs t-end" style="fill:var(--panel);font-weight:700">${f1(v)}%</text>`})})}
    else{const x0=N?120:240,x1=N?380:660,lo=.8,hi=1.3,Xh=v=>lerp(x0,x1,(v-lo)/(hi-lo)),n=V.rows.length,rowH=N?70:56,y0=60;
      [.8,.9,1,1.1,1.2,1.3].forEach(v=>s+=`<line x1="${f1(Xh(v))}" x2="${f1(Xh(v))}" y1="${y0-14}" y2="${y0+rowH*n-20}" class="${v===1?'axis':'grid'}"/><text x="${f1(Xh(v))}" y="${y0+rowH*n}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
      s+=`<line x1="${f1(Xh(1.12))}" x2="${f1(Xh(1.12))}" y1="${y0-24}" y2="${y0+rowH*n-20}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:5 4"/><text x="${f1(Xh(1.12)+4)}" y="${y0-26}" class="t-xs" style="fill:var(--bad)">margin 1.12</text>`;
      s+=`<text x="${f1(Xh(.9))}" y="${y0+rowH*n+16}" class="t-xs t-mid">← 3 months better</text><text x="${f1(Xh(1.2))}" y="${y0+rowH*n+16}" class="t-xs t-mid">6 months better →</text>`;
      V.rows.forEach(([l,h,a,b],i)=>{const y=y0+i*rowH,ok=b<1.12,c=ok?'var(--good)':'var(--bad)',m=lerp(1,h,k),la=lerp(1,a,k),lb=lerp(1,b,k);
        s+=`<text x="${x0-12}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${l}</text><text x="${x0-12}" y="${y+18}" class="t-xs t-end">${h.toFixed(2)} (${a.toFixed(2)}–${b.toFixed(2)})</text>`;
        s+=`<line x1="${f1(Xh(la))}" x2="${f1(Xh(lb))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2.6"/><rect x="${f1(Xh(m)-6)}" y="${y-6}" width="12" height="12" style="fill:${c}"/>`;
        if(k>.95)s+=`<text x="${f1(Xh(b)+8)}" y="${y+4}" class="t-xs" style="fill:${c};font-weight:700">${ok?'non-inferior':'not shown'}</text>`})}
    iv.innerHTML=s}
  function showI(){$('#chIdeaNote').innerHTML=noteHTML(CH_IDEA[view].note);if(stopI)stopI();stopI=animate(900,p=>drawI(ease(p)))}
  $$('[data-ch-idea]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.chIdea;$$('[data-ch-idea]').forEach(x=>x.setAttribute('aria-pressed',x===b));showI()}));
  drawI(1);$('#chIdeaNote').innerHTML=noteHTML(CH_IDEA[view].note);
  onHide.chemo=(f=>()=>{f&&f();if(stopI)stopI()})(onHide.chemo);
  const prevR=redraws.chemo;redraws.chemo=()=>{prevR&&prevR();drawI(1)};

  /* ---- who benefits ---- */
  const sel=$('#chWho');
  function who(){const L=CH_WHO[sel.value];$('#chWhoOut').innerHTML=`<ul>${L.map(x=>`<li>${x}</li>`).join('')}</ul>`}
  sel.addEventListener('change',who);who();
};
