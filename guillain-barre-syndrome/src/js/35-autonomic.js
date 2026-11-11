/* =============== 3.5 Autonomic storms =============== */
/* Widgets: one schematic day on a monitor (main player) and the body-system explorer with two datasets.
   The traces are illustrative; the dashed limits are Pfeiffer 1999's published values, cited in the HTML. */
const AU_SBP=monoFn([ [0,128],[2.5,130],[4,104],[5,112],[7,196],[9,204],[10.5,190],[11.6,176],[12,150],[12.4,122],[13.5,118],[15,92],[16.5,78],[18,84],[19.5,110],[21,126],[24,130] ]);
const AU_HR=monoFn([ [0,86],[3,88],[4.5,96],[7,132],[9.5,138],[11.6,128],[11.9,70],[12.05,30],[12.25,28],[12.5,62],[13.5,74],[15,56],[16.5,44],[18,50],[19.5,78],[21,88],[24,86] ]);
const AU_SYM=monoFn([ [0,.4],[3,.45],[7,.95],[11.5,.85],[13,.5],[15.5,.2],[18,.25],[21,.45],[24,.45] ]);
const AU_VAG=monoFn([ [0,.4],[11.7,.35],[12.1,1],[12.6,.5],[15.5,.85],[18,.7],[21,.45],[24,.45] ]);
const AU_HEART='M0 .85C-.2 .65 -1 .2 -1 -.3C-1 -.75 -.55 -.95 -.25 -.85C-.1 -.8 0 -.65 0 -.55C0 -.65 .1 -.8 .25 -.85C.55 -.95 1 -.75 1 -.3C1 .2 .2 .65 0 .85Z';
const AU_EVT=[ {h:0,t:'steady for now'},{h:3.2,t:'surge: sympathetic overactivity'},{h:11.7,t:'tracheal suction: a brief pause'},{h:12.8,t:'settling after the pause'},{h:14.5,t:'pressure and heart rate fall'},{h:19,t:'settling, still monitored'} ];
const AU_LINES={sbp:[ {v:165,t:'mean above 165',up:true},{v:85,t:'minimum below 85',up:false} ],hr:[ {v:125,t:'mean above 125',up:true},{v:48,t:'below 48: bradycardia',up:false} ]};
const AU_STEPS=[
 {from:0,at:.06,k:'Background',t:'Nerves that run the organs',
  txt:'Autonomic fibres, sympathetic and parasympathetic, run alongside the motor nerves and can be hit by the same attack. Features involve the heart and vessels, sweating and the gut [[Zochodne1994]]. Estimates of how often range from 10 to 50%, depending on the definition [[Weiss2025]].',
  pt:'These are the nerves that work without you thinking: heartbeat, blood pressure, sweating, bowels and bladder.'},
 {from:.13,at:.29,k:'Sympathetic surge',t:'Pressure and pulse race',
  txt:'In Pfeiffer\'s ventilated cohort, all 16 people whose mean systolic pressure was above 165 mmHg also had persistent tachycardia (mean over 125) or were on beta-blockers [[Pfeiffer1999]]. In one detailed case, rises in pressure behaved like sympathetic overactivity [[Ropper1990]].'},
 {from:.36,at:.42,k:'The swing',t:'The daily range widens',
  txt:'The gap between the day\'s highest and lowest systolic pressure has passed 85 mmHg, as it did in 27 of 36 ventilated people. Except in one person, every bradycardia was preceded by a day like this, so a wide swing is a warning sign [[Pfeiffer1999]]. A failed baroreflex buffer may explain the speed of the swings [[Ropper1990]].',
  hook:'A daily systolic range above 85 mmHg preceded bradycardia [[Pfeiffer1999]].'},
 {from:.485,at:.504,k:'A trigger',t:'Suction, then a slow heart',
  txt:'Tracheal suction stimulates the vagus nerve. Serious arrhythmias were often preceded by brief asystole after suction, and occurred only in ventilated people [[Winer1988]]. Minor stimulation such as suction, intubation, mouth care or bathing can provoke severe bradycardia; some teams keep atropine ready, as a 2025 review reports [[Weiss2025]].',
  hook:'Suctioning can trigger asystole in severe dysautonomia [[Winer1988,Weiss2025]].'},
 {from:.6,at:.69,k:'Vagal side',t:'Pressure falls',
  txt:'Three people in Pfeiffer\'s cohort had hypotension (minimum systolic under 85 mmHg) with unprovoked bradycardia [[Pfeiffer1999]]. Falls in pressure can behave like a vasodepressor reflex with a "vagotomised" heart [[Ropper1990]]. Sepsis, bleeding and pulmonary embolism must be excluded before blaming dysautonomia [[Weiss2025]].'},
 {from:.8,at:.92,k:'Recovery phase',t:'Still watched in recovery',
  txt:'Up to two-thirds of deaths occur in the recovery phase, and the guideline stresses monitoring people who have recently left intensive care [[Leonhard2019]]. In 527 Dutch patients, 10 of 15 deaths came after neurological improvement had begun [[vanDenBerg2013]].',
  pt:'The checks do not stop just because strength is coming back. That is normal care, not a sign that something is wrong [[Leonhard2019]].'}];
