/* =============== 3.4 dbs =============== */
const DB_STEPS=[
 {from:0,at:.06,k:'Step 1 · Where',t:'The targets',
  txt:`Deep-brain stimulation for Parkinson's aims at one of two nuclei that the rate model makes overactive: the subthalamic nucleus (STN) or the internal globus pallidus (GPi). [[Galvan2008]] The first US approval, on 31 July 1997, was for stimulating the thalamus on one side to suppress tremor. Bilateral GPi or STN stimulation for advanced, levodopa-responsive Parkinson's followed on 14 January 2002. [[FDAPMA2026]]`,
  pt:`Thin wires are placed deep in the brain, in small clusters of cells that misfire in Parkinson's.`,
  hook:`Parkinson's targets: STN or GPi. The thalamic Vim target is for tremor. [[FDAPMA2026,Koeglsperger2019]] See <a href="#circuit" data-go="circuit">The dopamine pathway</a> for why these two nuclei.`},
 {from:.18,at:.27,k:'Step 2 · Surgery',t:'Placing the lead',
  txt:`A lead is passed into the target on each side. Implantation is typically within 1–2 mm of the plan, the brain can shift 2–4 mm during surgery, and placement errors are reported in up to 40% of DBS operations. [[Koeglsperger2019]] Classic leads (Medtronic 3387 and 3389) are 1.27 mm wide with four ring contacts 1.5 mm long, spaced 1.5 mm or 0.5 mm apart. [[Paff2020]] Each lead joins an extension wire to an implantable pulse generator (IPG). [[FDAPMA2026]]`,
  pt:`A wire thinner than a matchstick goes into the target on each side and is joined by a cable to a small stimulator, a little like a pacemaker.`,
  hook:`Infections cluster at the generator: 61.2% of DBS surgical-site infections were at the IPG pocket. [[Spindler2023]]`},
 {from:.36,at:.44,k:'Step 3 · Switching on',t:'Stimulation on',
  txt:`Programming usually starts with a monopolar review: each contact in turn is tested at 60 µs and 130 Hz while the amplitude is raised, first to the benefit threshold and then to the side-effect threshold. [[Koeglsperger2019]] A ring contact makes a roughly spherical field. [[Paff2020]] In one STN study rigidity was abolished at 0.7–1.7 mA and side effects appeared at 1.3–3.4 mA. Tremor stops almost at once, rigidity eases within about 20 s, and axial signs can take hours to days. [[Koeglsperger2019]] Drag the amplitude to grow the field.`,
  pt:`Raising the current grows the patch of brain it affects. Too little does nothing; too much spills into nearby wiring.`,
  hook:`Benefit appears above about 50 Hz and peaks near 130 Hz; at 5 Hz, akinesia got worse. [[Paff2020,Koeglsperger2019,Moro2002]]`},
 {from:.54,at:.62,k:'Step 4 · The rhythm',t:'The beta rhythm calms',
  txt:`Exaggerated beta (13–30 Hz) synchrony in the STN is associated with bradykinesia. In 11 patients, STN stimulation lowered beta power, and it stayed low for 12 s after stimulation stopped; bigger reductions went with bigger movements, and 5–12 Hz activity showed no such effect. [[Kuhn2008]] Medication and DBS both lower STN beta and alpha power in proportion to motor improvement. [[BronteStewart2025]] Whether DBS works because beta falls, or the two only travel together, is unresolved. [[Galvan2008]]`,
  pt:`The stimulator calms an abnormal, too-regular rhythm in the target. The calm outlasts the stimulation by a few seconds.`,
  hook:`One proposed mechanism is an "information lesion": a constant high-frequency pulse train carries no information and overrides the abnormal activity. Primate recordings argue against the simple version. [[Lozano2019]]`},
 {from:.72,at:.8,k:'Step 5 · Closed loop',t:'Adaptive stimulation',
  txt:`Adaptive DBS senses beta from the lead and adjusts the current. In the first test, in 8 patients, beta-triggered adaptive STN stimulation beat continuous stimulation on motor scores by 27–29% while stimulating 56% less of the time. [[Little2013]] Medtronic BrainSense Adaptive DBS received the CE mark on 13 January 2025 and FDA approval on 20 February 2025, the first commercial closed-loop system. [[Medtronic2025,FDAPMA2026]] In ADAPT-PD (68 people with a Percept PC generator), 91% on dual-threshold and 79% on single-threshold adaptive DBS met the primary endpoint, but the endpoint was revised post hoc, so the authors say confirmatory testing is limited. [[BronteStewart2025]] This step always shows adaptive mode.`,
  pt:`The newest systems listen to the brain's rhythm and turn the current up or down to match.`,
  hook:`Beta is not a universal signal: ADAPT-PD found raised alpha/beta activity on both sides in 65.2% of patients. [[Koeglsperger2026]]`},
 {from:.88,at:.95,k:'Step 6 · Expectations',t:'What it helps and what it does not',
  txt:`"With the exception of tremor, DBS treats primarily levodopa-responsive symptoms." Over time many people develop freezing of gait, postural instability and cognitive decline, and STN stimulation can worsen speech and gait in some. [[Bronstein2011]] At 5 years in the first 49 Grenoble patients, off-medication motor scores were 54% better, but speech was the only motor item not improved, and on-medication akinesia, speech, balance and freezing worsened between years 1 and 5. [[Krack2003]]`,
  pt:`It mainly improves what the medicine improves, smooths the swings and can lower the dose. Balance, speech and thinking are not what it fixes.`,
  hook:`Levodopa response predicts DBS response: a 30% motor-score improvement on a levodopa challenge is the usual marker, and levodopa-resistant tremor is the accepted exception. [[Bronstein2011]]`}
];
const DB_FUSN={k:'Comparison',t:'Focused ultrasound: a lesion on one side',
  txt:`MR-guided focused ultrasound makes a permanent lesion in the target instead of implanting a lead. In the pivotal trials the lesion was on one side, opposite the more affected side; DBS remains the procedure of choice for both sides because adjustable stimulation is safer. [[Lozano2019,Bond2017,Krishna2023,MartinezFernandez2020]] One-sided STN lesions improved the treated side's off-medication motor score from 19.9 to 9.9 points, against 18.7 to 17.1 with sham; speech disturbance affected 15 of 27 and persisted in 3 at 4 months. [[MartinezFernandez2020]] One-sided GPi lesions gave 69% responders against 32% with sham at 3 months. [[Krishna2023]]`,
  pt:`Instead of a wire and a battery, focused sound waves make a tiny permanent scar on one side. Nothing is left inside, and nothing can be adjusted later.`,
  hook:`US approvals: unilateral thalamotomy for Parkinson's tremor on 16 December 2018, unilateral pallidotomy on 29 October 2021, pallidothalamic tractotomy on 3 July 2025. [[FDAPMA2026]]`};
