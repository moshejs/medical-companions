/* =============== 2.1 Diagnosis =============== */
/* timeline boundaries of the seven pathway nodes */
const DX_NT=[0,.16,.24,.31,.38,.58,.78,1.001];
const DX_NODES=[
 {ti:'Clinical suspicion',g:'fatigable ocular, bulbar, limb',o:'fluctuating ptosis, double vision'},
 {ti:'AChR antibody',g:'binding assay · ≈85% positive',o:'binding assay · ≈50% positive'},
 {ti:'MuSK antibody',g:'5–70% of AChR-neg. generalized',o:'generally absent in pure ocular'},
 {ti:'LRP4 · clustered AChR',g:'LRP4 18.7% of double-negative',o:'LRP4 27% of ocular double-neg.'},
 {ti:'RNS at 3 Hz',g:'proximal 60–70% · distal 30–35%',o:'facial 35–38% · distal ≈10%'},
 {ti:'Jitter: SFEMG or needle',g:'concentric needle 98–100%',o:'concentric needle over 90%'},
 {ti:'Chest CT or MRI',g:'thymoma in up to 15%',o:'thymoma in up to 15%'}
];
const DX_LINKS=['','if negative','if negative','if negative','if normal or unclear','all patients'];
const DX_STEPS=[
 {from:0,at:.07,k:'Step 1 · Suspicion',t:'The clinical picture',
  txt:`Diagnosis is straightforward in most people with typical symptoms and a positive antibody test. [[Gilhus2019]] The work-up starts with an examination for fatigable weakness: ocular, bulbar and limb-girdle. [[Habib2025]] At the bedside, ptosis that worsens on sustained upgaze shows the lid muscle tiring, and ice held over the eye for 2 to 5 minutes counts as positive with 2 mm or more of improvement, a cut-off Rousseff calls "somewhat arbitrary". [[Yoganathan2022,Rousseff2021]]`,
  g:`In generalized MG the weakness also reaches bulbar, neck or limb muscles. The ice pack test was studied in people with ptosis, so its figures belong to the ocular setting.`,
  o:`In 155 consecutive ptosis referrals, the ice pack test had 86% sensitivity and 79% specificity; combined with single-fibre EMG, a negative result on both had a negative predictive value of 94%. [[Giannoccaro2020]]`,
  pt:`It starts with what the person notices and what the examiner sees: muscles that tire with use and recover with rest.`,
  hook:`Fatigability is the clue: ptosis that worsens on sustained upgaze and improves with ice or rest.`},
 {from:.16,at:.2,k:'Step 2 · Antibodies',t:'AChR first, then MuSK, then LRP4',
  txt:`Rousseff's suggested order tests AChR and MuSK antibodies first; for some authors a positive result is diagnostic, and it leads to thymus imaging and thyroid tests. [[Rousseff2021]] Yoganathan's scheme tests MuSK if AChR binding is negative or below 0.02 nmol/L, then LRP4 and striational antibodies in double-seronegative people. [[Yoganathan2022]] A cell-based assay for clustered AChR finds antibodies in some RIPA-negative people: about 15% in one review, 38.1% in an Oxford series. [[Rousseff2021,RodriguezCruz2015]] This walk follows a person whose antibody tests stay negative, so every later step is shown.`,
  g:`Generalized MG: AChR binding antibody is abnormal in up to 85% of adults, and MuSK antibodies were found in 5–70% of AChR-negative generalized MG across studies. [[Rousseff2021,Yoganathan2022]]`,
  o:`Ocular MG: AChR binding antibody is abnormal in only about 50%, MuSK is generally not found in purely ocular MG, and 27% of ocular double-seronegative MG had LRP4 antibodies. [[Rousseff2021,Yoganathan2022,Zisimopoulou2014]]`,
  pt:`A blood test looks for the antibodies that attack the junction. If the first one is negative, the lab looks for others.`,
  hook:`AChR antibodies: about 85% of generalized but only about half of ocular MG, specificity 95–100%. MuSK is next if AChR is negative. [[Rousseff2021,Yoganathan2022]]`},
 {from:.38,at:.55,k:'Step 3 · RNS',t:'3 Hz train: decrement over 10%',
  txt:`The nerve is stimulated 2 to 5 times a second and each muscle response (CMAP) is recorded. A 10% decrement from the 1st to the 4th or 5th response is the validated criterion, and RNS remains the preferred first electrodiagnostic test. [[AAEM2001]] In MG the biggest drop is between the 1st and 2nd responses, the lowest point is at the 4th–5th, and then the train steadies or partly recovers: the U shape of a postsynaptic disorder. [[Rousseff2021]] Not everyone agrees on the line: Yoganathan writes that the 10% cut-off "has never been validated", and 7–8% cut-offs raised sensitivity by 6–11% with specificity kept at 95–96%. [[Yoganathan2022]]`,
  g:`Generalized MG: distal muscles are abnormal in 30–35% and proximal muscles in 60–70%; specificity is about 97%. The trace shows a proximal muscle. [[Rousseff2021,Benatar2006]]`,
  o:`Ocular MG: distal-muscle RNS is about 10% sensitive and facial-muscle RNS 35–38%; specificity is about 94%. The trace shows a hand muscle, which is often normal in ocular MG. [[Rousseff2021,Benatar2006]]`,
  pt:`The nerve gets a short series of small electric pulses. In MG the muscle's answer shrinks over the first few pulses.`,
  hook:`3 Hz RNS: decrement over 10% from 1st to 4th/5th, U-shaped. Lambert-Eaton instead shows a low first CMAP and an increment after exercise or fast stimulation. [[AAEM2001,Oh2017]]`},
 {from:.58,at:.77,k:'Step 4 · Jitter',t:'SFEMG, the most sensitive test',
  txt:`Single-fibre EMG records two muscle fibres of one motor unit. The time between their potentials varies a little from sweep to sweep: that variation is the jitter. When a junction is too weak, the second fibre sometimes fails to fire: blocking. Abnormal jitter or blocking are the diagnostic criteria; SFEMG is more sensitive than RNS but may be less specific. [[AAEM2001]] Normal mean consecutive difference (MCD) has been given as 10–60 µs, limits vary by muscle and age, and about 20 fibre pairs are traditionally analysed. [[Yoganathan2022]]`,
  g:`Generalized MG: concentric-needle jitter is abnormal in 98–100%, and a normal study in a weak muscle carries a negative predictive value of about 98%. The reference limit drawn is 30 µs for extensor digitorum. [[Rousseff2021,Stalberg2016]]`,
  o:`Ocular MG: concentric-needle jitter is abnormal in more than 90%. In ptosis referrals, orbicularis oculi SFEMG had 94% sensitivity and 79% specificity. The limit drawn is 31 µs for orbicularis oculi. [[Rousseff2021,Giannoccaro2020,Stalberg2016]]`,
  pt:`A fine needle listens to two fibres that should fire together. In MG the second one lags by a varying amount, and sometimes does not fire at all.`,
  hook:`SFEMG has the highest sensitivity, positive AChR antibodies the highest specificity. Jitter is also abnormal in motor neuron disease and after botulinum toxin. [[Yoganathan2022,Sanders2022]]`},
 {from:.78,at:.9,k:'Step 5 · Imaging',t:'Chest CT or MRI for thymoma',
  txt:`Thymoma is present in up to 15% of people with MG, mostly AChR-antibody positive. No clinical or antibody feature reliably excludes it, so thymus imaging is advised in all confirmed or strongly suspected MG, with CT preferred for screening. [[Rousseff2021]] Habib and Punga advise chest CT or MRI in every subtype. [[Habib2025]] With striational (titin or RyR) antibodies, thymoma is "very likely". [[Rousseff2021]] See <a href="#thymectomy" data-go="thymectomy">Thymectomy over the years</a>.`,
  g:'',o:'',
  pt:`A chest scan checks the thymus, a gland behind the breastbone, for a tumour called a thymoma.`,
  hook:`Reviews advise chest imaging (CT or MRI) for every person with MG, whatever the antibody, to look for thymoma; Rousseff also advises thyroid function tests. [[Habib2025,Rousseff2021]]`}
];
/* schematic CMAP amplitudes, relative to the 1st response */
const DX_RNSA={g:[1,.86,.8,.77,.76,.77,.785,.795,.8,.805],o:[1,.975,.958,.948,.945,.948,.952,.955,.957,.958],c:[1,.996,.993,.992,.992,.993,.993,.994,.994,.994]};
/* schematic jitter sweeps: interpotential-interval deviations (µs), scaled to a target MCD */
function dxJit(seed,mcd,blk){const r=rng(seed),v=[];for(let i=0;i<20;i++){const u=Math.max(1e-6,r()),w=r();v.push(Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*w))}
  const B=new Set(blk);let sum=0,n=0;for(let i=1;i<20;i++)if(!B.has(i)&&!B.has(i-1)){sum+=Math.abs(v[i]-v[i-1]);n++}
  const k=mcd/(sum/n);return {d:v.map(x=>clamp(x*k,-230,230)),b:B}}
