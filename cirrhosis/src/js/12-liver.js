/* =============== 1.2 The liver and what it does =============== */
const LI_STEPS=[
 {k:'Step 1 · blood in',t:'Two blood supplies',
  txt:`The liver is about 2.5% of body weight yet receives nearly 25% of the heart's output: 800–1200 mL of blood a minute. About 75–80% arrives through the portal vein, partly deoxygenated blood draining the spleen, stomach, intestines, gallbladder and pancreas. The hepatic artery brings the remaining ~25%, well oxygenated. The portal vein is a valveless, low-pressure circuit; the artery is a high-pressure one. When portal flow falls, arterial flow rises and can buffer 25–60% of the loss: the hepatic arterial buffer response. [[Eipel2010]]`,
  pt:`Most of the liver's blood comes straight from the gut through the portal vein, so the liver sees what is absorbed from food and medicines first. A smaller artery adds oxygen-rich blood.`,
  hook:`Portal vein ≈75%, hepatic artery ≈25% of inflow. The liver gets ≈25% of cardiac output at ≈2.5% of body weight. [[Eipel2010]]`},
 {k:'Step 2 · the lobule',t:'Corners to centre, zone by zone',
  txt:`The classic unit is a hexagonal lobule: plates of hepatocytes radiate around a central vein, with portal triads (branches of the hepatic artery, portal vein and bile duct) at the corners. Arterial and portal blood mix in the sinusoids and flow toward the central vein. Oxygen, nutrients and hormones fall along the way, so work divides into zones, from periportal zone 1 to pericentral zone 3; in reality a continuum. [[Trefts2017]] In mice, about 50% of liver genes are zonated. [[Halpern2017]] Bile runs the other way, in canaliculi about 1 µm wide. [[Boyer2013]] Zonation is often lost in liver disease. [[Kietzmann2017]]`,
  pt:`Blood enters at the corners and drains to the middle. Cells near the corners get the most oxygen, cells near the centre the least, and they share out the work accordingly.`,
  hook:`Zone 1 = periportal, most oxygen. Zone 3 = pericentral, least oxygen. [[Trefts2017,Kietzmann2017]]`},
 {k:'Step 3 · the cells',t:'Four cells along one sinusoid',
  txt:`Hepatocytes make up most of the liver's volume and do most of its metabolic and synthetic work; cholangiocytes line the bile ducts. [[Trefts2017]] The sinusoid lining (LSECs) is a sieve with windows of 50–180 nm and no tight junctions, the most permeable endothelium in mammals; in health it keeps portal pressure low and stellate cells quiet. [[Trefts2017,Poisson2017]] Stellate cells sit in the space of Disse, are about 15% of resident liver cells, and store 80–90% of the liver's vitamin A. [[Friedman2008PhysiolRev]] Kupffer cells, 80–90% of the body's tissue macrophages, wait inside the sinusoids, exposed to gut bacteria and endotoxin. [[Bilzer2006]]`,
  pt:`Each tiny blood channel is shared by working liver cells, a sieve-like lining, star-shaped vitamin A stores and resident clean-up cells that catch germs coming from the gut.`,
  hook:`Stellate cells: space of Disse, vitamin A, the future scar-makers. Kupffer cells: resident liver macrophages. [[Friedman2008PhysiolRev,Bilzer2006]]`},
 {k:'Step 4 · protein factory',t:'Albumin and clotting proteins',
  txt:`The liver makes 85–90% of circulating protein volume, including albumin, the most abundant at about 55% of plasma protein. [[Trefts2017]] Healthy people make about 10.5 g of albumin a day, and it turns over in about 25 days. Reduced synthesis in liver disease is the best-understood cause of chronically low albumin. [[Levitt2016]] Clotting tests sit beside albumin in the severity scores: Pugh's version of the Child score added prothrombin time/INR, and MELD uses INR. [[Peng2016ChildMELD,Kamath2001MELD]]`,
  pt:`Liver cells are protein factories. Albumin, the commonest protein in blood, comes from here, so a falling level can be a sign the liver is struggling.`,
  hook:`Albumin ≈55% of plasma protein; ≈10.5 g made a day; turnover ≈25 days. [[Trefts2017,Levitt2016]]`},
 {k:'Step 5 · bile',t:'Bile flows against the blood',
  txt:`Bile is secreted into canaliculi (about 1 µm wide) formed between neighbouring hepatocytes. It flows countercurrent to portal blood, then through the canals of Hering into the bile ducts at the portal triads. ATP-binding cassette export pumps on the canalicular membrane drive secretion; about 5% of bile is dissolved solutes. [[Boyer2013]] Most bilirubin in the blood is unconjugated; a raised conjugated (direct) bilirubin implies liver-cell disease or blocked bile flow in most settings. [[Kwo2017ACG]]`,
  pt:`Liver cells pump bile into hair-thin channels between them. It runs the opposite way to the blood, out toward the bile ducts.`,
  hook:`Blood: triad → central vein. Bile: central → triad. A raised direct bilirubin points to liver-cell disease or obstruction. [[Boyer2013,Kwo2017ACG]]`},
 {k:'Step 6 · fuel',t:'The sugar bank',
  txt:`After a meal the liver stores glucose as glycogen. During fasting it releases glucose by breaking glycogen down and by making new glucose (gluconeogenesis), which becomes the main source in a prolonged fast; it also turns fatty acids into ketone bodies to fuel other tissues. [[Rui2014,Trefts2017]] In cirrhosis the store is small: the state is described as "accelerated starvation", with gluconeogenesis starting early after short fasts, which drives muscle breakdown. [[Tsien2012,Plank2008]] More in <a href="#nutrition" data-go="nutrition">Nutrition, muscle &amp; medicine safety</a>.`,
  pt:`The liver saves sugar after meals and pays it out between them. A scarred liver runs out quickly, so overnight the body starts using muscle.`,
  hook:`Cirrhosis = "accelerated starvation": the reason a late evening snack is studied. [[Tsien2012,Plank2008]]`},
 {k:'Step 7 · clearing',t:'Ammonia to urea, medicines broken down',
  txt:`Ammonia is made mainly in the gut, from protein digestion, amino acid breakdown and bacterial urease. A healthy liver with an intact urea cycle keeps blood ammonia in the low 35–50 µM range. [[Rose2020]] The liver disposes of this nitrogen as urea. [[Trefts2017]] About a dozen cytochrome P450 enzymes metabolise 70–80% of drugs in clinical use; CYP3A4, 2C9, 2C8, 2E1 and 1A2 are the most abundant in the liver. [[Zanger2013]] Most medicines have not been adequately studied in cirrhosis. [[Lewis2013]]`,
  pt:`The liver turns ammonia, a waste from digesting protein, into urea, and it breaks down most medicines. When it fails, both can build up.`,
  hook:`Urea cycle: ammonia → urea (healthy ammonia ≈35–50 µM). About 12 CYPs handle 70–80% of drugs; CYP3A4 is the most abundant. [[Rose2020,Zanger2013]]`}
].map((s,i,a)=>Object.assign(s,{from:i/a.length,at:i/a.length+.5/a.length}));

