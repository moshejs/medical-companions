/* =============== 6.1 A history of alcohol use disorder =============== */
/* The timeline is piecewise linear: 1780-1930 takes the first 36% of its length, 1930-2025 the rest. */
const HI_Y0=1780,HI_YB=1930,HI_Y1=2025,HI_F=.36;
const hiU=y=>y<=HI_YB?HI_F*(y-HI_Y0)/(HI_YB-HI_Y0):HI_F+(1-HI_F)*(y-HI_YB)/(HI_Y1-HI_YB);
const hiYr=u=>u<=HI_F?HI_Y0+(HI_YB-HI_Y0)*u/HI_F:HI_YB+(HI_Y1-HI_YB)*(u-HI_F)/(1-HI_F);
/* tracks: 0 ideas & diagnosis, 1 mutual help & policy, 2 medicines */
const HI_TR=[['Ideas & diagnosis','var(--brand)'],['Help & policy','var(--dx)'],['Medicines','var(--rx)']];
const HI_EV=[
 {y:1784,tr:0,l:'Rush: an aversion remedy; loss of control'},{y:1849,tr:0,l:'Huss: "alcoholismus chronicus"'},
 {y:1933,tr:1,l:'US Prohibition repealed'},{y:1935,tr:1,l:'Alcoholics Anonymous founded, Akron'},
 {y:1948,tr:2,l:'Hald & Jacobsen: the disulfiram reaction'},{y:1951,tr:2,l:'Disulfiram: first FDA approval for AUD'},
 {y:1952,tr:0,l:'DSM-I published'},{y:1960,tr:0,l:'Jellinek: the disease concept'},{y:1976,tr:0,l:'Edwards & Gross: dependence syndrome'},
 {y:1980,tr:0,l:'DSM-III: abuse and dependence'},{y:1987,tr:0,l:'DSM-III-R'},{y:1989,tr:2,l:'Acamprosate approved in Europe'},
 {y:1994,tr:0,l:'DSM-IV: abuse and dependence kept'},{y:1994.4,tr:2,l:'Naltrexone FDA-approved for alcohol'},
 {y:2004,tr:2,l:'Acamprosate approved in the US'},{y:2006,tr:2,l:'Extended-release naltrexone'},
 {y:2013,tr:0,l:'DSM-5: one alcohol use disorder'},{y:2013.4,tr:2,l:'Nalmefene approved in Europe'},{y:2018,tr:2,l:'Baclofen approved in France'},
 {y:2019,tr:0,l:'ICD-11 published'},{y:2022,tr:0,l:'DSM-5-TR'}];
/* "what we called it": the banner name from a given year */
const HI_NAME=[{y:1780,n:'a disease of habitual heavy drinking',s:'Rush: loss of control over alcohol'},{y:1849,n:'alcoholismus chronicus',s:'Huss: the medical consequences of chronic heavy drinking'},
 {y:1952,n:'“alcoholism”',s:'the older, lay name: a disease of loss of control (Jellinek)'},{y:1976,n:'alcohol dependence syndrome',s:'Edwards & Gross: a syndrome not defined by consequences'},
 {y:1980,n:'alcohol abuse | alcohol dependence',s:'DSM-III to DSM-IV: two separate diagnoses'},{y:2013,n:'alcohol use disorder',s:'DSM-5: one disorder, mild to severe'},
 {y:2019,n:'alcohol use disorder',s:'ICD-11 instead: alcohol dependence and harmful pattern of use'}];
