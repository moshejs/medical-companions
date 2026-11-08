/* =============== 1.4 Causes of ischaemic stroke =============== */
/* Main player: one timeline, three sources (heart, carotid plaque, small vessel), four steps. Then: subtype bars by
   population, ESUS trial dots, a CRYSTAL AF scrubber and a younger-people explorer (dissection, PFO, sickle cell). */
const CAUS_BASE=[{from:0,at:.1,t:'The source'},{from:.25,at:.38,t:'A clot forms'},{from:.5,at:.66,t:'The vessel blocks'},{from:.78,at:.92,t:'The damage'}];
const CAUS_TXT={
 heart:[
  {k:'Heart · cardioembolism',t:'The atria quiver',txt:'In Framingham, AF raised stroke risk nearly fivefold, and the risk attributable to it rose from 1.5% at age 50-59 to 23.5% at 80-89 [[Wolf1991]]. A later review gives a 3 to 5 fold rise and 33 million people affected [[Kamel2017]].',pt:'Many strokes come from clots made in the heart [[Ornello2018]].'},
  {k:'Heart · cardioembolism',t:'A clot forms in the heart',txt:'Drawn here in the left atrial appendage. AF was present in 24.6% of 3,530 first-ever strokes in a population-based registry [[Marini2005]] and 28% of 2,144 ischaemic strokes in an international survey: North America 35%, Europe 33%, Latin America 17% [[Perera2016]]. Oral anticoagulants prevent up to 70% of these strokes, says one review [[Kamel2017]].'},
  {k:'Heart · cardioembolism',t:'A piece travels to the brain',txt:'In the survey, people with AF were older, mean age 75 vs 64, and 30-day mortality was 10% vs 4% [[Perera2016]]. Registry case fatality was 32.5% at 30 days and 49.5% at 1 year [[Marini2005]].',hook:'Framingham: AF raised stroke risk nearly fivefold [[Wolf1991]].'},
  {k:'Heart · cardioembolism',t:'A territory is lost',txt:'Pooled cardioembolic share 22% (20-23), and 28% (26-29) in white populations, rising 2.4% per year there [[Ornello2018]]. In one TIA clinic the cardioembolic share rose from 26% to 56% between 2002 and 2012 [[Bogiatzi2014]].'}],
 carotid:[
  {k:'Neck artery · large-artery atherosclerosis',t:'Plaque builds at the carotid fork',txt:'In Greater Cincinnati in 2005 (2,204 ischaemic strokes), large-vessel causes were 16.6%, internal carotid stenosis 8.0%, and occlusion and intracranial disease 3.5% each [[Flaherty2013]].',pt:'Narrowed or blocked arteries are one of the main sources of stroke [[Ornello2018]].'},
  {k:'Neck artery · large-artery atherosclerosis',t:'Over 50% narrowed',txt:'TOAST large-artery disease needs stenosis over 50% in the corresponding artery, as restated in a later review [[Kim2014]]. An embolic infarct with under 50% stenosis becomes undetermined [[Kim2014]].',hook:'TOAST has five categories; large-artery needs over 50% stenosis [[Adams1993,Kim2014]].'},
  {k:'Neck artery · large-artery atherosclerosis',t:'A piece travels on',txt:'This drawing shows one route, a fragment carried upward from the plaque. Disease can also sit inside the skull: annual symptomatic intracranial incidence is 3, 13 and 15 per 100,000 in white, Hispanic and African American people, 9%, 15% and 17% of their strokes [[Banerjee2017]].'},
  {k:'Neck artery · large-artery atherosclerosis',t:'A territory is lost',txt:'Pooled large-artery share 23% (21-25), and 33% (31-36) in Asian populations, rising 5.7% per year there [[Ornello2018]]. Erlangen found it more than twice as often in men: 23.6 vs 9.2 per 100,000 [[Kolominsky2001]].'}],
 small:[
  {k:'Small vessel · lacunar',t:'Tiny end arteries',txt:'Penetrating arteries measure 400-900 micrometres. Sites include lenticulostriate, anterior choroidal, thalamoperforating and basilar paramedian branches [[Venkataraman2024]]. They are end arteries [[Gore2026]].',pt:'Some strokes come from disease in the tiniest vessels deep in the brain [[Ornello2018]].'},
  {k:'Small vessel · lacunar',t:'The wall changes',txt:'Small vessel disease involves endothelial dysfunction and barrier leak [[Wardlaw2019,Pantoni2010]]. Fisher tied small lacunes to lipohyalinosis, and larger ones to atheromatous or embolic mechanisms [[Fisher1982]].'},
  {k:'Small vessel · lacunar',t:'It closes where it sits',txt:'In this drawing nothing travels. The vessel closes in place, and silent lesions occur in 20-50% of older adults [[Gore2026]].',hook:'Five classic lacunar syndromes: pure motor, pure sensory, sensorimotor, ataxic hemiparesis, dysarthria-clumsy hand [[Arboix2009]].'},
  {k:'Small vessel · lacunar',t:'A small deep infarct',txt:'TOAST limits small-vessel occlusion to subcortical lesions under 15 mm, as restated by review; SSS-TOAST and CCS widened that to 20 mm [[Kim2014]]. A lesion over 20 mm is likely striatocapsular, and lacunar lesions on diffusion imaging went on to cavitate in 28-94% [[Wardlaw2013]]. Pooled small-artery share 22% (21-24) [[Ornello2018]].'}]};
