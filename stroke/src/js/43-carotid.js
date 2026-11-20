/* =============== 4.3 Carotid disease and PFO =============== */
/* Widgets: plaque growth with NASCET and ECST measures (main scrubber), a measuring tool, NNT icon arrays,
   asymptomatic trial bars, RoPE points with stratum panels, PASCAL forest (pvForest from module prevent). */
const CRT_STEPS=[
 {from:0,at:.05,k:'Step 1 · the bifurcation',t:'A healthy bifurcation',
  txt:'The common carotid artery (CCA) divides in the neck into the internal carotid (ICA), which widens into a bulb and supplies the brain, and the external carotid (ECA). Trials of surgery asked which narrowings of the ICA are worth treating [[Barnett1991,ECST1998]].',
  pt:'Two big arteries in your neck carry blood to the brain. Each one splits in two, and this split is where a narrowing is measured.'},
 {from:.1,at:.22,k:'Step 2 · plaque',t:'Plaque narrows the bulb',
  txt:'As plaque builds on the far wall of the bulb, the channel for blood gets smaller. In NASCET, people with 70 to 99% stenosis who had medical treatment alone had a 26% risk of ipsilateral stroke at 2 years [[Barnett1991]].',
  pt:'Fatty build-up narrows the artery. How narrow it is, and whether it has caused symptoms, shapes what the trials found.'},
 {from:.34,at:.52,k:'Step 3 · NASCET',t:'Measuring the NASCET way',
  txt:'NASCET compares the narrowest lumen (N) with the normal ICA well beyond the bulb (D): stenosis = (1 - N/D) x 100. The percentage shown is computed from the drawing itself, so it shows the geometry and is not a clinical measurement.',
  hook:'NASCET: narrowest lumen against normal distal ICA. Below 50% there was no benefit (14.9% vs 18.7%, P=0.16) [[Barnett1998]].'},
 {from:.72,at:.8,k:'Step 4 · ECST',t:'The same lesion, another number',
  txt:'ECST estimated the original width of the bulb (E) as its reference. The same narrowing then gives a bigger percentage. On its own measure, surgery was worthwhile above about 80%: 3-year major stroke or death 26.5% control vs 14.9% surgery. Its surgical risk was 7.0% [[ECST1998]]. Re-measuring ECST angiograms the NASCET way gave highly consistent results [[Rothwell2003]].',
  hook:'NASCET and ECST measure differently, so always ask which method a percentage uses [[Rothwell2003]].'},
 {from:.86,at:.95,k:'Step 5 · pooled benefit',t:'Benefit by band',
  txt:'Pooled across 6092 people with symptomatic stenosis, the 5-year absolute reduction in ipsilateral ischaemic stroke was -2.2% below 30% (harm), 3.2% at 30 to 49%, 4.6% at 50 to 69% and 16.0% at 70% or more without near-occlusion. For near-occlusion it was 5.6% at 2 years and -1.7% at 5 years [[Rothwell2003]].',
  pt:'If a neck artery is badly narrowed and has caused symptoms, surgery helped most. With a mild narrowing it did not help, and below 30% it did harm.',
  hook:'Symptomatic carotid: 70% or more gives 16% absolute 5-year gain, 50 to 69% gives 4.6%, below 30% is harmed [[Rothwell2003]].'}];
const CRT_BANDS=[{l:'below 30%',v:-2.2,a:0,b:30},{l:'30 to 49%',v:3.2,a:30,b:50},{l:'50 to 69%',v:4.6,a:50,b:70},{l:'70% or more',v:16,a:70,b:101},{l:'near-occlusion',v:-1.7,a:-1,b:-1}];
const CRT_NNT={time:{n:'Time since last event',a:['Within 2 weeks',5],b:['After more than 12 weeks',125]},sex:{n:'Sex',a:['Men',9],b:['Women',36]},age:{n:'Age',a:['75 or over',5],b:['Under 65',18]}};
const CRT_ASY=[
 {l:'ACAS, 5 years',s:'60% or more',bars:[ ['surgery',5.1],['medical',11.0] ]},
 {l:'ACST-1, 5 years, net',s:'includes 3.1% perioperative',bars:[ ['surgery',6.4],['deferral',11.8] ]},
 {l:'ACST-1, 10 years, net',s:'gain 4.6% (1.2 to 7.9)',bars:[ ['surgery',13.4],['deferral',17.9] ]},
 {l:'SPACE-2, stopped early',s:'513 of 3640 planned',bars:[ ['surgery',2.5],['stenting',4.4],['medical',3.1] ]},
 {l:'CREST-2 stenting, 4 years',s:'P=0.02',bars:[ ['stenting',2.8],['medical',6.0] ]},
 {l:'CREST-2 surgery, 4 years',s:'P=0.24',bars:[ ['surgery',3.7],['medical',5.3] ]}];
