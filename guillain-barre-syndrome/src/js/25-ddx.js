/* =============== 2.5 Look-alikes =============== */
/* Main player: the motor pathway as seven stops (rows), a signal travelling down it, and a card for the highlighted
   stop with its mimics and clues; rows are clickable (the step buttons are the keyboard route). Widgets: a GBS-versus-
   mimic comparison table, and a schematic fluctuation / A-CIDP course with the published 8-week and 3-event prompts. */
const DD_ROWS=[
 {k:'brain',n:'Brain and brainstem',sn:'Brain, brainstem'},
 {k:'cord',n:'Spinal cord',sn:'Spinal cord'},
 {k:'horn',n:'Anterior horn cells',sn:'Anterior horn'},
 {k:'nerve',n:'Roots and nerves: GBS',sn:'Roots, nerves: GBS'},
 {k:'nmj',n:'Neuromuscular junction',sn:'Junction'},
 {k:'muscle',n:'Muscle and potassium',sn:'Muscle, potassium'},
 {k:'toxin',n:'Toxins',sn:'Toxins'}];
/* the card for each stop: mimic chips, clue lines (short, they are drawn in the SVG) */
const DD_CARD={
 brain:{m:['brainstem stroke','Wernicke encephalopathy'],c:['mistaken for Miller Fisher or Bickerstaff','drowsiness or confusion (except Bickerstaff)','nystagmus, vomiting']},
 cord:{m:['transverse myelitis','cord compression','epidural abscess'],c:['a sharp sensory level','upgoing toes, brisk reflexes','bladder or bowel trouble early','back pain; whole-spine MRI']},
 horn:{m:['poliomyelitis','acute flaccid myelitis','West Nile virus'],c:['fever, asymmetric weakness','many CSF white cells','cord grey matter on MRI']},
 nerve:{m:['GBS','acute-onset CIDP','vasculitis','porphyria','diphtheria','HIV, Lyme','drugs, toxins','critical illness'],c:['GBS: both sides, reflexes fade','vasculitis: patchy, painful','porphyria: abdominal pain']},
 nmj:{m:['myasthenic crisis','Lambert-Eaton syndrome'],c:['breathing fails, limbs fairly strong','reflexes that improve with exercise']},
 muscle:{m:['periodic paralysis','thyrotoxic periodic paralysis','critical illness myopathy'],c:['episodes with a potassium change','weakness arising in intensive care']},
 toxin:{m:['botulism','tick paralysis'],c:['botulism: descends, no fever, alert','tick: search the whole body']}};
