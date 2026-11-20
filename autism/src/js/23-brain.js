/* =============== 2.3 The developing brain =============== */
/* Timeline: t 0..0.22 = gestational week 20 to birth, 0.22..0.72 = birth to 24 months, 0.72..1 = 24 to 48 months.
   Ages are in months relative to birth (GW20 is about -4.6). */
const BR_K=[[0,-4.6],[.22,0],[.72,24],[1,48]];
function brAge(t){for(let i=1;i<BR_K.length;i++)if(t<=BR_K[i][0]){const A=BR_K[i-1],B=BR_K[i];return lerp(A[1],B[1],(t-A[0])/(B[0]-A[0]))}return 48}
function brT(a){for(let i=1;i<BR_K.length;i++)if(a<=BR_K[i][1]){const A=BR_K[i-1],B=BR_K[i];return lerp(A[0],B[0],(a-A[1])/(B[1]-A[1]))}return 1}
function brAgeLbl(a){if(a<0){const w=Math.round(40+a*40/9.2);return 'gestational week '+w}if(a<24)return f1(a).replace('.0','')+' months';return (a/12).toFixed(1).replace('.0','')+' years'}
/* total brain volume index, birth = 100: +101% in year 1, +15% in year 2 (Knickmeyer 2008). Prenatal part and the
   part after 24 months are drawn, not measured. */
function brVol(a){if(a<0)return lerp(100,22,Math.pow(-a/4.6,1.3));if(a<=12)return 100+101*(1-Math.pow(1-a/12,1.7));if(a<=24)return 201+30*(1-Math.pow(1-(a-12)/12,1.5));return 231+12*(1-Math.exp(-(a-24)/14))}
/* the later-diagnosed group average: direction only (surface area first, then volume, Hazlett 2017); size not to scale */
const brVolA=a=>brVol(a)*(1+.08*ramp(a,11,24));
/* synapse density, relative units (schematic heights): auditory peaks near 3 months, prefrontal after 15 months */
function brSyn(r,a){const on=-3.2;if(a<on)return 0;
  if(r==='aud'){if(a<3)return 2.6*Math.pow((a-on)/(3-on),1.4);return 1+1.6*Math.exp(-(a-3)/40)}
  if(a<18)return 2.6*Math.pow((a-on)/(18-on),1.6);return 2.6-.05*(a-18)/30}
const BR_TICK=[[-4.6,'GW20'],[0,'birth'],[6,'6'],[12,'12'],[18,'18'],[24,'24'],[36,'36'],[48,'48 mo']];
const BR_NOTE=[[-4.6,'Neurons made from embryonic day 42 migrate','and build the cortex from the inside out.'],
  [-3.2,'Synapses start forming in the cortex','before 27 weeks of gestation.'],
  [0,'Year 1: brain volume +101%, grey matter','+149%, cerebellum +240% (group means).'],
  [2,'2–6 months: eye-looking falls in infants','later diagnosed, after a typical start.'],
  [6,'6–12 months: faster surface-area growth in','infants later diagnosed (group average).'],
  [12,'12–24 months: volume overgrowth in that','group, linked to social differences.'],
  [24,'Year 2: +15% volume. Diagnosis rests on','behaviour: no scan or blood test for it.']];

