/* =============== 3.1 How stimulants work =============== */
/* oral methylphenidate DAT occupancy at 120 min, healthy adults (PET) [[Volkow1998]] */
const ST_OCC={5:12,10:40,20:54,40:72,60:74};
const ST_PULSES=[.04,.15,.26,.37,.48,.59,.70,.81,.92];
const ST_BASE={from:0,at:.1,k:'Before the medicine',t:'Baseline: release and reuptake',
  txt:`Each impulse releases a brief puff of dopamine into the cleft, and the dopamine transporter (DAT) pulls it back within moments, so each pulse on the graph is short. In the prefrontal cortex the noradrenaline transporter (NET) does the same job for noradrenaline and dopamine. These transporters are where the stimulants act. [[FDA-RitalinC,Bymaster2002]]`,
  pt:`Every signal is a quick squirt of dopamine that is vacuumed back up straight away.`,
  hook:`US labels: the mode of therapeutic action of methylphenidate and of amphetamines in ADHD "is not known". [[FDA-RitalinC,FDA-AdderallXR]]`};
const ST_STEPS={
 none:[ST_BASE,
  {from:.25,at:.35,k:'No medicine',t:'Nothing changes',
   txt:`Without a medicine, the pulses stay brief and the transporters keep working. Press <b>Methylphenidate</b> or <b>Amphetamine</b> above to compare; their curves are already drawn faintly on the graph.`,
   pt:`Without medicine, dopamine is recycled as fast as it is released.`},
  {from:.45,at:.57,k:'Same synapse, with or without ADHD',t:'Not a paradoxical calming',
   txt:`A single dose of dextroamphetamine reduced motor activity and reaction time and improved cognitive test performance in 14 typically developing boys, and in a later study boys with and without hyperactivity and adult men all showed less motor activity and more vigilance. Stimulants act on this synapse in similar ways in people with and without ADHD. [[Rapoport1978,Rapoport1980]]`,
   pt:`Stimulant medicines affect people with and without ADHD in similar ways, so feeling more focused on a stimulant does not prove someone has ADHD. [[Rapoport1978,Rapoport1980]]`,
   hook:`Stimulant response is not "paradoxical" and does not confirm the diagnosis. [[Rapoport1978,Rapoport1980]]`},
  {from:.7,at:.85,k:'In healthy people',t:'Modest gains without ADHD',
   txt:`In 48 studies of 1,409 healthy participants, methylphenidate and amphetamine had only small effects on inhibitory control and short-term episodic memory, small and inconsistent effects on working memory, and signs of publication bias. The authors judged the cognitive benefit "probably modest". [[Ilieva2015]]`,
   pt:`For people without ADHD, these medicines do not turn into "smart pills"; the gains in studies are small.`,
   hook:`Healthy volunteers: cognitive benefit of stimulants "probably modest" (48 studies). [[Ilieva2015]]`}],
 mph:[ST_BASE,
  {from:.25,at:.38,k:'Methylphenidate arrives',t:'Molecules sit in DAT and NET',
   txt:`Methylphenidate molecules (coral) occupy the transporters. Oral doses blocked DAT in a dose-dependent way at 120 minutes: 12% at 5 mg up to 74% at 60 mg (pick a dose above); the dose blocking half of DAT was 0.25 mg/kg. Methylphenidate blocks NET at even lower doses (ED50 0.14 mg/kg; 70–80% NET occupancy at average maintenance doses). It is a racemic mixture, and the d-threo enantiomer is the more active. [[Volkow1998,Hannestad2010,FDA-RitalinC]]`,
   pt:`The medicine plugs the recycling pumps, like a cork in a drain.`,
   hook:`Methylphenidate ED50: DAT 0.25 mg/kg, NET 0.14 mg/kg. NET blockade may contribute to its effect. [[Volkow1998,Hannestad2010]]`},
  {from:.45,at:.6,k:'Cleft dopamine rises',t:'Each pulse lingers',
   txt:`With the pumps blocked, each released puff stays in the cleft longer and reaches more receptors. Oral methylphenidate (about 0.8 mg/kg) increased extracellular dopamine in the striatum of 11 healthy adults, shown by a 20 ± 12% drop in D2 receptor availability. The label states that it "blocks the reuptake of norepinephrine and dopamine into the presynaptic neuron and increases the release of these monoamines into the extraneuronal space". [[Volkow2001,FDA-RitalinC,FDA-Concerta]]`,
   pt:`Because less dopamine is vacuumed up, more of it stays in the gap to pass on the message.`,
   hook:`Methylphenidate = reuptake blocker (DAT and NET). [[FDA-RitalinC,Volkow1998,Hannestad2010]]`},
  {from:.7,at:.86,k:'Steady state',t:'Louder signals, same timing',
   txt:`<span class="ev hyp">Hypothesis</span> Because methylphenidate only blocks reuptake, it amplifies dopamine that neurons release on their own: the pulses keep their timing but grow. Volkow and colleagues proposed this boosts task-related signals relative to background noise and may make tasks more salient. In fMRI, stimulants most consistently increased right inferior frontal activation, the region most often under-active in ADHD, and they reduce reaction-time variability (g = −0.74). [[Volkow2001,Rubia2014Stim,Kofler2013]]`,
   pt:`The medicine does not create new signals. It makes the brain's own signals a little louder.`,
   hook:`Methylphenidate amplifies spontaneously released dopamine (hypothesis); amphetamine releases dopamine mainly by a non-exocytic route. [[Volkow2001,Sulzer2005]]`}],
 amph:[ST_BASE,
  {from:.25,at:.38,k:'Amphetamine arrives',t:'It enters through DAT',
   txt:`Most amphetamines are transporter <b>substrates</b>: DAT carries them into the terminal as if they were dopamine (coral molecules moving in). While they compete for the transporter, amphetamines also inhibit dopamine uptake. Some amphetamine-related compounds act as pure inhibitors instead. [[Sitte2015,Sulzer2005]]`,
   pt:`Amphetamine looks enough like dopamine that the recycling pump carries it inside the cell.`,
   hook:`Amphetamine is a transporter substrate, methylphenidate a transporter blocker. [[Sitte2015,Volkow1998]]`},
  {from:.45,at:.58,k:'Inside the terminal',t:'VMAT2: dopamine leaves the vesicles',
   txt:`Inside, amphetamine disrupts the vesicular transporter, VMAT2, so dopamine leaks out of the vesicles into the cytosol (amber dots outside the vesicles). Faraone's review lists amphetamine actions as DAT and NET inhibition, VMAT-2 inhibition and monoamine oxidase inhibition. Vesicle-to-cytosol redistribution is one of the two main release mechanisms. [[Sulzer2005,Faraone2018Pharm]]`,
   pt:`The stores of dopamine inside the cell spring a leak, so dopamine builds up inside.`,
   hook:`Amphetamine: VMAT2 → dopamine moves from vesicles to cytosol; MAO inhibition adds to it. [[Sulzer2005,Faraone2018Pharm]]`},
  {from:.7,at:.86,k:'Release without an impulse',t:'The pump runs backwards',
   txt:`The second mechanism is reverse transport: DAT now carries dopamine <i>out</i> into the cleft (coral arrows) without any vesicle fusing, so in this drawing the baseline on the graph rises. Amphetamines are unusual in releasing catecholamines mainly by this non-exocytic route. <span class="ev early">Early evidence</span> The trace amine-associated receptor 1 (TAAR1) helps regulate monoamine transporters and mediates part of the action of amphetamine-like stimulants. [[Sulzer2005,Sitte2015,Miller2011TAAR1]]`,
   pt:`Instead of pulling dopamine back in, the pump starts pushing it out, even between signals.`,
   hook:`Amphetamine = releaser plus blocker: substrate entry, VMAT2 redistribution, transporter reversal (efflux). [[Sulzer2005,Sitte2015,Faraone2018Pharm]]`}]
};

