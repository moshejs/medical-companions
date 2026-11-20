/* =============== 6.1 History & people =============== */
/* events: year, mode (s science, c community, b both), name, two short card lines, the full sentence with its citation */
const HI_EV=[
 {y:1911,m:'s',n:'Eugen Bleuler',a:'coins "autism"',b:'a term within schizophrenia',x:`Bleuler introduces "autism" as a term within schizophrenia, one of his "4 A's". [[Gundel1993,Moskowitz2011]]`},
 {y:1926,m:'s',n:'Grunya Sukhareva',a:'describes autistic children',b:'in Kyiv; long overlooked',x:`Sukhareva publishes detailed descriptions of children with autistic traits, almost two decades before Kanner and Asperger. [[Manouilenko2015,Pozzi2024]]`},
 {y:1943,m:'s',n:'Leo Kanner',a:'11 children, Baltimore',b:'"early infantile autism"',x:`Kanner publishes "Autistic disturbances of affective contact", the first systematic description of early infantile autism, based on 11 children. [[Kanner1968,Kanner1971]]`},
 {y:1944,m:'s',n:'Hans Asperger',a:'"autistic psychopaths"',b:'Vienna; first described 1938',x:`Asperger's full study of "autistic psychopaths" is published in Vienna; it found international recognition only in the 1980s. [[Asperger1944,Czech2018]]`},
 {y:1958,m:'b',n:'Bruno Bettelheim',a:'the "refrigerator mother"',b:'blames mothers; now rejected',x:`Bettelheim holds the "refrigerator mother" responsible for her child's autism; his solution is to remove the mother. [[vanRosmalen2020]]`},
 {y:1964,m:'b',n:'Bernard Rimland',a:'psychologist and parent',b:'argues for a neural basis',x:`Rimland's "Infantile Autism" argues for a biological, neural basis. [[Cowie1965]]`},
 {y:1967,m:'c',n:'"The Empty Fortress"',a:'Bettelheim\'s book',b:'reviewed in JAMA',x:`Bettelheim's "The Empty Fortress: Infantile Autism and the Birth of the Self" is reviewed in JAMA. [[Chess1967]]`},
 {y:1971,m:'s',n:'Kanner follow-up',a:'the 11 children',b:'followed up in adulthood',x:`Kanner publishes a follow-up of the 11 children first reported in 1943. [[Kanner1971]]`},
 {y:1979,m:'s',n:'Wing & Gould',a:'Camberwell survey',b:'the spectrum idea',x:`Wing and Gould propose classifying by the quality of social interaction, laying the groundwork for the spectrum idea. [[WingGould1979]]`},
 {y:1980,m:'s',n:'DSM-III',a:'an official category',b:'first time in the APA manual',x:`Autism enters DSM-III as an official diagnostic category for the first time. [[Rosen2021]]`},
 {y:1981,m:'s',n:'Lorna Wing',a:'"Asperger\'s syndrome"',b:'brought to English readers',x:`Wing's "Asperger's syndrome: a clinical account" brings Asperger's work to English-language readers. [[Wing1981]]`},
 {y:1994,m:'s',n:'DSM-IV',a:'adds Asperger\'s disorder',b:'beside autistic disorder',x:`DSM-IV adds Asperger's disorder. [[BarahonaCorrea2015,Fuentes2021ESCAP]]`},
 {y:1998,m:'s',n:'Wakefield paper',a:'MMR, 12 children',b:'retracted 2010; fraudulent',x:`A 12-child case series in The Lancet suggests a link between MMR and regression; it is retracted in 2010 and judged fraudulent in 2011. [[Wakefield1998,Lancet2010Retraction,Godlee2011]]`},
 {y:1998.5,m:'c',n:'Neurodiversity',a:'often credited to J. Singer',b:'developed collectively',x:`The neurodiversity concept, often credited to Judy Singer in the late 1990s, was "collectively developed by neurodivergent people". [[Botha2024]]`},
 {y:2010,m:'s',n:'The Lancet',a:'retracts the 1998 paper',b:'BMJ: "fraudulent" (2011)',x:`The Lancet retracts the 1998 paper; the BMJ concludes it was fraudulent. [[Lancet2010Retraction,Godlee2011]]`},
 {y:2012,m:'c',n:'Damian Milton',a:'the double empathy problem',b:'an autistic sociologist',x:`Milton describes the "double empathy problem": a two-way mismatch, not a one-sided deficit. [[Milton2012]]`},
 {y:2013,m:'s',n:'DSM-5',a:'autism spectrum disorder',b:'the subtypes merged',x:`DSM-5 merges Asperger's disorder and the other subtypes into one category, autism spectrum disorder. [[BarahonaCorrea2015,APA2013]]`},
 {y:2013.4,m:'c',n:'Kapp and colleagues',a:'"deficit, difference, or both?"',b:'657 people surveyed',x:`Identifying as autistic and knowing about neurodiversity go with seeing autism as an identity "that needs no cure". [[Kapp2013]]`},
 {y:2016,m:'c',n:'Kenny and colleagues',a:'which words to use?',b:'3,470 people, UK',x:`A UK survey finds that autistic people, families and professionals endorse different terms. [[Kenny2016]]`},
 {y:2017,m:'c',n:'M. A. Gernsbacher',a:'person-first language',b:'"may accentuate stigma"',x:`Person-first language in scholarly writing "may actually accentuate stigma". [[Gernsbacher2017]]`},
 {y:2018,m:'s',n:'Herwig Czech',a:'Asperger\'s Nazi-era record',b:'archival study',x:`Czech's archival study shows Asperger cooperated with Nazi race-hygiene policy. [[Czech2018]]`},
 {y:2018.4,m:'c',n:'Puzzle-piece study',a:'negative associations',b:'400 members of the public',x:`Puzzle pieces evoke "incompleteness, imperfection, and oddity". [[Gernsbacher2018Puzzle]]`},
 {y:2019,m:'s',n:'Danish MMR cohort',a:'657,461 children',b:'no link to autism',x:`A nationwide Danish cohort finds no increased autism risk after MMR (adjusted HR 0.93). [[Hviid2019]]`},
 {y:2019.3,m:'c',n:'J. den Houting',a:'"an insider\'s perspective"',b:'acceptance with support',x:`An autistic researcher describes neurodiversity as accepting autism as natural variation while still supporting people with their disabilities. [[denHouting2019]]`},
 {y:2020,m:'c',n:'Raymaker and colleagues',a:'autistic burnout defined',b:'from autistic adults\' accounts',x:`Autistic adults describe autistic burnout: chronic exhaustion, loss of skills, reduced tolerance to stimuli. [[Raymaker2020]]`},
 {y:2021,m:'c',n:'Bottema-Beutel et al.',a:'avoiding ableist language',b:'suggested alternatives',x:`Researchers propose alternatives to ableist terms, such as "co-occurring" for "comorbid". [[BottemaBeutel2021Ableist]]`},
 {y:2022,m:'b',n:'Lancet Commission',a:'autistic people, parents',b:'among 32 authors',x:`The Lancet Commission, written by 32 authors including autistic people and parents, calls for personalised, stepped care and proposes "profound autism". [[Lord2022Lancet,Yu2022]]`},
 {y:2022.3,m:'s',n:'ICD-11 · DSM-5-TR',a:'ICD-11 in use from 1 Jan',b:'DSM-5-TR published',x:`ICD-11, approved in May 2019, comes into use on 1 January 2022; DSM-5-TR is published. [[Reed2019ICD11,APA2022]]`},
 {y:2023,m:'c',n:'Keating and colleagues',a:'654 autistic adults',b:'language across countries',x:`Autistic adults across English-speaking countries favour "autistic person"; the guiding principle is to respect personal preference. [[Keating2023]]`},
 {y:2024,m:'c',n:'Botha and colleagues',a:'"an overdue correction"',b:'neurodiversity\'s origins',x:`Botha and colleagues set out archival evidence that "neurological diversity" was in use before the late 1990s. [[Botha2024]]`},
 {y:2025,m:'c',n:'Crompton and colleagues',a:'replication, N = 311',b:'double empathy retested',x:`A larger replication finds no difference in information transfer between same- and mixed-neurotype chains. [[Crompton2025]]`}];
