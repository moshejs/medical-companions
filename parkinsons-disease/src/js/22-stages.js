/* =============== 2.2 stages =============== */
const ST_HY='1967 wording as commonly reproduced in secondary sources; the original text could not be checked (unverified).';
const ST_STEPS=[
 {from:0,at:.08,k:'Stage 1',t:'One side',
  txt:`"Unilateral involvement only, usually with minimal or no functional impairment." (${ST_HY}) [[Hoehn1967,Goetz2004HY]] In a Singapore cohort of 695 people, the median time to move from stage 1 to stage 2 was 20 months. [[Zhao2010]]`,
  pt:'Signs are on one side of the body only, for example a tremor or stiffness in one hand. Everyday life is usually little affected.',
  hook:'Hoehn and Yahr 1 = one side only.'},
 {from:.2,at:.28,k:'Stage 2',t:'Both sides, balance kept',
  txt:`"Bilateral or midline involvement, without impairment of balance." (${ST_HY}) [[Hoehn1967,Goetz2004HY]] The widely used modified scale adds 1.5 (one side plus the trunk) and 2.5 (mild disease on both sides, with recovery on the pull test). [[Goetz2004HY]] In the Singapore cohort the median time from 2 to 2.5 was 62 months, the longest step. [[Zhao2010]]`,
  pt:'Both sides of the body are affected, or the middle of the body such as posture or speech, but balance is still normal.'},
 {from:.42,at:.5,k:'Stage 3',t:'Balance affected',
  txt:`"First signs of impaired righting reflexes", seen as unsteadiness on turning or when pushed; some restriction of activities, but people remain physically able to lead independent lives. (${ST_HY}) [[Hoehn1967,Goetz2004HY]] Median 25 months from 2.5 to 3. [[Zhao2010]] In CamPaIGN a non-tremor-dominant motor type, age and other illnesses predicted reaching postural instability sooner, and 68% had it by 10 years. [[WilliamsGray2013]]`,
  pt:'Balance starts to go: the person may stagger when turning or when pulled backwards, but still lives independently.',
  hook:'Hoehn and Yahr stage 3 = first postural instability (pull test) with physical independence.'},
 {from:.62,at:.7,k:'Stage 4',t:'Severe disability, still walks',
  txt:`"Fully developed, severely disabling disease"; the person can still walk and stand unassisted but is markedly incapacitated. (${ST_HY}) [[Hoehn1967,Goetz2004HY]] Median 24 months from 3 to 4. [[Zhao2010]] Falls are common across the course: in prospective studies 60.5% fell at least once and 39% fell repeatedly, and 47% of 6,620 people surveyed reported regular freezing. [[Allen2013,Macht2007]]`,
  pt:'Walking and standing are still possible without help, but the illness now limits most activities.',
  hook:'Stage 4 still walks and stands unassisted; needing a wheelchair or bed unless aided is stage 5.'},
 {from:.82,at:.9,k:'Stage 5',t:'Wheelchair or bed',
  txt:`"Confinement to bed or wheelchair unless aided." (${ST_HY}) [[Hoehn1967,Goetz2004HY]] Median 26 months from 4 to 5 in the Singapore cohort. [[Zhao2010]] In the Sydney cohort, 48% of the people still alive at 20 years were in nursing homes. [[Hely2008]]`,
  pt:'The person needs help to get about and spends most of the day in a wheelchair or bed.',
  hook:'The scale says nothing about non-motor problems such as mood, sleep or thinking. [[Goetz2004HY]]'}
];
/* pose by stage (index 0..4): lean forward, stride, arm swing, knee flex, elbow flex */
const ST_POSE=[ {lean:.03,stride:1,swing:1,knee:0,flex:.2},{lean:.09,stride:.85,swing:.5,knee:2,flex:.5},{lean:.17,stride:.6,swing:.35,knee:5,flex:.7},{lean:.27,stride:.38,swing:.2,knee:9,flex:1},{lean:.27,stride:.3,swing:.2,knee:9,flex:1} ];
const ST_CHIPS=[ /* [sides, balance, mobility] as [lines, severity 0 good 1 caution 2 harm] */
 [ [['one side'],1],[['kept'],0],[['walks unaided'],0] ],
 [ [['both sides'],2],[['kept'],0],[['walks unaided'],0] ],
 [ [['both sides'],2],[['unsteady when','pulled or turning'],1],[['walks unaided'],0] ],
 [ [['both sides'],2],[['impaired'],2],[['walks unaided,','markedly limited'],1] ],
 [ [['both sides'],2],[['impaired'],2],[['wheelchair or bed','unless aided'],2] ] ];