const DX_JIT={g:dxJit(11,82,[4,9,13,17]),o:dxJit(23,64,[7,15]),c:dxJit(5,21,[])};
const DX_MUS={g:{rns:'proximal muscle',sf:'extensor digitorum',lim:30},o:{rns:'hand (distal) muscle',sf:'orbicularis oculi',lim:31}};
const DX_TESTS={
 achr:{g:[85,95],o:[50,95],
  sg:'AChR binding antibody. Sensitivity 85%: abnormal in up to 85% of adults with generalized MG [[Rousseff2021]]; another review gives 85–90% [[Yoganathan2022]]. Specificity 95%, the lower end of 95–100% [[Yoganathan2022]]; Rousseff notes recent reports of 90–95% [[Rousseff2021]].',
  so:'AChR binding antibody. Sensitivity 50%: about half of ocular MG [[Rousseff2021]]; another review gives 50–70% [[Yoganathan2022]]. Specificity 95%, the lower end of 95–100% [[Yoganathan2022]].'},
 rnsd:{g:[32.5,97],o:[10,94],
  sg:'RNS of a distal muscle. Sensitivity 30–35% in generalized MG; 32.5% is the midpoint. Specificity about 97%, from Benatar\'s systematic review as quoted by Rousseff. [[Rousseff2021,Benatar2006]]',
  so:'RNS of a distal muscle. Sensitivity about 10% in ocular or ocular-onset MG. Specificity about 94%, from Benatar\'s review as quoted by Rousseff. [[Rousseff2021,Benatar2006]]'},
 rnsp:{g:[65,97],o:null,
  sg:'RNS of a proximal muscle. Sensitivity 60–70% in generalized MG; 65% is the midpoint. Specificity about 97%. [[Rousseff2021,Benatar2006]]',
  so:'No ocular-MG figure for proximal-muscle RNS in the sources used here.'},
 rnsf:{g:[46,97],o:[36.5,94],
  sg:'RNS of a facial muscle. Sensitivity 46%: frontalis in generalized MG, 122 MG and 182 controls [[Yoganathan2022]]. Specificity: the pooled RNS figure of about 97%, from a different source [[Rousseff2021,Benatar2006]].',
  so:'RNS of a facial muscle. Sensitivity 35–38% in ocular MG; 36.5% is the midpoint [[Rousseff2021]]. Another study found 15% for frontalis and 19% for nasalis [[Yoganathan2022]]. Specificity about 94% [[Rousseff2021,Benatar2006]].'},
 sfemg:{g:[85,91],o:[94,79],
  sg:'Single-fibre EMG. In 348 people tested, 108 with MG: sensitivity 85% in generalized MG and specificity 91% [[Yoganathan2022]]. Concentric-needle jitter is abnormal in 98–100% of generalized MG [[Rousseff2021]].',
  so:'Single-fibre EMG of orbicularis oculi, stimulated, in 155 ptosis referrals: sensitivity 94%, specificity 79% [[Giannoccaro2020]].'},
 ice:{g:null,o:[86,79],
  sg:'The ice pack test is studied in people with ptosis.',
  so:'Ice pack test in 155 consecutive ptosis referrals, 102 with ocular MG: sensitivity 86%, specificity 79% [[Giannoccaro2020]]. Across 20 studies sensitivity ranged from 38.5% to 100% [[Proudman2023]].'}
};
const DX_GSTEPS=[{from:0,k:'Step 1',t:'100 people are tested'},{from:.3,k:'Step 2',t:'Who truly has MG'},{from:.55,k:'Step 3',t:'What the test says'},{from:.8,k:'Step 4',t:'Before and after the result'}];

