/* =============== 5.2 Living after a heart attack =============== */
const LV_STEPS=[
 {from:0,at:.01,k:'Day 0',t:'Going home',
  txt:`Leaving hospital is a big step. Before going, it helps to know each medicine, the follow-up plan and whether a rehab referral has been made. Filling every discharge prescription matters: in older adults in Ontario, filling none of them, compared with all, went with higher 1-year mortality (OR 1.80), and medication counselling at discharge was linked to filling them. [[Jackevicius2008]]`,
  pt:`Take home a list of your medicines, who to call, and when your next appointment is.`,
  hook:`Primary non-adherence: filling none vs all discharge medicines, OR 1.80 for 1-year death (Ontario, ≥65 years).`},
 {from:.06,at:.117,k:'Days 1–30',t:'The first weeks',
  txt:`In US Medicare, 19.9% of heart attack hospital stays were followed by a readmission within 30 days. 67.6% of these happened within 15 days, the median was day 10, and only 10.0% were for another heart attack. [[Dharmarajan2013]] Discharge programmes with several parts that support self-care cut 30-day readmissions (RR 0.82). [[Leppin2014]]`,
  pt:`The first two weeks at home are when problems most often bring people back to hospital, and most of those are not another heart attack.`,
  hook:`30-day readmission after AMI 19.9%; two-thirds within 15 days; median day 10.`},
 {from:.15,at:.165,k:'Week 2',t:'Travel and driving',
  txt:`In a small randomised trial, 38 people flew on commercial flights 2 weeks after a heart attack with 1 major end point, a brief symptom-free ischaemic episode; oxygen made no difference. [[Roby2002]] Driving has no fixed date in this calendar: it depends on where you live, your licence and your treatment. UK audits found driving advice was often missing from discharge summaries. [[Bharaj2021,Dyson2025]] Check your local licensing rules and ask your team. <span class="ev early">Early evidence</span> for flying at 2 weeks.`,
  pt:`Ask your team before driving or flying. Driving rules differ from country to country.`,
  hook:`Roby 2002: 38 patients flew 2 weeks after MI; no oxygen or medical escort needed (small RCT).`},
 {from:.22,at:.25,k:'Weeks 3–12',t:'Getting active: rehab and intimacy',
  txt:`Only 24.3% of Medicare rehab attenders started within 21 days of their event. [[Ritchey2020]] Sexual activity briefly raises the relative risk of MI (RR 2.70), but the absolute increase is 2–3 per 10,000 person-years, and regular exercise shrinks it. [[Dahabreh2011]] An AHA and ESC nursing consensus recommends routine sexual counselling for patients and partners. [[Steinke2013]] The nitroglycerin label says not to use it with PDE-5 inhibitors such as sildenafil or tadalafil. [[FDA-Nitrostat]]`,
  pt:`Sex causes only a very small extra heart risk, and regular exercise makes it smaller. It is okay to ask your team when it is right for you.`,
  hook:`Sex as a trigger: RR 2.70 but only 2–3 extra MIs per 10,000 person-years per weekly hour.`},
 {from:.36,at:.44,k:'Months 1–3',t:'Mood in the first months',
  txt:`DSM-diagnosed depression was found in 19.46% when assessed within 3 months of MI and 14.87% after 3 months; anxiety in 11.96% and PTSD in 10.26%. [[Chong2025]] Post-MI depression went with higher all-cause mortality (OR 2.25). [[Meijer2011]] Psychological treatment improves depression (SMD −0.27) and anxiety. [[Richards2017]]`,
  pt:`About 1 in 5 people feel depressed after a heart attack. It is a health problem, not weakness, and it can be treated.`,
  hook:`About 1 in 5 have major depression after MI (19.8%); about 1 in 8 have PTSD symptoms after ACS (12%).`},
 {from:.62,at:1,k:'Months 3–12',t:'Back to work, one year on',
  txt:`In Denmark, 91.1% of working-age people were back at work within a year of a first MI, though 24.2% of them had left work a year after returning; depression (OR 1.77) predicted it. [[Smedegaard2017]] In VIRGO, 85% of young women and 89% of young men were back at 12 months. [[Dreyer2016RTW]] In couples, depression and anxiety did not fade on their own over 2 years. [[Thomas2011HAT]]`,
  pt:`Most people who worked before go back, about 8 in 10 across studies. Some need extra support to stay there.`,
  hook:`Return to work after a coronary event: 81.1% pooled (43 studies). Depression predicts leaving work later.`}
];
const LV_CHECK=[
 ['Medicines',[['m1','I know the name and purpose of each heart medicine I take.'],['m2','I have filled all my discharge prescriptions.'],['m3','I know not to stop my antiplatelet medicine on my own, even for bruising, without talking to my heart team first.'],['m4','If I have been given nitroglycerin (GTN), I have read its leaflet, including what it says to do if the pain does not go away.'],['m5','I know GTN must not be taken with erection medicines such as sildenafil or tadalafil.']],'[[Jackevicius2008,FDA-Brilinta,Mehran2013,FDA-Nitrostat]]'],
 ['Rehab and activity',[['r1','I have been referred to cardiac rehab, or I have asked my team about it.'],['r2','I know whether a home-based or online programme is available.'],['r3','I have a plan for building my activity back up.']],'[[Ritchey2020,McDonagh2023,Balady2007]]'],
 ['Follow-up',[['f1','My first follow-up appointment is booked.'],['f2','I know who to contact with questions after I leave hospital.'],['f3','I have asked when I can drive, and checked my local licensing rules.'],['f4','I have asked about sex, travel and going back to work.']],'[[Dharmarajan2013,Leppin2014,Bharaj2021,Steinke2013]]'],
 ['Warning signs',[['w1','I know the emergency number where I live (911 in the US, 999 in the UK, 112 in the EU).'],['w2','The people I live with know what a heart attack can feel like and to call at once.']],''],
 ['Mood, family and habits',[['e1','I have been asked about my mood, or I have raised it myself.'],['e2','My partner or carer knows where they can find support too.'],['e3','If I smoke, I have been offered help to stop.']],'[[Lichtman2008,Thomas2011HAT,Critchley2003]]']
];
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');
  const dayOf=t=>t<=.35?t/.35*30:30+(t-.35)/.65*335,uOf=(d,sp=.35)=>d<=30?sp*d/30:sp+(1-sp)*(d-30)/335;
  const dep=d=>d<=90?19.46:14.87;
  const G={
   house:(x,y,s,c)=>`<path d="M${f1(x-10*s)} ${f1(y)}L${f1(x)} ${f1(y-10*s)}L${f1(x+10*s)} ${f1(y)}M${f1(x-7*s)} ${f1(y-2*s)}V${f1(y+9*s)}H${f1(x+7*s)}V${f1(y-2*s)}" style="fill:none;stroke:${c};stroke-width:2;stroke-linejoin:round"/><rect x="${f1(x-2*s)}" y="${f1(y+3*s)}" width="${f1(4*s)}" height="${f1(6*s)}" style="fill:${c}"/>`,
   plane:(x,y,s,c)=>`<path d="M${f1(x-11*s)} ${f1(y+1*s)}L${f1(x+10*s)} ${f1(y-2*s)}Q${f1(x+13*s)} ${f1(y-1*s)} ${f1(x+10*s)} ${f1(y+1*s)}L${f1(x-11*s)} ${f1(y+3*s)}ZM${f1(x-1*s)} ${f1(y)}L${f1(x-6*s)} ${f1(y-9*s)}L${f1(x-3*s)} ${f1(y-9*s)}L${f1(x+4*s)} ${f1(y-1*s)}ZM${f1(x-1*s)} ${f1(y+2*s)}L${f1(x-5*s)} ${f1(y+9*s)}L${f1(x-2*s)} ${f1(y+9*s)}L${f1(x+3*s)} ${f1(y+2*s)}ZM${f1(x-10*s)} ${f1(y+1*s)}L${f1(x-12*s)} ${f1(y-5*s)}L${f1(x-9*s)} ${f1(y-5*s)}L${f1(x-7*s)} ${f1(y)}Z" style="fill:${c}"/>`,
   bell:(x,y,s,c)=>`<path d="M${f1(x-7*s)} ${f1(y)}H${f1(x+7*s)}" style="stroke:${c};stroke-width:2.4"/><rect x="${f1(x-12*s)}" y="${f1(y-6*s)}" width="${f1(5*s)}" height="${f1(12*s)}" rx="1.5" style="fill:${c}"/><rect x="${f1(x+7*s)}" y="${f1(y-6*s)}" width="${f1(5*s)}" height="${f1(12*s)}" rx="1.5" style="fill:${c}"/>`,
   brief:(x,y,s,c)=>`<rect x="${f1(x-10*s)}" y="${f1(y-5*s)}" width="${f1(20*s)}" height="${f1(14*s)}" rx="2" style="fill:none;stroke:${c};stroke-width:2"/><path d="M${f1(x-4*s)} ${f1(y-5*s)}V${f1(y-9*s)}H${f1(x+4*s)}V${f1(y-5*s)}M${f1(x-10*s)} ${f1(y+1*s)}H${f1(x+10*s)}" style="fill:none;stroke:${c};stroke-width:2"/>`,
   car:(x,y,s,c)=>`<path d="M${f1(x-12*s)} ${f1(y+4*s)}V${f1(y-1*s)}L${f1(x-7*s)} ${f1(y-7*s)}H${f1(x+6*s)}L${f1(x+11*s)} ${f1(y-1*s)}H${f1(x+12*s)}V${f1(y+4*s)}Z" style="fill:none;stroke:${c};stroke-width:2;stroke-linejoin:round"/><circle cx="${f1(x-6*s)}" cy="${f1(y+5*s)}" r="${f1(3*s)}" style="fill:${c}"/><circle cx="${f1(x+6*s)}" cy="${f1(y+5*s)}" r="${f1(3*s)}" style="fill:${c}"/>`,
   heart:(x,y,s,c)=>`<path d="M${f1(x)} ${f1(y+8*s)}C${f1(x-12*s)} ${f1(y)} ${f1(x-10*s)} ${f1(y-9*s)} ${f1(x)} ${f1(y-3*s)}C${f1(x+10*s)} ${f1(y-9*s)} ${f1(x+12*s)} ${f1(y)} ${f1(x)} ${f1(y+8*s)}Z" style="fill:none;stroke:${c};stroke-width:2;stroke-linejoin:round"/>`,
   flag:(x,y,s,c)=>`<path d="M${f1(x-5*s)} ${f1(y+9*s)}V${f1(y-9*s)}L${f1(x+8*s)} ${f1(y-5*s)}L${f1(x-5*s)} ${f1(y-1*s)}" style="fill:none;stroke:${c};stroke-width:2;stroke-linejoin:round"/>`
  };
  /* milestones with a date taken from a study: [day, glyph, wide label, narrow label, row, step] */
  const MS=[[0,'house','home','home',0,0],[10,'flag','day 10: median readmission','day 10',1,1],[14,'plane','flown at 2 weeks (trial)','fly',2,2],[21,'bell','rehab: few start by day 21','rehab',0,3],[90,'flag','3 months','3 mo',0,4],[365,'brief','work at 1 year','work',0,5]];
  function draw(t){
    const N=vb(svg,'720 450','400 620'),d=dayOf(t),p=phaseOf(LV_STEPS,t);
    const L=N?{x0:26,x1:378,hy:28,ty:44,th:36,ay:118,iy:144,lr:[170,186,202],py:236,ph:130,ix:32,iy2:412,icol:20,isz:12,ig:4,tx:26,txy:520,s:.75}
             :{x0:60,x1:690,hy:30,ty:10,th:40,ay:86,iy:110,lr:[140,155,170],py:200,ph:126,ix:60,iy2:370,icol:25,isz:10,ig:3,tx:440,txy:378,s:1};
    const X=dd=>L.x0+(L.x1-L.x0)*uOf(dd,N?.5:.35),px=X(d);
    let s='';
    /* header and the no-fixed-date tray */
    const dl=d<1?'Day 0: going home':d<30?`Day ${Math.round(d)}`:d<364?`Month ${Math.max(1,Math.floor(d/30.4))}`:'One year';
    s+=`<text x="${N?14:16}" y="${L.hy}" style="font:800 ${N?20:22}px var(--display);fill:var(--rec)">${dl}</text>`;
    const tx0=N?14:400,tw=N?372:306,ty=L.ty;
    s+=`<rect x="${tx0}" y="${ty}" width="${tw}" height="${L.th}" rx="8" style="fill:var(--field);stroke:var(--line);stroke-dasharray:4 3"/>`;
    s+=`<text x="${tx0+10}" y="${ty+15}" class="t-xs" style="fill:var(--ink);font-weight:600">NO FIXED DATE: ASK</text><text x="${tx0+10}" y="${ty+29}" class="t-xs">your team</text>`;
    const drv=p===2,sx=p===3;
    s+=G.car(tx0+tw-(N?134:140),ty+L.th/2,N?.9:1,drv?'var(--brand)':'var(--muted)')+`<text x="${tx0+tw-(N?118:124)}" y="${ty+L.th/2+4}" class="t-xs" style="fill:${drv?'var(--brand)':'var(--muted)'};font-weight:${drv?700:500}">driving</text>`;
    s+=G.heart(tx0+tw-(N?44:50),ty+L.th/2,N?.9:1,sx?'var(--brand)':'var(--muted)')+`<text x="${tx0+tw-(N?30:36)}" y="${ty+L.th/2+4}" class="t-xs" style="fill:${sx?'var(--brand)':'var(--muted)'};font-weight:${sx?700:500}">sex</text>`;
    /* the calendar */
    const fx=X(30);s+=`<rect x="${L.x0}" y="${L.ay-24}" width="${f1(fx-L.x0)}" height="${L.lr[2]-L.ay+34}" rx="6" style="fill:var(--rec-soft);opacity:.45"/>`;
    s+=`<text x="${f1((L.x0+fx)/2)}" y="${L.ay-12}" class="t-xs t-mid" style="fill:var(--rec)">${N?'1st month':'first month (stretched)'}</text>`;
    /* readmission window */
    s+=`<rect x="${L.x0}" y="${L.ay-6}" width="${f1(fx-L.x0)}" height="5" rx="2" style="fill:var(--warn);opacity:${p===1?.9:.35}"/>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    [[0,''],[7,'1 wk'],[14,'2 wk'],[30,'1 mo'],[90,'3 mo'],[180,'6 mo'],[270,'9 mo'],[365,'']].forEach(([dd,lb])=>{if(N&&(dd===7||dd===270||dd===90))return;const xx=X(dd);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${L.ay-3}" y2="${L.ay+3}" class="axis"/>`;if(lb)s+=`<text x="${f1(xx)}" y="${L.ay+14}" class="t-xs t-mid${dd===365?' t-end':''}">${lb}</text>`});
    MS.forEach(m=>{const xx=X(m[0]),on=d>=m[0]-.01,cur=m[5]===p,c=cur?'var(--brand)':on?'var(--rec)':'var(--muted)';
      s+=G[m[1]](xx+(m[0]===0?6:m[0]===365?-8:0),L.iy,L.s,c);
      const lb=N?m[3]:m[2],ly=L.lr[m[4]],anc=m[0]===0?'':m[0]===365?' t-end':' t-mid';
      s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${L.iy+12}" y2="${ly-10}" style="stroke:${c};stroke-width:1;opacity:.5"/><text x="${f1(m[0]===0?L.x0:xx)}" y="${ly}" class="t-xs${anc}" style="fill:${c};font-weight:${cur?700:500}">${lb}</text>`});
    /* mood plot */
    const Y=v=>L.py+L.ph-L.ph*v/25,pb=L.py+L.ph;
    s+=`<text x="${L.x0}" y="${L.py-10}" class="t-xs" style="fill:var(--ink);font-weight:600">HOW COMMON AFTER MI (DSM-DIAGNOSED, POOLED)</text>`;
    [0,10,20].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    const x90=X(90),dP=`M${L.x0} ${f1(Y(19.46))}H${f1(x90)}V${f1(Y(14.87))}H${L.x1}`;
    s+=`<path d="${dP}" style="fill:none;stroke:var(--brand);stroke-width:2.4;opacity:.25"/>`;
    const upx=Math.min(px,L.x1);s+=`<path d="M${L.x0} ${f1(Y(19.46))}H${f1(Math.min(upx,x90))}${upx>x90?`V${f1(Y(14.87))}H${f1(upx)}`:''}" style="fill:none;stroke:var(--brand);stroke-width:2.8"/>`;
    s+=`<line x1="${L.x0}" x2="${f1(upx)}" y1="${f1(Y(11.96))}" y2="${f1(Y(11.96))}" style="stroke:var(--isch);stroke-width:2.2;stroke-dasharray:6 4"/><line x1="${L.x0}" x2="${f1(upx)}" y1="${f1(Y(10.26))}" y2="${f1(Y(10.26))}" style="stroke:var(--gold);stroke-width:2.2;stroke-dasharray:2 4"/>`;
    s+=`<text x="${N?L.x1:f1(X(330))}" y="${f1(Y(dep(d))-6)}" class="t-xs t-end" style="fill:var(--brand);font-weight:700">depression ${dep(d).toFixed(1)}%</text>`;
    s+=`<text x="${N?L.x0+6:f1(X(150))}" y="${f1(Y(11.96)-5)}" class="t-xs" style="fill:var(--isch)">anxiety 12.0%</text><text x="${N?L.x0+6:f1(X(150))}" y="${f1(Y(10.26)+13)}" class="t-xs" style="fill:var(--gold)">PTSD 10.3% (not split by time)</text>`;
    s+=`<text x="${f1(x90+4)}" y="${L.py+10}" class="t-xs">3 months</text><line x1="${f1(x90)}" x2="${f1(x90)}" y1="${L.py}" y2="${pb}" class="grid"/>`;
    /* playhead */
    s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${L.ay-26}" y2="${pb}" style="stroke:var(--ink);stroke-width:1.6"/><circle cx="${f1(px)}" cy="${f1(Y(dep(d)))}" r="5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/><path d="M${f1(px-5)} ${L.ay-27}L${f1(px+5)} ${L.ay-27}L${f1(px)} ${L.ay-20}Z" style="fill:var(--ink)"/>`;
    /* icon array of 100 */
    const k=Math.round(dep(d)),A=icons(L.ix,L.iy2,{n:100,cols:L.icol,k,size:L.isz,gap:L.ig,col:'var(--brand)',shape:'dot'});
    s+=`<text x="${L.ix}" y="${L.iy2-10}" class="t-xs" style="fill:var(--ink);font-weight:600">OF 100 PEOPLE AT THIS POINT</text>`+A.svg;
    const tx=N?L.tx:L.tx,tyy=N?L.iy2+A.h+22:L.txy;
    s+=`<text x="${tx}" y="${tyy}" style="font:800 ${N?24:26}px var(--display);fill:var(--brand)">about ${k} in 100</text>`;
    s+=`<text x="${tx}" y="${tyy+18}" class="t-xs" style="fill:var(--ink)">with DSM-diagnosed depression,</text><text x="${tx}" y="${tyy+33}" class="t-xs" style="fill:var(--ink)">${d<=90?'assessed within 3 months':'assessed after 3 months'}</text>`;
    if(!N)s+=`<text x="${tx}" y="${tyy+50}" class="t-xs">pooled from different studies</text>`;
    svg.innerHTML=s;
    setSt(p);
    rg.setAttribute('aria-valuetext',`${dl}: ${LV_STEPS[p].t}`);
    $('#lvRead').innerHTML=`<span>time <b>${d<30?'day '+Math.round(d):'month '+(d/30.4).toFixed(1)}</b></span><span>depression (pooled) <b>${dep(d).toFixed(2)}%</b></span><span>dated milestones passed <b>${MS.filter(m=>d>=m[0]-.01).length} of ${MS.length}</b></span>`;
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,26000,'%t:player.replay%','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- personal checklist, saved in this browser ---- */
  const box=$('#lvCheck');let st=store.get('living.check',{});if(!st||typeof st!=='object')st={};
  box.innerHTML=LV_CHECK.map(([g,items,src])=>`<fieldset><legend>${g}</legend>${items.map(([id,tx])=>`<label for="lvc-${id}"><input type="checkbox" id="lvc-${id}" data-lvc="${id}"><span>${tx}</span></label>`).join('')}${src?`<p class="src">Why: ${src}</p>`:'<p class="src">If you think someone is having a heart attack, call at once.</p>'}</fieldset>`).join('');
  const all=$$('[data-lvc]',box);
  function sync(){let n=0;all.forEach(c=>{c.checked=!!st[c.dataset.lvc];c.closest('label').classList.toggle('done',c.checked);if(c.checked)n++});
    $('#lvCount').textContent=`${n} of ${all.length} ticked`;$('#lvBar').style.width=(100*n/all.length).toFixed(1)+'%'}
  box.addEventListener('change',e=>{const c=e.target.closest('[data-lvc]');if(!c)return;st[c.dataset.lvc]=c.checked;store.set('living.check',st);sync()});
  $('#lvReset').addEventListener('click',()=>{st={};store.set('living.check',st);sync()});
  sync();
};
