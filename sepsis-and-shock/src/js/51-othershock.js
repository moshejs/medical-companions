/* =============== 5.1 Cardiogenic, hypovolaemic, obstructive & anaphylactic shock =============== */
/* Uses shCircuit() from 14-shock.js (the pump, pipes and tank model). Each type has four steps on one
   scrubber (0..1), a circuit state and a close-up panel drawn in a 280 x 270 local box. */
const OS_AT=[.12,.37,.62,.88],OS_FROM=[0,.25,.5,.75];
const OS_TYPES={
 cardio:{name:'Cardiogenic',fail:['pump'],kind:'tamp',steps:[
  {k:'Cardiogenic · 1',t:'A coronary artery blocks',
   txt:`Cardiogenic shock occurs in up to 10% of people immediately after an acute myocardial infarction (heart attack) and is the leading cause of in-hospital death after one [[Samsky2021]]. In the 2019 SCAI scheme, stage A is "at risk" [[Baran2019SCAI]].`,
   pt:`A heart attack happens when a blood vessel feeding the heart muscle is blocked. Sometimes so much muscle is affected that the heart cannot pump enough blood: that is cardiogenic shock [[Samsky2021]].`,
   hook:`Cardiogenic shock complicates up to 10% of acute MI; 30-day mortality is about 40% [[Samsky2021]].`},
  {k:'Cardiogenic · 2',t:'The pump weakens',
   txt:`Primary pump failure lowers cardiac output, a low-flow state [[Vincent2008CO,Cecconi2014ESICM]]. Standl 2018 gives criteria of a cardiac index below 1.8 L/min/m² without support (below 2.0 with drug or mechanical support) plus a systolic pressure below 90 mmHg [[Standl2018]]. SCAI stage B is "beginning" shock [[Baran2019SCAI]]. In SOAP II, dopamine went with higher 28-day mortality than norepinephrine in the 280 patients with cardiogenic shock (P=0.03) [[DeBacker2010SOAPII]].`,
   pt:`The weakened heart pumps less blood with each beat, so the blood pressure falls [[Standl2018]].`,
   hook:`Cardiogenic shock: cardiac index &lt;1.8 L/min/m² without support plus SBP &lt;90 mmHg [[Standl2018]].`},
  {k:'Cardiogenic · 3',t:'Organs go short: stage C',
   txt:`Hypoperfusion separates SCAI stage B ("beginning") from C ("classic"). Stage D ("deteriorating") means the first treatments have not restored stability after at least 30 minutes, and E is "extremis" [[Baran2019SCAI]]. In 10,004 cardiac ICU patients, unadjusted hospital mortality was 3.0%, 7.1%, 12.4%, 40.4% and 67.0% from stage A to E, population figures [[Jentzer2019SCAI]].`,
   pt:`When the organs start to run short of blood, doctors call it classic shock. Grading how severe it is helps the whole team act quickly [[Baran2019SCAI]].`,
   hook:`SCAI A at risk, B beginning, C classic, D deteriorating, E extremis; B to C = hypoperfusion [[Baran2019SCAI]].`},
  {k:'Cardiogenic · 4',t:'Opening the artery',
   txt:`Immediate revascularisation of the infarct-related artery is the only treatment supported by randomised trials [[Samsky2021]]. In SHOCK (302 patients), 6-month mortality was 50.3% with emergency revascularisation vs 63.1% with initial medical stabilisation [[Hochman1999SHOCK]]. In multivessel disease, culprit-lesion-only PCI beat immediate multivessel PCI for death or kidney replacement at 30 days (45.9% vs 55.4%) [[Thiele2017CULPRIT]]. Support devices are contested: compare the trials below.`,
   pt:`Doctors open the blocked artery, often with a thin tube passed to the heart and a stent, so blood reaches the heart muscle again [[Samsky2021,Thiele2017CULPRIT]].`,
   hook:`Culprit-lesion-only PCI first in multivessel cardiogenic shock [[Thiele2017CULPRIT]]; IABP did not lower 30-day mortality [[Thiele2012IABP]].`}]},
 hypo:{name:'Hypovolaemic',fail:['tank'],kind:'tamp',steps:[
  {k:'Hypovolaemic · 1',t:'Bleeding starts',
   txt:`Haemorrhagic shock is acute bleeding without major soft-tissue injury; traumatic haemorrhagic shock adds tissue injury. Volume can also be lost without bleeding, as in persistent vomiting and diarrhoea, hyperthermia or large burns [[Standl2018]]. In pooled data from CRASH-2 and WOMAN, 63% of deaths from bleeding happened within 12 h of its onset [[GayetAgeron2018]].`,
   pt:`Heavy bleeding, from an injury or inside the body, can drain the blood the heart needs to pump [[Standl2018]].`,
   hook:`Hypovolaemic subtypes: haemorrhagic, traumatic haemorrhagic, hypovolaemic in the narrow sense, traumatic hypovolaemic (burns) [[Standl2018]].`},
  {k:'Hypovolaemic · 2',t:'The tank runs low',
   txt:`Less blood returns to the heart, so output falls: a low-flow state [[Vincent2008CO,Cecconi2014ESICM]]. ATLS teaches four classes of blood loss with matching vital signs, but in 36,504 trauma patients only 9.3% fitted a class [[Mutschler2014ATLS,Mutschler2013ATLS]]. Heart rate and blood pressure often look normal in compensated shock [[Koch2019SI]].`,
   pt:`The body tries to make up for blood loss, so the pulse and blood pressure can look surprisingly normal at first [[Koch2019SI]].`,
   hook:`The ATLS classes fitted only 9.3% of real trauma patients [[Mutschler2013ATLS]].`},
  {k:'Hypovolaemic · 3',t:'Shock index and base deficit',
   txt:`In 21,853 trauma patients grouped by shock index at arrival, mortality rose from 10.9% (below 0.6) to 39.8% (1.4 or more), and mean units transfused from 1.0 to 21.4 [[Mutschler2013SI]]. Base-deficit classes did similar work: mortality 7.4% in class I vs 51.5% in class IV, massive transfusion 5% vs 52% [[Mutschler2013BD]]. ESICM suggests tolerating lower pressure in uncontrolled bleeding without severe head injury (quoted as published) [[Cecconi2014ESICM]].`,
   pt:`Doctors combine several measurements, including blood tests, to judge how much blood has been lost [[Mutschler2013SI,Mutschler2013BD]].`,
   hook:`Shock index 1.4 or more in trauma: 39.8% mortality, and 57% needed 10 or more units of blood [[Mutschler2013SI]].`},
  {k:'Hypovolaemic · 4',t:'Early tranexamic acid, balanced blood',
   txt:`In CRASH-2 (20,211 patients), tranexamic acid, as published 1 g over 10 min then 1 g over 8 h, lowered all-cause death (14.5% vs 16.0%) [[CRASH2-2010]]. Timing mattered: for death from bleeding the RR was 0.68 within 1 h, 0.79 at 1–3 h and 1.44 after 3 h (possible harm) [[CRASH2-2011]], and the benefit fell by 10% for every 15 min of delay [[GayetAgeron2018]]. In PROPPR, 1:1:1 transfusion did not significantly lower 24-h or 30-day mortality but cut death from exsanguination (9.2% vs 14.6%) [[Holcomb2015PROPPR]].`,
   pt:`In heavy bleeding after injury, the drug tranexamic acid helps most when it is given early [[GayetAgeron2018]].`,
   hook:`Tranexamic acid: earlier is better; after 3 h the RR for bleeding death was 1.44 [[CRASH2-2011]].`}]},
 obstr:{name:'Obstructive',fail:['block'],kind:'tamp',steps:[
  {k:'Obstructive · 1',t:'Fluid gathers round the heart',
   txt:`ESC 2015 defines cardiac tamponade as "a life-threatening, slow or rapid compression of the heart due to the pericardial accumulation of fluid" [[Adler2015ESC]]. Obstructive causes either reduce filling (vena cava compression, tension pneumothorax, tamponade) or raise the load on the right ventricle (pulmonary embolism, a mediastinal mass) [[Standl2018]].`,
   pt:`Fluid can build up in the sac around the heart and squeeze it so it cannot fill [[Adler2015ESC]].`,
   hook:`Obstructive shock is likely the rarest type, 1–2% in Standl's table [[Standl2018]].`},
  {k:'Obstructive · 2',t:'The heart cannot fill',
   txt:`Listed signs include tachycardia, hypotension, pulsus paradoxus (an inspiratory fall in systolic pressure of more than 10 mmHg), raised jugular venous pressure and muffled heart sounds [[Adler2015ESC]]. Beck's triad "does not appear commonly", and breathlessness is the commonest symptom. On echo, diastolic right-ventricular collapse is specific and a plethoric inferior vena cava is sensitive [[Alerhand2022]].`,
   pt:`The squeezed heart takes in less blood with each beat, so it pumps out less [[Adler2015ESC]].`,
   hook:`Pulsus paradoxus = inspiratory fall in SBP &gt;10 mmHg [[Adler2015ESC]].`},
  {k:'Obstructive · 3',t:'Air or a clot can block it too',
   txt:`In tension pneumothorax, ventilated people were far more likely to become hypotensive (adjusted odds 12.6 times) or to arrest (17.7 times) than people breathing on their own [[Roberts2015TPTX]]. In ICOPER, massive pulmonary embolism (systolic pressure below 90 mmHg) carried 90-day mortality of 52.4% vs 14.7% [[Kucher2006ICOPER]]. In an unstable patient with suspected PE, ESC 2019 states that right-ventricular dysfunction on echo "is sufficient to prompt immediate reperfusion without further testing" [[Konstantinides2020ESC]].`,
   pt:`Trapped air in the chest or a large clot in the lungs can also block blood flow, and both need urgent treatment [[Standl2018]].`,
   hook:`Ventilated patients with tension pneumothorax become hypotensive or arrest far more often than spontaneously breathing ones [[Roberts2015TPTX]].`},
  {k:'Obstructive · 4',t:'Relieve the blockage',
   txt:`Standl 2018 says obstructive shock "shall be treated with an immediate life-saving intervention" [[Standl2018]]. For tamponade, ESC 2015 advises drainage, "preferably by needle pericardiocentesis", without delay in unstable patients, and surgery in some cases such as purulent pericarditis [[Adler2015ESC]]. For high-risk PE, ESC 2019 names primary reperfusion, in most cases systemic thrombolysis, as the treatment of choice; its Table 10 lists rtPA 100 mg over 2 h (quoted as published) [[Konstantinides2020ESC]].`,
   pt:`Draining the fluid or clearing the clot lets the heart fill and pump again [[Standl2018,Adler2015ESC]].`,
   hook:`Tamponade: needle pericardiocentesis. High-risk PE: systemic thrombolysis [[Adler2015ESC,Konstantinides2020ESC]].`}]},
 anaph:{name:'Anaphylactic',fail:['pipes'],kind:'tamp',steps:[
  {k:'Anaphylactic · 1',t:'A trigger',
   txt:`In UK fatal reactions, the median time to respiratory or cardiac arrest was 5 min for medicines, 15 min for venom and 30 min for food [[Pumphrey2000]]. WAO 2020 calls anaphylaxis highly likely when low blood pressure, bronchospasm or throat involvement follow exposure to a known or probable allergen, even without skin features [[Cardona2020WAO]].`,
   pt:`A severe allergic reaction can become life-threatening within minutes [[Pumphrey2000]].`,
   hook:`Median time to arrest in fatal anaphylaxis: medicines 5, venom 15, food 30 min [[Pumphrey2000]].`},
  {k:'Anaphylactic · 2',t:'Histamine widens the vessels',
   txt:`Standl 2018 describes anaphylactic shock as massive histamine-mediated vasodilation and maldistribution, a distributive shock [[Standl2018]]. WAO 2020's first criterion is acute skin or mucosal involvement plus breathing trouble, low blood pressure, organ dysfunction or severe gut symptoms [[Cardona2020WAO]].`,
   pt:`Chemicals released in the reaction make the blood vessels widen and leak, so the blood pressure can fall fast [[Standl2018]].`,
   hook:`Anaphylactic shock is distributive: histamine-mediated vasodilation [[Standl2018]].`},
  {k:'Anaphylactic · 3',t:'Adrenaline into the thigh',
   txt:`WAO 2020 quotes intramuscular adrenaline at 0.01 mg/kg to a maximum of 0.5 mg, repeated every 5–15 min if refractory; RCUK 2021 quotes 500 micrograms for adults and children over 12, repeated about every 5 min if there is no improvement (both quoted as published) [[Cardona2020WAO,Dodd2021RCUK]]. The EpiPen label gives 0.3 mg into the anterolateral thigh for patients of 30 kg or more and calls the auto-injector "not a substitute for immediate medical care" [[FDA-EpiPen]]. Adrenaline had been used before arrest in only 14% of UK fatal reactions [[Pumphrey2000]].`,
   pt:`An adrenaline auto-injector is used straight away, and then you still call for emergency help [[Pumphrey2000,FDA-EpiPen]].`,
   hook:`IM adrenaline into the anterolateral thigh is first line; the adult dose is quoted as 0.5 mg (RCUK, WAO) [[Dodd2021RCUK,Cardona2020WAO]].`},
  {k:'Anaphylactic · 4',t:'Watch for a second wave',
   txt:`Biphasic reactions return after the first has resolved, without re-exposure, at a median of 11 h (range 0.2–72 h) [[Lee2015Biphasic]]. RCUK 2021 suggests risk-stratified observation (2 h, at least 6 h, or at least 12 h), no longer routinely recommends corticosteroids, and recommends against antihistamines for acute management [[Dodd2021RCUK]]. Antihistamines and glucocorticoids do not reliably prevent biphasic reactions [[Shaker2020]].`,
   pt:`Symptoms can come back hours later, so people are usually watched in hospital for a while after treatment [[Lee2015Biphasic,Dodd2021RCUK]].`,
   hook:`Biphasic anaphylaxis: median onset 11 h; more likely with hypotension at presentation (OR 2.18) [[Lee2015Biphasic]].`}]}
};
/* circuit state for each type along the course t */
function osState(ty,t){const base={pump:1,tone:.5,tank:.75,flow:1,perf:1,leak:0,bleed:0,obs:0,dim:0,map:1};
  if(ty==='cardio'){const d=ramp(t,.1,.42),r=ramp(t,.8,.95);return {...base,dim:.75*ramp(t,.06,.3)*(1-.45*r),pump:1-.65*d+.35*r,flow:1-.55*d+.3*r,perf:1-.5*ramp(t,.3,.55)+.3*r,map:1-.5*ramp(t,.22,.5)+.3*ramp(t,.82,.97),bad:d*(1-r*.6)}}
  if(ty==='hypo'){const d=ramp(t,.03,.45),r=ramp(t,.78,.95);return {...base,tank:.75-.62*d+.45*r,bleed:ramp(t,.02,.08)*(1-ramp(t,.76,.84)),flow:1-.55*ramp(t,.12,.45)+.35*r,perf:1-.5*ramp(t,.3,.5)+.3*r,map:1-.5*ramp(t,.2,.5)+.35*r,bad:d*(1-r*.6)}}
  if(ty==='obstr'){const f=ramp(t,.03,.35)*(1-ramp(t,.78,.92));return {...base,obs:f,pump:1-.2*f,flow:1-.6*f,perf:1-.5*f,map:1-.55*f,bad:f}}
  const d=ramp(t,.12,.4),r=ramp(t,.55,.7);return {...base,tone:.5-.48*d+.46*r,leak:.8*ramp(t,.2,.4)*(1-ramp(t,.58,.75)),perf:1-.45*d+.4*r,flow:1+.25*d*(1-r),map:1-.5*ramp(t,.15,.4)+.45*r,bad:d*(1-r)}}
