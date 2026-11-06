/* =============== 3.2 The sweat test & genetic testing =============== */
/* Main scrubber: pilocarpine iontophoresis on the forearm, the sweat gland at work (the kit's sweatGland),
   collection in a coil against the published minimum, chloride measured, and the result read against the
   2017 bands. Three scenarios (aria-pressed): without CF, with CF (needle at PROMISE's mean pre-treatment
   value, 88.0 mmol/L, in people aged 12 and over), and not enough sweat (QNS). No other chloride value is
   drawn as a number: "without CF" is shown only as falling in the <30 band. */
const ST_BANDS17=[{lo:0,hi:30,lab:'<30 CF unlikely',col:'var(--good)'},{lo:30,hi:60,lab:'30–59 intermediate',col:'var(--warn)'},{lo:60,hi:120,lab:'≥60 diagnostic of CF',col:'var(--bad)'}];
const ST_STEPS=[
 {from:0,at:.08,k:'Step 1 · stimulate',t:'Pilocarpine iontophoresis',sub:'a tiny current carries the drug into the skin',short:'Stimulate',
  txt:`In 1953 di Sant'Agnese and colleagues reported abnormal sweat electrolytes in CF. In 1959 Gibson and Cooke standardised the test: pilocarpine, a drug that makes sweat glands work, is carried into the skin of the forearm by iontophoresis, a small electric current between two electrodes. [[DiSantAgnese1953,Gibson1959]] For an asymptomatic screen-positive newborn the 2008 CF Foundation guideline recommends testing at ≥2 weeks of age, weight &gt;2 kg and &gt;36 weeks gestation at birth, ideally on both arms. [[Farrell2008Dx]]`,
  pt:`The sweat test is painless. A small electric current carries a medicine into the skin of the arm to make it sweat. [[Gibson1959,Farrell2008Dx]]`,
  hook:`Gibson–Cooke (1959): pilocarpine iontophoresis, then sweat electrolytes measured. [[Gibson1959]]`},
 {from:.2,at:.3,k:'Step 2 · the gland',t:'Sweat is made, then salt is taken back',sub:'in CF the salt stays in the sweat',short:'Gland',
  txt:`The coiled gland deep in the skin makes sweat, which flows up a duct to the surface. The duct normally takes salt back on the way, so sweat that reaches the skin is dilute. In CF the sweat that reaches the skin carries much more salt, which is why sweat chloride is the test of CFTR function: the 2017 CF Foundation guideline recommends that CF be diagnosed at all ages by testing CFTR function with a sweat chloride test. [[DiSantAgnese1953,Farrell2017Dx]] Use the buttons to compare a gland with and without CF.`,
  pt:`Everyone's sweat is a little salty. In CF the sweat glands cannot pull the salt back in, so the sweat is much saltier.`,
  hook:`The sweat test measures CFTR function, not genes: the 2017 guideline recommends it at all ages. [[Farrell2017Dx]]`},
 {from:.4,at:.52,k:'Step 3 · collect',t:'Enough sweat, from one site',sub:'a coil or gauze, against a published minimum',short:'Collect',
  txt:`Adequate sweat, as the 2008 guideline states, is "at least 75 mg of sweat obtained by the Gibson-Cooke method or at least 15 μL obtained by the Macroduct coil collection method". Samples from two sites must never be pooled. Laboratories should keep the "quantity not sufficient" (QNS) rate below 5% for infants over 3 months. [[Farrell2008Dx]] In a US survey of infants ≤3 months old after a positive screen, the mean QNS rate was 7.2% (±7.6), from 0% to 40% across centres. QNS is more common in infants younger than 10 days and in premature or low-birthweight infants. [[LeGrys2010,DeCelieGermana2023]]`,
  pt:`Sometimes not enough sweat is collected, especially in very young or small babies, and the test has to be repeated. [[LeGrys2010]]`,
  hook:`Minimum sweat: ≥75 mg (Gibson–Cooke) or ≥15 µL (Macroduct). Never pool two sites. [[Farrell2008Dx]]`},
 {from:.6,at:.7,k:'Step 4 · measure',t:'Chloride, and only chloride',sub:'conductivity is a screening test, not a diagnosis',short:'Measure',
  txt:`Sweat chloride is "the only analyte on which a diagnosis of CF should be based", and sweat conductivity or osmolality "should not be used for diagnosing CF at the present time"; the method must detect chloride accurately down to 10 mmol/L without added chloride. [[Farrell2008Dx]] Conductivity tracks chloride (r=0.97 in 534 infants), but at a &gt;50 mmol/L cutoff its false-positive rate was 16.7%. [[Domingos2015]] An Australasian survey found wide variation in conductivity cutoffs and actions between laboratories. [[Greaves2018]]`,
  pt:`The lab measures how much chloride, the "chloride" half of salt, is in the sweat.`,
  hook:`Diagnose on sweat chloride, never on conductivity. [[Farrell2008Dx]]`},
 {from:.78,at:.9,k:'Step 5 · read the result',t:'Three bands',sub:'≥60 · 30–59 · <30 mmol/L (2017)',short:'Result',
  txt:`Under the 2017 guideline, at all ages including infants: ≥60 mmol/L is diagnostic of CF, 30–59 mmol/L is intermediate and &lt;30 mmol/L is negative (CF unlikely). [[Farrell2017Dx,DeCelieGermana2023]] Because registries follow many people with confirmed CF whose sweat chloride is 30–40 mmol/L, the update lowered the bottom of the intermediate band from 40 to 30. Intermediate values on two separate occasions mean further CFTR testing. [[Sosnay2017Nonscreened,Farrell2008Dx]] In PROMISE, the mean sweat chloride of 487 people aged 12 and over starting ETI was 88.0 mmol/L. [[Nichols2022PROMISE]]`,
  pt:`A high result means CF is confirmed. A middle result means more tests. A low result means CF is unlikely.`,
  hook:`≥60 diagnostic; 30–59 intermediate; <30 unlikely, at all ages (2017). The bottom of the intermediate band fell from 40 to 30. [[Farrell2017Dx,Sosnay2017Nonscreened]]`}
];
inits.sweattest=()=>{
  const svg=$('#stSvg'),rg=$('#stT'),note=$('#stNote'),rd=$('#stRead');
  let mode='nocf',setSt=()=>{};
  const MODES={nocf:{lab:'without CF',cf:0,fill:1,val:null},cf:{lab:'with CF',cf:1,fill:1,val:88},qns:{lab:'not enough sweat',cf:0,fill:.46,val:null}};
  function spiral(cx,cy,r,turns=3.2){let d='';const N=90;for(let i=0;i<=N;i++){const u=i/N,a=u*turns*2*Math.PI,rr=r*(.18+.82*u);d+=(i?'L':'M')+f1(cx+rr*Math.cos(a))+' '+f1(cy+rr*Math.sin(a))}return d}
  function bandScale(x,y,w,val,show,N){/* horizontal 0–120 scale with the 2017 bands; needle at val (null: none) */
    const X=v=>x+w*v/120;let s='';
    ST_BANDS17.forEach(b=>{s+=`<rect x="${f1(X(b.lo))}" y="${y}" width="${f1(X(b.hi)-X(b.lo))}" height="18" style="fill:${b.col};opacity:.28"/><text x="${f1((X(b.lo)+X(b.hi))/2)}" y="${y+13}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${N&&b.lo===60?'≥60 CF':N&&b.lo===30?'30–59':N?'<30':b.lab}</text>`});
    [0,30,60,90,120].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${y+32}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${x+w}" y="${y+46}" class="t-xs t-end">sweat chloride, mmol/L</text>`;
    if(show>0&&val!=null){const xv=X(val*ease(show));s+=`<line x1="${f1(xv)}" x2="${f1(xv)}" y1="${y-10}" y2="${y+22}" style="stroke:var(--ink);stroke-width:3"/><path d="M${f1(xv-6)} ${y-16}h12l-6 8z" style="fill:var(--ink)"/>`}
    return s}
  function draw(t){const N=vb(svg,'720 410','400 590'),p=phaseOf(ST_STEPS,t),S=ST_STEPS[p],M=MODES[mode];
    const L=N?{arm:{x:16,y:56,w:368,h:170},gl:{x:16,y:236,w:176,h:196},me:{x:200,y:236,w:184,h:196},sc:{x:30,y:478,w:340},sy:572}
             :{arm:{x:16,y:56,w:340,h:200},gl:{x:368,y:56,w:170,h:200},me:{x:550,y:56,w:154,h:200},sc:{x:40,y:300,w:640},sy:390};
    let s=`<text x="16" y="26" class="t-big" style="fill:var(--dx)">${S.t}</text><text x="16" y="42" class="t-sm">${S.sub}</text>`;
    [L.arm,L.gl,L.me].forEach(B=>{s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`});
    /* ---- the forearm ---- */
    const A=L.arm,ax=A.x+16,aw=A.w-32,ay=A.y+A.h*.5,ah=50;
    s+=`<rect x="${ax}" y="${ay}" width="${aw}" height="${ah}" rx="25" style="fill:var(--skin);stroke:var(--muted);stroke-width:1"/><text x="${ax+aw-10}" y="${ay+ah+16}" class="t-xs t-end">forearm</text>`;
    const e1=ax+aw*.3,e2=ax+aw*.72,ey=ay-2;
    const u0=ramp(t,0,.18),eo=1-ramp(t,.3,.4);
    if(eo>0){/* electrodes and current */
      s+=`<g style="opacity:${f1(eo)}"><rect x="${f1(e1-44)}" y="${ey-16}" width="88" height="16" rx="4" style="fill:var(--dx)"/><text x="${f1(e1)}" y="${ey-5}" class="t-xs t-mid" style="fill:var(--on-brand);font-weight:700">+ pilocarpine</text>`;
      s+=`<rect x="${f1(e2-20)}" y="${ey-16}" width="40" height="16" rx="4" style="fill:var(--muted)"/><text x="${f1(e2)}" y="${ey-5}" class="t-xs t-mid" style="fill:var(--on-brand);font-weight:700">−</text>`;
      s+=`<path d="M${f1(e1)} ${ey-16}C${f1(e1)} ${ey-56} ${f1(e2)} ${ey-56} ${f1(e2)} ${ey-16}" style="fill:none;stroke:var(--dx);stroke-width:1.6;stroke-dasharray:5 5;stroke-dashoffset:${f1(-t*400)}"/><text x="${f1((e1+e2)/2)}" y="${ey-48}" class="t-xs t-mid">small current</text>`;
      for(let i=0;i<6;i++){const u=((t*5+i/6)%1);s+=`<circle cx="${f1(e1-18+i*7)}" cy="${f1(ey+2+u*30*u0)}" r="2.2" style="fill:var(--rx);opacity:${f1(u0*(1-u))}"/>`}
      s+='</g>'}
    const glow=ramp(t,.15,.3);if(glow>0)s+=`<ellipse cx="${f1(e1)}" cy="${ay+ah*.45}" rx="${f1(26*glow)}" ry="12" style="fill:var(--airway);opacity:${f1(.5*glow)}"/>`;
    /* collection coil */
    const co=ramp(t,.36,.44),coll=ease(ramp(t,.42,.6))*M.fill;
    if(co>0&&t<.7){const cx=e1,cy=ay+ah*.45,r=24;
      s+=`<g style="opacity:${f1(co*(1-ramp(t,.62,.7)))}"><circle cx="${f1(cx)}" cy="${cy}" r="${r+4}" style="fill:var(--panel);stroke:var(--muted)"/><path d="${spiral(cx,cy,r)}" style="fill:none;stroke:var(--line);stroke-width:3"/><path d="${spiral(cx,cy,r)}" pathLength="100" style="fill:none;stroke:var(--water);stroke-width:3;stroke-dasharray:${f1(coll*100)} 100"/></g>`;
      s+=`<text x="${f1(cx+r+10)}" y="${ay-8}" class="t-xs" style="opacity:${f1(co)}">collection coil</text>`}
    const CAP=['electrodes on the forearm','the skin under the + electrode sweats','a coil collects the sweat'];if(p<3)s+=`<text x="${A.x+16}" y="${A.y+22}" class="t-sm" style="fill:var(--ink)">${CAP[p]}</text>`;
    /* the sample travels to the analyser */
    if(t>=.58){const mv=ease(ramp(t,.6,.7)),vx=lerp(e1,ax+aw-34,mv),vy=lerp(ay+10,A.y+34,mv);
      s+=`<rect x="${f1(ax+aw-70)}" y="${A.y+14}" width="72" height="40" rx="6" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${f1(ax+aw-34)}" y="${A.y+30}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">chloride</text><text x="${f1(ax+aw-34)}" y="${A.y+44}" class="t-xs t-mid" style="fill:var(--dx)">analyser</text>`;
      if(mv<1)s+=`<rect x="${f1(vx-5)}" y="${f1(vy-10)}" width="10" height="20" rx="3" style="fill:var(--water);stroke:var(--muted)"/>`;
      if(t>.7)s+=`<text x="${A.x+16}" y="${A.y+30}" class="t-sm" style="fill:var(--ink)">${mode==='qns'?'no result: QNS':'one site, not pooled'}</text>`}
    /* ---- the gland, inside the skin ---- */
    const G=L.gl,gs=N?.84:.9,gx=G.x+G.w/2-6,gy=G.y+28;
    const sg=sweatGland(gx,gy,gs,{cf:M.cf,ph:t*7*(t>.18?1:.2),salt:M.cf*ramp(t,.25,.38),labels:true});
    s+=sg.svg+`<text x="${G.x+12}" y="${G.y+18}" class="t-xs" style="fill:var(--ink);font-weight:600">inside the skin · ${M.lab}</text>`;
    /* ---- the volume meter ---- */
    const E=L.me,mx=E.x+24,mw=34,my=E.y+34,mh=E.h-60,thr=.62;
    s+=`<text x="${E.x+12}" y="${E.y+18}" class="t-xs" style="fill:var(--ink);font-weight:600">sweat collected</text>`;
    s+=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="8" style="fill:var(--panel-2)"/><rect x="${mx}" y="${f1(my+mh*(1-coll*.9))}" width="${mw}" height="${f1(mh*coll*.9)}" rx="8" style="fill:var(--water)"/>`;
    const ty=my+mh*(1-thr);s+=`<line x1="${mx-6}" x2="${mx+mw+6}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:4 3"/><text x="${mx+mw+10}" y="${f1(ty-4)}" class="t-xs" style="fill:var(--ink);font-weight:600">minimum</text><text x="${mx+mw+10}" y="${f1(ty+8)}" class="t-xs">≥15 µL coil</text><text x="${mx+mw+10}" y="${f1(ty+20)}" class="t-xs">≥75 mg gauze</text>`;
    const ok=coll*.9>=thr-.001;if(t>.5)s+=`<text x="${E.x+12}" y="${E.y+E.h-10}" class="t-sm" style="fill:${ok?'var(--good)':'var(--bad)'};font-weight:700">${ok?'enough sweat':'QNS: repeat test'}</text>`;
    /* ---- the result scale ---- */
    const C=L.sc,show=ramp(t,.8,.9);
    s+=`<text x="${C.x}" y="${C.y-24}" class="t-lbl">${N?'Result (2017 bands)':'Result, read against the 2017 bands (all ages)'}</text>`;
    s+=bandScale(C.x,C.y,C.w,M.val,show,N);
    if(show>.5){const msg=mode==='cf'?'needle: PROMISE mean before ETI, 88.0 mmol/L':mode==='nocf'?'without CF: a value in the <30 band':'QNS: no result, the test is repeated';
      if(mode==='nocf'){const X=v=>C.x+C.w*v/120;s+=`<rect x="${f1(X(0))}" y="${C.y-3}" width="${f1(X(30)-X(0))}" height="24" rx="4" style="fill:none;stroke:var(--good);stroke-width:2.4"/>`}
      s+=`<text x="${N?C.x:C.x+C.w}" y="${C.y+(N?64:-8)}" class="t-xs${N?'':' t-end'}" style="fill:var(--ink)">${msg}</text>`}
    /* strip */
    const SW=N?368:688,sw=SW/5;ST_STEPS.forEach((q,j)=>{const on=j===p,xx=16+j*sw;s+=`<rect x="${f1(xx+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--dx)':'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.sy-6}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.short}</text>`});
    s+=`<circle cx="${f1(16+SW*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Scenario <b>${M.lab}</b></span><span>Sweat <b>${t<.42?'not yet collected':ok?'above the minimum':t<.6?'collecting':'below the minimum'}</b></span><span>Result <b>${t<.8?'pending':mode==='cf'?'≥60: diagnostic':mode==='nocf'?'<30: CF unlikely':'QNS: repeat'}</b></span>`;
    note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#stPlay'),draw,36000,'%t:player.replay%','sweattest');
  setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);
  $$('#stMode [data-m]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;$$('#stMode [data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- band explainer ---------- */
  const bs=$('#stBandSvg'),bi=$('#stCl'),bv=$('#stBandV'),bo=$('#stBandOut');
  const ROWS=[{t:'2017 guideline, all ages',src:'Farrell 2017',b:[[0,30,'CF unlikely','var(--good)'],[30,60,'intermediate','var(--warn)'],[60,121,'diagnostic of CF','var(--bad)']]},
    {t:'2008 guideline, infants up to 6 months',src:'Farrell 2008',b:[[0,30,'CF unlikely','var(--good)'],[30,60,'intermediate','var(--warn)'],[60,121,'indicative of CF','var(--bad)']]},
    {t:'2008 guideline, historic bands, all ages',src:'Farrell 2008',b:[[0,40,'normal','var(--good)'],[40,60,'intermediate','var(--warn)'],[60,121,'abnormal','var(--bad)']]}];
  const BAND_NOTE=['Under the 2017 bands a value below 30 mmol/L is negative: CF is unlikely. If symptoms fit, the care team can still look further. [[Farrell2017Dx,DeCelieGermana2023]]',
    'An intermediate value (30–59 mmol/L) is not a diagnosis either way. People with symptoms, a family history or a positive screen whose values are intermediate on two separate occasions may have CF, and further CFTR testing is needed. [[Sosnay2017Nonscreened,Farrell2008Dx]]',
    'A value of 60 mmol/L or more is diagnostic of CF under the 2017 guideline, at all ages including infants. [[Farrell2017Dx,DeCelieGermana2023]]'];
  function band(){const v=+bi.value,N=vb(bs,'720 230','400 300');$('#stClV').textContent=v+' mmol/L';
    const x0=N?16:330,w=N?368:374,X=c=>x0+w*Math.min(c,120)/120;let s='';
    ROWS.forEach((r,i)=>{const y=N?24+i*86:20+i*58;
      s+=`<text x="16" y="${N?y:y+20}" class="t-sm" style="fill:var(--ink);font-weight:600">${r.t}</text>`;
      const by=N?y+10:y+6;
      r.b.forEach(q=>{const on=v>=q[0]&&v<q[1];s+=`<rect x="${f1(X(q[0]))}" y="${by}" width="${f1(X(q[1])-X(q[0]))}" height="24" style="fill:${q[3]};opacity:${on?.6:.16}"/><text x="${f1((X(q[0])+X(Math.min(q[1],120)))/2)}" y="${by+16}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${N&&q[1]-q[0]<=30?q[2].replace('intermediate','interm.').replace('CF unlikely','unlikely'):q[2]}</text>`});
      s+=`<text x="${f1(X(r.b[0][1]))}" y="${by+38}" class="t-xs t-mid">${r.b[0][1]}</text><text x="${f1(X(60))}" y="${by+38}" class="t-xs t-mid">60</text>`});
    const bot=N?24+3*86-30:20+3*58-6,xv=X(v);
    s+=`<line x1="${f1(xv)}" x2="${f1(xv)}" y1="${N?32:20}" y2="${bot}" style="stroke:var(--ink);stroke-width:2.4"/><circle cx="${f1(xv)}" cy="${bot}" r="5" style="fill:var(--ink)"/><text x="${f1(clamp(xv,40,N?360:680))}" y="${bot+18}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${v} mmol/L</text>`;
    bs.innerHTML=s;
    const k=v<30?0:v<60?1:2;bv.className='verdict '+['yes','maybe','no'][k];
    bv.textContent=`${v} mmol/L falls in the 2017 band: ${['below 30, CF unlikely','30–59, intermediate','60 or more, diagnostic of CF'][k]}.${v>=30&&v<40?' Under the older all-ages bands it would have been called normal.':''}`;
    bo.innerHTML=BAND_NOTE[k]}
  bi.addEventListener('input',band);band();

  /* ---------- genotype interpreter ---------- */
  const g1=$('#stA1'),g2=$('#stA2'),gt=$('#stTrans'),gv=$('#stGenV'),go=$('#stGenOut');
  function gen(){const a=[g1.value,g2.value].sort().join('+'),tr=gt.checked;let cls='maybe',head,txt;
    if(a==='cf+cf'){if(tr){cls='no';head='Two CF-causing variants in trans: evidence of CFTR dysfunction';
        txt=`Two CF-causing variants in trans count as evidence of CFTR dysfunction. [[Sosnay2017Genetics]] In a screened baby the diagnosis is still confirmed by showing CFTR dysfunction, usually with a sweat test. [[Farrell2017Screened]] Rarely such infants have a normal sweat chloride; the 2008 guideline states that they have CF and should be followed at a CF centre. [[Farrell2008Dx]]`}
      else{head='Two CF-causing variants, phase not yet known';txt=`Both variants must sit on different copies of the gene (in trans) to count. The 2008 guideline recommends parental DNA testing to show this. [[Farrell2008Dx]] Tick the box once in trans is shown.`}}
    else if(a==='cf+vcc'||a==='vcc+vcc'){head='At least one variant of variable or unknown consequence';
      txt=`Variants with variable or unknown consequence are not evidence of CFTR dysfunction, and other CFTR function tests may then help. [[Sosnay2017Genetics]] With a positive screen, a sweat chloride below 60 mmol/L and up to two variants, at least one not clearly CF-causing, this is the CRMS/CFSPID picture. [[Borowitz2009CRMS,Munck2015CFSPID]] Variants not yet interpreted by CFTR2 are classified with the ACMG criteria; pathogenic and likely pathogenic ones prompt the same follow-up as CF-causing variants. [[McGarry2025NBS]]`}
    else if(a==='cf+ncf'||a==='cf+none'){head='One CF-causing variant';
      txt=`After sequencing in a screening programme, an infant with only one variant is a presumed carrier; parents should be told and offered genetic counselling. [[McGarry2025NBS]] The sweat test still decides: an intermediate value with one or no variants is CFSPID group B. [[Munck2015CFSPID]] In California, children with one CF-causing and one CFTR2 non-CF-causing variant had lower IRT and sweat chloride and better first-year growth than children with two CF-causing variants. [[Salinas2015]]`}
    else if(a.includes('vcc')){head='One variant of variable or unknown consequence';
      txt=`A variant of variable or unknown consequence is not evidence of CFTR dysfunction; other CFTR function tests may help. [[Sosnay2017Genetics]] An intermediate sweat chloride with one or no variants is CFSPID group B. [[Munck2015CFSPID]]`}
    else{cls='yes';head='No CF-causing variant found';
      txt=`Sequencing does not catch every variant: structural and deep intronic variants are missed unless deletion/duplication testing is done or they are targeted. [[McGarry2025NBS]] If symptoms fit, CF should still be considered, whatever the screening result. [[Rock2011]]`}
    gv.className='verdict '+cls;gv.textContent=head;go.innerHTML=txt}
  [g1,g2,gt].forEach(e=>e.addEventListener('change',gen));gen();

  /* ---------- sweat chloride on ETI (PROMISE) ---------- */
  const ps=$('#stProSvg');let ser='all',stopP=null;
  const PRO={all:{t:'All 487 starting ETI',pts:[[0,88.0],[1,49.1],[6,45.7]],col:'var(--rx)'},naive:{t:'Modulator-naive',pts:[[0,95.6],[1,57.3],[6,53.5]],col:'var(--dx)'},iva:{t:'Switching from ivacaftor (n=33)',pts:[[0,52.6],[1,25.3],[6,26.2]],col:'var(--brand)'}};
  function pro(g){const N=vb(ps,'720 260','400 330'),x0=N?44:60,x1=N?380:470,y0=20,y1=N?260:220,X=m=>x0+(x1-x0)*m/6,Y=v=>y1-(y1-y0)*v/120;
    let s='';ST_BANDS17.forEach(b=>{s+=`<rect x="${x0}" y="${f1(Y(b.hi))}" width="${x1-x0}" height="${f1(Y(b.lo)-Y(b.hi))}" style="fill:${b.col};opacity:.13"/><text x="${x0+6}" y="${f1(Y(b.lo)-5)}" class="t-xs">${b.lab}</text>`});
    [0,30,60,90,120].forEach(v=>{s+=`<text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,1,6].forEach(m=>{s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${y1}" y2="${y1+4}" class="axis"/><text x="${f1(X(m))}" y="${y1+16}" class="t-xs t-mid">${m} mo</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/>`;
    Object.keys(PRO).forEach(k=>{const P=PRO[k],on=k===ser,u=on?g:1,f=monoFn(P.pts);
      let d='';for(let i=0;i<=60*u;i++){const m=6*i/60;d+=(i?'L':'M')+f1(X(m))+' '+f1(Y(f(m)))}
      s+=`<path d="${d}" style="fill:none;stroke:${P.col};stroke-width:${on?3:1.4};opacity:${on?1:.35}"/>`;
      if(on)P.pts.forEach(q=>{if(q[0]<=6*u+.01)s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(Y(q[1]))}" r="4.5" style="fill:${P.col};stroke:var(--panel);stroke-width:2"/><text x="${f1(X(q[0])+(q[0]===6?-6:6))}" y="${f1(Y(q[1])-8)}" class="t-sm${q[0]===6?' t-end':''}" style="fill:var(--ink);font-weight:700">${q[1].toFixed(1)}</text>`})});
    if(!N){let ly=40;Object.keys(PRO).forEach(k=>{const P=PRO[k];s+=`<line x1="500" x2="522" y1="${ly-4}" y2="${ly-4}" style="stroke:${P.col};stroke-width:${k===ser?3:1.4}"/><text x="528" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:${k===ser?700:500}">${P.t}</text>`;ly+=20});
      s+=`<text x="500" y="${ly+14}" class="t-xs">mean sweat chloride, mmol/L</text><text x="500" y="${ly+28}" class="t-xs">people aged 12 and over</text>`}
    else s+=`<text x="${x0}" y="12" class="t-xs" style="fill:var(--ink);font-weight:600">${PRO[ser].t} · mean, mmol/L</text>`;
    ps.innerHTML=s}
  $$('#stPro [data-s]').forEach(b=>b.addEventListener('click',()=>{ser=b.dataset.s;$$('#stPro [data-s]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopP)stopP();stopP=animate(900,q=>pro(ease(q)))}));
  pro(1);
  redraws.sweattest=(()=>{const prev=redraws.sweattest;return()=>{prev&&prev();band();pro(1)}})();
};
