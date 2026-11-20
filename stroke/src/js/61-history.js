/* =============== 6.1 History & people =============== */
/* A scrubbable timeline on a stretched axis, one drawn scene per milestone, chips to jump, and a dumbbell chart of the thrombectomy
   trials. People and dates are as research pass A states them; the 2025-26 items come from passes E, H and I. */
const HS_EV=[
 {y:-500,yt:'Antiquity',c:'Greek physicians: apoplexia',sc:'word',w:'apoplexia',ws:'struck down with violence',who:'Hippocratic Corpus, Galen',l:['A word for a sudden collapse,','known at least 2500 years ago.'],
  t:'Antiquity · Struck down',txt:`"Apoplexia" means struck down with violence, a picture known to Greek physicians at least 2500 years ago. Its first recorded appearance is in the Hippocratic Corpus: "It is impossible to remove a strong attack of apoplexy, and not easy to remove a weak attack". Galen called it "a privation of sense and motion in all the nerves" [[Engelhardt2017]]. Understanding rested on Galen and humoral pathology for centuries [[Yilmaz2025]].`,
  pt:`For centuries people called stroke "apoplexy", meaning struck down [[Engelhardt2017]].`,hook:`Apoplexy was an umbrella term, covering non-vascular and even non-cerebral events such as myocardial infarction and pulmonary embolism [[Engelhardt2017]].`},
 {y:1658,c:'Wepfer separates bleeding',sc:'wepfer',who:'Johann Jakob Wepfer',l:['Bleeding inside the skull is told','apart for the first time.'],
  t:'1658 · Wepfer finds the blood',txt:`Wepfer distinguished non-traumatic intracranial bleeding, including subarachnoid and cerebral haemorrhage, splitting the unitary concept for the first time [[Engelhardt2017]]. He is credited with showing apoplexy results from brain haemorrhage or vessel occlusion, but a re-reading shows his thinking stayed rooted in Galenic theory and iatrochemistry [[Karenberg1998]].`},
 {y:1664,c:'Willis: Cerebri anatome',sc:'willis',who:'Thomas Willis',l:['The arterial circle gets its','meaning, and its name.'],
  t:'1664 · The circle of Willis',txt:`Willis published <i>Cerebri anatome</i> in London. He explained the pathological and functional meaning of the circular arterial anastomosis named after him, and coined "neurologie". The source marks the 350th anniversary in 2014, which gives 1664 [[ArraezAybar2015]].`},
 {y:1689,c:'Cole writes "stroke"',sc:'word',w:'stroke',ws:'for apoplexy, in English',who:'William Cole',l:['The English word enters','medical writing.'],
  t:'1689 · The word stroke',txt:`William Cole first used "stroke" for apoplexy in English medical writing in 1689 [[Engelhardt2017]].`},
 {y:1761,c:'Morgagni: three apoplexies',sc:'three',who:'Morgagni',l:['Apoplexy is sorted by what','is found after death.'],
  t:'1761 · Three kinds',txt:`Morgagni separated "sanguineous", "serous" and "neither" apoplexy [[Engelhardt2017]].`},
 {y:1814,c:'Rochoux, Rostan: bleed or softening',sc:'two',who:'Rochoux (1814), Rostan (1819)',l:['Haemorrhage and softening:','the division still in use.'],
  t:'1814 and 1819 · Bleed or softening',txt:`Rochoux (1814) and Rostan (1819) defined haemorrhagic apoplexy and brain softening, the basic haemorrhagic and ischaemic division still used [[Engelhardt2017]].`,hook:`The blocked-or-burst split is about two centuries old [[Engelhardt2017]].`},
 {y:1838,c:'Dechambre: "lacune"',sc:'lacune',who:'Dechambre',l:['A word for small holes,','long before Fisher.'],
  t:'1838 · Lacune',txt:`Dechambre introduced the word "lacune" in 1838, well before Fisher [[Engelhardt2017]].`},
 {y:1852,c:'Virchow: thrombosis, embolism',sc:'virchow',who:'Rudolf Virchow',l:['A clot forms in place, or','travels and lodges.'],
  t:'1852 · Thrombosis and embolism',txt:`Rudolf Virchow created the terms "thrombosis" and "embolism" and described embolic "apoplexia ischaemica" [[Engelhardt2017,Bagot2008]]. Review of the historical literature casts doubt on a triad described by Virchow in its usual form; he was routinely credited with it only 100 years after his work [[Bagot2008]].`},
 {y:1872,c:'Cohnheim: "infarct"',sc:'infarct',who:'Cohnheim',l:['Dead tissue beyond an','obstructed end artery.'],
  t:'1872 · Infarct',txt:`Cohnheim introduced "infarct" after embolic obstruction of end arteries [[Engelhardt2017]].`},
 {y:1927,c:'Moniz: first angiogram',sc:'moniz',who:'Egas Moniz',yt:'1927',l:['28 June 1927: arteries are','seen in a living person.'],
  t:'1927 · The first angiogram',txt:`Egas Moniz showed the first cerebral angiogram on 28 June 1927, of a pituitary tumour in a young man, and presented it in Paris on 7 July 1927. His 1949 Nobel Prize was for prefrontal leucotomy, now unacceptable, not for angiography [[Artico2017]]. He described the first carotid occlusion in 1936 [[Oliveira2018]].`,hook:`Moniz's Nobel was for leucotomy, not angiography [[Artico2017]].`},
 {y:1938,c:'"Apoplexy" leaves the death lists',sc:'strike',who:'International death lists',l:['Apoplexy leaves the lists at the','5th revision; stroke joins in ICD-9.'],
  t:'1938 · Apoplexy retires',txt:`"Apoplexy" left the international death lists from the 5th revision (1938). "Stroke" appeared in ICD-9 [[Engelhardt2017]].`},
 {y:1951,c:'Fisher: carotid occlusion',sc:'carotid',who:'Miller Fisher',l:['Carotid occlusion is described','thoroughly in English.'],
  t:'1951 · The neck artery',txt:`Carotid occlusions were thoroughly described in English only with Miller Fisher's 1951 paper [[Oliveira2018,Fisher1951]]. No abstract is indexed for the paper; this comes from the historical review.`},
 {y:1965,c:'Fisher: lacunes',sc:'lacune',who:'Fisher',l:['Small deep infarcts, linked to','penetrating artery disease.'],
  t:'1965 · Lacunes explained',txt:`Fisher's 1965 paper described lacunes as small deep cerebral infarcts [[Fisher1965]]. Through serial sections at necropsy he linked them to penetrating artery disease, naming lipohyalinosis and fibrinoid degeneration; a 1968 Fisher paper is the cited source for these terms [[Caplan2015]].`},
 {y:1971,c:'First CT of a live patient',sc:'ct',who:'Ambrose, Hounsfield',l:['1 October 1971, Atkinson Morley','Hospital. The brain can be seen.'],
  t:'1971 · The first CT',txt:`The first CT scan of a live patient was on 1 October 1971 at Atkinson Morley Hospital, under James Ambrose, in a woman with a suspected frontal tumour, later a cystic astrocytoma. Godfrey Hounsfield of EMI built the system, and Allan Cormack, with earlier reconstruction work, shared the Nobel Prize with him [[Schulz2021]]. One review says CT entered clinical practice in 1975 [[Artico2017]]. Also from 1971: the WHO's stroke registers and first definition [[Hatano1976,Engelhardt2017]].`},
 {y:1975,c:'Penumbra experiments',sc:'penumbra',who:'Lindsay Symon, Jens Astrup',l:['Two flow thresholds in baboon','cortex, and a word for the gap.'],
  t:'1975 · The penumbra',txt:`The penumbra was discovered in four experiments in September 1975, in Lindsay Symon's London laboratory, where Symon first said the word [[Astrup2025]]. Astrup 1977, baboon cortex: electrical failure below about 15 ml/100 g per minute (about 35% of control), and massive potassium release at a lower flow, median 6 [[Astrup1977]]. The perfusion range between the two is the penumbra [[Heiss2011]].`,
  pt:`Some brain tissue stops working before it dies. If blood comes back in time, it can recover [[Heiss2011]].`},
 {y:1981,c:'"Ischemic penumbra" in print',sc:'penumbra2',who:'Astrup, Siesjö, Symon',l:['The term is set out: tissue','that may still be saved.'],
  t:'1981 · The term in print',txt:`The term was set out in Astrup, Siesjö and Symon, 1981 [[Astrup1981]]. Flow restored above the functional threshold can reverse deficits without permanent damage, and the lower the flow, the shorter the time for useful reperfusion [[Heiss2011]].`},
 {y:1993,c:'Stroke units save lives',sc:'unit',who:'Langhorne and colleagues',l:['10 trials overturn the view that','units do not affect mortality.'],
  t:'1993 · Do stroke units save lives?',txt:`Langhorne 1993 (10 trials, 1586 patients): odds of death within 4 months 0.72 (0.56-0.92), a 28% reduction. This overturned the view that units did not affect mortality [[Langhorne1993]]. Cochrane 2020 (29 trials, 5902 people): death OR 0.76 (0.66-0.88) at a median of 1 year, not dependent on age, sex, severity or stroke type [[Langhorne2020]].`},
 {y:1995,c:'NINDS: t-PA within 3 hours',sc:'lysis',who:'NINDS rt-PA Stroke Study Group',l:['624 patients, global OR 1.7.','Dissolving the clot can work.'],
  t:'1995 · NINDS',txt:`The development of thrombolysis is traced to the 1930s [[Yilmaz2025]], and early trials were held back by high rates of ICH [[NINDS1995]]. NINDS 1995 (624 patients, t-PA within 3 hours): global OR for favourable outcome 1.7 (1.2-2.6). Symptomatic ICH 6.4% against 0.6%; mortality at 3 months 17% against 21% (P=0.30) [[NINDS1995]]. ECASS the same year (1.1 mg/kg, within 6 hours) showed no difference in its primary end points by intention to treat [[Hacke1995]].`,hook:`NINDS: symptomatic ICH 6.4% against 0.6%, no mortality penalty at 3 months [[NINDS1995]].`},
 {y:2006,c:'Time is brain, quantified',sc:'time',who:'Jeffrey Saver',l:['What each minute costs, in a','typical large vessel stroke.'],
  t:'2006 · Time is brain',txt:`"Time is brain" quantified: a typical large vessel stroke loses 1.9 million neurons, 14 billion synapses and 12 km of myelinated fibres each minute [[Saver2006]].`},
 {y:2008,c:'ECASS III: to 4.5 hours',sc:'lysis',who:'Hacke and colleagues',l:['821 patients, 3 to 4.5 hours.','The window widens.'],
  t:'2008 · ECASS III',txt:`ECASS III (821 patients, 0.9 mg/kg, 3 to 4.5 hours): favourable outcome 52.4% against 45.2% (OR 1.34, 1.02-1.76), symptomatic ICH 2.4% against 0.2% [[Hacke2008]]. A meta-analysis of 6756 patients later found the odds ratio falling with delay: 1.75 within 3 hours, 1.26 at 3 to 4.5 hours, 1.15 (0.95-1.40) beyond [[Emberson2014]].`},
 {y:2013,c:'Three neutral trials; a new definition',sc:'neutral',who:'IMS III, SYNTHESIS, MR RESCUE',l:['Three NEJM trials, no benefit.','Thrombectomy looks finished.'],
  t:'2013 · Three neutral trials',txt:`In 2013 three NEJM trials were neutral: IMS III (656 patients; 40.8% against 38.7%, stopped for futility) [[Broderick2013]], SYNTHESIS (362 patients; 30.4% against 34.8%) [[Ciccone2013]] and MR RESCUE (118 patients; mRS 3.9 against 3.9) [[Kidwell2013]]. The same year the AHA/ASA combined clinical and tissue criteria in a new definition of stroke [[Sacco2013]].`},
 {y:2015,c:'MR CLEAN and the wave',sc:'stent',who:'Berkhemer, Goyal, Campbell, Saver, Jovin',l:['Five trials, one answer: pulling','the clot out works.'],
  t:'2015 · The thrombectomy wave',txt:`MR CLEAN (500 patients, proximal anterior occlusion, within 6 hours): adjusted common OR 1.67 (1.21-2.30); functional independence 32.6% against 19.1%; retrievable stents in 81.5% of the intervention group [[Berkhemer2015]]. ESCAPE, EXTEND IA, SWIFT PRIME and REVASCAT followed [[Goyal2015,Campbell2015,Saver2015,Jovin2015]].`,hook:`MR CLEAN absolute difference in independence: 13.5 percentage points [[Berkhemer2015]].`},
 {y:2016,c:'HERMES pools the five',sc:'hermes',who:'Goyal and colleagues',l:['1287 patients pooled. Benefit','with no heterogeneity by subgroup.'],
  t:'2016 · HERMES',txt:`HERMES pooled the five (1287 patients): adjusted common OR 2.49 (1.76-3.53), number needed to treat 2.6 to reduce disability by at least one mRS level. No heterogeneity across subgroups, including age 80 or over [[Goyal2016]].`,hook:`HERMES number needed to treat: 2.6 [[Goyal2016]].`},
 {y:2018,c:'DAWN and DEFUSE 3',sc:'late',who:'Nogueira, Albers',l:['Up to 24 hours, if the tissue','can still be saved.'],
  t:'2018 · From clock to tissue',txt:`DAWN (206 patients, 6 to 24 hours, clinical-core mismatch): functional independence 49% against 13% [[Nogueira2018]]. DEFUSE 3 (182 patients, 6 to 16 hours, perfusion selection): 45% against 17%, mortality 14% against 26% (P=0.05) [[Albers2018]]. These moved selection from clock time toward tissue, the clinical use of the penumbra idea [[Yilmaz2025,Heiss2011]].`},
 {y:2025,c:'Tenecteplase approved in the US',sc:'lysis',who:'FDA, as reported by Genentech',l:['4 March 2025, for acute ischaemic','stroke in adults, resting on AcT.'],
  t:'2025 · Tenecteplase',txt:`FDA approval of TNKase for acute ischaemic stroke in adults was reported on 4 March 2025, resting on AcT [[Genentech2025,FDA-TNKase]]. In 2025 the medium-vessel trials ESCAPE-MeVO and DISTAL showed no gain from thrombectomy [[Goyal2025,Psychogios2025]]. Astrup marked 50 years of the penumbra [[Astrup2025]].`},
 {y:2026,c:'New AHA/ASA guidelines',sc:'guide',who:'Prabhakaran; Richards; and colleagues',l:['Two guidelines replace their','predecessors in one year.'],
  t:'2026 · New guidelines',txt:`The 2026 AHA/ASA early-management guideline replaces the 2018 guideline and 2019 update [[Prabhakaran2026,Powers2019]]; a correction has been issued [[Prabhakaran2026Correction]]. The 2026 rehabilitation guideline replaces the 2016 one [[Richards2026,Winstein2016]]. LATE-MT tested thrombectomy at 24 to 72 hours <span class="ev early">Early evidence</span> [[Yang2026]], and OCEANIC-STROKE a factor XIa inhibitor for prevention [[Sharma2026]].`,
  pt:`Doctors once saw stroke as something they could do little about. Clot-busting drugs, stroke units and clot-removal procedures changed that [[NINDS1995,Langhorne2020,Goyal2016]].`}];
