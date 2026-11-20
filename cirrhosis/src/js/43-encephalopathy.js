/* =============== 4.3 Hepatic encephalopathy =============== */
const EN_STEPS=[
 {from:0,at:.07,k:'Step 1 · the source',t:'Gut bacteria make ammonia',
  txt:`Ammonia "is primarily produced in the gut, as an end product of protein digestion, amino acid deamination and bacterial urease activity". From the bowel it is carried to the liver in the portal vein. [[Rose2020]]`,
  pt:`Digestion and bacteria in the bowel make ammonia, a waste product, every day. [[Rose2020]]`,
  hook:`Main source of ammonia: the gut (protein digestion, amino acid deamination, bacterial urease). [[Rose2020]]`},
 {from:.17,at:.26,k:'Step 2 · the filter',t:'A healthy liver clears it',
  txt:`A healthy liver with an intact urea cycle turns ammonia into urea and keeps blood ammonia in "the low 35–50 μM range". Very little reaches the rest of the body. [[Rose2020]]`,
  pt:`A healthy liver clears ammonia from the blood before it can reach the brain. [[Rose2020]]`,
  hook:`Normal blood ammonia: the low 35–50 μM range, held there by the urea cycle. [[Rose2020]]`},
 {from:.34,at:.45,k:'Step 3 · the bypass',t:'Scar and shunts let it past',
  txt:`AASLD/EASL 2014 defines HE as "a brain dysfunction caused by liver insufficiency and/or PSS [portosystemic shunting]". Scarred tissue clears less, and bypass veins carry gut blood around the liver. Muscle, which "houses GS" (glutamine synthetase), becomes a second ammonia sink, which is why muscle loss raises HE risk. After TIPS, a deliberate shunt, the median 1-year incidence of overt HE is 10–50%. [[Vilstrup2014HE,Rose2020]]`,
  pt:`When the liver is scarred and blood takes detours around it, ammonia stays in the blood. [[Vilstrup2014HE,Rose2020]]`,
  hook:`HE = brain dysfunction from liver insufficiency and/or portosystemic shunting; in cirrhosis it is "type C". [[Vilstrup2014HE]]`},
 {from:.5,at:.58,k:'Step 4 · the brain',t:'Astrocytes swell',
  txt:`Ammonia "passes freely into the brain which is exclusively removed by astrocytes via glutamine synthetase". "The generation of glutamine renders the astrocyte hypertonic resulting in swelling and impaired function and brain oedema." Inflammation, oxidative stress, blood–brain barrier changes and increased GABAergic tone add to it. At first the change is covert: minimal HE shows only on tests, and grade I is a "trivial lack of awareness". [[Rose2020,Vilstrup2014HE]]`,
  pt:`Support cells in the brain soak up ammonia and swell. At first the change is so slight that only special tests pick it up. [[Rose2020,Vilstrup2014HE]]`,
  hook:`Astrocytes turn ammonia into glutamine → they swell. Covert HE = minimal HE + grade I. [[Rose2020,Vilstrup2014HE]]`},
 {from:.64,at:.76,k:'Step 5 · overt HE',t:'Confusion deepens: grades II–IV',
  txt:`Overt HE runs from grade II (disoriented for time, asterixis) through grade III (also disoriented for place, somnolent) to grade IV (coma). Precipitating factors "can be identified in nearly all bouts of episodic HE type C". After a first bout, the cumulative risk of another within a year is 40%, "despite lactulose treatment". [[Vilstrup2014HE]]`,
  pt:`The person may get muddled about the date, become very sleepy or act out of character, and in the most serious stage cannot be woken. New confusion or drowsiness needs urgent care. [[Vilstrup2014HE]]`,
  hook:`Grade II: disoriented for time + asterixis. Grade III: also for place, somnolent. Grade IV: coma. [[Vilstrup2014HE]]`},
 {from:.86,at:.95,k:'Step 6 · treatment',t:'Find the trigger, lower the ammonia',
  txt:`The guideline's four prongs: care for altered consciousness, look for other causes, find and correct precipitants, and start empirical HE treatment. "Lactulose is the first choice for treatment of episodic OHE"; rifaximin is an add-on to prevent recurrence. Here fewer molecules form and the grade eases. <span class="ev early">Early evidence</span> Lasting deficits after overt episodes are now being reported. [[Vilstrup2014HE,Rose2020]]`,
  pt:`Treating the trigger, together with medicines such as lactulose and rifaximin, lowers the ammonia. [[Vilstrup2014HE,Bass2010Rifaximin]]`,
  hook:`Lactulose first, titrated to 2–3 soft bowel movements a day; rifaximin added after a second episode. [[Vilstrup2014HE]]`}
];
const EN_WH=[
 {n:'Minimal',s:'Min.',g:'covert',d:'abnormal psychometric or neurophysiological tests "without clinical evidence of mental change"'},
 {n:'Grade I',s:'I',g:'covert',d:'"trivial lack of awareness", euphoria or anxiety, shortened attention span, impaired addition or subtraction, altered sleep rhythm; still oriented in time and space'},
 {n:'Grade II',s:'II',g:'overt',d:'lethargy or apathy, disorientation for time, obvious personality change, inappropriate behaviour, dyspraxia, asterixis'},
 {n:'Grade III',s:'III',g:'overt',d:'somnolence to semistupor, responsive to stimuli, confused, gross disorientation, bizarre behaviour'},
 {n:'Grade IV',s:'IV',g:'overt',d:'coma: "does not respond even to painful stimuli"'}];