const ST_WORD=['Unilateral involvement only, usually with minimal or no functional impairment.','Bilateral or midline involvement, without impairment of balance.','First signs of impaired righting reflexes (unsteady on turning or when pushed); some restriction of activities, but physically able to lead an independent life.','Fully developed, severely disabling disease; can still walk and stand unassisted but markedly incapacitated.','Confinement to bed or wheelchair unless aided.'];
const ST_SHORT=['one side','both','balance','severe','chair, bed'],ST_MID=['One side','Both sides','Balance','Severe','Chair or bed'];
const ST_TIME=[ ['1→2',20],['2→2.5',62],['2.5→3',25],['3→4',24],['4→5',26] ];
const ST_NM=[ ['Any non-motor symptom',98.6,'PRIAMO'],['Fatigue',58,'PRIAMO'],['Anxiety',56,'PRIAMO'],['REM sleep behaviour disorder',46,'meta-analysis'],['Insomnia',44,'meta-analysis'],['Apathy',39.8,'23 studies'],['Urgency or nocturia',35,'PRIAMO'],['Depressive symptoms',35,'36 articles'],['Daytime sleepiness',35,'meta-analysis'],['Orthostatic hypotension',30.1,'25 studies'],['Mild cognitive impairment',27,'without dementia'],['Dementia',24.5,'review'] ];
const ST_NMTXT='In PRIAMO, 98.6% of 1,072 people reported at least one non-motor symptom, 7.8 on average; fatigue (58%) and anxiety (56%) led, and non-motor symptoms became more frequent as the disease lasted longer and grew more severe. [[Barone2009]] Pooled prevalences: REM sleep behaviour disorder 46%, insomnia 44% and excessive daytime sleepiness 35% [[Maggi2023]]; apathy 39.8% [[denBrok2015]]; clinically significant depressive symptoms 35% [[Reijnders2008]]; orthostatic hypotension 30.1% [[Velseboer2011]]; mild cognitive impairment 27% of people without dementia [[Litvan2012]]; dementia 24.5% [[Aarsland2005]]. Details are in <a href="#nonmotor" data-go="nonmotor">Beyond movement</a>.';
const ST_SUB={t:'<b>Tremor-dominant:</b> 441 of 800 people with early, untreated Parkinson\'s in the DATATOP cohort. [[Jankovic1990]]',
  p:'<b>Postural instability and gait difficulty (PIGD):</b> 233 of 800 in DATATOP, with more intellectual, motor and occupational impairment. [[Jankovic1990]] A non-tremor-dominant type predicted earlier postural instability in CamPaIGN [[WilliamsGray2013]], and an akinetic-dominant or mixed type predicted dementia (OR 3.3) in a Norwegian cohort. [[Aarsland2003]]'};
function stWrap(txt,n){const out=[];let ln='';txt.split(' ').forEach(w=>{if((ln+' '+w).trim().length>n){out.push(ln);ln=w}else ln=(ln+' '+w).trim()});if(ln)out.push(ln);return out}
function stWalker(x,g,P,ph,hl,td,trem){/* walking figure facing right; hl: 1 = front side affected, 2 = both */
  const a=P.lean,hipY=g-70+P.knee*.5,up=h=>[x+Math.sin(a)*h,hipY-Math.cos(a)*h];
  const [sx,sy]=up(50),[nx,ny]=up(56),[hx,hy]=up(70),sw=Math.sin(ph);
  const leg=(sg,c,o)=>{const fx=x+sg*P.stride*15*sw+3,kx=(x+fx)/2+5+P.knee,ky=(hipY+g)/2;
    return `<path d="M${f1(x)} ${f1(hipY)}L${f1(kx)} ${f1(ky)}L${f1(fx)} ${g}l7 0" style="fill:none;stroke:${c};stroke-width:7;stroke-linecap:round;stroke-linejoin:round;opacity:${o}"/>`};
  const arm=(sg,c,o,shake)=>{const s2=P.swing*sw*sg,ex=sx+3-s2*9,ey=sy+25,hx2=ex+7+P.flex*9-s2*7+shake,hy2=ey+21-P.flex*7;
    return `<path d="M${f1(sx)} ${f1(sy)}L${f1(ex)} ${f1(ey)}L${f1(hx2)} ${f1(hy2)}" style="fill:none;stroke:${c};stroke-width:6;stroke-linecap:round;stroke-linejoin:round;opacity:${o}"/>`+
      (shake!==0?`<path d="M${f1(hx2+7)} ${f1(hy2-5)}q4 5 0 10M${f1(hx2+12)} ${f1(hy2-8)}q6 8 0 16" style="fill:none;stroke:var(--rose);stroke-width:1.5;opacity:${o}"/>`:'')};
  const cA='var(--sage)',cF=hl>=1?'var(--rose)':cA,cB=hl>=2?'var(--rose)':cA;
  const sh=td?trem:0;
  return leg(-1,cB,.55)+arm(-1,cB,.55,hl>=2?sh*.6:0)+`<path d="M${f1(x)} ${f1(hipY)}L${f1(nx)} ${f1(ny)}" style="stroke:var(--sage);stroke-width:8;stroke-linecap:round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="11.5" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:3"/>`+leg(1,cF,1)+arm(1,cF,1,hl>=1?sh:0);
}
function stChair(x,g,o){/* person in a wheelchair, with a carer pushing */
  const st='fill:none;stroke-linecap:round;stroke-linejoin:round';
  let s=`<g style="opacity:${f1(o)}">`;
  s+=`<circle cx="${x+4}" cy="${g-30}" r="30" style="${st};stroke:var(--muted);stroke-width:3"/><circle cx="${x+4}" cy="${g-30}" r="4" style="fill:var(--muted)"/><circle cx="${x+46}" cy="${g-8}" r="8" style="${st};stroke:var(--muted);stroke-width:2.5"/>`;
  s+=`<path d="M${x-14} ${g-54}H${x+34}L${x+46} ${g-16}M${x-14} ${g-54}L${x-22} ${g-104}L${x-36} ${g-106}" style="${st};stroke:var(--muted);stroke-width:4"/>`;
  s+=`<path d="M${x-6} ${g-62}L${x+4} ${g-112}" style="${st};stroke:var(--sage);stroke-width:8"/><circle cx="${x+8}" cy="${g-126}" r="11.5" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:3"/>`;
  s+=`<path d="M${x-6} ${g-62}H${x+32}L${x+40} ${g-18}h8" style="${st};stroke:var(--rose);stroke-width:7"/><path d="M${x+2} ${g-104}L${x+18} ${g-80}L${x+32} ${g-74}" style="${st};stroke:var(--rose);stroke-width:6"/>`;
  const cx=x-62;
  s+=`<path d="M${cx-8} ${g}L${cx} ${g-66}L${cx+8} ${g}M${cx} ${g-66}L${cx+4} ${g-118}M${cx+3} ${g-106}L${cx+24} ${g-94}L${x-36} ${g-104}" style="${st};stroke:var(--sky);stroke-width:6"/><circle cx="${cx+6}" cy="${g-132}" r="11" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:3"/><text x="${cx}" y="${g+16}" class="t-xs t-mid" style="fill:var(--sky)">carer</text>`;
  return s+'</g>'}