/* the stretched axis: year to 0..1 */
const HS_AX=[ [-600,0],[1600,.05],[1700,.17],[1900,.36],[1950,.46],[2000,.68],[2010,.76],[2020,.93],[2027,1] ];
function hsX(y){for(let i=1;i<HS_AX.length;i++){if(y<=HS_AX[i][0]){const a=HS_AX[i-1],b=HS_AX[i];return lerp(a[1],b[1],(y-a[0])/(b[0]-a[0]))}}return 1}
/* where a jump lands: most of the way through a milestone, so its drawing has finished building */
function hsLand(i){const a=hsX(HS_EV[i].y),b=HS_EV[i+1]?hsX(HS_EV[i+1].y):1;return a+(b-a)*.7}
const HS_ERAS=[{a:-600,b:1600,s:'',l:'Apoplexy'},{a:1600,b:1700,s:'17th',l:'17th c.'},{a:1700,b:1900,s:'18-19th',l:'18th-19th c.'},{a:1900,b:1950,s:'1900s',l:'1900-50'},{a:1950,b:2000,s:'1950-99',l:'1950-99'},{a:2000,b:2027,s:'2000s',l:'Since 2000'}];
const HS_STEPS=[{y:-500,t:'Apoplexy'},{y:1658,t:'Wepfer, Willis'},{y:1761,t:'Softening, thrombosis'},{y:1927,t:'Seeing the brain'},{y:1975,t:'The penumbra'},{y:1993,t:'Units and lysis'},{y:2013,t:'Thrombectomy'},{y:2025,t:'2025 and 2026'}].map(s=>({...s,from:hsX(s.y),at:hsLand(HS_EV.findIndex(e=>e.y===s.y))}));
HS_STEPS[0].from=0;
/* thrombectomy trials: control, thrombectomy */
const HS_TR=[
 {g:'13',n:'IMS III',d:'656 patients',c:38.7,x:40.8},{g:'13',n:'SYNTHESIS',d:'362 patients',c:34.8,x:30.4},
 {g:'15',n:'MR CLEAN',d:'500 patients',c:19.1,x:32.6},{g:'15',n:'ESCAPE',d:'316 patients',c:29.3,x:53},{g:'15',n:'EXTEND IA',d:'70 patients',c:40,x:71},{g:'15',n:'SWIFT PRIME',d:'196 patients',c:35,x:60},{g:'15',n:'REVASCAT',d:'206 patients',c:28.2,x:43.7},
 {g:'18',n:'DAWN',d:'206 patients',c:13,x:49},{g:'18',n:'DEFUSE 3',d:'182 patients',c:17,x:45}];
