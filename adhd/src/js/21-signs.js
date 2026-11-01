/* =============== 2.1 Signs across the lifespan =============== */
/* SG: one person from age 3 to 60 in five scenes, with symptom chips that grow or shrink with age
   (schematic levels; only the direction of change comes from the studies), then a teaching tool
   that shows which parts of the DSM-5-TR definition an everyday example touches. */
const SG_AGES=[3,6,13,18,30,60];
const SG_STEPS=[
 {from:0,at:.1,k:'Age 3–5 · preschool',t:'Preschool: always on the go',
  txt:`The same 18 symptoms apply at every age under 18. In a preschooler they can look like running or climbing when it is not appropriate, being unable to play quietly, acting "as if driven by a motor" and finding it very hard to wait a turn. [[APA2022DSM,Wolraich2019]] The AAP states that DSM-5 criteria can be applied from age 4 to the sixth birthday, and that evidence is insufficient to recommend diagnosis or treatment under 4. Requiring symptoms in more than one setting is hard to check in a child who is not in preschool or child care. [[Wolraich2019]]`,
  pt:`Lots of small children are busy and loud. What matters is behaviour that is much more than for other children of the same age, in more than one place, and that causes real problems. [[APA2022DSM,Wolraich2019]]`,
  hook:`AAP: evaluate for ADHD from age 4 to the 18th birthday; insufficient evidence under 4. [[Wolraich2019]]`},
 {from:.2,at:.3,k:'Age 6–12 · school',t:'School age: the classroom shows it',
  txt:`School demands make the inattentive symptoms visible: careless mistakes, trouble keeping attention on schoolwork, seeming not to listen, not finishing tasks, losing things needed for school, and avoiding homework that needs sustained mental effort. Hyperactive-impulsive symptoms show as leaving the seat, blurting out answers and interrupting. [[APA2022DSM]] In a 2014 US survey the median age at diagnosis was 7, and in Danish registers diagnoses peaked at age 8 in boys. Several symptoms must have been present before age 12. [[Wolraich2019,Dalsgaard2020JAMAPsych,APA2022DSM]]`,
  pt:`A child with ADHD is not choosing to be careless or to ignore the teacher. They may know the answer and still lose track of the question. [[Willcutt2005]]`,
  hook:`DSM-5 onset criterion: several symptoms before age 12 (DSM-IV: impairment before 7). [[Epstein2013]]`},
 {from:.4,at:.5,k:'Age 13–17 · adolescence',t:'Adolescence: quieter outside, not inside',
  txt:`Hyperactive and impulsive symptoms decline faster with age than inattention: in boys followed for 4 years, inattention remitted in fewer than hyperactivity or impulsivity. [[Biederman2000Decline]] In adolescents and adults, running and climbing may be only a feeling of restlessness. [[APA2022DSM]] Newly licensed drivers with ADHD had a higher crash rate, especially in the first month (adjusted rate ratio 1.62). [[Curry2019]] From age 17 the DSM threshold drops from 6 to 5 symptoms in a domain. [[APA2022DSM,Epstein2013]]`,
  pt:`Being very active and restless often gets milder in the teenage years. Trouble paying attention usually lasts longer, and restlessness can move inside. [[Biederman2000Decline,Faraone2021]]`,
  hook:`Hyperactivity-impulsivity declines faster with age than inattention. [[Biederman2000Decline]]`},
 {from:.6,at:.7,k:'Age 18–30 · study and work',t:'University and work: deadlines and money',
  txt:`With less structure, the inattentive symptoms show up as trouble organising tasks and managing time, missed deadlines, avoiding long reports, losing keys, wallet or phone, and being distracted by unrelated thoughts. [[APA2022DSM]] About 2–8% of college students report clinically significant ADHD symptoms. [[DuPaul2009College]] In 1.2 million Swedish school leavers, people with ADHD had on average 17% lower annual income than controls. These are population figures. [[Jangmo2021]]`,
  pt:`For many people ADHD becomes more obvious when school ends and no one else keeps the timetable. [[Epstein2013,Young2020Females]]`,
  hook:`From age 17, DSM-5-TR needs 5 or more symptoms in a domain, not 6. [[APA2022DSM]]`},
 {from:.8,at:.9,k:'Age 30–60 · midlife and parenthood',t:'Midlife: running a household',
  txt:`In adults, forgetfulness in daily activities can mean missed appointments, unpaid bills and forgotten messages, and restlessness can make long meetings hard. [[APA2022DSM]] European experts describe ADHD in adults as often lifelong and impairing, and under-diagnosed. [[Kooij2019]] NICE asks clinicians to consider the needs of a parent with ADHD whose child also has ADHD, including extra help with organisation and school routines. [[NICE2018H]] Prevalence falls with age: persistent adult ADHD went from 5.05% at 18–24 to 0.77% at 60 and over. [[Song2021]]`,
  pt:`ADHD can carry on into middle and older age. Parents with ADHD may need extra help with organisation, especially when their child has ADHD too. [[Kooij2019,NICE2018H]]`,
  hook:`Persistent adult ADHD: 5.05% at 18–24 years, 0.77% at ≥60 (Song 2021). [[Song2021]]`}
];
/* schematic symptom levels by age (0–1): direction from the studies, not measured values */
const SG_LV={ages:[3,6,9,13,18,30,60],
  ina:[.5,.7,.82,.85,.82,.8,.75],hyp:[.95,.92,.85,.6,.4,.3,.25],imp:[.9,.88,.8,.68,.55,.48,.42],emo:[.6,.6,.62,.65,.65,.62,.58],ef:[.35,.55,.72,.82,.85,.82,.78]};
