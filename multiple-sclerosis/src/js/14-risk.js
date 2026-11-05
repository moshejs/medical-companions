
/* =============== 1.4 risk: genes & risk factors =============== */
/* rows: n name, m measure, v estimate, lo/hi 95% CI (null = not reported), e early evidence */
const RK_G=['Genes & family','Epstein-Barr virus','Sun & vitamin D','Habits & body size'];
const RK_ROWS=[
 {g:0,n:'HLA-DRB1*15:01, per copy',m:'OR',v:3.92,lo:3.74,hi:4.12,c:'3.92 (3.74–4.12)'},
 {g:0,n:'HLA-DRB1*15:01, two copies',m:'OR',v:8.30,lo:null,hi:null,c:'8.30'},
 {g:0,n:'HLA-A*02:01 (protective)',m:'OR',v:.67,lo:.64,hi:.70,c:'0.67 (0.64–0.70)'},
 {g:0,n:'A sibling has MS',m:'RR',v:7.13,lo:6.42,hi:7.93,c:'7.13 (6.42–7.93)'},
 {g:0,n:'Identical co-twin has MS',m:'RR',v:23.6,lo:8.7,hi:64.0,c:'23.6 (8.7–64.0)'},
 {g:1,n:'EBV infection (seroconversion)',m:'HR',v:32.4,lo:4.3,hi:245.3,c:'32.4 (4.3–245.3)'},
 {g:1,n:'Past infectious mononucleosis',m:'RR',v:2.17,lo:1.97,hi:2.39,c:'2.17 (1.97–2.39)'},
 {g:2,n:'Vitamin D 50 nmol/L higher',m:'OR',v:.59,lo:.36,hi:.97,c:'0.59 (0.36–0.97)'},
 {g:2,n:'Newborn vitamin D 25 nmol/L higher',m:'OR',v:.70,lo:.57,hi:.84,e:1,c:'0.70 (0.57–0.84)'},
 {g:2,n:'Genetically lower vitamin D, 1 SD',m:'OR',v:2.0,lo:1.7,hi:2.5,c:'2.0 (1.7–2.5)'},
 {g:3,n:'Smoking (meta-analysis)',m:'OR',v:1.54,lo:1.46,hi:1.63,c:'1.54 (1.46–1.63)'},
 {g:3,n:'Passive smoke, never-smokers',m:'OR',v:1.3,lo:1.1,hi:1.6,e:1,c:'1.3 (1.1–1.6)'},
 {g:3,n:'Obesity at age 18 (BMI 30+)',m:'RR',v:2.25,lo:1.50,hi:3.37,c:'2.25 (1.50–3.37)'},
 {g:3,n:'Genetically higher BMI, 1 SD',m:'OR',v:1.41,lo:1.20,hi:1.66,c:'1.41 (1.20–1.66)'},
 {g:3,n:'Shift work when young',m:'OR',v:1.6,lo:1.2,hi:2.1,e:1,c:'1.6 (1.2–2.1)'},
 {g:3,n:'Coffee over 900 mL a day',m:'OR',v:.70,lo:.49,hi:.99,e:1,c:'0.70 (0.49–0.99)'}];
