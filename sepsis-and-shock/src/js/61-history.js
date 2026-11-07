/* =============== 6.1 History & people =============== */
/* Main scrubber: a four-lane timeline from antiquity to 2026 (three early stretches compressed), vertical on phones;
   the current milestone shows in a card with a small picture from the kit. Second interactive: Semmelweis's Clinic 1
   before and after chlorine handwashing, as a 100-person icon array (Stang 2022). */
const HS_BK=[[-800,0],[1790,.05],[1950,.27],[1985,.34],[2026.6,1]];
const hsU=y=>{for(let i=1;i<HS_BK.length;i++){const a=HS_BK[i-1],b=HS_BK[i];if(y<=b[0])return a[1]+(Math.max(y,a[0])-a[0])/(b[0]-a[0])*(b[1]-a[1])}return 1};
const hsYr=u=>{for(let i=1;i<HS_BK.length;i++){const a=HS_BK[i-1],b=HS_BK[i];if(u<=b[1])return a[0]+(u-a[1])/(b[1]-a[1])*(b[0]-a[0])}return 2026};
/* lane: 0 germs & hygiene, 1 medicines & trials, 2 definitions & scores, 3 campaigns, data & policy; ic: card picture */
const HS_EV=[
 {y:-500,lab:'Antiquity',l:0,ic:'wd',t:'A word for rot',d:'Greek sēpsis, putrefaction: used by Homer, Hippocrates, Aristotle and Galen.',c:`"Sepsis" comes from the Greek word for putrefaction. Homer used it more than 2,500 years ago, and Hippocrates, Aristotle, Plutarch and Galen used it to mean decay or decomposition. [[Vincent2022Concept]]`},
 {y:1795,l:0,ic:'hd',t:'Childbed fever is carried',d:'Gordon (Aberdeen, 1795) and later Holmes (Boston, 1843) suspect birth attendants spread it.',c:`Alexander Gordon in Aberdeen (1795) and Oliver Wendell Holmes in Boston (1843) suspected that puerperal (childbed) sepsis was carried by birth attendants, before Semmelweis. [[Stang2022Semmelweis]]`},
 {y:1847.4,l:0,ic:'hd',t:'Semmelweis: chlorine handwashing',d:'Vienna, Clinic 1: deaths fall from 18.3% to 2.0% of births.',c:`Ignaz Semmelweis introduced chlorine handwashing in mid-May 1847. Clinic 1 mortality was 18.3% in April–May 1847 and 2.0% (122 of 6,189) from June 1847 to February 1849. [[Stang2022Semmelweis]]`},
 {y:1861,l:0,ic:'bk',t:'Semmelweis publishes',d:'His main work appears late, and his ideas are poorly received in Vienna.',c:`Semmelweis attributed the deaths to "cadaverous particles" from autopsies. He delayed publishing his main work until 1861, and his ideas were poorly received in Vienna. [[Stang2022Semmelweis]]`},
 {y:1867,l:0,ic:'bk',t:'Lister\'s antiseptic principle',d:'"On the Antiseptic Principle in the Practice of Surgery", BMJ.',c:`Joseph Lister published "On the Antiseptic Principle in the Practice of Surgery" in the BMJ in 1867. [[Lister1867BMJ]]`},
 {y:1877,lab:'1870s',l:0,ic:'bug',t:'A named germ in the blood',d:'Pasteur grows Streptococcus pyogenes from a woman with puerperal sepsis.',c:`About 30 years after Semmelweis's work, Louis Pasteur cultured <i>Streptococcus pyogenes</i> from the blood of a woman with puerperal sepsis: germ theory linking a specific microbe to sepsis. [[Stang2022Semmelweis]]`},
 {y:1929,l:1,ic:'rx',t:'Fleming\'s penicillium',d:'A mould that stops bacteria growing, reported in 1929.',c:`Alexander Fleming's report on the antibacterial action of a <i>Penicillium</i> mould was published in 1929 in the British Journal of Experimental Pathology. [[Fleming1929Penicillium]]`},
 {y:1940,l:1,ic:'rx',t:'Penicillin as a medicine',d:'Chain, Florey and colleagues: the antibiotic era begins.',c:`Chain, Florey and colleagues reported "Penicillin as a chemotherapeutic agent" in 1940, opening the antibiotic era. [[Chain1940Penicillin]]`},
 {y:1988.5,lab:'Late 1980s',l:2,ic:'def',t:'"Sepsis syndrome"',d:'Bone: signs of infection plus poor perfusion or one failing organ.',c:`Roger Bone introduced the term "sepsis syndrome" in the late 1980s: clinical signs of infection plus poor perfusion or dysfunction of at least one organ. [[Vincent2022Concept]]`},
 {y:1992,l:2,ic:'def',t:'SIRS and Sepsis-1',d:'ACCP/SCCM consensus (Northbrook 1991, published 1992).',c:`The ACCP/SCCM consensus conference (Northbrook, August 1991; published 1992) defined SIRS, sepsis, severe sepsis, septic shock and multiple organ dysfunction syndrome. [[Bone1992SIRS]] Because most infected patients meet the SIRS criteria, sepsis and infection became confused. [[Vincent2022Concept]]`},
 {y:1996,l:2,ic:'sc',t:'The SOFA score',d:'An ESICM working group scores six organ systems.',c:`The SOFA (Sepsis-related Organ Failure Assessment) score was published in 1996 by an ESICM working group. [[Vincent1996SOFA]]`},
 {y:2001,l:1,ic:'tr',t:'EGDT and PROWESS',d:'Two positive trials: early goal-directed therapy, and drotrecogin alfa.',c:`Rivers' single-centre trial of early goal-directed therapy reported in-hospital mortality of 30.5% vs 46.5% (263 patients). [[Rivers2001EGDT]] PROWESS (1,690 people) reported 28-day mortality of 24.7% with drotrecogin alfa vs 30.8% with placebo. [[Bernard2001PROWESS]]`},
 {y:2002.8,l:3,ic:'cp',t:'The Barcelona Declaration',d:'The Surviving Sepsis Campaign aims for 25% fewer deaths in 5 years.',c:`The Surviving Sepsis Campaign issued its Barcelona Declaration at the ESICM congress in October 2002, a six-point plan aiming to cut the relative mortality of sepsis by 25% over 5 years. [[Slade2003SSC]]`},
 {y:2003.4,l:2,ic:'def',t:'Sepsis-2',d:'More signs listed; no evidence to change the 1992 definitions.',c:`The 2001 International Sepsis Definitions Conference (29 participants, published 2003) expanded the list of signs and symptoms but found no evidence to change the 1992 definitions. [[Levy2003Sepsis2]]`},
 {y:2004,l:3,ic:'cp',t:'First SSC guidelines',d:'Developed by experts from 11 organisations.',c:`The first Surviving Sepsis Campaign guidelines were developed in 2003 by experts from 11 organisations and published in 2004. [[Dellinger2004SSC]]`},
 {y:2005,l:2,ic:'ch',t:'Definitions for children',d:'The paediatric consensus adapts SIRS-based definitions.',c:`The 2005 International Pediatric Sepsis Consensus Conference adapted the adult SIRS-based definitions for children. [[Goldstein2005Paeds]]`},
 {y:2006,l:1,ic:'clk',t:'Every hour counts',d:'Each hour of antibiotic delay in septic shock: about 7.6% lower survival.',c:`In 2006, each hour of delay in effective antimicrobials after hypotension in septic shock was associated with an average 7.6% decrease in survival over the first 6 hours, a retrospective finding that fuelled the time-to-antibiotic emphasis. [[Kumar2006Delay]]`},
 {y:2010,l:3,ic:'cp',t:'Bundles in 165 hospitals',d:'SSC programme: unadjusted mortality 37% → 30.8% over 2 years.',c:`In the Surviving Sepsis Campaign bundle programme (15,022 patients, 165 sites, 2005–2008), unadjusted hospital mortality fell from 37% to 30.8% over 2 years; the adjusted absolute drop was 5.4%. [[Levy2010SSC]]`},
 {y:2011.5,l:1,ic:'tr',t:'Drotrecogin alfa withdrawn',d:'Withdrawn worldwide after PROWESS-SHOCK failed.',c:`Drotrecogin alfa (Xigris) was withdrawn in 2011 after PROWESS-SHOCK failed; it had been approved after a single trial stopped early for efficacy. [[MedLett2011Xigris,Angus2012Drotrecogin]] PROWESS-SHOCK (1,697 people) reported 28-day mortality of 26.4% vs 24.2% with placebo. [[Ranieri2012PROWESSSHOCK]]`},
 {y:2013,l:3,ic:'cp',t:'Rory\'s Regulations',d:'New York hospitals must run sepsis protocols and report data.',c:`Under "Rory's Regulations", New York State hospitals had to implement sepsis protocols and report patient-level data, beginning in 2013. [[Prescott2018NYReporting,Kahn2019NYMandate]] Compared with 4 control states, they were associated with 3.2% lower adjusted absolute mortality than expected. [[Kahn2019NYMandate]]`},
 {y:2015.8,l:3,ic:'cp',t:'SEP-1',d:'US national reporting begins; first mean compliance 48.9%.',c:`CMS's SEP-1 bundle measure began in October 2015, with mean hospital compliance of 48.9% in its first national data. [[Barbash2019SEP1]] In 11 hospitals it raised lactate testing but did not change mortality. [[Barbash2021SEP1]]`},
 {y:2016,l:2,ic:'def',t:'Sepsis-3',d:'Organ dysfunction from a dysregulated host response; qSOFA introduced.',c:`Sepsis-3 defined sepsis as "life-threatening organ dysfunction caused by a dysregulated host response to infection", shown by a SOFA rise of 2 points or more. It dropped "severe sepsis" and introduced qSOFA. [[Singer2016Sepsis3]]`},
 {y:2017.3,l:3,ic:'gl',t:'A World Health Assembly resolution',d:'Sepsis becomes a global health priority. EGDT pooled: no benefit.',c:`The World Health Assembly made sepsis a global health priority in 2017, adopting a resolution on its prevention, diagnosis and management, including survivors' access to rehabilitation. [[Reinhart2017WHA,Cecconi2018Lancet]] The same year, the PRISM meta-analysis of 3,723 patients found no benefit of EGDT over usual care (90-day mortality 24.9% vs 25.4%). [[PRISM2017]]`},
 {y:2020,l:3,ic:'gl',t:'The global count',d:'GBD: 48.9 million cases and 11.0 million deaths in 2017.',c:`The Global Burden of Disease analysis estimated 48.9 million sepsis cases and 11.0 million sepsis-related deaths in 2017, 19.7% of all deaths worldwide. These are population estimates. [[Rudd2020GBD]]`},
 {y:2021,l:3,ic:'cp',t:'SSC 2021 guidelines',d:'Updated adult guidelines, co-published in two journals.',c:`The Surviving Sepsis Campaign guidelines were updated in 2021, co-published in Intensive Care Medicine and Critical Care Medicine. [[Evans2021SSC]] They recommend against qSOFA as a single screening tool. [[Evans2021SSC]]`},
 {y:2023,l:3,ic:'cp',t:'Hospital Sepsis Program Core Elements',d:'CDC: 7 elements, from leadership to education.',c:`In 2023 the CDC released the Hospital Sepsis Program Core Elements: hospital leadership commitment, accountability, multiprofessional expertise, action, tracking, reporting and education. [[Prescott2023CoreElements]]`},
 {y:2024,l:2,ic:'ch',t:'Phoenix criteria',d:'Children: Phoenix Sepsis Score of 2 or more with suspected infection.',c:`The 2024 Phoenix criteria (35 experts, 6 continents, more than 3 million EHR encounters) define paediatric sepsis as a Phoenix Sepsis Score of at least 2 in a child with suspected infection, replacing the 2005 criteria. [[Schlapbach2024Phoenix]] NICE also updated its guidance NG51 in 2024. [[NICE2024NG51]]`},
 {y:2025,l:2,ic:'sc',t:'SOFA-2',d:'Revised thresholds from 3.34 million ICU encounters.',c:`SOFA-2 was developed by modified Delphi plus data from 3.34 million ICU encounters in 9 countries, keeping 6 systems with revised thresholds (AUROC 0.79 vs 0.77 for the original). [[Ranzani2025SOFA2]] Sepsis-3 is still defined with the original SOFA. [[Lobo2025SOFA2]]`},
 {y:2026,l:3,ic:'cp',t:'SSC 2026 guidelines',d:'The adult guidelines updated again.',c:`The Surviving Sepsis Campaign published its 2026 adult guidelines; for example they keep the initial MAP target of 65 mm Hg and add a 60–65 mm Hg range for adults aged 65 or older, as published. [[Prescott2026SSC]]`}];