const HS_TRG=[['all','All'],['13','2013: neutral'],['15','2015: the wave'],['18','2018: late window']];
const HS_TRC={all:`Each row shows the main outcome as reported. For the 2015 and 2018 trials that is functional independence [[Berkhemer2015,Goyal2015,Campbell2015,Saver2015,Jovin2015,Nogueira2018,Albers2018]]. For the 2013 trials it is the percentage each paper reports [[Broderick2013,Ciccone2013]], so compare within a row. MR RESCUE (118 patients) reported a mean mRS of 3.9 in both arms and is not plotted [[Kidwell2013]].`,
 13:`IMS III was stopped for futility [[Broderick2013]]. In SYNTHESIS the endovascular figure was lower than the comparison [[Ciccone2013]]. MR RESCUE (118 patients) reported a mean mRS of 3.9 in both arms and is not plotted [[Kidwell2013]].`,
 15:`Functional independence. MR CLEAN used retrievable stents in 81.5% of its intervention group [[Berkhemer2015]]. ESCAPE also found mortality 10.4% against 19.0% [[Goyal2015]]. EXTEND IA [[Campbell2015]], SWIFT PRIME [[Saver2015]], REVASCAT [[Jovin2015]].`,
 18:`Functional independence, late window. DAWN: 6 to 24 hours, clinical-core mismatch [[Nogueira2018]]. DEFUSE 3: 6 to 16 hours, perfusion selection, mortality 14% against 26% (P=0.05) [[Albers2018]].`};
