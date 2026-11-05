/* =============== 1.4 Risk factors & prevention =============== */
/* INTERHEART odds ratios and population attributable risks [[Yusuf2004INTERHEART]] */
const RK_F=[
 {n:'ApoB/ApoA1 ratio, top vs lowest fifth',s:'ApoB/ApoA1 ratio',or:3.25,par:49.2},
 {n:'Current smoking, vs never',s:'Smoking',or:2.87,par:35.7},
 {n:'Psychosocial stress',s:'Stress',or:2.67,par:32.5},
 {n:'Diabetes',s:'Diabetes',or:2.37,par:9.9},
 {n:'History of high blood pressure',s:'High blood pressure',or:1.91,par:17.9},
 {n:'Abdominal obesity (middle vs lowest third)',s:'Abdominal obesity',or:1.62,par:20.1},
 {n:'Daily fruit and vegetables',s:'Fruit & veg daily',or:.70,par:13.7,prot:1},
 {n:'Regular physical activity',s:'Regular activity',or:.86,par:12.2,prot:1},
 {n:'Regular alcohol use',s:'Regular alcohol',or:.91,par:6.7,prot:1}];
const RK_APP=[.03,.12,.21,.29,.38,.46,.55,.61,.67];
const RK_STEPS=[
 {from:0,at:.08,k:'Factor 1 of 9',t:'Blood lipids: ApoB/ApoA1',
  txt:'INTERHEART compared 15,152 people with a first heart attack against 14,820 controls in 52 countries. The strongest factor was the ratio of apolipoprotein B to apolipoprotein A1: top vs lowest fifth, OR 3.25, with a PAR of 49.2% for the top four fifths. [[Yusuf2004INTERHEART]] ApoB is the protein on LDL and the other particles whose retention in the artery wall starts atherosclerosis. [[Tabas2007]]',
  pt:'An unfavourable balance of blood fats was the biggest single factor: about half of first heart attacks in the study were linked to it.',
  hook:'INTERHEART: ApoB/ApoA1 had the largest PAR, 49.2%. [[Yusuf2004INTERHEART]]'},
 {from:.12,at:.17,k:'Factor 2 of 9',t:'Smoking',
  txt:'Current smoking vs never: OR 2.87, with a PAR of 35.7% for current plus former smoking. [[Yusuf2004INTERHEART]] In the tobacco analysis, risk rose 5.6% for each additional cigarette smoked, and second-hand smoke showed a graded risk: OR 1.24 at 1–7 hours a week and 1.62 at more than 21 hours. [[Teo2006Tobacco]]',
  pt:'Smoking nearly triples the odds of a heart attack. Quitting lowers the risk within a few years, at any age. [[Teo2006Tobacco]]',
  hook:'After quitting, the OR fell from 2.95 to 1.87 within 3 years; a small excess (1.22) remained after 20 years or more. [[Teo2006Tobacco]]'},
 {from:.2,at:.34,k:'Factors 3 and 4',t:'Stress and diabetes',
  txt:'Psychosocial factors had OR 2.67 and PAR 32.5%; diabetes had OR 2.37 and PAR 9.9%. [[Yusuf2004INTERHEART]] The stress measures included permanent stress at work (OR 2.14) or at home (2.12), severe financial stress (1.33), a stressful life event in the past year (1.48) and depression (1.55). [[Rosengren2004Psychosocial]] Across 102 cohorts, diabetes was associated with an adjusted HR of 2.00 for coronary heart disease, higher in women and at ages 40–59. [[ERFC2010]]',
  pt:'Long-term stress at work or at home, money worries and depression all count. They are common, not a personal failing, and many of these factors can be changed with support. [[Yusuf2004INTERHEART]]',
  hook:'Diabetes was more strongly associated with MI in women (OR 4.26) than in men (2.67). [[Anand2008Women]]'},
 {from:.37,at:.51,k:'Factors 5 and 6',t:'Blood pressure and waist',
  txt:'A history of high blood pressure had OR 1.91 and PAR 17.9%; abdominal obesity had OR 1.62 (middle vs lowest third) and PAR 20.1%. [[Yusuf2004INTERHEART]] In one million adults, each 20 mm Hg higher usual systolic pressure at ages 40–69 went with a twofold higher death rate from ischaemic heart disease, with no threshold down to at least 115/75 mm Hg. [[Lewington2002BP]] Waist-to-hip ratio had a PAR of 24.3% against 7.7% for body-mass index, and after adjustment BMI was no longer associated with MI. [[Yusuf2005Obesity]]',
  pt:'The higher the usual blood pressure, the higher the risk, with no safe cut-off seen down to 115/75. Fat around the waist mattered more than overall weight.',
  hook:'Waist-to-hip ratio predicts MI better than BMI: PAR 24.3% vs 7.7%. [[Yusuf2005Obesity]]'},
 {from:.54,at:.72,k:'Factors 7 to 9',t:'Diet, activity, alcohol',
  txt:'Three factors went with lower odds: daily fruit and vegetables (OR 0.70; PAR 13.7% for not eating them daily), regular physical activity (OR 0.86; PAR 12.2%) and regular alcohol use (OR 0.91; PAR 6.7%). [[Yusuf2004INTERHEART]] Activity and moderate alcohol were associated with lower odds more strongly in women. [[Anand2008Women]] These are associations in a case-control study, not a recommendation to drink. The 2019 ACC/AHA guideline advises at least 150 minutes a week of moderate-intensity (or 75 minutes of vigorous) physical activity, quoted as published. [[Arnett2019ACC]]',
  pt:'Eating fruit and vegetables every day and being active regularly were linked to fewer heart attacks.',
  hook:'INTERHEART protective factors: daily fruit and vegetables OR 0.70, regular activity OR 0.86. [[Yusuf2004INTERHEART]]'},
 {from:.78,at:.95,k:'All nine',t:'Together: about 9 in 10',
  txt:'Together the nine factors accounted for 90% of the PAR in men and 94% in women, with similar associations across regions, ages and both sexes. [[Yusuf2004INTERHEART]] A later INTERHEART analysis by sex put it at 96% in women and 93% in men. Women had their first MI at a median 65 years against 56 in men; higher risk-factor levels at younger ages in men largely explained the 9-year gap. [[Anand2008Women]] Adding the nine PARs gives far more than 100%, because the factors overlap in the same people. Toggle factors to see the combined share change.',
  pt:'Nine things that can be measured, and for many people changed, were linked to about 9 in 10 first heart attacks worldwide.',
  hook:'INTERHEART: nine modifiable factors = 90% of PAR in men, 94% in women. [[Yusuf2004INTERHEART]]'}];

