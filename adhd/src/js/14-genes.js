/* =============== 1.4 Genes & heritability =============== */
const GE_STEPS=[
 {from:0,at:.17,k:'Step 1 · one family',t:'ADHD runs in families',
  txt:`In this illustrative family, a boy is diagnosed at 8; his father recognises himself and is diagnosed at 38; a brother is diagnosed later; a grandfather had the traits but was never assessed. Clustering like this is typical. In 894 children with ADHD and 1,135 siblings, the siblings had a ninefold higher risk than siblings of control children. In an adoption study, 18% of the biological parents of children with ADHD had ADHD, against 6% of adoptive parents of adopted children with ADHD and 3% of parents of controls. Of 84 children of referred adults with childhood-onset ADHD, 57% met criteria themselves. [[Faraone2019,Sprich2000,Biederman1995]]`,
  pt:`ADHD often runs in families. A parent may only recognise their own ADHD when their child is diagnosed.`,
  hook:`Adoption design: ADHD in 18% of biological parents vs 6% of adoptive parents (vs 3% of control parents) points to genes, not upbringing. [[Sprich2000]]`},
 {from:.2,at:.37,k:'Step 2 · twins',t:'Identical and non-identical twins',
  txt:`Identical twins share all their genes, non-identical twins about half, and both share a home. If identical pairs are much more alike, genes explain much of the difference between people. In a Swedish register of 1.66 million people, the co-twin of an identical twin with ADHD had a hazard ratio of 70.45; of a non-identical twin, 8.44, about the same as a full sibling (8.27). Across 37 twin studies, mean heritability is 74%; the Swedish twin register gives 0.88 for diagnosed ADHD and 0.72 in adults. Self-rated adult studies give 30–40%, mostly because of rater effects. <span class="ev est">Established</span> [[Chen2017JCPP,Faraone2019,Larsson2014]]`,
  pt:`When one identical twin has ADHD, the other very often does too. That tells us genes matter a lot.`,
  hook:`Twin heritability of ADHD ≈ 74% (37 studies). Low adult estimates (30–40%) come mostly from self-report. [[Faraone2019]]`},
 {from:.4,at:.57,k:'Step 3 · genome-wide studies',t:'Many small effects',
  txt:`Before 2019 no single variant passed genome-wide significance: samples were too small. With 20,183 people with ADHD and 35,191 controls, the first 12 loci appeared, each risk allele raising the odds by a factor of only 1.077 to 1.198. With 38,691 cases and 186,843 controls, 27 loci and 76 candidate genes, enriched for expression in early brain development. About 7,300 common variants account for 90% of the SNP heritability. Each tick in the panel is one tiny push; together they make a polygenic score. [[Faraone2019,Demontis2019,Demontis2023,Demontis2026]]`,
  pt:`There is no single ADHD gene. Thousands of tiny genetic differences each add a very small amount of risk.`,
  hook:`GWAS: 12 loci (2019, 20,183 cases) → 27 loci (2023, 38,691 cases). Index-SNP odds ratios 1.08–1.20. [[Demontis2019,Demontis2023]]`},
 {from:.6,at:.77,k:'Step 4 · polygenic scores',t:'Why a score cannot diagnose',
  txt:`Adding up the tiny effects gives a polygenic score. People with ADHD score higher on average (OR 1.56 per standard deviation in iPSYCH), but the score explained at most 5.5% of variance there, and a meta-analysis of 12 effect sizes (N=40,088) found r ≈ 0.20, or 3.6–4.0% of variance. The two curves overlap almost entirely: most people with a high score do not have ADHD, and many people with ADHD have an average score. The same score also tracks anxiety and depression. Adding a polygenic score to an adult rating scale raised variance explained from 61.11% to 61.69%. [[Demontis2019,Li2021PGS,Faraone2021,Hoberg2024]]`,
  pt:`A gene score can show a small tilt in risk across a big group. It cannot tell whether one person has ADHD.`,
  hook:`Polygenic scores explain about 4–5.5% of variance in ADHD: a research tool, not a diagnostic test. [[Li2021PGS,Demontis2019,Thapar2013]]`},
 {from:.8,at:.97,k:'Step 5 · rare variants',t:'Rare variants and CNVs: big effects, small share',
  txt:`Rare variants act on top of the common ones. Large rare copy-number variants (CNVs, over 500 kb) were about twice as common in children with ADHD (rate 0.156 vs 0.075), and higher still with intellectual disability. Duplications at 15q13.3 (CHRNA7), found in 0.6%, carried OR 2.22. In exomes of 8,895 people with ADHD, rare protein-truncating variants in constrained genes carried OR 1.35, and three genes (MAP1A, ANO8, ANK2) had odds ratios of 5.55–15.13. Yet rare-variant burden explains about 2.5% of liability, and rare and common effects add together. [[Williams2010Lancet,Williams2012AJP,Demontis2026]]`,
  pt:`A few rare genetic changes raise the chance of ADHD a lot, but they are found in only a small number of people.`,
  hook:`Effect ladder: common SNP OR ≈ 1.1 · 15q13.3 duplication 2.22 · MAP1A/ANO8/ANK2 5.55–15.13. Large effect ≠ large share of cases. [[Demontis2019,Williams2012AJP,Demontis2026]]`}
];
inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT');let gv='common',setSt=()=>{};
  /* ---- the family tree, in a 290 x 280 frame ---- */
  function famTree(u,op,pgs){let s=`<g style="opacity:${f1(op)}">`;
    const L='style="stroke:var(--ink);stroke-width:1.3;fill:none"';
    s+=`<text x="2" y="48" class="t-sm">I</text><text x="2" y="138" class="t-sm">II</text><text x="2" y="228" class="t-sm">III</text>`;
    s+=`<path d="M61 44H89M201 44H229M75 44V90M35 90H120M35 90V123M120 90V123M215 44V90M170 90H255M170 90V123M255 90V123M131 134H159M145 134V180M110 180H180M110 180V213M145 180V213M180 180V213" ${L}/>`;
    const P=[ ['PGF',50,44,'m',u>.85?.5:0,'traits'],['PGM',100,44,'f',0,''],['MGF',190,44,'m',0,''],['MGM',240,44,'f',0,''],
      ['aunt',35,134,'f',0,''],['father',120,134,'m',u>.45?1:0,u>.45?'dx at 38':''],['mother',170,134,'f',0,''],['uncle',255,134,'m',0,''],
      ['pro',110,224,'m',u>.15?1:0,u>.15?'dx at 8':''],['sis',145,224,'f',0,''],['bro',180,224,'m',u>.7?1:0,u>.7?'dx at 11':''] ];
    const G={father:.82,mother:.5,pro:.9,sis:.42,bro:.76,aunt:.55,uncle:.38,PGF:.7,PGM:.45,MGF:.4,MGM:.5};
    P.forEach(([id,x,y,sx,a,lab])=>{s+=ped(x,y,sx,a,{proband:id==='pro'});
      if(lab)s+=`<text x="${id==='pro'?x+8:x}" y="${y+25}" class="t-xs t-mid" style="fill:${a>=1?'var(--dz)':'var(--warn)'}">${lab}</text>`;
      if(pgs>0){const w=34*G[id]*pgs;s+=`<rect x="${x-17}" y="${y+30}" width="34" height="4" rx="2" style="fill:var(--panel-2)"/><rect x="${x-17}" y="${y+30}" width="${f1(w)}" height="4" rx="2" style="fill:var(--dz)"/>`}});
    if(pgs>0)s+=`<text x="2" y="272" class="t-xs">bars: each person's polygenic score (illustrative)</text>`;
    return s+'</g>'}
  /* ---- right-hand panels; B = {x,y,w,h} ---- */
  function pAdopt(B,p){let s=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--dz)">ADOPTION STUDY · PARENTS WHO HAVE ADHD</text>`;
    const R=[ ['Biological parents of children with ADHD',18,'var(--dz)'],['Adoptive parents of adopted children with ADHD',6,'var(--accent)'],['Parents of control children',3,'var(--muted)'] ];
    const bw=B.w-56;
    R.forEach(([l,v,c],i)=>{const y=B.y+44+i*54,w=bw*v/20*ease(p);
      s+=`<text x="${B.x}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${B.x}" y="${y+7}" width="${f1(bw)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+7}" width="${f1(w)}" height="16" rx="4" style="fill:${c}"/><text x="${f1(B.x+w+6)}" y="${y+19}" class="t-lbl">${Math.round(v*ease(p))}%</text>`});
    const y2=B.y+230;
    s+=`<text x="${B.x}" y="${y2}" class="t-sm">RELATIVES OF A PERSON WITH ADHD · HAZARD RATIO</text>`;
    const H=[ ['full sibling',8.27],['half-sibling, same mother',2.86],['half-sibling, same father',2.31],['cousin',2.24] ];
    const X=v=>B.x+Math.log(v)/Math.log(10)*(B.w-60);
    H.forEach(([l,v],i)=>{const y=y2+22+i*24,q=ramp(p,.2+i*.15,.5+i*.15);
      s+=`<line x1="${B.x}" x2="${f1(X(lerp(1,v,q)))}" y1="${y}" y2="${y}" style="stroke:var(--dz);stroke-width:7;stroke-linecap:round;opacity:.8"/><text x="${f1(X(lerp(1,v,q))+8)}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${l} · ${q>=1?v:''}</text>`});
    s+=`<text x="${B.x}" y="${y2+124}" class="t-xs">log scale from 1 (no extra risk) · Swedish register</text>`;
    return s}
  function twinPair(x,y,mz,a2,r){let s=`<path d="M${x} ${y-30}L${x-16} ${y-r}M${x} ${y-30}L${x+16} ${y-r}" style="stroke:var(--ink);stroke-width:1.3;fill:none"/>`;
    if(mz)s+=`<line x1="${x-9}" x2="${x+9}" y1="${y-21}" y2="${y-21}" style="stroke:var(--ink);stroke-width:1.3"/>`;
    return s+ped(x-16,y,'m',1,{r})+ped(x+16,y,'m',a2,{r})}
  function pTwins(B,p){let s=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--dz)">TWINS · ONE TWIN DIAGNOSED (LEFT OF EACH PAIR)</text>`;
    const n=B.w>380?5:4,gap=(B.w-30)/n,r=9;
    const rows=[ ['Identical (MZ): all genes shared',true,[1,1,1,1,0],'co-twin HR 70.45'],['Non-identical (DZ): about half shared',false,[1,0,0,0,0],'co-twin HR 8.44'] ];
    rows.forEach(([l,mz,c,hr],ri)=>{const y=B.y+76+ri*86;
      s+=`<text x="${B.x}" y="${y-44}" class="t-xs" style="fill:var(--ink)">${l}</text><text x="${B.x+B.w}" y="${y-44}" class="t-xs t-end" style="fill:var(--dz)">${p>.35?hr:''}</text>`;
      for(let i=0;i<n;i++){const q=ramp(p,.1+i*.08,.3+i*.08);s+=twinPair(B.x+26+i*gap,y,mz,q>=1?c[i]:0,r)}});
    /* heritability gauge */
    const cx=B.x+B.w/2,cy=B.y+B.h-28,R=Math.min(84,B.w/2-30),A=v=>Math.PI*(1-v/100);
    const P=v=>[cx+Math.cos(A(v))*R,cy-Math.sin(A(v))*R];
    const arc=(a,b,c,w)=>{const [x1,y1]=P(a),[x2,y2]=P(b);return `<path d="M${f1(x1)} ${f1(y1)}A${R} ${R} 0 0 1 ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${c};stroke-width:${w}"/>`};
    s+=arc(0,100,'var(--panel-2)',14)+arc(30,40,'var(--warn)',14);
    const v=74*ease(ramp(p,.35,.9));s+=arc(0.01,Math.max(.02,v),'var(--dz)',14);
    [0,50,100].forEach(k=>{const [x,y]=P(k);s+=`<text x="${f1(x)}" y="${f1(y+(k===50?-12:16))}" class="t-xs t-mid">${k}%</text>`});
    [ [72,'adults 72'],[88,'Sweden 88'] ].forEach(([k,l])=>{if(p<.9)return;const [x,y]=P(k),[xo,yo]=[cx+Math.cos(A(k))*(R+12),cy-Math.sin(A(k))*(R+12)];s+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(xo)}" y2="${f1(yo)}" style="stroke:var(--ink);stroke-width:1.2"/><text x="${f1(xo+4)}" y="${f1(yo)}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    const [nx,ny]=P(v);s+=`<line x1="${cx}" y1="${cy}" x2="${f1(lerp(cx,nx,.82))}" y2="${f1(lerp(cy,ny,.82))}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="4" style="fill:var(--ink)"/>`;
    s+=`<text x="${cx}" y="${cy-24}" class="t-big t-mid">${Math.round(v)}%</text><text x="${cx}" y="${cy+16}" class="t-xs t-mid">heritability · mean of 37 twin studies</text>`;
    s+=`<text x="${f1(P(35)[0]-10)}" y="${f1(P(35)[1]-14)}" class="t-xs t-end" style="fill:var(--warn)">self-report 30–40</text>`;
    return s}
  function pTicks(B,p){let s=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--dz)">GENOME-WIDE STUDIES · MANY TINY EFFECTS</text>`;
    const rr=rng(7),cols=Math.floor((B.w)/9),rows=12,N=cols*rows,n=Math.round(N*ease(ramp(p,0,.85)));let sc=0;
    for(let i=0;i<N;i++){const h=3+rr()*7,risk=rr()<.55,cx=B.x+(i%cols)*9+3,cy=B.y+40+Math.floor(i/cols)*15;
      if(i<n){sc+=risk?h:-h*.4;s+=`<line x1="${cx}" x2="${cx}" y1="${f1(cy+10-h)}" y2="${cy+10}" style="stroke:${risk?'var(--dz)':'var(--muted)'};stroke-width:2.2;stroke-linecap:round;opacity:${risk?.9:.45}"/>`}
      else s+=`<circle cx="${cx}" cy="${cy+8}" r=".8" style="fill:var(--line)"/>`}
    const y=B.y+40+rows*15+16,mx=N*1.8,w=clamp(sc/mx)*B.w;
    s+=`<text x="${B.x}" y="${y}" class="t-xs" style="fill:var(--ink)">polygenic score (sum of the ticks)</text><rect x="${B.x}" y="${y+6}" width="${B.w}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+6}" width="${f1(w)}" height="12" rx="6" style="fill:var(--dz)"/>`;
    const q1=ramp(p,0,.45),q2=ramp(p,.5,.9),loci=Math.round(q2>0?lerp(12,27,q2):lerp(0,12,q1)),yr=q2>0?'2023 · 38,691 cases':'2019 · 20,183 cases';
    const y3=y+56;
    s+=`<text x="${B.x}" y="${y3}" class="t-big" style="font-size:30px;fill:var(--dz)">${loci}</text><text x="${B.x+48}" y="${y3-12}" class="t-xs" style="fill:var(--ink)">genome-wide-significant loci</text><text x="${B.x+48}" y="${y3}" class="t-xs">${yr}</text>`;
    s+=`<text x="${B.x}" y="${y3+24}" class="t-xs" style="fill:var(--ink)">each risk allele: OR 1.077 to 1.198</text><text x="${B.x}" y="${y3+40}" class="t-xs">≈7,300 common variants carry 90% of SNP heritability</text>`;
    s+=`<text x="${B.x+B.w}" y="${B.y+30}" class="t-xs t-end"><tspan style="fill:var(--dz)">▮ raises</tspan>  <tspan>▮ lowers</tspan> (illustrative)</text>`;
    return s}
  function pBell(B,p){let s=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--dz)">POLYGENIC SCORE · CASES VS CONTROLS</text>`;
    const d=.44*ease(p),x0=B.x+6,x1=B.x+B.w-6,yb=B.y+B.h-60,H=B.h-150,X=v=>lerp(x0,x1,(v+3.5)/7.5),pdf=(v,m)=>Math.exp(-(v-m)*(v-m)/2);
    const curve=m=>{let dd='';for(let i=0;i<=90;i++){const v=-3.5+i/90*7.5;dd+=(i?'L':'M')+f1(X(v))+' '+f1(yb-pdf(v,m)*H)}return dd};
    const th=1.28;
    s+=`<path d="${curve(0)}L${f1(x1)} ${yb}L${f1(x0)} ${yb}Z" style="fill:var(--muted);opacity:.16"/><path d="${curve(0)}" style="fill:none;stroke:var(--muted);stroke-width:2.2"/>`;
    s+=`<path d="${curve(d)}L${f1(x1)} ${yb}L${f1(x0)} ${yb}Z" style="fill:var(--dz);opacity:.16"/><path d="${curve(d)}" style="fill:none;stroke:var(--dz);stroke-width:2.4"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    if(p>.5){s+=`<line x1="${f1(X(th))}" x2="${f1(X(th))}" y1="${f1(yb-H-8)}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${f1(X(th)+5)}" y="${f1(yb-H+4)}" class="t-xs" style="fill:var(--ink)">a "high" score</text>`}
    s+=`<text x="${f1(X(0))}" y="${f1(yb-H-6)}" class="t-xs t-mid">without ADHD</text><text x="${f1(X(d)+30)}" y="${f1(yb-H*.62)}" class="t-xs" style="fill:var(--dz)">with ADHD</text>`;
    s+=`<text x="${f1(x0)}" y="${yb+16}" class="t-xs">lower score</text><text x="${f1(x1)}" y="${yb+16}" class="t-xs t-end">higher score</text>`;
    s+=`<text x="${B.x}" y="${yb+38}" class="t-xs" style="fill:var(--ink)">variance explained: 3.6–4.0% (meta) · up to 5.5% (iPSYCH)</text><text x="${B.x}" y="${yb+54}" class="t-xs">shift drawn to match OR 1.56 per SD · schematic</text>`;
    return s}
  function pRare(B,p){let s=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--dz)">EFFECT SIZE LADDER · ODDS RATIO, LOG SCALE</text>`;
    const xa=B.x+4,xb=B.x+B.w-8,X=v=>lerp(xa,xb,Math.log(v)/Math.log(20));
    [1,2,5,10,20].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${B.y+26}" y2="${B.y+228}" class="grid"/><text x="${f1(X(v))}" y="${B.y+242}" class="t-xs t-mid">${v}</text>`});
    const R=[ ['common','Common SNP (each index allele) · thousands',1.077,1.198,null],['rare','Rare truncating variants, constrained genes',1.26,1.45,1.35],['rare','15q13.3 duplication (CHRNA7) · 0.6%',1.5,3.6,2.22],['rare','MAP1A · ANO8 · ANK2 (single genes)',5.55,15.13,null] ];
    R.forEach(([g,l,lo,hi,pt],i)=>{const y=B.y+48+i*50,q=ease(ramp(p,i*.15,.3+i*.15)),on=g===gv,op=on?1:.55,c=g==='common'?'var(--dz)':'var(--warn)';
      s+=`<g style="opacity:${op}"><text x="${xa}" y="${y-6}" class="t-xs" style="fill:var(--ink)">${l}</text>`;
      if(q>0){s+=`<line x1="${f1(X(1))}" x2="${f1(lerp(X(1),X(hi),q))}" y1="${y+8}" y2="${y+8}" style="stroke:${c};stroke-width:2;opacity:.35"/><rect x="${f1(X(lo))}" y="${y+2}" width="${f1(Math.max(3,(X(hi)-X(lo))*q))}" height="12" rx="6" style="fill:${c}"/>`;
        if(pt)s+=`<circle cx="${f1(X(pt))}" cy="${y+8}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
        if(q>=1)s+=`<text x="${f1(Math.min(X(hi)+6,xb-40))}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${pt?pt:lo+'–'+hi}</text>`}
      s+='</g>'});
    /* share of liability */
    const y=B.y+272,W=B.w-8,tw=W*.74*ease(ramp(p,.4,.8)),cw=W*.18,rw=W*.025;
    s+=`<text x="${B.x}" y="${y}" class="t-xs" style="fill:var(--ink)">share of liability · twin heritability 74% (outline)</text>`;
    s+=`<rect x="${B.x}" y="${y+8}" width="${f1(W)}" height="22" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+8}" width="${f1(tw)}" height="22" rx="4" style="fill:none;stroke:var(--dz);stroke-width:1.6;stroke-dasharray:4 3"/>`;
    if(p>.5){s+=`<rect x="${B.x}" y="${y+8}" width="${f1(cw)}" height="22" rx="4" style="fill:var(--dz);opacity:${gv==='common'?1:.35}"/><rect x="${f1(B.x+cw)}" y="${y+8}" width="${f1(Math.max(3,rw))}" height="22" style="fill:var(--warn);opacity:${gv==='rare'?1:.35}"/>`;
      s+=`<text x="${B.x}" y="${y+46}" class="t-xs"><tspan style="fill:var(--dz)">common 14–22%</tspan> · <tspan style="fill:var(--warn)">rare 2.5%</tspan> · rest not yet found</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 420','400 740'),ph=phaseOf(GE_STEPS,t);
    const B=N?{x:22,y:392,w:360,h:330}:{x:332,y:26,w:374,h:372};
    const u=ramp(t,.02,.18),pg=ph>=2?ease(ramp(t,.4,.55)):0,op=ph===0?1:ph===1?.55:.8;
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    s+=`<g transform="translate(${N?16:12} ${N?14:30}) scale(${N?1.26:1})">${famTree(ph?1:u,op,pg)}</g>`;
    if(!N)s+=`<line x1="316" x2="316" y1="20" y2="400" style="stroke:var(--line)"/>`;else s+=`<line x1="16" x2="384" y1="378" y2="378" style="stroke:var(--line)"/>`;
    const P=[pAdopt,pTwins,pTicks,pBell,pRare][ph],lo=[0,.2,.4,.6,.8][ph];
    s+=P(B,ramp(t,lo+.01,lo+.17));
    svg.innerHTML=s;setSt(ph);
    const RD=[`<span>family shown: <b>${[u>.15,u>.45,u>.7].filter(Boolean).length} diagnosed</b>, ${u>.85?1:0} with traits</span><span>sibling HR <b>8.27</b></span>`,
      `<span>MZ co-twin HR <b>70.45</b></span><span>DZ <b>8.44</b></span><span>twin h² <b>74%</b></span>`,
      `<span>loci <b>12 → 27</b></span><span>index OR <b>1.08–1.20</b></span><span>SNP h² <b>≈0.22</b></span>`,
      `<span>PGS OR <b>1.56 / SD</b></span><span>variance <b>4–5.5%</b></span>`,
      `<span>lens <b>${gv}</b></span><span>rare burden h² <b>2.5%</b></span><span>common <b>14–22%</b></span>`][ph];
    $('#geRead').innerHTML=RD;
    $('#geNote').innerHTML=noteHTML(GE_STEPS[ph]);
  }
  const stop=playWire(rg,$('#gePlay'),draw,22000,'Replay','genes');
  setSt=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);
  $$('[data-gv]').forEach(b=>b.addEventListener('click',()=>{gv=b.dataset.gv;$$('[data-gv]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const t=+rg.value;if(gv==='rare'&&t<.8){stop();rg.value=.97}else if(gv==='common'&&t<.4){stop();rg.value=.57}draw(+rg.value)}));
  draw(+rg.value);

  /* ---- family-risk comparator ---- */
  const isv=$('#geIcons'),P0=31865/1656943;
  const REL={
   mz:{n:'Identical twin',hr:70.45,txt:`The co-twin of an identical twin with ADHD had a hazard ratio of 70.45. Identical twins share all their DNA, so this is the strongest familial signal in the register. Converted with the cohort's diagnosis rate, that is roughly three in four, but the conversion stretches the maths at such a large ratio: read it as "most". [[Chen2017JCPP]]`},
   dz:{n:'Non-identical twin',hr:8.44,txt:`A non-identical twin shares about half of their DNA, like any brother or sister, and the hazard ratio (8.44) is almost the same as for a full sibling (8.27). Sharing a womb and a birthday adds little. [[Chen2017JCPP]]`},
   sib:{n:'Full sibling',hr:8.27,txt:`A full sibling of a person with ADHD had a hazard ratio of 8.27. When the person with ADHD was diagnosed at 18 or older, the sibling's ratio was higher (11.49) than when the diagnosis was only before 18 (4.68): ADHD that persists marks a stronger family load. [[Chen2017JCPP]]`},
   mhs:{n:'Half-sibling, same mother',hr:2.86,txt:`Half-siblings share about a quarter of their DNA. Those with the same mother (HR 2.86) had a significantly higher ratio than those with the same father (2.31). The authors read this as a small contribution from shared environment, such as the home or the pregnancy, on top of genes. [[Chen2017JCPP]]`},
   phs:{n:'Half-sibling, same father',hr:2.31,txt:`Paternal half-siblings often grow up in different homes and share about a quarter of their DNA: HR 2.31. The step down from full siblings (8.27) to half-siblings tracks genetic relatedness. [[Chen2017JCPP]]`},
   cous:{n:'Cousin',hr:2.24,txt:`Full cousins share about an eighth of their DNA: HR 2.24; half cousins 1.47. Risk falls with each step of relatedness, as expected for a strongly genetic, polygenic trait. [[Chen2017JCPP]]`},
   par:{n:'Parent',hr:null,txt:`Studies of children of parents with ADHD are small. Of 84 children of referred adults with childhood-onset ADHD, 48 (57%) met criteria, and 75% of those had been treated. A systematic review of 4 offspring studies found ADHD in 9.3% to 57% of these "high-risk" children, against 2–20% of comparison children. Rose figures show the lower end (9 in 100); amber figures run to the upper end (57). [[Biederman1995,Uchida2021]]`},
   none:{n:'No relative with ADHD',hr:1,txt:`In the Swedish cohort, 31,865 of 1,656,943 people (about 2 in 100) had an ADHD diagnosis by the end of follow-up. Most people with ADHD have no diagnosed relative: family history raises the odds but its absence does not rule ADHD out. [[Chen2017JCPP]]`}
  };
  let rel='sib',shown=null,stopA=null;
  const nOf=k=>k==='par'?{a:9,b:57}:{a:Math.round(100*(1-Math.pow(1-P0,REL[k].hr))),b:0};
  function drawI(fr){const N=vb(isv,'720 300','400 640'),R=REL[rel],cur=fr||nOf(rel);let s='';
    const cell=N?34:26,ox=N?30:24,oy=N?44:36;
    s+=`<text x="${ox-8}" y="${oy-16}" class="t-sm" style="fill:var(--dz)">${N?'100 PEOPLE WITH THIS RELATIVE':'OUT OF 100 PEOPLE WITH THIS RELATIVE'}</text>`;
    for(let i=0;i<100;i++){const x=ox+(i%10)*cell,y=oy+Math.floor(i/10)*cell,c=i<cur.a?'var(--dz)':i<cur.b?'var(--da)':'var(--line)';s+=person(x,y,cell*.8,c)}
    const cnt=rel==='par'?'9–57':String(cur.a);
    const ly=oy+10*cell+12;
    s+=`<text x="${ox-8}" y="${ly+8}" class="t-big" style="fill:var(--dz)">${cnt}</text><text x="${ox+(rel==='par'?42:30)}" y="${ly+8}" class="t-xs" style="fill:var(--ink)">${rel==='par'?'published range, offspring studies':'modelled from the hazard ratio'}</text>`;
    /* ladder */
    const L=N?{x0:40,x1:370,y0:ly+64}:{x0:330,x1:690,y0:60};
    const X=v=>lerp(L.x0,L.x1,Math.log(v)/Math.log(100));
    s+=`<text x="${L.x0-10}" y="${L.y0-24}" class="t-sm">HAZARD RATIO, LOG SCALE</text>`;
    [1,2,5,10,20,50,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-10}" y2="${L.y0+(N?150:208)}" class="grid"/><text x="${f1(X(v))}" y="${L.y0+(N?164:222)}" class="t-xs t-mid">${v}</text>`});
    const rows=[ ['mz','identical twin',70.45],['dz','non-identical twin',8.44],['sib','full sibling',8.27],['mhs','half-sib, mother',2.86],['phs','half-sib, father',2.31],['cous','cousin',2.24],['hc','half cousin',1.47] ];
    const gap=N?21:29;
    rows.forEach(([k,l,v],i)=>{const y=L.y0+i*gap,on=k===rel;
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(v))}" y1="${y}" y2="${y}" style="stroke:${on?'var(--dz)':'var(--muted)'};stroke-width:${on?8:4};stroke-linecap:round;opacity:${on?1:.4}"/>`;
      const tx=X(v)+8,right=tx>L.x1-70;
      s+=`<text x="${f1(right?X(v)-8:tx)}" y="${y+4}" class="t-xs${right?' t-end':''}" style="fill:${on?'var(--ink)':'var(--muted)'};${on?'font-weight:700':''}">${l} ${v}</text>`});
    isv.innerHTML=s;
    $('#geIconCap').innerHTML=rel==='par'?`Offspring studies report percentages directly; there is no register hazard ratio for parents in this source. [[Biederman1995,Uchida2021]]`:`Figures: 100 × (1 − (1 − 0.019)<sup>HR</sup>), using the cohort's overall rate (31,865 of 1,656,943 diagnosed) as the baseline and assuming proportional hazards. An illustration of scale, not a published percentage and not anyone's personal risk. [[Chen2017JCPP]]`;
    $('#geRelNote').innerHTML=noteHTML({k:'Family history',t:R.n+(R.hr&&R.hr!==1?` · HR ${R.hr}`:''),txt:R.txt,
      pt:`A relative with ADHD makes ADHD more likely, not certain. Many people with a diagnosed relative never have ADHD.`,
      hook:`Recurrence falls with relatedness: MZ 70.45 → DZ 8.44 ≈ sibling 8.27 → half-sibling 2.3–2.9 → cousin 2.24. [[Chen2017JCPP]]`})}
  $$('[data-rel]').forEach(b=>b.addEventListener('click',()=>{const from=shown||nOf(rel);rel=b.dataset.rel;$$('[data-rel]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const to=nOf(rel);if(stopA)stopA();stopA=animate(500,p=>{const fr={a:Math.round(lerp(from.a,to.a,ease(p))),b:Math.round(lerp(from.b,to.b,ease(p)))};shown=fr;drawI(fr)},()=>{shown=to;stopA=null})}));
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawI(shown)};
  drawI();shown=nOf(rel);
};
