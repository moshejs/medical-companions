/* =============== 3.6 TB with HIV, in children & pregnancy =============== */
const HV_STEPS=[
 {from:0,at:.1,k:'Years with untreated HIV',t:'HIV removes TB\'s defenders',
  txt:`HIV is the strongest known risk factor for progressing from TB infection to TB disease [[Suthar2012]]. <i>M. tuberculosis</i>-specific CD4 T cells are depleted rapidly after HIV infection, while other memory T cells persist [[Geldmacher2010]], and in South African gold miners TB risk rose unexpectedly soon after HIV seroconversion [[Sonnenberg2005]]. In a methadone-programme cohort, people with HIV and a positive tuberculin test developed TB at 7.9 per 100 person-years, against 0.3 for people with HIV and a negative test [[Selwyn1989]]. The CD4 and risk curves here are drawn shapes, not data.`,
  pt:`HIV weakens exactly the immune cells that keep TB locked away, so TB can wake up.`,
  hook:`HIV raises the risk of TB disease, not of becoming infected: tuberculin positivity was similar with and without HIV [[Selwyn1989]].`},
 {from:.2,at:.3,k:'TB disease',t:'TB appears, often hidden',
  txt:`In 2024, an estimated 150 000 of the 1.23 million TB deaths were among people with HIV [[WHO-GTR2025]]. In autopsy studies of adults with HIV in resource-limited settings, TB was found in a pooled 39.7% of bodies, disseminated in 87.9% of those cases and undiagnosed at death in 45.8% [[GuptaRK2015AIDS]]. ART lowers TB incidence at every CD4 level (hazard ratio 0.35 overall) [[Suthar2012]]. A urine LAM test helps find TB in people with advanced HIV: see <a href="#diagnose" data-go="diagnose">Diagnosing TB disease</a>.`,
  pt:`TB is a leading cause of death in people with HIV, and it is often missed.`,
  hook:`Nearly half of TB found at autopsy in adults with HIV had not been diagnosed in life (45.8%) [[GuptaRK2015AIDS]].`},
 {from:.36,at:.44,k:'Week 0',t:'TB treatment starts',
  txt:`TB treatment comes first. Daily co-trimoxazole for people with HIV and smear-positive TB in Abidjan reduced deaths from 25.4 to 13.8 per 100 person-years [[Wiktor1999]]. Rifampicin speeds up the breakdown of many drugs, including dolutegravir: the US label says to give dolutegravir twice daily with rifampin in INSTI-naive adults [[FDA-Tivicay]], based on a study in which 50 mg twice daily with rifampin matched once-daily exposure without it [[Dooley2013]].`,
  pt:`TB medicines start first. Some HIV medicines need a dose change while TB medicines are taken.`,
  hook:`Dolutegravir goes twice daily with rifampicin [[FDA-Tivicay,Dooley2013]].`},
 {from:.5,at:.62,k:'Weeks 2 to 8, or later',t:'When to start ART',
  txt:`WHO recommends starting ART as soon as possible within 2 weeks of starting TB treatment, regardless of CD4 count (strong recommendation), except when there are signs of meningitis [[WHO-Mod4-2025]]. Starting ART can unmask a burst of inflammation as the immune system recovers: paradoxical TB-IRIS, which affected a pooled 18% of people starting ART, with 25% of them admitted to hospital and 2% of deaths attributed to it [[Namale2015]]. The window drawn after ART starts is schematic. Prednisone for 4 weeks in PredART (CD4 ≤100) lowered TB-IRIS from 46.7% to 32.5% [[Meintjes2018]].`,
  pt:`HIV medicines usually start within two weeks of TB medicines. A temporary flare of symptoms can follow, and it is usually manageable.`,
  hook:`TB-IRIS ≈ 18% after ART starts; prophylactic prednisone cut it by about 30% (RR 0.70) [[Namale2015,Meintjes2018]].`},
 {from:.76,at:.92,k:'SAPIT · CAMELIA · STRIDE',t:'Early ART saves lives',
  txt:`SAPIT: starting ART during TB treatment cut deaths from 12.1 to 5.4 per 100 person-years compared with waiting until it ended (HR 0.44) [[AbdoolKarim2010]]. CAMELIA (median CD4 25): ART at 2 rather than 8 weeks reduced deaths from 27% to 18% (HR 0.62) but raised TB-IRIS (HR 2.51) [[Blanc2011]]. STRIDE: overall, AIDS or death 12.9% vs 16.1% (not significant), but 15.5% vs 26.6% with CD4 below 50; TB-IRIS 11% vs 5% [[Havlir2011]]. In SAPIT's CD4 below 50 group, AIDS or death was 8.5 vs 26.3 per 100 person-years, and IRIS 20.1 vs 7.7 [[AbdoolKarim2011]].`,
  pt:`Starting HIV medicines early during TB treatment saves lives, most of all for people with very low CD4 counts.`,
  hook:`CAMELIA: ART at 2 weeks vs 8 weeks cut mortality from 27% to 18% [[Blanc2011]]. The lower the CD4, the bigger the benefit of early ART.`}];

