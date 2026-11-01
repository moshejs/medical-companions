/* =============== 6.1 History & people =============== */
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  let names='now';

  /* ---------- the time scale: c. 400 BC sits on a stub at the left, 1885-1960 is compressed,
     1960-2027 is widened so the crowded modern decades can be read ---------- */
  const U0=.05,U1=.30;
  const uOf=y=>y<1885?.012:y<1960?U0+(U1-U0)*(y-1885)/75:U1+(1-U1)*(y-1960)/67;
  const yOf=u=>u<U0?null:u<U1?1885+(u-U0)/(U1-U0)*75:1960+(u-U1)/(1-U1)*67;

  /* ---------- events (each one cited in the line under the stage) ---------- */
  const EV=[
    {y:-400,chip:'Hippocrates',lbl:'c. 400 BC',who:'Hippocrates',role:'an ancient description',head:'Lax joints and many scars',g:'scar',
     txt:`A condition with joint laxity and multiple scars was described by Hippocrates in 400 BC. [[Parapia2008,Forghani2019]]`},
    {y:1892,chip:'Tschernogubow',lbl:'1892',who:'Tschernogubow (Chernogubov)',role:'Russian dermatologist',head:'The first full description',g:'scar',
     txt:`The Russian dermatologist Tschernogubow (also spelled Chernogubov) published the first comprehensive description. One source dates his report to 1891. [[Forghani2019,Rauterberg2025]]`},
    {y:1901,chip:'Ehlers',lbl:'1901',who:'Edvard Ehlers',role:'Danish dermatologist',head:'A distinct condition',g:'bruise',
     txt:`The Danish dermatologist Edvard Ehlers recognised the condition as a distinct entity. EDS is one of the oldest known causes of bruising and bleeding. [[Parapia2008,Forghani2019]]`},
    {y:1908,chip:'Danlos',lbl:'1908',who:'Henri-Alexandre Danlos',role:'French dermatologist',head:'Stretchy, fragile skin',g:'pull',
     txt:`The French dermatologist Henri-Alexandre Danlos suggested that skin extensibility and fragility were the cardinal features. [[Parapia2008]]`},
    {y:1936,chip:'Parkes-Weber',lbl:'1936',who:'Frederick Parkes-Weber',role:'English dermatologist',head:'A name: "Ehlers-Danlos syndrome"',g:'name',
     txt:`The English dermatologist Frederick Parkes-Weber suggested the name "Ehlers-Danlos syndrome". [[Forghani2019]]`},
    {y:1964,chip:'Carter &amp; Wilkinson',lbl:'1964',who:'Carter and Wilkinson',role:'a score of joint laxity',head:'Counting lax joints',g:'limb',
     txt:`Carter and Wilkinson described a score of joint laxity in a study of persistent joint laxity and congenital dislocation of the hip. The Beighton score later adapted it. [[Carter1964,Clinch2011]]`},
    {y:1967,chip:'Kirk',lbl:'1967',who:'Kirk, Ansell and Bywaters',role:'the hypermobility syndrome',head:'Joint hypermobility syndrome',g:'joint',
     txt:`The first description of joint hypermobility syndrome: musculoskeletal complaints associated with generalised joint hypermobility. [[Kirk1967,Forghani2019]]`},
    {y:1969,chip:'Beighton &amp; Horan',lbl:'1969',who:'Beighton and Horan',role:'orthopaedic aspects of EDS',head:'One syndrome, several disorders',g:'joint',
     txt:`Beighton and Horan described joint involvement in EDS. In the 1960s it became clear that EDS was several disorders with different Mendelian inheritance, and classification began in the late 1960s. [[Beighton1969,VanDijk2024,Beighton1998]]`},
    {y:1973,chip:'Beighton score',lbl:'1973',who:'Beighton, Solomon and Soskolne',role:'articular mobility in an African population',head:'The Beighton score',g:'limb',
     txt:`The nine-point Beighton score was devised in a study of 1,083 Tswana Africans, adults and children, in South Africa. It is a starting point, not a diagnosis. [[Beighton1973,Clinch2011,Juul-Kristensen2017]]`},
    {y:1986,chip:'Berlin',lbl:'1986',who:'7th International Congress of Human Genetics',role:'Berlin; published 1988',head:'Berlin nosology: 11 types',k:'berlin',
     txt:`Proposed in Berlin in 1986 and published in 1988, the Berlin nosology defined 11 types numbered with Roman numerals, mainly by inheritance and clinical picture. [[Beighton1988,Forghani2019,Malek2021]]`},
    {y:1997,chip:'Byers',lbl:'1997',who:'Byers and colleagues',role:'arthrochalasia (types VIIA and VIIB)',head:'A gene for arthrochalasia',g:'gene',gene:'COL1A1 · COL1A2',gsub:'exon 6, the cleavage site',
     txt:`EDS types VIIA and VIIB were shown to result from splice-junction variants or deletions involving exon 6 of COL1A1 and COL1A2, the site the procollagen N-proteinase cuts. [[Byers1997]]`},
    {y:1997.4,chip:'Villefranche',lbl:'1997',who:'Beighton, De Paepe, Steinmann, Tsipouras, Wenstrup',role:'Villefranche-sur-Mer; published 1998',head:'Villefranche: 6 named types',k:'vf',
     txt:`Agreed at Villefranche-sur-Mer in 1997 and published in 1998, it defined 6 types mainly by cause, with major and minor criteria for each. It was sponsored by the Ehlers-Danlos National Foundation (USA) and the Ehlers-Danlos Support Group (UK). [[Beighton1998,Forghani2019,Brady2017]]`},
    {y:1998,chip:'Brighton',lbl:'1998',who:'Grahame, Bird and Child',role:'published 2000',head:'Brighton criteria for JHS',g:'limb',
     txt:`The revised (Brighton 1998) criteria for benign joint hypermobility syndrome were published in 2000. [[Grahame2000]]`},
    {y:1998.4,chip:'Michalickova',lbl:'1998',who:'Michalickova and colleagues',role:'type V collagen',head:'A gene for classical EDS',g:'gene',gene:'COL5A2',gsub:'α2(V) chain of type V collagen',
     txt:`Variants in the α2(V) chain of type V collagen were shown to impair matrix assembly and produce EDS type I, the classical type. [[Michalickova1998]]`},
    {y:1999,chip:'Colige',lbl:'1999',who:'Colige and colleagues',role:'dermatosparaxis (type VIIC)',head:'The enzyme for dermatosparaxis',g:'gene',gene:'ADAMTS2',gsub:'procollagen I N-proteinase',
     txt:`Human EDS type VIIC (dermatosparaxis) and bovine dermatosparaxis were traced to variants in the procollagen I N-proteinase gene, ADAMTS2. [[Colige1999]]`},
    {y:2000,chip:'Pepin',lbl:'2000',who:'Pepin, Schwarze, Superti-Furga and Byers',role:'the vascular type (type IV)',head:'Vascular EDS, counted',g:'gene',gene:'COL3A1',gsub:'type III procollagen',
     txt:`220 index patients with biochemically confirmed vascular EDS and 199 affected relatives: a calculated median survival of 48 years, most deaths from arterial rupture. A later series of 1,231 people found 51 years. These are population statistics, not a forecast for any one person. vEDS is caused by COL3A1. [[Pepin2000,Pepin2014,Byers2017]]`},
    {y:2000.4,chip:'Wenstrup',lbl:'2000',who:'Wenstrup and colleagues',role:'classical EDS',head:'Half the type V collagen',g:'gene',gene:'COL5A1',gsub:'one allele not expressed',
     txt:`Loss of expression of one COL5A1 allele was found in 8 of 28 informative probands; about one-third of people with classical EDS were estimated to have COL5A1 haploinsufficiency. [[Wenstrup2000]]`},
    {y:2017,chip:'13 types',lbl:'2017',who:'Malfait, Francomano, Byers and the International Consortium',role:'about two years of work',head:'Thirteen types',k:'y17',
     txt:`The 2017 International Classification recognises 13 types. All except hEDS need molecular confirmation, and hypermobility spectrum disorder (HSD) became the label for symptomatic joint hypermobility that fits no other syndrome. [[Bloom2017,Malfait2017,Castori2017]]`},
    {y:2018,chip:'HEDGE',lbl:'2018',who:'The Ehlers-Danlos Society',role:'HEDGE study',head:'The search for an hEDS gene',g:'hedge',
     txt:`The Hypermobile Ehlers-Danlos Genetic Evaluation (HEDGE) study began in 2018 to find the genetic basis of hEDS by whole-genome sequencing, aiming for 1,000 adults who meet the 2017 criteria. Enrolment (N=1,021) was 92% female. No causal gene for hEDS has been confirmed. [[Douglas2026,VanDijk2024,Halverson2023,Forghani2025]]`},
    {y:2020,chip:'14 types',lbl:'2020',who:'Malfait, Castori, Francomano, Giunta, Kosho and Byers',role:'Nature Reviews Disease Primers',head:'14 types, 20 genes',k:'y20',
     txt:`A primer counted 14 types caused by variants in 20 genes, because classical-like EDS type 2 (AEBP1) was described after 2017. [[Malfait2020,Malek2021]]`},
    {y:2024,chip:'Ritelli',lbl:'2024',who:'Ritelli and colleagues',role:'an Italian reference centre',head:'Are the criteria too strict?',g:'crowd',
     txt:`327 people (213 families) previously diagnosed under the Villefranche or Brighton criteria were reassessed; the authors concluded that the 2017 criteria should be made less stringent. One genetics team finds adults rarely meet them when strictly applied. [[Ritelli2024,VanDijk2024]]`},
    {y:2026,chip:'Criteria review',lbl:'today',who:'Clinicians, researchers and families',role:'criteria under review',head:'The next criteria',k:'rev',
     txt:`The debate continues. Until a revised version appears in a peer-reviewed journal, the 2017 International Classification remains the published standard. The latest on the revision is in <a href="#frontier" data-go="frontier">Toward better treatment</a>. [[Malfait2017,Ritelli2024,VanDijk2024]]`}];
  /* positions: on the scale, then spread so neighbours are at least .011 apart */
  EV.forEach((e,i)=>{e.u=uOf(e.y);if(i&&e.u<EV[i-1].u+.011)e.u=EV[i-1].u+.011});
  EV[EV.length-1].u=Math.min(EV[EV.length-1].u,.985);
  const evAt=t=>{let k=0;EV.forEach((e,i)=>{if(t>=e.u-.0005)k=i});return k};
  const U=y=>EV.find(e=>e.y===y).u;

  const STEPS=[
    {from:0,at:U(1901)+.002,k:'Era 1 · c. 400 BC to 1908',t:'Before the name',
     txt:`Long before it had a name, a condition with lax joints and many scars was described by Hippocrates. In 1892 Tschernogubow gave the first comprehensive description; in 1901 Ehlers recognised it as a distinct condition, and in 1908 Danlos made stretchy, fragile skin its cardinal features. All three were dermatologists. [[Parapia2008,Forghani2019]]`,
     pt:`The condition is named after two skin doctors: Edvard Ehlers from Denmark (1901) and Henri-Alexandre Danlos from France (1908). [[Parapia2008]]`,
     hook:`Ehlers 1901 (Danish dermatologist), Danlos 1908 (French dermatologist). Tschernogubow 1892 (one source: 1891). [[Parapia2008,Forghani2019,Rauterberg2025]]`},
    {from:U(1936)-.0005,at:U(1973)+.002,k:'Era 2 · 1936 to 1973',t:'A name, then a score',
     txt:`Parkes-Weber proposed the name "Ehlers-Danlos syndrome" in 1936. In 1967 Kirk, Ansell and Bywaters described joint hypermobility syndrome. By the late 1960s EDS was seen as several disorders with different inheritance, and in 1973 Beighton and colleagues published the nine-point score, adapted from Carter and Wilkinson's, in 1,083 Tswana Africans. [[Forghani2019,Kirk1967,VanDijk2024,Beighton1973,Clinch2011,Carter1964]]`,
     pt:`The Beighton score is a quick bendiness check doctors use. It is a starting point, not a diagnosis, and a high score at home does not mean you have EDS. [[Juul-Kristensen2017,Singh2017]]`,
     hook:`Beighton score: 9 points, devised on 1,083 Tswana Africans (1973). Name "Ehlers-Danlos syndrome": Parkes-Weber, 1936. [[Beighton1973,Clinch2011,Forghani2019]]`},
    {from:U(1986)-.0005,at:U(1986)+.002,k:'Era 3 · 1986 to 1988',t:'Berlin: 11 types',
     txt:`At the 7th International Congress of Human Genetics in Berlin (1986, published 1988), EDS was split into 11 types numbered I to XI, mainly by inheritance and clinical picture: type I gravis, type II mitis, type III hypermobile, type IV arterial-ecchymotic, type VII arthrochalasis/dermatosparaxis and type XI familial hypermobility among them. Switch the names to "Then" to see the numerals. [[Beighton1988,Forghani2019,Malek2021]]`,
     pt:`In 1986 experts agreed a numbered list of 11 kinds of EDS. Most of the numbers were later replaced by names.`,
     hook:`Berlin (1986, published 1988): 11 Roman-numeral types. EDS type III (Berlin) = hypermobility type (Villefranche) = hEDS (2017). [[Forghani2019,Malek2021]]`},
    {from:U(1997)-.0005,at:U(1997.4)+.002,k:'Era 4 · 1997 to 2000',t:'Genes and Villefranche',
     txt:`The late 1990s brought the genes. Arthrochalasia was traced to exon 6 of COL1A1 and COL1A2 (1997), classical EDS to type V collagen (COL5A2 in 1998, COL5A1 haploinsufficiency in 2000) and dermatosparaxis to the ADAMTS2 enzyme (1999); in 2000 a series of 220 index patients described the natural history of vascular EDS. Villefranche (1997, published 1998) cut the list to 6 named types, mainly by cause, and the Brighton criteria (1998, published 2000) defined joint hypermobility syndrome. [[Byers1997,Michalickova1998,Wenstrup2000,Colige1999,Pepin2000,Beighton1998,Grahame2000]]`,
     pt:`In the 1990s scientists began finding the gene changes behind several types, so the list could be sorted by cause rather than by appearance. [[Beighton1998,Byers1997,Colige1999]]`,
     hook:`Villefranche (1997, published 1998): 6 named types: classical, hypermobility, vascular, kyphoscoliosis, arthrochalasia, dermatosparaxis. [[Beighton1998,Forghani2019]]`},
    {from:U(2017)-.0005,at:U(2017)+.002,k:'Era 5 · 2017',t:'Thirteen types',
     txt:`After many newly described molecular types, and concern that the hypermobile type had inadequate criteria, the International Consortium spent about two years on a new classification. The 2017 version names 13 types; for all but hEDS the definite diagnosis "relies on molecular confirmation". Joint hypermobility syndrome and the hypermobility type were folded into hEDS, with hypermobility spectrum disorder for people who do not meet the stricter criteria. [[Bloom2017,Malfait2017,Tinkle2017,Castori2017]]`,
     pt:`Since 2017 there are 13 kinds of EDS. Twelve can be confirmed with a gene test; hypermobile EDS is diagnosed with a checklist and an examination. [[Malfait2017]]`,
     hook:`2017: 13 types; all except hEDS need a causative variant. HSD = symptomatic hypermobility that fits no syndrome. [[Malfait2017,Castori2017]]`},
    {from:U(2018)-.0005,at:U(2018)+.002,k:'Era 6 · 2018 to today',t:'After 2017',
     txt:`The HEDGE study (from 2018) is sequencing the genomes of people with hEDS; most experts expect hEDS will not turn out to have a single-gene cause (<span class="ev hyp">Hypothesis</span>). By 2020 a primer counted 14 types and 20 genes. An Italian centre argued in 2024 that the 2017 hEDS criteria should be less stringent, and a revision is being worked on; until it is published, the 2017 criteria are the standard. [[Douglas2026,VanDijk2024,Malfait2020,Ritelli2024,Malfait2017]]`,
     pt:`Researchers are reading the full genetic code of about 1,000 people with hypermobile EDS to look for its causes. [[VanDijk2024]]`,
     hook:`Malfait 2020 counts 14 types (20 genes): classical-like EDS type 2 (AEBP1) was added after 2017. HEDGE (begun 2018): 1,000 genomes. [[Malfait2020,Malek2021,Douglas2026,VanDijk2024]]`}];
  const setSt=stepWire($('#hiSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- the lists of types: [then label, then sub, now label, now sub, style] ---------- */
  const BERLIN=[['I','gravis','cEDS','was type I'],['II','mitis','cEDS','was type II'],['III','hypermobile','hEDS','was type III','h'],['IV','arterial-|ecchymotic','vEDS','was type IV'],
    ['V','X-linked','left EDS','was type V','x'],['VI','','kEDS','was type VI'],['VII','arthrochalasis,|dermatosparaxis','aEDS · dEDS','was type VII'],['VIII','','VIII','not mapped','q'],
    ['IX','occipital horn','left EDS','was type IX','x'],['X','fibronectin-|deficient','left EDS','was type X','x'],['XI','familial|hypermobility','left EDS','was type XI','x']];
  const VF=[['classical','','cEDS','classical'],['hypermobility','','hEDS','hypermobile','h'],['vascular','','vEDS','vascular'],['kyphoscoliosis','','kEDS','kyphoscoliotic'],['arthrochalasia','','aEDS','arthrochalasia'],['dermatosparaxis','','dEDS','dermatosparaxis']];
  const Y17=[['classical','','cEDS','COL5A1/2'],['hypermobility','','hEDS','no gene known','h'],['vascular','','vEDS','COL3A1'],['kyphoscoliosis','','kEDS','PLOD1, FKBP14'],['arthrochalasia','','aEDS','COL1A1/2'],['dermatosparaxis','','dEDS','ADAMTS2'],
    ['not a 1997','type','clEDS','TNXB','n'],['not a 1997','type','cvEDS','COL1A2','n'],['not a 1997','type','spEDS','3 genes','n'],['not a 1997','type','mcEDS','CHST14, DSE','n'],['not a 1997','type','mEDS','COL12A1','n'],['not a 1997','type','pEDS','C1R, C1S','n'],['not a 1997','type','BCS','ZNF469, PRDM5','n']];
  const LISTS={berlin:{L:BERLIN,h:'BERLIN 1986/88 · 11 TYPES'},vf:{L:VF,h:'VILLEFRANCHE 1997/98 · 6 TYPES'},y17:{L:Y17,h:'2017 INTERNATIONAL CLASSIFICATION · 13 TYPES'},
    y20:{L:Y17.concat([['after 2017','','clEDS2','AEBP1','d']]),h:'2020 PRIMER · 14 TYPES'},rev:{L:Y17,h:'2017 · STILL THE PUBLISHED STANDARD'}};

  function chips(key,x,y,w,h,lp){const D=LISTS[key],L=D.L,n=L.length,cols=n<=6?3:4,gap=6,cw=(w-gap*(cols-1))/cols,rows=Math.ceil(n/cols),ch=Math.min(44,(h-22-gap*(rows-1))/rows);
    let g=`<text x="${f1(x)}" y="${f1(y+11)}" class="t-sm" style="fill:var(--accent);font-weight:600">${D.h}</text>`;
    L.forEach((c,i)=>{const cx=x+(i%cols)*(cw+gap),cy=y+20+Math.floor(i/cols)*(ch+gap),e=ease(ramp(lp,i*.025,.2+i*.025)),st=c[4]||'',now=names==='now';
      const main=now?c[2]:c[0],sub=(key==='rev'&&st==='h'&&now)?'under review':(now?c[3]:c[1])||'';
      const fs=Math.min(12.5,(cw-12)/(main.length*.6)),longest=Math.max(...sub.split('|').map(q=>q.length),1),ss=Math.min(9.5,(cw-12)/(longest*.6));
      const fill=st==='x'?'var(--panel)':st==='h'?'var(--accent-soft)':st==='n'||st==='d'?'var(--dx-soft)':st==='q'?'var(--panel-2)':'var(--brand-soft)';
      const stroke=st==='x'?'var(--muted)':st==='h'?'var(--accent)':st==='n'||st==='d'?'var(--dx)':'var(--line)';
      g+=`<g style="opacity:${f1(e)}" transform="translate(0 ${f1((1-e)*8)})"><rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${f1(ch)}" rx="7" style="fill:${fill};stroke:${stroke};stroke-width:1.2;${st==='x'||st==='d'||(st==='h'&&key==='rev')?'stroke-dasharray:4 3':''}"/>`;
      if(st==='h'&&now)g+=`<path d="M${f1(cx+cw-22)} ${f1(cy+2)}l20 20M${f1(cx+cw-14)} ${f1(cy+2)}l12 12" style="stroke:var(--accent);stroke-width:1.2;opacity:.6"/>`;
      g+=`<text x="${f1(cx+7)}" y="${f1(cy+15)}" class="t-lbl" style="font-size:${f1(fs)}px;${st==='x'&&now?'fill:var(--muted);text-decoration:line-through':''}">${main}</text>`;
      sub.split('|').forEach((s,k)=>{if(s&&ch>26+k*10)g+=`<text x="${f1(cx+7)}" y="${f1(cy+27+k*10)}" class="t-xs" style="font-size:${f1(ss)}px">${s}</text>`});
      g+='</g>'});
    return g}

  /* ---------- small pictures for the non-classification events ---------- */
  function wrap(s,n){const w=s.split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out}
  function glyph(e,x,y,w,h,lp){let g='';const cx=x+w/2,cy=y+h/2,ee=ease(lp);
    const cap=(s,yy)=>`<text x="${f1(cx)}" y="${f1(yy)}" class="t-xs t-mid" style="fill:var(--ink)">${s}</text>`;
    if(e.g==='scar'||e.g==='bruise'||e.g==='pull'){const sw=Math.min(w-30,350),sh=e.g==='pull'?80:Math.min(h-58,96),sx=cx-sw/2,sy=y+(e.g==='pull'?76:34);
      const o=e.g==='scar'?{h:sh,scar:.2+.8*ee}:e.g==='bruise'?{h:sh,bruise:ee,pull:.25*bump(lp,0,1)}:{h:sh,pull:bump(lp,0,.9)*.9+.1,max:32,fingers:true};
      g+=skin(sx,sy,sw,o).svg;
      g+=cap(e.g==='scar'?'skin that splits leaves widened, thin scars':e.g==='bruise'?'easy bruising, an old sign of EDS':'skin that stretches far, and tears easily',y+h-6)}
    if(e.g==='name'){const full='Ehlers-Danlos syndrome',k=Math.round(full.length*ramp(lp,0,.7));
      g+=zebra(cx,y+h*.36,Math.min(34,h*.2),{id:'hiZb'});
      g+=`<text x="${f1(cx)}" y="${f1(y+h*.36+Math.min(34,h*.2)+30)}" class="t-big t-mid" style="font-size:22px">${full.slice(0,k)}<tspan style="fill:var(--accent)">${k<full.length?'|':''}</tspan></text>`;
      [['Ehlers','1901',-1],['Danlos','1908',1]].forEach(p=>{const px=cx+p[2]*Math.min(w*.3,110);g+=`<text x="${f1(px)}" y="${f1(y+h-10)}" class="t-xs t-mid" style="opacity:${f1(ramp(lp,.5,.9))}">${p[0]} · ${p[1]}</text>`});
      }
    if(e.g==='limb'){const deg=-ee*24,L=Math.min(w*.3,110),r=limb(cx-10,cy+6,L,deg,{len2:L*.9,w:16,arc:true,limit:-10});g+=r.svg;
      g+=cap(e.y===1998?'hypermobility plus pain: a syndrome, not just a score':'a joint bending back beyond straight',y+h-6)}
    if(e.g==='joint'){const s=Math.min(.75,(h-30)/190);g+=joint(cx,y+h*.48,s,{lax:ee*.9,slip:ee*.35,ang:ee*12,muscle:.3,hl:lp>.6});
      g+=cap(e.y===1967?'hypermobile joints that hurt':'lax joints, several inheritance patterns',y+h-6)}
    if(e.g==='gene'){const hw=Math.min(w-40,300),hx=cx-hw/2;
      g+=`<text x="${f1(cx)}" y="${f1(y+28)}" class="t-big t-mid" style="font-size:22px;fill:var(--variant)">${e.gene}</text>`;
      g+=`<text x="${f1(cx)}" y="${f1(y+44)}" class="t-xs t-mid">${e.gsub}</text>`;
      g+=helix(hx,y+h*.64,hw,{amp:16,turns:hw/60,zip:1,phase:lp*1.5,kink:lp>.25?.5:null,w:3})}
    if(e.g==='hedge'){const rows=4,cw=Math.min(w-40,300),x0=cx-cw/2;
      for(let r=0;r<rows;r++)g+=chain(x0,y+30+r*((h-60)/rows),cw,{n:26,show:clamp(lp*1.6-r*.2,.04,1),pro:false,col:r%2?'var(--chain-c)':'var(--chain-a)'});
      g+=`<text x="${f1(cx)}" y="${f1(y+16)}" class="t-sm t-mid" style="fill:var(--accent)">TARGET: 1,000 WHOLE GENOMES</text>`;
      g+=cap('adults meeting the 2017 criteria · no causal gene yet',y+h-6)}
    if(e.g==='crowd'){const per=27,cs=Math.min((w-10)/per,10),tot=327,k=Math.round(tot*ee),x0=cx-per*cs/2;
      for(let i=0;i<tot;i++){const px=x0+(i%per)*cs,py=y+22+Math.floor(i/per)*cs;g+=`<rect x="${f1(px)}" y="${f1(py)}" width="${f1(cs-1.4)}" height="${f1(cs-1.4)}" rx="1.5" style="fill:${i<k?'var(--accent)':'var(--panel-2)'}"/>`}
      g+=`<text x="${f1(cx)}" y="${f1(y+14)}" class="t-sm t-mid" style="fill:var(--accent)">${k} OF 327 PEOPLE REASSESSED</text>`;
      g+=cap('diagnosed under older criteria, re-checked against 2017',y+h-6)}
    return g}

  /* ---------- the type-count step line ---------- */
  const COUNT=[[1988,11,'Berlin 11'],[1998,6,'Villefranche 6'],[2017,13,'2017: 13'],[2020,14,'2020 primer: 14']];

  function draw(t){const N=vb(svg,'720 380','400 560');const W=N?400:720;
    const ei=evAt(t),e=EV[ei],nu=ei<EV.length-1?EV[ei+1].u:1,lp=ramp(t,e.u,Math.max(e.u+.006,nu-.004));
    const ax0=N?22:26,ax1=W-(N?18:22),X=u=>ax0+u*(ax1-ax0);
    let s=`<defs>${marker('hiArr','var(--muted)')}</defs>`;
    /* header: year and headline */
    s+=`<text x="16" y="${N?36:38}" class="t-big" style="font-size:${N?28:32}px;fill:var(--ink)">${e.lbl}</text>`;
    s+=`<text x="16" y="${N?58:62}" class="t-big" style="font-size:${N?17:18}px;fill:var(--accent)">${e.head}</text>`;
    /* card: who and role */
    const cw=N?54:40,cy0=N?82:88;
    const wl=wrap(e.who,cw),rl=wrap(e.role,N?58:44);
    wl.forEach((l,i)=>s+=`<text x="16" y="${cy0+i*16}" class="t-lbl">${l}</text>`);
    rl.forEach((l,i)=>s+=`<text x="16" y="${cy0+wl.length*16+4+i*14}" class="t-sm">${l}</text>`);
    /* era counter */
    const eraY=N?cy0+wl.length*16+rl.length*14+18:200;
    if(!N){const eraTxt=e.k?'a classification':e.g==='gene'?'a gene found':e.g==='hedge'||e.g==='crowd'?'research':'a description';
      s+=`<text x="16" y="${eraY-24}" class="t-xs">EVENT ${ei+1} OF ${EV.length} · ${eraTxt.toUpperCase()}</text>`;
      s+=`<rect x="16" y="${eraY-16}" width="268" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="16" y="${eraY-16}" width="${f1(268*(ei+1)/EV.length)}" height="5" rx="2.5" style="fill:var(--accent)"/>`}
    /* right panel: list of types, or a picture */
    const P=N?{x:16,y:eraY,w:368,h:186}:{x:312,y:12,w:392,h:192};
    s+=`<rect x="${P.x-6}" y="${P.y-4}" width="${P.w+12}" height="${P.h+8}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=e.k?chips(e.k,P.x+4,P.y+4,P.w-8,P.h-8,lp*2.2):glyph(e,P.x,P.y,P.w,P.h,lp);
    /* the count chart */
    const C=N?{y0:P.y+P.h+30,h:90}:{y0:228,h:78},CY=v=>C.y0+C.h-v/14*C.h,yr=yOf(t);
    s+=`<text x="${ax0}" y="${C.y0-10}" class="t-sm" style="fill:var(--accent)">TYPES RECOGNISED</text>`;
    [0,7,14].forEach(v=>{s+=`<line x1="${ax0}" x2="${ax1}" y1="${f1(CY(v))}" y2="${f1(CY(v))}" class="grid"/><text x="${ax0-4}" y="${f1(CY(v)+3)}" class="t-xs t-end">${v}</text>`});
    if(yr==null||yr<1988)s+=`<text x="${f1(X(uOf(1988))-4)}" y="${f1(CY(5))}" class="t-xs t-end">no agreed classification yet</text>`;
    let d='',lastX=null;
    COUNT.forEach((c,i)=>{if(yr==null||yr<c[0])return;const x0=X(uOf(c[0])),x1=X(uOf(i<COUNT.length-1?Math.min(COUNT[i+1][0],yr):Math.min(2027,yr))),yy=CY(c[1]);
      if(i===3){s+=`<path d="M${f1(x0)} ${f1(CY(13))}V${f1(yy)}H${f1(Math.max(x0,x1))}" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-dasharray:5 3"/>`;}
      else{d+=(lastX==null?`M${f1(x0)} ${f1(yy)}`:`V${f1(yy)}`)+`H${f1(Math.max(x0,x1))}`;lastX=x1}
      const P2=[[x0+3,yy-5,''],[x0+3,yy+13,''],[x0-4,yy+12,'t-end'],[ax1,yy-5,'t-end']][i];
      if(!(N&&i===3))s+=`<text x="${f1(P2[0])}" y="${f1(P2[1])}" class="t-xs ${P2[2]}" style="fill:var(--ink)">${N&&i===2?'13':c[2]}</text>`});
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>`;
    /* the axis */
    const ay=N?C.y0+C.h+48:338;
    s+=`<line x1="${f1(X(.035))}" x2="${ax1}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:1.2"/><line x1="${ax0}" x2="${f1(X(.022))}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<path d="M${f1(X(.022)-1)} ${ay+5}l4 -10M${f1(X(.035)-3)} ${ay+5}l4 -10" style="stroke:var(--muted);stroke-width:1.2"/>`;
    const ticks=N?[1900,1930,1960,1990,2020]:[1890,1910,1930,1960,1970,1980,1990,2000,2010,2020];
    ticks.forEach(y=>s+=`<line x1="${f1(X(uOf(y)))}" x2="${f1(X(uOf(y)))}" y1="${ay}" y2="${ay+4}" style="stroke:var(--muted)"/><text x="${f1(X(uOf(y)))}" y="${ay+16}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${f1(X(.012))}" y="${ay+16}" class="t-xs t-mid">BC</text>`;
    s+=`<line x1="${f1(X(U1))}" x2="${f1(X(U1))}" y1="${ay-8}" y2="${ay+4}" style="stroke:var(--muted);stroke-dasharray:2 2"/><text x="${f1(X(U1)+4)}" y="${ay-8}" class="t-xs">${N?'wider →':'scale widens →'}</text>`;
    /* event dots */
    EV.forEach((v,i)=>{const x=X(v.u),past=i<=ei,on=i===ei;
      s+=`<circle cx="${f1(x)}" cy="${ay}" r="${on?6:3.6}" style="fill:${on?'var(--accent)':past?'var(--ink)':'var(--panel)'};stroke:${on?'var(--accent)':'var(--muted)'};stroke-width:1.2"/>`});
    /* cursor */
    const cx=X(t);
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${C.y0-2}" y2="${ay-8}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3;opacity:.8"/>`;
    const tag=yr==null?'c. 400 BC':String(Math.round(yr)),tw=tag.length*7+12,tx=clamp(cx-tw/2,ax0,ax1-tw);
    s+=`<rect x="${f1(tx)}" y="${ay+22}" width="${tw}" height="17" rx="8" style="fill:var(--accent)"/><text x="${f1(tx+tw/2)}" y="${ay+34}" class="t-xs t-mid" style="fill:var(--panel);font-weight:600">${tag}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);
    $('#hiNote').innerHTML=noteHTML(STEPS[ph]);
    $('#hiEvent').innerHTML=`<b>${e.lbl} · ${e.who}</b> ${e.txt}`;
    $$('#hiYears [data-hiy]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hiy===ei));
  }
  const stop=playWire(rg,$('#hiPlay'),draw,42000,'%t:player.replay%','history');

  /* year chips: jump to an event */
  $('#hiYears').innerHTML=EV.map((v,i)=>`<button class="tag" data-hiy="${i}" aria-pressed="false" title="${v.head.replace(/"/g,'&quot;')}">${v.lbl} · ${v.chip}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hiy]');if(!b)return;stop();const u=EV[+b.dataset.hiy].u+.003;rg.value=u;draw(u)});
  $$('[data-hinames]').forEach(b=>b.addEventListener('click',()=>{names=b.dataset.hinames;$$('[data-hinames]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const ei=evAt(+rg.value);if(!EV[ei].k){stop();const u=U(1986)+.003;rg.value=u}draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- who was who ---------- */
  const WHO=[
    ['Edvard Ehlers','1901 · Denmark','Danish dermatologist','In 1901 Ehlers recognised the condition as a distinct entity, the first half of its name. [[Parapia2008,Forghani2019]]'],
    ['Henri-Alexandre Danlos','1908 · France','French dermatologist','In 1908 Danlos suggested that skin extensibility and fragility were the cardinal features. The name "Ehlers-Danlos syndrome" followed in 1936, proposed by Frederick Parkes-Weber. [[Parapia2008,Forghani2019]]'],
    ['Beighton','1969 to 1998','first author of the score and of two classifications','Beighton\'s 1973 study of 1,083 Tswana Africans gave the nine-point Beighton score. Beighton was also first author of the Berlin (1988) and Villefranche (1998) nosologies. [[Beighton1973,Clinch2011,Beighton1988,Beighton1998]]'],
    ['Byers','1997 to 2020','vascular EDS and collagen genes','Byers and colleagues traced arthrochalasia to exon 6 of COL1A1 and COL1A2 (1997) and described 220 index patients with vascular EDS (2000). Byers was first author of the 2017 vEDS consensus, which recommends confirming a COL3A1 variant before giving the diagnosis. [[Byers1997,Pepin2000,Byers2017]]'],
    ['Malfait','2017 and 2020','the International Classification','Malfait was first author of the 2017 International Classification, which recognises 13 types, and of the 2020 primer that counts 14 types caused by variants in 20 genes. [[Malfait2017,Malfait2020]]'],
    ['Grahame','1998 to 2003','joint hypermobility syndrome','Grahame was first author of the Brighton 1998 criteria for joint hypermobility syndrome (published 2000) and co-author of a five-part questionnaire: two or more "yes" answers had 84% sensitivity and 89% specificity for hypermobility. [[Grahame2000,Hakim2003]]']];
  $('#hiWho').innerHTML=WHO.map((w,i)=>`<div class="fc-wrap"><button class="fc" aria-pressed="false" aria-label="${w[0]}: turn the card over"><div class="face front"><small>Card ${i+1} of ${WHO.length}</small><span class="yr">${w[1]}</span><p>${w[0]}</p><span class="stage-cap">${w[2]}</span><small class="flip">Tap to turn</small></div><div class="face back"><small>${w[0]}</small><p>${w[3]}</p></div></button></div>`).join('');
  $$('#hiWho .fc').forEach(c=>c.addEventListener('click',()=>{const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));

  /* the zebra emblem */
  $('#hiZebra').innerHTML=zebra(32,32,30,{id:'hiZbCard'});
};
