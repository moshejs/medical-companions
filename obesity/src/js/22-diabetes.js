/* =============== 2.2 Obesity & type 2 diabetes =============== */
/* The main scene: fat stores fill, fat spills into the liver and pancreas, insulin works less well and the beta cells
   strain; then weight loss empties the liver and pancreas again (the Newcastle "twin cycle" model, labelled as a
   hypothesis), and the DiRECT trial's remission results build up. Organ fat, insulin and glucose in steps 1-3 are
   schematic levels; the only numbers drawn are published ones (Lim 2011, DiRECT). */
const DB_STEPS=[
 {from:0,at:.07,k:'Step 1',t:'Fat stores fill',
  txt:'In obesity, fat tissue releases more non-esterified fatty acids, glycerol, hormones and pro-inflammatory cytokines, and these drive insulin resistance. [[Kahn2006]] Where fat is stored matters: in 3001 Framingham participants, visceral fat was more strongly linked to metabolic risk than fat under the skin (OR for metabolic syndrome per SD 4.7 vs 3.0 in women). [[Fox2007Framingham]]',
  pt:'When fat tissue under the skin is full, more fat circulates in the blood as fatty acids, and some of it ends up in places it should not be.',
  hook:'Visceral fat beat subcutaneous fat as a marker of metabolic risk, even after adjusting for BMI and waist. [[Fox2007Framingham]]'},
 {from:.17,at:.25,k:'Step 2',t:'Fat spills into the liver',
  txt:'Fat stored in the wrong places, such as the liver, goes with high triglycerides, more free fatty acids and insulin resistance in the liver. [[Tchernof2013]] Ectopic fat in the liver may add to cardiometabolic risk. [[Neeland2019]] The insulin-resistant liver keeps making glucose, so blood glucose drifts up.',
  pt:'A liver full of fat stops listening to insulin. It keeps releasing sugar into the blood even when it should stop.',
  hook:'Insulin resistance alone is not diabetes: type 2 diabetes develops when beta-cell dysfunction is added on top. [[Kahn2006]]'},
 {from:.33,at:.42,k:'Step 3',t:'Beta cells strain',
  txt:'Type 2 diabetes appears when the pancreas can no longer make enough insulin to overcome the resistance. [[Kahn2006]] The Newcastle group\'s model links the two organs: fat in the liver and fat in the pancreas, which blunts the first burst of insulin after a meal (a "twin cycle"). <span class="ev hyp">Hypothesis</span> It was tested in the studies in the next step. [[Lim2011,Taylor2018CellMetab]] Each person may have a personal fat threshold, independent of BMI: in the UKPDS, one in three people had a BMI under 25 at diagnosis. <span class="ev hyp">Hypothesis</span> [[Taylor2015PFT]]',
  pt:'The insulin-making cells in the pancreas work harder and harder, then start to fall behind. That is when blood sugar reaches the diabetes range.',
  hook:'Type 2 diabetes = insulin resistance + beta-cell dysfunction. [[Kahn2006]]'},
 {from:.5,at:.6,k:'Step 4',t:'Weight loss empties the organs',
  txt:'In 11 people with type 2 diabetes on a 600 kcal/day research diet, fasting glucose normalised within 1 week (9.2 to 5.9 mmol/L); by week 8 liver fat had fallen from 12.8% to 2.9% and pancreatic fat from 8.0% to 6.2%, and first-phase insulin secretion recovered toward normal. [[Lim2011]] In a DiRECT subgroup, liver fat fell from 16.0% to 3.1%. Return of first-phase insulin separated responders from non-responders, and responders had a shorter diabetes duration (2.7 vs 3.8 years). [[Taylor2018CellMetab]] These were research diets under medical supervision, not instructions.',
  pt:'When weight comes down, the liver empties of fat first, and in many people the pancreas starts making insulin properly again. This works best early in the illness.',
  hook:'Lim 2011: liver fat 12.8% to 2.9% in 8 weeks; fasting glucose normal within 1 week. [[Lim2011]]'},
 {from:.67,at:.76,k:'DiRECT',t:'Remission in DiRECT',
  txt:'DiRECT enrolled 306 people with type 2 diabetes for under 6 years and BMI 27–45, not on insulin. Diabetes and blood-pressure drugs were withdrawn, followed by 3–5 months of formula total diet replacement (825–853 kcal/day), stepped food reintroduction and maintenance support (published methods, not instructions). Remission (HbA1c under 6.5% after at least 2 months off all glucose-lowering drugs) was 46% versus 4% at 12 months [[Lean2018DiRECT]] and 36% versus 3% at 24 months. [[Lean2019DiRECT]] At 5 years, 13% of the extension group were in remission. [[Lean2024DiRECT]]',
  pt:'For some people who have had type 2 diabetes for only a few years, a supported weight programme put diabetes into remission. Remission can wear off as weight returns, which is biology, so check-ups still matter.',
  hook:'DiRECT remission: 46% vs 4% at 12 months; 36% vs 3% at 24 months. [[Lean2018DiRECT,Lean2019DiRECT]]'},
 {from:.83,at:.95,k:'DiRECT',t:'Remission by kilograms lost',
  txt:'Across the whole DiRECT study, remission at 12 months climbed with weight lost: 0% of 76 people who gained weight, 7% with 0–5 kg lost, 34% with 5–10 kg, 57% with 10–15 kg and 86% (31 of 36) with 15 kg or more. [[Lean2018DiRECT]] Of those in remission at year 2, 26% were still in remission at 5 years, consistent with obesity and type 2 diabetes being chronic, relapsing conditions. [[Lean2024DiRECT]]',
  pt:'The more weight people lost, the more often their diabetes went into remission. These are averages for groups; nobody can be promised a result.',
  hook:'DiRECT: 86% remission with 15 kg or more lost. [[Lean2018DiRECT]]'}
];
const DB_DR=[{l:'12 months',a:46,c:4},{l:'24 months',a:36,c:3},{l:'5 years',a:13,c:5}];
const DB_KG=[{l:'gained',v:0},{l:'0–5 kg',v:7},{l:'5–10 kg',v:34},{l:'10–15 kg',v:57},{l:'≥15 kg',v:86}];
/* DPP: published incidence rates (per 100 person-years) over a mean 2.8 years, and 15-year cumulative incidence */
const DB_ARMS=[{id:'pl',n:'Placebo',r:11.0,c15:62,col:'var(--muted)',dash:''},{id:'mf',n:'Metformin',r:7.8,c15:56,col:'var(--tx)',dash:'8 4'},{id:'ls',n:'Lifestyle',r:4.8,c15:55,col:'var(--hl)',dash:''}];

