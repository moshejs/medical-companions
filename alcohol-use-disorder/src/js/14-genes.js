/* =============== 1.4 Genes, family & risk =============== */
const GE_STEPS=[
 {from:0,at:.04,k:'Everyone',t:'Starting point: how common AUD is',
  txt:`Before family or genes, the baseline. In NESARC-III, a face-to-face survey of 36,309 US adults, 29.1% met DSM-5 criteria for alcohol use disorder at some point in life and 13.9% in the past 12 months. Mean age at onset was 26.2 years. [[Grant2015NESARC]] These are population statistics, not anyone's personal odds.`,
  pt:`Alcohol use disorder is common. Nearly 3 in 10 US adults have met the criteria at some point.`,
  hook:`NESARC-III (DSM-5): lifetime AUD 29.1%, 12-month 13.9%. [[Grant2015NESARC]]`},
 {from:.14,at:.2,k:'A family',t:'It runs in families: nature and nurture',
  txt:`In a Swedish national study of 18,115 adoptees, AUD was predicted by AUD in biological parents (OR 1.46) and biological siblings (OR 1.94), who share genes, but also by AUD in adoptive parents (OR 1.40), who share only the home. Genetic and environmental risk added up. [[Kendler2015Adoption]] Genetic risk reflects both a specific liability to AUD and a wider liability to externalising disorders: hence the half-shaded uncle. [[Kendler2015Adoption]]`,
  pt:`Children of parents with AUD are at higher risk, partly through genes and partly through the home they grow up in. Higher risk is not certainty.`,
  hook:`Adoption design separates genes (biological relatives) from rearing (adoptive relatives): both raise risk. [[Kendler2015Adoption]]`},
 {from:.28,at:.34,k:'Twins and adoptees',t:'About half of the risk is heritable',
  txt:`A meta-analysis of 12 twin and 5 adoption studies put the heritability of AUD at 0.49 (95% CI 0.43–0.53) and the shared environment at 0.10, with no difference by sex, design or assessment method. <span class="ev est">Established</span> [[Verhulst2015]] The remaining share (here 41%, by subtraction) is environment unique to each person. Heritability describes variation in a population; it does not say what share of one person's disorder is "genetic".`,
  pt:`Genes explain about half of why some people develop AUD and others do not. The other half is life: experiences, surroundings and choices.`,
  hook:`AUD heritability ≈ <b>0.49</b>; shared environment ≈ 0.10 (Verhulst 2015 meta-analysis). [[Verhulst2015]]`},
 {from:.44,at:.55,k:'Two famous variants',t:'When acetaldehyde builds up',
  txt:`ALDH2*2 is a dominant-negative variant: heterozygotes keep more than 100-fold less ALDH2 activity, so acetaldehyde piles up (5- to 20-fold higher in blood) and causes flushing, nausea and a fast heart rate. [[Brooks2009,Cederbaum2012]] About 36% of East Asians flush. [[Brooks2009]] ADH1B*2 makes acetaldehyde faster. One copy of either protected against alcohol dependence in Asian samples, independently of the other. [[Edenberg2007,Luczak2006]] But heterozygotes who drink anyway have higher oesophageal cancer risk (OR 3.19), while homozygotes, who drink very little, have lower risk (OR 0.36): evidence that acetaldehyde is a carcinogen. [[Lewis2005]]`,
  pt:`Some people's bodies clear acetaldehyde slowly. Drinking makes them flush and feel ill, which tends to protect them from AUD, but if they keep drinking their cancer risk rises.`,
  hook:`ALDH2*2 heterozygote + drinking → flush and <b>~3× oesophageal cancer</b> (OR 3.19). Same mechanism as disulfiram. [[Lewis2005,Cederbaum2012]]`},
 {from:.64,at:.79,k:'Genome-wide association studies',t:'Bigger studies, more signals',
  txt:`Scanning the whole genome in very large samples finds many variants of tiny effect. 2019: 274,424 people in the Million Veteran Program, 18 loci. [[Kranzler2019]] 2020: 435,563 people of European ancestry, 29 risk variants (19 new). [[Zhou2020NatNeurosci]] 2023: 1,079,947 people across five ancestry groups, 110 variants. [[Zhou2023NatMed]] ADH1B stands out in every scan. [[Walters2018]] Drag through the step to watch the count grow.`,
  pt:`There is no single "alcohol gene". Hundreds of small genetic differences each nudge risk a tiny amount.`,
  hook:`GWAS loci: 18 (2019, n≈274k) → 29 (2020, n≈436k) → 110 (2023, n≈1.08 million). [[Kranzler2019,Zhou2020NatNeurosci,Zhou2023NatMed]]`},
 {from:.86,at:.94,k:'The gap',t:'Missing heritability, and why a gene test cannot diagnose',
  txt:`Twin heritability (about 49%) is far higher than SNP heritability from common variants (6.8%), the "missing heritability" gap. [[Verhulst2015,Zhou2020NatNeurosci]] Polygenic scores explained about 2.5–3.5% of the variance in AUD and added only slightly beyond age, sex and ancestry. <span class="ev est">Established</span> [[Barr2020]] They are research tools, not diagnostic or screening tests.`,
  pt:`A genetic risk score cannot tell you whether you have, or will get, alcohol use disorder. Risk is not destiny.`,
  hook:`Polygenic scores: ~2.5–3.5% of AUD variance, "modest, at best". [[Barr2020]]`}
];
const GE_STUDY=[{y:2019,n:'274,424',h:18,a:.64},{y:2020,n:'435,563',h:29,a:.705},{y:2023,n:'1,079,947',h:110,a:.765}];
function geFace(x,y,r,fl){return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.4"/>`+
  `<circle cx="${f1(x-r*.35)}" cy="${f1(y-r*.15)}" r="${f1(r*.08)}" style="fill:var(--ink)"/><circle cx="${f1(x+r*.35)}" cy="${f1(y-r*.15)}" r="${f1(r*.08)}" style="fill:var(--ink)"/>`+
  `<path d="M${f1(x-r*.3)} ${f1(y+r*.38)}q${f1(r*.3)} ${f1(fl>.5?-r*.08:r*.12)} ${f1(r*.6)} 0" style="fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linecap:round"/>`+
  `<circle cx="${f1(x-r*.55)}" cy="${f1(y+r*.15)}" r="${f1(r*.26)}" style="fill:var(--glu-fill);opacity:${f1(fl*.85)}"/><circle cx="${f1(x+r*.55)}" cy="${f1(y+r*.15)}" r="${f1(r*.26)}" style="fill:var(--glu-fill);opacity:${f1(fl*.85)}"/>`}
