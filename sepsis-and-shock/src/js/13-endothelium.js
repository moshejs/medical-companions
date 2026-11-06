/* ===== 1.3 Vessels, clotting & failing organs ===== */
/* (1) a vessel, a capillary bed, a lactate tube and six organ systems through seven phases;
   (2) a teaching calculator for the SIC and ISTH overt DIC scores, quoted as published (Iba 2017; Taylor 2001 via Iba 2023).
   Uses whCoag() from 11-what.js for the clotting-system icon. */
const EN_T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
const EN_TH=(x,y,txt,c='t-xs t-mid',col='var(--ink)')=>EN_T(x,y,txt,c,`fill:${col};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round`);
const EN_PH=[
 {from:0,at:.06,k:'Phase 1 · healthy',t:'A healthy lining',
  txt:`The endothelium controls vessel tone, the barrier, inflammation and clotting. [[Ince2016Endothelium]] On its inner surface the glycocalyx, a gel about 0.5–5.0 μm thick, controls permeability and tone, prevents microvascular thrombosis and regulates white-cell adhesion. [[Uchimido2019]] Every small capillary carries red cells, and the organs are perfused.`,
  pt:`The inside of every blood vessel has a thin, gel-like lining that keeps fluid in, keeps blood flowing and stops it clotting.`,
  hook:`Glycocalyx: proteoglycans (syndecan-1), glycosaminoglycans (> 50% heparan sulfate), plasma proteins. [[Uchimido2019]]`},
 {from:.14,at:.2,k:'Phase 2 · shedding',t:'The glycocalyx is shed',
  txt:`Metalloproteinases, heparanase and hyaluronidase, activated by reactive oxygen species, TNF-α and IL-1β, strip the glycocalyx. In volunteers given low-dose endotoxin, its thickness fell from 0.60 to 0.30 μm as plasma hyaluronan rose. [[Uchimido2019]] White cells start to stick to the bare wall. Shed syndecan-1 in the blood was higher in people who died. [[Sun2022SDC1]]`,
  pt:`Sepsis strips the protective gel away. White blood cells start to stick to the bare wall.`,
  hook:`Endotoxin halved glycocalyx thickness in volunteers (0.60 → 0.30 μm). [[Uchimido2019]]`},
 {from:.28,at:.34,k:'Phase 3 · leak and dilation',t:'Gaps open, vessels relax',
  txt:`Proteases make endothelial cells internalise VE-cadherin and lose tight junctions; leaky capillaries lose protein and plasma into the tissues, causing oedema. Diffuse vasodilation causes distributive shock, in which blood pressure may not recover with fluids alone. [[Hotchkiss2016NRDP]] Vasoplegia is classically attributed to nitric oxide, ATP-sensitive potassium channels and relative vasopressin deficiency. [[Landry2001]]`,
  pt:`Gaps open between the cells of the lining, so fluid leaks out and tissues swell. Vessels also go slack, so blood pressure falls.`,
  hook:`Vasoplegia: NO, K-ATP channels, relative vasopressin deficiency. [[Landry2001]]`},
 {from:.42,at:.48,k:'Phase 4 · microclots',t:'Microclots form',
  txt:`Tissue factor on monocytes and endothelial cells starts thrombin generation; the protein C system is impaired and fibrinolysis is blocked by PAI-1. More fibrin and less clearance means microvascular clots. [[Levi2017Coag]] Antithrombin and activated protein C fall, and so does endothelial heparan sulfate. [[Hotchkiss2016NRDP]] Platelets and clotting factors are consumed. The early stage can be scored as sepsis-induced coagulopathy (SIC). [[Iba2017SIC]]`,
  pt:`Tiny clots form inside small vessels, while clotting factors get used up. That can cause clots and bleeding at the same time.`,
  hook:`Sepsis coagulopathy = tissue factor ↑, antithrombin and protein C ↓, PAI-1 ↑ (fibrinolysis shut-down). [[Levi2017Coag]]`},
 {from:.56,at:.62,k:'Phase 5 · microcirculation',t:'Small vessels stop flowing',
  txt:`Under the tongue, perfused small vessels were 48% in severe sepsis vs 90% in volunteers. [[DeBacker2002]] In septic shock they improved only in survivors, and stayed low in people who later died of organ failure despite similar blood pressure. [[Sakr2004]] Cells may also fail to use oxygen (cytopathic hypoxia). <span class="ev hyp">Hypothesis</span> [[Fink2002]] Lactate rises, though much may come from adrenaline-driven glycolysis in muscle rather than oxygen debt. [[Levy2005Lactate,GarciaAlvarez2014]]`,
  pt:`The tiniest vessels can stop flowing even when blood pressure looks normal. A high lactate shows someone is very ill, but it does not always mean the body is short of oxygen.`,
  hook:`Sublingual perfused small vessels: 48% in severe sepsis vs 90% in health. [[DeBacker2002]]`},
 {from:.7,at:.77,k:'Phase 6 · organs',t:'Organs fail',
  txt:`Sepsis-3 counts an acute rise in SOFA of 2 points or more across six systems. [[Singer2016Sepsis3,Vincent1996SOFA]] Lungs: ARDS. [[ARDS2012Berlin]] Kidneys: septic shock was the commonest contributor to acute renal failure in ICUs (47.5%). [[Uchino2005]] Brain: encephalopathy in up to 70% of people with severe systemic infection. [[Gofton2012]] Heart: low ejection fraction despite normal cardiac index. [[Parker1984]] Liver: early dysfunction carried the highest independent mortality risk (OR 1.86). [[Kramer2007]] Clotting: platelets fall. [[Vanderschueren2000]]`,
  pt:`The lungs, kidneys, brain, heart and liver start to struggle. Confusion, fast breathing or passing little urine can be signs. It is an emergency.`,
  hook:`SOFA's six systems: respiratory, coagulation, liver, cardiovascular, CNS, renal; 0–4 each. [[Vincent1996SOFA]]`},
 {from:.85,at:.95,k:'Phase 7 · recovery',t:'Recovery in survivors',
  txt:`In survivors of septic shock, microcirculatory perfusion improved over time. [[Sakr2004]] The heart's "profound but reversible" depression recovered, with ejection fraction and volumes back to normal in about 10 days. [[Parker1984]] Total SOFA fell in 33% of survivors staying at least a week. [[Vincent1998SOFA]] Life after sepsis: <a href="#after" data-go="after">After sepsis: recovery &amp; families</a>.`,
  pt:`In people who recover, flow in the small vessels improves and the heart usually recovers within about 10 days.`,
  hook:`Septic cardiomyopathy is reversible in survivors (~10 days). [[Parker1984]]`}
];
const EN_ORG=[['lung','lungs',.64],['kidney','kidneys',.66],['brain','brain',.67],['heart','heart',.69],['liver','liver',.72],['coag','clotting',.5]];
inits.endothelium=()=>{
  const svg=$('#enSvg'),rg=$('#enT');let setSt=()=>{};
  function draw(t){const N=vb(svg,'720 400','400 600'),p=phaseOf(EN_PH,t),P=EN_PH[p],rec=ramp(t,.85,.98);
    const L=N?{v:[16,62,368,118],c:[16,206,262,128],m:[318,206,24,128],o:{x:[72,200,328],y:[392,486],s:36},st:[16,566,368]}
             :{v:[16,62,440,128],c:[16,224,300,120],m:[352,224,24,120],o:{x:[548,660],y:[90,180,270],s:40},st:[16,374,688]};
    const shed=ramp(t,.14,.26)*(1-rec*.75),leak=ramp(t,.28,.38)*(1-rec*.85),dil=ramp(t,.3,.4)*(1-rec),clots=.66*ramp(t,.42,.52)*(1-rec*.9),cells=ramp(t,.14,.3)*(1-rec*.8);
    const perf=1-.6*ramp(t,.5,.62)+.55*rec,lac=.18+.6*ramp(t,.52,.68)-.5*rec;
    let s=EN_T(N?16:20,26,P.t,'t-big')+EN_T(N?16:20,43,P.k,'t-sm');
    /* the vessel */
    const [vx,vy,vw,vh]=L.v,V=vessel(vx,vy,vw,vh,{ph:t*12,shed,leak,dilate:dil,clots,cells,o2:1-.5*Math.max(leak,clots),seed:11});s+=V.svg;
    s+=EN_TH(vx+vw-6,vy+12,'small blood vessel','t-xs t-end');
    if(shed<.5)s+=`<path d="M${f1(vx+vw*.3)} ${f1(vy+8)}L${f1(vx+vw*.33)} ${f1(V.at.top+2)}" style="stroke:var(--muted);stroke-width:1.2"/>`+EN_TH(vx+vw*.3,vy+8,'glycocalyx','t-xs t-mid','var(--glyco)');
    if(p===1)s+=EN_TH(vx+vw*.5,V.at.cy+4,'enzymes shed the glycocalyx','t-xs t-mid','var(--accent)');
    if(leak>.3)s+=EN_TH(vx+vw*.24,vy+vh-4,'fluid and protein leak out','t-xs t-mid','var(--fluid)')+(dil>.4?EN_TH(vx+vw*.62,V.at.cy+4,'vessel relaxes (NO)','t-xs t-mid','var(--ink)'):'');
    if(clots>.3)s+=EN_TH(vx+vw*.72,vy+vh-4,'microclots + platelets','t-xs t-mid','var(--clot)');
    /* capillary bed and lactate */
    const [cx,cy,cw,ch]=L.c,C=capbed(cx,cy,cw,ch,{perf:clamp(perf),ph:t*8,seed:3});s+=C.svg;
    s+=EN_T(cx,cy-6,`capillary bed · ${C.n} of 5 perfused (schematic)`,'t-xs','fill:var(--ink);font-weight:600');
    const [mx,my,mw,mh]=L.m;s+=lactateMeter(mx,my,mw,mh,clamp(lac)*10,10,{label:'',val:false});
    s+=EN_T(mx+mw/2,my-6,'lactate','t-xs t-mid','fill:var(--lactate);font-weight:700')+EN_T(mx+mw/2,my+mh+14,'schematic','t-xs t-mid');
    /* six organ systems */
    let nf=0;EN_ORG.forEach(([k,lab,st],i)=>{const fl=ramp(t,st,st+.08)*(1-ramp(t,.86+i*.015,.97));if(fl>.5)nf++;
      const x=N?L.o.x[i%3]:L.o.x[i%2],y=N?L.o.y[Math.floor(i/3)]:L.o.y[Math.floor(i/2)];
      s+=k==='coag'?whCoag(x,y,L.o.s,fl):organ(k,x,y,L.o.s,{fail:fl});
      s+=EN_T(x,y+L.o.s*.5+15,lab,'t-xs t-mid','fill:var(--ink);font-weight:600')+EN_T(x,y+L.o.s*.5+28,fl>.5?'failing':fl>.15?'struggling':'working','t-xs t-mid',fl>.5?'fill:var(--bad);font-weight:600':'')});
    s+=EN_T(N?16:500,N?L.o.y[0]-L.o.s*.5-14:44,'organ systems (as in SOFA)','t-xs','fill:var(--ink);font-weight:700;letter-spacing:.06em');
    /* phase strip */
    const [sx,sy,sw]=L.st,w=sw/EN_PH.length,KS=['healthy','shed','leak','clots','flow','organs','recover'];
    EN_PH.forEach((q,i)=>{const on=i===p,x=sx+i*w;s+=`<rect x="${f1(x+1)}" y="${sy}" width="${f1(w-2)}" height="6" rx="3" style="fill:${on?(i===6?'var(--good)':'var(--brand)'):'var(--panel-2)'}"/>`+EN_T(x+w/2,sy+19,KS[i],'t-xs t-mid',on?'fill:var(--ink);font-weight:600':'')});
    s+=`<circle cx="${f1(sx+sw*t)}" cy="${sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;setSt(p);
    $('#enRead').innerHTML=`<span>glycocalyx <b>${shed<.2?'intact':shed<.7?'thinning':'shed'}</b></span><span>capillaries perfused <b>${C.n} of 5</b> (schematic)</span><span>organ systems failing <b>${nf} of 6</b></span>`;
    $('#enNote').innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#enPlay'),draw,24000,'%t:player.replay%','endothelium');
  setSt=stepWire($('#enSteps'),EN_PH,rg,draw,stop);draw(+rg.value);

  /* ---------- SIC and ISTH overt DIC teaching calculator ---------- */
  const ids=['enPlt','enInr','enSofa','enPt','enFib','enFbg'],v=id=>parseFloat($('#'+id).value);
  function calc(){const plt=v('enPlt'),inr=v('enInr'),sofa=v('enSofa'),pt=v('enPt'),fib=v('enFib'),fbg=v('enFbg');
    const ok=[plt,inr,pt,fbg].every(x=>isFinite(x)&&x>=0);
    if(!ok){$('#enOut').innerHTML=`<div class="card"><p>Enter a number in each box to see the published point counts.</p></div>`;return}
    const sInr=inr>1.4?2:inr>1.2?1:0,sPlt=plt<100?2:plt<150?1:0,sic=sInr+sPlt+sofa,isSic=sic>=4&&sInr+sPlt>2;
    const dPlt=plt<50?2:plt<100?1:0,dPt=pt>=6?2:pt>=3?1:0,dFbg=fbg<1?1:0,dic=dPlt+fib+dPt+dFbg,isDic=dic>=5;
    $('#enOut').innerHTML=`<div class="card"><small>SIC score (Iba 2017)</small><span class="big-num">${sic} / 6</span><p>PT-INR ${sInr} + platelets ${sPlt} + "total SOFA" ${sofa}. ${isSic?'<b>Meets the published SIC criteria</b> (total ≥ 4 and PT plus platelet points &gt; 2).':'Does not meet the published SIC criteria (total ≥ 4 and PT plus platelet points &gt; 2).'} [[Iba2017SIC]]</p></div>`+
      `<div class="card"><small>ISTH overt DIC score (2001)</small><span class="big-num">${dic} / 8</span><p>Platelets ${dPlt} + fibrin marker ${fib} + PT ${dPt} + fibrinogen ${dFbg}. ${isDic?'<b>Total ≥ 5: compatible with overt DIC</b> as published.':'Below 5: not compatible with overt DIC as published.'} [[Taylor2001DIC,Iba2023DIC]]</p></div>`+
      `<div class="card"><small>Why both?</small><p>SIC is meant to catch an earlier, compensated stage; overt DIC a later, decompensated one. In one Sepsis-3 cohort, 56.1% met SIC and 22.6% overt DIC. Teaching only. [[Iba2023DIC]]</p></div>`}
  ids.forEach(id=>{const e=$('#'+id);e.addEventListener('input',calc);e.addEventListener('change',calc)});
  calc();
};