/* a panel frame */
function dxPanel(P,o=1){return `<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--panel);stroke:var(--line);opacity:${f1(o)}"/>`}
/* small glyphs for the pathway nodes */
function dxGlyph(i,x,y,on,t){
  const c=on?'var(--nerve)':'var(--muted)';let g='';
  switch(i){
    case 0:g=eyelid(x,y+2,24,on?.35+.25*bump(t,0,.16):.35,1);break;
    case 1:g=igg(x,y+3,7,0,1,on?'var(--ab)':c);break;
    case 2:g=igg(x,y+3,7,0,1,on?'var(--musk)':c);break;
    case 3:g=igg(x-4,y+3,5.5,-.3,1,c)+igg(x+5,y+3,5.5,.3,1,c);break;
    case 4:{let d=`M${x-11} ${y+5}`;for(let k=0;k<4;k++){const a=8*(1-.12*Math.min(k,3));d+=`l2 0 1.5 ${f1(-a)} 1.5 ${f1(a+2)} 1 -2`}g=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:1.5;stroke-linejoin:round"/>`;break}
    case 5:g=`<path d="M${x-11} ${y+5}h4l2 -9 2 12 2 -3h3l2 -7 2 10 2 -3h3" style="fill:none;stroke:${c};stroke-width:1.5;stroke-linejoin:round"/>`;break;
    case 6:g=`<ellipse cx="${x}" cy="${y}" rx="11" ry="8" style="fill:none;stroke:${c};stroke-width:1.6"/><ellipse cx="${x-4}" cy="${y}" rx="3" ry="4" style="fill:${c};opacity:.5"/><ellipse cx="${x+4}" cy="${y}" rx="3" ry="4" style="fill:${c};opacity:.5"/><circle cx="${x}" cy="${y-5}" r="2" style="fill:${on?'var(--ab)':c}"/>`;break;
  }
  return g}
/* the focus panel: one vignette per phase */
function dxFocus(P,t,mode){
  const {x,y,w,h}=P,dw=Math.round(w*.5),tx=x+dw+10;let s=dxPanel(P);
  const txt=(ti,ls)=>`<text x="${tx}" y="${y+24}" class="t-lbl">${ti}</text>`+ls.map((l,i)=>`<text x="${tx}" y="${y+44+i*17}" class="t-sm" style="${l[1]?'fill:var(--'+l[1]+')':''}">${l[0]}</text>`).join('');
  const cy=y+h/2+6;
  if(t<.16){const up=ramp(t,.015,.075),ice=bump(t,.08,.145),after=ramp(t,.1,.14);
    const droop=lerp(lerp(.18,.62,up),.26,after);
    s+=eyelid(x+dw*.42,cy+2,Math.min(84,dw*.42),droop,1);
    const ex=x+dw*.42-Math.min(84,dw*.42)/2-18;
    if(after<1)s+=`<g style="opacity:${f1(1-after)}"><path d="M${f1(ex)} ${cy+8}V${cy-22}M${f1(ex-5)} ${cy-16}l5 -6 5 6" style="fill:none;stroke:var(--muted);stroke-width:1.4"/><text x="${f1(ex)}" y="${cy+20}" class="t-xs t-mid">gaze</text></g>`;
    if(ice>0){const iy=lerp(y-10,cy-24,clamp(ice*1.6));s+=`<g style="opacity:${f1(clamp(ice*1.8))}"><rect x="${f1(x+dw*.42-30)}" y="${f1(iy)}" width="60" height="22" rx="8" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.4"/><text x="${f1(x+dw*.42)}" y="${f1(iy+15)}" class="t-xs t-mid" style="fill:var(--nerve)">ice pack</text></g>`}
    s+=`<text x="${x+12}" y="${y+h-8}" class="t-xs">${after>.5?'after ice: lid margin lifts':'sustained upgaze: lid falls'}</text>`;
    s+=txt('Bedside clues',[['upgaze: the lid tires'],['ice 2–5 min: it lifts'],['≥2 mm better = positive',after>.6?'nerve':'']]);
  }else if(t<.38){const k=t<.24?0:t<.31?1:2,sub=ramp(t,DX_NT[k+1],DX_NT[k+2]);
    const my=y+h-30;s+=`<rect x="${x+8}" y="${my}" width="${dw}" height="22" rx="4" style="fill:var(--muscle)"/><path d="M${x+8} ${my}H${x+8+dw}" style="stroke:var(--memb);stroke-width:3"/>`;
    const X=[x+8+dw*.2,x+8+dw*.5,x+8+dw*.8];
    s+=achr(X[0],my,12,.2,k===0?1:.45);
    s+=`<rect x="${f1(X[1]-7)}" y="${my-20}" width="14" height="20" rx="4" style="fill:var(--musk);opacity:${k===1?1:.45}"/>`;
    s+=`<rect x="${f1(X[2]-9)}" y="${my-14}" width="18" height="14" rx="3" style="fill:var(--musk-soft);stroke:var(--musk);stroke-width:1.4;opacity:${k===2?1:.45}"/>`;
    ['AChR','MuSK','LRP4'].forEach((l,i)=>{s+=`<text x="${f1(X[i])}" y="${my+15}" class="t-xs t-mid" style="${i===k?'fill:var(--ink);font-weight:700':''}">${l}</text>`});
    const by=lerp(y+18,my-(k===0?28:k===1?32:26),ease(clamp(sub*1.6)));
    s+=igg(X[k],by,11,Math.PI,1,k===1?'var(--musk)':'var(--ab)');
    s+=`<text x="${x+12}" y="${y+18}" class="t-xs">patient's IgG meets each target</text>`;
    const L=[[['AChR binding assay'],[mode==='g'?'≈85% in generalized MG':'≈50% in ocular MG','ab'],['specificity 95–100%']],
             [['MuSK, if AChR negative'],[mode==='g'?'5–70% of AChR-negative':'rare in pure ocular MG','musk'],['mainly IgG4']],
             [['LRP4, clustered AChR'],[mode==='g'?'LRP4 18.7% of double-neg.':'CBA-only: more ocular','musk'],['LRP4 also in ALS']]][k];
    s+=txt('Antibody blood tests',L);
  }else if(t<.58){const nx0=x+16,nx1=x+dw-66,ny=cy-2;
    s+=`<path d="M${nx0} ${ny}H${nx1}" style="stroke:var(--nerve);stroke-width:3;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${x+dw-36}" cy="${ny}" rx="30" ry="20" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6"/>`;
    s+=`<circle cx="${nx0+18}" cy="${ny-16}" r="9" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><text x="${nx0+18}" y="${ny-12}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">S</text><path d="M${nx0+18} ${ny-7}V${ny-2}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    s+=`<rect x="${x+dw-44}" y="${ny-28}" width="16" height="10" rx="2" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><text x="${x+dw-36}" y="${ny-32}" class="t-xs t-mid">R</text>`;
    const ph=((t-.38)*55)%1;s+=`<circle cx="${f1(lerp(nx0+18,nx1,ph))}" cy="${ny}" r="4.5" style="fill:var(--ach)"/>`;
    s+=`<text x="${x+12}" y="${y+18}" class="t-xs">S stimulates · R records</text>`;
    s+=txt('Repetitive stimulation',[['3 pulses a second'],['record each CMAP'],['4th–5th vs the 1st','nerve']]);
  }else if(t<.78){const ax=x+16,ay=y+30,f1y=cy-8,f2y=cy+20,fx0=x+70,fx1=x+dw-6;
    s+=`<path d="M${ax} ${ay}L${fx0-26} ${(f1y+f2y)/2}L${fx0} ${f1y}M${fx0-26} ${(f1y+f2y)/2}L${fx0} ${f2y}" style="fill:none;stroke:var(--nerve);stroke-width:2.4;stroke-linejoin:round"/>`;
    [f1y,f2y].forEach(fy=>{s+=`<rect x="${fx0}" y="${fy-5}" width="${fx1-fx0}" height="10" rx="5" style="fill:var(--muscle);stroke:var(--memb)"/>`+achDot(fx0+2,fy,3.2)});
    const nxT=x+dw*.72;s+=`<path d="M${f1(nxT+14)} ${y+14}L${f1(nxT)} ${f1((f1y+f2y)/2)}" style="stroke:var(--ink);stroke-width:2.2"/><circle cx="${f1(nxT)}" cy="${f1((f1y+f2y)/2)}" r="2.4" style="fill:var(--ink)"/>`;
    const cyc=(t-.58)*60,ci=Math.floor(cyc),ph=cyc-ci,j=(DX_JIT.g.d[ci%20]||0)/400,blk=DX_JIT.g.b.has(ci%20);
    s+=`<circle cx="${f1(lerp(fx0,fx1,clamp(ph*1.2)))}" cy="${f1y}" r="4" style="fill:var(--nerve)"/>`;
    if(!blk)s+=`<circle cx="${f1(lerp(fx0,fx1,clamp(ph*1.2-.12-j)))}" cy="${f2y}" r="4" style="fill:var(--nerve)"/>`;
    else s+=`<text x="${fx0+18}" y="${f2y+4}" class="t-xs" style="fill:var(--ab)">blocked</text>`;
    s+=`<text x="${x+12}" y="${y+h-8}" class="t-xs">one motor unit, two fibres, one needle</text>`;
    s+=txt('Single-fibre EMG',[['2 fibres, 1 motor unit'],['jitter: the gap varies','nerve'],['blocking: 2nd fails','ab']]);
  }else{const cx=x+dw*.42,cyy=y+h/2+4,rx=Math.min(70,dw*.36),ry=Math.min(36,h*.32);
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(cyy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6"/>`;
    s+=`<ellipse cx="${f1(cx-rx*.45)}" cy="${f1(cyy+2)}" rx="${f1(rx*.38)}" ry="${f1(ry*.72)}" style="fill:var(--field);stroke:var(--line)"/><ellipse cx="${f1(cx+rx*.45)}" cy="${f1(cyy+2)}" rx="${f1(rx*.38)}" ry="${f1(ry*.72)}" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<ellipse cx="${f1(cx+4)}" cy="${f1(cyy+8)}" rx="${f1(rx*.2)}" ry="${f1(ry*.32)}" style="fill:var(--memb);opacity:.55"/><circle cx="${f1(cx)}" cy="${f1(cyy+ry*.72)}" r="${f1(ry*.16)}" style="fill:var(--panel-2);stroke:var(--muted)"/><rect x="${f1(cx-6)}" y="${f1(cyy-ry+2)}" width="12" height="5" rx="2" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    const th=ramp(t,.8,.86);s+=`<ellipse cx="${f1(cx-2)}" cy="${f1(cyy-ry*.52)}" rx="${f1(rx*.17)}" ry="${f1(ry*.2)}" style="fill:var(--ab);opacity:${f1(.2+.7*th)}"/>`;
    s+=`<path d="M${f1(cx+rx*.14)} ${f1(cyy-ry*.6)}L${f1(x+dw-60)} ${y+19}" style="stroke:var(--ab);stroke-width:1;opacity:${f1(th)}"/><text x="${x+dw-2}" y="${y+15}" class="t-xs t-end" style="fill:var(--ab);opacity:${f1(th)}">anterior mediastinum</text>`;
    const sl=cyy-ry+2*ry*(((t-.78)*9)%1);s+=`<path d="M${f1(cx-rx-6)} ${f1(sl)}H${f1(cx+rx+6)}" style="stroke:var(--nerve);stroke-width:1.4;opacity:.7"/>`;
    s+=`<text x="${x+12}" y="${y+h-6}" class="t-xs">one axial slice, schematic</text>`;
    s+=txt('Chest CT or MRI',[['thymoma: up to 15%','ab'],['mostly AChR-positive'],['CT preferred to screen']]);
  }
  return s}
/* the RNS train */
function dxRNS(P,t,A,mus,tag){
  const {x,y,w,h}=P,on=t>=.38;let s=dxPanel(P);
  s+=`<text x="${x+12}" y="${y+18}" class="t-lbl">RNS at 3 Hz</text><text x="${x+104}" y="${y+18}" class="t-sm">${mus}</text><text x="${x+w-10}" y="${y+18}" class="t-xs t-end">schematic</text>`;
  const base=y+h-50,H=h-98,sw=(w-58)/10,x0=x+18;
  s+=`<path d="M${x0} ${base}H${x0+sw*10}" class="axis"/>`;
  const n=on?ramp(t,.4,.54)*10:0,k=Math.floor(n+1e-9);
  const thY=base-H*.9;
  s+=`<path d="M${x0} ${f1(thY)}H${f1(x0+sw*10)}" style="stroke:var(--ab);stroke-width:1.2;stroke-dasharray:4 4;opacity:${on?.9:.3}"/><text x="${x+w-14}" y="${f1(thY+3)}" class="t-xs t-end" style="fill:var(--ab)">−10%</text>`;
  let env='';const pk=[];
  for(let i=0;i<10;i++){const sx=x0+i*sw,a=H*A[i],o=i<k?1:i===k?n-k:0;
    s+=`<text x="${f1(sx+sw*.32)}" y="${base+24}" class="t-xs t-mid" style="${(i===3||i===4)&&o>0?'fill:var(--ink);font-weight:700':''}">${i+1}</text>`;
    if(o<=0)continue;
    s+=`<path d="M${f1(sx+1)} ${base-4}v8" style="stroke:var(--muted);stroke-width:1;opacity:${f1(o)}"/>`;
    s+=`<path d="M${f1(sx+4)} ${base}C${f1(sx+sw*.2)} ${base} ${f1(sx+sw*.22)} ${f1(base-a)} ${f1(sx+sw*.32)} ${f1(base-a)}C${f1(sx+sw*.42)} ${f1(base-a)} ${f1(sx+sw*.44)} ${f1(base+a*.15)} ${f1(sx+sw*.56)} ${f1(base+a*.15)}C${f1(sx+sw*.68)} ${f1(base+a*.15)} ${f1(sx+sw*.72)} ${base} ${f1(sx+sw*.92)} ${base}" style="fill:none;stroke:var(--nerve);stroke-width:1.8;opacity:${f1(o)}"/>`;
    pk.push([sx+sw*.32,base-a,o,i])}
  const dec=i=>Math.round((1-A[i])*100),bad=dec(3)>10;
  if(pk.length>1)s+=`<path d="${pk.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('')}" style="fill:none;stroke:var(--ink);stroke-width:1.1;opacity:.55"/>`;
  pk.forEach(([px,py,o,i])=>{const hi=(i===3||i===4);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${hi?3.8:2.6}" style="fill:${hi&&bad?'var(--ab)':'var(--nerve)'};opacity:${f1(o)}"/>`});
  let ann,rd;
  if(!on){ann='the train builds at step 3';rd=''}
  else if(k<5){ann=`pulse ${Math.min(10,k+1)} of 10, a third of a second apart`;rd=k>=1?`1st→${k+1}${['st','nd','rd','th','th'][Math.min(4,k)]}: −${dec(Math.min(k,9))}%`:''}
  else{ann=tag==='c'?'healthy junction: the train stays flat':tag==='o'?'hand muscle: decrement under 10%, read as normal':'U shape: lowest at the 4th–5th, then partial recovery';
    rd=`1st→4th −${dec(3)}% · 1st→5th −${dec(4)}% · ${bad?'abnormal (over 10%)':'normal (under 10%)'}`}
  s+=`<text x="${x+12}" y="${y+33}" class="t-xs" style="${on&&k>=5&&bad?'fill:var(--ab)':''}">${ann}</text>`;
  if(rd)s+=`<text x="${x+12}" y="${y+h-7}" class="t-sm" style="fill:${bad&&k>=4?'var(--ab)':'var(--ink)'};font-weight:600">${rd}</text>`;
  return s}
