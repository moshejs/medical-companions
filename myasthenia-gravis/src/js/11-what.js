/* =============== 1.1 What myasthenia gravis is =============== */
/* first symptoms, Japanese nationwide survey 2015-2017 (Yoshikawa 2022): published shares */
const WHT_SYM={
 achr:{lab:'AChR-positive without thymoma, n = 738',eyes:['ptosis 74.9%','diplopia 47.4%'],bulb:['dysarthria 13.3%','dysphagia 12.1%','facial 3.4%','chewing 3.4%'],neck:['neck 5.8%'],arms:['limbs/trunk 13.6%'],legs:['proximal: stairs,','rising from chairs'],resp:['dyspnea 2.6%']},
 musk:{lab:'MuSK-positive, n = 34',eyes:['ptosis 44.1%'],bulb:['dysphagia 35.3%'],neck:['neck 17.6%'],arms:['limbs/trunk 29.4%'],legs:['proximal: stairs,','rising from chairs'],resp:['dyspnea 8.8%']}
};
const WHT_GRP={
 early:{n:'Early onset',sym:'achr',band:[0,50],bl:'Early onset: before age 50',
  txt:`<b>Early onset</b> means onset before 50 [[Dresser2021]]. Before 40, women outnumber men about 3:1 [[Dresser2021]] (7:3 in another review [[Juel2007]]). Thymic hyperplasia, seen in about 65% of MG overall [[Juel2007]], mainly affects women of childbearing age (9:1) [[Bubuioc2021]]. In people of European descent, early onset is linked to the HLA A1-B8-DR3 haplotype [[Dresser2021]]. In an Italian cohort, 24% of early-onset AChR patients reached complete stable remission [[Falso2026]].`},
 late:{n:'Late onset',sym:'achr',band:[50,90],bl:'Late onset: age 50 or later',
  txt:`<b>Late onset</b> means onset at 50 or later; a 2026 meta-analysis proposes splitting it at 65 [[Dresser2021,Liampas2026]]. After 50, men slightly predominate (3:2) [[Dresser2021]]. Very-late-onset MG (65 and over) has more AChR antibodies (OR 3.08) and less thymoma (OR 0.25) [[Liampas2026]]. Only 4% of very-late-onset Italian patients reached complete stable remission [[Falso2026]]. This is the group that is growing.`},
 thym:{n:'Thymoma',sym:'achr',band:[50,60],med:55,bl:'Thymoma: peak onset in the 50s, median 55 (Japan)',
  txt:`<b>Thymoma</b>, a tumour of the thymus, is found in 10-20% of people with MG [[Dresser2021]]; a review of 49 studies pooled 21%, higher in men and with onset after 40 [[Mao2012]]. Thymoma peaks with onset in the 50s [[Murai2011]], and median onset was 55 in a Japanese cohort [[Yoshikawa2022]]. AChR antibody sensitivity is nearly 100% [[Yoganathan2022]]. The survey above has no first-symptom breakdown for thymoma, so the body map shows AChR-positive patients without thymoma.`},
 musk:{n:'MuSK',sym:'musk',band:null,med:49,bl:'MuSK: median onset 49 (Japan)',
  txt:`<b>MuSK MG</b> is 7-10% of MG, and up to 85% of patients are women [[Dresser2021]]. Over 40% present with bulbar weakness, often with neck and breathing involvement; diurnal variation is less common [[Dresser2021]]. Median onset was 49 in Japan [[Yoshikawa2022]]. MuSK antibodies were not found in adult ocular MG (0 of 63) [[Vincent2026]], and thymoma is seen in single cases only [[Rousseff2021]].`}
};
const WHT_STEPS=[
 {from:0,at:.06,k:'First signs · the eyes',t:'Drooping lids and double vision',
  txt:'Ocular weakness, with asymmetric ptosis (a drooping upper lid) and double vision that goes away when one eye is covered, is the most common first presentation [[Juel2007]]. About two-thirds of patients start with eye symptoms, and the lid or eye muscles are involved at some point in nearly all [[Estephan2022]]. In a Japanese national survey of AChR-positive patients without thymoma, ptosis was a first symptom in 74.9% and double vision in 47.4% [[Yoshikawa2022]].',
  pt:'For most people the first sign is a drooping eyelid or seeing double, often worse in the evening.',
  hook:'Fatigable, fluctuating weakness of skeletal muscle with <b>normal sensation and reflexes</b>; the eyes are the commonest first sign. [[Juel2007,MSDManual2026]]'},
 {from:.2,at:.3,k:'Spread',t:'Most spread happens within 2 years',
  txt:'Most patients with eye-only onset who go on to generalize do so within 2 years; of those still ocular at 2 years, 90% stay ocular [[Dresser2021]]. In a series of 108 ocular-onset patients, only 15% of generalizations came after more than 2 years [[Bever1983]]. How many generalize at all depends on the era: up to 80% in older reviews, 55% (18 of 33) in a modern US population study, at a median of 13 months [[Dresser2021,Hendricks2019]].',
  pt:'If weakness is going to spread beyond the eyes, it usually does so in the first two years.',
  hook:'Ocular MG is usually defined as eye-only weakness for <b>2 years or more</b>. [[Dresser2021]]'},
 {from:.42,at:.52,k:'Bulbar muscles',t:'Speech, chewing and swallowing',
  txt:'Bulbar weakness affects the muscles for speech (slurred or nasal voice), chewing and swallowing. It is the main first symptom in up to 15%, often with little eye involvement and more often in older people [[Estephan2022]]. Signs include a snarl-like smile, nasal speech and a weak tongue [[Juel2007,Estephan2022]]. In MuSK MG over 40% present this way [[Dresser2021]].',
  pt:'Talking, chewing or swallowing can tire: the voice turns nasal over a long conversation, or a meal gets harder to finish.',
  hook:'Bulbar onset is more common in <b>MuSK MG</b> and in older people. [[Dresser2021,Estephan2022]]'},
 {from:.62,at:.72,k:'Limbs and neck',t:'Proximal and fatigable',
  txt:'Limb weakness is usually symmetric and proximal: climbing stairs, rising from a chair, lifting the arms [[Dresser2021]]. About 10% develop head drop, linked in one centre to age over 60 and male sex [[Dresser2021]]. Limb or trunk weakness was a first symptom in 13.6% of AChR-positive patients without thymoma and in 29.4% of MuSK-positive patients [[Yoshikawa2022]]. Reflexes and sensation stay normal [[MSDManual2026]].',
  pt:'Arms and legs tire nearest the body: washing hair, climbing stairs, getting up from a low chair.',
  hook:'<b>Proximal, symmetric, fatigable</b>, with normal reflexes and sensation: the pattern that points to the junction rather than to nerve or muscle.'},
 {from:.84,at:.93,k:'Breathing',t:'The danger muscles',
  txt:'When the breathing muscles weaken enough to need ventilator support, this is myasthenic crisis. Lifetime risk is estimated at 15-20% of people with AChR MG [[Dresser2021,MSDManual2026]], about 20% and usually within the first year in another review [[Juel2007]]. In Japanese surveys the share with a history of crisis fell from 16.0% in 1973 to 6.9% in 2018 [[Yoshikawa2022]]. Trouble breathing or swallowing is an emergency: see <a href="#crisis" data-go="crisis">Myasthenic crisis</a>.',
  pt:'Weak breathing muscles are the most serious part of MG. Breathlessness, or choking on food or saliva, needs emergency care.',
  hook:'Infection was the commonest crisis trigger (38%) in one series of 73 crises. [[Thomas1997]]'}
];
/* the same phases when the toggle says ocular only */
const WHT_OC=[null,
 {k:'Stays ocular',t:'Eye muscles only',
  txt:'In ocular MG weakness stays in the lids and the muscles that move the eyes. Ocular muscles are the only ones ever affected in about 15% [[MSDManual2026]], and of those still eye-only after 2 years, 90% stay that way [[Dresser2021]]. In a US population study 51% (33 of 65) presented with purely ocular MG [[Hendricks2019]], and 36.8% of Japanese patients were in MGFA class I in 2018 [[Yoshikawa2022]]: one is a share at onset, the other a share on a survey date.',
  pt:'For some people MG never leaves the eyes.',
  hook:'Ocular MG = eye-only weakness for <b>2 years or more</b>. [[Dresser2021]]'},
 {k:'Who stays ocular',t:'Antibodies change the odds',
  txt:'By 5 years, 67% of AChR-positive ocular patients had generalized, against 11% of seronegative ones (HR 8.2). A positive single-fibre EMG predicted 77% conversion at 5 years, against 18% when it was negative [[Hendricks2019]]. At 2 years, 36% (13 of 36) of untreated ocular patients had generalized, against 7% (4 of 58) of those taking prednisone; abnormal AChR antibody levels raised the risk (OR 6.33) [[Kupersmith2003]].',
  pt:'A positive antibody test makes spread beyond the eyes more likely.',
  hook:'Over half of people with ocular MG have AChR antibodies. [[Dresser2021]]'},
 {k:'Children',t:'Childhood ocular MG generalizes less',
  txt:'Generalization occurs in 20-25% of juvenile patients, against up to 80% of adults [[Dresser2021]]. In Japan, 80.6% of infantile-onset patients (age 0-4) had the ocular form in 2006 [[Murai2011]], against 14-30% of children in Europe and North America [[Bubuioc2021]].',
  pt:'Children with eye-only MG, especially in East Asia, often stay eye-only.',
  hook:'Juvenile MG is about 10% of cases overall but up to 50% in Asian series, mostly ocular. [[Dresser2021]]'},
 {k:'Ocular MG',t:'Limbs and breathing spared',
  txt:'Ocular MG does not reach the bulbar, limb or breathing muscles. Because the limbs are spared, repetitive nerve stimulation of limb muscles is often normal: its sensitivity is about 90% in generalized MG but 0-25% in ocular MG [[Kouyoumdjian2023]]. Quality of life is better in ocular than in generalized MG [[McCallion2024]].',
  pt:'Eye-only MG is a nuisance and can stop someone driving or reading, but it does not affect breathing.',
  hook:'RNS sensitivity: about 90% generalized, <b>0-25% ocular</b>. [[Kouyoumdjian2023]]'}
];
/* schematic age-of-onset shapes (Dresser 2021 description; not measured values) */
const whtG=(a,m,s)=>Math.exp(-(((a-m)/s)**2)/2);
const whtFem=a=>.6*whtG(a,30,8)+.55*whtG(a,52,9)+.3*whtG(a,73,11);
const whtMal=a=>(.12*ramp(a,8,24)+.85/(1+Math.exp(-(a-50)/9)))*(1-.12*ramp(a,86,90));
const WHT_JP=[['1987',28.8],['2006',41.7],['2018',66.1]];
/* approximate text width of the small mono label, for clamping a centred label inside its panel */
const whtW=(s,px=5.8)=>s.length*px;

