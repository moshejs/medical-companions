/* =============== 2.3 hEDS or HSD? =============== */
inits.hsd=()=>{
  const svg=$('#hsSvg'),rg=$('#hsT');let view='label';
  /* regions: wide (720x380) and narrow (400x560) rectangles [x,y,w,h] */
  const RW={jh:[10,10,470,360],asym:[22,58,136,300],hsd:[168,58,180,300],G:[178,104,160,58],P:[178,168,160,58],L:[178,232,160,58],H:[178,296,160,56],
    heds:[358,58,112,300],oth:[492,10,218,360],o1:[502,64,198,84],o2:[502,156,198,84],o3:[502,248,198,84]};
  const RN={jh:[6,6,388,384],asym:[16,46,368,60],hsd:[16,114,368,184],G:[24,142,174,72],P:[202,142,174,72],L:[24,218,174,72],H:[202,218,174,72],
    heds:[16,306,368,76],oth:[6,400,388,154],o1:[16,430,368,36],o2:[16,470,368,36],o3:[16,510,368,36]};
  const TXT={
    asym:['Asymptomatic','JH without','symptoms'],
    G:['G-HSD','generalised: GJH','on Beighton'],P:['P-HSD','peripheral: hands','and/or feet'],L:['L-HSD','localised: single','joints or groups'],H:['H-HSD','historical: 5PQ +,','Beighton negative'],
    heds:['hEDS','all 3 of the','2017 criteria'],
    o1:['12 other EDS types','each confirmed by','genetic testing'],o2:['Marfan, Loeys-Dietz','own criteria and','genes'],o3:['Myopathies, OI','neuromuscular and','skeletal conditions']};
  const CARE={asym:['Nothing to treat:','hypermobility alone','is not a disease']};

  const STEPS=[
    {from:0,at:.12,k:'Age 8 · no symptoms',t:'Joint hypermobility is a descriptor',
     txt:`Maya can do the splits and bend her thumbs to her forearms, and nothing hurts. Joint hypermobility on its own is a descriptor, not a diagnosis. Generalised joint hypermobility (GJH) involves 5 or more joints across all four limbs and the spine; localised hypermobility affects one or a few joints. In one review, 64.6% of children aged 4–7 met GJH. [[Carroll2023,Malek2021C]]`,
     pt:`Being bendy is common, especially in children and girls, and on its own it is not a disease.`,
     hook:`Asymptomatic JH, HSD and hEDS lie on one spectrum, and a person may move between categories as symptoms change. [[Carroll2023,Malek2021C]]`,
     lab:`None needed: asymptomatic generalised joint hypermobility. [[Castori2017]]`,care:`Nothing to treat: hypermobility alone is common and is not a disease. [[Clinch2011,Castori2017]]`},
    {from:.2,at:.32,k:'Age 14 · sprains and knee pain',t:'Generalised HSD',
     txt:`At 14 Maya has repeated ankle sprains and knee pain. HSD needs joint hypermobility plus at least one secondary musculoskeletal manifestation: trauma (macro- or microtrauma), chronic pain, disturbed proprioception, or traits such as flat feet, valgus deformities or mild scoliosis. With GJH on the Beighton score this is generalised HSD, whose main differential diagnosis is hEDS. The paediatric working group proposes that children should not be diagnosed with hEDS until biologically mature. [[Carroll2023,Castori2017,Tofts2023]]`,
     pt:`Once flexible joints start causing problems, such as pain or repeated sprains, doctors may call it a hypermobility spectrum disorder.`,
     hook:`HSD = JH + ≥ 1 secondary musculoskeletal manifestation. G-HSD's main differential is hEDS. [[Carroll2023]]`,
     lab:`Generalised HSD (children have their own paediatric framework, with 8 subgroups). [[Carroll2023,Tofts2023]]`,
     care:`Driven by symptoms. In the Bendy Study of 119 children, education and positive messages about healthy exercise and self-management gave "significant benefit" for most. [[Bale2019]]`},
    {from:.4,at:.52,k:'Elsewhere on the map',t:'The other three HSD subtypes',
     txt:`Not everyone's hypermobility is generalised. Peripheral HSD is limited to the hands and/or feet (and peripheral hypermobility may be a clue to vascular EDS). Localised HSD is hypermobility at single joints or groups, with a problem in the same region. Historical HSD is GJH reported on the five-part questionnaire with a negative Beighton score, as when people stiffen with age. Clinics apply these differently: one US clinic defines historical HSD as a score of zero with a positive 5PQ. [[Carroll2023,Fairweather2025]]`,
     pt:`The HSD subtype says where the bendy joints are, or that they used to be bendy. It does not say how much someone is struggling.`,
     hook:`Four HSD subtypes: G (generalised), P (peripheral), L (localised), H (historical). [[Carroll2023,Castori2017]]`,
     lab:`P-HSD, L-HSD or H-HSD; none has its own ICD-10 code. [[Carroll2023,Fairweather2025]]`,
     care:`At a US clinic, people with localised or historical HSD reported more symptoms than controls on 62 of 100 items, much like HSD (58 of 100). [[Fairweather2025]]`},
    {from:.6,at:.74,k:'Age 22 · assessed as an adult',t:'Now the hEDS criteria are met',
     txt:`At 22 Maya meets all three 2017 criteria: generalised hypermobility, Features A (5 systemic signs), B (her mother meets the criteria) and C (daily limb pain), and no other cause. Her label changes from HSD to hEDS. Her body has not changed overnight, and studies so far find the two groups much alike: in a Swiss centre they differed on only 3 of 16 severity items. See <a href="#criteria" data-go="criteria">the 2017 hEDS criteria</a>. [[Fairweather2025,AubryRozier2021]]`,
     pt:`Getting the hEDS name can matter a lot to people. But in studies so far, people with HSD and hEDS have needed much the same kind of help.`,
     hook:`hEDS vs HSD after coordinated physiotherapy: 56% vs 50% improved (no significant difference). [[AubryRozier2021]]`,
     lab:`hEDS; one clinic codes it Q79.62 and HSD M35.7. [[Fairweather2025]]`,
     care:`Largely the same core approach so far. Exercise trials enrol hEDS and HSD together, and the Swiss authors propose treating them as one entity. [[AubryRozier2021,Spanhove2023,Susanne2025]]`},
    {from:.8,at:.95,k:'A door to the right',t:'When it is another type',
     txt:`Some findings point off this map toward a heritable connective tissue disorder: arachnodactyly, a span-to-height ratio of 1.05 or more, unusually soft skin, skin stretch, piezogenic papules, atrophic scars, or mitral valve prolapse or aortic root dilatation. Unusual skin fragility excludes hEDS. The other 12 types are confirmed by finding the causative variant. Among 72 children referred for suspected EDS, 25% met clinical criteria for a type, and 22% of the rest later had a molecular diagnosis. [[Carroll2023,Fairweather2025,Malfait2017,Damseh2022]]`,
     pt:`If the skin is very fragile, or a relative had a tear in a blood vessel, a gene test may find a different type of EDS.`,
     hook:`HSD and hEDS are diagnoses of exclusion against the other heritable types; those need molecular confirmation. [[Malfait2017,Castori2017]]`,
     lab:`A type-specific diagnosis, such as classical or vascular EDS, after genetic testing. [[Malfait2017]]`,
     care:`Type-specific: for vascular EDS the consensus recommends an emergency plan, blood pressure in the normal range and yearly imaging where feasible. [[Byers2017]]`}];

  const KF=[[0,'asym'],[.2,'asym'],[.27,'G'],[.6,'G'],[.67,'heds'],[1,'heds']];
  function spot(R,id,N){const r=R[id];if(id==='asym')return N?[r[0]+r[2]-34,r[1]+10]:[r[0]+r[2]/2,r[1]+r[3]-110];
    if(id==='heds')return N?[r[0]+r[2]-40,r[1]+18]:[r[0]+r[2]/2,r[1]+r[3]-110];
    return [r[0]+r[2]-24,r[1]+r[3]/2-15]}
  function maya(t,R,N){for(let i=1;i<KF.length;i++)if(t<=KF[i][0]){const a=spot(R,KF[i-1][1],N),b=spot(R,KF[i][1],N),u=ease(ramp(t,KF[i-1][0],KF[i][0]));
      return [lerp(a[0],b[0],u),lerp(a[1],b[1],u)]}return spot(R,'heds',N)}
  const ages=t=>t<.2?8:t<.27?Math.round(lerp(8,14,ramp(t,.2,.27))):t<.6?14:t<.67?Math.round(lerp(14,22,ramp(t,.6,.67))):22;
  function rect(r,o){return `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="${o.rx||12}" style="fill:${o.fill||'none'};stroke:${o.st||'var(--line)'};stroke-width:${o.sw||1.2};${o.dash?'stroke-dasharray:5 4;':''}${o.op!=null?'opacity:'+o.op:''}"/>`}
  function lines(r,arr,o={}){const x=r[0]+10,y=r[1]+(o.dy||20);let s=`<text x="${x}" y="${y}" class="t-lbl" style="${o.col?'fill:'+o.col:''}">${arr[0]}</text>`;
    for(let k=1;k<arr.length;k++)s+=`<text x="${x}" y="${y+k*14}" class="t-xs" style="${o.subcol?'fill:'+o.subcol:''}">${arr[k]}</text>`;return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560'),R=N?RN:RW,ph=phaseOf(STEPS,t),care=view==='care';
    const here=t<.24?'asym':t<.64?'G':'heds';let s='';
    s+=rect(R.jh,{fill:'var(--field)'})+`<text x="${R.jh[0]+12}" y="${R.jh[1]+22}" class="t-sm">JOINT HYPERMOBILITY · A DESCRIPTOR</text>`;
    s+=rect(R.oth,{fill:'var(--field)',dash:1})+`<text x="${R.oth[0]+12}" y="${R.oth[1]+22}" class="t-sm">JH AS PART OF ANOTHER SYNDROME</text>`;
    /* regions */
    const hot=id=>here===id||(id==='hsd'&&here==='G');
    s+=rect(R.asym,{fill:hot('asym')?'var(--dx-soft)':'var(--panel)',st:hot('asym')?'var(--dx)':'var(--line)'});
    s+=rect(R.hsd,{fill:'var(--panel)',st:here==='G'?'var(--dx)':'var(--line)'})+`<text x="${R.hsd[0]+10}" y="${R.hsd[1]+20}" class="t-lbl">HSD</text><text x="${R.hsd[0]+(N?50:10)}" y="${R.hsd[1]+(N?20:36)}" class="t-xs">JH + ≥1 musculoskeletal issue</text>`;
    const ghost=t>=.4&&t<.6?['P','L','H'][Math.min(2,Math.floor((t-.4)/.0667))]:null;
    ['G','P','L','H'].forEach(id=>{const on=here===id||ghost===id;s+=rect(R[id],{rx:8,fill:on?'var(--dx-soft)':'var(--panel-2)',st:on?'var(--dx)':'var(--line)',sw:on?1.6:1})+lines(R[id],TXT[id],{dy:18,col:on?'var(--dx)':''})});
    s+=rect(R.heds,{fill:here==='heds'?'var(--dx-soft)':'var(--panel)',st:here==='heds'?'var(--dx)':'var(--line)'})+lines(R.heds,TXT.heds,{col:here==='heds'?'var(--dx)':''});
    s+=lines(R.asym,care?CARE.asym:TXT.asym,{col:hot('asym')?'var(--dx)':''});
    const otherHot=t>=.82;
    ['o1','o2','o3'].forEach(id=>s+=rect(R[id],{rx:8,fill:otherHot&&id==='o1'?'var(--warn-soft)':'var(--panel)',st:otherHot&&id==='o1'?'var(--warn)':'var(--line)'})+(N?`<text x="${R[id][0]+10}" y="${R[id][1]+23}" class="t-lbl" style="font-size:12px">${TXT[id][0]}<tspan class="t-xs" dx="8">${TXT[id][1]} ${TXT[id][2]}</tspan></text>`:lines(R[id],TXT[id],{dy:24})));
    /* management overlay: one band across HSD and hEDS */
    if(care){const x0=R.hsd[0]-4,y0=N?R.hsd[1]-4:R.hsd[1]-4,w=N?R.hsd[2]+8:(R.heds[0]+R.heds[2])-x0+4,h=N?(R.heds[1]+R.heds[3])-y0+4:R.hsd[3]+8;
      s+=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="14" style="fill:var(--accent-soft);opacity:.88;stroke:var(--accent);stroke-width:2;stroke-dasharray:6 4"/>`;
      const cx=R.hsd[0]+R.hsd[2]/2,cy=R.hsd[1]+R.hsd[3]/2+(N?8:0),L=['Shared core approach','for HSD and hEDS:','exercise and physio,','pain care, education','','improved after physio','hEDS 56% · HSD 50%'];
      L.forEach((l,k)=>s+=`<text x="${f1(cx)}" y="${f1(cy-52+k*(N?17:19))}" class="${k<2||k>5?'t-lbl':'t-sm'} t-mid" style="${k>5?'fill:var(--accent)':k<2?'':'fill:var(--ink)'}">${l}</text>`);}
    if(care&&N)s+=`<text x="${R.oth[0]+12}" y="${R.oth[1]+R.oth[3]-4}" class="t-xs" style="fill:var(--accent)">care: type-specific (e.g. vEDS plan)</text>`;
    if(care&&!N)s+=`<text x="${R.oth[0]+12}" y="${R.oth[1]+352}" class="t-xs" style="fill:var(--accent)">care: type-specific (e.g. vEDS plan)</text>`;
    /* ghost path to another type */
    if(otherHot){const a=spot(R,'heds',N),b=N?[R.o1[0]+R.o1[2]-30,R.o1[1]+4]:[R.o1[0]+R.o1[2]-34,R.o1[1]+R.o1[3]/2-15],u=ease(ramp(t,.82,.9));
      s+=`<path d="M${f1(a[0])} ${f1(a[1]+14)}Q${f1((a[0]+b[0])/2)} ${f1(Math.min(a[1],b[1])-(N?-30:40))} ${f1(b[0])} ${f1(b[1]+14)}" style="fill:none;stroke:var(--warn);stroke-width:1.6;stroke-dasharray:4 4" marker-end="url(#hsAr)"/>`;
      s+=`<g style="opacity:${f1(.25+.4*u)}">${person(lerp(a[0],b[0],u),lerp(a[1],b[1],u),28,'var(--warn)')}</g>`;
      s+=`<text x="${f1(N?b[0]-30:b[0]+18)}" y="${f1(N?b[1]-6:b[1]+48)}" class="t-xs t-mid" style="fill:var(--warn)">if skin fragile → test</text>`}
    /* Maya */
    const m=maya(t,R,N);
    s+=`<circle cx="${f1(m[0])}" cy="${f1(m[1]+14)}" r="19" style="fill:var(--panel);stroke:var(--dx);stroke-width:2"/>`+person(m[0],m[1],28,'var(--dx)');
    if(t<.2||t>.66||(t>.27&&t<.6)===false)s+=`<text x="${f1(m[0])}" y="${f1(m[1]+46)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">Maya, ${ages(t)}</text>`;
    if(ghost){const gp=spot(R,ghost,N);s+=`<g style="opacity:.35">${person(gp[0],gp[1],28,'var(--dx)')}</g>`}
    svg.innerHTML=`<defs>${marker('hsAr','var(--warn)')}</defs>`+s;
    setSt(ph);const P=STEPS[ph];
    $('#hsRead').innerHTML=`<span>Maya <b>age ${ages(t)}</b></span><span>Region <b>${{asym:'asymptomatic JH',G:'generalised HSD',heds:'hEDS'}[here]}</b></span><span>Overlay <b>${care?'management':'label'}</b></span>`;
    $('#hsNote').innerHTML=noteHTML(P)+`<div class="kv"><div><dt>${care?'What changes in care':'The label'}</dt><dd>${care?P.care:P.lab}</dd></div><div><dt>${care?'The label':'What changes in care'}</dt><dd>${care?P.lab:P.care}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#hsPlay'),draw,22000,'%t:player.replay%','hsd');
  const setSt=stepWire($('#hsSteps'),STEPS,rg,draw,stop);
  $$('[data-hsview]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.hsview;$$('[data-hsview]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ================= sorting game ================= */
  const BINS=[['asym','Asymptomatic JH'],['hsd','HSD'],['heds','hEDS'],['gen','Genetic testing']];
  const SUBS=[['G','Generalised'],['P','Peripheral'],['L','Localised'],['H','Historical']];
  const CASES=[
    {v:`A 9-year-old gymnast scores 7 of 9 on the Beighton score. She has no pain, no injuries and no other problems.`,a:'asym',
     why:`Hypermobility with no secondary musculoskeletal manifestation is asymptomatic joint hypermobility: a descriptor, not a diagnosis. Hypermobility is commonest in young children. [[Carroll2023,Malek2021C]]`},
    {v:`A 28-year-old man scores 6 of 9, has had daily knee and shoulder pain for a year and recurrent ankle sprains. He has 2 Feature A signs, and no relative has been assessed.`,a:'hsd',s:'G',
     why:`Generalised hypermobility plus pain and injuries. Criterion 2 is not met (Feature A needs 5 signs, and there is no Feature B), so this is generalised HSD. [[Carroll2023,Fairweather2025]]`},
    {v:`A 35-year-old scores 2 of 9 (both little fingers). Her fingers and toes are very lax and she has painful flat feet.`,a:'hsd',s:'P',
     why:`Hypermobility limited to the hands and feet, with a secondary manifestation (flat feet, pain), fits peripheral HSD. Peripheral hypermobility may also be a clue to vascular EDS, so the whole picture matters. [[Carroll2023]]`},
    {v:`A 40-year-old violinist scores 1 of 9. One very lax shoulder slips partly out of joint when she plays.`,a:'hsd',s:'L',
     why:`Hypermobility at a single joint with a problem in the same region is localised HSD. [[Carroll2023]]`},
    {v:`A 55-year-old scores 2 of 9 now (the cut-off over 50 is 4). He answers "yes" to 3 of the 5 questions about past flexibility and has chronic widespread pain.`,a:'hsd',s:'H',
     why:`A negative Beighton score with a positive five-part questionnaire is historical hypermobility; with pain it fits historical HSD. A score of 2 is two points short, so the one-point 5PQ rule for hEDS cannot apply. [[Carroll2023,Thwaites2022]]`},
    {v:`A 26-year-old scores 7 of 9. She has 5 Feature A signs, her mother independently meets the hEDS criteria, she has had daily pain in her arms and legs for two years, and other causes have been excluded.`,a:'heds',
     why:`Criterion 1 (7 ≥ 5), Criterion 2 (Features A, B and C) and Criterion 3 are all met, so the 2017 hEDS criteria are met as published. [[Fairweather2025,Thwaites2022]]`},
    {v:`A 22-year-old scores 6 of 9. His skin is very stretchy and splits after minor bumps, leaving wide paper-thin scars; he bruises easily.`,a:'gen',
     why:`Unusual skin fragility excludes hEDS and should prompt consideration of other EDS types. Skin hyperextensibility with atrophic scarring is the first major criterion for classical EDS, which is confirmed by genetic testing. [[Fairweather2025,Ritelli2020C,Malfait2017]]`},
    {v:`A 31-year-old has lax finger joints, thin translucent skin with visible veins and easy bruising. Her brother has been diagnosed with vascular EDS.`,a:'gen',
     why:`A family history of vascular EDS is one of the minimal criteria that should prompt COL3A1 testing; the international consensus recommends identifying the variant before applying the diagnosis. Small-joint hypermobility, easy bruising and thin translucent skin are vEDS minor criteria. [[Wang2026OJRD,Byers2017,Shalhub2020]]`}];
  const ans=CASES.map(()=>({b:null,s:null}));
  function cardHTML(i){const c=CASES[i],A=ans[i];
    const binB=BINS.map(([k,l])=>`<button class="btn" data-hsbin="${i}:${k}" aria-pressed="${A.b===k}">${l}</button>`).join('');
    const subB=A.b==='hsd'&&c.a==='hsd'?`<div class="hs-sub"><span class="kicker">Subtype</span>${SUBS.map(([k,l])=>`<button class="btn" data-hssub="${i}:${k}" aria-pressed="${A.s===k}">${l}</button>`).join('')}</div>`:'';
    let fb='';
    if(A.b){if(A.b!==c.a)fb=`<div class="hs-fb bad"><b>Not quite.</b> ${c.why}</div>`;
      else if(c.a==='hsd'&&!A.s)fb=`<div class="hs-fb mid"><b>HSD is right.</b> Now pick the subtype.</div>`;
      else if(c.a==='hsd'&&A.s!==c.s)fb=`<div class="hs-fb bad"><b>HSD, but not that subtype.</b> ${c.why}</div>`;
      else fb=`<div class="hs-fb ok"><b>Yes.</b> ${c.why}</div>`}
    return `<span class="tag dx">Case ${i+1}</span><p class="v">${c.v}</p><div class="ctrls">${binB}</div>${subB}${fb}`}
  const box=$('#hsCards');
  box.innerHTML=CASES.map((c,i)=>`<div class="card" data-hscard="${i}"></div>`).join('');
  function render(i){$(`[data-hscard="${i}"]`,box).innerHTML=cardHTML(i)}
  function score(){const n=ans.filter((a,i)=>a.b===CASES[i].a&&(CASES[i].a!=='hsd'||a.s===CASES[i].s)).length;$('#hsScore').textContent=`${n} / 8`}
  CASES.forEach((c,i)=>render(i));score();
  box.addEventListener('click',e=>{const b=e.target.closest('[data-hsbin],[data-hssub]');if(!b)return;
    if(b.dataset.hsbin){const [i,k]=b.dataset.hsbin.split(':');ans[+i].b=k;ans[+i].s=null;render(+i)}
    else{const [i,k]=b.dataset.hssub.split(':');ans[+i].s=k;render(+i)}
    score()});
  $('#hsReset').addEventListener('click',()=>{ans.forEach(a=>{a.b=null;a.s=null});CASES.forEach((c,i)=>render(i));score()});

  /* ================= who gets which label ================= */
  const CO={
    mayo:{n:'US adult EDS clinic · 2,695 adults',parts:[['HSD',60.6,'var(--dx)'],['hEDS',18.3,'var(--chain-a)'],['Localised or historical HSD',10.7,'var(--dx-soft)'],['None of these',10.4,'var(--panel-2)']],
      txt:`At the Mayo Clinic Florida EDS clinic (November 2019 to August 2024), the 2017 criteria gave these diagnoses. Fewer than 1 in 5 people referred met the hEDS criteria. [[Fairweather2025]]`},
    swiss:{n:'Swiss reference centre · 97 adults',parts:[['hEDS',62.9,'var(--chain-a)'],['HSD',37.1,'var(--dx)']],
      txt:`In 97 adults with symptomatic hypermobility (median age 40, 92.7% women), 61 met hEDS criteria and 36 were classed as HSD. In the HSD group, 22% had another diagnosis that could confound the picture, such as psoriatic arthritis or Sjögren syndrome. [[AubryRozier2021]]`},
    spain:{n:'Spanish paediatric genetics clinic · 41 children',parts:[['hEDS or HSD',61,'var(--dx)'],['Classical EDS',22,'var(--chain-c)'],['Vascular EDS',7.3,'var(--vas)'],['Other types',9.7,'var(--panel-2)']],
      txt:`In a paediatric genetics clinic (2018–2024), 61% were classified hEDS/HSD, 22% classical EDS, 7.3% vascular EDS and 9.7% other types. Clinical exome testing found the cause in every gene-defined type, but no clear candidate variant in the children compatible with hEDS/HSD. [[FozFelipe2025]]`}};
  let co='mayo';const csv=$('#hsCoSvg');
  function drawCo(){const N=vb(csv,'720 150','400 210'),C=CO[co];let s='',x=N?12:20;const W=N?376:680,y=N?38:40;
    s+=`<text x="${N?12:20}" y="20" class="t-sm">${C.n.toUpperCase()}</text>`;
    let lgx=20;C.parts.forEach(([l,v,c],k)=>{const w=W*v/100;s+=`<rect x="${f1(x)}" y="${y}" width="${f1(Math.max(w-2,1))}" height="34" rx="5" style="fill:${c};stroke:var(--line)"/>`;
      if(w>44)s+=`<text x="${f1(x+w/2)}" y="${y+22}" class="t-lbl t-mid" style="fill:${c==='var(--dx)'||c==='var(--vas)'?'#fff':'var(--ink)'};font-size:12px">${v}%</text>`;
      const lx=N?12:lgx;if(!N)lgx+=(l.length+8)*5.9+28;const ly=N?y+62+k*22:y+64;
      s+=`<rect x="${lx}" y="${ly-10}" width="12" height="12" rx="3" style="fill:${c};stroke:var(--line)"/><text x="${lx+18}" y="${ly}" class="t-xs" style="fill:var(--ink)">${l} · ${v}%</text>`;x+=w});
    csv.innerHTML=s;
    $('#hsCoNote').innerHTML=`<div class="kicker">${C.n}</div><h4>${C.parts.map(p=>p[0]+' '+p[1]+'%').slice(0,2).join(' · ')}</h4><p>${C.txt}</p><div class="hook"><b>%t:note.hook%</b>Referral-centre shares depend on who is referred and on how each clinic applies the definitions. [[Fairweather2025,Carroll2023]]</div>`}
  $('#hsCoBtns').addEventListener('click',e=>{const b=e.target.closest('[data-hsco]');if(!b)return;co=b.dataset.hsco;$$('[data-hsco]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCo()});
  drawCo();
  const prevR=redraws.hsd;redraws.hsd=()=>{prevR&&prevR();drawCo()};
};
