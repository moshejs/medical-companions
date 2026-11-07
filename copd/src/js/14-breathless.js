/* =============== 1.4 Air trapping & breathlessness =============== */
/* Main scrubber, six steps: a slow lung to empty (emptying curves), breathing out hitting a flow ceiling
   (airway narrowing on each breath out, tidal loop meeting the maximal flow-volume envelope), air trapping and
   the squeeze (a volume trace through an exercise ramp with a TLC / IC / EELV bar), effort (neural drive bars),
   and downstream (V/Q mismatch, then the right heart and the published mean PAP bands).
   Second widget: a breathing-rate slider driving the same simple emptying model breath by breath, with its own
   time scrubber. Third: FEV1 decline bars. The model is a teaching sketch in fractions of total lung capacity:
   relaxation volume, time constants and tidal volumes are chosen for drawing, not measured, and every number
   the model prints is labelled "model". Published numbers in the text carry their sources. */
const BR_STEPS=[
 {from:0,at:.08,k:'Resistance',t:'A slow lung to empty',sub:'narrow airways plus a floppy lung: slow emptying',
  txt:`Expiratory flow limitation is called the pathophysiological hallmark of COPD, and dyspnoea its most prominent and distressing symptom [[ODonnell2006]]. Hogg explains airflow limitation as a prolonged time constant for emptying the lung: narrowed small conducting airways add resistance, and emphysema makes the lung more compliant. Thicker airway walls also stop the airway widening normally as the lung inflates [[Hogg2004Lancet]].`,
  pt:`Narrow airways and a floppy lung make breathing out slow [[Hogg2004Lancet]].`,
  hook:`Airflow limitation is a prolonged emptying time constant: more airway resistance plus a more compliant lung [[Hogg2004Lancet]].`},
 {from:.17,at:.25,k:'Flow limit',t:'Breathing out hits a ceiling',sub:'the tidal breath meets the maximum possible flow',
  txt:`Calverley and Koulouris describe expiratory flow limitation and dynamic hyperinflation as linked concepts [[Calverley2005]]. In 117 outpatients, tidal expiratory flow limitation, measured with negative expiratory pressure, correlated with chronic dyspnoea (rs>0.5) more strongly than FEV1 (rs<−0.4) or FVC, and stayed the best predictor after adjusting for FEV1 [[Eltayara1996]]. Of 52 patients, 29 were flow-limited at rest; inspiratory capacity was normal in all who were not, and reduced in most who were [[Diaz2000]].`,
  pt:`When you breathe out, the air can only leave so fast. How short of breath people feel tracks this limit more closely than the usual blow test [[Eltayara1996]].`,
  hook:`Tidal expiratory flow limitation tracks chronic dyspnoea better than FEV1 [[Eltayara1996]].`},
 {from:.34,at:.44,k:'Air trapping',t:'Each breath starts a little fuller',sub:'faster breathing leaves too little time to empty',
  txt:`Dynamic hyperinflation is the temporary rise in operating lung volumes above resting values during exertion [[ODonnell2006]]. When breathing speeds up there is not enough time to breathe all the way out, so air builds up [[ODonnell2001,ODonnell2006]]. In 105 patients (FEV1 37% predicted), 80% hyperinflated during incremental cycling, and inspiratory capacity fell by a mean 0.37 L (14% predicted), with wide variation [[ODonnell2001]].`,
  pt:`When you are active and breathe faster, there is not enough time to breathe all the way out. Air builds up and the lungs get too full [[ODonnell2001,ODonnell2006]].`,
  hook:`Dynamic hyperinflation shows as a fall in inspiratory capacity during exercise: a mean 0.37 L, in 80% of patients [[ODonnell2001]].`},
 {from:.5,at:.6,k:'Squeeze',t:'Tidal volume has nowhere to go',sub:'inspiratory capacity shrinks; breaths stay small',
  txt:`Hyperinflation overloads the inspiratory muscles, makes them functionally weaker and stops tidal volume rising normally [[ODonnell2006]]. Resting IC best predicted how far it would fall (r=−0.50), peak VO2 tracked peak tidal volume (r=0.68), and peak tidal volume tracked IC at peak exercise (r=0.79) [[ODonnell2001]]. In flow-limited patients, resting IC was the only predictor of exercise tolerance (r=0.73 with maximum work rate, 0.75 with VO2 max) [[Diaz2000]]. The resting IC/TLC ratio independently predicted all-cause and respiratory mortality in 689 patients [[Casanova2005]].`,
  pt:`With the lungs already nearly full, each new breath can only be small and shallow [[ODonnell2006]].`,
  hook:`Resting IC/TLC predicts mortality, independent of the BODE index [[Casanova2005]].`},
 {from:.67,at:.75,k:'Effort',t:'The brain shouts, the chest barely moves',sub:'neural drive about three times normal at rest',
  txt:`Diaphragm EMG relative to maximum, an index of neural respiratory drive, was 9.0% at rest in 100 healthy people and 27.9% in 30 COPD patients, and correlated with FEV1, vital capacity and inspiratory capacity [[Jolley2009]]. Dyspnoea intensity during exercise correlates with end-expiratory lung volume and with the ratio of inspiratory effort to volume moved; O’Donnell calls this neuromechanical dissociation [[ODonnell2006]]. Imaging studies link dyspnoea to cortico-limbic areas involved in interoception and nociception [[Parshall2012]].`,
  pt:`The brain has to send a much stronger signal to the breathing muscles than in someone with healthy lungs. That extra effort is part of what breathlessness feels like [[Jolley2009]].`,
  hook:`Neural drive at rest: 27.9% of maximum in COPD vs 9.0% in healthy people [[Jolley2009]].`},
 {from:.83,at:.92,k:'Downstream',t:'Mismatch, low oxygen, a strained right heart',sub:'V/Q mismatch, then mild pulmonary hypertension',
  txt:`In 23 people with advanced COPD, V/Q mismatch and shunt explained all of the hypoxaemia at rest and on exercise, with no evidence of diffusion limitation. High-V/Q areas were common where the capillary bed was lost; low-V/Q areas in those with severe cough and sputum [[Wagner1977]]. Chronic alveolar hypoxia remodels the pulmonary vessels, giving pre-capillary pulmonary hypertension; in stable disease the resting mean pulmonary artery pressure usually lies between 20 and 35 mmHg. Cor pulmonale is pulmonary hypertension caused by lung disease, which enlarges the right ventricle and may lead to right heart failure [[Weitzenblum2009]].`,
  pt:`Low oxygen happens because air and blood no longer meet evenly in the lungs. Over time this can strain the right side of the heart; in COPD the strain is usually mild [[Wagner1977,Weitzenblum2009]].`,
  hook:`Hypoxaemia in COPD comes from V/Q mismatch, not diffusion limitation [[Wagner1977]]. PH in COPD is usually mild: mean PAP 20–35 mmHg [[Weitzenblum2009]].`}
];
const BR_TXT={
 narrow:'narrow, thick-walled airway',floppy:'floppy air sacs',healthy:'healthy lung',copd:'COPD lung',
 secs:'seconds of breathing out',left:'air still to leave',
 support:'spokes: support from the surrounding lung',closes:'airway narrows on each breath out',bin:'breathing in',bout:'breathing out',
 vol:'lung volume',flow:'flow out',maxF:'maximum possible flow',tidal:'tidal breath',limited:'flow-limited part',
 tlc:'TLC',ic:'IC',eelv:'EELV',stair:'end-expiratory volume',time:'time →',rr:n=>`breathing rate: ${n} a minute`,
 pub:'published: IC fell by a mean 0.37 L',capped:'tidal volume capped near TLC',
 drive:'Neural drive at rest, diaphragm EMG, % of maximum',signal:'signal from the brain',chest:'chest moves little',
 nd:[['Healthy, 18–50 years',8.2],['Healthy, 51–80 years',11.4],['Healthy, all',9.0],['COPD',27.9]],pc:v=>`${v.toFixed(1)}%`,
 lowVQ:'blocked airway: low V/Q',highVQ:'lost capillaries: high V/Q',venous:'blood in',arterial:'blood out: less oxygen',plug:'mucus',
 rv:'right ventricle enlarges',mpap:'Mean pulmonary artery pressure, mmHg',typ:'usual in stable COPD: 20–35',sev:'severe: over 40, under 5% of patients'
};
/* the emptying model: breaths in fractions of TLC (see the header comment) */
function brSim(rrFn,copd,T){const tau=copd?1.1:.3,vr=copd?.58:.45,cap=.95;let t=0,v=vr,k=0;const pts=[[0,vr]],br=[];
  while(t<T&&k<80){const rr=rrFn(k),Tb=60/rr,Ti=Tb*.4,Te=Tb-Ti,vt=Math.min(.12+.005*(rr-12),.26),ve=Math.max(0,Math.min(vt,cap-v)),v0=v;
    for(let s=1;s<=8;s++){const u=s/8;pts.push([t+Ti*u,v0+ve*(1-Math.cos(Math.PI*u))/2])}
    const top=v0+ve;for(let s=1;s<=14;s++){const tt=Te*s/14;pts.push([t+Ti+tt,vr+(top-vr)*Math.exp(-tt/tau)])}
    v=vr+(top-vr)*Math.exp(-Te/tau);br.push({t0:t,t1:t+Tb,rr,vt,ve,eelv:v0,eilv:top,capped:ve<vt-.005});t+=Tb;k++}
  return {pts,br,T:t,vr}}