inits.diabetes=()=>{
  const svg=$('#dbSvg'),rg=$('#dbT'),note=$('#dbNote');
  function pancreas(x,y,s,fat,ins){/* a pancreas lying across, head on the viewer's left, with islets of beta cells */
    const T=p=>[x+p[0]*s,y+p[1]*s],P=[[0,22],[10,8],[34,6],[62,12],[96,10],[128,4],[142,10],[136,22],[104,28],[70,30],[40,34],[14,38]];
    let g=`<path d="${smoothPath(P.map(T))}" style="fill:var(--cyto);stroke:var(--gut-line);stroke-width:1.4"/>`;const rr=rng(3);
    for(let i=0;i<Math.round(fat*16);i++){const q=T([18+rr()*110,12+rr()*16]);g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1((1.6+rr()*1.8)*s)}" style="fill:var(--fat);stroke:var(--fat-line);stroke-width:.6"/>`}
    [[34,20],[72,19],[110,15]].forEach(c=>{const q=T(c);g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(7*s)}" style="fill:var(--insulin);fill-opacity:${f1(.12+.4*ins)};stroke:var(--insulin);stroke-width:1.2"/>`;
      for(let k=0;k<4;k++){const a=k*1.57+.6;g+=`<circle cx="${f1(q[0]+Math.cos(a)*3.4*s)}" cy="${f1(q[1]+Math.sin(a)*3.4*s)}" r="${f1(1.4*s)}" style="fill:var(--nucleus)"/>`}});
    return {svg:g,at:{c:T([70,20]),out:T([70,34])}}}
  const flow=(a,b,bend,n,ph,kind)=>{let s='';const c=[(a[0]+b[0])/2+bend[0],(a[1]+b[1])/2+bend[1]];
    s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 4"/>`;
    for(let i=0;i<n;i++){const u=((i/n)+ph)%1,q=1-u,x=q*q*a[0]+2*q*u*c[0]+u*u*b[0],y=q*q*a[1]+2*q*u*c[1]+u*u*b[1];
      s+=kind==='ffa'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" style="fill:var(--fat);stroke:var(--fat-line);stroke-width:1"/>`:hormoneDot(x,y,'insulin',{r:4})}
    return s};
  function bars(x,y,w,h,data,g,N,kg){/* grouped or single bars, growing with g */
    let s=`<line x1="${x}" x2="${x+w}" y1="${y+h}" y2="${y+h}" class="axis"/>`;[0,25,50,75,100].forEach(v=>{const yy=y+h-h*v/100;s+=`<line x1="${x}" x2="${x+w}" y1="${f1(yy)}" y2="${f1(yy)}" class="grid"/><text x="${x-5}" y="${f1(yy+3)}" class="t-xs t-end">${v}%</text>`});
    const n=data.length,bw=w/n;
    data.forEach((d,i)=>{const cx=x+bw*i+bw/2,e=ease(clamp(g*n-i));
      if(kg){const hh=h*d.v/100*e,bx=cx-bw*.32;s+=`<rect x="${f1(bx)}" y="${f1(y+h-hh)}" width="${f1(bw*.64)}" height="${f1(Math.max(hh,1))}" rx="3" style="fill:var(--good);opacity:${f1(.4+.5*e)}"/>`;
        if(e>.05)s+=`<text x="${f1(cx)}" y="${f1(y+h-hh-5)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${Math.round(d.v*e)}%</text>`}
      else{const ha=h*d.a/100*e,hc=h*d.c/100*e,b=bw*.3;s+=`<rect x="${f1(cx-b-2)}" y="${f1(y+h-ha)}" width="${f1(b)}" height="${f1(Math.max(ha,1))}" rx="3" style="fill:var(--hl)"/><rect x="${f1(cx+2)}" y="${f1(y+h-hc)}" width="${f1(b)}" height="${f1(Math.max(hc,1))}" rx="3" style="fill:var(--muted);opacity:.7"/>`;
        if(e>.05)s+=`<text x="${f1(cx-b/2-2)}" y="${f1(y+h-ha-5)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${Math.round(d.a*e)}%</text><text x="${f1(cx+b/2+2)}" y="${f1(y+h-hc-5)}" class="t-xs t-mid">${Math.round(d.c*e)}%</text>`}
      s+=`<text x="${f1(cx)}" y="${y+h+15}" class="t-xs t-mid" style="fill:var(--ink)">${d.l}</text>`});
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(DB_STEPS,t);let s='';
    const sz=lerp(.25,1,ramp(t,0,.15))*(1-.45*ramp(t,.52,.62)),lf=ramp(t,.12,.3)*(1-.85*ramp(t,.52,.62)),pf=ramp(t,.3,.42)*(1-.6*ramp(t,.54,.64)),
      ins=clamp(1-.7*ramp(t,.34,.46)+.6*ramp(t,.56,.66)),glu=clamp(.18+.32*ramp(t,.18,.32)+.42*ramp(t,.34,.46)-.68*ramp(t,.5,.56)),
      ffa=Math.round(2+8*ramp(t,.04,.2)-7*ramp(t,.5,.58)),o1=1-ramp(t,.64,.69),ph=t*9;
    if(o1>0){
      const A=N?{x:16,y:62,w:150,h:104}:{x:24,y:72,w:170,h:120},L=N?[192,68,1.2]:[290,68,1.25],Pn=N?[30,262,1.5]:[478,108,1.12],V=N?{x:16,y:478,w:300}:{x:24,y:286,w:560},Gg=N?{x:356,y:250,h:220}:{x:672,y:60,h:250};
      s+=`<g style="opacity:${f1(o1)}">`;
      s+=`<text x="${A.x}" y="${A.y-12}" class="t-lbl">fat under the skin</text>`+adiposeTissue(A.x,A.y,A.w,A.h,{size:sz,inflamed:ramp(t,.1,.3)*.5*(1-ramp(t,.52,.62)),seed:4,frame:true}).svg;
      const lv=liver(L[0],L[1],L[2],{fat:lf,seed:8});s+=`<text x="${L[0]}" y="${L[1]-12}" class="t-lbl">liver</text>`+lv.svg;
      const pn=pancreas(Pn[0],Pn[1],Pn[2],pf,ins);s+=`<text x="${Pn[0]}" y="${Pn[1]-14}" class="t-lbl">pancreas: islets make insulin</text>`+pn.svg;
      /* fatty acids leave the full fat store for the liver and the pancreas */
      const src=[A.x+A.w,A.y+A.h*.4];
      if(ffa>0){s+=flow(src,lv.at.c,[0,-30],ffa,ph%1,'ffa');if(t>.28)s+=flow([A.x+A.w*.7,A.y+A.h],pn.at.c,N?[-20,10]:[0,50],Math.max(1,Math.round(ffa*.6)),(ph*1.1)%1,'ffa')}
      /* insulin from the islets into the blood */
      const ni=Math.round(1+5*ins);s+=flow(pn.at.out,[N?V.x+V.w*.62:V.x+V.w*.78,V.y],[N?20:30,10],ni,(ph*.8)%1,'ins');
      /* blood vessel with glucose */
      s+=`<rect x="${V.x}" y="${V.y}" width="${V.w}" height="34" rx="17" style="fill:var(--vessel);fill-opacity:.12;stroke:var(--vessel);stroke-width:1.4"/><text x="${V.x}" y="${V.y+50}" class="t-xs">blood: glucose (squares hollow), insulin (filled)</text>`;
      const ng=Math.round(4+22*glu),rr=rng(9);for(let i=0;i<ng;i++){const u=(rr()+ph*.25)%1,yy=V.y+8+rr()*18;s+=`<rect x="${f1(V.x+10+u*(V.w-20))}" y="${f1(yy-3)}" width="6" height="6" rx="1" style="fill:none;stroke:var(--gold);stroke-width:1.6"/>`}
      /* glucose gauge, schematic */
      const gy=Gg.y+Gg.h-Gg.h*glu,th=Gg.y+Gg.h*.42;
      s+=`<text x="${Gg.x+12}" y="${Gg.y-12}" class="t-xs t-mid">glucose</text><rect x="${Gg.x}" y="${Gg.y}" width="24" height="${Gg.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/><rect x="${Gg.x+4}" y="${f1(gy)}" width="16" height="${f1(Gg.y+Gg.h-gy-4)}" rx="8" style="fill:${glu>.58?'var(--risk)':'var(--gold)'};opacity:.85"/>`;
      s+=`<line x1="${Gg.x-6}" x2="${Gg.x+30}" y1="${f1(th)}" y2="${f1(th)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${Gg.x-8}" y="${f1(th-4)}" class="t-xs t-end">diabetes</text><text x="${Gg.x-8}" y="${f1(th+9)}" class="t-xs t-end">range</text>`;
      /* labels and published numbers by step */
      const lab=(x,y,txt,a)=>kitLabel(x,y,txt,{a});
      if(p===0)s+=lab(A.x+A.w/2,A.y+A.h+18,'cells enlarge as stores fill','m');
      if(p>=1&&p<=2)s+=lab(L[0]+80*L[2],L[1]+108*L[2],'fat in the liver: insulin resistance','m');
      if(p===2){s+=lab(Pn[0]+70*Pn[2],Pn[1]+56*Pn[2],'fat in the pancreas: less insulin','m');s+=`<text x="${N?200:380}" y="${N?20:28}" class="t-big t-mid" style="fill:var(--risk)">type 2 diabetes</text><text x="${N?200:380}" y="${N?34:42}" class="t-xs t-mid">liver + pancreas: the "twin cycle" (hypothesis)</text>`}
      if(p===3){const w=ramp(t,.52,.62),wg=ramp(t,.5,.54);
        s+=lab(L[0]+80*L[2],L[1]+108*L[2],`liver fat ${f1(lerp(12.8,2.9,w))}%`,'m')+lab(Pn[0]+70*Pn[2],Pn[1]+56*Pn[2],`pancreatic fat ${f1(lerp(8.0,6.2,ramp(t,.54,.64)))}%`,'m');
        s+=`<text x="${Gg.x+12}" y="${Gg.y+Gg.h+16}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${f1(lerp(9.2,5.9,wg))}</text><text x="${Gg.x+12}" y="${Gg.y+Gg.h+28}" class="t-xs t-mid">mmol/L</text>`;
        s+=`<text x="${N?200:380}" y="${N?20:28}" class="t-big t-mid" style="fill:var(--good)">${N?'weight loss (Lim 2011, n = 11)':'weight loss: 11 people, 8 weeks (Lim 2011)'}</text>`}
      s+='</g>'}
    const o2=ramp(t,.66,.71);
    if(o2>0){s+=`<g style="opacity:${f1(o2)}">`;
      const C1=N?{x:50,y:60,w:330,h:200}:{x:60,y:70,w:270,h:240},C2=N?{x:50,y:360,w:330,h:190}:{x:420,y:70,w:270,h:240};
      s+=`<text x="${C1.x-40}" y="${C1.y-34}" class="t-big">DiRECT: in remission</text><text x="${C1.x-40}" y="${C1.y-18}" class="t-xs">pink: intervention · grey: control</text>`;
      s+=bars(C1.x,C1.y,C1.w,C1.h,DB_DR,ramp(t,.68,.8),N,false);
      const g2=ramp(t,.84,.93);
      s+=`<g style="opacity:${f1(.25+.75*ramp(t,.82,.86))}"><text x="${C2.x-40}" y="${C2.y-34}" class="t-big">Remission at 12 months by weight lost</text><text x="${C2.x-40}" y="${C2.y-18}" class="t-xs">whole DiRECT study; 31 of 36 with ≥15 kg</text>`;
      s+=bars(C2.x,C2.y,C2.w,C2.h,DB_KG,g2,N,true)+`</g>`;
      s+='</g>'}
    svg.innerHTML=s;note.innerHTML=noteHTML(DB_STEPS[p]);setA(p);
  }
  const stop=playWire(rg,$('#dbPlay'),draw,26000,'%t:player.replay%','diabetes');
  const setA=stepWire($('#dbSteps'),DB_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- DPP curves ---- */
  const dsvg=$('#dpSvg'),dr=$('#dpT'),db=$('#dpBtns'),dread=$('#dpRead');const on={pl:true,mf:true,ls:true};
  const cum=(a,y)=>{const c28=100*(1-Math.exp(-a.r/100*2.8));if(y<=2.8)return 100*(1-Math.exp(-a.r/100*y));return lerp(c28,a.c15,ease(clamp((y-2.8)/12.2)))};
  function drawD(){
    const y=+dr.value,N=vb(dsvg,'720 320','400 420'),ax=N?curveAxes(46,30,330,300,{x0:0,x1:15,y0:0,y1:70,xt:[0,3,6,9,12,15],yt:[0,20,40,60],yfmt:v=>v+'%',xlabel:'years since randomisation',ylabel:'developed diabetes (cumulative)'})
      :curveAxes(60,30,600,240,{x0:0,x1:15,y0:0,y1:70,xt:[0,2.8,5,10,15],xfmt:v=>v===2.8?'2.8':v,yt:[0,20,40,60],yfmt:v=>v+'%',xlabel:'years since randomisation',ylabel:'developed diabetes (cumulative)'});
    let s=ax.svg;
    s+=`<rect x="${f1(ax.X(0))}" y="30" width="${f1(ax.X(2.8)-ax.X(0))}" height="${N?300:240}" style="fill:var(--hl-soft);opacity:.5"/><text x="${f1(ax.X(1.4))}" y="44" class="t-xs t-mid" style="fill:var(--ink)">trial phase</text>`;
    let txt=[],labs=[];
    DB_ARMS.forEach(a=>{if(!on[a.id])return;const P1=[],P2=[];for(let i=0;i<=28;i++){const v=i/10;P1.push([v,cum(a,v)])}for(let i=0;i<=40;i++){const v=2.8+12.2*i/40;P2.push([v,cum(a,v)])}
      s+=plotLine(P1,ax.X,ax.Y,{col:a.col,upto:y,dash:a.dash}).svg+plotLine(P2,ax.X,ax.Y,{col:a.col,upto:y,lw:1.6,dash:'2 4'}).svg;
      if(y>=15)s+=`<circle cx="${f1(ax.X(15))}" cy="${f1(ax.Y(a.c15))}" r="5" style="fill:${a.col};stroke:var(--panel);stroke-width:2"/>`;
      const v=cum(a,Math.min(y,15)),py=ax.Y(v);s+=`<circle cx="${f1(ax.X(Math.min(y,15)))}" cy="${f1(py)}" r="4" style="fill:${a.col}"/>`;labs.push({y:py,t:`${a.n} ${Math.round(v)}%`,col:a.col});
      txt.push(`${a.n} ${Math.round(v)}%`)});
    labs.sort((p,q)=>p.y-q.y);for(let i=1;i<labs.length;i++)labs[i].y=Math.max(labs[i].y,labs[i-1].y+15);
    const lx=Math.min(ax.X(Math.min(y,15))+10,N?300:600);labs.forEach(l=>{s+=`<text x="${f1(lx)}" y="${f1(l.y+4)}" class="t-sm" style="fill:var(--ink);font-weight:700">${l.t}</text>`});
    dsvg.innerHTML=s;
    const ph=y<=2.8?`Trial phase, year ${f1(y)}: ${txt.join(', ')||'no arm selected'} (computed from the published incidence rates of 11.0, 7.8 and 4.8 cases per 100 person-years, assuming a constant rate). Lifestyle cut incidence by 58% and metformin by 31%; 6.9 people would need the lifestyle programme and 13.9 metformin to prevent one case over three years. [[Knowler2002DPP]]`
      :y<15?`After the trial, year ${f1(y)}: dashed lines are schematic joins to the 15-year values. All groups were then offered group lifestyle sessions, and yearly rates converged (5.9, 4.9 and 5.6 per 100 person-years); at 10 years incidence was still 34% lower with lifestyle and 18% with metformin. [[DPPRG2009]]`
      :`At 15 years cumulative incidence was 55% (lifestyle), 56% (metformin) and 62% (placebo), a 27% reduction with lifestyle (HR 0.73). [[DPPRG2015]] Over about 21 years the benefit persisted (HR 0.76 lifestyle, 0.83 metformin). [[Knowler2025DPPOS]]`;
    dread.innerHTML=ph+' Population averages from one trial.';
  }
  dr.addEventListener('input',drawD);
  db.addEventListener('click',e=>{const b=e.target.closest('[data-arm]');if(!b)return;on[b.dataset.arm]=!on[b.dataset.arm];b.setAttribute('aria-pressed',on[b.dataset.arm]);drawD()});
  drawD();
  /* ---- 16% per kilogram ---- */
  const kr=$('#dbKg'),ko=$('#dbKgOut');
  function drawK(){const kg=+kr.value,hr=Math.pow(.84,kg);ko.innerHTML=`<span class="big-num">${kg===0?'1.00':hr.toFixed(2)}</span> <span>relative hazard after ${kg} kg lost${kg===5?' (published: HR 0.42 per 5 kg)':''}, about ${Math.round((1-hr)*100)}% lower than with no weight lost. Each kilogram meant 16% lower risk in the DPP lifestyle arm, after adjusting for diet and activity. [[Hamman2006]]</span>`}
  kr.addEventListener('input',drawK);drawK();
  const prevR=redraws.diabetes;redraws.diabetes=()=>{prevR&&prevR();drawD()};
};
