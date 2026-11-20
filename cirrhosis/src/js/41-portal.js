/* =============== 4.1 Portal hypertension & varices =============== */
/* main scrubber: five steps from scar to treatment */
const PO_STEPS=[
 {from:0,at:.12,k:'Step 1 · inside the liver',t:'Scar raises resistance',
  txt:`Cirrhosis replaces healthy tissue with scar and regenerative nodules, and that leads to portal hypertension [[Gines2021Lancet]]. Scar and nodules account for about 70% of the extra resistance inside the liver. The rest is functional: the lining of the vessels makes less nitric oxide, so their tone rises [[DiazSoto2022TAG]]. Baveno VII states that "HVPG values >5 mmHg indicate sinusoidal portal hypertension" [[deFranchis2022BavenoVII]]. Watch the lower bars: resistance grows first.`,
  pt:`Scar in the liver makes it hard for blood from the gut to pass through, so pressure builds up in the portal vein [[Gines2021Lancet,DiazSoto2022TAG]].`,
  hook:`Portal hypertension = HVPG above 5 mmHg. About 70% of the extra resistance is structural (scar and nodules) and the rest is vascular tone [[deFranchis2022BavenoVII,DiazSoto2022TAG]].`},
 {from:.2,at:.32,k:'Step 2 · in the gut',t:'Gut arteries widen',
  txt:`As collateral veins form, the splanchnic (gut) arteries widen. More blood pours into the portal system, and the wider circulation becomes hyperdynamic, with "effective hypovolaemia" [[DiazSoto2022TAG]]. Now the pressure is pushed from both ends: more resistance and more inflow. An HVPG of 10 mmHg or more is clinically significant portal hypertension (CSPH), and people with CSPH are at higher risk of decompensation [[deFranchis2022BavenoVII]]. The spleen enlarges and holds on to platelets, so a low platelet count can be a clue [[Afdhal2008Platelets]].`,
  pt:`Blood vessels in the gut open wider and send even more blood towards the liver, which pushes the pressure higher still [[DiazSoto2022TAG]].`,
  hook:`CSPH = HVPG ≥10 mmHg. HVPG is the gold standard in viral- and alcohol-related cirrhosis [[deFranchis2022BavenoVII]].`},
 {from:.4,at:.52,k:'Step 3 · detours',t:'Varices form',
  txt:`Blood finds detours back to the heart that bypass the liver. Some run along the lower oesophagus and stomach and swell into varices; others spread around the navel. Oesophageal varices are present in 50–60% of people with compensated cirrhosis and up to 85% with decompensated cirrhosis [[DiazSoto2022TAG]]. In 206 people with no or small varices, new varices appeared in 5% at 1 year and 28% at 3 years [[Merli2003JHepatol]]. In a 1985 series, all 72 people with varices had an HVPG above 12 mmHg [[GarciaTsao1985Hepatology]].`,
  pt:`When the pressure is high, blood finds detours. Some of these detours are swollen veins in the food pipe or stomach, called varices, and they can burst and bleed [[DiazSoto2022TAG]].`,
  hook:`An HVPG above 10 mmHg is the strongest predictor of developing varices and of any decompensating event [[DiazSoto2022TAG]].`},
 {from:.6,at:.68,k:'Step 4 · an emergency',t:'A varix bleeds',
  txt:`A first variceal bleed occurs at 10–15% a year, depending on risk factors [[DiazSoto2022TAG]]. In the NIEC study of 321 people with varices, bleeding risk rose with Child class, varix size and red wale marks on the varix, and the 1-year probability ranged from 6% to 76% across risk groups [[NIEC1988NEJM]]. Mean HVPG was 20.4 mmHg in people who had bled versus 16.0 mmHg in those who had not [[GarciaTsao1985Hepatology]]. Each bleed carries a 6-week mortality of about 15–25% in the EASL guideline (population figures) [[EASL2018Decomp]].`,
  pt:`Vomiting blood or passing black, tarry stools can mean a varix is bleeding. That needs an emergency department straight away.`,
  hook:`No variceal bleeding occurred below an HVPG of 12 mmHg in the classic 1985 series [[GarciaTsao1985Hepatology]]. NIEC risk factors: Child class, varix size, red wale marks [[NIEC1988NEJM]].`},
 {from:.75,at:.94,k:'Step 5 · bringing it down',t:'Treatment lowers the pressure',
  txt:`In hospital, a vasoactive drug, antibiotics, endoscopy within 12 hours with band ligation and restrictive transfusion form the bleeding bundle (scrub it below) [[deFranchis2022BavenoVII]]. Without prevention, about 60–70% rebleed, usually within 1–2 years [[EASL2018Decomp]]. First-line prevention of rebleeding is an NSBB (or carvedilol) plus band ligation; TIPS, a stent that shunts portal blood straight into a hepatic vein, is the treatment of choice for rebleeding despite them [[deFranchis2022BavenoVII]]. A fall in HVPG of 20% or more, or to 12 mmHg or less, protected against rebleeding [[Feu1995Lancet]].`,
  pt:`A blood-pressure pill from the beta-blocker family, bands placed on the swollen veins, and sometimes a stent inside the liver all help. Only your care team can decide what fits you [[deFranchis2022BavenoVII]].`,
  hook:`Rebleeding prevention = NSBB + band ligation; the combination beat endoscopy alone (RR 0.68) or a β-blocker alone (RR 0.71) for rebleeding [[deFranchis2022BavenoVII,Gonzalez2008AnnIntern]].`}
];
/* bleeding bundle: hours since arrival on a square-root clock */
const PO_BH=h=>Math.sqrt(h/120);
const PO_BUN=[
 {from:0,at:.03,h:0,k:'Arrival · hour 0',t:'Resuscitate, transfuse with restraint',
  txt:`Baveno VII advises conservative red-cell transfusion, with "a target haemoglobin level between 7–8 g/dl", adjusted for heart disease, age, haemodynamics and ongoing bleeding, and intubation before endoscopy for people with altered consciousness or active vomiting of blood [[deFranchis2022BavenoVII]]. In a trial of 921 people with severe upper GI bleeding, a restrictive threshold (Hb &lt;7 g/dl) gave 6-week survival of 95% versus 91% with a liberal one (&lt;9 g/dl), and further bleeding of 10% versus 16% [[Villanueva2013NEJM]].`,
  pt:`More blood is not always better: giving too much can raise the pressure in the portal vein again [[Villanueva2013NEJM]].`,
  hook:`Transfuse to Hb 7–8 g/dl [[deFranchis2022BavenoVII]]. Restrictive vs liberal: 6-week survival 95% vs 91% (HR for death 0.55) [[Villanueva2013NEJM]].`},
 {from:PO_BH(.4),at:PO_BH(.8),h:.5,k:'As soon as possible',t:'A vasoactive drug',
  txt:`Vasoactive drugs (terlipressin, somatostatin or octreotide) "should be started as soon as possible and continued for 2–5 days", in Baveno VII's words [[deFranchis2022BavenoVII]]. EASL 2018 lists the doses as published, for example terlipressin 2 mg every 4 h for the first 48 h, then 1 mg every 4 h [[EASL2018Decomp]]. In a meta-analysis of 30 trials (3111 patients) they lowered 7-day mortality (RR 0.74) and improved bleeding control (RR 1.21) [[Wells2012APT]]. Baveno VII warns of low sodium on terlipressin and advises monitoring it [[deFranchis2022BavenoVII]].`,
  pt:`A medicine given through a drip narrows the gut's blood vessels, so less blood reaches the varices.`,
  hook:`Vasoactive drug: start early, continue 2–5 days [[deFranchis2022BavenoVII]]; 7-day mortality RR 0.74 [[Wells2012APT]].`},
 {from:PO_BH(1.2),at:PO_BH(2),h:1.5,k:'From admission',t:'Antibiotics',
  txt:`Antibiotic prophylaxis "is an integral part of therapy" and starts from admission; Baveno VII suggests ceftriaxone 1 g/24 h in advanced cirrhosis or where quinolone resistance is common [[deFranchis2022BavenoVII]]. Bacterial infections occur in more than half of people with variceal bleeding, and are already present at admission in 20% [[EASL2018Decomp]]. In a Cochrane review (12 trials, 1241 patients), prophylaxis reduced mortality (RR 0.79), bacterial infections (RR 0.36) and rebleeding (RR 0.53) [[ChavezTapia2010Cochrane]].`,
  pt:`People with cirrhosis who bleed pick up infections easily, and infection makes bleeding worse. Antibiotics are part of the standard treatment [[EASL2018Decomp]].`,
  hook:`Antibiotics in a variceal bleed cut mortality (RR 0.79), infection (RR 0.36) and rebleeding (RR 0.53) [[ChavezTapia2010Cochrane]].`},
 {from:PO_BH(4.5),at:PO_BH(6.5),h:6,k:'Within 12 hours',t:'Endoscopy and band ligation',
  txt:`Endoscopy should be done within 12 h of presentation once the person is resuscitated, or as soon as safely possible if unstable. Baveno VII advises considering erythromycin 250 mg IV 30–120 min before, if there is no QT prolongation. Band ligation is the recommended treatment for bleeding oesophageal varices; tissue adhesive (cyanoacrylate) is used for isolated gastric varices and GOV2 [[deFranchis2022BavenoVII]]. Against sclerotherapy, ligation lowered rebleeding (OR 0.52), death (OR 0.67) and strictures (OR 0.10): 4 people treated to avert one rebleed, 10 to prevent one death [[Laine1995AnnIntern]].`,
  pt:`A thin camera goes down the food pipe and small rubber bands are placed around the bleeding veins to close them off.`,
  hook:`Endoscopy within 12 h; band ligation for oesophageal varices, glue for isolated gastric varices [[deFranchis2022BavenoVII]].`},
 {from:PO_BH(20),at:PO_BH(24),h:24,k:'Within 72 h, ideally under 24 h',t:'Pre-emptive TIPS for high risk',
  txt:`Baveno VII criteria for a pre-emptive covered TIPS within 72 h (ideally &lt;24 h): Child–Pugh C &lt;14 points, Child–Pugh B &gt;7 with active bleeding at endoscopy, or HVPG &gt;20 mmHg at the time of bleeding. Encephalopathy at admission, ACLF and high bilirubin should not be treated as contraindications, but TIPS may be futile with Child–Pugh ≥14, or MELD &gt;30 with lactate &gt;12 mmol/L, unless transplant is planned soon [[deFranchis2022BavenoVII]]. In the original trial (63 high-risk patients), 1-year survival was 86% with early TIPS versus 61% with drugs plus band ligation [[GarciaPagan2010NEJM]].`,
  pt:`For people at the highest risk, doctors may place a stent inside the liver early, before another bleed happens [[deFranchis2022BavenoVII]].`,
  hook:`Pre-emptive TIPS ≤72 h: Child–Pugh C &lt;14 or B &gt;7 with active bleeding. 1-year survival 86% vs 61% [[GarciaPagan2010NEJM,deFranchis2022BavenoVII]].`},
 {from:.93,at:1,h:120,k:'Day 5 and after',t:'Checking and preventing',
  txt:`Five-day treatment failure means uncontrolled bleeding or rebleeding within 5 days; 6-week mortality is the main outcome [[deFranchis2022BavenoVII]]. Up to 10–15% keep bleeding despite the bundle, and salvage covered TIPS is the rescue [[EASL2018Decomp,deFranchis2022BavenoVII]]. In a 178-patient cohort, a MELD of 19 or more predicted 6-week mortality of 20% or more, and a MELD below 11 under 5% [[Reverter2014Gastro]]. Afterwards Baveno VII recommends contrast CT or MRI to look for vein thrombosis and liver cancer, and NSBB plus band ligation to prevent rebleeding [[deFranchis2022BavenoVII]].`,
  pt:`After the bleed stops, the plan turns to stopping the next one: tablets, repeat banding, and regular check-ups.`,
  hook:`Without secondary prophylaxis, 60–70% rebleed, usually within 1–2 years [[EASL2018Decomp]].`}
];
/* icon arrays: outcome in 100 people per arm, from the cited trials */
const PO_ICO={
 predesci:{a:['β-blocker',16],b:['placebo',27],ev:'decompensation or death',
  cap:`PREDESCI enrolled 201 people with compensated cirrhosis and CSPH but no high-risk varices. Decompensation or death occurred in 16% with β-blockers (propranolol or carvedilol) versus 27% with placebo (HR 0.51), mainly because fewer people developed ascites; adverse events were similar [[Villanueva2019PREDESCI]]. Baveno VII: NSBBs "should be considered" to prevent decompensation in CSPH [[deFranchis2022BavenoVII]].`},
 tips:{a:['early TIPS',14],b:['drugs + banding',39],ev:'death within 1 year',
  cap:`In 63 high-risk patients (Child–Pugh C, or B with active bleeding), 1-year survival was 86% with TIPS within 72 h versus 61% with drugs plus band ligation, so 14 versus 39 in 100 died; freedom from rebleeding or failure to control bleeding was 97% versus 50% [[GarciaPagan2010NEJM]]. A Chinese trial in 129 Child–Pugh B/C patients found 1-year transplant-free survival of 86% versus 73% [[Lv2019LGH]].`},
 trans:{a:['restrictive (Hb <7)',5],b:['liberal (Hb <9)',9],ev:'death within 6 weeks',
  cap:`In 921 people with severe upper GI bleeding, 6-week survival was 95% with a restrictive threshold versus 91% with a liberal one (HR for death 0.55), so about 5 versus 9 in 100 died. The benefit was significant in Child–Pugh A/B but not C [[Villanueva2013NEJM]].`},
 carv:{a:['carvedilol',10],b:['band ligation',23],ev:'first variceal bleed',
  cap:`In 152 people with grade II or larger varices, carvedilol 12.5 mg once daily was compared with band ligation: first bleeds 10% versus 23% (relative hazard 0.41). Mortality did not differ (35% vs 37%) [[Tripathi2009Hepatology]].`},
 era:{a:['2000',15],b:['1980',43],ev:'in-hospital death after a bleed',
  cap:`At one French centre, in-hospital mortality after variceal bleeding fell from 42.6% in 1980 to 14.5% in 2000 (shown rounded), as vasoactive drugs, endoscopy and antibiotic prophylaxis came into use. Rebleeding fell from 47% to 13% and bacterial infection from 38% to 14% [[Carbonell2004Hepatology]].`}
};
inits.portal=()=>{
  /* piecewise-linear through knots [[x,y],...] */
  const poPL=(k,x)=>{if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
  /* ---------- main: portal map + gauge ---------- */
  const svg=$('#poSvg'),rg=$('#poT'),note=$('#poNote'),rd=$('#poRead');
  const HV=[[0,4],[.18,10.5],[.38,14],[.56,17],[.68,21],[.75,21],[.84,16.5],[.9,16.5],[.98,8],[1,8]];
  const BANDS=[{to:5,col:'var(--good)'},{to:10,col:'var(--bile)'},{to:12,col:'var(--nodule)'},{to:25,col:'var(--bad)'}];
  const ZONES=[[0,5,'≤5','below the threshold'],[5,10,'>5','portal hypertension'],[10,12,'≥10','clinically significant (CSPH)'],[12,20,'≥12','varices can bleed'],[20,99,'>20','at a bleed: early-TIPS criterion']];
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 700');
    const h=poPL(HV,t),fib=lerp(1.2,4,ease(ramp(t,0,.18))),res=lerp(.18,1,ramp(t,0,.2)),
      inflow=lerp(.25,1,ramp(t,.2,.38))*(1-.35*ramp(t,.76,.84)),spl=ramp(t,.2,.45),
      band=ramp(t,.84,.9),vx=ramp(t,.4,.56)*(1-.55*band)*(1-.5*ramp(t,.9,1)),
      co=ramp(t,.45,.6)*(1-.6*ramp(t,.92,1)),bl=ramp(t,.6,.66)*(1-ramp(t,.78,.88)),tp=ramp(t,.9,.97);
    const M=N?{x:212,y:186,s:1.5}:{x:240,y:204,s:1.56},G=N?{x:200,y:468,r:92}:{x:584,y:156,r:102};
    const P=(a,b)=>[M.x+a*M.s,M.y+b*M.s],F=p=>f1(p[0])+' '+f1(p[1]);
    const ph=phaseOf(PO_STEPS,t);let s='';
    s+=`<text x="${N?14:20}" y="${N?16:24}" class="t-lbl">${ph+1} · ${PO_STEPS[ph].t}</text>`;
    /* widened gut arteries feeding the portal system */
    const aw=(1.2+inflow*4.5)*M.s*.7;
    s+=`<path d="M${F(P(-84,96))}Q${F(P(-62,62))} ${F(P(-36,46))}" style="fill:none;stroke:var(--artery);stroke-width:${f1(aw)};stroke-linecap:round;opacity:.8"/>`;
    s+=`<text x="${f1(P(-74,108)[0])}" y="${f1(P(-74,108)[1])}" class="t-xs t-mid" style="fill:var(--artery)">${inflow>.6?'gut arteries widen':'gut arteries'}</text>`;
    /* the portal circulation from the drawing kit */
    const pm=portalMap(M.x,M.y,M.s,{pressure:clamp((h-4)/17),flow:(t*8)%1,spleen:spl,varix:vx,collat:co,bleed:bl,tips:tp,fib,labels:true});
    s+=pm.svg;
    /* bands on the varices */
    if(band>0)for(let i=0;i<4;i++){const cx=M.x+(i%2?14:2)*M.s,cy=M.y+(-60-i*10)*M.s,r=(1.5+vx*3.8)*M.s*(1-i*.12)+1.6;
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:none;stroke:var(--ink);stroke-width:1.8;opacity:${f1(band)}"/>`}
    if(vx>.15){const p=P(22,-85);s+=`<text x="${f1(p[0])}" y="${f1(p[1])}" class="t-xs" style="fill:${bl>.2?'var(--bad)':'var(--portal)'};font-weight:700">${bl>.2?'a varix bleeds':band>.5?'varices banded':'varices'}</text>`}
    if(spl>.3){const sp=pm.at.spleen;s+=`<text x="${f1(sp[0])}" y="${f1(sp[1]+(40+spl*14)*M.s)}" class="t-xs t-mid">enlarging</text>`}
    if(co>.3){const p=P(-4,104);s+=`<text x="${f1(p[0])}" y="${f1(p[1])}" class="t-xs t-mid" style="fill:var(--portal)">navel collaterals</text>`}
    if(tp>.2){const p=P(-84,-8);s+=`<text x="${f1(p[0])}" y="${f1(p[1])}" class="t-xs t-end" style="fill:var(--accent);font-weight:700">TIPS stent</text>`}
    if(t>=.75){const p=P(N?-104:-112,34);s+=pill(p[0],p[1],26*M.s*.8,{ang:-20})+`<text x="${f1(p[0])}" y="${f1(p[1]+22)}" class="t-xs t-mid" style="fill:var(--rx)">less inflow</text>`}
    /* gauge */
    s+=gauge(G.x,G.y,G.r,h,25,{bands:BANDS,big:true,unit:'mmHg',label:'HVPG (illustrative needle)',lo:'0',hi:'25'});
    [5,10,12,20].forEach(v=>{const a=Math.PI*(1-v/25),rr=G.r+11;s+=`<text x="${f1(G.x+rr*Math.cos(a))}" y="${f1(G.y-rr*Math.sin(a)+3)}" class="t-xs t-mid" style="font-weight:700">${v}</text>`});
    /* threshold rows */
    const rx=N?16:452,ry=N?G.y+54:G.y+54,rw=N?368:262,rh=N?20:19;
    ZONES.forEach(([a,b,v,d],i)=>{const on=h>a&&h<=b||(a===0&&h<=5),y=ry+i*rh;
      if(on)s+=`<rect x="${rx-4}" y="${f1(y-12)}" width="${rw}" height="${rh-1}" rx="5" style="fill:var(--accent-soft)"/>`;
      s+=`<rect x="${rx}" y="${f1(y-8)}" width="8" height="8" rx="2" style="fill:${BANDS[Math.min(i,3)].col}"/><text x="${rx+14}" y="${f1(y)}" class="t-sm" style="font-weight:700;fill:var(--ink)">${v}</text><text x="${rx+44}" y="${f1(y)}" class="t-sm"${on?' style="fill:var(--ink);font-weight:700"':''}>${d}</text>`});
    /* resistance and inflow bars */
    const bx=rx,by=N?ry+5*rh+16:ry+5*rh+14,bw=N?250:200;
    s+=`<text x="${bx}" y="${by}" class="t-sm">${res>.9?'resistance: 70% scar · 30% tone':'resistance inside the liver'}</text>`;
    s+=`<rect x="${bx}" y="${by+5}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by+5}" width="${f1(bw*res*.7)}" height="10" rx="3" style="fill:var(--scar-line)"/><rect x="${f1(bx+bw*res*.7)}" y="${by+5}" width="${f1(bw*res*.3)}" height="10" style="fill:var(--portal);opacity:.6"/>`;
        s+=`<text x="${bx}" y="${by+32}" class="t-sm">inflow from the gut</text>`;
    s+=`<rect x="${bx}" y="${by+37}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by+37}" width="${f1(bw*inflow)}" height="10" rx="3" style="fill:var(--artery);opacity:.75"/>`;
    if(N&&res>.9){/* the split label fits beside the bar only in the wide layout */}
    svg.innerHTML=s;
    const z=ZONES.find(([a,b])=>h>a&&h<=b)||ZONES[0];
    rd.innerHTML=`<span>HVPG <b>${Math.round(h)} mmHg</b> (illustrative)</span><span>Zone <b>${z[3]}</b></span><span>Varices <b>${vx<.05?'none yet':bl>.2?'bleeding':band>.5?'banded':'present'}</b></span>`;
    note.innerHTML=noteHTML(PO_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#poPlay'),draw,24000,'Replay','portal');
  setSt=stepWire($('#poSteps'),PO_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the bleeding bundle clock ---------- */
  const bs=$('#poBun'),br=$('#poBunT'),bn=$('#poBunNote');let setB=()=>{};
  const LANES=[
    {n:'Restrictive transfusion',d:'target Hb 7–8 g/dl',s:0,e:120,col:'var(--artery)'},
    {n:'Vasoactive drug',d:'start ASAP · 2–5 days',s:.5,e:48,e2:120,col:'var(--brand)'},
    {n:'Antibiotics',d:'from admission',s:1.5,e:72,fade:true,col:'var(--rx)'},
    {n:'Endoscopy + banding',d:'within 12 h · band ligation',s:6,win:[0,12],col:'var(--dx)',pt:6},
    {n:'Pre-emptive TIPS',d:'high risk · ≤72 h (ideal <24 h)',s:24,win:[0,72],ideal:24,col:'var(--accent)',pt:24}];
  function drawB(t){
    const N=vb(bs,'720 330','400 470');const hr=120*t*t;
    const x0=N?20:206,x1=N?384:700,X=hh=>x0+(x1-x0)*Math.sqrt(clamp(hh,0,120)/120);
    const ph=phaseOf(PO_BUN,t);let s=`<defs><linearGradient id="poFade" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="poFadeM" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#poFade)"/></mask></defs>`;
    const axY=N?406:282;
    LANES.forEach((L,i)=>{const ly=N?40+i*72:44+i*46,by=N?ly+10:ly-12,bh=N?16:18,on=hr>=L.s;
      /* label */
      if(N){s+=`<text x="${x0}" y="${ly}" class="t-lbl" style="font-size:12.5px${on?'':';fill:var(--muted)'}">${on?'✓ ':''}${L.n}</text><text x="${x1-8}" y="${ly}" class="t-sm t-end">${L.d}</text>`}
      else{s+=`<text x="16" y="${ly}" class="t-lbl" style="${on?'':'fill:var(--muted)'}">${on?'✓ ':''}${L.n}</text><text x="16" y="${ly+13}" class="t-xs">${L.d}</text>`}
      s+=`<rect x="${x0}" y="${by}" width="${x1-x0}" height="${bh}" rx="4" style="fill:var(--panel-2);opacity:.6"/>`;
      if(L.win){s+=`<rect x="${f1(X(L.win[0]))}" y="${by}" width="${f1(X(L.win[1])-X(L.win[0]))}" height="${bh}" rx="4" style="fill:${L.col};opacity:.14"/>`;
        if(L.ideal)s+=`<rect x="${f1(X(0))}" y="${by}" width="${f1(X(L.ideal)-X(0))}" height="${bh}" rx="4" style="fill:${L.col};opacity:.16"/>`;
        s+=`<line x1="${f1(X(L.win[1]))}" x2="${f1(X(L.win[1]))}" y1="${by-3}" y2="${by+bh+3}" style="stroke:${L.col};stroke-width:2"/>`}
      if(L.pt!=null){if(hr>=L.pt){const cx=X(L.pt);s+=`<circle cx="${f1(cx)}" cy="${f1(by+bh/2)}" r="${f1(bh/2+1)}" style="fill:${L.col}"/><path d="M${f1(cx-4)} ${f1(by+bh/2)}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
          if(i===3&&!N)s+=`<text x="${f1(cx+12)}" y="${f1(by+bh/2+3)}" class="t-xs" style="fill:var(--dx)">bands placed</text>`;
          if(i===4&&!N)s+=`<text x="${f1(cx+12)}" y="${f1(by+bh/2+3)}" class="t-xs" style="fill:var(--accent)">if criteria met</text>`}
        if(i===3&&hr>=4.8){const ex=X(5);s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${by+2}" y2="${by+bh-2}" style="stroke:var(--dx);stroke-width:2"/>`}}
      else if(on){const xe=X(Math.min(hr,L.e));
        s+=`<rect x="${f1(X(L.s))}" y="${by+3}" width="${f1(Math.max(2,xe-X(L.s)))}" height="${bh-6}" rx="3" style="fill:${L.col};opacity:.8"${L.fade?' mask="url(#poFadeM)"':''}/>`;
        if(L.e2&&hr>L.e){s+=`<rect x="${f1(X(L.e))}" y="${by+3}" width="${f1(X(Math.min(hr,L.e2))-X(L.e))}" height="${bh-6}" rx="3" style="fill:none;stroke:${L.col};stroke-width:1.4;stroke-dasharray:4 3"/>`}}
    });
    /* day 5 line and axis */
    s+=`<line x1="${f1(X(120))}" x2="${f1(X(120))}" y1="${N?28:24}" y2="${axY}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 3"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${axY}" y2="${axY}" class="axis"/>`;
    (N?[0,1,6,12,24,72,120]:[0,1,6,12,24,48,72,120]).forEach(v=>{const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${axY-4}" y2="${axY+4}" class="axis"/><text x="${f1(xx)}" y="${axY+16}" class="t-xs t-mid${v===120?' ':''}">${v===120?'day 5':v===0?'0':v+' h'}</text>`});
    s+=`<text x="${x1}" y="${axY+32}" class="t-xs t-end">hours since arrival (square-root scale)</text>`;
    if(hr>=110)s+=`<text x="${f1(X(120)-6)}" y="${N?axY-8:axY-8}" class="t-xs t-end" style="fill:var(--bad);font-weight:700">5-day treatment failure check</text>`;
    /* the clock hand */
    const cx=X(hr);if(N)LANES.forEach((L,i)=>{const by=40+i*72+10;s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${by-3}" y2="${by+19}" style="stroke:var(--ink);stroke-width:1.6"/>`});else s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="22" y2="${axY}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    const lab=hr<1?Math.round(hr*60)+' min':hr<48?f1(hr).replace('.0','')+' h':'day '+f1(hr/24).replace('.0','');
    s+=`<rect x="${f1(clamp(cx-30,x0-14,x1-46))}" y="${N?6:4}" width="60" height="17" rx="8" style="fill:var(--ink)"/><text x="${f1(clamp(cx-30,x0-14,x1-46)+30)}" y="${N?18:16}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${lab}</text>`;
    bs.innerHTML=s;bn.innerHTML=noteHTML(PO_BUN[ph]);setB(ph);
  }
  const stopB=playWire(br,$('#poBunPlay'),drawB,16000,'Replay','portal');
  setB=stepWire($('#poBunSteps'),PO_BUN,br,drawB,stopB);
  drawB(+br.value);

  /* ---------- icon arrays ---------- */
  const is=$('#poIco'),ic=$('#poIcoCap');let curI='predesci',stopI=()=>{};
  function grid(x,y,n,k,col,dx,dy,sz){let g='';for(let i=0;i<n;i++){const c=i%10,r=Math.floor(i/10);g+=person(x+c*dx,y+r*dy,sz,i<k?col:'var(--line)')}return g}
  function drawI(p){const N=vb(is,'720 300','400 590'),D=PO_ICO[curI];let s='';
    const cols=N?[[60,46],[60,340]]:[[64,56],[414,56]],dx=N?29:25,dy=N?22:22,sz=N?18:18;
    [D.a,D.b].forEach(([nm,v],j)=>{const [x,y]=cols[j],k=Math.round(v*p),col=j?'var(--muted)':'var(--accent)';
      s+=`<text x="${x-8}" y="${y-22}" class="t-lbl">${nm}</text><text x="${x+dx*10-14}" y="${y-20}" class="t-big t-end" style="font-size:24px;fill:${j?'var(--ink)':'var(--accent)'}">${k}<tspan class="t-xs" style="font-size:11px"> in 100</tspan></text>`;
      s+=grid(x,y-6,100,k,j?'var(--bad)':'var(--bad)',dx,dy,sz)});
    s+=`<text x="${N?200:360}" y="${N?574:292}" class="t-xs t-mid">highlighted: ${D.ev}</text>`;
    is.innerHTML=s}
  function pickI(k){curI=k;$$('[data-ic]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ic===k));ic.innerHTML=PO_ICO[k].cap;stopI();stopI=animate(900,p=>drawI(ease(p)))}
  $$('[data-ic]').forEach(b=>b.addEventListener('click',()=>pickI(b.dataset.ic)));
  ic.innerHTML=PO_ICO[curI].cap;drawI(1);
  redraws.portal=(()=>{const prev=redraws.portal;return()=>{prev&&prev();drawI(1);drawBav()}})();

  /* ---------- Baveno VII endoscopy rule ---------- */
  const ls=$('#poLsm'),pl=$('#poPlt'),nb=$('#poNsbb'),bv=$('#poBavV'),bc=$('#poBavC'),sv=$('#poBavSvg');
  function drawBav(){const L=+ls.value,Pl=+pl.value,on=nb.checked;
    $('#poLsmO').textContent=L+' kPa';$('#poPltO').textContent=Pl+' ×10⁹/L';
    const X=v=>52+(v-5)/55*330,Y=v=>250-(v-40)/310*226;let s='';
    s+=`<rect x="52" y="24" width="330" height="226" style="fill:var(--field)"/>`;
    s+=`<rect x="${f1(X(5))}" y="${f1(Y(350))}" width="${f1(X(20)-X(5))}" height="${f1(Y(150)-Y(350))}" style="fill:var(--good-soft)"/>`;
    s+=`<rect x="${f1(X(20))}" y="24" width="${f1(X(60)-X(20))}" height="226" style="fill:var(--bad-soft);opacity:.7"/><rect x="${f1(X(5))}" y="${f1(Y(150))}" width="${f1(X(20)-X(5))}" height="${f1(250-Y(150))}" style="fill:var(--bad-soft);opacity:.7"/>`;
    s+=`<text x="${f1((X(5)+X(20))/2)}" y="${f1(Y(260))}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">endoscopy</text><text x="${f1((X(5)+X(20))/2)}" y="${f1(Y(260)+12)}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">can be avoided</text>`;
    s+=`<text x="${f1((X(20)+X(60))/2)}" y="${f1(Y(330))}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">screening endoscopy</text>`;
    [[15,'15'],[25,'25']].forEach(([v,l])=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="24" y2="250" class="grid"/>`});
    s+=`<line x1="${f1(X(20))}" x2="${f1(X(20))}" y1="24" y2="250" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/><line x1="52" x2="382" y1="${f1(Y(150))}" y2="${f1(Y(150))}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/>`;
    s+=`<line x1="52" x2="382" y1="250" y2="250" class="axis"/><line x1="52" x2="52" y1="24" y2="250" class="axis"/>`;
    [5,10,15,20,25,40,60].forEach(v=>{s+=`<text x="${f1(X(v))}" y="264" class="t-xs t-mid">${v}</text>`});
    [50,100,150,200,250,300,350].forEach(v=>{s+=`<text x="46" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="382" y="282" class="t-xs t-end">liver stiffness, kPa (dotted: 15 and 25, the CSPH rules)</text><text x="12" y="16" class="t-xs">platelets ×10⁹/L</text>`;
    const px=X(L),py=Y(Pl);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.5"/>`;
    if(on)s+=`<rect x="52" y="24" width="330" height="226" style="fill:var(--panel);opacity:.72"/><text x="217" y="132" class="t-lbl t-mid">On an NSBB: the result would</text><text x="217" y="150" class="t-lbl t-mid">not change management</text>`;
    sv.innerHTML=s;
    let v,c;
    if(on){v='No screening endoscopy needed: Baveno VII states the result would not change management for people on NSBBs.';c='yes'}
    else if(L<20&&Pl>150){v='Under this rule a screening endoscopy can be avoided; elastography and platelets are repeated yearly.';c='yes'}
    else{v=`Under this rule a screening endoscopy is indicated (${L>=20?'stiffness ≥20 kPa':''}${L>=20&&Pl<=150?' and ':''}${Pl<=150?'platelets ≤150×10⁹/L':''}).`;c='no'}
    bv.className='verdict '+c;bv.textContent=v;
    bc.innerHTML=(L<=15&&Pl>=150?'Stiffness ≤15 kPa with platelets ≥150×10⁹/L also rules out CSPH (sensitivity and negative predictive value &gt;90%).':L>=25?'Stiffness ≥25 kPa also rules in CSPH (specificity and positive predictive value &gt;90%) in viral, alcohol-related and non-obese NASH-related compensated advanced chronic liver disease.':'These values sit between the two Baveno VII rules for CSPH (≤15 kPa with platelets ≥150 rules it out; ≥25 kPa rules it in).')+' [[deFranchis2022BavenoVII]]';
  }
  [ls,pl,nb].forEach(e=>e.addEventListener('input',drawBav));nb.addEventListener('change',drawBav);
  drawBav();
};
