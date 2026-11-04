/* =============== 2.4 Other causes: genes, immunity & bile ducts =============== */
const OC_STEPS=[
 {from:0,at:.07,k:'Genetic · iron',t:'Haemochromatosis',
  txt:`Two copies of the HFE C282Y variant are common: 0.44% (about 1 in 227) of non-Hispanic white people in HEIRS [[Adams2005HEIRS]] and 1 in 156 people of European descent in UK Biobank [[Pilling2019BMJ]]. Far fewer become ill, and men far more than women: iron-overload disease in 28.4% of homozygous men versus 1.2% of women in Melbourne [[Allen2008NEJM]]. Ferritin tracks the danger: the adjusted probability of cirrhosis was 7.4% with ferritin below 1,000 µg/L and 72% above it [[Morrison2003]]. Phlebotomy is the mainstay of treatment [[Kowdley2019ACG]]; EASL 2022 targets ferritin below 50 µg/L during induction and below 100 during maintenance, and people with advanced fibrosis enter HCC screening [[EASL2022HH]].`,
  pt:`Haemochromatosis means the body stores too much iron. Regular blood removal, like giving blood, lowers the iron and can prevent liver damage [[EASL2022HH]].`,
  hook:`In HFE haemochromatosis, ferritin below 1,000 µg/L makes cirrhosis unlikely [[Morrison2003,Kowdley2019ACG]].`},
 {from:.125,at:.215,k:'Genetic · copper',t:'Wilson disease',
  txt:`Wilson disease is an autosomal recessive disorder of liver copper handling caused by variants in ATP7B [[Ferenci2003Leipzig]]. Symptomatic disease affects about 1 in 30,000, usually starting between ages 5 and 35 [[Czlonkowska2018]], yet sequencing predicts about 1 in 7,026 people carry two pathogenic variants [[Coffey2013]]. Kayser–Fleischer rings (copper in Descemet's membrane) are seen in almost 100% of people with neurological disease but only 40–50% with liver disease [[Czlonkowska2018]]. EASL-ERN 2025 lists chelators (penicillamine, trientine) and zinc salts, with only chelators recommended for significant liver disease, and a defined role for transplant in Wilsonian acute liver failure [[EASL2025Wilson]].`,
  pt:`Wilson disease means copper builds up. Medicines that remove copper work well if they are started early [[Czlonkowska2018]].`,
  hook:`Kayser–Fleischer rings: almost all neurological Wilson disease, only 40–50% of hepatic cases. Leipzig score ≥4 establishes the diagnosis [[Czlonkowska2018]].`},
 {from:.25,at:.34,k:'Genetic · protein',t:'Alpha-1 antitrypsin',
  txt:`In the Pi*ZZ genotype, mutant Z-AAT accumulates inside hepatocytes and can cause progressive liver disease and fibrosis [[Strnad2022Fazirsiran]]. Swedish screening of 200,000 newborns found 120 with Pi Z, 14 of them with prolonged obstructive jaundice [[Sveger1976]]. Carriers matter too: up to 4% of Europeans are Pi*MZ, and 10% of them versus 4% of non-carriers had liver stiffness of 7.1 kPa or more [[Schneider2020PiZ]]. The RNAi drug fazirsiran cut liver Z-AAT by a median of 93% in SEQUOIA, with no phase 3 outcome data yet <span class="ev early">Early evidence</span> [[Clark2024SEQUOIA]].`,
  pt:`In alpha-1 antitrypsin deficiency, a protein the liver makes folds the wrong way and gets stuck inside liver cells, which slowly harms them [[Strnad2022Fazirsiran]].`,
  hook:`AATD (Pi*ZZ) damages the liver by retained misfolded protein, not by low serum levels [[Strnad2022Fazirsiran]].`},
 {from:.375,at:.465,k:'Autoimmune',t:'Autoimmune hepatitis',
  txt:`A meta-analysis of 37 population studies pooled an AIH incidence of 1.28 per 100,000 person-years and a prevalence of 15.65 per 100,000; prevalence rose from 9.95 (1970–1999) to 27.91 per 100,000 (2015–2022) and was higher in women [[Hahn2023AIH]]. Diagnosis rests on raised transaminases and IgG, autoantibodies, and interface hepatitis on biopsy. Treatment starts with fairly high doses of prednisone or prednisolone, tapered as azathioprine is introduced; transplant is an option for end-stage disease [[MieliVergani2018]]. AIH can present anywhere from no symptoms to acute liver failure [[EASL2025AIH]].`,
  pt:`In autoimmune hepatitis, the body's defence system attacks the liver. Steroid and immune-calming medicines usually control it [[MieliVergani2018]].`,
  hook:`AIH: raised IgG + autoantibodies + interface hepatitis; prednisolone then azathioprine [[MieliVergani2018]].`},
 {from:.5,at:.59,k:'Bile ducts · small',t:'Primary biliary cholangitis',
  txt:`PBC is a chronic autoimmune disease of the small bile ducts that, untreated, leads to biliary cirrhosis. It is usually diagnosed from cholestatic liver tests plus antimitochondrial antibodies [[EASL2017PBC]]. Global prevalence is about 18.1 per 100,000, higher in women [[Tan2026PBC]]. Ursodiol reduced treatment failure in the 1991 trial [[Poupon1991]]; the US label gives 13–15 mg/kg/day for adults with PBC [[FDA-Urso]]. Response matters: 84% of people with ALP ≤2 × ULN after a year survived 10 years without transplant, against 62% above it [[Lammers2014]].`,
  pt:`PBC slowly damages the tiny bile ducts inside the liver, so bile backs up. A daily tablet (ursodiol) helps most people [[EASL2017PBC,Poupon1991]].`,
  hook:`PBC: antimitochondrial antibodies + cholestatic liver tests; first-line UDCA 13–15 mg/kg/day as labelled [[EASL2017PBC,FDA-Urso]].`},
 {from:.625,at:.715,k:'Bile ducts · large',t:'Primary sclerosing cholangitis',
  txt:`PSC causes multifocal bile-duct strictures and progressive liver disease; the risk of cholangiocarcinoma and colorectal cancer is high, and most patients eventually need a transplant [[Karlsen2017]]. IBD is present in 71.1%, mostly ulcerative colitis (55.9%) [[Zhang2022PSCIBD]]. In the Netherlands, incidence was 0.5 and prevalence 6.0 per 100,000; median survival to transplant or PSC-related death was 21.3 years in the population cohort. Colorectal cancer risk was 10-fold higher than in ulcerative colitis controls, so the authors advised colonoscopy from diagnosis [[Boonstra2013]].`,
  pt:`PSC narrows and scars the larger bile ducts. Many people with PSC also have bowel inflammation (colitis) [[Zhang2022PSCIBD]].`,
  hook:`PSC: about 70% also have IBD, mostly ulcerative colitis; colorectal cancer risk is high [[Zhang2022PSCIBD,Boonstra2013]].`},
 {from:.75,at:.86,k:'Medicines',t:'Drug-induced liver injury',
  txt:`In Iceland, the crude annual incidence of DILI (excluding paracetamol toxicity) was 19.1 per 100,000. Amoxicillin–clavulanate caused 22% of cases (1 in 2,350 users); azathioprine (1 in 133) and infliximab (1 in 148) had the highest per-user risk [[Bjornsson2013]]. ACG 2021 names antimicrobials, herbal and dietary supplements and anticancer drugs as the commonest Western causes, calls DILI a diagnosis of exclusion, gives mortality up to 10% with hepatocellular jaundice, and advises tertiary referral for progressive jaundice [[Chalasani2021ACG]]. There is no specific biomarker; causality scales such as RUCAM support the diagnosis [[Andrade2019]].`,
  pt:`Some medicines and herbal or dietary supplements can injure the liver, so tell your care team about everything you take [[Chalasani2021ACG]].`,
  hook:`Amoxicillin–clavulanate is the commonest single cause of DILI in population data [[Bjornsson2013]].`},
 {from:.875,at:.96,k:'Heart',t:'Congestive: the Fontan liver',
  txt:`The Fontan circulation, created by heart surgery, keeps systemic venous pressure chronically high. Up to 70,000 people may be alive with a Fontan circulation, and liver fibrosis is common and may progress [[Rychik2019Fontan]]. A meta-analysis estimated cirrhosis at 0.97 per 100 patient-years, with a cumulative incidence of 32.2% 20 or more years after surgery; HCC reached 3.9%, and only about 70% of those cancers had cirrhosis [[Hitawala2024Fontan]]. Platelets, APRI and FIB-4 were associated with severe fibrosis, and MR and shear-wave elastography correlated strongly with biopsy [[Seol2024FALD]].`,
  pt:`Long-term heart problems can raise the pressure in the veins that drain the liver, and over years that can scar it [[Rychik2019Fontan]].`,
  hook:`Fontan: cumulative cirrhosis 32.2% at ≥20 years; HCC can occur without cirrhosis [[Hitawala2024Fontan]].`}
];
const OC_INFO=[
 {tag:'GENETIC · IRON',col:'var(--liver)',name:'Haemochromatosis (HFE)',where:['Iron builds up in hepatocytes'],test:['Transferrin saturation and ferritin;','HFE C282Y genotype'],rx:['Phlebotomy (removing blood)'],num:{v:72,suf:'%'},cap:['probability of cirrhosis with ferritin','above 1,000 µg/L (7.4% below it)']},
 {tag:'GENETIC · COPPER',col:'var(--accent)',name:'Wilson disease',where:['Copper cannot leave hepatocytes','into bile (ATP7B)'],test:['Leipzig score: signs, copper tests,','mutations; slit-lamp for KF rings'],rx:['Chelators (penicillamine, trientine)','or zinc salts'],num:{txt:'1 in 30,000'},cap:['symptomatic; about 1 in 7,026','carry two pathogenic variants']},
 {tag:'GENETIC · PROTEIN',col:'var(--nh3)',name:'Alpha-1 antitrypsin deficiency',where:['Misfolded Z-AAT stays inside','hepatocytes'],test:['Pi*ZZ or Pi*MZ genotype;','AAT inclusions on biopsy'],rx:['Fazirsiran (RNAi) is investigational:','phase 2 data only'],num:{v:97,suf:'%'},cap:['of Pi*ZZ biopsies showed AAT','inclusions (63% of Pi*MZ)']},
 {tag:'AUTOIMMUNE',col:'var(--dx)',name:'Autoimmune hepatitis',where:['Immune cells attack hepatocytes','at the portal edge'],test:['Raised transaminases and IgG;','autoantibodies; biopsy'],rx:['Prednisone or prednisolone,','then azathioprine'],num:{v:27.91,dp:2},cap:['per 100,000 in 2015–22,','up from 9.95 in 1970–99']},
 {tag:'AUTOIMMUNE · SMALL DUCTS',col:'var(--accent)',name:'Primary biliary cholangitis',where:['Small bile ducts inside the','liver are destroyed'],test:['Cholestatic liver tests (ALP)','plus antimitochondrial antibodies'],rx:['Ursodiol first; elafibranor or','seladelpar after'],num:{v:18.1,dp:1},cap:['per 100,000 worldwide;','more common in women']},
 {tag:'LARGE BILE DUCTS',col:'var(--accent)',name:'Primary sclerosing cholangitis',where:['Multifocal strictures of the','bile ducts'],test:['Raised ALP prompts testing;','colonoscopy from diagnosis'],rx:['Most people eventually need','a liver transplant'],num:{v:71.1,suf:'%',dp:1},cap:['also have IBD, mostly','ulcerative colitis (55.9%)']},
 {tag:'MEDICINES & SUPPLEMENTS',col:'var(--bad)',name:'Drug-induced liver injury',where:['Medicines, herbs or supplements','injure hepatocytes'],test:['A diagnosis of exclusion;','causality scales such as RUCAM'],rx:['Tertiary referral for','progressive jaundice (ACG)'],num:{txt:'1 in 2,350'},cap:['amoxicillin–clavulanate users;','the commonest cause (22%)']},
 {tag:'HEART',col:'var(--portal)',name:'Fontan-associated liver disease',where:['High venous pressure backs','up into the liver'],test:['Platelets, APRI, FIB-4;','MR or shear-wave elastography'],rxl:'COURSE',rx:['Fibrosis is common and may','progress (AHA statement)'],num:{v:32.2,suf:'%',dp:1},cap:['cumulative cirrhosis 20 or more','years after Fontan surgery']}
];
const OC_MX={cols:['Iron studies','Copper tests, eye exam','Autoantibodies, IgG','ALP (cholestatic)','Genetic test','Biopsy','Elastography or MR','History'],
 rows:[
  {n:'Haemochromatosis',m:{0:'K',4:'K'},d:`Iron studies are the screen. EASL 2022 states that in C282Y homozygotes, TSAT above 45% with ferritin above 200 µg/L in females, or TSAT above 50% with ferritin above 300 µg/L in males and postmenopausal women, are enough to diagnose haemochromatosis [[EASL2022HH]]. A ferritin below 1,000 ng/mL at diagnosis identifies people at low risk of advanced fibrosis (ACG 2019) [[Kowdley2019ACG]].`},
  {n:'Wilson disease',m:{1:'K',4:'S'},d:`The Leipzig score adds up clinical signs, copper tests and mutation analysis: 4 or more establishes the diagnosis, 3 makes it possible, 2 or less makes it very unlikely [[Czlonkowska2018,Ferenci2003Leipzig]]. EASL-ERN 2025 adds relative exchangeable copper [[EASL2025Wilson]]. Kayser–Fleischer rings need slit-lamp examination by an experienced observer [[Czlonkowska2018]].`},
  {n:'Alpha-1 antitrypsin',m:{4:'K',5:'S',6:'S'},d:`The genotype names the risk: Pi*ZZ, or the carrier state Pi*MZ in up to 4% of Europeans. AAT inclusions were seen on biopsy in 97% of Pi*ZZ and 63% of Pi*MZ livers, and 10% of Pi*MZ adults versus 4% of non-carriers had liver stiffness of 7.1 kPa or more [[Schneider2020PiZ]].`},
  {n:'Autoimmune hepatitis',m:{2:'K',5:'K'},d:`AIH is diagnosed from raised transaminases and IgG, autoantibodies, and interface hepatitis on biopsy [[MieliVergani2018]].`},
  {n:'Primary biliary cholangitis',m:{2:'K',3:'K'},d:`PBC is usually diagnosed from cholestatic liver tests plus antimitochondrial antibodies [[EASL2017PBC]]. A raised liver alkaline phosphatase prompts testing for PBC and PSC [[Kwo2017ACG]].`},
  {n:'Primary sclerosing cholangitis',m:{3:'K',7:'S'},d:`A raised liver alkaline phosphatase prompts testing for PBC and PSC [[Kwo2017ACG]]. PSC itself is defined by multifocal bile-duct strictures [[Karlsen2017]]. About 71% also have IBD, and the Dutch authors advised colonoscopic surveillance from diagnosis [[Zhang2022PSCIBD,Boonstra2013]].`},
  {n:'Drug-induced liver injury',m:{7:'K'},d:`There is no specific biomarker. DILI is diagnosed by excluding other causes, supported by causality scales such as CIOMS/RUCAM [[Andrade2019]]. ACG 2021 calls it a diagnosis of exclusion and names antimicrobials, herbal and dietary supplements and anticancer drugs as the commonest causes, so a full history of everything taken is central [[Chalasani2021ACG]].`},
  {n:'Fontan liver',m:{6:'K',7:'K'},d:`The history is the Fontan operation. Platelet count, APRI and FIB-4 were associated with severe fibrosis, and MR and shear-wave elastography correlated strongly with biopsy; time since surgery correlated only weakly (R=0.36) [[Seol2024FALD]].`}
 ]};
