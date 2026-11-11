/* =============== 2.3 Assessment & staging =============== */
/* A clinical encounter drawn as six stations on a path: ask permission, history, measure, tests, stage, shared plan.
   Each station has its own small scene. The weight-history curve is schematic; cuff sizes, test lists and EOSS
   hazard ratios are as published. Everything here is a teaching tool, never a diagnosis. */
const AS_STEPS=[
 {from:0,at:.07,k:'5As · Ask',t:'Ask permission',
  txt:'The modified 5As for obesity counselling are Ask, Assess, Advise, Agree and Assist. Ask means asking permission to discuss weight, without judgement, and exploring whether the person is ready. [[Vallis2013]] Weight stigma causes physical and psychological harm and leads to poorer care. [[Rubino2020Stigma]] <a href="#" data-go="stigma">Module 2.4</a> covers language that helps.',
  pt:'A good check-up asks your permission before talking about weight. You can say "not today", and the rest of your care should not change.',
  hook:'The 5As: Ask (permission), Assess, Advise, Agree, Assist. [[Vallis2013]]'},
 {from:1/6,at:1/6+.08,k:'5As · Assess',t:'History: the whole story',
  txt:'Assess covers the drivers and complications of excess weight. [[Vallis2013]] A medicine review matters: in 257 RCTs, olanzapine (2.4 kg), gabapentin (2.2 kg), pioglitazone (2.6 kg), glyburide (2.6 kg), amitriptyline (1.8 kg) and mirtazapine (1.5 kg) were linked to weight gain versus placebo. [[Domecq2015]] Secondary causes include Cushing\'s syndrome, hypothyroidism and medicines such as steroids, antidepressants and antipsychotics. [[Rubino2025Commission]] Ask about sleep and mood, and about eating problems: binge eating disorder and night eating syndrome are common in people living with obesity. [[Rubino2025Commission,Kessler2013BED]]',
  pt:'The clinician asks how your weight has changed over your life, which medicines you take, and how you sleep, feel and eat. Some medicines cause weight gain. Never stop or change one on your own: ask whether there is another option.',
  hook:'Weight-gain medicines (257 RCTs): pioglitazone and glyburide 2.6 kg, olanzapine 2.4 kg, gabapentin 2.2 kg. Population averages. [[Domecq2015]]'},
 {from:2/6,at:2/6+.1,k:'5As · Assess',t:'Measure: BMI, waist and the right cuff',
  txt:'The Lancet Commission says BMI is a population and screening measure; excess adiposity should be confirmed by direct fat measurement or at least one of waist, waist-to-hip or waist-to-height, except above BMI 40, where it can be assumed. [[Rubino2025Commission]] The IAS/ICCR consensus calls waist circumference a "vital sign". [[Ross2020IASICCR]] A cuff that is too small reads falsely high: the bladder should be 75–100% of the arm circumference, measured midway between acromion and olecranon. [[Muntner2019]] Acanthosis nigricans, found in 74% of one obesity clinic sample, marks high insulin. [[Hud1992]]',
  pt:'Your blood pressure should be measured with a cuff that fits your arm. A cuff that is too small can show a falsely high reading.',
  hook:'AHA cuff sizes by arm circumference: 22–26 small adult, 27–34 adult, 35–44 large adult, 45–52 cm extra-large adult. [[Muntner2019]]'},
 {from:3/6,at:3/6+.1,k:'5As · Assess',t:'Tests, as published',
  txt:'The Lancet Commission (98% consensus): laboratory tests for people with confirmed excess adiposity "should include at least" a full blood count, glycaemia, lipid profile, and renal and liver function tests. Specific tests may be needed "if clinically indicated" to rule out secondary obesity, and people with preclinical or clinical obesity should be regularly screened for type 2 diabetes. [[Rubino2025Commission]] AASLD: people with steatosis and metabolic risk factors should have a FIB-4 risk assessment (age, ALT, AST, platelets); under 1.3 rules out advanced fibrosis and 2.67 or more rules it in. [[Rinella2023AASLD]]',
  pt:'Blood tests look at blood sugar, cholesterol, the kidneys, the liver and a blood count. A normal liver test does not always mean the liver is free of fat.',
  hook:'FIB-4 under 1.3 rules out advanced fibrosis; 2.67 or more rules it in (AASLD). [[Rinella2023AASLD]]'},
 {from:4/6,at:4/6+.1,k:'Staging',t:'Stage: how is health affected?',
  txt:'The Edmonton Obesity Staging System (EOSS) is a clinical and functional staging system used alongside BMI: a 5-point scale (0–4) for the comorbidity and functional limitation linked to excess weight. [[Sharma2009EOSS,Padwal2011EOSS]] In NHANES, over 75% of adults with overweight or obesity scored 1 or 2. Stage 2 (HR 1.57) and stage 3 (HR 2.69) predicted higher mortality than stages 0–1, even after adjusting for BMI, and survival separated by EOSS stage but not by obesity class. [[Padwal2011EOSS]] The King\'s system scores nine domains from Airways to body Image. [[Aasheim2011]]',
  pt:'Staging asks how weight is affecting health and daily life, not how big someone is. Two people with the same BMI can be at very different stages.',
  hook:'EOSS predicted mortality where BMI class did not: stage 2 HR 1.57, stage 3 HR 2.69 vs 0–1. [[Padwal2011EOSS]]'},
 {from:5/6,at:5/6+.11,k:'5As · Advise, Agree, Assist',t:'A shared plan',
  txt:'Advise covers health risks, the benefits of modest weight loss, the need for a long-term strategy and the treatment options. Agree covers realistic expectations and the plan. Assist covers barriers, resources, referrals and regular follow-up. [[Vallis2013]] USPSTF (grade B): clinicians should offer or refer adults with a BMI of 30 or more to intensive, multicomponent behavioural interventions. [[Curry2018USPSTF]] AACE frames obesity as an "adiposity-based chronic disease" and says care should target its complications as well as adiposity. [[Garvey2016AACE]]',
  pt:'The plan is made together and is about health, not a number. It includes follow-up, because obesity is long-term and the plan may change.',
  hook:'USPSTF B: offer or refer adults with BMI ≥30 to intensive multicomponent behavioural interventions. [[Curry2018USPSTF]]'}
];
const AS_NODES=['Ask','History','Measure','Tests','Stage','Plan'];
const AS_CUFF=[{n:'small adult',a:22,b:26},{n:'adult',a:27,b:34},{n:'large adult',a:35,b:44},{n:'extra-large adult',a:45,b:52}];
const AS_TESTS=['blood count','glycaemia','lipids','kidney','liver'];
const AS_HIST=['weight over the years','medicines','sleep','mood','eating patterns'];
/* EOSS teaching tool */
const AS_LV=['none','mild','moderate','severe','end-stage'];
const AS_DOM=[{id:'asMed',n:'Medical: risk factors and comorbidities'},{id:'asPsy',n:'Mental health'},{id:'asFun',n:'Daily function'}];
/* Lancet Commission adult criteria for clinical obesity (Table 2), as listed */
const AS_LC=['Raised intracranial pressure','Sleep apnoeas or hypopnoeas','Hypoventilation or breathlessness','Heart failure with reduced ejection fraction','Heart failure with preserved ejection fraction','Chronic or recurrent atrial fibrillation','Pulmonary hypertension','Recurrent deep-vein thrombosis or pulmonary embolism','Raised blood pressure','Hyperglycaemia with high triglycerides and low HDL','Fatty liver disease with liver fibrosis','Microalbuminuria with reduced eGFR','Recurrent or chronic urinary incontinence','Anovulation, oligomenorrhoea and PCOS','Male hypogonadism','Chronic severe knee or hip pain with stiffness','Lower-limb lymphoedema','Significant limitation of daily activities'];
const AS_SB=[['S','Snoring loudly'],['T','Tired or sleepy in the daytime'],['O','Observed to stop breathing in sleep'],['P','High blood pressure'],['B','BMI over 35'],['A','Age above the tool\'s cut-off'],['N','Neck circumference above the tool\'s cut-off'],['G','Male gender']];

