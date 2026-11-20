/* ===== 1.1 What sepsis is ===== */
/* Two animations: (1) one patient moves from infection into sepsis and septic shock and back out, against the
   Sepsis-3 criteria; (2) the GBD 2017 burden in five scenes. All figures are quoted from the research with keys. */
const WH_T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
const WH_PH=[
 {from:0,at:.08,k:'Phase 1 · infection',t:'An infection starts',
  txt:`Germs multiply at one site, here a chest infection. The local immune response is working as it should, and this is not yet sepsis: Sepsis-3 needs organ dysfunction caused by the response. [[Singer2016Sepsis3]] Lower respiratory infection is the most common underlying cause of sepsis-related death worldwide. [[Rudd2020GBD]]`,
  pt:`An infection, such as a chest or urine infection, is common and usually stays where it started.`,
  hook:`Infection alone is not sepsis. Sepsis = infection + organ dysfunction from a dysregulated host response. [[Singer2016Sepsis3]]`},
 {from:.2,at:.3,k:'Phase 2 · the response spreads',t:'The response becomes body-wide',
  txt:`Immune sensors recognise parts of the germ, and signalling molecules (cytokines) spread through the blood. The response can become dysregulated: excessive inflammation together with immune suppression that fails to return to balance. [[Hotchkiss2016NRDP,vanderPoll2017]] The old SIRS criteria (2 of temperature, heart rate, breathing rate and white cell count) flag this stage, but most infected patients meet them, which is why they were dropped as a definition. [[Vincent2022Concept]] Detail: <a href="#immune" data-go="immune">Infection to dysregulated host response</a>.`,
  pt:`The body's alarm system spreads from the infection to the whole body. Fever, a fast heart and fast breathing are common.`,
  hook:`SIRS = 2 or more of 4 variables; too sensitive to separate sepsis from infection. [[Bone1992SIRS,Vincent2022Concept]]`},
 {from:.4,at:.5,k:'Phase 3 · sepsis',t:'Organs start to fail: sepsis',
  txt:`Sepsis-3 identifies organ dysfunction as an acute rise in the SOFA score of 2 points or more, linked to in-hospital mortality above 10%. SOFA scores six systems (lungs, clotting, liver, circulation, brain and kidneys) from 0 to 4 each. [[Singer2016Sepsis3,Vincent1996SOFA]] "Severe sepsis" was dropped as redundant. [[Singer2016Sepsis3]] Outside the ICU, the three-item qSOFA (breathing rate 22/min or more, altered mentation, systolic BP 100 mm Hg or less) predicted in-hospital death with an AUROC of 0.81. [[Seymour2016qSOFA]]`,
  pt:`Sepsis means the infection is now harming organs, such as the lungs, kidneys or brain. Confusion, fast breathing or passing little urine can be signs. It is an emergency.`,
  hook:`Sepsis-3: SOFA rise ≥ 2 = organ dysfunction; mortality > 10%. qSOFA: RR ≥ 22, altered mentation, SBP ≤ 100. [[Singer2016Sepsis3]]`},
 {from:.6,at:.7,k:'Phase 4 · septic shock',t:'Pressure fails: septic shock',
  txt:`Septic shock is sepsis needing a vasopressor to keep mean arterial pressure at 65 mm Hg or more, with lactate above 2 mmol/L (18 mg/dL), despite adequate fluid. In the derivation data this combination carried hospital mortality of 42.3%, "greater than 40%". [[Singer2016Sepsis3,ShankarHari2016Shock]] A 2019 meta-analysis found septic shock in 10.4% of ICU admissions in Europe and North America. [[Vincent2019Shock]] Detail: <a href="#shock" data-go="shock">Shock and haemodynamics</a>.`,
  pt:`In septic shock, blood pressure stays low even after fluids through a drip, and medicines are needed to hold it up. These figures describe large groups of people, not any one person.`,
  hook:`Septic shock = vasopressor for MAP ≥ 65 mm Hg + lactate > 2 mmol/L despite fluids; mortality > 40%. [[Singer2016Sepsis3]]`},
 {from:.8,at:.93,k:'Phase 5 · recovery',t:'In survivors, organs recover',
  txt:`With treatment, many people come back out: blood pressure holds without vasopressors and organ scores fall. In the first multicentre SOFA study, total SOFA fell during the ICU stay in 33% of survivors staying at least a week. [[Vincent1998SOFA]] Severe-sepsis mortality in Australian and New Zealand ICUs fell from 35.0% in 2000 to 18.4% in 2012. [[Kaukonen2014JAMA]] Recovery can take a long time: <a href="#after" data-go="after">After sepsis: recovery &amp; families</a>.`,
  pt:`Many people survive sepsis, and survival has improved over time. Recovery can take weeks to months.`,
  hook:`Mortality trend: ANZ severe sepsis 35.0% (2000) → 18.4% (2012). [[Kaukonen2014JAMA]]`}
];
/* the six SOFA systems: [key for organ(), label, when it starts to fail] */
const WH_ORG=[['lung','lungs',.4],['brain','brain',.44],['kidney','kidneys',.46],['liver','liver',.5],['coag','clotting',.52],['heart','circulation',.6]];
/* a blood drop with platelets: the coagulation system, which the kit has no organ for */
function whCoag(x,y,s,fl){const c=fl>.5?'var(--organ-fail)':'var(--oxy)';let g=`<path d="M${f1(x)} ${f1(y-s*.5)}C${f1(x+s*.12)} ${f1(y-s*.28)} ${f1(x+s*.36)} ${f1(y-s*.02)} ${f1(x+s*.36)} ${f1(y+s*.16)}C${f1(x+s*.36)} ${f1(y+s*.38)} ${f1(x+s*.18)} ${f1(y+s*.5)} ${f1(x)} ${f1(y+s*.5)}C${f1(x-s*.18)} ${f1(y+s*.5)} ${f1(x-s*.36)} ${f1(y+s*.38)} ${f1(x-s*.36)} ${f1(y+s*.16)}C${f1(x-s*.36)} ${f1(y-s*.02)} ${f1(x-s*.12)} ${f1(y-s*.28)} ${f1(x)} ${f1(y-s*.5)}Z" style="fill:${c};opacity:${f1(1-fl*.35)}"/>`;
  [[-.12,.1],[.1,.22],[.02,-.02]].forEach(p=>{g+=`<circle cx="${f1(x+p[0]*s)}" cy="${f1(y+p[1]*s)}" r="${f1(s*.06)}" style="fill:var(--plt);opacity:${f1(1-fl*.7)}"/>`});return g}
