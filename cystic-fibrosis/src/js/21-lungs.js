/* =============== 2.1 Lungs: mucus, infection & bronchiectasis =============== */
/* Main: a lifetime scrubber (age = 40 t², so childhood gets more of the track): the lungs glyph, germ lanes by age
   with the pass's figures as dots, and a schematic FEV1 line through Konstan 2007 and Que 2006 numbers.
   Second: the obstruction-infection-inflammation cycle. Third: an icon array of complication figures. */
const LG_AGE=t=>40*t*t, LG_T=a=>Math.sqrt(a/40);
const LG_STEPS=[
 {from:0,at:LG_T(.25),k:'Birth to 1 year',sv:'Mucus and inflammation first',sub:'airway changes before symptoms or infection',
  t:'Infancy: mucus and inflammation, before infection',
  txt:'Neutrophils, free neutrophil elastase and IL-8 were already raised in screened infants as young as 4 weeks, even with negative cultures [[Khan1995]]. In AREST CF, bronchiectasis was present in 29.3% of infants at 3 months and seen as young as 10 weeks [[Sly2013]]. Mucus "flakes" and neutrophils were raised in preschoolers with little or no infection, so mucus burden appears to come first <span class="ev early">Early evidence</span> [[Esther2019]].',
  pt:'Airway changes can start in the first months of life, even before a child has symptoms [[Sly2013,Khan1995]].',
  hook:'AREST CF: bronchiectasis in about 29% of screened infants at 3 months [[Sly2013]].'},
 {from:LG_T(1),at:LG_T(3),k:'Ages 1 to 5',sv:'The first germs settle in',sub:'S. aureus and H. influenzae, then Pseudomonas',
  t:'Early childhood: the first germs, and Pseudomonas arrives',
  txt:'Of 40 young children, 72.5% grew P. aeruginosa in the first 3 years, and 97.5% had evidence of infection by age 3 when serology was added; early isolates were non-mucoid and antibiotic-susceptible [[Burns2001]]. In Wisconsin, 29% of screened infants acquired it in the first 6 months, at a median age of 1.0 year [[Li2005]]. By 3 years, bronchiectasis prevalence was 61.5% [[Sly2013]]. A positive culture at 1–5 years went with 2.6 times the 8-year risk of death in the 1990 US registry, a population figure [[Emerson2002]].',
  pt:'Different germs tend to appear at different ages. Staph is common in childhood, and Pseudomonas becomes more common in teens and adults [[Razvi2009]].',
  hook:'Bronchiectasis in AREST CF: 29.3% at 3 months, 61.5% at 3 years [[Sly2013]].'},
 {from:LG_T(6),at:LG_T(8),k:'Ages 6 to 12',sv:'Lung function starts to slip',sub:'FEV1 % predicted, pre-modulator cohorts',
  t:'School age: FEV1 starts to slip',
  txt:'In the Epidemiologic Study of CF, mean FEV1 fell 1.12 points a year at ages 6–8 (baseline 88.4%; n = 1,811) and 2.39 a year at 9–12 (baseline 85.3%; n = 1,696) [[Konstan2007]]. A high baseline and persistent crackles predicted faster decline in every age group [[Konstan2007]]. MSSA was most prevalent at ages 6–17 [[Razvi2009]], and from age 6 traditional CF germs dominated BAL samples [[Zemanick2017]].',
  pt:'FEV1 is how much air you can blow out in one second. Before modulators it tended to drift down a little each year [[Konstan2007]].',
  hook:'Pre-modulator FEV1 decline: about 1–2.4 points a year in children and adolescents [[Konstan2007]].'},
 {from:LG_T(13),at:LG_T(14),k:'Ages 13 to 17',sv:'Pseudomonas turns mucoid',sub:'a slimy, biofilm-forming form',
  t:'Adolescence: Pseudomonas turns mucoid',
  txt:'Mucoid P. aeruginosa was first acquired at a median age of 13.0 years, a median 10.9 years after the non-mucoid form, and worsening cough, X-ray and lung function tracked best with that switch [[Li2005]]. FEV1 fell 2.34 points a year at 13–17 (baseline 78.4%) [[Konstan2007]]. P. aeruginosa prevalence at 11–17 fell from 68.9% (1995) to 55.5% (2005), while MRSA was highest in this age group [[Razvi2009]].',
  pt:'Mucoid Pseudomonas wraps itself in slime and grows as a biofilm, which helps it survive antibiotics [[Singh2000,Worlitzsch2002]].',
  hook:'Order of germs: S. aureus and H. influenzae in childhood, then P. aeruginosa, which turns mucoid over years (median age 13) [[Razvi2009,Li2005]].'},
 {from:LG_T(18),at:LG_T(21),k:'Ages 18 to 25',sv:'Flare-ups, bleeding, air leaks',sub:'exacerbations, haemoptysis, pneumothorax',
  t:'Young adults: exacerbations, haemoptysis and pneumothorax',
  txt:'In 318 London young adults (18–22), the mean FEV1 slope was −1.53 points a year, improving across birth cohorts from −2.49 to −0.65 [[Que2006]]. Massive haemoptysis (mean age 24.2) and pneumothorax (mean age 21.9) struck about 0.87% and 0.64% of people a year in the 1990s US registry, mostly with FEV1 below 40% [[Flume2005Hemoptysis,Flume2005Pneumothorax]]. In the historical Toronto cohort, FEV1 below 30% went with 2-year mortality above 50%, a population figure, not a prediction [[Kerem1992]].',
  pt:'A "flare-up" (pulmonary exacerbation) means breathing symptoms get worse for a while, and it is often treated with antibiotics. About 1 in 4 people do not get all their lung function back afterwards [[VanDevanter2021,Sanders2010]].',
  hook:'Massive haemoptysis about 0.87% and pneumothorax about 0.64% of people a year (1990s US registry) [[Flume2005Hemoptysis,Flume2005Pneumothorax]].'},
 {from:LG_T(25),at:LG_T(32),k:'Age 25 and over',sv:'Older airways, new organisms',sub:'NTM, fungi, and what modulators changed',
  t:'Adults: older airways, new organisms, and modulators',
  txt:'Microbial diversity falls with age and plateaus at about 25 [[Coburn2015]]. NTM were found in 13.0% of people aged 10 or over, mostly M. avium complex (72%) and M. abscessus (16%), with older age the strongest predictor [[Olivier2003]]. ABPA ran at about 10% from age 6 on in Europe [[Mastella2000]]. Since ETI, registry FEV1 rose 8.2 points in year 1 and exacerbations fell 79% [[Bower2023]], so these pre-modulator trajectories no longer describe many people.',
  pt:'Numbers in this guide describe large groups of people. They cannot tell what will happen to any one person [[Bower2023,Kerem1992]].',
  hook:'NTM prevalence in CF is about 13–14%; M. avium complex predominates, but M. abscessus can pass between people [[Olivier2003,Adjemian2014,Bryant2016]].'}
];
/* germ lanes: schematic intensity by age (order of appearance only), with the pass's figures as dots */
const LG_LANES=[
 {n:'S. aureus (MSSA)',col:'var(--gold)',f:a=>Math.min(ramp(a,0,4),1-.5*ramp(a,17,32)),d:[[11,'MSSA highest at 6–17 y (US)']]},
 {n:'H. influenzae',col:'var(--na)',f:a=>ramp(a,0,1)*(1-.8*ramp(a,6,16)),d:[]},
 {n:'P. aeruginosa',col:'var(--bact)',f:a=>.7*ramp(a,.5,6)+.3*ramp(a,12,25),d:[[1,'median 1.0 y to acquire'],[3,'72.5% by 3 y (culture)'],[8,'36.1% at 6–10 y (US 2005)'],[14,'55.5% at 11–17 y (US 2005)']]},
 {n:'mucoid P. aeruginosa',n2:'mucoid form',col:'var(--mucus-thick)',f:a=>ramp(a,8,20),d:[[13,'mucoid: median 13 y']]},
 {n:'MRSA',col:'var(--bad)',f:a=>ramp(a,6,11)*(1-.5*ramp(a,17,28)),d:[[15,'MRSA highest at 11–17 y']]},
 {n:'NTM',col:'var(--brand)',f:a=>ramp(a,10,35),d:[[22,'NTM 13% at ≥10 y']]}];
