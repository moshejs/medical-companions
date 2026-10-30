/* =============== 5.3 Nursing care =============== */
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  let ty='h';
  const ST=['Admission','Observations','Moving','Procedures','Deterioration','Discharge'];
  const n6=6;

  /* nursing points per station: [hEDS/HSD, vEDS] */
  const PTS=[
    [[{a:'Confirm the type',b:'precautions differ by type'},{a:'Ask about failed numbing',b:'record it before procedures'},{a:'Validate, then assess pain',b:'compassionate communication'},{a:'Ask about past dislocations',b:'common, even minimal trauma'}],
     [{a:'Ask for the emergency card',b:'vEDS passport, MedicAlert'},{a:'Confirm the type',b:'COL3A1: vascular precautions'},{a:'Ask about failed numbing',b:'record it before procedures'},{a:'Note usual blood pressure',b:'consensus: keep it normal'}]],
    [[{a:'Repeated cuff inflations',b:'can cause bruising, haematoma'},{a:'Lying and standing obs',b:'HR, BP over a 10-min stand'},{a:'Orthostatic intolerance',b:'74% vs 34% (small study)'},{a:'Record bruises found',b:'and their likely cause'}],
     [{a:'Repeated cuff inflations',b:'can cause bruising, haematoma'},{a:'Keep BP in normal range',b:'consensus target'},{a:'Avoid invasive BP lines',b:'in non-emergency surgery'},{a:'Thin, translucent skin',b:'bruises easily'}]],
    [[{a:'Position with care',b:'to avoid joint dislocation'},{a:'Pad pressure points',b:'less shear; protect the eyes'},{a:'Wedges, pillows, supports',b:'anticipate joint pain'},{a:'Jaw care with face masks',b:'the TMJ can dislocate'}],
     [{a:'Position with care',b:'to avoid joint dislocation'},{a:'Pad pressure points',b:'less shear; protect the eyes'},{a:'Gentle handling',b:'fragile vessels and skin'},{a:'Tourniquets in limb surgery',b:'severe bleeds reported'}]],
    [[{a:'Tape: easy-release or none',b:'adhesives can damage skin'},{a:'Numbing may wear off sooner',b:'53% vs 80% numb at 30 min'},{a:'Ultrasound for lines',b:'fewer repeated punctures'},{a:'Close wounds without tension',b:'longer-lasting sutures'}],
     [{a:'Tape: easy-release or none',b:'adhesives can damage skin'},{a:'Avoid arterial puncture',b:'and central lines if possible'},{a:'If a central line is needed',b:'ultrasound is "mandatory"'},{a:'Arteriography discouraged',b:'only for life-threatening bleed'}]],
    [[{a:'Dislocation or new pain',b:'assess; escalate per policy'},{a:'Validated pain tools',b:'children: parent proxy works'},{a:'Dizzy on standing?',b:'consider an active stand'},{a:'No EDS first-aid protocol',b:'none in validated sources'}],
     [{a:'Sudden unexplained pain',b:'treat as an emergency'},{a:'Escalate immediately',b:'per local policy'},{a:'Harm-avoidant care',b:'no elective scope or surgery'},{a:'Bowel perforation, young',b:'should prompt vEDS testing'}]],
    [[{a:'Numbing may fail',b:'tell the dentist or nurse'},{a:'Physical treatments',b:'must not cause subluxation'},{a:'Physio exercise advice',b:'linked to more exercise'},{a:'Mental-health support',b:'integrated care advised'}],
     [{a:'Carry the emergency card',b:'MedicAlert, vEDS passport'},{a:'Sudden pain: seek care now',b:'show the card'},{a:'No collision sport, lifting',b:'gentle exercise still good'},{a:'Vascular imaging',b:'"annual basis", if feasible'}]]];

  const NOTE=[
    [{k:'Station 1 · admission',t:'Admission: know the type',
      txt:`Surgical and anaesthetic risk differs by EDS type, so vEDS fragility precautions are not applied to every type by default; a 2026 Delphi panel gives type-specific advice and comprehensive airway assessment for all types. [[Amaral2026]] Anaesthesia guidance advises recording any history of failed local anaesthesia, for example during dental work. [[Wiesmann2014]] In hEDS, subluxations and dislocations are common and may occur spontaneously or with minimal trauma. [[Hakim2024GeneReviews]] Perinatal guidance calls for "compassionate communication validating hEDS/HSD experiences". [[Pezaro2024]]`,
      pt:`The first questions are which type of EDS, what has gone wrong in hospital before, and how the person usually manages.`,
      hook:`Precautions are type-specific: do not treat every EDS patient as vascular, and do not miss the one who is. [[Amaral2026]]`},
     {k:'Station 1 · admission',t:'Admission: the emergency card',
      txt:`GeneReviews says people with vEDS should carry documentation of the diagnosis, such as a MedicAlert® bracelet or necklace, an emergency contact letter or a vEDS "passport". [[Byers2025GeneReviews]] In the UK national service every patient receives an emergency information card to show any clinician. [[Bowen2023vEDS]] The consensus recommends confirming the COL3A1 variant before applying the diagnosis, and keeping blood pressure in the normal range. [[Byers2017]]`,
      pt:`People with vascular EDS often carry a card that explains their condition. Ask to see it.`,
      hook:`vEDS: carry a MedicAlert, emergency letter or vEDS "passport". [[Byers2025GeneReviews]]`}],
    [{k:'Station 2 · observations',t:'Observations: cuffs and standing',
      txt:`Repeated non-invasive blood-pressure cuff inflations can cause bruising and haematoma. [[Wiesmann2014]] POTS can usually be identified by recording heart rate and blood pressure while lying and during a 10-minute stand; see the chart below. [[Vernino2021]] In 39 women with EDS hypermobility type, orthostatic intolerance was more common than in controls (74% vs 34%), most often as postural tachycardia. [[DeWandele2014Mech]]`,
      pt:`Blood-pressure cuffs can bruise fragile skin when they pump up again and again.`,
      hook:`POTS heart-rate criterion: rise ≥30/min within 10 minutes standing (≥40 at 12–19), no sustained systolic fall ≥20 mmHg. [[Vernino2021]]`},
     {k:'Station 2 · observations',t:'Observations: blood pressure in vEDS',
      txt:`The consensus says to "maintain blood pressure in the normal range and treat hypertension aggressively". [[Byers2017]] Anaesthesia guidance recommends avoiding invasive blood-pressure monitoring in non-emergency surgery in vEDS, and notes that repeated cuff inflations can bruise. [[Wiesmann2014]] vEDS is marked by thin, translucent skin and easy bruising. [[Byers2025GeneReviews]]`,
      pt:`Keeping blood pressure normal is part of protecting the arteries in vascular EDS.`,
      hook:`vEDS: keep blood pressure in the normal range; treat hypertension aggressively. [[Byers2017]]`}],
    [{k:'Station 3 · moving and positioning',t:'Moving the patient',
      txt:`Anaesthesia guidance advises padding to reduce shear and pressure, and careful positioning and mobilisation to avoid joint dislocation; careless positioning risks brachial plexus injury and visual loss from pressure on the eye. Care is needed during mask ventilation to avoid dislocating the temporomandibular joint. [[Wiesmann2014]] Perinatal guidance advises positioning the head and neck, shoulders, back, hips, knees and ankles with wedges, balls, pillows and bed adaptations. [[Pezaro2024]] GeneReviews warns that physical treatments must avoid causing subluxations or dislocations. [[Hakim2024GeneReviews]]`,
      pt:`Joints can slip out with little force. Support the limbs, pad the pressure points and move slowly.`,
      hook:`Positioning in EDS: pad against shear, protect eyes and brachial plexus, mind the jaw with masks. [[Wiesmann2014]]`},
     {k:'Station 3 · moving and positioning',t:'Moving a patient with vEDS',
      txt:`The same positioning and padding advice applies. [[Wiesmann2014]] The authors also report anecdotal knowledge of severe and lethal complications from tourniquets in minor limb surgery in vEDS, including massive compartment bleeding and haemorrhagic shock. [[Wiesmann2014]] One case report describes intramuscular haematomas during passive hamstring stretching in a man with vEDS; there are no established vEDS rehabilitation guidelines. [[Izumi2025]] No validated source gives rules for tourniquets used for blood tests.`,
      pt:`In vascular EDS, squeezing and stretching can bleed into muscles. Handle gently and follow the team's plan.`,
      hook:`vEDS: tourniquet complications in limb surgery are reported anecdotally, including compartment bleeding. [[Wiesmann2014]]`}],
    [{k:'Station 4 · procedures and skin',t:'Cannulas, tape and numbing',
      txt:`Adhesive tapes and dressings should be easy to remove, or avoided, because of the risk of severe skin damage. Ultrasound may reduce repeated vascular punctures. [[Wiesmann2014]] In a randomised crossover trial (91 people with EDS, 44 healthy), subcutaneous lidocaine numbed both groups similarly at 5 minutes, but fewer people with EDS were numb at 15 minutes (60% vs 84%) and 30 minutes (53% vs 80%). [[Bourne2026RAPM]] Perinatal guidance recommends gentle handling of fragile tissues, longer-lasting absorbable sutures and tension-free interrupted closure. [[Pezaro2024]]`,
      pt:`Numbing injections may wear off sooner in EDS. Tell the nurse or dentist if you can still feel things. [[Bourne2026RAPM]]`,
      hook:`Lidocaine in EDS: same at 5 min, then 53% vs 80% numb at 30 min, suggesting a shorter effect. [[Bourne2026RAPM]]`},
     {k:'Station 4 · procedures and skin',t:'Lines and scans in vEDS',
      txt:`Anaesthesia guidance recommends avoiding central venous access and arterial puncture whenever possible in fragile-vessel subtypes; if a central line is needed, ultrasound guidance is "mandatory", including seeing the wire inside the vessel. Tapes should be easy to remove or avoided. [[Wiesmann2014]] GeneReviews advises that "arteriography should be discouraged and used only to identify life-threatening sources of bleeding prior to surgical intervention because of the risk of vascular injury". [[Byers2025GeneReviews]]`,
      pt:`In vascular EDS, needles into arteries and big veins are avoided unless they are truly needed.`,
      hook:`vEDS: arteriography only to find life-threatening bleeding before surgery. [[Byers2025GeneReviews]]`}],
    [{k:'Station 5 · deterioration',t:'New pain or a dislocation',
      txt:`Subluxations and dislocations are common in hEDS, and repeated injury can lead to degenerative joint and chronic soft-tissue disorders. [[Hakim2024GeneReviews]] Validated tools used in EDS research include the Multidimensional Pain Inventory and Sickness Impact Profile in adults, and the PedsQL 4.0 and Pediatric Pain Questionnaire in children, where parent and child reports correlated strongly (r = 0.6–0.84). [[Rombaut2011,Pacey2015]] The research behind this guide found no validated EDS-specific dislocation first-aid protocol: assess, and escalate according to local policy.`,
      pt:`If a joint slips out or new pain starts, the nurse assesses it and calls the right team, as in any patient.`,
      hook:`Child pain in hypermobility: parent report is a reasonable proxy (r = 0.6–0.84). [[Pacey2015]]`},
     {k:'Station 5 · deterioration',t:'Sudden pain in vEDS: an emergency',
      txt:`Arterial dissection or rupture, bowel perforation or organ rupture are the presenting signs in most adults with vEDS, and people are "instructed to seek immediate medical attention for sudden, unexplained pain". [[Byers2025GeneReviews]] The UK service notes that "fragile connective tissues make invasive procedures potentially dangerous, particularly in an emergency setting", and that spontaneous bowel perforation should prompt vEDS testing. [[Bowen2023vEDS]] A 2026 review calls emergency care "harm-avoidant": avoid catheter angiography, elective endoscopy and unnecessary surgery. [[Corrao2026]] Escalate immediately, per local policy.`,
      pt:`With vascular EDS, sudden, unexplained pain is an emergency: go to hospital and show your emergency card. [[Byers2025GeneReviews]]`,
      hook:`Spontaneous bowel perforation in a young person should prompt vEDS genetic testing. [[Bowen2023vEDS]]`}],
    [{k:'Station 6 · discharge teaching',t:'Teaching for home',
      txt:`GeneReviews says chiropractic adjustment and yoga are "not contraindicated" if done in ways that avoid causing subluxations. [[Hakim2024GeneReviews]] People who had exercise advice from a physiotherapist were more likely to report high weekly exercise (OR 1.75). [[Simmonds2019]] A Consortium review recommends integrated psychiatric and psychological care alongside physiotherapy. [[Bulbena2017]] In a dental survey, 88% of people with EDS recalled inadequate local anaesthesia, against 33% without EDS; this is a recall survey. [[Schubart2019LA]]`,
      pt:`Before going home: how to move safely, what to tell the dentist about numbing, and where to get support.`,
      hook:`Dental survey: 88% of people with EDS recalled inadequate local anaesthesia vs 33% without. [[Schubart2019LA]]`},
     {k:'Station 6 · discharge teaching',t:'Teaching for home with vEDS',
      txt:`Carry documentation of the diagnosis and seek immediate care for sudden, unexplained pain. Avoid collision sports, heavy lifting and weight training with extreme lifting. [[Byers2025GeneReviews]] The consensus recommends vascular surveillance with Doppler ultrasound, CTA or MRA "if feasible on an annual basis". [[Byers2017]] The UK service advises that "regular, low-intensity exercise should be maintained for health and psychological wellbeing". [[Bowen2023vEDS]] First-degree relatives can be offered testing for the familial variant. [[Byers2025GeneReviews]]`,
      pt:`People with vascular EDS should avoid collision sports and heavy lifting, but regular gentle exercise is good for the body and mind. [[Byers2025GeneReviews,Bowen2023vEDS]]`,
      hook:`vEDS teaching: emergency card, urgent care for sudden pain, no collision sport or heavy lifting. [[Byers2025GeneReviews]]`}]];
  const mk=()=>NOTE.map((n,i)=>Object.assign({from:i/n6,at:(i+.5)/n6},n[ty==='v'?1:0]));
  let STEPS=mk(),setSt;

  /* ---------- station icons ---------- */
  function ico(i,x,y,on){const c=on?'var(--on-brand)':'var(--muted)',st=`style="fill:none;stroke:${c};stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round"`;
    const P=(a,b)=>f1(x+a)+' '+f1(y+b);
    return [`<rect x="${x-5}" y="${y-7}" width="10" height="13" rx="1.5" ${st}/><path d="M${P(-2.5,-2)}H${P(2.5,-2).split(' ')[0]}M${P(-2.5,1.5)}H${P(2.5,1.5).split(' ')[0]}" ${st}/>`,
      `<path d="M${P(-7,0)}H${P(-3,0).split(' ')[0]}L${P(-1,-5)}L${P(1,5)}L${P(3,0)}H${P(7,0).split(' ')[0]}" ${st}/>`,
      `<path d="M${P(-7,5)}H${P(7,5).split(' ')[0]}M${P(-7,5)}V${P(-7,-3).split(' ')[1]}M${P(-4,1)}H${P(6,1).split(' ')[0]}" ${st}/><circle cx="${x-3}" cy="${y-2}" r="2" style="fill:${c}"/>`,
      `<path d="M${P(-6,6)}L${P(4,-4)}M${P(2,-6)}L${P(6,-2)}M${P(-6,6)}L${P(-8,8)}" ${st}/>`,
      `<path d="M${P(0,-7)}L${P(7,6)}H${P(-7,6).split(' ')[0]}Z" ${st}/><path d="M${P(0,-2)}V${P(0,2).split(' ')[1]}" ${st}/>`,
      `<path d="M${P(-6,7)}V${P(-6,-2).split(' ')[1]}L${P(0,-7)}L${P(6,-2)}V${P(6,7).split(' ')[1]}Z" ${st}/>`][i]}
  function pts(L,u,x,y,w,h,gap){let g='';L.forEach((c,j)=>{const v=ramp(u,.08+j*.13,.2+j*.13);if(v<=0)return;const yy=y+j*(h+gap);
    g+=`<g style="opacity:${f1(clamp(v*1.5))}"><rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="9" style="fill:var(--panel);stroke:var(--line)"/><circle cx="${x+18}" cy="${f1(yy+h/2)}" r="9" style="fill:${ty==='v'&&/emergency|Escalate|unexplained/i.test(c.a)?'var(--vas)':'var(--accent)'}"/><path d="M${x+14} ${f1(yy+h/2)}l3 3l5 -6" style="fill:none;stroke:var(--on-brand);stroke-width:1.8"/><text x="${x+34}" y="${f1(yy+h/2-3)}" class="t-lbl" style="font-size:12.5px">${c.a}</text><text x="${x+34}" y="${f1(yy+h/2+11)}" class="t-xs">${c.b}</text></g>`});return g}

  /* ---------- vignettes ---------- */
  function vig(i,u,x,y,w,h){let g=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel-2)"/>`;const cx=x+w/2,cy=y+h/2;
    if(i===0){/* clipboard, ticking */
      const items=ty==='v'?['Emergency card seen','Type: vascular (COL3A1)','Failed local anaesthesia?','Usual blood pressure']:['Type: hEDS / HSD','Failed local anaesthesia?','Past dislocations','Pain: usual supports'];
      const bx=x+w*.12,bw=w*.76,by=y+28,bh=h-44;
      g+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(cx-28)}" y="${by-8}" width="56" height="16" rx="4" style="fill:var(--bone-line)"/>`;
      g+=`<text x="${f1(bx+16)}" y="${by+30}" class="t-sm">ADMISSION CHECKS</text>`;
      items.forEach((it,j)=>{const yy=by+56+j*((bh-70)/4),d=ramp(u,.1+j*.18,.22+j*.18);
        g+=`<rect x="${f1(bx+16)}" y="${f1(yy-12)}" width="16" height="16" rx="3" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`;
        if(d>0)g+=`<path d="M${f1(bx+19)} ${f1(yy-4)}l4 4l${f1(7*d)} ${f1(-9*d)}" style="fill:none;stroke:${ty==='v'&&j===0?'var(--vas)':'var(--accent)'};stroke-width:2.4;stroke-linecap:round"/>`;
        g+=`<text x="${f1(bx+42)}" y="${f1(yy+1)}" class="t-lbl" style="font-size:13px">${it}</text>`})}
    if(i===1){/* arm with cuff: inflations bruise */
      const ax=x+w*.18,ay=cy+10,L=w*.34;const lb=limb(ax+L,ay,L,8,{len2:L*.9,w:26,arc:false});g+=lb.svg;
      const n=Math.min(6,Math.floor(u*7)),pr=(u*7)%1,inf=n<6?bump(pr,0,1):0;
      const cuffDraw=g;g='';
      for(let k=0;k<n;k++){const sd=k%2?1:-1,bxx=ax+L*.45+sd*(L*.3+(k>>1)*7),byy=ay+((k*7)%9)-4;g+=`<ellipse cx="${f1(bxx)}" cy="${f1(byy)}" rx="${f1(6+k*.8)}" ry="${f1(5+k*.3)}" style="fill:var(--nerve);opacity:${f1(.25+k*.08)}"/>`}
      g=cuffDraw+g;
      g+=`<rect x="${f1(ax+L*.2)}" y="${f1(ay-17-inf*4)}" width="${f1(L*.5)}" height="${f1(34+inf*8)}" rx="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.6;opacity:.9"/>`;
      g+=`<path d="M${f1(ax+L*.45)} ${f1(ay-17-inf*4)}Q${f1(ax+L*.6)} ${f1(y+30)} ${f1(x+w*.72)} ${f1(y+44)}" style="fill:none;stroke:var(--dx);stroke-width:1.6"/>`;
      const mx=x+w*.62,my=y+30,mw=w*.32;g+=`<rect x="${f1(mx)}" y="${my}" width="${f1(mw)}" height="70" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
      g+=pulse(mx+8,my+52,mw-16,18,{bpm:ty==='v'?72:96,secs:4,phase:u*8});
      g+=`<text x="${f1(mx+10)}" y="${my+20}" class="t-sm" style="fill:var(--ink)">INFLATIONS ${n}</text>`;
      g+=`<text x="${f1(cx)}" y="${y+h-16}" class="t-xs t-mid">${n?'each repeat inflation can add bruising':'cuff on the upper arm'}</text>`}
    if(i===2){/* joint slips under traction, then supported */
      const sl=bump(u,.08,.55)*.55,sup=ease(ramp(u,.5,.85));
      g+=joint(cx-w*.12,cy-14,h/250,{ang:sl*18,slip:sl,lax:.75,hl:sl>.2});
      if(sl>.08)g+=`<text x="${f1(cx-w*.12)}" y="${y+22}" class="t-xs t-mid" style="fill:var(--variant)">pulled or poorly positioned: the joint slips</text>`;
      const jx=cx-w*.12;[-1,1].forEach(sd=>{const px=jx+sd*(46+60*(1-sup));g+=`<rect x="${f1(px-(sd<0?34:0))}" y="${f1(cy-30)}" width="34" height="96" rx="15" style="fill:var(--gold-soft);stroke:var(--warn);stroke-width:1.3;opacity:${f1(sup)}"/>`});
      if(sup>.2)g+=`<text x="${f1(x+w*.82)}" y="${f1(cy)}" class="t-lbl t-mid" style="font-size:13px;opacity:${f1(sup)}">pillows, padding</text><text x="${f1(x+w*.82)}" y="${f1(cy+16)}" class="t-xs t-mid" style="opacity:${f1(sup)}">limb supported</text>`}
    if(i===3){/* tape peeling skin + lidocaine bars */
      const sw=w*.5,pl=bump(u,.05,.5),sk=skin(x+14,y+h*.42,sw,{h:h*.48,pull:pl*.8,max:h*.22,fibres:true});g+=sk.svg;
      const tx=x+14+sw/2;g+=`<rect x="${f1(tx-36)}" y="${f1(sk.top-9)}" width="72" height="10" rx="3" style="fill:var(--gold);opacity:.9" transform="rotate(${f1(-pl*28)} ${f1(tx+36)} ${f1(sk.top)})"/>`;
      g+=`<text x="${f1(x+14+sw/2)}" y="${y+38}" class="t-xs t-mid">${pl>.2?'tape lifts the top layer':'adhesive tape on fragile skin'}</text>`;
      const bx=x+w*.6,bw=w*.36,b0=y+h-28,bh=h-90,lu=ramp(u,.45,.95);
      g+=`<text x="${f1(bx)}" y="${y+38}" class="t-xs">NUMB AFTER LIDOCAINE</text>`;
      [[5,null,null],[15,60,84],[30,53,80]].forEach(([m,e,c],k)=>{const gx=bx+k*bw/3+4,vis=ramp(lu,k*.3,k*.3+.3),bwid=bw/3*.4;
        if(e==null){g+=`<text x="${f1(gx+bwid)}" y="${f1(b0-bh*.5)}" class="t-xs t-mid" style="opacity:${f1(vis)}">same</text>`}
        else{g+=`<rect x="${f1(gx)}" y="${f1(b0-bh*e/100*vis)}" width="${f1(bwid)}" height="${f1(bh*e/100*vis)}" style="fill:var(--variant)"/><rect x="${f1(gx+bwid+2)}" y="${f1(b0-bh*c/100*vis)}" width="${f1(bwid)}" height="${f1(bh*c/100*vis)}" style="fill:var(--muted)"/>`;
          if(vis>.9)g+=`<text x="${f1(gx+bwid/2)}" y="${f1(b0-bh*e/100-4)}" class="t-xs t-mid" style="fill:var(--variant)">${e}</text><text x="${f1(gx+bwid*1.5+2)}" y="${f1(b0-bh*c/100-4)}" class="t-xs t-mid">${c}</text>`}
        g+=`<text x="${f1(gx+bwid)}" y="${b0+13}" class="t-xs t-mid">${m} min</text>`});
      g+=`<line x1="${f1(bx)}" x2="${f1(bx+bw)}" y1="${b0}" y2="${b0}" class="axis"/><text x="${f1(bx)}" y="${y+50}" class="t-xs"><tspan style="fill:var(--variant)">■ EDS</tspan> ■ controls, %</text>`}
    if(i===4){if(ty==='v'){/* artery tear + alarm */
        const tr=ramp(u,.1,.55),rp=ramp(u,.5,.85);g+=artery(x+20,cy+10,w-40,{r:26,media:16,thin:true,flow:u*5,tear:tr,rupture:rp});
        const al=rp>0?(Math.sin(u*60)>0?1:.4):0;
        g+=`<text x="${f1(cx)}" y="${y+30}" class="t-lbl t-mid" style="fill:var(--vas);opacity:${f1(.4+tr*.6)}">sudden, unexplained pain</text>`;
        g+=`<g style="opacity:${f1(al)}"><circle cx="${f1(x+w-34)}" cy="${y+28}" r="14" style="fill:var(--vas)"/><text x="${f1(x+w-34)}" y="${y+33}" class="t-lbl t-mid" style="fill:#fff">!</text><text x="${f1(cx)}" y="${y+h-14}" class="t-sm t-mid" style="fill:var(--vas)">ESCALATE NOW · LOCAL POLICY</text></g>`}
      else{const sl=ease(ramp(u,.1,.5));g+=joint(x+w*.32,cy-14,h/250,{slip:sl,ang:sl*22,lax:.9,hl:true});
        const px=x+w*.64,pw=w*.3,lvl=Math.round(lerp(2,8,ramp(u,.1,.55))*(1-.4*ramp(u,.7,1)));
        g+=`<text x="${f1(px)}" y="${y+40}" class="t-xs">PAIN 0–10 (example)</text>`;for(let k=0;k<=10;k++){g+=`<rect x="${f1(px+k*pw/11)}" y="${y+50}" width="${f1(pw/11-2)}" height="18" rx="2" style="fill:${k<=lvl?(k>6?'var(--bad)':k>3?'var(--warn)':'var(--good)'):'var(--panel)'};stroke:var(--line)"/>`}
        g+=`<text x="${f1(px+pw/2)}" y="${y+92}" class="t-big t-mid" style="font-size:26px">${lvl}</text>`;
        g+=`<text x="${f1(px+pw/2)}" y="${y+h-40}" class="t-xs t-mid">assess · believe · escalate</text><text x="${f1(px+pw/2)}" y="${y+h-26}" class="t-xs t-mid">per local policy</text>`}}
    if(i===5){/* emergency card / teaching card */
      const fl=ease(ramp(u,.05,.4)),cw=w*.62,ch=h*.56,kx=cx-cw/2,ky=cy-ch/2-6;
      g+=`<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(.7+.3*fl)}) translate(${f1(-cx)} ${f1(-cy)})" style="opacity:${f1(.3+fl*.7)}"><rect x="${f1(kx)}" y="${f1(ky)}" width="${f1(cw)}" height="${f1(ch)}" rx="12" style="fill:var(--panel);stroke:${ty==='v'?'var(--vas)':'var(--accent)'};stroke-width:2.4"/>`;
      g+=zebra(kx+30,ky+30,16,{id:'nuZb'});
      g+=`<text x="${f1(kx+56)}" y="${f1(ky+26)}" class="t-lbl" style="font-size:13px">${ty==='v'?'VASCULAR EDS · EMERGENCY':'hEDS · MY CARE NOTES'}</text>`;
      const L=ty==='v'?['Sudden pain: urgent care','Show this card','Avoid arterial punctures','Team contact: on file']:['Numbing may wear off','Joints slip: handle gently','Tape: easy-release','Dizzy on standing'];
      L.forEach((l,j)=>{if(fl>.3+j*.15)g+=`<text x="${f1(kx+20)}" y="${f1(ky+62+j*((ch-74)/4))}" class="t-sm" style="fill:var(--ink)">• ${l}</text>`});
      g+=`</g><text x="${f1(cx)}" y="${y+h-12}" class="t-xs t-mid">illustrative card, not a real template</text>`}
    return g}

  function draw(t){const N=vb(svg,'720 380','400 600');const W=N?400:720;let s='';
    const st=Math.min(5,Math.floor(t*n6)),u=ramp(t,st/n6,(st+1)/n6);
    /* pathway */
    const x0=N?30:40,x1=W-(N?30:40),py=N?34:34,sx=i=>x0+i*(x1-x0)/5;
    s+=`<line x1="${x0}" x2="${x1}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${x0}" x2="${f1(lerp(x0,x1,clamp(t*1.2-.1)))}" y1="${py}" y2="${py}" style="stroke:var(--brand);stroke-width:4;stroke-linecap:round"/>`;
    for(let i=0;i<6;i++){const on=i===st,dn=i<st;s+=`<circle cx="${f1(sx(i))}" cy="${py}" r="13" style="fill:${on?(ty==='v'&&i===4?'var(--vas)':'var(--brand)'):dn?'var(--brand-soft)':'var(--panel-2)'};stroke:var(--line)"/>${ico(i,sx(i),py,on)}`;
      s+=`<text x="${f1(sx(i))}" y="${py+28}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${N?String(i+1):ST[i]}</text>`}
    const fx=lerp(sx(Math.max(0,st-1)),sx(st),ease(clamp(u*4)))+(st?0:0);s+=person(f1(fx-6),py-36,20,'var(--accent)');
    const P=PTS[st][ty==='v'?1:0];
    if(N){s+=`<text x="16" y="88" class="t-sm" style="fill:var(--ink)">${ST[st].toUpperCase()}</text>`;s+=vig(st,u,12,96,376,260);s+=pts(P,u,12,370,376,50,6)}
    else{s+=vig(st,u,20,74,420,292);s+=`<text x="458" y="90" class="t-sm">${ST[st].toUpperCase()} · NURSING POINTS</text>`;s+=pts(P,u,456,100,246,58,8)}
    svg.innerHTML=s;
    const p=phaseOf(STEPS,t);$('#nuNote').innerHTML=noteHTML(STEPS[p]);setSt&&setSt(p)}
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'%t:player.replay%','nursing');
  function wire(){const old=$('#nuSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS,rg,draw,stop)}
  $$('[data-nuty]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.nuty;$$('[data-nuty]').forEach(x=>x.setAttribute('aria-pressed',x===b));STEPS=mk();wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---------- active stand chart ---------- */
  const ss=$('#nuStand');
  const EX={pots:{a:'a',hr:[72,98,106,110],sb:[112,110,108,109]},oh:{a:'a',hr:[70,84,86,88],sb:[124,100,98,96]},none:{a:'t',hr:[68,84,88,90],sb:[110,108,110,109]}};
  const IDS=['nuHr0','nuHr2','nuHr5','nuHr10'],SIDS=['nuSb0','nuSb2','nuSb5','nuSb10'];
  let reveal=1,stopR=null;
  const num=id=>{const v=parseFloat($('#'+id).value);return isFinite(v)?v:0};
  function drawS(){const N=vb(ss,'520 300','400 340');const W=N?400:520,H=N?340:300;let s='';
    const hr=IDS.map(num),sb=SIDS.map(num),teen=$('#nuAge').value==='t',th=teen?40:30;
    const xs=[-3,2,5,10],x0=48,x1=W-36,y0=26,y1=H-44,X=m=>x0+(m+5)/15*(x1-x0);
    const lo=Math.min(40,...hr,...sb)-10,hi=Math.max(160,...hr.map(v=>v+th),...sb)+10,Y=v=>y1-(v-lo)/(hi-lo)*(y1-y0);
    s+=`<rect x="${x0}" y="${y0}" width="${f1(X(0)-x0)}" height="${y1-y0}" style="fill:var(--panel-2)"/><text x="${f1((x0+X(0))/2)}" y="${y0+14}" class="t-xs t-mid">lying</text><text x="${f1((X(0)+x1)/2)}" y="${y0+14}" class="t-xs t-mid">standing</text>`;
    for(let v=Math.ceil(lo/20)*20;v<=hi;v+=20)s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`;
    [-5,0,2,5,10].forEach(m=>s+=`<text x="${f1(X(m))}" y="${y1+16}" class="t-xs t-mid">${m}</text>`);s+=`<text x="${x1}" y="${y1+32}" class="t-xs t-end">minutes</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${x1}" y1="${f1(Y(hr[0]+th))}" y2="${f1(Y(hr[0]+th))}" style="stroke:var(--accent);stroke-dasharray:5 4;stroke-width:1.4"/><text x="${x1}" y="${f1(Y(hr[0]+th)-5)}" class="t-xs t-end" style="fill:var(--accent)">lying HR + ${th}</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${x1}" y1="${f1(Y(sb[0]-20))}" y2="${f1(Y(sb[0]-20))}" style="stroke:var(--vas);stroke-dasharray:5 4;stroke-width:1.4"/><text x="${x1}" y="${f1(Y(sb[0]-20)+13)}" class="t-xs t-end" style="fill:var(--vas)">lying SBP − 20</text>`;
    const k=Math.max(1,Math.ceil(reveal*4));
    [[hr,'var(--accent)','HR'],[sb,'var(--vas)','SBP']].forEach(([a,c,l])=>{let d='';for(let i=0;i<k;i++)d+=(i?'L':'M')+f1(X(xs[i]))+' '+f1(Y(a[i]));
      s+=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.4"/>`;for(let i=0;i<k;i++)s+=`<circle cx="${f1(X(xs[i]))}" cy="${f1(Y(a[i]))}" r="4.5" style="fill:var(--panel);stroke:${c};stroke-width:2"/>`;
      s+=`<text x="${f1(X(xs[0])-9)}" y="${f1(Y(a[0])+4)}" class="t-xs t-end" style="fill:${c}">${l}</text>`});
    ss.innerHTML=s;
    const rises=hr.slice(1).map(v=>v-hr[0]),falls=sb.slice(1).map(v=>sb[0]-v);
    const nR=rises.filter(v=>v>=th).length,nF=falls.filter(v=>v>=20).length,mx=Math.max(...rises),mf=Math.max(...falls);
    let cls,msg;
    if(nF>=2){cls='no';msg=`<b>Sustained systolic fall of ${mf} mmHg.</b> The POTS definition requires no sustained systolic drop of 20 mmHg or more, so these readings point away from the POTS heart-rate pattern and toward orthostatic hypotension, which needs its own medical assessment.`}
    else if(nR>=2){cls='maybe';msg=`<b>Heart rate rose by up to ${mx} beats/min</b> (threshold ${th}${teen?', ages 12–19':''}) in ${nR} of 3 standing readings, without a sustained systolic fall. This matches the heart-rate part of the definition only: POTS also needs orthostatic symptoms for at least 3 months and is a clinician's diagnosis.`}
    else{cls='yes';msg=`<b>Threshold not met on these readings.</b> Largest heart-rate rise ${mx} beats/min (threshold ${th}); largest systolic fall ${Math.max(0,mf)} mmHg. One set of readings does not rule anything in or out.`}
    $('#nuVerdict').innerHTML=`<div class="verdict ${cls}">${msg} [[Vernino2021]]</div><p class="stage-cap">Teaching simplification: "sustained" is read here as at least two of the three standing readings.</p>`}
  function setEx(k){const e=EX[k];$('#nuAge').value=e.a;IDS.forEach((id,i)=>$('#'+id).value=e.hr[i]);SIDS.forEach((id,i)=>$('#'+id).value=e.sb[i]);
    if(stopR)stopR();reveal=0;stopR=animate(1400,p=>{reveal=p;drawS()},()=>{stopR=null})}
  $$('[data-nuex]').forEach(b=>b.addEventListener('click',()=>{$$('[data-nuex]').forEach(x=>x.setAttribute('aria-pressed',x===b));setEx(b.dataset.nuex)}));
  $$('#nuCalc input,#nuCalc select').forEach(el=>el.addEventListener('input',()=>{$$('[data-nuex]').forEach(x=>x.setAttribute('aria-pressed','false'));reveal=1;drawS()}));
  $('#nuAge').addEventListener('change',drawS);
  drawS();
  {const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();drawS()}}

  /* ---------- flip cards ---------- */
  const FC=[
    {q:'Why ask about tape and dressings?',a:'Adhesive tapes and dressings should be easy to remove, or avoided, because of the risk of severe skin damage. [[Wiesmann2014]]'},
    {q:'What can repeated blood-pressure cuff inflations do?',a:'Repeated non-invasive cuff inflations can cause bruising and haematoma. [[Wiesmann2014]]'},
    {q:'How are wounds closed in classical EDS?',a:'Without tension, preferably in two layers; deep stitches applied generously; skin stitches left twice as long as usual; adjacent skin taped to stop the scar stretching. [[Malfait2024GeneReviews]]'},
    {q:'An infant with EDS has bruises. What should be recorded?',a:'Early bruising and its causes, "to avoid false accusations of maltreatment". EDS belongs on the bruising differential; as an explanation for infant fractures it remains speculative. [[Pezaro2024,Castori2015]]'},
    {q:'Does vitamin C help bruising in classical EDS?',a:'GeneReviews says ascorbic acid "may reduce bruising": an expert recommendation with low-level evidence. [[Malfait2024GeneReviews]]'},
    {q:'Thin, translucent skin with visible veins: which type?',a:'Vascular EDS: arterial, intestinal and uterine fragility, thin translucent skin, easy bruising and a characteristic face. [[Byers2025GeneReviews]]'},
    {q:'Which sutures does perinatal hEDS/HSD guidance prefer?',a:'Longer-lasting absorbable sutures, tension-free interrupted closure, gentle handling of fragile tissues, and additional adhesives where the skin is particularly fragile. [[Pezaro2024]]'},
    {q:'Where does classical EDS skin split most?',a:'After relatively minor trauma, especially over the knees, elbows, shins, forehead and chin. [[Malfait2024GeneReviews]]'}];
  $('#nuFc').innerHTML=FC.map((c,i)=>`<div class="fc-wrap"><button class="fc" aria-pressed="false" aria-label="Flip card ${i+1}: ${c.q.replace(/"/g,'')}"><div class="face front"><small>Card ${i+1} · tap to turn</small><p>${c.q}</p></div><div class="face back"><small>Answer</small><p>${c.a}</p></div></button></div>`).join('');
  $$('#nuFc .fc').forEach(b=>b.addEventListener('click',()=>{const f=!b.classList.contains('flip');b.classList.toggle('flip',f);b.setAttribute('aria-pressed',f)}));
};
