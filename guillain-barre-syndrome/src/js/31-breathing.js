/* =============== 3.1 Breathing & the 20/30/40 rule =============== */
/* Widgets: the falling vital capacity (main player), the 20/30/40 checker, the Green 2018 forest plot, EGRIS and mEGRIS.
   The VC curve and the single-breath count are schematic; every threshold drawn is a published value cited in the HTML. */
const BR_INT=.8; /* the timeline point where the schematic person is intubated */
const BR_VC=monoFn([ [0,45],[.2,44],[.35,38.5],[.5,30],[.62,22.5],[.7,19],[BR_INT,15.2] ]);
const BR_SBC=monoFn([ [0,30],[.3,28],[.5,22],[.62,19.5],[.7,17],[.77,14],[BR_INT,13] ]);
const BR_LINES=[
 {v:31.5,t:'a fall of more than 30%',col:'var(--warn)'},
 {v:20,t:'20 mL/kg: Lawn\'s risk line',col:'var(--accent)'},
 {v:15,t:'15: imminent failure range',col:'var(--bad)'},
 {v:10,t:'10: ventilation almost inevitable',col:'var(--bad)'}];
const BR_STEPS=[
 {from:0,at:.05,k:'Admission',t:'Measure, do not wait',
  txt:'Weakness is climbing. Vital capacity (VC), the most air that can be blown out after a full breath, is still near this person\'s starting value. The EAN/PNS guideline\'s good practice point is to check forced vital capacity three to six times a day depending on severity, and about every 4 hours while it is falling [[vanDoorn2023]].',
  pt:'You may be asked to blow hard into a tube, or to count aloud on one breath, many times a day. It feels repetitive. It is how a team spots a change early [[vanDoorn2023,Leonhard2019]].'},
 {from:.18,at:.3,k:'Hours to days',t:'A silent fall',
  txt:'VC starts to drop, but the person does not feel short of breath. Classical signs of respiratory distress come too late to guide care [[Orlikowski2004]], and failure can occur without breathlessness [[Leonhard2019]]. In one small series, VC fell over the 48 hours before failure in everyone who needed intubation [[Chevrolet1991]].',
  hook:'Breathlessness can be absent: serial VC comes first [[Orlikowski2004,Leonhard2019]].'},
 {from:.44,at:.5,k:'A warning line',t:'More than 30% down',
  txt:'Lawn\'s rule counts a fall of more than 30% in VC, MIP or MEP as a risk sign on its own [[Lawn2001]]. The EAN/PNS guideline calls a fall over 30% below predicted baseline a concern, and a fall over 30% within 24 hours likely means immediate transfer to intensive care [[vanDoorn2023]]. The single breath count is shrinking too: under 20 is a useful transfer tool [[vanDoorn2023]].',
  pt:'Numbers that keep dropping matter even when the person feels all right.'},
 {from:.6,at:.67,k:'20 mL/kg',t:'The 20 mL/kg line',
  txt:'Below 20 mL/kg the 20/30/40 rule flags risk of respiratory failure [[Lawn2001]], and the EAN/PNS guideline says elective ventilation should be considered at 20 mL/kg or less [[vanDoorn2023]]. Planning ahead lets intubation happen calmly instead of in an emergency.',
  hook:'20/30/40: VC under 20 mL/kg, MIP under 30, MEP under 40 cmH₂O, or a fall over 30% [[Lawn2001]].'},
 {from:.73,at:.765,k:'Imminent',t:'Imminent failure',
  txt:'The ten-steps guideline lists signs of imminent respiratory insufficiency: breathless at rest or while talking, cannot count to 15 in one breath, accessory muscle use, a raised breathing or heart rate, VC under 15 to 20 mL/kg or under 1 L, or an abnormal blood gas or oximetry [[Leonhard2019]]. In one series of 10, intubation came at a mean of 15.2 mL/kg [[Chevrolet1991]].',
  hook:'Cannot count to 15 on one breath is a sign of imminent failure [[Leonhard2019]].'},
 {from:BR_INT,at:.9,k:'Ventilated',t:'The ventilator takes over',
  txt:'A tube now carries air to the lungs and the ventilator does the work of the weak muscles. At 10 mL/kg or less, ventilation is described as almost inevitable [[vanDoorn2023]]. In 81 intubated people, early pneumonia was more likely when intubation came more than 2 days after admission [[Orlikowski2006]]. Module 3.6 follows the time in intensive care.',
  pt:'Being on a breathing machine is a support, not a failure. Many people who needed one walk again, though it can take a long time [[Fletcher2000,vanDenBerg2018]].'}];