/* the close-up panel, 280 x 270 */
function osDetail(ty,t,ph){let s='';const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  if(ty==='cardio'){const clot=ramp(t,.02,.18)*(1-ramp(t,.8,.9)),dmg=ramp(t,.1,.35)*(1-.5*ramp(t,.82,.95)),st=ramp(t,.75,.85);
    s+=organ('heart',140,108,150,{fail:.15*dmg});
    s+=`<ellipse cx="158" cy="140" rx="32" ry="24" style="fill:var(--organ-fail);opacity:${f1(.85*dmg)}"/>`;
    const art='M116 46C100 78 112 116 168 168';
    s+=`<path d="${art}" style="fill:none;stroke:var(--wall);stroke-width:8;stroke-linecap:round"/><path d="${art}" style="fill:none;stroke:var(--oxy);stroke-width:4.5;stroke-linecap:round;opacity:${f1(1-.6*clot)}"/>`;
    if(clot>.02)s+=`<path d="${smoothPath(blobPts(5+4*clot,9,.25,6).map(p=>[p[0]+107,p[1]+86]))}" style="fill:var(--clot);opacity:${f1(clot)}"/>`;
    if(st>.02){s+=`<path d="M276 6C220 14 150 44 112 84" style="fill:none;stroke:var(--device);stroke-width:2;opacity:${f1(st)}"/>`;
      let z='M101 80';for(let i=0;i<6;i++)z+=`L${f1(i%2?104:110)} ${f1(80+i*3.4)}`;s+=`<path d="${z}" style="fill:none;stroke:var(--device);stroke-width:2.2;opacity:${f1(st)}"/>`;
      s+=T(276,196,'catheter + stent (PCI)','t-xs t-end',`fill:var(--ink);font-weight:600;opacity:${f1(st)}`)}
    s+=T(16,34,'coronary artery','t-xs','fill:var(--ink)')+`<path d="M70 38L104 50" style="stroke:var(--muted);stroke-width:1"/>`;
    if(clot>.2)s+=T(40,80,'clot','t-xs',`fill:var(--clot);font-weight:600;opacity:${f1(clot)}`);
    if(dmg>.3)s+=T(196,150,'muscle short','t-xs',`fill:var(--ink);opacity:${f1(dmg)}`)+T(196,161,'of oxygen','t-xs',`fill:var(--ink);opacity:${f1(dmg)}`);
    /* SCAI stage strip */
    const stg=t<.25?0:t<.5?1:2,nm=['A · at risk','B · beginning','C · classic','D · deteriorating','E · extremis'];
    s+=T(20,206,'SCAI stage','t-sm','fill:var(--ink);font-weight:600');
    ['A','B','C','D','E'].forEach((q,i)=>{const on=i===stg;s+=`<rect x="${20+i*49}" y="214" width="45" height="24" rx="6" style="fill:${on?'var(--bad)':i<stg?'var(--bad-soft)':'var(--panel-2)'};stroke:var(--line)"/>`+T(42.5+i*49,230,q,'t-sm t-mid',`fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700`)});
    s+=T(20,256,nm[stg],'t-xs','fill:var(--ink)')}
  else if(ty==='hypo'){const bl=ramp(t,.02,.08)*(1-ramp(t,.76,.84)),tr=ramp(t,.75,.82),min=180*ramp(t,0,.95);
    s+=`<rect x="16" y="30" width="150" height="44" rx="22" style="fill:var(--skin);stroke:var(--line)"/>`+T(18,22,'injured limb','t-xs','fill:var(--ink)');
    s+=`<path d="M78 46l8 10l-6 6l10 6" style="fill:none;stroke:var(--oxy);stroke-width:3;stroke-linecap:round;opacity:${f1(.3+.7*bl)}"/>`;
    for(let i=0;i<4;i++){const k=(ph*1.4+i/4)%1;s+=`<circle cx="${f1(86+i*3)}" cy="${f1(76+k*50)}" r="3" style="fill:var(--oxy);opacity:${f1(bl*(1-k*.7))}"/>`}
    s+=clock(222,64,38,min,{full:180,col:'var(--rx)',marks:[{min:60,col:'var(--good)',label:'1 h'},{min:180,col:'var(--bad)',label:'3 h'}]})+T(222,122,'time since injury','t-xs t-mid','fill:var(--ink)');
    if(tr>.02){s+=`<g style="opacity:${f1(tr)}">`+ivBag(40,128,.62,{fill:1-ramp(t,.82,1)*.5,col:'var(--oxy)',label:'blood',ph}).svg+ivBag(84,128,.62,{fill:1-ramp(t,.82,1)*.6,col:'var(--rx)',label:'TXA',ph:ph+.4}).svg+`</g>`}
    /* step 3: what the registry groupings showed */
    const gv=ramp(t,.5,.56)*(1-ramp(t,.7,.75));if(gv>0){s+=`<g style="opacity:${f1(gv)}">`;
      [['trauma deaths by shock index','SI <0.6',10.9,'SI ≥1.4',39.8,152],['by base-deficit class','class I',7.4,'class IV',51.5,206]].forEach(r=>{const y=r[5];
        s+=T(16,y,r[0],'t-xs','fill:var(--ink);font-weight:600');
        [[r[1],r[2]],[r[3],r[4]]].forEach((q,j)=>{const yy=y+8+j*18,w=180*q[1]/60;s+=T(66,yy+11,q[0],'t-xs t-end','fill:var(--ink)')+`<rect x="72" y="${yy}" width="${f1(w)}" height="13" rx="3" style="fill:var(--bad);opacity:${j?.85:.45}"/>`+T(78+w,yy+11,q[1]+'%','t-xs','fill:var(--ink);font-weight:700')})});
      s+=`</g>`}
    /* CRASH-2 timing: relative risk of death from bleeding */
    const rv=ramp(t,.62,.75);if(rv>0){const X=v=>140+120*(v-.5)/1.1;s+=`<g style="opacity:${f1(rv)}">`+T(130,152,'CRASH-2: RR, death from bleeding','t-xs','fill:var(--ink);font-weight:600');
      [['≤1 h',.68],['1–3 h',.79],['&gt;3 h',1.44]].forEach((r,i)=>{const y=162+i*24,x1=X(1),x2=X(r[1]);s+=T(126,y+12,r[0],'t-xs t-end','fill:var(--ink)')+`<rect x="${f1(Math.min(x1,x2))}" y="${y}" width="${f1(Math.abs(x2-x1))}" height="14" rx="3" style="fill:${r[1]<1?'var(--good)':'var(--bad)'};opacity:.8"/>`+T(Math.max(x1,x2)+4,y+11,String(r[1]),'t-xs','fill:var(--ink);font-weight:700')});
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="158" y2="236" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`+T(X(1),250,'1 = no difference','t-xs t-mid')+`</g>`}}
  else if(ty==='obstr'){const f=ramp(t,.03,.35)*(1-ramp(t,.78,.92)),nd=ramp(t,.75,.82)*(1-ramp(t,.95,1)),al=bump(t,.5,.75);
    s+=`<ellipse cx="140" cy="100" rx="${f1(64+10*f)}" ry="${f1(66+10*f)}" style="fill:var(--fluid-soft);stroke:var(--muted);stroke-width:1.4;opacity:${f1(.25+.75*Math.max(f,.15))}"/>`;
    s+=organ('heart',140,100,128*(1-.2*f)*(1+.03*Math.sin(ph*9)),{});
    if(f>.1){for(let i=0;i<6;i++){const a=i/6*Math.PI*2,r1=74,r2=62;s+=`<path d="M${f1(140+Math.cos(a)*r1)} ${f1(100+Math.sin(a)*r1)}L${f1(140+Math.cos(a)*r2)} ${f1(100+Math.sin(a)*r2)}" style="stroke:var(--fluid);stroke-width:2;opacity:${f1(f)}" marker-end="url(#osA)"/>`}
      s+=T(8,14,'fluid in the pericardial sac','t-xs','fill:var(--fluid);font-weight:600')}
    if(nd>.02){s+=`<g style="opacity:${f1(nd)}"><path d="M28 238L104 150" style="stroke:var(--device);stroke-width:2.2"/><rect x="10" y="236" width="34" height="12" rx="3" transform="rotate(-49 27 242)" style="fill:var(--panel);stroke:var(--device)"/>`;
      for(let i=0;i<3;i++){const k=(ph*1.5+i/3)%1;s+=`<circle cx="${f1(lerp(104,30,k))}" cy="${f1(lerp(150,236,k))}" r="2.6" style="fill:var(--fluid)"/>`}
      s+=T(110,236,'needle drainage','t-xs','fill:var(--ink);font-weight:600')+T(110,247,'(pericardiocentesis)','t-xs')+`</g>`}
    if(al>.02){s+=`<g style="opacity:${f1(al)}"><rect x="8" y="180" width="264" height="84" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=organ('lung',60,220,52,{})+`<path d="M34 196C22 214 24 236 38 248C30 232 30 212 40 198Z" style="fill:var(--panel-2);stroke:var(--muted)"/>`+T(60,258,'tension pneumothorax','t-xs t-mid','fill:var(--ink)');
      s+=`<path d="M170 222H252" style="stroke:var(--wall);stroke-width:14;stroke-linecap:round"/><path d="M170 222H252" style="stroke:var(--blood-soft);stroke-width:10;stroke-linecap:round"/><path d="${smoothPath(blobPts(8,9,.25,8).map(p=>[p[0]+210,p[1]+222]))}" style="fill:var(--clot)"/>`+T(211,250,'clot in a lung artery','t-xs t-mid','fill:var(--ink)')+T(211,261,'(pulmonary embolism)','t-xs t-mid')+`</g>`}}
  else{const tr=ramp(t,0,.22),hs=ramp(t,.22,.42),ad=ramp(t,.5,.58),bi=ramp(t,.76,.84);
    /* time to arrest in fatal reactions (Pumphrey 2000), then the observation clock */
    if(bi<1){const X=v=>24+232*v/30;s+=`<g style="opacity:${f1(1-bi)}">`+T(20,18,'median time to arrest, fatal reactions','t-xs','fill:var(--ink);font-weight:600')+tline(24,40,232,{min:0,max:30,step:5,fmt:v=>v}).svg;
      [[5,'medicines'],[15,'venom'],[30,'food']].forEach((m,i)=>{const on=tr>i*.3;s+=`<circle cx="${f1(X(m[0]))}" cy="40" r="5" style="fill:${on?'var(--bad)':'var(--panel-2)'};stroke:var(--panel);stroke-width:1.5"/>`+T(X(m[0]),31,m[1],'t-xs t-mid',on?'fill:var(--ink);font-weight:600':'')});s+=T(256,70,'minutes','t-xs t-end')+`</g>`}
    if(bi>0){const X=v=>24+232*v/24;s+=`<g style="opacity:${f1(bi)}">`+T(20,12,'hours after the reaction settles','t-xs','fill:var(--ink);font-weight:600')+tline(24,40,232,{min:0,max:24,step:6,fmt:v=>v+' h'}).svg;
      [[2,'2'],[6,'6'],[12,'12']].forEach(m=>{s+=`<rect x="${f1(X(m[0])-1.5)}" y="30" width="3" height="20" style="fill:var(--rx)"/>`});
      s+=`<path d="M${f1(X(11))} 26l-5 -8h10z" style="fill:var(--warn)"/>`+T(24,70,'▲ median second wave: 11 h','t-xs','fill:var(--warn);font-weight:600')+T(24,82,'RCUK observation: 2 h, ≥6 h or ≥12 h','t-xs','fill:var(--rx)')+`</g>`}
    /* a cell releasing histamine */
    const cx=64,cy=128;s+=`<circle cx="${cx}" cy="${cy}" r="30" style="fill:var(--cell);stroke:var(--immune);stroke-width:1.6"/><circle cx="${cx-4}" cy="${cy+2}" r="10" style="fill:var(--immune);opacity:.75"/>`;
    const rr=rng(14);for(let i=0;i<14;i++){const a=rr()*Math.PI*2,d0=14+rr()*12,d=d0+hs*(14+rr()*22)*(1-ad*.6);s+=`<circle cx="${f1(cx+Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d)}" r="2.2" style="fill:var(--fever);opacity:${f1(1-ad*.7)}"/>`}
    s+=T(cx,cy+46,hs>.3?'histamine released':'immune cell','t-xs t-mid','fill:var(--ink)');
    const V=vessel(134,92,138,72,{ph,dilate:.9*hs*(1-ad),leak:.8*hs*(1-ad),seed:4});s+=V.svg+T(203,177,'small blood vessel','t-xs t-mid','fill:var(--ink)');
    if(ad>.02){s+=`<g style="opacity:${f1(ad)}"><rect x="20" y="196" width="150" height="52" rx="24" style="fill:var(--skin);stroke:var(--line)"/>`+T(95,262,'outer thigh','t-xs t-mid');
      s+=`<rect x="122" y="146" width="20" height="44" rx="6" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/><rect x="127" y="189" width="10" height="8" rx="2" style="fill:var(--accent)"/>`;
      s+=T(176,214,'adrenaline','t-sm','fill:var(--accent);font-weight:700')+T(176,227,'IM, into the','t-xs')+T(176,238,'anterolateral thigh','t-xs')+`</g>`}}
  return s}
