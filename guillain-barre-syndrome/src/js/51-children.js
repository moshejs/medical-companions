/* =============== 5.1 Children & pregnancy =============== */
/* Four scenes: a child's course day by day (main player, anchored on the prospective German cohort), why young
   children are misdiagnosed, a cohort explorer (ventilation, subtype mix, a year of recovery) and the risk around
   pregnancy and birth (a forest plot of the two Swedish registers). Curves between published anchors are schematic.
   Every number comes from research pass H (and pass E for treatment), cited in the strings below. */

/* ---- labels drawn inside the SVGs ---- */
const CHD_TX={
  day:'day',axis:'days since the first symptom (square-root scale)',axisN:'days since first symptom',
  weaker:'weaker',walk:'walks unaided',schem:'Schematic curve between published medians',
  ev:[{d:7,l:'worst',r:0},{d:13,l:'better',r:1},{d:27,l:'walks',r:0},{d:118,l:'symptom-free',r:1}],
  ivig:'IVIg drip',pain:'leg and back pain',
  dxTitle:{pre:'Under 6 years: 23 children',old:'6 to 18 years: 32 children'},
  dxMis:'first misdiagnosed',dxOk:'GBS suspected first',
  dxPat:'symptoms to paediatrician',dxDoc:'paediatrician to suspecting GBS',dxDays:'median days',
  dxNone:'suspected at once (median 0 days)',
  pgPreg:'pregnancy',pgTri:['1st trimester','2nd trimester','3rd trimester'],pgTriN:['T1','T2','T3'],
  pgBirth:'birth',pg30:'30 days',pg90:'90 days',pgNow:'you are here',
  pgRows:['During pregnancy','0 to 30 days after birth','0 to 90 days after birth'],
  pgVals:['0.89 (0.52–1.53) · 0.86 (0.40–1.84)','2.93 (1.20–7.11) · 2.21 (0.55–8.94)','1.37 (0.64–2.91) · 1.47 (0.54–3.99)'],
  pgRef:'1 = no change',pgLo:'lower risk',pgHi:'higher risk',pgAxis:'rate ratio (log scale)',
  pgKey:['● Sweden 1978–93','■ Sweden 1973–83']
};

