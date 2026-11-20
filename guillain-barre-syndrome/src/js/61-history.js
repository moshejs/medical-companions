/* =============== 6.1 history & people =============== */
/* Nine eras share the slider equally; within an era the year runs from its y0 to the next era's y0. */
const HI_END=2026;
const HI_STEPS=[
 {y0:1855,main:1859,k:'Before 1916',pp:'Octave Landry and others',t:'Before the name',
  cap:['Landry, 1859: a paralysis that climbs','from the legs, in ten patients','1891: Quincke describes lumbar puncture'],
  txt:'In 1859 Octave Landry described "ascending paralysis" in ten patients, stressing motor paralysis and a poor prognosis. He noted convalescence from illness, childbirth and cold as circumstances, and treated with massage, liniments and electric stimulation. [[Afifi1994]] Duménil, Osler and Grainger Stewart reported similar cases before 1916, without lumbar puncture. [[Freitas2017]] Quincke described lumbar puncture in 1891. [[Afifi1994]]',
  pt:'Doctors described a paralysis that climbed up the body long before it had its modern name.',
  hook:'Landry, 1859: "ascending paralysis". [[Afifi1994]]'},
 {y0:1916,main:1916,k:'1916',pp:'Guillain, Barré and Strohl',t:'1916: the spinal fluid clue',
  cap:['Two soldiers with paralysis','CSF protein high, cells normal','reflexes recorded by Strohl'],
  txt:'In 1916 Guillain, Barré and Strohl reported two French soldiers with acute flaccid paralysis, high protein in the cerebrospinal fluid (CSF) and normal cell counts. [[Guillain1916,Goodfellow2016,Waclawik2018]] The paper appeared in the bulletin of the Paris hospital medical society and did not mention Landry. [[Afifi1994]] Strohl contributed recordings of the tendon reflexes, an early step towards bedside electrodiagnosis; later papers dropped his name, for reasons that are disputed. [[Waclawik2018,Afifi1994]]',
  pt:'The name comes from French doctors who, in 1916, found lots of protein but few cells in the spinal fluid of two soldiers with paralysis.',
  hook:'Albuminocytological dissociation dates from the 1916 report, in two soldiers. [[Goodfellow2016,Waclawik2018]] See <a href="#csf" data-go="csf">Lumbar puncture &amp; CSF</a>.'},
 {y0:1949,main:1949,k:'1949 to 1955',pp:'Haymaker, Kernohan; Waksman, Adams',t:'Where is the lesion?',
  cap:['1949: early lesions in the spinal nerves','1955: allergic neuritis in rabbits','an immune cause is suggested'],
  txt:'Haymaker and Kernohan reported 50 fatal cases in 1949 (32 died between days 2 and 10). They placed the early lesions in the spinal nerves and brought Landry\'s paralysis, acute febrile polyneuritis and GBS under one heading. [[Haymaker1949,Berciano2017]] Bickerstaff and Cloake described mesencephalitis and rhombencephalitis in 1951. [[Bickerstaff1951]] In 1955 Waksman and Adams produced experimental allergic neuritis in rabbits with peripheral nerve tissue and adjuvants, with raised CSF protein and usually normal cells: their model pointed to an immune cause. [[Waksman1955,Afifi1994]]',
  pt:'Doctors found where the damage starts, in the nerve roots, and showed in animals that the immune system can cause it.',
  hook:'Experimental allergic neuritis (1955): the animal model that pointed to an immune cause. [[Waksman1955]]'},
 {y0:1956,main:1956,k:'1956 to 1969',pp:'Fisher; Bickerstaff; Asbury, Arnason, Adams',t:'Variants and inflammation',
  cap:['1956: eyes, balance, reflexes (Fisher)','1957: a brainstem form (Bickerstaff)','1969: immune cells and stripped myelin'],
  txt:'Fisher described ophthalmoplegia, ataxia and areflexia in 1956, as a variant of acute idiopathic polyneuritis. [[Fisher1956]] Bickerstaff followed in 1957 with "a grave syndrome with benign prognosis"; a 2003 series of 62 cases found anti-GQ1b IgG in 66%. [[Bickerstaff1957,Odaka2003]] In 1969 Asbury, Arnason and Adams showed inflammatory cells around small veins with segmental demyelination across roots, ganglia, cranial nerves, plexuses and peripheral nerves, and disputed oedema as the main lesion. [[Asbury1969,Afifi1994]]',
  pt:'Doctors recognised forms that affect the eyes and balance, and saw immune cells gathered in damaged nerves.',
  hook:'The Miller Fisher triad: ophthalmoplegia, ataxia, areflexia (1956). [[Fisher1956]] See <a href="#mfs" data-go="mfs">Miller Fisher &amp; other variants</a>.'},
 {y0:1976,main:1976,k:'1976',pp:'Schonberger and colleagues',t:'1976: the swine flu vaccine',
  cap:['16 December 1976: programme suspended','1,098 cases, 532 recently vaccinated','about 1 extra case per 100,000'],
  txt:'The US swine influenza vaccination programme was suspended on 16 December 1976 after reports of GBS. Surveillance found 1,098 cases, 532 of them recently vaccinated. The attributable risk was just under 1 case per 100,000 vaccinations in adults, concentrated within 5 weeks of vaccination. [[Schonberger1979]] Later influenza vaccine studies suggest about 1 additional case per million vaccinations. [[Leonhard2019]] Why 1976 differed is unresolved: vaccines of that era and later ones induced anti-GM1 antibodies in mice, and <i>C. jejuni</i> was not found in the 1976 vaccines. <span class="ev early">Early evidence</span> [[Nachamkin2008,Sejvar2011Flu]]',
  pt:'In 1976 a flu vaccine in the United States was linked to a small rise in GBS, about 1 extra case for every 100,000 people vaccinated. Later flu vaccines carry a much smaller risk.',
  hook:'1976: about 1 extra case per 100,000 vaccinations; later influenza vaccines about 1 per million. [[Schonberger1979,Leonhard2019]] See <a href="#vaccines" data-go="vaccines">Vaccines &amp; GBS</a>.'},
 {y0:1978,main:1978,k:'1978 to 1985',pp:'NINCDS; Hughes; Brettle and colleagues',t:'Criteria and the first treatments',
  cap:['1978: NINCDS diagnostic criteria','1978: prednisolone trial, no benefit','1978 to 1985: plasma exchange works'],
  txt:'The NINCDS diagnostic criteria were published in 1978, prompted by the need for firm criteria after the vaccine episode, and reaffirmed with expanded electrodiagnostic criteria in 1990. [[NINCDS1978,Afifi1994,Asbury1990]] Also in 1978, a randomised trial of prednisolone in 40 people concluded that steroid treatment "is not beneficial and can be detrimental". [[Hughes1978]] Plasma exchange was first reported from Hammersmith Hospital in 1978, [[Brettle1978,Afifi1994]] and the US trial of 245 people confirmed its benefit in 1985. [[GBSStudyGroup1985]]',
  pt:'Doctors agreed how to diagnose GBS, learned that steroid tablets did not help, and found that cleaning antibodies out of the blood (plasma exchange) did.',
  hook:'Steroids: no benefit (1978). Plasma exchange: benefit confirmed in 245 people (1985). [[Hughes1978,GBSStudyGroup1985]]'},
 {y0:1986,main:1993,k:'1986 to 1995',pp:'Feasby; Yuki; McKhann; Griffin; Chiba',t:'Axons, antibodies and Campylobacter',
  cap:['1986: an axonal form is proposed','1990 to 1993: C. jejuni and anti-GM1','1993: AMAN named, mimicry shown'],
  txt:'Feasby and colleagues proposed an acute axonal form in 1986. [[Feasby1986]] Yuki and colleagues linked anti-GM1 antibodies after <i>C. jejuni</i> enteritis to axonal GBS in 1990, [[Yuki1990]] and in 1993 showed that a <i>C. jejuni</i> strain from a person with GBS carried a GM1-like structure, the first demonstration of this mimicry. [[Yuki1993]] McKhann and colleagues studied summer epidemics in northern China and named acute motor axonal neuropathy (AMAN) in 1993; autopsies gave it a structural basis in 1995. [[McKhann1991,McKhann1993,Griffin1995]] Chiba linked anti-GQ1b to Miller Fisher syndrome in 1992. [[Chiba1992]] Meanwhile the French trial confirmed plasma exchange (1987) and the Dutch trial found IVIg at least as effective (1992). [[FrenchPE1987,vanDerMeche1992]]',
  pt:'Researchers found that a common gut germ carries a sugar that looks like part of the nerve, so antibodies made against the germ can hit the nerve.',
  hook:'In 129 Chinese patients (1991 to 1992), 65% had AMAN; 66% of 38 tested had recent <i>C. jejuni</i> evidence, against 16% of village controls. [[Ho1995]]'},
 {y0:1996,main:1997,k:'1996 to 2011',pp:'Plasma Exchange/Sandoglobulin Trial Group; Yuki',t:'Equal treatments, proof in animals',
  cap:['1997: plasma exchange and IVIg equal','combining them: no significant gain','2004: mimicry reproduced in rabbits'],
  txt:'A trial of 383 people in 1997 found plasma exchange and IVIg equivalent, with no significant advantage from combining them. [[PSGBS1997]] Mean improvement at 4 weeks was 0.9 grades with plasma exchange, 0.8 with IVIg and 1.1 with both. [[PSGBS1997]] Its nerve conduction analysis classified 69% as demyelinating and 3% as axonal. [[Hadden1998]] In 2004 Yuki\'s group induced the disease in rabbits with the <i>C. jejuni</i> material. [[Yuki2004]]',
  pt:'Big trials showed the two main treatments work about equally well, and experiments in animals confirmed how the germ sets off the attack.',
  hook:'Plasma exchange = IVIg; combining them added no significant benefit (1997). [[PSGBS1997]]'},
 {y0:2012,main:2012,k:'2012 onwards',pp:'The IGOS Consortium and many others',t:'A global view',
  cap:['2012: IGOS starts recruiting','2019 and 2023: international guidelines','outbreaks: Zika, Peru, Pune'],
  txt:'The International GBS Outcome Study (IGOS) began recruiting in May 2012; by January 2017 it had more than 1,400 participants from 143 centres in 19 countries on 5 continents. [[Jacobs2017]] Its first regional analysis appeared in 2018. [[Doets2018]] The Zika epidemics of 2013 and 2015 prompted a globally applicable guideline in 2019, [[Leonhard2019]] and EAN and PNS published an evidence-graded guideline in 2023. [[vanDoorn2023]] Outbreaks continue, as in Peru in 2019 and Pune in 2025. [[Munayco2020,Viswanathan2026]] A century on, complement inhibition became the first targeted immunotherapy to enter trials. [[Goodfellow2016]]',
  pt:'Today doctors in many countries pool their data to learn what helps, and new treatments are being tested.',
  hook:'IGOS: 143 centres, 19 countries, 5 continents by 2017. [[Jacobs2017]] See <a href="#frontier" data-go="frontier">Research frontier</a>.'}
];
HI_STEPS.forEach((s,i)=>{const y1=i<HI_STEPS.length-1?HI_STEPS[i+1].y0:HI_END;s.from=i/HI_STEPS.length;s.at=s.from+(s.main-s.y0)/(y1-s.y0)/HI_STEPS.length+.004});
const HI_MS=[
 {y:1859,l:'Landry',txt:'Octave Landry describes "ascending paralysis" in ten patients. [[Afifi1994]]'},
 {y:1891,l:'Quincke',txt:'Quincke describes lumbar puncture, the test behind the 1916 finding. [[Afifi1994]]'},
 {y:1916,l:'Guillain, Barré, Strohl',txt:'Two soldiers with paralysis, lost reflexes, high CSF protein and normal cells. [[Guillain1916,Goodfellow2016,Waclawik2018]]'},
 {y:1949,l:'Haymaker, Kernohan',txt:'50 fatal cases; early lesions located in the spinal nerves. [[Haymaker1949,Berciano2017]]'},
 {y:1951,l:'Bickerstaff, Cloake',txt:'Mesencephalitis and rhombencephalitis described. [[Bickerstaff1951]]'},
 {y:1955,l:'Waksman, Adams',txt:'Experimental allergic neuritis, an animal model. [[Waksman1955]]'},
 {y:1956,l:'Fisher',txt:'Ophthalmoplegia, ataxia and areflexia described as a variant. [[Fisher1956]]'},
 {y:1957,l:'Bickerstaff',txt:'Brainstem encephalitis with a benign prognosis. [[Bickerstaff1957]]'},
 {y:1969,l:'Asbury, Arnason, Adams',txt:'An inflammatory lesion with segmental demyelination. [[Asbury1969]]'},
 {y:1976,l:'Swine flu vaccine',txt:'The US swine influenza vaccine programme is suspended over GBS. [[Schonberger1979]]'},
 {y:1978,l:'NINCDS criteria',txt:'NINCDS diagnostic criteria published. [[NINCDS1978]]'},
 {y:1978,l:'Prednisolone trial',txt:'A randomised trial finds no benefit from prednisolone. [[Hughes1978]]'},
 {y:1978,l:'Plasma exchange',txt:'First report of plasma exchange, from Hammersmith Hospital. [[Brettle1978]]'},
 {y:1985,l:'US plasmapheresis trial',txt:'Plasma exchange benefit shown in 245 people. [[GBSStudyGroup1985]]'},
 {y:1986,l:'Axonal form',txt:'Feasby and colleagues propose an acute axonal form. [[Feasby1986]]'},
 {y:1987,l:'French trial',txt:'Plasma exchange confirmed in 220 people; albumin favoured as replacement fluid. [[FrenchPE1987]]'},
 {y:1990,l:'Anti-GM1',txt:'Anti-GM1 antibodies after <i>C. jejuni</i> in axonal GBS. [[Yuki1990]]'},
 {y:1990,l:'Criteria revised',txt:'Criteria reaffirmed, with electrodiagnosis expanded. [[Asbury1990]]'},
 {y:1991,l:'Northern China',txt:'The summer paralytic disease of northern China characterised. [[McKhann1991]]'},
 {y:1992,l:'Dutch IVIg trial',txt:'IVIg at least as effective as plasma exchange: 53% vs 34% improved by a grade at 4 weeks. [[vanDerMeche1992]]'},
 {y:1992,l:'Anti-GQ1b',txt:'Anti-GQ1b IgG in all six people with Miller Fisher syndrome tested, and in no controls. [[Chiba1992]]'},
 {y:1993,l:'AMAN named',txt:'Acute motor axonal neuropathy named as a distinct syndrome. [[McKhann1993]]'},
 {y:1993,l:'GM1-like sugar',txt:'A GM1-like structure found on <i>C. jejuni</i>. [[Yuki1993]]'},
 {y:1995,l:'Autopsies',txt:'Autopsies in northern China give AMAN a structural basis. [[Griffin1995]]'},
 {y:1997,l:'PE and IVIg equal',txt:'Plasma exchange and IVIg equivalent in 383 people. [[PSGBS1997]]'},
 {y:2004,l:'Rabbit model',txt:'Mimicry reproduced in rabbits. [[Yuki2004]]'},
 {y:2012,l:'IGOS',txt:'The International GBS Outcome Study starts recruiting. [[Jacobs2017]]'},
 {y:2013,l:'Zika',txt:'Zika outbreak and GBS in French Polynesia: 42 people. [[CaoLormeau2016]]'},
 {y:2019,l:'Global guideline',txt:'A ten-step guideline for clinicians worldwide. [[Leonhard2019]]'},
 {y:2019,l:'Peru outbreak',txt:'683 cases across nine departments. [[Munayco2020,Ramos2021]]'},
 {y:2023,l:'EAN/PNS guideline',txt:'An evidence-graded guideline. [[vanDoorn2023]]'},
 {y:2025,l:'Pune outbreak',txt:'230 cases with 12 deaths. [[Viswanathan2026]]'}
];
/* glyph labels, one set per era */
const HI_G={
 asc:'ascending paralysis',lp:'1891: lumbar puncture',
 sol:'two soldiers',refl:'reflex recording (Strohl)',prot:'protein: high',cell:'cells: normal',csf:'spinal fluid',
 root:'spinal nerve root',rab:'1955: the same picture in rabbits',
 fis1:'eyes, balance,',fis2:'reflexes (1956)',infl:'immune cells, stripped myelin (1969)',
 vax:'vaccine',bar:'GBS cases found by surveillance: 1,098',barv:'532 recently vaccinated',cal1:'16',cal2:'Dec',cal3:'programme suspended',
 crit:['criteria','1978'],ster:['steroids','no benefit'],plex:['plasma exchange','benefit'],
 cj:'<tspan style="font-style:italic">C. jejuni</tspan> sugar coat',gm1:'the same sugar on the nerve (GM1)',
 trh:'mean improvement at 4 weeks (grades)',tr:[{n:'plasma exchange',v:.9},{n:'IVIg',v:.8},{n:'both',v:1.1}],rab2:'2004: disease reproduced in rabbits',
 map:'schematic grid: longitude and latitude',eq:'equator',igos:'IGOS by 2017: 143 centres, 19 countries, 5 continents'
};
const HI_PINS=[{n:'French Polynesia 2013',y:2013,lon:-149,lat:-17,a:'below'},{n:'Peru 2019',y:2019,lon:-77,lat:-12,a:'above'},{n:'Pune 2025',y:2025,lon:74,lat:18.5,a:'above'}];
const HI_DEC_W=[1860,1880,1900,1920,1940,1960,1980,2000,2020],HI_DEC_N=[1860,1900,1940,1980,2020];
function hiYear(t){const n=HI_STEPS.length,i=Math.min(n-1,Math.floor(clamp(t)*n)),u=clamp(t)*n-i,y1=i<n-1?HI_STEPS[i+1].y0:HI_END;return lerp(HI_STEPS[i].y0,y1,clamp(u))}
function hiTOf(y){const n=HI_STEPS.length;for(let i=n-1;i>=0;i--){if(y>=HI_STEPS[i].y0){const y1=i<n-1?HI_STEPS[i+1].y0:HI_END;return (i+(y-HI_STEPS[i].y0)/(y1-HI_STEPS[i].y0))/n}}return 0}
/* small glyphs of this module */
function hiTube(x,y,w,h,o={}){const r=w/2;let s=`<path d="M${f1(x)} ${f1(y)}V${f1(y+h-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(x+w)} ${f1(y+h-r)}V${f1(y)}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
  const top=y+h*.22;s=`<path d="M${f1(x+1.5)} ${f1(top)}V${f1(y+h-r)}A${f1(r-1.5)} ${f1(r-1.5)} 0 0 0 ${f1(x+w-1.5)} ${f1(y+h-r)}V${f1(top)}Z" style="fill:var(--csf)"/>`+s;
  const rr=rng(17);for(let i=0;i<(o.prot||0);i++){s+=`<circle cx="${f1(x+4+rr()*(w-8))}" cy="${f1(top+6+rr()*(h*.72-14))}" r="2.4" style="fill:var(--protein)"/>`}
  [ [.35,.5],[.65,.78] ].forEach(([a,b])=>{s+=`<circle cx="${f1(x+w*a)}" cy="${f1(top+(y+h-top)*b)}" r="4.2" style="fill:var(--cell);stroke:var(--ink);stroke-width:.8"/>`});
  return s}
function hiVial(x,y,s){return `<rect x="${f1(x)}" y="${f1(y+s*.22)}" width="${f1(s*.5)}" height="${f1(s*.78)}" rx="${f1(s*.06)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x+2)}" y="${f1(y+s*.45)}" width="${f1(s*.5-4)}" height="${f1(s*.53)}" rx="${f1(s*.04)}" style="fill:var(--ivig);opacity:.7"/><rect x="${f1(x-2)}" y="${f1(y)}" width="${f1(s*.5+4)}" height="${f1(s*.22)}" rx="3" style="fill:var(--device)"/>`}
function hiClip(x,y,w,h){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x+w*.3)}" y="${f1(y-5)}" width="${f1(w*.4)}" height="10" rx="3" style="fill:var(--device)"/>`;
  for(let i=0;i<4;i++){const yy=y+16+i*(h-24)/4;s+=`<path d="M${f1(x+8)} ${f1(yy)}l3 3l5 -6" style="fill:none;stroke:var(--good);stroke-width:1.8"/><line x1="${f1(x+20)}" x2="${f1(x+w-8)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--muted);stroke-width:1.4"/>`}return s}