const CAUS_STAT={
 heart:{name:'SOURCE: THE HEART',lines:['AF: atria quiver, no clot yet','a clot grows in the appendage','a fragment travels to the brain','the MCA territory is lost'],sub:'TOAST: cardioembolism',share:'pooled share 22%'},
 carotid:{name:'SOURCE: A NECK ARTERY',lines:['plaque narrows the carotid','a clot forms on the plaque','a fragment travels to the brain','the MCA territory is lost'],sub:'TOAST: large-artery atherosclerosis',share:'pooled share 23%'},
 small:{name:'SOURCE: A SMALL VESSEL',lines:['a tiny artery deep in the brain','its wall thickens','it closes where it sits','a small deep infarct'],sub:'TOAST: small-vessel occlusion',share:'pooled share 22%'}};
const CAUS_ROWS=[ ['ce','Cardioembolic'],['la','Large artery'],['sv','Small vessel'],['ot','Other determined'],['ud','Undetermined'],['di','Dissection'],['co','More than one'] ];
const CAUS_POPS=[
 {id:'pooled',n:'Pooled, 65 studies',v:{ce:22,la:23,sv:22,ot:3,ud:26},cap:'<b>Pooled over 65 population studies.</b> Cardioembolic 22% (20-23), large artery 23% (21-25), small artery 22% (21-24), other 3%, undetermined 26% (24-28) [[Ornello2018]].'},
 {id:'white',n:'White, pooled',v:{ce:28},cap:'<b>White populations, pooled.</b> Only the headline figure is recorded here: cardioembolic 28% (26-29) [[Ornello2018]].'},
 {id:'asian',n:'Asian, pooled',v:{la:33},cap:'<b>Asian populations, pooled.</b> Only the headline figure is recorded here: large artery 33% (31-36). A pooled Chinese vs white comparison disagrees, with no clear evidence of different ischaemic subtypes [[Ornello2018,Tsai2013]].'},
 {id:'london',n:'London',dp:1,v:{ce:27.8,la:9.3,sv:27.0,ot:3.4,ud:24.2,co:8.2},cap:'<b>London, 1,181 people.</b> Large artery only 9.3%. Black vs white incidence rate ratio 1.25 [[Hajat2011]].'},
 {id:'auck',n:'Auckland',v:{ce:29,la:15,sv:21,ot:5,ud:31},cap:'<b>Auckland.</b> Of all strokes 81% were ischaemic, 13% intracerebral and 5% subarachnoid. These bars are shares of the ischaemic strokes [[Krishnamurthi2018]].'},
 {id:'german',n:'Germany',dp:1,v:{ce:25.6,la:20.9,sv:20.5},cap:'<b>German Stroke Data Bank, 5,017 people.</b> Cardioembolic 25.6%, large artery 20.9%, small vessel 20.5% [[Grau2001]].'},
 {id:'young',n:'Helsinki, age 15-49',v:{ce:20,la:8,sv:14,ud:33,di:15},cap:'<b>Helsinki, 1,008 people aged 15 to 49.</b> Dissection 15% is a row the other sources here do not report; undetermined is largest at 33% [[Putaala2009]].'}];
