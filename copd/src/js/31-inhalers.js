/* =============== 3.1 Bronchodilators =============== */
/* Main scene: one airway smooth-muscle cell with a beta-2 receptor and an M3 receptor on its surface, a small
   airway cut across (the kit's airway(): its lumen widens as the muscle relaxes) and a results panel that
   changes with each step. Every bar or interval in the panel is a published number from research pass D;
   the cell, the molecules and the airway are schematic. The beta-2 path is drawn as a generic "relax signal":
   the research pass does not describe the messenger inside the cell, so the scene does not name one. */
const INH_STEPS=[
 {from:0,at:.1,k:'Rescue',t:'A short-acting reliever opens the airways for a few hours',
  txt:`Salbutamol (albuterol) acts preferentially on β2-adrenergic receptors, which predominate in bronchial smooth muscle. The Ventolin HFA label dose is "2 inhalations by oral inhalation every 4 to 6 hours" [[FDA-VentolinHFA]]. A Cochrane review of 13 crossover trials found that regular short-acting β2-agonist (SABA) use in stable COPD raised post-bronchodilator FEV1 by 0.14 L (95% CI 0.04 to 0.25) and improved daily breathlessness scores; the trials were too short to judge long-term harms [[Sestini2002]].`,
  pt:`A reliever inhaler works within minutes and lasts a few hours. It relaxes the muscle around the airways so air moves more easily [[Sestini2002,FDA-VentolinHFA]].`,
  hook:`SABA vs placebo (Cochrane, 13 crossover trials): FEV1 +0.14 L; people preferred the β2-agonist about 9 times more often (OR 9.04) [[Sestini2002]].`},
 {from:.2,at:.3,k:'One long-acting',t:'A LAMA blocks M3 receptors for 24 hours',
  txt:`The Spiriva label calls tiotropium "a long-acting, antimuscarinic agent". In the airways it works through "inhibition of M3-receptors at the smooth muscle leading to bronchodilation", and in preclinical studies its protection against methacholine-induced bronchoconstriction "lasted longer than 24 hours", which is why it is dosed once daily [[FDA-SpirivaHandiHaler]]. Across 22 studies (23,309 participants), tiotropium reduced the number of people with exacerbations versus placebo (OR 0.78; 95% CI 0.70 to 0.87), a number needed to treat of 16 for 1 year [[Karner2014]].`,
  pt:`A long-acting muscarinic antagonist (LAMA) sits on the "squeeze" receptor and keeps the muscle from tightening for a whole day [[FDA-SpirivaHandiHaler]].`,
  hook:`LAMA = blocks M3 receptors on airway smooth muscle; tiotropium is dosed once daily because its effect lasts more than 24 hours [[FDA-SpirivaHandiHaler]].`},
 {from:.4,at:.52,k:'LAMA vs LABA',t:'Tiotropium beat salmeterol on flare-ups',
  txt:`POET-COPD randomised 7376 people with moderate-to-very-severe COPD and a recent exacerbation to tiotropium 18 µg once daily or the long-acting β2-agonist (LABA) salmeterol 50 µg twice daily for 1 year. Tiotropium lengthened the time to the first moderate or severe exacerbation from 145 to 187 days (HR 0.83; 95% CI 0.77 to 0.90). Annual rates were 0.64 versus 0.72 (rate ratio 0.89) [[Vogelmeier2011]]. A Cochrane review of 7 studies agreed: fewer people with exacerbations on tiotropium than on a LABA (OR 0.86; 95% CI 0.79 to 0.93), with no difference in mortality [[Chong2012]].`,
  pt:`In a large trial, people on the LAMA tiotropium went longer before their first flare-up than people on the LABA salmeterol [[Vogelmeier2011]].`,
  hook:`POET-COPD: tiotropium vs salmeterol, time to first exacerbation 187 vs 145 days, HR 0.83 [[Vogelmeier2011]].`},
 {from:.6,at:.72,k:'Two long-acting',t:'LABA + LAMA together',
  txt:`The Stiolto Respimat label describes the LAMA-LABA pairing as combining "2 different classes of medication (an anticholinergic and a beta-agonist)" [[FDA-Stiolto]]. The ATS 2020 guideline makes "a strong recommendation for the use of long-acting β2-agonist (LABA)/long-acting muscarinic antagonist (LAMA) combination therapy over LABA or LAMA monotherapy in patients with COPD and dyspnea or exercise intolerance" [[Nici2020]]. GOLD 2023 recommends a dual long-acting bronchodilator as initial therapy for Group B "since dual therapy is more effective than monotherapy, with similar side effects", and LAMA + LABA for Group E too, except that triple therapy "can be considered" at blood eosinophils ≥300 cells/µL [[Agusti2023]]. In FLAME, indacaterol-glycopyrronium (LABA+LAMA) had fewer moderate-or-severe exacerbations than salmeterol-fluticasone (LABA+ICS): 0.98 versus 1.19 per year, with less pneumonia (3.2% vs 4.8%) [[Wedzicha2016]].`,
  pt:`Using two different long-acting medicines together usually helps breathing more than one alone, because each relaxes the muscle in a different way [[Nici2020,FDA-Stiolto]].`,
  hook:`FLAME: LABA+LAMA beat LABA+ICS on exacerbations (rate ratio 0.89), with less pneumonia (3.2% vs 4.8%) [[Wedzicha2016]].`},
 {from:.8,at:.93,k:'What it does not do',t:'Bronchodilators do not slow decline',
  txt:`UPLIFT randomised 5993 people (mean post-bronchodilator FEV1 1.32 L, 48% of predicted) to tiotropium or placebo for 4 years. Tiotropium kept FEV1 higher throughout, by 87–103 mL before bronchodilator and 47–65 mL after, and SGRQ scores were 2.3–3.3 units better. But the co-primary end point, the rate of FEV1 decline after day 30, did not differ significantly between the arms [[Tashkin2008D]].`,
  pt:`These medicines ease breathing and lower the chance of flare-ups. They do not cure COPD or stop the lungs from slowly changing [[Tashkin2008D]].`,
  hook:`UPLIFT: tiotropium improved FEV1, quality of life and exacerbations over 4 years but did not slow the rate of FEV1 decline [[Tashkin2008D]].`}
];
const INH_TXT={
 ph:['Reliever on the β2 receptor','LAMA on the M3 receptor','LAMA versus LABA','Both receptors at once','Higher, but the same slope'],
 phN:['Reliever on β2','LAMA on M3','LAMA versus LABA','Both receptors','Same slope'],
 sub:['salbutamol binds, the muscle relaxes, then wears off','tiotropium blocks acetylcholine at M3 all day','POET-COPD: tiotropium vs salmeterol, 1 year','a LABA on β2 and a LAMA on M3 together','UPLIFT: tiotropium vs placebo, 4 years'],
 subN:['binds, relaxes, wears off','blocks acetylcholine all day','POET-COPD, 1 year','LABA + LAMA together','UPLIFT, 4 years'],
 b2:'β2 receptor',m3:'M3 receptor',cell:'airway smooth-muscle cell',ach:'acetylcholine',
 relax:'relax signal',squeeze:'squeeze signal',airway:'small airway, cut across',
 saba:'salbutamol (SABA)',laba:'salmeterol (LABA)',lama:'tiotropium (LAMA)',labaG:'a LABA',lamaG:'a LAMA',
 lg:['SABA or LABA: β2 agonist','LAMA: M3 blocker','acetylcholine'],
 open:'open lumen',
 p0t:'Regular SABA vs placebo: FEV1 gain',p0r:'FEV1, L (95% CI)',p0d:'Label dose: 2 inhalations every 4 to 6 hours',
 p1t:'Tiotropium vs placebo (22 studies)',p1r:'Exacerbations, OR',p1n:'Number needed to treat: 16 for 1 year',
 p1c:'one dose',p1b:'protection over 24 h (preclinical, label)',h0:'0 h',h24:'24 h',
 p2t:'POET-COPD (7376 people, 1 year)',p2a:'Days to first exacerbation',p2b:'Exacerbations per year',
 p3t:'FLAME: LABA+LAMA vs LABA+ICS',p3a:'Mod./severe exacerbations per year',p3b:'Pneumonia, % of people',
 tio:'Tiotropium',sal:'Salmeterol',dual:'LABA + LAMA',lics:'LABA + ICS',
 p4t:'UPLIFT: FEV1 over 4 years (schematic)',p4tio:'tiotropium',p4pbo:'placebo',
 p4gap:'87–103 mL higher',p4gap2:'before bronchodilator',p4same:'rate of decline did not differ',yr:'years',y0:'0',y4:'4',
 days:'days',pct:'%',
 trCap:'Bars and intervals are the published results. A dashed line marks no difference (ratio 1).'
};
/* trial explorer: rows are 'pair' (arms with a value each), 'ci' (a ratio with its interval) or 'range'
   (a published range of differences). Numbers copied from research pass D. */
