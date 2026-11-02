/* =============== 3.2 Mentalization-based treatment =============== */
inits.mbt=()=>{
  /* ---------- main stage: mentalizing under attachment stress ---------- */
  const svg=$('#mbSvg'),rg=$('#mbT');let hi=true,setSt=()=>{};
  const THR=.6;
  /* schematic arousal: climbs after the trigger, peaks, and falls once the therapist slows things down */
  const arousal=t=>{const pk=hi?.94:.48;
    if(t<.8)return .14+(pk-.14)*ease(ramp(t,.1,.5));
    return lerp(pk,hi?.24:.2,ease(ramp(t,.8,.97)))};
  const M={
    ment:{n:'Mentalizing',c:'var(--accent)',A:['Jo looks tired.','Maybe a hard day?'],B:['Maya seems tense.','I should explain.']},
    pe:{n:'Psychic equivalence',c:'var(--storm)',A:['I feel dropped,','so Jo dropped me.'],B:['I feel blamed,','so I am attacked.']},
    tel:{n:'Teleological mode',c:'var(--storm)',A:['If Jo cared, Jo','would have texted.'],B:['Words mean nothing.','Show me, then.']},
    pre:{n:'Pretend mode',c:'var(--mood)',A:['It is all my','childhood. I know.'],B:['We talked it through.','We are fine.']},
    pause:{n:'Slowing down',c:'var(--brand)',A:['Wait. What just','happened in me?'],B:['When did it','start to go wrong?']},
    rep:{n:'Mentalizing again',c:'var(--accent)',A:['I felt hurt when','you came in late.'],B:['I did not see that.','Tell me more?']}
  };
  const STEPS=[
    {from:0,at:.05,k:'Before the trigger',t:'Minds in mind',
     txt:`Jo arrives late and quiet. Maya and Jo are both mentalizing: each makes a tentative guess about what is going on inside the other, and is ready to be wrong. Mentalizing is "the capacity to understand others and oneself in terms of internal mental states", and it varies along four dimensions: automatic–controlled, internal–external focus, self–other and cognitive–affective. [[Luyten2020]]`,
     lo:`The same start: two people guessing, gently, at each other's minds.`,
     pt:`Mentalizing is noticing that you and other people have thoughts and feelings behind what you do, and guessing at them with an open mind.`,
     hook:`Mentalizing has four dimensions: automatic–controlled, internal–external, self–other, cognitive–affective (Luyten 2020).`},
    {from:.14,at:.28,k:'Arousal rising',t:'Attachment stress climbs',
     txt:`<span class="ev hyp">Hypothesis</span> The developmental mentalizing model proposes that in BPD the attachment system switches on at a low threshold, and controlled, reflective mentalizing then switches off, leaving fast automatic guesses. [[FonagyLuyten2009]] In this model, reduced mentalizing leads to problems with emotion regulation and impulsivity, especially in close relationships. [[Bateman2010WP]] The dashed line on the gauge is that threshold, drawn schematically.`,
     lo:`Arousal rises a little but stays under the threshold, so reflective thinking stays online.`,
     pt:`When someone close seems to pull away, alarm can rise fast. Above a certain point, it gets much harder to think about what the other person really means.`,
     hook:`Mentalizing model: attachment activation → loss of controlled mentalizing → emotional storms and impulsive acts (Hypothesis). [[FonagyLuyten2009]]`},
    {from:.36,at:.43,k:'Above the threshold',t:'Psychic equivalence',
     txt:`Inner experience is treated as outer reality: "I feel dropped" becomes "Jo has dropped me". There is no gap between a feeling and a fact, so there is nothing to question. [[Chung2026]] In 90 people with BPD and 47 controls in Korea, psychic equivalence was linked both to having the diagnosis and to symptom severity. <span class="ev early">Early evidence</span> [[Chung2026]]`,
     lo:`Under low stress, Maya can notice the feeling "I feel dropped" without treating it as proof.`,
     pt:`A strong feeling can seem like the truth about the world. "I feel unwanted" turns into "I am unwanted".`,
     hook:`Psychic equivalence = inner experience equated with outer reality. [[Chung2026]]`},
    {from:.5,at:.57,k:'Still above the threshold',t:'Teleological mode',
     txt:`Only physical, goal-directed actions count as proof of what someone feels or intends. [[Chung2026]] Words, apologies and explanations stop registering; what matters is whether Jo texted, came, stayed. The bond line between them has broken: neither can reach the other's mind.`,
     lo:`With arousal low, an explanation still counts as information about Jo's mind.`,
     pt:`In this state, only actions feel real: "Prove you care." Kind words do not get through.`,
     hook:`Teleological mode = only observable actions prove intentions. [[Chung2026]]`},
    {from:.64,at:.71,k:'Talk without contact',t:'Pretend mode',
     txt:`Now both talk fluently about feelings, but the talk is cut off from what they actually feel: it "appears to mentalize" while disconnected from real inner states and reality. [[Chung2026]]`,
     lo:`Under low stress the conversation stays connected: what is said matches what is felt.`,
     pt:`Sometimes people say all the right things about feelings, but it feels empty and nothing changes. That is pretend mode.`,
     hook:`Pretend mode = mentalizing talk detached from real feeling. The three pre-mentalizing modes: psychic equivalence, teleological, pretend. [[Chung2026]]`},
    {from:.8,at:.94,k:'The therapist steps in',t:'Pause, rewind, repair',
     txt:`The therapist slows the exchange down and goes back to the moment it went wrong, asking what each person felt and assumed then. As arousal falls below the threshold, controlled mentalizing comes back and the bond repairs. MBT is "a time-limited treatment which structures interventions that promote the further development of mentalizing". [[Bateman2010WP]] In the MBT-A trial, the benefit on self-harm and depression was explained by better mentalizing and less attachment avoidance. [[Rossouw2012MBTA]]`,
     lo:`With low stress there is nothing to repair: the therapist can use calm moments to practise curiosity about minds.`,
     pt:`In MBT, the therapist helps you hit "pause", go back to the moment things went wrong, and look at what was going on in your mind and the other person's.`,
     hook:`MBT aims to develop mentalizing itself. [[Bateman2010WP]] Mechanism in MBT-A: improved mentalizing and less attachment avoidance. [[Rossouw2012MBTA]]`}
  ];
  const modeAt=t=>{const p=phaseOf(STEPS,t),s=arousal(t);
    if(p===5)return s>=THR?'pause':(hi?'rep':'ment');
    if(s<THR)return 'ment';
    return ['ment','pe','pe','tel','pre','pre'][p]};
  /* horizontal or vertical arousal gauge with its threshold */
  function gauge(x,y,len,v,vert){const col=v<.45?'var(--calm)':v<THR?'var(--mood)':'var(--storm)';let s='';
    if(vert){s+=`<rect x="${x-9}" y="${y}" width="18" height="${len}" rx="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      const h=len*clamp(v);s+=`<rect x="${x-6}" y="${f1(y+len-h)}" width="12" height="${f1(h)}" rx="6" style="fill:${col}"/>`;
      const ty=y+len*(1-THR);s+=`<line x1="${x-16}" x2="${x+16}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--storm);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=`<text x="${x}" y="${y-22}" class="t-xs t-mid">AROUSAL</text><text x="${x}" y="${y-10}" class="t-xs t-mid" style="fill:var(--ink)">${Math.round(v*100)}%</text>`;
      s+=`<text x="${x-20}" y="${f1(ty-4)}" class="t-xs t-end" style="fill:var(--storm)">threshold</text><text x="${x-20}" y="${f1(ty+9)}" class="t-xs t-end" style="fill:var(--storm)">(schematic)</text>`}
    else{s+=`<rect x="${x}" y="${y-8}" width="${len}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${x+2}" y="${y-5}" width="${f1(Math.max(0,(len-4)*clamp(v)))}" height="10" rx="5" style="fill:${col}"/>`;
      const tx=x+len*THR;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${y-14}" y2="${y+14}" style="stroke:var(--storm);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=`<text x="${x}" y="${y-14}" class="t-xs">AROUSAL ${Math.round(v*100)}%</text><text x="${f1(tx+4)}" y="${y+22}" class="t-xs" style="fill:var(--storm)">threshold (schematic)</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 390','400 574'),s=arousal(t),mk=modeAt(t),md=M[mk],p=phaseOf(STEPS,t);
    const L=N?{ax:102,bx:298,py:178,ps:78,bA:[12,70,180,54],bB:[208,70,180,54],th:[200,396],tb:[90,338,220,44],gy:[40,390,300],st:[30,494,340],ft:564,hd:30}
             :{ax:200,bx:470,py:150,ps:96,bA:[86,52,200,56],bB:[372,52,200,56],th:[335,300],tb:[384,262,196,44],gy:[668,70,230],st:[40,332,560],ft:384,hd:24};
    let o='';
    /* mode banner */
    o+=`<text x="${N?200:335}" y="${L.hd}" class="t-sm t-mid" style="fill:${md.c};font-weight:600">${md.n.toUpperCase()}${mk==='ment'&&p>0&&!hi?' · stress stays below threshold':''}</text>`;
    /* bond between the two */
    const ru=hi?clamp((s-THR)/(.94-THR)*1.15):0,by=L.py+L.ps*.55;
    o+=bond(L.ax+26,by,L.bx-26,by,{k:clamp(1-s*.7,.2,1),rupture:ru,curve:N?-14:-18});
    if(ru>.25)o+=`<text x="${(L.ax+L.bx)/2}" y="${f1(by+28)}" class="t-xs t-mid" style="fill:var(--storm)">bond ruptured</text>`;
    else if(p===5&&hi&&s<THR)o+=`<text x="${(L.ax+L.bx)/2}" y="${f1(by+28)}" class="t-xs t-mid" style="fill:var(--accent)">bond repaired</text>`;
    /* the two people */
    const shake=mk==='pe'||mk==='tel'?Math.sin(t*260)*1.6:0;
    o+=person(L.ax+shake,L.py,L.ps,'var(--self)')+person(L.bx-shake,L.py,L.ps,'var(--other)');
    o+=`<text x="${L.ax}" y="${L.py+L.ps+16}" class="t-lbl t-mid">Maya</text><text x="${L.bx}" y="${L.py+L.ps+16}" class="t-lbl t-mid">Jo</text>`;
    /* thought bubbles: border colour = the current mode */
    const[ax,ay,aw,ah]=L.bA,[bx,by2,bw,bh]=L.bB;
    o+=bubble(ax,ay,aw,ah,{think:true,tx:L.ax,ty:L.py-4,lines:md.A,col:md.c});
    o+=bubble(bx,by2,bw,bh,{think:true,tx:L.bx,ty:L.py-4,lines:md.B,col:md.c});
    /* the therapist arrives in the last step */
    if(p===5){const a=ramp(t,.8,.84);o+=`<g style="opacity:${f1(a)}">`+person(L.th[0],L.th[1],N?56:62,'var(--rx)');
      o+=`<text x="${L.th[0]}" y="${L.th[1]+(N?72:78)}" class="t-xs t-mid" style="fill:var(--rx)">therapist</text>`;
      const[tx,ty,tw,th]=L.tb;o+=bubble(tx,ty,tw,th,{tx:L.th[0]+(N?0:14),ty:L.th[1]+6,lines:s>=THR?['Let us pause and go back','to when Jo came in.']:['What did each of you','feel in that moment?'],col:'var(--rx)'})+'</g>'}
    /* gauge */
    o+=N?gauge(L.gy[0],L.gy[2],L.gy[1]-L.gy[0],s,false):gauge(L.gy[0],L.gy[1],L.gy[2],s,true);
    /* mode strip: which mode was active at each moment so far */
    const[sx,sy,sw]=L.st;
    o+=`<text x="${sx}" y="${sy-8}" class="t-xs">MODE OVER THE CONVERSATION</text>`;
    o+=`<rect x="${sx}" y="${sy}" width="${sw}" height="12" rx="3" style="fill:var(--panel-2)"/>`;
    for(let u=0;u<t;u+=.01){const c=M[modeAt(u)].c;o+=`<rect x="${f1(sx+sw*u)}" y="${sy}" width="${f1(sw*Math.min(.0105,t-u))}" height="12" style="fill:${c};opacity:.85"/>`}
    o+=`<line x1="${f1(sx+sw*t)}" x2="${f1(sx+sw*t)}" y1="${sy-3}" y2="${sy+15}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    const lg=[['var(--accent)','mentalizing'],['var(--storm)','equivalence / teleological'],['var(--mood)','pretend'],['var(--brand)','slowing down']];
    let lx=sx;lg.forEach(([c,n],i)=>{if(N&&i===2){lx=sx}const ly=sy+28+(N&&i>=2?14:0);o+=`<rect x="${lx}" y="${ly-7}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${lx+13}" y="${ly+1}" class="t-xs">${n}</text>`;lx+=n.length*5.9+30});
    if(N)o+=`<text x="200" y="${L.ft}" class="t-xs t-mid" style="fill:var(--warn)">SCHEMATIC · illustrative people and thoughts</text>`;
    else o+=`<text x="${sx+sw}" y="${L.ft}" class="t-xs t-end" style="fill:var(--warn)">SCHEMATIC · illustrative people and thoughts</text>`;
    svg.innerHTML=o;
    setSt(p);
    const st=STEPS[p];
    $('#mbNote').innerHTML=noteHTML(hi?st:Object.assign({},st,{txt:`<b>Low-stress view.</b> ${st.lo} `+st.txt}));
    $('#mbRead').innerHTML=`<span>arousal <b>${Math.round(s*100)}%</b> (schematic)</span><span>threshold <b>${THR*100}%</b></span><span>mode <b>${md.n}</b></span><span>bond <b>${ru>.25?'ruptured':ru>0?'strained':'intact'}</b></span>`;
  }
  const stop=playWire(rg,$('#mbPlay'),draw,22000,'Replay','mbt');
  setSt=stepWire($('#mbSteps'),STEPS,rg,draw,stop);
  $$('[data-mbs]').forEach(b=>b.addEventListener('click',()=>{stop();hi=b.dataset.mbs==='hi';$$('[data-mbs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- trial comparator ---------- */
  const ts=$('#mbTr');let cur='b08',grow=1,stopG=null;
  /* kind: bars (paired, a = MBT arm, b = comparator), qual (direction only), ci (mean difference), rr (risk ratio)
     tx: treatment band(s) in years since entry; ms: measurement times */
  const TR=[
    {id:'b99',y:1999,s:'1999',n:'Bateman & Fonagy 1999',d:'Partial hospital vs standard psychiatric care · 38 patients',kind:'qual',a:'Partial hospital (MBT forerunner)',b:'Standard care',
     rows:[['Suicide attempts and self-harm','fewer','limited change or worse'],['Inpatient days','fewer','limited change or worse'],['Depression','less','limited change or worse'],['Social function','better','limited change or worse']],
     tx:[[0,1.5,'treatment, up to 18 months']],ms:[.5,1.5],
     txt:`38 patients were randomised to psychoanalytically oriented partial hospitalisation (individual and group psychotherapy, up to 18 months) or standard psychiatric care. The partial-hospital group improved on all measures, including less self-harm, fewer suicide attempts and fewer inpatient days, with change beginning at 6 months; controls showed limited change or got worse. The abstract gives directions, not plottable numbers. [[Bateman1999]]`,
     hook:`Bateman & Fonagy 1999 was the forerunner of MBT: partial hospitalisation cut suicidal acts, self-harm and inpatient days vs standard care. [[Bateman1999]]`},
    {id:'b01',y:2001,s:'2001',n:'18-month follow-up',d:'Same trial, 18 months after treatment ended · 44 patients',kind:'qual',a:'Partial hospital',b:'Standard care',
     rows:[['Gains at the end of treatment','kept','—'],['Most measures','kept improving','—']],
     tx:[[0,1.5,'treatment']],ms:[3],
     txt:`Eighteen months after treatment ended, partial-hospital patients kept their gains and kept improving on most measures. [[Bateman2001]]`,
     hook:`Gains after MBT-type partial hospitalisation continued to grow after treatment ended. [[Bateman2001]]`},
    {id:'b08',y:2008,s:'2008',n:'8-year follow-up',d:'8 years after entry, 5 years after MBT ended · 41 patients',kind:'bars',a:'MBT (partial hospital)',b:'Treatment as usual',
     rows:[['Suicidality',23,74,'%',100,'lower'],['Still meeting the BPD diagnosis',13,87,'%',100,'lower'],['Global functioning above 60',45,10,'%',100,'higher'],['Years employed or in education',3.2,1.2,' yr',4,'higher'],['Years on 3 or more medications',.02,1.9,' yr',4,'lower']],
     tx:[[0,3,'MBT (ended 5 years before this point)']],ms:[8],
     txt:`Eight years after entry, the MBT group did better on every outcome shown. The authors add a caveat: "their general social function remains impaired". These are group figures from 41 people, not a prediction for anyone. [[Bateman2008]]`,
     hook:`Bateman 2008: still meeting BPD criteria 13% vs 87%; suicidality 23% vs 74%, 8 years after entry. [[Bateman2008]]`},
    {id:'b09',y:2009,s:'2009',n:'Outpatient MBT vs SCM',d:'18 months of MBT or structured clinical management · 134 patients',kind:'qual',a:'Outpatient MBT',b:'Structured clinical management',
     rows:[['Suicide attempts','steeper decline','declined'],['Hospitalisation','steeper decline','declined'],['Overall','substantial improvement','substantial improvement']],
     tx:[[0,1.5,'treatment, 18 months']],ms:[1.5],slope:true,
     txt:`Both groups improved substantially, but MBT gave a steeper decline in suicide attempts and hospitalisation. The comparator was an active, structured treatment rather than usual care. The abstract gives no numbers, so the lines here show direction only. [[Bateman2009]] Structured clinical management is covered in <a href="#gpm" data-go="gpm">Good psychiatric management</a>.`,
     hook:`Bateman 2009: MBT vs an active comparator (SCM); both improved, MBT faster on suicide attempts and hospitalisation. [[Bateman2009]]`},
    {id:'r12',y:2012,s:'2012',n:'MBT-A for adolescents',d:'80 adolescents who self-harmed, with depression · 12 months',kind:'qual',a:'MBT-A',b:'Usual treatment',
     rows:[['Self-harm','reduced more','reduced less'],['Depression','reduced more','reduced less']],
     tx:[[0,1,'12 months']],ms:[1],
     txt:`MBT-A reduced self-harm and depression more than usual treatment over 12 months. The benefit was explained by better mentalizing and less attachment avoidance. [[Rossouw2012MBTA]]`,
     hook:`MBT-A (Rossouw & Fonagy 2012): fewer self-harm episodes, mediated by mentalizing. [[Rossouw2012MBTA]]`},
    {id:'l18',y:2018,s:'2018',n:'Day-hospital MBT',d:'Netherlands, vs specialist treatment as usual · 95 patients',kind:'bars',a:'MBT day hospital',b:'Specialist TAU',
     rows:[['Early dropout',9,34,'%',100,'lower']],tx:[],ms:[1.5],
     txt:`Day-hospital MBT was not superior to specialist treatment as usual on outcomes at 18 months, but early dropout was much lower (9% vs 34%). [[Laurenssen2018]]`,
     hook:`Laurenssen 2018: MBT kept people in treatment (early dropout 9% vs 34%) without better 18-month outcomes. [[Laurenssen2018]]`},
    {id:'g20',y:2020,s:'2020',n:'MBT in groups, adolescents',d:'112 adolescents, 1 year of MBT-G vs usual care',kind:'bars',a:'MBT-G',b:'Usual care',
     rows:[['Remission, end of treatment',29,29,'%',100,'higher'],['Remission, 2 years after entry',35,39,'%',100,'higher'],['Attended under half of sessions',29,7,'%',100,'lower']],
     tx:[[0,1,'1 year of groups']],ms:[1,2],
     txt:`No difference from usual care on the primary outcome (adjusted difference 0.4 BPFS-C units; 95% CI −6.3 to 7.1): 29% remitted in both groups. [[Beck2020MBTG]] Two years after entry, remission was 35% vs 39%, not significantly different. [[Jorgensen2021MBTG]] Attendance was a problem in the group format. [[Beck2020MBTG]]`,
     hook:`MBT-G for adolescents did not beat usual care (29% remission in both). A negative trial is still evidence. [[Beck2020MBTG]]`},
    {id:'b21',y:2021,s:'2021',n:'8 years after the 2009 trial',d:'98 of the 134 patients seen again',kind:'bars',a:'MBT',b:'SCM',
     rows:[['Still meeting recovery criteria (primary outcome)',74,51,'%',100,'higher']],tx:[[0,1.5,'treatment']],ms:[8],
     txt:`Eight years after the start of the 2009 trial, more patients still met the recovery criteria for the primary outcome after MBT than after SCM (74% vs 51%), and the MBT group was more often in purposeful activity. [[Bateman2021]]`,
     hook:`Bateman 2021: 74% vs 51% still meeting recovery criteria 8 years after MBT vs SCM. [[Bateman2021]]`},
    {id:'j23',y:2023,s:'2023–25',n:'5 vs 14 months of MBT',d:'166 outpatients, Denmark',kind:'ci',a:'favours short',b:'favours long',
     rows:[['BPD symptoms at 16 months',.99,-1.06,3.03],['BPD symptoms at 24 months',-.56,-2.67,1.54]],lim:4,ref:0,unit:'mean difference',
     tx:[[0,.42,'5 months'],[0,1.17,'14 months']],ms:[1.33,2],
     txt:`Short-term (5 months) and long-term (14 months) MBT did not differ on BPD symptoms at 16 months [[Juul2023]] or 24 months; the long-term group had better quality of life, but 40% of that data was missing. [[Juul2025]] Both intervals cross zero, the line of no difference. Other researchers argue the trial design was flawed. [[Philips2024]]`,
     hook:`Juul 2023: 5 months of MBT matched 14 months on BPD symptoms; the design is disputed. [[Juul2023,Philips2024]]`},
    {id:'c20',y:2020.5,s:'Cochrane 2020',n:'Pooled: MBT vs usual care',d:'Cochrane review, 3 trials per outcome · low certainty',kind:'rr',a:'favours MBT',b:'favours usual care',
     rows:[['Self-harm',.62,.49,.8],['Suicidality',.1,.04,.3]],ref:1,unit:'risk ratio (log scale)',tx:[],ms:[],
     txt:`Pooling three trials per outcome, the 2020 Cochrane review found MBT reduced self-harm (RR 0.62) and suicidality (RR 0.10) compared with usual care. All of this is low-certainty evidence. [[Storebo2020]] A risk ratio below 1 favours MBT.`,
     hook:`Cochrane 2020, MBT vs TAU: self-harm RR 0.62; suicidality RR 0.10 (low certainty). [[Storebo2020]]`}
  ];
  const btns=$('#mbTrBtns');
  btns.innerHTML='<span class="kicker">Trial</span>'+TR.map(r=>`<button class="btn" data-mbtr="${r.id}" aria-pressed="${r.id===cur}">${r.s} · ${r.n}</button>`).join('');
  function drawT(){
    const N=vb(ts,'600 430','400 640'),R=TR.find(r=>r.id===cur);let o='';
    const W=N?400:600,x0=N?20:30,x1=W-(N?20:30);
    /* 1. publication timeline */
    const P0=1998,P1=2026,PX=y=>lerp(x0+10,x1-10,(y-P0)/(P1-P0)),py=N?40:42;
    o+=`<text x="${x0}" y="${py-22}" class="t-xs">PUBLISHED</text>`;
    o+=`<line x1="${x0}" x2="${x1}" y1="${py}" y2="${py}" class="axis"/>`;
    (N?[2000,2010,2020]:[2000,2005,2010,2015,2020,2025]).forEach(y=>o+=`<line x1="${f1(PX(y))}" x2="${f1(PX(y))}" y1="${py-3}" y2="${py+3}" class="axis"/><text x="${f1(PX(y))}" y="${py+16}" class="t-xs t-mid">${y}</text>`);
    TR.forEach(r=>{const on=r.id===cur;o+=`<circle cx="${f1(PX(r.y))}" cy="${py}" r="${on?7:4.5}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.6"/>`});
    { const lx=clamp(PX(R.y),x0+60,x1-60);o+=`<text x="${f1(lx)}" y="${py-11}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">${R.s}</text>`; }
    /* 2. within-trial time strip */
    const sy=N?92:96,YX=y=>lerp(x0+10,x1-10,y/8.5);
    o+=`<text x="${x0}" y="${sy-14}" class="t-xs">YEARS SINCE TRIAL ENTRY</text>`;
    o+=`<line x1="${x0+10}" x2="${x1-10}" y1="${sy+16}" y2="${sy+16}" class="axis"/>`;
    [0,2,4,6,8].forEach(y=>o+=`<text x="${f1(YX(y))}" y="${sy+30}" class="t-xs t-mid">${y}</text>`);
    R.tx.forEach((b,i)=>{const yy=sy+(R.tx.length>1?i*9-4:0);o+=`<rect x="${f1(YX(b[0]))}" y="${yy}" width="${f1(Math.max(2,YX(b[1])-YX(b[0])))}" height="${R.tx.length>1?7:12}" rx="3" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1"/>`;
      o+=`<text x="${f1(YX(b[1])+5)}" y="${yy+(R.tx.length>1?7:10)}" class="t-xs" style="fill:var(--rx)">${b[2]}</text>`});
    R.ms.forEach(m=>{const mx=YX(m);o+=`<path d="M${f1(mx)} ${sy+9}l5 7l-5 7l-5 -7z" style="fill:var(--ink)"/>`});
    if(!R.tx.length&&!R.ms.length)o+=`<text x="${f1((x0+x1)/2)}" y="${sy+10}" class="t-xs t-mid">pooled across trials: no single timeline</text>`;
    else if(R.ms.length)o+=`<text x="${x1}" y="${sy-14}" class="t-xs t-end">◆ outcome measured</text>`;
    /* 3. results */
    const ry=N?156:162;
    o+=`<text x="${x0}" y="${ry}" class="t-sm" style="fill:var(--ink);font-weight:600">${R.n.toUpperCase()}</text>`;
    o+=`<text x="${x0}" y="${ry+15}" class="t-xs">${R.d}</text>`;
    const lgy=ry+34;
    if(R.kind==='bars'||R.kind==='qual'){
      o+=`<rect x="${x0}" y="${lgy-8}" width="10" height="10" rx="2" style="fill:var(--rx)"/><text x="${x0+15}" y="${lgy+1}" class="t-xs">${R.a}</text>`;
      const bx=x0+(N?190:260);o+=`<rect x="${bx}" y="${lgy-8}" width="10" height="10" rx="2" style="fill:var(--muted);opacity:.6"/><text x="${bx+15}" y="${lgy+1}" class="t-xs">${R.b}</text>`}
    const top=lgy+16,avail=(N?620:420)-top,rh=Math.min(N?84:58,avail/Math.max(R.rows.length,1));
    if(R.kind==='bars'){const lw=N?0:212,bx0=x0+lw,bw=x1-bx0-(N?46:56);
      R.rows.forEach((r,i)=>{const y=top+i*rh,[lab,a,b,u,mx,dir]=r;
        o+=`<text x="${x0}" y="${f1(y+11)}" class="t-xs" style="fill:var(--ink)">${lab}</text><text x="${x1}" y="${f1(y+11)}" class="t-xs t-end">${dir} is better</text>`;
        const yb=N?y+18:y+16;
        [[a,'var(--rx)',1],[b,'var(--muted)',.6]].forEach(([v,c,op],j)=>{const w=bw*clamp(v/mx)*grow,yy=yb+j*(N?15:14);
          o+=`<rect x="${bx0}" y="${f1(yy)}" width="${f1(Math.max(1.5,w))}" height="${N?12:11}" rx="3" style="fill:${c};opacity:${op}"/>`;
          o+=`<text x="${f1(bx0+Math.max(1.5,w)+5)}" y="${f1(yy+9.5)}" class="t-xs" style="fill:var(--ink)">${grow<1?'':(u==='%'?v+'%':v+u)}</text>`})})}
    else if(R.kind==='qual'){
      R.rows.forEach((r,i)=>{const y=top+i*(N?44:30),[lab,a,b]=r;
        o+=`<text x="${x0}" y="${f1(y+11)}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
        const c1=x0+(N?8:200),c2=x0+(N?196:380);
        o+=`<text x="${c1}" y="${f1(y+(N?26:11))}" class="t-xs" style="fill:var(--rx);opacity:${f1(grow)}">● ${a}</text><text x="${c2}" y="${f1(y+(N?26:11))}" class="t-xs" style="opacity:${f1(grow)}">● ${b}</text>`});
      if(R.slope){const gy=top+R.rows.length*(N?44:30)+(N?30:28),gx0=x0+(N?30:200),gx1=x1-(N?20:30),gh=N?120:80;
        o+=`<line x1="${gx0}" x2="${gx0}" y1="${gy}" y2="${gy+gh}" class="axis"/><line x1="${gx0}" x2="${gx1}" y1="${gy+gh}" y2="${gy+gh}" class="axis"/>`;
        o+=`<text x="${gx0-6}" y="${gy+8}" class="t-xs t-end">high</text><text x="${gx1}" y="${gy+gh+14}" class="t-xs t-end">18 months</text><text x="${gx0}" y="${gy+gh+14}" class="t-xs">entry</text>`;
        const ln=(k,c,d)=>`<path d="M${gx0} ${gy+6}Q${f1(lerp(gx0,gx1,.4))} ${f1(gy+gh*k*.6)} ${f1(lerp(gx0,gx1,grow))} ${f1(lerp(gy+6,gy+gh*k,grow))}" style="fill:none;stroke:${c};stroke-width:2.4${d?';stroke-dasharray:5 4':''}"/>`;
        o+=ln(.62,'var(--muted)',1)+ln(.94,'var(--rx)',0);
        o+=`<text x="${f1(gx1-4)}" y="${f1(gy+gh*.62-6)}" class="t-xs t-end">SCM</text><text x="${f1(gx1-4)}" y="${f1(gy+gh*.94-6)}" class="t-xs t-end" style="fill:var(--rx)">MBT</text>`;
        o+=`<text x="${f1((gx0+gx1)/2)}" y="${gy-4}" class="t-xs t-mid" style="fill:var(--warn)">suicide attempts, hospitalisation: direction only, no values</text>`}}
    else{/* interval plot */
      const rr=R.kind==='rr',lo=rr?Math.log(.02):-R.lim,hi2=rr?Math.log(2):R.lim,lx0=x0+(N?10:200),lx1=x1-(N?10:30),
        X=v=>lerp(lx0,lx1,((rr?Math.log(v):v)-lo)/(hi2-lo)),ay=top+R.rows.length*(N?64:52)+6;
      o+=`<line x1="${f1(X(R.ref))}" x2="${f1(X(R.ref))}" y1="${top-4}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      o+=`<line x1="${lx0}" x2="${lx1}" y1="${ay}" y2="${ay}" class="axis"/>`;
      (rr?[.02,.1,.5,1,2]:[-4,-2,0,2,4]).forEach(v=>o+=`<text x="${f1(X(v))}" y="${ay+14}" class="t-xs t-mid">${v}</text>`);
      o+=`<text x="${f1((lx0+lx1)/2)}" y="${ay+28}" class="t-xs t-mid">${R.unit}</text>`;
      o+=`<text x="${f1(X(R.ref)-6)}" y="${ay+42}" class="t-xs t-end" style="fill:var(--rx)">← ${R.a}</text><text x="${f1(X(R.ref)+6)}" y="${ay+42}" class="t-xs">${R.b} →</text>`;
      R.rows.forEach((r,i)=>{const y=top+i*(N?64:52),[lab,e,l,h]=r,cy=y+(N?30:22),ref=R.ref,g=v=>rr?Math.exp(lerp(Math.log(ref),Math.log(v),grow)):lerp(ref,v,grow);
        o+=`<text x="${N?x0:x0}" y="${f1(y+11)}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
        o+=`<line x1="${f1(X(g(l)))}" x2="${f1(X(g(h)))}" y1="${f1(cy)}" y2="${f1(cy)}" style="stroke:var(--rx);stroke-width:2"/><rect x="${f1(X(g(e))-5)}" y="${f1(cy-5)}" width="10" height="10" style="fill:var(--rx)"/>`;
        if(grow>=1)o+=`<text x="${f1(X(h)+6)}" y="${f1(cy+4)}" class="t-xs" style="fill:var(--ink)">${e} (${l} to ${h})</text>`})}
    ts.innerHTML=o;
    $('#mbTrNote').innerHTML=noteHTML({k:R.s+' · '+R.d,t:R.n,txt:R.txt,hook:R.hook,
      pt:R.kind==='rr'?'A risk ratio of 0.62 means about 38% fewer people with the outcome in the MBT groups, on average, across these trials.':R.kind==='ci'?'The short course did as well as the long one in this trial: the uncertainty bars cross the no-difference line.':'These are averages for groups of people in a study. They cannot predict how any one person will do.'});
    $('#mbTrCap').innerHTML='Outcome values exactly as the abstracts report them; bars are drawn to scale within each row. Where an abstract reports a direction but no number, no bar is drawn. Population statistics, not individual predictions.';
  }
  btns.addEventListener('click',e=>{const b=e.target.closest('[data-mbtr]');if(!b)return;cur=b.dataset.mbtr;
    $$('[data-mbtr]',btns).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopG)stopG();grow=0;drawT();stopG=animate(650,p=>{grow=ease(p);drawT()},()=>{stopG=null;grow=1;drawT()});
    /* a hidden tab may never run the animation frames: settle on the full bars regardless */
    setTimeout(()=>{if(grow<1){if(stopG)stopG();stopG=null;grow=1;drawT()}},900)});
  redraws.mbt=(prev=>()=>{prev&&prev();drawT()})(redraws.mbt);
  drawT();
};
