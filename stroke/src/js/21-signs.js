/* =============== 2.1 Recognising stroke =============== */
/* Main scrubber: BE-FAST, one sign per step, drawn with faceGlyph and armsGlyph. Then a sensitivity and specificity
   explorer, the PRESTO AUC bars, mimic and missed-stroke charts, and the mobile unit and direct-transport scrubber.
   Numbers come from research pass D. sgHB, sgLines and sgFit are also used by the imaging and NIHSS modules. */
const SG_STEPS=[
 {from:0,at:.08,k:'B · Balance',t:'Balance',letter:'B',head:'Sudden loss of balance',
  lines:['Walking or standing suddenly goes wrong.','Of people with no FAST sign, 42% had gait','imbalance or leg weakness.'],
  txt:`In 736 people with ischaemic stroke at one US centre, 14.1% had no FAST symptom at presentation. Of these, 42% had gait imbalance or leg weakness and 40% had visual symptoms; 70% had either [[Aroor2017]].`,
  pt:`Sudden loss of balance can be a stroke, even if the face, arm and speech seem fine [[Aroor2017]].`,
  hook:`FAST misses about 14% of ischaemic strokes. Adding balance and eyes reduced this to 4.4%, in a retrospective study [[Aroor2017]].`},
 {from:1/6,at:.25,k:'E · Eyes',t:'Eyes',letter:'E',head:'Sudden change in sight',
  lines:['Part of the view can go dark or be lost.','Of people with no FAST sign, 40% had','visual symptoms.'],
  txt:`Visual symptoms were present in 40% of people with stroke and no FAST symptom [[Aroor2017]]. In 46 people with MRI-confirmed posterior circulation stroke, sensitivity was 97.8% for BE-FAST and 58.7% for FAST, so FAST alone would have missed 18 of 46 (39.1%). Specificity fell from 39.8% to 10.0% [[Tanglay2024]].`,
  pt:`A sudden change in sight can be a stroke too [[Aroor2017]].`},
 {from:2/6,at:.42,k:'F · Face',t:'Face',letter:'F',head:'One side of the face droops',
  lines:['Ask for a smile: one corner of the mouth','stays low. Facial droop is one of the three','items of the Cincinnati scale.'],
  txt:`FAST checks face, arm and speech, with time as the prompt to act. In a 6-month audit of 487 people admitted with suspected stroke, paramedics using it were correct in 144 of 183 people with stroke (79%) [[Harbison2003]]. Facial droop is also a CPSS item [[Kothari1999]].`,
  pt:`If a face droops, even for a short time, treat it as an emergency and call an ambulance [[Harbison2003,Ekundayo2013]].`},
 {from:3/6,at:.58,k:'A · Arm',t:'Arm',letter:'A',head:'One raised arm sinks',
  lines:['Both arms are held out. One drifts down and','turns in. The dashed line shows where it','began.'],
  txt:`Arm weakness is a CPSS item. Any one abnormal CPSS item, as judged by a physician, gave sensitivity 66% and specificity 87% for stroke, rising to 88% sensitivity for anterior circulation stroke. Paramedic and EMT reproducibility for the total score: intraclass correlation 0.89, in a convenience sample of 171 people [[Kothari1999]].`,
  pt:`If one arm is weak or will not stay up, treat it as an emergency and call an ambulance [[Harbison2003,Ekundayo2013]].`},
 {from:4/6,at:.75,k:'S · Speech',t:'Speech',letter:'S',head:'Speech goes wrong',
  lines:['Words may slur, break up or come out wrong.','Speech is the third item of the Cincinnati','scale.'],
  txt:`Speech is the third CPSS item [[Kothari1999]], and speech disturbance scores in ROSIER [[Nor2005]]. Aphasia, with gaze deviation and neglect, was a significant indicator of large vessel occlusion across tools [[Antipova2019]].`,
  pt:`If speech goes wrong, even for a short time, treat it as an emergency and call an ambulance [[Harbison2003,Ekundayo2013]].`},
 {from:5/6,at:.93,k:'T · Time',t:'Time',letter:'T',head:'Call your local emergency number',
  lines:['A modelled large vessel stroke loses about','1.9 million neurons a minute. Paramedics got','46% of people in within 3 hours; primary','care doctors 12%.'],
  txt:`Call emergency services [[Harbison2003,Ekundayo2013]]. Paramedics admitted 46% of people within 3 hours of onset, against 12% for primary care doctors (P&lt;0.01) [[Harbison2003]]. The 1.9 million neurons a minute is a modelled estimate [[Saver2006]]. Note the time the person was last known well.`,
  pt:`People who arrive by ambulance tend to be scanned and treated faster than people who arrive another way [[Ekundayo2013]].`,
  hook:`EMS arrival is independently associated with onset-to-door of 3 hours or less, adjusted OR 2.00 [[Ekundayo2013]].`}
];
/* wrap a string to lines of at most n characters, for SVG text */
function sgLines(s,n){const out=[];let l='';s.split(' ').forEach(w=>{if(l&&(l.length+w.length+1)>n){out.push(l);l=w}else l=l?l+' '+w:w});if(l)out.push(l);return out}
function sgFit(svg,w,h){svg.setAttribute('viewBox',`0 0 ${w} ${Math.ceil(h)}`)}
/* horizontal bars: rows [{l,v,v0,txt,col,head}]; a head row is a subheading. In narrow mode the label sits above the bar.
   v0 draws a range from v0 to v. p reveals. Returns {svg,h}. */