/* a volume trace up to time tc, with TLC line, EELV staircase and a lung-volume bar */
function brTrace(P,sim,tc,o={}){const v2y=v=>P.y+P.h-(v-.3)/.7*P.h,t2x=tt=>P.x+tt/o.T*P.w;let s='';
  s+=`<line x1="${P.x}" x2="${P.x+P.w}" y1="${f1(v2y(1))}" y2="${f1(v2y(1))}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:5 4"/><text x="${P.x+P.w}" y="${f1(v2y(1)-5)}" class="t-xs" text-anchor="end" style="fill:var(--ink)">${BR_TXT.tlc}</text>`;
  s+=`<path d="M${P.x} ${P.y}V${P.y+P.h}H${P.x+P.w}" class="axis" style="fill:none"/><text x="${P.x}" y="${P.y-8}" class="t-xs">${BR_TXT.vol}</text><text x="${P.x+P.w}" y="${P.y+P.h+14}" class="t-xs" text-anchor="end">${BR_TXT.time}</text>`;
  let d='',last=sim.pts[0];for(const q of sim.pts){if(q[0]>tc)break;d+=(d?'L':'M')+f1(t2x(q[0]))+' '+f1(v2y(q[1]));last=q}
  if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--air);stroke-width:2.2;stroke-linejoin:round"/>`;
  const done=sim.br.filter(b=>b.t0<=tc);let e='';done.forEach((b,i)=>{e+=(i?'L':'M')+f1(t2x(b.t0))+' '+f1(v2y(b.eelv))+'L'+f1(t2x(Math.min(b.t1,tc)))+' '+f1(v2y(b.eelv))});
  if(e)s+=`<path d="${e}" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-dasharray:4 3"/>`;
  done.forEach(b=>{if(b.capped)s+=`<circle cx="${f1(t2x(b.t0+(b.t1-b.t0)*.4))}" cy="${f1(v2y(b.eilv))}" r="3" style="fill:var(--bad)"/>`});
  if(o.stairLbl&&done.length)s+=`<text x="${P.x+6}" y="${f1(v2y(done[0].eelv)+14)}" class="t-xs" style="fill:var(--bad)">${BR_TXT.stair}</text>`;
  const cur=done.length?done[done.length-1]:{eelv:sim.vr,eilv:sim.vr},bx=o.bx,bw=o.bw||26,ee=cur.eelv;
  if(bx!=null){s+=`<rect x="${bx}" y="${f1(v2y(1))}" width="${bw}" height="${f1(v2y(.3)-v2y(1))}" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${bx}" y="${f1(v2y(ee))}" width="${bw}" height="${f1(v2y(.3)-v2y(ee))}" rx="4" style="fill:var(--co2-soft);stroke:var(--co2)"/>`;
    s+=`<rect x="${bx}" y="${f1(v2y(1))}" width="${bw}" height="${f1(v2y(ee)-v2y(1))}" style="fill:var(--air-soft);stroke:var(--air)"/>`;
    s+=`<text x="${bx+bw+5}" y="${f1(v2y(1)+4)}" class="t-xs" style="fill:var(--ink)">${BR_TXT.tlc}</text><text x="${bx+bw+5}" y="${f1((v2y(1)+v2y(ee))/2+4)}" class="t-xs" style="fill:var(--air-ink);font-weight:700">${BR_TXT.ic}</text><text x="${bx+bw+5}" y="${f1(v2y(ee)+4)}" class="t-xs" style="fill:var(--co2-ink);font-weight:700">${BR_TXT.eelv}</text>`}
  return {svg:s,cur,n:done.length}}
