/* =============== 2.1 DSM-5-TR criteria =============== */
/* Seven Criterion B symptoms in DIGFAST order (a memory aid, not DSM wording) */
const CR_MAN=[['D','Distractibility','Distractibility'],['I','Risky activities','Excessive involvement in activities with a high potential for painful consequences'],
 ['G','Grandiosity','Inflated self-esteem or grandiosity'],['F','Racing thoughts','Flight of ideas, or racing thoughts'],
 ['A','More activity','Increased goal-directed activity or psychomotor agitation'],['S','Less need for sleep','Decreased need for sleep'],['T','Talkative, pressured','More talkative than usual, or pressure to keep talking']];
const CR_DEP=[['Depressed mood','Depressed mood'],['Loss of interest','Markedly diminished interest or pleasure'],['Weight / appetite','Significant weight or appetite change'],
 ['Sleep too little/much','Insomnia or hypersomnia'],['Agitation or slowing','Psychomotor agitation or retardation'],['Fatigue','Fatigue or loss of energy'],
 ['Worthless or guilty','Feelings of worthlessness or excessive guilt'],['Poor concentration','Diminished ability to think, concentrate or decide'],['Thoughts of death','Recurrent thoughts of death or suicide']];
const CR_MODES={
 mania:{name:'Manic episode',col:'var(--up)',fill:'var(--up-fill)',soft:'var(--up-soft)',need:7,max:10,unit:'day',gates:[['A','Mood + energy','≥ 1 week','Mood'],['B','Symptoms','3 of 7 (4)','Sympt.'],['C','Severity','any 1 of 3','Impact'],['D','Cause','rule out causes','Cause']],
  lit:[5,6,3,4],verdict:'Manic episode: criteria met',vsub:'One lifetime manic episode = bipolar I'},
 hypo:{name:'Hypomanic episode',col:'var(--up)',fill:'var(--up-fill)',soft:'var(--up-soft)',need:4,max:10,unit:'day',gates:[['A','Mood + energy','≥ 4 days','Mood'],['B','Symptoms','3 of 7 (4)','Sympt.'],['C','Severity','seen, not severe','Impact'],['D','Cause','rule out causes','Cause']],
  lit:[5,6,3,4],verdict:'Hypomanic episode: criteria met',vsub:'With a major depression, never mania = bipolar II'},
 mde:{name:'Major depressive episode',col:'var(--down)',fill:'var(--down-fill)',soft:'var(--down-soft)',need:14,max:21,unit:'day',gates:[['A','5 of 9 symptoms','same 2 weeks','5 of 9'],['B','Distress','or impairment','Distress'],['C','Cause','rule out causes','Cause']],
  lit:[0,3,5,7,6],verdict:'Major depressive episode: criteria met',vsub:'In bipolar disorder, this is bipolar depression'}};
