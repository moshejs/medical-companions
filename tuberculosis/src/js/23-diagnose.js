/* =============== 2.3 Diagnosing TB disease =============== */
/* time axis: log10 hours from 0.5 h to 120 days */
const DX_L0=Math.log10(.5),DX_L1=Math.log10(2880);
/* a pleural effusion clipped to the patient's right lung (same outline as lung() in the kit) */
function dxEffusion(x,y,s,a){const X=v=>f1(x+v*s),Y=v=>f1(y+v*s),id='dxe'+Math.round(x)+'_'+Math.round(y);
  return `<clipPath id="${id}"><path d="M${X(92)} ${Y(42)}C${X(62)} ${Y(26)} ${X(30)} ${Y(40)} ${X(18)} ${Y(92)}C${X(8)} ${Y(132)} ${X(6)} ${Y(176)} ${X(20)} ${Y(190)}C${X(44)} ${Y(199)} ${X(76)} ${Y(193)} ${X(92)} ${Y(181)}Z"/></clipPath><path clip-path="url(#${id})" d="M${X(0)} ${Y(lerp(196,146,a))}Q${X(50)} ${Y(lerp(198,160,a))} ${X(100)} ${Y(lerp(196,144,a))}V${Y(205)}H${X(0)}Z" style="fill:var(--air);opacity:.5"/>`}
const dxHours=t=>Math.pow(10,lerp(DX_L0,DX_L1,t));
const dxT=h=>(Math.log10(h)-DX_L0)/(DX_L1-DX_L0);
const dxFmt=h=>h<1?Math.round(h*60)+' min':h<36?(h<10?h.toFixed(1):Math.round(h))+' h':h<24*14?(h/24).toFixed(h<72?1:0)+' days':(h/168).toFixed(1)+' weeks';
/* lanes: ready = hours until the result; r = result per scenario: [text, positive?] or null (not done) */
const DX_SC={
 pos:{name:'adult, smear-positive',sample:'sputum',xp:['MTB detected · RIF resistance not detected',1],lam:null,sm:['acid-fast bacilli seen',1],lc:[288,['growth: M. tuberculosis',1]],sc:[600,['colonies: M. tuberculosis',1]],dst:['susceptible to first-line drugs',1]},
 neg:{name:'adult, smear-negative',sample:'sputum',xp:['MTB detected (low) · RIF resistance not detected',1],lam:null,sm:['no acid-fast bacilli seen',0],lc:[336,['growth: M. tuberculosis',1]],sc:[600,['colonies: M. tuberculosis',1]],dst:['susceptible to first-line drugs',1]},
 child:{name:'young child',sample:'gastric aspirate or stool',xp:['MTB not detected',0],lam:null,sm:['no acid-fast bacilli seen',0],lc:[336,['no growth so far',0]],sc:[600,['no growth so far',0]],dst:null},
 hiv:{name:'adult with advanced HIV',sample:'sputum, if possible, and urine',xp:['MTB detected · RIF resistance not detected',1],lam:['LAM positive',1],sm:['no acid-fast bacilli seen',0],lc:[336,['growth: M. tuberculosis',1]],sc:[600,['colonies: M. tuberculosis',1]],dst:['susceptible to first-line drugs',1]}};
