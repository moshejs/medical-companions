/* =============== 3.7 Life after surgery =============== */
/* Main player: a logarithmic time axis from the day of surgery to 20 years. Each lane is a window when a problem is
   most often met; the lanes a moment falls in light up. Windows are schematic except where the notes cite a time. */
const AF_LN=Math.log(7301);
const afDay=t=>Math.exp(t*AF_LN)-1, afT=d=>Math.log(1+d)/AF_LN;
const AF_STEPS=[
 {from:0,at:.2,k:'Day 0 to 30',t:'The first month',
  txt:'In LABS (4776 first operations, 2005 to 2007), 30-day mortality after bypass or band was 0.3% and 4.3% had at least one major adverse outcome. [[Flum2009LABS]] Current perioperative mortality is reported at 0.03% to 0.2%. [[Arterburn2020JAMA,Eisenberg2022ASMBS]] A 2026 review gives leaks in about 1% after sleeve and 0.6% after bypass, early bleeding in 0.6 to 2.5% and 1 to 1.5%, and blood clots in veins in 0.3 to 2.4%; 70 to 80% of these clots are diagnosed after discharge. [[Kim2026Complications]] Signs of a leak can be vague: a fast heart rate that persists, fever, belly or shoulder pain and changes in breathing. [[Kim2026Complications]]',
  pt:'Most people recover from the operation without serious problems. A fast heartbeat, fever, belly or shoulder pain or trouble breathing in the first weeks needs urgent care.',
  hook:'In 210 bypass patients, breathing difficulty and a heart rate above 120 were the most sensitive signs of a leak; a routine contrast swallow caught only 2 of 9 leaks. [[Hamilton2003]]'},
 {from:.386,at:.48,k:'Weeks to months',t:'Eating again, and dumping',
  txt:'Eating restarts in stages that each surgical programme sets; the 2019 perioperative guideline calls a team approach "mandatory", with attention to nutrition. [[Mechanick2020SOARD]] Early dumping is reported in up to 40% and late dumping in up to 25%. [[Kim2026Complications]] An international consensus defines late dumping by a glucose nadir below 50 mg/dL, and early dumping by a rise in haematocrit above 3% or pulse above 10 beats a minute 30 minutes into a glucose test. Dietary adjustment is the first step; acarbose helps late dumping. [[Scarpellini2020]]',
  pt:'After surgery, food can move into the gut faster than before. This can cause symptoms soon after eating (early dumping) or a drop in blood sugar later (late dumping). Changing what and how you eat is the first step, with your team.',
  hook:'Late dumping diagnostic nadir: glucose below 50 mg/dL; first-line treatment is dietary. [[Scarpellini2020]]'},
 {from:.586,at:.62,k:'6 to 12 months',t:'Gallstones and ulcers',
  txt:'Gallstones form in about 10 to 50% after surgery, driven by rapid weight loss, typically in the first 6 to 12 months. [[Kim2026Complications]] In UPGRADE (985 randomised), ursodeoxycholic acid for 6 months did not significantly reduce symptomatic gallstone disease overall (6.5% versus 9.7%), but did in people without gallstones before bypass. [[Haal2021UPGRADE]] In 350 bypass patients, 6.6% developed a symptomatic marginal ulcer; smoking, corticosteroids and NSAIDs were risk factors. [[Coblijn2015]] Closing the mesenteric defects during bypass cut reoperation for small-bowel obstruction from 10.2% to 5.5% at 3 years. [[Stenberg2016Lancet]]',
  pt:'Gallstones are common in the first year, when weight falls fastest. Ulcers at the join are more likely with smoking and some painkillers, so check with your team before taking anti-inflammatory medicines.',
  hook:'Marginal ulcer after bypass: think smoking, NSAIDs, steroids. Internal hernia is reduced by closing mesenteric defects (HR 0.56). [[Coblijn2015,Stenberg2016Lancet]]'},
 {from:.664,at:.7,k:'Year 1 to 2',t:'New risks emerge',
  txt:'Post-bariatric hypoglycaemia typically presents more than 1 year after surgery, with symptoms such as confusion or seizures. [[Kim2026Complications]] In Sweden, hospitalisation for hypoglycaemia was 2.7 times as likely after gastric bypass, though only 0.2% were affected. [[Marsk2010]] In LABS-2, alcohol use disorder symptoms were 7.6% the year before surgery, 7.3% at 1 year and 9.6% in the second year; bypass doubled the odds compared with a band (AOR 2.07). [[King2012JAMA]] Median maximum weight loss after bypass, 37.4%, came at a median of 2 years. [[King2018JAMA]]',
  pt:'Alcohol can hit harder after a bypass, and the risk of drinking problems goes up from the second year. Tell your team if drinking worries you.',
  hook:'Alcohol use disorder symptoms rise in the second year after bypass (9.6%), about twice the odds after a band. [[King2012JAMA]]'},
 {from:.741,at:.84,k:'Years 2 to 10',t:'Lifelong follow-up',
  txt:'After the lowest weight, some weight usually returns: in 1406 LABS-2 bypass patients, median regain rose from 9.5% of the maximum lost 1 year after the nadir to 26.8% at 5 years. [[King2018JAMA]] This is biology, not a failure of effort, and further treatment can help. Cumulative new alcohol use disorder symptoms reached 20.8% after bypass versus 11.3% after band by 5 years. [[King2017SOARD]] Vitamin B12 deficiency affects 19 to 35% at 5 years after bypass and biliopancreatic diversion, and iron deficiency more than 30%. [[Lupoli2017]] At 10 years, endoscopic oesophagitis was found in 31% after sleeve versus 7% after bypass. [[Salminen2022SLEEVEPASS]]',
  pt:'You need vitamins and minerals for life, and regular blood tests. Some weight often comes back after the first two years; that is the body\'s biology, and there are treatments that can help.',
  hook:'Regain measured as a percentage of maximum weight lost best tracked the return of diabetes, high blood pressure and lower quality of life. [[King2018JAMA]]'},
 {from:.922,at:.97,k:'The long view',t:'Life expectancy',
  txt:'In SOS, with a median follow-up of 24 years, adjusted median life expectancy was 3.0 years longer after surgery than with usual care, but 5.5 years shorter than in the general population. Overall mortality hazard ratio was 0.77; 90-day postoperative mortality was 0.2%. [[Carlsson2020NEJM]] These are group statistics from a study in which most people had operations now rarely used. [[Sjostrom2013JIM]]',
  pt:'On average, people who had surgery in this study lived about 3 years longer than similar people who did not. That is an average for a group, not a promise for any one person.',
  hook:'SOS life expectancy: +3.0 years versus usual care, but −5.5 years versus the general population. [[Carlsson2020NEJM]]'}
];
const AF_LANES=[
 ['Leak, bleeding, blood clots',0,30,'var(--risk)'],
 ['Eating restarts in stages',0,60,'var(--tx)'],
 ['Dumping',14,7300,'var(--gip)'],
 ['Gallstones',14,365,'var(--leptin)'],
 ['Ulcer, stricture, hernia (bypass)',30,7300,'var(--hl)'],
 ['Reflux (sleeve)',182,7300,'var(--accent)'],
 ['Late low blood sugar (bypass)',365,7300,'var(--insulin)'],
 ['Vitamin and mineral gaps',30,7300,'var(--brand)'],
 ['Alcohol problems (bypass)',365,7300,'var(--pyy)'],
 ['Weight recurrence',730,7300,'var(--figure-line)']
];
const AF_TICKS=[[0,'0'],[7,'1 wk',1],[30,'1 mo'],[182,'6 mo'],[365,'1 y'],[730,'2 y',1],[1825,'5 y'],[3650,'10 y',1],[7300,'20 y']];
const AF_TILES=[
 [{v:'0.3%',l:['30-day mortality,','LABS 2005-07']},{v:'0.03-0.2%',l:['perioperative','mortality now']},{v:'70-80%',l:['of clots found','after discharge']}],
 [{v:'up to 40%',l:['early dumping','(reported)']},{v:'up to 25%',l:['late dumping','(reported)']},{v:'<50 mg/dL',l:['glucose nadir that','defines late dumping']}],
 [{v:'10-50%',l:['form gallstones,','first 6-12 months']},{v:'6.6%',l:['marginal ulcer','after bypass']},{v:'5.5%',l:['bowel obstruction','with defects closed']}],
 [{v:'9.6%',l:['alcohol use disorder','symptoms, year 2']},{v:'x2.07',l:['odds, bypass','versus band']},{v:'0.2%',l:['hospitalised for low','sugar after bypass']}],
 [{v:'26.8%',l:['median regain of max','lost, 5 y after nadir']},{v:'20.8%',l:['new alcohol symptoms','by 5 y (bypass)']},{v:'19-35%',l:['low vitamin B12','at 5 y (bypass)']}],
 null
];