/* bubbles: [outward (what others see), inward (what it feels like)] per scene */
const SG_BUB=[
 [['Always on the go','Can\'t wait\nfor a turn'],['I want it\nNOW!','Sitting still\nfeels awful']],
 [['Out of her seat\nagain','Careless\nmistakes'],['Wait, which\npage?','I knew it, then\nit slipped away']],
 [['Homework left\ntill midnight','Loses his\nphone again'],['I feel restless\ninside','Thoughts jump\naround']],
 [['Missed the\ndeadline','Bought it\non impulse'],['I\'ll start in\nfive minutes','Every task\nfeels huge']],
 [['Forgot the\nappointment','Late again'],['Holding everyone\'s\nschedule in my head','Long meetings\nare torture']]
];
inits.signs=()=>{
  const svg=$('#sgSvg'),rg=$('#sgT'),note=$('#sgNote');let inward=false;
  const T=(x,y,c,s,st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const ageOf=t=>{const k=clamp(Math.floor(t*5),0,4);return lerp(SG_AGES[k],SG_AGES[k+1],clamp(t*5-k))};
  const lvl=(key,a)=>{const A=SG_LV.ages,V=SG_LV[key];for(let i=0;i<A.length-1;i++)if(a<=A[i+1])return lerp(V[i],V[i+1],(a-A[i])/(A[i+1]-A[i]));return V[V.length-1]};
  const car=(x,y,c)=>`<g transform="translate(${f1(x)} ${f1(y)})"><path d="M0 0H70V-14L58 -16L48 -28H20L10 -16H0Z" style="fill:${c};opacity:.85"/><circle cx="16" cy="0" r="7" style="fill:var(--ink)"/><circle cx="54" cy="0" r="7" style="fill:var(--ink)"/><rect x="24" y="-25" width="20" height="9" rx="2" style="fill:var(--panel)"/></g>`;
  const laptop=(x,y)=>`<path d="M${x} ${y}h34l-4 -22h-26z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${x-4}" y="${y}" width="42" height="3" rx="1" style="fill:var(--muted)"/>`;
  /* one scene per life stage, drawn in a box at (x,y) of size (w,h); f = progress within the stage */
  function scene(i,B,f,t,a){const g=B.y+B.h-18,cx=B.x+B.w/2;let s='';
    s+=`<line x1="${B.x+10}" x2="${B.x+B.w-10}" y1="${g}" y2="${g}" style="stroke:var(--line);stroke-width:2"/>`;
    const hy=lvl('hyp',a),pc='var(--dx)';
    if(i===0){const run=Math.sin(t*Math.PI*30)*(B.w*.22)*hy,bounce=Math.abs(Math.sin(t*Math.PI*60))*8*hy;
      for(let k=0;k<4;k++)s+=`<rect x="${f1(cx+B.w*.28)}" y="${f1(g-14-k*14)}" width="22" height="13" rx="2" style="fill:${['var(--da)','var(--accent)','var(--dz)','var(--ne)'][k]};opacity:.8;transform:rotate(${k===3?f1(Math.sin(t*40)*8):0}deg);transform-origin:${f1(cx+B.w*.28+11)}px ${f1(g-14-k*14+6)}px"/>`;
      s+=person(B.x+30,g-96,96,'var(--muted)',{op:.55})+person(cx+run-12,g-50-bounce,50,pc);}
    else if(i===1){s+=desk(cx-10,g,96,{fidget:hy,distract:lvl('ina',a)*.9,focus:.15,t,fill:pc})+person(B.x+B.w-50,g-104,104,'var(--muted)',{op:.55});
      s+=`<rect x="${cx-30}" y="${B.y+24}" width="90" height="46" rx="4" style="fill:var(--accent-soft);stroke:var(--accent);opacity:.6"/>`+T(cx+15,B.y+52,'t-xs t-mid','7 × 8 = ?','fill:var(--ink)')}
    else if(i===2){s+=desk(cx-60,g,96,{fidget:hy*.6,distract:lvl('ina',a),focus:.3,t,fill:pc})+laptop(cx-50,g-34*1.6-2);
      s+=car(B.x+B.w-112,g-4,'var(--dx)')+T(B.x+B.w-77,g-40,'t-xs t-mid','new driver');
      const ph=Math.floor(t*40)%2;s+=`<rect x="${f1(cx+24)}" y="${f1(g-70)}" width="12" height="20" rx="2" style="fill:var(--ink);opacity:${ph?.9:.5}"/>`}
    else if(i===3){s+=desk(cx-40,g,110,{fidget:hy*.5,distract:lvl('ina',a),focus:.35,t,fill:pc})+laptop(cx-14,g-34*1.83-2);
      const hh=17+((t-.6)/.2)*7;s+=clock(B.x+50,g-64,24,hh,{label:true,c:'var(--dz)'})+T(B.x+50,g-96,'t-xs t-mid','deadline 23:59','fill:var(--dz);font-weight:700');
      for(let k=0;k<5;k++)s+=`<rect x="${f1(cx+50+k*2)}" y="${f1(g-62-k*5)}" width="32" height="4" rx="1" style="fill:var(--panel);stroke:var(--muted);stroke-width:.8"/>`}
    else{s+=person(cx-40,g-110,110,pc)+person(cx+20,g-56,56,'var(--accent)');
      s+=`<g transform="translate(${f1(B.x+B.w-100)} ${f1(g-80)})"><rect width="84" height="70" rx="5" style="fill:var(--panel);stroke:var(--muted)"/><rect width="84" height="14" rx="5" style="fill:var(--dz);opacity:.7"/>`;
      for(let r=0;r<4;r++)for(let c=0;c<6;c++){const busy=((r*6+c)*7)%5<2;s+=`<rect x="${4+c*13.3}" y="${18+r*12.5}" width="10" height="9" rx="1.5" style="fill:${busy?'var(--da)':'var(--panel-2)'}"/>`}
      s+=`</g>`;const kx=B.x+40+Math.sin(t*20)*6;s+=`<g style="opacity:.8"><circle cx="${f1(kx)}" cy="${f1(g-8)}" r="5" style="fill:none;stroke:var(--gold);stroke-width:2"/><path d="M${f1(kx+5)} ${f1(g-8)}h14v4" style="fill:none;stroke:var(--gold);stroke-width:2"/></g>`+T(B.x+40,g+14,'t-xs t-mid','keys?')}
    /* two bubbles, the second after the scene is half way */
    const BB=SG_BUB[i][inward?1:0],bw=Math.min(150,B.w*.42);
    BB.forEach((tx,k)=>{const o=k?ramp(f,.35,.5):ramp(f,0,.12);if(o<=0)return;const bx=k?B.x+B.w-bw-14:B.x+14,by=B.y+(k?92:14);
      const tgt=i===0?[cx,g-40]:i===4?[cx-40,g-92]:[cx-24,g-60];
      s+=`<g style="opacity:${f1(o)}">`+bubble(bx,by,bw,36,tx,{think:inward,tx:clamp(tgt[0],bx+10,bx+bw-10),ty:by+52,c:inward?'var(--rcpt)':'var(--line)',cls:'t-xs'})+'</g>'});
    return s}
  function draw(t){const N=vb(svg,'720 400','400 620'),a=ageOf(t),p=phaseOf(SG_STEPS,t),i=clamp(Math.floor(t*5),0,4);
    const L=N?{sb:{x:10,y:58,w:380,h:280},cx:20,cy:368,cw:360,ch:30,tl:[24,376,590]}:{sb:{x:12,y:58,w:430,h:276},cx:466,cy:70,cw:240,ch:44,tl:[30,690,372]};
    let s=`<text x="${N?14:16}" y="26" class="t-big">${SG_STEPS[p].t.split(':')[0]}</text><text x="${N?14:16}" y="42" class="t-sm">${inward?'what it can feel like from the inside':'what other people may notice'}</text>`;
    s+=`<rect x="${L.sb.x}" y="${L.sb.y}" width="${L.sb.w}" height="${L.sb.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const f=clamp(t*5-i),fade=Math.min(1,ramp(f,0,.08)+(i===0?1:0))*(i===4?1:1-ramp(f,.94,1));
    s+=`<g style="opacity:${f1(fade)}">${scene(i,L.sb,f,t,a)}</g>`;
    /* age badge */
    s+=`<text x="${L.sb.x+L.sb.w-12}" y="${L.sb.y+(N?30:36)}" class="t-end" style="font:700 ${N?22:26}px var(--display);fill:var(--dx)">age ${Math.round(a)}</text>`;
    /* symptom chips */
    const CH=[['ina','inattention','inattention','var(--dx)'],['hyp','hyperactivity','inner restlessness','var(--dz)'],['imp','impulsivity','impulsive urges','var(--drug)'],['emo','emotional dysregulation','emotional dysregulation','var(--rcpt)'],['ef','executive function','executive function','var(--accent)']];
    s+=T(L.cx,L.cy-12,'t-sm','HOW PROMINENT (SCHEMATIC)');
    CH.forEach(([k,o,inn,c],j)=>{const v=lvl(k,a),y=L.cy+j*L.ch,w=(N?150:124)+v*(L.cw-(N?150:124));
      s+=`<rect x="${L.cx}" y="${y}" width="${f1(w)}" height="${N?22:26}" rx="${N?11:13}" style="fill:${c};opacity:${f1(.25+v*.6)}"/>`+T(L.cx+12,y+(N?15:17),'t-xs',inward?inn:o,'fill:var(--ink);font-weight:700')+(N?'':T(L.cx,y+(N?34:39),'t-xs',k==='hyp'?(v<.5?'often declines with age':'very visible in young children'):k==='ina'?'tends to persist':k==='emo'?'common at all ages':k==='imp'?'declines, more slowly':'shows as demands rise'))});
    /* life timeline */
    const [x0,x1,ty]=L.tl,X=v=>{for(let k=0;k<5;k++)if(v<=SG_AGES[k+1])return lerp(x0,x1,(k+(v-SG_AGES[k])/(SG_AGES[k+1]-SG_AGES[k]))/5);return x1};
    const NM=N?['pre','school','teen','study/work','midlife']:['preschool','school age','adolescence','university / work','midlife, parenthood'];
    s+=`<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/><line x1="${x0}" x2="${f1(X(a))}" y1="${ty}" y2="${ty}" style="stroke:var(--dx);stroke-width:6;stroke-linecap:round"/>`;
    SG_AGES.forEach((v,k)=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ty-6}" y2="${ty+6}" style="stroke:var(--muted)"/>`+T(X(v),ty+18,'t-xs t-mid',v);if(k<5)s+=T((X(v)+X(SG_AGES[k+1]))/2,ty-10,'t-xs t-mid',NM[k],k===i?'fill:var(--ink);font-weight:700':'')});
    s+=`<circle cx="${f1(X(a))}" cy="${ty}" r="7" style="fill:var(--panel);stroke:var(--dx);stroke-width:3"/>`;
    
    svg.innerHTML=s;setSt(p);rg.setAttribute('aria-valuetext',`Age ${Math.round(a)}: ${SG_STEPS[p].t}`);
    note.innerHTML=noteHTML(SG_STEPS[p])}
  const stop=playWire(rg,$('#sgPlay'),draw,30000,'%t:player.replay%','signs');
  const setSt=stepWire($('#sgSteps'),SG_STEPS,rg,draw,stop);
  $$('[data-sv]').forEach(b=>b.addEventListener('click',()=>{inward=b.dataset.sv==='in';$$('[data-sv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- ordinary or impairing? (teaching only) ---- */
  const OFT=['rarely','sometimes','often','very often'],SET=['','in one setting only','in two settings','in three or more settings'],IMP=['no real effect on daily life','a little friction, but things get done','clearly reduces the quality of school, work or relationships'];
  const sv=$('#sgCalcSvg');
  function calc(){const o=+$('#sgOften').value,st=+$('#sgSet').value,im=+$('#sgImp').value;
    $('#sgOftenV').textContent=OFT[o];$('#sgSetV').textContent=SET[st];$('#sgImpV').textContent=IMP[im];
    const E=[['A','Symptoms occur "often"',o>=2?1:0,o>=2?'yes: "often" or more':'not at this frequency'],
      ['A','Enough symptoms (6, or 5 from age 17)',-1,'not counted here: see 2.2'],
      ['A','Lasting at least 6 months',-1,'not asked here'],
      ['B','Several symptoms before age 12',-1,'not asked here'],
      ['C','Several symptoms in 2 or more settings',st>=2?1:0,st>=2?'yes':'one setting only'],
      ['D','Interferes with or reduces functioning',im===2?1:im===1?.5:0,im===2?'yes':im===1?'unclear: a clinician weighs this':'no'],
      ['E','Not better explained by another condition',-1,'needs a clinical assessment']];
    const N=vb(sv,'720 250','400 420');let s='';
    E.forEach(([c,lab,on,why],k)=>{const col=N?0:(k<4?0:1),row=N?k:(k<4?k:k-4),x=N?14:(col?370:14),y=(N?16:20)+row*(N?56:56),w=N?372:336;
      const fill=on===1?'var(--good-soft)':on===.5?'var(--warn-soft)':on===0?'var(--bad-soft)':'var(--panel-2)',ink=on===1?'var(--good)':on===.5?'var(--warn)':on===0?'var(--bad)':'var(--muted)';
      s+=`<rect x="${x}" y="${y}" width="${w}" height="46" rx="10" style="fill:${fill};stroke:${ink};stroke-width:${on===1?2:1};${on===-1?'stroke-dasharray:4 3':''}"/>`;
      s+=`<circle cx="${x+22}" cy="${y+23}" r="13" style="fill:${ink};opacity:${on===-1?.35:1}"/>`+T(x+22,y+27.5,'t-mid',c,'font:700 12px var(--display);fill:var(--panel)');
      s+=T(x+44,y+19,'t-xs',lab,'fill:var(--ink);font-weight:700')+T(x+44,y+35,'t-xs',why,`fill:${ink}`)});
    if(!N)s+=T(370,20+3*56+28,'t-xs','Dashed: parts this tool does not ask about.');
    sv.innerHTML=s;
    const lit=E.filter(e=>e[2]===1).length;
    $('#sgCalcNote').innerHTML=`<div class="kicker">Teaching result, not a verdict</div><p><b>${lit} of the 7 elements</b> are touched by this example. Something that happens <b>${OFT[o]}</b>, <b>${SET[st]}</b>, with <b>${IMP[im]}</b>${o>=2&&st>=2&&im===2?', touches the frequency, setting and impairment parts of the definition. Whether it is ADHD still depends on the symptom count, the history before age 12, the 6-month duration and on ruling out other explanations, which only a clinical assessment can do.':o<2?': everyone has moments like this. DSM-5-TR counts a symptom only when it happens often and is inconsistent with developmental level.':st<2?': ADHD symptoms show up across settings. A problem in one place only points first to that place (a class, a job, a relationship).':': without clear interference with daily life, DSM-5-TR criterion D is not met, even when the traits are real.'} [[APA2022DSM,Epstein2013]]</p>`}
  ['#sgOften','#sgSet','#sgImp'].forEach(id=>$(id).addEventListener('input',calc));calc();
  const prevR=redraws.signs;redraws.signs=()=>{prevR&&prevR();calc()};
};