inits.special=()=>{
  const svg=$('#hvSvg'),rg=$('#hvT');let art='early',cd='low',setSt=()=>{};
  /* schematic CD4 (cells/µL) and relative TB risk over years of untreated HIV */
  const cd4=y=>800*Math.exp(-y*.33);
  function draw(t){const N=vb(svg,'720 400','400 690'),ph=phaseOf(HV_STEPS,t);
    const A=N?{x0:46,x1:384,y0:70,y1:196}:{x0:56,x1:430,y0:72,y1:186};
    const B=N?{x0:46,x1:384,y0:252,y1:352}:{x0:56,x1:430,y0:250,y1:346};
    const C=N?{x0:20,x1:384,y0:404,y1:640}:{x0:470,x1:704,y0:56,y1:388};
    let s=`<defs>${marker('hvArr','var(--muted)')}</defs><text x="${N?16:24}" y="24" class="t-big">${HV_STEPS[ph].t}</text><text x="${N?16:24}" y="42" class="t-sm">${HV_STEPS[ph].k}</text>`;
    /* ---- panel A: years ---- */
    const yDx=cd==='low'?8.8:5,yr=lerp(0,yDx,ramp(t,0,.3)),X=y=>lerp(A.x0,A.x1,y/10),Yc=v=>lerp(A.y1,A.y0,Math.min(v,900)/900);
    s+=`<text x="${A.x0-40}" y="${A.y0-10}" class="t-sm">YEARS WITH HIV, NO ART (SCHEMATIC)</text>`;
    [0,200,500,800].forEach(v=>s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${f1(Yc(v))}" y2="${f1(Yc(v))}" class="${v?'grid':'axis'}"/><text x="${A.x0-5}" y="${f1(Yc(v)+3)}" class="t-xs t-end">${v}</text>`);
    [0,2,4,6,8,10].forEach(y=>s+=`<text x="${f1(X(y))}" y="${A.y1+12}" class="t-xs t-mid">${y}</text>`);
    s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${f1(Yc(50))}" y2="${f1(Yc(50))}" style="stroke:var(--bad);stroke-dasharray:4 3;opacity:.8"/><text x="${A.x1}" y="${f1(Yc(50)-3)}" class="t-xs t-end" style="fill:var(--bad)">CD4 50</text>`;
    if(yr>0){s+=`<path d="${pathFn(u=>Math.min(900,Math.max(0,cd4(u*yr)))/900,A.x0,X(yr),A.y1,A.y0,80)}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>`;
      s+=`<path d="${pathFn(u=>.06+.88*Math.pow(u*yr/10,1.6)+.1*ramp(u*yr,0,.6),A.x0,X(yr),A.y1,A.y0,80)}" style="fill:none;stroke:var(--tb);stroke-width:2.4;stroke-dasharray:6 3"/>`;
      s+=`<circle cx="${f1(X(yr))}" cy="${f1(Yc(Math.max(0,cd4(yr))))}" r="4" style="fill:var(--accent)"/>`}
    s+=`<text x="${A.x0+6}" y="${A.y0+10}" class="t-xs" style="fill:var(--accent)">— CD4 count (cells/µL)</text><text x="${A.x0+6}" y="${A.y0+23}" class="t-xs" style="fill:var(--tb)">- - TB risk (relative, drawn)</text>`;
    if(t>=.2){const px=X(yDx),py=Yc(Math.max(0,cd4(yDx)));s+=`<g style="opacity:${f1(ramp(t,.2,.26))}"><circle cx="${f1(px)}" cy="${f1(py)}" r="9" style="fill:none;stroke:var(--tb);stroke-width:2"/><text x="${f1(px-12)}" y="${f1(py-16)}" class="t-lbl t-end" style="fill:var(--tb);paint-order:stroke;stroke:var(--panel);stroke-width:4">TB disease · CD4 ≈ ${Math.round(cd4(yDx)/10)*10}</text></g>`}
    s+=`<text x="${A.x1}" y="${A.y1+24}" class="t-xs t-end">years</text>`;
    /* ---- panel B: weeks from TB treatment start ---- */
    const kB=ramp(t,.34,.42),wk=lerp(0,32,ramp(t,.36,.74)),W=w=>lerp(B.x0,B.x1,w/32);
    s+=`<g style="opacity:${f1(.25+.75*kB)}"><text x="${B.x0-40}" y="${B.y0-12}" class="t-sm">WEEKS FROM STARTING TB TREATMENT</text>`;
    [0,2,8,26,32].forEach(w=>s+=`<line x1="${f1(W(w))}" x2="${f1(W(w))}" y1="${B.y0}" y2="${B.y1}" class="${w?'grid':'axis'}"/><text x="${f1(W(w))}" y="${B.y1+12}" class="t-xs t-mid">${w}</text>`);
    s+=`<rect x="${f1(W(0))}" y="${B.y0+6}" width="${f1(W(Math.min(wk,26))-W(0))}" height="20" rx="5" style="fill:var(--rx);opacity:.85"/><text x="${f1(W(0)+6)}" y="${B.y0+20}" class="t-xs" style="fill:#0f1f17">TB treatment (6 months)</text>`;
    const aw=art==='early'?2:8;
    [ [2,'early: week 2'],[8,'later: week 8'],[27,'SAPIT sequential: after TB treatment']].forEach(([w,l],i)=>{const sel=(art==='early'&&i===0)||(art==='late'&&i===1),x=W(w),ry=B.y0+36+i*(N?19:18);
      const show=wk>=w||sel&&t>=.5;
      s+=`<g style="opacity:${show?(sel?1:.4):.12}"><rect x="${f1(x)}" y="${ry}" width="${f1(Math.max(0,W(Math.min(32,Math.max(w,wk)))-x))}" height="12" rx="4" style="fill:var(--vax);opacity:${sel?.9:.5}"/><text x="${f1(i===2?x-4:x+4)}" y="${ry+10}" class="t-xs${i===2?' t-end':''}" style="fill:var(--ink)">ART ${l}</text></g>`});
    if(t>=.5&&wk>=aw){const k=ramp(wk,aw,aw+1);s+=`<rect x="${f1(W(aw))}" y="${B.y0}" width="${f1(W(aw+5)-W(aw))}" height="${B.y1-B.y0}" style="fill:var(--warn);opacity:${f1(.18*k)}"/><text x="${f1(W(aw))}" y="${B.y1+25}" class="t-xs" style="fill:var(--warn)">▲ TB-IRIS window after ART starts (drawn)</text>`}
    s+=`<line x1="${f1(W(wk))}" x2="${f1(W(wk))}" y1="${B.y0}" y2="${B.y1}" style="stroke:var(--ink);opacity:.35"/></g>`;
    /* ---- panel C: trial outcomes ---- */
    const kC=ramp(t,.76,.88),low=cd==='low';
    const D=low?[
      {tr:'SAPIT, CD4 <50',u:'AIDS/death per 100 py',e:8.5,l:26.3,lab:['earlier','later']},
      {tr:'STRIDE, CD4 <50',u:'AIDS or death, %',e:15.5,l:26.6,lab:['earlier','later']},
      {tr:'CAMELIA, median CD4 25',u:'deaths, %',e:18,l:27,lab:['week 2','week 8']}]
     :[{tr:'SAPIT, CD4 <500',u:'deaths per 100 py',e:5.4,l:12.1,lab:['during TB Rx','after']},
      {tr:'STRIDE, CD4 <250',u:'AIDS or death, % (n.s.)',e:12.9,l:16.1,lab:['earlier','later']},
      {tr:'CAMELIA, median CD4 25',u:'deaths, %',e:18,l:27,lab:['week 2','week 8']}];
    const I=low?[{tr:'SAPIT CD4 <50 (per 100 py)',e:20.1,l:7.7},{tr:'STRIDE (%)',e:11,l:5}]:[{tr:'STRIDE (%)',e:11,l:5},{tr:'pooled, 40 studies (%)',e:18,l:null}];
    s+=`<text x="${C.x0}" y="${C.y0+4}" class="t-sm">${low?'CD4 BELOW 50':'ALL CD4 LEVELS STUDIED'}</text>`;
    const gh=N?44:52,mx=30,BW=v=>v/mx*(C.x1-C.x0-96);
    D.forEach((d,i)=>{const y=C.y0+20+i*gh;s+=`<text x="${C.x0}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${d.tr} · ${d.u}</text>`;
      [ ['e',d.e,d.lab[0]],['l',d.l,d.lab[1]]].forEach(([k,v,lb],j)=>{const sel=(art==='early')===(k==='e'),yy=y+13+j*14;
        s+=`<text x="${C.x0+60}" y="${yy+9}" class="t-xs t-end">${lb}</text><rect x="${C.x0+64}" y="${yy}" width="${f1(BW(v)*kC)}" height="11" rx="3" style="fill:${k==='e'?'var(--rx)':'var(--muted)'};opacity:${sel?1:.45};stroke:${sel?'var(--ink)':'none'}"/>`;
        if(kC>.95)s+=`<text x="${f1(C.x0+68+BW(v))}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${v}</text>`})});
    const iy=C.y0+20+D.length*gh+14;
    s+=`<text x="${C.x0}" y="${iy}" class="t-sm" style="fill:var(--warn)">THE TRADE-OFF: TB-IRIS</text>`;
    I.forEach((d,i)=>{const y=iy+12+i*(N?40:44);s+=`<text x="${C.x0}" y="${y+6}" class="t-xs" style="fill:var(--ink)">${d.tr}</text>`;
      [ ['e',d.e,'earlier'],['l',d.l,'later']].forEach(([k,v,lb],j)=>{if(v==null)return;const yy=y+11+j*14,sel=(art==='early')===(k==='e');
        s+=`<text x="${C.x0+60}" y="${yy+9}" class="t-xs t-end">${d.l==null?'starting ART':lb}</text><rect x="${C.x0+64}" y="${yy}" width="${f1(BW(v)*kC)}" height="11" rx="3" style="fill:${k==='e'?'var(--warn)':'var(--muted)'};opacity:${sel||d.l==null?1:.45}"/>`;
        if(kC>.95)s+=`<text x="${f1(C.x0+68+BW(v))}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${v}</text>`})});
    if(kC<.05)s+=`<text x="${C.x1}" y="${C.y0+4}" class="t-xs t-end" style="fill:var(--warn)">bars fill in at step 5</text>`;
    svg.innerHTML=s;setSt(ph);
    $('#hvNote').innerHTML=noteHTML(HV_STEPS[ph]);
    $('#hvRead').innerHTML=`<span>ART <b>${art==='early'?'early (within 2 weeks)':'deferred (week 8)'}</b></span><span>CD4 group <b>${low?'below 50':'all levels'}</b></span><span>highlighted bars <b>${art==='early'?'early-ART arms':'later-ART arms'}</b></span>`;
  }
  const stop=playWire(rg,$('#hvPlay'),draw,24000,'Replay','special');
  setSt=stepWire($('#hvSteps'),HV_STEPS,rg,draw,stop);
  $$('[data-art]').forEach(b=>b.addEventListener('click',()=>{art=b.dataset.art;$$('[data-art]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-cd]').forEach(b=>b.addEventListener('click',()=>{cd=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- children: age bands ---- */
  const kid=$('#hvKid');let ag=0,era='pre';
  const AG=[{n:'under 1',a:0,b:1,m:'often',u5:1},{n:'1–2 years',a:1,b:2,m:'often',u5:1},{n:'2–5 years',a:2,b:5,m:'rare',u5:1},{n:'5–10 years',a:5,b:10,m:'rare',u5:0},{n:'over 10',a:10,b:15,m:'adult',u5:0}];
  const MT={often:['Often serious, and fast','Before age 2, primary infection often progressed to serious disease within 12 months, with little warning'],rare:['Rarely progressed','Between ages 2 and 10, infection rarely progressed to serious disease'],adult:['Often adult-type disease','After age 10, infection often led to adult-type (cavitary) disease']};
  function drawK(){const N=vb(kid,'720 300','400 '+(AG[ag].u5?450:340)),g=AG[ag];let s='';
    const R=N?{x0:20,x1:380,y:40}:{x0:24,x1:696,y:40},BX=[0,1,2,5,10,15],XA=a=>{const i=Math.max(0,BX.findIndex(v=>v>=a)-1),j=Math.min(i+1,5);return lerp(R.x0,R.x1,(i+(a-BX[i])/(BX[j]-BX[i]||1))/5)};
    s+=`<text x="${R.x0}" y="18" class="t-sm">${N?'AGE AT INFECTION (MARAIS 2004)':'AGE AT INFECTION · PRE-TREATMENT-ERA PATTERN (MARAIS 2004)'}</text>`;
    AG.forEach((b,i)=>{const on=i===ag,c=b.m==='often'?'var(--bad)':b.m==='rare'?'var(--good)':'var(--warn)';
      s+=`<rect x="${f1(XA(b.a)+1)}" y="${R.y}" width="${f1(XA(b.b)-XA(b.a)-2)}" height="26" rx="5" style="fill:${c};fill-opacity:${on?.85:.22};stroke:${on?'var(--ink)':'none'};stroke-width:1.5"/>`;
      s+=`<text x="${f1((XA(b.a)+XA(b.b))/2)}" y="${R.y+17}" class="t-xs t-mid" style="fill:${on?'#141414':'var(--ink)'}">${b.n}</text>`});
    [0,1,2,5,10,15].forEach(a=>s+=`<text x="${f1(XA(a))}" y="${R.y+40}" class="t-xs t-mid">${a}</text>`);
    s+=`<text x="${R.x0}" y="${R.y+62}" class="t-lbl" style="fill:var(--ink)">${g.n}: ${MT[g.m][0]}</text>`;
    /* two icon arrays */
    const arr=(x,y,cols,sz,n,col,title,cap)=>{let o=`<text x="${x}" y="${y-8}" class="t-sm">${title}</text>`;
      for(let j=0;j<100;j++){const cx=x+(j%cols)*(sz+3)+sz/2,cy=y+Math.floor(j/cols)*(sz+3)+sz/2;o+=person(cx,cy-sz/2,sz,j<Math.round(n)?col:'var(--line)')}
      return o+`<text x="${x}" y="${y+Math.ceil(100/cols)*(sz+3)+12}" class="t-xs">${cap}</text>`};
    const P1=N?{x:20,y:142,cols:20,sz:14}:{x:24,y:140,cols:20,sz:12.5},P2=N?{x:20,y:g.u5?330:220,cols:20,sz:14}:{x:376,y:140,cols:20,sz:12.5};
    if(g.u5)s+=arr(P1.x,P1.y,P1.cols,P1.sz,19,'var(--tb)','TB WITHIN 2 YEARS · UNDER 5','19 in 100: infection-test positive, no preventive treatment');
    else s+=`<text x="${P1.x}" y="${P1.y-8}" class="t-sm">TB WITHIN 2 YEARS</text><text x="${P1.x}" y="${P1.y+14}" class="t-xs" style="fill:var(--ink)">The cited 19% figure is for children under 5.</text><text x="${P1.x}" y="${P1.y+30}" class="t-xs" style="fill:var(--ink)">No age-specific figure for this band</text><text x="${P1.x}" y="${P1.y+46}" class="t-xs" style="fill:var(--ink)">in this guide's sources.</text>`;
    const cf=era==='pre'?(g.b<=5?43.6:14.9):.9;
    s+=arr(P2.x,P2.y,P2.cols,P2.sz,cf,'var(--bad)',era==='pre'?`DIED · BEFORE TREATMENT EXISTED`:'DIED · WITH TREATMENT, RECENT ERA',era==='pre'?`${cf} in 100, ages ${g.b<=5?'0–4':'5–14'} (pooled)`:'0.9 in 100, ages 0–14 (pooled)');
    kid.innerHTML=s;
    $('#hvKidNote').innerHTML=noteHTML({k:'Children · '+g.n,t:MT[g.m][0],
      txt:`${MT[g.m][1]} in the pre-chemotherapy literature; children with HIV behaved like children under 2 [[Marais2004]]. ${g.u5?`Among exposed children under 5 with a positive infection test and no preventive treatment, 2-year TB incidence was 19.0% (95% CI 8.4–37.4); preventive treatment was 91% effective in infection-test-positive children, and 83% of under-5s who developed TB were diagnosed within 90 days of the first visit [[Martinez2020Lancet]].`:'Infection after age 10 often leads to the adult form, with cavities and infectious cough [[Marais2004]].'} Before treatment existed, pooled case fatality was 43.6% at ages 0–4 and 14.9% at ages 5–14; with treatment it was 0.9% [[Jenkins2017]]. Up to 15% of childhood TB may present as TB meningitis; in 1636 children with TB meningitis, 19.3% died and 53.9% of survivors had neurological sequelae [[WHO-Mod5-2022,Chiang2014]].`,
      pt:`Babies and young children who live with someone who has TB should be checked quickly, because they can get very sick fast. With treatment, almost all children survive.`,
      hook:`Under 2 (and children with HIV): highest risk of severe disease. 2–10: lowest. Over 10: adult-type disease [[Marais2004]].`});
  }
  $$('[data-ag]').forEach(b=>b.addEventListener('click',()=>{ag=+b.dataset.ag;$$('[data-ag]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawK()}));
  $$('[data-era]').forEach(b=>b.addEventListener('click',()=>{era=b.dataset.era;$$('[data-era]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawK()}));
  drawK();
  redraws.special=(p=>()=>{p&&p();drawK()})(redraws.special);
};