const LG_FEV=[[6,88.4],[9,85.3],[13,78.4],[17,69.0],[22,62.9]];
const LG_CY=[
 {from:0,at:.12,k:'Turn 1',sv:'Obstruction',big:'mucus first',lines:['AREST CF: mucus flakes and neutrophils','raised even without CT changes or infection','thick mucus builds steep oxygen gradients'],
  t:'Obstruction: mucus that does not clear',
  txt:'In AREST CF preschoolers, total mucins and MUC5B/MUC5AC mucus flakes were raised with or without infection, and children with normal CTs already had raised flakes and neutrophils <span class="ev early">Early evidence</span> [[Esther2019]]. The flakes did not dissolve with N-acetylcysteine or DNase, only with an experimental reducing agent [[Esther2019]]. Thick mucus on CF epithelium develops steep oxygen gradients even before infection [[Worlitzsch2002]].',
  pt:'Thick mucus sits in the small airways like a plug, and the air beneath it gets low in oxygen [[Worlitzsch2002,Esther2019]].',
  hook:'Mucus burden appears to come before infection and structural damage in young children [[Esther2019]].'},
 {from:.2,at:.32,k:'Turn 2',sv:'Infection',big:'biofilm',lines:['P. aeruginosa lives in hypoxic mucus masses','low oxygen drives more alginate (slime)','sputum signals match biofilm growth'],
  t:'Infection: germs settle into the mucus',
  txt:'In established CF lung disease, P. aeruginosa lived inside hypoxic mucopurulent masses in the airway lumen, and responded to low oxygen by making more alginate [[Worlitzsch2002]]. Quorum-sensing signals in CF sputum matched those of P. aeruginosa grown as biofilms rather than in broth, which helps explain why infection persists despite antibiotics <span class="ev est">Established</span> [[Singh2000]].',
  pt:'Thick mucus traps germs. Inside it, Pseudomonas makes a slimy shield (a biofilm) that antibiotics struggle to get through [[Singh2000,Elborn2016]].',
  hook:'Biofilm growth (quorum-sensing profile) explains persistent P. aeruginosa infection [[Singh2000]].'},
 {from:.4,at:.52,k:'Turn 3',sv:'Inflammation',big:'−2.9% FEV1',lines:['per 1-log rise in sputum elastase','dying neutrophils release DNA: viscous sputum','raised in screened infants from 4 weeks'],
  t:'Inflammation: neutrophils pour in',
  txt:'Across 269 people aged 9–54, sputum free neutrophil elastase correlated with lower FEV1 (r = −0.35), and each 1-log rise went with a further −2.9% FEV1 decline (95% CI −5.0 to −0.9) over time [[MayerHamblett2007]]. Free DNA from dying neutrophils makes purulent CF sputum viscous; recombinant DNase I turned it from a gel to a flowing liquid within minutes [[Shak1990]].',
  pt:'Thick mucus traps germs, and the body\'s defence cells rush in. Over time the fight itself damages the airways [[Elborn2016,Sly2013]].',
  hook:'Neutrophil elastase is both a marker and a driver of CF lung damage [[MayerHamblett2007,Sagel2012]].'},
 {from:.6,at:.72,k:'Turn 4',sv:'Damage',big:'OR 3.02',lines:['BAL elastase → bronchiectasis (AREST CF)','once seen, persists in 74% of paired scans','and grows in extent in 63%'],
  t:'Damage: the airways widen and scar',
  txt:'Free neutrophil elastase in BAL was a risk factor for bronchiectasis (OR 3.02; 95% CI 1.70–5.35) [[Sly2013]]. Once bronchiectasis appeared on CT it persisted in 74% of paired annual scans and grew in extent in 63%, with progression linked to severe genotype, worsening neutrophilic inflammation and infection [[Mott2012]]. Widened, scarred airways clear mucus even less well, and the cycle turns again.',
  pt:'Bronchiectasis means airways that have become permanently wider and floppy, so mucus pools in them [[Sly2013,Elborn2016]].',
  hook:'Neutrophil elastase in BAL fluid in infancy predicts bronchiectasis (OR 3.02) [[Sly2013]].'},
 {from:.8,at:.9,k:'Breaking it',sv:'Ways to break the cycle',big:'3 ways in',lines:['rehydrate the surface (hypertonic saline)','cut neutrophil DNA (dornase alfa)','restore CFTR itself (modulators)'],
  t:'Breaking the cycle',
  txt:'Inhaled 7% hypertonic saline sped up mucus clearance and improved FEV1, fitting the rehydration idea [[Donaldson2006]]. Dornase alfa cut the share with an exacerbation needing IV antibiotics from 27% to 22% and 19% [[Fuchs1994Dornase]]. Starting ETI, registry exacerbations fell from 0.86 to 0.18 per person a year [[Bower2023]], and sputum germ density fell 2–3 log₁₀, though most infections persisted [[Nichols2023]].',
  pt:'Newer CFTR medicines help the gate work better. In studies, people had fewer flare-ups, clearer lung scans and fewer germs in their sputum [[Bower2023,Graeber2022,Nichols2023]].',
  hook:'About 1 in 4 IV-treated exacerbations ends without recovery to baseline FEV1 [[Sanders2010]].'}
];
const LG_IC={
 exac:{v:25,big:'25 in 100',lines:['IV-treated exacerbations that did not get back','to 90% of the best FEV1 within 3 months','US registry 2003–2006, 8,479 exacerbations'],cap:'A quarter of IV-treated exacerbations did not recover to at least 90% of the pre-exacerbation best FEV1 within 3 months [[Sanders2010]].'},
 hae:{v:4.1,big:'4.1 in 100',lines:['people with massive haemoptysis','over a 10-year registry (0.87 in 100 a year)','US registry 1990–1999, 28,858 people'],cap:'Massive haemoptysis occurred in 4.1% of people over the decade, an average of 0.87% a year; nearly 60% of those affected had FEV1 below 40% predicted [[Flume2005Hemoptysis]].'},
 ptx:{v:3.4,big:'3.4 in 100',lines:['people with a spontaneous pneumothorax','over a 10-year registry (0.64 in 100 a year)','US registry 1990–1999'],cap:'Spontaneous pneumothorax occurred in 3.4% overall, an average of 0.64% a year; nearly 75% of those affected had FEV1 below 40% [[Flume2005Pneumothorax]].'},
 abpa:{v:7.8,big:'7.8 in 100',lines:['people with ABPA','European registry, 12,447 people, 9 countries','2.1% (Sweden) to 13.6% (Belgium)'],cap:'ABPA prevalence was 7.8% in the European registry [[Mastella2000]]; a meta-analysis pooled 8.9%, with Aspergillus sensitisation at 39.1% [[Maturu2015]]. The US reported 2%, probably under-diagnosed [[Geller1999]].'},
 ntm:{v:13,big:'13 in 100',lines:['people aged 10 or over with NTM in sputum','21 US centres, 986 people (7–24% by centre)','M. avium complex 72%, M. abscessus 16%'],cap:'NTM prevalence was 13.0% in a 21-centre US study, with older age the strongest predictor [[Olivier2003]]; 14% of cultures were positive in 2010–2011 registry data [[Adjemian2014]].'}};