/* micronutrient explorer: published figures by nutrient; p = operations a row is about */
const AF_NU={
 iron:{lab:'Iron',rows:[
   {l:'Anaemia within 2 years, all operations',lo:33,hi:49,p:'all'},
   {l:'Anaemia after sleeve (about)',lo:17,hi:17,p:'sleeve'},
   {l:'Anaemia after bypass or biliopancreatic diversion',lo:45,hi:50,p:'bypass switch'},
   {l:'Low ferritin at 5 years (more than)',lo:30,hi:30,p:'all'},
   {l:'Low ferritin 5 y after bypass: adolescents',lo:48,hi:48,p:'bypass'},
   {l:'Low ferritin 5 y after bypass: adults',lo:29,hi:29,p:'bypass'}],
  note:{k:'Iron',t:'Anaemia is common',
   txt:'Anaemia affects 33 to 49% within 2 years of surgery: about 17% after sleeve and 45 to 50% after bypass or biliopancreatic diversion; low ferritin occurs in more than 30% at 5 years. When iron deficiency is established, oral iron may not be enough and intravenous iron may be needed. [[Lupoli2017]] Five years after bypass, low ferritin was found in 48% of adolescents versus 29% of adults. [[Inge2019NEJM]] Calcium interferes with the absorption of iron, zinc and copper, so iron and calcium supplements are taken apart. [[Lupoli2017,Kim2026Complications]]',
   pt:'Low iron is one of the most common problems after surgery. Blood tests pick it up; your team decides the treatment.',
   hook:'Iron and calcium supplements are separated in time, because calcium blocks iron absorption. [[Lupoli2017]]'}},
 b12:{lab:'Vitamin B12',rows:[{l:'Deficiency at 5 years after bypass or BPD',lo:19,hi:35,p:'bypass switch'}],
  note:{k:'Vitamin B12',t:'Less acid, less intrinsic factor',
   txt:'Vitamin B12 deficiency affects 19 to 35% at 5 years after biliopancreatic diversion and bypass, because the duodenum is bypassed and gastric acid and intrinsic factor fall. [[Lupoli2017]] A 2026 review cites ASMBS guidance for a bariatric multivitamin with at least 350 to 1000 μg of vitamin B12 (quoted, not an instruction). [[Kim2026Complications]]',
   pt:'After a bypass the body absorbs less vitamin B12 from food, so supplements and regular checks are part of lifelong care.',
   hook:'B12 deficiency after bypass: duodenum bypassed, less gastric acid and intrinsic factor. [[Lupoli2017]]'}},
 vitd:{lab:'Vitamin D',rows:[{l:'Vitamin D below 20 ng/mL, operated patients (about)',lo:60,hi:60,p:'all'}],
  note:{k:'Vitamin D',t:'Low in most',
   txt:'Vitamin D deficiency (below 20 ng/mL) is seen in about 60% of operated patients across studies. [[Lupoli2017]] A 2026 review cites ASMBS guidance of at least 3000 IU a day of vitamin D, titrated to a 25-OH vitamin D level above 30 ng/mL (quoted, not an instruction). [[Kim2026Complications]] In Quebec, fracture risk after surgery was higher than in matched controls with obesity (RR 1.38); the increase was significant only after biliopancreatic diversion. [[Rousseau2016BMJ]]',
   pt:'Many people are low in vitamin D, which matters for bones. It is checked and topped up as your team advises.',
   hook:'After surgery the fracture pattern shifted from lower-limb fractures to upper limb, spine, pelvis, hip and femur. [[Rousseau2016BMJ]]'}},
 ca:{lab:'Calcium',rows:[],empty:'Our sources give no deficiency rate for calcium; its role is bone health and the supplement statements beside.',
  note:{k:'Calcium',t:'Bones, and timing',
   txt:'A 2026 review cites ASMBS guidance of 1200 to 1500 mg a day of elemental calcium, preferably citrate, in divided doses (quoted, not an instruction). [[Kim2026Complications]] Calcium interferes with absorption of iron, zinc and copper, so they are taken apart. [[Lupoli2017,Kim2026Complications]] Fracture risk rose after surgery in a Quebec study of 12,676 people (RR 1.38 versus controls with obesity). [[Rousseau2016BMJ]] ARMMS-T2D also found more fractures after surgery than with medical care. [[Courcoulas2024ARMMS]]',
   pt:'Calcium protects bones. It is usually taken at a different time from iron.',
   hook:'Calcium citrate in divided doses, separate from iron (as cited from ASMBS guidance). [[Kim2026Complications]]'}},
 b1:{lab:'Thiamine (B1)',rows:[{l:'Thiamine deficiency after surgery (up to)',lo:0,hi:49,p:'all',upto:1}],
  note:{k:'Thiamine (vitamin B1)',t:'Vomiting is the warning',
   txt:'Thiamine deficiency can occur in up to 49% after surgery and, untreated, can lead to Wernicke-Korsakoff syndrome; persistent vomiting is a trigger. [[Lupoli2017]] The ASMBS micronutrient guideline covers screening, prevention and repletion of B1 among other nutrients. [[Parrott2017ASMBS]]',
   pt:'Vomiting that keeps happening can drain vitamin B1 quickly, which can harm the brain and nerves. Tell your team promptly.',
   hook:'Thiamine deficiency with vomiting after surgery risks Wernicke-Korsakoff syndrome. [[Lupoli2017]]'}},
 fol:{lab:'Folate',rows:[],empty:'Our sources give no deficiency rate for folate after surgery; the published supplement statements are beside.',
  note:{k:'Folate',t:'Especially before pregnancy',
   txt:'A 2026 review cites ASMBS guidance for a bariatric multivitamin with 400 to 800 μg of folic acid (quoted, not an instruction). [[Kim2026Complications]] A 2019 pregnancy consensus lists folic acid 5 mg in its minimum preconception supplement, and advises checking folate every trimester. [[Shawe2019ObesRev]] More in <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; fertility</a>.',
   pt:'Folate matters most if you might become pregnant. Talk to your team about timing and the special vitamins you will need.',
   hook:'Pregnancy after surgery: folate, B12, iron and vitamin A checked every trimester (2019 consensus). [[Shawe2019ObesRev]]'}},
 vita:{lab:'Vitamin A',rows:[{l:'Deficiency 2 to 4 years after BPD',lo:61,hi:69,p:'switch'}],
  note:{k:'Vitamin A',t:'Most affected by diversion',
   txt:'Vitamin A deficiency was found in 61 to 69% at 2 to 4 years after biliopancreatic diversion. [[Lupoli2017]] In pregnancy after surgery, the 2019 consensus lists vitamin A as beta-carotene, because the retinol form is teratogenic. [[Shawe2019ObesRev]]',
   pt:'Fat-soluble vitamins such as A are hardest to absorb after the operations that bypass the most bowel.',
   hook:'Avoid retinol-form vitamin A in pregnancy after surgery; the consensus uses beta-carotene. [[Shawe2019ObesRev]]'}}
};
const AF_PROC={sleeve:'Sleeve',bypass:'Bypass',switch:'Diversion / duodenal switch'};