/* ---- main player: a child's course ---- */
const CHD_DK=[ [0,0],[.3,7],[.55,13],[.72,27],[.88,118],[1,288] ];
const chdWk=monoFn([ [0,0],[2,.22],[7,.86],[13,.86],[27,.44],[60,.17],[118,.04],[288,.02] ]);
function chdDay(t){for(let i=1;i<CHD_DK.length;i++){const a=CHD_DK[i-1],b=CHD_DK[i];if(t<=b[0])return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return 288}
const CHD_STEPS=[
 {from:0,at:.04,k:'Step 1 · first signs',t:'Pain, or not wanting to walk',sub:'young children rarely say "my legs are weak"',
  fh:'FIRST MISDIAGNOSED · Rotterdam [[Roodbol2011]]',
  facts:[{l:'Preschool children (15 of 23)',v:68,s:'68%'},{l:'Children 6 to 18 (6 of 32)',v:21,s:'21%'},{l:'Neuropathic pain, German study',v:79,s:'79%'}],
  txt:'In a prospective German-speaking study of 95 children (median age 6.2 years), the first symptom was usually a gait disturbance or neuropathic pain, and 79% had neuropathic pain at some point [[Korinthenberg2007]]. Children under 6 can present with poorly localised pain, refusal to bear weight, irritability, meningism or an unsteady gait [[Leonhard2019]]. In Rotterdam, 68% of preschool children were first misdiagnosed, against 21% of older children [[Roodbol2011]].',
  pt:'In young children the first sign is often pain in the back or legs, or not wanting to walk, so GBS can be missed at first [[Roodbol2011,Nguyen1999]].',
  hook:'Children under 6 often present with pain, refusal to walk or irritability rather than weakness [[Leonhard2019,Roodbol2011]].'},
 {from:.12,at:.22,k:'Step 2 · the climb',t:'Weakness climbs for about a week',sub:'median 7 days of worsening in the German study',
  fh:'IN THE 6 WEEKS BEFORE · 95 children [[Korinthenberg2007]]',
  facts:[{l:'An infection (70 of 95)',v:73.7,s:'70 of 95'},{l:'A vaccination (8 of 95)',v:8.4,s:'8 of 95'}],
  txt:'Of the 95 German-speaking children, 70 had an infection and 8 a vaccination in the 6 weeks before; symptoms progressed for a median of 7 days [[Korinthenberg2007]]. In 67 Dutch children the progressive phase lasted a median 6 days, and 70% presented with weakness of all four limbs [[Roodbol2017]]. Compared with adults in Northeast China, children reached their worst point a little sooner (6.3 vs 7.3 days) [[Wu2016]].',
  pt:'Weakness usually gets worse for about a week, often starting in the legs [[Korinthenberg2007]].',
  hook:'Median progression in children: 7 days (German prospective study) [[Korinthenberg2007]].'},
 {from:.29,at:.33,k:'Step 3 · the worst point',t:'The worst point',sub:'what the German children had at nadir',
  fh:'AT THE WORST POINT · 95 children [[Korinthenberg2007]]',
  facts:[{l:'Could not walk',v:60,s:'60%'},{l:'Cranial nerve involvement',v:46,s:'46%'},{l:'Could not use their arms',v:24,s:'24%'},{l:'Autonomic dysfunction',v:51,s:'51%'}],
  txt:'At the worst point, 60% could not walk, 24% could not use their arms, 46% had cranial nerve involvement and 51% autonomic dysfunction [[Korinthenberg2007]]. In a US series, autonomic problems included blood pressure and pulse changes, bowel or bladder control and priapism (46%) [[Hicks2010]]. 79% of the German children had neuropathic pain, half of them severe [[Korinthenberg2007]].',
  pt:'At the worst point many children cannot walk for a while, and many have pain [[Korinthenberg2007]].',
  hook:'About half of children have autonomic dysfunction at some point (51% German, 46% US) [[Korinthenberg2007,Hicks2010]].'},
 {from:.4,at:.45,k:'Step 4 · breathing & treatment',t:'Breathing support and IVIg',sub:'IVIg is usually the first-line treatment in children',
  fh:'NEEDED VENTILATION · by cohort',
  facts:[{l:'German-speaking & Dutch, 421 children [[Roodbol2023]]',v:19,s:'19%'},{l:'German prospective, 95 [[Korinthenberg2007]]',v:13,s:'13%'},{l:'Chinese, 142 [[Qinrong2023]]',v:12.68,s:'12.68%'},{l:'One Indian PICU, 224 (selected) [[Bansal2026]]',v:54.9,s:'54.9%'}],
  txt:'In 421 children from German-speaking countries and the Netherlands, 79 (19%) needed mechanical ventilation and one died [[Roodbol2023]]; other cohorts report 13% [[Korinthenberg2007]], 12.68% [[Qinrong2023]] and 54.9% in one Indian paediatric ICU, a selected critically ill group [[Bansal2026]]. The ten-steps guideline sees no indication to deviate from adult treatment in children; IVIg is usually first line because plasma exchange is available only in experienced centres and seems to cause more discomfort and complications in children [[Leonhard2019]].',
  pt:'About 1 child in 5 in European studies needed a breathing machine for a while. Children are usually treated with immunoglobulin (IVIg) through a drip [[Roodbol2023,Leonhard2019]].',
  hook:'About 1 in 5 children with GBS in European cohorts needs ventilation (19% of 421) [[Roodbol2023]].'},
 {from:.54,at:.6,k:'Step 5 · turning point',t:'Improvement begins',sub:'median day 13 in the German study',
  fh:'GERMAN IVIG TRIAL · early transient deterioration [[Korinthenberg2005]]',
  facts:[{l:'1 g/kg on 2 days (5 of 23)',v:21.7,s:'5 of 23'},{l:'0.4 g/kg on 5 days (0 of 23)',v:0,s:'0 of 23'}],
  txt:'Improvement began at a median of day 13 [[Korinthenberg2007]]. In the German paediatric trial (doses as published, not instructions), 1 g/kg over 2 days and 0.4 g/kg over 5 days gave similar recovery (median 19 vs 13 days to unaided walking, not significant), but early transient deterioration was more frequent with the 2-day regimen [[Korinthenberg2005]].',
  pt:'Most children start to get better after about two weeks [[Korinthenberg2007]].',
  hook:'In the German paediatric IVIg trial, the 2-day regimen caused more early transient deterioration than the 5-day regimen (5/23 vs 0/23) [[Korinthenberg2005]].'},
 {from:.7,at:.725,k:'Step 6 · walking',t:'Walking again',sub:'median day 27 in the German study',
  fh:'WALKING INDEPENDENTLY AT 6 MONTHS · indirect comparison',
  facts:[{l:'Chinese children, 142 [[Qinrong2023]]',v:94.37,s:'94.37%'},{l:'Adults, about [[Leonhard2019]]',v:80,s:'about 80%'}],
  txt:'Unaided walking returned after a median 27 days in the German children [[Korinthenberg2007]]; 94.37% of 142 Chinese children walked independently at 6 months [[Qinrong2023]]. About 80% of adults walk independently at 6 months [[Leonhard2019]]. Cohorts differ in setting and definitions, so children seem to fare better, but this is an indirect comparison.',
  pt:'Most children walk again within weeks, and usually recover faster than adults [[Korinthenberg2007,Qinrong2023]].',
  hook:'Lower disability at nadir was the strongest predictor of independent walking in 421 European children (at one month OR 0.43) [[Roodbol2023]].'},
 {from:.84,at:.95,k:'Step 7 · months later',t:'Months later',sub:'at the end of observation, 288 days',
  fh:'AT 288 DAYS · German prospective study [[Korinthenberg2007]]',
  facts:[{l:'Symptom-free',v:75,s:'75%'},{l:'Residual symptoms, daily life unaffected',v:21,s:'21%'},{l:'More severe disability (CIDP or myelitis)',v:4,s:'4%'}],
  txt:'Children followed long term were symptom-free after a median 118 days; at 288 days 75% were symptom-free, 21% had residual symptoms that did not affect daily functioning, and the 4% with more severe disability had CIDP or concurrent myelitis [[Korinthenberg2007]]. Years later, many still report tingling, pain or tiredness: 67% of French children at a median 6 years 4 months, mostly minor [[Estublier2024]].',
  pt:'Most children recover well. Some still have tingling, pain or tiredness years later [[Korinthenberg2007,Estublier2024]].',
  hook:'Long-term sequelae are common even after good recovery: 67% at a median 6 years, mostly minor [[Estublier2024]].'}
];

/* ---- misdiagnosis explorer (Roodbol 2011) ---- */
const CHD_DX={
  pre:{n:23,k:15,pat:5,doc:3,cap:'<b>Under 6 years.</b> 15 of 23 preschool children (68%) were first given another diagnosis. They reached a paediatrician as fast as older children (median 5 days), but the doctor took a median 3 days to suspect GBS, more than a week in a quarter, up to 22 days [[Roodbol2011]]. Refusal to walk and leg pain were the most frequent first symptoms (65%) [[Roodbol2011]].'},
  old:{n:32,k:6,pat:5,doc:0,cap:'<b>6 to 18 years.</b> 6 of 32 older children (21%) were first misdiagnosed (p = 0.001 against preschool children). Patient delay was the same (median 5 days), but GBS was suspected at once: a median doctor\'s delay of 0 days [[Roodbol2011]].'}
};

/* ---- cohort explorer ---- */
const CHD_CO={
  vent:{h:'Children who needed mechanical ventilation',rows:[
    {l:'German-speaking & Dutch (421)',v:19,s:'19%'},{l:'German prospective (95)',v:13,s:'13%'},
    {l:'China (142)',v:12.68,s:'12.68%'},{l:'One Indian PICU (224)',v:54.9,s:'54.9%'}],
    cap:'Ventilation rates depend on who is counted. 19% of 421 children in German-speaking and Dutch cohorts [[Roodbol2023]], 13% in the German prospective study [[Korinthenberg2007]], 12.68% of 142 Chinese children [[Qinrong2023]], but 54.9% (and tracheostomy 24.2%) in one Indian paediatric intensive care unit, a selected critically ill group [[Bansal2026]].'},
  sub:{h:'Subtype mix: myelin (AIDP) or axon (AMAN, AMSAN)',rows:[
    {l:'Germany, prospective (95)',seg:[{k:'dem',v:74,s:'demyelinating 74%'},{k:'ax',v:11,s:'purely axonal 11%'}]},
    {l:'France (110)',seg:[{k:'dem',v:70,s:'AIDP 70%'},{k:'ax',v:16,s:'AMAN 16%'}]},
    {l:'North India PICU (224)',seg:[{k:'ax',v:61.6,s:'AMAN 61.6%'},{k:'dem',v:20.1,s:'AIDP 20.1%'},{k:'ax2',v:8,s:'AMSAN 8%'}]},
    {l:'India, 1-year follow-up (52)',seg:[{k:'ax',v:50,s:'AMAN 50%'}]}],
    cap:'As in adults, the mix depends on region and setting: mostly demyelinating in European cohorts (74% in Germany, 70% AIDP in France), mostly axonal in Indian cohorts (AMAN 61.6% in a PICU, 50% in a follow-up study) <span class="ev est">Established</span> for the regional pattern [[Korinthenberg2007,Estrade2019,Bansal2026,Kumar2026]]. The grey remainder is not classified in these figures.'},
  rec:{h:'A year of recovery in 52 Indian children (half AMAN)',x:['discharge','6 months','1 year'],ser:[
    {l:'GBS disability score 2 or more',v:[100,51.9,19.2],c:'var(--care)',m:'c'},
    {l:'Arm (ONLS) score above 2: fine motor',v:[46.2,26.9,7.7],c:'var(--accent)',m:'s'}],
    cap:'All 52 children had a GBS disability score of 2 or more at discharge, 51.9% at 6 months and 19.2% at 1 year. Fine motor problems lasted in some: an arm score above 2 fell from 46.2% to 26.9% and 7.7% [[Kumar2026]]. In 421 European children, lower disability at nadir was the strongest predictor of walking [[Roodbol2023]].'}
};

/* ---- pregnancy player ---- */
const CHD_PG=[
 {from:0,at:.27,k:'Step 1 · pregnancy',t:'During pregnancy: risk not raised',
  txt:'In Swedish women aged 15 to 49 (1978 to 1993), the age-adjusted rate ratio for GBS during pregnancy was 0.89 (95% CI 0.52 to 1.53) [[Cheng1998]]; an earlier register (1973 to 1983) gave 0.86 (0.40 to 1.84) [[Jiang1996]]. When GBS does start in pregnancy, onset was spread across trimesters in 16 French women (31%, 31%, 38%) [[Krief2023]], while 52.5% of 101 published case reports began in the third trimester [[Yakubu2026]].',
  pt:'GBS in pregnancy is uncommon, and pregnancy itself does not seem to raise the risk [[Cheng1998]].',
  hook:'Rate ratio in pregnancy 0.89: not raised [[Cheng1998]].'},
 {from:.5,at:.555,k:'Step 2 · birth',t:'Around the birth',
  txt:'In the US National Inpatient Sample (1999 to 2015), 291 of 13,792,544 births were to women with GBS, 2.1 per 100,000 births, rising from 1.26 to 3.8 per 100,000 over the period [[Taylor2024]]. In 36 peripartum women in Assam, 28 had onset before and 8 after delivery; 6 of the 8 developed weakness on the day of delivery [[Patra2022]].',
  pt:'Most women with GBS around the time of birth fall ill before the baby arrives [[Patra2022]].',
  hook:'Maternal GBS: 2.1 per 100,000 US births, 1999 to 2015 [[Taylor2024]].'},
 {from:.58,at:.66,k:'Step 3 · first month',t:'The first 30 days after birth',
  txt:'In the first 30 days after delivery the rate ratio was 2.93 (95% CI 1.20 to 7.11) [[Cheng1998]]. The authors conclude the risk rises after delivery, particularly in the first 2 weeks postpartum <span class="ev early">Early evidence</span> [[Cheng1998]]. The earlier register points the same way, 2.21 (0.55 to 8.94), but its interval includes 1 [[Jiang1996]].',
  pt:'The risk seems highest in the first weeks after the baby is born [[Cheng1998]].',
  hook:'GBS risk is not raised during pregnancy but rises after delivery: rate ratio 2.93 in the first 30 days postpartum [[Cheng1998]].'},
 {from:.76,at:.9,k:'Step 4 · three months',t:'Up to 90 days after birth',
  txt:'Over the first 90 days the rate ratio was 1.37 (0.64 to 2.91) [[Cheng1998]], and over 3 months in the earlier register 1.47 (0.54 to 3.99) [[Jiang1996]]: the same direction, but neither interval excludes 1. Whether the postpartum rise is real is still debated: significant at 30 days in one register only [[Cheng1998,Jiang1996]].',
  pt:'After the first month, the extra risk is no longer clear in these studies [[Cheng1998,Jiang1996]].',
  hook:'Two Swedish registers, same direction: only the 30-day ratio in the 1978–93 cohort excludes 1 [[Cheng1998,Jiang1996]].'}
];
const CHD_PGR=[ [ [.89,.52,1.53],[.86,.40,1.84] ],[ [2.93,1.20,7.11],[2.21,.55,8.94] ],[ [1.37,.64,2.91],[1.47,.54,3.99] ] ];

inits.children=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* a labelled bar: label left and value right on one line, the bar under them */
  function bar(x,y,w,f,lbl,val,col='var(--care)'){
    return tx(x,y,lbl,'t-xs',INK)+tx(x+w,y,val,'t-xs t-end',INK)+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="9" rx="4.5" style="fill:var(--panel-2)"/>`+(f>0?`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(Math.max(4,w*clamp(f)))}" height="9" rx="4.5" style="fill:${col}"/>`:'')}
  const stripCite=s=>s.replace(/\s*<sup class="c".*?<\/sup>/g,'');
  /* the IVIg bag on a drip stand */
  function drip(x,y,a,hand){let s=`<g style="opacity:${f1(a)}"><line x1="${f1(x+14)}" y1="${f1(y-14)}" x2="${f1(x+14)}" y2="${f1(y)}" style="stroke:var(--device);stroke-width:2"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="28" height="40" rx="7" style="fill:var(--ivig);opacity:.35;stroke:var(--device);stroke-width:1.4"/><rect x="${f1(x+3)}" y="${f1(y+12)}" width="22" height="25" rx="5" style="fill:var(--ivig);opacity:.8"/>`;
    s+=`<path d="M${f1(x+14)} ${f1(y+40)}C${f1(x+14)} ${f1(y+90)} ${f1(hand[0]+30)} ${f1(hand[1]-10)} ${f1(hand[0]+2)} ${f1(hand[1])}" style="fill:none;stroke:var(--device);stroke-width:1.6"/>`;
    return s+kitLabel(x+14,y+56,CHD_TX.ivig,{a:'m'})+'</g>'}

  /* ---------- main: a child's course ---------- */
  const svg=$('#chdSvg'),rg=$('#chdT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 690'),p=phaseOf(CHD_STEPS,t),P=CHD_STEPS[p],day=chdDay(t),lv=chdWk(day);
    const L=N?{tx:12,bx:78,by:62,bs:190,dx:150,dy:78,cx:40,cy:316,cw:345,ch:150,sy:520,cols:1,cw2:376,rowH:40}
             :{tx:14,bx:96,by:66,bs:224,dx:168,dy:84,cx:252,cy:84,cw:440,ch:178,sy:316,cols:2,cw2:336,rowH:38};
    let s=tx(L.tx,24,P.t,'t-big','font-size:19px;fill:var(--care)')+tx(L.tx,41,P.sub,'t-sm');
    /* the child */
    const pain=ramp(t,0,.04)*(1-ramp(t,.5,.62)),tg=ramp(t,.03,.1)*(1-ramp(t,.8,.95));
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,pain,tingle:tg});s+=B.svg;
    if(t<.2){const a=pain*(1-ramp(t,.14,.2));s+=`<g style="opacity:${f1(a)}">`+kitLabel(B.at.back[0]+L.bs*.24,B.at.back[1]+4,CHD_TX.pain,{})+'</g>'}
    const dA=ramp(t,.36,.4)*(1-ramp(t,.6,.66));if(dA>0)s+=drip(L.dx,L.dy,dA,B.at.hand);
    /* the course chart on a square-root day axis */
    const C=curve(L.cx,L.cy,L.cw,L.ch,u=>chdWk(288*u*u),{upto:Math.sqrt(day/288),col:'var(--care)',fill:true,dot:true,lw:3});
    s+=C.svg;const XD=d=>L.cx+L.cw*Math.sqrt(d/288);
    const yW=C.Y(.44);s+=`<line x1="${f1(L.cx)}" x2="${f1(L.cx+L.cw)}" y1="${f1(yW)}" y2="${f1(yW)}" class="grid"/>`+tx(L.cx+L.cw-4,yW-5,CHD_TX.walk,'t-xs t-end');
    s+=tx(L.cx+5,L.cy+13,CHD_TX.weaker+' ↑','t-xs');
    CHD_TX.ev.forEach(e=>{const xx=XD(e.d),on=day>=e.d-.01;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(L.cy)}" y2="${f1(L.cy+L.ch)}" class="grid" style="opacity:${on?1:.4}"/>`;
      s+=tx(xx,L.cy-(e.r?7:20),e.l,'t-xs t-mid',on?INK:'opacity:.55')});
    [0,7,13,27,118,288].forEach(d=>{s+=tx(XD(d),L.cy+L.ch+14,d,'t-xs t-mid')});
    s+=tx(L.cx+L.cw,L.cy+L.ch+29,N?CHD_TX.axisN:CHD_TX.axis,'t-xs t-end');
    s+=tx(L.cx,L.cy+L.ch+29,CHD_TX.schem,'t-xs',`opacity:${N?0:1}`);
    s+=tx(L.cx+L.cw,L.cy-(N?34:34),CHD_TX.day+' '+Math.round(day),'t-lbl t-end','fill:var(--care)');
    /* the numbers strip */
    const g=ease(ramp(t,P.from,P.from+.05));
    s+=`<line x1="${f1(L.tx)}" x2="${f1(N?388:706)}" y1="${f1(L.sy-14)}" y2="${f1(L.sy-14)}" class="axis"/>`+tx(L.tx,L.sy,stripCite(P.fh),'t-xs','letter-spacing:.06em');
    P.facts.forEach((f,i)=>{const c=L.cols===2?i%2:0,r=L.cols===2?Math.floor(i/2):i;
      s+=bar(L.tx+c*(L.cw2+34),L.sy+20+r*L.rowH,L.cw2,g*f.v/100,stripCite(f.l),f.s,i===0?'var(--care)':'var(--accent)')});
    svg.innerHTML=s;setSt(p);$('#chdNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#chdPlay'),draw,16000,'%t:player.replay%','children');
  setSt=stepWire($('#chdSteps'),CHD_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- misdiagnosis in young children ---------- */
  const dsv=$('#chdDxSvg'),dcap=$('#chdDxCap');let dg='pre',dA=1,dStop=null;
  function drawDx(){const N=vb(dsv,'720 230','400 400'),D=CHD_DX[dg];
    const L=N?{ix:14,iy:44,cols:10,sz:20,tx:14,ty:24,lx:14,ly:142,bx:14,by:220,bw:372}:{ix:14,iy:44,cols:12,sz:20,tx:14,ty:24,lx:14,ly:142,bx:340,by:56,bw:360};
    let s=tx(L.tx,L.ty,CHD_TX.dxTitle[dg],'t-lbl');
    const k=Math.round(D.k*dA);
    const I=icons(L.ix,L.iy,{n:D.n,cols:L.cols,k,size:L.sz,gap:5,col:'var(--accent)',base:'var(--care)'});s+=I.svg;
    const ly=L.iy+I.h+16;
    s+=`<rect x="${f1(L.lx)}" y="${f1(ly-9)}" width="10" height="10" rx="2" style="fill:var(--accent)"/>`+tx(L.lx+15,ly,`${D.k} ${CHD_TX.dxMis}`,'t-xs',INK);
    s+=`<rect x="${f1(L.lx+150)}" y="${f1(ly-9)}" width="10" height="10" rx="2" style="fill:var(--care)"/>`+tx(L.lx+165,ly,`${D.n-D.k} ${CHD_TX.dxOk}`,'t-xs',INK);
    /* delay bars on a 0..10 day scale */
    const X=d=>L.bx+L.bw*d/10;
    s+=tx(L.bx,L.by,CHD_TX.dxDays,'t-xs','letter-spacing:.06em');
    const r1=L.by+26,r2=L.by+78;
    s+=tx(L.bx,r1-8,CHD_TX.dxPat,'t-xs',INK)+`<rect x="${f1(L.bx)}" y="${f1(r1)}" width="${f1(X(D.pat)-L.bx)}" height="16" rx="5" style="fill:var(--care)"/>`+tx(X(D.pat)+6,r1+12,D.pat,'t-lbl');
    s+=tx(X(D.pat),r2-8,D.doc?CHD_TX.dxDoc:CHD_TX.dxNone,'t-xs',INK);
    const dw=(X(D.pat+D.doc*dA)-X(D.pat));
    s+=`<rect x="${f1(X(D.pat))}" y="${f1(r2)}" width="${f1(Math.max(3,dw))}" height="16" rx="5" style="fill:var(--accent)"/>`+tx(X(D.pat)+Math.max(3,dw)+6,r2+12,(D.doc*dA).toFixed(0),'t-lbl');
    s+=`<line x1="${f1(X(D.pat))}" x2="${f1(X(D.pat))}" y1="${f1(r1)}" y2="${f1(r2+16)}" class="grid"/>`;
    const tl=tline(L.bx,r2+40,L.bw,{min:0,max:10,step:1,label:'days'});s+=tl.svg;
    dsv.innerHTML=s;dcap.innerHTML=D.cap;
    $$('[data-chdx]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.chdx===dg))}
  $$('[data-chdx]').forEach(b=>b.addEventListener('click',()=>{dg=b.dataset.chdx;if(dStop)dStop();dStop=animate(900,q=>{dA=ease(q);drawDx()},()=>{dStop=null})}));
  drawDx();

  /* ---------- cohort explorer ---------- */
  const csv=$('#chdCoSvg'),ccap=$('#chdCoCap');let cv='vent',cA=1,cStop=null;
  function drawCo(){const N=vb(csv,'720 300','400 400'),V=CHD_CO[cv];let s=tx(14,22,V.h,'t-lbl');
    if(cv==='vent'||cv==='sub'){
      const L=N?{lx:14,bx:14,bw:372,y0:56,rh:64,lab:'above'}:{lx:14,bx:250,bw:440,y0:60,rh:60,lab:'left'};
      const X=v=>L.bx+L.bw*v/100;
      s+=`<line x1="${f1(L.bx)}" x2="${f1(L.bx)}" y1="${f1(L.y0-12)}" y2="${f1(L.y0+3*L.rh+(N?24:12))}" class="axis"/>`;
      V.rows.forEach((r,i)=>{const y=L.y0+i*L.rh,by=L.lab==='left'?y-6:y+8;
        s+=tx(L.lx,L.lab==='left'?y+6:y,r.l,'t-sm',INK);
        s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(L.bw)}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
        if(cv==='vent'){s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(L.bw*r.v/100*cA)}" height="16" rx="4" style="fill:${i===3?'var(--accent)':'var(--care)'}"/>`+tx(X(r.v*cA)+6,by+12,r.s,'t-sm',INK)}
        else{let x0=L.bx;const parts=[];r.seg.forEach(sg=>{const w=L.bw*sg.v/100*cA;s+=`<rect x="${f1(x0)}" y="${f1(by)}" width="${f1(w)}" height="16" style="fill:${sg.k==='dem'?'var(--care)':sg.k==='ax'?'var(--accent)':'var(--rx)'}"/>`;x0+=w;parts.push(sg.s)});
          s+=tx(L.bx,by+30,parts.join(' · '),'t-xs',INK)}});
      if(cv==='vent'){[0,25,50,75,100].forEach(v=>{s+=tx(X(v),L.y0+3*L.rh+(N?38:28),v+'%','t-xs t-mid')})}
    }else{
      const L=N?{x:44,y:70,w:320,h:250,ly:44}:{x:250,y:60,w:420,h:180,ly:40};
      const X=i=>L.x+L.w*i/2,Y=v=>L.y+L.h-L.h*v/100;
      s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
      [0,50,100].forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(L.x-6,Y(v)+3,v+'%','t-xs t-end')});
      V.x.forEach((l,i)=>{s+=tx(X(i),L.y+L.h+16,l,'t-xs t-mid'+(i===0?'':'' ),INK)});
      V.ser.forEach((sr,j)=>{const P=sr.v.map((v,i)=>[X(i),Y(v*cA)]);s+=`<path d="${ptsD(P)}" style="fill:none;stroke:${sr.c};stroke-width:3;stroke-linejoin:round"/>`;
        P.forEach((p,i)=>{s+=sr.m==='c'?`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="5" style="fill:${sr.c}"/>`:`<rect x="${f1(p[0]-4.5)}" y="${f1(p[1]-4.5)}" width="9" height="9" style="fill:${sr.c}"/>`;
          s+=tx(p[0]+(i===2?-8:8),p[1]-8,(sr.v[i]*cA).toFixed(1).replace('.0',''),'t-xs'+(i===2?' t-end':''),INK)});
        const lx=N?14:14,ly=N?L.ly+(j?0:-14)+L.y+L.h+20:L.y+20+j*36;
        if(N){const yy=L.y+L.h+40+j*18;s+=(sr.m==='c'?`<circle cx="${lx+5}" cy="${yy-4}" r="5" style="fill:${sr.c}"/>`:`<rect x="${lx}" y="${yy-8.5}" width="9" height="9" style="fill:${sr.c}"/>`)+tx(lx+16,yy,sr.l,'t-xs',INK)}
        else{s+=(sr.m==='c'?`<circle cx="${lx+5}" cy="${ly-4}" r="5" style="fill:${sr.c}"/>`:`<rect x="${lx}" y="${ly-8.5}" width="9" height="9" style="fill:${sr.c}"/>`)+tx(lx+16,ly,sr.l.split(':')[0],'t-xs',INK)+(sr.l.includes(':')?tx(lx+16,ly+13,sr.l.split(':')[1].trim(),'t-xs'):'')}});
    }
    csv.innerHTML=s;ccap.innerHTML=V.cap;
    $$('[data-chco]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.chco===cv))}
  $$('[data-chco]').forEach(b=>b.addEventListener('click',()=>{cv=b.dataset.chco;if(cStop)cStop();cStop=animate(800,q=>{cA=ease(q);drawCo()},()=>{cStop=null})}));
  drawCo();

  /* ---------- pregnancy and the weeks after birth ---------- */
  const psv=$('#chdPgSvg'),prg=$('#chdPgT');let setPg=()=>{};
  function drawPg(t){const N=vb(psv,'720 400','400 620'),p=phaseOf(CHD_PG,t);
    const L=N?{tx:20,tw:360,ty:64,fx:30,fw:350,fy:150,rh:140,lab:'above'}:{tx:30,tw:660,ty:64,fx:300,fw:390,fy:140,rh:66,lab:'left'};
    const TX=u=>L.tx+L.tw*u;let s='';
    /* the timeline: pregnancy 0..0.55, birth at 0.55, 30 days at 0.75, 90 days at 1 */
    const segs=[[0,.183],[.183,.367],[.367,.55]];
    segs.forEach((g,i)=>{s+=`<rect x="${f1(TX(g[0])+1)}" y="${L.ty-10}" width="${f1(TX(g[1])-TX(g[0])-2)}" height="20" rx="5" style="fill:var(--care-soft);stroke:var(--care);stroke-width:1"/>`+tx((TX(g[0])+TX(g[1]))/2,L.ty+4,(N?CHD_TX.pgTriN:CHD_TX.pgTri)[i],'t-xs t-mid',INK)});
    s+=`<rect x="${f1(TX(.55)+1)}" y="${L.ty-10}" width="${f1(TX(.75)-TX(.55)-2)}" height="20" rx="5" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1"/><rect x="${f1(TX(.75)+1)}" y="${L.ty-10}" width="${f1(TX(1)-TX(.75)-2)}" height="20" rx="5" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1"/>`;
    s+=tx((TX(.55)+TX(.75))/2,L.ty+4,CHD_TX.pg30,'t-xs t-mid',INK)+tx((TX(.75)+TX(1))/2,L.ty+4,CHD_TX.pg90,'t-xs t-mid',INK);
    s+=tx(TX(0),L.ty-18,CHD_TX.pgPreg,'t-xs','letter-spacing:.06em');
    /* birth: a swaddled baby */
    const bx=TX(.55);s+=`<line x1="${f1(bx)}" x2="${f1(bx)}" y1="${L.ty-22}" y2="${L.ty+14}" style="stroke:var(--ink);stroke-width:1.6"/><circle cx="${f1(bx)}" cy="${L.ty-30}" r="5" style="fill:var(--skin);stroke:var(--ink);stroke-width:1"/><path d="M${f1(bx-6)} ${L.ty-27}Q${f1(bx)} ${L.ty-16} ${f1(bx+6)} ${L.ty-27}" style="fill:var(--care-soft);stroke:var(--ink);stroke-width:1"/>`+tx(bx+10,L.ty-28,CHD_TX.pgBirth,'t-xs',INK);
    /* the moving marker */
    const mx=TX(t);s+=`<path d="M${f1(mx)} ${L.ty+14}l-6 10h12z" style="fill:var(--ink)"/>`+tx(clamp(mx,L.tx+30,L.tx+L.tw-30),L.ty+38,CHD_TX.pgNow,'t-xs t-mid',INK);
    /* forest plot */
    const lo=Math.log(.25),hi=Math.log(10),FX=v=>L.fx+L.fw*(Math.log(v)-lo)/(hi-lo);
    const act=t<.55?[0]:t<.75?[1,2]:[2];
    const fe=L.fy+L.rh*3+(N?-30:-14);
    CHD_TX.pgRows.forEach((r,i)=>{const y=L.fy+i*L.rh,on=act.includes(i),py=N?y+40:y+8;
      if(on)s+=`<rect x="${N?8:12}" y="${f1(N?y-16:y-18)}" width="${N?384:696}" height="${N?L.rh-22:L.rh-6}" rx="8" style="fill:var(--care-soft)"/>`;
      s+=tx(N?16:24,N?y:y,r,'t-lbl',on?'':'opacity:.75')+tx(N?16:24,N?y+15:y+16,CHD_TX.pgVals[i],'t-xs',on?INK:'');
      s+=`<line x1="${f1(FX(1))}" x2="${f1(FX(1))}" y1="${f1(py-16)}" y2="${f1(py+24)}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      CHD_PGR[i].forEach((e,j)=>{const yy=py+(j?12:-4);const a=on?1:.55;
        s+=`<g style="opacity:${a}"><line x1="${f1(FX(e[1]))}" x2="${f1(FX(e[2]))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--ink);stroke-width:1.6"/>`;
        s+=j?`<rect x="${f1(FX(e[0])-5)}" y="${f1(yy-5)}" width="10" height="10" style="fill:var(--accent)"/>`:`<circle cx="${f1(FX(e[0]))}" cy="${f1(yy)}" r="5.5" style="fill:var(--care)"/>`;s+='</g>'})});
    const ay=fe+8;s+=`<line x1="${L.fx}" x2="${L.fx+L.fw}" y1="${f1(ay)}" y2="${f1(ay)}" class="axis"/>`;
    [.25,.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(FX(v))}" x2="${f1(FX(v))}" y1="${f1(ay-3)}" y2="${f1(ay+3)}" class="axis"/>`+tx(FX(v),ay+15,v,'t-xs t-mid')});
    s+=tx(FX(1),ay+29,CHD_TX.pgRef,'t-xs t-mid',INK)+tx(L.fx,ay+29,'← '+CHD_TX.pgLo,'t-xs')+tx(L.fx+L.fw,ay+29,CHD_TX.pgHi+' →','t-xs t-end');
    s+=tx(L.fx+L.fw,ay+43,CHD_TX.pgAxis,'t-xs t-end');
    s+=tx(N?16:24,ay+43,CHD_TX.pgKey[0],'t-xs',INK)+tx(N?16:24,ay+57,CHD_TX.pgKey[1],'t-xs',INK);
    psv.innerHTML=s;setPg(p);$('#chdPgNote').innerHTML=noteHTML(CHD_PG[p]);
  }
  const pstop=playWire(prg,$('#chdPgPlay'),drawPg,12000,'%t:player.replay%','children');
  setPg=stepWire($('#chdPgSteps'),CHD_PG,prg,drawPg,pstop);
  drawPg(+prg.value);
  const prev=redraws.children;redraws.children=()=>{prev&&prev();drawDx();drawCo()};
};
