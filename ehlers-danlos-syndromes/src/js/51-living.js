/* =============== 5.1 Living with EDS =============== */
inits.living=()=>{
  const svg=$('#liSvg'),rg=$('#liT');
  let ty='h';
  const SB=[0,.2,.4,.6,.8,1.0001];
  const AGE=['Age 8','Age 15','Age 30','Age 36','Any age'];
  const STAGE=['School','PE & sport','Work','Family','Support'];

  /* ---------- small glyphs (r ≈ 11), all from theme tokens ---------- */
  function G(g,x,y){const X=v=>f1(x+v),Y=v=>f1(y+v),st='style="fill:none;stroke:var(--accent);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"',fl='style="fill:var(--accent)"';
    switch(g){
    case 'pen':return `<path d="M${X(-7)} ${Y(7)}L${X(5)} ${Y(-5)}" style="stroke:var(--accent);stroke-width:5;stroke-linecap:round"/><path d="M${X(-7)} ${Y(7)}L${X(-9)} ${Y(9)}" ${st}/>`;
    case 'hand':return `<path d="M${X(-8)} ${Y(6)}Q${X(-4)} ${Y(-8)} ${X(0)} ${Y(2)}T${X(8)} ${Y(-3)}" ${st}/><path d="M${X(-9)} ${Y(9)}H${X(9)}" ${st}/>`;
    case 'school':return `<path d="M${X(-9)} ${Y(9)}V${Y(-1)}L${X(0)} ${Y(-8)}L${X(9)} ${Y(-1)}V${Y(9)}Z" ${st}/><rect x="${X(-2.5)}" y="${Y(3)}" width="5" height="6" ${fl}/>`;
    case 'clock':return `<circle cx="${X(0)}" cy="${Y(0)}" r="9" ${st}/><path d="M${X(0)} ${Y(-5)}V${Y(0)}L${X(4)} ${Y(3)}" ${st}/>`;
    case 'pad':return `<rect x="${X(-6)}" y="${Y(-9)}" width="12" height="18" rx="5" ${st}/><path d="M${X(-6)} ${Y(-2)}H${X(6)}M${X(-6)} ${Y(3)}H${X(6)}" ${st}/>`;
    case 'card':return `<rect x="${X(-10)}" y="${Y(-7)}" width="20" height="14" rx="2.5" ${st}/><path d="M${X(-1)} ${Y(-2)}V${Y(4)}M${X(-4)} ${Y(1)}H${X(2)}" style="stroke:var(--vas);stroke-width:2;stroke-linecap:round"/><path d="M${X(4)} ${Y(-2)}H${X(7)}M${X(4)} ${Y(2)}H${X(7)}" ${st}/>`;
    case 'ball':return `<circle cx="${X(0)}" cy="${Y(0)}" r="9" ${st}/><path d="M${X(-3)} ${Y(-2)}L${X(0)} ${Y(-4.5)}L${X(3)} ${Y(-2)}L${X(2)} ${Y(2)}H${X(-2)}Z" ${fl}/>`;
    case 'knee':return `<path d="M${X(-4)} ${Y(-10)}L${X(0)} ${Y(0)}L${X(-3)} ${Y(10)}" style="fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${X(0)}" cy="${Y(0)}" r="6" style="fill:none;stroke:var(--variant);stroke-width:1.6;stroke-dasharray:2 2"/>`;
    case 'run':return `<circle cx="${X(2)}" cy="${Y(-7)}" r="2.6" ${fl}/><path d="M${X(1)} ${Y(-3)}L${X(-1)} ${Y(3)}L${X(4)} ${Y(9)}M${X(-1)} ${Y(3)}L${X(-6)} ${Y(8)}M${X(-6)} ${Y(-1)}L${X(1)} ${Y(-3)}L${X(6)} ${Y(1)}" ${st}/>`;
    case 'yoga':return `<circle cx="${X(0)}" cy="${Y(-7)}" r="2.6" ${fl}/><path d="M${X(0)} ${Y(-3)}V${Y(4)}M${X(-8)} ${Y(-5)}L${X(0)} ${Y(-1)}L${X(8)} ${Y(-5)}M${X(-7)} ${Y(8)}Q${X(0)} ${Y(2)} ${X(7)} ${Y(8)}" ${st}/>`;
    case 'ban':return `<circle cx="${X(0)}" cy="${Y(0)}" r="9" style="fill:none;stroke:var(--vas);stroke-width:2"/><path d="M${X(-6.4)} ${Y(-6.4)}L${X(6.4)} ${Y(6.4)}" style="stroke:var(--vas);stroke-width:2"/>`;
    case 'swim':return `<path d="M${X(-9)} ${Y(4)}q2.25 -3 4.5 0t4.5 0t4.5 0t4.5 0M${X(-9)} ${Y(8)}q2.25 -3 4.5 0t4.5 0t4.5 0t4.5 0" ${st}/><circle cx="${X(3)}" cy="${Y(-5)}" r="2.6" ${fl}/><path d="M${X(-6)} ${Y(0)}L${X(1)} ${Y(-2)}" ${st}/>`;
    case 'scar':return `<path d="M${X(-9)} ${Y(0)}H${X(9)}" ${st}/><path d="M${X(-6)} ${Y(-4)}V${Y(4)}M${X(-2)} ${Y(-4)}V${Y(4)}M${X(2)} ${Y(-4)}V${Y(4)}M${X(6)} ${Y(-4)}V${Y(4)}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    case 'walk':return `<circle cx="${X(0)}" cy="${Y(-7)}" r="2.6" ${fl}/><path d="M${X(0)} ${Y(-3)}V${Y(3)}L${X(-4)} ${Y(9)}M${X(0)} ${Y(3)}L${X(4)} ${Y(9)}M${X(-5)} ${Y(1)}L${X(0)} ${Y(-2)}L${X(5)} ${Y(1)}" ${st}/>`;
    case 'heart':return `<path d="M${X(0)} ${Y(8)}C${X(-12)} ${Y(-1)} ${X(-5)} ${Y(-11)} ${X(0)} ${Y(-4)}C${X(5)} ${Y(-11)} ${X(12)} ${Y(-1)} ${X(0)} ${Y(8)}Z" ${st}/>`;
    case 'desk':return `<rect x="${X(-8)}" y="${Y(-8)}" width="16" height="10" rx="1.5" ${st}/><path d="M${X(0)} ${Y(2)}V${Y(6)}M${X(-10)} ${Y(8)}H${X(10)}" ${st}/>`;
    case 'scale':return `<path d="M${X(0)} ${Y(-8)}V${Y(8)}M${X(-8)} ${Y(-4)}H${X(8)}M${X(-8)} ${Y(-4)}L${X(-10)} ${Y(3)}H${X(-6)}ZM${X(8)} ${Y(-4)}L${X(6)} ${Y(3)}H${X(10)}Z" ${st}/>`;
    case 'bar':return `<path d="M${X(-9)} ${Y(9)}H${X(9)}" ${st}/><rect x="${X(-7)}" y="${Y(-1)}" width="4" height="10" ${fl}/><rect x="${X(-1)}" y="${Y(-8)}" width="4" height="17" ${fl}/><rect x="${X(5)}" y="${Y(3)}" width="4" height="6" ${fl}/>`;
    case 'ped':return `<rect x="${X(-10)}" y="${Y(-9)}" width="8" height="8" style="fill:var(--ink)"/><circle cx="${X(6)}" cy="${Y(-5)}" r="4" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><path d="M${X(-2)} ${Y(-5)}H${X(2)}M${X(0)} ${Y(-5)}V${Y(3)}" style="stroke:var(--ink);stroke-width:1.2"/><circle cx="${X(0)}" cy="${Y(7)}" r="3.5" style="fill:var(--variant)"/>`;
    case 'dna':return `<path d="M${X(-5)} ${Y(-9)}C${X(9)} ${Y(-3)} ${X(-9)} ${Y(3)} ${X(5)} ${Y(9)}M${X(5)} ${Y(-9)}C${X(-9)} ${Y(-3)} ${X(9)} ${Y(3)} ${X(-5)} ${Y(9)}" ${st}/>`;
    case 'baby':return `<circle cx="${X(0)}" cy="${Y(-3)}" r="5" ${st}/><path d="M${X(-7)} ${Y(9)}Q${X(0)} ${Y(1)} ${X(7)} ${Y(9)}" ${st}/>`;
    case 'note':return `<path d="M${X(-7)} ${Y(-9)}H${X(4)}L${X(8)} ${Y(-5)}V${Y(9)}H${X(-7)}Z" ${st}/><path d="M${X(-4)} ${Y(-2)}H${X(5)}M${X(-4)} ${Y(2)}H${X(5)}M${X(-4)} ${Y(6)}H${X(2)}" ${st}/>`;
    case 'family':return person(x-9,y-9,16,'var(--accent)')+person(x+1,y-5,12,'var(--accent)');
    case 'ear':return `<path d="M${X(-4)} ${Y(-8)}C${X(6)} ${Y(-12)} ${X(10)} ${Y(-2)} ${X(3)} ${Y(3)}Q${X(0)} ${Y(5)} ${X(1)} ${Y(9)}" ${st}/><path d="M${X(-1)} ${Y(-3)}Q${X(3)} ${Y(-5)} ${X(3)} ${Y(-1)}" ${st}/>`;
    case 'zebra':return zebra(x,y,10,{id:'lizb'+Math.round(x)+'_'+Math.round(y)});
    case 'laptop':return `<rect x="${X(-7)}" y="${Y(-7)}" width="14" height="10" rx="1.5" ${st}/><path d="M${X(-10)} ${Y(6)}H${X(10)}" style="stroke:var(--accent);stroke-width:2.4;stroke-linecap:round"/>`;
    }return ''}

  /* ---------- support chips per stage and type (labels shortened from the cited text in the note) ---------- */
  function chips(s){
    if(s===0)return [
      {g:'pen',a:'Wide-grip pens',b:'OT assistive devices'},
      {g:'hand',a:'Handwriting help',b:'71% find it hard to keep up'},
      {g:'school',a:'Physio + OT school visit',b:'mobility, PE, attendance'},
      ty==='c'?{g:'pad',a:'Pads: forehead, knees',b:'young children, fragile skin'}
      :ty==='v'?{g:'family',a:'Found by family testing',b:'55% of children diagnosed'}
      :{g:'clock',a:'Pain and fatigue',b:'73% and 68% affect daily life'}];
    if(s===1)return ty==='v'?[
      {g:'ban',a:'No collision sports',b:'or heavy, extreme lifting'},
      {g:'walk',a:'Regular gentle exercise',b:'for body and mind'},
      {g:'card',a:'Emergency card',b:'vEDS passport, MedicAlert'},
      {g:'heart',a:'Blood pressure normal',b:'consensus: treat high BP'}]
      :ty==='c'?[
      {g:'pad',a:'Shin pads, ski stockings',b:'during activities'},
      {g:'ban',a:'Avoid heavy joint strain',b:'sports that load joints'},
      {g:'swim',a:'Non-weight-bearing',b:'builds strength, control'},
      {g:'scar',a:'Skin splits easily',b:'knees, shins, forehead'}]
      :[
      {g:'ball',a:'Adapted PE',b:'high impact: subluxation risk'},
      {g:'knee',a:'Contact sport',b:'knee injury OR 4.69 (GJH)'},
      {g:'run',a:'Physio exercise advice',b:'linked to more exercise'},
      {g:'yoga',a:'Yoga not ruled out',b:'if no joint slips out'}];
    if(s===2)return [
      {g:'desk',a:'Ergonomic workstation',b:'OT: home and work'},
      {g:'clock',a:'Pacing',b:'energy conservation (OT)'},
      {g:'scale',a:'Demands match ability',b:'then work aids well-being'},
      ty==='v'?{g:'bar',a:'Stopped work: age 41',b:'median, Norway, LDS/vEDS'}:{g:'bar',a:'45.6% unemployed',b:'UK survey, hEDS/HSD'}];
    if(s===3)return [
      {g:'ped',a:'1 in 2 per child',b:'hEDS, cEDS, vEDS: dominant'},
      {g:'dna',a:'Genetic counselling',b:ty==='h'?'no prenatal test for hEDS':'prenatal/PGT: variant known'},
      {g:'baby',a:'Plan pregnancy early',b:'see module 5.2'},
      ty==='v'?{g:'family',a:'Test relatives',b:'for the familial COL3A1 variant'}:{g:'note',a:'Record infant bruising',b:'and its causes'}];
    return [
      {g:'heart',a:'Mental-health care',b:'alongside physiotherapy'},
      {g:'ear',a:'Being believed',b:'73% doubted their own pain'},
      {g:'zebra',a:'Peer support',b:'the zebra community'},
      {g:'laptop',a:'Online programmes',b:'pilots: early evidence'}];
  }

  /* ---------- notes ---------- */
  const N1={
    h:{txt:`In a meta-analysis of 18 studies, people with generalised joint hypermobility had a higher risk of knee injury in contact sport (combined OR 4.69, 95% CI 1.33–16.52) but not of ankle injury. [[Pacey2010]] For hEDS, GeneReviews says high-impact activity may increase the risk of acute subluxation or dislocation and of pain, and that yoga and chiropractic adjustment are "not contraindicated" if done in ways that avoid causing subluxations. [[Hakim2024GeneReviews]] In a UK survey of 946 people, those who had exercise advice from a physiotherapist were more likely to report high weekly exercise (OR 1.75). [[Simmonds2019]] More in <a href="#physio" data-go="physio">Exercise &amp; physiotherapy</a>.`,
       pt:`Moving is still good. The warnings in the sources are mainly about high-impact and contact sport, which can make joints slip out of place.`,
       hook:`Generalised joint hypermobility + contact sport: knee injury OR 4.69; ankle injury not increased. [[Pacey2010]]`},
    c:{txt:`For classical EDS, GeneReviews lists "sports with heavy joint strain" among things to avoid and says non-weight-bearing exercise promotes muscle strength and coordination. Older children can wear soccer pads or ski stockings with shin padding during activities. The skin splits after relatively minor trauma, especially over the knees, elbows, shins, forehead and chin. [[Malfait2024GeneReviews]]`,
       pt:`In classical EDS the skin tears and scars easily, so padding the shins and knees during sport protects it.`,
       hook:`cEDS: shin padding during activity; avoid sports with heavy joint strain; non-weight-bearing exercise. [[Malfait2024GeneReviews]]`},
    v:{txt:`For vascular EDS, GeneReviews lists trauma to avoid, including collision sports, heavy lifting and weight training with extreme lifting. [[Byers2025GeneReviews]] The UK national service advises that "regular, low-intensity exercise should be maintained for health and psychological wellbeing". [[Bowen2023vEDS]] The Orphanet review calls intense physical activity, scuba diving and violent sports inadvisable. [[Germain2007]] No trial has defined a safe exercise dose; advice rests on consensus and expert opinion. [[Byers2017,Germain2007]] <span class="ev early">Early evidence</span> A co-designed 12-week remote exercise programme for vEDS is registered, not yet recruiting. [[NCT07697573]]`,
       pt:`People with vascular EDS should avoid collision sports and heavy lifting, but regular gentle exercise is good for the body and mind.`,
       hook:`vEDS: no collision sports, heavy lifting or extreme weight training; keep up regular low-intensity exercise. [[Byers2025GeneReviews,Bowen2023vEDS]]`}};
  function steps(){return [
    {from:SB[0],at:.1,k:'Stage 1 · age 8',t:'Childhood: school',
     txt:`Among 100 parents of children aged 8–18 at a connective-tissue clinic (48% hEDS or joint hypermobility syndrome), pain (73%) and fatigue (68%) were the symptoms most often said to affect daily life. Parents were satisfied with school participation in only 33%; the commonest difficulties were keeping up with handwriting (71%) and gross motor activities (70%). [[Wesley2021]] GeneReviews lists occupational therapy for assistive devices such as wide-grip writing utensils. [[Hakim2024GeneReviews]] In the Bendy Study a physiotherapist and an occupational therapist visited each child's school together to talk through mobility, handwriting, PE and attendance. [[Bale2019]] `+
       (ty==='c'?`For classical EDS, young children with fragile skin can wear pads or bandages over the forehead, knees and shins. [[Malfait2024GeneReviews]]`
       :ty==='v'?`For vascular EDS, 55% of 63 London children diagnosed before 18 were found through family genetic testing; 13 children had 18 events, the first at a median age of 11. [[Wilkinson2025]]`
       :`The paediatric framework defines generalised joint hypermobility in children as a Beighton score of at least 6/9, and reserves hEDS for biologically mature adolescents. [[Tofts2023]]`),
     pt:`Children with EDS may need help with handwriting and PE at school. A school plan can help. [[Wesley2021,Hakim2024GeneReviews]]`,
     hook:`Children: generalised hypermobility = Beighton ≥6/9; hEDS is diagnosed only after biological maturity. [[Tofts2023]]`},
    Object.assign({from:SB[1],at:.3,k:'Stage 2 · age 15',t:'Teenage years: PE and sport'},N1[ty]),
    {from:SB[2],at:.5,k:'Stage 3 · age 30',t:'Adulthood: work',
     txt:(ty==='v'?`In a Norwegian survey of 50 adults with Loeys-Dietz syndrome or vEDS, 66% received disability benefits and the median age at stopping work was 41; those still working were less fatigued and slept better. [[Johansen2022vEDS]] `
       :`In a UK national survey of 2,002 people with hEDS or HSD, 45.6% reported unemployment, 47.9% dependence on benefits and 55.9% disrupted education. [[Berg2026]] `)+
       `Interviews with people with hEDS found that work pressure, tasks and transport shape participation, and that work had positive effects on well-being when job demands matched ability. [[DeBaets2021]] GeneReviews lists occupational therapy for home and work ergonomics. [[Hakim2024GeneReviews]] Occupational-therapy guidance for EDS with POTS covers energy conservation, pacing and adaptive equipment; <span class="ev hyp">Hypothesis</span> pacing is recommended by patients and clinicians but has not been tested on its own in a trial. [[Levine2022OT,Bennett2022]]`,
     pt:`Work went better when the job's demands matched what the person could do. Pacing and an adapted workstation are the tools the sources describe.`,
     hook:`In hypermobility-related disorders, disability correlated with fatigue (r = .91) and distress (r = .86) more than with pain (r = .64). [[Scheper2016]]`},
    {from:SB[3],at:.7,k:'Stage 4 · age 36',t:'Parenthood and family',
     txt:`vEDS, cEDS and hEDS are autosomal dominant: each child of an affected parent has a 50% chance of inheriting the condition. [[Byers2025GeneReviews,Malfait2024GeneReviews,Hakim2024GeneReviews]] `+
       (ty==='h'?`Most people with hEDS have an affected parent, though the parent's signs may be subtle. Prenatal and preimplantation testing are not possible for hEDS because no causal gene is known. [[Hakim2024GeneReviews]] `
       :ty==='c'?`About half of people with cEDS have an affected parent and about half have a new (de novo) variant. Once the familial variant is known, prenatal and preimplantation testing are possible. [[Malfait2024GeneReviews]] `
       :`About half of people with vEDS have a new (de novo) variant. Evaluating first-degree relatives is appropriate and, even without signs, proceeds to testing for the known familial COL3A1 variant. Prenatal and preimplantation testing are possible once it is known. [[Byers2025GeneReviews]] `)+
       `Perinatal guidance recommends documenting early bruising in infants, and its causes, "to avoid false accusations of maltreatment". [[Pezaro2024]] See <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; parenthood</a> and <a href="#genes" data-go="genes">Inheritance &amp; genetic testing</a>.`,
     pt:`Most EDS types pass from parent to child. Each child has a 1 in 2 chance. [[Byers2025GeneReviews,Hakim2024GeneReviews]]`,
     hook:`Prenatal and preimplantation testing: possible for vEDS and cEDS once the familial variant is known, not for hEDS. [[Byers2025GeneReviews,Hakim2024GeneReviews]]`},
    {from:SB[4],at:.9,k:'Stage 5 · any age',t:'Mind, belief and community',
     txt:`<span class="ev est">Established</span> In a Swedish cohort, EDS was associated with depression (RR 3.4), ADHD (RR 5.6) and autism (RR 7.4); the cause is unknown. [[Cederlof2016]] A Consortium review describes a strong association with anxiety and recommends integrated psychological care alongside physiotherapy. [[Bulbena2017]] In a study across Europe and North America, 73% questioned the reality of their own pain after repeated dismissal; the authors recommend clinicians practise "epistemic humility". [[Halverson2025]] Members of EDS support groups mapped 448 social connections and discussed EDS daily. [[Callen2025]] <span class="ev early">Early evidence</span> Online mindfulness and pain-management pilots were feasible. [[Lattimore2023,Chew2025H]]`,
     pt:`If doctors have doubted you, it is common to start doubting yourself. Your pain is real. Meeting other "zebras" helps many people feel less alone. [[Halverson2025,Callen2025,Bennett2021]]`,
     hook:`Psychiatric distress in EDS tracks pain (OR 9.68), not hypermobility itself. [[Hershenfeld2016]]`}
  ]}
  let STEPS=steps();

  /* ---------- scene ---------- */
  function scene(s,u,ox,oy,W,H,N){
    let g='';const fl=oy+H-26,ap=ease(ramp(u,0,.25));
    g+=`<rect x="${ox}" y="${oy}" width="${W}" height="${H}" rx="12" style="fill:var(--panel-2)"/>`;
    g+=`<line x1="${ox+12}" x2="${ox+W-12}" y1="${fl}" y2="${fl}" style="stroke:var(--line);stroke-width:2"/>`;
    g+=`<text x="${ox+14}" y="${oy+22}" class="t-sm">${AGE[s].toUpperCase()} · ${STAGE[s].toUpperCase()}</text>`;
    const px=ox+W*(N?.3:.28);
    const sz=[78,100,112,112,104][s];
    if(s===0){/* school building, desk, paper, pen writing */
      const bx=ox+W-(N?120:150);g+=`<g style="opacity:${f1(.5+ap*.5)}"><path d="M${bx} ${fl}V${fl-110}L${bx+55} ${fl-150}L${bx+110} ${fl-110}V${fl}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><rect x="${bx+44}" y="${fl-48}" width="22" height="48" style="fill:var(--brand-soft);stroke:var(--muted)"/><rect x="${bx+16}" y="${fl-96}" width="20" height="18" style="fill:var(--brand-soft)"/><rect x="${bx+74}" y="${fl-96}" width="20" height="18" style="fill:var(--brand-soft)"/><path d="M${bx+55} ${fl-150}V${fl-176}" style="stroke:var(--muted);stroke-width:1.4"/><path d="M${bx+55} ${fl-176}l16 5l-16 5z" style="fill:var(--accent)"/></g>`;
      const dx=px+30;g+=`<rect x="${dx}" y="${fl-44}" width="${N?84:110}" height="6" rx="2" style="fill:var(--bone-line)"/><path d="M${dx+8} ${fl-38}V${fl}M${dx+(N?76:102)} ${fl-38}V${fl}" style="stroke:var(--bone-line);stroke-width:3"/>`;
      g+=`<rect x="${dx+14}" y="${fl-52}" width="50" height="8" style="fill:var(--panel);stroke:var(--line)"/>`;
      const wl=ramp(u,.15,.9);let d=`M${f1(dx+18)} ${f1(fl-48)}`;const n=Math.round(wl*14);for(let i=1;i<=n;i++)d+=`L${f1(dx+18+i*3)} ${f1(fl-48+(i%2?-2.5:1.5))}`;
      if(n)g+=`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.1"/>`;
      g+=`<path d="M${f1(dx+20+n*3)} ${f1(fl-50)}l10 -14" style="stroke:var(--accent);stroke-width:5;stroke-linecap:round"/>`;
    }
    if(s===1){/* field, goal, ball, type-specific sign */
      g+=`<rect x="${ox+12}" y="${fl}" width="${W-24}" height="10" style="fill:var(--accent-soft)"/>`;
      const gx=ox+W-(N?70:90);g+=`<path d="M${gx} ${fl}V${fl-70}H${gx+50}V${fl}" style="fill:none;stroke:var(--muted);stroke-width:3"/>`;
      for(let i=1;i<5;i++)g+=`<line x1="${gx}" x2="${gx+50}" y1="${fl-i*14}" y2="${fl-i*14}" style="stroke:var(--line)"/>`;
      const bxx=lerp(px+50,gx-20,ease(ramp(u,.1,.7))),byy=fl-12-Math.sin(Math.PI*ramp(u,.1,.7))*60;
      g+=G('ball',bxx,byy);
      if(ty==='v'){const sx=ox+W*(N?.62:.56),sy=oy+150;g+=`<g style="opacity:${f1(ap)}"><circle cx="${sx}" cy="${sy}" r="30" style="fill:var(--panel);stroke:var(--vas);stroke-width:3"/>${person(sx-17,sy-14,26,'var(--muted)')}${person(sx+3,sy-14,26,'var(--muted)')}<path d="M${sx-21} ${sy-21}L${sx+21} ${sy+21}" style="stroke:var(--vas);stroke-width:3"/><text x="${sx}" y="${sy+46}" class="t-xs t-mid" style="fill:var(--vas)">no collision sport</text></g>`}
      if(ty==='c'){[0,1].forEach(k=>{g+=`<rect x="${f1(px+sz*(k?.04:-.22))}" y="${f1(fl-sz*.36)}" width="${f1(sz*.17)}" height="${f1(sz*.3)}" rx="3" style="fill:var(--accent);opacity:${f1(.85*ap)}"/>`});
        g+=`<text x="${f1(px+sz*.4)}" y="${f1(fl-sz*.2)}" class="t-xs" style="opacity:${f1(ap)}">shin pads</text>`}
      if(ty==='h'){g+=`<circle cx="${f1(px)}" cy="${f1(fl-sz*.22)}" r="${f1(sz*.2)}" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3;opacity:${f1(ap)}"/><text x="${f1(px+sz*.26)}" y="${f1(fl-sz*.36)}" class="t-xs" style="opacity:${f1(ap)}">knee: contact sport</text>`}
    }
    if(s===2){/* desk, monitor, chair with lumbar support, clock (pacing) */
      const dx=px+34,dw=N?120:150;
      g+=`<rect x="${dx}" y="${fl-60}" width="${dw}" height="7" rx="2" style="fill:var(--bone-line)"/><path d="M${dx+8} ${fl-53}V${fl}M${dx+dw-8} ${fl-53}V${fl}" style="stroke:var(--bone-line);stroke-width:3"/>`;
      g+=`<rect x="${dx+dw*.35}" y="${fl-120}" width="${dw*.5}" height="${dw*.33}" rx="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><path d="M${dx+dw*.6} ${fl-120+dw*.33}V${fl-60}" style="stroke:var(--ink);stroke-width:2"/>`;
      g+=`<path d="M${f1(dx+dw*.4)} ${f1(fl-120+dw*.24)}l8 -8l8 5l10 -12l10 6" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(ap)}"/>`;
      g+=`<text x="${f1(dx+dw*.6)}" y="${fl-128}" class="t-xs t-mid" style="opacity:${f1(ap)}">screen at eye level</text>`;
      const cx=ox+W-(N?40:50),cy=oy+62,an=u*Math.PI*4;
      g+=`<circle cx="${cx}" cy="${cy}" r="22" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><path d="M${cx} ${cy}L${f1(cx+Math.sin(an)*16)} ${f1(cy-Math.cos(an)*16)}M${cx} ${cy}L${f1(cx+Math.sin(an/12)*10)} ${f1(cy-Math.cos(an/12)*10)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`;
      g+=`<path d="M${cx} ${cy}L${cx} ${cy-22}A22 22 0 0 1 ${f1(cx+22*Math.sin(Math.PI*.6))} ${f1(cy-22*Math.cos(Math.PI*.6))}Z" style="fill:var(--accent);opacity:.25"/><text x="${cx}" y="${cy+36}" class="t-xs t-mid">pacing</text>`;
      g+=`<path d="M${f1(px-sz*.32)} ${fl-58}Q${f1(px-sz*.42)} ${fl-34} ${f1(px-sz*.3)} ${fl-12}" style="fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;opacity:${f1(ap)}"/>`;
    }
    if(s===3){/* parent and child, mini pedigree */
      const cx=px+sz*.55;g+=person(cx,fl-sz*.52,sz*.52,'var(--brand)',{op:.85});
      g+=`<path d="M${f1(px+sz*.22)} ${f1(fl-sz*.42)}Q${f1(px+sz*.42)} ${f1(fl-sz*.3)} ${f1(cx-sz*.1)} ${f1(fl-sz*.3)}" style="fill:none;stroke:var(--brand);stroke-width:3;stroke-linecap:round"/>`;
      const qx=ox+W-(N?110:150),qy=oy+60;
      g+=`<g style="opacity:${f1(ap)}">${ped(qx,qy,'m',1,{r:10})}${ped(qx+60,qy,'f',0,{r:10})}<path d="M${qx+10} ${qy}H${qx+50}M${qx+30} ${qy}V${qy+24}M${qx+6} ${qy+24}H${qx+54}M${qx+6} ${qy+24}V${qy+36}M${qx+54} ${qy+24}V${qy+36}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
      const fl2=ramp(u,.3,.8);g+=`${ped(qx+6,qy+46,'f',fl2>.5?1:0,{r:10})}${ped(qx+54,qy+46,'m',0,{r:10})}<text x="${qx+30}" y="${qy+80}" class="t-sm t-mid" style="fill:var(--ink)">each child: 50%</text></g>`;
    }
    if(s===4){/* zebra hub and a peer network */
      const zx=ox+W*(N?.66:.62),zy=oy+H*.48,R=N?78:92,k=8;
      const on=ramp(u,.1,.85);
      for(let i=0;i<k;i++){const a=-Math.PI/2+i*2*Math.PI/k,qx=zx+Math.cos(a)*R,qy=zy+Math.sin(a)*R*.8;const vis=on*k>i;
        const a2=-Math.PI/2+((i+3)%k)*2*Math.PI/k;
        if(vis){g+=`<line x1="${f1(qx)}" y1="${f1(qy)}" x2="${zx}" y2="${zy}" style="stroke:var(--line);stroke-width:1.2"/>`;
          if(on*k>i+1)g+=`<line x1="${f1(qx)}" y1="${f1(qy)}" x2="${f1(zx+Math.cos(a2)*R)}" y2="${f1(zy+Math.sin(a2)*R*.8)}" style="stroke:var(--accent);stroke-width:1;opacity:.5"/>`;
          g+=person(qx-7,qy-10,20,'var(--muted)')}}
      g+=zebra(zx,zy,N?30:36,{id:'liZb'});
      g+=`<text x="${zx}" y="${f1(zy+R*.8+28)}" class="t-xs t-mid">peer support network</text>`;
    }
    /* headline statistic for the stage, counting up */
    const ST=[{n:71,f:v=>Math.round(v)+'%',l:['of parents: handwriting','hard to keep up']},
      ty==='v'?{w:'No collision sport',l:['regular gentle exercise','is still advised']}:ty==='c'?{w:'Pad the shins',l:['skin splits over knees,','shins and forehead']}:{n:4.69,f:v=>'OR '+v.toFixed(2),l:['knee injury, contact sport','(generalised hypermobility)']},
      ty==='v'?{n:41,f:v=>Math.round(v)+' y',l:['median age stopping work','(Norway, LDS or vEDS)']}:{n:45.6,f:v=>v.toFixed(1)+'%',l:['unemployed in a UK survey','of hEDS/HSD (n = 2,002)']},
      {w:'1 in 2',l:['chance for each child','in the dominant types']},
      {n:73,f:v=>Math.round(v)+'%',l:['questioned the reality','of their own pain']}][s];
    const cu=ease(ramp(u,.05,.45)),hx=ox+16,hy=oy+(N?60:66);
    g+=`<text x="${hx}" y="${hy}" class="t-big" style="font-size:${ST.w?(N?20:24):(N?28:34)}px;fill:var(--accent);opacity:${f1(.3+cu*.7)}">${ST.w||ST.f(ST.n*cu)}</text>`;
    ST.l.forEach((l,i)=>g+=`<text x="${hx}" y="${hy+18+i*14}" class="t-xs" style="opacity:${f1(cu)}">${l}</text>`);
    /* the person, growing between stages */
    g+=person(px-sz*.26,fl-sz,sz,'var(--brand)');
    return g}

  function chip(c,x,y,w,h,vis){const sc=ease(clamp(vis*1.6));if(vis<=0)return '';
    return `<g style="opacity:${f1(clamp(vis*2))}" transform="translate(${f1(x+w/2)} ${f1(y+h/2)}) scale(${f1(.85+.15*sc)}) translate(${f1(-x-w/2)} ${f1(-y-h/2)})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${x+24}" cy="${y+h/2}" r="16" style="fill:var(--accent-soft)"/>${G(c.g,x+24,y+h/2)}<text x="${x+48}" y="${y+h/2-3}" class="t-lbl" style="font-size:12.5px">${c.a}</text><text x="${x+48}" y="${y+h/2+12}" class="t-xs">${c.b}</text></g>`}

  let setSt;
  function draw(t){const N=vb(svg,'720 380','400 560');const W=N?400:720;let s='';
    const st=Math.min(4,Math.floor(t/.2)),u=ramp(t,SB[st],SB[st+1]);
    /* life strip */
    const x0=N?20:24,x1=W-(N?20:24),sy=N?22:24,segw=(x1-x0)/5;
    for(let i=0;i<5;i++){const a=x0+i*segw;s+=`<rect x="${f1(a+2)}" y="${sy-8}" width="${f1(segw-4)}" height="16" rx="8" style="fill:${i===st?'var(--brand)':i<st?'var(--brand-soft)':'var(--panel-2)'}"/>`;
      s+=`<text x="${f1(a+segw/2)}" y="${sy+4}" class="t-xs t-mid" style="fill:${i===st?'var(--on-brand)':'var(--muted)'}">${N?STAGE[i].replace('PE & sport','PE'):STAGE[i]}</text>`}
    s+=`<circle cx="${f1(x0+t*(x1-x0))}" cy="${sy+13}" r="3.5" style="fill:var(--accent)"/>`;
    const C=chips(st);
    if(N){s+=scene(st,u,12,44,376,288,true);C.forEach((c,j)=>{s+=chip(c,12,344+j*53,376,47,ramp(u,.08+j*.13,.2+j*.13))})}
    else{s+=scene(st,u,20,44,438,322,false);
      s+=`<text x="478" y="62" class="t-sm">SUPPORTS IN THE SOURCES</text>`;
      C.forEach((c,j)=>{s+=chip(c,474,72+j*73,226,62,ramp(u,.08+j*.13,.2+j*.13))})}
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#liNote').innerHTML=noteHTML(STEPS[p]);setSt&&setSt(p);
  }
  const stop=playWire(rg,$('#liPlay'),draw,26000,'%t:player.replay%','living');
  function wire(){const old=$('#liSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-lity]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.lity;$$('[data-lity]').forEach(x=>x.setAttribute('aria-pressed',x===b));STEPS=steps();wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---------- diagnostic delay and lived experience ---------- */
  const ds=$('#liDelay');let view='delay',grow=1,stopG=null;
  const DELAY=[
    {l:'US registry, hEDS (Miami)',s:'4 y to first visit, ~10 y to diagnosis',v:10,seg:4,c:'[[Wang2024AJMG]]'},
    {l:'Global Registry, hEDS',s:'n = 505, mean',v:10.39,c:'[[Halverson2023]]'},
    {l:'UK survey, hEDS/HSD',s:'n = 2,002, mean 19.0–21.7',v:21.7,lo:19.0,c:'[[Berg2026]]'},
    {l:'International survey, hEDS',s:'n = 3,360, self-report',v:22.1,c:'[[Daylor2025]]'},
    {l:'International survey, HSD',s:'n = 546, self-report',v:17.5,c:'[[Daylor2025]]'},
    {l:'Children, London clinic',s:'onset 6.2 y, diagnosis 9.0 y',v:2.8,c:'[[Adib2005]]'}];
  const LIFE=[
    {l:'Rated diagnosis important',s:'US registry, hEDS',v:95.2,good:1},
    {l:'Diagnosis helped coping',s:'US registry, hEDS',v:81.9,good:1},
    {l:'Questioned own pain',s:'43 surveyed, EU + N America',v:73},
    {l:'Disrupted education',s:'UK, n = 2,002',v:55.9},
    {l:'Work or school affected',s:'n = 466, hypermobility type',v:53},
    {l:'Constant pain',s:'n = 466, hypermobility type',v:46},
    {l:'Unemployed',s:'UK, n = 2,002',v:45.6}];
  function drawD(){const rows=view==='delay'?DELAY:LIFE,n=rows.length;
    const N=vb(ds,`720 ${n*40+50}`,`400 ${n*62+50}`);const W=N?400:720;let s='';
    const lx=N?16:20,bx=N?16:300,bw=N?(W-32-56):(W-bx-90),mx=view==='delay'?25:100,X=v=>bx+bw*v/mx;
    const top=24,rh=N?62:40;
    (view==='delay'?[0,.2,.4,.6,.8,1]:[0,.25,.5,.75,1]).forEach(f=>{const xx=bx+bw*f;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top-6}" y2="${top+n*rh}" class="${f?'grid':'axis'}"/><text x="${f1(xx)}" y="${top+n*rh+16}" class="t-xs t-mid">${Math.round(mx*f)}${view==='delay'?'':'%'}</text>`});
    s+=`<text x="${W-16}" y="${top+n*rh+32}" class="t-xs t-end">${view==='delay'?'years to diagnosis':'% of respondents'}</text>`;
    rows.forEach((r,i)=>{const y=top+i*rh,by=N?y+30:y+8,bh=N?16:18,g=ease(clamp(grow*1.3-i*.06));
      s+=`<text x="${lx}" y="${N?y+14:y+17}" class="t-lbl" style="font-size:12.5px">${r.l}</text><text x="${lx}" y="${N?y+26:y+30}" class="t-xs">${r.s}</text>`;
      const col=view==='delay'?(r.l.startsWith('Children')?'var(--muted)':'var(--brand)'):(r.good?'var(--accent)':'var(--brand)');
      if(r.seg&&view==='delay'){s+=`<rect x="${bx}" y="${by}" width="${f1(bw*r.seg/mx*g)}" height="${bh}" rx="3" style="fill:var(--brand-soft);stroke:var(--brand)"/>`;
        s+=`<rect x="${f1(X(r.seg*g))}" y="${by}" width="${f1(bw*(r.v-r.seg)/mx*g)}" height="${bh}" rx="3" style="fill:${col}"/>`}
      else s+=`<rect x="${bx}" y="${by}" width="${f1(bw*r.v/mx*g)}" height="${bh}" rx="3" style="fill:${col}"/>`;
      if(r.lo&&g>.98)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${by-3}" y2="${by+bh+3}" style="stroke:var(--on-brand);stroke-width:2"/>`;
      s+=`<text x="${f1(bx+bw*r.v/mx*g+6)}" y="${by+bh-4}" class="t-sm" style="fill:var(--ink)">${(r.lo?r.lo.toFixed(1)+'–':'')+(view==='delay'?(r.v%1?r.v.toFixed(r.v===10.39?2:1):r.v)+' y':r.v+'%')}</text>`});
    ds.innerHTML=s;
    $('#liDelayCap').innerHTML=view==='delay'?`Means or medians as each study reports them; the light first segment is the 4-year median gap to a first medical evaluation in the Miami registry. Surveys recruit volunteers and differ in method, so the bars are not directly comparable. [[Wang2024AJMG,Halverson2023,Berg2026,Daylor2025,Adib2005]]`
      :`Percentages of each survey's respondents. Green bars show what people said a diagnosis gave them. [[Wang2024AJMG,Halverson2025,Berg2026,Murray2013]]`}
  function regrow(){if(stopG)stopG();grow=0;stopG=animate(900,p=>{grow=p;drawD()},()=>{stopG=null})}
  $$('[data-lid]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.lid;$$('[data-lid]').forEach(x=>x.setAttribute('aria-pressed',x===b));regrow()}));
  drawD();
  {const pr=redraws.living;redraws.living=()=>{pr&&pr();drawD()}}

  /* ---------- conversation planner ---------- */
  const CP={
    school:[
      {t:'Handwriting and fine motor tasks',s:'Parents of children at a connective-tissue clinic most often reported difficulty keeping up with handwriting (71%) and gross motor activities (70%). GeneReviews lists occupational therapy for assistive devices such as wide-grip writing utensils. [[Wesley2021,Hakim2024GeneReviews]]',tag:'Participation'},
      {t:'PE and sport by type',s:'hEDS: high-impact activity may raise the risk of subluxation or dislocation. cEDS: shin padding, and avoid sports with heavy joint strain. vEDS: avoid collision sports and heavy lifting, but keep up regular low-intensity exercise. [[Hakim2024GeneReviews,Malfait2024GeneReviews,Byers2025GeneReviews,Bowen2023vEDS]]',tag:'By type'},
      {t:'Pain, fatigue and attendance',s:'Pain (73%) and fatigue (68%) were the symptoms parents most often said affected daily activities. In a London clinic, 41% of children with joint hypermobility syndrome had missed significant school time. [[Wesley2021,Adib2005]]',tag:'Attendance'},
      {t:'A joint visit from the care team',s:'In the Bendy Study, a physiotherapist and an occupational therapist visited each child\'s school together to discuss mobility, handwriting, PE and attendance with teachers. [[Bale2019]]',tag:'Example'},
      {t:'Toilet access',s:'In 89 children with joint hypermobility syndrome, pain, fatigue and stress-incontinence symptoms together explained 75% of the variance in child-reported quality of life. [[Pacey2015]]',tag:'Quality of life'},
      {t:'Being believed',s:'An Australian general-practice review says diagnosis, ideally by adolescence, gives children and parents validation, and directs management toward the educational impact. [[Nicholson2022]]',tag:'Validation'}],
    work:[
      {t:'What shapes work participation',s:'Interviews with people with hEDS found that work pressure, tasks and transport to work shape participation, and that work helped well-being when job demands matched ability. [[DeBaets2021]]',tag:'Participation'},
      {t:'Workstation and equipment',s:'GeneReviews lists occupational therapy for home and work ergonomics and assistive devices in hEDS. [[Hakim2024GeneReviews]]',tag:'Ergonomics'},
      {t:'Pacing and energy',s:'Occupational-therapy guidance for EDS with POTS covers energy conservation, pacing, routines and adaptive equipment. It is a descriptive paper; pacing alone has not been tested in a trial. [[Levine2022OT,Bennett2022]]',tag:'Hypothesis'},
      {t:'Fatigue, not only pain',s:'In a meta-analysis of hypermobility-related disorders, disability correlated with fatigue (r = .91) and psychological distress (r = .86) more strongly than with pain (r = .64). [[Scheper2016]]',tag:'Evidence'},
      {t:'Heavy lifting (vascular EDS)',s:'GeneReviews lists heavy lifting and weight training with extreme lifting among the trauma to avoid in vEDS. [[Byers2025GeneReviews]]',tag:'vEDS'},
      {t:'Communication skills',s:'Patients and clinicians ranked occupational-therapy support "to maintain independence at work and home" among self-management priorities, with pacing, assertiveness and communication skills. [[Bennett2022]]',tag:'Priorities'}],
    clinic:[
      {t:'The whole story',s:'In the Global Registry survey, people with hEDS had received an average of 10.45 other diagnoses over a mean 10.39 years before diagnosis. [[Halverson2023]]',tag:'History'},
      {t:'Anxiety and mood',s:'A Consortium review describes a strong association between anxiety and hEDS and recommends integrated psychiatric and psychological care alongside physiotherapy. [[Bulbena2017]]',tag:'Mental health'},
      {t:'Numbing that wears off',s:'In a randomised crossover trial, fewer people with EDS were numb at 30 minutes after lidocaine (53% vs 80%). Anaesthesia guidance advises recording any history of failed local anaesthesia. [[Bourne2026RAPM,Wiesmann2014]]',tag:'Procedures'},
      {t:'Dizziness on standing',s:'POTS can usually be identified by recording heart rate and blood pressure lying down and during a 10-minute stand. See <a href="#autonomic" data-go="autonomic">POTS &amp; the autonomic link</a>. [[Vernino2021]]',tag:'Autonomic'},
      {t:'Emergency card (vascular EDS)',s:'GeneReviews advises carrying documentation of the diagnosis, such as a MedicAlert bracelet, an emergency letter or a vEDS "passport", and seeking immediate care for sudden, unexplained pain. [[Byers2025GeneReviews]]',tag:'vEDS'},
      {t:'Talking about uncertainty',s:'Clinicians may reinforce self-doubt without meaning to when they discuss diagnostic uncertainty; authors recommend "epistemic humility". In a US survey, the most wanted change was more hEDS/HSD knowledge among professionals. [[Halverson2025,Estrella2024]]',tag:'Communication'}]};
  function drawCp(k){$('#liCp').innerHTML=CP[k].map(c=>`<div class="card"><span class="tag ${c.tag==='vEDS'?'vas':c.tag==='Hypothesis'?'warn':'brand'}">${c.tag}</span><h4>${c.t}</h4><p>${c.s}</p></div>`).join('')}
  $$('[data-licp]').forEach(b=>b.addEventListener('click',()=>{$$('[data-licp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCp(b.dataset.licp)}));
  drawCp('school');
};