/* the SFEMG overlay */
function dxSF(P,t,J,M,N){
  const {x,y,w,h}=P,on=t>=.58;let s=dxPanel(P);
  s+=`<text x="${x+12}" y="${y+18}" class="t-lbl">Jitter</text><text x="${x+60}" y="${y+18}" class="t-sm">${M.sf}</text><text x="${x+w-10}" y="${y+18}" class="t-xs t-end">schematic</text>`;
  const yb=y+Math.round(h*.5)+6,a1=N?32:26,a2=N?28:22,x1=x+w*.26,sc=N?.32:.34,x2n=x1+300*sc,L=x+14,R=x+w-14;
  const k=on?Math.min(20,Math.floor(ramp(t,.6,.76)*20)+1):0;
  const spike=(X,a)=>`H${f1(X-14)}L${f1(X-5)} ${yb-2}L${f1(X-2)} ${f1(yb-a)}L${f1(X+3)} ${f1(yb+a*.6)}L${f1(X+8)} ${yb+3}L${f1(X+16)} ${yb}`;
  s+=`<path d="M${L} ${yb}H${R}" class="axis"/>`;
  if(!on){s+=`<text x="${x+w/2}" y="${yb-a1-14}" class="t-xs t-mid">sweeps overlay at step 4</text>`}
  let xs=[];
  for(let i=0;i<k;i++){const cur=i===k-1,b=J.b.has(i),X2=x2n+J.d[i]*sc;
    s+=`<path d="M${L} ${yb}${spike(x1,a1)}${b?'':spike(X2,a2)}H${R}" style="fill:none;stroke:${cur?'var(--nerve)':'var(--muted)'};stroke-width:${cur?1.8:1};opacity:${cur?1:.35};stroke-linejoin:round"/>`;
    if(!b)xs.push(X2);
    if(cur&&b)s+=`<path d="M${f1(x2n-6)} ${yb-a2*.6}l12 12m0 -12l-12 12" style="stroke:var(--ab);stroke-width:2"/><text x="${f1(x2n)}" y="${yb+a2*.6+16}" class="t-xs t-mid" style="fill:var(--ab)">blocked</text>`}
  s+=`<text x="${f1(x1)}" y="${yb+a1*.6+16}" class="t-xs t-mid">fibre 1 (trigger)</text>`;
  if(xs.length>=2){const lo=Math.min(...xs)-2,hi=Math.max(...xs)+2,by=yb-a2-10;
    s+=`<path d="M${f1(lo)} ${by+4}V${by}H${f1(hi)}V${by+4}" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="${f1((lo+hi)/2)}" y="${by-4}" class="t-xs t-mid" style="fill:var(--ink)">jitter</text>`}
  const sbY=yb+(N?34:32),sbX=R-100*sc-42;s+=`<path d="M${f1(sbX)} ${sbY}h${f1(100*sc)}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(sbX+100*sc+6)}" y="${sbY+3}" class="t-xs">100 µs</text>`;
  if(k>0){let sum=0,n=0,bl=0;for(let i=0;i<k;i++){if(J.b.has(i))bl++;if(i>0&&!J.b.has(i)&&!J.b.has(i-1)){sum+=Math.abs(J.d[i]-J.d[i-1]);n++}}
    const mcd=n?Math.round(sum/n):0,hi=n&&mcd>M.lim;
    const r1=n?`MCD ${mcd} µs · ${hi?'increased jitter':'normal'}${bl?' · with blocking':''}`:`sweep ${k} of 20`;
    const lim=`needle limit ${M.lim} µs (${M.sf})`,blk=`blocked ${bl} of ${k} sweeps`;
    s+=`<text x="${x+12}" y="${y+h-(N?36:22)}" class="t-sm" style="fill:${hi?'var(--ab)':'var(--ink)'};font-weight:600">${r1}</text>`;
    if(N)s+=`<text x="${x+12}" y="${y+h-22}" class="t-xs">${lim}</text><text x="${x+12}" y="${y+h-8}" class="t-xs">${blk}</text>`;
    else s+=`<text x="${x+12}" y="${y+h-8}" class="t-xs">${lim} · ${blk}</text>`}
  return s}