inits.lungs=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:600';
  /* ---------- main: a lifetime ---------- */
  const svg=$('#lgSvg'),rg=$('#lgT'),note=$('#lgNote');let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 430','400 700'),a=LG_AGE(t),p=phaseOf(LG_STEPS,t),P=LG_STEPS[p];
    const L=N?{lx:200,ly:168,ls:.92,ax:14,ay:72,bx:14,by:292,bw:372,cx0:10,cx:116,cw:272,lt:322,l0:332,lh:26,ft:508,fy:516,fh:66,axY:598,sy:650,sx:14,sw:372}
             :{lx:140,ly:222,ls:1.08,ax:140,ay:96,bx:20,by:364,bw:240,cx0:290,cx:410,cw:294,lt:62,l0:72,lh:25,ft:248,fy:256,fh:80,axY:350,sy:398,sx:16,sw:688};
    const X=v=>L.cx+L.cw*v/40;
    let g=tx(N?14:16,N?24:26,P.sv,'t-big','fill:var(--brand)')+tx(N?14:16,N?40:42,P.sub,'t-sm');
    /* lungs */
    const plugs=.1+.75*ramp(a,0,20),bx=.95*Math.pow(ramp(a,.2,28),.8),inf=.1+.6*ramp(a,.1,25);
    const LG=lungs(L.lx,L.ly,L.ls,{bx,plugs,inflam:inf,labels:true,id:'lgL'});g+=LG.svg;
    const nb=Math.round(10*ramp(a,.5,16)),muc=ramp(a,10,20),tips=LG.at.tips;
    for(let i=0;i<nb;i++){const q=tips[(i*5+2)%tips.length];g+=bacterium(q[0]+((i%3)-1)*4,q[1]-3,9,{ang:i*47,flag:false,mucoid:muc})}
    const ageTxt=a<1?Math.max(1,Math.round(a*12))+' months':a<1.95?'1 year':Math.round(a)+' years';
    g+=tx(L.ax,L.ay,'age '+ageTxt,N?'t-big':'t-big t-mid','font-size:20px');
    /* three meters under the lungs */
    [['mucus plugs',plugs,'var(--mucus-thick)'],['widening',bx,'var(--bronchi)'],['inflamed',inf,'var(--inflamed)']].forEach((m,i)=>{
      const w=(L.bw-16)/3,x=L.bx+i*(w+8),y=L.by;g+=tx(x,y,m[0],'t-xs',INK)+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w*clamp(m[1]))}" height="7" rx="3.5" style="fill:${m[2]}"/>`});
    /* germ lanes */
    g+=tx(L.cx0,L.lt-(N?0:0),'WHO GROWS IN SPUTUM · usual order by age','t-xs',`letter-spacing:.06em;${INK}`);
    let last=null;
    LG_LANES.forEach((ln,i)=>{const y=L.l0+i*L.lh,h=L.lh-7;g+=tx(L.cx0,y+h*.72,N&&ln.n2?ln.n2:ln.n,'t-xs',a>.3&&ln.f(a)>.15?INK:'');
      g+=`<rect x="${f1(L.cx)}" y="${f1(y)}" width="${f1(L.cw)}" height="${f1(h)}" rx="4" style="fill:var(--panel-2)"/>`;
      for(let yr=0;yr<40;yr+=.5){if(yr>a)break;const w=Math.min(.5,a-yr),o=ln.f(yr+w/2);if(o<.03)continue;
        g+=`<rect x="${f1(X(yr))}" y="${f1(y)}" width="${f1(L.cw*w/40+.4)}" height="${f1(h)}" style="fill:${ln.col};opacity:${f1(.12+.78*o)}"/>`}
      ln.d.forEach(d=>{if(d[0]<=a){g+=`<circle cx="${f1(X(d[0]))}" cy="${f1(y+h/2)}" r="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;if(!last||d[0]>=last.a)last={a:d[0],s:d[1],x:X(d[0]),y:y+h/2}}})});
    if(last){const w=last.s.length*5.9+12,x1=Math.max(last.x,X(a))+8,bx0=x1+w<=L.cx+L.cw?x1:last.x-8-w,by0=last.y-8;
      g+=`<rect x="${f1(bx0)}" y="${f1(by0)}" width="${f1(w)}" height="16" rx="4" style="fill:var(--ink)"/>`+tx(bx0+6,by0+11.5,last.s,'t-xs','fill:var(--panel);font-weight:600')}
    /* FEV1 line */
    g+=tx(L.cx0,L.ft,'FEV1 % PREDICTED · schematic, pre-modulator cohorts','t-xs',`letter-spacing:.06em;${INK}`);
    const Y=v=>L.fy+L.fh*(1-(v-50)/50);
    g+=`<rect x="${f1(L.cx)}" y="${f1(L.fy)}" width="${f1(L.cw)}" height="${f1(L.fh)}" style="fill:var(--field)"/>`;
    [50,75,100].forEach(v=>{g+=`<line x1="${f1(L.cx)}" x2="${f1(L.cx+L.cw)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(L.cx-5,Y(v)+3,v+'%','t-xs t-end')});
    const fn=monoFn(LG_FEV),amax=Math.min(a,22);
    if(amax>6){let d='';for(let i=0;i<=60;i++){const v=6+(amax-6)*i/60;d+=(i?'L':'M')+f1(X(v))+' '+f1(Y(fn(v)))}
      g+=`<path d="${d}" style="fill:none;stroke:var(--dx);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`;
      LG_FEV.slice(0,3).forEach((q,i)=>{if(q[0]<=a){g+=`<circle cx="${f1(X(q[0]))}" cy="${f1(Y(q[1]))}" r="3.6" style="fill:var(--dx);stroke:var(--panel);stroke-width:1.5"/>`+tx(X(q[0]),Y(q[1])+(i===1?14:-7),q[1],'t-xs t-mid',INK)}});
      const c=[X(amax),Y(fn(amax))];g+=`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="5" style="fill:var(--dx);stroke:var(--panel);stroke-width:2"/>`;
      const sl=a<9?'−1.12 / y':a<13?'−2.39 / y':a<18?'−2.34 / y':'−1.53 / y';
      if(a<=22.5)g+=tx(c[0]+8,c[1]+14,sl,'t-xs',INK)}
    else g+=tx(L.cx+L.cw/2,L.fy+L.fh/2+3,'spirometry from about age 6 in these cohorts','t-xs t-mid');
    if(a>22)g+=tx(X(23),Y(58),'line stops at 22 y','t-xs');
    if(p===5){const o=ramp(t,LG_STEPS[5].from,LG_STEPS[5].from+.05);g+=`<g style="opacity:${f1(o)}"><rect x="${f1(L.cx+L.cw-150)}" y="${f1(L.fy+4)}" width="146" height="${N?30:34}" rx="6" style="fill:var(--rx-soft)"/>${tx(L.cx+L.cw-144,L.fy+(N?16:18),'on ETI (registry): FEV1','t-xs','fill:var(--rx);font-weight:700')}${tx(L.cx+L.cw-144,L.fy+(N?28:31),'+8.2 points in year 1','t-xs','fill:var(--rx);font-weight:700')}</g>`}
    /* age axis and cursor */
    const ax=tline(L.cx,L.axY,L.cw,{min:0,max:40,step:5,fmt:v=>v});g+=ax.svg+tx(L.cx+L.cw,L.axY+28,'age (years)','t-xs t-end');
    g+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${f1(L.l0-4)}" y2="${f1(L.axY)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3;opacity:.6"/>`;
    /* step strip */
    const sw=L.sw/6;LG_STEPS.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;g+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/>`+tx(x+sw/2,L.sy+19,['0–1','1–5','6–12','13–17','18–25','25+'][i],'t-xs t-mid',on?INK:'')});
    g+=`<circle cx="${f1(L.sx+L.sw*clamp(t))}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=g;note.innerHTML=noteHTML(P);setSt(p);
    rg.setAttribute('aria-valuetext',`Age ${ageTxt}: ${P.t}`)}
  const stop=playWire(rg,$('#lgPlay'),draw,30000,'%t:player.replay%','lungs');
  setSt=stepWire($('#lgSteps'),LG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the vicious cycle ---------- */
  const cs=$('#lgCyc'),cr=$('#lgCyT'),cn=$('#lgCyNote');let setCy=()=>{};
  function airway(cx,cy,r,o){/* one airway in cross-section: wall, lumen, mucus, bacteria, neutrophils */
    const rr=rng(13),dil=o.dil,wr=r*(1+.25*dil),wall=r*(.2+.12*o.dam);let s='';
    const P=[];for(let i=0;i<14;i++){const an=i/14*Math.PI*2,k=1+(rr()-.5)*.12*(1+o.dam*2);P.push([cx+Math.cos(an)*wr*k,cy+Math.sin(an)*wr*k])}
    s+=`<path d="${smoothPath(P)}" style="fill:var(--airway);stroke:var(--bronchi);stroke-width:1.4"/>`;
    if(o.inf>0)s+=`<path d="${smoothPath(P)}" style="fill:var(--inflamed);opacity:${f1(o.inf*.35)}"/>`;
    const Q=P.map(([x,y])=>[cx+(x-cx)*(1-wall/wr),cy+(y-cy)*(1-wall/wr)]);
    s+=`<path d="${smoothPath(Q)}" style="fill:var(--field);stroke:var(--bronchi);stroke-width:1"/>`;
    const lr=wr-wall;
    if(o.muc>0)s+=mucusPlug(cx,cy+lr*.1,lr*(.35+.5*o.muc),{thick:.3+.6*o.muc,seed:5,wob:o.ph*.3});
    const nb=Math.round(o.bac*7);for(let i=0;i<nb;i++){const an=i*2.1+.4,d=lr*.35*(.4+.6*((i*7)%5)/5);s+=bacterium(cx+Math.cos(an)*d,cy+lr*.1+Math.sin(an)*d*.8,lr*.2,{ang:i*50,flag:false,mucoid:o.bio})}
    const nn=Math.round(o.neu*7);for(let i=0;i<nn;i++){const an=-1.2+i*.9+Math.sin(o.ph*2+i)*.08,d=lr*(.62+.12*(i%2)),nx=cx+Math.cos(an)*d,ny=cy+Math.sin(an)*d;
      s+=`<circle cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(lr*.11)}" style="fill:var(--cell);stroke:var(--nucleus);stroke-width:1.2"/><path d="M${f1(nx-lr*.06)} ${f1(ny)}q${f1(lr*.03)} ${f1(-lr*.06)} ${f1(lr*.06)} 0t${f1(lr*.06)} 0" style="fill:none;stroke:var(--cftr);stroke-width:1.6;stroke-linecap:round"/>`}
    return s}
  function drawCy(t){const N=vb(cs,'720 360','400 640'),p=phaseOf(LG_CY,t),P=LG_CY[p];
    const C=N?{x:200,y:190,R:122,r:58,px:14,py:376,sy:612,sx:14,sw:372}:{x:192,y:178,R:122,r:58,px:396,py:52,sy:334,sx:16,sw:688};
    const names=['Obstruction','Infection','Inflammation','Damage'],ang=i=>-Math.PI/2+i*Math.PI/2,pos=i=>[C.x+Math.cos(ang(i))*C.R,C.y+Math.sin(ang(i))*C.R];
    let g=`<defs>${marker('lgCyA','var(--muted)',7)}</defs>`;
    /* ring arcs */
    for(let i=0;i<4;i++){const a0=ang(i)+.36,a1=ang(i+1)-.36,act=p===i||(p===4);
      g+=`<path d="M${f1(C.x+Math.cos(a0)*C.R)} ${f1(C.y+Math.sin(a0)*C.R)}A${C.R} ${C.R} 0 0 1 ${f1(C.x+Math.cos(a1)*C.R)} ${f1(C.y+Math.sin(a1)*C.R)}" style="fill:none;stroke:${act?'var(--brand)':'var(--line)'};stroke-width:${act?2.4:1.6}" marker-end="url(#lgCyA)"/>`}
    /* the travelling dot */
    const u=p<4?ramp(t,P.from,P.from+.2):((t-.8)/.2*2)%1,an=ang(p<4?p:Math.floor(((t-.8)/.2)*8)%4)+(Math.PI/2)*ease(clamp(u));
    g+=`<circle cx="${f1(C.x+Math.cos(an)*C.R)}" cy="${f1(C.y+Math.sin(an)*C.R)}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    /* nodes */
    names.forEach((n,i)=>{const [x,y]=pos(i),on=i===p,w=104;g+=`<rect x="${f1(x-w/2)}" y="${f1(y-15)}" width="${w}" height="30" rx="15" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--line)'};stroke-width:1.4"/>`+tx(x,y+4,n,'t-sm t-mid',`font-weight:700;fill:${on?'var(--on-brand)':'var(--ink)'}`)});
    /* the airway vignette: everything builds as the cycle turns */
    const prog=p===4?1:clamp((t)/.8);
    g+=airway(C.x,C.y,C.r*(N?.86:.9),{muc:clamp(.25+.75*ramp(prog,0,.25)),bac:ramp(prog,.25,.45),bio:ramp(prog,.3,.5),neu:ramp(prog,.5,.65),inf:ramp(prog,.5,.7),dam:ramp(prog,.75,.95),dil:ramp(prog,.75,.95)*(p===4?.8:1),ph:t*20});
    /* break points */
    if(p===4){const o=ramp(t,.8,.86),tag=(x,y,s,anc)=>`<g style="opacity:${f1(o)}"><rect x="${f1(anc==='e'?x-s.length*5.9-12:x)}" y="${f1(y-10)}" width="${f1(s.length*5.9+12)}" height="18" rx="9" style="fill:var(--rx)"/>${tx(anc==='e'?x-6:x+6,y+3,s,`t-xs${anc==='e'?' t-end':''}`,'fill:var(--panel);font-weight:700')}</g>`;
      const a01=ang(.5),a23=ang(3.5);
      g+=tag(C.x+Math.cos(a01)*C.R+8,C.y+Math.sin(a01)*C.R-14,'rehydrate','s');
      g+=tag(C.x+Math.cos(ang(1.5))*C.R+8,C.y+Math.sin(ang(1.5))*C.R+14,'cut DNA','s');
      g+=tag(C.x+Math.cos(a23)*C.R-8,C.y+Math.sin(a23)*C.R-6,'restore CFTR','e')}
    /* panel */
    g+=tx(C.px,C.py,P.k.toUpperCase(),'t-xs','letter-spacing:.1em')+tx(C.px,C.py+24,P.sv,'t-big','fill:var(--brand);font-size:20px');
    g+=tx(C.px,C.py+(N?66:74),P.big,'t-big',`font-size:${N?30:34}px;fill:var(--ink)`);
    P.lines.forEach((l,i)=>{g+=tx(C.px,C.py+(N?96:112)+i*(N?20:24),'· '+l,'t-sm','fill:var(--ink)')});
    const sw=C.sw/5;LG_CY.forEach((q,i)=>{const on=i===p,x=C.sx+i*sw;g+=`<rect x="${f1(x+1)}" y="${C.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/>`+tx(x+sw/2,C.sy+19,q.sv.split(' ')[0].toLowerCase(),'t-xs t-mid',on?INK:'')});
    g+=`<circle cx="${f1(C.sx+C.sw*clamp(t))}" cy="${C.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    cs.innerHTML=g;cn.innerHTML=noteHTML(P);setCy(p)}
  const cStop=playWire(cr,$('#lgCyPlay'),drawCy,22000,'%t:player.replay%','lungs');
  setCy=stepWire($('#lgCySteps'),LG_CY,cr,drawCy,cStop);
  drawCy(+cr.value);

  /* ---------- complications: 100 people ---------- */
  const ic=$('#lgIc'),icc=$('#lgIcCap');let icK='exac',icV=LG_IC.exac.v,icStop=null;
  function drawIc(v){const N=vb(ic,'720 240','400 420'),D=LG_IC[icK];
    const gx=N?104:24,gy=N?14:14,sz=16,gp=4;let g='';
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),x=gx+c*(sz+gp),y=gy+r*(sz+gp*1.3),fill=clamp(v-i);
      g+=`<circle cx="${f1(x+sz/2)}" cy="${f1(y+sz/2)}" r="${f1(sz*.42)}" style="fill:var(--panel-2)"/>`;
      if(fill>0)g+=`<circle cx="${f1(x+sz/2)}" cy="${f1(y+sz/2)}" r="${f1(sz*.42*Math.sqrt(fill))}" style="fill:${icK==='exac'?'var(--bad)':'var(--brand)'}"/>`}
    const px=N?14:262,py=N?262:54;
    g+=tx(px,py,D.big,'t-big',`font-size:${N?32:38}px;fill:${icK==='exac'?'var(--bad)':'var(--brand)'}`);
    D.lines.forEach((l,i)=>{g+=tx(px,py+(N?30:36)+i*(N?20:22),l,i?'t-sm':'t-lbl',i?'':'')});
    g+=tx(px,py+(N?100:118),'one dot = 1 in 100; part-filled dots show fractions','t-xs');
    ic.innerHTML=g}
  function setIc(k){if(icStop)icStop();icK=k;const v0=0,v1=LG_IC[k].v;$$('[data-ic]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ic===k));icc.innerHTML=LG_IC[k].cap;
    icStop=animate(800,q=>{icV=lerp(v0,v1,ease(q));drawIc(icV)},()=>{icStop=null})}
  $$('[data-ic]').forEach(b=>b.addEventListener('click',()=>setIc(b.dataset.ic)));
  icc.innerHTML=LG_IC.exac.cap;drawIc(icV);
  {const pr=redraws.lungs;redraws.lungs=()=>{pr&&pr();drawIc(icV)}}
};