const CRT_ROPE=[{id:'nh',l:'No hypertension'},{id:'nd',l:'No diabetes'},{id:'ns',l:'No prior stroke or TIA'},{id:'nm',l:'Non-smoker'},{id:'co',l:'Cortical infarct on imaging'}];
const CRT_AGE=[ ['18 to 29',5],['30 to 39',4],['40 to 49',3],['50 to 59',2],['60 to 69',1],['70 or over',0] ];
const CRT_STR=[{l:'0-3',f:0,r:20},{l:'4',f:38,r:12},{l:'5',f:34,r:7},{l:'6',f:62,r:8},{l:'7',f:72,r:6},{l:'8',f:84,r:6},{l:'9-10',f:88,r:2}];
const CRT_PAS=[
 {l:'Unlikely',txt:'HR 1.14 (0.53 to 2.46)',v:1.14,lo:.53,hi:2.46,arr:'-0.7%',af:'4.41%',sh:'14.6%',st5:'0.4% more strokes',af5:'4.6% more',why:'Neither high RoPE nor a high-risk feature.'},
 {l:'Possible',txt:'HR 0.38 (0.22 to 0.65)',v:.38,lo:.22,hi:.65,arr:'2.1%',af:'1.53%',sh:'48.4%',st5:'3.4% fewer strokes',af5:'1.1% more',why:'One of the two is present.'},
 {l:'Probable',txt:'HR 0.10 (0.03 to 0.35)',v:.10,lo:.03,hi:.35,arr:'2.1%',af:'0.65%',sh:'37.0%',st5:'2.5% fewer strokes',af5:'1.3% more',why:'Both are present.'}];