inits.stimulants=()=>{
  const svg=$('#stSvg'),rg=$('#stT'),dose=$('#stDose');let mode='mph',setSt=()=>{};
  const occ=()=>ST_OCC[+dose.value]/100;
  /* schematic cleft dopamine for each setting */
  function prm(m,t){const o=m==='mph'?occ()*ramp(t,.25,.45):0,au=m==='amph'?ramp(t,.25,.45):0,ves=m==='amph'?ramp(t,.45,.7):0,ef=m==='amph'?ramp(t,.62,.86):0;
    return{o,au,ves,ef,tau:.016/(1-o*.82)*(1+au*.6),amp:(1+o*.35)*(1-.35*ves),tonic:ef*.75}}
  function lvl(m,t){const P=prm(m,t);let v=P.tonic;ST_PULSES.forEach(p=>{if(t>=p)v+=P.amp*Math.exp(-(t-p)/P.tau)*ramp(t,p,p+.008)});return v}
  const series={};function build(){['none','mph','amph'].forEach(m=>{const a=[];for(let u=0;u<=1.0001;u+=.002)a.push([u,lvl(m,u)]);series[m]=a})}
  build();
  const rr=rng(19),CYT=[...Array(16)].map(()=>[58+rr()*84,34+rr()*50]);
  const COL={none:'var(--muted)',mph:'var(--rx)',amph:'var(--drug)'},NAME={none:'no medicine',mph:'methylphenidate',amph:'amphetamine'};
  function draw(t){const N=vb(svg,'720 400','400 640'),P0=prm(mode,t),lv=lvl(mode,t);
    const L=N?{sx:50,sy:34,ss:300,iy:332,ax:56,ay:440,aw:316,ah:150}:{sx:34,sy:40,ss:270,iy:312,ax:404,ay:56,aw:290,ah:240};
    const k=L.ss/200,P=(px,py)=>[L.sx+px*k,L.sy+py*k];let s='';
    let last=-1;ST_PULSES.forEach(p=>{if(t>=p)last=p});const fz=last>=0&&t-last<.05?(t-last)/.05:0;
    s+=`<text x="${N?20:34}" y="20" class="t-sm" style="fill:${COL[mode]}">DOPAMINE SYNAPSE · ${NAME[mode].toUpperCase()}</text>`;
    s+=synapse(L.sx,L.sy,L.ss,{nt:'da',level:clamp(lv/2.2),fuse:fz*(1-P0.ves*.7),uptake:mode==='mph'?(lv>.1?1-P0.o:0):(lv>.1&&P0.ef<.2?1:0),block:P0.o,reverse:P0.ef,labels:true,tlabel:'DAT',seed:9}).svg;
    /* amphetamine molecules entering through the transporters */
    if(P0.au>0)[[50,93,-1],[150,93,1]].forEach(([tx,ty,sd])=>{for(let j=0;j<3;j++){const u=(t*7+j/3)%1,px=u<.5?lerp(tx-sd*18,tx,u/.5):lerp(tx,tx+sd*-16,(u-.5)/.5),py=u<.5?lerp(ty+18,ty,u/.5):lerp(ty,ty-24,(u-.5)/.5),[X,Y]=P(px,py);
      s+=`<circle cx="${f1(X)}" cy="${f1(Y)}" r="${f1(2.6*k)}" style="fill:var(--drug);stroke:var(--panel);stroke-width:.8;opacity:${f1(P0.au)}"/>`}});
    /* VMAT2: dopamine in the cytosol */
    if(P0.ves>0){const n=Math.round(P0.ves*CYT.length);for(let i=0;i<n;i++){const [X,Y]=P(CYT[i][0],CYT[i][1]);s+=`<circle cx="${f1(X)}" cy="${f1(Y)}" r="${f1(1.7*k)}" style="fill:var(--da);opacity:.9"/>`}
      const [lx,ly]=P(100,170);s+=`<text x="${f1(lx)}" y="${f1(ly+28)}" class="t-xs t-mid" style="fill:var(--da)">VMAT2: dopamine leaks into the cytosol</text>`}
    if(P0.ef>.3){const [hx,hy]=P(152,40);s+=`<path d="M${f1(hx-7)} ${f1(hy)}l3.5-6h7l3.5 6-3.5 6h-7z" style="fill:var(--rcpt);opacity:${f1(ramp(P0.ef,.3,.6))}"/><text x="${f1(hx+10)}" y="${f1(hy+3)}" class="t-xs" style="fill:var(--rcpt)">TAAR1</text>`;
      const [ex,ey]=P(100,170);s+=`<text x="${f1(ex)}" y="${f1(ey+14)}" class="t-xs t-mid" style="fill:var(--drug)">efflux: DAT runs in reverse</text>`}
    if(mode==='mph'&&P0.o>.05){const [ex,ey]=P(100,170);s+=`<text x="${f1(ex)}" y="${f1(ey+14)}" class="t-xs t-mid" style="fill:var(--rx)">methylphenidate sits in DAT and NET</text>`}
    /* status strip under the synapse */
    const iy=L.iy+(N?0:0),ix=N?50:34,iw=N?300:270;
    if(mode==='mph'){const oc=occ()*100,cur=oc*ramp(t,.25,.45);
      s+=`<text x="${ix}" y="${iy+16}" class="t-sm">DAT OCCUPIED · ${dose.value} MG ORAL</text><text x="${ix+iw}" y="${iy+16}" class="t-big t-end" style="fill:var(--rx)">${Math.round(cur)}%</text>`;
      s+=`<rect x="${ix}" y="${iy+24}" width="${iw}" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="${ix}" y="${iy+24}" width="${f1(iw*cur/100)}" height="12" rx="4" style="fill:var(--rx)"/>`;
      s+=`<line x1="${f1(ix+iw*.5)}" x2="${f1(ix+iw*.5)}" y1="${iy+20}" y2="${iy+40}" style="stroke:var(--ink);stroke-width:1"/><text x="${f1(ix+iw*.5)}" y="${iy+52}" class="t-xs t-mid">50% at 0.25 mg/kg (ED50)</text>`;
      s+=`<text x="${ix}" y="${iy+68}" class="t-xs">published PET value at 120 min: ${Math.round(oc)}%</text>`}
    else if(mode==='amph'){const it=[['enters via DAT',P0.au],['VMAT2 leak',P0.ves],['DAT reversed',P0.ef],['blocks reuptake',P0.au]];
      s+=`<text x="${ix}" y="${iy+16}" class="t-sm">AMPHETAMINE ACTIONS SO FAR</text>`;
      it.forEach(([n,v],i)=>{const x=ix+(i%2)*(iw/2),y=iy+36+Math.floor(i/2)*20;s+=`<circle cx="${x+6}" cy="${y-4}" r="6" style="fill:${v>.5?'var(--drug)':'var(--panel-2)'};stroke:var(--drug);stroke-width:1.2"/><text x="${x+18}" y="${y}" class="t-xs" style="fill:${v>.5?'var(--ink)':'var(--muted)'}">${n}</text>`})}
    else{s+=`<text x="${ix}" y="${iy+16}" class="t-sm">NO MEDICINE</text><text x="${ix}" y="${iy+34}" class="t-xs">release, then fast reuptake by DAT</text><text x="${ix}" y="${iy+50}" class="t-xs">every pulse is brief</text>`}
    /* graph */
    const A=axes(L.ax,L.ay,L.aw,L.ah,{x0:0,x1:1,y0:0,y1:2.4,yt:[0,1,2],fy:v=>v?v+'×':'0',grid:true});
    s+=`<text x="${L.ax}" y="${L.ay-12}" class="t-sm">CLEFT DOPAMINE (× BASELINE PULSE)</text>`+A.svg;
    [[.25,'medicine arrives']].forEach(([p,n])=>{if(mode==='none')return;const x=A.X(p);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ay}" y2="${L.ay+L.ah}" style="stroke:${COL[mode]};stroke-dasharray:3 3"/><text x="${f1(x+4)}" y="${L.ay+10}" class="t-xs" style="fill:${COL[mode]}">${n}</text>`});
    ['none','mph','amph'].forEach(m=>{if(m!==mode)s+=trace(series[m],A.X,A.Y,{c:COL[m],w:1.1,dash:'3 3'})});
    s+=trace(series[mode],A.X,A.Y,{c:COL[mode],w:2.4,upto:t,area:true});
    s+=`<circle cx="${f1(A.X(t))}" cy="${f1(A.Y(Math.min(lv,2.4)))}" r="4.5" style="fill:${COL[mode]};stroke:var(--panel);stroke-width:1.5"/>`;
    const ly=L.ay+L.ah+18;
    s+=`<text x="${L.ax}" y="${ly}" class="t-xs"><tspan style="fill:var(--muted)">┅ none</tspan>  <tspan style="fill:var(--rx)">┅ methylphenidate</tspan>  <tspan style="fill:var(--drug)">┅ amphetamine</tspan></text><text x="${L.ax+L.aw}" y="${ly+16}" class="t-xs t-end">time → (schematic)</text>`;
    svg.innerHTML=s;const ph=phaseOf(ST_STEPS[mode],t);$('#stNote').innerHTML=noteHTML(ST_STEPS[mode][ph]);setSt(ph)}
  const stop=playWire(rg,$('#stPlay'),draw,16000,'%t:player.replay%','stimulants');
  function wire(){const old=$('#stSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,ST_STEPS[mode],rg,draw,stop)}
  function setMode(m){mode=m;$$('[data-stm]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.stm===m));stop();wire();draw(+rg.value)}
  wire();
  $$('[data-stm]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.stm)));
  dose.addEventListener('change',()=>{build();if(mode!=='mph')setMode('mph');else{stop();draw(+rg.value)}});
  $$('[data-stgo]').forEach(b=>b.addEventListener('click',()=>{setMode(b.dataset.stgo);rg.value=.9;draw(.9);$('#stSvg').scrollIntoView({block:'center',behavior:RM?'auto':'smooth'})}));
  draw(+rg.value);

  /* ---- family glyphs ---- */
  const tx=(x,y,t,c='var(--ink)',cls='t-sm')=>`<text x="${x}" y="${y}" class="${cls}" style="fill:${c}">${t}</text>`;
  const chip=(x,y,t,c)=>`<rect x="${x}" y="${y-13}" width="${t.length*7+12}" height="19" rx="9" style="fill:none;stroke:${c};stroke-width:1.3"/><text x="${x+6+t.length*3.5}" y="${y+1}" class="t-sm t-mid" style="fill:${c}">${t}</text>`;
  const arr=(x1,x2,y)=>`<path d="M${x1} ${y}H${x2}" style="stroke:var(--muted);stroke-width:1.5" marker-end="url(#stFa)"/>`;
  const defs=`<defs>${marker('stFa','var(--muted)',6)}</defs>`;
  $('#stF1').innerHTML=defs+pill(32,32,46,'tab',{c:'var(--rx)'})+chip(70,36,'d-threo','var(--rx)')+chip(150,36,'l-threo','var(--muted)')+tx(70,58,'racemic: both mirror forms','var(--muted)','t-xs');
  $('#stF2').innerHTML=defs+pill(32,32,46,'tab',{c:'var(--rx)'})+chip(70,36,'d-threo only','var(--rx)')+tx(70,58,'the more active enantiomer','var(--muted)','t-xs');
  $('#stF3').innerHTML=defs+pill(40,32,62,'beads',{c:'var(--accent)'})+chip(84,36,'d','var(--drug)')+chip(112,36,'d','var(--drug)')+chip(140,36,'d','var(--drug)')+chip(168,36,'l','var(--muted)')+tx(84,58,'3 : 1 d- to l-amphetamine','var(--muted)','t-xs');
  $('#stF4').innerHTML=defs+pill(32,32,46,'tab',{c:'var(--accent)'})+chip(70,36,'d-amphetamine','var(--drug)')+tx(70,58,'one enantiomer','var(--muted)','t-xs');
  $('#stF5').innerHTML=defs+pill(30,30,50,'cap',{c:'var(--warn)'})+arr(60,84,30)+`<ellipse cx="108" cy="30" rx="18" ry="12" style="fill:var(--bad);opacity:.85"/><ellipse cx="108" cy="30" rx="8" ry="4.5" style="fill:var(--panel);opacity:.5"/>`+arr(130,152,30)+tx(158,26,'d-amphetamine','var(--drug)','t-xs')+tx(158,40,'+ l-lysine','var(--muted)','t-xs')+tx(86,58,'red blood cell','var(--muted)','t-xs');

  /* ---- route and speed (schematic) [[Volkow1998,Volkow1995,Swanson2003MPH]] ---- */
  const rsv=$('#stRoute'),rt=$('#stRtT');let route='oral';
  const occT={oral:m=>.72*(1-Math.exp(-m/22))*Math.exp(-Math.max(0,m-60)/400)/(1-Math.exp(-60/22)),iv:m=>.8*(1-Math.exp(-m/2.2))*Math.exp(-m/320)};
  const RN={oral:{k:'By mouth · slow rise',t:'Slow and steady',txt:`Taken by mouth, methylphenidate reached peak brain concentration only after about 60 minutes (baboon PET), matching the time to peak behavioural effect. Oral clinical doses also exceed about 60% DAT blockade but rarely produce reinforcing effects. <span class="ev hyp">Hypothesis</span> Slow, steady rises mimic tonic dopamine firing and are linked to therapeutic effects. [[Volkow1998,Swanson2003MPH,Volkow2003MPH]]`,
      pt:`Taken by mouth at prescribed doses, stimulants raise dopamine slowly. [[Volkow2003MPH]]`,hook:`Four variables separate therapeutic from reinforcing effects: dose, speed of rise (route), individual sensitivity and context. [[Volkow2003MPH]]`},
    iv:{k:'Snorted or injected · fast rise',t:'Fast rise, "high", and risk',txt:`Methylphenidate and cocaine bind the same striatal sites; for both, the subjective "high" tracked fast uptake into the striatum, and with methylphenidate it faded even while the drug stayed bound. Intravenous methylphenidate, like cocaine, is reinforcing above about 60% DAT blockade. Every US stimulant label carries a boxed warning that misuse can cause overdose and death, with risk higher at higher doses or by routes "such as snorting or injection". [[Volkow1995,Swanson2003MPH,FDA-Concerta]]`,
      pt:`Snorting or injecting them makes dopamine rise fast, and that is what makes misuse risky. [[Volkow2003MPH,FDA-RitalinC]]`,hook:`Boxed warning on every US stimulant label: abuse, misuse and addiction. [[FDA-Concerta,FDA-RitalinC,FDA-AdderallXR,FDA-Vyvanse]]`}};
  function rDraw(tt){const N=vb(rsv,'720 250','400 330'),M=tt*120;
    const A=N?axes(52,34,320,220,{x0:0,x1:120,y0:0,y1:1,xt:[0,30,60,90,120],yt:[0,.5,1],fy:v=>Math.round(v*100)+'%',xl:'minutes',yl:'DAT blocked in brain'}):axes(80,30,600,170,{x0:0,x1:120,y0:0,y1:1,xt:[0,15,30,45,60,75,90,105,120],yt:[0,.25,.5,.75,1],fy:v=>Math.round(v*100)+'%',xl:'minutes after the dose',yl:'share of DAT blocked in the brain'});
    let s=A.svg;s+=`<line x1="${f1(A.X(0))}" x2="${f1(A.X(120))}" y1="${f1(A.Y(.6))}" y2="${f1(A.Y(.6))}" style="stroke:var(--warn);stroke-dasharray:5 4;stroke-width:1.3"/><text x="${f1(A.X(0)+8)}" y="${f1(A.Y(.6)+13)}" class="t-xs" style="fill:var(--warn)">≈60% blocked: IV doses reinforcing above</text>`;
    ['oral','iv'].forEach(r=>{const pts=[];for(let m=0;m<=120;m+=.5)pts.push([m,occT[r](m)]);const c=r==='oral'?'var(--rx)':'var(--bad)';
      s+=trace(pts,A.X,A.Y,r===route?{c,w:2.8,upto:M}:{c,w:1.2,dash:'4 4'})});
    if(route==='iv'&&M>2){const x=A.X(3);s+=`<text x="${f1(x+8)}" y="${f1(A.Y(.86))}" class="t-xs" style="fill:var(--bad)">fast rise → "high"</text>`}
    if(route==='oral'&&M>=60){s+=`<circle cx="${f1(A.X(60))}" cy="${f1(A.Y(occT.oral(60)))}" r="5" style="fill:var(--rx)"/><text x="${f1(A.X(60))}" y="${f1(A.Y(occT.oral(60))-10)}" class="t-xs t-mid" style="fill:var(--rx)">brain peak ≈ 60 min</text>`}
    s+=`<line x1="${f1(A.X(M))}" x2="${f1(A.X(M))}" y1="${f1(A.Y(1))}" y2="${f1(A.Y(0))}" style="stroke:var(--brand);stroke-width:1.2"/>`;
    rsv.innerHTML=s;$('#stRtNote').innerHTML=noteHTML(RN[route])}
  const rStop=playWire(rt,$('#stRtPlay'),rDraw,7000,'%t:player.replay%','stimulants');
  $$('[data-strt]').forEach(b=>b.addEventListener('click',()=>{route=b.dataset.strt;$$('[data-strt]').forEach(x=>x.setAttribute('aria-pressed',x===b));rStop();rDraw(+rt.value)}));
  rDraw(+rt.value);
};
