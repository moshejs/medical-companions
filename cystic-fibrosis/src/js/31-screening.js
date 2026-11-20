/* =============== 3.1 Newborn screening & diagnosis =============== */
/* Main scrubber: a schematic stream of newborns flows from the dried blood spot through the IRT tier, the
   variant panel and the sequencing tier to referral, the sweat test and the three outcomes. The numbers in
   each detail panel are the research pass's (McGarry2025NBS, Kharrazi2015, Farrell2008Dx, Ren2017CRMS ...).
   The dots themselves are schematic: how many leave at each tier is not to scale. */
const NS_STEPS=[
 {from:0,at:.08,k:'Step 1 · the first days of life',t:'A few drops of blood',sub:'a heel prick fills the spots on a card',short:'Blood spot',
  txt:`Every newborn in the US and the UK has a few drops of blood dried on a card. CF screening became possible in 1979, when Crossley, Elliott and Smith in New Zealand set up a dried-blood-spot assay for immunoreactive trypsinogen (IRT), a pancreatic protein that is raised in babies with CF in the first months of life. Screening has been universal in the US since 2010 and across the UK since 2007; in Europe in 2016 there were 17 national programmes and 25 countries not screening. [[Crossley1979,McGarry2025NBS,Schluter2020,Barben2017Europe]]`,
  pt:`A nurse pricks the baby's heel and puts a few drops of blood on a card. The card goes to a laboratory that checks it for several conditions, CF among them. [[McGarry2025NBS,Schluter2020]]`,
  hook:`The first CF newborn screen was dried-blood-spot IRT (Crossley, 1979). [[Crossley1979]]`},
 {from:.17,at:.25,k:'Step 2 · tier one',t:'IRT: high or not?',sub:'a cutoff splits off the top few per cent',short:'IRT',
  txt:`Every US protocol starts with IRT. It is usually high in babies with CF, but it can also be high in carriers and for reasons unrelated to CF: birth stress, prematurity, ancestry, temperature, season and kit-to-kit variation. US fixed cutoffs range from 50 to 100 ng/mL and floating cutoffs from the 95th to the 98.8th percentile; the 2025 CF Foundation guideline recommends a floating cutoff. In Colorado, 7 of 8 cases missed with a fixed 60 ng/mL cutoff would have been found with a floating 96th-percentile cutoff. [[McGarry2025NBS]]`,
  pt:`IRT is a "maybe" test. A high value means the baby needs a second look, not that the baby has CF. [[McGarry2025NBS]]`,
  hook:`IRT is sensitive but not specific: carriers, prematurity and birth stress raise it too. [[McGarry2025NBS]]`},
 {from:.34,at:.42,k:'Step 3 · tier two',t:'Looking for CFTR variants',sub:'IRT/IRT gave way to IRT/DNA after 1989',short:'Panel',
  txt:`The first protocol repeated IRT a few weeks later (IRT/IRT). After the CFTR gene and F508del were found in 1989, programmes replaced the second IRT with DNA testing (IRT/DNA): sensitivity rose and diagnosis came sooner, at the cost of a bias toward infants of European descent. A single-variant tier is weak with a limited panel: 56–90% for F508del alone and 47–93% for the ACMG-23 panel, lower still in American Indian, Asian, Black, Hispanic and multiracial infants. The 2025 guideline asks programmes to screen for all CF-causing variants in CFTR2. [[McGarry2025NBS,Riordan1989,Kerem1989]]`,
  pt:`The lab looks in the same blood spot for changes in the CFTR gene. A short list of changes finds most babies of European ancestry with CF but misses more babies of other ancestries. [[McGarry2025NBS]]`,
  hook:`IRT/IRT → IRT/DNA (after 1989) → IRT/DNA/SEQ. Limited panels cause inequity in detection. [[McGarry2025NBS]]`},
 {from:.5,at:.58,k:'Step 4 · tier three',t:'Reading the whole gene',sub:'sequencing the infants with one variant',short:'Sequence',
  txt:`Under IRT/DNA/SEQ, infants with one CF-causing variant go on to sequencing of all CFTR exons, flanking introns and selected intronic variants, and most such programmes refer only infants with two CF-causing variants. Programmes with a sequencing tier generally kept sensitivity above 90%, specificity at 99–100% and PPV at 34–77%. California's model (IRT ≥62 ng/mL, the top 1.6%, then a 28–40 variant panel, then sequencing) screened 2,573,293 newborns in 2007–2012: sensitivity 92%, PPV 34%, 28 CF cases missed. Sequencing still misses structural and deep intronic variants unless they are targeted. [[McGarry2025NBS,Kharrazi2015]]`,
  pt:`For babies with one gene change found, the lab reads the whole CFTR gene to look for a second one. [[McGarry2025NBS]]`,
  hook:`California's 3-tier model: sensitivity 92%, PPV 34%, median referral at 34 days. [[Kharrazi2015]]`},
 {from:.66,at:.74,k:'Step 5 · referral',t:'Call the family, test the sweat',sub:'both the GP and the CF centre are told',short:'Sweat test',
  txt:`The 2025 guideline recommends notifying both the primary care provider and the CF specialist: infants were seen earlier, and delayed evaluation was less likely, when both were told. The 2008 CF Foundation guideline recommends sweat testing an asymptomatic screen-positive newborn at ≥2 weeks of age, weight &gt;2 kg and &gt;36 weeks gestation at birth, ideally on both arms; symptomatic newborns, for example with meconium ileus, can be tested from 48 hours if enough sweat is collected. A 2023 review summarises practice as testing by 4 weeks of age. In a 2023 US survey, 45% of caregivers waited 8 or more days for the first CF evaluation. [[McGarry2025NBS,Farrell2008Dx,DeCelieGermana2023,Heffernan2025]]`,
  pt:`A "positive" newborn screen means the baby needs more testing. It does not mean the baby has CF; many babies with a positive screen are healthy carriers. [[McGarry2025NBS]]`,
  hook:`Sweat test a screen-positive infant at ≥2 weeks, >2 kg and >36 weeks gestation; symptomatic newborns from 48 hours. [[Farrell2008Dx]]`},
 {from:.83,at:.92,k:'Step 6 · the answer',t:'CF, inconclusive, or a carrier',sub:'the sweat test and the genes together',short:'Outcome',
  txt:`Under the 2017 CF Foundation guideline, sweat chloride ≥60 mmol/L is diagnostic of CF, 30–59 is intermediate and &lt;30 makes CF unlikely, at all ages. Even a baby with two CF-causing variants needs CFTR dysfunction shown to confirm the diagnosis. A positive screen with an inconclusive sweat test and genetics is called CRMS/CFSPID; most of these babies never develop CF disease, and 10–20% develop features that raise concern. Parents of presumed carriers should be told and offered genetic counselling. California found 345 CF cases, 533 CRMS cases and 1617 carriers. [[Farrell2017Dx,DeCelieGermana2023,Farrell2017Screened,Ren2017CRMS,McGarry2025NBS,Kharrazi2015]]`,
  pt:`Being a carrier is common. It is nobody's fault and does not make a person sick. Babies with an "inconclusive" result are followed for a few years to be safe, and most stay healthy. [[McGarry2025NBS,Barben2021]]`,
  hook:`CRMS = CFSPID: a positive screen with inconclusive sweat and genetic results; 10–20% develop features of concern. [[Ren2017CRMS]]`}
];
inits.screening=()=>{
  const svg=$('#nsSvg'),rg=$('#nsT'),note=$('#nsNote'),rd=$('#nsRead');
  let setSt=()=>{};
  /* each schematic newborn leaves the stream at one node: 1 normal IRT, 2 no variant, 3 one variant only, 5 at the outcome */
  const R=rng(3107),DOTS=[];for(let i=0;i<46;i++){const r=R();DOTS.push({fate:r<.55?1:r<.75?2:r<.88?3:5,out:r<.88?0:r<.93?0:r<.97?1:2,ph:i/46,j:(R()-.5)})}
  const OUTC=[{t:'CF',c:'var(--variant)'},{t:'CRMS/CFSPID',c:'var(--warn)'},{t:'carrier / not CF',c:'var(--dx)'}];
  function box(s,B,on){return s+`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`}
  function rangeBar(x,y,w,lo,hi,lbl,col,u,pt){/* a 0–100% axis with a shaded range and an optional point */
    const X=v=>x+w*v/100,g=ease(clamp(u));let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(X(lo))}" y="${f1(y)}" width="${f1(Math.max(2,(X(hi)-X(lo))*g))}" height="12" rx="6" style="fill:${col};opacity:.75"/>`;
    if(pt!=null&&g>.9)s+=`<path d="M${f1(X(pt))} ${f1(y+14)}l-5 8h10z" style="fill:var(--ink)"/>`;
    s+=`<text x="${f1(x)}" y="${f1(y-5)}" class="t-xs" style="fill:var(--ink)">${lbl}</text>`;return s}
  function axis100(x,y,w){let s='';[0,25,50,75,100].forEach(v=>{s+=`<text x="${f1(x+w*v/100)}" y="${f1(y)}" class="t-xs t-mid">${v}%</text>`});return s}
  /* ---------- the six detail panels ---------- */
  function d0(B,u,N){let s='';const cx=B.x+(N?96:110),cy=B.y+B.h*(N?.3:.5);
    /* a heel and a card with four spots */
    s+=`<path d="M${cx-60} ${cy-50}C${cx-64} ${cy-10} ${cx-58} ${cy+30} ${cx-30} ${cy+44}C${cx-6} ${cy+56} ${cx+30} ${cy+50} ${cx+40} ${cy+30}C${cx+46} ${cy+16} ${cx+30} ${cy+6} ${cx+6} ${cy+4}C${cx-18} ${cy+2} ${cx-24} ${cy-24} ${cx-22} ${cy-50}Z" style="fill:var(--skin);stroke:var(--muted);stroke-width:1"/>`;
    const dr=ramp(u,.1,.4);s+=`<circle cx="${cx-34}" cy="${cy+36}" r="${f1(2+3*dr)}" style="fill:var(--inflamed);opacity:${f1(dr)}"/><text x="${cx-34}" y="${cy+66}" class="t-xs t-mid">heel prick</text>`;
    const kx=cx+(N?66:80),ky=cy-44;s+=`<rect x="${kx}" y="${ky}" width="${N?110:130}" height="80" rx="6" style="fill:var(--cell);stroke:var(--muted)"/><text x="${kx+8}" y="${ky+14}" class="t-xs">blood spot card</text>`;
    for(let i=0;i<4;i++){const f=ramp(u,.3+i*.12,.42+i*.12),sx=kx+(N?20:24)+i*(N?24:28);s+=`<circle cx="${sx}" cy="${ky+46}" r="10" style="fill:none;stroke:var(--muted);stroke-dasharray:2 2"/><circle cx="${sx}" cy="${ky+46}" r="${f1(9*f)}" style="fill:var(--inflamed);opacity:.8"/>`}
    const L=[['1979','dried-blood-spot IRT (New Zealand)'],['2007','universal across the UK'],['2010','universal across the US'],['2016','Europe: 17 national programmes']];
    const tx=N?B.x+16:B.x+B.w*.52,ty=N?B.y+B.h*.62:B.y+40;
    L.forEach((r,i)=>{const o=ramp(u,.2+i*.15,.3+i*.15);s+=`<g style="opacity:${f1(o)}"><text x="${tx}" y="${ty+i*(N?30:36)}" class="t-lbl" style="fill:var(--dx)">${r[0]}</text><text x="${tx+44}" y="${ty+i*(N?30:36)}" class="t-sm" style="fill:var(--ink)">${r[1]}</text></g>`});
    return s}
  function d1(B,u,N){let s='';const x=B.x+20,w=B.w-40,y=B.y+(N?60:44),h=N?130:96;
    /* a right-skewed schematic distribution with the cutoff sliding in */
    const f=v=>{const z=Math.log(.05+v*3);return Math.exp(-Math.pow(z-.1,2)/.5)};
    const cut=lerp(.98,.62,ease(ramp(u,.15,.55))),vh=.84;
    s+=`<text x="${x}" y="${B.y+22}" class="t-lbl">IRT on the blood spot (schematic distribution)</text>`;
    s+=`<path d="${pathFn(v=>1-f(v),x,x+w,y,y+h)}L${x+w} ${y+h}L${x} ${y+h}Z" style="fill:var(--dx-soft)"/>`;
    s+=`<path d="${pathFn(v=>v<cut?1:1-f(v),x,x+w,y,y+h,200)}L${x+w} ${y+h}L${f1(x+w*cut)} ${y+h}Z" style="fill:var(--dx);opacity:.55"/>`;
    s+=`<path d="${pathFn(v=>1-f(v),x,x+w,y,y+h)}" style="fill:none;stroke:var(--dx);stroke-width:2"/><line x1="${x}" x2="${x+w}" y1="${y+h}" y2="${y+h}" class="axis"/>`;
    const cx=x+w*cut;s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${y-8}" y2="${y+h}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(cx-4)}" y="${y-12}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">cutoff</text>`;
    if(u>.6){const vx=x+w*vh;s+=`<line x1="${f1(vx)}" x2="${f1(vx)}" y1="${y+20}" y2="${y+h}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3;opacity:${f1(ramp(u,.6,.75))}"/><text x="${f1(vx+4)}" y="${y+30}" class="t-xs" style="fill:var(--bad);opacity:${f1(ramp(u,.6,.75))}">very high</text>`}
    s+=`<text x="${x}" y="${y+h+14}" class="t-xs">low IRT</text><text x="${x+w}" y="${y+h+14}" class="t-xs t-end">high IRT → next tier</text>`;
    const ly=y+h+(N?40:32),lines=N?['fixed cutoffs: 50–100 ng/mL','floating: 95th–98.8th percentile','very high IRT (failsafe): about 99th']:['US cutoffs: fixed 50–100 ng/mL, or floating 95th–98.8th percentile','very high IRT ("failsafe", about the 99th): flagged even with no variant'];
    lines.forEach((t,i)=>{s+=`<text x="${x}" y="${ly+i*(N?16:15)}" class="t-sm" style="fill:var(--ink)">${t}</text>`});
    if(N){['also raised by: carrier status,','prematurity, birth stress, season'].forEach((t,i)=>{s+=`<text x="${x}" y="${ly+56+i*15}" class="t-xs">${t}</text>`})}
    else s+=`<text x="${x}" y="${ly+33}" class="t-xs">also raised by: carrier status, prematurity, birth stress, ancestry, season, kit</text>`;
    return s}
  function d2(B,u,N){let s='';const x=B.x+20,w=B.w-40;let y=B.y+26;
    s+=`<text x="${x}" y="${y}" class="t-lbl">Sensitivity of a single-variant tier</text>`;y+=N?38:34;
    s+=rangeBar(x,y,w,56,90,'F508del only: 56–90%','var(--dx)',ramp(u,.05,.35));y+=N?40:34;
    s+=rangeBar(x,y,w,47,93,'ACMG-23 panel: 47–93%','var(--dx)',ramp(u,.2,.5));y+=22;
    s+=axis100(x,y,w);y+=N?26:22;
    s+=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--bad)">both lower in American Indian, Asian, Black,</text><text x="${x}" y="${y+13}" class="t-xs" style="fill:var(--bad)">Hispanic and multiracial infants</text>`;y+=N?44:40;
    const o=ramp(u,.5,.7);s+=`<g style="opacity:${f1(o)}"><rect x="${x}" y="${y-14}" width="${w}" height="${N?52:40}" rx="8" style="fill:var(--dx-soft)"/><text x="${x+10}" y="${y+2}" class="t-sm" style="fill:var(--dx);font-weight:700">2025 CF Foundation guideline</text><text x="${x+10}" y="${y+17}" class="t-xs" style="fill:var(--ink)">${N?'screen for all CFTR2 CF-causing variants,':'screen for all CFTR2 CF-causing variants; not F508del or ACMG-23 alone'}</text>${N?`<text x="${x+10}" y="${y+31}" class="t-xs" style="fill:var(--ink)">not F508del or ACMG-23 alone</text>`:''}</g>`;
    return s}
  function d3(B,u,N){let s='';const x=B.x+20,w=B.w-40;let y=B.y+26;
    s+=`<text x="${x}" y="${y}" class="t-lbl">With a sequencing tier</text><text x="${x+w}" y="${y}" class="t-xs t-end">▼ California</text>`;y+=N?36:30;
    s+=rangeBar(x,y,w,90,100,'sensitivity: above 90%','var(--good)',ramp(u,.05,.3),92);y+=N?36:30;
    s+=rangeBar(x,y,w,99,100,'specificity: 99–100%','var(--good)',ramp(u,.15,.4));y+=N?36:30;
    s+=rangeBar(x,y,w,34,77,'positive predictive value: 34–77%','var(--warn)',ramp(u,.25,.5),34);y+=30;
    s+=axis100(x,y,w);y+=N?34:26;
    const o=ramp(u,.5,.75);
    s+=`<g style="opacity:${f1(o)}"><text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?'Detection, Asian, Black, Hispanic infants':'California modelling: detection in Asian, Black and Hispanic infants'}</text></g>`;
    y+=N?24:20;s+=rangeBar(x,y,w*.48,17,79,'panel alone 17–79%','var(--dx)',ramp(u,.55,.8));s+=rangeBar(x+w*.52,y,w*.48,83,100,'+ sequencing 83–100%','var(--good)',ramp(u,.65,.9));
    return s}
  function d4(B,u,N,t){let s='';const x=B.x+20;
    const gx=N?B.x+B.w-56:B.x+B.w-90,gy=B.y+(N?196:30),G=sweatGland(gx,gy,N?.58:.8,{cf:.5,ph:t*8,labels:false});
    s+=`<text x="${x}" y="${B.y+24}" class="t-lbl">Abnormal result: who is told</text>`;
    const ny=B.y+40;[['primary care provider',ramp(u,.05,.2)],['CF specialist centre',ramp(u,.15,.3)]].forEach((r,i)=>{const bx=x+i*(N?150:170);
      s+=`<g style="opacity:${f1(r[1])}"><rect x="${bx}" y="${ny}" width="${N?140:160}" height="28" rx="8" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${bx+10}" y="${ny+18}" class="t-xs" style="fill:var(--ink);font-weight:600">${r[0]}</text></g>`});
    let y=ny+(N?58:62);s+=`<text x="${x}" y="${y}" class="t-lbl">Sweat test: when (2008 guideline)</text>`;
    const C=[['≥2 weeks of age'],['weight >2 kg'],['>36 weeks gestation at birth'],['ideally on both arms'],['symptomatic newborns: from 48 h']];
    C.forEach((c,i)=>{const o=ramp(u,.3+i*.1,.4+i*.1),yy=y+20+i*(N?22:20);s+=`<g style="opacity:${f1(.25+.75*o)}"><circle cx="${x+8}" cy="${yy-4}" r="7" style="fill:${o>.5?'var(--good)':'var(--panel-2)'}"/><path d="M${x+4} ${yy-4}l3 3l5 -6" style="fill:none;stroke:var(--on-brand);stroke-width:1.8;opacity:${o>.5?1:0}"/><text x="${x+22}" y="${yy}" class="t-sm" style="fill:var(--ink)">${c[0]}</text></g>`});
    {s+=G.svg;s+=`<text x="${gx}" y="${gy+(N?104:142)}" class="t-xs t-mid">sweat gland</text>`}
    return s}
  function d5(B,u,N){let s='';const x=B.x+20,w=B.w-40;
    /* three branches from the sweat test */
    const sx=N?B.x+B.w/2:x+60,sy=N?B.y+30:B.y+B.h/2-20;
    s+=`<rect x="${sx-46}" y="${sy-14}" width="92" height="28" rx="8" style="fill:var(--dx);"/><text x="${sx}" y="${sy+4}" class="t-sm t-mid" style="fill:var(--on-brand);font-weight:700">sweat test</text>`;
    const BR=[['≥60 mmol/L','CF','var(--variant)'],['inconclusive','CRMS/CFSPID','var(--warn)'],['<30, one variant','presumed carrier','var(--dx)']];
    BR.forEach((b,i)=>{const o=ramp(u,.08+i*.12,.22+i*.12);let ex,ey;
      if(N){ex=B.x+20+i*((B.w-40)/3)+(B.w-40)/6;ey=sy+70}else{ex=x+250;ey=B.y+30+i*44}
      s+=`<g style="opacity:${f1(o)}"><path d="M${N?sx:sx+46} ${N?sy+14:sy}${N?`C${sx} ${sy+40} ${ex} ${sy+30} ${ex} ${ey-16}`:`C${sx+100} ${sy} ${ex-90} ${ey} ${ex-48} ${ey}`}" style="fill:none;stroke:${b[2]};stroke-width:2.4"/>`;
      s+=N?`<text x="${ex}" y="${ey-2}" class="t-xs t-mid">${b[0]}</text><text x="${ex}" y="${ey+12}" class="t-sm t-mid" style="fill:${b[2]};font-weight:700">${b[1]}</text></g>`:`<text x="${ex-44}" y="${ey-5}" class="t-xs">${b[0]}</text><text x="${ex-44}" y="${ey+9}" class="t-sm" style="fill:${b[2]};font-weight:700">${b[1]}</text></g>`});
    /* California counts, 2007–2012 */
    const CA=[[345,'CF','var(--variant)'],[533,'CRMS','var(--warn)'],[1617,'carriers','var(--dx)']];
    const bx=N?x:x+420,bw=N?w-110:w-560,by=N?sy+108:B.y+34;
    s+=`<text x="${bx}" y="${by}" class="t-xs" style="fill:var(--ink);font-weight:600">California 2007–2012, 2,573,293 births</text>`;
    CA.forEach((c,i)=>{const g=ease(ramp(u,.4+i*.1,.6+i*.1)),yy=by+14+i*26,bl=bw*c[0]/1617*g;
      s+=`<rect x="${bx}" y="${yy}" width="${f1(Math.max(1,bl))}" height="16" rx="4" style="fill:${c[2]};opacity:.8"/><text x="${f1(bx+bl+6)}" y="${yy+12}" class="t-xs" style="fill:var(--ink)">${Math.round(c[0]*g)} ${c[1]}</text>`});
    const ty=by+14+3*26+12;
    s+=`<text x="${bx}" y="${ty}" class="t-xs" style="opacity:${f1(ramp(u,.75,.9))}">CRMS/CFSPID: 10–20% develop</text><text x="${bx}" y="${ty+13}" class="t-xs" style="opacity:${f1(ramp(u,.75,.9))}">features of concern for CF</text>`;
    return s}
  const DET=[d0,d1,d2,d3,d4,d5];
  function draw(t){const N=vb(svg,'720 400','400 520'),p=phaseOf(NS_STEPS,t),S=NS_STEPS[p],nx=p<5?NS_STEPS[p+1].from:1.0001,lp=ramp(t,S.from,nx-.02);
    const L=N?{ty:24,y:84,x0:34,x1:366,dx:16,dy:126,dw:368,dh:340,sy:490}:{ty:26,y:84,x0:52,x1:668,dx:16,dy:126,dw:688,dh:226,sy:372};
    let s=`<text x="16" y="${L.ty}" class="t-big" style="fill:var(--dx)">${S.t}</text><text x="16" y="${L.ty+16}" class="t-sm">${S.sub}</text>`;
    const NX=i=>lerp(L.x0,L.x1,i/5);
    /* the track */
    s+=`<line x1="${L.x0}" x2="${f1(NX(Math.min(5,p+.999)))}" y1="${L.y}" y2="${L.y}" style="stroke:var(--dx);stroke-width:3;opacity:.35"/><line x1="${f1(NX(Math.min(5,p+.999)))}" x2="${L.x1}" y1="${L.y}" y2="${L.y}" style="stroke:var(--line);stroke-width:3;stroke-dasharray:4 4"/>`;
    /* the stream of schematic newborns */
    const front=p+(p<5?ease(ramp(lp,0,.6)):0);
    DOTS.forEach((d,i)=>{const pos=((t*6+d.ph)%1)*5.6;let x,y,op=1,col='var(--dx)';
      const stop=Math.min(d.fate,front);
      if(pos<=stop){x=lerp(L.x0,L.x1,pos/5);y=L.y+d.j*10}
      else if(stop<d.fate){return}
      else{const k=pos-d.fate;x=NX(d.fate)+(d.j*16);
        if(d.fate===5){const oc=OUTC[d.out];col=oc.c;x=NX(5)+(N?-12:10)+d.out*(N?12:0);y=L.y+(N?14:-14+d.out*14)+k*0;op=clamp(1-k*.9)}
        else{y=L.y+10+k*34;op=clamp(1-k*1.2);col='var(--muted)'}}
      if(op>.02)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" style="fill:${col};opacity:${f1(op)}"/>`});
    /* the nodes */
    NS_STEPS.forEach((q,i)=>{const x=NX(i),on=i===p,done=i<p;
      s+=`<circle cx="${f1(x)}" cy="${L.y}" r="${on?15:12}" style="fill:${on?'var(--dx)':done?'var(--dx-soft)':'var(--panel)'};stroke:${i<=p?'var(--dx)':'var(--line)'};stroke-width:2"/><text x="${f1(x)}" y="${L.y+4}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${f1(x)}" y="${L.y-22}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.short}</text>`});
    if(!N)s+=`<text x="704" y="${L.ty}" class="t-xs t-end">dots: schematic newborns, not to scale</text>`;
    const B={x:L.dx,y:L.dy,w:L.dw,h:L.dh};s=box(s,B);
    s+=DET[p](B,lp,N,t);
    /* progress strip */
    const sw=(N?368:688)/6;NS_STEPS.forEach((q,j)=>{const on=j===p,xx=16+j*sw;s+=`<rect x="${f1(xx+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--dx)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(16+(N?368:688)*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const RD=[['Sample','dried blood spot'],['Tier 1','IRT: floating cutoff'],['Tier 2','CFTR variant panel'],['Tier 3','CFTR sequencing'],['Referral','GP + CF centre; sweat test'],['Result','CF · CRMS/CFSPID · carrier']][p];
    rd.innerHTML=`<span>${RD[0]} <b>${RD[1]}</b></span><span>Step <b>${p+1} of 6</b></span>`;
    note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#nsPlay'),draw,42000,'%t:player.replay%','screening');
  setSt=stepWire($('#nsSteps'),NS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- Wisconsin trial: screened vs control ---------- */
  const WI={dx97:{t:'Age at diagnosis, 1997 report',u:'weeks (mean)',a:12,b:72,max:110,src:'[[Farrell1997]]',txt:'Mean age at diagnosis: 12 weeks with screening, 72 weeks in the control group (diagnosis confirmed by sweat test).'},
    dx01:{t:'Age at diagnosis, no meconium ileus',u:'weeks (mean)',a:13,b:100,max:110,src:'[[Farrell2001]]',txt:'Excluding infants with meconium ileus, mean (±SD) age at diagnosis was 13 ± 37 weeks screened and 100 ± 117 weeks in controls.'},
    head:{t:'Head circumference at diagnosis',u:'percentile (mean)',a:52,b:32,max:100,src:'[[Farrell1997]]',txt:'Mean head-circumference percentile was 52nd with screening and 32nd in controls (P=0.003).'}};
  const ws=$('#nsWiSvg'),wn=$('#nsWiNote');let wk='dx97',stopW=null;
  function drawWi(g){const N=vb(ws,'720 170','400 230'),D=WI[wk],x0=N?96:150,w=N?250:470,X=v=>x0+w*v/D.max;
    let s=`<text x="16" y="24" class="t-lbl">${D.t}</text><text x="${N?16:x0+w}" y="${N?40:24}" class="${N?'t-xs':'t-xs t-end'}">${D.u}</text>`;
    [['Screened',D.a,'var(--dx)'],['Control',D.b,'var(--muted)']].forEach((r,i)=>{const y=(N?62:52)+i*(N?52:44),v=r[1]*g;
      s+=`<text x="16" y="${y+15}" class="t-sm" style="fill:var(--ink);font-weight:600">${r[0]}</text><rect x="${x0}" y="${y}" width="${f1(w)}" height="22" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(Math.max(2,X(v)-x0))}" height="22" rx="6" style="fill:${r[2]}"/><text x="${f1(X(v)+6)}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${Math.round(v)}</text>`});
    for(let v=0;v<=D.max;v+=D.max>100?25:25){s+=`<text x="${f1(X(v))}" y="${N?176:150}" class="t-xs t-mid">${v}</text>`}
    s+=`<text x="16" y="${N?212:166}" class="t-xs">${N?'Wisconsin trial: 650,341 newborns, 1985–1994':'Wisconsin CF Neonatal Screening Project: 650,341 newborns randomised, 1985–1994'}</text>`;
    ws.innerHTML=s;wn.innerHTML=D.txt+' '+D.src}
  $$('#nsWiBtns [data-wi]').forEach(b=>b.addEventListener('click',()=>{wk=b.dataset.wi;$$('#nsWiBtns [data-wi]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopW)stopW();stopW=animate(700,p=>drawWi(ease(p)))}));
  drawWi(1);

  /* ---------- the screening funnel: a teaching sketch ---------- */
  const fb=$('#nsBirths'),fs=$('#nsSens'),fp=$('#nsPpv'),fo=$('#nsFunOut'),fsv=$('#nsFunSvg'),fv=$('#nsFunV');
  const PREV=6899;/* California 2007–2012: 1 in 6899 births (Kharrazi 2015) */
  const fmt=n=>Math.round(n).toLocaleString('en-GB');
  function fun(){const b=+fb.value,se=+fs.value/100,pp=+fp.value/100;
    $('#nsBirthsV').textContent=fmt(b);$('#nsPpvV').textContent=Math.round(pp*100)+'%';
    const cf=b/PREV,found=cf*se,miss=cf-found,ref=found/pp,fpos=ref-found;
    const N=vb(fsv,'720 220','400 320');
    const rows=[['Newborns screened',b,'var(--panel-2)','var(--ink)'],[N?'Referred for sweat test':'Referred for a sweat test (screen positive)',ref,'var(--dx-soft)','var(--dx)'],[N?'CF found':'CF found by screening',found,'var(--variant)','var(--on-brand)']];
    let s='';const cx=N?200:300,W=N?360:520,y0=14,rh=N?64:56;
    rows.forEach((r,i)=>{const w=W*(1-i*.3),y=y0+i*rh,w2=W*(1-(i+1)*.3);
      s+=`<path d="M${f1(cx-w/2)} ${y}L${f1(cx+w/2)} ${y}L${f1(cx+w2/2)} ${y+rh-6}L${f1(cx-w2/2)} ${y+rh-6}Z" style="fill:${r[2]};stroke:var(--line)"/>`;
      s+=`<text x="${cx}" y="${y+(rh-6)/2-3}" class="t-xs t-mid" style="fill:${r[3]}">${r[0]}</text><text x="${cx}" y="${y+(rh-6)/2+14}" class="t-big t-mid" style="fill:${r[3]}">${fmt(r[1])}</text>`});
    const sy=y0+3*rh+(N?6:4);
    if(N){s+=`<text x="16" y="${sy+10}" class="t-sm" style="fill:var(--ink)">Screen positive but not CF: <tspan style="font-weight:700">${fmt(fpos)}</tspan></text><text x="16" y="${sy+30}" class="t-sm" style="fill:var(--bad)">CF missed by the screen: <tspan style="font-weight:700">${fmt(miss)}</tspan></text><text x="16" y="${sy+50}" class="t-xs">widths not to scale · teaching sketch</text>`}
    else{s+=`<text x="${cx+W/2+14}" y="${y0+rh+20}" class="t-sm" style="fill:var(--ink)">not CF:</text><text x="${cx+W/2+14}" y="${y0+rh+38}" class="t-big">${fmt(fpos)}</text><text x="${cx+W/2+14}" y="${y0+2*rh+30}" class="t-sm" style="fill:var(--bad)">CF missed:</text><text x="${cx+W/2+14}" y="${y0+2*rh+48}" class="t-big" style="fill:var(--bad)">${fmt(miss)}</text><text x="16" y="${sy+10}" class="t-xs">widths not to scale · teaching sketch</text>`}
    fsv.innerHTML=s;
    fv.className='verdict maybe';fv.textContent=`Of ${fmt(ref)} babies sent for a sweat test, about ${fmt(found)} have CF and ${fmt(fpos)} do not.`;
    fo.innerHTML=`At California's prevalence of 1 in 6899, ${fmt(b)} births include about <b>${fmt(cf)}</b> babies with CF. A screen with ${Math.round(se*100)}% sensitivity finds about <b>${fmt(found)}</b> and misses about <b>${fmt(miss)}</b>, who still need a clinical diagnosis if symptoms appear. At a PPV of ${Math.round(pp*100)}%, about <b>${fmt(ref)}</b> babies are referred for a sweat test; the <b>${fmt(fpos)}</b> without CF are mostly carriers or babies with CRMS/CFSPID. This is arithmetic on published averages, not a forecast for any programme.`}
  [fb,fs,fp].forEach(e=>e.addEventListener('input',fun));fs.addEventListener('change',fun);fun();
  redraws.screening=(()=>{const prev=redraws.screening;return()=>{prev&&prev();drawWi(1);fun()}})();
};