const CAUS_YG={
 diss:{lab:'Timeline',cap:'Schematic, not to scale. The bars are measured figures from one population study [[Lee2006]].',
  facts:'<h4>Dissection</h4><p>A tear in a neck artery wall. It presents with headache, neck pain, Horner syndrome or cranial nerve palsy, and most people then have a stroke or TIA [[Debette2009]].</p><ul><li>Population incidence 2.6 per 100,000: carotid 1.72, vertebral 0.97. Good outcome in 92% [[Lee2006]]. CADISP compared carotid and vertebral disease in 982 people [[Debette2011]].</li><li>Age 60 or over made up 7.4%, with less pain [[Traenka2017]].</li><li>CADISS: stroke recurrence 2% (4 of 250), 3 of 126 on antiplatelet vs 1 of 124 on anticoagulant; imaging failed to confirm dissection in 52 [[Markus2015]].</li><li>TREAT-CAD: composite 23% with aspirin vs 15%, so aspirin was not shown non-inferior; ischaemic strokes 7 vs 0 [[Engelter2021]]. Which antithrombotic is best remains a controversy.</li></ul><div class="hook"><b>Exam hook</b>Dissection accounts for 15% of stroke at ages 15-49 in one large cohort [[Putaala2009]].</div>'},
 pfo:{lab:'RoPE stratum',cap:'The flap is schematic. Bars are the published strata of the RoPE score, not a prediction for any person [[Nouh2016]].',
  facts:'<h4>Patent foramen ovale (PFO)</h4><p>A flap-like opening between the atria, found in 27.3% of 965 hearts at autopsy, falling with age from 34.3% to 25.4% to 20.2%, mean size 4.9 mm [[Hagen1984]]. Common, so finding one does not settle the cause. RoPE sorts how likely it is to matter: PFO prevalence rises from 23% to 73% across scores [[Kent2013]].</p><ul><li>Adults under 55 with stroke: PFO 40% vs 10% of controls, and 54% in the 26 with no identifiable cause [[Lechat1988]]. Under 55: PFO OR 3.10, atrial septal aneurysm 6.14, both 15.59 [[Overell2000]].</li><li>Closure trials: CLOSE 0 of 238 vs 14 of 235, HR 0.03, AF 4.6% vs 0.9% [[Mas2017]]. RESPECT 0.58 vs 1.07 per 100 person-years, HR 0.55 [[Saver2017]]. REDUCE 1.4% vs 5.4%, HR 0.23, AF 6.6% [[Sondergaard2017]].</li><li>SCOPE pooled 3,740 people: PFO-associated stroke is about 10% of ischaemic stroke at ages 18-60. By PASCAL category HR was unlikely 1.14, possible 0.38, probable 0.10; AF excess 4.41%, 1.53%, 0.65% [[Kent2021]].</li><li>The top stratum attributable fraction is about 90% in one report and 88% in the stratum table [[Kent2013,Nouh2016]]. See <button class="btn ghost" data-go="carotid">Carotid disease and PFO</button></li></ul>'},
 sick:{lab:'Doppler velocity',cap:'A teaching slider, not a test result. The 200 cm/s line is the STOP trial entry threshold [[Adams1998]]; markers show the TWiTCH mean velocities [[Ware2016]].',
  facts:'<h4>Sickle cell disease</h4><p>Children can be screened with transcranial Doppler (TCD), which measures flow velocity in brain arteries.</p><ul><li>STOP: children with velocity of 200 cm/s or more, 130 children, transfusion to keep HbS under 30%. Standard care 10 infarcts plus 1 haematoma vs 1 infarct with transfusion, a 92% difference [[Adams1998]].</li><li>TWiTCH: 143 vs 138 cm/s; hydroxycarbamide non-inferior to transfusion for TCD velocity [[Ware2016]].</li><li>SIT, silent infarcts: 2.0 vs 4.8 per 100 years, incidence rate ratio 0.41 [[DeBaun2014]]. Silent infarct is a risk factor for adults too [[Jordan2018]].</li><li>ASH 2020: TCD and hydroxyurea in low-middle income settings; MRI once in early school age and once in adults [[DeBaun2020]].</li></ul><div class="hook"><b>Exam hook</b>The STOP threshold is transcranial Doppler of 200 cm/s or more [[Adams1998]].</div>'}};
const CAUS_ROPE=[{s:'0-3',a:0,r:20},{s:'4',a:38,r:12},{s:'5',a:34,r:7},{s:'6',a:62,r:8},{s:'7',a:72,r:6},{s:'8',a:84,r:6},{s:'9-10',a:88,r:2}];
function causTx(x,y,str,cls,st){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls||'t-sm'}"${st?` style="${st}"`:''}>${str}</text>`}
/* a point at fraction u along a polyline */
function causAlong(P,u){const L=[0];for(let i=1;i<P.length;i++)L[i]=L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);
  const d=clamp(u)*L[L.length-1];let i=1;while(i<P.length-1&&L[i]<d)i++;const k=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}