inits.aftersurgery=()=>{
  /* ---------- the timeline ---------- */
  const svg=$('#afSvg'),rg=$('#afT'),note=$('#afNote');
  function tiles(x,y,w,h,items,u){let s='';const n=items.length,tw=(w-(n-1)*8)/n;
    items.forEach((it,i)=>{const tx=x+i*(tw+8),op=clamp(.4+u*4-i*.4);
      s+=`<g style="opacity:${f1(op)}"><rect x="${f1(tx)}" y="${f1(y)}" width="${f1(tw)}" height="${f1(h)}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${f1(tx+9)}" y="${f1(y+26)}" class="t-big" style="font-size:19px;fill:var(--tx)">${it.v.replace('<','&lt;')}</text>`;
      it.l.forEach((ln,j)=>{s+=`<text x="${f1(tx+9)}" y="${f1(y+44+j*12)}" class="t-xs" style="fill:var(--ink)">${ln}</text>`});s+='</g>'});
    return s}
  function lifeExp(x,y,w,h,u,N){let s='';const X=v=>x+24+(w-48)*v/9,yy=y+(N?92:54),g=ease(clamp(u*1.6));
    s+=`<text x="${f1(x+12)}" y="${f1(y+20)}" class="t-xs" style="fill:var(--ink);font-weight:700">${N?'median life expectancy vs usual care':'median life expectancy, years more than usual care (SOS, median follow-up 24 years)'}</text>`;
    if(N)s+=`<text x="${f1(x+12)}" y="${f1(y+34)}" class="t-xs" style="fill:var(--ink);font-weight:700">(SOS, median follow-up 24 years)</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(9))}" y1="${f1(yy)}" y2="${f1(yy)}" class="axis"/>`;
    [0,3,6,9].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yy-3)}" y2="${f1(yy+3)}" class="axis"/><text x="${f1(X(v))}" y="${f1(yy+16)}" class="t-xs t-mid">${v?'+'+v+' y':'0'}</text>`});
    s+=`<rect x="${f1(X(0))}" y="${f1(yy-4)}" width="${f1((X(3)-X(0))*g)}" height="8" rx="4" style="fill:var(--tx)"/>`;
    s+=`<rect x="${f1(X(3))}" y="${f1(yy-4)}" width="${f1((X(8.5)-X(3))*clamp(g*2-1))}" height="8" rx="4" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/>`;
    const mk=(v,t1,a,col,op,dy)=>`<g style="opacity:${f1(op)}"><circle cx="${f1(X(v))}" cy="${f1(yy)}" r="6" style="fill:${col};stroke:var(--panel);stroke-width:2"/><text x="${f1(X(v)+(a==='t-end'?6:a===''?-6:0))}" y="${f1(yy-12-dy)}" class="t-xs ${a}" style="fill:var(--ink);font-weight:700">${t1}</text></g>`;
    s+=mk(0,'usual care','',`var(--muted)`,1,0)+mk(3,'surgery: +3.0 y','t-mid',`var(--tx)`,clamp(g*2),N?14:0)+mk(8.5,'general population: 5.5 y more','t-end',`var(--ink)`,clamp(g*2-1),0);
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 600');
    const p=phaseOf(AF_STEPS,t),P=AF_STEPS[p],nx=AF_STEPS[p+1],u=clamp((t-P.from)/((nx?nx.from:1)-P.from)),d=afDay(t);
    const L=N?{ax:22,aw:356,ay:62,ly:80,lh:33,lx:22,sx:14,sy:420,sw:372,sh:170}:{ax:226,aw:476,ay:56,ly:70,lh:22,lx:20,sx:20,sy:302,sw:682,sh:90};
    const X=dd=>L.ax+L.aw*afT(dd);
    const dTxt=d<1?'Day of surgery':d<60?`Day ${Math.round(d)}`:d<730?`Month ${Math.round(d/30.44)}`:`Year ${(d/365.25).toFixed(1)}`;
    let s=`<text x="${N?22:20}" y="${N?30:30}" class="t-big" style="font-size:22px">${dTxt}</text><text x="${N?378:702}" y="30" class="t-sm t-end" style="fill:var(--ink)">${P.k}</text>`;
    /* axis */
    s+=`<line x1="${L.ax}" x2="${L.ax+L.aw}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    AF_TICKS.forEach(k=>{if(N&&k[2])return;const x=X(k[0]);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ay-4}" y2="${L.ay}" class="axis"/><text x="${f1(x)}" y="${L.ay-8}" class="t-xs ${k[0]===0?'':'t-mid'}">${k[1]}</text>`;
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ly-4}" y2="${L.ly+AF_LANES.length*L.lh}" class="grid"/>`});
    /* lanes */
    AF_LANES.forEach((ln,i)=>{const y=L.ly+i*L.lh,a=X(ln[1]),b=X(ln[2]),on=d>=ln[1]&&d<=ln[2],past=d>ln[2];
      const by=N?y+14:y+5,bh=N?10:12,ly=N?y+10:y+15;
      s+=`<text x="${N?L.lx:L.ax-10}" y="${ly}" class="t-xs ${N?'':'t-end'}" style="fill:var(--ink);font-weight:${on?700:500};opacity:${on?1:.62}">${ln[0]}</text>`;
      s+=`<rect x="${f1(a)}" y="${by}" width="${f1(Math.max(4,b-a))}" height="${bh}" rx="${bh/2}" style="fill:${ln[3]};opacity:${on?.28:.13}"/>`;
      if(d>=ln[1]){const e=Math.min(X(d),b);s+=`<rect x="${f1(a)}" y="${by}" width="${f1(Math.max(4,e-a))}" height="${bh}" rx="${bh/2}" style="fill:${ln[3]};opacity:${past?.45:.9}"/>`}
      if(on)s+=`<circle cx="${f1(X(d))}" cy="${by+bh/2}" r="${bh/2+2.5}" style="fill:${ln[3]};stroke:var(--panel);stroke-width:2"/>`});
    /* now line */
    const nxp=X(d);s+=`<line x1="${f1(nxp)}" x2="${f1(nxp)}" y1="${L.ay}" y2="${L.ly+AF_LANES.length*L.lh}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3"/><path d="M${f1(nxp-5)} ${L.ay-1}L${f1(nxp+5)} ${L.ay-1}L${f1(nxp)} ${L.ay+6}Z" style="fill:var(--ink)"/>`;
    /* bottom box */
    s+=`<rect x="${L.sx}" y="${L.sy}" width="${L.sw}" height="${L.sh}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    if(AF_TILES[p]){const T=AF_TILES[p];
      if(N){T.forEach((it,i)=>{const ty=L.sy+10+i*52,op=clamp(.4+u*4-i*.4);s+=`<g style="opacity:${f1(op)}"><rect x="${L.sx+10}" y="${ty}" width="${L.sw-20}" height="46" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${L.sx+20}" y="${ty+30}" class="t-big" style="font-size:19px;fill:var(--tx)">${it.v.replace('<','&lt;')}</text>`+it.l.map((ln,j)=>`<text x="${L.sx+140}" y="${ty+20+j*13}" class="t-xs" style="fill:var(--ink)">${ln}</text>`).join('')+'</g>'})}
      else s+=tiles(L.sx+10,L.sy+10,L.sw-20,L.sh-20,T,u)}
    else s+=lifeExp(L.sx,L.sy,L.sw,L.sh,u,N);
    svg.innerHTML=s;
    setSt(p);note.innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#afPlay'),draw,26000,'%t:player.replay%','aftersurgery');
  const setSt=stepWire($('#afSteps'),AF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- micronutrient explorer ---------- */
  const nv=$('#afNu'),nb=$('#afNuBtns'),ps=$('#afProc'),nn=$('#afNuNote');let nu='iron',g=1,stopG=null;
  nb.innerHTML=Object.keys(AF_NU).map(k=>`<button class="btn" data-nu="${k}" aria-pressed="${k===nu}">${AF_NU[k].lab}</button>`).join('');
  function drawNu(){
    const N=vb(nv,'720 330','400 570'),D=AF_NU[nu],pr=ps.value;
    const L=N?{gx:120,gy:30,gs:.8,rx:16,ry:270,rw:300,rh:46}:{gx:16,gy:28,gs:1,rx:252,ry:44,rw:400,rh:46};
    const gt=gutTract(L.gx,L.gy,L.gs,{variant:pr,morph:1,labels:!N});
    let s=gt.svg+`<text x="${f1(N?200:L.gx+100*L.gs)}" y="${f1(N?16:L.gy+278*L.gs)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${AF_PROC[pr]}</text>`;
    s+=`<text x="${L.rx}" y="${L.ry-18}" class="t-xs" style="fill:var(--ink);font-weight:700">${D.lab}: published figures (% of people)</text>`;
    if(!D.rows.length){s+=`<rect x="${L.rx}" y="${L.ry-4}" width="${N?368:440}" height="70" rx="10" style="fill:var(--panel-2);stroke:var(--line);stroke-dasharray:4 3"/>`;
      const words=D.empty.split(' ');let line='',ls=[];words.forEach(w=>{if((line+' '+w).length>(N?56:68)){ls.push(line);line=w}else line=(line?line+' ':'')+w});ls.push(line);
      ls.forEach((l,i)=>{s+=`<text x="${L.rx+12}" y="${L.ry+20+i*14}" class="t-xs" style="fill:var(--ink)">${l}</text>`})}
    D.rows.forEach((r,i)=>{const y=L.ry+i*L.rh,rel=r.p==='all'||r.p.split(' ').indexOf(pr)>=0,op=rel?1:.32,X=v=>L.rx+L.rw*v/100;
      s+=`<g style="opacity:${op}"><text x="${L.rx}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${r.l}${rel?'':' (other operation)'}</text>`;
      s+=`<rect x="${L.rx}" y="${y+14}" width="${L.rw}" height="14" rx="7" style="fill:var(--field);stroke:var(--line)"/>`;
      const lo=r.upto?0:r.lo;
      if(lo>0)s+=`<rect x="${L.rx}" y="${y+14}" width="${f1((X(lo)-L.rx)*g)}" height="14" rx="7" style="fill:var(--brand)"/>`;
      if(r.hi>r.lo||r.upto)s+=`<rect x="${f1(X(lo))}" y="${y+14}" width="${f1((X(r.hi)-X(lo))*g)}" height="14" rx="4" style="fill:var(--brand);opacity:.4"/>`;
      s+=`<text x="${f1(X(r.hi)+8)}" y="${y+26}" class="t-lbl" style="font-size:12.5px">${r.upto?'up to '+r.hi:r.hi>r.lo?r.lo+'-'+r.hi:r.lo}%</text></g>`});
    if(D.rows.length)s+=`<text x="${L.rx}" y="${f1(L.ry+D.rows.length*L.rh+8)}" class="t-xs">solid: published value; pale: published range</text>`;
    nv.innerHTML=s}
  function setNu(){nn.innerHTML=noteHTML(AF_NU[nu].note);if(stopG)stopG();g=0;drawNu();stopG=animate(600,q=>{g=ease(q);drawNu()},()=>{stopG=null})}
  nb.addEventListener('click',e=>{const b=e.target.closest('[data-nu]');if(!b)return;nu=b.dataset.nu;$$('[data-nu]',nb).forEach(x=>x.setAttribute('aria-pressed',x===b));setNu()});
  ps.addEventListener('change',()=>{drawNu()});
  nn.innerHTML=noteHTML(AF_NU[nu].note);drawNu();
  const prevR=redraws.aftersurgery;redraws.aftersurgery=()=>{prevR&&prevR();drawNu()};
};