/* cardiogenic shock trials, outcome per 100 people in each arm (rounded) */
const OS_ICO={
 shock:{a:['emergency revascularisation',50],b:['initial medical stabilisation',63],ev:'died within 6 months',
  cap:`SHOCK (1999; 302 patients with left-ventricular failure shock after a heart attack): 30-day mortality was 46.7% with emergency revascularisation vs 56.0% with initial medical stabilisation (P=0.11); at 6 months it was 50.3% vs 63.1% (P=0.027) [[Hochman1999SHOCK]].`},
 iabp:{a:['intra-aortic balloon pump',40],b:['no balloon pump',41],ev:'died within 30 days',
  cap:`IABP-SHOCK II (2012; 600 patients): 30-day mortality was 39.7% with an intra-aortic balloon pump vs 41.3% without (RR 0.96, 95% CI 0.79–1.17) [[Thiele2012IABP]]. At 6.2 years it was 66.3% vs 67.0%, "two thirds of patients with cardiogenic shock dying despite contemporary treatment" [[Thiele2019IABP6y]].`},
 culprit:{a:['culprit-lesion-only PCI',46],b:['immediate multivessel PCI',55],ev:'died or needed kidney replacement by 30 days',
  cap:`CULPRIT-SHOCK (2017; 706 patients with multivessel disease): death or renal-replacement therapy at 30 days was 45.9% with culprit-lesion-only PCI vs 55.4% with immediate multivessel PCI (RR 0.83); the RR of death was 0.84 [[Thiele2017CULPRIT]].`},
 ecls:{a:['early extracorporeal life support',48],b:['usual care',49],ev:'died within 30 days',
  cap:`ECLS-SHOCK (2023; 417 analysed): 30-day death was 47.8% with early extracorporeal life support vs 49.0% with usual care (RR 0.98), and moderate or severe bleeding was 23.4% vs 9.6% [[Thiele2023ECLS]].`},
 danger:{a:['microaxial flow pump + standard care',46],b:['standard care alone',59],ev:'died within 180 days',
  cap:`DanGer Shock (2024; 355 analysed, STEMI with cardiogenic shock): death at 180 days was 45.8% with a microaxial flow pump (Impella CP) vs 58.5% with standard care (HR 0.74, 95% CI 0.55–0.99). Harms were higher: the composite safety end point 24.0% vs 6.2%, and kidney replacement 41.9% vs 26.7% [[Moller2024DanGer]].`}
};
inits.othershock=()=>{
  const svg=$('#osSvg'),rg=$('#osT'),note=$('#osNote'),rd=$('#osRead');
  let ty='cardio',setSt=()=>{};
  const steps=OS_TYPES.cardio.steps.map((q,i)=>({...q,from:OS_FROM[i],at:OS_AT[i]}));
  function draw(t){const N=vb(svg,'720 410','400 760'),Ty=OS_TYPES[ty],ph=phaseOf(steps,t),S=steps[ph],P=osState(ty,t);
    const L=N?{hx:14,hy:22,cx:10,cy:50,cw:380,ch:250,gx:64,gy:352,gr:34,px:130,py:336,pw:258,dx:18,dy:398,ds:1.3}
             :{hx:16,hy:22,cx:10,cy:46,cw:400,ch:262,gx:70,gy:366,gr:36,px:150,py:352,pw:260,dx:428,dy:46,ds:1};
    let s=`<defs>${marker('osA','var(--fluid)',5)}</defs>`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-big" style="fill:var(--brand)">${S.t}</text><text x="${L.hx}" y="${L.hy+15}" class="t-sm">${Ty.name.toLowerCase()} shock · step ${ph+1} of 4</text>`;
    s+=shCircuit(L.cx,L.cy,L.cw,L.ch,{...P,obsKind:Ty.kind,ph:t*30,beat:t*100,fail:Ty.fail,fv:clamp(P.bad*1.5),id:'osM'}).svg;
    s+=gauge(L.gx,L.gy,L.gr,P.map*100,130,{ticks:false,bands:[{to:45,col:'var(--bad)'},{to:75,col:'var(--warn)'},{to:130,col:'var(--good)'}]});
    s+=`<text x="${L.gx}" y="${L.gy+16}" class="t-xs t-mid" style="fill:var(--ink)">blood pressure</text>`;
    const sw=L.pw/4;steps.forEach((q,j)=>{const on=j===ph,xx=L.px+j*sw;s+=`<rect x="${f1(xx+1)}" y="${L.py}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(j===3?'var(--rx)':'var(--brand)'):'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.py+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${j===3?'treatment':'step '+(j+1)}</text>`});
    s+=`<circle cx="${f1(L.px+L.pw*t)}" cy="${L.py+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<rect x="${L.dx-6}" y="${L.dy-4}" width="${f1(280*L.ds+12)}" height="${f1(270*L.ds+8)}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<g transform="translate(${L.dx} ${L.dy}) scale(${L.ds})">${osDetail(ty,t,t*30)}</g>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Type <b>${Ty.name}</b></span><span>Failing part <b>${{pump:'pump (heart)',tank:'tank (blood volume)',block:'blockage',pipes:'pipes (vessels)'}[Ty.fail[0]]}</b></span><span>Step <b>${ph+1} of 4</b></span>`;
    note.innerHTML=noteHTML(S);setSt(ph)}
  const stop=playWire(rg,$('#osPlay'),draw,28000,'Replay','othershock');
  setSt=stepWire($('#osSteps'),steps,rg,draw,stop);
  function setType(k){stop();ty=k;OS_TYPES[k].steps.forEach((q,i)=>Object.assign(steps[i],q));
    $$('#osSteps [data-st] span').forEach((sp,i)=>{sp.textContent=steps[i].t});
    $$('[data-os]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.os===k));rg.value=.1;draw(.1)}
  $$('[data-os]').forEach(b=>b.addEventListener('click',()=>setType(b.dataset.os)));
  draw(+rg.value);

  /* ---------- SCAI stages (Jentzer 2019) ---------- */
  const sc=$('#osScai'),SC=[['A','at risk',46.0,3.0],['B','beginning',30.0,7.1],['C','classic',15.7,12.4],['D','deteriorating',7.3,40.4],['E','extremis',1.0,67.0]];
  function drawScai(){const N=vb(sc,'720 220','400 300');let s='';
    const x0=N?40:80,cw=N?70:120,base=N?240:170,hm=N?170:120;
    s+=`<text x="${x0-30}" y="16" class="t-xs">unadjusted hospital mortality, %</text>`;
    SC.forEach((r,i)=>{const x=x0+i*cw,h=hm*r[3]/70,bw=cw*.56;
      s+=`<rect x="${f1(x)}" y="${f1(base-h)}" width="${f1(bw)}" height="${f1(h)}" rx="4" style="fill:var(--bad);opacity:${f1(.3+i*.15)}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${f1(base-h-6)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${r[3].toFixed(1)}%</text>`;
      s+=`<text x="${f1(x+bw/2)}" y="${base+16}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${r[0]}</text><text x="${f1(x+bw/2)}" y="${base+29}" class="t-xs t-mid">${N?r[1].slice(0,9):r[1]}</text><text x="${f1(x+bw/2)}" y="${base+42}" class="t-xs t-mid">${r[2].toFixed(1)}% of pts</text>`});
    s+=`<line x1="${x0-8}" x2="${f1(x0+5*cw-cw*.3)}" y1="${base}" y2="${base}" class="axis"/>`;
    sc.innerHTML=s}
  drawScai();

  /* ---------- trial icon arrays ---------- */
  const ic=$('#osIco'),icCap=$('#osIcoCap');let icK='shock',icStop=null;
  function drawIco(p){const N=vb(ic,'720 290','400 670'),D=OS_ICO[icK],sz=N?20:14,gp=N?5:4;
    const A=N?{ax:70,ay:56,bx:70,by:384}:{ax:70,ay:64,bx:420,by:64};let s='';
    [[D.a,A.ax,A.ay,'var(--rx)'],[D.b,A.bx,A.by,'var(--muted)']].forEach(([arm,x,y,c])=>{const k=Math.round(arm[1]*p);
      s+=`<text x="${x}" y="${y-30}" class="t-sm" style="fill:var(--ink);font-weight:700">${arm[0]}</text><text x="${x}" y="${y-14}" class="t-xs">${k} in 100 ${D.ev}</text>`;
      s+=icons(x,y,{n:100,cols:10,k,size:sz,gap:gp,col:'var(--bad)',base:c==='var(--rx)'?'var(--rx-soft)':'var(--panel-2)'}).svg});
    ic.innerHTML=s}
  function setIco(k){if(icStop)icStop();icK=k;$$('[data-ot]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ot===k));icCap.innerHTML=OS_ICO[k].cap;
    icStop=animate(700,p=>drawIco(ease(p)),()=>{icStop=null})}
  $$('[data-ot]').forEach(b=>b.addEventListener('click',()=>setIco(b.dataset.ot)));
  icCap.innerHTML=OS_ICO.shock.cap;drawIco(1);
  redraws.othershock=(()=>{const prev=redraws.othershock;return()=>{prev&&prev();drawScai();drawIco(1)}})();
};
