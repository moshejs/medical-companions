/* =============== 5.1 history and people =============== */
const HI_ERAS=[
 {y:'1901',t:'Auguste D. in Frankfurt',
  cap:['March: her husband notices paranoia,','then sleep and memory problems.','November: Alzheimer examines her at the','Frankfurt psychiatric hospital. She is 50.','Admission usually dated 25 Nov 1901.','She stayed there until 8 April 1906.'],
  flag:'The admission date and the 1995 rediscovery of her case file come via Alzforum; the 1997 paper has no abstract.',
  txt:`In March 1901 the husband of 50-year-old Auguste D. (Auguste Deter) noticed paranoia, followed by sleep and memory problems, aggression and confusion. Alois Alzheimer examined her at the Frankfurt psychiatric hospital in November 1901, and she stayed there until her death on 8 April 1906. [[Hippius2003]] The admission date is usually given as 25 November 1901, and her case file was rediscovered in Frankfurt in December 1995 by Konrad Maurer's group. [[Maurer1997]]`,
  pt:'The disease is named after the doctor who followed one patient, a woman in her fifties whose memory and behaviour changed.',
  hook:'First case: Auguste D., examined by Alois Alzheimer in Frankfurt in November 1901.'},
 {y:'1906',t:'The Tübingen lecture',
  cap:['3 November, 37th Meeting of South-West','German Psychiatrists, Tübingen.','Alzheimer reports "a peculiar severe','disease process of the cerebral cortex":','plaques and neurofibrillary tangles.','The talk drew little interest.','Published in 1907, without figures.'],
  txt:`On 3 November 1906, at the 37th Meeting of South-West German Psychiatrists in Tübingen, Alzheimer reported "a peculiar severe disease process of the cerebral cortex" and described plaques and neurofibrillary tangles. The talk drew little interest. [[Hippius2003]] He published the case in 1907, without figures. [[Hippius2003,BermejoPareja2024]]`,
  pt:'Alzheimer looked at her brain under the microscope and saw two kinds of damage that are still the hallmarks of the disease today.',
  hook:'The two lesions Alzheimer described in 1906: plaques and neurofibrillary tangles.'},
 {y:'1910',t:'Kraepelin names the disease',
  cap:['Emil Kraepelin names "Alzheimer\'s','disease" in the 8th edition of his','textbook, Psychiatrie.','Historians still debate why he made a','separate disease from so few cases.','The presenile and senile split was','dropped at a 1978 Bethesda meeting.'],
  txt:`Kraepelin named "Alzheimer's disease" in the 8th edition of his textbook Psychiatrie (1910). [[Hippius2003,BermejoPareja2024]] Historians debate why he created a separate disease from so few cases; one explanation is the rivalry between the Munich and Prague schools. The split between presenile Alzheimer's disease and senile dementia was dropped at a 1978 Bethesda meeting. [[BermejoPareja2024]]`,
  pt:'For decades "Alzheimer\'s" meant a rare illness of younger people. Since 1978 the same disease has been recognised at any age.',
  hook:'Kraepelin, Psychiatrie, 8th edition, 1910: the name. 1978 Bethesda: presenile and senile forms unified.'},
 {y:'1968',t:'Counting plaques in Newcastle',
  cap:['Blessed, Tomlinson and Roth measure','plaques and dementia with numbers.','More plaques went with more severe','dementia, but plaques and tangles also','turned up in older people without','dementia.'],
  flag:'The 1968 paper has no abstract; its findings come through a 2024 history review.',
  txt:`Blessed, Tomlinson and Roth (Newcastle, 1968) used quantitative methods to show that plaque counts correlated with dementia severity, and that plaques and tangles also occurred in older people without dementia. [[Blessed1968,BermejoPareja2024]]`,
  pt:'Counting the changes, instead of only describing them, linked them to how severe the dementia was.',
  hook:'Blessed, Tomlinson and Roth 1968: plaque counts correlate with dementia severity.'},
 {y:'1976–82',t:'The cholinergic era',
  cap:['1976: Davies and Maloney report a','selective loss of cholinergic neurons.','1976: Katzman calls Alzheimer\'s "a','major killer". NIA funding then grows','from $19.3M (1976) to $222.6M (1989).','1982: Bartus and colleagues set out the','cholinergic hypothesis of memory loss.'],
  flag:'The Davies and Maloney letter and the Katzman editorial have no abstract; their content comes through a 2024 review and earlier histories.',
  txt:`Davies and Maloney (1976) reported a selective loss of central cholinergic neurons in Alzheimer's, and Bartus and colleagues (1982) set out the cholinergic hypothesis of geriatric memory dysfunction. [[DaviesMaloney1976,Bartus1982]] Katzman's 1976 editorial, "The prevalence and malignancy of Alzheimer disease: a major killer", helped reframe the disease as a common cause of death. US NIA funding for Alzheimer's research rose from $19.3 million in 1976 to $222.6 million in 1989. [[Katzman1976,BermejoPareja2024]]`,
  pt:'Researchers found that the brain cells that make the chemical messenger acetylcholine are lost, and that Alzheimer\'s is a common cause of death, not a rarity.',
  hook:'Cholinergic hypothesis: Davies and Maloney 1976, Bartus 1982.'},
 {y:'1984',t:'Amyloid beta is sequenced',
  cap:['Glenner and Wong purify a protein from','the amyloid in brain blood vessels and','sequence it.','It matched no protein known at the','time. It was later called amyloid beta.'],
  txt:`Glenner and Wong (1984) purified and sequenced a new cerebrovascular amyloid protein from Alzheimer's brains, later called amyloid beta. It had no homology to any protein sequenced at the time. [[Glenner1984]]`,
  pt:'Scientists pulled the plaque protein out of blood-vessel walls and read its building blocks for the first time.',
  hook:'Glenner and Wong 1984: amyloid beta sequenced from cerebrovascular amyloid.'},
 {y:'1986',t:'Tau inside the tangle',
  cap:['Grundke-Iqbal and colleagues show that','tau is an abnormally phosphorylated part','of the paired helical filaments that','make up tangles.'],
  txt:`Grundke-Iqbal and colleagues (1986) showed that tau, a microtubule-associated protein, is an abnormally phosphorylated component of the paired helical filaments in tangles. [[GrundkeIqbal1986]]`,
  pt:'Tangles turned out to be made of tau, a protein that normally steadies the cell\'s internal rails, after too many phosphate tags were added to it.',
  hook:'Tangles = paired helical filaments of abnormally phosphorylated tau (Grundke-Iqbal 1986).'},
 {y:'1987–95',t:'The genes',
  cap:['1987: APP cloned, on chromosome 21.','1991: first APP mutation in a family','with Alzheimer\'s.','1992: Hardy and Higgins propose the','amyloid cascade hypothesis.','1995: PSEN1 (chromosome 14) and PSEN2','(chromosome 1) mutations found.'],
  flag:'Hardy and Higgins 1992 has no abstract; its summary comes through a 2024 review.',
  txt:`Kang and colleagues (1987) cloned the amyloid precursor (695 residues), which resembles a cell-surface receptor, and placed its gene on chromosome 21. [[Kang1987]] Goate and colleagues (1991) found the first APP missense mutation segregating with familial Alzheimer's. [[Goate1991]] Hardy and Higgins (1992) proposed the amyloid cascade hypothesis; a 2024 review notes it has so far yielded "poor therapeutic results". [[HardyHiggins1992,BermejoPareja2024]] PSEN1 on chromosome 14 and PSEN2 on chromosome 1 were identified in early-onset familial Alzheimer's in 1995. [[Sherrington1995,LevyLahad1995,Rogaev1995]]`,
  pt:'Families in which Alzheimer\'s passed down the generations led researchers to three genes, all tied to how amyloid is made.',
  hook:'Three dominant genes: APP (chromosome 21), PSEN1 (14), PSEN2 (1).'},
 {y:'1993',t:'APOE4',
  cap:['Strittmatter: the APOE ε4 allele is about','3 times as common in familial late-onset','Alzheimer\'s (0.50 vs 0.16 in controls).','Corder: risk rises from 20% to 90%, and','onset falls from 84 to 68, with more','ε4 copies.'],
  txt:`In 1993 Strittmatter and colleagues found an APOE ε4 allele frequency of 0.50 in familial late-onset Alzheimer's against 0.16 in controls. Corder and colleagues showed a gene-dose effect: risk rose from 20% to 90%, and mean age at onset fell from 84 to 68, with more ε4 copies. [[Strittmatter1993,Corder1993]]`,
  pt:'A common version of one gene was found to raise the risk of late-onset Alzheimer\'s, more so with two copies than with one.',
  hook:'APOE ε4 (1993): a risk gene with a dose effect (Corder 1993).'},
 {y:'1993–2003',t:'The first drugs',
  cap:['FDA approval dates:','tacrine (Cognex), 9 September 1993','donepezil (Aricept), 25 November 1996','memantine (Namenda), 16 October 2003'],
  txt:`Tacrine (Cognex), the first FDA-approved Alzheimer's drug, was approved on 9 September 1993. Donepezil (Aricept) was approved on 25 November 1996, and memantine (Namenda) on 16 October 2003. [[FDA_DrugsFDA]] The other two cholinesterase inhibitors came in between: rivastigmine (Exelon) on 21 April 2000 and galantamine (Razadyne) on 28 February 2001. [[DrugsFDA2026]] See <a href="#synapse" data-go="synapse">Cholinesterase inhibitors and memantine</a> for how they work.`,
  pt:'The first medicines for Alzheimer\'s act on the brain\'s chemical messengers.',
  hook:'Tacrine 1993 (first), donepezil 1996, rivastigmine 2000, galantamine 2001, memantine 2003.'},
 {y:'2004',t:'Seeing amyloid in life',
  cap:['Pittsburgh compound B (PiB): the first','amyloid PET tracer studied in people,','16 with mild Alzheimer\'s and 9 controls.','Retention was highest in frontal cortex,','1.94-fold.'],
  txt:`Pittsburgh compound B (PiB) was the first amyloid PET tracer studied in humans (2004; 16 people with mild Alzheimer's and 9 controls). Retention was highest in frontal cortex (1.94-fold). [[Klunk2004]]`,
  pt:'For the first time, plaques could be seen in a living person\'s brain on a scan, instead of only after death.',
  hook:'PiB, 2004: the first amyloid PET tracer in humans.'},
 {y:'2021–24',t:'Aducanumab',
  cap:['Nov 2020: an FDA advisory committee','votes the clinical evidence insufficient.','7 Jun 2021: accelerated approval, based','on amyloid reduction.','31 Jan 2024: Biogen ends development;','it says not for safety or efficacy.'],
  txt:`An FDA advisory committee voted in November 2020 that the clinical evidence for aducanumab (Aduhelm) was insufficient. On 7 June 2021 it received accelerated approval, based on amyloid reduction as a surrogate endpoint. [[FDA_DrugsFDA,FDA2021AduMemo]] On 31 January 2024 Biogen announced it was ending development and commercialisation and stopping the confirmatory ENVISION trial. It said the decision was not due to safety or efficacy concerns, and rights returned to Neurimmune. [[Biogen2024]]`,
  pt:'The first anti-amyloid antibody was approved on the strength of a scan result rather than clear benefit to patients, and its maker stopped selling it less than three years later.',
  hook:'Aducanumab: accelerated approval 7 June 2021 on a surrogate (amyloid), discontinued January 2024.'},
 {y:'2023–24',t:'Lecanemab and donanemab',
  cap:['Lecanemab: accelerated approval 6 Jan','2023, traditional approval 6 Jul 2023,','the first such conversion. Boxed','warning for ARIA.','Donanemab: approved 2 Jul 2024, given','IV every 4 weeks, with an ARIA warning.'],
  txt:`Lecanemab (Leqembi) received accelerated approval on 6 January 2023 and was converted to traditional approval on 6 July 2023 after the Clarity AD trial (1,795 patients; CDR-SB at 18 months), the first amyloid-directed antibody to make this conversion. Its label carries a boxed warning for ARIA. [[FDA_DrugsFDA,FDA2023Lecanemab,vanDyck2023]] Donanemab (Kisunla) was approved on 2 July 2024 for people with MCI or mild dementia and confirmed amyloid pathology. It is given intravenously every 4 weeks, and its label carries an ARIA warning. [[FDA_DrugsFDA,FDA2024Donanemab,Sims2023]] See <a href="#antibody" data-go="antibody">Anti-amyloid antibodies over time</a>.`,
  pt:'Two antibodies that clear amyloid from the brain are now approved for early Alzheimer\'s, each with a warning about brain swelling or bleeding.',
  hook:'Lecanemab: the first anti-amyloid antibody converted to traditional approval (6 July 2023).'}
].map((e,i,a)=>({...e,from:i/a.length,at:i/a.length+.6/a.length}));