const HI_BAND=[{a:1911,b:1943,l:'"autism": a symptom of schizophrenia',s:'a symptom'},{a:1943,b:1980,l:'early infantile autism (Kanner)',s:'infantile autism'},{a:1980,b:1994,l:'DSM-III autism',s:'DSM-III'},
 {a:1994,b:2013,l:'DSM-IV: autistic disorder, Asperger\'s, PDD-NOS',s:'DSM-IV subtypes'},{a:2013,b:2025,l:'autism spectrum disorder',s:'ASD'}];
const HI_C=['var(--muted)','var(--gold)','var(--accent)','var(--neuro)','var(--brand)'];
const hiT=y=>(y-1910)/115;
const HI_STEPS_S=[
 {from:0,at:hiT(1926.2),k:'1911–1926',t:'Naming it',
  txt:`In 1911 the Swiss psychiatrist Eugen Bleuler introduced "autism" as a term within schizophrenia, one of his "4 A's" (association, affect, ambivalence, autism). In 1926 Grunya Sukhareva, a child psychiatrist in Kyiv, described children with autistic traits, first as "schizoid (eccentric) psychopathy". Her paper was long overlooked; an English translation appeared in 1996. [[Gundel1993,Moskowitz2011,Manouilenko2015,Ssucharewa1996]]`,
  pt:`The word "autism" is older than the diagnosis: at first it described a symptom of schizophrenia.`,
  hook:`Bleuler coined "autism" in 1911; Sukhareva described autistic children in 1926, before Kanner (1943) and Asperger (1944). [[Gundel1993,Manouilenko2015]]`},
 {from:hiT(1937.5),at:hiT(1944.3),k:'1938–1944',t:'Kanner and Asperger',
  txt:`Kanner examined the first child of his series in 1938 and in 1943 described 11 children who "have come into the world with an innate inability to form the usual, biologically provided contact with people". Calling children "autistic" was not new; an inborn condition distinct from childhood schizophrenia was. In Vienna, Hans Asperger described "autistic psychopaths" in 1938 and published his full study in 1944. [[Olmsted2016,Harris2018Kanner,Vicedo2021,Czech2018]]`,
  pt:`Two doctors on two continents described autistic children within a year of each other.`,
  hook:`Kanner 1943: 11 children; follow-up published 1971. Asperger 1944, recognised internationally only in the 1980s. [[Kanner1971,Czech2018]]`},
 {from:hiT(1956),at:hiT(1964.6),k:'1958–1967',t:'Blame, then biology',
  txt:`In 1958 Bruno Bettelheim held the "refrigerator mother" responsible for her child's autism. In 1964 Bernard Rimland, a psychologist and parent, argued for a biological, neural basis. Parent-blaming theories are now rejected: a Swedish reanalysis estimated heritability at about 83%. Historians add that the usual story of biology "supplanting" blame is simplified. <span class="ev est">Established</span> [[vanRosmalen2020,Cowie1965,Sandin2017,Lord2018,Jacobsen2010]]`,
  pt:`Parents do not cause autism through how they love or raise their child. The "refrigerator mother" idea was wrong.`,
  hook:`Heritability of autism: about 83% (Swedish cohort reanalysis). [[Sandin2017]]`},
 {from:hiT(1976),at:hiT(1981.4),k:'1960s–1981',t:'A spectrum',
  txt:`In 1960s Britain, researchers such as Victor Lotter and Michael Rutter turned autism into an epidemiological category. In 1979 Lorna Wing and Judith Gould found that children with Kanner's autism shared many features with other socially impaired children, and proposed classification by quality of social interaction. Autism became an official DSM-III category in 1980, and in 1981 Wing brought Asperger's syndrome to English-language readers. [[Evans2013,WingGould1979,Rosen2021,Wing1981]]`,
  pt:`Instead of one narrow box, researchers began to see a wide family of related ways of being.`,
  hook:`Wing and Gould (1979): the Camberwell study and the spectrum idea; DSM-III (1980): first official category. [[WingGould1979,Rosen2021]]`},
 {from:hiT(1992),at:hiT(2013.2),k:'1994–2013',t:'Split, then lumped',
  txt:`DSM-IV added Asperger's disorder in 1994, beside autistic disorder, childhood disintegrative disorder and PDD-NOS. A fraudulent 1998 paper launched the MMR scare; it was retracted in 2010. DSM-5 (2013) merged the subtypes into autism spectrum disorder, "a significant departure" that swung from "splitting" back to "lumping". [[BarahonaCorrea2015,Fuentes2021ESCAP,Wakefield1998,Lancet2010Retraction,Volkmar2014]]`,
  pt:`For almost 20 years autism had several separate names. Since 2013, doctors use one umbrella term.`,
  hook:`DSM-III 1980, first category; DSM-IV 1994, adds Asperger's; DSM-5 2013, one autism spectrum disorder. [[Rosen2021,BarahonaCorrea2015]]`},
 {from:hiT(2016),at:1,k:'2018–2025',t:'Now',
  txt:`In 2018 Herwig Czech showed from archives that Asperger joined Nazi-affiliated organisations, legitimised race hygiene and cooperated with the child "euthanasia" programme. ICD-11, approved in 2019, came into use on 1 January 2022, the year DSM-5-TR appeared and the Lancet Commission called for personalised, stepped care with more appreciation of neurodiversity. [[Czech2018,Reed2019ICD11,APA2022,Lord2022Lancet,Yu2022]]`,
  pt:`Today one name is used in both major manuals, and history is being re-read, including who deserves credit.`,
  hook:`ICD-11: approved May 2019, in use from 1 January 2022; DSM-5-TR: 2022. [[Reed2019ICD11,APA2022]]`}];
