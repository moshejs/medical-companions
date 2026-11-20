/* =============== 1.3 Causes: genes & environment =============== */
/* The main player stacks influences on body weight as layers: four genetic layers (heritability, common variants,
   polygenic score, single genes), then four environmental ones (food, sleep, medicines, social context), then shows
   them acting together. Every number drawn is a published population figure from research pass B; anything that is
   only a shape (the middle polygenic deciles, the line joining published weight points) is drawn dashed or pale and
   named as schematic in the caption. */
const CA_STEPS=[
 {from:0,at:.13,k:'Genes · families, adoptees and twins',t:'Heritability',
  txt:'In 540 Danish adoptees, adult weight class tracked the BMI of their biological parents, not their adoptive parents. [[Stunkard1986]] Identical twins reared apart had BMI correlations of 0.70 (men) and 0.66 (women). [[Stunkard1990]] Across 88 twin estimates (140,525 twins), BMI heritability ranged from 0.47 to 0.90, median 0.75; family studies gave lower figures, median 0.46. [[Elks2012]] In 87,782 twin pairs, the genetic share was lowest at age 4 (0.42 in boys) and rose to 0.75 by age 19. [[Silventoinen2016]]',
  pt:'Body size runs in families mostly because of shared genes, not shared kitchens. Heritability describes differences between people in one setting; it does not mean weight is fixed. [[Stunkard1986,Elks2012]]',
  hook:'Twin heritability of BMI 0.47–0.90 (median 0.75); family studies lower (median 0.46). Adoptees resemble their biological, not adoptive, parents. [[Elks2012,Stunkard1986]]'},
 {from:.17,at:.3,k:'Genes · common variants',t:'FTO and many small nudges',
  txt:'FTO was the first common obesity variant, replicated in 13 cohorts (38,759 people): the 16% of adults with two risk copies weighed about 3 kg more and had 1.67-fold odds of obesity. [[Frayling2007]] By 2015, 97 genome regions explained about 2.7% of BMI variation, and all common variants together were estimated at more than 20%. [[Locke2015]] By 2018, 941 variants explained about 6.0%. [[Yengo2018]] The pathways point strongly to the brain. [[Locke2015]]',
  pt:'Hundreds of small gene differences each nudge weight a little. Added together, they can make a big difference. [[Locke2015,Khera2019]]',
  hook:'FTO: two risk copies, about +3 kg and OR 1.67 for obesity. 97 loci explain about 2.7% of BMI variance; all common variants more than 20%. [[Frayling2007,Locke2015]]'},
 {from:.34,at:.47,k:'Genes · adding them up',t:'Polygenic scores',
  txt:'A score built from 2.1 million variants was tested in 288,016 UK Biobank adults (mean age 57). The top decile weighed 13.0 kg more than the bottom decile (85.3 vs 72.2 kg). Severe obesity (BMI 40 or more) affected 5.6% vs 0.2%, a 25-fold gradient; obesity affected 43.2% vs 9.5%. In a birth cohort the gap was only 0.06 kg at birth, 3.5 kg at age 8 and 12.3 kg at age 18. [[Khera2019]]',
  pt:'Many small gene effects add up. The gap between people with high and low scores is almost nothing at birth and grows through childhood, in the world a child grows up in. Even in the top decile, 43.2% had obesity, so most did not. [[Khera2019]]',
  hook:'Top vs bottom polygenic decile: 13 kg heavier, a 25-fold gradient for severe obesity, only 0.06 kg apart at birth. [[Khera2019]]'},
 {from:.5,at:.63,k:'Genes · rare and powerful',t:'Single-gene causes',
  txt:'Rare single-gene changes break the leptin–melanocortin pathway. Congenital leptin deficiency gives very low leptin despite high fat mass; [[Montague1997]] daily leptin injections brought sustained improvements in appetite and fat mass. [[Farooqi2002Leptin]] Loss of the leptin receptor adds absent puberty and low growth hormone and thyrotropin; [[Clement1998]] POMC loss gives early obesity, adrenal insufficiency and red hair; [[Krude1998]] PC1 (PCSK1) loss impairs prohormone processing. [[Jackson1997]] MC4R mutations were found in 29 of 500 people with severe childhood obesity (5.8%). [[Farooqi2003MC4R]]',
  pt:'A few children have one powerful gene change, such as in MC4R or leptin, that makes them feel hungry all the time. A genetic test can find this. [[Farooqi2003MC4R,Montague1997]]',
  hook:'MC4R deficiency is the commonest monogenic obesity: codominant, with hyperphagia, faster growth and severe hyperinsulinaemia. POMC triad: early obesity, adrenal insufficiency, red hair. [[Farooqi2003MC4R,Krude1998]]'},
 {from:.67,at:.8,k:'Environment',t:'The world around us',
  txt:'In a 4-week inpatient crossover trial, 20 adults ate 508 kcal a day more on an ultra-processed diet than on an unprocessed one. [[Hall2019UPF]] Short sleep was linked to obesity in children (OR 1.89) and adults (OR 1.55), mostly in cross-sectional studies. [[Cappuccio2008]] In 257 trials, weight gain compared with placebo averaged 2.4 kg for olanzapine, 2.2 kg for gabapentin, 1.8 kg for amitriptyline and 1.5 kg for mirtazapine. [[Domecq2015]] A person\'s chance of developing obesity rose 57% if a friend did, 40% for a sibling and 37% for a spouse, with no effect among neighbours (observational). [[Christakis2007]]',
  pt:'The world around us shapes weight: what food is easy to get, how much we sleep, the medicines we need, and the people around us. [[Hall2019UPF,Cappuccio2008,Domecq2015,Christakis2007]]',
  hook:'Ultra-processed vs unprocessed diet: +508 kcal a day and +0.9 vs −0.9 kg in 2 weeks. Short sleep: OR 1.89 in children, 1.55 in adults. [[Hall2019UPF,Cappuccio2008]]'},
 {from:.84,at:.97,k:'Genes × environment',t:'Genes meet environment',
  txt:'Pima people in Mexico had type 2 diabetes at 6.9%, less than a fifth of the 38% among Pima people in Arizona, and much less obesity, despite considerable genetic similarity; physical activity was much higher in Mexico. [[Schulz2006]] Each FTO risk copy raised the odds of obesity 1.30-fold in inactive adults and 1.22-fold in active adults, about 27% less. [[Kilpelainen2011]] The FTO effect also changed for people born after 1942. [[Rosenquist2015]] A consensus statement says obesity results "primarily from a combination of genetic, epigenetic, and environmental factors", and that calling it a choice is a misconception. [[Rubino2020Stigma]]',
  pt:'Genes load the dice, but the environment rolls them. Obesity is not a choice or a lack of willpower. [[Schulz2006,Rubino2020Stigma]]',
  hook:'The FTO effect is about 27% smaller in physically active adults (per-allele OR 1.22 vs 1.30). [[Kilpelainen2011]]'}
];
/* the layers of the tower: g 1 = genes, 0 = environment; s = the step that adds it; e = the environment sub-step */
const CA_LAYERS=[
 {g:1,n:'Heritability',sn:'Heritability',v:'twins: 0.75',s:0},
 {g:1,n:'Common variants',sn:'Variants',v:'FTO: +3 kg',s:1},
 {g:1,n:'Polygenic score',sn:'Polygenic',v:'13 kg gap',s:2},
 {g:1,n:'Single genes',sn:'One gene',v:'MC4R: 5.8%',s:3},
 {g:0,n:'Food',sn:'Food',v:'+508 kcal/d',s:4,e:0},
 {g:0,n:'Sleep',sn:'Sleep',v:'OR 1.55',s:4,e:1},
 {g:0,n:'Medicines',sn:'Medicines',v:'e.g. +2.4 kg',s:4,e:2},
 {g:0,n:'Social context',sn:'Social',v:'friend +57%',s:4,e:3}
];

