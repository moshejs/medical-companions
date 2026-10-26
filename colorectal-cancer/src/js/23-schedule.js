/* =============== 2.3 When to start, how often =============== */
const SH_TESTS={
 fit:{n:'FIT',iv:1,ic:'t',q:`FIT every year (USPSTF 2021, ACS); the ACP 2023 says every 2 years. [[USPSTF2021,Wolf2018,Qaseem2023]]`},
 gfobt:{n:'High-sensitivity gFOBT',iv:1,ic:'t',q:`High-sensitivity gFOBT every year (USPSTF 2021, ACS 2018); every 2 years (ACP 2023). [[USPSTF2021,Wolf2018,Qaseem2023]]`},
 sdna:{n:'mt-sDNA',iv:3,ic:'t',q:`Stool DNA-FIT every 1–3 years (USPSTF 2021); mt-sDNA every 3 years (ACS). Drawn at 3 years. [[USPSTF2021,Wolf2018]]`},
 ng:{n:'Next-gen mt-sDNA',iv:3,ic:'t',q:`ACS 2026 adds the next-generation mt-sDNA test as a preferred stool option at 3-year intervals. [[Wolf2026]]`},
 rna:{n:'mt-sRNA',iv:3,ic:'t',q:`ACS 2026 adds the mt-sRNA test as a preferred stool option at 3-year intervals. [[Wolf2026]]`},
 ctc:{n:'CT colonography',iv:5,ic:'c',q:`CT colonography every 5 years (USPSTF 2021, ACS 2018). [[USPSTF2021,Wolf2018]]`},
 fs:{n:'Sigmoidoscopy',iv:5,ic:'s',q:`Flexible sigmoidoscopy every 5 years (USPSTF 2021, ACS 2018). [[USPSTF2021,Wolf2018]]`},
 fsfit:{n:'Sigmoidoscopy + FIT',iv:10,ic:'s',fit:true,q:`Flexible sigmoidoscopy every 10 years plus annual FIT (USPSTF 2021). [[USPSTF2021]]`},
 col:{n:'Colonoscopy',iv:10,ic:'o',q:`Colonoscopy every 10 years (USPSTF 2021, ACS, USMSTF tier 1). [[USPSTF2021,Wolf2018,Rex2017]]`},
 blood:{n:'Blood test',iv:null,ic:'b',q:`ACS 2026 recommends blood-based tests only for people who decline or do not complete the preferred tests; a repeat interval is not given in our sources. The Shield label says a positive result should be followed by colonoscopy. [[Wolf2026,FDA-Shield]]`}
};
/* USMSTF 2020 (Gupta2020): iv [lo,hi] years; after = next interval if the first surveillance exam is normal; esge: ESGE 2020 (Hassan2020) */
const SH_FIND={
 none:{n:'no colonoscopy yet'},
 normal:{n:'a normal colonoscopy',iv:[10,10],ev:'strong recommendation, high-quality evidence'},
 ta12:{n:'1–2 tubular adenomas <10 mm',iv:[7,10],ev:'strong, moderate-quality evidence',after:10,esge:'none'},
 ta34:{n:'3–4 tubular adenomas <10 mm',iv:[3,5],ev:'weak, very-low-quality evidence',after:10,esge:'none'},
 ta510:{n:'5–10 tubular adenomas <10 mm',iv:[3,3],ev:'strong, moderate-quality evidence',after:5,esge:3},
 ad10:{n:'an adenoma ≥10 mm',iv:[3,3],ev:'strong, high-quality evidence',after:5,esge:3},
 tv:{n:'a tubulovillous or villous adenoma',iv:[3,3],ev:'strong, moderate-quality evidence',after:5},
 hgd:{n:'an adenoma with high-grade dysplasia',iv:[3,3],ev:'strong, moderate-quality evidence',after:5,esge:3},
 gt10:{n:'more than 10 adenomas',iv:[1,1],ev:'weak, very-low-quality evidence',gen:true},
 pm20:{n:'an adenoma ≥20 mm removed piecemeal',iv:[.5,.5],ev:'strong, moderate-quality evidence',esge:'pm'},
 hp:{n:'≤20 hyperplastic polyps <10 mm in the rectum or sigmoid',iv:[10,10]},
 ssl12:{n:'1–2 sessile serrated lesions <10 mm',iv:[5,10],esge:'none'},
 ssl34:{n:'3–4 sessile serrated lesions <10 mm',iv:[3,5],esge:'none'},
 ssl510:{n:'5–10 sessile serrated lesions <10 mm',iv:[3,3],esge:'none'},
 ssl10:{n:'a sessile serrated lesion ≥10 mm',iv:[3,3],esge:3},
 ssld:{n:'a sessile serrated lesion with dysplasia',iv:[3,3],esge:3},
 tsa:{n:'a traditional serrated adenoma',iv:[3,3]},
 hp10:{n:'a hyperplastic polyp ≥10 mm',iv:[3,5],esge:3},
 pmssl:{n:'a sessile serrated lesion ≥20 mm removed piecemeal',iv:[.5,.5],esge:'pm'}
};
const SH_STEPS=[
 {from:0,at:.03,k:'Age 45–49',t:'Grade B: start at 45',
  txt:`USPSTF 2021 recommends screening adults aged 45–49 (grade B: moderate certainty of moderate net benefit). ACS calls starting at 45 a qualified recommendation; USMSTF 2022 also suggests 45. The ACP 2023 suggests considering not screening at 45–49. Lowering the start age from 50 to 45 was modelled to add 22–27 life-years, 161–784 colonoscopies and 0.1–2 complications per 1,000 people. [[USPSTF2021,Wolf2018,Patel2022,Qaseem2023,Knudsen2021]]`,
  pt:`Most US groups now say to start at 45 if your risk is average. One group (the ACP) still says 50. [[USPSTF2021,Qaseem2023]]`,
  hook:`USPSTF: B at 45–49, A at 50–75, C at 76–85. [[USPSTF2021]]`},
 {from:.125,at:.2,k:'Age 50–75',t:'Grade A: the core years',
  txt:`USPSTF 2021 has high certainty of substantial net benefit for screening at 50–75 (grade A). The tests repeat at their published intervals. In 2016, 26% of eligible US adults had never been screened, and in 2018, 31% were not up to date. [[USPSTF2021]]`,
  pt:`The best test is the one you actually do, repeated on time. [[Wolf2026]]`,
  hook:`Strategies: FIT yearly; stool DNA-FIT 1–3 y; CTC 5 y; sigmoidoscopy 5 y (or 10 y + yearly FIT); colonoscopy 10 y. [[USPSTF2021]]`},
 {from:.3,at:.36,k:'What if',t:'If a test is positive',
  txt:`Any positive non-colonoscopy test needs a follow-up colonoscopy, preferably within 6 months (ACS 2026). After a colonoscopy, the schedule switches to surveillance based on what was found (the calculator above), and the stool tests stop for as long as surveillance continues. In Kaiser Permanente, 79.4% of people with a positive FIT had a colonoscopy within 1 year. [[Wolf2026,Gupta2020,Doubeni2024]]`,
  pt:`A positive stool test means a colonoscopy within a few months. After that, the colonoscopy findings set the timetable. [[Corley2017,Wolf2026]]`,
  hook:`Colonoscopy >10 months after a positive FIT: more CRC (OR 1.48 at 10–12 months) and more advanced stage. [[Corley2017]]`},
 {from:.775,at:.82,k:'Age 76–85',t:'Grade C: an individual choice',
  txt:`USPSTF 2021 recommends selectively offering screening at 76–85 (grade C), weighing overall health, prior screening and preferences; people never screened are more likely to benefit. ACS individualises at 76–85 and discourages screening over 85; USMSTF does not recommend it after 85. The ACP says stop after 75, or when life expectancy is 10 years or less. [[USPSTF2021,Wolf2018,Patel2022,Qaseem2023]]`,
  pt:`After 75, whether to keep screening depends on health and past results. After 85, screening is generally not recommended.`,
  hook:`ACS: continue through 75 if life expectancy is over 10 years; individualise 76–85; discourage over 85. [[Wolf2018]]`},
 {from:.93,at:1,k:'Lifetime',t:'Modelled totals per 1,000',
  txt:`In CISNET modelling for the USPSTF, screening strategies gave 171–381 life-years gained per 1,000 40-year-olds, averted 16–74 CRC cases and 15–32 CRC deaths per 1,000, and caused 5–22 complications per 1,000. Colonoscopy every 10 years from 45 to 75 needed 4,212–4,300 colonoscopies per 1,000; annual FIT needed 1,602–1,824. [[Knudsen2021]]`,
  pt:`Numbers like these describe 1,000 people over a lifetime, not what will happen to any one person. [[Bretthauer2022]]`,
  hook:`41 of the 49 strategies efficient in all 3 models began at age 45. [[Knudsen2021]]`}
];
inits.schedule=()=>{
  const ts=$('#shTime'),out=$('#shOut'),read=$('#shRead');
  const sel=id=>$('#'+id).value;
  /* tiny event glyphs */
  function glyph(x,y,ic,o={}){const c=o.col||'var(--accent)',h=o.hollow;
    if(ic==='t')return `<rect x="${f1(x-3.5)}" y="${f1(y-6)}" width="7" height="12" rx="2.5" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.4"/>`;
    if(ic==='b')return `<path d="M${f1(x)} ${f1(y-7)}C${f1(x+6)} ${f1(y)} ${f1(x+5)} ${f1(y+6)} ${f1(x)} ${f1(y+6)}C${f1(x-5)} ${f1(y+6)} ${f1(x-6)} ${f1(y)} ${f1(x)} ${f1(y-7)}Z" style="fill:${h?'var(--panel)':'var(--blood)'};stroke:var(--blood);stroke-width:1.3"/>`;
    if(ic==='c')return `<rect x="${f1(x-6)}" y="${f1(y-6)}" width="12" height="12" rx="2" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="2.8" style="fill:var(--panel)"/>`;
    if(ic==='s')return `<path d="M${f1(x-6)} ${f1(y+5)}L${f1(x)} ${f1(y-6)}L${f1(x+6)} ${f1(y+5)}Z" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.4"/>`;
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${o.r||6.5}" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.6"/>`}
  /* the guideline scenario from the inputs */
  function plan(){
    const risk=sel('shRisk'),tk=sel('shTest'),fk=sel('shLast'),ageL=+sel('shAge'),rel=+sel('shRel');
    const T=SH_TESTS[tk],F=SH_FIND[fk];
    const P={ev:[],band:null,esge:[],quotes:[],head:'',sub:'',minA:40,link:false,note:''};
    if(risk==='fap'){P.head='FAP: see the genetics module';P.sub='Our screening sources give no FAP schedule; FAP care is covered in 1.5.';P.link=true;P.quotes.push('The screening and surveillance sources used here do not cover FAP surveillance. Module 1.5 covers inherited syndromes.');return P}
    if(risk==='lynch12'||risk==='lynch6p'){const st=risk==='lynch12'?25:35;P.minA=20;
      P.ev.push({a:st,ic:'o',lab:'start '+st,big:true});
      P.head=`Colonoscopy surveillance from age ${st}`;P.sub='ESGE 2019; the repeat interval is not in our sources, so only the start is drawn.';P.link=true;
      P.quotes.push(`In Lynch syndrome, ESGE recommends colonoscopy surveillance from age 25 for MLH1 and MSH2 carriers and from age 35 for MSH6 and PMS2 carriers. [[vanLeerdam2019]]`);return P}
    let start=45,iv=T.iv,ic=T.ic,useCol=false;
    if(risk==='fdr60'){start=Math.min(40,rel-10);iv=5;ic='o';useCol=true;P.minA=Math.min(40,Math.floor((start-2)/5)*5);
      P.quotes.push(`USMSTF 2017: colonoscopy every 5 years, starting at 40 or 10 years before the youngest relative's diagnosis (whichever is earlier), for a first-degree relative with CRC or a documented advanced adenoma before 60, or two first-degree relatives at any age. [[Rex2017]]`);
      P.quotes.push(`ESGE defines familial risk as ≥2 first-degree relatives with CRC, or ≥1 diagnosed before 50, and recommends colonoscopy surveillance in those families. [[vanLeerdam2019]]`)}
    else if(risk==='fdr60p'){start=40;P.quotes.push(`USMSTF 2017: one first-degree relative diagnosed at ≥60 with CRC or an advanced adenoma → average-risk screening options, starting at age 40. [[Rex2017]]`)}
    else P.quotes.push(`USPSTF 2021: screen all adults aged 50–75 (A) and adults aged 45–49 (B); selectively offer screening at 76–85 (C). [[USPSTF2021]]`);
    if(!useCol)P.quotes.push(T.q);
    const scopeAt=fk==='none'?null:ageL;
    /* screening events up to the colonoscopy (or to 85) */
    const until=scopeAt==null?85:scopeAt;
    if(iv==null){if(start<until)P.ev.push({a:start,ic:'b',lab:'blood test'})}
    else for(let a=start;a<until-.01&&a<=85;a+=iv){P.ev.push({a,ic,hollow:a>75,past:scopeAt!=null});if(T.fit&&!useCol)for(let k=1;k<iv&&a+k<until&&a+k<=85;k++)P.ev.push({a:a+k,ic:'t',small:true,hollow:a+k>75,past:scopeAt!=null})}
    if(scopeAt!=null){
      P.ev.push({a:scopeAt,ic:'o',big:true,col:'var(--polyp)',lab:'colonoscopy: '+(fk==='normal'?'normal':'polyps')});
      const [lo,hi]=F.iv;
      P.band={a0:scopeAt+lo,a1:scopeAt+hi};
      P.ev.push({a:scopeAt+lo,ic:'o',lab:lo===hi?(lo<1?'+6 months':`+${lo} y`):`+${lo}–${hi} y`,next:true});
      if(F.after)P.ev.push({a:scopeAt+hi+F.after,ic:'o',hollow:true,dash:true,lab:`if normal: +${F.after} y`});
      else if(fk==='normal'||fk==='hp')for(let a=scopeAt+20;a<=85;a+=10)P.ev.push({a,ic:'o',hollow:true,dash:true});
      if(useCol)P.note='The family-history interval (5 years) and the polyp-based interval are both shown in the quotes; how to combine them is not covered by our sources.';
      const nx=scopeAt+lo;
      P.head=lo<1?'Repeat colonoscopy at 6 months':lo===hi?`Next colonoscopy in ${lo} years (age ${nx})`:`Next colonoscopy in ${lo}–${hi} years (age ${scopeAt+lo}–${scopeAt+hi})`;
      P.sub=`USMSTF 2020 after ${F.n}${F.ev?' ('+F.ev+')':''}.`;
      P.quotes.push(`USMSTF 2020 interval after ${F.n}: ${lo<1?'6 months':lo===hi?lo+' years':lo+'–'+hi+' years'}${F.ev?'; '+F.ev:''}. These intervals assume a complete, high-quality exam. [[Gupta2020]]`);
      if(F.after)P.quotes.push(`If the first surveillance colonoscopy is normal: next in ${F.after} years (USMSTF 2020). [[Gupta2020]]`);
      if(F.gen)P.quotes.push(`More than 10 adenomas: genetic testing may be needed (USMSTF 2020). [[Gupta2020]]`),P.link=true;
      if(F.esge==='none'){P.esge.push({a:scopeAt+10,lab:'back to screening (10 y if no programme)'});P.quotes.push(`ESGE 2020: completely removed 1–4 adenomas <10 mm with low-grade dysplasia, or serrated polyps <10 mm without dysplasia, need no surveillance; return to screening. [[Hassan2020]]`)}
      else if(F.esge===3){P.esge.push({a:scopeAt+3,lab:'3 y'});P.quotes.push(`ESGE 2020 also recommends surveillance at 3 years for this finding. [[Hassan2020]]`)}
      else if(F.esge==='pm'){P.esge.push({a:scopeAt+.375,lab:'3–6 mo'},{a:scopeAt+1.375,lab:'then +12 mo'});P.quotes.push(`ESGE 2020: after piecemeal resection of a lesion ≥20 mm, repeat at 3–6 months, then surveillance 12 months later. [[Hassan2020]]`)}
      if(scopeAt<start&&risk!=='fdr60')P.sub+=' (A colonoscopy before the usual start age is drawn as given.)';
    }else{
      const nx=P.ev.length?P.ev[0].a:start;
      P.head=useCol?`Colonoscopy every 5 years from age ${start}`:iv==null?`${T.n}: from age ${start}, only if the preferred tests are declined`:`${T.n} ${iv===1?'every year':'every '+iv+' years'} from age ${start}`;
      P.sub=risk==='avg'?'Through 75, then an individual decision at 76–85.':risk==='fdr60p'?'Average-risk options, starting at 40.':'Family history: colonoscopy, whatever test was selected.';
      if(risk==='avg'&&tk!=='blood')P.quotes.push(`ACS 2026 reaffirms starting at 45 and continuing through 75 when life expectancy is over 10 years. ACP 2023 starts at 50. [[Wolf2026,Qaseem2023]]`);
      P.ev.forEach(e=>{if(e===P.ev[0])e.lab='start '+e.a});
      void nx;
    }
    if(tk!=='col'&&!useCol)P.quotes.push(`A positive non-colonoscopy test needs a follow-up colonoscopy, preferably within 6 months (ACS 2026). [[Wolf2026]]`);
    return P}
  function drawT(){
    const N=vb(ts,'720 270','400 300'),P=plan();
    const A0=P.minA,A1=85,ax0=N?62:92,ax1=N?388:704,X=a=>ax0+(clamp(a,A0,A1)-A0)/(A1-A0)*(ax1-ax0);
    let s='';const lx=N?6:10;
    /* guideline bands */
    const by=N?28:30,bh=16;
    s+=`<text x="${lx}" y="${by+12}" class="t-xs" style="fill:var(--ink);font-weight:700">USPSTF</text>`;
    [[45,50,'B','var(--accent-soft)','var(--accent)'],[50,76,'A 50–75','var(--accent)','var(--on-brand)'],[76,85,'C 76–85','var(--panel-2)','var(--accent)']].forEach(([a,b,l,f,tc])=>{if(b<=A0)return;
      s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(b)-X(a)-1)}" height="${bh}" rx="3" style="fill:${f};stroke:var(--accent);stroke-width:.8"/><text x="${f1((X(a)+X(b))/2)}" y="${by+12}" class="t-xs t-mid" style="fill:${tc};font-weight:700">${l}</text>`});
    const ay=by+24;
    s+=`<text x="${lx}" y="${ay+12}" class="t-xs" style="fill:var(--ink);font-weight:700">ACP</text><rect x="${f1(X(50))}" y="${ay}" width="${f1(X(76)-X(50)-1)}" height="${bh}" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:.8"/><text x="${f1((X(50)+X(76))/2)}" y="${ay+12}" class="t-xs t-mid" style="fill:var(--ink)">50–75</text>`;
    /* scenario track */
    const ty=N?140:136;
    s+=`<text x="${lx}" y="${ty+4}" class="t-xs" style="fill:var(--ink);font-weight:700">${N?'Track':'Guideline track'}</text>`;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:3"/>`;
    if(P.band)s+=`<rect x="${f1(X(P.band.a0)-4)}" y="${ty-16}" width="${f1(Math.max(8,X(P.band.a1)-X(P.band.a0)+8))}" height="32" rx="8" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.4"/>`;
    let lastLab=-99,row=0;
    P.ev.filter(e=>e.a<=85.01).forEach(e=>{const x=X(e.a);
      if(e.dash)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ty-10}" y2="${ty+10}" style="stroke:var(--accent);stroke-dasharray:2 2"/>`;
      s+=`<g style="opacity:${e.past?.4:1}">${glyph(x,ty,e.small?'t':e.ic,{hollow:e.hollow,col:e.col||(e.next?'var(--good)':'var(--accent)'),r:e.big?8:6})}</g>`;
      if(e.lab){row=x-lastLab<(N?70:96)?1-row:0;lastLab=x;const ly=row?ty+30:ty-24;
        s+=`<text x="${f1(clamp(x,ax0+20,ax1-30))}" y="${ly}" class="t-xs t-mid" style="fill:${e.next?'var(--good)':e.col||'var(--ink)'};font-weight:700">${e.lab}</text>`}});
    if(P.link)s+=`<text x="${f1(X(A0)+4)}" y="${ty+52}" class="t-xs" style="fill:var(--brand)">→ see module 1.5, Lynch syndrome &amp; FAP</text>`;
    /* ESGE row */
    if(P.esge.length){const ey=ty+(N?60:58);s+=`<text x="${lx}" y="${ey+4}" class="t-xs" style="fill:var(--ink);font-weight:700">ESGE 2020</text><line x1="${ax0}" x2="${ax1}" y1="${ey}" y2="${ey}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:4 3"/>`;
      P.esge.forEach((e,i)=>{const x=X(e.a);s+=glyph(x,ey,'o',{col:'var(--rx)',r:5.5})+`<text x="${f1(clamp(x,ax0+30,ax1-60))}" y="${ey+(i%2?22:-12)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">${e.lab}</text>`})}
    /* axis */
    const yy=N?262:236;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${yy}" y2="${yy}" style="stroke:var(--muted)"/>`;
    for(let a=Math.ceil(A0/5)*5;a<=85;a+=5)s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${yy}" y2="${yy+5}" style="stroke:var(--muted)"/><text x="${f1(X(a))}" y="${yy+17}" class="t-xs t-mid">${a}</text>`;
    s+=`<text x="${ax1}" y="${yy-6}" class="t-xs t-end">age</text>`;
    ts.innerHTML=s;
    out.innerHTML=`<div class="kicker">What the guidelines say</div><h4>${P.head}</h4>${P.sub?`<p>${P.sub}</p>`:''}<ul>${P.quotes.map(q=>`<li>${q}</li>`).join('')}</ul>${P.note?`<p class="stage-cap">${P.note}</p>`:''}${P.link?'<button class="btn ghost" data-go="genes">Open 1.5 Lynch syndrome &amp; FAP →</button>':''}`;
    read.innerHTML=`<b>Key:</b> filled marks are tests within the recommended years; hollow marks fall at 76–85, where the decision is individual; faded marks are tests before the last colonoscopy; the green bracket is the next surveillance interval as published; dashed marks are later steps that depend on results.`;
    $('#shRel').disabled=sel('shRisk')!=='fdr60';$('#shAge').disabled=sel('shLast')==='none';
  }
  ['shRisk','shRel','shTest','shLast','shAge'].forEach(id=>$('#'+id).addEventListener('change',()=>{drawT();drawL(+rg.value)}));

  /* ---- lifetime animation: average risk, from 45, chosen test ---- */
  const ls=$('#shLife'),rg=$('#shT'),note=$('#shNote');
  function drawL(t){
    const N=vb(ls,'720 340','400 520'),tk=sel('shTest'),T=SH_TESTS[tk];
    const age=45+t*40,ax0=N?30:60,ax1=N?380:700,X=a=>ax0+(a-45)/40*(ax1-ax0);
    let s='';
    const by=N?40:40;
    [[45,50,'B','var(--accent-soft)','var(--accent)'],[50,76,'A','var(--accent)','var(--on-brand)'],[76,85,'C','var(--panel-2)','var(--accent)']].forEach(([a,b,l,f,tc])=>{
      s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(b)-X(a)-1)}" height="18" rx="3" style="fill:${f};stroke:var(--accent);stroke-width:.8;opacity:${age>=a?1:.35}"/><text x="${f1((X(a)+X(b))/2)}" y="${by+13}" class="t-xs t-mid" style="fill:${tc};font-weight:700;opacity:${age>=a?1:.4}">${l}</text>`});
    s+=`<text x="${ax0}" y="${by-10}" class="t-xs" style="fill:var(--ink);font-weight:700">USPSTF grade · ${T.n}</text>`;
    const gy=N?150:150;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${gy}" y2="${gy}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${ax0}" x2="${f1(X(age))}" y1="${gy}" y2="${gy}" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"/>`;
    for(let a=45;a<=85;a+=5)s+=`<text x="${f1(X(a))}" y="${gy+22}" class="t-xs t-mid" style="${Math.abs(a-age)<2.5?'fill:var(--ink);font-weight:700':''}">${a}</text>`;
    let done=0,opt=0;const ev=[];
    if(T.iv==null)ev.push({a:45,ic:'b'});else for(let a=45;a<=85;a+=T.iv){ev.push({a,ic:T.ic});if(T.fit)for(let k=1;k<T.iv&&a+k<=85;k++)ev.push({a:a+k,ic:'t',small:true})}
    ev.forEach(e=>{const on=age>=e.a,pop=bump(age,e.a,e.a+1.2),x=X(e.a),hollow=e.a>75;
      if(on){if(hollow)opt++;else done++}
      s+=`<g style="opacity:${on?1:.18}" transform="translate(${f1(x)} ${f1(gy-14-pop*10)}) scale(${f1(1+pop*.6)}) translate(${f1(-x)} ${f1(-(gy-14))})">${glyph(x,gy-14,e.small?'t':e.ic,{hollow,r:5})}</g>`});
    /* the person */
    const px=X(Math.min(age,85)),step=Math.sin(age*4)*2;
    s+=person(px,gy+28+step*.2,N?24:26,'var(--brand)');
    /* what-if branch at 58 */
    const wi=bump(t,.3,.46)>0?clamp(ramp(t,.3,.36)):0,keep=t>=.3&&t<.77;
    if(keep&&tk!=='col'){const x=X(58),x2=X(58.5);
      s+=`<g style="opacity:${f1(Math.min(1,wi*1.2))}"><path d="M${f1(x)} ${gy-14}Q${f1(x)} ${gy-58} ${f1(x2+30)} ${gy-62}" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-dasharray:4 3"/>${glyph(x2+38,gy-62,'o',{col:'var(--bad)'})}<text x="${f1(x2+50)}" y="${gy-66}" class="t-xs" style="fill:var(--bad);font-weight:700">what if positive?</text><text x="${f1(x2+50)}" y="${gy-54}" class="t-xs" style="fill:var(--bad)">colonoscopy, preferably ≤6 months</text></g>`}
    else if(keep){const x=X(55);s+=`<g style="opacity:${f1(wi)}"><path d="M${f1(x)} ${gy-20}Q${f1(x)} ${gy-58} ${f1(x+30)} ${gy-62}" style="fill:none;stroke:var(--polyp);stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(x+36)}" y="${gy-66}" class="t-xs" style="fill:var(--polyp-line);font-weight:700">what if polyps are found?</text><text x="${f1(x+36)}" y="${gy-54}" class="t-xs" style="fill:var(--polyp-line)">surveillance by findings (USMSTF 2020)</text></g>`}
    /* counter */
    const cy=N?250:236,cx=N?30:60;
    s+=`<text x="${cx}" y="${cy}" class="t-lbl">Age ${Math.floor(age)}</text><text x="${cx}" y="${cy+20}" class="t-sm" style="fill:var(--ink)">${T.iv==null?'blood test: interval not given in our sources':`${done} test${done===1?'':'s'} in the recommended years (45–75)`}</text>`;
    if(opt)s+=`<text x="${cx}" y="${cy+36}" class="t-sm">+ ${opt} optional at 76–85 (individual decision)</text>`;
    if(age>=85)s+=`<text x="${cx}" y="${cy+52}" class="t-sm" style="fill:var(--bad)">after 85: screening not recommended</text>`;
    /* modelled totals */
    const k=ramp(t,.93,1);
    if(k>0){const M=tk==='col'?[['4,212–4,300','colonoscopies'],['301–369','life-years gained'],['3–8','CRC deaths remaining']]:tk==='fit'?[['1,602–1,824','colonoscopies'],['291–348','life-years gained'],['6–10','CRC deaths remaining']]:null;
      const mx=N?30:400,my=N?340:226,w=N?340:300;
      s+=`<g style="opacity:${f1(k)}"><rect x="${mx-10}" y="${my-22}" width="${w}" height="${M?102:66}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${mx}" y="${my-4}" class="t-xs" style="fill:var(--ink);font-weight:700">Modelled per 1,000, screening 45–75 (CISNET)</text>`;
      if(M)M.forEach((m,i)=>{s+=`<text x="${mx}" y="${my+20+i*22}" class="t-lbl" style="fill:var(--accent)">${m[0]}</text><text x="${mx+(N?100:100)}" y="${my+20+i*22}" class="t-xs">${m[1]}</text>`});
      else s+=`<text x="${mx}" y="${my+16}" class="t-xs">This strategy's totals are not in our sources.</text><text x="${mx}" y="${my+30}" class="t-xs">All strategies: 171–381 life-years gained per 1,000.</text>`;
      s+='</g>'}
    ls.innerHTML=s;
    const ph=phaseOf(SH_STEPS,t);note.innerHTML=noteHTML(SH_STEPS[ph]);setSt(ph);
    rg.setAttribute('aria-valuetext','Age '+Math.floor(age));
  }
  const stop=playWire(rg,$('#shPlay'),drawL,20000,'Replay','schedule');
  const setSt=stepWire($('#shSteps'),SH_STEPS,rg,drawL,stop);
  drawT();drawL(+rg.value);
  const prevR=redraws.schedule;redraws.schedule=()=>{prevR&&prevR();drawT()};
};