const DD_STEPS=[
 {from:0,at:.05,site:'nerve',k:'Stop 1 · roots and nerves',sv:'Roots and nerves: where GBS acts',sub:'and other neuropathies that act there too',
  t:'Roots and nerves: GBS and other neuropathies',
  txt:`GBS is an acute polyradiculoneuropathy, a disease of the nerve roots and peripheral nerves [[vanDoorn2023]]. Other neuropathies can look similar: about 5% first diagnosed with GBS turn out to have acute-onset CIDP [[vanDoorn2023]]; vasculitic neuropathy is asymmetric or multifocal and painful [[Collins2010]]; acute porphyria brings abdominal pain, psychological features and proximal asymmetric weakness [[Albers2004]] and is confirmed by a markedly raised urinary porphobilinogen [[Anderson2005]].`,
  pt:`GBS damages the nerves that run from the spinal cord to the muscles. A few other nerve diseases can look like it at first.`,
  hook:`Abdominal pain, psychological features and neuropathy: urinary porphobilinogen [[Albers2004,Anderson2005]].`},
 {from:.14,at:.19,site:'cord',k:'Stop 2 · spinal cord',sv:'Spinal cord: the commonest worry',sub:'myelitis, compression, abscess',
  t:'The spinal cord',
  txt:`Transverse myelitis is a focal inflammatory cord disorder causing motor, sensory and autonomic dysfunction; a sensory level, extensor plantars, hyperreflexia and a cord lesion on MRI point to it [[TMCWG2002,vanDoorn2023]]. In metastatic cord compression, new or worsening back pain may come before motor, sensory, bowel or bladder deficits, and whole-spine MRI is recommended [[Lawton2019]]. In spinal epidural abscess, fever, back pain and neurological symptoms come together in only about 10%, though most have severe localised back pain [[Tetsuka2020]].`,
  pt:`Problems in the spinal cord can also cause weak legs. A clear line on the body below which feeling is lost points to the cord.`,
  hook:`Sensory level + extensor plantars + hyperreflexia = think cord [[TMCWG2002,vanDoorn2023]].`},
 {from:.28,at:.33,site:'horn',k:'Stop 3 · anterior horn',sv:'Anterior horn cells: viral paralysis',sub:'polio, acute flaccid myelitis, West Nile',
  t:'Anterior horn cells: polio-like illnesses',
  txt:`Poliomyelitis and acute flaccid myelitis affect the anterior horn cells, with a feverish or respiratory prodrome, flaccid limb weakness and grey-matter changes in the cord on MRI [[Murphy2020,Murphy2021]]. In children, acute flaccid myelitis reached its worst point faster than GBS (median 3 against 8 days) and was asymmetric in 58% against 0% [[Helfferich2022]]. Of 32 people with West Nile virus paralysis, 84% had an asymmetric polio-like syndrome and 13% a Guillain-Barré-like one; fever was present in 91% [[Sejvar2005]].`,
  pt:`Some viruses attack the nerve cells inside the spinal cord. The weakness is often uneven and comes with a fever.`,
  hook:`Asymmetric flaccid weakness, fever and many CSF cells: think anterior horn cell infection [[Sejvar2005]].`},
 {from:.42,at:.47,site:'nmj',k:'Stop 4 · junction',sv:'Neuromuscular junction',sub:'myasthenia and Lambert-Eaton',
  t:'The neuromuscular junction',
  txt:`Myasthenia gravis is an antibody-mediated disease of the postsynaptic junction, with localised or general weakness [[Gilhus2019]]. Myasthenic crisis is worsening weakness causing respiratory failure that needs ventilation [[Wendell2011]], so severe breathing failure with only mild limb weakness points away from GBS [[vanDoorn2023,Leonhard2019]]. One person labelled GBS had Lambert-Eaton syndrome: a static 3-week course, ptosis, proximal weakness, normal sensation, and reflexes that improved with exercise [[Tham2018]].`,
  pt:`Myasthenia affects the place where nerve meets muscle. It can make breathing fail while the arms and legs are still fairly strong.`,
  hook:`Severe respiratory failure with mild limb weakness at onset is a red flag for GBS [[Leonhard2019]].`},
 {from:.56,at:.61,site:'toxin',k:'Stop 5 · toxins',sv:'Toxins: botulism and ticks',sub:'two mimics with a direct remedy',
  t:'Toxins: botulism and tick paralysis',
  txt:`Botulism starts with cranial nerve palsies, then a bilateral, symmetric, descending flaccid paralysis, proximal before distal, over hours to a few days; people stay alert, and sensory deficits and pain are rare [[Rao2021]]. Tick paralysis brings a prodrome, unsteady gait, then ascending symmetric flaccid paralysis, with normal conduction velocity and sensory studies [[GrattanSmith1997]]. Removing the tick leads to rapid improvement, and one expert advises never settling on GBS without searching the whole body for a tick [[Edlow2010]].`,
  pt:`A toxin from bacteria (botulism) or a tick bite can cause paralysis. Finding and removing a tick can make a person better quickly.`,
  hook:`Botulism descends, without fever, in an alert person [[Rao2021]].`},
 {from:.7,at:.75,site:'muscle',k:'Stop 6 · muscle',sv:'Muscle and potassium',sub:'periodic paralysis, critical illness',
  t:'Muscle and potassium',
  txt:`Periodic paralysis causes episodes of flaccid weakness, often triggered by diet or by rest after exercise, with a documented potassium change during attacks [[Statland2018]]. Thyrotoxic periodic paralysis typically affects an adult man without a family history, with high systolic pressure, a fast heart rate and low potassium; potassium can restore strength rapidly, with a risk of rebound high potassium [[Lin2005]]. Critical illness polyneuropathy and myopathy cause weakness and failure to wean that arise during critical illness [[Latronico2011]].`,
  pt:`Low potassium in the blood, or weakness that starts in intensive care, can also look like GBS.`,
  hook:`Periodic paralysis: episodes, with potassium change during attacks [[Statland2018]].`},
 {from:.84,at:.9,site:'brain',k:'Stop 7 · brain and brainstem',sv:'Brain and brainstem',sub:'mimics of the eye and balance variants',
  t:'Brain and brainstem: mimics of the variants',
  txt:`Miller Fisher syndrome and pharyngeal-cervical-brachial GBS are often mistaken for brainstem stroke, botulism or myasthenia, and Bickerstaff encephalitis for Wernicke's encephalopathy [[Wakerley2015]]. Altered consciousness casts doubt on GBS except in Bickerstaff encephalitis [[Leonhard2019]], and nystagmus or vomiting make GBS less likely [[vanDoorn2023]]. In several mimics of Miller Fisher syndrome, encephalopathy and nystagmus were the clues to Wernicke's encephalopathy with beriberi neuropathy [[Tham2018]].`,
  pt:`Some brain problems, such as a small stroke in the brainstem, can look like the GBS variants that affect the eyes and balance.`,
  hook:`Miller Fisher look-alikes: brainstem stroke, botulism, myasthenia; Bickerstaff look-alike: Wernicke's [[Wakerley2015]].`}];
