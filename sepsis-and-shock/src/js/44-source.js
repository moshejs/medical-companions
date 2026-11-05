/* ===== 4.4 Source control & antimicrobial stewardship ===== */
/* t 0..1 maps to hours since sepsis was recognised (piecewise, so the first hour gets room on the scrubber).
   The patient, organism, bacteria count and procalcitonin curve are illustrative; the rules quoted are cited. */
const SRC_HK=[[0,0],[.12,.3],[.26,1],[.42,5],[.56,48],[.70,60],[.82,120],[1,180]];
const srcPL=(k,x)=>{if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
const srcHours=t=>srcPL(SRC_HK,clamp(t));
const srcFmt=h=>h<1?Math.round(h*60)+' min':h<48?(h<10?f1(h):Math.round(h))+' h':'day '+f1(h/24);
/* illustrative procalcitonin, [day, μg/L]: peaks on day 1, falls 80% below the peak just before day 7 */
const SRC_PCT=[[0,4],[.5,8],[1,12],[2,10.5],[3,8.2],[4,6],[5,4.2],[6,3],[7,2.2],[8,1.7]];
const SRC_STEPS=[
 {from:0,at:.05,k:'Hour 0 · recognition',t:'Suspect sepsis, look for the source',
  txt:`Sepsis is suspected in a person with fever, flank pain and falling blood pressure. SSC 2021: "rapidly identifying or excluding a specific anatomical diagnosis of infection that requires emergent source control" (Best Practice Statement). [[Evans2021SSC]] Here imaging shows a stone blocking an infected kidney. In BALANCE, the urinary tract was the commonest source of bloodstream infection (42.2%). [[Daneman2025BALANCE]]`,
  pt:`The team looks for where the infection started, because some sources (a blocked kidney, a pocket of pus, an infected line) need more than antibiotics.`,
  hook:`Source control = find it, then drain, debride or remove it "as soon as medically and logistically practical" (SSC 2021). [[Evans2021SSC]]`},
 {from:.1,at:.17,k:'First hour',t:'Cultures first, then antibiotics within the hour',
  txt:`Two sets of blood cultures are taken. SSC 2021 asks for cultures before antimicrobials if this causes no substantial delay (under 45 minutes). [[Evans2021SSC]] Two sets detect about 90% of bloodstream infections. [[Lee2007Cultures]] For possible septic shock SSC 2021 recommends antimicrobials immediately, ideally within 1 h (strong). [[Evans2021SSC]] In Kumar's cohort, survival fell an average of 7.6% for each hour of delay over the first 6 hours of hypotension. [[Kumar2006Delay]] MRSA and antifungal cover are added only when the person's risk is high (SSC 2021). [[Evans2021SSC]]`,
  pt:`Blood samples are sent to grow the germ, and a strong antibiotic starts straight away, before the results are back.`,
  hook:`Septic shock or high likelihood of sepsis: antimicrobials ideally within 1 h; possible sepsis without shock: within 3 h if concern persists (SSC 2021). [[Evans2021SSC]]`},
 {from:.24,at:.34,k:'Hours 1–5',t:'Source control: drain the blocked kidney',
  txt:`A stent or a nephrostomy tube relieves the blockage and drains the infected urine. Among 1,712 US inpatients with sepsis and a ureteral stone, mortality was 8.82% with decompression vs 19.2% without (adjusted OR 2.6). [[Borofsky2013Decompression]] In German ICUs (MEDUSA), 28-day mortality was 26.7% when source control came within 6 h of organ dysfunction vs 42.9% later. [[Bloos2014Source]] SSC 2021 prefers the least invasive option that works. [[Evans2021SSC]]`,
  pt:`A thin tube lets the trapped, infected urine drain out. Once the source is drained, antibiotics can do their job.`,
  hook:`Infected obstructed kidney: decompression went with less than half the mortality (8.82% vs 19.2%). [[Borofsky2013Decompression]]`},
 {from:.44,at:.5,k:'Day 2',t:'Cultures come back',
  txt:`The bottles turn positive and the laboratory names the organism and its susceptibilities (here an illustrative gram-negative rod sensitive to a narrow drug). Resistant organisms were uncommon in 17,430 adults with culture-positive community-onset sepsis (MRSA 11.7%, ceftriaxone-resistant gram-negatives 13.1%, ESBL 0.8%), although 67.0% had received cover for them. [[Rhee2020Broad]]`,
  pt:`About two days in, the lab tells the team which germ it is and which antibiotics kill it.`,
  hook:`Both too-narrow (OR 1.19) and unnecessarily broad (OR 1.22) empirical therapy were linked to higher mortality. [[Rhee2020Broad]]`},
 {from:.55,at:.62,k:'Day 2–3',t:'De-escalate to the narrowest drug that works',
  txt:`SSC 2021 suggests daily assessment for de-escalation (weak), and suggests against two gram-negative drugs once the pathogen and susceptibilities are known. [[Evans2021SSC]] Observational pooled data link de-escalation with lower mortality (RR 0.68), possibly because it happens in people who are already improving; the one RCT found more superinfections and longer ICU stays. [[Tabah2016Deescalation,Leone2014Deescalation]] <span class="ev early">Early evidence</span>`,
  pt:`The strong, broad antibiotic is swapped for a more targeted one. This protects the person's gut germs and helps keep antibiotics working for everyone.`,
  hook:`Double gram-negative cover is for high MDR risk only and stops once susceptibilities are known (SSC 2021). [[Evans2021SSC]]`},
 {from:.68,at:.74,k:'Day 2–5',t:'Dose it well: prolonged infusion',
  txt:`SSC 2021 suggests prolonged beta-lactam infusion for maintenance after an initial bolus (weak, moderate quality). [[Evans2021SSC]] BLING III (7,031 adults): 90-day mortality 24.9% continuous vs 26.8% intermittent (OR 0.91, P = .08), with more clinical cure. [[Dulhunty2024BLING3]] A 2024 meta-analysis of 18 trials found RR 0.86 for 90-day mortality (high certainty). [[AbdulAziz2024Infusion]]`,
  pt:`The antibiotic can run in slowly over hours instead of as a quick dose. Studies suggest this may help a little.`,
  hook:`Prolonged beta-lactam infusion: meta-analysis RR 0.86 for 90-day mortality; BLING III alone narrowly missed significance. [[AbdulAziz2024Infusion,Dulhunty2024BLING3]]`},
 {from:.8,at:.97,k:'Day 5–7',t:'Stop on time',
  txt:`With the source controlled, SSC 2021 suggests shorter rather than longer courses, and procalcitonin plus clinical evaluation to decide when to stop. [[Evans2021SSC]] BALANCE: 7 days was noninferior to 14 for bloodstream infection (90-day mortality 14.5% vs 16.1%; <i>S. aureus</i> excluded). [[Daneman2025BALANCE]] SAPS stopped antibiotics when procalcitonin fell 80% or more from its peak or to 0.5 μg/L or lower; median duration was 5 vs 7 days and 28-day mortality 20% vs 25%. [[deJong2016SAPS]]`,
  pt:`When the person is better and the source is dealt with, the antibiotic stops. A shorter course often works just as well, with fewer side effects.`,
  hook:`BALANCE: 7 days noninferior to 14 for bloodstream infection. STOP-IT: about 4 days as good as about 8 after source control. [[Daneman2025BALANCE,Sawyer2015STOPIT]]`}
];
/* organism groups and what the illustrative regimen covers: 2 covered, 1 only if high risk (SSC 2021), 0 not */
const SRC_BUGS=[['Strep, MSSA',2,0],['MRSA',1,0],['Gram-negatives',2,2],['Pseudomonas',2,0],['Anaerobes',2,0],['Candida',1,0]];
/* body-map sources: share of cases in each study, cited in the section */
const SRC_SETS={soap:{n:'ICU sepsis (SOAP)',v:{lung:68,abdomen:22}},
  balance:{n:'Bloodstream infection (BALANCE)',v:{urine:42.2,abdomen:18.8,lung:13.0,line:6.3,skin:5.2}}};
const SRC_SITES=[
 {id:'lung',n:'Lungs',at:'lung',h:'Pneumonia and ventilator-associated pneumonia',
  li:[`The lungs were the source in 68% of ICU sepsis in the SOAP study, and pneumonia was the commonest infection behind sepsis in a CDC review of four New York hospitals. [[Vincent2006SOAP,Novosad2016MMWR]]`,
   `Respiratory sources were commoner in men than in women (36% vs 29%). [[Esper2006Disparities]]`,
   `Course length: for ventilator-associated pneumonia, 8 days gave similar mortality to 15 (18.8% vs 17.2%) with more antibiotic-free days, but Pseudomonas-type organisms recurred more often after 8 days. [[Chastre2003VAP]]`]},
 {id:'urine',n:'Urinary tract',at:'bladder',h:'Kidney and urinary infections',
  li:[`The urinary tract was the source in 42.2% of bloodstream infections in BALANCE. [[Daneman2025BALANCE]] Genitourinary sources were commoner in women (35% vs 27%). [[Esper2006Disparities]]`,
   `Source control for a blocked, infected kidney is decompression with a stent or nephrostomy: mortality 8.82% with it vs 19.2% without (adjusted OR 2.6). [[Borofsky2013Decompression]]`]},
 {id:'abdomen',n:'Abdomen',at:'abdomen',h:'Perforation, abscess, bile ducts',
  li:[`The abdomen was the source in 22% of ICU sepsis in SOAP and 18.8% of bloodstream infections in BALANCE. [[Vincent2006SOAP,Daneman2025BALANCE]] Abdominal infections were the commonest reason for source control in a Spanish ICU cohort. [[Martinez2017Source]]`,
   `Gut perforation with septic shock: survival was 0% when surgery started more than 6 h after admission in one Japanese centre. [[Azuhata2014Perforation]]`,
   `Cholangitis (Tokyo 2018): moderate cases are indicated for early biliary drainage, severe cases drainage "as soon as possible" once stabilised. [[Miura2018TG18]] After adequate source control, about 4 days of antibiotics matched about 8 (STOP-IT). [[Sawyer2015STOPIT]]`]},
 {id:'skin',n:'Skin and soft tissue',at:'skin',h:'Cellulitis and necrotising infections',
  li:[`Skin was the source in 5.2% of bloodstream infections in BALANCE. [[Daneman2025BALANCE]]`,
   `Necrotising soft tissue ("flesh-eating") infection: surgery within 6 h went with 19% mortality vs 32% when later (OR 0.43). [[Nawijn2020NSTI]]`,
   `In 89 people with necrotising fasciitis, only 13 were diagnosed at admission, and a surgical delay of more than 24 h was linked to higher mortality (relative risk 9.4). [[Wong2003NecFasc]]`]},
 {id:'line',n:'IV line',at:'line',h:'Catheter-related bloodstream infection',
  li:[`Catheters were the source in 6.3% of bloodstream infections in BALANCE. [[Daneman2025BALANCE]]`,
   `SSC 2021 recommends prompt removal of a possibly infected intravascular device after other vascular access has been established. [[Evans2021SSC]]`,
   `IDSA 2009 lists when catheters should come out, for example infection with <i>S. aureus</i>, <i>P. aeruginosa</i>, fungi or mycobacteria. [[Mermel2009IDSA]] Prevention bundles are in <a href="#nursing" data-go="nursing">nursing care</a>.`]}
];
inits.source=()=>{
  const svg=$('#scSvg'),rg=$('#scT'),note=$('#scNote'),rd=$('#scRead');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 590'),h=srcHours(t),day=h/24,p=phaseOf(SRC_STEPS,t);
    const L=N?{tx:14,ty:22,bx:76,by:44,bs:.62,cx:160,cy:50,ivx:340,ivy:40,sx:14,sy:236,sw:372,cw:120,ch:30,px:30,py:352,pw:350,ph:86,lx:24,ly:520,lw:352}
             :{tx:20,ty:24,bx:98,by:44,bs:.9,cx:226,cy:50,ivx:226,ivy:168,sx:366,sy:50,sw:334,cw:106,ch:32,px:340,py:180,pw:350,ph:80,lx:36,ly:338,lw:650};
    const scNow=ramp(t,.27,.36),abxOn=ramp(t,.15,.19),narrow=ramp(t,.56,.62),stopped=t>=.95,back=ramp(t,.44,.48);
    let s=`<defs>${marker('scA','var(--muted)')}</defs>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-big">${p+1} · ${SRC_STEPS[p].t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${SRC_STEPS[p].k} · ${srcFmt(h)} since recognition</text>`;
    /* the person, with the infected kidney glowing */
    const load=clamp(ramp(t,0,.24)*.9+.1)*(1-ramp(t,.3,.6)*.97);
    const B=body(L.bx,L.by,L.bs,{id:'scB',cold:.3*(1-ramp(t,.4,.6))});s+=B.svg;
    const kd=[B.at.kidney[0]-11*L.bs,B.at.kidney[1]];
    s+=`<circle cx="${f1(kd[0])}" cy="${f1(kd[1])}" r="${f1((8+12*load)*L.bs)}" style="fill:var(--fever);opacity:${f1(.15+.3*load)}"/>`;
    s+=organ('kidney',B.at.kidney[0],B.at.kidney[1],20*L.bs/.9*.9,{glow:load});
    const nb=Math.round(load*9);for(let i=0;i<nb;i++){const a=i*2.3+t*9,d=(5+(i%3)*5)*L.bs/.9;s+=bacterium(kd[0]+Math.cos(a)*d,kd[1]+Math.sin(a)*d*.8,8*L.bs/.9,{ang:a*50,op:.9})}
    /* the drain: a tube from the flank to a collection bag */
    if(scNow>0){const bx0=kd[0]-30*L.bs,by0=kd[1]+70*L.bs;
      s+=`<g style="opacity:${f1(scNow)}"><path d="M${f1(kd[0])} ${f1(kd[1])}Q${f1(kd[0]-40*L.bs)} ${f1(kd[1]+10*L.bs)} ${f1(bx0)} ${f1(by0)}" style="fill:none;stroke:var(--device);stroke-width:2.2"/>`;
      s+=`<rect x="${f1(bx0-12*L.bs)}" y="${f1(by0)}" width="${f1(24*L.bs)}" height="${f1(30*L.bs)}" rx="4" style="fill:var(--gold-soft);stroke:var(--device);stroke-width:1.3"/>`;
      s+=`<rect x="${f1(bx0-12*L.bs)}" y="${f1(by0+30*L.bs*(1-.6*scNow))}" width="${f1(24*L.bs)}" height="${f1(30*L.bs*.6*scNow)}" rx="3" style="fill:var(--gold);opacity:.7"/>`;
      s+=`<text x="${f1(bx0)}" y="${f1(by0+30*L.bs+12)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">drain</text></g>`}
    /* blood culture bottles: two sets, drawn first, positive on day 2 */
    if(t>=.1){const n=4,bw=N?18:20,gap=N?8:10,cx=L.cx,cy=L.cy+(N?0:4);
      s+=`<text x="${cx}" y="${cy}" class="t-sm">BLOOD CULTURES · 2 SETS</text>`;
      for(let i=0;i<n;i++){const x=cx+i*(bw+gap)+(i>1?gap:0),y=cy+10,pos=back;
        s+=`<rect x="${x}" y="${y+8}" width="${bw}" height="${bw*2}" rx="4" style="fill:${pos>.5?'var(--pathogen-soft)':'var(--panel)'};stroke:var(--device);stroke-width:1.3"/><rect x="${x+4}" y="${y}" width="${bw-8}" height="9" rx="2" style="fill:var(--device)"/>`;
        s+=`<rect x="${x+2}" y="${f1(y+8+bw*2*(1-.45))}" width="${bw-4}" height="${f1(bw*2*.45-2)}" rx="2" style="fill:${pos>.5?'var(--pathogen)':'var(--blood-soft)'};opacity:.85"/>`}
      s+=`<text x="${cx}" y="${cy+(N?66:72)}" class="t-xs" style="fill:${back>.5?'var(--pathogen-dark)':'var(--muted)'};font-weight:${back>.5?700:500}">${back>.5?'positive: gram-negative rod,':'growing…'}</text>`;
      if(back>.5)s+=`<text x="${cx}" y="${cy+(N?78:84)}" class="t-xs" style="fill:var(--pathogen-dark)">sensitive to a narrow drug</text>`}
    /* the antibiotic bag: broad (ember) then narrow (teal), running to the arm */
    if(abxOn>0&&!stopped){const arm=[L.bx+44*L.bs,L.by+110*L.bs],col=narrow>.5?'var(--rx)':'var(--accent)';
      const bag=ivBag(L.ivx,L.ivy,N?.6:.72,{fill:.85-.4*((t*6)%1),col,label:narrow>.5?'narrow':'broad',ph:t*30,to:[arm[0]+4,arm[1]]});
      s+=`<g style="opacity:${f1(abxOn)}">${bag.svg}</g>`;
      if(t>=.68)s+=`<text x="${L.ivx}" y="${L.ivy-6}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">prolonged infusion</text>`}
    if(stopped)s+=`<text x="${L.ivx}" y="${L.ivy+30}" class="t-sm t-mid" style="fill:var(--good);font-weight:700">course stopped</text>`;
    /* spectrum grid */
    s+=`<text x="${L.sx}" y="${L.sy}" class="t-sm">WHAT THE ANTIBIOTIC COVERS ${abxOn>0&&!stopped?(narrow>.5?'· TARGETED':'· EMPIRICAL'):''}</text>`;
    SRC_BUGS.forEach((b,i)=>{const c=i%3,r=Math.floor(i/3),x=L.sx+c*(L.cw+6),y=L.sy+10+r*(L.ch+6);
      const st=stopped||abxOn<.5?0:(narrow>.5?b[2]:b[1]);
      s+=`<rect x="${x}" y="${y}" width="${L.cw}" height="${L.ch}" rx="7" style="fill:${st===2?(narrow>.5?'var(--rx-soft)':'var(--accent-soft)'):'var(--panel)'};stroke:${st===2?(narrow>.5?'var(--rx)':'var(--accent)'):st===1?'var(--muted)':'var(--line)'};stroke-width:${st?1.6:1};${st===1?'stroke-dasharray:4 3':''}"/>`;
      s+=`<text x="${x+L.cw/2}" y="${y+L.ch/2-(st===1?1:-4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${st===2?700:500}">${b[0]}</text>`;
      if(st===1)s+=`<text x="${x+L.cw/2}" y="${y+L.ch/2+10}" class="t-xs t-mid" style="font-size:8.5px">only if high risk</text>`});
    /* procalcitonin, drawn up to today */
    const pc=tcurve(L.px,L.py,L.pw,L.ph,SRC_PCT,{x0:0,x1:8,y0:0,y1:13,upto:clamp(day,0,8),col:'var(--dx)',dot:true,ref:12*.2});
    s+=`<text x="${L.px}" y="${L.py-8}" class="t-sm">PROCALCITONIN · DAYS 0–8 (ILLUSTRATIVE)</text>`+pc.svg+`<text x="${L.px+6}" y="${f1(pc.Y(2.4)+12)}" class="t-xs" style="fill:var(--bad)">80% below peak: SAPS stop rule</text>`;
        /* day timeline with the course bar */
    const tl=tline(L.lx,L.ly,L.lw,{min:0,max:8,step:1,fmt:v=>v?('d'+v):'0'});s+=tl.svg;
    const X=tl.X,cy=L.ly-22,dEnd=Math.min(day,7);
    s+=`<text x="${L.lx}" y="${cy-26}" class="t-sm">ANTIBIOTIC COURSE · DAYS</text>`;
    s+=`<rect x="${f1(X(0))}" y="${cy}" width="${f1(X(8)-X(0))}" height="12" rx="4" style="fill:var(--panel-2)"/>`;
    if(abxOn>0){const d1=Math.min(dEnd,2);s+=`<rect x="${f1(X(0))}" y="${cy}" width="${f1(Math.max(0,X(d1)-X(0)))}" height="12" rx="4" style="fill:var(--accent);opacity:.8"/>`;
      if(dEnd>2)s+=`<rect x="${f1(X(2))}" y="${cy}" width="${f1(X(dEnd)-X(2))}" height="12" rx="4" style="fill:var(--rx);opacity:.85"/>`}
    s+=`<path d="M${f1(X(7))} ${cy-6}H${f1(X(8))}" style="stroke:var(--muted);stroke-width:1.3;stroke-dasharray:4 3" marker-end="url(#scA)"/><text x="${f1(X(8))}" y="${cy-12}" class="t-xs t-end">${N?'14-day arm':'BALANCE 14-day arm'}</text>`;
    s+=`<text x="${f1(X(0))}" y="${cy-6}" class="t-xs" style="fill:var(--accent)">broad</text>`;
    if(day>2)s+=`<text x="${f1(X(2)+4)}" y="${cy-6}" class="t-xs" style="fill:var(--rx)">targeted</text>`;
    [[0.012],[1/24],[5/24],[2],[7]].forEach(([d])=>{if(day>=d-.001){const x=X(d);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${cy}" y2="${cy+12}" style="stroke:var(--ink);stroke-width:1.4"/>`}});
    const ey=L.ly+(N?30:32);
    if(t>=.1)s+=`<text x="${f1(X(0))}" y="${ey+12}" class="t-xs" style="fill:var(--ink)">${N?'hours 0–5: cultures, abx, drain':'hours 0–5: cultures, antibiotics, source control'}</text>`;
    if(day>=2)s+=`<text x="${f1(X(2))}" y="${ey}" class="t-xs t-mid" style="fill:var(--ink)">cultures back</text>`;
    if(day>=7)s+=`<text x="${f1(X(7))}" y="${ey}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">stop</text>`;
    const nx=X(clamp(day,0,8));s+=`<path d="M${f1(nx)} ${cy+14}l-5 8h10z" style="fill:var(--brand)"/>`;
    svg.innerHTML=s;
    const pv=day>8?1.7:pc.f(clamp(day,0,8));
    rd.innerHTML=`<span>Time <b>${srcFmt(h)}</b></span><span>Antibiotic <b>${stopped?'stopped':abxOn<.5?'not yet':narrow>.5?'targeted':'broad'}</b></span><span>Source <b>${scNow>.5?'drained':'not yet controlled'}</b></span><span>Procalcitonin <b>${abxOn<.5&&day<.02?'–':f1(pv)+' μg/L'}</b> (illustrative)</span>`;
    note.innerHTML=noteHTML(SRC_STEPS[p]);setSt(p);
  }
  const stop=playWire(rg,$('#scPlay'),draw,26000,'%t:player.replay%','source');
  setSt=stepWire($('#scSteps'),SRC_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- body map of sources ---------- */
  const ms=$('#scMapSvg'),sb=$('#scSites'),db=$('#scSet'),panel=$('#scSite');let set='balance',site='urine';
  db.innerHTML=Object.keys(SRC_SETS).map(k=>`<button class="btn" data-scset="${k}" aria-pressed="false">${SRC_SETS[k].n}</button>`).join('');
  sb.innerHTML=SRC_SITES.map(x=>`<button class="btn" data-scsite="${x.id}" aria-pressed="false">${x.n}</button>`).join('');
  function map(){const D=SRC_SETS[set],S=SRC_SITES.find(x=>x.id===site);
    let s='';const B=body(70,18,1,{id:'scMB',infect:{site,v:1}});s+=B.svg;
    SRC_SITES.forEach(x=>{const v=D.v[x.id],p=B.at[x.at];if(v==null)return;s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(3+Math.sqrt(v)*1.9)}" style="fill:none;stroke:var(--accent);stroke-width:${x.id===site?2.4:1.2};opacity:.85"/>`});
    s+=`<text x="160" y="30" class="t-sm">SHARE OF CASES</text><text x="160" y="44" class="t-xs">${D.n}</text>`;
    SRC_SITES.forEach((x,i)=>{const y=70+i*44,v=D.v[x.id],on=x.id===site;
      if(on)s+=`<rect x="154" y="${y-16}" width="202" height="38" rx="7" style="fill:var(--accent-soft)"/>`;
      s+=`<text x="160" y="${y}" class="t-lbl" style="font-size:12.5px">${x.n}</text>`;
      s+=`<rect x="160" y="${y+6}" width="150" height="9" rx="3" style="fill:var(--panel-2)"/>`;
      if(v!=null)s+=`<rect x="160" y="${y+6}" width="${f1(150*v/70)}" height="9" rx="3" style="fill:var(--accent)"/><text x="350" y="${y+14}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${v.toFixed(set==='balance'?1:0)}%</text>`;
      else s+=`<text x="350" y="${y+14}" class="t-xs t-end">not reported</text>`});
    ms.innerHTML=s;
    ms.setAttribute('aria-label',`Body map, ${D.n}: `+SRC_SITES.map(x=>x.n+' '+(D.v[x.id]!=null?D.v[x.id].toFixed(set==='balance'?1:0)+'%':'not reported')).join(', ')+`. Selected: ${S.n}.`);
    $$('[data-scset]',db).forEach(b=>b.setAttribute('aria-pressed',b.dataset.scset===set));
    $$('[data-scsite]',sb).forEach(b=>b.setAttribute('aria-pressed',b.dataset.scsite===site));
    panel.innerHTML=`<div class="kicker">${S.n}</div><h4>${S.h}</h4><ul>${S.li.map(l=>`<li>${l}</li>`).join('')}</ul>`}
  db.addEventListener('click',e=>{const b=e.target.closest('[data-scset]');if(!b)return;set=b.dataset.scset;map()});
  sb.addEventListener('click',e=>{const b=e.target.closest('[data-scsite]');if(!b)return;site=b.dataset.scsite;map()});
  map();
};
