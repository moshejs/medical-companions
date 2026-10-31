/* =============== 3.4 Treating drug-resistant TB =============== */
/* a small syringe glyph (injectable), centred on x,y */
function mrSyringe(x,y,s=10,op=1){return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(-35)" style="opacity:${f1(op)}"><rect x="${f1(-s*.55)}" y="${f1(-s*.17)}" width="${f1(s*.8)}" height="${f1(s*.34)}" rx="1.5" style="fill:var(--panel);stroke:var(--bad);stroke-width:1"/><line x1="${f1(s*.25)}" x2="${f1(s*.7)}" y1="0" y2="0" style="stroke:var(--bad);stroke-width:1"/><line x1="${f1(-s*.55)}" x2="${f1(-s*.75)}" y1="0" y2="0" style="stroke:var(--bad);stroke-width:1.6"/></g>`}
/* an ear glyph for the hearing-loss icon array */
function mrEar(x,y,s,on){const c=on?'var(--bad)':'var(--line)';return `<path d="M${f1(x-s*.25)} ${f1(y+s*.1)}C${f1(x-s*.3)} ${f1(y-s*.45)} ${f1(x+s*.35)} ${f1(y-s*.5)} ${f1(x+s*.3)} ${f1(y)}C${f1(x+s*.28)} ${f1(y+s*.25)} ${f1(x+s*.05)} ${f1(y+s*.25)} ${f1(x)} ${f1(y+s*.45)}" style="fill:none;stroke:${c};stroke-width:${on?1.8:1.2};stroke-linecap:round"/>`}
const MR_STEPS=[
 {from:0,at:.1,k:'Before 2016 · 18–24 months',t:'The long injectable era',
  txt:`Treatment for MDR-TB used to take about two years, with daily injections that could damage hearing [[Dillard2021,WHO-Mod4-2025]]. In an individual-patient meta-analysis of 12 030 people from 25 countries (studies 2009–2016), 61% had treatment success, 8% failure or relapse and 14% died. Kanamycin and capreomycin were linked to worse outcomes; linezolid, the later-generation fluoroquinolones and bedaquiline to better ones [[Ahmad2018Lancet]]. In 18 studies, aminoglycoside hearing loss affected a pooled 40.62% of people treated for DR-TB: 49.65% with kanamycin, 38.93% with amikacin and 10.21% with capreomycin [[Dillard2021]].`,
  pt:`Two years of treatment and daily injections, and about 4 in 10 people lost some hearing.`,
  hook:`Aminoglycoside hearing loss ≈ 40% (kanamycin 50%, amikacin 39%) [[Dillard2021]]. Global MDR/RR-TB success was only 50% in the 2012 cohort [[WHO-GTR2025]].`},
 {from:.2,at:.27,k:'STREAM stage 1 · 9–11 months',t:'Shorter, still with an injectable',
  txt:`A Bangladesh regimen of at least 9 months gave 87.9% relapse-free cure in 206 people [[VanDeun2010]]. STREAM stage 1 then randomised 424 people: favourable status at 132 weeks was 78.8% on the 9–11-month regimen and 79.8% on the 20-month 2011 WHO regimen, meeting noninferiority. QTcF prolongation to 500 ms occurred in 11.0% against 6.4% [[Nunn2019]].`,
  pt:`Half the time with similar results, but the injection was still part of it.`,
  hook:`STREAM 1: 9–11 months noninferior to 20 months (78.8% vs 79.8% favourable) [[Nunn2019]].`},
 {from:.36,at:.43,k:'STREAM stage 2 and endTB · 9 months',t:'All-oral 9-month regimens',
  txt:`Bedaquiline cut median time to culture conversion from 125 to 83 days in C208 [[Diacon2014]]. In STREAM stage 2, a 9-month all-oral bedaquiline regimen gave 83% favourable outcomes against 71% on the 9-month injectable control, and grade 3–4 hearing loss fell from 9% to 2% [[Goodall2022]]. In endTB (754 people, fluoroquinolone-susceptible), standard therapy gave 80.7% favourable outcomes and the best 9-month regimens added 8–10 points [[Guglielmetti2025NEJM]]. WHO suggests BLMZ, BLLfxCZ and BDLLfxZ, in that order, when fluoroquinolone resistance has been excluded [[WHO-Mod4-2025]].`,
  pt:`Tablets only, for 9 months, and far less hearing damage.`,
  hook:`STREAM 2: oral bedaquiline regimen 83% vs injectable 71% favourable; grade 3–4 hearing loss 2% vs 9% [[Goodall2022]].`},
 {from:.52,at:.62,k:'Nix-TB, ZeNix, TB-PRACTECAL · 6 months',t:'BPaLM and BPaL',
  txt:`Bedaquiline, pretomanid and linezolid (BPaL), with moxifloxacin added for fluoroquinolone-susceptible TB (BPaLM), for 26 weeks. In TB-PRACTECAL, unfavourable outcomes at 72 weeks were 11% with BPaLM against 48% with 9–20-month standard care, and grade 3 or higher or serious adverse events 19% against 59% [[Nyangwa2022]]. Nix-TB gave 90% favourable outcomes with linezolid 1200 mg, but peripheral neuropathy in 81% [[Conradie2020]]; ZeNix showed that 600 mg for 26 weeks kept 91% favourable outcomes with neuropathy in 24% and myelosuppression in 2% [[Conradie2022]]. WHO suggests BPaLM rather than 9-month or longer regimens (conditional, very low certainty); ATS/CDC/ERS/IDSA recommend it (strong, very low certainty) [[WHO-Mod4-2025,Saukkonen2025]].`,
  pt:`Four medicines by mouth for 6 months cured about nine in ten people in the trials.`,
  hook:`BPaLM = bedaquiline, pretomanid, linezolid 600 mg, moxifloxacin, 6 months, age 14 and over [[WHO-Mod4-2025]].`},
 {from:.76,at:.9,k:'2024 · where things stand',t:'Better regimens, slow uptake',
  txt:`By 2024, 6-month regimens were used in 97 countries (41 at the end of 2022), and 34 256 people started one, against 1744 in 2022. Even so, 54% of people with MDR/RR-TB were still on 18–20-month regimens, 21% on 9-month and 21% on 6-month regimens [[WHO-GTR2025]]. Global MDR/RR-TB treatment success rose from 50% (2012 cohort) to 71% (2022 cohort), against 88% for drug-susceptible TB [[WHO-GTR2025]]. WHO 2025 also suggests a 6-month BDLLfxC regimen for all ages, including children and pregnant or breastfeeding people, based on BEAT Tuberculosis (86.1% vs 86.0% success) [[WHO-Mod4-2025,Conradie2026]].`,
  pt:`Short all-oral treatment exists, but most people in the world are not yet getting it.`,
  hook:`2024: only 21% of people with MDR/RR-TB were on 6-month regimens; 54% were still on 18–20-month ones [[WHO-GTR2025]].`}];

inits.drtb=()=>{
  const svg=$('#mrSvg'),rg=$('#mrT');let fq='s',age='a',setSt=()=>{};
  function draw(t){const N=vb(svg,'720 362','400 640'),ph=phaseOf(MR_STEPS,t);
    const L=N?{x0:20,x1:380,ax:84,r0:104,rh:40,oX0:20,oX1:380,oY0:356,oY1:470,iX:24,iY:516,is:15}
             :{x0:24,x1:430,ax:76,r0:96,rh:44,oX0:478,oX1:700,oY0:74,oY1:206,iX:478,iY:272,is:9};
    const lw=N?0:150,bx0=L.x0+lw,mo=m=>lerp(bx0,L.x1,m/24);
    let s=`<text x="${L.x0}" y="24" class="t-big">${MR_STEPS[ph].t}</text><text x="${L.x0}" y="42" class="t-sm">${MR_STEPS[ph].k}</text>`;
    /* month axis */
    s+=`<text x="${L.x0}" y="${L.ax-12}" class="t-sm">DURATION</text>`;
    [0,6,9,12,18,24].forEach(m=>s+=`<line x1="${f1(mo(m))}" x2="${f1(mo(m))}" y1="${L.ax}" y2="${L.r0+L.rh*5-14}" class="${m?'grid':'axis'}"/><text x="${f1(mo(m))}" y="${L.ax-2}" class="t-xs t-mid">${m}</text>`);
    s+=`<text x="${L.x1}" y="${L.r0+L.rh*5-2}" class="t-xs t-end">months</text>`;
    const child=age==='c',fr=fq==='r';
    const ROWS=[
      {n:'Long injectable',sub:'18–20 (up to 24) months',m:20,m2:24,from:0,inj:true,chips:'injectable-based'},
      {n:'STREAM 1',sub:'9–11 months, injectable',m:9,m2:11,from:.2,inj:true,chips:'',na:fr?'needs FQ susceptibility':''},
      {n:'9-month all-oral',sub:'e.g. BLMZ',m:9,from:.36,chips:'B L M Z',na:fr?'only if FQ resistance excluded':''},
      {n:fr?'BPaL':'BPaLM',sub:fr?'FQ-resistant TB':'FQ-susceptible TB',m:6,from:.52,chips:fr?'B Pa L':'B Pa L M',na:child?'from age 14 only':''},
      {n:'BDLLfxC',sub:'WHO 2025 · all ages',m:6,from:.76,chips:'B D L Lfx C'}];
    ROWS.forEach((R,i)=>{const y=L.r0+i*L.rh,k=ramp(t,R.from,R.from+.08);if(k<=0)return;
      const cur=(ph===0&&i===0)||(ph===1&&i===1)||(ph===2&&i===2)||(ph===3&&i===3)||(ph===4&&i>=3&&(i===4||!child));
      const col=R.inj?'var(--bad)':i===4?'var(--vax)':'var(--rx)',op=R.na?.35:1;
      s+=`<g style="opacity:${f1(op*k)}">`;
      const by=N?y+14:y;
      if(N)s+=`<text x="${L.x0}" y="${y+8}" class="t-lbl" style="${cur?'':'fill:var(--muted)'}">${R.n}</text><text x="${f1(L.x0+R.n.length*8+8)}" y="${y+8}" class="t-xs" style="${R.na?'fill:var(--warn)':''}">${R.na||R.sub}</text>`;
      else s+=`<text x="${L.x0}" y="${y+12}" class="t-lbl" style="${cur?'':'fill:var(--muted)'}">${R.n}</text><text x="${L.x0}" y="${y+25}" class="t-xs">${R.sub}</text>`;
      if(R.m2)s+=`<rect x="${f1(bx0)}" y="${by+2}" width="${f1((mo(R.m2)-bx0)*k)}" height="18" rx="5" style="fill:${col};opacity:.18"/>`;
      s+=`<rect x="${f1(bx0)}" y="${by+2}" width="${f1((mo(R.m)-bx0)*k)}" height="18" rx="5" style="fill:${col};fill-opacity:${cur?.85:.45};stroke:${cur?'var(--ink)':'none'};stroke-width:1.2"/>`;
      if(R.inj){const n=R.m>12?7:3;for(let j=0;j<n;j++)s+=mrSyringe(mo(.6+j*(R.m>12?.9:.85)),by+11,10,k)}
      else if(R.chips&&k>.9)s+=`<text x="${f1(mo(R.m)+6)}" y="${by+15}" class="t-xs" style="fill:var(--ink)">${R.chips}</text>`;
      if(R.inj&&k>.9&&!R.na&&!N)s+=`<text x="${f1(bx0+4)}" y="${y+33}" class="t-xs" style="fill:var(--bad)">daily injections</text>`;
      s+=`</g>`;
      if(R.na&&k>.5&&!N)s+=`<text x="${f1(bx0+4)}" y="${y+34}" class="t-xs" style="fill:var(--warn)">${R.na}</text>`});
    /* outcomes */
    const O=[
      {h:'TREATMENT SUCCESS',bars:[ ['IPD 2009–16',61,'var(--bad)'],['global, 2012 cohort',50,'var(--muted)']],note:'legacy regimens'},
      {h:'FAVOURABLE AT 132 WK',bars:[ ['9–11 mo',78.8,'var(--warn)'],['20 mo',79.8,'var(--muted)']],note:'STREAM stage 1'},
      {h:'FAVOURABLE AT 76 WK',bars:[ ['oral 9 mo',83,'var(--rx)'],['injectable 9 mo',71,'var(--muted)']],note:'STREAM stage 2'},
      fr?{h:'FAVOURABLE OUTCOME',bars:[ ['Nix-TB',90,'var(--rx)'],['ZeNix 600 mg',91,'var(--rx)']],note:'BPaL, single-arm / dose arms'}
        :{h:'TREATMENT SUCCESS',bars:[ ['BPaLM',89,'var(--rx)'],['standard care',52,'var(--muted)']],note:'TB-PRACTECAL (WHO summary)'},
      child?{h:'SUCCESS, CHILDREN',bars:[ ['BEAT 6 mo (age ≥6)',86.1,'var(--vax)'],['IPD children',72,'var(--muted)']],note:'BEAT · MDR/RR-TB in children'}
        :{h:'GLOBAL SUCCESS',bars:[ ['2012',50,'var(--muted)'],['2020',64,'var(--warn)'],['2022',71,'var(--rx)']],note:'MDR/RR-TB cohorts (WHO)'}][ph];
    const kO=ramp(t,MR_STEPS[ph].from,MR_STEPS[ph].from+.07);
    s+=`<text x="${L.oX0}" y="${L.oY0-14}" class="t-sm">${O.h}</text>`;
    const nb=O.bars.length,bw=Math.min(54,(L.oX1-L.oX0-20)/nb-18),V=v=>lerp(L.oY1,L.oY0+6,v/100);
    [0,50,100].forEach(v=>s+=`<line x1="${L.oX0}" x2="${L.oX1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/>`);
    O.bars.forEach(([lab,v,c],i)=>{const cx=L.oX0+20+(i+.5)*(L.oX1-L.oX0-20)/nb,vv=v*kO;
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(V(vv))}" width="${f1(bw)}" height="${f1(L.oY1-V(vv))}" rx="4" style="fill:${c}"/><text x="${f1(cx)}" y="${f1(V(vv)-5)}" class="t-lbl t-mid">${kO>.98?(v%1?v.toFixed(1):v)+'%':''}</text><text x="${f1(cx)}" y="${L.oY1+13}" class="t-xs t-mid">${lab}</text>`});
    s+=`<text x="${L.oX1}" y="${L.oY1+27}" class="t-xs t-end" style="fill:var(--warn)">${O.note}</text>`;
    /* harms icon array */
    const H=[{h:'HEARING LOSS · aminoglycosides',n:41,lab:'40.62% pooled · 1 mark = 1%',ear:1},
      {h:'GRADE 3–4 HEARING LOSS',n:9,lab:'9-month injectable arm, STREAM 2',ear:1},
      {h:'GRADE 3–4 HEARING LOSS',n:2,lab:'9-month oral arm, STREAM 2',ear:1},
      {h:'LINEZOLID NEUROPATHY',n:24,lab:'ZeNix 600 mg × 26 wk (Nix-TB 1200 mg: 81%)',ear:0},
      {h:'REGIMEN IN USE, 2024',n:54,lab:'54 long · 21 nine-month · 21 six-month',ear:2}][ph];
    s+=`<text x="${L.iX}" y="${L.iY-10}" class="t-sm">${H.h}</text>`;
    for(let j=0;j<100;j++){const cx=L.iX+(j%20)*(L.is+(N?3:2.1))+L.is/2,cy=L.iY+Math.floor(j/20)*(L.is+4)+L.is/2,on=j<H.n*kO;
      if(H.ear===1)s+=mrEar(cx,cy,L.is,on);
      else if(H.ear===0)s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(L.is*.36)}" style="fill:${on?'var(--warn)':'none'};stroke:${on?'var(--warn)':'var(--line)'};stroke-width:1.2"/>`;
      else{const c=j<54?'var(--bad)':j<75?'var(--warn)':j<96?'var(--rx)':'var(--line)';s+=`<rect x="${f1(cx-L.is*.38)}" y="${f1(cy-L.is*.38)}" width="${f1(L.is*.76)}" height="${f1(L.is*.76)}" rx="2" style="fill:${j<100*kO?c:'none'};stroke:${c};stroke-width:1"/>`}}
    s+=`<text x="${L.iX}" y="${L.iY+5*(L.is+4)+12}" class="t-xs">${H.lab}</text>`;
    svg.innerHTML=s;setSt(ph);
    $('#mrNote').innerHTML=noteHTML(MR_STEPS[ph]);
    $('#mrCap').innerHTML=(fr?`<b>Fluoroquinolone-resistant (pre-XDR):</b> 9-month regimens and moxifloxacin need fluoroquinolone susceptibility, so BPaL replaces BPaLM. ATS/CDC/ERS/IDSA recommend 6-month BPaL when there is fluoroquinolone resistance or intolerance and less than 1 month of prior bedaquiline and linezolid exposure [[Saukkonen2025]]. endTB-Q's shortened BDLC strategy did not show overall noninferiority (87% vs 89%), and its authors suggest fluoroquinolone-resistant TB may need longer, reinforced regimens <span class="ev early">Early evidence</span> [[Guglielmetti2025LRM]].`
      :`<b>Fluoroquinolone-susceptible:</b> BPaLM, or one of the 9-month all-oral regimens, as WHO 2025 suggests [[WHO-Mod4-2025]].`)+' '+
      (child?`<b>Children:</b> WHO's BPaLM/BPaL eligibility starts at age 14 [[WHO-Mod4-2025]]. BDLLfxC covers all ages; BEAT Tuberculosis enrolled people aged 6 and older [[WHO-Mod4-2025,Conradie2026]]. The bedaquiline label covers children aged 2 and older weighing at least 8 kg [[FDA-Sirturo]]. In 23 369 children and adolescents with MDR/RR-TB (mostly older regimens), 72.0% were treated successfully; two or three Group A drugs were linked to better success [[GarciaPrats2025]].`
      :`<b>Adults:</b> BPaLM/BPaL apply from age 14, with or without HIV, for pulmonary TB and most extrapulmonary TB (not CNS, osteoarticular or disseminated disease), with less than 1 month of prior bedaquiline, linezolid, pretomanid or delamanid. They do not apply in pregnancy or breastfeeding [[WHO-Mod4-2025]].`);
  }
  const stop=playWire(rg,$('#mrPlay'),draw,24000,'Replay','drtb');
  setSt=stepWire($('#mrSteps'),MR_STEPS,rg,draw,stop);
  $$('[data-fq]').forEach(b=>b.addEventListener('click',()=>{fq=b.dataset.fq;$$('[data-fq]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-age]').forEach(b=>b.addEventListener('click',()=>{age=b.dataset.age;$$('[data-age]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- trial comparator ---- */
  const fs=$('#mrForest'),pick=$('#mrPick');let view='rate';
  /* rate view: unfavourable outcome %, with a CI where the trial published one. calc: derived here as 100 − favourable */
  const TR=[
    {id:'nix',g:'Nix-TB (BPaL, 2020)',rows:[{l:'BPaL, linezolid 1200 mg',v:10,lo:5,hi:17,c:'var(--rx)',calc:1}],
     d:{v:null},txt:`Single-arm study of 109 people with XDR-TB (old definition) or treatment-intolerant or non-responsive MDR-TB. 90% (95% CI 83–95) had a favourable outcome 6 months after 26 weeks of treatment; the 11 unfavourable outcomes were 7 deaths, 1 withdrawal, 2 relapses and 1 loss to follow-up. Peripheral neuropathy 81%, myelosuppression 48% [[Conradie2020]].`},
    {id:'zenix',g:'ZeNix (BPaL linezolid arms, 2022)',rows:[{l:'1200 mg × 26 wk',v:7,c:'var(--rx)',calc:1},{l:'1200 mg × 9 wk',v:11,c:'var(--rx)',calc:1},{l:'600 mg × 26 wk',v:9,c:'var(--rx)',calc:1,best:1},{l:'600 mg × 9 wk',v:16,c:'var(--rx)',calc:1}],
     d:{v:null},txt:`181 people, 88% with XDR or pre-XDR-TB (old definitions). Favourable outcomes 93%, 89%, 91% and 84%; peripheral neuropathy 38%, 24%, 24% and 13%; myelosuppression 22%, 15%, 2% and 7%. Six of the seven unfavourable microbiological outcomes were in the 9-week arms. The authors judged 600 mg for 26 weeks the best balance, and WHO uses 600 mg, reducible to 300 mg for toxicity [[Conradie2022,WHO-Mod4-2025]].`},
    {id:'prac',g:'TB-PRACTECAL (BPaLM, 2022)',rows:[{l:'BPaLM 24 wk',v:11,c:'var(--rx)'},{l:'standard care 9–20 mo',v:48,c:'var(--muted)'}],
     d:{v:37,lo:22,hi:53,l:'BPaLM vs standard (mITT)',pp:{v:9,lo:-4,hi:22}},txt:`Aged 15 and older, Belarus, South Africa and Uzbekistan. Unfavourable outcomes at 72 weeks (modified ITT): 11% vs 48%, risk difference −37 points (96.6% CI −53 to −22). Per protocol: 4% vs 12% (−9; −22 to 4). Recruitment stopped early: 128 people in the modified ITT and 90 per protocol [[Nyangwa2022]]. In the difference view the sign is flipped to favourable outcome.`},
    {id:'stream2',g:'STREAM stage 2 (2022)',rows:[{l:'9-month oral bedaquiline',v:17,c:'var(--rx)',calc:1},{l:'9-month injectable control',v:29,c:'var(--muted)',calc:1}],
     d:{v:11,lo:2.9,hi:19,l:'oral vs injectable'},txt:`Favourable outcome at 76 weeks: 83% (162/196) vs 71% (133/187), difference 11.0% (95% CI 2.9–19.0). At 132 weeks, unfavourable outcomes were 19.6% vs 29.3%, and earlier bedaquiline mortality concerns were not substantiated [[Goodall2022,Goodall2024]].`},
    {id:'endtb',g:'endTB (9-month regimens, 2025)',rows:[{l:'standard therapy',v:19.3,c:'var(--muted)',calc:1},{l:'BCLLfxZ',v:9.5,c:'var(--rx)',calc:1},{l:'BLMZ',v:11,c:'var(--rx)',calc:1},{l:'BDLLfxZ',v:14.7,c:'var(--rx)',calc:1},{l:'DCMZ',v:16.8,c:'var(--warn)',calc:1}],
     d:{multi:[ ['BCLLfxZ',9.8],['BLMZ',8.3],['BDLLfxZ',4.6],['DCMZ',2.5]]},txt:`754 people with rifampicin-resistant, fluoroquinolone-susceptible TB. Standard therapy gave 80.7% favourable outcomes at week 73. Risk differences for the regimens that met noninferiority: BCLLfxZ +9.8, BLMZ +8.3, BDLLfxZ +4.6 points; DCMZ +2.5 was not noninferior per protocol. Grade 3 or higher hepatotoxic events: 11.7% overall, 7.1% on standard therapy [[Guglielmetti2025NEJM]]. Unfavourable rates here are 100 − (80.7 + difference), calculated.`},
    {id:'beat',g:'BEAT Tuberculosis (6 months, 2026)',rows:[{l:'6-month strategy',v:13.9,c:'var(--vax)',calc:1},{l:'9-month standard of care',v:14,c:'var(--muted)',calc:1}],
     d:{v:-.2,lo:-6.9,hi:6.5,l:'6-month vs 9-month'},txt:`South Africa, 403 people aged 6 or older, including people who were pregnant or breastfeeding and people with fluoroquinolone resistance. Success 86.1% (174/202) vs 86.0% (172/200), adjusted difference −0.2 points (95% CI −6.9 to 6.5). Grade 3 or higher adverse events 31.2% vs 37.0%; 10 deaths in each group [[Conradie2026]].`},
    {id:'endtbq',g:'endTB-Q (pre-XDR, 2025)',rows:[{l:'BDLC 6 or 9 months',v:13,c:'var(--warn)',calc:1},{l:'individualised longer',v:11,c:'var(--muted)',calc:1}],
     d:{v:-2,l:'BDLC vs control (calculated)'},txt:`324 people with fluoroquinolone-resistant TB. Favourable outcomes 87% vs 89%; overall noninferiority was not shown, and the authors suggest longer, reinforced regimens may be needed (Early evidence) [[Guglielmetti2025LRM]].`}];
  pick.innerHTML=TR.map(x=>`<option value="${x.id}">${x.g}</option>`).join('');
  function drawF(){const NN=NARROW(),nRows=TR.reduce((a,x)=>a+x.rows.length,0),nDiff=TR.reduce((a,x)=>a+(x.d.multi?x.d.multi.length:x.d.v!=null?(x.d.pp?2:1):0),0);
    const H=view==='rate'?(NN?48+TR.length*40+nRows*16+60:44+TR.length*36+nRows*15+56):(NN?48+nDiff*30+70:44+nDiff*24+70);
    const N=vb(fs,'720 '+H,'400 '+H),hl=pick.value;
    const lx=N?16:20,x0=N?150:300,x1=N?384:690;let s='',y=N?48:44;
    if(view==='rate'){const X=v=>lerp(x0,x1,v/(N?56:50));
      s+=`<text x="${lx}" y="20" class="t-sm">UNFAVOURABLE OUTCOME, % OF PARTICIPANTS</text>`;
      const rowsH=TR.reduce((a,x)=>a+x.rows.length*(N?16:15)+(N?40:36),0)-(N?26:24);
      [0,10,20,30,40,50].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-6}" y2="${y+rowsH}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${y+rowsH+14}" class="t-xs t-mid">${v}%</text>`);
      TR.forEach(x=>{const on=x.id===hl;
        s+=`<text x="${lx}" y="${y+4}" class="t-lbl" style="${on?'fill:var(--rx)':''};font-size:${N?12:13}px">${x.g}</text>`;y+=N?14:12;
        x.rows.forEach(r=>{y+=N?16:15;
          s+=`<text x="${N?lx+8:x0-10}" y="${y+3}" class="t-xs${N?'':' t-end'}" style="${on?'fill:var(--ink)':''}">${r.l}${r.calc?'*':''}</text>`;
          if(r.lo!=null)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y}" y2="${y}" style="stroke:${r.c};stroke-width:2"/>`;
          const px=N?Math.max(X(r.v),x0):X(r.v);
          s+=`<circle cx="${f1(X(r.v))}" cy="${y}" r="${on?5.5:4.5}" style="fill:${r.c};stroke:var(--ink);stroke-width:${on?1.4:.6}"/><text x="${f1(X(r.v)+9)}" y="${y+3}" class="t-xs" style="fill:var(--ink)">${r.v}%${r.best?' ◂ chosen dose':''}</text>`});
        y+=N?26:24});
      s+=`<text x="${lx}" y="${y+12}" class="t-xs">* calculated here as 100 − the published favourable %.</text><text x="${lx}" y="${y+26}" class="t-xs">Bars: published 95% CI.</text>`;
    }else{const X=v=>lerp(x0,x1,(v+10)/70);
      s+=`<text x="${lx}" y="20" class="t-sm">DIFFERENCE IN FAVOURABLE OUTCOME vs CONTROL, POINTS</text>`;
      const rows=[];TR.forEach(x=>{if(x.d.multi)x.d.multi.forEach(([l,v])=>rows.push({id:x.id,l:'endTB '+l,v}));else if(x.d.v!=null){rows.push({id:x.id,l:x.g.split(' (')[0]+(N?'':' · '+x.d.l),v:x.d.v,lo:x.d.lo,hi:x.d.hi});if(x.d.pp)rows.push({id:x.id,l:'TB-PRACTECAL per protocol',v:x.d.pp.v,lo:x.d.pp.lo,hi:x.d.pp.hi})}});
      const h=rows.length*(N?30:24);
      [-10,0,10,20,30,40,50,60].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-6}" y2="${y+h}" class="${v?'grid':'axis'}" style="${v?'':'stroke:var(--ink);stroke-width:1.4'}"/><text x="${f1(X(v))}" y="${y+h+14}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`);
      s+=`<text x="${f1(X(-10))}" y="${y+h+30}" class="t-xs">← favours control</text><text x="${f1(X(60))}" y="${y+h+30}" class="t-xs t-end">favours new regimen →</text>`;
      rows.forEach(r=>{y+=N?30:24;const on=r.id===hl,yy=y-(N?14:10);
        s+=`<text x="${lx}" y="${N?yy-6:yy+3}" class="t-xs" style="${on?'fill:var(--rx);font-weight:700':'fill:var(--ink)'}">${r.l}</text>`;
        if(r.lo!=null)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${yy}" y2="${yy}" style="stroke:var(--rx);stroke-width:2.2"/><line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${yy-4}" y2="${yy+4}" style="stroke:var(--rx);stroke-width:1.5"/><line x1="${f1(X(r.hi))}" x2="${f1(X(r.hi))}" y1="${yy-4}" y2="${yy+4}" style="stroke:var(--rx);stroke-width:1.5"/>`;
        s+=`<rect x="${f1(X(r.v)-5)}" y="${yy-5}" width="10" height="10" style="fill:${on?'var(--rx)':'var(--ink)'}"/><text x="${f1(r.hi!=null&&X(r.hi)>x1-90?X(r.v):X(r.v)+(r.hi!=null?Math.max(9,X(r.hi)-X(r.v)+6):9))}" y="${r.hi!=null&&X(r.hi)>x1-90?yy-9:yy+4}" ${r.hi!=null&&X(r.hi)>x1-90?'text-anchor="middle"':''} class="t-xs" style="fill:var(--ink)">${r.v>0?'+':''}${r.v}${r.lo!=null?` (${r.lo} to ${r.hi})`:''}</text>`});
      s+=`<text x="${lx}" y="${y+50}" class="t-xs">Squares: point estimates; bars: published CIs (TB-PRACTECAL 96.6%).</text><text x="${lx}" y="${y+64}" class="t-xs">Different trials, populations and controls.</text>`;}
    fs.innerHTML=s;
    const x=TR.find(z=>z.id===hl);$('#mrFNote').innerHTML=noteHTML({k:'Trial detail',t:x.g,txt:x.txt,pt:`Each trial compared different groups of people, so the numbers are not a league table.`,hook:x.id==='prac'?`TB-PRACTECAL: unfavourable 11% (BPaLM) vs 48% (standard care) [[Nyangwa2022]].`:x.id==='zenix'?`ZeNix: linezolid 600 mg × 26 weeks kept efficacy (91%) and cut myelosuppression to 2% [[Conradie2022]].`:null});
  }
  pick.addEventListener('change',drawF);
  $$('[data-fv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.fv;$$('[data-fv]').forEach(z=>z.setAttribute('aria-pressed',z===b));drawF()}));
  pick.value='prac';drawF();
  redraws.drtb=(p=>()=>{p&&p();drawF()})(redraws.drtb);
};