inits.assessment=()=>{
  const svg=$('#asSvg'),rg=$('#asT'),note=$('#asNote');
  const bubble=(x,y,w,h,txt,tail,col)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/><path d="M${f1(tail[0])} ${f1(y+h)}L${f1(tail[1])} ${f1(y+h+12)}L${f1(tail[0]+12)} ${f1(y+h)}Z" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/><rect x="${f1(tail[0]+1)}" y="${f1(y+h-2)}" width="10" height="3" style="fill:var(--panel)"/>`+txt;
  const typed=(s,u)=>s.slice(0,Math.round(s.length*clamp(u)));
  function scene(p,u,x,y,w,h,N){let s='';
    if(p===0){/* two people, one asks */
      const py=N?y+140:y+h-222,ps=N?280:190,a=person(x+w*.24,py,ps,{size:.25}),b=person(x+w*.62,py,ps,{size:.75});s+=a.svg+b.svg;
      const q='May we talk about weight today?',r='Yes, I\'d like that.',bw=N?190:230;
      s+=bubble(x+(N?4:w*.02),y+(N?6:10),bw,44,`<text x="${f1(x+(N?14:w*.02+12))}" y="${f1(y+(N?33:37))}" class="t-lbl" style="font-size:12.5px">${typed(q,ramp(u,.05,.45))}</text>`,[x+w*.24-6,x+w*.24],'var(--hl)');
      if(u>.5)s+=bubble(x+w*(N?.42:.52),y+(N?62:66),N?178:200,44,`<text x="${f1(x+w*(N?.42:.52)+12)}" y="${f1(y+(N?89:93))}" class="t-lbl" style="font-size:12.5px">${typed(r,ramp(u,.55,.85))}</text>`,[x+w*.62-6,x+w*.62],'var(--brand)');
      s+=`<text x="${f1(x+w/2)}" y="${f1(N?py+ps+22:y+h-2)}" class="t-xs t-mid">ask first, without judgement · "not today" is an answer too</text>`}
    else if(p===1){/* weight history curve and a checklist */
      const cw=N?w:w*.55,ch=N?150:h-60,ax=curveAxes(x+30,y+20,cw-40,ch,{x0:20,x1:60,y0:0,y1:1,xt:[20,30,40,50,60],xlabel:'age (schematic)',ylabel:'weight'});
      s+=ax.svg;const P=[[20,.22],[26,.3],[31,.48],[34,.4],[38,.58],[43,.52],[47,.72],[52,.66],[57,.8]];
      s+=plotLine(P,ax.X,ax.Y,{col:'var(--hl)',upto:lerp(20,57,ease(ramp(u,0,.6))),smooth:true,dot:true}).svg;
      if(u>.35)s+=kitLabel(ax.X(34),ax.Y(.4)+16,'changes around life events','m');
      const lx=N?x+10:x+w*.62,ly=N?y+ch+70:y+30;
      AS_HIST.forEach((t,i)=>{const a=clamp(ramp(u,.15+.13*i,.25+.13*i));const yy=ly+i*(N?28:44);
        s+=`<g style="opacity:${f1(.25+.75*a)}"><rect x="${f1(lx)}" y="${f1(yy)}" width="20" height="20" rx="5" style="fill:${a>.9?'var(--hl)':'var(--panel)'};stroke:var(--hl);stroke-width:1.4"/>${a>.9?`<path d="M${f1(lx+5)} ${f1(yy+10)}L${f1(lx+9)} ${f1(yy+14)}L${f1(lx+15)} ${f1(yy+6)}" style="fill:none;stroke:var(--panel);stroke-width:2.2"/>`:''}<text x="${f1(lx+30)}" y="${f1(yy+15)}" class="t-lbl" style="font-size:13px">${t}</text></g>`})}
    else if(p===2){/* a person with a waist tape and a cuff; the arm circumference sweeps the AHA cuff table */
      const px=x+(N?60:w*.16),pr=person(px,y+10,N?250:h-30,{size:.6}),k=(N?250:h-30)/100;s+=pr.svg;
      const bl=pr.at.belly,ww=(14.6+7.4*.6)*k;
      s+=`<ellipse cx="${f1(bl[0])}" cy="${f1(bl[1]+3*k)}" rx="${f1(ww*.78)}" ry="${f1(2.2*k)}" style="fill:none;stroke:var(--gold);stroke-width:3;stroke-dasharray:${f1(lerp(0,200,ramp(u,0,.3)))} 400"/>`;
      if(u>.2)s+=kitLabel(bl[0]+ww+8,bl[1]+3*k+16,'waist, a "vital sign"',{});
      const cy=pr.at.chest[1]+6*k,cx=px+(13.8+6*.6)*k;
      s+=`<rect x="${f1(cx-5*k*.9)}" y="${f1(cy)}" width="${f1(10*k*.9)}" height="${f1(9*k)}" rx="4" style="fill:var(--device);opacity:${f1(.4+.5*ramp(u,.25,.4))}"/>`;
      if(u>.3)s+=kitLabel(cx+8*k,cy-4,'BP cuff on the upper arm',{});
      const arm=Math.round(lerp(23,50,ease(ramp(u,.35,.95)))),tx=N?x+20:x+w*.52,ty=N?y+290:y+40;
      s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-lbl">arm circumference</text><text x="${f1(tx)}" y="${f1(ty+32)}" class="t-big" style="font-size:28px;fill:var(--hl)">${arm} cm</text>`;
      AS_CUFF.forEach((c,i)=>{const yy=ty+50+i*(N?32:38),hit=arm>=c.a&&arm<=c.b;
        s+=`<rect x="${f1(tx)}" y="${f1(yy)}" width="${N?330:300}" height="${N?26:30}" rx="8" style="fill:${hit?'var(--hl-soft)':'var(--panel)'};stroke:${hit?'var(--hl)':'var(--line)'};stroke-width:${hit?2:1}"/><text x="${f1(tx+12)}" y="${f1(yy+(N?17:20))}" class="t-lbl" style="font-size:13px">${c.n}</text><text x="${f1(tx+(N?318:288))}" y="${f1(yy+(N?17:20))}" class="t-sm t-end">${c.a}–${c.b} cm</text>`});
      s+=`<text x="${f1(tx)}" y="${f1(ty+50+4*(N?32:38)+12)}" class="t-xs">AHA illustrative sizes; bladder length 75–100% of the arm</text>`}
    else if(p===3){/* test tubes fill one by one */
      const n=AS_TESTS.length,gap=N?72:96,x0=x+(w-gap*(n-1))/2;
      AS_TESTS.forEach((t,i)=>{const a=ease(clamp(ramp(u,.05+.12*i,.2+.12*i))),tx=x0+i*gap,ty=y+40,th=N?120:150,lv=th*.78*a;
        s+=`<rect x="${f1(tx-12)}" y="${f1(ty+th-lv-4)}" width="24" height="${f1(lv)}" rx="10" style="fill:var(--vessel);opacity:.75"/><path d="M${f1(tx-14)} ${f1(ty)}V${f1(ty+th-12)}A14 14 0 0 0 ${f1(tx+14)} ${f1(ty+th-12)}V${f1(ty)}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><rect x="${f1(tx-17)}" y="${f1(ty-10)}" width="34" height="12" rx="3" style="fill:var(--device)"/>`;
        s+=`<text x="${f1(tx)}" y="${f1(ty+th+20)}" class="t-lbl t-mid" style="font-size:12.5px">${t}</text>`});
      const by=y+(N?230:240);
      if(u>.65)s+=`<g style="opacity:${f1(ramp(u,.65,.8))}">${kitLabel(x+w/2,by,'+ FIB-4 if fat in the liver and metabolic risk (AASLD)',{a:'m'})}${kitLabel(x+w/2,by+22,'+ tests for secondary causes "if clinically indicated"',{a:'m'})}${kitLabel(x+w/2,by+44,'+ regular screening for type 2 diabetes',{a:'m'})}</g>`}
    else if(p===4){/* EOSS staircase */
      const sw=N?66:96,sh=N?44:46,x0=x+(w-sw*5)/2,base=y+h-30,cur=Math.min(4,Math.floor(ease(ramp(u,.05,.85))*5));
      for(let i=0;i<5;i++){const hh=sh*(i+1),on=i===cur;
        s+=`<rect x="${f1(x0+i*sw)}" y="${f1(base-hh)}" width="${sw-6}" height="${hh}" rx="6" style="fill:${on?'var(--hl)':'var(--panel-2)'};stroke:var(--hl);stroke-width:${on?2:1};opacity:${on?.9:.8}"/><text x="${f1(x0+i*sw+(sw-6)/2)}" y="${f1(base-hh+24)}" class="t-big t-mid" style="fill:${on?'var(--panel)':'var(--ink)'}">${i}</text>`;
        const hr=i<2?'HR 1 (ref)':i===2?'HR 1.57':i===3?'HR 2.69':'';if(hr)s+=`<text x="${f1(x0+i*sw+(sw-6)/2)}" y="${f1(base+16)}" class="t-xs t-mid">${hr}</text>`}
      s+=`<text x="${f1(x+w/2)}" y="${f1(y+14)}" class="t-lbl t-mid">EOSS stage 0–4: comorbidity and function, not size</text><text x="${f1(x+w/2)}" y="${f1(y+30)}" class="t-xs t-mid">mortality vs stages 0–1, NHANES (Padwal 2011)</text>`}
    else{/* Advise, Agree, Assist and back to follow-up */
      const L=['Advise','Agree','Assist'],D=['risks, benefits, options','expectations and plan','barriers and referrals'],cw=N?300:190,ch=N?62:110;
      L.forEach((l,i)=>{const a=ease(clamp(ramp(u,.05+.18*i,.25+.18*i))),cx=N?x+(w-cw)/2:x+18+i*(cw+40),cy=N?y+20+i*(ch+26):y+60;
        s+=`<g style="opacity:${f1(.15+.85*a)}"><rect x="${f1(cx)}" y="${f1(cy)}" width="${cw}" height="${ch}" rx="14" style="fill:var(--hl-soft);stroke:var(--hl);stroke-width:1.4"/><text x="${f1(cx+16)}" y="${f1(cy+28)}" class="t-big" style="fill:var(--hl)">${l}</text><text x="${f1(cx+16)}" y="${f1(cy+50)}" class="t-sm" style="fill:var(--ink)">${D[i]}</text></g>`;
        if(i<2&&a>.9)s+=N?`<path d="M${f1(x+w/2)} ${f1(cy+ch+3)}V${f1(cy+ch+22)}" class="arrow" marker-end="url(#asArr)"/>`:`<path d="M${f1(cx+cw+4)} ${f1(cy+ch/2)}H${f1(cx+cw+34)}" class="arrow" marker-end="url(#asArr)"/>`});
      if(u>.7){const fy=N?y+20+3*(ch+26)+10:y+210;s+=`<g style="opacity:${f1(ramp(u,.7,.85))}"><path d="M${f1(N?x+w-30:x+w-60)} ${f1(fy-10)}C${f1(N?x+w-30:x+w-60)} ${f1(fy+30)} ${f1(x+60)} ${f1(fy+30)} ${f1(x+60)} ${f1(fy-6)}" class="arrow" marker-end="url(#asArr)"/><text x="${f1(x+w/2)}" y="${f1(fy+44)}" class="t-lbl t-mid">regular follow-up: a long-term, changing plan</text></g>`}}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560'),p=phaseOf(AS_STEPS,t),u=clamp((t-AS_STEPS[p].from)*6);
    let s=`<defs>${marker('asArr','var(--muted)')}</defs>`;
    const nx=i=>N?30+i*68:70+i*116,ny=30;
    s+=`<line x1="${nx(0)}" x2="${nx(5)}" y1="${ny}" y2="${ny}" style="stroke:var(--line);stroke-width:3"/><line x1="${nx(0)}" x2="${f1(lerp(nx(0),nx(5),clamp(t*1.08)))}" y1="${ny}" y2="${ny}" style="stroke:var(--hl);stroke-width:3"/>`;
    AS_NODES.forEach((n,i)=>{const on=i===p,done=i<p;s+=`<circle cx="${nx(i)}" cy="${ny}" r="${on?12:9}" style="fill:${on||done?'var(--hl)':'var(--panel)'};stroke:var(--hl);stroke-width:2"/><text x="${nx(i)}" y="${ny+4}" class="t-xs t-mid" style="fill:${on||done?'var(--panel)':'var(--ink)'};font-weight:700">${i+1}</text><text x="${nx(i)}" y="${ny+(on?28:25)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${n}</text>`});
    s+=scene(p,u,N?10:20,72,N?380:680,N?480:300,N);
    svg.innerHTML=s;note.innerHTML=noteHTML(AS_STEPS[p]);setA(p);
  }
  const stop=playWire(rg,$('#asPlay'),draw,30000,'%t:player.replay%','assessment');
  const setA=stepWire($('#asSteps'),AS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- EOSS teaching tool ---- */
  const esvg=$('#asEossSvg'),eout=$('#asEossOut');
  AS_DOM.forEach(d=>{const el=$('#'+d.id);el.innerHTML=AS_LV.map((l,i)=>`<option value="${i}">${i} · ${l}</option>`).join('');el.addEventListener('change',drawE)});
  function drawE(){
    const v=AS_DOM.map(d=>+$('#'+d.id).value),st=Math.max(...v),N=vb(esvg,'720 240','400 300');
    const x0=N?40:200,w=N?320:440,X=h=>x0+w*h/3,rows=[{l:'Stages 0–1',h:1,st:[0,1]},{l:'Stage 2',h:1.57,st:[2]},{l:'Stage 3',h:2.69,st:[3]},{l:'Stage 4',h:null,st:[4]}];
    let s='';[0,1,2,3].forEach(h=>{s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="20" y2="${N?250:200}" class="grid"/><text x="${f1(X(h))}" y="${N?266:216}" class="t-xs t-mid">${h}</text>`});
    s+=`<text x="${f1(X(3))}" y="${N?284:232}" class="t-xs t-end">mortality hazard ratio vs stages 0–1 (NHANES)</text>`;
    rows.forEach((r,i)=>{const y=N?24+i*58:26+i*44,on=r.st.includes(st);
      s+=`<text x="${N?x0:x0-12}" y="${y+(N?12:18)}" class="t-lbl${N?'':' t-end'}" style="font-size:13px;fill:${on?'var(--hl)':'var(--ink)'}">${r.l}${on?' ◀ this sketch':''}</text>`;
      const by=N?y+18:y+4;
      if(r.h)s+=`<rect x="${x0}" y="${by}" width="${f1(X(r.h)-x0)}" height="22" rx="4" style="fill:var(--hl);opacity:${on?.95:.35}"/><text x="${f1(X(r.h)+6)}" y="${by+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.h===1?'1 (reference)':r.h}</text>`;
      else s+=`<text x="${x0}" y="${by+16}" class="t-sm">no separate figure published in these cohorts</text>`});
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="20" y2="${N?250:200}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    esvg.innerHTML=s;
    const why=AS_DOM.filter((d,i)=>v[i]===st&&st>0).map(d=>d.n.toLowerCase().split(':')[0]).join(' and ');
    eout.innerHTML=`<div class="verdict ${st<=1?'yes':st===2?'maybe':'no'}">Teaching sketch: EOSS stage ${st}${why?` (set by ${why})`:''}</div><p>${st<=1?'In the Aerobics Center cohort, stage 0/1 obesity was not associated with higher mortality than normal weight. [[Kuk2011EOSS]]':st===2?'Stage 2 carried a mortality HR of 1.57 vs stages 0–1 in NHANES [[Padwal2011EOSS]], and 1.6 vs normal weight in the Aerobics Center cohort. [[Kuk2011EOSS]]':st===3?'Stage 3 carried a mortality HR of 2.69 vs stages 0–1 in NHANES [[Padwal2011EOSS]], and 1.7 vs normal weight in the Aerobics Center cohort. [[Kuk2011EOSS]]':'Stage 4 is the most severe point of the 5-point scale. [[Padwal2011EOSS]] The cohorts here report no separate mortality figure for it.'} Population statistics, not a prognosis.</p>`;
  }
  drawE();

  /* ---- Lancet Commission checklist ---- */
  const lc=$('#asLc'),lout=$('#asLcOut'),adi=$('#asAdi');
  lc.innerHTML=AS_LC.map((c,i)=>`<label><input type="checkbox" data-lc="${i}"> ${c}</label>`).join('');
  function drawC(){const n=$$('[data-lc]:checked',lc).length,a=adi.checked;
    lout.innerHTML=!a?`<div class="verdict maybe">Excess adiposity not confirmed</div><p>In the Commission's framework, BMI alone does not confirm excess adiposity: it needs a direct fat measurement or at least one of waist, waist-to-hip or waist-to-height, unless BMI is over 40. [[Rubino2025Commission]]</p>`
      :n===0?`<div class="verdict yes">Pattern described: preclinical obesity</div><p>Excess adiposity with organ function preserved. [[Rubino2025Commission]]</p>`
      :`<div class="verdict no">Pattern described: clinical obesity (${n} of 18 criteria ticked)</div><p>A chronic, systemic illness in which excess adiposity alters organ or tissue function, or limits daily activities. [[Rubino2025Commission]] A clinician must judge that the problem is caused by excess adiposity and not by something else.</p>`}
  lc.addEventListener('change',drawC);adi.addEventListener('change',drawC);drawC();

  /* ---- STOP-Bang ---- */
  const sb=$('#asSb'),sout=$('#asSbOut');
  sb.innerHTML=AS_SB.map((q,i)=>`<label><input type="checkbox" data-sb="${i}"> <b>${q[0]}</b> ${q[1]}</label>`).join('');
  function drawS(){const on=$$('[data-sb]',sb).map(b=>b.checked),sc=on.filter(Boolean).length,stop=on.slice(0,4).filter(Boolean).length,hiMid=sc>=3&&sc<=4&&stop>=2&&on[4];
    const band=sc<=2?'low':sc>=5||hiMid?'high':'intermediate';
    sout.innerHTML=`<div class="verdict ${band==='low'?'yes':band==='high'?'no':'maybe'}">Score ${sc} of 8: ${band} risk band</div><p>${band==='low'?'Scores 0–2: low risk; in the validation data, 18% had moderate-to-severe and 4% severe OSA. [[Chung2016STOPBang]]':band==='high'?`${hiMid?'In the mid-range (3–4), a STOP score of 2 or more plus BMI over 35 classifies as high risk. ':''}Scores 5–8: high risk; at 7–8, 60% had moderate-to-severe and 38% severe OSA. [[Chung2016STOPBang]]`:'Scores 3–4: intermediate. A score of 3 or more had 93% sensitivity for moderate-to-severe OSA. [[Chung2016STOPBang]]'} A screening questionnaire, not a diagnosis: only a sleep study can confirm sleep apnoea.</p>`}
  sb.addEventListener('change',drawS);drawS();
  const prevR=redraws.assessment;redraws.assessment=()=>{prevR&&prevR();drawE()};
};