const DD_GL={nerve:'a nerve fibre in GBS (schematic)',cord:'a sensory level',horn:'uneven weakness, fever',toxin:'from the head downward',muscle:'weakness in episodes',brain:'eyes, balance, alertness',nmj:'antibodies at the',nmj2:'junction (myasthenia)'};
const DD_TXT={path:'THE MOTOR PATHWAY',mim:'Look-alikes here',clue:'Clues that point here',click:'click a stop'};

/* the comparison explorer: rows of {f feature, g GBS, m mimic}; '' = no comparable figure in the sources */
const DD_CMP=[
 {k:'tm',b:'Transverse myelitis',rows:[
  {f:'Where',g:`Nerve roots and peripheral nerves [[vanDoorn2023]]`,m:`Focal inflammation of the spinal cord [[TMCWG2002]]`},
  {f:'Sensation',g:`Tingling from the feet and hands; relatively mild signs [[Leonhard2019]]`,m:`A sensory level [[TMCWG2002,vanDoorn2023]]`},
  {f:'Reflexes and plantars',g:`Reduced or absent reflexes [[vanDoorn2023]]`,m:`Hyperreflexia and extensor plantars [[TMCWG2002,vanDoorn2023]]`},
  {f:'Test that helps',g:`CSF protein, nerve conduction [[vanDoorn2023]]`,m:`Cord lesion on MRI [[TMCWG2002,vanDoorn2023]]`}],
  cap:`Whole-spine MRI with contrast can help exclude transverse myelitis, compression or tumour [[vanDoorn2023]].`},
 {k:'cc',b:'Cord compression',rows:[
  {f:'First symptom',g:`Tingling, pain or weakness [[Leonhard2019]]`,m:`New or worsening back pain may come first [[Lawton2019]]`},
  {f:'Then',g:`Weakness of both sides rising over days [[Leonhard2019]]`,m:`Motor, sensory, bowel or bladder deficits [[Lawton2019]]`},
  {f:'Test that helps',g:`Whole-spine MRI only to exclude other causes in atypical cases [[vanDoorn2023]]`,m:`Whole-spine MRI recommended [[Lawton2019]]`},
  {f:'Epidural abscess',g:'',m:`Fever, back pain and neurological symptoms together in only about 10%; gadolinium MRI is the most useful test [[Tetsuka2020]]`}],
  cap:`Bladder or bowel dysfunction at onset casts doubt on GBS [[Leonhard2019]].`},
 {k:'mg',b:'Myasthenic crisis',rows:[
  {f:'Disease',g:`Immune attack on nerves and roots [[Leonhard2019]]`,m:`Antibody-mediated disease of the postsynaptic junction [[Gilhus2019]]`},
  {f:'Breathing',g:`About 20% develop respiratory failure, alongside limb weakness [[Leonhard2019]]`,m:`Crisis: worsening weakness with respiratory failure needing ventilation [[Wendell2011]]`},
  {f:'Pattern at onset',g:`Limb weakness leads [[Leonhard2019]]`,m:`Severe breathing failure with mild limb weakness points away from GBS [[vanDoorn2023]]`},
  {f:'Sensation',g:`Sensory deficits in 59% at IGOS entry [[Doets2018]]`,m:''}],
  cap:`Miller Fisher syndrome and pharyngeal-cervical-brachial GBS are often mistaken for myasthenia [[Wakerley2015]].`},
 {k:'bot',b:'Botulism',rows:[
  {f:'Direction',g:`Usually starts in the legs and spreads up [[Leonhard2019]]`,m:`Cranial nerves first, then descending, proximal before distal [[Rao2021]]`},
  {f:'Tempo',g:`Most reach the worst point within 2 weeks [[Leonhard2019]]`,m:`Hours to a few days [[Rao2021]]`},
  {f:'Eyes',g:`Cranial nerve involvement in 50% at IGOS entry [[Doets2018]]`,m:`Ptosis 81%, diplopia 75%, dilated pupils 37% [[Rao2021]]`},
  {f:'Sensation',g:`Sensory deficits in 59% at IGOS entry [[Doets2018]]`,m:`Sensory deficits or paraesthesias in 17% [[Rao2021]]`},
  {f:'Fever, alertness',g:`Fever at onset casts doubt on GBS [[Leonhard2019]]`,m:`Afebrile 99%; altered mental status 8% [[Rao2021]]`},
  {f:'CSF',g:`Protein raised in 84% after day 7 [[Doets2018]]`,m:`Typically normal; mild protein rises are infrequent [[Rao2021]]`},
  {f:'Nerve test',g:`Conduction consistent with polyneuropathy, may be normal early [[vanDoorn2023]]`,m:`High-rate (30–50 Hz) repetitive stimulation classically shows an increment; early studies can be normal [[Rao2021]]`}],
  cap:`Figures for botulism are from 332 confirmed cases [[Rao2021]].`},
 {k:'tick',b:'Tick paralysis',rows:[
  {f:'Course',g:`Ascending weakness over days [[Leonhard2019]]`,m:`Prodrome, unsteady gait, then ascending symmetric flaccid paralysis [[GrattanSmith1997]]`},
  {f:'Eyes',g:`Cranial nerves in 50% at IGOS entry [[Doets2018]]`,m:`Early ophthalmoplegia in Australian cases [[GrattanSmith1997]]`},
  {f:'Nerve conduction',g:`Consistent with polyneuropathy [[vanDoorn2023]]`,m:`Normal conduction velocity and sensory studies; low-amplitude motor responses [[GrattanSmith1997]]`},
  {f:'What changes it',g:`Immunotherapy and supportive care [[Leonhard2019]]`,m:`Removal brings rapid improvement [[Edlow2010]]; Australian cases can worsen for 24–48 h after removal [[GrattanSmith1997]]`}],
  cap:`In 9 Louisiana children with tick paralysis, 4 had a delayed diagnosis; all recovered fully after removal [[Pontiff2021]].`},
 {k:'afm',b:'Acute flaccid myelitis (children)',rows:[
  {f:'Time to worst point',g:`Median 8 days (156 children)`,m:`Median 3 days (26 children)`},
  {f:'Asymmetric weakness',g:`0%`,m:`58%`},
  {f:'Sensory deficits',g:`40%`,m:`0%`},
  {f:'CSF',g:`Fewer cells, more protein`,m:`More cells, less protein`},
  {f:'MRI',g:`No cord lesion`,m:`Cord lesions, only in myelitis`}],
  cap:`All rows from one Dutch comparison [[Helfferich2022]]. Nerve root enhancement can occur in acute flaccid myelitis too, so it does not settle the question alone [[Leonhard2019]].`},
 {k:'wnv',b:'West Nile virus',rows:[
  {f:'Pattern',g:`Weakness of both sides, can be asymmetric [[Leonhard2019]]`,m:`Asymmetric polio-like syndrome in 84%; Guillain-Barré-like in 13% [[Sejvar2005]]`},
  {f:'Other signs',g:`Fever at onset casts doubt [[Leonhard2019]]`,m:`Fever 91%, tremor 66%, altered mental status 50% [[Sejvar2005]]`},
  {f:'CSF',g:`Usually under 5 cells/µl [[vanDoorn2023]]`,m:`Median 108 leukocytes/mm³ (range 0–740), protein 98 mg/dl [[Sejvar2005]]`},
  {f:'Tempo',g:`Most reach the worst point within 2 weeks [[Leonhard2019]]`,m:`Median 1 day to the worst point (polio-like), 4 days (Guillain-Barré-like) [[Sejvar2005]]`}],
  cap:`32 Colorado patients with West Nile virus paralysis [[Sejvar2005]].`},
 {k:'por',b:'Acute porphyria',rows:[
  {f:'Overlap',g:`Weakness, sensory symptoms, raised CSF protein [[Leonhard2019]]`,m:`Can resemble GBS in symptoms, signs and CSF [[Albers2004]]`},
  {f:'Clues',g:`Abdominal pain casts doubt on GBS [[Leonhard2019]]`,m:`Abdominal pain, psychological features, proximal asymmetric weakness, axonal electrodiagnosis [[Albers2004]]`},
  {f:'Test that helps',g:'',m:`Markedly raised urinary porphobilinogen on a single sample confirms rapidly [[Anderson2005]]`}],
  cap:`One mimic in a tertiary series had abdominal pain, tea-coloured urine, encephalopathy and a seizure before flaccid weakness of all four limbs [[Tham2018]].`},
 {k:'kpp',b:'Low potassium, periodic paralysis',rows:[
  {f:'Course',g:`One phase, worst point within 4 weeks [[vanDoorn2023]]`,m:`Episodes of flaccid weakness, often after diet triggers or rest after exercise [[Statland2018]]`},
  {f:'Blood test',g:`Routine blood tests usually normal; hyponatraemia may occur [[vanDoorn2023]]`,m:`Documented potassium change during attacks [[Statland2018]]`},
  {f:'Thyrotoxic form',g:'',m:`Adult man, no family history, high systolic pressure, fast heart rate, low potassium with low urinary potassium; rebound high potassium is a risk with treatment [[Lin2005]]`}],
  cap:`Blood tests including electrolytes are part of the published first work-up for everyone suspected [[Leonhard2019]].`},
 {k:'cidp',b:'Acute-onset CIDP',rows:[
  {f:'Worsening',g:`First fluctuation within 8 weeks, median 18 days [[Ruts2010]]`,m:`Again after 8 weeks, or 3 or more times [[Ruts2010,vanDoorn2023]]`},
  {f:'Cranial and breathing',g:`Cranial nerves in 50% at IGOS entry [[Doets2018]]`,m:`No facial, bulbar or respiratory weakness makes A-CIDP more likely [[vanDoorn2023]]`},
  {f:'Sensation',g:`Relatively mild sensory signs [[vanDoorn2023]]`,m:`Marked sensory abnormality, including sensory ataxia [[vanDoorn2023]]`},
  {f:'How common',g:'',m:`About 5% of people first diagnosed with GBS [[vanDoorn2023,Leonhard2019]]`}],
  cap:`Up to 16% of CIDP may present acutely [[Dionne2010]].`}];

