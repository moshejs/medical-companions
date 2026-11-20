/* =============== 3.2 How GLP-1 medicines work =============== */
/* Main player: a meal makes gut L cells release GLP-1; DPP-4 cuts it within minutes; a long-acting medicine reaches
   receptors in pancreas, stomach and brain; then a half-life chart (computed from label half-lives) and tirzepatide's
   two receptors. Second: the label dose steps, per product. Facts: research passes C and F (and I for the pipeline). */
const GL_STEPS=[
 {from:0,at:.08,k:'After a meal',t:'L cells release GLP-1',
  txt:'GLP-1 is a 30-amino-acid peptide made by L cells in the intestine when they process proglucagon, and it is released after meals. [[Holst2007]] GLP-1 and GIP are the two incretin hormones: both are secreted within minutes of eating. [[Baggio2007]] Infusing GLP-1 increased fullness and cut the next meal by 12% in 20 healthy men. [[Flint1998]]',
  pt:'When food reaches the gut, special cells release GLP-1. It is a messenger that says "food has arrived".',
  hook:'GLP-1 comes from L cells (lower small intestine); GIP from K cells (upper small intestine). Both are incretins. [[Holst2007,Baggio2007]]'},
 {from:.15,at:.27,k:'Within minutes',t:'DPP-4 cuts it',
  txt:'The enzyme dipeptidyl peptidase-4 (DPP-4) inactivates GLP-1 very fast, even before it leaves the gut. [[Holst2007]] In rats, over 50% of GLP-1 was converted to the inactive, shortened form within 2 minutes. [[Kieffer1995]] In people given GLP-1 into a vein, only 19.9% (healthy) and 25.0% (type 2 diabetes) of the GLP-1 measured was still intact. [[Deacon1995]] This is why the natural hormone cannot be used as a weight medicine.',
  pt:'The body breaks natural GLP-1 down within minutes. To work as a medicine, the molecule had to be redesigned to last.',
  hook:'DPP-4 cuts the first two amino acids off GLP-1 and GIP, making them inactive. [[Kieffer1995,Baggio2007]]'},
 {from:.32,at:.4,k:'Pancreas and stomach',t:'Insulin when glucose is high; a slower stomach',
  txt:'GLP-1 increases insulin and lowers glucagon in a glucose-dependent way: more when blood glucose is high, little when it is normal. [[Holst2007,Drucker2018]] Gut hormones supply 72.8% of the insulin response to oral glucose in healthy people but only 36.0% in type 2 diabetes. [[Nauck1986]] GLP-1 also slows stomach emptying, even at a physiological dose. [[Nauck1997]] The Zepbound label says this delay is largest after the first dose and lessens over time, [[FDA-Zepbound]] and one semaglutide trial found no significant delay at week 20. [[Friedrichsen2021]]',
  pt:'The medicine helps the pancreas release insulin, but mainly when blood sugar is high. It also slows how fast the stomach empties, most at the start.',
  hook:'Glucose-dependent insulin release; the incretin effect: 72.8% of the oral-glucose insulin response in controls vs 36.0% in type 2 diabetes. [[Nauck1986]]'},
 {from:.48,at:.56,k:'The brain',t:'Fullness and fewer food thoughts',
  txt:'GLP-1 receptors sit in brain areas that regulate appetite. [[FDA-Wegovy]] In rodents, semaglutide did not cross the blood-brain barrier; it reached the brainstem and hypothalamus through circumventricular organs such as the area postrema and switched on cells in 10 brain areas. [[Gabery2020]] Liraglutide excited fullness (POMC/CART) neurons in the arcuate nucleus and indirectly quietened hunger (NPY/AgRP) neurons. [[Secher2014]] In people, semaglutide 2.4 mg cut free-choice lunch intake by 35% at week 20, [[Friedrichsen2021]] and 1.0 mg reduced hunger and cravings without lowering resting metabolic rate. [[Blundell2017]]',
  pt:'In the brain, the medicine turns up the "I am full" signal and turns down hunger. People eat less because they want less, not because they are trying harder.',
  hook:'Semaglutide lowers intake, not energy expenditure. [[Blundell2017,Gabery2020]]'},
 {from:.64,at:.8,k:'Built to last',t:'From minutes to a week',
  txt:'Semaglutide keeps 94% of the hormone\'s sequence, with two amino-acid changes and a fatty side chain that binds albumin. [[FDA-Wegovy,Lau2015]] More than 99% is albumin-bound; its half-life is about 1 week, and it stays in the blood for 5 to 7 weeks after the last 2.4 mg dose. [[FDA-Wegovy]] Liraglutide resists breakdown with a half-life of 13 hours, so it is given daily. [[FDA-Saxenda]] Orforglipron is a small, non-peptide molecule taken as a daily tablet, with a half-life of about 29 to 49 hours. [[FDA-Foundayo,Wharton2025ATTAIN1]]',
  pt:'Natural GLP-1 lasts minutes. The medicines were redesigned to last hours (daily medicines) or about a week (weekly injections).',
  hook:'Half-lives: liraglutide 13 h (daily), orforglipron about 29 to 49 h (daily tablet), tirzepatide about 5 days and semaglutide about 1 week (weekly). [[FDA-Saxenda,FDA-Foundayo,FDA-Zepbound,FDA-Wegovy]]'},
 {from:.87,at:.97,k:'Two receptors',t:'Tirzepatide: GIP plus GLP-1',
  txt:'Tirzepatide is one molecule that activates both the GIP and the GLP-1 receptor. A C20 fatty diacid lets it bind albumin, which gives a half-life of about 5 days. Nonclinical studies suggest the GIP action may add to appetite regulation. [[FDA-Zepbound]] In mice, the dual agonist lowered weight and food intake more than a selective GLP-1 receptor agonist. [[Coskun2018]] Newer molecules add glucagon or amylin as targets; see the table below.',
  pt:'Tirzepatide presses two hormone buttons at once, GIP and GLP-1. In trials it led to more weight loss on average than semaglutide.',
  hook:'Tirzepatide = dual GIP and GLP-1 receptor agonist; retatrutide adds glucagon (triple agonist). [[FDA-Zepbound,Jastreboff2023Retatrutide]]'}
];
/* half-lives in hours, from the labels; native GLP-1 is drawn as gone within minutes (no number claimed) */
const GL_HL=[
 {id:'nat',n:'native GLP-1',s:'native GLP-1',h:.04,col:'var(--glp1)',lab:'minutes'},
 {id:'lira',n:'liraglutide',s:'liraglutide',h:13,col:'var(--pyy)',lab:'13 h'},
 {id:'orf',n:'orforglipron',s:'orforglipron',h:29,h2:49,col:'var(--leptin)',lab:'29–49 h'},
 {id:'tirz',n:'tirzepatide',s:'tirzepatide',h:120,col:'var(--gip)',lab:'~5 days'},
 {id:'sema',n:'semaglutide',s:'semaglutide',h:168,col:'var(--rx-drug)',lab:'~1 week'}
];
const GL_LBL={blood:'bloodstream',inj:'medicine injected under the skin',nat:'native GLP-1',cut:'cut, inactive',drug:'medicine',dpp:'DPP-4',
  clock:'minutes after release',intact:'GLP-1 still intact in human blood (IV infusion)',healthy:'healthy',t2d:'type 2 diabetes',
  rat:'rats: over half cut within 2 minutes',panc:'Pancreas',stom:'Stomach',brain:'Brain',ghigh:'glucose high',glow:'glucose normal',
  ins:'insulin released',without:'without',withg:'with GLP-1',empt:'slower emptying',lunch:'free-choice lunch, sema 2.4 mg, wk 20',day:'whole-day intake, sema 1.0 mg, wk 12',
  pomc:'fullness neurons on',hlT:'% of one dose left (computed from label half-lives)',days:'days after one dose',alb:'albumin',chain:'fatty side chain',
  albTxt:'carried on albumin: >99% bound',rel:'slowly released',two:'one molecule, two receptors',glpr:'GLP-1 receptor',gipr:'GIP receptor'};