inits.breathless=()=>{
  const svg=$('#brSvg'),rg=$('#brT');
  const EX=brSim(k=>Math.min(14+k*1.8,38),true,22);
  function lbl(x1,y1,x2,y2,txt,an='start'){return `<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:var(--muted);stroke-width:1"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="2" style="fill:var(--ink)"/><text x="${f1(x2+(an==='start'?3:an==='end'?-3:0))}" y="${f1(y2+(an==='middle'?12:4))}" class="t-xs" text-anchor="${an}" style="fill:var(--ink)">${txt}</text>`}
  function draw(t){
    const N=vb(svg,'720 390','400 626'),p=phaseOf(BR_STEPS,t),S=BR_STEPS[p];
    const L=N?{A:{x:16,y:58,w:368,h:250},B:{x:16,y:320,w:368,h:290},s1:[104,166,44],s2:[286,166,120],l1:[104,266,'middle'],l2:[286,266,'middle'],wr:20,
               one:[200,170,54],lg:[200,58,172],per:[150,290,190],vq:{u1:110,u2:290,ay:150,cy:238,ly:276}}
             :{A:{x:16,y:58,w:300,h:316},B:{x:332,y:58,w:372,h:316},s1:[132,146,48],s2:[132,284,110],l1:[214,146,'start'],l2:[214,284,'start'],wr:15,
               one:[166,196,62],lg:[166,82,206],per:[130,340,230],vq:{u1:96,u2:236,ay:178,cy:286,ly:322}};
    const A=L.A,B=L.B,ph=t*90,out=Math.sin(ph)<0;
    let s=`<text x="16" y="26" class="t-big">${S.t}</text><text x="16" y="44" class="t-sm">${S.sub}</text>`;
    s+=`<rect x="${A.x}" y="${A.y}" width="${A.w}" height="${A.h}" rx="12" style="fill:none;stroke:var(--line)"/><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:none;stroke:var(--line)"/>`;
    const lab=(xy,txt)=>wrapT(xy[0],xy[1],txt,L.wr,{cls:'t-xs',lh:12,anchor:xy[2],style:'fill:var(--ink)'}).svg;
    /* plot area inside B */
    const G={x:B.x+40,y:B.y+34,w:B.w-(N?150:150),h:B.h-80};
    if(p===0){
      const k=ramp(t,0,.12);
      s+=airway(L.s1[0],L.s1[1],L.s1[2],{wall:.6*k,mucus:.25*k,squeeze:.3*k,tether:1-.4*k,ph,seed:4}).svg+lab(L.l1,BR_TXT.narrow);
      s+=alveoli(L.s2[0],L.s2[1],L.s2[2],{destroy:.55*k,elastin:true,o2:.5,ph:t*20,seed:6}).svg+lab(L.l2,BR_TXT.floppy);
      const P={x:B.x+44,y:B.y+40,w:B.w-64,h:B.h-96},u=ramp(t,.02,.15);
      s+=axes(P.x,P.y,P.w,P.h,{xt:[[0,'0'],[.25,'1'],[.5,'2'],[.75,'3'],[1,'4']],yt:[],grid:false})+`<text x="${P.x}" y="${P.y-10}" class="t-xs">${BR_TXT.left}</text><text x="${P.x+P.w}" y="${P.y+P.h+30}" class="t-xs" text-anchor="end">${BR_TXT.secs}</text>`;
      const cv=(tau,cl,w,da)=>`<path d="${pathFn(x=>1-Math.exp(-x*4*u/tau),P.x,P.x+P.w*u,P.y,P.y+P.h,80)}" style="fill:none;stroke:${cl};stroke-width:${w};${da?'stroke-dasharray:5 4':''}"/>`;
      if(u>0){s+=cv(.3,'var(--muted)',1.8,true)+cv(1.1,'var(--air)',2.6,false);
        s+=`<text x="${f1(P.x+P.w*.12)}" y="${f1(P.y+P.h-8)}" class="t-xs" style="fill:var(--muted)">${BR_TXT.healthy}</text>`;
        if(u>.5)s+=`<text x="${f1(P.x+P.w*.42)}" y="${f1(P.y+P.h*(1-Math.exp(-4*.42/1.1))-8)}" class="t-xs" style="fill:var(--air-ink);font-weight:700">${BR_TXT.copd}</text>`}
    }else if(p===1){
      const k=ramp(t,.17,.28),te=1-.75*k,[cx,cy,r]=L.one;
      s+=airway(cx,cy,r,{wall:.35,tether:te,collapse:out?.9*k+.15:0,ph,seed:4}).svg;
      s+=`<text x="${cx}" y="${A.y+20}" class="t-xs" text-anchor="middle" style="fill:var(--air-ink);font-weight:700">${out?BR_TXT.bout:BR_TXT.bin}</text>`;
      s+=wrapT(A.x+A.w/2,cy+r*1.45+(N?18:22),BR_TXT.support,N?44:40,{cls:'t-xs',lh:12,anchor:'middle',style:'fill:var(--ink)'}).svg;
      s+=wrapT(A.x+A.w/2,cy+r*1.45+(N?32:36),BR_TXT.closes,N?44:40,{cls:'t-xs',lh:12,anchor:'middle',style:'fill:var(--bad)'}).svg;
      /* flow-volume: x = volume from TLC (left) to RV (right); envelope and tidal loop */
      const P={x:B.x+36,y:B.y+40,w:B.w-56,h:B.h-120},y0=P.y+P.h*.72,fh=P.h*.7,env=spiroFV(1,1,1);
      s+=`<path d="M${P.x} ${P.y}V${P.y+P.h}" class="axis"/><line x1="${P.x}" x2="${P.x+P.w}" y1="${f1(y0)}" y2="${f1(y0)}" class="axis"/>`;
      s+=`<text x="${P.x}" y="${P.y-10}" class="t-xs">${BR_TXT.flow}</text><text x="${P.x+P.w}" y="${f1(y0+14)}" class="t-xs" text-anchor="end">${BR_TXT.vol}</text>`;
      let de='';for(let i=0;i<=100;i++){const u=i/100;de+=(i?'L':'M')+f1(P.x+u*P.w)+' '+f1(y0-env(u)*fh)}
      s+=`<path d="${de}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4"/><text x="${f1(P.x+P.w*.1)}" y="${f1(P.y+2)}" class="t-xs">${BR_TXT.maxF}</text>`;
      const a=lerp(.64,.44,k),b=lerp(.84,.76,k),amp=lerp(.14,.5,k);let ex='',lim='',ins='';
      for(let i=0;i<=60;i++){const u=lerp(a,b,i/60),tid=amp*Math.sin(Math.PI*i/60),f=Math.min(tid,env(u)),X=f1(P.x+u*P.w);ex+=(i?'L':'M')+X+' '+f1(y0-f*fh);
        if(tid>=env(u)-.004&&i>0&&i<60)lim+=(lim?'L':'M')+X+' '+f1(y0-f*fh);ins+=(i?'L':'M')+X+' '+f1(y0+amp*.6*Math.sin(Math.PI*i/60)*fh*.5)}
      s+=`<path d="${ex}" style="fill:none;stroke:var(--air);stroke-width:2.4"/><path d="${ins}" style="fill:none;stroke:var(--air);stroke-width:2.4;opacity:.6"/>`;
      if(lim)s+=`<path d="${lim}" style="fill:none;stroke:var(--bad);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<text x="${f1(P.x+b*P.w)}" y="${f1(y0+P.h*.32+4)}" class="t-xs" text-anchor="end" style="fill:var(--air-ink);font-weight:700">${BR_TXT.tidal}</text>`;
      if(lim)s+=`<rect x="${P.x}" y="${B.y+B.h-30}" width="18" height="5" rx="2" style="fill:var(--bad)"/><text x="${P.x+24}" y="${B.y+B.h-24}" class="t-xs" style="fill:var(--bad);font-weight:700">${BR_TXT.limited}</text>`;
    }else if(p===2||p===3){
      const u=ramp(t,.34,.64),tc=u*EX.T;
      const R=brTrace(G,EX,tc,{T:EX.T,bx:B.x+B.w-(N?88:92),stairLbl:true});s+=R.svg;
      const hy=clamp((R.cur.eelv-.58)/.25);
      s+=lungs(L.lg[0],L.lg[1],L.lg[2],{tree:true,hyper:hy,breathe:(Math.sin(ph*1.6)+1)/2,bullae:.3});
      const rr=R.n?EX.br[R.n-1].rr:14;
      s+=`<text x="${A.x+A.w/2}" y="${A.y+A.h-(N?26:40)}" class="t-lbl" text-anchor="middle">${BR_TXT.rr(Math.round(rr))}</text>`;
      s+=`<text x="${G.x}" y="${B.y+B.h-14}" class="t-xs" style="fill:var(--ink)">${BR_TXT.pub}</text>`;
      if(p===3&&R.n&&EX.br[R.n-1].capped)s+=`<circle cx="${G.x+4}" cy="${B.y+B.h-32}" r="3" style="fill:var(--bad)"/><text x="${G.x+12}" y="${B.y+B.h-28}" class="t-xs" style="fill:var(--bad);font-weight:700">${BR_TXT.capped}</text>`;
    }else if(p===4){
      const [px,py,ps]=L.per,k=ramp(t,.67,.75),lean=.8;
      s+=person(px,py,ps,{lean,breath:(Math.sin(ph)+1)/2*.6});
      const hx=px+lean*ps*.18,hy=py-ps*(.9-.08*lean);
      for(let i=0;i<4;i++){const u=((t*20+i/4)%1),rr=ps*.12+u*ps*.32*k;s+=`<path d="M${f1(hx-rr*.7)} ${f1(hy-rr*.7)}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(hx+rr*.7)} ${f1(hy-rr*.7)}" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1((1-u)*k)}"/>`}
      const chx=px+lean*ps*.14+ps*.12,chy=py-ps*.6,m=2+Math.sin(ph)*2;
      s+=`<path d="M${f1(chx+4)} ${f1(chy)}h${f1(10+m)}" style="stroke:var(--air);stroke-width:2" marker-end="url(#brAr)"/>`;
      s+=`<defs>${marker('brAr','var(--air)',6)}</defs>`;
      s+=`<text x="${f1(hx)}" y="${f1(hy-ps*.5)}" class="t-xs" text-anchor="middle" style="fill:var(--bad);font-weight:700">${BR_TXT.signal}</text><text x="${f1(chx+18)}" y="${f1(chy+16)}" class="t-xs" style="fill:var(--air-ink);font-weight:700">${BR_TXT.chest}</text>`;
      const P={x:B.x+16,y:B.y+40,w:B.w-32};
      s+=wrapT(P.x,B.y+24,BR_TXT.drive,N?56:56,{cls:'t-xs',lh:12,style:'fill:var(--ink);font-weight:700'}).svg;
      BR_TXT.nd.forEach(([n,v],i)=>{const y=P.y+14+i*(N?52:56),w=P.w*v/30*ramp(t,.68+i*.01,.74+i*.01),cl=i===3?'var(--bad)':'var(--good)';
        s+=`<text x="${P.x}" y="${y}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${P.x}" y="${y+6}" width="${P.w}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${P.x}" y="${y+6}" width="${f1(w)}" height="18" rx="4" style="fill:${cl}"/><text x="${f1(P.x+Math.max(w,0)+6)}" y="${y+19}" class="t-sm" style="fill:var(--ink)">${BR_TXT.pc(v)}</text>`});
    }else{
      /* V/Q: two units over one capillary */
      const V=L.vq,k=ramp(t,.84,.9),hk=ramp(t,.88,.98),sz=N?92:96;
      s+=`<path d="M${A.x+12} ${V.cy}H${A.x+A.w-12}" style="stroke:var(--co2);stroke-width:10;stroke-linecap:round;opacity:.35"/>`;
      s+=`<path d="M${A.x+12} ${V.cy}H${f1(V.u2-sz*.3)}" style="stroke:var(--co2);stroke-width:6;stroke-linecap:round"/>`;
      s+=`<path d="M${f1(V.u2+sz*.3)} ${V.cy}H${A.x+A.w-12}" style="stroke:color-mix(in srgb,var(--o2) 45%,var(--co2));stroke-width:6;stroke-linecap:round"/>`;
      s+=`<path d="M${f1(V.u2-sz*.3)} ${V.cy}H${f1(V.u2+sz*.3)}" style="stroke:var(--capillary);stroke-width:2;stroke-dasharray:3 4;opacity:.7"/>`;
      for(let i=0;i<8;i++){const u=(t*6+i/8)%1;s+=`<circle cx="${f1(lerp(A.x+16,A.x+A.w-16,u))}" cy="${V.cy}" r="2.6" style="fill:${u<.55?'var(--co2-ink)':'var(--o2)'};opacity:${f1(u<.55?1:.55)}"/>`}
      [[V.u1,.05,true],[V.u2,.7*k,false]].forEach(([ux,de,plug])=>{
        s+=`<path d="M${ux} ${A.y+14}V${f1(V.ay-sz*.3)}" style="stroke:var(--airway);stroke-width:12;stroke-linecap:round"/><path d="M${ux} ${A.y+14}V${f1(V.ay-sz*.3)}" style="stroke:var(--air-soft);stroke-width:6"/>`;
        if(plug)s+=`<rect x="${ux-7}" y="${f1(V.ay-sz*.3-34)}" width="14" height="${f1(20*k+2)}" rx="4" style="fill:var(--mucus)"/>`;
        s+=alveoli(ux,V.ay,sz,{destroy:de,cap:!plug||true,o2:plug?.1:.8,ph:t*20,seed:plug?8:9}).svg;
        s+=`<path d="M${ux} ${f1(V.ay+sz*.45)}V${V.cy-6}" style="stroke:var(--capillary);stroke-width:2;opacity:${plug?1:.4}"/>`});
      s+=wrapT(V.u1,V.ly,BR_TXT.lowVQ,N?22:20,{cls:'t-xs',lh:12,anchor:'middle',style:'fill:var(--ink);font-weight:700'}).svg;
      s+=wrapT(V.u2,V.ly,BR_TXT.highVQ,N?22:20,{cls:'t-xs',lh:12,anchor:'middle',style:'fill:var(--ink);font-weight:700'}).svg;
      s+=`<text x="${A.x+14}" y="${V.cy-12}" class="t-xs" style="fill:var(--co2-ink)">${BR_TXT.venous}</text><text x="${A.x+A.w-14}" y="${V.cy-12}" class="t-xs" text-anchor="end" style="fill:var(--o2-ink)">${BR_TXT.arterial}</text>`;
      /* right heart and mean PAP bands */
      const hx=B.x+B.w/2,hy=B.y+(N?106:118),hs=N?120:130;
      s+=heart(hx,hy,hs,{right:hk*.85});
      s+=lbl(hx-hs*.48,hy,B.x+14,B.y+24,BR_TXT.rv,'start');
      const sc={x:B.x+24,y:B.y+B.h-(N?80:84),w:B.w-48},m2x=v=>sc.x+v/50*sc.w;
      s+=`<text x="${sc.x}" y="${sc.y-14}" class="t-xs" style="fill:var(--ink);font-weight:700">${BR_TXT.mpap}</text><rect x="${sc.x}" y="${sc.y}" width="${sc.w}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${f1(m2x(20))}" y="${sc.y}" width="${f1(m2x(35)-m2x(20))}" height="16" style="fill:var(--warn-soft);stroke:var(--warn)"/><rect x="${f1(m2x(40))}" y="${sc.y}" width="${f1(m2x(50)-m2x(40))}" height="16" style="fill:var(--bad-soft);stroke:var(--bad)"/>`;
      [0,10,20,30,40,50].forEach(v=>s+=`<text x="${f1(m2x(v))}" y="${sc.y+28}" class="t-xs" text-anchor="middle">${v}</text>`);
      s+=`<text x="${sc.x}" y="${sc.y+44}" class="t-xs" style="fill:var(--warn)">${BR_TXT.typ}</text><text x="${sc.x}" y="${sc.y+58}" class="t-xs" style="fill:var(--bad)">${BR_TXT.sev}</text>`;
    }
    svg.innerHTML=s;setSt(p);$('#brNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#brPlay'),draw,20000,'%t:player.replay%','breathless');
  const setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- try it: breathing rate during exercise ---- */
  const xs=$('#brExSvg'),xr=$('#brRR'),xo=$('#brRRV'),xt=$('#brExT'),xb=$('#brLung'),xd=$('#brExRead');let copd=true;
  function drawEx(tt){const N=vb(xs,'720 300','400 360'),rr=+xr.value,sim=brSim(()=>rr,copd,20),tc=tt*20;
    const G=N?{x:40,y:36,w:262,h:270}:{x:56,y:36,w:540,h:220};
    const R=brTrace(G,sim,tc,{T:20,bx:N?328:620,stairLbl:true});
    xs.innerHTML=R.svg+`<text x="${G.x}" y="${G.y+G.h+28}" class="t-xs">${BR_EX.win}</text>`;
    xo.textContent=BR_EX.rate(rr);
    const ic=Math.round((1-R.cur.eelv)/(1-sim.vr)*100),cp=sim.br.slice(0,R.n).some(b=>b.capped);
    xd.innerHTML=`<span>${BR_EX.lung(copd)}</span><span>${BR_EX.breaths(R.n)}</span><span>${BR_EX.ic(ic)}</span>${cp?`<span><b>${BR_TXT.capped}</b></span>`:''}`;
    $$('[data-lung]',xb).forEach(b=>b.setAttribute('aria-pressed',(b.dataset.lung==='copd')===copd))}
  const xstop=playWire(xt,$('#brExPlay'),drawEx,10000,'%t:player.replay%','breathless');
  xr.addEventListener('input',()=>{xstop();drawEx(+xt.value)});
  xb.addEventListener('click',e=>{const b=e.target.closest('[data-lung]');if(!b)return;xstop();copd=b.dataset.lung==='copd';drawEx(+xt.value)});
  drawEx(+xt.value);

  /* ---- FEV1 decline ---- */
  const fs=$('#brFevSvg'),fb=$('#brFevBtns'),fn=$('#brFevNote');let fv='eclipse';
  function drawFev(){const D=BR_FEV[fv],n=D.rows.length,N=NARROW(),H=N?40+n*46:44+n*30;vb(fs,'720 '+H,'400 '+H);
    let s=`<text x="16" y="22" class="t-sm" style="fill:var(--ink)">${D.ttl}</text>`;
    D.rows.forEach(([lb,v,cl],i)=>{const w=v/D.max;
      if(N){const y=48+i*46;s+=`<text x="16" y="${y}" class="t-xs" style="fill:var(--ink)">${lb}</text><rect x="16" y="${y+7}" width="300" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="16" y="${y+7}" width="${f1(300*w)}" height="18" rx="4" style="fill:${cl}"/><text x="${f1(22+300*w)}" y="${y+21}" class="t-sm" style="fill:var(--ink)">${D.fmt(v)}</text>`}
      else{const y=44+i*30;s+=`<text x="16" y="${y+13}" class="t-xs" style="fill:var(--ink)">${lb}</text><rect x="270" y="${y}" width="380" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="270" y="${y}" width="${f1(380*w)}" height="18" rx="4" style="fill:${cl}"/><text x="${f1(276+380*w)}" y="${y+14}" class="t-sm" style="fill:var(--ink)">${D.fmt(v)}</text>`}});
    fs.innerHTML=s;fn.innerHTML=D.note;$$('[data-fv]',fb).forEach(b=>b.setAttribute('aria-pressed',b.dataset.fv===fv))}
  fb.addEventListener('click',e=>{const b=e.target.closest('[data-fv]');if(!b)return;fv=b.dataset.fv;drawFev()});
  drawFev();
  const prev=redraws.breathless;redraws.breathless=()=>{prev&&prev();drawFev()};
};
const BR_EX={win:'a 20-second window',rate:n=>`${n} breaths a minute`,lung:c=>c?'Model lung: COPD (slow to empty)':'Model lung: healthy (empties fast)',
 breaths:n=>`Breaths so far: ${n}`,ic:v=>`Inspiratory capacity left: ${v}% of its resting size (model)`};