const BR_STEPS=[
 {from:0,at:brT(-4),k:'Gestational weeks 20–26',t:'Building the cortex',
  txt:`<span class="ev est">Established</span> Human brain development begins in the third gestational week. Neuron production starts on embryonic day 42 and is largely complete by midgestation in most areas. Neurons migrate along radial glial guides and build the six-layered cortex "inside-out": the first arrivals form layer 6. Thalamocortical axons reach the cortex around week 22, and these pathways are complete by about week 26. [[Stiles2010]] <span class="ev early">Early evidence</span> Focal patches of disorganised cortical layers were found in tissue from 10 of 11 autistic children and 1 of 11 non-autistic children, pointing to prenatal differences in layer formation. [[Stoner2014]] Networks of high-confidence autism genes converged on midfetal layer 5/6 projection neurons. [[Willsey2013]]`,
  pt:`The brain's outer layer is built before birth, layer by layer, from the inside out. Some autism-related differences seem to start this early.`,
  hook:`Neurogenesis from about E42, largely complete by midgestation; cortex built inside-out (layer 6 first).`},
 {from:brT(-3.2),at:brT(-1.6),k:'Gestational weeks 27–40',t:'The first synapses',
  txt:`<span class="ev est">Established</span> Synapse formation in the cortex begins before 27 weeks of conceptional age. [[Huttenlocher1997]] Of 102 autism risk genes found by exome sequencing in 11,986 autistic people, most act in gene-expression regulation or neuronal communication and are expressed early in brain development, in both excitatory and inhibitory neuron lineages. [[Satterstrom2020]] <span class="ev early">Early evidence</span> An integrative analysis found autism genes clustered in modules for early transcriptional regulation and synaptic development. [[Parikshak2013]]`,
  pt:`Before birth the brain starts wiring its cells together. Many genes linked to autism are busy exactly then, helping cells switch genes on and talk to each other.`,
  hook:`Most of the 102 Satterstrom genes: gene-expression regulation or neuronal communication, expressed early.`},
 {from:brT(0),at:brT(3),k:'Birth to 6 months',t:'Fast growth, first peaks',
  txt:`<span class="ev est">Established</span> In 98 healthy children scanned from birth to age 2, total brain volume rose 101% in the first year: grey matter grew 149%, cerebellar volume 240%. [[Knickmeyer2008]] Synaptic density peaks near 3 months after birth in auditory cortex. [[Huttenlocher1997]] <span class="ev early">Early evidence</span> In 110 infants, the 12 later diagnosed with autism showed eye fixation starting at typical levels and then declining from 2 to 6 months (−4.8% a month, against +3.6% a month in typically developing infants): present, then fading, not absent from birth. [[Jones2013Eyes]]`,
  pt:`A baby's brain about doubles in size in the first year. Many babies later diagnosed make eye contact at first, and it fades over the following months.`,
  hook:`Brain volume +101% in year 1 (Knickmeyer). Eye-looking in infants later diagnosed is typical at 2 months, then declines (Jones & Klin 2013).`},
 {from:brT(6),at:brT(9),k:'6–12 months',t:'Surface area expands early',
  txt:`<span class="ev early">Early evidence</span> In 106 high-familial-likelihood and 42 low-likelihood infants, cortical surface-area hyperexpansion at 6–12 months came before brain-volume overgrowth at 12–24 months in the 15 infants diagnosed at 24 months. A deep-learning model using mainly 6–12-month surface-area data had a positive predictive value of 81% and sensitivity of 88% in high-likelihood infants: a research cohort, not a clinical test. [[Hazlett2017]] Infants later diagnosed also had 18% more extra-axial fluid (around the brain) at 6 months. [[Shen2017]] Resting-state connectivity at 6 months classified 9 of 11 later-diagnosed infants in a sample of 59. [[Emerson2017]] Switch to <b>Individual variation</b>: these are group averages.`,
  pt:`In research studies of baby brothers and sisters of autistic children, the brain's surface grew a little faster on average in those later diagnosed. This is a group finding, not a test for one baby.`,
  hook:`Hazlett 2017 order: surface area (6–12 mo) first, then volume (12–24 mo). Research prediction only.`},
 {from:brT(12),at:brT(18),k:'12–24 months',t:'Volume, and the head-size debate',
  txt:`<span class="ev early">Early evidence</span> Brain-volume overgrowth at 12–24 months was linked to the emergence and severity of autistic social differences. [[Hazlett2017]] <span class="ev est">Established</span> Volume rose another 15% in year 2 in typical development, and synaptic density in prefrontal cortex does not peak until after 15 months. [[Knickmeyer2008,Huttenlocher1997]] <span class="ev hyp">Hypothesis</span>, later contested: a 2003 chart study reported accelerated head growth in 59% of infants with autistic disorder against 6% of healthy infants. [[Courchesne2003HC]] A 2013 reappraisal showed that typical children also "overgrew" against classical population norms, so much of early overgrowth reflected norm bias. [[Raznahan2013]] A meta-analysis found macrocephaly in 15.7% of autistic people: a subgroup. [[Sacco2015]]`,
  pt:`Some autistic toddlers have larger heads or brains, but most do not. Head size is not a useful sign of autism.`,
  hook:`Early overgrowth: present in a subgroup (macrocephaly 15.7%), largely a norm artefact in head-circumference charts (Raznahan 2013). [[Lord2018]]`},
 {from:brT(24),at:brT(38),k:'2–4 years and beyond',t:'Pruning, and a behavioural diagnosis',
  txt:`<span class="ev est">Established</span> Typical development overbuilds and then trims: pruning removes up to 50% of the connections first made. [[Stiles2010]] Prefrontal spine density in childhood is two to three times the adult value, and elimination continues into the third decade. [[Petanjek2011]] <span class="ev early">Early evidence</span> Postmortem autistic temporal cortex had more spines with less developmental pruning, tracking overactive mTOR signalling. [[Tang2014]] <span class="ev est">Established</span> There are no reliable biomarkers: autism is diagnosed from behaviour and developmental history. [[Lord2018,Lord2020NRDP]] In about 1,000 people, anatomical MRI classifiers reached under 60% accuracy. [[Haar2016]]`,
  pt:`The brain makes extra connections early and trims the unused ones over childhood and the teenage years. No scan or blood test can tell whether someone is autistic.`,
  hook:`No brain scan or blood test diagnoses autism. Anatomical MRI classifiers: under 60% accuracy (Haar 2016).`}];

