/* =============== 6.1 History & people =============== */
/* A play head walks a dated timeline (horizontal on wide screens, vertical on phones); each milestone
   gets a card, a small animation and a cited note. Heberden has no year here: the usual dates were not
   confirmed by the research pass, so he sits in a "prologue" slot. */
const HI_MS=[
 {y:1898,yl:'Prologue',t:'Angina described',who:'William Heberden',s:'The first account of classic angina pectoris',k:'heart0',
  txt:`William Heberden gave the first account of classic angina pectoris. Prinzmetal's report of variant angina came nearly two centuries later. [[Sternbach1991Heberden]]`},
 {y:1903,t:'The ECG is recorded',who:'Willem Einthoven',s:'Galvanometric recording of the human electrocardiogram',k:'ecg',
  txt:`Einthoven published galvanometric recording of the human electrocardiogram in Pflügers Archiv in 1903. [[Einthoven1903]]`},
 {y:1912,t:'Sudden coronary obstruction',who:'James B. Herrick',s:'The clinical description of acute MI',k:'occl',
  txt:`Herrick's JAMA paper "Clinical features of sudden obstruction of the coronary arteries" gave the clinical description of acute MI. Braunwald dates the first era of treatment, bed rest and "expectant" care, from 1912 to 1961. [[Herrick1912,Braunwald2012History]]`},
 {y:1920,t:'An ECG sign of obstruction',who:'Harold E. B. Pardee',s:'The ECG sign of coronary artery obstruction',k:'st',
  txt:`Pardee published "An electrocardiographic sign of coronary artery obstruction" in Archives of Internal Medicine in 1920. [[Pardee1920]] ST elevation is still how a STEMI is recognised today: see <a href="#ecg" data-go="ecg">the ECG module</a>.`},
 {y:1948,t:'Framingham begins',who:'The Framingham Heart Study',s:'First volunteer examined; "factors of risk" by 1961',k:'people',
  txt:`The Framingham Heart Study examined its first volunteer in 1948; its origins are tied to President Roosevelt's death in 1945 from hypertensive heart disease and stroke. Its approach was described in 1951, and the six-year "Factors of risk in the development of coronary heart disease" report appeared in 1961. [[Mahmood2014Framingham,Dawber1951Framingham,Kannel1961Framingham]]`},
 {y:1961,t:'The coronary care unit',who:'Desmond Julian',s:'Treating cardiac arrest in acute MI',k:'ccu',
  txt:`Julian's 1961 Lancet paper on treating cardiac arrest in acute myocardial ischaemia and infarction began the coronary care unit era (1961–1974). In 1967 Killip and Kimball reported 2 years' experience treating 250 patients with MI in a coronary care unit. [[Julian1961CCU,Killip1967CCU,Braunwald2012History]]`},
 {y:1977,t:'The wavefront of cell death',who:'Reimer, Jennings and colleagues',s:'Muscle dies from the inner wall outward, over hours',k:'wave',
  txt:`In dogs, the share of the at-risk wall that died grew with the length of coronary occlusion: 38% at 40 minutes, 57% at 3 hours, 71% at 6 hours, 85% at 24 hours. Death spread from the inner wall outward as a "wavefront", leaving salvageable muscle for at least 3 and perhaps 6 hours (animal data). [[Reimer1977]]`},
 {y:1978,t:'Balloon angioplasty',who:'Andreas Grüntzig',s:'Dilating a coronary stenosis through a catheter',k:'balloon',
  txt:`Grüntzig reported transluminal dilatation of coronary-artery stenosis in a 1978 Lancet letter. His 1979 NEJM series covered 50 patients: the procedure succeeded in 32, reducing stenosis from a mean of 84% to 34%. [[Gruntzig1978Lancet,Gruntzig1979NEJM]]`},
 {y:1980,t:'The clot is the cause',who:'DeWood and colleagues',s:'Total occlusion in 87% within 4 hours',k:'dewood',
  txt:`DeWood found total coronary occlusion in 87% (110 of 126) of patients studied within 4 hours of transmural MI, falling to 65% at 12–24 hours. Thrombus was retrieved in 52 of 59 patients whose angiograms suggested thrombosis. [[DeWood1980]]`},
 {y:1986,t:'GISSI: streptokinase',who:'GISSI investigators',s:'11,806 patients in 176 coronary care units',k:'gissi',
  txt:`GISSI randomised 11,806 patients to intravenous streptokinase or usual care. 21-day hospital mortality was 10.7% versus 13%, an 18% reduction. The benefit faded with delay: relative risk 0.74 at 0–3 hours, 1.19 at 9–12 hours. [[GISSI1986]]`},
 {y:1987,t:'Coronary stents',who:'Sigwart and colleagues',s:'24 self-expanding stents in 19 patients',k:'stent',
  txt:`Sigwart and colleagues reported self-expanding coronary stents in 1987: 24 stents in 19 patients, to prevent occlusion and restenosis after angioplasty. [[Sigwart1987Stents]]`},
 {y:1988,t:'ISIS-2: aspirin and streptokinase',who:'ISIS-2 Collaborative Group',s:'17,187 patients, a 2×2 factorial trial',k:'isis',
  txt:`ISIS-2 randomised 17,187 patients with suspected MI to streptokinase, aspirin, both or neither. Five-week vascular mortality was 9.2% with streptokinase versus 12.0%, 9.4% with aspirin versus 11.8%, and 8.0% with both versus 13.2% with neither (odds reduction 42%). [[ISIS2_1988]]`},
 {y:1989,t:'A test for troponin T',who:'Katus and colleagues',s:'Raised in all 50 patients with transmural MI',k:'trop',
  txt:`Katus and colleagues described an immunoassay for cardiac troponin T in 1989; it was raised in all 50 patients with transmural AMI. In 1991 they found it in serum within 3 hours of pain in 50% of patients, staying raised for more than 130 hours. In 1992, troponin T predicted MI in patients with angina at rest. [[Katus1989TnT,Katus1991TnT,Hamm1992TnT]]`},
 {y:1993,t:'Primary angioplasty',who:'PAMI and Zwolle',s:'Angioplasty against clot-busting drugs',k:'pami',
  txt:`In PAMI (395 patients), in-hospital mortality was 6.5% with t-PA and 2.6% with immediate angioplasty (P=0.06). In Zwolle (142 patients), the infarct artery was open in 68% after streptokinase and 91% after angioplasty. [[Grines1993PAMI,Zijlstra1993]]`},
 {y:2000,t:'MI redefined around troponin',who:'ESC/ACC consensus',s:'A rise and fall of troponin with ischaemia',k:'redef',
  txt:`The joint ESC/ACC consensus redefined MI around a typical rise and gradual fall of troponin with ischaemic symptoms, Q waves, ischaemic ECG changes or coronary intervention. [[Alpert2000Redefined]] In Olmsted County a quarter of later MIs met only the troponin criteria, which is why counts from before and after cannot be compared directly. [[Roger2010Olmsted]]`},
 {y:2003,t:'Primary PCI wins',who:'Keeley, Boura and Grines',s:'23 trials, 7,739 patients',k:'keeley',
  txt:`A meta-analysis of 23 trials found primary angioplasty better than fibrinolysis: short-term death 7% versus 9%, non-fatal reinfarction 3% versus 7%, stroke 1% versus 2%. [[Keeley2003]] In Sweden, primary PCI rose from 4.5% of STEMI cases in 1995 to 78.0% in 2014. [[Szummer2017STEMI]]`},
 {y:2007,t:'The universal definition',who:'Thygesen, Alpert and colleagues',s:'The five types of MI',k:'types',
  txt:`The first Universal Definition (2007) introduced the five-type classification of MI. The third (2012) and fourth (2018) definitions followed. [[Thygesen2007UDMI,Saaby2013Type2,Thygesen2012UDMI3,Thygesen2018UDMI4]]`},
 {y:2009,t:'Sensitive troponin assays',who:'Reichlin; Keller and colleagues',s:'Better diagnosis in the first 3 hours',k:'hs',
  txt:`In 2009, sensitive troponin assays diagnosed AMI better than a standard assay (AUC 0.95–0.96 versus 0.90). The gap was largest within 3 hours of chest-pain onset (0.92–0.94 versus 0.76). [[Reichlin2009]] A second study found 90.7% sensitivity and 90.2% specificity on admission. [[Keller2009hsTnI]]`},
 {y:2012,t:'A one-hour algorithm',who:'Reichlin and colleagues',s:'Rule out, observe or rule in at 1 hour',k:'split',
  txt:`In the derivation study of a 1-hour high-sensitivity troponin T algorithm (872 patients, 17% with MI), 60% of the validation cohort were ruled out, 17% ruled in and 23% observed, with a negative predictive value of 100%. [[Reichlin2012]] The third universal definition also appeared in 2012. [[Thygesen2012UDMI3]]`},
 {y:2018,t:'Injury versus infarction',who:'Fourth Universal Definition',s:'Myocardial injury is not always MI',k:'udmi4',
  txt:`The Fourth Universal Definition defines myocardial injury as troponin above the 99th-percentile upper reference limit, and keeps MI for acute injury with evidence of acute ischaemia. Takotsubo syndrome is classed as myocardial injury, not MI. [[Thygesen2018UDMI4,Domienik2021UDMI4]] Try the cases in <a href="#what" data-go="what">what a heart attack is</a>.`},
 {y:2019,t:'0/1-hour in routine care',who:'Twerenbold and colleagues',s:'62% ruled out, 30-day MACE 0.2%',k:'split2',
  txt:`Applied in routine care (2,296 patients), the ESC 0/1-hour algorithm triaged 62% to rule-out; 30-day major adverse cardiac events were 0.2% in that group, and the median emergency department stay was 2 h 30 min. [[Twerenbold2019]] More in <a href="#troponin" data-go="troponin">troponin &amp; rapid rule-out</a>.`},
 {y:2024,yl:'2023–25',t:'Today’s guidelines',who:'ESC 2023; ACC/AHA 2025',s:'One guideline for all acute coronary syndromes',k:'guide',
  txt:`The ESC published guidelines for the management of acute coronary syndromes in 2023. [[Byrne2023ESC]] The 2025 ACC/AHA/ACEP/NAEMSP/SCAI guideline replaces the 2013 STEMI and 2014 NSTE-ACS guidelines. [[Rao2025ACC]] A 2017 seminar credited recent gains to better risk stratification, invasive strategies, immediate revascularisation systems, better antithrombotic drugs and more secondary prevention. [[Reed2017Lancet]]`}
];
const HI_N=HI_MS.length;
const HI_STEPS=[[0,'Recognising it','Prologue–1920'],[4,'Risk & the coronary care unit','1948–1961'],[6,'Opening the artery','1977–1988'],[12,'Troponin & primary PCI','1989–2003'],[16,'Definitions & fast tests','2007–2025']].map(([i,t,yy],j,a)=>{
  const next=j<a.length-1?a[j+1][0]:HI_N;
  return {i,from:j?(i-.5)/(HI_N-1):0,at:i/(HI_N-1),t,k:yy,
   txt:'',pt:['People noticed the pain, then learned to record the heart’s electrical signal and connected both to a blocked artery.',
     'Researchers began to measure what raises risk, and hospitals set up coronary care units to treat cardiac arrest during a heart attack.',
     'Doctors learned that a clot blocks the artery and that the sooner it is opened, the more muscle survives.',
     'A blood test for troponin found smaller heart attacks, and opening the artery with a balloon and stent became the main treatment.',
     'Definitions now separate heart muscle injury from heart attack, and fast tests can rule a heart attack out in about an hour.'][j],
   hook:['Herrick 1912 described acute MI; Einthoven 1903 recorded the ECG; Pardee 1920 described its sign of coronary obstruction. [[Herrick1912,Einthoven1903,Pardee1920]]',
     'Braunwald’s eras: bed rest (1912–1961), coronary care unit (1961–1974), reperfusion (1975 onward). [[Braunwald2012History]]',
     'DeWood 1980: 87% total occlusion within 4 hours. ISIS-2: streptokinase plus aspirin cut 5-week vascular mortality from 13.2% to 8.0%. [[DeWood1980,ISIS2_1988]]',
     'Keeley 2003: primary angioplasty beat fibrinolysis, short-term death 7% versus 9%. [[Keeley2003]]',
     'UDMI4 (2018): MI = acute myocardial injury plus evidence of acute ischaemia; takotsubo is injury, not MI. [[Thygesen2018UDMI4,Domienik2021UDMI4]]'][j],next}});
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),chips=$('#hiYears');
  const tx=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){L.push(l.trim());l=x}else l+=' '+x});if(l.trim())L.push(l.trim());return L};
  const ylab=m=>m.yl||String(m.y);
  /* small bar chart used by several milestones */
  function bars(x,y,w,h,data,u,max,unit,title){let s=tx(x,y+10,title,'t-xs','fill:var(--ink);font-weight:700');const bh=Math.min(22,(h-26)/data.length-6);
    data.forEach((d,i)=>{const yy=y+22+i*(bh+8),lw=78,ww=(w-lw-44)*d.v/max*ease(clamp(u*1.4-i*.12));
      s+=tx(x,yy+bh/2+3.5,d.l,'t-xs')+`<rect x="${f1(x+lw)}" y="${f1(yy)}" width="${f1(Math.max(0,ww))}" height="${f1(bh)}" rx="3" style="fill:${d.c||'var(--brand)'}"/>`+tx(x+lw+ww+5,yy+bh/2+3.5,(d.lab||d.v)+unit,'t-xs','fill:var(--ink);font-weight:600')});
    return s}
  function ill(k,x,y,w,h,u){let s='';const cx=x+w/2,cy=y+h/2;
    switch(k){
    case 'heart0':{const H=heart(cx,cy+6,Math.min(w,h)/230,{id:'hiH0',hl:[]});s+=H.svg;const g=bump(u,0,1);
      s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy+6)}" rx="${f1(70+g*14)}" ry="${f1(60+g*12)}" style="fill:none;stroke:var(--pain);stroke-width:2;stroke-dasharray:5 4;opacity:${f1(.3+.5*g)}"/>`+tx(cx,y+h-2,'angina: chest pain on effort','t-xs t-mid');break}
    case 'ecg':case 'st':{const mm=Math.min(4,(w-10)/80);s+=ecgGrid(x,y+10,w,h-34,{mm});
      s+=ecgTrace(x,y+10+(h-34)*.65,w,{mm,hr:72,upto:k==='ecg'?u:1,pen:k==='ecg',st:k==='st'?3.2*ease(clamp(u*1.3)):0,lw:1.6}).svg;
      s+=tx(x,y+h-6,k==='ecg'?'the ECG being written':'ST segment rising above the baseline','t-xs');break}
    case 'occl':case 'dewood':{if(k==='occl'){const H=heart(cx,cy,Math.min(w,h)/215,{id:'hiH1',occl:{a:'lad',at:.3,v:u},terr:{lad:ramp(u,.3,1)},hl:['lad'],labels:['lad']});s+=H.svg+tx(cx,y+h-2,'a blocked coronary artery','t-xs t-mid')}
      else{const A=artery(x,y+4,w,h*.42,{plaque:.7,cap:.2,rupture:1,clot:Math.min(1,u*1.5),ph:u*6,seed:3});s+=A.svg;
        s+=bars(x,y+h*.5,w,h*.5,[{l:'0–4 h',v:87,c:'var(--clot)'},{l:'12–24 h',v:65,c:'var(--isch-fill)'}],u,100,'%','total occlusion on angiography')}break}
    case 'people':{const n=48,c=12,sz=Math.min(18,(w-20)/c-3);let a='';for(let i=0;i<n;i++){const on=i<Math.round(u*n*1.2);a+=person(x+10+(i%c)*(sz+4)+sz/2,y+14+Math.floor(i/c)*(sz*1.5),sz,on?'var(--dx)':'var(--line)')}
      s+=a+tx(x+10,y+h-6,'volunteers followed for decades (schematic)','t-xs');break}
    case 'ccu':{const mw=w-20,mh=h-50;s+=`<rect x="${f1(x+10)}" y="${f1(y+6)}" width="${f1(mw)}" height="${f1(mh)}" rx="10" style="fill:var(--ecg-paper);stroke:var(--ink);stroke-width:2"/>`;
      s+=ecgTrace(x+20,y+6+mh*.62,mw-20,{mm:3,hr:78,from:u*8,lw:1.6,col:'var(--good)'}).svg+tx(x+20,y+22,'bedside ECG (schematic)','t-xs','fill:var(--ink);font-weight:600');
      s+=tx(x+10,y+h-20,'treating cardiac arrest in acute MI','t-xs')+tx(x+10,y+h-6,'(Julian 1961); 250 patients by 1967','t-xs');break}
    case 'wave':s+=bars(x,y,w,h,[{l:'40 min',v:38},{l:'3 h',v:57},{l:'6 h',v:71},{l:'24 h',v:85}].map(d=>Object.assign(d,{c:'var(--necro-fill)'})),u,100,'%','share of the at-risk wall that died (dogs)');break;
    case 'balloon':case 'stent':{if(k==='balloon'){const b=bump(u,.15,.75);s+=artery(x,y+10,w,h*.62,{plaque:.85,cap:.8,balloon:b,squash:ramp(u,.2,.7),ph:u*4,seed:5}).svg;
        s+=tx(x,y+h-14,'mean stenosis 84% → 34% (1979 series)','t-xs','fill:var(--ink)')+tx(x,y+h,'success in 32 of 50 patients','t-xs')}
      else{s+=stent(x+30,y+20,w-60,h*.42,{exp:ease(clamp(u*1.3)),balloon:bump(u,0,.8)});s+=tx(x,y+h-14,'a mesh tube holds the artery open','t-xs','fill:var(--ink)')+tx(x,y+h,'24 stents in 19 patients (1987)','t-xs')}break}
    case 'gissi':s+=bars(x,y,w,h*.62,[{l:'usual care',v:13,c:'var(--isch-fill)'},{l:'streptokinase',v:10.7}],u,16,'%','21-day hospital mortality');
      s+=tx(x,y+h*.72,'relative risk by delay to treatment','t-xs','fill:var(--ink);font-weight:700');[['0–3 h',.74],['3–6 h',.8],['6–9 h',.87],['9–12 h',1.19]].forEach(([l,v],i)=>{const bx=x+i*(w/4),op=ramp(u,.4+i*.1,.5+i*.1);s+=`<g style="opacity:${f1(op)}">${tx(bx+4,y+h*.72+18,l,'t-xs')}${tx(bx+4,y+h*.72+34,v.toFixed(2),'t-lbl',v<1?'fill:var(--good)':'fill:var(--bad)')}</g>`});break;
    case 'isis':s+=bars(x,y,w,h,[{l:'neither',v:13.2,c:'var(--isch-fill)'},{l:'aspirin',v:9.4,c:'var(--rx)'},{l:'strepto.',v:9.2,c:'var(--accent)'},{l:'both',v:8.0}],u,15,'%','5-week vascular mortality (vs placebo arms)');break;
    case 'trop':case 'redef':{const C=tropCurve(x+16,y+14,w-24,h-56,[[0,.02],[3,.25],[14,1],[40,.75],[90,.35],[140,.12]],{y0:0,y1:1.1,upto:k==='trop'?140*u:140,dot:k==='trop',fill:true});s+=C.svg;
      if(k==='trop'){[[3,'3 h'],[130,'130 h']].forEach(([v,l])=>s+=`<line x1="${f1(C.X(v))}" x2="${f1(C.X(v))}" y1="${f1(y+14)}" y2="${f1(y+h-42)}" class="grid"/>`+tx(C.X(v),y+h-28,l,'t-xs t-mid'));s+=tx(x+16,y+h-8,'troponin T: schematic rise and fall','t-xs')}
      else{s+=tx(x+16,y+h-26,'a typical rise and gradual fall of troponin','t-xs','fill:var(--ink)');s+=tx(x+16,y+h-10,'+ symptoms, Q waves, ECG changes or intervention','t-xs')}break}
    case 'pami':s+=bars(x,y,w,h*.6,[{l:'t-PA',v:6.5,c:'var(--isch-fill)'},{l:'angioplasty',v:2.6,c:'var(--good)'}],u,8,'%','PAMI: in-hospital mortality')+bars(x,y+h*.55,w,h*.45,[{l:'streptokin.',v:68,c:'var(--isch-fill)'},{l:'angioplasty',v:91,c:'var(--good)'}],u,100,'%','Zwolle: artery open');break;
    case 'keeley':s+=bars(x,y,w,h*.62,[{l:'fibrinolysis',v:9,c:'var(--isch-fill)'},{l:'primary PCI',v:7,c:'var(--good)'}],u,10,'%','short-term death, 23 trials')+bars(x,y+h*.55,w,h*.45,[{l:'1995',v:4.5,c:'var(--rx-soft)'},{l:'2014',v:78,c:'var(--rx)'}],u,100,'%','Sweden: primary PCI share of STEMI');break;
    case 'types':WH_TYPES.forEach((ty,i)=>{const op=ramp(u,i*.15,i*.15+.2),yy=y+6+i*((h-8)/5);if(op<=0)return;s+=`<g style="opacity:${f1(op)}"><rect x="${f1(x)}" y="${f1(yy)}" width="${f1(w)}" height="${f1((h-8)/5-5)}" rx="6" style="fill:var(--panel);stroke:${ty[3]}"/><rect x="${f1(x)}" y="${f1(yy)}" width="24" height="${f1((h-8)/5-5)}" rx="6" style="fill:${ty[3]}"/>${tx(x+12,yy+(h-8)/10+2,ty[0],'t-lbl t-mid','fill:#fff')}${tx(x+32,yy+(h-8)/10+2,ty[1]+' · '+ty[2],'t-xs','fill:var(--ink)')}</g>`});break;
    case 'hs':s+=bars(x,y,w,h,[{l:'standard',v:.76,c:'var(--isch-fill)',lab:'0.76'},{l:'sensitive',v:.92,c:'var(--trop)',lab:'0.92–0.94'}],u,1,'','AUC for AMI within 3 h of chest pain');break;
    case 'split':case 'split2':{const parts=k==='split'?[['ruled out',60,'var(--good)'],['observe',23,'var(--warn)'],['ruled in',17,'var(--bad)']]:[['ruled out',62,'var(--good)'],['observe or rule in',38,'var(--isch-fill)']];
      s+=tx(x,y+12,k==='split'?'1-hour algorithm, validation cohort':'0/1-hour algorithm in routine care','t-xs','fill:var(--ink);font-weight:700');let xx=x;const bw=w*ease(clamp(u*1.3));
      parts.forEach(([l,v,c])=>{const ww=bw*v/100;s+=`<rect x="${f1(xx)}" y="${f1(y+24)}" width="${f1(ww)}" height="34" style="fill:${c}"/>`;if(ww>40)s+=tx(xx+ww/2,y+45,v+'%','t-lbl t-mid','fill:#fff');xx+=ww});
      parts.forEach(([l,v,c],i)=>{s+=`<rect x="${f1(x)}" y="${f1(y+76+i*18)}" width="10" height="10" rx="2" style="fill:${c}"/>`+tx(x+16,y+85+i*18,l,'t-xs','fill:var(--ink)')});
      s+=tx(x,y+h-4,k==='split'?'negative predictive value 100%':'30-day MACE after rule-out: 0.2%','t-xs');break}
    case 'udmi4':{const P=[['no injury','troponin ≤ 99th percentile','var(--line)'],['chronic injury','raised, stable','var(--isch-fill)'],['acute injury','rise and/or fall','var(--isch)'],['MI','acute injury + ischaemia','var(--brand)']];
      P.forEach((p,i)=>{const op=ramp(u,i*.18,i*.18+.25),yy=y+6+i*((h-6)/4);s+=`<g style="opacity:${f1(op)}"><rect x="${f1(x+i*14)}" y="${f1(yy)}" width="${f1(w-i*14)}" height="${f1((h-6)/4-6)}" rx="8" style="fill:${p[2]};opacity:.85"/>${tx(x+i*14+10,yy+16,p[0],'t-lbl',i===0?'':'fill:#fff')}${tx(x+i*14+10,yy+30,p[1],'t-xs',i===0?'':'fill:#fff')}</g>`});break}
    case 'guide':{[['ESC','2023','var(--accent)'],['ACC/AHA','2025','var(--brand)']].forEach(([a,b,c],i)=>{const op=ramp(u,i*.3,i*.3+.3),bx=x+20+i*(w/2),bw=w/2-40,dy=(1-op)*12;
        s+=`<g style="opacity:${f1(op)}" transform="translate(0 ${f1(dy)})"><rect x="${f1(bx)}" y="${f1(y+10)}" width="${f1(bw)}" height="${f1(h-60)}" rx="6" style="fill:var(--panel);stroke:${c};stroke-width:2"/><rect x="${f1(bx)}" y="${f1(y+10)}" width="${f1(bw)}" height="26" rx="6" style="fill:${c}"/>${tx(bx+bw/2,y+28,a,'t-lbl t-mid','fill:#fff')}${tx(bx+bw/2,y+64,b,'t-big t-mid','font-size:24px')}${tx(bx+bw/2,y+84,'ACS guideline','t-xs t-mid')}</g>`});
      s+=tx(x,y+h-14,'2025 ACC/AHA replaces the 2013 STEMI','t-xs')+tx(x,y+h,'and 2014 NSTE-ACS guidelines','t-xs');break}
    }
    return s}
  const ERAS=[[1912,1961,'bed rest','var(--panel-2)'],[1961,1975,'CCU','var(--accent-soft)'],[1975,2028,'reperfusion','var(--brand-soft)']];
  let setSt=()=>{},lastI=-1;
  function draw(t){const NR=vb(svg,'720 400','400 720'),f=t*(HI_N-1),i=Math.round(f),m=HI_MS[i],u=clamp((f-i+.5)*2.2),pS=phaseOf(HI_STEPS,t);
    const Y0=1895,Y1=2028;let s='';
    const yr=lerp(HI_MS[Math.floor(f)].y,HI_MS[Math.min(HI_N-1,Math.ceil(f))].y,f-Math.floor(f));
    if(!NR){const ax=330,X=v=>36+648*(v-Y0)/(Y1-Y0);
      ERAS.forEach(([a,b,l,c])=>{s+=`<rect x="${f1(X(a))}" y="${ax-26}" width="${f1(X(b)-X(a))}" height="18" style="fill:${c}"/>`+tx(X(a)+4,ax-13,l,'t-xs','fill:var(--ink)')});
      s+=`<line x1="36" x2="684" y1="${ax}" y2="${ax}" class="axis" style="stroke-width:2"/>`;
      for(let v=1900;v<=2020;v+=20)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ax}" y2="${ax+5}" class="axis"/>`+tx(X(v),ax+18,v,'t-xs t-mid');
      HI_MS.forEach((q,j)=>{const on=j===i,past=j<i;s+=`<circle cx="${f1(X(q.y))}" cy="${ax}" r="${on?7:4.5}" style="fill:${on?'var(--brand)':past?'var(--ink)':'var(--panel)'};stroke:${on?'var(--panel)':'var(--muted)'};stroke-width:${on?2:1.2}"/>`});
      const hx=X(yr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${ax-34}" y2="${ax+8}" style="stroke:var(--brand);stroke-width:2"/><path d="M${f1(hx-6)} ${ax-40}h12l-6 7z" style="fill:var(--brand)"/>`;
      const mx=X(m.y);s+=`<path d="M${f1(mx)} ${ax-8}V${ax-30}" style="stroke:var(--brand);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      s+=tx(36,ax+44,'Year '+(i===0?'(prologue)':Math.round(yr)),'t-sm');
      /* card */
      s+=`<rect x="20" y="16" width="310" height="262" rx="14" style="fill:var(--panel-2)"/>`;
      s+=tx(36,64,ylab(m),'t-big','font-size:40px;fill:var(--brand)')+tx(36,92,m.t,'t-big','font-size:18px');
      s+=tx(36,114,m.who,'t-sm','fill:var(--ink);font-size:13px');wrap(m.s,34).forEach((l,j)=>s+=tx(36,144+j*18,l,'t-sm','font-size:13px'));
      s+=tx(36,262,`${i+1} of ${HI_N} · ${HI_STEPS[pS].t}`,'t-xs');
      s+=ill(m.k,352,28,340,240,u)}
    else{const ax=34,YY=v=>36+640*(v-Y0)/(Y1-Y0);
      ERAS.forEach(([a,b,l,c])=>{s+=`<rect x="14" y="${f1(YY(a))}" width="10" height="${f1(YY(b)-YY(a))}" style="fill:${c}"/>`});
      s+=`<line x1="${ax}" x2="${ax}" y1="36" y2="676" class="axis" style="stroke-width:2"/>`;
      for(let v=1900;v<=2020;v+=20)s+=tx(ax+6,YY(v)+3,v,'t-xs');
      HI_MS.forEach((q,j)=>{const on=j===i,past=j<i;s+=`<circle cx="${ax}" cy="${f1(YY(q.y))}" r="${on?6.5:3.8}" style="fill:${on?'var(--brand)':past?'var(--ink)':'var(--panel)'};stroke:${on?'var(--panel)':'var(--muted)'};stroke-width:1.2"/>`});
      const hy=YY(yr);s+=`<line x1="${ax-10}" x2="${ax+10}" y1="${f1(hy)}" y2="${f1(hy)}" style="stroke:var(--brand);stroke-width:2.4"/>`;
      s+=`<path d="M${ax+8} ${f1(YY(m.y))}L78 ${f1(clamp(YY(m.y),30,40))}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
      s+=`<rect x="78" y="16" width="308" height="168" rx="14" style="fill:var(--panel-2)"/>`;
      s+=tx(92,56,ylab(m),'t-big','font-size:34px;fill:var(--brand)')+tx(92,82,m.t,'t-big','font-size:16px');
      s+=tx(92,100,m.who,'t-xs','fill:var(--ink);font-weight:600');wrap(m.s,40).forEach((l,j)=>s+=tx(92,122+j*15,l,'t-xs'));
      s+=tx(92,172,`${i+1} of ${HI_N} · ${HI_STEPS[pS].t}`,'t-xs');
      s+=ill(m.k,84,200,296,230,u);
      /* the last few milestones passed */
      s+=tx(84,470,'Earlier milestones','t-xs','fill:var(--ink);font-weight:700');
      HI_MS.slice(Math.max(0,i-6),i).reverse().forEach((q,j)=>{s+=tx(84,492+j*28,ylab(q),'t-sm','fill:var(--brand)')+tx(146,492+j*28,q.t,'t-xs','fill:var(--ink)')});
      if(i===0)s+=tx(84,492,'Press Play to walk the timeline.','t-xs')}
    svg.innerHTML=s;
    note.innerHTML=noteHTML({k:`${ylab(m)} · ${m.who}`,t:m.t,txt:m.txt,pt:HI_STEPS[pS].pt,hook:HI_STEPS[pS].hook});
    setSt(pS);
    if(i!==lastI){lastI=i;chips.querySelectorAll('[data-hy]').forEach(b=>{const on=+b.dataset.hy===i;b.setAttribute('aria-current',on?'true':'false');b.classList.toggle('on',on)})}
    rg.setAttribute('aria-valuetext',`${ylab(m)}: ${m.t}`)}
  chips.innerHTML=HI_MS.map((m,j)=>`<button class="tag" data-hy="${j}">${ylab(m)} · ${m.t}</button>`).join('');
  const stop=playWire(rg,$('#hiPlay'),draw,46000,'%t:player.replay%','history');
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=+b.dataset.hy/(HI_N-1);rg.value=v;draw(v)});
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- how survival changed ---------- */
  const cs=$('#hiChart'),cr=$('#hiChT'),cn=$('#hiChNote'),crd=$('#hiChRead');
  const SER=[
   {n:'Framingham, 30-day',c:'var(--accent)',p:[[1975,12.2,'1970s'],[1995,4.1,'1990s']]},
   {n:'US Medicare ≥65, 30-day',c:'var(--isch)',p:[[1995,20.0],[2014,12.4]]},
   {n:'Sweden STEMI, 1-year',c:'var(--brand)',p:[[1995,22.1],[2014,14.1]]},
   {n:'France STEMI, 6-month',c:'var(--rx)',p:[[1995,17.2],[2010,6.9],[2015,5.3]]}];
  const TOG={ccu:false,lysis:true,pci:false,statin:false,trop:false};
  const TX={ccu:`<b>Coronary care units (1961–1974).</b> Julian's 1961 paper on treating cardiac arrest in acute myocardial ischaemia began the era, and Killip and Kimball reported 250 patients treated in a coronary care unit in 1967. [[Julian1961CCU,Killip1967CCU,Braunwald2012History]] The research pass found no source giving pre- and post-CCU mortality, so none is drawn.`,
    lysis:`<b>Clot-busting drugs and aspirin.</b> GISSI: 21-day mortality 13% with usual care versus 10.7% with streptokinase. ISIS-2: 5-week vascular mortality 13.2% with neither versus 8.0% with streptokinase plus aspirin. [[GISSI1986,ISIS2_1988]]`,
    pci:`<b>Primary angioplasty and stents.</b> PAMI: in-hospital death 6.5% with t-PA versus 2.6% with angioplasty; Keeley's 23 trials: 9% versus 7%. [[Grines1993PAMI,Keeley2003]] Primary PCI rose from 4.5% to 78.0% of Swedish STEMI (1995–2014) and from 12% to 76% in France (1995–2015). [[Szummer2017STEMI,Puymirat2017FASTMI]]`,
    statin:`<b>Statins after MI.</b> In Swedish STEMI patients, statin use rose from 23% to 83% between 1996 and 2007, while 30-day mortality fell from 15.0% to 8.6%. [[Jernberg2011SWEDEHEART]] That is an association in a registry: more on the trials in <a href="#lipids" data-go="lipids">lowering LDL cholesterol</a>.`,
    trop:`<b>Troponin-era definitions (2000 onward).</b> Troponin finds smaller MIs: in Olmsted County 25% of incident MIs after troponin arrived met troponin-only criteria. Counted that way, incidence did not change from 1987 to 2006; by the older CK-MB criteria it fell 20%. The hazard of death at 30 days was 56% lower in 2006 than 1987. [[Roger2010Olmsted]]`};
  function cdraw(v){const NR=vb(cs,'720 360','400 490'),Y=lerp(1960,2020,v);
    const B=NR?{x:44,y:24,w:306,h:270}:{x:50,y:24,w:490,h:280},X=yy=>B.x+B.w*(yy-1960)/60,V=p=>B.y+B.h-B.h*p/25;
    let s='';
    for(let p=0;p<=25;p+=5)s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(V(p))}" y2="${f1(V(p))}" class="${p?'grid':'axis'}"/>`+tx(B.x-6,V(p)+3,p+'%','t-xs t-end');
    for(let yy=1960;yy<=2020;yy+=10)s+=tx(X(yy),B.y+B.h+16,yy,'t-xs t-mid');
    s+=`<line x1="${B.x}" x2="${B.x}" y1="${B.y}" y2="${B.y+B.h}" class="axis"/>`+tx(B.x,B.y-8,'deaths after heart attack, % (each line its own measure)','t-xs','fill:var(--ink);font-weight:600');
    if(TOG.ccu)s+=`<rect x="${f1(X(1961))}" y="${B.y}" width="${f1(X(1975)-X(1961))}" height="${B.h}" style="fill:var(--accent-soft);opacity:.8"/>`+tx(X(1962),B.y+14,'coronary care','t-xs','fill:var(--ink)')+tx(X(1962),B.y+27,'unit era','t-xs','fill:var(--ink)');
    if(TOG.trop)s+=`<line x1="${f1(X(2000))}" x2="${f1(X(2000))}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--trop);stroke-width:2;stroke-dasharray:5 4"/>`+tx(X(2000)+4,B.y+12,'troponin','t-xs','fill:var(--trop);font-weight:700')+tx(X(2000)+4,B.y+24,'redefinition','t-xs','fill:var(--trop)');
    if(TOG.pci){const P=a=>V(a/100*25);
      if(Y>=1995){const e=Math.min(Y,2014),ve=lerp(4.5,78,(e-1995)/19);s+=`<path d="M${f1(X(1995))} ${f1(P(4.5))}L${f1(X(e))} ${f1(P(ve))}" style="stroke:var(--rx);stroke-width:3;opacity:.35"/>`}}
    if(TOG.statin&&Y>=1996){const e=Math.min(Y,2007),ve=lerp(23,83,(e-1996)/11),P=a=>V(a/100*25);s+=`<path d="M${f1(X(1996))} ${f1(P(23))}L${f1(X(e))} ${f1(P(ve))}" style="stroke:var(--gold);stroke-width:3;opacity:.4"/>`}
    if(TOG.pci||TOG.statin){const xr=B.x+B.w;s+=`<line x1="${xr}" x2="${xr}" y1="${B.y}" y2="${B.y+B.h}" class="axis"/>`;[0,50,100].forEach(q=>s+=tx(xr+4,V(q/4)+3,q+'%','t-xs','fill:var(--rx)'));s+=tx(xr+4,B.y-8,'use','t-xs','fill:var(--rx)')}
    SER.forEach(q=>{const pts=q.p.filter(p=>p[0]<=Y);if(!pts.length)return;
      const last=q.p.find(p=>p[0]>Y),prev=pts[pts.length-1];let d=pts.map((p,j)=>(j?'L':'M')+f1(X(p[0]))+' '+f1(V(p[1]))).join('');
      if(last){const fr=(Y-prev[0])/(last[0]-prev[0]);d+=`L${f1(X(Y))} ${f1(V(lerp(prev[1],last[1],fr)))}`}
      s+=`<path d="${d}" style="fill:none;stroke:${q.c};stroke-width:2.4;stroke-dasharray:7 4"/>`;
      pts.forEach(p=>s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(V(p[1]))}" r="4.5" style="fill:${q.c};stroke:var(--panel);stroke-width:1.5"/>`+tx(X(p[0])+(p===pts[0]?-7:7),V(p[1])-7,(p[2]?p[2]+' ':'')+p[1]+'%','t-xs'+(p===pts[0]?' t-end':''),`fill:${q.c};font-weight:600`))});
    const trial=(yy,a,b,lab)=>{if(Y<yy)return '';const xx=X(yy);return `<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(V(a))}" y2="${f1(V(b))}" style="stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(xx-4)} ${f1(V(b)-6)}l4 6l4 -6" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(xx-4)}" y="${f1(V(a)-4)}" width="8" height="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`+tx(xx,V(a)-9,lab,'t-xs t-mid','fill:var(--ink);font-weight:600')};
    if(TOG.lysis)s+=trial(1986,13,10.7,'GISSI')+trial(1988,13.2,8.0,'')+(Y>=1988?tx(X(1988)-5,V(8)+14,'ISIS-2','t-xs t-end','fill:var(--ink);font-weight:600'):'');
    if(TOG.pci)s+=trial(1993,6.5,2.6,'PAMI')+trial(2003,9,7,'Keeley');
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--ink);opacity:.25"/>`;
    /* legend */
    const lx=NR?44:578,ly=NR?330:36;
    SER.forEach((q,j)=>{const yy=NR?ly+Math.floor(j/2)*18:ly+j*34,xx=NR?lx+(j%2)*170:lx;s+=`<line x1="${xx}" x2="${xx+18}" y1="${yy}" y2="${yy}" style="stroke:${q.c};stroke-width:2.4;stroke-dasharray:7 4"/>`;
      if(NR)s+=tx(xx+24,yy+3,q.n,'t-xs','fill:var(--ink)');else{const[a,b]=q.n.split(', ');s+=tx(xx+24,yy+3,a,'t-xs','fill:var(--ink)')+tx(xx+24,yy+15,b,'t-xs')}});
    const ty=NR?ly+50:ly+148;s+=`<rect x="${lx}" y="${ty-9}" width="8" height="8" style="fill:var(--panel);stroke:var(--ink)"/>`+tx(lx+14,ty,'trial: control→treated'.slice(NR?0:7),'t-xs','fill:var(--ink)');
    s+=tx(lx,ty+22,'population statistics','t-xs','fill:var(--warn);font-weight:700');
    if(TOG.pci||TOG.statin)s+=tx(lx,ty+40,'solid lines: share','t-xs','fill:var(--rx)')+tx(lx,ty+54,'treated (right axis)','t-xs','fill:var(--rx)');
    if(TOG.pci)s+=tx(lx,ty+74,'primary PCI, Sweden:','t-xs','fill:var(--rx);font-weight:600')+tx(lx,ty+88,NR?'4.5% (1995) → 78% (2014)':'4.5%→78%, 1995–2014','t-xs','fill:var(--rx)');
    if(TOG.statin)s+=tx(NR?lx+170:lx,NR?ty+74:ty+106,'statins, Sweden:','t-xs','fill:var(--gold);font-weight:600')+tx(NR?lx+170:lx,NR?ty+88:ty+120,NR?'23% (1996) → 83% (2007)':'23%→83%, 1996–2007','t-xs','fill:var(--gold)');
    cs.innerHTML=s;
    crd.innerHTML=`<span>Up to <b>${Math.round(Y)}</b></span>`+SER.map(q=>{const pts=q.p.filter(p=>p[0]<=Y);return pts.length?`<span>${q.n}: <b>${pts[pts.length-1][1]}%</b></span>`:''}).join('')}
  function cnote(){const on=Object.keys(TOG).filter(k=>TOG[k]);
    cn.innerHTML=noteHTML({k:'What the treatments changed',t:on.length?'Treatments switched on':'Pick a treatment',
      txt:(on.length?on.map(k=>TX[k]).join('<br><br>'):'Turn on a treatment above to see when it arrived and what its trials found.')+`<br><br>In the Kaiser Permanente population, STEMI incidence fell from 133 to 50 per 100,000 person-years between 1999 and 2008. [[Yeh2010NEJM]]`,
      pt:'Far fewer people die after a heart attack than 30 years ago. Faster treatment, opening the artery and better medicines all played a part.',
      hook:'SWEDEHEART STEMI 1-year mortality 22.1% → 14.1% (1995–2014) while primary PCI rose 4.5% → 78.0%; gains plateaued from about 2008. [[Szummer2017STEMI]]'})}
  $$('[data-hx]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.hx;TOG[k]=!TOG[k];b.setAttribute('aria-pressed',TOG[k]);cdraw(+cr.value);cnote()}));
  playWire(cr,$('#hiChPlay'),cdraw,9000,'%t:player.replay%','history');
  cdraw(+cr.value);cnote();
  const pr=redraws.history;redraws.history=()=>{pr&&pr();cdraw(+cr.value)};
};