const EN_TR=[
 {n:'Overt HE came back, median 14 months',a:46.8,b:19.6,arms:['Placebo','Lactulose'],cap:'Sharma 2009, open-label RCT in people who had recovered from HE: recurrence in 30/64 on placebo vs 12/61 on lactulose (P = .001); deaths 11 vs 5 (P = .18, not significant). Population statistics. [[Sharma2009Lactulose]]'},
 {n:'Breakthrough HE within 6 months',a:45.9,b:22.1,arms:['Placebo','Rifaximin'],cap:'Bass 2010: 299 people in remission from recurrent HE, rifaximin 550 mg twice daily vs placebo; HR 0.42 (95% CI 0.28–0.64). "More than 90%" were also taking lactulose. Population statistics. [[Bass2010Rifaximin]]'},
 {n:'HE-related hospital stay within 6 months',a:22.6,b:13.6,arms:['Placebo','Rifaximin'],cap:'Bass 2010: HR 0.50 (0.29–0.87). In the 24-month open-label extension (392 people) the HE hospitalisation rate was 0.21 per person-year, and infections, including C. difficile, did not rise. [[Bass2010Rifaximin,Mullen2014]]'}];
const EN_PC=[
 {n:'Infections',t:'Infection',x:`Infections head the guideline's list for episodic overt HE, and newer case series "confirm the dominant role of infections". Infection of ascitic fluid can be quiet, which is why a fluid sample is taken: see <a href="#ascites" data-go="ascites">Ascites, infection &amp; kidney injury</a>. [[Vilstrup2014HE,EASL2018Decomp]]`},
 {n:'GI bleeding',t:'Bleeding into the gut',x:`Gastrointestinal bleeding is second for episodic HE. After variceal bleeding, Baveno VII says rapid removal of blood from the gut with lactulose (oral or enemas) should be used to prevent HE. [[Vilstrup2014HE,deFranchis2022BavenoVII]]`},
 {n:'Constipation',t:'Constipation',x:`Constipation appears on both ranked lists. Lactulose is titrated to soft bowel movements, as published. [[Vilstrup2014HE]]`},
 {n:'Diuretic overdose',t:'Dehydration or too much diuretic',x:`"Diuretic overdose" is third for episodic HE. The guideline also warns that too much lactulose can cause dehydration, "and overuse can even precipitate HE". [[Vilstrup2014HE]]`},
 {n:'Electrolyte disorder',t:'Electrolyte problems',x:`Electrolyte disorder heads the list for recurrent HE. Low sodium (hyponatraemia) can cause encephalopathy on its own as well as precipitate HE. [[Vilstrup2014HE]]`},
 {n:null,t:'Sedating medicines',x:`Not in the guideline's frequency table, but linked to HE in cohorts: opioids (HE within a year in 3.3% with none, 5.0% with short-term and 6.3% with chronic prescriptions), benzodiazepines (long-acting agents, high doses, use beyond 2 months) and proton pump inhibitors (adjusted HR 1.36). Never stop a prescribed medicine without advice. [[Moon2020Opioids,Lee2014BZD,Dam2016PPI]]`}];
