/* =============== 5.5 Research frontier =============== */
/* Main scene: an airway cell (nucleus, ribosome, the CFTR place in the apical membrane, the sodium channel ENaC)
   beside a pulmonary ionocyte. Pick a therapy; the scrubber carries it along its route in five generic steps.
   Routes are schematic. The status panel and the notes carry the cited results and their evidence labels. */
const FR_STEPS=[{from:0,at:.1,t:'Delivery'},{from:.2,at:.3,t:'Into the cell'},{from:.4,at:.5,t:'At its target'},{from:.6,at:.7,t:'Making or fixing CFTR'},{from:.8,at:.92,t:'The evidence so far'}];
const FR_TH={
 gene:{n:'Gene addition',ev:['early','Early evidence'],acts:'the nucleus',route:'inhaled',big:'+3.7%',cap:['relative ppFEV1 gain','vs placebo, 1 year'],res:.45,
  s:[{t:'A working CFTR gene, inhaled',txt:`Gene addition delivers a working copy of the CFTR gene into airway cells. Three kinds of carrier are in trials: a non-viral lipid complex (pGM169/GL67A), adeno-associated viruses (AAV: 4D-710 and SP-101) and a lentivirus (BI 3720931) [[Alton2015pGM169,NCT05248230,NCT06526923,NCT06515002]].`,
     pt:`The idea is to breathe in a tiny delivery package that carries a correct copy of the CFTR instructions into the airway lining [[Alton2015pGM169]].`},
    {t:'Crossing the mucus',txt:`4D-710 uses an engineered AAV capsid (4D-A101) and is in an open-label phase 1/2 trial in adults, NCT05248230 [[NCT05248230]]. SP-101 is a single inhaled dose given with doxorubicin, NCT06526923 [[NCT06526923]]. Both trials were recruiting when this guide's sources were checked.`},
    {t:'The new gene reaches the nucleus',txt:`Because it brings its own working copy, gene addition does not depend on which CFTR variants a person has. That is why these trials enrol adults who are ineligible for, or intolerant of, modulators [[NCT06526923,NCT06515002]].`},
    {t:'The cell builds CFTR from it',txt:`In the UK CF Gene Therapy Consortium trial (140 people, nebulised monthly for a year), pGM169/GL67A gave a relative ppFEV1 benefit of 3.7% over placebo (95% CI 0.1 to 7.3; p=0.046) [[Alton2015pGM169]].`},
    {t:'Modest, and still in trials',txt:`The pGM169 effect reflected stabilisation against decline on placebo; the authors called it "significant, albeit modest" <span class="ev early">Early evidence</span> [[Alton2015pGM169]]. The lentiviral Lenticlair 1 trial (NCT06515002) was terminated in 2026 for "sponsor decision" after enrolling 5 people <span class="ev hyp">Hypothesis</span> [[NCT06515002]].`,
     hook:`Non-viral CFTR gene therapy (pGM169/GL67A): relative ppFEV1 +3.7% vs placebo over 1 year, "significant, albeit modest" [[Alton2015pGM169]].`}]},
 mrna:{n:'mRNA therapy',ev:['early','Early evidence'],acts:'the ribosome',route:'inhaled',big:'no gain',cap:['in FEV1 so far','MRT5005, 42 adults'],res:.3,
  s:[{t:'The CFTR message, inhaled',txt:`mRNA therapy delivers the CFTR message rather than the gene. MRT5005 is inhaled CFTR mRNA in lipid nanoparticles [[Rowe2023MRT5005]]; VX-522 is an inhaled mRNA therapy for adults whose genotype does not respond to modulators, NCT05668741 [[NCT05668741]].`,
     pt:`Instead of the whole instruction book, this sends a short-lived copy of one page: the recipe for CFTR [[Rowe2023MRT5005]].`},
    {t:'A nanoparticle carries it in',txt:`The lipid nanoparticle protects the mRNA on its way through the mucus and into the airway cell [[Rowe2023MRT5005]].`},
    {t:'Read at the ribosome',txt:`The message is read to build CFTR, so, like gene addition, it does not depend on a person's own variants; VX-522 enrols people whose genotype does not respond to modulators [[NCT05668741]].`},
    {t:'Side effects first',txt:`In the MRT5005 phase 1/2 study (42 adults), 14 febrile reactions occurred in 10 treated people, and 2 people had hypersensitivity reactions [[Rowe2023MRT5005]].`},
    {t:'No lung-function gain yet',txt:`FEV1 stayed stable, but no FEV1 benefit was seen <span class="ev early">Early evidence</span> [[Rowe2023MRT5005]]. ClinicalTrials.gov lists the VX-522 phase 1/2 trial (26 enrolled) as completed on 9 Sep 2026, with no results posted [[NCT05668741]].`,
     hook:`Inhaled CFTR mRNA (MRT5005): febrile reactions, stable FEV1, no FEV1 benefit [[Rowe2023MRT5005]].`}]},
 read:{n:'Read-through',ev:['est','Established: negative'],acts:'the ribosome',route:'bloodstream',big:'0.6',cap:['ppFEV1 points vs','placebo (ACT CF, NS)'],res:.18,
  s:[{t:'For nonsense variants',txt:`Nonsense variants cause CF in about 10% of people, and because they make no protein, drugs that act on CFTR protein cannot help [[Kerem2014Ataluren]]. Read-through drugs reach the cell from the blood rather than the airway; ELX-02 is given under the skin [[NCT04135495]].`,
     pt:`About 1 in 10 people with CF have variants that put an early "stop" in the CFTR recipe, so modulators have nothing to work on [[Kerem2014Ataluren]].`},
    {t:'From the blood',txt:`In the scene the drug arrives from below, the blood side of the cell. ELX-02 is a subcutaneous eukaryotic ribosome-selective glycoside, tested with and without ivacaftor in adults with at least one G542X allele [[NCT04135495]].`},
    {t:'Reading past the stop',txt:`The aim is to make the ribosome read past the premature stop and finish the protein. Ataluren was tested in a phase 3 trial in 238 people with nonsense-mutation CF [[Kerem2014Ataluren]].`},
    {t:'The phase 3 result',txt:`Ataluren failed in that trial: relative ppFEV1 change −2.5% vs −5.5% on placebo (p=0.12), and raised creatinine in 15% vs under 1% [[Kerem2014Ataluren]].`},
    {t:'Two failed phase 3 trials',txt:`The confirmatory ACT CF trial (279 people not taking inhaled aminoglycosides) found no difference: ppFEV1 0.6 points (95% CI −1.3 to 2.5; p=0.54). The authors concluded "Development of a nonsense-mutation CF therapy remains elusive" <span class="ev est">Established: negative</span> [[Konstan2020ACTCF]]. The ELX-02 trial (17 enrolled) completed in 2022 with no results posted <span class="ev hyp">Hypothesis</span> [[NCT04135495]].`,
     hook:`Ataluren (read-through) failed two phase 3 trials, so nonsense variants remain an unmet need [[Kerem2014Ataluren,Konstan2020ACTCF]].`}]},
 edit:{n:'Gene editing',ev:['early','Early evidence (lab)'],acts:'DNA in the nucleus',route:'lab dish only',big:'25%',cap:['F508del corrected in','patient airway cells'],res:.85,
  s:[{t:'Fix the letter itself',txt:`Gene editing aims to correct the variant in a person's own DNA. So far it has been done only in cells and organoids in the laboratory; the inhaled route in the scene is a sketch, not a treatment [[Geurts2020ABE,Sousa2025Prime,Bulcaen2024Prime]].`,
     pt:`Editing is like correcting a typo in the original recipe, so the cell makes normal CFTR on its own. It has only been done in a dish so far [[Sousa2025Prime]].`},
    {t:'Which variants could be fixed',txt:`In an organoid biobank from 664 people, about 20% carried variants that adenine base editing could theoretically correct [[Geurts2020ABE]].`},
    {t:'Editing the DNA',txt:`Base editing achieved genetic and functional repair in all 4 tested samples, with no off-target mutations found in 2 lines [[Geurts2020ABE]].`},
    {t:'Normal CFTR from the fixed gene',txt:`Optimised prime editing corrected F508del in 58% of immortalised bronchial cells and 25% of patient airway cells, restoring CFTR function to over 50% of wild-type levels, similar to ETI [[Sousa2025Prime]]. Prime editing also corrected L227R and N1303K in rectal organoids and nasal epithelial cells, with high specificity [[Bulcaen2024Prime]].`},
    {t:'Promising, in the laboratory',txt:`<span class="ev early">Early evidence, laboratory</span> Editing works only in the laboratory so far; no genetic therapy was approved as of November 2026 [[Sousa2025Prime,Bulcaen2024Prime,Geurts2020ABE]].`,
     hook:`Prime editing corrected F508del in 25% of patient airway cells and restored over 50% of wild-type CFTR function, in vitro [[Sousa2025Prime]].`}]},
 enac:{n:'ENaC inhibitor',ev:['early','Early evidence: negative'],acts:'ENaC, apical surface',route:'inhaled',big:'+1.5%',cap:['ppFEV1 vs placebo','no relevant benefit'],res:0,
  s:[{t:'A "mutation-agnostic" idea',txt:`ENaC inhibition is a "mutation-agnostic" approach: rather than fixing CFTR, it blocks the epithelial sodium channel ENaC [[Goss2022BALANCE]].`,
     pt:`Instead of repairing the salt gate, this tries to stop the airway soaking up too much salt and water through another channel [[Goss2022BALANCE]].`},
    {t:'Inhaled to the surface',txt:`The inhaled ENaC inhibitor BI 1265162 was tested in BALANCE-CF 1, a randomised phase II study [[Goss2022BALANCE]].`},
    {t:'Blocking sodium uptake',txt:`CF airway cells absorb excess sodium and fluid; in cultured CF epithelia, the potentiator ivacaftor reduced that absorption [[VanGoor2009VX770]]. An ENaC blocker targets the same step directly [[Goss2022BALANCE]].`},
    {t:'No CFTR is made',txt:`The CFTR defect itself is untouched: the target is downstream, so it would suit any genotype [[Goss2022BALANCE]].`},
    {t:'Development terminated',txt:`BALANCE-CF 1 showed no relevant clinical benefit (+1.5% ppFEV1 at 200 µg twice daily vs placebo), and development was terminated <span class="ev early">Early evidence: negative</span> [[Goss2022BALANCE]].`}]},
 iono:{n:'Ionocytes and organoids',ev:['est','Established discovery'],acts:'a rare CFTR-rich cell',route:'a target, not a drug',big:'FOXI1+',cap:['major source of airway','CFTR transcripts'],res:0,
  s:[{t:'A cell nobody knew about',txt:`Single-cell atlases of mouse and human airways found a rare FOXI1-positive cell, the "pulmonary ionocyte", that is the major source of CFTR transcripts <span class="ev est">Established</span> [[Montoro2018,Plasschaert2018]].`,
     pt:`A few rare cells in the airway lining make most of its CFTR, which may matter for where future gene treatments need to land [[Montoro2018,Plasschaert2018]].`},
    {t:'Why it matters',txt:`Knocking out Foxi1 in mice caused CF-like changes in airway fluid and mucus [[Montoro2018,Plasschaert2018]].`},
    {t:'A target for therapy?',txt:`Whether genetic therapies must reach ionocytes to work is untested: the therapeutic relevance is a <span class="ev hyp">Hypothesis</span> [[Montoro2018,Plasschaert2018]].`},
    {t:'Testing drugs on a person’s own cells',txt:`Forskolin-induced swelling of rectal organoids measures CFTR function [[Dekkers2013FIS]]. Organoid responses to ivacaftor and lumacaftor correlated with clinical trial outcomes [[Dekkers2016Organoids]].`},
    {t:'Theratyping, still a research tool',txt:`In a prospective study, organoid responses correlated with changes in both FEV1 and sweat chloride <span class="ev early">Early evidence</span> [[Berkers2019Organoids]]. Two people with G1249R/F508del were predicted to respond and did respond to ivacaftor; one with F508del/R347P had a limited response both in vitro and in vivo [[Dekkers2016Organoids]].`,
     hook:`Pulmonary ionocytes are rare cells that make most of the CFTR transcripts in the airway [[Montoro2018,Plasschaert2018]].`}]}
};
/* programmes for the pipeline map: lane, stage column (0 lab, 1 phase 1/2, 2 phase 2/2b, 3 phase 3, 4 approved), status */
const FR_PROG=[
 {n:'pGM169/GL67A',l:0,c:2,s:'done',ev:'early'},{n:'4D-710',l:0,c:1,s:'on',ev:'early'},{n:'SP-101',l:0,c:1,s:'on',ev:'early'},{n:'BI 3720931',l:0,c:1,s:'stop',ev:'hyp'},
 {n:'MRT5005',l:1,c:1,s:'done',ev:'early'},{n:'VX-522',l:1,c:1,s:'done',ev:'early'},
 {n:'ataluren',l:2,c:3,s:'stop',ev:'est'},{n:'ELX-02',l:2,c:2,s:'done',ev:'hyp'},
 {n:'base editing',l:3,c:0,s:'lab',ev:'early'},{n:'prime editing',l:3,c:0,s:'lab',ev:'early'},
 {n:'BI 1265162',l:4,c:2,s:'stop',ev:'early'},
 {n:'ionocytes',l:5,c:0,s:'lab',ev:'hyp'},{n:'organoids',l:5,c:0,s:'lab',ev:'early'}
];
const FR_LANES=['Gene addition','mRNA','Read-through','Gene editing','ENaC inhibition','Cell biology'];
const FR_COLS=['Laboratory','Phase 1/2','Phase 2 / 2b','Phase 3','Approved'];
inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT'),note=$('#frNote');let th='gene',setSt=()=>{};
  const along=(P,u)=>{u=clamp(u);const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
    const d=u*L[L.length-1];for(let i=1;i<P.length;i++)if(d<=L[i]+1e-6){const k=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}return P[P.length-1]};
  const helix=(x,y,w,col,op=1)=>{let a='',b='';for(let i=0;i<=16;i++){const u=i/16,xx=x-w/2+w*u,dy=Math.sin(u*Math.PI*3)*5;a+=(i?'L':'M')+f1(xx)+' '+f1(y+dy);b+=(i?'L':'M')+f1(xx)+' '+f1(y-dy)}
    return `<g style="opacity:${f1(op)}"><path d="${a}" style="fill:none;stroke:${col};stroke-width:1.6"/><path d="${b}" style="fill:none;stroke:${col};stroke-width:1.6;opacity:.6"/></g>`};
  const mrnaStrand=(x,y,w,op=1)=>{let d='';for(let i=0;i<=10;i++){const u=i/10;d+=(i?'L':'M')+f1(x-w/2+w*u)+' '+f1(y+Math.sin(u*Math.PI*4)*2.5)}return `<path d="${d}" style="fill:none;stroke:var(--gold);stroke-width:1.8;opacity:${f1(op)}"/>`};
  function agent(k,x,y,s,op=1){
    if(k==='gene'){let d='';for(let i=0;i<6;i++){const a=Math.PI/3*i;d+=(i?'L':'M')+f1(x+s*Math.cos(a))+' '+f1(y+s*Math.sin(a))}
      return `<g style="opacity:${f1(op)}"><path d="${d}Z" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.6"/>${helix(x,y,s*1.1,'var(--dx)')}</g>`}
    if(k==='mrna')return `<g style="opacity:${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s)}" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>${mrnaStrand(x,y,s*1.2)}</g>`;
    if(k==='read')return `<g style="opacity:${f1(op)}">${pill(x,y,s*1.8,{col:'var(--rx)'})}</g>`;
    if(k==='edit')return `<g style="opacity:${f1(op)}"><path d="M${f1(x)} ${f1(y)}L${f1(x+s)} ${f1(y-s*.6)}A${f1(s*1.15)} ${f1(s*1.15)} 0 1 0 ${f1(x+s)} ${f1(y+s*.6)}Z" style="fill:var(--variant);opacity:.85"/></g>`;
    if(k==='enac')return modulator(x,y,s*1.6,{kind:'corr',lbl:'B',op});
    return ''}
  function draw(t){const N=vb(svg,'720 380','400 600'),p=phaseOf(FR_STEPS,t),T=FR_TH[th],S=T.s[p];
    const L=N?{x0:10,x1:270,ix0:280,ix1:390,top:44,mem:140,bot:372,nx:78,ny:300,nrx:50,nry:36,rx:200,ry:236,sl:150,en:236,px:10,py:396,pw:380,ph:196}
             :{x0:14,x1:392,ix0:402,ix1:536,top:44,mem:150,bot:362,nx:110,ny:292,nrx:62,nry:42,rx:285,ry:236,sl:226,en:334,px:550,py:44,pw:162,ph:318};
    const mucY=L.mem-30,aslY=L.mem-14;let s=`<defs>${marker('frA','var(--muted)',6)}</defs>`;
    s+=`<text x="${L.x0}" y="22" class="t-big">${S.t}</text>`;
    s+=`<text x="${L.x0}" y="38" class="t-sm">${T.n} · step ${p+1} of 5: ${FR_STEPS[p].t.toLowerCase()}</text>`;
    /* lumen, mucus, liquid layer */
    s+=`<rect x="${L.x0}" y="${L.top}" width="${L.ix1-L.x0}" height="${L.mem-L.top}" rx="8" style="fill:var(--field)"/>`;
    s+=`<rect x="${L.x0}" y="${mucY-8}" width="${L.ix1-L.x0}" height="16" rx="4" style="fill:var(--mucus);opacity:.75"/><rect x="${L.x0}" y="${aslY-6}" width="${L.ix1-L.x0}" height="13" style="fill:var(--water-soft)"/>`;
    s+=`<text x="${L.ix1-6}" y="${L.top+14}" class="t-xs t-end">airway</text><text x="${L.ix1-6}" y="${mucY+3}" class="t-xs t-end" style="fill:var(--mucus-ink)">mucus</text>`;
    /* the two cells */
    const slotOn=p>=4&&T.res>0||(p===3&&T.res>0&&ramp(t,.72,.8)>0);
    s+=`<rect x="${L.x0}" y="${L.mem}" width="${L.x1-L.x0}" height="${L.bot-L.mem}" rx="10" style="fill:var(--cell);stroke:var(--line);stroke-width:1.2"/>`;
    const io=th==='iono';
    s+=`<rect x="${L.ix0}" y="${L.mem}" width="${L.ix1-L.ix0}" height="${L.bot-L.mem}" rx="10" style="fill:${io?'var(--rx-soft)':'var(--cell)'};stroke:${io?'var(--rx)':'var(--line)'};stroke-width:${io?2.4:1.2}"/>`;
    s+=membrane(L.x0,L.mem,L.x1-L.x0,{h:12,gap:[[L.sl-11,L.sl+11],[L.en-10,L.en+10]]})+membrane(L.ix0,L.mem,L.ix1-L.ix0,{h:12});
    const icx=(L.ix0+L.ix1)/2;
    s+=`<ellipse cx="${f1(icx)}" cy="${L.mem+110}" rx="${f1((L.ix1-L.ix0)*.3)}" ry="30" style="fill:var(--nucleus);opacity:.5"/>`;
    for(let i=0;i<4;i++)s+=`<rect x="${f1(L.ix0+12+i*((L.ix1-L.ix0-24)/3)-4)}" y="${L.mem-7}" width="8" height="14" rx="2" style="fill:var(--cftr)"/>`;
    s+=`<text x="${f1(icx)}" y="${L.bot-26}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">ionocyte</text><text x="${f1(icx)}" y="${L.bot-14}" class="t-xs t-mid">FOXI1+, CFTR-rich</text>`;
    s+=`<text x="${L.x0+8}" y="${L.bot-10}" class="t-xs" style="fill:var(--ink)">airway cell</text>`;
    /* nucleus with the person's CFTR gene; the variant is the red tick */
    s+=`<ellipse cx="${L.nx}" cy="${L.ny}" rx="${L.nrx}" ry="${L.nry}" style="fill:var(--nucleus);opacity:.5"/>`;
    const fixed=th==='edit'&&t>=.62;
    s+=helix(L.nx,L.ny-8,L.nrx*1.2,'var(--dna)');
    s+=`<rect x="${L.nx-2}" y="${L.ny-18}" width="5" height="20" rx="2" style="fill:${fixed?'var(--good)':'var(--variant)'}"/>`;
    s+=`<text x="${L.nx}" y="${L.ny+L.nry-8}" class="t-xs t-mid" style="fill:var(--ink)">nucleus${fixed?' · variant fixed':''}</text>`;
    if(th==='gene'&&t>=.5)s+=helix(L.nx,L.ny+10,L.nrx*.9,'var(--dx)',ramp(t,.5,.58));
    /* ribosome */
    s+=`<ellipse cx="${L.rx}" cy="${L.ry-6}" rx="13" ry="8" style="fill:var(--nucleus)"/><ellipse cx="${L.rx}" cy="${L.ry+6}" rx="17" ry="9" style="fill:var(--nucleus);opacity:.85"/><text x="${L.rx}" y="${L.ry+28}" class="t-xs t-mid" style="fill:var(--ink)">ribosome</text>`;
    if(th==='read'&&p>=2){const stp=p>=3?ramp(t,.6,.72):0;
      s+=`<g><polygon points="${[0,1,2,3,4,5,6,7].map(i=>{const a=Math.PI/8+i*Math.PI/4;return f1(L.rx+28+9*Math.cos(a))+','+f1(L.ry-14+9*Math.sin(a))}).join(' ')}" style="fill:var(--bad)"/><text x="${L.rx+28}" y="${L.ry-11}" class="t-mid" style="font:700 6.5px var(--mono);fill:var(--panel)">STOP</text></g>`;
      if(stp>0)s+=`<line x1="${L.rx+19}" y1="${L.ry-23}" x2="${L.rx+37}" y2="${L.ry-5}" style="stroke:var(--ink);stroke-width:2;opacity:${f1(stp*.5)}"/>`}
    /* ENaC with sodium coming in unless blocked */
    const blocked=th==='enac'?ramp(t,.4,.52):0;
    s+=`<rect x="${L.en-9}" y="${L.mem-10}" width="7" height="20" rx="3" style="fill:var(--na)"/><rect x="${L.en+2}" y="${L.mem-10}" width="7" height="20" rx="3" style="fill:var(--na)"/>`;
    s+=`<text x="${L.en}" y="${L.mem+24}" class="t-xs t-mid" style="fill:var(--ink)">ENaC</text>`;
    for(let i=0;i<3;i++){const u=((t*4+i/3)%1),yy=lerp(aslY,L.mem+40,u);if(blocked>.9&&yy>L.mem-14)continue;s+=ion(L.en,yy,'na',{r:3.4,op:Math.min(1,u*4,(1-u)*3)*(1-blocked*.85)})}
    if(blocked>0)s+=agent('enac',L.en,L.mem-17,7,blocked);
    /* the CFTR place in the apical membrane */
    s+=`<text x="${L.sl}" y="${L.mem+24}" class="t-xs t-mid" style="fill:var(--ink)">CFTR</text>`;
    if(slotOn){const op=T.res,dash=th==='read';const C=cftr(L.sl,L.mem,30,{state:'closed',open:.8,flow:op>.4?.9:0,ph:t*6,membrane:false});
      s+=`<g style="opacity:${f1(clamp(.35+op*.65))}">${C.svg}</g>`;if(dash)s+=`<text x="${L.sl}" y="${L.mem-24}" class="t-xs t-mid" style="fill:var(--bad);font-weight:600">trials: no benefit</text>`}
    else s+=`<rect x="${L.sl-9}" y="${L.mem-10}" width="18" height="20" rx="3" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/>`;
    /* the route */
    const M0=[L.x0+40,L.top+6],Mu=[L.sl-36,mucY],En=[L.sl-60,L.mem+26],Bl=[L.rx+40,L.bot+8];
    const R={gene:[M0,Mu,En,[L.nx+L.nrx*.3,L.ny-L.nry*.2]],mrna:[M0,Mu,En,[L.rx-22,L.ry]],read:[Bl,[L.rx+40,L.ry+40],[L.rx+20,L.ry+4]],
      edit:[M0,Mu,En,[L.nx+12,L.ny-8]],enac:[M0,[L.en-20,mucY],[L.en,L.mem-17]],iono:[M0,[icx,mucY],[icx,L.mem-22]]}[th];
    s+=`<path d="${R.map((q,i)=>(i?'L':'M')+f1(q[0])+' '+f1(q[1])).join('')}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:2 4" marker-end="url(#frA)"/>`;
    const ua=ramp(t,.02,.56),pos=along(R,ua),arrivedA=ua>=1;
    if(th==='iono'){if(p>=2)s+=`<text x="${f1(icx)}" y="${L.mem-24}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">target?</text>`;
      s+=`<circle cx="${f1(pos[0])}" cy="${f1(pos[1])}" r="6" style="fill:none;stroke:var(--rx);stroke-width:2;opacity:${f1(1-ramp(t,.56,.7))}"/>`}
    else if(th!=='enac'||blocked<.01){const fade=arrivedA?1-ramp(t,.58,.66):1;if(fade>.02)s+=agent(th,pos[0],pos[1],8,fade)}
    if(p===0&&th!=='read'&&th!=='edit'){for(let i=0;i<6;i++){const u=(t*6+i/6)%1;s+=`<circle cx="${f1(M0[0]-20+i*9)}" cy="${f1(L.top+4+u*14)}" r="2" style="fill:var(--muted);opacity:${f1(.6*(1-u))}"/>`}}
    /* products: mRNA to the ribosome, protein to the membrane */
    const u3=ramp(t,.6,.78);
    if(u3>0&&u3<1&&T.res>0&&th!=='iono'){
      if(th==='gene'||th==='edit'){const q=along([[L.nx+L.nrx*.6,L.ny-10],[L.rx-20,L.ry]],ramp(u3,0,.5));if(u3<.5)s+=mrnaStrand(q[0],q[1],16)}
      if(u3>.4){const q=along([[L.rx,L.ry-12],[L.sl,L.mem+18]],ramp(u3,.4,1));s+=folding(q[0],q[1],16,{fold:1,mis:0,seed:4})}}
    /* status panel */
    const px=L.px,py=L.py,pw=L.pw;
    s+=`<rect x="${px}" y="${py}" width="${pw}" height="${L.ph}" rx="10" style="fill:var(--panel-2)"/>`;
    const evc={est:'var(--good)',early:'var(--warn)',hyp:'var(--rx)'}[T.ev[0]],evb={est:'var(--good-soft)',early:'var(--warn-soft)',hyp:'var(--rx-soft)'}[T.ev[0]];
    s+=`<text x="${px+10}" y="${py+22}" class="t-lbl">${T.n}</text>`;
    s+=`<rect x="${px+10}" y="${py+32}" width="${f1(T.ev[1].length*6.2+12)}" height="17" rx="4" style="fill:${evb}"/><text x="${px+16}" y="${py+44}" style="font:600 9.5px var(--mono);fill:${evc};letter-spacing:.04em">${T.ev[1].toUpperCase()}</text>`;
    const rows=[['acts at',T.acts],['route',T.route]];
    if(N){rows.forEach((r,i)=>{s+=`<text x="${px+10}" y="${py+72+i*16}" class="t-xs">${r[0]}</text><text x="${px+70}" y="${py+72+i*16}" class="t-xs" style="fill:var(--ink)">${r[1]}</text>`});
      s+=`<text x="${px+pw-14}" y="${py+80}" class="t-big t-end" style="font-size:30px;fill:${evc}">${T.big}</text>`;
      T.cap.forEach((c,i)=>{s+=`<text x="${px+pw-14}" y="${py+100+i*13}" class="t-xs t-end">${c}</text>`});
      s+=`<text x="${px+10}" y="${py+150}" class="t-xs" style="fill:var(--ink)">best result in this guide's sources</text>`}
    else{rows.forEach((r,i)=>{s+=`<text x="${px+10}" y="${py+74+i*30}" class="t-xs">${r[0]}</text><text x="${px+10}" y="${py+87+i*30}" class="t-xs" style="fill:var(--ink);font-weight:600">${r[1]}</text>`});
      s+=`<text x="${px+10}" y="${py+150}" class="t-xs">best result so far</text><text x="${px+10}" y="${py+184}" class="t-big" style="font-size:28px;fill:${evc}">${T.big}</text>`;
      T.cap.forEach((c,i)=>{s+=`<text x="${px+10}" y="${py+204+i*13}" class="t-xs">${c}</text>`})}
    const sw=(N?pw-20:pw-20)/5,sy=py+L.ph-22;
    FR_STEPS.forEach((q,i)=>{s+=`<rect x="${f1(px+10+i*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${i===p?'var(--rec)':i<p?'var(--rec-soft)':'var(--panel)'}"/>`});
    s+=`<text x="${px+10}" y="${sy+18}" class="t-xs">route step ${p+1}/5</text>`;
    svg.innerHTML=s;rg.setAttribute('aria-valuetext',`${T.n}, ${FR_STEPS[p].t}`);
    note.innerHTML=noteHTML({k:`${T.n} · step ${p+1} of 5`,t:S.t,txt:S.txt,pt:S.pt,hook:S.hook});setSt(p)}
  const stop=playWire(rg,$('#frPlay'),draw,22000,'Replay','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  $$('[data-frt]').forEach(b=>b.addEventListener('click',()=>{th=b.dataset.frt;$$('[data-frt]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));stop();draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- pipeline map ---------- */
  const pp=$('#frPipe');let flt='all';
  const SC={on:['var(--rx)','recruiting or ongoing'],done:['var(--muted)','completed'],stop:['var(--bad)','stopped or failed'],lab:['var(--gold)','laboratory or discovery']};
  function drawPipe(){const N=vb(pp,'720 420','400 640');let s='';
    if(!N){const lx=14,cx=170,cw=108,y0=58,lh=54;
      FR_COLS.forEach((c,i)=>{const x=cx+i*cw;s+=`<rect x="${x+2}" y="${y0-24}" width="${cw-4}" height="${lh*FR_LANES.length+22}" rx="8" style="fill:${i===4?'var(--rx-soft)':'var(--field)'}"/><text x="${x+cw/2}" y="${y0-10}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${c}</text>`});
      s+=`<text x="${cx+4*cw+cw/2}" y="${y0+lh*3}" class="t-xs t-mid" style="fill:var(--rx)">none yet</text>`;
      FR_LANES.forEach((ln,i)=>{const y=y0+i*lh;s+=`<line x1="${lx}" x2="${cx+5*cw}" y1="${y+lh}" y2="${y+lh}" class="grid"/><text x="${lx}" y="${y+lh/2+4}" class="t-sm" style="fill:var(--ink);font-weight:600">${ln}</text>`;
        const cnt={};FR_PROG.filter(q=>q.l===i).forEach(q=>{const k=cnt[q.c]=(cnt[q.c]||0)+1,yy=y+10+(k-1)*15,xx=cx+q.c*cw+12,on=flt==='all'||q.ev===flt;
          s+=`<g style="opacity:${on?1:.18}"><circle cx="${xx}" cy="${yy+4}" r="5" style="fill:${SC[q.s][0]}"/>${q.s==='stop'?`<path d="M${xx-3} ${yy+1}l6 6M${xx+3} ${yy+1}l-6 6" style="stroke:var(--panel);stroke-width:1.5"/>`:''}<text x="${xx+9}" y="${yy+7}" class="t-xs" style="fill:var(--ink)">${q.n}</text></g>`})});
      const ly=y0+lh*FR_LANES.length+22;Object.keys(SC).forEach((k,i)=>{const x=lx+i*176;s+=`<circle cx="${x}" cy="${ly}" r="5" style="fill:${SC[k][0]}"/><text x="${x+9}" y="${ly+3}" class="t-xs" style="fill:var(--ink)">${SC[k][1]}</text>`})}
    else{const x0=10,cw=76,y0=40;let y=y0;
      FR_COLS.forEach((c,i)=>{s+=`<text x="${x0+i*cw+cw/2}" y="${y0-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${c.replace(' / 2b','/2b')}</text>`});
      FR_LANES.forEach((ln,i)=>{const P=FR_PROG.filter(q=>q.l===i),cnt={};P.forEach(q=>cnt[q.c]=(cnt[q.c]||0)+1);const rows=Math.max(1,...Object.values(cnt)),h=26+rows*24;
        s+=`<rect x="${x0}" y="${y}" width="380" height="${h-6}" rx="8" style="fill:var(--field)"/><text x="${x0+8}" y="${y+15}" class="t-sm" style="fill:var(--ink);font-weight:600">${ln}</text>`;
        const c2={};P.forEach(q=>{const k=c2[q.c]=(c2[q.c]||0)+1,xx=x0+q.c*cw+10,yy=y+26+(k-1)*24,on=flt==='all'||q.ev===flt;
          s+=`<g style="opacity:${on?1:.18}"><circle cx="${xx}" cy="${yy+4}" r="5" style="fill:${SC[q.s][0]}"/>${q.s==='stop'?`<path d="M${xx-3} ${yy+1}l6 6M${xx+3} ${yy+1}l-6 6" style="stroke:var(--panel);stroke-width:1.5"/>`:''}<text x="${xx-5}" y="${yy+20}" class="t-xs" style="fill:var(--ink)">${q.n}</text></g>`});
        y+=h});
      Object.keys(SC).forEach((k,i)=>{const x=x0+(i%2)*190,yy=y+12+Math.floor(i/2)*18;s+=`<circle cx="${x+5}" cy="${yy}" r="5" style="fill:${SC[k][0]}"/><text x="${x+14}" y="${yy+3}" class="t-xs" style="fill:var(--ink)">${SC[k][1]}</text>`});
      pp.setAttribute('viewBox',`0 0 400 ${y+44}`)}
    pp.innerHTML=s}
  function setF(f){flt=f;$$('[data-frf]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.frf===f)));
    $$('#frCards [data-ev]').forEach(c=>{c.hidden=!(f==='all'||c.dataset.ev.split(' ').includes(f))});drawPipe()}
  $$('[data-frf]').forEach(b=>b.addEventListener('click',()=>setF(b.dataset.frf)));
  setF('all');
};