const HI_ERA=[{a:1780,b:1840,n:'Rush'},{a:1840,b:1880,n:'Huss'},{a:1880,b:1934.5,n:'Temperance'},{a:1934.5,b:1952,n:'Mutual help'},{a:1952,b:1980,n:'Disease concept'},{a:1980,b:2013,n:'Abuse / dependence'},{a:2013,b:2025,n:'AUD'}];
function hiWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
/* small emblems, about 80 x 80 centred on (x,y): no drinks, no bottles */
function hiEmblem(k,x,y,s=1){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  const ln='stroke:var(--ink);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round';
  if(k==='quill')g+=`<path d="M-22 30L18 -30C26 -36 32 -30 26 -22L-14 34Z" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><path d="M-22 30L24 -26" style="${ln}"/><path d="M-30 36H8" style="${ln}"/><rect x="10" y="22" width="18" height="14" rx="3" style="fill:var(--ink)"/>`;
  else if(k==='book')g+=`<path d="M0 -20C-12 -28 -28 -28 -36 -24V28C-28 24 -12 24 0 32C12 24 28 24 36 28V-24C28 -28 12 -28 0 -20Z" style="fill:var(--panel-2);stroke:var(--brand);stroke-width:2"/><path d="M0 -20V32" style="${ln}"/>`+[-12,-4,4,12].map(v=>`<path d="M-28 ${v}H-8M8 ${v}H28" style="stroke:var(--muted);stroke-width:1.4"/>`).join('');
  else if(k==='gavel')g+=`<rect x="-30" y="-26" width="34" height="18" rx="4" transform="rotate(-30)" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:2"/><path d="M-2 -6L26 26" style="stroke:var(--dx);stroke-width:5;stroke-linecap:round"/><rect x="-34" y="28" width="44" height="8" rx="3" style="fill:var(--dx)"/>`;
  else if(k==='circle'){for(let i=0;i<6;i++){const a=i/6*2*Math.PI-Math.PI/2;g+=person(26*Math.cos(a),26*Math.sin(a)-10,20,'var(--dx)')}g+=`<circle cx="0" cy="0" r="9" style="fill:none;stroke:var(--dx);stroke-width:1.5;stroke-dasharray:2 3"/>`}
  else if(k==='pill')g+=pill(-8,-4,46,{ang:-30})+pill(18,20,22,{round:true});
  else if(k==='two')g+=`<rect x="-38" y="-24" width="34" height="48" rx="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:2"/><rect x="4" y="-24" width="34" height="48" rx="6" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="-21" y="4" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">abuse</text><text x="21" y="4" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">dep.</text>`;
  else if(k==='one')g+=`<rect x="-38" y="-24" width="76" height="48" rx="8" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="0" y="0" class="t-lbl t-mid" style="fill:var(--brand)">AUD</text><text x="0" y="14" class="t-xs t-mid">2+ of 11</text>`;
  return g+'</g>'}

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote');let setSt=()=>{};
  const T=hiU;
  const STEPS=[
   {from:0,at:T(1784),y0:1780,y1:1840,em:['quill'],k:'1784 · Philadelphia',t:'Benjamin Rush: a disease, not a vice',
    txt:`In 1784 the Pennsylvania physician Benjamin Rush proposed an aversion remedy for problem drinking, and near the end of the 18th century he described loss of control over alcohol [[Witkiewitz2019]]. He described habitual heavy drinking as a disease caused by alcohol itself [[Tabakoff2013]], and ran a public health education campaign on the hazards of distilled spirits, listing more than a dozen alcohol-related health problems. [[Katcher1993]]`,
    pt:`More than 200 years ago, a doctor argued that heavy drinking that a person cannot control is an illness, not a lack of willpower.`,
    hook:`Rush (1784): loss of control over alcohol, an early disease concept. [[Witkiewitz2019,Tabakoff2013]]`},
   {from:T(1840),at:T(1852),y0:1840,y1:1880,em:['book'],k:'1849 · Sweden',t:'Magnus Huss names the condition',
    txt:`The Swedish physician Magnus Huss introduced the term from which the older, lay name "alcoholism" comes (cited as Huss 1849) [[Tabakoff2013]]. He described "alcoholismus chronicus", emphasising the medical consequences of chronic heavy drinking: damage to the body, rather than the behaviour itself. [[Martin2014]]`,
    pt:`Huss gave the condition a medical name and focused on the harm heavy drinking does to the body.`,
    hook:`Huss 1849: "alcoholismus chronicus", defined by medical consequences. [[Tabakoff2013,Martin2014]]`},
   {from:T(1880),at:T(1931),y0:1880,y1:1934.5,em:['gavel'],k:'1800s – 1933 · United States',t:'Temperance and Prohibition',
    txt:`From the 1800s to the early 1900s the temperance movement laid groundwork for later mutual-help organisations [[Witkiewitz2019]]. US National Prohibition (the Eighteenth Amendment and the Volstead Act, which defined "intoxicating" as 0.5% alcohol by volume or more) came out of a century-long temperance campaign. Repeal became possible in 1933, mainly because the Great Depression changed the economic context. <span class="ev hyp">Disputed</span> Blocker argues Prohibition did lower consumption: after repeal, yearly intake was about 1.2 US gallons per person, less than half the pre-Prohibition level. [[Blocker2006]]`,
    pt:`For a time the US tried banning alcohol. Historians still argue about how well it worked.`,
    hook:`Repeal of US Prohibition: 1933. Volstead Act threshold: 0.5% ABV. [[Blocker2006]]`},
   {from:T(1934.5),at:T(1950),y0:1934.5,y1:1952,em:['circle','pill'],k:'1935 – 1951',t:'Mutual help and the first medicine',
    txt:`Alcoholics Anonymous dates its founding to 10 June 1935, the sobriety date of co-founder Dr Bob Smith, after he met Bill Wilson in Akron, Ohio; by 2010 AA reported some 2 million members in more than 160 countries [[Gross2010AA]]. In 1948 Hald and Jacobsen reported in the Lancet a drug that sensitises the body to alcohol: disulfiram [[Hald1948]]. In 1951 disulfiram (Antabuse) became the first medicine approved by the FDA for AUD; Drugs@FDA dates it 28 August 1951. [[Witkiewitz2019,FDA-DrugsFDA-AUD]]`,
    pt:`People with drinking problems began helping each other in groups, and the first medicine for AUD arrived.`,
    hook:`Disulfiram: Hald & Jacobsen 1948, FDA approval 1951. AA: 1935, Akron. [[Hald1948,Witkiewitz2019,Gross2010AA]]`},
   {from:T(1952),at:T(1972),y0:1952,y1:1980,em:['book'],k:'1952 – 1976',t:'A disease concept, then a syndrome',
    txt:`The first DSM was published in 1952 [[Tabakoff2013]]. In 1960 E. M. Jellinek's "The Disease Concept of Alcoholism" codified problem drinking as a disease of loss of control over drinking [[Tabakoff2013,Kelly2019Jellinek]]. In 1976 Griffith Edwards and Milton Gross described the "alcohol dependence syndrome" in the BMJ, a syndrome not defined by its consequences [[Edwards1976,Martin2014]], and were the first to use the word "salience" for this purpose [[Tabakoff2013]]. Their syndrome shaped international classification and underpins brief interventions. [[Li2007ADS,Stockwell2015]]`,
    pt:`Doctors began to describe a pattern: drinking becomes a priority, and the body adapts. That pattern is what "dependence" means.`,
    hook:`Edwards & Gross 1976: alcohol dependence syndrome. Elements were taken into DSM-IV and ICD-10. [[Edwards1976,Li2007ADS]]`},
   {from:T(1980),at:T(2000),y0:1980,y1:2013,em:['two','pill'],k:'1980 – 2012',t:'Two diagnoses: abuse and dependence',
    txt:`DSM-III (1980) described two separate disorders, substance dependence and substance abuse; DSM-III-R (1987) kept an abuse diagnosis defined partly by consequences [[Martin2014]]. DSM-IV (1994) kept them separate, and its hierarchy created "diagnostic orphans": people with two dependence criteria and no abuse criteria received no diagnosis [[Hasin2013]]. Medicines followed: acamprosate in Europe in 1989, naltrexone FDA-approved for alcohol dependence in 1994, acamprosate in the US in 2004 and extended-release naltrexone in 2006. [[Witkiewitz2019,FDA-DrugsFDA-AUD]]`,
    pt:`For about 30 years there were two labels, a milder "abuse" and a more serious "dependence". Some people with real problems fitted neither.`,
    hook:`FDA approvals for AUD: disulfiram 1951, naltrexone 1994, acamprosate 2004, extended-release naltrexone 2006. [[Witkiewitz2019,FDA-DrugsFDA-AUD]]`},
   {from:T(2013),at:T(2022.5),y0:2013,y1:2025,em:['one'],k:'2013 – today',t:'One disorder, from mild to severe',
    txt:`DSM-5 (2013) combined abuse and dependence into a single "alcohol use disorder", on consistent findings from more than 200,000 study participants; it dropped legal problems as a criterion and added craving. AUD needs 2 or more of 11 criteria: mild 2–3, moderate 4–5, severe 6 or more [[APA2013,Hasin2013]]. ICD-11 was formally published in May 2019, keeping alcohol dependence separate from a harmful pattern of use [[Saunders2019ICD11]], and DSM-5-TR followed in 2022 [[APA2022]]. Nalmefene was approved in Europe in 2013 and baclofen in France in 2018; in the US, three medicines are FDA-approved for AUD. [[Witkiewitz2019]]`,
    pt:`Today AUD is one condition with degrees, from mild to severe, and it is treatable.`,
    hook:`DSM-5: merged abuse + dependence, legal problems out, craving in, threshold ≥2 of 11. [[Hasin2013]]`}];
  const EMB=STEPS.map(s=>s.em);
  function nameAt(y){let i=0;HI_NAME.forEach((n,k)=>{if(y>=n.y)i=k});return i}
  function draw(t){const N=vb(svg,'720 380','400 770'),yr=hiYr(t),p=phaseOf(STEPS,t),S=STEPS[p];let s='';
    /* ---- banner: what we called it ---- */
    const ni=nameAt(yr),nm=HI_NAME[ni],since=yr-nm.y,fade=clamp(since/4),prev=ni>0?HI_NAME[ni-1]:null;
    const bw=N?368:672,bx=N?16:24;
    s+=`<rect x="${bx}" y="10" width="${bw}" height="${N?98:66}" rx="12" style="fill:var(--brand-soft)"/>`;
    s+=`<text x="${bx+14}" y="28" class="t-sm" style="fill:var(--brand)">WHAT WE CALLED IT</text>`;
    s+=`<text x="${bx+bw-14}" y="${N?34:52}" class="t-big t-end" style="font-size:${N?24:30}px;fill:var(--brand)">${Math.round(yr)}</text>`;
    const nameLines=n=>N?(n.includes('|')?n.split(' | ').map((x,i)=>i?'| '+x:x):hiWrap(n,28)):[n];
    const putName=(n,op,dy)=>nameLines(n.n).map((l,i)=>`<text x="${bx+14}" y="${f1((N?54:54)+i*21+dy)}" class="t-big" style="font-size:${N?18:24}px;opacity:${f1(op)}">${l}</text>`).join('');
    if(prev&&fade<1&&prev.n!==nm.n)s+=putName(prev,1-fade,-6*fade);
    s+=putName(nm,prev&&prev.n!==nm.n?fade:1,prev&&prev.n!==nm.n?6*(1-fade):0);
    const subY=N?(nameLines(nm.n).length>1?98:80):70;
    s+=`<text x="${bx+14}" y="${subY}" class="t-xs" style="opacity:${f1(Math.max(.4,fade))}">${nm.s}</text>`;
    /* ---- era detail ---- */
    const D=N?{y:120,ex:52,ey:172,es:.8,tx:104,tw:36,ty:138}:{y:88,ex:76,ey:150,es:1,tx:150,tw:76,ty:110};
    S.em.forEach((k,i)=>{s+=hiEmblem(k,D.ex+(S.em.length>1?(i?20:-14):0),D.ey+(S.em.length>1?(i?22:-14):0),D.es*(S.em.length>1?.68:1))});
    s+=hiWrap(S.t,N?28:60).map((l,i)=>`<text x="${D.tx}" y="${D.ty+i*20}" class="t-big" style="font-size:${N?16:19}px">${l}</text>`).join('');
    const tl=hiWrap(S.t,N?28:60).length;s+=`<text x="${D.tx}" y="${D.ty+tl*20-2}" class="t-sm">${S.k}</text>`;
    const evs=HI_EV.filter(e=>e.y>=S.y0&&e.y<S.y1);let ly=D.ty+tl*20+18;
    const ly0=ly;evs.forEach((e,i)=>{const on=yr>=e.y-.2,c=HI_TR[e.tr][1],ex=D.tx+(!N&&i>=4?280:0),ey=N?ly0+i*15:ly0+(i%4)*14;
      s+=`<circle cx="${ex+4}" cy="${ey-4}" r="4" style="fill:${on?c:'none'};stroke:${c};stroke-width:1.5"/><text x="${ex+14}" y="${ey}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};opacity:${on?1:.55};font-weight:${on?600:400}">${Math.floor(e.y)} · ${e.l}</text>`});
    /* ---- timeline ---- */
    if(!N){const x0=130,x1=696,X=y=>lerp(x0,x1,hiU(y)),ty=[236,262,288],ay=312,xm=X(yr);
      HI_TR.forEach(([n,c],i)=>{s+=`<text x="24" y="${ty[i]+3.5}" class="t-xs" style="fill:${c};font-weight:600">${n}</text><line x1="${x0}" x2="${x1}" y1="${ty[i]}" y2="${ty[i]}" style="stroke:var(--line);stroke-width:1"/>`});
      /* scale break */
      s+=`<rect x="${f1(X(HI_YB)-3)}" y="${ay-6}" width="6" height="12" style="fill:var(--panel)"/><path d="M${f1(X(HI_YB)-5)} ${ay+6}l4 -12M${f1(X(HI_YB)+1)} ${ay+6}l4 -12" style="stroke:var(--muted);stroke-width:1.2"/>`;
      s+=`<line x1="${x0}" x2="${x1}" y1="${ay}" y2="${ay}" class="axis" style="stroke:var(--muted)"/>`;
      [1780,1850,1900,1930,1950,1975,2000,2025].forEach(y=>{s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${ay-3}" y2="${ay+3}" style="stroke:var(--muted)"/><text x="${f1(X(y))}" y="${ay+15}" class="t-xs t-mid">${y}</text>`});
      HI_ERA.forEach((e,i)=>{const a=X(e.a),b=X(e.b),on=i===p;s+=`<rect x="${f1(a+1)}" y="${ay+22}" width="${f1(b-a-2)}" height="18" rx="4" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1((a+b)/2)}" y="${ay+34.5}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--muted)'};font-weight:600">${e.n}</text>`});
      s+=`<rect x="${f1(X(1880))}" y="${ty[1]-5}" width="${f1(X(1933)-X(1880))}" height="10" rx="5" style="fill:var(--dx);opacity:.12"/><text x="${f1(X(1933)-4)}" y="${ty[1]+14}" class="t-xs t-end" style="fill:var(--dx)">temperance → Prohibition repealed 1933</text>`;
      HI_EV.forEach(e=>{const x=X(e.y),y=ty[e.tr],c=HI_TR[e.tr][1],on=yr>=e.y-.2,cur=e.y>=S.y0&&e.y<S.y1;
        s+=`<circle cx="${f1(x)}" cy="${y}" r="${cur?5.5:4}" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.6"/>`});
      s+=`<line x1="${f1(xm)}" x2="${f1(xm)}" y1="220" y2="${ay}" style="stroke:var(--ink);stroke-width:1.6"/><path d="M${f1(xm)} ${ay-1}l-6 -9h12Z" style="fill:var(--ink)"/>`;
      s+=`<text x="${f1(clamp(xm,150,676))}" y="216" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${Math.round(yr)}</text>`}
    else{const y0=346,y1=746,Y=y=>lerp(y0,y1,hiU(y)),ax=70,tx=[86,100,114],ym=Y(yr);
      HI_TR.forEach(([n,c],i)=>{s+=`<circle cx="${16+i*124}" cy="${y0-28}" r="4" style="fill:${c}"/><text x="${24+i*124}" y="${y0-24.5}" class="t-xs" style="fill:${c};font-weight:600">${n}</text>`;
        s+=`<line x1="${tx[i]}" x2="${tx[i]}" y1="${y0}" y2="${y1}" style="stroke:var(--line)"/>`});
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${y1}" style="stroke:var(--muted)"/>`;
      s+=`<path d="M${ax-6} ${f1(Y(HI_YB)+3)}l12 -4M${ax-6} ${f1(Y(HI_YB)+7)}l12 -4" style="stroke:var(--muted);stroke-width:1.2"/>`;
      [1780,1850,1900,1930,1950,1975,2000,2025].forEach(y=>{s+=`<line x1="${ax-3}" x2="${ax+3}" y1="${f1(Y(y))}" y2="${f1(Y(y))}" style="stroke:var(--muted)"/><text x="${ax-7}" y="${f1(Y(y)+3.5)}" class="t-xs t-end">${y}</text>`});
      HI_ERA.forEach((e,i)=>{const a=Y(e.a),b=Y(e.b),on=i===p;s+=`<rect x="128" y="${f1(a+1)}" width="5" height="${f1(b-a-2)}" rx="2" style="fill:${on?'var(--brand)':'var(--line)'}"/><text x="142" y="${f1((a+b)/2+3.5)}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${e.n}</text>`});
      HI_EV.forEach(e=>{const y=Y(e.y),x=tx[e.tr],c=HI_TR[e.tr][1],on=yr>=e.y-.2,cur=e.y>=S.y0&&e.y<S.y1;s+=`<circle cx="${x}" cy="${f1(y)}" r="${cur?4.5:3.2}" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.4"/>`});
      s+=`<line x1="${ax-4}" x2="390" y1="${f1(ym)}" y2="${f1(ym)}" style="stroke:var(--ink);stroke-width:1.3;stroke-dasharray:3 3"/><path d="M${ax-1} ${f1(ym)}l-8 -5v10Z" style="fill:var(--ink)"/><text x="388" y="${f1(ym-4)}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${Math.round(yr)}</text>`}
    svg.innerHTML=s;note.innerHTML=noteHTML(S);setSt(p);
    rg.setAttribute('aria-valuetext',`${Math.round(yr)}: ${S.t}`)}
  const stop=playWire(rg,$('#hiPlay'),draw,22000,'%t:player.replay%','history');
  const setA=stepWire($('#hiSteps'),STEPS,rg,draw,stop);
  setSt=i=>{setA(i);rg.setAttribute('aria-valuetext',`${Math.round(hiYr(+rg.value))}: ${STEPS[i].t}`)};
  /* jump chips */
  const YR=[1784,1849,1933,1935,1948,1951,1960,1976,1980,1994,2004,2006,2013,2019,2022];
  const yc=$('#hiYears');yc.innerHTML=YR.map(y=>`<button class="tag" data-hy="${y}">${y}</button>`).join('');
  yc.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=clamp(hiU(+b.dataset.hy)+.002);rg.value=v;draw(v)});
  draw(+rg.value);

  /* ---------- how the diagnosis changed ---------- */
  const dsv=$('#hiDx');let dxS=0,dxStop=null;
  /* g4: 'ab' abuse, 'dep' dependence, null not a criterion; in5: false = dropped in DSM-5 */
  const CR=[['role','Role obligations failed','ab',true],['haz','Hazardous situations','ab',true],['legal','Legal problems','ab',false],['soc','Despite social problems','ab',true],
    ['tol','Tolerance','dep',true],['wd','Withdrawal','dep',true],['more','More / longer than intended','dep',true],['cut','Failed efforts to cut down','dep',true],
    ['time','Much time spent','dep',true],['give','Activities given up','dep',true],['cont','Despite physical/psych. harm','dep',true],['crave','Craving',null,true]];
  function lay(state,N){/* returns {id:[x,y,w]} plus box frames */
    const P={},cw=N?176:200,ch=N?24:24;
    if(state===0){let ia=0,id=0;
      CR.forEach(([id_,_,g])=>{if(g==='ab'){P[id_]=N?[24+(ia%2)*184,74+Math.floor(ia/2)*30,cw]:[36,70+ia*32,cw];ia++}
        else if(g==='dep'){P[id_]=N?[24+(id%2)*184,212+Math.floor(id/2)*30,cw]:[286+(id%2)*212,70+Math.floor(id/2)*32,cw];id++}
        else P[id_]=N?[24,370,cw]:[286,240,cw]})}
    else{let k=0;CR.forEach(([id_,_,g,in5])=>{if(!in5){P[id_]=N?[24,352,cw]:[36,270,cw];return}
        const order=k++;P[id_]=N?[24+(order%2)*184,74+Math.floor(order/2)*30,cw]:[36+(order%3)*218,70+Math.floor(order/3)*32,cw]})}
    return P}
  function drawDx(u){/* u: continuous state 0..2 */
    const N=vb(dsv,'720 340','400 480');let s='';s+=`<defs>${marker('hiDxA','var(--muted)')}</defs>`;
    const a=Math.min(1,u),P0=lay(0,N),P1=lay(1,N),icd=ramp(u,1,2),cv=1-icd*.85;
    const box=(x,y,w,h,c,lab,op)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:none;stroke:${c};stroke-width:1.8;opacity:${f1(op)}"/><text x="${x+10}" y="${y-6}" class="t-sm" style="fill:${c};opacity:${f1(op)}">${lab}</text>`;
    /* frames: DSM-IV two boxes fade out, DSM-5 one box fades in */
    const f4=1-ramp(a,0,.5),f5=ramp(a,.5,1)*cv;
    if(N){s+=box(16,58,368,76,'var(--dx)','DSM-IV ALCOHOL ABUSE',f4)+box(16,196,368,136,'var(--brand)','DSM-IV ALCOHOL DEPENDENCE',f4);
      s+=box(16,58,368,206,'var(--brand)','DSM-5 ALCOHOL USE DISORDER · 2 OR MORE OF 11',f5)}
    else{s+=box(24,54,226,142,'var(--dx)','DSM-IV ALCOHOL ABUSE',f4)+box(274,54,434,142,'var(--brand)','DSM-IV ALCOHOL DEPENDENCE',f4);
      s+=box(24,54,684,142,'var(--brand)','DSM-5 ALCOHOL USE DISORDER · 2 OR MORE OF 11 IN 12 MONTHS',f5)}
    if(f4>.05)s+=`<text x="${N?24:286}" y="${N?362:232}" class="t-xs" style="opacity:${f1(f4)}">not a DSM-IV criterion:</text>`;
    if(f5>.05){s+=`<text x="${N?24:36}" y="${N?344:262}" class="t-xs" style="fill:var(--bad);opacity:${f1(f5)}">${N?'dropped: low prevalence, low discrimination, poor fit':'dropped in DSM-5: very low prevalence, low discrimination, poor fit'}</text>`;
      /* severity bar */
      const sx=N?16:24,sy=N?292:222,sw=N?368:684;[['mild 2–3','var(--gaba-fill)'],['moderate 4–5','var(--brand)'],['severe 6+','var(--accent)']].forEach(([l,c],i)=>{s+=`<rect x="${f1(sx+i*sw/3)}" y="${sy}" width="${f1(sw/3-3)}" height="18" rx="5" style="fill:${c};opacity:${f1(f5)}"/><text x="${f1(sx+i*sw/3+sw/6)}" y="${sy+12.5}" class="t-xs t-mid" style="fill:#fff;font-weight:600;opacity:${f1(f5)}">${l}</text>`});
      s+=`<text x="${sx}" y="${sy-6}" class="t-sm" style="opacity:${f1(f5)}">SEVERITY BY CRITERIA COUNT</text>`}
    /* chips */
    CR.forEach(([id,lab,g,in5])=>{const p0=P0[id],p1=P1[id],e=ease(a),x=lerp(p0[0],p1[0],e),y=lerp(p0[1],p1[1],e),w=p0[2];
      const dropped=!in5&&a>.5,added=id==='crave'&&a>.5,absent=id==='crave'&&a<=.5;
      const col=dropped?'var(--bad)':added?'var(--good)':absent?'var(--muted)':g==='ab'&&a<.5?'var(--dx)':'var(--brand)';
      s+=`<g style="opacity:${f1(cv)}"><rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="24" rx="12" style="fill:${dropped||absent?'var(--panel)':'var(--panel-2)'};stroke:${col};stroke-width:${added||dropped?2:1.2};${absent?'stroke-dasharray:3 3;':''}"/>`;
      s+=`<text x="${f1(x+12)}" y="${f1(y+16)}" style="font:600 ${N?11:11.5}px var(--body);fill:${dropped?'var(--bad)':absent?'var(--muted)':'var(--ink)'}${dropped?';text-decoration:line-through':''}">${lab}</text>`;
      if(added)s+=`<text x="${f1(x+w-10)}" y="${f1(y+16)}" class="t-xs t-end" style="fill:var(--good);font-weight:700">ADDED</text>`;
      if(dropped)s+=`<text x="${f1(x+w-10)}" y="${f1(y+16)}" class="t-xs t-end" style="fill:var(--bad);font-weight:700">DROPPED</text>`;
      s+='</g>'});
    /* ICD-11 overlay */
    if(icd>0){const F=[['Impaired control','over onset, level, circumstances or stopping; sometimes craving'],['Increasing priority','drinking takes precedence over other parts of life'],['Physiological features','tolerance, withdrawal, or use to prevent or relieve withdrawal']];
      const o=f1(icd);s+=`<rect x="${N?8:16}" y="${N?40:34}" width="${N?384:692}" height="${N?432:300}" rx="12" style="fill:var(--panel);opacity:${f1(icd*.93)}"/>`;
      s+=N?`<text x="16" y="58" class="t-sm" style="fill:var(--brand);opacity:${o}">ICD-11 ALCOHOL DEPENDENCE</text><text x="16" y="72" class="t-sm" style="fill:var(--brand);opacity:${o}">AT LEAST 2 OF 3 ESSENTIAL FEATURES</text>`:`<text x="24" y="56" class="t-sm" style="fill:var(--brand);opacity:${o}">ICD-11 ALCOHOL DEPENDENCE · AT LEAST 2 OF 3 ESSENTIAL FEATURES</text>`;
      F.forEach(([h,d],i)=>{const x=N?16:24+i*228,y=N?84+i*84:70,w=N?368:216,hh=N?72:96;
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="10" style="fill:var(--brand-soft);opacity:${o}"/><text x="${x+12}" y="${y+22}" class="t-lbl" style="fill:var(--brand);opacity:${o}">${h}</text>`;
        s+=hiWrap(d,N?52:32).map((l,j)=>`<text x="${x+12}" y="${y+40+j*14}" class="t-xs" style="fill:var(--ink);opacity:${o}">${l}</text>`).join('')});
      const by=N?346:196;
      s+=`<rect x="${N?16:24}" y="${by}" width="${N?368:336}" height="${N?56:74}" rx="10" style="fill:var(--dx-soft);opacity:${o}"/><text x="${N?28:36}" y="${by+22}" class="t-lbl" style="fill:var(--dx);opacity:${o}">Harmful pattern of use of alcohol</text>`;
      s+=hiWrap('a separate diagnosis; it added harm to others',N?52:44).map((l,j)=>`<text x="${N?28:36}" y="${by+40+j*14}" class="t-xs" style="fill:var(--ink);opacity:${o}">${l}</text>`).join('');
      s+=`<rect x="${N?16:372}" y="${N?410:by}" width="${N?368:336}" height="${N?56:74}" rx="10" style="fill:var(--panel-2);opacity:${o}"/><text x="${N?28:384}" y="${(N?410:by)+22}" class="t-lbl" style="opacity:${o}">Hazardous alcohol use</text>`;
      s+=`<text x="${N?28:384}" y="${(N?410:by)+40}" class="t-xs" style="fill:var(--ink);opacity:${o}">listed separately: a health risk factor, not a disorder</text>`}
    dsv.innerHTML=s}
  const DXN=[
    {k:'DSM-IV · 1994',t:'Two diagnoses, and the "orphans"',
     txt:`DSM-IV kept separate alcohol abuse and alcohol dependence. Its hierarchy created "diagnostic orphans": people with two dependence criteria and no abuse criteria received no diagnosis at all [[Hasin2013,Peer2013DSM5]]. Yet factor analyses showed the abuse and dependence criteria formed one factor or two highly correlated factors, and NESARC data suggested a continuum of severity rather than two distinct entities. [[Hasin2013,Li2007ADS]]`,
     pt:`The old system had two boxes. Some people with real problems fell between them and got no diagnosis.`,
     hook:`DSM-IV diagnostic orphan: 2 dependence criteria, 0 abuse criteria = no diagnosis. [[Hasin2013]]`},
    {k:'DSM-5 · 2013',t:'One disorder: legal problems out, craving in',
     txt:`DSM-5 merged the two into alcohol use disorder, based on more than 200,000 study participants. Legal problems were dropped for very low prevalence, low discrimination and poor fit; craving was added, its psychometric benefit equivocal, because it may become a biological treatment target. The 2-criterion threshold gave the best agreement with DSM-IV abuse plus dependence [[Hasin2013]]. DSM-IV dependence agreed best with DSM-5 AUD at 4 or more criteria, so trials in dependence apply best to moderate-to-severe AUD [[Compton2013Crosswalk]]. One review counts 2048 qualifying symptom combinations, so two people with AUD can share few symptoms. [[Witkiewitz2019]]`,
     pt:`Now there is one condition, rated mild, moderate or severe by how many of 11 signs a person has. Wanting a drink very strongly (craving) became one of them.`,
     hook:`DSM-5 AUD: ≥2 of 11 in 12 months. Out: legal problems. In: craving. DSM-IV dependence ≈ DSM-5 moderate (≥4). [[Hasin2013,Compton2013Crosswalk]] Try the counter in <a href="#criteria" data-go="criteria">Diagnosis</a>.`},
    {k:'ICD-11 · 2019',t:'Dependence and harmful use, still separate',
     txt:`ICD-11 condenses the six ICD-10 dependence criteria into three essential features, and at least two are needed for alcohol dependence. Harmful pattern of use added harm to others, though endorsement was very low and its validity is questionable [[Degenhardt2019ICD11]]. ICD-11 agreed closely with ICD-10 and DSM-IV, and agreement with DSM-5 was good for dependence vs severe AUD but poor for harmful use vs mild AUD [[Degenhardt2019ICD11]]. Hazardous alcohol use is listed separately as a health risk factor. [[Saunders2019ICD11]]`,
     pt:`The WHO's system still uses the word "dependence". It and DSM-5 will label some people differently, especially at the mild end.`,
     hook:`ICD-11 alcohol dependence: 2 of 3 features (impaired control, increasing priority, physiological features). [[Degenhardt2019ICD11]]`}];
  function setDx(k){const from=dxS;dxS=k;$$('#hiDxBtns [data-dx]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.dx===k));
    $('#hiDxNote').innerHTML=noteHTML(DXN[k]);dxStop&&dxStop();dxStop=animate(900,p=>drawDx(lerp(from,k,ease(p))),()=>{dxStop=null})}
  $('#hiDxBtns').addEventListener('click',e=>{const b=e.target.closest('[data-dx]');if(b)setDx(+b.dataset.dx)});
  drawDx(0);$('#hiDxNote').innerHTML=noteHTML(DXN[0]);
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();drawDx(dxS)};
};
