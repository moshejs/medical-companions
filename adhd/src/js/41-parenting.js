/* =============== 4.1 Parent training & classroom support =============== */
const PT_STEPS=[
 {from:0,at:.07,k:'Step 1 · the frame',t:'Antecedent, behaviour, consequence',
  txt:`Behavioural parent training works on two sides of a behaviour. Some techniques change what comes <b>before</b> it (the antecedent: how an instruction is given, how the setting is arranged); others change what comes <b>after</b> it (the consequence: reinforcing wanted behaviour). Treatment manuals combine dozens of such techniques; one meta-analysis of 29 RCTs coded 39 of them. Under Society of Clinical Child and Adolescent Psychology criteria, behavioural parent training is <span class="ev est">Established</span> ("well-established") for children with ADHD. [[Dekkers2022,Evans2014]]`,
  pt:`Parent training teaches practical tools: how to set up the day, give clear instructions and reward good behaviour. It is not a judgment on parenting.`,
  hook:`ABC = Antecedent → Behaviour → Consequence. Parent training works on both ends of the chain.`},
 {from:.17,at:.25,k:'Step 2 · before the behaviour',t:'Clear, specific instructions',
  txt:`An antecedent technique: one short instruction, given close by, once the child is looking, instead of a call from another room. In the components meta-analysis, techniques that changed the setting before behaviour went with better parenting sense of competence and better parent mental health. <span class="ev early">Early evidence</span>: these are associations across trials, not tests of single techniques. [[Dekkers2022]]`,
  pt:`Say one thing, close by, when your child is listening. It sets the child up to get it right.`,
  hook:`Antecedent techniques were linked to parent outcomes (competence, mental health) in a meta-regression of 29 RCTs.`},
 {from:.33,at:.41,k:'Step 3 · after the behaviour',t:'Specific praise and attention',
  txt:`A consequence technique: notice the wanted behaviour at once and name it ("you put your shoes on the first time I asked"). In the same meta-analysis, more reinforcement of wanted behaviour went with larger drops in negative parenting. In pooled individual data from 19 RCTs (1,720 children), gains in parenting and parent-child warmth explained concurrent gains in the child's ADHD severity, oppositional behaviour and impairment, with the links running both ways. [[Dekkers2022,Psyllou2025]]`,
  pt:`Catch your child getting it right, and say exactly what they did well.`,
  hook:`More reinforcement of wanted behaviour → bigger fall in negative parenting (Dekkers 2022).`},
 {from:.5,at:.58,k:'Step 4 · minor misbehaviour',t:'Planned ignoring and calm limits',
  txt:`Manuals pair attention for wanted behaviour with less attention for minor unwanted behaviour (planned ignoring) and calm, predictable limits, such as a short time-out, for behaviour that cannot be ignored. The scene shows these as illustrations; this guide's sources do not rank them one by one. What the data do show: falls in non-constructive parenting, such as physical punishment, explained more of the effect on the child's impairment in families who started with more of it. In the MTA, the families whose negative or ineffective discipline fell the most saw the best teacher-rated social skills. [[Dekkers2022,Psyllou2025,Hinshaw2000]]`,
  pt:`Small annoyances get less attention; the moment the child does better, the attention comes back.`,
  hook:`Reducing harsh or ineffective discipline mediated better teacher-rated social skills in the MTA (Hinshaw 2000).`},
 {from:.66,at:.74,k:'Step 5 · making it visible',t:'Tokens, points and the report card',
  txt:`Token or point systems make reinforcement concrete: small goals earn points that add up to an agreed privilege. The AAP lists point systems and daily report cards among school services that help a pupil meet expectations independently. A daily report card links home and school: the teacher rates a few individual goals each day, set up together with the parents. In a school-year trial it was the behavioural half of the "behaviour first" arm. [[Wolraich2019,Pyle2017,Pelham2016]]`,
  pt:`A chart with stars or points shows progress the child can see, at home and at school.`,
  hook:`Daily report card = teacher rates a few goals each day, agreed with parents. Educators consistently liked it. [[Richardson2015]]`},
 {from:.83,at:.93,k:'Step 6 · what the trials found',t:'Parenting changes most',
  txt:`The European ADHD Guidelines Group pooled 32 RCTs. On ratings by the people closest to treatment, usually the parents who did the training, every outcome improved. On probably blinded ratings, positive parenting (SMD 0.63), negative parenting (0.43) and child conduct problems (0.31) still improved, but core ADHD symptoms did not. So the honest summary is: parent training clearly improves parenting and defiant behaviour; its effect on attention itself is smaller than parent ratings suggest. [[Daley2014,SonugaBarke2013]]`,
  pt:`Parent training clearly helps family life and reduces defiant behaviour. Its effect on attention itself is smaller than it first looks, because the parents who did the training also rate the results.`,
  hook:`Blinded EAGG meta-analysis: parenting and conduct effects survive blinding; ADHD-symptom effects do not. [[Daley2014]]`}
];
/* the morning routine, with strategies: parent line (A), child action (B), parent line (C) */
const PT_SC=[
 {a:'Time to get ready\nfor school.',b:'keeps playing',c:'What happens next\nshapes next time.',ok:0},
 {a:'(close by, eye contact)\n"Shoes on now, please."',b:'puts shoes on',c:'(waits, one instruction)',ok:1},
 {a:'"Shoes on now, please."',b:'puts shoes on',c:'"You did that the first\ntime I asked. Great!"',ok:1},
 {a:'"Breakfast is toast today."',b:'whines, then asks nicely',c:'(ignores the whine)\n"Thanks for asking nicely!"',ok:1},
 {a:'"Three steps on your\nchart: shoes, bag, coat."',b:'finishes all three',c:'"Three stars! That\'s\nyour Friday treat."',ok:1},
 {a:'"Shoes, bag, coat."',b:'done, and smiles',c:'"High five!"',ok:1}];