/* 20/30/40 rows: published thresholds [[Lawn2001]] */
const BR_RULE=[
 {id:'brVc',lab:'Vital capacity',sh:'VC',unit:'mL/kg',max:60,th:20,below:true},
 {id:'brMip',lab:'Max. inspiratory pressure',sh:'MIP',unit:'cmH₂O',max:100,th:30,below:true},
 {id:'brMep',lab:'Max. expiratory pressure',sh:'MEP',unit:'cmH₂O',max:120,th:40,below:true},
 {id:'brFall',lab:'Fall from first value',sh:'Fall',unit:'%',max:70,th:30,below:false}];
const BR_RULE_TXT={none:'None of the four limbs is crossed. In Lawn\'s series, the rule flags risk only when at least one is [[Lawn2001]].',
 some:'At least one limb of the rule is crossed. In Lawn\'s series of 114 people in intensive care, this marked a risk of respiratory failure. It describes a group, not a decision for one person [[Lawn2001]].'};
/* Green 2018 pooled odds ratios with 95% CI */
const BR_FOREST=[
 {t:'Bulbar weakness',or:9.0,lo:3.94,hi:20.6,v:'9.0 (3.94–20.6)'},
 {t:'Neck weakness',or:6.36,lo:2.32,hi:17.5,v:'6.36 (2.32–17.5)'},
 {t:'Autonomic instability',or:6.40,lo:2.83,hi:14.5,v:'6.40 (2.83–14.5)'},
 {t:'Facial weakness',or:3.74,lo:2.05,hi:6.81,v:'3.74 (2.05–6.81)'}];
/* EGRIS bands, % ventilated within 1 week [[Leonhard2019]] */
const BR_EG_BANDS=[
 {lo:0,hi:2,k:4,t:'Low',r:'0 to 2',col:'var(--good)'},
 {lo:3,hi:4,k:24,t:'Intermediate',r:'3 to 4',col:'var(--warn)'},
 {lo:5,hi:7,k:65,t:'High',r:'5 to 7',col:'var(--bad)'}];
const BR_EG_OUT=[
 'Score {s} of 7: the low band (0 to 2). In the guideline\'s figures, about 4 in 100 people in this band needed ventilation within 1 week [[Leonhard2019]].',
 'Score {s} of 7: the intermediate band (3 to 4). In the guideline\'s figures, about 24 in 100 people in this band needed ventilation within 1 week [[Leonhard2019]].',
 'Score {s} of 7: the high band (5 or more). In the guideline\'s figures, about 65 in 100 people in this band needed ventilation within 1 week [[Leonhard2019]].'];
const BR_MG_OUT='mEGRIS total: {s} of 32.';
const BR_MG_EX='This matches the paper\'s worked example: bulbar weakness (5), admitted 1 day after onset (6), neck flexion grade 4 (2) and hip flexion 3 on each side (4) make 17. The paper gives predicted risks of 17% within 1 day and 26% within 3 days; for 1 week its text says 35% and its figure caption 32% [[Luijten2023]].';
const BR_MG_NOEX='Higher totals mean higher predicted risk in the derivation cohort. The paper converts totals into risks (0 to 100%) with a figure not reproduced here; set the inputs to its worked example (bulbar yes, 1 day, neck 4, hips 3 and 3) to see the quoted figures [[Luijten2023]].';