/* schematic courses for the fluctuation widget: weeks -> disability (0 well .. 1 worst); ev = weeks when a new
   deterioration starts (the first GBS fluctuation sits at the published median, 18 days) */
const DD_FL={
 gbs:{pts:[ [0,0],[1,.5],[1.8,.74],[2.6,.5],[3.3,.68],[5,.46],[8,.28],[11,.18],[14,.12] ],ev:[2.6],tx:1.6,late:null,
  done:`One deterioration, within 8 weeks: the pattern of a treatment-related fluctuation in GBS. In the prospective study, the first fluctuation always came within 8 weeks (median 18 days) and none had more than two [[Ruts2010]].`},
 cidp:{pts:[ [0,0],[1.5,.5],[2.4,.62],[3,.44],[4,.62],[5,.44],[6.2,.6],[7.5,.42],[9.6,.68],[11,.56],[14,.6] ],ev:[3,5,7.5],tx:2,late:8.2,
  done:`Three deteriorations, the last continuing past week 8: both published prompts for A-CIDP. Worsening after 8 weeks has a sensitivity of 100% and specificity of 92%; 3 or more fluctuations, 52% and 96% [[vanDoorn2023]].`}};
const DD_FLTXT={wk:'Week {w} of 14. Scrub or press Play to follow the course.',y:'disability (schematic)',x:'weeks from weakness onset',w8:'8 weeks',tx:'treatment',n:'deteriorations so far',late:'worsening after week 8',yes:'yes',no:'not yet',better:'better',worse:'worse'};

