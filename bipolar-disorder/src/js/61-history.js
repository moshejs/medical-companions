/* =============== 6.1 History & people =============== */
/* milestones: y (year, 100 = 1st century AD), yl (label), who, t (short title), k (kind), txt (cited note) */
const HI_EV=[
 {y:100,yl:'1st c. AD',who:'Aretaeus of Cappadocia',t:'Two states of one disease',k:'idea',
  txt:`The Greek physician Aretaeus of Cappadocia was perhaps the first to describe mania and melancholia as two states of one disease. [[Angst2001]]`},
 {y:1854,yl:'1854',who:'Falret · Baillarger',t:'Folie circulaire',k:'idea',
  txt:`Baillarger lectured on "la folie à double forme" on 31 January 1854; Falret replied that he had already described "folie circulaire" and lectured on it on 14 February. The printed record supports Falret's priority. [[Pichot2004]] Falret described the "regular alternation of mania and melancholia". [[Haustgen2006]]`},
 {y:1893,yl:'1893',who:'Valentin Magnan',t:'Intermittent madness',k:'idea',
  txt:`Magnan's "intermittent madness" (1893) was a forerunner of Kraepelin's manic-depressive psychosis. [[Haustgen2006]]`},
 {y:1899,yl:'1899',who:'Emil Kraepelin',t:'Manic-depressive insanity',k:'idea',
  txt:`Kraepelin brought all types of affective disorder together as "manic-depressive insanity", a unitary concept adopted worldwide, [[Angst2001]] and set it apart from dementia praecox (later schizophrenia). [[Pichot2004]]`},
 {y:1949,yl:'1949',who:'John Cade',t:'Lithium for mania',k:'rx',
  txt:`Cade published "Lithium salts in the treatment of psychotic excitement" in the Medical Journal of Australia, reintroducing lithium after its mid-19th-century use had been forgotten. [[Cade1949,Shorter2009]]`},
 {y:1952,yl:'1952',who:'APA',t:'DSM-I',k:'dx',
  txt:`DSM-I classified "manic depressive reaction" as a psychotic disorder. [[Mason2016]]`},
 {y:1954,yl:'1954',who:'Mogens Schou and colleagues',t:'A controlled lithium trial',k:'rx',
  txt:`Schou and colleagues reported a randomly controlled trial of lithium salts in manic psychoses. [[Schou1954,Shorter2009]]`},
 {y:1957,yl:'1957',who:'Karl Leonhard',t:'Bipolar vs monopolar',k:'idea',
  txt:`Leonhard's classification of the endogenous psychoses distinguished bipolar from unipolar ("monopolar") forms. [[Haustgen2006,Perris1992]]`},
 {y:1966,yl:'1966',who:'Jules Angst · Carlo Perris',t:'Bipolar split from unipolar',k:'idea',
  txt:`Angst and Perris independently published family, clinical and course data separating bipolar from unipolar depression; Winokur's work supported the same split. [[Angst1966,Perris1966,Angst2001]] Falret's illness "regained its autonomy only in 1966". [[Pichot2004]]`},
 {y:1967,yl:'1967',who:'Baastrup · Schou',t:'Lithium to prevent episodes',k:'rx',
  txt:`Baastrup and Schou reported lithium as a preventive treatment against recurrent depression and manic-depressive psychosis, [[Baastrup1967]] followed in 1970 by a double-blind discontinuation trial in the Lancet. [[Baastrup1970]]`},
 {y:1968,yl:'1968',who:'APA',t:'DSM-II',k:'dx',
  txt:`DSM-II renamed the illness "manic-depressive illness" and placed it under the affective disorders. [[Mason2016]]`},
 {y:1970,yl:'1970',who:'United States',t:'Lithium reaches the US market',k:'rx',
  txt:`The United States became the 50th country to allow lithium onto the market. [[Shorter2009,Gajwani2006]]`},
 {y:1973,yl:'1973',who:'US approval',t:'Chlorpromazine',k:'rx',
  txt:`Chlorpromazine, a typical antipsychotic, was approved for bipolar disorder in 1973. [[Gajwani2006]]`},
 {y:1980,yl:'1980',who:'APA',t:'DSM-III: "bipolar disorder"',k:'dx',
  txt:`DSM-III introduced specific criteria and the term "bipolar disorder"; a manic episode alone became enough. "Bipolar II" appeared only as an example of atypical bipolar disorder. [[Mason2016]]`},
 {y:1994,yl:'1994',who:'APA · Bowden and colleagues',t:'DSM-IV, bipolar II, divalproex',k:'dx',
  txt:`DSM-IV introduced a stand-alone hypomanic episode, the building block of bipolar II, and a mixed episode. [[Mason2016]] In a 1994 trial in acute mania, 48% improved by at least half on divalproex, 49% on lithium and 25% on placebo; [[Bowden1994]] a review dates divalproex's US approval for mania to 1994. [[Gajwani2006]]`},
 {y:2000,yl:'2000–04',who:'US approvals',t:'Atypical antipsychotics',k:'rx',
  txt:`Olanzapine was approved for acute mania in 2000, followed by risperidone (2003), quetiapine, ziprasidone and aripiprazole (2004). [[Gajwani2006]] In the pivotal olanzapine trial, 48.6% responded against 24.2% on placebo. [[Tohen1999]]`},
 {y:2013,yl:'2013',who:'APA',t:'DSM-5',k:'dx',
  txt:`DSM-5 made increased activity or energy a required core symptom of mania and hypomania, and replaced the mixed episode with a "with mixed features" specifier. [[Mason2016]]`},
 {y:2019,yl:'2019',who:'PGC · WHO',t:'GWAS: 30 loci; ICD-11 approved',k:'gene',
  txt:`A genome-wide association study of 20,352 cases found 30 significant loci, 20 of them new. [[Stahl2019]] The World Health Assembly approved ICD-11 in May 2019. [[Reed2019]]`},
 {y:2021,yl:'2021',who:'Psychiatric Genomics Consortium',t:'GWAS: 64 loci',k:'gene',
  txt:`A GWAS of 41,917 cases and 371,549 controls found 64 loci, with risk genes enriched in synaptic signalling. [[Mullins2021]]`},
 {y:2022,yl:'2022',who:'WHO · APA',t:'ICD-11 in use; DSM-5-TR',k:'dx',
  txt:`WHO member states began reporting with ICD-11 on 1 January 2022, [[Reed2019]] and the APA published DSM-5-TR in March 2022. [[APA2022]]`},
 {y:2025,yl:'2025',who:'Multi-ancestry consortium',t:'GWAS: 298 loci',k:'gene',
  txt:`A multi-ancestry GWAS of 158,036 cases and about 2.8 million controls found 298 loci, a fourfold increase. [[OConnell2025]] See <a href="#genes" data-go="genes">Genes &amp; family risk</a>.`}
];
const HI_IX=y=>HI_EV.findIndex(e=>e.y===y)/(HI_EV.length-1);
const HI_STEPS=[
 {from:0,at:HI_IX(1854),k:'Antiquity to 1854',t:'Two states, one illness',
  txt:`An old idea gets a name. Aretaeus linked mania and melancholia in the 1st century AD, [[Angst2001]] and in 1854 two Paris psychiatrists described the same illness within two weeks of each other: Baillarger's "folie à double forme" and Falret's "folie circulaire". [[Pichot2004]] Bipolar II outpatients today often show the "biphasic" pattern they described, one episode followed straight away by its opposite: 80% of 206 people in one study. [[Benazzi2006]]`,
  pt:`Doctors have recognised for a very long time that highs and lows can belong to the same illness.`,
  hook:`1854: Falret's "folie circulaire" and Baillarger's "folie à double forme". [[Pichot2004]]`},
 {from:HI_IX(1893)-.001,at:HI_IX(1899),k:'1893–1899',t:'Kraepelin\'s unity',
  txt:`Kraepelin's 1899 "manic-depressive insanity" grouped all affective disorders together, and he drew the great divide between it and dementia praecox, mainly by the deterioration seen in the latter. [[Angst2001,Pichot2004]] His own case histories counted Schneiderian psychotic symptoms and catatonia as consistent with the diagnosis. [[Kendler2021]]`,
  pt:`Kraepelin put all mood illnesses under one name and separated them from what we now call schizophrenia.`,
  hook:`Kraepelin 1899: "manic-depressive insanity", a unitary concept. [[Angst2001]]`},
 {from:HI_IX(1949)-.001,at:HI_IX(1954),k:'1949–1954',t:'Lithium arrives',
  txt:`In 1949 John Cade reported lithium salts for "psychotic excitement", and in 1954 Schou's group tested lithium in a randomly controlled trial. [[Cade1949,Schou1954,Shorter2009]] Between them, DSM-I (1952) still called the illness a "manic depressive reaction", a psychotic disorder. [[Mason2016]]`,
  pt:`Lithium, first used for mania in 1949, is still one of the best-studied treatments.`,
  hook:`Cade 1949: lithium for mania. Schou 1954: a controlled trial. [[Cade1949,Schou1954]]`},
 {from:HI_IX(1957)-.001,at:HI_IX(1966),k:'1957–1973',t:'Bipolar vs unipolar',
  txt:`Leonhard (1957) split bipolar from monopolar forms, and in 1966 Angst and Perris independently showed different heredity, clinical picture and course. [[Haustgen2006,Angst1966,Perris1966,Angst2001]] Lithium moved from treating episodes to preventing them (Baastrup and Schou, 1967), and in 1970 the US became the 50th country to allow it. [[Baastrup1967,Shorter2009]]`,
  pt:`Around 1966 researchers showed that illness with highs and lows behaves differently from depression alone, in families and over time.`,
  hook:`1966: Angst and Perris separate bipolar from unipolar depression. 1970: US lithium approval. [[Pichot2004,Shorter2009]]`},
 {from:HI_IX(1980)-.001,at:HI_IX(1994),k:'1980–2013',t:'The criteria era',
  txt:`DSM-III (1980) brought the term "bipolar disorder" and explicit criteria; DSM-IV (1994) made hypomania a stand-alone episode, creating bipolar II as a diagnosis; DSM-5 (2013) required increased energy or activity. [[Mason2016]] New medicines followed: divalproex (1994) and the atypical antipsychotics from 2000. [[Bowden1994,Gajwani2006]]`,
  pt:`The modern name "bipolar disorder" dates from 1980, and bipolar II became its own diagnosis in 1994.`,
  hook:`DSM-III 1980: "bipolar disorder". DSM-IV 1994: bipolar II. DSM-5 2013: energy/activity criterion. [[Mason2016]]`},
 {from:HI_IX(2019)-.001,at:HI_IX(2025),k:'2019–2025',t:'Genes and today',
  txt:`Genome-wide studies grew from 30 loci (2019) to 64 (2021) to 298 (2025). [[Stahl2019,Mullins2021,OConnell2025]] ICD-11 came into use in 2022 and keeps the bipolar I / II split, in line with DSM-5; DSM-5-TR followed the same year. [[Reed2019,Angst2020ICD11,APA2022]]`,
  pt:`Genes add to risk in small steps, through hundreds of common variants; no single gene causes bipolar disorder.`,
  hook:`GWAS loci: 30 (2019) → 64 (2021) → 298 (2025). [[Stahl2019,Mullins2021,OConnell2025]]`}
];
/* names comparator: which forms each name grouped. bp = alternating mania & depression; uni = depression only; bp2 = hypomania & depression.
   st: 'in' (inside the umbrella), 'out' (named separately), 'faint' (not named), 'split' (its own diagnosis) */
