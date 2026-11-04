/* =============== 3.2 CIWA-Ar: scoring withdrawal =============== */
/* items and ranges: Mirijello 2015 table (modified from Sullivan 1989); anchors quoted only where the research has them */
const CI_ITEMS=[
 {n:'Nausea or vomiting',max:7},
 {n:'Tremor',max:7,a0:'none',aM:'severe tremors, even with arms not extended'},
 {n:'Paroxysmal sweats',max:7},
 {n:'Anxiety',max:7},
 {n:'Agitation',max:7},
 {n:'Tactile disturbances',max:7},
 {n:'Auditory disturbances',max:7},
 {n:'Visual disturbances',max:7},
 {n:'Headache',max:7},
 {n:'Orientation and clouding of sensorium',max:4,a0:'orientated, can do serial additions',aM:'disorientated for place and/or person'}
];
const CI_H=72; /* scrubber hours */
const CI_STEPS=[
 {from:0,at:.02,k:'Hour 0',t:'The first score',
  txt:`Both people start with the same withdrawal and the same CIWA-Ar score. In Saitz 1994, 101 inpatients on a VA detox unit were randomised, double-blind, to symptom-triggered or fixed-schedule chlordiazepoxide; people with a history of seizures were excluded. [[Saitz1994]] On a symptom-triggered regimen the score is checked often: Saitz 1998 describes hourly CIWA-Ar in such regimens. [[Saitz1998AHRW]]`,
  pt:`Nurses ask questions and score signs on a checklist called the CIWA-Ar. That helps them give medicine only when it is needed. [[Saitz1994,ASAM2020Withdrawal]]`,
  hook:`CIWA-Ar: 10 items, nine scored 0–7 and orientation 0–4, maximum 67. [[Mirijello2015]]`},
 {from:.03,at:.06,k:'Hours 2–8',t:'Score at threshold: a dose',
  txt:`As ASAM 2020 describes, symptom-triggered regimens give medication when scores reach the threshold set by the protocol, and not otherwise. In the fixed lane, tablets come at set times whatever the score. [[ASAM2020Withdrawal]] The threshold line here is the one in ASAM's published sample regimen (CIWA-Ar ≥10); local protocols set their own. [[ASAM2020Withdrawal]]`,
  pt:`In the top lane, medicine follows the score. In the bottom lane, it follows the clock.`,
  hook:`ASAM bands: mild &lt;10, moderate 10–18, severe ≥19. [[ASAM2020Withdrawal]]`},
 {from:.11,at:.14,k:'About 9 h',t:'Symptom-triggered stops',
  txt:`In Saitz 1994 the median duration of symptom-triggered treatment was 9 h, against 68 h on the fixed schedule (P&lt;.001). [[Saitz1994]] Once stable (for example CIWA-Ar &lt;10 for 24 h), ASAM 2020 extends monitoring to every 4–8 hours; before that it re-assesses every 1–4 hours. [[ASAM2020Withdrawal]]`,
  hook:`Saitz 1994: 9 vs 68 h median treatment. [[Saitz1994]]`},
 {from:.3,at:.5,k:'Hours 12–68',t:'The fixed schedule keeps going',
  txt:`On the fixed schedule, doses continue on the clock although the score has already settled. In a second trial (Daeppen 2002, oxazepam), only 39% of the symptom-triggered group needed any medicine at all, against 100% on the fixed schedule, with mean doses 37.5 vs 231.4 mg and durations 20.0 vs 62.7 h. [[Daeppen2002]]`,
  pt:`Many people on a symptom-triggered plan need little or no medicine, because their score never reaches the threshold.`},
 {from:.9,at:1,k:'The result',t:'Same outcome, less medicine',
  txt:`Saitz 1994: 100 vs 425 mg chlordiazepoxide (P&lt;.001), with no difference in withdrawal severity, seizures or delirium tremens. [[Saitz1994]] A meta-analysis found that individualising therapy with withdrawal scales gives significantly less medication and shorter treatment. [[MayoSmith1997]] ASAM 2020 calls inpatient symptom-triggered treatment "the preferred benzodiazepine dosing method". It needs a patient who can communicate and who has recently been drinking. [[ASAM2020Withdrawal,Hecksel2008]]`,
  pt:`Scoring often and treating only when needed gave far less medicine and the same safety, in these trials.`,
  hook:`Symptom-triggered dosing: less drug, shorter course, similar safety (Saitz 1994: 100 vs 425 mg). [[Saitz1994]]`}
];