/* the Global Burden of Disease scenes */
const WH_B=[
 {from:0,at:.15,k:'Scene 1 · cases',t:'48.9 million cases in 2017',
  txt:`An estimated 48.9 million incident cases of sepsis worldwide in 2017 (95% UI 38.9–62.9 million): 20.3 million in children under 5, 4.9 million at ages 5–19 and 23.7 million in adults aged 20 or older. Incidence peaks in early childhood, with a second peak in older adults. [[Rudd2020GBD]]`,
  pt:`More than half of all people who got sepsis in 2017 were children, many of them newborn babies.`,
  hook:`GBD 2017: 48.9 million cases; > half in children; 20.3 million under 5. [[Rudd2020GBD]]`},
 {from:.2,at:.35,k:'Scene 2 · deaths',t:'11.0 million sepsis-related deaths',
  txt:`11.0 million sepsis-related deaths in 2017 (10.1–12.0 million): 2.9 million in children under 5, 454,000 at ages 5–19 and 7.7 million in adults. Age-standardised mortality was higher in males (164.2 vs 134.1 per 100,000), while incidence was higher in females. [[Rudd2020GBD]]`,
  pt:`These are population estimates from a global model. They describe the world, not any one person.`,
  hook:`GBD 2017: 11.0 million sepsis-related deaths. [[Rudd2020GBD]]`},
 {from:.4,at:.55,k:'Scene 3 · share of deaths',t:'About 1 in 5 deaths worldwide',
  txt:`Sepsis-related deaths were 19.7% (18.2–21.4%) of all global deaths in 2017. Of those deaths, 46.4% occurred in people whose underlying cause of death was not an infection, such as an injury or a chronic disease. [[Rudd2020GBD]]`,
  pt:`Sepsis is linked to about 1 in every 5 deaths worldwide. Many of those people had another serious illness too.`,
  hook:`Sepsis-related deaths = 19.7% of global deaths (GBD 2017). [[Rudd2020GBD]]`},
 {from:.6,at:.75,k:'Scene 4 · where',t:'85% in lower-income settings',
  txt:`85.0% (82.2–87.4%) of 2017 cases, 41.5 million, occurred in countries with a low, low-middle or middle Socio-demographic Index. Burden was highest in sub-Saharan Africa, Oceania, south Asia, east Asia and southeast Asia. [[Rudd2020GBD]] Deaths attributable to antimicrobial resistance were highest in western sub-Saharan Africa (27.3 per 100,000). [[Murray2022GRAM]]`,
  pt:`Most sepsis happens in poorer countries, where clean water, vaccines and quick hospital care are harder to reach.`,
  hook:`85% of sepsis cases are in low-to-middle SDI countries. [[Rudd2020GBD]]`},
 {from:.8,at:.95,k:'Scene 5 · trend',t:'Fewer cases and deaths than in 1990',
  txt:`From 1990 to 2017, incident cases fell 18.8% (60.2 to 48.9 million) and deaths 29.7% (15.7 to 11.0 million). Age-standardised incidence fell 37.0% and age-standardised mortality 52.8%, to 148.1 deaths per 100,000. [[Rudd2020GBD]] Sepsis remains common: the GBD estimate is about twice an earlier extrapolation from high-income hospital data. [[Fleischmann2016AJRCCM,Rudd2020GBD]]`,
  pt:`Fewer people died of sepsis in 2017 than in 1990, but it is still one of the biggest causes of death in the world.`,
  hook:`1990 → 2017: cases −18.8%, deaths −29.7%, age-standardised mortality −52.8%. [[Rudd2020GBD]]`}
];
inits.what=()=>{
  /* ---------- 1. infection to septic shock ---------- */
  const svg=$('#whSvg'),rg=$('#whT');let setSt=()=>{};
  const POS=[[0,.08],[.2,.2],[.4,.48],[.6,1],[.82,1],[1,.0]];
  function depth(t){for(let i=0;i<POS.length-1;i++){const a=POS[i],b=POS[i+1];if(t<=b[0])return lerp(a[1],b[1],ease(clamp((t-a[0])/(b[0]-a[0]))))}return POS[POS.length-1][1]}
  function draw(t){const N=vb(svg,'720 380','400 580'),p=phaseOf(WH_PH,t),P=WH_PH[p],rec=ramp(t,.82,.96);
    const L=N?{cx:200,cy:200,R:[[182,128],[118,84],[58,42]],ck:{x:16,y:340,w:368,h:30,g:36},or:{x:47,y:540,d:61,s:26}}
             :{cx:195,cy:222,R:[[172,138],[112,92],[56,46]],ck:{x:400,y:70,w:300,h:32,g:40},or:{x:425,y:290,d:50,s:28}};
    let s=WH_T(N?16:20,N?26:28,P.t,'t-big')+WH_T(N?16:20,N?43:46,P.k,'t-sm');
    /* nested regions: infection ⊃ sepsis ⊃ septic shock */
    const fills=['var(--pathogen-soft)','var(--fever-soft)','var(--bad-soft)'],labs=['infection','sepsis','septic shock'],lc=['var(--pathogen-dark)','var(--accent)','var(--bad)'];
    L.R.forEach(([rx,ry],i)=>{const on=(i===0&&p<2)||(i===1&&p===2)||(i===2&&p===3);
      s+=`<ellipse cx="${L.cx}" cy="${L.cy}" rx="${rx}" ry="${ry}" style="fill:${fills[i]};stroke:${on?lc[i]:'var(--line)'};stroke-width:${on?2.2:1.2}"/>`;
      s+=WH_T(L.cx,L.cy-ry+15,labs[i],'t-sm t-mid',`fill:${lc[i]};font-weight:700`)});
    /* germs in the infection ring, cleared in recovery */
    const gOp=1-rec*.8;[[-.78,-.18],[-.7,.3],[.75,-.25],[.66,.34],[-.2,.82],[.25,-.8]].forEach((q,i)=>{s+=bacterium(L.cx+q[0]*L.R[0][0]*.95,L.cy+q[1]*L.R[0][1]*.92,11,{ang:i*47+t*90,op:gOp*.9,lps:i%2?ramp(t,.15,.3)*.6:0,seed:i+2})});
    /* the patient marker moves inward, then (in survivors) back out to the right */
    const d=depth(t),out=t>.82,xL=L.cx-L.R[0][0]*.84,mx=out?lerp(L.cx,L.cx+L.R[0][0]*.82,ease(rec)):lerp(xL,L.cx,d),my=L.cy+(out?-L.R[0][1]*.25*rec:8*d);
    const halo=ramp(t,.18,.32)*(1-rec*.7);
    if(halo>0)s+=cytokines(mx,my,34,{v:.4+.6*halo,n:16,seed:7,op:halo});
    s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="12" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/>`+person(mx,my-8,15,p===3?'var(--bad)':p===4?'var(--good)':'var(--ink)');
    s+=WH_T(mx,my+28,p===4?'recovering':'one patient','t-xs t-mid','fill:var(--ink);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px');
    /* the Sepsis-3 checklist */
    const CK=[['Suspected infection','the starting point',t>=.03,'var(--pathogen-dark)'],
      ['SOFA rise of 2 points or more','organ dysfunction = sepsis',t>=.45,'var(--accent)'],
      ['Vasopressor for MAP ≥ 65 mm Hg','despite adequate fluids',t>=.62&&t<.88,'var(--bad)'],
      ['Lactate > 2 mmol/L','with the row above = septic shock',t>=.66&&t<.9,'var(--lactate)']];
    s+=WH_T(L.ck.x,L.ck.y-10,'Sepsis-3 criteria','t-xs','fill:var(--ink);font-weight:700;letter-spacing:.06em');
    CK.forEach(([a,b,on,c],i)=>{const y=L.ck.y+i*L.ck.g,was=i===1&&t>=.9;
      s+=`<rect x="${L.ck.x}" y="${y}" width="${L.ck.w}" height="${L.ck.h}" rx="8" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<circle cx="${L.ck.x+16}" cy="${y+L.ck.h/2}" r="8" style="fill:${on?c:'var(--panel)'};stroke:${on?c:'var(--line)'}"/>`;
      if(on)s+=`<path d="M${L.ck.x+12} ${y+L.ck.h/2}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=WH_T(L.ck.x+32,y+13,a,'t-sm',`fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}`)+WH_T(L.ck.x+32,y+L.ck.h-5,was?'falling as organs recover':b,'t-xs')});
    /* six SOFA organ systems */
    s+=WH_T(L.ck.x,L.or.y-L.or.s-12,'six organ systems scored by SOFA (schematic)','t-xs','fill:var(--ink);font-weight:700;letter-spacing:.06em');
    let nf=0;WH_ORG.forEach(([k,lab,st],i)=>{const fl=Math.min(1,ramp(t,st,st+.1)*.7+ramp(t,.6,.75)*.3)*(1-ramp(t,.84+i*.015,.97));if(fl>.5)nf++;
      const x=L.or.x+i*L.or.d,y=L.or.y;
      s+=k==='coag'?whCoag(x,y,L.or.s,fl):organ(k,x,y,L.or.s,{fail:fl,glow:k==='lung'?ramp(t,0,.1)*(1-rec):0});
      s+=WH_T(x,y+L.or.s*.5+14,lab,'t-xs t-mid',fl>.5?'fill:var(--bad);font-weight:600':'')});
    svg.innerHTML=s;setSt(p);
    const mort=p===2?'in-hospital mortality &gt; 10% (Sepsis-3 data)':p===3?'hospital mortality &gt; 40% (Sepsis-3 data)':'';
    $('#whRead').innerHTML=`<span>phase <b>${p+1} of 5</b></span><span>where <b>${p<2?'infection':p===2?'sepsis':p===3?'septic shock':'recovering'}</b></span><span>organ systems failing <b>${nf} of 6</b> (schematic)</span>${mort?`<span>population statistic <b>${mort}</b></span>`:''}`;
    $('#whNote').innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#whPlay'),draw,22000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_PH,rg,draw,stop);draw(+rg.value);

  /* ---------- 2. the global burden ---------- */
  const bs=$('#whBSvg'),br=$('#whBT');let setB=()=>{};
  const AGE=[['under 5','var(--accent)'],['5 to 19','var(--dx)'],['20 and over','var(--rx)']];
  function grid(x,y,n,cols,sz,gap,k,colOf,shape){let s='';for(let i=0;i<n;i++){const px=x+(i%cols)*(sz+gap),py=y+Math.floor(i/cols)*(sz+gap*1.3),c=i<k?colOf(i):'var(--panel-2)';
    s+=shape==='dot'?`<circle cx="${f1(px+sz/2)}" cy="${f1(py+sz/2)}" r="${f1(sz*.42)}" style="fill:${c}"/>`:person(px+sz/2,py,sz,c)}return s}
  function drawB(t){const N=vb(bs,'720 360','400 540'),p=phaseOf(WH_B,t),P=WH_B[p],u=ramp(t,P.from+.01,P.from+.14);
    const G=N?{x:20,y:24}:{x:24,y:34},nx=N?20:470,ny=N?440:120;let s='',big='',cap=[];
    if(p===0){const k=Math.round(u*49),col=i=>i<20?AGE[0][1]:i<25?AGE[1][1]:AGE[2][1];
      s+=N?grid(G.x+30,G.y,49,7,30,16,k,col):grid(G.x,G.y,49,10,26,12,k,col);
      big=f1(u*48.9)+' million';cap=['sepsis cases worldwide in 2017','1 icon ≈ 1 million people'];
      const ly=N?G.y+7*(30+16*1.3)+6:G.y+5*(26+12*1.3)+16;AGE.forEach(([a,c],i)=>{const lx=G.x+i*(N?120:130);s+=`<rect x="${lx}" y="${ly}" width="12" height="12" rx="3" style="fill:${c}"/>`+WH_T(lx+17,ly+10,a+(i===0?' · 20.3 M':i===1?' · 4.9 M':' · 23.7 M'),'t-xs','fill:var(--ink)')})}
    else if(p===1){const k=Math.round(u*11),col=i=>i<3?AGE[0][1]:AGE[2][1];
      s+=N?grid(G.x+40,G.y+20,11,6,40,14,k,col):grid(G.x,G.y+30,11,6,44,18,k,col);
      big=f1(u*11)+' million';cap=['sepsis-related deaths in 2017','1 icon ≈ 1 million people'];
      const ly=N?G.y+2*(40+14*1.3)+40:G.y+30+2*(44+18*1.3)+24;
      [['under 5 · 2.9 M',AGE[0][1]],['5 to 19 · 0.45 M (under one icon)',AGE[1][1]],['20 and over · 7.7 M',AGE[2][1]]].forEach(([a,c],i)=>{const yy=ly+i*20;s+=`<rect x="${G.x}" y="${yy}" width="12" height="12" rx="3" style="fill:${c}"/>`+WH_T(G.x+17,yy+10,a,'t-xs','fill:var(--ink)')})}
    else if(p===2||p===3){const tot=p===2?20:85,k=Math.round(u*tot),c=p===2?'var(--bad)':'var(--accent)';
      s+=N?grid(G.x+26,G.y,100,10,24,9,k,()=>c,'dot'):grid(G.x,G.y,100,10,22,7,k,()=>c,'dot');
      big=p===2?f1(u*19.7)+'%':Math.round(u*85)+'%';cap=p===2?['of all deaths worldwide were','sepsis-related (2017)','1 dot = 1 in 100 deaths']:['of sepsis cases were in low,','low-middle or middle SDI','countries (2017)']}
    else{const X0=N?G.x:G.x+10,W=N?300:400,mx=65,bar=(y,v,c,lab)=>`<rect x="${X0}" y="${f1(y)}" width="${f1(W*v/mx*u)}" height="22" rx="4" style="fill:${c}"/>`+WH_T(X0+W*v/mx*u+6,y+16,u>.95?lab:'','t-sm','fill:var(--ink);font-weight:700');
      [['cases (millions)',60.2,48.9],['deaths (millions)',15.7,11.0]].forEach(([a,v0,v1],i)=>{const y=G.y+10+i*(N?130:110);s+=WH_T(X0,y,a,'t-sm','fill:var(--ink);font-weight:700')+bar(y+8,v0,'var(--panel-2)','1990 · '+v0)+bar(y+36,v1,i?'var(--bad)':'var(--brand)','2017 · '+v1)+`<rect x="${X0}" y="${f1(y+8)}" width="${f1(W*v0/mx*u)}" height="22" rx="4" style="fill:none;stroke:var(--muted)"/>`});
      big='−52.8%';cap=['age-standardised sepsis','mortality, 1990 to 2017']}
    s+=`<text x="${nx}" y="${ny}" class="t-big" style="font-size:${N?34:40}px;fill:var(--brand)">${big}</text>`;
    cap.forEach((c,i)=>{s+=WH_T(nx,ny+22+i*17,c,'t-sm','fill:var(--ink)')});
    s+=WH_T(nx,ny+(N?78:90),'GBD 2017 estimate','t-xs');
    bs.innerHTML=s;setB(p);$('#whBNote').innerHTML=noteHTML(P)}
  const stopB=playWire(br,$('#whBPlay'),drawB,20000,'%t:player.replay%','what');
  setB=stepWire($('#whBSteps'),WH_B,br,drawB,stopB);drawB(+br.value);
};