const PT_CO=[['"Shoes on!" (from the\nnext room)','A'],['"No!"','B'],['"SHOES. ON. NOW!"','C'],['"NO!!" … "Fine,\nI\'ll do it myself."','C']];
const PT_TOOLS=['Clear instructions','Specific praise & attention','Planned ignoring','Calm limits (e.g. time-out)','Tokens & points'];
/* EAGG 2014: [outcome, unblinded SMD, probably blinded SMD or null = not significant] */
const PT_BARS=[['Positive parenting',.68,.63],['Negative parenting',.57,.43],['Child conduct problems',.26,.31],['Child ADHD symptoms',.35,null]];
/* classroom supports: what each targets in the drawing (schematic) and its evidence */
const PT_SUP={
 drc:{n:'Daily report card',ev:'est',fd:.15,ds:0,fc:.15,
  txt:`The teacher rates a few individual goals each day, set up with the parents. Behavioural classroom management is classed "well-established". In 63 children in special education, a DRC built from IEP goals improved observed classroom functioning, goal attainment and productivity, but not achievement or teacher-rated ADHD symptoms. In 213 pupils it reduced rule violations and teacher-rated symptoms, but not academic performance. It was the only school intervention educators consistently viewed positively. [[Evans2014,Fabiano2010DRC,Fabiano2025,Richardson2015]]`,
  num:'213',nl:'pupils in the largest DRC trial'},
 seat:{n:'Seating & fewer distractions',ev:'early',fd:0,ds:.55,fc:.1,
  txt:`NICE's examples of environmental modifications include changes to seating, lighting and noise, and fewer distractions, for example headphones. These are recommended adjustments rather than tested treatments: a review of 68 documents found most accommodations had no ADHD-specific benefit, and many have few or no experimental studies. [[NICE2018F,Lovett2021]]`,
  num:'68',nl:'documents in the accommodations review'},
 chunk:{n:'Short work blocks',ev:'early',fd:.05,ds:.1,fc:.25,
  txt:`NICE lists shorter periods of focus with movement breaks, and written instructions to back up spoken requests. No effect size is published for chunking on its own; skill-building interventions beat accommodations on organised binders and accurate notes in a 64-pupil RCT. [[NICE2018F,Harrison2020]]`,
  num:'—',nl:'no ADHD-specific effect size'},
 move:{n:'Movement break',ev:'early',fd:.4,ds:.05,fc:.05,
  txt:`NICE mentions "I need a break" cards. In 202 young children, 31 minutes a day of before-school physical activity for 12 weeks reduced inattention at home more than a sedentary activity, which also seemed to help; there was no untreated group. Short-term aerobic exercise trials pooled to SMD 0.84 on attention, but they were small and mostly unblinded. [[NICE2018F,Hoza2015,Cerrillo2015]]`,
  num:'0.84',nl:'SMD, attention (small, unblinded trials)'},
 ost:{n:'Organisational skills training',ev:'est',fd:0,ds:.05,fc:.3,
  txt:`Teaches children to manage materials, track assignments and plan time; classed "well-established". In 158 children in grades 3–5, it beat the wait list on parent-rated (d 2.77) and teacher-rated (d 1.18) organisation, and 60% versus 3% no longer met criteria for organisational impairment. Brief school-delivered versions (sessions averaging under 20 minutes) also gave large gains in 280 middle-school pupils. [[Evans2014,Abikoff2013,Langberg2018]]`,
  num:'60% vs 3%',nl:'no longer organisationally impaired'},
 acc:{n:'Extended time',ev:'hyp',fd:0,ds:0,fc:0,
  txt:`Accommodations are "by far the most common response to ADHD in educational settings", and extended time on tests is especially common, but most showed no ADHD-specific benefit; read-aloud for younger pupils was the exception. College students with more symptoms benefited less from extra time. Reviewers advise giving accommodations alongside evidence-based interventions, not straight after diagnosis. [[Lovett2021,Lovett2015]]`,
  num:'1',nl:'accommodation with specific benefit (read-aloud)'}
};
const PT_EVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="tag warn">Little ADHD-specific evidence</span>'};