const LI_FAIL={
 alb:{n:'Albumin',col:'var(--fluid)',
  lost:'Making albumin',sign:'Fluid in the belly (ascites) and swelling, though albumin is only part of the cause.',test:'Low serum albumin.',
  txt:`Reduced synthesis in liver disease is the best-understood cause of chronically low albumin. [[Levitt2016]] But ascites is driven mainly by the kidneys holding on to sodium, triggered by arterial vasodilation, with portal hypertension directing the fluid into the abdomen. [[EASL2018Decomp,Schrier1988Hepatology]] Albumin is one of the five Child–Pugh items and is part of MELD 3.0. [[Peng2016ChildMELD,Kim2021MELD3]]`,go:'ascites',goT:'Ascites, infection & kidney injury'},
 clot:{n:'Clotting proteins',col:'var(--artery)',
  lost:'Making clotting proteins',sign:'Bleeding risk changes, but not in a simple "thin blood" way.',test:'Raised INR (prothrombin time).',
  txt:`Pugh's version of the Child score uses prothrombin time/INR, and MELD uses INR. [[Peng2016ChildMELD,Kamath2001MELD]] A high INR in cirrhosis does not simply mean the blood is "thin": Baveno VII does not recommend fresh frozen plasma during variceal bleeding, because it will not correct the coagulopathy and may worsen portal hypertension. [[deFranchis2022BavenoVII]] In 4,729 paracenteses, severe bleeding was not related to INR or platelets. [[Pache2005]]`,go:'scores',goT:'Child–Pugh & MELD scores'},
 bili:{n:'Bilirubin & bile',col:'var(--bile)',
  lost:'Clearing bilirubin into bile',sign:'Yellow skin and eyes (jaundice).',test:'Raised bilirubin, especially conjugated (direct).',
  txt:`A raised conjugated bilirubin implies liver-cell disease or blocked bile flow in most settings. [[Kwo2017ACG]] Jaundice is one of the visible signs of decompensated cirrhosis, alongside ascites, confusion and variceal bleeding. [[deFranchis2022BavenoVII,Tapper2023JAMA]] Bilirubin is in Child–Pugh, MELD and MELD 3.0. [[Peng2016ChildMELD,Kamath2001MELD,Kim2021MELD3]]`,go:'tests',goT:'Blood tests, scans & biopsy'},
 nh3:{n:'Ammonia clearance',col:'var(--nh3)',
  lost:'Turning ammonia into urea',sign:'Confusion, sleepiness, personality change: hepatic encephalopathy.',test:'Diagnosed clinically; an ammonia level alone does not diagnose or stage it.',
  txt:`Ammonia comes mainly from the gut. It passes freely into the brain, where astrocytes remove it; ammonia "remains the central player" in hepatic encephalopathy, with inflammation also contributing. When the liver fails, muscle becomes an alternative ammonia sink, which is why muscle loss raises the risk. [[Rose2020]] "High blood-ammonia levels alone do not add any diagnostic, staging, or prognostic value." [[Vilstrup2014HE]]`,go:'encephalopathy',goT:'Hepatic encephalopathy'},
 glu:{n:'Fuel store',col:'var(--vita)',
  lost:'Storing glucose as glycogen',sign:'Muscle wasting and weakness (sarcopenia).',test:'Muscle measures (for example CT muscle index), not a single blood test.',
  txt:`Cirrhosis is a state of "accelerated starvation": gluconeogenesis starts early after short fasts, which drives muscle breakdown. [[Tsien2012,Plank2008]] Sarcopenia affects "30%-70% of patients with end-stage liver disease" in AASLD guidance; a meta-analysis pooled 33%. [[Lai2021AASLD,Mazeaud2023]]`,go:'nutrition',goT:'Nutrition, muscle & medicine safety'},
 drug:{n:'Medicine handling',col:'var(--rx)',
  lost:'Breaking down medicines',sign:'Medicines can build up or tip someone into confusion.',test:'Clinical review of every medicine; drug levels for some.',
  txt:`About a dozen CYP enzymes metabolise 70–80% of drugs. [[Zanger2013]] Most medicines "have not been adequately studied in cirrhosis", and lower or less frequent doses are often recommended. [[Lewis2013]] Opioid prescriptions were linked with more hepatic encephalopathy (adjusted HR 1.44 short-term, 1.83 chronic), and long-acting or high-dose benzodiazepines with benzodiazepine-associated encephalopathy. [[Moon2020Opioids,Lee2014BZD]]`,go:'nutrition',goT:'Nutrition, muscle & medicine safety'},
 flow:{n:'Blood flow through',col:'var(--portal)',
  lost:'Letting portal blood pass easily',sign:'Swollen veins (varices), an enlarged spleen, fluid.',test:'Low platelets; pressure (HVPG) or stiffness measures.',
  txt:`Scar and nodules distort the architecture and activated stellate cells contract, raising resistance to sinusoidal flow. [[Bataller2005,Schuppan2008]] A hepatic venous pressure gradient above 10 mmHg defines clinically significant portal hypertension. [[GarciaTsao2010]] Platelets fall partly because an enlarged spleen holds on to them and thrombopoietin falls. [[Afdhal2008Platelets]]`,go:'portal',goT:'Portal hypertension & varices'}
};