const INH_COL={tio:'var(--rx)',sal:'var(--bd)',pbo:'var(--muted)',dual:'var(--rx)',lics:'var(--ics)'};
const INH_TRIALS=[
 {id:'uplift',n:'UPLIFT',y:2008,rows:[
   {type:'range',h:'FEV1 before bronchodilator: mL higher with tiotropium than placebo',lo:87,hi:103,mn:0,mx:120,u:'mL',ticks:[0,60,120]},
   {type:'range',h:'FEV1 after bronchodilator: mL higher with tiotropium than placebo',lo:47,hi:65,mn:0,mx:120,u:'mL',ticks:[0,60,120]},
   {type:'range',h:'SGRQ: units better with tiotropium (lower score is better)',lo:2.3,hi:3.3,mn:0,mx:5,u:'units',ticks:[0,5]}],
  out:`<b>UPLIFT</b> randomised 5993 people to tiotropium or placebo for 4 years; other respiratory medicines except inhaled anticholinergics were allowed. FEV1 stayed higher with tiotropium at every time point, and at 4 years and 30 days tiotropium was associated with lower risks of exacerbations, related hospitalisations and respiratory failure. The co-primary end points, the rates of FEV1 decline, did not differ significantly after day 30 [[Tashkin2008D]].`},
 {id:'tiospir',n:'TIOSPIR',y:2013,rows:[
   {type:'ci',h:'Death: Respimat 5 µg vs HandiHaler 18 µg (HR)',est:.96,lo:.84,hi:1.09,mn:.7,mx:1.3,ticks:[.7,1,1.3]},
   {type:'ci',h:'Death: Respimat 2.5 µg vs HandiHaler 18 µg (HR)',est:1.00,lo:.87,hi:1.14,mn:.7,mx:1.3,ticks:[.7,1,1.3]},
   {type:'ci',h:'First exacerbation: Respimat 5 µg vs HandiHaler (HR)',est:.98,lo:.93,hi:1.03,mn:.7,mx:1.3,ticks:[.7,1,1.3]}],
  out:`<b>TIOSPIR</b> was designed to settle a safety question. A Cochrane subgroup had found more deaths with the tiotropium soft mist inhaler than with placebo (Peto OR 1.47; 95% CI 1.04 to 2.08), but not with the dry powder inhaler [[Karner2014]]. TIOSPIR randomised 17,135 people to Respimat 2.5 or 5 µg or HandiHaler 18 µg for a mean 2.3 years: both Respimat doses were noninferior to HandiHaler for death, and causes of death and major cardiovascular events were similar [[Wise2013]].`},
 {id:'poet',n:'POET-COPD',y:2011,rows:[
   {type:'pair',h:'Days to first moderate or severe exacerbation',arms:[{l:'Tiotropium',v:187,c:'tio'},{l:'Salmeterol',v:145,c:'sal'}],mx:200,u:'days',d:0},
   {type:'pair',h:'Moderate or severe exacerbations per patient-year',arms:[{l:'Tiotropium',v:.64,c:'tio'},{l:'Salmeterol',v:.72,c:'sal'}],mx:.8,d:2},
   {type:'pair',h:'Severe exacerbations per patient-year',arms:[{l:'Tiotropium',v:.09,c:'tio'},{l:'Salmeterol',v:.13,c:'sal'}],mx:.8,d:2},
   {type:'ci',h:'Time to first exacerbation, tiotropium vs salmeterol (HR)',est:.83,lo:.77,hi:.90,mn:.6,mx:1.2,ticks:[.6,1,1.2]}],
  out:`<b>POET-COPD</b> compared a LAMA with a LABA head to head in 7376 people with a recent exacerbation. Tiotropium 18 µg once daily delayed the first moderate or severe exacerbation versus salmeterol 50 µg twice daily, and the severe-exacerbation rate ratio was 0.73 (95% CI 0.66 to 0.82). Deaths were 64 (1.7%) and 78 (2.1%), and serious adverse events were similar [[Vogelmeier2011]].`},
 {id:'dynagito',n:'DYNAGITO',y:2018,rows:[
   {type:'ci',h:'Exacerbation rate ratio, tiotropium-olodaterol vs tiotropium (99% CI)',est:.93,lo:.85,hi:1.02,mn:.7,mx:1.2,ticks:[.7,1,1.2]}],
  out:`<b>DYNAGITO</b> randomised 7880 people to tiotropium-olodaterol (LAMA+LABA) or tiotropium alone. The exacerbation rate ratio was 0.93 (99% CI 0.85 to 1.02; P=0.0498), which missed the trial's 0.01 significance target. The authors concluded the combination "did not reduce exacerbation rate as much as expected" [[Calverley2018]].`},
 {id:'flame',n:'FLAME',y:2016,rows:[
   {type:'pair',h:'All exacerbations per patient-year (primary end point)',arms:[{l:'LABA + LAMA',v:3.59,c:'dual'},{l:'LABA + ICS',v:4.03,c:'lics'}],mx:4.5,d:2},
   {type:'pair',h:'Moderate or severe exacerbations per patient-year',arms:[{l:'LABA + LAMA',v:.98,c:'dual'},{l:'LABA + ICS',v:1.19,c:'lics'}],mx:4.5,d:2},
   {type:'pair',h:'Pneumonia, % of people',arms:[{l:'LABA + LAMA',v:3.2,c:'dual'},{l:'LABA + ICS',v:4.8,c:'lics'}],mx:6,u:'%',d:1},
   {type:'ci',h:'All exacerbations, rate ratio (95% CI)',est:.89,lo:.83,hi:.96,mn:.6,mx:1.2,ticks:[.6,1,1.2]}],
  out:`<b>FLAME</b> enrolled 3362 people, all with at least one exacerbation in the previous year, and compared indacaterol-glycopyrronium (LABA+LAMA) with salmeterol-fluticasone (LABA+ICS) for 52 weeks. The LABA+LAMA was both noninferior and superior on the annual rate of all exacerbations, and the benefit did not depend on the baseline blood eosinophil count [[Wedzicha2016]]. The 2023 Cochrane update (19 studies) found similar exacerbation odds for the two pairings overall (OR 0.91; 95% CI 0.78 to 1.06), with a larger trough FEV1 gain on LAMA+LABA [[Fukuda2023]].`}
];
function inhBars(x,y,w,items,o){const lw=o.lw||96,mx=o.mx,bh=o.bh||14,gap=o.gap||6,g=o.g==null?1:o.g,aw=w-lw-52;let s='';
  items.forEach((it,i)=>{const yy=y+i*(bh+gap),bw=Math.max(.5,aw*clamp(it.v/mx)*g);
    s+=`<text x="${f1(x+lw-6)}" y="${f1(yy+bh*.78)}" class="t-sm t-end" style="fill:var(--ink)">${it.l}</text>`;
    s+=`<rect x="${f1(x+lw)}" y="${f1(yy)}" width="${f1(aw)}" height="${bh}" rx="3" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(x+lw)}" y="${f1(yy)}" width="${f1(bw)}" height="${bh}" rx="3" style="fill:${it.col}"/>`;
    s+=`<text x="${f1(x+lw+bw+5)}" y="${f1(yy+bh*.8)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(g,.5,1))}">${it.t}</text>`});
  return {svg:s,h:items.length*(bh+gap)}}