function hsTx(x,y,s,cls='t-xs',st=''){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`}
const HS_INK='fill:var(--ink);font-weight:600';
/* a scene for one milestone, drawn in box B; u = progress through the milestone, ph = moving phase */
function hsScene(E,B,u,ph,N){const cx=B.x+B.w/2,cy=B.y+B.h/2,fit=(w,h)=>Math.min(B.w/w,B.h/h),ue=ease(clamp(u*1.4));
  const brain=o=>{const s=fit(300,250);return brainSide(cx-150*s,cy-125*s,s,o)};
  const ax=(o,k=1)=>{const s=fit(240,300)*k;return brainAxial(cx-120*s,cy-150*s,s,o)};
  switch(E.sc){
   case'word':{let s=brain({dim:.75}).svg;
     s+=`<text x="${f1(cx)}" y="${f1(cy+4)}" class="t-mid" style="font:italic 700 ${N?36:42}px var(--display);fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:5px;stroke-linejoin:round">${E.w}</text>`;
     s+=kitLabel(cx,cy+28,E.ws,{a:'m'});return s}
   case'wepfer':{const A=ax({side:'L',bleed:{r:lerp(8,30,ue),oedema:ue*.5},sah:ue*.7,orient:true},.95);let s=A.svg;if(A.at.bleed)s+=kitLabel(A.at.bleed[0],A.at.bleed[1]+4,'cerebral',{a:'m'});s+=kitLabel(cx,B.y+B.h-1,'blood in tissue and over the surface',{a:'m'});return s}
   case'willis':{const k=fit(300,262)*.98;return willis(cx-150*k,cy-131*k,k,{flow:1,ph,labels:!N}).svg}
   case'three':{const R=[['sanguineous','bloody'],['serous','watery'],['neither','no fluid found']];const h=(B.h-24)/3;let s='';R.forEach((r,i)=>{const a=clamp(u*4-i*.8),y=B.y+i*(h+12);
       s+=`<g style="opacity:${f1(a)}"><rect x="${f1(B.x+10)}" y="${f1(y)}" width="${f1(B.w-20)}" height="${f1(h)}" rx="10" style="fill:var(--panel-2)"/>${hsTx(cx,y+h/2+1,r[0],'t-mid','font:italic 700 24px var(--display);fill:var(--ink)')}${hsTx(cx,y+h/2+20,i<2?r[1]:'neither of the two','t-sm t-mid')}</g>`});return s}
   case'two':{const k=fit(500,300)*.96,sa=k;let s=brainAxial(B.x,cy-150*sa,sa,{side:'L',bleed:{r:lerp(8,32,ue),oedema:ue*.4}}).svg;
     s+=brainAxial(B.x+B.w-240*sa,cy-150*sa,sa,{side:'L',core:ue*.7}).svg;
     s+=kitLabel(B.x+120*sa,cy+150*sa+14,'haemorrhagic apoplexy',{a:'m'})+kitLabel(B.x+B.w-120*sa,cy+150*sa+14,'softening',{a:'m'});return s}
   case'lacune':{const A=ax({},.98);let s=A.svg;const pts=[A.at.lentiform,A.at.capsule,A.at.thalamus,A.at.caudate];pts.forEach((p,i)=>{if(!p)return;const a=clamp(u*5-i),o=(i%2?-1:1)*3;s+=`<circle cx="${f1(p[0]+o)}" cy="${f1(p[1]+o)}" r="4" style="fill:var(--core);stroke:var(--panel);stroke-width:1;opacity:${f1(a)}"/>`});
     s+=kitLabel(cx,B.y+B.h-1,'small deep infarcts (dark dots)',{a:'m'});return s}
   case'virchow':{const h=N?46:54,y=cy-50,cl=ue;let s=artery(B.x+4,y,B.w-8,{h,flow:1-cl,ph,clot:cl,at:.56}).svg;
     s+=kitLabel(B.x+B.w*.56,y-10,'thrombosis: a clot forms in place',{a:'m'});
     const y2=cy+50,u2=ease(ramp(u,.25,.9));s+=artery(B.x+4,y2,B.w-8,{h,flow:1,ph}).svg+clot(lerp(B.x+30,B.x+B.w-40,u2),y2+h/2,h*.7,{}) ;
     s+=kitLabel(cx,y2+h+18,'embolism: a clot travels',{a:'m'});return s}
   case'infarct':{return brain({vessels:{occl:'sup',flow:.8,ph},lesion:{core:lerp(6,30,ue),penumbra:lerp(10,34,ue)},lobes:false}).svg}
   case'moniz':{let s=brain({vessels:{flow:ue,ph},dim:.4}).svg;s+=kitLabel(cx,B.y+B.h-1,'contrast shows the arteries',{a:'m'});return s}
   case'strike':{let s=`<text x="${f1(cx)}" y="${f1(cy-16)}" class="t-mid" style="font:italic 700 40px var(--display);fill:var(--muted)">apoplexy</text>`;const w=ue*(N?150:172);
     s+=`<line x1="${f1(cx-86)}" x2="${f1(cx-86+w)}" y1="${f1(cy-28)}" y2="${f1(cy-28)}" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/>`;
     s+=`<text x="${f1(cx)}" y="${f1(cy+46)}" class="t-mid" style="font:italic 700 40px var(--display);fill:var(--ink);opacity:${f1(ramp(u,.4,.8))}">stroke</text>`;return s}
   case'carotid':{const k=fit(170,250)*.98;return carotidBif(cx-85*k,cy-125*k,k,{stenosis:lerp(.1,.9,ue),flow:1-ue*.6,ph,labels:!N}).svg}
   case'ct':{return ax({mode:'ct',orient:true},1).svg}
   case'penumbra':{const bx=B.x+6,bw=B.w-12,by=cy-20,h=26,mx=40,X=v=>bx+bw*v/mx;let s=hsTx(bx,by-44,'Blood flow, ml/100 g per minute (baboon cortex)','t-xs','fill:var(--ink)');
     s+=`<rect x="${f1(X(0))}" y="${by}" width="${f1(X(6)-X(0))}" height="${h}" style="fill:var(--core)"/><rect x="${f1(X(6))}" y="${by}" width="${f1(X(15)-X(6))}" height="${h}" style="fill:var(--penumbra)"/><rect x="${f1(X(15))}" y="${by}" width="${f1(X(40)-X(15))}" height="${h}" style="fill:var(--salvage)"/>`;
     s+=hsTx(X(6),by+h+16,'6','t-sm t-mid','fill:var(--ink);font-weight:700')+hsTx(X(15),by+h+16,'about 15','t-sm t-mid','fill:var(--ink);font-weight:700');
     s+=hsTx(bx,by-9,'K⁺ released','t-xs')+hsTx(X(10.5),by+h+36,'penumbra','t-sm t-mid','fill:var(--ink);font-weight:700')+hsTx(X(30),by-9,'cortex working','t-xs t-mid');
     const m=X(lerp(38,3,ue));s+=`<path d="M${f1(m-6)} ${by-3}h12l-6 7z" style="fill:var(--ink)"/>`;return s}
   case'penumbra2':{const A=ax({side:'L',core:.35,penumbra:.8,saved:0,labels:false},1);let s=A.svg;if(A.at.core)s+=kitLabel(A.at.core[0],A.at.core[1]+4,'core',{a:'m'});s+=kitLabel(cx,B.y+B.h-1,'amber rim: the penumbra',{a:'m'});return s}
   case'unit':{let s=hsTx(cx,cy-40,'28%','t-mid',`font:700 ${N?60:72}px var(--display);fill:var(--rec)`);s+=hsTx(cx,cy-8,'lower odds of death within 4 months','t-sm t-mid','fill:var(--ink)')+hsTx(cx,cy+10,'10 trials, 1586 patients','t-xs t-mid');
     const n=10,sz=N?19:22;for(let i=0;i<n;i++){const x=cx-(n*sz)/2+i*sz+sz/2,on=clamp(u*n*1.3-i);s+=`<rect x="${f1(x-sz*.4)}" y="${f1(cy+34)}" width="${f1(sz*.8)}" height="${f1(sz*.55)}" rx="3" style="fill:var(--rec);opacity:${f1(.2+.8*on)}"/>`}
     s+=hsTx(cx,cy+64+sz*.2,'one bar per trial','t-xs t-mid');return s}
   case'lysis':{const h=N?50:60;const A=artery(B.x+4,cy-h/2,B.w-8,{h,flow:ease(ramp(u,.3,1))*.9+.05,ph,clot:1,at:.56,lysis:ue});let s=A.svg;s+=kitLabel(cx,cy+h/2+22,ue<.5?'a clot blocks the artery':'the drug breaks the clot down',{a:'m'});return s}
   case'time':{const sz=N?44:52;let s=clock(B.x+sz+6,cy,sz,lerp(0,60,clamp(u)),{full:60,col:'var(--accent)'});const x=B.x+2*sz+22;
     const R=[['1.9 million','neurons'],['14 billion','synapses'],['12 km','myelinated fibres']];R.forEach((r,i)=>{const y=cy-48+i*44;s+=hsTx(x,y+6,r[0],'t-big')+hsTx(x,y+22,r[1],'t-xs')});
     s+=hsTx(cx,cy+sz+36,'lost per minute (schematic clock)','t-xs t-mid');return s}
   case'neutral':{const R=[['IMS III','40.8% against 38.7%'],['SYNTHESIS','30.4% against 34.8%'],['MR RESCUE','mRS 3.9 against 3.9']];const h=(B.h-24)/3;let s='';R.forEach((r,i)=>{const y=B.y+i*(h+12),a=clamp(u*4-i*.8);
       s+=`<g style="opacity:${f1(a)}"><rect x="${f1(B.x+6)}" y="${f1(y)}" width="${f1(B.w-12)}" height="${f1(h)}" rx="10" style="fill:var(--panel-2)"/>${hsTx(B.x+20,y+h/2-2,r[0],'t-lbl')}${hsTx(B.x+20,y+h/2+16,r[1],'t-sm')}</g>`});return s}
   case'stent':{const h=N?56:66;return catheterStent(B.x+4,cy-h/2,B.w-8,{h,deploy:ramp(u,0,.5),retract:ramp(u,.5,1),ph,labels:!N}).svg+kitLabel(cx,cy+h/2+24,u<.5?'the stent opens through the clot':'the clot comes back with it',{a:'m'})}
   case'hermes':{let s=hsTx(cx,cy-20,'2.6','t-mid',`font:700 ${N?70:84}px var(--display);fill:var(--brand)`);s+=hsTx(cx,cy+6,'people treated to reduce disability','t-sm t-mid','fill:var(--ink)')+hsTx(cx,cy+22,'by at least one mRS level in one of them','t-sm t-mid','fill:var(--ink)');
     s+=hsTx(cx,cy+50,'adjusted common OR 2.49 (1.76-3.53)','t-xs t-mid');return s}
   case'late':{const sv=ease(ramp(u,.3,1));let s=brain({vessels:{flow:sv,ph},lesion:{core:18,penumbra:50,saved:sv}}).svg;s+=kitLabel(cx,B.y+B.h-1,'small core, large area still saved (schematic)',{a:'m'});return s}
   case'guide':{const R=[['Early management','replaces 2018 and 2019'],['Rehabilitation','replaces 2016']];let s='';R.forEach((r,i)=>{const a=clamp(u*3-i*.8),y=B.y+18+i*(N?106:130),h=N?92:112;
       s+=`<g style="opacity:${f1(a)}"><rect x="${f1(B.x+18)}" y="${f1(y)}" width="${f1(B.w-36)}" height="${h}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>${hsTx(B.x+34,y+26,'2026 AHA/ASA','t-xs')}${hsTx(B.x+34,y+50,r[0],'t-big')}${hsTx(B.x+34,y+70,r[1],'t-sm')}</g>`});return s}
   default:return ''}}
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),chips=$('#hiYears');let setSt=()=>{};
  chips.innerHTML=HS_EV.map((E,i)=>`<button class="tag" data-hy="${i}" aria-pressed="false"><small>${E.yt||E.y}</small>${E.c}</button>`).join('');
  const POS=HS_EV.map(E=>hsX(E.y));
  function evOf(t){let e=0;POS.forEach((p,i)=>{if(t>=p-.0005)e=i});return e}
  function draw(t){const N=vb(svg,'720 430','400 525'),e=evOf(t),E=HS_EV[e];
    const A=N?{x:16,w:368,y:44}:{x:18,w:684,y:44},B=N?{x:30,y:88,w:340,h:300}:{x:18,y:96,w:360,h:310},P=N?{x:16,y:440}:{x:408,y:150};
    const X=v=>A.x+A.w*v;
    let s='';
    /* era bands */
    HS_ERAS.forEach((r,i)=>{const a=X(hsX(r.a)),b=X(hsX(r.b)),on=E.y>=r.a&&E.y<r.b;
      s+=`<rect x="${f1(a+1)}" y="${A.y-22}" width="${f1(b-a-2)}" height="18" rx="4" style="fill:var(--${on?'brand-soft':'panel-2'})"/>`;
      const lab=N?r.s:r.l;if(lab&&b-a>lab.length*5.6)s+=hsTx((a+b)/2,A.y-9,lab,'t-xs t-mid',on?HS_INK:'')});
    s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${A.y+8}" y2="${A.y+8}" class="axis"/>`;
    POS.forEach((p,i)=>{const x=X(p),on=i===e,past=i<e;s+=`<circle cx="${f1(x)}" cy="${A.y+8}" r="${on?6:3}" style="fill:${on?'var(--brand)':past?'var(--ink)':'var(--line)'}"/>`});
    s+=`<path d="M${f1(X(t)-5)} ${A.y+24}h10l-5 -8z" style="fill:var(--muted)"/>`;
    /* the milestone */
    const u=clamp((t-POS[e])/Math.max(.01,(POS[e+1]||1)-POS[e])),fd=clamp(u*14+.5);
    s+=`<g style="opacity:${f1(fd)}">${hsScene(E,B,u,t*90,N)}</g>`;
    s+=hsTx(P.x,P.y,E.yt||String(E.y),'',`font:700 ${N?40:52}px var(--display);fill:var(--brand);letter-spacing:-.02em`);
    s+=hsTx(P.x,P.y+(N?24:30),E.who,'t-lbl');
    E.l.forEach((q,i)=>{s+=hsTx(P.x,P.y+(N?46:58)+i*(N?18:20),q,N?'t-sm':'t-sm','fill:var(--ink)')});
    svg.innerHTML=s;note.innerHTML=noteHTML(E);setSt(phaseOf(HS_STEPS,t));
    $$('[data-hy]',chips).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hy===e))}
  const stop=playWire(rg,$('#hiPlay'),draw,48000,'%t:player.replay%','history');
  setSt=stepWire($('#hiSteps'),HS_STEPS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=hsLand(+b.dataset.hy);rg.value=v;draw(v);svg.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'})});
  draw(+rg.value);

  /* ---------- the trials ---------- */
  const tS=$('#hiTr'),tC=$('#hiTrCap'),tB=$('#hiTrBtns');let tg='all',tP=1,tStop=null;
  tB.innerHTML=HS_TRG.map(g=>`<button class="btn" data-htr="${g[0]}" aria-pressed="${g[0]==='all'}">${g[1]}</button>`).join('');
  function drawTr(){const N=vb(tS,'720 430','400 640');
    const L=N?{lx:14,bx:22,bw:340,y0:48,rh:62}:{lx:16,bx:190,bw:470,y0:50,rh:38},X=v=>L.bx+L.bw*v/80;
    let s='';[0,20,40,60,80].forEach(v=>{const bot=L.y0+HS_TR.length*L.rh+(N?0:14);s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-14}" y2="${bot}" class="grid"/>`+hsTx(X(v),L.y0-20,v+'%','t-xs t-mid')});
    s+=hsTx(L.lx,16,'% with the main outcome, control to thrombectomy','t-sm','fill:var(--ink)');
    let gy=0;const gl={13:'2013',15:'2015',18:'2018'};
    HS_TR.forEach((T,i)=>{const on=tg==='all'||tg===T.g,y=L.y0+i*L.rh+(N?22:gy),op=on?1:.22,xc=X(T.c),xt=X(lerp(T.c,T.x,on?ease(tP):1)),better=T.x>T.c;
      s+=`<g style="opacity:${op}">`;
      if(N)s+=hsTx(L.lx,y-10,gl[T.g]+' · '+T.n+', '+T.d,'t-xs','fill:var(--ink);font-weight:600');
      else s+=hsTx(L.lx,y+1,gl[T.g]+' · '+T.n,'t-sm','fill:var(--ink);font-weight:600')+hsTx(L.lx,y+13,T.d,'t-xs');
      s+=`<line x1="${f1(xc)}" x2="${f1(xt)}" y1="${y}" y2="${y}" style="stroke:${better?'var(--brand)':'var(--muted)'};stroke-width:4"/>`;
      s+=`<circle cx="${f1(xc)}" cy="${y}" r="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:2.4"/>`;
      s+=`<rect x="${f1(xt-6)}" y="${y-6}" width="12" height="12" rx="2" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.5"/>`;
      const close=Math.abs(xt-xc)<52,lo=Math.min(T.c,T.x),hi=Math.max(T.c,T.x),lx=X(lo)-10,rx=X(hi)+10;
      s+=hsTx(T.x>T.c?lx:rx,y+4,T.c+'%',T.x>T.c?'t-sm t-end':'t-sm','fill:var(--muted)')+hsTx(T.x>T.c?rx:lx,y+4,T.x+'%',T.x>T.c?'t-sm':'t-sm t-end','fill:var(--ink);font-weight:700');
      s+='</g>'});
    const ky=N?622:L.y0+HS_TR.length*L.rh+26;
    s+=`<circle cx="${L.lx+6}" cy="${ky-3}" r="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:2.2"/>`+hsTx(L.lx+18,ky,'control','t-xs','fill:var(--ink)');
    s+=`<rect x="${L.lx+78}" y="${ky-8}" width="10" height="10" rx="2" style="fill:var(--brand)"/>`+hsTx(L.lx+94,ky,'thrombectomy arm','t-xs','fill:var(--ink)');
    tS.innerHTML=s;tC.innerHTML=HS_TRC[tg]}
  tB.addEventListener('click',e=>{const b=e.target.closest('[data-htr]');if(!b)return;tg=b.dataset.htr;$$('[data-htr]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(tStop)tStop();tP=.05;drawTr();tStop=animate(RM?1:800,q=>{tP=q;drawTr()},()=>{tStop=null;tP=1;drawTr()})});
  drawTr();
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();drawTr()};
};
