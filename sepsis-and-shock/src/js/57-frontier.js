/* ===== 5.7 Research frontier ===== */
/* Items are placed by publication year. g:1 = graveyard (did not help or harmed), otherwise the lab bench.
   harm:1 = a harm signal. ev = evidence label for the claim in txt. */
const FT_Y0=1990,FT_Y1=2027,FT_YB=2012,FT_KB=.34;
/* a broken time axis: 1990–2012 (sparse) takes the first third, 2012–2027 the rest */
const ftU=yr=>yr<FT_YB?FT_KB*(yr-FT_Y0)/(FT_YB-FT_Y0):FT_KB+(1-FT_KB)*(yr-FT_YB)/(FT_Y1-FT_YB);
const ftYr=u=>u<FT_KB?FT_Y0+u/FT_KB*(FT_YB-FT_Y0):FT_YB+(u-FT_KB)/(1-FT_KB)*(FT_Y1-FT_YB);
const FT_EV={est:['Established','est','var(--good)'],early:['Early evidence','early','var(--warn)'],hyp:['Hypothesis','hyp','var(--rx)']};
const FT_CAT={block:'Blocking inflammation or endotoxin',coag:'Clotting pathway drugs',adj:'Vitamin C and other adjuncts',endo:'Phenotypes and endotypes',immuno:'Precision immunotherapy',dx:'Rapid diagnostics and AI'};
const FT_P=[
 {y:1991,n:'HA-1A',f:'HA-1A anti-endotoxin antibody',g:1,ev:'est',cat:'block',txt:'In 200 people with Gram-negative bacteraemia, mortality 30% vs 49%; in all 543 treated, 39% vs 43% (P = 0.24). [[Ziegler1991HA1A]]'},
 {y:1994,n:'CHESS',f:'HA-1A confirmatory trial',g:1,ev:'est',cat:'block',txt:'2,199 enrolled: no benefit in Gram-negative bacteraemia and shock (33% vs 32%); without bacteraemia it trended worse (41% vs 37%). [[McCloskey1994CHESS]]'},
 {y:1996,n:'TNFR:Fc',f:'Anti-TNF fusion protein',g:1,harm:1,ev:'est',cat:'block',txt:'141 people with septic shock: 28-day mortality rose with dose, 30% on placebo to 53% at the highest dose. [[Fisher1996TNFR]]'},
 {y:1997,n:'p55 anti-TNF',f:'p55-IgG anti-TNF',g:1,ev:'est',cat:'block',txt:'498 people: no overall benefit (P = .30); a subgroup signal (23% vs 36%) was not confirmed. [[Abraham1997p55]]'},
 {y:1997.5,n:'IL-1ra',f:'IL-1 receptor antagonist (1997)',g:1,ev:'est',cat:'block',txt:'696 people: 28-day mortality 33.1% vs 36.4% (p = .36); stopped at interim analysis. [[Opal1997IL1ra]]'},
 {y:1997,n:'IFN-γ',f:'Interferon-γ for low HLA-DR',ev:'early',cat:'immuno',txt:'Restored monocyte HLA-DR and TNF production, with clearance of sepsis in 8 of 9 patients; uncontrolled. [[Docke1997]]'},
 {y:2001,n:'KyberSept',f:'High-dose antithrombin',g:1,ev:'est',cat:'coag',txt:'2,314 people: 28-day mortality 38.9% vs 38.7%; more bleeding with heparin (23.8% vs 13.5%). [[Warren2001KyberSept]]'},
 {y:2004,n:'NOS inhibitor',f:'546C88, non-selective NOS inhibitor',g:1,harm:1,ev:'est',cat:'block',txt:'797 people with septic shock: day-28 mortality 59% vs 49%, with excess cardiovascular events; stopped early. [[Lopez2004NOS]]'},
 {y:2009,n:'GM-CSF',f:'GM-CSF guided by mHLA-DR',ev:'early',cat:'immuno',txt:'38 people with low mHLA-DR: normalised in 19 of 19 vs 3 of 19; ventilation 148 vs 207 h. [[Meisel2009]]'},
 {y:2011.5,n:'Xigris',f:'Drotrecogin alfa (activated)',g:1,ev:'est',cat:'coag',txt:'PROWESS 2001: 24.7% vs 30.8%. Withdrawn worldwide in 2011 after PROWESS-SHOCK: 26.4% vs 24.2% (RR 1.09). [[Bernard2001PROWESS,MedLett2011Xigris,Ranieri2012PROWESSSHOCK]]'},
 {y:2013,n:'Eritoran',f:'Eritoran, TLR4 antagonist (ACCESS)',g:1,ev:'est',cat:'block',txt:'1,961 people: 28-day mortality 28.1% vs 26.9% (HR 1.05). [[Opal2013ACCESS]]'},
 {y:2013,n:'Esmolol',f:'Esmolol heart-rate control',ev:'early',cat:'adj',txt:'Single-centre, open label, 154 people: 28-day mortality 49.4% vs 80.5%; the authors called for further study. [[Morelli2013Esmolol]]'},
 {y:2014,n:'Hibernation?',f:'Mitochondrial shutdown as adaptation',ev:'hyp',cat:'adj',txt:'Low muscle ATP tracked with death; others propose an adaptive, mitochondria-driven tubular-cell response in septic kidney injury. [[Brealey2002,Gomez2014]]'},
 {y:2015,n:'Rapid PCR',f:'Rapid multiplex PCR on blood cultures',ev:'est',cat:'dx',txt:'RCT, 617 people: organism in 1.3 h vs 22.3 h after Gram stain; no mortality difference. [[Banerjee2015rmPCR]]'},
 {y:2015.5,n:'T2 MR',f:'T2 magnetic resonance for candidaemia',ev:'early',cat:'dx',txt:'Sensitivity 91.1%, specificity 99.4%; species in 4.4 h vs 2–5 days. [[Mylonakis2015T2]]'},
 {y:2016,n:'SRS endotypes',f:'Transcriptomic SRS1/SRS2',ev:'early',cat:'endo',txt:'SRS1 (immunosuppressed) had higher 14-day mortality (HR 2.4); a 7-gene set classifies patients. [[Davenport2016]]'},
 {y:2016.5,n:'Anakinra MAS',f:'Anakinra reanalysis',ev:'early',cat:'immuno',txt:'43 people with hepatobiliary dysfunction and DIC: 28-day survival 65.4% vs 35.3% (HR 0.28), post hoc. [[Shakoory2016]]'},
 {y:2017,n:'Mars1–4',f:'Mars1 to Mars4',ev:'early',cat:'endo',txt:'Mars1: 39% 28-day mortality, the only endotype consistently linked with death. [[Scicluna2017]]'},
 {y:2017.3,n:'MALS',f:'Macrophage activation-like syndrome',ev:'early',cat:'endo',txt:'3.7–4.3% of people with infection and SIRS; ferritin above 4,420 ng/mL carried about 66–67% mortality. [[Kyriazopoulou2017MALS]]'},
 {y:2017.6,n:'mRDT',f:'Molecular rapid tests, meta-analysis',ev:'early',cat:'dx',txt:'Mortality OR 0.66 overall; benefit only with stewardship (OR 0.64), not without (OR 0.72; CI 0.46–1.12). [[Timbrook2017mRDT]]'},
 {y:2017.9,n:'Ang II',f:'ATHOS-3',ev:'early',cat:'adj',txt:'MAP response 69.9% vs 23.4%; day-28 mortality 46% vs 54% (P = 0.12, not significant). [[Khanna2017ATHOS3]]'},
 {y:2018,n:'EUPHRATES',f:'Polymyxin B haemoperfusion',g:1,ev:'est',cat:'block',txt:'450 people with high endotoxin activity: 28-day mortality 37.7% vs 34.5%; SSC 2021 suggests against it. [[Dellinger2018EUPHRATES,Evans2021SSC]]'},
 {y:2018.4,n:'IL-7',f:'IL-7 (CYT107), IRIS-7',ev:'early',cat:'immuno',txt:'27 people with lymphopenia: 3- to 4-fold rise in lymphocyte counts without worse inflammation. [[Francois2018IRIS7]]'},
 {y:2019,n:'Phenotypes',f:'Seymour α β γ δ',ev:'early',cat:'endo',txt:'Four phenotypes in 20,189 people; 28-day mortality 5%, 13%, 24% and 40%. [[Seymour2019Phenotypes]]'},
 {y:2019.2,n:'Steroid × SRS',f:'Hydrocortisone by endotype (VANISH, post hoc)',ev:'early',cat:'endo',txt:'Hydrocortisone linked with higher mortality in SRS2 (OR 7.9; interaction P = 0.02), post hoc. [[Antcliffe2019]]'},
 {y:2019.4,n:'Nivolumab',f:'Anti-PD-1, phase 1b',ev:'early',cat:'immuno',txt:'31 people with lymphopenia: no cytokine storm or unexpected safety findings; receptor occupancy above 90% for 28 days or more. [[Hotchkiss2019Nivolumab]]'},
 {y:2019,n:'SCARLET',f:'Recombinant thrombomodulin',g:1,ev:'est',cat:'coag',txt:'800 people with coagulopathy: 28-day mortality 26.8% vs 29.4% (P = .32). [[Vincent2019SCARLET]]'},
 {y:2019.5,n:'CITRIS-ALI',f:'IV vitamin C in sepsis with ARDS',g:1,ev:'est',cat:'adj',txt:'167 people: no difference in modified SOFA change, CRP or thrombomodulin. [[Fowler2019CITRISALI]]'},
 {y:2020,n:'VITAMINS',f:'Vitamin C, hydrocortisone, thiamine',g:1,ev:'est',cat:'adj',txt:'216 people: same vasopressor-free time; 90-day mortality 28.6% vs 24.5%. [[Fujii2020VITAMINS]]'},
 {y:2020.4,n:'Narrow cover?',f:'Rapid tests to tailor empirical antibiotics',ev:'hyp',cat:'dx',txt:'Both too narrow and unnecessarily broad empirical therapy were linked with higher mortality; rapid diagnostics are the hoped-for answer. [[Rhee2020Broad]]'},
 {y:2021,n:'VICTAS',f:'Vitamin C, thiamine, hydrocortisone',g:1,ev:'est',cat:'adj',txt:'501 people: ventilator- and vasopressor-free days 25 vs 26; 30-day mortality 22% vs 24%. [[Sevransky2021VICTAS]]'},
 {y:2021.4,n:'Epic model',f:'Epic Sepsis Model, external validation',g:1,ev:'est',cat:'dx',txt:'AUC 0.63; missed 67% of sepsis while alerting on 18% of patients. [[Wong2021Epic]]'},
 {y:2022,n:'LOVIT',f:'High-dose IV vitamin C',g:1,harm:1,ev:'est',cat:'adj',txt:'872 people on vasopressors: death or persistent organ dysfunction 44.5% vs 38.5% (RR 1.21). [[Lamontagne2022LOVIT]]'},
 {y:2022,n:'TREWS',f:'TREWS machine-learning alert',ev:'early',cat:'dx',txt:'Confirmation within 3 h linked with 3.3% lower absolute in-hospital mortality, non-randomised. [[Henry2022TREWS,Adams2022TREWS]]'},
 {y:2022.4,n:'PROVIDE',f:'Immunotherapy matched to immune state',ev:'early',cat:'immuno',txt:'240 people: SOFA improving by day 7 in 42.9% vs 10.0% with placebo. [[Leventogiannis2022PROVIDE]]'},
 {y:2023,n:'Landiolol',f:'STRESS-L',g:1,harm:1,ev:'early',cat:'adj',txt:'Stopped at 126 of 340 for possible harm: day-90 mortality 43.5% vs 28.6%, not significant. [[Whitehouse2023STRESSL]]'},
 {y:2024,n:'ImmunoScore',f:'Sepsis ImmunoScore',ev:'early',cat:'dx',txt:'Described as the first FDA-authorised AI sepsis tool; external AUC 0.81. [[Bhargava2024]]'},
 {y:2025,n:'ADAPT-Sepsis',f:'Procalcitonin-guided stopping',ev:'est',cat:'dx',txt:'2,760 adults: antibiotics 9.8 vs 10.7 days, with noninferior mortality. [[Dark2025ADAPT]]'},
 {y:2025,n:'Thymosin α1',f:'TESTS trial',g:1,ev:'est',cat:'immuno',txt:'1,089 analysed: 28-day mortality 23.4% vs 24.1% (HR 0.99). [[Wu2025TESTS]]'},
 {y:2026,n:'ImmunoSep',f:'Anakinra or IFN-γ by immune state',ev:'early',cat:'immuno',txt:'SOFA response 35.1% vs 17.9% (P = .002); 28-day mortality not significantly different. [[GiamarellosBourboulis2026ImmunoSep,NCT04990232]]'},
 {y:2026.3,n:'Tigris',f:'Polymyxin B in a narrower endotoxin band',ev:'early',cat:'block',txt:'157 people, open label, Bayesian: 28-day mortality 39% vs 45%, posterior probability of benefit 95.3%. [[Neyra2026Tigris,NCT03901807]]'},
 {y:2026.15,n:'Ulinastatin',f:'Ulinastatin, ADJUST trial',g:1,ev:'est',cat:'block',txt:'335 analysed, double blind: 28-day mortality 23.6% vs 22.9% on placebo (HR 1.03); adverse events 56.8% vs 42.7%. [[Chen2026ADJUST]]'}
];
const FT_STEPS=[
 {y0:1990,y1:2000,k:'1990s',t:'Block the storm',
  txt:`Trials blocked endotoxin, TNF or IL-1 in unselected patients. HA-1A looked positive in one subgroup and then failed in CHESS; an anti-TNF fusion protein increased mortality with dose; IL-1 receptor antagonist did not help overall. [[Ziegler1991HA1A,McCloskey1994CHESS,Fisher1996TNFR,Opal1997IL1ra]] One small 1997 study pointed elsewhere: interferon-γ restored monocyte HLA-DR in immune-exhausted patients. [[Docke1997]]`,
  pt:`Medicines that calmed inflammation in animals did not help people with sepsis, and some caused harm. [[Marshall2014]]`,
  hook:`TNFR:Fc increased mortality dose-dependently (30% → 53%). [[Fisher1996TNFR]]`},
 {y0:2000,y1:2013,k:'2000 to 2012',t:'Approved, then withdrawn',
  txt:`Drotrecogin alfa (Xigris) was approved after PROWESS (24.7% vs 30.8%) and withdrawn in 2011 when PROWESS-SHOCK failed. [[Bernard2001PROWESS,MedLett2011Xigris,Ranieri2012PROWESSSHOCK]] High-dose antithrombin did not help and caused bleeding; a NOS inhibitor raised blood pressure but increased deaths. [[Warren2001KyberSept,Lopez2004NOS]] <span class="ev early">Early evidence</span> GM-CSF guided by mHLA-DR reversed immune markers. [[Meisel2009]]`,
  pt:`One sepsis drug was approved and later withdrawn when a second, larger trial showed no benefit.`,
  hook:`The one sepsis-specific drug approved and withdrawn: drotrecogin alfa. [[Bernard2001PROWESS,Ranieri2012PROWESSSHOCK,MedLett2011Xigris]]`},
 {y0:2013,y1:2019,k:'2013 to 2018',t:'Not one disease',
  txt:`Eritoran and polymyxin B haemoperfusion failed in large trials. [[Opal2013ACCESS,Dellinger2018EUPHRATES]] <span class="ev early">Early evidence</span> Gene-expression endotypes (SRS, MARS) and MALS showed that patients differ in immune state, and anakinra helped, post hoc, the small group with macrophage activation features. [[Davenport2016,Scicluna2017,Kyriazopoulou2017MALS,Shakoory2016]] Rapid molecular tests named organisms in hours, with a mortality benefit only alongside stewardship. [[Banerjee2015rmPCR,Timbrook2017mRDT]]`,
  pt:`Researchers learned that sepsis is not one illness: some people's immune systems are overactive, others are worn out.`,
  hook:`SRS1 = immunosuppressed endotype, higher mortality (HR 2.4). [[Davenport2016]]`},
 {y0:2019,y1:2023,k:'2019 to 2022',t:'Vitamin C, phenotypes and alerts',
  txt:`Four clinical phenotypes had 28-day mortality from 5% to 40%. [[Seymour2019Phenotypes]] Vitamin C trials were neutral, then LOVIT showed harm (RR 1.21), and SSC 2021 suggests against IV vitamin C. [[Fowler2019CITRISALI,Fujii2020VITAMINS,Sevransky2021VICTAS,Lamontagne2022LOVIT,Evans2021SSC]] A proprietary alert missed 67% of sepsis cases, while TREWS was linked with better outcomes in a non-randomised analysis. [[Wong2021Epic,Adams2022TREWS]]`,
  pt:`High-dose vitamin C did not help in large trials, and in one large trial it was linked to worse outcomes. Computer alerts can help staff spot sepsis sooner, but some widely used ones miss many cases. [[Lamontagne2022LOVIT,Wong2021Epic]]`,
  hook:`LOVIT: IV vitamin C increased death or persistent organ dysfunction (RR 1.21). Epic Sepsis Model: external AUC 0.63. [[Lamontagne2022LOVIT,Wong2021Epic]]`},
 {y0:2023,y1:FT_Y1,k:'2023 to 2026',t:'Matching treatment to the patient',
  txt:`<span class="ev early">Early evidence</span> ImmunoSep gave anakinra to people with MALS and interferon-γ to those with immunoparalysis: SOFA response 35.1% vs 17.9%, with no significant difference in 28-day mortality. [[GiamarellosBourboulis2026ImmunoSep]] Tigris revisited endotoxin removal in a narrower group. [[Neyra2026Tigris]] Procalcitonin-guided stopping shortened antibiotics safely in ADAPT-Sepsis. [[Dark2025ADAPT]] Landiolol, thymosin α1 and ulinastatin joined the graveyard. [[Whitehouse2023STRESSL,Wu2025TESTS,Chen2026ADJUST]] No immunostimulant has yet shown a mortality benefit in phase 3. [[GiamarellosBourboulis2026ImmunoSep]]`,
  pt:`Researchers now test treatments matched to each person's immune state. It is promising but not yet proven to save lives. [[GiamarellosBourboulis2026ImmunoSep]]`,
  hook:`MALS: ferritin > 4420 ng/mL; immunoparalysis: HLA-DR < 5000 receptors per monocyte. [[Leventogiannis2022PROVIDE,GiamarellosBourboulis2026ImmunoSep]]`}
].map(s=>Object.assign(s,{from:ftU(s.y0),at:ftU(s.y1-.4)}));