inits.stages=()=>{
  /* ---------- 1. Hoehn and Yahr ---------- */
  const svg=$('#stSvg'),rg=$('#stT');let nm=false,pigd=false;
  const B=ST_STEPS.map(s=>s.from).concat([1.0001]);
  const stageOf=t=>{let k=0;for(let i=0;i<5;i++)if(t>=B[i])k=i;return [k,ramp(t,B[k],B[k+1])]};
  const months=(k,f)=>{const c=[0,20,82,107,131,157];if(k===0)return 20*f;if(k===1)return 20+87*f;if(k===2)return 107+24*f;if(k===3)return 131+26*f;return 157};
  const sevCol=v=>['var(--good)','var(--warn)','var(--bad)'][v],sevSoft=v=>['var(--good-soft)','var(--warn-soft)','var(--bad-soft)'][v];
  function draw(t){
    const N=vb(svg,'720 400','400 670');
    const L=N?{rx0:12,rx1:388,ry:12,rh:40,fx:118,g:298,tx:214,ty:96,px:12,pw:376,cy:316,ch:66,wy:394,wh:96,sy:502,sh:70,ny:330,nlx:12,nbx:176,nbw:150,nrh:20,by:620,wc:46}
            :{rx0:24,rx1:696,ry:14,rh:40,fx:124,g:318,tx:24,ty:84,px:270,pw:424,cy:72,ch:66,wy:148,wh:92,sy:250,sh:72,ny:88,nlx:270,nbx:476,nbw:170,nrh:19,by:356,wc:56};
    const [k,f]=stageOf(t),blend=ease(ramp(f,.8,1)),k2=Math.min(4,k+1);
    const P={};Object.keys(ST_POSE[0]).forEach(q=>P[q]=lerp(ST_POSE[k][q],ST_POSE[k2][q],k<4?blend:0));
    if(pigd){P.lean+=.07;P.stride*=.72;P.swing*=.7;P.knee+=2}
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* stage ruler */
    const bw=(L.rx1-L.rx0-4*6)/5;
    for(let i=0;i<5;i++){const x=L.rx0+i*(bw+6),on=i===k,past=i<k;
      s+=`<rect data-st-go="${i}" class="clk" x="${f1(x)}" y="${L.ry}" width="${f1(bw)}" height="${L.rh}" rx="8" style="fill:${on?'var(--rose-soft)':past?'var(--panel-2)':'var(--panel)'};stroke:${on?'var(--rose)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(x+(N?bw/2:14))}" y="${L.ry+(N?17:26)}" class="t-big ${N?'t-mid':''}" style="pointer-events:none;fill:${on?'var(--rose)':'var(--ink)'}">${i+1}</text><text x="${f1(x+(N?bw/2:34))}" y="${L.ry+(N?32:25)}" class="t-xs ${N?'t-mid':''}" style="pointer-events:none;fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${N?ST_SHORT[i]:ST_MID[i]}</text>`}
    /* figure */
    const chairO=k===4?ease(ramp(f,0,.25)):(k===3?0:0),walkO=1-chairO;
    s+=`<path d="M${L.fx-100} ${L.g}H${L.fx+(N?80:110)}" class="axis" style="stroke:var(--muted)"/>`;
    const ph=t*90,trem=Math.sin(t*900)*2.2,hl=k===0?1:2;
    if(walkO>0)s+=`<g style="opacity:${f1(walkO)}">${stWalker(L.fx,L.g,P,ph,hl,!pigd,trem)}</g>`;
    if(chairO>0)s+=stChair(L.fx+10,L.g,chairO);
    if(pigd&&walkO>0&&k>=1)for(let i=0;i<3;i++)s+=`<path d="M${L.fx-30-i*16} ${L.g+5}h9" style="stroke:var(--rose);stroke-width:2.4;stroke-linecap:round;opacity:${f1(walkO*(.6-i*.15))}"/>`;
    if(k===2||(k===3&&f<.15)){const po=k===2?bump(f,.05,.95):0;
      if(po>0){const yy=L.g-118;s+=`<g style="opacity:${f1(po)}"><path d="M${L.fx-22} ${yy}h-30" style="stroke:var(--sky);stroke-width:3;stroke-linecap:round"/><path d="M${L.fx-58} ${yy}l9 -6v12z" style="fill:var(--sky)"/><text x="${L.fx-58}" y="${yy-10}" class="t-xs" style="fill:var(--sky)">pull test</text><text x="${L.fx-(N?100:110)}" y="${yy+20}" class="t-xs" style="fill:var(--warn);font-weight:700">steps back</text><text x="${L.fx-(N?100:110)}" y="${yy+32}" class="t-xs" style="fill:var(--warn);font-weight:700">to recover</text></g>`}}
    /* stage caption near the figure */
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:22px;fill:var(--rose)">Stage ${k+1}</text><text x="${L.tx}" y="${L.ty+18}" class="t-sm" style="fill:var(--ink);font-weight:600">${ST_STEPS[k].t}</text>`;
    s+=`<text x="${L.tx}" y="${L.ty+34}" class="t-xs">${pigd?'subtype: PIGD':'subtype: tremor-dominant'}</text>`;
    if(!nm){
      /* chips */
      const cw=(L.pw-16)/3;
      ['SIDES','BALANCE','MOBILITY'].forEach((ti,i)=>{const [lines,sv]=ST_CHIPS[k][i],x=L.px+i*(cw+8);
        s+=`<rect x="${f1(x)}" y="${L.cy}" width="${f1(cw)}" height="${L.ch}" rx="10" style="fill:${sevSoft(sv)};stroke:${sevCol(sv)};stroke-width:1.4"/><text x="${f1(x+10)}" y="${L.cy+18}" class="t-xs" style="fill:${sevCol(sv)};font-weight:700">${ti}</text>`;
        lines.forEach((ln,j)=>{s+=`<text x="${f1(x+10)}" y="${L.cy+38+j*15}" class="${lines.length>1||N?'t-xs':'t-sm'}" style="fill:var(--ink);font-weight:600">${ln}</text>`})});
      /* wording */
      const wl=stWrap(ST_WORD[k],L.wc);
      s+=`<rect x="${L.px}" y="${L.wy}" width="${L.pw}" height="${L.wh}" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${L.px+12}" y="${L.wy+18}" class="t-xs" style="fill:var(--warn);font-weight:700">AS COMMONLY REPRODUCED · 1967 WORDING UNVERIFIED</text>`;
      wl.forEach((ln,j)=>{s+=`<text x="${L.px+12}" y="${L.wy+38+j*16}" class="t-sm" style="fill:var(--ink)">${j===0?'“':''}${ln}${j===wl.length-1?'”':''}</text>`});
      /* subtype bar: DATATOP 800 */
      const sx0=L.px+12,sw=L.pw-24,sy=L.sy;
      s+=`<rect x="${L.px}" y="${sy}" width="${L.pw}" height="${L.sh}" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${sx0}" y="${sy+18}" class="t-xs" style="fill:var(--ink);font-weight:700">MOTOR SUBTYPES AT BASELINE · DATATOP, 800 PEOPLE</text>`;
      s+=`<rect x="${sx0}" y="${sy+28}" width="${sw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${sx0}" y="${sy+28}" width="${f1(sw*441/800)}" height="14" rx="4" style="fill:var(--sage);opacity:${pigd?.45:1}"/><rect x="${f1(sx0+sw*441/800+2)}" y="${sy+28}" width="${f1(sw*233/800)}" height="14" rx="4" style="fill:var(--rose);opacity:${pigd?1:.45}"/>`;
      s+=`<text x="${sx0}" y="${sy+58}" class="t-xs" style="fill:var(--sage);font-weight:${pigd?500:700}">tremor-dominant 441</text><text x="${f1(sx0+sw*441/800+2)}" y="${sy+58}" class="t-xs" style="fill:var(--rose);font-weight:${pigd?700:500}">PIGD 233</text><text x="${sx0+sw}" y="${sy+58}" class="t-xs t-end">${N?'rest':'rest unclassified'}</text>`;
    }else{
      s+=`<text x="${L.nlx}" y="${L.ny-14}" class="t-xs" style="fill:var(--ink);font-weight:700">${N?'NON-MOTOR SYMPTOMS · % OF PEOPLE, ANY STAGE':'NON-MOTOR SYMPTOMS · % OF PEOPLE WITH PARKINSON\'S, ANY STAGE'}</text>`;
      ST_NM.forEach(([lab,v,src],i)=>{const y=L.ny+i*L.nrh+4,g=k>0?1:ease(ramp(f,0,.4));
        s+=`<text x="${L.nlx}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${lab}</text><rect x="${L.nbx}" y="${y}" width="${L.nbw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${L.nbx}" y="${y}" width="${f1(L.nbw*v/100*clamp(g))}" height="10" rx="3" style="fill:${i===0?'var(--rose)':'var(--violet)'}"/><text x="${L.nbx+L.nbw+6}" y="${y+9}" class="t-xs" style="fill:var(--ink);font-weight:700">${v}%</text>`});
      s+=`<text x="${L.nlx}" y="${L.ny+ST_NM.length*L.nrh+10}" class="t-xs" style="fill:var(--warn)">From different studies; not broken down by stage.</text>`;
    }
    /* time between stages */
    const tx0=L.rx0,tw=L.rx1-L.rx0,mm=tw/157;let xx=tx0;
    s+=`<text x="${tx0}" y="${L.by-12}" class="t-xs" style="fill:var(--ink);font-weight:700">${N?'MEDIAN MONTHS BETWEEN STAGES':'MEDIAN MONTHS BETWEEN STAGES · SINGAPORE, 695 PEOPLE'}</text>`;
    ST_TIME.forEach(([lab,m],i)=>{const w=m*mm,on=(i===0&&k===0)||((i===1||i===2)&&k===1)||(i===3&&k===2)||(i===4&&k===3);
      s+=`<rect x="${f1(xx+1)}" y="${L.by}" width="${f1(w-2)}" height="18" rx="4" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':'var(--line)'}"/><text x="${f1(xx+w/2)}" y="${L.by+13}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${m}${w>44?' mo':''}</text><text x="${f1(xx+w/2)}" y="${L.by+32}" class="t-xs t-mid">${lab}</text>`;xx+=w});
    const pm=tx0+months(k,f)*mm;
    s+=`<path d="M${f1(pm)} ${L.by-4}V${L.by+22}" style="stroke:var(--ink);stroke-width:2.5"/><circle cx="${f1(pm)}" cy="${L.by-5}" r="4" style="fill:var(--ink)"/>`;
    s+=`<text x="${L.rx1}" y="${L.by-12}" class="t-xs t-end">sum of medians 157 months</text>`;
    svg.innerHTML=s;
    setSt(k);
    const C=ST_CHIPS[k],S0=ST_STEPS[k];
    const ro=`<p class="readout"><span>Stage <b>${k+1}</b></span><span>Sides <b>${C[0][0].join(' ')}</b></span><span>Balance <b>${C[1][0].join(' ')}</b></span><span>Mobility <b>${C[2][0].join(' ')}</b></span></p>`;
    $('#stNote').innerHTML=(nm?noteHTML({k:S0.k+' · non-motor view',t:'Symptoms the stage does not count',txt:ST_NMTXT,pt:'Most people with Parkinson\'s have several symptoms that are not about movement, such as tiredness, worry, sleep problems or low mood. They can matter more for quality of life than the tremor.',hook:'Non-motor symptoms are near universal (98.6% in PRIAMO), and the Non-Motor Symptoms Scale predicted quality of life better than a motor score. [[Barone2009,Martinez-Martin2011]]'}):noteHTML(S0))+ro+`<p style="margin:0;font-size:15px">${pigd?ST_SUB.p:ST_SUB.t}</p>`;
    rg.setAttribute('aria-valuetext',`Hoehn and Yahr stage ${k+1}: ${S0.t}`);
  }
  const stop=playWire(rg,$('#stPlay'),draw,20000,'Replay','stages');
  const setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const b=e.target.closest('[data-st-go]');if(!b)return;stop();const s=ST_STEPS[+b.dataset.stGo];rg.value=s.at;draw(s.at)});
  const setView=v=>{nm=v;$('#stViewM').setAttribute('aria-pressed',!v);$('#stViewN').setAttribute('aria-pressed',v);
    $('#stCap').textContent=v?'Non-motor view: pooled or survey prevalences from different studies (PRIAMO, meta-analyses and reviews), shown for people with Parkinson\'s at any stage, not by stage. The figure and the bar of months still follow the stage.':'Schematic figure. Stage wording is the 1967 scale as commonly reproduced; the original paper could not be checked (unverified). The bar places one cohort\'s median months between stages end to end (Zhao 2010, Singapore, modified scale with stage 2.5); a sum of medians is not a median time to stage 5.';
    draw(+rg.value)};
  const setSub=v=>{pigd=v;$('#stSubT').setAttribute('aria-pressed',!v);$('#stSubP').setAttribute('aria-pressed',v);draw(+rg.value)};
  $('#stViewM').onclick=()=>setView(false);$('#stViewN').onclick=()=>setView(true);
  $('#stSubT').onclick=()=>setSub(false);$('#stSubP').onclick=()=>setSub(true);

  /* ---------- 2. the long course ---------- */
  const lg=$('#stLong'),lr=$('#stLongT');let syd=false;
  const LC={c:{n:'CamPaIGN',yrs:10,died:55,good:23,title:'BY 10 YEARS, ALL 142 PEOPLE',bars:[ ['Postural instability',68],['Died',55],['Dementia',46],['Good outcome',23] ]},
            s:{n:'Sydney',yrs:20,died:74,title:'AMONG THOSE ALIVE AT 20 YEARS',bars:[ ['Falls',87],['Dementia',83],['Freezing',81],['Moderate dysarthria',81],['Hallucinations',74],['Urinary incontinence',71],['Daytime sleepiness',70],['Nursing home',48],['Postural hypotension',48],['Choking',48],['Fractures',35] ]}};
  const RK=(()=>{const R=rng(11),idx=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(R()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}const r=[];idx.forEach((v,k)=>r[v]=k);return r})();
  const LN={c:{k:'CamPaIGN · incident population cohort',t:'Ten years after diagnosis',txt:'CamPaIGN followed 142 people from diagnosis. At 10 years 55% had died, 68% had postural instability and 46% had dementia. 23% had a "good outcome": alive without dementia or postural instability. Baseline predictors of dementia were age, motor impairment, "posterior-cortical" cognitive deficits and MAPT genotype. [[WilliamsGray2013]]',
      pt:'Ten years on, about half the people had died, and about a quarter were alive without dementia or balance problems.',hook:'CamPaIGN at 10 years: 55% dead, 46% dementia, 23% good outcome; SMR 1.29. [[WilliamsGray2013]]'},
    s:{k:'Sydney multicentre study',t:'Twenty years after diagnosis',txt:'The Sydney study followed 136 newly diagnosed people. By 20 years 100 of them (74%) had died. Among survivors, 83% had dementia, 48% lived in nursing homes and only one person lived independently. Most had dyskinesia and end-of-dose failure, but the main problems were features that do not respond to levodopa: falls 87%, freezing 81%, moderate dysarthria 81%, hallucinations 74%, urinary incontinence 71%, daytime sleepiness 70%, postural hypotension 48%, choking 48% and fractures 35%. [[Hely2008]]',
      pt:'After 20 years, the hardest problems were falls, thinking, speech and swallowing, which levodopa helps little.',hook:'Sydney at 20 years: dementia in 83% of survivors; the dominant problems were not levodopa-responsive. [[Hely2008]]'}};
  function drawLong(t){
    const D=syd?LC.s:LC.c,nb=D.bars.length;
    const N=vb(lg,`720 ${syd?320:320}`,`400 ${syd?600:470}`);
    const L=N?{gx:96,gy:58,c:21,lx:16,ly:290,bx0:16,bl:176,bw:150,by:0,rh:syd?22:30}:{gx:30,gy:58,c:21,lx:30,ly:290,bx0:300,bl:470,bw:180,by:64,rh:syd?23:44};
    if(N)L.ly=290;
    const yr=t*D.yrs,dN=D.died*t,end=t>.98;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${N?16:L.gx}" y="30" class="t-big" style="font-size:20px">Year ${f1(yr)}</text><text x="${N?16:L.gx}" y="46" class="t-xs">${D.n} · per 100 people from diagnosis</text>`;
    let alive=0;
    for(let i=0;i<100;i++){const x=L.gx+(i%10)*L.c+10,y=L.gy+Math.floor(i/10)*L.c+10,r=RK[i],dead=r<dN;
      let fill='var(--sage-soft)',st='var(--sage)';
      if(dead){s+=`<path d="M${x-5} ${y-5}l10 10M${x+5} ${y-5}l-10 10" style="stroke:var(--muted);stroke-width:2;stroke-linecap:round;opacity:.7"/>`;continue}
      if(end){const ai=alive++;if(!syd){if(ai<D.good){fill='var(--good)';st='var(--good)'}else{fill='var(--warn)';st='var(--warn)'}}else{fill='var(--sky)';st='var(--sky)'}}
      s+=`<circle cx="${x}" cy="${y}" r="7" style="fill:${fill};stroke:${st};stroke-width:1.5"/>`}
    const lgY=L.gy+10*L.c+18,lgX=N?16:L.gx;
    const item=(x,y,sym,lab)=>sym+`<text x="${x+12}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
    s+=item(lgX,lgY,`<path d="M${lgX-4} ${lgY-4}l8 8M${lgX+4} ${lgY-4}l-8 8" style="stroke:var(--muted);stroke-width:2"/>`,`died (${Math.round(dN)})`);
    if(end&&!syd){s+=item(lgX+(N?100:96),lgY,`<circle cx="${lgX+(N?100:96)}" cy="${lgY}" r="5" style="fill:var(--good)"/>`,'good outcome (23)');s+=item(lgX,lgY+16,`<circle cx="${lgX}" cy="${lgY+16}" r="5" style="fill:var(--warn)"/>`,'alive with dementia or postural instability (22)')}
    else if(end)s+=item(lgX+(N?100:96),lgY,`<circle cx="${lgX+(N?100:96)}" cy="${lgY}" r="5" style="fill:var(--sky)"/>`,'alive at 20 years (26)');
    else s+=item(lgX+(N?100:96),lgY,`<circle cx="${lgX+(N?100:96)}" cy="${lgY}" r="5" style="fill:var(--sage-soft);stroke:var(--sage)"/>`,'alive');
    /* bars at the end point */
    const bo=ramp(t,.9,1);
    const by=N?lgY+48:L.by;
    s+=`<text x="${L.bx0}" y="${by-16}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(.35+.65*bo)}">${D.title}</text>`;
    D.bars.forEach(([lab,v],i)=>{const y=by+i*L.rh,g=ease(bo),col=lab==='Died'?'var(--muted)':lab==='Good outcome'?'var(--good)':lab==='Dementia'?'var(--violet)':'var(--rose)';
      s+=`<text x="${L.bx0}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${lab}</text><rect x="${L.bl}" y="${y}" width="${L.bw}" height="11" rx="3" style="fill:var(--panel-2)"/>`;
      if(g>0)s+=`<rect x="${L.bl}" y="${y}" width="${f1(L.bw*v/100*g)}" height="11" rx="3" style="fill:${col}"/><text x="${L.bl+L.bw+6}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(g)}">${v}%</text>`});
    if(bo<=0)s+=`<text x="${L.bx0}" y="${by+nb*L.rh+8}" class="t-xs">outcomes appear at year ${D.yrs}</text>`;
    lg.innerHTML=s;
    const P=LN[syd?'s':'c'];$('#stLongNote').innerHTML=noteHTML({...P,k:P.k+' · year '+f1(yr)});
    lr.setAttribute('aria-valuetext',`Year ${f1(yr)} of ${D.yrs}: ${Math.round(dN)} of 100 have died`);
  }
  playWire(lr,$('#stLongPlay'),drawLong,9000,'Replay','stages');
  const setCoh=v=>{syd=v;$('#stCam').setAttribute('aria-pressed',!v);$('#stSyd').setAttribute('aria-pressed',v);
    lg.setAttribute('aria-label',v?'One hundred figures followed from diagnosis in the Sydney cohort: by 20 years 74 have died, and bars show the problems among survivors, led by falls in 87%, dementia in 83% and freezing in 81%.':'One hundred figures followed from diagnosis in the CamPaIGN cohort: by 10 years 55 have died, 23 are alive without dementia or postural instability, and bars show postural instability in 68% and dementia in 46%.');
    $('#stLongCap').textContent=v?'Per 100 people. Figures change at an even pace for illustration; only the 20-year figures are data. Bars are percentages of the survivors.':'Per 100 people. Figures change at an even pace for illustration; only the 10-year figures are data. Bars are percentages of everyone followed.';
    drawLong(+lr.value)};
  $('#stCam').onclick=()=>setCoh(false);$('#stSyd').onclick=()=>setCoh(true);

  /* ---------- 3. mortality ratios ---------- */
  const ms=$('#stSmr'),mr=$('#stSmrT');
  const SMR=[ {n:'CamPaIGN',d:'incident cohort, 10 years',e:1.29,lo:.97,hi:1.61,s:.04,c:'var(--sage)'},
   {n:'Inception cohorts',d:'pooled in a meta-analysis',e:1.5,s:.24,c:'var(--sage)',ap:1},
   {n:'88 studies',d:'range of the ratios',band:[.9,3.8],s:.42,c:'var(--muted)'},
   {n:'Sydney',d:'years 15 to 20 of follow-up',e:3.1,s:.62,c:'var(--rose)'},
   {n:'Hoehn and Yahr 1967',d:'secondary sources, unverified',e:2.9,s:.8,c:'var(--warn)',ap:1} ];
  const SN=[ {from:0,k:'Short follow-up',t:'Close to the general population at first',txt:'In CamPaIGN the SMR at 10 years was 1.29 (95% CI 0.97 to 1.61), an interval that includes 1. [[WilliamsGray2013]] In Sydney the death rate fell in the first 3 years of treatment before rising. [[Hely2008]]',pt:'In the first decade after diagnosis, death rates in one population cohort were not clearly higher than expected.'},
   {from:.38,k:'Across studies',t:'From 0.9 to 3.8',txt:'A meta-analysis of 88 studies found mortality ratios from 0.9 to 3.8, with large differences between studies. Inception cohorts, which follow people from diagnosis, gave a more consistent pooled ratio of about 1.5. [[Macleod2014]]',pt:'How a study recruits people changes the answer a great deal.'},
   {from:.6,k:'Long follow-up',t:'Ratios rise with time',txt:'The Sydney SMR reached 3.1 for years 15 to 20 [[Hely2008]], and mortality ratios rise with longer follow-up. [[Macleod2014]] The 1967 Hoehn and Yahr cohort is reported at about 2.9 times the general population, from secondary sources only (unverified). [[Hoehn1967]]',pt:'The longer people live with Parkinson\'s, the further their death rate moves above that of people the same age.',hook:'SMR depends on design and follow-up: 1.29 (CamPaIGN, 10 years), about 1.5 (inception cohorts), 3.1 (Sydney, years 15 to 20). [[WilliamsGray2013,Macleod2014,Hely2008]]'} ];
  function drawSmr(t){
    const N=vb(ms,'720 270','400 440');
    const P=N?{x0:30,x1:380,top:40,rh:76}:{x0:300,x1:690,top:42,rh:40};
    const X=v=>P.x0+(P.x1-P.x0)*(v-.5)/3.5;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const yb=P.top+SMR.length*P.rh+(N?-14:6);
    [.5,1,2,3,4].forEach(v=>{s+=(N?'':`<path d="M${f1(X(v))} ${P.top-14}V${yb}" class="grid"/>`)+`<text x="${f1(X(v))}" y="${yb+14}" class="t-xs t-mid">${v}</text>`});
    if(N)SMR.forEach((r,i)=>{const py=P.top+i*P.rh+40;[.5,2,3,4].forEach(v=>{s+=`<path d="M${f1(X(v))} ${py-8}V${py+8}" class="grid"/>`});s+=`<path d="M${f1(X(1))} ${py-12}V${py+12}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3"/>`});
    s+=(N?`<path d="M${f1(X(1))} ${yb-6}V${yb+2}" style="stroke:var(--ink);stroke-width:1.4"/>`:`<path d="M${f1(X(1))} ${P.top-18}V${yb}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`)+`<text x="${f1(X(1)+6)}" y="${P.top-20}" class="t-xs" style="fill:var(--ink)">1 = same as general population</text><text x="${f1(X(4))}" y="${yb+30}" class="t-xs t-end" style="fill:var(--ink)">more deaths than expected →</text>`;
    SMR.forEach((r,i)=>{const p=ease(ramp(t,r.s,r.s+.1)),o=.2+.8*ramp(t,r.s-.02,r.s+.02),y0=P.top+i*P.rh,py=N?y0+40:y0+12;
      s+=`<g style="opacity:${f1(o)}">`;
      if(N)s+=`<text x="16" y="${y0+12}" class="t-lbl">${r.n}</text><text x="16" y="${y0+26}" class="t-xs">${r.d}</text>`;
      else s+=`<text x="20" y="${py}" class="t-lbl">${r.n}</text><text x="20" y="${py+13}" class="t-xs">${r.d}</text>`;
      if(p>0){
        if(r.band){const a=lerp(1,r.band[0],p),b=lerp(1,r.band[1],p);s+=`<rect x="${f1(X(a))}" y="${py-7}" width="${f1(X(b)-X(a))}" height="14" rx="5" style="fill:var(--panel-2);stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1((X(a)+X(b))/2)}" y="${py+4}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${p>.9?'0.9 to 3.8':''}</text>`}
        else{const e=lerp(1,r.e,p);
          if(r.lo)s+=`<path d="M${f1(X(lerp(1,r.lo,p)))} ${py}H${f1(X(lerp(1,r.hi,p)))}M${f1(X(lerp(1,r.lo,p)))} ${py-5}v10M${f1(X(lerp(1,r.hi,p)))} ${py-5}v10" style="stroke:${r.c};stroke-width:2.2"/>`;
          s+=`<circle cx="${f1(X(e))}" cy="${py}" r="7" style="fill:${r.c};stroke:var(--panel);stroke-width:1.5"/>`;
          if(p>.9)s+=`<text x="${f1(X(r.hi||r.e)+12)}" y="${py+4}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.ap?'about ':''}${r.e}${r.lo?' ('+r.lo+' to '+r.hi+')':''}</text>`}}
      s+='</g>'});
    ms.innerHTML=s;
    const p=phaseOf(SN,t);$('#stSmrNote').innerHTML=noteHTML(SN[p]);
    mr.setAttribute('aria-valuetext',`${SN[p].t}`);
  }
  playWire(mr,$('#stSmrPlay'),drawSmr,9000,'Replay','stages');

  draw(+rg.value);drawLong(+lr.value);drawSmr(+mr.value);
};