/* label dose steps, quoted as published (weeks; oral 30-day steps = 30/7 weeks). o:true = optional, shown at the earliest week allowed */
const GL_D30=30/7;
const GL_DOSE=[
 {id:'wegi',n:'Wegovy injection',drug:'semaglutide',form:'pen',unit:'mg once weekly',xmax:28,
  steps:[{a:0,b:4,v:.25},{a:4,b:8,v:.5},{a:8,b:12,v:1},{a:12,b:16,v:1.7,m:'maintenance option'},{a:16,b:28,v:2.4,m:'recommended maintenance'},{a:20,b:28,v:7.2,o:1,m:'optional maximum'}],
  k:'Wegovy (semaglutide) injection',t:'Monthly steps to 2.4 mg, optional 7.2 mg',
  li:['The label states 0.25 mg weekly for weeks 1 to 4, 0.5 mg for weeks 5 to 8, 1 mg for weeks 9 to 12 and 1.7 mg for weeks 13 to 16, then maintenance from week 17. [[FDA-Wegovy]]',
   'For adult weight reduction, maintenance is 1.7 mg or 2.4 mg (recommended), with an optional increase to a maximum of 7.2 mg after at least 4 weeks on 2.4 mg. [[FDA-Wegovy]]',
   'If 2 or more consecutive weekly doses are missed, the label says to restart escalation at a lower dose to reduce gastrointestinal reactions. [[FDA-Wegovy]]',
   'In STEP UP, 7.2 mg gave −18.7% vs −15.6% on 2.4 mg at 72 weeks (trial averages); dysaesthesia, an abnormal skin sensation, affected 22.9% vs 6.0%. [[Wharton2025STEPUP]]']},
 {id:'wegt',n:'Wegovy tablets',drug:'oral semaglutide',form:'tab',unit:'mg once daily',xmax:20,
  steps:[{a:0,b:GL_D30,v:1.5},{a:GL_D30,b:2*GL_D30,v:4},{a:2*GL_D30,b:3*GL_D30,v:9},{a:3*GL_D30,b:20,v:25,m:'maintenance'}],
  k:'Wegovy (semaglutide) tablets',t:'30-day steps to 25 mg daily',
  li:['The label states 1.5 mg daily for days 1 to 30, 4 mg for days 31 to 60, 9 mg for days 61 to 90, then 25 mg daily as maintenance. [[FDA-Wegovy]]',
   'Taken on an empty stomach in the morning with up to 4 ounces of water; then at least 30 minutes before eating, drinking or other oral medicines. [[FDA-Wegovy]]',
   'Wegovy tablets are labelled for adults only, for weight reduction and cardiovascular risk reduction. [[FDA-Wegovy]]',
   'In OASIS 4, the 25 mg tablet gave −13.6% vs −2.2% on placebo at 64 weeks (trial averages). [[Wharton2025OASIS4]]']},
 {id:'zep',n:'Zepbound',drug:'tirzepatide',form:'pen',unit:'mg once weekly',xmax:28,
  steps:[{a:0,b:4,v:2.5,m:'starting dose only'},{a:4,b:28,v:5,m:'maintenance option'},{a:8,b:28,v:7.5,o:1},{a:12,b:28,v:10,o:1,m:'maintenance option'},{a:16,b:28,v:12.5,o:1},{a:20,b:28,v:15,o:1,m:'maximum'}],
  k:'Zepbound (tirzepatide)',t:'2.5 mg to start, then 2.5 mg steps',
  li:['The label states 2.5 mg weekly for 4 weeks, a starting dose and not a maintenance dose, then increases in 2.5 mg steps at least 4 weeks apart. [[FDA-Zepbound]]',
   'Maintenance is 5, 10 or 15 mg (10 or 15 mg for obstructive sleep apnoea); the maximum is 15 mg. [[FDA-Zepbound]]',
   'Because it slows stomach emptying, Zepbound can reduce the effect of oral hormonal contraceptives; the label advises a non-oral method, or adding a barrier method for 4 weeks after starting and after each dose increase. [[FDA-Zepbound]]',
   'In SURMOUNT-1, 5, 10 and 15 mg gave −15.0%, −19.5% and −20.9% vs −3.1% on placebo at 72 weeks (trial averages). [[Jastreboff2022SURMOUNT1]]']},
 {id:'fou',n:'Foundayo',drug:'orforglipron',form:'tab',unit:'mg once daily',xmax:28,
  steps:[{a:0,b:GL_D30,v:.8},{a:GL_D30,b:2*GL_D30,v:2.5},{a:2*GL_D30,b:28,v:5.5},{a:3*GL_D30,b:28,v:9,o:1},{a:4*GL_D30,b:28,v:14.5,o:1},{a:5*GL_D30,b:28,v:17.2,o:1,m:'maximum'}],
  k:'Foundayo (orforglipron)',t:'Steps of at least 30 days',
  li:['The label states 0.8 mg once daily, then 2.5 mg and 5.5 mg, each after at least 30 days, with optional steps to 9, 14.5 and 17.2 mg (the maximum). It can be taken with or without food. [[FDA-Foundayo]]',
   'The trials used an investigational formulation; the label lists the trial arms as "equivalent dosages" of 5.5, 9 and 17.2 mg, so the 36 mg trial arm corresponds to 17.2 mg on the label. [[FDA-Foundayo]]',
   'Approved by the FDA on 1 April 2026 for adults with obesity, or overweight with at least one weight-related condition. [[FDA-Foundayo]]',
   'In ATTAIN-1, the 36 mg trial dose gave −11.2% vs −2.1% on placebo at 72 weeks (trial averages). [[Wharton2025ATTAIN1]]']}
];

