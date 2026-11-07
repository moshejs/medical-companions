/* =============== 2.3 ALSFRS-R and the course =============== */
const CO_STEPS=[
 {from:0,at:.03,k:`King's 1 · Month 0`,t:'Onset',
  txt:`Symptoms begin in one region: weakness, wasting, stiffness, slurred speech or trouble swallowing. King's stage 1 is the first region involved; the regions are bulbar, upper limb, lower limb and diaphragmatic. [[Roche2012]] The ALSFRS-R starts at or near 48, the score for normal function. It has 12 items in four domains (bulbar, fine motor, gross motor, respiratory), each scored 0 to 4. [[Boddy2025,Brooks2022]] Domain sub-scores may begin to fall before the date a person gives as onset. [[Rooney2017]]`,
  pt:`The scale adds up 12 everyday abilities, each worth up to 4 points. 48 means no loss yet.`,
  hook:`ALSFRS-R: 12 items × 0-4 = 48 (normal). Four domains: bulbar, fine motor, gross motor, respiratory.`},
 {from:.08,at:.14,k:'Months 0-12',t:'Seeking a diagnosis',
  txt:`In one US centre, the median time from first symptom to confirmed diagnosis was 11.5 months; people saw an average of three physicians, and 52% first received another diagnosis. [[Paganoni2014]] Bulbar onset is diagnosed about 4.4 months sooner on average. [[Saeed2026]] The lines here are arithmetic, 48 minus rate × months: at 12 months they reach 42 (slow), 36 (intermediate) and 24 (fast).`,
  pt:`Finding the cause often takes about a year, because early ALS can look like many other conditions.`,
  hook:`A longer diagnostic delay goes with slower disease: it is a protective predictor in ENCALS (HR 0.52). [[Westeneng2018]]`},
 {from:.2,at:.24,k:`King's 2A · Mean 13.5 months`,t:'Diagnosis',
  txt:`In the London cohort, diagnosis came at a mean of 13.5 months from onset in people who had died, about 35% of the way through the course. [[Roche2012]] ΔFS uses the score at diagnosis: (48 − ALSFRS-R) / months from onset. [[Kimura2006,Hamidou2017]] In a French cohort the median ΔFS at diagnosis was 1.0 (IQR 0.5-2.0), and those three values set the lines here. [[Hamidou2017]] In a Sydney cohort of 203 people, ΔFS below 0.47 went with a median survival of 2.4 years, 0.47 to 1.11 with 1.6 years and above 1.11 with 0.7 years. [[Labra2016]]`,
  pt:`How fast the score has fallen by the time of diagnosis says more about the future than the score itself.`,
  hook:`ΔFS = (48 − score) / months since onset. A higher ΔFS at diagnosis predicts shorter survival.`},
 {from:.3,at:.38,k:`King's 2B and 3`,t:'More regions involved',
  txt:`A second region was involved at a mean of 17.7 months (about 38% of the course) and a third at 23.3 months (about 61%). [[Roche2012]] Trial participants lose about 1 point a month on average (PRO-ACT 1.02 ± 2.3), while vital capacity falls by 2.24% of predicted a month. [[Atassi2014]] King's stage 3 most often matches MiToS stage 1, the first domain in which independence is lost. [[Fang2017]] Median survival from the third-region milestone was 13 months with bulbar or limb onset. [[Roche2012]]`,
  pt:`The disease spreads from the first region to others. King's stage counts how many regions are involved.`,
  hook:`King's 1-3 = number of regions involved (bulbar, upper limb, lower limb, diaphragmatic). 4A = gastrostomy needed, 4B = NIV needed.`},
 {from:.46,at:.5,k:`King's 4A · Mean 27.7 months`,t:'Gastrostomy',
  txt:`The need for a gastrostomy came at a mean of 27.7 months, about 77% of the course. People with bulbar onset needed gastrostomy before NIV (at 0.71 against 0.81 of the course); people with limb onset needed NIV first (0.73 against 0.81). [[Roche2012]] NICE NG42 recommends discussing gastrostomy early and at regular intervals, and accepts that some people will not want one. [[NICE2016]] In ProGas, weight loss of more than 10% from diagnosis to gastrostomy was linked to a higher hazard of death (HR 2.51). [[ProGas2015]] More in <a href="#nutrition" data-go="nutrition">Swallowing and feeding tubes</a>.`,
  pt:`A feeding tube into the stomach is often discussed once swallowing or weight becomes a problem. It is a choice.`,
  hook:`King's 4A = need for gastrostomy. It comes before NIV more often with bulbar onset.`},
 {from:.54,at:.58,k:`King's 4B · Mean 30.3 months`,t:'Non-invasive ventilation',
  txt:`The need for NIV came at a mean of 30.3 months, about 80% of the course. [[Roche2012]] In the one randomised trial, NIV improved quality of life and survival in people with normal to moderately impaired bulbar function, with a median survival benefit of 205 days. [[Bourke2006]] Median survival from the NIV milestone in the London cohort was 3 months with bulbar onset and 8 months with limb onset. [[Roche2012]] More in <a href="#breathing" data-go="breathing">Breathing and NIV</a>.`,
  pt:`A mask and a small machine support breathing, usually during sleep at first.`,
  hook:`King's 4B = need for NIV. Stage 4 is defined by an intervention being needed, not by a score.`},
 {from:.63,at:.7,k:'Late stage',t:'The range of survival',
  txt:`Median survival from onset is 2 to 4 years across cohorts [[Feldman2022]]; in the London clinic it was 42.3 months (48.3 with limb onset, 30.8 with bulbar onset). [[Roche2012]] A systematic review found that 10-20% live more than 10 years [[Chio2009]], while population registers report 11.8% alive 10 years after diagnosis [[Pupillo2014]] and 7% at 10 years. [[Pupillo2025]] Respiratory failure, including pneumonia, caused 81.3% of deaths in one Italian centre. [[Spataro2010]] MiToS stage 5 is death. [[Chio2015MiToS]]`,
  pt:`Averages hide a wide range. Some people live with ALS for more than ten years.`,
  hook:`Older age and bulbar onset consistently predict shorter survival. [[Chio2009]]`},
 {from:.78,at:.9,k:'Not a straight line',t:'Curves and plateaus',
  txt:`So far the lines were straight, as trial analyses and ΔFS assume. [[Atassi2014,Hamidou2017]] In 1884 people in Paris, ALSFRS-R decline was curvilinear: a quadratic fit described the data and a linear fit did not, and the early and late phases fell fastest. [[Gordon2010]] In PRO-ACT, 25% of participants did not decline over 6 months, 16% over 12 months and 7% over 18 months; fewer than 1% ever improved by 4 points or more for at least 12 months. The authors caution that a short plateau should not be read as a treatment effect. [[Bedlack2016]]`,
  pt:`The score can hold steady for months and then fall again. A pause does not by itself mean that a treatment worked.`,
  hook:`Decline is curvilinear, with plateaus; ΔFS assumes a straight line from 48 at onset.`}
];
const CO_TXT={
  traj:{slow:'Slow',mid:'Intermediate',fast:'Fast'},
  trajBtn:(n,r)=>`${n} · ${r} a month`,
  trajRo:(n,r)=>`${n}, ${r} a month`,
  onset:{limb:'Limb onset',bulb:'Bulbar onset'},
  dom:{bulbar:'Bulbar',fine:'Fine motor',gross:'Gross motor',resp:'Respiratory'},
  kingsHead:`King's stage, mean months from onset in people who had died (London)`,
  kingsHeadN:`King's stage, cohort means`,
  ev:{dx:m=>`Diagnosis (2A) · ${m} months`,g:m=>`Gastrostomy (4A) · ${m} months`,niv:m=>`NIV (4B) · ${m} months`},
  xTitle:'Months since symptom onset',yTitle:'ALSFRS-R total',
  plateau:'6-month plateau',straight:'dashed: straight line',
  ro:{month:'Months since onset',total:'ALSFRS-R total',kings:`King's stage (cohort means)`,kingsN:`King's stage`,doms:'Domain sub-scores'},
  of48:n=>`${n} / 48`, of12:n=>`${n}/12`,
  dfs:(lost,m,v)=>`ΔFS = ${lost} / ${m} = ${v}`, dfsNone:'ΔFS needs time since onset',
  kname:{'1':'First region','2A':'Diagnosis','2B':'Second region','3':'Third region','4A':'Gastrostomy needed','4B':'NIV needed'},
  live:(m,line,sc,st)=>`Month ${m}. ${line}: ALSFRS-R ${sc} of 48. King's stage by cohort means: ${st}.`,
  domOn:'Hide domain sub-scores',domOff:'Show domain sub-scores',
  legDom:'Shaded bands under the followed line split its total into the four domains (schematic).',
  /* ENCALS chart */
  enHead:'Median months from onset to the composite endpoint',
  enGroups:['Very short','Short','Intermediate','Long','Very long'],
  enVal:v=>`${v} months`, enValObs:(v,o)=>`${v} months · observed ${o}`,
  enObsOn:'Hide observed medians',enObsOff:'Show observed medians',
  /* calculator */
  domTot:(n,t)=>`${n} · ${t} / 12`,
  totLbl:'ALSFRS-R total', of48b:'/ 48',
  dfsHead:'Progression rate (ΔFS)',
  dfsCalc:(lost,m,v)=>`(48 − total) / months = ${lost} / ${m} = <b>${v}</b> points a month`,
  dfsNote:`ΔFS was defined with the score at diagnosis and the months from onset to diagnosis; it assumes a score of 48 at onset and a straight line since. [[Kimura2006,Hamidou2017]]`,
  labHead:'Labra 2016 cut-offs (Sydney, 203 people)',
  labBands:[ ['Below 0.47','median survival 2.4 years'],['0.47 to 1.11','median survival 1.6 years'],['Above 1.11','median survival 0.7 years'] ],
  labNote:`Group medians in the cohort that derived the cut-offs, not a forecast for one person. [[Labra2016]]`,
  oldHead:'The commonly quoted bands',
  oldBands:['slower (below 0.5)','intermediate (0.5 to 1.0)','faster (above 1.0)'],
  oldLine:b=>`On the bands of below 0.5, 0.5 to 1.0 and above 1.0 points a month, these inputs fall in the ${b} group. [[Hamidou2017,Meyer2026]]`,
  oldNote:`These three bands are widely used, but who first proposed them could not be traced: Kimura 2006, which introduced ΔFS, gives no bands in its abstract, and later studies use them without naming an origin. [[Kimura2006,Hamidou2017,Labra2016]]`,
  kHead:`King's stage estimated from ALSFRS-R`,
  kTag:'Cut-offs unverified',
  kStage:s=>`Stage ${s}`,
  kNone:'No mapped item below 4',
  kRegions:'Regions scored as involved',
  kReg:{bulbar:'bulbar',ul:'upper limb',ll:'lower limb'},
  kWhy:{a4:'item 5b in use (gastrostomy)',b4:'item 10 at 0 or item 12 at 3 or less (ventilatory support)'},
  kList:a=>a.join(', '),
  kNote:`Balendra and colleagues mapped ALSFRS-R domains to King's regions, with gastrostomy or NIV as the stage 4 proxy; agreement with clinical staging was excellent (ICC 0.92). [[Balendra2014]] The items used are 1-3 (bulbar), 4 and 5a (upper limb), 8 (lower limb), 5b (gastrostomy) and 10 and 12 (breathing). [[AlChalabi2021]] The exact cut-offs are in the Balendra paper, which could not be read for this guide. The cut-offs used here, any mapped item below 4 for a region, item 5b in use for 4A, and item 10 at 0 or item 12 at 3 or less for 4B, come from secondary descriptions in trial documents and have not been checked against the original paper. ALSFRS-R cannot tell stage 2A (diagnosis) from 2B, so two regions show as stage 2.`,
  mHead:'MiToS stage: not estimated',
  mNote:`MiToS counts the domains in which independence is lost: walking or self-care, swallowing, communicating and breathing. Stage 0 is involvement without loss of independence, stages 1-4 the number of domains lost, and stage 5 death. [[Chio2015MiToS]] It uses items 1 and 4 (communicating), 3 (swallowing), 6 and 8 (movement), and 10 and 12 (breathing) [[AlChalabi2021]]; one trial analysis plan combines them as walking or dressing, swallowing, speech and handwriting, and breathlessness or breathing support. [[CTgov_ADORE]] The item cut-offs could not be verified from the original paper, so this calculator shows the mapped items and does not give a MiToS stage.`,
  mDom:[ ['Walking or self-care',[6,8]],['Swallowing',[3]],['Communicating',[1,4]],['Breathing',[10,12]] ],
  mItem:(n,v)=>`item ${n}: ${v}`,
  sum:(tot,dfs,st)=>`<span>ALSFRS-R <b>${tot} / 48</b></span><span>ΔFS <b>${dfs}</b></span><span>King's (estimate) <b>${st}</b></span>`,
  monthsBad:'Enter the months since symptom onset (1 or more) to calculate ΔFS.',
  scoreAria:(v,a)=>`${v}: ${a}`
};
/* ALSFRS-R items: topic and paraphrased levels 4..0 (own wording; the scale text itself is copyrighted) */
const CO_ITEMS=[
 {n:'1',d:'bulbar',t:'Speech',a:['speaks as before','speech sounds changed but is understood','has to repeat to be understood','speech plus other ways of communicating','speech no longer usable to communicate']},
 {n:'2',d:'bulbar',t:'Saliva',a:['no change','slightly more saliva, perhaps some at night','clearly more saliva, a little drooling','much more saliva, some drooling','drooling that needs constant wiping']},
 {n:'3',d:'bulbar',t:'Swallowing',a:['eats as before','eats, with occasional choking','food or drink texture has to be changed','a tube adds to what is eaten','nothing by mouth; all feeding by tube or drip']},
 {n:'4',d:'fine',t:'Handwriting',a:['writes as before','slower or untidier, still readable','some words cannot be read','holds a pen but cannot form words','cannot hold a pen']},
 {n:'5a',d:'fine',t:'Cutting food and using cutlery',a:['as before','slower or clumsier, manages alone','manages most foods with some help','someone else cuts the food; still feeds self slowly','needs to be fed']},
 {n:'5b',d:'fine',t:'Handling the feeding tube and fastenings',a:['as before','clumsy but does every step alone','needs some help with caps and fasteners','carer does most; person helps a little','cannot do any part']},
 {n:'6',d:'fine',t:'Dressing and washing',a:['as before','manages alone, with more effort','needs help now and then, or uses workarounds','needs a carer for self-care','fully reliant on others']},
 {n:'7',d:'gross',t:'Turning in bed and adjusting bedclothes',a:['as before','slower or clumsier, manages alone','manages alone, with great difficulty','starts but cannot finish without help','cannot do it without full help']},
 {n:'8',d:'gross',t:'Walking',a:['walks as before','early difficulty walking','walks with help from a person or an aid','moves but cannot walk usefully','no purposeful leg movement']},
 {n:'9',d:'gross',t:'Climbing stairs',a:['as before','slower','somewhat unsteady or tires','needs help','cannot climb stairs']},
 {n:'10',d:'resp',t:'Breathlessness',a:['none','when walking','with everyday tasks such as eating, washing or dressing','at rest, sitting or lying','severe; mechanical support being considered']},
 {n:'11',d:'resp',t:'Breathlessness lying flat',a:['none','some broken sleep from breathlessness','needs extra pillows to sleep','can sleep only sitting up','cannot sleep for breathlessness']},
 {n:'12',d:'resp',t:'Breathing support',a:['none','NIV used some of the time','NIV through the night','NIV day and night','invasive ventilation (intubation or tracheostomy)']}
];
const CO_EX={
 limb:{m:14,g:false,v:{'1':4,'2':4,'3':4,'4':2,'5':2,'6':3,'7':3,'8':2,'9':1,'10':4,'11':4,'12':4}},
 bulb:{m:8,g:false,v:{'1':2,'2':3,'3':2,'4':4,'5':4,'6':4,'7':4,'8':4,'9':3,'10':4,'11':4,'12':4}},
 late:{m:30,g:true,v:{'1':1,'2':2,'3':1,'4':1,'5':1,'6':1,'7':1,'8':0,'9':0,'10':2,'11':2,'12':3}},
 full:{m:12,g:false,v:{}}
};
/* trajectories (Hamidou 2017 ΔFS quartiles), King's milestones (Roche 2012 last-milestone means) */
const CO_R={slow:.5,mid:1,fast:2};
const CO_COL={slow:'var(--good)',mid:'var(--warn)',fast:'var(--bad)'};
const CO_DCOL={bulbar:'var(--food)',fine:'var(--umn)',gross:'var(--steel)',resp:'var(--air)'};
const CO_KINGS=[ {a:0,b:13.5,s:'1'},{a:13.5,b:17.7,s:'2A'},{a:17.7,b:23.3,s:'2B'},{a:23.3,b:27.7,s:'3'},{a:27.7,b:30.3,s:'4A'},{a:30.3,b:60,s:'4B'} ];
const CO_EV=[ {k:'dx',m:13.5,row:0},{k:'g',m:27.7,row:1},{k:'niv',m:30.3,row:2} ];
/* slider position to months since onset */
const CO_TM=[ [0,0],[.24,13.5],[.5,27.7],[.58,30.3],[.78,48],[1,60] ];
/* schematic domain split: loss in the 1st..4th domain to fall, at total losses 0,6,12,...,48 (each row sums to the total) */
const CO_SPLIT=[ [0,4,6.5,8,9,10,11,11.5,12],[0,1.5,4,6.5,8,9.5,10.5,11.5,12],[0,.5,1,2.5,5,7,9,10.5,12],[0,0,.5,1,2,3.5,5.5,8.5,12] ];
const CO_ORDER={limb:['fine','gross','bulbar','resp'],bulb:['bulbar','fine','gross','resp']};
const CO_EN={pred:[17.7,25.3,32.2,43.7,91.0],obs:[16.5,25.2,32.8,44.6,null]};

