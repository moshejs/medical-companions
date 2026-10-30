/* =============== 6.1 History & people =============== */
/* a stretched time axis: [year, position 0..1] knots */
const HI_SEG=[[-7000,0],[1700,.12],[1850,.27],[1940,.47],[1975,.66],[2000,.8],[2025,1]];
function hiU(y){const S=HI_SEG;if(y<=S[0][0])return 0;for(let i=1;i<S.length;i++)if(y<=S[i][0]){const a=S[i-1],b=S[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return 1}
function hiY(u){const S=HI_SEG;if(u<=0)return S[0][0];for(let i=1;i<S.length;i++)if(u<=S[i][1]){const a=S[i-1],b=S[i];return a[0]+(b[0]-a[0])*(u-a[1])/(b[1]-a[1])}return S[S.length-1][0]}
/* c: d = discoveries & tests, t = treatment, p = public health */
const HI_EV=[
 {y:-6750,d:'c. 7000 BCE',c:'d',t:'TB in Neolithic bones',s:'M. tuberculosis DNA and mycolic-acid markers in a woman and an infant buried at Atlit-Yam, a now-submerged village, 9,250–8,160 years ago.',
  txt:`<i>M. tuberculosis</i> DNA and mycolic acid markers were found in the bones of a woman and an infant buried at Atlit-Yam, a now-submerged Neolithic village in the Eastern Mediterranean, dated to 9,250–8,160 years ago. [[Hershkovitz2008]]`},
 {y:-2400,d:'c. 2400 BCE',c:'d',t:'Pott\'s disease in Egypt',s:'Egyptian remains show the spinal deformity of TB of the spine; later mummies from Thebes carry human-type TB DNA.',
  txt:`Egyptian remains from about 2400 BC show the spinal deformity of Pott's disease. [[Barberis2017]] In 85 mummies from Thebes (about 2050–500 BC), 25 samples carried <i>M. tuberculosis</i> complex DNA and none had an <i>M. bovis</i> pattern, which argues against the idea that human TB came from cattle TB. [[Zink2003]]`},
 {y:-420,d:'Ancient Greece',c:'d',t:'Phthisis',s:'The Greeks called it phthisis. Hippocrates described a fatal disease, especially of young adults.',
  txt:`The ancient Greeks called TB "phthisis". Hippocrates described it as a fatal disease, especially of young adults. [[Barberis2017]]`},
 {y:1720,d:'1720',c:'d',t:'"A new theory of Consumption"',s:'Benjamin Marten first suggests an infectious cause. TB mortality in Western Europe reaches up to 900 per 100,000 a year.',
  txt:`The English physician Benjamin Marten first suggested an infectious cause in "A new theory of Consumption". In 18th-century Western Europe, TB mortality reached as high as 900 deaths per 100,000 people a year, and in Europe and North America TB caused about one in four deaths. [[Barberis2017,Daniel2006]]`},
 {y:1854,d:'1854',c:'t',t:'The sanatorium cure',s:'Hermann Brehmer: "Tuberculosis is a curable disease". Fresh air and good food at Görbersdorf; sanatoria spread.',
  txt:`The sanatorium cure began with Hermann Brehmer's 1854 dissertation, "Tuberculosis is a curable disease", and his institution in Görbersdorf built on fresh air and good food. [[Barberis2017]] Sanatoria spread in the late 19th and early 20th centuries, combining rest with lung-collapse procedures to rest diseased lung and close cavities. [[Daniel2006]]`},
 {y:1865,d:'1865',c:'d',t:'TB is transmissible',s:'Jean-Antoine Villemin shows that TB can be passed on. Laennec\'s work had already begun to map its pathology.',
  txt:`Laennec's early-19th-century work began the understanding of TB pathology. In 1865 Jean-Antoine Villemin showed that TB is transmissible. [[Daniel2006,Cambau2014]]`},
 {y:1882,d:'24 March 1882',c:'d',t:'Koch: the tubercle bacillus',s:'Robert Koch presents the bacillus in Berlin, using a new stain and a solid culture medium. World TB Day marks the date.',
  txt:`Robert Koch presented his isolation of the tubercle bacillus to the Physiological Society in Berlin on 24 March 1882. [[Barberis2017]] It built on Villemin's proof and on a new staining technique and a solid, serum-based culture medium; the organism was named <i>Mycobacterium tuberculosis</i> a year later. [[Cambau2014]] World TB Day, 24 March, marks the announcement. [[CDC2018WTBD]]`},
 {y:1890,d:'1890',c:'t',t:'Tuberculin fails as a cure',s:'Koch offers tuberculin as a cure in 1890–91. It fails in practice, but later becomes a diagnostic tool.',
  txt:`Koch's tuberculin, offered as a cure in 1890/91, failed spectacularly in practice. [[Gradmann2006]] It later became important as a diagnostic tool. [[Sakula1982]]`},
 {y:1905,d:'1905',c:'d',t:'Nobel Prize for Koch',s:'Koch receives the Nobel Prize in Physiology or Medicine.',
  txt:`Robert Koch received the Nobel Prize in Physiology or Medicine in 1905. [[Barberis2017]]`},
 {y:1907,d:'1907',c:'d',t:'The tuberculin skin test',s:'Clemens von Pirquet develops the skin test, and three years later finds TB infection in children without symptoms.',
  txt:`Clemens von Pirquet developed the tuberculin skin test in 1907. Three years later he used it to show TB infection in children without symptoms. [[Daniel2006]] Today's version is covered in <a href="#tests" data-go="tests">TST &amp; IGRA</a>.`},
 {y:1921,d:'18 July 1921',c:'p',t:'First human BCG',s:'After 230 passages over 11 years by Calmette and Guérin, BCG is given by mouth to a newborn in Paris.',
  txt:`From 1908 Albert Calmette and Camille Guérin subcultured a virulent bovine strain; after about 230 subcultures over 11 years it no longer caused progressive TB in animals. On 18 July 1921 Benjamin Weill-Hallé and Raymond Turpin gave the first human dose by mouth, to a newborn in Paris whose mother had died of TB. From 1924 to 1928, 114,000 infants were vaccinated without serious complications. [[Luca2013]]`},
 {y:1930,d:'1930',c:'p',t:'The Lübeck disaster',s:'73 of 250 vaccinated infants die in their first year. The inquiry blames contamination in a local laboratory, not BCG.',
  txt:`In the 1930 Lübeck disaster, 73 of 250 vaccinated infants died in the first year. An inquiry blamed contamination of the vaccine with virulent bacilli in the local laboratory, not BCG itself. After World War II, UNICEF, the new WHO and Scandinavian Red Cross societies promoted BCG campaigns, which spread to low-income countries over the next decade. [[Luca2013]]`},
 {y:1944,d:'1944',c:'t',t:'Streptomycin',s:'Albert Schatz, Elizabeth Bugie and Selman Waksman report streptomycin, from a soil actinomycete.',
  txt:`Streptomycin was reported in 1944 by Albert Schatz, Elizabeth Bugie and Selman Waksman, from a soil actinomycete. [[Schatz1944,Crofton2006]]`},
 {y:1946,d:'1946',c:'t',t:'PAS',s:'Jörgen Lehmann reports para-aminosalicylic acid. With streptomycin it greatly reduces drug resistance.',
  txt:`Para-aminosalicylic acid (PAS) was reported by Jörgen Lehmann in The Lancet in January 1946. Combined with streptomycin, it greatly reduced drug resistance. [[Lehmann1946,Murray2015]]`},
 {y:1948,d:'1948',c:'t',t:'The MRC streptomycin trial',s:'A landmark randomised trial: sealed envelopes, blinded X-ray readers. 4 of 55 died on streptomycin, 15 of 52 on bed rest.',
  txt:`The 1948 Medical Research Council trial was a landmark randomised controlled trial: allocation used sealed envelopes ordered by random numbers, and the X-ray readers did not know the treatment group. [[MRC1948,Crofton2006,Yoshioka1998]] At 6 months, 4 of 55 people given streptomycin had died against 15 of 52 on bed rest alone, but 47 of 55 were still culture-positive and resistance emerged: one drug alone could not be relied on. [[Crofton2006]] Explore it in <b>What changed the curve?</b> below.`},
 {y:1952,d:'1952',c:'t',t:'Isoniazid and triple therapy',s:'Isoniazid: cheap, well tolerated and safe. Streptomycin + PAS + isoniazid "assured cure".',
  txt:`Isoniazid, reported in 1952, opened the modern treatment era: cheap, well tolerated and safe. [[MRC1952,Murray2015,Daniel2006]] "Triple therapy" with streptomycin, PAS and isoniazid, introduced in 1952, assured cure. [[Iseman2002]]`},
 {y:1959,d:'1959',c:'t',t:'Madras: home is as good as a sanatorium',s:'Treatment at home works as well as sanatorium care. India then had about 2.5 million people with TB and 23,000 beds.',
  txt:`The 1959 Madras trial found domiciliary chemotherapy as effective as sanatorium care, despite the sanatorium's rest, diet, nursing and supervision. India then had about 2.5 million people with active TB and only 23,000 TB beds. [[TCCMadras1959]] Home treatment also did not put family members at risk. [[Mitchison2005]]`},
 {y:1962,d:'Early 1960s',c:'t',t:'Ethambutol',s:'Ethambutol is shown to be effective and replaces PAS.',
  txt:`Ethambutol was shown effective in the early 1960s and replaced PAS. [[Murray2015]]`},
 {y:1968,d:'1968',c:'t',t:'Rifampicin',s:'From a chemical-modification programme in Milan, rifampicin enters clinical use.',
  txt:`Rifampicin came out of a Dow-Lepetit chemical-modification programme in Milan and entered clinical use in 1968. [[Sensi1983]] In the 1970s isoniazid plus rifampicin cut treatment from 18 to 9 months. [[Iseman2002,Murray2015]]`},
 {y:1972,d:'1972',c:'t',t:'Six-month regimens on trial',s:'The East African/British MRC trial of 6-month regimens is published. Adding pyrazinamide later makes 6-month cure standard.',
  txt:`The East African/British Medical Research Council trial of 6-month regimens was published in 1972. [[EastAfricaBMRC1972]] In the 1980s adding pyrazinamide allowed cure in 6 months. [[Iseman2002,Murray2015]] Supervised intermittent regimens can cure even far-advanced TB in as few as 62–78 doses over 26 weeks. [[Iseman2002]]`},
 {y:1993,d:'1993',c:'p',t:'A global emergency',s:'WHO declares TB a global emergency, and builds a five-element control strategy branded DOTS (1989–98).',
  txt:`WHO declared TB a global emergency in 1993. [[John2013]] Its first-phase policy (1948–63) worked in wealthier countries but largely failed in resource-poor settings; in 1989–98 WHO built a five-element strategy branded DOTS, yet by 1999 only 23% of infectious cases were managed under it. [[Raviglione2002]] In New York City, cases fell 21% from 1992 to 1994 as directly observed therapy grew from under 100 people to nearly 1,300. [[Frieden1995]]`},
 {y:2006,d:'2006',c:'p',t:'Stop TB Strategy',s:'WHO launches its Stop TB Strategy.',
  txt:`WHO launched its Stop TB Strategy in 2006. [[Raviglione2006]]`},
 {y:2010,d:'2010',c:'d',t:'Xpert MTB/RIF',s:'A cartridge test finds TB and rifampicin resistance in about 2 hours. WHO endorses it the same year.',
  txt:`In 1,730 people in four countries, the Xpert MTB/RIF cartridge test detected 98.2% of smear-positive and 72.5% of smear-negative culture-positive TB in one test, with 99.2% specificity. [[Boehme2010]] WHO endorsed it in 2010; it reports TB and rifampicin resistance within 2 hours. [[Lawn2011Xpert]] See <a href="#diagnose" data-go="diagnose">Diagnosing TB disease</a>.`},
 {y:2012,d:'28 Dec 2012',c:'t',t:'Bedaquiline approved',s:'The FDA approves bedaquiline for MDR-TB, with priority review.',
  txt:`Bedaquiline (Sirturo, NDA 204384) received its original FDA approval on 28 December 2012, with priority review, for MDR-TB. [[FDA-NDA204384,Cox2014]]`},
 {y:2014,d:'2014',c:'p',t:'End TB Strategy',s:'All WHO Member States endorse targets: 90% fewer deaths by 2030 and 95% by 2035, against 2015.',
  txt:`The End TB Strategy targets were endorsed by all WHO Member States at the World Health Assembly in 2014: 80% lower incidence and 90% fewer deaths by 2030, and 90% and 95% by 2035, compared with 2015. [[Floyd2018]] Progress so far is in <a href="#what" data-go="what">What TB is</a> and <a href="#frontier" data-go="frontier">Ending TB</a>.`},
 {y:2018,d:'2018',c:'p',t:'First UN high-level meeting',s:'The UN General Assembly holds its first high-level meeting on TB, in New York.',
  txt:`The first UN General Assembly high-level meeting on TB was held in New York in September 2018. [[Chakaya2021,Rodi2022]] A review found that financial investment afterwards remained insufficient for the burden. [[Rodi2022]]`},
 {y:2019,d:'14 Aug 2019',c:'t',t:'Pretomanid approved',s:'The FDA approves pretomanid, as part of BPaL for highly drug-resistant TB.',
  txt:`Pretomanid was approved in the US on 14 August 2019 (NDA 212862), as part of BPaL under the Limited Population Pathway for highly drug-resistant TB. [[FDA-NDA212862,Keam2019]]`},
 {y:2022,d:'Dec 2022',c:'t',t:'BPaLM: six months, all oral',s:'WHO recommends 6-month bedaquiline, pretomanid, linezolid and moxifloxacin for MDR/RR-TB.',
  txt:`In December 2022 WHO recommended the 6-month BPaLM regimen (bedaquiline, pretomanid, linezolid, moxifloxacin) in place of 9-month or longer regimens for MDR/RR-TB. [[Vanino2023,Nyangwa2022]] People starting 6-month MDR/RR-TB regimens rose from 1,744 in 2022 to 34,256 in 2024, in 97 countries. [[WHO-GTR2025]] See <a href="#drtb" data-go="drtb">Treating drug-resistant TB</a>.`},
 {y:2023,d:'2023',c:'p',t:'Second UN high-level meeting',s:'Member States adopt a target: by 2027, at least 90% of people who develop TB get quality diagnosis and treatment.',
  txt:`At the second UN high-level meeting on TB, in 2023, Member States adopted a target that by 2027 at least 90% of people who develop TB receive quality-assured diagnosis and treatment. [[WHO-GTR2025]]`}
];
const HI_STEPS=[
 {from:0,at:hiU(-2300),k:'Before 1700',t:'An ancient disease',pt:`TB is very old. It has been found in bones about 9,000 years old.`,hook:`Atlit-Yam (9,250–8,160 years ago): the oldest <i>M. tuberculosis</i> DNA in this list. Egyptian mummies carry human-type, not bovine, TB DNA.`},
 {from:hiU(1700),at:hiU(1866),k:'1700–1880',t:'Consumption and contagion',pt:`For centuries people did not know TB was an infection. Sanatoria offered rest, food and fresh air.`,hook:`Villemin 1865: TB is transmissible. Brehmer 1854: the sanatorium cure.`},
 {from:hiU(1880),at:hiU(1883),k:'1882–1939',t:'Koch, tuberculin and BCG',pt:`Robert Koch found the TB germ in 1882. World TB Day, 24 March, marks that day.`,hook:`24 March 1882 = World TB Day. Tuberculin failed as a cure (1890) but became the skin test (von Pirquet 1907). First BCG: 18 July 1921.`},
 {from:hiU(1942),at:hiU(1948.5),k:'1944–1960',t:'The first drugs and trials',pt:`Doctors learned early that one medicine alone stops working, so TB is always treated with several medicines together.`,hook:`MRC 1948: randomised, blinded X-ray reading; 4/55 vs 15/52 deaths at 6 months, and resistance on a single drug.`},
 {from:hiU(1961),at:hiU(1973),k:'1960–1990',t:'Short-course treatment',pt:`Treatment went from years to 6 months once rifampicin and pyrazinamide were added.`,hook:`1970s: isoniazid + rifampicin cut treatment from 18 to 9 months; 1980s: + pyrazinamide = 6 months.`},
 {from:hiU(1990),at:hiU(2023.4),k:'1990–2023',t:'Global control and new tools',pt:`New tests give answers in hours, and drug-resistant TB can now be treated with tablets for 6 months.`,hook:`1993 global emergency → DOTS → 2010 Xpert → 2012 bedaquiline → 2019 pretomanid → 2022 BPaLM.`}
];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),chips=$('#hiYears');const on={d:true,t:true,p:true};let setSt=()=>{};
  const CAT={d:['Discoveries & tests','var(--accent)'],t:['Treatment','var(--rx)'],p:['Public health','var(--vax)']};
  const TOOLS=[{y:1907,l:'TST',c:'var(--accent)'},{y:1921,l:'BCG',c:'var(--vax)'},{y:1944,l:'S',n:'streptomycin',c:'var(--dNew)'},{y:1946,l:'PAS',c:'var(--muted)',gone:1962},
    {y:1952,l:'H',n:'isoniazid',c:'var(--dH)'},{y:1962,d:'1960s',l:'E',n:'ethambutol',c:'var(--dE)'},{y:1968,l:'R',n:'rifampicin',c:'var(--dR)'},{y:1980,d:'1980s',l:'Z',n:'pyrazinamide (6-month cure)',c:'var(--dZ)'},
    {y:2010,l:'Xpert',c:'var(--accent)'},{y:2012,l:'B',n:'bedaquiline',c:'var(--dNew)'},{y:2019,l:'Pa',n:'pretomanid',c:'var(--dNew)'},{y:2022,l:'BPaLM',c:'var(--rx)'}];
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L};
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  function cur(Y){let e=null;HI_EV.forEach(v=>{if(on[v.c]&&v.y<=Y+.01)e=v});return e}
  function draw(t){const N=vb(svg,'720 390','400 600');const Y=hiY(t),ph=phaseOf(HI_STEPS,t),E=cur(Y);
    const L=N?{ax0:96,ax1:384,ly:[266,292,318],ty:342,cy:64,ch:176,tw:46,tb:380,tl:520}:{ax0:130,ax1:700,ly:[176,202,228],ty:252,cy:44,ch:104,tw:96,tb:292,tl:372};
    const X=u=>lerp(L.ax0,L.ax1,u),yrTxt=Y<0?Math.round(-Y/50)*50+' BCE':String(Math.round(Y));
    let s=`<text x="${N?16:30}" y="28" class="t-big">${HI_STEPS[ph].t}</text><text x="${N?16:690}" y="${N?50:28}" class="t-big ${N?'':'t-end'}" style="fill:var(--brand);font-family:var(--mono)">${yrTxt}</text>`;
    /* the milestone card */
    if(E){const age=t-hiU(E.y),op=clamp(.35+age*40),dx=(1-clamp(age*30))*14,cx=N?16:30,cw=N?368:660;
      s+=`<g style="opacity:${f1(op)}" transform="translate(${f1(dx)} 0)"><rect x="${cx}" y="${L.cy}" width="${cw}" height="${L.ch}" rx="12" style="fill:var(--panel-2);stroke:${CAT[E.c][1]};stroke-width:1.4"/>`;
      s+=`<rect x="${cx}" y="${L.cy}" width="6" height="${L.ch}" rx="3" style="fill:${CAT[E.c][1]}"/>`;
      s+=`<text x="${cx+18}" y="${L.cy+22}" class="t-sm" style="fill:${CAT[E.c][1]}">${E.d.toUpperCase()} · ${CAT[E.c][0].toUpperCase()}</text>`;
      const tl=wrap(E.t,N?34:80);tl.forEach((l,i)=>s+=`<text x="${cx+18}" y="${L.cy+44+i*19}" class="t-big" style="font-size:${N?17:18}px">${esc(l)}</text>`);
      const bl=wrap(E.s,L.tw).slice(0,N?6:2),by=L.cy+44+tl.length*19+4;
      bl.forEach((l,i)=>s+=`<text x="${cx+18}" y="${by+i*(N?17:18)}" class="t-lbl" style="font-weight:500;font-size:${N?12.5:13}px">${esc(l)}</text>`);
      s+='</g>'}
    else s+=`<text x="${N?16:30}" y="${L.cy+40}" class="t-sm">No milestone shown yet: switch a filter back on or scrub forward.</text>`;
    /* lanes */
    ['d','t','p'].forEach((c,i)=>{const y=L.ly[i];s+=`<text x="${N?16:30}" y="${y+3}" class="t-xs" style="fill:${CAT[c][1]};opacity:${on[c]?1:.35}">${['discoveries','treatment','public health'][i]}</text><line x1="${L.ax0}" x2="${L.ax1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-dasharray:2 3"/>`;
      if(!on[c])return;
      HI_EV.filter(v=>v.c===c).forEach(v=>{const x=X(hiU(v.y)),past=v.y<=Y+.01,isE=v===E;
        s+=`<circle cx="${f1(x)}" cy="${y}" r="${isE?7:4.5}" style="fill:${past?CAT[c][1]:'var(--panel)'};stroke:${CAT[c][1]};stroke-width:1.4;opacity:${past?1:.6}"/>`})});
    /* axis */
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ty-10}" y2="${L.ty-10}" class="axis"/>`;
    HI_SEG.forEach(([yr,u],i)=>{const x=X(u);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ty-14}" y2="${L.ty-6}" class="axis"/>`;
      if(!N||(i!==2&&i!==1))s+=`<text x="${f1(x)}" y="${L.ty+6}" class="t-xs ${i===0?'':i===HI_SEG.length-1?'t-end':'t-mid'}">${yr<0?(N?'7000 BC':'7000 BCE'):yr}</text>`});
    /* era bands under the axis */
    HI_STEPS.forEach((st,i)=>{const a=X(st.from),b=X(i<HI_STEPS.length-1?HI_STEPS[i+1].from:1);s+=`<rect x="${f1(a)}" y="${L.ty-12}" width="${f1(Math.max(0,b-a-1))}" height="4" style="fill:${i===ph?'var(--brand)':'var(--line)'}"/>`});
    /* playhead */
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.ly[0]-14}" y2="${L.ty-8}" style="stroke:var(--brand);stroke-width:2"/><circle cx="${f1(X(t))}" cy="${L.ty-10}" r="5" style="fill:var(--brand)"/>`;
    /* toolbox */
    s+=`<text x="${N?16:30}" y="${L.tb}" class="t-sm">TOOLBOX IN ${yrTxt}</text>`;
    const tw=N?58:52,gap=N?2:4;
    TOOLS.forEach((T,i)=>{const col=N?i%6:i,row=N?Math.floor(i/6):0,x=(N?16:30)+col*(tw+gap),y=L.tb+10+row*48,have=Y>=T.y,gone=T.gone&&Y>=T.gone;
      const o=have?(gone?.45:1):.22;
      s+=`<g style="opacity:${o}"><rect x="${x}" y="${y}" width="${tw}" height="26" rx="6" style="fill:${have?'var(--panel)':'none'};stroke:${T.c};stroke-width:${have?1.6:1};stroke-dasharray:${have?'0':'3 3'}"/>`;
      if(T.n)s+=pill(x+12,y+13,14,T.c,{tab:true});
      s+=`<text x="${T.n?x+34:x+tw/2}" y="${y+17}" class="t-lbl t-mid" style="font-size:12px;${gone?'text-decoration:line-through':''}">${T.l}</text><text x="${x+tw/2}" y="${y+38}" class="t-xs t-mid">${T.d||T.y}</text></g>`});
    const len=Y<1944?'no effective drug: rest, food, fresh air, lung collapse':Y<1952?'streptomycin alone, then with PAS: resistance a problem':Y<1970?'triple therapy: about 18 months':Y<1980?'isoniazid + rifampicin: 9 months':Y<2022?'6 months with pyrazinamide (drug-susceptible TB)':'6 months for drug-susceptible TB; 6-month BPaLM for MDR/RR-TB';
    if(N)s+=`<text x="16" y="${L.tl}" class="t-sm" style="fill:var(--ink)">Standard treatment then:</text>`+wrap(len,52).map((l,i)=>`<text x="16" y="${L.tl+18+i*16}" class="t-sm" style="fill:var(--rx);font-weight:700">${l}</text>`).join('');
    else s+=`<text x="30" y="${L.tl}" class="t-sm" style="fill:var(--ink)">Standard treatment then: <tspan style="fill:var(--rx);font-weight:700">${len}</tspan></text>`;
    svg.innerHTML=s;setSt(ph);
    const st=HI_STEPS[ph];
    $('#hiNote').innerHTML=noteHTML(E?{k:`${E.d} · ${CAT[E.c][0]}`,t:E.t,txt:E.txt,pt:st.pt,hook:st.hook}:{k:st.k,t:st.t,txt:'All milestones in this stretch are filtered out.',pt:st.pt,hook:st.hook});
    if(ph!==chipPh){chipPh=ph;chipsDraw()}
    $$('[data-hy]',chips).forEach(b=>b.classList.toggle('brand',HI_EV[+b.dataset.hy]===E));
  }
  let chipPh=-1;
  function chipsDraw(){const a=HI_STEPS[Math.max(0,chipPh)].from,b=chipPh>=0&&chipPh<HI_STEPS.length-1?HI_STEPS[chipPh+1].from:1.01;
    chips.innerHTML=HI_EV.map((v,i)=>{const u=hiU(v.y),show=on[v.c]&&u>=a-.001&&u<b-.001;return show?`<button class="tag" data-hy="${i}">${v.d.replace('Ancient Greece','Greece')} · ${esc(v.t)}</button>`:''}).join('')}
  const stop=playWire(rg,$('#hiPlay'),draw,40000,'%t:player.replay%','history');
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=HI_EV[+b.dataset.hy],u=Math.min(1,hiU(v.y)+.0015);rg.value=u;draw(u)});
  $$('[data-hf]').forEach(b=>b.addEventListener('click',()=>{const c=b.dataset.hf;on[c]=!on[c];b.setAttribute('aria-pressed',on[c]);chipsDraw();draw(+rg.value)}));
  chipsDraw();draw(+rg.value);

  /* ---- what changed the curve ---- */
  const ms=$('#hiMort'),mr=$('#hiMT');let lens='decline';
  const CITY=[['Cape Town'],['New York City'],['London']];
  const MN={
    decline:{lab:'Year',k:'England and Wales, 1853–1910',t:'Falling before any drug',
      txt:`TB mortality in England and Wales fell by an average of 1.71% a year (95% CI 0.77–2.63) from 1853 to 1910, before any effective drug. Over the same period total mortality, infant mortality and housing density did not fall significantly. The authors argue that social conditions alone do not explain the decline and propose a role for natural selection (<span class="ev hyp">Hypothesis</span>). [[Davies1999]] Koch's 1882 discovery changed understanding, not treatment.`,
      pt:`TB was already becoming less deadly in Victorian England, decades before any medicine. Why is still debated.`,
      hook:`England and Wales 1853–1910: TB mortality −1.71%/year with no drugs; sanatoria from 1854.`},
    contacts:{lab:'Year',k:'England and Wales, model',t:'Fewer effective contacts',
      txt:`A model for England and Wales estimates that each infectious person effectively contacted about 22 people in 1900, about 10 by 1950 and about 1 by 1990; falling contact was a major driver of the decline. [[Vynnycky1999]] Drugs came in the middle of this fall: streptomycin in 1944 and triple therapy in 1952. [[Schatz1944,Iseman2002]] The circles are the model's values; the lines between them are drawn.`,
      pt:`As housing, work and health care changed, each person with TB passed it to fewer people. Treatment added to a fall that had already begun.`,
      hook:`Effective contacts per infectious case (E&W model): 22 (1900) → 10 (1950) → 1 (1990).`},
    fatality:{lab:'Year',k:'Three cities',t:'Drugs cut deaths, not always spread',
      txt:`In the pre-chemotherapy era, TB case fatality in Cape Town, New York City and London was 45–60% a year; after combination chemotherapy it fell below 10% in all three. But the cities had already diverged: rates fell steadily in New York and London and stayed high in Cape Town, where notification rates returned to pre-chemotherapy levels by 1980 and doubled again with HIV in the 1990s. Chemotherapy cut case fatality but not transmission. [[Hermans2015]]`,
      pt:`Medicines turned TB from a disease that killed about half of the people who had it into one that can be cured. Stopping it spreading needed more than medicines.`,
      hook:`Case fatality 45–60%/year before drugs → under 10% after combination chemotherapy (Cape Town, New York, London). Before drugs, pulmonary TB had about 50% mortality. [[Mitchison2005]]`},
    trial:{lab:'Month',k:'MRC 1948',t:'The first randomised trial of a TB drug',
      txt:`The trial enrolled people aged 15–30 with acute progressive bilateral pulmonary TB. At 6 months, 4 of 55 people given streptomycin had died, against 15 of 52 given bed rest alone. But 47 of 55 on streptomycin were still culture-positive, and resistance emerged, especially after month 4. [[Crofton2006]] Allocation by sealed envelopes ordered by random numbers, with X-ray readers who did not know the group, made it a model for later trials. [[Yoshioka1998,MRC1948]]`,
      pt:`The new medicine saved lives, but given alone the germs soon learned to resist it. That is why TB is treated with several medicines together.`,
      hook:`MRC 1948: deaths 4/55 (7%) vs 15/52 (29%) at 6 months; resistance after month 4 on monotherapy.`}};
  function drawM(t){const N=vb(ms,'720 330','400 460'),M=MN[lens];$('#hiMLab').textContent=M.lab;let s='';
    const C=N?{x0:46,x1:384,y0:40,y1:300}:{x0:60,x1:690,y0:40,y1:280};
    const axes=(xa,xb,ya,yb,yt,xt,fmt)=>{const X=v=>lerp(C.x0,C.x1,(v-xa)/(xb-xa)),V=v=>lerp(C.y1,C.y0,(v-ya)/(yb-ya));
      yt.forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v===ya?'axis':'grid'}"/><text x="${C.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${fmt(v)}</text>`);
      xt.forEach(v=>s+=`<text x="${f1(X(v))}" y="${C.y1+15}" class="t-xs t-mid">${v}</text>`);return[X,V]};
    if(lens==='decline'){const Y=lerp(1853,1910,t),f=y=>100*Math.pow(1-.0171,y-1853);const [X,V]=axes(1850,1915,0,100,[0,25,50,75,100],[1850,1870,1890,1910],v=>v+'%');
      s+=`<text x="${C.x0}" y="${C.y0-16}" class="t-sm" style="fill:var(--tb)">${N?'TB MORTALITY, % OF 1853':'TB MORTALITY IN ENGLAND AND WALES, % OF ITS 1853 LEVEL'}</text>`;
      [[1854,'sanatorium cure'],[1882,'Koch']].forEach(([yr,l])=>s+=`<line x1="${f1(X(yr))}" x2="${f1(X(yr))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--muted);stroke-dasharray:3 3;opacity:.6"/><text x="${f1(X(yr)+4)}" y="${C.y1-8}" class="t-xs">${l}</text>`);
      s+=`<path d="${pathFn(u=>1-f(lerp(1853,Y,u))/100,X(1853),X(Y),C.y0,C.y1,60)}" style="fill:none;stroke:var(--tb);stroke-width:2.8"/>`;
      s+=`<circle cx="${f1(X(Y))}" cy="${f1(V(f(Y)))}" r="5" style="fill:var(--tb)"/><text x="${f1(Math.min(X(Y)+8,C.x1-70))}" y="${f1(V(f(Y))-10)}" class="t-lbl" style="fill:var(--tb)">${Math.round(Y)}: ${Math.round(f(Y))}%</text>`;
      s+=`<text x="${C.x1}" y="${C.y0+4}" class="t-xs t-end">${N?'curve from the average rate':'drawn from the published average fall of 1.71% a year, not yearly data'}</text>`;
      s+=`<text x="${C.x1}" y="${C.y0+18}" class="t-xs t-end" style="fill:var(--warn)">no effective drug in this period</text>`}
    else if(lens==='contacts'){const Y=lerp(1900,1990,t),P=[[1900,22],[1950,10],[1990,1]];const [X,V]=axes(1900,1990,0,25,[0,5,10,15,20,25],[1900,1920,1940,1960,1980],v=>v);
      s+=`<text x="${C.x0}" y="${C.y0-16}" class="t-sm" style="fill:var(--accent)">${N?'EFFECTIVE CONTACTS PER CASE (MODEL)':'PEOPLE EACH INFECTIOUS PERSON EFFECTIVELY CONTACTED A YEAR · ENGLAND AND WALES MODEL'}</text>`;
      s+=`<rect x="${f1(X(1952))}" y="${C.y0}" width="${f1(C.x1-X(1952))}" height="${C.y1-C.y0}" style="fill:var(--rx-soft);opacity:.6"/><text x="${f1(X(1952)+6)}" y="${C.y0+14}" class="t-xs" style="fill:var(--rx)">combination chemotherapy from 1952</text>`;
      s+=`<line x1="${f1(X(1944))}" x2="${f1(X(1944))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--rx);stroke-dasharray:3 3"/><text x="${f1(X(1944)-4)}" y="${C.y0+30}" class="t-xs t-end" style="fill:var(--rx)">streptomycin 1944</text>`;
      let d='';const at=y=>y<=1950?lerp(22,10,(y-1900)/50):lerp(10,1,(y-1950)/40);for(let i=0;i<=60;i++){const y=lerp(1900,Y,i/60);d+=(i?'L':'M')+f1(X(y))+' '+f1(V(at(y)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.8"/>`;
      P.forEach(([y,v])=>{if(Y>=y-.5)s+=`<circle cx="${f1(X(y))}" cy="${f1(V(v))}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(y)+(y===1990?-10:10))}" y="${f1(V(v)-10)}" class="t-lbl ${y===1990?'t-end':''}">${v}${y===1900?' in 1900':''}</text>`});
      s+=`<circle cx="${f1(X(Y))}" cy="${f1(V(at(Y)))}" r="4.5" style="fill:var(--accent)"/>`}
    else if(lens==='fatality'){const Y=lerp(1930,1980,t),k=ease(ramp(Y,1952,1962));const [X,V]=[null,v=>lerp(C.y1,C.y0+20,v/70)];
      [0,10,20,30,40,50,60,70].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
      s+=`<text x="${C.x0}" y="${C.y0-16}" class="t-sm" style="fill:var(--bad)">${N?'TB CASE FATALITY PER YEAR':'TB CASE FATALITY PER YEAR, BEFORE AND AFTER COMBINATION CHEMOTHERAPY'}</text>`;
      s+=`<text x="${C.x1}" y="${C.y0+4}" class="t-big t-end" style="fill:${k>0?'var(--rx)':'var(--bad)'}">${Math.round(Y)}${Y<1952?' · before chemotherapy':k<1?' · drugs arrive':' · after'}</text>`;
      const gw=(C.x1-C.x0)/3;CITY.forEach(([n],i)=>{const cx=C.x0+gw*i+gw/2,bw=Math.min(70,gw*.5);
        const hi=lerp(60,10,k),lo=lerp(45,0,k);
        s+=`<rect x="${f1(cx-bw/2)}" y="${f1(V(hi))}" width="${f1(bw)}" height="${f1(V(lo)-V(hi))}" rx="4" style="fill:${k>.5?'var(--rx)':'var(--bad)'};opacity:${k>.5?.55:.35}"/>`;
        s+=`<rect x="${f1(cx-bw/2)}" y="${f1(V(hi))}" width="${f1(bw)}" height="${f1(V(0)-V(hi))}" rx="4" style="fill:none;stroke:${k>.5?'var(--rx)':'var(--bad)'};stroke-width:1.4"/>`;
        s+=`<text x="${f1(cx)}" y="${f1(V(hi)-8)}" class="t-lbl t-mid">${k<.05?'45–60%':k>.95?'< 10%':'falling'}</text><text x="${f1(cx)}" y="${C.y1+16}" class="t-sm t-mid" style="fill:var(--ink)">${n}</text>`;
        if(i===0&&Y>=1980-.5)s+=`<text x="${f1(cx)}" y="${C.y1+30}" class="t-xs t-mid" style="fill:var(--bad)">notifications back to</text><text x="${f1(cx)}" y="${C.y1+41}" class="t-xs t-mid" style="fill:var(--bad)">pre-drug levels by 1980</text>`});
      s+=`<text x="${C.x0+4}" y="${C.y0+24}" class="t-xs">${N?'shaded: published range; timing drawn':'shaded: published range; the fall\u2019s timing (1952–62) is drawn'}</text>`}
    else{const mo=t*6;const g=[{n:'Streptomycin + bed rest',tot:55,die:4,c:'var(--rx)'},{n:'Bed rest alone',tot:52,die:15,c:'var(--bad)'}];
      s+=`<text x="${N?16:30}" y="26" class="t-sm">MRC 1948 · MONTH ${f1(mo)} OF 6 · DEATHS SHOWN AS OUTLINED FIGURES</text>`;
      g.forEach((G,gi)=>{const ox=N?16:30+gi*345,oy=N?52+gi*196:52,cols=N?14:11,ps=N?17:19,cw=N?26:28,rh=N?27:30;
        const nd=Math.round(G.die*Math.min(1,t*1.0001));
        s+=`<text x="${ox}" y="${oy}" class="t-lbl" style="fill:${G.c}">${G.n}</text><text x="${ox+(N?368:310)}" y="${oy}" class="t-lbl t-end">${nd} of ${G.tot} died</text>`;
        for(let i=0;i<G.tot;i++){const x=ox+12+(i%cols)*cw,y=oy+10+Math.floor(i/cols)*rh,dead=i>=G.tot-nd;
          if(dead)s+=`<rect x="${f1(x-ps*.38)}" y="${f1(y-1)}" width="${f1(ps*.76)}" height="${f1(ps+2)}" rx="3" style="fill:none;stroke:var(--bad);stroke-width:1.2"/>`;
          s+=person(x,y,ps,dead?'var(--line)':G.c,{op:dead?1:.85})}});
      if(t>.99){const yy=N?440:262;s+=`<text x="${N?16:30}" y="${yy}" class="t-sm" style="fill:var(--warn)">${N?'47 of 55 still culture-positive at 6 months':'But 47 of 55 on streptomycin were still culture-positive at 6 months; resistance emerged.'}</text>`}
      s+=`<text x="${N?16:30}" y="${N?456:310}" class="t-xs">${N?'only 6-month totals are published; timing drawn':'Only the 6-month totals are published (as reported by Crofton); when each death happened is drawn, not measured.'}</text>`}
    ms.innerHTML=s;
    $('#hiMCap').innerHTML={decline:'Curve computed from the average annual decline reported by Davies and colleagues; it is not a yearly series. [[Davies1999]]',contacts:'Model values for England and Wales; lines between the three published points are drawn. [[Vynnycky1999]]',fatality:'Ranges as published for the three cities. [[Hermans2015]]',trial:'Numbers from a first-hand account of the trial. [[Crofton2006]]'}[lens];
    $('#hiMNote').innerHTML=noteHTML(M);
  }
  const stopM=playWire(mr,$('#hiMPlay'),drawM,9000,'%t:player.replay%','history');
  $$('[data-hm]').forEach(b=>b.addEventListener('click',()=>{stopM();lens=b.dataset.hm;$$('[data-hm]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawM(+mr.value)}));
  drawM(+mr.value);
};