inits.risk=()=>{
  const svg=$('#rkSvg'),rg=$('#rkT'),note=$('#rkNote'),read=$('#rkRead'),tog=$('#rkTog');
  const on=RK_F.map(()=>true);let setSt=()=>{};
  tog.innerHTML=RK_F.map((f,i)=>`<button class="btn" data-rk="${i}" aria-pressed="true">${f.s}</button>`).join('');
  const LX=v=>(Math.log(v)-Math.log(.5))/(Math.log(4)-Math.log(.5));
  function draw(t){
    const N=vb(svg,'720 380','400 600');let s='';
    const g=RK_F.map((f,i)=>ease(ramp(t,RK_APP[i],RK_APP[i]+.05)));
    const X0=N?20:206,X1=N?300:468,XL=v=>lerp(X0,X1,LX(v)),y0=N?62:54,rh=N?44:30;
    s+=`<text x="${N?20:20}" y="${N?24:24}" class="t-lbl">INTERHEART: odds ratio for a first MI</text><text x="${N?20:20}" y="${N?40:40}" class="t-sm">log scale · 1 = no difference</text>`;
    if(!N)s+=`<text x="${X1+44}" y="40" class="t-sm t-mid">PAR</text>`;
    /* axis */
    const ay=y0+RK_F.length*rh+4;
    [.5,.7,1,1.5,2,3,4].forEach(v=>{const x=XL(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y0-6}" y2="${ay}" class="${v===1?'axis':'grid'}"/><text x="${f1(x)}" y="${ay+14}" class="t-xs t-mid">${v}</text>`});
    RK_F.forEach((f,i)=>{if(g[i]<=0)return;const y=y0+i*rh,op=on[i]?1:.35,col=f.prot?'var(--good)':'var(--brand)',x1=XL(1),xv=XL(lerp(1,f.or,g[i]));
      const by=N?y+18:y+6,bh=N?12:14;
      s+=`<g style="opacity:${f1(op*Math.min(1,g[i]*2))}">`;
      s+=N?`<text x="20" y="${y+12}" class="t-sm" style="fill:var(--ink)">${f.s}</text>`:`<text x="${X0-8}" y="${y+17}" class="t-sm t-end" style="fill:var(--ink)">${f.s}</text>`;
      s+=`<rect x="${f1(Math.min(x1,xv))}" y="${by}" width="${f1(Math.abs(xv-x1))}" height="${bh}" rx="3" style="fill:${col};opacity:.85"/>`;
      const lab=`OR ${f.or.toFixed(2)}`;s+=f.prot?`<text x="${f1(xv-4)}" y="${by+bh-2}" class="t-xs t-end" style="fill:var(--ink)">${g[i]>.95?lab:''}</text>`:`<text x="${f1(xv+4)}" y="${by+bh-2}" class="t-xs" style="fill:var(--ink)">${g[i]>.95?lab:''}</text>`;
      s+=`<text x="${N?380:X1+44}" y="${by+bh-2}" class="t-xs ${N?'t-end':'t-mid'}" style="fill:var(--ink)">${N?'PAR ':''}${f.par}%</text>`;
      if(!on[i])s+=`<line x1="${N?20:X0-120}" x2="${N?380:X1+60}" y1="${by+bh/2}" y2="${by+bh/2}" style="stroke:var(--muted);stroke-width:1"/>`;
      s+='</g>'});
    /* combined PAR (schematic: assumes independence) */
    let keep=1,sum=0,k=0;RK_F.forEach((f,i)=>{if(!on[i])return;keep*=1-f.par/100*g[i];sum+=f.par*g[i];if(g[i]>.5)k++});
    const comb=(1-keep)*100,fin=ramp(t,.76,.86);
    if(N){const mx=20,mw=360,my=530;
      s+=`<text x="${mx}" y="${my-12}" class="t-lbl">Combined PAR: ${Math.round(comb)}%</text>`;
      s+=`<rect x="${mx}" y="${my}" width="${mw}" height="18" rx="5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my}" width="${f1(mw*comb/100)}" height="18" rx="5" style="fill:var(--brand)"/>`;
      [[90,'men 90'],[94,'women 94']].forEach(([v,l],j)=>{const x=mx+mw*v/100;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${my-4}" y2="${my+22}" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(.3+.7*fin)}"/><text x="${f1(x+(j?6:-3))}" y="${j?my-6:my+34}" class="t-xs t-end" style="opacity:${f1(.3+.7*fin)}">${l}</text>`});
      s+=`<text x="${mx}" y="${my+54}" class="t-xs" style="opacity:${f1(fin)}">Simply adding them: ${Math.round(sum)}%, impossible, because they overlap</text>`}
    else{const mx=590,mw=46,my=54,mh=RK_F.length*rh;
      s+=`<text x="${mx+mw/2}" y="24" class="t-lbl t-mid">Combined PAR</text><text x="${mx+mw/2}" y="40" class="t-sm t-mid">schematic</text>`;
      s+=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="6" style="fill:var(--panel-2)"/><rect x="${mx}" y="${f1(my+mh*(1-comb/100))}" width="${mw}" height="${f1(mh*comb/100)}" rx="6" style="fill:var(--brand)"/>`;
      s+=comb>8?`<text x="${mx+mw/2}" y="${my+mh-12}" class="t-big t-mid" style="font-size:15px;fill:var(--on-brand)">${Math.round(comb)}%</text>`:'';
      [[90,'men 90%'],[94,'women 94%']].forEach(([v,l],j)=>{const y=my+mh*(1-v/100);s+=`<line x1="${mx-4}" x2="${mx+mw+4}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(.3+.7*fin)}"/><text x="${mx+mw+8}" y="${f1(y+(j?-2:9))}" class="t-xs" style="opacity:${f1(.3+.7*fin)}">${l}</text>`});
      s+=`<text x="${mx+mw/2}" y="${my+mh+16}" class="t-xs t-mid" style="opacity:${f1(fin)}">simple sum: ${Math.round(sum)}%</text>`}
    svg.innerHTML=s;
    const p=phaseOf(RK_STEPS,t);note.innerHTML=noteHTML(RK_STEPS[p]);setSt(p);
    read.innerHTML=`<span>Factors shown <b>${k} of 9</b></span><span>Combined PAR (schematic) <b>${Math.round(comb)}%</b></span><span>Simple sum <b>${Math.round(sum)}%</b></span>`;
  }
  const stop=playWire(rg,$('#rkPlay'),draw,22000,'Replay','risk');
  setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);
  tog.addEventListener('click',e=>{const b=e.target.closest('[data-rk]');if(!b)return;const i=+b.dataset.rk;on[i]=!on[i];b.setAttribute('aria-pressed',on[i]);draw(+rg.value)});
  draw(+rg.value);

  /* ---- teaching explorer: one published estimate per factor ---- */
  const ex=$('#rkEx'),er=$('#rkExRead'),sex=$('#rkSex');
  const ROWS=[
   {id:'rkSmk',n:'Tobacco',m:'OR, non-fatal MI'},
   {id:'rkBp',n:'Systolic blood pressure',m:'× IHD death rate'},
   {id:'rkLdl',n:'LDL cholesterol',m:'RR / CHD risk'},
   {id:'rkDm',n:'Diabetes',m:'HR, coronary disease'},
   {id:'rkCkd',n:'Kidney function',m:'HR, CV events'},
   {id:'rkWhr',n:'Waist-to-hip ratio',m:'OR, MI'},
   {id:'rkFh',n:'Parent with early CVD',m:'OR, 8-year events'},
   {id:'rkLpa',n:'Lp(a) gene variants',m:'OR, coronary disease'},
   {id:'rkInf',n:'Inflammatory condition',m:'RR, MI'},
   {id:'rkPe',n:'Pre-eclampsia',m:'RR, later IHD',w:1},
   {id:'rkMeno',n:'Early menopause',m:'HR, CVD',w:1}];
  const LG=v=>(Math.log(v)-Math.log(.3))/(Math.log(16)-Math.log(.3));
  function val(r){const el=$('#'+r.id);if(r.id==='rkFh')return el.value==='1'?(sex.value==='m'?2.0:1.7):1;return +el.value}
  function drawEx(){
    const women=sex.value==='w';$$('#rkCalc [data-women]').forEach(l=>l.hidden=!women);
    const rows=ROWS.filter(r=>!r.w||women),N=NARROW(),rh=N?42:28,top=N?50:44,H=top+rows.length*rh+44;
    vb(ex,'720 '+H,'400 '+H);
    const X0=N?20:250,X1=N?380:575,X=v=>lerp(X0,X1,LG(v));let s='',raised=0,lower=0,mx=null;
    s+=`<text x="${N?20:20}" y="${N?20:22}" class="t-lbl">Published relative estimate, by factor</text>`;
    const ay=top+rows.length*rh;
    [.5,1,2,4,8,16].forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-8}" y2="${ay}" class="${v===1?'axis':'grid'}"/><text x="${f1(x)}" y="${ay+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${X1}" y="${ay+30}" class="t-xs t-end">log scale · 1 = the study's reference group</text>`;
    rows.forEach((r,i)=>{const v=val(r),el=$('#'+r.id),lvl=el.options[el.selectedIndex].text.replace(/&/g,'&amp;').replace(/</g,'&lt;'),y=top+i*rh,ref=Math.abs(v-1)<1e-9;
      if(!ref){v>1?raised++:lower++;if(v>1&&(!mx||v>mx.v))mx={v,n:r.n}}
      const col=ref?'var(--muted)':v>1?'var(--brand)':'var(--good)',yy=N?y+26:y+12;
      if(N){s+=`<text x="20" y="${y+12}" class="t-sm" style="fill:var(--ink)">${r.n}: ${lvl.length>26?lvl.slice(0,25)+'…':lvl}</text>`}
      else{s+=`<text x="${X0-12}" y="${y+9}" class="t-sm t-end" style="fill:var(--ink)">${r.n}</text><text x="${X0-12}" y="${y+21}" class="t-xs t-end">${lvl.length>36?lvl.slice(0,35)+'…':lvl}</text>`}
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(v))}" y1="${yy}" y2="${yy}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/><circle cx="${f1(X(v))}" cy="${yy}" r="6" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
      const lab=ref?'reference':(r.id==='rkLdl'&&v>=13?'up to ':'')+v+'×',rt=v<1||(N&&v>=8);
      s+=`<text x="${f1(X(v)+(rt?-10:10))}" y="${yy+4}" class="t-xs ${rt?'t-end':''}" style="fill:var(--ink)">${lab}</text>`;
      if(!N)s+=`<text x="${X1+12}" y="${yy+4}" class="t-xs">${r.m}</text>`});
    ex.innerHTML=s;
    er.innerHTML=`<span>Raised above the reference <b>${raised}</b></span><span>Lowered <b>${lower}</b></span>`+(mx?`<span>Largest single estimate <b>${mx.n}, ${mx.v}×</b></span>`:'')+`<span>Combined personal risk <b>not calculable here</b></span>`;
  }
  $$('#rkCalc select').forEach(el=>el.addEventListener('change',drawEx));
  drawEx();
  const prevR=redraws.risk;redraws.risk=()=>{prevR&&prevR();drawEx()};
};