const HI_NAMES=[
 {n:'Folie circulaire',yr:'1854 · Falret',um:'folie circulaire',bp:'in',uni:'faint',bp2:'faint',mix:0,
  txt:`Falret's "folie circulaire" named the "regular alternation of mania and melancholia". He hinted that brief hypomanias at the end of depressions might be mild forms of it, an early idea of the bipolar spectrum. [[Haustgen2006]] Baillarger's "folie à double forme" described manic and depressive episodes in the same patient. [[Pichot2004]]`},
 {n:'Manic-depressive insanity',yr:'1899 · Kraepelin',um:'manic-depressive insanity',bp:'in',uni:'in',bp2:'in',mix:1,
  txt:`Kraepelin brought all types of affective disorder together, recurrent depression included, [[Angst2001]] and stressed mixed states and an emotional disposition seen between episodes and in relatives. [[Kendler2021]] Falret's folie circulaire became one of its forms. [[Pichot2004]]`},
 {n:'Manic depressive reaction',yr:'1952 · DSM-I',um:'manic depressive reaction (a psychotic disorder)',bp:'in',uni:'in',bp2:'faint',mix:0,
  txt:`DSM-I classified "manic depressive reaction" as a psychotic disorder. [[Mason2016]]`},
 {n:'Bipolar vs unipolar',yr:'1957–1966 · Leonhard, Angst, Perris',um:'bipolar',bp:'in',uni:'out',bp2:'faint',mix:0,
  txt:`Leonhard distinguished bipolar from monopolar forms in 1957, [[Haustgen2006,Perris1992]] and Angst and Perris showed in 1966 that the two differ in heredity and course. [[Angst1966,Perris1966,Pichot2004]]`},
 {n:'Manic-depressive illness',yr:'1968 · DSM-II',um:'manic-depressive illness (affective disorders)',bp:'in',uni:'in',bp2:'faint',mix:0,
  txt:`DSM-II renamed it "manic-depressive illness" and moved it under the affective disorders. [[Mason2016]]`},
 {n:'Bipolar disorder',yr:'1980 · DSM-III',um:'bipolar disorder',bp:'in',uni:'out',bp2:'faint',mix:0,
  txt:`DSM-III introduced the term "bipolar disorder" with specific criteria; a manic episode alone became enough. "Bipolar II" was mentioned only as an example of atypical bipolar disorder. [[Mason2016]]`},
 {n:'Bipolar I & II',yr:'1994 · DSM-IV',um:'bipolar disorders',bp:'in',uni:'out',bp2:'split',mix:1,
  txt:`DSM-IV's stand-alone hypomanic episode made bipolar II a diagnosis of its own, and it added a mixed episode. [[Mason2016]]`},
 {n:'DSM-5 & ICD-11',yr:'2013–2022',um:'bipolar and related disorders',bp:'in',uni:'out',bp2:'split',mix:1,
  txt:`DSM-5 made increased energy or activity a core symptom and turned the mixed episode into a "with mixed features" specifier. [[Mason2016]] ICD-11 keeps the type I / type II split based on mania versus hypomania. [[Angst2020ICD11]]`}
];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),read=$('#hiRead'),chips=$('#hiYears');
  const n=HI_EV.length;
  const KC={idea:'var(--brand)',rx:'var(--rx)',dx:'var(--dx)',gene:'var(--accent)'};
  const KN={idea:'ideas',rx:'treatment',dx:'manuals',gene:'genetics'};
  chips.innerHTML=HI_EV.map((e,i)=>`<button class="tag" data-hy="${i}" aria-pressed="false">${e.yl}</button>`).join('');
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const t=+b.dataset.hy/(n-1);rg.value=t;draw(t)});
  /* wide axis: antiquity squeezed into a short stub, 1845–2028 linear */
  const XW=y=>y<1000?70:lerp(140,700,(y-1845)/(2028-1845));
  const setActive=stepWire($('#hiSteps'),HI_STEPS,rg,draw,()=>stop());
  let lastI=-1;
  function draw(t){const N=vb(svg,'720 320','400 640');const pos=t*(n-1),i=Math.min(n-1,Math.round(pos)),E=HI_EV[i];let s='';
    s+=`<defs>${marker('hiAr','var(--muted)')}</defs>`;
    if(!N){
      /* card */
      s+=`<rect x="20" y="18" width="680" height="128" rx="14" style="fill:var(--panel-2)"/>`;
      s+=`<text x="40" y="70" style="font:800 46px var(--display);fill:${KC[E.k]}">${E.yl}</text>`;
      s+=`<text x="${E.yl.length>6?290:200}" y="52" class="t-big" style="font-size:20px">${E.t}</text>`;
      s+=`<text x="${E.yl.length>6?290:200}" y="76" class="t-sm" style="fill:var(--ink)">${E.who}</text>`;
      s+=`<rect x="${E.yl.length>6?290:200}" y="92" width="${KN[E.k].length*7+16}" height="18" rx="5" style="fill:${KC[E.k]};opacity:.18"/><text x="${(E.yl.length>6?290:200)+8}" y="105" class="t-xs" style="fill:${KC[E.k]};font-weight:600">${KN[E.k]}</text>`;
      s+=`<text x="40" y="132" class="t-xs">milestone ${i+1} of ${n}</text>`;
      /* axis */
      const ay=240;
      s+=`<line x1="50" x2="96" y1="${ay}" y2="${ay}" class="axis"/><path d="M100 ${ay-8}l8 16M108 ${ay-8}l8 16" style="stroke:var(--muted);stroke-width:1.2"/><line x1="120" x2="706" y1="${ay}" y2="${ay}" class="axis"/>`;
      [1850,1900,1950,2000].forEach(y=>{const x=XW(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay}" y2="${ay+6}" class="axis"/><text x="${f1(x)}" y="${ay+20}" class="t-xs t-mid">${y}</text>`});
      s+=`<text x="70" y="${ay+20}" class="t-xs t-mid">AD 100</text>`;
      /* playhead year */
      const i0=Math.floor(pos),i1=Math.min(n-1,i0+1),fr=pos-i0,px=lerp(XW(HI_EV[i0].y),XW(HI_EV[i1].y),fr);
      s+=`<rect x="50" y="${ay-3}" width="${f1(px-50)}" height="6" rx="3" style="fill:var(--brand);opacity:.35"/>`;
      /* milestones: dots, with the current one labelled */
      HI_EV.forEach((e,k)=>{const x=XW(e.y),lit=k<=pos+.001,cur=k===i;
        s+=`<circle cx="${f1(x)}" cy="${ay}" r="${cur?7.5:4.5}" style="fill:${lit?KC[e.k]:'var(--panel)'};stroke:${KC[e.k]};stroke-width:1.5;opacity:${cur||lit?1:.7}"/>`});
      {const x=XW(E.y),anc=x<170?'start':x>600?'end':'middle',tx=x<170?x-8:x>600?x+8:x;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay-10}" y2="${ay-44}" style="stroke:${KC[E.k]};stroke-width:1.2"/>`;
        s+=`<text x="${f1(tx)}" y="${ay-66}" style="font:800 15px var(--display);fill:${KC[E.k]};text-anchor:${anc}">${E.yl}</text>`;
        s+=`<text x="${f1(tx)}" y="${ay-50}" class="t-xs" style="fill:var(--ink);text-anchor:${anc}">${E.t}</text>`}
      s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${ay-30}" y2="${ay+14}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3"/>`;
      /* legend */
      Object.keys(KC).forEach((k,j)=>{const x=40+j*120;s+=`<circle cx="${x}" cy="300" r="5" style="fill:${KC[k]}"/><text x="${x+10}" y="304" class="t-xs">${KN[k]}</text>`});
    }else{
      /* card on top, vertical list below with a moving play head */
      s+=`<rect x="10" y="10" width="380" height="118" rx="12" style="fill:var(--panel-2)"/>`;
      s+=`<text x="24" y="54" style="font:800 34px var(--display);fill:${KC[E.k]}">${E.yl}</text>`;
      s+=`<text x="24" y="82" class="t-big">${E.t}</text>`;
      s+=`<text x="24" y="104" class="t-sm" style="fill:var(--ink)">${E.who}</text>`;
      s+=`<text x="376" y="30" class="t-xs t-end">${i+1} / ${n}</text>`;
      const y0=156,dy=22.6,ax=58;
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${y0+dy*(n-1)}" class="axis"/>`;
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${f1(y0+dy*pos)}" style="stroke:var(--brand);stroke-width:5;opacity:.35;stroke-linecap:round"/>`;
      HI_EV.forEach((e,k)=>{const y=y0+k*dy,lit=k<=pos+.001,cur=k===i;
        s+=`<circle cx="${ax}" cy="${f1(y)}" r="${cur?6.5:4}" style="fill:${lit?KC[e.k]:'var(--panel)'};stroke:${KC[e.k]};stroke-width:1.4"/>`;
        s+=`<text x="${ax-12}" y="${f1(y+3.5)}" class="t-xs t-end" style="fill:${lit?'var(--ink)':'var(--muted)'};${cur?'font-weight:700':''}">${e.yl==='1st c. AD'?'AD 100':e.yl.replace('2000–04','2000')}</text>`;
        s+=`<text x="${ax+14}" y="${f1(y+4)}" class="${cur?'t-lbl':'t-xs'}" style="${cur?'font-size:12.5px':''};fill:${lit?(cur?'var(--ink)':'var(--ink)'):'var(--muted)'};opacity:${lit?1:.6}">${e.t}</text>`});
      s+=`<path d="M${ax-20} ${f1(y0+dy*pos)}h10" style="stroke:var(--ink);stroke-width:1.4"/>`;
    }
    svg.innerHTML=s;
    const ph=phaseOf(HI_STEPS,t);setActive(ph);note.innerHTML=noteHTML(HI_STEPS[ph]);
    if(i!==lastI){lastI=i;read.innerHTML=`<b class="yr">${E.yl} · ${E.who}</b><span>${E.txt}</span>`;
      $$('[data-hy]',chips).forEach((b,k)=>b.setAttribute('aria-pressed',k===i))}}
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'%t:player.replay%','history');
  draw(+rg.value);

  /* ---- how the name changed ---- */
  const nsvg=$('#hiNameSvg'),nnote=$('#hiNameNote'),nb=$('#hiNames');let sel=1,from=null,cur=null,stopN=null;
  nb.innerHTML=HI_NAMES.map((h,i)=>`<button class="btn" data-nm="${i}" aria-pressed="${i===sel}">${h.n}</button>`).join('');
  /* a layout for each state: circle centres/radii in a 720x300 (wide) or 400x420 (narrow) frame */
  function lay(h,N){const W=N?400:720,C=(x,y,r,op=1)=>({x:W*x,y,r,op});let P;
    const g=h.uni==='in',sp=h.bp2==='split';
    if(!N){
      if(g)P={bp:C(.33,118,62),uni:C(.6,118,58),bp2:C(.465,226,44,h.bp2==='faint'?.25:1)};
      else if(sp)P={bp:C(.24,150,62),bp2:C(.46,160,52),uni:C(.8,150,58)};
      else P={bp:C(.32,140,62),bp2:C(.54,214,44,.22),uni:C(.8,140,58,h.uni==='faint'?.25:1)};
    }else{
      if(g)P={bp:C(.3,110,56),uni:C(.72,110,52),bp2:C(.5,214,42,h.bp2==='faint'?.25:1)};
      else if(sp)P={bp:C(.3,120,56),bp2:C(.68,128,46),uni:C(.5,316,52)};
      else P={bp:C(.36,120,56),bp2:C(.72,190,42,.22),uni:C(.5,316,52,h.uni==='faint'?.25:1)};
    }
    return P}
  const HI_LBL={bp:['mania +','depression'],uni:['depression','only'],bp2:['hypomania +','depression']};
  function circ(c,col,k,sub){const L=HI_LBL[k];return `<g style="opacity:${f1(c.op)}"><circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(c.r)}" style="fill:${col};fill-opacity:.18;stroke:${col};stroke-width:1.6"/><text x="${f1(c.x)}" y="${f1(c.y-8)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${L[0]}</text><text x="${f1(c.x)}" y="${f1(c.y+4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${L[1]}</text><text x="${f1(c.x)}" y="${f1(c.y+18)}" class="t-xs t-mid">${sub}</text></g>`}
  function drawName(P,h,N){const W=N?400:720;let s='';
    const inn=['bp','uni','bp2'].filter(k=>h[k]==='in'||(k==='bp2'&&h.bp2==='split'));
    /* umbrella around grouped forms */
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;inn.forEach(k=>{const c=P[k];x0=Math.min(x0,c.x-c.r);x1=Math.max(x1,c.x+c.r);y0=Math.min(y0,c.y-c.r);y1=Math.max(y1,c.y+c.r)});
    const pad=16;s+=`<rect x="${f1(x0-pad)}" y="${f1(y0-pad-6)}" width="${f1(x1-x0+2*pad)}" height="${f1(y1-y0+2*pad+6)}" rx="26" style="fill:none;stroke:var(--brand);stroke-width:2;stroke-dasharray:7 5"/>`;
    s+=`<text x="${f1(x0-pad+12)}" y="${f1(y0-pad-12)}" class="t-sm" style="fill:var(--brand);font-weight:600">${h.um}</text>`;
    s+=circ(P.bp,'var(--up-fill)','bp',h.bp2==='split'?'bipolar I':'alternating');
    s+=circ(P.uni,'var(--down-fill)','uni',h.uni==='out'?'unipolar, apart':h.uni==='faint'?'not included':'recurrent');
    s+=circ(P.bp2,'var(--mixed-fill)','bp2',h.bp2==='split'?'bipolar II':'not yet named');
    if(h.mix)s+=`<text x="${f1(P.bp.x)}" y="${f1(P.bp.y-P.bp.r-6)}" class="t-xs t-mid" style="fill:var(--mixed);font-weight:600">${h.yr.includes('2013')?'+ mixed features specifier':h.yr.includes('1994')?'+ mixed episode':'+ mixed states'}</text>`;
    s+=`<text x="${N?20:W-20}" y="${N?408:290}" class="t-sm ${N?'':'t-end'}" style="fill:var(--ink)">${h.yr}</text>`;
    nsvg.innerHTML=s}
  function mix(A,B,p){const o={};for(const k in B)o[k]={x:lerp(A[k].x,B[k].x,p),y:lerp(A[k].y,B[k].y,p),r:lerp(A[k].r,B[k].r,p),op:lerp(A[k].op,B[k].op,p)};return o}
  function showName(i,anim){const N=vb(nsvg,'720 300','400 420'),h=HI_NAMES[i],to=lay(h,N);
    if(stopN)stopN();
    if(anim&&cur&&cur.N===N){const A=cur.P;stopN=animate(520,p=>{const P=mix(A,to,ease(p));cur={P,N};drawName(P,h,N)})}
    else{cur={P:to,N};drawName(to,h,N)}
    nnote.innerHTML=`<div class="kicker">${h.yr}</div><h4>${h.n}</h4><p>${h.txt}</p>`}
  nb.addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;sel=+b.dataset.nm;$$('[data-nm]',nb).forEach((x,k)=>x.setAttribute('aria-pressed',k===sel));showName(sel,true)});
  showName(sel,false);
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();showName(sel,false)};
};