const HS_LANES=['Germs & hygiene','Medicines & trials','Definitions & scores','Campaigns, data, policy'];
const HS_LN=[['germs &','hygiene'],['drugs &','trials'],['defini-','tions'],['policy &','data']];
const HS_STEPS=[
 {from:0,at:hsU(-500),y0:-500,k:'Antiquity–1846',t:'Rot and childbed fever',
  txt:`The word is ancient: Greek for putrefaction, used by Homer and Hippocrates. [[Vincent2022Concept]] By the 1790s Gordon, and later Holmes, suspected that birth attendants carried childbed fever from woman to woman. [[Stang2022Semmelweis]]`,
  pt:`"Sepsis" first meant rotting. Long before anyone could see germs, some doctors noticed that the illness seemed to travel with the people giving care. [[Vincent2022Concept,Stang2022Semmelweis]]`,
  hook:`Sepsis: from the Greek for putrefaction. [[Vincent2022Concept]]`},
 {from:hsU(1846),at:hsU(1847.5),y0:1847,k:'1847–1870s',t:'Hands, antisepsis, germs',
  txt:`Semmelweis's chlorine handwashing (May 1847) cut Clinic 1 deaths to 2.0%; Lister published the antiseptic principle in 1867; Pasteur then grew <i>Streptococcus pyogenes</i> from a woman with puerperal sepsis. [[Stang2022Semmelweis,Lister1867BMJ]]`,
  pt:`Washing hands between patients saved many mothers' lives. It is still one of the best ways to prevent the infections that lead to sepsis. [[Stang2022Semmelweis]]`,
  hook:`Semmelweis 1847: Clinic 1 puerperal mortality 18.3% → about 2% with chlorine handwashing. [[Stang2022Semmelweis]]`},
 {from:hsU(1920),at:hsU(1929.5),y0:1929,k:'1929–1940',t:'The antibiotic era',
  txt:`Fleming reported a <i>Penicillium</i> mould that stopped bacteria (1929); Chain, Florey and colleagues showed penicillin working as a medicine in 1940. [[Fleming1929Penicillium,Chain1940Penicillin]]`,
  pt:`For the first time there were medicines that could kill the bacteria behind many cases of sepsis. [[Chain1940Penicillin]]`,
  hook:`Penicillin as a chemotherapeutic agent: Chain, Florey et al., 1940. [[Chain1940Penicillin]]`},
 {from:hsU(1985),at:hsU(1988.6),y0:1988.5,k:'1988–1996',t:'Naming it: SIRS and SOFA',
  txt:`Bone's "sepsis syndrome" led to the 1991/1992 consensus that defined SIRS and Sepsis-1. [[Vincent2022Concept,Bone1992SIRS]] SOFA (1996) gave a way to score six failing organ systems. [[Vincent1996SOFA]]`,
  pt:`Doctors agreed on shared words for sepsis so that they could study it and compare results. [[Bone1992SIRS]]`,
  hook:`Sepsis-1 (1992): SIRS = 2 or more of temperature, heart rate, breathing rate, white count. [[Bone1992SIRS]]`},
 {from:hsU(2000.5),at:hsU(2001.1),y0:2001,k:'2001–2015',t:'Faster, bundled, re-tested',
  txt:`EGDT and PROWESS (2001) looked like breakthroughs. [[Rivers2001EGDT,Bernard2001PROWESS]] The Surviving Sepsis Campaign (2002) and its guidelines (2004) pushed bundles of early care, and delays to antibiotics were linked with lower survival. [[Slade2003SSC,Dellinger2004SSC,Kumar2006Delay]] Drotrecogin alfa was withdrawn in 2011 when PROWESS-SHOCK failed. [[MedLett2011Xigris]]`,
  pt:`Some treatments that looked good in one study did not help when tested again in bigger trials. That is why medicine re-checks its findings. [[PRISM2017,Ranieri2012PROWESSSHOCK]]`,
  hook:`Drotrecogin alfa: PROWESS 2001 positive, withdrawn 2011, PROWESS-SHOCK 2012 negative. [[Bernard2001PROWESS,MedLett2011Xigris,Ranieri2012PROWESSSHOCK]]`},
 {from:hsU(2015.9),at:hsU(2016.1),y0:2016,k:'2016–2026',t:'Sepsis-3 and after',
  txt:`Sepsis-3 (2016) centred the definition on organ dysfunction. [[Singer2016Sepsis3]] The World Health Assembly made sepsis a global priority in 2017. [[Reinhart2017WHA]] New guidelines followed (2021, 2026), with the Phoenix criteria for children (2024) and SOFA-2 (2025). [[Evans2021SSC,Prescott2026SSC,Schlapbach2024Phoenix,Ranzani2025SOFA2]]`,
  pt:`Today sepsis is understood as the body's own response to infection harming its organs, and it is treated as a medical emergency worldwide. [[Singer2016Sepsis3,Reinhart2017WHA]]`,
  hook:`Sepsis-3 2016; WHA resolution 2017; Phoenix (children) 2024; SOFA-2 2025. [[Singer2016Sepsis3,Reinhart2017WHA,Schlapbach2024Phoenix,Ranzani2025SOFA2]]`}];
