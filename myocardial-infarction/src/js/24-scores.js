/* =============== 2.4 Risk scores: HEART, TIMI & GRACE =============== */
const SC_ITEMS=[
 {L:'H',n:'History',id:'scH',c:['slightly suspicious','moderately suspicious','highly suspicious']},
 {L:'E',n:'ECG',id:'scE',c:['normal','nonspecific repolarisation','significant ST depression'],cn:['normal','nonspecific repolar- isation','significant ST depression']},
 {L:'A',n:'Age',id:'scA',c:['under 45','45–65','65 or older']},
 {L:'R',n:'Risk factors',id:'scR',c:['none known','1–2 risk factors','≥3, or known atherosclerosis'],cn:['none known','1–2','≥3 or known athero- sclerosis']},
 {L:'T',n:'Troponin',id:'scTr',c:['≤ normal limit','1–2 × normal limit','> 2 × normal limit'],cn:['≤ normal limit','1–2 × normal','> 2 × normal']}
];
const SC_COH={
 b13:{n:'Backus 2013',d:'prospective, 2440 patients, 10 Dutch hospitals',r:['1.7','16.6','50.1'],what:'6-week MACE',k:'[[Backus2013]]'},
 b10:{n:'Backus 2010',d:'retrospective, 880 patients, multicentre',r:['0.99','11.6','65.2'],what:'6-week MACE',k:'[[Backus2010]]'},
 s08:{n:'Six 2008',d:'derivation, 120 patients',r:['2.5','20.3','72.7'],what:'endpoint risk',k:'[[Six2008HEART]]'}
};
const SC_BAND=[{n:'low',r:'0–3',c:'var(--good)'},{n:'intermediate',r:'4–6',c:'var(--warn)'},{n:'high',r:'7–10',c:'var(--bad)'}];
const scBandOf=v=>v<=3?0:v<=6?1:2;
const SC_STEPS=[
 {from:0,at:.1,k:'H · 0–2 points',t:'History',
  txt:`HEART stands for History, ECG, Age, Risk factors and Troponin; each scores 0, 1 or 2, for a total of 0 to 10. History scores 0 if the story is slightly suspicious for an acute coronary syndrome, 1 if moderately and 2 if highly suspicious. [[Six2008HEART]]`,
  pt:`The first item is the doctor's judgement of how much the story sounds like a heart problem.`,
  hook:`HEART = History, ECG, Age, Risk factors, Troponin; 0–2 each, total 0–10. [[Six2008HEART]]`},
 {from:.16,at:.26,k:'E · 0–2 points',t:'ECG',
  txt:`ECG scores 0 for normal, 1 for a nonspecific repolarisation disturbance and 2 for significant ST depression. [[Six2008HEART]]`,
  pt:`The heart tracing adds points if it shows changes that can mean strain on the heart muscle.`,
  hook:`Only significant ST depression scores 2 on the HEART ECG item. [[Six2008HEART]]`},
 {from:.32,at:.42,k:'A · 0–2 points',t:'Age',
  txt:`Age scores 0 under 45, 1 from 45 to 65, and 2 at 65 or older. The printed table in the original paper says "≤65", but its Methods text says 65 or older. [[Six2008HEART]]`,
  pt:`Older age adds points because heart disease becomes more common with age.`},
 {from:.48,at:.58,k:'R · 0–2 points',t:'Risk factors',
  txt:`Risk factors score 0 if none are known, 1 for one or two, and 2 for three or more or a history of atherosclerotic disease. [[Six2008HEART]] Risk factors are explained in <a href="#risk" data-go="risk">Risk factors &amp; prevention</a>.`,
  pt:`The more known risk factors for heart disease a person has, the more points this item adds.`},
 {from:.64,at:.74,k:'T · 0–2 points',t:'Troponin',
  txt:`Troponin scores 0 at or below the assay's normal limit, 1 for one to two times the limit and 2 for more than twice the limit. [[Six2008HEART]] How troponin is measured and repeated is in <a href="#troponin" data-go="troponin">Troponin &amp; rapid rule-out</a>.`,
  pt:`Troponin is a protein released when heart muscle is damaged. A higher level adds points.`,
  hook:`Troponin item: ≤ normal limit 0, 1–2× 1, >2× 2. [[Six2008HEART]]`},
 {from:.8,at:.95,k:'Total · three bands',t:'Low, intermediate, high',
  txt:`In the prospective validation (2440 patients, 10 Dutch hospitals), 36.4% scored 0–3. The 6-week rate of major adverse cardiac events (MACE) was 1.7% for 0–3, 16.6% for 4–6 and 50.1% for 7–10, and HEART discriminated better than TIMI or GRACE (c-statistic 0.83 vs 0.75 and 0.70). These are population statistics. [[Backus2013]]`,
  pt:`A low score means that, in the studies, few people in that group had a serious heart event in the next six weeks. It does not mean "definitely not a heart attack".`,
  hook:`HEART 0–3: 1.7%, 4–6: 16.6%, 7–10: 50.1% 6-week MACE (Backus 2013). [[Backus2013]]`}
];
const SC_TIMI=['Age 65 or older','3 or more coronary risk factors','Known coronary stenosis of 50% or more','ST deviation on the presenting ECG','2 or more anginal events in the prior 24 h','Aspirin use in the prior 7 days','Raised cardiac markers'];
const SC_TIMI_R=[['0/1','4.7'],['2','8.3'],['3','13.2'],['4','19.9'],['5','26.2'],['6/7','40.9']];
const SC_GRACE=[
 {n:'Cardiac arrest at presentation',or:4.3,u:'yes vs no',g:'pt'},
 {n:'ST deviation',or:2.4,u:'yes vs no',g:'ecg'},
 {n:'Killip class',or:2.0,u:'per class',g:'pt'},
 {n:'Age',or:1.7,u:'per 10 years',g:'pt'},
 {n:'Positive initial cardiac enzymes',or:1.6,u:'yes vs no',g:'lab'},
 {n:'Systolic blood pressure',or:1.4,u:'per 20 mm Hg lower',g:'pt'},
 {n:'Heart rate',or:1.3,u:'per 30 bpm',g:'pt'},
 {n:'Creatinine',or:1.2,u:'per 1 mg/dL',g:'lab'}
];
inits.scores=()=>{
  const svg=$('#scSvg'),rg=$('#scT');let coh='b13';
  const val=()=>SC_ITEMS.map(it=>+$('#'+it.id).value);
  const halo='paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round';
  const wrap=(txt,n)=>{const w=txt.split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out};
  function arr(x,y,k,sz,gp,col){let s='';for(let i=0;i<100;i++){const cx=x+(i%10)*(sz+gp),cy=y+Math.floor(i/10)*(sz+gp);s+=`<circle cx="${f1(cx+sz/2)}" cy="${f1(cy+sz/2)}" r="${f1(sz*.44)}" style="fill:${i<k?col:'var(--line)'}"/>`}return s}
  function draw(t){const N=vb(svg,'720 380','400 712'),V=val(),p=phaseOf(SC_STEPS,t),S=SC_STEPS[p],C=SC_COH[coh];
    const G=N?{x:12,y:16,w:376,rh:74,lw:82}:{x:12,y:22,w:444,rh:66,lw:100};
    const cw=(G.w-G.lw)/3;let s='';
    /* running total: item i is counted once its token lands */
    const land=i=>ramp(t,SC_STEPS[i].from+.04,SC_STEPS[i].from+.1);
    let tot=0;SC_ITEMS.forEach((it,i)=>tot+=V[i]*land(i));
    const done=t>=.8,Tint=SC_ITEMS.reduce((a,it,i)=>a+(land(i)>=1?V[i]:0),0);
    SC_ITEMS.forEach((it,i)=>{const y=G.y+i*G.rh,act=i===p,shown=t>=SC_STEPS[i].from,ch=V[i],a=ramp(t,SC_STEPS[i].from,SC_STEPS[i].from+.04);
      s+=`<rect x="${G.x}" y="${y}" width="${G.w}" height="${G.rh-6}" rx="10" style="fill:${act?'var(--dx-soft)':'var(--field)'};stroke:${act?'var(--dx)':'var(--line)'};stroke-width:${act?1.6:1}"/>`;
      s+=`<circle cx="${G.x+22}" cy="${y+(G.rh-6)/2}" r="15" style="fill:${shown?'var(--dx)':'var(--panel-2)'}"/><text x="${G.x+22}" y="${y+(G.rh-6)/2+6}" class="t-mid" style="font:800 17px var(--display);fill:${shown?'var(--panel)':'var(--muted)'}">${it.L}</text>`;
      const nm=it.n==='Risk factors'?['Risk','factors']:it.n==='Troponin'&&N?['Tropo-','nin']:[it.n];nm.forEach((l,j)=>s+=`<text x="${G.x+42}" y="${f1(y+(G.rh-6)/2+4+(j-(nm.length-1)/2)*13)}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text>`);
      for(let c=0;c<3;c++){const cx=G.x+G.lw+c*cw,sel=shown&&c===ch;
        s+=`<rect x="${f1(cx+3)}" y="${y+5}" width="${f1(cw-6)}" height="${G.rh-16}" rx="7" style="fill:${sel?'var(--panel)':'none'};stroke:${sel?'var(--dx)':'var(--line)'};stroke-width:${sel?2:1};opacity:${sel?a:1}"/>`;
        s+=`<text x="${f1(cx+(N?9:9))}" y="${y+20}" class="t-xs" style="fill:${sel?'var(--dx)':'var(--muted)'};font-weight:700">${c}</text>`;
        wrap((N&&it.cn?it.cn:it.c)[c],N?14:16).slice(0,3).forEach((ln,j)=>s+=`<text x="${f1(cx+(N?9:20))}" y="${y+(N?33:20)+j*13}" style="font:500 ${N?10:9.5}px var(--mono);fill:${sel?'var(--ink)':'var(--muted)'}">${ln}</text>`)}
    });
    /* gauge and total */
    const Q=N?{gx:110,gy:484,gr:80,lx:206,ly:428,y0:536}:{gx:590,gy:116,gr:82,lx:478,ly:170,y0:198};
    const bands=[{to:3.5,col:'var(--good)'},{to:6.5,col:'var(--warn)'},{to:10,col:'var(--bad)'}];
    if(!done){const i=p,u=ramp(t,SC_STEPS[i].from+.04,SC_STEPS[i].from+.1),fx=G.x+G.lw+V[i]*cw+cw/2,fy=G.y+i*G.rh+(G.rh-6)/2,tx=Q.gx,ty=Q.gy-Q.gr*.45;
      if(u>0&&u<1){const e=ease(u),px=lerp(fx,tx,e),py=lerp(fy,ty,e)-Math.sin(Math.PI*e)*40;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="13" style="fill:var(--dx)"/><text x="${f1(px)}" y="${f1(py+5)}" class="t-mid" style="font:800 14px var(--display);fill:var(--panel)">+${V[i]}</text>`}}
    s+=gauge(Q.gx,Q.gy,Q.gr,tot,10,{bands});
    s+=`<text x="${Q.gx}" y="${f1(Q.gy-Q.gr*.38)}" class="t-mid" style="font:800 34px var(--display);fill:var(--ink)">${Tint}</text><text x="${Q.gx}" y="${Q.gy+30}" class="t-sm t-mid">HEART total${done?'':' so far'}</text>`;
    const B=scBandOf(Tint);
    if(!done){const lines=[`${SC_ITEMS[p].n}: ${V[p]} point${V[p]===1?'':'s'}`,'Each item: 0, 1 or 2.','Total so far: '+Tint+' of 10.','The band is read once','all five are in.'];
      lines.forEach((l,j)=>s+=`<text x="${Q.lx}" y="${(N?Q.ly:Q.ly+18)+j*18}" class="${j?'t-sm':'t-lbl'}">${l}</text>`)}
    else{const u=ramp(t,.82,.94),sz=N?9:5.6,gp=N?2.4:1.4,aw=10*(sz+gp),y0=Q.y0;
      s+=`<text x="${N?12:Q.lx}" y="${y0-8}" class="t-xs">${C.n} · ${C.what} per 100 people</text>`;
      const xs=N?[12,140,268]:[Q.lx,Q.lx+aw+10,Q.lx+2*(aw+10)];
      SC_BAND.forEach((b,j)=>{const on=j===B,y=y0+4;
        s+=`<g style="opacity:${on?1:.5}">${arr(xs[j],y,Math.round(+C.r[j]*u),sz,gp,b.c)}</g>`;
        s+=`<text x="${xs[j]}" y="${f1(y+10*(sz+gp)+16)}" class="t-lbl" style="fill:${b.c}">${C.r[j]}%</text><text x="${xs[j]}" y="${f1(y+10*(sz+gp)+30)}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${b.r}${on?' ◂':''}</text><text x="${xs[j]}" y="${f1(y+10*(sz+gp)+43)}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${b.n}</text>`});
      if(!N)s+=`<text x="${Q.gx}" y="${Q.gy-Q.gr-10}" class="t-sm t-mid" style="fill:${SC_BAND[B].c};font-weight:700">${SC_BAND[B].r} · ${SC_BAND[B].n}</text>`;
      else s+=`<text x="${Q.lx}" y="${Q.ly+20}" class="t-lbl" style="fill:${SC_BAND[B].c}">${SC_BAND[B].r} · ${SC_BAND[B].n}</text><text x="${Q.lx}" y="${Q.ly+40}" class="t-sm">${C.r[B]}% ${C.what}</text>`}
    svg.innerHTML=s;setSt(p);
    $('#scNote').innerHTML=noteHTML(S)+(done?`<div class="kv"><div><dt>${C.n} · ${C.d}</dt><dd>${C.what}: ${C.r[0]}% (0–3), ${C.r[1]}% (4–6), ${C.r[2]}% (7–10). This example scored ${Tint}, in the ${SC_BAND[B].n} band. ${C.k}</dd></div></div>`:'');
    $('#scRead').innerHTML=SC_ITEMS.map((it,i)=>`<span>${it.L} <b>${land(i)>=1?V[i]:'·'}</b></span>`).join('')+`<span>total <b>${Tint}</b></span>`;
  }
  const stop=playWire(rg,$('#scPlay'),draw,22000,'Replay','scores');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  $$('[data-sccoh]').forEach(b=>b.addEventListener('click',()=>{coh=b.dataset.sccoh;$$('[data-sccoh]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value);hcalc()}));
  draw(+rg.value);

  /* ---- HEART teaching calculator ---- */
  const hsvg=$('#scHcSvg');
  function hcalc(){const V=val(),tot=V.reduce((a,b)=>a+b,0),B=scBandOf(tot),C=SC_COH[coh],N=vb(hsvg,'720 150','400 300');let s='';
    const x0=N?20:24,x1=N?380:420,y=N?40:52,X=v=>x0+(x1-x0)*v/10;
    SC_BAND.forEach((b,j)=>{const a=[0,4,7][j]-.5,z=[3,6,10][j]+.5;s+=`<rect x="${f1(X(Math.max(0,a)))}" y="${y}" width="${f1(X(Math.min(10,z))-X(Math.max(0,a)))}" height="14" style="fill:${b.c};opacity:${j===B?.85:.25}"/><text x="${f1((X(Math.max(0,a))+X(Math.min(10,z)))/2)}" y="${y+32}" class="t-xs t-mid" style="${j===B?'fill:var(--ink);font-weight:700':''}">${b.r} ${b.n}</text>`});
    for(let v=0;v<=10;v++)s+=`<text x="${f1(X(v))}" y="${y-6}" class="t-xs t-mid">${v}</text>`;
    s+=`<path d="M${f1(X(tot))} ${y-2}l-7 -12h14z" style="fill:var(--ink)" transform="translate(0 0)"/>`;
    s+=`<text x="${x0}" y="${N?110:110}" class="t-lbl">HEART ${tot}</text><text x="${x0}" y="${N?128:128}" class="t-sm">${C.n}: ${C.r[B]}% ${C.what} in this band</text>`;
    const ax=N?140:470,ay=N?150:14,sz=N?11:9.4,gp=2.4;s+=arr(ax,ay,Math.round(+C.r[B]),sz,gp,SC_BAND[B].c);
    if(N)s+=`<text x="${ax-8}" y="${ay+60}" class="t-xs t-end">per 100</text><text x="${ax-8}" y="${ay+74}" class="t-xs t-end">people</text>`;
    hsvg.innerHTML=s;
    $('#scHNote').innerHTML=`<div class="kicker">Teaching result</div><h4>HEART ${tot}: ${SC_BAND[B].n} band (${SC_BAND[B].r})</h4><div class="big-num">${C.r[B]}%</div><p>In ${C.n} (${C.d}), ${C.r[B]}% of people scoring ${SC_BAND[B].r} had ${C.what==='6-week MACE'?'a major adverse cardiac event within 6 weeks':'the study endpoint'}. Across the cohorts this band ranged ${['0.99–2.5%','11.6–20.3%','50.1–72.7%'][B]}. [[Six2008HEART,Backus2010,Backus2013]]</p><div class="pt"><b>In plain words</b>This describes a group of people in a study, not you. A low score never replaces calling for help if symptoms suggest a heart attack.</div>`+(B===0?`<div class="hook"><b>Exam hook</b>HEART 0–3 had a likelihood ratio for ACS of 0.20, but the stepped-wedge trial still found 2.0% events in low-risk patients. [[Fanaroff2015,Poldervaart2017AIM]]</div>`:B===2?`<div class="hook"><b>Exam hook</b>HEART 7–10 had a likelihood ratio for ACS of 13. [[Fanaroff2015]]</div>`:`<div class="hook"><b>Exam hook</b>HEART 4–6: 16.6% 6-week MACE in Backus 2013, 11.6% in Backus 2010. [[Backus2013,Backus2010]]</div>`)}
  SC_ITEMS.forEach(it=>$('#'+it.id).addEventListener('change',()=>{hcalc();stop();draw(+rg.value)}));
  $('#scHShow').addEventListener('click',()=>{rg.value=0;$('#scPlay').click();$('#scSvg').scrollIntoView({block:'center',behavior:'smooth'})});
  $('#scHReset').addEventListener('click',()=>{[1,1,1,1,0].forEach((v,i)=>$('#'+SC_ITEMS[i].id).value=v);hcalc();draw(+rg.value)});
  hcalc();

  /* ---- TIMI teaching calculator ---- */
  $('#scTimi').innerHTML=SC_TIMI.map((x,i)=>`<label><input type="checkbox" data-sctimi="${i}"> <span>${x} <b style="color:var(--dx)">+1</b></span></label>`).join('');
  const tsvg=$('#scTiSvg');
  function tcalc(){const n=$$('[data-sctimi]').filter(c=>c.checked).length,gi=n<=1?0:n>=6?5:n-1,N=vb(tsvg,'720 230','400 300');let s='';
    const x0=N?16:60,x1=N?388:700,base=N?250:190,top=N?50:30,bw=(x1-x0)/6,Y=v=>base-(base-top)*v/45;
    [0,10,20,30,40].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`;if(!N)s+=`<text x="${x0-8}" y="${f1(Y(v)+4)}" class="t-xs t-end">${v}%</text>`});
    SC_TIMI_R.forEach((r,i)=>{const on=i===gi,bx=x0+i*bw+bw*.18,w=bw*.64;
      s+=`<rect x="${f1(bx)}" y="${f1(Y(+r[1]))}" width="${f1(w)}" height="${f1(base-Y(+r[1]))}" rx="4" style="fill:${on?'var(--dx)':'var(--panel-2)'};stroke:var(--dx);stroke-width:${on?0:1}"/>`;
      s+=`<text x="${f1(bx+w/2)}" y="${f1(Y(+r[1])-6)}" class="t-sm t-mid" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:700">${r[1]}%</text><text x="${f1(bx+w/2)}" y="${base+16}" class="t-sm t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${r[0]}</text>`});
    s+=`<text x="${x0}" y="${N?22:14}" class="t-xs">14-day death, MI or urgent revascularisation · TIMI 11B test cohort</text><text x="${f1((x0+x1)/2)}" y="${base+34}" class="t-xs t-mid">TIMI risk score</text>`;
    tsvg.innerHTML=s;
    $('#scTiNote').innerHTML=`<div class="kicker">Teaching result</div><h4>TIMI ${n} of 7</h4><div class="big-num">${SC_TIMI_R[gi][1]}%</div><p>In the TIMI 11B test cohort, the 14-day rate of death, MI or urgent revascularisation was ${SC_TIMI_R[gi][1]}% for a score of ${SC_TIMI_R[gi][0]}, rising from 4.7% at 0/1 to 40.9% at 6/7. [[Antman2000]] In the JAMA review, TIMI 5–7 had a likelihood ratio for ACS of 6.8 and TIMI 0–1 of 0.31. [[Fanaroff2015]]</p><div class="hook"><b>Exam hook</b>The odd one out among TIMI's items: aspirin use in the prior 7 days. [[Antman2000]]</div>`}
  $('#scTimi').addEventListener('change',tcalc);tcalc();

  /* ---- GRACE odds ratios ---- */
  const gsvg=$('#scGrSvg');let gh='';
  function gdraw(){const N=vb(gsvg,'720 320','400 460');let s='';
    const x0=N?14:250,x1=N?330:640,top=N?30:24,rh=N?52:34,X=v=>x0+(x1-x0)*(v-1)/3.6;
    [1,2,3,4].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-6}" y2="${top+rh*8}" class="grid"/><text x="${f1(X(v))}" y="${top+rh*8+14}" class="t-xs t-mid">${v}${v===1?' (no effect)':''}</text>`});
    SC_GRACE.forEach((g,i)=>{const y=top+i*rh,on=!gh||g.g===gh,col=g.g==='lab'?'var(--trop)':g.g==='ecg'?'var(--brand)':'var(--dx)';
      if(N)s+=`<text x="${x0}" y="${y+10}" class="t-sm" style="fill:var(--ink);opacity:${on?1:.4}">${g.n} <tspan class="t-xs">${g.u}</tspan></text>`;
      else s+=`<text x="${x0-10}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink);opacity:${on?1:.4}">${g.n}</text><text x="${x0-10}" y="${y+25}" class="t-xs t-end" style="opacity:${on?1:.4}">${g.u}</text>`;
      const by=N?y+18:y+6;s+=`<rect x="${f1(X(1))}" y="${by}" width="${f1(X(g.or)-X(1))}" height="14" rx="4" style="fill:${col};opacity:${on?.9:.2}"/><text x="${f1(X(g.or)+6)}" y="${by+11}" class="t-sm" style="fill:${col};font-weight:700;opacity:${on?1:.4}">${g.or.toFixed(1)}</text>`});
    s+=`<text x="${N?x0:x1}" y="${top-12}" class="t-xs ${N?'':'t-end'}">odds ratio for in-hospital death</text>`;
    gsvg.innerHTML=s;
    const G={pt:['At the bedside','Age, heart rate, systolic blood pressure, Killip class (signs of heart failure) and cardiac arrest at presentation come from the history and examination.'],ecg:['ECG','ST deviation on the ECG doubled the odds of in-hospital death (OR 2.4).'],lab:['Blood tests','Creatinine (kidney function) and positive initial cardiac enzymes come from the first blood tests.']};
    $('#scGrNote').innerHTML=`<div class="kicker">GRACE in-hospital model · ${gh?G[gh][0]:'all 8 variables'}</div><h4>${gh?G[gh][0]:'Eight variables, one prediction'}</h4><p>${gh?G[gh][1]:'The model weighs how sick the person is now (cardiac arrest, Killip class, blood pressure, heart rate), the ECG, kidney function, cardiac enzymes and age.'} Odds ratios from the derivation: cardiac arrest 4.3, ST deviation 2.4, Killip 2.0 per class, age 1.7 per 10 years, enzymes 1.6, systolic BP 1.4 per 20 mm Hg lower, heart rate 1.3 per 30 bpm, creatinine 1.2 per 1 mg/dL. [[Granger2003]]</p><div class="pt"><b>In plain words</b>GRACE estimates how likely death is for someone already diagnosed with a heart attack or unstable angina. A higher score points the team toward earlier angiography.</div><div class="hook"><b>Exam hook</b>GRACE &gt;140 is an ESC high-risk criterion for an invasive strategy within 24 h. [[Byrne2023ESC]]</div>`}
  $$('[data-scgr]').forEach(b=>b.addEventListener('click',()=>{gh=gh===b.dataset.scgr?'':b.dataset.scgr;$$('[data-scgr]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.scgr===gh));gdraw()}));
  gdraw();

  /* ---- discrimination bars ---- */
  const asvg=$('#scAuc');
  function adraw(){const N=vb(asvg,'720 240','400 300');let s='';const D=[['HEART',.83,.86],['TIMI',.75,.80],['GRACE',.70,.73]];
    const x0=N?20:120,x1=N?390:700,base=N?240:190,top=N?40:30,Y=v=>base-(base-top)*(v-.5)/.5,gw=(x1-x0)/3;
    [.5,.6,.7,.8,.9,1].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+(N?'':`<text x="${x0-8}" y="${f1(Y(v)+4)}" class="t-xs t-end">${v.toFixed(1)}</text>`));
    D.forEach((d,i)=>{const gx=x0+i*gw,bw=gw*.3;[[d[1],'var(--dx)','Backus 2013'],[d[2],'var(--accent)','Poldervaart 2017']].forEach((b,j)=>{const bx=gx+gw*.17+j*(bw+6);
      s+=`<rect x="${f1(bx)}" y="${f1(Y(b[0]))}" width="${f1(bw)}" height="${f1(base-Y(b[0]))}" rx="4" style="fill:${b[1]};opacity:${j?.55:.9}"/><text x="${f1(bx+bw/2)}" y="${f1(Y(b[0])-6)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${b[0].toFixed(2)}</text>`});
      s+=`<text x="${f1(gx+gw/2)}" y="${base+20}" class="t-lbl t-mid">${d[0]}</text>`});
    s+=`<text x="${x0}" y="${N?18:16}" class="t-xs"><tspan style="fill:var(--dx);font-weight:700">■ Backus 2013 c-statistic</tspan>   <tspan style="fill:var(--accent);font-weight:700">■ Poldervaart 2017 AUC</tspan></text>`;
    asvg.innerHTML=s}
  adraw();
  const prevR=redraws.scores;redraws.scores=()=>{prevR&&prevR();hcalc();tcalc();gdraw();adraw()};
};
