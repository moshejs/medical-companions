/* =============== 2.1 Signs & red flags =============== */
/* Three pieces: the main player (the classic picture unfolding on a body, a knee-jerk panel and IGOS entry bars,
   ending on red flags), a regional feature explorer (IGOS), and a red-flag sorter with a body map.
   Every number comes from research pass D; the body drawing is schematic. */
const SG_STEPS=[
 {from:0,at:.06,k:'Step 1 · before the weakness',sv:'Tingling and pain come first',sub:'often in the feet and hands, sometimes the back',
  t:'Tingling and pain often come first',
  txt:`Classic GBS begins with tingling (paraesthesias) or numbness in the feet and hands, with weakness at the same time or soon after [[Leonhard2019]]. In 156 people followed prospectively, 36% had pain in the 2 weeks before any weakness [[Ruts2010Pain]]. Severe diffuse pain, or an isolated cranial nerve problem, can come before the weakness [[Leonhard2019]].`,
  pt:`It often starts with pins and needles in the toes and fingers. Many people also ache in the back or legs, sometimes before they feel weak.`,
  hook:`Pain precedes weakness in about one-third (36%) [[Ruts2010Pain]].`},
 {from:.16,at:.24,k:'Step 2 · legs',sv:'Weakness starts in the legs',sub:'both sides, getting worse over days',
  t:'Weakness starts in both legs',
  txt:`Weakness usually starts in the legs and spreads to the arms and the muscles supplied by the cranial nerves [[Leonhard2019]]. All 494 adults in a Dutch cohort had weakness on both sides; it stayed in the legs in 6% and in the arms in 1% [[Fokke2014]]. It is always bilateral but can be uneven, mainly proximal or mainly distal, and can start in the arms or in all four limbs at once [[Leonhard2019]].`,
  pt:`The legs usually get weak first, on both sides. Stairs, getting up from a chair and walking get harder over a few days.`,
  hook:`Required: progressive weakness of arms and legs, which may start in the legs [[vanDoorn2023]].`},
 {from:.32,at:.4,k:'Step 3 · reflexes',sv:'Reflexes fade',sub:'knee and ankle jerks shrink, then vanish',
  t:'Tendon reflexes shrink or disappear',
  txt:`Reflexes in weak limbs were reduced at first assessment in 91% of the Dutch adults and in all of them later [[Fokke2014]]. At entry to the International GBS Outcome Study (IGOS), the legs were areflexic in 77%, hyporeflexic in 20%, normal in 2% and brisk in 2% [[Doets2018]]. About 1 in 10 keep normal or brisk reflexes, most often with pure motor weakness and the axonal subtype AMAN [[Yuki2012JNeurol]].`,
  pt:`A doctor taps just below the knee with a small hammer. In GBS the leg usually barely moves, or does not move at all. A few people keep normal reflexes.`,
  hook:`Preserved or brisk reflexes in about 10%, particularly pure motor AMAN [[Yuki2012JNeurol]].`},
 {from:.48,at:.56,k:'Step 4 · arms and face',sv:'It climbs to the arms and face',sub:'hands, face, swallowing, eye movements',
  t:'Arms, face and swallowing',
  txt:`In IGOS, 50% had cranial nerve involvement at entry: 46% in Europe and the Americas, 64% in Asia and 67% in Bangladesh [[Doets2018]]. Cranial nerve involvement, especially weakness of both sides of the face, is a strongly supportive feature [[Leonhard2019]]. Sensory deficits were present at entry in 59% [[Doets2018]].`,
  pt:`Weakness can reach the hands, the face and the muscles used to swallow and speak. Some people cannot close their eyes fully or smile evenly.`,
  hook:`Bilateral facial palsy is strongly supportive in the NINDS criteria as adapted [[Leonhard2019]].`},
 {from:.64,at:.71,k:'Step 5 · autonomic and breathing',sv:'Blood pressure, heart and breathing',sub:'the dangerous part, watched closely',
  t:'Autonomic nerves and breathing muscles',
  txt:`Dysautonomia can bring swings in blood pressure or heart rate, pupil changes and bowel or bladder problems [[Leonhard2019]]. It was present at IGOS entry in 25% [[Doets2018]], and figures range up to two-thirds depending on definition and setting [[Chakraborty2020,Zaeem2019]]. About 20% develop respiratory failure, and it can occur without breathlessness [[Leonhard2019]].`,
  pt:`GBS can affect the nerves that control blood pressure, heart rate, bowels and bladder, and the muscles used for breathing. That is why people are watched closely in hospital.`,
  hook:`Respiratory failure can develop without dyspnoea, so breathing is measured, not only asked about [[Leonhard2019]].`},
 {from:.8,at:.9,k:'Step 6 · red flags',sv:'Red flags point elsewhere',sub:'findings that cast doubt on GBS',
  t:'Red flags: findings that cast doubt',
  txt:`A consensus list of features that cast doubt on GBS includes a sharp sensory level, bladder or bowel dysfunction at onset or persisting, fever at onset, hyperreflexia or clonus, extensor plantar responses, marked persistent asymmetry, a worst point within 24 hours, and CSF cells above 50×10⁶/l [[Leonhard2019]]. They prompt a search for another cause; they do not exclude GBS on their own [[AlHakem2023,vanDoorn2023]].`,
  pt:`Some findings make doctors think of other illnesses, such as a spinal cord problem. A clear line on the body below which feeling is lost is one of them.`,
  hook:`A nadir under 24 h, or progression beyond 4 weeks, makes GBS doubtful [[Leonhard2019]].`}
];
/* IGOS entry frequencies shown as bars in the main player; each appears with its step */
const SG_BARS=[
 {l:'sensory deficits',v:59,from:0},
 {l:'pain',v:55,from:0},
 {l:'leg reflexes absent',v:77,from:.32},
 {l:'cranial nerve involvement',v:50,from:.48},
 {l:'autonomic dysfunction',v:25,from:.64}];