/* the Hall 2019 crossover: 20 adults, 14 days on each diet in random order [[Hall2019UPF]] */
const CA_UPF={extra:508,carb:280,fat:230,prot:-2,wUp:.9,wDown:-.9};
const CA_UPF_NOTES={
 start:{k:'Design',t:'Same people, both diets',
  txt:'20 weight-stable adults (mean BMI 27) lived on a metabolic ward for 4 weeks: 2 weeks on an ultra-processed diet and 2 weeks on an unprocessed diet, in random order. The meals offered were matched for calories, energy density, macronutrients, sugar, sodium and fibre, and people ate as much or as little as they wanted. [[Hall2019UPF]]',
  pt:'Each person was their own comparison. Only the type of food changed, not how much was offered.',
  hook:'A crossover trial: each participant receives both diets in random order, so they act as their own control.'},
 upf:{k:'Ultra-processed weeks',t:'About 500 kcal a day more, without trying',
  txt:'On the ultra-processed diet people ate 508 ± 106 kcal a day more. The extra came from carbohydrate (+280 kcal a day) and fat (+230 kcal a day), not protein (−2 kcal a day). They ate faster, by 17 kcal per minute, but their hunger and appetite ratings did not differ between the diets. [[Hall2019UPF]]',
  pt:'Highly processed foods make it easy to eat more without noticing. [[Hall2019UPF]]',
  hook:'Ultra-processed vs unprocessed: +508 kcal/day, from carbohydrate and fat, not protein. [[Hall2019UPF]]'},
 unp:{k:'Unprocessed weeks',t:'The reference diet',
  txt:'The unprocessed diet is the comparison, so its bars sit at zero: the trial reported the difference between the diets as a mean, not each person\'s daily intake. On this diet weight fell by 0.9 ± 0.3 kg over 2 weeks and body fat by 0.3 kg. [[Hall2019UPF]]',
  pt:'The same people, offered unprocessed food, ate less and lost a little weight, without being asked to.'},
 end:{k:'After 4 weeks',t:'What the trial showed, and its limits',
  txt:'Weight rose 0.9 kg on the ultra-processed diet and fell 0.9 kg on the unprocessed diet; body fat rose 0.4 kg and fell 0.3 kg. [[Hall2019UPF]] The trial was small (20 people), short (2 weeks per diet) and in hospital, and why ultra-processed food is overeaten (eating rate, energy density, taste or texture) is still unresolved. [[Hall2019UPF]]',
  pt:'It is one carefully controlled study. It shows that the food environment, not willpower alone, changes how much people eat.',
  hook:'Weight +0.9 kg vs −0.9 kg in 2 weeks; eating rate +17 kcal/min on ultra-processed food. [[Hall2019UPF]]'}
};