/* the five animation slots and which block each one builds, per mode */
const CR_SLOTS=[[0,.2],[.22,.4],[.42,.58],[.6,.76],[.78,.92]];
const CR_STEPSET={
 mania:[
  {from:0,at:.12,k:'Criterion A',t:'Mood and energy for a week',
   txt:`Two things must both be present: a distinct period of abnormally and persistently elevated, expansive or irritable mood, <b>and</b> abnormally and persistently increased activity or energy. Together they last at least 1 week and are present most of the day, nearly every day, or any duration if hospitalisation is necessary. [[APA2022,Yatham2018]]`,
   pt:`A high or irritable mood on its own is not enough. Energy or activity must be up too, and it has to last about a week.`,
   hook:`Mania: at least 1 week, or any duration if hospitalised. Since DSM-5, Criterion A needs increased activity or energy as well as the mood change. [[Yatham2018,Grunze2021]]`},
  {from:.22,at:.34,k:'Criterion B',t:'Three of seven symptoms',
   txt:`At least 3 of 7 symptoms, present to a significant degree and a noticeable change from usual behaviour: grandiosity, decreased need for sleep, more talkative or pressured, flight of ideas or racing thoughts, distractibility, increased goal-directed activity or agitation, and risky activities with painful consequences. [[APA2022,Yatham2018]]`,
   pt:`Sleeping much less but not feeling tired, talking fast, thoughts racing, starting many projects: a cluster of changes, not one.`,
   hook:`DIGFAST (a memory aid): Distractibility, Irresponsibility, Grandiosity, Flight of ideas, Activity, Sleep need down, Talkativeness.`},
  {from:.42,at:.52,k:'Criterion B',t:'Four if mood is only irritable',
   txt:`If the mood change is only irritable, with no elevated or expansive mood, the bar rises to 4 of the 7 symptoms. Irritability is common to many conditions, so it needs more company before it counts. [[APA2022,Yatham2018]]`,
   pt:`Irritability alone is less specific, so the rule asks for one more symptom.`,
   hook:`3 of 7, or 4 of 7 when the mood is irritable only.`},
  {from:.6,at:.7,k:'Criterion C',t:'Impairment, hospital or psychosis',
   txt:`At least one of: marked impairment in social or occupational functioning, hospitalisation to prevent harm to self or others, or psychotic features. This is the gate that separates mania from hypomania. [[APA2022,Yatham2018]]`,
   pt:`Mania is severe enough to seriously disrupt life, to need hospital care, or to come with losing touch with reality.`,
   hook:`Any psychotic features make the episode manic, never hypomanic. [[APA2022,Yatham2018]]`},
  {from:.78,at:.95,k:'Criterion D',t:'Not due to a substance or illness',
   txt:`The episode is not attributable to the physiological effects of a substance (a drug of abuse, a medication, another treatment) or to another medical condition. One exception matters: a full manic episode that emerges during antidepressant treatment and persists at a fully syndromal level beyond the treatment's physiological effect counts, and so does bipolar I. [[APA2022,Yatham2018]]`,
   pt:`Doctors check that a medicine, a drug or a physical illness is not causing the high before calling it mania.`,
   hook:`At least one lifetime manic episode is required, and is enough, for bipolar I disorder. [[APA2022,McIntyre2020Lancet]]`}],
 hypo:[
  {from:0,at:.12,k:'Criterion A',t:'Mood and energy for 4 days',
   txt:`The same two-part change as mania, elevated, expansive or irritable mood plus increased activity or energy, lasting at least 4 consecutive days and present most of the day, nearly every day. [[APA2022,Yatham2018]]`,
   pt:`Hypomania is a milder high that lasts at least 4 days in a row.`,
   hook:`Hypomania: at least 4 consecutive days. Shorter (2–3-day) hypomanias with major depressions fall under "other specified bipolar and related disorder". [[APA2022,Severus2014]]`},
  {from:.22,at:.34,k:'Criterion B',t:'The same three of seven',
   txt:`The same Criterion B list as mania, 3 of 7 symptoms (4 if the mood is only irritable), persisting and present to a significant degree. The symptom list does not separate mania from hypomania; severity and duration do. [[APA2022,Yatham2018]]`,
   pt:`The symptoms are the same kind as in mania. What differs is how long and how severe.`,
   hook:`Hypomania and mania share Criterion B; they differ in duration (4 days vs 1 week) and severity.`},
  {from:.42,at:.52,k:'Criterion B',t:'Four if mood is only irritable',
   txt:`As in mania, an irritable-only mood needs 4 of the 7 symptoms. [[APA2022,Yatham2018]]`,
   pt:`With irritability alone, one more symptom is needed.`,
   hook:``},
  {from:.6,at:.7,k:'Severity',t:'Noticed by others, not severe',
   txt:`The episode brings an unequivocal change in functioning, uncharacteristic of the person, that others can observe. But it is not severe enough to cause marked impairment or to need hospitalisation. If there are psychotic features, the episode is by definition manic. [[APA2022,Yatham2018]]`,
   pt:`Other people notice the change, but it does not wreck work or home life.`,
   hook:`Hypomania: observable change, no marked impairment, no hospitalisation, no psychosis. [[APA2022,Yatham2018]]`},
  {from:.78,at:.95,k:'Exclusion',t:'Not due to a substance or illness',
   txt:`As for mania, the episode must not be attributable to a substance or another medical condition. A full hypomanic episode that emerges on antidepressant treatment and persists at a fully syndromal level beyond the drug's physiological effect counts as hypomania. [[APA2022,Yatham2018]] Bipolar II needs at least one hypomanic episode and at least one major depressive episode, and never a manic episode. [[APA2022,Yatham2018,McIntyre2020Lancet]]`,
   pt:`Bipolar II is not "bipolar lite": its low periods can be just as heavy and long as in bipolar I.`,
   hook:`Bipolar II = at least one hypomanic + at least one major depressive episode, never mania. [[APA2022,McIntyre2020Lancet]]`}],
 mde:[
  {from:0,at:.12,k:'Criterion A',t:'Five of nine symptoms',
   txt:`Five or more of nine symptoms during the same 2-week period, a change from previous functioning: depressed mood, loss of interest or pleasure, weight or appetite change, insomnia or hypersomnia, agitation or slowing, fatigue, worthlessness or excessive guilt, poor concentration or indecision, and recurrent thoughts of death or suicide. [[APA2022,Yatham2018]]`,
   pt:`A depressive episode is a cluster of changes in mood, sleep, energy, thinking and interest that lasts at least two weeks.`,
   hook:`Major depressive episode: 5 of 9 symptoms for 2 weeks. [[APA2022,Yatham2018]]`},
  {from:.22,at:.34,k:'Criterion A',t:'One must be a core symptom',
   txt:`At least one of the five must be depressed mood or markedly diminished interest or pleasure. Five symptoms without either of these do not make a major depressive episode. [[APA2022,Yatham2018]]`,
   pt:`Low mood, or losing interest in things you usually enjoy, has to be part of the picture.`,
   hook:`Core symptoms: depressed mood or anhedonia; at least one is required.`},
  {from:.42,at:.52,k:'Criterion A',t:'The same two weeks',
   txt:`The symptoms must be present during the same 2-week period. Weeks spent mildly low, below this threshold, are common in bipolar disorder: in a bipolar I cohort, subsyndromal and minor symptoms were nearly three times as frequent as full episodes. [[APA2022,Judd2002]]`,
   pt:`Two weeks is the minimum. Shorter or milder low patches still matter and are worth telling the care team about.`,
   hook:`Duration thresholds: mania 7 days, hypomania 4 days, major depression 14 days. [[APA2022]]`},
  {from:.6,at:.7,k:'Criterion B',t:'Distress or impairment',
   txt:`The episode must cause clinically significant distress or impairment in social, occupational or other important areas of functioning. [[APA2022]] In the World Mental Health surveys, 74.0% of people with bipolar depression reported severe role impairment, compared with 50.9% with mania. [[Merikangas2011]]`,
   pt:`Depression in bipolar disorder often disrupts life more than the highs do.`,
   hook:``},
  {from:.78,at:.95,k:'Criterion C',t:'Not due to a substance or illness',
   txt:`The episode is not attributable to a substance or another medical condition. There is no separate criteria set for "bipolar depression": it is a major depressive episode in someone with bipolar disorder, and no single feature distinguishes it from unipolar depression. [[APA2022,Yatham2018,Mitchell2008]]`,
   pt:`The same depression checklist is used whether or not someone has bipolar disorder. The history of highs makes the difference.`,
   hook:`No pathognomonic feature separates bipolar from unipolar depression; a probabilistic approach is proposed. [[Mitchell2008]]`}]};