/* an interval on a scale: est may be null (a published range with no point estimate) */
function inhCI(x,y,w,o){const lw=o.lw||0,x0=x+lw+8,x1=x+w-14,X=v=>lerp(x0,x1,(v-o.mn)/(o.mx-o.mn)),g=o.g==null?1:o.g;let s='';
  s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(y+14)}" y2="${f1(y+14)}" class="axis"/>`;
  (o.ticks||[]).forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(y+11)}" y2="${f1(y+17)}" class="axis"/><text x="${f1(X(v))}" y="${f1(y+28)}" class="t-xs t-mid">${String(v)}</text>`);
  if(o.ref!=null)s+=`<line x1="${f1(X(o.ref))}" x2="${f1(X(o.ref))}" y1="${f1(y-6)}" y2="${f1(y+14)}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
  const c=X(o.est==null?(o.lo+o.hi)/2:o.est),a=lerp(c,X(o.lo),g),b=lerp(c,X(o.hi),g);
  if(o.est==null)s+=`<rect x="${f1(a)}" y="${f1(y-2)}" width="${f1(Math.max(1,b-a))}" height="10" rx="3" style="fill:${o.col||'var(--rx)'};opacity:${f1(.3+.7*g)}"/>`;
  else s+=`<line x1="${f1(a)}" x2="${f1(b)}" y1="${f1(y+3)}" y2="${f1(y+3)}" style="stroke:${o.col||'var(--rx)'};stroke-width:2.4"/><rect x="${f1(c-5)}" y="${f1(y-2)}" width="10" height="10" style="fill:${o.col||'var(--rx)'};opacity:${f1(.3+.7*g)}"/>`;
  if(o.lbl)s+=`<text x="${f1(x+lw)}" y="${f1(y+7)}" class="t-sm t-end" style="fill:var(--ink)">${o.lbl}</text>`;
  if(o.txt)s+=`<text x="${f1(Math.min(b+8,x1-4))}" y="${f1(y-6)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(g,.5,1))}"${b+8>x1-60?' text-anchor="end"':''}>${o.txt}</text>`;
  return s}
/* renders trial rows (shared by 3.1 and 3.2): returns {svg,h} for a 720-wide or 400-wide viewBox */
function inhRows(rows,N,g,cols){const x=N?14:24,w=N?372:672,mxc=N?50:96,lw=N?104:130;let y=24,s='';
  rows.forEach(r=>{const W=wrapT(x,y,r.h,mxc,{cls:'t-lbl',lh:16});s+=W.svg;y+=W.h+6;
    if(r.type==='pair'){const B=inhBars(x,y,w,r.arms.map(a=>({l:a.l,v:a.v,col:cols[a.c],t:inhNum(a.v,r.d)+(r.u==='%'?'%':r.u?' '+r.u:'')})),{mx:r.mx,g,lw:N?(r.lwN||lw):(r.lw||lw),bh:16,gap:6});s+=B.svg;y+=B.h+18}
    else{const txt=r.type==='range'?`${r.lo}–${r.hi} ${r.u}`:`${inhNum(r.est)} (${inhNum(r.lo)}–${inhNum(r.hi)})`;
      y+=16;s+=inhCI(x,y,w,{lw:0,mn:r.mn,mx:r.mx,est:r.type==='range'?null:r.est,lo:r.lo,hi:r.hi,ref:r.type==='ci'?1:null,ticks:r.ticks,txt,col:r.col||'var(--rx)',g});y+=46}});
  return {svg:s,h:Math.ceil(y)}}
const inhNum=(v,d)=>(+v).toFixed(d==null?2:d);
inits.inhalers=()=>{
  const svg=$('#inhSvg'),rg=$('#inhT'),note=$('#inhNote');
  /* receptor occupancy and muscle tone over the timeline */
  function S(t){
    const saba=ramp(t,.05,.1)*(1-ramp(t,.16,.2));                    // salbutamol binds, then wears off
    const laba=t>=.4?ramp(t,.42,.47):0;                                // a LABA on beta-2 from step 3
    const lama=ramp(t,.25,.3);                                         // tiotropium on M3 from step 2 onwards
    const b2=Math.max(saba,laba), m3=lama;
    const sq=clamp(.78-.4*b2-.38*m3,.04,1);
    return {saba,laba,lama,b2,m3,sq}}
  function receptor(x,y,col){return `<path d="M${f1(x-11)} ${f1(y-15)}v9q0 9 11 9q11 0 11-9v-9" style="fill:none;stroke:${col};stroke-width:4;stroke-linecap:round"/>`}
  function mol(x,y,kind,op){if(op<=.01)return '';
    if(kind==='saba')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" style="fill:var(--bd);stroke:var(--ink);stroke-width:.8;opacity:${f1(op)}"/>`;
    if(kind==='laba')return `<rect x="${f1(x-6)}" y="${f1(y-6)}" width="12" height="12" rx="3" style="fill:var(--bd);stroke:var(--ink);stroke-width:.8;opacity:${f1(op)}"/><path d="M${f1(x)} ${f1(y-6)}q6 -10 0 -20" style="fill:none;stroke:var(--bd);stroke-width:2.4;opacity:${f1(op)}"/>`;
    if(kind==='lama')return `<path d="M${f1(x)} ${f1(y-8)}L${f1(x+8)} ${f1(y)}L${f1(x)} ${f1(y+8)}L${f1(x-8)} ${f1(y)}Z" style="fill:var(--rx);stroke:var(--ink);stroke-width:.8;opacity:${f1(op)}"/>`;
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--muted);opacity:${f1(op)}"/>`}
  function panel(p,t,x,y,w,N){let s='';const g=ramp(t,INH_STEPS[p].from+.02,INH_STEPS[p].from+.1),lw=N?92:100;
    s+=`<rect x="${f1(x-10)}" y="${f1(y-22)}" width="${f1(w+20)}" height="${N?190:172}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    if(p===0){s+=`<text x="${x}" y="${y}" class="t-lbl">${INH_TXT.p0t}</text>`;
      s+=inhCI(x,y+40,w,{lw:lw,mn:0,mx:.3,est:.14,lo:.04,hi:.25,ref:0,ticks:[0,.1,.2,.3],lbl:INH_TXT.p0r,txt:'+0.14 L',col:'var(--bd)',g});
      s+=`<text x="${x}" y="${y+100}" class="t-sm" style="fill:var(--ink)">${INH_TXT.p0d}</text>`;
      /* schematic: a relief that rises and fades between doses */
      const sx=x,sw=w,sy=y+140;s+=`<path d="${pathFn(u=>{const k=(u*4)%1;return 1-ramp(k,0,.08)*(1-ramp(k,.3,1))*.9},sx,sx+sw*ramp(t,.02,.19),sy,sy-26,80)}" style="fill:none;stroke:var(--bd);stroke-width:2"/>`;
      s+=`<line x1="${sx}" x2="${sx+sw}" y1="${sy}" y2="${sy}" class="axis"/>`}
    else if(p===1){s+=`<text x="${x}" y="${y}" class="t-lbl">${INH_TXT.p1t}</text>`;
      s+=inhCI(x,y+40,w,{lw:lw+10,mn:.5,mx:1.2,est:.78,lo:.70,hi:.87,ref:1,ticks:[.5,1,1.2],lbl:INH_TXT.p1r,txt:'0.78',col:'var(--rx)',g});
      s+=`<text x="${x}" y="${y+88}" class="t-sm" style="fill:var(--ink)">${INH_TXT.p1n}</text>`;
      const bx=x,bw=w-40,by=y+112;s+=`<line x1="${bx}" x2="${bx+bw}" y1="${by}" y2="${by}" class="axis"/>`;
      s+=`<text x="${bx}" y="${by+14}" class="t-xs">${INH_TXT.h0}</text><text x="${bx+bw}" y="${by+14}" class="t-xs t-end">${INH_TXT.h24}</text>`;
      s+=`<rect x="${bx}" y="${by-12}" width="${f1((bw+16)*g)}" height="9" rx="3" style="fill:var(--rx);opacity:.75"/>`;
      s+=`<path d="M${f1(bx+(bw+16)*g)} ${by-16}l8 8.5l-8 8.5" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:${f1(g)}"/>`;
      s+=`<text x="${bx}" y="${by-18}" class="t-xs" style="fill:var(--ink)">▼ ${INH_TXT.p1c}</text>`;
      s+=`<text x="${bx}" y="${by+30}" class="t-xs">${INH_TXT.p1b}</text>`}
    else if(p===2){s+=`<text x="${x}" y="${y}" class="t-lbl">${INH_TXT.p2t}</text>`;
      s+=`<text x="${x}" y="${y+22}" class="t-sm">${INH_TXT.p2a}</text>`;
      s+=inhBars(x,y+30,w,[{l:INH_TXT.tio,v:187,col:INH_COL.tio,t:'187'},{l:INH_TXT.sal,v:145,col:INH_COL.sal,t:'145'}],{mx:200,g,lw}).svg;
      s+=`<text x="${x}" y="${y+90}" class="t-sm">${INH_TXT.p2b}</text>`;
      s+=inhBars(x,y+98,w,[{l:INH_TXT.tio,v:.64,col:INH_COL.tio,t:'0.64'},{l:INH_TXT.sal,v:.72,col:INH_COL.sal,t:'0.72'}],{mx:.8,g,lw}).svg}
    else if(p===3){s+=`<text x="${x}" y="${y}" class="t-lbl">${INH_TXT.p3t}</text>`;
      s+=`<text x="${x}" y="${y+22}" class="t-sm">${INH_TXT.p3a}</text>`;
      s+=inhBars(x,y+30,w,[{l:INH_TXT.dual,v:.98,col:INH_COL.dual,t:'0.98'},{l:INH_TXT.lics,v:1.19,col:INH_COL.lics,t:'1.19'}],{mx:1.3,g,lw}).svg;
      s+=`<text x="${x}" y="${y+90}" class="t-sm">${INH_TXT.p3b}</text>`;
      s+=inhBars(x,y+98,w,[{l:INH_TXT.dual,v:3.2,col:INH_COL.dual,t:'3.2%'},{l:INH_TXT.lics,v:4.8,col:INH_COL.lics,t:'4.8%'}],{mx:5.5,g,lw}).svg}
    else{s+=`<text x="${x}" y="${y}" class="t-lbl">${INH_TXT.p4t}</text>`;
      const ax=x+8,ay=y+16,aw=w-110,ah=92,gg=ramp(t,.81,.9);
      s+=axes(ax,ay,aw,ah,{xt:[[0,INH_TXT.y0],[1,INH_TXT.y4]],yt:[],grid:false});
      s+=`<text x="${f1(ax+aw/2)}" y="${f1(ay+ah+15)}" class="t-xs t-mid">${INH_TXT.yr}</text>`;
      const top=u=>.08+.36*u, bot=u=>.36+.36*u;
      s+=`<path d="${pathFn(u=>top(u*gg),ax,ax+aw*Math.max(gg,.01),ay,ay+ah)}" style="fill:none;stroke:var(--rx);stroke-width:2.6"/>`;
      s+=`<path d="${pathFn(u=>bot(u*gg),ax,ax+aw*Math.max(gg,.01),ay,ay+ah)}" style="fill:none;stroke:var(--muted);stroke-width:2.6;stroke-dasharray:6 4"/>`;
      const ex=ax+aw;s+=`<text x="${f1(ex+6)}" y="${f1(ay+ah*top(1)+4)}" class="t-xs" style="fill:var(--rx);opacity:${f1(gg)}">${INH_TXT.p4tio}</text><text x="${f1(ex+6)}" y="${f1(ay+ah*bot(1)+4)}" class="t-xs" style="opacity:${f1(gg)}">${INH_TXT.p4pbo}</text>`;
      const mx=ax+aw*.12;s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${f1(ay+ah*top(.12)+3)}" y2="${f1(ay+ah*bot(.12)-3)}" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(ramp(gg,.3,.6))}" marker-end="url(#inhAr)" marker-start="url(#inhAr)"/>`;
      s+=`<text x="${f1(ax+8)}" y="${f1(ay+ah*.7)}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(gg,.3,.6))}">${INH_TXT.p4gap}</text><text x="${f1(ax+8)}" y="${f1(ay+ah*.7+12)}" class="t-xs" style="opacity:${f1(ramp(gg,.3,.6))}">${INH_TXT.p4gap2}</text>`;
      s+=`<text x="${x}" y="${f1(ay+ah+32)}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(gg,.7,1))}">${INH_TXT.p4same}</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 750'),st=S(t),p=phaseOf(INH_STEPS,t);
    const L=N?{tx:16,ty:26,cx:200,cy:236,rx:150,ry:50,dx:78,ay:418,ax:100,ar:46,lx:200,ly:396,px:24,py:566,pw:352,chipY:96}
             :{tx:20,ty:28,cx:178,cy:252,rx:140,ry:50,dx:72,ay:118,ax:440,ar:46,lx:528,ly:56,px:370,py:244,pw:330,chipY:96};
    let s=`<defs>${marker('inhAr','var(--ink)',6)}</defs>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:var(--rx)">${(N?INH_TXT.phN:INH_TXT.ph)[p]}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${(N?INH_TXT.subN:INH_TXT.sub)[p]}</text>`;
    /* the muscle cell: shorter and fatter as it contracts */
    const rx=L.rx*(1-.16*st.sq),ry=L.ry*(1+.22*st.sq),cx=L.cx,cy=L.cy;
    const memY=dx=>cy-ry*Math.sqrt(Math.max(0,1-(dx/rx)*(dx/rx)));
    const bx=cx-L.dx,mx=cx+L.dx,by=memY(-L.dx),my=memY(L.dx);
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cell);stroke:var(--membrane);stroke-width:3"/>`;
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy+ry*.28)}" rx="${f1(rx*.22)}" ry="${f1(ry*.26)}" style="fill:var(--nucleus);opacity:.7"/>`;
    /* contractile fibres: wavier when squeezed */
    for(let i=0;i<3;i++){const fy=cy+ry*(.3+i*.2),half=rx*.82*Math.sqrt(Math.max(.1,1-Math.pow((fy-cy)/ry,2)));
      s+=`<path d="${pathFn(u=>.5+Math.sin(u*Math.PI*10+i)*st.sq*.5,cx-half,cx+half,fy-4,fy+4,60)}" style="fill:none;stroke:var(--muscle);stroke-width:1.6;opacity:.6"/>`}
    /* signals inside the cell */
    const R=rng(5);for(let i=0;i<10;i++){const a=R(),b=R();
      const rpx=bx+(a-.5)*rx*.6,rpy=by+12+b*ry*.5;s+=`<circle cx="${f1(rpx)}" cy="${f1(rpy+Math.sin(t*40+i)*2)}" r="2.6" style="fill:var(--bd);opacity:${f1(st.b2*.9)}"/>`;
      const qpx=mx+(a-.5)*rx*.6,qpy=my+12+b*ry*.5;s+=`<circle cx="${f1(qpx)}" cy="${f1(qpy+Math.sin(t*40+i)*2)}" r="2.6" style="fill:var(--inflamed);opacity:${f1((1-st.m3)*.85)}"/>`}
    s+=`<text x="${f1(bx)}" y="${f1(cy+ry+17)}" class="t-xs t-mid" style="fill:var(--bd);opacity:${f1(st.b2)}">${INH_TXT.relax}</text>`;
    s+=`<text x="${f1(mx)}" y="${f1(cy+ry+17)}" class="t-xs t-mid" style="fill:var(--inflamed);opacity:${f1(1-st.m3)}">${INH_TXT.squeeze}</text>`;
    /* receptors */
    s+=receptor(bx,by,'var(--bd)')+receptor(mx,my,'var(--rx)');
    s+=`<text x="${f1(bx-16)}" y="${f1(by-4)}" class="t-xs t-end" style="fill:var(--ink)">${INH_TXT.b2}</text><text x="${f1(mx+16)}" y="${f1(my-1)}" class="t-xs" style="fill:var(--ink)">${INH_TXT.m3}</text>`;
    s+=`<text x="${f1(cx)}" y="${f1(cy+ry+36)}" class="t-sm t-mid">${INH_TXT.cell}</text>`;
    /* drug molecules falling into the beta-2 pocket */
    const top=L.chipY+22;
    if(st.saba>.01||(t<.2&&t>.02)){const k=ramp(t,.02,.1);s+=mol(bx,lerp(top,by-8,ease(k)),'saba',t<.2?(1-ramp(t,.17,.2)):0)}
    if(t>=.4){s+=mol(bx,lerp(top,by-8,ease(ramp(t,.4,.47))),'laba',1)}
    /* acetylcholine bouncing near M3; bound while M3 is free */
    for(let i=0;i<3;i++){const ph=t*30+i*2.1,ax2=mx+22+i*12,ay2=my-26-Math.abs(Math.sin(ph))*18;s+=mol(ax2,ay2,'ach',.9)}
    s+=mol(mx,my-8,'ach',1-st.m3);
    if(t>=.2){s+=mol(mx,lerp(top,my-8,ease(ramp(t,.21,.3))),'lama',1)}
    s+=`<text x="${f1(mx+30)}" y="${f1(my-52)}" class="t-xs">${INH_TXT.ach}</text>`;
    /* drug-name chips above each receptor */
    const bl=t<.2?INH_TXT.saba:t>=.4?(p>=3?INH_TXT.labaG:INH_TXT.laba):'';
    if(bl&&(t>=.4||st.saba>.01||t<.17))s+=chip(bx,L.chipY,bl,{anchor:'middle',col:'var(--bd)',size:11.5});
    if(t>=.2)s+=chip(mx,L.chipY,p>=3?INH_TXT.lamaG:INH_TXT.lama,{anchor:'middle',col:'var(--rx)',size:11.5});
    /* the airway: its lumen widens as the muscle relaxes */
    const A=airway(L.ax,L.ay,L.ar,{squeeze:st.sq,wall:.4,inflam:.2,tether:.8,ph:t*12,seed:8});
    s+=A.svg+`<text x="${L.ax}" y="${f1(L.ay+L.ar*1.45+16)}" class="t-xs t-mid">${INH_TXT.airway}</text>`;
    /* legend */
    INH_TXT.lg.forEach((l,i)=>{const yy=L.ly+i*20;s+=mol(L.lx+7,yy-4,['saba','lama','ach'][i],1)+`<text x="${L.lx+20}" y="${yy}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+=panel(p,t,L.px,L.py,L.pw,N);
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(INH_STEPS[p]);
  }
  const stop=playWire(rg,$('#inhPlay'),draw,22000,'%t:player.replay%','inhalers');
  const setSt=stepWire($('#inhSteps'),INH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- trial explorer ---- */
  const tsvg=$('#inhTrSvg'),tout=$('#inhTrOut'),tbtn=$('#inhTrBtns');let cur='poet',stopT=null;
  tbtn.innerHTML=INH_TRIALS.map(T=>`<button class="btn" data-tr="${T.id}" aria-pressed="${T.id===cur}">${T.n} <span class="t-y">${T.y}</span></button>`).join('');
  function drawTr(g){const T=INH_TRIALS.find(x=>x.id===cur),N=NARROW(),R=inhRows(T.rows,N,g,INH_COL);
    tsvg.setAttribute('viewBox',`0 0 ${N?400:720} ${R.h}`);tsvg.innerHTML=R.svg;tsvg.setAttribute('aria-label',T.n+': '+T.rows.map(r=>r.h).join('; '))}
  function showTr(id){cur=id;$$('[data-tr]',tbtn).forEach(b=>b.setAttribute('aria-pressed',b.dataset.tr===id));
    tout.innerHTML=INH_TRIALS.find(x=>x.id===id).out;stopT&&stopT();stopT=animate(700,drawTr)}
  tbtn.addEventListener('click',e=>{const b=e.target.closest('[data-tr]');if(b)showTr(b.dataset.tr)});
  showTr(cur);
  const prev=redraws.inhalers;redraws.inhalers=()=>{prev&&prev();drawTr(1)};
};