const DX_STEPS=[
 {from:0,at:.03,k:'Before any test',t:'The sample',
  txt:{all:`The guideline asks for at least 3 mL of sputum, 5–10 mL being optimal; a first-morning specimen is 12% more sensitive than a spot specimen. Every specimen should go to liquid culture, ideally with solid culture too. [[Lewinsohn2017]]`,
   child:` Young children rarely produce sputum. Three morning gastric aspirates yield up to 40–50% (up to 90% in infants); nasopharyngeal aspirate or induced sputum 20–30%. [[Lewinsohn2017]] Stool can be tested with Xpert Ultra (68.0% sensitivity against a microbiological reference). [[Kay2025]]`,
   hiv:` In advanced HIV, sputum may be impossible to produce and holds few bacilli. Urine LF-LAM detects a cell-wall glycolipid at the bedside, with no sputum needed. [[Peter2016,Bjerrum2019]]`},
  pt:`To check for TB disease you are usually asked to cough up sputum, ideally first thing in the morning. It is phlegm from deep in the chest, not saliva.`,
  hook:`≥ 3 mL sputum (5–10 mL optimal); an early-morning sample is 12% more sensitive than a spot sample.`},
 {from:.08,at:.17,k:'Under 2 hours · molecular test',t:'Xpert: TB and rifampicin resistance at once',
  txt:{all:`Xpert MTB/RIF is an automated cartridge PCR that detects M. tuberculosis and rifampicin resistance in under 2 hours. A single test found 98.2% of smear-positive and 72.5% of smear-negative culture-positive TB, with 99.2% specificity; three tests raised smear-negative sensitivity to 90.2%. [[Boehme2010]] Ultra detects fewer bacilli (15.6 vs 112.6 CFU/mL): 63% vs 46% in smear-negative TB and 90% vs 77% in people with HIV. [[Chakravorty2017,Dorman2018Ultra]] WHO strongly recommends Ultra as the initial test for adults with symptoms. [[WHO-Mod3-2024]]`,
   child:` In children, Ultra sensitivity was 75.3% on sputum, 69.6% on gastric aspirate, 68.0% on stool and 46.2% on nasopharyngeal aspirate. [[Kay2025]] Here, as for most children, it is negative.`,
   hiv:` In district use, Xpert sensitivity was not significantly lower in people with HIV. [[Boehme2011]]`},
  pt:`A rapid machine test called Xpert can find TB, and an important kind of drug resistance, in about 2 hours.`,
  hook:`Xpert MTB/RIF: ~98% sensitive in smear-positive, ~72% in smear-negative TB, in under 2 hours. [[Boehme2010]]`},
 {from:.3,at:.46,k:'About 1 day · microscopy',t:'Smear: acid-fast rods',
  txt:{all:`A stained smear shows magenta acid-fast rods. Three smears find about 70% of culture-confirmed TB: the first 53.8%, the second about 11.1% more, the third only 2–5%. Fluorescence microscopy is about 10% more sensitive, and specificity is 90% or more. A negative smear does not exclude pulmonary TB. [[Lewinsohn2017,Steingart2006Fluor]] Acid-fast bacilli on a smear can also be non-tuberculous mycobacteria. [[Chihota2010]]`},
  pt:`Under the microscope, TB germs show up as tiny red rods. If they are seen, there are many germs in the sample; if not, TB is still possible.`,
  hook:`Smear: 3 specimens ≈ 70% sensitive; a negative smear never rules TB out.`},
 {from:.62,at:.74,k:'About 2 weeks · liquid culture',t:'Liquid culture grows it',
  txt:{all:`Liquid culture detects growth in an average of 10–14 days and solid culture in 3–4 weeks; liquid culture sensitivity is 88–90% versus 76% for solid. [[Lewinsohn2017]] In smear-negative specimens, the median time to positivity was 14 days in MGIT liquid culture versus 25 days on Löwenstein–Jensen. MGIT grew more, but 77.3% of smear-negative specimens positive only in MGIT grew non-tuberculous mycobacteria, so what grows must be identified. [[Chihota2010]]`,
   child:` In this child nothing grows, as for most children treated for TB: only 29.9% of children classified as having pulmonary TB in 13 studies were bacteriologically confirmed. WHO treatment-decision algorithms let health workers start treatment on symptoms and X-ray. [[Gunasekera2023,WHO-Mod5-2022]]`},
  pt:`A culture grows the germ in the lab. It is slower, 2 to 6 weeks, but it finds more TB and shows which medicines will work.`,
  hook:`Liquid culture: 10–14 days, 88–90% sensitive. Solid: 3–4 weeks, 76%.`},
 {from:.78,at:.82,k:'3–4 weeks · solid culture',t:'Colonies on a slope',
  txt:{all:`On solid medium, colonies take 3–4 weeks to appear. [[Lewinsohn2017]] In district use the median time to detection was 0 days for Xpert, 1 day for microscopy, 16 days for liquid and 30 days for solid culture, and Xpert cut the median time to treatment for smear-negative TB from 56 days to 5. [[Boehme2011]] Adding solid media to MGIT raised sensitivity from 81.5% to 87.7% in one meta-analysis. [[Cruciani2004]]`},
  pt:`On a solid jelly, TB grows into small cream-coloured colonies. It takes weeks because TB divides very slowly.`,
  hook:`Xpert cut time to treatment in smear-negative TB from a median 56 days to 5. [[Boehme2011]]`},
 {from:.84,at:.97,k:'Weeks to months · drug susceptibility',t:'Which drugs will work?',
  txt:{all:`First-line phenotypic drug-susceptibility testing (DST) takes 1–2 weeks after growth; second-line and newer drugs on solid medium take 3–4 weeks. [[Lewinsohn2017]] In district practice the median time to a resistance result was 20 days by line probe assay and 106 days by conventional DST, against hours for Xpert's rifampicin result. [[Boehme2011]] Rifampicin resistance maps to one short stretch of the rpoB gene in over 95% of resistant isolates, which is why a single PCR target can stand in for rifampicin DST. [[Seifert2015]] More in <a href="#resistance" data-go="resistance">Drug resistance</a>.`,
   child:` Without growth, no isolate is available for DST; treatment follows the guidance for children. [[WHO-Mod5-2022]]`},
  pt:`Lab tests on the grown germ show which medicines it can resist. A rapid test already gives the most important answer, rifampicin, on the first day.`,
  hook:`Rifampicin result: < 2 hours by Xpert vs a median 106 days by conventional DST in routine practice. [[Boehme2010,Boehme2011]]`}];

