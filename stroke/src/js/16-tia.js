/* =============== 1.6 TIA =============== */
/* Main player: a clot forms and clears, symptoms run along a stretched time axis, then a DWI slice and two definitions give
   their labels, for three drawn cases. Then: ABCD2 teaching calculator, early-risk curves, EXPRESS before and after, mimics. */
const TIA_BASE=[{from:0,at:.08,t:'Flow stops'},{from:.16,at:.24,t:'Symptoms start'},{from:.34,at:.4,t:'Flow returns'},{from:.5,at:.64,t:'Symptoms settle'},{from:.82,at:.93,t:'Scan and label'}];
const TIA_C0={k:'All three cases',t:'An artery blocks',txt:'The definition starts from the cause: focal brain, spinal cord or retinal ischaemia [[Easton2009]]. Here a clot stands in for that blockage.',pt:'A TIA is a warning stroke. The symptoms go away and a scan shows no lasting damage [[Easton2009]].'};
const TIA_C1={k:'All three cases',t:'Symptoms start',txt:'A TIA has negative symptoms, maximal at onset, usually lasting under 1 hour [[Nadarajan2014]]. Nothing in this drawing yet shows which case this will become. If you think someone is having a stroke, call your local emergency number.'};
const TIA_TXT={
 tia:[TIA_C0,TIA_C1,
  {k:'Clears, clean scan',t:'The clot clears early',txt:'Flow returns before tissue is lost. In this drawing that takes under an hour, the usual length of a TIA [[Nadarajan2014]].'},
  {k:'Clears, clean scan',t:'Symptoms are gone',txt:'Feeling normal does not mean the risk has gone. 15 to 30% of ischaemic strokes are preceded by a TIA [[Nadarajan2014]].'},
  {k:'Clears, clean scan',t:'TIA under both definitions',txt:'Symptoms ended within 24 hours, and imaging shows no infarct. The AHA/ASA 2009 tissue definition requires "without acute infarction" [[Easton2009]].',hook:'Tissue definition requires no acute infarction [[Easton2009]].'}],
 dwi:[TIA_C0,TIA_C1,
  {k:'Clears, infarct on scan',t:'The clot clears, later',txt:'Here flow returns after some tissue has been lost, though symptoms will still fade.'},
  {k:'Clears, infarct on scan',t:'Symptoms fade within hours',txt:'Up to 50% have infarct on diffusion imaging, one review says, arguing the 24-hour limit should be abandoned [[Nadarajan2014]].'},
  {k:'Clears, infarct on scan',t:'The definitions disagree',txt:'By time this is a TIA. By tissue it is a stroke, since the 2013 stroke definition is based on CNS infarction [[Sacco2013]]. Pooled DWI positivity was 34.3% (30.5-38.4), range 9-67% [[Brazzelli2014]]; 33.4% in TIAregistry.org [[Amarenco2016]]. In 87 people, 41.3% had acute infarct, and in-hospital recurrence was 19.4% with transient symptoms with infarction vs 1.3% with ischaemic stroke [[Ay2005]].',hook:'A normal clinical recovery does not exclude infarction: about a third of clinical TIAs show a DWI lesion [[Brazzelli2014]].'}],
 long:[TIA_C0,TIA_C1,
  {k:'Over 24 hours',t:'The clot stays',txt:'In this case the blockage lasts much longer, and tissue is lost.'},
  {k:'Over 24 hours',t:'Symptoms continue',txt:'Symptoms run past the 24-hour mark, the line in the older definition. The ESO still keeps a pragmatic clinical definition of under 24 hours [[Fonseca2021]].'},
  {k:'Over 24 hours',t:'Stroke under both definitions',txt:'Time and tissue agree here: symptoms past 24 hours and an infarct on imaging [[Sacco2013]].'}]};