function crIco(k,x,y,on,col){const c=on?col:'var(--muted)',op=on?1:.4,st=`style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"`;let s=`<g opacity="${op}">`;
  if(k==='imp')s+=`<rect x="${f1(x-12)}" y="${f1(y-6)}" width="24" height="16" rx="3" ${st}/><path d="M${f1(x-5)} ${f1(y-6)}V${f1(y-10)}H${f1(x+5)}V${f1(y-6)}M${f1(x-12)} ${f1(y+1)}H${f1(x+12)}" ${st}/>`;
  else if(k==='hosp')s+=`<rect x="${f1(x-12)}" y="${f1(y-11)}" width="24" height="22" rx="3" ${st}/><path d="M${f1(x)} ${f1(y-6)}V${f1(y+6)}M${f1(x-6)} ${f1(y)}H${f1(x+6)}" style="stroke:${c};stroke-width:3;stroke-linecap:round"/>`;
  else if(k==='psy')s+=`<path d="M${f1(x-12)} ${f1(y+4)}C${f1(x-18)} ${f1(y-6)} ${f1(x-6)} ${f1(y-14)} ${f1(x)} ${f1(y-8)}C${f1(x+6)} ${f1(y-14)} ${f1(x+18)} ${f1(y-6)} ${f1(x+12)} ${f1(y+4)}Z" ${st}/><path d="M${f1(x-4)} ${f1(y-2)}a4 4 0 1 1 4 4" ${st}/><circle cx="${f1(x-8)}" cy="${f1(y+10)}" r="2" style="fill:${c}"/>`;
  else if(k==='eye')s+=`<path d="M${f1(x-14)} ${f1(y)}Q${f1(x)} ${f1(y-12)} ${f1(x+14)} ${f1(y)}Q${f1(x)} ${f1(y+12)} ${f1(x-14)} ${f1(y)}Z" ${st}/><circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:${c}"/>`;
  else if(k==='dist')s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="11" ${st}/><path d="M${f1(x-5)} ${f1(y-3)}h.1M${f1(x+5)} ${f1(y-3)}h.1" style="stroke:${c};stroke-width:3;stroke-linecap:round"/><path d="M${f1(x-5)} ${f1(y+6)}Q${f1(x)} ${f1(y+1)} ${f1(x+5)} ${f1(y+6)}" ${st}/>`;
  return s+'</g>'}
const crMark=(x,y,ok)=>ok?`<path d="M${f1(x-5)} ${f1(y)}l4 4l7 -8" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`:`<path d="M${f1(x-5)} ${f1(y-5)}l10 10M${f1(x+5)} ${f1(y-5)}l-10 10" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`;
inits.criteria=()=>{
  const svg=$('#crSvg'),rg=$('#crT'),st=$('#crSteps');let mode='mania';
  const steps=CR_STEPSET.mania.slice();
  function slotP(t,i){return ramp(t,CR_SLOTS[i][0],CR_SLOTS[i][1])}
  function draw(t){
    const N=vb(svg,'720 380','400 '+(mode==='mde'?660:640)),M=CR_MODES[mode],ph=phaseOf(steps,t);setA(ph);
    const L=N?{g:[16,10,368],A:[16,68,368],B:[16,226,368],C:[16,mode==='mde'?440:418,368],D:[16,mode==='mde'?560:540,368]}:{g:[16,10,688],A:[16,70,330],B:[366,70,338],C:[16,232,330],D:[366,290,338]};
    /* block progress: which slot builds which block */
    const S=i=>slotP(t,i);
    const P=mode==='mde'?{A:S(2),B:S(0),core:S(1),irr:0,C:S(3),D:S(4)}:{A:S(0),B:S(1),core:0,irr:S(2),C:S(3),D:S(4)};
    const V=ramp(t,.9,.98);
    let s='';
    /* gates row */
    const ng=M.gates.length,gw=(L.g[2]-(ng-1)*10)/ng;
    const gp=mode==='mde'?[P.B>0&&P.A>=1&&P.core>=1?1:Math.min(P.B,.99),P.C,P.D]:[P.A,Math.max(P.B*.99,P.irr),P.C,P.D];
    M.gates.forEach((g,i)=>{const x=L.g[0]+i*(gw+10),y=L.g[1],p=gp[i],done=p>=1,act=p>0&&!done;
      s+=`<rect x="${f1(x)}" y="${y}" width="${f1(gw)}" height="46" rx="10" style="fill:${done?'var(--dx-soft)':'var(--panel)'};stroke:${act||done?'var(--dx)':'var(--line)'};stroke-width:${act?2.4:1.2}"/>`;
      s+=`<rect x="${f1(x)}" y="${y+42}" width="${f1(gw*clamp(p))}" height="4" rx="2" style="fill:var(--dx)"/>`;
      s+=`<text x="${f1(x+10)}" y="${y+21}" style="font:800 ${N?16:18}px var(--display);fill:${act||done?'var(--dx)':'var(--muted)'}">${g[0]}</text>`;
      s+=`<text x="${f1(x+(N?24:30))}" y="${y+18}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink);font-weight:700">${N?g[3]:g[1]}</text>`;
      if(!N)s+=`<text x="${f1(x+30)}" y="${y+33}" class="t-xs">${g[2]}</text>`;
      if(done)s+=crMark(x+gw-14,y+16,true);
      if(i<ng-1)s+=`<path d="M${f1(x+gw+1)} ${y+23}l7 0" style="stroke:var(--muted);stroke-width:1.4" />`});
    /* block A: mood + energy cards and the duration bar */
    {const [x,y,w]=L.A,p=P.A,on=p>0;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mde'?'DURATION · THE SAME 2-WEEK PERIOD':'A · MOOD AND ENERGY, BOTH NEEDED'}</text>`;
      let by=y+20;
      if(mode!=='mde'){const cw=(w-34)/2,irrOnly=P.irr>.3,mood=irrOnly?'Irritable mood only':'Elevated / expansive';
        [[mood,irrOnly?'(no elevated mood)':'or irritable mood'],['More activity/energy','abnormal, persistent']].forEach((c,i)=>{const cx=x+i*(cw+34),lit=p>(i?.3:.05);
          s+=`<rect x="${f1(cx)}" y="${by}" width="${f1(cw)}" height="40" rx="9" style="fill:${lit?M.soft:'var(--panel-2)'};stroke:${lit?M.fill:'var(--line)'};stroke-width:1.4"/>`;
          s+=`<text x="${f1(cx+cw/2)}" y="${by+17}" class="t-mid" style="font:700 11.5px var(--body);fill:${lit?'var(--ink)':'var(--muted)'}">${c[0]}</text><text x="${f1(cx+cw/2)}" y="${by+31}" class="t-xs t-mid">${c[1]}</text>`});
        s+=`<text x="${f1(x+cw+17)}" y="${by+25}" class="t-mid" style="font:800 12px var(--mono);fill:${p>.3?'var(--dx)':'var(--muted)'}">AND</text>`;
        by+=52}
      else{s+=`<text x="${x}" y="${by+12}" class="t-xs">symptoms cluster in one 2-week stretch</text>`;by+=26}
      /* duration bar */
      const bx=x+4,bw=w-8,X=d=>bx+bw*d/M.max,need=M.need,goal=mode==='mania'?8:mode==='hypo'?5:15,days=goal*ease(p);
      s+=`<rect x="${bx}" y="${by+8}" width="${bw}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(days>0)s+=`<rect x="${bx}" y="${by+8}" width="${f1(Math.max(16,X(Math.min(days,M.max))-bx))}" height="16" rx="8" style="fill:${M.fill};opacity:.85"/>`;
      for(let d=0;d<=M.max;d+=(mode==='mde'?7:1)){const xx=X(d);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${by+26}" y2="${by+30}" class="axis"/>`;if(mode==='mde'||d%2===0||d===need)s+=`<text x="${f1(xx)}" y="${by+41}" class="t-xs t-mid">${d}</text>`}
      s+=`<line x1="${f1(X(need))}" x2="${f1(X(need))}" y1="${by+2}" y2="${by+30}" style="stroke:var(--dx);stroke-width:2;stroke-dasharray:3 2"/>`;
      s+=`<text x="${f1(X(need))}" y="${by}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">${need===7?'1 week':need===4?'4 days':'2 weeks'}</text>`;
      const met=days>=need;
      s+=`<text x="${bx}" y="${by+58}" class="t-sm" style="fill:${met?'var(--good)':'var(--ink)'}">${on?(met?'✓ ':'')+'day '+Math.max(1,Math.floor(days))+(met?' · duration met':''):'days, most of the day, nearly every day'}</text>`;
      if(mode==='mania')s+=`<text x="${bx}" y="${by+72}" class="t-xs">or any length if hospitalised</text>`;
      if(mode==='hypo')s+=`<text x="${bx}" y="${by+72}" class="t-xs">4 consecutive days</text>`;
      }
    /* block B: symptom tiles */
    {const [x,y,w]=L.B,list=mode==='mde'?CR_DEP:CR_MAN,n=list.length,cols=2,tw=(w-8)/2,th=N?25:24,gap=N?5:4;
      const irrOnly=P.irr>.3,thr=mode==='mde'?5:(irrOnly?4:3),thrX=mode==='mde'?5:lerp(3,4,ease(ramp(P.irr,.25,.6)));
      let lit=0;const litSet=new Set();
      const base=mode==='mde'?5:3;const kOn=Math.floor(P.B*base+1e-6)+(mode!=='mde'&&P.irr>.75?1:0);
      M.lit.slice(0,Math.min(M.lit.length,kOn)).forEach(i=>litSet.add(i));lit=litSet.size;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mde'?'A · SYMPTOMS, 5 OF 9':'B · SYMPTOMS, 3 OF 7 (4 IF ONLY IRRITABLE)'}</text>`;
      list.forEach((it,i)=>{const r=Math.floor(i/cols),c=i%cols,tx=x+c*(tw+8),ty=y+16+r*(th+gap),on=litSet.has(i),core=mode==='mde'&&i<2;
        const coreHi=core&&P.core>0;
        s+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw)}" height="${th}" rx="7" style="fill:${on?M.soft:'var(--panel)'};stroke:${coreHi?'var(--dx)':on?M.fill:'var(--line)'};stroke-width:${coreHi?2.4:1.2}"/>`;
        if(mode!=='mde')s+=`<text x="${f1(tx+12)}" y="${f1(ty+th/2+5)}" class="t-mid" style="font:800 14px var(--display);fill:${on?M.col:'var(--muted)'}">${it[0]}</text>`;
        s+=`<text x="${f1(tx+(mode==='mde'?9:24))}" y="${f1(ty+th/2+4)}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}${on?';font-weight:600':''}">${mode==='mde'?it[0]:it[1]}</text>`;
      });
      /* counter gauge */
      const gy=y+16+Math.ceil(n/cols)*(th+gap)+6,cw=(w-60)/n;
      for(let i=0;i<n;i++)s+=`<rect x="${f1(x+i*cw)}" y="${gy}" width="${f1(cw-3)}" height="12" rx="3" style="fill:${i<lit?M.fill:'var(--panel-2)'};stroke:var(--line)"/>`;
      const tX=x+thrX*cw-1.5;s+=`<line x1="${f1(tX)}" x2="${f1(tX)}" y1="${gy-5}" y2="${gy+17}" style="stroke:var(--dx);stroke-width:2.4"/>`;
      const okB=lit>=thr&&(mode!=='mde'||P.core>0||P.B<1);
      s+=`<text x="${f1(x+w)}" y="${gy+11}" class="t-end" style="font:700 15px var(--mono);fill:${lit>=thr?'var(--good)':'var(--ink)'}">${lit}/${thr}</text>`;
      if(mode!=='mde'&&P.irr>.3&&P.irr<.75)s+=`<text x="${f1(tX+6)}" y="${gy+28}" class="t-xs" style="fill:var(--bad)">irritable only: 3 is not enough</text>`;
      else if(mode!=='mde'&&P.irr>=.75)s+=`<text x="${f1(tX+6)}" y="${gy+28}" class="t-xs" style="fill:var(--good)">4th symptom: threshold met</text>`;
      if(mode==='mde'&&P.core>.2)s+=`<text x="${x}" y="${gy+28}" class="t-xs" style="fill:var(--good)">outlined = core; depressed mood is one ✓</text>`;
      void okB}
    /* block C: severity */
    {const [x,y,w]=L.C,p=P.C;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mania'?'C · AT LEAST ONE OF THESE':mode==='hypo'?'SEVERITY · NOTICED, NOT SEVERE':'B · DISTRESS OR IMPAIRMENT'}</text>`;
      const iy=y+40;
      if(mode==='mania'){const it=[['imp','Marked','impairment'],['hosp','Hospital care','to prevent harm'],['psy','Psychotic','features']],cw=w/3;
        it.forEach((c,i)=>{const cx=x+cw*i+cw/2,on=i===0&&p>.35;s+=crIco(c[0],cx,iy,on,'var(--up)')+`<text x="${f1(cx)}" y="${iy+28}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${c[1]}</text><text x="${f1(cx)}" y="${iy+40}" class="t-xs t-mid">${c[2]}</text>`});
        if(p>.6)s+=`<text x="${x}" y="${iy+62}" class="t-sm" style="fill:var(--good)">✓ marked impairment → mania, not hypomania</text>`}
      else if(mode==='hypo'){const on=p>.2;s+=crIco('eye',x+22,iy,on,'var(--up)')+`<text x="${x+22}" y="${iy+28}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">seen by</text><text x="${x+22}" y="${iy+40}" class="t-xs t-mid">others</text>`;
        if(on)s+=crMark(x+44,iy-12,true);
        const it=[['imp','marked impairment'],['hosp','hospital'],['psy','psychosis']],cw=(w-70)/3;
        it.forEach((c,i)=>{const cx=x+70+cw*i+cw/2,sh=p>.45+i*.12;s+=crIco(c[0],cx,iy,false,'var(--up)')+`<text x="${f1(cx)}" y="${iy+28}" class="t-xs t-mid">${c[1]}</text>`;if(sh)s+=`<path d="M${f1(cx-15)} ${iy-14}L${f1(cx+15)} ${iy+14}" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`});
        if(p>.85)s+=`<text x="${x}" y="${iy+62}" class="t-sm" style="fill:var(--good)">✓ observable change, none of the three</text>`}
      else{const on=p>.25;s+=crIco('dist',x+22,iy,on,'var(--down)')+crIco('imp',x+70,iy,on,'var(--down)');
        s+=`<text x="${x+100}" y="${iy-4}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">clinically significant distress,</text><text x="${x+100}" y="${iy+9}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">or impairment at work, home, socially</text>`;
        if(p>.6)s+=`<text x="${x}" y="${iy+46}" class="t-sm" style="fill:var(--good)">✓ distress or impairment present</text>`}}
    /* block D: cause filter and verdict */
    {const [x,y,w]=L.D,p=P.D;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mde'?'C':mode==='hypo'?'EXCLUSION':'D'} · RULE OUT OTHER CAUSES</text>`;
      const ch=['drugs','medicines','illness'],cw=(w-8)/3;
      ch.forEach((c,i)=>{const cx=x+i*(cw+4),sh=p>.15+i*.22;s+=`<rect x="${f1(cx)}" y="${y+14}" width="${f1(cw)}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--line);opacity:${sh?1:.45}"/><text x="${f1(cx+cw/2+(sh?6:0))}" y="${y+29}" class="t-xs t-mid" style="${sh?'text-decoration:line-through':''}">${c}</text>`;
        if(sh)s+=crMark(cx+12,y+21,false)});
      if(V>0){const vy=y+44;s+=`<g opacity="${f1(V)}"><rect x="${x}" y="${vy}" width="${w}" height="${N?40:34}" rx="9" style="fill:var(--good-soft);stroke:var(--good)"/>`+crMark(x+16,vy+(N?16:13),true)+`<text x="${x+30}" y="${vy+(N?16:15)}" style="font:700 ${N?12:12.5}px var(--body);fill:var(--good)">${M.verdict}</text><text x="${x+30}" y="${vy+(N?31:28)}" class="t-xs" style="fill:var(--ink)">${M.vsub}</text></g>`}}
    svg.innerHTML=s;
    $('#crNote').innerHTML=noteHTML(steps[ph]);
    $('#crRead').innerHTML=`<span>Episode <b>${M.name}</b></span><span>Duration needed <b>${M.need===7?'7 days':M.need===4?'4 days':'14 days'}</b></span><span>Symptoms needed <b>${mode==='mde'?'5 of 9':'3 of 7 (4)'}</b></span>`;
  }
  const stop=playWire(rg,$('#crPlay'),draw,15000,'%t:player.replay%','criteria');
  const setA=stepWire(st,steps,rg,draw,stop);
  $$('[data-crm]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.crm;$$('[data-crm]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    steps.splice(0,steps.length,...CR_STEPSET[mode]);$$('[data-st] span',st).forEach((sp,i)=>{sp.textContent=steps[i].t});draw(+rg.value)}));
  draw(+rg.value);

  /* ---------------- criteria counter ---------------- */
  $('#crManBox').innerHTML=CR_MAN.map((m,i)=>`<label><input type="checkbox" data-crs="${i}"><span class="crletter">${m[0]}</span> ${m[2]}</label>`).join('');
  $('#crDepBox').innerHTML=CR_DEP.slice(2).map((m,i)=>`<label><input type="checkbox" data-crd="${i+2}"> ${m[1]}</label>`).join('');
  const form=$('#crForm'),ms=$('#crMeter');
  const chk=k=>{const e=$(`[data-cr="${k}"]`,form);return !!(e&&e.checked)};
  function evaluate(){
    const el=chk('el'),irr=chk('irr'),en=chk('en'),dep=chk('dep'),anh=chk('anh'),obs=chk('obs'),imp=chk('imp'),hosp=chk('hosp'),psy=chk('psy'),dist=chk('dist'),sub=chk('sub');
    const nB=$$('[data-crs]',form).filter(x=>x.checked).length,nDo=$$('[data-crd]',form).filter(x=>x.checked).length,nD=nDo+(dep?1:0)+(anh?1:0);
    const dur=+$('#crDur').value,up=el||irr,irrOnly=irr&&!el,needB=irrOnly?4:3;
    const A=up&&en,B=nB>=needB,D=!sub;
    const man={A:A&&(dur>=7||hosp),B,C:imp||hosp||psy,D};
    const hyp={A:A&&dur>=4,B,C:obs&&!(imp||hosp||psy),D};
    const mde={A:nD>=5&&(dep||anh),T:dur>=14,B:dist||imp,C:D};
    return {el,irr,en,dep,anh,obs,imp,hosp,psy,dist,sub,nB,nD,dur,up,irrOnly,needB,man,hyp,mde,
      manOK:man.A&&man.B&&man.C&&man.D,hypOK:hyp.A&&hyp.B&&hyp.C&&hyp.D,mdeOK:mde.A&&mde.T&&mde.B&&mde.C}}
  function drawMeter(R){const N=vb(ms,'720 150','400 196');let s='';
    const rows=[{l:'Manic symptoms (B)',n:R.nB,max:7,thr:R.needB,c:'var(--up-fill)',sub:R.irrOnly?'need 4: mood only irritable':'need 3'},
      {l:'Depressive symptoms',n:R.nD,max:9,thr:5,c:'var(--down-fill)',sub:'need 5, one of them core'}];
    const lx=N?16:16,bx=N?16:200,bw=N?368:420,rh=N?62:38;
    rows.forEach((r,i)=>{const y=N?14+i*rh:18+i*rh,yy=N?y+18:y,cw=bw/r.max;
      s+=`<text x="${lx}" y="${N?y+6:yy+11}" class="t-lbl">${r.l}</text>`;if(!N)s+=`<text x="${lx}" y="${yy+24}" class="t-xs">${r.sub}</text>`;else s+=`<text x="${lx+bw}" y="${y+6}" class="t-xs t-end">${r.sub}</text>`;
      for(let k=0;k<r.max;k++)s+=`<rect x="${f1(bx+k*cw)}" y="${yy}" width="${f1(cw-4)}" height="16" rx="4" style="fill:${k<r.n?r.c:'var(--panel-2)'};stroke:var(--line)"/>`;
      const tx=bx+r.thr*cw-2;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${yy-5}" y2="${yy+21}" style="stroke:var(--dx);stroke-width:2.4"/>`;
      s+=`<text x="${f1(N?bx+bw:bx+bw+16)}" y="${N?yy+32:yy+13}" class="${N?'t-end':''}" style="font:700 14px var(--mono);fill:${r.n>=r.thr?'var(--good)':'var(--ink)'}">${r.n}/${r.thr}</text>`});
    /* duration ruler */
    const y=N?150:104,X=d=>bx+bw*Math.min(d,15)/15;
    s+=`<text x="${lx}" y="${N?y-14:y+4}" class="t-lbl">Duration</text>`;
    s+=`<rect x="${bx}" y="${y-6}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${y-6}" width="${f1(Math.max(12,X(R.dur)-bx))}" height="12" rx="6" style="fill:var(--dx);opacity:.75"/>`;
    [[4,'4 d'],[7,'7 d'],[14,'14 d']].forEach(([d,l])=>{const xx=X(d);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-10}" y2="${y+10}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(xx)}" y="${y+22}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${f1(N?lx:bx)}" y="${y+38}" class="t-xs">lines: hypomania 4 days · mania 7 days · depression 14 days</text>`;
    ms.innerHTML=s}
  function render(){const R=evaluate();drawMeter(R);
    const li=(ok,txt)=>`<li><span class="${ok?'ok':'no'}">${ok?'✓':'✗'}</span><span>${txt}</span></li>`;
    const card=(title,ok,items,extra,tagc)=>`<div class="card"><span class="tag ${tagc}">${ok?'Pattern fits':'Not met'}</span><h4>${title}</h4><ul>${items}</ul>${extra?`<p>${extra}</p>`:''}</div>`;
    const m=R.man,h=R.hyp,d=R.mde;
    let manX='',hypX='',mdeX='';
    if(R.up&&!R.en)manX=hypX='Since DSM-5, a mood change alone is not enough: increased activity or energy is needed too. [[Yatham2018,Grunze2021]]';
    if(R.psy&&h.A&&h.B&&!R.sub)hypX='Psychotic features make an episode manic by definition, never hypomanic. [[APA2022,Yatham2018]]';
    if(R.up&&R.en&&R.dur===2.5&&R.nB>=R.needB)hypX='A 2–3-day high is too short for hypomania. With major depressive episodes, DSM-5 lists it as an example of "other specified bipolar and related disorder". [[Severus2014,APA2022]]';
    if(R.sub)manX=hypX=mdeX='When a substance, medicine or medical condition explains the episode, it is classed as substance/medication-induced or due to another medical condition. A full episode that persists beyond the substance\'s physiological effect counts towards bipolar disorder. [[APA2022,Yatham2018]]';
    if(d.T&&R.nD>=5&&!(R.dep||R.anh))mdeX='Five symptoms are present, but neither depressed mood nor loss of interest: at least one core symptom is required. [[APA2022,Yatham2018]]';
    let html=card('Manic episode',R.manOK,
      li(m.A,`Mood + energy for ≥ 1 week${R.hosp?' (any length: hospitalised)':''}`)+li(m.B,`${R.nB} of 7 symptoms (need ${R.needB})`)+li(m.C,'Marked impairment, hospital or psychosis')+li(m.D,'Not explained by a substance or illness'),manX,R.manOK?'good':'');
    html+=card('Hypomanic episode',R.hypOK&&!R.manOK,
      li(h.A,'Mood + energy for ≥ 4 consecutive days')+li(h.B,`${R.nB} of 7 symptoms (need ${R.needB})`)+li(h.C,'Noticed by others, but no marked impairment, hospital or psychosis')+li(h.D,'Not explained by a substance or illness'),R.manOK&&R.hypOK?'':hypX,R.hypOK&&!R.manOK?'good':'');
    html+=card('Major depressive episode',R.mdeOK,
      li(d.A,`${R.nD} of 9 symptoms, incl. depressed mood or loss of interest (need 5)`)+li(d.T,'Same 2-week period')+li(d.B,'Distress or impairment')+li(d.C,'Not explained by a substance or illness'),mdeX,R.mdeOK?'good':'');
    const both=(R.manOK||R.hypOK)&&R.nD>=3||(R.mdeOK&&R.nB>=3);
    let sum='';
    if(R.manOK)sum='This made-up pattern matches the published definition of a manic episode. In DSM-5-TR, one lifetime manic episode is enough for bipolar I disorder, but only a clinician can make that judgement. [[APA2022,McIntyre2020Lancet]]';
    else if(R.hypOK)sum='This made-up pattern matches the definition of a hypomanic episode. Bipolar II also needs at least one major depressive episode and never a manic one. [[APA2022,Yatham2018]]';
    else if(R.mdeOK)sum='This made-up pattern matches a major depressive episode. On its own it cannot tell unipolar from bipolar depression; the history of any highs does. [[Yatham2018,Mitchell2008]]';
    else sum='No full episode definition is met. Symptoms below threshold still matter and are worth raising with a clinician. [[Judd2002]]';
    if(both)sum+=' Symptoms from both poles at once: DSM-5 handles this with a "mixed features" specifier rather than a separate mixed episode. [[Yatham2018]]';
    html+=`<div class="card" style="grid-column:1/-1"><span class="tag dx">Teaching summary</span><p>${sum}</p><p class="stage-cap">A teaching tool, not a diagnosis.</p></div>`;
    $('#crOut').innerHTML=html}
  form.addEventListener('change',()=>{$$('#crEx1,#crEx2,#crEx3').forEach(b=>b.setAttribute('aria-pressed','false'));render()});
  const EX={crEx1:{c:['el','en','imp'],s:[5,6,3,4],d:[],dur:'10'},crEx2:{c:['el','en','obs'],s:[5,6,2],d:[],dur:'5'},crEx3:{c:['dep','anh','dist'],s:[],d:[3,5,7],dur:'14'}};
  function setEx(id){const e=EX[id];$$('input[type=checkbox]',form).forEach(x=>x.checked=false);
    e.c.forEach(k=>{$(`[data-cr="${k}"]`,form).checked=true});e.s.forEach(i=>{$(`[data-crs="${i}"]`,form).checked=true});e.d.forEach(i=>{$(`[data-crd="${i}"]`,form).checked=true});
    $('#crDur').value=e.dur;$$('#crEx1,#crEx2,#crEx3').forEach(b=>b.setAttribute('aria-pressed',b.id===id));render()}
  Object.keys(EX).forEach(id=>$('#'+id).addEventListener('click',()=>setEx(id)));
  $('#crReset').addEventListener('click',()=>{$$('input[type=checkbox]',form).forEach(x=>x.checked=false);$('#crDur').value='5';$$('#crEx1,#crEx2,#crEx3').forEach(b=>b.setAttribute('aria-pressed','false'));render()});
  render();
  const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();render()};
};
