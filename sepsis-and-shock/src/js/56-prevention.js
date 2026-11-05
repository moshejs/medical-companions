/* ===== 5.6 Preventing sepsis ===== */
/* The chain is schematic (the share of germs a barrier stops is not a measurement). The bars under it are the
   published numbers for that barrier: pairs are [before, after] on their own scale, singles are efficacy %. */
const PV_BAR=[{n:'clean hands',s:'hands'},{n:'line & catheter bundles',s:'lines'},{n:'childhood vaccines',s:'child vax'},{n:'adult & pregnancy vaccines',s:'adult vax'},{n:'care around birth',s:'birth'}];
const PV_STEPS=[
 {k:'The chain',t:'Infection comes first',sub:'no infection, no sepsis',
  bars:[{l:'Sepsis cases worldwide, 2017',v:[48.9],u:' million',max:60,c:'var(--accent)'},{l:'Sepsis-related deaths, 2017',v:[11.0],u:' million',max:60,c:'var(--muted)'},{l:'Age-standardised incidence (1990 = 100)',v:[100,63.0],u:'',lab:['1990','2017']},{l:'Age-standardised mortality (1990 = 100)',v:[100,47.2],u:'',lab:['1990','2017']}],
  txt:`GBD 2017 estimated 48.9 million sepsis cases and 11.0 million sepsis-related deaths, 19.7% of all deaths worldwide; age-standardised incidence fell 37.0% and mortality 52.8% from 1990 to 2017 (drawn as an index, 1990 = 100). [[Rudd2020GBD]] Sepsis is a dysregulated host response to infection, so every barrier that stops an infection, or stops it spreading, removes a possible case. [[Singer2016Sepsis3]]`,
  pt:`Sepsis always starts with an infection. Fewer infections means fewer people with sepsis.`,
  hook:`Global sepsis burden 2017: 48.9 million cases, 11.0 million deaths. [[Rudd2020GBD]]`},
 {k:'Barrier 1',t:'Clean hands',sub:'a hospital-wide hand rub campaign',
  bars:[{l:'Hand hygiene compliance',v:[48,66],u:'%',lab:['1994','1997']},{l:'Patients with a hospital infection',v:[16.9,9.9],u:'%',lab:['1994','1998']},{l:'MRSA transmission per 10,000 patient-days',v:[2.16,0.93],u:'',lab:['1994','1998']}],
  txt:`In Geneva, bedside alcohol hand rub raised compliance from 48% to 66%, while healthcare-associated infection fell from 16.9% to 9.9% and MRSA transmission from 2.16 to 0.93 per 10,000 patient-days. [[Pittet2000HandHygiene]] WHO's five moments define when to clean hands during care. [[Sax2007FiveMoments]]`,
  pt:`Clean hands, in hospital and at home, stop germs from spreading. [[Pittet2000HandHygiene]]`,
  hook:`Pittet 2000: compliance 48% → 66%; hospital infection 16.9% → 9.9%. [[Pittet2000HandHygiene]]`},
 {k:'Barrier 2',t:'Safer lines and catheters',sub:'checklists and bundles',
  bars:[{l:'Line bloodstream infections /1,000 catheter-days',v:[7.7,1.4],u:'',lab:['baseline','16–18 mo']},{l:'Catheter UTI, non-ICU, /1,000 catheter-days',v:[2.28,1.54],u:'',lab:['baseline','later']}],
  txt:`An evidence-based central-line intervention in 103 Michigan ICUs cut catheter-related bloodstream infection from 7.7 to 1.4 per 1,000 catheter-days (IRR 0.34). [[Pronovost2006CLABSI]] A national urinary catheter programme lowered non-ICU infection from 2.28 to 1.54 per 1,000 catheter-days, with ICU rates largely unchanged. [[Saint2016CAUTI]]`,
  pt:`Tubes into veins and the bladder can let germs in. In hospitals that used a set checklist for putting in and caring for central lines, these infections fell sharply. [[Pronovost2006CLABSI]]`,
  hook:`Pronovost checklist bundle: CLABSI 7.7 → 1.4 per 1,000 catheter-days. [[Pronovost2006CLABSI]]`},
 {k:'Barrier 3',t:'Childhood vaccines',sub:'Hib, pneumococcal, meningococcal',
  bars:[{l:'Hib disease, under 5s, per 100,000',v:[37,11],u:'',lab:['1989','1991']},{l:'Invasive pneumococcal, under 2s, per 100,000',v:[188.0,59.0],u:'',lab:['1998–99','2001']},{l:'Same, adults 65+ (herd effect), per 100,000',v:[60.1,49.5],u:'',lab:['1998–99','2001']},{l:'MenB cases in eligible cohorts, 3 years',v:[253,63],u:'',lab:['expected','observed']}],
  txt:`Hib disease in US children under 5 fell 71% after conjugate vaccines. [[Adams1993Hib]] After PCV7, invasive pneumococcal disease in under-2s fell 69%, and unvaccinated adults benefited too. [[Whitney2003PCV7]] MenC vaccine was 94% effective in England, with a 67% fall in unvaccinated children. [[Ramsay2003MenC]] Over 3 years of infant 4CMenB, 63 MenB cases occurred against 253 expected. [[Ladhani2020MenB]]`,
  pt:`Vaccines in childhood prevent several infections that can cause sepsis and meningitis, and protect others by reducing spread. [[Whitney2003PCV7,Adams1993Hib,Ladhani2020MenB]]`,
  hook:`Herd effect: PCV7 in infants lowered adult invasive pneumococcal disease. [[Whitney2003PCV7]] 4CMenB: individual estimates imprecise, population impact clear. [[Parikh2016MenB,Ladhani2020MenB]]`},
 {k:'Barrier 4',t:'Adult and pregnancy vaccines',sub:'efficacy in randomised trials',
  bars:[{l:'PCV13, vaccine-type invasive disease (65+)',v:[75.0],u:'%',max:100,c:'var(--rx)'},{l:'PCV13, vaccine-type pneumonia (65+)',v:[45.6],u:'%',max:100,c:'var(--rx)'},{l:'BNT162b2, COVID-19',v:[95],u:'%',max:100,c:'var(--rx)'},{l:'RSVPreF3 OA, RSV lower resp. disease (60+)',v:[82.6],u:'%',max:100,c:'var(--rx)'},{l:'Maternal RSVpreF, severe infant illness, 90 d',v:[81.8],u:'%',max:100,c:'var(--rx)'},{l:'Nirsevimab, infant RSV hospitalisation',v:[83.2],u:'%',max:100,c:'var(--rx)'}],
  txt:`CAPiTA: PCV13 75.0% against vaccine-type invasive disease and 45.6% against vaccine-type pneumonia, but not all-cause pneumonia. [[Bonten2015CAPiTA]] BNT162b2: 95% against COVID-19. [[Polack2020BNT162b2]] RSV vaccines in adults 60 and over: 82.6% (RSVPreF3 OA) and 85.7% (RSVpreF, 3 or more signs). [[Papi2023RSV,Walsh2023RSV]] For infants: maternal RSVpreF 81.8% and nirsevimab 83.2% against hospitalisation. [[Kampmann2023MATISSE,Drysdale2023HARMONIE]] ACIP recommends annual flu vaccination for everyone 6 months and over. [[Grohskopf2024ACIP]]`,
  pt:`Vaccines against pneumococcus, flu, COVID-19 and RSV prevent many of the infections that can lead to sepsis. [[Bonten2015CAPiTA,Papi2023RSV]]`,
  hook:`CAPiTA: PCV13 prevents vaccine-type pneumonia and IPD, not all-cause pneumonia. [[Bonten2015CAPiTA]]`},
 {k:'Barrier 5',t:'Care around birth',sub:'prophylaxis for mother and baby',
  bars:[{l:'Early-onset GBS disease per 1,000 live births',v:[1.7,0.6],u:'',lab:['1993','1998']},{l:'Maternal sepsis or death (A-PLUS)',v:[2.4,1.6],u:'%',lab:['placebo','azithro']},{l:'Infection, operative vaginal birth (ANODE)',v:[19,11],u:'%',lab:['placebo','antibiotic']}],
  txt:`Intrapartum GBS prophylaxis: early-onset disease fell from 1.7 to 0.6 per 1,000 live births (1993–1998). [[Schrag2000GBS]] Oral azithromycin in labour lowered maternal sepsis or death from 2.4% to 1.6% (RR 0.67), not neonatal sepsis. [[Tita2023APLUS]] One antibiotic dose after operative vaginal birth: 11% vs 19%. [[Knight2019ANODE]]`,
  pt:`Antibiotics given at the right moment around birth protect many mothers and newborns from serious infection. [[Schrag2000GBS,Tita2023APLUS]]`,
  hook:`A-PLUS: azithromycin lowered maternal sepsis or death (RR 0.67) but not neonatal sepsis. [[Tita2023APLUS]]`},
 {k:'Barrier 6',t:'Knowing the signs',sub:'between infection and sepsis',
  bars:[{l:'Never heard of "sepsis", 5 countries, 2009',v:[88],u:'%',max:100,c:'var(--warn)'},{l:'Australian parents who had heard of it, 2023',v:[61.6],u:'%',max:100,c:'var(--warn)'},{l:'Of those, thought they could recognise it',v:[27.8],u:'%',max:100,c:'var(--warn)'}],
  txt:`Awareness stops nothing at the first barrier, but can shorten the road from infection to treatment. In 2009, 88% in five countries had never heard of sepsis. [[Rubulotta2009Awareness]] In 2023, 61.6% of Australian parents had heard of it, yet only 27.8% of them thought they could recognise it. [[Peters2023Awareness]] <span class="ev early">Early evidence</span> Campaign effects are measured as knowledge, not outcomes. [[Brizuela2020STOPSEPSIS]]`,
  pt:`If someone with an infection gets much worse, ask: could this be sepsis?`,
  hook:`Meningococcal disease: leg pain, cold hands and feet and abnormal skin colour at about 8 h; rash late (13–22 h). [[Thompson2006Meningococcal]]`}
].map((s,i,a)=>Object.assign(s,{from:i/a.length,at:i/a.length+.6/a.length}));