const TIA_V={tia:{o:'TIA',os:'symptoms ended within 24 hours',n:'TIA',ns:'no acute infarct on imaging',core:0,scan:'no bright lesion'},
 dwi:{o:'TIA',os:'symptoms ended within 24 hours',n:'Stroke',ns:'an infarct, however brief the symptoms',core:.22,scan:'bright lesion'},
 long:{o:'Stroke',os:'symptoms went past 24 hours',n:'Stroke',ns:'an infarct on imaging',core:.42,scan:'bright lesion'}};
const TIA_BAND=[{n:'Low',from:0,to:3,r:1.0,share:34,k:1,txt:'<b>Low band, 0-3.</b> In Johnston 2007, 34% of patients fell here and 1.0% had a stroke within 2 days [[Johnston2007]].'},
 {n:'Moderate',from:4,to:5,r:4.1,share:45,k:4,txt:'<b>Moderate band, 4-5.</b> In Johnston 2007, 45% of patients fell here and 4.1% had a stroke within 2 days [[Johnston2007]].'},
 {n:'High',from:6,to:7,r:8.1,share:21,k:8,txt:'<b>High band, 6-7.</b> In Johnston 2007, 21% of patients fell here and 8.1% had a stroke within 2 days [[Johnston2007]].'}];
const TIA_SER={ox:{n:'Oxford 2004',col:'var(--accent)',P:[{d:7,v:8.0,lab:'7 days'},{d:30,v:11.5,lab:'1 month'},{d:90,v:17.3,lab:'3 months'}],w:2.6},
 hr:{n:'First hours',col:'var(--dx)',P:[{d:.25,v:1.2,lab:'6 hours'},{d:.5,v:2.1,lab:'12 hours'},{d:1,v:5.1,lab:'24 hours'}],w:2.6},
 reg:{n:'TIAregistry',col:'var(--brand)',P:[{d:2,v:1.5,lab:'2 days'},{d:7,v:2.1,lab:'7 days'},{d:30,v:2.8,lab:'30 days'},{d:90,v:3.7,lab:'90 days'}],w:2.6}};
const TIA_MI=[{id:'sync',n:'Syncope',a:6,b:50,lab:'seconds',cap:'<b>Syncope.</b> Lasts seconds [[Nadarajan2014]].'},
 {id:'seiz',n:'Seizure',a:6,b:300,lab:'seconds, up to about 5 min',cap:'<b>Seizure.</b> Seconds, up to about 5 minutes [[Nadarajan2014]]. Seizures were the largest named group among mimics in one study, 26 of 55 [[Amort2011]].'},
 {id:'aura',n:'Migraine aura',a:600,b:1800,lab:'10-30 min, spreading',cap:'<b>Migraine aura.</b> 10 to 30 minutes and spreading [[Nadarajan2014]]. Migraine made up 13 of 55 mimics in one study [[Amort2011]].'},
 {id:'tia',n:'TIA',a:6,b:3600,lab:'usually under 1 hour',cap:'<b>TIA.</b> Negative symptoms, maximal at onset, usually under 1 hour [[Nadarajan2014]].'}];