inits.othercauses=()=>{
  const svg=$('#ocSvg'),rg=$('#ocT'),S=OC_STEPS;
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const C=(x,y,r,st)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0,r))}" style="${st}"/>`;
  const R4=(x,y,w,h,st,rx=2)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const AR=(x1,y1,x2,y2,col='var(--muted)',w=1.6)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:${col};stroke-width:${w};fill:none" marker-end="url(#ocArr)"/>`;
  const lymph=(x,y,r=5,op=1)=>`<g style="opacity:${f1(op)}">${C(x,y,r,'fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.4')}${C(x,y,r*.55,'fill:var(--dx)')}</g>`;
  const anti=(x,y,s=6,op=1)=>`<path d="M${f1(x)} ${f1(y+s)}V${f1(y)}L${f1(x-s*.8)} ${f1(y-s*.8)}M${f1(x)} ${f1(y)}L${f1(x+s*.8)} ${f1(y-s*.8)}" style="stroke:var(--dx);stroke-width:1.6;fill:none;stroke-linecap:round;opacity:${f1(op)}"/>`;
  /* ---- one scene per cause; R={x,y,w,h}, u local 0..1, ph a running phase for motion ---- */
  function sHH(R,u,ph){const cx=R.x+R.w*.42,cy=R.y+R.h*.46;let s='';
    const fer=u<.6?lerp(150,2400,ease(u/.6)):lerp(2400,50,ease((u-.6)/.4)),iron=clamp((fer-100)/2300);
    s+=R4(R.x+10,R.y+52,22,R.h-122,'fill:var(--liver-soft);stroke:var(--liver)',8)+T(R.x+21,R.y+46,'gut','t-xs t-mid');
    s+=AR(R.x+36,cy,cx-62,cy,'var(--liver)');
    if(u<.6)for(let i=0;i<6;i++){const k=(ph*.6+i/6)%1;s+=C(lerp(R.x+36,cx-64,k),cy+Math.sin(k*9+i)*5,3,'fill:var(--liver);opacity:.9')}
    s+=T(R.x+12,R.y+20,u<.6?'too much iron absorbed and stored':'phlebotomy lowers iron stores','t-lbl');
    [[0,-38],[-30,16],[32,18]].forEach(([dx,dy],i)=>{s+=hepatocyte(cx+dx,cy+dy,62,{iron,seed:3+i})});
    s+=T(cx,cy+66,'hepatocytes fill with iron','t-xs t-mid');
    /* ferritin bar */
    const bx=R.x+R.w-46,top=R.y+44,bot=R.y+R.h-74,Y=v=>lerp(bot,top,clamp(v/2500));
    s+=R4(bx,top,18,bot-top,'fill:var(--panel-2);stroke:var(--line)',4)+R4(bx,Y(fer),18,bot-Y(fer),`fill:${fer>1000?'var(--bad)':'var(--liver)'};opacity:.85`,4);
    s+=`<line x1="${f1(bx-6)}" x2="${f1(bx+24)}" y1="${f1(Y(1000))}" y2="${f1(Y(1000))}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 2"/>`+T(bx-8,Y(1000)+3,'1,000','t-xs t-end','fill:var(--ink)');
    s+=T(bx+9,top-18,'ferritin','t-xs t-mid','fill:var(--ink);font-weight:700')+T(bx+9,top-7,'µg/L','t-xs t-mid');
    s+=T(bx+9,bot+14,`≈${Math.round(fer/10)*10}`,'t-xs t-mid','fill:var(--ink)')+T(bx+9,bot+25,'schematic','t-xs t-mid');
    if(u>=.6){const b=ramp(u,.6,.75),px=R.x+48,py=R.y+R.h-48;
      s+=`<g style="opacity:${f1(b)}">${R4(px-14,py-20,28,36,'fill:var(--panel);stroke:var(--artery);stroke-width:1.6',6)}${R4(px-12,py+14-30*ramp(u,.62,1),24,30*ramp(u,.62,1),'fill:var(--artery);opacity:.8',4)}`+T(px+22,py-4,'phlebotomy: blood removed,','t-xs','fill:var(--ink)')+T(px+22,py+8,u>.95?'ferritin target <50 (induction)':'iron stores fall','t-xs','fill:var(--ink)')+'</g>'}
    return s}
  function sWil(R,u,ph){const cx=R.x+R.w*.34,cy=R.y+R.h*.52;let s='';
    const cu=u<.75?ease(u/.75):lerp(1,.35,ease((u-.75)/.25));
    s+=hepatocyte(cx,cy,130,{copper:cu,seed:5});
    for(let i=0;i<Math.round(cu*16);i++){const a=i*2.4,d=14+(i*7)%34;s+=C(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.75,2.2,'fill:var(--ink);opacity:.85')}
    /* bile canaliculus with the broken ATP7B pump */
    const bx=cx+70;s+=R4(bx,cy-60,12,120,'fill:var(--bile);opacity:.7',6)+T(bx+6,cy+76,'bile','t-xs t-mid');
    s+=R4(bx-12,cy-8,12,16,'fill:var(--panel);stroke:var(--ink);stroke-width:1.2',2)+`<path d="M${f1(bx-10)} ${f1(cy-6)}l8 12M${f1(bx-2)} ${f1(cy-6)}l-8 12" style="stroke:var(--bad);stroke-width:1.8"/>`+T(bx-6,cy-14,'ATP7B','t-xs t-mid','fill:var(--ink)');
    s+=AR(R.x+12,cy-40,cx-60,cy-30,'var(--ink)')+T(R.x+12,cy-48,'copper in','t-xs');
    if(u<.75)for(let i=0;i<4;i++){const k=(ph*.7+i/4)%1;s+=C(lerp(R.x+14,cx-62,k),lerp(cy-40,cy-31,k),2.4,'fill:var(--ink)')}
    /* the eye */
    const ex=R.x+R.w-54,ey=R.y+66,kf=ramp(u,.3,.65);
    s+=`<path d="M${f1(ex-44)} ${f1(ey)}Q${f1(ex)} ${f1(ey-34)} ${f1(ex+44)} ${f1(ey)}Q${f1(ex)} ${f1(ey+34)} ${f1(ex-44)} ${f1(ey)}Z" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1.5"/>`;
    s+=C(ex,ey,19,'fill:var(--portal-soft);stroke:var(--portal);stroke-width:1.2')+C(ex,ey,7,'fill:var(--ink)');
    s+=C(ex,ey,18,`fill:none;stroke:var(--accent);stroke-width:5;opacity:${f1(kf*.9)}`);
    s+=T(ex,ey+38,'Kayser–Fleischer','t-xs t-mid',`opacity:${f1(.4+.6*kf)}`)+T(ex,ey+49,'ring (slit lamp)','t-xs t-mid',`opacity:${f1(.4+.6*kf)}`);
    if(u>.75){const o=ramp(u,.75,.85);s+=`<g style="opacity:${f1(o)}">`+pill(R.x+R.w-70,R.y+R.h-60,30,{ang:-15})+T(R.x+R.w-70,R.y+R.h-36,'chelator or zinc','t-xs t-mid','fill:var(--ink)')+'</g>'}
    s+=T(cx,cy+86,u>.75?'copper load falls with treatment':'copper piles up in the cell','t-xs t-mid');
    return s}
  function sAAT(R,u,ph){const cx=R.x+R.w*.5,cy=R.y+R.h*.4;let s='';
    const z=u<.25?0:u<.75?ease(ramp(u,.25,.7)):lerp(1,.17,ease(ramp(u,.75,.95)));
    s+=`<path d="${smoothPath([[cx-90,cy],[cx-70,cy-62],[cx,cy-80],[cx+76,cy-60],[cx+96,cy],[cx+72,cy+58],[cx,cy+74],[cx-72,cy+56]])}" style="fill:var(--cell);stroke:var(--liver);stroke-width:1.8"/>`;
    s+=C(cx-50,cy+10,14,'fill:var(--liver-fill);opacity:.8');
    for(let i=0;i<4;i++)s+=`<path d="M${f1(cx-20)} ${f1(cy-44+i*13)}q12 -6 24 0t24 0t24 0" style="fill:none;stroke:var(--nh3);stroke-width:1.1;opacity:.6"/>`;
    s+=T(cx+30,cy-52,'ER','t-xs t-mid');
    const G=[[cx+10,cy+18],[cx+44,cy+12],[cx+26,cy+42],[cx-8,cy+46],[cx+58,cy+38],[cx-24,cy-16],[cx+66,cy-12]];
    G.forEach(([x,y],i)=>{const r=(5+i%3*2)*z+(z>0?1:0);if(r>0)s+=C(x,y,r,'fill:var(--nh3-fill);stroke:var(--nh3);stroke-width:1;opacity:.9')});
    if(z>.1)for(let k=0;k<3;k++){const x0=cx-30+k*26,y0=cy+64-k*4;for(let j=0;j<4;j++)s+=C(x0+j*5,y0,2.2,`fill:var(--nh3);opacity:${f1(z)}`)}
    const vy=R.y+R.h-58;s+=R4(R.x+14,vy,R.w-28,22,'fill:var(--portal-soft);stroke:var(--portal)',11)+T(R.x+20,vy+36,'blood (sinusoid)','t-xs');
    const nOut=u<.25?8:2;for(let i=0;i<nOut;i++){const k=(ph*.5+i/nOut)%1;s+=R4(lerp(R.x+20,R.x+R.w-30,k),vy+7,10,8,'fill:var(--nh3)',4)}
    s+=AR(cx,cy+76,cx,vy-2,'var(--nh3)',u<.25?2.2:1);
    s+=T(cx,R.y+20,u<.25?'Pi*MM: AAT folds and is secreted':u<.75?'Pi*ZZ: Z-AAT misfolds, polymers stay':'fazirsiran (RNAi) cuts Z-AAT made','t-lbl t-mid');
    if(u>=.75)s+=T(cx,R.y+34,'phase 2 · Early evidence','t-xs t-mid','fill:var(--warn)');
    return s}
  function sAIH(R,u,ph){let s='';const tx=R.x+46,ty=R.y+R.h*.46,att=u<.62?ease(ramp(u,.05,.45)):1-.85*ease(ramp(u,.62,.95));
    s+=C(tx,ty,28,'fill:var(--panel-2);stroke:var(--line)')+C(tx-8,ty-4,10,'fill:var(--portal)')+C(tx+10,ty-10,5,'fill:var(--artery)')+C(tx+8,ty+12,5,'fill:var(--bile);stroke:var(--accent)');
    s+=T(tx,ty+44,'portal tract','t-xs t-mid');
    for(let c=0;c<3;c++)for(let r=0;r<4;r++){const x=R.x+120+c*72,y=R.y+60+r*64,edge=c===0;s+=hepatocyte(x,y,54,{hurt:edge?att:c===1?att*.4:0,seed:c*4+r})}
    s+=`<line x1="${f1(R.x+88)}" x2="${f1(R.x+88)}" y1="${f1(R.y+40)}" y2="${f1(R.y+R.h-40)}" style="stroke:var(--dx);stroke-width:1.2;stroke-dasharray:4 3;opacity:${f1(.3+.7*att)}"/>`;
    s+=T(R.x+88,R.y+R.h-26,'interface','t-xs t-mid','fill:var(--dx)');
    const n=Math.round(att*12);for(let i=0;i<n;i++){const k=((ph*.35+i/12)%1),yy=R.y+50+((i*53)%(R.h-100));s+=lymph(lerp(tx+20,R.x+150,k*att),yy,5)}
    for(let i=0;i<Math.round(att*4);i++)s+=anti(R.x+70+i*14,R.y+30,5,.8);
    if(u>.55){const o=ramp(u,.55,.66);s+=`<g style="opacity:${f1(o)}">`+pill(R.x+R.w-110,R.y+R.h-40,30,{ang:-12})+T(R.x+R.w-88,R.y+R.h-42,'steroid, then','t-xs','fill:var(--ink)')+T(R.x+R.w-88,R.y+R.h-31,'azathioprine','t-xs','fill:var(--ink)')+'</g>'}
    s+=T(R.x+12,R.y+20,u<.55?'immune cells cross into the lobule':'immune attack calmed','t-lbl');
    return s}
  function sPBC(R,u,ph){let s='';const d=ease(ramp(u,.05,.62)),fix=ramp(u,.7,1);
    const ducts=[[R.x+R.w*.25,R.y+92],[R.x+R.w*.52,R.y+70],[R.x+R.w*.75,R.y+100]];
    ducts.forEach(([x,y],i)=>{s+=C(x,y,26,'fill:var(--panel-2);stroke:var(--line)');
      const r=10*(1-.75*d),op=1-.7*d;s+=C(x,y,r+3,`fill:none;stroke:var(--accent);stroke-width:3;opacity:${f1(op)};stroke-dasharray:${d>.3?'5 4':'none'}`)+C(x,y,Math.max(1,r-1),`fill:var(--bile);opacity:${f1(op*.8)}`);
      for(let k=0;k<Math.round(d*5);k++){const a=k*1.3+ph*.6+i;s+=lymph(x+Math.cos(a)*19,y+Math.sin(a)*19,4)}
      if(d>.2)s+=anti(x+22,y-24,5,d)});
    s+=T(R.x+12,R.y+20,d<.5?'small bile ducts, ringed by immune cells':'ducts vanish; bile backs up','t-lbl');
    s+=T(R.x+R.w*.52,R.y+142,'portal tracts (each with a small bile duct)','t-xs t-mid');
    const back=d*(1-.5*fix);[0,1,2].forEach(i=>{const x=R.x+70+i*90,y=R.y+R.h-110;s+=hepatocyte(x,y,62,{seed:9+i});for(let k=0;k<Math.round(back*7);k++){const a=k*2.1+i;s+=C(x+Math.cos(a)*14,y+Math.sin(a)*10,2.6,'fill:var(--bile)')}});
    s+=T(R.x+160,R.y+R.h-62,'bile retained in hepatocytes (cholestasis)','t-xs t-mid');
    const bx=R.x+R.w-40,by=R.y+R.h-30,h=70*(.15+.85*back);s+=R4(bx,by-70,16,70,'fill:var(--panel-2);stroke:var(--line)',3)+R4(bx,by-h,16,h,'fill:var(--accent);opacity:.85',3)+T(bx+8,by+12,'ALP','t-xs t-mid','fill:var(--ink);font-weight:700');
    if(fix>0)s+=`<g style="opacity:${f1(ramp(u,.7,.78))}">`+pill(R.x+40,R.y+R.h-30,30,{ang:-10})+T(R.x+62,R.y+R.h-26,'ursodiol (UDCA)','t-xs','fill:var(--ink)')+'</g>';
    return s}
  function sPSC(R,u,ph){let s='';const b=ease(ramp(u,.05,.7)),cx=R.x+R.w*.42;
    s+=`<g style="opacity:.3">${liver(cx,R.y+R.h*.34,1.45,{fib:1+2*b,gb:false,seed:21}).svg}</g>`;
    const path=[[cx,R.y+R.h-48],[cx,R.y+R.h*.52]],L=[[[cx,R.y+R.h*.52],[cx-60,R.y+R.h*.3],[cx-100,R.y+R.h*.22]],[[cx,R.y+R.h*.52],[cx+50,R.y+R.h*.32],[cx+90,R.y+R.h*.2]],[[cx-60,R.y+R.h*.3],[cx-50,R.y+R.h*.14]],[[cx+50,R.y+R.h*.32],[cx+36,R.y+R.h*.14]]];
    const tube=(P,r0)=>{let g='';for(let k=0;k<P.length-1;k++){const [a,c]=[P[k],P[k+1]],n=Math.ceil(Math.hypot(c[0]-a[0],c[1]-a[1])/2.5);for(let i=0;i<=n;i++){const q=i/n,x=lerp(a[0],c[0],q),y=lerp(a[1],c[1],q),w=r0*(1+b*.75*Math.sin((x+y)*.16));g+=C(x,y,Math.max(.8,w),'fill:var(--bile)')}}return g};
    s+=tube(path,5)+L.map((P,i)=>tube(P,i<2?4:3)).join('');
    s+=R4(cx-26,R.y+R.h-48,52,16,'fill:var(--panel-2);stroke:var(--line)',8)+T(cx,R.y+R.h-20,'to the gut','t-xs t-mid');
    s+=T(R.x+12,R.y+20,b<.5?'bile ducts, smooth':'strictures and dilatations: "beaded" ducts','t-lbl');
    const co=ramp(u,.45,.75),kx=R.x+R.w-58,ky=R.y+R.h-92;
    s+=`<g style="opacity:${f1(.25+.75*co)}"><path d="M${f1(kx-32)} ${f1(ky+40)}V${f1(ky-20)}Q${f1(kx-32)} ${f1(ky-36)} ${f1(kx)} ${f1(ky-36)}Q${f1(kx+32)} ${f1(ky-36)} ${f1(kx+32)} ${f1(ky-20)}V${f1(ky+40)}" style="fill:none;stroke:var(--liver-fill);stroke-width:11;stroke-linecap:round;opacity:.55"/>`;
    for(let i=0;i<6;i++)s+=C(kx-32+(i%2)*64,ky+30-i*9,2.4,`fill:var(--bad);opacity:${f1(co)}`);
    s+=T(kx,ky+58,'colon: IBD','t-xs t-mid','fill:var(--ink)')+T(kx,ky+69,'in 71.1%','t-xs t-mid','fill:var(--ink)')+'</g>';
    return s}
  function sDILI(R,u,ph){let s='';const hx=R.x+R.w*.42,hy=R.y+R.h*.42,h=ease(ramp(u,.05,.4));
    s+=R4(R.x+16,R.y+44,30,40,'fill:var(--panel);stroke:var(--muted);stroke-width:1.4',5)+R4(R.x+14,R.y+38,34,9,'fill:var(--muted)',3)+pill(R.x+76,R.y+60,26,{ang:30})+`<path d="M${f1(R.x+44)} ${f1(R.y+112)}q16 -26 34 -12q-14 18 -34 12z" style="fill:var(--stellate);opacity:.85"/>`;
    s+=T(R.x+14,R.y+130,'medicines,','t-xs')+T(R.x+14,R.y+141,'herbs,','t-xs')+T(R.x+14,R.y+152,'supplements','t-xs');
    s+=AR(R.x+96,R.y+86,hx-40,hy-10,'var(--bad)');
    s+=hepatocyte(hx,hy,96,{hurt:h,seed:4});
    s+=T(hx,hy+64,'injured hepatocyte','t-xs t-mid');
    const items=['viral hepatitis','alcohol','autoimmune','bile ducts','other causes'],lx=R.x+R.w*.66,ly=R.y+60;
    s+=T(lx,ly-22,'rule out first:','t-xs','fill:var(--ink);font-weight:700');
    items.forEach((it,i)=>{const d=ramp(u,.35+i*.08,.42+i*.08),y=ly+i*24;s+=R4(lx,y-10,12,12,'fill:var(--panel);stroke:var(--muted)',2);
      if(d>0)s+=`<path d="M${f1(lx+2)} ${f1(y-4)}l3 4l6 -8" style="stroke:var(--rx);stroke-width:2;fill:none;opacity:${f1(d)}"/>`;
      s+=T(lx+18,y,it,'t-xs',d>0?'fill:var(--ink)':'')});
    const f=ramp(u,.8,.9);s+=`<g style="opacity:${f1(f)}">`+R4(lx-4,ly+118,R.x+R.w-lx-6,34,'fill:var(--bad-soft);stroke:var(--bad)',8)+T(lx+4,ly+132,'DILI likely,','t-xs','fill:var(--bad);font-weight:700')+T(lx+4,ly+144,'causality: RUCAM','t-xs','fill:var(--bad)')+'</g>';
    s+=T(R.x+12,R.y+20,'a diagnosis of exclusion','t-lbl');
    return s}
  function sFON(R,u,ph){let s='';const cx=R.x+R.w*.42,yr=Math.round(24*ramp(u,.05,.9)),fib=3.4*ramp(u,.1,.9);
    const hx=cx,hy=R.y+64;s+=`<path d="M${f1(hx)} ${f1(hy+30)}C${f1(hx-46)} ${f1(hy)} ${f1(hx-34)} ${f1(hy-34)} ${f1(hx)} ${f1(hy-14)}C${f1(hx+34)} ${f1(hy-34)} ${f1(hx+46)} ${f1(hy)} ${f1(hx)} ${f1(hy+30)}Z" style="fill:var(--artery);opacity:.75"/>`+T(hx+46,hy-4,'heart:','t-xs')+T(hx+46,hy+7,'Fontan circulation','t-xs');
    const vw=4+5*ramp(u,0,.4);s+=`<path d="M${f1(hx)} ${f1(hy+32)}V${f1(R.y+R.h*.5)}" style="stroke:var(--portal);stroke-width:${f1(vw)};stroke-linecap:round"/>`;
    for(let i=0;i<4;i++){const k=(1-((ph*.4+i/4)%1));s+=C(hx,lerp(hy+34,R.y+R.h*.5,k),2.4,'fill:var(--panel)')}
    s+=T(hx-10,R.y+R.h*.4,'high venous','t-xs t-end')+T(hx-10,R.y+R.h*.4+11,'pressure','t-xs t-end');
    s+=liver(cx,R.y+R.h*.64,1.05,{fib,gb:false,seed:17}).svg;
    const tx0=R.x+24,tx1=R.x+R.w-24,ty=R.y+R.h-22,X=v=>lerp(tx0,tx1,v/24);
    s+=`<line x1="${f1(tx0)}" x2="${f1(tx1)}" y1="${f1(ty)}" y2="${f1(ty)}" class="axis"/>`;
    [0,10,20].forEach(v=>s+=T(X(v),ty+12,v+' y','t-xs t-mid'));s+=C(X(yr),ty,5,'fill:var(--portal);stroke:var(--panel);stroke-width:2');
    s+=T(tx1,ty-8,`${yr} years after surgery`,'t-xs t-end','fill:var(--ink)');
    if(u>.85)s+=T(R.x+R.w-12,R.y+R.h*.5,'HCC 3.9% at ≥20 y','t-xs t-end',`fill:var(--bad);opacity:${f1(ramp(u,.85,.95))}`);
    return s}
  const SC=[sHH,sWil,sAAT,sAIH,sPBC,sPSC,sDILI,sFON];
  function info(R,I,u){let s=R4(R.x,R.y,R.w,R.h,'fill:var(--panel);stroke:var(--line)',12),x=R.x+16,y=R.y+26;
    s+=T(x,y,I.tag,'t-sm',`fill:${I.col};letter-spacing:.08em`);y+=24;
    s+=T(x,y,I.name,'t-big','font-size:19px');y+=12;
    const row=(lab,L)=>{y+=20;s+=T(x,y,lab,'t-xs','letter-spacing:.1em');L.forEach(l=>{y+=15;s+=T(x,y,l,'t-lbl','font-weight:500')})};
    row('WHERE',I.where);row('KEY TEST',I.test);row(I.rxl||'TREATMENT',I.rx);
    y+=36;const g=ease(ramp(u,.08,.45)),n=I.num;
    const big=n.txt?n.txt:`${(n.v*g).toFixed(n.dp||0)}${n.suf||''}`;
    s+=T(x,y,big,'t-big',`font-size:28px;fill:${I.col};opacity:${f1(n.txt?.3+.7*g:1)}`);
    I.cap.forEach((c,i)=>s+=T(x,y+16+i*12,c,'t-xs'));
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 650'),p=phaseOf(S,t),u=ramp(t,S[p].from,p+1<S.length?S[p+1].from:1);
    const SR=N?{x:8,y:8,w:384,h:330}:{x:12,y:12,w:346,h:356},IR=N?{x:8,y:346,w:384,h:298}:{x:372,y:12,w:336,h:356};
    let s=`<defs>${marker('ocArr','var(--muted)')}</defs>`+R4(SR.x,SR.y,SR.w,SR.h,'fill:var(--field);stroke:var(--line)',12);
    s+=SC[p](SR,u,t*40)+info(IR,OC_INFO[p],u);
    /* progress dots: where we are in the atlas */
    OC_INFO.forEach((I,i)=>{s+=C(IR.x+IR.w-16-(7-i)*12,IR.y+22,i===p?4.5:3,`fill:${i===p?I.col:'var(--line)'}`)});
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',`${p+1} of 8: ${OC_INFO[p].name}`);
    $('#ocNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#ocPlay'),draw,40000,'%t:player.replay%','othercauses');
  const setSt=stepWire($('#ocSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- pedigree: autosomal recessive inheritance ---- */
  const ps=$('#ocPed');let gene='hfe',par='cc';
  const PAR={cc:[['v','+'],['v','+']],ca:[['v','+'],['v','v']],cn:[['v','+'],['+','+']],an:[['v','v'],['+','+']]};
  const GN={hfe:{v:'C282Y',name:'HFE',dis:'haemochromatosis'},wil:{v:'ATP7B*',name:'ATP7B',dis:'Wilson disease'}};
  function drawPed(){const N=vb(ps,'720 262','400 446'),G=GN[gene],[fa,mo]=PAR[par],al=a=>a==='v'?G.v:'+',cnt=g=>g.filter(a=>a==='v').length,aff=g=>[0,.5,1][cnt(g)];
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    const kids=[];fa.forEach(a=>mo.forEach(b=>kids.push([a,b])));
    const px=N?200:200,fx=px-70,mx=px+70,py=50;
    s+=`<line x1="${fx+12}" x2="${mx-12}" y1="${py}" y2="${py}" style="stroke:var(--ink);stroke-width:1.5"/><line x1="${px}" x2="${px}" y1="${py}" y2="${py+44}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=ped(fx,py,'m',aff(fa),{r:13})+ped(mx,py,'f',aff(mo),{r:13});
    s+=T(fx,py-22,'father','t-xs t-mid')+T(mx,py-22,'mother','t-xs t-mid')+T(fx,py+28,fa.map(al).join(' / '),'t-xs t-mid','fill:var(--ink)')+T(mx,py+28,mo.map(al).join(' / '),'t-xs t-mid','fill:var(--ink)');
    const kx0=px-135,kw=90,ky=py+80;s+=`<line x1="${kx0}" x2="${kx0+3*kw}" y1="${py+44}" y2="${py+44}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    let pro=false;
    kids.forEach((k,i)=>{const x=kx0+i*kw,a=aff(k);s+=`<line x1="${x}" x2="${x}" y1="${py+44}" y2="${ky-13}" style="stroke:var(--ink);stroke-width:1.5"/>`;
      const pb=a===1&&!pro;if(pb)pro=true;
      s+=ped(x,ky,i%2?'f':'m',a,{r:13,proband:pb});
      s+=T(x,ky+28,k.map(al).join(' / '),'t-xs t-mid','fill:var(--ink)')+T(x,ky+40,['no copy','carrier','two copies'][cnt(k)],'t-xs t-mid',a===1?'fill:var(--brand);font-weight:700':'')+T(x,ky+52,'25% each','t-xs t-mid')});
    const two=kids.filter(k=>cnt(k)===2).length*25,one=kids.filter(k=>cnt(k)===1).length*25,none=100-two-one;
    const sy=ky+80;s+=T(px,sy,`Each child: ${two}% two copies · ${one}% carrier · ${none}% no copy`,'t-lbl t-mid');
    /* legend */
    const lgy=sy+26;s+=ped(px-120,lgy,'m',1,{r:7})+T(px-108,lgy+4,'two copies','t-xs')+ped(px-30,lgy,'m',.5,{r:7})+T(px-18,lgy+4,'carrier','t-xs')+ped(px+50,lgy,'m',0,{r:7})+T(px+62,lgy+4,'no copy','t-xs');
    /* Punnett square */
    const qx=N?110:470,qy=N?lgy+56:56,c=N?92:96;
    s+=T(qx+c,qy-28,'Punnett square','t-sm t-mid');
    s+=T(qx-12,qy+c*.5+4,'mother ↓','t-xs t-end')+T(qx+c,qy-12,'father →','t-xs t-mid');
    fa.forEach((a,i)=>s+=T(qx+c*(i+.5),qy-2,al(a),'t-xs t-mid','fill:var(--ink);font-weight:700'));
    mo.forEach((b,j)=>s+=T(qx-4,qy+c*(j+.5)+16,al(b),'t-xs t-end','fill:var(--ink);font-weight:700'));
    fa.forEach((a,i)=>mo.forEach((b,j)=>{const g=[a,b],n=cnt(g),x=qx+c*i,y=qy+c*j;
      s+=R4(x+2,y+2,c-4,c-4,`fill:${n===2?'var(--brand-soft)':n===1?'var(--accent-soft)':'var(--panel)'};stroke:var(--line)`,6);
      s+=ped(x+c/2,y+c*.38,'m',[0,.5,1][n],{r:10})+T(x+c/2,y+c*.72,g.map(al).join('/'),'t-xs t-mid','fill:var(--ink)')+T(x+c/2,y+c*.86,'25%','t-xs t-mid')}));
    ps.innerHTML=s;
    const pen=gene==='hfe'?`Two copies of C282Y are needed for HFE haemochromatosis to be diagnosed from raised iron indices [[EASL2022HH]], but two copies are not the disease: iron-overload disease developed in 28.4% of homozygous men and 1.2% of homozygous women followed for about 12 years in Melbourne [[Allen2008NEJM]], and by the end of UK Biobank follow-up haemochromatosis had been diagnosed in 21.7% of homozygous men and 9.8% of women [[Pilling2019BMJ]].`
      :`Wilson disease is autosomal recessive, caused by variants in ATP7B [[Ferenci2003Leipzig]]. About 1 in 7,026 people are predicted to carry two pathogenic variants, far more than the 1 in 30,000 with symptomatic disease, which suggests reduced penetrance and missed diagnoses [[Coffey2013,Czlonkowska2018]].`;
    $('#ocPedNote').innerHTML=`<div class="kicker">${G.dis} · ${G.name}</div><h4>${two}% of children with two copies</h4><p>The chances come from Mendel's rules: each parent passes on one of their two copies at random, so each child is one square of the Punnett square. They are the same for every pregnancy, whatever happened to brothers or sisters.</p><p>${pen}</p>`}
  $$('[data-ocg]').forEach(b=>b.addEventListener('click',()=>{gene=b.dataset.ocg;$$('[data-ocg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPed()}));
  $$('[data-ocp]').forEach(b=>b.addEventListener('click',()=>{par=b.dataset.ocp;$$('[data-ocp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPed()}));
  drawPed();
  const prevR=redraws.othercauses;redraws.othercauses=()=>{prevR&&prevR();drawPed()};

  /* ---- which test? matrix ---- */
  const mx=$('#ocMx');let selR=0,selC=-1;
  function drawMx(){let h='<thead><tr><th scope="col">Cause</th>'+OC_MX.cols.map((c,j)=>`<th scope="col"><button class="oc-colb" data-occ="${j}" aria-pressed="${j===selC}">${c}</button></th>`).join('')+'</tr></thead><tbody>';
    OC_MX.rows.forEach((r,i)=>{h+=`<tr class="${i===selR&&selC<0?'oc-on':''}"><th scope="row"><button class="oc-rowb" data-ocr="${i}" aria-pressed="${i===selR&&selC<0}">${r.n}</button></th>`+OC_MX.cols.map((_,j)=>{const m=r.m[j];return `<td class="${j===selC?'oc-colon':''}${m?' oc-'+m:''}">${m==='K'?'<span aria-label="key test">●</span>':m==='S'?'<span aria-label="supportive">○</span>':''}</td>`}).join('')+'</tr>'});
    mx.innerHTML=h+'</tbody>';
    let note;
    if(selC<0){const r=OC_MX.rows[selR];note=`<div class="kicker">Which test?</div><h4>${r.n}</h4><p>${r.d}</p>`}
    else{const K=OC_MX.rows.filter(r=>r.m[selC]==='K').map(r=>r.n),Sx=OC_MX.rows.filter(r=>r.m[selC]==='S').map(r=>r.n);
      note=`<div class="kicker">Which test?</div><h4>${OC_MX.cols[selC]}</h4><p>${K.length?'Key test here for: <b>'+K.join(', ')+'</b>.':''} ${Sx.length?'Supportive for: '+Sx.join(', ')+'.':''} Choose a cause on the left to read what its sources say.</p>`}
    $('#ocMxNote').innerHTML=note}
  mx.addEventListener('click',e=>{const r=e.target.closest('[data-ocr]'),c=e.target.closest('[data-occ]');if(r){selR=+r.dataset.ocr;selC=-1;drawMx()}else if(c){selC=+c.dataset.occ===selC?-1:+c.dataset.occ;drawMx()}});
  drawMx();
};