const BR_FEV={
 eclipse:{ttl:'ECLIPSE, 2,163 patients over 3 years: yearly change in FEV1',max:40,fmt:v=>`${v}% of patients`,
  rows:[['lost more than 40 mL a year',38,'var(--bad)'],['lost 21–40 mL a year',31,'var(--warn)'],['changed by less than 20 mL a year',23,'var(--muted)'],['gained more than 20 mL a year',8,'var(--good)']],
  note:`Mean decline was 33 mL a year, with a between-patient standard deviation of 59 mL a year. Decline was faster by 21 mL a year in current smokers, by 13 mL a year with emphysema and by 17 mL a year with bronchodilator reversibility. [[Vestbo2011]]`},
 lhs:{ttl:'Lung Health Study: FEV1 decline, mL a year',max:70,fmt:v=>`${v} mL/yr`,
  rows:[['Continuing smokers, 5 years',62,'var(--bad)'],['Sustained quitters, 5 years',31,'var(--good)'],['Men, continuing smokers, 11 years',66.1,'var(--bad)'],['Women, continuing smokers, 11 years',54.2,'var(--bad)'],['Men, sustained quitters, 11 years',30.2,'var(--good)'],['Women, sustained quitters, 11 years',21.5,'var(--good)']],
  note:`Among 3,926 smokers with mild-to-moderate obstruction, quitters gained an average of 47 mL (2%) in FEV1 the year after quitting, and their later decline was half that of continuing smokers. [[Scanlon2000]] At 11 years, 38% of continuing smokers had FEV1 below 60% predicted, compared with 10% of sustained quitters. [[Anthonisen2002]] Lost function is not regained, but the further rate of loss reverts to normal. [[Fletcher1977]]`}
};