/* ALSFRS-R of an illustrative course: rate r a month, bend k (0 straight .. 1 curved with a plateau) */
function coScore(r,m,k){
  const me=m-k*clamp(m-16,0,6),H=48/r,u=me/H;
  if(u>=1)return 0;
  const loss=48*(u+k*.55*Math.sin(2*Math.PI*u)/(2*Math.PI));
  return clamp(48-loss,0,48);
}
function coDoms(score,onset){
  const loss=48-score,o=CO_ORDER[onset],out={};
  o.forEach((d,i)=>{const row=CO_SPLIT[i].map((v,j)=>[j*6,v]);out[d]=12-interp(row,loss)});
  return out;
}
function coKing(m){return CO_KINGS.find(b=>m>=b.a&&m<b.b)||CO_KINGS[CO_KINGS.length-1]}

inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT');
  let traj='mid',dom=false,onset='limb';
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N?{cx0:44,cx1:388,cy0:116,cy1:352,bandY:20,headY:12,rows:[54,70,86],xt:368,xtt:386,yt:12,
               ro:{x:8,y:404,w:384,h:276},head:CO_TXT.kingsHeadN}
             :{cx0:58,cx1:478,cy0:104,cy1:330,bandY:20,headY:12,rows:[54,68,82],xt:346,xtt:366,yt:16,
               ro:{x:494,y:20,w:218,h:352},head:CO_TXT.kingsHead};
    const m=interp(CO_TM,t),kb=ease(ramp(t,.8,.9));
    const X=mm=>L.cx0+mm/60*(L.cx1-L.cx0),Y=s=>L.cy0+(48-s)/48*(L.cy1-L.cy0);
    let s='';
    /* King's band strip */
    s+=`<text x="${L.cx0}" y="${L.headY}" class="t-xs">${L.head}</text>`;
    const kc=coKing(m);
    CO_KINGS.forEach(b=>{const on=b===kc,x0=X(b.a),x1=X(b.b);
      s+=`<rect x="${f1(x0+.5)}" y="${L.bandY}" width="${f1(x1-x0-1)}" height="18" rx="3" style="fill:${on?'var(--steel-soft)':'var(--panel-2)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=`<text x="${f1((x0+x1)/2)}" y="${L.bandY+12.5}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${b.s}</text>`});
    /* grid and axes */
    [0,12,24,36,48].forEach(v=>{s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.cx0-6}" y="${f1(Y(v)+3.5)}" class="t-xs t-end">${v}</text>`});
    [0,12,24,36,48,60].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.cy1}" y2="${L.cy1+4}" class="axis"/><text x="${f1(X(v))}" y="${L.xt}" class="t-xs t-mid">${v}</text>`});
    s+=`<line x1="${L.cx0}" x2="${L.cx0}" y1="${L.cy0}" y2="${L.cy1}" class="axis"/>`;
    s+=`<text x="${f1((L.cx0+L.cx1)/2)}" y="${L.xtt}" class="t-sm t-mid">${CO_TXT.xTitle}</text>`;
    s+=`<text transform="translate(${L.yt} ${f1((L.cy0+L.cy1)/2)}) rotate(-90)" class="t-xs t-mid">${CO_TXT.yTitle}</text>`;
    /* event markers */
    CO_EV.forEach(e=>{const x=X(e.m),y=L.rows[e.row],past=m>=e.m,lbl=CO_TXT.ev[e.k](e.m),w=lbl.length*5.8,right=x+3+w<=L.cx1;
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y+3}" y2="${L.cy1}" style="stroke:${past?'var(--ink)':'var(--muted)'};stroke-width:1.2;stroke-dasharray:3 3;opacity:${past?.7:.45}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${y-3}" r="3" style="fill:${past?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.2"/>`;
      s+=`<text x="${f1(right?x+7:x-7)}" y="${y}" class="t-xs${right?'':' t-end'}" style="fill:${past?'var(--ink)':'var(--muted)'};font-weight:${past?600:500}">${lbl}</text>`});
    /* plateau window (last phase) */
    if(kb>0){const x0=X(16),x1=X(22);
      s+=`<rect x="${f1(x0)}" y="${L.cy0}" width="${f1(x1-x0)}" height="${L.cy1-L.cy0}" style="fill:var(--steel-soft);opacity:${f1(.8*kb)}"/>`;
      const pw=CO_TXT.plateau.length*5.8+10;
      s+=`<rect x="${f1((x0+x1)/2-pw/2)}" y="${L.cy0+2}" width="${f1(pw)}" height="14" rx="4" style="fill:var(--panel);opacity:${f1(.9*kb)}"/>`;
      s+=`<text x="${f1((x0+x1)/2)}" y="${L.cy0+12}" class="t-xs t-mid" style="fill:var(--steel);font-weight:600;opacity:${f1(kb)}">${CO_TXT.plateau}</text>`}
    /* domain stack under the followed line */
    const mEnd=Math.min(m,60),R=CO_R[traj];
    if(dom&&mEnd>0){const n=Math.max(2,Math.ceil(mEnd/.5)),pts=[];
      for(let i=0;i<=n;i++){const mm=mEnd*i/n,dd=coDoms(coScore(R,mm,kb),onset);pts.push([mm,dd])}
      let base=pts.map(()=>0);
      ['resp','gross','fine','bulbar'].forEach(d=>{const top=pts.map((p,i)=>base[i]+p[1][d]);
        let path='M'+pts.map((p,i)=>f1(X(p[0]))+' '+f1(Y(top[i]))).join('L');
        for(let i=pts.length-1;i>=0;i--)path+='L'+f1(X(pts[i][0]))+' '+f1(Y(base[i]));
        s+=`<path d="${path}Z" style="fill:${CO_DCOL[d]};opacity:.42"/>`;base=top})}
    /* the three lines */
    const LBL={slow:52,mid:34,fast:16},lbox=[];
    ['slow','mid','fast'].forEach(k=>{const r=CO_R[k],sel=k===traj,col=CO_COL[k];
      const path=(a,b)=>{let d='';for(let mm=a;mm<=b+1e-6;mm+=.5){const sc=coScore(r,mm,kb);d+=(d?'L':'M')+f1(X(mm))+' '+f1(Y(sc));if(sc<=0)break}return d};
      if(sel&&kb>0){let d='';for(let mm=0;mm<=60;mm+=1){const sc=coScore(r,mm,0);d+=(d?'L':'M')+f1(X(mm))+' '+f1(Y(sc));if(sc<=0)break}
        s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:1.4;stroke-dasharray:5 4;opacity:${f1(.7*kb)}"/>`}
      s+=`<path d="${path(0,60)}" style="fill:none;stroke:${col};stroke-width:${sel?2:1.4};opacity:.28"/>`;
      if(mEnd>0)s+=`<path d="${path(0,mEnd)}" style="fill:none;stroke:${col};stroke-width:${sel?3.4:1.8};stroke-linecap:round;stroke-linejoin:round"/>`;
      const lm=LBL[k],ly=Y(coScore(r,lm,kb));lbox.push([X(lm)+6,ly-18,X(lm)+6+CO_TXT.traj[k].length*6.8,ly-5]);
      s+=`<text x="${f1(X(lm)+6)}" y="${f1(ly-8)}" class="t-sm" style="fill:${col};font-weight:${sel?700:500}">${CO_TXT.traj[k]}</text>`});
    if(kb>0)s+=`<text x="${L.cx1}" y="${L.cy0-6}" class="t-xs t-end" style="opacity:${f1(kb)}">${CO_TXT.straight}</text>`;
    /* cursor */
    const cx=X(mEnd);
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.cy0}" y2="${L.cy1}" style="stroke:var(--ink);stroke-width:1.5;opacity:.45"/>`;
    ['slow','mid','fast'].forEach(k=>{const sel=k===traj,sc=coScore(CO_R[k],mEnd,kb);
      s+=`<circle cx="${f1(cx)}" cy="${f1(Y(sc))}" r="${sel?5.5:3.5}" style="fill:${sel?CO_COL[k]:'var(--panel)'};stroke:${CO_COL[k]};stroke-width:2"/>`});
    const sc=coScore(R,mEnd,kb),dd=coDoms(sc,onset),dv={};let tot=0;
    Object.keys(dd).forEach(d=>{dv[d]=Math.round(dd[d]);tot+=dv[d]});
    {const ty=clamp(Y(sc)-9,L.cy0,L.cy1-18),hit=x=>lbox.some(q=>x<q[2]&&x+34>q[0]&&ty<q[3]&&ty+18>q[1]);
      const tx=(cx+10+34<=L.cx1&&!hit(cx+10))||hit(cx-44)?cx+10:cx-44;
      s+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="34" height="18" rx="9" style="fill:var(--ink)"/><text x="${f1(tx+17)}" y="${f1(ty+12.5)}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${tot}</text>`}
    /* readout */
    const o=L.ro,px=o.x+14;
    s+=`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="12" style="fill:var(--panel-2)"/>`;
    const dfsT=mEnd>=1?CO_TXT.dfs(f1(48-sc),f1(mEnd),f1((48-sc)/mEnd)):CO_TXT.dfsNone;
    const bars=(x,y0,w,gap)=>{let g='';['bulbar','fine','gross','resp'].forEach((d,i)=>{const y=y0+i*gap;
      g+=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink)">${CO_TXT.dom[d]}</text><text x="${x+w}" y="${y}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${CO_TXT.of12(dv[d])}</text>`;
      g+=`<rect x="${x}" y="${y+4}" width="${w}" height="8" rx="4" style="fill:var(--panel)"/><rect x="${x}" y="${y+4}" width="${f1(w*dv[d]/12)}" height="8" rx="4" style="fill:${CO_DCOL[d]}"/>`});return g};
    if(!N){
      s+=`<text x="${px}" y="${o.y+24}" class="t-sm">${CO_TXT.ro.month}</text><text x="${px}" y="${o.y+48}" class="t-big">${f1(mEnd)}</text>`;
      s+=`<text x="${px}" y="${o.y+74}" class="t-sm" style="fill:${CO_COL[traj]};font-weight:700">${CO_TXT.trajRo(CO_TXT.traj[traj],CO_R[traj].toFixed(1))}</text>`;
      s+=`<text x="${px}" y="${o.y+98}" class="t-sm">${CO_TXT.ro.total}</text><text x="${px}" y="${o.y+122}" class="t-big">${CO_TXT.of48(tot)}</text>`;
      s+=`<text x="${px}" y="${o.y+142}" class="t-xs">${dfsT}</text>`;
      s+=`<text x="${px}" y="${o.y+170}" class="t-sm">${CO_TXT.ro.kings}</text><text x="${px}" y="${o.y+194}" class="t-big">${kc.s}</text><text x="${px+40}" y="${o.y+193}" class="t-sm" style="fill:var(--ink)">${CO_TXT.kname[kc.s]}</text>`;
      s+=`<text x="${px}" y="${o.y+222}" class="t-sm">${CO_TXT.ro.doms}</text>`+bars(px,o.y+242,o.w-28,26);
    }else{
      const c2=o.x+200;
      s+=`<text x="${px}" y="${o.y+24}" class="t-sm">${CO_TXT.ro.month}</text><text x="${px}" y="${o.y+48}" class="t-big">${f1(mEnd)}</text>`;
      s+=`<text x="${c2}" y="${o.y+24}" class="t-sm">${CO_TXT.ro.kingsN}</text><text x="${c2}" y="${o.y+48}" class="t-big">${kc.s}</text><text x="${c2+36}" y="${o.y+47}" class="t-xs" style="fill:var(--ink)">${CO_TXT.kname[kc.s]}</text>`;
      s+=`<text x="${px}" y="${o.y+76}" class="t-sm" style="fill:${CO_COL[traj]};font-weight:700">${CO_TXT.trajRo(CO_TXT.traj[traj],CO_R[traj].toFixed(1))}</text>`;
      s+=`<text x="${px}" y="${o.y+100}" class="t-sm">${CO_TXT.ro.total}</text><text x="${px}" y="${o.y+124}" class="t-big">${CO_TXT.of48(tot)}</text>`;
      s+=`<text x="${c2}" y="${o.y+124}" class="t-xs">${dfsT}</text>`;
      s+=`<text x="${px}" y="${o.y+150}" class="t-sm">${CO_TXT.ro.doms}</text>`+bars(px,o.y+170,o.w-28,26);
    }
    svg.innerHTML=s;
    const p=phaseOf(CO_STEPS,t);setSt(p);
    $('#coNote').innerHTML=noteHTML(CO_STEPS[p])+`<p class="readout">${CO_TXT.live(Math.round(mEnd),CO_TXT.traj[traj],tot,kc.s)}</p>`;
  }
  const stop=playWire(rg,$('#coPlay'),draw,22000,UI.replay,'course');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  toggleRow($('#coTraj'),['slow','mid','fast'].map(k=>[k,CO_TXT.trajBtn(CO_TXT.traj[k],CO_R[k].toFixed(1))]),traj,v=>{traj=v;draw(+rg.value)});
  toggleRow($('#coOnset'),[ ['limb',CO_TXT.onset.limb],['bulb',CO_TXT.onset.bulb] ],onset,v=>{onset=v;draw(+rg.value)});
  const db=$('#coDom');
  const legend=()=>{$('#coLeg').innerHTML=dom?`<span>${CO_TXT.legDom}</span>`+['bulbar','fine','gross','resp'].map(d=>`<span><i style="background:${CO_DCOL[d]};height:10px;opacity:.6"></i>${CO_TXT.dom[d]}</span>`).join(''):''};
  db.addEventListener('click',()=>{dom=!dom;db.setAttribute('aria-pressed',dom);db.textContent=dom?CO_TXT.domOn:CO_TXT.domOff;legend();draw(+rg.value)});
  legend();
  draw(+rg.value);

  /* ---------- ENCALS risk groups ---------- */
  const es=$('#coEnSvg');let obs=true;
  function drawEn(){
    const N=vb(es,'720 260','400 350');
    const L=N?{x0:14,x1:386,y0:54,gap:58,bh:16,lblDy:-8,ax:334}:{x0:150,x1:690,y0:42,gap:38,bh:20,lblDy:null,ax:238};
    const X=v=>L.x0+v/110*(L.x1-L.x0);
    let s=`<text x="${N?L.x0:12}" y="18" class="t-sm">${CO_TXT.enHead}</text>`;
    [0,24,48,72,96].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-10}" y2="${L.ax-14}" class="grid"/><text x="${f1(X(v))}" y="${L.ax}" class="t-xs t-mid">${v}</text>`});
    CO_EN.pred.forEach((v,i)=>{const y=L.y0+i*L.gap,ob=CO_EN.obs[i],xe=X(v);
      s+=N?`<text x="${L.x0}" y="${y+L.lblDy}" class="t-sm" style="fill:var(--ink);font-weight:700">${CO_TXT.enGroups[i]}</text>`
          :`<text x="12" y="${f1(y+L.bh/2+4)}" class="t-sm" style="fill:var(--ink);font-weight:700">${CO_TXT.enGroups[i]}</text>`;
      s+=`<rect x="${L.x0}" y="${y}" width="${f1(xe-L.x0)}" height="${L.bh}" rx="4" style="fill:var(--steel);opacity:${f1(.45+.11*i)}"/>`;
      if(obs&&ob!=null)s+=`<line x1="${f1(X(ob))}" x2="${f1(X(ob))}" y1="${y-4}" y2="${y+L.bh+4}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/>`;
      const lbl=obs&&ob!=null?CO_TXT.enValObs(v.toFixed(1),ob.toFixed(1)):CO_TXT.enVal(v.toFixed(1)),w=lbl.length*5.8,
            ref=Math.max(xe,obs&&ob!=null?X(ob):0),out=ref+8+w<=L.x1+4;
      s+=out?`<text x="${f1(ref+8)}" y="${f1(y+L.bh/2+3.5)}" class="t-xs" style="fill:var(--ink)">${lbl}</text>`
            :`<text x="${f1(xe-6)}" y="${f1(y+L.bh/2+3.5)}" class="t-xs t-end" style="fill:var(--on-steel);font-weight:700">${lbl}</text>`});
    es.innerHTML=s;
  }
  const eb=$('#coEnObs');
  eb.addEventListener('click',()=>{obs=!obs;eb.setAttribute('aria-pressed',obs);eb.textContent=obs?CO_TXT.enObsOn:CO_TXT.enObsOff;drawEn()});
  eb.textContent=CO_TXT.enObsOn;
  const prevR=redraws.course;redraws.course=()=>{prevR&&prevR();drawEn()};
  drawEn();

  /* ---------- calculator ---------- */
  const sc={};CO_ITEMS.forEach(it=>{sc[it.n==='5a'||it.n==='5b'?'5':it.n]=4});
  let gas=false;
  const box=$('#coItems'),moI=$('#coMo');
  const itemOf=key=>CO_ITEMS.find(it=>key==='5'?it.n===(gas?'5b':'5a'):it.n===key);
  function buildItems(){
    let h='';
    ['bulbar','fine','gross','resp'].forEach(d=>{
      h+=`<fieldset data-dom="${d}"><legend><span class="co-sw" style="background:${CO_DCOL[d]}"></span><b data-dtot="${d}"></b></legend>`;
      CO_ITEMS.filter(it=>it.d===d&&!(it.n==='5a'&&gas)&&!(it.n==='5b'&&!gas)).forEach(it=>{const key=it.n==='5a'||it.n==='5b'?'5':it.n;
        h+=`<div class="co-it" role="group" aria-labelledby="coIt${it.n}"><div class="co-ih"><span class="n">${it.n}</span><span id="coIt${it.n}">${it.t}</span></div><div class="co-sc">`;
        [4,3,2,1,0].forEach(v=>{h+=`<button class="btn" data-it="${key}" data-v="${v}" aria-pressed="${sc[key]===v}" aria-label="${CO_TXT.scoreAria(v,it.a[4-v])}">${v}</button>`});
        h+=`</div><p class="co-an" data-an="${key}"></p></div>`});
      h+='</fieldset>'});
    box.innerHTML=h;
  }
  function calc(){
    $$('[data-it]',box).forEach(b=>b.setAttribute('aria-pressed',sc[b.dataset.it]===+b.dataset.v));
    $$('[data-an]',box).forEach(p=>{const it=itemOf(p.dataset.an),v=sc[p.dataset.an];p.innerHTML=`<b>${v}</b> · ${it.a[4-v]}`});
    const dsum={bulbar:0,fine:0,gross:0,resp:0};
    Object.keys(sc).forEach(k=>{dsum[itemOf(k).d]+=sc[k]});
    $$('[data-dtot]',box).forEach(b=>{const d=b.dataset.dtot;b.textContent=CO_TXT.domTot(CO_TXT.dom[d],dsum[d])});
    const tot=dsum.bulbar+dsum.fine+dsum.gross+dsum.resp,mo=Math.round(+moI.value);
    let h=`<div class="kicker">${CO_TXT.totLbl}</div><div class="co-tot"><strong>${tot}</strong><span class="kicker">${CO_TXT.of48b}</span></div>`;
    h+=`<div class="co-bars">`+['bulbar','fine','gross','resp'].map(d=>`<span>${CO_TXT.dom[d]}</span><i><b style="width:${f1(dsum[d]/12*100)}%;background:${CO_DCOL[d]}"></b></i><span class="v">${CO_TXT.of12(dsum[d])}</span>`).join('')+`</div>`;
    /* ΔFS and bands */
    h+=`<div class="co-box"><h5>${CO_TXT.dfsHead}</h5>`;
    if(!(mo>=1)){h+=`<p>${CO_TXT.monthsBad}</p></div>`}
    else{const v=(48-tot)/mo,vs=v.toFixed(2),lb=v<.47?0:v<=1.11?1:2,ob=v<.5?0:v<=1?1:2;
      h+=`<p>${CO_TXT.dfsCalc(48-tot,mo,vs)}</p><small>${CO_TXT.dfsNote}</small></div>`;
      h+=`<div class="co-box"><h5>${CO_TXT.labHead}</h5><div class="co-bands">`+CO_TXT.labBands.map((b,i)=>`<div class="${i===lb?'on':''}"><span>${b[0]}</span><span>${b[1]}</span></div>`).join('')+`</div><small>${CO_TXT.labNote}</small></div>`;
      h+=`<div class="co-box"><h5>${CO_TXT.oldHead}</h5><p>${CO_TXT.oldLine(CO_TXT.oldBands[ob])}</p><small>${CO_TXT.oldNote}</small></div>`}
    /* King's estimate (secondary-source cut-offs, flagged) */
    const reg=[];
    if(sc['1']<4||sc['2']<4||sc['3']<4)reg.push('bulbar');
    if(sc['4']<4||(!gas&&sc['5']<4))reg.push('ul');
    if(sc['8']<4)reg.push('ll');
    const b4=sc['10']===0||sc['12']<=3;
    const st=b4?'4B':gas?'4A':reg.length?String(reg.length):null;
    h+=`<div class="co-box"><h5>${CO_TXT.kHead} <span class="ev early">${CO_TXT.kTag}</span></h5>`;
    h+=`<div class="big">${st?CO_TXT.kStage(st):CO_TXT.kNone}</div>`;
    if(reg.length)h+=`<p>${CO_TXT.kRegions}: ${CO_TXT.kList(reg.map(r=>CO_TXT.kReg[r]))}</p>`;
    if(b4)h+=`<p>${CO_TXT.kWhy.b4}</p>`;else if(gas)h+=`<p>${CO_TXT.kWhy.a4}</p>`;
    h+=`<small>${CO_TXT.kNote}</small></div>`;
    /* MiToS: mapping only */
    h+=`<div class="co-box"><h5>${CO_TXT.mHead}</h5><div class="co-chips">`+CO_TXT.mDom.map(([n,its])=>`<span><b>${n}</b> · ${its.map(i=>CO_TXT.mItem(i,sc[String(i)])).join(', ')}</span>`).join('')+`</div><small>${CO_TXT.mNote}</small></div>`;
    $('#coOut').innerHTML=h;
    $('#coSum').innerHTML=CO_TXT.sum(tot,mo>=1?((48-tot)/mo).toFixed(2):'–',st||'–');
  }
  box.addEventListener('click',e=>{const b=e.target.closest('[data-it]');if(!b)return;sc[b.dataset.it]=+b.dataset.v;calc()});
  $('#coGas').addEventListener('change',e=>{gas=e.target.checked;buildItems();calc()});
  moI.addEventListener('input',calc);
  $('#coMoDn').addEventListener('click',()=>{moI.value=Math.max(1,(Math.round(+moI.value)||1)-1);calc()});
  $('#coMoUp').addEventListener('click',()=>{moI.value=Math.min(240,(Math.round(+moI.value)||0)+1);calc()});
  $$('[data-coex]').forEach(b=>b.addEventListener('click',()=>{const ex=CO_EX[b.dataset.coex];
    Object.keys(sc).forEach(k=>{sc[k]=ex.v[k]??4});gas=ex.g;$('#coGas').checked=gas;moI.value=ex.m;buildItems();calc()}));
  buildItems();calc();
};
