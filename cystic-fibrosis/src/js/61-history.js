/* =============== 6.1 History & people =============== */
/* A timeline scrubber from the 1606 folk text to the 2025 Lasker award. The range is a position on a compressed
   time axis (1600-1930 squeezed into the first 6%); the card shows the last milestone the cursor has passed among
   the themes switched on. Theme toggles (aria-pressed) filter the dots, the jump chips and the table together.
   Every milestone is from research pass A; its citations sit in its note text (HTML), never in SVG text. */
inits.history=()=>{
  const TH={disc:['Discovery','var(--brand)'],dx:['Diagnosis & screening','var(--dx)'],rx:['Treatment & care','var(--rx)'],gene:['Gene & modulators','var(--bad)']};
  /* y: numeric year for placing; yl: label; e: short event for the SVG card; p: people; txt: note text with citations */
  const MS=[
   {y:1606,yl:'1606',th:'disc',e:'A Spanish text notes that a "bewitched" child\'s forehead tastes salty',p:'Alonso y de los Ruyzes de Fonteca',
    txt:'A 1606 Spanish text by Alonso y de los Ruyzes de Fonteca noted that the fingers taste salty after rubbing a "bewitched" child\'s forehead [[Trouve2024]]. Folk sayings of this kind were found in 12 European countries [[Busch1990]].'},
   {y:1936,yl:'1936',th:'disc',e:'Probably the first description of "CF with bronchiectasis"',p:'Fanconi',
    txt:'Fanconi (1936) is probably the first to describe "CF with bronchiectasis" [[Trouve2024]].'},
   {y:1938,yl:'1938',th:'disc',e:'"Cystic fibrosis of the pancreas" is named and set apart from coeliac disease',p:'Dorothy Andersen, Columbia University',
    txt:'Dorothy Andersen, a Columbia University pathologist, described "cystic fibrosis of the pancreas" and distinguished it from coeliac disease [[Andersen1938,Davis2006]]. Life expectancy was then about 6 months [[Davis2006]].'},
   {y:1942,yl:'1940s',th:'rx',e:'Sulfonamides and penicillin against lung infection: help, but only for a while',p:'Andersen and di Sant\'Agnese',
    txt:'From the 1940s, Andersen and di Sant\'Agnese used sulfonamides and penicillin against lung infections, which helped only temporarily [[Friedman2025,Trouve2024]].'},
   {y:1945,yl:'1945',th:'disc',e:'The term "mucoviscidosis": thick mucus blamed as the cause',p:'Farber',
    txt:'Farber introduced the term "mucoviscidosis" in 1945, because he thought the cause was generally thickened mucus [[Trouve2024]].'},
   {y:1946,yl:'1946',th:'gene',e:'CF is shown to be inherited as an autosomal recessive trait',p:'Andersen (with Hodges, per Trouvé 2024)',
    txt:'The autosomal recessive inheritance of CF was described in 1946 [[Andersen1946,Trouve2024]].'},
   {y:1948.5,yl:'1948–49',th:'dx',e:'A New York heat wave: dehydrated children with CF prompt a study of their sweat',p:'di Sant\'Agnese',
    txt:'During a New York heat wave (1948–49), dehydrated children with CF led di Sant\'Agnese to study their sweat [[Friedman2025,McBennett2022]].'},
   {y:1953,yl:'1953',th:'dx',e:'Abnormal sweat electrolytes: chloride 3 to 5 times normal',p:'di Sant\'Agnese, Darling, Perera, Shea',
    txt:'di Sant\'Agnese and colleagues reported abnormal sweat electrolytes in CF [[DiSantAgnese1953]]; in that first comparison, sweat chloride in children with CF was 3 to 5 times normal [[Friedman2025]].'},
   {y:1955,yl:'1955',th:'rx',e:'Care centres with comprehensive programmes start a striking rise in survival',p:'CF care centres',
    txt:'From 1955, care centres running aggressive, comprehensive care began a striking improvement in survival; their pillars of nutrition, airway clearance and infection treatment are still in use [[Davis2006]].'},
   {y:1957,yl:'1957',th:'rx',e:'A comprehensive care programme opens in Cleveland; mist tents rise and fall',p:'Cleveland programme',
    txt:'A comprehensive care programme began in Cleveland in 1957. Mist-tent therapy rose and fell in popularity between the 1950s and 1970s [[Labonte2018]].'},
   {y:1959,yl:'1959',th:'dx',e:'The pilocarpine iontophoresis sweat test is standardised',p:'Gibson and Cooke',
    txt:'Gibson and Cooke standardised sweat collection by pilocarpine iontophoresis, still the basis of the sweat test [[Gibson1959,Trouve2024]]. Milder cases could now be found, so CF was no longer seen only as a disease of mucus [[Davis2006]].'},
   {y:1975,yl:'1975',th:'rx',e:'Injectable tobramycin is approved by the FDA',p:'',
    txt:'Injectable tobramycin was approved by the FDA in 1975 [[McBennett2022]].'},
   {y:1979,yl:'1979',th:'dx',e:'IRT on a dried blood spot: newborn screening becomes possible',p:'Crossley, Elliott, Smith',
    txt:'Immunoreactive trypsin(ogen) (IRT) was shown to be raised in infants with CF and measurable on a dried blood spot, the basis of newborn screening [[Crossley1979]].'},
   {y:1981,yl:'1981',th:'disc',e:'Nasal potential difference is raised in CF: too much sodium absorbed',p:'Knowles, Gatzy, Boucher',
    txt:'Knowles and colleagues found that nasal potential difference in 24 people with CF was more than 3 standard deviations above controls, consistent with excess sodium absorption [[Knowles1981]].'},
   {y:1982,yl:'Early 1980s',th:'rx',e:'Burkholderia cepacia spreads in clinics; separating patients helps control it',p:'',
    txt:'In the early 1980s Burkholderia cepacia appeared in CF clinics and for a time halted the rise in survival; separating infected patients helped control it [[McBennett2022]].'},
   {y:1983,yl:'1983',th:'disc',e:'The sweat duct is impermeable to chloride: why sweat is salty',p:'Quinton',
    txt:'Quinton showed low chloride permeability in CF sweat ducts, explaining salty sweat [[Quinton1983]].'},
   {y:1984.5,yl:'1984–85',th:'disc',e:'The chloride defect is cAMP-regulated, at the apical membrane',p:'',
    txt:'Studies in 1984–85 showed the chloride defect was cAMP-regulated and located at the apical membrane of airway cells [[Friedman2025]].'},
   {y:1985.2,yl:'1985',th:'gene',e:'A DNA marker narrows the CF gene to about 1% of the genome',p:'Tsui and colleagues',
    txt:'A DNA marker linked to the CF gene narrowed its location to about 1% of the human genome [[Tsui1985]].'},
   {y:1985.8,yl:'1985–94',th:'dx',e:'The Wisconsin randomised trial of newborn screening',p:'Farrell and the Wisconsin study group',
    txt:'The Wisconsin randomised trial (650,341 newborns) found better growth in the screened group; screened babies were diagnosed at a mean of 12 weeks against 72 weeks [[Farrell1997,Farrell2001]].'},
   {y:1989,yl:'1989',th:'gene',e:'The CF gene is cloned on chromosome 7 and its protein named CFTR',p:'Rommens, Riordan, Kerem and colleagues',
    txt:'Three Science papers cloned the CF gene on chromosome 7q (about 250,000 base pairs) and named the protein CFTR [[Rommens1989,Riordan1989,Kerem1989,Friedman2025]]. About 70% of CF mutations were one three-base deletion removing phenylalanine 508 (F508del) [[Kerem1989]].'},
   {y:1990,yl:'1990',th:'gene',e:'Normal CFTR corrects the chloride defect in CF cells; F508del is held in the ER',p:'Rich, Drumm and colleagues',
    txt:'Adding normal CFTR to CF airway cells corrected the chloride channel defect, and the F508del form did not [[Rich1990]]; retrovirus gene transfer corrected CF pancreatic cells [[Drumm1990]]. The F508del protein was shown to be held in the endoplasmic reticulum [[Friedman2025]].'},
   {y:1992,yl:'1992',th:'gene',e:'The first CF mouse; CFTR is shown to be a chloride channel itself',p:'Snouwaert and colleagues',
    txt:'The first CF mouse was made by gene targeting; the mice usually died of intestinal obstruction before 40 days [[Snouwaert1992]]. Altering CFTR\'s ion selectivity showed that CFTR is itself a chloride channel [[Friedman2025]].'},
   {y:1993.3,yl:'1993–94',th:'gene',e:'First gene-therapy tests with adenovirus vectors in people with CF',p:'Zabner, Welsh; Crystal and colleagues',
    txt:'Adenovirus-delivered CFTR transiently corrected the chloride defect in the nasal lining of 3 people with CF [[Zabner1993]]. In 1994 a vector given to the airways of 4 people expressed CFTR, and the highest dose caused a transient systemic and lung syndrome [[Crystal1994]].'},
   {y:1993.99,yl:'1993',th:'rx',e:'Dornase alfa (Pulmozyme) is approved on 30 December',p:'',
    txt:'The FDA approved dornase alfa (Pulmozyme) on 30 December 1993 [[FDA2026CFApprovals]]. In its pivotal trial (968 patients) it cut the risk of respiratory exacerbations by 28% once daily and 37% twice daily [[Fuchs1994Dornase]].'},
   {y:1997.97,yl:'1997',th:'rx',e:'Inhaled tobramycin (TOBI) is approved on 22 December',p:'',
    txt:'The FDA approved tobramycin inhalation solution (TOBI) on 22 December 1997 [[FDA2026CFApprovals]]. In its trials (520 patients), FEV1 rose 10% at week 20 against a 2% fall on placebo, and hospitalisation fell 26% [[Ramsey1999TOBI]].'},
   {y:1999.5,yl:'1999–2000',th:'gene',e:'The CF Foundation funds high-throughput screens for CFTR modulators',p:'CF Foundation, Aurora Biosciences',
    txt:'The CF Foundation funded Aurora Biosciences to screen for CFTR correctors and potentiators, "the most successful example of Venture Philanthropy to date" in a Lasker perspective [[Friedman2025]].'},
   {y:2004,yl:'2001–05',th:'gene',e:'Vertex acquires Aurora; hits by 2003, ivacaftor identified by 2005',p:'Vertex',
    txt:'Vertex acquired Aurora in 2001. With continued CF Foundation funding, screening hits were found by 2003 and ivacaftor was identified by 2005 [[Friedman2025]].'},
   {y:2007,yl:'2007',th:'dx',e:'UK-wide newborn bloodspot screening for CF begins',p:'',
    txt:'UK-wide newborn bloodspot screening for CF began in 2007 [[Schluter2020]].'},
   {y:2009,yl:'2009',th:'gene',e:'VX-770 (ivacaftor) raises chloride secretion about 10-fold in lab cells',p:'Van Goor and colleagues',
    txt:'In G551D/F508del bronchial cells, VX-770 raised chloride secretion about 10-fold, to about 50% of non-CF levels [[VanGoor2009VX770]].'},
   {y:2011,yl:'2011',th:'dx',e:'Newborn screening for CF in every US state',p:'',
    txt:'By 2011, CF newborn screening had been enacted in all 50 US states and the District of Columbia [[Rock2011]].'},
   {y:2011.5,yl:'2011',th:'gene',e:'STRIVE: ivacaftor raises FEV1 by 10.6 points in people with G551D',p:'Ramsey and colleagues',
    txt:'In STRIVE (G551D, age 12 and over), ivacaftor raised percent predicted FEV1 by 10.6 points against placebo through week 24 and lowered sweat chloride by 48.1 mmol/L [[Ramsey2011STRIVE]].'},
   {y:2012.08,yl:'2012',th:'gene',e:'Ivacaftor (Kalydeco), the first CFTR modulator, is approved on 31 January',p:'',
    txt:'The FDA approved ivacaftor (Kalydeco), the first CFTR modulator, on 31 January 2012 [[FDA2026CFApprovals,McBennett2022]].'},
   {y:2015.5,yl:'2015',th:'gene',e:'Lumacaftor–ivacaftor (Orkambi) is approved on 2 July',p:'',
    txt:'The FDA approved lumacaftor–ivacaftor (Orkambi) on 2 July 2015 [[FDA2026CFApprovals]]. In F508del homozygotes FEV1 improved by 2.6 to 4.0 points against placebo [[Wainwright2015TRAFFIC]].'},
   {y:2018.1,yl:'2018',th:'gene',e:'Tezacaftor–ivacaftor (Symdeko) is approved on 12 February',p:'',
    txt:'The FDA approved tezacaftor–ivacaftor (Symdeko) on 12 February 2018 [[FDA2026CFApprovals]]; in EVOLVE, FEV1 improved 4.0 points against placebo [[TaylorCousar2017EVOLVE]]. The phase 2 results of the elexacaftor (VX-445) triple were published the same year [[Keating2018VX445]].'},
   {y:2019.8,yl:'2019',th:'gene',e:'Elexacaftor–tezacaftor–ivacaftor (Trikafta) is approved on 21 October',p:'',
    txt:'The FDA approved elexacaftor–tezacaftor–ivacaftor (Trikafta) on 21 October 2019 [[FDA2026CFApprovals]]. With one F508del and one minimal-function variant, it raised FEV1 by 14.3 points through 24 weeks against placebo and cut exacerbations by 63% [[Middleton2019ETI]].'},
   {y:2024.97,yl:'2024',th:'gene',e:'Vanzacaftor–tezacaftor–deutivacaftor (Alyftrek), once daily, approved 20 December',p:'',
    txt:'The FDA approved vanzacaftor–tezacaftor–deutivacaftor (Alyftrek), a once-daily triple, on 20 December 2024 [[FDA2026CFApprovals]]. In SKYLINE it was non-inferior to ETI on FEV1 [[Keating2025SKYLINE]].'},
   {y:2025.5,yl:'2025',th:'gene',e:'The Lasker–DeBakey award for the work behind the triple combination',p:'Michael Welsh, Jesús González, Paul Negulescu',
    txt:'The 2025 Lasker–DeBakey Clinical Medical Research Award went to Michael Welsh, Jesús González and Paul Negulescu for work that led to the triple combination [[Friedman2025]].'}
  ];
  /* compressed axis */
  const pos=y=>y<1930?.004+(y-1600)/330*.056:y<1980?.06+(y-1930)/50*.36:.42+(y-1980)/46*.575;
  MS.forEach((m,i)=>{m.i=i;m.u=pos(m.y)});
  const ERAS=[
   {from:0,at:pos(1606)+.001,k:'1606 to 1946',t:'Salt, folklore and a name',y0:1600,y1:1947,
    pt:'Long ago, people noticed that some babies tasted salty when kissed. Doctors later found this salty sweat is a sign of CF [[Busch1990,DiSantAgnese1953]].',
    hook:'1938: Andersen describes "cystic fibrosis of the pancreas"; 1946: autosomal recessive inheritance [[Andersen1938,Andersen1946]].'},
   {from:pos(1947.5),at:pos(1953)+.001,k:'1948 to 1979',t:'The sweat test and organised care',y0:1948,y1:1980,
    pt:'Care centres brought together good nutrition, airway clearance and infection treatment, and children began to live longer [[Davis2006]].',
    hook:'1953: di Sant\'Agnese finds the sweat electrolyte defect; 1959: the Gibson–Cooke pilocarpine iontophoresis sweat test [[DiSantAgnese1953,Gibson1959]].'},
   {from:pos(1980.5),at:pos(1983)+.001,k:'1981 to 1992',t:'The basic defect and the gene',y0:1980,y1:1993,
    pt:'In 1989 scientists found the gene that causes CF. It carries the instructions for a channel that normally carries chloride and bicarbonate [[Kerem1989,Shteinberg2021]].',
    hook:'1989: CFTR cloned on chromosome 7; about 70% of CF alleles are F508del [[Kerem1989,Rommens1989]].'},
   {from:pos(1993.1),at:pos(1993.99)+.001,k:'1993 to 1998',t:'Gene therapy trials and inhaled drugs',y0:1993,y1:1999,
    pt:'Two inhaled medicines came first: dornase alfa, which cut chest flare-ups, and tobramycin breathed in as an antibiotic mist [[Fuchs1994Dornase,Ramsey1999TOBI]].',
    hook:'Dornase alfa approved 30 December 1993; inhaled tobramycin (TOBI) 22 December 1997 [[FDA2026CFApprovals]].'},
   {from:pos(1999.2),at:pos(1999.5)+.001,k:'1999 to 2011',t:'Venture philanthropy and universal screening',y0:1999,y1:2012,
    pt:'Most babies with CF are now found by a heel-prick blood test soon after birth. A sweat test confirms it [[Rock2011,Farrell2017Dx]].',
    hook:'Newborn screening: in every US state by 2011, UK-wide from 2007 [[Rock2011,Schluter2020]].'},
   {from:pos(2012),at:pos(2019.8)+.001,k:'2012 to 2025',t:'The modulator era',y0:2012,y1:2026,
    pt:'New medicines called modulators fix part of the problem at its source. They are not a cure, and not everyone can get or use them [[TaylorCousar2023Lancet,Guo2022Access]].',
    hook:'2012: ivacaftor for G551D, the first modulator; 2019: elexacaftor–tezacaftor–ivacaftor [[FDA2026CFApprovals,Ramsey2011STRIVE]].'}
  ];
  /* US median survival series (pass A), shown as the latest figure published before the cursor's year */
  const SURV=[[1938,.5,'about 6 months'],[1954,4.5,'4–5 years'],[1969,14,'14 years'],[1990,28,'28 years'],[2011,36.8,'36.8 years'],[2012,40,'40 years (2010–14)'],[2018,47.4,'47.4 years'],[2019,48.4,'48.4 years (predicted)']];
  const yearAt=u=>u<.06?1600+(u-.004)/.056*330:u<.42?1930+(u-.06)/.36*50:1980+(u-.42)/.575*46;
  const on={disc:true,dx:true,rx:true,gene:true};
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),chips=$('#hiYears'),tb=$('#hiTbl');
  const vis=()=>MS.filter(m=>on[m.th]);
  const curOf=t=>{const V=vis();let c=V[0];V.forEach(m=>{if(m.u<=t+.0006)c=m});return c};
  function wrap(str,n){const w=str.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){L.push(l.trim());l=x}else l+=' '+x});if(l.trim())L.push(l.trim());return L}
  function glyph(th,x,y,ph){if(th==='dx')return sweatGland(x,y-34,.42,{cf:1,ph,salt:1});
    if(th==='rx')return pill(x-10,y,30,{ang:-20+10*Math.sin(ph*6),col:'var(--rx)'})+pill(x+14,y+12,24,{round:true,col:'var(--rx)'});
    if(th==='gene')return chrom(x-16,y-26,58,{band:.4})+modulator(x+16,y,12,{kind:'corr'})+modulator(x+16,y+20,11,{kind:'pot'});
    /* discovery: a magnifying glass over a salt crystal */
    return `<rect x="${f1(x-7)}" y="${f1(y-7)}" width="14" height="14" transform="rotate(${f1(20+ph*40)} ${f1(x)} ${f1(y)})" style="fill:var(--salt);stroke:var(--salt-edge)"/><circle cx="${f1(x)}" cy="${f1(y)}" r="17" style="fill:none;stroke:var(--brand);stroke-width:3"/><line x1="${f1(x+12)}" y1="${f1(y+12)}" x2="${f1(x+26)}" y2="${f1(y+26)}" style="stroke:var(--brand);stroke-width:5;stroke-linecap:round"/>`}
  let setA=()=>{},lastId=-1;
  function draw(t){const N=vb(svg,'720 400','400 440'),p=phaseOf(ERAS,t),E=ERAS[p],M=curOf(t),yr=yearAt(t);
    const ax=N?16:34,aw=N?368:652,ay=N?96:104,X=u=>ax+aw*u;
    let s=`<text x="${ax}" y="${N?26:30}" class="t-big">${E.t}</text><text x="${ax}" y="${N?44:48}" class="t-sm">${E.k}</text>`;
    /* era bands */
    ERAS.forEach((e,i)=>{const a=X(i?e.from:0),b=X(i<ERAS.length-1?ERAS[i+1].from:1);s+=`<rect x="${f1(a+1)}" y="${ay-22}" width="${f1(b-a-2)}" height="5" rx="2.5" style="fill:${i===p?'var(--brand)':'var(--panel-2)'}"/>`});
    /* axis */
    s+=`<line x1="${ax}" x2="${ax+aw}" y1="${ay}" y2="${ay}" class="axis" style="stroke-width:2"/>`;
    const bx=X(.06)-4;s+=`<path d="M${f1(bx-4)} ${ay+6}l5 -12M${f1(bx+2)} ${ay+6}l5 -12" style="stroke:var(--muted);stroke-width:1.4"/>`;
    (N?[1600,1950,1980,2000,2025]:[1600,1930,1950,1970,1990,2000,2010,2025]).forEach(y=>{const xx=X(pos(y));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ay}" y2="${ay+5}" class="axis"/><text x="${f1(xx)}" y="${ay+18}" class="t-xs t-mid">${y}</text>`});
    /* milestone dots */
    MS.forEach(m=>{const vv=on[m.th],cur=m===M,xx=X(m.u),r=cur?7:vv?4.2:2.4,lift=cur?0:0;
      s+=`<circle cx="${f1(xx)}" cy="${ay-lift}" r="${r}" style="fill:${vv?TH[m.th][1]:'var(--line)'};stroke:var(--panel);stroke-width:1.5;opacity:${vv?(m.u<=t+.0006?1:.55):.6}"/>`;
      if(cur)s+=`<circle cx="${f1(xx)}" cy="${ay}" r="11" style="fill:none;stroke:${TH[m.th][1]};stroke-width:1.6"/>`});
    /* cursor */
    const cx=X(t);s+=`<path d="M${f1(cx)} ${ay-34}L${f1(cx-5)} ${ay-42}L${f1(cx+5)} ${ay-42}Z" style="fill:var(--ink)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="${ay-34}" y2="${ay+26}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 2"/>`;
    /* the card: fades in when the milestone changes */
    const age=clamp((t-M.u)/.012),slide=M.u<=t+.0006?ease(Math.min(1,.35+age)):1;
    const cy0=N?ay+46:ay+52,ch=N?196:162,cw=aw,mcx=X(M.u);
    s+=`<path d="M${f1(clamp(mcx,ax+20,ax+aw-20)-8)} ${cy0}L${f1(clamp(mcx,ax+20,ax+aw-20))} ${cy0-12}L${f1(clamp(mcx,ax+20,ax+aw-20)+8)} ${cy0}Z" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${ax}" y="${cy0}" width="${cw}" height="${ch}" rx="12" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${ax}" y="${cy0}" width="6" height="${ch}" rx="3" style="fill:${TH[M.th][1]}"/>`;
    s+=`<g style="opacity:${f1(slide)}" transform="translate(${f1((1-slide)*14)} 0)">`;
    s+=`<text x="${ax+22}" y="${cy0+42}" class="t-big" style="font-size:34px;fill:${TH[M.th][1]}">${M.yl}</text>`;
    s+=`<text x="${ax+22}" y="${cy0+62}" class="t-xs" style="letter-spacing:.1em">${TH[M.th][0].toUpperCase()}</text>`;
    const lines=wrap(M.e,N?36:54);lines.slice(0,N?5:3).forEach((l,i)=>{s+=`<text x="${ax+22}" y="${cy0+(N?90:86)+i*19}" class="t-lbl" style="font-size:15px">${l}</text>`});
    if(M.p){const pl=wrap(M.p,N?44:70);pl.slice(0,2).forEach((l,i)=>{s+=`<text x="${ax+22}" y="${cy0+(N?96+Math.min(lines.length,5)*19:94+Math.min(lines.length,3)*19)+i*14}" class="t-sm" style="fill:var(--ink)">${i?'':'People: '}${l}</text>`})}
    s+=`</g>`;
    {const gx=N?ax+cw-40:ax+cw-80,gy=N?cy0+42:cy0+70,sc=N?1.25:1.8;s+=`<g transform="translate(${f1(gx)} ${f1(gy)}) scale(${sc}) translate(${f1(-gx)} ${f1(-gy)})">${glyph(M.th,gx,gy,t*30)}</g>`}
    /* survival at the time */
    const sy=N?cy0+ch+40:cy0+ch+42,sw=N?250:360,sx=N?ax:ax+150,S=SURV.filter(q=>q[0]<=yr).pop();
    s+=`<text x="${ax}" y="${N?sy-10:sy+10}" class="t-xs" style="fill:var(--ink);font-weight:600">US median survival</text>`;
    if(!N)s+=`<text x="${ax}" y="${sy+22}" class="t-xs">latest figure then</text>`;
    s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    if(S)s+=`<rect x="${sx}" y="${sy}" width="${f1(Math.max(4,sw*S[1]/50))}" height="12" rx="6" style="fill:var(--brand)"/>`;
    s+=`<text x="${f1(sx+sw+10)}" y="${sy+10}" class="t-xs" style="fill:var(--ink)">${S?S[2]+' ('+S[0]+')':'no figure yet'}</text>`;
    s+=`<text x="${sx}" y="${sy+26}" class="t-xs">0</text><text x="${sx+sw}" y="${sy+26}" class="t-xs t-end">50 years</text>`;
    svg.innerHTML=s;
    note.innerHTML=noteHTML({k:E.k+' · '+M.yl,t:M.e,txt:M.txt+(M.p?` <b>People:</b> ${M.p}.`:''),pt:E.pt,hook:E.hook});
    setA(p);
    if(M.i!==lastId){lastId=M.i;$$('[data-hi]',chips).forEach(b=>b.setAttribute('aria-current',+b.dataset.hi===M.i?'true':'false'))}
    rg.setAttribute('aria-valuetext',`${M.yl}: ${M.e}`)}
  function lists(){
    chips.innerHTML=vis().map(m=>`<button class="tag" data-hi="${m.i}" aria-current="false">${m.yl} · ${m.e.length>44?m.e.slice(0,42).replace(/\s\S*$/,'')+'…':m.e}</button>`).join('');
    tb.innerHTML=MS.map(m=>`<tr${on[m.th]?'':' hidden'}><td class="hiy">${m.yl}</td><td>${m.txt}</td><td>${m.p||'–'}</td><td><span class="hith" style="color:${TH[m.th][1]}">${TH[m.th][0]}</span></td></tr>`).join('');
    lastId=-1}
  const stop=playWire(rg,$('#hiPlay'),draw,42000,'%t:player.replay%','history');
  setA=stepWire($('#hiSteps'),ERAS,rg,draw,stop);
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hi]');if(!b)return;stop();const m=MS[+b.dataset.hi];rg.value=Math.min(1,m.u+.0008);draw(+rg.value)});
  $('#hiFilt').addEventListener('click',e=>{const b=e.target.closest('[data-th]');if(!b)return;on[b.dataset.th]=!on[b.dataset.th];
    if(!Object.values(on).some(Boolean))Object.keys(on).forEach(k=>on[k]=true);
    $$('#hiFilt [data-th]').forEach(x=>x.setAttribute('aria-pressed',on[x.dataset.th]));lists();draw(+rg.value)});
  lists();draw(+rg.value);
};