inits.ciwa=()=>{
  /* ---------- calculator ---------- */
  const wrap=$('#ciItems');let mir=false;
  wrap.innerHTML=CI_ITEMS.map((it,i)=>`<div class="ci-item"><div class="ci-top"><label for="ciI${i}"><b>${i+1}. ${it.n}</b></label><output id="ciO${i}">0/${it.max}</output></div>
    <input type="range" id="ciI${i}" min="0" max="${it.max}" step="1" value="0" aria-valuetext="0 of ${it.max}">
    <small>${it.a0?`0 = "${it.a0}" · ${it.max} = "${it.aM}"`:`scored 0 (lowest) to ${it.max} (highest); anchors in the published scale`}</small></div>`).join('');
  const gv=$('#ciGauge'),out=$('#ciOut');
  const ASAMB=[{to:10,col:'var(--good)',n:'mild',r:'&lt;10'},{to:19,col:'var(--warn)',n:'moderate',r:'10–18'},{to:67,col:'var(--bad)',n:'severe',r:'≥19'}];
  const MIRB=[{to:8,col:'var(--good)',n:'mild',r:'&lt;8'},{to:16,col:'var(--warn)',n:'moderate',r:'8–15'},{to:67,col:'var(--bad)',n:'severe',r:'&gt;15'}];
  function calc(){
    let tot=0;CI_ITEMS.forEach((it,i)=>{const r=$('#ciI'+i),v=+r.value;tot+=v;$('#ciO'+i).textContent=v+'/'+it.max;r.setAttribute('aria-valuetext',v+' of '+it.max)});
    const B=mir?MIRB:ASAMB,bi=B.findIndex(b=>tot<b.to),b=B[bi<0?2:bi];
    let s=gauge(170,170,140,tot,67,{bands:B,big:true,label:'teaching total / 67'});
    /* band labels just outside the dial */
    let u0=0;B.forEach(bb=>{const u1=bb.to/67,um=(u0+u1)/2,a=Math.PI*(1-um),lx=170+150*Math.cos(a),ly=170-150*Math.sin(a),an=lx<150?" t-end":lx>190?"":" t-mid";
      s+=`<text x="${f1(lx)}" y="${f1(ly+3)}" class="t-xs${an}" style="fill:${bb.col};font-weight:700">${bb.n}</text>`;u0=u1});
    gv.innerHTML=s;
    out.innerHTML=`<div class="verdict ${bi===0?'yes':bi===1?'maybe':'no'}">Teaching total ${tot} of 67: ${b.n} (${b.r}) on the ${mir?'Mirijello 2015':'ASAM 2020'} bands.</div>
      <p style="font-size:14.5px">${mir?`Mirijello 2015 notes that a score above 15 also predicts seizures and delirium. [[Mirijello2015]]`:`ASAM 2020 adds a fourth class, complicated: ≥19 with seizure or signs of delirium, and says classification "is ultimately up to the judgment of clinicians". [[ASAM2020Withdrawal]]`} As ASAM 2020 describes, symptom-triggered regimens give medication when scores reach the threshold set by the protocol. This calculator shows no medicine and no dose. [[ASAM2020Withdrawal]]</p>`;
  }
  $$('#ciItems input').forEach(r=>r.addEventListener('input',calc));
  $('#ciMir').addEventListener('click',e=>{mir=!mir;e.currentTarget.setAttribute('aria-pressed',mir);calc()});
  $('#ciReset').addEventListener('click',()=>{$$('#ciItems input').forEach(r=>r.value=0);calc()});
  calc();

  /* ---------- symptom-triggered vs fixed ---------- */
  const svg=$('#ciSvg'),rg=$('#ciT');
  const score=h=>4+14*Math.exp(-Math.pow((h-5)/4,2))+1.2*Math.sin(h*1.3)*Math.exp(-h/20);
  const TRIG=[];for(let h=0;h<=12;h++)if(score(h)>=10)TRIG.push(h);
  const FIX=[];for(let h=0;h<=66;h+=6)FIX.push(h);
  const doseT=100/TRIG.length,fixW=FIX.map((_,i)=>12-i*.7),fixS=425/fixW.reduce((a,b)=>a+b,0);
  function draw(t){
    const N=vb(svg,'720 400','400 640'),h=t*CI_H;
    const L=N?{x0:40,x1:384,lanes:[{y:56,h:150},{y:330,h:150}],cnt:null,ax:[214,488]}:{x0:60,x1:540,lanes:[{y:46,h:112},{y:236,h:112}],cnt:[566,712],ax:[172,342]};
    const X=v=>L.x0+(L.x1-L.x0)*v/CI_H;
    let s='';
    const lanes=[{nm:'Symptom-triggered',sub:'dose only when the score reaches the threshold',dz:TRIG,w:()=>doseT,end:9,tot:100,col:'var(--rx)'},
                 {nm:'Fixed schedule',sub:'doses on the clock, whatever the score',dz:FIX,w:i=>fixW[i]*fixS,end:68,tot:425,col:'var(--accent)'}];
    lanes.forEach((ln,li)=>{const g=L.lanes[li],Y=v=>g.y+g.h-g.h*v/25;
      s+=`<rect x="${L.x0}" y="${g.y}" width="${L.x1-L.x0}" height="${g.h}" style="fill:var(--field)"/>`;
      s+=`<text x="${L.x0}" y="${g.y-24}" class="t-lbl" style="fill:${ln.col}">${ln.nm}</text><text x="${L.x0}" y="${g.y-10}" class="t-xs">${ln.sub}</text>`;
      [0,10,20].forEach(v=>s+=`<text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(10))}" y2="${f1(Y(10))}" style="stroke:var(--bad);stroke-width:1.3;stroke-dasharray:5 4"/><text x="${L.x1-4}" y="${f1(Y(10)-5)}" class="t-xs t-end" style="fill:var(--bad)">protocol threshold (ASAM sample: ≥10)</text>`;
      /* treatment running bar */
      const run=Math.min(h,ln.end);s+=`<rect x="${L.x0}" y="${g.y+g.h+4}" width="${f1(X(run)-L.x0)}" height="5" rx="2.5" style="fill:${ln.col};opacity:.7"/>`;
      if(h>=ln.end)s+=ln.end>36?`<text x="${f1(X(ln.end))}" y="${g.y+g.h-6}" class="t-xs t-end" style="fill:${ln.col}">treatment ends ≈${ln.end} h</text>`:`<text x="${f1(X(ln.end)+4)}" y="${g.y+g.h+10}" class="t-xs" style="fill:${ln.col}">treatment ends ≈${ln.end} h</text>`;
      /* score curve up to h, with hourly check dots in the triggered lane */
      let d='';for(let v=0;v<=h+1e-9;v+=.25)d+=(d?'L':'M')+f1(X(v))+' '+f1(Y(score(v)));
      if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round"/>`;
      if(li===0)for(let v=0;v<=Math.min(h,24);v++){const sc=score(v);s+=`<circle cx="${f1(X(v))}" cy="${f1(Y(sc))}" r="2.6" style="fill:${sc>=10?'var(--bad)':'var(--panel)'};stroke:var(--ink);stroke-width:1"/>`}
      /* tablets */
      let cum=0;ln.dz.forEach((dh,i)=>{if(dh>h)return;cum+=ln.w(i);const age=h-dh,sz=li?(11+fixW[i])*(N?.9:1):9,py=li?g.y+16+(i%2)*14:g.y+10+(i%3)*10;
        s+=pill(X(dh),py,sz,{ang:-20,col:ln.col,round:!li});if(age<1.2)s+=`<circle cx="${f1(X(dh))}" cy="${f1(py)}" r="${f1(10+age*8)}" style="fill:none;stroke:${ln.col};opacity:${f1(1-age/1.2)}"/>`});
      ln.cum=Math.round(cum);ln.run=run;
      /* counter */
      if(L.cnt){const [c0,c1]=L.cnt,cy=g.y+10;
        s+=`<text x="${c0}" y="${cy+8}" class="t-xs">medicine so far</text><text x="${c0}" y="${cy+40}" style="font:800 30px var(--display);fill:${ln.col}">${ln.cum}</text><text x="${c0}" y="${cy+54}" class="t-xs">mg, scaled to Saitz 1994</text>`;
        s+=`<text x="${c0}" y="${cy+80}" class="t-xs">treatment running</text><text x="${c0}" y="${cy+106}" style="font:800 22px var(--display);fill:var(--ink)">${f1(run)} h</text>`;
        s+=`<rect x="${c0}" y="${cy+114}" width="${c1-c0}" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="${c0}" y="${cy+114}" width="${f1((c1-c0)*ln.cum/425)}" height="5" rx="2.5" style="fill:${ln.col}"/>`}
    });
    /* axis and playhead */
    const ay=L.lanes[1].y+L.lanes[1].h+(N?52:26),tl=tline(L.x0,ay,L.x1-L.x0,{min:0,max:CI_H,step:12,fmt:v=>v+' h'});s+=tl.svg;
    const hx=X(h);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.lanes[0].y}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.4;opacity:.6"/>`;
    if(!L.cnt){/* narrow: counters as one row each under the lane */
      lanes.forEach((ln,li)=>{const g=L.lanes[li],yy=g.y+g.h+28;s+=`<text x="${L.x0}" y="${yy}" class="t-sm" style="fill:${ln.col};font-weight:700">${ln.cum} mg so far · ${f1(ln.run)} h running</text>`})}
    svg.innerHTML=s;
    const p=phaseOf(CI_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`${Math.round(h)} hours: ${CI_STEPS[p].t}`);
    $('#ciRead').innerHTML=`<span>hour <b>${Math.round(h)}</b></span><span>score now <b>${score(h).toFixed(0)}</b></span><span>symptom-triggered <b>${lanes[0].cum} mg · ${f1(lanes[0].run)} h</b></span><span>fixed <b>${lanes[1].cum} mg · ${f1(lanes[1].run)} h</b></span>`;
    $('#ciNote').innerHTML=noteHTML(CI_STEPS[p]);
  }
  const stop=playWire(rg,$('#ciPlay'),draw,22000,'%t:player.replay%','ciwa');
  const setSt=stepWire($('#ciSteps'),CI_STEPS,rg,draw,stop);
  draw(+rg.value);
};