inits.ddx=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- main player ---------- */
  const svg=$('#ddSvg'),rg=$('#ddT'),note=$('#ddNote');let setSt=()=>{},stop=()=>{};
  function chips(x,y,w,list,N){let s='',cx=x,cy=y;const h=22;
    list.forEach((m,i)=>{const cw=m.length*6.3+18;if(cx+cw>x+w){cx=x;cy+=h+6}
      const gbs=m==='GBS';s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${h}" rx="11" style="fill:${gbs?'var(--dx-soft)':'var(--panel-2)'};stroke:${gbs?'var(--dx)':'var(--line)'}"/>`+T(cx+cw/2,cy+15,m,'t-sm t-mid',gbs?'fill:var(--dx);font-weight:700':'fill:var(--ink)');cx+=cw+6});
    return {svg:s,y:cy+h}}
  /* a small drawing for each stop, centred in the free space at the bottom of the card (cx, cy = its centre) */
  function glyph(k,cx,cy,w,t){const bs=118,by=cy-bs/2,kk=bs/146,P=(a,b)=>[cx-50+a*kk,by+(b+50)*kk],bx=cx-50;let s='';
    const lab=(txt)=>kitLabel(bx+34,cy+4,txt);
    if(k==='nerve'){const W=Math.min(w,320);return T(cx-W/2,cy-40,DD_GL.nerve,'t-xs',INK)+nerveFibre(cx-W/2,cy,W,{n:4,h:26,demy:[.6,.9,.4,0],mac:[0,.8,0,0],pulse:(t*8)%1,block:2}).svg}
    if(k==='cord'){s=bodyFront(bx,by,bs,{level:.42}).svg;const ly=P(0,2)[1];return s+`<line x1="${f1(bx-26)}" x2="${f1(bx+26)}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:var(--bad);stroke-width:2.2;stroke-dasharray:4 3"/>`+lab(DD_GL.cord)}
    if(k==='horn'){s=bodyFront(bx,by,bs).svg;const a=P(-17,34),b=P(-3,94);return s+`<rect x="${f1(a[0])}" y="${f1(a[1])}" width="${f1(b[0]-a[0])}" height="${f1(b[1]-a[1])}" rx="5" style="fill:var(--weak);opacity:.7"/>`+lab(DD_GL.horn)}
    if(k==='toxin')return bodyFront(bx,by,bs,{zones:{eyes:1,face:.9,neck:.8,arms:.6,trunk:.35}}).svg+lab(DD_GL.toxin);
    if(k==='muscle')return bodyFront(bx,by,bs,{zones:{legs:.8,arms:.8,trunk:.4}}).svg+lab(DD_GL.muscle);
    if(k==='brain')return bodyFront(bx,by,bs,{zones:{eyes:1,face:.5}}).svg+lab(DD_GL.brain);
    if(k==='nmj'){const x0=cx-120,y=cy;s+=`<path d="M${x0} ${y-34}H${x0+70}Q${x0+96} ${y-34} ${x0+100} ${y-14}" style="fill:none;stroke:var(--axon-line);stroke-width:7;stroke-linecap:round"/>`;
      s+=`<ellipse cx="${x0+104}" cy="${y-8}" rx="26" ry="14" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.4"/>`;
      s+=`<rect x="${x0+40}" y="${y+12}" width="130" height="30" rx="8" style="fill:var(--muscle);opacity:.85"/>`;
      for(let i=0;i<6;i++){const rx=x0+78+i*10;s+=`<rect x="${rx-2.5}" y="${y+6}" width="5" height="9" rx="2" style="fill:var(--nav);stroke:var(--ink);stroke-width:.6"/>`;if(i%2===0)s+=antibody(rx,y+5,12,{ang:180})}
      return s+kitLabel(x0+176,y+4,DD_GL.nmj)+kitLabel(x0+176,y+18,DD_GL.nmj2)}
    return ''}
  function draw(t){const N=vb(svg,'720 400','400 680'),p=phaseOf(DD_STEPS,t),P=DD_STEPS[p],site=P.site;
    const L=N?{tx:12,ty:22,rx:14,ry:50,rw:372,rh:30,rg:4,dx:14,dy:300,dw:372,dh:366}
             :{tx:16,ty:24,rx:16,ry:56,rw:224,rh:42,rg:6,dx:258,dy:56,dw:446,dh:330};
    let s=T(L.tx,L.ty,P.sv,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    /* pathway rows */
    const lx=L.rx+12,y0=L.ry+L.rh/2,y1=L.ry+(DD_ROWS.length-2)*(L.rh+L.rg)+L.rh/2;
    s+=`<line x1="${lx}" x2="${lx}" y1="${f1(y0)}" y2="${f1(y1)}" style="stroke:var(--line);stroke-width:3"/>`;
    DD_ROWS.forEach((r,i)=>{const y=L.ry+i*(L.rh+L.rg),on=r.k===site,tox=r.k==='toxin';
      s+=`<g class="clk" data-dds="${r.k}"><rect x="${f1(L.rx)}" y="${f1(y)}" width="${f1(L.rw)}" height="${L.rh}" rx="9" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1};${tox?'stroke-dasharray:5 3':''}"/>`;
      s+=`<circle cx="${lx}" cy="${f1(y+L.rh/2)}" r="${on?7:5}" style="fill:${on?'var(--dx)':'var(--panel-2)'};stroke:var(--ink);stroke-width:1"/>`;
      s+=T(lx+16,y+L.rh/2+4,N?r.sn:r.n,'t-sm',on?'fill:var(--dx);font-weight:700':'fill:var(--ink)')+'</g>'});
    /* the travelling signal (brain to muscle) */
    const u=(t*6)%1,sy=lerp(y0,y1,u);s+=`<circle cx="${lx}" cy="${f1(sy)}" r="4" style="fill:var(--impulse);stroke:var(--ink);stroke-width:1"/>`;
    /* the card */
    const C=DD_CARD[site],a=1;s+=`<rect x="${L.dx}" y="${L.dy}" width="${L.dw}" height="${L.dh}" rx="12" style="fill:var(--panel);stroke:var(--dx);stroke-width:1.4"/>`;
    const ix=L.dx+14,iw=L.dw-28;let cy=L.dy+22;
    s+=T(ix,cy,DD_TXT.mim.toUpperCase(),'t-xs','letter-spacing:.1em;fill:var(--dx);font-weight:700');
    const ch=chips(ix,cy+8,iw,C.m,N);s+=ch.svg;cy=ch.y+24;
    s+=T(ix,cy,DD_TXT.clue.toUpperCase(),'t-xs','letter-spacing:.1em;fill:var(--dx);font-weight:700');
    C.c.forEach((c,i)=>{const yy=cy+22+i*22,ap=clamp(ramp(t,P.from,P.from+.06)*C.c.length-i);
      s+=`<g style="opacity:${f1(.25+.75*ap)}"><path d="M${ix} ${yy-5}l4 4l7 -8" style="fill:none;stroke:var(--dx);stroke-width:2;stroke-linecap:round"/>`+T(ix+18,yy,c,'t-lbl','font-weight:500')+'</g>'});
    const top=cy+22+C.c.length*22,bot=L.dy+L.dh-8,gc=(top+bot)/2;
    if(bot-top>=(site==='nerve'?60:126))s+=`<g style="opacity:${f1(ramp(t,P.from,P.from+.04))}">`+glyph(site,L.dx+L.dw/2,gc,iw,t)+'</g>';
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  stop=playWire(rg,$('#ddPlay'),draw,21000,'%t:player.replay%','ddx');
  setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dds]');if(!g)return;const i=DD_STEPS.findIndex(s=>s.site===g.dataset.dds);if(i<0)return;stop();rg.value=DD_STEPS[i].at;draw(DD_STEPS[i].at)});
  draw(+rg.value);

  /* ---------- comparison explorer ---------- */
  const pick=$('#ddPick'),tb=$('#ddCmp'),hd=$('#ddMimicHead'),cc=$('#ddCmpCap');let cur=3;
  pick.innerHTML=DD_CMP.map((c,i)=>`<button class="btn" data-ddm="${i}" aria-pressed="false">${c.b}</button>`).join('');
  function cmpUpd(){const C=DD_CMP[cur];hd.textContent=C.b;
    tb.innerHTML=C.rows.map(r=>`<tr><th>${r.f}</th><td>${r.g||'—'}</td><td>${r.m||'—'}</td></tr>`).join('');
    cc.innerHTML=C.cap;$$('[data-ddm]',pick).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ddm===cur))}
  pick.addEventListener('click',e=>{const b=e.target.closest('[data-ddm]');if(!b)return;cur=+b.dataset.ddm;cmpUpd()});
  cmpUpd();

  /* ---------- fluctuation or A-CIDP ---------- */
  const fl=$('#ddFl'),frg=$('#ddFlT'),fcap=$('#ddFlCap');let sc='gbs';const fns={gbs:monoFn(DD_FL.gbs.pts),cidp:monoFn(DD_FL.cidp.pts)};
  function flDraw(t){const N=vb(fl,'720 300','400 380'),F=DD_FL[sc],f=fns[sc],wk=14*t;
    const L=N?{x:40,y:20,w:344,h:220,ry:300}:{x:56,y:20,w:480,h:220,rx:560};
    const c=curve(L.x,L.y,L.w,L.h,f,{x0:0,x1:14,y0:0,y1:1,upto:wk,col:'var(--weak)',fill:true,dot:true}),X=c.X,Y=c.Y;let s=c.svg;
    for(let w=0;w<=14;w+=2)s+=T(X(w),L.y+L.h+14,w,'t-xs t-mid');
    s+=T(L.x+L.w,L.y+L.h+30,DD_FLTXT.x,'t-xs t-end');
    s+=T(L.x-6,Y(1)+10,DD_FLTXT.worse,'t-xs t-end')+T(L.x-6,Y(0),DD_FLTXT.better,'t-xs t-end');
    s+=`<line x1="${f1(X(8))}" x2="${f1(X(8))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:5 4"/>`+kitLabel(X(8)+5,L.y+14,DD_FLTXT.w8,{halo:'var(--field)'});
    s+=`<path d="M${f1(X(F.tx))} ${L.y+L.h}V${L.y+L.h-14}" style="stroke:var(--rx);stroke-width:2"/>`+kitLabel(X(F.tx)+4,L.y+L.h-18,DD_FLTXT.tx,{halo:'var(--field)'});
    let n=0,late=false;F.ev.forEach((e,i)=>{if(wk<e+.15)return;n++;const x=X(e),y=Y(f(e));
      s+=`<circle cx="${f1(x)}" cy="${f1(y+16)}" r="9" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`+T(x,y+19.5,i+1,'t-xs t-mid','fill:var(--bad);font-weight:700')});
    if(F.late!=null&&wk>=F.late)late=true;
    /* counter */
    const rx=N?L.x:L.rx,ry=N?L.ry:L.y+20;
    s+=T(rx,ry,DD_FLTXT.n,'t-xs')+T(rx,ry+28,String(n),'t-big','font-size:28px;fill:'+(n>=3?'var(--bad)':'var(--ink)'));
    s+=T(N?rx+170:rx,N?ry:ry+60,DD_FLTXT.late,'t-xs')+T(N?rx+170:rx,N?ry+26:ry+86,late?DD_FLTXT.yes:DD_FLTXT.no,'t-lbl',late?'fill:var(--bad)':'');
    fl.innerHTML=s;
    fcap.innerHTML=t>=.999?F.done:DD_FLTXT.wk.replace('{w}',wk.toFixed(1))}
  const fstop=playWire(frg,$('#ddFlPlay'),flDraw,12000,'%t:player.replay%','ddx');
  $$('[data-ddc]').forEach(b=>b.addEventListener('click',()=>{fstop();sc=b.dataset.ddc;$$('[data-ddc]').forEach(x=>x.setAttribute('aria-pressed',x===b));flDraw(+frg.value)}));
  flDraw(+frg.value);
  const prev=redraws.ddx;redraws.ddx=()=>{prev&&prev();cmpUpd()};
};