inits.liver=()=>{
  const svg=$('#liSvg'),rg=$('#liT'),N=LI_STEPS.length,seg=1/N;
  const Q=(u,a,b,c)=>[(1-u)*(1-u)*a[0]+2*(1-u)*u*b[0]+u*u*c[0],(1-u)*(1-u)*a[1]+2*(1-u)*u*b[1]+u*u*c[1]];
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const TH=(x,y,txt,c='t-xs t-mid')=>T(x,y,txt,c,'fill:var(--ink);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3.5px;stroke-linejoin:round');
  const lead=(x1,y1,x2,y2)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:.8;opacity:.8"/>`;
  const kup=(x,y,s=1)=>`<path d="M${f1(x-14*s)} ${f1(y)}q2 -10 12 -9q4 -8 12 -2q9 1 6 9q6 6 -2 10q-4 8 -12 4q-8 6 -12 -2q-9 -2 -4 -10z" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y+1)}" r="${f1(3.4*s)}" style="fill:var(--accent);opacity:.75"/>`;
  const bug=(x,y,a=1)=>`<rect x="${f1(x-4)}" y="${f1(y-1.6)}" width="8" height="3.2" rx="1.6" style="fill:var(--good);opacity:${f1(a)}"/>`;
  /* ---------- the seven close-ups, drawn in a 360 x 340 box ---------- */
  const SC=[
   /* 1: two blood supplies */
   (u,fl)=>{let s='';
    s+=`<rect x="10" y="50" width="112" height="58" rx="8" style="fill:var(--portal-soft)"/>`+T(66,68,'from the gut,','t-xs t-mid','fill:var(--ink)')+T(66,82,'spleen, stomach','t-xs t-mid','fill:var(--ink)')+T(66,96,'and pancreas','t-xs t-mid','fill:var(--ink)');
    s+=`<rect x="10" y="214" width="112" height="34" rx="8" style="fill:var(--bad-soft)"/>`+T(66,235,'from the aorta','t-xs t-mid','fill:var(--ink)');
    const pa=[122,82],pb=[190,92],pc=[236,150],aa=[122,230],ab=[190,222],ac=[236,176];
    s+=`<path d="M${pa}Q${pb} ${pc}" style="fill:none;stroke:var(--portal);stroke-width:16;stroke-linecap:round;opacity:.9"/>`;
    s+=`<path d="M${aa}Q${ab} ${ac}" style="fill:none;stroke:var(--artery);stroke-width:5.5;stroke-linecap:round"/>`;
    s+=liver(286,160,.62,{gb:false}).svg;
    for(let i=0;i<9;i++){const p=Q((fl+i/9)%1,pa,pb,pc);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.6" style="fill:var(--panel)"/>`}
    for(let i=0;i<3;i++){const p=Q((fl+i/3)%1,aa,ab,ac);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2" style="fill:var(--panel)"/>`}
    s+=T(150,70,'portal vein','t-sm')+T(150,250,'hepatic artery','t-sm');
    const g=ease(ramp(u,.05,.7)),bw=320;
    s+=T(20,284,'share of blood flowing into the liver','t-xs');
    s+=`<rect x="20" y="292" width="${bw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="20" y="292" width="${f1(bw*.75*g)}" height="18" rx="4" style="fill:var(--portal)"/><rect x="${f1(20+bw*.75*g)}" y="292" width="${f1(bw*.25*g)}" height="18" rx="4" style="fill:var(--artery)"/>`;
    if(g>.3)s+=T(28,305,`portal ${Math.round(75*g)}%`,'t-xs','fill:#fff;font-weight:700');
    if(g>.9)s+=T(336,305,'artery 25%','t-xs t-end','fill:#fff;font-weight:700');
    s+=T(20,328,'≈25% of cardiac output · ≈2.5% of body weight','t-xs');
    return s},
   /* 2: zones along one sinusoid */
   (u,fl)=>{let s='';const x0=48,x1=318,y0=130,y1=186,w=(x1-x0)/3;
    [['var(--artery)',.26],['var(--artery)',.14],['var(--portal)',.16]].forEach(([c,o],i)=>{s+=`<rect x="${f1(x0+i*w)}" y="${y0}" width="${f1(w)}" height="${y1-y0}" style="fill:${c};opacity:${o}"/>`});
    s+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" style="fill:none;stroke:var(--line)"/>`;
    for(let i=0;i<5;i++){const cx=x0+16+i*58;s+=hepatocyte(cx,y0-22,40,{seed:i+2})+hepatocyte(cx+20,y1+22,40,{seed:i+9})}
    /* triad and central vein */
    s+=`<circle cx="${x0-18}" cy="${f1((y0+y1)/2-6)}" r="9" style="fill:var(--portal)"/><circle cx="${x0-26}" cy="${f1((y0+y1)/2+10)}" r="5" style="fill:var(--artery)"/><circle cx="${x0-10}" cy="${f1((y0+y1)/2+12)}" r="4.5" style="fill:var(--bile);stroke:var(--accent)"/>`;
    s+=`<circle cx="${x1+20}" cy="${(y0+y1)/2}" r="13" style="fill:var(--panel);stroke:var(--portal);stroke-width:2"/>`;
    s+=T(x0-18,y1+56,'portal triad','t-xs t-mid')+T(x1+20,y1+56,'central vein','t-xs t-mid');
    for(let i=0;i<12;i++){const p=(fl*1.4+i/12)%1,x=lerp(x0,x1,p),y=y0+10+((i*37)%36);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:${i%4?'var(--portal)':'var(--artery)'};opacity:.85"/>`}
    /* bile: canaliculus above the upper plate, flowing the other way */
    const by=y0-50;s+=`<line x1="${x0}" x2="${x1}" y1="${by}" y2="${by}" style="stroke:var(--bile);stroke-width:3;opacity:.6"/>`;
    for(let i=0;i<7;i++){const p=1-((fl+i/7)%1);s+=`<circle cx="${f1(lerp(x0,x1,p))}" cy="${by}" r="2.4" style="fill:var(--bile)"/>`}
    s+=T(x1,by-8,'← bile (countercurrent)','t-xs t-end','fill:var(--accent)')+TH(x0+30,y1-6,'blood →');
    const lab=['zone 1','zone 2','zone 3'];
    lab.forEach((l,i)=>{if(u>i*.15)s+=TH(x0+w*i+w/2,y0+13,l)});
    /* oxygen wedge */
    const wy=268;s+=`<path d="M${x0} ${wy-9}L${x1} ${wy-1}L${x1} ${wy+1}L${x0} ${wy+9}Z" style="fill:var(--artery);opacity:.55"/>`+T(x0,wy+24,'oxygen high','t-xs')+T(x1,wy+24,'oxygen low','t-xs t-end');
    if(u>.45)s+=T(180,318,'≈50% of liver genes are zonated (mice)','t-xs t-mid','fill:var(--ink)');
    return s},
   /* 3: the four cells */
   (u,fl)=>{let s='';const ly0=124,ly1=176;
    for(let i=0;i<6;i++){s+=hepatocyte(42+i*56,72,50,{seed:i+1})+hepatocyte(42+i*56,238,50,{seed:i+11})}
    s+=`<rect x="10" y="${ly0-18}" width="340" height="18" style="fill:var(--scar);opacity:.35"/><rect x="10" y="${ly1}" width="340" height="22" style="fill:var(--scar);opacity:.35"/>`;
    s+=`<rect x="10" y="${ly0}" width="340" height="${ly1-ly0}" style="fill:var(--portal-soft)"/>`;
    s+=`<line x1="10" x2="350" y1="${ly0}" y2="${ly0}" style="stroke:var(--brand);stroke-width:3.4;stroke-dasharray:15 4"/><line x1="10" x2="350" y1="${ly1}" y2="${ly1}" style="stroke:var(--brand);stroke-width:3.4;stroke-dasharray:15 4"/>`;
    for(let i=0;i<14;i++){const p=(fl*1.2+i/14)%1;s+=`<circle cx="${f1(10+p*340)}" cy="${f1(ly0+9+(i*19)%34)}" r="3.2" style="fill:${i%5?'var(--artery)':'var(--portal)'};opacity:.7"/>`}
    s+=kup(132,150,1.1);
    for(let i=0;i<4;i++){const p=(fl*1.2+i/4)%1,x=10+p*120;if(x<118)s+=bug(x,138+i*7)}
    s+=stellate(238,187,.82,{act:0,ang:6});
    const L=[[.05,'hepatocytes: most of the work',16,26,42,48],[.2,'LSEC sieve: 50–180 nm windows',146,112,250,124],[.4,'stellate cell (vitamin A store)',96,212,226,192],[.6,'Kupffer cell catching gut bacteria',120,322,132,166]];
    L.forEach(([a,txt,tx,ty,px,py])=>{if(u>=a)s+=lead(tx+(tx>200?0:4),ty-4,px,py)+T(tx,ty,txt,'t-xs','fill:var(--ink)')});
    return s},
   /* 4: albumin and clotting proteins */
   (u,fl)=>{let s='';const hx=104,hy=160;
    s+=`<rect x="250" y="20" width="70" height="300" rx="10" style="fill:var(--portal-soft)"/>`;
    s+=hepatocyte(hx,hy,170,{seed:5});
    s+=T(hx,hy+102,'hepatocyte','t-xs t-mid');
    for(let i=0;i<14;i++){const p=(fl*1.5+i/14)%1,ang=(i*47%60-30)*Math.PI/180,alb=i%3>0;
      let x,y;if(p<.5){const q=p/.5;x=lerp(hx+20,262,q);y=hy+Math.sin(ang)*60*q}else{const q=(p-.5)/.5;x=262+(i%4)*14;y=hy+Math.sin(ang)*60+q*150}
      if(y>318||y<22)continue;
      s+=alb?`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4.6" ry="3" style="fill:var(--fluid-fill);stroke:var(--fluid)"/>`:`<path d="M${f1(x)} ${f1(y-4)}l4 4l-4 4l-4 -4z" style="fill:var(--artery)"/>`}
    s+=`<ellipse cx="30" cy="300" rx="5" ry="3.2" style="fill:var(--fluid-fill);stroke:var(--fluid)"/>`+T(40,304,'albumin','t-xs');
    s+=`<path d="M110 296l4 4l-4 4l-4 -4z" style="fill:var(--artery)"/>`+T(120,304,'clotting proteins','t-xs');
    s+=T(285,14,'sinusoid','t-xs t-mid');
    const g=ramp(u,.05,.85);s+=T(20,30,'ALBUMIN MADE TODAY','t-xs')+`<text x="20" y="56" class="t-big" style="font-size:24px">${f1(10.5*g)} g</text>`+T(20,72,'of ≈10.5 g a day','t-xs');
    s+=T(20,330,'albumin ≈55% of plasma protein','t-xs');
    return s},
   /* 5: bile */
   (u,fl)=>{let s='';
    s+=`<rect x="20" y="40" width="40" height="230" rx="8" style="fill:var(--portal-soft)"/><rect x="300" y="40" width="40" height="230" rx="8" style="fill:var(--portal-soft)"/>`;
    for(let r=0;r<2;r++){s+=hepatocyte(120,100+r*110,104,{seed:r+3})+hepatocyte(240,100+r*110,104,{seed:r+7})}
    s+=`<rect x="175" y="44" width="10" height="236" rx="5" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:1.4"/>`;
    for(let i=0;i<10;i++){const p=(fl*1.3+i/10)%1;s+=`<circle cx="180" cy="${f1(50+p*226)}" r="2.6" style="fill:var(--bile)"/>`}
    for(let i=0;i<4;i++){const p=(fl*2+i/4)%1,y=70+i*60,side=i%2?1:-1;s+=`<circle cx="${f1(180+side*(26-22*p))}" cy="${y}" r="2.2" style="fill:var(--bile);opacity:${f1(1-p*.4)}"/>`}
    s+=`<circle cx="180" cy="306" r="14" style="fill:var(--bile);stroke:var(--accent);stroke-width:1.4"/>`+T(200,310,'bile duct (at the triad)','t-xs','fill:var(--ink)');
    for(let i=0;i<8;i++){const p=1-((fl+i/8)%1);[40,320].forEach(x=>{s+=`<circle cx="${x}" cy="${f1(48+p*214)}" r="2.6" style="fill:var(--artery);opacity:.7"/>`})}
    s+=T(40,32,'blood ↑','t-xs t-mid')+T(320,32,'blood ↑','t-xs t-mid')+T(180,32,'bile ↓','t-xs t-mid','fill:var(--accent)');
    if(u>.25)s+=lead(186,160,224,146)+T(226,148,'canaliculus ≈1 µm','t-xs','fill:var(--ink)');
    if(u>.5)s+=T(20,332,'export pumps push bile into the canaliculus; ≈5% of bile is solutes','t-xs');
    return s},
   /* 6: fuel */
   (u,fl)=>{let s='';const meal=u<.4,fast=u>=.4&&u<.72,cx=150,cy=176;
    const store=u<.4?ramp(u,0,.36):u<.72?1-ramp(u,.4,.72)*.85:.15*(1-ramp(u,.72,1));
    const ph=meal?'AFTER A MEAL: store':fast?'OVERNIGHT FAST: release':'PROLONGED FAST: make new glucose';
    s+=`<rect x="300" y="30" width="44" height="290" rx="10" style="fill:var(--portal-soft)"/>`+T(322,24,'blood','t-xs t-mid');
    s+=hepatocyte(cx,cy,190,{seed:4});
    const rr=rng(31);for(let i=0;i<26;i++){const a=rr()*6.28,d=18+rr()*52,on=i<store*26;if(on)s+=`<g transform="translate(${f1(cx+Math.cos(a)*d)} ${f1(cy+Math.sin(a)*d*.8)})">${[0,1,2,3,4].map(k=>`<circle cx="${f1(Math.cos(k*1.26)*3.4)}" cy="${f1(Math.sin(k*1.26)*3.4)}" r="1.8" style="fill:var(--vita)"/>`).join('')}</g>`}
    for(let i=0;i<6;i++){const p=(fl*1.6+i/6)%1,inward=meal;const x=inward?lerp(322,cx+70,p):lerp(cx+70,322,p),y=70+i*40;
      s+=`<g transform="translate(${f1(x)} ${y})"><path d="M0 -5l5 3v5l-5 3l-5 -3v-5z" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.3"/></g>`}
    if(!meal&&!fast){s+=T(34,300,'amino acids, lactate → new glucose','t-xs','fill:var(--ink)');for(let i=0;i<3;i++){const p=(fl*1.4+i/3)%1;s+=`<circle cx="${f1(lerp(20,cx-60,p))}" cy="${f1(262+i*8)}" r="2.4" style="fill:var(--liver)"/>`}
      s+=T(34,318,'fatty acids → ketone bodies','t-xs','fill:var(--ink)')}
    s+=T(12,26,ph,'t-sm','fill:var(--ink)');
    s+=`<g transform="translate(26 50)"><path d="M0 -5l5 3v5l-5 3l-5 -3v-5z" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.3"/></g>`+T(36,54,'glucose','t-xs');
    s+=`<g transform="translate(100 50)">${[0,1,2,3,4].map(k=>`<circle cx="${f1(Math.cos(k*1.26)*3.4)}" cy="${f1(Math.sin(k*1.26)*3.4)}" r="1.8" style="fill:var(--vita)"/>`).join('')}</g>`+T(110,54,'glycogen','t-xs');
    s+=`<rect x="190" y="44" width="90" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="190" y="44" width="${f1(90*store)}" height="10" rx="3" style="fill:var(--vita)"/>`+T(235,68,'glycogen store','t-xs t-mid');
    return s},
   /* 7: ammonia and medicines */
   (u,fl)=>{let s='';const hx=170,hy=150;
    s+=`<rect x="10" y="40" width="40" height="230" rx="8" style="fill:var(--portal-soft)"/>`+T(30,32,'from gut','t-xs t-mid');
    s+=hepatocyte(hx,hy,210,{seed:6});
    /* urea cycle wheel */
    const wx=hx-50,wy=hy-34,wr=26,rot=fl*360;
    s+=`<circle cx="${wx}" cy="${wy}" r="${wr}" style="fill:none;stroke:var(--nh3);stroke-width:2.4;stroke-dasharray:46 8" transform="rotate(${f1(rot)} ${wx} ${wy})"/>`+T(wx,wy-2,'urea','t-xs t-mid','fill:var(--ink)')+T(wx,wy+10,'cycle','t-xs t-mid','fill:var(--ink)');
    for(let i=0;i<4;i++){const p=(fl*1.3+i/4)%1;if(p<.7){const q=p/.7;s+=nh3(lerp(30,wx-wr,q),lerp(70+i*50,wy,q),{r:5.5})}
      else{const q=(p-.7)/.3;s+=`<rect x="${f1(lerp(wx,250,q)-12)}" y="${f1(lerp(wy+wr,286,q)-6)}" width="24" height="12" rx="6" style="fill:var(--kidney);opacity:.85"/>`}}
    s+=kidney(276,292,.85)+T(300,300,'kidneys','t-xs');
    /* CYP enzyme chopping medicines */
    const ex=hx+44,ey=hy+26,mo=Math.abs(Math.sin(fl*Math.PI*6))*.5;
    s+=`<path d="M${ex} ${ey}L${f1(ex+20*Math.cos(mo))} ${f1(ey-20*Math.sin(mo))}A20 20 0 1 0 ${f1(ex+20*Math.cos(mo))} ${f1(ey+20*Math.sin(mo))}Z" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6"/>`+T(ex-6,ey+4,'CYP','t-xs t-mid','fill:var(--rx);font-weight:700');
    for(let i=0;i<3;i++){const p=(fl*1.1+i/3)%1;if(p<.6)s+=pill(lerp(350,ex+24,p/.6),ey-50+i*40*(1-p/.6)+ (p/.6)*50,18,{ang:20});
      else{const q=(p-.6)/.4;s+=`<circle cx="${f1(ex-10-q*30)}" cy="${f1(ey+20+q*40)}" r="2.2" style="fill:var(--rx)"/><circle cx="${f1(ex+q*20)}" cy="${f1(ey+24+q*44)}" r="2.2" style="fill:var(--rx)"/>`}}
    s+=T(12,326,'NH₃ (ammonia) → urea','t-xs','fill:var(--nh3)')+T(190,326,'medicines → broken down','t-xs','fill:var(--rx)');
    s+=T(350,30,`CYPs: 70–80% of drugs`,'t-xs t-end','fill:var(--ink)');
    return s}
  ];
  let setSt=()=>{};
  function draw(t){
    const nr=vb(svg,'720 380','400 650'),ph=phaseOf(LI_STEPS,t),u=clamp((t-LI_STEPS[ph].from)/seg),fl=(t*24)%1;
    const L=nr?{x:200,y:136,r:98}:{x:176,y:194,r:128},D=nr?{x:20,y:286}:{x:346,y:22};
    let s='';
    s+=T(nr?20:20,nr?14:26,'ONE LIVER LOBULE','t-sm','fill:var(--ink)');
    s+=lobule(L.x,L.y,L.r,{flow:fl,clip:true,id:'liLob',act:ph===2?0:undefined}).svg;
    const V=[...Array(6)].map((_,i)=>{const a=Math.PI/3*i+Math.PI/6;return [L.x+L.r*Math.cos(a),L.y+L.r*Math.sin(a)]});
    if(ph===0){V.forEach((p,i)=>{const dx=p[0]-L.x,dy=p[1]-L.y,k=.22+.08*Math.sin(fl*6.28+i);s+=`<line x1="${f1(p[0]+dx*k*1.3)}" y1="${f1(p[1]+dy*k*1.3)}" x2="${f1(p[0]+dx*.06)}" y2="${f1(p[1]+dy*.06)}" style="stroke:var(--portal);stroke-width:2" marker-end="url(#liArr)"/>`})}
    if(ph===1){const zr=[[.98,'var(--artery)',.16],[.66,'var(--artery)',.08],[.36,'var(--portal)',.18]];zr.forEach(([k,c,o])=>{s+=`<circle cx="${L.x}" cy="${L.y}" r="${f1(L.r*k)}" style="fill:${c};opacity:${o}"/>`});
      s+=TH(L.x,L.y-L.r*.8,'zone 1')+TH(L.x,L.y-L.r*.5,'zone 2')+TH(L.x,L.y-L.r*.22,'zone 3')}
    if(ph<=1){const b=V[1],ly=L.y+L.r*1.16+14;s+=TH(L.x,L.y+L.r*.13+13,'central vein')+lead(b[0]-6,b[1]+8,b[0]-36,ly-8)+T(b[0]-38,ly,'portal triad','t-xs t-end','fill:var(--ink)')}
    /* magnifier from a sinusoid to the close-up */
    if(ph>=2){const mx=L.x+L.r*.5,my=L.y-L.r*.08;s+=`<rect x="${f1(mx-13)}" y="${f1(my-9)}" width="26" height="18" rx="3" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
      s+=nr?lead(mx,my+9,D.x+180,D.y):lead(mx+13,my-9,D.x,D.y+20)+lead(mx+13,my+9,D.x,D.y+320)}
    s+=`<defs>${marker('liArr','var(--portal)')}</defs>`;
    s+=`<g transform="translate(${D.x} ${D.y})"><rect x="0" y="0" width="360" height="340" rx="12" style="fill:var(--field);stroke:var(--line)"/>${SC[ph](u,fl)}</g>`;
    svg.innerHTML=s;
    setSt(ph);
    $('#liRead').innerHTML=`<span>step <b>${ph+1} of ${N}</b></span><span><b>${LI_STEPS[ph].t}</b></span>`;
    $('#liNote').innerHTML=noteHTML(LI_STEPS[ph]);
  }
  const stop=playWire(rg,$('#liPlay'),draw,42000,'Replay','liver');
  setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- what goes wrong when it fails ---------- */
  const fs=$('#liFailSvg'),on={alb:true};
  const ROWS=[['Albumin','alb','↓'],['INR','clot','↑'],['Platelets','flow','↓'],['Bilirubin','bili','↑'],['Ammonia*','nh3','↑'],['Muscle mass','glu','↓'],['Medicine levels','drug','↑']];
  function drawF(){
    const nr=vb(fs,'720 360','400 660');let s='';
    const fluid=clamp((on.alb?.35:0)+(on.flow?.45:0)),jaun=on.bili?.95:0,fog=on.nh3?.95:0;
    const B=nr?{x:104,y:20,s:1.1}:{x:100,y:24,s:1.18},R=nr?{x:220,y:30,s:.95}:{x:318,y:96,s:.95},P=nr?{x:24,y:340,w:352}:{x:468,y:20,w:236};
    s+=abdomen(B.x,B.y,B.s,{fluid,jaundice:jaun,liver:true,fib:on.flow?4:2.4}).svg;
    if(on.glu){s+=T(B.x,B.y+(nr?256:274),'muscle loss (sarcopenia)','t-xs t-mid','fill:var(--ink)')}
    s+=brain(R.x+ (nr?60:0),R.y+(nr?50:0),R.s*(nr?.8:1),{fog}).svg;
    if(on.drug)s+=pill(R.x+(nr?118:84),R.y+(nr?104:92),26,{ang:-20})+T(R.x+(nr?112:84),R.y+(nr?126:120),'medicines build up','t-xs t-mid','fill:var(--ink)');
    if(on.nh3){{for(let i=0;i<4;i++)s+=nh3(R.x+(nr?-6:-92)+i*26,R.y+(nr?156:126),{r:5,op:.9});s+=T(R.x+(nr?33:-53),R.y+(nr?178:148),'ammonia reaches the brain','t-xs t-mid','fill:var(--nh3)')}}
    if(fluid>0)s+=T(B.x,B.y+(nr?212:228),on.flow&&on.alb?'ascites':'fluid builds up','t-xs t-mid','fill:var(--fluid)');
    /* lab sheet */
    const rh=nr?36:38;s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${rh*ROWS.length+56}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`+T(P.x+12,P.y+22,'LAB SHEET','t-sm','fill:var(--ink)');
    ROWS.forEach(([n,k,dir],i)=>{const y=P.y+44+i*rh,a=!!on[k],col=a?LI_FAIL[k].col:'var(--muted)';
      s+=`<line x1="${P.x+10}" x2="${P.x+P.w-10}" y1="${y-6}" y2="${y-6}" style="stroke:var(--line)"/>`;
      s+=`<text x="${P.x+14}" y="${y+rh/2}" class="t-lbl" style="font-size:13px;fill:${a?'var(--ink)':'var(--muted)'};opacity:${a?1:.7}">${n}</text>`;
      s+=`<text x="${P.x+P.w-18}" y="${y+rh/2+2}" class="t-end" style="font:700 ${a?20:14}px var(--body);fill:${col}">${a?dir:'–'}</text>`});
    s+=T(P.x+12,P.y+rh*ROWS.length+48,'*not needed to diagnose encephalopathy','t-xs');
    fs.innerHTML=s;
    const ks=Object.keys(LI_FAIL).filter(k=>on[k]);
    $('#liFailOut').innerHTML=ks.length?ks.map(k=>{const F=LI_FAIL[k];return `<div class="lfcard" style="border-left-color:${F.col}"><h4>${F.n}</h4><div class="row"><b>Lost job</b><span>${F.lost}</span><b>What people notice</b><span>${F.sign}</span><b>What tests show</b><span>${F.test}</span></div><p>${F.txt}</p><p><a href="#${F.go}" data-go="${F.go}">${F.goT} →</a></p></div>`}).join(''):`<div class="lfcard"><h4>All functions on</h4><p>Switch a function off with the buttons above to see what changes. A liver can lose a great deal of function before anything shows: many people feel well until cirrhosis is advanced. [[Gines2021Lancet]]</p></div>`;
  }
  $$('#liFail [data-lf]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.lf;on[k]=!on[k];b.setAttribute('aria-pressed',!!on[k]);drawF()}));
  drawF();
  const prevR=redraws.liver;redraws.liver=()=>{prevR&&prevR();drawF()};
};
