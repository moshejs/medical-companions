/* =============== 1.2 The ADHD brain =============== */
/* ENIGMA-ADHD subcortical effect sizes (Cohen's d, ADHD minus controls) [[Hoogman2017]] */
const BR_ENI={
  all:{amygdala:-.19,accumbens:-.15,putamen:-.14,caudate:-.11,hippocampus:-.11,icv:-.10},
  child:{amygdala:-.18,accumbens:-.19,putamen:-.18,caudate:-.13,hippocampus:-.12,icv:-.14},
  adult:{amygdala:-.14,accumbens:-.10,putamen:-.08,caudate:-.07,hippocampus:-.06,icv:.01}};
const BR_ROWS=[['amygdala','Amygdala'],['accumbens','Accumbens'],['putamen','Putamen'],['caudate','Caudate'],['hippocampus','Hippocampus'],['icv','Intracranial vol.']];
const BR_GLAB={all:'whole sample (median age 14)',child:'children under 15',adult:'adults over 21'};
/* median age at which half of cortical points reach peak thickness [[Shaw2007]] */
const BR_PK={td:7.5,adhd:10.5};
const brAge=t=>6+12*t, brTT=a=>(a-6)/12;
const BR_STEPS=[
 {from:0,at:brTT(6.6),k:'Age 6 · during a task',t:'Three networks, one task',
  txt:`Toggle the three networks above. In a meta-analysis of 55 task-based fMRI studies, children with ADHD showed <b>under-activation</b> mainly in the frontoparietal (executive) and ventral attention networks and <b>over-activation</b> in the default, ventral attention and somatomotor networks. The differences were present even without comorbid disorders or any stimulant history. In inhibition tasks, the right inferior frontal cortex, supplementary motor area, anterior cingulate and striato-thalamic areas were less active: the frontostriatal loop. [[Cortese2012,Hart2013]]`,
  pt:`Brain networks are teams of areas that work together. On average, in ADHD the "focus" teams are a little quieter during a task and the "daydreaming" team a little louder.`,
  hook:`Children with ADHD: frontoparietal and ventral attention networks under-active, default-mode network over-active during tasks. [[Cortese2012]]`},
 {from:brTT(7),at:brTT(7.7),k:'Age 7.5 · cortical thickness',t:'The typical cortex peaks first',
  txt:`The cortex thickens through early childhood, peaks, then thins as circuits are pruned and refined. Shaw and colleagues measured thickness at more than 40,000 points on 824 scans from 223 children with ADHD and 223 typically developing children. In the typical group, half of the cortical points had reached peak thickness by a median age of <b>7.5 years</b>. Primary sensory areas peaked first and high-order association areas later. [[Shaw2007]]`,
  pt:`The outer layer of the brain grows thicker, reaches a peak, then slims down as it fine-tunes itself.`,
  hook:`Typically developing children: half of cortical points peak by about 7.5 years. [[Shaw2007]]`},
 {from:brTT(9.6),at:brTT(10.8),k:'Age 10.5 · about 3 years later',t:'ADHD: the same pattern, later',
  txt:`In the ADHD group, the median age was <b>10.5 years</b>: about a 3-year delay (log-rank P &lt; 1.0 × 10<sup>−20</sup>). The order of maturation was the same, and the delay was most marked in prefrontal regions that control attention and motor planning. Surface area was also delayed: right prefrontal area peaked at 14.6 vs 12.7 years, while folding (gyrification) did not differ. The Lancet seminar summarises a 2–3 year average delay. [[Shaw2007,Shaw2012,Posner2020]]`,
  pt:`The thinking part at the front of the brain reaches its full thickness about three years later in many children with ADHD. It still follows the normal order of growth. [[Shaw2007]]`,
  hook:`Delayed cortical maturation: median peak 10.5 vs 7.5 years, most delayed in prefrontal cortex. A delay, not a different sequence. [[Shaw2007]]`},
 {from:brTT(12.6),at:brTT(14.2),k:'Deep structures · ENIGMA-ADHD',t:'Small subcortical differences',
  txt:`The ENIGMA-ADHD mega-analysis pooled MRI data from 1,713 people with ADHD and 1,529 controls at 23 sites. Five subcortical volumes and intracranial volume were slightly smaller in ADHD (d −0.10 to −0.19); the pallidum and thalamus did not differ. Effects were larger in children under 15 than in adults over 21, where no difference was significant. Stimulant use, symptom scores and comorbid disorders did not change the results. Switch groups with the <b>Volumes</b> buttons. [[Hoogman2017]]`,
  pt:`On average, some deep brain areas are slightly smaller in children with ADHD. In adults, the differences mostly disappear. [[Hoogman2017]]`,
  hook:`ENIGMA: d ≈ −0.1 to −0.19, largest in amygdala and accumbens, none in pallidum or thalamus, not significant in adults, not explained by stimulants. [[Hoogman2017]]`},
 {from:brTT(15.6),at:brTT(17.6),k:'Age 16–18 · what it means',t:'Overlap, not a test',
  txt:`An effect of d = −0.19 means the two groups' distributions almost completely overlap: most people with ADHD have volumes well inside the typical range. The ENIGMA cortical analysis found differences in children but none in adolescents or adults. This is why the World Federation of ADHD consensus says brain differences are not useful for diagnosing ADHD, and why imaging studies need samples in the thousands to replicate. [[Hoogman2019,Faraone2021,Marek2022]]`,
  pt:`The differences are tiny, and a brain scan cannot tell whether a person has ADHD. [[Hoogman2017,Faraone2021]]`,
  hook:`Imaging cannot diagnose ADHD: group differences are small and overlap with other disorders. [[Faraone2021,Posner2020]]`}
];