function sgHB(x,y,w,rows,o={}){const N=o.N,mx=o.max||100,lw=N?0:(o.lw||210),bw=w-lw-(o.pad||96),rh=N?(o.rhN||42):(o.rh||30),p=o.p==null?1:o.p;let s='',yy=y;
  rows.forEach((r,i)=>{if(r.head){if(i)yy+=8;s+=`<text x="${f1(x)}" y="${f1(yy+13)}" class="t-lbl">${r.head}</text>`;yy+=N?26:28;return}
    const by=N?yy+16:yy,X=v=>x+lw+bw*v/mx,u=ease(clamp(p*1.2-i*.03)),v=(r.v0||0)+(r.v-(r.v0||0))*u,b0=r.v0?X(r.v0):x+lw,b1=X(v);
    if(N)s+=`<text x="${f1(x)}" y="${f1(yy+11)}" class="t-sm" style="fill:var(--ink)">${r.l}</text>`;
    else s+=`<text x="${f1(x+lw-10)}" y="${f1(by+13)}" class="t-sm t-end" style="fill:var(--ink)">${r.l}</text>`;
    s+=`<rect x="${f1(b0)}" y="${f1(by+1)}" width="${f1(Math.max(1,b1-b0))}" height="16" rx="3" style="fill:${r.col||'var(--dx)'}"/>`;
    s+=`<text x="${f1(b1+6)}" y="${f1(by+13)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(p,.5,.9))}">${r.txt}</text>`;
    yy+=rh});
  return {svg:s,h:yy-y}}
const SG_ACC={
 rec:{name:'Stroke or not?',pres:[{v:70,l:'70: stroke team, 30% mimics',c:`Merino: 30% of 8187 people seen by a stroke team over 10 years were mimics [[Merino2013]].`},{v:34,l:'34: nursing home, 66% mimics',c:`In 419 nursing home residents with suspected stroke, 66% were mimics [[Buck2021]].`}],prev:70,
  pts:[{n:1,s:'FAST UK',name:'FAST, independent UK cohort',se:81,sp:39,c:`Sensitivity 81% (76 to 86), specificity 39% (30 to 48), in 356 people [[Whiteley2011]].`},
   {n:2,s:'ROSIER UK',name:'ROSIER, the same UK cohort',se:83,sp:44,c:`Sensitivity 83% (78 to 87), specificity 44% (34 to 53). No detectable difference from FAST; the authors concluded the simpler FAST could replace it in the emergency department [[Whiteley2011]].`},
   {n:3,s:'ROSIER',name:'ROSIER, derivation team',se:93,sp:83,c:`Sensitivity 93% (89 to 97), specificity 83% (77 to 89), PPV 90%, NPV 88%, in 173 referrals [[Nor2005]]. Compare point 2: the same scale, nearly half the specificity in an independent cohort.`},
   {n:4,s:'LAPSS field',name:'LAPSS, paramedic field validation',se:91,sp:97,c:`Sensitivity 91% (76 to 98), specificity 97% (93 to 99), PPV 86%, NPV 98% [[Kidwell2000]].`},
   {n:5,s:'LAPSS pool',name:'LAPSS, Cochrane pooled prehospital',se:83,sp:93,c:`Sensitivity 0.83 (0.75 to 0.89), specificity 0.93 (0.88 to 0.96). The authors were uncertain of these results because of risk of bias [[Zhelev2019]].`},
   {n:6,s:'CPSS',name:'CPSS, any one item, physician judged',se:66,sp:87,c:`Sensitivity 66%, specificity 87%, in a convenience sample of 171 people, 49 with stroke or TIA [[Kothari1999]].`},
   {n:7,s:'FABS',name:'FABS, a scale for separating mimics',se:90,sp:91,c:`Best of the scales for separating mimics, 90% and 91%; across those scales sensitivity ran 44 to 91% and specificity 27 to 98% [[Antipova2019]].`}]},
 post:{name:'Posterior stroke',pres:[{v:28,l:'28: 46 of 164 in this series',c:`In this series 46 of 164 people with MRI-confirmed infarcts had posterior circulation stroke, about 28 in 100 [[Tanglay2024]].`}],prev:28,
  pts:[{n:1,s:'FAST',name:'FAST, posterior circulation',se:58.7,sp:39.8,c:`Sensitivity 58.7%, specificity 39.8%, in 164 people with MRI-confirmed infarcts. FAST alone would have missed 18 of 46 [[Tanglay2024]].`},
   {n:2,s:'BE-FAST',name:'BE-FAST, posterior circulation',se:97.8,sp:10.0,c:`Sensitivity 97.8%, specificity 10.0% [[Tanglay2024]]. It catches nearly all, and flags nearly everyone. Note that everyone in this series had an infarct, so specificity here can only mean correctly labelling an anterior infarct as not posterior.`}]},
 lvo:{name:'Large vessel occlusion?',box:{sp0:80,sp1:93,se0:38,se1:62,l:'7 scales, regional stroke codes'},pres:[{v:21,l:'21: RACE field series',c:`LVO prevalence 21% in 357 people in the field [[PerezDeLaOssa2014]].`},{v:12,l:'12: PRESTO',c:`12% with anterior LVO among 1039 FAST-positive people [[Duvekot2021]].`},{v:8,l:'8: Dutch stroke codes',c:`7.9% with anterior LVO in 2007 stroke codes, shown here as 8 [[Nguyen2021]].`}],prev:21,
  pts:[{n:1,s:'RACE 5+',name:'RACE of 5 or more',se:85,sp:68,c:`Sensitivity 0.85, specificity 0.68, PPV 0.42, NPV 0.94 at 21% prevalence [[PerezDeLaOssa2014]].`},
   {n:2,s:'LAMS 4+',name:'LAMS of 4 or more',se:81,sp:89,c:`Sensitivity 0.81, specificity 0.89, accuracy 0.85, in 119 people of whom 62% had persisting LVO: a very different prevalence from a field series [[Nazliel2008]].`},
   {n:3,s:'VAN',name:'VAN, pilot study',se:100,sp:90,c:`Sensitivity 100%, specificity 90%, in only 62 code strokes with 14 LVOs. The authors call for a larger validation [[Teleb2017]].`}]}
};
const SG_AUC=[['NIHSS, clinician',.86],['RACE',.83],['G-FAST',.80],['CG-FAST',.80],['LAMS',.79],['CPSS',.79],['PASS',.76],['C-STAT',.75],['FAST-PLUS',.72]];
const SG_MIM={
 many:{cap:`A mimic share of 26% is derived from 74% confirmed stroke (95% CI 66 to 83) across 29 studies with significant heterogeneity [[Gibson2013]]. Sources: 411 people in an emergency department [[Libman1995]]; 23 to 29% by referral route [[Harbison2003]]; 8187 people seen by a stroke team [[Merino2013]]; 350 presentations, including 44 labelled "possible stroke or TIA" [[Hand2006]]; 419 nursing home residents [[Buck2021]].`,
  rows:[{l:'Emergency series, Libman',v:19,txt:'19%'},{l:'By referral route, Harbison',v0:23,v:29,txt:'23 to 29%'},{l:'29 studies, Gibson (derived)',v:26,txt:'26%'},{l:'Stroke team, Merino',v:30,txt:'30%'},{l:'Presentations, Hand',v:31,txt:'31%'},{l:'Nursing home residents',v:66,txt:'66%',col:'var(--accent)'}]},
 what:{cap:`Across studies the five most frequent non-stroke diagnoses were seizure, syncope, sepsis, migraine and brain tumours [[Gibson2013]]. The mix depends on setting: the ROSIER series [[Nor2005]], 429 mimics given thrombolysis in a registry of 10,436 (4.1%), and nursing home residents, the last two as reported in a review [[Buck2021]].`,
  rows:[{head:'ROSIER derivation, share of mimics'},{l:'Seizures',v:23,txt:'23%'},{l:'Syncope',v:23,txt:'23%'},{l:'Sepsis',v:10,txt:'10%'},{head:'Mimics given thrombolysis, registry'},{l:'Functional disorder',v:30.8,txt:'30.8%',col:'var(--accent)'},{l:'Migraine',v:17.5,txt:'17.5%',col:'var(--accent)'},{l:'Seizures',v:14.2,txt:'14.2%',col:'var(--accent)'},{head:'Nursing home residents, share of suspected strokes'},{l:'Infections',v:24,txt:'24%',col:'var(--prev)'},{l:'Seizures',v:20,txt:'20%',col:'var(--prev)'}]}
};
const SG_MISS=[
 {h:'False-negative rate: dizziness or motor findings',a:['Dizziness',39.4],b:['Motor findings',4.4]},
 {h:'False-negative rate: SAH, by mental state',a:['Normal mental state',23.8],b:['Abnormal mental state',4.2]},
 {h:'False-discovery rate: TIA or ischaemic stroke',a:['TIA',59.7],b:['Ischaemic stroke',11.7]},
 {h:'Initially misdiagnosed: by territory',a:['Posterior',37],b:['Anterior',16]}];