const SG_FLAGLIST=['sharp sensory level on the trunk','bladder or bowel trouble at onset','fever at onset','upgoing toes, clonus, brisk reflexes','marked, persistent asymmetry','worst point within 24 hours'];
const SG_TXT={bars:'At IGOS entry, % of people',reflex:'Knee jerk (schematic)',flags:'Findings that cast doubt',tap:'tap',resp:'response',
  rw:['absent','reduced','normal'],tingle:'tingling',back:'aching back',legs:'weak legs',arms:'weak arms',face:'face',bp:'blood pressure',breath:'breathing'};
/* the weakness level along the schematic course (0 feet .. 1 head) and the reflex size (1 normal .. 0 absent) */
function sgLevel(t){if(t<.16)return 0;if(t<.3)return .36*ease(ramp(t,.16,.3));if(t<.48)return .36+.06*ramp(t,.3,.48);if(t<.62)return lerp(.42,.84,ease(ramp(t,.48,.62)));return .84}
function sgRefl(t){return 1-.88*ease(ramp(t,.3,.44))}

/* the regional explorer: IGOS, % at entry and at the worst point (nadir); null = not reported in the source */
const SG_FX_ROWS=[
 {l:'Sensory deficits',sl:'Sensory deficits',entry:{all:59,ea:65,as:54,bd:28},nadir:{all:null,ea:69,as:59,bd:29}},
 {l:'Pain',sl:'Pain',entry:{all:55,ea:58,as:12,bd:62},nadir:{all:null,ea:57,as:17,bd:63}},
 {l:'Cranial nerve involvement',sl:'Cranial nerves',entry:{all:50,ea:46,as:64,bd:67},nadir:{all:null,ea:49,as:68,bd:68}},
 {l:'Autonomic dysfunction',sl:'Autonomic',entry:{all:25,ea:27,as:10,bd:22},nadir:{all:null,ea:29,as:17,bd:28}},
 {l:'Cannot walk unaided',sl:'Cannot walk unaided',entry:{all:null,ea:null,as:null,bd:null},nadir:{all:79,ea:76,as:76,bd:93}}];