inits.parenting=()=>{
  const svg=$('#ptSvg'),rg=$('#ptT');let mode='with';
  const ink='fill:var(--ink)';
  function abc(x,y,w,act,bad){const lab=[['A · Antecedent','what comes before'],['B · Behaviour','what the child does'],['C · Consequence','what comes after']],bw=(w-16)/3;let s='';
    lab.forEach(([h,sub],i)=>{const bx=x+i*(bw+8),on=act===i,c=bad?'var(--bad)':'var(--beh)',cs=bad?'var(--bad-soft)':'var(--beh-soft)';
      s+=`<rect x="${f1(bx)}" y="${y}" width="${f1(bw)}" height="36" rx="9" style="fill:${on?cs:'var(--panel)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(bx+bw/2)}" y="${y+15}" class="t-sm t-mid" style="${on?`fill:${c};font-weight:700`:''}">${h}</text><text x="${f1(bx+bw/2)}" y="${y+28}" class="t-xs t-mid">${sub}</text>`;
      if(i<2)s+=`<path d="M${f1(bx+bw+1)} ${y+18}h6" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#ptArr)"/>`});
    s+=`<path d="M${f1(x+w-bw/2)} ${y+38}Q${f1(x+w/2)} ${y+60} ${f1(x+bw/2)} ${y+40}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3" marker-end="url(#ptArr)"/>`;
    s+=`<text x="${f1(x+w/2)}" y="${y+60}" class="t-xs t-mid">and round again: today's consequence is tomorrow's setting</text>`;
    return s}
  function shoes(x,y,on){return `<g transform="translate(${f1(x)} ${f1(y)})"><path d="M0 0h14q6 0 6 5v1H0z" style="fill:var(--desk)"/><path d="M18 0h14q6 0 6 5v1H18z" style="fill:var(--desk);opacity:.8"/>${on?'':''}</g>`}
  function board(x,y,w,n,lit){let s=`<rect x="${x}" y="${y}" width="${w}" height="44" rx="8" style="fill:var(--panel);stroke:var(--gold);stroke-width:1.4"/><text x="${x+10}" y="${y+15}" class="t-xs" style="fill:var(--gold);font-weight:700">MORNING CHART</text>`;
    const sw=(w-20)/n;for(let i=0;i<n;i++){const cx=x+10+sw*i+sw/2,cy=y+30,on=i<lit;
      s+=`<path d="${PT_star(cx,cy,8)}" style="fill:${on?'var(--gold)':'none'};stroke:var(--gold);stroke-width:1.2"/>`}
    return s}
  function scene(t,P,u){/* 400 wide scene, 0..340 tall */
    const co=mode==='coer';let s='',act,pa='',cb='',col='var(--beh)',e;
    if(co){const k=Math.min(3,Math.floor(u*4)),L=PT_CO[k];act=L[1]==='A'?0:L[1]==='B'?1:2;
      pa=act!==1?L[0]:'';cb=act===1?L[0]:'';col='var(--bad)';
      if(k===3){pa='"Fine, I\'ll do it myself."';cb='"NO!!"'}
      e=clamp(.25+t*.55+u*.25)}
    else{const S=PT_SC[P];act=u<.34?0:u<.67?1:2;pa=act===0?S.a:act===2?S.c:'';cb=act>=1?S.b:'';e=clamp(.2-P*.025+bump(u,.3,.7)*.08)}
    s+=abc(8,8,384,act,co);
    /* people: parent left, child right */
    const shake=co&&act>=1?Math.sin(u*90)*2.5:0;
    const comply=!co&&PT_SC[P].ok&&act>=1?ease(ramp(u,.34,.6)):0;
    const cx=300+comply*38+shake,px=co&&act===2?96:88;
    s+=`<line x1="0" x2="400" y1="309" y2="309" style="stroke:var(--line);stroke-width:1.5"/>`;
    s+=person(px,168,140,'var(--muted)')+person(cx,206,100,co?'var(--dz)':'var(--accent)');
    s+=`<text x="${px}" y="326" class="t-xs t-mid">parent</text><text x="${f1(cx)}" y="326" class="t-xs t-mid">child</text>`;
    s+=shoes(350,303);
    if(!co&&P===2&&act===2||!co&&P===5&&act===2)s+=`<path d="${PT_star(206,214,9)}" style="fill:var(--gold);opacity:.9"/>`;
    if(co&&act>=1)s+=`<text x="${f1(cx+26)}" y="214" style="font:800 22px var(--display);fill:var(--bad)">!</text>`;
    /* bubbles */
    if(pa){const lines=pa.split('\n').length,h=lines>1?46:32;s+=bubble(10,74,206,h,pa,{tx:px+6,ty:166,c:co&&act===2?'var(--bad)':'var(--line)',fill:'var(--panel)'})}
    if(cb){s+=bubble(222,132,170,30,cb,{tx:cx,ty:204,c:co?'var(--bad)':'var(--accent)',fill:'var(--panel)'})}
    if(!co&&P>=4)s+=board(222,74,170,3,P>=5?3:Math.round(ramp(u,.35,.9)*3));
    if(!co&&P===3&&act===2)s+=`<text x="300" y="124" class="t-xs t-mid" style="fill:var(--beh)">attention follows the nice ask</text>`;
    if(co)s+=`<text x="200" y="342" class="t-xs t-mid" style="fill:var(--bad)">Giving in ends the shouting, so both sides learn to escalate.</text>`;
    return {s,e}}
  function panel(t,P,w,e){let s='';const co=mode==='coer';
    if(P<5){s+=`<text x="0" y="12" class="t-sm" style="fill:var(--beh);font-weight:700">PARENT'S TOOLKIT</text>`;
      const cur=[ -1,0,1,2.5,4][P];
      PT_TOOLS.forEach((n,i)=>{const y=34+i*30,on=co?false:(P===3?(i===2||i===3):i===cur),done=!co&&(i<cur||(P===3&&i<2)||(P===4&&i<4));
        s+=`<rect x="0" y="${y-15}" width="${w}" height="24" rx="7" style="fill:${on?'var(--beh-soft)':'none'};stroke:${on?'var(--beh)':'var(--line)'}"/>`;
        s+=`<circle cx="14" cy="${y-3}" r="7" style="fill:${done||on?'var(--beh)':'var(--panel)'};stroke:var(--beh)"/>`;
        if(done||on)s+=`<path d="M10.5 ${y-3}l2.5 2.6 4.5-5" style="fill:none;stroke:var(--panel);stroke-width:1.8"/>`;
        s+=`<text x="28" y="${y+1}" class="t-sm" style="${on?ink+';font-weight:700':co?'opacity:.5':''}">${n.replace('&','&amp;')}</text>`});
      const my=196;s+=`<text x="0" y="${my}" class="t-sm" style="fill:${co?'var(--bad)':'var(--muted)'};font-weight:700">CONFLICT LEVEL</text><text x="${w}" y="${my}" class="t-xs t-end">schematic, not measured</text>`;
      s+=`<rect x="0" y="${my+8}" width="${w}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="0" y="${my+8}" width="${f1(w*e)}" height="16" rx="8" style="fill:${e>.55?'var(--bad)':e>.35?'var(--warn)':'var(--good)'}"/>`;
      s+=`<text x="0" y="${my+42}" class="t-xs">${co?'louder → refusal → giving in → louder':'clear asks, quick praise, calm limits'}</text>`;
      s+=`<text x="0" y="${my+58}" class="t-xs">${co?'Switch to "With strategies" to compare.':'Switch on the coercive cycle to compare.'}</text>`}
    else{const g=ease(ramp(t,.84,.93)),X=v=>f1(v/.8*(w-60));
      s+=`<text x="0" y="12" class="t-sm" style="fill:var(--beh);font-weight:700">32 RCTs · EAGG 2014 · SMD</text>`;
      s+=`<rect x="0" y="22" width="12" height="7" style="fill:var(--beh);opacity:.35"/><text x="16" y="29" class="t-xs">rated by people close to treatment</text><rect x="0" y="35" width="12" height="7" style="fill:var(--beh)"/><text x="16" y="42" class="t-xs">probably blinded rating</text>`;
      PT_BARS.forEach(([n,a,b],i)=>{const y=66+i*46;s+=`<text x="0" y="${y}" class="t-xs" style="${ink}">${n}</text>`;
        s+=`<rect x="0" y="${y+5}" width="${X(a*g)}" height="10" rx="2" style="fill:var(--beh);opacity:.35"/><text x="${f1(+X(a*g)+4)}" y="${y+14}" class="t-xs">${a.toFixed(2)}</text>`;
        if(b!=null)s+=`<rect x="0" y="${y+18}" width="${X(b*g)}" height="10" rx="2" style="fill:var(--beh)"/><text x="${f1(+X(b*g)+4)}" y="${y+27}" class="t-xs" style="${ink}">${b.toFixed(2)}</text>`;
        else s+=`<text x="0" y="${y+27}" class="t-xs" style="fill:var(--bad);opacity:${f1(g)}">not significant when blinded</text>`});
      s+=`<line x1="0" x2="0" y1="56" y2="248" class="axis"/>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 650'),P=phaseOf(PT_STEPS,t),st=PT_STEPS[P],nx=P<5?PT_STEPS[P+1].from:1.0001,u=clamp((t-st.from)/(nx-st.from));
    let s=`<defs>${marker('ptArr','var(--muted)',5)}</defs>`;const sc=scene(t,P,u);
    s+=N?`<g>${sc.s}</g><g transform="translate(14 372)">${panel(t,P,372,sc.e)}</g>`:`<g transform="translate(6 10)">${sc.s}</g><g transform="translate(440 22)">${panel(t,P,264,sc.e)}</g>`;
    svg.innerHTML=s;setSt(P);
    $('#ptNote').innerHTML=noteHTML(st)+(mode==='coer'?`<div class="callout"><b>Coercive cycle (schematic).</b> Repeated, louder instructions meet refusal; when the adult finally gives in, the child's refusal is rewarded and the adult's giving in is rewarded by the quiet. Nobody intends it. The toolkit is designed to break it: one clear instruction, attention for what goes right, and calm, predictable limits. The meter is an illustration, not data.</div>`:'')}
  const stop=playWire(rg,$('#ptPlay'),draw,30000,'%t:player.replay%','parenting');
  const setSt=stepWire($('#ptSteps'),PT_STEPS,rg,draw,stop);
  $$('[data-pt-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.ptMode;$$('[data-pt-mode]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- classroom ---- */
  const cs=$('#ptClsSvg'),cr=$('#ptClsT'),on=new Set(['drc']);let last='drc';
  function drawC(t){const N=vb(cs,'720 300','400 430');const has=k=>on.has(k);
    let fd=.85,ds=.85,fc=.15;on.forEach(k=>{fd-=PT_SUP[k].fd;ds-=PT_SUP[k].ds;fc+=PT_SUP[k].fc});fd=clamp(fd,.08,1);ds=clamp(ds,0,1);fc=clamp(fc,0,1);
    const W=N?400:720,fl=N?262:250,brk=has('move')&&t>.46&&t<.56;
    let s='';
    /* room: board left, window right */
    const bx=N?14:30,wx=N?306:600;
    s+=`<rect x="${bx}" y="${N?28:30}" width="${N?120:170}" height="${N?70:80}" rx="4" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/><text x="${bx+8}" y="${N?46:50}" class="t-xs" style="fill:var(--accent)">BOARD</text>`;
    if(has('chunk'))s+=`<text x="${bx+8}" y="${N?62:68}" class="t-xs" style="${ink}">1 read · 2 answer</text><text x="${bx+8}" y="${N?75:82}" class="t-xs" style="${ink}">3 check (in writing)</text>`;
    else s+=`<text x="${bx+8}" y="${N?66:72}" class="t-xs">"Do the worksheet."</text>`;
    s+=`<rect x="${wx}" y="${N?28:30}" width="${N?80:90}" height="${N?80:90}" rx="4" style="fill:var(--field);stroke:var(--line);stroke-width:1.4"/><line x1="${wx+(N?40:45)}" x2="${wx+(N?40:45)}" y1="${N?28:30}" y2="${N?108:120}" style="stroke:var(--line)"/><text x="${wx+4}" y="${N?122:136}" class="t-xs">window</text>`;
    const dz=has('seat')?.15:1;for(let i=0;i<4;i++){const a=t*14+i*1.7,dx=wx+20+i*14+Math.sin(a)*6,dy=(N?56:62)+Math.cos(a*1.3)*10;s+=`<path d="M${f1(dx-5)} ${f1(dy)}q5 -5 10 0" style="fill:none;stroke:var(--drug);stroke-width:1.6;opacity:${f1(.8*dz)}"/>`}
    s+=`<line x1="0" x2="${W}" y1="${fl}" y2="${fl}" style="stroke:var(--line);stroke-width:1.5"/>`;
    /* desk: moves toward the board with the seating support */
    const dxp=has('seat')?(N?150:250):(N?230:430),sc=N?1.45:1.8;
    if(brk){s+=`<g transform="translate(${dxp} ${fl}) scale(${sc})"><rect x="-4" y="-34" width="54" height="5" rx="2" style="fill:var(--desk)"/><rect x="44" y="-30" width="4" height="30" style="fill:var(--desk)"/></g>`;
      s+=person(dxp-40,fl-104,104,'var(--muted)');s+=bubble(dxp-20,fl-160,136,26,'"I need a break" card',{tx:dxp-34,ty:fl-108,cls:'t-xs'})}
    else s+=desk(dxp,fl,60*sc,{fidget:fd,focus:fc,distract:ds,t});
    /* items on or near the desk */
    if(has('drc')){const dx0=dxp+(N?28:34),dy0=fl-(N?112:130),done=Math.round(ramp(t,.8,.97)*3);
      s+=`<rect x="${dx0}" y="${dy0}" width="${N?92:104}" height="${N?52:56}" rx="6" style="fill:var(--panel);stroke:var(--beh);stroke-width:1.4"/><text x="${dx0+6}" y="${dy0+13}" class="t-xs" style="fill:var(--beh);font-weight:700">DAILY REPORT CARD</text>`;
      ['Starts work','Stays seated','Hands in'].forEach((g,i)=>{const y=dy0+25+i*10;s+=`<text x="${dx0+6}" y="${y+3}" class="t-xs" style="font-size:8px">${g}</text><text x="${dx0+(N?84:96)}" y="${y+3}" class="t-xs t-end" style="fill:var(--beh);font-size:9px">${i<done?'✓':'·'}</text>`})}
    if(has('ost')){const ox=dxp-(N?100:132),oy=fl-(N?40:46);s+=`<rect x="${ox}" y="${oy}" width="${N?30:36}" height="${N?36:42}" rx="3" style="fill:var(--dx-soft);stroke:var(--dx)"/>`;
      ['var(--brand)','var(--beh)','var(--gold)'].forEach((c,i)=>s+=`<rect x="${ox+(N?30:36)}" y="${oy+4+i*10}" width="6" height="7" style="fill:${c}"/>`);
      s+=`<text x="${ox}" y="${oy-4}" class="t-xs" style="fill:var(--dx)">binder</text>`}
    if(has('chunk')){const k=Math.min(2,Math.floor(t*3)),cxk=N?220:520,cyk=N?60:70;s+=clock(cxk,cyk,N?17:20,9+t*40/60,{c:'var(--beh)'});
      s+=`<text x="${cxk}" y="${cyk+(N?32:36)}" class="t-xs t-mid">block ${k+1} of 3</text>`}
    if(has('acc'))s+=`<text x="${N?200:360}" y="${N?20:22}" class="t-xs t-mid" style="fill:var(--warn)">+ extended time on the test</text>`;
    /* lesson bar */
    const ly=N?300:276,lx0=N?20:40,lx1=N?380:680;
    s+=`<line x1="${lx0}" x2="${lx1}" y1="${ly}" y2="${ly}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/><line x1="${lx0}" x2="${f1(lerp(lx0,lx1,t))}" y1="${ly}" y2="${ly}" style="stroke:var(--beh);stroke-width:6;stroke-linecap:round"/>`;
    if(has('chunk'))[1/3,2/3].forEach(v=>s+=`<line x1="${f1(lerp(lx0,lx1,v))}" x2="${f1(lerp(lx0,lx1,v))}" y1="${ly-7}" y2="${ly+7}" style="stroke:var(--ink);stroke-width:1.4"/>`);
    if(has('move'))s+=`<rect x="${f1(lerp(lx0,lx1,.46))}" y="${ly-6}" width="${f1((lx1-lx0)*.1)}" height="12" rx="3" style="fill:var(--gold);opacity:.7"/>`;
    s+=`<text x="${lx0}" y="${ly+18}" class="t-xs">0 min</text><text x="${lx1}" y="${ly+18}" class="t-xs t-end">40 min</text><text x="${f1(lerp(lx0,lx1,t))}" y="${ly-12}" class="t-xs t-mid" style="fill:var(--ink)">${Math.round(t*40)} min</text>`;
    if(N){/* list the active supports under the scene on phones */
      const L=[...on].map(k=>PT_SUP[k].n.replace('&','&amp;'));
      s+=`<text x="20" y="${ly+40}" class="t-xs" style="font-weight:700">${L.length?'SUPPORTS ON':'NO SUPPORTS ON'}</text>`;
      L.forEach((n,i)=>s+=`<text x="${20+(i%2)*186}" y="${ly+56+Math.floor(i/2)*15}" class="t-xs" style="fill:var(--beh);font-weight:700">✓ ${n}</text>`)}
    cs.innerHTML=s;
    cr.setAttribute('aria-valuetext',`${Math.round(t*40)} minutes into the lesson`)}
  function notes(){const ks=[last,...[...on].filter(k=>k!==last)].filter(k=>on.has(k)||k===last);
    $('#ptClsNote').innerHTML=`<div class="kicker">${on.size} support${on.size===1?'':'s'} on</div>`+ks.map(k=>{const S=PT_SUP[k];return `<div class="card"${on.has(k)?'':' style="opacity:.6"'}><div class="chips">${PT_EVL[S.ev]}${on.has(k)?'':'<span class="tag">switched off</span>'}</div><h4>${S.n.replace('&','&amp;')}</h4><div><span class="ptnum">${S.num}</span> <span class="stage-cap">${S.nl}</span></div><p>${S.txt}</p></div>`}).join('')}
  playWire(cr,$('#ptClsPlay'),drawC,14000,'%t:player.replay%','parenting');
  $$('[data-pt-sup]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ptSup;if(on.has(k))on.delete(k);else on.add(k);last=k;b.setAttribute('aria-pressed',on.has(k));drawC(+cr.value);notes()}));
  drawC(+cr.value);notes();
};
/* a five-point star path centred on (cx,cy) */
function PT_star(cx,cy,r){let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;d+=(i?'L':'M')+f1(cx+Math.cos(a)*rr)+' '+f1(cy+Math.sin(a)*rr)}return d+'Z'}