inits.causes=()=>{
  /* ---------- the source player ---------- */
  const svg=$('#csSvg'),rg=$('#csT');let src='heart';
  function tube(P,ph){const C=crPts(P,false,10),d=ptsD(C);
    return {C,svg:`<path d="${d}" style="fill:none;stroke:var(--artery-line);stroke-width:9;stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:var(--artery);stroke-width:6.5;stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:var(--wm);stroke-width:1.5;stroke-dasharray:5 11;stroke-dashoffset:${f1(-ph*60)};opacity:.8"/>`}}
  function drawEmbolic(N,t){const ph=t*3,hrt=src==='heart',L=N?{bx:50,by:40,bs:1,hx:100,hy:440,hs:.95,cx:112,cy:400,cs:1,tx:386,ty:356,sx:14,sy:650}:{bx:395,by:30,bs:1.05,hx:20,hy:205,hs:.95,cx:40,cy:165,cs:1,tx:14,ty:24,sx:395,sy:330};
    let s='',P,bas='';
    const uHit=ramp(t,.72,.76),uLes=ramp(t,.78,.98);
    const b=brainSide(L.bx,L.by,L.bs,{vessels:uHit>0?{occl:'m1',ph:t*3,flow:1}:{ph:t*3,flow:1},lesion:uLes>0?{at:null,core:6+30*uLes,penumbra:10+56*uLes,mca:true}:undefined});
    const m1=b.at.m1;
    if(hrt){const H=heartAF(L.hx,L.hy,L.hs,{af:ramp(t,.02,.12),ph:t*3,thrombus:ramp(t,.25,.46)*(1-.45*ramp(t,.5,.52)),embolus:t>.5&&t<.6?ramp(t,.5,.6):0,labels:true});
      bas=H.svg;const e=H.at.exit;P=N?[ [e[0],e[1]],[e[0]-6,e[1]-50],[m1[0]+6,m1[1]+80],[m1[0],m1[1]] ]:[ [e[0],e[1]],[e[0]+9,e[1]-34],[e[0]+80,e[1]-26],[e[0]+200,e[1]+36],[m1[0]-78,m1[1]+66],[m1[0]-20,m1[1]+36],[m1[0],m1[1]] ]}
    else{const C=carotidBif(L.cx,L.cy,L.cs,{stenosis:lerp(.08,.72,ramp(t,.03,.3)),flow:1,ph:t*3,labels:true});
      bas=C.svg;const e=C.at.ica;P=N?[ [e[0],e[1]],[e[0]-4,e[1]-40],[m1[0]+2,m1[1]+70],[m1[0],m1[1]] ]:[ [e[0],e[1]],[e[0]+8,e[1]-50],[e[0]+112,e[1]-50],[e[0]+240,e[1]+50],[m1[0]-78,m1[1]+66],[m1[0]-20,m1[1]+36],[m1[0],m1[1]] ];
      const gr=ramp(t,.25,.48),pa=C.at.plaque;
      if(gr>0&&t<.5)bas+=clot(pa[0]+2,pa[1],6+9*gr,{kind:'white',seed:4});
      else if(t>=.5)bas+=clot(pa[0]+2,pa[1],9,{kind:'white',seed:4});
      if(t>=.5&&t<.6){const q=causAlong([ pa,C.at.ica ],ramp(t,.5,.6));bas+=clot(q[0],q[1],10,{seed:3})}}
    const T=tube(P,ph);
    s+=b.svg+T.svg+bas;
    if(t>=.6&&t<.74){const q=causAlong(T.C,ramp(t,.6,.73));s+=clot(q[0],q[1],13,{seed:3})}
    const St=CAUS_STAT[src],ph4=phaseOf(CAUS_BASE,t);
    s+=causTx(L.tx,L.ty,St.name,N?'t-xs t-end':'t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=kitLabel(m1[0]+(N?18:-6),m1[1]+(N?4:-12),'MCA',{a:N?undefined:'e'});
    s+=causTx(L.sx,L.sy,St.lines[ph4],'t-lbl');
    if(t>=.78){s+=causTx(L.sx,L.sy+22,St.sub,'t-sm','fill:var(--ink)')+causTx(L.sx,L.sy+40,St.share,'t-sm')}
    return s}
  function drawSmall(N,t){const L=N?{ax:80,ay:40,as:1,x:20,y:410,w:360,tl:372,sx:14,sy:540,zy:396}:{ax:430,ay:30,as:1.1,x:24,y:190,w:340,tl:24,sx:24,sy:320,zy:176};
    const c=brainAxial(L.ax,L.ay,L.as,{orient:true}),p=c.at.lentiform,u1=ramp(t,.28,.5),u2=ramp(t,.5,.72),u3=ramp(t,.78,.96);
    const a=artery(L.x,L.y,L.w,{h:84,flow:1-u2*.98,ph:t*3,plaque:.15+.6*u1,plaqueAt:.45,clot:u2,at:.45});
    let s=c.svg;
    if(u3>0)s+=`<path d="${blob(p[0],p[1],3+8*u3*L.as,5,{n:14,rough:.14})}" style="fill:var(--core);stroke:var(--artery-line);stroke-width:1"/>`;
    /* leader from the zoomed artery to the deep brain */
    s+=`<path d="M${f1(N?L.x+L.w*.75:L.x+L.w)} ${f1(N?L.y:L.y+42)}L${f1(p[0])} ${f1(p[1])}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:4 3;fill:none"/><circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.5" style="fill:var(--muted)"/>`;
    s+=a.svg;
    s+=causTx(L.x,L.zy,'a penetrating artery, enlarged','t-sm','fill:var(--ink)');
    const St=CAUS_STAT.small,ph4=phaseOf(CAUS_BASE,t);
    s+=causTx(N?14:L.x,24,St.name,'t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=causTx(L.sx,L.sy,St.lines[ph4],'t-lbl');
    if(t>=.78){s+=causTx(L.sx,L.sy+22,St.sub,'t-sm','fill:var(--ink)')+causTx(L.sx,L.sy+40,St.share,'t-sm')+causTx(L.sx,L.sy+58,'TOAST size limit: under 15 mm (as restated)','t-sm')}
    return s}
  function draw(t){const N=vb(svg,'720 430',src==='small'?'400 620':'400 720');
    svg.innerHTML=src==='small'?drawSmall(N,t):drawEmbolic(N,t);
    const p=phaseOf(CAUS_BASE,t);setSt(p);$('#csNote').innerHTML=noteHTML(CAUS_TXT[src][p])}
  const stop=playWire(rg,$('#csPlay'),draw,16000,'%t:player.replay%','causes');
  const setSt=stepWire($('#csSteps'),CAUS_BASE,rg,draw,stop);
  $$('[data-cssrc]').forEach(b=>b.addEventListener('click',()=>{stop();src=b.dataset.cssrc;$$('[data-cssrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- subtype bars ---------- */
  const ps=$('#csPop'),pcap=$('#csPopCap'),pb=$('#csPopBtns');let pop=0,cur={},pStop=null;
  pb.innerHTML=CAUS_POPS.map((p,i)=>`<button class="btn" data-cspop="${i}" aria-pressed="${i===0}">${p.n}</button>`).join('');
  CAUS_ROWS.forEach(r=>{cur[r[0]]=CAUS_POPS[0].v[r[0]]||0});
  function drawPop(){const N=vb(ps,'720 320','400 340'),rows=CAUS_ROWS,P=CAUS_POPS[pop],lx=N?10:14,bx=N?120:170,bw=N?(400-120-58):(720-170-90),top=N?30:26,rh=N?42:38,sc=v=>bw*v/40;
    let s=causTx(lx,16,P.n.toUpperCase(),'t-xs','letter-spacing:.08em;fill:var(--ink)');
    [0,10,20,30,40].forEach(v=>{const x=bx+sc(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-4}" y2="${f1(top+rh*rows.length)}" class="grid"/>`+causTx(x,top+rh*rows.length+14,v+'%','t-xs t-mid')});
    rows.forEach((r,i)=>{const y=top+i*rh,v=cur[r[0]]||0,real=P.v[r[0]],pv=CAUS_POPS[0].v[r[0]];
      s+=causTx(lx,y+rh/2+4,r[1],N?'t-sm':'t-lbl','fill:var(--ink)');
      s+=`<rect x="${f1(bx)}" y="${f1(y+7)}" width="${f1(bw)}" height="${f1(rh-16)}" rx="4" style="fill:var(--panel-2)"/>`;
      if(v>.05)s+=`<rect x="${f1(bx)}" y="${f1(y+7)}" width="${f1(sc(v))}" height="${f1(rh-16)}" rx="4" style="fill:var(--brand)"/>`;
      if(pv!=null)s+=`<rect x="${f1(bx+sc(pv)-1.5)}" y="${f1(y+3)}" width="3" height="${f1(rh-8)}" style="fill:var(--accent)"/>`;
      if(real!=null)s+=causTx(Math.max(bx+sc(v),pv!=null?bx+sc(pv):0)+7,y+rh/2+4,(P.dp?real.toFixed(1):real)+'%','t-lbl');
      else s+=causTx(bx+bw+(N?4:8),y+rh/2+4,'not given',N?'t-xs':'t-sm')});
    ps.innerHTML=s;pcap.innerHTML=P.cap+' <span class="stage-cap">Ember tick: pooled figure.</span>'}
  pb.addEventListener('click',e=>{const b=e.target.closest('[data-cspop]');if(!b)return;pop=+b.dataset.cspop;$$('[data-cspop]',pb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(pStop)pStop();const from={...cur},to=CAUS_POPS[pop].v;pStop=animate(600,q=>{CAUS_ROWS.forEach(r=>{cur[r[0]]=lerp(from[r[0]]||0,to[r[0]]||0,ease(q))});drawPop()},()=>{pStop=null})});
  drawPop();

  /* ---------- ESUS dots ---------- */
  const es=$('#csEs');
  const ES=[{n:'NAVIGATE ESUS',d:'rivaroxaban',a:5.1,b:4.8,hr:'HR 1.07'},{n:'RE-SPECT ESUS',d:'dabigatran',a:4.1,b:4.8,hr:'HR 0.85'},{n:'ARCADIA',d:'apixaban',a:4.4,b:4.4,hr:'HR 1.00'}];
  function drawEs(){const N=vb(es,'720 230','400 300'),lx=12,bx=N?20:190,bw=N?360:430,top=N?30:34,rh=N?78:56,X=v=>bx+bw*(v-3)/3;
    let s=causTx(bx,16,'RECURRENT STROKE, % PER YEAR','t-xs','letter-spacing:.08em;fill:var(--ink)');
    [3,4,5,6].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top}" y2="${f1(top+rh*3)}" class="grid"/>`+causTx(X(v),top+rh*3+14,v+'%','t-xs t-mid')});
    ES.forEach((e,i)=>{const y=top+i*rh+(N?44:rh/2);
      if(N)s+=causTx(lx+8,top+i*rh+14,e.n,'t-lbl')+causTx(388,top+i*rh+14,e.hr,'t-sm t-end','fill:var(--ink)');
      else s+=causTx(lx,y-2,e.n,'t-lbl')+causTx(lx,y+13,e.hr,'t-sm');
      s+=`<line x1="${f1(X(e.a))}" x2="${f1(X(e.b))}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:2"/>`;
      s+=`<circle cx="${f1(X(e.b))}" cy="${y}" r="6.5" style="fill:var(--panel);stroke:var(--brand);stroke-width:2.5"/><circle cx="${f1(X(e.a))}" cy="${y}" r="${e.a===e.b?3.5:6}" style="fill:var(--brand)"/>`;
      const hi=Math.max(e.a,e.b),lo=Math.min(e.a,e.b);
      if(e.a===e.b)s+=causTx(X(hi)+12,y+4,`both ${e.a}`,'t-sm','fill:var(--ink)');
      else{const dOnLeft=e.a<e.b;
        s+=causTx(X(lo)-11,y+4,(dOnLeft?e.d:'aspirin')+' '+lo,'t-sm t-end','fill:var(--ink)')+causTx(X(hi)+11,y+4,(dOnLeft?'aspirin':e.d)+' '+hi,'t-sm','fill:var(--ink)')}});
    es.innerHTML=s}
  drawEs();

  /* ---------- CRYSTAL AF ---------- */
  const af=$('#csAf'),afr=$('#csAfT'),afR=$('#csAfRead');
  const fI=monoFn([ [0,0],[1,3.7],[6,8.9],[12,12.4],[36,30] ]),fC=monoFn([ [0,0],[6,1.4],[12,2.0],[36,3.0] ]);
  const AFA=[{m:1,i:3.7,lab:'1 month'},{m:6,i:8.9,c:1.4,lab:'6 months'},{m:12,i:12.4,c:2.0,lab:'12 months'},{m:36,i:30.0,c:3.0,lab:'36 months'}];
  function drawAf(t){const N=vb(af,'720 320','400 548'),m=t*36,B=N?{x:42,y:24,w:340,h:210}:{x:52,y:24,w:380,h:240};
    const yMax=35,cv=curve(B.x,B.y,B.w,B.h,fI,{x0:0,x1:36,y0:0,y1:yMax,upto:m,col:'var(--brand)',dot:true});
    let s=cv.svg;
    const cc=curve(B.x,B.y,B.w,B.h,fC,{x0:0,x1:36,y0:0,y1:yMax,upto:m,col:'var(--muted)',lw:2,dash:'5 4',dot:true});
    /* the control path only: strip its frame by drawing it after the frame with no background */
    s+=cc.svg.replace(/<rect[^>]*var\(--field\)[^>]*>/,'').replace(/<line[^>]*class="axis"[^>]*>/g,'');
    [0,10,20,30].forEach(v=>{s+=causTx(B.x-6,cv.Y(v)+3,v+'%','t-xs t-end')});
    [0,6,12,24,36].forEach(v=>{s+=causTx(cv.X(v),B.y+B.h+14,v,'t-xs t-mid')});
    s+=causTx(B.x+B.w,B.y+B.h+28,'months of monitoring','t-xs t-end');
    AFA.forEach(a=>{if(m>=a.m-.01){s+=`<circle cx="${f1(cv.X(a.m))}" cy="${f1(cv.Y(a.i))}" r="4" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/>`;
      if(a.m>=6)s+=causTx(cv.X(a.m)-5,cv.Y(a.i)-8,a.i.toFixed(1)+'%','t-sm t-end','fill:var(--ink)');
      if(a.c!=null&&a.m>=12)s+=causTx(cv.X(a.m)-2,cv.Y(a.c)-8,a.c.toFixed(1)+'%','t-xs t-end')}});
    s+=causTx(B.x+8,B.y+16,'solid: implanted monitor','t-sm','fill:var(--brand);font-weight:700')+causTx(B.x+8,B.y+30,'dashed: control','t-sm');
    let last=null;AFA.forEach(a=>{if(m>=a.m-.01)last=a});
    const IC=N?{x:90,y:300,sz:15,gap:5}:{x:480,y:50,sz:15,gap:5},k=last?Math.round(last.i):0,ic=icons(IC.x,IC.y,{n:100,cols:10,k,size:IC.sz,gap:IC.gap,col:'var(--brand)',shape:'person'});
    s+=causTx(IC.x,IC.y-14,last?`about ${k} in 100 with AF found`:'no published figure yet','t-sm','fill:var(--ink)')+ic.svg;
    s+=causTx(IC.x,IC.y+ic.h+12,last?`implant arm, ${last.lab}`:'','t-xs');
    af.innerHTML=s;
    afR.innerHTML=last?`<span>Last published point: <b>${last.lab}</b></span><span>Implant <b>${last.i.toFixed(1)}%</b></span>${last.c!=null?`<span>Control <b>${last.c.toFixed(1)}%</b></span>`:''}`:'<span>Before the first published point at 1 month</span>'}
  playWire(afr,$('#csAfPlay'),drawAf,12000,'%t:player.replay%','causes');
  drawAf(+afr.value);

  /* ---------- younger people explorer ---------- */
  const yg=$('#csYg'),ygr=$('#csYgT');let tab='diss';
  function drawDiss(N,t){const L=N?{x:14,y:64,w:372,h:96}:{x:30,y:60,w:660,h:100};
    const u1=ramp(t,.08,.3),u2=ramp(t,.3,.62),u3=ramp(t,.62,.85),u4=ramp(t,.85,1);
    const a=artery(L.x,L.y,L.w,{h:L.h,flow:1-.6*u2-.3*u3,ph:t*4,stopAt:L.x+L.w*.62,pass:1-.4*u2-.5*u3});
    let s=causTx(N?14:30,24,'A NECK ARTERY, CUT LENGTHWISE','t-xs','letter-spacing:.08em;fill:var(--ink)')+a.svg;
    const lt=a.lumenTop,lb=a.lumenBot,lh=lb-lt,cxx=L.x+L.w*.46,hw=L.w*.26*Math.max(.15,u2),dp=lh*.62*u2;
    if(u2>0)s+=`<path d="M${f1(cxx-hw)} ${f1(lt)}C${f1(cxx-hw*.5)} ${f1(lt+dp)} ${f1(cxx+hw*.5)} ${f1(lt+dp)} ${f1(cxx+hw)} ${f1(lt)}Z" style="fill:var(--blood);stroke:var(--artery-line);stroke-width:1.4"/>`;
    if(u1>0)s+=`<path d="M${f1(cxx-14*u1)} ${f1(L.y-1)}L${f1(cxx)} ${f1(lt+7*u1)}L${f1(cxx+14*u1)} ${f1(L.y-1)}Z" style="fill:var(--panel);stroke:var(--artery-line);stroke-width:1.2"/>`;
    if(u3>0)s+=clot(cxx+hw+18,lb-lh*.18-(u4*0),10+12*u3,{seed:7});
    if(u4>0)s+=clot(lerp(cxx+hw+40,L.x+L.w-12,u4),lerp(lb-lh*.3,(lt+lb)/2,u4),9,{seed:8});
    s+=kitLabel(cxx,L.y-8,u1>0?'a tear in the wall':'',{a:'m'});
    const ly=L.y+L.h+18;
    s+=causTx(L.x,ly,u3>0?'a clot forms; a piece can travel to the brain':u2>0?'blood enters the wall; the channel narrows':u1>0?'the wall tears':'a healthy artery','t-lbl');
    /* measured bars */
    const R=[ ['Head or neck pain',80],['Ischaemia',56],['Horner syndrome',25],['Good outcome',92] ];
    if(N){s+=causTx(14,ly+36,'POPULATION STUDY','t-xs','letter-spacing:.08em;fill:var(--ink)');R.forEach((r,i)=>{const y=ly+50+i*30;s+=causTx(14,y+11,r[0],'t-sm','fill:var(--ink)');s+=`<rect x="150" y="${y}" width="190" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="150" y="${y}" width="${f1(1.9*r[1])}" height="14" rx="3" style="fill:var(--brand)"/>`+causTx(346,y+11,r[1]+'%','t-sm','fill:var(--ink)')})}
    else{const y0=ly+36;s+=causTx(30,y0-10,'POPULATION STUDY','t-xs','letter-spacing:.08em;fill:var(--ink)');R.forEach((r,i)=>{const y=y0+i*26;s+=causTx(30,y+11,r[0],'t-sm','fill:var(--ink)');s+=`<rect x="170" y="${y}" width="440" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="170" y="${y}" width="${f1(4.4*r[1])}" height="14" rx="3" style="fill:var(--brand)"/>`+causTx(618,y+11,r[1]+'%','t-sm','fill:var(--ink)')})}
    return s}
  function drawPfo(N,t){const idx=Math.min(CAUS_ROPE.length-1,Math.floor(t*CAUS_ROPE.length)),L=N?{x:40,y:36,w:320,h:150,cx:30,cy:252,cw:350,ch:150}:{x:20,y:50,w:250,h:220,cx:320,cy:56,cw:380,ch:214};
    const op=.5+.5*Math.sin(t*40),mx=L.x+L.w/2,sy=L.y+L.h*.45,gap=L.h*.11;
    let s=causTx(N?14:L.x,24,'THE ATRIA, SEEN FROM THE FRONT','t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=`<rect x="${f1(L.x)}" y="${f1(L.y)}" width="${f1(L.w/2-4)}" height="${f1(L.h)}" rx="22" style="fill:var(--heart);stroke:var(--artery-line);stroke-width:1.4"/><rect x="${f1(mx+4)}" y="${f1(L.y)}" width="${f1(L.w/2-4)}" height="${f1(L.h)}" rx="22" style="fill:var(--heart);stroke:var(--artery-line);stroke-width:1.4"/>`;
    /* the wall with an opening and a flap */
    s+=`<rect x="${f1(mx-9)}" y="${f1(L.y+4)}" width="18" height="${f1(sy-gap-L.y-4)}" style="fill:var(--wm);stroke:var(--artery-line);stroke-width:1"/><rect x="${f1(mx-9)}" y="${f1(sy+gap)}" width="18" height="${f1(L.y+L.h-sy-gap-4)}" style="fill:var(--wm);stroke:var(--artery-line);stroke-width:1"/>`;
    const fx=mx+9+op*20,fy=sy+gap;s+=`<path d="M${f1(mx+9)} ${f1(sy-gap)}Q${f1(fx+4)} ${f1(sy)} ${f1(mx+9+op*4)} ${f1(fy)}" style="fill:none;stroke:var(--artery-line);stroke-width:4;stroke-linecap:round"/>`;
    s+=kitLabel(L.x+L.w*.24,L.y+L.h*.2,'right atrium',{a:'m'})+kitLabel(L.x+L.w*.76,L.y+L.h*.2,'left atrium',{a:'m'})+kitLabel(mx,L.y+L.h+14,'the flap: patent foramen ovale',{a:'m'});
    /* strata bars */
    const R=CAUS_ROPE,c=L,bw=(c.cw-36)/R.length,Y=v=>c.cy+c.ch-c.ch*v/100;
    s+=causTx(c.cx,c.cy-22,'solid bars: share attributed to the PFO','t-xs','fill:var(--ink)')+causTx(c.cx,c.cy-9,'outlined bars: stroke or TIA recurrence at 2 years','t-xs','fill:var(--ink)');
    [0,50,100].forEach(v=>{s+=`<line x1="${f1(c.cx+30)}" x2="${f1(c.cx+c.cw)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+causTx(c.cx+24,Y(v)+3,v+'%','t-xs t-end')});
    R.forEach((r,i)=>{const x=c.cx+34+i*bw,on=i===idx,w=bw*.42;
      s+=`<rect x="${f1(x)}" y="${f1(Y(r.a))}" width="${f1(w)}" height="${f1(c.cy+c.ch-Y(r.a))}" style="fill:var(--brand);opacity:${on?1:.32}"/>`;
      s+=`<rect x="${f1(x+w+1)}" y="${f1(Y(r.r))}" width="${f1(w)}" height="${f1(c.cy+c.ch-Y(r.r))}" style="fill:var(--panel);stroke:var(--accent);stroke-width:${on?2.2:1.2};opacity:${on?1:.6}"/>`;
      s+=causTx(x+w,c.cy+c.ch+14,r.s,'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')});
    const q=R[idx];
    s+=causTx(c.cx+30,c.cy+c.ch+34,`RoPE ${q.s}: attributable fraction ${q.a}%, recurrence ${q.r}%`,'t-lbl');
    return s}
  function drawSick(N,t){const v=lerp(100,240,t),L=N?{x:14,y:60,w:372,h:90,bx:14,by:230,bw:372}:{x:30,y:60,w:660,h:90,bx:30,by:230,bw:660};
    let s=causTx(L.x,24,'BLOOD IN A BRAIN ARTERY','t-xs','letter-spacing:.08em;fill:var(--ink)');
    const a=artery(L.x,L.y,L.w,{h:L.h,flow:.3+.7*(v-100)/140,ph:(+ygPh)*(.5+1.2*(v-100)/140)});s+=a.svg;
    /* a few sickled cells over the stream */
    const n=7;for(let i=0;i<n;i++){const u=((i/n+(+ygPh)*(.5+1.2*(v-100)/140)*.7)%1+1)%1,x=L.x+8+u*(L.w-16),y=lerp(a.lumenTop+10,a.lumenBot-10,((i*37)%10)/10);
      s+=`<path d="M${f1(x-8)} ${f1(y+3)}Q${f1(x)} ${f1(y-9)} ${f1(x+8)} ${f1(y+3)}Q${f1(x)} ${f1(y-3)} ${f1(x-8)} ${f1(y+3)}Z" style="fill:var(--artery-line)"/>`}
    s+=kitLabel(L.x+L.w,L.y-6,'dark crescents: sickled cells',{a:'e'});
    const X=w=>L.bx+L.bw*(w-100)/140;
    s+=causTx(L.bx,L.by-34,'TRANSCRANIAL DOPPLER VELOCITY','t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=`<rect x="${f1(L.bx)}" y="${f1(L.by)}" width="${f1(L.bw)}" height="20" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(L.bx)}" y="${f1(L.by)}" width="${f1(X(v)-L.bx)}" height="20" rx="5" style="fill:${v>=200?'var(--accent)':'var(--brand)'}"/>`;
    s+=`<rect x="${f1(X(200)-1.5)}" y="${f1(L.by-8)}" width="3" height="36" style="fill:var(--ink)"/>`+causTx(X(200),L.by+44,'200: STOP threshold','t-sm t-mid','fill:var(--ink);font-weight:700');
    s+=`<rect x="${f1(X(138)-1)}" y="${f1(L.by-6)}" width="2" height="32" style="fill:var(--muted)"/><rect x="${f1(X(143)-1)}" y="${f1(L.by-6)}" width="2" height="32" style="fill:var(--muted)"/>`+causTx(X(140),L.by-12,'TWiTCH 138, 143','t-xs t-mid');
    s+=causTx(L.bx,L.by+74,`Slider at ${Math.round(v)} cm/s`,'t-lbl')+causTx(L.bx+L.bw,L.by+74,v>=200?'at or over the entry line':'under the entry line','t-sm t-end','fill:var(--ink)');
    return s}
  let ygPh=0;
  function drawYg(t){const N=vb(yg,'720 340',tab==='diss'?'400 480':tab==='pfo'?'400 470':'400 340');ygPh=t*6;
    yg.innerHTML=tab==='diss'?drawDiss(N,t):tab==='pfo'?drawPfo(N,t):drawSick(N,t)}
  function setYg(k){tab=k;const D=CAUS_YG[k];$('#csYgLab').textContent=D.lab;$('#csYgCap').innerHTML=D.cap;$('#csYgFacts').innerHTML=D.facts;$$('[data-csyg]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.csyg===k));drawYg(+ygr.value)}
  const ygStop=playWire(ygr,$('#csYgPlay'),drawYg,12000,'%t:player.replay%','causes');
  $$('[data-csyg]').forEach(b=>b.addEventListener('click',()=>{ygStop();setYg(b.dataset.csyg)}));
  setYg('diss');
  const prev=redraws.causes;redraws.causes=()=>{prev&&prev();drawPop();drawEs()};
};