const HI_STEPS_C=[
 {from:0,at:hiT(1967.3),k:'1958–1967',t:'Parents push back',
  txt:`Bettelheim's "refrigerator mother" blamed parents, and his book "The Empty Fortress" was reviewed in JAMA in 1967. A parent, the psychologist Bernard Rimland, argued instead for a neural basis in 1964. Parent-blaming is now rejected. [[vanRosmalen2020,Chess1967,Cowie1965,Sandin2017]]`,
  pt:`Some of the first people to challenge blaming parents were parents themselves.`,
  hook:`Rimland 1964, "Infantile Autism": a biological, neural basis. [[Cowie1965]]`},
 {from:hiT(1980),at:hiT(1998.6),k:'Late 1990s',t:'Neurodiversity',
  txt:`The neurodiversity concept is often credited to the Australian sociologist Judy Singer in the late 1990s. Botha and colleagues present archival evidence that "neurological diversity" was used earlier and conclude it was "collectively developed by neurodivergent people". The paradigm treats autism as one form of variation in a diversity of minds. [[Botha2024,Pellicano2022]]`,
  pt:`Neurodiversity means human brains vary, and autistic brains are part of that natural variety.`,
  hook:`Who coined neurodiversity? Commonly credited to Singer; Botha 2024 argues for collective origins. [[Botha2024]]`},
 {from:hiT(2005),at:hiT(2013.6),k:'2012–2013',t:'Autistic scholars',
  txt:`In 2012 Damian Milton, an autistic sociologist, described the "double empathy problem". In 2013, a survey of 657 people found that identifying as autistic and knowing about neurodiversity went with seeing autism as an identity "that needs no cure", while groups still overlapped in recognising its difficulties. <span class="ev early">Early evidence</span> [[Milton2012,Kapp2013]]`,
  pt:`Autistic people became researchers of autism, not only subjects of it.`,
  hook:`Milton 2012: the double empathy problem. [[Milton2012]]`},
 {from:hiT(2015),at:hiT(2018.5),k:'2016–2018',t:'Changing words',
  txt:`A UK survey of 3,470 people (2016) found no single preferred term. Person-first language "may actually accentuate stigma" (2017), puzzle pieces evoke negative associations (2018), and Czech's archival study (2018) led many to question the Asperger eponym. [[Kenny2016,Gernsbacher2017,Gernsbacher2018Puzzle,Czech2018]]`,
  pt:`Words and symbols were re-examined: which ones respect people, and which carry old baggage.`,
  hook:`Kenny 2016: 3,470 respondents; "autism" and "on the autism spectrum" most widely endorsed. [[Kenny2016]]`},
 {from:hiT(2019),at:hiT(2022.1),k:'2019–2022',t:'Partnership',
  txt:`An autistic researcher described neurodiversity as acceptance with support (2019). Autistic adults' own accounts defined autistic burnout (2020). Researchers set out alternatives to ableist language (2021). The 2021 Lancet Commission, published in 2022, included autistic people and parents among its 32 authors. [[denHouting2019,Raymaker2020,BottemaBeutel2021Ableist,Lord2022Lancet,Yu2022]]`,
  pt:`More research is now planned and written together with autistic people and families.`,
  hook:`Lancet Commission: 32 authors, 6 continents, 13 disciplines; proposed "profound autism". [[Lord2022Lancet,Yu2022]]`},
 {from:hiT(2022.7),at:1,k:'2023–2025',t:'Open debates',
  txt:`A survey of 654 autistic adults across countries favoured "autistic person" but stressed personal preference (2023). The origins of neurodiversity were re-examined (2024). A larger replication did not find the double empathy information gap (2025). "Profound autism" is still debated. <span class="ev early">Early evidence: mixed</span> [[Keating2023,Botha2024,Crompton2025,Siegel2026,Eicher2026]]`,
  pt:`The conversation is still going on, and autistic people are part of it.`,
  hook:`Crompton 2020 found a mixed-chain penalty; the 2025 replication (N = 311) did not. [[Crompton2020,Crompton2025]]`}];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),rd=$('#hiRead'),yrs=$('#hiYears');let mode='sci';
  const steps=HI_STEPS_S.slice();
  const evs=()=>HI_EV.filter(e=>e.m==='b'||e.m===(mode==='sci'?'s':'c'));
  function draw(t){const N=vb(svg,'720 380','400 590');const yr=lerp(1910,2025,clamp(t)),E=evs();let s='';
    const A=N?{x0:22,x1:380,y:476,by:500}:{x0:30,x1:700,y:262,by:292};const X=y=>lerp(A.x0,A.x1,(y-1910)/115);
    const shown=E.filter(e=>e.y<=yr+.01).slice(-3);
    /* axis and decades */
    s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${A.y}" y2="${A.y}" style="stroke:var(--muted);stroke-width:1.6"/>`;
    for(let d=1910;d<=2020;d+=N?20:10)s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${A.y-4}" y2="${A.y+4}" style="stroke:var(--muted)"/><text x="${f1(X(d))}" y="${A.y+16}" class="t-xs t-mid">${d}</text>`;
    /* name band */
    HI_BAND.forEach((b,i)=>{const x0=X(b.a),x1=X(Math.min(b.b,yr)),on=yr>=b.a&&yr<b.b+(i===4?1:0);if(yr<b.a)return;
      s+=`<rect x="${f1(x0)}" y="${A.by+10}" width="${f1(Math.max(0,x1-x0))}" height="14" style="fill:${HI_C[i]};opacity:${on?.9:.45}"/>`;
      if(!N&&X(b.b)-x0>70&&x1-x0>60)s+=`<text x="${f1(x0+4)}" y="${A.by+38}" class="t-xs" style="${on?'fill:var(--ink);font-weight:600':''}">${b.s}</text>`});
    const cb=HI_BAND.find((b,i)=>yr>=b.a&&(yr<b.b||i===4));
    if(N)s+=`<text x="${A.x0}" y="${A.by+42}" class="t-xs">Name in use:</text><text x="${A.x0}" y="${A.by+57}" class="t-sm" style="fill:var(--ink)">${cb?cb.l:'no name yet'}</text>`;
    else s+=`<text x="${A.x0}" y="${A.by+58}" class="t-sm" style="fill:var(--ink)">${cb?'Name in use: '+cb.l:'Before 1911: no name yet'}</text>`;
    /* event dots */
    E.forEach(e=>{const lit=e.y<=yr+.01,sh=shown.includes(e);s+=`<circle cx="${f1(X(e.y))}" cy="${A.y}" r="${sh?5.5:3.5}" style="fill:${lit?(e.m==='c'?'var(--rx)':e.m==='b'?'var(--gold)':'var(--brand)'):'var(--panel)'};stroke:${lit?'var(--panel)':'var(--muted)'};stroke-width:1.4"/>`});
    /* cursor */
    s+=`<path d="M${f1(X(yr))} ${A.y-14}L${f1(X(yr)-5)} ${A.y-22}H${f1(X(yr)+5)}Z" style="fill:var(--ink)"/><text x="${f1(clamp(X(yr),A.x0+14,A.x1-14))}" y="${A.y-26}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${Math.floor(yr)}</text>`;
    /* name cards for the three most recent events */
    shown.forEach((e,k)=>{const slot=k+(3-shown.length),fresh=clamp((yr-e.y)/1.2+.15);
      const C=N?{x:16,y:16+slot*134,w:368,h:118}:{x:12+slot*238,y:30,w:226,h:166};
      const col=e.m==='c'?'var(--rx)':e.m==='b'?'var(--gold)':'var(--brand)';
      s+=`<g style="opacity:${f1(.35+.65*fresh*(slot===2?1:.85))}">`;
      if(!N)s+=`<path d="M${f1(C.x+C.w/2)} ${C.y+C.h}L${f1(C.x+C.w/2)} ${C.y+C.h+16}L${f1(X(e.y))} ${A.y-34}L${f1(X(e.y))} ${A.y-6}" style="fill:none;stroke:${col};stroke-width:1.2;stroke-dasharray:3 3"/>`;
      s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="12" style="fill:var(--panel);stroke:${slot===2?col:'var(--line)'};stroke-width:${slot===2?2:1}"/>`;
      s+=`<rect x="${C.x}" y="${C.y}" width="6" height="${C.h}" rx="3" style="fill:${col}"/>`;
      s+=`<text x="${C.x+18}" y="${C.y+(N?34:40)}" style="font:800 ${N?26:30}px var(--display);fill:${col}">${Math.floor(e.y)}</text>`;
      if(N){s+=`<text x="${C.x+100}" y="${C.y+30}" class="t-lbl">${e.n}</text><text x="${C.x+100}" y="${C.y+50}" class="t-xs" style="fill:var(--ink);font-weight:600">${e.a}</text><text x="${C.x+100}" y="${C.y+68}" class="t-xs">${e.b}</text>`;
        s+=`<text x="${C.x+18}" y="${C.y+100}" class="t-xs">${e.m==='c'?'community and rights':e.m==='b'?'both stories':'science and diagnosis'}</text>`}
      else{s+=`<text x="${C.x+18}" y="${C.y+70}" class="t-lbl">${e.n}</text><text x="${C.x+18}" y="${C.y+96}" class="t-xs" style="fill:var(--ink);font-weight:600">${e.a}</text><text x="${C.x+18}" y="${C.y+114}" class="t-xs">${e.b}</text>`;
        s+=`<text x="${C.x+18}" y="${C.y+148}" class="t-xs" style="fill:${col}">${e.m==='c'?'community and rights':e.m==='b'?'both stories':'science and diagnosis'}</text>`}
      s+='</g>'});
    if(!shown.length)s+=`<text x="${N?200:360}" y="${N?200:120}" class="t-sm t-mid">Scrub forward to 1911</text>`;
    svg.innerHTML=s;
    const last=shown[shown.length-1];rd.innerHTML=last?`<b>${Math.floor(last.y)} · ${last.n}.</b> ${last.x}`:'';
    const ph=phaseOf(steps,t);note.innerHTML=noteHTML(steps[ph]);setA(ph)}
  const stop=playWire(rg,$('#hiPlay'),draw,22000,'%t:player.replay%','history');
  const setA=stepWire($('#hiSteps'),steps,rg,draw,stop);
  function chips(){yrs.innerHTML=evs().map(e=>`<button class="tag" data-hy="${e.y}">${Math.floor(e.y)} · ${e.n}</button>`).join('')}
  yrs.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();rg.value=clamp(hiT(+b.dataset.hy)+.003);draw(+rg.value)});
  $$('[data-himode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.himode;stop();$$('[data-himode]').forEach(q=>q.setAttribute('aria-pressed',q===b));
    steps.splice(0,steps.length,...(mode==='sci'?HI_STEPS_S:HI_STEPS_C));$$('#hiSteps [data-st] span').forEach((sp,i)=>sp.textContent=steps[i].t);
    chips();rg.value=steps[0].at;draw(+rg.value)}));
  chips();draw(+rg.value);
  /* name cards flip */
  $$('#hiNames .card').forEach(c=>{const b=$('button',c);b.addEventListener('click',()=>{const o=!c.classList.contains('open');c.classList.toggle('open',o);b.setAttribute('aria-pressed',o);b.textContent=o?'Back':'When and why'})});
};
