/* =============== 4.3 Oxygen targets & blood gases =============== */
/* Main scrubber: a vertical SpO2 scale with both published bands (88–92% and 94–98%), an "oxygen given"
   dial (kit gauge), an air-sac cluster (kit alveoli) over a strip of blood with oxygen and CO2 dots, two
   mini charts over the first hour on oxygen (SpO2 and CO2; dashed = high flow, solid = titrated) and a
   blood-acidity scale. All curves are schematic directions; the bands are the published targets.
   Second: a saturation band explorer. Third: an ABG teaching interpreter with a pH–PaCO2 map. */
const BG_STEPS=[
 {from:0,at:.06,k:'Mismatch',t:'Lungs that mix air and blood unevenly',sh:'Mismatch',
  txt:`In advanced COPD, mismatch between air flow and blood flow in the lung (V/Q mismatch), with some shunt, explained all of the low oxygen at rest and on exercise, with no sign of a diffusion problem. [[Wagner1977]] Some people also hold on to carbon dioxide: acute hypercapnic respiratory failure complicates around 20% of COPD flare-ups. [[Davidson2016Summary]]`,
  pt:`COPD lungs do not match air and blood well, so oxygen levels can run low, and some people build up carbon dioxide. [[Wagner1977,Davidson2016Summary]]`,
  hook:`Hypoxaemia in COPD comes from V/Q mismatch, not diffusion limitation. [[Wagner1977]]`},
 {from:.16,at:.22,k:'Targets',t:'Two published targets',sh:'Targets',
  txt:`BTS 2017: oxygen should be prescribed to achieve "a target saturation of 94–98% for most acutely ill patients or 88–92% or patient-specific target range for those at risk of hypercapnic respiratory failure". [[ODriscoll2017Summary]] GOLD 2023: oxygen for a flare-up "should be titrated to a target saturation of 88–92%". [[Agusti2023]] NEWS2 has a second saturation scale with an 88–92% target for people with hypercapnic failure. [[Echevarria2019]]`,
  pt:`People with COPD may be given less oxygen than you would expect: staff often aim for about 88–92%. [[ODriscoll2017Summary]]`,
  hook:`94–98% for most acutely ill patients; 88–92% for those at risk of hypercapnic failure (BTS 2017). [[ODriscoll2017Summary]]`},
 {from:.32,at:.44,k:'Too much',t:'Too much oxygen: carbon dioxide climbs',sh:'Too much',
  txt:`BTS 2017 states that in hypercapnic respiratory failure the risk of respiratory acidosis rises if PaO2 is above 10.0 kPa because of excessive oxygen. [[ODriscoll2017Summary]] In the Tasmanian trial, patients given titrated oxygen per protocol were less likely than the high-flow arm to have respiratory acidosis (mean pH difference 0.12) or hypercapnia (mean PaCO2 difference −33.6 mmHg). [[Austin2010]] The dashed lines show the high-flow pattern. Why it happens is debated: one review argues that blaming a lost "hypoxic drive" is "not based on evidence in the literature". [[Abdo2012]]`,
  pt:`Too much oxygen can make carbon dioxide build up in some people with COPD, and the blood becomes more acidic. [[ODriscoll2017Summary]]`,
  hook:`Hypercapnic patient with PaO2 above 10 kPa: rising risk of respiratory acidosis (BTS 2017). [[ODriscoll2017Summary]]`},
 {from:.52,at:.64,k:'Titrated',t:'Titrated oxygen: fewer deaths',sh:'Titrated',
  txt:`In a cluster trial of 405 patients treated by paramedics, mortality was 9% with high-flow oxygen against 4% with titrated oxygen (RR 0.42, 95% CI 0.20–0.89), and 9% against 2% in confirmed COPD (RR 0.22, 95% CI 0.05–0.91). [[Austin2010]] A Cochrane review found this is still the only such pre-hospital trial: 2 deaths against 11 among 214 people with confirmed COPD (NNT 14), with low certainty. [[Kopsaftis2020]]`,
  pt:`Giving just enough oxygen, rather than as much as possible, saved lives in an ambulance trial. [[Austin2010]]`,
  hook:`Titrated against high-flow oxygen: mortality 4% against 9% (RR 0.42, Austin 2010). [[Austin2010]]`},
 {from:.7,at:.77,k:'Step down',t:'Step down, never stop suddenly',sh:'Step down',
  txt:`BTS 2017 warns that "sudden cessation of supplementary oxygen therapy can cause life-threatening rebound hypoxaemia". If oxygen-induced hypercapnia is suspected, oxygen is stepped down to the lowest level that keeps 88–92%, not stopped. The red dotted drop shows a sudden stop; the dial shows a step-down. [[ODriscoll2017Summary]]`,
  pt:`If oxygen has pushed carbon dioxide up, it is turned down step by step, never switched off suddenly. [[ODriscoll2017Summary]]`,
  hook:`Oxygen-induced hypercapnia: step down to keep 88–92%; stopping abruptly risks rebound hypoxaemia. [[ODriscoll2017Summary]]`},
 {from:.86,at:.93,k:'Check',t:'Check the gas, carry the card',sh:'Check',
  txt:`BTS 2017: "The presence of a normal SpO2 does not negate the need for blood gas measurements especially if the patient is on supplemental oxygen therapy", and in COPD gases are rechecked after 30–60 minutes "even if the initial PCO2 measurement was normal". BTS recommends oxygen alert cards for people who have had hypercapnic failure. [[ODriscoll2017Summary]] GOLD 2023 warns that pulse oximetry "may overestimate blood oxygen content among individuals with darker skin tones". [[Agusti2023]]`,
  pt:`A finger oxygen reading is not enough on its own. A blood gas test, and an oxygen alert card, help staff give the right amount. [[ODriscoll2017Summary]]`,
  hook:`A normal SpO2 does not remove the need for a blood gas; recheck at 30–60 min in COPD. [[ODriscoll2017Summary]]`}
];
const BG_TXT={
  spo2:v=>`SpO2 ${Math.round(v)}%`,b1:'88–92%',b1s:'at risk of high CO2',b2:'94–98%',b2s:'most acutely ill',
  given:'oxygen given',blood:'blood: oxygen and CO2',alv:'air sacs',
  cS:'SpO2, %',cC:'CO2 in the blood (direction only)',cCN:'CO2 in the blood',leg:'dashed: high flow · solid: titrated',
  cx:'minutes on oxygen (schematic)',cx0:'0',cx1:'60',
  acid:'blood acidity',acidL:'more acidic',acidR:'normal',
  stop:'sudden stop',
  card:['OXYGEN ALERT CARD','target 88–92%','(example card)'],
  ann:[['Uneven air and blood flow (V/Q mismatch) lowers O2','About 1 in 5 flare-ups brings high CO2 and acid'],
    ['94–98%: most acutely ill people (BTS 2017)','88–92%: at risk of hypercapnic failure'],
    ['High flow: more acidosis and higher PaCO2','BTS: acidosis risk rises if PaO2 >10.0 kPa'],
    ['Deaths: 4% titrated against 9% high flow','Confirmed COPD: 2% against 9% (RR 0.22)'],
    ['Stopping suddenly risks rebound hypoxaemia','Step down to the lowest flow that keeps 88–92%'],
    ['A normal SpO2 does not replace a blood gas','Oximetry may overestimate O2 in darker skin','Alert cards after hypercapnic failure']],
  read:(sat,fl,co)=>`<span>SpO2 <b>${Math.round(sat)}%</b></span><span>Oxygen given <b>${fl}</b></span><span>Carbon dioxide <b>${co}</b></span>`,
  flW:['none (room air)','high flow','titrated','stepping down','low, titrated'],coW:['raised','climbing','high','stable','easing'],
  /* band explorer */
  sat:{risk:{lo:88,hi:92,name:'people at risk of hypercapnic respiratory failure'},most:{lo:94,hi:98,name:'most acutely ill patients'}},
  satIn:(v,n,lo,hi)=>`${v}% is inside the ${lo}–${hi}% range that BTS 2017 gives for ${n}.`,
  satLo:(v,n,lo,hi)=>`${v}% is below the ${lo}–${hi}% range that BTS 2017 gives for ${n}.`,
  satHi:(v,n,lo,hi)=>`${v}% is above the ${lo}–${hi}% range that BTS 2017 gives for ${n}.`,
  satRisk:' For this group BTS 2017 warns that excess oxygen raises the risk of respiratory acidosis.',
  satAxis:'SpO2, %',
  /* interpreter */
  steps:['Step 1 · Is the sample consistent?','Step 2 · Acidaemia or alkalaemia?','Step 3 · Is CO2 the culprit?','Step 4 · Acute or chronic?','Step 5 · Oxygen in context','Step 6 · Does it meet the NIV line?'],
  s1:(hm,hh,ok)=>`[H⁺] from the pH is about ${Math.round(hm)} nmol/L; 24 × PaCO2 (mmHg) ÷ HCO3⁻ gives ${Math.round(hh)} nmol/L. `+(ok?'They agree, so the three values are consistent.':'They do not agree (this tool flags a gap over 10%, its own choice): check the entry, or press the button to set the pH from PaCO2 and HCO3⁻.')+` [[Sood2010]]`,
  s2:(ph,k)=>[`pH ${ph} is below 7.35: acidaemia.`,`pH ${ph} is within 7.35–7.45.`,`pH ${ph} is above 7.45: alkalaemia.`][k]+` [[Samuel2023]]`,
  s3:{respAc:c=>`PaCO2 ${c} is above 45 mmHg (6 kPa) with a low pH: respiratory acidosis. [[Samuel2023,ODriscoll2017Summary]]`,
    mixAc:(c,h)=>`PaCO2 ${c} is above 45 mmHg and HCO3⁻ ${h} is below 22 mmol/L: respiratory and metabolic acidosis together, by the ranges used here. [[Samuel2023]]`,
    metAc:h=>`PaCO2 is not raised and HCO3⁻ ${h} is below 22 mmol/L: the acidaemia is metabolic, not respiratory, by the ranges used here. [[Samuel2023]]`,
    respAlk:c=>`PaCO2 ${c} is below 35 mmHg with a high pH: respiratory alkalosis, by the same ranges. [[Samuel2023]]`,
    metAlk:h=>`HCO3⁻ ${h} is above 26 mmol/L with a high pH: metabolic alkalosis, by the same ranges. [[Samuel2023]]`,
    compHi:`pH is in range but PaCO2 and HCO3⁻ are both raised: a compensated pattern. [[Samuel2023]]`,
    compLo:`pH is in range but PaCO2 and HCO3⁻ are both low: a compensated pattern. [[Samuel2023]]`,
    none:`PaCO2 and HCO3⁻ are within the ranges used here: no acid–base disturbance shown. [[Samuel2023]]`,
    other:`This combination does not fit the simple rules in this tool.`},
  s4:{resp:(a,c,h,r,band)=>`Expected HCO3⁻ is about ${a} mmol/L if acute and ${c} if chronic; measured ${h}. ΔH⁺/ΔPaCO2 = ${r}: ${band} [[Sood2010]]`,
    bands:['below 0.3 suggests chronic.','0.3–0.8 suggests acute-on-chronic.','above 0.8 suggests acute.'],
    sam:['HCO3⁻ 22–26: no metabolic compensation','HCO3⁻ above 26–35: partial compensation','HCO3⁻ above 35–42: marked compensation'],
    samT:x=>` By Samuel's bands: ${x}. [[Samuel2023]]`,
    bts:` BTS 2017 reads raised PCO2 with pH ≥7.35 and/or HCO3⁻ above 28 mmol/L as probably long-standing hypercapnia. [[ODriscoll2017Summary]]`,
    met:(e,k)=>`Expected PaCO2 = 1.5 × HCO3⁻ + 8 ± 2 = ${e}. `+['The measured value is within it.','The measured value is higher: a respiratory acidosis as well.','The measured value is lower; the rule summarised here describes only the higher case.'][k]+` [[Sood2010]]`,
    nope:`The compensation rules summarised here cover respiratory acidosis and metabolic acidosis only.`},
  s5:{low:p=>`PaO2 ${p} is at or below 8 kPa: hypoxaemia by the Rome threshold. [[Jacobson2023]] `,
    hi:p=>`PaO2 ${p} is above 10 kPa with raised CO2: BTS 2017 says excess oxygen raises the risk of respiratory acidosis. [[ODriscoll2017Summary]] `,
    mid:p=>`PaO2 ${p}. `,
    fi:(f,mm,k)=>`Read PaO2 only with the FiO2: Sood's rough expectation at ${f}% is about ${mm} mmHg (${k} kPa). This tool gives no PaO2 reference range; laboratories set their own. [[Sood2010]]`},
  s6:{icsY:`pH below 7.35 with pCO2 above 6.5 kPa meets the BTS/ICS line for NIV if it persists or develops despite optimal medical therapy. [[Davidson2016Summary]]`,
    icsN:`The BTS/ICS line (pH below 7.35 with pCO2 above 6.5 kPa) is not met. [[Davidson2016Summary]]`,
    o2Y:` The BTS 2017 line (PCO2 above 6 kPa and pH below 7.35, persisting over 30 minutes after initial treatment) and the Rome "severe" grade, if new or worsening, are met. [[ODriscoll2017Summary,Jacobson2023,Agusti2023]]`,
    o2N:` The 6 kPa line used by BTS 2017 and Rome is not met with acidaemia either.`,
    l25:` pH below 7.25: NIV failure risk is much higher. [[Confalonieri2005]]`,
    l15:` pH below 7.15, if persisting, is listed in BTS/ICS Box 1 as an indication for invasive ventilation. [[Davidson2016Summary]]`},
  vIcs:`Meets the published BTS/ICS NIV threshold, if it persists despite optimal medical therapy.`,
  vO2:`Meets the 6 kPa line (BTS 2017, Rome) but not the 6.5 kPa BTS/ICS line: the sources differ here.`,
  vHi:`Raised carbon dioxide without acidaemia: no published NIV threshold is met.`,
  vNo:`No published NIV threshold is met.`,
  mapX:u=>`PaCO2, ${u}`,mapY:'pH',normal:'normal',zone:'NIV zone (BTS/ICS)',zoneN:'NIV zone',acute:'acute',chronic:'chronic',p25:'pH 7.25',p15:'pH 7.15'
};
const BG_EX={normal:{ph:7.40,co2:40,hco:24,po2:12.0,fi:'21'},a:{ph:7.26,co2:60,hco:26,po2:7.5,fi:'21'},b:{ph:7.33,co2:60,hco:31,po2:8.2,fi:'24'},
  c:{ph:7.22,co2:80,hco:32,po2:11.2,fi:'28'},met:{ph:7.30,co2:29,hco:14,po2:13.0,fi:'21'}};