/* body-system explorer */
const AU_DS={
 mayo:{t:'Mayo Clinic: among people with dysautonomia',max:50,rows:[ {t:'ileus',v:42,o:'gut'},{t:'hypertension',v:39,o:'bp'},{t:'hypotension',v:37,o:'bp'},{t:'fever',v:29,o:'temp'},{t:'tachycardia or bradycardia',v:27,o:'heart'},{t:'urinary retention',v:24,o:'bladder'} ]},
 us:{t:'US inpatients, billing codes (n=2,587)',max:50,rows:[ {t:'diarrhoea or constipation',v:15.5,o:'gut'},{t:'hyponatraemia',v:14.9,o:'na'},{t:'SIADH',v:4.8,o:'na'},{t:'bradycardia',v:4.7,o:'heart'},{t:'urinary retention',v:3.9,o:'bladder'} ]}};
const AU_ORG={
 heart:{p:[5,-14],l:'heart',a:'s',t:'Heart rate and rhythm',txt:'About 23% have a heart rate over 100, rising to 75% on a ventilator (review figure) [[Weiss2025]]. Serious arrhythmias occurred in 11 of 33 ventilated people in one series [[Winer1988]]. Takotsubo, a reversible stress weakness of the heart muscle, is also reported [[Terayama2024]].'},
 bp:{p:[-25,4],l:'vessels',a:'e',t:'Blood pressure',txt:'Both high and low pressure, sometimes in the same day. A daily systolic range above 85 mmHg was a warning sign for bradycardia [[Pfeiffer1999]].'},
 gut:{p:[2,8],l:'gut',a:'s',t:'Gut',txt:'Ileus (a gut that stops moving) led the Mayo list at 42% [[Chakraborty2020]], but in another series most ileus had other causes, such as opioids, immobility or previous surgery [[Burns2001]].'},
 bladder:{p:[0,24],l:'bladder',a:'s',t:'Bladder',txt:'Urinary dysfunction in 27.7% and retention in 9.2% of 65 consecutive patients, commoner in AIDP than AMAN [[Sakakibara2009]]. Bladder trouble at the very start is a red flag for another diagnosis [[Leonhard2019]].'},
 temp:{p:[-28,24],l:'skin',a:'e',t:'Temperature and sweating',txt:'Fever was recorded in 29% of people with dysautonomia at Mayo [[Chakraborty2020]], and sweating (sudomotor) changes are part of the classic picture [[Zochodne1994]].'},
 na:{p:[0,-46],l:'brain',a:'s',t:'Sodium and the brain',txt:'Low sodium is common and its mechanism is debated [[Netto2025]]. Altered consciousness should prompt thought of low sodium or PRES, a brain swelling linked to pressure swings [[Weiss2025]].'}};