inits.breathing=()=>{
  /* ---------- main player ---------- */
  const svg=$('#brSvg'),rg=$('#brT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 656');
    const L=N?{hx:12,hy:20,bx:70,by:34,bs:180,lx:146,ly:56,ls:1.4,qx:12,qy:250,sx:12,sy:306,sw:376,cx:44,cy:368,cw:340,ch:226,rx:12,ry:646}
             :{hx:14,hy:22,bx:72,by:40,bs:206,lx:140,ly:72,ls:1.2,qx:14,qy:274,sx:14,sy:330,sw:286,cx:352,cy:40,cw:348,ch:244,rx:352,ry:342};
    const vent=t>=BR_INT,tc=Math.min(t,BR_INT),vc=BR_VC(tc),a=clamp(vc/45),sbc=Math.round(BR_SBC(tc));
    const ph=.5+.5*Math.sin(t*Math.PI*2*44);
    let s=`<text x="${L.hx}" y="${L.hy}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">THE PERSON</text>`;
    s+=bodyFront(L.bx,L.by,L.bs,{level:lerp(.3,.78,ease(ramp(t,0,BR_INT))),vent}).svg;
    const fill=vent?lerp(.3,.92,ph):lerp(.5-a*.46,.5+a*.46,ph);
    const Lg=lungs(L.lx,L.ly,L.ls,{fill,weak:vent?.8:1-a,tube:vent});s+=Lg.svg;
    s+=kitLabel(Lg.at.diaphragm[0],Lg.at.diaphragm[1]+(N?30:26),vent?'weak diaphragm, rested':a<.6?'diaphragm weakening':'diaphragm',{a:'m'});
    /* how it feels */
    const fl=vent?'Supported by the ventilator':t>=.73?'Yes, and neck muscles help':'Not yet: signs come late';
    s+=`<text x="${L.qx}" y="${L.qy}" class="t-sm">Feels short of breath?</text><text x="${L.qx}" y="${L.qy+18}" class="t-lbl">${fl}</text>`;
    /* single breath count */
    const SX=v=>L.sx+L.sw*v/30;
    s+=`<text x="${L.sx}" y="${L.sy-10}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">SINGLE BREATH COUNT</text>`;
    s+=`<rect x="${L.sx}" y="${L.sy}" width="${L.sw}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    if(!vent){const col=sbc<15?'var(--bad)':sbc<20?'var(--warn)':'var(--good)';s+=`<rect x="${L.sx}" y="${L.sy}" width="${f1(SX(sbc)-L.sx)}" height="14" rx="7" style="fill:${col}"/>`;
      s+=`<text x="${L.sx+L.sw}" y="${L.sy-10}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">counts to ${sbc}</text>`}
    else s+=`<text x="${L.sx+L.sw}" y="${L.sy-10}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">no count: tube in</text>`;
    [0,15,20].forEach(v=>{const x=SX(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.sy-3}" y2="${L.sy+17}" style="stroke:var(--ink);stroke-width:${v?1.4:0}"/><text x="${f1(x)}" y="${L.sy+30}" class="t-xs t-mid">${v}</text>`});
    /* the VC chart */
    const C=curve(L.cx,L.cy,L.cw,L.ch,BR_VC,{x0:0,x1:1,y0:0,y1:50,upto:tc,col:'var(--rx)',dot:!vent,lw:3});
    s+=C.svg;
    [0,10,20,30,40,50].forEach(y=>{s+=`<text x="${L.cx-6}" y="${f1(C.Y(y)+3)}" class="t-xs t-end">${y}</text>`});
    s+=`<text x="${L.cx}" y="${L.cy-8}" class="t-xs" style="fill:var(--ink);font-weight:700">vital capacity, mL/kg</text>`;
    s+=`<text x="${L.cx+L.cw}" y="${L.cy+L.ch+15}" class="t-xs t-end">time: schematic, no scale</text>`;
    BR_LINES.forEach(l=>{const y=C.Y(l.v);s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${l.col};stroke-width:1.4;stroke-dasharray:6 4"/>`+kitLabel(L.cx+6,y-4,l.t,{halo:'var(--field)'})});
    if(vent){const x=C.X(BR_INT),w=L.cx+L.cw-x;
      s+=`<rect x="${f1(x)}" y="${L.cy}" width="${f1(w)}" height="${L.ch}" style="fill:var(--device);opacity:.14"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--device);stroke-width:2"/>`;
      s+=kitLabel(x-5,L.cy+14,'intubated',{a:'e',halo:'var(--field)'})+kitLabel(x+w/2,L.cy+L.ch*.42,'ventilator',{a:'m',halo:'var(--field)'})}
    const dn=Math.round(100*(1-vc/45));
    s+=`<text x="${L.rx}" y="${L.ry}" class="t-sm">${vent?'VC at intubation about 15 mL/kg':`VC about ${Math.round(vc)} mL/kg, ${dn}% below start`}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(BR_STEPS,t);setSt(p);$('#brNote').innerHTML=noteHTML(BR_STEPS[p]);
  }
  const stop=playWire(rg,$('#brPlay'),draw,16000,'%t:player.replay%','breathing');
  setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 20/30/40 checker ---------- */
  const rs=$('#brRule');
  function drawRule(){
    const N=vb(rs,'720 230','400 330');
    const L=N?{x:12,w:300,y0:24,dy:76,lab:0,bar:22,st:388}:{x:250,w:330,y0:30,dy:52,lab:0,bar:0,st:706};
    let s='',hit=0;
    BR_RULE.forEach((r,i)=>{const v=+$('#'+r.id).value,on=r.below?v<r.th:v>r.th,y=L.y0+i*L.dy,by=y+L.bar,X=u=>L.x+L.w*u/r.max;
      $('#'+r.id+'O').textContent=v;if(on)hit++;
      const lx=N?12:14;
      s+=`<text x="${lx}" y="${y+(N?4:15)}" class="t-lbl">${N?r.sh+' · '+r.unit:r.lab}</text>`;
      if(!N)s+=`<text x="${lx}" y="${y+30}" class="t-xs">${r.unit}</text>`;
      s+=`<rect x="${L.x}" y="${by+4}" width="${L.w}" height="16" rx="8" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.x}" y="${by+4}" width="${f1(Math.max(4,X(v)-L.x))}" height="16" rx="8" style="fill:${on?'var(--bad)':'var(--good)'};opacity:.85"/>`;
      const tx=X(r.th);s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${by-2}" y2="${by+26}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(tx)}" y="${by+38}" class="t-xs t-mid" style="fill:var(--ink)">${r.below?'under ':'over '}${r.th}</text>`;
      s+=`<text x="${L.st}" y="${N?y+4:by+16}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${v}${r.unit==='%'?'%':''}: ${on?'crosses':'clear'}</text>`});
    rs.innerHTML=s;
    $('#brRuleOut').innerHTML=`<b>${hit} of 4 crossed.</b> `+(hit?BR_RULE_TXT.some:BR_RULE_TXT.none);
  }
  BR_RULE.forEach(r=>$('#'+r.id).addEventListener('input',drawRule));

  /* ---------- forest plot ---------- */
  const fs=$('#brForest');
  function drawForest(){
    const N=vb(fs,'720 210','400 300');
    const L=N?{px:12,pw:270,y0:30,dy:62,lab:-16,vx:388,ax:282}:{px:230,pw:330,y0:34,dy:38,lab:4,vx:706,ax:196};
    const lmin=Math.log(1),lmax=Math.log(25),X=v=>L.px+L.pw*(Math.log(v)-lmin)/(lmax-lmin);
    let s='';const yb=L.y0+BR_FOREST.length*L.dy-L.dy/2+8;
    [1,2,5,10,20].forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-14}" y2="${yb}" style="stroke:var(--line);stroke-width:${v===1?2:1}${v===1?'':';stroke-dasharray:2 4'}"/><text x="${f1(x)}" y="${yb+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${L.px+L.pw}" y="${yb+28}" class="t-xs t-end">odds ratio, log scale (1 = no difference)</text>`;
    BR_FOREST.forEach((r,i)=>{const y=L.y0+i*L.dy;
      s+=`<text x="${N?L.px:14}" y="${y+L.lab}" class="t-lbl">${r.t}</text>`;
      s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y}" y2="${y}" style="stroke:var(--ink);stroke-width:2"/><rect x="${f1(X(r.or)-6)}" y="${y-6}" width="12" height="12" style="fill:var(--rx)"/>`;
      s+=`<text x="${L.vx}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${r.v}</text>`});
    fs.innerHTML=s;
  }

  /* ---------- EGRIS ---------- */
  const es=$('#brEgSvg');
  function drawEg(){
    const sc=+$('#brEgDays').value + +$('#brEgFb').value + +$('#brEgMrc').value,bi=sc<=2?0:sc<=4?1:2,B=BR_EG_BANDS[bi];
    const N=vb(es,'720 230','400 490');
    const L=N?{gx:200,gy:120,gr:96,ix:80,iy:226,cols:10,sz:20}:{gx:140,gy:132,gr:112,ix:312,iy:48,cols:20,sz:16};
    let s=gauge(L.gx,L.gy,L.gr,sc,7,{bands:BR_EG_BANDS.map(b=>({to:b.hi+(b.hi===7?0:.5),col:b.col}))});
    s+=`<text x="${L.gx}" y="${L.gy+40}" class="t-big t-mid" style="font-size:30px">${sc} of 7</text>`;
    s+=`<text x="${L.gx}" y="${L.gy+62}" class="t-lbl t-mid">${B.t} band (${B.r})</text>`;
    const I=icons(L.ix,L.iy,{n:100,cols:L.cols,k:B.k,size:L.sz,gap:N?4:3,col:'var(--rx)'});s+=I.svg;
    s+=`<text x="${L.ix}" y="${L.iy-12}" class="t-xs" style="fill:var(--ink);font-weight:700">${B.k} in 100 ventilated within 1 week, in this band</text>`;
    es.innerHTML=s;
    $('#brEgOut').innerHTML=BR_EG_OUT[bi].replace('{s}',sc);
  }
  ['#brEgDays','#brEgFb','#brEgMrc'].forEach(id=>$(id).addEventListener('change',drawEg));

  /* ---------- mEGRIS ---------- */
  function drawMg(){
    const hip=+$('#brMgHipR').value + +$('#brMgHipL').value,sc=+$('#brMgBul').value + +$('#brMgDays').value + +$('#brMgNeck').value+(10-hip);
    $('#brMgBar').style.width=(100*sc/32).toFixed(1)+'%';
    const ex=+$('#brMgBul').value===5&&+$('#brMgDays').value===6&&+$('#brMgNeck').value===2&&+$('#brMgHipR').value===3&&+$('#brMgHipL').value===3;
    $('#brMgOut').innerHTML=`<b>${BR_MG_OUT.replace('{s}',sc)}</b> `+(ex?BR_MG_EX:BR_MG_NOEX);
  }
  ['#brMgBul','#brMgDays','#brMgNeck','#brMgHipR','#brMgHipL'].forEach(id=>$(id).addEventListener('change',drawMg));

  drawRule();drawForest();drawEg();drawMg();
  const prev=redraws.breathing;redraws.breathing=()=>{prev&&prev();drawRule();drawForest();drawEg()};
};