const EN_EP=['Infections','GI bleeding','Diuretic overdose','Electrolyte disorder','Constipation','Unidentified'],EN_RE=['Electrolyte disorder','Infections','Unidentified','Constipation','Diuretic overdose','GI bleeding'];
const enQ=(P,v)=>[(1-v)*(1-v)*P[0][0]+2*(1-v)*v*P[1][0]+v*v*P[2][0],(1-v)*(1-v)*P[0][1]+2*(1-v)*v*P[1][1]+v*v*P[2][1]];
const enQd=P=>`M${f1(P[0][0])} ${f1(P[0][1])}Q${f1(P[1][0])} ${f1(P[1][1])} ${f1(P[2][0])} ${f1(P[2][1])}`;
function enArms(svg,row,p){
  const N=vb(svg,'440 330','400 330'),s=N?13.5:15,gx=N?16.6:18,gy=N?17.4:19,xs=N?[16,212]:[20,236];let g='';
  [0,1].forEach(a=>{const v=a?row.b:row.a,k=Math.round(v*p),x=xs[a],col=a?'var(--rx)':'var(--bad)';
    g+=`<text x="${x}" y="20" class="t-lbl">${row.arms[a]}</text>`;
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);g+=person(x+c*gx+s*.3,34+r*gy,s,i<k?col:'var(--line)')}
    g+=`<text x="${x}" y="${34+10*gy+34}" class="t-big" style="font-size:28px;fill:${col}">${(v*p).toFixed(1)}%</text>`});
  g+=`<text x="${N?200:220}" y="${34+10*gy+60}" class="t-sm t-mid">${row.n}</text>`;
  svg.innerHTML=g}

