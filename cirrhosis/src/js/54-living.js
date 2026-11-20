/* =============== 5.4 Living with cirrhosis =============== */
/* t 0..1 = Monday 00:00 -> Sunday 24:00 */
const LV_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const LV_W=[76.0,76.1,75.9,76.6,77.2,77.8,77.9];
const LV_STEPS=[
 {from:0,at:.07,k:'Monday',t:'Medicines and routine',
  txt:`The week starts with the routine: morning and evening medicines, here a diuretic, lactulose and a beta-blocker, and a weight on the same scale each morning. LiverHope's three main teaching aims are recognising and preventing complications, preventing falls, and knowing the effects and side effects of medicines, with the main caregiver at each visit. [[Fabrellas2020LiverHope]] In 150 outpatients only 53% of self-management questions were answered correctly at first; the most missed were the sodium in sea salt and the safety of paracetamol and statins. [[Volk2013Knowledge]] Medicine details: <a href="#nursing" data-go="nursing">nursing care</a> and <a href="#nutrition" data-go="nutrition">medicine safety</a>.`,
  pt:`Ask before taking any new medicine, including pain relievers. Many people with cirrhosis are told to avoid ibuprofen and similar drugs, and paracetamol has a lower daily limit. [[Rogal2022AASLD]]`,
  hook:`LiverHope's three teaching aims: complications, falls, medicines; and the main caregiver attends. [[Fabrellas2020LiverHope]]`},
 {from:1/7,at:1.55/7,k:'Tuesday',t:'Meals, salt and the late snack',
  txt:`Four meals and a late evening snack (the moon). AASLD 2021: fasting gaps of no more than 3–4 hours while awake, with an early breakfast and/or late evening snack, and protein not restricted. [[Lai2021AASLD]] EASL 2019, patient section: "The late-evening snack is the most important, as it covers the long interval between dinner and breakfast". With ascites, EASL quotes about 80 mmol sodium a day (2 g sodium, 5 g salt), keeping food palatable; LiverHope uses under 100 mmol a day. [[EASL2019Nutrition,Fabrellas2020LiverHope]] Only 31% of 120 outpatients kept to a 2-g sodium diet, and those who did ate 20% fewer calories. [[Lai2021AASLD]]`,
  pt:`A small snack before bed, with some protein, can help protect your muscles overnight. [[EASL2019Nutrition,Plank2008]]`,
  hook:`EASL 2019 salt in ascites: about 80 mmol sodium (2 g sodium, 5 g salt) a day. [[EASL2019Nutrition]]`},
 {from:2/7,at:2.55/7,k:'Wednesday',t:'Clinic and the 6-monthly scan',
  txt:`Clinic day, with a carer along. AASLD 2023: "HCC surveillance should be performed using ultrasound and AFP at semiannual (approximately every 6 months) intervals". [[Singal2023AASLDHCC]] Many people miss these checks, and reminders help. [[Wolf2021Surveillance]] AASLD 2021 suggests reassessing frailty at least yearly in compensated disease and as often as every 8–12 weeks in decompensated cirrhosis. [[Lai2021AASLD]] More in <a href="#hcc" data-go="hcc">liver cancer surveillance</a>.`,
  pt:`It is fine to ask your care team when your next scan is due.`,
  hook:`HCC surveillance in cirrhosis: ultrasound ± AFP every 6 months. [[Singal2023AASLDHCC]]`},
 {from:3/7,at:3.55/7,k:'Thursday',t:'Fatigue, itch and cramps',
  txt:`Symptoms come and go: tiredness, itch, cramps at night. A review of 80 studies found muscle cramps in 56–68% and insomnia in 26–77%; the JAMA review gives itch in about 39%. [[Peng2019,Tapper2023JAMA]] AASLD 2022 reports fatigue in 50–86%. For cramps, checking and repleting potassium, magnesium and zinc is a first step. [[Rogal2022AASLD]] <span class="ev early">Early evidence</span> Sips of pickle brine at cramp onset reduced severity in a randomised trial. [[Tapper2022PICCLES]] From today the weight starts to climb.`,
  pt:`Feeling tired, itchy, crampy or sleeping badly is common with cirrhosis. Tell your team: many of these can be helped. [[Peng2019,Rogal2022AASLD]]`,
  hook:`First step for cramps in decompensated cirrhosis: check and replete potassium, magnesium and zinc. [[Rogal2022AASLD]]`},
 {from:4.6/7,at:5.6/7,k:'Friday to Saturday',t:'Weight creeping up: call your team',
  txt:`The weight has risen by more than half a kilogram a day for three days running, and the belly feels tighter. LiverHope teaches people to monitor their weight and to call when it increases by more than 500 g/day for at least 3 consecutive days. [[Fabrellas2020LiverHope]] That is a call to the team (amber), not an emergency on its own. Among people with ascites, spontaneous bacterial peritonitis occurs in about 11% a year, so fever or belly pain with a swollen abdomen moves it to the red box. [[Tapper2023JAMA]]`,
  pt:`If your team asks you to weigh yourself, do it at the same time each day and call if your weight goes up quickly, as your team has explained. [[Fabrellas2020LiverHope]]`,
  hook:`LiverHope home teaching: weight up >500 g/day for ≥3 consecutive days → call the team. [[Fabrellas2020LiverHope]]`},
 {from:6/7,at:6.6/7,k:'Sunday',t:'A red flag: urgent care',
  txt:`On Sunday the stool is black and tarry. LiverHope teaches patients and caregivers to recognise GI bleeding, particularly melaena (black stools), and to know early signs of infection (fever, abdominal pain, early confusion, painful urination, chest symptoms) and that less urine can signal kidney injury. [[Fabrellas2020LiverHope]] Complications can move fast: in a meta-analysis, 30.3% of people with an infection died within a month (a population figure). [[Arvaniti2010Gastro]] Do not wait for Monday's clinic.`,
  pt:`Vomiting blood, black or tarry stools, new confusion or drowsiness, or fever or belly pain with a swollen abdomen need urgent care: call your local emergency number or go to an emergency department. [[Fabrellas2020LiverHope]]`,
  hook:`Black tarry stool = melaena = upper GI bleeding until proven otherwise. [[Fabrellas2020LiverHope]]`}
];
const LV_FLAGS=['Vomiting blood','Black or tarry stools','New confusion or drowsiness','Fever or belly pain with a swollen abdomen'];
const LV_FLAGS2=[['Vomiting blood'],['Black or tarry','stools'],['New confusion','or drowsiness'],['Fever or belly pain','+ swollen abdomen']];
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),note=$('#lvNote');let setSt=()=>{};
  const amberOn=d=>d>=5.35,redOn=d=>d>=6.35;
  function draw(t){const N=vb(svg,'720 348','400 480'),d=7*clamp(t),p=phaseOf(LV_STEPS,t),di=Math.min(6,Math.floor(d));let s='';
    const lx=N?10:18,c0=N?74:112,cw=N?45:64,X=i=>c0+cw*(i+.5),vis=i=>clamp(d-i+.35);
    const R=N?{h:24,med:40,w:92,wB:166,meal:186,app:222,sym:266,sup:310,end:336}:{h:24,med:40,w:90,wB:162,meal:182,app:216,sym:262,sup:310,end:338};
    /* columns */
    for(let i=0;i<7;i++){const cx=c0+cw*i,on=i===di;
      s+=`<rect x="${f1(cx+2)}" y="${R.h-14}" width="${cw-4}" height="${R.end-R.h+14}" rx="8" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};opacity:${on?.9:.45}"/>`;
      s+=`<text x="${f1(X(i))}" y="${R.h}" class="t-sm t-mid" style="${on?'fill:var(--rx);font-weight:700':''}">${LV_DAYS[i]}</text>`}
    const rowL=(y,txt)=>`<text x="${lx}" y="${y}" class="t-xs" style="font-weight:700">${txt}</text>`;
    s+=rowL(R.med+14,'MEDICINES')+rowL(R.w+8,'WEIGHT')+rowL(R.w+20,'kg')+rowL(R.meal+12,'MEALS')+rowL(R.app+12,N?'VISITS':'APPOINTMENTS')+rowL(R.sym+12,'SYMPTOMS')+rowL(R.sup+12,'SUPPORT');
    for(let i=0;i<7;i++){const v=vis(i);if(v<=0)continue;const x=X(i);let g='';
      /* medicines: two morning, one evening */
      g+=pill(x-11,R.med+8,N?13:16,{ang:-20})+pill(x+10,R.med+8,N?13:16,{ang:20,col:'var(--brand)'})+pill(x,R.med+24,N?10:12,{round:true,col:'var(--accent)'});
      /* meals */
      for(let k=0;k<4;k++)g+=`<circle cx="${f1(x-(N?15:20)+k*(N?8:10))}" cy="${R.meal+8}" r="${N?2.6:3.2}" style="fill:var(--rx)"/>`;
      g+=`<path d="M${f1(x+(N?18:23))} ${R.meal+2}a6 6 0 1 0 5 9a5 5 0 1 1 -5 -9z" style="fill:var(--brand)"/>`;
      s+=`<g style="opacity:${f1(v)}">${g}</g>`}
    if(d<1.4)s+=`<text x="${f1(X(0)+cw*.55)}" y="${R.med+38}" class="t-xs">diuretic · lactulose · beta-blocker</text>`;
    if(d>=1&&d<2.4)s+=`<text x="${f1(X(1)-cw*.4)}" y="${R.meal+26}" class="t-xs">4 meals + late snack (moon)</text>`;
    /* weight line */
    const wy=v=>lerp(R.wB,R.w,(v-75.5)/2.8);let path='';
    for(let i=0;i<7;i++){if(vis(i)<.6)continue;path+=(path?'L':'M')+f1(X(i))+' '+f1(wy(LV_W[i]))}
    if(path)s+=`<path d="${path}" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`;
    for(let i=0;i<7;i++){if(vis(i)<.6)continue;const up=i>0&&LV_W[i]-LV_W[i-1]>.5,c=up?'var(--warn)':'var(--ink)';
      s+=`<circle cx="${f1(X(i))}" cy="${f1(wy(LV_W[i]))}" r="${up?5:4}" style="fill:${up?'var(--warn)':'var(--panel)'};stroke:${c};stroke-width:1.8"/><text x="${f1(X(i))}" y="${f1(wy(LV_W[i])-9)}" class="t-xs t-mid" style="${up?'fill:var(--warn);font-weight:700':''}">${N?LV_W[i].toFixed(1).slice(-4):LV_W[i].toFixed(1)}</text>`;
      if(up)s+=`<text x="${f1(X(i))}" y="${R.wB+2}" class="t-xs t-mid" style="fill:var(--warn)">+${(LV_W[i]-LV_W[i-1]).toFixed(1)}</text>`}
    /* appointments */
    const app=(i,a,b,c)=>{if(vis(i)<=0)return;s+=`<g style="opacity:${f1(vis(i))}"><rect x="${f1(X(i)-cw/2+5)}" y="${R.app}" width="${cw-10}" height="${N?34:32}" rx="6" style="fill:var(--panel);stroke:${c};stroke-width:1.4"/><text x="${f1(X(i))}" y="${R.app+13}" class="t-xs t-mid" style="fill:${c};font-weight:700">${a}</text><text x="${f1(X(i))}" y="${R.app+25}" class="t-xs t-mid">${b}</text></g>`};
    app(2,'clinic','+ scan','var(--rx)');app(4,'nurse','call','var(--brand)');
    /* symptoms */
    const sym=(i,lab,c)=>{if(vis(i)<=0)return;s+=`<g style="opacity:${f1(vis(i))}"><rect x="${f1(X(i)-cw/2+6)}" y="${R.sym}" width="${cw-12}" height="18" rx="9" style="fill:${c};opacity:.22"/><text x="${f1(X(i))}" y="${R.sym+12.5}" class="t-xs t-mid" style="fill:var(--ink)">${lab}</text></g>`};
    sym(0,'tired','var(--muted)');sym(3,'itch','var(--bile)');sym(3,'','var(--bile)');sym(4,'cramps','var(--liver)');sym(5,'tight','var(--warn)');
    if(vis(6)>0)s+=`<g style="opacity:${f1(vis(6))}"><rect x="${f1(X(6)-cw/2+3)}" y="${R.sym-2}" width="${cw-6}" height="${N?34:22}" rx="9" style="fill:var(--bad)"/><text x="${f1(X(6))}" y="${R.sym+(N?11:12.5)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${N?'black':'black stool'}</text>${N?`<text x="${f1(X(6))}" y="${R.sym+24}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">stool</text>`:''}</g>`;
    if(d>=3&&d<4.4)s+=`<text x="${f1(X(3))}" y="${R.sym+32}" class="t-xs t-mid">cramps at night</text>`;
    /* support */
    for(let i=0;i<7;i++){if(vis(i)<=0)continue;const hi=i===2||i===6;s+=person(X(i)-6,R.sup,N?14:16,hi?'var(--rx)':'var(--muted)',{op:(hi?1:.35)*vis(i)})+person(X(i)+6,R.sup,N?14:16,'var(--brand)',{op:(hi?1:.35)*vis(i)})}
    if(d>=2&&d<3.4)s+=`<text x="${f1(X(2))}" y="${R.sup+30}" class="t-xs t-mid">carer at clinic</text>`;
    /* red-flag panel */
    const P=N?{x:12,y:368,w:376}:{x:574,y:10,w:136};
    const am=amberOn(d),rd=redOn(d);
    let py=P.y;s+=`<text x="${P.x}" y="${py+10}" class="t-sm" style="fill:var(--bad);font-weight:700">URGENT CARE IF</text>`;py+=20;
    LV_FLAGS2.forEach((L,i)=>{const lit=rd&&i===1,bh=N?40:46,bw=N?(P.w-8)/2:P.w,bx=N?P.x+(i%2)*(bw+8):P.x,by=N?py+Math.floor(i/2)*(bh+8):py+i*(bh+6);
      s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:${lit?'var(--bad)':'var(--bad-soft)'};stroke:var(--bad);stroke-width:${lit?2.4:1}"/>`;
      L.forEach((ln,k)=>{s+=`<text x="${f1(bx+8)}" y="${f1(by+(L.length===1?bh/2+4:bh/2-3+k*13))}" class="t-xs" style="fill:${lit?'var(--panel)':'var(--ink)'};font-weight:${lit?700:500}">${ln}</text>`})});
    py+=N?2*(40+8):4*(46+6);
    s+=`<text x="${P.x}" y="${py+14}" class="t-xs" style="fill:${rd?'var(--bad)':'var(--muted)'};font-weight:700">${rd?(N?'→ call your emergency number or go to an emergency department':'→ emergency number'):'call emergency number'}</text>`;
    if(!N)s+=`<text x="${P.x}" y="${py+27}" class="t-xs" style="fill:${rd?'var(--bad)':'var(--muted)'};font-weight:700">${rd?'or emergency department':'or go to an ED'}</text>`;
    py+=N?28:40;
    s+=`<rect x="${P.x}" y="${py}" width="${P.w}" height="${N?40:58}" rx="8" style="fill:${am?'var(--warn-soft)':'var(--panel-2)'};stroke:var(--warn);stroke-width:${am?2.2:1}"/>`;
    const amL=N?['CALL YOUR TEAM IF','weight up >500 g/day for 3 days running']:['CALL YOUR TEAM IF','weight up >500 g/day','3 days running'];
    amL.forEach((ln,k)=>{s+=`<text x="${P.x+8}" y="${py+15+k*13}" class="t-xs" style="fill:${k?'var(--ink)':'var(--warn)'};font-weight:700">${ln}</text>`});
    svg.innerHTML=s;note.innerHTML=noteHTML(LV_STEPS[p]);setSt(p);
    svg.setAttribute('aria-label',`${LV_DAYS[di]}: weight ${LV_W[di].toFixed(1)} kg. ${redOn(d)?'Black, tarry stool: urgent care.':amberOn(d)?'Weight up more than 500 g a day for 3 days: call the team.':LV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#lvPlay'),draw,18000,'%t:player.replay%','living');
  setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- self-check log (this browser only) ---- */
  const lg=$('#lvLog'),al=$('#lvAlerts'),cnt=$('#lvCount'),exB=$('#lvEx'),fl=$$('[data-lvf]');
  const iso=dt=>dt.toISOString().slice(0,10);
  let log=store.get('lvlog',[]);if(!Array.isArray(log))log=[];let ex=false;
  const EX=(()=>{const o=[],t0=new Date();const W=[76.0,76.1,75.9,76.6,77.2,77.8,77.9],S=[3,2,3,2,1,2,3];for(let i=0;i<7;i++){const dt=new Date(t0);dt.setDate(t0.getDate()-6+i);o.push({d:iso(dt),w:W[i],s:S[i],f:i===6?[1]:[]})}return o})();
  $('#lvD').value=iso(new Date());
  const data=()=>(ex?EX:log).slice().sort((a,b)=>a.d<b.d?-1:1).slice(-14);
  function rises(D){/* longest run of consecutive-day rises above 0.5 kg in the last week of entries */
    let run=0,best=0;const R7=D.slice(-8);for(let i=1;i<R7.length;i++){const a=R7[i-1],b=R7[i],gap=(new Date(b.d)-new Date(a.d))/864e5;if(a.w!=null&&b.w!=null&&gap===1&&b.w-a.w>.5){run++;best=Math.max(best,run)}else run=0}return best}
  function alerts(){const D=data(),last=D[D.length-1],now=fl.filter(c=>c.checked).map(c=>+c.dataset.lvf),flags=new Set(now);
    if(last&&last.d===$('#lvD').value)(last.f||[]).forEach(k=>flags.add(k));if(ex&&last)(last.f||[]).forEach(k=>flags.add(k));
    let h='';if(flags.size)h+=`<p class="crisis" role="alert"><b>Urgent care</b><span>You marked: ${[...flags].map(k=>LV_FLAGS[k].toLowerCase()).join('; ')}. Vomiting blood, black or tarry stools, new confusion or drowsiness, or fever or belly pain with a swollen abdomen need urgent care: call your local emergency number or go to an emergency department.</span></p>`;
    const r=rises(D);if(r>=3)h+=`<p class="amber"><b>Call your team</b>In your recent entries the weight went up by more than 500 g a day for ${r} days in a row. LiverHope teaches people to call their team when this happens; follow the plan your own team gave you. [[Fabrellas2020LiverHope]]</p>`;
    al.innerHTML=h}
  function chart(){const N=vb(lg,'720 300','400 320'),D=data(),x0=N?40:56,x1=N?388:700,wT=26,wB=N?140:128,sT=N?182:170,sB=N?282:262;let s='';
    s+=`<text x="${x0}" y="14" class="t-sm">WEIGHT (kg)</text><text x="${x0}" y="${sT-10}" class="t-sm">BOWEL MOVEMENTS</text>`;
    if(!D.length){s+=`<rect x="${x0}" y="${wT}" width="${x1-x0}" height="${sB-wT}" rx="8" style="fill:var(--field)"/><text x="${(x0+x1)/2}" y="${(wT+sB)/2}" class="t-sm t-mid">No entries yet: save one above, or show the example week.</text>`;lg.innerHTML=s;cnt.textContent='';return}
    const ws=D.filter(e=>e.w!=null).map(e=>e.w),lo=Math.floor((Math.min(...ws,70)-.5)*2)/2,hi=Math.ceil((Math.max(...ws,70)+.5)*2)/2;
    const wmin=ws.length?Math.floor(Math.min(...ws)-1):70,wmax=ws.length?Math.ceil(Math.max(...ws)+1):80;
    const n=Math.max(D.length,2),X=i=>D.length===1?(x0+x1)/2:lerp(x0+16,x1-16,i/(n-1)),WY=v=>lerp(wB,wT,(v-wmin)/(wmax-wmin||1)),smax=Math.max(5,...D.map(e=>e.s||0)),SY=v=>lerp(sB,sT,v/smax);
    s+=`<rect x="${x0}" y="${wT}" width="${x1-x0}" height="${wB-wT}" style="fill:var(--field)"/><rect x="${x0}" y="${sT}" width="${x1-x0}" height="${sB-sT}" style="fill:var(--field)"/>`;
    [wmin,(wmin+wmax)/2,wmax].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(WY(v))}" y2="${f1(WY(v))}" class="grid"/><text x="${x0-5}" y="${f1(WY(v)+3)}" class="t-xs t-end">${f1(v)}</text>`});
    s+=`<rect x="${x0}" y="${f1(SY(3))}" width="${x1-x0}" height="${f1(SY(2)-SY(3))}" style="fill:var(--rx);opacity:.16"/><rect x="${x0}" y="${f1(SY(4))}" width="${x1-x0}" height="${f1(SY(3)-SY(4))}" style="fill:var(--brand);opacity:.13"/>`;
    s+=`<text x="${x1}" y="${sT-10}" class="t-xs t-end"><tspan style="fill:var(--rx)">■ 2–3 US label</tspan>  <tspan style="fill:var(--brand)">■ 3–4 LiverHope</tspan></text>`;
    for(let v=0;v<=smax;v+=smax>8?2:1)s+=`<text x="${x0-5}" y="${f1(SY(v)+3)}" class="t-xs t-end">${v}</text>`;
    let pth='';D.forEach((e,i)=>{if(e.w==null)return;pth+=(pth?'L':'M')+f1(X(i))+' '+f1(WY(e.w))});s+=`<path d="${pth}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    const bw=Math.min(22,(x1-x0)/n*.5);
    D.forEach((e,i)=>{const up=i>0&&e.w!=null&&D[i-1].w!=null&&e.w-D[i-1].w>.5&&(new Date(e.d)-new Date(D[i-1].d))/864e5===1,fl2=(e.f||[]).length;
      if(e.w!=null)s+=`<circle cx="${f1(X(i))}" cy="${f1(WY(e.w))}" r="4.5" style="fill:${up?'var(--warn)':'var(--panel)'};stroke:${up?'var(--warn)':'var(--ink)'};stroke-width:1.8"/>${N&&n>8?'':`<text x="${f1(X(i))}" y="${f1(WY(e.w)-9)}" class="t-xs t-mid">${e.w.toFixed(1)}</text>`}`;
      if(e.s!=null)s+=`<rect x="${f1(X(i)-bw/2)}" y="${f1(SY(e.s))}" width="${f1(bw)}" height="${f1(sB-SY(e.s))}" rx="3" style="fill:var(--rx);opacity:.85"/>`;
      if(fl2)s+=`<circle cx="${f1(X(i))}" cy="${wB+14}" r="6" style="fill:var(--bad)"/><text x="${f1(X(i))}" y="${wB+17.5}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">!</text>`;
      if(!N||n<=8||i%2===0)s+=`<text x="${f1(X(i))}" y="${sB+14}" class="t-xs t-mid">${e.d.slice(8,10)}/${e.d.slice(5,7)}</text>`});
    lg.innerHTML=s;cnt.textContent=ex?'Showing the example week (not your data).':`${log.length} saved ${log.length===1?'entry':'entries'} in this browser.`}
  function refresh(){chart();alerts()}
  $('#lvAdd').addEventListener('click',()=>{const d=$('#lvD').value,w=parseFloat($('#lvW').value),s=parseInt($('#lvS').value,10);if(!d)return;
    const e={d,w:isFinite(w)?Math.round(w*10)/10:null,s:isFinite(s)?s:null,f:fl.filter(c=>c.checked).map(c=>+c.dataset.lvf)};
    log=log.filter(q=>q.d!==d);log.push(e);log.sort((a,b)=>a.d<b.d?-1:1);if(log.length>120)log=log.slice(-120);store.set('lvlog',log);
    ex=false;exB.setAttribute('aria-pressed','false');refresh()});
  exB.addEventListener('click',()=>{ex=!ex;exB.setAttribute('aria-pressed',ex);refresh()});
  $('#lvClr').addEventListener('click',()=>{if(!log.length)return;if(!confirm('Delete every entry saved in this browser?'))return;log=[];store.set('lvlog',log);refresh()});
  fl.forEach(c=>c.addEventListener('change',alerts));$('#lvD').addEventListener('change',alerts);
  const rl=redraws.living;redraws.living=()=>{rl&&rl();chart()};
  refresh();
};