const DB_CALL={
 warn:`<div class="callout" style="border-left-color:var(--bad)"><b>Side-effect threshold passed.</b> The field now reaches the internal capsule. Capsule spread causes the most frequent stimulation side effect, muscle contractions such as facial pulling; dysarthria can come from the capsule or from cerebello-thalamic fibres. [[Koeglsperger2019]]</div>`,
 dir:`<div class="callout"><b>Directional lead.</b> The 1-3-3-1 lead has a tip contact, two levels of three segments and a ring; modelling suggests steering moves the centre of the activated volume by about 1.0–1.3 mm. [[Paff2020]] In a randomised double-blind crossover of 234 patients, the therapeutic window was wider with directional stimulation in 90.6%, a mean 2.98 against 2.11 mA. [[Schnitzler2022]]</div>`,
 gpi:`<div class="callout"><b>GPi instead of STN.</b> In 299 people, blinded motor benefit did not differ. STN allowed less medication but brought a greater decline in visuomotor processing speed, and depression worsened after STN but improved after GPi. [[Follett2010]] NSTAPS favoured STN for off-drug motor scores and drug reduction. [[Odekerken2013]]</div>`,
 adapt:`<div class="callout"><b>Adaptive mode.</b> Single-threshold control quickly suppresses brief beta bursts; dual-threshold control adjusts every 2.5–5 minutes to follow beta changes over levodopa cycles. [[Koeglsperger2026]] In ADAPT-PD, single-threshold mode cut delivered energy by 15% against continuous DBS; dual-threshold mode did not change it. [[BronteStewart2025]]</div>`
};
const DB_TRIALS=[
 {h:'Deuschl 2006',sub:'156 people under 75 · STN-DBS vs medication · 6 months',ev:['est','Randomised'],
  txt:`Quality of life (PDQ-39) improved more with stimulation in 50 of 78 pairs, by a mean 9.5 points, and off-medication motor scores in 55 of 78 pairs, by 19.6 points. Serious adverse events: 13% with stimulation against 4% with medication, including one fatal brain haemorrhage; all adverse events were more common with medication (64% vs 50%). [[Deuschl2006]]`,
  bars:[['Pairs better on PDQ-39 with DBS',50,'of 78',78],['Pairs better on off-medication motor score',55,'of 78',78]]},
 {h:'Weaver 2009 (VA CSP 468)',sub:'255 people, 25% aged 70 or over · STN or GPi vs best medical therapy · 6 months',ev:['est','Randomised'],
  txt:`On-time without troubling dyskinesia rose a mean 4.6 h a day with DBS and 0 h with medical therapy (difference 4.5 h, 95% CI 3.7–5.4), and 71% against 32% gained a clinically meaningful motor improvement. 49 DBS patients against 15 on medical therapy had at least one serious adverse event, including 39 surgery-related events and one death from brain haemorrhage. [[Weaver2009]]`,
  bars:[['Meaningful motor gain, DBS',71,'%'],['Meaningful motor gain, medical therapy',32,'%']]},
 {h:'PD SURG (Williams 2010)',sub:'366 people, UK · DBS plus medical therapy vs medical therapy · 1 year',ev:['est','Randomised'],
  txt:`The PDQ-39 summary index improved 5.0 points with surgery and 0.3 with medical therapy alone (difference −4.7, 95% CI −7.6 to −1.8). 19% had serious surgery-related adverse events, with one procedure-related death and no suicides. [[Williams2010]]`,
  bars:[['PDQ-39 improvement, surgery',5,'points'],['PDQ-39 improvement, medical',.3,'points']]},
 {h:'EARLYSTIM (Schuepbach 2013)',sub:'251 people, mean age 52, 7.5 years since diagnosis, early motor complications · 2 years',ev:['est','Randomised'],
  txt:`PDQ-39 improved 7.8 points with STN-DBS and worsened 0.2 with medical therapy (difference 8.0). DBS was also better on motor scores, daily activities, complications and time with good mobility. Serious adverse events: 54.8% vs 44.1%; 17.7% were related to surgery or the device. [[Schuepbach2013]] A news report of the paper, not checked against the full text, adds a 39% fall in levodopa-equivalent dose with DBS against a 21% rise, and 2 suicides with DBS against 1. [[Otto2013]]`,
  bars:[['PDQ-39 change, DBS',7.8,'points'],['PDQ-39 change, medical',-.2,'points']]},
 {h:'Follett 2010: STN or GPi',sub:'299 people · GPi 152, STN 147 · 24 months',ev:['est','Randomised'],
  txt:`Blinded off-medication motor change did not differ between targets (P = 0.50). STN needed less dopaminergic medication (P = 0.02) but brought a greater decline in visuomotor processing speed (P = 0.03), and depression worsened after STN and improved after GPi (P = 0.02). [[Follett2010]]`,bars:[]},
 {h:'NSTAPS (Odekerken 2013)',sub:'128 people · STN vs GPi',ev:['est','Randomised'],
  txt:`No difference in the primary disability outcome or in cognitive, mood and behavioural outcomes. Off drugs, STN gave larger motor improvements (20.3 vs 11.4 points) and larger levodopa-equivalent reductions (546 vs 208 mg); the authors suggest STN may be preferred. [[Odekerken2013]] The two trials point different ways: GPi for mood and processing speed, STN for off-phase benefit and drug reduction. [[Follett2010,Odekerken2013]]`,
  bars:[['Off-drug motor gain, STN',20.3,'points'],['Off-drug motor gain, GPi',11.4,'points']]},
 {h:'Krack 2003: 5 years',sub:'First 49 Grenoble STN patients',ev:['early','Uncontrolled cohort'],
  txt:`Off-medication motor scores were 54% better and daily activities 49% better at 5 years, with less medication and dyskinesia. Speech was the only motor item not improved off medication. Three people developed dementia after year 3, one had a large brain haemorrhage and one died by suicide. [[Krack2003]]`,
  bars:[['Off-medication motor score',54,'% better'],['Daily activities',49,'% better']]},
 {h:'Bove 2021: 15 years and more',sub:'51 people, a mean 17 years after STN-DBS',ev:['early','Uncontrolled cohort'],
  txt:`Against baseline, time with dyskinesia was 75% lower, off-time 58.7% lower and dopaminergic medication 50.6% lower; PDQ-39 total was 13.8% better. Uncontrolled (Class IV) evidence. [[Bove2021]]`,
  bars:[['Time with dyskinesia',75,'% less'],['Off-time',58.7,'% less'],['Dopaminergic drugs',50.6,'% less']]}
];
const DB_TL=[
 ['1997-07-31','Thalamic DBS, tremor','First US DBS approval (PMA P960009, Activa Tremor Control): one-sided thalamic stimulation for upper-limb tremor in essential tremor or parkinsonian tremor not controlled by medication, with the Model 3387 lead and 7424 generator. [[FDAPMA2026]]','dev'],
 ['2002-01-14','STN or GPi for PD','Bilateral GPi or STN stimulation (Activa Parkinson\'s Control Therapy) as adjunctive therapy for some symptoms of advanced, levodopa-responsive Parkinson\'s not adequately controlled with medication. [[FDAPMA2026]]','ind'],
 ['2015-06-12','Brio, rechargeable','The St. Jude/Abbott Brio rechargeable system: STN for Parkinson\'s, Vim for essential tremor. [[FDAPMA2026]]','dev'],
 ['2015-11-17','4-year indication','Supplement S229 changed the Medtronic indication to levodopa-responsive Parkinson\'s of at least 4 years\' duration not adequately controlled with medication. Secondary sources often date this to 2016. [[FDAPMA2026]]','ind'],
 ['2016-07-11','FUS: essential tremor','The original Exablate Neuro approval, for essential tremor. [[FDAPMA2026]]','fus'],
 ['2016-09-19','First directional lead','Abbott Infinity, the first FDA-approved system with a directional lead. Trade-press reports date the company announcement to early October 2016. [[FDAPMA2026,Paff2020]]','dev'],
 ['2017-12-08','Vercise (STN)','Boston Scientific Vercise approved for STN stimulation. [[FDAPMA2026]]','dev'],
 ['2018-12-16','FUS: PD tremor','Exablate unilateral Vim thalamotomy for tremor-dominant Parkinson\'s with medication-refractory tremor, age 30 or over. [[FDAPMA2026]]','fus'],
 ['2019-01-18','Cartesia directional','The Boston Scientific Vercise Cartesia lead: 8 contacts in a 1-3-3-1 pattern. [[FDAPMA2026,Paff2020]]','dev'],
 ['2020-06-24','Percept PC, sensing','Medtronic Percept PC, a pulse generator that can record brain signals from the lead. [[FDAPMA2026]]','dev'],
 ['2021-05-25','SenSight directional','The Medtronic SenSight directional lead. [[FDAPMA2026]]','dev'],
 ['2021-10-29','FUS: pallidotomy','Focused ultrasound unilateral pallidotomy for people aged 30 or over with medication-refractory moderate-to-severe motor complications. [[FDAPMA2026,Krishna2023]]','fus'],
 ['2025-02-20','Adaptive DBS','BrainSense Adaptive DBS (supplement P960009/S478), the first commercial closed-loop DBS, added to implanted Percept generators; announced 24 February 2025. [[FDAPMA2026,Medtronic2025]]','dev'],
 ['2025-07-03','FUS: tractotomy','Exablate unilateral pallidothalamic tractotomy for advanced Parkinson\'s with motor complications; a staged second side is allowed after at least 6 months. [[FDAPMA2026]]','fus']
];
const DB_SIM={on:45,off:70,on2:87};
const dbDrive=S=>.72+.16*Math.sin(2*Math.PI*S/23)+.07*Math.sin(2*Math.PI*S/6.1+1);