const GE_F={fam:{s:.4,n:'family history',txt:'Adoptees with an affected biological parent had an OR of 1.46, a biological sibling 1.94, an adoptive parent 1.40. [[Kendler2015Adoption]]'},
 early:{s:.3,n:'first drink before 14',txt:'Starting before 14 vs at 21 or older: HR 1.78 for lifetime dependence, adjusted for family history [[Hingson2006]]; lifetime dependence fell from more than 40% with onset at 14 or younger to about 10% at 20 or older. [[GrantDawson1997]] These links may partly reflect shared genetic or family risk rather than a pure cause.'},
 stress:{s:.2,n:'stress and trauma',txt:'In US veterans with lifetime PTSD the adjusted OR for AUD was 2.1 [[Smith2016PTSD]], but in the general NESARC-III sample 12-month AUD was not associated with 12-month PTSD after adjustment. [[Grant2015NESARC]] In animals, stress systems (CRF) drive dependence-related drinking. [[HeiligKoob2007]]'},
 price:{s:.3,n:'cheap, available alcohol',txt:'Across 112 studies, higher prices went with less drinking (elasticities −0.46 beer, −0.69 wine, −0.80 spirits) and less heavy drinking [[Wagenaar2009]]; doubling alcohol tax was estimated to cut alcohol-related deaths by 35%. [[Wagenaar2010]] Restricting outlet density and hours of sale prevents harm. [[Popova2009]]'},
 flush:{s:-.55,n:'ALDH2*2 or ADH1B*2',txt:'One ALDH2*2 or one ADH1B*2 allele each protected against alcohol dependence in Asian samples; a second copy added no significant protection. [[Luczak2006]] The protection depends on the setting: it weakened in Japan as drinking rose. [[Brooks2009]]'}};

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT');let setSt=()=>{};
  /* Manhattan points, fixed */
  const R=rng(2024),BG=[],HIT=[];
  for(let c=0;c<22;c++)for(let i=0;i<40;i++)BG.push([c,(i+R())/40,Math.min(6.5,-Math.log(1-R()*.999)*1.25)]);
  HIT.push([3,.42,17]);/* ADH1B on chromosome 4 */
  for(let i=1;i<110;i++)HIT.push([Math.floor(R()*22),.05+R()*.9,7.6+R()*4.5*(R()<.3?1.6:1)]);
  function hits(t){if(t<GE_STUDY[0].a)return 0;if(t<GE_STUDY[1].a)return 18;if(t<GE_STUDY[2].a)return 29;return Math.round(lerp(29,110,ramp(t,GE_STUDY[2].a,.84)))}
  function draw(t){
    const N=vb(svg,'720 390','400 580');let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    if(t<.42){
      /* ---- pedigree ---- */
      const dx=N?-20:0,P=(x,y)=>[x+dx,N?y*.86+6:y];const a2=ramp(t,.12,.18);
      const M=[[110,70,'m',1],[170,70,'f',0],[250,70,'m',0],[310,70,'f',0],[80,170,'m',.5],[150,170,'m',1],[250,170,'f',0],[320,170,'f',0],[175,270,'m',0],[230,270,'f',0]];
      const ln=(a,b,c,d)=>{const p=P(a,b),q=P(c,d);return `<line x1="${p[0]}" y1="${f1(p[1])}" x2="${q[0]}" y2="${f1(q[1])}" style="stroke:var(--ink);stroke-width:1.4"/>`};
      s+=ln(121,70,159,70)+ln(261,70,299,70)+ln(140,70,140,120)+ln(80,120,150,120)+ln(80,120,80,159)+ln(150,120,150,159)+ln(280,70,280,120)+ln(250,120,320,120)+ln(250,120,250,159)+ln(320,120,320,159)+ln(161,170,239,170)+ln(200,170,200,225)+ln(175,225,230,225)+ln(175,225,175,259)+ln(230,225,230,259);
      M.forEach(([x,y,sx,af],i)=>{const p=P(x,y);s+=ped(p[0],p[1],sx,af*a2,{r:12,proband:i===8})});
      const pp=P(175,270);s+=`<text x="${pp[0]}" y="${f1(pp[1]+30)}" class="t-xs t-mid">you?</text>`;
      ['I','II','III'].forEach((g,i)=>{const p=P(40,70+i*100);s+=`<text x="${p[0]}" y="${f1(p[1]+4)}" class="t-sm">${g}</text>`});
      const lg=P(40,330);s+=`<rect x="${lg[0]}" y="${f1(lg[1]-9)}" width="11" height="11" style="fill:var(--brand);stroke:var(--ink)"/><text x="${lg[0]+16}" y="${f1(lg[1])}" class="t-xs">AUD</text><rect x="${lg[0]+52}" y="${f1(lg[1]-9)}" width="11" height="11" style="fill:var(--panel);stroke:var(--ink)"/><rect x="${lg[0]+52}" y="${f1(lg[1]-9)}" width="5.5" height="11" style="fill:var(--ember)"/><text x="${lg[0]+68}" y="${f1(lg[1])}" class="t-xs">other substance use disorder</text>`;
      /* ---- bars ---- */
      const bx=N?30:400,bw=N?340:290;let y=N?330:44;
      const hb=(y,lab,v,col,txt)=>`<text x="${bx}" y="${y}" class="t-xs">${lab}</text><rect x="${bx}" y="${y+5}" width="${bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+5}" width="${f1(bw*v)}" height="14" rx="4" style="fill:${col}"/><text x="${f1(bx+bw*v+5)}" y="${y+16}" class="t-sm" style="fill:var(--ink)">${txt}</text>`;
      s+=`<text x="${bx}" y="${y-12}" class="t-sm" style="fill:var(--brand)">US ADULTS WITH AUD (NESARC-III)</text>`;
      s+=hb(y+4,'lifetime',.291,'var(--brand)','29.1%')+hb(y+36,'past 12 months',.139,'var(--brand)','13.9%');
      y+=N?90:104;
      if(t>=.12){const g=ramp(t,.12,.2),X=v=>bx+bw*v/2.5;s+=`<text x="${bx}" y="${y-8}" class="t-sm" style="fill:var(--ember)">ADOPTEES: ODDS RATIO FOR AUD</text>`;
        [['biological parent',1.46],['biological sibling',1.94],['adoptive parent',1.40]].forEach(([l,v],i)=>{const yy=y+6+i*(N?22:26);s+=`<text x="${bx}" y="${yy+10}" class="t-xs">${l}</text><rect x="${f1(X(0)+(N?110:120))}" y="${yy}" width="${f1((X(v)-X(0))*(N?.65:.6)*g)}" height="12" rx="3" style="fill:${i===2?'var(--thi-fill)':'var(--ember)'}"/><text x="${f1(X(0)+(N?110:120)+(X(v)-X(0))*(N?.65:.6)*g+5)}" y="${yy+10}" class="t-sm" style="fill:var(--ink)">${g>.95?v.toFixed(2):''}</text>`});
        const x1=X(0)+(N?110:120)+(X(1)-X(0))*(N?.65:.6);s+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${y}" y2="${y+(N?70:82)}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(x1)}" y="${y+(N?80:94)}" class="t-xs t-mid">OR 1 = no difference</text>`}
      y+=N?100:126;
      if(t>=.26){const g=ramp(t,.26,.33),parts=[[.49,'var(--brand)','genes 49%'],[.10,'var(--thi-fill)','shared env. 10%'],[.41,'var(--panel-2)','unique env. (rest)']];let x=bx;
        s+=`<text x="${bx}" y="${y-8}" class="t-sm" style="fill:var(--brand)">SOURCES OF VARIATION IN RISK</text>`;
        parts.forEach(([v,c,l],i)=>{const w=bw*v*g;s+=`<rect x="${f1(x)}" y="${y}" width="${f1(Math.max(0,w-2))}" height="22" rx="4" style="fill:${c};stroke:var(--line)"/>`;if(g>.9)s+=`<text x="${f1(x+3)}" y="${y+36+(i===1?12:0)}" class="t-xs" style="fill:var(--ink)">${l}</text>`;x+=w})}
    }else if(t<.62){
      /* ---- acetaldehyde pools ---- */
      const u=ramp(t,.42,.6),eth=lerp(.85,.25,u);
      const rows=[{n:'ALDH2 *1/*1 · fully active',ac:.12+.1*bump(u,0,.6),ace:lerp(.1,.75,u),bl:0},{n:'ALDH2 *1/*2 · slow (dominant negative)',ac:lerp(.1,1,ramp(u,0,.7)),ace:lerp(.05,.25,u),bl:.9}];
      rows.forEach((r,i)=>{const y=N?40+i*190:40+i*150,x=N?14:40,w=N?280:430;
        s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:${i?'var(--glu)':'var(--gaba)'}">${r.n}</text>`;
        s+=pathway(x,y+8,w,{eth,acet:r.ac,ace:r.ace,block:r.bl}).svg;
        const fx=N?352:540,fy=y+34;s+=geFace(fx,fy,N?24:30,i?clamp(r.ac*1.1):0)+`<text x="${fx}" y="${fy+(N?40:48)}" class="t-xs t-mid">${i?(r.ac>.5?(N?'flushing':'flushing, nausea, fast heart'):'…'):'no flush'}</text>`});
      if(!N)s+=`<text x="${640}" y="${200}" class="t-sm t-mid" style="fill:var(--glu)">blood</text><text x="640" y="216" class="t-sm t-mid" style="fill:var(--glu)">acetaldehyde</text><text x="640" y="238" class="t-big t-mid" style="fill:var(--glu)">5–20×</text>`;
      const L=['About 36% of East Asians flush after drinking; ≥540 million people (≈8%) are ALDH2-deficient.','Oesophageal cancer vs *1/*1: OR 3.19 for *1/*2 (who can drink), 0.36 for *2/*2 (who rarely drink).'];
      const ly=N?440:338;
      if(N){const W=['About 36% of East Asians flush after','drinking; ≥540 million people (≈8%)','are ALDH2-deficient. Blood acetaldehyde','5–20× higher in carriers.','Oesophageal cancer vs *1/*1:','OR 3.19 for *1/*2 (can still drink)','OR 0.36 for *2/*2 (rarely drink)'];W.forEach((l,i)=>s+=`<text x="14" y="${ly+i*18}" class="t-sm" style="fill:${i>3?'var(--glu)':'var(--ink)'}">${l}</text>`)}
      else L.forEach((l,i)=>s+=`<text x="40" y="${ly+i*20}" class="t-sm" style="fill:${i?'var(--glu)':'var(--ink)'}">${l}</text>`);
    }else{
      /* ---- Manhattan sketch ---- */
      const x0=N?36:56,x1=N?388:704,y0=N?40:34,y1=N?300:230,ymax=18,X=(c,p)=>lerp(x0,x1,(c+p)/22),Y=v=>lerp(y1,y0,Math.min(v,ymax)/ymax),n=hits(t);
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/>`;
      BG.forEach(([c,p,v])=>s+=`<circle cx="${f1(X(c,p))}" cy="${f1(Y(v))}" r="1.6" style="fill:${c%2?'var(--gaba-fill)':'var(--brain-line)'};opacity:.6"/>`);
      HIT.slice(0,n).forEach(([c,p,v],i)=>{for(let k=0;k<5;k++){const vv=v*(1-k*.18);s+=`<circle cx="${f1(X(c,p)+(k%2?1.5:-1.5)*k*.4)}" cy="${f1(Y(vv))}" r="${i?2.2:2.6}" style="fill:${i?'var(--ember)':'var(--glu)'}"/>`}});
      if(n){const [c,p,v]=HIT[0];s+=`<text x="${f1(X(c,p)+6)}" y="${f1(Y(v)+4)}" class="t-lbl" style="fill:var(--glu)">ADH1B</text>`}
      const th=Y(7.3);s+=`<line x1="${x0}" x2="${x1}" y1="${f1(th)}" y2="${f1(th)}" style="stroke:var(--bad);stroke-dasharray:5 4"/><rect x="${x0+2}" y="${f1(th-14)}" width="112" height="12" rx="3" style="fill:var(--panel);opacity:.85"/><text x="${x0+4}" y="${f1(th-4)}" class="t-xs" style="fill:var(--bad)">genome-wide significance</text>`;
      for(let c=0;c<22;c+=N?3:1)s+=`<text x="${f1(X(c,.5))}" y="${y1+12}" class="t-xs t-mid">${c+1}</text>`;
      s+=`<text x="${x1}" y="${y1+25}" class="t-xs t-end">chromosome</text><text x="${x0-6}" y="${y0-8}" class="t-xs">−log10 p (sketch)</text>`;
      s+=`<text x="${x1}" y="${y0-8}" class="t-big t-end" style="fill:var(--ember)">${n} ${n===18?'loci':'variants'}</text>`;
      const by=N?350:272;
      if(t<.85){GE_STUDY.forEach((S,i)=>{const on=t>=S.a&&(i===2||t<GE_STUDY[i+1].a),w=N?112:200,bx=(N?14:56)+i*(w+(N?10:24));
          s+=`<rect x="${bx}" y="${by}" width="${w}" height="${N?78:70}" rx="10" style="fill:${on?'var(--brand-soft)':'var(--panel-2)'};stroke:${on?'var(--brand)':'var(--line)'}"/><text x="${bx+10}" y="${by+22}" class="t-lbl">${S.y}</text><text x="${bx+10}" y="${by+40}" class="t-xs">n = ${S.n}</text><text x="${bx+10}" y="${by+58}" class="t-sm" style="fill:var(--ember)">${S.h} ${i?'variants':'loci'}</text>`})}
      else{const g=ramp(t,.85,.92),bw=N?250:420,bx=N?120:250;[['twin/adoption heritability',.49,'49%','var(--brand)'],['SNP heritability (GWAS)',.068,'6.8%','var(--gaba-fill)'],['polygenic score: variance explained',.03,'2.5–3.5%','var(--ember)']].forEach(([l,v,txt,c],i)=>{const yy=by+i*(N?44:34);
          s+=`<text x="${N?14:56}" y="${yy+(N?0:12)}" class="t-xs">${l}</text><rect x="${bx}" y="${yy+(N?6:2)}" width="${f1(bw*v*g/.49*.8)}" height="14" rx="4" style="fill:${c}"/><text x="${f1(bx+bw*v*g/.49*.8+6)}" y="${yy+(N?17:13)}" class="t-sm" style="fill:var(--ink)">${txt}</text>`})}
    }
    svg.innerHTML=s;
    const ph=phaseOf(GE_STEPS,t);setSt(ph);$('#geNote').innerHTML=noteHTML(GE_STEPS[ph]);
  }
  const stop=playWire(rg,$('#gePlay'),draw,30000,'Replay','genes');
  setSt=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- liability threshold ---- */
  const ls=$('#geLiab'),on={};
  const pdf=z=>Math.exp(-z*z/2);
  function liab(){const N=vb(ls,'720 260','400 300'),m=Object.keys(on).filter(k=>on[k]).reduce((a,k)=>a+GE_F[k].s,0);
    const x0=N?20:40,x1=N?380:680,yb=N?230:200,hh=N?160:150,Z0=-4,Z1=4.5,X=z=>lerp(x0,x1,(z-Z0)/(Z1-Z0)),TH=1.8;
    let s=`<line x1="${x0}" x2="${x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    const path=(mu,a,b)=>{let d='';for(let i=0;i<=120;i++){const z=lerp(a,b,i/120);d+=(i?'L':'M')+f1(X(z))+' '+f1(yb-hh*pdf(z-mu))}return d};
    s+=`<path d="${path(0,Z0,Z1)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4"/>`;
    s+=`<path d="${path(m,TH,Z1)}L${f1(X(Z1))} ${yb}L${f1(X(TH))} ${yb}Z" style="fill:var(--ember);opacity:.55"/>`;
    s+=`<path d="${path(m,Z0,Z1)}" style="fill:none;stroke:var(--brand);stroke-width:2.6"/>`;
    s+=`<line x1="${f1(X(TH))}" x2="${f1(X(TH))}" y1="${yb-hh-10}" y2="${yb}" style="stroke:var(--bad);stroke-width:2"/><text x="${f1(X(TH)+6)}" y="${yb-hh-2}" class="t-xs" style="fill:var(--bad)">threshold</text>`;
    s+=`<text x="${f1(X(TH)+8)}" y="${yb-12}" class="t-xs" style="fill:var(--ink)">above the threshold</text>`;
    s+=`<text x="${x0}" y="${yb+18}" class="t-xs">lower liability</text><text x="${x1}" y="${yb+18}" class="t-xs t-end">higher liability</text>`;
    s+=`<text x="${x0}" y="${N?22:20}" class="t-xs">dashed: no influences switched on · solid: with the switches below</text>`;
    ls.innerHTML=s;
    const act=Object.keys(on).filter(k=>on[k]);
    $('#geLiabNote').innerHTML=noteHTML({k:act.length?act.length+' influence'+(act.length>1?'s':'')+' on':'Nothing switched on',
      t:m>.05?'The curve moves towards the threshold':m<-.05?'The curve moves away from the threshold':'The starting curve',
      txt:(act.length?act.map(k=>`<b>${GE_F[k].n}:</b> ${GE_F[k].txt}`).join(' '):'Switch on an influence to see it shift the curve.')+' The size of each shift here is drawn, not measured.',
      pt:`Genes and life add together. None of these makes alcohol use disorder certain, and none makes anyone immune.`,
      hook:`Liability-threshold model: many small genetic and environmental influences sum; the disorder appears past a threshold. Genetic and environmental risk act additively. [[Kendler2015Adoption]]`});
  }
  $$('[data-gef]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.gef;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);liab()}));
  liab();
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();liab()};
};