inits.autonomic=()=>{
  /* ---------- main player ---------- */
  const svg=$('#auSvg'),rg=$('#auT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const L=N?{hx:12,hy:20,cx:62,cy:86,cr:40,r1x:136,r2x:268,ry:54,gx:136,gy:112,dx:12,dy:150,dw:376,ey:216,
               px:44,pw:340,sy:262,sh:140,hy2:452,hh:116,xl:600,cap:626}
             :{hx:14,hy:22,cx:84,cy:96,cr:52,r1x:14,r2x:134,ry:182,gx:14,gy:244,dx:14,dy:282,dw:230,ey:356,
               px:304,pw:400,sy:40,sh:146,hy2:222,hh:116,xl:356,cap:372};
    const h=24*t;
    let s=`<text x="${L.hx}" y="${L.hy}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">THE AUTONOMIC BALANCE</text>`;
    /* heart beating at the schematic rate */
    const hr=AU_HR(h),sbp=AU_SBP(h),beat=Math.pow(Math.max(0,Math.sin(t*Math.PI*2*hr*.5)),8),sc=L.cr*(1+.08*beat);
    s+=`<path d="${AU_HEART}" transform="translate(${f1(L.cx)} ${f1(L.cy)}) scale(${f1(sc)})" style="fill:var(--heart);stroke:var(--ink);stroke-width:${(1.4/sc).toFixed(3)}"/>`;
    /* readouts */
    let mn=1e9,mx=-1e9;for(let u=0;u<=h+1e-9;u+=.1){const v=AU_SBP(u);if(v<mn)mn=v;if(v>mx)mx=v}const rng=Math.round(mx-mn);
    s+=`<text x="${L.r1x}" y="${L.ry}" class="t-xs">SYSTOLIC BP</text><text x="${L.r1x}" y="${L.ry+20}" class="t-big" style="font-size:19px">${Math.round(sbp)} mmHg</text>`;
    s+=`<text x="${L.r2x}" y="${L.ry}" class="t-xs">HEART RATE</text><text x="${L.r2x}" y="${L.ry+20}" class="t-big" style="font-size:19px">${Math.round(hr)} /min</text>`;
    s+=`<text x="${L.gx}" y="${L.gy}" class="t-xs">TODAY'S SYSTOLIC RANGE</text><text x="${L.gx}" y="${L.gy+20}" class="t-lbl">${rng} mmHg${rng>85?': over 85, a warning':''}</text>`;
    /* drive bars */
    [ ['sympathetic drive',AU_SYM(h),'var(--rx)'],['vagal drive',AU_VAG(h),'var(--care)'] ].forEach((d,i)=>{const y=L.dy+i*32;
      s+=`<text x="${L.dx}" y="${y}" class="t-xs" style="fill:var(--ink)">${d[0]} (schematic)</text><rect x="${L.dx}" y="${y+5}" width="${L.dw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.dx}" y="${y+5}" width="${f1(L.dw*d[1])}" height="10" rx="5" style="fill:${d[2]}"/>`});
    let ev=AU_EVT[0];AU_EVT.forEach(e=>{if(h>=e.h)ev=e});
    s+=`<text x="${L.dx}" y="${L.ey}" class="t-sm">now: <tspan style="fill:var(--ink);font-weight:700">${ev.t}</tspan></text>`;
    /* traces */
    const plot=(y0,hh,lo,hi,f,lines,title,col)=>{const C=curve(L.px,y0,L.pw,hh,f,{x0:0,x1:24,y0:lo,y1:hi,upto:h,col,dot:true,lw:2.2});let g=C.svg;
      g+=`<text x="${L.px}" y="${y0-7}" class="t-xs" style="fill:var(--ink);font-weight:700">${title}</text>`;
      [lo,Math.round((lo+hi)/2),hi].forEach(v=>{g+=`<text x="${L.px-5}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v}</text>`});
      lines.forEach(l=>{const y=C.Y(l.v);g+=`<line x1="${L.px}" x2="${L.px+L.pw}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${l.up?'var(--bad)':'var(--care)'};stroke-width:1.3;stroke-dasharray:6 4"/>`;
        g+=l.up?kitLabel(L.px+L.pw-4,y-4,l.t,{a:'e',halo:'var(--field)'}):kitLabel(L.px+4,y+12,l.t,{halo:'var(--field)'})});
      return {g,C}};
    const P1=plot(L.sy,L.sh,40,220,AU_SBP,AU_LINES.sbp,'systolic blood pressure, mmHg','var(--rx)');
    if(h>0){const ya=P1.C.Y(mx),yb=P1.C.Y(mn);s+=`<rect x="${L.px}" y="${f1(ya)}" width="${L.pw}" height="${f1(yb-ya)}" style="fill:${rng>85?'var(--bad)':'var(--muted)'};opacity:.08"/>`}
    s+=P1.g;
    s+=plot(L.hy2,L.hh,20,160,AU_HR,AU_LINES.hr,'heart rate, beats per minute','var(--care)').g;
    if(h>=11.7&&h<13.2){const C2=curve(L.px,L.hy2,L.pw,L.hh,AU_HR,{x0:0,x1:24,y0:20,y1:160});const x=C2.X(12.1);
      s+=kitLabel(x,L.hy2+L.hh-6,'suction',{a:'m',halo:'var(--field)'})}
    const T=tline(L.px,L.xl-14,L.pw,{min:0,max:24,step:6,fmt:v=>v});s+=T.svg.replace(/<line[^>]*class="axis"\/>/,'');
    s+=`<text x="${L.px+L.pw}" y="${L.cap}" class="t-xs t-end">hours of one schematic day</text>`;
    svg.innerHTML=s;
    const p=phaseOf(AU_STEPS,t);setSt(p);$('#auNote').innerHTML=noteHTML(AU_STEPS[p]);
  }
  const stop=playWire(rg,$('#auPlay'),draw,22000,'%t:player.replay%','autonomic');
  setSt=stepWire($('#auSteps'),AU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- body-system explorer ---------- */
  const os=$('#auOrg');let org='heart',ds='mayo';
  function drawOrg(){
    const N=vb(os,'720 330','400 620');
    const D=AU_DS[ds],O=AU_ORG[org];
    const L=N?{bx:200,by:16,bs:250,tx:12,ty:300,lx:12,lw:300,y0:330,dy:46,vx:388}:{bx:120,by:22,bs:290,tx:270,ty:24,lx:270,lw:330,y0:52,dy:44,vx:706};
    const B=bodyFront(L.bx,L.by,L.bs,{});let s=B.svg;const k=L.bs/146,T=(a,b)=>[L.bx+a*k,L.by+(b+50)*k];
    Object.keys(AU_ORG).forEach(id=>{const q=AU_ORG[id],[x,y]=T(q.p[0],q.p[1]),on=id===org;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?9:6}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--ink);stroke-width:1.6"/>`;
      s+=kitLabel(q.a==='e'?x-13:x+13,y+4,q.l,{a:q.a==='e'?'e':''})});
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-xs" style="fill:var(--ink);font-weight:700">${D.t}</text>`;
    D.rows.forEach((r,i)=>{const y=L.y0+i*L.dy,on=r.o===org,w=L.lw*r.v/D.max;
      s+=`<text x="${L.lx}" y="${y}" class="t-sm" style="${on?'fill:var(--ink);font-weight:700':''}">${r.t}</text>`;
      s+=`<rect x="${L.lx}" y="${y+6}" width="${L.lw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.lx}" y="${y+6}" width="${f1(w)}" height="14" rx="4" style="fill:${on?'var(--rx)':'var(--muted)'};opacity:${on?1:.45}"/>`;
      s+=`<text x="${f1(L.lx+w+6)}" y="${y+17}" class="t-sm" style="fill:var(--ink)">${r.v}%</text>`});
    if(!D.rows.some(r=>r.o===org))s+=`<text x="${L.lx}" y="${L.y0+D.rows.length*L.dy}" class="t-sm">not counted in this dataset</text>`;
    os.innerHTML=s;
    $('#auOrgOut').innerHTML=`<b>${O.t}</b>${O.txt}`;
  }
  const mod=$('#m-autonomic');
  $$('[data-org]',mod).forEach(b=>b.addEventListener('click',()=>{org=b.dataset.org;$$('[data-org]',mod).forEach(x=>x.setAttribute('aria-pressed',x===b));drawOrg()}));
  $$('[data-ds]',mod).forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.ds;$$('[data-ds]',mod).forEach(x=>x.setAttribute('aria-pressed',x===b));drawOrg()}));
  drawOrg();
  const prev=redraws.autonomic;redraws.autonomic=()=>{prev&&prev();drawOrg()};
};