function tiaTx(x,y,str,cls,st){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls||'t-sm'}"${st?` style="${st}"`:''}>${str}</text>`}
inits.tia=()=>{
  /* ---------- the transient clot ---------- */
  const svg=$('#tiaSvg'),rg=$('#tiaT');let sc='tia';
  const END={tia:.42,dwi:.66,long:1},LYS={tia:[.3,.4],dwi:[.36,.54],long:[.62,.8]};
  function draw(t){const N=vb(svg,'720 440','400 780');
    const L=N?{ax:14,ay:44,aw:372,fx:60,fy:188,tx:112,ty:186,tw:268,sx:104,sy:262,ss:.8,vx:14,vy:532,vw:372,vh:112,v2y:654}:{ax:24,ay:44,aw:430,fx:60,fy:188,tx:112,ty:186,tw:340,sx:490,sy:40,ss:.74,vx:24,vy:300,vw:330,vh:118,v2y:300,v2x:366};
    const [l0,l1]=LYS[sc],cl=ramp(t,.02,.12),ly=ramp(t,l0,l1),prog=ramp(t,.14,.8),end=END[sc],V=TIA_V[sc];
    let s=tiaTx(L.ax,24,'THE ARTERY','t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=artery(L.ax,L.ay,L.aw,{h:64,clot:cl*(1-ly),flow:1,ph:t*4}).svg;
    /* symptoms: a face and a bar on a stretched axis */
    const on=ramp(t,.14,.2),off=ramp(prog,end,end+.05),dr=on*(sc==='long'?1:1-off);
    s+=faceGlyph(L.fx,L.fy,76,{droop:dr,side:'L'});
    const X=u=>L.tx+L.tw*u,yb=L.ty;
    s+=tiaTx(L.tx,yb-22,'SYMPTOMS, STRETCHED TIME AXIS','t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=`<rect x="${f1(L.tx)}" y="${f1(yb-10)}" width="${f1(L.tw)}" height="20" rx="4" style="fill:var(--panel-2)"/>`;
    const up=Math.min(prog,end);if(up>0)s+=`<rect x="${f1(L.tx)}" y="${f1(yb-10)}" width="${f1(L.tw*up)}" height="20" rx="4" style="fill:var(--accent)"/>`;
    [ [.45,'1 hour'],[.82,'24 hours'] ].forEach(([u,lb])=>{s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${f1(yb-14)}" y2="${f1(yb+14)}" style="stroke:var(--ink);stroke-width:1.6"/>`+tiaTx(X(u),yb+28,lb,'t-sm t-mid','fill:var(--ink)')});
    s+=tiaTx(L.tx,yb+28,'onset','t-sm');
    /* the scan */
    const seen=ramp(t,.8,.88),ax=brainAxial(L.sx,L.sy,L.ss,{mode:'dwi',core:V.core,side:'L'});
    s+=tiaTx(L.sx+96*(L.ss/.8),L.sy-8,'DIFFUSION MRI','t-xs t-mid','letter-spacing:.08em;fill:var(--ink)');
    s+=`<g style="opacity:${f1(.18+.82*seen)}">${V.core===0||seen>.5?ax.svg:brainAxial(L.sx,L.sy,L.ss,{mode:'dwi',core:0,side:'L'}).svg}</g>`;
    s+=tiaTx(L.sx+96*(L.ss/.8),L.sy+300*L.ss+15,seen>.5?V.scan:'not yet done','t-sm t-mid','fill:var(--ink)');
    /* the verdicts */
    const box=(x,y,w,h,tt,big,sm)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`+tiaTx(x+14,y+22,tt,'t-xs','letter-spacing:.08em;fill:var(--ink)')+tiaTx(x+14,y+58,big,'t-big','font-size:26px')+tiaTx(x+14,y+84,sm,'t-sm','fill:var(--ink)');
    const done=t>=.84;
    s+=box(L.vx,L.vy,L.vw,L.vh,'OLD, TIME-BASED: UNDER 24 HOURS',done?V.o:'?',done?V.os:'waiting for the end of the timeline');
    s+=box(N?L.vx:L.v2x,L.v2y,L.vw,L.vh,'TISSUE-BASED: NO ACUTE INFARCT',done?V.n:'?',done?V.ns:'waiting for the scan');
    svg.innerHTML=s;
    const p=phaseOf(TIA_BASE,t);setSt(p);$('#tiaNote').innerHTML=noteHTML(TIA_TXT[sc][p])}
  const stop=playWire(rg,$('#tiaPlay'),draw,16000,'%t:player.replay%','tia');
  const setSt=stepWire($('#tiaSteps'),TIA_BASE,rg,draw,stop);
  $$('[data-tisc]').forEach(b=>b.addEventListener('click',()=>{stop();sc=b.dataset.tisc;$$('[data-tisc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- ABCD2 ---------- */
  const ss=$('#tiaScore'),res=$('#tiaRes'),A={a:0,b:0,c:0,d:0,e:0};
  function drawScore(){const N=vb(ss,'720 230','400 400'),sum=A.a+A.b+A.c+A.d+A.e,band=TIA_BAND.find(b=>sum>=b.from&&sum<=b.to);
    const G=N?{x:18,y:66,cw:46,h:50,dx:90,dy:212}:{x:14,y:70,cw:50,h:56,dx:470,dy:44};
    let s=tiaTx(G.x,24,'ABCD2 SCORE','t-xs','letter-spacing:.08em;fill:var(--ink)')+tiaTx(G.x,50,String(sum)+' of 7','t-big','font-size:22px');
    for(let i=0;i<=7;i++){const x=G.x+i*G.cw,on=i===sum;
      s+=`<rect x="${f1(x+2)}" y="${G.y}" width="${G.cw-4}" height="${G.h}" rx="7" style="fill:${on?'var(--brand)':'var(--panel-2)'};stroke:var(--line)"/>`;
      s+=`<text x="${f1(x+G.cw/2)}" y="${G.y+G.h/2+6}" class="t-big t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'}">${i}</text>`}
    TIA_BAND.forEach(b=>{const x0=G.x+b.from*G.cw+3,x1=G.x+(b.to+1)*G.cw-3,y=G.y+G.h+12,act=b===band;
      s+=`<path d="M${f1(x0)} ${y-4}V${y}H${f1(x1)}V${y-4}" style="fill:none;stroke:${act?'var(--ink)':'var(--muted)'};stroke-width:${act?2:1}"/>`;
      s+=tiaTx((x0+x1)/2,y+16,b.n,'t-sm t-mid',act?'fill:var(--ink);font-weight:700':'')+tiaTx((x0+x1)/2,y+31,b.r.toFixed(1)+'% at 2 days','t-xs t-mid',act?'fill:var(--ink)':'')});
    const ic=icons(G.dx,G.dy,{n:100,cols:10,k:band.k,size:13,gap:3,col:'var(--accent)',shape:'dot'});
    s+=tiaTx(G.dx,G.dy-14,`about ${band.k} in 100 had a stroke by day 2`,'t-sm','fill:var(--ink)')+ic.svg;
    ss.innerHTML=s;
    res.innerHTML=`Score <b>${sum}</b>. `+band.txt+' Population figures from the published score, never a prediction for one person.'}
  $('#tiaQ').addEventListener('click',e=>{const b=e.target.closest('[data-tiq]');if(!b)return;A[b.dataset.tiq]=+b.dataset.v;$$(`[data-tiq="${b.dataset.tiq}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));drawScore()});
  drawScore();

  /* ---------- early risk ---------- */
  const cs=$('#tiaCur'),cr=$('#tiaCurT'),cRead=$('#tiaCurRead'),show={ox:true,hr:true,reg:true,one:true};
  const U=d=>Math.sqrt(d/90);
  function drawCur(t){const N=vb(cs,'720 390','400 420'),B=N?{x:40,y:18,w:346,h:340}:{x:46,y:18,w:654,h:320},day=t*t*90,X=u=>B.x+B.w*u,Y=v=>B.y+B.h*(1-v/20);
    let s=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" style="fill:var(--field)"/>`;
    [0,5,10,15,20].forEach(v=>{s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tiaTx(B.x-6,Y(v)+3,v+'%','t-xs t-end')});
    [1,2,7,30,90].forEach(d=>{const x=X(U(d));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${B.y}" y2="${B.y+B.h}" class="grid"/>`+tiaTx(x,B.y+B.h+16,d,'t-sm t-mid','fill:var(--ink)')});
    s+=tiaTx(B.x,B.y+B.h+34,N?'days since the TIA, axis stretched at the start':'days since the TIA, axis stretched at the start; vertical axis: stroke by then','t-xs');
    const rd=[];
    Object.keys(TIA_SER).forEach(k=>{if(!show[k])return;const S=TIA_SER[k],f=monoFn([ [0,0],...S.P.map(p=>[U(p.d),p.v]) ]),last=S.P[S.P.length-1],lim=Math.min(t,U(last.d));let d='';
      for(let i=0;i<=80;i++){const u=lim*i/80;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(f(u)))}
      s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:${S.w};stroke-linecap:round${k==='hr'?';stroke-dasharray:6 4':''}"/>`;
      let reached=null;S.P.forEach(p=>{if(U(p.d)<=t+1e-4){reached=p;s+=`<circle cx="${f1(X(U(p.d)))}" cy="${f1(Y(p.v))}" r="4.5" style="fill:var(--panel);stroke:${S.col};stroke-width:2.2"/>`}});
      if(reached){const lx=X(U(reached.d)),ly=Y(reached.v);
        if(k==='hr'){const up=N?190:110;s+=kitLabel(lx-6,ly-up-4,`first hours ${reached.v.toFixed(1)}%`,{})+`<path d="M${f1(lx)} ${f1(ly-6)}V${f1(ly-up)}" style="stroke:${S.col};stroke-width:1"/>`}
        else if(k==='ox')s+=kitLabel(lx-8,ly-9,`Oxford 2004 ${reached.v.toFixed(1)}%`,{a:'e'});
        else s+=reached.d<=7?kitLabel(lx+6,ly+15,`TIAregistry ${reached.v.toFixed(1)}%`,{}):kitLabel(lx-8,ly+18,`TIAregistry ${reached.v.toFixed(1)}%`,{a:'e'});
        rd.push(`<span>${S.n}: <b>${reached.v.toFixed(1)}%</b> at ${reached.lab}</span>`)}});
    if(show.one){[{d:7,v:5.2,lab:'pooled 5.2%'},{d:90,v:10.5,lab:'ED cohort 10.5%'}].forEach(p=>{if(U(p.d)<=t+1e-4){const x=X(U(p.d)),y=Y(p.v);s+=`<rect x="${f1(x-4.5)}" y="${f1(y-4.5)}" width="9" height="9" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:var(--ink)"/>`+kitLabel(p.d===90?x-10:x+10,y+3,p.lab,{a:p.d===90?'e':undefined})}})}
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${B.y}" y2="${B.y+B.h}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    cs.innerHTML=s;cRead.innerHTML=rd.length?rd.join(''):'<span>Before the first published point</span>'}
  playWire(cr,$('#tiaCurPlay'),drawCur,14000,'%t:player.replay%','tia');
  $('#tiaSer').addEventListener('click',e=>{const b=e.target.closest('[data-tiser]');if(!b)return;const k=b.dataset.tiser;show[k]=!show[k];b.setAttribute('aria-pressed',show[k]);drawCur(+cr.value)});
  drawCur(+cr.value);

  /* ---------- EXPRESS ---------- */
  const ex=$('#tiaEx'),er=$('#tiaExT');
  function drawEx(t){const N=vb(ex,'720 280','400 465'),u=ease(ramp(t,.35,.65)),aft=t>=.5,G=N?{x:14,w:372,y1:70,y2:150,ix:90,iy:232}:{x:24,w:380,y1:80,y2:170,ix:470,iy:50};
    const W=d=>G.w*d/20;
    let s=tiaTx(G.x,26,aft?'SECOND PHASE: URGENT CLINIC':'FIRST PHASE: BEFORE THE CHANGE','t-xs','letter-spacing:.08em;fill:var(--ink)');
    const rows=[{y:G.y1,n:'Delay to assessment',a:3,b:1,lab0:'3 days',lab1:'under 1 day'},{y:G.y2,n:'Delay to first prescription',a:20,b:1,lab0:'20 days',lab1:'1 day'}];
    rows.forEach(r=>{const v=lerp(r.a,r.b,u),w=W(v);s+=tiaTx(G.x,r.y-10,r.n,'t-lbl');
      s+=`<rect x="${G.x}" y="${r.y}" width="${G.w}" height="22" rx="5" style="fill:var(--panel-2)"/><rect x="${G.x}" y="${r.y}" width="${f1(w)}" height="22" rx="5" style="fill:var(--brand)"/>`;
      s+=w>G.w*.6?`<text x="${f1(G.x+w-8)}" y="${r.y+15}" class="t-sm t-end" style="fill:var(--on-brand);font-weight:700">${aft?r.lab1:r.lab0}</text>`:tiaTx(G.x+w+8,r.y+15,aft?r.lab1:r.lab0,'t-sm','fill:var(--ink);font-weight:700')});
    const k=Math.round(lerp(10.3,2.1,u)),ic=icons(G.ix,G.iy,{n:100,cols:10,k,size:16,gap:4,col:'var(--accent)',shape:'dot'});
    s+=tiaTx(G.ix,G.iy-26,'STROKE WITHIN 90 DAYS','t-xs','letter-spacing:.08em;fill:var(--ink)');
    s+=tiaTx(G.ix,G.iy-10,aft?'2.1%, 6 of 281 people':'10.3%, 32 of 310 people','t-sm','fill:var(--ink);font-weight:700')+ic.svg;
    ex.innerHTML=s}
  playWire(er,$('#tiaExPlay'),drawEx,9000,'%t:player.replay%','tia');
  drawEx(+er.value);

  /* ---------- mimics ---------- */
  const mi=$('#tiaMi');let miK='tia';
  function drawMi(){const N=vb(mi,'720 250','400 330'),B=N?{x:14,w:372,lh:66,top:34}:{x:130,w:570,lh:44,top:26},Lg=v=>Math.log10(v),X=v=>B.x+B.w*(Lg(v)-Lg(5))/(Lg(5400)-Lg(5));
    let s='';const rows=TIA_MI,bot=B.top+B.lh*rows.length;
    [ [10,'10 s'],[60,'1 min'],[300,'5 min'],[1800,'30 min'],[3600,'1 h'] ].forEach(([v,lb])=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${B.top-6}" y2="${f1(bot)}" class="grid"/>`+tiaTx(x,bot+16,lb,'t-sm t-mid','fill:var(--ink)')});
    rows.forEach((r,i)=>{const on=r.id===miK,y=B.top+i*B.lh,by=N?y+24:y+10,h=N?16:22;
      if(N)s+=tiaTx(B.x,y+16,r.n,'t-lbl',on?'':'opacity:.72')+tiaTx(B.x+B.w,y+16,r.lab,'t-xs t-end',on?'fill:var(--ink)':'');
      else{s+=tiaTx(14,by+15,r.n,'t-lbl',on?'':'opacity:.72')}
      s+=`<rect x="${f1(X(r.a))}" y="${f1(by)}" width="${f1(X(r.b)-X(r.a))}" height="${h}" rx="5" style="fill:${on?'var(--brand)':'var(--panel-2)'};stroke:var(--line)"/>`;
      if(!N){const fit=X(r.b)-X(r.a)>230;s+=fit?`<text x="${f1(X(r.a)+10)}" y="${f1(by+15)}" class="t-sm" style="fill:${on?'var(--on-brand)':'var(--ink)'}">${r.lab}</text>`:(r.id==='aura'?tiaTx(X(r.a)-8,by+15,r.lab,'t-sm t-end','fill:var(--ink)'):tiaTx(X(r.b)+8,by+15,r.lab,'t-sm','fill:var(--ink)'))}});
    mi.innerHTML=s;$('#tiaMiCap').innerHTML=TIA_MI.find(r=>r.id===miK).cap+' Bars are schematic spans of the published descriptions.'}
  $('#tiaMiB').addEventListener('click',e=>{const b=e.target.closest('[data-timi]');if(!b)return;miK=b.dataset.timi;$$('[data-timi]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMi()});
  drawMi();
  const prev=redraws.tia;redraws.tia=()=>{prev&&prev();drawScore();drawMi()};
};