inits.frontier=()=>{
  const svg=$('#ftSvg'),rg=$('#ftT');let setSt=()=>{};const F={ev:'all',cat:'all',g:false};
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const match=P=>(F.ev==='all'||P.ev===F.ev)&&(F.cat==='all'||P.cat===F.cat)&&(!F.g||P.g);
  const flask=(x,y,P)=>`<path d="M${f1(x-3)} ${f1(y-8)}h6M${f1(x-2)} ${f1(y-8)}v5l-5 8h14l-5-8v-5" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-linejoin:round"/><path d="M${f1(x-5.4)} ${f1(y+2.5)}h10.8l-2.2-3.5h-6.4z" style="fill:${FT_EV[P.ev][2]}"/>`;
  const stone=(x,y,P)=>`<path d="M${f1(x-6)} ${f1(y+6)}V${f1(y-3)}a6 6 0 0 1 12 0V${f1(y+6)}z" style="fill:var(--panel-2);stroke:${P.harm?'var(--bad)':'var(--muted)'};stroke-width:${P.harm?1.8:1.2}"/><circle cx="${f1(x)}" cy="${f1(y-1)}" r="2.4" style="fill:${FT_EV[P.ev][2]}"/>`;
  /* layout: greedy levels so labels do not overlap (wide: rows above/below the axis; narrow: two columns each side) */
  let LAY=null,LAYN=null;
  function layout(nr){const X=yr=>30+660*ftU(yr),Yn=yr=>58+640*ftU(yr);const out=[];
    if(!nr){const lev={0:[],1:[]};[...FT_P].sort((a,b)=>a.y-b.y).forEach(P=>{const side=P.g?1:0,x=X(P.y),w=P.n.length*5.8+16,fl=x+w>712,a0=fl?x-w:x-7,b0=fl?x+7:x+w;let L=0;
        while((lev[side][L]||[]).some(([a,b])=>a0<b+4&&b0>a-4))L++;(lev[side][L]=lev[side][L]||[]).push([a0,b0]);
        out.push({P,x,fl,y:side?294+L*21:246-L*21})})}
    else{const last={0:[-99,-99],1:[-99,-99]};[...FT_P].sort((a,b)=>a.y-b.y).forEach(P=>{const side=P.g?1:0,yy=Yn(P.y),L=last[side];
        let c=L[0]<=L[1]?0:1;if(yy>=L[0]+15)c=0;else if(yy>=L[1]+15)c=1;const y=Math.max(yy,L[c]+15);L[c]=y;
        const x=side?190-c*94:212+c*94;out.push({P,x,y,ty:yy,side,c})})}
    return out}
  function draw(t){
    const nr=vb(svg,'720 440','400 780'),yr=ftYr(t),ph=phaseOf(FT_STEPS,t),S=FT_STEPS[ph];let s='';
    const L=nr?(LAYN=LAYN||layout(1)):(LAY=LAY||layout(0));
    s+=T(nr?14:20,24,`${S.k} · ${S.t}`,'t-big');
    if(!nr){const X=v=>30+660*ftU(v),ay=270;
      FT_STEPS.forEach((st,i)=>{s+=`<rect x="${f1(X(st.y0))}" y="40" width="${f1(X(st.y1)-X(st.y0))}" height="390" style="fill:${i===ph?'var(--rec-soft)':'transparent'};opacity:.5"/>`});
      s+=T(20,48,'LAB BENCH · a signal worth testing','t-xs','fill:var(--rec);font-weight:700;letter-spacing:.08em')+T(20,432,'GRAVEYARD · did not help or harmed','t-xs','fill:var(--muted);font-weight:700;letter-spacing:.08em');
      s+=`<line x1="30" x2="690" y1="${ay}" y2="${ay}" class="axis"/>`;
      for(const v of [1990,1995,2000,2005,2010,2014,2016,2018,2020,2022,2024,2026])s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ay-4}" y2="${ay+4}" class="axis"/>`+T(X(v),ay+15,v,'t-xs t-mid');
      s+=`<line x1="${f1(X(yr))}" x2="${f1(X(yr))}" y1="52" y2="420" style="stroke:var(--rec);stroke-width:1.6;stroke-dasharray:4 3"/>`+T(X(yr),62,Math.floor(yr),'t-xs t-mid','fill:var(--rec);font-weight:700');
      s+=`<path d="M${f1(X(FT_YB)-5)} ${ay+5}l4 -10M${f1(X(FT_YB))} ${ay+5}l4 -10" style="stroke:var(--muted);stroke-width:1.2"/>`+T(X(FT_YB),ay-9,'scale changes','t-xs t-mid','font-size:8px');
      L.forEach(({P,x,y,fl})=>{const a=ramp(yr,P.y,P.y+.8);if(a<=0)return;const cur=P.y>=S.y0&&P.y<S.y1,op=(match(P)?(cur?1:.6):.12)*a;
        s+=`<g style="opacity:${f1(op)}"><line x1="${f1(x)}" x2="${f1(x)}" y1="${P.g?ay+3:ay-3}" y2="${f1(P.g?y-8:y+8)}" style="stroke:var(--line);stroke-width:.8"/>${P.g?stone(x,y,P):flask(x,y,P)}${T(fl?x-9:x+9,y+3.5,P.n,'t-xs'+(fl?' t-end':''),`fill:var(--ink)${cur?';font-weight:700':''}`)}</g>`})}
    else{const Y=v=>58+640*ftU(v),ax=200;
      FT_STEPS.forEach((st,i)=>{if(i===ph)s+=`<rect x="0" y="${f1(Y(st.y0))}" width="400" height="${f1(Y(st.y1)-Y(st.y0))}" style="fill:var(--rec-soft);opacity:.5"/>`});
      s+=T(212,48,'LAB BENCH','t-xs','fill:var(--rec);font-weight:700')+T(188,48,'GRAVEYARD','t-xs t-end','fill:var(--muted);font-weight:700');
      s+=`<line x1="${ax}" x2="${ax}" y1="56" y2="${f1(Y(FT_Y1))}" class="axis"/>`;
      for(const v of [1990,1995,2000,2005,2010,2014,2016,2018,2020,2022,2024,2026])s+=`<rect x="${ax-13}" y="${f1(Y(v)-6)}" width="26" height="11" rx="3" style="fill:var(--panel)"/>`+T(ax,Y(v)+3,v,'t-xs t-mid','fill:var(--muted);font-size:8.5px');
      s+=`<line x1="8" x2="392" y1="${f1(Y(yr))}" y2="${f1(Y(yr))}" style="stroke:var(--rec);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      L.forEach(({P,x,y,ty,side,c})=>{const a=ramp(yr,P.y,P.y+.8);if(a<=0)return;const cur=P.y>=S.y0&&P.y<S.y1,op=(match(P)?(cur?1:.6):.12)*a;
        const ix=side?x-8:x+8;
        s+=`<g style="opacity:${f1(op)}"><path d="M${ax} ${f1(ty)}L${f1(ix)} ${f1(y)}" style="stroke:var(--line);stroke-width:.7;fill:none"/>${P.g?stone(ix,y,P):flask(ix,y,P)}${T(side?ix-9:ix+9,y+3.5,P.n,'t-xs'+(side?' t-end':''),`font-size:9px;fill:var(--ink)${cur?';font-weight:700':''}`)}</g>`})}
    svg.innerHTML=s;setSt(ph);$('#ftNote').innerHTML=noteHTML(S)}
  const stop=playWire(rg,$('#ftPlay'),draw,30000,'Replay','frontier');
  setSt=stepWire($('#ftSteps'),FT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- filterable list (also dims the timeline) ---------- */
  const cat=$('#ftCat'),gc=$('#ftSide');
  function list(){const L=FT_P.filter(match).sort((a,b)=>a.y-b.y);
    $('#ftCount').textContent=`${L.length} of ${FT_P.length} approaches`;
    $('#ftList').innerHTML=L.length?L.map(P=>`<div class="card"><div class="meta"><span class="ev ${FT_EV[P.ev][1]}">${FT_EV[P.ev][0]}</span>${P.g?`<span class="tag ${P.harm?'bad':''}">${P.harm?'Harm signal':'Did not help'}</span>`:'<span class="tag rec">On the bench</span>'}</div><h4>${P.f}</h4><p class="st">${Math.floor(P.y)} · ${FT_CAT[P.cat]}</p><p>${P.txt}</p></div>`).join('')
      :`<div class="card"><h4>Nothing matches</h4><p>Try another evidence label or area.</p></div>`;
    draw(+rg.value)}
  $$('[data-ftev]').forEach(b=>b.addEventListener('click',()=>{F.ev=b.dataset.ftev;$$('[data-ftev]').forEach(x=>x.setAttribute('aria-pressed',x===b));list()}));
  cat.addEventListener('change',()=>{F.cat=cat.value;list()});gc.addEventListener('change',()=>{F.g=gc.checked;list()});
  list();
};