inits.dbs=()=>{
  /* ---- 1. the implant, the field and the rhythm ---- */
  const svg=$('#dbSvg'),rg=$('#dbT'),am=$('#dbAmp');
  let tgt='stn',adapt=false,fus=false,lead=0,steer=0;
  const D=38.8,R0=22;                               // capsule edge from the active contact; field radius per sqrt(mA)
  const thr=()=>Math.pow((D-(lead===2?steer*5.1:0))/R0,2);
  const H='paint-order:stroke;stroke:var(--field);stroke-width:3.5px;stroke-linejoin:round;';
  function sim(S,ad,Au){
    const Dv=dbDrive(S);
    if(fus)return {on:false,A:0,sup:0,P:Dv};
    const {on:S1,off:S2,on2:S3}=DB_SIM,ampAt=s=>ad?Au*clamp(.25+.75*ramp(dbDrive(s),.55,.9)):Au,eff=a=>.8*clamp(ramp(a,.5,2));
    let on=false,since=0;
    if(ad){on=S>=S1;since=S-S1}else if(S>=S1&&S<S2){on=true;since=S-S1}else if(S>=S3){on=true;since=S-S3}
    if(on){const A=ampAt(S)*ramp(since,0,2),sup=eff(A)*ramp(since,0,1.5);return {on,A,sup,P:Dv*(1-sup)}}
    if(!ad&&S>=S2&&S<S3){const sup=eff(ampAt(S2-.01))*(1-ramp(S-S2,12,15));return {on:false,A:0,sup,P:Dv*(1-sup)}}
    return {on:false,A:0,sup:0,P:Dv};
  }
  const TG={stn:[[108,154],[142,154]],gpi:[[85,134],[165,134]]},EN=[[80,20],[170,20]];
  function wire(off,a0){let d='';const pts=[];for(let a=a0;a>=-200;a-=4){const r=a*Math.PI/180;pts.push([125+(113+off)*Math.cos(r),126+(117+off)*Math.sin(r)])}
    pts.forEach((p,i)=>d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1]));
    return d+` C${f1(10-off)} 200 ${f1(70-off)} 226 ${f1(90-off)} 250 L${f1(90-off)} 300 C${f1(90-off)} 322 ${f1(76-off)} 330 ${f1(68-off)} 340`}
  function body(ox,oy,sc,t,p,cur,depth,showPulse){
    const fz=n=>`font-size:${f1(n/sc)}px`;
    let s=`<g transform="translate(${ox} ${oy}) scale(${sc})">`;
    s+=`<path d="M86 226 C86 250 84 270 80 288 C50 296 20 306 8 330 L8 430 L242 430 L242 330 C230 306 200 296 170 288 C166 270 164 250 164 226 Z" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<ellipse cx="125" cy="126" rx="110" ry="114" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.6"/>`;
    let d='';for(let i=0;i<=144;i++){const a=i/144*2*Math.PI,r=1+.03*Math.sin(a*16);d+=(i?'L':'M')+f1(125+98*r*Math.cos(a))+' '+f1(124+100*r*Math.sin(a))}
    s+=`<path d="${d}Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><path d="M125 24 V92" style="stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<path d="M90 80 Q125 66 160 80" style="fill:none;stroke:var(--cell-line);stroke-width:3"/>`;
    s+=`<path d="M121 84 C108 80 96 88 94 104 C104 100 114 99 121 104 Z M129 84 C142 80 154 88 156 104 C146 100 136 99 129 104 Z" style="fill:var(--csf);stroke:var(--cell-line);stroke-width:1"/>`;
    s+=`<path d="M92 92 L104 150 M158 92 L146 150" style="stroke:var(--panel-2);stroke-width:9;stroke-linecap:round"/>`;
    s+=`<ellipse cx="112" cy="124" rx="13" ry="17" style="fill:var(--panel-2);stroke:var(--cell-line)"/><ellipse cx="138" cy="124" rx="13" ry="17" style="fill:var(--panel-2);stroke:var(--cell-line)"/>`;
    s+=`<ellipse cx="66" cy="118" rx="12" ry="26" style="fill:var(--panel-2);stroke:var(--cell-line)"/><ellipse cx="184" cy="118" rx="12" ry="26" style="fill:var(--panel-2);stroke:var(--cell-line)"/>`;
    const hiG=tgt==='gpi',hiS=tgt==='stn',gl=p===0?.6+.4*Math.sin(t*120):.0;
    [[84,130],[166,130]].forEach(([x,y])=>{s+=`<ellipse cx="${x}" cy="${y}" rx="7" ry="17" style="fill:${hiG?'var(--sky-soft)':'var(--cell)'};stroke:${hiG?'var(--sky)':'var(--cell-line)'};stroke-width:${hiG?2:1}"/>`});
    [[108,154,20],[142,154,-20]].forEach(([x,y,r])=>{s+=`<ellipse cx="${x}" cy="${y}" rx="9" ry="4.5" transform="rotate(${r} ${x} ${y})" style="fill:${hiS?'var(--sky-soft)':'var(--cell)'};stroke:${hiS?'var(--sky)':'var(--cell-line)'};stroke-width:${hiS?2:1}"/>`});
    s+=`<path d="M96 164 q8 6 16 2 M138 166 q8 4 16 -2" style="fill:none;stroke:var(--ink);stroke-width:3;opacity:.35;stroke-linecap:round"/>`;
    if(gl>0)TG[tgt].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="13" style="fill:none;stroke:var(--sky);stroke-width:2.4;opacity:${f1(gl)}"/>`});
    s+=`<text x="18" y="96" class="t-xs" style="${H}${fz(9.5)};fill:${hiG?'var(--sky)':'var(--ink)'};font-weight:${hiG?700:500}">GPi</text><path d="M38 93 L79 126" style="stroke:var(--muted);stroke-width:.8"/>`;
    s+=`<text x="18" y="186" class="t-xs" style="${H}${fz(9.5)};fill:${hiS?'var(--sky)':'var(--ink)'};font-weight:${hiS?700:500}">STN</text><path d="M38 182 L101 157" style="stroke:var(--muted);stroke-width:.8"/>`;
    s+=`<text x="125" y="128" class="t-xs t-mid" style="${H}${fz(8)}">thalamus</text>`;
    const T=TG[tgt];
    if(!fus){
      EN.forEach(([ex,ey],i)=>{const [tx,ty]=T[i],ux=(tx-ex),uy=(ty-ey),ln=Math.hypot(ux,uy),dx=ux/ln,dy=uy/ln;
        s+=`<path d="M${ex} ${ey} L${tx} ${ty}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:${f1(1-depth)}"/>`;
        if(depth>0){const bx=lerp(ex,tx,depth),by=lerp(ey,ty,depth);
          s+=`<path d="M${ex} ${ey} L${f1(bx)} ${f1(by)}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round;opacity:.8"/>`;
          for(let k=0;k<4;k++)s+=`<path d="M${f1(bx-dx*(2+k*3.2))} ${f1(by-dy*(2+k*3.2))} l${f1(-dx*2)} ${f1(-dy*2)}" style="stroke:${cur.on?'var(--sky)':'var(--panel)'};stroke-width:3.4"/>`}
        s+=`<circle cx="${ex}" cy="${ey}" r="4" style="fill:var(--panel);stroke:var(--cell-line);stroke-width:1.4"/>`});
      const wv=ramp(t,.27,.34);
      if(wv>0){s+=`<g style="opacity:${f1(wv)}"><path d="${wire(0,-113.5)}" style="fill:none;stroke:var(--sky);stroke-width:2"/><path d="${wire(3.5,-66.5)}" style="fill:none;stroke:var(--sky);stroke-width:2"/>`;
        s+=`<rect x="38" y="340" width="56" height="40" rx="10" style="fill:var(--panel);stroke:var(--sky);stroke-width:2"/><text x="66" y="364" class="t-lbl t-mid" style="${fz(11)}">IPG</text>`;
        if(cur.on)s+=`<circle cx="86" cy="348" r="3.5" style="fill:var(--sky);opacity:${f1(.4+.6*Math.abs(Math.sin(t*300)))}"/>`;
        s+=`<text x="66" y="396" class="t-xs t-mid" style="${fz(9)}">pulse generator</text><text x="8" y="262" class="t-xs" style="${fz(8.5)}">extension</text><text x="8" y="273" class="t-xs" style="${fz(8.5)}">wire</text></g>`}
      if(showPulse&&wv>0)s+=pulses(112,344,128,48,cur,sc);
    } else {
      const so=ramp(t,.3,.44),les=ramp(t,.38,.46),[tx,ty]=T[1];
      s+=`<path d="${(()=>{let q='';for(let a=-168;a<=-12;a+=4){const r=a*Math.PI/180;q+=(a===-168?'M':'L')+f1(125+124*Math.cos(r))+' '+f1(126+128*Math.sin(r))}return q})()}" style="fill:none;stroke:var(--sky);stroke-width:7;stroke-dasharray:10 4;opacity:.75"/>`;
      if(so>0&&les<1)for(let k=0;k<9;k++){const r=(-160+k*18.5)*Math.PI/180,x=125+124*Math.cos(r),y=126+128*Math.sin(r);s+=`<path d="M${f1(x)} ${f1(y)} L${tx} ${ty}" style="stroke:var(--sky);stroke-width:1;opacity:${f1(.5*so*(1-les))}"/>`}
      if(les>0)s+=`<ellipse cx="${tx}" cy="${ty}" rx="${f1(6*les)}" ry="${f1(4.5*les)}" style="fill:var(--bad);opacity:.85"/>`;
      s+=`<text x="125" y="350" class="t-xs t-mid" style="${fz(9.5)};fill:var(--ink)">no implant: a lesion</text><text x="125" y="363" class="t-xs t-mid" style="${fz(9.5)};fill:var(--ink)">on one side only</text>`;
    }
    const [mx,my]=T[1];
    s+=`<rect x="${mx-14}" y="${my-12}" width="28" height="24" rx="4" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 2"/>`;
    return s+'</g>';
  }
  function pulses(x,y,w,h,cur,sc=1){
    const fz=n=>`font-size:${f1(n/sc)}px`,n=9,a=cur.on?cur.A/5:0;
    let s=`<text x="${x}" y="${y}" class="t-xs" style="${fz(9)};fill:var(--sky);font-weight:700">${cur.on?'130 Hz · 60 µs':'stimulation off'}</text>`;
    let d=`M${x} ${y+h}`;for(let i=0;i<n;i++){const px=x+6+i*(w-12)/n;d+=` H${f1(px)} V${f1(y+h-a*(h-14))} H${f1(px+3)} V${y+h}`}d+=` H${x+w}`;
    return s+`<path d="${d}" style="fill:none;stroke:var(--sky);stroke-width:1.6"/>`;
  }
  function zoom(ox,oy,W,Hh,t,cur,depth,Au){
    const cx=Math.round(W*.42),cy=112,cs=tgt==='stn'?1:-1,K=13;
    let s=`<g transform="translate(${ox} ${oy})"><defs><clipPath id="dbZc"><rect x="0" y="0" width="${W}" height="${Hh}" rx="10"/></clipPath>`+
      `<radialGradient id="dbVg"><stop offset="0" style="stop-color:var(--sky);stop-opacity:.6"/><stop offset="1" style="stop-color:var(--sky);stop-opacity:.1"/></radialGradient></defs>`;
    s+=`<rect x="0" y="0" width="${W}" height="${Hh}" rx="10" style="fill:var(--field);stroke:var(--line)"/><g clip-path="url(#dbZc)">`;
    const capX0=cs>0?cx+D:cx-D-52,capX1=capX0+52;
    s+=`<defs><clipPath id="dbCap"><rect x="${f1(capX0)}" y="22" width="52" height="${Hh-74}"/></clipPath></defs>`;
    // anatomy
    if(tgt==='stn'){
      s+=`<path d="M0 24 H${W} V${cy-46} C${W*.6} ${cy-30} ${W*.3} ${cy-40} 0 ${cy-34} Z" style="fill:var(--panel-2);opacity:.55"/><text x="12" y="${cy-44}" class="t-xs" style="${H}">thalamus</text>`;
      s+=`<ellipse cx="${cx+2}" cy="${cy+4}" rx="40" ry="21" transform="rotate(-24 ${cx+2} ${cy+4})" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
      s+=`<path d="M${cx-64} ${cy+52} q40 14 84 2" style="fill:none;stroke:var(--ink);stroke-width:7;opacity:.25;stroke-linecap:round"/><text x="${cx-70}" y="${cy+72}" class="t-xs" style="${H}">substantia nigra</text>`;
    } else {
      s+=`<ellipse cx="${cx+118}" cy="${cy-6}" rx="30" ry="66" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><text x="${cx+118}" y="${cy+76}" class="t-xs t-mid" style="${H}">putamen</text>`;
      s+=`<ellipse cx="${cx+62}" cy="${cy-2}" rx="22" ry="56" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><text x="${cx+62}" y="${cy+68}" class="t-xs t-mid" style="${H}">GPe</text>`;
      s+=`<ellipse cx="${cx+6}" cy="${cy+2}" rx="32" ry="46" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    }
    // motor territory: lights up with benefit
    const ben=cur.on?ramp(cur.A,.7,1.7):fus?ramp(t,.38,.46):0;
    const MT=tgt==='stn'?{x:cx+16,y:cy-2,rx:17,ry:10,r:-24}:{x:cx+10,y:cy+14,rx:18,ry:22,r:0};
    s+=`<ellipse cx="${MT.x}" cy="${MT.y}" rx="${MT.rx}" ry="${MT.ry}" transform="rotate(${MT.r} ${MT.x} ${MT.y})" style="fill:var(--good);opacity:${f1(.12+.4*ben)};stroke:var(--good);stroke-width:1;stroke-dasharray:3 2"/>`;
    // internal capsule
    s+=`<rect x="${f1(capX0)}" y="22" width="52" height="${Hh-74}" style="fill:var(--panel-2)"/>`;
    for(let i=-4;i<12;i++)s+=`<path d="M${f1(capX0+i*7)} 22 l18 ${Hh-74}" clip-path="url(#dbCap)" style="stroke:var(--cell-line);stroke-width:.8;opacity:.6"/>`;
    s+=`<text transform="translate(${f1(capX0+30)} ${f1(Hh*.42)}) rotate(-90)" class="t-xs t-mid" style="${H}fill:var(--ink)">internal capsule</text>`;
    // field (volume of tissue activated)
    const cxF=cx+(lead===2?cs*steer*5.1:0),A=cur.on?cur.A:0,r=R0*Math.sqrt(A),over=cur.on&&A>thr()&&!fus,ell=lead===2&&steer!==0;
    if(!fus&&depth>.98){
      if(cur.on&&A>.02){
        s+=`<ellipse cx="${f1(cxF)}" cy="${cy}" rx="${f1(r)}" ry="${f1(ell?r*.88:r)}" style="fill:url(#dbVg);stroke:var(--sky);stroke-width:1.6"/>`;
        if(over)s+=`<ellipse cx="${f1(cxF)}" cy="${cy}" rx="${f1(r)}" ry="${f1(ell?r*.88:r)}" clip-path="url(#dbCap)" style="fill:var(--bad);opacity:.55"/>`;
      } else if(t>.3){const rp=R0*Math.sqrt(Au);s+=`<ellipse cx="${f1(cxF)}" cy="${cy}" rx="${f1(rp)}" ry="${f1(ell?rp*.88:rp)}" style="fill:none;stroke:var(--sky);stroke-width:1.2;stroke-dasharray:4 4;opacity:.7"/>`}
    }
    if(fus){const ls=ramp(t,.38,.46);
      for(let k=0;k<5;k++){const x0=W*(.1+k*.2);s+=`<path d="M${f1(x0)} 0 L${cx} ${cy}" style="stroke:var(--sky);stroke-width:1.2;opacity:${f1(.45*ramp(t,.3,.36)*(1-ls))}"/>`}
      if(ls>0)s+=`<ellipse cx="${cx}" cy="${cy}" rx="${f1(24*ls)}" ry="${f1(19*ls)}" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="${cx}" y="${cy+4}" class="t-xs t-mid" style="${H}fill:var(--bad);font-weight:700;opacity:${f1(ls)}">lesion</text>`;
    }
    // the lead
    if(!fus){
      const off=(1-depth)*-(cy+90),pitch=lead===1?39:26,top=-10,lw=16.5,x0=cx-lw/2;
      const tipY=cy+pitch+9.75+5+off;
      s+=`<g>`;
      s+=`<path d="M${x0} ${top} V${f1(tipY-8)} Q${x0} ${f1(tipY)} ${cx} ${f1(tipY)} Q${x0+lw} ${f1(tipY)} ${x0+lw} ${f1(tipY-8)} V${top} Z" style="fill:var(--panel);stroke:var(--cell-line);stroke-width:1.4"/>`;
      for(let j=0;j<4;j++){const yc=cy+(1-j)*pitch+off,y0=yc-9.75,act=j===1,col=act&&cur.on?'var(--sky)':'var(--muted)';
        if(lead===2&&(j===1||j===2)){const segs=[[x0,4.1,-1],[cx-3.2,6.4,0],[x0+lw-4.1,4.1,1]];
          segs.forEach(([sx,sw,side])=>{const on=act&&(steer===0||(side!==0&&side===cs*steer));
            s+=`<rect x="${f1(sx)}" y="${f1(y0)}" width="${sw}" height="19.5" rx="1.5" style="fill:${on&&cur.on?'var(--sky)':act&&cur.on&&steer!==0?'var(--panel-2)':'var(--muted)'};opacity:${on||!act?1:.7}"/>`})}
        else s+=`<rect x="${x0}" y="${f1(y0)}" width="${lw}" height="19.5" rx="1.5" style="fill:${col}"/>`}
      if(lead===2)s+=`<path d="M${cx} ${f1(cy-2*pitch-26+off)} l-4 8 h8 z" style="fill:var(--warn)"/>`;
      s+=`</g>`;
      // annotations on the side away from the capsule
      if(depth>.98){const sx=cs>0?x0-8:x0+lw+8,an=cs>0?' t-end':'';
        s+=`<text x="${sx}" y="${cy-2*pitch-6}" class="t-xs${an}" style="${H}">lead 1.27 mm wide</text>`;
        s+=`<text x="${sx}" y="${cy+4}" class="t-xs${an}" style="${H}fill:${cur.on?'var(--sky)':'var(--ink)'}">${lead===2?(steer===0?'all 3 segments':steer<0?'segment facing away':'segment facing capsule'):'active contact'}</text>`;
        s+=`<text x="${sx}" y="${cy+16}" class="t-xs${an}" style="${H}">1.5 mm${lead===2?'':', spaced '+(lead===1?'1.5':'0.5')+' mm'}</text>`;
        if(lead===2)s+=`<text x="${sx}" y="${f1(cy-2*pitch-18)}" class="t-xs${an}" style="${H}fill:var(--warn)">orientation marker</text>`}
    }
    // labels
    const tl=tgt==='stn'?'STN':'GPi';
    s+=`<text x="${cs>0?cx-34:cx+20}" y="${cy+(tgt==='stn'?30:44)}" class="t-lbl${cs>0?' t-end':''}" style="${H}">${tl}</text>`;
    const ml=tgt==='stn'?[cx+24,cy+42]:[cx+12,cy+64];
    s+=`<path d="M${ml[0]} ${ml[1]-9} L${MT.x+2} ${MT.y+MT.ry-2}" style="stroke:var(--good);stroke-width:1"/><text x="${ml[0]}" y="${ml[1]}" class="t-xs t-mid" style="${H}fill:var(--good)">motor part</text>`;
    if(over){const wx=cs>0?capX0+6:capX1-6,an=cs>0?'':' t-end';['capsule reached:','muscle pulling,','slurred speech'].forEach((l,i)=>{s+=`<text x="${f1(wx)}" y="${40+i*12}" class="t-xs${an}" style="${H}fill:var(--bad);font-weight:${i?500:700}">${l}</text>`})}
    s+=`</g><text x="12" y="17" class="t-sm" style="${H}">TARGET, MAGNIFIED · ${tl}</text>`;
    s+=`<path d="M${W-16-2*K} 12 H${W-16}" style="stroke:var(--ink);stroke-width:2"/><text x="${W-16-K}" y="24" class="t-xs t-mid">2 mm</text>`;
    // amplitude scale with the published ranges
    const y0=Hh-30,xa=v=>22+v/5*(W-44);
    if(!fus){
      s+=`<rect x="${f1(xa(.7))}" y="${y0-9}" width="${f1(xa(1.7)-xa(.7))}" height="5" rx="2" style="fill:var(--good);opacity:.6"/><text x="${f1(xa(.7))}" y="${y0-13}" class="t-xs" style="fill:var(--good)">benefit 0.7–1.7</text>`;
      s+=`<rect x="${f1(xa(1.3))}" y="${y0+4}" width="${f1(xa(3.4)-xa(1.3))}" height="5" rx="2" style="fill:var(--bad);opacity:.5"/><text x="${f1(xa(3.4)+6)}" y="${y0+10}" class="t-xs" style="fill:var(--bad)">side effects 1.3–3.4</text>`;
      s+=`<path d="M${xa(0)} ${y0} H${xa(5)}" style="stroke:var(--cell-line);stroke-width:1.4"/>`;
      for(let v=0;v<=5;v++)s+=`<path d="M${f1(xa(v))} ${y0-2} v4" style="stroke:var(--cell-line)"/><text x="${f1(xa(v))}" y="${y0+21}" class="t-xs t-mid">${v}${v===5?' mA':''}</text>`;
      const th=thr();if(th<5)s+=`<path d="M${f1(xa(th))} ${y0-7} v14" style="stroke:var(--bad);stroke-width:2.4"/>`;
      const av=cur.on?cur.A:Au;
      s+=`<path d="M${f1(xa(av))} ${y0-1} l-5 -8 h10 z" style="fill:var(--sky)"/>`;
    } else s+=`<text x="${W/2}" y="${y0+4}" class="t-xs t-mid" style="fill:var(--ink)">no amplitude to adjust: the lesion is permanent</text>`;
    return s+'</g>';
  }
  function signal(ox,oy,W,Hh,S,ad,Au,cur){
    let s=`<g transform="translate(${ox} ${oy})"><rect x="0" y="0" width="${W}" height="${Hh}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="10" y="16" class="t-xs" style="fill:var(--ink)">${tgt.toUpperCase()} SIGNAL · SIMULATED</text>`;
    if(fus){s+=`<text x="${W/2}" y="${Hh/2}" class="t-xs t-mid" style="fill:var(--ink)">No lead, so nothing to record</text><text x="${W/2}" y="${Hh/2+14}" class="t-xs t-mid">or to adjust after the procedure.</text></g>`;return s}
    const hi=cur.P>.55;
    s+=`<text x="${W-10}" y="16" class="t-xs t-end" style="fill:${hi?'var(--violet)':'var(--good)'};font-weight:700">beta ${hi?'high':'low'}</text>`;
    const hr=Hh>180?64:40,yc=24+hr/2,amp=hr/2/1.75;
    let d='';for(let i=0;i<=240;i++){const s1=S-1+i/240,pw=sim(s1,ad,Au).P,v=pw*(Math.sin(2*Math.PI*21*s1)+.45*Math.sin(2*Math.PI*27.3*s1+.7)+.25*Math.sin(2*Math.PI*15.2*s1+2))+.12*Math.sin(2*Math.PI*71*s1)+.08*Math.sin(2*Math.PI*43*s1+1);
      d+=(i?'L':'M')+f1(10+i/240*(W-20))+' '+f1(yc-v*amp)}
    s+=`<path d="${d}" style="fill:none;stroke:var(--violet);stroke-width:1.3"/><text x="${W-10}" y="${24+hr+9}" class="t-xs t-end">last 1 s</text>`;
    s+=`<path d="M10 ${24+hr+6} h14" style="stroke:var(--violet);stroke-width:2.2"/><text x="28" y="${24+hr+9}" class="t-xs" style="fill:var(--violet)">beta power</text><path d="M96 ${24+hr+6} h14" style="stroke:var(--sky);stroke-width:1.6"/><text x="114" y="${24+hr+9}" class="t-xs" style="fill:var(--sky)">amplitude${ad&&cur.on?', adaptive':''}</text>`;
    const p0=24+hr+16,p1=Hh-20,X=s1=>10+(s1-(S-40))/40*(W-20),Yp=v=>lerp(p1,p0,clamp(v));
    s+=`<path d="M10 ${p1} H${W-10}" class="axis"/>`;
    let on=null;for(let s1=S-40;s1<=S+.01;s1+=.25){const c=sim(s1,ad,Au);if(c.on&&on==null)on=s1;if((!c.on||s1>S-.2)&&on!=null){s+=`<rect x="${f1(X(on))}" y="${p0}" width="${f1(X(s1)-X(on))}" height="${p1-p0}" style="fill:var(--sky);opacity:.13"/>`;on=null}}
    let dp='',da='';for(let i=0;i<=160;i++){const s1=S-40+i/4,c=sim(s1,ad,Au);dp+=(i?'L':'M')+f1(X(s1))+' '+f1(Yp(c.P));da+=(i?'L':'M')+f1(X(s1))+' '+f1(Yp(c.A/5))}
    if(ad&&cur.on)[.62,.45].forEach(v=>{s+=`<path d="M10 ${f1(Yp(v))} H${W-10}" style="stroke:var(--violet);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`});
    s+=`<path d="${da}" style="fill:none;stroke:var(--sky);stroke-width:1.6"/><path d="${dp}" style="fill:none;stroke:var(--violet);stroke-width:2.2"/>`;
    const {off:S2}=DB_SIM;
    if(!ad&&S>S2&&S-40<S2){const xa=X(S2),xb=X(Math.min(S2+12,S));s+=`<path d="M${f1(xa)} ${p0+6} V${p0+2} H${f1(xb)} V${p0+6}" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="${f1(xa<W-180?xa:W-10)}" y="${p0+18}" class="t-xs${xa<W-180?'':' t-end'}" style="${H}fill:var(--ink)">stim off: beta stays low ~12 s</text>`}
    s+=`<text x="10" y="${Hh-6}" class="t-xs">−40 s</text><text x="${W-10}" y="${Hh-6}" class="t-xs t-end">now</text>`;
    return s+'</g>';
  }
  function draw(t){
    const N=vb(svg,'720 440','400 846');
    const L=N?{body:[8,286,.74],z:[8,8,384,268],c:[8,624,384,214],mini:[206,300,.46],pu:[212,518,170,60]}
             :{body:[6,4,1],z:[262,8,450,262],c:[262,280,300,152],mini:[576,288,.35]};
    const p=phaseOf(DB_STEPS,t),S=t*120,ad=adapt||p===4,Au=+am.value,cur=sim(S,ad,Au),depth=ease(ramp(t,.18,.3));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // magnifier leaders
    const [mx,my]=TG[tgt][1],bx=L.body[0]+mx*L.body[2],by=L.body[1]+my*L.body[2],bh=12*L.body[2],bw=14*L.body[2];
    s+=N?`<path d="M${f1(bx-bw)} ${f1(by-bh)} L${L.z[0]+20} ${L.z[1]+L.z[3]} M${f1(bx+bw)} ${f1(by-bh)} L${L.z[0]+L.z[2]-20} ${L.z[1]+L.z[3]}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`
         :`<path d="M${f1(bx+bw)} ${f1(by-bh)} L${L.z[0]} ${L.z[1]+20} M${f1(bx+bw)} ${f1(by+bh)} L${L.z[0]} ${L.z[1]+L.z[3]-20}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
    s+=body(L.body[0],L.body[1],L.body[2],t,p,cur,depth,!N);
    s+=zoom(L.z[0],L.z[1],L.z[2],L.z[3],t,cur,depth,Au);
    s+=signal(L.c[0],L.c[1],L.c[2],L.c[3],S,ad,Au,cur);
    // the loop, small: overactive output settles as stimulation suppresses beta
    const base=ciAct(.85),A={...base},k=fus?ramp(t,.38,.46):cur.sup/.8;
    if(tgt==='stn'){A.stn=lerp(base.stn,CI_H.stn,k);A.gpi=lerp(base.gpi,CI_H.gpi,k*.9);A.th=lerp(base.th,CI_H.th,k*.85)}
    else{A.gpi=lerp(base.gpi,CI_H.gpi,k);A.th=lerp(base.th,CI_H.th,k*.9)}
    const sc=L.mini[2];
    s+=`<g transform="translate(${L.mini[0]} ${L.mini[1]}) scale(${sc})">`+ciBoxes({act:A,mini:true,fs:9/(13*sc),dbs:true,dbsOn:[tgt],t})+'</g>';
    if(N){s+=`<text x="${L.mini[0]}" y="${L.mini[1]-6}" class="t-xs">THE LOOP, WITH ${tgt.toUpperCase()} ${fus?'LESIONED':'STIMULATED'}</text>`;
      if(!fus)s+=pulses(L.pu[0],L.pu[1],L.pu[2],L.pu[3],cur);}
    svg.innerHTML=s;
    setSt(p);
    const over=cur.on&&cur.A>thr()&&!fus;
    $('#dbNote').innerHTML=fus?noteHTML(DB_FUSN):noteHTML(DB_STEPS[p])+(over?DB_CALL.warn:'')+(lead===2?DB_CALL.dir:'')+(tgt==='gpi'?DB_CALL.gpi:'')+(adapt&&p!==4?DB_CALL.adapt:'');
    $('#dbRead').innerHTML=fus?`Focused ultrasound · <b>${tgt.toUpperCase()}</b> lesion, one side`:`Amplitude <b>${cur.on?f1(cur.A):f1(Au)} mA</b>${cur.on?'':' (off)'} · Field <b>${!cur.on?'off':over?'reaching the capsule':ramp(cur.A,.7,1.7)>.5?'in the motor part':'small'}</b> · Beta <b>${cur.P>.55?'high':'low'}</b> · <b>${ad?'adaptive':'conventional'}</b>`;
    $('#dbCap').innerHTML=`Schematic. The lead and its contacts are drawn to scale with each other: 1.27 mm wide, 1.5 mm contacts [[Paff2020]]. Field size is illustrative. The amplitude scale shows published STN ranges, rigidity abolished at 0.7–1.7 mA and side effects at 1.3–3.4 mA [[Koeglsperger2019]]; the red tick is where this drawing's field reaches the capsule, which moves with steering, as directional stimulation widened the mean therapeutic window from 2.11 to 2.98 mA [[Schnitzler2022]]. The STN signal is simulated, not a recording.`;
  }
  const stop=playWire(rg,$('#dbPlay'),draw,22000,'Replay','dbs');
  const setSt=stepWire($('#dbSteps'),DB_STEPS,rg,draw,stop);
  const pr=(sel,v)=>$$(sel,$('#m-dbs')).forEach(b=>b.setAttribute('aria-pressed',v(b)));
  const re=()=>draw(+rg.value);
  $('#dbStn').onclick=()=>{tgt='stn';pr('#dbStn,#dbGpi',b=>b.id==='dbStn');re()};
  $('#dbGpi').onclick=()=>{tgt='gpi';pr('#dbStn,#dbGpi',b=>b.id==='dbGpi');re()};
  $('#dbConv').onclick=()=>{adapt=false;pr('#dbConv,#dbAdapt',b=>b.id==='dbConv');re()};
  $('#dbAdapt').onclick=()=>{adapt=true;pr('#dbConv,#dbAdapt',b=>b.id==='dbAdapt');re()};
  $('#dbFus').onclick=()=>{fus=!fus;$('#dbFus').setAttribute('aria-pressed',fus);re()};
  const setLead=v=>{lead=v;pr('[data-dblead]',b=>+b.dataset.dblead===v)};
  $$('[data-dblead]').forEach(b=>b.addEventListener('click',()=>{setLead(+b.dataset.dblead);re()}));
  $$('[data-dbsteer]').forEach(b=>b.addEventListener('click',()=>{steer=+b.dataset.dbsteer;pr('[data-dbsteer]',x=>+x.dataset.dbsteer===steer);if(steer!==0)setLead(2);re()}));
  const ampText=()=>am.setAttribute('aria-valuetext',`${(+am.value).toFixed(2)} milliamps`);
  am.addEventListener('input',()=>{ampText();re()});
  ampText();re();

  /* ---- 2. candidate checklist ---- */
  const ld=$('#dbLd'),du=$('#dbDur'),ag=$('#dbAge'),gs=$('#dbLdSvg');
  function gauge(v){
    vb(gs,'360 84','360 84');
    const X=x=>16+x/80*328;
    let s=`<rect x="16" y="38" width="328" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="16" y="38" width="${f1(X(v)-16)}" height="10" rx="5" style="fill:${v>=30?'var(--sky)':'var(--warn)'}"/>`;
    s+=`<path d="M${X(30)} 30 V56" style="stroke:var(--ink);stroke-width:2"/><text x="${X(30)+4}" y="24" class="t-xs" style="fill:var(--ink)">30% marker (2011 consensus)</text>`;
    s+=`<path d="M${X(33)} 34 V62" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${X(33)+4}" y="72" class="t-xs">33% CAPSIT-PD (unverified)</text>`;
    for(let x=0;x<=80;x+=20)s+=`<text x="${X(x)}" y="62" class="t-xs t-mid">${x}%</text>`;
    s+=`<path d="M${f1(X(v))} 36 l-5 -8 h10 z" style="fill:var(--sky)"/>`;
    gs.innerHTML=s;
  }
  const tag=(k,l)=>`<span class="tag ${k}">${l}</span>`;
  function cand(){
    const v=+ld.value,y=+du.value,a=+ag.value,C={};$$('[data-dbc]',$('#m-dbs')).forEach(c=>C[c.dataset.dbc]=c.checked);
    $('#dbLdV').textContent=v+'%';$('#dbDurV').textContent=y+(y===1?' year':' years');$('#dbAgeV').textContent=a;
    ld.setAttribute('aria-valuetext',v+'% improvement');du.setAttribute('aria-valuetext',y+' years since diagnosis');ag.setAttribute('aria-valuetext','age '+a);
    gauge(v);
    const R=[];
    if(v>=30)R.push(['good','In favour',`${v}% is at or above the 30% improvement on levodopa challenge that the 2011 consensus treats as a marker of levodopa response, "not an absolute criterion". [[Bronstein2011]]${v<33?' It is below the 33% often attributed to CAPSIT-PD, a threshold this guide could not verify. [[Defer1999]]':''}`]);
    else R.push(C.tr?['warn','Exception',`Below the 30% marker, but levodopa-resistant tremor is an accepted exception. [[Bronstein2011]]`]:['bad','Against',`Below the 30% marker of levodopa response; except for tremor, DBS treats mainly levodopa-responsive symptoms. [[Bronstein2011]]`]);
    if(y>=4)R.push(['good','In favour',`At least 4 years since diagnosis, as in the current US labelling. [[FDAPMA2026]]${y<5?' A 5-year minimum is often attributed to CAPSIT-PD (unverified). [[Defer1999]]':''}`]);
    else R.push(['warn','Caution',`Under the 4 years' duration in the current US labelling. [[FDAPMA2026]] EARLYSTIM participants averaged 7.5 years. [[Schuepbach2013]]`]);
    R.push(['sage','Age',`The consensus found no data for a clear age cut-off. [[Bronstein2011]] Deuschl 2006 enrolled people under 75; in Weaver 2009, 25% were 70 or over. [[Deuschl2006,Weaver2009]]`]);
    if(C.fl||C.dy)R.push(['good','In favour',`Medically intractable motor fluctuations are a core indication, and the MDS review rates STN and GPi DBS clinically useful for fluctuations and for dyskinesia. [[Bronstein2011,Fox2018]]`]);
    if(C.tr)R.push(['good','In favour',`Intractable tremor is a listed indication. [[Bronstein2011]]`]);
    if(C.si)R.push(['good','In favour',`Intolerance of medication side effects is a listed indication. [[Bronstein2011]]`]);
    if(!(C.fl||C.dy||C.tr||C.si))R.push(['warn','Caution',`None of the listed indications is ticked: fluctuations, tremor or intolerance of medicines. [[Bronstein2011]]`]);
    if(C.fz)R.push(['bad','Against',`Freezing and falls that do not respond to levodopa are not what DBS treats, and they often develop over time anyway. [[Bronstein2011]]`]);
    if(C.sp)R.push(['bad','Against',`Speech was the only motor item not improved at 5 years, and STN stimulation can worsen speech. [[Krack2003,Bronstein2011]]`]);
    if(C.de)R.push(['bad','Against',`Good candidates do not have significant active cognitive problems. [[Bronstein2011]]`]);
    if(C.ps)R.push(['bad','Against',`Good candidates do not have significant active psychiatric problems; postoperative depression is a factor associated with suicide after STN-DBS. [[Bronstein2011,Voon2008]]`]);
    if(C.at)R.push(['bad','Against',`Preoperative assessment includes excluding atypical parkinsonism. [[Lang2006]]`]);
    const g=R.filter(r=>r[0]==='good').length,b=R.filter(r=>r[0]==='bad').length,w=R.filter(r=>r[0]==='warn').length;
    const head=b?'Features the criteria count against':w?'Mostly in line, with cautions':'In line with the published criteria';
    $('#dbCand').innerHTML=`<div class="kicker">How this profile compares</div><h4>${head}</h4><p class="readout"><span>In favour <b>${g}</b></span><span>Caution <b>${w}</b></span><span>Against <b>${b}</b></span></p><ul class="db-list">${R.map(([k,l,txt])=>`<li>${tag(k,l)}<span>${txt}</span></li>`).join('')}</ul><p class="stage-cap">A study aid, not an assessment. Consensus lists age, other illnesses, neuropsychological and psychiatric status, the symptoms targeted and the response to medicines as factors weighed together by a specialist team; they are not added up as a score. [[Lang2006,Bronstein2011]]</p>`;
  }
  [ld,du,ag].forEach(r=>r.addEventListener('input',cand));
  $$('[data-dbc]',$('#m-dbs')).forEach(c=>c.addEventListener('change',cand));
  cand();

  /* ---- 3. trial cards ---- */
  $('#dbTrials').innerHTML=DB_TRIALS.map(T=>{const mx=Math.max(...T.bars.map(b=>b[3]||Math.abs(b[1])),1);
    const bars=T.bars.length?`<div class="db-bars">${T.bars.map(([l,v,u,den],i)=>`<div class="db-bar"><span>${l}</span><b>${v<0?'−'+(-v):v} ${u}</b><div class="tr"><i style="width:${f1(Math.max(0,v)/(den||mx)*100)}%;background:${i?'var(--muted)':'var(--sky)'}"></i></div></div>`).join('')}</div>`:'';
    return `<div class="card"><span class="ev ${T.ev[0]}">${T.ev[1]}</span><h4>${T.h}</h4><p class="stage-cap">${T.sub}</p>${bars}<p>${T.txt}</p></div>`}).join('');

  /* ---- 4. focused ultrasound and infusions ---- */
  $('#dbFusCards').innerHTML=`
   <div class="card"><span class="ev est">Randomised</span><h4>Thalamus (Vim), for tremor</h4><p>In 27 people with tremor-dominant Parkinson's, randomised 2:1 to a one-sided lesion or sham, on-medication tremor improved a median 62% against 22% at 3 months; 26 of the 27 were men. Two people (8%) had early mild weakness from internal-capsule heating; lasting effects were numbness or tingling around the mouth (20%), in the fingers (5%) and unsteadiness (5%). [[Bond2017]] FDA approval: 16 December 2018. [[FDAPMA2026]]</p></div>
   <div class="card"><span class="ev est">Randomised</span><h4>GPi, for motor complications</h4><p>In 94 people randomised 3:1 to a one-sided pallidal lesion or sham, 69% against 32% responded at 3 months; 30 of 39 assessed responders still responded at 12 months. Adverse events included slurred speech, gait disturbance, loss of taste, visual disturbance and facial weakness. [[Krishna2023]] FDA approval: 29 October 2021. [[FDAPMA2026]]</p></div>
   <div class="card"><span class="ev est">Randomised</span><h4>STN, for asymmetric Parkinson's</h4><p>In 40 people randomised 2:1, the more affected side's off-medication motor score fell from 19.9 to 9.9 with a lesion against 18.7 to 17.1 with sham, a difference of 8.1 points. Speech disturbance (15 of 27), gait disturbance (13) and off-medication dyskinesia (6) were common; some deficits persisted at 12 months in 6 people. [[MartinezFernandez2020]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Why one side, and the second side</h4><p>DBS remains the procedure of choice on both sides because adjustable stimulation is safer than a lesion. [[Lozano2019]] In 6 people given staged lesions in both STN a median 3.2 years apart, off-medication motor scores improved 52.6% after the second side; speech disturbance occurred in 4. [[MartinezFernandez2024]] The 2025 tractotomy approval allows a staged second side after at least 6 months. [[FDAPMA2026]]</p></div>`;
  $('#dbInf').innerHTML=`
   <div class="card"><span class="ev est">Randomised</span><h4>Levodopa-carbidopa intestinal gel</h4><p>Pumped into the small intestine through a tube in the abdominal wall (PEG-J), it cut off-time by 4.04 h a day against 2.14 h on oral levodopa-carbidopa; most adverse events were tube-related. [[Olanow2014]] US approval (Duopa) on 9 January 2015; the label lists a generalised polyneuropathy in 5% of trial patients. [[DrugsFDA2026F]] The MDS review rates it clinically useful for motor fluctuations. [[Fox2018]]</p></div>
   <div class="card"><span class="ev est">Randomised</span><h4>Foslevodopa-foscarbidopa under the skin</h4><p>A 24-hour subcutaneous infusion raised on-time without troublesome dyskinesia by 2.72 h against 0.97 h on oral treatment; infusion-site reactions were common and 22% stopped for adverse events. [[Soileau2022]] US approval (Vyalev) on 16 October 2024. [[DrugsFDA2026F]] NICE recommends it when apomorphine or DBS cannot be used or no longer control symptoms. [[NICE2017]]</p></div>
   <div class="card"><span class="ev est">Randomised</span><h4>Apomorphine infusion</h4><p>A waking-day subcutaneous apomorphine infusion cut off-time by 2.47 h a day against 0.58 h on placebo. [[Katzenschlager2018]] US approval (Onapgo) on 3 February 2025. [[DrugsFDA2026F]]</p></div>
   <div class="card"><span class="ev early">Not approved in the US</span><h4>ND0612</h4><p>A continuous subcutaneous levodopa-carbidopa infusion gave 1.72 h more on-time than oral treatment, in a trial where both arms started on the infusion. [[Espay2024]] The FDA issued a second complete response letter in October 2025. [[PharmaLetter2025]]</p></div>`;

  /* ---- 5. the approval timeline ---- */
  const tl=$('#dbTl'),tr=$('#dbTlT');
  const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const EV=DB_TL.map(([d,ti,txt,k])=>{const [y,m,dd]=d.split('-').map(Number);return {yr:y+(m-1)/12+(dd-1)/365,date:`${dd} ${MON[m-1]} ${y}`,ti,txt,k,y}});
  // lanes for the wide layout: alternate above and below, never overlapping in a lane
  /* the wide axis is broken between 2003 and 2014, where nothing was approved */
  const XW=y=>y<=2003?30+(y-1996)/7*100:y<2014.5?130+(y-2003)/11.5*40:170+(y-2014.5)/11.5*520,last={};
  EV.forEach(e=>{const x=XW(e.yr),w=Math.max(e.ti.length,11)*5.7+6,endA=x>560,a=endA?x-w:x-4,b=endA?x+4:x+w;
    for(const ln of [-1,1,-2,2,-3,3]){if(last[ln]==null||last[ln]<a-6){last[ln]=b;e.lane=ln;e.endA=endA;break}}
    if(e.lane==null){e.lane=3;e.endA=endA}});
  function drawTl(t){
    const N=vb(tl,'720 250','400 640'),Y=1996+t*30.2;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const shown=EV.filter(e=>e.yr<=Y),curE=shown[shown.length-1];
    const col=e=>e.k==='fus'?'var(--bad)':'var(--sky)';
    if(!N){
      s+=`<path d="M30 125 H136 M164 125 H690" style="stroke:var(--cell-line);stroke-width:2"/><path d="M138 132 l6 -14 M156 132 l6 -14" style="stroke:var(--cell-line);stroke-width:1.6"/>`;
      [2000,2015,2017,2019,2021,2023,2025].forEach(y=>{s+=`<path d="M${f1(XW(y))} 121 v8" style="stroke:var(--cell-line)"/><text x="${f1(XW(y))}" y="143" class="t-xs t-mid" style="${H}">${y}</text>`});
      s+=`<path d="M${f1(XW(Math.min(Y,2026)))} 112 V138" style="stroke:var(--ink);stroke-width:2;opacity:.5"/>`;
      EV.forEach(e=>{const x=XW(e.yr),on=e.yr<=Y,isC=e===curE,up=e.lane<0,dy=up?125+e.lane*28-12:125+e.lane*28+18,an=e.endA?' t-end':'',lx=e.endA?x+3:x-3;
        s+=`<g style="opacity:${on?1:.22}"><path d="M${f1(x)} 125 V${f1(up?dy+14:dy-10)}" style="stroke:${col(e)};stroke-width:1;opacity:.6"/>`;
        s+=`<circle cx="${f1(x)}" cy="125" r="${isC?7:5}" style="fill:${e.k==='ind'?'var(--field)':col(e)};stroke:${col(e)};stroke-width:2"/>`;
        if(isC)s+=`<circle cx="${f1(x)}" cy="125" r="11" style="fill:none;stroke:${col(e)};stroke-width:1.4"/>`;
        s+=`<text x="${f1(lx)}" y="${f1(dy)}" class="t-xs${an}" style="${H}">${e.date.replace(/^\d+ /,'').replace(/(\w{3})\w+ /,'$1 ')}</text><text x="${f1(lx)}" y="${f1(dy+11)}" class="t-xs${an}" style="${H}fill:var(--ink);font-weight:700">${e.ti}</text></g>`});
    } else {
      const YV=y=>y<=2003?40+(y-1996)/7*70:y<2014.5?110+(y-2003)/11.5*30:140+(y-2014.5)/11.5*450;
      const sl=EV.map(e=>YV(e.yr)+4);for(let i=1;i<sl.length;i++)sl[i]=Math.max(sl[i],sl[i-1]+31);for(let i=sl.length-1;i>=0;i--)sl[i]=Math.min(sl[i],i<sl.length-1?sl[i+1]-31:612);
      s+=`<path d="M60 30 V112 M60 138 V600" style="stroke:var(--cell-line);stroke-width:2"/><path d="M53 118 l14 -5 M53 133 l14 -5" style="stroke:var(--cell-line);stroke-width:1.6"/>`;
      [2000,2015,2017,2019,2021,2023,2025].forEach(y=>{s+=`<path d="M56 ${f1(YV(y))} h8" style="stroke:var(--cell-line)"/><text x="50" y="${f1(YV(y)+3.5)}" class="t-xs t-end">${y}</text>`});
      s+=`<path d="M52 ${f1(YV(Math.min(Y,2026)))} H70" style="stroke:var(--ink);stroke-width:2;opacity:.5"/>`;
      EV.forEach((e,i)=>{const y=YV(e.yr),sy=sl[i]-6,on=e.yr<=Y,isC=e===curE;
        s+=`<g style="opacity:${on?1:.22}"><path d="M60 ${f1(y)} L74 ${f1(y)} L84 ${f1(sy-3)} H88" style="fill:none;stroke:${col(e)};stroke-width:1;opacity:.6"/>`;
        s+=`<circle cx="60" cy="${f1(y)}" r="${isC?6.5:4.5}" style="fill:${e.k==='ind'?'var(--field)':col(e)};stroke:${col(e)};stroke-width:2"/>`;
        s+=`<text x="92" y="${f1(sy)}" class="t-xs">${e.date}</text><text x="92" y="${f1(sy+12)}" class="t-xs" style="fill:var(--ink);font-weight:700">${e.ti}</text></g>`});
    }
    tl.innerHTML=s;
    tr.setAttribute('aria-valuetext',`Year ${Math.floor(Math.min(Y,2025))}${curE?': '+curE.ti:''}`);
    $('#dbTlNote').innerHTML=curE?noteHTML({k:curE.date,t:curE.ti,txt:curE.txt,pt:curE.k==='fus'?'A focused ultrasound lesion: no implant, one side.':curE.k==='ind'?'A change in who the device is approved for.':'A new device or part.'}):noteHTML({k:'Before 1997',t:'No approved DBS yet',txt:'Press play to add each US approval in order. [[FDAPMA2026]]'});
  }
  playWire(tr,$('#dbTlPlay'),drawTl,14000,'Replay','dbs');
  const prev=redraws.dbs;redraws.dbs=()=>{prev&&prev();drawTl(+tr.value)};
  drawTl(+tr.value);
};