inits.brain=()=>{
  const svg=$('#brSvg'),rg=$('#brT');let mode='avg',ei='bal',reg='aud',setSt=()=>{};
  const RR=rng(77),DOTS=[...Array(26)].map(()=>({a:RR(),b:RR(),g:RR()<.5}));
  /* Box-Muller from the seeded generator: individual offsets in volume, in standard deviations */
  DOTS.forEach(d=>{d.z=Math.sqrt(-2*Math.log(d.a+1e-9))*Math.cos(2*Math.PI*d.b)});
  function axis(x0,x1,y,N){let s=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" class="axis" style="stroke:var(--muted)"/>`;
    BR_TICK.forEach(([a,l])=>{if(N&&(a===18||a===6))return;const x=lerp(x0,x1,brT(a));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y-3}" y2="${y+3}" style="stroke:var(--muted)"/><text x="${f1(x)}" y="${y+13}" class="t-xs t-mid">${l}</text>`});return s}
  function panelA(ox,oy,W,t,a,N){let s=`<text x="${ox}" y="${oy+14}" class="t-sm" style="fill:var(--neuro)">BRAIN GROWTH</text>`;
    const V=brVol(a),sc=.56*Math.cbrt(V/100),bx=ox+8,by=oy+30+(108-150*sc)*.6;
    const b=brain(bx,by,sc,{id:'brBr',glow:a>=6&&a<12&&mode==='avg'?{frontal:.5,parietal:.5,temporal:.5,occipital:.5}:{},hlCol:'var(--neuro)'});
    s+=`<g style="opacity:${a<0?.7:1}">${b.svg}</g>`;
    if(a>=0&&a<1.5)s+=`<path d="M${f1(bx+100*sc)} ${f1(by-6)}v-6" style="stroke:var(--muted)"/>`;
    if(mode==='avg'&&a>=6){const k=ramp(a,6,12);s+=`<ellipse cx="${f1(bx+108*sc)}" cy="${f1(by+68*sc)}" rx="${f1(92*sc*(1+.07*k))}" ry="${f1(55*sc*(1+.07*k))}" style="fill:none;stroke:var(--neuro);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=`<text x="${ox+(N?196:170)}" y="${oy+128}" class="t-xs" style="fill:var(--neuro)">${a<12?'- - surface area: faster':'- - then volume'}</text><text x="${ox+(N?196:170)}" y="${oy+140}" class="t-xs" style="fill:var(--neuro)">(later diagnosed, group avg)</text>`}
    const tx=ox+(N?196:170);
    s+=`<text x="${tx}" y="${oy+48}" class="t-big">${brAgeLbl(a)}</text><text x="${tx}" y="${oy+68}" class="t-xs">brain volume index</text>`;
    s+=`<text x="${tx}" y="${oy+94}" style="font:800 26px var(--display);fill:var(--neuro)">${Math.round(V)}</text><text x="${tx}" y="${oy+110}" class="t-xs">${a<0||a>24?'drawn, not measured':'birth = 100 (typical mean)'}</text>`;
    let nt=BR_NOTE[0];BR_NOTE.forEach(n=>{if(a>=n[0])nt=n});
    s+=`<rect x="${ox}" y="${oy+150}" width="${W}" height="42" rx="8" style="fill:var(--neuro-soft)"/><text x="${ox+8}" y="${oy+166}" class="t-xs" style="fill:var(--ink)">${nt[1]}</text><text x="${ox+8}" y="${oy+182}" class="t-xs" style="fill:var(--ink)">${nt[2]}</text>`;
    return s}
  function panelB(ox,oy,W,t,a,N){let s=`<text x="${ox}" y="${oy+14}" class="t-sm" style="fill:var(--neuro)">SYNAPSES: BUILD, THEN PRUNE</text>`;
    const d=brSyn(reg,a),pk=2.6,peakA=reg==='aud'?3:18,past=a>peakA;
    s+=`<g style="opacity:${a<-3.2?.45:1}">${neuron(ox+54,oy+104,N?10:8.5,{spines:a<-3.2?0:past?1:d/pk,prune:past?clamp((pk-d)/pk*1.4):0,seed:5})}</g>`;
    const l1=a<-3.2?'no synapses':past?'pruning:':'spines forming:',l2=a<-3.2?'yet':past?Math.round(clamp((pk-d)/pk*1.4)*100)+'% fading':Math.round(d/pk*100)+'% of peak';
    s+=`<text x="${ox+54}" y="${oy+170}" class="t-xs t-mid">${l1}</text><text x="${ox+54}" y="${oy+183}" class="t-xs t-mid" style="fill:var(--ink)">${l2}</text>`;
    const cx0=ox+(N?150:146),cx1=ox+W-4,cy0=oy+40,cy1=oy+160,X=tt=>lerp(cx0,cx1,tt),Y=v=>lerp(cy1,cy0,v/2.8);
    s+=`<rect x="${cx0}" y="${cy0}" width="${cx1-cx0}" height="${cy1-cy0}" style="fill:var(--field)"/>`;
    [['aud','auditory','var(--sense)'],['pfc','prefrontal','var(--neuro)']].forEach(([r,l,c])=>{const on=r===reg;
      s+=`<path d="${pathFn(u=>brSyn(r,brAge(u))/2.8,cx0,cx1,cy1,cy0,90)}" style="fill:none;stroke:${c};stroke-width:${on?2.4:1.2};opacity:${on?1:.45}"/>`;
      const lx=X(brT(r==='aud'?3:18));s+=r==='aud'?`<text x="${f1(lx+6)}" y="${f1(Y(2.6)+12)}" class="t-xs" style="fill:${c}">${l}: ~3 mo</text>`:`<text x="${f1(cx1)}" y="${f1(cy0-6)}" class="t-xs t-end" style="fill:${c}">${l}: after 15 mo</text>`});
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${cy0}" y2="${cy1}" style="stroke:var(--ink);opacity:.35"/><circle cx="${f1(X(t))}" cy="${f1(Y(d))}" r="4" style="fill:var(--ink)"/>`;
    const L=BR_TICK.filter(x=>[-4.6,0,12,24,48].includes(x[0]));s+=`<line x1="${cx0}" x2="${cx1}" y1="${cy1}" y2="${cy1}" class="axis" style="stroke:var(--muted)"/>`;
    L.forEach(([q,l])=>s+=`<text x="${f1(X(brT(q)))}" y="${cy1+12}" class="t-xs t-mid">${l==='48 mo'?'48':l}</text>`);
    s+=`<text x="${cx1}" y="${cy1+24}" class="t-xs t-end">timing real, heights drawn</text>`;
    return s}
  function panelC(ox,oy,W,t,a,N){let s=`<text x="${ox}" y="${oy+14}" class="t-sm" style="fill:var(--neuro)">${mode==='avg'?'GROUP AVERAGES':'INDIVIDUAL VARIATION'}</text>`;
    const x0=ox+34,x1=ox+W-6,y0=oy+28,y1=oy+166,X=tt=>lerp(x0,x1,tt),Y=v=>lerp(y1,y0,v/300);
    [0,100,200,300].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${x0-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=axis(x0,x1,y1,N);
    const seg=(f,a0,a1)=>pathFn(u=>f(brAge(lerp(brT(a0),brT(a1),u)))/300,X(brT(a0)),X(brT(a1)),y1,y0,50);
    const ae=Math.min(a,48);
    if(mode==='ind'){const band=(f,col)=>{let up='',dn='';for(let i=0;i<=60;i++){const tt=lerp(brT(0),brT(Math.max(0,ae)),i/60),v=f(brAge(tt));up+=(i?'L':'M')+f1(X(tt))+' '+f1(Y(v*1.13));dn='L'+f1(X(tt))+' '+f1(Y(v*.87))+dn}return `<path d="${up}${dn}Z" style="fill:${col};opacity:.16"/>`};
      if(a>0)s+=band(brVol,'var(--muted)')+band(brVolA,'var(--neuro)')}
    s+=`<path d="${seg(brVol,-4.6,0)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:2 3"/>`;
    if(a>0){s+=`<path d="${seg(brVol,0,Math.min(ae,24))}" style="fill:none;stroke:var(--ink);stroke-width:2.2"/>`;
      if(ae>24)s+=`<path d="${seg(brVol,24,ae)}" style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      if(a>6)s+=`<path d="${seg(brVolA,6,ae)}" style="fill:none;stroke:var(--neuro);stroke-width:2;stroke-dasharray:${mode==='avg'?'6 3':'2 3'}"/>`}
    [[12,201],[24,231]].forEach(([q,v])=>{if(a>=q)s+=`<circle cx="${f1(X(brT(q)))}" cy="${f1(Y(v))}" r="4.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(brT(q))+(q===24?6:-6))}" y="${f1(Y(v)+(q===24?16:-8))}" class="t-xs${q===24?'':' t-end'}" style="fill:var(--ink)">${v}</text>`});
    if(mode==='ind'&&a>0){const v0=brVol(a),v1=brVolA(a),xx=X(t);DOTS.forEach((d,i)=>{const v=(d.g?v1:v0)*(1+.065*d.z),dx=(i%13-6)*2.4;s+=`<circle cx="${f1(xx+dx)}" cy="${f1(Y(v))}" r="2.6" style="fill:${d.g?'var(--neuro)':'var(--muted)'};opacity:.85"/>`})}
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${y0}" y2="${y1}" style="stroke:var(--ink);opacity:.3"/>`;
    const gy=Y(118),gx=x1-4;s+=mode==='avg'?`<text x="${gx}" y="${f1(gy)}" class="t-xs t-end" style="fill:var(--ink)">— typical (measured to 24 mo)</text><text x="${gx}" y="${f1(gy+12)}" class="t-xs t-end" style="fill:var(--neuro)">- - later diagnosed, group mean</text><text x="${gx}" y="${f1(gy+24)}" class="t-xs t-end" style="fill:var(--neuro)">(direction only, not to scale)</text>`
      :`<text x="${gx}" y="${f1(gy)}" class="t-xs t-end">each dot: one child (illustrative)</text><text x="${gx}" y="${f1(gy+12)}" class="t-xs t-end"><tspan style="fill:var(--neuro)">● later diagnosed</tspan>  ● not</text><text x="${gx}" y="${f1(gy+24)}" class="t-xs t-end" style="fill:var(--neuro)">the clouds overlap almost completely</text>`;
    return s}
  function panelD(ox,oy,W,t,a,N){const sh=ei==='shift';let s=`<text x="${ox}" y="${oy+14}" class="t-sm" style="fill:var(--neuro)">EXCITATION / INHIBITION</text>`;
    const re=.5+.5*Math.sin(t*2*Math.PI*14),ri=.5+.5*Math.sin(t*2*Math.PI*14+1.6);
    const ex=ox+W*.26,ix=ox+W*.74,sy=oy+92;
    s+=synapse(ex,sy,.82,{kind:'e',release:re,receptors:sh?6:4,seed:4});
    s+=synapse(ix,sy,.82,{kind:'i',release:ri*(sh?.45:1),receptors:sh?2:4,seed:8});
    s+=`<text x="${f1(ex)}" y="${sy+42}" class="t-xs t-mid" style="fill:var(--excite)">glutamate: excites</text><text x="${f1(ix)}" y="${sy+42}" class="t-xs t-mid" style="fill:var(--inhibit)">GABA: inhibits</text>`;
    const fx=ox+W/2,fy=oy+186,ang=sh?.16:0,L=W*.34,ly=fy-14;
    s+=`<path d="M${fx-9} ${fy}L${fx} ${ly}L${fx+9} ${fy}Z" style="fill:var(--muted)"/>`;
    const lx1=fx-Math.cos(ang)*L,ly1=ly+Math.sin(ang)*L,rx1=fx+Math.cos(ang)*L,ry1=ly-Math.sin(ang)*L;
    s+=`<line x1="${f1(lx1)}" y1="${f1(ly1)}" x2="${f1(rx1)}" y2="${f1(ry1)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/>`;
    s+=`<circle cx="${f1(lx1)}" cy="${f1(ly1-(sh?12:9))}" r="${sh?12:9}" style="fill:var(--excite)"/><circle cx="${f1(rx1)}" cy="${f1(ry1-(sh?7:9))}" r="${sh?7:9}" style="fill:var(--inhibit)"/>`;
    s+=`<text x="${fx}" y="${oy+31}" class="t-xs t-mid" style="fill:${sh?'var(--rx)':'var(--ink)'}">${sh?'shifted toward excitation: a HYPOTHESIS':'balanced: excitation matched by inhibition'}</text>`;
    return s}
  function draw(t){const N=vb(svg,'720 440','400 852'),a=brAge(t);let s='';
    const P=N?[[10,0],[10,212],[10,428],[10,644]]:[[10,10],[372,10],[10,226],[372,226]],W=N?380:338;
    s+=panelA(P[0][0],P[0][1],W,t,a,N)+panelB(P[1][0],P[1][1],W,t,a,N)+panelC(P[2][0],P[2][1],W,t,a,N)+panelD(P[3][0],P[3][1],W,t,a,N);
    if(!N)s+=`<line x1="361" x2="361" y1="14" y2="420" class="grid"/><line x1="14" x2="706" y1="218" y2="218" class="grid"/>`;
    s+=`<text x="${N?10:14}" y="${N?850:436}" class="t-xs" style="fill:var(--warn)">${N?'SCHEMATIC · circles = measured group means':'SCHEMATIC · circled values measured (typical group means); other shapes drawn'}</text>`;
    svg.innerHTML=s;const ph=phaseOf(BR_STEPS,t);setSt(ph);$('#brNote').innerHTML=noteHTML(BR_STEPS[ph]);
    $('#brRead').innerHTML=`<span>age <b>${brAgeLbl(a)}</b></span><span>volume index <b>${Math.round(brVol(a))}</b>${a<0||a>24?' (drawn)':''}</span><span>view <b>${mode==='avg'?'group averages':'individual variation'}</b></span><span>E/I <b>${ei==='bal'?'balanced':'shifted (hypothesis)'}</b></span>`}
  const stop=playWire(rg,$('#brPlay'),draw,26000,'%t:player.replay%','brain');
  setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  const tog=(attr,set)=>$$(`[${attr}]`).forEach(b=>b.addEventListener('click',()=>{set(b.getAttribute(attr));$$(`[${attr}]`).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  tog('data-brv',v=>mode=v);tog('data-brei',v=>ei=v);tog('data-brr',v=>reg=v);
  draw(+rg.value);

  /* ---- effect-size explorer ---- */
  const es=$('#brEsSvg'),er=$('#brEs');
  const erf=x=>{const s=Math.sign(x);x=Math.abs(x);const k=1/(1+.3275911*x);return s*(1-(((((1.061405429*k-1.453152027)*k)+1.421413741)*k-.284496736)*k+.254829592)*k*Math.exp(-x*x))};
  const Phi=x=>.5*(1+erf(x/Math.SQRT2));
  function drawE(){const N=vb(es,'720 250','400 300'),d=+er.value;let s='';
    const x0=N?14:30,x1=N?386:470,yb=N?190:200,yt=N?40:40,sd=(x1-x0)/8,mid=(x0+x1)/2,ma=mid-d*sd/2,mb=mid+d*sd/2,pdf=z=>Math.exp(-z*z/2);
    const curve=m=>{let p='';for(let i=0;i<=120;i++){const x=lerp(x0,x1,i/120);p+=(i?'L':'M')+f1(x)+' '+f1(yb-(yb-yt)*pdf((x-m)/sd))}return p};
    let ov='';for(let i=0;i<=120;i++){const x=lerp(x0,x1,i/120);ov+=(i?'L':'M')+f1(x)+' '+f1(yb-(yb-yt)*Math.min(pdf((x-ma)/sd),pdf((x-mb)/sd)))}
    s+=`<path d="${ov}L${x1} ${yb}L${x0} ${yb}Z" style="fill:var(--neuro);opacity:.14"/>`;
    s+=`<path d="${curve(ma)}" style="fill:none;stroke:var(--muted);stroke-width:2"/><path d="${curve(mb)}" style="fill:none;stroke:var(--neuro);stroke-width:2.2"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${yb}" y2="${yb}" class="axis"/><line x1="${f1(ma)}" x2="${f1(ma)}" y1="${yt-4}" y2="${yb}" style="stroke:var(--muted);stroke-dasharray:3 3"/><line x1="${f1(mb)}" x2="${f1(mb)}" y1="${yt-4}" y2="${yb}" style="stroke:var(--neuro);stroke-dasharray:3 3"/>`;
    s+=`<text x="${f1(ma-4)}" y="${yt-8}" class="t-xs t-end">non-autistic</text><text x="${f1(mb+4)}" y="${yt-8}" class="t-xs" style="fill:var(--neuro)">autistic</text><text x="${mid}" y="${yb+16}" class="t-xs t-mid">any one brain measure (illustrative), in standard deviations</text>`;
    const OVL=2*Phi(-d/2),acc=Phi(d/2),U3=Phi(d);
    const rows=[['overlap of the two groups',Math.round(OVL*100)+'%'],['best accuracy from this measure alone',Math.round(acc*100)+'%'],['autistic people above the other group\'s mean',Math.round(U3*100)+'%']];
    rows.forEach(([l,v],i)=>{const x=N?x0+i*126:500,y=N?250:62+i*62;s+=`<text x="${x}" y="${y}" style="font:800 ${N?20:26}px var(--display);fill:var(--neuro)">${v}</text><text x="${x}" y="${y+(N?14:16)}" class="t-xs">${N?l.split(' ').slice(0,3).join(' '):l.length>30?l.slice(0,l.lastIndexOf(' ',30)):l}</text>${!N&&l.length>30?`<text x="${x}" y="${y+28}" class="t-xs">${l.slice(l.lastIndexOf(' ',30)+1)}</text>`:''}`});
    es.innerHTML=s;$('#brEsOut').textContent=d.toFixed(2);
    $('#brEsNote').innerHTML=noteHTML({k:`Effect size d = ${d.toFixed(2)}`,t:d<=.3?'Small: the groups overlap almost entirely':d<.7?'Medium: still mostly overlapping':'Large: still a lot of overlap',
      txt:`<span class="ev est">Established</span> The ENIGMA mega-analysis of 1,571 autistic and 1,651 non-autistic people (age 2–64) found smaller pallidum, putamen, amygdala and nucleus accumbens volumes, thicker frontal and thinner temporal cortex, with effect sizes between d −0.21 and 0.20. [[vanRooij2018]] At d = 0.2 the two curves overlap by about 92%, and one measure alone could sort people correctly only about 54% of the time. In about 1,000 ABIDE participants, anatomical MRI classifiers reached under 60%. [[Haar2016]] The numbers on the right are computed from d for two normal curves.`,
      pt:`A real average difference between groups can still be far too small to say anything about one person.`,
      hook:`Group difference ≠ diagnostic test. Brain-structure effects in autism are small (|d| ≤ 0.21 in ENIGMA).`})}
  er.addEventListener('input',drawE);
  $$('[data-bres]').forEach(b=>b.addEventListener('click',()=>{er.value=b.dataset.bres;$$('[data-bres]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawE()}));
  drawE();

  /* ---- hypothesis board: filters and counterpoints ---- */
  $$('[data-brf]').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.brf;$$('[data-brf]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    $$('#brBoard .card').forEach(c=>c.hidden=!(f==='all'||c.dataset.ev===f))}));
  $$('#brBoard [data-brcp]').forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);b.closest('.card').querySelector('.br-cp').hidden=!on;b.textContent=on?'Hide the counterpoint':'Show the counterpoint'}));
  const prevR=redraws.brain;redraws.brain=()=>{prevR&&prevR();drawE()};
};