inits.glp=()=>{
  /* ---------- small glyphs, local to this module ---------- */
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const B=(x,y,txt,cls='t-xs')=>T(x,y,txt,cls,'fill:var(--ink);font-weight:700');
  /* a receptor sitting in a membrane: a cup that glows when occupied */
  function rec(x,y,col,on,lbl){let s=`<line x1="${f1(x-14)}" x2="${f1(x+14)}" y1="${f1(y+7)}" y2="${f1(y+7)}" style="stroke:var(--muted);stroke-width:2.2;stroke-linecap:round"/>`;
    if(on>0)s+=`<circle cx="${f1(x)}" cy="${f1(y-2)}" r="${f1(9+4*on)}" style="fill:${col};opacity:${f1(.22*on)}"/>`;
    s+=`<path d="M${f1(x-6)} ${f1(y+9)}V${f1(y-3)}Q${f1(x-6)} ${f1(y-9)} ${f1(x-10)} ${f1(y-10)}M${f1(x+6)} ${f1(y+9)}V${f1(y-3)}Q${f1(x+6)} ${f1(y-9)} ${f1(x+10)} ${f1(y-10)}" style="fill:none;stroke:${col};stroke-width:3;stroke-linecap:round"/>`;
    if(lbl)s+=kitLabel(x,y+20,lbl,{a:'m'});return s}
  /* DPP-4: a pac-man enzyme, mouth opening with o */
  function dpp(x,y,r,o){const a=(.15+.35*o)*Math.PI;return `<path d="M${f1(x)} ${f1(y)}L${f1(x+r*Math.cos(a))} ${f1(y-r*Math.sin(a))}A${r} ${r} 0 1 0 ${f1(x+r*Math.cos(a))} ${f1(y+r*Math.sin(a))}Z" style="fill:var(--device);stroke:var(--panel);stroke-width:1.2"/>`}
  /* a GLP-1 molecule: hexagon with two N-terminal beads (cut = beads gone, grey body) */
  function mol(x,y,cut,op=1,r=7){let s=`<g style="opacity:${f1(op)}">`;
    if(cut<1){const off=cut*14;s+=`<circle cx="${f1(x-r-5-off)}" cy="${f1(y-off*.6)}" r="3" style="fill:var(--glp1);opacity:${f1(1-cut)}"/><circle cx="${f1(x-r-11-off)}" cy="${f1(y-off*.6)}" r="3" style="fill:var(--glp1);opacity:${f1(1-cut)}"/>`}
    if(cut>.5)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--figure);stroke:var(--figure-line);stroke-width:1"/>`;
    else s+=hormoneDot(x,y,'glp1',{r});
    return s+'</g>'}
  /* the HTML key under the stage */
  const key=$('#glKey'),kd=(k,lbl)=>`<span><svg viewBox="0 0 16 16">${k}</svg>${lbl}</span>`;
  key.innerHTML=kd(hormoneDot(8,8,'glp1',{r:5}),'GLP-1')+kd(`<circle cx="8" cy="8" r="5" style="fill:var(--figure);stroke:var(--figure-line)"/>`,'GLP-1 cut by DPP-4')+kd(hormoneDot(8,8,'drug',{r:3.6}),'medicine')+kd(hormoneDot(8,8,'insulin',{r:4.5}),'insulin')+kd(hormoneDot(8,8,'gip',{r:5}),'GIP')+kd(dpp(8,8,6,.5),'DPP-4');

  /* ---------- the main player ---------- */
  const svg=$('#glSvg'),rg=$('#glT');
  function draw(t){
    const N=vb(svg,'720 380','400 690');
    const L=N?{bx:12,by:6,bs:1.05,gx:12,gy:146,gs:.95,vx:236,vy0:34,vy1:400,px:16,py:432,pw:368,ph:250,kx:252}
             :{bx:40,by:10,bs:1,gx:40,gy:148,gs:.8,vx:226,vy0:30,vy1:350,px:300,py:12,pw:410,ph:356,kx:0};
    const p=phaseOf(GL_STEPS,t),P=GL_STEPS[p];
    const drugOn=ramp(t,.32,.37),brainOn=ramp(t,.48,.56);
    let s='';
    /* anatomy */
    const ileumGlow=ramp(t,.02,.09)*(1-.7*ramp(t,.3,.34));
    const gut=gutTract(L.gx,L.gy,L.gs,{labels:true,food:t<.3?lerp(.08,.62,ramp(t,0,.14)):undefined,glow:{ileum:ileumGlow,pancreas:drugOn*(.5+.5*Math.sin(t*60))**2}});
    const br=brainHypothalamus(L.bx,L.by,L.bs,{inset:false,labels:true,pomc:brainOn,agrp:.5*(1-brainOn)});
    s+=br.svg+gut.svg;
    const A=gut.at,H=br.at,VX=L.vx;
    /* the bloodstream: a trunk with taps to each target */
    const taps=[{p:H.hypo,y:H.hypo[1]-(N?14:12),on:brainOn,col:'var(--glp1)'},{p:A.stomach,y:A.stomach[1],on:drugOn,col:'var(--glp1)'},{p:A.pancreas,y:A.pancreas[1],on:drugOn,col:'var(--glp1)'},{p:A.ileum,y:A.ileum[1],on:0,src:1}];
    s+=`<path d="M${VX} ${L.vy1}V${L.vy0}" style="stroke:var(--vessel);stroke-width:7;stroke-linecap:round;opacity:.28"/>`;
    taps.forEach(q=>{s+=`<path d="M${VX} ${f1(q.y)}H${f1(q.p[0]+(q.src?8:16))}" style="stroke:var(--vessel);stroke-width:3;opacity:.3;stroke-dasharray:${q.src?'none':'4 3'}"/>`;
      if(!q.src)s+=rec(VX-22,q.y-4,q.col,q.on,'')});
    s+=T(VX+8,L.vy0+4,GL_LBL.blood,'t-xs');
    /* molecules on the trunk */
    const n=9;
    for(let i=0;i<n;i++){const u=((i/n)+t*6)%1,y=lerp(A.ileum[1],L.vy0,u);
      if(t<.32){const rel=ramp(t,.02,.12);if(i/n>rel)continue;
        const cut=t<.15?ramp(u,.55,.75):clamp(ramp(u,.12,.3)+ramp(t,.15,.3)*.6);
        s+=mol(VX,y,cut,1-.4*ramp(u,.8,1),5)}
      else{const uu=((i/n)+t*4)%1,yy=lerp(L.vy1,L.vy0,uu);s+=`<g style="opacity:${f1(drugOn)}">`+hormoneDot(VX,yy,'drug',{r:3.6})+'</g>'}}
    /* the pen injects from step 3 on */
    if(drugOn>0){const pn=pen(VX+36,L.vy1+8,.55,{needle:1,press:bump(t*5%1,0,1)});s+=`<g style="opacity:${f1(drugOn)}">${pn.svg}</g>`;
      if(!N)s+=T(VX+8,L.vy1+28,GL_LBL.inj,'t-xs')}
    /* narrow: a key in the free column */
    if(N){s+=B(L.kx,64,P.k.toUpperCase(),'t-xs');const wds=P.t.split(' '),ln=[''];wds.forEach(w=>{if((ln[ln.length-1]+' '+w).length>20)ln.push(w);else ln[ln.length-1]=(ln[ln.length-1]+' '+w).trim()});ln.forEach((x,i)=>{s+=`<text x="${L.kx}" y="${86+i*17}" class="t-lbl" style="font-size:13px">${x}</text>`});s+=T(L.kx,96+ln.length*17,'step '+(p+1)+' of 6','t-xs')}
    /* side panel */
    const X0=L.px,Y0=L.py,W=L.pw,Hh=L.ph;
    s+=`<rect x="${X0}" y="${Y0}" width="${W}" height="${Hh}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    if(p<=1)s+=panelA(X0,Y0,W,Hh,t,p);else if(p<=3)s+=panelB(X0,Y0,W,Hh,t,p);else s+=panelC(X0,Y0,W,Hh,t,p);
    svg.innerHTML=s;
    setSt(p);$('#glNote').innerHTML=noteHTML(P);
  }
  /* panel A: release and DPP-4 */
  function panelA(X,Y,W,H,t,p){let s='';const pad=16;const N=W<400;
    s+=B(X+pad,Y+24,p===0?'Native GLP-1 enters the blood':'DPP-4 cuts the first two amino acids','t-lbl');
    const n=8,gap=(W-2*pad-30)/n,rowY=Y+H*.27,rel=Math.ceil(n*ramp(t,.02,.12));
    const m=2*ramp(t,.17,.29),cutN=p===0?0:Math.round(n*(1-Math.exp(-m*.5)));
    for(let i=0;i<n;i++){if(i>=rel||p===0)continue;const x=X+pad+30+i*gap+gap/2,c=i<cutN?1:0;
      s+=mol(x,rowY,c,1,8);if(i<cutN)s+=T(x,rowY+22,'cut','t-xs t-mid')}
    if(p>0){const tx=X+pad+30+Math.min(cutN,n-1)*gap+gap/2-24,o=Math.abs(Math.sin(t*90));s+=dpp(tx,rowY,11,o)+kitLabel(tx,rowY-18,GL_LBL.dpp,{a:'m'})}
    /* clock */
    const cx=X+W-44,cy=Y+H*.27+50;
    if(p>0){s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="22" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
      const a=-Math.PI/2+m/2*Math.PI*2;s+=`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-22)}A22 22 0 ${m>1?1:0} 1 ${f1(cx+22*Math.cos(a))} ${f1(cy+22*Math.sin(a))}Z" style="fill:var(--glp1);opacity:.25"/><line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+18*Math.cos(a))}" y2="${f1(cy+18*Math.sin(a))}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`;
      s+=B(cx-30,cy+4,m.toFixed(1)+' min','t-sm t-end');
      s+=T(cx-30,cy+18,GL_LBL.clock,'t-xs t-end')}
    
    /* intact fraction, human data */
    const by=Y+H*.62,bw=W-2*pad-150,show=p>0?ramp(t,.22,.29):0;
    if(show>0){s+=B(X+pad,by,GL_LBL.intact,'t-xs');
      [[GL_LBL.healthy,19.9],[GL_LBL.t2d,25.0]].forEach((r,i)=>{const y=by+12+i*26;
        s+=T(X+pad,y+11,r[0],'t-xs');s+=`<rect x="${f1(X+pad+110)}" y="${f1(y)}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--figure);opacity:.45"/><rect x="${f1(X+pad+110)}" y="${f1(y)}" width="${f1(bw*r[1]/100*show)}" height="14" rx="4" style="fill:var(--glp1)"/>`;
        s+=B(X+pad+110+bw+6,y+11,r[1].toFixed(1)+'%','t-xs')});
      s+=T(X+pad,by+70,'blue: intact · grey: cut · '+GL_LBL.rat,'t-xs')}
    else if(p===0){const ly=Y+H*.3,cw=N?30:36,nc=N?9:9,lx=X+pad+(W-2*pad-nc*cw)/2,rel2=ramp(t,.02,.12);
      
      for(let i=0;i<nc;i++){const x=lx+i*cw,Lc=i===4;s+=`<rect x="${f1(x+1)}" y="${f1(ly)}" width="${cw-2}" height="${N?40:48}" rx="8" style="fill:${Lc?'var(--panel)':'var(--gut)'};stroke:${Lc?'var(--glp1)':'var(--gut-line)'};stroke-width:${Lc?2:1}"/><circle cx="${f1(x+cw/2)}" cy="${f1(ly+12)}" r="4" style="fill:var(--nucleus)"/>`;
        if(Lc){for(let k=0;k<4;k++)s+=`<circle cx="${f1(x+cw/2+(k%2?6:-6))}" cy="${f1(ly+(N?26:30)+(k>1?8:0))}" r="2.6" style="fill:var(--glp1);opacity:${f1(1-rel2*.6)}"/>`;
          s+=kitLabel(x+cw/2,ly-18,'L cell',{a:'m'})}}
      const cy2=ly+(N?54:66);s+=T(X+pad,cy2+18,'gut lining: food passes above, blood flows below','t-xs');s+=`<path d="M${f1(lx)} ${f1(cy2)}H${f1(lx+nc*cw)}" style="stroke:var(--vessel);stroke-width:6;stroke-linecap:round;opacity:.35"/>`;
      for(let k=0;k<5;k++){const u=clamp(rel2*1.6-k*.18);if(u<=0)continue;const x=lx+4.5*cw+(k-2)*cw*u*1.2;s+=hormoneDot(x,lerp(ly+(N?40:48),cy2,clamp(u*2)),'glp1',{r:5})}
      for(let k=0;k<5;k++){const fx=lx+((k*1.7+t*20)%nc)*cw;s+=`<circle cx="${f1(fx)}" cy="${f1(ly-28)}" r="4" style="fill:var(--gut-line);opacity:${f1(.4*rel2+.2)}"/>`}
      const g=Y+H*(N?.8:.78);s+=hormoneDot(X+pad+6,g,'glp1',{r:6})+T(X+pad+18,g+4,'GLP-1 from L cells (lower small intestine)','t-xs');
      s+=hormoneDot(X+pad+6,g+24,'gip',{r:6})+T(X+pad+18,g+28,'GIP from K cells (upper small intestine)','t-xs')}
    return s}
  /* panel B: pancreas, stomach, brain */
  function panelB(X,Y,W,H,t,p){let s='';const pad=14,rh=(H-20)/3,u=ramp(t,.33,.47),N=W<400;
    const rows=[GL_LBL.panc,GL_LBL.stom,GL_LBL.brain];
    rows.forEach((r,i)=>{const y=Y+10+i*rh,on=i<2?1:ramp(t,.48,.53),op=i<2?(p===3?.45:1):(p===3?1:.25);
      s+=`<g style="opacity:${f1(op)}">`;
      if(i)s+=`<line x1="${X+pad}" x2="${X+W-pad}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--line)"/>`;
      s+=B(X+pad,y+18,r,'t-lbl');
      if(i===0){/* glucose gauge drives insulin release */
        const g=.5+.5*Math.sin(u*Math.PI*3-Math.PI/2),gx=X+pad+8,gy=y+28,gh=rh-40;
        s+=`<rect x="${f1(gx)}" y="${f1(gy)}" width="12" height="${f1(gh)}" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(gx)}" y="${f1(gy+gh*(1-g))}" width="12" height="${f1(gh*g)}" rx="6" style="fill:var(--vessel);opacity:.7"/>`;
        s+=T(gx+18,gy+8,GL_LBL.ghigh,'t-xs')+T(gx+18,gy+gh,GL_LBL.glow,'t-xs');
        const k=g>.55?Math.round(1+6*(g-.55)/.45):g>.3?1:0,ix=X+(N?150:180);
        for(let j=0;j<7;j++)s+=`<g style="opacity:${j<k?1:.15}">`+hormoneDot(ix+j*(N?22:26),y+rh*.55,'insulin',{r:6})+'</g>';
        s+=T(ix,y+rh*.55+22,GL_LBL.ins+(g>.55?': more':': little'),'t-xs')}
      else if(i===1){const f0=1-ramp(u,.05,.45),f1v=1-.5*ramp(u,.05,1);
        const sx=X+(N?110:150),sc=N?.3:.4;
        s+=stomach(sx,y+14,sc,{fill:Math.max(.02,f0)}).svg+T(sx+(N?20:26),y+rh-4,GL_LBL.without,'t-xs t-mid');
        s+=stomach(sx+(N?90:110),y+14,sc,{fill:Math.max(.02,f1v)}).svg+T(sx+(N?110:136),y+rh-4,GL_LBL.withg,'t-xs t-mid');
        s+=T(X+W-pad,y+18,GL_LBL.empt+' with GLP-1','t-xs t-end')}
      else{const bx=X+pad,bw=W-2*pad-50;
        [[GL_LBL.lunch,35],[GL_LBL.day,24]].forEach((b,j)=>{const yy=y+30+j*30,v=b[1]*on;
          s+=T(bx,yy,b[0],'t-xs');s+=`<rect x="${f1(bx)}" y="${f1(yy+4)}" width="${f1(bw)}" height="11" rx="4" style="fill:var(--figure);opacity:.35"/><rect x="${f1(bx)}" y="${f1(yy+4)}" width="${f1(bw*v/50)}" height="11" rx="4" style="fill:var(--pomc)"/>`;
          s+=B(bx+bw+6,yy+13,'−'+Math.round(v)+'%','t-xs')});
        s+=T(X+W-pad,y+18,'food eaten vs placebo','t-xs t-end')}
      s+='</g>'});
    return s}
  /* panel C: half-life chart and the albumin / dual-receptor diagram */
  function panelC(X,Y,W,H,t,p){let s='';const pad=14,N=W<400;
    const ax=X+40,aw=W-40-(N?120:130),ay=Y+44,ah=H*(N?.42:.5),XD=d=>ax+aw*d/14,YP=v=>ay+ah-ah*v/100;
    const dmax=14*ramp(t,.66,.84)+(p>=5?0:0);
    s+=B(X+pad,Y+18,GL_LBL.hlT,'t-xs');
    s+=`<rect x="${f1(ax)}" y="${f1(ay)}" width="${f1(aw)}" height="${f1(ah)}" style="fill:var(--panel)"/>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${f1(ax)}" x2="${f1(ax+aw)}" y1="${f1(YP(v))}" y2="${f1(YP(v))}" class="grid"/>`+T(ax-5,YP(v)+3,v+'%','t-xs t-end')});
    [0,7,14].forEach(d=>{s+=`<line x1="${f1(XD(d))}" x2="${f1(XD(d))}" y1="${f1(ay+ah)}" y2="${f1(ay+ah+4)}" class="axis"/>`+T(XD(d),ay+ah+14,d===0?'0':d+' d','t-xs t-mid')});
    s+=T(ax+aw,ay+ah+26,GL_LBL.days,'t-xs t-end');
    const lab=[];
    GL_HL.forEach(c=>{const f=(h,d)=>100*Math.pow(.5,d*24/h),hi=p>=5&&c.id==='tirz';
      const path=h=>{let q='';const n=Math.max(2,Math.round(140*dmax/14));for(let i=0;i<=n;i++){const d=dmax*i/n;q+=(i?'L':'M')+f1(XD(d))+' '+f1(YP(f(h,d)))}return q};
      if(dmax<=0)return;
      if(c.h2){let up='',dn='';const n=80;for(let i=0;i<=n;i++){const d=dmax*i/n;up+=(i?'L':'M')+f1(XD(d))+' '+f1(YP(f(c.h2,d)))}
        for(let i=n;i>=0;i--){const d=dmax*i/n;dn+='L'+f1(XD(d))+' '+f1(YP(f(c.h,d)))}
        s+=`<path d="${up}${dn}Z" style="fill:${c.col};opacity:.35"/>`}
      else s+=`<path d="${path(c.h)}" style="fill:none;stroke:${c.col};stroke-width:${hi?4:2.6};stroke-linejoin:round"/>`;
      const v=f(c.h2||c.h,dmax);lab.push({y:YP(v),txt:`${c.s} ${c.lab}`,col:c.col,v})});
    /* end labels, pushed apart */
    lab.sort((a,b)=>a.y-b.y);for(let i=1;i<lab.length;i++)if(lab[i].y-lab[i-1].y<11)lab[i].y=lab[i-1].y+11;
    const over=lab.length?lab[lab.length-1].y-(ay+ah+2):0;if(over>0)lab.forEach(l=>l.y-=over);
    lab.forEach(l=>{s+=`<circle cx="${f1(XD(dmax)+6)}" cy="${f1(l.y-3)}" r="3" style="fill:${l.col}"/>`+B(XD(dmax)+12,l.y,l.txt,'t-xs')});
    if(dmax>0)s+=`<line x1="${f1(XD(dmax))}" x2="${f1(XD(dmax))}" y1="${f1(ay)}" y2="${f1(ay+ah)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
    /* readout */
    const sv=100*Math.pow(.5,dmax*24/168),tv=100*Math.pow(.5,dmax*24/120);
    s+=T(X+pad,Y+33,`day ${dmax.toFixed(1)}: semaglutide ${Math.round(sv)}% left · tirzepatide ${Math.round(tv)}% left`,'t-xs');
    /* diagram */
    const dy=ay+ah+(N?40:48),dc=X+W/2;
    if(p===4){const ax2=X+pad+(N?60:80),ay2=dy+(N?34:44);
      s+=`<path d="${blob(ax2,ay2,N?26:32,7,{rough:.12,sq:.7})}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.3"/>`+T(ax2,ay2+4,GL_LBL.alb,'t-xs t-mid');
      const hx=ax2+(N?62:80),hy=ay2-(N?14:18),bob=Math.sin(t*40)*2;
      s+=`<path d="M${f1(ax2+(N?22:28))} ${f1(ay2-6)}l8 -6l8 6l8 -6l8 6l6 -4" style="fill:none;stroke:var(--fat-line);stroke-width:2.2;stroke-linejoin:round"/>`;
      s+=hormoneDot(hx,hy+bob,'drug',{r:7});
      s+=T(hx+16,hy-4,GL_LBL.chain+' →','t-xs')+B(hx+16,hy+10,GL_LBL.albTxt,'t-xs');
      s+=T(hx+16,hy+24,'half-life about 1 week','t-xs')}
    else{const r1=dc-(N?70:90),r2=dc+(N?70:90),ry=dy+(N?40:58),on=ramp(t,.88,.94);
      s+=rec(r1,ry,'var(--glp1)',on,GL_LBL.glpr)+rec(r2,ry,'var(--gip)',on,GL_LBL.gipr);
      const mx=dc,my=ry-28-(1-on)*14;
      s+=`<path d="M${f1(mx-10)} ${f1(my)}Q${f1((mx+r1)/2)} ${f1(my-4)} ${f1(r1)} ${f1(ry-10)}M${f1(mx+10)} ${f1(my)}Q${f1((mx+r2)/2)} ${f1(my-4)} ${f1(r2)} ${f1(ry-10)}" style="fill:none;stroke:var(--rx-drug);stroke-width:2;stroke-dasharray:3 3;opacity:${f1(on)}"/>`;
      s+=hormoneDot(mx-8,my,'drug',{r:6})+hormoneDot(mx+9,my,'gip',{r:6});
      s+=B(mx,my-16,'tirzepatide: '+GL_LBL.two,'t-xs t-mid')}
    return s}
  const stop=playWire(rg,$('#glPlay'),draw,26000,'%t:player.replay%','glp');
  const setSt=stepWire($('#glSteps'),GL_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- label dose steps ---------- */
  const dsv=$('#glDose'),drg=$('#glDoseT'),db=$('#glDrugBtns'),dnote=$('#glDoseNote');let di=0;
  db.innerHTML=GL_DOSE.map((d,i)=>`<button class="btn" data-gd="${i}" aria-pressed="${i===0}">${d.n}</button>`).join('');
  function drawDose(t){
    const N=vb(dsv,'720 300','400 470'),D=GL_DOSE[di];
    const L=N?{x:46,w:330,y:70,h:250,ty:338,xl:356,gy:378}:{x:60,w:470,y:44,h:200,ty:262,xl:280,gy:0};
    const vmax=Math.max(...D.steps.map(s=>s.v)),sq=v=>Math.sqrt(v/vmax),X=w=>L.x+L.w*w/D.xmax,Y=v=>L.y+L.h-L.h*sq(v)*.92;
    const wk=D.xmax*t;
    let s=`<text x="${L.x}" y="${N?20:22}" class="t-lbl">${D.k}</text>`+`<text x="${L.x}" y="${N?38:36}" class="t-xs">dose in ${D.unit}, as printed in the US label</text>`;
    s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    const tk=D.xmax>20?4:4;for(let w=0;w<=D.xmax;w+=tk){s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${L.y}" y2="${L.y+L.h+4}" class="grid"/><text x="${f1(X(w))}" y="${L.ty}" class="t-xs t-mid">${w}</text>`}
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><text x="${L.x+L.w}" y="${L.xl}" class="t-xs t-end">weeks from the first dose${D.form==='tab'?' (each step = 30 days)':''}</text>`;
    /* steps: solid main path, dashed optional */
    let cur=null;
    D.steps.forEach((st,i)=>{const x0=X(st.a),x1=X(st.b),y=Y(st.v),on=wk>=st.a,col=st.o?'var(--muted)':'var(--rx-drug)';
      s+=`<path d="M${f1(x0)} ${f1(y)}H${f1(x1)}" style="stroke:${col};stroke-width:${st.o?2:4};${st.o?'stroke-dasharray:6 4;':''}opacity:${on?1:.35};stroke-linecap:round"/>`;
      const nx=D.steps[i+1];if(nx&&!nx.o&&!st.o)s+=`<path d="M${f1(x1)} ${f1(y)}V${f1(Y(nx.v))}" style="stroke:var(--rx-drug);stroke-width:2;opacity:${wk>=nx.a?1:.35}"/>`;
      if(st.o){const pv=D.steps[i-1];s+=`<path d="M${f1(x0)} ${f1(Y(pv.v))}V${f1(y)}" style="stroke:var(--muted);stroke-width:1.4;stroke-dasharray:3 3;opacity:${on?1:.35}"/>`}
      s+=`<text x="${f1(x0+4)}" y="${f1(y-7)}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${on?1:.5}">${st.v} mg</text>`;
      if(st.m&&!N&&x1-x0>110)s+=`<text x="${f1(x1-2)}" y="${f1(y+13)}" class="t-xs t-end" style="opacity:${on?1:.5}">${st.m}</text>`;
      if(!st.o&&wk>=st.a)cur=st});
    /* playhead */
    s+=`<line x1="${f1(X(wk))}" x2="${f1(X(wk))}" y1="${L.y-4}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    s+=`<circle cx="${f1(X(wk))}" cy="${f1(Y(cur.v))}" r="6" style="fill:var(--rx-drug);stroke:var(--panel);stroke-width:2"/>`;
    /* the current dose card with a pen or a tablet */
    const cx=N?L.x:L.x+L.w+24,cy=N?L.gy:L.y+30,day=Math.floor(wk*7)+1,idx=D.steps.filter(x=>!x.o).indexOf(cur);
    s+=`<text x="${cx}" y="${cy}" class="t-xs">${D.form==='tab'?'day '+day:'week '+Math.min(Math.floor(wk)+1,D.xmax)}</text>`;
    s+=`<text x="${cx}" y="${cy+30}" class="t-big" style="font-size:26px">${cur.v} mg</text><text x="${cx}" y="${cy+46}" class="t-xs">${D.unit}</text>`;
    s+=`<text x="${cx}" y="${cy+62}" class="t-xs">label step ${idx+1}</text>`+(cur.m?`<text x="${cx}" y="${cy+76}" class="t-xs" style="fill:var(--ink)">${cur.m}</text>`:'');
    if(D.form==='pen')s+=pen(cx+(N?250:60),cy+(N?20:100),N?.8:.95,{dial:idx/6,cap:false,needle:0}).svg;
    else{const tx=cx+(N?250:60),ty=cy+(N?20:100),r=8+idx*1.6;s+=`<ellipse cx="${f1(tx)}" cy="${f1(ty)}" rx="${f1(r*1.6)}" ry="${f1(r)}" style="fill:var(--panel);stroke:var(--rx-drug);stroke-width:2"/><line x1="${f1(tx)}" x2="${f1(tx)}" y1="${f1(ty-r+3)}" y2="${f1(ty+r-3)}" style="stroke:var(--rx-drug);stroke-width:1.2;opacity:.6"/>`}
    if(!N)s+=`<text x="${cx}" y="${cy+150}" class="t-xs">${D.drug}</text>`;
    dsv.innerHTML=s;
    dnote.innerHTML=`<div class="kicker">The label states</div><h4>${D.t}</h4><ul>${D.li.map(x=>`<li>${x}</li>`).join('')}</ul><div class="pt"><b>%t:note.plain%</b>Starting low and going up slowly gives the stomach and gut time to adjust. Side effects are most common in the weeks after each step up. [[Wharton2022GItolerability]]</div>`;
  }
  const stopD=playWire(drg,$('#glDosePlay'),drawDose,9000,'%t:player.replay%','glp');
  db.addEventListener('click',e=>{const b=e.target.closest('[data-gd]');if(!b)return;di=+b.dataset.gd;$$('[data-gd]',db).forEach(x=>x.setAttribute('aria-pressed',x===b));stopD();drg.value=0;drawDose(0);$('#glDosePlay').click()});
  drawDose(+drg.value);
};