inits.dx=()=>{
  let mode='g',who='mg';
  /* ---------- 1. pathway + linked panels ---------- */
  const svg=$('#dxSvg'),rg=$('#dxT');
  function draw(t){
    const N=vb(svg,'720 482','400 956');
    const L=N?{fx:12,fw:346,fy:12,fh:44,fp:58,F:{x:12,y:418,w:376,h:122},R:{x:12,y:552,w:376,h:190},S:{x:12,y:754,w:376,h:190}}
             :{fx:12,fw:236,fy:14,fh:48,fp:66,F:{x:282,y:10,w:426,h:104},R:{x:282,y:124,w:426,h:170},S:{x:282,y:304,w:426,h:168}};
    let cur=0;for(let i=0;i<7;i++)if(t>=DX_NT[i])cur=i;
    let s=`<defs>${marker('dxA')}${marker('dxAn','var(--nerve)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const bx=L.fx+L.fw+12,mid=i=>L.fy+i*L.fp+L.fh/2;
    /* bypass: a positive antibody goes straight to chest imaging */
    const byOn=cur>=1;
    s+=`<path d="M${L.fx+L.fw} ${mid(1)}H${bx}V${mid(6)}H${L.fx+L.fw+3}" style="fill:none;stroke:${byOn?'var(--achr)':'var(--line)'};stroke-width:1.6;stroke-dasharray:5 4" marker-end="url(#dxA)"/>`;
    [2,3].forEach(i=>{s+=`<path d="M${L.fx+L.fw} ${mid(i)}H${bx}" style="fill:none;stroke:${byOn?'var(--achr)':'var(--line)'};stroke-width:1.6;stroke-dasharray:5 4"/>`});
    s+=`<text transform="translate(${bx+4} ${mid(1)+14}) rotate(90)" class="t-xs" style="fill:${byOn?'var(--achr)':'var(--muted)'}">if any antibody is positive → chest imaging</text>`;
    /* links */
    for(let i=0;i<6;i++){const y0=L.fy+i*L.fp+L.fh,y1=L.fy+(i+1)*L.fp,done=i<cur;
      s+=`<path d="M${L.fx+20} ${y0}V${y1-2}" style="fill:none;stroke:${done?'var(--nerve)':'var(--muted)'};stroke-width:${done?2:1.3}" marker-end="url(#${done?'dxAn':'dxA'})"/>`;
      if(DX_LINKS[i])s+=`<text x="${L.fx+30}" y="${y0+(L.fp-L.fh)/2+4}" class="t-xs">${DX_LINKS[i]}</text>`}
    /* nodes */
    DX_NODES.forEach((nd,i)=>{const y=L.fy+i*L.fp,on=i===cur,done=i<cur;
      s+=`<g class="clk" data-dxnode="${i}" tabindex="0" role="button" aria-label="${nd.ti}: ${mode==='g'?nd.g:nd.o}">`;
      s+=`<rect x="${L.fx}" y="${y}" width="${L.fw}" height="${L.fh}" rx="10" style="fill:${on?'var(--nerve-soft)':'var(--panel)'};stroke:${on?'var(--nerve)':done?'var(--achr)':'var(--line)'};stroke-width:${on?2.2:1.3}"/>`;
      s+=dxGlyph(i,L.fx+20,y+L.fh/2,on||done,t);
      s+=`<text x="${L.fx+40}" y="${y+19}" class="t-lbl">${nd.ti}</text><text x="${L.fx+40}" y="${y+34}" class="t-xs" style="${on?'fill:var(--ink)':''}">${mode==='g'?nd.g:nd.o}</text>`;
      if(done)s+=`<circle cx="${L.fx+L.fw-10}" cy="${y+10}" r="6.5" style="fill:var(--achr)"/><path d="M${L.fx+L.fw-13} ${y+10}l2.2 2.4 4 -4.6" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round"/>`;
      s+='</g>'});
    /* traveller on the left edge */
    const lp=ramp(t,DX_NT[cur],DX_NT[cur+1]),m=cur<6?ease(ramp(lp,.8,1)):0;
    s+=`<circle cx="${L.fx}" cy="${f1(lerp(mid(cur),mid(Math.min(6,cur+1)),m))}" r="7" style="fill:var(--nerve);stroke:var(--panel);stroke-width:2.5"/>`;
    /* linked panels */
    const tag=who==='ctl'?'c':mode;
    s+=dxFocus(L.F,t,mode);
    s+=dxRNS(L.R,t,DX_RNSA[tag],DX_MUS[mode].rns,tag);
    s+=dxSF(L.S,t,DX_JIT[tag],DX_MUS[mode],N);
    svg.innerHTML=s;
    const p=phaseOf(DX_STEPS,t),S=DX_STEPS[p];setSt(p);
    $('#dxNote').innerHTML=noteHTML({k:S.k+' · '+(mode==='g'?'generalized':'ocular'),t:S.t,txt:S.txt+(S[mode]?' '+S[mode]:''),pt:S.pt,hook:S.hook});
    $('#dxCap').textContent=`${mode==='g'?'Generalized':'Ocular'} MG · traces from ${who==='ctl'?'healthy muscle':'a person with MG'} · RNS of a ${DX_MUS[mode].rns}, jitter in ${DX_MUS[mode].sf}. Traces are schematic, not recordings; sensitivities are published figures. Click a box to jump to it.`;
  }
  const stop=playWire(rg,$('#dxPlay'),draw,22000,'Replay','dx');
  const setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  const jump=i=>{stop();const v=Math.min(.99,DX_NT[i]+(i===4?.17:i===5?.19:.03));rg.value=v;draw(v)};
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dxnode]');if(g)jump(+g.dataset.dxnode)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-dxnode]');if(!g||(e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();const i=+g.dataset.dxnode;jump(i);const ng=svg.querySelector(`[data-dxnode="${i}"]`);ng&&ng.focus()});

  /* ---------- 2. calculator + 100-person grid ---------- */
  const gs=$('#dxGrid'),gr=$('#dxGridT'),se=$('#dxSe'),sp=$('#dxSp'),pr=$('#dxPr');let test='achr';
  const pct=v=>(v*100<10&&v>0?(Math.round(v*1000)/10).toFixed(1):Math.round(v*100))+'%';
  function nums(){const sens=+se.value/100,spec=+sp.value/100,pre=+pr.value/100;
    const D=Math.round(100*pre),TP=Math.round(D*sens),FN=D-TP,H=100-D,TN=Math.round(H*spec),FP=H-TN;
    const pp=sens*pre/(sens*pre+(1-spec)*(1-pre)||1),pn=(1-sens)*pre/((1-sens)*pre+spec*(1-pre)||1);
    return {sens,spec,pre,D,TP,FN,H,TN,FP,pp,pn,lrp:spec>=1?Infinity:sens/(1-spec),lrn:(1-sens)/spec}}
  function drawGrid(t){
    const N=vb(gs,'720 340','400 650');
    const L=N?{cell:30,gx:50,gy:50,lx:[24,214],ly:[392,432],px:24,py:[490,548,606],bw:280}
             :{cell:26,gx:30,gy:50,lx:[330,520],ly:[72,112],px:330,py:[164,222,280],bw:290};
    const n=nums(),c=L.cell,app=ramp(t,0,.25),o1=ramp(t,.3,.5),o2=ramp(t,.55,.75),o3=ramp(t,.8,1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const head=t<.3?'100 people tested':t<.55?`${n.D} truly have MG (${pr.value}%)`:`${n.TP+n.FP} test positive, ${n.TN+n.FN} test negative`;
    s+=`<text x="${L.gx}" y="30" class="t-lbl">${head}</text>`;
    for(let i=0;i<100;i++){if(i/100>=app&&app<1)break;
      const x=L.gx+(i%10)*c+c/2,y=L.gy+Math.floor(i/10)*c+c/2,dis=i<n.D,tp=i<n.TP,fp=!dis&&i<n.D+n.FP;
      if(dis){if(o1<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.13)}" style="fill:var(--muted);opacity:${f1(1-o1)}"/>`;
        if(o1>0){if(!tp||o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.3)}" style="fill:none;stroke:var(--ab);stroke-width:1.8;opacity:${f1(tp?o1*(1-o2):o1)}"/>`;
          if(tp&&o2>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.34)}" style="fill:var(--ab);opacity:${f1(o2)}"/>`}}
      else if(fp){if(o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.13)}" style="fill:var(--muted);opacity:${f1(1-o2)}"/>`;
        if(o2>0)s+=`<rect x="${f1(x-c*.3)}" y="${f1(y-c*.3)}" width="${f1(c*.6)}" height="${f1(c*.6)}" rx="2" style="fill:var(--warn);opacity:${f1(o2)}"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.13)}" style="fill:var(--muted)"/>`}
    const LG=[['tp','Has MG, positive',n.TP],['fn','Has MG, negative',n.FN],['fp','No MG, positive',n.FP],['tn','No MG, negative',n.TN]];
    LG.forEach(([k,l,v],i)=>{const x=L.lx[i%2],y=L.ly[Math.floor(i/2)];
      const mk=k==='tp'?`<circle cx="${x+6}" cy="${y-4}" r="6" style="fill:var(--ab)"/>`:k==='fn'?`<circle cx="${x+6}" cy="${y-4}" r="5" style="fill:none;stroke:var(--ab);stroke-width:1.8"/>`:k==='fp'?`<rect x="${x}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(--warn)"/>`:`<circle cx="${x+6}" cy="${y-4}" r="2.6" style="fill:var(--muted)"/>`;
      s+=`<g style="opacity:${f1(.3+.7*o2)}">${mk}<text x="${x+20}" y="${y}" class="t-sm" style="fill:var(--ink)">${l} <tspan style="font-weight:700">${o2>0?v:'–'}</tspan></text><text x="${x+20}" y="${y+14}" class="t-xs">${k==='tp'?'true positive':k==='fn'?'false negative':k==='fp'?'false positive':'true negative'}</text></g>`});
    const B=[['Before the test',n.pre,'var(--muted)',`pre-test probability`],['After a positive result',n.pp,'var(--ab)',`${n.TP} of ${n.TP+n.FP} positives have MG in the grid`],['After a negative result',n.pn,'var(--achr)',`${n.FN} of ${n.TN+n.FN} negatives have MG in the grid`]];
    B.forEach(([l,v,col,d],i)=>{const y=L.py[i],op=i===0?Math.max(.35,o1):o3;
      s+=`<g style="opacity:${f1(.25+.75*op)}"><text x="${L.px}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text><rect x="${L.px}" y="${y+6}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.px}" y="${y+6}" width="${f1(L.bw*v*(i===0?1:ease(o3)))}" height="14" rx="4" style="fill:${col}"/><text x="${L.px+L.bw+8}" y="${y+18}" class="t-lbl">${pct(v)}</text><text x="${L.px}" y="${y+33}" class="t-xs">${d}</text></g>`});
    gs.innerHTML=s;
    const p=phaseOf(DX_GSTEPS,t),P=DX_GSTEPS[p];let txt;
    if(p===0)txt=`Imagine 100 people like the person being tested, all given the same test.`;
    else if(p===1)txt=`With a pre-test probability of ${pr.value}%, ${n.D} of the 100 truly have MG (rings) and ${n.H} do not.`;
    else txt=`Sensitivity ${se.value}% finds ${n.TP} of the ${n.D} with MG and misses ${n.FN}. Specificity ${sp.value}% clears ${n.TN} of the ${n.H} without MG, but ${n.FP} test positive anyway. So after a positive result the probability of MG is ${pct(n.pp)}, and after a negative result ${pct(n.pn)}.`;
    $('#dxGridNote').innerHTML=noteHTML({k:P.k+' · teaching tool',t:P.t,txt,
      pt:`A positive result means more when MG was already likely. A negative result rules MG out best when the test rarely misses it.`,
      hook:`Sensitivity and specificity belong to the test; the post-test probability also depends on who is tested. A normal concentric-needle jitter study in a weak muscle had a negative predictive value of about 98%. [[Rousseff2021]]`});
    gr.setAttribute('aria-valuetext',`${P.t}. After a positive result ${pct(n.pp)}, after a negative result ${pct(n.pn)}`);
  }
  const gstop=playWire(gr,$('#dxGridPlay'),drawGrid,9000,'Replay','dx');
  function results(){const n=nums(),lr=v=>v===Infinity?'∞':v>=10?Math.round(v):(Math.round(v*100)/100);
    $('#dxRes').innerHTML=`<div><small>Before the test</small><b class="big">${pr.value}%</b><span>pre-test probability</span></div>
     <div class="pos"><small>If the result is positive</small><b class="big">${pct(n.pp)}</b><span>likelihood ratio ${lr(n.lrp)} (derived)</span></div>
     <div class="neg"><small>If the result is negative</small><b class="big">${pct(n.pn)}</b><span>likelihood ratio ${lr(n.lrn)} (derived)</span></div>`}
  function sync(){$('#dxSeV').textContent=se.value+'%';$('#dxSpV').textContent=sp.value+'%';$('#dxPrV').textContent=pr.value+'%';
    const T=DX_TESTS[test],v=T[mode];
    $$('#m-dx [data-dxt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dxt===test&&!!v&&+se.value===v[0]&&+sp.value===v[1]));
    $$('#m-dx [data-dxpre]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dxpre===pr.value));
    results();gstop();if(+gr.value<.8)gr.value=1;drawGrid(+gr.value)}
  function loadTest(){const T=DX_TESTS[test];let v=T[mode];
    if(!v){test=mode==='o'?(test==='rnsp'?'rnsd':'achr'):'achr';return loadTest()}
    se.value=v[0];sp.value=v[1];$('#dxSrc').innerHTML=(mode==='g'?'Generalized MG. ':'Ocular MG. ')+(mode==='g'?T.sg:T.so);
    $$('#m-dx [data-dxt]').forEach(b=>{b.disabled=!DX_TESTS[b.dataset.dxt][mode];b.title=b.disabled?(mode==='o'?'No ocular figure in the sources':'Studied in ptosis: switch to Ocular'):''});
    sync()}
  $$('#m-dx [data-dxt]').forEach(b=>b.onclick=()=>{if(b.disabled)return;test=b.dataset.dxt;loadTest()});
  $$('#m-dx [data-dxpre]').forEach(b=>b.onclick=()=>{pr.value=b.dataset.dxpre;sync()});
  [se,sp,pr].forEach(r=>r.addEventListener('input',sync));
  /* shared toggles */
  const setMode=m=>{mode=m;$$('#m-dx [data-dxmode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dxmode===m));draw(+rg.value);loadTest()};
  $$('#m-dx [data-dxmode]').forEach(b=>b.onclick=()=>setMode(b.dataset.dxmode));
  $$('#m-dx [data-dxp]').forEach(b=>b.onclick=()=>{who=b.dataset.dxp;$$('#m-dx [data-dxp]').forEach(c=>c.setAttribute('aria-pressed',c===b));draw(+rg.value)});
  draw(+rg.value);loadTest();
};