const PV_MG=[
 {h0:0,h1:5,t:'Non-specific symptoms only',d:'most children, first 4–6 h',c:'var(--muted)'},
 {h0:8,t:'Early sepsis signs',d:'leg pains, cold hands and feet, abnormal skin colour (median 8 h)',c:'var(--warn)'},
 {h0:13,h1:22,t:'Classic signs',d:'rash, neck stiffness, confusion (median 13–22 h)',c:'var(--bad)'},
 {h0:19,t:'Hospital admission',d:'median 19 h',c:'var(--dx)'},
 {h0:24,t:'Close to death',d:'by 24 h, for many',c:'var(--bad)'}
];

inits.prevention=()=>{
  const svg=$('#pvSvg'),rg=$('#pvT'),N=PV_STEPS.length;let setSt=()=>{};
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const fmt=v=>v>=100?String(Math.round(v)):String(+v.toFixed(2));
  function bars(x,y,w,rows,nr){let s='';const rh=nr?44:28,lw=nr?0:300,bw=w-lw-90;
    rows.forEach((r,i)=>{const yy=y+i*rh,bx=x+lw,by=nr?yy+14:yy,mx=r.max||Math.max(...r.v);
      s+=T(x,nr?yy+8:yy+10,r.l,'t-xs','fill:var(--ink)');
      if(r.v.length===1){const L=bw*r.v[0]/mx;s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(L)}" height="12" rx="3" style="fill:${r.c}"/>`+T(bx+L+5,by+10,fmt(r.v[0])+r.u,'t-xs','fill:var(--ink);font-weight:700')}
      else{const h=6,[a,b]=r.v,La=bw*a/mx,Lb=bw*b/mx;
        s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(La)}" height="${h}" rx="2" style="fill:var(--muted);opacity:.6"/><rect x="${f1(bx)}" y="${f1(by+h+1)}" width="${f1(Lb)}" height="${h}" rx="2" style="fill:var(--rec)"/>`;
        s+=T(bx+La+5,by+6,`${r.lab[0]}: ${fmt(a)}${r.u}`,'t-xs')+T(bx+Lb+5,by+h+7,`${r.lab[1]}: ${fmt(b)}${r.u}`,'t-xs','fill:var(--rec);font-weight:700')}});
    return s}
  function draw(t){
    const nr=vb(svg,'720 424','400 600'),ph=phaseOf(PV_STEPS,t),S=PV_STEPS[ph],u=clamp((t-S.from)*N);let s=`<defs>${marker('pvA','var(--muted)')}</defs>`;
    s+=T(nr?14:20,26,S.t,'t-big')+T(nr?14:20,43,S.sub,'t-sm');
    const cy=nr?132:130,sx=nr?26:50,ix=nr?300:470,ex=nr?374:660,b0=nr?72:130,bd=nr?44:62;
    const BX=PV_BAR.map((b,i)=>b0+i*bd),sgX=nr?338:565;
    /* nodes: germs, infection, sepsis */
    s+=`<circle cx="${sx}" cy="${cy}" r="${nr?20:28}" style="fill:var(--pathogen);opacity:.12"/>`+bacterium(sx-6,cy-5,nr?12:15,{ang:30})+virus(sx+8,cy+7,nr?9:11)+T(sx,cy+(nr?38:46),'germs','t-xs t-mid','fill:var(--ink);font-weight:700');
    s+=organ('lung',ix,cy,nr?30:40,{glow:.8})+T(ix,cy+(nr?38:46),'infection','t-xs t-mid','fill:var(--ink);font-weight:700');
    s+=organ('kidney',ex,cy,nr?26:38,{fail:.85})+T(ex,cy+(nr?38:46),'sepsis','t-xs t-mid','fill:var(--bad);font-weight:700');
    s+=`<path d="M${sx+30} ${cy-34}H${ex-20}" style="stroke:var(--line);stroke-width:1.2" marker-end="url(#pvA)"/>`;
    /* barriers */
    const act=PV_BAR.map((b,i)=>i+1<ph?1:i+1===ph?ease(clamp(u*3)):0),sgA=ph===6?ease(clamp(u*3)):0;
    PV_BAR.forEach((b,i)=>{const x=BX[i],a=act[i];if(a<=0){s+=`<line x1="${x}" x2="${x}" y1="${cy-22}" y2="${cy+22}" style="stroke:var(--line);stroke-dasharray:2 4"/>`;return}
      s+=`<g style="opacity:${f1(a)}"><rect x="${x-4}" y="${cy-26}" width="8" height="52" rx="4" style="fill:var(--rec)"/>${T(x,(i%2&&nr)?cy+46:cy-32,b.s,'t-xs t-mid','fill:var(--rec);font-weight:700')}</g>`});
    if(sgA>0)s+=`<g style="opacity:${f1(sgA)}"><rect x="${sgX-4}" y="${cy-26}" width="8" height="52" rx="4" style="fill:var(--warn)"/>${T(sgX,cy-32,'signs','t-xs t-mid','fill:var(--warn);font-weight:700')}</g>`;
    /* the stream: each germ meets the barriers in turn; an active barrier stops a schematic share */
    const rr=rng(7),ph0=t*28,NP=nr?22:30;let through=0,inf=0;
    for(let i=0;i<NP;i++){const seed=rr(),lane=(rr()-.5)*30,stopAt=PV_BAR.findIndex((b,j)=>act[j]>.5&&rng(i*13+j*7+1)()<.32);
      const sgStop=sgA>.5&&rng(i*5+3)()<.4,p=(ph0*.12+seed)%1,x=lerp(sx+24,ex-14,p);
      const wall=stopAt>=0?BX[stopAt]-8:sgStop?sgX-8:Infinity,xx=Math.min(x,wall),stopped=x>wall;
      if(!stopped&&x>ix-10)inf++;if(!stopped&&x>ex-40)through++;
      const y=cy+lane*(1-Math.abs(Math.sin(p*Math.PI))*.3),op=stopped?Math.max(0,1-(x-wall)/80):1;
      if(op>0)s+=(i%3?bacterium(xx,y,7,{ang:p*400,op}):virus(xx,y,6,{op}))}
    s+=T(nr?14:20,nr?196:204,'schematic: shares stopped are not to scale','t-xs','font-style:italic');
    s+=T(nr?14:20,nr?220:230,`Published numbers · ${S.k}`,'t-sm','fill:var(--ink);font-weight:700');
    s+=bars(nr?14:20,nr?236:246,nr?372:680,S.bars,nr);
    svg.innerHTML=s;setSt(ph);$('#pvNote').innerHTML=noteHTML(S)}
  const stop=playWire(rg,$('#pvPlay'),draw,32000,'Replay','prevention');
  setSt=stepWire($('#pvSteps'),PV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the first 24 hours of meningococcal disease ---------- */
  const ms=$('#pvMgSvg'),mr=$('#pvMgT');
  function mg(v){const nr=vb(ms,'720 270','400 470'),h=v*24;let s='';
    const B=body(nr?60:76,nr?16:22,nr?.62:.82,{id:'pvMgB',cold:ramp(h,6.5,9.5),mottle:ramp(h,8,11)*.7});s+=B.svg;
    if(nr){const c=ramp(h,6.5,9.5);s+=T(130,40,'What the drawing shows','t-sm','fill:var(--ink);font-weight:700')+T(130,58,h<6?'no clear warning signs yet':'early sepsis signs:','t-xs','fill:var(--ink)');
      if(h>=6)s+=`<g style="opacity:${f1(c)}">`+T(140,74,'cold, pale-blue hands and feet','t-xs','fill:var(--warn)')+T(140,88,'abnormal skin colour (mottling)','t-xs','fill:var(--warn)')+T(140,102,'leg pains (not drawn)','t-xs','fill:var(--warn)')+'</g>';
      s+=T(130,124,h<13?'no rash yet':'classic signs may appear now','t-xs',h<13?'':'fill:var(--bad);font-weight:700')}
    const x0=nr?20:170,x1=nr?384:700,ty=nr?430:236,X=hh=>x0+(x1-x0)*hh/24;
    s+=`<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" class="axis"/>`;
    [0,4,8,12,16,20,24].forEach(k=>{s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ty-3}" y2="${ty+3}" class="axis"/><text x="${f1(X(k))}" y="${ty+15}" class="t-xs t-mid">${k} h</text>`});
    s+=`<rect x="${x0}" y="${ty-5}" width="${f1(X(h)-x0)}" height="10" rx="5" style="fill:var(--rec-soft)"/>`;
    PV_MG.forEach((m,i)=>{const on=h>=m.h0,y=nr?196+i*44:24+i*40,cx=X(m.h0),cw=m.h1?X(m.h1)-cx:0,op=on?1:.3;
      if(cw)s+=`<rect x="${f1(cx)}" y="${ty-4}" width="${f1(cw)}" height="8" rx="4" style="fill:${m.c};opacity:${on?.55:.2}"/>`;
      else s+=`<circle cx="${f1(cx)}" cy="${ty}" r="5" style="fill:${on?m.c:'var(--panel)'};stroke:${m.c};stroke-width:1.6"/>`;
      const lx=nr?20:Math.min(cx,712-m.d.length*5.7);
      s+=`<g style="opacity:${f1(op)}">`+(nr?'':`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${y+16}" y2="${ty-6}" style="stroke:${m.c};stroke-width:1;stroke-dasharray:2 3"/>`)+T(lx,y+4,m.t,'t-sm',`fill:${m.c};font-weight:700`)+T(lx,y+16,m.d,'t-xs','fill:var(--ink)')+'</g>'});
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${ty-14}" y2="${ty+6}" style="stroke:var(--ink);stroke-width:2"/>`+T(X(h),ty-18,Math.round(h)+' h','t-xs t-mid','fill:var(--ink);font-weight:700');
    ms.innerHTML=s;
    const cur=PV_MG.filter(m=>h>=m.h0).pop();
    $('#pvMgCap').textContent=h<8?'Early on, meningococcal disease can look like any minor illness.':h<13?'Leg pains, cold hands and feet and abnormal skin colour often come hours before any rash: do not wait for a rash.':'Do not wait for a rash. Now: '+cur.t.toLowerCase()+' ('+cur.d+').'}
  playWire(mr,$('#pvMgPlay'),mg,16000,'Replay','prevention');
  mg(+mr.value);
};
