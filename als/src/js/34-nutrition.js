/* =============== 3.4 swallowing and feeding tubes =============== */
const NU_STEPS=[
 {from:0,at:.04,k:'Swallow',t:'A safe swallow',
  txt:`In a swallow the tongue pushes the food back, the larynx lifts and the epiglottis tips over the airway, and the food passes behind it into the oesophagus. Throat, larynx and breathing muscles work together, so bulbar weakness affects swallowing, cough and the airway as well as speech. ESPEN 2018 recommends screening for malnutrition and dysphagia at diagnosis and about every 3 months. [[Berlowitz2023,Burgos2018ESPEN,NICE2016]]`,
  pt:'Swallowing uses many small muscles in the mouth and throat. They also close the airway so food does not go the wrong way.'},
 {from:.12,at:.16,k:'Dysphagia',t:'Slow meals, coughing at meals',
  txt:`Dysphagia shows as slow, tiring meals and coughing or choking. In 145 people followed with endoscopic swallow studies (FEES) for about 2 years, dysphagia rose from 35% to 73% in spinal onset and from 95% to 98% in bulbar onset, and 8% of those with dysphagia on FEES did not notice it. It brings choking, aspiration, weight loss and dehydration, and aspiration pneumonia is a stated risk. [[Onesti2017,Miller2009AAN,Burgos2018ESPEN]]`,
  pt:'When the throat muscles weaken, food and drink can slip toward the airway. Meals get slower and people may cough while eating.',
  hook:'Food entering the larynx above the vocal folds is penetration; below them it is aspiration. Some people with dysphagia do not notice it (8% on FEES). [[Onesti2017]]'},
 {from:.26,at:.3,k:'Texture',t:'Adapting food and drink',
  txt:`Texture-modified food and thickened drinks are graded on the IDDSI framework, an 8-level scale from 0 to 7 with a number, label and colour for each level. ESPEN 2018 recommends texture adaptation and postures such as chin tuck in moderate dysphagia, and videofluoroscopy or FEES can show which textures are handled safely. [[Cichero2017,Burgos2018ESPEN,Miller2009AAN]]`,
  pt:'Food can be made softer and drinks thicker, and a swallowing test can show which textures go down safely.'},
 {from:.36,at:.4,k:'Energy',t:'Weight loss and the energy gap',
  txt:`A 5% loss from usual weight at diagnosis carried a 30% higher risk of death in a cohort of 92 people. About 41-50% of people with ALS are hypermetabolic, using more energy at rest than predicted, while eating gets harder. ESPEN estimates needs at about 30 kcal/kg a day without ventilation and 25-30 kcal/kg on NIV. [[Marin2011,Steyn2018,Bouteloup2009,Burgos2018ESPEN]]`,
  pt:'Many people with ALS burn more energy than usual while eating less, so weight falls. Keeping weight on matters.',
  hook:'Weight loss predicts shorter survival in ALS: 5% lost by diagnosis carried a 30% higher risk of death (Marin 2011). [[Marin2011]]'},
 {from:.44,at:.48,k:'Window',t:'Gastrostomy while breathing allows',
  txt:`NICE recommends discussing gastrostomy early and at regular intervals, explaining the benefits of early placement and the risks of late placement. EFNS, as quoted by ProGas and Dorst, places it after 10% or more weight loss and before VC falls below 50% predicted; ESPEN before severe weight loss and before breathing is severely impaired; Canada names 5-10% weight loss, a 1-point BMI fall or BMI below 18.5, with referral as FVC approaches 50%. [[NICE2016,Andersen2012EFNS,ProGas2015,Dorst2019,Burgos2018ESPEN,Shoesmith2020]]`,
  pt:'A feeding tube is easier and safer to place while breathing is still fairly strong, so teams raise it early.',
  hook:'Gastrostomy is discussed early and placed, in the guideline wording, before FVC falls to about 50% and before severe weight loss.'},
 {from:.54,at:.6,k:'Procedure',t:'PEG, RIG or PIG',
  txt:`In ProGas (24 UK centres, 330 gastrostomies: 49% PEG, 37% RIG, 13% PIG), 30-day mortality was 3% after PEG, 3% after RIG and 7% after PIG (p=0.46), 6% of procedures could not be completed in each group, and the method did not affect the hazard of death after adjustment. AAN 2009 grades risk by FVC: above 50% low, 30-50% moderate, below 30% high. EAN 2024 starts NIV first when breathing is weak. [[ProGas2015,Miller2009AAN,VanDamme2024EAN]]`,
  pt:'There are three ways to place the tube. In a large UK study the risk in the first month was similar for all three.',
  hook:'ProGas: more than 10% weight loss before gastrostomy went with a hazard ratio for death of 2.51 and median survival of 7.7 against 12 months. [[ProGas2015]]'},
 {from:.74,at:.8,k:'After',t:'Weight stabilises',
  txt:`In 7 Class III studies summarised by AAN 2009, weight stabilised or rose modestly over 2-24 months with tube feeding, and oral intake continues as tolerated. Survival benefit rests on observational data only: the 2023 Cochrane review found no randomised trials. High-calorie feeding is still being tested in LIPCAL-ALS II. [[Miller2009AAN,Sulistyo2023,LIPCALALSII]]`,
  pt:'After the tube, weight usually stops falling. People can keep eating by mouth as far as they manage.',
  hook:'No randomised trial has compared tube feeding with continued oral feeding in ALS (Cochrane 2023). [[Sulistyo2023]]'}
];
const NU_PG={PEG:{m:3,n:'5 of 163',fvc:65.4,surv:341},RIG:{m:3,n:'4 of 121',fvc:59,surv:361},PIG:{m:7,n:'3 of 43',fvc:52,surv:201}};
const NU_TXT={
 time:[ ['early','Timing: early'],['late','Timing: late'] ],
 proc:[ ['PEG','PEG (endoscopic)'],['RIG','RIG (radiological)'],['PIG','PIG (per-oral, image-guided)'] ],
 tongue:'tongue',epi:'epiglottis',airway:'airway',oes:'oesophagus',pen:'penetration',asp:'aspiration',
 thin:'thin drink',thick:'thickened drink (IDDSI)',
 energy:'Energy (schematic)',needs:'energy needed',eaten:'energy eaten',eatenTube:'eaten + tube',stomach:'stomach',
 pg:{title:'ProGas: 30-day mortality',val:(m,n)=>`${m}% (${n})`,p:'p=0.46: no significant difference',wl:'Weight loss before the tube:',
   hi:'>10%: median 7.7 months, HR 2.51',lo:'10% or less: median 12 months'},
 wTitle:'Weight, % of pre-illness',fTitle:'FVC, % predicted',months:'months',
 wTh:[ {v:95,l1:'95%',l2:'5% loss'},{v:90,l1:'90%',l2:'10% loss'} ],
 fTh:[ {v:50,l1:'50%',l2:'EFNS: before'},{v:30,l1:'30%',l2:'AAN high risk'} ],
 band:{low:'AAN: low risk',mod:'moderate risk',high:'high risk'},
 zone:['discuss early','window'],placed:p=>`${p} placed`,
 read:(m,w,f,sw,tb)=>`<span>month <b>${m}</b></span><span>weight <b>${w}%</b> of pre-illness</span><span>FVC <b>${f}%</b></span><span>swallow <b>${sw}</b></span><span>tube <b>${tb}</b></span>`,
 sw:{safe:'safe',slow:'slow, effortful',pen:'penetration',asp:'aspiration'},tb:{none:'not yet',on:p=>`${p} in place`},
 risk:{low:'low',mod:'moderate',high:'high'},
 placedNote:(p,m,l,f,r)=>`<b>${p} placed at month ${m}:</b> weight ${l}% below the weight at diagnosis, FVC ${f}%, AAN 2009 risk band ${r}. [[Miller2009AAN]]`,
 lossNote:{hi:'In ProGas, more than 10% weight loss from diagnosis to gastrostomy went with median survival of 7.7 months against 12 months, and 10.7-fold higher odds of death within 30 days (95% CI 1.3-87.0). [[ProGas2015]]',
   lo:'In ProGas, people with 10% weight loss or less from diagnosis to gastrostomy had a median survival of 12 months, against 7.7 months above 10%. [[ProGas2015]]'},
 late:'<b>Late timing:</b> the tube is not yet placed, and weight and FVC keep falling. NICE lists the risks of late placement as low body mass, respiratory complications, dehydration and higher mortality. [[NICE2016]]',
 lateNiv:'EAN 2024: with respiratory insufficiency, NIV is started first and the gastrostomy done with the person established on NIV; ESPEN suggests RIG by an expert team with moderate to severe respiratory impairment. [[VanDamme2024EAN,Burgos2018ESPEN]]',
 procNote:(p,f,s)=>`<b>${p} in ProGas:</b> mean FVC at gastrostomy ${f}%, median survival after it ${s} days. The groups differed in breathing (p=0.004 for FVC), so these medians are not a fair comparison of methods. [[ProGas2015]]`
};
inits.nutrition=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT'),T=NU_TXT;let timing='early',proc='PEG';
  const MON=t=>t*30;
  const W0=t=>interp([ [0,99],[.15,98.5],[.35,96],[.5,93.5],[.65,90],[.8,86.5],[1,82] ],t);
  const F=t=>interp([ [0,95],[.15,92],[1,28] ],t);
  const tgOf=()=>timing==='early'?.56:.86;
  const Wt=t=>{const tg=tgOf();return t<tg?W0(t):W0(tg)+1.2*ramp(t,tg,tg+.2)};
  const cross=(f,lv)=>{for(let i=0;i<=1000;i++){const u=i/1000;if(f(u)<lv)return u}return 1};
  const TW0=cross(W0,95),TW1=cross(F,50),TD=.12;
  const weak=t=>ramp(t,.08,.9);
  const tl=(x,y,arr,cls,dy,st)=>arr.map((s,i)=>`<text x="${f1(x)}" y="${f1(y+i*dy)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`).join('');
  const along=(P,u)=>{const n=P.length-1,k=Math.min(n-1,Math.floor(u*n)),f=u*n-k;return [lerp(P[k][0],P[k+1][0],f),lerp(P[k][1],P[k+1][1],f)]};
  const BP=[ [62,98],[100,96],[128,100],[146,114],[148,140],[147,164],[147,190],[147,238] ];
  function swState(t){const w=weak(t);return w>.65?'asp':w>.3?'pen':w>.1?'slow':'safe'}
  function swallow(t){
    const sw=(t*14)%1,w=weak(t),thick=t>=.26,close=bump(sw,.26,.62)*(1-.55*ramp(w,.3,.9)),lift=bump(sw,.26,.62)*(1-.5*w);
    const pen=ramp(w,.3,.8),asp=w>.65;
    let s=`<path d="M70 8 Q20 8 22 50 L12 68 L24 72 L22 84 Q16 90 26 94 Q20 104 32 108 Q38 126 70 130 L98 134 L100 246 L182 246 L180 126 Q200 96 192 56 Q178 4 70 8 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<path d="M126 84 Q150 70 168 76 L166 164 L134 164 L130 120 Z" style="fill:var(--bg);stroke:var(--cell-line);stroke-width:1"/>`;
    s+=`<path d="M30 78 Q80 70 128 78 L142 92" style="fill:none;stroke:var(--cell-line);stroke-width:3;stroke-linecap:round"/>`;
    const tb=92-12*bump(sw,0,.34);
    s+=`<path d="M40 100 Q70 ${f1(tb-4)} 112 ${f1(tb)} Q132 ${f1(tb+4)} 134 114 Q122 126 90 124 Q58 122 40 100Z" style="fill:var(--muscle);stroke:var(--muscle-line);stroke-width:1.4"/>`;
    s+=`<text x="76" y="116" class="t-xs t-mid" style="fill:var(--ink)">${T.tongue}</text>`;
    s+=`<rect x="136" y="164" width="22" height="82" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.4"/>`;
    // larynx moves up during the swallow
    const ly=-6*lift;s+=`<g transform="translate(0 ${f1(ly)})">`;
    s+=`<rect x="104" y="150" width="26" height="${f1(96+6*lift)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.4"/>`;
    s+=`<path d="M104 184 L113 188 L104 192 Z M130 184 L121 188 L130 192 Z" style="fill:var(--air)"/>`;
    const tx=lerp(124,140,close),ty=lerp(110,150,close);
    s+=`<path d="M112 142 L${f1(tx)} ${f1(ty)}" style="stroke:var(--muscle-line);stroke-width:4;stroke-linecap:round"/>`;
    // penetration / aspiration fragment
    if(pen>.02&&sw>.38&&sw<.95){const a=ramp(sw,.38,.5),b=asp?ramp(sw,.5,.7):0;const fx=lerp(146,118,a),fy=lerp(140,160,a)+b*(198-160);
      s+=`<circle cx="${f1(fx)}" cy="${f1(fy-ly)}" r="${f1(2+3*pen)}" style="fill:var(--food);stroke:var(--bad);stroke-width:1.2"/>`}
    s+='</g>';
    if(w>.4&&sw>.55)s+=`<ellipse cx="150" cy="156" rx="${f1(3+5*ramp(w,.4,1))}" ry="3" style="fill:var(--food);opacity:.8"/>`;
    if(sw<.8){const [bx,by]=along(BP,clamp(sw/.8));const r=thick?9:7;
      s+=thick?`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${r}" ry="${f1(r*.8)}" style="fill:var(--food);stroke:var(--food);stroke-width:2"/>`:`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${r}" style="fill:var(--food);fill-opacity:.75;stroke:var(--food);stroke-width:1.2"/>`}
    s+=`<text x="96" y="148" class="t-xs t-end">${T.epi}</text><text x="98" y="232" class="t-xs t-end" style="fill:var(--air)">${T.airway}</text><text x="186" y="214" class="t-xs" style="fill:var(--food)">${T.oes}</text>`;
    if(pen>.05)s+=`<text x="96" y="176" class="t-sm t-end" style="fill:var(--bad)">${asp?T.asp:T.pen}</text>`;
    s+=`<text x="125" y="264" class="t-sm t-mid">${thick?T.thick:T.thin}</text>`;
    return s}
  function energy(t,x,y,w){const tg=tgOf(),need=1+.15*ramp(t,.3,.45);let eat=1-.3*ramp(t,.12,.7);const tube=t>=tg;if(tube)eat=lerp(eat,need,ramp(t,tg,tg+.06));
    const BW=w-120,sc=BW/1.2;let s=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${T.energy}</text>`;
    s+=`<text x="${x}" y="${y+16}" class="t-xs">${T.needs}</text><rect x="${x}" y="${y+20}" width="${f1(need*sc)}" height="10" rx="4" style="fill:var(--warn)"/>`;
    s+=`<text x="${x}" y="${y+42}" class="t-xs">${tube?T.eatenTube:T.eaten}</text><rect x="${x}" y="${y+46}" width="${f1(eat*sc)}" height="10" rx="4" style="fill:var(--food)"/>`;
    const cx=x+w-34,cy=y+34;
    s+=`<path d="M${cx-22} ${cy-8} Q${cx-10} ${cy-20} ${cx+8} ${cy-14} Q${cx+24} ${cy-6} ${cx+18} ${cy+10} Q${cx+4} ${cy+20} ${cx-14} ${cy+10} Q${cx-26} ${cy+2} ${cx-22} ${cy-8}Z" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.4"/>`;
    s+=`<text x="${cx}" y="${cy+32}" class="t-xs t-mid">${T.stomach}</text>`;
    if(tube)s+=`<path d="M${cx+4} ${cy-14} L${cx+4} ${y-6}" style="stroke:var(--food);stroke-width:3"/><circle cx="${cx+4}" cy="${y-6}" r="4" style="fill:var(--food)"/><text x="${cx-6}" y="${y-2}" class="t-sm t-end" style="fill:var(--food)">${proc}</text>`;
    return s}
  function progas(t,x,y,w){const tg=tgOf(),placed=t>=tg,loss=(W0(0)-W0(tg))/W0(0)*100,P=T.pg;
    let s=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${P.title}</text>`;
    const BW=w-150;
    ['PEG','RIG','PIG'].forEach((k,i)=>{const G=NU_PG[k],on=k===proc,yy=y+12+i*18;
      s+=`<text x="${x}" y="${yy+9}" class="t-sm"${on?' style="fill:var(--ink);font-weight:700"':''}>${k}</text><rect x="${x+34}" y="${yy}" width="${f1(BW*G.m/7)}" height="11" rx="3" style="fill:var(--food);opacity:${on?1:.4}"/><text x="${f1(x+40+BW*G.m/7)}" y="${yy+9}" class="t-xs"${on?' style="fill:var(--ink)"':''}>${P.val(G.m,G.n)}</text>`});
    s+=`<text x="${x}" y="${y+74}" class="t-xs">${P.p}</text><text x="${x}" y="${y+92}" class="t-xs" style="fill:var(--ink)">${P.wl}</text>`;
    const hi=placed&&loss>10,lo=placed&&loss<=10;
    s+=`<text x="${x}" y="${y+104}" class="t-xs" style="${hi?'fill:var(--bad);font-weight:700':''}">${P.hi}</text><text x="${x}" y="${y+116}" class="t-xs" style="${lo?'fill:var(--good);font-weight:700':''}">${P.lo}</text>`;
    return s}
  function charts(t,X0,X1,WY0,WY1,FY0,FY1,LX){const xt=u=>lerp(X0,X1,u),yw=v=>lerp(WY1,WY0,(v-78)/24),yf=v=>lerp(FY1,FY0,(v-20)/80),tg=tgOf();
    let s='';
    // discussion zone and window, through both plots
    s+=`<rect x="${f1(xt(TD))}" y="${WY0}" width="${f1(xt(TW0)-xt(TD))}" height="${FY1-WY0}" style="fill:var(--food-soft);opacity:.35"/>`;
    s+=`<rect x="${f1(xt(TW0))}" y="${WY0}" width="${f1(xt(TW1)-xt(TW0))}" height="${FY1-WY0}" style="fill:var(--food-soft);opacity:.9"/>`;
    const zy=(WY1+FY0)/2-4;
    s+=`<text x="${f1((xt(TD)+xt(TW0))/2)}" y="${f1(zy)}" class="t-xs t-mid" style="fill:var(--food)">${T.zone[0]}</text><text x="${f1((xt(TW0)+xt(TW1))/2)}" y="${f1(zy)}" class="t-xs t-mid" style="fill:var(--food);font-weight:700">${T.zone[1]}</text>`;
    s+=`<text x="${X0}" y="${WY0-8}" class="t-sm" style="fill:var(--ink)">${T.wTitle}</text><text x="${X0}" y="${FY0-8}" class="t-sm" style="fill:var(--ink)">${T.fTitle}</text>`;
    [80,85,90,95,100].forEach(v=>{s+=`<text x="${X0-5}" y="${f1(yw(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yw(100))}" y2="${f1(yw(100))}" class="grid"/>`;
    [20,40,60,80,100].forEach(v=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yf(v))}" y2="${f1(yf(v))}" class="grid"/><text x="${X0-5}" y="${f1(yf(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${WY1}" y2="${WY1}" class="axis"/><line x1="${X0}" x2="${X1}" y1="${FY1}" y2="${FY1}" class="axis"/>`;
    [0,6,12,18,24,30].forEach(m=>{s+=`<text x="${f1(xt(m/30))}" y="${FY1+14}" class="t-xs ${m===30?'t-end':m?'t-mid':''}">${m}</text>`});
    s+=`<text x="${LX}" y="${FY1+14}" class="t-xs">${T.months}</text>`;
    const w=Wt(t),f=F(t);
    T.wTh.forEach(h=>{const c=w<h.v,y=yw(h.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c?'var(--warn)':'var(--muted)'};stroke-width:${c?1.8:1};${c?'':'stroke-dasharray:4 4'}"/>`+tl(LX,y-1,[h.l1,h.l2],'t-xs',10,c?'fill:var(--warn)':'')});
    T.fTh.forEach(h=>{const c=f<h.v,y=yf(h.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c?'var(--warn)':'var(--muted)'};stroke-width:${c?1.8:1};${c?'':'stroke-dasharray:4 4'}"/>`+tl(LX,y-1,[h.l1,h.l2],'t-xs',10,c?'fill:var(--warn)':'')});
    s+=`<text x="${X0+4}" y="${f1(yf(50)-5)}" class="t-xs">${T.band.low}</text><text x="${X0+4}" y="${f1(yf(40)+3)}" class="t-xs">${T.band.mod}</text><text x="${X0+4}" y="${f1(yf(25)+3)}" class="t-xs">${T.band.high}</text>`;
    s+=`<path d="${pathFn(u=>(Wt(u)-78)/24,X0,X1,WY1,WY0)}" style="fill:none;stroke:var(--food);stroke-width:1.4;opacity:.3"/>`;
    s+=`<path d="${pathFn(u=>u<=t?(Wt(u)-78)/24:NaN,X0,X1,WY1,WY0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--food);stroke-width:3"/>`;
    s+=`<path d="${pathFn(u=>(F(u)-20)/80,X0,X1,FY1,FY0)}" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:.3"/>`;
    s+=`<path d="${pathFn(u=>u<=t?(F(u)-20)/80:NaN,X0,X1,FY1,FY0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--air);stroke-width:3"/>`;
    if(t>=tg){const x=xt(tg);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${WY0}" y2="${WY1}" style="stroke:var(--food);stroke-width:2"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${FY0}" y2="${FY1}" style="stroke:var(--food);stroke-width:2"/><circle cx="${f1(x)}" cy="${f1(yw(W0(tg)))}" r="5" style="fill:var(--panel);stroke:var(--food);stroke-width:2.5"/><circle cx="${f1(x)}" cy="${f1(yf(F(tg)))}" r="5" style="fill:var(--panel);stroke:var(--air);stroke-width:2.5"/>`;
      s+=`<text x="${f1(x-4)}" y="${f1(FY1-6)}" class="t-xs t-end" style="fill:var(--food);font-weight:700">${T.placed(proc)}</text>`}
    s+=`<circle cx="${f1(xt(t))}" cy="${f1(yw(w))}" r="5" style="fill:var(--food)"/><circle cx="${f1(xt(t))}" cy="${f1(yf(f))}" r="5" style="fill:var(--air)"/>`;
    s+=`<line x1="${f1(xt(t))}" x2="${f1(xt(t))}" y1="${WY0}" y2="${FY1}" style="stroke:var(--ink);stroke-width:1;opacity:.2"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 488','400 1030');let s='';
    if(N)s+=`<g transform="translate(38 4) scale(1.3)">${swallow(t)}</g>`+energy(t,24,374,352)+progas(t,24,454,352)+charts(t,44,262,612,762,806,986,272);
    else s+=`<g transform="translate(4 2)">${swallow(t)}</g>`+energy(t,12,286,240)+progas(t,12,364,240)+charts(t,300,580,30,190,234,414,590);
    svg.innerHTML=s;
    const p=phaseOf(NU_STEPS,t);setSt(p);
    const tg=tgOf(),placed=t>=tg,loss=(W0(0)-W0(tg))/W0(0)*100,fg=F(tg),band=fg>50?'low':fg>=30?'mod':'high';
    $('#nuRead').innerHTML=T.read(Math.round(MON(t)),Math.round(Wt(t)),Math.round(F(t)),T.sw[swState(t)],placed?T.tb.on(proc):T.tb.none);
    let ex='';
    if(placed)ex+=`<p>${T.placedNote(proc,Math.round(MON(tg)),Math.round(loss),Math.round(fg),T.risk[band])}</p><p>${loss>10?T.lossNote.hi:T.lossNote.lo}</p>`;
    else if(timing==='late'&&p>=5)ex+=`<p>${T.late}</p>`;
    if(timing==='late'&&p>=5)ex+=`<p>${T.lateNiv}</p>`;
    if(p>=5){const G=NU_PG[proc];ex+=`<p>${T.procNote(proc,G.fvc,G.surv)}</p>`}
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[p])+ex;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,22000,UI.replay,'nutrition');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  toggleRow($('#nuTime'),T.time,timing,v=>{timing=v;draw(+rg.value)});
  toggleRow($('#nuProc'),T.proc,proc,v=>{proc=v;draw(+rg.value)});
  draw(+rg.value);
};
