/* =============== 1.3 From injury to scar =============== */
const FI_Y1=38,FI_RATE=.133,FI_STOP=30;
const fiT=y=>y/FI_Y1;
const FI_BASE=[
 {from:0,at:fiT(.05),k:'Year 0 · F0',t:'A healthy lobule',
  txt:`Stellate cells are quiet: small, star-shaped, full of vitamin A droplets. The sinusoid lining is a sieve with open windows, and in health it keeps stellate cells quiescent. [[Friedman2008PhysiolRev,Poisson2017]] Scar can follow many causes: fatty liver disease linked to obesity (MASLD), high alcohol intake, hepatitis B or C, autoimmune and cholestatic diseases, and iron or copper overload. [[Gines2021Lancet,Rinella2023MASLD]]`,
  pt:`A healthy liver has almost no scar. The cells that will later make scar are resting and storing vitamin A.`,
  hook:`Quiescent stellate cell = vitamin A store in the space of Disse. [[Friedman2008PhysiolRev]]`},
 {from:fiT(.3),at:fiT(2.5),k:'Years 0–4 · injury',t:'Injury, again and again',
  txt:`Injured hepatocytes die, and their apoptosis stimulates stellate cells. [[Bataller2005]] Macrophages, sinusoid cells, platelets, NK and NKT cells and B cells all shape what happens next. [[Tsuchida2017]] TGF-β1 is the strongest fibrogenic signal and PDGF the most potent stimulus for stellate cells to multiply. [[Bataller2005]] <span class="ev early">Early evidence</span> In mice, gut bacteria acting through TLR4 are needed for fibrosis: they sensitise stellate cells to TGF-β. [[Seki2007]]`,
  pt:`Fat, a virus, alcohol, an immune attack or an inherited condition keeps hurting liver cells. Each hurt cell sends out alarm signals.`,
  hook:`TGF-β1 = key fibrogenic cytokine; PDGF = key stellate-cell mitogen. [[Bataller2005]]`},
 {from:fiT(4),at:fiT(9),k:'Years 4–12 · F1 → F2',t:'Stellate cells switch on',
  txt:`<span class="ev est">Established</span> Stellate-cell activation, quiescent vitamin A-storing cells turning into proliferative, fibrogenic myofibroblasts, is the central driver of fibrosis. [[Tsuchida2017]] In mouse models of toxic, cholestatic and fatty liver disease, stellate cells gave rise to 82–96% of myofibroblasts. [[Mederacke2013]] Matrix builds up because synthesis rises and breakdown falls: the enzymes that digest collagen (MMPs) are held back by their inhibitors, the TIMPs. [[Bataller2005]]`,
  pt:`The resting cells drop their vitamin A, stretch out and start laying down scar protein, collagen.`,
  hook:`Activated stellate cells (myofibroblasts) make most scar: 82–96% in mouse fate tracing. TIMPs block MMPs. [[Mederacke2013,Bataller2005]]`},
 {from:fiT(12),at:fiT(18),k:'Years 12–22 · F2 → F3',t:'Windows close, septa bridge',
  txt:`The sinusoid lining loses its windows (fenestrae) and gains a basement membrane: capillarisation. It comes before fibrosis and lets activation proceed. [[DeLeve2015]] Capillarised cells promote new vessels and vasoconstriction. [[Poisson2017]] Scar runs from triad to triad, then bridges to the central vein. Activated stellate cells also contract, raising resistance to blood flow. [[Bataller2005,Schuppan2008]] Septal thickness on biopsy correlates with portal pressure (HVPG). [[GarciaTsao2010]]`,
  pt:`Scar spreads in strands that join up across the liver, and the tiny blood channels stiffen. Blood starts to meet resistance.`,
  hook:`Capillarisation (lost fenestrae + basement membrane) precedes fibrosis. [[DeLeve2015]]`},
 {from:fiT(22),at:fiT(27),k:'Years 22–30 · F4',t:'Nodules: cirrhosis',
  txt:`Cirrhosis is defined under the microscope as regenerative nodules surrounded by fibrous bands, in response to chronic injury; it leads to portal hypertension and end-stage liver disease. [[Schuppan2008]] Advanced fibrosis holds about 6 times the normal matrix: collagens I, III and IV, fibronectin, elastin, laminin, hyaluronan and proteoglycans. [[Bataller2005]] An HVPG above 10 mmHg defines clinically significant portal hypertension; some people reach it before biopsy shows cirrhosis. [[GarciaTsao2010]] Next: <a href="#portal" data-go="portal">Portal hypertension &amp; varices</a>.`,
  pt:`Cirrhosis means scar has spread and the liver has broken into lumps (nodules). Blood cannot flow through easily, so pressure builds up behind the liver.`,
  hook:`Cirrhosis = regenerative nodules + fibrous bands. ≈6× normal ECM. HVPG >10 mmHg = CSPH. [[Schuppan2008,Bataller2005,GarciaTsao2010]]`}
];
const FI_LAST={
 go:{from:fiT(30),at:fiT(34),k:'Years 30–38 · cause continues',t:'Cirrhosis keeps going',
  txt:`With the injury still present, scar and nodules stay and thicken. Cirrhosis moves from an asymptomatic compensated phase to a symptomatic decompensated phase. [[Gines2021Lancet]] Thick septa on biopsy independently predict clinically significant portal hypertension and decompensation; total fibrosis area does not. [[GarciaTsao2010]] Press <b>The cause is removed</b> to see the other path, and see <a href="#course" data-go="course">Compensated to decompensated: the course</a>.`,
  pt:`If the cause carries on, the scar keeps building. Many people feel well for years before problems start.`,
  hook:`Septal thickness, not total fibrosis area, predicts decompensation. [[GarciaTsao2010]]`},
 stop:{from:fiT(30),at:fiT(35.5),k:'Years 30–38 · cause removed',t:'The scar can shrink',
  txt:`<span class="ev est">Established</span> When the cause is removed, activated myofibroblasts are eliminated and scar is resorbed. [[Kisseleva2021]] In rats, activated stellate cells fell 12-fold by apoptosis within 28 days, as TIMPs dropped and collagenase activity rose. [[Iredale1998]] In mice about half of myofibroblasts revert to an inactive state that reactivates faster with new injury. [[Kisseleva2012]] In people: after 5 years of tenofovir for hepatitis B, 71 of 96 with cirrhosis (74%) no longer had it on biopsy; after hepatitis C cure, cirrhosis regressed in 61% and collagen fell in 89%, but capillarisation did not change. [[Marcellin2013,DAmbrosio2012]] Cross-linked old scar resists: rat cirrhosis remodelled only to coarser nodules. [[Issa2004]]`,
  pt:`When the cause is treated, the scar can shrink. In one hepatitis B study, about 3 in 4 people with cirrhosis no longer had cirrhosis on biopsy after 5 years. Some changes stay, so check-ups continue.`,
  hook:`Tenofovir 5 years: 74% lost cirrhosis. HCV SVR: 61% regressed, capillarisation persisted. Cross-linking (transglutaminase) limits regression. [[Marcellin2013,DAmbrosio2012,Issa2004]]`}
};
const FI_SC={
 hcv:{n:'Untreated hepatitis C (median)',r:FI_RATE,col:'var(--brand)',src:'[[Poynard1997]]'},
 hcvfast:{n:'HCV, men infected after 40',r:4/13,col:'var(--bad)',src:'[[Poynard1997]]'},
 hcvslow:{n:'HCV, women before 40, no alcohol',r:4/42,col:'var(--good)',src:'[[Poynard1997]]'},
 nash:{n:'MASH',r:1/7.1,col:'var(--liver)',src:'[[Singh2015]]'},
 nafl:{n:'MASLD, steatosis only',r:1/14.3,col:'var(--accent)',src:'[[Singh2015]]'}
};