const RK_STEPS=[
 {from:0,at:.2,k:'Step 1 · Genes',t:'Many small effects, one big one',
  txt:`<span class="ev est">Established</span> The 2019 genomic map (47,429 people with MS, 68,374 controls) found 200 susceptibility variants outside the MHC, 1 on the X chromosome and 32 within the MHC; together they explain up to 48% of the heritability that genome-wide data can estimate. [[IMSGC2019]] The largest single effect is HLA-DRB1*15:01: odds ratio 3.92 per copy and 8.30 with two copies. HLA-A*02:01 is protective (OR 0.67). [[Moutsianas2015]] Family risk is real: in Sweden a sibling of a person with MS had 7.13 times and an identical co-twin 23.6 times the risk of matched controls, and heritability was estimated at 0.64. [[Westerlind2014]] Spouses had no increased risk in Denmark. [[Nielsen2005]]`,
  pt:`No single gene causes MS. Many small genetic nudges add up, and one gene type, HLA-DRB1*15:01, pushes harder than the rest.`,
  hook:`HLA-DRB1*15:01 (class II) is the strongest genetic risk factor, OR about 3.9 per copy; HLA-A*02:01 (class I) is protective. More than 200 other variants each add a little.`},
 {from:.25,at:.45,k:'Step 2 · Epstein-Barr virus',t:'Infection comes first',
  txt:`<span class="ev est">Established</span> In more than 10 million young adults on US military duty (955 later diagnosed with MS), risk rose 32-fold after EBV infection: HR 32.4, 95% CI 4.3–245.3. The interval is wide because very few EBV-negative people developed MS. No other virus, including cytomegalovirus, raised risk. [[Bjornevik2022,Kettunen2024]] A history of infectious mononucleosis, a symptomatic first EBV infection, roughly doubles risk (RR 2.17). [[Handel2010]] In the German national cohort, 901 of 901 people with early MS were EBV-seropositive. [[Abrahamyan2020]] About 90% or more of adults carry EBV, so it appears necessary but not sufficient. [[Aloisi2023,Robinson2022]]`,
  pt:`Almost everyone with MS has had the Epstein-Barr virus, the cause of glandular fever. But almost everyone else has had it too, so it is not enough on its own.`,
  hook:`EBV: HR 32.4 after seroconversion (Bjornevik 2022). EBV-negative people almost never develop MS. "Necessary but not sufficient."`},
 {from:.5,at:.7,k:'Step 3 · Sun & vitamin D',t:'Latitude, season of birth, vitamin D',
  txt:`Among white US service members, each 50 nmol/L higher serum 25-hydroxyvitamin D went with lower MS risk (OR 0.59, 95% CI 0.36–0.97), strongest for levels measured before age 20; no association was found in Black and Hispanic members, who had lower levels. [[Munger2006]] Newborn levels point the same way. [[Nielsen2017]] Mendelian randomisation, which uses gene variants that lower vitamin D and so avoids reverse causation, found that a 1-SD genetically lower level doubled the odds of MS (OR 2.0). [[Mokry2015]] MS prevalence rises by 5.27 per 100,000 for each degree of latitude [[Simpson2019]], and among 42,045 people with MS, 9.1% more were born in May and 8.5% fewer in November than expected. [[Willer2005]] Whether supplements change anything is a separate question: see the controversy below.`,
  pt:`People who live farther from the equator, and people with low vitamin D, develop MS more often. Showing that taking vitamin D changes that is much harder.`,
  hook:`Low vitamin D: prospective, newborn and Mendelian-randomisation studies point to a causal role in risk. Trials in people who already have MS are mixed.`},
 {from:.75,at:.97,k:'Step 4 · Habits',t:'Smoking and teenage obesity',
  txt:`<span class="ev est">Established</span> Smoking: pooled OR 1.54 in a meta-analysis that judged the evidence for causation strong [[Degelman2017]]; in Sweden risk rose with dose and stayed raised for up to 5 years after quitting. [[Hedstrom2009]] Passive smoke exposure in never-smokers: OR 1.3. [[Hedstrom2011Passive]] Swedish snuff used for more than 15 years went with lower risk (OR 0.3), so the authors suspect lung irritation rather than nicotine. [[Hedstrom2009]] Obesity at age 18: RR 2.25, while adult BMI showed no association [[Munger2009]]; genetically higher BMI: OR 1.41 per SD. [[Mokry2016]] <span class="ev early">Early evidence</span> Shift work when young (OR 1.6) was not confirmed overall in the prospective Nurses' Health Studies [[Hedstrom2011Shift,Papantoniou2019]], and the inverse link with coffee comes from case-control studies. [[Hedstrom2016]]`,
  pt:`Smoking, including breathing other people's smoke, and being very overweight as a teenager both raise the risk.`,
  hook:`Smoking (OR about 1.5) and adolescent obesity (RR about 2.2) are established, modifiable risk factors. Adult BMI is not.`}
];
function rkLog(a,b,x0,x1){const la=Math.log10(a),lb=Math.log10(b);return v=>x0+(Math.log10(clamp(v,a,b))-la)/(lb-la)*(x1-x0)}
const rkCI=r=>`${r.m} ${r.c}`;
/* one log-scale bar: from 1 to v, whisker lo–hi, dot at v; g = 0..1 growth */
function rkBar(X,y,r,g,o={}){const h=o.h||10;let s='';const x1=X(1),xv=X(Math.exp(Math.log(r.v)*g));
  const up=r.v>=1,c=o.c||(up?'var(--attack)':'var(--good)');
  s+=`<rect x="${f1(Math.min(x1,xv))}" y="${f1(y-h/2)}" width="${f1(Math.abs(xv-x1))}" height="${h}" rx="2" style="fill:${c};opacity:${o.dim||r.e?.4:.8}${r.e?`;stroke:${c};stroke-width:1.2;stroke-dasharray:3 2`:''}"/>`;
  if(g>=.99&&r.lo!=null){const w=ramp(o.ci==null?1:o.ci,0,1);const a=X(Math.exp(lerp(Math.log(r.v),Math.log(r.lo),w))),b=X(Math.exp(lerp(Math.log(r.v),Math.log(r.hi),w)));
    s+=`<line x1="${f1(a)}" x2="${f1(b)}" y1="${y}" y2="${y}" style="stroke:var(--ink);stroke-width:1.6;${r.e?'stroke-dasharray:4 3':''}"/><line x1="${f1(a)}" x2="${f1(a)}" y1="${y-5}" y2="${y+5}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(b)}" x2="${f1(b)}" y1="${y-5}" y2="${y+5}" style="stroke:var(--ink);stroke-width:1.6"/>`}
  if(g>0)s+=`<circle cx="${f1(xv)}" cy="${y}" r="${o.dim?3.5:4.5}" style="fill:var(--ink);stroke:var(--panel);stroke-width:1.5"/>`;
  return s}