inits.what=()=>{
  const svg=$('#whtSvg'),rg=$('#whtT');let oc=false,grp='early';
  function body(L,w,set){
    const ox=L.bx,oy=L.by;let s=`<g transform="translate(${ox} ${oy})">`;
    const AB=o=>`stroke:var(--ab);opacity:${(+o).toFixed(2)}`;
    /* silhouette */
    s+=`<g style="stroke:var(--panel-2);stroke-linecap:round;stroke-linejoin:round;fill:none">
      <path d="M-50 98L-60 168L-66 234" style="stroke-width:16"/><path d="M50 98L60 168L66 234" style="stroke-width:16"/>
      <path d="M-20 238L-24 322L-26 396" style="stroke-width:22"/><path d="M20 238L24 322L26 396" style="stroke-width:22"/></g>`;
    s+=`<ellipse cx="-30" cy="402" rx="13" ry="6" style="fill:var(--panel-2)"/><ellipse cx="30" cy="402" rx="13" ry="6" style="fill:var(--panel-2)"/>`;
    s+=`<path d="M-52 94Q0 84 52 94L44 238Q0 246 -44 238Z" style="fill:var(--panel-2)"/><rect x="-12" y="66" width="24" height="32" style="fill:var(--panel-2)"/><circle cx="0" cy="40" r="34" style="fill:var(--panel-2)"/>`;
    /* faint organs */
    s+=`<g style="fill:none;stroke:var(--line);stroke-width:1.3;stroke-dasharray:3 3"><ellipse cx="-21" cy="132" rx="15" ry="26"/><ellipse cx="21" cy="132" rx="15" ry="26"/><path d="M-40 168Q0 144 40 168"/></g>`;
    /* weakness overlays */
    if(w.arm>0)s+=`<path d="M-50 98L-60 168M50 98L60 168" style="${AB(.15+.6*w.arm)};stroke-width:16;stroke-linecap:round;fill:none"/><path d="M-60 168L-66 234M60 168L66 234" style="${AB(.08+.25*w.arm)};stroke-width:16;stroke-linecap:round;fill:none"/>`;
    if(w.leg>0)s+=`<path d="M-20 238L-24 322M20 238L24 322" style="${AB(.15+.6*w.leg)};stroke-width:22;stroke-linecap:round;fill:none"/><path d="M-24 322L-26 396M24 322L26 396" style="${AB(.08+.25*w.leg)};stroke-width:22;stroke-linecap:round;fill:none"/>`;
    if(w.neck>0)s+=`<rect x="-12" y="66" width="24" height="32" style="fill:var(--ab);opacity:${f1(.12+.5*w.neck)}"/>`;
    if(w.resp>0)s+=`<g style="fill:var(--ab);opacity:${f1(.15+.55*w.resp)}"><ellipse cx="-21" cy="132" rx="15" ry="26"/><ellipse cx="21" cy="132" rx="15" ry="26"/></g><path d="M-40 168Q0 144 40 168" style="fill:none;${AB(.4+.6*w.resp)};stroke-width:3"/>`;
    if(w.bulb>0)s+=`<g style="fill:var(--ab);opacity:${f1(.2+.6*w.bulb)}"><ellipse cx="0" cy="60" rx="11" ry="5"/><ellipse cx="0" cy="84" rx="5" ry="12"/></g>`;
    if(w.eye>0)s+=`<ellipse cx="0" cy="38" rx="30" ry="12" style="fill:var(--ab);opacity:${f1(.22*w.eye)}"/>`;
    s+=`<path d="M-9 60Q0 ${f1(63-2*w.bulb)} 9 60" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-linecap:round"/>`;
    /* eyes: asymmetric ptosis */
    s+=eyelid(-13,38,17,.08+.55*w.eye)+eyelid(13,38,17,.08+.3*w.eye);
    /* labels with leaders */
    const LAB=[{r:'eye',sd:-1,y:24,n:'Eyes',k:'eyes',tip:[-24,37]},{r:'bulb',sd:-1,y:78,n:'Bulbar',k:'bulb',tip:[-9,62]},{r:'resp',sd:-1,y:150,n:'Breathing',k:'resp',tip:[-32,142]},
               {r:'neck',sd:1,y:74,n:'Neck',k:'neck',tip:[12,82]},{r:'arm',sd:1,y:142,n:'Arms',k:'arms',tip:[57,142]},{r:'leg',sd:1,y:278,n:'Legs',k:'legs',tip:[23,280]}];
    LAB.forEach(b=>{const on=w[b.r]>.02,dim=oc&&b.r!=='eye',o=dim?.35:on?1:.55,x=b.sd*74,an=b.sd<0?' t-end':'';
      s+=`<g style="opacity:${o}"><path d="M${b.sd*70} ${b.y-4}L${b.tip[0]} ${b.tip[1]}" style="fill:none;stroke:${on&&!dim?'var(--ab)':'var(--muted)'};stroke-width:1"/>`;
      s+=`<text x="${x}" y="${b.y}" class="t-lbl${an}" style="${on&&!dim?'fill:var(--ab)':''}">${b.n}</text>`;
      (set[b.k]||[]).forEach((l,i)=>{s+=`<text x="${x}" y="${b.y+13+i*12}" class="t-xs${an}">${l}</text>`});
      s+='</g>'});
    /* spread pill */
    if(t_>=.18&&(oc||t_<.45)){const o=ramp(t_,.18,.24);
      s+=`<g style="opacity:${f1(o)}"><text x="40" y="2" class="t-xs" style="fill:var(--ab);font-weight:600">${oc?'eye-only at 2 years:':'most who spread'}</text><text x="40" y="14" class="t-xs" style="fill:var(--ab);font-weight:600">${oc?'90% stay ocular':'do so within 2 years'}</text></g>`}
    if(oc&&t_>=.42)s+=`<text x="0" y="200" class="t-sm t-mid" style="opacity:${f1(ramp(t_,.42,.48))}">eye muscles only</text>`;
    s+='</g>';
    s+=`<text x="${L.capX}" y="${L.capY[0]}" class="t-xs t-mid">schematic body · labels: first symptom, Japan 2015-17</text><text x="${L.capX}" y="${L.capY[1]}" class="t-xs t-mid">${set.lab}</text>`;
    return s;
  }
  let t_=0;
  function draw(t){t_=t;
    const N=vb(svg,'720 464','400 916');
    const L=N
      ? {bx:200,by:22,capX:200,capY:[442,455],
         A:{x0:40,x1:380,tt:488,rat:508,yT:520,yB:640,tick:654,gl:672},
         B:{tt:708,sub:726,yT:746,yB:860,yr:874,cap:892, jx:[62,112,162],bw:28, ix:[250,350],ax:228,iRight:380}}
      : {bx:172,by:22,capX:172,capY:[440,453],
         A:{x0:384,x1:704,tt:26,rat:48,yT:60,yB:180,tick:194,gl:212},
         B:{tt:248,sub:266,yT:286,yB:400,yr:414,cap:432, jx:[410,458,506],bw:30, ix:[600,680],ax:572,iRight:704}};
    const G=WHT_GRP[grp],set=WHT_SYM[G.sym];
    /* weakness by region over t */
    const w=oc?{eye:ramp(t,0,.12),bulb:0,neck:0,arm:0,leg:0,resp:0}
      :{eye:ramp(t,0,.12),bulb:ramp(t,.42,.55),neck:ramp(t,.62,.7),arm:ramp(t,.64,.76),leg:ramp(t,.68,.8),resp:ramp(t,.84,.94)};
    let s=`<defs>${marker('whtAr','var(--ab)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=body(L,w,set);
    /* ---- panel A: age at onset by sex (schematic) ---- */
    const A=L.A,ax=a=>lerp(A.x0,A.x1,a/90),ay=v=>A.yB-v*(A.yB-A.yT)/1.05;
    if(!N)s+=`<path d="M360 16V448" class="axis"/>`;else s+=`<path d="M20 466H380" class="axis"/>`;
    s+=`<text x="${A.x0}" y="${A.tt}" class="t-lbl">Age at onset, by sex</text><text x="${A.x1}" y="${A.tt}" class="t-xs t-end" style="fill:var(--warn);font-weight:600">SCHEMATIC SHAPE</text>`;
    if(G.band){s+=`<rect x="${f1(ax(G.band[0]))}" y="${A.yT-4}" width="${f1(ax(G.band[1])-ax(G.band[0]))}" height="${A.yB-A.yT+4}" style="fill:var(--warn-soft);opacity:.7"/>`}
    [40,50].forEach(a=>s+=`<line x1="${f1(ax(a))}" x2="${f1(ax(a))}" y1="${A.rat+4}" y2="${A.yB}" class="grid"/>`);
    s+=`<text x="${f1(ax(20))}" y="${A.rat}" class="t-xs t-mid" style="fill:var(--ab)">women 3:1</text><text x="${f1(ax(45))}" y="${A.rat}" class="t-xs t-mid">even</text><text x="${f1(ax(70))}" y="${A.rat}" class="t-xs t-mid" style="fill:var(--nerve)">men 3:2</text>`;
    s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${A.yB}" y2="${A.yB}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    [0,20,40,60,80].forEach(a=>s+=`<text x="${f1(ax(a))}" y="${A.tick}" class="t-xs t-mid">${a}</text>`);
    s+=`<text x="${A.x1}" y="${A.tick}" class="t-xs t-end">age</text>`;
    const aCur=90*ramp(t,.02,.9);
    const cv=(fn,a1)=>{let d='';for(let a=0;a<=a1+.01;a+=1.5){d+=(d?'L':'M')+f1(ax(Math.min(a,a1)))+' '+f1(ay(fn(Math.min(a,a1))))}return d};
    [[whtFem,'var(--ab)'],[whtMal,'var(--nerve)']].forEach(([fn,c])=>{
      s+=`<path d="${cv(fn,90)}" style="fill:none;stroke:${c};stroke-width:1.5;stroke-dasharray:3 4;opacity:.35"/>`;
      if(aCur>1){const d=cv(fn,aCur);s+=`<path d="${d}L${f1(ax(aCur))} ${A.yB}L${A.x0} ${A.yB}Z" style="fill:${c};opacity:.12"/><path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round"/>`}});
    if(aCur>32)s+=`<text x="${f1(ax(30))}" y="${f1(ay(whtFem(30))-8)}" class="t-sm t-mid" style="fill:var(--ab);font-weight:600">women</text>`;
    if(aCur>80)s+=`<text x="${f1(ax(78))}" y="${f1(ay(whtMal(78))-8)}" class="t-sm t-mid" style="fill:var(--nerve);font-weight:600">men</text>`;
    if(aCur>1&&aCur<89.5)s+=`<line x1="${f1(ax(aCur))}" x2="${f1(ax(aCur))}" y1="${A.yT-2}" y2="${A.yB}" style="stroke:var(--ink);stroke-width:1;opacity:.4"/>`;
    if(G.med){s+=`<circle cx="${f1(ax(G.med))}" cy="${A.yB}" r="5" style="fill:var(--ink);stroke:var(--field);stroke-width:1.5"/>`}
    {const hw=whtW(G.bl)/2,cx0=G.band?ax((G.band[0]+G.band[1])/2):ax(G.med);
      s+=`<text x="${f1(clamp(cx0,A.x0+hw,A.x1-hw))}" y="${A.gl}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${G.bl}</text>`}
    /* ---- panel B: late onset rising (published) ---- */
    const B=L.B;
    s+=`<text x="${A.x0}" y="${B.tt}" class="t-lbl">Late onset is rising</text>`;
    s+=`<text x="${A.x0}" y="${B.sub}" class="t-xs">Japan · onset 50+ (%)</text><text x="${B.ax}" y="${B.sub}" class="t-xs">Italy · median onset age</text>`;
    const by=v=>B.yB-v/100*(B.yB-B.yT);
    s+=`<line x1="${A.x0}" x2="${B.jx[2]+B.bw/2+8}" y1="${B.yB}" y2="${B.yB}" class="axis"/>`;
    WHT_JP.forEach(([yr,v],k)=>{const g=ease(ramp(t,.1+.28*k,.18+.28*k)),x=B.jx[k];
      s+=`<rect x="${x-B.bw/2}" y="${f1(by(v*g))}" width="${B.bw}" height="${f1(B.yB-by(v*g))}" rx="3" style="fill:var(--ab);opacity:${g>0?.85:0}"/>`;
      if(g>.95)s+=`<text x="${x}" y="${f1(by(v)-5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${v}%</text>`;
      s+=`<text x="${x}" y="${B.yr}" class="t-xs t-mid">${yr}</text>`});
    s+=`<text x="${A.x0}" y="${B.cap}" class="t-xs">women:men 2.1 → 1.15</text><text x="${A.x0}" y="${B.cap+12}" class="t-xs">(1973 → 2018)</text>`;
    /* Italy median onset 35 → 65 */
    const iy=a=>B.yB-a/80*(B.yB-B.yT);
    s+=`<line x1="${B.ax}" x2="${B.ax}" y1="${B.yT}" y2="${B.yB}" class="axis"/><line x1="${B.ax}" x2="${B.iRight}" y1="${B.yB}" y2="${B.yB}" class="axis"/>`;
    [0,40,80].forEach(a=>s+=`<text x="${B.ax-4}" y="${f1(iy(a)+3)}" class="t-xs t-end">${a}</text>`);
    const o1=ramp(t,.28,.34),o2=ramp(t,.74,.8);
    if(o1>0)s+=`<g style="opacity:${f1(o1)}"><circle cx="${B.ix[0]}" cy="${f1(iy(35))}" r="6" style="fill:var(--nerve)"/><text x="${B.ix[0]}" y="${f1(iy(35)-11)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">35</text></g>`;
    if(o2>0)s+=`<g style="opacity:${f1(o2)}"><path d="M${B.ix[0]+9} ${f1(iy(37))}L${B.ix[1]-10} ${f1(iy(63))}" style="fill:none;stroke:var(--ab);stroke-width:1.6" marker-end="url(#whtAr)"/><circle cx="${B.ix[1]}" cy="${f1(iy(65))}" r="6" style="fill:var(--nerve)"/><text x="${B.ix[1]}" y="${f1(iy(65)-11)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">65</text></g>`;
    s+=`<text x="${B.ix[0]}" y="${B.yr}" class="t-xs t-mid">1970s</text><text x="${B.ix[1]}" y="${B.yr}" class="t-xs t-mid">2010-20</text><text x="${B.ax}" y="${B.cap}" class="t-xs">AChR MG, n = 1,023</text>`;
    svg.innerHTML=s;
    const p=phaseOf(WHT_STEPS,t);setSt(p);
    const P=oc&&p>0?WHT_OC[p]:WHT_STEPS[p];
    $('#whtNote').innerHTML=noteHTML(P);
  }
  function readout(){$('#whtRead').innerHTML=`<span>${WHT_GRP[grp].txt}</span>`}
  const stop=playWire(rg,$('#whtPlay'),draw,16000,'Replay','what');
  const setSt=stepWire($('#whtSteps'),WHT_STEPS,rg,draw,stop);
  $('#whtGen').onclick=()=>{oc=false;$('#whtGen').setAttribute('aria-pressed','true');$('#whtOc').setAttribute('aria-pressed','false');draw(+rg.value)};
  $('#whtOc').onclick=()=>{oc=true;$('#whtGen').setAttribute('aria-pressed','false');$('#whtOc').setAttribute('aria-pressed','true');draw(+rg.value)};
  $$('[data-whtg]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.whtg;$$('[data-whtg]').forEach(x=>x.setAttribute('aria-pressed',x===b));readout();draw(+rg.value)}));
  readout();draw(+rg.value);

  /* ---------- subtypes: 100 squares ---------- */
  const SUB={
   achr:{n:'AChR antibodies',big:'about 80%',c:'var(--ab)',
    txt:`AChR antibodies are found in about 80% of all people with MG [[Dresser2021,Pevzner2012]] and about 85% of generalized MG [[MSDManual2026]], but in only about half of ocular MG [[Rousseff2021]]. The first radioimmunoassay series (1976) found them in 87% of 71 patients and in none of 175 controls [[Lindstrom1976]]. How they damage the junction is animated in <a href="#antibodies" data-go="antibodies">Antibodies at the junction</a>.`},
   musk:{n:'MuSK antibodies',big:'7-10%',c:'var(--musk)',
    txt:`MuSK MG is 7-10% of all MG [[Dresser2021]] (5-10% in another review [[Pevzner2012]]). MuSK antibodies were discovered in 2001, in 70% of AChR-negative generalized MG [[Hoch2001]]. Later estimates of the MuSK share among AChR-negative patients disagree: over 40% [[Juel2007]], and 30.8% (143 of 465) in a 2026 series from 46 centres, where frequency peaked near 40 degrees North [[Vincent2026]]. Up to 85% of patients are women, and bulbar, neck and breathing weakness are prominent [[Dresser2021]].`},
   lrp4:{n:'LRP4 antibodies',big:'2-50%',sub:'of double-seronegative patients',c:'var(--warn)',
    txt:`LRP4 antibodies are reported in 2-50% of double-seronegative patients, depending on the series [[Dresser2021]]. In about 800 sera from 10 countries the figure was 18.7% (7-32.7% by population), and 81% of these patients had MGFA class I or II disease at onset [[Zisimopoulou2014]]. LRP4 MG skews female, tends to start before 50 and is milder; about 20% remain ocular-only at 2 years [[Dresser2021]]. LRP4 antibodies also occur in up to 23% of people with ALS, so a result is read in its clinical context [[Rousseff2021]].`},
   sero:{n:'Double seronegative',big:'6-10%',c:'var(--muted)',
    txt:`Double-seronegative MG, with neither AChR nor MuSK antibodies on standard tests, is about 6-10% of MG [[Yoganathan2022]]. Some of these people have antibodies that only a cell-based assay with clustered AChR finds: 38.1% of radioimmunoassay-negative MG in routine Oxford testing [[RodriguezCruz2015]]. The label needs care: at two Italian centres, 36% of people first diagnosed with double-seronegative MG later received another diagnosis [[Maccora2025]].`},
   thym:{n:'Thymoma',big:'10-20%',c:'var(--ink)',
    txt:`A thymoma is present in 10-20% of people with MG [[Dresser2021]]; a review of 49 studies pooled 21%, higher in surgical series, in men and with onset after 40 [[Mao2012]]. Nearly all have AChR antibodies [[Yoganathan2022]], while in MuSK MG thymoma is seen in single cases only [[Rousseff2021]]. In a Japanese cohort 26.4% of AChR-positive patients had a thymoma [[Yoshikawa2022]]. Thymic hyperplasia, a different change, is seen in about 65% [[Juel2007]]. See <a href="#thymectomy" data-go="thymectomy">Thymectomy over the years</a>.`}
  };
  let sub='achr';
  const kind=i=>i<80?'achr':i<88?'musk':i<90?'lrp4':'sero';
  function drawSub(){const sv=$('#whtSub');let s='';
    for(let i=0;i<100;i++){const r=Math.floor(i/10),q=i%10,x=20+q*30,y=16+r*30,k=kind(i);
      const hi=sub==='thym'?(i<20):(sub==='sero'?(k==='sero'||k==='lrp4'):k===sub);
      const o=hi?1:.28,col=SUB[k].c;
      s+=k==='lrp4'?`<rect x="${x+2}" y="${y+2}" width="22" height="22" rx="4" style="fill:var(--panel);stroke:${col};stroke-width:2.4;opacity:${o}"/>`
                   :`<rect x="${x}" y="${y}" width="26" height="26" rx="4" style="fill:${col};opacity:${f1(o*(k==='sero'?.55:.9))}"/>`;
      if(i<20)s+=`<rect x="${x-2}" y="${y-2}" width="30" height="30" rx="6" style="fill:none;stroke:var(--ink);stroke-width:${sub==='thym'?2.2:1.2};${i>=10?'stroke-dasharray:3 3;':''}opacity:${sub==='thym'?1:.55}"/>`}
    const lg=[['var(--ab)','AChR about 80'],['var(--musk)','MuSK about 8'],['var(--warn)','LRP4 about 2 (open: derived)'],['var(--muted)','double seronegative']];
    lg.forEach(([c,l],i)=>{const x=i%2?170:20,y=318+Math.floor(i/2)*16;s+=i===2?`<rect x="${x+1}" y="${y+1}" width="10" height="10" rx="2" style="fill:none;stroke:${c};stroke-width:2"/>`:`<rect x="${x}" y="${y}" width="12" height="12" rx="2" style="fill:${c};opacity:.85"/>`;s+=`<text x="${x+16}" y="${y+10}" class="t-xs">${l}</text>`});
    s+=`<rect x="20" y="352" width="12" height="12" rx="2" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="36" y="362" class="t-xs">thymoma: 10% (solid) to 20% (dashed outline)</text>`;
    sv.innerHTML=s;
    const S=SUB[sub];
    $('#whtSubNote').innerHTML=`<span class="kicker">Subtype</span><h4>${S.n}</h4><span class="wht-big" style="color:${S.c}">${S.big}</span>${S.sub?`<span class="kicker">${S.sub}</span>`:''}<p>${S.txt}</p>`;
  }
  $$('[data-whts]').forEach(b=>b.addEventListener('click',()=>{sub=b.dataset.whts;$$('[data-whts]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawSub()}));
  drawSub();

  /* ---------- prevalence / incidence disagreement ---------- */
  const EPI={
   prev:{t:'Prevalence, per million people',max:500,ticks:[0,100,200,300,400,500],ratio:'highest ÷ lowest point estimate ≈ 2.6 (derived)',lo:77.7,hi:200,
    rows:[{l:'Carr 2010',s:'55 studies, 1950-2007',pt:77.7,ci:[64,94.3],rng:[15,179]},
          {l:'Salari 2021',s:'63 studies (12.4 per 100,000)',pt:124,ci:[106,145]},
          {l:'Sciancalepore 2025',s:'94 studies: mean; ◆ median 129.6',pt:173.3,ci:[129.7,215.5],rng:[20,475],med:129.6},
          {l:'Dresser 2021',s:'review, quoted range',band:[150,200]},
          {l:'MedlinePlus',s:'about 20 per 100,000',pt:200}]},
   inc:{t:'Incidence, per million person-years',max:65,ticks:[0,10,20,30,40,50,60],ratio:'mean 15.7 ÷ pooled 5.3 ≈ 3 (derived)',lo:5.3,hi:15.7,
    rows:[{l:'Carr 2010',s:'55 studies, pooled',pt:5.3,ci:[4.4,6.1],rng:[1.7,21.3]},
          {l:'Sciancalepore 2025',s:'94 studies: mean; ◆ median 13.3',pt:15.7,ci:[11.5,19.9],rng:[2.3,61.3],med:13.3},
          {l:'Dresser 2021',s:'review, quoted range',band:[4.1,30]},
          {l:'Israel guideline 2025',s:'quoted range',band:[3,28]},
          {l:'Israel, AChR+ only',s:'7.7 (1994-2003) → 18.5 (2004-13)',pt:13.1,pair:[7.7,18.5]}]}
  };
  let em='prev';
  function drawEpi(){const sv=$('#whtEpi');const N=vb(sv,'720 310','400 450');const E=EPI[em];
    const x0=N?20:236,x1=N?380:700,r0=N?96:70,dr=N?68:44,axY=r0+dr*5-(N?24:14);
    const X=v=>lerp(x0,x1,v/E.max);let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="20" y="24" class="t-lbl">${E.t}</text><text x="20" y="${N?42:42}" class="t-xs" style="fill:var(--ab)">${E.ratio}</text>`;
    E.ticks.forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${r0-20}" y2="${axY}" class="grid"/><text x="${f1(X(v))}" y="${axY+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${axY}" y2="${axY}" class="axis"/>`;
    /* the spread between the extreme point estimates */
    s+=`<rect x="${f1(X(E.lo))}" y="${r0-20}" width="${f1(X(E.hi)-X(E.lo))}" height="${axY-r0+20}" style="fill:var(--ab-soft);opacity:.55"/>`;
    E.rows.forEach((R,i)=>{const y=r0+i*dr;
      if(N){s+=`<text x="${x0}" y="${y-18}" class="t-sm" style="fill:var(--ink);font-weight:600">${R.l}</text><text x="${x1}" y="${y-18}" class="t-xs t-end">${R.s}</text>`}
      else{s+=`<text x="20" y="${y-2}" class="t-sm" style="fill:var(--ink);font-weight:600">${R.l}</text><text x="20" y="${y+11}" class="t-xs">${R.s}</text>`}
      if(R.rng)s+=`<line x1="${f1(X(R.rng[0]))}" x2="${f1(X(R.rng[1]))}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:1.2"/><line x1="${f1(X(R.rng[0]))}" x2="${f1(X(R.rng[0]))}" y1="${y-4}" y2="${y+4}" style="stroke:var(--muted)"/><line x1="${f1(X(R.rng[1]))}" x2="${f1(X(R.rng[1]))}" y1="${y-4}" y2="${y+4}" style="stroke:var(--muted)"/>`;
      if(R.band)s+=`<rect x="${f1(X(R.band[0]))}" y="${y-6}" width="${f1(X(R.band[1])-X(R.band[0]))}" height="12" rx="6" style="fill:var(--nerve);opacity:.3"/><text x="${f1(X(R.band[1])+6)}" y="${y+4}" class="t-xs">${R.band[0]}-${R.band[1]}</text>`;
      if(R.ci)s+=`<rect x="${f1(X(R.ci[0]))}" y="${y-4}" width="${f1(X(R.ci[1])-X(R.ci[0]))}" height="8" rx="2" style="fill:var(--nerve);opacity:.55"/>`;
      if(R.med!=null)s+=`<path d="M${f1(X(R.med))} ${y-6}l6 6-6 6-6-6z" style="fill:var(--ink)"/>`;
      if(R.pair){const a=X(R.pair[0]),b=X(R.pair[1]);s+=`<circle cx="${f1(a)}" cy="${y}" r="3.5" style="fill:var(--muted)"/><circle cx="${f1(b)}" cy="${y}" r="3.5" style="fill:var(--muted)"/><line x1="${f1(a+4)}" x2="${f1(b-4)}" y1="${y+9}" y2="${y+9}" style="stroke:var(--muted);stroke-width:1"/>`}
      if(R.pt!=null)s+=`<circle cx="${f1(X(R.pt))}" cy="${y}" r="6" style="fill:var(--ab);stroke:var(--field);stroke-width:1.5"/><text x="${f1(X(R.pt))}" y="${N?y+19:y-10}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${R.pt}</text>`;
    });
    sv.innerHTML=s}
  const setEm=k=>{em=k;$('#whtPrev').setAttribute('aria-pressed',k==='prev');$('#whtInc').setAttribute('aria-pressed',k==='inc');drawEpi()};
  $('#whtPrev').onclick=()=>setEm('prev');$('#whtInc').onclick=()=>setEm('inc');
  drawEpi();
  {const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawEpi();drawCourse()}}

  $('#whtNum').innerHTML=`
   <div class="card"><span class="kicker">Worldwide</span><span class="wht-big">about 700,000</span><p>people, the global total quoted in the 2025 Israeli national guideline [[Shelly2025]]. MedlinePlus gives about 20 per 100,000 people [[MedlinePlusMG2026]].</p></div>
   <div class="card"><span class="kicker">United States, 2021</span><span class="wht-big">37.0</span><p>per 100,000 people: diagnosed prevalence in claims and health-record data, with incidence 3.1 per 100,000 per year; both higher than reports from the 1980s and early 2000s [[Rodrigues2024]]. In Olmsted County, Minnesota, mean age at diagnosis was 59 and 62% of patients were men [[Hendricks2019]].</p></div>
   <div class="card"><span class="kicker">Japan, nationwide surveys</span><span class="wht-big">1.35 → 23.1</span><p>per 100,000, from 1973 to 2018 (5.1 in 1987, 11.8 in 2006) [[Yoshikawa2022]].</p></div>
   <div class="card"><span class="kicker">Israel</span><span class="wht-big">7.7 → 18.5</span><p>new AChR-positive cases per million per year, 1994-2003 against 2004-2013, from all four national antibody laboratories; the rise was mostly in older men [[Lotan2020]]. Israel has no published population-based prevalence figure [[Shelly2025]].</p></div>
   <div class="card"><span class="kicker">Europe</span><span class="wht-big">13.8-36.1</span><p>per 100,000 in selected national studies: Norway 13.8 and the Netherlands 16.7 (2010-2012), Sweden 36.1 (2006-2016) [[Bubuioc2021]].</p></div>
   <div class="card"><span class="kicker">Children</span><span class="wht-big">about 10%</span><p>of MG starts before 18; in Asian series up to 50%, mostly ocular [[Dresser2021]]. In US claims data for 2020, juvenile incidence was 5.9 (commercial) and 8.7 (Medicaid) per million person-years [[Zhou2025]].</p></div>
   <div class="card"><span class="kicker">Why the numbers rise</span><p>Prevalence was about 1 in 200,000 before 1934, about 1 in 20,000 after the first effective drugs and about 1 in 17,000 after AChR antibodies were found [[Dresser2021,Bubuioc2021]]. Patient numbers have more than doubled in 20 years, mainly through rising incidence in older people; better diagnosis, treatment and survival are the likely reasons [[Bubuioc2021]]. Pooled frequency also rose with study year and quality, read as better case-finding [[Carr2010]].</p></div>`;

  /* ---------- course: conversion and mortality ---------- */
  const CONV=[{l:'Older reviews, adults',s:'up to 80%, within 2 years',v:80,c:'var(--ab)'},
              {l:'Older reviews',s:'nearly 85% within 3 years',v:85,c:'var(--ab)'},
              {l:'US population study',s:'55% (18/33), median 13 months',v:55,c:'var(--nerve)'},
              {l:'Untreated, at 2 years',s:'36% (13 of 36)',v:36,c:'var(--nerve)'},
              {l:'On prednisone, at 2 years',s:'7% (4 of 58)',v:7,c:'var(--drug)'},
              {l:'Children (juvenile MG)',s:'20-25%',v:[20,25],c:'var(--warn)'}];
  const MORT=[{y:1934,v:70,l:'1934: 70% of the few',l2:'diagnosed died in 2 years',dx:10,dy:4},
              {y:1962,v:40,l:'early 1960s: about 40%',dx:10,dy:4},
              {y:1975,v:5,l:'1970s: about 5%',dx:4,dy:-26},
              {y:2002.5,v:4.47},{y:2002.5,v:2.2}];
  function drawCourse(){const sv=$('#whtCourse');const N=vb(sv,'720 360','400 726');
    const P=N?{x0:20,x1:330,yt:24,r0:74,dr:42,ax:330, mx0:46,mx1:380,mt:404,my0:440,my1:672}
             :{x0:20,x1:330,yt:24,r0:74,dr:42,ax:330, mx0:412,mx1:704,mt:24,my0:60,my1:300};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const X=v=>lerp(P.x0,P.x1,v/100);
    s+=`<text x="${P.x0}" y="${P.yt}" class="t-lbl">Ocular onset → generalized</text><text x="${P.x0}" y="${P.yt+16}" class="t-xs">share of ocular-onset patients who generalize</text>`;
    [0,50,100].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${P.r0-22}" y2="${P.ax}" class="grid"/><text x="${f1(X(v))}" y="${P.ax+14}" class="t-xs t-mid">${v}%</text>`);
    CONV.forEach((c,i)=>{const y=P.r0+i*P.dr;
      s+=`<text x="${P.x0}" y="${y-6}" class="t-sm" style="fill:var(--ink);font-weight:600">${c.l}</text>`;
      if(Array.isArray(c.v))s+=`<rect x="${P.x0}" y="${y}" width="${f1(X(c.v[1])-P.x0)}" height="12" rx="3" style="fill:${c.c};opacity:.35"/><rect x="${P.x0}" y="${y}" width="${f1(X(c.v[0])-P.x0)}" height="12" rx="3" style="fill:${c.c};opacity:.85"/>`;
      else s+=`<rect x="${P.x0}" y="${y}" width="${f1(X(c.v)-P.x0)}" height="12" rx="3" style="fill:${c.c};opacity:.85"/>`;
      const end=Array.isArray(c.v)?c.v[1]:c.v,lx=X(end)+6,fits=lx+whtW(c.s,5.7)<(N?390:350);
      s+=`<text x="${f1(fits?lx:P.x1)}" y="${fits?y+10:y-6}" class="t-xs${fits?'':' t-end'}">${c.s}</text>`});
    /* mortality */
    const MX=y=>lerp(P.mx0,P.mx1,(y-1930)/80),MY=v=>lerp(P.my1,P.my0,v/80);
    s+=`<text x="${N?20:P.mx0-24}" y="${P.mt}" class="t-lbl">Deaths, then and now</text><text x="${N?20:P.mx0-24}" y="${P.mt+16}" class="t-xs">% of patients; each dot is a different measure</text>`;
    [0,20,40,60,80].forEach(v=>s+=`<line x1="${P.mx0}" x2="${P.mx1}" y1="${f1(MY(v))}" y2="${f1(MY(v))}" class="grid"/><text x="${P.mx0-5}" y="${f1(MY(v)+3)}" class="t-xs t-end">${v}</text>`);
    [1930,1950,1970,1990,2010].forEach(y=>s+=`<text x="${f1(MX(y))}" y="${P.my1+14}" class="t-xs t-mid">${y}</text>`);
    s+=`<line x1="${P.mx0}" x2="${P.mx1}" y1="${P.my1}" y2="${P.my1}" class="axis"/>`;
    s+=`<rect x="${f1(MX(1990))}" y="${f1(MY(5))}" width="${f1(MX(2010)-MX(1990))}" height="${f1(MY(0)-MY(5))}" style="fill:var(--good);opacity:.25"/>`;
    s+=`<path d="M${P.mx1-10} ${f1(MY(70)+5)}V${f1(MY(5))}" style="stroke:var(--good);stroke-width:1;stroke-dasharray:2 3"/><text x="${P.mx1}" y="${f1(MY(70))}" class="t-xs t-end" style="fill:var(--good);font-weight:600">today: under 5%</text>`;
    s+=`<text x="${P.mx1}" y="${P.my1+30}" class="t-xs t-end" style="fill:var(--ink)">2000-05, US in-hospital deaths:</text><text x="${P.mx1}" y="${P.my1+42}" class="t-xs t-end" style="fill:var(--ink)">2.2% of MG admissions, 4.47% in crisis</text>`;
    s+=`<path d="M${f1(MX(1963.5))} ${f1(MY(37))}L${f1(MX(1974))} ${f1(MY(8))}" style="fill:none;stroke:var(--ab);stroke-width:1.4;stroke-dasharray:4 3" marker-end="url(#whtAr2)"/>`;
    s+=`<text x="${f1(MX(1970)+6)}" y="${f1(MY(24))}" class="t-xs" style="fill:var(--ab)">ventilation, ICUs</text>`;
    MORT.forEach(m=>{const x=MX(m.y),y=MY(m.v);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${m.l?5:4}" style="fill:var(--ab);stroke:var(--field);stroke-width:1.2"/>`;
      if(m.l)s+=`<text x="${f1(x+m.dx)}" y="${f1(y+m.dy)}" class="t-xs" style="fill:var(--ink)">${m.l}</text>`;
      if(m.l2)s+=`<text x="${f1(x+m.dx)}" y="${f1(y+m.dy+12)}" class="t-xs" style="fill:var(--ink)">${m.l2}</text>`});
    sv.innerHTML=`<defs>${marker('whtAr2','var(--ab)')}</defs>`+s}
  drawCourse();

  const OO=[[22,'complete remission','var(--good)'],[18,'much improved','var(--achr)'],[16,'moderately improved','var(--nerve)'],[16,'unchanged','var(--muted)'],[29,'died','var(--ab)']];
  $('#whtCourseCards').innerHTML=`
   <div class="card"><span class="kicker">The natural course</span><h4>Amsterdam, 1926-1965</h4><div class="wht-stack" role="img" aria-label="Outcome in 1985: 22% complete remission, 18% much improved, 16% moderately improved, 16% unchanged, 29% died">${OO.map(o=>`<i style="width:${o[0]}%;background:${o[2]}"></i>`).join('')}</div><p>${OO.map(o=>`<b>${o[0]}%</b> ${o[1]}`).join(', ')}; 2 patients were worse. 73 patients treated mostly with anticholinesterases only, outcome in 1985; thymoma did worse [[Oosterhuis1989]].</p></div>
   <div class="card"><span class="kicker">Worst early</span><span class="wht-big">first 1-2 years</span><p>The most severe weakness and the highest mortality came in the first 1-2 years in 1,976 patients followed 1940-2000 [[Grob2008]]. Almost two-thirds reach maximum severity within the first year [[Juel2007]].</p></div>
   <div class="card"><span class="kicker">Remission</span><span class="wht-big">24% vs 4%</span><p>complete stable remission in early-onset vs very-late-onset Italian AChR patients (onset 2000-2020); minimal manifestations or better on 5 mg/day prednisone or less in 60% and 48% [[Falso2026]]. Before steroids about a quarter remitted spontaneously, for 4.6 years on average [[Dresser2021]]. Guidelines set remission or minimal manifestations as the goal [[Gilhus2019,Shelly2025]].</p></div>
   <div class="card"><span class="kicker">Mortality today</span><p>Disease-specific mortality is under 5% with near-normal life expectancy [[Juel2007]]; other reviews give 5-9% [[Dresser2021,Bubuioc2021]]. Before immunomodulators it was about 30% [[Juel2007]]. A single Israeli tertiary centre found 14% mortality at 5 years and 21% at 10, above matched controls, mainly from infections linked to chronic steroid use [[Khateb2025]].</p></div>
   <div class="card"><span class="kicker">Crisis</span><span class="wht-big">15-20%</span><p>lifetime risk in AChR MG [[Dresser2021,MSDManual2026]] (about 10% per MedlinePlus [[MedlinePlusMG2026]]). In 73 crises, median time from onset to first crisis was 8 months and mortality 4% per episode [[Thomas1997]]. Difficulty breathing or swallowing is an emergency. See <a href="#crisis" data-go="crisis">Myasthenic crisis</a>.</p></div>
   <div class="card"><span class="kicker">Living with it</span><p>Fatigue, as distinct from muscle fatigability, affects about 60% of patients [[Campman2026]]. Pooled prevalence was 36% for depression and 33% for anxiety [[Nadali2023]]. Quality of life is lower in generalized than ocular MG and falls with severity [[McCallion2024]]. See <a href="#living" data-go="living">Living with MG</a>.</p></div>`;

  $('#whtAuto').innerHTML=`
   <div class="card"><span class="kicker">Another autoimmune disease</span><span class="wht-big">13%</span><p>of people with MG, in a review of 25 studies; autoimmune thyroid disease was the most common, and coexisting autoimmunity was more frequent in women and AChR-positive patients [[Mao2011]]. The natural-history cohort found 25% [[Oosterhuis1989]].</p></div>
   <div class="card"><span class="kicker">Thyroid first</span><span class="wht-big">about 10%</span><p>have autoimmune thyroiditis [[Bubuioc2021]]. Next come lupus and rheumatoid arthritis [[Nacu2015]]. Thyroid disease can also worsen MG [[Juel2007]], and a 2021 diagnostic review advises thyroid function tests in all definite or probable MG [[Rousseff2021]].</p></div>
   <div class="card"><span class="kicker">Families</span><span class="wht-big">5.6%</span><p>of 1,032 North American AChR-positive patients reported a relative with MG; 26.6% of patients and 28.4% of their relatives had an autoimmune disease [[Green2020]]. In an Israeli cohort 5.7% had familial MG, which started younger (median 44.5 vs 58 years) [[Hellmann2025]]. Identical twins are concordant in about 35.5%, non-identical twins in 4-5% [[Ramanujam2011]].</p></div>
   <div class="card"><span class="kicker">HLA</span><p>Early-onset MG in people of European descent is linked to the A1-B8-DR3 haplotype (HLA-B*08:01); late onset to other markers such as HLA-DRB1*15:01 in Norwegian patients over 60; MuSK MG to HLA-DQB1*05 and DRB1*14/*16. Thymoma MG shows no consistent HLA link [[Dresser2021,Bubuioc2021]].</p></div>
   <div class="card"><span class="kicker">Checkpoint-inhibitor MG</span><p>Cancer drugs that release immune brakes can trigger MG: 0.12% of nivolumab-treated Japanese patients [[Suzuki2017]]. In 65 reported cases onset came a median 4 weeks after starting, often with myositis, and 38% died [[Safa2019]].</p></div>`;
};