inits.diagnose=()=>{
  const svg=$('#dxSvg'),rg=$('#dxT');let sc='pos',setSt=()=>{};
  function cart(x,y,p,col){return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-11" y="-16" width="22" height="32" rx="4" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.4"/><rect x="-8" y="-20" width="16" height="6" rx="2" style="fill:var(--accent)"/><rect x="-7" y="${f1(12-22*p)}" width="14" height="${f1(22*p)}" rx="2" style="fill:${col};opacity:.55"/><circle cx="0" cy="-6" r="3" style="fill:var(--panel-2);stroke:var(--accent)"/></g>`}
  function strip(x,y,pos,p){return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-22" y="-5" width="44" height="10" rx="3" style="fill:var(--panel);stroke:var(--accent)"/><line x1="4" x2="4" y1="-4" y2="4" style="stroke:var(--tb);stroke-width:2;opacity:${f1(p)}"/><line x1="12" x2="12" y1="-4" y2="4" style="stroke:var(--tb);stroke-width:2;opacity:${f1(pos?p:0)}"/></g>`}
  function slide(x,y,pos,p){let g=`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-20" y="-7" width="40" height="14" rx="1.5" style="fill:var(--panel);stroke:var(--muted)"/><ellipse cx="2" cy="0" rx="11" ry="4" style="fill:var(--air);opacity:${f1(.25+.4*p)}"/>`;
    if(p>=1){g+=`<line x1="20" y1="0" x2="24" y2="1" style="stroke:var(--accent)"/><circle cx="40" cy="2" r="16" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.2"/>`;if(pos)g+=clump(40,2,6,9,{len:6,seed:9})}
    return g+'</g>'}
  function tube(x,y,kind,grow,p){let g=`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-7" y="-17" width="14" height="34" rx="6" style="fill:var(--panel);stroke:var(--muted)"/><rect x="-8" y="-21" width="16" height="6" rx="2" style="fill:var(--muted)"/>`;
    if(kind==='liq')g+=`<rect x="-5.5" y="-5" width="11" height="20" rx="4" style="fill:var(--air);opacity:.3"/>`+(grow?`<rect x="-5.5" y="7" width="11" height="8" rx="4" style="fill:var(--tb);opacity:${f1(.8*grow)}"/><circle cx="0" cy="8" r="${f1(12*grow)}" style="fill:var(--tb);opacity:${f1(.15*grow)}"/>`:'');
    else{g+=`<path d="M-5.5 15V-2L5.5 -12V15Z" style="fill:var(--dE);opacity:.45"/>`;if(grow){const q=rng(5);for(let i=0;i<7;i++)g+=`<circle cx="${f1(-3+q()*7)}" cy="${f1(-4+q()*16)}" r="${f1(1.6*grow)}" style="fill:var(--caseum);stroke:var(--mac-line);stroke-width:.5"/>`}}
    return g+'</g>'}
  function dstG(x,y,done,sus){let g=`<g transform="translate(${f1(x)} ${f1(y)})">`;['--dH','--dR','--dZ','--dE'].forEach((c,i)=>{g+=`<rect x="${-22+i*11}" y="-9" width="9" height="18" rx="3" style="fill:var(${c});opacity:${done?.85:.3}"/>`;});return g+'</g>'}
  function flag(x,y,txt,pos,right,N){const w=txt.length*6.05+14,col=pos?'var(--tb)':'var(--muted)',bx=right?x-w+6:x-6,top=y-34;
    return `<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y-14)}" y2="${f1(top+14)}" style="stroke:${col};stroke-width:1.4"/><rect x="${f1(bx)}" y="${f1(top)}" width="${f1(w)}" height="16" rx="4" style="fill:${pos?'var(--tb-soft)':'var(--panel-2)'};stroke:${col}"/><text x="${f1(bx+7)}" y="${f1(top+11.5)}" class="t-xs" style="fill:${pos?'var(--tb)':'var(--ink)'};font-weight:700">${txt}</text>`}
  function draw(t){
    const N=vb(svg,'720 430','400 660'),S=DX_SC[sc],now=dxHours(t);
    const L=N?{x0:26,x1:384,ly:110,lh:86,ax:640,lab:'top'}:{x0:170,x1:704,ly:92,lh:54,ax:410,lab:'left'};
    const X=h=>lerp(L.x0,L.x1,dxT(clamp(h,.5,2880))),xn=X(now);
    let s='';
    /* header: the sample */
    s+=sputum(N?24:30,N?34:36,.9,{fill:.6*(1-ramp(t,.02,.08))+.15});
    s+=`<text x="${N?48:52}" y="${N?30:30}" class="t-lbl" style="font-size:12.5px">Sample: ${S.sample}</text><text x="${N?48:52}" y="${N?45:45}" class="t-xs">${S.name}${N?'':' · split between the tests'}</text>`;
    if(sc==='child'&&now>=24)s+=`<g><rect x="${N?200:376}" y="${N?52:22}" width="${N?186:330}" height="${N?36:26}" rx="6" style="fill:var(--rx-soft);stroke:var(--rx)"/><text x="${N?208:386}" y="${N?67:39}" class="t-xs" style="fill:var(--rx);font-weight:700">${N?'Treatment decision: symptoms ± X-ray':'Treatment decision algorithm: symptoms ± X-ray → treat'}</text>${N?`<text x="208" y="81" class="t-xs" style="fill:var(--rx);font-weight:700">→ treat without confirmation</text>`:''}</g>`;
    /* time axis */
    const ticks=[[1,'1 h'],[2,'2 h'],[24,'1 day'],[168,'1 wk'],[336,'2 wk'],[672,'4 wk'],[1344,'8 wk'],[2688,'16 wk']];
    const top=L.ly-30,bot=L.ly+5*L.lh+24;
    ticks.forEach(([h,l],i)=>{if(N&&(h===2||h===1344))return;s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${top}" y2="${L.ax}" class="grid"/><text x="${f1(X(h))}" y="${L.ax+14}" class="t-xs t-mid">${l}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/><text x="${L.x1}" y="${L.ax+28}" class="t-xs t-end">time since the sample (log scale)</text>`;
    s+=`<rect x="${L.x0}" y="${top}" width="${f1(Math.max(0,xn-L.x0))}" height="${L.ax-top}" style="fill:var(--accent);opacity:.05"/><line x1="${f1(xn)}" x2="${f1(xn)}" y1="${top}" y2="${L.ax}" style="stroke:var(--accent);stroke-width:1.4;opacity:.6"/>`;
    /* lanes */
    const lanes=[
      {n:'Xpert MTB/RIF · Ultra',tm:'< 2 h',ready:1.8,r:S.xp,g:(x,y,p,d)=>cart(x,y,p,d&&S.xp[1]?'var(--tb)':'var(--accent)')},
      {n:'Urine LF-LAM',tm:'bedside',ready:.6,r:S.lam,g:(x,y,p,d)=>strip(x,y,S.lam&&S.lam[1],p)},
      {n:'Smear microscopy',tm:'about 1 day',ready:24,r:S.sm,g:(x,y,p,d)=>slide(x,y,S.sm[1],d?1:0)},
      {n:'Liquid culture (MGIT)',tm:sc==='pos'?'10–14 days':'median 14 days',ready:S.lc[0],r:S.lc[1],g:(x,y,p,d)=>tube(x,y,'liq',d&&S.lc[1][1]?1:0,p)},
      {n:'Solid culture (LJ)',tm:sc==='pos'?'3–4 weeks':'median 25 days',ready:S.sc[0],r:S.sc[1],g:(x,y,p,d)=>tube(x,y,'sol',d&&S.sc[1][1]?ramp(now,S.sc[0],S.sc[0]*1.3)*.5+.5:0,p)},
      {n:'Phenotypic DST',tm:'1–2 wk after growth',ready:S.lc[0]+336,start:S.lc[0],r:S.dst,g:(x,y,p,d)=>dstG(x,y,d,1)}];
    lanes.forEach((ln,i)=>{const y=L.ly+i*L.lh,off=!ln.r,st=ln.start||.5,x0=X(st),xr=X(ln.ready),p=clamp((Math.log10(now)-Math.log10(st))/(Math.log10(ln.ready)-Math.log10(st))),done=now>=ln.ready&&!off,started=now>=st;
      if(L.lab==='left'){s+=`<text x="12" y="${y-2}" class="t-lbl" style="font-size:12.5px;${off?'opacity:.45':''}">${ln.n}</text><text x="12" y="${y+12}" class="t-xs">${ln.tm}</text>`}
      else s+=`<text x="${L.x0}" y="${y-44}" class="t-lbl" style="font-size:12px;${off?'opacity:.45':''}">${ln.n} <tspan class="t-xs" style="font-weight:400">· ${ln.tm}</tspan></text>`;
      s+=`<line x1="${f1(x0)}" x2="${L.x1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
      if(off){s+=`<text x="${f1(X(4))}" y="${y-6}" class="t-xs">${i===1?'used in people with HIV':'no isolate to test'}</text>`;return}
      s+=`<line x1="${f1(xr)}" x2="${f1(xr)}" y1="${y-8}" y2="${y+8}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      if(started)s+=`<line x1="${f1(x0)}" x2="${f1(lerp(x0,xr,p))}" y1="${y}" y2="${y}" style="stroke:var(--accent);stroke-width:3;stroke-linecap:round;opacity:.7"/>`;
      if(i===5&&started){[[480,'LPA 20 d'],[2544,N?'106 d':'routine DST 106 d']].forEach(([h,l],k)=>{s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${y-6}" y2="${y+12}" style="stroke:var(--warn);stroke-width:1.6"/><text x="${f1(X(h)+(k?2:-3))}" y="${y+22}" class="t-xs t-end" style="fill:var(--warn)">${l}</text>`})}
      if(!started){s+=`<text x="${f1(x0-4)}" y="${y-6}" class="t-xs t-end">starts when culture grows</text>`;return}
      const gx=lerp(x0,xr,p);s+=ln.g(gx,y,p,done);
      if(done){const right=gx>(N?250:560);s+=flag(gx,y,ln.r[0],ln.r[1],right,N)}});
    svg.innerHTML=s;
    const ph=phaseOf(DX_STEPS,t);setSt(ph);
    const ready=lanes.filter(l=>l.r&&now>=l.ready).map(l=>l.n.split(' ')[0]+(l.r[1]?' +':' −'));
    $('#dxRead').innerHTML=`<span>time since sample <b>${dxFmt(now)}</b></span><span>results in <b>${ready.length?ready.join(' · '):'none yet'}</b></span>`;
    const P=DX_STEPS[ph];
    $('#dxNote').innerHTML=noteHTML({k:P.k,t:P.t,txt:P.txt.all+(P.txt[sc]||''),pt:P.pt,hook:P.hook});
  }
  const stop=playWire(rg,$('#dxPlay'),draw,22000,'Replay','diagnose');
  setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  $$('[data-dxs]').forEach(b=>b.addEventListener('click',()=>{sc=b.dataset.dxs;$$('[data-dxs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- icon array: 100 people ---- */
  const TT={
   smear1:{n:'One sputum smear',se:53.8,sp:90,spL:'90% or more',c:`[[Lewinsohn2017]]`,x:`The first specimen finds 53.8% of culture-confirmed TB. Specificity is 90% or more; here 90 is drawn.`},
   smear3:{n:'Three sputum smears',se:70,sp:90,spL:'90% or more',c:`[[Lewinsohn2017]]`,x:`Three specimens find about 70%; the third adds only 2–5%. Fluorescence microscopy adds about 10%. [[Steingart2006Fluor]]`},
   xpert:{n:'Xpert MTB/RIF',se:84.7,sp:98.4,c:`[[Zifodya2021]]`,x:`Per 1,000 people with symptoms at 10% prevalence, Xpert MTB/RIF would miss 15 cases and wrongly diagnose 14.`},
   ultra:{n:'Xpert Ultra',se:90.9,sp:95.6,c:`[[Zifodya2021]]`,x:`Ultra trades a little specificity for sensitivity: per 1,000 people with symptoms at 10% prevalence it would miss 9 and wrongly diagnose 40. In people with previous TB its specificity was 88.2%.`},
   culture:{n:'Liquid culture',se:88,sp:99.6,seL:'88–90%',c:`[[Lewinsohn2017,Cruciani2004]]`,x:`Culture is the usual reference standard. The guideline gives liquid culture 88–90% sensitivity (88 drawn); MGIT 960 was 99.6% specific for mycobacteria, but growth must be identified, because some is non-tuberculous. [[Chihota2010]]`},
   lam:{n:'Urine LF-LAM',se:42,sp:91,c:`[[Bjerrum2019]]`,x:`In adults with HIV and TB symptoms. Sensitivity was 52% in inpatients and 29% in outpatients, and rose as CD4 fell; it is an add-on to other tests, not a stand-alone. [[WHO-Mod3-2024]]`}};
  const ic=$('#dxIco');let tk='xpert',grp='tb',stopI=null;
  function drawI(p){const N=vb(ic,'720 236','400 486'),k=TT[tk],v=grp==='tb'?k.se:100-k.sp,n=Math.round(v),shown=Math.round(n*p);
    const cols=N?10:20,dx=N?37:34,dy=N?44:40,s0=N?30:28,x0=N?20:20,y0=N?36:30;let s='';
    s+=`<text x="${x0}" y="${y0-12}" class="t-sm" style="fill:var(--ink)">${grp==='tb'?`${k.n}: finds ${shown} of 100 people with TB`:`${k.n}: wrongly flags ${shown} of 100 without TB`}</text>`;
    for(let i=0;i<100;i++){const x=x0+(i%cols)*dx+dx/2-8,y=y0+Math.floor(i/cols)*dy,hit=i<shown;
      const col=grp==='tb'?(hit?'var(--tb)':'var(--line)'):(hit?'var(--warn)':'var(--line)');
      s+=person(x+8,y,s0,col,{op:hit?1:.9});
      if(grp==='tb'&&!hit)s+=`<circle cx="${f1(x+8)}" cy="${f1(y+s0*.17)}" r="${f1(s0*.17+2)}" style="fill:none;stroke:var(--tb);stroke-width:1;opacity:.5"/>`}
    ic.innerHTML=s;
    $('#dxIcoCap').innerHTML=grp==='tb'?`Magenta: people with TB the test finds. Grey (ringed): people with TB it misses. Sensitivity ${k.seL||k.se+'%'}. ${k.c}`:`Amber: people without TB the test wrongly calls positive. Specificity ${k.spL||k.sp+'%'}. ${k.c}`;
    $('#dxIcoNote').innerHTML=noteHTML({k:grp==='tb'?'Sensitivity':'Specificity',t:k.n,txt:`Sensitivity ${k.seL||k.se+'%'}, specificity ${k.spL||k.sp+'%'}. ${k.c} ${k.x}`,
      pt:grp==='tb'?`Every grey figure is a person with TB whose test came back negative. That is why a negative test does not always mean no TB.`:`Every amber figure is a person without TB whose test came back positive. Doctors weigh a result with the whole picture.`,
      hook:`Ultra vs Xpert MTB/RIF: sensitivity 90.9% vs 84.7%, specificity 95.6% vs 98.4% (Cochrane). [[Zifodya2021]]`})}
  let tI=0;function runI(){if(stopI)stopI();clearTimeout(tI);drawI(0);stopI=animate(700,p=>drawI(ease(p)));tI=setTimeout(()=>{if(stopI)stopI();drawI(1)},760)}
  $$('[data-dxt]').forEach(b=>b.addEventListener('click',()=>{tk=b.dataset.dxt;$$('[data-dxt]').forEach(x=>x.setAttribute('aria-pressed',x===b));runI()}));
  $$('[data-dxv]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.dxv;$$('[data-dxv]').forEach(x=>x.setAttribute('aria-pressed',x===b));runI()}));
  drawI(1);

  /* ---- chest X-ray patterns ---- */
  const CX={
   cavity:{t:'Upper-lobe cavity',les:[{side:'R',u:.45,v:.12,r:13,kind:'cavity'},{side:'R',u:.58,v:.22,r:20,kind:'infiltrate'},{side:'L',u:.42,v:.14,r:7,kind:'nodule'}],lab:[['R',.45,.12,'cavity'],['R',.6,.25,'consolidation']],
    txt:`Post-primary TB, which develops long after infection, shows cavities, consolidation and small centrilobular nodules. [[Nachiappan2017]] Cavities characteristically form at the apex. [[Balasubramanian1994]] Cavitation is associated with poor outcomes, relapse, more transmission and drug resistance, and imaging findings such as cavitation feed into decisions like treatment length. [[Urbanowski2020,Nachiappan2017]] Diabetes goes with more cavitation; HIV with less. [[Pai2016]]`,
    pt:`A cavity is a hole where lung tissue has broken down. It holds huge numbers of germs, so people with cavities are usually more infectious.`,hook:`Upper-lobe cavity = classic post-primary (reactivation) TB in adults.`},
   miliary:{t:'Miliary pattern',les:[{kind:'miliary',side:'R',u:0,v:0}],lab:[['L',.7,.55,'tiny nodules, both lungs']],
    txt:`Miliary TB is haematogenously disseminated disease with tiny nodules throughout both lungs and involvement of many organs, more common in immunocompromised people. [[Nachiappan2017]] Clinical features are non-specific and the typical X-ray findings may appear only late, so a normal early film does not exclude it. [[Sharma2005]]`,
    pt:`Tiny spots scattered evenly through both lungs show that TB has spread through the blood.`,hook:`Miliary: uniform tiny nodules in both lungs; can be absent on the first film.`},
   effusion:{t:'Pleural effusion',eff:1,les:[{side:'R',u:.4,v:.5,r:10,kind:'infiltrate'}],lab:[['R',.55,.93,'fluid at the base']],
    txt:`Pleural effusion is part of primary TB, which follows soon after infection and is commonest in children and immunocompromised people. [[Nachiappan2017]] The pleura was the second commonest extrapulmonary site in US data (19.8%). [[Peto2009]] Pleural fluid ADA had a pooled sensitivity of 0.92 and specificity of 0.90; Xpert MTB/RIF on pleural fluid only 49.5% (Ultra 75.0%). [[Liang2008,Kohli2021]]`,
    pt:`Fluid collects between the lung and the chest wall. It shows as a white area at the bottom of the lung.`,hook:`TB pleural effusion: test the fluid for ADA; Xpert on pleural fluid is insensitive.`},
   nodes:{t:'Hilar lymph nodes',les:[{side:'R',u:.03,v:.3,r:10,kind:'node'},{side:'R',u:.1,v:.42,r:7,kind:'node'},{side:'R',u:.5,v:.6,r:17,kind:'infiltrate'}],lab:[['R',.05,.33,'enlarged hilar nodes'],['R',.55,.62,'consolidation']],
    txt:`Primary TB shows as lymphadenopathy, pulmonary consolidation and pleural effusion, and is commonest in children and immunocompromised people. [[Nachiappan2017]] In children, WHO treatment-decision algorithms score symptoms with or without an X-ray (sensitivity 0.86, specificity 0.37 with X-ray). [[Gunasekera2023]]`,
    pt:`In children, TB often shows as swollen glands in the middle of the chest, where the airways enter the lungs.`,hook:`Hilar nodes + consolidation = primary TB, typical in children.`},
   scar:{t:'Old, healed TB',les:[{side:'R',u:.4,v:.07,r:5,kind:'nodule'},{side:'R',u:.58,v:.12,r:4,kind:'nodule'},{side:'L',u:.48,v:.09,r:4,kind:'nodule'}],lab:[['R',.5,.09,'fibronodular scars']],scar:1,
    txt:`Inactive sequelae of previous TB show as fibronodular opacities in the apical and upper zones; radiographic stability over 6 months distinguishes inactive from active disease. [[Nachiappan2017]] Old scars confuse screening: X-ray software performs worse in people with previous TB, and Xpert Ultra specificity falls to 88.2%. [[Qin2021,Zifodya2021]]`,
    pt:`Healed TB can leave scars that stay on X-rays for life. Comparing with an older film helps show whether anything has changed.`,hook:`Stable for 6 months = inactive. Prior TB lowers CAD and Ultra specificity.`}};
  const cx=$('#dxCxr');let cur='cavity',stopC=null,tC=0;
  function drawC(p){const N=vb(cx,'520 330','400 330'),C=CX[cur],sc=N?1.3:1.38,lx=N?200-100*sc:260-100*sc,ly=22;
    let s=`<rect x="${N?6:40}" y="6" width="${N?388:440}" height="318" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const les=C.les.map(l=>Object.assign({},l,{r:(l.r||8)*Math.max(.05,p)}));
    const lg=lung(lx,ly,sc,{lesions:p>.05?les:[]});s+=lg.svg;if(C.eff)s+=dxEffusion(lx,ly,sc,p);
    if(C.scar&&p>.3)[[.35,.05,.6,.15],[.5,.04,.7,.2]].forEach(a=>{const [x1,y1]=lg.at('R',a[0],a[1]),[x2,y2]=lg.at('R',a[2],a[3]);s+=`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:var(--fibro);stroke-width:2;opacity:${f1(p)}"/>`});
    s+=`<text x="${N?16:52}" y="26" class="t-sm" style="fill:var(--ink)">R</text><text x="${N?384:468}" y="26" class="t-sm t-end" style="fill:var(--ink)">L</text>`;
    let lastY=-99;if(p>.6)C.lab.forEach(([sd,u,v,l],i)=>{const [px,py]=lg.at(sd,u,v),R=sd==='L',tx=R?(N?388:472):(N?12:46),ty=Math.max(py+3,lastY+16);lastY=ty;const ex=R?tx-l.length*5.7-3:tx+l.length*5.7+3,op=f1(ramp(p,.6,1));
      s+=`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(ex)}" y2="${f1(ty-3)}" style="stroke:var(--tb);stroke-width:1;opacity:${op}"/><rect x="${f1(R?ex:tx-2)}" y="${f1(ty-10)}" width="${f1(l.length*5.7+5)}" height="13" rx="3" style="fill:var(--panel-2);opacity:${op}"/><text x="${tx}" y="${f1(ty)}" class="t-xs${R?' t-end':''}" style="fill:var(--tb);opacity:${op}">${l}</text>`});
    s+=`<text x="${N?386:470}" y="316" class="t-xs t-end">schematic</text>`;
    cx.innerHTML=s;
    $('#dxCxrNote').innerHTML=noteHTML({k:'Chest X-ray',t:C.t,txt:C.txt,pt:C.pt,hook:C.hook})}
  $$('[data-cx]').forEach(b=>b.addEventListener('click',()=>{cur=b.dataset.cx;$$('[data-cx]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopC)stopC();clearTimeout(tC);drawC(0);stopC=animate(900,p=>drawC(ease(p)));tC=setTimeout(()=>{if(stopC)stopC();drawC(1)},960)}));
  drawC(1);
  redraws.diagnose=(()=>{const prv=redraws.diagnose;return()=>{prv&&prv();drawI(1);drawC(1)}})();
};
