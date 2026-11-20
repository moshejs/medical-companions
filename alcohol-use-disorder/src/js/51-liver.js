/* =============== 5.1 The liver: fatty liver to cirrhosis =============== */
const LV_STEPS=[
 {from:0,at:.05,k:'Start',t:'A healthy liver',
  txt:`The liver clears most of the alcohol a person drinks. Alcohol-associated liver disease (the AASLD’s term; older papers say “alcoholic liver disease”) is described as the most prevalent type of chronic liver disease worldwide. It is a spectrum: fatty liver, alcohol-associated hepatitis, and cirrhosis with its complications. [[Crabb2020AASLD,Seitz2018NRDP,Singal2018ACG]]`,
  pt:`Liver damage from alcohol happens in stages: first fat builds up, then the liver can become inflamed, then scarred.`},
 {from:.12,at:.25,k:'Stage 1 · about 90%',t:'Fatty liver (steatosis)',
  txt:`Most people who drink more than 40 g of alcohol a day develop fatty liver; the ACG puts steatosis at about 90% of people who drink heavily, and it may appear within 2 weeks of heavy, regular drinking. It resolves rapidly after complete abstinence. [[Seitz2018NRDP,Singal2018ACG]] “Pure” fatty liver is not harmless: of 88 people followed for a median 10.5 years, 9 developed cirrhosis and 7 more fibrosis, and 8 of those 9 were still drinking more than 40 units a week. [[Teli1995Lancet]]`,
  pt:`Fat in the liver from alcohol often clears up quickly once a person stops drinking.`,
  hook:`Steatosis in ~90% of people who drink heavily; reversible with abstinence.`},
 {from:.35,at:.47,k:'Stage 2 · about one-third',t:'Steatohepatitis',
  txt:`With continued heavy drinking, about one-third of people with steatosis show inflammation on biopsy: alcohol-associated steatohepatitis. Mechanisms include fat build-up, oxidative stress, toxicity from acetaldehyde (alcohol’s first breakdown product) and inflammation driven by cytokines and chemokines <span class="ev est">Established</span>. A sudden severe flare is alcohol-associated hepatitis, with jaundice and high short-term mortality (see below). [[Singal2018ACG,Seitz2018NRDP]]`,
  pt:`The liver becomes inflamed, like a wound that keeps being reopened. Many people feel nothing at this stage.`,
  hook:`AST:ALT above 2 suggests advanced alcohol-related liver disease, not heavy drinking itself. [[Cohen1979SGOTSGPT,Nyblom2004ASTALT]]`},
 {from:.55,at:.66,k:'Stage 3 · 20–40% of those with steatohepatitis',t:'Fibrosis',
  txt:`Among people with steatohepatitis on biopsy, 20–40% develop fibrosis: strands of scar tissue laid down between liver cells. Genetic, epigenetic and other factors explain much of the person-to-person variation <span class="ev est">Established</span>; obesity for 10 years or more roughly doubles the risk of cirrhosis, and women have a higher risk than men at the same intake. [[Singal2018ACG,Seitz2018NRDP,Rehm2010Cirrhosis]]`,
  pt:`Scar tissue starts to form. Two people who drink the same amount can have very different livers.`,
  hook:`Steatohepatitis → fibrosis in 20–40% and cirrhosis in 8–20% (ACG).`},
 {from:.75,at:.92,k:'Stage 4 · 8–20% of those with steatohepatitis',t:'Cirrhosis',
  txt:`Among people with steatohepatitis, 8–20% develop cirrhosis: the liver is shrunken and nodular, with bands of scar around regenerating nodules. In a biopsy cohort, liver-related mortality at 5 years was 13% in early or compensated disease and 43% once decompensated (population statistics). Abstinence predicted survival in both groups. [[Singal2018ACG,Lackner2017JHep]] Switch on “Stops drinking” to see the group survival data.`,
  pt:`Cirrhosis is heavy scarring. Even then, people who stop drinking live longer as a group.`,
  hook:`Abstinence in alcohol-related cirrhosis: survival difference becomes significant from 1.5 years (HR about 0.5–0.6). [[Xie2014HepatolRes]]`}
];
const LV_ABS=[
 `<b>Stopped at this stage:</b> fatty liver resolves rapidly after complete abstinence. [[Singal2018ACG]]`,
 `<b>Stopped at this stage:</b> fatty liver resolves rapidly after complete abstinence. [[Singal2018ACG]]`,
 `<b>Stopped at this stage:</b> abstinence is the most effective way to prevent progression and the best treatment for every stage. [[Singal2018ACG,Seitz2018NRDP]]`,
 `<b>Stopped at this stage:</b> in a meta-analysis of 7 cohorts (1,235 people with alcohol-related cirrhosis), abstinence improved survival, significant from 1.5 years (HR 0.51, 95% CI 0.33–0.81). [[Xie2014HepatolRes]]`,
 `<b>Stopped at this stage:</b> in 633 people with decompensated alcohol-related cirrhosis who stopped drinking, 31.1% reached “recompensation” (33.8% cumulative at 5 years); stopping within 1 month roughly doubled the chance <span class="ev early">Early evidence</span>. No recompensated person who stayed abstinent died of liver causes during follow-up. [[Hofer2026JHep]]`
];
inits.liver=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),ab=$('#lvAbst'),rd=$('#lvRead'),note=$('#lvNote');
  let abst=false;
  const stageOf=t=>t<.12?0:t<.35?ramp(t,.12,.3):t<.55?1+ramp(t,.35,.5):t<.75?2+ramp(t,.55,.7):3+ramp(t,.75,.9);
  /* rank order of the 100 people, shuffled once so each stage is scattered across the array */
  const R=rng(41),ord=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(R()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]]}
  const rank=[];ord.forEach((p,r)=>rank[p]=r);
  const NM=['Healthy','Fatty liver','Steatohepatitis','Fibrosis','Cirrhosis'];
  const COL=['var(--muted)','var(--fat)','var(--glu-fill)','var(--fib)','var(--liver)'];
  function icon(r,st){/* returns [colour, opacity, outline] for the person ranked r */
    const fat=Math.round(90*ramp(st,0,1)),ash=Math.round(30*ramp(st,1,2)),fS=Math.round(6*ramp(st,2,3)),fR=Math.round(12*ramp(st,2,3)),cS=Math.round(2*ramp(st,3,4)),cR=Math.round(6*ramp(st,3,4));
    if(r<cS)return [4,1];if(r<cR)return [4,.45];if(r<fS)return [3,1];if(r<fR)return [3,.45];if(r<ash)return [2,1];if(r<fat)return [1,1];return [0,.35]}
  function people(L,st,ph){let s='';const cleared=abst&&ph<=1;
    for(let p=0;p<100;p++){const c=p%10,rw=Math.floor(p/10),x=L.gx+c*L.gs,y=L.gy+rw*L.gr;let [k,op]=icon(rank[p],st);
      if(cleared&&k===1){s+=`<g style="opacity:.9">${person(x,y,L.ps,'none')}</g><circle cx="${f1(x)}" cy="${f1(y+L.ps*.6)}" r="${f1(L.ps*.42)}" style="fill:none;stroke:var(--fat);stroke-width:1.2"/>`;continue}
      s+=person(x,y,L.ps,COL[k],{op:k===0?.3:op})}
    const items=[[1,'Fatty liver','≈90 of 100'],[2,'Steatohepatitis','≈30 (one-third)'],[3,'Fibrosis','20–40% of those'],[4,'Cirrhosis','8–20% of those']];
    items.forEach(([k,n,v],i)=>{const x=L.lx+(i%2)*L.lw,y=L.ly+Math.floor(i/2)*30,on=st>=k-1+.05;
      s+=`<rect x="${x}" y="${y-9}" width="10" height="10" rx="2" style="fill:${COL[k]};opacity:${on?1:.3}"/><text x="${x+16}" y="${y}" class="t-xs" style="${on?'fill:var(--ink);font-weight:600':''}">${n}</text><text x="${x+16}" y="${y+12}" class="t-xs">${v}</text>`});
    if(cleared)s+=`<text x="${L.gx-8}" y="${L.fy}" class="t-xs" style="fill:var(--good)">rings: fat cleared after stopping</text>`;
    else s+=`<text x="${L.gx-8}" y="${L.fy}" class="t-xs">faint icons: the upper end of a published range</text>`;
    return s}
  function absChart(L){/* Xie 2014 hazard ratios for death, abstinence vs continued drinking, and Hofer 2026 recompensation */
    const HR=[[.5,.48,0],[1,.58,0],[1.5,.51,1],[2,.55,1],[3,.54,1],[4,.60,1],[5,.63,1]];
    const x0=L.cx,x1=L.cx+L.cw,y0=L.cy,h=L.ch,X=v=>lerp(x0,x1,v/5),Y=v=>y0+h-h*v/1.2;let s='';
    s+=`<text x="${x0-26}" y="${y0-12}" class="t-sm">DEATH, STOPPED vs KEPT DRINKING (HR)</text>`;
    s+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${h}" style="fill:var(--field)"/>`;
    [0,.5,1].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===1?'axis':'grid'}"/><text x="${x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${x1}" y="${f1(Y(1)-4)}" class="t-xs t-end">1 = no difference</text>`;
    HR.forEach(([yr,v,sig],i)=>{const px=X(yr),py=Y(v);if(i)s+=`<line x1="${f1(X(HR[i-1][0]))}" y1="${f1(Y(HR[i-1][1]))}" x2="${f1(px)}" y2="${f1(py)}" style="stroke:var(--brand);stroke-width:1.6"/>`;
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4" style="fill:${sig?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/>`;
      if(yr===.5||yr===1.5||yr===5)s+=`<text x="${f1(px)}" y="${f1(py+15)}" class="t-xs t-mid">${v.toFixed(2)}</text>`});
    [0,1,2,3,4,5].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y0+h+12}" class="t-xs t-mid">${v}${v===5?' y':''}</text>`);
    s+=`<text x="${x0}" y="${y0+h+26}" class="t-xs">open dots: not significant · Xie 2014</text>`;
    /* recompensation bars */
    const by=L.by,bw=L.bw,REC=[[1,12.3],[2,23.4],[5,33.8]];
    s+=`<text x="${x0-26}" y="${by-12}" class="t-sm">RECOMPENSATION AFTER STOPPING</text>`;
    REC.forEach(([yr,v],i)=>{const y=by+i*20;s+=`<text x="${x0-4}" y="${y+9}" class="t-xs t-end">${yr} y</text><rect x="${x0}" y="${y}" width="${f1(bw)}" height="11" rx="5.5" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(bw*v/100)}" height="11" rx="5.5" style="fill:var(--good)"/><text x="${f1(x0+bw*v/100+6)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
    s+=`<text x="${x0}" y="${by+70}" class="t-xs">decompensated cirrhosis, n=633 · Hofer 2026</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 696'),ph=phaseOf(LV_STEPS,t),st=stageOf(t);setSt(ph);
    const L=N?{tx:16,ty:30,lx0:200,ly0:150,ls:1.42,trx:20,trw:360,try:268,px:10,py:312,pw:380,ph:374,gx:44,gy:346,gs:35,gr:25,ps:20,lx:24,ly:610,lw:190,fy:676,cx:56,cw:300,cy:354,ch:120,by:546,bw:200}
             :{tx:24,ty:34,lx0:200,ly0:172,ls:1.75,trx:30,trw:330,try:318,px:384,py:14,pw:324,ph:352,gx:414,gy:42,gs:30,gr:24,ps:18,lx:402,ly:300,lw:156,fy:356,cx:430,cw:260,cy:46,ch:130,by:262,bw:200};
    let shown=st;const stop=abst&&ph<=1;if(stop)shown=Math.min(st,.08);
    let s=`<defs>${marker('lvA','var(--muted)')}</defs>`;
    s+=`<text x="${L.tx}" y="${L.ty}" style="font:800 ${N?20:22}px var(--display);fill:var(--ink)">${stop&&st>.05?'Fat clearing':NM[ph]}</text>`;
    s+=`<text x="${L.tx}" y="${L.ty+18}" class="t-sm">${abst?'after stopping drinking':'with continued heavy drinking'}</text>`;
    s+=liver(L.lx0,L.ly0,L.ls,{stage:shown,seed:7}).svg;
    if(abst&&ph>=2){const y=L.try-(N?24:26);s+=`<rect x="${L.lx0-120}" y="${y-14}" width="240" height="20" rx="10" style="fill:var(--good-soft)"/><text x="${L.lx0}" y="${y}" class="t-xs t-mid" style="fill:var(--good)">${ph>=4?'scar remains; group survival improves':ph===3?'stopping: survival improves from 1.5 y':'stopping halts the injury'}</text>`}
    /* stage track */
    const sw=L.trw/5;
    for(let i=0;i<5;i++){const x=L.trx+i*sw,fill=clamp(st-i+1,0,1);
      s+=`<rect x="${f1(x)}" y="${L.try}" width="${f1(sw-3)}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
      if(i===0||st>i-1)s+=`<rect x="${f1(x)}" y="${L.try}" width="${f1((sw-3)*(i===0?1:fill))}" height="10" rx="5" style="fill:${COL[i]};opacity:${i===0?.4:.95}"/>`;
      const lb=i===2?['Steato-','hepatitis']:i===1?['Fatty','liver']:[NM[i]],sty=ph===i?'fill:var(--ink);font-weight:700':'';lb.forEach((w,j)=>s+=`<text x="${f1(x+(sw-3)/2)}" y="${L.try+24+j*11}" class="t-xs t-mid" style="${sty}">${w}</text>`)}
    const mx=L.trx+Math.min(st+.5,4.5)*sw;s+=`<path d="M${f1(mx-6)} ${L.try-12}L${f1(mx+6)} ${L.try-12}L${f1(mx)} ${L.try-3}Z" style="fill:var(--ink)"/>`;
    /* right (or lower) panel */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    if(abst&&ph>=3)s+=absChart(L);
    else{s+=`<text x="${L.gx-8}" y="${L.gy-12}" class="t-sm">100 PEOPLE WHO DRINK HEAVILY</text>`;s+=people(L,st,ph)}
    svg.innerHTML=s;
    rd.innerHTML=`<span>Stage <b>${NM[ph]}</b></span><span>Drawn as <b>${stop?'cleared':abst?'after stopping':'continuing'}</b></span><span>Liver glyph <b>${Math.round(shown/4*100)}%</b> of the way to cirrhosis</span>`;
    const P=LV_STEPS[ph];note.innerHTML=noteHTML(P)+(abst?`<p class="callout">${LV_ABS[ph]}</p>`:'');
  }
  const stop=playWire(rg,$('#lvPlay'),draw,22000,'Replay','liver');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  ab.addEventListener('click',()=>{abst=!abst;ab.setAttribute('aria-pressed',abst);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- Maddrey / MELD / Lille teaching calculator ---------- */
  const cs=$('#lvCalcSvg'),cn=$('#lvCalcNote'),I=id=>$('#'+id);
  function calc(){
    const N=vb(cs,'720 210','400 330');
    const pt=parseFloat(I('lvPt').value),ct=parseFloat(I('lvCtl').value),b0=parseFloat(I('lvBil').value),um=I('lvUnit').value==='um';
    const ok=isFinite(pt)&&isFinite(ct)&&isFinite(b0)&&b0>=0;
    const bil=ok?(um?b0/17.1:b0):0,df=ok?4.6*(pt-ct)+bil:NaN;
    const meld=parseFloat(I('lvMeld').value),hasM=isFinite(meld),li=I('lvLille').value;
    const sev=ok&&df>=32,max=100;
    let s='';const gx=N?110:130,gy=N?120:150,gr=N?84:100;
    s+=gauge(gx,gy,gr,ok?clamp(df,0,max):0,max,{bands:[{to:32,col:'var(--brand-soft)'},{to:max,col:'var(--liver)'}]});
    s+=`<text x="${gx}" y="${gy-gr*.34}" class="t-big t-mid" style="font-size:${N?28:32}px;fill:${sev?'var(--liver)':'var(--ink)'}">${ok?f1(df):'–'}</text>`;
    s+=`<text x="${gx}" y="${gy+18}" class="t-sm t-mid">Maddrey DF</text>`;
    const A=Math.PI*(1-32/max),tx=gx+(gr+8)*Math.cos(A),ty=gy-(gr+8)*Math.sin(A);
    s+=`<line x1="${f1(gx+(gr-26)*Math.cos(A))}" y1="${f1(gy-(gr-26)*Math.sin(A))}" x2="${f1(tx)}" y2="${f1(ty)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${f1(tx-4)}" y="${f1(ty-4)}" class="t-xs t-end" style="fill:var(--ink)">32</text>`;
    /* Lille survival bars */
    const bx=N?40:300,by=N?196:44,bw=N?300:360;
    s+=`<text x="${bx}" y="${by}" class="t-sm">6-MONTH SURVIVAL BY DAY-7 LILLE (LOUVET 2007)</text>`;
    [['r','Lille below 0.45 (response)',85],['n','Lille 0.45 or higher (nonresponse)',25]].forEach(([k,lab,v],i)=>{const y=by+18+i*44,on=li===k,dim=li&&!on;
      s+=`<text x="${bx}" y="${y}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${lab}</text><rect x="${bx}" y="${y+6}" width="${bw}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1(bw*v/100)}" height="14" rx="7" style="fill:${k==='r'?'var(--brand)':'var(--liver)'};opacity:${dim?.3:1}"/><text x="${f1(bx+bw*v/100+6)}" y="${y+17}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
    if(hasM){const y=by+112,on=meld>20;s+=`<text x="${bx}" y="${y}" class="t-xs" style="fill:var(--ink)">MELD entered: <tspan style="font-weight:700">${Math.round(meld)}</tspan> · published flag for severe AH: above 20</text>`;
      const mw=bw,X=v=>bx+mw*clamp((v-6)/34);s+=`<line x1="${bx}" x2="${bx+mw}" y1="${y+14}" y2="${y+14}" style="stroke:var(--panel-2);stroke-width:8;stroke-linecap:round"/><line x1="${f1(X(20))}" x2="${f1(X(20))}" y1="${y+6}" y2="${y+22}" style="stroke:var(--ink);stroke-dasharray:2 2"/><circle cx="${f1(X(meld))}" cy="${y+14}" r="6" style="fill:${on?'var(--liver)':'var(--brand)'}"/>`}
    cs.innerHTML=s;
    let h=`<div class="kicker">Teaching result</div><h4>${ok?'Maddrey DF '+f1(df):'Enter all three values'}</h4>`;
    if(ok){h+=`<p>4.6 × (${f1(pt)} − ${f1(ct)}) + ${f1(bil)}${um?` (${f1(b0)} µmol/L ÷ 17.1)`:''} = <b>${f1(df)}</b>. [[Carithers1989]]</p>`;
      h+=`<div class="verdict ${sev?'no':'maybe'}">${sev?'At or above 32: the range trials have called severe alcohol-associated hepatitis.':'Below 32: below the published severe threshold.'}</div>`;
      h+=`<p>${sev?'Published data: a Maddrey score of 32 or more predicts about 20–50% mortality over 30 days (a population statistic). [[Singal2018ACG]]':'The ACG wording for severe AH is a Maddrey score above 32 or a MELD above 20. [[Singal2018ACG]]'}</p>`}
    if(hasM)h+=`<p>MELD ${Math.round(meld)} is ${meld>20?'above':'not above'} the published flag of 20; in a Mayo cohort MELD predicted 30-day mortality at least as well as Maddrey (c-statistic 0.83 vs 0.74). [[Singal2018ACG,Dunn2005MELD]]</p>`;
    if(li==='n')h+=`<p>Lille ≥0.45 at day 7 is “nonresponse”: 25% 6-month survival versus 85% in responders. People not responding had about 30% 6-month survival historically; highly selected people have had early transplantation (see the trial cards). [[Louvet2007Lille,Mathurin2011NEJM]]</p>`;
    else if(li==='r')h+=`<p>Lille below 0.45 counts as response, with 85% 6-month survival in the 2007 cohort. [[Louvet2007Lille]]</p>`;
    h+=`<div class="hook"><b>%t:note.hook%</b>Maddrey DF = 4.6 × (PT − control) + bilirubin (mg/dL); ≥32 = severe AH. Lille ≥0.45 at day 7 = nonresponse. [[Carithers1989,Louvet2007Lille]]</div>`;
    h+=`<p class="stage-cap">Not for interpreting anyone’s own results.</p>`;
    cn.innerHTML=h}
  ['lvPt','lvCtl','lvBil','lvMeld'].forEach(id=>I(id).addEventListener('input',calc));
  ['lvUnit','lvLille'].forEach(id=>I(id).addEventListener('change',()=>{if(id==='lvUnit'){const v=parseFloat(I('lvBil').value);if(isFinite(v))I('lvBil').value=I('lvUnit').value==='um'?Math.round(v*17.1):f1(v/17.1)}calc()}));
  const ex=(pt,ct,b,m,l)=>{I('lvPt').value=pt;I('lvCtl').value=ct;I('lvUnit').value='mg';I('lvBil').value=b;I('lvMeld').value=m;I('lvLille').value=l;calc()};
  I('lvEx1').addEventListener('click',()=>ex(14,12,3,'',''));
  I('lvEx2').addEventListener('click',()=>ex(24,12,14,26,'n'));
  calc();

  /* ---------- STOPAH bars ---------- */
  const ss=$('#lvStopSvg');const ARM=[['placebo',17],['prednisolone',14],['pentoxifylline',19],['both',13]];let q='';
  ARM.forEach(([n,v],i)=>{const y=10+i*26;q+=`<text x="96" y="${y+11}" class="t-xs t-end">${n}</text><rect x="102" y="${y}" width="160" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="102" y="${y}" width="${f1(160*v/25)}" height="14" rx="7" style="fill:${i===1||i===3?'var(--rx)':'var(--liver)'}"/><text x="${f1(106+160*v/25)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
  q+=`<text x="102" y="116" class="t-xs">28-day mortality (axis to 25%)</text>`;ss.innerHTML=q;
};