function rkAxis(X,ticks,y0,y1,yl){let s='';ticks.forEach(v=>{const x=f1(X(v));s+=`<line x1="${x}" x2="${x}" y1="${y0}" y2="${y1}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--muted);stroke-width:1.4"':''}/><text x="${x}" y="${yl}" class="t-xs t-mid"${v===1?' style="fill:var(--ink);font-weight:600"':''}>${v}</text>`});return s}
inits.risk=()=>{
  /* ---------- 1. the explorer ---------- */
  const svg=$('#rkSvg'),rg=$('#rkT');
  function draw(t){
    const N=vb(svg,'720 512','400 908');
    const L=N?{x0:20,x1:380,top:58,gh:40,rh:40,lab:'above'}:{x0:280,x1:580,top:52,gh:24,rh:21,lab:'left'};
    const X=rkLog(.25,300,L.x0,L.x1);
    const step=phaseOf(RK_STEPS,t);
    let s='';
    /* layout rows */
    let y=L.top;const pos=[];let gPrev=-1;const gy=[];
    RK_ROWS.forEach((r,i)=>{if(r.g!==gPrev){gy.push(y);y+=L.gh;gPrev=r.g}pos.push(y+(N?6:L.rh/2));y+=L.rh});
    const yEnd=y;
    s+=rkAxis(X,[.5,1,2,5,10,30,100,300],L.top-6,yEnd,yEnd+16);
    s+=`<text x="${f1(X(1)-8)}" y="${L.top-16}" class="t-xs t-end" style="fill:var(--good)">← lower risk</text><text x="${f1(X(1)+8)}" y="${L.top-16}" class="t-xs" style="fill:var(--attack)">higher risk →</text>`;
    s+=`<text x="${N?L.x0:L.x1}" y="${yEnd+32}" class="t-xs${N?'':' t-end'}">ratio, log scale (1 = no difference)</text>`;
    RK_G.forEach((g,k)=>{const on=k<=step;s+=`<text x="${N?12:12}" y="${gy[k]+16}" class="t-sm" style="font-weight:600;fill:${k===step?'var(--ink)':'var(--muted)'};opacity:${on?1:.5}">${(k+1)+' · '+g.toUpperCase()}</text>`;
      if(!N)s+=`<line x1="12" x2="708" y1="${gy[k]+20}" y2="${gy[k]+20}" style="stroke:var(--line)"/>`});
    RK_ROWS.forEach((r,i)=>{const yy=pos[i];
      const k=RK_ROWS.filter((q,j)=>j<i&&q.g===r.g).length,a=r.g*.25+.02+k*.03;
      const g=ease(ramp(t,a,a+.1)),ci=ramp(t,a+.1,a+.14),on=g>0;
      const ly=N?yy-10:yy+4;
      s+=`<text x="12" y="${ly}" class="t-lbl" style="paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round;font-size:${N?13:12.5}px;opacity:${on?1:.4}">${r.n}</text>`;
      if(on)s+=`<text x="${N?388:592}" y="${N?ly:yy+4}" class="t-sm${N?' t-end':''}" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round">${rkCI(r)}</text>`;
      s+=rkBar(X,yy+(N?6:0),r,g,{ci,h:N?11:10});
      if(!N&&r.g===1&&r.lo!=null&&r.v>30&&ci>.9)s+=`<text x="${f1(X(r.hi))}" y="${yy+(N?22:-7)}" class="t-xs t-end">CI 4.3 to 245: few EBV-negative cases</text>`;
    });
    svg.innerHTML=s;
    setSt(step);$('#rkNote').innerHTML=noteHTML(RK_STEPS[step]);
  }
  const stop=playWire(rg,$('#rkPlay'),draw,16000,'Replay','risk');
  const setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. family: relative vs absolute ---------- */
  const RF=[
    {n:'General population',sn:'Population',rr:{v:1},abs:{v:.5,lo:.3,txt:'0.3% men · 0.5% women'},per:5},
    {n:'Cousin',rr:null,abs:{v:.57,lo:.47,hi:.67}},
    {n:'Child of a person with MS',sn:'Child',rr:{v:5.77,lo:5.17,hi:6.45},abs:{v:2.03,lo:1.86,hi:2.20},per:20},
    {n:'Sibling',sn:'Sibling',rr:{v:7.13,lo:6.42,hi:7.93},abs:{v:2.55,lo:2.09,hi:3.01},per:26},
    {n:'Maternal half-sibling',rr:{v:4.45,lo:3.25,hi:6.09},abs:null},
    {n:'Paternal half-sibling',rr:{v:3.29,lo:2.29,hi:4.72},abs:null},
    {n:'Non-identical co-twin',rr:{v:2.18,lo:.71,hi:6.68,ns:1},abs:{v:3,lo:0,hi:8,conc:1,txt:'3% (0–8), concordance'}},
    {n:'Identical co-twin',sn:'Identical twin',rr:{v:23.6,lo:8.7,hi:64.0},abs:{v:17.3,lo:8.4,hi:26.1,extra:[24,25.3]},per:173},
    {n:'Adopted relative',rr:{v:1.78,lo:.49,hi:6.06,ns:1},abs:null}];
  const rsvg=$('#rfSvg'),rrg=$('#rfT');let absM=false,pick=3;
  $('#rfPick').innerHTML='<span class="kicker">In 1,000 people</span>'+RF.map((r,i)=>r.per?`<button class="btn" data-rf="${i}" aria-pressed="${i===pick}">${r.sn}</button>`:'').join('');
  function rdraw(t){
    const N=vb(rsvg,'720 380',absM?'400 816':'400 650');
    const L=N?{x0:16,x1:380,top:46,rh:44,vx:388}:{x0:200,x1:366,top:52,rh:30,vx:374};
    const X=absM?(v=>L.x0+clamp(v/30)*(L.x1-L.x0)):rkLog(.5,100,L.x0,L.x1);
    let s='';const yEnd=L.top+RF.length*L.rh;
    if(absM){[0,5,10,15,20,25,30].forEach(v=>{const x=f1(X(v));s+=`<line x1="${x}" x2="${x}" y1="${L.top-8}" y2="${yEnd}" class="${v?'grid':'axis'}"/><text x="${x}" y="${yEnd+15}" class="t-xs t-mid">${v}%</text>`});
      s+=`<text x="${N?L.x0:L.x1}" y="${yEnd+30}" class="t-xs${N?'':' t-end'}">absolute risk of developing MS</text>`;
      s+=`<path d="M16 ${yEnd+40} l4 7 -4 7 -4 -7z" style="fill:var(--orange)"/><text x="26" y="${yEnd+51}" class="t-xs">${N?'orange: twin concordance (◆ 24% DK, 25.3% CA)':'orange: twin concordance; ◆ identical twins 24% (Denmark), 25.3% (Canada)'}</text>`}
    else{s+=rkAxis(X,[.5,1,2,5,10,20,50,100],L.top-8,yEnd,yEnd+15);s+=`<text x="${N?L.x0:L.x1}" y="${yEnd+30}" class="t-xs${N?'':' t-end'}">times the population risk (log scale)</text>`}
    s+=`<text x="12" y="${L.top-22}" class="t-sm" style="font-weight:600;fill:var(--ink)">${absM?'ABSOLUTE RISK (%)':'RELATIVE RISK (× population)'}</text>`;
    RF.forEach((r,i)=>{const y=L.top+i*L.rh+(N?24:L.rh/2),ly=N?y-12:y+4;const g=ease(ramp(t,.05+i*.06,.25+i*.06));
      const sel=i===pick&&absM;
      s+=`<text x="12" y="${ly}" class="t-lbl" style="paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round;font-size:13px${sel?';fill:var(--brand)':''}">${r.n}</text>`;
      const d=absM?r.abs:r.rr;
      if(!d){s+=`<text x="${N?L.vx:L.x0+4}" y="${N?ly:y+4}" class="t-xs${N?' t-end':''}">${absM?'absolute risk not reported':'relative risk not reported'}</text>`;return}
      if(absM){const xv=X(d.v*g);s+=`<rect x="${L.x0}" y="${y-6}" width="${f1(xv-L.x0)}" height="12" rx="2" style="fill:${d.conc?'var(--orange)':'var(--attack)'};opacity:.8"/>`;
        if(g>.99&&d.hi!=null)s+=`<line x1="${f1(X(d.lo))}" x2="${f1(X(d.hi))}" y1="${y}" y2="${y}" style="stroke:var(--ink);stroke-width:1.5${d.conc?';stroke-dasharray:3 3':''}"/>`;
        if(g>.99&&d.extra)d.extra.forEach(v=>{s+=`<path d="M${f1(X(v))} ${y-8} l4 8 -4 8 -4 -8z" style="fill:var(--orange)"/>`});
        if(g>.99&&!d.hi&&d.lo)s+=`<line x1="${f1(X(d.lo))}" x2="${f1(X(d.lo))}" y1="${y-8}" y2="${y+8}" style="stroke:var(--ink);stroke-width:2"/>`}
      else{if(i===0){s+=`<circle cx="${f1(X(1))}" cy="${y}" r="5" style="fill:var(--ink)"/>`}else s+=rkBar(X,y,{v:d.v,lo:d.lo,hi:d.hi,e:d.ns},g,{h:12})}
      if(g>.99){let tx;if(absM)tx=d.txt||`${d.v}% (${d.lo}–${d.hi})`;
        else tx=i===0?'1 (reference)':`× ${d.v} (${d.lo}–${d.hi})${d.ns?' n.s.':''}`;
        s+=`<text x="${L.vx}" y="${N?ly:y+4}" class="t-sm${N?' t-end':''}" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round">${tx}</text>`}
    });
    /* right panel: 1,000-person grid (absolute) or the big multiplier (relative) */
    const r=RF[pick];
    const G=N?{x:20,y:yEnd+96,cols:40,p:9,rr:3.2}:{x:520,y:56,cols:40,p:4.8,rr:1.8};
    if(N){s+=`<line x1="12" x2="388" y1="${yEnd+(absM?62:40)}" y2="${yEnd+(absM?62:40)}" style="stroke:var(--line)"/>`}
    if(absM){const fill=Math.round(r.per*ramp(t,.55,1));
      if(!N)s+=`<text x="${G.x}" y="${G.y-14}" class="t-sm" style="font-weight:600;fill:var(--ink)">${r.sn.toUpperCase()}: 1,000 PEOPLE</text>`;
      else s+=`<text x="${G.x}" y="${G.y-10}" class="t-sm" style="font-weight:600;fill:var(--ink)">${r.sn.toUpperCase()}: 1,000 PEOPLE</text>`;
      for(let k=0;k<1000;k++){const cx=G.x+(k%G.cols)*G.p+G.rr,cy=G.y+Math.floor(k/G.cols)*G.p+G.rr;s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${G.rr}" style="fill:${k<fill?'var(--attack)':'var(--line)'}"/>`}
      const gy=G.y+25*G.p+16;
      s+=`<text x="${G.x}" y="${gy}" class="t-sm" style="fill:var(--ink)">about ${r.per} develop MS (${r===RF[0]?'0.5%, women':r.abs.v+'%'})</text><text x="${G.x}" y="${gy+15}" class="t-sm">about ${1000-r.per} do not</text>`}
    else{const cx=N?200:632,cy=N?yEnd+120:150;const v=r.rr.v;
      s+=`<text x="${cx}" y="${cy}" class="t-mid" style="font:800 ${N?44:52}px var(--display);fill:var(--attack)">${v===1?'1×':'×'+v}</text>`;
      s+=`<text x="${cx}" y="${cy+28}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${r.sn}</text><text x="${cx}" y="${cy+43}" class="t-sm t-mid" style="fill:var(--ink)">${v===1?'the reference risk':'times the population risk'}</text>`;
      s+=`<text x="${cx}" y="${cy+64}" class="t-sm t-mid">Switch to absolute risk</text><text x="${cx}" y="${cy+79}" class="t-sm t-mid">to see 1,000 people.</text>`}
    rsvg.innerHTML=s;
    const sib=`A sibling of a person with MS has about 7 times the risk of the general population, yet the age-adjusted absolute risk is 2.55%: about 97 in 100 siblings never develop MS. A child's risk is 2.03%, a cousin's 0.57%. [[Westerlind2014]]`;
    $('#rfNote').innerHTML=absM?noteHTML({k:'Absolute risk',t:`${r.sn}: about ${r.per} in 1,000`,
      txt:`${sib} For an identical co-twin the Swedish age-adjusted risk is 17.3%; probandwise concordance was 24% in Denmark and 25.3% in Canada, versus 3% and 5.4% for non-identical twins. [[Westerlind2014,Hansen2005,Willer2003]] For comparison, the sporadic lifetime risk in Denmark was 0.5% in women and 0.3% in men. [[Nielsen2005]] Rows marked "not reported" had relative risks only.`,
      pt:`Even with a close relative who has MS, most family members never get it.`,
      hook:`Sibling risk about 2.5%, child about 2%, identical twin about 17–25%. Identical twins share all their genes yet are concordant only about 1 time in 4: environment matters.`})
      :noteHTML({k:'Relative risk',t:'How many times the population risk',
      txt:`Swedish registry, 28,396 people with MS, relatives compared with matched controls: identical co-twin 23.6, sibling 7.13, child 5.77, maternal half-sibling 4.45, paternal half-sibling 3.29. Non-identical co-twins (2.18) and adopted relatives (1.78) did not differ significantly from controls (n.s.). [[Westerlind2014]] The shared-environment component of heritability was 0.01, and spouses had no increased risk in Denmark. [[Westerlind2014,Nielsen2005]]`,
      pt:`A relative risk says how many times more likely something is. It does not say how likely. For that, switch to absolute risk.`,
      hook:`Sibling recurrence risk ratio (λs) about 7 in population registries, lower than older clinic-based estimates.`});
  }
  playWire(rrg,$('#rfPlay'),rdraw,6000,'Replay','risk');
  const setMode=a=>{absM=a;$('#rfRel').setAttribute('aria-pressed',!a);$('#rfAbs').setAttribute('aria-pressed',a);rrg.value=0;rdraw(0);if(!RM)$('#rfPlay').click();else{rrg.value=1;rdraw(1)}};
  $('#rfRel').addEventListener('click',()=>setMode(false));
  $('#rfAbs').addEventListener('click',()=>setMode(true));
  $('#rfPick').addEventListener('click',e=>{const b=e.target.closest('[data-rf]');if(!b)return;pick=+b.dataset.rf;$$('[data-rf]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(!absM)setMode(true);else rdraw(+rrg.value)});
  rdraw(+rrg.value);

  /* ---------- 3. gene × environment ---------- */
  const IX=[
    {n:'Neither factor',sm:0,h:0,v:1},
    {n:'Smoker, no HLA risk genotype',sm:1,h:0,v:1.4,lo:.9,hi:2.1},
    {n:'HLA risk genotype, non-smoker',sm:0,h:1,v:4.9,lo:3.6,hi:6.6},
    {n:'HLA risk genotype + smoker',sm:1,h:1,v:13.5,lo:8.1,hi:22.6},
    {sep:'Other combinations, each versus neither factor'},
    {n:'HLA risk genotype + teen obesity',v:16.2,lo:7.5,hi:35.2},
    {n:'Mononucleosis + teen obesity',v:14.7,lo:5.9,hi:36.6,e:1},
    {n:'HLA genotype + passive smoke',v:7.7,lo:5.5,hi:10.8,e:1}];
  const isvg=$('#ixSvg'),irg=$('#ixT');let ism=true,ih=true;
  function idraw(t){
    const N=vb(isvg,'720 330','400 560');
    const L=N?{x0:20,x1:380,top:52,rh:56,sh:40}:{x0:290,x1:590,top:46,rh:30,sh:34};
    const X=rkLog(.5,50,L.x0,L.x1);let s='';let y=L.top;const P=[];
    IX.forEach(r=>{if(r.sep){P.push(y);y+=L.sh}else{P.push(y);y+=L.rh}});
    s+=rkAxis(X,[.5,1,2,5,10,20,50],L.top-8,y,y+15);
    s+=`<text x="${N?L.x0:L.x1}" y="${y+30}" class="t-xs${N?'':' t-end'}">odds ratio, log scale</text>`;
    let k=0;
    IX.forEach((r,i)=>{const yy=P[i]+(N?30:L.rh/2);
      if(r.sep){s+=`<text x="12" y="${P[i]+(N?26:22)}" class="t-sm" style="font-weight:600;fill:var(--ink);opacity:${f1(ramp(t,.55,.6))}">${N?'OTHER COMBINATIONS':r.sep.toUpperCase()}</text>`;return}
      const a=k<4?.04+k*.11:.56+(k-4)*.1;k++;
      const g=ease(ramp(t,a,a+.08)),sel=r.sm===+ism&&r.h===+ih&&r.sm!=null;
      const ly=N?yy-14:yy+4;
      if(sel)s+=`<rect x="6" y="${f1(yy-(N?28:13))}" width="${(N?388:708)}" height="${N?44:26}" rx="8" style="fill:var(--brand-soft)"/>`;
      s+=`<text x="12" y="${ly}" class="t-lbl" style="paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round;font-size:13px;opacity:${g>0?1:.4}">${r.n}</text>`;
      if(r.v===1){if(g>0)s+=`<circle cx="${f1(X(1))}" cy="${yy}" r="5" style="fill:var(--ink)"/>`}
      else s+=rkBar(X,yy,{v:r.v,lo:r.lo,hi:r.hi,e:r.e},g,{h:N?11:10,ci:ramp(t,a+.08,a+.11)});
      if(g>.99)s+=`<text x="${N?388:600}" y="${N?ly:yy+4}" class="t-sm${N?' t-end':''}" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round">${r.v===1?'1 (reference)':`OR ${r.v} (${r.lo}–${r.hi})`}</text>`;
      if(r.v===13.5){const o=ramp(t,.46,.52);if(o>0){const xm=X(6.86);s+=`<g style="opacity:${f1(o)}"><line x1="${f1(xm)}" x2="${f1(xm)}" y1="${yy-9}" y2="${yy+9}" style="stroke:var(--brand);stroke-width:3"/><text x="${f1(xm)}" y="${yy+(N?22:-9)}" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">${N?'1.4 × 4.9 ≈ 6.9 if just multiplied':'1.4 × 4.9 ≈ 6.9'}</text></g>`}}
    });
    isvg.innerHTML=s;
    const r=IX.find(q=>q.sm===+ism&&q.h===+ih);
    const tx={'00':`People who neither smoke nor carry the HLA risk genotype are the reference group (OR 1).`,
      '10':`Smokers without the HLA risk genotype: OR 1.4 (0.9–2.1), not clearly raised in this study.`,
      '01':`Non-smokers who carry DRB1*15 and lack A*02: OR 4.9 (3.6–6.6).`,
      '11':`Smokers who carry DRB1*15 and lack A*02: OR 13.5 (8.1–22.6). If the two effects simply multiplied, 1.4 × 4.9 would give about 6.9 (calculated here). Smoking multiplied risk by 2.8 in people with both HLA risk factors, but by 1.4 in people with neither.`}[`${+ism}${+ih}`];
    $('#ixNote').innerHTML=noteHTML({k:'Gene × environment · Swedish case-control study, 843 cases',t:`${ism?'Smoker':'Non-smoker'}, ${ih?'HLA risk genotype':'no HLA risk genotype'}: OR ${r.v}`,
      txt:`${tx} [[Hedstrom2011Smoking]] The same pattern appears for adolescent obesity with the HLA genes (OR 16.2) [[Hedstrom2014Obesity]], for obesity with infectious mononucleosis after age 10 (OR 14.7, regardless of HLA) [[Hedstrom2015]] and for passive smoke (OR 7.7 with exposure versus 4.5 without, in never-smokers with both genotypes). [[Hedstrom2014Passive]] Reviews read this as smoking, EBV and obesity acting through a shared adaptive-immune pathway with the HLA genes. [[Olsson2017]]`,
      pt:`A risky gene and a risky habit together raise the risk far more than either one alone.`,
      hook:`Interaction: smoking × HLA-DRB1*15 without A*02 gives OR 13.5; obesity × HLA 16.2; obesity × mononucleosis 14.7.`});
  }
  playWire(irg,$('#ixPlay'),idraw,9000,'Replay','risk');
  const ixT=(b,v)=>{b.setAttribute('aria-pressed',v);b.textContent=v?'Yes':'No'};
  $('#ixSm').addEventListener('click',()=>{ism=!ism;ixT($('#ixSm'),ism);idraw(+irg.value)});
  $('#ixHla').addEventListener('click',()=>{ih=!ih;ixT($('#ixHla'),ih);idraw(+irg.value)});
  idraw(+irg.value);

  /* ---------- 4. EBV timeline ---------- */
  const EB_STEPS=[
    {from:0,at:.1,k:'Step 1 · Before',t:'Stored blood: EBV-negative',
     txt:`The US military stores serum from routine tests. Bjornevik and colleagues used samples from more than 10 million young adults, 955 of whom were diagnosed with MS during service, and looked at people who were EBV-negative in their first sample. [[Bjornevik2022]] An earlier study in the same repository found that all 10 initially EBV-negative cases became EBV-positive before MS onset, against 35.7% of controls. [[Levin2010]]`,
     pt:`Researchers went back to blood samples taken years before anyone had MS symptoms.`},
    {from:.2,at:.3,k:'Step 2 · Infection',t:'Seroconversion: risk rises 32-fold',
     txt:`After EBV seroconversion, MS risk rose 32-fold (HR 32.4, 95% CI 4.3–245.3); EBV-positive versus EBV-negative status gave HR 26.5. [[Bjornevik2022,Kettunen2024]] Cytomegalovirus, which spreads in a similar way, did not raise risk, and screening against more than 200 human virus species found no other virus that differed between cases and controls. [[Bjornevik2022,Hrastelj2022]]`,
     pt:`Catching EBV came before MS, and made it far more likely. Another common virus, CMV, did not.`,
     hook:`Bjornevik 2022: HR 32.4 after EBV seroconversion; no rise after CMV.`},
    {from:.45,at:.6,k:'Step 3 · Nerve damage',t:'Neurofilament rises only after infection',
     txt:`Serum neurofilament light chain, a marker of nerve-fibre damage, did not differ between future cases and controls before or at EBV seroconversion. It rose only after seroconversion in people who later developed MS. So the infection came before the first sign of nerve-fibre injury, which argues against MS (or its earliest damage) causing EBV infection. [[Bjornevik2022,Hrastelj2022]]`,
     pt:`The blood marker of nerve damage stayed normal until after the virus arrived. Then it started to climb in the people who went on to get MS.`},
    {from:.72,at:.88,k:'Step 4 · Onset',t:'MS onset a median 7.5 years later',
     txt:`All but one case seroconverted before clinical onset, with a median gap of 7.5 years. [[Hrastelj2022]] <span class="ev early">Controversy</span> Most reviews call EBV a probable necessary but not sufficient cause: most infected people never develop MS, so host factors such as HLA and control of autoreactive cells decide the outcome. [[Aloisi2023,Robinson2022,Vietzen2023]] A 2026 population-based research letter titled "Multiple Sclerosis Onset Preceding Epstein-Barr Virus Infection" reports the opposite order in some people; its numbers could not be verified for this guide. [[Rotstein2026]] Antibodies from MS spinal-fluid B cells bind both EBV's EBNA1 and the brain protein GlialCAM, a proposed molecular mimicry. [[Lanz2022]]`,
     pt:`MS symptoms started years after the infection. EBV seems to be needed, but other things decide who goes on to get MS.`,
     hook:`EBV precedes MS; NfL rises after seroconversion; median 7.5 years to onset. Molecular mimicry: EBNA1 and GlialCAM.`}];
  const esvg=$('#ebSvg'),erg=$('#ebT');
  function edraw(t){
    const N=vb(esvg,'720 372','400 444');
    const L=N?{x0:30,x1:384,t1:66,nfT:150,nfB:290,t3:350,lbl:'above',sx:16,stat:[16,430]}:{x0:150,x1:700,t1:60,nfT:110,nfB:240,t3:290,lbl:'left',sx:12,stat:[150,340]};
    const Y0=-3,Y1=10,X=y=>lerp(L.x0,L.x1,(y-Y0)/(Y1-Y0)),yr=lerp(Y0,Y1,t),xc=X(yr);
    const step=phaseOf(EB_STEPS,t);let s=`<defs>${marker('ebA')}</defs>`;
    /* track 1: a future MS case */
    const lab=(y,tx)=>N?`<text x="${L.sx}" y="${y-14}" class="t-lbl" style="paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round;font-size:13px">${tx}</text>`:`<text x="${L.x0-12}" y="${y+4}" class="t-lbl t-end" style="font-size:13px">${tx}</text>`;
    s+=lab(L.t1,'A future MS case');
    s+=`<line x1="${L.x0}" x2="${f1(Math.max(L.x0,xc))}" y1="${L.t1}" y2="${L.t1}" style="stroke:var(--muted);stroke-width:3;stroke-linecap:round"/><line x1="${f1(xc)}" x2="${L.x1}" y1="${L.t1}" y2="${L.t1}" style="stroke:var(--line);stroke-width:3;stroke-dasharray:2 4"/>`;
    [-2,-.5,2.5,5.5].forEach(y=>{if(yr<y)return;const pos=y>0;s+=`<g transform="translate(${f1(X(y))} ${L.t1})"><path d="M0 -12 C5 -5 6 -1 6 2 A6 6 0 0 1 -6 2 C-6 -1 -5 -5 0 -12z" style="fill:${pos?'var(--attack)':'var(--panel)'};stroke:var(--attack);stroke-width:1.5"/></g><text x="${f1(X(y))}" y="${L.t1+22}" class="t-xs t-mid">${pos?'EBV+':'EBV−'}</text>`});
    if(yr>=0){s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${L.t1-26}" y2="${L.nfB}" style="stroke:var(--bcell);stroke-width:1.5;stroke-dasharray:4 3"/><text x="${f1(X(0)+4)}" y="${L.t1-28}" class="t-xs" style="fill:var(--bcell);font-weight:600">EBV infection (year 0)</text>`}
    if(yr>=7.5){const ox=X(7.5);s+=`<path d="M${f1(ox)} ${L.t1-11} l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" style="fill:var(--orange);stroke:var(--orange)"/><text x="${f1(ox)}" y="${L.t1-16}" class="t-xs t-mid" style="fill:var(--orange);font-weight:600">MS onset</text>`;
      const ay=L.t1+(N?44:34);s+=`<line x1="${f1(X(0))}" x2="${f1(ox-12)}" y1="${ay}" y2="${ay}" style="stroke:var(--orange);stroke-width:1.2" marker-end="url(#ebA)"/><text x="${f1((X(0)+ox)/2)}" y="${ay-4}" class="t-xs t-mid" style="fill:var(--orange)">median 7.5 years</text>`}
    /* NfL panel */
    s+=`<rect x="${L.x0}" y="${L.nfT}" width="${L.x1-L.x0}" height="${L.nfB-L.nfT}" rx="8" style="fill:var(--panel-2);opacity:.6"/>`;
    s+=N?`<text x="${L.sx}" y="${L.nfT-8}" class="t-lbl" style="paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round;font-size:13px">Serum neurofilament light (NfL)</text>`:`<text x="${L.x0-12}" y="${L.nfT+18}" class="t-lbl t-end" style="font-size:13px">Serum NfL</text><text x="${L.x0-12}" y="${L.nfT+34}" class="t-xs t-end">nerve-fibre damage</text><text x="${L.x0-12}" y="${L.nfT+48}" class="t-xs t-end">(schematic)</text>`;
    const base=.2,caseF=y=>y<=.5?base:base+.62*Math.pow(clamp((y-.5)/9.5),1.6),ctrlF=()=>base-.04;
    const ny=v=>lerp(L.nfB-6,L.nfT+8,v);
    const cp=pathFn(u=>caseF(lerp(Y0,yr,u)),L.x0,Math.max(L.x0+1,xc),ny(0),ny(1),80);
    const kp=`M${L.x0} ${f1(ny(ctrlF()))}L${f1(Math.max(L.x0+1,xc))} ${f1(ny(ctrlF()))}`;
    s+=`<path d="${kp}" style="fill:none;stroke:var(--muted);stroke-width:2.5;stroke-dasharray:6 4"/><path d="${cp}" style="fill:none;stroke:var(--attack);stroke-width:3"/>`;
    if(yr>4)s+=`<text x="${f1(Math.min(xc,L.x1)-4)}" y="${f1(ny(caseF(yr))-8)}" class="t-xs t-end" style="fill:var(--attack);font-weight:600">future MS case</text>`;
    s+=`<text x="${f1(Math.max(L.x0+70,Math.min(xc,L.x1)-4))}" y="${f1(ny(ctrlF())+16)}" class="t-xs t-end">control</text>`;
    /* track 3: CMV */
    s+=lab(L.t3,N?'Cytomegalovirus (CMV) infection':'CMV infection');
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.t3}" y2="${L.t3}" style="stroke:var(--line);stroke-width:3"/>`;
    if(yr>=1){s+=`<circle cx="${f1(X(1))}" cy="${L.t3}" r="6" style="fill:var(--glia)"/><text x="${f1(X(1)+10)}" y="${L.t3+4}" class="t-xs" style="fill:var(--ink)">${N?'CMV: MS risk not raised':'CMV, which spreads in a similar way: MS risk not raised'}</text>`}
    /* axis */
    const ya=L.t3+28;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${ya}" y2="${ya}" class="axis"/>`;
    [-2,0,2,4,6,8,10].forEach(y=>{s+=`<text x="${f1(X(y))}" y="${ya+15}" class="t-xs t-mid">${y>0?'+':''}${y}</text>`});
    s+=`<text x="${L.x1}" y="${ya+29}" class="t-xs t-end">years from EBV infection</text>`;
    s+=`<line x1="${f1(xc)}" x2="${f1(xc)}" y1="${L.t1-6}" y2="${ya}" style="stroke:var(--ink);opacity:.35"/>`;
    /* stat box */
    if(step>=1){const [bx,by]=N?[L.stat[0],ya+44]:[L.x0,ya+40];s+=`<text x="${bx}" y="${by}" class="t-sm" style="fill:var(--ink)"><tspan style="font-weight:600;fill:var(--attack)">HR 32.4</tspan> (95% CI 4.3–245.3) for MS after EBV seroconversion</text>`}
    esvg.innerHTML=s;
    eSt(step);$('#ebNote').innerHTML=noteHTML(EB_STEPS[step]);
  }
  const estop=playWire(erg,$('#ebPlay'),edraw,12000,'Replay','risk');
  const eSt=stepWire($('#ebSteps'),EB_STEPS,erg,edraw,estop);
  edraw(+erg.value);

  /* ---------- 5. vitamin D: two bodies of evidence ---------- */
  const VD={obs:[
      {n:'Serum vitamin D 50 nmol/L higher',d:'US military, white members',m:'OR',v:.59,lo:.36,hi:.97},
      {n:'Top vs bottom fifth of vitamin D',d:'same study',m:'OR',v:.38,lo:.19,hi:.75},
      {n:'Newborn vitamin D 25 nmol/L higher',d:'Danish newborn biobank',m:'OR',v:.70,lo:.57,hi:.84},
      {n:'Genetically lower vitamin D, 1 SD',d:'Mendelian randomisation',m:'OR',v:2.0,lo:1.7,hi:2.5}],
    tr:[
      {n:'D-Lay MS: disease activity',d:'first episode (CIS), primary outcome',m:'HR',v:.66,lo:.50,hi:.87},
      {n:'D-Lay MS: relapse',d:'secondary outcome',m:'HR',v:.69,lo:.42,hi:1.16},
      {n:'SOLAR: NEDA-3',d:'primary; OR 0.93 (0.53–1.63), not plotted',none:1},
      {n:'SOLAR: unique active lesions',d:'combined, secondary outcome',m:'rate ratio',v:.68,lo:.52,hi:.89},
      {n:'CHOLINE: relapse rate',d:'add-on to interferon, primary',none:1}]};
  const vsvg=$('#vdSvg');let vMode='obs',vStop=null;
  function vdraw(g=1){
    const rows=VD[vMode],N=vb(vsvg,`720 ${vMode==='obs'?250:300}`,`400 ${vMode==='obs'?400:480}`);
    const L=N?{x0:20,x1:380,top:40,rh:76}:{x0:300,x1:560,top:44,rh:44};
    const X=rkLog(.15,3,L.x0,L.x1);let s='';const yEnd=L.top+rows.length*L.rh;
    s+=rkAxis(X,[.2,.5,1,2,3],L.top-8,yEnd,yEnd+15);
    s+=`<text x="${f1(X(1)-8)}" y="${L.top-16}" class="t-xs t-end" style="fill:var(--good)">← favours vitamin D</text><text x="${f1(X(1)+8)}" y="${L.top-16}" class="t-xs" style="fill:var(--attack)">${vMode==='obs'?'higher risk →':'favours placebo →'}</text>`;
    rows.forEach((r,i)=>{const y=L.top+i*L.rh+(N?48:L.rh/2);const ly=N?y-30:y-3;
      s+=`<text x="12" y="${ly}" class="t-lbl" style="paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round;font-size:13px">${r.n}</text><text x="12" y="${N?ly+14:ly+15}" class="t-xs">${r.d}</text>`;
      if(r.none){s+=`<text x="${N?388:572}" y="${N?ly:y+4}" class="t-sm${N?' t-end':''}" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px;stroke-linejoin:round">${N?'missed primary endpoint':'missed primary endpoint;'}</text>${N?'':`<text x="572" y="${y+18}" class="t-xs">no estimate given here</text>`}`;return}
      const gg=ease(ramp(g,i*.12,i*.12+.4));
      s+=rkBar(X,y,r,gg,{h:9,c:r.v<1?'var(--good)':'var(--attack)'});
      if(gg>.99){const cross=r.lo<1&&r.hi>1;s+=`<text x="${N?388:572}" y="${N?ly:y+4}" class="t-sm${N?' t-end':''}" style="fill:${cross?'var(--muted)':'var(--ink)'}">${r.m} ${r.v} (${r.lo}–${r.hi})${cross?' · n.s.':''}</text>`}
    });
    vsvg.innerHTML=s;
    $('#vdNote').innerHTML=vMode==='obs'?noteHTML({k:'Observational and genetic evidence',t:'Lower vitamin D, higher risk',
      txt:`<span class="ev est">Established</span> In over 7 million US service members (257 cases), higher serum 25-hydroxyvitamin D went with lower risk: OR 0.59 per 50 nmol/L, and 0.38 for the top versus the bottom fifth, in white participants. [[Munger2006]] In Danish newborns, each 25 nmol/L higher level gave OR 0.70. [[Nielsen2017]] Mendelian randomisation in up to 14,498 cases found that genetically lower vitamin D doubled the odds (OR 2.0 per SD), a design that sidesteps reverse causation and much confounding. [[Mokry2015]]`,
      pt:`Studies of blood levels, newborn levels and vitamin D genes all point the same way: lower vitamin D, more MS.`,
      hook:`Vitamin D and MS risk: prospective serology (Munger 2006) plus Mendelian randomisation (Mokry 2015) support a causal link to risk.`})
      :noteHTML({k:'Randomised trials',t:'Mixed, and mostly about MRI',
      txt:`<span class="ev early">Controversy</span> D-Lay MS (316 people with a first episode typical of MS, 100,000 IU every 2 weeks) reduced combined disease activity: 60.3% versus 74.1% (HR 0.66). All 3 MRI secondary outcomes favoured vitamin D, but none of the 10 clinical secondary outcomes differed, including relapse. [[Thouvenot2025]] SOLAR (229 people on interferon, 14,007 IU a day) missed its primary endpoint, NEDA-3, while combined unique active lesions were fewer. [[Hupperts2019]] CHOLINE (181 people on interferon) missed its primary endpoint, relapse rate. [[Camu2019]] No trial has tested whether vitamin D prevents MS onset.`,
      pt:`Giving high-dose vitamin D to people who already have MS or a first episode reduced new MRI spots in some trials but did not clearly reduce relapses.`,
      hook:`D-Lay MS: fewer MRI events, no difference in relapses. SOLAR and CHOLINE missed their primary endpoints. These are published trial results, not dosing advice.`});
  }
  const vset=m=>{vMode=m;$('#vdObs').setAttribute('aria-pressed',m==='obs');$('#vdTr').setAttribute('aria-pressed',m==='tr');vStop&&vStop();vStop=animate(1400,p=>vdraw(p))};
  $('#vdObs').addEventListener('click',()=>vset('obs'));$('#vdTr').addEventListener('click',()=>vset('tr'));
  vdraw(1);
  {const prev=redraws.risk;redraws.risk=()=>{prev&&prev();vStop&&vStop();vdraw(1)}}
  {const prev=onHide.risk;onHide.risk=()=>{prev&&prev();vStop&&vStop()}}

  /* ---------- 6. cards ---------- */
  $('#rkPrev').innerHTML=`
   <div class="card"><span class="ev early">Early evidence</span><h4>ARISE: dimethyl fumarate in RIS</h4><p>87 people with RIS at 12 US centres took dimethyl fumarate 240 mg twice daily or placebo for 96 weeks. The drug reduced the risk of a first clinical demyelinating event (unadjusted HR 0.18, 95% CI 0.05–0.63). Moderate adverse reactions were more frequent on the drug (32% vs 21%). [[Okuda2023]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>TERIS: teriflunomide in RIS</h4><p>89 people with RIS in France, Switzerland and Turkey took teriflunomide 14 mg daily or placebo. Time to a first clinical event was longer (unadjusted HR 0.37, adjusted HR 0.28): a 63% and 72% relative risk reduction. MRI secondary endpoints were not significant. [[LebrunFrenay2023TERIS]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>An EBV vaccine?</h4><p>If EBV is needed for MS, preventing infection might prevent MS. Moderna's mRNA-1189 is in a phase 1/2 trial in 10- to 30-year-olds (n = 867) [[NCT05164094]] and mRNA-1195 in phase 1 (n = 482) [[NCT05831111]]; an NIAID gp350 nanoparticle vaccine completed phase 1 (n = 83). [[NCT04645147]] None of these trials measures MS. [[Aloisi2023]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>What these trials are not</h4><p>ARISE and TERIS tested people who already had MS-like lesions. They do not show that anything prevents MS in people without lesions, and trial results are reported here as published, not as a recommendation. More on treatment in <a href="#dmt" data-go="dmt">How the drugs work</a>.</p></div>`;
  $('#rkWho').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Women, and more of them over time</h4><p>Worldwide, women are twice as likely as men to live with MS; mean age at diagnosis is 32. [[Walton2020]] In Canada the female-to-male ratio rose for at least 50 years of birth cohorts to more than 3.2 to 1, a rise the authors attribute to environmental causes. [[Orton2006]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Migration</h4><p>People who move from high- to low-risk areas acquire lower rates; their children's risk approaches the host country's. [[Gale1995]] In Norway, prevalence in second-generation Pakistani immigrants was close to the Norwegian level (ratio 1.62) against 0.13 in the first generation. [[BergHansen2015]] <span class="ev early">Controversy</span> Whether risk is fixed in the first two decades is unresolved. [[Gale1995,Hammond2000]]</p></div>
   <div class="card"><span class="ev early">Controversy</span><h4>Is the latitude gradient fading?</h4><p>A 2010 meta-regression questioned the gradient for incidence in Europe and North America. [[KochHenriksen2010]] A 2019 prevalence meta-analysis found it persists and has grown stronger since 2011. [[Simpson2019]] The two measured different things over different periods.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Gut microbes</h4><p>In 576 people with MS and their household controls, MS went with more Akkermansia muciniphila and less Faecalibacterium prausnitzii, among other differences. [[iMSMS2022]] <span class="ev hyp">Hypothesis</span> Gut microbes from the twin with MS, given to mice, caused CNS autoimmunity more often than those from the healthy twin; a role in human MS is unproven. [[Berer2017]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Severity, not just risk</h4><p>A variant in the DYSF–ZNF638 region (rs10191329) was linked to reaching a walking aid a median 3.7 years sooner in homozygous people, with severity genes enriched in brain tissue rather than immune cells. [[IMSGC2023]] It showed no link with severity in 1,813 MSBase patients. [[Campagna2024]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Where this leads</h4><p>The genes point to immune cells, and the strongest environmental factors (EBV, smoking, obesity) interact with the HLA genes, suggesting a shared adaptive-immune pathway. [[IMSGC2019,Olsson2017]] See how that immune attack unfolds in <a href="#immune" data-go="immune">The immune attack</a>.</p></div>`;
};
