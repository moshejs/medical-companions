/* =============== 2.2 Imaging & the first hour =============== */
/* Main scrubber: the pathway from door to groin, with a clock (schematic minutes, published benchmark marks). Then CT or MRI bars,
   the ASPECTS scorer (score only), the mismatch explorer against criteria as quoted, DWI-FLAIR, and door-to-needle bars.
   Uses sgHB, sgLines and sgFit from 21-signs.js. */
const IM_STEPS=[
 {from:0,at:.08,k:'Door',t:'Door',st:'Door',scan:'Before any scan',q:'Clot or bleed? Nobody can tell from the outside. The hospital can prepare before the person arrives.',
  txt:`Among 371,988 people arriving by ambulance, 67.0% were prenotified, which went with door-to-imaging of 26 vs 31 minutes and door-to-needle of 78 vs 80 minutes [[Lin2012]]. Helsinki's central rule: do as little as possible after arrival and as much as possible before it, while the person is in transit [[Meretoja2012]].`,
  pt:`A call ahead lets the team and the scanner be ready at the door [[Lin2012]].`,
  hook:`Helsinki principle: do as much as possible before arrival; a median of 20 minutes door-to-needle was achieved [[Meretoja2012]].`},
 {from:1/6,at:.26,k:'Non-contrast CT',t:'CT',st:'CT',scan:'Non-contrast CT',q:'Is there blood? Blood shows white. Without blood the early infarct is often hard to see.',
  txt:`Registry analyses use door-to-imaging of 25 minutes or less as the quality measure [[Ekundayo2013,Lin2012]]. CT matched MRI for acute haemorrhage but was far less sensitive for acute ischaemia: 26% vs 83% for any acute stroke, in 356 people [[Chalela2007]].`,
  pt:`CT is the fast first look. It shows bleeding well, but a normal CT does not rule out a stroke [[Chalela2007]].`},
 {from:2/6,at:.42,k:'Door-to-needle',t:'Needle',st:'Needle',scan:'Drip starts',q:'No blood and within the window? The clot-dissolving drug can start. The benchmarks are 60 and 45 minutes from the door.',
  txt:`In Target: Stroke, median door-to-needle fell from 78 to 66 to 50 minutes. The share treated within 60 minutes rose 26.4%, 42.7%, 68.6%, and within 45 minutes 10.1%, 17.7%, 41.4%, in 154,221 people [[Xian2022]]. Direct transport to the scanner, premixing alteplase and starting it in the imaging suite were still used less often in a survey of 888 hospitals [[Xian2017]].`,
  pt:`The clot-dissolving drug works best early, so teams time themselves from the moment a person comes through the door [[Saver2013]].`},
 {from:3/6,at:.58,k:'CT angiography',t:'CTA',st:'CTA',scan:'CT angiography',q:'Where is the clot? A blocked large artery may be reached with a catheter. Collaterals show how well other routes supply the tissue.',
  txt:`A study of 13 clinical scales concluded intracranial arterial imaging should be done in all people with acute ischaemic stroke within 6 hours [[Turc2016]]. Multiphase CTA gave interrater reliability of κ=0.81 [[Menon2015]]. CT angiography diagnostic accuracy for LVO was not found in a fetched record, so it is not given here.`,
  pt:`CT angiography shows the arteries on the scan, and a blocked artery shows up as a gap.`,
  hook:`No clinical scale reliably identifies LVO with both high sensitivity and high specificity [[Smith2018]].`},
 {from:4/6,at:.75,k:'Perfusion',t:'Perfusion',st:'Perfusion',scan:'Perfusion map (schematic)',q:'How much is lost, how much can be saved? Core: CBF below 30% of normal. Hypoperfused: Tmax above 6 s. In Helsinki, added imaging doubled in-hospital delay.',
  txt:`Working definitions in DEFUSE 3 software output: CBF below 30% of normal tissue for early infarct core, and perfusion delay above 6 s for hypoperfused tissue [[Albers2018]]. In Helsinki, angiography or perfusion imaging doubled in-hospital delay [[Meretoja2012]]. Who gets which scan is contested: see the open questions below.`,
  pt:`A perfusion map colours tissue by how much blood reaches it. It is an estimate [[Albers2018,Campbell2011CBF]].`},
 {from:5/6,at:.93,k:'Groin puncture',t:'Groin',st:'Groin',scan:'Thrombectomy',q:'A catheter reaches the clot from the groin and a stent retriever pulls it out. Delay still costs: benefit falls with time.',
  txt:`Thrombectomy: mRS shift cOR 2.79 at 3 hours and 1.98 at 6 hours [[Saver2016]]. An AI LVO alert cut door-to-groin by 11.2 minutes in a cluster trial of 243 people [[MartinezGutierrez2023]], and door-to-puncture for transferred people was 141 vs 185 minutes with AI in an observational study [[Elijovich2022]]. No door-to-groin benchmark appears in the sources read here.`,
  pt:`A thin tube is passed through an artery to the clot, which is pulled out. Module 3.2 shows it in detail.`}
];
const IM_MINS=[ [0,0],[1/6,8],[2/6,20],[3/6,38],[4/6,44],[5/6,52],[1,85] ];
const IM_MARKS=[{m:25,l:'imaging 25'},{m:45,l:'needle 45'},{m:60,l:'needle 60'}];
const IM_CM={
 any:{cap:`<b>Any acute stroke.</b> Prospective comparison in 356 people with suspected stroke, 217 with a final diagnosis of stroke. MRI 83% (95% CI 78 to 88), CT 26% (20 to 32) [[Chalela2007]].`,rows:[{l:'MRI',v:83,txt:'83%'},{l:'CT',v:26,txt:'26%',col:'var(--muted)'}]},
 early:{cap:`<b>Acute ischaemic stroke detected, scanned within 3 hours.</b> MRI 46%, CT 7% (6 of 90). Across all scan times: 46% vs 10% [[Chalela2007]].`,rows:[{l:'MRI',v:46,txt:'46%'},{l:'CT',v:7,txt:'7%',col:'var(--muted)'}]},
 post:{cap:`<b>Posterior fossa.</b> Non-contrast CT sensitivity 41.8% (95% CI 30.1 to 54.4), in 67 people who all had restricted diffusion on MRI, so MRI is the reference here and has no bar [[Hwang2012]].`,rows:[{l:'CT',v:41.8,txt:'41.8%',col:'var(--muted)'}]},
 coch:{cap:`<b>Cochrane.</b> DWI sensitivity 0.99 (95% CI 0.23 to 1.00), CT 0.39 (0.16 to 0.69), specificity 0.92 and 1.00. The very wide CI shows how uncertain this is. The review warned of narrow patient spectrum, small samples and incorporation bias [[Brazzelli2009]].`,rows:[{l:'DWI, pooled',v:99,txt:'0.99'},{l:'CT, pooled',v:39,txt:'0.39',col:'var(--muted)'}]}
};
const IM_DN={
 hel:{unit:'median minutes',cap:`<b>Helsinki.</b> In 2011, 31% of admitted people with ischaemic stroke had tPA, 94% of those within 60 minutes [[Meretoja2012]].`,bars:[['1998',105],['2003',60],['2011',20]]},
 tgt:{unit:'median minutes',cap:`<b>Target: Stroke</b>, phases I and II, 154,221 people. Share within 60 minutes 26.4%, 42.7%, 68.6%; within 45 minutes 10.1%, 17.7%, 41.4% [[Xian2022]]. Phase I alone took in-hospital mortality from 9.93% to 8.25% [[Fonarow2014]]. A second survey (888 hospitals) found a median of 56 minutes [[Xian2017]].`,bars:[['Before',78],['Phase I',66],['Phase II',50]]},
 mel:{unit:'median minutes',cap:`<b>Melbourne</b> adopted the Helsinki model within 4 months. In-hours fell from 43 to 25 minutes (p=0.009); out-of-hours was unchanged, 67 and 62 minutes [[Meretoja2013]].`,bars:[['In-hours, before',43],['In-hours, after',25],['Out-of-hours, before',67],['Out-of-hours, after',62]]},
 chc:{unit:'median minutes',cap:`<b>Christchurch.</b> Overall median 87 to 40 minutes, in-hours 34. Door-to-CT fell from 49 to 19 minutes and CT-to-needle from 32 to 20 [[Wu2018]].`,bars:[['Overall, before',87],['Overall, after',40],['In-hours, after',34]]}
};
function imPiece(P,t){for(let i=1;i<P.length;i++)if(t<=P[i][0]){const a=P[i-1],b=P[i];return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return P[P.length-1][1]}
inits.imaging=()=>{
  /* ---------- main pathway ---------- */
  const svg=$('#imSvg'),rg=$('#imT'),note=$('#imNote');let setSt=()=>{};
  function scan(p,u,x,y,s,t){let g='';const w=240*s,h=300*s;
    if(p===0){g+=brainAxial(x,y,s,{mode:'plain',orient:true}).svg;const q=(u*3)%1;
      g+=`<circle cx="${f1(x+w/2)}" cy="${f1(y+h/2)}" r="${f1(30+q*30)}" style="fill:none;stroke:var(--dx);stroke-width:2.5;opacity:${f1(1-q)}"/><circle cx="${f1(x+w/2)}" cy="${f1(y+h/2)}" r="26" style="fill:var(--panel);stroke:var(--dx);stroke-width:2"/><text x="${f1(x+w/2)}" y="${f1(y+h/2+9)}" class="t-big t-mid" style="font-size:28px">?</text>`}
    else if(p===1){const a=ramp(u,.42,.56);
      g+=brainAxial(x,y,s,{mode:'ct',side:'L',core:.2,orient:true}).svg;
      g+=`<g style="opacity:${f1(1-a)}">${brainAxial(x,y,s,{mode:'ct',side:'L',bleed:{r:26,oedema:.3}}).svg}</g>`;
      g+=kitLabel(x+w/2,y+h-10,a<.5?'if bleeding: blood is white':'no blood: early signs are faint',{a:'m'})}
    else if(p===2){g+=brainAxial(x,y,s,{mode:'plain',side:'L',core:.16,penumbra:.42,orient:true}).svg;
      const bx=x+w-30,by=y+6;g+=`<rect x="${f1(bx)}" y="${f1(by)}" width="22" height="30" rx="4" style="fill:var(--panel);stroke:var(--tpa);stroke-width:1.6"/><rect x="${f1(bx+2)}" y="${f1(by+10+u*10)}" width="18" height="${f1(18-u*10)}" rx="2" style="fill:var(--tpa);opacity:.7"/>`;
      for(let i=0;i<5;i++){const q=((u*4+i/5)%1);g+=`<circle cx="${f1(bx+11)}" cy="${f1(by+32+q*(h-46))}" r="2.2" style="fill:var(--tpa);opacity:${f1(Math.min(1,(1-q)*3))}"/>`}
      g+=`<line x1="${f1(bx+11)}" x2="${f1(bx+11)}" y1="${f1(by+30)}" y2="${f1(by+h-16)}" style="stroke:var(--tpa);stroke-width:1;opacity:.6"/>`}
    else if(p===3){g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(10*s)}" style="fill:var(--scan-bg)"/>`;
      const ws=(w-12)/300,wy=y+(h-262*ws)/2,W=willis(x+6,wy,ws,{block:{'M1-L':ramp(u,.1,.5)},flow:1,ph:t*30,hl:['M1-L']});g+=W.svg;
      const a=W.at['M1-L'];if(u>.45)g+=kitLabel(a[0],a[1]-16,'clot in M1',{a:'m'})}
    else if(p===4){const c=lerp(.1,.2,ramp(u,0,.6)),pn=lerp(.2,.54,ramp(u,0,.6)),A=brainAxial(x,y,s,{mode:'plain',side:'L',core:c,penumbra:pn,orient:true});g+=A.svg;
      const a=A.at.core;g+=kitLabel(a[0],a[1]+4,'core',{a:'m'});if(u>.4)g+=kitLabel(a[0]-40*s,a[1]-46*s,'penumbra',{a:'m'})}
    else{g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
      g+=catheterStent(x+6,y+h*.32,w-12,{h:70,deploy:ramp(u,.08,.5),retract:ramp(u,.55,.95),ph:t*30}).svg;
      g+=kitLabel(x+w/2,y+h*.32-12,u<.5?'stent retriever opens in the clot':'clot drawn back into the catheter',{a:'m'});
      g+=kitLabel(x+w/2,y+h*.32+100,'flow left to right, schematic',{a:'m'})}
    return g}
  function draw(t){const N=vb(svg,'720 430','400 570'),p=phaseOf(IM_STEPS,t),P=IM_STEPS[p],u=clamp((t-P.from)*6),mins=imPiece(IM_MINS,t);
    const L=N?{sx:24,sw:352,sy:26,ax:12,ay:76,as:.8,cx:306,cy:150,cr:58,qx:14,qy:356,qn:50,bx:20,bw:360,by:526}:{sx:40,sw:640,sy:26,ax:16,ay:84,as:.87,cx:318,cy:170,cr:62,qx:408,qy:116,qn:40,bx:40,bw:640,by:392};
    let g='';
    /* stations */
    const dx=L.sw/5;g+=`<line x1="${L.sx}" x2="${L.sx+L.sw}" y1="${L.sy}" y2="${L.sy}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${L.sx}" x2="${f1(L.sx+L.sw*clamp((p+u)/5))}" y1="${L.sy}" y2="${L.sy}" style="stroke:var(--dx);stroke-width:4;stroke-linecap:round"/>`;
    IM_STEPS.forEach((q,i)=>{const x=L.sx+i*dx,on=i===p,done=i<p;g+=`<circle cx="${f1(x)}" cy="${L.sy}" r="${on?9:6}" style="fill:${on||done?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:2"/><text x="${f1(x)}" y="${L.sy+(N?24:26)}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.st}</text>`});
    /* scan */
    g+=`<text x="${L.ax}" y="${L.ay-6}" class="t-lbl">${P.scan}</text><g style="opacity:${f1(ramp(u,0,.08))}">${scan(p,u,L.ax,L.ay,L.as,t)}</g>`;
    /* clock */
    g+=clock(L.cx,L.cy,L.cr,mins,{col:'var(--dx)'});
    g+=`<text x="${L.cx}" y="${L.cy+L.cr+24}" class="t-big t-mid" style="font-size:22px">${Math.round(mins)} min</text><text x="${L.cx}" y="${L.cy+L.cr+40}" class="t-xs t-mid">since the door, schematic</text>`;
    /* the question */
    const ql=sgLines(P.q,L.qn);g+=`<text x="${L.qx}" y="${L.qy-22}" class="t-xs" style="letter-spacing:.1em">THE QUESTION HERE</text>`;
    ql.forEach((q,i)=>{g+=`<text x="${L.qx}" y="${L.qy+i*21}" class="t-lbl" style="font-weight:500">${q}</text>`});
    /* time bar */
    const X=v=>L.bx+L.bw*v/90;g+=`<rect x="${L.bx}" y="${L.by-5}" width="${L.bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${L.by-5}" width="${f1(X(mins)-L.bx)}" height="10" rx="5" style="fill:var(--dx)"/>`;
    [0,15,30,45,60,75,90].forEach(v=>{g+=`<text x="${f1(X(v))}" y="${L.by+20}" class="t-xs t-mid">${v}</text>`});
    IM_MARKS.forEach(M=>{const hit=mins>=M.m;g+=`<line x1="${f1(X(M.m))}" x2="${f1(X(M.m))}" y1="${L.by-16}" y2="${L.by+8}" style="stroke:${hit?'var(--ink)':'var(--muted)'};stroke-width:2"/><text x="${f1(X(M.m))}" y="${L.by-21}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${hit?700:500}">${M.l}</text>`});
    svg.innerHTML=g;note.innerHTML=noteHTML(P);setSt(p)}
  const stop=playWire(rg,$('#imPlay'),draw,28000,'%t:player.replay%','imaging');
  setSt=stepWire($('#imSteps'),IM_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- CT or MRI ---------- */
  const cm=$('#imCm'),cc=$('#imCmCap');let ck='any',cS=null;
  function drawCm(q=1){const N=vb(cm,'720 280','400 350'),D=IM_CM[ck],s=N?.72:.72,y=24;let g='';
    const x1=N?14:12,x2=N?214:196;
    g+=`<text x="${x1}" y="16" class="t-lbl">CT</text><text x="${x2}" y="16" class="t-lbl">DWI MRI</text>`;
    g+=brainAxial(x1,y,s,{mode:'ct',side:'L',core:.22}).svg+brainAxial(x2,y,s,{mode:'dwi',side:'L',core:.22}).svg;
    const R=N?sgHB(14,y+230,372,D.rows,{N,p:q,rhN:42,pad:60}):sgHB(380,70,330,D.rows,{N,lw:90,p:q,rh:40,pad:56});g+=R.svg;
    cm.innerHTML=g;cc.innerHTML=D.cap}
  $$('[data-imc]').forEach(b=>b.addEventListener('click',()=>{ck=b.dataset.imc;$$('[data-imc]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(cS)cS();cS=animate(700,drawCm,()=>{cS=null})}));
  drawCm(1);

  /* ---------- ASPECTS ---------- */
  const as=$('#imAsp'),an=$('#imAspNote'),ab=$('#imAspBtns'),mk=new Set();let aMode='plain',aSide='L',aHl=null,ids=[],regs={};
  function drawAsp(refocus){const N=vb(as,'520 340','400 670');
    const A=N?aspects(80,8,1,{layout:'col',side:aSide,mode:aMode,marked:mk,hl:aHl,clickable:true}):aspects(10,8,1,{side:aSide,mode:aMode,marked:mk,hl:aHl,clickable:true});
    as.innerHTML=A.svg;ids=A.ids;regs=A.regions;
    if(!ab.children.length)ab.innerHTML=ids.map(k=>`<button class="btn" data-imar="${k}" aria-pressed="false" aria-label="${k}, ${regs[k].name}">${k}</button>`).join('');
    $$('[data-imar]',ab).forEach(b=>b.setAttribute('aria-pressed',mk.has(b.dataset.imar)));
    const score=10-mk.size,h=aHl&&regs[aHl];
    an.innerHTML=`<div class="kicker">ASPECTS, teaching score</div><div class="big-num" aria-label="Score ${score} of 10">${score} <small style="font-size:20px">/ 10</small></div><div class="imcells" aria-hidden="true">${ids.map(k=>`<span class="${mk.has(k)?'off':''}">${k}</span>`).join('')}</div>`+
      `<p>${mk.size?`${mk.size} of 10 regions marked as showing early ischaemic change: ${ids.filter(k=>mk.has(k)).map(k=>regs[k].name).join(', ')}.`:'No region marked: this is how a normal scan scores, 10.'}</p>`+
      `${h?`<p><b>${aHl}</b> is the ${h.name}. ${aHl==='M4'||aHl==='M5'||aHl==='M6'?'It lies about 2 cm above the level of the basal ganglia cuts':'It is read at the level of the basal ganglia'} [[Pexman2001]].</p>`:''}`+
      `<div class="hook"><b>Exam hook</b>ASPECTS: 10 regions, 10 is normal, subtract 1 per region; poor outcome rises sharply at 7 or less [[Pexman2001]].</div>`;
    if(refocus){const el=$(`[data-asp="${refocus}"]`,as);if(el)el.focus({preventScroll:true})}}
  function tog(k,foc){if(mk.has(k))mk.delete(k);else mk.add(k);aHl=k;drawAsp(foc?k:null)}
  as.addEventListener('click',e=>{const r=e.target.closest('[data-asp]');if(r)tog(r.dataset.asp,true)});
  as.addEventListener('keydown',e=>{const r=e.target.closest('[data-asp]');if(r&&(e.key==='Enter'||e.key===' ')){e.preventDefault();tog(r.dataset.asp,true)}});
  ab.addEventListener('click',e=>{const b=e.target.closest('[data-imar]');if(b)tog(b.dataset.imar,false)});
  $$('[data-imam]').forEach(b=>b.addEventListener('click',()=>{aMode=b.dataset.imam;$$('[data-imam]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawAsp()}));
  $$('[data-imas]').forEach(b=>b.addEventListener('click',()=>{aSide=b.dataset.imas;$$('[data-imas]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawAsp()}));
  $('#imAspClear').addEventListener('click',()=>{mk.clear();aHl=null;drawAsp()});
  drawAsp();

  /* ---------- mismatch explorer ---------- */
  const mm=$('#imMm'),mn=$('#imMmNote'),I={core:$('#imCore'),pen:$('#imPen'),age:$('#imAge'),nih:$('#imNih'),hrs:$('#imHrs'),occ:$('#imOcc')};
  const row=(ok,txt)=>`<li><b class="${ok?'y':'n'}">${ok?'inside':'outside'}</b><span>${txt}</span></li>`;
  function drawMm(){const N=vb(mm,'720 320','400 560'),c=+I.core.value,pn=+I.pen.value,age=+I.age.value,nih=+I.nih.value,hrs=+I.hrs.value,occ=I.occ.checked,tot=c+pn,ratio=c>0?tot/c:Infinity;
    $('#imCoreV').textContent=c+' mL';$('#imPenV').textContent=pn+' mL';$('#imAgeV').textContent=age+' years';$('#imNihV').textContent=nih;$('#imHrsV').textContent=hrs+' h';
    const L=N?{ax:92,ay:6,s:.72,bx:20,bw:360,y1:252,y2:376,yv:492}:{ax:14,ay:14,s:.96,bx:280,bw:420,y1:40,y2:164,yv:268};
    const fr=v=>clamp(.8*Math.sqrt(v/220),0,.99);
    const A=brainAxial(L.ax,L.ay,L.s,{mode:'plain',side:'L',core:c?Math.max(.05,fr(c)):0,penumbra:tot?Math.max(.06,fr(tot)):0,orient:true});let g=A.svg;
    /* core bar with the quoted limits */
    const X1=v=>L.bx+L.bw*v/150,y1=L.y1;
    g+=`<text x="${L.bx}" y="${y1-14}" class="t-lbl">Core ${c} mL</text><rect x="${L.bx}" y="${y1}" width="${L.bw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y1}" width="${f1(Math.max(0,X1(c)-L.bx))}" height="18" rx="4" style="fill:var(--core)"/>`;
    [[21,'21'],[31,'31'],[51,'51'],[70,'70']].forEach(([v,l])=>{g+=`<line x1="${f1(X1(v))}" x2="${f1(X1(v))}" y1="${y1-5}" y2="${y1+24}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X1(v))}" y="${y1+37}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${l}</text>`});
    g+=`<text x="${L.bx}" y="${y1+54}" class="t-xs">21, 31, 51: DAWN limits, as quoted. 70: DEFUSE 3.</text>`;
    /* core plus penumbra */
    const X2=v=>L.bx+L.bw*v/350,y2=L.y2;
    g+=`<text x="${L.bx}" y="${y2-14}" class="t-lbl">Core + penumbra ${tot} mL</text><rect x="${L.bx}" y="${y2}" width="${L.bw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y2}" width="${f1(X2(tot)-L.bx)}" height="18" rx="4" style="fill:var(--penumbra)"/><rect x="${L.bx}" y="${y2}" width="${f1(X2(c)-L.bx)}" height="18" rx="4" style="fill:var(--core)"/>`;
    g+=`<text x="${L.bx}" y="${y2+36}" class="t-sm" style="fill:var(--ink)">red: core. amber: penumbra ${pn} mL</text>`;
    g+=`<text x="${L.bx}" y="${L.yv}" class="t-big" style="font-size:20px">Mismatch ratio ${c>0?ratio.toFixed(1):'not defined, core 0'}</text><text x="${L.bx}" y="${L.yv+18}" class="t-xs">(core + penumbra) divided by core</text>`;
    mm.innerHTML=g;
    const dfW=hrs>=6&&hrs<=16,dfC=c<70,dfR=c>0?ratio>=1.8:pn>0,dfP=pn>=15,dfAll=dfW&&dfC&&dfR&&dfP&&occ;
    const dW=hrs>=6&&hrs<=24,g1=age>=80&&nih>=10&&c<21,g2=age<80&&nih>=10&&c<31,g3=age<80&&nih>=20&&c<51,dAll=dW&&(g1||g2||g3);
    mn.innerHTML=`<div class="kicker">Against the criteria as quoted</div><h4>DEFUSE 3: ${dfAll?'inside':'outside'}</h4><ul class="imchk">${row(dfW,'6 to 16 hours')}${row(occ,'ICA or proximal MCA occlusion')}${row(dfC,'Core below 70 mL')}${row(dfR,'Ratio 1.8 or more')}${row(dfP,'Penumbra 15 mL or more')}</ul>`+
      `<h4>DAWN: ${dAll?'inside':'outside'}</h4><ul class="imchk">${row(dW,'6 to 24 hours')}${row(g1,'Age 80 or over, NIHSS 10 or more, core below 21 mL')}${row(g2,'Under 80, NIHSS 10 or more, core below 31 mL')}${row(g3,'Under 80, NIHSS 20 or more, core below 51 mL')}</ul><p class="imcap">DAWN needs its window and any one of the three groups. Sources: [[Albers2018,Ordonez2026]]. Inside or outside a trial's quoted criteria says nothing about any one person.</p>`}
  Object.values(I).forEach(el=>el.addEventListener('input',drawMm));I.occ.addEventListener('change',drawMm);
  drawMm();

  /* ---------- DWI-FLAIR ---------- */
  const df=$('#imDf');
  function drawDf(t){const N=vb(df,'720 310','400 340'),hrs=t*12,f=ramp(hrs,3.4,5.6),c=lerp(.2,.3,ramp(hrs,0,8)),s=N?.74:.86,y=28,x1=N?14:30,x2=N?208:284;let g='';
    g+=`<text x="${x1}" y="18" class="t-lbl">DWI</text><text x="${x2}" y="18" class="t-lbl">FLAIR</text>`;
    g+=brainAxial(x1,y,s,{mode:'dwi',side:'L',core:c}).svg;
    /* FLAIR: the same base slice, with the bright lesion fading in over it */
    g+=brainAxial(x2,y,s,{mode:'dwi',side:'L'}).svg+`<g style="opacity:${f1(f)}">${brainAxial(x2,y,s,{mode:'dwi',side:'L',core:c}).svg}</g>`;
    const mis=f<.5,tx=N?14:520,ty=N?y+300*s+16:80,v=mis?'Lesion on DWI, not on FLAIR':'Lesion on both';
    if(N)g+=`<text x="${tx}" y="${ty}" class="t-big" style="fill:${mis?'var(--good)':'var(--warn)'}">${hrs.toFixed(1)} h: ${v}</text>`;
    else{g+=`<text x="${tx}" y="${ty}" class="t-big" style="font-size:30px">${hrs.toFixed(1)} h</text><text x="${tx}" y="${ty+18}" class="t-xs">schematic hours since onset</text>`;
      sgLines(v,22).forEach((q,i)=>{g+=`<text x="${tx}" y="${ty+50+i*20}" class="t-big" style="fill:${mis?'var(--good)':'var(--warn)'}">${q}</text>`});
      g+=`<text x="${tx}" y="${ty+100}" class="t-sm" style="fill:var(--ink)">${mis?'suggests under about 4.5 h':'suggests over about 4.5 h'}</text>`}
    df.innerHTML=g}
  playWire($('#imDfT'),$('#imDfPlay'),drawDf,12000,'%t:player.replay%','imaging');
  drawDf(+$('#imDfT').value);

  /* ---------- door-to-needle ---------- */
  const dn=$('#imDn'),dc=$('#imDnCap');let dk='hel',dS=null;
  function drawDn(q=1){const N=vb(dn,'720 300','400 320'),D=IM_DN[dk],W=N?400:720,x0=N?38:60,x1=W-14,y0=24,y1=N?240:230,B=D.bars,Y=v=>y1-(y1-y0)*v/120;let g='';
    [0,30,60,90,120].forEach(v=>{g+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    g+=`<text x="${x0}" y="12" class="t-xs">${D.unit}, door to needle</text>`;
    g+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(60))}" y2="${f1(Y(60))}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:5 4"/><text x="${x1}" y="${f1(Y(60)-5)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">60 min</text>`;
    const bw=(x1-x0)/B.length;B.forEach((b,i)=>{const v=b[1]*ease(clamp(q*1.2-i*.08)),x=x0+bw*i+bw*.2,w=bw*.6;
      g+=`<rect x="${f1(x)}" y="${f1(Y(v))}" width="${f1(w)}" height="${f1(y1-Y(v))}" rx="4" style="fill:var(--dx)"/><text x="${f1(x+w/2)}" y="${f1(Y(v)-6)}" class="t-lbl t-mid">${Math.round(v)}</text>`;
      sgLines(b[0],N?10:18).forEach((l,j)=>{g+=`<text x="${f1(x+w/2)}" y="${f1(y1+15+j*12)}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`})});
    dn.innerHTML=g;dc.innerHTML=D.cap}
  $$('[data-imd]').forEach(b=>b.addEventListener('click',()=>{dk=b.dataset.imd;$$('[data-imd]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(dS)dS();dS=animate(800,drawDn,()=>{dS=null})}));
  drawDn(1);
  redraws.imaging=(f=>()=>{f&&f();drawCm(1);drawAsp();drawMm();drawDn(1)})(redraws.imaging);
};