inits.brain=()=>{
  const svg=$('#brSvg'),rg=$('#brT');
  const nets={fs:true,fp:true,dmn:true};let grp='child',setSt=()=>{};
  const thick=(a,pk)=>.2+.62*Math.exp(-Math.pow((a-pk)/(a<pk?3.6:5.4),2));
  const past=(a,md)=>1/(1+Math.exp(-(a-md)/1.1));
  const erf=x=>{const s=Math.sign(x),z=Math.abs(x),k=1/(1+.3275911*z);return s*(1-(((((1.061405429*k-1.453152027)*k)+1.421413741)*k-.284496736)*k+.254829592)*k*Math.exp(-z*z))};
  const Phi=x=>.5*(1+erf(x/Math.SQRT2));
  /* closed smooth loop through points (Catmull-Rom) */
  function loop(P){let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;const n=P.length;
    for(let i=0;i<n;i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
      d+=`C${f1(p1[0]+(p2[0]-p0[0])/6)} ${f1(p1[1]+(p2[1]-p0[1])/6)} ${f1(p2[0]-(p3[0]-p1[0])/6)} ${f1(p2[1]-(p3[1]-p1[1])/6)} ${f1(p2[0])} ${f1(p2[1])}`}
    return d}
  const NET={fs:{c:'var(--dat)',name:'Frontostriatal loop',pts:[[48,48],[94,56],[118,78],[86,88],[54,74]],lab:[64,92]},
    fp:{c:'var(--ne)',name:'Frontoparietal',pts:[[42,44],[84,18],[140,24],[150,44],[100,38]],lab:[96,12]},
    dmn:{c:'var(--dz)',name:'Default mode',pts:[[30,66],[76,42],[124,46],[164,62],[112,84],[58,86]],lab:[164,80]}};
  /* direction of task activation in ADHD vs comparison (children) [[Cortese2012,Hart2013]] */
  const ADHD_NET={fs:{op:.45,w:1.8,arr:'↓'},fp:{op:.4,w:1.7,arr:'↓'},dmn:{op:1,w:3.6,arr:'↑'}};
  function brainBox(bx,by,s,who,t,ph){const k=s/200,P=(px,py)=>[bx+px*k,by+py*k],age=brAge(t);let g='';
    let hl=[],act={};
    if(ph===0){if(nets.fs)hl.push('pfc','str','thal');if(nets.fp)hl.push('pfc','par');if(nets.dmn)hl.push('dmn');if(who==='adhd'&&nets.dmn)act.dmn=.6}
    else if(ph<=2){hl=['pfc'];act.pfc=past(age,BR_PK[who])}
    else hl=['str'];
    g+=brain(bx,by,s,{hl,act}).svg;
    if(ph===0){for(const id of ['fs','fp','dmn']){if(!nets[id])continue;const N=NET[id],A=who==='adhd'?ADHD_NET[id]:{op:.9,w:2.4,arr:''};
        const d=loop(N.pts.map(p=>P(p[0],p[1])));
        g+=`<path d="${d}" style="fill:none;stroke:${N.c};stroke-width:${A.w};opacity:${A.op};stroke-dasharray:7 5;stroke-dashoffset:${f1(-t*1400)};stroke-linecap:round"/>`;
        if(A.arr){const [lx,ly]=P(N.lab[0],N.lab[1]);g+=`<text x="${f1(lx)}" y="${f1(ly)}" class="t-lbl t-mid" style="fill:${N.c}">${A.arr}</text>`}}}
    return g}
  function meter(x,y,w,who,t,N){const a=brAge(t),v=past(a,BR_PK[who]),c=who==='adhd'?'var(--dz)':'var(--accent)';
    let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*v)}" height="6" rx="3" style="fill:${c}"/><line x1="${f1(x+w/2)}" x2="${f1(x+w/2)}" y1="${f1(y-3)}" y2="${f1(y+9)}" style="stroke:var(--ink);stroke-width:1"/>`;
    g+=`<text x="${f1(x+w+6)}" y="${f1(y+6)}" class="t-xs">${v>=.5?(N?'half peaked':'half of cortex peaked'):(N?'cortex peaking':'cortex still peaking')}</text>`;return g}
  /* ---- right-hand panels ---- */
  function pNets(B,N){let s=`<text x="${B.x}" y="${B.y+4}" class="t-sm">${N?'TASK fMRI · ADHD vs COMPARISON':'TASK fMRI · CHILDREN WITH ADHD vs COMPARISON'}</text>`;
    const R=[['fp','Frontoparietal (executive)','↓','under-active during tasks'],['fs','Frontostriatal (inhibition)','↓','right inferior frontal, SMA, cingulate'],
      [null,'Ventral attention','↕','under-active, parts over-active'],['dmn','Default mode','↑','over-active during tasks'],[null,'Somatomotor','↑','over-active during tasks']];
    const rh=(B.h-30)/R.length;
    R.forEach(([id,n,ar,d],i)=>{const y=B.y+30+i*rh,on=id?nets[id]:true,c=id?NET[id].c:'var(--muted)';
      s+=`<g style="opacity:${on?1:.3}"><text x="${B.x}" y="${f1(y+14)}" class="t-big" style="fill:${ar==='↓'?'var(--ne)':ar==='↑'?'var(--dz)':'var(--muted)'}">${ar}</text>`;
      if(id)s+=`<line x1="${B.x+24}" x2="${B.x+44}" y1="${f1(y+9)}" y2="${f1(y+9)}" style="stroke:${c};stroke-width:3;stroke-dasharray:6 3"/>`;
      s+=`<text x="${B.x+(id?52:24)}" y="${f1(y+13)}" class="t-lbl">${n}</text><text x="${B.x+24}" y="${f1(y+28)}" class="t-xs">${d}${id&&!on?' · hidden':''}</text></g>`});
    return s}
  function pCurves(B,t,ph,N){const age=brAge(t);
    const A=axes(B.x+30,B.y+28,B.w-44,B.h-80,{x0:6,x1:18,y0:0,y1:1,xt:N?[6,9,12,15,18]:[6,8,10,12,14,16,18],yt:[],xl:'age (years)'});
    let s=`<text x="${B.x}" y="${B.y+4}" class="t-sm">CORTICAL THICKNESS (SCHEMATIC SHAPE)</text>`+A.svg;
    const pts=w=>{const r=[];for(let a=6;a<=18.001;a+=.1)r.push([a,thick(a,BR_PK[w])]);return r};
    s+=trace(pts('td'),A.X,A.Y,{c:'var(--accent)',upto:age,w:2.6})+trace(pts('adhd'),A.X,A.Y,{c:'var(--dz)',upto:age,w:2.6});
    [['td','var(--accent)','typical'],['adhd','var(--dz)','ADHD']].forEach(([w,c,l],i)=>{const pk=BR_PK[w];if(age<pk)return;const x=A.X(pk),y=A.Y(thick(pk,pk));
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y+6)}" y2="${f1(A.Y(0))}" style="stroke:${c};stroke-dasharray:3 3;stroke-width:1.2"/>`;
      s+=`<text x="${f1(x+5)}" y="${f1(A.Y(i?.06:.18))}" class="t-xs" style="fill:${c}">${l} ${pk} y</text>`});
    if(age>=BR_PK.adhd){const y=A.Y(.95),x0=A.X(BR_PK.td),x1=A.X(BR_PK.adhd);
      s+=`<defs>${marker('brDel','var(--ink)',6)}</defs><path d="M${f1(x0+4)} ${f1(y)}H${f1(x1-4)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#brDel)" marker-start="url(#brDel)"/><text x="${f1((x0+x1)/2)}" y="${f1(y-7)}" class="t-lbl t-mid">≈ 3-year delay</text>`}
    const xn=A.X(age);s+=`<line x1="${f1(xn)}" x2="${f1(xn)}" y1="${B.y+20}" y2="${f1(A.Y(0))}" style="stroke:var(--brand);stroke-width:1.4"/>`;
    s+=`<text x="${B.x+30}" y="${f1(B.y+B.h-12)}" class="t-xs"><tspan style="fill:var(--accent)">━ typically developing</tspan>   <tspan style="fill:var(--dz)">━ ADHD</tspan></text>`;
    return s}
  function pBars(B,t,N){const D=BR_ENI[grp],gr=ease(ramp(t,BR_STEPS[3].from,BR_STEPS[3].at));
    const lx=B.x+(N?92:112),x0=-.25,x1=.05,X=v=>lerp(lx,B.x+B.w-30,(v-x0)/(x1-x0)),top=B.y+40,rh=(B.h-96)/BR_ROWS.length;
    let s=`<text x="${B.x}" y="${B.y+4}" class="t-sm">ENIGMA-ADHD · COHEN'S d · ${N?(grp==='all'?'ALL':grp==='child'?'UNDER 15':'OVER 21'):BR_GLAB[grp].toUpperCase()}</text>`;
    s+=`<text x="${B.x}" y="${B.y+20}" class="t-xs">${N?'1,713 ADHD · 1,529 controls · 23 sites':'1,713 with ADHD · 1,529 controls · 23 sites · smaller ←  → larger'}</text>`;
    [-.2,-.1,0].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-6}" y2="${f1(top+rh*BR_ROWS.length)}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${f1(top+rh*BR_ROWS.length+13)}" class="t-xs t-mid">${v?String(v).replace('-','−'):'0'}</text>`});
    s+=`<line x1="${f1(X(-.2))}" x2="${f1(X(-.2))}" y1="${top-6}" y2="${f1(top+rh*BR_ROWS.length)}" style="stroke:var(--warn);stroke-dasharray:4 3;stroke-width:1.2"/>`;
    BR_ROWS.forEach(([k,l],i)=>{const v=D[k]*gr,y=top+i*rh+rh*.18,h=rh*.56,xa=X(Math.min(0,v)),xb=X(Math.max(0,v));
      s+=`<text x="${f1(lx-8)}" y="${f1(y+h/2+4)}" class="t-sm t-end" style="fill:var(--ink)">${N&&k==='icv'?'Intracranial':l}</text>`;
      s+=`<rect x="${f1(xa)}" y="${f1(y)}" width="${f1(Math.max(1,xb-xa))}" height="${f1(h)}" rx="2" style="fill:${grp==='adult'?'var(--muted)':'var(--dz)'};opacity:.85"/>`;
      if(gr>.6)s+=`<text x="${f1(xb+5)}" y="${f1(y+h/2+3.5)}" class="t-xs" style="fill:var(--ink)">${D[k]<0?'−':'+'}${Math.abs(D[k]).toFixed(2)}</text>`});
    const fy=top+rh*BR_ROWS.length+30;
    s+=`<text x="${B.x}" y="${f1(fy)}" class="t-xs" style="fill:var(--warn)">dashed: d = −0.2. Every effect is smaller.</text>`;
    s+=`<text x="${B.x}" y="${f1(fy+14)}" class="t-xs">${grp==='adult'?'No adult difference was statistically significant.':'Pallidum and thalamus: no difference.'}</text>`;
    return s}
  function pOverlap(B,t,N){const D=BR_ENI[grp];let kmax='amygdala';BR_ROWS.forEach(([k])=>{if(Math.abs(D[k])>Math.abs(D[kmax]))kmax=k});
    const d=D[kmax],sh=d*ease(ramp(t,BR_STEPS[4].from,BR_STEPS[4].from+.06)),ovl=2*Phi(-Math.abs(d)/2);
    const x0=B.x+10,w=B.w-20,base=B.y+B.h-96,hh=B.h-170,Z=z=>x0+(z+3.6)/7.2*w,pdf=z=>Math.exp(-z*z/2);
    const path=m=>{let p='';for(let i=0;i<=120;i++){const z=-3.6+7.2*i/120;p+=(i?'L':'M')+f1(Z(z))+' '+f1(base-hh*pdf(z-m))}return p};
    let s=`<text x="${B.x}" y="${B.y+4}" class="t-sm">${N?'ONE STRUCTURE, TWO GROUPS':'ONE STRUCTURE, TWO GROUPS: HOW MUCH THEY OVERLAP'}</text>`;
    s+=`<text x="${B.x}" y="${B.y+22}" class="t-lbl">${BR_ROWS.find(r=>r[0]===kmax)[1]}, ${BR_GLAB[grp]}: d = ${d<0?'−':''}${Math.abs(d).toFixed(2)}</text>`;
    s+=`<path d="${path(0)}L${f1(Z(3.6))} ${base}L${f1(Z(-3.6))} ${base}Z" style="fill:var(--accent);opacity:.16"/><path d="${path(sh)}L${f1(Z(3.6))} ${base}L${f1(Z(-3.6))} ${base}Z" style="fill:var(--dz);opacity:.16"/>`;
    s+=`<path d="${path(0)}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/><path d="${path(sh)}" style="fill:none;stroke:var(--dz);stroke-width:2.4;stroke-dasharray:6 3"/>`;
    s+=`<line x1="${x0}" x2="${x0+w}" y1="${base}" y2="${base}" class="axis"/><text x="${x0}" y="${base+14}" class="t-xs">smaller volume</text><text x="${x0+w}" y="${base+14}" class="t-xs t-end">larger volume</text>`;
    s+=`<text x="${B.x}" y="${base+36}" class="t-xs"><tspan style="fill:var(--accent)">━ comparison</tspan>   <tspan style="fill:var(--dz)">┅ ADHD</tspan></text>`;
    s+=`<text x="${B.x}" y="${base+60}" class="t-big">${Math.round(ovl*100)}% overlap</text><text x="${B.x}" y="${base+78}" class="t-xs">${N?'computed from d (normal curves)':'computed from d, assuming normal curves of equal spread'}</text>`;
    return s}
  function draw(t){const N=vb(svg,'720 380','400 560'),ph=phaseOf(BR_STEPS,t),age=brAge(t);let s='';
    if(N){
      s+=`<text x="20" y="22" class="t-sm" style="fill:var(--accent)">TYPICALLY DEVELOPING</text><text x="210" y="22" class="t-sm" style="fill:var(--dz)">ADHD</text><text x="380" y="22" class="t-big t-end">${f1(age)} y</text>`;
      s+=brainBox(16,34,172,'td',t,ph)+brainBox(206,34,172,'adhd',t,ph);
      if(ph>=1&&ph<=2)s+=meter(20,178,80,'td',t,N)+meter(210,178,80,'adhd',t,N);
      s+=`<line x1="16" x2="384" y1="198" y2="198" class="grid"/>`;
      const B={x:20,y:214,w:364,h:336};
      s+=ph===0?pNets(B,N):ph<=2?pCurves(B,t,ph,N):ph===3?pBars(B,t,N):pOverlap(B,t,N);
    }else{
      s+=`<text x="30" y="22" class="t-sm" style="fill:var(--accent)">TYPICALLY DEVELOPING · GROUP AVERAGE</text><text x="30" y="206" class="t-sm" style="fill:var(--dz)">ADHD · GROUP AVERAGE</text>`;
      s+=brainBox(40,32,188,'td',t,ph)+brainBox(40,216,188,'adhd',t,ph);
      if(ph>=1&&ph<=2)s+=meter(46,184,110,'td',t,N)+meter(46,368,110,'adhd',t,N);
      s+=`<line x1="296" x2="296" y1="10" y2="370" class="grid"/>`;
      s+=`<text x="704" y="24" class="t-big t-end">Age ${f1(age)}</text>`;
      const B={x:318,y:40,w:388,h:330};
      s+=ph===0?pNets(B,N):ph<=2?pCurves(B,t,ph,N):ph===3?pBars(B,t,N):pOverlap(B,t,N);
    }
    svg.innerHTML=s;
    $('#brNote').innerHTML=noteHTML(BR_STEPS[ph]);setSt(ph);
    const r=[`<span>Age <b>${f1(age)} years</b></span>`];
    if(ph<=2)r.push(`<span>Median peak: typical <b>7.5 y</b> · ADHD <b>10.5 y</b></span>`);
    if(ph>=3)r.push(`<span>ENIGMA group: <b>${BR_GLAB[grp]}</b></span>`);
    $('#brRead').innerHTML=r.join('');
  }
  const stop=playWire(rg,$('#brPlay'),draw,22000,'%t:player.replay%','brain');
  setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  $$('[data-brnet]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.brnet;nets[k]=!nets[k];b.setAttribute('aria-pressed',nets[k]);
    stop();if(phaseOf(BR_STEPS,+rg.value)!==0)rg.value=BR_STEPS[0].at;draw(+rg.value)}));
  $$('[data-brgrp]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.brgrp;$$('[data-brgrp]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    stop();if(phaseOf(BR_STEPS,+rg.value)<3)rg.value=BR_STEPS[3].at;draw(+rg.value)}));
  draw(+rg.value);

  /* ---- default-mode interference (schematic model of a hypothesis) [[SonugaBarke2007]] ---- */
  const dsv=$('#brDm'),dT=$('#brDmT'),dD=$('#brDmD');let dg='adhd';
  const R=rng(41),NS=300,nz=[];let acc=0;for(let i=0;i<=NS;i++){acc=acc*.85+(R()-.5)*.6;nz.push(acc)}
  function dmn(u,dem){const amp=(dg==='adhd'?.42+.4*dem:.2+.16*dem)*(1+.6*dem*u);
    return amp*(Math.sin((u*5.2+.15)*Math.PI*2)*.75+Math.sin((u*2.1+.6)*Math.PI*2)*.35)+nz[Math.round(u*NS)]*.06}
  function att(u,dem){const v=dmn(u,dem),cp=dg==='adhd'?.45:1;return clamp(.78-cp*.25*v-Math.max(0,v-.42)*1.5+nz[(Math.round(u*NS)+37)%NS]*.04,0,1)}
  function dmDraw(tt){const n=vb(dsv,'720 260','400 400'),dem=+dD.value;
    const x0=n?20:40,x1=n?385:700,T1=n?{top:30,h:120}:{top:28,h:80},T2=n?{top:200,h:120}:{top:142,h:70};
    const X=u=>lerp(x0,x1,u),Y1=v=>T1.top+T1.h/2-v*T1.h*.55,Y2=v=>T2.top+T2.h-v*T2.h,thr=.42;let s='';
    s+=`<text x="${x0}" y="${T1.top-10}" class="t-sm" style="fill:var(--dz)">DEFAULT-MODE ACTIVITY</text><text x="${x1}" y="${T1.top-10}" class="t-xs t-end">slow, below 0.1 Hz</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y1(thr))}" y2="${f1(Y1(thr))}" style="stroke:var(--warn);stroke-dasharray:4 3;stroke-width:1.1"/><text x="${x1}" y="${f1(Y1(thr)-4)}" class="t-xs t-end" style="fill:var(--warn)">intrusion level</text>`;
    s+=`<text x="${x0}" y="${T2.top-10}" class="t-sm" style="fill:var(--accent)">TASK ATTENTION</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${T2.top+T2.h}" y2="${T2.top+T2.h}" class="axis"/>`;
    let p1='',p2='',laps=0,inL=false,ticks='';const M=240;
    for(let i=0;i<=M;i++){const u=i/M;if(u>tt+1e-9)break;const v=dmn(u,dem),a=att(u,dem);
      p1+=(i?'L':'M')+f1(X(u))+' '+f1(Y1(v));p2+=(i?'L':'M')+f1(X(u))+' '+f1(Y2(a));
      if(v>thr&&!inL){inL=true;laps++;ticks+=`<path d="M${f1(X(u))} ${T2.top+T2.h+6}v10" style="stroke:var(--drug);stroke-width:2.4;stroke-linecap:round"/>`}else if(v<thr-.05)inL=false}
    s+=`<path d="${p1}" style="fill:none;stroke:var(--dz);stroke-width:2.2;stroke-linejoin:round"/><path d="${p2}" style="fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linejoin:round"/>`+ticks;
    const xt=X(tt);s+=`<line x1="${f1(xt)}" x2="${f1(xt)}" y1="${T1.top-4}" y2="${T2.top+T2.h+18}" style="stroke:var(--brand);stroke-width:1.2"/>`;
    const ty=T2.top+T2.h+34;
    [0,30,60,90,120].forEach(sec=>{s+=`<text x="${f1(X(sec/120))}" y="${ty}" class="t-xs ${sec===0?'':sec===120?'t-end':'t-mid'}">${sec} s</text>`});
    s+=`<text x="${x1}" y="${T2.top-10}" class="t-xs t-end" style="fill:var(--drug)">▮ = a lapse</text>`;
    dsv.innerHTML=s;
    $('#brDmRead').innerHTML=`<span>Group: <b>${dg==='adhd'?'ADHD (hypothesis)':'comparison'}</b></span><span>Task: <b>${dem<.34?'short, engaging':dem<.67?'medium':'long, low-stimulation'}</b></span><span>Lapses so far: <b>${laps}</b> in ${Math.round(tt*120)} s (schematic)</span>`}
  const dStop=playWire(dT,$('#brDmPlay'),dmDraw,9000,'%t:player.replay%','brain');
  dD.addEventListener('input',()=>{dStop();dmDraw(+dT.value)});
  $$('[data-brdg]').forEach(b=>b.addEventListener('click',()=>{dg=b.dataset.brdg;$$('[data-brdg]').forEach(x=>x.setAttribute('aria-pressed',x===b));dStop();dmDraw(+dT.value)}));
  dmDraw(+dT.value);
};
