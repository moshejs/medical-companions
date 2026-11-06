/* =============== 4.4 Infection, antibiotics & cross-infection =============== */
/* Main scrubber: Pseudomonas aeruginosa arrives in the mucus, is eradicated, returns and settles as a mucoid
   (biofilm) infection, is suppressed with cycled inhaled antibiotics, and flares into an exacerbation treated with
   IV antibiotics. Beside it, the published trial numbers for each stage. Then organism glyphs for the card grid and
   the infection-control distance diagram (CFF 2013 update, quoted as published). */
inits.infection=()=>{
  const svg=$('#inSvg'),rg=$('#inT'),pb=$('#inPlay'),note=$('#inNote'),stEl=$('#inSteps');
  const STEPS=[
    {from:0,at:.1,k:'Stage 1 · first growth',t:'Pseudomonas arrives',
      txt:'In 3,323 US children aged 1–5, Pseudomonas aeruginosa in respiratory cultures in 1990 carried a 2.6-fold higher 8-year risk of death (95% CI 1.6 to 4.1) [[Emerson2002]]. The CFF 2014 guideline recommends against prophylactic antipseudomonal antibiotics to prevent acquisition (grade D), and recommends oropharyngeal cultures rather than routine bronchoscopy for people who cannot cough up sputum (grade B) [[Mogayzel2014Pa]].',
      pt:'Pseudomonas is a germ that likes the thick mucus in CF airways. Finding it early matters, because the first infection can often still be cleared [[Ratjen2010ELITE]].',
      hook:'P. aeruginosa in early childhood: 2.6× 8-year mortality risk [[Emerson2002]]. Prophylaxis to prevent it: grade D [[Mogayzel2014Pa]].'},
    {from:.2,at:.3,k:'Stage 2 · early eradication',t:'Clear it early',
      txt:'The CFF 2014 guideline strongly recommends (grade A) inhaled antibiotics for new P. aeruginosa; the favoured regimen is inhaled tobramycin 300 mg twice daily for 28 days [[Mogayzel2014Pa]]. In ELITE (88 people), 93% (28 days) and 92% (56 days) were free of P. aeruginosa one month after treatment, and 66% and 69% at the final visit; time to recurrence was similar [[Ratjen2010ELITE]]. In EPIC (304 children aged 1–12), cycled and culture-based tobramycin did not differ, and adding oral ciprofloxacin gave no benefit [[Treggiari2011EPIC]]. The Cochrane review found far fewer people still positive at one month after tobramycin than after placebo (OR 0.06; low certainty) [[LangtonHewer2023Erad]].',
      pt:'When Pseudomonas is found for the first time, a short course of inhaled antibiotic can often clear it [[Ratjen2010ELITE]].',
      hook:'First P. aeruginosa: inhaled tobramycin for 28 days (grade A); 56 days was no better [[Mogayzel2014Pa,Ratjen2010ELITE]].'},
    {from:.4,at:.5,k:'Stage 3 · it settles in',t:'Chronic mucoid infection',
      txt:'When Pseudomonas keeps coming back, the bacteria are drawn here in their mucoid, biofilm form: rods wrapped in a slimy halo, clustered in the mucus (a schematic). Chronic P. aeruginosa was one of the risk factors for not recovering lung function after an exacerbation in US registry data [[Sanders2010]]. Even on ETI, sputum densities of S. aureus, P. aeruginosa and other organisms fell by 2–3 log10 CFU/mL after one month, but most people stayed culture-positive for the organisms they had before <span class="ev est">Established</span> [[Nichols2023]].',
      pt:'Once Pseudomonas has settled in, treatment usually aims to keep its numbers down. Even with modulators, most people in one study still grew the germs they had before [[Nichols2023]].',
      hook:'ETI lowers pathogen density 2–3 log10 within a month, but infections generally persist [[Nichols2023]].'},
    {from:.6,at:.7,k:'Stage 4 · keeping it down',t:'Chronic suppression',
      txt:'In Ramsey 1999 (520 people), inhaled tobramycin 300 mg twice daily in three 28-on, 28-off cycles raised FEV1 10% at week 20 against a 2% fall on placebo, and hospitalisation was 26% less likely [[Ramsey1999TOBI]]. The TOBI label states "alternating periods of 28 days on drug, followed by 28 days off drug" from age 6 [[FDA-TOBI]]. In AIR-CF2, aztreonam lysine lengthened the median time to needing more antipseudomonal antibiotics from 71 to 92 days [[McCoy2008AZLI]]; the Cayston label states one 75 mg vial 3 times a day for 28 days, then 28 days off, from age 7 [[FDA-Cayston]]. Azithromycin three days a week cut exacerbation risk (HR 0.65) [[Saiman2003Azithro]].',
      pt:'Some inhaled antibiotics are taken in cycles of 4 weeks on and 4 weeks off. This keeps germs like Pseudomonas down while limiting side effects [[FDA-TOBI]].',
      hook:'TOBI: 28 days on, 28 off [[FDA-TOBI]]. Cayston: three times daily for 28 days [[FDA-Cayston]]. Azithromycin HR 0.65 [[Saiman2003Azithro]]; stop it if NTM grows [[Floto2016NTM]].'},
    {from:.8,at:.92,k:'Stage 5 · a flare',t:'Exacerbation & IV antibiotics',
      txt:'In 8,479 US registry exacerbations treated with IV antibiotics, 25% did not recover to 90% of baseline FEV1 within 3 months [[Sanders2010]]. STOP2 (982 adults) randomised early responders to 10 or 14 days of IV antimicrobials: ppFEV1 gains were 12.8 and 13.4 points, so 10 days was non-inferior. Slower responders gained 3.3 points with 21 days and 3.4 with 14, so 21 days was not superior [[Goss2021STOP2]]. Adding oral prednisone in people not responding by day 7 did not improve recovery [[Waters2024Prednisone]]. Once-daily IV tobramycin worked as well as three-times-daily and was less nephrotoxic in children [[Smyth2005TOPIC]].',
      pt:'An exacerbation is a flare of chest symptoms. Strong IV antibiotics like tobramycin can affect hearing and the kidneys, so care teams check hearing and blood tests to catch problems early [[Garinis2021Ototox,Downes2015AKI]].',
      hook:'STOP2: 10 days non-inferior to 14 for early responders; 21 not better than 14 for slow responders [[Goss2021STOP2]]. About 1 in 4 exacerbations does not recover to baseline [[Sanders2010]].'}];
  const setA=stepWire(stEl,STEPS,rg,draw,()=>stop());
  function bars(x,y,w,items,o){const mx=o.mx,bh=o.bh||15,gap=o.gap||7,lw=o.lw||86,g=o.g==null?1:o.g,X=v=>x+lw+(w-lw-40)*v/mx;let s='';
    if(o.title)s+=`<text x="${x}" y="${y-8}" class="t-lbl">${o.title}</text>`;
    items.forEach((it,i)=>{const yy=y+i*(bh+gap);s+=`<text x="${x+lw-6}" y="${f1(yy+bh*.72)}" class="t-sm t-end" style="fill:var(--ink)">${it.l}</text><rect x="${x+lw}" y="${f1(yy)}" width="${f1(w-lw-40)}" height="${bh}" rx="4" style="fill:var(--panel-2)"/><rect x="${x+lw}" y="${f1(yy)}" width="${f1(Math.max(.5,X(it.v*g)-x-lw))}" height="${bh}" rx="4" style="fill:${it.col}"/><text x="${f1(X(it.v*g)+4)}" y="${f1(yy+bh*.74)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(g,.6,1))}">${(o.fmt||(q=>q))(it.v)}</text>`});
    return s}
  function draw(t){const N=vb(svg,'720 380','400 620'),p=phaseOf(STEPS,t);setA(p);note.innerHTML=noteHTML(STEPS[p]);
    const L=N?{ex:14,ey:40,ew:372,eh:250,rx:14,ry:328,rw:372}:{ex:16,ey:40,ew:410,eh:300,rx:446,ry:40,rw:262};
    const arrive=ramp(t,.02,.16),erad=ramp(t,.24,.36),chron=ramp(t,.42,.56),muc=ramp(t,.46,.58);
    /* suppression cycles: two 'on' windows push the colony down, 'off' lets it creep back */
    const on1=ramp(t,.62,.66)-.35*ramp(t,.67,.71),on2=ramp(t,.72,.76)-.3*ramp(t,.77,.8),sup=clamp(.38*on1+.38*on2);
    const flare=bump(t,.8,1.04)*(t<.8?0:1),iv=ramp(t,.84,.94);
    const dens=t<.6?chron:clamp(1-sup+ .5*ramp(t,.8,.86)-.55*iv);
    let s='';
    s+=`<text x="${L.ex}" y="24" class="t-big">${STEPS[p].t}</text>${N?'':`<text x="${L.ex+230}" y="24" class="t-sm">${STEPS[p].k}</text>`}`;
    const E=epithelium(L.ex,L.ey,L.ew,L.eh,{n:6,asl:.25,mucus:.85,thick:.75,beat:.3,ph:t*8,bact:0,inflam:clamp(.15+.5*chron+.4*flare-.3*iv),labels:true,seed:8});
    s+=E.svg;const A=E.at,mh=A.aslTop-A.mucTop;
    /* the biofilm cluster */
    const cx=L.ex+L.ew*.45,cy=A.mucTop+mh*.5;
    if(chron>.02&&t>=.4){s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(L.ew*.26*clamp(dens*1.1))}" ry="${f1(mh*.42)}" style="fill:var(--biofilm);opacity:${f1(.65*muc*clamp(dens*1.4))}"/>`}
    const r=rng(17);
    /* arriving rods (stages 1-2) */
    if(t<.4){for(let i=0;i<4;i++){const tx=L.ex+L.ew*(.18+.2*i),ty=A.mucTop+mh*(.35+.3*r()),sx=L.ex+L.ew*(.1+.15*i),sy=L.ey+20+r()*30;
        const u=ease(arrive),bx=lerp(sx,tx,u),by=lerp(sy,ty,u)+Math.sin(t*40+i)*2*(1-u);
        s+=bacterium(bx,by,15,{ang:lerp(30,-10+i*20,u),flag:true,op:1-erad})}
      const mOn=bump(t,.21,.37);if(mOn>.02){const rm=rng(3);for(let i=0;i<16;i++){const u=(rm()+t*12)%1;s+=`<circle cx="${f1(L.ex+20+(L.ew-40)*rm())}" cy="${f1(L.ey+8+(A.mucTop-L.ey-10)*u)}" r="${f1(1.6+rm()*1.6)}" style="fill:var(--pot);opacity:${f1(mOn*(1-u*.6))}"/>`}
        s+=`<text x="${L.ex+L.ew-8}" y="${L.ey+18}" class="t-sm t-end" style="fill:var(--ink);opacity:${f1(mOn)}">inhaled tobramycin, 28 days</text>`}
      if(p===0&&arrive>.6)s+=`<text x="${L.ex+8}" y="${L.ey+18}" class="t-sm" style="fill:var(--ink);font-weight:700">free-swimming rods with a flagellum</text>`}
    else{const n=14;for(let i=0;i<n;i++){const a=r()*6.283,rr=Math.sqrt(r()),bx=cx+Math.cos(a)*L.ew*.22*rr,by=cy+Math.sin(a)*mh*.32*rr,vis=clamp(dens*n-i);
        if(vis>.02)s+=bacterium(bx,by,13,{ang:r()*180,flag:false,mucoid:muc,op:clamp(vis)*Math.min(1,chron*1.5)})}
      if(p===2&&muc>.5)s+=`<text x="${L.ex+8}" y="${L.ey+18}" class="t-sm" style="fill:var(--ink);font-weight:700">mucoid rods in a biofilm (schematic)</text>`;
      /* cycled mist during the 'on' windows */
      const mOn=Math.max(bump(t,.615,.675),bump(t,.715,.775));if(mOn>.02){const rm=rng(4);for(let i=0;i<16;i++){const u=(rm()+t*14)%1;s+=`<circle cx="${f1(L.ex+20+(L.ew-40)*rm())}" cy="${f1(L.ey+8+(A.mucTop-L.ey-10)*u)}" r="${f1(1.6+rm()*1.6)}" style="fill:var(--pot);opacity:${f1(mOn*(1-u*.6))}"/>`}}
      if(p===3)s+=`<text x="${L.ex+8}" y="${L.ey+18}" class="t-sm" style="fill:var(--ink);font-weight:700">${mOn>.1?'28 days on: the colony shrinks':'28 days off: it creeps back'}</text>`;
      /* IV drip in the exacerbation */
      if(p===4){const dx=L.ex+L.ew-46,dy=L.ey+10;s+=`<g style="opacity:${f1(ramp(t,.82,.86))}"><rect x="${dx}" y="${dy}" width="26" height="34" rx="5" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/><rect x="${dx+3}" y="${f1(dy+4+26*iv*.6)}" width="20" height="${f1(26-26*iv*.6)}" rx="3" style="fill:var(--pot);opacity:.6"/><path d="M${dx+13} ${dy+34}v14" style="stroke:var(--rx);stroke-width:1.6"/><text x="${dx+13}" y="${dy+60}" class="t-xs t-mid" style="fill:var(--ink)">IV</text></g>`;
        s+=`<text x="${L.ex+8}" y="${L.ey+18}" class="t-sm" style="fill:var(--ink);font-weight:700">${iv>.5?'IV antibiotics: the flare settles':'more bacteria, inflamed lining'}</text>`}}
    /* result panel */
    const R=L.rx,Y=L.ry,W=L.rw,g=ramp(t,STEPS[p].from+.02,STEPS[p].from+.14);let q='';
    q+=`<rect x="${R-6}" y="${Y-6}" width="${W+12}" height="${N?262:312}" rx="12" style="fill:var(--panel);stroke:var(--line)"/><text x="${R+6}" y="${Y+14}" class="t-sm" style="fill:var(--rx);font-weight:700">WHAT THE STUDIES FOUND</text>`;
    if(p===0){q+=`<text x="${R+6}" y="${Y+44}" class="t-lbl">P. aeruginosa, ages 1–5 (1990)</text><text x="${R+6}" y="${Y+100}" class="t-big" style="font-size:46px;fill:var(--bad)">${f1(1+1.6*g)}×</text><text x="${R+6}" y="${Y+122}" class="t-sm" style="fill:var(--ink)">8-year risk of death</text><text x="${R+6}" y="${Y+136}" class="t-sm" style="fill:var(--ink)">(95% CI 1.6 to 4.1), 3,323 children</text>`;
      q+=`<text x="${R+6}" y="${Y+180}" class="t-lbl">CFF 2014, as graded</text><text x="${R+6}" y="${Y+200}" class="t-sm" style="fill:var(--bad)">D  no prophylaxis to prevent it</text><text x="${R+6}" y="${Y+216}" class="t-sm" style="fill:var(--rx)">B  oropharyngeal cultures if no</text><text x="${R+24}" y="${Y+230}" class="t-sm" style="fill:var(--rx)">sputum (not routine bronchoscopy)</text>`}
    if(p===1){q+=bars(R+6,Y+52,W-6,[{l:'28 d · 1 mo',v:93,col:'var(--pot)'},{l:'56 d · 1 mo',v:92,col:'var(--rx)'},{l:'28 d · final',v:66,col:'var(--pot)'},{l:'56 d · final',v:69,col:'var(--rx)'}],{mx:100,g,title:'Free of P. aeruginosa (ELITE)',fmt:v=>v+'%',lw:84});
      q+=`<text x="${R+6}" y="${Y+168}" class="t-sm" style="fill:var(--ink)">28 days did as well as 56 days.</text><text x="${R+6}" y="${Y+196}" class="t-lbl">Cochrane: still positive at 1 month</text><text x="${R+6}" y="${Y+214}" class="t-sm" style="fill:var(--ink)">tobramycin vs placebo: OR 0.06</text><text x="${R+6}" y="${Y+228}" class="t-sm">(95% CI 0.02 to 0.18; low certainty)</text>`}
    if(p===2){const bw=(W-30)/2;['before ETI','1 month on ETI'].forEach((l,j)=>{const bx=R+6+j*(bw+18),by=Y+40;q+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="120" rx="8" style="fill:var(--field);stroke:var(--line)"/><text x="${f1(bx+bw/2)}" y="${by+136}" class="t-sm t-mid" style="fill:var(--ink)">${l}</text>`;
        const rr=rng(40+j),n=j?Math.round(lerp(30,3,g)):30;for(let i=0;i<n;i++)q+=bacterium(bx+10+rr()*(bw-20),by+10+rr()*100,10,{ang:rr()*180,flag:false,mucoid:.5})});
      q+=`<text x="${R+6}" y="${Y+204}" class="t-lbl">−2 to −3 log10 CFU/mL</text><text x="${R+6}" y="${Y+220}" class="t-sm" style="fill:var(--ink)">100 to 1,000 times fewer, yet most</text><text x="${R+6}" y="${Y+234}" class="t-sm" style="fill:var(--ink)">stayed culture-positive (Nichols 2023)</text>`}
    if(p===3){const sx=R+6,sw=W-12,sy=Y+34;q+=`<text x="${sx}" y="${sy}" class="t-lbl">TOBI: 3 cycles over 24 weeks</text>`;
      for(let i=0;i<6;i++){q+=`<rect x="${f1(sx+sw*i/6)}" y="${sy+8}" width="${f1(sw/6-2)}" height="18" rx="3" style="fill:${i%2?'var(--panel-2)':'var(--pot)'}"/><text x="${f1(sx+sw*(i+.5)/6)}" y="${sy+21}" class="t-xs t-mid" style="fill:var(--ink)">${i%2?'off':'on'}</text>`}
      const cu=sx+sw*ramp(t,.6,.8);q+=`<path d="M${f1(cu)} ${sy+4}v26" style="stroke:var(--ink);stroke-width:2"/>`;
      q+=bars(R+6,Y+94,W-6,[{l:'placebo',v:0,col:'var(--muted)'},{l:'tobramycin',v:10,col:'var(--pot)'}],{mx:14,g,title:'FEV1 change, week 20',fmt:v=>v?'+10%':'−2%',lw:76});
      q+=bars(R+6,Y+176,W-6,[{l:'placebo',v:71,col:'var(--muted)'},{l:'aztreonam',v:92,col:'var(--rx)'}],{mx:110,g,title:'Days to more antibiotics',fmt:v=>v,lw:76});
      if(!N)q+=`<text x="${R+6}" y="${Y+238}" class="t-xs">Ramsey 1999 · McCoy 2008 (AIR-CF2)</text>`}
    if(p===4){q+=bars(R+6,Y+50,W-6,[{l:'10 days',v:12.8,col:'var(--rx)'},{l:'14 days',v:13.4,col:'var(--muted)'}],{mx:16,g,title:'STOP2 early responders, ppFEV1',fmt:v=>'+'+v,lw:66});
      q+=bars(R+6,Y+124,W-6,[{l:'21 days',v:3.3,col:'var(--rx)'},{l:'14 days',v:3.4,col:'var(--muted)'}],{mx:16,g,title:'STOP2 slow responders',fmt:v=>'+'+v,lw:66});
      q+=`<text x="${R+6}" y="${Y+190}" class="t-lbl">Back to baseline FEV1 by 3 months?</text>`;const ic=icons(R+6,Y+200,{n:20,cols:20,k:Math.round(5*g),size:11,gap:1.4,col:'var(--bad)',base:'var(--good)'});q+=ic.svg+`<text x="${R+6}" y="${Y+238}" class="t-sm" style="fill:var(--ink)">1 in 4 did not (Sanders 2010)</text>`}
    svg.innerHTML=s+q}
  const stop=playWire(rg,pb,draw,16000,'Replay','infection');
  draw(+rg.value);

  /* ---------- organism glyphs for the cards ---------- */
  const ORG={pa:()=>{let s='';[[30,20,20],[60,32,-15],[88,18,40]].forEach(([x,y,a])=>s+=bacterium(x,y,22,{ang:a,flag:true}));return s+bacterium(60,14,18,{ang:5,flag:false,mucoid:1})},
    mrsa:()=>{let s='';const r=rng(2);for(let i=0;i<11;i++){const a=r()*6.28,d=r()*14;s+=`<circle cx="${f1(60+Math.cos(a)*d*1.6)}" cy="${f1(25+Math.sin(a)*d*.9)}" r="5.2" style="fill:var(--bact);stroke:var(--panel);stroke-width:1"/>`}return s},
    bcc:()=>{let s='';[[28,22,10],[50,30,-30],[72,18,60],[94,28,0]].forEach(([x,y,a],i)=>s+=bacterium(x,y,16,{ang:a,flag:i%2===0,col:'var(--inflamed)'}));return s},
    ntm:()=>{let s='';[[20,14,8],[24,30,-6],[60,22,14],[66,36,-10],[96,18,4]].forEach(([x,y,a])=>{s+=`<g transform="translate(${x} ${y}) rotate(${a})"><rect x="0" y="-2" width="30" height="4" rx="2" style="fill:var(--na)"/>${[5,12,19,26].map(b=>`<circle cx="${b}" cy="0" r="2.4" style="fill:var(--na)"/>`).join('')}</g>`});return s},
    asp:()=>{let s=`<path d="M10 42C30 38 40 30 52 26M52 26C62 22 70 14 74 8M52 26C66 28 80 26 96 30M30 37C34 30 34 24 38 18" style="fill:none;stroke:var(--mucus-thick);stroke-width:2.4;stroke-linecap:round"/>`;
      [[74,8],[96,30],[38,18]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="5" style="fill:var(--mucus)"/>`;for(let k=0;k<7;k++){const a=k/7*6.28;s+=`<circle cx="${f1(x+Math.cos(a)*7.5)}" cy="${f1(y+Math.sin(a)*7.5)}" r="1.7" style="fill:var(--mucus-thick)"/>`}});return s}};
  $$('#m-infection svg[data-org]').forEach(el=>{el.innerHTML=ORG[el.dataset.org]()});

  /* ---------- infection prevention and control: the distance diagram ---------- */
  const ip=$('#ipSvg'),ipT=$('#ipT'),ipD=$('#ipD'),ipDv=$('#ipDv'),ipP=$('#ipPlay'),ipR=$('#ipRules'),ipBtns=$$('#ipSet [data-set]');
  const RULES={
    clinic:['People with CF should wear a surgical mask in healthcare settings [[Saiman2014IPC]].','Staff use Contact Precautions (gown and gloves) for all people with CF, in clinic and hospital [[Saiman2014IPC]].','Lung function testing options include testing in the exam room at the start of the visit, a negative-pressure room, a HEPA-filtered lab, or 30 minutes between people with CF [[Saiman2014IPC]].','People with CF, their families and friends should all perform hand hygiene [[Saiman2014IPC]].'],
    hospital:['Inpatients with CF should have a single-patient room. Only people with CF from the same household may share [[Saiman2014IPC]].','The guideline cites P. aeruginosa recovered from hospital-room air 45 minutes to 2 hours after a person with CF left [[Saiman2014IPC]].','Contact Precautions (gown and gloves) for all people with CF [[Saiman2014IPC]].'],
    event:['"Only 1 person with CF may attend a CF Foundation–sponsored indoor event" [[Saiman2014IPC]].','The rule applies to everyone with CF, whatever their culture results, because "all individuals with CF may harbor potentially transmissible pathogens" [[Saiman2014IPC]].'],
    everyday:['"Separate all people with CF from others with CF, regardless of their respiratory tract culture results, at least 6 feet (2 meters) in all settings" [[Saiman2014IPC]].','The guideline recommends against CF-specific camps and retreats, and encourages camps and sports with people who do not have CF [[Saiman2014IPC]].']};
  let ipSet='everyday';
  function ipDraw(tp){const N=vb(ip,'720 250','400 270'),d=+ipD.value,W=N?318:620,x0=N?48:56,PX=W/3.2,ax=x0+10,bx=ax+d*PX,base=N?204:196,ps=N?66:80,hy=base-ps;
    ipDv.textContent=`${d.toFixed(1)} m (${(d*3.281).toFixed(1)} ft)`;
    let s=`<line x1="${x0-10}" x2="${x0+W+10}" y1="${base}" y2="${base}" style="stroke:var(--line);stroke-width:2"/>`;
    /* metre ruler */
    for(let m=0;m<=3;m++){const xx=ax+m*PX;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${base}" y2="${base+6}" class="axis"/><text x="${f1(xx)}" y="${base+17}" class="t-xs t-mid">${m} m</text>`}
    /* the 2 m line */
    const tw=ax+2*PX;s+=`<line x1="${f1(tw)}" x2="${f1(tw)}" y1="${hy-34}" y2="${base}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:6 4"/><text x="${f1(tw)}" y="${hy-40}" class="t-sm t-mid" style="fill:var(--rx);font-weight:700">6 feet (2 m)</text>`;
    /* hospital walls */
    if(ipSet==='hospital'){const wx=ax+Math.min(d,3)*PX/2;s+=`<rect x="${f1(wx-4)}" y="${hy-26}" width="8" height="${base-hy+26}" style="fill:var(--muted);opacity:.6"/><text x="${f1(wx)}" y="${hy-30}" class="t-xs t-mid" style="fill:var(--ink)">single-patient rooms</text>`}
    /* droplets from A's cough, reaching up to 2 m */
    const mx=ax+ps*.2,my=hy+ps*.2,r=rng(6);
    for(let i=0;i<26;i++){const sp=.35+r()*.65,u=clamp(tp*1.15-r()*.15)*sp,xx=mx+u*2*PX,yy=my+u*u*(base-my)*.6*r()+(r()-.5)*18*u;
      const lim=ipSet==='hospital'?ax+Math.min(d,3)*PX/2-5:tw+2;if(u>0.01&&xx<=lim)s+=`<circle cx="${f1(xx)}" cy="${f1(yy)}" r="${f1(1.4+r()*2)}" style="fill:var(--water);opacity:${f1((1-u/1.05)*.9)}"/>`}
    if(tp>.1)s+=`<text x="${f1(ax+PX*.9)}" y="${hy-6}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(ramp(tp,.1,.3))}">droplets can travel as far as 2 m</text>`;
    /* other people (no CF) at events and in everyday life */
    if(ipSet==='event'||ipSet==='everyday'){[[-.35],[.55]].forEach(([o],k)=>{const px=ax+o*PX+(k?0:0);if(px>x0-14)s+=person(px,hy+ps*.28,ps*.72,'var(--muted)',{op:.55})});
      s+=`<text x="${f1(ax+PX*.55)}" y="${f1(hy+ps*.28-6)}" class="t-xs t-mid">no CF</text>`}
    /* the two people with CF */
    const close=d<2;
    s+=`<path d="M${f1(ax)} ${base+4}H${f1(bx)}" style="stroke:${close?'var(--bad)':'var(--good)'};stroke-width:3;opacity:.8"/>`;
    s+=person(ax,hy,ps,'var(--rx)');s+=`<text x="${ax}" y="${base+30}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">person with CF</text>`;
    const bOp=ipSet==='event'?.35:1,bCol=ipSet==='event'?'var(--muted)':close?'var(--bad)':'var(--good)';
    s+=person(bx,hy,ps,bCol,{op:bOp});
    s+=`<text x="${f1(bx)}" y="${base+30}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${ipSet==='event'?'2nd person with CF':'another person with CF'}</text>`;
    if(ipSet==='clinic')[ax,bx].forEach(px=>{s+=`<rect x="${f1(px-ps*.1)}" y="${f1(hy+ps*.17)}" width="${f1(ps*.24)}" height="${f1(ps*.12)}" rx="2" style="fill:var(--panel);stroke:var(--dx);stroke-width:1.4"/>`});
    if(ipSet==='clinic')s+=`<text x="${f1(bx+ps*.3)}" y="${f1(hy+ps*.26)}" class="t-xs" style="fill:var(--dx)">surgical masks</text>`;
    if(ipSet==='event')s+=`<path d="M${f1(bx-16)} ${f1(hy+6)}l32 32M${f1(bx+16)} ${f1(hy+6)}l-32 32" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/><text x="${f1(Math.min(bx,x0+W-40))}" y="${base+44}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">only 1 person with CF may attend</text>`;
    /* gap readout */
    s=`<text x="${N?14:x0-6}" y="20" class="t-lbl" style="fill:${close?'var(--bad)':'var(--good)'}">${d.toFixed(1)} m (${(d*3.281).toFixed(1)} ft) apart</text><text x="${N?14:x0-6}" y="36" class="t-sm" style="fill:var(--ink)">${close?'closer than':'at least'} the 6 feet (2 m) the guideline states</text>`+s;
    ip.innerHTML=s}
  function ipRules(){ipR.innerHTML=RULES[ipSet].map(x=>`<li>${x}</li>`).join('')}
  ipBtns.forEach(b=>b.addEventListener('click',()=>{ipSet=b.dataset.set;ipBtns.forEach(c=>c.setAttribute('aria-pressed',c===b));ipRules();ipDraw(+ipT.value)}));
  ipD.addEventListener('input',()=>ipDraw(+ipT.value));
  playWire(ipT,ipP,ipDraw,2600,'Cough again','infection');
  ipRules();ipDraw(+ipT.value);
};