function hiPlex(cx,cy,s){const w=s,h=s*.8;return `<path d="M${f1(cx-w*.9)} ${f1(cy-h*.2)}H${f1(cx-w/2)}M${f1(cx+w/2)} ${f1(cy-h*.2)}H${f1(cx+w*.9)}" style="stroke:var(--blood);stroke-width:3;stroke-linecap:round"/><rect x="${f1(cx-w/2)}" y="${f1(cy-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="6" style="fill:var(--filter);stroke:var(--ink);stroke-width:1.2"/><rect x="${f1(cx-w*.3)}" y="${f1(cy-h*.3)}" width="${f1(w*.6)}" height="${f1(h*.22)}" rx="3" style="fill:var(--panel)"/><path d="M${f1(cx)} ${f1(cy+h/2)}V${f1(cy+h*.75)}" style="stroke:var(--plasma);stroke-width:3"/><rect x="${f1(cx-w*.18)}" y="${f1(cy+h*.75)}" width="${f1(w*.36)}" height="${f1(h*.36)}" rx="4" style="fill:var(--plasma);stroke:var(--ink);stroke-width:1"/>`}

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),ms=$('#hiMs'),yb=$('#hiYears');
  yb.innerHTML=HI_MS.map((m,i)=>`<button class="tag" data-m="${i}" aria-pressed="false">${m.y} · ${m.l}</button>`).join('');
  const V=[
    /* 0 Landry, Quincke */
    (B,N,u,yr)=>{let s=bodyFront(B.x+70,B.y+6,200,{level:.85*ease(clamp(u/.8)),tingle:ramp(u,.05,.2)}).svg+kitLabel(B.x+150,B.y+46,HI_G.asc,{});
      if(yr>=1891){const o=ramp(yr,1891,1900),x0=B.x+170,y0=B.y+118;s+=`<g style="opacity:${f1(o)}"><rect x="${x0}" y="${y0}" width="96" height="20" rx="4" style="fill:var(--panel);stroke:var(--device);stroke-width:1.6"/><rect x="${x0+60}" y="${y0+3}" width="34" height="14" rx="2" style="fill:var(--csf)"/><path d="M${x0-26} ${y0+10}H${x0}M${x0+96} ${y0+10}H${x0+150}" style="stroke:var(--device);stroke-width:2.2;stroke-linecap:round"/>`+kitLabel(x0+62,y0+42,HI_G.lp,{a:'m'})+'</g>'}
      return s},
    /* 1 1916 */
    (B,N,u)=>{let s=person(B.x+48,B.y+24,96,'var(--muted)')+person(B.x+120,B.y+24,96,'var(--muted)')+kitLabel(B.x+84,B.y+140,HI_G.sol,{a:'m'});
      let d='';for(let i=0;i<=40;i++){const x=B.x+20+i*3.5,amp=i>14&&i<20?(1-u)*14:0;d+=(i?'L':'M')+f1(x)+' '+f1(B.y+172-amp*Math.sin((i-14)*Math.PI/6))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--impulse);stroke-width:2"/>`+kitLabel(B.x+90,B.y+198,HI_G.refl,{a:'m'});
      s+=hiTube(B.x+228,B.y+14,34,176,{prot:Math.round(4+28*ramp(u,.05,.7))})+kitLabel(B.x+245,B.y+8,HI_G.csf,{a:'m'});
      s+=kitLabel(B.x+272,B.y+90,HI_G.prot,{})+kitLabel(B.x+272,B.y+130,HI_G.cell,{});return s},
    /* 2 1949-1955 */
    (B,N,u,yr)=>{const dm=ramp(u,.1,.8);let s=kitLabel(B.x+10,B.y+20,HI_G.root,{});
      s+=nerveFibre(B.x+10,B.y+96,B.w-20,{n:4,h:40,demy:[dm*.9,dm,dm*.6,dm*.3],mac:[0,dm,dm*.5,0],pulse:(u*6)%1,block:dm>.5?1:undefined}).svg;
      if(yr>=1955)s+=kitLabel(B.x+B.w/2,B.y+170,HI_G.rab,{a:'m'});return s},
    /* 3 1956-1969 */
    (B,N,u,yr)=>{const e=ramp(u,.05,.3);let s=bodyFront(B.x+60,B.y+8,168,{zones:{eyes:e,legs:e*.25}}).svg;
      s+=kitLabel(B.x+60,B.y+198,HI_G.fis1,{a:'m'})+kitLabel(B.x+60,B.y+212,HI_G.fis2,{a:'m'});
      const inf=ramp(yr,1969,1975),fx=B.x+140,fw=B.w-146;
      s+=nerveFibre(fx,B.y+96,fw,{n:3,h:36,demy:[inf*.6,inf,inf*.4],mac:[0,inf,0]}).svg;
      if(inf>0){const rr=rng(5);for(let i=0;i<7;i++){s+=`<circle cx="${f1(fx+10+rr()*(fw-20))}" cy="${f1(B.y+96+(rr()>.5?1:-1)*(28+rr()*10))}" r="5" style="fill:var(--tcell);stroke:var(--ink);stroke-width:.8;opacity:${f1(inf)}"/>`}
        s+=kitLabel(fx+fw/2,B.y+160,HI_G.infl,{a:'m'})}return s},
    /* 4 1976 */
    (B,N,u)=>{let s=hiVial(B.x+30,B.y+40,96)+kitLabel(B.x+54,B.y+160,HI_G.vax,{a:'m'});
      const bx=B.x+120,bw=B.w-130,g=ease(ramp(u,.1,.7));
      s+=kitLabel(bx,B.y+56,HI_G.bar,{})+`<rect x="${bx}" y="${B.y+66}" width="${f1(bw)}" height="24" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${B.y+66}" width="${f1(bw*532/1098*g)}" height="24" rx="5" style="fill:var(--weak)"/>`;
      s+=kitLabel(bx,B.y+110,HI_G.barv,{});
      const o=ramp(u,.6,.8);s+=`<g style="opacity:${f1(o)}"><rect x="${bx}" y="${B.y+132}" width="56" height="58" rx="6" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${bx}" y="${B.y+132}" width="56" height="15" rx="6" style="fill:var(--rx)"/><text x="${bx+28}" y="${B.y+144}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${HI_G.cal2}</text><text x="${bx+28}" y="${B.y+180}" class="t-big t-mid" style="font-size:24px">${HI_G.cal1}</text></g>`+`<g style="opacity:${f1(o)}">`+kitLabel(bx+66,B.y+166,HI_G.cal3,{})+'</g>';return s},
    /* 5 1978-1985 */
    (B,N,u)=>{const cx=[B.x+B.w/6,B.x+B.w/2,B.x+B.w*5/6],op=[ramp(u,0,.2),ramp(u,.25,.45),ramp(u,.5,.7)];
      let s=`<g style="opacity:${f1(op[0])}">${hiClip(cx[0]-30,B.y+50,60,78)}</g>`;
      s+=`<g style="opacity:${f1(op[1])}">${pill(cx[1],B.y+90,56,{col:'var(--muted)'})}<path d="M${f1(cx[1]-30)} ${B.y+62}L${f1(cx[1]+30)} ${B.y+118}M${f1(cx[1]+30)} ${B.y+62}L${f1(cx[1]-30)} ${B.y+118}" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/></g>`;
      s+=`<g style="opacity:${f1(op[2])}">${hiPlex(cx[2],B.y+84,50)}</g>`;
      [HI_G.crit,HI_G.ster,HI_G.plex].forEach((l,i)=>{s+=`<g style="opacity:${f1(op[i])}">`+kitLabel(cx[i],B.y+172,l[0],{a:'m'})+kitLabel(cx[i],B.y+186,l[1],{a:'m'})+'</g>'});return s},
    /* 6 1986-1995: mimicry */
    (B,N,u)=>{const k=N?.76:.8,nx=B.x+130,ab=ramp(u,.3,.7);let s=campy(B.x+56,B.y+70,64,{ang:-8,ph:u*6})+kitLabel(B.x+66,B.y+126,HI_G.cj,{a:'m'});
      const nz=nodeZoom(nx,B.y+14,k,{mode:'aman',ab,c3:ramp(u,.65,.95),nav:ramp(u,.75,1)*.6});s+=nz.svg;
      if(u>.08&&u<.5){const q=ramp(u,.08,.45);s+=antibody(lerp(B.x+100,nx+150*k,q),lerp(B.y+70,B.y+40,q),16,{ang:lerp(-60,180,q)})}
      s+=kitLabel(nx+150*k,B.y+14+190*k+16,HI_G.gm1,{a:'m'});return s},
    /* 7 1996-2011: trial bars */
    (B,N,u,yr)=>{const x0=B.x+118,bw=B.w-170,g=ease(ramp(u,.05,.5));let s=kitLabel(B.x,B.y+20,HI_G.trh,{});
      HI_G.tr.forEach((r,i)=>{const y=B.y+42+i*42;s+=`<text x="${B.x}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text><rect x="${x0}" y="${y}" width="${f1(bw)}" height="22" rx="5" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(Math.max(2,bw*r.v/1.2*g))}" height="22" rx="5" style="fill:var(--rx)"/><text x="${f1(x0+bw*r.v/1.2*g+6)}" y="${y+16}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.v.toFixed(1)}</text>`});
      if(yr>=2004)s+=kitLabel(B.x+B.w/2,B.y+194,HI_G.rab2,{a:'m'});return s},
    /* 8 2012 on: map grid and pins */
    (B,N,u,yr)=>{const mx=B.x+6,mw=B.w-12,my=B.y+24,mh=150,X=lo=>mx+mw*(lo+180)/360,Y=la=>my+mh*(60-la)/110;
      let s=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
      for(let lo=-120;lo<=120;lo+=60)s+=`<line x1="${f1(X(lo))}" x2="${f1(X(lo))}" y1="${my}" y2="${my+mh}" class="grid"/>`;
      [30,-30].forEach(la=>{s+=`<line x1="${mx}" x2="${mx+mw}" y1="${f1(Y(la))}" y2="${f1(Y(la))}" class="grid"/>`});
      s+=`<line x1="${mx}" x2="${mx+mw}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-width:1"/><text x="${mx+mw-4}" y="${f1(Y(0)-4)}" class="t-xs t-end">${HI_G.eq}</text>`;
      s+=`<text x="${mx}" y="${B.y+14}" class="t-xs">${HI_G.map}</text>`;
      HI_PINS.forEach(p=>{if(yr<p.y)return;const x=X(p.lon),y=Y(p.lat),o=ramp(yr,p.y,p.y+1.5);s+=`<g style="opacity:${f1(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--bad);opacity:.25"/><circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--bad);stroke:var(--panel);stroke-width:1.5"/>`+kitLabel(x-6,p.a==='below'?y+18:y-10,p.n,{})+'</g>'});
      s+=kitLabel(B.x,B.y+200,HI_G.igos,{});return s}
  ];
  function draw(t){
    const N=vb(svg,'720 370','400 450');
    const L=N?{B:{x:16,y:76,w:368,h:220},cx:16,cy:318,cl:20,ax0:24,aw:352,ay:410,dec:HI_DEC_N}
             :{B:{x:16,y:76,w:384,h:220},cx:420,cy:110,cl:22,ax0:30,aw:660,ay:330,dec:HI_DEC_W};
    const n=HI_STEPS.length,p=phaseOf(HI_STEPS,t),P=HI_STEPS[p],yr=hiYear(t),u=clamp(t*n-p);
    const AX=y=>y<=1920?L.ax0+L.aw*.18*(y-1855)/65:L.ax0+L.aw*(.18+.82*(y-1920)/(HI_END-1920));
    let s=`<text x="16" y="44" class="t-big" style="font-size:32px;fill:var(--brand)">${Math.floor(yr)}</text><text x="${N?110:120}" y="30" class="t-sm" style="fill:var(--ink);font-weight:700">${P.t}</text><text x="${N?110:120}" y="46" class="t-xs">${P.pp}</text>`;
    s+=V[p](L.B,N,u,yr);
    P.cap.forEach((c,i)=>{s+=`<text x="${L.cx}" y="${L.cy+i*L.cl}" class="t-sm" style="fill:var(--ink)">${c}</text>`});
    /* timeline axis */
    const y1=p<n-1?HI_STEPS[p+1].y0:HI_END;
    s+=`<rect x="${f1(AX(P.y0))}" y="${L.ay-6}" width="${f1(AX(y1)-AX(P.y0))}" height="12" rx="6" style="fill:var(--brand-soft)"/><line x1="${L.ax0}" x2="${L.ax0+L.aw}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    L.dec.forEach(d=>{s+=`<line x1="${f1(AX(d))}" x2="${f1(AX(d))}" y1="${L.ay+4}" y2="${L.ay+9}" class="axis"/><text x="${f1(AX(d))}" y="${L.ay+22}" class="t-xs t-mid">${d}</text>`});
    const seen={};HI_MS.forEach(m=>{if(seen[m.y])return;seen[m.y]=1;const on=m.y<=yr;s+=`<circle cx="${f1(AX(m.y))}" cy="${L.ay}" r="3.4" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--muted)'};stroke-width:1.2"/>`});
    const cx=AX(yr);s+=`<path d="M${f1(cx-6)} ${L.ay-18}L${f1(cx+6)} ${L.ay-18}L${f1(cx)} ${L.ay-8}Z" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    setSt(p);$('#hiNote').innerHTML=noteHTML(P);
    let last=-1;HI_MS.forEach((m,i)=>{if(m.y<=yr)last=m.y});
    const cur=HI_MS.filter(m=>m.y===last);
    ms.innerHTML=cur.map(m=>`<p><b>${m.y} · ${m.l}</b> ${m.txt}</p>`).join('');
    $$('[data-m]',yb).forEach(b=>{const m=HI_MS[+b.dataset.m];b.setAttribute('aria-pressed',m.y===last)});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,36000,'%t:player.replay%','history');
  const setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  yb.addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;stop();const y=HI_MS[+b.dataset.m].y,t=Math.min(1,hiTOf(y)+.0015);rg.value=t;draw(t)});
  draw(+rg.value);
};