const BG_HF={s:m=>85+14*ease(ramp(m,0,15)),c:m=>.55+.4*ease(ramp(m,5,55))},BG_TI={s:m=>85+5*ease(ramp(m,0,15)),c:m=>.55+.03*ramp(m,0,60)};
/* an oxygen alert card */
function bgCard(x,y,w){const h=w*.42;let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="18" rx="8" style="fill:var(--bad)"/>`;
  g+=`<text x="${f1(x+w/2)}" y="${f1(y+13)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${BG_TXT.card[0]}</text><text x="${f1(x+w/2)}" y="${f1(y+h*.62)}" class="t-lbl t-mid">${BG_TXT.card[1]}</text><text x="${f1(x+w/2)}" y="${f1(y+h*.88)}" class="t-xs t-mid">${BG_TXT.card[2]}</text>`;return g}
inits.bloodgas=()=>{
  const svg=$('#bgSvg'),rg=$('#bgT'),rd=$('#bgRead');
  function state(t,p){const mh=ramp(t,.32,.52)*60,mt=ramp(t,.52,.7)*60;let flow=0,sat=85,co2=.55,fw=0,cw=0;
    if(p===2){flow=ease(ramp(t,.32,.36));sat=BG_HF.s(mh);co2=BG_HF.c(mh);fw=1;cw=co2>.8?2:1}
    else if(p===3){flow=lerp(1,.32,ease(ramp(t,.52,.56)));sat=BG_TI.s(mt);co2=lerp(BG_HF.c(60),BG_TI.c(mt),ease(ramp(t,.52,.6)));fw=2;cw=co2>.62?4:3}
    else if(p===4){const k=ramp(t,.7,.86);flow=.32-.06*Math.floor(clamp(k*3.2,0,3))/1;sat=90-k;co2=.58-.05*k;fw=3;cw=4}
    else if(p===5){flow=.14;sat=90;co2=.53;fw=4;cw=3}
    return {mh,mt,flow,sat,co2,fw,cw}}
  function draw(t){
    const N=vb(svg,'720 400','400 710'),p=phaseOf(BG_STEPS,t),S=BG_STEPS[p],st=state(t,p);
    const L=N?{ty:24,bx:30,bw:26,by0:300,by1:80,lx:66,vy:66,gx:290,gy:110,gr:34,ax:290,ay:206,as:104,sx:232,sw:116,sy:266,cx0:44,cx1:384,c1y:340,c1h:70,c2y:446,c2h:56,phY:562,anY:616,sy2:690}
             :{ty:30,bx:40,bw:30,by0:330,by1:72,lx:84,vy:58,gx:300,gy:106,gr:40,ax:300,ay:214,as:120,sx:236,sw:128,sy:286,cx0:440,cx1:700,c1y:70,c1h:72,c2y:172,c2h:58,phY:282,anY:324,sy2:384};
    let s=N?wrapT(16,L.ty,S.t,36,{cls:'t-big',lh:19,style:'fill:var(--co2-ink)'}).svg:`<text x="16" y="${L.ty}" class="t-big" style="fill:var(--co2-ink)">${S.t}</text>`;
    /* SpO2 scale */
    const Ys=v=>L.by0-(L.by0-L.by1)*clamp((v-80)/20),hi=p===1?.35+.25*Math.sin(t*120):0;
    s+=`<rect x="${L.bx}" y="${L.by1}" width="${L.bw}" height="${L.by0-L.by1}" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    [[88,92,'var(--good)',L.lx,BG_TXT.b1,BG_TXT.b1s],[94,98,'var(--o2)',L.lx,BG_TXT.b2,BG_TXT.b2s]].forEach(b=>{const y0=Ys(b[1]),y1=Ys(b[0]);
      s+=`<rect x="${L.bx}" y="${f1(y0)}" width="${L.bw}" height="${f1(y1-y0)}" style="fill:${b[2]};opacity:${f1(.35+hi)}"/>`;
      s+=`<text x="${b[3]}" y="${f1((y0+y1)/2-1)}" class="t-lbl" style="fill:${b[2]==='var(--good)'?'var(--good)':'var(--o2-ink)'}">${b[4]}</text><text x="${b[3]}" y="${f1((y0+y1)/2+13)}" class="t-xs">${b[5]}</text>`});
    [80,85,90,95,100].forEach(v=>{s+=`<text x="${L.bx-4}" y="${f1(Ys(v)+3)}" class="t-xs t-end">${v}</text>`});
    const ny=Ys(st.sat);s+=`<line x1="${L.bx-2}" x2="${L.bx+L.bw+2}" y1="${f1(ny)}" y2="${f1(ny)}" style="stroke:var(--ink);stroke-width:3"/><path d="M${L.bx+L.bw+3} ${f1(ny)}l9 -6v12z" style="fill:var(--ink)"/>`;
    s+=`<text x="16" y="${L.vy}" class="t-sm" style="fill:var(--ink);font-weight:700">${BG_TXT.spo2(st.sat)}</text>`;
    /* dial or card */
    if(p<5)s+=gauge(L.gx,L.gy,L.gr,st.flow,{bands:[[0,1,'var(--o2-soft)']],col:'var(--o2-ink)'})+`<text x="${L.gx}" y="${L.gy+18}" class="t-xs t-mid">${BG_TXT.given}</text>`;
    else s+=bgCard(L.gx-(N?82:80),L.gy-(N?44:46),N?164:160);
    /* air sacs and blood */
    const V=alveoli(L.ax,L.ay,L.as,{destroy:.25,o2:clamp(.35+st.flow*.65),co2:clamp(st.co2),ph:t*30,seed:12});s+=V.svg;
    s+=`<rect x="${L.sx}" y="${L.sy}" width="${L.sw}" height="16" rx="8" style="fill:var(--blood);opacity:.22"/>`;
    const R=rng(5),nc=Math.round(3+st.co2*14),no=Math.round(2+(st.sat-80)*.6);
    for(let i=0;i<nc;i++){const u=(R()+t*.8)%1;s+=`<circle cx="${f1(L.sx+6+u*(L.sw-12))}" cy="${f1(L.sy+4+R()*8)}" r="2.6" style="fill:var(--co2)"/>`}
    for(let i=0;i<no;i++){const u=(R()+t*.8)%1;s+=`<circle cx="${f1(L.sx+6+u*(L.sw-12))}" cy="${f1(L.sy+4+R()*8)}" r="2.2" style="fill:var(--o2)"/>`}
    s+=`<text x="${L.sx+L.sw/2}" y="${L.sy+30}" class="t-xs t-mid">${BG_TXT.blood}</text>`;
    /* charts */
    const CW=L.cx1-L.cx0,Xm=m=>L.cx0+CW*m/60,Y1=v=>L.c1y+L.c1h-L.c1h*clamp((v-80)/20),Y2=v=>L.c2y+L.c2h-L.c2h*clamp((v-.45)/.55);
    s+=`<text x="${L.cx0}" y="${L.c1y-8}" class="t-xs" style="fill:var(--ink);font-weight:600">${BG_TXT.cS}</text><text x="${L.cx1}" y="${L.c1y-8}" class="t-xs t-end">${BG_TXT.leg}</text>`;
    s+=`<rect x="${L.cx0}" y="${f1(Y1(92))}" width="${CW}" height="${f1(Y1(88)-Y1(92))}" style="fill:var(--good-soft)"/><rect x="${L.cx0}" y="${f1(Y1(98))}" width="${CW}" height="${f1(Y1(94)-Y1(98))}" style="fill:var(--o2-soft);opacity:.7"/>`;
    s+=`<path d="M${L.cx0} ${L.c1y}V${L.c1y+L.c1h}H${L.cx1}" class="axis" style="fill:none"/>`;
    [88,92,98].forEach(v=>{s+=`<text x="${L.cx0-4}" y="${f1(Y1(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.cx0}" y="${L.c2y-8}" class="t-xs" style="fill:var(--ink);font-weight:600">${N?BG_TXT.cCN:BG_TXT.cC}</text><path d="M${L.cx0} ${L.c2y}V${L.c2y+L.c2h}H${L.cx1}" class="axis" style="fill:none"/>`;
    s+=`<text x="${L.cx0}" y="${L.c2y+L.c2h+14}" class="t-xs t-mid">${BG_TXT.cx0}</text><text x="${L.cx1}" y="${L.c2y+L.c2h+14}" class="t-xs t-mid">${BG_TXT.cx1}</text><text x="${L.cx1}" y="${L.c2y+L.c2h+28}" class="t-xs t-end">${BG_TXT.cx}</text>`;
    const path=(F,Y,m,col,dash)=>{if(m<.2)return '';let d='';for(let i=0;i<=60;i++){const mm=m*i/60;d+=(i?'L':'M')+f1(Xm(mm))+' '+f1(Y(F(mm)))}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.6;${dash?'stroke-dasharray:6 4':''}"/>`};
    const mH=p>=3?60:p===2?st.mh:0,mT=p>=4?60:p===3?st.mt:0;
    s+=path(BG_HF.s,Y1,mH,'var(--o2-ink)',true)+path(BG_HF.c,Y2,mH,'var(--co2)',true)+path(BG_TI.s,Y1,mT,'var(--o2-ink)',false)+path(BG_TI.c,Y2,mT,'var(--co2)',false);
    if(p>=4){const k=ease(ramp(t,.72,.8)),x0=Xm(52),x1=Xm(60),y0=Y1(BG_HF.s(52)),y1=lerp(y0,Y1(81),k);
      s+=`<path d="M${f1(x0)} ${f1(y0)}L${f1(lerp(x0,x1,k))} ${f1(y1)}" style="fill:none;stroke:var(--bad);stroke-width:2.6;stroke-dasharray:2 4"/>`;
      if(k>.9)s+=`<text x="${f1(x0-4)}" y="${f1(Y1(82))}" class="t-xs t-end" style="fill:var(--bad);font-weight:600">${BG_TXT.stop}</text>`}
    /* acidity scale */
    const ac=clamp((st.co2-.52)/.4),pw=L.cx1-L.cx0;
    s+=`<text x="${L.cx0}" y="${L.phY-8}" class="t-xs" style="fill:var(--ink);font-weight:600">${BG_TXT.acid}</text><rect x="${L.cx0}" y="${L.phY}" width="${pw}" height="10" rx="5" style="fill:var(--bad-soft)"/><rect x="${f1(L.cx0+pw*.72)}" y="${L.phY}" width="${f1(pw*.28)}" height="10" rx="5" style="fill:var(--good-soft)"/>`;
    s+=`<circle cx="${f1(L.cx0+pw*(.86-.8*ac))}" cy="${L.phY+5}" r="7" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/><text x="${L.cx0}" y="${L.phY+24}" class="t-xs">${BG_TXT.acidL}</text><text x="${L.cx1}" y="${L.phY+24}" class="t-xs t-end">${BG_TXT.acidR}</text>`;
    BG_TXT.ann[p].forEach((x,i)=>{s+=`<text x="${N?16:236}" y="${L.anY+i*16}" class="t-xs" style="fill:var(--ink)">${x.replace(/>/g,'&gt;')}</text>`});
    /* strip */
    const SW=N?368:688,sw=SW/6;BG_STEPS.forEach((q,j)=>{const on=j===p,xx=16+j*sw;
      s+=`<rect x="${f1(xx+1)}" y="${L.sy2}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--co2)':'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.sy2-6}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.sh}</text>`});
    s+=`<circle cx="${f1(16+SW*t)}" cy="${L.sy2+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=BG_TXT.read(st.sat,BG_TXT.flW[st.fw],BG_TXT.coW[st.cw]);
    $('#bgNote').innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#bgPlay'),draw,22000,'%t:player.replay%','bloodgas');
  const setSt=stepWire($('#bgSteps'),BG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- saturation band explorer ---------- */
  const ss=$('#bgSatSvg'),si=$('#bgSat'),sv=$('#bgSatVd');let who='risk';
  function sat(){const v=+si.value,G=BG_TXT.sat[who],N=vb(ss,'720 120','400 130');$('#bgSatV').textContent=v+'%';
    const x0=N?24:30,x1=N?384:700,X=q=>x0+(x1-x0)*(q-80)/20,y=N?44:40;let s='';
    [['risk',88,92,'var(--good)'],['most',94,98,'var(--o2)']].forEach(b=>{const on=b[0]===who;
      s+=`<rect x="${f1(X(b[1]))}" y="${y}" width="${f1(X(b[2])-X(b[1]))}" height="26" style="fill:${b[3]};opacity:${on?.5:.16};${on?'stroke:var(--ink);stroke-width:2':''}"/><text x="${f1((X(b[1])+X(b[2]))/2)}" y="${y+17}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${b[1]}–${b[2]}</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${y+26}" y2="${y+26}" class="axis"/>`;
    [80,85,90,95,100].forEach(q=>{s+=`<text x="${f1(X(q))}" y="${y+42}" class="t-xs t-mid">${q}</text>`});
    s+=`<text x="${x1}" y="${y+58}" class="t-xs t-end">${BG_TXT.satAxis}</text>`;
    const xv=X(v);s+=`<path d="M${f1(xv-7)} ${y-16}h14l-7 10z" style="fill:var(--ink)"/><line x1="${f1(xv)}" x2="${f1(xv)}" y1="${y-6}" y2="${y+28}" style="stroke:var(--ink);stroke-width:3"/>`;
    ss.innerHTML=s;const k=v<G.lo?0:v>G.hi?2:1;sv.className='verdict '+(k===1?'yes':'maybe');
    sv.innerHTML=[BG_TXT.satLo,BG_TXT.satIn,BG_TXT.satHi][k](v,G.name,G.lo,G.hi)+(k===2&&who==='risk'?BG_TXT.satRisk:'')+' [[ODriscoll2017Summary]]'}
  si.addEventListener('input',sat);
  $$('#m-bloodgas [data-bgw]').forEach(b=>b.addEventListener('click',()=>{who=b.dataset.bgw;$$('#m-bloodgas [data-bgw]').forEach(x=>x.setAttribute('aria-pressed',x===b));sat()}));
  sat();

  /* ---------- ABG interpreter ---------- */
  const E=id=>$('#'+id),ms=$('#bgMapSvg');let unit='kpa',v={ph:7.40,co2:40,hco:24,po2:12.0};
  const fmtP=mm=>unit==='kpa'?`${(mm/7.5).toFixed(1)} kPa`:`${Math.round(mm)} mmHg`;
  function setSliders(){const c=E('bgCo2'),o=E('bgPo2');
    if(unit==='kpa'){c.min=2;c.max=15;c.step=.1;c.value=(v.co2/7.5).toFixed(1);o.min=3;o.max=30;o.step=.1;o.value=v.po2.toFixed(1)}
    else{c.min=15;c.max=113;c.step=1;c.value=Math.round(v.co2);o.min=23;o.max=225;o.step=1;o.value=Math.round(v.po2*7.5)}
    E('bgPh').value=v.ph.toFixed(2);E('bgHco').value=v.hco}
  function read(){v.ph=+E('bgPh').value;v.hco=+E('bgHco').value;const c=+E('bgCo2').value,o=+E('bgPo2').value;
    v.co2=unit==='kpa'?c*7.5:c;v.po2=unit==='kpa'?o:o/7.5}
  function interp(){const T=BG_TXT,ph=v.ph,P=v.co2,Pk=P/7.5,h=v.hco,po2=v.po2,fi=+E('bgFi').value;
    const hm=Math.pow(10,9-ph),hh=24*P/h,ok=Math.abs(hm-hh)/hh<=.1,phS=ph.toFixed(2),cS=fmtP(P);
    const out=[T.s1(hm,hh,ok)];const k2=ph<7.35?0:ph>7.45?2:1;out.push(T.s2(phS,k2));
    let s3,kind='';
    if(k2===0){if(P>45&&h<22){s3=T.s3.mixAc(cS,h);kind='resp'}else if(P>45){s3=T.s3.respAc(cS);kind='resp'}else if(h<22){s3=T.s3.metAc(h);kind='met'}else s3=T.s3.other}
    else if(k2===2){if(P<35){s3=T.s3.respAlk(cS)}else if(h>26){s3=T.s3.metAlk(h)}else s3=T.s3.other}
    else{if(P>45&&h>26){s3=T.s3.compHi;kind='resp'}else if(P<35&&h<22)s3=T.s3.compLo;else if(P>=35&&P<=45&&h>=22&&h<=26)s3=T.s3.none;else{s3=T.s3.other;if(P>45)kind='resp'}}
    out.push(s3);
    let s4;
    if(kind==='resp'&&P>40){const a=(24+(P-40)/10).toFixed(1),c=(24+3.5*(P-40)/10).toFixed(1),r=(hm-40)/(P-40),bi=r<.3?0:r>.8?2:1;
      s4=T.s4.resp(a,c,h,r.toFixed(2),T.s4.bands[bi]);
      if(h>=22&&h<=42)s4+=T.s4.samT(T.s4.sam[h<=26?0:h<=35?1:2]);
      if(Pk>6&&(ph>=7.35||h>28))s4+=T.s4.bts}
    else if(kind==='met'){const e=1.5*h+8,kk=P>e+2?1:P<e-2?2:0;s4=T.s4.met(`${fmtP(e-2)} to ${fmtP(e+2)}`,kk)}
    else s4=T.s4.nope;
    out.push(s4);
    const pS=unit==='kpa'?`${po2.toFixed(1)} kPa`:`${Math.round(po2*7.5)} mmHg`;
    out.push((po2<=8?T.s5.low(pS):po2>10&&Pk>6?T.s5.hi(pS):T.s5.mid(pS))+T.s5.fi(fi,5*fi,(5*fi/7.5).toFixed(1)));
    const ics=ph<7.35&&Pk>6.5,o2l=ph<7.35&&Pk>6;
    out.push((ics?T.s6.icsY:T.s6.icsN)+(o2l?T.s6.o2Y:T.s6.o2N)+(ph<7.25?T.s6.l25:'')+(ph<7.15?T.s6.l15:''));
    const hits=[!ok,k2!==1,kind==='resp'||kind==='met',kind==='resp'||kind==='met',po2<=8||(po2>10&&Pk>6),o2l];
    E('bgOut').innerHTML=out.map((x,i)=>`<li class="${hits[i]?'hit':''}"><b>${T.steps[i]}</b>${x}</li>`).join('');
    const bv=E('bgV');bv.className='verdict '+(ics?'no':o2l||Pk>6?'maybe':'yes');bv.textContent=ics?T.vIcs:o2l?T.vO2:Pk>6?T.vHi:T.vNo}
  function map(){const N=vb(ms,'720 300','400 330'),x0=N?50:64,x1=N?384:700,y0=16,y1=N?280:256,X=k=>x0+(x1-x0)*(clamp(k,2,14)-2)/12,Y=q=>y0+(y1-y0)*(7.65-clamp(q,6.95,7.65))/.7;let s='';
    s+=`<rect x="${f1(X(6.5))}" y="${f1(Y(7.35))}" width="${f1(X(14)-X(6.5))}" height="${f1(Y(6.95)-Y(7.35))}" style="fill:var(--bad-soft)"/>`;
    s+=`<text x="${f1(X(6.5)+6)}" y="${f1(Y(6.95)-8)}" class="t-xs" style="fill:var(--bad);font-weight:600">${N?BG_TXT.zoneN:BG_TXT.zone}</text>`;
    s+=`<rect x="${f1(X(35/7.5))}" y="${f1(Y(7.45))}" width="${f1(X(6)-X(35/7.5))}" height="${f1(Y(7.35)-Y(7.45))}" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.2"/><text x="${f1(X(35/7.5))}" y="${f1(Y(7.45)-5)}" class="t-xs" style="fill:var(--good);font-weight:600">${BG_TXT.normal}</text>`;
    s+=`<line x1="${f1(X(6))}" x2="${f1(X(6))}" y1="${f1(Y(7.35))}" y2="${y1}" style="stroke:var(--co2);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    [[7.25,BG_TXT.p25],[7.15,BG_TXT.p15]].forEach(([q,l])=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(q))}" y2="${f1(Y(q))}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4"/><text x="${x0+4}" y="${f1(Y(q)-3)}" class="t-xs">${l}</text>`});
    [[1,BG_TXT.acute],[3.5,BG_TXT.chronic]].forEach(([k,l])=>{let d='';for(let i=0;i<=40;i++){const P=40+65*i/40,H=24*P/(24+k*(P-40)/10),q=9-Math.log10(H);d+=(i?'L':'M')+f1(X(P/7.5))+' '+f1(Y(q))}
      const Pe=105,qe=9-Math.log10(24*Pe/(24+k*(Pe-40)/10));s+=`<path d="${d}" style="fill:none;stroke:var(--co2-ink);stroke-width:1.8"/><text x="${f1(X(14)-4)}" y="${f1(Y(qe)+(k===1?-8:14))}" class="t-xs t-end" style="fill:var(--co2-ink);font-weight:600">${l}</text>`});
    s+=`<path d="M${x0} ${y0}V${y1}H${x1}" class="axis" style="fill:none"/>`;
    [7.0,7.1,7.2,7.3,7.4,7.5,7.6].forEach(q=>{s+=`<text x="${x0-5}" y="${f1(Y(q)+3)}" class="t-xs t-end">${q.toFixed(1)}</text>`});
    const xt=unit==='kpa'?[2,4,6,8,10,12,14].map(k=>[k,k]):[15,30,45,60,75,90,105].map(m=>[m/7.5,m]);
    xt.forEach(([k,l])=>{s+=`<text x="${f1(X(k))}" y="${y1+14}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${x1}" y="${y1+28}" class="t-xs t-end">${BG_TXT.mapX(unit==='kpa'?'kPa':'mmHg')}</text><text x="${x0}" y="${y0-4}" class="t-xs">${N?'':BG_TXT.mapY}</text>`;
    const px=X(v.co2/7.5),py=Y(v.ph);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="11" style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.5"/><circle cx="${f1(px)}" cy="${f1(py)}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    ms.innerHTML=s}
  function upd(){E('bgPhV').textContent=v.ph.toFixed(2);E('bgCo2V').textContent=fmtP(v.co2);E('bgHcoV').textContent=v.hco;
    E('bgPo2V').textContent=unit==='kpa'?`${v.po2.toFixed(1)} kPa`:`${Math.round(v.po2*7.5)} mmHg`;interp();map()}
  $$('#bgCalc input').forEach(el=>el.addEventListener('input',()=>{read();upd()}));E('bgFi').addEventListener('change',upd);
  $$('#m-bloodgas [data-bgu]').forEach(b=>b.addEventListener('click',()=>{unit=b.dataset.bgu;$$('#m-bloodgas [data-bgu]').forEach(x=>x.setAttribute('aria-pressed',x===b));setSliders();upd()}));
  $$('#m-bloodgas [data-bge]').forEach(b=>b.addEventListener('click',()=>{const X=BG_EX[b.dataset.bge];v={ph:X.ph,co2:X.co2,hco:X.hco,po2:X.po2};E('bgFi').value=X.fi;setSliders();upd()}));
  E('bgFix').addEventListener('click',()=>{v.ph=clamp(+(9-Math.log10(24*v.co2/v.hco)).toFixed(2),6.9,7.7);setSliders();upd()});
  setSliders();upd();
  const prev=redraws.bloodgas;redraws.bloodgas=()=>{prev&&prev();sat();map()};
};