inits.carotid=()=>{
  /* ---------- plaque and the measures ---------- */
  const svg=$('#caSvg'),rg=$('#caT');
  function draw(t){const N=vb(svg,'720 424','400 606'),st=.9*ease(ramp(t,.1,.7)),na=t>=.34,ec=t>=.72,G=carotidBif(N?100:34,N?6:22,N?1.15:1.5,{stenosis:st,flow:1,ph:t*8,nascet:na,ecst:ec,labels:true});
    let s=G.svg;const pc=Math.max(0,(1-G.n/G.d)*100),pe=Math.max(0,(1-G.n/G.e)*100),x=N?12:330;
    let y=N?316:30;
    if(!na){s+=`<text x="${x}" y="${y}" class="t-lbl">Plaque: ${st>.02?'narrowing the bulb':'none yet'}</text><text x="${x}" y="${y+18}" class="t-sm">Scrub on to measure it.</text>`}
    else{s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">N narrowest lumen: ${G.n.toFixed(1)} px on this drawing</text><text x="${x}" y="${y+16}" class="t-sm" style="fill:var(--ink)">D normal distal ICA: ${G.d.toFixed(1)} px</text>`;
      if(ec)s+=`<text x="${x}" y="${y+32}" class="t-sm" style="fill:var(--ink)">E estimated bulb width: ${G.e.toFixed(1)} px</text>`;
      s+=`<text x="${x}" y="${y+60}" class="t-big" style="font-size:22px">NASCET ${Math.round(pc)}%</text>`;
      if(ec)s+=`<text x="${x+(N?190:190)}" y="${y+60}" class="t-big" style="font-size:22px">ECST ${Math.round(pe)}%</text>`}
    /* band chart */
    const cy=N?402:138,z=N?136:462,k=N?11:13,rh=N?33:36,cur=CRT_BANDS.findIndex(b=>pc>=b.a&&pc<b.b);
    s+=`<text x="${x}" y="${cy-4}" class="t-sm">5-year absolute reduction with surgery, % points</text>`;
    const Xv=v=>z+k*v;
    s+=`<line x1="${z}" x2="${z}" y1="${cy+4}" y2="${cy+6+rh*5}" style="stroke:var(--ink);stroke-width:1.2"/>`;
    CRT_BANDS.forEach((b,i)=>{const yy=cy+6+i*rh,on=na&&i===cur,a=Math.min(z,Xv(b.v)),w=Math.abs(k*b.v),reveal=t>=.86?1:.45;
      s+=`<rect x="${x-4}" y="${yy}" width="${N?380:386}" height="${rh-3}" rx="5" style="fill:${on?'var(--prev-soft)':'none'}"/><text x="${x}" y="${yy+rh/2+2}" class="${on?'t-lbl':'t-sm'}" style="${on?'':'fill:var(--ink)'}">${b.l}</text>`;
      s+=`<rect x="${f1(a)}" y="${yy+6}" width="${f1(w)}" height="${rh-15}" rx="2" style="fill:${b.v<0?'var(--core)':'var(--prev)'};opacity:${reveal}"/><text x="${f1(b.v<0?z+6:Xv(b.v)+5)}" y="${yy+rh/2+2}" class="t-sm" style="fill:var(--ink)">${b.v>0?'':'-'}${Math.abs(b.v).toFixed(1)}</text>`});
    svg.innerHTML=s;const p=phaseOf(CRT_STEPS,t);setSt(p);$('#caNote').innerHTML=noteHTML(CRT_STEPS[p])}
  const stop=playWire(rg,$('#caPlay'),draw,16000,'Replay','carotid');
  const setSt=stepWire($('#caSteps'),CRT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the measuring tool ---------- */
  const ms=$('#caMeas'),iN=$('#caN'),iD=$('#caD'),iE=$('#caE');
  function drawMeas(){const NN=vb(ms,'720 176','400 268'),n=+iN.value,d=+iD.value,e=+iE.value,x=NN?12:20,sc=NN?30:42,rh=44;
    const nas=Math.max(0,(1-n/d)*100),ecs=Math.max(0,(1-n/e)*100);
    const R=[ ['N, narrowest lumen',n,'var(--core)'],['D, normal distal ICA',d,'var(--device)'],['E, estimated bulb',e,'var(--device)']];let s='';
    R.forEach((r,i)=>{const y=8+i*(NN?46:rh);s+=`<text x="${x}" y="${y+10}" class="t-sm" style="fill:var(--ink)">${r[0]}: ${r[1].toFixed(1)}</text><rect x="${x}" y="${y+15}" width="${f1(r[1]*sc)}" height="16" rx="3" style="fill:${r[2]}"/>`});
    const rx=NN?12:540,ry=NN?174:44;
    s+=`<text x="${rx}" y="${ry}" class="t-big" style="font-size:22px">NASCET ${Math.round(nas)}%</text><text x="${rx}" y="${ry+34}" class="t-big" style="font-size:22px">ECST ${Math.round(ecs)}%</text>`;
    s+=`<text x="${rx}" y="${ry+56}" class="t-xs">${n>d?'N wider than D: reads as 0%':'(1 - N/D) and (1 - N/E), x 100'}</text>`;
    ms.innerHTML=s;
    const b=CRT_BANDS.find(k=>nas>=k.a&&nas<k.b)||CRT_BANDS[0];
    $('#caMeasOut').innerHTML=`<b>NASCET band: ${b.l}.</b> In the pooled symptomatic trials, this band had a 5-year absolute reduction of ${b.v.toFixed(1)} percentage points in ipsilateral ischaemic stroke with surgery [[Rothwell2003]]. Population figure, not a result for anyone. Near-occlusion cannot be detected from this sum and was analysed apart.`}
  [iN,iD,iE].forEach(i=>i.addEventListener('input',drawMeas));drawMeas();

  /* ---------- NNT ---------- */
  const nt=$('#caNnt');let nk='time',nStop=null;
  function drawNnt(p){const N=vb(nt,'720 112','400 176'),D=CRT_NNT[nk],z=11,A=N?[20,24]:[16,24],B=N?[20,86]:[372,24];
    const blk=(P,r)=>{const n=r[1],k=Math.ceil(n*ease(p)),I=icons(P[0],P[1]+6,{n:k,cols:25,k:1,size:z,gap:2,col:'var(--bad)',base:'var(--device)'});
      return `<text x="${P[0]}" y="${P[1]-8}" class="t-sm" style="fill:var(--ink)">${r[0]}: NNT ${n}</text>${I.svg}`};
    nt.innerHTML=blk(A,D.a)+blk(B,D.b)}
  function setNnt(k){nk=k;$$('[data-can]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.can===k));if(nStop)nStop();nStop=animate(1100,drawNnt,()=>{nStop=null})}
  $$('[data-can]').forEach(b=>b.addEventListener('click',()=>setNnt(b.dataset.can)));
  drawNnt(1);

  /* ---------- asymptomatic ---------- */
  const az=$('#caAsy'),arg=$('#caAsyT');
  function drawAsy(t){const N=vb(az,'720 296','400 398'),x0=N?12:214,sc=N?15:22;let y=N?8:22,s='';
    if(!N){[0,5,10,15].forEach(v=>{s+=`<line x1="${x0+v*sc}" x2="${x0+v*sc}" y1="14" y2="288" class="grid"/><text x="${x0+v*sc}" y="10" class="t-xs t-mid">${v}%</text>`})}
    CRT_ASY.forEach((r,i)=>{const q=ease(clamp(t*CRT_ASY.length*.95-i));
      s+=`<text x="${N?12:8}" y="${y+10}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.l}</text>`;
      s+=`<text x="${N?388:8}" y="${N?y+10:y+24}" class="t-xs${N?' t-end':''}">${r.s}</text>`;
      let by=N?y+15:y;r.bars.forEach(b=>{const med=b[0]==='medical'||b[0]==='deferral',w=b[1]*sc*q;
        s+=`<rect x="${x0}" y="${by}" width="${f1(w)}" height="11" rx="2" style="${med?'fill:var(--device)':'fill:var(--prev)'}"/>`;
        if(q>.1)s+=`<text x="${f1(x0+w+5)}" y="${by+9.5}" class="t-xs" style="fill:var(--ink);opacity:${f1(q)}">${b[0]} ${b[1].toFixed(1)}%</text>`;by+=14});
      y=by+(N?9:9)});
    az.innerHTML=s}
  playWire(arg,$('#caAsyPlay'),drawAsy,8000,'Replay','carotid');drawAsy(+arg.value);

  /* ---------- RoPE ---------- */
  const ro=$('#caRope'),st={nh:true,nd:true,ns:true,nm:true,co:true,age:3,fe:false};let shown=0,rStop=null,view=null;
  const rope=()=>CRT_ROPE.reduce((a,i)=>a+(st[i.id]?1:0),0)+CRT_AGE[st.age][1];
  const strat=s=>s<=3?0:s>=9?6:s-3;
  function drawRope(p){const N=vb(ro,'720 280','400 280'),x0=N?12:80,w=N?376:600,bw=w/7,cur=lerp(shown,strat(rope()),ease(p)),pa=[{y:24,h:88,k:'f',t:'PFO-attributable fraction',mx:100},{y:154,h:88,k:'r',t:'2-year stroke or TIA recurrence',mx:25}];let s='';
    s+=`<rect x="${f1(x0+cur*bw+1)}" y="6" width="${f1(bw-2)}" height="256" rx="6" style="fill:var(--prev-soft)"/>`;
    pa.forEach(P=>{s+=`<text x="${x0+4}" y="${P.y-4+(P.k==='r'?0:0)}" class="t-sm" style="fill:var(--ink)">${P.t}</text>`;
      CRT_STR.forEach((c,i)=>{const v=c[P.k],h=P.h*v/P.mx,x=x0+i*bw;
        s+=`<rect x="${f1(x+bw*.2)}" y="${f1(P.y+P.h-h)}" width="${f1(bw*.6)}" height="${f1(h)}" rx="2" style="fill:${P.k==='f'?'var(--prev)':'var(--device)'}"/><text x="${f1(x+bw/2)}" y="${f1(P.y+P.h-h-3+(h<16?0:0))}" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:2.5px">${v}%</text>`});
      s+=`<line x1="${x0}" x2="${x0+w}" y1="${P.y+P.h}" y2="${P.y+P.h}" class="axis"/>`});
    CRT_STR.forEach((c,i)=>{s+=`<text x="${f1(x0+i*bw+bw/2)}" y="258" class="t-sm t-mid" style="fill:var(--ink)">${c.l}</text>`});
    s+=`<text x="${x0+w}" y="276" class="t-xs t-end">RoPE score stratum</text>`;
    ro.innerHTML=s}
  /* ---------- PASCAL ---------- */
  const pz=$('#caPas');
  const cls=()=>{const a=rope()>=7,b=st.fe;return a&&b?2:a||b?1:0};
  function drawPas(){const N=vb(pz,'720 124','400 200'),c=view==null?cls():view,F=pvForest(4,CRT_PAS,{N,W:N?400:720,sel:c,rh:26,min:.025,max:3,ticks:[.05,.1,.25,.5,1,2],lo:'fewer strokes with closure',hi:'more',ax0:110,axW:430});pz.innerHTML=F.svg;
    const P=CRT_PAS[c];$('#caPasOut').innerHTML=`<div class="kicker">PASCAL · ${view==null?'from your inputs':'row chosen'}</div><h4>${P.l}</h4><p>${P.why} RoPE here is ${rope()}, ${rope()>=7?'in the high range (7 or more)':'below 7'}; high-risk feature ${st.fe?'present':'absent'}.</p><p>Closure vs medical therapy, pooled trials: stroke ${P.txt}, 2-year absolute reduction ${P.arr}, added AF beyond day 45 ${P.af} [[Kent2021]]. At 5 years, in ${P.sh} of people: ${P.st5}, late AF ${P.af5} [[Saver2026]].</p>`;
    $$('#caPasTbl tbody tr').forEach((r,i)=>r.classList.toggle('hl',i===c))}
  function setRope(){const S=rope();$$('[data-car]').forEach(b=>b.setAttribute('aria-pressed',!!st[b.dataset.car]));$$('[data-caa]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.caa===st.age));$('#caFe').setAttribute('aria-pressed',st.fe);
    const c=CRT_STR[strat(S)];$('#caRopeOut').innerHTML=`<div class="kicker">How the scale scores these inputs</div><h4>RoPE ${S} of 10</h4><p>In the stratum ${c.l}, the PFO-attributable fraction was ${c.f}% and 2-year recurrence ${c.r}% [[Nouh2016]]. A higher score makes it more likely that the PFO was the cause, and also goes with a lower chance of another stroke.</p>`;
    view=null;drawPas();if(rStop)rStop();const from=shown;rStop=animate(450,p=>{shown=from;drawRope(p)},()=>{shown=strat(S);rStop=null;drawRope(1)})}
  $('#caRopeItems').innerHTML=CRT_ROPE.map(i=>`<button class="btn" data-car="${i.id}" aria-pressed="true">${i.l} +1</button>`).join('');
  $('#caRopeAge').insertAdjacentHTML('beforeend',CRT_AGE.map((a,i)=>`<button class="btn" data-caa="${i}" aria-pressed="false">${a[0]} +${a[1]}</button>`).join(''));
  $('#caRopeBox').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;if(d.car)st[d.car]=!st[d.car];else if(d.caa)st.age=+d.caa;else if(b.id==='caFe')st.fe=!st.fe;else return;setRope()});
  pvRows(pz,'data-fr',i=>{view=i;drawPas()});
  shown=strat(rope());setRope();
  const pr=redraws.carotid;redraws.carotid=()=>{pr&&pr();drawMeas();drawNnt(1);drawRope(1);drawPas()};
};