inits.encephalopathy=()=>{
  const svg=$('#enSvg'),rg=$('#enT'),S=EN_STEPS;
  const lbl=(x,y,t,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round;${st}">${t}</text>`;
  const R=rng(17),DOT=[...Array(16)].map((_,i)=>({r:R(),o:i/16,j:R()*6.28,gx:R(),gy:R()}));
  const BAC=[...Array(12)].map(()=>[R(),R(),R()*180]);
  function lev(t){if(t<.5)return -1;if(t<.64)return lerp(0,1.6,ramp(t,.5,.62));if(t<.86)return lerp(1.6,4.6,ramp(t,.64,.82));return lerp(4.6,.6,ramp(t,.86,.97))}
  const LW={gut:[100,262],gw:[30,170,232,292],liver:[290,116,.82],kid:[398,236,.9],brain:[592,110,1],astro:[604,254,40],meter:[468,206,300],
    P1:[[150,236],[186,172],[238,140]],P2:[[356,96],[452,30],[534,92]],P4:[[302,150],[332,200],[384,226]],P3:[[162,232],[410,190],[540,140]],wh:[20,330,680],
    L:{gut:[30,216],pv:[170,180,'t-end'],liv:[290,68],up:[452,24],sh:[200,252],kid:[398,280]}};
  const LN={gut:[95,214],gw:[25,165,184,244],liver:[285,104,.72],kid:[268,220,.8],brain:[180,362,1],astro:[332,370,40],meter:[34,312,420],
    P1:[[136,190],[166,140],[226,118]],P2:[[344,92],[392,258],[250,318]],P4:[[282,140],[276,178],[270,196]],P3:[[96,252],[96,300],[140,326]],wh:[10,476,380],
    L:{gut:[25,172],pv:[150,140,'t-end'],liv:[285,60],up:[392,190,'t-end'],sh:[112,278],kid:[296,248]}};
  function gut(L,treat,t){const [x0,x1,y0,y1]=L.gw;let g='';const w=x1-x0,rows=[y0+12,y0+38];
    rows.forEach((y,k)=>{const d=`M${x0} ${y}q${f1(w/8)} ${k?18:-18} ${f1(w/4)} 0t${f1(w/4)} 0t${f1(w/4)} 0t${f1(w/4)} 0`;
      g+=`<path d="${d}" style="fill:none;stroke:var(--brain-line);stroke-width:19;stroke-linecap:round;opacity:.55"/><path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:15;stroke-linecap:round"/>`});
    const nb=Math.round(12*(1-.6*treat));
    BAC.slice(0,nb).forEach(([a,b,ang],i)=>{const x=x0+8+a*(w-16),y=rows[i%2]+(b-.5)*6+Math.sin(t*40+i)*1.2;g+=`<rect x="${f1(x-4)}" y="${f1(y-1.4)}" width="8" height="2.8" rx="1.4" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:var(--stellate)"/>`});
    return g}
  function astro(c,sw,t){const [x,y,r]=c,id='enAstroClip';let g=`<clipPath id="${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath><circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--brain);stroke:var(--nh3);stroke-width:1.5"/><g clip-path="url(#${id})">`;
    const br=r*(.2+.2*sw);
    for(let k=0;k<7;k++){const a=k/7*6.283+.3,l=r*.85;g+=`<path d="M${f1(x)} ${f1(y)}Q${f1(x+Math.cos(a+.25)*l*.55)} ${f1(y+Math.sin(a+.25)*l*.55)} ${f1(x+Math.cos(a)*l)} ${f1(y+Math.sin(a)*l)}" style="fill:none;stroke:var(--nh3);stroke-width:${f1(2.2+sw*1.2)};stroke-linecap:round;opacity:.75"/>`}
    g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(br)}" style="fill:var(--nh3-soft);stroke:var(--nh3);stroke-width:1.4"/>`;
    for(let k=0;k<Math.round(sw*7);k++){const a=k*.9,d=br*.55;g+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="1.8" style="fill:var(--nh3-fill)"/>`}
    if(sw>.15)for(let k=0;k<4;k++){const a=k/4*6.283+.8,u=(t*8+k/4)%1,d=lerp(r*.95,br+3,u),px=x+Math.cos(a)*d,py=y+Math.sin(a)*d;g+=`<path d="M${f1(px)} ${f1(py-3.5)}q3 3.5 0 6q-3 -2.5 0 -6Z" style="fill:var(--fluid-fill);opacity:${f1(sw)}"/>`}
    return g+'</g>'+lbl(x,y+r+12,sw>.15?'astrocyte swelling':'astrocyte','t-xs t-mid')}
  function draw(t){
    const N=vb(svg,'720 380','400 536'),L=N?LN:LW,p=phaseOf(S,t),lv=lev(t),fog=lv<0?0:clamp((lv+.4)/5),treat=ramp(t,.86,.95);
    const fib=4*ramp(t,.34,.46),shunt=ramp(t,.36,.46),byp=.75*ramp(t,.36,.48),prod=ramp(t,0,.12)*(1-.55*treat);
    let s='';
    /* vessels */
    s+=`<path d="${enQd(L.P1)}" style="fill:none;stroke:var(--portal);stroke-width:7;stroke-linecap:round;opacity:.8"/>`;
    s+=`<path d="${enQd(L.P2)}" style="fill:none;stroke:var(--artery);stroke-width:5;stroke-linecap:round;opacity:${f1(.25+.6*ramp(t,.36,.46))}"/>`;
    s+=`<path d="${enQd(L.P4)}" style="fill:none;stroke:var(--good);stroke-width:3;stroke-dasharray:4 4;opacity:${f1(.8-.5*byp)}"/>`;
    if(shunt>0)s+=`<path d="${enQd(L.P3)}" style="fill:none;stroke:var(--portal);stroke-width:5;stroke-dasharray:7 4;stroke-linecap:round;opacity:${f1(shunt*.85)}"/>`;
    /* organs */
    s+=gut(L,treat,t);
    s+=liver(L.liver[0],L.liver[1],L.liver[2],{fib,gb:false,seed:11}).svg;
    s+=kidney(L.kid[0],L.kid[1],L.kid[2],{});
    s+=brain(L.brain[0],L.brain[1],L.brain[2],{fog,seed:5}).svg;
    const sw=lv<0?ramp(t,.44,.5)*.12:clamp((lv+.6)/5.2);
    s+=astro(L.astro,sw,t);
    /* ammonia and urea */
    const nA=Math.round(16*prod);
    DOT.slice(0,nA).forEach((d,i)=>{
      if(t<.15){const [x0,x1,y0,y1]=L.gw,x=x0+10+d.gx*(x1-x0-20),y=y0+8+d.gy*(y1-y0-16)-((t*30+d.o)%1)*8;s+=nh3(x,y,{r:4});return}
      const ph=(t*9+d.o)%1;let pt,urea=false;
      if(d.r<byp*.45)pt=enQ(L.P3,ph);
      else if(d.r<byp)pt=ph<.5?enQ(L.P1,ph*2):enQ(L.P2,(ph-.5)*2);
      else if(ph<.5)pt=enQ(L.P1,ph*2);else{pt=enQ(L.P4,(ph-.5)*2);urea=true}
      s+=urea?`<circle cx="${f1(pt[0])}" cy="${f1(pt[1])}" r="3.2" style="fill:var(--good);stroke:var(--panel);stroke-width:1"/>`:nh3(pt[0],pt[1],{r:4})});
    /* labels */
    const LL=L.L;s+=lbl(LL.gut[0],LL.gut[1],t<.5||treat>0?'gut bacteria':'gut','t-xs','fill:var(--stellate);font-weight:700')+lbl(LL.pv[0],LL.pv[1],'portal vein','t-xs '+(LL.pv[2]||''));
    s+=lbl(LL.liv[0],LL.liv[1],fib>2?'scarred liver':'liver','t-xs t-mid')+lbl(LL.kid[0],LL.kid[1],'urea','t-xs t-mid','fill:var(--good)');
    if(t>.34)s+=lbl(LL.up[0],LL.up[1],'to the brain','t-xs '+(LL.up[2]||'t-mid'),'fill:var(--artery)');
    if(shunt>.3)s+=lbl(LL.sh[0],LL.sh[1],'bypass vein (shunt)','t-xs','fill:var(--portal)');
    s+=lbl(L.brain[0],L.brain[1]-66,'brain','t-xs t-mid');
    /* blood ammonia meter */
    const [mx,m0,m1]=L.meter,lvl=clamp(.16+.72*(byp/.75)*(1-.55*treat)),H=m1-m0;
    s+=lbl(mx+7,m0-8,'blood NH₃','t-xs t-mid','font-weight:700;fill:var(--ink)');
    s+=`<rect x="${mx}" y="${m0}" width="14" height="${H}" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${mx}" y="${f1(m1-H*lvl)}" width="14" height="${f1(H*lvl)}" rx="7" style="fill:var(--nh3-fill)"/>`;
    s+=`<line x1="${mx-3}" x2="${mx+17}" y1="${f1(m1-H*.16)}" y2="${f1(m1-H*.16)}" style="stroke:var(--good);stroke-width:2"/>`+lbl(mx+21,m1-H*.16+3,'35–50 µM','t-xs','fill:var(--good)');
    /* West Haven bar */
    const [wx,wy,ww]=L.wh,sg=ww/5,cur=lv<0?-1:Math.min(4,Math.floor(lv));
    s+=lbl(wx,wy-14,'COVERT','t-xs','font-weight:700;fill:var(--nh3)')+lbl(wx+sg*2,wy-14,'OVERT','t-xs','font-weight:700;fill:var(--bad)');
    s+=`<path d="M${wx} ${wy-8}V${wy-4}H${f1(wx+sg*2-4)}V${wy-8}M${f1(wx+sg*2)} ${wy-8}V${wy-4}H${f1(wx+ww)}V${wy-8}" style="fill:none;stroke:var(--muted);stroke-width:1"/>`;
    EN_WH.forEach((w,i)=>{const on=i===cur,x=wx+i*sg;s+=`<rect x="${f1(x+1)}" y="${wy}" width="${f1(sg-2)}" height="24" rx="5" style="fill:${on?(i<2?'var(--nh3)':'var(--bad)'):i<2?'var(--nh3-soft)':'var(--bad-soft)'};stroke:${i<2?'var(--nh3)':'var(--bad)'};stroke-width:${on?1.6:.6}"/><text x="${f1(x+sg/2)}" y="${wy+16}" class="t-xs t-mid" style="font-weight:700;fill:${on?'var(--panel)':'var(--ink)'}">${N?w.s:w.n}</text>`});
    if(lv>=0){const mxp=wx+clamp(lv/5)*ww;s+=`<path d="M${f1(mxp-6)} ${wy+36}L${f1(mxp+6)} ${wy+36}L${f1(mxp)} ${wy+27}Z" style="fill:var(--ink)"/>`}
    s+=lbl(wx+ww,wy+46,lv<0?'no HE yet':'West Haven grade (marker schematic)','t-xs t-end');
    svg.innerHTML=s;setSt(p);
    const nhw=t<.17?'made in the gut':t<.34?'low (cleared by the liver)':treat>.3?'falling':byp>.4?'high':'rising';
    $('#enRead').innerHTML=`<span>step <b>${p+1}/6</b></span><span>blood ammonia <b>${nhw}</b></span><span>West Haven <b>${cur<0?'no HE':EN_WH[cur].n+' ('+EN_WH[cur].g+')'}</b></span>`;
    $('#enNote').innerHTML=noteHTML(S[p])+(cur>=0?`<div class="kv"><div><dt>${EN_WH[cur].n} · ${EN_WH[cur].g}, as published</dt><dd>${EN_WH[cur].d}. [[Vilstrup2014HE]]</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#enPlay'),draw,28000,'%t:player.replay%','encephalopathy');
  const setSt=stepWire($('#enSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- lactulose and rifaximin toggles ---- */
  const ms=$('#enMech'),mt=$('#enMt'),bl=$('#enLac'),br=$('#enRif'),RM2=rng(5);
  const MB=[...Array(18)].map(()=>[RM2(),RM2(),RM2()*180]),MN=[...Array(14)].map((_,i)=>({o:i/14,r:RM2(),b:i}));
  function drawMech(t){const N=vb(ms,'440 300','400 300'),W=N?380:420,lac=bl.getAttribute('aria-pressed')==='true',rif=br.getAttribute('aria-pressed')==='true';
    const sp=lac?2.4:1,cross=lac?.35:.7,nb=rif?6:18,nn=rif?6:14,x0=20,top=78,bot=196;let g='';
    g+=`<rect x="${x0}" y="28" width="${W-x0}" height="28" rx="8" style="fill:var(--portal-soft);stroke:var(--portal)"/>`+lbl(x0+6,46,'portal blood → liver','t-xs','fill:var(--portal);font-weight:700');
    g+=`<rect x="${x0}" y="${top-6}" width="${W-x0}" height="${bot-top+12}" rx="14" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.4"/>`;
    g+=`<line x1="${x0+10}" x2="${W-10}" y1="${top-6}" y2="${top-6}" style="stroke:var(--brain-line);stroke-width:3;stroke-dasharray:6 5"/>`+lbl(x0+8,top+10,'bowel wall','t-xs');
    for(let k=0;k<5;k++){const y=top+22+k*22,x=x0+((t*120*sp+k*70)%(W-x0-30))+10;g+=`<path d="M${f1(x)} ${y}h16l-4 -3m4 3l-4 3" style="fill:none;stroke:var(--muted);stroke-width:1;opacity:.5"/>`}
    MB.slice(0,nb).forEach(([a,b,ang],i)=>{const x=x0+14+((a*(W-x0-28)+t*60*sp)%(W-x0-28)),y=top+18+b*(bot-top-26);g+=`<rect x="${f1(x-6)}" y="${f1(y-2)}" width="12" height="4" rx="2" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:var(--stellate)"/>`});
    let up=0;
    MN.slice(0,nn).forEach((d,i)=>{const bb=MB[d.b%nb],ph=(t*5+d.o)%1,bx=x0+14+((bb[0]*(W-x0-28)+t*60*sp)%(W-x0-28)),by=top+18+bb[1]*(bot-top-26);
      if(d.r<cross){up++;const y=ph<.6?lerp(by,top-6,ph/.6):42,x=ph<.6?bx:bx+(ph-.6)*180;if(x<W-8)g+=nh3(x,y,{r:4.4})}
      else{const x=bx+ph*200*sp;if(x<W-8)g+=nh3(x,by,{r:4.4})}});
    g+=lbl(W,bot+22,'out with the stool →','t-xs t-end','font-weight:700');
    const reach=(rif?.45:1)*(lac?.5:1);
    g+=lbl(x0,236,'ammonia reaching the blood (schematic)','t-xs','font-weight:700;fill:var(--ink)');
    g+=`<rect x="${x0}" y="244" width="${W-x0}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="244" width="${f1((W-x0)*reach)}" height="12" rx="6" style="fill:var(--nh3-fill)"/>`;
    g+=lbl(x0,278,lac&&rif?'both on: more out in the stool, fewer bacteria':lac?'lactulose: contents move out faster':rif?'rifaximin: fewer bacteria in the gut':'no treatment: bacteria make ammonia; much crosses the wall','t-xs');
    ms.innerHTML=g;
    $('#enMechNote').innerHTML=`<div class="expl">${lac||rif?'':'Press <b>Lactulose</b> or <b>Rifaximin</b> to see what each changes. '}${lac?'<b>Lactulose</b> is a syrup that helps the bowel move ammonia out; the usual aim, as published, is 2 to 3 soft bowel movements a day. The US label reports blood ammonia lowered "by 25 to 50%" and a clinical response in "about 75% of patients". [[Vilstrup2014HE,FDA-Enulose]] ':''}${rif?'<b>Rifaximin</b> is an antibiotic tablet that acts mostly in the gut, where bacterial urease is one source of ammonia; in one trial it halved repeat episodes when added to lactulose. [[Bass2010Rifaximin,Rose2020]]':''} The bars and molecule counts are schematic.</div>`}
  playWire(mt,$('#enMPlay'),drawMech,14000,'%t:player.replay%','encephalopathy');
  [bl,br].forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');drawMech(+mt.value)}));
  drawMech(+mt.value);

  /* ---- trial arrays ---- */
  const ts=$('#enTrialSvg');let tc=0,tstop=null;
  const tcap=()=>{$('#enTrialCap').innerHTML=EN_TR[tc].cap};
  $$('#m-encephalopathy [data-tr]').forEach(b=>b.addEventListener('click',()=>{tc=+b.dataset.tr;$$('#m-encephalopathy [data-tr]').forEach(o=>o.setAttribute('aria-pressed',o===b));tcap();tstop&&tstop();tstop=animate(700,p=>enArms(ts,EN_TR[tc],ease(p)))}));
  enArms(ts,EN_TR[0],1);tcap();

  /* ---- precipitants ---- */
  const pcs=$('#enPcSvg'),boxes=$$('#m-encephalopathy [data-pc]');
  function drawPc(){const N=vb(pcs,'440 250','400 250'),on=boxes.filter(b=>b.checked).map(b=>+b.dataset.pc),hit=new Set(on.map(i=>EN_PC[i].n).filter(Boolean));
    const xl=N?14:20,xr=N?250:286,y0=50,dy=28;let g=lbl(xl,20,'EPISODIC OVERT HE','t-xs','font-weight:700;fill:var(--ink)')+lbl(xr,20,'RECURRENT HE','t-xs','font-weight:700;fill:var(--ink)')+lbl(xl,34,'most frequent first','t-xs')+lbl(xr,34,'most frequent first','t-xs');
    EN_EP.forEach((n,i)=>{const j=EN_RE.indexOf(n),h=hit.has(n);g+=`<path d="M${xl+(N?124:136)} ${y0+i*dy-3}C${(xl+xr)/2+30} ${y0+i*dy-3} ${(xl+xr)/2-10} ${y0+j*dy-3} ${xr-6} ${y0+j*dy-3}" style="fill:none;stroke:${h?'var(--accent)':'var(--line)'};stroke-width:${h?2.4:1.2}"/>`});
    const item=(x,y,i,n)=>{const h=hit.has(n);return `<text x="${x}" y="${y}" class="t-xs" style="${h?'fill:var(--accent);font-weight:700':'fill:var(--ink)'}">${i+1}. ${n}</text>`};
    EN_EP.forEach((n,i)=>g+=item(xl,y0+i*dy,i,n));EN_RE.forEach((n,i)=>g+=item(xr,y0+i*dy,i,n));
    g+=lbl(xl,y0+6*dy+4,on.includes(5)?'Sedating medicines: linked to HE in separate cohorts':'AASLD/EASL 2014, Table 3 (order only)','t-xs',on.includes(5)?'fill:var(--accent)':'');
    pcs.innerHTML=g;
    $('#enPcOut').innerHTML=`<div class="kicker">What the sources say</div>`+(on.length?on.map(i=>`<div class="expl"><b>${EN_PC[i].t}.</b> ${EN_PC[i].x}</div>`).join(''):`<p>Tick a possible trigger to read what the guideline and studies say about it.</p>`)+`<div class="hook"><b>%t:note.hook%</b>Episodic overt HE: infections, then GI bleeding, then diuretic overdose. Recurrent HE: electrolyte disorder first. [[Vilstrup2014HE]]</div>`}
  boxes.forEach(b=>b.addEventListener('change',drawPc));drawPc();

  /* ---- animal naming test ---- */
  const an=$('#enAnt'),asv=$('#enAntSvg'),go=$('#enAntGo'),tap=$('#enAntTap');let tm=null,t0=0,cnt=0;
  const score=n=>n>=15?0:n>=10?1:2;
  function drawAnt(){const N=vb(asv,'440 210','400 210'),n=+an.value,sc=score(n),x0=20,x1=N?380:420,X=v=>lerp(x0,x1,v/30),y=118,cols=['var(--good)','var(--warn)','var(--bad)'];
    let g=`<text x="${x0}" y="34" class="t-big" style="font-size:24px">${n} animal${n===1?'':'s'}</text><text x="${x0}" y="56" class="t-lbl" style="fill:${cols[sc]}">3-level score: ${sc} point${sc===1?'':'s'}</text>`;
    if(tm){const left=Math.max(0,60-Math.floor((Date.now()-t0)/1000));g+=`<text x="${x1}" y="34" class="t-big t-end" style="font-size:24px;fill:var(--accent)">${left} s</text><text x="${x1}" y="56" class="t-xs t-end">say animals aloud, tap +1</text>`}
    [[0,10,2,'bad'],[10,15,1,'warn'],[15,30,0,'good']].forEach(([a,b,p,c])=>{g+=`<rect x="${f1(X(a))}" y="${y-12}" width="${f1(X(b)-X(a))}" height="24" style="fill:var(--${c}-soft);stroke:var(--${c});stroke-width:${p===sc?1.6:.5}"/><text x="${f1((X(a)+X(b))/2)}" y="${y+4}" class="t-xs t-mid" style="fill:var(--${c});font-weight:700">${p} point${p===1?'':'s'}</text>`});
    [0,10,15,20,25,30].forEach(v=>g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y+12}" y2="${y+17}" class="axis"/><text x="${f1(X(v))}" y="${y+29}" class="t-xs t-mid">${v}</text>`);
    g+=`<path d="M${f1(X(n)-7)} ${y-26}L${f1(X(n)+7)} ${y-26}L${f1(X(n))} ${y-14}Z" style="fill:var(--ink)"/>`;
    g+=`<text x="${x0}" y="${y+56}" class="t-xs">fewer than 10 · 10 to 14 · 15 or more animals in 1 minute</text><text x="${x0}" y="${y+70}" class="t-xs">raw count only; the published S-ANT1 adjusts for age and education</text>`;
    asv.innerHTML=g;
    $('#enAntNote').innerHTML=`<div class="kicker">Campagna 2017 · 327 people with cirrhosis plus controls</div><h4>${sc===0?'15 or more: the unimpaired range':sc===1?'10 to 14: borderline':'Fewer than 10: abnormal'}</h4><p>The test is simple: name as many animals as you can in one minute. In the study, a simplified score (S-ANT1), adjusted for age and education, of fewer than 10 animals was abnormal; 15 best separated unimpaired people from those with minimal or grade 1 HE. The three-level score (0 for ≥15, 1 for 10–14, 2 for under 10) predicted the 1-year risk of overt HE and death. [[Campagna2017ANT]]</p><div class="pt"><b>%t:note.plain%</b>A quick word game can hint at slowed thinking that people do not notice in themselves. Only a clinician can say what a result means. [[Campagna2017ANT,Vilstrup2014HE]]</div><div class="hook"><b>%t:note.hook%</b>Animal naming test: &lt;10 animals in 1 minute abnormal; ≥15 unimpaired. The PHES is the paper-and-pencil battery. [[Campagna2017ANT,Vilstrup2014HE]]</div>`}
  function stopT(){if(tm){clearInterval(tm);tm=null}go.textContent='Try it: start 60 seconds';tap.disabled=true;drawAnt()}
  go.addEventListener('click',()=>{if(tm){stopT();return}cnt=0;an.value=0;t0=Date.now();tap.disabled=false;go.textContent='Stop';tm=setInterval(()=>{if(Date.now()-t0>=60000)stopT();else drawAnt()},250);drawAnt()});
  tap.addEventListener('click',()=>{if(!tm)return;cnt=Math.min(30,cnt+1);an.value=cnt;drawAnt()});
  an.addEventListener('input',drawAnt);drawAnt();
  {const prev=onHide.encephalopathy;onHide.encephalopathy=()=>{prev&&prev();stopT()}}
  redraws.encephalopathy=(f=>()=>{f&&f();enArms(ts,EN_TR[tc],1);drawPc();drawAnt()})(redraws.encephalopathy);
};
