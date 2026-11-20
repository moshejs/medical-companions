/* =============== 3.2 Pain & fatigue =============== */
inits.pain=()=>{
  const svg=$('#paSvg'),rg=$('#paT'),mb=$('#paMech');
  let mech=false;

  /* ---------- schematic curves over age 0..60 (shapes follow the descriptive phase model) ---------- */
  const AGE=60;
  const hyp=a=>.95-.72*ease(ramp(a,8,48));
  const pain=a=>.1+.62*ease(ramp(a,9,28))+.1*ramp(a,28,60);
  const stiff=a=>.06+.2*ramp(a,12,30)+.56*ease(ramp(a,28,56));
  /* illustrative split of the pain curve: nociceptive share falls, nociplastic share rises */
  const shares=a=>{const c=ramp(a,10,45);const no=.72-.32*c,ne=.12+.06*c;return [no,ne,1-no-ne]};
  const PHASES=[{a0:0,a1:10,t:'HYPERMOBILITY',c:'var(--dx)'},{a0:10,a1:30,t:'PAIN',c:'var(--vas)'},{a0:30,a1:60,t:'STIFFNESS',c:'var(--gold)'}];

  const STEPS=[
    {from:0,at:.08,k:'0–10 years',t:'Childhood: the hypermobility phase',
     txt:`In the descriptive natural-history model of hEDS, the first decade is a "hypermobility" phase: very flexible joints, with sprains and strains in about 40%. Pain at this stage is mostly linked to activity and injury. The model is based on clinical description and the authors' experience, not on a long-term cohort. [[Malek2021C,Castori2013]]`,
     pt:`Children with hEDS are often very bendy. They may have more sprains than other children, but many do not yet have constant pain.`,
     hook:`hEDS phases: hypermobility (decade 1), then pain (decade 2), then stiffness (later adulthood). [[Malek2021C,Castori2013]]`},
    {from:.17,at:.25,k:'10–20 years',t:'Adolescence: pain arrives',
     txt:`The second decade is the "pain" phase: widespread chronic pain begins, instability rises and hypermobility starts to fall. In the ALSPAC cohort of 2,901 teenagers, hypermobility at 13.8 years predicted at least moderately troublesome pain at 17.8 years in the shoulder (OR 1.68), knee (OR 1.83) and ankle/foot (OR 1.82). Pressure-pain thresholds in children with hypermobility syndrome/hEDS were 22% to 59% below normative values. [[Malek2021C,Tobias2013,Scheper2017Hyperalgesia]]`,
     pt:`In the teenage years pain often becomes more frequent and spreads to more places. The body's pain alarm can start to go off more easily.`,
     hook:`ALSPAC: Beighton ≥ 6 at 13.8 y predicted knee pain at 17.8 y (OR 1.83; OR 11.01 with obesity). [[Tobias2013]]`},
    {from:.34,at:.45,k:'20–30 years',t:'Young adults: pain and fatigue together',
     txt:`By adulthood pain is usually widespread and joined by fatigue. Women with hEDS had a mean pressure-pain threshold of 2.9 kg/cm² vs 5.2 in controls, lower even at sites where they had no pain: generalised hyperalgesia. More than three-quarters of 273 people with EDS reported severe fatigue, and orthostatic intolerance affected 74.4% of people with hEDS vs 34.3% of controls. [[Rombaut2015,Voermans2010Fatigue,DeWandele2016]]`,
     pt:`Pain can be felt even in places that are not hurt, because the nervous system has become more sensitive. Tiredness is very common and has many causes, many of which can be worked on.`,
     hook:`Generalised hyperalgesia in hEDS: pressure-pain threshold 2.9 vs 5.2 kg/cm², even at pain-free sites. [[Rombaut2015]]`},
    {from:.5,at:.7,k:'30–60 years',t:'Later: the stiffness phase',
     txt:`A later "stiffness" phase brings a marked loss of hypermobility and lower quality of life. After about age 33, most people diagnosed with hypermobility no longer reach a Beighton score of 4; in the general population, the chance of meeting the hypermobility cut-off falls about 5.5% per year of age. At diagnosis in an Italian registry, older age predicted moderate-to-severe pain (OR 1.06 per year). [[Malek2021C,Morri2026]]`,
     pt:`Joints often get stiffer with age, so an adult may score low on flexibility tests even though they were very bendy as a child. Pain and tiredness can still be high.`,
     hook:`After about age 33, most people with diagnosed hypermobility no longer score ≥ 4 on the Beighton scale, so ask about past hypermobility. [[Malek2021C]]`},
    {from:.84,at:.95,k:'Every age',t:'Not one path',
     txt:`The phase model is a teaching scaffold, not a forecast. Adults with hEDS/HSD fell into two severity clusters that did not mirror either the old or the 2017 criteria, and hEDS was more severe than HSD on only 3 of 16 items (pain, motricity problems and bleeding). Pain severity in a Dutch survey correlated with hypermobility, dislocations, previous surgery and poor sleep. [[Copetti2019,AubryRozier2021,Voermans2010]]`,
     pt:`These curves describe groups of people, not what will happen to any one person. Some people have mild symptoms all their lives.`,
     hook:`hEDS vs HSD: different only on pain, motricity and bleeding (3 of 16 severity items) in 97 people. [[AubryRozier2021]]`}];
  const setSt=stepWire($('#paSteps'),STEPS,rg,t=>draw(t),()=>stop());

  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,ph=phaseOf(STEPS,t),age=t*AGE;
    const X0=N?44:60,X1=N?384:486,Y0=N?64:58,Y1=N?300:262;
    const xa=a=>X0+(X1-X0)*a/AGE,yv=v=>Y1-(Y1-Y0)*v;
    let s=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text>`;
    if(!N)s+=`<text x="${W-16}" y="28" class="t-sm t-end">age ${Math.round(age)} · ${ph+1} / 5</text>`;
    /* phase bands */
    PHASES.forEach(P=>{const on=age>=P.a0&&age<P.a1;s+=`<rect x="${f1(xa(P.a0))}" y="${Y0}" width="${f1(xa(P.a1)-xa(P.a0))}" height="${Y1-Y0}" style="fill:${P.c};opacity:${on?.12:.05}"/>`;
      s+=`<text x="${f1((xa(P.a0)+xa(P.a1))/2)}" y="${f1((Y0+Y1)/2+4)}" class="t-xs t-mid" style="fill:${P.c};font-weight:600;opacity:.8">${P.t}</text>`});
    /* axes */
    s+=`<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" class="axis"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1}" class="axis"/>`;
    for(let a=0;a<=60;a+=10)s+=`<line x1="${f1(xa(a))}" y1="${Y1}" x2="${f1(xa(a))}" y2="${Y1+4}" class="axis"/><text x="${f1(xa(a))}" y="${Y1+16}" class="t-xs t-mid">${a}</text>`;
    s+=`<text x="${X1}" y="${Y1+30}" class="t-xs t-end">age (years)</text><text x="${X0-6}" y="${Y0+4}" class="t-xs t-end">more</text><text x="${X0-6}" y="${Y1}" class="t-xs t-end">less</text>`;
    /* mechanisms overlay under the pain curve */
    if(mech){const L=[[],[],[]];for(let i=0;i<=60;i++){const a=i,p=pain(a),sh=shares(a);let acc=0;sh.forEach((v,k)=>{L[k].push([a,acc*p,(acc+v)*p]);acc+=v})}
      const cols=['var(--muscle)','var(--nerve)','var(--dx)'];
      L.forEach((pts,k)=>{let d='';pts.forEach((q,i)=>{d+=(i?'L':'M')+f1(xa(q[0]))+' '+f1(yv(q[2]))});for(let i=pts.length-1;i>=0;i--)d+='L'+f1(xa(pts[i][0]))+' '+f1(yv(pts[i][1]));
        s+=`<path d="${d}Z" style="fill:${cols[k]};opacity:.32"/>`})}
    /* the three curves, drawn up to the current age, faint beyond */
    const C=[[hyp,'var(--dx)','hypermobility'],[pain,'var(--vas)','pain'],[stiff,'var(--gold)','stiffness & fatigue']];
    const cut=clamp(age/AGE);
    C.forEach(([fn,col])=>{s+=`<path d="${pathFn(u=>1-fn(u*AGE),X0,X1,Y0,Y1)}" style="fill:none;stroke:${col};stroke-width:2;opacity:.22"/>`;
      if(cut>.005)s+=`<path d="${pathFn(u=>1-fn(u*cut*AGE),X0,xa(age),Y0,Y1,Math.max(4,Math.round(120*cut)))}" style="fill:none;stroke:${col};stroke-width:3;stroke-linecap:round"/>`});
    /* Beighton-at-33 marker */
    if(age>26){const op=ramp(age,26,33);s+=`<line x1="${f1(xa(33))}" y1="${f1(yv(hyp(33)))}" x2="${f1(xa(33))}" y2="${Y1}" style="stroke:var(--dx);stroke-width:1.2;stroke-dasharray:3 3;opacity:${f1(op)}"/><text x="${f1(xa(33)+4)}" y="${f1(yv(hyp(33))-8)}" class="t-xs" style="fill:var(--dx);opacity:${f1(op)}">~33 y: most score &lt; 4</text>`}
    /* now cursor and dots */
    s+=`<line x1="${f1(xa(age))}" y1="${Y0}" x2="${f1(xa(age))}" y2="${Y1}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    C.forEach(([fn,col])=>{s+=`<circle cx="${f1(xa(age))}" cy="${f1(yv(fn(age)))}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:1.5"/>`});
    /* curve end labels */
    if(!N)C.forEach(([fn,col,l],i)=>{s+=`<text x="${X1+6}" y="${f1(yv(fn(60))+4+(i===2?-8:i===1?9:0))}" class="t-xs" style="fill:${col};font-weight:600">${l.split(' ')[0]}</text>`});
    /* side panel / lower panel with levels */
    const lv=v=>v<.3?'low':v<.55?'moderate':v<.75?'high':'very high';
    const rows=[['Hypermobility',hyp(age),'var(--dx)'],['Pain',pain(age),'var(--vas)'],['Stiffness, fatigue',stiff(age),'var(--gold)']];
    if(N){let y=362;s+=`<text x="24" y="${y-8}" class="t-sm" style="font-weight:600">AGE ${Math.round(age)} · ${ph+1} / 5</text>`;
      rows.forEach((r,i)=>{const yy=y+i*30;s+=`<text x="24" y="${yy+14}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><rect x="170" y="${yy+4}" width="150" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="170" y="${yy+4}" width="${f1(150*r[1])}" height="12" rx="6" style="fill:${r[2]}"/><text x="376" y="${yy+14}" class="t-sm t-end" style="fill:var(--ink)">${lv(r[1])}</text>`})}
    else{const px=588;s+=`<text x="${px}" y="76" class="t-sm" style="font-weight:600">AT AGE ${Math.round(age)}</text>`;
      rows.forEach((r,i)=>{const yy=92+i*44;s+=`<text x="${px}" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><rect x="${px}" y="${yy+16}" width="116" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${px}" y="${yy+16}" width="${f1(116*r[1])}" height="10" rx="5" style="fill:${r[2]}"/><text x="${px+116}" y="${yy+10}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${lv(r[1])}</text>`});
      if(mech){const sh=shares(age),nm=['nociceptive','neuropathic','nociplastic'],cl=['var(--muscle)','var(--nerve)','var(--dx)'];
        s+=`<text x="${px}" y="236" class="t-xs" style="fill:var(--ink)">pain mix (illustrative)</text>`;let xx=px;
        sh.forEach((v,k)=>{s+=`<rect x="${f1(xx)}" y="242" width="${f1(116*v)}" height="12" style="fill:${cl[k]};opacity:.75"/>`;xx+=116*v});
        nm.forEach((n,k)=>{s+=`<text x="${px}" y="${270+k*13}" class="t-xs" style="fill:${cl[k]}">■ ${n} ${Math.round(sh[k]*100)}%</text>`})}}
    /* the person walking along the bottom, growing up */
    const py=N?478:300,sz=lerp(N?30:24,N?52:44,ease(ramp(age,0,18))),pxp=N?lerp(30,370,cut):xa(age);
    s+=`<line x1="${N?16:X0}" y1="${py+sz+1}" x2="${N?384:X1}" y2="${py+sz+1}" style="stroke:var(--line);stroke-width:1"/>`;
    const stoop=ramp(age,45,60)*3;
    s+=`<g transform="translate(${f1(pxp-sz*.2)} 0) rotate(${f1(stoop)} ${f1(sz*.2)} ${f1(py+sz)})">${person(0,py,sz,'var(--ink)')}</g>`;
    if(pain(age)>.35){const n=Math.round(pain(age)*4);for(let i=0;i<n;i++){const a=-1.2+i*.7;s+=`<line x1="${f1(pxp+Math.cos(a)*sz*.38)}" y1="${f1(py+sz*.5+Math.sin(a)*sz*.38)}" x2="${f1(pxp+Math.cos(a)*sz*.52)}" y2="${f1(py+sz*.5+Math.sin(a)*sz*.52)}" style="stroke:var(--vas);stroke-width:2;stroke-linecap:round"/>`}}
    if(N)s+=`<text x="16" y="${py-10}" class="t-xs">0</text><text x="384" y="${py-10}" class="t-xs t-end">60 y</text>`;
    svg.innerHTML=s;setSt(ph);
    $('#paNote').innerHTML=noteHTML(STEPS[ph]);
  }
  function legend(){let h=`<span><i style="background:var(--dx)"></i>hypermobility</span><span><i style="background:var(--vas)"></i>pain</span><span><i style="background:var(--gold)"></i>stiffness &amp; fatigue</span>`;
    if(mech)h+=`<span><i style="background:var(--muscle)"></i>nociceptive (joint, tissue)<span class="ev est">Established</span></span><span><i style="background:var(--nerve)"></i>neuropathic<span class="ev early">Early evidence</span></span><span><i style="background:var(--dx);opacity:.5"></i>nociplastic / central sensitisation<span class="ev early">Early evidence</span></span><span>band sizes: <span class="ev hyp">Hypothesis</span>, illustrative only</span>`;
    $('#paLegend').innerHTML=h}
  const stop=playWire(rg,$('#paPlay'),draw,18000,'%t:player.replay%','pain');
  mb.addEventListener('click',()=>{mech=!mech;mb.setAttribute('aria-pressed',mech);legend();draw(+rg.value)});
  legend();draw(+rg.value);

  /* ---------- mechanism loops ---------- */
  const MECH={
    tissue:{t:'Tissue injury (nociceptive)',ev:'<span class="ev est">Established</span>',col:'var(--muscle)',
      nodes:['Lax joint slips','Capsule, tendon, muscle strain','Nociceptors fire','Guarding, less use','Weaker, less control'],
      txt:`Pain is multifactorial. The 2017 pain consensus lists subluxations and dislocations, previous surgery, muscle weakness, proprioceptive disorders and spinal instability, as well as gut, jaw, menstrual and pelvic pain. In 273 Dutch people with EDS, pain severity correlated with hypermobility, dislocations, previous surgery and poor sleep. The weight of each cause is unknown. [[Chopra2017,Voermans2010]]`,
      pt:`Joints that slip strain the tissues around them, and that hurts. Then people often protect the joint by using it less, which makes the muscles weaker and the joint less stable.`},
    central:{t:'Central sensitisation (nociplastic)',ev:'<span class="ev early">Early evidence</span> for the signs · <span class="ev hyp">Hypothesis</span> for the trigger',col:'var(--dx)',
      nodes:['Ongoing joint input','Spinal cord amplifies (wind-up)','Thresholds fall everywhere','Pain from less input'],
      txt:`In 27 people with JHS/hEDS, cold and heat pain thresholds were lower, wind-up was higher and fibromyalgia screening was positive, with no nerve damage on conduction studies or laser-evoked potentials; the authors propose that ongoing joint input "probably triggers" central sensitisation. Pressure-pain thresholds were 2.9 vs 5.2 kg/cm² in women with hEDS vs controls, and lower in children and adolescents too. Classical EDS showed weaker conditioned pain modulation. [[DiStefano2016,Rombaut2015,Scheper2017Hyperalgesia,SchubertHjalmarsson2025,Colman2023]]`,
      pt:`After a long time in pain, the nervous system can turn its volume up. Then ordinary pressure or movement hurts more than it should, even in places that are not injured.`},
    sfn:{t:'Small-fibre neuropathy (neuropathic)',ev:'<span class="ev early">Early evidence</span> · disputed',col:'var(--nerve)',
      nodes:['Small nerve fibres in skin','Fewer fibres on biopsy','Burning, tingling','Less heat and touch feeling'],
      txt:`In a prospective controlled study, 19 of 31 people with hEDS (61%) met criteria for small-fibre neuropathy, with reduced nerve-fibre density at thigh and lower leg and generalised thermal and tactile hypoaesthesia; the authors call it "an important, but not the only" mechanism. All 24 adults with EDS in a smaller, selected biopsy series had reduced fibre density. Another study found no somatosensory nerve damage and favours central sensitisation. Status: unresolved. [[Igharo2023,Cazzato2016,DiStefano2016]]`,
      pt:`Some people with hEDS have damage to the tiny nerves in the skin, which can cause burning or tingling. Not every study finds this, so doctors are still working out how common it is.`},
    sleep:{t:'The sleep and fatigue loop',ev:'<span class="ev early">Early evidence</span>',col:'var(--gold)',
      nodes:['Pain','Poor sleep','Fatigue','Less activity, deconditioning','Weakness'],
      txt:`More than three-quarters of 273 people with EDS had severe fatigue, linked to sleep disturbance, concentration problems, social functioning, low self-efficacy and pain. Weakness and pain each predicted fatigue. Obstructive sleep apnoea affected 32% vs 6% of matched controls, and orthostatic intolerance raised fatigue during tilt (+3.1 vs +0.5 points). Five predictors, four of them modifiable, explained 52.3% of fatigue variance in one sample. [[Voermans2010Fatigue,Voermans2011Fatigue,Gaisl2017,DeWandele2016,Krahe2018]]`,
      pt:`Pain spoils sleep, poor sleep makes you tired, tiredness makes you move less, and moving less makes muscles weaker, which can mean more pain. Breaking the loop at any point can help.`}};
  const loop=$('#paLoop');let mk='tissue';
  function drawLoop(){const M=MECH[mk],n=M.nodes.length,cx=200,cy=138,rx=128,ry=88;let s=`<defs>${marker('paArr','var(--muted)')}</defs>`;
    const P=M.nodes.map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+rx*Math.cos(a),cy+ry*Math.sin(a)]});
    /* the loop track */
    let d=`M${f1(cx)} ${f1(cy-ry)}A${rx} ${ry} 0 1 1 ${f1(cx-.1)} ${f1(cy-ry)}Z`;
    s+=`<path id="paTrack" d="${d}" style="fill:none;stroke:${M.col};stroke-width:2;opacity:.35"/>`;
    for(let i=0;i<n;i++){const a0=-Math.PI/2+(i+.32)*2*Math.PI/n,a1=-Math.PI/2+(i+.68)*2*Math.PI/n;
      s+=`<path d="M${f1(cx+rx*Math.cos(a0))} ${f1(cy+ry*Math.sin(a0))}A${rx} ${ry} 0 0 1 ${f1(cx+rx*Math.cos(a1))} ${f1(cy+ry*Math.sin(a1))}" class="arrow" marker-end="url(#paArr)"/>`}
    if(!RM)s+=`<circle r="6" style="fill:${M.col}"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#paTrack"/></animateMotion></circle>`;
    M.nodes.forEach((t,i)=>{const [x,y]=P[i],words=t.split(' '),lines=[];let cur='';words.forEach(w=>{if((cur+' '+w).trim().length>16){lines.push(cur.trim());cur=w}else cur+=' '+w});lines.push(cur.trim());
      const w=Math.max(...lines.map(l=>l.length))*7.3+18,h=lines.length*14+12;
      s+=`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${h}" rx="8" style="fill:var(--panel);stroke:${M.col};stroke-width:1.6"/>`;
      lines.forEach((l,k)=>{s+=`<text x="${f1(x)}" y="${f1(y-h/2+17+k*14)}" class="t-xs t-mid" style="fill:var(--ink);font-size:12px">${l}</text>`})});
    loop.innerHTML=s;
    $('#paMechTxt').innerHTML=`<div class="kicker">Mechanism</div><h4>${M.t}</h4><div>${M.ev}</div><p>${M.txt}</p><div class="pt"><b>%t:note.plain%</b>${M.pt}</div>`}
  $$('[data-pamech]').forEach(b=>b.addEventListener('click',()=>{mk=b.dataset.pamech;$$('[data-pamech]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawLoop()}));
  drawLoop();

  /* ---------- boom-bust vs paced (illustrative) ---------- */
  const pace=$('#paPace'),dr=$('#paD');let show='both';
  const BOOM=[88,28,18,38,92,24,14,34,86,30,20,46,90,26,18],PACED=[48,50,50,52,52,53,54,55,56,57,58,59,60,61,62];
  const ENV=d=>62+d*.5;
  function drawPace(t){const N=vb(pace,'720 300','400 400'),W=N?400:720,X0=N?40:56,X1=W-(N?16:150),Y0=N?40:34,Y1=N?250:236,days=14,cur=t*days;
    const xd=d=>X0+(X1-X0)*d/days,yv=v=>Y1-(Y1-Y0)*v/100;let s='';
    s+=`<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" class="axis"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1}" class="axis"/>`;
    for(let d=0;d<=days;d+=N?2:1)s+=`<text x="${f1(xd(d))}" y="${Y1+15}" class="t-xs t-mid">${d+1}</text>`;
    s+=`<text x="${X1}" y="${Y1+30}" class="t-xs t-end">day</text><text x="${X0-6}" y="${Y0+4}" class="t-xs t-end">high</text><text x="${X0-6}" y="${Y1}" class="t-xs t-end">low</text><text x="${X0+4}" y="${Y0-10}" class="t-xs">activity (schematic)</text>`;
    s+=`<path d="M${f1(xd(0))} ${f1(yv(ENV(0)))}L${f1(xd(days))} ${f1(yv(ENV(days)))}" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${f1(xd(1.6))}" y="${f1(yv(ENV(1.6))-6)}" class="t-xs" style="fill:var(--accent)">comfort envelope</text>`;
    const series=(arr,col,on)=>{let d='';const k=Math.floor(cur),fr=cur-k;for(let i=0;i<=Math.min(k,days);i++)d+=(i?'L':'M')+f1(xd(i))+' '+f1(yv(arr[i]));
      if(k<days&&fr>0)d+='L'+f1(xd(k+fr))+' '+f1(yv(lerp(arr[k],arr[k+1],fr)));
      return `<path d="M${arr.map((v,i)=>f1(xd(i))+' '+f1(yv(v))).join('L')}" style="fill:none;stroke:${col};stroke-width:1.5;opacity:${on?.18:.08}"/><path d="${d}" style="fill:none;stroke:${col};stroke-width:${on?3:1.6};stroke-linejoin:round;opacity:${on?1:.3}"/>`};
    const bOn=show!=='paced',pOn=show!=='boom';
    s+=series(BOOM,'var(--vas)',bOn)+series(PACED,'var(--rx)',pOn);
    /* flares: a day over the envelope, followed by crash days */
    let flares=0,tb=0,tp=0;const k=Math.min(days,Math.floor(cur));
    for(let i=0;i<=k;i++){tb+=BOOM[i];tp+=PACED[i];if(BOOM[i]>ENV(i)){flares++;if(bOn)s+=`<circle cx="${f1(xd(i))}" cy="${f1(yv(BOOM[i]))}" r="6" style="fill:none;stroke:var(--vas);stroke-width:2"/><text x="${f1(xd(i))}" y="${f1(yv(BOOM[i])-10)}" class="t-xs t-mid" style="fill:var(--vas)">over</text>`}
      if(i>0&&BOOM[i]<30&&bOn)s+=`<text x="${f1(xd(i))}" y="${f1(yv(BOOM[i])+16)}" class="t-xs t-mid" style="fill:var(--vas)">crash</text>`}
    s+=`<line x1="${f1(xd(cur))}" y1="${Y0}" x2="${f1(xd(cur))}" y2="${Y1}" style="stroke:var(--ink);opacity:.4"/>`;
    const crash=BOOM.slice(0,k+1).filter((v,i)=>i>0&&v<30).length;
    const lx=N?X0:X1+16,ly=N?Y1+50:Y0+20;
    const L=[[`Boom-bust`,'var(--vas)',`${tb} units · ${flares} over · ${crash} crash days`],[`Paced`,'var(--rx)',`${tp} units · 0 over · 0 crash days`]];
    L.forEach((r,i)=>{if(N){s+=`<text x="${lx}" y="${ly+i*36}" class="t-sm" style="fill:${r[1]};font-weight:600">${r[0]}</text><text x="${lx}" y="${ly+i*36+15}" class="t-sm" style="fill:var(--ink)">${r[2]}</text>`}
      else{const p=r[2].split(' · ');s+=`<text x="${lx}" y="${ly+i*70}" class="t-sm" style="fill:${r[1]};font-weight:600">${r[0]}</text>`;p.forEach((q,j)=>{s+=`<text x="${lx}" y="${ly+i*70+15+j*14}" class="t-xs" style="fill:var(--ink)">${q}</text>`})}});
    pace.innerHTML=s;
    $('#paPaceRead').innerHTML=`<span>day <b>${Math.min(15,Math.floor(cur)+1)} of 15</b></span><span>boom-bust total <b>${tb}</b></span><span>paced total <b>${tp}</b></span><span>schematic units, <b>not trial data</b></span>`}
  playWire(dr,$('#paPlay2'),drawPace,9000,'%t:player.replay%','pain');
  $$('[data-papace]').forEach(b=>b.addEventListener('click',()=>{show=b.dataset.papace;$$('[data-papace]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPace(+dr.value)}));
  drawPace(+dr.value);
};
