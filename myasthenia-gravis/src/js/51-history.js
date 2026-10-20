/* =============== 5.1 history & people =============== */
const HI_LANES=[['Clinic & names','var(--ab)'],['Mechanism & tests','var(--nerve)'],['Thymus & surgery','var(--musk)'],['Treatment & approvals','var(--drug)'],['Cell therapy (early)','var(--ach)']];
/* y = decimal year; yl = the year label when it is not simply floor(y) */
const HI_EV=[
 {y:1672,l:0,c:'well by morning, weak by noon',h:'Willis: weak by noon',t:'1672 · Thomas Willis',
  txt:`Thomas Willis gave the first recognisable account, in Latin, of patients who were well in the morning and fatigued by noon, including a woman whose speech failed after long talking. It went largely unnoticed until 1903. [[Hughes2005,Deymeer2021]]`,
  pt:'More than 350 years ago a doctor noticed people who were strong in the morning and weak by midday.',
  hook:`Willis 1672: the first recorded account of diurnal fatigability. [[Deymeer2021]]`},
 {y:1877,l:0,c:'first modern description',h:'Wilks: the first modern description',t:'1877 · Samuel Wilks',
  txt:`Samuel Wilks gave what is usually called the first modern description. Deymeer notes an earlier detailed case by Hérard in 1868. [[Hughes2005,Deymeer2021]]`},
 {y:1879,l:0,c:'three oculobulbar cases',h:'Erb: three patients',t:'1879 · Wilhelm Erb',
  txt:`Wilhelm Erb described three patients with oculobulbar weakness, remissions and exacerbations. [[Erb1879,Deymeer2021]]`},
 {y:1893,l:0,c:'review: the Erb-Goldflam syndrome',h:'Goldflam: the full picture',t:'1893 · Samuel Goldflam',
  txt:`Samuel Goldflam reviewed the literature, added three cases and set out the diagnostic and prognostic features. For a time the disease was called the Erb-Goldflam syndrome. [[Goldflam1893,Deymeer2021,Hughes2005]]`},
 {y:1895,l:0,c:'named; electrical decline shown',h:'Jolly names it',t:'1895 · Friedrich Jolly',
  txt:`Friedrich Jolly proposed the name "myasthenia gravis pseudoparalytica", later shortened to "myasthenia gravis". He showed that repeated faradic (electrical) stimulation made the muscle response decline step by step, the forerunner of repetitive nerve stimulation. He suggested physostigmine but did not pursue it because of its toxicity. A dating of the name to a December 1894 lecture appears only in web sources (unverified). [[Deymeer2021]]`,
  hook:`Jolly 1895: the name, and the first electrical decrement. [[Deymeer2021]]`},
 {y:1900,l:0,c:'Brain review: rest is best',h:'Campbell & Bramwell: rest',t:'1900 · Campbell and Bramwell',
  txt:`Campbell and Bramwell published a 60-page review, "Myasthenia gravis", in <i>Brain</i>. They held that rest was the best remedy. [[Campbell1900,Deymeer2021]]`},
 {y:1911,l:2,c:'thymus removed (for thyrotoxicosis)',h:'Sauerbruch: an early thymectomy',t:'1911 · Ernst Ferdinand Sauerbruch',
  txt:`Sauerbruch removed the thymus through the neck in a 19-year-old woman with MG; he was operating for thyrotoxicosis. German reviews credit this as preceding Blalock. Sources disagree on whether the resection was partial or total, and the 1912–13 case report was not checked (unverified). [[Singh2018,Overhaus2007]]`},
 {y:1934,l:3,c:'physostigmine works',h:'Mary Walker: physostigmine',t:'1934 · Mary Walker',
  txt:`Mary Walker reported in the <i>Lancet</i> that physostigmine produced a dramatic improvement in MG, the drug Jolly had suggested and set aside. In 1935 she reported prostigmine (neostigmine). [[Walker1934,Deymeer2021,Keesey2004]] <a href="#pyrido" data-go="pyrido">Pyridostigmine, animated</a>`,
  pt:'The first drug that worked blocked the enzyme that breaks down acetylcholine, the same family pyridostigmine belongs to.',
  hook:`Mary Walker, 1934: physostigmine reversed MG weakness. [[Walker1934]]`},
 {y:1936,l:2,c:'thymic tumour removed',h:'Blalock operates',t:'1936 · Alfred Blalock operates',
  txt:`Alfred Blalock removed a thymic tumour by partial sternotomy from a patient with MG in 1936. [[Singh2018,Deymeer2021]]`},
 {y:1939,l:2,c:'the 1936 case published',h:'Blalock publishes the 1936 case',t:'1939 · The same operation, in print',
  txt:`Blalock and colleagues published the operation in <i>Annals of Surgery</i> in 1939. Timelines that say 1936 count the operation; those that say 1939 count the paper. [[Blalock1939,Deymeer2021]]`,
  hook:'Blalock: operated <b>1936</b>, published <b>1939</b>, series without thymoma <b>1941</b>.'},
 {y:1941,l:2,c:'planned thymectomy, no thymoma',h:'Blalock: thymectomy without thymoma',t:'1941 · A planned series',
  txt:`Blalock and colleagues reported planned thymectomy in MG without thymoma. MGTX describes that first report as 6 operated patients, 3 with a favourable response, and Blalock operated on about 20 such patients in 1941–1944. [[Blalock1941,Singh2018,Wolfe2016,Deymeer2021]]`},
 {y:1960,l:1,c:'MG may be autoimmune',h:'Simpson: an autoimmune disease',t:'1960 · John Simpson',
  txt:`John Simpson in Edinburgh proposed that MG is autoimmune, caused by antibodies against the endplate receptor, and suggested a role for the thymus. Nastuk and colleagues reported changes in serum complement in the same period. [[Simpson1960,Deymeer2021]]`,
  pt:'Simpson guessed that the body was attacking its own nerve-muscle junction. Proving it took another 13 years.',
  hook:`Simpson, 1960: the autoimmune hypothesis. [[Simpson1960]]`},
 {y:1966,yl:'1960s–70s',l:3,c:'ventilation and intensive care',h:'Ventilators and intensive care',t:'1960s–70s · Ventilation and the ICU',
  txt:`Mortality fell from about 40% in the early 1960s to about 5% in the 1970s, largely because of positive-pressure ventilation and intensive care units. In one series the death rate per crisis fell from 42% to 6%, and overall MG mortality from 12% to 3.3%, over the same 20 years. [[Deymeer2021,Cohen1981]] <a href="#crisis" data-go="crisis">Myasthenic crisis</a>`,
  pt:'Machines that breathe for a person during a crisis turned MG from an often fatal illness into a survivable one.'},
 {y:1973,l:1,c:'EAMG: rabbits immunised with AChR',h:'Patrick & Lindstrom: EAMG',t:'1973 · Experimental autoimmune MG',
  txt:`Patrick and Lindstrom immunised rabbits with acetylcholine receptor purified from electric eel. After the second injection the rabbits developed flaccid paralysis with the EMG signs of neuromuscular block, dramatically relieved by edrophonium or neostigmine. [[Patrick1973]]`,
  hook:`EAMG, 1973: immunising with the receptor causes MG, so the receptor is the antigen. [[Patrick1973]]`},
 {y:1973.5,yl:'1973',l:1,c:'fewer receptors at MG junctions',h:'Fambrough, Drachman & Satyamurti',t:'1973 · Counting receptors',
  txt:`Fambrough, Drachman and Satyamurti counted receptors with labelled α-bungarotoxin and found fewer acetylcholine receptors at MG junctions than in controls. [[Fambrough1973]]`},
 {y:1974,l:3,c:'slow-start prednisone',h:'Seybold & Drachman: steroids',t:'1974 · A gentler steroid start',
  txt:`Seybold and Drachman described a gradually increasing prednisone schedule to avoid the early worsening seen when oral treatment starts at 60–100 mg, as the Cochrane review describes it. Doses today are set by the treating clinician. [[Seybold1974,SchneiderGold2005]]`},
 {y:1975,l:1,c:'passive transfer: patient IgG to mice',h:'Toyka: the antibody is enough',t:'1975 · Passive transfer',
  txt:`Toyka and colleagues injected an immunoglobulin fraction from MG patients\' serum into mice daily for up to 14 days. The mice lost endplate receptors and their miniature endplate potentials shrank; some showed a decremental response to repetitive stimulation, reversed by neostigmine. [[Toyka1975]]`,
  hook:`Passive transfer (Toyka 1975): patient IgG carries the disease to mice. [[Toyka1975]]`},
 {y:1976,l:1,c:'AChR antibody test: 87%',h:'Lindstrom: the antibody test',t:'1976 · The diagnostic assay',
  txt:`Lindstrom and colleagues detected anti-AChR antibodies in 87% of 71 MG patients and in none of 175 controls, which established the diagnostic assay. [[Lindstrom1976]] <a href="#dx" data-go="dx">Diagnosis today</a>`},
 {y:1984,l:3,c:'azathioprine: 15 of 18 improved',h:'Witte: azathioprine',t:'1984 · Azathioprine',
  txt:`In Witte\'s series, 18 of 24 patients tolerated azathioprine and 15 of those 18 (83%) improved, with a first response after 4–10 months. [[Witte1984]]`},
 {y:1997,l:3,c:'plasma exchange vs IVIG trial',h:'Gajdos: plasma exchange vs IVIG',t:'1997 · Plasma exchange or IVIG',
  txt:`A randomised trial in 87 patients in exacerbation found plasma exchange and IVIG similarly effective by day 15, with side effects in 8 patients on plasma exchange and 1 on IVIG. [[Gajdos1997]]`},
 {y:2001,l:1,c:'MuSK antibodies',h:'Hoch: MuSK antibodies',t:'2001 · MuSK',
  txt:`Hoch and colleagues found antibodies to the muscle-specific kinase MuSK in 70% of people with generalized MG who had no AChR antibodies. [[Hoch2001]]`,
  hook:`MuSK, 2001: the second antibody target. [[Hoch2001]]`},
 {y:2011,l:1,c:'LRP4 antibodies',h:'Higuchi and Pevzner: LRP4',t:'2011 · LRP4',
  txt:`Higuchi and colleagues reported LRP4 antibodies, mainly IgG1, in AChR-negative MG. Pevzner and colleagues found them in about half of 13 double-seronegative sera, published in 2012. [[Higuchi2011,Pevzner2012]]`},
 {y:2016,l:2,c:'MGTX: randomised benefit',h:'MGTX: the first randomised trial',t:'2016 · MGTX',
  txt:`MGTX randomised 126 people with non-thymomatous generalized AChR MG to extended transsternal thymectomy plus prednisone or prednisone alone. Over 3 years the time-weighted QMG was 6.15 vs 8.99 and the alternate-day prednisone dose 44 vs 60 mg. It was the first randomised trial to show benefit, about 75 years after Blalock. [[Wolfe2016]] It enrolled people aged 18-65 with disease for under 5 years. The 2020 consensus update frames its thymectomy advice for ages 18-50, because a post hoc analysis of people aged 50 and over was negative, so the upper age limit is still debated. [[Wolfe2016,Narayanaswami2021]] <a href="#thymectomy" data-go="thymectomy">Thymectomy over the years</a>`,
  hook:`MGTX 2016: thymectomy lowered QMG and prednisone dose over 3 years. [[Wolfe2016]]`},
 {y:2017.8,yl:'2017',l:3,c:'eculizumab: first C5 inhibitor',h:'Eculizumab approved',t:'23 October 2017 · Eculizumab',
  txt:`The FDA approved eculizumab (Soliris) for adults with AChR-antibody-positive generalized MG, the first complement inhibitor for MG. [[FDASoliris2017]] <a href="#biologics" data-go="biologics">Complement and FcRn inhibitors</a>`},
 {y:2021.96,yl:'2021',l:3,c:'efgartigimod: first FcRn blocker',h:'Efgartigimod approved',t:'17 December 2021 · Efgartigimod',
  txt:`The FDA approved efgartigimod (Vyvgart), the first FcRn blocker, for AChR-antibody-positive generalized MG in adults. [[FDAVyvgart2021]]`},
 {y:2022.32,yl:'2022',l:3,c:'ravulizumab: long-acting C5',h:'Ravulizumab approved',t:'28 April 2022 · Ravulizumab',
  txt:`Ravulizumab (Ultomiris), the first long-acting C5 inhibitor, was approved for AChR-positive generalized MG in adults (trade-press report). [[NeurologyLive2022]]`},
 {y:2023.37,yl:'2023',l:4,c:'first CAR-T case',h:'The first CAR-T case',t:'2023 · CAR-T reaches MG',
  txt:`<span class="ev early">Early evidence</span> One person with severe, treatment-refractory AChR-positive generalized MG received KYV-101, a fully human anti-CD19 CAR-T product, on a named-patient basis, reported in 2023. Non-journal sources describe B cells eliminated and strength improved over 60 days; they give the age as 33 or 34. [[Haghikia2023,KyvernaPR2023,UMMagdeburg2023]] <a href="#cure" data-go="cure">Toward a cure</a>`},
 {y:2023.6,yl:'2023',l:3,c:'rozanolixizumab and zilucoplan',h:'Rozanolixizumab and zilucoplan',t:'June and October 2023 · Two more',
  txt:`Rozanolixizumab (Rystiggo) was approved on 26 June 2023 for adults with AChR- or MuSK-antibody-positive generalized MG, and zilucoplan (Zilbrysq) on 17 October 2023 for AChR-positive generalized MG. [[FDANovel2023]]`},
 {y:2025.33,yl:'2025',l:3,c:'nipocalimab',h:'Nipocalimab approved',t:'29 April 2025 · Nipocalimab',
  txt:`The FDA approved nipocalimab (Imaavy) for generalized MG in people aged 12 and older with AChR or MuSK antibodies, the first FcRn blocker labelled for adolescents. [[FDANovel2025,FDADrugsFDA2026,FDAImaavy2026]]`},
 {y:2025.95,yl:'2025',l:3,c:'inebilizumab: B-cell antibody',h:'Inebilizumab approved',t:'December 2025 · Inebilizumab',
  txt:`The FDA approved inebilizumab (Uplizna), an anti-CD19 B-cell-depleting antibody given as 2 loading doses and then every 6 months, for adults with AChR- or MuSK-antibody-positive generalized MG. The approval was announced by the sponsor on 11 December 2025. [[AmgenUplizna2025]]`},
 {y:2026.35,yl:'2026',l:3,c:'efgartigimod: seronegative too',h:'A label without an antibody limit',t:'8 May 2026 · Seronegative MG',
  txt:`The FDA expanded efgartigimod (Vyvgart and Vyvgart Hytrulo) to adults with AChR-antibody-seronegative generalized MG, based on ADAPT SERON (n = 119), the first MG label without an antibody restriction. [[NeurologyLive2026,FDAVyvgart2026]]`},
 {y:2026.6,yl:'2026',l:4,c:'remissions; a randomised CAR-T trial',h:'CAR-T: small series, one RCT',t:'2026 · Cell therapy grows up a little',
  txt:`<span class="ev early">Early evidence</span> Three German patients given anti-CD19 CAR-T stayed in remission for at least 19 months and stopped MG immunotherapy. In a randomised, double-blind phase 2b trial of an mRNA anti-BCMA CAR-T (Descartes-08, n = 26), 66.7% vs 27.3% on placebo met the primary endpoint. No phase 3 has reported yet. [[Hegelmaier2026,Vu2026]]`}
];
const HI_ERA=[{f:1672,a:1672,t:'First descriptions'},{f:1893,a:1895,t:'A name'},{f:1911,a:1934,t:'Surgery & the first drug'},{f:1960,a:1960,t:'An autoimmune disease'},{f:2001,a:2001,t:'More antibodies'},{f:2016,a:2016,t:'Trials & biologics'}];
/* published death rates (filled marks): k = 'c' per crisis, 'o' overall MG mortality, 'd' died within 2 years of diagnosis */
/* label placement: p = 'r' right, 'l' left, 'u' above, 'lu' left and above, 'd' below right; nl = narrow label */
const HI_MORT=[
 {y:1934,v:70,k:'d',l:'70% within 2 y of diagnosis',nl:'70% (1934)',p:'r'},
 {y:1961,v:12,k:'o',l:'12% overall',p:'l'},{y:1962,v:42,k:'c',l:'42% per crisis',p:'r'},
 {y:1978,v:6,k:'c',l:'6%',p:'lu'},{y:1979,v:3.3,k:'o',l:'3.3%',p:'d'},
 {y:1988.5,v:4,k:'c',l:'4%',p:'u'},{y:2002.5,v:4.47,k:'c',l:'4.5%',p:'u'},{y:2010.5,v:12,k:'c',l:'12% ventilated, median age 72',nl:'12% (age 72)',p:'r'}
];
const HI_TOOL=[[1900,'rest',`Campbell and Bramwell held that rest was the best remedy. [[Campbell1900]]`],[1934,'anticholinesterases',`Physostigmine, then neostigmine in 1935. [[Walker1934,Keesey2004]]`],
 [1936,'thymectomy',`Blalock, operated 1936; first randomised evidence (MGTX) in 2016. [[Singh2018,Wolfe2016]]`],[1966,'ventilation & ICU',`1960s–70s. [[Deymeer2021]]`],
 [1974,'corticosteroids',`Slow-start prednisone schedule. [[Seybold1974]]`],[1984,'azathioprine',`Witte series. [[Witte1984]]`],
 [1997,'PLEX & IVIG',`Gajdos trial. [[Gajdos1997]]`],[2017.8,'C5 inhibitors',`Eculizumab, then ravulizumab and zilucoplan. [[FDASoliris2017,NeurologyLive2022,FDANovel2023]]`],
 [2021.96,'FcRn blockers',`Efgartigimod, then rozanolixizumab and nipocalimab. [[FDAVyvgart2021,FDANovel2023,FDANovel2025]]`],[2023.37,'CAR-T (experimental)',`First case reported 2023. [[Haghikia2023]]`]];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* a stretched axis: fraction of the axis at each anchor year */
  const AX=[[1672,0],[1870,.05],[1890,.09],[1930,.2],[1945,.3],[1960,.35],[1980,.5],[2000,.58],[2010,.64],[2026.8,1]];
  const fx=y=>{if(y<=AX[0][0])return 0;for(let i=1;i<AX.length;i++)if(y<=AX[i][0])return lerp(AX[i-1][1],AX[i][1],(y-AX[i-1][0])/(AX[i][0]-AX[i-1][0]));return 1};
  const fy=u=>{for(let i=1;i<AX.length;i++)if(u<=AX[i][1])return lerp(AX[i-1][0],AX[i][0],(u-AX[i-1][1])/(AX[i][1]-AX[i-1][1]));return AX[AX.length-1][0]};
  let XA=150,XB=704;const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map((E,i)=>({from:i?fx(E.f):0,at:Math.min(1,fx(E.a)+.003),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  const yrL=e=>e.yl||String(Math.floor(e.y));
  const T=(x,y,c,v,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const op=(yr,y0)=>f1(ease(clamp((yr-y0)/.3+1e-9)));   // fade in over a few months
  /* ---------- scenes: one drawing per era; every caption repeats a cited milestone ---------- */
  function sDescr(A,yr){let s='';const u=ramp(yr,1672,1893);
    const ex=A.x+A.w*.3,ey=A.y+92,w=Math.min(110,A.w*.27);
    /* morning and noon, side by side, with a sun moving between them */
    const sx=lerp(ex-w*.75,ex+w*1.6,(Math.sin(u*Math.PI*6-Math.PI/2)+1)/2),sy=A.y+30-Math.sin(((Math.sin(u*Math.PI*6-Math.PI/2)+1)/2)*Math.PI)*14;
    s+=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="9" style="fill:var(--ach)"/>`;
    s+=eyelid(ex-w*.15,ey,w,.12)+eyelid(ex+w*1.05,ey,w,.62);
    s+=T(ex-w*.15,ey+50,'t-xs t-mid','morning')+T(ex+w*1.05,ey+50,'t-xs t-mid','by noon');
    s+=T(A.x+8,A.y+A.h-44,'t-sm','"well in the morning, fatigued by noon"','fill:var(--ink)');
    s+=T(A.x+8,A.y+A.h-28,'t-xs','Willis, 1672, in Latin; unnoticed until 1903');
    const cards=[[1877,'Wilks'],[1879,'Erb: 3 cases']];
    cards.forEach(([y,l],k)=>{if(yr>=y){const cx=A.x+A.w-(k?92:180),cy=A.y+16;s+=`<g style="opacity:${op(yr,y)}">`+RC(cx,cy,80,44,'fill:var(--panel);stroke:var(--ab)',5)+T(cx+40,cy+18,'t-lbl t-mid',y,'fill:var(--ab);font-size:12px')+T(cx+40,cy+34,'t-xs t-mid',l)+'</g>'}});
    return s}
  function sName(A,yr){let s='';
    s+=T(A.x+8,A.y+24,'t-big','myasthenia gravis','font-size:20px;fill:'+(yr>=1895?'var(--ink)':'var(--muted)'));
    if(yr>=1895)s+=`<g style="opacity:${op(yr,1895)}">`+T(A.x+8+174,A.y+24,'t-big','pseudoparalytica','font-size:20px;fill:var(--muted);text-decoration:line-through')+'</g>';
    s+=T(A.x+8,A.y+42,'t-xs',yr<1895?'1893: called the Erb-Goldflam syndrome':'Jolly 1895: the name, later shortened');
    /* Jolly's faradic stimulation: each response a little smaller */
    if(yr>=1895){const X0=A.x+20,base=A.y+150,n=8;s+=T(X0,A.y+70,'t-xs','repeated electrical stimulation · response falls (forerunner of RNS)');
      const k=ramp(yr,1895,1900);for(let i=0;i<n;i++){if(i/n>k*1.05)break;const h=60*Math.pow(.88,i);s+=RC(X0+i*22,base-h,12,h,'fill:var(--nerve);opacity:.8',2)}
      s+=LN(X0-4,base,X0+n*22,base,'stroke:var(--muted)')}
    if(yr>=1900){const bx=A.x+A.w-150,by=A.y+96;s+=`<g style="opacity:${op(yr,1900)}">`+RC(bx,by+20,130,18,'fill:var(--panel-2);stroke:var(--line)',4)+RC(bx+4,by+8,30,14,'fill:var(--panel);stroke:var(--line)',4)+
      `<path d="M${bx+36} ${by+20}q40 -16 90 0z" style="fill:var(--nerve-soft);stroke:var(--line)"/>`+T(bx+65,by+58,'t-xs t-mid','1900: rest, the best remedy')+'</g>'}
    return s}
  function sSurg(A,yr){let s='';
    /* the thymus with its two lobes */
    const tx=A.x+A.w*.26,ty=A.y+70;
    s+=`<path d="M${f1(tx-6)} ${f1(ty-46)}C${f1(tx-46)} ${f1(ty-30)} ${f1(tx-44)} ${f1(ty+40)} ${f1(tx-10)} ${f1(ty+46)}C${f1(tx-2)} ${f1(ty+30)} ${f1(tx-2)} ${f1(ty-20)} ${f1(tx-6)} ${f1(ty-46)}Z" style="fill:var(--musk-soft);stroke:var(--musk);stroke-width:1.6"/>`;
    s+=`<path d="M${f1(tx+6)} ${f1(ty-46)}C${f1(tx+46)} ${f1(ty-30)} ${f1(tx+44)} ${f1(ty+40)} ${f1(tx+10)} ${f1(ty+46)}C${f1(tx+2)} ${f1(ty+30)} ${f1(tx+2)} ${f1(ty-20)} ${f1(tx+6)} ${f1(ty-46)}Z" style="fill:var(--musk-soft);stroke:var(--musk);stroke-width:1.6"/>`;
    s+=T(tx,ty+64,'t-xs t-mid','thymus','fill:var(--musk)');
    const marks=[[1911,'1911 Sauerbruch'],[1936,'1936 Blalock operates'],[1939,'1939 … and publishes'],[1941,'1941 series, no thymoma']];
    marks.forEach(([y,l],k)=>{if(yr>=y)s+=`<g style="opacity:${op(yr,y)}">`+T(A.x+8,A.y+A.h-62+k*14,'t-xs',l,`fill:${k===2?'var(--ink)':'var(--musk)'}`)+'</g>'});
    if(yr>=1939)s+=`<path d="M${A.x+150} ${A.y+A.h-52}h6v14h-6" style="fill:none;stroke:var(--muted)"/>`+T(A.x+160,A.y+A.h-41,'t-xs','same operation','fill:var(--muted)');
    /* the first drug: a lid that opens after physostigmine */
    const ex=A.x+A.w*.72,ey=A.y+80,dr=yr<1934?.62:lerp(.62,.14,ease(ramp(yr,1934,1937)));
    s+=eyelid(ex,ey,Math.min(104,A.w*.25),dr);
    s+=T(ex,ey+48,'t-xs t-mid',yr<1934?'no drug that helps':'after physostigmine',yr<1934?'':'fill:var(--drug);font-weight:700');
    if(yr>=1934)s+=`<g style="opacity:${op(yr,1934)}">`+RC(ex-56,ey+60,112,20,'fill:var(--drug-soft);stroke:var(--drug)',10)+T(ex,ey+74,'t-xs t-mid','1934 Mary Walker','fill:var(--drug)')+'</g>';
    return s}
  function sAuto(A,yr){let s='';
    /* a strip of postsynaptic membrane: receptors, antibodies arriving after 1973 */
    const y0=A.y+86,X0=A.x+20,X1=A.x+A.w-20,n=11;
    s+=RC(X0-8,y0,X1-X0+16,30,'fill:var(--muscle);stroke:var(--memb)',6)+T(X0-6,y0+46,'t-xs','postsynaptic membrane');
    const ab=ramp(yr,1972,1976),loss=ramp(yr,1973.5,1976);
    for(let i=0;i<n;i++){const x=lerp(X0+8,X1-8,i/(n-1)),gone=(i%3===1)&&loss>0;s+=achr(x,y0,12,0,gone?1-loss*.85:1);
      if(i%2===0&&ab>0){const dy=lerp(-50,-18,ease(clamp(ab*1.4-i*.05)));s+=igg(x,y0+dy,9,Math.PI,clamp(ab*2))}}
    s+=T(A.x+8,A.y+20,'t-sm',yr<1973?'1960 Simpson: antibodies against the endplate receptor?':'antibodies bind the receptor; receptors are lost','fill:var(--ink)');
    const notes=[[1973,'1973 rabbits immunised with AChR become weak'],[1973.5,'1973 fewer receptors counted'],[1975,'1975 patient IgG transfers it to mice'],[1976,'1976 antibody test: 87% vs 0% of controls']];
    notes.forEach(([y,l],k)=>{if(yr>=y)s+=`<g style="opacity:${op(yr,y)}">`+T(A.x+8,A.y+A.h-58+k*14,'t-xs',l,'fill:var(--nerve)')+'</g>'});
    if(yr>=1966&&yr<1973)s+=T(A.x+8,A.y+A.h-44,'t-xs','1960s–70s: ventilators and ICUs cut crisis deaths','fill:var(--drug)');
    return s}
  function sAbs(A,yr){let s='';const y0=A.y+110,cols=[A.x+A.w*.18,A.x+A.w*.5,A.x+A.w*.82];
    s+=RC(A.x+12,y0,A.w-24,26,'fill:var(--muscle);stroke:var(--memb)',6);
    /* AChR (known), MuSK (2001), LRP4 (2011) */
    s+=achr(cols[0]-8,y0,12)+achr(cols[0]+8,y0,12)+igg(cols[0],y0-36,9,Math.PI);
    s+=T(cols[0],y0+46,'t-xs t-mid','AChR','fill:var(--achr);font-weight:700');
    const m=yr>=2001,l=yr>=2011;
    s+=`<g style="opacity:${m?op(yr,2001):.18}">`+RC(cols[1]-9,y0-26,18,26,'fill:var(--musk-soft);stroke:var(--musk);stroke-width:1.6',4)+igg(cols[1],y0-48,9,Math.PI,1,'var(--ab)')+T(cols[1],y0+46,'t-xs t-mid','MuSK · 2001','fill:var(--musk);font-weight:700')+T(cols[1],y0+60,'t-xs t-mid','70% of AChR-negative')+'</g>';
    s+=`<g style="opacity:${l?op(yr,2011):.18}"><ellipse cx="${f1(cols[2])}" cy="${y0-12}" rx="14" ry="12" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.6"/>`+igg(cols[2],y0-44,9,Math.PI)+T(cols[2],y0+46,'t-xs t-mid','LRP4 · 2011','fill:var(--nerve);font-weight:700')+'</g>';
    s+=T(A.x+8,A.y+20,'t-sm','antibody targets at the junction','fill:var(--ink)');
    s+=T(A.x+8,A.y+36,'t-xs',l?'three known targets':m?'a second target':'AChR, known since the 1970s');
    return s}
  function sBio(A,yr,N){let s='';
    /* MGTX: 3-year time-weighted QMG */
    const gx=A.x+12,gy=A.y+30,gw=N?150:170;
    s+=T(gx,A.y+18,'t-xs','MGTX · QMG, 3 years');
    [['prednisone alone',8.99,'var(--muted)'],['thymectomy + prednisone',6.15,'var(--musk)']].forEach(([lb,v,c],k)=>{const y=gy+k*30;s+=RC(gx,y,gw*v/10,12,`fill:${c}`,3)+T(gx+gw*v/10+5,y+10,'t-xs',v.toFixed(2),'fill:var(--ink);font-weight:700')+T(gx,y+24,'t-xs',lb)});
    /* approvals as a growing column of pills */
    const px=N?A.x+A.w-176:A.x+A.w-196,list=[[2017.8,'2017 eculizumab · C5'],[2021.96,'2021 efgartigimod · FcRn'],[2022.32,'2022 ravulizumab · C5'],[2023.6,'2023 rozanolixizumab · FcRn'],[2023.6,'2023 zilucoplan · C5'],[2025.33,'2025 nipocalimab · FcRn'],[2025.95,'2025 inebilizumab · CD19'],[2026.35,'2026 efgartigimod: seroneg.']];
    s+=T(px,A.y+18,'t-xs','US approvals for generalized MG');
    list.forEach(([y,l],k)=>{if(yr>=y)s+=`<g style="opacity:${op(yr,y)}">`+RC(px,A.y+26+k*20,N?170:188,17,`fill:var(--drug-soft);stroke:${l.includes('C5')?'var(--comp)':'var(--drug)'}`,8)+T(px+8,A.y+38+k*20,'t-xs',l,'fill:var(--ink)')+'</g>'});
    /* a CAR-T cell, from 2023 */
    if(yr>=2023.37){const cx=gx+(N?24:40),cy=N?A.y+122:A.y+A.h-46,o=op(yr,2023.37);s+=`<g style="opacity:${o}"><circle cx="${cx}" cy="${cy}" r="18" style="fill:var(--ach-soft);stroke:var(--ach);stroke-width:1.6"/>`;
      for(let i=0;i<8;i++){const a=i/8*6.283;s+=LN(cx+Math.cos(a)*18,cy+Math.sin(a)*18,cx+Math.cos(a)*26,cy+Math.sin(a)*26,'stroke:var(--ach);stroke-width:2;stroke-linecap:round')}
      s+=T(cx+34,cy-2,'t-xs',N?'CAR-T, 2023':'CAR-T: first case 2023','fill:var(--ach);font-weight:700')+T(cx+34,cy+12,'t-xs',yr>=2026.6?(N?'2026: series, RCT':'small series, one RCT'):'early evidence')+'</g>'}
    return s}
  const SCENE=[sDescr,sName,sSurg,sAuto,sAbs,sBio];

  function draw(t){
    const N=vb(svg,'720 668','400 990');
    const L=N
      ?{XA:36,XB:384,yrY:26,hX:8,hY:46,fr:[6,54,388,398],A:{x:14,y:60,w:372,h:214},C:{x:14,y:284,w:372,h:164},cl:15,cmax:9,
        LY:i=>494+i*44,bandH:24,labUp:1,r:4.5,dyL:7,axY:722,tkY:738,ticks:[1672,1900,1945,1980,2010],
        mT:766,mY:776,mH:76,tT:888,tY:896,phTop:470,phBot:858}
      :{XA:150,XB:704,yrY:26,hX:86,hY:24,fr:[6,36,708,226],A:{x:16,y:42,w:428,h:214},C:{x:458,y:42,w:250,h:214},cl:17,cmax:10,
        LY:i=>290+i*36,bandH:30,labUp:0,r:5,dyL:8,axY:466,tkY:482,ticks:[1672,1870,1900,1930,1945,1960,1980,2000,2020],
        mT:510,mY:500,mH:82,tT:608,tY:616,phTop:272,phBot:586};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t),ph=phaseOf(steps,t);
    const done=HI_EV.filter(e=>e.y<=yr+.001),cur=done.length?done[done.length-1]:null;
    let s='';
    /* headline */
    if(cur)s+=T(L.hX===86?10:8,L.yrY,'t-big',yrL(cur),`font-size:22px;fill:${HI_LANES[cur.l][1]}`)+T(L.hX,L.hY,'t-lbl',cur.h);
    else s+=T(8,L.yrY,'t-lbl','Press play: the story starts in 1672','fill:var(--muted)');
    /* the scene and the era caption list */
    s+=RC(L.fr[0],L.fr[1],L.fr[2],L.fr[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N);
    s+=N?LN(L.C.x,L.C.y-6,L.C.x+L.C.w,L.C.y-6,'stroke:var(--line)'):LN(L.C.x-8,L.A.y,L.C.x-8,L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm',HI_ERA[ph].t.toUpperCase(),'fill:var(--ink)');
    let inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.001);if(inEra.length>L.cmax)inEra=inEra.slice(-L.cmax);
    inEra.forEach((e,k)=>{const y=L.C.y+32+k*L.cl;
      s+=`<circle cx="${L.C.x+4}" cy="${y-3.5}" r="3.5" style="fill:${HI_LANES[e.l][1]}"/><text x="${L.C.x+13}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${yrL(e)}</tspan> ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+13,L.C.y+32,'t-xs','the playhead has not reached this era yet');
    /* lanes */
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-6,y-L.bandH/2,XB-XA+12,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-5:y+4,'t-sm',n,`fill:${c}`);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    /* axis */
    s+=LN(XA,L.axY,XB,L.axY,'stroke:var(--muted)');
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid',y)});
    s+=T(XB,L.tkY,'t-xs t-end',N?'2026':'2026 →');
    /* dots: clusters inside a lane stack on three levels */
    const gap=11*(XB-XA)/554,lv={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=lv[e.l];e.lev=p&&x-p.x<gap?(p.lev+1)%3:0;lv[e.l]={x,lev:e.lev}});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+[0,-L.dyL,L.dyL][e.lev],c=HI_LANES[e.l][1],pass=e.y<=yr+.001;
      if(!pass)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${L.r-.5}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.1;opacity:.6"/>`;
      else if(e===cur){const k=ramp(xp-x,0,24);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(L.r+2+10*k)}" style="fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${L.r+1.5}" style="fill:${c};stroke:var(--ink);stroke-width:1.6"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${L.r}" style="fill:${c}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    /* the 1936/1939 disagreement: a bracket joining the two dots */
    {const a=HI_EV.find(e=>e.y===1936),b=HI_EV.find(e=>e.y===1939),y=L.LY(2)+L.bandH/2+(N?-1:-2),xa=xOf(1936),xb=xOf(1939);
      if(yr>=1939)s+=`<path d="M${f1(xa)} ${f1(y-4)}v4H${f1(xb)}v-4" style="fill:none;stroke:var(--musk);stroke-width:1.2"/>`;}
    /* mortality band: published figures only */
    const mY0=L.mY,mY1=L.mY+L.mH,vy=v=>lerp(mY1,mY0,v/70);
    s+=T(N?XA-4:10,L.mT,'t-sm','Deaths',`fill:var(--bad)`)+T(N?XA+44:10,L.mT+(N?0:14),'t-xs','published %');
    s+=RC(XA-6,mY0-6,XB-XA+12,L.mH+12,'fill:var(--bad-soft);opacity:.35',8);
    [0,35,70].forEach(v=>{s+=LN(XA,vy(v),XB,vy(v),'stroke:var(--line);stroke-dasharray:2 4')+T(XA-8,vy(v)+3,'t-xs t-end',v+'%')});
    HI_MORT.forEach(m=>{const x=xOf(m.y),y=vy(m.v),on=m.y<=yr+.001,o=on?1:.15;
      const sh=m.k==='c'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--bad);opacity:${o}"/>`:m.k==='o'?`<rect x="${f1(x-4)}" y="${f1(y-4)}" width="8" height="8" style="fill:var(--ab);opacity:${o}"/>`:`<path d="M${f1(x)} ${f1(y-5)}l5 9h-10z" style="fill:var(--bad);opacity:${o}"/>`;
      s+=sh;if(on){const lt=N&&m.nl?m.nl:m.l,P={r:[7,4,''],l:[-7,4,' t-end'],u:[0,-8,' t-mid'],lu:[-5,-7,' t-end'],d:[6,13,'']}[m.p];s+=T(x+P[0],y+P[1],'t-xs'+P[2],lt,'fill:var(--ink)')}});
    s+=N?T(XA-4,mY1+20,'t-xs','● per crisis   ■ overall   ▲ 2 y after diagnosis'):T(XA,mY1+19,'t-xs','● per crisis   ■ overall MG mortality   ▲ died within 2 y of diagnosis (1934)');
    /* toolkit: chips appear as the playhead passes their year, wrapping into rows */
    const have=HI_TOOL.filter(k=>k[0]<=yr+.001);
    s+=T(N?XA-4:10,L.tT,'t-sm',`Toolkit · ${have.length}`,'fill:var(--drug)');
    let cx=N?XA-4:XA,cy=L.tY+(N?4:0);const maxX=N?386:XB;
    HI_TOOL.forEach(k=>{const w=k[1].length*5.8+16;if(cx+w>maxX){cx=N?XA-4:XA;cy+=22}const on=k[0]<=yr+.001;
      s+=RC(cx,cy,w,17,on?'fill:var(--drug-soft);stroke:var(--drug)':'fill:none;stroke:var(--line);stroke-dasharray:3 3',8)+T(cx+w/2,cy+12,'t-xs t-mid',k[1],on?'fill:var(--ink)':'fill:var(--muted);opacity:.5');cx+=w+6});
    /* playhead */
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.5')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-12,Math.max(XA+12,xp)),L.phTop-3,'t-xs t-mid',Math.floor(yr),'fill:var(--ink);font-weight:700');
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(yr)}</b></span><span>milestones passed <b>${done.length} of ${HI_EV.length}</b></span><span>era <b>${HI_ERA[ph].t}</b></span><span>toolkit <b>${have.length}</b></span>`;
    $('#hiNote').innerHTML=cur?noteHTML({k:HI_LANES[cur.l][0],t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}):noteHTML({k:'Before 1672',t:'No description yet',txt:'Press play, drag the timeline, or click any dot or year.',pt:'The story starts with an Oxford physician writing in Latin.'});
    $$('#hiYears [data-hy2]').forEach(b=>b.setAttribute('aria-current',cur&&+b.dataset.hy2===cur.y?'true':'false'));
  }
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(fx(y)+.0015);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag nerve" data-hy2="${e.y}"><b>${yrL(e)}</b>${esc(e.h)}</button>`).join('');
  const goSvg=()=>svg.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'});
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);goSvg()}});
  $('#hiNames').innerHTML=[['Erb-Goldflam syndrome',1893],['myasthenia gravis pseudoparalytica',1895],['myasthenia gravis',1895]].map(([n,y])=>`<button class="tag ab" data-hn="${y}">${n}<small>${y}</small></button>`).join('');
  $('#hiNames').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);goSvg()}});
  $('#hiTool').innerHTML=HI_TOOL.map(k=>`<li><b>${k[0]===1966?'1960s':Math.floor(k[0])}</b><span><span style="font-weight:700">${k[1]}</span> · ${k[2]}</span></li>`).join('');
  draw(+rg.value);
};