const hiPerson=(x,y,c='var(--sage)',f='var(--sage-soft)',r=7)=>`<circle cx="${f1(x)}" cy="${f1(y-r*2.9)}" r="${r}" style="fill:${f};stroke:${c};stroke-width:1.8"/><path d="M${f1(x-r*1.5)} ${f1(y)} v-${f1(r*.9)} q0 -${f1(r*1.2)} ${f1(r*1.5)} -${f1(r*1.2)} q${f1(r*1.5)} 0 ${f1(r*1.5)} ${f1(r*1.2)} v${f1(r*.9)} z" style="fill:${f};stroke:${c};stroke-width:1.8"/>`;
function hiScene(i,u,cx,cy){let s='';const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}" style="${st}">${txt}</text>`;
  if(i===0){ // the asylum
    s+=`<path d="M${cx-150} ${cy+100}H${cx+150}" class="axis"/><path d="M${cx-132} ${cy-40} L${cx} ${cy-100} L${cx+132} ${cy-40}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:2;stroke-linejoin:round"/>`;
    s+=`<rect x="${cx-120}" y="${cy-40}" width="240" height="140" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`+T(cx,cy-55,'FRANKFURT ASYLUM','t-xs t-mid','fill:var(--ink)');
    for(let r=0;r<2;r++)for(let c=0;c<6;c++){const k=r*6+c,on=u>.05+k*.04,x=cx-104+c*36+(c>2?8:0),y=cy-26+r*40;
      s+=`<rect x="${x}" y="${y}" width="20" height="26" rx="2" style="fill:${on?'var(--amber-soft)':'var(--panel-2)'};stroke:var(--muted);stroke-width:1"/>`;
      if(r===0&&c===4&&u>.5)s+=`<circle cx="${x+10}" cy="${y+12}" r="5" style="fill:var(--rose);opacity:${f1(ramp(u,.5,.6))}"/>`}
    s+=`<rect x="${cx-14}" y="${cy+56}" width="28" height="44" rx="12" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`;
    s+=hiPerson(lerp(cx-150,cx-36,ease(ramp(u,.1,.7))),cy+100,'var(--sky)','var(--sky-soft)');
    if(u>.6)s+=`<g style="opacity:${f1(ramp(u,.6,.7))}"><rect x="${cx-150}" y="${cy-124}" width="104" height="22" rx="5" style="fill:var(--amber-soft);stroke:var(--amber)"/>`+T(cx-98,cy-109,'25 NOV 1901','t-xs t-mid','fill:var(--ink)')+'</g>';
  }else if(i===1){ // the lecture
    s+=T(cx-150,cy-110,'TÜBINGEN 1906','t-xs','fill:var(--ink)');
    s+=`<rect x="${cx-40}" y="${cy-120}" width="180" height="132" rx="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/><circle cx="${cx+50}" cy="${cy-54}" r="56" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.5"/>`;
    s+=plaque(cx+22,cy-66,20,9,ramp(u,.15,.3))+tangle(cx+82,cy-64,14,ramp(u,.4,.55));
    if(u>.2)s+=T(cx+22,cy-30,'plaque','t-xs t-mid','fill:var(--ink)');if(u>.45)s+=T(cx+82,cy-24,'tangle','t-xs t-mid','fill:var(--ink)');
    s+=`<path d="M${cx-136} ${cy+70} L${cx-130} ${cy+16} H${cx-90} L${cx-84} ${cy+70}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`+hiPerson(cx-110,cy+16,'var(--sky)','var(--sky-soft)');
    for(let k=0;k<6;k++){const x=cx-40+k*34;s+=`<rect x="${x-11}" y="${cy+100}" width="22" height="16" rx="3" style="fill:var(--panel-2)"/>`;
      if(k%2===0)s+=`<circle cx="${x}" cy="${cy+90}" r="8" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:1.5"/>`}
    if(u>.65)s+=T(cx+50,cy+76,'few listeners, little interest','t-xs t-mid','opacity:'+f1(ramp(u,.65,.75)));
  }else if(i===2){ // the textbook
    s+=`<path d="M${cx} ${cy-76} L${cx-142} ${cy-90} V${cy+80} L${cx} ${cy+94}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/><path d="M${cx} ${cy-76} L${cx+142} ${cy-90} V${cy+80} L${cx} ${cy+94}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    for(let l=0;l<8;l++)s+=`<path d="M${cx-124} ${cy-60+l*17} h${100-(l%3)*14}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    s+=T(cx+70,cy-52,'PSYCHIATRIE','t-xs t-mid','fill:var(--ink)')+T(cx+70,cy-38,'8th edition, 1910','t-xs t-mid');
    const w1="Alzheimer's",w2='disease',n=Math.floor(ramp(u,.1,.7)*(w1.length+w2.length));
    s+=T(cx+70,cy+4,w1.slice(0,Math.min(n,w1.length)),'t-big t-mid','fill:var(--rose)')+T(cx+70,cy+26,w2.slice(0,Math.max(0,n-w1.length)),'t-big t-mid','fill:var(--rose)');
  }else if(i===3){ // counting plaques
    s+=`<path d="M${cx-130} ${cy-96}V${cy+90}H${cx+130}" style="fill:none;stroke:var(--muted);stroke-width:1.5"/>`+T(cx+130,cy+108,'plaque count →','t-xs t-end')+T(cx-122,cy-100,'dementia score ↑','t-xs')+T(cx+130,cy-100,'schematic, not their data','t-xs t-end');
    const q=rng(68);for(let k=0;k<18;k++){const x=q(),noise=q()*.2-.1,dem=k<13;const y=dem?clamp(.12+.72*x+noise,.05,.95):.06+q()*.08;
      const o=ramp(u,.05+k*.035,.12+k*.035);if(o<=0)continue;
      s+=`<circle cx="${f1(cx-120+x*240)}" cy="${f1(cy+80-y*165)}" r="5" style="fill:${dem?'var(--amber)':'var(--sage)'};opacity:${f1(o)}"/>`}
    if(u>.75)s+=`<path d="M${cx-110} ${cy+52} L${cx+120} ${cy-74}" style="stroke:var(--amber);stroke-width:2;stroke-dasharray:6 4;opacity:${f1(ramp(u,.75,.85))}"/>`;
    s+=`<circle cx="${cx-112}" cy="${cy-74}" r="4" style="fill:var(--amber)"/>`+T(cx-104,cy-70,'with dementia','t-xs','fill:var(--ink)')+`<circle cx="${cx-112}" cy="${cy-58}" r="4" style="fill:var(--sage)"/>`+T(cx-104,cy-54,'without dementia','t-xs','fill:var(--ink)');
  }else if(i===4){ // cholinergic synapse and funding
    s+=T(cx-100,cy-86,'cholinergic neuron','t-xs t-mid','fill:var(--ink)');
    const fade=1-.6*ramp(u,.1,.6);
    s+=`<circle cx="${cx-100}" cy="${cy-36}" r="34" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2;opacity:${f1(fade)}"/>`;
    s+=`<rect x="${cx-142}" y="${cy+14}" width="84" height="16" rx="5" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    const n=Math.round(14*(1-.75*ramp(u,.1,.6))),q=rng(76);for(let k=0;k<14;k++){const x=cx-128+q()*56,y=cy-52+q()*60;if(k<n)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--violet)"/>`}
    s+=T(cx-100,cy+48,'acetylcholine','t-xs t-mid','fill:var(--violet)');
    const g=ease(ramp(u,.45,.85)),h1=19.3/222.6*170,h2=170*g;
    s+=T(cx+75,cy-104,'NIA FUNDING','t-xs t-mid','fill:var(--ink)')+`<path d="M${cx+10} ${cy+90}H${cx+140}" class="axis"/>`;
    s+=`<rect x="${cx+22}" y="${f1(cy+90-h1)}" width="40" height="${f1(h1)}" style="fill:var(--sky)"/><rect x="${cx+88}" y="${f1(cy+90-h2)}" width="40" height="${f1(h2)}" style="fill:var(--sky)"/>`;
    s+=T(cx+42,cy+106,'1976','t-xs t-mid')+T(cx+108,cy+106,'1989','t-xs t-mid')+T(cx+42,f1(cy+84-h1),'$19.3M','t-xs t-mid','fill:var(--ink)');
    if(g>.05)s+=T(cx+108,f1(cy+84-h2),'$222.6M','t-xs t-mid','fill:var(--ink)');
  }else if(i===5){ // amyloid from a vessel wall
    s+=`<rect x="${cx-150}" y="${cy+30}" width="300" height="46" style="fill:var(--vessel);opacity:.12"/><rect x="${cx-150}" y="${cy+20}" width="300" height="12" style="fill:var(--vessel);opacity:.45"/><rect x="${cx-150}" y="${cy+74}" width="300" height="12" style="fill:var(--vessel);opacity:.45"/>`;
    for(let k=0;k<5;k++){const x=cx-150+((k*66+u*220)%300);s+=`<ellipse cx="${f1(x)}" cy="${cy+53}" rx="11" ry="7" style="fill:var(--vessel);opacity:.6"/>`}
    [[-110,20],[-60,20],[30,86],[90,20],[-20,86]].forEach(([dx,yy])=>{s+=`<circle cx="${cx+dx}" cy="${cy+yy}" r="7" style="fill:var(--amber)"/>`});
    s+=T(cx-150,cy+108,'brain blood vessel, amyloid in its wall','t-xs');
    for(let k=0;k<16;k++){const p=k/15,x=cx-60+p*170,y=cy+8-p*100-16*Math.sin(p*Math.PI*2),o=ramp(u,.05+k*.025,.1+k*.025),seq=u>.45+k*.025;
      if(o>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:${seq?'var(--amber)':'var(--panel)'};stroke:var(--amber);stroke-width:1.5;opacity:${f1(o)}"/>`}
    if(u>.5)s+=T(cx-150,cy-100,'purified, then sequenced','t-xs','fill:var(--ink)');
    if(u>.85)s+=T(cx+150,cy-112,'no known relative','t-xs t-end','fill:var(--ink)');
  }else if(i===6){ // tau leaves the microtubule
    s+=`<path d="M${cx-150} ${cy-62}H${cx+20}M${cx-150} ${cy-38}H${cx+20}" style="stroke:var(--cell-line);stroke-width:3"/>`;
    for(let x=cx-150;x<cx+20;x+=12)s+=`<path d="M${x} ${cy-62}V${cy-38}" style="stroke:var(--cell-line);stroke-width:1;opacity:.6"/>`;
    s+=T(cx-150,cy-74,'microtubule','t-xs');
    for(let j=0;j<5;j++){const d=ease(ramp(u,.08+j*.07,.3+j*.07)),x=cx-130+j*32,y=cy-50+d*(46+(j%2)*14);
      s+=`<rect x="${x-3}" y="${f1(y-14)}" width="6" height="28" rx="3" style="fill:var(--rose)"/>`;
      if(d>.2)s+=`<circle cx="${x+9}" cy="${f1(y-8)}" r="6" style="fill:var(--panel);stroke:var(--rose);stroke-width:1.5;opacity:${f1(d)}"/><text x="${x+9}" y="${f1(y-5)}" class="t-xs t-mid" style="fill:var(--rose);font-size:8px;opacity:${f1(d)}">P</text>`}
    s+=T(cx-150,cy+70,'P = phosphate tag','t-xs','fill:var(--rose)');
    const k=ramp(u,.5,.9);if(k>0){const L=110*k;let a='',b='';for(let q=0;q<=40;q++){const x=cx+38+L*q/40,ph=q/40*L/18;a+=(q?'L':'M')+f1(x)+' '+f1(cy+40+10*Math.sin(ph));b+=(q?'L':'M')+f1(x)+' '+f1(cy+40-10*Math.sin(ph))}
      s+=`<path d="${a}" style="fill:none;stroke:var(--rose);stroke-width:4"/><path d="${b}" style="fill:none;stroke:var(--rose);stroke-width:4;opacity:.6"/>`+T(cx+150,cy+76,'paired helical filament','t-xs t-end','fill:var(--ink)')}
  }else if(i===7){ // chromosomes
    const chr=(x,y0,y1,c)=>`<rect x="${x-11}" y="${y0}" width="22" height="${y1-y0}" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><path d="M${x-11} ${c}h22" style="stroke:var(--field);stroke-width:4"/>`;
    s+=chr(cx-90,cy-90,cy+90,cy-20)+chr(cx,cy-50,cy+70,cy-30)+chr(cx+70,cy-10,cy+50,cy+5);
    s+=T(cx-90,cy+108,'chr 1','t-xs t-mid')+T(cx,cy+88,'chr 14','t-xs t-mid')+T(cx+70,cy+68,'chr 21','t-xs t-mid');
    const band=(x,y,col,o)=>`<rect x="${x-11}" y="${y-5}" width="22" height="10" style="fill:${col};opacity:${f1(o)}"/>`;
    const a=ramp(u,.05,.15),b=ramp(u,.25,.35),c=ramp(u,.45,.55),d=ramp(u,.65,.75);
    s+=band(cx+70,cy+28,'var(--amber)',a)+T(cx+86,cy+26,'APP','t-xs','fill:var(--ink);opacity:'+f1(a))+T(cx+86,cy+38,b>0?'1987 · 1991':'1987','t-xs','opacity:'+f1(a));
    s+=T(cx-150,cy-112,'1992: amyloid cascade hypothesis','t-xs','fill:var(--ink);opacity:'+f1(c));
    s+=band(cx,cy+20,'var(--rose)',d)+T(cx+16,cy+18,'PSEN1','t-xs','fill:var(--ink);opacity:'+f1(d))+T(cx+16,cy+30,'1995','t-xs','opacity:'+f1(d));
    s+=band(cx-90,cy+50,'var(--rose)',d)+T(cx-74,cy+48,'PSEN2','t-xs','fill:var(--ink);opacity:'+f1(d))+T(cx-74,cy+60,'1995','t-xs','opacity:'+f1(d));
  }else if(i===8){ // APOE4
    const g=ease(ramp(u,.05,.4));
    s+=T(cx-130,cy-104,'ε4 ALLELE FREQUENCY','t-xs','fill:var(--ink)')+`<path d="M${cx-140} ${cy+80}H${cx}" class="axis"/>`;
    [[0.16,'controls',cx-110,'var(--muted)'],[0.5,'late-onset AD',cx-40,'var(--rose)']].forEach(([v,l,x,c])=>{const h=v/.5*160*g;
      s+=`<rect x="${x-22}" y="${f1(cy+80-h)}" width="44" height="${f1(h)}" rx="3" style="fill:${c}"/>`+T(x,f1(cy+74-h),v.toFixed(2),'t-xs t-mid','fill:var(--ink)')+T(x,cy+96,l,'t-xs t-mid')});
    const k=ease(ramp(u,.45,.85)),age=lerp(84,68,k),X=a=>cx+28+(a-60)/30*118;
    s+=T(cx+28,cy-40,'AGE AT ONSET','t-xs','fill:var(--ink)')+`<path d="M${cx+28} ${cy}H${cx+146}" class="axis"/>`;
    [60,70,80,90].forEach(a=>{s+=`<path d="M${f1(X(a))} ${cy-4}v8" class="axis"/>`+T(X(a),cy+18,a,'t-xs t-mid')});
    s+=`<circle cx="${f1(X(age))}" cy="${cy}" r="7" style="fill:var(--rose)"/>`+T(X(age),cy-14,Math.round(age),'t-sm t-mid','fill:var(--ink)');
    s+=T(cx+28,cy+48,'more ε4 copies →','t-xs','fill:var(--ink);opacity:'+f1(k))+T(cx+28,cy+64,'risk 20% → 90%','t-xs','fill:var(--ink);opacity:'+f1(k));
  }else if(i===9){ // the first drugs
    s+=T(cx-140,cy-100,'FDA APPROVALS','t-xs','fill:var(--ink)')+`<path d="M${cx-140} ${cy+60}H${cx+140}" style="stroke:var(--muted);stroke-width:3"/>`;
    [['tacrine','9 Sep 1993'],['donepezil','25 Nov 1996'],['memantine','16 Oct 2003']].forEach(([n,d],k)=>{const x=cx-95+k*95,dr=ease(ramp(u,.08+k*.25,.25+k*.25));if(dr<=0)return;const y=cy-60*(1-dr);
      s+=`<g style="opacity:${f1(dr)}"><rect x="${x-24}" y="${f1(y-12)}" width="48" height="72" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.8"/><rect x="${x-18}" y="${f1(y-26)}" width="36" height="16" rx="3" style="fill:var(--sky)"/><rect x="${x-16}" y="${f1(y+10)}" width="32" height="26" rx="2" style="fill:var(--panel)"/></g>`;
      s+=T(x,cy+80,n,'t-xs t-mid','fill:var(--ink);opacity:'+f1(dr))+T(x,cy+94,d,'t-xs t-mid','opacity:'+f1(dr))});
  }else if(i===10){ // PiB PET
    const brain=(x,o,lab)=>{let b=`<ellipse cx="${x}" cy="${cy}" rx="62" ry="48" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.8"/>`;
      if(o>0)b+=`<ellipse cx="${x-18}" cy="${cy-6}" rx="40" ry="34" style="fill:var(--amber);opacity:${f1(o*.65)}"/><ellipse cx="${x+18}" cy="${cy+4}" rx="34" ry="28" style="fill:var(--amber);opacity:${f1(o*.35)}"/>`;
      for(let g=0;g<4;g++)b+=`<path d="M${x-48+g*24} ${cy-30} q10 18 0 36 q-8 14 4 26" style="fill:none;stroke:var(--muted);stroke-width:1.3;opacity:.6"/>`;
      return b+T(x,cy+70,lab,'t-xs t-mid','fill:var(--ink)')};
    s+=T(cx,cy-100,'PiB RETENTION ON PET','t-xs t-mid','fill:var(--ink)');
    s+=brain(cx-75,0,'control')+brain(cx+75,ease(ramp(u,.15,.6)),'mild Alzheimer\'s');
    if(u>.6)s+=T(cx+57,cy-60,'frontal ×1.94','t-xs t-mid','fill:var(--amber);opacity:'+f1(ramp(u,.6,.7)));
    s+=T(cx-150,cy+100,'front of the brain on the left','t-xs');
  }else if(i===11){ // aducanumab
    s+=`<rect x="${cx-62}" y="${cy-112}" width="124" height="150" rx="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    for(let l=0;l<6;l++)s+=`<path d="M${cx-46} ${cy-92+l*16} h${80-(l%2)*20}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const a=ramp(u,.3,.4),b=ramp(u,.68,.78);
    if(a>0)s+=`<g transform="rotate(-12 ${cx} ${cy-20})" style="opacity:${f1(a)}"><rect x="${cx-56}" y="${cy-38}" width="112" height="36" rx="6" style="fill:none;stroke:var(--good);stroke-width:2.5"/>`+T(cx,cy-24,'ACCELERATED','t-xs t-mid','fill:var(--good);font-weight:600')+T(cx,cy-11,'APPROVAL','t-xs t-mid','fill:var(--good);font-weight:600')+'</g>';
    if(b>0)s+=`<g transform="rotate(-6 ${cx} ${cy+18})" style="opacity:${f1(b)}"><rect x="${cx-76}" y="${cy+6}" width="152" height="24" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.5"/>`+T(cx,cy+22,'DISCONTINUED 2024','t-xs t-mid','fill:var(--bad);font-weight:600')+'</g>';
    s+=`<path d="M${cx-130} ${cy+80}H${cx+130}" class="axis"/>`;
    [[cx-110,'Nov 2020','panel vote',.05],[cx-40,'Jun 2021','approved',.3],[cx+110,'Jan 2024','ended',.68]].forEach(([x,d,l,at])=>{const o=ramp(u,at,at+.08);
      s+=`<circle cx="${x}" cy="${cy+80}" r="6" style="fill:${o>0?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:1.5"/>`+T(x,cy+98,d,'t-xs t-mid','fill:var(--ink);opacity:'+f1(.3+.7*o))+T(x,cy+111,l,'t-xs t-mid','opacity:'+f1(o))});
  }else{ // lecanemab and donanemab
    s+=`<rect x="${cx-140}" y="${cy-118}" width="54" height="74" rx="10" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.8"/>`+T(cx-113,cy-78,'IV','t-sm t-mid','fill:var(--sky)');
    const P0=[cx-113,cy-44],P1=[cx-100,cy+60],P2=[cx+52,cy+34];
    s+=`<path d="M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" style="fill:none;stroke:var(--sky);stroke-width:2;opacity:.6"/>`;
    for(let j=0;j<6;j++){const k=(j/6+u*2)%1,x=(1-k)*(1-k)*P0[0]+2*(1-k)*k*P1[0]+k*k*P2[0],y=(1-k)*(1-k)*P0[1]+2*(1-k)*k*P1[1]+k*k*P2[1];
      s+=`<path transform="translate(${f1(x)} ${f1(y)})" d="M0 7V0M0 0L-6 -7M0 0L6 -7" style="fill:none;stroke:var(--sky);stroke-width:2.4;stroke-linecap:round"/>`}
    s+=plaque(cx+90,cy+30,38*(1-.55*ease(ramp(u,.2,.9))),12,1)+T(cx+90,cy+96,'plaque','t-xs t-mid','fill:var(--ink)');
    s+=T(cx+150,cy-100,'lecanemab 2023','t-xs t-end','fill:var(--ink);opacity:'+f1(ramp(u,.1,.2)))+T(cx+150,cy-84,'donanemab 2024','t-xs t-end','fill:var(--ink);opacity:'+f1(ramp(u,.5,.6)));
  }
  return s}

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),n=HI_ERAS.length;
  function draw(t){
    const N=vb(svg,'720 420','400 600');
    const L=N?{r0:24,r1:376,ry:26,cx:200,cy:252,yx:20,yy:72,ty:94,lx:20,ly:420}:{r0:30,r1:690,ry:26,cx:208,cy:244,yx:424,yy:104,ty:130,lx:424,ly:158};
    const i=Math.min(n-1,Math.floor(t*n)),u=ramp(t,i/n,(i+1)/n),E=HI_ERAS[i],gap=(L.r1-L.r0)/(n-1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // ribbon
    s+=`<path d="M${L.r0} ${L.ry}H${L.r1}" style="stroke:var(--line);stroke-width:3"/><path d="M${L.r0} ${L.ry}H${f1(L.r0+gap*i)}" style="stroke:var(--sage);stroke-width:3"/>`;
    HI_ERAS.forEach((e,k)=>{const x=L.r0+k*gap,on=k===i;
      s+=`<circle cx="${f1(x)}" cy="${L.ry}" r="${on?7:4.5}" style="fill:${k<=i?'var(--sage)':'var(--panel)'};stroke:${k<=i?'var(--sage)':'var(--line)'};stroke-width:1.5"/>`;
      if(!N)s+=`<text x="${f1(x)}" y="${L.ry+22}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?600:500}">${e.y}</text>`});
    // scene
    s+=`<g style="opacity:${f1(ramp(u,0,.1))}">${hiScene(i,u,L.cx,L.cy)}</g>`;
    // caption
    s+=`<text x="${L.yx}" y="${L.yy}" class="t-big" style="font-size:26px;fill:var(--sage)">${E.y}</text><text x="${L.yx}" y="${L.ty}" class="t-lbl">${E.t}</text>`;
    E.cap.forEach((c,k)=>{s+=`<text x="${L.lx}" y="${L.ly+k*18}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(u,.04+k*.06,.14+k*.06))}">${c}</text>`});
    if(E.flag){const y=L.ly+E.cap.length*18;s+=`<rect x="${L.lx}" y="${y-4}" width="128" height="19" rx="5" style="fill:var(--warn-soft)"/><text x="${L.lx+8}" y="${y+9.5}" class="t-xs" style="fill:var(--warn);font-weight:600">VIA A LATER REVIEW</text>`}
    svg.innerHTML=s;
    setSt(i);
    $('#hiNote').innerHTML=noteHTML({k:E.y+' · '+(i+1)+' of '+n,t:E.t,txt:E.txt+(E.flag?` <span class="tag warn hi-flag">Via a later review</span>${E.flag}`:''),pt:E.pt,hook:E.hook});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,52000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),HI_ERAS,rg,draw,stop);
  draw(+rg.value);
};