inits.causes=()=>{
  /* ---------- small helpers, scoped to this module ---------- */
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const wrap=(s,n)=>{const L=[];let c='';s.split(' ').forEach(w=>{if(c&&(c+' '+w).length>n){L.push(c);c=w}else c=c?c+' '+w:w});if(c)L.push(c);return L};
  const TL=(x,y,s,n,lh,cls,st)=>wrap(s,n).map((l,i)=>T(x,y+i*lh,l,cls,st)).join('');
  const box=(x,y,w,h,fill,stroke,rx=8,extra='')=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="fill:${fill};stroke:${stroke};stroke-width:1.2${extra}"/>`;
  /* horizontal bars, label above each bar: rows [{l,v,txt,col,dash}] */
  function hbars(x,y,w,rows,o){let s='';const rh=o.rh||34,vw=o.vw||92,bw=w-vw,mn=o.min||0;
    rows.forEach((r,i)=>{const ui=ease(ramp(o.u,i*.16,i*.16+.42)),yy=y+i*rh,v=clamp((r.v-mn)/(o.max-mn)),bx=x,col=r.col||o.col;
      s+=T(x,yy,r.l,'t-xs','fill:var(--ink);font-weight:600');
      s+=`<rect x="${f1(bx)}" y="${f1(yy+5)}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/>`;
      const L=Math.max(r.v>mn?2:0,bw*v*ui);
      s+=`<rect x="${f1(bx)}" y="${f1(yy+5)}" width="${f1(L)}" height="12" rx="3" style="fill:${r.dash?'none':col};stroke:${col};stroke-width:${r.dash?1.6:0}${r.dash?';stroke-dasharray:4 3':''}"/>`;
      if(ui>.5)s+=T(bx+L+6,yy+15,r.txt,'t-xs',`${INK};opacity:${f1(ramp(ui,.5,1))}`)});
    return s}

  /* ---------- the tower of layers ---------- */
  function tower(t,N){let s='';const p=phaseOf(CA_STEPS,t);
    const env=CA_STEPS[4];
    const appear=L=>L.s<4?ramp(t,CA_STEPS[L.s].from-.01,CA_STEPS[L.s].from+.05):ramp(t,env.from+L.e*.03,env.from+L.e*.03+.035);
    const together=ramp(t,.84,.9);
    if(N){
      /* two rows of chips: environment above, genes below */
      const cw=88,ch=40,gx=6,x0=14;
      CA_LAYERS.forEach((L,i)=>{const a=appear(L),col=L.g?'var(--brand)':'var(--accent)',soft=L.g?'var(--brand-soft)':'var(--accent-soft)';
        const k=L.g?i:i-4,x=x0+k*(cw+gx),y=(L.g?100:54)-(1-ease(a))*14,cur=(L.s===p&&L.s<4)||(p===4&&L.g===0&&a>0)||together>0;
        s+=box(x,L.g?100:54,cw,ch,'var(--panel)','var(--line)',8,';stroke-dasharray:3 3');
        if(a>0)s+=`<g style="opacity:${f1(a)}">`+box(x,y,cw,ch,soft,col,8,cur?';stroke-width:2.4':'')+T(x+7,y+16,L.sn,'t-sm',INK+';font-size:10px')+T(x+7,y+31,L.v,'t-xs','fill:var(--ink)')+'</g>'});
    }else{
      const x=34,w=206,h=34,gap=5,base=388;
      s+=`<text transform="translate(22 ${base-80}) rotate(-90)" class="t-xs t-mid" style="fill:var(--brand);font-weight:700;letter-spacing:.12em">GENES</text>`;
      s+=`<text transform="translate(22 ${base-236}) rotate(-90)" class="t-xs t-mid" style="fill:var(--accent);font-weight:700;letter-spacing:.12em">ENVIRONMENT</text>`;
      CA_LAYERS.forEach((L,i)=>{const a=appear(L),col=L.g?'var(--brand)':'var(--accent)',soft=L.g?'var(--brand-soft)':'var(--accent-soft)';
        const y0=base-(i+1)*(h+gap)+gap,y=y0-(1-ease(a))*26,cur=(L.s===p&&L.s<4)||(p===4&&L.g===0&&a>0);
        s+=box(x,y0,w,h,'none','var(--line)',8,';stroke-dasharray:3 3');
        if(a>0)s+=`<g style="opacity:${f1(a)}">`+box(x,y,w,h,soft,col,8,cur||together>0?';stroke-width:2.4':'')+T(x+10,y+21,L.n,'t-lbl','font-size:12.5px')+T(x+w-10,y+21,L.v,'t-sm t-end','fill:var(--ink)')+'</g>'});
      if(together>0){const yj=base-4*(h+gap)+gap/2;
        s+=`<g style="opacity:${f1(together)}"><circle cx="${x+w/2}" cy="${f1(yj)}" r="10" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>${T(x+w/2,yj+5,'×','t-lbl t-mid','font-size:16px')}</g>`}
    }
    return s}

  /* ---------- the detail panels, one per step: (x,y,w,h, u = build-up 0..1, N narrow) ---------- */
  function pHerit(X,Y,W,H,u,N){let s=T(X,Y+12,'Share of BMI variation that tracks with genes','t-lbl');
    const x0=X+4,x1=X+W-30,XV=v=>x0+(x1-x0)*v,rh=N?66:52,y0=Y+36;
    const rows=[
      {l:'Twin studies: 88 estimates, 140,525 twins',lo:.47,hi:.90,p5:.58,p95:.87,m:.75,txt:'range 0.47–0.90 · median 0.75'},
      {l:'Family studies: 27 estimates, 42,968 people',lo:.24,hi:.81,p5:.25,p95:.68,m:.46,txt:'range 0.24–0.81 · median 0.46'},
      {l:'Identical twins reared apart: BMI correlation',dots:[.66,.70],txt:'women 0.66 · men 0.70'},
      {l:'Twin children: genetic share by age',age:[.42,.75],txt:''}];
    rows.forEach((r,i)=>{const ui=ease(ramp(u,i*.17,i*.17+.4)),y=y0+i*rh;if(ui<=0&&i>0){s+=T(X,y,r.l,'t-xs','fill:var(--muted)');return}
      s+=T(X,y,r.l,'t-xs','fill:var(--ink);font-weight:600');
      s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${y+16}" y2="${y+16}" style="stroke:var(--panel-2);stroke-width:12;stroke-linecap:round"/>`;
      if(r.lo!=null){const a=XV(r.lo),b=XV(lerp(r.lo,r.hi,ui)),c=XV(r.p5),d=XV(lerp(r.p5,r.p95,ui));
        s+=`<line x1="${f1(a)}" x2="${f1(b)}" y1="${y+16}" y2="${y+16}" style="stroke:var(--brand);stroke-width:2.4"/><line x1="${f1(c)}" x2="${f1(Math.max(c,d))}" y1="${y+16}" y2="${y+16}" style="stroke:var(--brand);stroke-width:9;stroke-linecap:round;opacity:.55"/>`;
        if(ui>.85)s+=`<circle cx="${f1(XV(r.m))}" cy="${y+16}" r="6.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`}
      if(r.dots)r.dots.forEach((v,k)=>{if(ui>k*.4)s+=`<circle cx="${f1(XV(v))}" cy="${y+16}" r="6" style="fill:${k?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`});
      if(r.age){const v=lerp(r.age[0],r.age[1],ui);
        s+=`<circle cx="${f1(XV(r.age[0]))}" cy="${y+16}" r="6" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.6;stroke-dasharray:2 2"/><circle cx="${f1(XV(r.age[1]))}" cy="${y+16}" r="6" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.6;stroke-dasharray:2 2"/>`;
        s+=`<line x1="${f1(XV(r.age[0]))}" x2="${f1(XV(v))}" y1="${y+16}" y2="${y+16}" style="stroke:var(--brand);stroke-width:2;stroke-dasharray:3 3"/><circle cx="${f1(XV(v))}" cy="${y+16}" r="6.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
        s+=T(XV(r.age[0]),y+38,'age 4: 0.42','t-xs t-mid','fill:var(--ink)')+T(XV(r.age[1]),y+38,'age 19: 0.75','t-xs t-mid','fill:var(--ink)')}
      if(r.txt&&ui>.6)s+=T(r.lo!=null?XV(r.lo):XV(.5),y+38,r.txt,'t-xs','fill:var(--ink)')});
    const ya=y0+4*rh+2;
    s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${ya}" y2="${ya}" class="axis"/>`;
    [0,.25,.5,.75,1].forEach(v=>{s+=`<line x1="${f1(XV(v))}" x2="${f1(XV(v))}" y1="${ya}" y2="${ya+4}" class="axis"/>`+T(XV(v),ya+16,v===0?'0':v===1?'1':String(v),'t-xs t-mid')});
    s+=T(x1,ya+30,'0 = none of the variation, 1 = all of it','t-xs t-end');
    s+=TL(X,ya+(N?60:46),'Heritability is a population statistic for one setting. It can change when the environment changes, and it does not make anyone\'s weight fixed.',N?58:76,14,'t-xs','fill:var(--ink)');
    return s}

  function chromo(x,y,risk){let s='';[0,12].forEach(dx=>{s+=`<rect x="${x+dx}" y="${y}" width="8" height="30" rx="4" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1"/><rect x="${x+dx}" y="${y+12}" width="8" height="6" style="fill:${risk?'var(--accent)':'var(--panel)'};stroke:var(--muted);stroke-width:.8"/>`});return s}
  function pVariants(X,Y,W,H,u,N){let s='';
    const A=N?[X,Y,W,212]:[X,Y,W*.47,H],B=N?[X,Y+236,W,H-236]:[X+W*.53,Y,W*.47,H];
    /* FTO */
    const ua=ramp(u,0,.55),[ax,ay,aw]=A;
    s+=T(ax,ay+12,'FTO, the first common variant (2007)','t-lbl');
    s+=chromo(ax,ay+30,false)+T(ax+30,ay+44,'0 risk copies','t-sm',INK)+T(ax+30,ay+58,'the comparison group','t-xs');
    s+=`<g style="opacity:${f1(.3+.7*ramp(ua,0,.3))}">`+chromo(ax,ay+76,true)+T(ax+30,ay+90,'2 risk copies','t-sm',INK)+T(ax+30,ay+104,'16% of adults','t-xs')+'</g>';
    const bw=aw-24,g=ease(ramp(ua,.25,.8));
    s+=T(ax,ay+132,'weight compared with 0 copies','t-xs','fill:var(--ink);font-weight:600');
    s+=`<rect x="${ax}" y="${ay+138}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${ax}" y="${ay+138}" width="${f1(bw*.6*g)}" height="12" rx="3" style="fill:var(--brand)"/>`;
    if(g>.6)s+=T(ax+bw*.6*g+6,ay+148,'about +3 kg','t-xs',INK);
    s+=T(ax,ay+170,'odds of obesity ×1.67','t-sm',`fill:var(--brand);font-weight:700;opacity:${f1(ramp(ua,.6,1))}`);
    s+=TL(ax,ay+190,'Lab work: the risk variant shifts fat-cell precursors from heat-burning beige fat towards storing white fat (early evidence).',N?62:40,13,'t-xs',`fill:var(--ink);opacity:${f1(ramp(u,.5,.8))}`);
    /* variance explained */
    const ub=ramp(u,.35,1),[bx,by,bw2]=B;
    s+=T(bx,by+12,'Share of BMI variation explained','t-lbl');
    s+=hbars(bx,by+40,bw2,[
      {l:'97 genome regions (2015)',v:2.7,txt:'≈2.7%'},
      {l:'941 variants (2018)',v:6,txt:'≈6.0%'},
      {l:'all common variants (estimate)',v:20,txt:'over 20%',dash:1},
      {l:'twin heritability (median)',v:75,txt:'75%',col:'var(--muted)'}],{u:ub,max:80,col:'var(--brand)',rh:N?36:40,vw:70});
    s+=TL(bx,by+(N?190:210),'The gap between what twins suggest and what found variants explain is called "missing heritability".',N?62:40,13,'t-xs',`fill:var(--ink);opacity:${f1(ramp(ub,.7,1))}`);
    return s}

  function pPoly(X,Y,W,H,u,N){let s='';
    const A=N?[X,Y,W,232]:[X,Y,W*.5,H-36],B=N?[X,Y+252,W,186]:[X+W*.56,Y,W*.44,H-36];
    const [ax,ay,aw,ah]=A,C=curveAxes(ax+26,ay+30,aw-84,ah-74,{x0:0,x1:10,y0:0,y1:90,yt:[0,30,60,90],ylabel:'mean weight, kg'});
    s+=T(ax,ay+10,'Weight by polygenic-score decile','t-lbl')+C.svg;
    const bwid=C.X(.72)-C.X(0);
    for(let i=0;i<10;i++){const ui=ease(ramp(u,i*.05,i*.05+.3)),end=i===0||i===9,v=end?(i?85.3:72.2):lerp(72.2,85.3,i/9),x=C.X(i+.14),yt=C.Y(v*ui),yb=C.Y(0);
      if(ui>0)s+=`<rect x="${f1(x)}" y="${f1(yt)}" width="${f1(bwid)}" height="${f1(yb-yt)}" rx="2" style="fill:${end?'var(--brand)':'var(--brand-soft)'};stroke:var(--brand);stroke-width:${end?0:1};${end?'':'stroke-dasharray:3 2'}"/>`;
      s+=T(C.X(i+.5),yb+13,String(i+1),'t-xs t-mid');
      if(end&&ui>.9)s+=T(i?C.X(i+.5):x+bwid,yt-5,v.toFixed(1),'t-xs '+(i?'t-mid':'t-end'),INK)}
    s+=T(C.X(0),C.Y(0)+27,'decile 1 (lowest) to 10 (highest)','t-xs');
    if(u>.62){const o=ramp(u,.62,.75),xl=C.X(.5),xr=C.X(10)+8,y1=C.Y(72.2),y2=C.Y(85.3);
      s+=`<g style="opacity:${f1(o)}"><line x1="${f1(xl)}" x2="${f1(xr+4)}" y1="${f1(y1)}" y2="${f1(y1)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 2"/><line x1="${f1(C.X(9.86))}" x2="${f1(xr+4)}" y1="${f1(y2)}" y2="${f1(y2)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 2"/><line x1="${f1(xr)}" x2="${f1(xr)}" y1="${f1(y1)}" y2="${f1(y2)}" style="stroke:var(--ink);stroke-width:1.6"/>${T(xr+6,(y1+y2)/2-2,'13.0 kg','t-xs',INK)+T(xr+6,(y1+y2)/2+10,'heavier','t-xs','fill:var(--ink)')}</g>`}
    /* the gap by age */
    const [bx,by,bw,bh]=B,D=curveAxes(bx+26,by+30,bw-36,bh-74,{x0:0,x1:60,y0:0,y1:14,xt:[0,8,18,57],yt:[0,5,10],ylabel:'gap, kg',xlabel:'age, years'});
    s+=T(bx,by+10,'The gap grows with age','t-lbl')+D.svg;
    const P=[[0,.06],[8,3.5],[18,12.3],[57,13]],ub=ramp(u,.3,1),up=lerp(0,60,ub);
    s+=plotLine(P,D.X,D.Y,{col:'var(--brand)',lw:2,dash:'5 4',upto:up}).svg;
    P.forEach((q,i)=>{if(q[0]<=up){s+=`<circle cx="${f1(D.X(q[0]))}" cy="${f1(D.Y(q[1]))}" r="4.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
      s+=i===0?T(D.X(24),D.Y(5),'at birth: 0.06 kg','t-xs',INK):T(D.X(q[0])+(i===3?0:7),D.Y(q[1])+(i===1?4:i===2?16:-10),q[1].toFixed(1)+' kg','t-xs'+(i===3?' t-end':''),INK)}});
    const yS=Y+H-24;
    s+=`<g style="opacity:${f1(ramp(u,.75,1))}">`;
    s+=N?T(X,yS-15,'BMI 40 or more: 5.6% in the top decile vs 0.2%','t-xs',INK)+T(X,yS,'in the bottom (25-fold)','t-xs',INK)+T(X,yS+15,'BMI 30 or more: 43.2% vs 9.5%','t-xs',INK)
      :T(X,yS,'BMI 40 or more: 5.6% in the top decile vs 0.2% in the bottom (25-fold)','t-xs',INK)+T(X,yS+15,'BMI 30 or more: 43.2% vs 9.5%','t-xs',INK);
    return s+'</g>'}

  const CA_CHAIN=[['leptin','LEP · fat'],['receptor','LEPR'],['POMC','neuron'],['α-MSH','cut by PC1'],['MC4R','in the PVN']];
  const CA_GENES=[
    {g:'LEP',n:0,a:'very low leptin, severe early obesity;',b:'leptin treatment helped'},
    {g:'LEPR',n:1,a:'severe early obesity, no puberty,',b:'low growth hormone and TSH'},
    {g:'POMC',n:2,a:'early obesity, adrenal insufficiency,',b:'red hair'},
    {g:'PCSK1',n:2.5,a:'extreme childhood obesity, faulty',b:'prohormone processing'},
    {g:'MC4R',n:4,a:'intense hunger, faster growth;',b:'one or two copies (codominant)'}];
  function pMono(X,Y,W,H,u,N){let s='';const gap=N?11:16,nw=(W-4*gap)/5,ny=Y+40,nh=40;
    s+=T(X,Y+10,'The leptin–melanocortin pathway, and where single genes break it','t-lbl',N?'font-size:11.5px':'');
    const cur=Math.min(4,Math.floor(u*5.6));
    CA_CHAIN.forEach((c,i)=>{const x=X+i*(nw+gap);
      s+=box(x,ny,nw,nh,'var(--brand-soft)','var(--brand)',8)+T(x+nw/2,ny+17,c[0],'t-sm t-mid',INK)+T(x+nw/2,ny+31,c[1],'t-xs t-mid','fill:var(--ink)');
      if(i<4)s+=`<line x1="${f1(x+nw+2)}" x2="${f1(x+nw+gap-3)}" y1="${ny+nh/2}" y2="${ny+nh/2}" style="stroke:var(--brand);stroke-width:1.8" marker-end="url(#caArr)"/>`});
    CA_GENES.forEach((G,k)=>{const on=ramp(u,k*.13,k*.13+.08);if(on<=0)return;const cx=X+G.n*(nw+gap)+(G.n%1?-gap/2+nw/2:nw/2)+(G.n%1?nw/2:0),cy=ny+nh/2,r=9;
      const xx=G.n%1?X+Math.floor(G.n)*(nw+gap)+nw+gap/2:cx;
      const yy=G.n%1?cy:ny-11;s+=`<g style="opacity:${f1(on)}"><circle cx="${f1(xx)}" cy="${f1(yy)}" r="${r}" style="fill:var(--panel);stroke:var(--risk);stroke-width:2"/><path d="M${f1(xx-4)} ${f1(yy-4)}l8 8m0-8l-8 8" style="stroke:var(--risk);stroke-width:2.2;stroke-linecap:round"/></g>`});
    /* the list */
    const ly=Y+108,lw=N?W:W*.6;
    CA_GENES.forEach((G,k)=>{const on=ramp(u,k*.13,k*.13+.08),y=ly+k*34,hi=k===cur;
      s+=`<g style="opacity:${f1(.25+.75*on)}">`+(hi&&on>0?box(X-4,y-12,lw,32,'var(--panel-2)','none',6):'')+T(X+2,y+2,G.g,'t-sm',`fill:var(--brand);font-weight:700`)+T(X+54,y+1,G.a,'t-xs','fill:var(--ink)')+T(X+54,y+14,G.b,'t-xs','fill:var(--ink)')+'</g>'});
    /* 29 of 500 */
    const ud=ramp(u,.66,1),dx=N?X:X+W*.64,dy=N?ly+178:ly-6,pit=N?7.2:6.4,lit=Math.round(29*ease(ud));
    if(ud>0){for(let i=0;i<500;i++){const c=i%25,r=Math.floor(i/25);s+=`<circle cx="${f1(dx+c*pit+3)}" cy="${f1(dy+r*pit+3)}" r="${f1(pit*.36)}" style="fill:${i<lit?'var(--accent)':'var(--line)'}"/>`}
      const tx=N?dx+25*pit+12:dx,ty=N?dy+14:dy+20*pit+18;
      s+=`<g style="opacity:${f1(ramp(ud,.5,1))}">`+T(tx,ty,'29 of 500 (5.8%)','t-sm',INK)+TL(tx,ty+15,'children with severe early obesity had an MC4R mutation',N?26:30,13,'t-xs','fill:var(--ink)')+'</g>'}
    if(u>.9){const yb=N?Y+H-30:Y+H-14;s+=TL(X,yb,'UK birth cohort: about 1 in 337 people carry one faulty MC4R copy; carriers were 17.76 kg heavier on average at 18',Math.floor(W/6),13,'t-xs',`${INK};opacity:${f1(ramp(u,.9,1))}`)}
    return s}

  function pEnv(X,Y,W,H,u,N){let s='';
    const M=[
      {t:'Food',sub:'extra kcal/day on ultra-processed',rows:[{l:'all extra',v:508,txt:'+508'},{l:'carbohydrate',v:280,txt:'+280'},{l:'fat',v:230,txt:'+230'},{l:'protein',v:0,txt:'−2'}],max:600},
      {t:'Sleep',sub:'short sleep and obesity: odds ratio',rows:[{l:'children',v:1.89,txt:'1.89'},{l:'adults',v:1.55,txt:'1.55'}],min:1,max:2.2,foot:'2 short nights: ghrelin +28%, leptin −18%'},
      {t:'Medicines',sub:'weight gain vs placebo, kg (trials)',rows:[{l:'olanzapine',v:2.4,txt:'2.4'},{l:'gabapentin',v:2.2,txt:'2.2'},{l:'amitriptyline',v:1.8,txt:'1.8'},{l:'mirtazapine',v:1.5,txt:'1.5'}],max:3},
      {t:'Social context',sub:'your chance rises when they do',rows:[{l:'a friend',v:57,txt:'+57%'},{l:'a sibling',v:40,txt:'+40%'},{l:'a spouse',v:37,txt:'+37%'},{l:'a neighbour',v:0,txt:'no effect'}],max:70}];
    const cols=N?1:2,mw=(W-(cols-1)*14)/cols,mh=N?(H-12)/4:(H-14)/2;
    M.forEach((m,i)=>{const um=ramp(u,i*.2,i*.2+.32);const x=X+(i%cols)*(mw+14),y=Y+Math.floor(i/cols)*(mh+(N?4:14));
      s+=box(x,y,mw,mh-4,'var(--panel)','var(--line)',10);
      if(um<=0){s+=T(x+12,y+20,m.t,'t-lbl','fill:var(--muted)');return}
      s+=box(x,y,mw,mh-4,'var(--accent-soft)','var(--accent)',10,`;opacity:${f1(um)}`);
      s+=T(x+12,y+20,m.t,'t-lbl')+T(x+12,y+34,m.sub,'t-xs','fill:var(--ink)');
      /* label on the left, bar to the right */
      const lw=N?96:82,rh=N?(m.rows.length>2?19:24):(m.rows.length>2?22:26),y0=y+(N?44:50);
      m.rows.forEach((r,k)=>{const yy=y0+k*rh;s+=T(x+12,yy+11,r.l,'t-xs','fill:var(--ink);font-weight:600')});
      s+=hbarsInline(x+12+lw,y0,mw-24-lw,m.rows,{u:um,min:m.min||0,max:m.max,rh,col:'var(--accent)'});
      if(m.foot)s+=TL(x+12,y+mh-(N?24:34),m.foot,Math.floor((mw-24)/5.8),13,'t-xs',`fill:var(--ink);opacity:${f1(ramp(um,.6,1))}`)});
    return s}
  function hbarsInline(x,y,w,rows,o){let s='';const vw=60,bw=w-vw,mn=o.min||0;
    rows.forEach((r,i)=>{const ui=ease(ramp(o.u,.15+i*.12,.15+i*.12+.4)),yy=y+i*o.rh,v=clamp((r.v-mn)/(o.max-mn)),L=bw*v*ui;
      s+=`<rect x="${f1(x)}" y="${f1(yy+2)}" width="${f1(bw)}" height="11" rx="3" style="fill:var(--panel-2)"/>`;
      if(L>0)s+=`<rect x="${f1(x)}" y="${f1(yy+2)}" width="${f1(L)}" height="11" rx="3" style="fill:${o.col}"/>`;
      if(ui>.5)s+=T(x+L+5,yy+11,r.txt,'t-xs',`${INK};opacity:${f1(ramp(ui,.5,1))}`)});
    return s}

  function pTogether(X,Y,W,H,u,N){let s='';
    const A=N?[X,Y,W,210]:[X,Y,W*.48,250],B=N?[X,Y+226,W,190]:[X+W*.54,Y,W*.46,250];
    /* Pima */
    const [ax,ay,aw,ah]=A,ua=ease(ramp(u,0,.5));
    s+=T(ax,ay+12,'Pima people, two environments','t-lbl')+TL(ax,ay+27,'type 2 diabetes, % of adults; similar genes, far more activity in Mexico',Math.floor(aw/6),13,'t-xs','fill:var(--ink)');
    const base=ay+ah-28,top=ay+62,Hh=base-top,bw=Math.min(70,aw*.26),col=[ax+aw*.18,ax+aw*.6];
    [[6.9,'Mexico',''],[38,'Arizona','']].forEach((d,i)=>{const hh=Hh*d[0]/40*ua;
      s+=`<rect x="${f1(col[i])}" y="${f1(base-hh)}" width="${f1(bw)}" height="${f1(hh)}" rx="3" style="fill:${i?'var(--accent)':'var(--brand)'}"/>`;
      if(ua>.7)s+=T(col[i]+bw/2,base-hh-6,d[0]+'%','t-sm t-mid',INK);
      s+=T(col[i]+bw/2,base+13,d[1],'t-xs t-mid',INK)+T(col[i]+bw/2,base+25,d[2],'t-xs t-mid')});
    s+=`<line x1="${f1(ax)}" x2="${f1(ax+aw)}" y1="${f1(base)}" y2="${f1(base)}" class="axis"/>`;
    /* FTO by activity */
    const [bx,by,bw2,bh]=B,ub=ease(ramp(u,.35,.85));
    s+=T(bx,by+12,'FTO and physical activity','t-lbl')+T(bx,by+27,'odds of obesity per risk copy','t-xs','fill:var(--ink)');
    const b0=by+bh-28,t0=by+50,HH=b0-t0,OR=v=>HH*(v-1)/.4,cw=Math.min(70,bw2*.26),cx=[bx+bw2*.18,bx+bw2*.6];
    [[1.3,'inactive'],[1.22,'active']].forEach((d,i)=>{const hh=OR(d[0])*ub;
      s+=`<rect x="${f1(cx[i])}" y="${f1(b0-hh)}" width="${f1(cw)}" height="${f1(hh)}" rx="3" style="fill:${i?'var(--brand)':'var(--accent)'}"/>`;
      if(ub>.7)s+=T(cx[i]+cw/2,b0-hh-6,'×'+d[0].toFixed(2),'t-sm t-mid',INK);
      s+=T(cx[i]+cw/2,b0+13,d[1],'t-xs t-mid',INK)});
    s+=`<line x1="${f1(bx)}" x2="${f1(bx+bw2)}" y1="${f1(b0)}" y2="${f1(b0)}" class="axis"/>`+T(bx+bw2,b0+25,'baseline ×1.00 (no extra odds)','t-xs t-end');
    if(ub>.8)s+=T(bx,t0-8,'about 27% smaller effect when active','t-xs',`fill:var(--brand);font-weight:700;opacity:${f1(ramp(ub,.8,1))}`);
    /* the line to remember */
    const um=ramp(u,.75,1),my=N?Y+H-40:Y+H-36;
    s+=`<g style="opacity:${f1(um)}">`+(N?T(X,my,'Genes load the dice;','t-big','font-size:18px')+T(X,my+22,'the environment rolls them.','t-big','font-size:18px'):T(X,my,'Genes load the dice; the environment rolls them.','t-big','font-size:19px'))+'</g>';
    return s}

  const PANELS=[pHerit,pVariants,pPoly,pMono,pEnv,pTogether];

  /* ---------- the main player ---------- */
  const svg=$('#caSvg'),rg=$('#caT');
  function draw(t){
    const N=vb(svg,'720 400','400 670'),p=phaseOf(CA_STEPS,t),P=CA_STEPS[p];
    const next=p<CA_STEPS.length-1?CA_STEPS[p+1].from:1.01,u=ramp(t,P.from+.005,Math.min(P.at,next-.01));
    const D=N?{x:14,y:162,w:372,h:496,hx:14,hy:24}:{x:262,y:64,w:446,h:326,hx:262,hy:28};
    let s=`<defs>${marker('caArr','var(--brand)',6)}</defs>`;
    s+=T(D.hx,D.hy,P.t,'t-big','font-size:18px')+T(D.hx,D.hy+16,P.k,'t-sm');
    s+=tower(t,N);
    if(N)s+=`<line x1="14" x2="386" y1="150" y2="150" class="axis"/>`;
    /* crossfade at the start of each step */
    const fade=ramp(t,P.from,P.from+.025);
    s+=`<g style="opacity:${f1(p===0?1:fade)}">`+PANELS[p](D.x,D.y,D.w,D.h,u,N)+'</g>';
    svg.innerHTML=s;
    setSt(p);$('#caNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#caPlay'),draw,30000,'%t:player.replay%','causes');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the ultra-processed food crossover ---------- */
  const usv=$('#caUpf'),urg=$('#caUpfT'),ubtn=$('#caUpfOrder'),usplit=$('#caUpfSplit'),uread=$('#caUpfRead'),unote=$('#caUpfNote');
  let order='upf';
  ubtn.innerHTML=[['upf','Ultra-processed first'],['unp','Unprocessed first']].map(o=>`<button class="btn" data-ord="${o[0]}" aria-pressed="${o[0]===order}">${o[1]}</button>`).join('');
  const dietOf=day=>(day<=14)===(order==='upf')?'upf':'unp';
  function wAt(d){/* schematic straight line between the published 2-week changes */
    const first=order==='upf'?CA_UPF.wUp:CA_UPF.wDown,second=-first;
    return d<=14?first*d/14:first+second*(d-14)/14}
  function drawUpf(t){
    const N=vb(usv,'720 340','400 520'),d=t*28,split=usplit.checked;
    const L=N?{x0:52,x1:384,ay:46,ah:170,by:300,bh:150,lab:14}:{x0:74,x1:704,ay:40,ah:140,by:226,bh:84,lab:16};
    const X=v=>L.x0+(L.x1-L.x0)*v/28,YA=v=>L.ay+L.ah-L.ah*v/600,YB=v=>L.by+L.bh/2-L.bh/2*v/1.2;
    let s='';
    /* period shading */
    [[0,14],[14,28]].forEach((r,i)=>{const dd=r[0]+1,diet=dietOf(dd),c=diet==='upf'?'var(--accent-soft)':'var(--good-soft)';
      s+=`<rect x="${f1(X(r[0]))}" y="${L.ay-22}" width="${f1(X(r[1])-X(r[0]))}" height="${L.by+L.bh-L.ay+22}" style="fill:${c};opacity:.55"/>`;
      s+=T((X(r[0])+X(r[1]))/2,L.ay-8,(N?'':`Days ${r[0]+1}–${r[1]}: `)+(diet==='upf'?'ultra-processed':'unprocessed'),'t-xs t-mid',`fill:${diet==='upf'?'var(--accent)':'var(--good)'};font-weight:700`)});
    /* chart A: extra intake */
    [0,250,500].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YA(v))}" y2="${f1(YA(v))}" class="grid"/>`+T(L.x0-6,YA(v)+3.5,String(v),'t-xs t-end')});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YA(0))}" y2="${f1(YA(0))}" class="axis"/>`;
    s+=`<text transform="translate(${L.lab} ${f1(L.ay+L.ah/2)}) rotate(-90)" class="t-xs t-mid" style="fill:var(--ink)">extra kcal/day</text>`;
    const bw=(X(1)-X(0))*.7;
    for(let i=1;i<=28;i++){if(i>Math.ceil(d-1e-6)||d<=0)break;const xi=X(i-.85),diet=dietOf(i);
      if(diet==='upf'){
        if(split){const yc=YA(CA_UPF.carb),yf=YA(CA_UPF.carb+CA_UPF.fat);
          s+=`<rect x="${f1(xi)}" y="${f1(yc)}" width="${f1(bw)}" height="${f1(YA(0)-yc)}" style="fill:var(--accent)"/><rect x="${f1(xi)}" y="${f1(yf)}" width="${f1(bw)}" height="${f1(yc-yf)}" style="fill:var(--gold);opacity:.85"/>`}
        else{const y=YA(CA_UPF.extra);s+=`<rect x="${f1(xi)}" y="${f1(y)}" width="${f1(bw)}" height="${f1(YA(0)-y)}" style="fill:var(--accent)"/>`}}
      else s+=`<rect x="${f1(xi)}" y="${f1(YA(0)-2)}" width="${f1(bw)}" height="3" style="fill:var(--good)"/>`}
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YA(508))}" y2="${f1(YA(508))}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:4 3;opacity:.6"/>`;
    s+=T(L.x1,YA(508)-5,'mean difference +508 kcal/day','t-xs t-end',INK);
    /* chart B: weight change */
    [-1,0,1].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(YB(v))}" y2="${f1(YB(v))}" class="${v?'grid':'axis'}"/>`+T(L.x0-6,YB(v)+3.5,(v>0?'+':v<0?'−':'')+Math.abs(v)+' kg','t-xs t-end')});
    s+=`<text transform="translate(${L.lab} ${f1(L.by+L.bh/2)}) rotate(-90)" class="t-xs t-mid" style="fill:var(--ink)">weight change</text>`;
    let q='';const n=Math.max(1,Math.round(d*4));for(let i=0;i<=n;i++){const dd=d*i/n;q+=(i?'L':'M')+f1(X(dd))+' '+f1(YB(wAt(dd)))}
    s+=`<path d="${q}" style="fill:none;stroke:var(--ink);stroke-width:2.4;stroke-dasharray:6 3;stroke-linejoin:round"/>`;
    [[14,wAt(14)],[28,wAt(28)]].forEach((pt,i)=>{if(d>=pt[0]-.01){const dlt=i?wAt(28)-wAt(14):wAt(14);
      s+=`<circle cx="${f1(X(pt[0]))}" cy="${f1(YB(pt[1]))}" r="5" style="fill:${dlt>0?'var(--accent)':'var(--good)'};stroke:var(--panel);stroke-width:2"/>`+T(X(pt[0])-8,YB(pt[1])+(dlt>0?-9:16),(dlt>0?'+0.9 kg':'−0.9 kg')+(N?'':' in 2 weeks'),'t-xs t-end',INK)}});
    s+=`<circle cx="${f1(X(d))}" cy="${f1(YB(wAt(d)))}" r="4" style="fill:var(--ink)"/>`;
    /* day axis */
    [0,7,14,21,28].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.by+L.bh}" y2="${L.by+L.bh+4}" class="axis"/>`+T(X(v),L.by+L.bh+16,String(v),'t-xs t-mid')});
    s+=T(L.x1,L.by+L.bh+30,'day of the trial','t-xs t-end');
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${L.ay-2}" y2="${L.by+L.bh}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3;opacity:.5"/>`;
    usv.innerHTML=s;
    const dd=Math.min(28,Math.max(0,Math.round(d))),upDays=[...Array(dd)].map((_,i)=>dietOf(i+1)).filter(x=>x==='upf').length;
    uread.innerHTML=`<span>Day <b>${dd}</b> of 28</span><span>Diet now: <b>${d<=0?'about to start':dietOf(Math.max(1,Math.ceil(d)))==='upf'?'ultra-processed':'unprocessed'}</b></span><span>Extra eaten so far: <b>≈${(upDays*CA_UPF.extra).toLocaleString('en-GB')} kcal</b> (508 × ${upDays} ultra-processed days, calculated here)</span>`+(split?`<span><i class="ca-sw" style="background:var(--accent)"></i>carbohydrate +280</span><span><i class="ca-sw" style="background:var(--gold)"></i>fat +230</span><span>protein −2 kcal/day</span>`:'');
    const key=d<.5?'start':d>=27.5?'end':dietOf(Math.ceil(d));
    unote.innerHTML=noteHTML(CA_UPF_NOTES[key]);
  }
  const stopU=playWire(urg,$('#caUpfPlay'),drawUpf,10000,'%t:player.replay%','causes');
  ubtn.addEventListener('click',e=>{const b=e.target.closest('[data-ord]');if(!b)return;order=b.dataset.ord;$$('[data-ord]',ubtn).forEach(x=>x.setAttribute('aria-pressed',x===b));stopU();drawUpf(+urg.value)});
  usplit.addEventListener('change',()=>drawUpf(+urg.value));
  drawUpf(+urg.value);
};