const SG_SEX=[['Motor deficit',56,56],['Speech deficit',41,40],['Generalised nonspecific weakness',49,36],['Mental status change',31,21],['Confusion',37,28],['Ataxia',30,44],['Dysarthria',27,32]];
const SG_TR={
 msu:{cap:`<b>BEST-MSU.</b> Median onset-to-t-PA 72 vs 108 minutes, and 97.1% vs 79.5% of eligible people received t-PA. At 90 days, mRS 0 to 1 in 55.0% vs 44.4%, mortality 8.9% vs 11.9%. Alternating weeks, not individually randomised [[Grotta2021]].`,
  rows:[{l:'mRS 0 to 1, mobile unit',v:55,txt:'55.0%'},{l:'mRS 0 to 1, usual care',v:44.4,txt:'44.4%',col:'var(--muted)'},{l:'Mortality, mobile unit',v:8.9,txt:'8.9%'},{l:'Mortality, usual care',v:11.9,txt:'11.9%',col:'var(--muted)'}]},
 dt:{cap:`<b>RACECAT.</b> Direct transport lowered intravenous thrombolysis and raised thrombectomy, but median mRS was 3 in both arms and 90-day mortality was 27.3% vs 27.2%. Nonurban Catalonia; stopped for futility [[Perez2022]]. A model finds the answer depends on local times at both centres [[Holodinsky2018]].`,
  rows:[{l:'Thrombolysis, direct',v:47.5,txt:'47.5%'},{l:'Thrombolysis, local first',v:60.4,txt:'60.4%',col:'var(--muted)'},{l:'Thrombectomy, direct',v:48.8,txt:'48.8%'},{l:'Thrombectomy, local first',v:39.4,txt:'39.4%',col:'var(--muted)'},{l:'Mortality, direct',v:27.3,txt:'27.3%'},{l:'Mortality, local first',v:27.2,txt:'27.2%',col:'var(--muted)'}]}
};
function sgVan(x,y,o={}){const c=o.col||'var(--dx)';return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-26" y="-22" width="36" height="20" rx="3" style="fill:var(--panel);stroke:${c};stroke-width:1.8"/><path d="M10 -18h8l8 8v8H10z" style="fill:var(--panel);stroke:${c};stroke-width:1.8;stroke-linejoin:round"/><path d="M-11 -17v10M-16 -12h10" style="stroke:${c};stroke-width:2.4"/><circle cx="-16" cy="-1" r="4.5" style="fill:var(--ink)"/><circle cx="16" cy="-1" r="4.5" style="fill:var(--ink)"/></g>`}
function sgHosp(x,y,l,o={}){const c=o.col||'var(--muted)';return `<g><rect x="${f1(x-22)}" y="${f1(y-36)}" width="44" height="36" rx="3" style="fill:var(--panel-2);stroke:${c};stroke-width:1.6"/><path d="M${f1(x)} ${f1(y-30)}v14M${f1(x-7)} ${f1(y-23)}h14" style="stroke:${c};stroke-width:3"/>${(ls=>ls.map((q,i)=>`<text x="${f1(x)}" y="${f1(y-42-(ls.length-1-i)*12)}" class="t-xs t-mid" style="fill:var(--ink)">${q}</text>`).join(''))(sgLines(l,o.n||16))}</g>`}
inits.signs=()=>{
  /* ---------- main: BE-FAST ---------- */
  const svg=$('#sgSvg'),rg=$('#sgT'),note=$('#sgNote');let setSt=()=>{};
  function strip(L,p){let s='';const w=L.w/6;
    SG_STEPS.forEach((q,i)=>{const x=L.x+i*w,on=i===p;
      s+=`<rect x="${f1(x+2)}" y="${L.y}" width="${f1(w-4)}" height="38" rx="8" style="fill:${on?'var(--dx)':i<2?'var(--dx-soft)':'var(--panel-2)'};stroke:${on?'var(--dx)':'var(--line)'}"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${L.y+26}" class="t-mid" style="font:700 22px var(--display);fill:${on?'var(--bg)':'var(--ink)'}">${q.letter}</text>`;
      s+=`<text x="${f1(x+w/2)}" y="${L.y+52}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.t}</text>`});
    const by=L.y+60;
    s+=`<path d="M${f1(L.x+4)} ${by}h${f1(2*w-8)}" style="stroke:var(--dx);stroke-width:2"/><text x="${f1(L.x+w)}" y="${by+13}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">added: BE</text>`;
    s+=`<path d="M${f1(L.x+2*w+4)} ${by}h${f1(4*w-8)}" style="stroke:var(--muted);stroke-width:2"/><text x="${f1(L.x+4*w)}" y="${by+13}" class="t-xs t-mid">the original FAST</text>`;
    return s}
  function scene(p,u,c,tt){let s='';const cx=c.x,cy=c.y,R=c.r;
    if(p===0){const a=Math.sin(u*Math.PI*9)*(3+13*ramp(u,.1,.8)),fy=cy+R*.92,k=R*1.5;
      s+=`<path d="M${f1(cx-R)} ${f1(fy)}H${f1(cx+R)}" style="stroke:var(--muted);stroke-width:2"/><path d="M${f1(cx)} ${f1(cy-R)}V${f1(fy)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4"/>`;
      s+=`<g transform="rotate(${f1(a)} ${f1(cx)} ${f1(fy)})"><path d="M${f1(cx-k*.1)} ${f1(cy+k*.3)}L${f1(cx-k*.14)} ${f1(fy)}M${f1(cx+k*.1)} ${f1(cy+k*.3)}L${f1(cx+k*.14)} ${f1(fy)}" style="stroke:var(--ink);stroke-width:${f1(k*.09+1.6)};stroke-linecap:round"/><path d="M${f1(cx-k*.1)} ${f1(cy+k*.3)}L${f1(cx-k*.14)} ${f1(fy)}M${f1(cx+k*.1)} ${f1(cy+k*.3)}L${f1(cx+k*.14)} ${f1(fy)}" style="stroke:var(--skin);stroke-width:${f1(k*.09)};stroke-linecap:round"/>${armsGlyph(cx,cy-k*.08,k,{drift:0})}</g>`}
    else if(p===1){const W=R*2.1,H=R*1.5,x0=cx-W/2,y0=cy-H/2,d=ease(ramp(u,.12,.7)),id='sgEyeClip';
      s+=`<defs><clipPath id="${id}"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(W)}" height="${f1(H)}" rx="16"/></clipPath></defs><g clip-path="url(#${id})"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(W)}" height="${f1(H)}" style="fill:var(--csf)"/><circle cx="${f1(x0+W*.74)}" cy="${f1(y0+H*.26)}" r="${f1(R*.14)}" style="fill:var(--penumbra)"/><path d="M${f1(x0)} ${f1(y0+H*.7)}Q${f1(x0+W*.3)} ${f1(y0+H*.5)} ${f1(x0+W*.55)} ${f1(y0+H*.68)}T${f1(x0+W)} ${f1(y0+H*.62)}V${f1(y0+H)}H${f1(x0)}Z" style="fill:var(--glia)"/><rect x="${f1(x0+W*.2)}" y="${f1(y0+H*.42)}" width="${f1(R*.24)}" height="${f1(R*.32)}" style="fill:var(--bone)"/><path d="M${f1(x0+W*.2-R*.03)} ${f1(y0+H*.42)}l${f1(R*.15)} ${f1(-R*.14)}l${f1(R*.15)} ${f1(R*.14)}z" style="fill:var(--heart)"/><rect x="${f1(cx)}" y="${f1(y0)}" width="${f1(W/2)}" height="${f1(H)}" style="fill:var(--scan-bg);opacity:${f1(d*.94)}"/></g><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(W)}" height="${f1(H)}" rx="16" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
      s+=`<path d="M${f1(cx)} ${f1(y0-6)}V${f1(y0+H+6)}" style="stroke:var(--muted);stroke-dasharray:3 4"/><text x="${f1(cx)}" y="${f1(y0+H+22)}" class="t-sm t-mid" style="fill:var(--ink)">what one person sees (schematic)</text>`}
    else if(p===2){const d=ramp(u,.12,.65);s+=faceGlyph(cx,cy,R*1.75,{droop:d,side:'L'});
      s+=`<text x="${f1(cx)}" y="${f1(cy+R*1.03)}" class="t-sm t-mid" style="fill:var(--ink)">${d<.5?'a smile, both corners level':'one corner stays low'}</text>`}
    else if(p===3){const d=ramp(u,.12,.75);s+=armsGlyph(cx,cy+R*.05,R*1.9,{drift:d,side:'L'});
      s+=`<text x="${f1(cx)}" y="${f1(cy+R*1.03)}" class="t-sm t-mid" style="fill:var(--ink)">${d<.5?'both arms held out':'one arm sinks and turns in'}</text>`}
    else if(p===4){const d=ramp(u,.15,.75),rr=rng(11),bx=cx-R*.98,bw=R*1.96,by=cy-R*.86,bh=R*.84;
      s+=faceGlyph(cx-R*.56,cy+R*.5,R*.9,{droop:d*.7,side:'L'});
      s+=`<path d="M${f1(bx+16)} ${f1(by)}H${f1(bx+bw-16)}Q${f1(bx+bw)} ${f1(by)} ${f1(bx+bw)} ${f1(by+16)}V${f1(by+bh-16)}Q${f1(bx+bw)} ${f1(by+bh)} ${f1(bx+bw-16)} ${f1(by+bh)}H${f1(bx+bw*.34)}L${f1(bx+bw*.24)} ${f1(by+bh+18)}L${f1(bx+bw*.22)} ${f1(by+bh)}H${f1(bx+16)}Q${f1(bx)} ${f1(by+bh)} ${f1(bx)} ${f1(by+bh-16)}V${f1(by+16)}Q${f1(bx)} ${f1(by)} ${f1(bx+16)} ${f1(by)}Z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.4"/>`;
      const n=26,w0=(bw-32)/n;for(let i=0;i<n;i++){const a=rr(),b=rr(),h=lerp(.28+.42*Math.abs(Math.sin(i*.9+tt*30)),.08+a*.8,d),gap=d>.3&&b<d*.42;if(gap)continue;
        const hh=h*bh*.68;s+=`<rect x="${f1(bx+16+i*w0)}" y="${f1(by+bh/2-hh/2)}" width="${f1(w0*.62)}" height="${f1(hh)}" rx="1.5" style="fill:var(--dx)"/>`}
      s+=`<text x="${f1(cx+R*.05)}" y="${f1(cy+R*.46)}" class="t-sm" style="fill:var(--ink)">${d<.5?'clear speech':'words break up'}</text><text x="${f1(cx+R*.05)}" y="${f1(cy+R*.62)}" class="t-xs">sound pattern, schematic</text>`}
    else{const mins=u*10,clk=R*.62,cl=cx-R*.5,ph=cx+R*.5,py=cy-R*.26;
      s+=clock(cl,py,clk,mins,{col:'var(--bad)'});
      s+=`<text x="${f1(cl)}" y="${f1(py+clk+16)}" class="t-sm t-mid" style="fill:var(--ink)">${Math.floor(mins)} min since onset</text>`;
      /* the phone and its rings */
      for(let i=0;i<3;i++){const q=((u*5+i/3)%1);s+=`<circle cx="${f1(ph)}" cy="${f1(py)}" r="${f1(R*.28+q*R*.34)}" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(.65*(1-q))}"/>`}
      s+=`<g transform="translate(${f1(ph)} ${f1(py)}) scale(${f1(R/90)})"><rect x="-17" y="-30" width="34" height="60" rx="7" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M-8 -14C-11 -6 -6 8 3 13L8 8L3 2L0 5C-3 2 -4 -3 -3 -6L1 -8L-2 -16Z" style="fill:var(--bad)"/></g>`;
      s+=`<text x="${f1(cx)}" y="${f1(cy+R*.74)}" class="t-big t-mid" style="fill:var(--bad)">Call emergency services</text>`;
      s+=`<text x="${f1(cx)}" y="${f1(cy+R*.96)}" class="t-sm t-mid" style="fill:var(--ink)">about ${f1(1.9*mins)} million neurons, modelled</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 400','400 520'),p=phaseOf(SG_STEPS,t),P=SG_STEPS[p],u=clamp((t-P.from)*6);
    const L=N?{x:10,w:380,y:10,c:{x:200,y:232,r:118},px:14,py:392,ls:18}:{x:16,w:688,y:12,c:{x:200,y:244,r:122},px:392,py:128,ls:21};
    let g=strip(L,p),a=ramp(u,0,.1);
    g+=`<g style="opacity:${f1(a)}">${scene(p,u,L.c,t)}</g>`;
    g+=`<g style="opacity:${f1(a)}"><text x="${L.px}" y="${L.py}" class="t-big" style="font-size:22px;fill:${p===5?'var(--bad)':'var(--ink)'}">${P.head}</text>`;
    P.lines.forEach((q,i)=>{g+=`<text x="${L.px}" y="${L.py+26+i*L.ls}" class="t-lbl" style="font-weight:500">${q}</text>`});
    const by=L.py+26+P.lines.length*L.ls+(N?4:14);
    if(p<2){/* the missed share falls once balance and eyes are added */
      const w=N?300:260,v=p===0?14.1:lerp(14.1,4.4,ramp(u,.2,.7));
      g+=`<text x="${L.px}" y="${by}" class="t-xs">strokes not identified</text><rect x="${L.px}" y="${by+6}" width="${w}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.px}" y="${by+6}" width="${f1(w*v/20)}" height="14" rx="4" style="fill:var(--bad)"/><text x="${f1(L.px+w*v/20+6)}" y="${by+17}" class="t-sm" style="fill:var(--ink);font-weight:700">${v.toFixed(1)}%</text><text x="${L.px}" y="${by+36}" class="t-xs">${p===0?'FAST alone':u>.6?'with balance and eyes added':'adding balance and eyes'}</text>`}
    g+='</g>';
    svg.innerHTML=g;note.innerHTML=noteHTML(P);setSt(p)}
  const stop=playWire(rg,$('#sgPlay'),draw,24000,'%t:player.replay%','signs');
  setSt=stepWire($('#sgSteps'),SG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- sensitivity and specificity explorer ---------- */
  const ac=$('#sgAcc'),an=$('#sgAccNote'),apts=$('#sgPts'),apr=$('#sgPrev'),aprv=$('#sgPrevV'),apb=$('#sgPres');
  let setK='rec',sel=0,prev=70,prevC=SG_ACC.rec.pres[0].c,aStop=null;
  function counts(S){const tp=Math.round(prev*S.se/100),fn=prev-tp,neg=100-prev,fp=Math.round(neg*(1-S.sp/100)),tn=neg-fp;return {tp,fn,fp,tn}}
  function drawAcc(q=1){const N=vb(ac,'720 400','400 690'),D=SG_ACC[setK],S=D.pts[sel];
    const P=N?{x:44,y:22,w:338,h:290}:{x:50,y:24,w:310,h:320};
    const X=v=>P.x+P.w*v/100,Y=v=>P.y+P.h*(1-v/100);
    let g=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" style="fill:var(--field)"/>`;
    [0,25,50,75,100].forEach(v=>{g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${P.y}" y2="${P.y+P.h}" class="grid"/><line x1="${P.x}" x2="${P.x+P.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${f1(X(v))}" y="${P.y+P.h+15}" class="t-xs t-mid">${v}</text><text x="${P.x-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    g+=`<text x="${f1(P.x+P.w/2)}" y="${P.y+P.h+31}" class="t-sm t-mid" style="fill:var(--ink)">specificity, % of non-cases cleared</text><text transform="translate(12 ${f1(P.y+P.h/2)}) rotate(-90)" class="t-sm t-mid" style="fill:var(--ink)">sensitivity, % of cases caught</text>`;
    g+=`<text x="${P.x}" y="${P.y-10}" class="t-xs" style="fill:var(--ink)">top right is best</text>`;
    if(D.box){const b=D.box;g+=`<rect x="${f1(X(b.sp0))}" y="${f1(Y(b.se1))}" width="${f1(X(b.sp1)-X(b.sp0))}" height="${f1(Y(b.se0)-Y(b.se1))}" rx="4" style="fill:var(--dx-soft);stroke:var(--dx);stroke-dasharray:4 3"/>`+sgLines(b.l,14).map((l,i)=>`<text x="${f1(X(b.sp0)-6)}" y="${f1(Y((b.se0+b.se1)/2)+i*12-4)}" class="t-xs t-end" style="fill:var(--ink)">${l}</text>`).join('')}
    D.pts.forEach((d,i)=>{const on=i===sel,x=X(d.sp),y=Y(d.se);
      g+=`<g class="clk" data-sgpt="${i}">${on?`<circle cx="${f1(x)}" cy="${f1(y)}" r="13" style="fill:none;stroke:var(--ink);stroke-width:2"/>`:''}<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:2"/><text x="${f1(x)}" y="${f1(y+4)}" class="t-mid" style="font:700 11px var(--mono);fill:${on?'var(--bg)':'var(--ink)'}">${d.n}</text></g>`});
    /* the 100 dots */
    const I=N?{x:44,y:394,sz:19,gp:6,lx:44,ly:0}:{x:408,y:60,sz:17,gp:5,lx:408,ly:0},C=counts(S),cols=['var(--dx)','var(--bad)','var(--warn)','var(--line)'],vis=Math.round(100*q);
    g+=`<text x="${I.x}" y="${I.y-18}" class="t-lbl">${sgLines(S.name,N?46:40)[0]}</text>`;
    let k=0;const seq=[];[C.tp,C.fn,C.fp,C.tn].forEach((c,j)=>{for(let i=0;i<c;i++)seq.push(j)});
    seq.forEach((j,i)=>{const x=I.x+(i%20)*(N?15.6:14.2)+6,y=I.y+Math.floor(i/20)*(N?15.6:14.2)+6;
      if(i>=vis){g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:var(--panel-2)"/>`;return}
      if(j===0)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5.6" style="fill:${cols[0]}"/>`;
      else if(j===1)g+=`<path d="M${f1(x-4.4)} ${f1(y-4.4)}l8.8 8.8M${f1(x+4.4)} ${f1(y-4.4)}l-8.8 8.8" style="stroke:${cols[1]};stroke-width:2.8;stroke-linecap:round"/>`;
      else if(j===2)g+=`<rect x="${f1(x-4.8)}" y="${f1(y-4.8)}" width="9.6" height="9.6" rx="1.5" style="fill:${cols[2]}"/>`;
      else g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.3"/>`});
    const ly=I.y+5*(N?15.6:14.2)+14,rows=[['caught (true positive)',C.tp,0],['missed (false negative)',C.fn,1],['falsely flagged (false positive)',C.fp,2],['correctly cleared (true negative)',C.tn,3]];
    rows.forEach((r,i)=>{const y=ly+i*(N?21:24),x=I.x+6;
      if(r[2]===0)g+=`<circle cx="${x}" cy="${y-4}" r="5.6" style="fill:${cols[0]}"/>`;else if(r[2]===1)g+=`<path d="M${x-4} ${y-8}l8 8M${x+4} ${y-8}l-8 8" style="stroke:${cols[1]};stroke-width:2.8;stroke-linecap:round"/>`;else if(r[2]===2)g+=`<rect x="${x-5}" y="${y-9}" width="10" height="10" rx="1.5" style="fill:${cols[2]}"/>`;else g+=`<circle cx="${x}" cy="${y-4}" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.3"/>`;
      g+=`<text x="${x+13}" y="${y}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><text x="${I.x+(N?300:286)}" y="${y}" class="t-lbl t-end">${r[1]}</text>`});
    const tot=C.tp+C.fp;g+=`<text x="${I.x}" y="${ly+4*(N?21:24)+6}" class="t-sm" style="fill:var(--ink)">flagged ${tot}: of those, ${C.tp} truly positive</text>`;
    ac.innerHTML=g;
    an.innerHTML=`<div class="kicker">${D.name}</div><h4>${S.name}</h4><p>${S.c}</p><dl class="kv"><div><dt>Sensitivity</dt><dd>${S.se}%: of ${prev} real cases, about ${C.tp} caught and ${C.fn} missed</dd></div><div><dt>Specificity</dt><dd>${S.sp}%: of ${100-prev} non-cases, about ${C.tn} cleared and ${C.fp} falsely flagged</dd></div></dl><p class="sgcap">${prevC}</p>`;
    apr.setAttribute('aria-valuetext',`${prev} of 100`);aprv.textContent=prev}
  function pulse(){if(aStop)aStop();aStop=animate(600,q=>drawAcc(q),()=>{aStop=null})}
  function wireSet(){const D=SG_ACC[setK];
    apts.innerHTML=D.pts.map((d,i)=>`<button class="btn" data-sgpt="${i}" aria-pressed="${i===sel}">${d.n} · ${d.s}</button>`).join('');
    apb.innerHTML=D.pres.map((d,i)=>`<button class="btn" data-sgpre="${i}" aria-pressed="${d.v===prev}">${d.l}</button>`).join('')}
  $('#m-signs').addEventListener('click',e=>{
    const b=e.target.closest('[data-sgset]');if(b){setK=b.dataset.sgset;sel=0;const D=SG_ACC[setK];prev=D.prev;apr.value=prev;prevC=D.pres[0].c;$$('[data-sgset]').forEach(x=>x.setAttribute('aria-pressed',x===b));wireSet();pulse();return}
    const pt=e.target.closest('[data-sgpt]');if(pt){sel=+pt.dataset.sgpt;$$('button[data-sgpt]').forEach((x,i)=>x.setAttribute('aria-pressed',i===sel));pulse();return}
    const pr=e.target.closest('[data-sgpre]');if(pr){const d=SG_ACC[setK].pres[+pr.dataset.sgpre];prev=d.v;apr.value=prev;prevC=d.c;$$('[data-sgpre]').forEach(x=>x.setAttribute('aria-pressed',x===pr));pulse();return}
  });
  apr.addEventListener('input',()=>{prev=+apr.value;prevC='You set this share by hand. A positive result means less when the condition is rarer.';$$('[data-sgpre]').forEach(x=>x.setAttribute('aria-pressed',+SG_ACC[setK].pres[+x.dataset.sgpre].v===prev));drawAcc(1)});
  wireSet();drawAcc(1);

  /* ---------- PRESTO AUC ---------- */
  const au=$('#sgAuc');
  function drawAuc(){const N=vb(au,'720 300','400 440'),rows=SG_AUC.map((r,i)=>({l:r[0],v:r[1],txt:r[1].toFixed(2),col:i===0?'var(--accent)':'var(--dx)'}));
    const R=sgHB(10,10,N?380:700,rows,{N,max:1,lw:150,rh:30,rhN:44,pad:60});au.innerHTML=R.svg;sgFit(au,N?400:720,R.h+14)}
  drawAuc();

  /* ---------- mimics ---------- */
  const mi=$('#sgMim'),mc=$('#sgMimCap');let mk='many',mS=null;
  function drawMim(q=1){const N=vb(mi,'720 300','400 400'),D=SG_MIM[mk],R=sgHB(10,10,N?380:700,D.rows,{N,lw:230,rh:30,p:q,pad:80});mi.innerHTML=R.svg;sgFit(mi,N?400:720,R.h+14);mc.innerHTML=D.cap}
  $$('[data-sgmim]').forEach(b=>b.addEventListener('click',()=>{mk=b.dataset.sgmim;$$('[data-sgmim]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(mS)mS();mS=animate(800,drawMim,()=>{mS=null})}));
  drawMim(1);

  /* ---------- missed strokes ---------- */
  const ms=$('#sgMis');
  function drawMis(){const N=vb(ms,'720 340','400 480');let rows=[];SG_MISS.forEach(r=>{rows.push({head:r.h},{l:r.a[0],v:r.a[1],txt:r.a[1]+'%',col:'var(--bad)'},{l:r.b[0],v:r.b[1],txt:r.b[1]+'%',col:'var(--muted)'})});
    const R=sgHB(10,8,N?380:700,rows,{N,lw:190,rh:24,rhN:38,max:70,pad:50});ms.innerHTML=R.svg;sgFit(ms,N?400:720,R.h+12)}
  drawMis();

  /* ---------- women and men ---------- */
  const sx=$('#sgSex');
  function drawSex(){const N=vb(sx,'720 300','400 430'),lw=N?0:240,x0=N?20:10+lw,w=N?340:420,rh=N?56:36,X=v=>x0+w*(v-10)/60;let g='';
    [20,30,40,50,60].forEach(v=>{g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="24" y2="${28+SG_SEX.length*rh}" class="grid"/><text x="${f1(X(v))}" y="16" class="t-xs t-mid">${v}%</text>`});
    SG_SEX.forEach((r,i)=>{const y=(N?30:32)+i*rh,yd=N?y+26:y+8;
      if(N)g+=`<text x="${x0}" y="${y+6}" class="t-sm" style="fill:var(--ink)">${r[0]}</text>`;else g+=`<text x="${x0-12}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink)">${r[0]}</text>`;
      g+=`<line x1="${f1(X(r[1]))}" x2="${f1(X(r[2]))}" y1="${yd}" y2="${yd}" style="stroke:var(--muted);stroke-width:2"/>`;
      const same=Math.abs(r[1]-r[2])<4,d=same?11:0;
      g+=`<circle cx="${f1(X(r[1])-d)}" cy="${yd}" r="10" style="fill:var(--dx)"/><text x="${f1(X(r[1])-d)}" y="${yd+4}" class="t-mid" style="font:700 11px var(--mono);fill:var(--bg)">W</text>`;
      g+=`<circle cx="${f1(X(r[2])+d)}" cy="${yd}" r="10" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(r[2])+d)}" y="${yd+4}" class="t-mid" style="font:700 11px var(--mono);fill:var(--ink)">M</text>`;
      const rx=Math.max(X(r[1]),X(r[2]))+d+16;g+=`<text x="${f1(rx)}" y="${yd+4}" class="t-xs" style="fill:var(--ink)">W ${r[1]}, M ${r[2]}</text>`});
    sx.innerHTML=g;sgFit(sx,N?400:720,(N?36:40)+SG_SEX.length*rh)}
  drawSex();

  /* ---------- mobile units and direct transport ---------- */
  const tr=$('#sgTr'),trr=$('#sgTrT'),trc=$('#sgTrCap');let tk='msu';
  function drawTr(t){const N=vb(tr,'720 360','400 560'),D=SG_TR[tk];let g='';const W=N?400:720;
    if(tk==='msu'){const x0=N?20:150,w=N?356:530,X=v=>x0+w*v/120,mins=t*120;
      g+=`<text x="${x0}" y="16" class="t-xs">minutes from onset (medians, BEST-MSU)</text>`;
      const T=tline(x0,28,w,{min:0,max:120,step:30});g+=T.svg;
      const lanes=N?[{y:96,l:'Mobile stroke unit',at:72,col:'var(--dx)'},{y:160,l:'Usual ambulance care',at:108,col:'var(--muted)'}]:[{y:92,l:'Mobile stroke unit',at:72,col:'var(--dx)'},{y:146,l:'Usual ambulance care',at:108,col:'var(--muted)'}];
      lanes.forEach(L=>{const m=Math.min(mins,L.at),vx=X(m),done=mins>=L.at;
        if(N)g+=`<text x="${x0}" y="${L.y-30}" class="t-sm" style="fill:var(--ink)">${L.l}</text>`;else g+=`<text x="${x0-16}" y="${L.y-6}" class="t-sm t-end" style="fill:var(--ink)">${L.l}</text>`;
        g+=`<line x1="${x0}" x2="${x0+w}" y1="${L.y}" y2="${L.y}" class="axis"/><line x1="${x0}" x2="${f1(vx)}" y1="${L.y}" y2="${L.y}" style="stroke:${L.col};stroke-width:4"/>`;
        g+=`<line x1="${f1(X(L.at))}" x2="${f1(X(L.at))}" y1="${L.y-20}" y2="${L.y+5}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3"/>`;
        g+=sgVan(Math.max(x0+26,vx-22),L.y-1,{col:L.col});
        if(done)g+=`<text x="${f1(X(L.at)+(L.at>90?-6:6))}" y="${L.y+18}" class="t-sm ${L.at>90?'t-end':''}" style="fill:var(--bad);font-weight:700">t-PA at ${L.at} min</text>`});
      const by=N?222:194,R=sgHB(N?10:20,by,N?380:680,D.rows,{N,lw:210,rh:30,rhN:44,p:ramp(t,.9,1),pad:80,max:100});g+=`<g style="opacity:${f1(ramp(t,.86,.92))}">${R.svg}</g>`;sgFit(tr,W,by+R.h+10)}
    else{const home=N?[42,84]:[70,86],loc=N?[200,56]:[300,60],tc=N?[350,108]:[610,92],u=ease(ramp(t,0,.82));
      const sx=home[0]+66,P1=[[sx,lerp(home[1],loc[1]+28,66/(loc[0]-home[0]))],[loc[0],loc[1]+28],[tc[0]-50,tc[1]-8]],P2=[[sx,lerp(home[1],tc[1],66/(tc[0]-home[0]))],[tc[0]-50,tc[1]]];
      const along=(P,q)=>{let L=0,seg=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);L+=d}let r=q*L;for(let i=0;i<seg.length;i++){if(r<=seg[i]){const f=r/seg[i];return [lerp(P[i][0],P[i+1][0],f),lerp(P[i][1],P[i+1][1],f)]}r-=seg[i]}return P[P.length-1]};
      g+=`<path d="M${home[0]} ${home[1]}L${loc[0]} ${loc[1]}L${tc[0]} ${tc[1]}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:6 5"/><path d="M${home[0]} ${home[1]}L${tc[0]} ${tc[1]}" style="fill:none;stroke:var(--dx);stroke-width:3"/>`;
      g+=`<circle cx="${home[0]}" cy="${home[1]}" r="7" style="fill:var(--bad)"/><text x="${home[0]}" y="${home[1]+22}" class="t-xs t-mid" style="fill:var(--ink)">suspected LVO</text>`;
      g+=sgHosp(loc[0],loc[1]-2,'local stroke centre',{n:20})+sgHosp(tc[0],tc[1]-2,'thrombectomy centre',{col:'var(--dx)',n:N?13:20});
      const a=along(P1,u),b=along(P2,u);g+=`<g style="opacity:.8">${sgVan(a[0],a[1]-6,{col:'var(--muted)'})}</g>${sgVan(b[0],b[1]+22,{col:'var(--dx)'})}`;
      const by=N?172:150,R=sgHB(N?10:20,by,N?380:680,D.rows,{N,lw:210,rh:27,rhN:42,p:ramp(t,.8,1),pad:80,max:100});g+=`<g style="opacity:${f1(ramp(t,.76,.84))}">${R.svg}</g>`;sgFit(tr,W,by+R.h+10)}
    tr.innerHTML=g;trc.innerHTML=D.cap}
  playWire(trr,$('#sgTrPlay'),drawTr,12000,'%t:player.replay%','signs');
  $$('[data-sgtr]').forEach(b=>b.addEventListener('click',()=>{tk=b.dataset.sgtr;$$('[data-sgtr]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawTr(+trr.value)}));
  drawTr(+trr.value);
  redraws.signs=(f=>()=>{f&&f();drawAcc(1);drawAuc();drawMim(1);drawMis();drawSex()})(redraws.signs);
};