inits.fibrosis=()=>{
  const svg=$('#fiSvg'),rg=$('#fiT');let mode='go',setSt=()=>{},steps=FI_BASE.concat([FI_LAST.go]);
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const TH=(x,y,txt,c='t-xs t-mid',col='var(--ink)')=>T(x,y,txt,c,`fill:${col};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3.5px;stroke-linejoin:round`);
  /* state of the liver at year y */
  function state(y){const st=mode==='stop'&&y>FI_STOP,reg=st?ease(ramp(y,FI_STOP,FI_STOP+6)):0;
    const raw=Math.min(4,FI_RATE*y),stage=raw-reg*1.1;
    const act=ramp(y,1.2,6)*(1-.82*reg),cap=ramp(y,4,16),ecm=Math.pow(ramp(raw,0,4),1.15)*(1-.55*reg);
    const injury=st?0:clamp(ramp(y,.2,1.2));
    return{y,raw,stage,reg,act,cap,ecm,injury,fold:1+5*ecm}}
  /* close-up of one sinusoid, 220 x 250 */
  function close(S,fl){let s='';const rr=rng(12);
    s+=`<rect x="0" y="0" width="220" height="250" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const hurtAt=(i)=>S.injury*clamp(Math.sin(fl*6.28*2+i*1.7)*.9+.2);
    [36,104,172].forEach((x,i)=>{s+=hepatocyte(x,50,62,{seed:i+1,hurt:hurtAt(i)})+hepatocyte(x+12,212,62,{seed:i+5,hurt:hurtAt(i+3)})});
    s+=`<rect x="4" y="82" width="212" height="16" style="fill:var(--scar);opacity:.4"/><rect x="4" y="150" width="212" height="34" style="fill:var(--scar);opacity:.4"/>`;
    s+=`<rect x="4" y="98" width="212" height="52" style="fill:var(--portal-soft)"/>`;
    const gap=f1(.2+5*(1-S.cap));
    [98,150].forEach(y=>{s+=`<line x1="4" x2="216" y1="${y}" y2="${y}" style="stroke:var(--brand);stroke-width:3;stroke-dasharray:14 ${gap}"/>`;
      if(S.cap>.05)s+=`<line x1="4" x2="216" y1="${y+(y<120?-3:3)}" y2="${y+(y<120?-3:3)}" style="stroke:var(--scar-line);stroke-width:1.6;opacity:${f1(S.cap)}"/>`});
    for(let i=0;i<10;i++){const p=(fl+i/10)%1;s+=`<circle cx="${f1(4+p*212)}" cy="${f1(106+(i*13)%36)}" r="2.8" style="fill:${i%4?'var(--artery)':'var(--portal)'};opacity:.7"/>`}
    /* collagen in the space of Disse */
    const nc=Math.round(S.ecm*7);for(let i=0;i<nc;i++){const y=i%2?90:158+((i*7)%22),x0=8+rr()*60,len=60+rr()*90;s+=collagen(x0,y,Math.min(212,x0+len),y+(rr()-.5)*4,{w:1.2,op:.85,amp:2})}
    s+=stellate(96,167,1.05,{act:S.act,ang:4});
    /* alarm signals from hurt cells to the stellate cell */
    if(S.injury>0&&S.raw<4.2)for(let i=0;i<5;i++){const p=(fl*1.5+i/5)%1,sx=[36,104,172,48,116][i],sy=i<3?60:204;s+=`<circle cx="${f1(lerp(sx,96,p))}" cy="${f1(lerp(sy,167,p))}" r="2.4" style="fill:var(--bad);opacity:${f1(S.injury*(1-p*.5))}"/>`}
    /* labels */
    if(S.act<.3)s+=TH(172,176,'vitamin A store','t-xs t-mid','var(--stellate)');
    else s+=TH(176,176,S.act>.6?'myofibroblast':'activating','t-xs t-mid','var(--stellate)');
    if(S.injury>0&&S.raw<2.5)s+=TH(110,30,'alarm signals: TGF-β1, PDGF','t-xs t-mid','var(--bad)');
    s+=TH(110,124,S.cap<.25?'open windows (fenestrae)':S.cap<.85?'windows closing':'capillarised lining','t-xs t-mid','var(--brand)');
    if(S.ecm>.15)s+=TH(110,244,`collagen I, III… ≈${f1(S.fold)}× matrix`,'t-xs t-mid','var(--scar-line)');
    return s}
  function draw(t){
    const nr=vb(svg,'720 400','400 570'),y=t*FI_Y1,S=state(y),ph=phaseOf(steps,t),fl=(t*30)%1;let s='';
    const Lb=nr?{x:98,y:296,r:72}:{x:118,y:180,r:88},Cl=nr?{x:192,y:206,k:.88}:{x:250,y:56,k:1},Lv=nr?{x:200,y:100,s:.95}:{x:596,y:180,s:1};
    s+=T(nr?20:20,nr?212:46,'ONE LOBULE','t-sm','fill:var(--ink)')+T(Cl.x,Cl.y-8,'CLOSE-UP: ONE SINUSOID','t-sm','fill:var(--ink)')+T(nr?20:510,nr?24:46,'WHOLE LIVER','t-sm','fill:var(--ink)');
    s+=lobule(Lb.x,Lb.y,Lb.r,{flow:fl,fib:clamp(S.raw/4*(1-.45*S.reg)),act:S.act,clip:true,id:'fiLob'}).svg;
    s+=`<g transform="translate(${Cl.x} ${Cl.y}) scale(${Cl.k})">${close(S,fl)}</g>`;
    s+=liver(Lv.x,Lv.y,Lv.s,{fib:Math.min(4,S.raw),regress:S.reg,seed:5}).svg;
    if(mode==='stop'&&y>FI_STOP)s+=TH(Lv.x,Lv.y+(nr?66:78),'cause removed: scar thinning','t-xs t-mid','var(--good)');
    else if(S.raw>=3.95)s+=TH(Lv.x,Lv.y+(nr?66:78),'nodules ringed by scar','t-xs t-mid','var(--liver)');
    /* METAVIR bar */
    const bx0=nr?30:70,bx1=nr?370:650,by=nr?482:338,bw=(bx1-bx0)/5;
    ['F0','F1','F2','F3','F4'].forEach((f,i)=>{const on=Math.min(4,Math.max(0,Math.floor(S.stage+.0001)))===i;s+=`<rect x="${f1(bx0+i*bw+1)}" y="${by}" width="${f1(bw-2)}" height="22" rx="5" style="fill:${on?'var(--brand)':'var(--panel-2)'};opacity:${f1(.35+.65*(i<=S.stage+.5?1:.4))}"/>`+T(bx0+i*bw+bw/2,by+15,f+(nr?'':i===4?' cirrhosis':i===0?' none':''),'t-xs t-mid',`fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700`)});
    const mx=lerp(bx0+bw/2,bx1-bw/2,clamp(S.stage/4));
    s+=`<path d="M${f1(mx)} ${by-2}l-6 -9h12z" style="fill:var(--ink)"/>`;
    s+=T(bx0,by-16,'METAVIR fibrosis stage (schematic pace)','t-xs')+T(bx1,by-16,`year ${f1(y)}`,'t-xs t-end','fill:var(--ink);font-weight:700');
    /* year ruler */
    const ry=by+40;s+=`<line x1="${bx0}" x2="${bx1}" y1="${ry}" y2="${ry}" class="axis"/>`;
    [0,10,20,30,38].forEach(v=>{const x=lerp(bx0,bx1,v/FI_Y1);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ry-3}" y2="${ry+3}" class="axis"/>`+T(x,ry+14,v,'t-xs t-mid')});
    s+=`<circle cx="${f1(lerp(bx0,bx1,y/FI_Y1))}" cy="${ry}" r="4.5" style="fill:var(--brand)"/>`;
    if(mode==='stop'){const x=lerp(bx0,bx1,FI_STOP/FI_Y1);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ry-8}" y2="${ry+8}" style="stroke:var(--good);stroke-width:2"/>`+T(x+4,ry-8,'cause removed','t-xs','fill:var(--good)')}
    svg.innerHTML=s;
    setSt(ph);
    const stg=S.reg>0?`F${Math.floor(S.stage+.0001)} (regressing from F4)`:`F${Math.min(4,Math.floor(S.raw+.0001))}`;
    $('#fiRead').innerHTML=`<span>year <b>${f1(y)}</b></span><span>stage <b>${stg}</b></span><span>matrix <b>≈${f1(S.fold)}×</b> normal</span><span>stellate cells <b>${S.act<.3?'quiescent':S.act>.6?'activated':'activating'}</b></span><span>lining <b>${S.cap<.25?'fenestrated':S.cap<.85?'closing':'capillarised'}</b></span>`;
    $('#fiNote').innerHTML=noteHTML(steps[ph]);
  }
  const stop=playWire(rg,$('#fiPlay'),draw,30000,'Replay','fibrosis');
  function wire(){const old=$('#fiSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps,rg,draw,stop)}
  $$('[data-fm]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.fm;steps=FI_BASE.concat([FI_LAST[mode]]);$$('[data-fm]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();
    if(mode==='stop'&&+rg.value<fiT(FI_STOP)){rg.value=fiT(FI_STOP);}draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---------- regression evidence bars ---------- */
  const ev=$('#fiEvSvg');
  const EV=[['Hepatitis B, tenofovir 5 y','no longer cirrhosis',74,'var(--good)'],['Hepatitis B, entecavir ~6 y','≥1 Ishak point better',88,'var(--good)'],['Hepatitis C cure (SVR), ~5 y','cirrhosis regressed',61,'var(--brand)'],['Hepatitis C cure (SVR), ~5 y','collagen fell',89,'var(--brand)'],['MASH, lifestyle, ≥10% weight loss','fibrosis regressed (52 wk)',45,'var(--accent)'],['MASH, bariatric surgery, 5 y','fibrosis decreased',70.2,'var(--accent)']];
  function drawEv(){const nr=vb(ev,'720 300','400 470');let s='';
    EV.forEach(([a,b,v,c],i)=>{const y=nr?18+i*74:26+i*44,x0=nr?20:300,w=nr?300:340,yb=nr?y+36:y;
      s+=T(nr?20:290,nr?y+4:y+8,a,nr?'t-sm':'t-sm t-end','fill:var(--ink)')+T(nr?20:290,nr?y+18:y+22,b,nr?'t-xs':'t-xs t-end');
      s+=`<rect x="${x0}" y="${yb-8}" width="${w}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${x0}" y="${yb-8}" width="${f1(w*v/100)}" height="18" rx="4" style="fill:${c};opacity:.85"/>`+T(x0+w*v/100+6,yb+6,v+'%','t-sm','fill:var(--ink);font-weight:700')});
    ev.innerHTML=s}
  drawEv();

  /* ---------- progression-rate explainer ---------- */
  const rs=$('#fiRate'),ag=$('#fiAge'),sc=$('#fiSc'),all=$('#fiAll');
  function drawR(){const nr=vb(rs,'560 300','400 340'),a0=+ag.value,k=sc.value,R=FI_SC[k];$('#fiAgeV').textContent=a0;
    const X0=nr?44:60,X1=nr?380:540,Y0=24,Y1=nr?280:250,A0=10,A1=100,X=a=>lerp(X0,X1,(a-A0)/(A1-A0)),Y=f=>lerp(Y1,Y0,f/4);let s='';
    [0,1,2,3,4].forEach(f=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(Y(f))}" y2="${f1(Y(f))}" class="${f?'grid':'axis'}"/>`+T(X0-6,Y(f)+3,'F'+f,'t-xs t-end')});
    for(let a=10;a<=100;a+=10)s+=T(X(a),Y1+16,a,'t-xs t-mid');s+=T(X1,Y1+32,'age (years)','t-xs t-end');
    const line=(r,col,w,op,dash)=>{const aF=a0+4/r,e=Math.min(A1,aF);return `<path d="M${f1(X(a0))} ${f1(Y(0))}L${f1(X(e))} ${f1(Y(Math.min(4,(e-a0)*r)))}${aF<A1?`L${f1(X(A1))} ${f1(Y(4))}`:''}" style="fill:none;stroke:${col};stroke-width:${w};opacity:${op}${dash?';stroke-dasharray:5 4':''}"/>`};
    if(all.checked)Object.keys(FI_SC).filter(q=>q!==k).forEach(q=>{s+=line(FI_SC[q].r,FI_SC[q].col,1.6,.5,true)});
    s+=`<rect x="${f1(X(a0))}" y="${Y0}" width="${f1(Math.max(0,X(Math.min(A1,a0+4/R.r))-X(a0)))}" height="${Y1-Y0}" style="fill:${R.col};opacity:.06"/>`;
    s+=line(R.r,R.col,3,1,false);
    const aF=a0+4/R.r;
    if(aF<=A1){s+=`<circle cx="${f1(X(aF))}" cy="${f1(Y(4))}" r="6" style="fill:${R.col};stroke:var(--panel);stroke-width:2"/>`+TH(Math.min(X(aF),X1-60),Y(4)-12,`F4 at about ${Math.round(aF)}`,'t-sm t-mid',R.col)}
    else s+=TH(X1-80,Y(Math.min(4,(A1-a0)*R.r))-12,'F4 not reached by 100','t-sm t-mid',R.col);
    s+=`<circle cx="${f1(X(a0))}" cy="${f1(Y(0))}" r="5" style="fill:var(--ink)"/>`+TH(X(a0)+6,Y(0)-10,'injury starts','t-xs');
    rs.innerHTML=s;
    const yrs=4/R.r;
    $('#fiRateOut').innerHTML=`<span class="big-num">${aF<=A1?Math.round(aF):'>100'}</span><span class="readout"><span>age at F4 if progressing exactly at the median</span><span><b>${f1(yrs)} years</b> from F0 · ${R.n}</span></span>`;
    $('#fiRateNote').innerHTML=noteHTML({k:'Illustrative only',t:k.startsWith('hcv')?'Hepatitis C: three decades, on average':'Fatty liver disease: slower, but not always',
      txt:k.startsWith('hcv')?`In 2235 people with untreated hepatitis C, the median fibrosis progression rate was 0.133 METAVIR units a year and the median time to cirrhosis 30 years, from 13 years in men infected after 40 to 42 years in women infected before 40 who did not drink. Infection after 40, drinking 50 g of alcohol or more a day and male sex sped progression; genotype did not. A third would reach cirrhosis in under 20 years, and 31% would never progress or would take 50 years or more. ${R.src} A meta-analysis estimated cirrhosis in 16% twenty years after infection. [[Thein2008]]`
        :`In paired-biopsy studies of 411 people with MASLD, fibrosis progressed by 0.14 stages a year with steatohepatitis (one stage per 7.1 years) and 0.07 with steatosis alone (one stage per 14.3 years). Over follow-up 33.6% progressed, 43.1% stayed stable and 22.3% improved. ${R.src} Weight loss of 10% or more brought fibrosis regression in 45% within a year. [[VilarGomez2015]]`,
      pt:`A straight line is a simplification. Real scarring speeds up, slows down or reverses, and treating the cause changes the line.`,
      hook:k.startsWith('hcv')?`HCV: ≈0.13 METAVIR units a year, median ≈30 years to cirrhosis. [[Poynard1997]]`:`MASH ≈ one stage per 7 years; steatosis alone ≈ one per 14 years. [[Singh2015]]`});
  }
  [ag,sc].forEach(e=>e.addEventListener('input',drawR));sc.addEventListener('change',drawR);all.addEventListener('change',drawR);
  drawR();
  const prevR=redraws.fibrosis;redraws.fibrosis=()=>{prevR&&prevR();drawEv();drawR()};
};