const HS_SEM=[
 {k:'July 1840–Oct 1846',v:11.3,n:'2,117 of 18,793 women',txt:`From July 1840 to October 1846, Clinic 1's puerperal-sepsis mortality ratio was 11.3% (2,117 of 18,793). Clinic 1 was staffed by medical students and doctors, Clinic 2 by midwives. [[Stang2022Semmelweis]]`},
 {k:'April–May 1847',v:18.3,n:'57 of 312 women',txt:`In April–May 1847, just before handwashing began, mortality was 18.3% (57 of 312). [[Stang2022Semmelweis]]`},
 {k:'June 1847',v:12.2,n:'the first month',txt:`In the month after chlorine handwashing began in mid-May 1847, mortality was 12.2%. [[Stang2022Semmelweis]]`},
 {k:'June 1847–Feb 1849',v:2.0,n:'122 of 6,189 women',txt:`From June 1847 to February 1849, mortality was 2.0% (122 of 6,189). [[Stang2022Semmelweis]]`}];

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),now=$('#hiNow'),chips=$('#hiYears');
  const T=(x,y,txt,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L};
  const LC=['var(--pathogen)','var(--rx)','var(--dx)','var(--accent)'];
  const yrTxt=e=>e.lab||String(Math.floor(e.y));
  const doc=(x,y,s,lbl)=>`<rect x="${f1(x-26*s)}" y="${f1(y-30*s)}" width="${f1(44*s)}" height="${f1(56*s)}" rx="4" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(x-16*s)}" y="${f1(y-24*s)}" width="${f1(44*s)}" height="${f1(56*s)}" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/>`+[0,1,2,3].map(i=>`<line x1="${f1(x-8*s)}" x2="${f1(x+20*s)}" y1="${f1(y-12*s+i*10*s)}" y2="${f1(y-12*s+i*10*s)}" style="stroke:var(--muted);stroke-width:1.5"/>`).join('')+T(x,y+46*s,lbl,'t-xs t-mid');
  function pic(e,x,y,s){/* (x,y) centre, s scale ~1 = 120 wide box */
    switch(e.ic){
      case 'wd':return T(x,y+6*s,'σῆψις','t-big t-mid',`font-size:${f1(30*s)}px;fill:var(--brand)`)+T(x,y+30*s,'putrefaction','t-xs t-mid');
      case 'hd':{let g=`<path d="M${f1(x-34*s)} ${f1(y+4*s)}q${f1(34*s)} ${f1(34*s)} ${f1(68*s)} 0z" style="fill:var(--fluid-soft);stroke:var(--fluid);stroke-width:1.6"/>`;
        for(let i=0;i<3;i++)g+=`<path d="M${f1(x-10*s+i*10*s)} ${f1(y-30*s+i*6*s)}q${f1(-4*s)} ${f1(6*s)} 0 ${f1(9*s)}q${f1(4*s)} ${f1(-3*s)} 0 ${f1(-9*s)}z" style="fill:var(--fluid)"/>`;
        g+=bacterium(x-30*s,y-20*s,16*s,{op:e.y<1800?.9:.3,ang:20})+bacterium(x+30*s,y-14*s,14*s,{op:e.y<1800?.9:.25,ang:-30,kind:'chain'});
        return g+T(x,y+44*s,e.y<1800?'carried on hands':'chlorine wash','t-xs t-mid')}
      case 'bk':return doc(x,y,s,e.y<1865?'1861':'antisepsis');
      case 'bug':return bacterium(x-20*s,y-10*s,34*s,{kind:'chain',ang:-15})+bacterium(x+18*s,y+8*s,30*s,{kind:'chain',ang:25})+T(x,y+44*s,'streptococci','t-xs t-mid');
      case 'rx':return (e.y<1935?`<circle cx="${f1(x)}" cy="${f1(y-4*s)}" r="${f1(30*s)}" style="fill:var(--panel);stroke:var(--muted)"/><circle cx="${f1(x-4*s)}" cy="${f1(y-6*s)}" r="${f1(10*s)}" style="fill:var(--rx-soft);stroke:var(--rx)"/>`+bacterium(x+18*s,y+10*s,12*s,{op:.35})+bacterium(x+14*s,y-22*s,12*s,{op:.35,ang:60}):pill(x-14*s,y-6*s,40*s,{ang:-24,col:'var(--rx)'})+pill(x+20*s,y+10*s,26*s,{round:true,col:'var(--rx)'}))+T(x,y+44*s,e.y<1935?'mould':'penicillin','t-xs t-mid');
      case 'def':return neutrophil(x-10*s,y-4*s,30*s,{act:.6})+cytokines(x-10*s,y-4*s,34*s,{v:.9,n:12})+organ('kidney',x+30*s,y-2*s,26*s,{fail:e.y>2010?.6:.2})+T(x,y+44*s,e.y>2010?'host response':'inflammation','t-xs t-mid');
      case 'sc':return gauge(x,y+18*s,38*s,e.y<2000?2:3,4,{ticks:false,label:e.y<2000?'SOFA':'SOFA-2'});
      case 'tr':{const B=e.y<2005?[30.5,46.5]:[26.4,24.2];return B.map((v,i)=>`<rect x="${f1(x-26*s+i*30*s)}" y="${f1(y+28*s-v*1.1*s)}" width="${f1(22*s)}" height="${f1(v*1.1*s)}" rx="3" style="fill:${i?'var(--muted)':'var(--rx)'}"/>`).join('')+`<line x1="${f1(x-34*s)}" x2="${f1(x+34*s)}" y1="${f1(y+28*s)}" y2="${f1(y+28*s)}" class="axis"/>`+T(x,y+44*s,e.y<2005?'trial vs control':'re-tested','t-xs t-mid')}
      case 'clk':return clock(x,y-2*s,30*s,60,{label:''})+T(x,y+44*s,'first hours','t-xs t-mid');
      case 'ch':return person(x-18*s,y-28*s,54*s,'var(--dx)')+person(x+18*s,y-12*s,38*s,'var(--rec)')+T(x,y+44*s,'children','t-xs t-mid');
      case 'gl':{let g=`<circle cx="${f1(x)}" cy="${f1(y-4*s)}" r="${f1(30*s)}" style="fill:var(--fluid-soft);stroke:var(--dx);stroke-width:1.6"/><ellipse cx="${f1(x)}" cy="${f1(y-4*s)}" rx="${f1(12*s)}" ry="${f1(30*s)}" style="fill:none;stroke:var(--dx)"/><line x1="${f1(x-30*s)}" x2="${f1(x+30*s)}" y1="${f1(y-4*s)}" y2="${f1(y-4*s)}" style="stroke:var(--dx)"/>`;return g+T(x,y+44*s,'worldwide','t-xs t-mid')}
      default:return doc(x,y,s,'consensus')}}
  const curIdx=t=>{let k=0;HS_EV.forEach((e,i)=>{if(hsU(e.y)<=t+1e-6)k=i});return k};
  const NS=HS_STEPS.length;
  let setActive=()=>{},lastK=-1;
  function draw(t){const N=vb(svg,'720 380','400 580'),p=phaseOf(HS_STEPS,t),P=HS_STEPS[p],k=curIdx(t),E=HS_EV[k],yr=hsYr(t);
    let s=T(N?20:28,26,P.t,'t-big','font-size:19px')+T(N?20:28,44,P.k,'t-sm');
    const C=N?{x:16,y:56,w:368,h:176}:{x:28,y:58,w:664,h:148};
    const fresh=clamp((t-hsU(E.y))/.012);
    s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="12" style="fill:var(--field);stroke:${LC[E.l]};stroke-width:${f1(1+1.2*(1-fresh))}"/>`;
    s+=`<rect x="${C.x}" y="${C.y}" width="6" height="${C.h}" rx="3" style="fill:${LC[E.l]}"/>`;
    s+=`<g>`+pic(E,N?C.x+C.w-62:C.x+84,C.y+C.h/2-(N?16:6),N?.8:1)+'</g>';
    const tx=N?C.x+20:C.x+176,lab=yrTxt(E),long=lab.length>5;
    s+=`<text x="${tx}" y="${C.y+(N?36:40)}" class="t-big" style="font-size:${N?(long?22:28):(long?22:32)}px;fill:${LC[E.l]}">${lab}</text>`;
    const tl=wrap(E.t,N?24:44);
    tl.forEach((l,i)=>{s+=T(tx+(N?0:(long?150:96)),C.y+(N?58:34)+i*(N?15:17),l,'t-lbl',N?'':'font-size:15px')});
    const dy=N?58+tl.length*15:Math.max(54,34+tl.length*17);
    s+=T(tx+(N?0:(long?150:96)),C.y+dy+(N?2:0),HS_LANES[E.l],'t-xs');
    wrap(E.d,N?34:62).forEach((l,i)=>{s+=T(tx,C.y+(N?dy+24:86)+i*16,l,'t-sm','fill:var(--ink)')});
    if(N){/* vertical timeline */
      const Y0=270,Y1=566,X0=66,Y=u=>Y0+(Y1-Y0)*u,LX=[118,184,250,316];
      HS_STEPS.forEach((q,i)=>{const b=i<NS-1?Y(HS_STEPS[i+1].from):Y1;s+=`<rect x="${X0}" y="${f1(Y(q.from))}" width="${384-X0}" height="${f1(b-Y(q.from))}" style="fill:${i%2?'var(--panel-2)':'var(--field)'};opacity:.6"/>`});
      s+=`<line x1="${X0}" x2="${X0}" y1="${Y0}" y2="${Y1}" class="axis"/>`;
      [[1790,'1790'],[1900,'1900'],[1950,'1950'],[1990,'1990'],[2000,'2000'],[2010,'2010'],[2020,'2020']].forEach(([v,l])=>{const yy=Y(hsU(v));s+=`<line x1="${X0-4}" x2="${X0}" y1="${f1(yy)}" y2="${f1(yy)}" class="axis"/>`+T(X0-7,yy+3,l,'t-xs t-end')});
      s+=T(X0-7,Y(.02)+3,'BC','t-xs t-end');
      HS_LN.forEach((l,i)=>{l.forEach((w,j)=>{s+=T(LX[i],Y0-14+j*10-(l.length-1)*10,w,'t-xs t-mid',`fill:${LC[i]}`)});s+=`<line x1="${LX[i]}" x2="${LX[i]}" y1="${Y0}" y2="${Y1}" style="stroke:${LC[i]};stroke-width:1;opacity:.25"/>`});
      HS_EV.forEach((e,i)=>{const yy=Y(hsU(e.y)),on=hsU(e.y)<=t+1e-6,c=i===k;s+=`<circle cx="${LX[e.l]}" cy="${f1(yy)}" r="${c?6.5:4}" style="fill:${on?LC[e.l]:'var(--panel)'};stroke:${LC[e.l]};stroke-width:1.6"/>`;
        if(c)s+=`<circle cx="${LX[e.l]}" cy="${f1(yy)}" r="11" style="fill:none;stroke:${LC[e.l]};stroke-width:1.4;opacity:.6"/>`});
      const py=Y(t),yl=yr<0?'BC':Math.round(yr);s+=`<line x1="${X0}" x2="384" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/><rect x="${X0+276}" y="${f1(py-9)}" width="40" height="16" rx="8" style="fill:var(--ink)"/>`+T(X0+296,py+3,yl,'t-xs t-mid','fill:var(--bg);font-weight:700')}
    else{/* horizontal timeline in four lanes */
      const X0=172,X1=704,X=u=>X0+(X1-X0)*u,LY=[290,312,334,356],AY=258;
      HS_STEPS.forEach((q,i)=>{const b=i<NS-1?X(HS_STEPS[i+1].from):X1;s+=`<rect x="${f1(X(q.from))}" y="226" width="${f1(b-X(q.from))}" height="20" style="fill:${i%2?'var(--panel-2)':'var(--brand-soft)'};opacity:.8"/>`;
        if(b-X(q.from)>70)s+=T((X(q.from)+b)/2,240,q.k,'t-xs t-mid','fill:var(--ink)')});
      s+=`<line x1="${X0}" x2="${X1}" y1="${AY}" y2="${AY}" class="axis"/>`;
      [[1790,'1790'],[1850,'1850'],[1900,'1900'],[1950,'1950'],[1990,'1990'],[2000,'2000'],[2010,'2010'],[2020,'2020']].forEach(([v,l])=>{const xx=X(hsU(v));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${AY-3}" y2="${AY+3}" class="axis"/>`+T(xx,AY+14,l,'t-xs t-mid')});
      s+=T(X0+2,AY+14,'BC','t-xs');
      HS_LANES.forEach((l,i)=>{s+=T(X0-10,LY[i]+3,l,'t-xs t-end',`fill:${LC[i]}`)+`<line x1="${X0}" x2="${X1}" y1="${LY[i]}" y2="${LY[i]}" style="stroke:${LC[i]};stroke-width:1;opacity:.25"/>`});
      HS_EV.forEach((e,i)=>{const xx=X(hsU(e.y)),on=hsU(e.y)<=t+1e-6,c=i===k;s+=`<circle cx="${f1(xx)}" cy="${LY[e.l]}" r="${c?6.5:4}" style="fill:${on?LC[e.l]:'var(--panel)'};stroke:${LC[e.l]};stroke-width:1.6"/>`;
        if(c)s+=`<circle cx="${f1(xx)}" cy="${LY[e.l]}" r="11" style="fill:none;stroke:${LC[e.l]};stroke-width:1.4;opacity:.6"/>`});
      const px=X(t),yl=yr<0?'BC':Math.round(yr);s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="222" y2="366" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/><rect x="${f1(clamp(px-20,X0-20,X1-20))}" y="206" width="40" height="16" rx="8" style="fill:var(--ink)"/>`+T(clamp(px,X0,X1),218,yl,'t-xs t-mid','fill:var(--bg);font-weight:700')}
    svg.innerHTML=s;
    note.innerHTML=noteHTML(P);setActive(p);
    if(k!==lastK){lastK=k;now.innerHTML=`<b>${yrTxt(E)}</b>${E.c}`;$$('[data-hy]',chips).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hy===k))}
    rg.setAttribute('aria-valuetext',`${yrTxt(E)}: ${E.t}`)}
  const stop=playWire(rg,$('#hiPlay'),draw,36000,'%t:player.replay%','history');
  setActive=stepWire($('#hiSteps'),HS_STEPS,rg,draw,stop);
  chips.innerHTML=HS_EV.map((e,i)=>`<button class="tag" data-hy="${i}" aria-pressed="false">${yrTxt(e)} · ${e.t}</button>`).join('');
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=Math.min(1,hsU(HS_EV[+b.dataset.hy].y)+.0005);rg.value=v;draw(v)});
  draw(+rg.value);

  /* Semmelweis: Clinic 1 deaths per 100 births */
  const ss=$('#hiSem'),sn=$('#hiSemNote');let sk=0,cur=HS_SEM[0].v,stopS=null;
  function drawS(v){const N=vb(ss,'720 300','400 470');let s='';
    const A=N?{x:24,y:40,d:20,s:16}:{x:30,y:44,d:22,s:18},n=Math.round(v);
    s+=T(A.x,A.y-16,`Clinic 1 · ${HS_SEM[sk].k}`,'t-lbl');
    for(let i=0;i<100;i++){const px=A.x+(i%10)*A.d+A.d/2,py=A.y+Math.floor(i/10)*A.d;s+=person(px,py,A.s,i<n?'var(--bad)':'var(--panel-2)')}
    const bx=N?A.x+10*A.d+18:A.x+10*A.d+30,by=A.y+40;
    s+=`<text x="${f1(bx)}" y="${f1(by)}" class="t-big" style="font-size:${N?30:36}px;fill:var(--bad)">${f1(v)}</text>`+T(bx,by+20,'deaths per 100','t-xs')+T(bx,by+36,'women giving birth','t-xs')+(N?'':T(bx,by+56,HS_SEM[sk].n,'t-xs','fill:var(--ink)'));
    /* comparison bars */
    const G=N?{x:24,y:290,w:352,h:150}:{x:430,y:110,w:270,h:170},bw=G.w/4,mx=20;
    s+=T(G.x,G.y-8,'All four periods','t-xs');
    HS_SEM.forEach((q,i)=>{const h=q.v/mx*(G.h-40),x=G.x+i*bw+bw*.18,on=i===sk;
      s+=`<rect x="${f1(x)}" y="${f1(G.y+G.h-30-h)}" width="${f1(bw*.64)}" height="${f1(h)}" rx="3" style="fill:${i===3?'var(--good)':'var(--bad)'};opacity:${on?1:.45}"/>`+T(x+bw*.32,G.y+G.h-34-h,f1(q.v)+'%','t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')+T(x+bw*.32,G.y+G.h-16,['1840–46','Apr–May 47','Jun 47','Jun 47–49'][i],'t-xs t-mid')});
    s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h-30}" y2="${G.y+G.h-30}" class="axis"/>`;
    const hx=G.x+bw*1.82;s+=`<line x1="${f1(hx+bw*.18)}" x2="${f1(hx+bw*.18)}" y1="${G.y+4}" y2="${G.y+G.h-30}" style="stroke:var(--fluid);stroke-width:1.6;stroke-dasharray:4 3"/>`+T(hx+bw*.18+4,G.y+12,'handwashing','t-xs','fill:var(--fluid)');
    ss.innerHTML=s}
  function setS(k){sk=k;$$('[data-hs]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.hs===k));if(stopS)stopS();
    const a=cur,B=HS_SEM[k].v;stopS=animate(700,q=>{cur=lerp(a,B,ease(q));drawS(cur)},()=>{stopS=null});
    sn.innerHTML=noteHTML({k:'Stang 2022 · Vienna, Clinic 1',t:HS_SEM[k].k,txt:HS_SEM[k].txt,
      pt:k===3?'After everyone washed their hands in chlorine, far fewer mothers died. Clean hands still prevent many infections today.':'Before handwashing, many women in this clinic died of infection after giving birth. These are historical figures from one hospital.',
      hook:'Semmelweis (May 1847): chlorine handwashing, Clinic 1 puerperal mortality 18.3% → 2.0%. [[Stang2022Semmelweis]]'})}
  $$('[data-hs]').forEach(b=>b.addEventListener('click',()=>setS(+b.dataset.hs)));
  drawS(cur);setS(0);
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();drawS(cur)};
  const prevH=onHide.history;onHide.history=()=>{prevH&&prevH();if(stopS){stopS();stopS=null}};
};