const SG_FX_CAP={
 entry:{all:'All IGOS participants at study entry (about 890 to 924 with data, depending on the feature) [[Doets2018]].',
  ea:'Europe and the Americas, at study entry [[Doets2018]].',as:'Asia (excluding Bangladesh), at study entry. Pain was far less often recorded here [[Doets2018]].',
  bd:'Bangladesh, at study entry. Pure motor GBS was the commonest variant here, and sensory deficits were least common [[Doets2018]].'},
 nadir:{all:'At the worst point the paper gives regional figures only. The overall 79% unable to walk (643 of 815) is summed here from the table rows; IGOS is not population-based [[Doets2018]].',
  ea:'Europe and the Americas, at the worst point: 478 of 626 could not walk unaided [[Doets2018]].',as:'Asia, at the worst point: 50 of 66 could not walk unaided [[Doets2018]].',
  bd:'Bangladesh, at the worst point: 100 of 107 (93%) could not walk unaided [[Doets2018]].'},
 nr:'not reported'};

/* the red-flag sorter: v = 'yes' (fits GBS), 'maybe' (possible, less typical), 'no' (red flag) */
const SG_VERD={yes:['Fits GBS','yes'],maybe:['Possible in GBS, less typical','maybe'],no:['Red flag: look for another cause','no']};
const SG_VSHORT={yes:'fits GBS',maybe:'possible',no:'red flag'};
const SG_FLAGS=[
 {b:'Tingling in the feet and hands first',v:'yes',at:'ends',txt:`Classic GBS begins with distal paraesthesias or sensory loss, with weakness at the same time or after [[Leonhard2019]].`},
 {b:'Back or leg pain before the weakness',v:'yes',at:'back',txt:`36% of 156 people had pain in the 2 weeks before weakness [[Ruts2010Pain]]. Severe diffuse pain can precede the weakness [[Leonhard2019]].`},
 {b:'Both legs weak, one a little more',v:'yes',at:'legs',txt:`Weakness is always bilateral but can be asymmetrical [[Leonhard2019]]. What casts doubt is marked, persistent asymmetry [[Leonhard2019]].`},
 {b:'Marked, persistent asymmetry',v:'no',at:'leg1',txt:`Listed among features that cast doubt on the diagnosis [[Leonhard2019]]. Asymmetric flaccid weakness, especially with fever, suggests an anterior horn cell infection such as West Nile virus [[Sejvar2005]].`},
 {b:'Normal or brisk knee jerks',v:'maybe',at:'knees',txt:`Reflexes can stay present or brisk in up to 10% [[Wakerley2015,Yuki2012JNeurol]]. The guideline says initial hyperreflexia does not exclude GBS but makes it less likely [[vanDoorn2023]]; hyperreflexia or clonus is on the consensus list of doubts [[Leonhard2019]].`},
 {b:'Both sides of the face weak',v:'yes',at:'face',txt:`Cranial nerve involvement, especially bilateral facial palsy, is strongly supportive in the NINDS criteria as adapted [[Leonhard2019]].`},
 {b:'A sharp sensory level on the trunk',v:'no',at:'level',txt:`A sharp sensory level casts doubt on GBS [[Leonhard2019]]. With extensor plantars, hyperreflexia and a cord lesion on MRI it points to transverse myelitis or another cord cause [[TMCWG2002,vanDoorn2023]].`},
 {b:'Bladder or bowel trouble at the start',v:'no',at:'pelvis',txt:`Bladder or bowel dysfunction at onset, or persisting, casts doubt [[Leonhard2019]]. The guideline adds that bladder or bowel dysfunction does not exclude GBS [[vanDoorn2023]].`},
 {b:'Fever when the weakness begins',v:'no',at:'head',txt:`Fever at onset casts doubt on GBS [[Leonhard2019]]. Fever was present in 91% of people with West Nile virus paralysis [[Sejvar2005]].`},
 {b:'Severe breathing trouble, little limb weakness',v:'no',at:'chest',txt:`Severe respiratory dysfunction with limited limb weakness at onset casts doubt [[Leonhard2019]]; it points away from GBS and towards conditions such as myasthenic crisis [[vanDoorn2023,Wendell2011]].`},
 {b:'Worst point within 24 hours',v:'no',at:'t24',txt:`Maximum disability within 24 hours of onset should prompt consideration of other diagnoses [[Leonhard2019]]. Brighton levels 1 to 3 require 12 hours to 28 days from onset to nadir [[LopezHernandez2022,Ghazanfar2020]].`},
 {b:'Still getting worse after 4 weeks',v:'no',at:'t4w',txt:`Continued progression for more than 4 weeks casts doubt [[Leonhard2019]], and continued worsening beyond 4 weeks prompts consideration of acute-onset CIDP [[vanDoorn2023]].`},
 {b:'Over 50 white cells in the spinal fluid',v:'no',at:'lp',txt:`CSF cells above 50×10⁶/l cast doubt [[Leonhard2019]]. Even so, mild pleocytosis and rare counts of 50 or more are compatible with GBS after a thorough search for other causes [[AlHakem2023]].`},
 {b:'Upgoing toes (extensor plantars)',v:'no',at:'feet',txt:`Extensor plantar responses cast doubt on GBS [[Leonhard2019]] and are a discriminator for transverse myelitis [[TMCWG2002]].`},
 {b:'Confusion or drowsiness',v:'no',at:'head',txt:`Altered consciousness casts doubt, except in Bickerstaff brainstem encephalitis [[Leonhard2019]].`},
 {b:'Abdominal pain',v:'no',at:'belly',txt:`Abdominal pain is on the consensus list of doubts [[Leonhard2019]]. With psychological features and neuropathy, it is a clue to acute porphyria [[Albers2004]].`},
 {b:'Low sodium on a blood test',v:'maybe',at:'arm',txt:`Abnormal routine blood tests make GBS less likely, though hyponatraemia may occur in GBS [[vanDoorn2023]].`},
 {b:'Nystagmus or vomiting',v:'maybe',at:'eyes',txt:`The guideline lists nystagmus and vomiting among findings that make GBS less likely [[vanDoorn2023]].`},
 {b:'No infection in the weeks before',v:'yes',at:'none',txt:`About one-third report none of the queried antecedent events, so their absence does not exclude GBS [[Leonhard2019,vanDoorn2023]].`},
 {b:'A young child who refuses to walk',v:'yes',at:'legs',txt:`Children under 6 can present with poorly localised pain, refusal to bear weight, irritability, meningism or unsteady gait [[Leonhard2019]].`}];

inits.signs=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- main player ---------- */
  const svg=$('#sgSvg'),rg=$('#sgT'),note=$('#sgNote');let setSt=()=>{};
  function reflexPanel(x,y,w,h,r,t,on){
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const word=SG_TXT.rw[r>.7?2:r>.28?1:0];
    s+=T(x+10,y+16,SG_TXT.reflex,'t-xs',INK)+T(x+w-10,y+16,word,'t-sm t-end',`fill:${r>.7?'var(--ink)':'var(--dx)'};font-weight:700`);
    /* a bent leg: thigh, knee, shin that kicks when struck */
    const u=on?(t*9)%1:.6,kick=r*24*bump(u,.22,.55),kx=x+58,ky=y+h*.5;
    s+=`<path d="M${f1(x+14)} ${f1(ky-12)}L${f1(kx)} ${f1(ky)}" style="stroke:var(--skin);stroke-width:13;stroke-linecap:round"/>`;
    const a=(12+kick)*Math.PI/180,sx=kx+Math.sin(a)*-6,sy=ky+Math.cos(a)*36;
    s+=`<path d="M${f1(kx)} ${f1(ky)}L${f1(kx-Math.sin(a)*-38)} ${f1(ky+Math.cos(a)*38)}" style="stroke:var(--skin);stroke-width:11;stroke-linecap:round"/>`;
    s+=`<path d="M${f1(x+14)} ${f1(ky-12)}L${f1(kx)} ${f1(ky)}L${f1(kx-Math.sin(a)*-38)} ${f1(ky+Math.cos(a)*38)}" style="fill:none;stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    /* the hammer swings onto the tendon below the knee */
    const sw=u<.22?lerp(-40,0,ease(u/.22)):lerp(0,-40,ease(ramp(u,.22,.6))),ha=sw*Math.PI/180,hx=kx+12,hy=ky+10,px=hx+Math.cos(ha)*30,py=hy-Math.sin(ha)*30-2;
    s+=`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px+Math.cos(ha+Math.PI/2)*-2+22)}" y2="${f1(py-18)}" style="stroke:var(--device);stroke-width:2.4;stroke-linecap:round"/><rect x="${f1(px-9)}" y="${f1(py-4)}" width="18" height="8" rx="3" style="fill:var(--device)"/>`;
    /* the response trace */
    const tx0=x+112,tx1=x+w-12,by=y+h-18,amp=(h-44)*r;let d='';
    const prog=on?clamp((u-.2)/.5):1;
    for(let i=0;i<=80;i++){const v=i/80;if(v>prog)break;const g=Math.exp(-Math.pow((v-.45)/.07,2)),gn=Math.exp(-Math.pow((v-.6)/.06,2));d+=(i?'L':'M')+f1(lerp(tx0,tx1,v))+' '+f1(by-amp*g+amp*.25*gn)}
    s+=`<line x1="${f1(tx0)}" x2="${f1(tx1)}" y1="${f1(by)}" y2="${f1(by)}" class="grid"/>`;
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--dx);stroke-width:2.2;stroke-linejoin:round"/>`;
    s+=T(tx0,by+12,SG_TXT.tap)+T(tx1,by+12,SG_TXT.resp,'t-xs t-end');
    return s}
  function draw(t){const N=vb(svg,'720 400','400 664'),p=phaseOf(SG_STEPS,t),P=SG_STEPS[p];
    const L=N?{tx:12,ty:22,bx:200,by:58,bs:250,lr:262,ll:140,px:14,pw:372,ry:330,rh:104,gy:462,gr:34}
             :{tx:16,ty:24,bx:150,by:66,bs:300,lr:226,ll:76,px:330,pw:374,ry:58,rh:108,gy:194,gr:34};
    const lv=sgLevel(t),r=sgRefl(t),k=L.bs/146,Pt=(a,b)=>[L.bx+a*k,L.by+(b+50)*k];
    const tg=ramp(t,.02,.08),pain=ramp(t,.03,.1)*(1-ramp(t,.6,.7)*.6),face=ramp(t,.54,.62),flags=ramp(t,.8,.85);
    let s=T(L.tx,L.ty,P.sv,'t-big',`fill:${p===5?'var(--bad)':'var(--ink)'}`)+T(L.tx,L.ty+16,P.sub,'t-sm');
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,tingle:tg,pain,zones:{face:face*.8}});
    s+=B.svg;
    /* labels around the body (short, so they never reach the panels) */
    const lab=(x,y,txt,a)=>kitLabel(x,y,txt,a?{a}:{});
    if(tg>.3&&p<5){const h=B.at.hand,f=B.at.foot;s+=lab(L.lr,h[1]+4,SG_TXT.tingle)+`<path d="M${f1(h[0]+8)} ${f1(h[1])}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`;
      s+=lab(L.lr,f[1]-4,SG_TXT.tingle)+`<path d="M${f1(f[0]+30*k)} ${f1(f[1]-8)}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`}
    if(pain>.3&&p<5){const b=B.at.back;s+=lab(L.ll,b[1]+4,SG_TXT.back,'e')}
    if(p>=1&&p<5){const lg=Pt(-12,62);s+=lab(L.ll,lg[1],SG_TXT.legs,'e')}
    if(p>=3&&p<5){const ar=Pt(-30,4);s+=lab(L.ll,ar[1],SG_TXT.arms,'e');const fc=Pt(0,-40);s+=lab(L.lr,fc[1]+2,SG_TXT.face)+`<path d="M${f1(fc[0]+14*k)} ${f1(fc[1]-2)}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`}
    if(p===4){const c=Pt(6,-14),beat=1+.18*Math.max(0,Math.sin(t*120));
      s+=`<path d="M${f1(c[0])} ${f1(c[1]+7*beat)}C${f1(c[0]-11*beat)} ${f1(c[1]-1)} ${f1(c[0]-6*beat)} ${f1(c[1]-9*beat)} ${f1(c[0])} ${f1(c[1]-3)}C${f1(c[0]+6*beat)} ${f1(c[1]-9*beat)} ${f1(c[0]+11*beat)} ${f1(c[1]-1)} ${f1(c[0])} ${f1(c[1]+7*beat)}Z" style="fill:var(--heart);stroke:var(--ink);stroke-width:1"/>`;
      s+=lab(L.lr,c[1]-6,SG_TXT.bp)+lab(L.lr,c[1]+10,SG_TXT.breath)+`<path d="M${f1(c[0]+12)} ${f1(c[1])}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`}
    /* red flags: numbered marks on the body */
    if(flags>0){const mk=(x,y,n)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`+T(x,y+3.5,n,'t-xs t-mid','fill:var(--bad);font-weight:700');
      const lvY=Pt(0,2)[1];let g=`<g style="opacity:${f1(flags)}"><line x1="${f1(L.bx-26*k)}" x2="${f1(L.bx+26*k)}" y1="${f1(lvY)}" y2="${f1(lvY)}" style="stroke:var(--bad);stroke-width:2.2;stroke-dasharray:5 3"/>`;
      const p1=Pt(-26,2),p2=Pt(0,32),p3=Pt(0,-56),p4=Pt(9,99),p5=Pt(-9,62);
      g+=mk(p1[0]-12,p1[1],'1')+mk(p2[0],p2[1],'2')+mk(p3[0]+18,p3[1]+4,'3')+mk(p4[0]+16,p4[1]-4,'4')+mk(p5[0],p5[1],'5')+'</g>';s+=g}
    /* reflex panel */
    s+=reflexPanel(L.px,L.ry,L.pw,L.rh,r,t,p>=2&&p<5);
    /* bars or the red-flag list */
    const bo=1-flags;
    if(bo>0){let g=`<g style="opacity:${f1(bo)}">`+T(L.px,L.gy,SG_TXT.bars,'t-xs',INK);
      SG_BARS.forEach((b,i)=>{const a=ramp(t,b.from,b.from+.05);if(a<=0)return;const yy=L.gy+14+i*L.gr,w=L.pw*b.v/100*ease(a);
        g+=`<g style="opacity:${f1(Math.min(1,a*2))}">`+T(L.px,yy+9,b.l,'t-sm','fill:var(--ink)')+T(L.px+L.pw,yy+9,b.v+'%','t-sm t-end','fill:var(--ink);font-weight:700');
        g+=`<rect x="${f1(L.px)}" y="${f1(yy+14)}" width="${f1(L.pw)}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${f1(L.px)}" y="${f1(yy+14)}" width="${f1(w)}" height="9" rx="4.5" style="fill:var(--dx)"/></g>`});
      s+=g+'</g>'}
    if(flags>0){let g=`<g style="opacity:${f1(flags)}">`+T(L.px,L.gy,SG_TXT.flags,'t-xs','fill:var(--bad);font-weight:700');
      SG_FLAGLIST.forEach((f,i)=>{const yy=L.gy+22+i*26,a=clamp(ramp(t,.82,.9)*6-i);
        g+=`<g style="opacity:${f1(a)}"><circle cx="${f1(L.px+9)}" cy="${f1(yy)}" r="9" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`+T(L.px+9,yy+3.5,i<5?String(i+1):'⏱','t-xs t-mid','fill:var(--bad);font-weight:700')+T(L.px+26,yy+4,f,'t-sm','fill:var(--ink)')+'</g>'});
      s+=g+'</g>'}
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#sgPlay'),draw,16000,'%t:player.replay%','signs');
  setSt=stepWire($('#sgSteps'),SG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- regional explorer ---------- */
  const fx=$('#sgFx'),fcap=$('#sgFxCap');let reg='all',when='entry',shown=SG_FX_ROWS.map(()=>0),stopFx=null;
  function target(){return SG_FX_ROWS.map(r=>r[when][reg])}
  function drawFx(vals){const N=vb(fx,'720 260','400 330'),tg=target();
    const L=N?{lx:14,bx:14,bw:318,vx:386,y0:20,rh:62,lab:0}:{lx:16,bx:250,bw:400,vx:704,y0:28,rh:46,lab:1};
    let s='';
    SG_FX_ROWS.forEach((r,i)=>{const y=L.y0+i*L.rh,v=vals[i],nr=tg[i]==null,bh=14;
      const by=L.lab?y-4:y+12;
      s+=T(L.lx,L.lab?y+7:y+6,N?r.sl:r.l,'t-sm','fill:var(--ink)');
      s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(L.bw)}" height="${bh}" rx="7" style="fill:var(--panel-2)"/>`;
      if(nr){s+=T(L.bx+10,by+11,SG_FX_CAP.nr,'t-xs','font-style:italic')}
      else{s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(Math.max(0,L.bw*v/100))}" height="${bh}" rx="7" style="fill:var(--dx)"/>`;
        s+=T(L.vx,by+11,Math.round(v)+'%','t-lbl t-end')}
      for(let g=25;g<100;g+=25)s+=`<line x1="${f1(L.bx+L.bw*g/100)}" x2="${f1(L.bx+L.bw*g/100)}" y1="${f1(by)}" y2="${f1(by+bh)}" style="stroke:var(--panel);stroke-width:1.5;opacity:.7"/>`});
    const ay=L.y0+SG_FX_ROWS.length*L.rh+(L.lab?2:8);
    [0,50,100].forEach(g=>{s+=T(L.bx+L.bw*g/100,ay,g+'%','t-xs '+(g===0?'':g===100?'t-end':'t-mid'))});
    fx.innerHTML=s}
  function updFx(){const tg=target(),from=shown.slice();if(stopFx)stopFx();
    stopFx=animate(450,u=>{shown=from.map((v,i)=>tg[i]==null?0:lerp(v,tg[i],ease(u)));drawFx(shown)},()=>{stopFx=null});
    fcap.innerHTML=SG_FX_CAP[when][reg];
    $$('[data-sgr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sgr===reg));
    $$('[data-sgw]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sgw===when))}
  $$('[data-sgr]').forEach(b=>b.addEventListener('click',()=>{reg=b.dataset.sgr;updFx()}));
  $$('[data-sgw]').forEach(b=>b.addEventListener('click',()=>{when=b.dataset.sgw;updFx()}));
  shown=target().map(v=>v==null?0:v);drawFx(shown);fcap.innerHTML=SG_FX_CAP[when][reg];

  /* ---------- red-flag sorter ---------- */
  const map=$('#sgMap'),fl=$('#sgFlags'),fn=$('#sgFlagNote');let sel=6;
  fl.innerHTML=SG_FLAGS.map((f,i)=>`<button class="btn" data-sgf="${i}" aria-pressed="false">${f.b}</button>`).join('');
  function drawMap(){vb(map,'400 380','400 380');const F=SG_FLAGS[sel],bx=200,by=14,bs=262,k=bs/146,Pt=(a,b)=>[bx+a*k,by+(b+50)*k];
    const col={yes:'var(--good)',maybe:'var(--warn)',no:'var(--bad)'}[F.v];
    let s=bodyFront(bx,by,bs,{level:0,pain:F.at==='back'?1:0,tingle:F.at==='ends'?1:0}).svg;
    const ring=(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="12" style="fill:none;stroke:${col};stroke-width:2.6"/>`;
    const pts={ends:[ [-30,28],[30,28],[-9,94],[9,94]],back:[ [0,14]],legs:[ [-9,60],[9,60]],leg1:[ [-9,60]],knees:[ [-9,54],[9,54]],face:[ [-7,-37],[7,-37]],
      pelvis:[ [0,34]],head:[ [0,-46]],chest:[ [0,-12]],feet:[ [-9,94],[9,94]],belly:[ [0,10]],arm:[ [-27,6]],eyes:[ [-4,-41],[4,-41]],lp:[ [0,24]]};
    let lx=null,ly=null;
    if(F.at==='level'){const y=Pt(0,2)[1];s+=`<line x1="${f1(bx-30*k)}" x2="${f1(bx+30*k)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:2.6;stroke-dasharray:6 4"/>`;lx=bx+32*k;ly=y+4}
    else if(pts[F.at]){pts[F.at].forEach(([a,b])=>{const q=Pt(a,b);s+=ring(q[0],q[1])});const q=Pt(...pts[F.at][pts[F.at].length-1]);lx=q[0]+16;ly=q[1]+4}
    if(F.at==='lp'){const q=Pt(0,24);s+=`<path d="M${f1(q[0]+60)} ${f1(q[1]-20)}L${f1(q[0]+12)} ${f1(q[1])}" style="stroke:var(--device);stroke-width:2.4;stroke-linecap:round"/>`}
    /* the time strip: onset to 6 weeks, with the usual window to the worst point */
    const tx=40,tw=320,ty=342,X=d=>tx+tw*d/42;
    s+=`<rect x="${f1(X(1))}" y="${ty-9}" width="${f1(X(28)-X(1))}" height="18" rx="4" style="fill:var(--dx-soft)"/>`;
    s+=tline(tx,ty,tw,{min:0,max:42,step:7,fmt:v=>v?v/7+' wk':'onset'}).svg;
    s+=T(X(14.5),ty-13,'worst point usually here','t-xs t-mid','fill:var(--dx);font-weight:700');
    if(F.at==='t24'){s+=ring(X(.5),ty);lx=X(.5)+16;ly=ty-14}
    if(F.at==='t4w'){s+=`<path d="M${f1(X(28))} ${ty}H${f1(X(36))}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/>`+ring(X(36),ty);lx=X(36)-8;ly=ty-16}
    if(lx!=null){const w=SG_VSHORT[F.v].length*6+10,ex=Math.min(lx,392-w);s+=kitLabel(ex,ly,SG_VSHORT[F.v])}
    if(F.at==='none')s+=kitLabel(bx,by+bs+4,'no body site: from the history',{a:'m'});
    map.innerHTML=s;
    const V=SG_VERD[F.v];fn.innerHTML=`<div class="kicker">Finding ${sel+1} of ${SG_FLAGS.length}</div><h4>${F.b}</h4><p class="verdict ${V[1]}">${V[0]}</p><p>${F.txt}</p>`;
    $$('[data-sgf]',fl).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sgf===sel))}
  fl.addEventListener('click',e=>{const b=e.target.closest('[data-sgf]');if(!b)return;sel=+b.dataset.sgf;drawMap()});
  drawMap();
  const prev=redraws.signs;redraws.signs=()=>{prev&&prev();drawFx(shown);drawMap()};
};
